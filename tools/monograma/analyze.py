import numpy as np, json
from PIL import Image
from collections import deque
im=np.asarray(Image.open('../images/1.png').convert('L')).astype(np.int16)
H,W=im.shape
ink=im<128
ys,xs=np.nonzero(ink)
lab=-np.ones(ink.shape,np.int32)
comps=[]
for y0,x0 in zip(ys,xs):
    if lab[y0,x0]>=0: continue
    cid=len(comps); q=deque([(y0,x0)]); lab[y0,x0]=cid; pts=[]
    while q:
        y,x=q.popleft(); pts.append((y,x))
        for dy in (-1,0,1):
            for dx in (-1,0,1):
                yy,xx=y+dy,x+dx
                if 0<=yy<H and 0<=xx<W and ink[yy,xx] and lab[yy,xx]<0:
                    lab[yy,xx]=cid; q.append((yy,xx))
    p=np.array(pts); comps.append(dict(n=len(p),x0=int(p[:,1].min()),y0=int(p[:,0].min()),x1=int(p[:,1].max()),y1=int(p[:,0].max()),cx=float(p[:,1].mean()),cy=float(p[:,0].mean())))
np.save('lab.npy',lab)
json.dump(comps,open('comps.json','w'))
for i,c in sorted(enumerate(comps),key=lambda t:-t[1]['n']): print(i,c)
