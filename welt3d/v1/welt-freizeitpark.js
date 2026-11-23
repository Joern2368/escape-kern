/* Welt: Freizeitpark (Kennwort freizeitpark). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
const MASKOTTCHEN='Lotta Luftballon';
const START={x:0,z:150};
const BEREICHE={
  eingang:{name:'Parkeingang',x:0,z:92,plaetze:[]}
};
const EXTRAZONEN=[{name:'Spielplatz',x:-95,z:66,r:22},{name:'Streichelzoo',x:95,z:66,r:22},{name:'Karussell',x:-45,z:70,r:15},{name:'Tassen',x:45,z:70,r:15},{name:'Riesenrad',x:-95,z:0,r:26},{name:'Achterbahn',x:95,z:0,r:26},{name:'Floßfahrt',x:-45,z:0,r:19},{name:'Autoscooter',x:45,z:0,r:19},{name:'Schiffschaukel',x:-45,z:-68,r:19},{name:'Kettenflieger',x:45,z:-68,r:19},{name:'Minigolf',x:-95,z:-66,r:22},{name:'Imbiss',x:95,z:-66,r:22},{name:'Spielebuden',x:-45,z:-135,r:20},{name:'Spiegelhaus',x:45,z:-135,r:20},{name:'Zaubertheater',x:-88,z:-104,r:13},{name:'Rundflug',x:88,z:-104,r:13},{name:'Ballonwiese',x:-100,z:-137,r:18},{name:'Bahnhof',x:98,z:-137,r:21},{name:'Wilde Maus',x:142,z:66,r:22},{name:'Mini-Karussell',x:-142,z:66,r:14},{name:'Happy Sailor',x:-142,z:-66,r:18},{name:'Panoramarad',x:142,z:-66,r:20},{name:'Talstation',x:-182,z:100,r:12},{name:'Bergstation',x:182,z:-100,r:12},{name:'Freifallturm',x:-142,z:-135,r:14},{name:'Aussichtsturm',x:-142,z:0,r:14},{name:'Wasserspiel',x:142,z:0,r:20},{name:'Geisterbahn',x:142,z:-135,r:20},{name:'Kletterpark',x:-182,z:52,r:18},{name:'Delfinshow',x:-185,z:-8,r:24},{name:'Souvenirs',x:-35,z:100,r:11},{name:'Toiletten',x:35,z:100,r:9},{name:'Parkplatz',x:-28,z:148,r:27},{name:'Bushaltestelle',x:32,z:152,r:14}];
const SEITENWEGE=[35,-35,-100];
const WEGBOGEN=9;
const GRENZE={x0:-215,x1:215,z0:-215,z1:175};
const TORZ=-160, FEST={x:0,z:-190};
let FARBEN,WASSER,ausgang;
const ZN=n=>EXTRAZONEN.find(e=>e.name===n);
/* Farbpalette (klein halten: weniger verschiedene Farben = weniger Zeichenaufrufe nach dem Verschmelzen) */
const K={rot:0xe0605a,gelb:0xffd45e,gruen:0x4caf6a,blau:0x3b8fc4,orange:0xf59e3f,lila:0xb06ae0,tuerkis:0x2fb5a8,rosa:0xf47ab0,weiss:0xf6f2ea,holz:0x8a5a32,braun:0x8a5a32,dunkel:0x3a4a56,grau:0x9aa0a6,creme:0xf6f2ea,schwarz:0x2a2a2a,himmel:0xc8e0f0,gold:0xe8b930};
const BUNT=[K.rot,K.gelb,K.gruen,K.blau,K.orange,K.lila,K.tuerkis,K.rosa];
const HAUT=[0xf2c9a0,0xc68a5a,0xe8b88a,0x8a5a3a];
const fs=t=>t.length>12?36:t.length>9?42:t.length>6?50:58;
const LAMPEN={warm:[],rot:[],gelb:[],blau:[],gruen:[]};
const LART=['rot','gelb','blau','gruen'];
/* ---------- Hilfsfunktionen ---------- */
function pfad(x1,z1,x2,z2,w,farbe){weg(wellen(x1,z1,x2,z2),w,farbe)}
function zugang(b,pz,ex){pfad(b.x,b.z,ex!=null?ex:b.x,pz,3.5)}
function quer(b){pfad(b.x,b.z,wegX(b.z),b.z,3.5)}
function scheibe(x,z,r,farbe,h){h=h||.12;const c=cyl(r,h,farbe,x,h/2,z,scene);c.receiveShadow=true;return c}
function schild(text,x,y,z,w,h,schrift,farbe,rot,par){const s=schildText(text,farbe||'#fff8e6',w,h,schrift||fs(text));s.position.set(x,y,z);if(rot)s.rotation.y=rot;(par||scene).add(s);return s}
function bewegt(teil,fn,wx,wz,fern){const L=Array.isArray(teil)?teil:[teil];L.forEach(o=>{o.userData.keep=1});
  lebendig.push({o:{userData:{anim:t=>{if(wx!=null){const s=Math.hypot(wx-spieler.position.x,wz-spieler.position.z)<(fern||95);if(L[0].visible!==s)L.forEach(o=>{o.visible=s});if(!s)return}fn(t)}}},ph:0})}
function leben(g,ph){lebendig.push({o:g,ph:ph||rnd()*6})}
function instanz(par,geo,farbe,liste,hell){const m=hell?new THREE.MeshBasicMaterial({color:farbe}):mat(farbe);const im=new THREE.InstancedMesh(geo,m,liste.length);im.frustumCulled=false;par.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S3=new THREE.Vector3();liste.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S3.set(a[3],a[4],a[5]);M.compose(P,Q,S3);im.setMatrixAt(i,M)});im.instanceMatrix.needsUpdate=true;return im}
function stab(par,x1,y1,z1,x2,y2,z2,d,farbe,dh,cast){const dx=x2-x1,dy=y2-y1,dz=z2-z1,l=Math.hypot(dx,dy,dz);const m=box(d,dh||d,l,farbe,(x1+x2)/2,(y1+y2)/2,(z1+z2)/2,par,cast);m.rotation.order='YXZ';m.rotation.y=Math.atan2(dx,dz);m.rotation.x=-Math.atan2(dy,Math.hypot(dx,dz));return m}
function kreisLinie(x1,z1,x2,z2,r,ab){const l=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(l/(ab||2)));for(let i=0;i<=n;i++)kreis(x1+(x2-x1)*i/n,z1+(z2-z1)*i/n,r)}
function lampe(x,y,z,art){LAMPEN[art||'warm'].push([x,y,z,.17,.17,.17])}
function girlande(x1,y1,z1,x2,y2,z2,n,hang,art){for(let i=0;i<=n;i++){const t=i/n;lampe(x1+(x2-x1)*t,y1+(y2-y1)*t-Math.sin(t*Math.PI)*hang,z1+(z2-z1)*t,art||LART[i%4])}}
function wimpel(x1,y1,z1,x2,y2,z2,n,hang){for(let i=0;i<n;i++){const t=(i+.5)/n;const c=cone(.28,.6,BUNT[i%8],x1+(x2-x1)*t,y1+(y2-y1)*t-Math.sin(t*Math.PI)*hang-.3,z1+(z2-z1)*t,scene);c.rotation.z=Math.PI}}
function mast(x,z,h,farbe){cyl(.14,h,farbe||K.weiss,x,h/2,z,scene,true);kreis(x,z,.3)}
function markise(par,w,y,fa,fb){const n=6;for(let i=0;i<n;i++){const m=box(w/n,.14,2.9,i%2?fb:fa,-w/2+(i+.5)*w/n,y,.55,par);m.rotation.x=.22}}
function bude(x,z,rot,w,fa,fb,text,hh){hh=hh||2.6;const g=grp(x,0,z);box(w,1,1.2,fa,0,.5,.9,g,true);box(w,hh,.25,K.creme,0,hh/2,-1.1,g);[-1,1].forEach(s=>box(.2,hh+1.4,.2,K.holz,s*(w/2-.1),(hh+1.4)/2,1.1,g));markise(g,w,hh,fa,fb);
  if(text)schild(text,0,hh+.9,1.3,Math.min(w,4.6),.85,null,'#fff8e6',0,g);g.rotation.y=rot||0;kreis(x,z,w*.5+.4);return g}
function bank(x,z,rot){const g=grp(x,0,z);box(2.4,.15,.8,K.holz,0,.7,0,g,true);box(2.4,.7,.1,K.holz,0,1.1,-.35,g);box(.12,.7,.7,K.braun,-1,.35,0,g);box(.12,.7,.7,K.braun,1,.35,0,g);g.rotation.y=rot||0;kreis(x,z,1.2);return g}
function laterne(x,z){cyl(.08,3.4,K.dunkel,x,1.7,z,scene,true);lampe(x,3.55,z,'warm');kreis(x,z,.3)}
function eimer(x,z){cyl(.4,.9,K.gruen,x,.45,z,scene,true);cyl(.44,.1,K.dunkel,x,.92,z,scene);kreis(x,z,.5)}
function kuebel(x,z){const g=grp(x,0,z);cyl(.6,.7,K.holz,0,.35,0,g,true);cyl(.5,.1,K.braun,0,.72,0,g);for(let i=0;i<6;i++)blume(x-.3+(i%3)*.3,z-.2+Math.floor(i/3)*.4,BUNT[i%8]);kreis(x,z,.7)}
function ballen(x,z,rot){const c=cyl(.7,1.1,0xe8c850,x,.55,z,scene,true);c.rotation.z=Math.PI/2;c.rotation.y=rot||0;kreis(x,z,.9)}
function beet(x,z,r,n){for(let i=0;i<n;i++){const a=rnd()*6.28,rr=rnd()*r;blume(x+Math.cos(a)*rr,z+Math.sin(a)*rr*.7,BUNT[i%8])}}
function ballons(x,y0,z,n,hoch,ph){const g=grp(x,y0,z);cyl(.025,hoch,K.dunkel,0,hoch/2,0,g);for(let i=0;i<n;i++){const a=i*2.4+(ph||0);sph(.5,BUNT[(i+(ph||0))%8],Math.cos(a)*.7,hoch+.4+(i%3)*.45,Math.sin(a)*.7,g,.9,1.15,.9)}
  const p=ph||0;bewegt(g,t=>{g.rotation.z=Math.sin(t*1.2+p)*.06;g.rotation.x=Math.cos(t*.9+p)*.06},x,z,80);return g}
function lichtBauen(){const farbe={warm:0xfff0b8,rot:0xff5a4a,gelb:0xffe45a,blau:0x5ab4ff,gruen:0x6aff8a},m={};
  for(const k in LAMPEN)if(LAMPEN[k].length)m[k]=instanz(scene,gSph,farbe[k],LAMPEN[k],true);
  if(m.rot)bewegt([m.rot,m.blau].filter(Boolean).concat([m.gelb,m.gruen].filter(Boolean)),t=>{const a=Math.sin(t*2.6)>0;[m.rot,m.blau].forEach(x=>{if(x)x.visible=a});[m.gelb,m.gruen].forEach(x=>{if(x)x.visible=!a})})}
/* Figuren */
function lotta(par,farbe){farbe=farbe||K.rot;const g=grp(0,0,0,par);
  [-1,1].forEach(s=>{cyl(.14,.8,K.weiss,s*.35,.5,0,g,true);sph(.26,K.gelb,s*.35,.15,.12,g,1,.7,1.4)});
  sph(1,farbe,0,2.5,0,g,1,1.2,1).castShadow=true;sph(.2,K.weiss,-.45,3.2,.5,g,.8,1.3,.5);cone(.22,.4,farbe,0,1.2,0,g).rotation.x=Math.PI;
  [-1,1].forEach(s=>{sph(.2,K.weiss,s*.38,2.8,.88,g,1,1.2,.5);sph(.1,K.schwarz,s*.38,2.78,1,g);sph(.15,K.rosa,s*.66,2.4,.76,g,1,.7,.4)});
  const mu=new THREE.Mesh(new THREE.TorusGeometry(.36,.06,6,12,Math.PI),mat(K.braun));mu.rotation.z=Math.PI;mu.position.set(0,2.55,.97);g.add(mu);
  box(.3,.3,.2,K.blau,-.2,1.65,.6,g);box(.3,.3,.2,K.blau,.2,1.65,.6,g);sph(.12,K.gelb,0,1.65,.66,g);cone(.4,.8,K.gelb,0,3.85,0,g);sph(.1,K.rot,0,4.3,0,g);
  const al=grp(-1,2.2,0,g),ar=grp(1,2.2,0,g);[al,ar].forEach(a=>{cyl(.1,.9,farbe,0,-.45,0,a);sph(.2,K.weiss,0,-.95,0,a)});
  g.userData.anim=t=>{ar.rotation.z=2.5+Math.sin(t*5)*.4;al.rotation.z=-.4+Math.sin(t*2)*.15;g.rotation.z=Math.sin(t*1.6)*.04};return g}
function roboter(par,farbe){farbe=farbe||K.blau;const g=grp(0,0,0,par);
  [-1,1].forEach(s=>{box(.4,1,.4,K.grau,s*.4,.55,0,g,true);box(.6,.2,.8,K.dunkel,s*.4,.1,.15,g)});
  box(1.5,1.4,1,farbe,0,1.7,0,g,true);box(.9,.6,.1,K.gelb,0,1.8,.52,g);
  const kopf=grp(0,2.9,0,g);box(1.1,.9,.9,K.grau,0,0,0,kopf,true);[-1,1].forEach(s=>sph(.17,K.gelb,s*.28,.08,.46,kopf));box(.5,.08,.05,K.schwarz,0,-.22,.46,kopf);cyl(.04,.5,K.grau,0,.7,0,kopf);sph(.13,K.rot,0,1,0,kopf);
  const al=grp(-.95,2.3,0,g),ar=grp(.95,2.3,0,g);[al,ar].forEach(a=>{box(.28,.9,.28,K.grau,0,-.4,0,a);sph(.2,farbe,0,-.9,0,a)});
  g.userData.anim=t=>{const s=Math.sin(t*6);al.rotation.z=s*1.1;ar.rotation.z=s*1.1+.4;kopf.rotation.z=s*.2;g.rotation.y=Math.sin(t*3)*.3};return g}
function ballonhund(par,farbe){farbe=farbe||K.gelb;const g=grp(0,0,0,par);
  [-.75,0,.75].forEach((x,i)=>sph(.48,farbe,x,1.3,0,g,1,.95,.8));sph(.5,farbe,-1.35,1.55,0,g,.8,.8,.7);
  const kopf=grp(1.3,1.8,0,g);sph(.42,farbe,0,0,0,kopf);sph(.22,farbe,.4,-.1,0,kopf);sph(.07,K.schwarz,.58,-.02,0,kopf);[-1,1].forEach(s=>{sph(.2,farbe,-.1,.3,s*.35,kopf,.7,1.4,.7);sph(.05,K.schwarz,.28,.12,s*.18,kopf)});
  [[-.9,.3],[-.9,-.3],[.9,.3],[.9,-.3]].forEach(p=>cyl(.16,.8,farbe,p[0],.4,p[1],g));
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*4)*.15;g.rotation.z=Math.sin(t*3)*.04};return g}
function zugLok(par,farbe){farbe=farbe||K.rot;const g=grp(0,0,0,par);
  box(3.6,.4,1.4,K.schwarz,0,.65,0,g,true);cyl(.7,2.2,farbe,.5,1.4,0,g,true).rotation.z=Math.PI/2;box(1.5,1.9,1.6,K.dunkel,-1.1,1.6,0,g,true);box(1.8,.2,1.9,K.gelb,-1.1,2.65,0,g);cyl(.25,.6,K.schwarz,1.2,2.3,0,g);sph(.28,K.gold,1.9,1.4,0,g,.5,1,1);
  [[-1.1,.7],[1,.7],[-1.1,-.7],[1,-.7]].forEach(p=>{const w=cyl(.42,.18,K.schwarz,p[0],.45,p[1],g);w.rotation.x=Math.PI/2});
  const pf=[0,1,2].map(i=>sph(.35,0xf2f2f2,1.2,2.8,0,g));
  g.userData.anim=t=>{pf.forEach((p,i)=>{const f=(t*.5+i/3)%1;p.position.set(1.2-f*1.8,2.8+f*2.4,0);p.scale.setScalar(.2+f*.7)})};return g}
function zugWagen(par,farbe){const g=grp(0,0,0,par);box(3,.4,1.4,K.schwarz,0,.6,0,g);box(2.8,1.3,1.5,farbe,0,1.4,0,g,true);box(3,.2,1.7,K.weiss,0,2.15,0,g);[-.5,.5].forEach(z=>sph(.28,HAUT[z>0?0:2],.3,1.9,z*.5,g));return g}
function pony(par,f,m){f=f||0xb87a4a;m=m||K.braun;const g=grp(0,0,0,par);
  sph(.8,f,0,1.1,0,g,1.4,.7,.6).castShadow=true;[[-.7,.3],[-.7,-.3],[.7,.3],[.7,-.3]].forEach(p=>cyl(.1,.8,f,p[0],.4,p[1],g));
  const kopf=grp(1.2,1.6,0,g);sph(.34,f,0,0,0,kopf,1.3,1,.9);sph(.15,K.rosa,.35,-.12,0,kopf);[-1,1].forEach(s=>cone(.07,.25,f,-.1,.35,s*.14,kopf));box(.16,.6,.12,m,-.25,.1,0,kopf).rotation.z=.4;
  const sw=grp(-1.15,1.3,0,g);cyl(.05,.8,m,0,-.4,0,sw);
  g.userData.anim=t=>{kopf.rotation.z=-.2+Math.sin(t*1.5)*.2;sw.rotation.z=Math.sin(t*2)*.3};return g}
function schafchen(par,wolle,kopf2){const g=grp(0,0,0,par);sph(.6,wolle||0xf4f0e6,0,.95,0,g,1.3,.95,.95).castShadow=true;[[-.45,.3],[-.45,-.3],[.45,.3],[.45,-.3]].forEach(p=>cyl(.07,.7,K.dunkel,p[0],.35,p[1],g));
  const k=grp(.85,1.1,0,g);box(.5,.4,.32,kopf2||K.dunkel,.1,0,0,k,true);[-1,1].forEach(s=>box(.07,.3,.14,kopf2||K.dunkel,-.05,.02,s*.2,k));g.userData.anim=t=>{k.rotation.z=-.4+Math.sin(t*1.4)*.35};return g}
function ziegchen(par){const g=grp(0,0,0,par),f=0xe6d8b8;sph(.5,f,0,.95,0,g,1.3,.8,.7).castShadow=true;[[-.45,.25],[-.45,-.25],[.45,.25],[.45,-.25]].forEach(p=>cyl(.07,.8,f,p[0],.4,p[1],g));
  const k=grp(.8,1.4,0,g);box(.42,.36,.3,f,.1,0,0,k,true);box(.2,.2,.24,0x7a5a3a,.36,-.08,0,k);[-1,1].forEach(s=>cone(.05,.4,0x5a4a3a,-.05,.3,s*.1,k).rotation.z=.6);g.userData.anim=t=>{k.rotation.z=-.3+Math.sin(t*1.5)*.3};return g}
function haeschen(par){const g=grp(0,0,0,par),f=0xcbb8a0;sph(.4,f,0,.4,0,g,1.2,.9,.8).castShadow=true;sph(.28,f,.4,.7,0,g);[-1,1].forEach(z=>box(.1,.5,.08,f,.35,1.1,z*.1,g));sph(.1,0xffffff,-.5,.45,0,g);g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*2.2))*.25};return g}
function reittier(par,f,typ){const g=grp(0,0,0,par);sph(.8,f,0,0,0,g,1.35,.75,.6);sph(.38,f,1.15,.55,0,g,1.1,1,.9);
  if(typ===0)box(.2,.7,.2,K.braun,.8,.7,0,g).rotation.z=-.5;else if(typ===1)sph(.2,K.rosa,1.55,.45,0,g,1,.8,1);else if(typ===2)sph(.6,K.orange,1.0,.55,0,g);else cone(.12,.5,K.gold,1.2,1.1,0,g);
  box(1.3,.4,.6,K.weiss,0,-.45,0,g);return g}
function ente(par){const g=grp(0,0,0,par);sph(.3,K.gelb,0,.1,0,g,1.3,.8,1);sph(.2,K.gelb,.28,.35,0,g);return g}
function teddy(par,x,y,z,f,s){s=s||1;sph(.5*s,f,x,y+.5*s,z,par);sph(.35*s,f,x,y+1.15*s,z,par);[-1,1].forEach(e=>sph(.14*s,f,x+e*.28*s,y+1.45*s,z,par));sph(.16*s,0xf0d8b0,x,y+1.1*s,z+.3*s,par)}
function plakat(){const c=document.createElement('canvas');c.width=256;c.height=340;const t=c.getContext('2d');t.fillStyle='#eaf4fa';t.fillRect(0,0,256,340);t.strokeStyle='#d8c690';t.lineWidth=7;t.beginPath();t.moveTo(128,340);t.lineTo(128,0);SEITENWEGE.forEach(w=>{const y=(w-GRENZE.z0)/(GRENZE.z1-GRENZE.z0)*340;t.moveTo(20,y);t.lineTo(236,y)});t.stroke();
  EXTRAZONEN.forEach((e,i)=>{const x=(e.x-GRENZE.x0)/(GRENZE.x1-GRENZE.x0)*256,y=(e.z-GRENZE.z0)/(GRENZE.z1-GRENZE.z0)*340;t.fillStyle=['#e0605a','#ffd45e','#4caf6a','#3b8fc4','#f59e3f','#b06ae0','#2fb5a8','#f47ab0'][i%8];t.beginPath();t.arc(x,y,e.r*.5,0,6.3);t.fill()});
  t.fillStyle='#4a2f12';t.beginPath();t.arc(128,(92-GRENZE.z0)/(GRENZE.z1-GRENZE.z0)*340,6,0,6.3);t.fill();t.strokeStyle='#8b5a2b';t.lineWidth=8;t.strokeRect(4,4,248,332);
  return new THREE.Mesh(new THREE.PlaneGeometry(3.8,5),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}))}
function gluecksTextur(){const c=document.createElement('canvas');c.width=c.height=256;const t=c.getContext('2d');const f=['#e0605a','#ffd45e','#4caf6a','#3b8fc4','#f59e3f','#b06ae0','#2fb5a8','#f47ab0'];
  for(let i=0;i<8;i++){t.fillStyle=f[i];t.beginPath();t.moveTo(128,128);t.arc(128,128,124,i*Math.PI/4,(i+1)*Math.PI/4);t.closePath();t.fill()}
  t.fillStyle='#fff8e6';t.beginPath();t.arc(128,128,22,0,6.3);t.fill();t.strokeStyle='#fff8e6';t.lineWidth=8;t.beginPath();t.arc(128,128,122,0,6.3);t.stroke();return new THREE.CanvasTexture(c)}
function gleis(P,N,fd,fr,fs,cols,ohren,sp,gap,wx,wz){const pts=[];for(let i=0;i<N;i++)pts.push(P(i/N*Math.PI*2));
  for(let i=0;i<N;i++){const p=pts[i],q=pts[(i+1)%N],r=pts[(i+N-1)%N],u=pts[(i+2)%N];stab(scene,p.x,p.y,p.z,q.x,q.y,q.z,1.7,fd,.22);
    const t1=Math.hypot(q.x-r.x,q.z-r.z)||1,n1=-(q.z-r.z)/t1*.8,n2=(q.x-r.x)/t1*.8,t2=Math.hypot(u.x-p.x,u.z-p.z)||1,m1=-(u.z-p.z)/t2*.8,m2=(u.x-p.x)/t2*.8;
    [-1,1].forEach(s=>stab(scene,p.x+n1*s,p.y+.3,p.z+n2*s,q.x+m1*s,q.y+.3,q.z+m2*s,.16,fr,.2));if(i%3===0){cyl(.22,p.y,fs,p.x,p.y/2,p.z,scene,true);kreis(p.x,p.z,.55)}}
  const wg=cols.map((c,i)=>{const g=grp(0,0,0,scene);box(1.5,.8,2.2,c,0,.55,0,g,true);box(1.4,.15,.15,K.dunkel,0,1.1,.5,g);[-.35,.35].forEach(x=>sph(.3,HAUT[(i+(x>0?1:0))%4],x,1.3,-.15,g));if(ohren&&i===0)[-.5,.5].forEach(x=>sph(.3,K.grau,x,1.25,.95,g,1,1,.4));g.rotation.order='YXZ';return g});
  bewegt(wg,t=>{const u=t*sp;wg.forEach((g,i)=>{const a=(u-i*gap)*6.283,p=P(a),q=P(a+.05);g.position.set(p.x,p.y+.2,p.z);g.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);g.rotation.x=-Math.atan2(q.y-p.y,Math.hypot(q.x-p.x,q.z-p.z))})},wx,wz,130)}
function fahrzeug(g,i){let r=null;
  if(i===0){box(1.9,.7,.9,K.rot,0,.4,0,g,true);box(.5,.5,.8,K.weiss,.55,.9,0,g);box(1.2,.12,.3,K.weiss,-.3,.82,0,g);sph(.13,K.blau,.6,1.25,0,g)}
  else if(i===1){sph(.5,K.blau,0,.7,0,g,1.6,.6,.6);box(.6,.08,2.2,K.weiss,0,.75,0,g);box(.1,.5,.5,K.rot,-.8,.95,0,g);r=box(.08,.8,.12,K.dunkel,.85,.7,0,g)}
  else if(i===2){sph(.7,K.rot,0,.7,0,g,1.1,.8,1);sph(.35,K.schwarz,.85,.65,0,g);sph(.13,K.schwarz,-.1,1.3,.3,g);sph(.13,K.schwarz,.3,1.25,-.3,g)}
  else if(i===3){box(1.7,.6,.9,K.gelb,0,.45,0,g,true);box(.9,.5,.8,K.weiss,-.1,.95,0,g);sph(.12,K.orange,.9,.5,.3,g);sph(.12,K.orange,.9,.5,-.3,g)}
  else{sph(.6,K.gruen,0,.8,0,g,1.2,.9,.8);box(1,.12,.12,K.gruen,-1,.9,0,g);r=box(2.2,.06,.15,K.dunkel,0,1.5,0,g);cyl(.06,.4,K.dunkel,0,1.3,0,g)}
  g.userData.rot=r}
function fontaene(x,z,h,n,ph){cyl(.2,.5,K.grau,x,.25,z,scene);const g=grp(x,0,z),tr=[];for(let i=0;i<n;i++)tr.push(sph(.3,0xe8f8ff,0,0,0,g));bewegt(g,t=>{tr.forEach((p,i)=>{const f=(t*.9+i/n+ph)%1,a=i*2.4;p.position.set(Math.cos(a)*f*1.6,.5+4*f*(1-f)*h,Math.sin(a)*f*1.6)})},x,z,80)}
function gespenst(par,s){const g=grp(0,0,0,par);sph(.9*s,K.weiss,0,0,0,g,1,1.2,1);cone(.9*s,1.4*s,K.weiss,0,-1.1*s,0,g);[-1,1].forEach(q=>{sph(.12*s,K.schwarz,q*.3*s,.2*s,.8*s,g);sph(.22*s,K.weiss,q*s,-.3*s,0,g,1,.7,.7)});const m=new THREE.Mesh(new THREE.TorusGeometry(.3*s,.05*s,5,10,Math.PI),mat(K.braun));m.rotation.z=Math.PI;m.position.set(0,-.05*s,.85*s);g.add(m);return g}
function delfin(par){const g=grp(0,0,0,par),c=0x4f7da8;g.scale.setScalar(1.7);sph(.5,0xdfe8ee,.1,-.12,0,g,2.1,.5,.7);[-1,1].forEach(q=>sph(.07,K.schwarz,1.2,.15,q*.38,g));sph(.6,c,0,0,0,g,2.3,.7,.7);cone(.25,.9,c,1.7,.05,0,g).rotation.z=-Math.PI/2;box(.8,.1,1.3,c,-1.6,.2,0,g);cone(.25,.6,c,-.1,.55,0,g);return g}
function auto(x,z,rot,f){const g=grp(x,0,z);box(2,.8,4.2,f,0,.85,0,g,true);box(1.8,.75,2.2,f,0,1.6,-.2,g);box(1.84,.5,1.9,K.himmel,0,1.65,-.2,g);box(1.5,.5,2.24,K.himmel,0,1.65,-.2,g);[-1.3,1.3].forEach(q=>[-1,1].forEach(w=>{cyl(.45,.4,K.schwarz,w*.95,.45,q,g).rotation.z=Math.PI/2;cyl(.22,.42,K.grau,w*.95,.45,q,g).rotation.z=Math.PI/2}));[-1,1].forEach(w=>{box(.45,.25,.1,K.gelb,w*.6,.95,2.12,g);box(.45,.25,.1,K.rot,w*.6,.95,-2.12,g)});g.rotation.y=rot;kreis(x,z,1.5)}
function pumpe(x,z){sph(.7,K.orange,x,.55,z,scene,1,.8,1);cyl(.08,.3,K.gruen,x,1.1,z,scene);[-1,1].forEach(s=>box(.15,.15,.05,K.schwarz,x+s*.25,.7,z+.62,scene));box(.4,.1,.05,K.schwarz,x,.4,z+.62,scene);kreis(x,z,.8)}
function station(b,y,farbe,nm){scheibe(b.x,b.z,12,FARBEN.platz,.1);box(3.2,y,3.2,farbe,b.x,y/2,b.z,scene,true);box(6,.6,4.4,K.weiss,b.x,y+.3,b.z,scene);kreis(b.x,b.z,2.6);[-1,1].forEach(q=>[1,2].forEach(k=>box(.1,1.1,.9,K.himmel,b.x+q*1.61,y*k/3,b.z,scene)));box(1.5,2.2,.1,K.dunkel,b.x,1.1,b.z+1.61,scene);box(1.7,.3,.5,K.weiss,b.x,2.4,b.z+1.7,scene);const hx=b.x+9,hz=b.z-1;box(6,3.4,4.4,K.creme,hx,1.7,hz,scene,true);box(6.8,.5,5.2,farbe,hx,3.65,hz,scene);box(1.4,2.4,.1,K.dunkel,hx,1.2,hz+2.25,scene);[-2,2].forEach(q=>box(1.2,1.1,.1,K.himmel,hx+q,1.9,hz+2.25,scene));box(2.6,.5,.12,K.weiss,hx,3.0,hz+2.28,scene);kreis(hx,hz,3.4);bude(b.x+6,b.z+9,0,4.6,farbe,K.weiss,nm);bank(b.x-6,b.z+6,Math.PI);laterne(b.x-7,b.z-6);ballons(b.x+8,0,b.z-5,5,2.2,2)}
const BPTS=[[-8,70],[8,70],[0,35],[-20,35],[20,35],[0,0],[0,-35],[-20,-35],[20,-35],[0,-68],[0,-100],[-20,-100],[20,-100],[0,-130],[-11,98],[11,98],[0,60],[-20,0],[20,0],[-20,-68],[20,-68]];
function paradeBauen(){const liste=[[lotta,1,K.rot],[roboter,.9,K.blau],[ballonhund,.9,K.gelb],[lotta,.8,K.blau],[roboter,.9,K.gruen],[ballonhund,.9,K.rosa],[lotta,.8,K.gelb],[roboter,.9,K.orange],[ballonhund,.9,K.lila],[null,.45]];
  liste.forEach((f,i)=>{let o;if(f[0])o=f[0](scene,f[2]);else{o=grp(0,0,0,scene);const l=zugLok(o,K.rot),w1=zugWagen(o,K.gelb),w2=zugWagen(o,K.blau);w1.position.x=-3.4;w2.position.x=-6.8;o.userData.anim=t=>l.userData.anim(t)}
    o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
function weltBauen(){
FARBEN={boden:0x8fd16f,pfad:0xeadcb0,platz:0xf5e2b4};
WASSER=0x4aa3d8;
const boden=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200),mat(FARBEN.boden));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
hauptweg(5);SEITENWEGE.forEach(w=>kreuzplatz(wegX(w),w,7.5));pfad(-182,35,182,35,4);pfad(-182,-35,182,-35,4);pfad(-142,-100,182,-100,4);pfad(0,TORZ+2,0,GRENZE.z0+4,5,FARBEN.platz);
scheibe(0,92,15,FARBEN.pfad,.07);scheibe(FEST.x,FEST.z,24,FARBEN.platz,.08);
/* ---------- Bäume (instanziert, wenige) ---------- */
const baumListe=[];
function frei(x,z){if(Math.hypot(x,z-92)<24)return false;if(z>112&&Math.abs(x)<80)return false;
  for(const e of EXTRAZONEN){if(Math.hypot(x-e.x,z-e.z)<e.r+5)return false}if(Math.abs(x-wegX(z))<9&&z>TORZ+2)return false;for(const w of SEITENWEGE){if(Math.abs(z-w)<8&&Math.abs(x)<195)return false}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<30)return false;if(Math.abs(x)<5&&z<TORZ)return false;return true}
for(let i=0;i<300;i++){const x=GRENZE.x0+6+rnd()*(GRENZE.x1-GRENZE.x0-12),z=GRENZE.z0+6+rnd()*(GRENZE.z1-GRENZE.z0-12);if(frei(x,z))baumListe.push({x,z,s:.8+rnd()*.5})}
for(let x=GRENZE.x0;x<=GRENZE.x1;x+=11){if(Math.abs(x)>8)baumListe.push({x,z:GRENZE.z1,s:1.2});baumListe.push({x,z:GRENZE.z0,s:1.2});if(Math.abs(x)>3.5)baumListe.push({x,z:TORZ,s:1})}
for(let z=GRENZE.z0;z<=GRENZE.z1;z+=11){baumListe.push({x:GRENZE.x0,z,s:1.2});baumListe.push({x:GRENZE.x1,z,s:1.2})}
const BAUMTEIL=[[gCyl,0x7a5230,0,1.3,0,.36,2.6,.36],[gSph,0x4aa84e,0,3.9,0,2.1,1.8,2.1],[gSph,0x5cba5c,1.2,3.4,.6,1.5,1.3,1.5],[gSph,0x3f9a46,-1.2,3.5,-.5,1.6,1.4,1.6]];
(function(){const n=baumListe.length;
  const ms=BAUMTEIL.map(m=>{const im=new THREE.InstancedMesh(m[0],mat(m[1]),n);im.frustumCulled=false;scene.add(im);return im});ms[1].castShadow=true;
  const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),SC=new THREE.Vector3();
  baumListe.forEach((t,i)=>{const s=t.s;BAUMTEIL.forEach((m,k)=>{P.set(t.x+m[2]*s,m[3]*s,t.z+m[4]*s);SC.set(m[5]*s,m[6]*s,m[7]*s);M.compose(P,Q,SC);ms[k].setMatrixAt(i,M)});kreis(t.x,t.z,.9*s)});
  ms.forEach(m=>{m.instanceMatrix.needsUpdate=true})})();
/* ---------- 1. Parkeingang: Parktor, Kassen, Brunnen, Parkplan ---------- */
(function(){const b=BEREICHE.eingang,gz=b.z+17;
  [-1,1].forEach(s=>{const x=s*8;for(let i=0;i<6;i++)box(2.6,1.5,2.6,i%2?K.rot:K.weiss,x,.75+i*1.5,gz,scene,i===5);cone(2,2.6,K.gelb,x,10.3,gz,scene);sph(.5,K.rot,x,11.8,gz,scene);kreis(x,gz,1.9);ballons(x,12.3,gz,5,2.2,s+2)});
  box(19,1.4,1.6,K.blau,0,8.6,gz,scene,true);box(19.4,.3,1.8,K.gold,0,9.5,gz,scene);[-1,1].forEach(s=>cyl(.15,2.4,K.holz,s*4.6,10.7,gz,scene));
  const nm=CONFIG.spielname;schild(nm,0,11.3,gz+.2,11,2.2,nm.length>16?34:nm.length>12?42:56);girlande(-8,8.1,gz+1.1,8,8.1,gz+1.1,18,.6);
  bude(-15,b.z+9,0,5.6,K.rot,K.weiss,'Kasse');bude(15,b.z+9,0,5.6,K.blau,K.weiss,'Info');
  const br=grp(0,0,b.z-14);cyl(4.2,.9,K.grau,0,.45,0,br,true);cyl(3.7,.2,WASSER,0,.9,0,br);cyl(.7,2.6,K.weiss,0,1.8,0,br,true);cyl(1.8,.3,K.weiss,0,2.9,0,br);sph(.45,K.gold,0,3.3,0,br);kreis(0,b.z-14,4.6);
  const sp=grp(0,0,b.z-14),tr=[0,1,2,3,4,5,6,7].map(i=>sph(.16,0xcfeeff,0,3.2,0,sp));
  bewegt(sp,t=>{tr.forEach((p,i)=>{const f=(t*.8+i/8)%1,a=i*.785,r=f*3.4;p.position.set(Math.cos(a)*r,3.2+f*(1-f)*10.4-f*2.2,Math.sin(a)*r)})},0,b.z-14,90);
  const pl=grp(13,0,b.z-3);[-1,1].forEach(s=>cyl(.1,3.2,K.holz,s*2,1.6,0,pl,true));const pm=plakat();pm.position.set(0,3.1,.08);pl.add(pm);const pb=box(4.2,5.4,.1,K.holz,0,3.1,0,pl);schild('Parkplan',0,6.4,.12,3.8,.9,null,'#fff8e6',0,pl);kreis(13,b.z-3,2.3);
  const lt=lotta(scene);lt.position.set(-13,0,b.z-4);lt.scale.setScalar(1.7);leben(lt,0);kreis(-13,b.z-4,1.8);
  cyl(.08,1.2,K.holz,-13,.6,b.z-1.4,scene);schild('Ich bin Lotta!',-13,1.5,b.z-1.4,3.4,.7,34);
  wegweiser(-6,b.z-26,'Karussell',0);wegweiser(6,b.z-26,'Tassen',0);wegweiser(-11,b.z-31,'Mini-Karussell',0);wegweiser(-11,b.z-26,'Happy Sailor',0);wegweiser(11,b.z-31,'Wilde Maus',0);wegweiser(11,b.z-26,'Panoramarad',0);wegweiser(-6,b.z-8,'Riesenrad ←',0);wegweiser(6,b.z-8,'Achterbahn →',0);
  laterne(-4,b.z+4);laterne(4,b.z+4);laterne(-4,b.z-20);laterne(4,b.z-20);
  beet(-22,b.z+2,5,24);beet(22,b.z+2,5,24);beet(-24,b.z-14,4,16);beet(24,b.z-14,4,16);kuebel(-10,b.z+13);kuebel(10,b.z+13);eimer(-8,b.z-6);eimer(8,b.z-6);bank(-9,b.z-18,Math.PI/2);bank(9,b.z-18,-Math.PI/2)})();
/* ---------- Lichtermasten am Hauptweg ---------- */
(function(){const zs=[84,60,14,-12,-58,-82,-124,-148];zs.forEach(z=>{const o=wegX(z);mast(o-6.5,z,6.8,K.holz);mast(o+6.5,z,6.8,K.holz);girlande(o-6.5,6.6,z,o+6.5,6.6,z,12,1.1)});
  for(let i=0;i<zs.length-1;i++){const a=zs[i],c=zs[i+1];if(i%2===0){const oa=wegX(a),oc=wegX(c);girlande(oa-6.5,6.6,a,oc-6.5,6.6,c,10,.7,'warm');girlande(oa+6.5,6.6,a,oc+6.5,6.6,c,10,.7,'warm')}}
  zs.forEach((z,i)=>{if(i<zs.length-1)wimpel(-6.5,6.7,z,-6.5,6.7,zs[i+1],7,.6)})})();
/* ---------- 2. Spielplatz mit Hüpfburg ---------- */
(function(){const b=ZN('Spielplatz');scheibe(b.x,b.z,22,0xf4e3b0,.11);zugang(b,35);
  const hb=grp(b.x-8,0,b.z-5);box(9,2.4,7,K.rosa,0,1.2,0,hb,true);box(9.4,.5,7.4,K.gelb,0,2.5,0,hb);[[-4,-3],[4,-3],[-4,3],[4,3]].forEach((p,i)=>{cyl(1.2,4.4,[K.blau,K.gruen,K.orange,K.lila][i],p[0],2.2,p[1],hb,true);cone(1.3,1.6,K.rot,p[0],5.2,p[1],hb)});box(2.8,2,.3,K.lila,0,1.1,3.55,hb);
  bewegt(hb,t=>{hb.scale.y=1+Math.sin(t*3.2)*.03},b.x-8,b.z-5,90);kreis(b.x-8,b.z-5,5.8);
  [0,1].forEach(i=>{const k=grp(b.x-8+(i?1.8:-1.8),2.8,b.z-5+(i?-.8:1));cyl(.35,1,i?K.gruen:K.blau,0,.5,0,k);sph(.4,HAUT[i],0,1.35,0,k);bewegt(k,t=>{k.position.y=2.8+Math.abs(Math.sin(t*3.2+i*1.7))*1.7;k.rotation.y=t*2},b.x-8,b.z-5,90)});
  const ru=grp(b.x+7,0,b.z-9);box(2.2,.3,2.2,K.blau,0,3.9,0,ru,true);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>box(.2,3.9,.2,K.gelb,p[0],1.95,p[1],ru));cone(1.8,1.2,K.rot,0,4.7,0,ru);stab(ru,0,3.8,1.1,0,.3,7,1.5,K.gelb,.2,true);for(let i=0;i<5;i++)box(1,.1,.1,K.holz,0,.6+i*.7,-1.15,ru);kreis(b.x+7,b.z-9,1.7);kreis(b.x+7,b.z-3,1.2);
  const sc2=grp(b.x+7,0,b.z+8);[-1,1].forEach(x=>cyl(.1,3.4,K.dunkel,x*2.4,1.7,0,sc2,true));cyl(.08,5,K.dunkel,0,3.4,0,sc2).rotation.z=Math.PI/2;
  const sitze=[-1,1].map(x=>{const p=grp(x*1,3.4,0,sc2);cyl(.03,2,K.grau,-.5,-1,0,p);cyl(.03,2,K.grau,.5,-1,0,p);box(1.2,.12,.5,x>0?K.rot:K.gruen,0,-2,0,p,true);return p});
  bewegt(sitze,t=>{sitze[0].rotation.z=Math.sin(t*1.6)*.35;sitze[1].rotation.z=Math.sin(t*1.6+1.5)*.35},b.x+7,b.z+8,80);kreis(b.x+4.6,b.z+8,.4);kreis(b.x+9.4,b.z+8,.4);
  const wi=grp(b.x-2,0,b.z+10);cyl(.3,.6,K.grau,0,.3,0,wi);const pl=box(4.6,.15,.5,K.gelb,0,.8,0,wi,true);bewegt(pl,t=>{pl.rotation.z=Math.sin(t*1.3)*.18},b.x-2,b.z+10,80);kreis(b.x-2,b.z+10,.6);
  box(6,.8,4,K.lila,b.x-14,.4,b.z+9,scene);box(5.2,.5,3.2,0xdff1ff,b.x-14,.5,b.z+9,scene);for(let i=0;i<18;i++)sph(.4,BUNT[i%8],b.x-16+(i%6)*.64,1,b.z+8+(Math.floor(i/6))*.9,scene);kreis(b.x-14,b.z+9,2.8);
  const sk=grp(b.x+13,0,b.z+10);box(4,.4,.3,K.holz,0,.2,2,sk);box(4,.4,.3,K.holz,0,.2,-2,sk);box(.3,.4,4,K.holz,2,.2,0,sk);box(.3,.4,4,K.holz,-2,.2,0,sk);box(3.7,.3,3.7,0xf0d890,0,.15,0,sk);sph(.35,K.rot,.6,.45,.4,sk,1,.8,1);kreis(b.x+13,b.z+10,2.8);
  [1.8,1.3,.8].forEach((r,i)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(r,.1,5,16),mat(BUNT[i*2]));t.position.set(b.x+13,r*.9,b.z-8);t.rotation.x=Math.PI/2;scene.add(t)});
  [-1,1].forEach(s=>cyl(.1,1.9,K.dunkel,b.x+13+s*1.8,.95,b.z-8,scene));kreis(b.x+13,b.z-8,2);
  beet(b.x-17,b.z-13,3,12);beet(b.x+17,b.z-13,3,12)
  bank(b.x-3,b.z+16,Math.PI);eimer(b.x+3,b.z+16);ballons(b.x+17,0,b.z+2,6,2.4,1);
  wegweiser(b.x+4,b.z-26,'Hüpfburg',0)})();
/* ---------- 3. Streichelzoo mit Ponyreiten ---------- */
(function(){const b=ZN('Streichelzoo');scheibe(b.x,b.z,20,0xdde6a8,.11);zaun(b.x,b.z,20,66,-Math.PI/2);zugang(b,35);
  const cx=b.x-7,cz=b.z-3;scheibe(cx,cz,6,0xe9d9a6,.15);cyl(.35,3.4,K.holz,cx,1.7,cz,scene,true);sph(.6,K.gold,cx,3.6,cz,scene);
  const arm=grp(cx,0,cz),ps=[0,1,2].map(i=>{const a=i*2.094,g=grp(Math.cos(a)*4.2,0,Math.sin(a)*4.2,arm);cyl(.05,2.4,K.gold,0,1.6,0,g);const p=pony(g,[0xb87a4a,0xf2ece0,0x6a4a34][i]);p.scale.setScalar(.75);p.rotation.y=-a+Math.PI;return {g,p,a}});
  box(8.6,.12,.12,K.gold,0,3.1,0,arm);box(.12,.12,8.6,K.gold,0,3.1,0,arm);
  bewegt(arm,t=>{arm.rotation.y=-t*.4;ps.forEach(q=>q.p.userData.anim(t))},cx,cz,90);kreis(cx,cz,6.4);
  schild('Pony-Reiten',cx,4.7,cz+7.5,4.2,.9,null,'#fff8e6',0);cyl(.1,3.6,K.holz,cx-2,1.8,cz+7.5,scene);cyl(.1,3.6,K.holz,cx+2,1.8,cz+7.5,scene);
  [[3,-6],[7,2],[-2,8]].forEach((p,i)=>tier(i?(q=>schafchen(q)):(q=>schafchen(q,0xe6d8b8,0x7a5a3a)),b.x+p[0]+8,b.z+p[1],b.x,b.z,.9,.6));
  [[10,-6],[13,5],[3,6],[14,-2]].forEach((p,i)=>tier(ziegchen,b.x+p[0],b.z+p[1],b.x,b.z,.9-i*.04,.6));
  [[-2,12],[-3.5,13],[-1,13.4]].forEach(p=>tier(haeschen,b.x+p[0],b.z+p[1],b.x,b.z,.8,.3));tier(pony,b.x+13,b.z-12,b.x,b.z,.8,.9);
  const hh=haus(b.x+12,b.z+12,6,4,0xf2d8a8,K.rot);schild('Streicheln erlaubt',b.x+12,3.2,b.z+14.2,4.6,.9,34);box(1.2,1.8,.1,K.braun,b.x+12,.9,b.z+14.05,scene);kreis(b.x+12,b.z+12,3.2);
  ballen(b.x-13,b.z+13,.3);ballen(b.x+3,b.z-14,1);cyl(.6,1,K.holz,b.x-12,.5,b.z+12,scene,true);cone(.8,.9,K.rot,b.x-12,1.4,b.z+12,scene);kreis(b.x-12,b.z+12,.8);
  beet(b.x-14,b.z-12,3,10);
  wegweiser(b.x+4,b.z-26,'Streichelzoo',0)})();
/* ---------- 4. Karussell ---------- */
(function(){const b=ZN('Karussell'),cx=b.x,cz=b.z;scheibe(cx,cz,14,0xf3e3b5,.1);quer(b);
  cyl(7.2,.6,K.holz,cx,.3,cz,scene,true);cyl(7.8,.25,K.creme,cx,.12,cz,scene);
  const kg=grp(cx,0,cz);cyl(6.4,.3,K.creme,0,.8,0,kg);cyl(.9,6,K.gold,0,3.8,0,kg,true);cone(7.4,2.8,K.rot,0,8.2,0,kg,true);cyl(7.4,.7,K.weiss,0,6.6,0,kg);cyl(7.45,.28,K.gelb,0,6.15,0,kg);sph(.5,K.gold,0,9.8,0,kg);
  const lb=new THREE.Mesh(gCyl,new THREE.MeshBasicMaterial({color:0xfff0b8}));lb.scale.set(7.2,.16,7.2);lb.position.y=5.9;kg.add(lb);
  const tg=[0,1,2,3,4,5].map(i=>{const a=i/6*6.283,x=Math.cos(a)*4.6,z=Math.sin(a)*4.6;cyl(.08,5.6,K.gold,x,3.6,z,kg);const g=grp(x,2.3,z,kg);reittier(g,[K.weiss,0xb87a4a,K.rosa,K.blau,K.gelb,K.gruen][i],i%4);g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));return g});
  bewegt(kg,t=>{kg.rotation.y=t*.55;tg.forEach((g,i)=>{g.position.y=2.4+Math.sin(t*2.2+i*1.7)*.55})},cx,cz,115);kreis(cx,cz,7.6);
  bude(cx-12,cz+7,.6,4.4,K.rot,K.weiss,'Karussell');bank(cx+10,cz+8,Math.PI-.5);bank(cx+12,cz-5,-Math.PI/2);laterne(cx-10,cz-9);laterne(cx+10,cz-9);ballons(cx-11,0,cz-4,6,2.4,2);beet(cx+3,cz+13,3,10);
  wegweiser(-6,cz+6,'Karussell →',0)})();
/* ---------- 5. Drehende Tassen ---------- */
(function(){const b=ZN('Tassen'),cx=b.x,cz=b.z;scheibe(cx,cz,14,0xe6d8f2,.1);quer(b);
  cyl(8.4,.5,K.lila,cx,.25,cz,scene,true);const kg=grp(cx,.5,cz);cyl(7.6,.3,K.gelb,0,.15,0,kg);cyl(1.2,3.4,K.blau,0,1.7,0,kg,true);cone(3.6,1.6,K.rosa,0,4.2,0,kg,true);sph(.4,K.gold,0,5.2,0,kg);
  const tz=[0,1,2,3,4].map(i=>{const a=i/5*6.283,g=grp(Math.cos(a)*4.6,0,Math.sin(a)*4.6,kg);cyl(1.5,1.1,BUNT[(i*2)%8],0,.75,0,g,true);cyl(1.25,.2,K.weiss,0,1.35,0,g);box(.3,.6,.15,BUNT[(i*2)%8],1.55,.8,0,g);sph(.38,HAUT[i%4],.3,1.6,.2,g);return g});
  bewegt(kg,t=>{kg.rotation.y=t*.45;tz.forEach((g,i)=>{g.rotation.y=t*1.3+i})},cx,cz,100);kreis(cx,cz,9);
  [0,1,2,3,4,5,6,7].forEach(i=>{const a=i/8*6.283;lampe(cx+Math.cos(a)*8.9,.9,cz+Math.sin(a)*8.9,LART[i%4])});
  const tp=grp(cx+11,0,cz+9);sph(1.3,K.weiss,0,1.6,0,tp,1.1,.9,1);cyl(.7,.3,K.weiss,0,2.7,0,tp);sph(.25,K.rosa,0,3,0,tp);cone(.3,1.2,K.weiss,1.7,2,0,tp).rotation.z=-1;box(.15,1.2,.15,K.rosa,-1.4,1.9,0,tp);kreis(cx+11,cz+9,1.8);
  bude(cx+9,cz-10,-.6,4.4,K.lila,K.weiss,'Tassen');bank(cx-11,cz+8,Math.PI/2+.5);eimer(cx-12,cz-6);laterne(cx-11,cz-9);ballons(cx+12,0,cz-3,6,2.4,3);
  wegweiser(6,cz+6,'← Tassen',0)})();
/* ---------- 6. Riesenrad ---------- */
(function(){const b=ZN('Riesenrad'),R=12,H=15.5;scheibe(b.x,b.z,23,0xe4d6a8,.1);zugang(b,35);
  [-1,1].forEach(s=>{[-1.9,1.9].forEach(zz=>stab(scene,b.x+s*8,0,b.z+zz,b.x,H,b.z+zz*.8,.8,K.weiss,null,true));kreis(b.x+s*8,b.z,1.4);kreis(b.x+s*5,b.z,1.2)});
  [-1.9,1.9].forEach(zz=>box(11,.4,.4,K.weiss,b.x,5,b.z+zz,scene));cyl(.55,5.6,K.grau,b.x,H,b.z,scene).rotation.x=Math.PI/2;
  const rad=grp(b.x,H,b.z),tz=[-1.1,1.1];tz.forEach(z=>{const t=new THREE.Mesh(new THREE.TorusGeometry(R,.28,6,40),mat(K.blau));t.position.z=z;rad.add(t);const t2=new THREE.Mesh(new THREE.TorusGeometry(R*.5,.18,5,28),mat(K.weiss));t2.position.z=z;rad.add(t2);for(let k=0;k<3;k++){const sp=box(R*2,.22,.22,K.weiss,0,0,z,rad);sp.rotation.z=k*Math.PI/3}});
  cyl(1.1,2.8,K.gold,0,0,0,rad).rotation.x=Math.PI/2;
  const gd=[];for(let i=0;i<12;i++){const a=i/12*6.283,g=grp(Math.cos(a)*R,Math.sin(a)*R,0,rad);box(1.7,1.3,1.5,BUNT[i%8],0,-.9,0,g,true);box(2,.18,1.7,K.weiss,0,-.2,0,g);gd.push(g)}
  const bl=[];for(let i=0;i<36;i++){const a=i/36*6.283;[-1.5,1.5].forEach(z=>bl.push([Math.cos(a)*(R+.05),Math.sin(a)*(R+.05),z,.16,.16,.16]))}instanz(rad,gSph,0xfff0b8,bl,true);
  bewegt(rad,t=>{const a=t*.14;rad.rotation.z=a;gd.forEach(g=>{g.rotation.z=-a})},b.x,b.z,170);
  box(7,1,5,K.holz,b.x,.5,b.z+4,scene,true);box(2,.5,1,K.holz,b.x,.25,b.z+7.5,scene);kreis(b.x,b.z+2,3.6);
  bude(b.x+13,b.z+10,-.4,4.8,K.blau,K.weiss,'Riesenrad');bank(b.x-13,b.z+11,Math.PI);bank(b.x+14,b.z-10,-Math.PI/2);laterne(b.x-12,b.z+6);laterne(b.x+12,b.z-4);ballons(b.x-14,0,b.z-10,6,2.4,4);
  beet(b.x-17,b.z+3,3,10);beet(b.x+18,b.z+4,3,10)
  wegweiser(b.x+4,b.z+27,'Riesenrad',0)})();
/* ---------- 7. Achterbahn (kindgerecht) ---------- */
(function(){const b=ZN('Achterbahn'),N=96;scheibe(b.x,b.z,26,0xe0d2a4,.1);zugang(b,35);
  const P=a=>({x:b.x+(15.5+2.5*Math.sin(3*a+.5))*Math.cos(a),z:b.z+(17+2*Math.cos(2*a))*Math.sin(a),y:5.8+2.6*Math.sin(2*a+.6)+.6*Math.sin(5*a)});
  const pts=[];for(let i=0;i<N;i++)pts.push(P(i/N*Math.PI*2));
  for(let i=0;i<N;i++){const p=pts[i],q=pts[(i+1)%N],r=pts[(i+N-1)%N];stab(scene,p.x,p.y,p.z,q.x,q.y,q.z,1.7,K.blau,.22);
    const tx=q.x-r.x,tz=q.z-r.z,tl=Math.hypot(tx,tz)||1,nx=-tz/tl*.8,nz=tx/tl*.8,qx=pts[(i+2)%N],tx2=qx.x-p.x,tz2=qx.z-p.z,tl2=Math.hypot(tx2,tz2)||1,nx2=-tz2/tl2*.8,nz2=tx2/tl2*.8;
    [-1,1].forEach(s=>stab(scene,p.x+nx*s,p.y+.3,p.z+nz*s,q.x+nx2*s,q.y+.3,q.z+nz2*s,.16,K.rot,.2));
    if(i%3===0){cyl(.22,p.y,K.weiss,p.x,p.y/2,p.z,scene,true);kreis(p.x,p.z,.55)}}
  const mo=sph(8,0x7cc25e,b.x,0,b.z,scene,1,.4,1);mo.castShadow=true;kreis(b.x,b.z,7);[[-3,2],[3,-3],[1,4]].forEach((p,i)=>{cyl(.15,1.2,K.holz,b.x+p[0],3.4,b.z+p[1],scene);sph(.9,0x4aa84e,b.x+p[0],4.4,b.z+p[1],scene)});
  const wg=[0,1,2,3].map(i=>{const g=grp(0,0,0,scene);box(1.5,.8,2.2,i?BUNT[i*2%8]:K.gold,0,.55,0,g,true);box(1.4,.15,.15,K.dunkel,0,1.1,.5,g);[-.35,.35].forEach(x=>sph(.3,HAUT[(i+(x>0?1:0))%4],x,1.3,-.15,g));g.rotation.order='YXZ';return g});
  bewegt(wg,t=>{const u=t*.026;wg.forEach((g,i)=>{const a=(u-i*.0225)*6.283,p=P(a),q=P(a+.05);g.position.set(p.x,p.y+.2,p.z);g.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);g.rotation.x=-Math.atan2(q.y-p.y,Math.hypot(q.x-p.x,q.z-p.z))})},b.x,b.z,130);
  const sx=b.x-9,sz=b.z+22;box(9,.5,3,K.holz,sx,.25,sz,scene,true);box(9,3.2,.4,K.creme,sx,2.1,sz-1.4,scene);box(9.6,.3,3.4,K.rot,sx,3.8,sz,scene);schild('Achterbahn',sx,4.7,sz+1.6,6,1.1,null,'#fff8e6',0);[-4.4,4.4].forEach(x=>cyl(.15,3.8,K.holz,sx+x,1.9,sz+1.5,scene));kreis(sx,sz,4.6);
  bank(b.x+10,b.z+22,Math.PI);eimer(b.x+18,b.z+20);laterne(b.x-18,b.z+18);laterne(b.x+20,b.z-16);ballons(b.x+22,0,b.z+14,6,2.4,5);
  wegweiser(b.x+4,b.z+27,'Achterbahn',0)})();
/* ---------- 8. Floßfahrt ---------- */
(function(){const b=ZN('Floßfahrt'),cx=b.x,cz=b.z;scheibe(cx,cz,19,0xbfdc9a,.1);quer(b);
  wasserFl(cx,cz,12,WASSER);wasserFl(cx,cz,9,0x6ec0ea,.02);scheibe(cx,cz,3.6,0x93cf72,.3);kreis(cx,cz,11.5);
  for(let i=0;i<26;i++){const a=i/26*6.283;felsen(cx+Math.cos(a)*12.4,cz+Math.sin(a)*12.4,.5+rnd()*.35)}
  cyl(.2,2.6,K.holz,cx-1.2,1.3,cz+.5,scene);sph(1,0x4aa84e,cx-1.2,3.2,cz+.5,scene,1.6,1,1.6);
  for(let i=0;i<3;i++)cyl(.75,1.1,i%2?K.weiss:K.rot,cx+1.4,.55+i*1.1,cz-.8,scene,true);cone(.95,1.2,K.rot,cx+1.4,3.9,cz-.8,scene);
  const fl=[0,1,2].map(i=>{const g=grp(0,0,0,scene);cyl(1.5,.55,BUNT[i*3%8],0,.35,0,g,true);cyl(1.2,.12,K.weiss,0,.7,0,g);sph(.3,HAUT[i],.4,1.2,.3,g);sph(.3,HAUT[i+1],-.4,1.2,-.2,g);return g});
  const rut=grp(0,0,0,scene);box(1.6,.5,.9,K.orange,0,.3,0,rut,true);sph(.28,HAUT[2],0,.8,0,rut);const sg=[0,1,2].map(i=>sph(.5,0xffffff,0,0,0,scene));
  const tx=cx-17,tzz=cz-6;box(4,7,4,K.blau,tx,3.5,tzz,scene,true);box(4.6,.4,4.6,K.gelb,tx,7.2,tzz,scene);cone(2.4,1.6,K.rot,tx,8.2,tzz,scene);kreis(tx,tzz,3);stab(scene,tx+2.2,7,tzz+.6,cx-10,.5,cz-3,1.8,K.blau,.25,true);
  bewegt(fl.concat([rut]).concat(sg),t=>{fl.forEach((g,i)=>{const a=t*.22+i*2.09;g.position.set(cx+Math.cos(a)*7.4,.1+Math.sin(t*2+i)*.06,cz+Math.sin(a)*7.4);g.rotation.y=-a});
    const p=(t%9)/9;if(p<.3){const f=p/.3,e=f*f;rut.visible=true;rut.position.set(tx+2.2+(cx-10-tx-2.2)*e,7.5-6.8*e,tzz+.6+(cz-3-tzz-.6)*e);rut.rotation.set(0,0,0)}else rut.visible=false;
    sg.forEach((s,i)=>{const q=(p-.3)/.25,on=q>0&&q<1;s.visible=on;if(on){s.position.set(cx-10.5+(i-1)*.7,.5+q*(1-q)*3*(1+i*.2),cz-3.2);s.scale.setScalar(.2+.5*(1-q))}})},cx,cz,100);
  box(2.2,.25,6,K.holz,cx+4,.5,cz+15,scene,true);[-1,1].forEach(s=>[0,2,4].forEach(i=>cyl(.1,.7,K.braun,cx+4+s,.3,cz+13.5+i*1.2,scene)));
  bude(cx+11,cz+12,-.5,4.6,K.tuerkis,K.weiss,'Floßfahrt');bank(cx-10,cz+14,Math.PI);laterne(cx-14,cz+12);laterne(cx+14,cz-8);ballons(cx+14,0,cz-12,6,2.4,6);eimer(cx+8,cz+16);
  wegweiser(6,cz+6,'← Floßfahrt',0)})();
/* ---------- 9. Autoscooter ---------- */
(function(){const b=ZN('Autoscooter'),cx=b.x,cz=b.z,X=8.5,Z=6;scheibe(cx,cz,19,0xd9dce2,.1);quer(b);
  box(2*X+1,.3,2*Z+1,0x5d6672,cx,.15,cz,scene);
  for(let i=0;i<9;i++){const x=cx-X+(i+.5)*(2*X/9);[-1,1].forEach(s=>box(2*X/9-.1,.7,.5,BUNT[(i+(s>0?3:0))%8],x,.55,cz+s*(Z+.25),scene,true))}
  for(let i=0;i<6;i++){const z=cz-Z+(i+.5)*(2*Z/6);[-1,1].forEach(s=>{if(s<0&&Math.abs(z-cz)<1.8)return;box(.5,.7,2*Z/6-.1,BUNT[(i+s+8)%8],cx+s*(X+.25),.55,z,scene,true)})}
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>{cyl(.15,5.4,K.weiss,cx+p[0]*(X+.6),2.7,cz+p[1]*(Z+.6),scene,true)});
  [[-1,0],[1,0]].forEach(p=>box(.3,.3,2*Z+1.8,K.weiss,cx+p[0]*(X+.6),5.5,cz,scene));[-1,1].forEach(s=>box(2*X+1.8,.3,.3,K.weiss,cx,5.5,cz+s*(Z+.6),scene));
  [[-1,-1,1,-1],[-1,1,1,1],[-1,-1,-1,1],[1,-1,1,1]].forEach(a=>girlande(cx+a[0]*(X+.6),5.3,cz+a[1]*(Z+.6),cx+a[2]*(X+.6),5.3,cz+a[3]*(Z+.6),12,.5));
  box(.5,2,5,K.gelb,cx-X-1.6,5,cz,scene);schild('Autoscooter',cx-X-1.9,5,cz,5,1,null,'#fff8e6',-Math.PI/2);
  kreisLinie(cx-X,cz-Z,cx+X,cz-Z,.9,2.2);kreisLinie(cx-X,cz+Z,cx+X,cz+Z,.9,2.2);kreisLinie(cx+X,cz-Z,cx+X,cz+Z,.9,2.2);kreisLinie(cx-X,cz-Z,cx-X,cz-2.2,.9,2);kreisLinie(cx-X,cz+2.2,cx-X,cz+Z,.9,2);
  const cars=[0,1,2,3,4,5].map(i=>{const g=grp(0,0,0,scene);box(1.4,.55,2.1,BUNT[i],0,.55,0,g,true);box(1.7,.25,2.4,K.schwarz,0,.25,0,g);sph(.3,HAUT[i%4],0,1.35,-.2,g);cyl(.05,3.8,K.grau,0,2.5,-.9,g);return g});
  const sp=[.9,.8,1.0,.7,.95,.85];bewegt(cars,t=>{cars.forEach((g,i)=>{const tt=t*sp[i]+i*1.7,ax=X-1.8,az=Z-1.4;g.position.set(cx+ax*Math.sin(tt),0,cz+az*Math.sin(tt*1.37+i));g.rotation.y=Math.atan2(ax*Math.cos(tt),az*1.37*Math.cos(tt*1.37+i))})},cx,cz,100);
  bude(cx+4,cz+14,.2,4.6,K.rot,K.weiss,'Kasse');bank(cx-8,cz-14,0);laterne(cx-12,cz+10);laterne(cx+14,cz-9);ballons(cx+14,0,cz+8,6,2.4,7);eimer(cx-4,cz+14);
  wegweiser(6,cz+6,'Autoscooter',0)})();
/* ---------- 10. Schiffschaukel ---------- */
(function(){const b=ZN('Schiffschaukel'),cx=b.x,cz=b.z,H=10;scheibe(cx,cz,19,0xf1e6b8,.1);quer(b);
  [-1,1].forEach(s=>{const x=cx+s*5.2;stab(scene,x,0,cz-5.4,x,H,cz,.7,K.blau,null,true);stab(scene,x,0,cz+5.4,x,H,cz,.7,K.blau,null,true);kreis(x,cz-5.4,.9);kreis(x,cz+5.4,.9)});cyl(.3,11,K.grau,cx,H,cz,scene).rotation.z=Math.PI/2;
  const sw=grp(cx,H,cz),L=H-1.8;[-1,1].forEach(s=>box(.25,L,.25,K.grau,s*2.4,-L/2,0,sw));
  const hu=grp(0,-L,0,sw);box(8,.8,2.6,K.rot,0,0,0,hu,true);[-1,1].forEach(s=>{box(1.8,.8,2.6,K.rot,s*4.5,.35,0,hu).rotation.z=s*.5});cyl(.12,3.5,K.holz,0,2,0,hu);box(1.4,.8,.1,K.gelb,.8,3.3,0,hu);[-1,1].forEach(s=>box(8,.12,.12,K.weiss,0,.9,s*1.2,hu));[-2.8,-1,.9,2.7].forEach((x,i)=>sph(.32,HAUT[i%4],x,.95,.3,hu));
  bewegt(sw,t=>{const am=.35+.65*(.5+.5*Math.sin(t*.12));sw.rotation.x=Math.sin(t*.95)*am},cx,cz,100);
  [-6,0,6].forEach(z=>kreis(cx,cz+z,5.2));
  bude(cx+11,cz+12,-.3,5,K.gelb,K.rot,'Schiffschaukel');bank(cx-12,cz+10,Math.PI);laterne(cx-12,cz-9);laterne(cx+12,cz-9);ballons(cx+13,0,cz-4,6,2.4,0);eimer(cx-8,cz+14);
  beet(cx-15,cz+2,3,10);
  wegweiser(-6,cz-2,'Schiffschaukel',0)})();
/* ---------- 11. Kettenflieger ---------- */
(function(){const b=ZN('Kettenflieger'),cx=b.x,cz=b.z;scheibe(cx,cz,19,0xe6d8f2,.1);quer(b);
  cyl(5.5,.8,K.lila,cx,.4,cz,scene,true);for(let i=0;i<4;i++)cyl(1.1,3,[K.rot,K.weiss,K.blau,K.weiss][i],cx,2.2+i*3,cz,scene,true);kreis(cx,cz,9.5);
  const kg=grp(cx,12,cz);cyl(6.6,.5,K.gelb,0,0,0,kg,true);cone(6.2,2.4,K.rot,0,1.4,0,kg,true);sph(.5,K.gold,0,2.8,0,kg);
  const sg=[];for(let i=0;i<8;i++){const a=i/8*6.283,g=grp(Math.cos(a)*6.1,-.2,Math.sin(a)*6.1,kg);g.rotation.y=-a;cyl(.05,5.5,K.grau,0,-2.75,0,g);box(1.3,.25,.9,BUNT[i],0,-5.6,0,g,true);if(i%2)sph(.32,HAUT[(i>>1)%4],0,-5.05,.15,g);sg.push(g)}
  bewegt(kg,t=>{kg.rotation.y=t*.9;const tl=.15+.4*(.5+.5*Math.sin(t*.25));sg.forEach(g=>{g.rotation.z=tl})},cx,cz,115);
  for(let i=0;i<10;i++){const a=i/10*6.283;lampe(cx+Math.cos(a)*5.4,1.1,cz+Math.sin(a)*5.4,LART[i%4])}
  bude(cx-11,cz+11,.5,4.8,K.lila,K.weiss,'Kettenflieger');bank(cx+11,cz+10,Math.PI);laterne(cx-12,cz-9);laterne(cx+12,cz-9);ballons(cx+12,0,cz-5,6,2.4,1);eimer(cx+6,cz+14);
  wegweiser(6,cz-2,'Kettenflieger',0)})();
/* ---------- 12. Minigolf ---------- */
(function(){const b=ZN('Minigolf'),cx=b.x,cz=b.z;scheibe(cx,cz,22,0xaede8a,.11);zugang(b,-35);
  const lanes=[[-11,-9,0],[0,-9,.3],[11,-9,0],[-11,7,.4],[0,7,0],[11,7,-.3]],rb=[];
  lanes.forEach((l,i)=>{const g=grp(cx+l[0],0,cz+l[1]);g.rotation.y=l[2];box(8,.16,2.4,0x4caf6a,0,.08,0,g);box(8.4,.35,.25,K.holz,0,.2,1.3,g);box(8.4,.35,.25,K.holz,0,.2,-1.3,g);[-1,1].forEach(s=>box(.25,.35,2.8,K.holz,s*4.2,.2,0,g));box(.8,.04,.8,K.gelb,-3.4,.18,0,g);cyl(.22,.05,K.schwarz,3.2,.17,0,g);cyl(.03,1.6,K.weiss,3.2,1,0,g);box(.7,.4,.05,BUNT[i],3.55,1.6,0,g);
    const wx=cx+l[0],wz=cz+l[1];
    if(i===0){box(1.2,1.4,1.2,K.creme,0,.8,0,g,true);cone(1,.9,K.rot,0,1.9,0,g);const bg=grp(0,1.4,.7,g);box(.12,2.6,.1,K.weiss,0,0,0,bg);box(2.6,.12,.1,K.weiss,0,0,0,bg);rb.push(bg);kreis(wx,wz,1.1)}
    else if(i===1){box(1.2,.12,2,K.holz,-.9,.4,0,g).rotation.z=.4;box(1.2,.12,2,K.holz,.9,.4,0,g).rotation.z=-.4;box(.9,.1,2,K.holz,0,.6,0,g)}
    else if(i===2){const r=cyl(.9,2.3,K.rot,0,.55,0,g,true);r.rotation.x=Math.PI/2;r.rotation.z=Math.PI/2;box(.3,.6,2,K.rot,0,.3,0,g)}
    else if(i===3){box(1.6,1.3,1.6,K.creme,0,.8,0,g,true);[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]].forEach(p=>{cyl(.3,1.8,K.creme,p[0],.9,p[1],g);cone(.4,.6,K.blau,p[0],2.1,p[1],g)});box(.6,.9,.1,K.braun,0,.55,.85,g);kreis(wx,wz,1.5)}
    else if(i===4){sph(1.3,0x6cbf5a,0,0,0,g,1,.5,.9)}
    else cone(1.1,1.6,K.gelb,0,.9,0,g);});
  const ball=sph(.14,0xffffff,0,.3,0,scene);const bgx=cx-11+Math.cos(0)*0;
  bewegt([ball].concat(rb),t=>{rb.forEach(g=>{g.rotation.z=t*1.2});const f=(Math.sin(t*.8)+1)/2;ball.position.set(cx+11+(f*7-3.5),.3,cz+7-(f*7-3.5)*.3)},cx,cz,100);
  const hut=bude(cx+2,cz+18,0,5.2,K.gruen,K.weiss,'Minigolf');[-1,0,1].forEach(i=>{cyl(.04,1.3,K.braun,cx+2+i*.4,1.5,cz+18.1,scene);box(.18,.1,.35,K.grau,cx+2+i*.4,.85,cz+18.2,scene)});
  bank(cx-12,cz+17,Math.PI);laterne(cx-17,cz+8);laterne(cx+17,cz-4);eimer(cx+8,cz+18);ballons(cx-17,0,cz-8,6,2.4,2);
  beet(cx+17,cz+12,3,10);
  wegweiser(b.x+4,b.z+26,'Minigolf',0)})();
/* ---------- 13. Imbiss mit Picknick ---------- */
(function(){const b=ZN('Imbiss'),cx=b.x,cz=b.z;scheibe(cx,cz,22,0xf3e7bd,.11);zugang(b,-35);
  const zz=cz-12,sx=[-13,-4.4,4.4,13];
  const z1=bude(cx+sx[0],zz,0,5.2,K.rosa,K.weiss,'Zuckerwatte');cone(.35,1.4,K.holz,cx+sx[0],4.1,zz+.6,scene);sph(.95,K.rosa,cx+sx[0],5.3,zz+.6,scene);sph(.6,0xf9a8cc,cx+sx[0]+.5,5.7,zz+.6,scene);
  const z2=bude(cx+sx[1],zz,0,5.2,K.tuerkis,K.weiss,'Eis');cone(.9,2.2,0xe8b86a,cx+sx[1],4.6,zz+.6,scene).rotation.x=Math.PI;sph(.85,K.rosa,cx+sx[1],6,zz+.6,scene);sph(.7,K.weiss,cx+sx[1],6.9,zz+.6,scene);sph(.2,K.rot,cx+sx[1],7.6,zz+.6,scene);
  const z3=bude(cx+sx[2],zz,0,5.2,K.rot,K.weiss,'Popcorn');cyl(1.1,1.5,K.rot,cx+sx[2],4.5,zz+.6,scene);cyl(1.15,.3,K.weiss,cx+sx[2],4.5,zz+.6,scene);for(let i=0;i<6;i++)sph(.4,K.weiss,cx+sx[2]+Math.cos(i*1.1)*.6,5.5+(i%2)*.4,zz+.6+Math.sin(i*1.1)*.5,scene);
  const pk=[0,1,2].map(i=>sph(.22,K.weiss,0,0,0,scene));bewegt(pk,t=>{pk.forEach((p,i)=>{const f=(t*.9+i/3)%1;p.position.set(cx+sx[2]-1+i*1,5.6+f*(1-f)*7,zz+.6+Math.sin(f*6)*.4)})},cx,cz,70);
  const z4=bude(cx+sx[3],zz,0,5.2,K.orange,K.weiss,'Brezeln');const bz=new THREE.Mesh(new THREE.TorusGeometry(.9,.22,6,16),mat(0xb8743a));bz.position.set(cx+sx[3],5.2,zz+.6);scene.add(bz);[-.55,.55].forEach(s=>{const t=new THREE.Mesh(new THREE.TorusGeometry(.5,.2,6,12),mat(0xb8743a));t.position.set(cx+sx[3]+s,4.3,zz+.6);scene.add(t)});
  [[-10,5,K.rot],[0,9,K.blau],[10,5,K.gruen]].forEach((p,i)=>{const g=grp(cx+p[0],0,cz+p[1]);box(2.4,.12,1.2,K.holz,0,.9,0,g,true);[-1,1].forEach(s=>box(.12,.9,.9,K.braun,s,.45,0,g));box(2.4,.1,.5,K.holz,0,.5,.95,g);box(2.4,.1,.5,K.holz,0,.5,-.95,g);cyl(.06,2.8,K.braun,0,1.4,0,g);cone(1.7,.6,p[2],0,2.9,0,g,true);kreis(cx+p[0],cz+p[1],1.8)});
  eimer(cx-16,cz+4);eimer(cx+16,cz+4);eimer(cx,cz-3);laterne(cx-8,cz+14);laterne(cx+8,cz+14);ballons(cx-18,0,cz+10,6,2.4,3);
  beet(cx-16,cz+14,3,10);beet(cx+16,cz+14,3,10)
  wegweiser(cx+4,cz+26,'Imbiss',0)})();
/* ---------- 14. Spielebuden ---------- */
(function(){const b=ZN('Spielebuden'),cx=b.x,cz=b.z;scheibe(cx,cz,20,0xf6e9c4,.11);quer(b);
  const d=bude(cx-9,cz-10,0,5.2,K.blau,K.weiss,'Dosenwerfen');for(let r=0;r<3;r++)for(let i=0;i<3-r;i++)cyl(.3,.7,BUNT[(i+r*3)%8],cx-9-(2-r)*.35+i*.7-.0,1.4+r*.7,cz-10-.4,scene);[0,1,2].forEach(i=>sph(.18,BUNT[i*3%8],cx-10+i*.9,1.15,cz-9.2,scene));
  const e=bude(cx+3,cz-10,0,5.2,K.gelb,K.rot,'Entenangeln');box(4.2,.7,1.8,K.blau,cx+3,.35,cz-7,scene,true);box(3.8,.12,1.4,0x5fb4e8,cx+3,.72,cz-7,scene);kreis(cx+3,cz-7,2.2);
  const du=[0,1,2,3].map(i=>{const g=grp(0,.8,0,scene);ente(g);return g});bewegt(du,t=>{du.forEach((g,i)=>{const a=t*.7+i*1.57;g.position.set(cx+3+Math.cos(a)*1.5,.8,cz-7+Math.sin(a)*.5);g.rotation.y=-a+Math.PI/2})},cx,cz,90);
  const r=bude(cx-9,cz+10,Math.PI,5.2,K.gruen,K.weiss,'Ringwurf');[-1.6,-.8,0,.8,1.6].forEach((x,i)=>cyl(.05,.5,BUNT[i],cx-9-x,1.3,cz+10-.9,scene));[0,2,4].forEach(i=>{const t=new THREE.Mesh(new THREE.TorusGeometry(.2,.04,5,10),mat(K.weiss));t.position.set(cx-9-(i-2)*.8,1.1,cz+10-.9);t.rotation.x=Math.PI/2;scene.add(t)});
  const p=bude(cx+3,cz+10,Math.PI,5.2,K.lila,K.weiss,'Preise');for(let i=0;i<4;i++)teddy(scene,cx+3+(i-1.5)*1.1,1.2,cz+10-.9,[K.braun,K.rosa,K.gelb,K.weiss][i],.9);teddy(scene,cx+3,2.6,cz+10-.9,K.orange,1.2);
  const gr=grp(cx-3,0,cz);cyl(.15,4.2,K.holz,0,2.1,-.3,gr,true);cyl(.3,.4,K.holz,0,.2,-.3,gr);const gw=new THREE.Mesh(new THREE.CircleGeometry(1.9,28),new THREE.MeshBasicMaterial({map:gluecksTextur(),side:THREE.DoubleSide}));gw.position.set(0,4.4,.1);gr.add(gw);cone(.25,.7,K.rot,0,6.7,.12,gr).rotation.x=Math.PI;kreis(cx-3,cz,.8);
  bewegt(gw,t=>{gw.rotation.z=-t*.35},cx,cz,90);schild('Glücksrad',cx-3,6.9,cz,3.4,.8,null,'#fff8e6',0);
  bank(cx+14,cz-2,-Math.PI/2);laterne(cx-16,cz);laterne(cx+13,cz+14);eimer(cx+14,cz+3);ballons(cx-16,0,cz+14,6,2.4,4);ballons(cx+15,0,cz-14,6,2.4,5);
  wegweiser(6,cz+6,'← Spielebuden',0)})();
/* ---------- 15. Spiegelhaus ---------- */
(function(){const b=ZN('Spiegelhaus'),cx=b.x,cz=b.z-3;scheibe(b.x,b.z,20,0xe8def4,.11);quer(b);
  const h=grp(cx,0,cz);box(13,6.5,8,K.lila,0,3.25,0,h,true);box(13.6,.4,8.6,K.gelb,0,6.7,0,h);
  [[-5,0,K.rot],[0,.5,K.blau],[5,0,K.orange]].forEach((p,i)=>{const c=cone(1.6,3,p[2],p[0],8.2,0,h);c.rotation.z=(i-1)*.18});
  const aug=[-1,1].map(s=>{sph(1.1,K.weiss,s*2.6,5.2,4.1,h,1,1,.35);return sph(.5,K.schwarz,s*2.6,5.2,4.45,h)});
  const mu=new THREE.Mesh(new THREE.TorusGeometry(3.4,.35,6,20,Math.PI),mat(K.rot));mu.rotation.z=Math.PI;mu.position.set(0,3.6,4.15);h.add(mu);box(2.8,3.2,.3,K.dunkel,0,1.6,4.05,h);
  bewegt(aug,t=>{aug.forEach((a,i)=>{const s=i?1:-1,dx=spieler.position.x-(cx+s*2.6),dz=spieler.position.z-(cz+4.5),l=Math.hypot(dx,dz)||1;a.position.x=s*2.6+dx/l*.4;a.position.y=5.2+Math.sin(t*.7)*.08;})},cx,cz,100);
  kreis(cx,cz,7.4);
  const gs=grp(cx+3,10.4,cz+1);sph(.9,K.weiss,0,0,0,gs,1,1.2,1);cone(.9,1.4,K.weiss,0,-1.1,0,gs);[-1,1].forEach(s=>{sph(.12,K.schwarz,s*.3,.2,.8,gs);sph(.22,K.weiss,s*1,-.3,0,gs,1,.7,.7)});cone(.4,.8,K.gelb,0,1.4,0,gs);
  const gm=new THREE.Mesh(new THREE.TorusGeometry(.3,.05,5,10,Math.PI),mat(K.braun));gm.rotation.z=Math.PI;gm.position.set(0,-.05,.85);gs.add(gm);
  bewegt(gs,t=>{gs.position.y=10.4+Math.sin(t*1.4)*.5;gs.rotation.y=Math.sin(t*.8)*.5},cx,cz,100);
  schild('Spiegelhaus',cx,9.4,cz+4.6,7.4,1.3,null,'#fff8e6',0);
  [0,1,2].forEach(i=>{const x=cx-13+i*2.6;box(1.9,4.6,.25,K.gold,x,2.3,cz+9,scene,true);box(1.5,4.1,.3,K.himmel,x,2.3,cz+9,scene);kreis(x,cz+9,1.1)});schild('Zerrspiegel',cx-10.4,5.4,cz+9,5.4,.9,null,'#fff8e6',0);
  for(let i=0;i<12;i++)lampe(cx-6.5+i*1.18,6.9,cz+4.45,LART[i%4]);
  bank(cx+10,cz+10,Math.PI);laterne(cx+14,cz+4);laterne(cx-15,cz+3);eimer(cx+6,cz+11);ballons(cx+14,0,cz+10,6,2.4,6);ballons(cx-15,0,cz-6,6,2.4,7);
  wegweiser(-6,b.z+6,'Spiegelhaus →',0)})();
/* ---------- 16. Zaubertheater ---------- */
(function(){const b=ZN('Zaubertheater'),cx=b.x,cz=b.z;scheibe(cx,cz,12.5,0xe3d9f2,.12);zugang(b,-100);
  const tx=cx+4,tz=cz-4;cone(4.2,5,K.lila,tx,2.5,tz,scene,true);sph(.35,K.gold,tx,5.2,tz,scene);box(1.8,2.4,.2,K.dunkel,tx,1.2,tz+3.05,scene);kreis(tx,tz,4.4);
  for(let i=0;i<9;i++){const h=.7+(i%3)*1.2,r=4.2*(1-h/5)+.05,a=i*1.1;sph(.22,K.gold,tx+Math.cos(a)*r*.98,h+.6,tz+Math.sin(a)*r*.98,scene)}
  const kb=grp(cx-5,0,cz-5);box(3.6,1.8,1.6,K.rot,0,.9,0,kb,true);[-1,1].forEach(s=>box(.5,2.4,1.5,K.rot,s*1.55,3,0,kb));box(3.6,2.4,.2,K.dunkel,0,3,-.7,kb);box(4.2,.5,1.8,K.gelb,0,4.4,0,kb);[-1,1].forEach(s=>{const r=box(4.6,.2,1.4,K.blau,0,5.1,s*.5,kb);r.rotation.x=s*.45});kreis(cx-5,cz-5,2.3);
  const pu=[0,1].map(i=>{const g=grp(cx-5+(i?.8:-.8),1.8,cz-5+.2);cyl(.3,.8,i?K.gruen:K.orange,0,-.2,0,g);sph(.35,HAUT[i],0,.4,0,g);cone(.3,.6,i?K.rot:K.blau,0,.9,0,g);return g});
  bewegt(pu,t=>{pu.forEach((g,i)=>{g.position.y=1.9+Math.max(0,Math.sin(t*2.2+i*2))*1;g.rotation.z=Math.sin(t*4+i)*.2})},cx,cz,80);
  schild('Kasperle',cx-5,6.2,cz-4.2,3.4,.8,null,'#fff8e6',0);
  const wz=grp(cx+3,0,cz+6);cone(.9,2.2,K.blau,0,1.1,0,wz);sph(.32,HAUT[0],0,2.5,0,wz);cone(.45,1.1,K.blau,0,3.3,0,wz);cyl(.55,.08,K.blau,0,2.8,0,wz);sph(.12,K.gold,0,3.9,0,wz);sph(.22,K.weiss,0,2.15,.2,wz);
  const ar=grp(.5,1.9,0,wz);cyl(.04,1,K.holz,0,.5,0,ar);sph(.14,K.gold,0,1.05,0,ar);const ss=[0,1,2].map(i=>sph(.12,K.gelb,0,0,0,wz));
  bewegt([ar].concat(ss),t=>{ar.rotation.z=-.7+Math.sin(t*3)*.35;ss.forEach((s,i)=>{const a=t*2+i*2.1;s.position.set(.8+Math.cos(a)*.6,3.2+Math.sin(t*3+i)*.3,Math.sin(a)*.6)})},cx,cz,80);kreis(cx+3,cz+6,.9);
  const hu=grp(cx-2,0,cz+5);cyl(.5,.12,K.schwarz,0,.06,0,hu);cyl(.35,.7,K.schwarz,0,.45,0,hu);[-1,1].forEach(s=>sph(.1,K.weiss,s*.15,1.1,0,hu,1,2.4,1));
  [[-2,10],[3,10]].forEach(p=>bank(cx+p[0]-3,cz+p[1]-3,Math.PI));laterne(cx-10,cz+4);laterne(cx+10,cz+6);ballons(cx-10,0,cz+8,5,2.2,1);
  wegweiser(cx+4,cz+15,'Zaubertheater',0)})();
/* ---------- 17. Rundflug ---------- */
(function(){const b=ZN('Rundflug'),cx=b.x,cz=b.z;scheibe(cx,cz,12.5,0xdde8f6,.12);zugang(b,-100);
  cyl(5.2,.6,K.blau,cx,.3,cz,scene,true);for(let i=0;i<3;i++)cyl(.7,3,[K.rot,K.weiss,K.rot][i],cx,2.1+i*3,cz,scene,true);kreis(cx,cz,6.6);
  const hg=grp(cx,9.4,cz);sph(1,K.gold,0,0,0,hg);for(let k=0;k<3;k++){const a=box(11,.35,.35,K.gelb,0,0,0,hg);a.rotation.y=k*Math.PI/3}
  const pg=[];for(let i=0;i<5;i++){const a=i/5*6.283,g=grp(Math.cos(a)*5.3,-1.8,Math.sin(a)*5.3,hg);g.rotation.order='YXZ';g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));sph(.55,BUNT[i],0,0,0,g,1.6,.6,.6);box(.6,.1,2.8,K.weiss,0,.05,0,g);box(.1,.5,.1,K.weiss,-.8,.3,0,g);box(.5,.1,1.1,K.rot,-.85,.1,0,g);pg.push(g)}
  bewegt(hg,t=>{hg.rotation.y=-t*.8;const tl=.25+.2*Math.sin(t*.4);pg.forEach((g,i)=>{g.rotation.x=tl;g.position.y=-1.8+Math.sin(t*1.6+i*1.3)*.9})},cx,cz,100);
  bude(cx+8,cz+6,-.5,4.4,K.tuerkis,K.weiss,'Rundflug');laterne(cx-9,cz+4);laterne(cx-8,cz-7);ballons(cx+9,0,cz-6,5,2.2,2);bank(cx-3,cz+10,Math.PI);
  wegweiser(cx-4,cz+15,'Rundflug',0)})();
/* ---------- 18. Ballonwiese ---------- */
(function(){const b=ZN('Ballonwiese'),cx=b.x,cz=b.z;scheibe(cx,cz,17,0xa8dc7e,.11);zugang(b,-100);
  const bx=cx+3,bz=cz+2;cyl(.4,.8,K.holz,bx,.4,bz,scene);box(1.2,.5,1.2,K.dunkel,bx,.25,bz,scene);kreis(bx,bz,1.2);
  const hb=grp(bx,12,bz);sph(4.2,K.rot,0,0,0,hb,1,1.15,1).castShadow=true;sph(4.28,K.gelb,0,.2,0,hb,1,.2,1);sph(3.5,K.blau,0,2.3,0,hb,1,.2,1);cone(1.5,1.7,K.rot,0,-4.3,0,hb);box(2.4,1.4,2.4,0xc9a46a,0,-7.2,0,hb,true);box(2.6,.2,2.6,K.holz,0,-6.5,0,hb);box(2.45,.15,2.45,K.holz,0,-7.4,0,hb);box(2.45,.15,2.45,K.holz,0,-7.9,0,hb);cone(.45,.9,K.orange,0,-5.7,0,hb);[-1,1].forEach(a=>[-1,1].forEach(c=>cyl(.05,2.6,K.braun,a*1.1,-5.2,c*1.1,hb)));
  const rope=cyl(.04,1,K.braun,bx,6,bz,scene);
  bewegt([hb,rope],t=>{const y=13.5+Math.sin(t*.3)*3.2;hb.position.y=y;hb.rotation.y=t*.12;rope.scale.set(.05,y-7.6,.05);rope.position.y=(y-7.6)/2+.6},bx,bz,200);
  const ca=grp(cx-8,0,cz+7);box(2.4,.9,1.4,K.rot,0,.8,0,ca,true);[-1,1].forEach(s=>cyl(.4,.2,K.dunkel,s*.9,.4,.8,ca).rotation.x=Math.PI/2);box(1.8,.3,.5,K.holz,2.2,.8,0,ca);kreis(cx-8,cz+7,2);
  ballons(cx-8,1.2,cz+7,9,3.2,3);ballons(cx-7,1.2,cz+9,7,2.6,4);
  const dr=[0,1].map(i=>{const g=grp(0,0,0,scene);box(1.2,1.2,.05,i?K.rot:K.gelb,0,0,0,g).rotation.z=Math.PI/4;[1,2,3].forEach(k=>box(.2,.2,.04,K.rosa,-.5-k*.5,-.4-k*.35,0,g));return g});
  bewegt(dr,t=>{dr.forEach((g,i)=>{const a=t*.25+i*3.1;g.position.set(cx+Math.cos(a)*9,15+Math.sin(t*.7+i)*2.5,cz-3+Math.sin(a*1.3)*7);g.rotation.z=Math.sin(t+i)*.3;g.rotation.y=-a})},cx,cz,100);
  box(4,.06,4,K.rot,cx-4,.1,cz-8,scene);[-1.3,0,1.3].forEach(x=>{box(.5,.07,4,K.weiss,cx-4+x,.11,cz-8,scene);box(4,.07,.5,K.weiss,cx-4,.12,cz-8+x,scene)});cyl(.45,.5,0xc9a46a,cx-4,.4,cz-8,scene,true);kreis(cx-4,cz-8,1.2);
  mast(cx-14,cz-8,6);mast(cx+14,cz-8,6);wimpel(cx-14,5.9,cz-8,cx+14,5.9,cz-8,14,1.3);
  beet(cx-12,cz+2,4,14);beet(cx+12,cz+12,4,14);beet(cx+6,cz-10,3,10)
  bank(cx+10,cz-3,-Math.PI/2);laterne(cx-12,cz-3);laterne(cx+12,cz+3);
  wegweiser(cx+4,cz+17,'Ballonwiese',0)})();
/* ---------- 19. Bahnhof und Mini-Eisenbahn ---------- */
(function(){const b=ZN('Bahnhof'),cx=b.x,cz=b.z,A=19,B=11.5,N=64;scheibe(cx,cz,22,0xdccfa8,.1);zugang(b,-100);
  const E=a=>({x:cx+Math.cos(a)*A,z:cz+Math.sin(a)*B});
  for(let i=0;i<N;i++){const a=i/N*6.283,p=E(a),q=E(a+6.283/N),tx=q.x-p.x,tz=q.z-p.z,l=Math.hypot(tx,tz),nx=-tz/l*.7,nz=tx/l*.7;
    const sl=box(.4,.16,2.6,K.braun,(p.x+q.x)/2,.1,(p.z+q.z)/2,scene);sl.rotation.y=Math.atan2(tx,tz);[-1,1].forEach(s=>stab(scene,p.x+nx*s,.26,p.z+nz*s,q.x+nx*s,.26,q.z+nz*s,.14,K.grau,.16))}
  const mo=sph(6.2,0x7cc25e,cx,0,cz-B,scene,1,.55,.8);mo.castShadow=true;kreis(cx,cz-B,4.6);
  const hs=haus(cx,cz+1,8,4,K.creme,K.rot);schild('Bahnhof',cx,3.3,cz+3.2,4.6,.9,null,'#fff8e6',0);box(1.2,1.8,.1,K.braun,cx,.9,cz+3.1,scene);const uh=sph(.5,K.weiss,cx+3,3.2,cz+3.1,scene,1,1,.2);kreis(cx,cz+1,4.4);
  box(10,.5,2.4,K.grau,cx,.25,cz+5.6,scene);kreisLinie(cx-5,cz+5.6,cx+5,cz+5.6,.7,2.2);cyl(.1,3.4,K.dunkel,cx+7,1.7,cz+3,scene);sph(.25,K.rot,cx+7,3.3,cz+3,scene);sph(.25,K.gruen,cx+7,2.8,cz+3,scene);
  const zug=[zugLok(scene,K.rot),zugWagen(scene,K.gelb),zugWagen(scene,K.blau),zugWagen(scene,K.gruen)];
  bewegt(zug,t=>{const th=t*.17;zug.forEach((g,i)=>{const a=th-i*.27,p=E(a),q=E(a+.05);g.position.set(p.x,0,p.z);g.rotation.y=Math.atan2(-(q.z-p.z),q.x-p.x)});zug[0].userData.anim(t)},cx,cz,120);
  bank(cx-10,cz+8,Math.PI);bank(cx+12,cz+8,Math.PI);laterne(cx-14,cz+5);laterne(cx+15,cz+5);eimer(cx+9,cz+8);ballons(cx-16,0,cz+9,5,2.2,5);
  beet(cx+16,cz+10,3,10);
  wegweiser(cx-4,cz+22,'Bahnhof',0)})();
/* ---------- 20. Wilde Maus (Holzachterbahn für Kinder, Achter-Form) ---------- */
(function(){const b=ZN('Wilde Maus'),cx=b.x,cz=b.z;scheibe(cx,cz,22,0xe9dcb8,.1);zugang(b,35);
  gleis(a=>({x:cx+17*Math.sin(a),z:cz+10*Math.sin(2*a),y:4.6+2.2*Math.cos(a)+.7*Math.sin(3*a)}),80,K.holz,K.orange,K.holz,[K.gruen,K.gelb,K.tuerkis,K.gruen],true,.03,.03,cx,cz);
  bude(cx-12,cz-17,0,5,K.gruen,K.weiss,'Wilde Maus');
  const m=grp(cx+10,0,cz-17);sph(1.2,K.grau,0,1.2,0,m,1,1,1.3);sph(.7,K.grau,0,1.8,1.5,m);[-1,1].forEach(s=>sph(.4,K.rosa,s*.55,2.4,1.3,m,1,1,.4));sph(.18,K.rosa,0,1.8,2.1,m);cyl(.1,1.6,K.rosa,0,.6,-1.6,m).rotation.x=1.2;box(2,1.2,2,K.gelb,2.6,.6,-.8,m);kreis(cx+10,cz-17,2);kreis(cx+12.6,cz-17.8,1.4);
  bank(cx-4,cz+17,Math.PI);laterne(cx+16,cz+12);laterne(cx-17,cz+8);ballons(cx+17,0,cz-12,6,2.4,2);eimer(cx+4,cz+17);
  beet(cx-18,cz-8,3,10);
  wegweiser(cx+4,cz-27,'Wilde Maus',0)})();
/* ---------- 21. Mini-Karussell (Kinderkarussell) ---------- */
(function(){const b=ZN('Mini-Karussell'),cx=b.x,cz=b.z;scheibe(cx,cz,14,0xfbe8c0,.1);zugang(b,35);zaun(cx,cz,12.5,48,-Math.PI/2);
  cyl(4.6,.5,K.rosa,cx,.25,cz,scene,true);kreis(cx,cz,4.8);
  const kg=grp(cx,0,cz);cyl(4,.2,K.gelb,0,.6,0,kg);cyl(.5,3.6,K.tuerkis,0,2.4,0,kg,true);cone(4.4,1.8,K.lila,0,5.1,0,kg,true);cyl(4.4,.4,K.gelb,0,4.1,0,kg);sph(.35,K.rot,0,6.2,0,kg);
  const fz=[0,1,2,3,4].map(i=>{const a=i/5*6.283,g=grp(Math.cos(a)*2.7,.9,Math.sin(a)*2.7,kg);g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));fahrzeug(g,i);return g});
  bewegt(kg,t=>{kg.rotation.y=t*.3;fz.forEach((g,i)=>{g.position.y=.9+Math.sin(t*1.4+i*1.3)*.12;if(g.userData.rot)g.userData.rot.rotation.y=t*8})},cx,cz,100);
  bude(cx+1,cz+9,Math.PI,4.6,K.rosa,K.weiss,'Mini-Karussell');[0,1,2].forEach(i=>teddy(scene,cx-8+i*1.4,0,cz-9,[K.braun,K.rosa,K.gelb][i],.8));
  bank(cx-9,cz+4,Math.PI/2+.4);bank(cx+9,cz+4,-Math.PI/2-.4);ballons(cx+9,0,cz-6,6,2.4,5);ballons(cx-9,0,cz-4,5,2.2,6);eimer(cx+6,cz+10);laterne(cx-6,cz+10);
  beet(cx+9,cz+9,3,10);
  wegweiser(cx+4,cz-16,'Mini-Karussell',0)})();
/* ---------- 22. Happy Sailor (Schiffs-Karussell) ---------- */
(function(){const b=ZN('Happy Sailor'),cx=b.x,cz=b.z;scheibe(cx,cz,18,0xdfeaf2,.1);zugang(b,-35);
  wasserFl(cx,cz,8.5,WASSER);wasserFl(cx,cz,6.5,0x6ec0ea,.02);kreis(cx,cz,8.8);for(let i=0;i<20;i++){const a=i/20*6.283;felsen(cx+Math.cos(a)*9,cz+Math.sin(a)*9,.5+rnd()*.3)}
  for(let i=0;i<4;i++)cyl(.55,3.2,i%2?K.weiss:K.blau,cx,1.6+i*3.2,cz,scene,true);
  const fg=grp(cx,13.2,cz);box(1.8,1,.08,K.gelb,.9,0,0,fg);bewegt(fg,t=>{fg.rotation.y=Math.sin(t*1.5)*.4},cx,cz,100);
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(d=>wimpel(cx,12.6,cz,cx+d[0]*13,2.4,cz+d[1]*13,7,0));
  const hub=grp(cx,3.6,cz);[0,1].forEach(k=>{const a=box(11.6,.22,.22,K.holz,0,0,0,hub);a.rotation.y=k*Math.PI/2});
  const bt=[0,1,2,3].map(i=>{const a=i/4*6.283,g=grp(Math.cos(a)*5.4,-3.2,Math.sin(a)*5.4,hub);g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));const c=[K.rot,K.gelb,K.gruen,K.orange][i];box(2.6,.7,1.1,c,0,0,0,g,true);cone(.55,.9,c,1.65,.1,0,g).rotation.z=-Math.PI/2;cyl(.07,2.4,K.holz,.2,1.5,0,g);box(.06,1.7,1,K.weiss,.1,1.6,0,g);cyl(.05,3.2,K.grau,-1,1.6,0,g);return g});
  bewegt(hub,t=>{hub.rotation.y=t*.35;bt.forEach((g,i)=>{g.rotation.z=Math.sin(t*1.5+i*1.6)*.07})},cx,cz,100);
  const an=grp(cx+11,0,cz+8);cyl(.1,2.4,K.dunkel,0,1.4,0,an);cyl(.09,1.5,K.dunkel,0,2.1,0,an).rotation.z=Math.PI/2;const ar=new THREE.Mesh(new THREE.TorusGeometry(.75,.12,6,12,Math.PI),mat(K.dunkel));ar.rotation.z=Math.PI;ar.position.y=.7;an.add(ar);const rg=new THREE.Mesh(new THREE.TorusGeometry(.3,.07,5,10),mat(K.grau));rg.position.y=2.8;an.add(rg);kreis(cx+11,cz+8,1);
  const rb=grp(cx-11,0,cz+8);[-1.8,1.8].forEach(x=>cyl(.1,3.4,K.holz,x,1.7,0,rb,true));box(4.4,1.8,.2,K.blau,0,2.3,0,rb);schild('Ahoi!',0,3.9,.05,2.6,.7,null,'#fff8e6',0,rb);[-1.2,0,1.2].forEach((x,i)=>{const r1=new THREE.Mesh(new THREE.TorusGeometry(.42,.14,6,14),mat(i%2?K.weiss:K.rot));r1.position.set(x,2.3,.18);rb.add(r1)});kreis(cx-11,cz+8,2.4);
  const ma=grp(cx+6,0,cz+13);cyl(.4,1.2,K.weiss,0,.9,0,ma,true);box(.8,.3,.5,K.blau,0,1.45,.1,ma);sph(.34,HAUT[0],0,1.95,0,ma);cyl(.36,.3,K.weiss,0,2.3,0,ma);cyl(.37,.08,K.blau,0,2.2,0,ma);cyl(.1,1,K.weiss,-.5,.5,0,ma);cyl(.1,1,K.weiss,.5,.5,0,ma);kreis(cx+6,cz+13,.8);
  bude(cx-2,cz+14,.3,5,K.blau,K.weiss,'Happy Sailor');bank(cx-14,cz+2,Math.PI/2);laterne(cx+14,cz-4);laterne(cx-13,cz-8);ballons(cx+14,0,cz+2,6,2.4,3);eimer(cx+2,cz+15);
  wegweiser(cx+4,cz+19,'Happy Sailor',0)})();
/* ---------- 23. Panoramarad (kleineres Rad mit geschlossenen Kabinen) ---------- */
(function(){const b=ZN('Panoramarad'),cx=b.x,cz=b.z,R=9.5,H=13;scheibe(cx,cz,20,0xe6ddf0,.1);zugang(b,-35);
  [-1,1].forEach(s=>{[-1.6,1.6].forEach(zz=>stab(scene,cx+s*6,0,cz+zz,cx,H,cz+zz*.7,.6,K.rosa,null,true));kreis(cx+s*6,cz,1.2);kreis(cx+s*3.5,cz,1.1)});
  [-1.6,1.6].forEach(zz=>box(8,.35,.35,K.rosa,cx,4,cz+zz,scene));cyl(.5,4.6,K.grau,cx,H,cz,scene).rotation.x=Math.PI/2;
  const rad=grp(cx,H,cz);[-.9,.9].forEach(z=>{const t=new THREE.Mesh(new THREE.TorusGeometry(R,.3,6,36),mat(K.lila));t.position.z=z;rad.add(t);for(let k=0;k<4;k++){const sp=box(R*2,.18,.18,K.gelb,0,0,z,rad);sp.rotation.z=k*Math.PI/4}});
  cyl(.9,2.2,K.gold,0,0,0,rad).rotation.x=Math.PI/2;
  const ka=[];for(let i=0;i<8;i++){const a=i/8*6.283,g=grp(Math.cos(a)*R,Math.sin(a)*R,0,rad);sph(1.05,BUNT[i],0,-1.4,0,g,1,1.1,1);cone(.8,.5,K.weiss,0,-.4,0,g);ka.push(g)}
  const bl=[];for(let i=0;i<30;i++){const a=i/30*6.283;[-1.3,1.3].forEach(z=>bl.push([Math.cos(a)*(R+.05),Math.sin(a)*(R+.05),z,.16,.16,.16]))}instanz(rad,gSph,0xbfe8ff,bl,true);
  bewegt(rad,t=>{const a=-t*.1;rad.rotation.z=a;ka.forEach(g=>{g.rotation.z=-a})},cx,cz,170);
  box(6,.7,3.6,K.holz,cx,.35,cz,scene,true);kreis(cx,cz,2.8);
  bude(cx+12,cz-8,.4,4.8,K.lila,K.weiss,'Panoramarad');bank(cx-12,cz+9,Math.PI);laterne(cx-12,cz-6);laterne(cx+12,cz+8);ballons(cx-14,0,cz-10,6,2.4,4);
  beet(cx+15,cz+12,3,10);
  wegweiser(cx+4,cz+24,'Panoramarad',0)})();
/* ---------- 24. Gondelbahn: Talstation und Bergstation ---------- */
(function(){const A=ZN('Talstation'),B=ZN('Bergstation'),yA=9,yB=16;zugang(A,35);station(A,yA,K.rot,'Talstation');station(B,yB,K.blau,'Bergstation');
  const ex=B.x-A.x,ez=B.z-A.z,L=Math.hypot(ex,ez);stab(scene,A.x,yA+.9,A.z,B.x,yB+.9,B.z,.14,K.dunkel);
  for(let k=1;k<=8;k++){let t=k/9;for(let o=0;o<30;o++){const tt=t+(o%2?1:-1)*Math.ceil(o/2)*.008,x=A.x+ex*tt,z=A.z+ez*tt;if(!EXTRAZONEN.some(e=>Math.hypot(x-e.x,z-e.z)<e.r+2)&&Math.abs(z-35)>4&&Math.abs(z+35)>4&&Math.abs(x)>5){t=tt;break}}
    const x=A.x+ex*t,z=A.z+ez*t,h=yA+.9+(yB-yA)*t;cyl(.3,h,K.grau,x,h/2,z,scene,true);box(2.4,.25,.25,K.dunkel,x,h,z,scene);kreis(x,z,.5)}
  const cb=[K.rot,K.gelb,K.gruen,K.orange].map(c=>{const g=grp(0,0,0,scene);cyl(.06,1.4,K.dunkel,0,-.7,0,g);box(1.8,1.4,1.5,c,0,-2.1,0,g,true);box(2,.2,1.7,K.weiss,0,-1.35,0,g);g.rotation.y=Math.atan2(ex,ez);return g});
  bewegt(cb,t=>{cb.forEach((g,i)=>{const u=(t*.011+i*.25)%1,s=u<.5?u*2:2-u*2;g.position.set(A.x+ex*s,yA+.9+(yB-yA)*s,A.z+ez*s);g.visible=Math.hypot(g.position.x-spieler.position.x,g.position.z-spieler.position.z)<150})})})();
/* ---------- 25. Freifallturm ---------- */
(function(){const b=ZN('Freifallturm'),cx=b.x,cz=b.z,H=32;scheibe(cx,cz,14,0xe6d8f2,.1);zugang(b,-100);cyl(4,.6,K.lila,cx,.3,cz,scene,true);for(let i=0;i<4;i++)cyl(1.3,H/4,[K.rot,K.gelb,K.blau,K.gruen][i],cx,H/8+i*H/4,cz,scene,true);cone(1.8,3,K.rot,cx,H+1.5,cz,scene);sph(.4,K.gold,cx,H+3.2,cz,scene);kreis(cx,cz,4.5);
  for(let i=0;i<8;i++){const a=i/8*6.283;lampe(cx+Math.cos(a)*1.5,H,cz+Math.sin(a)*1.5,LART[i%4])}
  const g=grp(cx,5,cz);cyl(2.3,.7,K.orange,0,0,0,g,true);for(let i=0;i<4;i++){const a=i*1.571;box(.9,.3,.9,BUNT[i],Math.cos(a)*2.9,-.5,Math.sin(a)*2.9,g);sph(.3,HAUT[i],Math.cos(a)*2.9,.1,Math.sin(a)*2.9,g)}
  bewegt(g,t=>{g.position.y=4+(H-9)*(.5-.5*Math.cos(t*.22))},cx,cz,220);
  bude(cx+8,cz+8,.4,4.4,K.rot,K.weiss,'Freifallturm');bank(cx-8,cz+7,Math.PI);ballons(cx-9,0,cz-4,5,2.2,4);
  wegweiser(cx+4,cz+16,'Freifallturm',0)})();
/* ---------- 26. Aussichtsturm mit Fernrohr ---------- */
(function(){const b=ZN('Aussichtsturm'),cx=b.x,cz=b.z,H=24;scheibe(cx,cz,14,0xe3ecd0,.1);zugang(b,35);
  [-1,1].forEach(sx=>[-1,1].forEach(sz=>{stab(scene,cx+sx*4.5,0,cz+sz*4.5,cx+sx*2.2,H,cz+sz*2.2,.7,K.weiss,null,true);kreis(cx+sx*4.5,cz+sz*4.5,.9)}));
  [6,12,18].forEach(h=>{const o=4.5-2.3*h/H;[-1,1].forEach(q=>{box(2*o,.25,.25,K.holz,cx,h,cz+q*o,scene);box(.25,.25,2*o,K.holz,cx+q*o,h,cz,scene)})});
  box(6.6,.4,6.6,K.rot,cx,H,cz,scene,true);[-1,1].forEach(q=>{box(6.6,.9,.12,K.weiss,cx,H+.65,cz+q*3.3,scene);box(.12,.9,6.6,K.weiss,cx+q*3.3,H+.65,cz,scene);[-1,1].forEach(r=>cyl(.1,3.3,K.holz,cx+q*3.2,H+1.8,cz+r*3.2,scene))});cone(5.2,2.2,K.gelb,cx,H+4.4,cz,scene);
  const fr=grp(cx+1.6,H+.2,cz+1.8);cyl(.05,1,K.grau,-.3,.5,0,fr);cyl(.05,1,K.grau,.3,.5,.2,fr);cyl(.15,1.4,K.dunkel,0,1.1,0,fr).rotation.z=1.2;bewegt(fr,t=>{fr.rotation.y=Math.sin(t*.4)*1.2},cx,cz,160);
  const lf=grp(cx,0,cz);box(1.1,1.4,1.1,K.gelb,0,.7,0,lf,true);bewegt(lf,t=>{lf.position.y=1+(H-2.6)*(.5-.5*Math.cos(t*.3))},cx,cz,160);
  bude(cx+8,cz+8,.4,4.4,K.blau,K.weiss,'Aussichtsturm');bank(cx-9,cz+7,Math.PI);ballons(cx-10,0,cz-3,5,2.2,6);
  wegweiser(cx+4,cz+16,'Aussichtsturm',0)})();
/* ---------- 27. Geisterbahn (freundlich) ---------- */
(function(){const b=ZN('Geisterbahn'),cx=b.x,cz=b.z;scheibe(cx,cz,20,0xe0d8ec,.1);zugang(b,-100);const hz=cz-4;
  const h=grp(cx,0,hz);box(14,7,9,K.lila,0,3.5,0,h,true);box(14.6,.5,9.6,K.gelb,0,7.2,0,h);[[-5,K.orange],[0,K.rot],[5,K.orange]].forEach((p,i)=>{const c=cone(1.8,3.6,p[1],p[0],9.4+(i===1?1.6:0),0,h);c.rotation.z=(i-1)*.15});
  box(3.2,3.6,.3,K.schwarz,0,1.8,4.55,h);[-1,1].forEach(q=>{sph(.9,K.gelb,q*3.6,4.8,4.4,h,1,1,.3);sph(.4,K.schwarz,q*3.6,4.8,4.7,h)});const mu=new THREE.Mesh(new THREE.TorusGeometry(2.6,.3,6,16,Math.PI),mat(K.orange));mu.rotation.z=Math.PI;mu.position.set(0,5.4,4.6);h.add(mu);kreis(cx,hz,7.4);
  const gh=gespenst(scene,1.6);bewegt(gh,t=>{gh.position.set(cx+Math.sin(t*.5)*3,11+Math.sin(t*1.3)*.5,hz+1.5);gh.rotation.y=Math.sin(t*.7)*.5},cx,cz,100);
  [[-6,6],[-3.6,7.4],[3.6,7.4],[6,6],[-8.5,3],[8.5,3]].forEach(p=>pumpe(cx+p[0],hz+p[1]));[[-4,8.6],[4,8.6]].forEach(p=>{const g=gespenst(scene,.8);g.position.set(cx+p[0],1.4,hz+p[1]);g.rotation.y=p[0]*.05;kreis(cx+p[0],hz+p[1],.8)});
  const fl=[0,1,2].map(i=>{const g=grp(0,0,0,scene);box(.5,.12,.2,K.dunkel,0,0,0,g);return [box(.9,.05,.4,K.dunkel,-.55,0,0,g),box(.9,.05,.4,K.dunkel,.55,0,0,g),g]});
  [-.6,.6].forEach(s=>stab(scene,cx+s,.12,hz+4.6,cx+s,.12,hz+14,.1,K.grau));
  const wg=[K.gruen,K.rosa].map(c=>{const g=grp(0,0,0,scene);box(1.6,.7,2,c,0,.5,0,g,true);const q=gespenst(g,.5);q.position.set(0,1.5,.3);sph(.3,HAUT[1],0,1.2,-.5,g);return g});
  bewegt(wg.concat(fl.map(f=>f[2])),t=>{wg.forEach((g,i)=>{const u=(t*.07+i*.5)%1,s=u<.5?u*2:2-u*2;g.position.set(cx+(i?.6:-.6),0,hz+3+s*9)});fl.forEach((f,i)=>{const a=t*.7+i*2.1;f[2].position.set(cx+Math.cos(a)*9,7.5+Math.sin(t*1.7+i)*1,hz+Math.sin(a)*7);f[2].rotation.y=-a;f[0].rotation.z=Math.sin(t*14+i)*.7;f[1].rotation.z=-Math.sin(t*14+i)*.7})},cx,cz,100);
  bude(cx+9,cz+9,.3,4.6,K.lila,K.weiss,'Geisterbahn');bank(cx-9,cz+11,Math.PI);laterne(cx-11,cz+4);laterne(cx+13,cz-2);
  wegweiser(cx+4,cz+17,'Geisterbahn',0)})();
/* ---------- 28. Tretboote auf dem Teich der Floßfahrt ---------- */
(function(){const b=ZN('Floßfahrt'),cx=b.x,cz=b.z;
  const sw=[K.weiss,K.rosa,K.gelb].map((c,i)=>{const g=grp(0,0,0,scene);sph(.9,c,0,.5,0,g,1.3,.6,.8);cyl(.15,1.1,c,.9,1.1,0,g);sph(.28,c,.9,1.8,0,g);cone(.1,.3,K.orange,1.25,1.75,0,g).rotation.z=-Math.PI/2;box(.8,.3,.8,K.blau,-.4,1,0,g);sph(.25,HAUT[i],-.4,1.4,0,g);return g});
  bewegt(sw,t=>{sw.forEach((g,i)=>{const a=-t*.17+i*2.09,r=9.7+Math.sin(t*.5+i)*.7;g.position.set(cx+Math.cos(a)*r,.1+Math.sin(t*2+i)*.05,cz+Math.sin(a)*r);g.rotation.y=Math.atan2(Math.cos(a),Math.sin(a))})},cx,cz,100);
  schild('Tretboote',cx+4,2.4,cz+13.3,3.2,.7,null,'#fff8e6',0);cyl(.08,2.4,K.holz,cx+2.6,1.2,cz+13.3,scene);cyl(.08,2.4,K.holz,cx+5.4,1.2,cz+13.3,scene)})();
/* ---------- 29. Kletterpark mit Trampolinen ---------- */
(function(){const b=ZN('Kletterpark'),cx=b.x,cz=b.z;scheibe(cx,cz,18,0xe9e2b8,.1);zugang(b,35);
  [[-8,-4],[4,-4]].forEach(p=>{box(3,.4,3,K.holz,cx+p[0],6,cz+p[1],scene,true);[-1,1].forEach(sx=>[-1,1].forEach(sz=>cyl(.15,6,K.holz,cx+p[0]+sx*1.3,3,cz+p[1]+sz*1.3,scene)));cone(2.4,1.6,K.rot,cx+p[0],8,cz+p[1],scene);kreis(cx+p[0],cz+p[1],2.2)});
  for(let i=0;i<11;i++)box(.9,.12,2,K.holz,cx-6.5+i*1.1,5.9-Math.sin(i/10*Math.PI)*.8,cz-4,scene);[-1,1].forEach(q=>box(11.5,.1,.1,K.gelb,cx-1.5,6.8,cz-4+q*1,scene));
  const nt=grp(cx-8,0,cz+1);nt.rotation.x=.45;for(let i=0;i<7;i++)box(.06,6.6,.06,K.gelb,-1.5+i*.5,3.2,0,nt);for(let i=0;i<6;i++)box(3.2,.06,.06,K.gelb,0,.6+i*1,0,nt);kreisLinie(cx-9.5,cz+3.5,cx-6.5,cz+3.5,.8,1.5);
  const tr=[[6,8],[11,3],[10,12]];tr.forEach((p,i)=>{cyl(2.1,.5,K.rot,cx+p[0],.25,cz+p[1],scene,true);cyl(1.7,.54,K.schwarz,cx+p[0],.27,cz+p[1],scene);kreis(cx+p[0],cz+p[1],2.1)});
  const kd=tr.map((p,i)=>{const g=grp(cx+p[0],.6,cz+p[1]);cyl(.3,.8,BUNT[i*2],0,.4,0,g);sph(.35,HAUT[i],0,1.1,0,g);return g});
  const ck=[0,1].map(i=>{const g=grp(cx-8+(i?.6:-.6),0,cz+1);cyl(.2,.7,BUNT[i+4],0,0,0,g);sph(.28,HAUT[i+1],0,.55,0,g);return g});
  bewegt(kd.concat(ck),t=>{kd.forEach((g,i)=>{g.position.y=.6+Math.abs(Math.sin(t*3+i*1.4))*2.4});ck.forEach((g,i)=>{const f=.5+.5*Math.sin(t*.5+i*3);g.position.set(cx-8+(i?.6:-.6),.5+f*5.2,cz+1+f*2.2-.3)})},cx,cz,90);
  bude(cx+4,cz+16,Math.PI,4.6,K.gruen,K.weiss,'Kletterpark');bank(cx-6,cz+14,Math.PI);laterne(cx-13,cz+6);laterne(cx+13,cz-8);ballons(cx+14,0,cz+14,5,2.2,3);
  wegweiser(cx+4,cz-19,'Kletterpark',0)})();
/* ---------- 30. Wasserspielplatz ---------- */
(function(){const b=ZN('Wasserspiel'),cx=b.x,cz=b.z;scheibe(cx,cz,20,0xdff0f8,.1);zugang(b,35);
  wasserFl(cx-4,cz+4,7,WASSER);wasserFl(cx-4,cz+4,5,0x6ec0ea,.02);for(let i=0;i<16;i++){const a=i/16*6.283;felsen(cx-4+Math.cos(a)*7.6,cz+4+Math.sin(a)*7.6,.45+rnd()*.3)}kreis(cx-4,cz+4,7.6);
  const kd=[0,1,2].map(i=>{const g=grp(0,0,0,scene);cyl(.3,.7,BUNT[i*3],0,.5,0,g);sph(.35,HAUT[i],0,1.1,0,g);return g});bewegt(kd,t=>{kd.forEach((g,i)=>{const a=t*.4+i*2.1;g.position.set(cx-4+Math.cos(a)*3.5,.1+Math.abs(Math.sin(t*2+i))*.4,cz+4+Math.sin(a)*3.5)})},cx,cz,80);
  const px=cx+9,pz=cz-6;cyl(.3,3.4,K.weiss,px,1.7,pz,scene,true);cone(3,1.2,K.rosa,px,3.9,pz,scene,true);kreis(px,pz,.8);const pg=grp(px,0,pz),pt=[0,1,2,3,4,5,6,7].map(i=>sph(.24,0xe8f8ff,0,0,0,pg));bewegt(pg,t=>{pt.forEach((p,i)=>{const f=(t*.7+i/8)%1,a=i*.785;p.position.set(Math.cos(a)*2.6,3.5-f*3.3,Math.sin(a)*2.6)})},px,pz,80);
  fontaene(cx-9,cz-9,2.6,5,0);fontaene(cx-3,cz-11,3.2,5,.3);fontaene(cx+3,cz-12,2.6,5,.6);[[-9,-9],[-3,-11],[3,-12]].forEach(p=>scheibe(cx+p[0],cz+p[1],1.3,K.tuerkis,.14));
  const wx=cx-13,wz=cz+12,wr=grp(wx,3,wz);[-1,1].forEach(s=>cyl(.15,3.2,K.holz,wx,1.6,wz+s*1,scene,true));wr.add(new THREE.Mesh(new THREE.TorusGeometry(2.4,.15,5,18),mat(K.holz)));for(let k=0;k<2;k++)box(4.8,.15,.15,K.holz,0,0,0,wr).rotation.z=k*.785;for(let k=0;k<8;k++){const a=k/8*6.283;box(.9,.2,1.2,K.blau,Math.cos(a)*2.5,Math.sin(a)*2.5,0,wr).rotation.z=a+1.57}
  bewegt(wr,t=>{wr.rotation.z=-t*.6},wx,wz,90);wasserFl(wx,wz+.2,1.8,WASSER);kreis(wx,wz,1.8);
  bude(cx+5,cz+13,.3,4.6,K.tuerkis,K.weiss,'Wasserspiel');bank(cx+11,cz+6,-Math.PI/2);laterne(cx+14,cz-2);laterne(cx-13,cz-4);ballons(cx+13,0,cz+10,5,2.2,5);
  wegweiser(cx+4,cz-22,'Wasserspiel',0)})();
/* ---------- 31. Delfinshow ---------- */
(function(){const b=ZN('Delfinshow'),cx=b.x,cz=b.z,px=cx-4;scheibe(cx,cz,24,0xe6eef4,.1);zugang(b,-35,b.x);
  box(22,.5,13,0x2f86cf,px,.38,cz,scene);box(21,.05,12,0x57b4ee,px,.66,cz,scene);[[0,-6.8,23,.5],[0,6.8,23,.5]].forEach(q=>box(q[2],.8,q[3],K.weiss,px+q[0],.4,cz+q[1],scene));[-1,1].forEach(q=>box(.5,.8,13.6,K.weiss,px+q*11.2,.4,cz,scene));
  kreisLinie(px-11,cz-6.8,px+11,cz-6.8,1.1,2.4);kreisLinie(px-11,cz+6.8,px+11,cz+6.8,1.1,2.4);kreisLinie(px-11.2,cz-6,px-11.2,cz+6,1.1,2.4);
  for(let k=0;k<4;k++){const c=k%2?K.blau:K.weiss;box(1.6,.7*(k+1),15,c,cx+8.5+k*1.6,.35*(k+1),cz,scene,true);for(let j=0;j<6;j++){const z=cz-6+j*2.4,y=.7*(k+1);sph(.38,BUNT[(j+k*2)%8],cx+8.5+k*1.6,y+.5,z,scene);sph(.3,HAUT[(j+k)%4],cx+8.5+k*1.6,y+1.1,z,scene)}}
  [8,11.2,14.4].forEach(x=>kreisLinie(cx+x,cz-7,cx+x,cz+7,1.6,2.6));
  const hx=px-2;[-1,1].forEach(q=>{cyl(.12,5,K.holz,hx,2.5,cz+q*3.2,scene)});const ho=new THREE.Mesh(new THREE.TorusGeometry(1.4,.15,6,16),mat(K.rot));ho.rotation.y=Math.PI/2;ho.position.set(hx,3.3,cz);scene.add(ho);box(.2,.2,6.6,K.holz,hx,5.1,cz,scene);
  const dl=[0,1].map(i=>delfin(scene)),ball=sph(.7,K.rot,0,.8,0,scene);
  bewegt(dl.concat([ball]),t=>{dl.forEach((g,i)=>{const u=(t*.17+i*.5)%1,f=u/.35;if(u>.35){g.visible=false;return}g.visible=true;g.position.set(px-9+f*14,-.8+16.8*f*(1-f),cz+(i?.8:-.8));g.rotation.z=Math.atan2(16.8*(1-2*f),14)});ball.position.set(px-8,.9+Math.sin(t*1.6)*.15,cz+3.5)},cx,cz,100);
  schild('Delfinshow',px-14,4.4,cz,6,1.2,null,'#fff8e6',Math.PI/2);[-2.6,2.6].forEach(q=>cyl(.12,4.4,K.holz,px-14,2.2,cz+q,scene));
  bude(cx+4,cz-17,0,4.6,K.blau,K.weiss,'Tickets');laterne(cx+12,cz+14);laterne(cx-14,cz+14);ballons(cx+16,0,cz+14,5,2.2,2);eimer(cx+6,cz+16);
  wegweiser(cx+2,cz-27,'Delfinshow',0)})();
/* ---------- 32. Souvenirs, Info und Toiletten ---------- */
(function(){const s=ZN('Souvenirs'),t=ZN('Toiletten');scheibe(s.x,s.z,11,FARBEN.platz,.1);scheibe(t.x,t.z,9,FARBEN.platz,.1);quer(s);quer(t);
  box(8,3.4,4.6,K.gelb,s.x-1.5,1.7,s.z-1,scene,true);const r=box(9,.3,5.6,K.rot,s.x-1.5,3.7,s.z-1,scene);r.rotation.x=.12;schild('Souvenirs',s.x-1.5,5.2,s.z+1.4,5,1,null,'#fff8e6',0);box(2.2,2.4,.2,K.braun,s.x-1.5,1.2,s.z+1.35,scene);[-3.2,2.2].forEach(x=>box(1.6,1.4,.2,K.himmel,s.x-1.5+x,2,s.z+1.35,scene));kreis(s.x-1.5,s.z-1,4.4);
  box(2.4,.8,1.2,K.holz,s.x-8,.4,s.z+2,scene);for(let i=0;i<3;i++)teddy(scene,s.x-8.8+i*.9,.8,s.z+2,[K.braun,K.rosa,K.gelb][i],.7);kreis(s.x-8,s.z+2,1.4);
  box(3.2,2.8,2.8,K.tuerkis,s.x+6,1.4,s.z+3,scene,true);box(3.6,.3,3.2,K.weiss,s.x+6,3,s.z+3,scene);schild('Info',s.x+6,3.8,s.z+4.5,2,.7,null,'#fff8e6',0);kreis(s.x+6,s.z+3,2.2);
  const pl=grp(s.x+6,0,s.z+8);[-1,1].forEach(q=>cyl(.1,3.2,K.holz,q*2,1.6,0,pl,true));const pm=plakat();pm.position.set(0,3.1,.08);pl.add(pm);box(4.2,5.4,.1,K.holz,0,3.1,0,pl);kreis(s.x+6,s.z+8,2.3);
  laterne(s.x-9,s.z-7);eimer(s.x+2,s.z+7);
  box(6.4,3,3.2,K.blau,t.x,1.5,t.z-1,scene,true);box(7,.3,3.8,K.weiss,t.x,3.1,t.z-1,scene);[[-1.6,K.rosa],[1.6,K.gelb]].forEach(p=>box(1.4,2.2,.2,p[1],t.x+p[0],1.1,t.z+.65,scene));schild('Toiletten',t.x,4.1,t.z+.7,4,.9,null,'#fff8e6',0);kreis(t.x,t.z-1,3.6);eimer(t.x+5,t.z+3);laterne(t.x-6,t.z+3);
  wegweiser(s.x+4,s.z+13,'Souvenirs',0);wegweiser(t.x-4,t.z+11,'Toiletten',0)})();
/* ---------- 33. Parkplatz und Bushaltestelle ---------- */
(function(){const p=ZN('Parkplatz'),h=ZN('Bushaltestelle'),lx=p.x,lz=p.z;scheibe(lx,lz,27,0x9aa0a6,.05);scheibe(h.x,h.z,14,0xcfd4d8,.05);
  box(44,.1,30,0x5d6672,lx,.1,lz,scene);box(70,.1,8,0x5d6672,0,.1,167,scene);
  [-1,1].forEach(q=>{for(let i=0;i<=9;i++)box(.15,.12,4.4,K.weiss,lx-22+i*4.4,.16,lz+q*9,scene);for(let i=0;i<9;i++)if(rnd()<.72)auto(lx-19.8+i*4.4,lz+q*9,0,BUNT[(i*3+(q>0?1:0))%8])});
  box(6,.2,3.2,K.blau,h.x+2,3.4,h.z+8,scene);[-1,1].forEach(q=>cyl(.1,3.3,K.dunkel,h.x+2+q*2.6,1.7,h.z+8+1.3,scene));box(5.6,2.4,.12,K.himmel,h.x+2,1.9,h.z+6.8,scene);bank(h.x+2,h.z+7.6,Math.PI);kreis(h.x+2,h.z+7.6,1.6);
  cyl(.07,3.4,K.dunkel,h.x+8,1.7,h.z+8,scene,true);const bs=schildText('Bus','#fff0b0',1.4,1.4,60);bs.position.set(h.x+8,3.7,h.z+8.1);scene.add(bs);schild('Bushaltestelle',h.x+2,4.5,h.z+9.4,4.4,.8,null,'#fff8e6',0);
  const bus=grp(0,0,166);box(7,2.2,2.6,K.gelb,0,1.7,0,bus,true);box(6.4,.8,2.65,K.himmel,0,2.3,0,bus);box(7,.2,2.7,K.weiss,0,2.9,0,bus);[-2.2,2.2].forEach(x=>{cyl(.55,2.8,K.schwarz,x,.55,0,bus).rotation.x=Math.PI/2});sph(.2,K.weiss,3.5,1.2,.8,bus);sph(.2,K.weiss,3.5,1.2,-.8,bus);
  bewegt(bus,t=>{const x=48*Math.sin(t*.1),v=Math.cos(t*.1);bus.position.x=x;bus.rotation.y=v>0?0:Math.PI},0,160,160);
  laterne(-8,140);laterne(8,140);laterne(-8,158);laterne(8,158);wegweiser(lx,lz-17,'Parkplatz',0);
  schild('Willkommen!',0,.9,GRENZE.z1-9,3.2,.7,null,'#fff8e6',0)})();
/* ---------- Ausgang (Tor wird geöffnet) ---------- */
ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{for(let i=0;i<4;i++)box(1.6,1.6,1.6,i%2?K.rot:K.weiss,s*4.4,.8+i*1.6,0,g,true);cone(1.2,1.6,K.gelb,s*4.4,7.2,0,g)});box(11,1,.7,K.blau,0,6.2,0,g,true);
  const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.2,.4);g.add(s);
  const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,K.rot,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,K.weiss,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.34,K.braun,s*-1.9,1,0,p);box(3.8,.2,.34,K.braun,s*-1.9,2.8,0,p);return p});
  kreis(-4.4,TORZ,1.1);kreis(4.4,TORZ,1.1);return {g,fl,offen:0}})();
/* ---------- Festplatz: Abendfest ---------- */
(function(){const z0=FEST.z;const bue=grp(0,0,z0-14);box(18,1,7,K.holz,0,.5,0,bue,true);box(18.4,.3,7.4,K.creme,0,1.05,0,bue);[-1,1].forEach(s=>box(.6,9,.6,K.braun,s*8.6,4.5,-3,bue,true));box(18.6,1.4,.5,K.gold,0,9.2,-3,bue);box(17,7,.3,K.lila,0,4.6,-3.2,bue,true);
  const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.3,-2.7);bue.add(gs);kreis(0,z0-14,9.6);
  const st=sph(1.6,K.gold,0,6.4,-2.7,bue,1,1,.3);for(let i=0;i<5;i++){const a=i/5*6.283+1.57;const c=cone(.55,1.5,K.gold,Math.cos(a)*1.9,6.4+Math.sin(a)*1.9,-2.7,bue);c.rotation.z=a-1.57}
  [-6,6].forEach(x=>{box(1.6,2.4,1.2,K.schwarz,x,2.4,2,bue,true)});
  for(let i=0;i<14;i++)lampe(-8+i*1.23,8.5,z0-14.5,LART[i%4]);
  for(let r=0;r<6;r++)for(let c=0;c<8;c++)box(2,.05,2,(r+c)%2?K.lila:K.gelb,-7+c*2,.09,z0-8+r*2,scene);
  for(let i=0;i<22;i++){const a=i/21*Math.PI;sph(.6,BUNT[i%8],Math.cos(a)*8.5,.6+Math.sin(a)*8.5,z0+10,scene)}kreis(-8.5,z0+10,.9);kreis(8.5,z0+10,.9);
  [-14,14].forEach(x=>{[-8,0,8].forEach(dz=>{cyl(.15,7,K.braun,x,3.5,z0+dz,scene,true)})});[-8,0,8].forEach(dz=>girlande(-14,6.8,z0+dz,14,6.8,z0+dz,18,2.2));
  [[-8,4],[8,4],[-12,-6],[12,-6],[-4,12],[4,12]].forEach((p,i)=>ballons(p[0],0,z0+p[1],7,3+(i%3),i));
  bude(-16,z0+4,.8,4.8,K.rot,K.weiss,'Popcorn');bude(16,z0+4,-.8,4.8,K.blau,K.weiss,'Limo');
  [[-12,12],[12,12]].forEach((p,i)=>{const t=grp(p[0],0,z0+p[1]);cyl(1.2,.12,K.gelb,0,.9,0,t,true);cyl(.15,.8,K.braun,0,.45,0,t);cone(1.2,.5,BUNT[i*3],0,1.3,0,t);kreis(p[0],z0+p[1],1.6)});
  mast(-20,z0-6,7);mast(20,z0-6,7);wimpel(-20,6.8,z0-6,20,6.8,z0-6,20,1.8)})();
/* ---------- Schmuck am Hauptweg ---------- */
(function(){let n=0;for(let z=GRENZE.z1-12;z>TORZ+4;z-=16){let nah=false;if(Math.abs(z-92)<17||z>112)nah=true;for(const e of EXTRAZONEN){if(Math.abs(e.x)<50&&Math.abs(z-e.z)<e.r+3)nah=true}for(const w of SEITENWEGE){if(Math.abs(z-w)<9)nah=true}for(const m of [84,60,14,-12,-58,-82,-124,-148]){if(Math.abs(z-m)<5)nah=true}if(nah)continue;
  const side=(n%2?1:-1);if(n%3===0)bank(wegX(z)+side*4.6,z,side>0?-Math.PI/2:Math.PI/2);else if(n%3===1)eimer(wegX(z)+side*4.2,z);else kuebel(wegX(z)+side*4.4,z);n++}})();
wegweiser(-14,38.5,'Talstation',0);wegweiser(-24,38.5,'Kletterpark',0);wegweiser(-34,38.5,'Aussichtsturm',0);wegweiser(14,38.5,'Wasserspiel',0);wegweiser(-14,-31.5,'Delfinshow',0);wegweiser(-14,-96.5,'Freifallturm',0);wegweiser(14,-96.5,'Geisterbahn',0);wegweiser(24,-96.5,'Bergstation',0);wegweiser(-36,96,'Souvenirs',0);wegweiser(36,96,'Toiletten',0);wegweiser(-6,128,'Parkplatz',0);wegweiser(6,128,'Bushaltestelle',0);wegweiser(-118,38.5,'Mini-Karussell',0);wegweiser(118,38.5,'Wilde Maus',0);wegweiser(-118,-38.5,'Happy Sailor',0);wegweiser(118,-38.5,'Panoramarad',0);
/* kleine feste Teile werfen keinen Schatten (weniger verschiedene Blöcke nach dem Verschmelzen) */
scene.traverse(m=>{if(!m.isMesh||m.isInstancedMesh||!m.castShadow)return;for(let o=m;o;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep))return}const q=m.scale;if(Math.max(q.x,q.y,q.z)<3.2)m.castShadow=false});
lichtBauen();
/* ---------- Besucher ---------- */
(function(){const jc=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0xe0605a,0x9b6fd0,0x4caf6a],hc=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a,0xe8c24a,0x2a1d14,0xb5651d,0x6b4626],st=['kurz','zoepfe','cap','pferd','kurz','zoepfe','cap','pferd','kurz','zoepfe'];
  for(let i=0;i<16;i++){const f=besucherFigur(Object.assign({},AVATARE[(i+1)%AVATARE.length],{jacke:jc[i%10],haar:hc[(i*3)%10],stil:st[i%10]}));const p=BPTS[(i*2)%BPTS.length];f.g.position.set(p[0]+(rnd()-.5)*2,0,p[1]);f.ziel=BPTS[(i*3+1)%BPTS.length];f.v=1.8+rnd()*.8;besucher.push(f)}})();
}
