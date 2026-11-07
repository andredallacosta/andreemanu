"""Projeta as ruas do OpenStreetMap e calcula a rota a pé igreja ↔ restaurante.

Entrada: assets/mapa/osm-vila-flores.json  (export Overpass com geometria)
Saída:   assets/mapa/ruas-projetadas.json   (usado por tools/mapa/mksvg.py)

Uso (na raiz do repositório):  python3 tools/mapa/mkmap.py && python3 tools/mapa/mksvg.py

A rota segue o caminho a pé do Google Maps (250 m, "via R. Doze de Maio"):
cada local é ligado ao ponto mais próximo da Rua Doze de Maio, e não ao nó de
rua mais próximo (isso cortava quadras em diagonal). No OSM, o trecho da Doze de
Maio em frente ao Mascaron está sem nome, por isso o restaurante se liga à rua
residencial sem nome mais próxima.
"""
import json, math, heapq, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
d = json.loads((ROOT / 'assets/mapa/osm-vila-flores.json').read_text())

# Coordenadas oficiais (links do Google Maps enviados pelo casal; DECISOES.md, seção 8)
CH = (-28.8626914, -51.5507618)   # Igreja Matriz Santo Antônio
RE = (-28.8625144, -51.5525817)   # Restaurante Mascaron

S, N, W, E = -28.8662, -28.8592, -51.5568, -51.5466
k = math.cos(math.radians(-28.862))
Wpx = 640
sx = Wpx / ((E - W) * k)
H = round((N - S) * sx)

def P(lat, lon): return ((lon - W) * k * sx, (N - lat) * sx)
def dist(a, b): return math.hypot((a[0] - b[0]) * 111320, (a[1] - b[1]) * 111320 * k)

cls = {'trunk': 'tr', 'trunk_link': 'tr', 'tertiary': 'mj', 'tertiary_link': 'mj', 'unclassified': 'mj',
       'residential': 'mn', 'service': 'sv'}
paths = {c: [] for c in set(cls.values())}
G = {}
ways = []
for e in d['elements']:
    hw = e['tags'].get('highway')
    if hw not in cls: continue
    g = [(p['lat'], p['lon']) for p in e['geometry']]
    paths[cls[hw]].append('M' + ' L'.join('%.1f %.1f' % P(*q) for q in g))
    if hw not in ('service', 'trunk', 'trunk_link'):   # a pé: sem rodovia
        ways.append((e['tags'], g))
        for a, b in zip(g, g[1:]):
            w = dist(a, b); G.setdefault(a, []).append((b, w)); G.setdefault(b, []).append((a, w))

def projetar(p, a, b):
    """Ponto mais próximo de p no segmento a-b (em lat/lon, aproximação local)."""
    ax, ay = a[1] * k, a[0]; bx, by = b[1] * k, b[0]; px, py = p[1] * k, p[0]
    dx, dy = bx - ax, by - ay
    t = 0 if dx == dy == 0 else max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    return (ay + t * dy, (ax + t * dx) / k)

def ligar(p, filtro):
    """Insere no grafo o ponto mais próximo de p entre as ruas que passam no filtro."""
    melhor = None
    for tags, g in ways:
        if not filtro(tags): continue
        for a, b in zip(g, g[1:]):
            q = projetar(p, a, b)
            if melhor is None or dist(p, q) < melhor[0]: melhor = (dist(p, q), q, a, b)
    _, q, a, b = melhor
    for n in (a, b):
        w = dist(q, n); G.setdefault(q, []).append((n, w)); G.setdefault(n, []).append((q, w))
    return q, melhor[0]

s, ds = ligar(CH, lambda t: t.get('name') == 'Rua 12 de Maio')
t, dt = ligar(RE, lambda t: t.get('highway') == 'residential' and not t.get('name'))

Dd = {s: 0}; prev = {}; pq = [(0, s)]
while pq:
    c, u = heapq.heappop(pq)
    if u == t: break
    if c > Dd[u]: continue
    for v, w in G[u]:
        if c + w < Dd.get(v, 1e18): Dd[v] = c + w; prev[v] = u; heapq.heappush(pq, (c + w, v))
r = [t]
while r[-1] != s: r.append(prev[r[-1]])
r = [RE] + r + [CH]
print('rota a pé: %d m (Google Maps: 250 m) · linha reta: %d m' % (round(Dd[t] + ds + dt), round(dist(CH, RE))))

out = {'W': Wpx, 'H': H, 'ch': P(*CH), 're': P(*RE),
       'route': 'M' + ' L'.join('%.1f %.1f' % P(*q) for q in r)}
out.update({c: ' '.join(v) for c, v in paths.items()})
lab = {}
for e in d['elements']:
    n = e['tags'].get('name')
    if n in ('Rua 12 de Maio', 'Avenida das Flores', 'Rua do Seminário') and n not in lab:
        g = e['geometry']; m = g[len(g) // 2]; lab[n] = P(m['lat'], m['lon'])
out['labels'] = lab
(ROOT / 'assets/mapa/ruas-projetadas.json').write_text(json.dumps(out))
print('ruas-projetadas.json atualizado')
