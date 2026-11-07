import json, math, sys
m=json.load(open('mono.json'))
cx,cy,R=m['cx'],m['cy'],m['R']
g0,g1=math.radians(m['gap0']),math.radians(m['gap1'])
# ring arc: from gap end (g1) clockwise around to gap start (g0)
p=lambda a:(cx+R*math.cos(a),cy+R*math.sin(a))
s=p(g1); e=p(g0)
ring=f'M{s[0]:.1f} {s[1]:.1f} A{R:.1f} {R:.1f} 0 1 1 {e[0]:.1f} {e[1]:.1f}'
ink=sys.argv[1] if len(sys.argv)>1 else '#232323'
names='\n    '.join(f'<path d="{g}"/>' for g in m['glyphs'])
vb='300 300 1400 1400'
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">
  <title>André e Emanuele</title>
  <path id="ring" d="{ring}" fill="none" stroke="{ink}" stroke-width="6.5" stroke-linecap="butt"/>
  <g id="names" fill="{ink}" stroke="{ink}" stroke-width="1">
    {names}
  </g>
  <path id="A" fill="{ink}" d="{m['A']}"/>
  <path id="E" fill="{ink}" d="{m['E']}"/>
</svg>'''
open('monograma.svg','w').write(svg)
# overlay compare: original underneath, svg in red semi-transparent
cmp=f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 2000 2000" width="2000" height="2000">
<image href="../images/1.png" xlink:href="../images/1.png" width="2000" height="2000"/>
<g opacity=".55">{svg.split('>',1)[1].rsplit('</svg>',1)[0].replace(ink,'#e00')}</g></svg>'''
open('compare.svg','w').write(cmp)
