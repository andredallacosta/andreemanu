# Instalação e publicação

Passo a passo para colocar o save the date no ar. As decisões por trás de cada passo estão em [DECISOES.md](DECISOES.md).

Ordem: **1 → 2 → 3** podem ser feitos em qualquer ordem. O **4** (testar) só depois de tudo.

---

## 1. Planilha + Apps Script (backend)

### 1.1 Colar o script
1. Abra a planilha da lista de convidados no Google Drive.
2. **Extensões → Apps Script.**
3. Apague o conteúdo de `Código.gs` e cole todo o conteúdo de [`apps-script/Code.gs`](../apps-script/Code.gs).
4. Salve (ícone de disquete). Pode dar o nome "Save the date" ao projeto.

### 1.2 Criar a aba "Convites"
1. Volte para a planilha e **recarregue a página** (F5). Aparece o menu **💍 Convites**.
2. **💍 Convites → Criar aba "Convites"**.
3. Na primeira vez, o Google pede autorização: *Continuar → escolher a conta → Avançado → Acessar Save the date (não seguro) → Permitir*. O "não seguro" aparece porque o script é seu e não passou por revisão do Google. É normal.

A aba nasce com o cabeçalho certo. As colunas cinza são automáticas: **não editar à mão** (principalmente `token`).

### 1.3 Publicar como Web App (só uma vez)
1. No Apps Script: **Implantar → Nova implantação**.
2. Engrenagem ao lado de "Selecionar tipo" → **App da Web**.
3. Descrição: `v1`. **Executar como: Eu.** **Quem pode acessar: Qualquer pessoa.**
4. **Implantar** → copie a **URL do app da Web** (termina em `/exec`).
5. Cole a URL em [`js/site.js`](../js/site.js), na linha `var API = '...'` (ou mande para o Claude colocar).
6. **Teste:** abra numa **janela anônima** a URL do Web App com `?token=zzzzzz` no fim. Tem que aparecer `{"ok":false,"erro":"nao_encontrado"}` (token falso, não marca nada na planilha). Se aparecer "Página não encontrada" ou uma tela de login, confira "Quem pode acessar: Qualquer pessoa".

> ⚠️ **A pegadinha:** daqui pra frente, ao mudar o script, **nunca** use "Nova implantação". Use **Implantar → Gerenciar implantações → lápis → Versão: Nova versão → Implantar**. Uma implantação nova gera outra URL e o site para de funcionar.

> ⚠️ **Autorização de novo:** se uma versão nova do script pedir uma permissão que ainda não foi dada, o Web App falha para todo mundo até o André autorizar. Depois de publicar uma versão nova, rode qualquer função no editor (ex.: `onOpen`); se aparecer a tela de autorização, aceite. Em seguida, abra um link de convite para conferir que está funcionando.

### 1.4 Cadastrar os convites
Em cada linha da aba **Convites**:

| Coluna | Exemplo |
|---|---|
| `nomes` | `Ricardo, Ana Paula` (1 a 4 nomes, separados por vírgula) |
| `telefone` | `54999998888` (DDD + número; pode ter espaço, parênteses e traço) |
| `envia` | `André` ou `Manu` |
| `obs` | opcional, só para vocês |

Depois: **💍 Convites → Gerar tokens e links do WhatsApp**. Pode rodar quantas vezes quiser: ele só cria token para quem ainda não tem e nunca muda um token existente. Se mudar um nome ou telefone, rode de novo para atualizar o link do WhatsApp.

O script acrescenta o **55** sozinho quando o telefone tem só DDD + número. Isso importa porque **54 sozinho é o código da Argentina**: sem o 55, o convite iria para outro número. No fim, ele avisa as linhas sem telefone ou com número estranho.

A mensagem do WhatsApp fica no topo do script (`var MENSAGEM = ...`). Mudou o texto? Salve o script e rode o menu de novo. (Mudar só a mensagem **não** exige nova versão da implantação, porque o menu roda direto da planilha.)

---

## 2. Domínio (Hostinger)

No painel da Hostinger: **Domínios → andreemanu.site → DNS / Nameservers → Registros DNS**.

1. **Apague** os registros que a Hostinger cria para a página de "domínio estacionado":
   - todos os `A` do `@`;
   - todos os **`AAAA`** do `@` (IPv6). Se sobrar um, quem acessa por IPv6 (boa parte do 4G no Brasil) cai na página da Hostinger em vez do site;
   - o `CNAME` do `www`, se houver.
2. Crie 4 registros `A`, todos com nome `@`:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Crie 4 registros `AAAA`, todos com nome `@` (IPv6 do GitHub Pages):
   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`
4. Crie um `CNAME`: nome `www`, destino `andredallacosta.github.io`.
5. Se existir algum registro **`CAA`**, ele precisa permitir `letsencrypt.org` (é quem emite o HTTPS do GitHub). Se não existir nenhum, tudo certo.

A propagação leva de minutos a algumas horas.

💸 Aproveite e confira a **renovação automática** do domínio (renovação de `.site` costuma ser cara).

---

## 3. GitHub Pages (site)

1. Envie o código para o GitHub (`git push`).
2. No repositório: **Settings → Pages**.
3. *Source*: **Deploy from a branch** → branch **main**, pasta **/ (root)** → Save.
4. *Custom domain*: `andreemanu.site` → Save. (O arquivo `CNAME` do repositório já tem isso.)
5. Quando o DNS propagar e o check ficar verde, marque **Enforce HTTPS**. O certificado pode levar **até 24 h** para sair.
6. **Verifique o domínio** na sua conta: foto do perfil → **Settings → Pages → Add a domain**, e siga as instruções (um registro `TXT` na Hostinger). Isso impede que outra conta do GitHub publique algo em `andreemanu.site` se o Pages um dia for desligado.

> 🚫 **Não envie nenhum convite antes de o HTTPS estar verde e o site abrir certo** em `https://andreemanu.site`, `http://andreemanu.site` e `www.andreemanu.site`, no Wi-Fi e no 4G. Se o link for enviado com o site quebrado, o WhatsApp guarda o preview quebrado em cache para aquele link.

---

## 4. Testar antes de enviar

### Pré-visualizar no computador (sem planilha)
```sh
python3 -m http.server 8000
```
Abra `http://localhost:8000/?demo` para o convite de exemplo (Ricardo e Ana Paula). Para testar outras quantidades de nomes: `?demo=1` (só Ricardo, singular), `?demo=3` e `?demo=4` (acrescenta Camila e Pedro). Para ver como fica quem já respondeu: `?demo=2&resp=talvez`. O modo demo só funciona em `localhost`, nunca no site publicado.

### Checklist no ar
- [ ] `andreemanu.site` sem token → só o monograma e "Este convite não foi encontrado…"
- [ ] Link de um convite com **1 nome** → textos no singular ("contigo", "não perco")
- [ ] Link de um convite com **2+ nomes** → plural
- [ ] Responder → aparece na planilha (`resposta`, `recado`, `respondeu_em`)
- [ ] Reabrir o link → resposta anterior já marcada; mudar e ver a planilha atualizar
- [ ] Recado começando com `=` → aparece como texto na planilha, não como fórmula
- [ ] Recado `15/05` → continua `15/05` na planilha e ao reabrir o link (não vira data)
- [ ] Botões Maps e Waze no Android e no iPhone abrem a rota certa (Vila Flores, não Veranópolis)
- [ ] Preview do WhatsApp (Android e iPhone): imagem com monograma e data
- [ ] Celular em modo escuro → site continua creme (testar também no navegador da Samsung e num Xiaomi, que às vezes forçam o escuro)
- [ ] iPhone: ao tocar no recado, o teclado não esconde o botão Enviar
- [ ] Maps e Waze abrindo de dentro do WhatsApp (não só do navegador)
- [ ] Enviar um convite de teste para vocês mesmos pelo `link_whats`

> Os testes marcam `abriu_em` e `resposta` nas linhas usadas. Depois de testar com convites reais, **apague essas células** (só `abriu_em`, `ultima_abertura`, `resposta`, `recado`, `respondeu_em`; nunca o `token`).

> O WhatsApp guarda o preview em cache. Se mudar a imagem, teste com um link que nunca foi enviado (ex.: `andreemanu.site/?v=2`).

---

## Atualizar o site depois de publicado

O GitHub Pages deixa os arquivos **10 minutos em cache** no navegador. Por isso:
- Mudou `css/site.css` ou `js/site.js`? **Suba o número** em `?v=2` (→ `?v=3`…) nas duas linhas do `index.html`. Assim quem abrir a página nova recebe o CSS/JS novo junto, sem misturar versões.
- Para conferir uma mudança logo depois do push: **Cmd+Shift+R** ou janela anônima.
- Mudança que envolve o site **e** o Apps Script ao mesmo tempo: durante esses 10 minutos, alguém pode estar com o JS antigo. Se possível, faça o script aceitar o jeito antigo e o novo por um tempo.

## Regerar arquivos (só se mudar algo)

| O que mudou | Comando (na raiz do repositório) |
|---|---|
| Rota, recorte ou rótulos do mapa | `python3 tools/mapa/mkmap.py && python3 tools/mapa/mksvg.py` (reescreve o mapa dentro do `index.html`) |
| Preview do WhatsApp ou ícones | abrir `tools/imagens/molde.html` num servidor local e tirar print em 1200×630 (preview) e 180×180 / 32×32 com `?icon=180` / `?icon=32` |
| Fontes (subset woff2) | `pyftsubset` do pacote `fonttools` (comando em DECISOES.md, seção 7.3) |
