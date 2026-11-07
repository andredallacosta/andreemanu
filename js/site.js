/* Save the date — André e Emanuele
   Fluxo e regras: docs/DECISOES.md (seções 2 a 6 e 9). */
(function () {
  'use strict';

  // URL do Web App do Apps Script (Gerenciar implantações → a implantação existente).
  // Pode ser pública: a credencial é o token de cada convite.
  // O parâmetro se chama "token", não "c": o Apps Script reserva "c" e "sid" (dá erro 400).
  var API = 'https://script.google.com/macros/s/AKfycbyfEHiy2sMcDXFXvy9kptuo9J1JTwaGdQuihVVgpfDBSfPqRwnV1eXDIJEKWaByqDo_/exec';

  var WEDDING = { y: 2027, m: 5, d: 15 };
  var TOKEN_RE = /^[23456789abcdefghjkmnpqrstuvwxyz]{6}$/;
  var INTRO_MS = 3000;          // duração da abertura do monograma
  var TIMEOUT_MS = 15000;
  var RECADO_MAX = 500;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var $ = function (id) { return document.getElementById(id); };

  var state = { token: null, convite: null, plural: false, enviando: false };

  // Pré-visualização local (só em localhost): ?demo (= Ricardo e Ana Paula), ?demo=1..4 e ?demo=2&resp=sim
  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var DEMO_NOMES = ['Ricardo', 'Ana Paula', 'Camila', 'Pedro'];

  /* ---------------- Textos (singular / plural) ---------------- */
  function txt(key) {
    var p = state.plural;
    var t = {
      'line': 'Vamos nos casar, e não seria a mesma coisa sem ' + (p ? 'vocês.' : 'você.'),
      'q': 'Podemos contar ' + (p ? 'com vocês?' : 'contigo?'),
      'opt-sim': p ? 'Sim, não perdemos por nada' : 'Sim, não perco por nada',
      'opt-talvez': p ? 'Ainda não sabemos' : 'Ainda não sei',
      'opt-nao': p ? 'Infelizmente não vamos conseguir' : 'Infelizmente não vou conseguir',
      'already': (p ? 'Vocês já responderam. ' : 'Você já respondeu. ') + 'Se algo mudar, é só atualizar.',
      //   (espaço que não quebra): o emoji nunca fica sozinho numa linha
      'done-sim': 'Oba! Anotamos aqui 💛',
      'done-talvez': 'Combinado! Anotamos aqui 💛',
      'done-nao': 'Anotamos aqui 💛',
      'sub-sim': 'Que alegria! Mais perto da data chega o convite oficial.',
      'sub-talvez': 'Quando ' + (p ? 'souberem' : 'souber') + ', é só voltar neste mesmo link.',
      'sub-nao': (p ? 'Vamos sentir a falta de vocês. ' : 'Vamos sentir sua falta. ') + 'Se mudar algo, é só voltar neste link.'
    };
    return t[key];
  }

  function juntarNomes(nomes) {
    if (nomes.length <= 1) return nomes.join('');
    return nomes.slice(0, -1).join(', ') + ' e ' + nomes[nomes.length - 1];
  }

  /* ---------------- Abertura ---------------- */
  function iniciarMonograma() {
    var ring = document.querySelector('#mono #ring');
    if (ring) ring.style.setProperty('--len', ring.getTotalLength());
    if (reduceMotion) { body.classList.add('mono-static'); return Promise.resolve(); }
    body.classList.add('is-animating');
    return espera(INTRO_MS);
  }

  function espera(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function lerToken() {
    var c = new URLSearchParams(location.search).get('c');
    if (!c) return null;
    c = c.trim().toLowerCase();
    return TOKEN_RE.test(c) ? c : null;
  }

  /* ---------------- API ---------------- */
  function comTimeout(promise) {
    return Promise.race([promise, espera(TIMEOUT_MS).then(function () { throw new Error('timeout'); })]);
  }

  function buscarConvite(token) {
    var qs = new URLSearchParams(location.search);
    if (isLocal && qs.has('demo')) {
      var n = Math.min(4, Math.max(1, parseInt(qs.get('demo'), 10) || 2));
      var resp = new URLSearchParams(location.search).get('resp') || '';
      return espera(800).then(function () {
        return { ok: true, nomes: DEMO_NOMES.slice(0, n), resposta: resp, recado: '' };
      });
    }
    if (!token) return Promise.resolve({ ok: false, erro: 'nao_encontrado' });
    return comTimeout(fetch(API + '?token=' + encodeURIComponent(token), { cache: 'no-store' }))
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); });
  }

  function enviarResposta(dados) {
    if (isLocal && new URLSearchParams(location.search).has('demo')) {
      return espera(900).then(function () { return { ok: true }; });
    }
    // Corpo como text/plain: requisição "simples", sem preflight de CORS.
    return comTimeout(fetch(API, { method: 'POST', body: JSON.stringify(dados) }))
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); });
  }

  /* ---------------- Telas ---------------- */
  function mostrar(el) {
    el.hidden = false;
    // força o reflow para a animação de entrada rodar
    void el.offsetWidth;
    el.classList.add('is-in');
  }

  function telaInvalida() {
    $('loading-hint').hidden = true;
    mostrar($('notice-invalid'));
    document.title = 'André e Emanuele';
  }

  function telaErro() {
    $('loading-hint').hidden = true;
    mostrar($('notice-error'));
  }

  function telaConvite(conv) {
    var nomes = (conv.nomes || []).map(function (s) { return String(s).trim(); }).filter(Boolean);
    state.convite = conv;
    state.plural = nomes.length > 1;

    $('loading-hint').hidden = true;
    $('greet-names').textContent = juntarNomes(nomes);
    $('greet-line').textContent = txt('line');
    $('rsvp-q').textContent = txt('q');
    document.querySelectorAll('[data-txt]').forEach(function (el) { el.textContent = txt(el.getAttribute('data-txt')); });

    preencherFormulario(conv);
    body.classList.add('is-ready');
    mostrar($('greet'));
    mostrar($('scroll-cue'));
    iniciarRevelacoes();
    iniciarMapa();
    iniciarContagem();
  }

  /* ---------------- Contagem regressiva ---------------- */
  function diasAteCasamento() {
    var hoje = new Date();
    var a = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    var b = Date.UTC(WEDDING.y, WEDDING.m - 1, WEDDING.d);
    return Math.round((b - a) / 864e5);
  }

  function textoContagem(n) {
    if (n > 1) return 'faltam <b>' + n + '</b> dias';
    if (n === 1) return 'falta <b>1</b> dia';
    if (n === 0) return '<b>é hoje!</b>';
    return '';
  }

  function iniciarContagem() {
    var el = $('countdown');
    var total = diasAteCasamento();
    el.innerHTML = textoContagem(total);
    if (reduceMotion || total < 2) return;

    var feito = false;
    quandoVisivel(el, function () {
      if (feito) return;
      feito = true;
      var b = el.querySelector('b');
      var inicio = total + 60;   // regressiva: desce até o número real
      var t0 = null, dur = 1600;
      function passo(t) {
        if (t0 === null) t0 = t;
        var k = Math.min(1, (t - t0) / dur);
        var e = 1 - Math.pow(1 - k, 3);
        b.textContent = Math.round(inicio + (total - inicio) * e);
        if (k < 1) requestAnimationFrame(passo);
      }
      b.textContent = inicio;
      setTimeout(function () { requestAnimationFrame(passo); }, 350);
    });
  }

  /* ---------------- Revelação ao rolar ---------------- */
  function quandoVisivel(el, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { fn(); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(el);
  }

  function iniciarRevelacoes() {
    var els = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Mapa: a rota se desenha ---------------- */
  function iniciarMapa() {
    var map = $('map');
    if (!map || reduceMotion) return;
    function desenhar() {
      map.classList.remove('is-drawing');
      void map.offsetWidth;
      map.classList.add('is-drawing');
    }
    quandoVisivel(map, function () { setTimeout(desenhar, 450); });
    map.querySelector('svg').addEventListener('click', desenhar);
  }

  /* ---------------- Formulário ---------------- */
  function preencherFormulario(conv) {
    var form = $('rsvp-form');
    var resp = conv.resposta;
    if (resp === 'sim' || resp === 'talvez' || resp === 'nao') {
      var input = form.querySelector('input[value="' + resp + '"]');
      if (input) input.checked = true;
      $('rsvp-already').textContent = txt('already');
      $('rsvp-already').hidden = false;
      $('submit').textContent = 'Atualizar resposta';
    }
    $('recado').value = conv.recado || '';
    atualizarContador();
  }

  function atualizarContador() {
    var n = $('recado').value.length;
    $('counter').textContent = n > RECADO_MAX - 100 ? (RECADO_MAX - n) + ' caracteres restantes' : '';
  }

  function erroForm(msg) {
    var el = $('form-error');
    el.textContent = msg || '';
    el.hidden = !msg;
  }

  function aoEnviar(ev) {
    ev.preventDefault();
    if (state.enviando) return;
    var form = $('rsvp-form');
    var marcado = form.querySelector('input[name="resposta"]:checked');
    if (!marcado) { erroForm('Escolhe uma das opções acima.'); form.querySelector('input[name="resposta"]').focus(); return; }
    erroForm('');

    var recado = $('recado').value.trim().slice(0, RECADO_MAX);
    var dados = { token: state.token, resposta: marcado.value, recado: recado };
    var btn = $('submit'), textoBtn = btn.textContent;

    state.enviando = true;
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    enviarResposta(dados).then(function (r) {
      if (!r || !r.ok) throw new Error((r && r.erro) || 'falha');
      state.convite.resposta = dados.resposta;
      state.convite.recado = dados.recado;
      // O botão continua desativado durante a saída do formulário (evita envio duplo);
      // é reativado em mostrarConcluido, quando o formulário já sumiu.
      mostrarConcluido(dados.resposta);
    }).catch(function () {
      erroForm('Não deu para enviar agora. Confere a internet e tenta de novo.');
      state.enviando = false;
      btn.disabled = false;
      btn.textContent = textoBtn;
    });
  }

  function mostrarConcluido(resp) {
    var form = $('rsvp-form'), done = $('rsvp-done');
    $('done-title').textContent = txt('done-' + resp);
    $('done-sub').textContent = txt('sub-' + resp);

    function trocar() {
      form.hidden = true;
      form.classList.remove('is-leaving');
      state.enviando = false;
      $('submit').disabled = false;
      $('submit').textContent = 'Atualizar resposta';
      done.classList.remove('is-in');
      mostrar(done);
      done.focus({ preventScroll: true });
      var top = done.getBoundingClientRect().top;
      if (top < 0 || top > window.innerHeight * 0.6) {
        done.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
    }
    if (reduceMotion) { trocar(); return; }
    form.classList.add('is-leaving');
    setTimeout(trocar, 600);
  }

  function mudarResposta() {
    var form = $('rsvp-form'), done = $('rsvp-done');
    done.hidden = true;
    done.classList.remove('is-in');
    $('rsvp-already').textContent = txt('already');
    $('rsvp-already').hidden = false;
    $('submit').textContent = 'Atualizar resposta';
    form.hidden = false;
    form.classList.add('is-in');
    var marcado = form.querySelector('input[name="resposta"]:checked');
    (marcado || form.querySelector('input[name="resposta"]')).focus({ preventScroll: true });
    form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  function montarSelo() {
    // Reaproveita o A e o E do monograma no selo de "resposta enviada".
    var g = document.querySelector('#seal .seal-ae');
    ['A', 'E'].forEach(function (id) {
      var src = document.querySelector('#mono #' + id);
      if (!src) return;
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', src.getAttribute('d'));
      g.appendChild(p);
    });
  }

  /* ---------------- Início ---------------- */
  function carregar(novaTentativa) {
    $('notice-error').hidden = true;
    // Na primeira vez, a abertura do monograma cobre a espera; numa nova tentativa, não há abertura.
    var atraso = novaTentativa ? 250 : (reduceMotion ? 600 : INTRO_MS + 900);
    var hint = setTimeout(function () { $('loading-hint').hidden = false; }, atraso);
    var dados = buscarConvite(state.token).then(
      function (r) { return r; },
      function () { return { ok: false, erro: 'rede' }; }
    );
    return Promise.all([dados, intro]).then(function (res) {
      clearTimeout(hint);
      var r = res[0];
      if (r && r.ok && r.nomes && r.nomes.length) return telaConvite(r);
      if (r && r.erro === 'rede') return telaErro();
      telaInvalida();
    });
  }

  state.token = lerToken();
  var intro = iniciarMonograma();
  montarSelo();

  $('rsvp-form').addEventListener('submit', aoEnviar);
  $('rsvp-form').addEventListener('change', function () { erroForm(''); });
  $('recado').addEventListener('input', atualizarContador);
  $('change').addEventListener('click', mudarResposta);
  $('retry').addEventListener('click', function () { intro = Promise.resolve(); carregar(true); });

  carregar();
})();
