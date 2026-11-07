import numpy as np, json, math, potrace
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
lab=np.load('lab.npy'); comps=json.load(open('comps.json'))
def mask(ids):
    return np.isin(lab,ids)
# ring fit (algebraic least squares)
ry,rx=np.nonzero(lab==2)
A=np.c_[rx,ry,np.ones_like(rx)]; b=rx**2+ry**2
c=np.linalg.lstsq(A,b,rcond=None)[0]; cx,cy=c[0]/2+0.5,c[1]/2+0.5; R=math.sqrt(c[2]+cx**2+cy**2)
d=np.hypot(rx-cx,ry-cy); sw=d.max()-d.min()
ang=np.degrees(np.arctan2(ry-cy,rx-cx))%360
h=np.histogram(ang,bins=720,range=(0,360))[0]
empty=np.nonzero(h==0)[0]*0.5
print('ring',cx,cy,R,'sw~',np.percentile(d,99)-np.percentile(d,1),'gap',empty.min(),empty.max())
gap0,gap1=empty.min(),empty.max()+0.5
# trace helper
def trace(m):
    bm=potrace.Bitmap(~m)
    pl=bm.trace(turdsize=4,alphamax=1.0,opticurve=True,opttolerance=0.2)
    out=[]
    for curve in pl:
        s=curve.start_point; out.append('M%.1f %.1f'%(s.x,s.y))
        for seg in curve.segments:
            if seg.is_corner: out.append('L%.1f %.1f L%.1f %.1f'%(seg.c.x,seg.c.y,seg.end_point.x,seg.end_point.y))
            else: out.append('C%.1f %.1f %.1f %.1f %.1f %.1f'%(seg.c1.x,seg.c1.y,seg.c2.x,seg.c2.y,seg.end_point.x,seg.end_point.y))
        out.append('Z')
    return ' '.join(out)
Apath=trace(mask([11,17,20,19,21]))
Epath=trace(mask([15]))
# letters
order=[(0,'A'),(1,'N'),(3,'D'),(4,'R'),(6,'Eacute'),(7,'E'),(8,'E'),(9,'M'),(10,'A'),(12,'N'),(13,'U'),(14,'E'),(16,'L'),(18,'E')]
f=TTFont('fonts-dl/garet/Garet-Book.otf'); gs=f.getGlyphSet(); cmap=f.getBestCmap()
capH=f['OS/2'].sCapHeight
letters=[]; rins=[]; routs=[]
for cid,g in order:
    yy,xx=np.nonzero(lab==cid)
    dd=np.hypot(xx-cx,yy-cy); aa=np.degrees(np.arctan2(yy-cy,xx-cx)); a=(aa.min()+aa.max())/2
    rins.append(dd.min()); 
    if g!='Eacute': routs.append(dd.max())
    letters.append((g,a))
import os; rb=float(np.median(rins))+float(os.environ.get('DR','0')); rt=float(np.median(routs)); size=(rt-rb+float(os.environ.get('DS','0')))/capH
print('baseline r',rb,'cap top r',rt,'scale',size,'capH',capH)
glyphs=[]
for g,a in letters:
    gl=gs[g]; from fontTools.pens.boundsPen import BoundsPen; bp=BoundsPen(gs); gl.draw(bp); bx=(bp.bounds[0]+bp.bounds[2])/2
    # glyph upright, baseline at radius rb, rotated so 'up' points away from center
    th=math.radians(a); ux,uy=math.cos(th),math.sin(th)       # outward
    tx,ty=-uy,ux                                               # tangent (clockwise in screen = reading direction)
    ox,oy=cx+ux*rb,cy+uy*rb
    # font coords (x right, y up) -> screen: x*t + y*u
    s=size
    T=(s*tx,s*ty,s*ux,s*uy,ox-bx*s*tx,oy-bx*s*ty)
    pen=SVGPathPen(gs); gl.draw(TransformPen(pen,T))
    glyphs.append(pen.getCommands())
json.dump(dict(cx=cx,cy=cy,R=R,sw=float(sw),gap0=float(gap0),gap1=float(gap1),A=Apath,E=Epath,glyphs=glyphs),open('mono.json','w'))
