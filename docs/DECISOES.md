# Save the date — André e Emanuele

Registro de todas as decisões tomadas para o site de save the date. É a fonte de verdade do projeto: se algo mudar, atualize aqui.

> Última atualização: 06/11/2026

---

## 1. Visão geral

| | |
|---|---|
| **Casal** | André e Emanuele |
| **Data do casamento** | Sábado, 15 de maio de 2027 |
| **Cidade** | Vila Flores · RS |
| **Cerimônia** | Igreja Matriz Santo Antônio (Paróquia Santo Antônio) |
| **Recepção, jantar e festa** | Restaurante Mascaron |
| **Domínio** | `andreemanu.site` (comprado na Hostinger) |
| **Repositório** | https://github.com/andredallacosta/andreemanu |
| **Envio dos save the dates** | Novembro–dezembro de 2026, ~5–6 meses antes |
| **Custo-alvo** | Zero, ou o mais próximo disso. Só o domínio é pago. |

**Origem dos convidados:** Marau (onde o casal mora), São Domingos do Sul (cidade natal da Emanuele), Nova Bassano (cidade natal do André) e região. Poucos casos vêm de longe e são avisados pessoalmente.

### O que o site é (e o que não é)

- É um **save the date com pré-confirmação**. Avisa a data e o local, e pergunta a *intenção* de ir, para o casal ter uma estimativa cedo.
- **Não** é o convite oficial. O RSVP oficial (com detalhes por pessoa, horário, traje etc.) vem depois, em um "segundo site" ou segunda fase, com o **mesmo link** para cada convidado.
- O acesso é feito **só por link pessoal enviado no WhatsApp**, para evitar bots e curiosos.

---

## 2. Fluxo do convidado

1. Recebe no WhatsApp uma mensagem com o link pessoal: `andreemanu.site/?c=k7m2xq`.
2. Abre o link. O monograma se desenha na tela (a animação cobre o tempo de carregar o convite).
3. Vê a saudação com os próprios nomes, a data, a contagem regressiva e os locais.
4. Responde à pré-confirmação (Sim / Ainda não sei / Não) e, se quiser, deixa um recado.
5. Vê uma confirmação ("Anotamos aqui 💛"). Pode voltar pelo mesmo link e mudar a resposta quando quiser.

---

## 3. Conteúdo da página (de cima para baixo)

Uma página única, uma coluna, pensada primeiro para celular (quase todos vão abrir pelo WhatsApp).

### 3.1 Abertura
- **Monograma animado** (ver seção 7).
- **Saudação personalizada** com os nomes do convite (ver regras de singular/plural na seção 4).
- **Frase:** "Vamos nos casar, e não seria a mesma coisa sem você." / "…sem vocês."

### 3.2 A data
- Em destaque, grande, em Playfair Display: **15 · 05 · 2027**
- Logo abaixo, menor, em Garet: **Sábado, 15 de maio de 2027**
- **Contagem regressiva** discreta (ex.: "faltam 190 dias"), com os números trocando em transição suave.
- **Não** terá botão "Salvar na agenda" (decidido que não precisa).
- **Sem horário** no save the date. O horário vai no convite oficial.

### 3.3 Onde
- Título: **Vila Flores · RS**
- **Mapa ilustrado** (ver seção 8) com a igreja, o restaurante e a rota entre eles.
- Legenda do mapa:
  > "Igreja e recepção ficam na mesma rua, a 200 m uma da outra. Dá para ir a pé ou de carro, o restaurante tem estacionamento."
  - ⚠️ **Confirmar** que o Mascaron tem estacionamento próprio. Se não tiver, tirar a última frase.
  - Decisão: não decidir pelo convidado se vai a pé ou de carro (salto, estacionamento etc.), só informar.
- **Dois cartões**, lado a lado no desktop e empilhados no celular:

| | Cerimônia | Recepção |
|---|---|---|
| Ícone | Igreja em traço fino | Taças em traço fino |
| Nome | Igreja Matriz Santo Antônio | Restaurante Mascaron |
| Endereço | Rua 12 de Maio · Vila Flores | Rua 12 de Maio · Vila Flores |
| Botões | Maps · Waze | Maps · Waze |

- Ícones desenhados no mesmo traço do círculo do monograma. **Nada de emoji.**
- Sem endereço completo nem horário.

### 3.4 Pré-confirmação
Ver seção 5.

### 3.5 Rodapé
- "Convite oficial em breve 💌"
- Assinatura "André e Emanuele" (ou o monograma pequeno)

### 3.6 O que fica de fora agora (vai para o convite oficial / segundo site)
- Horário da cerimônia e da festa
- Traje (dress code)
- Hospedagem e como chegar para quem vem de longe
- Lista de presentes / PIX (as fontes BR recomendam pôr no site, não no convite, explicando o destino do dinheiro)
- Prazo do RSVP
- RSVP por pessoa, crianças, restrições alimentares, pedido de música
- **Fotos do pré-wedding** (ainda não foi feito, as fotos entram no segundo site)
- Mapa ilustrado mais elaborado, se quiserem evoluir

### 3.7 Decisões descartadas
- **Aviso de viagem:** descartado, porque quase todos são da região.
- **Foto do casal:** só no segundo site.
- **Salvar na agenda:** descartado.
- **Mapa do Google embutido (iframe):** descartado, porque quebra a estética. Os botões de Maps/Waze resolvem.
- **Nome de exibição alternativo** ("Família Andrade"): descartado. Nenhum convite terá mais de 4 pessoas; se tiver mais, divide-se em mais convites.

---

## 4. Personalização: singular e plural

Cada convite tem **de 1 a 4 nomes**. O site sempre exibe a lista de nomes (não existe nome de exibição alternativo).

### Junção dos nomes
| Qtd. | Exemplo |
|---|---|
| 1 | Otavio |
| 2 | Otavio e Sonia |
| 3 | Otavio, Sonia e Camila |
| 4 | Otavio, Sonia, Camila e Pedro |

### Textos que variam
| Elemento | Singular (1 nome) | Plural (2+ nomes) |
|---|---|---|
| Frase de abertura | Vamos nos casar, e não seria a mesma coisa sem **você**. | Vamos nos casar, e não seria a mesma coisa sem **vocês**. |
| Pergunta | Podemos contar **contigo**? | Podemos contar **com vocês**? |
| Opção 1 | Sim, não **perco** por nada | Sim, não **perdemos** por nada |
| Opção 2 | Ainda não **sei** | Ainda não **sabemos** |
| Opção 3 | Infelizmente não **vou** conseguir | Infelizmente não **vamos** conseguir |

- A mistura "sem você" com "contigo" é intencional, porque é como se fala no RS.
- **Todo o texto é neutro em gênero** ("contigo", "com vocês", "não perco"), sem "confirmado(a)" ou "convidado(a)". Não é preciso guardar o gênero de ninguém.

---

## 5. Pré-confirmação (formulário)

**Modelo escolhido: B, pré-confirmação leve.** Etiqueta tradicional diz que save the date não pede RSVP, mas uma *intenção* ajuda a dimensionar espaço e buffet cedo. Para não confundir, o aviso de que não é a confirmação oficial é obrigatório.

### Campos
1. **Intenção**, obrigatória, uma das três opções (textos na seção 4). Valores internos: `sim`, `talvez`, `nao`.
2. **Recado para os noivos**, opcional e deixando claro que é opcional:
   - Rótulo: "Quer deixar um recado pra gente? (opcional)"
   - Limite: ~500 caracteres.

### Regras
- A resposta é **pelo convite inteiro**, não por pessoa (o detalhamento por pessoa fica para o RSVP oficial).
- Aviso fixo abaixo do formulário: *"A confirmação oficial chega junto com o convite."*
- Depois de responder: o formulário se dissolve e aparece "Oba! Anotamos aqui 💛", com o círculo do monograma se fechando.
- A pessoa **pode mudar a resposta** pelo mesmo link, a qualquer momento, até o convite oficial.
- Ao reabrir o link, a resposta anterior aparece já marcada.

### Linha do tempo
- **Nov–dez/2026:** envio do save the date, com a pré-confirmação.
- **~Março/2027:** convite oficial, com o mesmo link virando RSVP oficial.
- **~Meados de abril/2027:** prazo do RSVP oficial.
- **15/05/2027:** casamento.

---

## 6. Acesso por token (link pessoal)

### Formato do link
```
https://andreemanu.site/?c=k7m2xq
```
- **Escolhido `?c=` (query string) em vez de `/k7m2xq` (caminho).** No GitHub Pages, um caminho inexistente exigiria o truque do 404.html, o servidor responderia "404" e o WhatsApp poderia não gerar o preview. Com `?c=` o servidor sempre entrega a página normal. Decisão tomada por ser **o mais sólido**: um erro aqui obrigaria a reenviar todos os convites.

### Token
- **Um token por convite** (família/grupo), não por pessoa.
- **6 caracteres aleatórios**, alfabeto sem caracteres ambíguos: `23456789abcdefghjkmnpqrstuvwxyz` (sem `0`, `o`, `1`, `l`, `i`).
- ~887 milhões de combinações, então adivinhar um token é inviável para ~100–150 convites.
- **Nunca** sequencial (`?c=1`, `?c=2`) nem derivado do nome.
- Gerado pelo menu da planilha (ver seção 10) e **nunca muda** depois de enviado.

### Token inválido ou ausente
- `andreemanu.site` sem token, ou com token que não existe, mostra **só o monograma** e a mensagem:
  > "Este convite não foi encontrado. Se você recebeu um link nosso, confere se ele veio completo 💛"
- **Nenhum dado do evento** (data, local) aparece nessa tela.

### Outras proteções
- `<meta name="robots" content="noindex, nofollow">`, para não aparecer no Google.
- O preview do WhatsApp é **igual para todos** (o WhatsApp lê a página sem token), então não contém nada pessoal.

---

## 7. Identidade visual

### 7.1 Monograma
- Original feito no Canva: `assets/monograma/monograma-original-canva.png`.
- **Recriado em SVG**, praticamente idêntico ao original (validado por sobreposição de pixels): `assets/monograma/monograma.svg`. Comparação lado a lado: `assets/monograma/comparacao.png`.
- **Fontes originais do Canva:**
  - "ANDRÉ E EMANUELE" no círculo: **Garet**
  - **A**: **Playfair Display**
  - **E**: **Symphony**. Existem várias fontes com esse nome e não dá para saber qual é a do Canva.
- **Como foi recriado:**
  - **Círculo:** arco geométrico (centro, raio, espessura e abertura medidos do original). Por ser um traço (`stroke`), pode ser animado "se desenhando".
  - **Letras do nome:** contornos da Garet Book, uma letra por `<path>`, posicionadas no ângulo exato de cada letra do original.
  - **A e E:** vetorizados direto da imagem (potrace). Isso preserva o recorte em creme onde o E cruza o A e evita depender da fonte Symphony.
- Estrutura do SVG: `#ring` (círculo), `#names` (14 letras), `#A`, `#E`. As cores usam `currentColor` no protótipo, o que permite mudar a cor via CSS.
- Scripts usados (referência, os caminhos apontam para a pasta temporária original): `tools/monograma/`.
- **Aprovado pelo casal ("ficou perfeito").**

### 7.2 Cores
Só as cores do monograma. **Sem cor de destaque**: botões e detalhes usam a própria tinta, como num convite impresso.

| Token | Cor | Uso |
|---|---|---|
| `--paper` | `#FBFBF6` | Fundo (creme do Canva) |
| `--ink` | `#232323` | Texto, monograma, linhas, botões (grafite do Canva) |
| `--ink-soft` | `#5E5C57` | Texto secundário |
| `--hair` | `#D9D7CE` | Linhas finas e divisores |
| `--street` | `#B9B6AC` | Ruas secundárias no mapa |
| `--street-strong` | `#8A877E` | Avenidas e BR no mapa |

- **Sem modo escuro**, de propósito: o site é sempre "papel creme". Se o celular estiver no modo escuro, o site não muda.

### 7.3 Tipografia
| Papel | Fonte | Uso |
|---|---|---|
| Destaques | **Playfair Display** (a fonte do A) | Nomes do convite, data, nomes dos locais, títulos |
| Texto e rótulos | **Garet Book** (a fonte do círculo) | Rótulos em CAIXA ALTA espaçada (~0.3em), botões, textos corridos |
| Script | — | Nenhuma. O E cursivo é exclusivo do monograma. |

- Fontes **hospedadas no próprio site** (sem Google Fonts), para mais rapidez e confiabilidade. Arquivos em `assets/fonts/`.
- Playfair Display: licença OFL (livre).
- Garet Book: baixada do DaFont (Type Forward). As fontes divergem sobre se o uso comercial é livre, mas para um site pessoal de casamento não há problema.
- Pendente: converter a Playfair para `.woff2` e fazer subset (só os caracteres usados) para reduzir o tamanho.

### 7.4 Estilo geral
- Layout em **uma coluna**, centralizado, largura de leitura estreita (~560px).
- Elemento gráfico recorrente: **linha fina circular** (divisores, pinos do mapa).
- Botões: contorno fino em grafite, cantos totalmente arredondados (pílula), texto em Garet caixa alta espaçada. No hover/toque, inverte (fundo grafite, texto creme).
- Visual "editorial minimalista": muito espaço em branco, tipografia fazendo o trabalho.

---

## 8. Mapa ilustrado

- Desenhado a partir das **ruas reais do OpenStreetMap** (dados em `assets/mapa/osm-vila-flores.json`), em traço fino grafite sobre creme, no estilo do monograma.
- Mostra a BR-470, a Av. das Flores, as ruas do entorno, os dois locais como **pinos em círculo** (anel + ponto), a rota entre eles, a rosa dos ventos ("N") e a escala de 100 m.
- Rota calculada pelas ruas: **~207 m** entre a igreja e o restaurante, ambos na **Rua 12 de Maio**, um de cada lado da Av. das Flores.
- Coordenadas já projetadas para SVG: `assets/mapa/ruas-projetadas.json` (script: `tools/mapa/mkmap.py`).

### Coordenadas oficiais (dos links do Google Maps enviados pelo casal)
| Local | Latitude | Longitude | Link |
|---|---|---|---|
| Igreja Matriz Santo Antônio | -28.8626914 | -51.5507618 | https://maps.app.goo.gl/KUoZFcJA8MnbJ6wq6 |
| Restaurante Mascaron | -28.8625144 | -51.5525817 | https://maps.app.goo.gl/VzDfQdtEdQT7w3dF6 |

- Instagram: [@mascaronrestaurante](https://www.instagram.com/mascaronrestaurante/), [@paroquiasantoantoniors](https://www.instagram.com/paroquiasantoantoniors/)
- ⚠️ **Atenção:** existe um **"Restaurante Giratório Mascaron" em Veranópolis**, que é outro lugar. Por isso os botões usam **coordenadas exatas**, nunca busca por nome.

### Links dos botões
- Google Maps: `https://www.google.com/maps/dir/?api=1&destination=LAT,LNG`
- Waze: `https://waze.com/ul?ll=LAT,LNG&navigate=yes`
- No celular, ambos abrem direto o app com a rota.

---

## 9. Animações

**Princípio:** discretas e elegantes. Nada de confete, corações voando, música automática, parallax pesado ou brilhos.

| Momento | Animação |
|---|---|
| Abertura (~3s) | 1) círculo se desenha a partir da abertura, como caneta; 2) letras do nome aparecem uma a uma, seguindo a curva; 3) A sobe suavemente; 4) E se revela da esquerda para a direita, como se fosse escrito. Protótipo aprovado: `assets/monograma/prototipo-animacao.html`. |
| Carregamento | A animação de abertura **cobre o tempo** de buscar o convite no Apps Script (~1–2s). Ninguém percebe a espera. |
| Rolagem | Textos sobem suavemente em fade, um após o outro, ao entrar na tela. |
| Contagem regressiva | Números trocam com transição suave. |
| Mapa | A rota **se desenha quando o mapa entra na tela** e **redesenha ao tocar no mapa**. **Sem loop** (decidido: loop a cada 5–10s distrai). Opcional, a avaliar quando estiver pronto: "respiro" leve nos pinos a cada ~8s. |
| Resposta enviada | Formulário se dissolve, aparece "Anotamos aqui 💛", e o círculo do monograma se fecha. |

- **Acessibilidade:** com "reduzir movimento" ativado no celular (`prefers-reduced-motion`), tudo aparece pronto, sem animação.
- A página precisa estar **completa e legível** mesmo sem as animações.

---

## 10. Planilha (cadastro, painel e respostas)

- **Reaproveitar a planilha que já existe** no Google Drive do André (a das versões da lista de convidados), criando uma **nova aba "Convites"**. Centraliza tudo.
- A planilha **é o painel**: não haverá painel admin separado.

### Aba "Convites": colunas
| Coluna | Quem preenche | Descrição |
|---|---|---|
| `nomes` | Casal | 1 a 4 nomes, separados por vírgula. Ex.: `Otavio, Sonia, Camila` |
| `telefone` | Casal | Com DDI e DDD, só números. Ex.: `5554999998888` |
| `envia` | Casal | `André` ou `Manu`, para cada um enviar ao seu lado |
| `obs` | Casal (opcional) | Observação interna. Ex.: "lado da noiva", "trabalho" |
| `token` | Menu "💍 Gerar tokens" | 6 caracteres. **Nunca editar depois de enviado.** |
| `link_whats` | Menu "💍 Gerar tokens" | Link `wa.me` clicável com a mensagem pronta |
| `abriu_em` | Automático | Data/hora da **primeira** abertura do link |
| `ultima_abertura` | Automático | Data/hora da abertura mais recente |
| `resposta` | Automático | `sim`, `talvez` ou `nao` |
| `recado` | Automático | Texto livre do convidado |
| `respondeu_em` | Automático | Data/hora da última resposta |

### Uso no dia a dia
- Filtrar `envia = Manu` e `abriu_em` vazio mostra quem lembrar.
- Os dois veem as respostas em tempo real (a planilha já é compartilhada entre eles).

### Envio pelo WhatsApp
- O menu gera para cada convite um link `https://wa.me/<telefone>?text=<mensagem>`. Clicou, o WhatsApp abre na conversa certa com o texto pronto, e é só apertar enviar.
- Rascunho da mensagem (ajustar à vontade):
  > "Oi Otavio, Sonia e Camila! Temos uma novidade 💍 https://andreemanu.site/?c=k7m2xq"
- Cada um envia do próprio celular para os convites com `envia` = seu nome.

---

## 11. Arquitetura técnica

**Custo: zero.** Só o domínio é pago.

```
Convidado (WhatsApp)
   │  andreemanu.site/?c=k7m2xq
   ▼
GitHub Pages (site estático: HTML/CSS/JS, fontes, monograma)
   │  fetch → URL do Web App
   ▼
Google Apps Script (vinculado à planilha, roda como André)
   │
   ▼
Google Sheets — aba "Convites"
```

### 11.1 Site: GitHub Pages
- Repositório **público** (exigência do Pages gratuito).
- 🔒 **Regra de ouro:** nenhum nome, telefone ou token no repositório. O site só pergunta ao Apps Script "este token existe?" e recebe os dados daquele convite.
- HTTPS gratuito e domínio próprio.

### 11.2 Backend: Google Apps Script + Sheets
**Por que não Supabase:** o plano grátis **pausa o projeto após 7 dias sem uso**, e o site quebraria. **Por que não Cloudflare Workers:** daria mais configuração e o painel teria que ser construído. A planilha já existe e vira o painel de graça.

**Implantação:**
- Planilha → Extensões → Apps Script (script **vinculado** à planilha).
- Publicado como **Web App**: *Executar como: eu (André)* · *Quem tem acesso: qualquer pessoa*.
- Gera uma URL `https://script.google.com/macros/s/.../exec`, que fica no código do site e **pode ser pública**.

**Não há secrets.** O GitHub Pages não tem secrets, e um site estático nem conseguiria escondê-los. Também não precisa: o script roda com a permissão do André no Google, e quem chama a URL só recebe o que o script decide devolver. **A credencial é o próprio token do convite.**

**API (só duas operações):**
| Operação | Entrada | Saída | Efeito |
|---|---|---|---|
| Buscar convite | `GET ?c=<token>` | `{ nomes: [...], resposta, recado }` ou "não encontrado" | Marca `abriu_em` (se vazio) e `ultima_abertura` |
| Responder | `POST` (corpo JSON como `text/plain`, para evitar preflight de CORS) `{ c, resposta, recado }` | `{ ok: true }` | Grava `resposta`, `recado`, `respondeu_em` na linha do token |

**Cuidados obrigatórios no script:**
- Lê e escreve **só na aba "Convites"**. As outras abas (versões da lista) ficam intocadas.
- **Não existe operação de "listar todos".** Nunca devolve mais de um convite.
- Validação: `resposta` só aceita `sim` / `talvez` / `nao`, e o `recado` tem no máximo ~500 caracteres.
- Proteção contra fórmula: recado começando com `=`, `+`, `-` ou `@` é gravado como texto (prefixo `'`).
- `LockService` contra gravações simultâneas.

### ⚠️ A pegadinha do Apps Script
> Ao atualizar o script, **NUNCA** criar uma "Nova implantação". Sempre usar **Gerenciar implantações → editar a existente (lápis) → Versão: Nova versão**. Uma implantação nova gera **outra URL**, e o site para de funcionar.

Os links dos convidados (`andreemanu.site/?c=...`) **nunca mudam**. No pior caso, a correção é trocar a URL no código do site, sem reenviar nada.

### 11.3 Domínio: Hostinger → GitHub Pages
- No painel DNS da Hostinger, registros `A` para o domínio raiz (`@`) apontando para os IPs do GitHub Pages:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME` de `www` → `andredallacosta.github.io`
- No repositório: arquivo `CNAME` com `andreemanu.site` e "Enforce HTTPS" ativado nas configurações do Pages.
- 💸 **Atenção à renovação:** domínios `.site` costumam ser baratos no 1º ano, mas a renovação pode passar de US$ 30/ano. Desligar a renovação automática se não quiserem manter o site depois do casamento.

---

## 12. Preview do WhatsApp (Open Graph)

O que aparece no balão antes de a pessoa clicar. **Igual para todos os convites.**

| Tag | Valor |
|---|---|
| `og:title` | André e Emanuele |
| `og:description` | Save the date · Vila Flores, RS |
| `og:image` | Imagem **1200×630**, fundo creme, monograma **centralizado** com "15 · 05 · 2027". **< 600 KB.** |
| `og:url` | https://andreemanu.site/ |

- Monograma bem no centro, porque o WhatsApp às vezes corta a imagem em quadrado.
- O WhatsApp guarda o preview em cache: testar com um link "novo" depois de qualquer mudança na imagem.
- **Favicon e ícone da tela inicial:** só o "AE" (sem o círculo e o texto, que ficariam ilegíveis em tamanho pequeno).

---

## 13. Pendências

- [ ] Confirmar se o Mascaron tem **estacionamento próprio** (legenda do mapa).
- [ ] Confirmar o nome **"Igreja Matriz Santo Antônio"** (o André acha que sim).
- [ ] Escrever o texto final da mensagem do WhatsApp.
- [ ] Construir o site (HTML/CSS/JS).
- [ ] Escrever o Apps Script + passo a passo de instalação na planilha.
- [ ] Criar a aba "Convites" e cadastrar os convites.
- [ ] Gerar a imagem do preview (og:image) e o favicon.
- [ ] Converter a Playfair para woff2 com subset.
- [ ] Configurar o DNS na Hostinger e o GitHub Pages.
- [ ] Testar ponta a ponta: link válido, inválido, singular, plural, mudar resposta, preview no WhatsApp (Android e iPhone), botões Maps/Waze nos dois sistemas.
- [ ] Enviar um convite de teste para vocês mesmos antes do envio real.

## 14. Fase 2: convite oficial (futuro, ~março/2027)

Ideias já levantadas para quando o convite oficial sair, **no mesmo link**:
- RSVP oficial por pessoa (quem vai de cada convite), com prazo em meados de abril.
- Horário da cerimônia e da festa, traje.
- Restrições alimentares e alergias (texto livre), crianças / cardápio infantil.
- "Que música não pode faltar?" (vira lista para o DJ).
- Lista de presentes / PIX, explicando o destino do dinheiro.
- Fotos do pré-wedding.
- Mapa ilustrado mais elaborado, hospedagem para quem vem de longe.
- A resposta da pré-confirmação aparece já marcada para facilitar.

---

## 15. Referências da pesquisa

- [Lejour: save the date no site](https://lejour.com.br/blog/save-the-date-no-site-de-casamento)
- [Casamentos.com.br: save the date](https://www.casamentos.com.br/artigos/save-the-date-duvidas-casal--c4844)
- [Casar.com: o que é save the date](https://blog.casar.com/o-que-e-save-the-date-e-como-fazer-sem-custo/)
- [InviteDrop: save the date com RSVP depois](https://www.invitedrop.com/pt/blog/how-to-word-a-save-the-date-with-rsvp-details-to-follow)
- [Casar365: save the date por WhatsApp](https://casar365.com.br/save-the-date-casamento/)
- [RSVPlinks: modelos de acesso ao RSVP](https://www.rsvplinks.com/guides/add-rsvp-to-wedding-website)
- [sayi.do: perguntas de RSVP](https://sayi.do/blog/questions-to-ask-wedding-guests-rsvp)
- [Casamentos.com.br: PIX de casamento](https://www.casamentos.com.br/artigos/pix-de-casamento--c10086)
- [git hitched: RSVP por família (GitHub)](https://github.com/fredbenenson/git-hitched)
- [rampatra/wedding-website: Sheets + Apps Script](https://github.com/rampatra/wedding-website)
- [WedSites: exemplos 2026](https://blog.wedsites.com/best-wedding-website-examples-for-2026/)
- [YesLovey: exemplos por estilo](https://yeslovey.com/en/blog/wedding-website-examples/)
- [Screenhance: tamanho de og:image](https://screenhance.com/blog/og-image-size-guide)
