/**
 * Save the date — André e Emanuele
 * Backend do site (Google Apps Script vinculado à planilha da lista de convidados).
 * Decisões: docs/DECISOES.md, seções 10 e 11. Instalação: docs/INSTALACAO.md.
 *
 * Lê e escreve SÓ na aba "Convites". Nunca devolve mais de um convite.
 *
 * ⚠️ Ao atualizar este código: Implantar → Gerenciar implantações → lápis na
 *    implantação existente → Versão: "Nova versão". NUNCA "Nova implantação"
 *    (muda a URL e o site para de funcionar).
 */

// ---------------- Configuração ----------------
var ABA = 'Convites';
var SITE = 'https://andreemanu.site/?c=';

// Mensagem do WhatsApp. {nomes} e {link} são trocados automaticamente.
var MENSAGEM = 'Oi {nomes}! Temos uma novidade 💍 {link}';

var ALFABETO = '23456789abcdefghjkmnpqrstuvwxyz'; // sem 0, o, 1, l, i
var TAM_TOKEN = 6;
var RESPOSTAS = ['sim', 'talvez', 'nao'];
var RECADO_MAX = 500;
var MAX_NOMES = 4;

var COLUNAS = ['nomes', 'telefone', 'envia', 'obs', 'token', 'link_whats',
               'abriu_em', 'ultima_abertura', 'resposta', 'recado', 'respondeu_em'];

// ---------------- Menu da planilha ----------------
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('💍 Convites')
    .addItem('Gerar tokens e links do WhatsApp', 'gerarTokens')
    .addSeparator()
    .addItem('Criar aba "Convites"', 'criarAba')
    .addToUi();
}

function criarAba() {
  var ss = SpreadsheetApp.getActive();
  var ui = SpreadsheetApp.getUi();
  if (ss.getSheetByName(ABA)) { ui.alert('A aba "' + ABA + '" já existe.'); return; }
  var sh = ss.insertSheet(ABA);
  sh.getRange(1, 1, 1, COLUNAS.length).setValues([COLUNAS]).setFontWeight('bold');
  sh.setFrozenRows(1);
  // telefone e token como texto, para o Sheets não estragar (notação científica, zeros etc.)
  sh.getRange('B2:B').setNumberFormat('@');
  sh.getRange('E2:E').setNumberFormat('@');
  sh.getRange('G2:H').setNumberFormat('dd/mm/yyyy hh:mm');
  sh.getRange('K2:K').setNumberFormat('dd/mm/yyyy hh:mm');
  sh.getRange('C2:C').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['André', 'Manu'], true).build());
  // Destaque visual das colunas automáticas
  sh.getRange(1, 5, 1, 7).setBackground('#efefe8');
  sh.setColumnWidth(1, 260);
  sh.setColumnWidth(6, 120);
  sh.setColumnWidth(10, 260);
  ui.alert('Aba "' + ABA + '" criada. Preencha nomes, telefone e envia, depois use 💍 Convites → Gerar tokens.');
}

/** Gera token para quem não tem e (re)gera o link do WhatsApp de todo mundo. Nunca muda um token existente. */
function gerarTokens() {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = aba_();
    var col = colunas_(sh);
    var ultima = sh.getLastRow();
    if (ultima < 2) { SpreadsheetApp.getUi().alert('Nenhum convite cadastrado ainda.'); return; }

    var n = ultima - 1;
    var dados = sh.getRange(2, 1, n, sh.getLastColumn()).getValues();
    var existentes = {};
    dados.forEach(function (l) { var t = String(l[col.token] || '').trim(); if (t) existentes[t] = true; });

    var tokens = [], links = [], novos = 0, avisos = [];
    dados.forEach(function (l, i) {
      var nomes = separarNomes_(l[col.nomes]);
      var token = String(l[col.token] || '').trim();
      if (!nomes.length) { tokens.push([token]); links.push([l[col.link_whats] || '']); return; }
      if (nomes.length > MAX_NOMES) avisos.push('Linha ' + (i + 2) + ': mais de ' + MAX_NOMES + ' nomes (divida em dois convites).');
      var tel = normalizarTelefone_(l[col.telefone]);
      if (!tel) avisos.push('Linha ' + (i + 2) + ': sem telefone (o link abre o WhatsApp sem destinatário).');
      else if (!telefoneValido_(tel)) avisos.push('Linha ' + (i + 2) + ': telefone estranho (' + l[col.telefone] + '). Use DDD + número, ex.: 54999998888.');
      if (!token) {
        do { token = novoToken_(); } while (existentes[token]);
        existentes[token] = true;
        novos++;
      }
      tokens.push([token]);
      links.push([linkWhats_(l[col.telefone], nomes, token)]);
    });

    sh.getRange(2, col.token + 1, n, 1).setNumberFormat('@').setValues(tokens);
    sh.getRange(2, col.link_whats + 1, n, 1).setValues(links);

    var msg = novos + ' token(s) novo(s). Links do WhatsApp atualizados.';
    if (avisos.length) msg += '\n\nAtenção:\n' + avisos.join('\n');
    SpreadsheetApp.getUi().alert(msg);
  } finally {
    lock.releaseLock();
  }
}

// ---------------- API do site ----------------
/**
 * GET ?token=<token> → { ok, nomes, resposta, recado }
 * (Não usar "c" nem "sid" como nome de parâmetro: são reservados pelo Apps Script e dão erro 400.
 *  O link do convidado continua andreemanu.site/?c=..., que é o GitHub Pages, não o Apps Script.)
 */
function doGet(e) {
  var token = limparToken_(e && e.parameter && e.parameter.token);
  if (!token) return json_({ ok: false, erro: 'nao_encontrado' });

  var sh = aba_();
  var col = colunas_(sh);
  var linha = acharLinha_(sh, col, token);
  if (!linha) return json_({ ok: false, erro: 'nao_encontrado' });

  var valores = sh.getRange(linha, 1, 1, sh.getLastColumn()).getValues()[0];
  var nomes = separarNomes_(valores[col.nomes]);
  if (!nomes.length) return json_({ ok: false, erro: 'nao_encontrado' });

  // Registra a abertura. Se o lock estiver ocupado, devolve o convite mesmo assim.
  var lock = LockService.getScriptLock();
  if (lock.tryLock(5000)) {
    try {
      var agora = new Date();
      if (!sh.getRange(linha, col.abriu_em + 1).getValue()) sh.getRange(linha, col.abriu_em + 1).setValue(agora);
      sh.getRange(linha, col.ultima_abertura + 1).setValue(agora);
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }
  }

  return json_({
    ok: true,
    nomes: nomes,
    resposta: String(valores[col.resposta] || ''),
    recado: String(valores[col.recado] || '')
  });
}

/** POST (corpo JSON enviado como text/plain) { token, resposta, recado } → { ok } */
function doPost(e) {
  var body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, erro: 'json_invalido' }); }

  var token = limparToken_(body.token);
  var resposta = String(body.resposta || '');
  var recado = String(body.recado == null ? '' : body.recado).replace(/\r\n?/g, '\n').trim().slice(0, RECADO_MAX);

  if (!token) return json_({ ok: false, erro: 'nao_encontrado' });
  if (RESPOSTAS.indexOf(resposta) < 0) return json_({ ok: false, erro: 'resposta_invalida' });
  // Grava sempre como texto: sem o apóstrofo, o Sheets transformaria "=..." em fórmula,
  // "15/05" em data, "1.000" em número etc. O apóstrofo não aparece na célula nem no getValue.
  if (recado) recado = "'" + recado;

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return json_({ ok: false, erro: 'ocupado' });
  try {
    var sh = aba_();
    var col = colunas_(sh);
    var linha = acharLinha_(sh, col, token);
    if (!linha || !separarNomes_(sh.getRange(linha, col.nomes + 1).getValue()).length) {
      return json_({ ok: false, erro: 'nao_encontrado' });
    }
    sh.getRange(linha, col.resposta + 1).setValue(resposta);
    sh.getRange(linha, col.recado + 1).setValue(recado);
    sh.getRange(linha, col.respondeu_em + 1).setValue(new Date());
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

// ---------------- Auxiliares ----------------
function aba_() {
  var sh = SpreadsheetApp.getActive().getSheetByName(ABA);
  if (!sh) throw new Error('Aba "' + ABA + '" não encontrada');
  return sh;
}

/** Mapa nome da coluna → índice (0-based), lido do cabeçalho. A ordem das colunas pode mudar. */
function colunas_(sh) {
  var cab = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0]
    .map(function (h) { return String(h).trim().toLowerCase(); });
  var col = {};
  COLUNAS.forEach(function (nome) {
    var i = cab.indexOf(nome);
    if (i < 0) throw new Error('Coluna "' + nome + '" não encontrada na aba ' + ABA);
    col[nome] = i;
  });
  return col;
}

function acharLinha_(sh, col, token) {
  var ultima = sh.getLastRow();
  if (ultima < 2) return 0;
  var cel = sh.getRange(2, col.token + 1, ultima - 1, 1)
    .createTextFinder(token).matchEntireCell(true).matchCase(true).findNext();
  return cel ? cel.getRow() : 0;
}

function limparToken_(t) {
  t = String(t || '').trim().toLowerCase();
  return new RegExp('^[' + ALFABETO + ']{' + TAM_TOKEN + '}$').test(t) ? t : '';
}

function separarNomes_(v) {
  return String(v || '').split(',').map(function (s) { return s.trim(); }).filter(String);
}

function juntarNomes_(nomes) {
  if (nomes.length <= 1) return nomes.join('');
  return nomes.slice(0, -1).join(', ') + ' e ' + nomes[nomes.length - 1];
}

function novoToken_() {
  // Bytes aleatórios a partir de UUIDs (Math.random não é criptográfico).
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, Utilities.getUuid() + Utilities.getUuid());
  var t = '';
  for (var i = 0; t.length < TAM_TOKEN && i < bytes.length; i++) {
    var b = bytes[i] & 0xff;
    if (b < 248) t += ALFABETO.charAt(b % ALFABETO.length); // 248 = 8 × 31, evita viés
  }
  return t.length === TAM_TOKEN ? t : novoToken_();
}

/**
 * Normaliza o telefone para o formato do wa.me (DDI + DDD + número, só dígitos).
 * Sem o 55, um DDD 54 viraria o código da Argentina: por isso o 55 entra sozinho
 * quando o número tem 10 ou 11 dígitos (DDD + número).
 */
function normalizarTelefone_(telefone) {
  var tel = String(telefone || '').replace(/\D/g, '').replace(/^0+/, '');
  if (tel.length === 10 || tel.length === 11) tel = '55' + tel;
  return tel;
}

function telefoneValido_(tel) {
  return /^55\d{10,11}$/.test(tel);
}

function linkWhats_(telefone, nomes, token) {
  var tel = normalizarTelefone_(telefone);
  var texto = MENSAGEM.replace('{nomes}', juntarNomes_(nomes)).replace('{link}', SITE + token);
  return 'https://wa.me/' + tel + '?text=' + encodeURIComponent(texto);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
