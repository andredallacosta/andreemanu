import json, math, heapq
d=json.load(open('osm.json'))
CH=(-28.8627065,-51.5506314); RE=(-28.8625427,-51.5525962)
S,N,W,E=-28.8662,-28.8592,-51.5568,-51.5466
k=math.cos(math.radians(-28.862))
Wpx=640; sx=Wpx/((E-W)*k); H=round((N-S)*sx)
def P(lat,lon): return ((lon-W)*k*sx,(N-lat)*sx)
def dist(a,b): return math.hypot((a[0]-b[0])*111320,(a[1]-b[1])*111320*k)
cls={'trunk':'tr','trunk_link':'tr','tertiary':'mj','tertiary_link':'mj','unclassified':'mj','residential':'mn','service':'sv'}
paths={c:[] for c in set(cls.values())}
G={}
for e in d['elements']:
    hw=e['tags'].get('highway')
    if hw not in cls: continue
    g=[(p['lat'],p['lon']) for p in e['geometry']]
    paths[cls[hw]].append('M'+' L'.join('%.1f %.1f'%P(*q) for q in g))
    if hw!='service':
        for a,b in zip(g,g[1:]):
            w=dist(a,b); G.setdefault(a,[]).append((b,w)); G.setdefault(b,[]).append((a,w))
near=lambda p: min(G,key=lambda n:dist(n,p))
s,t=near(CH),near(RE)
D={s:0};prev={};pq=[(0,s)]
while pq:
    c,u=heapq.heappop(pq)
    if u==t: break
    if c>D[u]: continue
    for v,w in G[u]:
        if c+w<D.get(v,1e18): D[v]=c+w;prev[v]=u;heapq.heappush(pq,(c+w,v))
r=[t]
while r[-1]!=s: r.append(prev[r[-1]])
r=[RE]+r+[CH]
print('route m',round(D[t]+dist(s,CH)+dist(t,RE)),'straight',round(dist(CH,RE)),'H',H)
print('near names',[e['tags'].get('name') for e in d['elements'] if any(dist((p['lat'],p['lon']),CH)<40 for p in e['geometry'])])
print('near RE',[ (e['tags'].get('name'),e['tags'].get('highway')) for e in d['elements'] if any(dist((p['lat'],p['lon']),RE)<40 for p in e['geometry'])])
out={'W':Wpx,'H':H,'ch':P(*CH),'re':P(*RE),'route':'M'+' L'.join('%.1f %.1f'%P(*q) for q in r)}
out.update({c:' '.join(v) for c,v in paths.items()})
# labels: positions of a few named streets midpoints
lab={}
for e in d['elements']:
    n=e['tags'].get('name')
    if n in ('Rua 12 de Maio','Avenida das Flores','Rua Luiz Roncatto') and n not in lab:
        g=e['geometry']; m=g[len(g)//2]; lab[n]=P(m['lat'],m['lon'])
out['labels']=lab
json.dump(out,open('map.json','w'))
