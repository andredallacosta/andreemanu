# andreemanu.site

Save the date do casamento de André e Emanuele (15 · 05 · 2027, Vila Flores · RS).

Todas as decisões do projeto estão em [docs/DECISOES.md](docs/DECISOES.md). Para publicar: [docs/INSTALACAO.md](docs/INSTALACAO.md).

Pré-visualizar localmente: `python3 -m http.server 8000` e abrir `http://localhost:8000/?demo` (convite de exemplo: Ricardo e Ana Paula).

## Estrutura

```
index.html              a página (monograma e mapa embutidos em SVG)
css/site.css            estilos
js/site.js              carregamento do convite, textos singular/plural, formulário, animações
apps-script/Code.gs     backend (colar no Apps Script da planilha)
docs/DECISOES.md        decisões completas (conteúdo, visual, infra, pendências)
docs/INSTALACAO.md      passo a passo: planilha, Web App, DNS, GitHub Pages, testes
assets/monograma/       monograma em SVG, original do Canva, comparação e protótipo da animação
assets/mapa/            ruas de Vila Flores (OpenStreetMap) para o mapa ilustrado
assets/fonts/           Garet Book e Playfair Display (woff2 com subset + originais)
assets/og/, icons/      preview do WhatsApp e favicons
tools/                  scripts usados para recriar o monograma e projetar o mapa (referência)
```

> 🔒 Este repositório é público. Nunca commitar nomes, telefones ou tokens de convidados. Eles ficam só na planilha.
