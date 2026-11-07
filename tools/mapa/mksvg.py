"""Gera o SVG do mapa ilustrado e injeta no index.html.

Lê assets/mapa/ruas-projetadas.json (saída do mkmap.py), recorta em volta da
igreja e do restaurante e escreve:
  - assets/mapa/mapa.svg            (arquivo avulso, para referência)
  - index.html, entre <!-- MAPA:INICIO --> e <!-- MAPA:FIM -->

Uso (na raiz do repositório):  python3 tools/mapa/mksvg.py
"""
import json, math, re, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
d = json.loads((ROOT / 'assets/mapa/ruas-projetadas.json').read_text())

# Recorte (unidades do SVG projetado: 1 unidade = 1,554 m)
VX, VY, VW, VH = 150, 120, 360, 270
M_POR_UN = 1.5539
ESCALA_100M = 100 / M_POR_UN

chx, chy = d['ch']
rex, rey = d['re']

def f(v):
    return ('%.1f' % v).rstrip('0').rstrip('.')

svg = f'''<svg class="map-svg" viewBox="{VX} {VY} {VW} {VH}" role="img" aria-labelledby="map-title">
  <title id="map-title">Mapa: a igreja e o restaurante ficam a 250 metros um do outro, um de cada lado da Avenida das Flores, ligados pela Rua 12 de Maio.</title>
  <defs><clipPath id="map-clip"><rect x="{VX}" y="{VY}" width="{VW}" height="{VH}" rx="14"/></clipPath></defs>
  <g clip-path="url(#map-clip)" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path class="st-sv" d="{d['sv']}"/>
    <path class="st-mn" d="{d['mn']}"/>
    <path class="st-mj" d="{d['mj']}"/>
    <path class="st-tr" d="{d['tr']}"/>
  </g>
  <g class="map-labels">
    <text transform="translate(195 266) rotate(69.4)">RSC-470</text>
    <text transform="translate(337 224) rotate(-85.5)">AV. DAS FLORES</text>
    <text transform="translate(263 271.5) rotate(-7.9)">R. 12 DE MAIO</text>
    <text transform="translate(398 227) rotate(-2.5)">R. 12 DE MAIO</text>
    <text transform="translate(358 299) rotate(-5.7)">R. DO SEMINÁRIO</text>
  </g>
  <path class="map-route" pathLength="1" d="{d['route']}"/>
  <g class="map-pin" transform="translate({f(chx)} {f(chy)})">
    <circle class="pin-ring" r="7"/><circle class="pin-dot" r="2.6"/>
    <text class="pin-label" y="25">IGREJA</text>
  </g>
  <g class="map-pin" transform="translate({f(rex)} {f(rey)})">
    <circle class="pin-ring" r="7"/><circle class="pin-dot" r="2.6"/>
    <text class="pin-label" y="-17">MASCARON</text>
  </g>
  <g class="map-north" transform="translate({VX + VW - 26} {VY + 28})">
    <circle r="12"/><path d="M0 -7 L3.2 4 L0 2 L-3.2 4 Z"/><text y="-17">N</text>
  </g>
  <g class="map-scale" transform="translate({VX + 18} {VY + VH - 18})">
    <path d="M0 -4 V0 H{f(ESCALA_100M)} V-4"/><text x="{f(ESCALA_100M / 2)}" y="-8">100 m</text>
  </g>
</svg>'''

(ROOT / 'assets/mapa/mapa.svg').write_text(
    svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1) + '\n')

idx = ROOT / 'index.html'
html = idx.read_text()
novo, n = re.subn(r'(<!-- MAPA:INICIO -->)(.*?)(<!-- MAPA:FIM -->)',
                  lambda m: m.group(1) + '\n' + svg + '\n' + m.group(3), html, flags=re.S)
if n != 1:
    raise SystemExit('Marcadores do mapa não encontrados no index.html')
idx.write_text(novo)
print('mapa injetado no index.html')
