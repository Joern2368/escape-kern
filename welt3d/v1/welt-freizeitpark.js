/* Welt: Freizeitpark (Kennwort freizeitpark). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Schilder: ausgeschaltet (Wunsch der Lehrkraft, 24.11.2026). Frühere Liste zum Wiedereinschalten: SCHILDER_ALT einfach als SCHILDER eintragen und WEGMAX auf 4 setzen. */
const SCHILDER_ALT=['Ausgang', 'Geschafft!', 'Riesenrad', 'Achterbahn', 'Wilde Maus', 'Autoscooter', 'Karussell', 'Dino-Park', 'Wildwasserbahn', 'Zirkus', 'Sternwarte', 'Eispalast', 'Schwebebahn', 'Rutschenturm', 'Delfinshow'];
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Lotta Luftballon';
const START={x:0,z:150};
const BEREICHE={
  eingang:{name:'Parkeingang',x:0,z:92,plaetze:[]}
};
const EXTRAZONEN=[{name:'Spielplatz',x:-95,z:66,r:22},{name:'Streichelzoo',x:95,z:66,r:22},{name:'Karussell',x:-45,z:70,r:15},{name:'Tassen',x:45,z:70,r:15},{name:'Riesenrad',x:-95,z:0,r:26},{name:'Achterbahn',x:95,z:0,r:26},{name:'Floßfahrt',x:-45,z:0,r:19},{name:'Autoscooter',x:45,z:0,r:19},{name:'Schiffschaukel',x:-45,z:-68,r:19},{name:'Kettenflieger',x:45,z:-68,r:19},{name:'Minigolf',x:-95,z:-66,r:22},{name:'Imbiss',x:95,z:-66,r:22},{name:'Spielebuden',x:-45,z:-135,r:20},{name:'Spiegelhaus',x:45,z:-135,r:20},{name:'Zaubertheater',x:-88,z:-104,r:13},{name:'Rundflug',x:88,z:-104,r:13},{name:'Ballonwiese',x:-100,z:-137,r:18},{name:'Bahnhof',x:98,z:-137,r:21},{name:'Wilde Maus',x:142,z:66,r:22},{name:'Mini-Karussell',x:-142,z:66,r:14},{name:'Happy Sailor',x:-142,z:-66,r:18},{name:'Panoramarad',x:142,z:-66,r:20},{name:'Talstation',x:-182,z:100,r:12},{name:'Bergstation',x:182,z:-100,r:12},{name:'Freifallturm',x:-142,z:-135,r:14},{name:'Aussichtsturm',x:-142,z:0,r:14},{name:'Wasserspiel',x:142,z:0,r:20},{name:'Geisterbahn',x:142,z:-135,r:20},{name:'Kletterpark',x:-182,z:52,r:18},{name:'Delfinshow',x:-185,z:-8,r:24},{name:'Souvenirs',x:-35,z:100,r:11},{name:'Toiletten',x:35,z:100,r:9},{name:'Parkplatz',x:-28,z:148,r:27},{name:'Bushaltestelle',x:32,z:152,r:14},{name:'Wildwasserbahn',x:185,z:-55,r:18},{name:'Dino-Park',x:190,z:15,r:22},{name:'Rutschenturm',x:-140,z:105,r:15},{name:'Zirkuszelt',x:-190,z:-100,r:20},{name:'Sternwarte',x:190,z:75,r:16},{name:'Eispalast',x:140,z:130,r:14},{name:'Parkteich',x:-125,z:148,r:16},{name:'Schwebebahn West',x:-85,z:130,r:10},{name:'Schwebebahn Ost',x:95,z:138,r:10}];
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
function gesicht(par,x,y,z,r,ry){const g=grp(x,y,z,par);g.rotation.y=ry||0;[-1,1].forEach(q=>{sph(.17*r,0xffffff,q*.36*r,.12*r,.88*r,g);sph(.09*r,0x1b1b1b,q*.36*r,.12*r,.99*r,g)});sph(.1*r,0xf2a0a0,0,-.12*r,.97*r,g,1,.7,.6);return g}
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
  [-1,1].forEach(s=>{cyl(.14,1.2,K.weiss,s*.35,.7,0,g,true);sph(.26,K.gelb,s*.35,.15,.12,g,1,.7,1.4)});
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
  [[-1.1,.85],[1,.85],[-1.1,-.85],[1,-.85]].forEach(p=>{const w=cyl(.42,.18,K.schwarz,p[0],.45,p[1],g);w.rotation.x=Math.PI/2;cyl(.18,.22,K.gold,p[0],.45,p[1],g).rotation.x=Math.PI/2});
  const pf=[0,1,2].map(i=>sph(.35,0xf2f2f2,1.2,2.8,0,g));
  g.userData.anim=t=>{pf.forEach((p,i)=>{const f=(t*.5+i/3)%1;p.position.set(1.2-f*1.8,2.8+f*2.4,0);p.scale.setScalar(.2+f*.7)})};return g}
function zugWagen(par,farbe){const g=grp(0,0,0,par);box(3,.4,1.4,K.schwarz,0,.6,0,g);[-1,1].forEach(x=>[-1,1].forEach(z=>{const w=cyl(.32,.14,K.schwarz,x*.9,.4,z*.8,g);w.rotation.x=Math.PI/2}));box(2.8,1.3,1.5,farbe,0,1.4,0,g,true);box(3,.2,1.7,K.weiss,0,2.15,0,g);[-.5,.5].forEach(z=>sph(.28,HAUT[z>0?0:2],.3,1.9,z*.5,g));return g}
function pony(par,f,m){f=f||0xb87a4a;m=m||K.braun;const g=grp(0,0,0,par);
  sph(.8,f,0,1.1,0,g,1.4,.7,.6).castShadow=true;[[-.7,.3],[-.7,-.3],[.7,.3],[.7,-.3]].forEach(p=>{cyl(.11,.8,f,p[0],.4,p[1],g);cyl(.13,.15,K.dunkel,p[0],.08,p[1],g)});
  cyl(.22,.9,f,.95,1.45,0,g).rotation.z=-.7;
  const kopf=grp(1.3,1.8,0,g);sph(.34,f,0,0,0,kopf,1.3,1,.9);sph(.17,K.rosa,.38,-.12,0,kopf,1,.9,1);[-1,1].forEach(s=>{cone(.07,.25,f,-.1,.35,s*.14,kopf);sph(.06,0xffffff,.22,.12,s*.23,kopf);sph(.035,0x111111,.27,.12,s*.23,kopf)});box(.16,.6,.12,m,-.25,.1,0,kopf).rotation.z=.4;
  box(.6,.1,.7,K.rot,0,1.5,0,g);
  const sw=grp(-1.15,1.3,0,g);cone(.14,1,m,0,-.5,0,sw);
  g.userData.anim=t=>{kopf.rotation.z=-.2+Math.sin(t*1.5)*.2;sw.rotation.z=Math.sin(t*2)*.3};return g}
function schafchen(par,wolle,kopf2){const g=grp(0,0,0,par);sph(.6,wolle||0xf4f0e6,0,.95,0,g,1.3,.95,.95).castShadow=true;[[-.45,.3],[-.45,-.3],[.45,.3],[.45,-.3]].forEach(p=>cyl(.07,.7,K.dunkel,p[0],.35,p[1],g));
  const k=grp(.85,1.1,0,g),kc=kopf2||K.dunkel;sph(.27,kc,.1,0,0,k,1.25,1,.85).castShadow=true;[-1,1].forEach(s=>{sph(.1,kc,-.1,.02,s*.3,k,.5,1.4,.7);sph(.065,0xffffff,.33,.08,s*.15,k);sph(.035,0x111111,.37,.08,s*.15,k)});sph(.12,0xf8f5ee,0,.28,0,k);sph(.05,0x1a1a1a,.43,-.04,0,k);
  g.userData.anim=t=>{k.rotation.z=-.4+Math.sin(t*1.4)*.35};return g}
function ziegchen(par){const g=grp(0,0,0,par),f=0xe6d8b8,d=0x7a5a3a;sph(.55,f,0,.95,0,g,1.35,.95,.85).castShadow=true;[[-.5,.3],[-.5,-.3],[.5,.3],[.5,-.3]].forEach(p=>cyl(.11,.9,f,p[0],.45,p[1],g));cyl(.17,.8,f,.62,1.15,0,g).rotation.z=-.6;
  const k=grp(.8,1.4,0,g);sph(.27,f,.1,0,0,k,1.2,1,.9);sph(.15,d,.38,-.1,0,k,1.1,.9,1);[-1,1].forEach(s=>{sph(.06,0xffffff,.33,.1,s*.16,k);sph(.035,0x111111,.37,.1,s*.16,k);cone(.07,.5,0x5a4a3a,-.05,.32,s*.11,k).rotation.z=.7;sph(.1,d,-.06,.05,s*.3,k,.6,.5,1.8)});cone(.06,.28,d,.3,-.3,0,k).rotation.z=Math.PI;
  g.userData.anim=t=>{k.rotation.z=-.3+Math.sin(t*1.5)*.3};return g}
function haeschen(par){const g=grp(0,0,0,par),f=0xcbb8a0;sph(.4,f,0,.4,0,g,1.2,.9,.8).castShadow=true;sph(.28,f,.4,.7,0,g);[-1,1].forEach(z=>{sph(.1,f,.35,1.15,z*.1,g,.6,2.4,.4);sph(.05,0x111111,.63,.78,z*.14,g);sph(.2,f,-.1,.2,z*.28,g,1.4,.8,.6)});sph(.1,0xffffff,-.5,.45,0,g);sph(.04,0xe8788a,.67,.7,0,g);g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*2.2))*.25};return g}
function reittier(par,f,typ){const g=grp(0,0,0,par);sph(.8,f,0,0,0,g,1.35,.75,.6);
  cyl(.2,.9,f,.95,.45,0,g).rotation.z=-.7;const kp=grp(1.3,.8,0,g);sph(.36,f,0,0,0,kp,1.2,1,.9);[-1,1].forEach(s=>{sph(.06,0xffffff,.22,.1,s*.24,kp);sph(.035,0x111111,.27,.1,s*.24,kp);cone(.07,.25,f,-.1,.35,s*.14,kp)});
  [[-.7,.3],[-.7,-.3],[.7,.3],[.7,-.3]].forEach(p=>{cyl(.1,.7,f,p[0],-.55,p[1],g);cyl(.12,.12,K.dunkel,p[0],-.9,p[1],g)});
  if(typ===0){box(.16,.7,.12,K.braun,.95,.75,0,g).rotation.z=-.5;sph(.2,K.braun,.4,.1,0,kp,1,.6,1.3);cone(.14,.9,K.braun,-1.15,-.1,0,g).rotation.z=2.4}
  else if(typ===1){sph(.17,K.rosa,.38,-.12,0,kp,1,.9,1.1);sph(.1,K.rosa,-1.15,.2,0,g);cone(.12,.5,K.rosa,-1,.5,0,g)}
  else if(typ===2){sph(.5,K.orange,1.0,.65,0,g,.9,1,1.1);cone(.1,.6,K.gold,-1.15,-.1,0,g).rotation.z=2.2;sph(.14,K.orange,-1.55,-.5,0,g)}
  else{cone(.1,.5,K.gold,1.3,1.1,0,g);box(.16,.7,.12,K.rosa,.95,.75,0,g).rotation.z=-.5}
  box(.9,.15,.6,K.rot,.1,.6,0,g);box(1.3,.4,.6,K.weiss,0,-.45,0,g);return g}
function ente(par){const g=grp(0,0,0,par);sph(.3,K.gelb,0,.1,0,g,1.3,.8,1);sph(.2,K.gelb,.28,.35,0,g);[-1,1].forEach(z=>{sph(.05,0xffffff,.38,.42,z*.14,g);sph(.028,0x111111,.42,.42,z*.14,g);sph(.18,K.gelb,-.05,.2,z*.25,g,1.1,.4,.6)});cone(.07,.18,K.orange,.52,.32,0,g).rotation.z=-Math.PI/2;cone(.1,.25,K.gelb,-.4,.25,0,g).rotation.z=1.9;return g}
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
  const wg=cols.map((c,i)=>{const g=grp(0,0,0,scene);box(1.5,.8,2.2,c,0,.55,0,g,true);[-1,1].forEach(x=>[-1,1].forEach(z=>{const w=cyl(.28,.14,K.schwarz,x*.55,.3,z*.9,g);w.rotation.z=Math.PI/2}));[-.35,.35].forEach(x=>box(.45,.5,.45,BUNT[(i+(x>0?2:0))%8],x,1.0,-.15,g));box(1.4,.15,.15,K.dunkel,0,1.1,.5,g);[-.35,.35].forEach(x=>sph(.3,HAUT[(i+(x>0?1:0))%4],x,1.3,-.15,g));if(ohren&&i===0)[-.5,.5].forEach(x=>sph(.3,K.grau,x,1.25,.95,g,1,1,.4));g.rotation.order='YXZ';return g});
  bewegt(wg,t=>{const u=t*sp;wg.forEach((g,i)=>{const a=(u-i*gap)*6.283,p=P(a),q=P(a+.05);g.position.set(p.x,p.y+.2,p.z);g.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);g.rotation.x=-Math.atan2(q.y-p.y,Math.hypot(q.x-p.x,q.z-p.z))})},wx,wz,130)}
function fahrzeug(g,i){let r=null;
  if(i===0){box(1.9,.7,.9,K.rot,0,.4,0,g,true);box(.5,.5,.8,K.weiss,.55,.9,0,g);box(1.2,.12,.3,K.weiss,-.3,.82,0,g);sph(.13,K.blau,.6,1.25,0,g)}
  else if(i===1){sph(.5,K.blau,0,.7,0,g,1.6,.6,.6);sph(.22,K.himmel,.1,1,0,g,1.3,.8,.8);sph(.16,K.gold,.85,.7,0,g);box(.6,.08,2.2,K.weiss,0,.75,0,g);box(.1,.5,.5,K.rot,-.8,.95,0,g);r=box(.08,.8,.12,K.dunkel,.85,.7,0,g)}
  else if(i===2){sph(.7,K.rot,0,.7,0,g,1.1,.8,1);sph(.35,K.schwarz,.85,.65,0,g);sph(.13,K.schwarz,-.1,1.3,.3,g);sph(.13,K.schwarz,.3,1.25,-.3,g)}
  else if(i===3){box(1.7,.6,.9,K.gelb,0,.45,0,g,true);box(.9,.5,.8,K.weiss,-.1,.95,0,g);sph(.12,K.orange,.9,.5,.3,g);sph(.12,K.orange,.9,.5,-.3,g)}
  else{sph(.6,K.gruen,0,.8,0,g,1.2,.9,.8);box(1,.12,.12,K.gruen,-1,.9,0,g);r=box(2.2,.06,.15,K.dunkel,0,1.5,0,g);cyl(.06,.4,K.dunkel,0,1.3,0,g)}
  g.userData.rot=r}
function fontaene(x,z,h,n,ph){cyl(.2,.5,K.grau,x,.25,z,scene);cone(.3,h*1.7,0x5cc0f0,x,.5+h*.85,z,scene);sph(.55,0x8fd8ff,x,.5+h*1.7,z,scene,1,.6,1);const g=grp(x,0,z),tr=[];for(let i=0;i<n;i++)tr.push(sph(.3,0x9fe0ff,0,0,0,g));bewegt(g,t=>{tr.forEach((p,i)=>{const f=(t*.9+i/n+ph)%1,a=i*2.4;p.position.set(Math.cos(a)*f*1.6,.5+4*f*(1-f)*h,Math.sin(a)*f*1.6)})},x,z,80)}
function gespenst(par,s){const g=grp(0,0,0,par);sph(.9*s,K.weiss,0,0,0,g,1,1.2,1);cone(.9*s,1.4*s,K.weiss,0,-1.1*s,0,g);[-1,1].forEach(q=>{sph(.12*s,K.schwarz,q*.3*s,.2*s,.8*s,g);sph(.22*s,K.weiss,q*s,-.3*s,0,g,1,.7,.7)});const m=new THREE.Mesh(new THREE.TorusGeometry(.3*s,.05*s,5,10,Math.PI),mat(K.braun));m.rotation.z=Math.PI;m.position.set(0,-.05*s,.85*s);g.add(m);return g}
function delfin(par){const g=grp(0,0,0,par),c=0x4f7da8;g.scale.setScalar(1.7);sph(.5,0xdfe8ee,.1,-.12,0,g,2.1,.5,.7);sph(.6,c,0,0,0,g,2.3,.7,.7);sph(.28,c,1.75,0,0,g,1.5,.6,.55);sph(.22,0xdfe8ee,1.8,-.1,0,g,1.5,.5,.5);[-1,1].forEach(q=>{sph(.1,0xffffff,1.25,.2,q*.42,g);sph(.055,K.schwarz,1.32,.2,q*.45,g);sph(.3,c,.4,-.2,q*.55,g,1.1,.15,.45)});sph(.6,c,-1.65,.2,0,g,.5,.12,1.2);cone(.25,.6,c,-.1,.55,0,g);return g}
function auto(x,z,rot,f){const g=grp(x,0,z);box(2,.8,4.2,f,0,.85,0,g,true);box(1.8,.75,2.2,f,0,1.6,-.2,g);box(1.84,.5,1.9,K.himmel,0,1.65,-.2,g);box(1.5,.5,2.24,K.himmel,0,1.65,-.2,g);[-1.3,1.3].forEach(q=>[-1,1].forEach(w=>{cyl(.45,.4,K.schwarz,w*.95,.45,q,g).rotation.z=Math.PI/2;cyl(.22,.42,K.grau,w*.95,.45,q,g).rotation.z=Math.PI/2}));[-1,1].forEach(w=>{box(.45,.25,.1,K.gelb,w*.6,.95,2.12,g);box(.45,.25,.1,K.rot,w*.6,.95,-2.12,g)});g.rotation.y=rot;kreis(x,z,1.5)}
function pumpe(x,z){sph(.7,K.orange,x,.55,z,scene,1,.8,1);cyl(.08,.3,K.gruen,x,1.1,z,scene);[-1,1].forEach(s=>box(.15,.15,.05,K.schwarz,x+s*.25,.7,z+.62,scene));box(.4,.1,.05,K.schwarz,x,.4,z+.62,scene);kreis(x,z,.8)}
function station(b,y,farbe,nm){scheibe(b.x,b.z,12,FARBEN.platz,.1);box(3.2,y,3.2,farbe,b.x,y/2,b.z,scene,true);box(6,.6,4.4,K.weiss,b.x,y+.3,b.z,scene);kreis(b.x,b.z,2.6);[-1,1].forEach(q=>[1,2].forEach(k=>box(.1,1.1,.9,K.himmel,b.x+q*1.61,y*k/3,b.z,scene)));box(1.5,2.2,.1,K.dunkel,b.x,1.1,b.z+1.61,scene);box(1.7,.3,.5,K.weiss,b.x,2.4,b.z+1.7,scene);const hx=b.x+9,hz=b.z-1;box(6,3.4,4.4,K.creme,hx,1.7,hz,scene,true);box(6.8,.5,5.2,farbe,hx,3.65,hz,scene);box(1.4,2.4,.1,K.dunkel,hx,1.2,hz+2.25,scene);[-2,2].forEach(q=>box(1.2,1.1,.1,K.himmel,hx+q,1.9,hz+2.25,scene));box(2.6,.5,.12,K.weiss,hx,3.0,hz+2.28,scene);kreis(hx,hz,3.4);bude(b.x+6,b.z+9,0,4.6,farbe,K.weiss,nm);bank(b.x-6,b.z+6,Math.PI);laterne(b.x-7,b.z-6);ballons(b.x+8,0,b.z-5,5,2.2,2)}
const BPTS=[[-8,70],[8,70],[0,35],[-20,35],[20,35],[0,0],[0,-35],[-20,-35],[20,-35],[0,-68],[0,-100],[-20,-100],[20,-100],[0,-130],[-11,98],[11,98],[0,60],[-20,0],[20,0],[-20,-68],[20,-68]];
function paradeBauen(){const liste=[[lotta,1,K.rot],[roboter,.9,K.blau],[ballonhund,.9,K.gelb],[lotta,.8,K.blau],[roboter,.9,K.gruen],[ballonhund,.9,K.rosa],[lotta,.8,K.gelb],[roboter,.9,K.orange],[ballonhund,.9,K.lila],[null,.45]];
  liste.forEach((f,i)=>{let o;if(f[0])o=f[0](scene,f[2]);else{o=grp(0,0,0,scene);const l=zugLok(o,K.rot),w1=zugWagen(o,K.gelb),w2=zugWagen(o,K.blau);w1.position.x=-3.4;w2.position.x=-6.8;o.userData.anim=t=>l.userData.anim(t)}
    o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
function weltBauen(){
FARBEN={boden:0x8fd16f,pfad:0xeadcb0,platz:0xe6d09a};
WASSER=0x4aa3d8;
const boden=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200),mat(FARBEN.boden));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
hauptweg(5);SEITENWEGE.forEach(w=>kreuzplatz(wegX(w),w,7.5));pfad(-205,35,205,35,4);pfad(-205,-35,205,-35,4);pfad(-205,-100,205,-100,4);pfad(0,TORZ+2,0,GRENZE.z0+4,5,FARBEN.platz);
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
  
  const lt=lotta(scene);lt.position.set(-13,0,b.z-4);lt.scale.setScalar(1.7);leben(lt,0);kreis(-13,b.z-4,1.8);
  schild('Ich bin Lotta!',-13,1.5,b.z-1.4,3.4,.7,34);
  wegweiser(-6,b.z-26,'Karussell',0);wegweiser(6,b.z-26,'Tassen',0);wegweiser(-11,b.z-31,'Mini-Karussell',0);wegweiser(-11,b.z-26,'Happy Sailor',0);wegweiser(11,b.z-31,'Wilde Maus',0);wegweiser(11,b.z-26,'Panoramarad',0);wegweiser(-6,b.z-8,'Riesenrad ←',0);wegweiser(6,b.z-8,'Achterbahn →',0);
  laterne(-4,b.z+4);laterne(4,b.z+4);laterne(-4,b.z-20);laterne(4,b.z-20);
  beet(-22,b.z+2,5,24);beet(22,b.z+2,5,24);beet(-24,b.z-14,4,16);beet(24,b.z-14,4,16);kuebel(-10,b.z+13);kuebel(10,b.z+13);eimer(-8,b.z-6);eimer(8,b.z-6);bank(-9,b.z-18,Math.PI/2);bank(9,b.z-18,-Math.PI/2)})();
/* ---------- Lichtermasten am Hauptweg ---------- */
(function(){const zs=[84,60,14,-12,-58,-82,-124,-148];zs.forEach(z=>{const o=wegX(z);mast(o-6.5,z,6.8,K.holz);mast(o+6.5,z,6.8,K.holz);girlande(o-6.5,6.6,z,o+6.5,6.6,z,12,1.1)});
  for(let i=0;i<zs.length-1;i++){const a=zs[i],c=zs[i+1];if(i%2===0){const oa=wegX(a),oc=wegX(c);girlande(oa-6.5,6.6,a,oc-6.5,6.6,c,10,.7,'warm');girlande(oa+6.5,6.6,a,oc+6.5,6.6,c,10,.7,'warm')}}
  zs.forEach((z,i)=>{if(i<zs.length-1)wimpel(-6.5,6.7,z,-6.5,6.7,zs[i+1],7,.6)})})();
/* ---------- 2. Spielplatz mit Hüpfburg ---------- */
(function(){const b=ZN('Spielplatz');scheibe(b.x,b.z,22,0xd1be85,.11);zugang(b,35);
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
(function(){const b=ZN('Streichelzoo');scheibe(b.x,b.z,20,0xbec17f,.11);zaun(b.x,b.z,20,66,-Math.PI/2);zugang(b,35);
  const cx=b.x-7,cz=b.z-3;scheibe(cx,cz,6,0xc8b67e,.15);cyl(.35,3.4,K.holz,cx,1.7,cz,scene,true);sph(.6,K.gold,cx,3.6,cz,scene);
  const arm=grp(cx,0,cz),ps=[0,1,2].map(i=>{const a=i*2.094,g=grp(Math.cos(a)*4.2,0,Math.sin(a)*4.2,arm);cyl(.05,2.4,K.gold,0,1.6,0,g);const p=pony(g,[0xb87a4a,0xf2ece0,0x6a4a34][i]);p.scale.setScalar(.75);p.rotation.y=-a+Math.PI;return {g,p,a}});
  box(8.6,.12,.12,K.gold,0,3.1,0,arm);box(.12,.12,8.6,K.gold,0,3.1,0,arm);
  bewegt(arm,t=>{arm.rotation.y=-t*.4;ps.forEach(q=>q.p.userData.anim(t))},cx,cz,90);kreis(cx,cz,6.4);
  schild('Pony-Reiten',cx,4.7,cz+7.5,4.2,.9,null,'#fff8e6',0);
  [[3,-6],[7,2],[-2,8]].forEach((p,i)=>tier(i?(q=>schafchen(q)):(q=>schafchen(q,0xe6d8b8,0x7a5a3a)),b.x+p[0]+8,b.z+p[1],b.x,b.z,.9,.6));
  [[10,-6],[13,5],[3,6],[14,-2]].forEach((p,i)=>tier(ziegchen,b.x+p[0],b.z+p[1],b.x,b.z,.9-i*.04,.6));
  [[-2,12],[-3.5,13],[-1,13.4]].forEach(p=>tier(haeschen,b.x+p[0],b.z+p[1],b.x,b.z,.8,.3));tier(pony,b.x+13,b.z-12,b.x,b.z,.8,.9);
  const hh=haus(b.x+12,b.z+12,6,4,0xf2d8a8,K.rot);[-1.9,1.9].forEach(x=>{box(.9,.8,.1,K.weiss,b.x+12+x,1.4,b.z+14.04,scene);box(.75,.65,.12,K.himmel,b.x+12+x,1.4,b.z+14.06,scene)});[-1,1].forEach(q=>box(.12,.8,.9,K.himmel,b.x+12+q*3.04,1.4,b.z+12,scene));box(1.2,1.8,.1,K.braun,b.x+12,.9,b.z+9.96,scene);schild('Streicheln erlaubt',b.x+12,3.2,b.z+14.2,4.6,.9,34);box(1.2,1.8,.1,K.braun,b.x+12,.9,b.z+14.05,scene);kreis(b.x+12,b.z+12,3.2);
  ballen(b.x-13,b.z+13,.3);ballen(b.x+3,b.z-14,1);cyl(.6,1,K.holz,b.x-12,.5,b.z+12,scene,true);cone(.8,.9,K.rot,b.x-12,1.4,b.z+12,scene);kreis(b.x-12,b.z+12,.8);
  beet(b.x-14,b.z-12,3,10);
  wegweiser(b.x+4,b.z-26,'Streichelzoo',0)})();
/* ---------- 4. Karussell ---------- */
(function(){const b=ZN('Karussell'),cx=b.x,cz=b.z;scheibe(cx,cz,14,0xd0be89,.1);quer(b);
  cyl(7.2,.6,K.holz,cx,.3,cz,scene,true);cyl(7.8,.25,K.creme,cx,.12,cz,scene);
  const kg=grp(cx,0,cz);cyl(6.4,.3,K.creme,0,.8,0,kg);cyl(.9,6,K.gold,0,3.8,0,kg,true);cone(7.4,2.8,K.rot,0,8.2,0,kg,true);cyl(7.4,.7,K.weiss,0,6.6,0,kg);cyl(7.45,.28,K.gelb,0,6.15,0,kg);sph(.5,K.gold,0,9.8,0,kg);
  const lb=new THREE.Mesh(gCyl,new THREE.MeshBasicMaterial({color:0xfff0b8}));lb.scale.set(7.2,.16,7.2);lb.position.y=5.9;kg.add(lb);
  const tg=[0,1,2,3,4,5].map(i=>{const a=i/6*6.283,x=Math.cos(a)*4.6,z=Math.sin(a)*4.6;cyl(.08,5.6,K.gold,x,3.6,z,kg);const g=grp(x,2.3,z,kg);reittier(g,[K.weiss,0xb87a4a,K.rosa,K.blau,K.gelb,K.gruen][i],i%4);g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));return g});
  bewegt(kg,t=>{kg.rotation.y=t*.55;tg.forEach((g,i)=>{g.position.y=2.4+Math.sin(t*2.2+i*1.7)*.55})},cx,cz,115);kreis(cx,cz,7.6);
  bude(cx-12,cz+7,.6,4.4,K.rot,K.weiss,'Karussell');bank(cx+10,cz+8,Math.PI-.5);bank(cx+12,cz-5,-Math.PI/2);laterne(cx-10,cz-9);laterne(cx+10,cz-9);ballons(cx-11,0,cz-4,6,2.4,2);beet(cx+3,cz+13,3,10);
  wegweiser(-6,cz+6,'Karussell →',0)})();
/* ---------- 5. Drehende Tassen ---------- */
(function(){const b=ZN('Tassen'),cx=b.x,cz=b.z;scheibe(cx,cz,14,0xc5b5b7,.1);quer(b);
  cyl(8.4,.5,K.lila,cx,.25,cz,scene,true);const kg=grp(cx,.5,cz);cyl(7.6,.3,K.gelb,0,.15,0,kg);cyl(1.2,3.4,K.blau,0,1.7,0,kg,true);cone(3.6,1.6,K.rosa,0,4.2,0,kg,true);sph(.4,K.gold,0,5.2,0,kg);
  const tz=[0,1,2,3,4].map(i=>{const a=i/5*6.283,g=grp(Math.cos(a)*4.6,0,Math.sin(a)*4.6,kg);cyl(1.5,1.1,BUNT[(i*2)%8],0,.75,0,g,true);cyl(1.25,.2,K.weiss,0,1.35,0,g);box(.3,.6,.15,BUNT[(i*2)%8],1.55,.8,0,g);sph(.38,HAUT[i%4],.3,1.6,.2,g);return g});
  bewegt(kg,t=>{kg.rotation.y=t*.45;tz.forEach((g,i)=>{g.rotation.y=t*1.3+i})},cx,cz,100);kreis(cx,cz,9);
  [0,1,2,3,4,5,6,7].forEach(i=>{const a=i/8*6.283;lampe(cx+Math.cos(a)*8.9,.9,cz+Math.sin(a)*8.9,LART[i%4])});
  const tp=grp(cx+11,0,cz+9);sph(1.3,K.weiss,0,1.6,0,tp,1.1,.9,1);cyl(.7,.3,K.weiss,0,2.7,0,tp);sph(.25,K.rosa,0,3,0,tp);cone(.3,1.2,K.weiss,1.7,2,0,tp).rotation.z=-1;box(.15,1.2,.15,K.rosa,-1.4,1.9,0,tp);kreis(cx+11,cz+9,1.8);
  bude(cx+9,cz-10,-.6,4.4,K.lila,K.weiss,'Tassen');bank(cx-11,cz+8,Math.PI/2+.5);eimer(cx-12,cz-6);laterne(cx-11,cz-9);ballons(cx+12,0,cz-3,6,2.4,3);
  wegweiser(6,cz+6,'← Tassen',0)})();
/* ---------- 6. Riesenrad ---------- */
(function(){const b=ZN('Riesenrad'),R=12,H=15.5;scheibe(b.x,b.z,23,0xc4b37f,.1);zugang(b,35);
  [-1,1].forEach(s=>{[-1.9,1.9].forEach(zz=>stab(scene,b.x+s*8,0,b.z+zz,b.x,H,b.z+zz*.8,.8,K.weiss,null,true));kreis(b.x+s*8,b.z,1.4);kreis(b.x+s*5,b.z,1.2)});
  [-1.9,1.9].forEach(zz=>box(11,.4,.4,K.weiss,b.x,5,b.z+zz,scene));cyl(.55,5.6,K.grau,b.x,H,b.z,scene).rotation.x=Math.PI/2;
  const rad=grp(b.x,H,b.z),tz=[-1.1,1.1];tz.forEach(z=>{const t=new THREE.Mesh(new THREE.TorusGeometry(R,.28,6,40),mat(K.blau));t.position.z=z;rad.add(t);const t2=new THREE.Mesh(new THREE.TorusGeometry(R*.5,.18,5,28),mat(K.weiss));t2.position.z=z;rad.add(t2);for(let k=0;k<3;k++){const sp=box(R*2,.22,.22,K.weiss,0,0,z,rad);sp.rotation.z=k*Math.PI/3}});
  cyl(1.1,2.8,K.gold,0,0,0,rad).rotation.x=Math.PI/2;
  const gd=[];for(let i=0;i<12;i++){const a=i/12*6.283,g=grp(Math.cos(a)*R,Math.sin(a)*R,0,rad);box(1.7,1.3,1.5,BUNT[i%8],0,-.9,0,g,true);box(2,.18,1.7,K.weiss,0,-.2,0,g);gd.push(g)}
  const bl=[];for(let i=0;i<36;i++){const a=i/36*6.283;[-1.5,1.5].forEach(z=>bl.push([Math.cos(a)*(R+.05),Math.sin(a)*(R+.05),z,.16,.16,.16]))}instanz(rad,gSph,0xfff0b8,bl,true);
  bewegt(rad,t=>{const a=t*.14;rad.rotation.z=a;gd.forEach(g=>{g.rotation.z=-a})},b.x,b.z,170);
  box(7,1,5,K.holz,b.x,.5,b.z+4,scene,true);box(2,.5,1,K.holz,b.x,.25,b.z+7.5,scene);[-3.4,3.4].forEach(x=>[1.6,6.4].forEach(z=>cyl(.07,1,K.gold,b.x+x,1.5,b.z+z,scene)));box(6.9,.08,.08,K.gold,b.x,1.9,b.z+6.4,scene);[-3.4,3.4].forEach(x=>box(.08,.08,4.8,K.gold,b.x+x,1.9,b.z+4,scene));kreis(b.x,b.z+2,3.6);
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
  const wg=[0,1,2,3].map(i=>{const g=grp(0,0,0,scene);box(1.5,.8,2.2,i?BUNT[i*2%8]:K.gold,0,.55,0,g,true);box(1.4,.15,.15,K.dunkel,0,1.1,.5,g);[-.55,.55].forEach(x=>[-.9,.9].forEach(z=>{const w=cyl(.28,.14,K.schwarz,x,.3,z,g);w.rotation.z=Math.PI/2}));[-.35,.35].forEach((x,k)=>{box(.45,.5,.45,BUNT[(i+k*2)%8],x,1.0,-.15,g);sph(.3,HAUT[(i+k)%4],x,1.5,-.15,g);gesicht(g,x,1.5,-.15,.3,0)});g.rotation.order='YXZ';return g});
  bewegt(wg,t=>{const u=t*.026;wg.forEach((g,i)=>{const a=(u-i*.0225)*6.283,p=P(a),q=P(a+.05);g.position.set(p.x,p.y+.2,p.z);g.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);g.rotation.x=-Math.atan2(q.y-p.y,Math.hypot(q.x-p.x,q.z-p.z))})},b.x,b.z,130);
  const sx=b.x-9,sz=b.z+22;box(9,.5,3,K.holz,sx,.25,sz,scene,true);box(9,3.2,.4,K.creme,sx,2.1,sz-1.4,scene);box(9.6,.3,3.4,K.rot,sx,3.8,sz,scene);schild('Achterbahn',sx,4.7,sz+1.6,6,1.1,null,'#fff8e6',0);kreis(sx,sz,4.6);
  bank(b.x+10,b.z+22,Math.PI);eimer(b.x+18,b.z+20);laterne(b.x-18,b.z+18);laterne(b.x+20,b.z-16);ballons(b.x+22,0,b.z+14,6,2.4,5);
  wegweiser(b.x+4,b.z+27,'Achterbahn',0)})();
/* ---------- 8. Floßfahrt ---------- */
(function(){const b=ZN('Floßfahrt'),cx=b.x,cz=b.z;scheibe(cx,cz,19,0xbfdc9a,.1);quer(b);
  wasserFl(cx,cz,12,WASSER);wasserFl(cx,cz,9,0x6ec0ea,.02);scheibe(cx,cz,3.6,0x93cf72,.3);kreis(cx,cz,11.5);
  for(let i=0;i<26;i++){const a=i/26*6.283;felsen(cx+Math.cos(a)*12.4,cz+Math.sin(a)*12.4,.5+rnd()*.35)}
  cyl(.2,2.6,K.holz,cx-1.2,1.3,cz+.5,scene);sph(1,0x4aa84e,cx-1.2,3.2,cz+.5,scene,1.6,1,1.6);
  for(let i=0;i<3;i++)cyl(.75,1.1,i%2?K.weiss:K.rot,cx+1.4,.55+i*1.1,cz-.8,scene,true);cone(.95,1.2,K.rot,cx+1.4,3.9,cz-.8,scene);
  const fl=[0,1,2].map(i=>{const g=grp(0,0,0,scene);cyl(1.5,.55,BUNT[i*3%8],0,.35,0,g,true);cyl(1.2,.12,K.weiss,0,.7,0,g);sph(.3,HAUT[i],.4,1.45,.3,g);gesicht(g,.4,1.45,.3,.3,0);cyl(.28,.5,BUNT[(i*3+2)%8],.4,1.0,.3,g);sph(.3,HAUT[i+1],-.4,1.45,-.2,g);gesicht(g,-.4,1.45,-.2,.3,Math.PI);cyl(.28,.5,BUNT[(i*3+5)%8],-.4,1.0,-.2,g);return g});
  const rut=grp(0,0,0,scene);box(1.6,.5,.9,K.orange,0,.3,0,rut,true);sph(.28,HAUT[2],0,.8,0,rut);const sg=[0,1,2].map(i=>sph(.5,0xffffff,0,0,0,scene));
  const tx=cx-17,tzz=cz-6;box(4,7,4,K.blau,tx,3.5,tzz,scene,true);box(4.6,.4,4.6,K.gelb,tx,7.2,tzz,scene);cone(2.4,1.6,K.rot,tx,8.2,tzz,scene);kreis(tx,tzz,3);stab(scene,tx+2.2,7,tzz+.6,cx-10,.5,cz-3,1.8,K.blau,.25,true);
  bewegt(fl.concat([rut]).concat(sg),t=>{fl.forEach((g,i)=>{const a=t*.22+i*2.09;g.position.set(cx+Math.cos(a)*7.4,.1+Math.sin(t*2+i)*.06,cz+Math.sin(a)*7.4);g.rotation.y=-a});
    const p=(t%9)/9;if(p<.3){const f=p/.3,e=f*f;rut.visible=true;rut.position.set(tx+2.2+(cx-10-tx-2.2)*e,7.5-6.8*e,tzz+.6+(cz-3-tzz-.6)*e);rut.rotation.set(0,0,0)}else rut.visible=false;
    sg.forEach((s,i)=>{const q=(p-.3)/.25,on=q>0&&q<1;s.visible=on;if(on){s.position.set(cx-10.5+(i-1)*.7,.5+q*(1-q)*3*(1+i*.2),cz-3.2);s.scale.setScalar(.2+.5*(1-q))}})},cx,cz,100);
  box(2.2,.25,6,K.holz,cx+4,.5,cz+15,scene,true);[-1,1].forEach(s=>[0,2,4].forEach(i=>cyl(.1,.7,K.braun,cx+4+s,.3,cz+13.5+i*1.2,scene)));
  bude(cx+11,cz+12,-.5,4.6,K.tuerkis,K.weiss,'Floßfahrt');bank(cx-10,cz+14,Math.PI);laterne(cx-14,cz+12);laterne(cx+14,cz-8);ballons(cx+14,0,cz-12,6,2.4,6);eimer(cx+8,cz+16);
  wegweiser(6,cz+6,'← Floßfahrt',0)})();
/* ---------- 9. Autoscooter ---------- */
(function(){const b=ZN('Autoscooter'),cx=b.x,cz=b.z,X=8.5,Z=6;scheibe(cx,cz,19,0xbab8ab,.1);quer(b);
  box(2*X+1,.3,2*Z+1,0x5d6672,cx,.15,cz,scene);
  for(let i=0;i<9;i++){const x=cx-X+(i+.5)*(2*X/9);[-1,1].forEach(s=>box(2*X/9-.1,.7,.5,BUNT[(i+(s>0?3:0))%8],x,.55,cz+s*(Z+.25),scene,true))}
  for(let i=0;i<6;i++){const z=cz-Z+(i+.5)*(2*Z/6);[-1,1].forEach(s=>{if(s<0&&Math.abs(z-cz)<1.8)return;box(.5,.7,2*Z/6-.1,BUNT[(i+s+8)%8],cx+s*(X+.25),.55,z,scene,true)})}
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>{cyl(.15,5.4,K.weiss,cx+p[0]*(X+.6),2.7,cz+p[1]*(Z+.6),scene,true)});
  [[-1,0],[1,0]].forEach(p=>box(.3,.3,2*Z+1.8,K.weiss,cx+p[0]*(X+.6),5.5,cz,scene));[-1,1].forEach(s=>box(2*X+1.8,.3,.3,K.weiss,cx,5.5,cz+s*(Z+.6),scene));
  [[-1,-1,1,-1],[-1,1,1,1],[-1,-1,-1,1],[1,-1,1,1]].forEach(a=>girlande(cx+a[0]*(X+.6),5.3,cz+a[1]*(Z+.6),cx+a[2]*(X+.6),5.3,cz+a[3]*(Z+.6),12,.5));
  schild('Autoscooter',cx-X-1.9,5,cz,5,1,null,'#fff8e6',-Math.PI/2);
  kreisLinie(cx-X,cz-Z,cx+X,cz-Z,.9,2.2);kreisLinie(cx-X,cz+Z,cx+X,cz+Z,.9,2.2);kreisLinie(cx+X,cz-Z,cx+X,cz+Z,.9,2.2);kreisLinie(cx-X,cz-Z,cx-X,cz-2.2,.9,2);kreisLinie(cx-X,cz+2.2,cx-X,cz+Z,.9,2);
  const cars=[0,1,2,3,4,5].map(i=>{const g=grp(0,0,0,scene);box(1.4,.55,2.1,BUNT[i],0,.55,0,g,true);box(1.7,.25,2.4,K.schwarz,0,.25,0,g);sph(.3,HAUT[i%4],0,1.55,-.2,g);gesicht(g,0,1.55,-.2,.3,0);cyl(.28,.5,BUNT[(i+4)%8],0,1.15,-.2,g);box(.5,.08,.08,K.dunkel,0,1.05,.35,g);[-1,1].forEach(x=>[-.7,.7].forEach(z=>{const w=cyl(.17,.12,K.schwarz,x*.7,.2,z,g);w.rotation.z=Math.PI/2}));cyl(.05,4.6,K.grau,0,3.3,-.9,g);return g});
  const sp=[.9,.8,1.0,.7,.95,.85];bewegt(cars,t=>{cars.forEach((g,i)=>{const tt=t*sp[i]+i*1.7,ax=X-1.8,az=Z-1.4;g.position.set(cx+ax*Math.sin(tt),0,cz+az*Math.sin(tt*1.37+i));g.rotation.y=Math.atan2(ax*Math.cos(tt),az*1.37*Math.cos(tt*1.37+i))})},cx,cz,100);
  bude(cx+4,cz+14,.2,4.6,K.rot,K.weiss,'Kasse');bank(cx-8,cz-14,0);laterne(cx-12,cz+10);laterne(cx+14,cz-9);ballons(cx+14,0,cz+8,6,2.4,7);eimer(cx-4,cz+14);
  wegweiser(6,cz+6,'Autoscooter',0)})();
/* ---------- 10. Schiffschaukel ---------- */
(function(){const b=ZN('Schiffschaukel'),cx=b.x,cz=b.z,H=10;scheibe(cx,cz,19,0xcfc18b,.1);quer(b);
  [-1,1].forEach(s=>{const x=cx+s*5.2;stab(scene,x,0,cz-5.4,x,H,cz,.7,K.blau,null,true);stab(scene,x,0,cz+5.4,x,H,cz,.7,K.blau,null,true);kreis(x,cz-5.4,.9);kreis(x,cz+5.4,.9)});cyl(.3,11,K.grau,cx,H,cz,scene).rotation.z=Math.PI/2;
  const sw=grp(cx,H,cz),L=H-1.8;[-1,1].forEach(s=>box(.25,L,.25,K.grau,s*2.4,-L/2,0,sw));
  const hu=grp(0,-L,0,sw);box(8,.8,2.6,K.rot,0,0,0,hu,true);[-1,1].forEach(s=>{box(1.8,.8,2.6,K.rot,s*4.5,.35,0,hu).rotation.z=s*.5});cyl(.12,3.5,K.holz,0,2,0,hu);box(1.4,.8,.1,K.gelb,.8,3.3,0,hu);[-1,1].forEach(s=>box(8,.12,.12,K.weiss,0,.9,s*1.2,hu));[-2.8,-1,.9,2.7].forEach((x,i)=>sph(.32,HAUT[i%4],x,.95,.3,hu));
  bewegt(sw,t=>{const am=.35+.65*(.5+.5*Math.sin(t*.12));sw.rotation.x=Math.sin(t*.95)*am},cx,cz,100);
  [-6,0,6].forEach(z=>kreis(cx,cz+z,5.2));
  bude(cx+11,cz+12,-.3,5,K.gelb,K.rot,'Schiffschaukel');bank(cx-12,cz+10,Math.PI);laterne(cx-12,cz-9);laterne(cx+12,cz-9);ballons(cx+13,0,cz-4,6,2.4,0);eimer(cx-8,cz+14);
  beet(cx-15,cz+2,3,10);
  wegweiser(-6,cz-2,'Schiffschaukel',0)})();
/* ---------- 11. Kettenflieger ---------- */
(function(){const b=ZN('Kettenflieger'),cx=b.x,cz=b.z;scheibe(cx,cz,19,0xc5b5b7,.1);quer(b);
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
(function(){const b=ZN('Imbiss'),cx=b.x,cz=b.z;scheibe(cx,cz,22,0xd0c28f,.11);zugang(b,-35);
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
(function(){const b=ZN('Spielebuden'),cx=b.x,cz=b.z;scheibe(cx,cz,20,0xd3c394,.11);quer(b);
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
(function(){const b=ZN('Spiegelhaus'),cx=b.x,cz=b.z-3;scheibe(b.x,b.z,20,0xc7bab9,.11);quer(b);
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
(function(){const b=ZN('Zaubertheater'),cx=b.x,cz=b.z;scheibe(cx,cz,12.5,0xc3b6b7,.12);zugang(b,-100);
  const tx=cx+4,tz=cz-4;cone(4.2,5,K.lila,tx,2.5,tz,scene,true);sph(.35,K.gold,tx,5.2,tz,scene);box(1.8,2.4,.2,K.dunkel,tx,1.2,tz+3.05,scene);kreis(tx,tz,4.4);
  for(let i=0;i<9;i++){const h=.7+(i%3)*1.2,r=4.2*(1-h/5)+.05,a=i*1.1;sph(.22,K.gold,tx+Math.cos(a)*r*.98,h+.6,tz+Math.sin(a)*r*.98,scene)}
  const kb=grp(cx-5,0,cz-5);box(3.6,1.8,1.6,K.rot,0,.9,0,kb,true);[-1,1].forEach(s=>box(.5,2.4,1.5,K.rot,s*1.55,3,0,kb));box(3.6,2.4,.2,K.dunkel,0,3,-.7,kb);box(4.2,.5,1.8,K.gelb,0,4.4,0,kb);[-1,1].forEach(s=>{const r=box(4.6,.2,1.4,K.blau,0,5.1,s*.5,kb);r.rotation.x=s*.45});kreis(cx-5,cz-5,2.3);
  const pu=[0,1].map(i=>{const g=grp(cx-5+(i?.8:-.8),1.8,cz-5+.2);cyl(.3,.8,i?K.gruen:K.orange,0,-.2,0,g);sph(.35,HAUT[i],0,.4,0,g);cone(.3,.6,i?K.rot:K.blau,0,.9,0,g);return g});
  bewegt(pu,t=>{pu.forEach((g,i)=>{g.position.y=1.9+Math.max(0,Math.sin(t*2.2+i*2))*1;g.rotation.z=Math.sin(t*4+i)*.2})},cx,cz,80);
  schild('Kasperle',cx-5,6.2,cz-4.2,3.4,.8,null,'#fff8e6',0);
  const wz=grp(cx+3,0,cz+6);cone(.9,2.2,K.blau,0,1.1,0,wz);sph(.32,HAUT[0],0,2.5,0,wz);cone(.45,1.1,K.blau,0,3.3,0,wz);cyl(.55,.08,K.blau,0,2.8,0,wz);sph(.12,K.gold,0,3.9,0,wz);sph(.22,K.weiss,0,2.15,.2,wz);[-1,1].forEach(s=>{sph(.06,0xffffff,s*.13,2.55,.26,wz);sph(.035,0x111111,s*.13,2.55,.3,wz)});sph(.07,K.rosa,0,2.46,.31,wz);
  const ar=grp(.5,1.9,0,wz);cyl(.04,1,K.holz,0,.5,0,ar);sph(.14,K.gold,0,1.05,0,ar);const ss=[0,1,2].map(i=>sph(.12,K.gelb,0,0,0,wz));
  bewegt([ar].concat(ss),t=>{ar.rotation.z=-.7+Math.sin(t*3)*.35;ss.forEach((s,i)=>{const a=t*2+i*2.1;s.position.set(.8+Math.cos(a)*.6,3.2+Math.sin(t*3+i)*.3,Math.sin(a)*.6)})},cx,cz,80);kreis(cx+3,cz+6,.9);
  const hu=grp(cx-2,0,cz+5);cyl(.5,.12,K.schwarz,0,.06,0,hu);cyl(.35,.7,K.schwarz,0,.45,0,hu);[-1,1].forEach(s=>sph(.1,K.weiss,s*.15,1.1,0,hu,1,2.4,1));
  [[-2,10],[3,10]].forEach(p=>bank(cx+p[0]-3,cz+p[1]-3,Math.PI));laterne(cx-10,cz+4);laterne(cx+10,cz+6);ballons(cx-10,0,cz+8,5,2.2,1);
  wegweiser(cx+4,cz+15,'Zaubertheater',0)})();
/* ---------- 17. Rundflug ---------- */
(function(){const b=ZN('Rundflug'),cx=b.x,cz=b.z;scheibe(cx,cz,12.5,0xbec2ba,.12);zugang(b,-100);
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
  const hs=haus(cx,cz+1,8,4,K.creme,K.rot);schild('Bahnhof',cx,3.3,cz+3.2,4.6,.9,null,'#fff8e6',0);box(1.2,1.8,.1,K.braun,cx,.9,cz+3.1,scene);cyl(.55,.1,K.weiss,cx+2.6,1.7,cz+3.06,scene).rotation.x=Math.PI/2;box(.05,.4,.04,K.schwarz,cx+2.6,1.82,cz+3.14,scene);box(.3,.05,.04,K.schwarz,cx+2.72,1.7,cz+3.14,scene);[-2.6,1].forEach(x=>{if(x<0){box(1.1,.9,.1,K.weiss,cx+x,1.5,cz+3.06,scene);box(.9,.7,.12,K.himmel,cx+x,1.5,cz+3.08,scene)}});kreis(cx,cz+1,4.4);
  box(10,.5,2.4,K.grau,cx,.25,cz+5.6,scene);kreisLinie(cx-5,cz+5.6,cx+5,cz+5.6,.7,2.2);cyl(.1,3.4,K.dunkel,cx+7,1.7,cz+3,scene);sph(.25,K.rot,cx+7,3.3,cz+3,scene);sph(.25,K.gruen,cx+7,2.8,cz+3,scene);
  const zug=[zugLok(scene,K.rot),zugWagen(scene,K.gelb),zugWagen(scene,K.blau),zugWagen(scene,K.gruen)];
  bewegt(zug,t=>{const th=t*.17;zug.forEach((g,i)=>{const a=th-i*.27,p=E(a),q=E(a+.05);g.position.set(p.x,0,p.z);g.rotation.y=Math.atan2(-(q.z-p.z),q.x-p.x)});zug[0].userData.anim(t)},cx,cz,120);
  bank(cx-10,cz+8,Math.PI);bank(cx+12,cz+8,Math.PI);laterne(cx-14,cz+5);laterne(cx+15,cz+5);eimer(cx+9,cz+8);ballons(cx-16,0,cz+9,5,2.2,5);
  beet(cx+16,cz+10,3,10);
  wegweiser(cx-4,cz+22,'Bahnhof',0)})();
/* ---------- 20. Wilde Maus (Holzachterbahn für Kinder, Achter-Form) ---------- */
(function(){const b=ZN('Wilde Maus'),cx=b.x,cz=b.z;scheibe(cx,cz,22,0xc8b88b,.1);zugang(b,35);
  gleis(a=>({x:cx+17*Math.sin(a),z:cz+10*Math.sin(2*a),y:4.6+2.2*Math.cos(a)+.7*Math.sin(3*a)}),80,K.holz,K.orange,K.holz,[K.gruen,K.gelb,K.tuerkis,K.gruen],true,.03,.03,cx,cz);
  bude(cx-12,cz-17,0,5,K.gruen,K.weiss,'Wilde Maus');
  const m=grp(cx+10,0,cz-17);sph(1.2,K.grau,0,1.2,0,m,1,1,1.3);sph(.7,K.grau,0,1.8,1.5,m);[-1,1].forEach(s=>sph(.4,K.rosa,s*.55,2.4,1.3,m,1,1,.4));sph(.18,K.rosa,0,1.8,2.1,m);cyl(.1,1.6,K.rosa,0,.6,-1.6,m).rotation.x=1.2;box(2,1.2,2,K.gelb,2.6,.6,-.8,m);kreis(cx+10,cz-17,2);kreis(cx+12.6,cz-17.8,1.4);
  bank(cx-4,cz+17,Math.PI);laterne(cx+16,cz+12);laterne(cx-17,cz+8);ballons(cx+17,0,cz-12,6,2.4,2);eimer(cx+4,cz+17);
  beet(cx-18,cz-8,3,10);
  wegweiser(cx+4,cz-27,'Wilde Maus',0)})();
/* ---------- 21. Mini-Karussell (Kinderkarussell) ---------- */
(function(){const b=ZN('Mini-Karussell'),cx=b.x,cz=b.z;scheibe(cx,cz,14,0xccb379,.1);zugang(b,35);zaun(cx,cz,12.5,48,-Math.PI/2);
  cyl(4.6,.5,K.rosa,cx,.25,cz,scene,true);kreis(cx,cz,4.8);
  const kg=grp(cx,0,cz);cyl(4,.2,K.gelb,0,.6,0,kg);cyl(.5,3.6,K.tuerkis,0,2.4,0,kg,true);cone(4.4,1.8,K.lila,0,5.1,0,kg,true);cyl(4.4,.4,K.gelb,0,4.1,0,kg);sph(.35,K.rot,0,6.2,0,kg);
  const fz=[0,1,2,3,4,5,6,7].map(i=>{const a=i/8*6.283,g=grp(Math.cos(a)*2.7,.9,Math.sin(a)*2.7,kg);g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));fahrzeug(g,i%5);return g});
  bewegt(kg,t=>{kg.rotation.y=t*.3;fz.forEach((g,i)=>{g.position.y=.9+Math.sin(t*1.4+i*1.3)*.12;if(g.userData.rot)g.userData.rot.rotation.y=t*8})},cx,cz,100);
  bude(cx+1,cz+9,Math.PI,4.6,K.rosa,K.weiss,'Mini-Karussell');[0,1,2].forEach(i=>teddy(scene,cx-8+i*1.4,0,cz-9,[K.braun,K.rosa,K.gelb][i],.8));
  bank(cx-9,cz+4,Math.PI/2+.4);bank(cx+9,cz+4,-Math.PI/2-.4);ballons(cx+9,0,cz-6,6,2.4,5);ballons(cx-9,0,cz-4,5,2.2,6);eimer(cx+6,cz+10);laterne(cx-6,cz+10);
  beet(cx+9,cz+9,3,10);
  wegweiser(cx+4,cz-16,'Mini-Karussell',0)})();
/* ---------- 22. Happy Sailor (Schiffs-Karussell) ---------- */
(function(){const b=ZN('Happy Sailor'),cx=b.x,cz=b.z;scheibe(cx,cz,18,0xbfc4b7,.1);zugang(b,-35);
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
(function(){const b=ZN('Panoramarad'),cx=b.x,cz=b.z,R=9.5,H=13;scheibe(cx,cz,20,0xb8a8ae,.1);zugang(b,-35);
  [-1,1].forEach(s=>{[-1.6,1.6].forEach(zz=>stab(scene,cx+s*6,0,cz+zz,cx,H,cz+zz*.7,.6,K.rosa,null,true));kreis(cx+s*6,cz,1.2);kreis(cx+s*3.5,cz,1.1)});
  [-1.6,1.6].forEach(zz=>box(8,.35,.35,K.rosa,cx,4,cz+zz,scene));cyl(.5,4.6,K.grau,cx,H,cz,scene).rotation.x=Math.PI/2;
  const rad=grp(cx,H,cz);[-.9,.9].forEach(z=>{const t=new THREE.Mesh(new THREE.TorusGeometry(R,.3,6,36),mat(K.lila));t.position.z=z;rad.add(t);for(let k=0;k<4;k++){const sp=box(R*2,.18,.18,K.gelb,0,0,z,rad);sp.rotation.z=k*Math.PI/4}});
  cyl(.9,2.2,K.gold,0,0,0,rad).rotation.x=Math.PI/2;
  const ka=[];for(let i=0;i<8;i++){const a=i/8*6.283,g=grp(Math.cos(a)*R,Math.sin(a)*R,0,rad);box(2.1,1.5,1.7,BUNT[i],0,-1.7,0,g,true);[-1,1].forEach(q=>{box(.9,.7,.05,K.himmel,q*.5,-1.55,.88,g);box(.9,.7,.05,K.himmel,q*.5,-1.55,-.88,g)});box(2.4,.2,2,K.weiss,0,-.85,0,g);cyl(.08,.7,K.dunkel,0,-.45,0,g);ka.push(g)}
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
(function(){const b=ZN('Freifallturm'),cx=b.x,cz=b.z,H=32;scheibe(cx,cz,14,0xc5b5b7,.1);zugang(b,-100);cyl(4,.6,K.lila,cx,.3,cz,scene,true);for(let i=0;i<4;i++)cyl(1.3,H/4,[K.rot,K.gelb,K.blau,K.gruen][i],cx,H/8+i*H/4,cz,scene,true);cone(1.8,3,K.rot,cx,H+1.5,cz,scene);sph(.4,K.gold,cx,H+3.2,cz,scene);kreis(cx,cz,4.5);
  for(let i=0;i<8;i++){const a=i/8*6.283;lampe(cx+Math.cos(a)*1.5,H,cz+Math.sin(a)*1.5,LART[i%4])}
  const g=grp(cx,5,cz);cyl(2.3,.7,K.orange,0,0,0,g,true);for(let i=0;i<4;i++){const a=i*1.571;box(.9,.3,.9,BUNT[i],Math.cos(a)*2.9,-.5,Math.sin(a)*2.9,g);sph(.3,HAUT[i],Math.cos(a)*2.9,.1,Math.sin(a)*2.9,g)}
  bewegt(g,t=>{g.position.y=4+(H-9)*(.5-.5*Math.cos(t*.22))},cx,cz,220);
  bude(cx+8,cz+8,.4,4.4,K.rot,K.weiss,'Freifallturm');bank(cx-8,cz+7,Math.PI);ballons(cx-9,0,cz-4,5,2.2,4);
  wegweiser(cx+4,cz+16,'Freifallturm',0)})();
/* ---------- 26. Aussichtsturm mit Fernrohr ---------- */
(function(){const b=ZN('Aussichtsturm'),cx=b.x,cz=b.z,H=24;scheibe(cx,cz,14,0xc3c69e,.1);zugang(b,35);
  [-1,1].forEach(sx=>[-1,1].forEach(sz=>{stab(scene,cx+sx*4.5,0,cz+sz*4.5,cx+sx*2.2,H,cz+sz*2.2,.7,K.weiss,null,true);kreis(cx+sx*4.5,cz+sz*4.5,.9)}));
  [6,12,18].forEach(h=>{const o=4.5-2.3*h/H;[-1,1].forEach(q=>{box(2*o,.25,.25,K.holz,cx,h,cz+q*o,scene);box(.25,.25,2*o,K.holz,cx+q*o,h,cz,scene)})});
  box(6.6,.4,6.6,K.rot,cx,H,cz,scene,true);[-1,1].forEach(q=>{box(6.6,.9,.12,K.weiss,cx,H+.65,cz+q*3.3,scene);box(.12,.9,6.6,K.weiss,cx+q*3.3,H+.65,cz,scene);[-1,1].forEach(r=>cyl(.1,3.3,K.holz,cx+q*3.2,H+1.8,cz+r*3.2,scene))});cone(5.2,2.2,K.gelb,cx,H+4.4,cz,scene);
  const fr=grp(cx+1.6,H+.2,cz+1.8);cyl(.05,1,K.grau,-.3,.5,0,fr);cyl(.05,1,K.grau,.3,.5,.2,fr);cyl(.15,1.4,K.dunkel,0,1.1,0,fr).rotation.z=1.2;bewegt(fr,t=>{fr.rotation.y=Math.sin(t*.4)*1.2},cx,cz,160);
  const lf=grp(cx,0,cz);box(1.1,1.4,1.1,K.gelb,0,.7,0,lf,true);bewegt(lf,t=>{lf.position.y=1+(H-2.6)*(.5-.5*Math.cos(t*.3))},cx,cz,160);
  bude(cx+8,cz+8,.4,4.4,K.blau,K.weiss,'Aussichtsturm');bank(cx-9,cz+7,Math.PI);ballons(cx-10,0,cz-3,5,2.2,6);
  wegweiser(cx+4,cz+16,'Aussichtsturm',0)})();
/* ---------- 27. Geisterbahn (freundlich) ---------- */
(function(){const b=ZN('Geisterbahn'),cx=b.x,cz=b.z;scheibe(cx,cz,20,0xc0b5b3,.1);zugang(b,-100);const hz=cz-4;
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
  const sw=[K.weiss,K.rosa,K.gelb].map((c,i)=>{const g=grp(0,0,0,scene);sph(.9,c,0,.5,0,g,1.3,.6,.8);cyl(.15,1.1,c,.9,1.1,0,g);sph(.28,c,.9,1.8,0,g);[-1,1].forEach(q=>{sph(.06,K.schwarz,1.02,1.9,q*.2,g)});cone(.1,.3,K.orange,1.25,1.75,0,g).rotation.z=-Math.PI/2;box(.8,.3,.8,K.blau,-.4,1,0,g);sph(.25,HAUT[i],-.4,1.4,0,g);return g});
  bewegt(sw,t=>{sw.forEach((g,i)=>{const a=-t*.17+i*2.09,r=9.7+Math.sin(t*.5+i)*.7;g.position.set(cx+Math.cos(a)*r,.1+Math.sin(t*2+i)*.05,cz+Math.sin(a)*r);g.rotation.y=Math.atan2(Math.cos(a),Math.sin(a))})},cx,cz,100);
  schild('Tretboote',cx+4,2.4,cz+13.3,3.2,.7,null,'#fff8e6',0);})();
/* ---------- 29. Kletterpark mit Trampolinen ---------- */
(function(){const b=ZN('Kletterpark'),cx=b.x,cz=b.z;scheibe(cx,cz,18,0xc8bd8b,.1);zugang(b,35);
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
(function(){const b=ZN('Wasserspiel'),cx=b.x,cz=b.z;scheibe(cx,cz,20,0xacbdb4,.1);zugang(b,35);
  wasserFl(cx-4,cz+4,7,WASSER);wasserFl(cx-4,cz+4,5,0x6ec0ea,.02);for(let i=0;i<16;i++){const a=i/16*6.283;felsen(cx-4+Math.cos(a)*7.6,cz+4+Math.sin(a)*7.6,.45+rnd()*.3)}kreis(cx-4,cz+4,7.6);
  const kd=[0,1,2].map(i=>{const g=grp(0,0,0,scene);cyl(.3,.7,BUNT[i*3],0,.5,0,g);sph(.35,HAUT[i],0,1.1,0,g);gesicht(g,0,1.1,0,.35,0);return g});bewegt(kd,t=>{kd.forEach((g,i)=>{const a=t*.4+i*2.1;g.position.set(cx-4+Math.cos(a)*3.5,.1+Math.abs(Math.sin(t*2+i))*.4,cz+4+Math.sin(a)*3.5)})},cx,cz,80);
  const px=cx+9,pz=cz-6;cyl(.3,3.4,K.weiss,px,1.7,pz,scene,true);cone(3,1.2,K.rosa,px,3.9,pz,scene,true);kreis(px,pz,.8);const pg=grp(px,0,pz),pt=[0,1,2,3,4,5,6,7].map(i=>sph(.24,0xe8f8ff,0,0,0,pg));bewegt(pg,t=>{pt.forEach((p,i)=>{const f=(t*.7+i/8)%1,a=i*.785;p.position.set(Math.cos(a)*2.6,3.5-f*3.3,Math.sin(a)*2.6)})},px,pz,80);
  fontaene(cx-9,cz-9,2.6,5,0);fontaene(cx-3,cz-11,3.2,5,.3);fontaene(cx+3,cz-12,2.6,5,.6);[[-9,-9],[-3,-11],[3,-12]].forEach(p=>scheibe(cx+p[0],cz+p[1],1.3,K.tuerkis,.14));
  const wx=cx-13,wz=cz+12,wr=grp(wx,3,wz);[-1,1].forEach(s=>cyl(.15,3.2,K.holz,wx,1.6,wz+s*1,scene,true));wr.add(new THREE.Mesh(new THREE.TorusGeometry(2.4,.15,5,18),mat(K.holz)));for(let k=0;k<2;k++)box(4.8,.15,.15,K.holz,0,0,0,wr).rotation.z=k*.785;for(let k=0;k<8;k++){const a=k/8*6.283;box(.9,.2,1.2,K.blau,Math.cos(a)*2.5,Math.sin(a)*2.5,0,wr).rotation.z=a+1.57}
  bewegt(wr,t=>{wr.rotation.z=-t*.6},wx,wz,90);wasserFl(wx,wz+.2,1.8,WASSER);kreis(wx,wz,1.8);
  bude(cx+5,cz+13,.3,4.6,K.tuerkis,K.weiss,'Wasserspiel');bank(cx+11,cz+6,-Math.PI/2);laterne(cx+14,cz-2);laterne(cx-13,cz-4);ballons(cx+13,0,cz+10,5,2.2,5);
  wegweiser(cx+4,cz-22,'Wasserspiel',0)})();
/* ---------- 31. Delfinshow ---------- */
(function(){const b=ZN('Delfinshow'),cx=b.x,cz=b.z,px=cx-4;scheibe(cx,cz,24,0xb2b9b0,.1);zugang(b,-35,b.x);
  box(22,.5,13,0x2f86cf,px,.38,cz,scene);box(21,.05,12,0x57b4ee,px,.66,cz,scene);[[0,-6.8,23,.5],[0,6.8,23,.5]].forEach(q=>box(q[2],.8,q[3],K.weiss,px+q[0],.4,cz+q[1],scene));[-1,1].forEach(q=>box(.5,.8,13.6,K.weiss,px+q*11.2,.4,cz,scene));
  kreisLinie(px-11,cz-6.8,px+11,cz-6.8,1.1,2.4);kreisLinie(px-11,cz+6.8,px+11,cz+6.8,1.1,2.4);kreisLinie(px-11.2,cz-6,px-11.2,cz+6,1.1,2.4);
  for(let k=0;k<4;k++){const c=k%2?K.blau:K.weiss;box(1.6,.7*(k+1),15,c,cx+8.5+k*1.6,.35*(k+1),cz,scene,true);for(let j=0;j<6;j++){const z=cz-6+j*2.4,y=.7*(k+1);sph(.38,BUNT[(j+k*2)%8],cx+8.5+k*1.6,y+.5,z,scene);sph(.3,HAUT[(j+k)%4],cx+8.5+k*1.6,y+1.1,z,scene);gesicht(scene,cx+8.5+k*1.6,y+1.1,z,.3,-Math.PI/2)}}
  [8,11.2,14.4].forEach(x=>kreisLinie(cx+x,cz-7,cx+x,cz+7,1.6,2.6));
  const hx=px-2;[-1,1].forEach(q=>{cyl(.12,5,K.holz,hx,2.5,cz+q*3.2,scene)});const ho=new THREE.Mesh(new THREE.TorusGeometry(1.4,.15,6,16),mat(K.rot));ho.rotation.y=Math.PI/2;ho.position.set(hx,3.3,cz);scene.add(ho);box(.2,.2,6.6,K.holz,hx,5.1,cz,scene);
  const dl=[0,1,2].map(i=>delfin(scene)),ball=sph(.7,K.rot,0,.8,0,scene);
  bewegt(dl.concat([ball]),t=>{dl.forEach((g,i)=>{const u=(t*.17+i*.34)%1,f=u/.35;if(u>.35){g.visible=false;return}g.visible=true;g.position.set(px-9+f*14,-.8+16.8*f*(1-f),cz+(i-1)*1.6);g.rotation.z=Math.atan2(16.8*(1-2*f),14)});ball.position.set(px-8,.9+Math.sin(t*1.6)*.15,cz+3.5)},cx,cz,100);
  schild('Delfinshow',px-14,4.4,cz,6,1.2,null,'#fff8e6',Math.PI/2);
  bude(cx+4,cz-17,0,4.6,K.blau,K.weiss,'Tickets');laterne(cx+12,cz+14);laterne(cx-14,cz+14);ballons(cx+16,0,cz+14,5,2.2,2);eimer(cx+6,cz+16);
  wegweiser(cx+2,cz-27,'Delfinshow',0)})();
/* ---------- 32. Souvenirs, Info und Toiletten ---------- */
(function(){const s=ZN('Souvenirs'),t=ZN('Toiletten');scheibe(s.x,s.z,11,FARBEN.platz,.1);scheibe(t.x,t.z,9,FARBEN.platz,.1);quer(s);quer(t);
  box(8,3.4,4.6,K.gelb,s.x-1.5,1.7,s.z-1,scene,true);const r=box(9,.3,5.6,K.rot,s.x-1.5,3.95,s.z-1,scene);r.rotation.x=.12;[-1,1].forEach(q=>box(.2,1.6,4.4,K.himmel,s.x-1.5+q*4.05,2,s.z-1,scene));schild('Souvenirs',s.x-1.5,5.2,s.z+1.4,5,1,null,'#fff8e6',0);box(2.2,2.4,.2,K.braun,s.x-1.5,1.2,s.z+1.35,scene);box(.15,.15,.15,K.gold,s.x-.7,1.2,s.z+1.5,scene);[-3.2,2.2].forEach(x=>{box(1.9,1.7,.15,K.weiss,s.x-1.5+x,2,s.z+1.33,scene);box(1.6,1.4,.2,K.himmel,s.x-1.5+x,2,s.z+1.38,scene)});kreis(s.x-1.5,s.z-1,4.4);
  [-2.5,2.5].forEach(x=>{box(1.5,1.3,.12,K.weiss,s.x-1.5+x,2,s.z-3.32,scene);box(1.3,1.1,.14,K.himmel,s.x-1.5+x,2,s.z-3.34,scene)});box(2.4,.8,1.2,K.holz,s.x-8,.4,s.z+2,scene);for(let i=0;i<3;i++)teddy(scene,s.x-8.8+i*.9,.8,s.z+2,[K.braun,K.rosa,K.gelb][i],.7);kreis(s.x-8,s.z+2,1.4);
  box(3.2,2.8,2.8,K.tuerkis,s.x+6,1.4,s.z+3,scene,true);box(3.6,.3,3.2,K.weiss,s.x+6,3,s.z+3,scene);schild('Info',s.x+6,3.8,s.z+4.5,2,.7,null,'#fff8e6',0);kreis(s.x+6,s.z+3,2.2);
  
  laterne(s.x-9,s.z-7);eimer(s.x+2,s.z+7);
  box(6.4,3,3.2,K.blau,t.x,1.5,t.z-1,scene,true);box(7,.3,3.8,K.weiss,t.x,3.1,t.z-1,scene);[[-1.6,K.rosa,'Damen'],[1.6,K.gelb,'Herren']].forEach(p=>{box(1.4,2.2,.2,p[1],t.x+p[0],1.1,t.z+.65,scene);box(.15,.15,.15,K.gold,t.x+p[0]+.5,1.1,t.z+.8,scene);schild(p[2],t.x+p[0],2.6,t.z+.78,1.4,.4,28,'#fff8e6',0)});[-1.8,1.8].forEach(x=>{box(1.2,.8,.12,K.weiss,t.x+x,2.1,t.z-2.62,scene);box(1,.6,.14,K.himmel,t.x+x,2.1,t.z-2.64,scene)});schild('Toiletten',t.x,4.1,t.z+.7,4,.9,null,'#fff8e6',0);kreis(t.x,t.z-1,3.6);eimer(t.x+5,t.z+3);laterne(t.x-6,t.z+3);
  wegweiser(s.x+4,s.z+13,'Souvenirs',0);wegweiser(t.x-4,t.z+11,'Toiletten',0)})();
/* ---------- 33. Parkplatz und Bushaltestelle ---------- */
(function(){const p=ZN('Parkplatz'),h=ZN('Bushaltestelle'),lx=p.x,lz=p.z;scheibe(lx,lz,27,0x9aa0a6,.05);scheibe(h.x,h.z,9,0xb2b2a4,.05);
  box(44,.1,30,0x5d6672,lx,.1,lz,scene);box(70,.1,8,0x5d6672,0,.1,167,scene);
  [-1,1].forEach(q=>{for(let i=0;i<=9;i++)box(.15,.12,4.4,K.weiss,lx-22+i*4.4,.16,lz+q*9,scene);for(let i=0;i<9;i++)if(rnd()<.72)auto(lx-19.8+i*4.4,lz+q*9,0,BUNT[(i*3+(q>0?1:0))%8])});
  box(6,.2,3.2,K.blau,h.x+2,3.4,h.z+8,scene);[-1,1].forEach(q=>cyl(.1,3.3,K.dunkel,h.x+2+q*2.6,1.7,h.z+8+1.3,scene));box(5.6,2.4,.12,K.himmel,h.x+2,1.9,h.z+6.8,scene);[-1,1].forEach(q=>{box(.12,2.4,1.5,K.himmel,h.x+2+q*2.75,1.9,h.z+7.5,scene);cyl(.1,3.3,K.dunkel,h.x+2+q*2.6,1.7,h.z+6.8,scene)});box(.9,1.2,.05,K.weiss,h.x+2,1.9,h.z+6.7,scene);bank(h.x+2,h.z+7.6,Math.PI);kreis(h.x+2,h.z+7.6,1.6);
  cyl(.07,3.4,K.dunkel,h.x+8,1.7,h.z+8,scene,true);const bs=schildText('Bus','#fff0b0',1.4,1.4,60);bs.position.set(h.x+8,3.7,h.z+8.1);scene.add(bs);schild('Bushaltestelle',h.x+2,4.5,h.z+9.4,4.4,.8,null,'#fff8e6',0);
  const bus=grp(0,0,166);box(7,2.2,2.6,K.gelb,0,1.7,0,bus,true);box(6.4,.8,2.65,K.himmel,0,2.3,0,bus);box(7,.2,2.7,K.weiss,0,2.9,0,bus);[-2.2,2.2].forEach(x=>{cyl(.55,2.8,K.schwarz,x,.55,0,bus).rotation.x=Math.PI/2});[-.8,.8].forEach(q=>{sph(.2,0xfff2a0,3.5,1.2,q,bus);box(.1,.3,.1,K.dunkel,3.4,2.5,q*1.45,bus)});box(.08,1.1,2.3,K.himmel,3.52,2.15,0,bus);box(.08,1.1,2.3,K.himmel,-3.52,2.15,0,bus);[-.8,.8].forEach(q=>sph(.18,0xff4a3a,-3.5,1.2,q,bus));box(.3,.25,2.6,K.grau,-3.55,.5,0,bus);box(1.2,1.8,.08,K.blau,1.8,1.5,1.32,bus);box(6.9,.18,2.7,K.rot,0,1.3,0,bus);box(.3,.25,2.6,K.grau,3.55,.5,0,bus);[-2.2,2.2].forEach(x=>cyl(.3,2.9,K.grau,x,.55,0,bus).rotation.x=Math.PI/2);
  bewegt(bus,t=>{const x=48*Math.sin(t*.1),v=Math.cos(t*.1);bus.position.x=x;bus.rotation.y=v>0?0:Math.PI},0,160,100);
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
/* ---------- Wildwasserbahn ---------- */
(function(){const b=ZN('Wildwasserbahn'),cx=b.x,cz=b.z,PI=Math.PI,R=8.6,N=40;scheibe(cx,cz,b.r,FARBEN.platz,.1);zugang(b,-35);zaun(cx,cz,17,50,PI);
const dif=a=>((a+PI)%(2*PI)+2*PI)%(2*PI)-PI,hh=a=>{const d=dif(a);return .45+(Math.abs(d)<1.12?5.2*Math.cos(d*1.4):0)},P=a=>({x:cx+R*Math.cos(a),y:hh(a),z:cz+R*Math.sin(a)}),face=(x,z)=>Math.atan2(cx-x,cz-z);
function palme(x,z,h,sc){const g=grp(x,0,z);cyl(.22*sc,h,K.holz,0,h/2,0,g,true);for(let k=0;k<7;k++){const pv=grp(0,h,0,g);pv.rotation.y=k*.9;const lf=box(.7*sc,.08,3.2*sc,k%2?0x3f9a46:0x4caf6a,0,-.1,1.5*sc,pv);lf.rotation.x=.45}
  sph(.2*sc,0x6a4a2a,.25*sc,h-.35,.15*sc,g);sph(.2*sc,0x6a4a2a,-.2*sc,h-.35,-.2*sc,g);kreis(x,z,.5);return g}
function fall(x,y,z,w,h){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,.25),new THREE.MeshLambertMaterial({color:0x9fdcff,transparent:true,opacity:.6}));m.position.set(x,y,z);scene.add(m);return m}
function sign2(text,x,y,z,w,h,rot){const px=Math.cos(rot)*(w/2-.12),pz=-Math.sin(rot)*(w/2-.12);[-1,1].forEach(s=>{cyl(.09,y+h/2,K.holz,x+s*px,(y+h/2)/2,z+s*pz,scene,true);kreis(x+s*px,z+s*pz,.3)});
  schild(text,x,y,z,w,h,null,'#fff8e6',rot);schild(text,x-.06*Math.sin(rot),y,z-.06*Math.cos(rot),w,h,null,'#fff8e6',rot+PI)}
/* Kanal als Ringkurs mit Lift-Huegel */
for(let i=0;i<N;i++){const a0=i/N*2*PI,a1=(i+1)/N*2*PI,p=P(a0),q=P(a1);stab(scene,p.x,p.y,p.z,q.x,q.y,q.z,3.4,WASSER,.3);
  [-1,1].forEach(s=>{const r=R+s*1.75;stab(scene,cx+r*Math.cos(a0),p.y+.4,cz+r*Math.sin(a0),cx+r*Math.cos(a1),q.y+.4,cz+r*Math.sin(a1),.3,0xd9c9a0,.9)});
  if(p.y>1.3&&i%2===0){cyl(.22,p.y,K.holz,p.x,p.y/2,p.z,scene);kreis(p.x,p.z,.3)}
  if(p.y>1.5){const ro=R+3.4;sph(1.3,0x9aa0a6,cx+ro*Math.cos(a0),p.y*.5,cz+ro*Math.sin(a0),scene,1,Math.max(.7,p.y/2.6),1)}}
sperrRing(cx,cz,12.6,56);
/* Insel mit Felsen, Wasserfall, Palmen */
sph(4.6,0x8d949a,cx,1.6,cz,scene,1.25,.8,1.25).castShadow=true;sph(1.2,0x8d949a,cx,3.6,cz+4.9,scene,2,.5,1);sph(1.3,0x9aa0a6,cx-3,.7,cz-4,scene,1.3,.7,1);sph(1,0x9aa0a6,cx+3.5,.6,cz-3.5,scene,1.2,.7,1);
wasserFl(cx,cz+5.6,1.5,WASSER,.05);const f1=fall(cx,1.95,cz+5.6,2.4,3.3),f2=fall(cx+2.9,1.3,cz+5.2,1.2,2.2),f3=fall(cx-2.9,1.3,cz+5.2,1.2,2.2);
bewegt([f1,f2,f3],t=>{f1.material.opacity=.5+.15*Math.sin(t*5);f2.material.opacity=.5+.15*Math.sin(t*5+1);f3.material.opacity=.5+.15*Math.sin(t*5+2)},cx,cz,100);
palme(cx-2,cz-2.5,4.6,1);palme(cx+1.5,cz-3,3.8,.9);palme(cx-3.5,cz+1,3.4,.8);
[[1.5,2,.5],[-1.2,.6,.45],[2.5,-1,.4]].forEach((p,i)=>beet(cx+p[0]*1.3,cz+p[1]*2,1.5,5));
/* Spritzer am Fall */
[1.1,-1.1].forEach((a,i)=>fontaene(cx+10.9*Math.cos(a),cz+10.9*Math.sin(a),2.2,3,i*.4));
/* Boote */
const boote=[0,1,2,3].map(i=>{const g=grp(0,0,0,scene);g.rotation.order='YXZ';cyl(.7,3.4,i%2?0x9a6a3a:0x8a5a32,0,0,0,g,true).rotation.x=PI/2;teddy(g,0,.25,-.2,BUNT[(i*2+1)%8],.9);return g});
bewegt(boote,t=>{boote.forEach((g,i)=>{const a=t*.28+i*PI/2,p=P(a),q=P(a+.04);g.position.set(p.x,p.y+.5,p.z);g.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);g.rotation.x=-Math.atan2(q.y-p.y,Math.hypot(q.x-p.x,q.z-p.z))})},cx,cz,100);
/* Einstiegs-Station mit Dach */
const st=grp(cx-R,0,cz);[[-2.5,-3],[2.5,-3],[-2.5,3],[2.5,3]].forEach(p=>cyl(.14,3.4,K.holz,p[0],1.7,p[1],st,true));[-1,1].forEach(s=>{const r=box(3.6,.2,7.8,s<0?K.rot:K.gelb,s*1.6,3.65,0,st);r.rotation.z=-s*.33});
box(1.7,.5,6.4,K.holz,-3.1,.25,0,st,true);[-3,0,3].forEach(z=>cyl(.1,1,K.braun,-3.9,.9,z,st));box(.08,.08,6,K.dunkel,-3.9,1.4,0,st);
girlande(cx-R-2.5,3.2,cz-3,cx-R-2.5,3.2,cz+3,7,.4);girlande(cx-R+2.5,3.2,cz-3,cx-R+2.5,3.2,cz+3,7,.4);wimpel(cx-R-2.5,3.1,cz-3,cx-R+2.5,3.1,cz-3,6,.3);
/* Warteschlange mit Seilen und Baerchen */
[0,1,2,3].forEach(k=>{cyl(.06,1,K.dunkel,cx-13.6,.5,cz+3+k*1.3,scene);sph(.1,K.gold,cx-13.6,1.05,cz+3+k*1.3,scene)});[0,1,2].forEach(k=>stab(scene,cx-13.6,.9,cz+3+k*1.3,cx-13.6,.9,cz+4.3+k*1.3,.04,0xb02030,.04));
teddy(scene,cx-12.8,0,cz+3.7,K.orange,.9);teddy(scene,cx-12.8,0,cz+5,K.rosa,.9);teddy(scene,cx-12.8,0,cz+6.3,K.gelb,.9);
/* Kasse, Poncho-Stand, Schilder */
bude(cx-12.8,cz+10,face(cx-12.8,cz+10),4,K.rot,K.weiss,'Kasse');bude(cx-6.5,cz-14.3,face(cx-6.5,cz-14.3),4.2,K.gelb,K.weiss,'Regenponcho');
[-1,1].forEach(s=>{cyl(.06,2.6,K.holz,cx-1.8+s*1.9,1.3,cz-15,scene,true);kreis(cx-1.8+s*1.9,cz-15,.3)});box(4,.08,.08,K.dunkel,cx-1.8,2.5,cz-15,scene);for(let k=0;k<6;k++)cone(.5,1.1,BUNT[k],cx-3+k*.65,1.9,cz-15,scene);
sign2('Wildwasserbahn',cx-15.4,3.6,cz-5.4,5.6,1.1,-PI/2);schild('Einstieg',cx-R-2.45,2.5,cz+3.1,1.8,.6,null,'#fff8e6',PI);
/* Ausstattung */
bank(cx-12,cz-9,PI/2);bank(cx+13,cz+7,-PI/2);bank(cx+14,cz-6,-PI/2);laterne(cx-13,cz-4);laterne(cx-12,cz+13);laterne(cx+13.5,cz+1);laterne(cx+9,cz-12);kuebel(cx-14.5,cz+1);kuebel(cx-14.5,cz-1.8);eimer(cx-10,cz+12);eimer(cx+11,cz+10);
ballons(cx+14.5,0,cz-1.5,6,2.4,3);ballons(cx-9,0,cz+12.5,5,2.2,1);palme(cx+14,cz+11,4.8,1);palme(cx+10,cz-14,4.2,.9);palme(cx-14.5,cz+13,4.4,.9);
const bu=[];for(let i=0;i<24;i++){const a=i/24*2*PI;if(Math.abs(dif(a-PI))<.55)continue;bu.push([cx+15.6*Math.cos(a),.7,cz+15.6*Math.sin(a),1.3,1,1.3])}
for(let i=0;i<16;i++){const a=rnd()*2*PI;bu.push([cx+13.6*Math.cos(a),.45,cz+13.6*Math.sin(a),.8,.7,.8])}instanz(scene,gSph,0x4aa84e,bu);
[[13,-10],[-8,12],[0,15],[-6,-15],[12,12]].forEach(p=>beet(cx+p[0],cz+p[1],1.8,7))})();
/* ---------- Dino-Park ---------- */
(function(){const b=ZN('Dino-Park'),cx=b.x,cz=b.z,PI=Math.PI;scheibe(cx,cz,b.r,0xcfe0a8,.1);zugang(b,35);zaun(cx,cz,21,60,PI);
const fz=(x,z,tx,tz)=>Math.atan2(-(tz-z),tx-x),face=(x,z)=>Math.atan2(cx-x,cz-z),dif=a=>((a+PI)%(2*PI)+2*PI)%(2*PI)-PI;
function auge(par,x,y,z,r){const s=z>0?1:-1;sph(r,0xffffff,x,y,z,par);sph(r*.55,0x222222,x+r*.4,y,z+s*r*.8,par)}
function dk(x,z,rot,offs,r){offs.forEach(o=>kreis(x+Math.cos(rot)*o,z-Math.sin(rot)*o,r))}
function palme(x,z,h,sc,n){const g=grp(x,0,z);cyl(.25*sc,h,0x7a5230,0,h/2,0,g,true);for(let k=0;k<(n||7);k++){const pv=grp(0,h,0,g);pv.rotation.y=k*(6.28/(n||7));const lf=box(.6*sc,.08,3*sc,k%2?0x3f9a46:0x5cba5c,0,-.05,1.4*sc,pv);lf.rotation.x=.4}kreis(x,z,.6);return g}
function info(x,z,text){const r=face(x,z);cyl(.06,1.7,K.holz,x,.85,z,scene,true);schild(text,x,1.9,z,2.6,.7,null,'#fff8e6',r);schild(text,x-.05*Math.sin(r),1.9,z-.05*Math.cos(r),2.6,.7,null,'#fff8e6',r+PI);kreis(x,z,.3)}
function spots(g,y0,rx,ry,rz,l,col,r){l.forEach(p=>sph(r,col,p[0],y0+ry*Math.sqrt(Math.max(.05,1-(p[0]/rx)*(p[0]/rx)-(p[1]/rz)*(p[1]/rz))),p[1],g))}
/* Langhals-Dino (Brachiosaurus), ca. 9 m hoch */
function dinoLang(par,x,z,rot){const g=grp(x,0,z,par),c=0x6fb58a;g.rotation.y=rot;sph(2,c,0,3.5,0,g,1.8,.95,1).castShadow=true;sph(1.5,0xa5d8b0,.3,3.1,0,g,1.8,.7,.85);
  [[-1.9,1.3],[-1.9,-1.3],[1.9,1.3],[1.9,-1.3]].forEach(p=>{cyl(.6,3,c,p[0],1.5,p[1],g);sph(.7,0x4f9a70,p[0]+.15,.2,p[1],g,1.3,.4,1)});
  for(let i=0;i<6;i++){const f=i/5;sph(.95-.3*f,c,3.2+f*2.1,4.4+f*4.1,0,g)}for(let i=0;i<6;i++){const f=i/5;sph(1.1-.7*f,c,-3.4-f*4.2,3.3-f*2.3,0,g)}spots(g,3.5,3.6,1.9,2,[[.5,.9],[-1,-.8],[1.8,-.7],[-2,.7]],0x4f9a70,.35);
  const k=grp(5.8,8.9,0,g);sph(.62,c,0,0,0,k,1.5,.95,.9);[-1,1].forEach(s=>auge(k,.4,.2,s*.47,.15));bewegt(k,t=>{k.rotation.z=Math.sin(t*.8)*.12;k.position.y=8.9+Math.sin(t*.8)*.2},x,z,100);dk(x,z,rot,[-5,-2.7,0,2.7],1.9);return g}
/* Dreihorn */
function dinoHorn(par,x,z,rot){const g=grp(x,0,z,par),c=0xd49a5a,w=0xf6f2ea;g.rotation.y=rot;sph(1.8,c,0,2.2,0,g,1.6,.9,.9).castShadow=true;sph(1.4,0xefd09a,.2,1.9,0,g,1.6,.6,.8);
  [[-1.5,1],[-1.5,-1],[1.7,1],[1.7,-1]].forEach(p=>{cyl(.45,1.7,c,p[0],.85,p[1],g);sph(.5,0xb87a45,p[0]+.1,.12,p[1],g,1.2,.4,1)});
  for(let i=0;i<4;i++)sph(.9-.2*i,c,-3-i*.9,1.9-.2*i,0,g);spots(g,2.2,2.9,1.6,1.6,[[-.8,.7],[.6,-.6],[1.5,.5],[-1.8,-.4]],0xb87a45,.3);
  const k=grp(3.2,2.4,0,g);sph(1,c,0,0,0,k,1.2,.9,.9);const fr=cyl(1.5,.25,0xe0605a,-.9,.8,0,k);fr.rotation.z=PI/2+.3;for(let i=0;i<7;i++){const f=-75+i*25,a=f*PI/180;sph(.17,K.gelb,-1.15-Math.cos(a)*.3,.8+1.55*Math.cos(a),1.55*Math.sin(a),k)}
  cone(.18,.8,w,1.15,.35,0,k).rotation.z=-PI/2+.45;[-1,1].forEach(s=>{const h=cone(.14,1,w,.55,.78,s*.4,k);h.rotation.z=-PI/2+.9;h.rotation.x=s*.3});sph(.35,0xefd09a,1.05,-.3,0,k,1,.7,1.1);[-1,1].forEach(s=>auge(k,.5,.25,s*.78,.18));dk(x,z,rot,[-4,-1.8,0,1.9],1.7);return g}
/* Stegosaurus mit Rueckenplatten */
function dinoStego(par,x,z,rot){const g=grp(x,0,z,par),c=0x8bb34a;g.rotation.y=rot;sph(1.5,c,0,2,0,g,2,.85,.8).castShadow=true;
  [[1.7,.85,.65],[1.7,-.85,.65],[-1.6,.9,.8],[-1.6,-.9,.8]].forEach((p,i)=>{cyl(i<2?.4:.5,i<2?1.3:1.6,c,p[0],p[2],p[1],g);box(1,.25,.7,0x6a8a38,p[0]+.25,.12,p[1],g)});[.9,-.9].forEach(s=>sph(.7,c,-1.6,1.5,s,g));
  for(let i=0;i<7;i++){const xx=-2.2+i*.75,yy=2+1.28*Math.sqrt(1-xx*xx/9),s=.5+.5*Math.sin(PI*i/6);const pl=box(s,s*1.15,.14,i%2?K.orange:K.gelb,xx,yy+s*.45,i%2?.2:-.2,g);pl.rotation.z=PI/4}
  const k=grp(3.2,1.4,0,g);sph(.5,c,.25,0,0,k,1.5,.9,.9);sph(.18,0xefd09a,.95,-.12,0,k,1.2,.8,.8);[-1,1].forEach(s=>auge(k,.5,.12,s*.41,.12));
  const sw=grp(-2.9,1.8,0,g);sph(.75,c,-.4,-.05,0,sw,1.4,.9,.9);sph(.5,c,-1.6,-.15,0,sw,1.5,.8,.8);sph(.3,c,-2.6,-.1,0,sw,1.3,.9,.9);[[-1.4,.2],[-1.4,-.2],[-2.2,.15],[-2.2,-.15]].forEach(p=>{const sp=cone(.12,.8,K.gelb,p[0],.5,p[1],sw);sp.rotation.z=.5});
  bewegt(sw,t=>{sw.rotation.y=Math.sin(t*.9)*.25},x,z,100);dk(x,z,rot,[-3,-1,1,3],1.6);return g}
/* kleiner gruener Saurier mit grossen Augen und kurzen Armen */
function dinoRex(par,x,z,rot){const g=grp(x,0,z,par),c=0x4caf6a,bl=0xcfeaa0;g.rotation.y=rot;sph(1.2,c,-.2,2.4,0,g,1.15,1.35,.95).castShadow=true;sph(1,bl,.5,2.1,0,g,.95,1.3,.7);
  [.65,-.65].forEach(s=>{cyl(.38,1.5,c,0,.75,s,g);box(1.2,.25,.7,c,.35,.12,s,g);sph(.6,c,-.1,1.6,s*1.15,g,1,1.1,.8)});for(let i=0;i<4;i++)sph(.9-.17*i,c,-1.5-.9*i,2-.15*i,0,g);
  [[-.7,3.9],[-.1,4],[.5,3.8]].forEach(p=>cone(.22,.6,K.gelb,p[0],p[1],0,g));[.85,-.85].forEach(s=>{const a=cyl(.1,.7,c,1.15,2.25,s,g);a.rotation.z=.67;sph(.14,c,1.35,1.95,s,g)});
  const k=grp(1.3,3.6,0,g);sph(.8,c,.2,0,0,k,1.3,.95,.95);sph(.5,bl,.45,-.35,0,k,1.2,.5,.8);[-1,1].forEach(s=>auge(k,.55,.3,s*.62,.24));bewegt(k,t=>{k.rotation.z=Math.sin(t*1.2)*.1;k.position.y=3.6+Math.sin(t*2.4)*.08},x,z,100);dk(x,z,rot,[-2.5,-.8,.8],1.2);return g}
/* Baby-Dino mit Eierschale */
function dinoBaby(par,x,z,rot){const g=grp(x,0,z,par),c=0xf2d05a;g.rotation.y=rot;sph(.8,0xf6f2ea,0,.4,0,g,1,.6,1);for(let i=0;i<6;i++){const a=i*1.047;cone(.18,.45,0xf6f2ea,Math.cos(a)*.75,.85,Math.sin(a)*.75,g)}
  sph(.55,c,0,.95,0,g,1.2,1,.9);[.35,-.35].forEach(s=>cyl(.12,.5,c,.2,.25,s,g));sph(.25,c,-.7,.8,0,g,1.4,.6,.6);sph(.42,c,.75,1.55,0,g);sph(.12,c,1.15,1.5,0,g);
  [-1,1].forEach(s=>{sph(.14,0xffffff,1.05,1.65,s*.28,g);sph(.08,0x222222,1.14,1.68,s*.36,g);sph(.08,0xf4a0a0,1,1.4,s*.28,g)});kreis(x,z,.9);return g}
/* Dinos setzen */
dinoLang(scene,cx+3,cz-13,0);dinoHorn(scene,cx+8,cz+11,fz(cx+8,cz+11,cx,cz));dinoStego(scene,cx-8,cz-9,fz(cx-8,cz-9,cx,cz));dinoRex(scene,cx+1,cz+14,fz(cx+1,cz+14,cx,cz));
/* Nest mit Eiern und Baby */
const nx=cx+4,nz=cz-6.5;scheibe(nx,nz,2.6,0xd9b96a,.2);zaun(nx,nz,3.4,16,PI/2);for(let i=0;i<4;i++){const a=i*1.57+.5;const e=sph(.55,i%2?0xe8e0c8:0xdcead0,nx+Math.cos(a)*1.5,.75,nz+Math.sin(a)*1.5,scene,1,1.3,1);sph(.12,0x8a9a6a,nx+Math.cos(a)*1.5+.45,.9,nz+Math.sin(a)*1.5+.2,scene)}
dinoBaby(scene,nx,nz,.4);
/* Vulkan mit Dampf */
const vx=cx+14,vz=cz-1;const vk=new THREE.Mesh(new THREE.CylinderGeometry(1.4,5.2,6.4,14),mat(0x7a6a60));vk.position.set(vx,3.2,vz);vk.castShadow=true;scene.add(vk);cyl(1.3,.15,0xff7a30,vx,6.4,vz,scene);kreis(vx,vz,4.8);
[[.8,.3,2.8,1.4],[-.5,.8,-2,2.6],[-.9,-.6,-3.3,-1.8]].forEach(p=>stab(scene,vx+p[0],6.3,vz+p[1],vx+p[2],1.2,vz+p[3],.5,0xff7a30,.12));[[-4.5,3],[4.2,3.5],[1.5,-4.6],[-3.4,-3.8]].forEach(p=>felsen(vx+p[0],vz+p[1],.6+rnd()*.4,scene));
const rch=[0,1,2,3,4].map(i=>sph(.6,i%2?0xd0d0d0:0xb8b8b8,vx,7,vz,scene));bewegt(rch,t=>{rch.forEach((s,i)=>{const f=(t*.2+i/5)%1;s.position.set(vx+f*2.5,6.8+f*6,vz+Math.sin(f*6)*.5);s.scale.setScalar(.5+f*1.5)})},vx,vz,110);
/* Fossilien-Grabung */
const dx=cx-9,dz=cz+9.5,W=0xf6f2ea;scheibe(dx,dz,5.2,0xe6d0a0,.14);zaun(dx,dz,6.4,22,-PI/2);for(let i=0;i<9;i++)sph(.17,W,dx-2.5+i*.55,.35,dz,scene,1,1,1.4);
for(let i=0;i<6;i++)[-1,1].forEach(s=>{const r=cyl(.07,1.3,W,dx-1.5+i*.5,.4,dz+s*.65,scene);r.rotation.x=PI/2+s*.25});sph(.45,W,dx+2.4,.45,dz,scene,1.3,.8,.9);[-1,1].forEach(s=>sph(.1,0x2a2a2a,dx+2.65,.55,dz+s*.33,scene));
[-1,1].forEach(s=>{cyl(.1,1.5,W,dx-.3,.3,dz+s*1.8,scene).rotation.z=PI/2;sph(.2,W,dx-1.05,.3,dz+s*1.8,scene);sph(.2,W,dx+.45,.3,dz+s*1.8,scene)});for(let i=0;i<5;i++)sph(.15-.02*i,W,dx-3-i*.4,.3,dz,scene);
[[-3.8,-3.8],[3.8,-3.8],[-3.8,3.8],[3.8,3.8]].forEach(p=>{cyl(.12,3.1,K.holz,dx+p[0],1.55,dz+p[1],scene,true);kreis(dx+p[0],dz+p[1],.3)});const dach=box(8.6,.12,8.6,0xf0e6c8,dx,3.15,dz,scene);dach.rotation.x=.08;box(8.6,.15,.15,K.holz,dx,3.05,dz+3.8,scene);box(8.6,.15,.15,K.holz,dx,3.05,dz-3.8,scene);
for(let k=-1;k<=1;k++){stab(scene,dx-3,.25,dz+k*1.6,dx+3,.25,dz+k*1.6,.03,K.dunkel,.03);stab(scene,dx+k*1.6,.25,dz-3,dx+k*1.6,.25,dz+3,.03,K.dunkel,.03)}
for(let i=0;i<3;i++){cyl(.04,.5,K.holz,dx+1+i*.7,.2,dz-3.2,scene).rotation.z=PI/2;box(.1,.05,.2,K.orange,dx+1.3+i*.7,.2,dz-3.2,scene)}box(.9,.6,.7,K.holz,dx-4.7,.3,dz+3,scene,true);box(.8,.5,.6,K.braun,dx-4.6,.25,dz+4,scene,true);eimer(dx+4.5,dz+2.2);
schild('Fossilien-Grabung',dx,2.5,dz+3.9,4.4,.9,null,'#fff8e6',0);
/* Eingang, Schilder, Ausstattung */
[-1,1].forEach(s=>{cyl(.25,4.6,K.holz,cx-19.2,2.3,cz+s*3.8,scene,true);kreis(cx-19.2,cz+s*3.8,.4)});box(.5,.6,8.4,K.gruen,cx-19.2,4.6,cz,scene);schild('Dino-Park',cx-19.45,3.8,cz,5.4,1.1,null,'#fff8e6',-PI/2);schild('Dino-Park',cx-18.95,3.8,cz,5.4,1.1,null,'#fff8e6',PI/2);
girlande(cx-19.2,4.3,cz-3.8,cx-19.2,4.3,cz+3.8,8,.4);wimpel(cx-19.2,4.2,cz-3.8,cx-19.2,4.2,cz+3.8,8,.3);
[[-16,-1.4],[-14,1.2],[-12,-1],[-10,1.3],[-8,-.8],[-6,.9]].forEach((p,i)=>sph(.5,0x9c8658,cx+p[0],.12,cz+p[1],scene,1,.1,1.3));
info(cx+1,cz-9,'Brachiosaurus');info(cx+5.5,cz+7,'Dreihorn');info(cx-5,cz-7,'Stegosaurus');info(cx-2,cz+10.5,'Kleiner Läufer');info(cx+4,cz-9,'Dino-Nest');
bude(cx-14,cz-8,face(cx-14,cz-8),4.4,K.gruen,K.weiss,'Dino-Shop');bank(cx-6,cz+5,0);bank(cx+7,cz-4,PI);laterne(cx-15,cz+5);laterne(cx-15,cz-5.5);laterne(cx+10,cz+4);laterne(cx-4,cz-3.5);kuebel(cx-17,cz+4.5);kuebel(cx-17,cz-4.5);eimer(cx-5,cz-2.5);eimer(cx+12,cz-7);ballons(cx-15,0,cz+11,6,2.4,2);ballons(cx+7,0,cz+3,5,2.2,4);
palme(cx-12,cz+15,7,1.6,8);palme(cx+16,cz+9,6,1.4,8);palme(cx-14,cz-12,6.5,1.5,8);[[cx+11,cz-9],[cx-3,cz+7],[cx+15,cz+4],[cx-13,cz+1]].forEach((p,i)=>{const g=grp(p[0],0,p[1]);cyl(.5,1.5,0x6a4a2a,0,.75,0,g,true);for(let k=0;k<8;k++){const pv=grp(0,1.5,0,g);pv.rotation.y=k*.785;box(.35,.06,1.8,0x3f9a46,0,.1,.9,pv).rotation.x=-.3}kreis(p[0],p[1],.6)});
/* Farne */
const ok=[[cx+3,cz-13,5],[cx+8,cz+11,5],[cx-8,cz-9,5],[cx+1,cz+14,4],[nx,nz,4.5],[vx,vz,6.5],[dx,dz,7.5],[cx,cz+2,3.6]],fa=[],fb=[];let n=0;
for(let tries=0;tries<200&&n<30;tries++){const a=rnd()*2*PI,rr=3+rnd()*16.5,x=cx+rr*Math.cos(a),z=cz+rr*Math.sin(a);if(Math.abs(dif(a-PI))<.55&&rr>9)continue;if(Math.abs(z-cz)<3.2&&x<cx+6)continue;if(ok.some(o=>Math.hypot(x-o[0],z-o[1])<o[2]))continue;n++;
  for(let k=0;k<5;k++){const ox=(rnd()-.5)*1.4,oz=(rnd()-.5)*1.4,hgt=1+rnd()*1.2;(k%2?fa:fb).push([x+ox,hgt*.5,z+oz,.5,hgt,.5])}}
instanz(scene,gCone,0x3f9a46,fa);instanz(scene,gCone,0x5cba5c,fb);
/* fliegender Saurier */
const fl=grp(0,12,0,scene);sph(.5,0x9a6a4a,0,0,0,fl,1.6,.6,.6);cone(.12,.9,K.orange,1.1,0,0,fl).rotation.z=-PI/2;const fw=[-1,1].map(s=>{const pv=grp(0,0,s*.3,fl);box(.7,.05,2,0x7a4a3a,0,0,s*1,pv);return pv});
bewegt(fl,t=>{const a=t*.25;fl.position.set(cx+4+Math.cos(a)*10,12+Math.sin(t*.7)*1.2,cz-2+Math.sin(a)*10);fl.rotation.y=-a-PI/2;fw[0].rotation.x=-Math.sin(t*5)*.5;fw[1].rotation.x=Math.sin(t*5)*.5},cx,cz,130)})();
/* ---------- Rutschenturm ---------- */
(function(){const b=ZN('Rutschenturm'),cx=b.x,cz=b.z,PI=Math.PI;scheibe(cx,cz,b.r,FARBEN.platz,.1);pfad(b.x,b.z,b.x,116,3.5);pfad(b.x,116,-3,116,3.5);zaun(cx,cz,14,48,0);
const tx=cx-3,tz=cz-1,face=(x,z)=>Math.atan2(tx-x,tz-z),dif=a=>((a+PI)%(2*PI)+2*PI)%(2*PI)-PI;
function rohr(p,q,r,f){const dx=q.x-p.x,dy=q.y-p.y,dz=q.z-p.z,l=Math.hypot(dx,dy,dz),m=cyl(r,l*1.15,f,(p.x+q.x)/2,(p.y+q.y)/2,(p.z+q.z)/2,scene,true);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(dx/l,dy/l,dz/l));return m}
function sch2(text,x,y,z,w,h,rot){schild(text,x,y,z,w,h,null,'#fff8e6',rot);schild(text,x-.06*Math.sin(rot),y,z-.06*Math.cos(rot),w,h,null,'#fff8e6',rot+PI)}
function sign2(text,x,y,z,w,h,rot){const px=Math.cos(rot)*(w/2-.12),pz=-Math.sin(rot)*(w/2-.12);[-1,1].forEach(s=>{cyl(.09,y+h/2,K.holz,x+s*px,(y+h/2)/2,z+s*pz,scene,true);kreis(x+s*px,z+s*pz,.3)});sch2(text,x,y,z,w,h,rot)}
function stapel(x,z,n){for(let i=0;i<n;i++){const m=box(1.5,.15,.9,BUNT[(i*3)%8],x+(i%2?.04:-.04),.1+i*.16,z,scene,true);m.rotation.y=i*.12}kreis(x,z,.9)}
function palme(x,z,h,sc){const g=grp(x,0,z);cyl(.22*sc,h,K.holz,0,h/2,0,g,true);for(let k=0;k<7;k++){const pv=grp(0,h,0,g);pv.rotation.y=k*.9;box(.7*sc,.08,3.2*sc,k%2?0x3f9a46:0x4caf6a,0,-.1,1.5*sc,pv).rotation.x=.45}kreis(x,z,.5)}
/* Turm in drei Farbbaendern mit Fenstern */
[K.gelb,K.weiss,K.gelb].forEach((c,i)=>cyl(3.2,4.4,c,tx,2.2+i*4.4,tz,scene,true));for(let r=0;r<3;r++)for(let j=0;j<4;j++){const a=j*PI/2+.4+r*.5,w=box(.6,.9,.2,K.himmel,tx+3.15*Math.cos(a),3.3+r*4.4,tz+3.15*Math.sin(a),scene);w.rotation.y=PI/2-a}
cone(6.4,2.2,K.rot,tx,12.1,tz,scene,true).rotation.x=PI;cyl(6.4,.4,K.weiss,tx,13.2,tz,scene,true);cyl(2.6,2.2,K.gelb,tx,14.5,tz,scene,true);cone(3.4,2.6,K.rot,tx,17.0,tz,scene,true);sph(.3,K.gold,tx,18.4,tz,scene);cyl(.06,3,K.dunkel,tx,19.9,tz,scene);
const flag=box(1.5,.9,.05,K.rot,tx+.8,21,tz,scene);bewegt(flag,t=>{flag.rotation.y=Math.sin(t*3)*.35},tx,tz,120);
for(let i=0;i<16;i++){const a=i/16*2*PI;cyl(.05,1.1,K.dunkel,tx+6.35*Math.cos(a),13.95,tz+6.35*Math.sin(a),scene);lampe(tx+6.5*Math.cos(a),13.3,tz+6.5*Math.sin(a),['rot','gelb','blau','gruen'][i%4]);const a2=(i+1)/16*2*PI;stab(scene,tx+6.35*Math.cos(a),14.5,tz+6.35*Math.sin(a),tx+6.35*Math.cos(a2),14.5,tz+6.35*Math.sin(a2),.08,K.dunkel,.08)}
for(let i=0;i<8;i++){const a=i/8*2*PI;lampe(tx+3.4*Math.cos(a),1.2,tz+3.4*Math.sin(a),'warm')}sperrRing(tx,tz,4.9,28);
/* Wendeltreppe aus Stufen */
const stu=[],gel=[],kn=[];for(let i=0;i<44;i++){const a=i*.2,y=.2+i*.3,x=tx+4*Math.cos(a),z=tz+4*Math.sin(a);stu.push([x,y,z,1.3,.18,1.3]);if(i%2===0){gel.push([tx+4.55*Math.cos(a),y+.6,tz+4.55*Math.sin(a),.05,1.1,.05]);kn.push([tx+4.55*Math.cos(a),y+1.15,tz+4.55*Math.sin(a),.1,.1,.1])}}
instanz(scene,gBox,K.holz,stu);instanz(scene,gCyl,K.dunkel,gel);instanz(scene,gSph,K.rot,kn);
/* drei Roehrenrutschen */
const fa=[K.rot,K.gelb,K.blau],hp=(k,u)=>{const a=k*2.094+1.05+u*7.85;return{x:tx+5.6*Math.cos(a),y:13.9-12.6*u,z:tz+5.6*Math.sin(a),a}},SL=44,landung=[];
for(let k=0;k<3;k++){let pr=hp(k,0);for(let i=1;i<=SL;i++){const q=hp(k,i/SL);rohr(pr,q,.6,i%9===0?K.weiss:fa[k]);if(i%5===2&&q.y>2.5){cyl(.12,q.y-.5,K.dunkel,q.x,(q.y-.5)/2,q.z,scene);kreis(q.x,q.z,.25)}if(i>SL-4)kreis(q.x,q.z,1);pr=q}
  const E=hp(k,1),tn={x:-Math.sin(E.a),z:Math.cos(E.a)},F={x:E.x+tn.x*4.8,y:.55,z:E.z+tn.z*4.8},px=F.x+tn.x*1.7,pz=F.z+tn.z*1.7;rohr(E,F,.6,fa[k]);kreisLinie(E.x,E.z,F.x,F.z,.9,1.6);
  cyl(2.4,.5,fa[k],px,.25,pz,scene,true);wasserFl(px,pz,2,WASSER,.35);kreis(px,pz,2.4);landung.push({k,E,F,px,pz})}
/* rutschende Teddys (nur am Ende der Roehre sichtbar) */
const tg=landung.map((l,i)=>{const g=grp(0,0,0,scene);sph(.4,BUNT[(i*3+1)%8],0,.4,0,g);sph(.3,BUNT[(i*3+1)%8],0,.95,0,g);[-1,1].forEach(s=>sph(.12,BUNT[(i*3+1)%8],s*.22,1.2,0,g));g.scale.setScalar(.001);return g});
bewegt(tg,t=>{tg.forEach((g,i)=>{const l=landung[i],p=(t*.1+i/3)%1;if(p<.62||p>.97){g.scale.setScalar(.001);return}g.scale.setScalar(1);if(p<.8){const f=(p-.62)/.18;g.position.set(l.E.x+(l.F.x-l.E.x)*f,l.E.y+(l.F.y-l.E.y)*f+.5,l.E.z+(l.F.z-l.E.z)*f)}else{const f=(p-.8)/.17;g.position.set(l.F.x+(l.px-l.F.x)*Math.min(1,f*2),.9+Math.sin(f*9)*.12,l.F.z+(l.pz-l.F.z)*Math.min(1,f*2))}})},tx,tz,110);
/* Warteschlange, Kasse, Matten */
[-1,1].forEach(s=>[0,1,2,3,4].forEach(k=>{cyl(.06,1,K.dunkel,tx+6+k*1.1,.5,tz+s*1.7,scene);sph(.1,K.gold,tx+6+k*1.1,1.05,tz+s*1.7,scene);if(k<4)stab(scene,tx+6+k*1.1,.9,tz+s*1.7,tx+7.1+k*1.1,.9,tz+s*1.7,.04,0xb02030,.04);kreis(tx+6+k*1.1,tz+s*1.7,.15)}));
teddy(scene,tx+9.3,0,tz-.4,K.rosa,.9);teddy(scene,tx+8.2,0,tz+.4,K.orange,.9);teddy(scene,tx+7.1,0,tz-.3,K.blau,.9);
bude(cx+10,cz+8.5,face(cx+10,cz+8.5),4.2,K.gelb,K.rot,'Kasse');stapel(cx+8,cz-8.5,8);stapel(cx+9.6,cz-8.2,6);stapel(cx+7.6,cz-9.8,5);
[[cx-9,cz+7],[cx-9.5,cz-6]].forEach((p,i)=>{bank(p[0],p[1],face(p[0],p[1]));});
/* Gartenbereich */
[[cx-11,cz+9],[cx-12,cz-3]].forEach((p,i)=>{const l=box(.9,.15,2,i?K.blau:K.rosa,p[0],.45,p[1],scene,true);box(.9,.5,.15,i?K.blau:K.rosa,p[0],.8,p[1]-.95,scene).rotation.x=-.4;cyl(.05,2.4,K.weiss,p[0]+1.3,1.2,p[1],scene);cone(1.5,.5,BUNT[i*3+1],p[0]+1.3,2.5,p[1],scene);kreis(p[0],p[1],.9)});
box(2.8,.1,.1,K.holz,cx-5,1.5,cz+11,scene);[-1,1].forEach(s=>{cyl(.06,1.5,K.holz,cx-5+s*1.4,.75,cz+11,scene);kreis(cx-5+s*1.4,cz+11,.2)});for(let k=0;k<5;k++)box(.4,.9,.05,BUNT[k],cx-6.1+k*.55,1.0,cz+11,scene);
sch2('Riesenrutschen',cx+13.6,3.4,cz,7.2,1.3,PI/2);[-1,1].forEach(s=>{cyl(.25,5,K.holz,cx+13.6,2.5,cz+s*4,scene,true);kreis(cx+13.6,cz+s*4,.4)});box(.4,.5,8.6,K.rot,cx+13.6,5.1,cz,scene);sign2('Immer Füße zuerst!',cx+4,2,tz+4.2,3.2,.7,PI/2);
girlande(cx+13.6,4.9,cz-4,cx+13.6,4.9,cz+4,8,.5);wimpel(tx+6.3,6,tz-2.5,tx+5.8,13,tz-2.2,7,.2);
laterne(cx+6,cz+5.5);laterne(cx+6,cz-6);laterne(cx-12,cz+3);laterne(cx-5,cz-11);kuebel(cx+11,cz+3.2);kuebel(cx+11,cz-3.2);eimer(cx+8,cz+4);eimer(cx-10,cz+6);ballons(cx+11.5,0,cz+11,6,2.4,2);ballons(cx-8,0,cz-9,5,2.2,5);palme(cx-12,cz+9,4.6,1);palme(cx-6,cz-11.5,4,.9);
const bu=[];for(let i=0;i<22;i++){const a=i/22*2*PI;if(Math.abs(dif(a))<.55)continue;bu.push([cx+12.6*Math.cos(a),.7,cz+12.6*Math.sin(a),1.3,1,1.3])}instanz(scene,gSph,0x4aa84e,bu);
[[-8,13],[2,-12],[10,-3],[-13,-8],[-1,12]].forEach(p=>beet(cx+p[0],cz+p[1],1.8,7))})();
/* ---------- Zirkuszelt ---------- */
(function(){const b=ZN('Zirkuszelt'),cx=b.x,cz=b.z,PI=Math.PI;scheibe(cx,cz,b.r,0xc7b685,.1);quer(b);zaun(cx,cz,19,56,0);
const tx=cx-4,tz=cz-2,TR=8,WH=4.2,DH=5.5,dif=a=>((a+PI)%(2*PI)+2*PI)%(2*PI)-PI,face=(x,z)=>Math.atan2(tx-x,tz-z);
function sch2(text,x,y,z,w,h,rot){schild(text,x,y,z,w,h,null,'#fff8e6',rot);schild(text,x-.06*Math.sin(rot),y,z-.06*Math.cos(rot),w,h,null,'#fff8e6',rot+PI)}
function sign2(text,x,y,z,w,h,rot){const px=Math.cos(rot)*(w/2-.12),pz=-Math.sin(rot)*(w/2-.12);[-1,1].forEach(s=>{cyl(.09,y+h/2,K.holz,x+s*px,(y+h/2)/2,z+s*pz,scene,true);kreis(x+s*px,z+s*pz,.3)});sch2(text,x,y,z,w,h,rot)}
/* Zelt: Wand- und Dachsegmente */
for(let i=0;i<12;i++){const th=(i-.5)*PI/6,col=i%2?K.weiss:K.rot;if(i!==3){const w=new THREE.Mesh(new THREE.CylinderGeometry(TR,TR,WH,1,1,false,th,PI/6),mat(col));w.position.set(tx,WH/2,tz);w.castShadow=true;scene.add(w)}
  const d=new THREE.Mesh(new THREE.ConeGeometry(TR+.4,DH,1,1,false,th,PI/6),mat(col));d.position.set(tx,WH+DH/2,tz);d.castShadow=true;scene.add(d)}
const v1=[],v2=[];for(let i=0;i<24;i++){const a=i/24*2*PI;(i%2?v1:v2).push([tx+(TR+.4)*Math.cos(a),WH-.1,tz+(TR+.4)*Math.sin(a),.45,.45,.45])}instanz(scene,gSph,K.gelb,v1);instanz(scene,gSph,K.blau,v2);
sph(.5,K.gold,tx,9.9,tz,scene);cyl(.07,3.2,K.dunkel,tx,11.4,tz,scene);const flag=box(1.4,.8,.05,K.rot,tx+.75,12.6,tz,scene);bewegt(flag,t=>{flag.rotation.y=Math.sin(t*3)*.4},tx,tz,130);sperrRing(tx,tz,TR+.5,44);
for(let k=0;k<6;k++){const a=k*PI/3+.3;girlande(tx,9.5,tz,tx+(TR+.5)*Math.cos(a),4.3,tz+(TR+.5)*Math.sin(a),7,0,k%2?'gelb':'rot')}
/* Eingang */
box(.4,3.2,3.4,0x2a1a2a,tx+TR-.2,1.6,tz,scene);[-1,1].forEach(s=>{box(.25,3.5,1.3,K.rot,tx+TR+.1,1.75,tz+s*1.8,scene).rotation.y=s*.3;cyl(.1,5.5,K.gold,tx+TR+.7,2.75,tz+s*2.6,scene,true);kreis(tx+TR+.7,tz+s*2.6,.3)});box(.5,.6,5,K.gold,tx+TR+.1,3.7,tz,scene);box(1.6,.2,3.6,K.holz,tx+TR+1,.1,tz,scene);box(.15,.7,5.6,K.rot,tx+TR+.7,4.85,tz,scene);
schild('Zirkus',tx+TR+.82,4.85,tz,5,1.1,null,'#fff8e6',PI/2);schild('Zirkus',tx+TR+.58,4.85,tz,5,1.1,null,'#fff8e6',-PI/2);
/* Zirkuswagen */
function wagen(x,z,rot,f,g2){const g=grp(x,0,z);g.rotation.y=rot;box(4.2,.3,2.4,K.dunkel,0,.85,0,g);box(3.8,2,2.2,f,0,2,0,g,true);box(3.82,.25,2.22,g2,0,2.9,0,g);cyl(1.2,3.9,g2,0,3.15,0,g).rotation.z=PI/2;[-1.1,1.1].forEach(q=>[-1,1].forEach(s=>{box(.8,.7,.1,K.himmel,q,2.25,s*1.11,g);box(.3,.7,.12,K.rosa,q-.45,2.25,s*1.12,g);box(.3,.7,.12,K.rosa,q+.45,2.25,s*1.12,g)}));
  box(.1,1.5,.9,K.holz,-1.92,1.75,0,g);sph(.07,K.gold,-1.99,1.75,.3,g);[-1.4,1.4].forEach(q=>[-1,1].forEach(s=>{cyl(.55,.18,K.holz,q,.55,s*1.25,g).rotation.x=PI/2;sph(.15,K.gold,q,.55,s*1.35,g)}));box(2.4,.12,.12,K.holz,3.1,.75,0,g).rotation.z=-.12;box(.9,.12,.5,K.holz,-2.5,.55,0,g);cyl(.15,.7,K.dunkel,1,3.9,.5,g);
  const q=Math.abs(Math.sin(rot))>.5;sperrKasten(x,z,q?2.8:4.4,q?4.4:2.8,0);return g}
wagen(cx-9,cz-14.5,0,K.gelb,K.rot);wagen(cx+.5,cz-16,0,K.tuerkis,K.orange);wagen(cx-16,cz+4,PI/2,K.rosa,K.lila);
/* Manege mit Elefant */
const mx=cx+7,mz=cz-10.5;scheibe(mx,mz,4.4,0xdbb97a,.14);for(let i=0;i<24;i++){const a=i/24*2*PI,c=box(1.15,.45,.5,i%2?K.rot:K.weiss,mx+4.6*Math.cos(a),.25,mz+4.6*Math.sin(a),scene);c.rotation.y=-a-PI/2}
const ps=[0,1,2,3].map(i=>{const a=i*PI/2+.8,x=mx+5.6*Math.cos(a),z=mz+5.6*Math.sin(a);cyl(.1,3.4,K.gold,x,1.7,z,scene,true);kreis(x,z,.25);lampe(x,3.5,z,'gelb');return[x,z]});ps.forEach((p,i)=>{const q=ps[(i+1)%4];girlande(p[0],3.3,p[1],q[0],3.3,q[1],6,.35)});
function zirkusElefant(par,x,z,rot){const g=grp(x,0,z,par),c=0x9aa4b0,d=0x7f8996;g.rotation.y=rot;cyl(2.6,.7,K.rot,0,.35,0,g,true);cyl(2.62,.18,K.weiss,0,.5,0,g);sph(1.5,c,0,3,0,g,1.35,1,.9).castShadow=true;
  [[1.1,.8],[1.1,-.8],[-1.1,.8],[-1.1,-.8]].forEach(p=>{cyl(.45,1.6,c,p[0],1.5,p[1],g);cyl(.5,.15,d,p[0],.78,p[1],g)});cyl(.07,1,d,-1.9,2.7,0,g).rotation.z=.3;sph(.14,d,-2.05,2.2,0,g);
  const k=grp(1.9,3.5,0,g);sph(.95,c,.2,.1,0,k,1,1,.95);[-1,1].forEach(s=>sph(.85,d,-.3,.2,s*.92,k,1,1,.3));[-1,1].forEach(s=>auge(k,.5,.25,s*.84,.17));cone(.45,.9,K.lila,.2,1.5,0,k);
  [[1,-.2,.38],[1.35,-.7,.32],[1.8,-.85,.26],[2.2,-.45,.2]].forEach(p=>sph(p[2],c,p[0],p[1],0,k));sph(.62,K.blau,2.3,.45,0,k);bewegt(k,t=>{k.rotation.z=Math.sin(t*1.5)*.08;k.position.y=3.5+Math.sin(t*3)*.08},x,z,100);kreis(x,z,3);return g}
function auge(par,x,y,z,r){const s=z>0?1:-1;sph(r,0xffffff,x,y,z,par);sph(r*.55,0x222222,x+r*.4,y,z+s*r*.8,par)}
zirkusElefant(scene,mx,mz,PI/2*0+Math.atan2(-(cz-mz),(cx+14)-mx));
/* Clown (jongliert) */
const lx=cx+9.5,lz=cz+4.5;cyl(1.7,.3,K.gelb,lx,.15,lz,scene,true);cyl(1.2,.32,K.rot,lx,.16,lz,scene);kreis(lx,lz,1.2);
const cl=grp(lx,.3,lz,scene);[-1,1].forEach(s=>{sph(.3,K.rot,.25,.18,s*.35,cl,1.6,.6,.8);cyl(.2,1,s>0?K.lila:K.gelb,0,.8,s*.35,cl)});sph(.65,K.blau,0,1.7,0,cl,1,1.2,1);[[.39,1.93,.48],[.39,1.47,-.48],[.62,1.62,.2]].forEach(p=>sph(.12,K.gelb,p[0],p[1],p[2],cl));
sph(.5,K.weiss,0,2.35,0,cl,1,.35,1);sph(.42,0xf8e6d0,0,2.75,0,cl);[-1,1].forEach(s=>{sph(.07,0xffffff,.37,2.85,s*.14,cl);sph(.04,0x222222,.42,2.85,s*.14,cl);sph(.18,K.orange,-.05,2.98,s*.34,cl)});sph(.1,K.rot,.45,2.73,0,cl);box(.03,.04,.24,K.rot,.4,2.57,0,cl);cone(.28,.7,K.lila,0,3.5,0,cl);sph(.1,K.gelb,0,3.88,0,cl);
const arm=[-1,1].map(s=>{const a=grp(0,2,s*.6,cl);cyl(.1,.8,K.blau,0,.4,0,a);sph(.15,K.weiss,0,.85,0,a);return a});const ball=[0,1,2].map(i=>sph(.22,BUNT[i*2],.4,3,0,cl));
bewegt(arm.concat(ball),t=>{arm.forEach((a,i)=>{const s=i?1:-1;a.rotation.x=s*(1+.35*Math.sin(t*5+i*PI))});ball.forEach((o,i)=>{const p=((t*.8+i/3)%1)*2*PI;o.position.set(.4,2.6+.8*Math.sin(p),1.25*Math.cos(p))})},lx,lz,100);
/* Seiltaenzerin mit Schirm */
const m1=[cx-13,cz+11],m2=[cx-1,cz+11];[m1,m2].forEach(m=>{cyl(.2,6.6,K.rot,m[0],3.3,m[1],scene,true);sph(.3,K.gold,m[0],6.8,m[1],scene);kreis(m[0],m[1],.4);const o=m===m1?-1:1;stab(scene,m[0],6.4,m[1],m[0]+o*3,0,m[1]+3.2,.05,K.dunkel,.05);stab(scene,m[0],6.4,m[1],m[0]+o*3,0,m[1]-3.2,.05,K.dunkel,.05);sph(.15,K.dunkel,m[0]+o*3,.1,m[1]+3.2,scene);sph(.15,K.dunkel,m[0]+o*3,.1,m[1]-3.2,scene)});
stab(scene,m1[0],5.6,m1[1],m2[0],5.6,m2[1],.07,K.dunkel,.07);const sf=grp(0,5.6,cz+11,scene);[-1,1].forEach(s=>cyl(.08,.9,K.lila,0,.45,s*.12,sf));cyl(.2,.8,K.rot,0,1.2,0,sf);sph(.2,HAUT[0],0,1.8,0,sf);gesicht(sf,0,1.8,0,.2,0);cone(.18,.4,K.gelb,0,2.1,0,sf);cyl(.06,.7,K.rot,-.25,1.5,0,sf).rotation.z=.8;cyl(.025,1.2,K.holz,.3,1.9,0,sf);cone(.8,.45,K.rosa,.3,2.7,0,sf);cyl(.06,.7,K.rot,.15,1.5,0,sf).rotation.z=-.8;
bewegt(sf,t=>{const u=Math.sin(t*.15)*.5+.5;sf.position.x=cx-12.5+u*11;sf.rotation.y=Math.cos(t*.15)>0?0:PI;sf.rotation.z=Math.sin(t*3)*.05},cx-7,cz+11,110);
/* Popcorn, Kasse, Ausstattung */
const pc=bude(cx+15,cz-6.5,face(cx+15,cz-6.5)+PI/2*0,3.6,K.rot,K.weiss,'Popcorn');for(let i=0;i<8;i++)sph(.22,0xfff4c8,-.8+(i%4)*.5,1.2+Math.floor(i/4)*.25,.9,pc);box(.8,1,.5,K.rot,1.1,1.5,.9,pc);
bude(cx+14.5,cz+9,face(cx+14.5,cz+9),4.2,K.gelb,K.rot,'Kasse');sign2('Manege',mx,2.4,mz-6.4,2.6,.7,0);
bank(cx+16,cz+3.6,-PI/2);bank(cx-9,cz+7,0);laterne(cx+12,cz+11);laterne(cx+15,cz-2.5);laterne(cx-11,cz-8);laterne(cx-6,cz+8);kuebel(cx+17.2,cz+3.8);kuebel(cx+17.2,cz-3.8);eimer(cx+12.5,cz+7.5);eimer(cx+12,cz-5);ballons(cx+12,0,cz+13,6,2.6,2);ballons(cx+3,0,cz+8.5,5,2.2,5);ballons(cx-3,0,cz-13,6,2.4,1);
const bu=[];for(let i=0;i<26;i++){const a=i/26*2*PI;if(Math.abs(dif(a))<.55)continue;bu.push([cx+17.4*Math.cos(a),.7,cz+17.4*Math.sin(a),1.3,1,1.3])}instanz(scene,gSph,0x4aa84e,bu);
[[-14,-9],[8,12],[-6,-9],[14,-12],[-12,10]].forEach(p=>beet(cx+p[0],cz+p[1],1.8,7));sign2('Heute: Zirkus!',cx+13.5,2.6,cz+0,4,.8,PI/2);
wimpel(tx,9.4,tz,tx+7,4.4,tz+4,6,.3);wimpel(tx,9.4,tz,tx-7,4.4,tz-4,6,.3);wimpel(tx,9.4,tz,tx+2,4.4,tz-8,6,.3)})();

/* ---------- Sternwarte ---------- */
(function(){const b=ZN('Sternwarte'),cx=b.x,cz=b.z,PI=Math.PI;scheibe(cx,cz,15.5,0xbfbeb6,.1);zaun(cx,cz,16,40,PI);zugang(b,35);
  const T=(x,z,s)=>{cyl(.15*s,1.4*s,K.holz,cx+x,.7*s,cz+z,scene,true);sph(.9*s,0x4f9a55,cx+x,1.9*s,cz+z,scene,1,1.1,1).castShadow=true;kreis(cx+x,cz+z,.5)};
  const st=(x,y,z,s)=>{box(s,s,.06,K.gold,x,y,z,scene).rotation.z=.785;box(s,s,.06,K.gold,x,y,z,scene)};
  const ring=(par,R,t,c,y,rx)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(R,t,5,24),mat(c));m.rotation.x=rx==null?PI/2:rx;m.position.y=y;par.add(m);return m};
  const halb=(r,c)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1,20,10,0,PI*2,0,PI/2),mat(c));m.scale.set(r,r,r);m.castShadow=true;return m};
  /* Haus mit drehbarer Kuppel */
  const ox=cx+5,oz=cz-9;cyl(3.4,5,0xeef0f8,ox,2.5,oz,scene,true);cyl(3.7,.3,K.grau,ox,.15,oz,scene);cyl(3.6,.4,K.grau,ox,5.1,oz,scene);kreis(ox,oz,3.7);
  box(1.4,2.4,.2,K.blau,ox,1.2,oz+3.42,scene);box(1.9,2.7,.15,K.weiss,ox,1.35,oz+3.36,scene);box(2.4,.2,1.2,K.grau,ox,.1,oz+4,scene);
  [.82,2.32,3.9,5.5].forEach(a=>{box(1,1.3,.1,K.weiss,ox+Math.cos(a)*3.38,3.1,oz+Math.sin(a)*3.38,scene).rotation.y=PI/2-a;box(.8,1.1,.16,K.himmel,ox+Math.cos(a)*3.42,3.1,oz+Math.sin(a)*3.42,scene).rotation.y=PI/2-a});
  const dome=grp(ox,5.3,oz);dome.add(halb(3.5,0xe4eaf6));ring(dome,3.29,.08,K.grau,1.2);
  for(let i=0;i<5;i++){const a=.17+i*.29;box(.16,.95,1.1,0x2f3a4a,Math.cos(a)*3.52,Math.sin(a)*3.52,0,dome).rotation.z=a}
  cyl(.38,3,K.dunkel,3*Math.cos(.8),3*Math.sin(.8),0,dome).rotation.z=.8-PI/2;cyl(.42,.15,K.gold,4.55*Math.cos(.8),4.55*Math.sin(.8),0,dome).rotation.z=.8-PI/2;sph(.3,K.gold,0,3.55,0,dome);
  bewegt(dome,t=>{dome.rotation.y=t*.12},ox,oz,90);lampe(ox-1.3,2.9,oz+3.6,'gelb');lampe(ox+1.3,2.9,oz+3.6,'gelb');
  /* Planetarium-Zelt */
  const px=cx-6,pz=cz-9;cyl(4.3,.9,K.weiss,px,.45,pz,scene,true);const pm=halb(4.2,0x7a78c8);pm.position.set(px,.9,pz);scene.add(pm);kreis(px,pz,4.4);
  [[1.2,4.02],[2.4,3.45]].forEach(q=>{const r=ring(scene,q[1],.1,K.weiss,.9+q[0]);r.position.x=px;r.position.z=pz});
  for(let i=0;i<14;i++){const f=i*2.4,e=.25+(i%5)*.26;lampe(px+4.3*Math.cos(e)*Math.cos(f),.9+4.3*Math.sin(e),pz+4.3*Math.cos(e)*Math.sin(f),i%2?'gelb':'blau')}
  box(2.8,2.7,2.4,K.weiss,px,1.35,pz+4.2,scene,true);box(1.5,2.1,.12,K.dunkel,px,1.05,pz+5.42,scene);box(3.3,.25,2.9,K.rot,px,2.8,pz+4.2,scene);kreis(px,pz+4.3,1.6);
  [-1.4,1.4].forEach(s=>box(.1,.8,.1,K.dunkel,px+s,3.3,pz+5.3,scene));schild('Planetarium',px,3.95,pz+5.3,3.6,.9,null,'#fff8e6',0);st(px-2.3,3.9,pz+5.3,.5);st(px+2.3,3.9,pz+5.3,.5);
  /* Mond-Modell auf Pfahl */
  const mx=cx-11,mz=cz-3.4;cyl(.6,.2,K.grau,mx,.1,mz,scene);cyl(.12,3.4,K.grau,mx,1.7,mz,scene,true);sph(1.5,0xdadada,mx,4.9,mz,scene).castShadow=true;kreis(mx,mz,.7);
  [[.6,.5,.62,.3],[-.7,.3,.65,.25],[.1,-.5,.86,.35],[.8,-.2,-.5,.28],[-.4,.7,-.6,.22],[-.8,-.3,-.5,.3],[.2,.9,.4,.2],[.1,.3,-.95,.26]].forEach(c=>{const l=Math.hypot(c[0],c[1],c[2]);sph(c[3],0xa9a9a9,mx+1.46*c[0]/l,4.9+1.46*c[1]/l,mz+1.46*c[2]/l,scene)});
  schild('Mond',mx,1.2,mz+.2,1.1,.4,null,'#fff8e6',0);
  /* grosses Fernrohr auf Stativ */
  const tx=cx+1,tz=cz+3.4,yaw=grp(tx,2.2,tz),pit=grp(0,.95,0,yaw);cyl(.22,2.2,K.grau,tx,1.1,tz,scene,true);cyl(.5,.12,K.dunkel,tx,.06,tz,scene);
  for(let i=0;i<3;i++){const a=i*2.094+.4;stab(scene,tx+Math.cos(a)*1.3,0,tz+Math.sin(a)*1.3,tx,1.5,tz,.14,K.dunkel)}
  cyl(.55,.2,K.grau,0,0,0,yaw);[-1,1].forEach(s=>box(.2,1.3,.2,K.grau,0,.65,s*.7,yaw));
  cyl(.4,3.4,K.weiss,.4,0,0,pit).rotation.z=-PI/2;cyl(.46,.28,K.dunkel,2.15,0,0,pit).rotation.z=-PI/2;cyl(.1,.8,K.dunkel,-1.2,.5,0,pit);cyl(.12,1.3,K.blau,.7,.55,0,pit).rotation.z=-PI/2;
  bewegt(yaw,t=>{yaw.rotation.y=Math.sin(t*.2)*1.2;pit.rotation.z=.6+.15*Math.sin(t*.35)},tx,tz,80);kreis(tx,tz,1.4);
  /* Planetenweg: Sonne und 8 Planeten */
  const PR=11.6,PN=[['Sonne',1.7,K.gelb],['Merkur',.38,0xa5a5a5],['Venus',.58,0xe8c070],['Erde',.62,0x3b8fc4],['Mars',.46,0xd0583a],['Jupiter',1.15,0xd9a066],['Saturn',.95,0xe6cf8a],['Uranus',.72,0x8fd8e0],['Neptun',.72,0x3a5bd0]];
  const pt=(g,y,R,v,s,c)=>{const l=Math.hypot(v[0],v[1],v[2]);sph(s,c,R*v[0]/l*.98,y+R*v[1]/l*.98,R*v[2]/l*.98,g)};
  PN.forEach((p,i)=>{const a=.12+i*.3,x=cx+Math.cos(a)*PR,z=cz+Math.sin(a)*PR,g=grp(x,0,z),R=p[1],big=i===0,ph=big?1.6:1.1;g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));
    box(big?2.6:1.5,ph,big?1.6:1.1,K.grau,0,ph/2,0,g,true);schild(p[0],0,ph*.55,(big?.8:.55)+.02,big?2:1.4,big?.55:.42,null,'#fff8e6',0,g);
    const y=ph+R+.12;sph(R,p[2],0,y,0,g).castShadow=true;
    if(big){const h=sph(R*1.12,0xffe27a,0,y,-.1,g,1,1,.35);for(let k=0;k<12;k++){const f=k/12*PI*2;cone(.26,.9,K.orange,Math.cos(f)*(R+.55),y+Math.sin(f)*(R+.55),0,g).rotation.z=f-PI/2}
      [-1,1].forEach(s=>sph(.17,K.dunkel,s*.51,y+.34,1.58,g));const m=new THREE.Mesh(new THREE.TorusGeometry(.5,.05,5,10,PI),mat(K.dunkel));m.rotation.z=PI;m.position.set(0,y-.2,1.5);g.add(m);
      bewegt(h,t=>{const k=1+.06*Math.sin(t*2);h.scale.set(R*1.12*k,R*1.12*k,R*.392*k)},x,z,80)}
    if(i===3)[[.6,.5,.62],[-.7,.3,.65],[.1,-.6,.8]].forEach(v=>pt(g,y,R,v,R*.3,0x4caf6a));
    if(i===5){[.3,-.3].forEach(q=>ring(g,R*.954,.06,0xb87a4a,y+q*R));pt(g,y,R,[.5,-.25,.83],R*.2,0xc0583a)}
    if(i===6){const m=ring(g,R*1.7,R*.13,0xcdb77a,y,PI/2-.35);m.scale.z=.35}
    if(i===4)pt(g,y,R,[0,1,.2],R*.25,K.weiss);
    kreis(x,z,big?1.5:.9)});
  wegweiser(cx+8.5,cz-1.5,'Planetenweg',0);
  /* Sternenkarte */
  const bx=cx+1,bz=cz-14.3;[-2.1,2.1].forEach(s=>cyl(.1,3.6,K.holz,bx+s,1.8,bz,scene,true));box(4.3,3.3,.14,K.holz,bx,2.6,bz,scene,true);sperrKasten(bx,bz,4.4,.6,0);
  const c=document.createElement('canvas');c.width=320;c.height=240;const t=c.getContext('2d');t.fillStyle='#14204a';t.fillRect(0,0,320,240);t.fillStyle='#ffffff';let s=7;for(let i=0;i<60;i++){s=(s*16807)%2147483647;const xx=s%320;s=(s*16807)%2147483647;t.fillRect(xx,s%240,2,2)}
  const SP=[[50,80],[85,95],[120,102],[150,120],[160,160],[205,170],[215,125]];t.strokeStyle='#ffe27a';t.lineWidth=2;t.beginPath();SP.forEach((q,i)=>i?t.lineTo(q[0],q[1]):t.moveTo(q[0],q[1]));t.stroke();t.fillStyle='#ffe27a';SP.forEach(q=>t.fillRect(q[0]-3,q[1]-3,6,6));t.fillStyle='#ffffff';t.font='bold 22px Arial';t.fillText('Sternenbild',8,28);
  const kp=new THREE.Mesh(new THREE.PlaneGeometry(3.8,2.85),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));kp.position.set(bx,2.6,bz+.09);scene.add(kp);schild('Sternenkarte',bx,4.7,bz+.1,3.6,.8,null,'#fff8e6',0);st(bx-2.3,4.9,bz+.1,.45);st(bx+2.3,4.9,bz+.1,.45);
  /* Rakete */
  const rx=cx+11.2,rz=cz-6.2,rg=grp(rx,0,rz);box(1.8,.3,1.8,K.grau,0,.15,0,rg);cyl(.6,3.4,K.weiss,0,2,0,rg,true);cone(.6,1.3,K.rot,0,4.35,0,rg);cyl(.62,.3,K.rot,0,1.2,0,rg);sph(.22,K.himmel,0,2.9,.57,rg,1,1,.5);
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(q=>box(q[0]?.8:.12,1.1,q[0]?.12:.8,K.rot,q[0]*.75,.85,q[1]*.75,rg));kreis(rx,rz,1.1);
  /* Tor mit Schild, Girlanden, Sterne */
  [-2.8,2.8].forEach(s=>{cyl(.15,4.4,K.holz,cx-14.5,2.2,cz+s,scene,true);kreis(cx-14.5,cz+s,.3);st(cx-14.5,5,cz+s,.6)});
  schild('Sternwarte',cx-14.6,4.7,cz,5.6,1.1,null,'#fff8e6',-PI/2);schild('Sternwarte',cx-14.4,4.7,cz,5.6,1.1,null,'#fff8e6',PI/2);box(.2,.3,5.8,K.holz,cx-14.5,3.9,cz,scene);
  girlande(cx-14.5,5.4,cz-2.8,cx-14.5,5.4,cz+2.8,10,.5,'gelb');girlande(cx-14.5,5.1,cz-2.8,cx-14.5,5.1,cz+2.8,10,.9,'blau');girlande(ox-3.4,4,oz+1.5,px+3.9,3.2,pz+1.5,8,.5,'blau');
  wegweiser(cx-19,cz-3,'Sternwarte',PI/2);
  /* Ausstattung */
  bank(cx-4,cz+6.5,PI);bank(cx+6,cz+6,PI);bank(cx-6.5,cz+3.2,PI/2+.3);
  T(-13,-8,1);T(10,-11,1.1);T(13,8,1);T(-6,12,1.1);
  laterne(cx-12,cz-5.5);laterne(cx-12,cz+5.5);laterne(cx+9,cz-2.5);laterne(cx+1.5,cz-6);
  kuebel(cx-13,cz-4.4);kuebel(cx-13,cz+4.4);kuebel(ox-2.4,oz+5.2);kuebel(ox+2.4,oz+5.2);eimer(cx+3,cz+7);eimer(cx-8.5,cz-4.2);ballons(cx-13,0,cz+6.5,5,2.2,1)})();

/* ---------- Eispalast ---------- */
(function(){const b=ZN('Eispalast'),cx=b.x,cz=b.z,PI=Math.PI,P1=0xf9c9d8,P2=0x9fe0cc,P3=0xfff0a8,WF=0xd9a050;scheibe(cx,cz,13.5,0xdbc9b9,.1);zaun(cx,cz,14,36,PI);pfad(b.x,b.z,b.x,116,3.5);pfad(b.x,116,3,116,3.5);
  const T=(x,z,s)=>{cyl(.15*s,1.4*s,K.holz,cx+x,.7*s,cz+z,scene,true);sph(.9*s,0x4f9a55,cx+x,1.9*s,cz+z,scene,1,1.1,1).castShadow=true;kreis(cx+x,cz+z,.5)};
  const pf=(x,z,n)=>{for(let i=0;i<n;i++)cyl(.2,.4,i%2?K.weiss:K.rot,x,.2+i*.4,z,scene);sph(.3,K.rosa,x,n*.4+.2,z,scene);kreis(x,z,.3)};
  const kegel=(x,z,f1,f2)=>{cyl(.5,.12,K.grau,x,.06,z,scene);cyl(.06,.9,K.grau,x,.55,z,scene);cone(.7,2,WF,x,2,z,scene,true).rotation.z=PI;sph(.8,f1,x,3.3,z,scene).castShadow=true;sph(.55,f2,x,4.1,z,scene);sph(.14,K.rot,x,4.7,z,scene);kreis(x,z,.8)};
  const ring=(R,t,c,y,x,z)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(R,t,4,14),mat(c));m.rotation.x=PI/2;m.position.set(x,y,z);scene.add(m)};
  const sitz=(x,z,fa,fc)=>{cyl(.9,.1,K.weiss,x,.85,z,scene,true);cyl(.1,.8,K.grau,x,.45,z,scene);cyl(.4,.08,K.grau,x,.04,z,scene);cyl(.05,2.6,K.grau,x,1.3,z,scene);cone(2.1,.8,fa,x,2.8,z,scene,true);sph(.12,K.gold,x,3.3,z,scene);kreis(x,z,1.7);
    for(let k=0;k<3;k++){const a=k*2.09+.5,g=grp(x+Math.cos(a)*1.4,0,z+Math.sin(a)*1.4);g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));box(.6,.08,.6,fc,0,.5,0,g);box(.6,.5,.08,fc,0,.8,-.3,g);cyl(.06,.5,K.grau,0,.25,0,g)}};
  /* Haus in Pastellfarben */
  const hx=cx+3,hz=cz-6;box(10,5,6,P1,hx,2.5,hz,scene,true);sperrKasten(hx,hz,10.6,6.6,0);
  for(let i=0;i<5;i++)box(1,4.9,.08,i%2?0xffffff:P3,hx-4+i*2,2.5,hz+3.03,scene);
  box(1.9,2.8,.14,K.tuerkis,hx,1.4,hz+3.12,scene);[-3,0,3].forEach(x=>{box(1.4,1.6,.1,K.weiss,hx+x,2.6,hz-3.04,scene);box(1.2,1.4,.12,K.himmel,hx+x,2.6,hz-3.06,scene);box(1.5,.3,.4,K.holz,hx+x,1.7,hz-3.2,scene)});box(1.5,2.4,.14,K.tuerkis,hx+4,1.2,hz-3.07,scene);box(2.3,.4,.2,K.weiss,hx,3,hz+3.12,scene);sph(.1,K.gold,hx+.6,1.3,hz+3.25,scene);
  const BL=[[],[],[],[]],BC=[K.rot,K.gelb,K.gruen,K.blau];
  [-1,1].forEach((q,wi)=>{const wx=hx+q*3.3;box(3.2,2.4,.14,K.weiss,wx,2.3,hz+3.1,scene);box(2.8,2,.1,0x6a4a5a,wx,2.3,hz+3.18,scene);
    [1.55,2.6].forEach((y,si)=>{box(2.8,.1,.7,K.holz,wx,y,hz+3.5,scene);for(let k=0;k<3;k++){const jx=wx-.9+k*.9;cyl(.36,.66,0xe6f5ff,jx,y+.38,hz+3.5,scene);cyl(.3,.1,K.rosa,jx,y+.76,hz+3.5,scene);
      for(let m=0;m<7;m++){const a=PI/2+(m-3)*.32;BL[(k+m+si+wi)%4].push([jx+Math.cos(a)*.36,y+.38+((m%3)-1)*.18,hz+3.5+Math.sin(a)*.36,.1,.1,.1])}}})});
  BL.forEach((l,i)=>instanz(scene,gSph,BC[i],l));
  [-1,1].forEach(q=>{box(.12,1.4,1.4,K.himmel,hx+q*5.04,2.7,hz-1,scene);box(.12,1.4,1.4,K.himmel,hx+q*5.04,2.7,hz+1,scene);box(.1,1.6,.1,K.weiss,hx+q*5.08,2.7,hz,scene);box(1.6,1.4,.12,K.himmel,hx+q*2.4,2.6,hz-3.04,scene)});
  cone(.45,1,WF,hx,2.5,hz-3.2,scene).rotation.z=PI;sph(.55,K.rosa,hx,3.3,hz-3.2,scene);
  const mg=grp(hx,0,hz+3.1);markise(mg,10,3.7,K.rosa,K.weiss);schild('Eispalast',hx,4.4,hz+3.12,5.4,.95,null,'#fff8e6',0);
  /* Dach mit Zuckerguss und riesiger Eistuete */
  box(11,.5,7,P2,hx,5.25,hz,scene,true);const SL=[];for(let i=0;i<11;i++){SL.push([hx-5+i,5.1,hz+3.5,.5,.4,.5]);SL.push([hx-5+i,5.1,hz-3.5,.5,.4,.5])}for(let j=0;j<7;j++){SL.push([hx-5.5,5.1,hz-3+j,.5,.4,.5]);SL.push([hx+5.5,5.1,hz-3+j,.5,.4,.5])}instanz(scene,gSph,0xffffff,SL);
  cyl(.2,4.2,K.grau,hx,7.6,hz,scene,true);cone(1.3,3.4,WF,hx,10.2,hz,scene,true).rotation.z=PI;[.8,1.6,2.4].forEach(h=>ring(1.3*h/3.4+.03,.05,0xb07a3a,8.5+h,hx,hz));
  sph(1.5,K.rosa,hx,12.6,hz,scene).castShadow=true;sph(1.25,0xf8f0d8,hx,14.5,hz,scene);sph(1,K.tuerkis,hx,16.1,hz,scene);sph(.38,K.rot,hx,17.3,hz,scene);
  for(let i=0;i<6;i++){const a=i*1.05;sph(.26,K.rosa,hx+1.3*Math.cos(a),11.85,hz+1.3*Math.sin(a),scene,1,1.8,1)}
  wimpel(hx,9.4,hz,hx-5.2,5.4,hz+3.4,8,.5);wimpel(hx,9.4,hz,hx+5.2,5.4,hz+3.4,8,.5);girlande(hx-5,4.95,hz+3.4,hx+5,4.95,hz+3.4,14,.35,'warm');
  /* Verkaufstresen, Zuckerwatte, Lutscher */
  bude(cx+11,cz-2,-PI/2,4.6,K.rosa,K.weiss,'Eis');girlande(hx+5.2,5,hz+3.4,cx+11,3.7,cz-2,6,.4,'rot');
  const zx=cx+8.5,zz=cz+4.5;cyl(.8,1,K.rosa,zx,.5,zz,scene,true);cyl(.15,.3,K.grau,zx,1.15,zz,scene);kreis(zx,zz,1.2);const bg=grp(zx,1.3,zz);cyl(.9,.3,K.grau,0,0,0,bg);
  for(let i=0;i<4;i++)box(.28,.35,.28,BUNT[i],Math.cos(i*1.57)*.8,.28,Math.sin(i*1.57)*.8,bg);sph(.55,K.rosa,0,.45,0,bg,1.2,.8,1.2);sph(.25,0xffe0ee,.5,.6,.1,bg);bewegt(bg,t=>{bg.rotation.y=t*2.2},zx,zz,80);
  [-.9,.9].forEach(s=>cyl(.05,2.5,K.grau,zx+s,1.25,zz+.9,scene));schild('Zuckerwatte',zx,2.7,zz+.9,1.9,.5,null,'#fff8e6',0);
  const rx=cx+7,rz=cz+8.8;box(2,.5,.6,K.holz,rx,.25,rz,scene,true);[0xf47ab0,0x8fd0f0,0xd8b0f0,0xf47ab0].forEach((c,i)=>{cyl(.03,1.3,K.weiss,rx-.75+i*.5,1.15,rz,scene);sph(.34,c,rx-.75+i*.5,1.75,rz,scene)});kreis(rx,rz,1.2);
  const lx=cx+7.2,lz=cz-1.2,lg=grp(lx,2.4,lz);cyl(.06,2.4,K.grau,lx,1.2,lz,scene);box(1.6,.06,.06,K.grau,0,0,0,lg);[-1,1].forEach((s,i)=>sph(.45,[K.rosa,K.lila][i],s*.8,0,0,lg,1,1,.25));bewegt(lg,t=>{lg.rotation.y=t*1.5},lx,lz,80);
  /* Bonbon-Pfosten, Aufsteller */
  pf(cx-12.2,cz-3.4,8);pf(cx-12.2,cz+3.4,8);pf(hx-1.35,hz+3.7,4);pf(hx+1.35,hz+3.7,4);kegel(cx-9.5,cz-4.5,K.rosa,0xf8f0d8);kegel(cx-9.5,cz+4.5,K.tuerkis,K.rosa);kegel(cx+11,cz+4,0xf8f0d8,K.gelb);
  /* Sitzgruppen mit Schirmen */
  sitz(cx-3.5,cz+6.5,K.rosa,K.tuerkis);sitz(cx+2.5,cz+9,K.gelb,K.rosa);sitz(cx-8.5,cz+8,K.tuerkis,K.gelb);
  /* Eiswagen */
  const tx=cx-7,tz=cz-9.8;box(6.1,.3,2.2,K.dunkel,tx-.3,.65,tz,scene);box(4.2,2.4,2.4,P3,tx+.6,1.9,tz,scene,true);box(1.7,1.7,2.3,K.weiss,tx-2.5,1.55,tz,scene,true);box(.08,.9,1.9,K.himmel,tx-3.36,1.8,tz,scene);sperrKasten(tx-.3,tz,6.4,2.7,0);
  [-2.2,2].forEach(q=>[-1,1].forEach(s=>{cyl(.5,.35,K.schwarz,tx+q,.5,tz+s*1.2,scene).rotation.x=PI/2;cyl(.22,.37,K.grau,tx+q,.5,tz+s*1.2,scene).rotation.x=PI/2}));
  box(2,.9,.1,K.dunkel,tx+.8,2.2,tz+1.22,scene);box(2.2,.1,.4,K.weiss,tx+.8,1.65,tz+1.4,scene);box(2.4,.1,.8,K.rosa,tx+.8,3,tz+1.5,scene).rotation.x=.35;lampe(tx+.8,2.75,tz+1.9,'warm');lampe(tx-3.4,1.2,tz-.6,'warm');lampe(tx-3.4,1.2,tz+.6,'warm');
  cone(.5,1.2,WF,tx+.8,3.7,tz,scene).rotation.z=PI;sph(.6,K.rosa,tx+.8,4.8,tz,scene);sph(.14,K.rot,tx+.8,5.45,tz,scene);schild('Eiswagen',tx-.9,3.15,tz+1.24,2,.45,null,'#fff8e6',0);
  /* Ausstattung */
  schild('Eispalast',cx-14.6,4.4,cz,5,1,null,'#fff8e6',-PI/2);schild('Eispalast',cx-14.4,4.4,cz,5,1,null,'#fff8e6',PI/2);[-2.6,2.6].forEach(s=>{cyl(.15,4.2,K.holz,cx-14.5,2.1,cz+s,scene,true);kreis(cx-14.5,cz+s,.3)});girlande(cx-14.5,4.6,cz-2.6,cx-14.5,4.6,cz+2.6,9,.4,'rot');
  wegweiser(cx-19,cz-3,'Eispalast',PI/2);T(10,-8.5,1);T(-6,12,1);T(4,12.3,1);
  kuebel(hx-5.8,hz-3.5);kuebel(hx+5.8,hz-3.5);kuebel(cx-12.2,cz-6.2);kuebel(cx-12.2,cz+6.2);bank(cx+11,cz+8,-PI/2);bank(cx-1,cz+4.2,PI);
  laterne(cx-10,cz-2.8);laterne(cx+5.5,cz+3.5);laterne(cx-11,cz+9.5);eimer(cx+9.5,cz+7);eimer(cx-5.5,cz+2.8);ballons(cx+12,0,cz+2,6,2.4,3)})();

/* ---------- Parkteich ---------- */
(function(){const b=ZN('Parkteich'),cx=b.x,cz=b.z,PI=Math.PI,lx=cx-3,lz=cz+1,bx=cx+3,bz=cz-10.5;let sd=5;const R2=()=>(sd=(sd*16807)%2147483647)/2147483647;
  scheibe(cx,cz,15.5,0xbfc994,.1);zaun(cx,cz,16,40,0);pfad(b.x,b.z,b.x,116,3.5);
  const T=(x,z,s)=>{cyl(.15*s,1.4*s,K.holz,cx+x,.7*s,cz+z,scene,true);sph(.9*s,0x4f9a55,cx+x,1.9*s,cz+z,scene,1,1.1,1).castShadow=true;kreis(cx+x,cz+z,.5)};
  const bog=(x,z,r,n,L)=>{const ok=a=>!L.some(l=>Math.abs(Math.atan2(Math.sin(a-l),Math.cos(a-l)))<.5);for(let i=0;i<n;i++){const a0=i/n*PI*2,a1=(i+1)/n*PI*2;if(ok(a0)&&ok(a1))sperrLinie(x+Math.cos(a0)*r,z+Math.sin(a0)*r,x+Math.cos(a1)*r,z+Math.sin(a1)*r)}};
  const pk=(x,z)=>{cyl(.35,.9,K.dunkel,x,.45,z,scene,true);cyl(.4,.1,K.grau,x,.92,z,scene);kreis(x,z,.5)};
  const bed=(x,z,o)=>{cyl(2,.2,0x6b4a2a,x,.1,z,scene);for(let i=0;i<11;i++){const a=R2()*6.28,r=R2()*1.7;blume(x+Math.cos(a)*r,z+Math.sin(a)*r*.8,BUNT[(i+o)%8])}kreis(x,z,2)};
  /* Teich, Sandrand, Felsenring */
  scheibe(lx,lz,9.2,0xc7b67f,.12);wasserFl(lx,lz,8,WASSER);wasserFl(lx,lz,5.2,0x6ec0ea,.02);bog(lx,lz,7.4,40,[0]);
  for(let i=0;i<24;i++){const a=i/24*PI*2;if(Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<.6)continue;felsen(lx+Math.cos(a)*8.3,lz+Math.sin(a)*8.3,.55+(i%3)*.12)}
  /* Bucht mit Holzbruecke */
  scheibe(bx,bz,4.7,0xc7b67f,.12);wasserFl(bx,bz,3.6,WASSER);bog(bx,bz,3.3,24,[0,PI]);
  for(let i=0;i<14;i++){const a=i/14*PI*2;if(Math.abs(Math.sin(a))<.42)continue;felsen(bx+Math.cos(a)*3.9,bz+Math.sin(a)*3.9,.5)}
  const ux=(bx-lx)/Math.hypot(bx-lx,bz-lz),uz=(bz-lz)/Math.hypot(bx-lx,bz-lz),mx=lx+ux*8.7,mz=lz+uz*8.7;box(2.2,.18,2.6,WASSER,mx,.1,mz,scene).rotation.y=Math.atan2(ux,uz);kreis(mx,mz,1.3);
  [-1,1].forEach(q=>{[-1,1].forEach(r=>sperrLinie(bx+q*2.86,bz+r*1.65,bx+q*2.86,bz+r*1.2));sperrLinie(bx-2.86,bz+q*1.2,bx+2.86,bz+q*1.2)});
  const bf=x=>.28+.45*(1-x*x/21.2),bdx=x=>-.9*x/21.2;
  for(let i=0;i<11;i++){const x=-4.6+i*.92;box(.9,.12,2.5,i%2?K.holz:0x9a6a3a,bx+x,bf(x),bz,scene,true).rotation.z=Math.atan(bdx(x))}
  [-1,1].forEach(q=>{for(let i=0;i<6;i++){const x=-4.6+i*1.84;cyl(.07,.95,K.weiss,bx+x,bf(x)+.45,bz+q*1.2,scene,true);if(i)stab(scene,bx+x-1.84,bf(x-1.84)+.9,bz+q*1.2,bx+x,bf(x)+.9,bz+q*1.2,.08,K.weiss)}});
  laterne(bx-5.2,bz-2.2);laterne(bx+5.2,bz+2.2);
  /* Steg mit Pfosten und Ruderboot */
  const ga=PI/20*Math.ceil(.5/(PI/20)),ex=lx+7.4*Math.cos(ga),ez=7.4*Math.sin(ga);
  [-1,1].forEach(q=>{sperrLinie(ex,lz+q*ez,ex,lz+q*1.3);sperrLinie(ex,lz+q*1.3,lx+2.2,lz+q*1.3)});sperrLinie(lx+2.2,lz-1.3,lx+2.2,lz+1.3);
  for(let i=0;i<14;i++)box(.42,.1,2.5,i%2?K.holz:0x9a6a3a,lx+8.8-i*.47,.34,lz,scene,true);
  [-1.1,1.1].forEach(q=>box(6.4,.12,.15,K.braun,lx+5.75,.2,lz+q,scene));
  [8.4,6.5,4.6,2.7].forEach(x=>[-1,1].forEach(q=>{cyl(.11,1.3,K.braun,lx+x,.65,lz+q*1.2,scene,true);sph(.14,K.braun,lx+x,1.32,lz+q*1.2,scene)}));[-1,1].forEach(q=>box(5.9,.07,.07,K.holz,lx+5.55,1.1,lz+q*1.2,scene));lampe(lx+2.7,1.55,lz-1.2,'warm');lampe(lx+2.7,1.55,lz+1.2,'warm');
  const boot=(x,z,ry,f)=>{const g=grp(x,.2,z);g.rotation.y=ry;box(2.9,.1,1.1,f,-.05,.05,0,g,true);box(.1,.5,1.1,f,-1.5,.35,0,g,true);
    [-1,1].forEach(s=>{box(2.9,.5,.1,f,-.05,.35,s*.55,g,true);box(2.9,.08,.12,K.weiss,-.05,.55,s*.58,g);box(.97,.5,.1,f,1.8,.35,s*.275,g,true).rotation.y=s*.602;box(.9,.1,.45,f,1.75,.05,s*.2,g).rotation.y=s*.5;
      box(.06,.06,2.3,K.holz,.2,.72,s*1.0,g).rotation.y=s*.2;box(.12,.03,.5,K.weiss,.5,.72,s*2.1,g)});
    [-.7,.4].forEach(q=>box(.4,.08,1,0xd8b078,q,.5,0,g));return g};
  boot(lx+5,lz-3.2,.12,K.rot);stab(scene,lx+4,.5,lz-2.7,lx+4.6,.9,lz-1.3,.04,K.dunkel);
  /* Seerosen, Frosch, Schilf */
  const pads=[],bl=[[],[]];for(let i=0;i<26;i++){const a=R2()*6.28,r=1+R2()*5.8,x=lx+Math.cos(a)*r,z=lz+Math.sin(a)*r;if(Math.hypot(x-(lx-3.2),z-(lz-2.5))<3.4||(Math.abs(z-lz)<2&&x>lx+1.5)||Math.hypot(x-(lx+5),z-(lz-3.2))<2.4)continue;const s=.35+R2()*.3;pads.push([x,.21,z,s,.03,s]);if(i%3===0)bl[i%2].push([x+.08,.3,z,.14,.1,.14])}
  instanz(scene,gCyl,0x3f9a46,pads);instanz(scene,gSph,K.rosa,bl[0]);instanz(scene,gSph,0xffffff,bl[1]);
  const fx=lx-1.2,fz=lz-.4,fg=grp(fx,.24,fz);cyl(.55,.05,0x3f9a46,fx,.22,fz,scene);sph(.2,0x5bbf4a,0,.16,0,fg,1.25,.8,1);sph(.13,0x5bbf4a,.24,.26,0,fg);[-1,1].forEach(s=>{sph(.045,K.schwarz,.279,.37,s*.056,fg);sph(.1,0x5bbf4a,-.12,.1,s*.18,fg,1.4,.6,.7)});
  const SR=[],SH=[];[3.4,3.8,4.2,4.7,5.2,5.7].forEach(a=>{for(let k=0;k<6;k++){const r=8.3+R2()*.7,aa=a+(R2()-.5)*.25,h=1.4+R2()*.9,x=lx+Math.cos(aa)*r,z=lz+Math.sin(aa)*r;SR.push([x,h/2,z,.04,h,.04]);if(k%2)SH.push([x,h-.1,z,.09,.45,.09])}});instanz(scene,gCyl,0x7a9a3a,SR);instanz(scene,gCyl,0x6b4a2a,SH);
  /* Trauerweide */
  const wx=lx-9,wz=lz+3.5;cyl(.5,4.4,K.braun,wx,2.2,wz,scene,true);kreis(wx,wz,.7);sph(3,0x6dae4f,wx,5.7,wz,scene,1,.75,1).castShadow=true;sph(2.1,0x5c9c4a,wx+1.6,5.1,wz+.7,scene,1,.8,1);
  const WS=[];for(let i=0;i<46;i++){const a=i*2.4,r=1.3+R2()*1.6,top=5.7-2.25*Math.sqrt(1-r*r/9)+.1,L=2.6+R2()*1.4;WS.push([wx+Math.cos(a)*r,top-L/2,wz+Math.sin(a)*r,.035,L,.035])}instanz(scene,gCyl,0x7fb85a,WS);
  /* Insel mit Pavillon */
  const ix=lx-3.2,iz=lz-2.5;cyl(2.7,.4,0x7ec062,ix,.2,iz,scene);for(let i=0;i<9;i++)felsen(ix+Math.cos(i*.7)*2.7,iz+Math.sin(i*.7)*2.7,.4);cyl(1.9,.18,K.holz,ix,.5,iz,scene,true);
  for(let i=0;i<6;i++){const a=i/6*PI*2;cyl(.09,2.6,K.weiss,ix+Math.cos(a)*1.65,1.9,iz+Math.sin(a)*1.65,scene,true)}cone(2.3,1.2,K.rot,ix,3.75,iz,scene,true);sph(.2,K.gold,ix,4.45,iz,scene);bank(ix,iz-.5,0);lampe(ix,3,iz,'warm');
  for(let i=0;i<5;i++)blume(ix+Math.cos(i*1.3+3)*2.1,iz+Math.sin(i*1.3+3)*2.1,BUNT[i]);
  /* Enten */
  const ente2=(par,f,kopf,fl,schwimm)=>{const g=grp(0,0,0,par),O=0xf59e3f;sph(.32,f,0,.38,0,g,1.35,.85,.9);cone(.12,.4,f,-.5,.52,0,g).rotation.z=1.04;sph(.14,f,.22,.6,0,g,1,1.3,1);sph(.17,kopf,.33,.76,0,g);box(.17,.05,.12,O,.56,.72,0,g);
    [-1,1].forEach(s=>{sph(.035,0x111111,.4626,.811,s*.0935,g);sph(.2,fl,-.05,.46,s*.25,g,1.4,.55,.35);if(!schwimm){cyl(.03,.3,O,.05,.15,s*.12,g);box(.14,.02,.1,O,.1,.01,s*.12,g)}});return g};
  const swim=[[lx+1,lz+3.2,2.4,.42,1,0,0xc9a06a,0xb98a52],[lx-3.5,lz+2.6,2.1,.33,-1,2,0xb8b2a2,0x2e8f5a]].map(q=>({q,g:ente2(scene,q[6],q[7],0x7a5a3a,true)}));
  const rp=new THREE.Mesh(new THREE.TorusGeometry(1,.04,4,20),mat(0xcfeeff));rp.rotation.x=PI/2;rp.position.set(lx+2.2,.22,lz);scene.add(rp);
  bewegt(swim.map(o=>o.g).concat([rp]),t=>{swim.forEach(o=>{const q=o.q,a=q[5]+q[4]*t*q[3],vx=-Math.sin(a)*q[4],vz=Math.cos(a)*q[4];o.g.position.set(q[0]+Math.cos(a)*q[2],.04+.02*Math.sin(t*3+q[5]),q[1]+Math.sin(a)*q[2]);o.g.rotation.y=Math.atan2(-vz,vx)});const f=(t*.4)%1;rp.scale.set(.3+f*1.6,1,.3+f*1.6)},lx,lz,100);
  [[lx+9.4,lz+4.6,PI*.8,.9,0xc9a06a,0xb98a52,0],[lx+10.3,lz+3.9,PI*.6,.7,0xb8b2a2,0x2e8f5a,0],[lx-1,lz+9.6,-.5,.9,0xc9a06a,0xb98a52,0],[ix+1.8,iz+.9,1.2,.8,0xb8b2a2,0x2e8f5a,.4]].forEach(q=>{const g=ente2(scene,q[4],q[5],0x7a5a3a,false);g.position.set(q[0],q[6],q[1]);g.rotation.y=q[2];g.scale.setScalar(q[3])});
  /* Tor, Futterautomat, Ausstattung */
  [-3,3].forEach(s=>{cyl(.15,4.4,K.holz,cx+14.3,2.2,cz+s,scene,true);kreis(cx+14.3,cz+s,.3)});schild('Parkteich',cx+14.4,4.6,cz,5.2,1,null,'#fff8e6',PI/2);schild('Parkteich',cx+14.2,4.6,cz,5.2,1,null,'#fff8e6',-PI/2);box(.2,.3,5.8,K.holz,cx+14.3,3.8,cz,scene);girlande(cx+14.3,5.2,cz-3,cx+14.3,5.2,cz+3,10,.5,'gelb');wegweiser(cx+19,cz-3,'Parkteich',PI/2);
  const ax=cx+9,az=cz+6.5,ag=grp(ax,0,az);ag.rotation.y=-PI/2;cyl(.12,.9,K.dunkel,0,.45,0,ag);box(.5,.1,.5,K.dunkel,0,.05,0,ag);box(.9,1,.8,K.rot,0,1.4,0,ag,true);sph(.45,0xdff3ff,0,1.95,0,ag);box(.3,.05,.05,K.schwarz,0,1.65,.41,ag);box(.3,.2,.2,K.grau,0,1.0,.45,ag);schild('Futter',0,1.35,.42,.8,.3,null,'#fff8e6',0,ag);kreis(ax,az,.8);
  bank(lx,lz+9.9,PI);bank(lx+6.2,lz+7.7,PI-.9);bank(lx-6.6,lz+7.4,PI+.6);
  bed(cx+11,cz-5,0);bed(cx-10,cz-8.5,3);pk(cx+10.5,cz+3.5);pk(cx+3.5,cz-6.5);pk(cx-5,cz+9.8);
  laterne(cx+10,cz-3.5);laterne(cx+9,cz+2.5);laterne(lx-7,lz-6.5);laterne(cx+2,cz+10.5);kuebel(cx+13,cz-4.8);kuebel(cx+13,cz+4.8);
  T(11,10,1);T(-4,-13,1.1);T(-13,-6,1)})();

/* ---------- Schwebebahn: Schiene, Stuetzen, Zuege ---------- */
(function(){const w=ZN('Schwebebahn West'),o=ZN('Schwebebahn Ost'),PI=Math.PI,X0=w.x,X1=o.x,Z0=w.z,Z1=o.z,zl=x=>Z0+(x-X0)*(Z1-Z0)/(X1-X0),Y=16,TD=2.4;
  const PX=[-62.5,-40,-17.5,-8,8,30,52,74];
  /* zwei Schienentraeger (Gleise) mit Fuehrungsstreifen und Lichtern */
  const pts=[X0-4.8].concat(PX,[X1+4.8]);
  [-1,1].forEach(s=>{for(let i=0;i<pts.length-1;i++){const xa=pts[i],xb=pts[i+1];stab(scene,xa,Y,zl(xa)+s*TD,xb,Y,zl(xb)+s*TD,.9,K.grau,.7,true);stab(scene,xa,Y+.38,zl(xa)+s*TD,xb,Y+.38,zl(xb)+s*TD,.3,K.gelb,.06)}
    for(let x=X0-4;x<=X1+4;x+=11)lampe(x,15.45,zl(x)+s*TD,'blau')});
  /* Stuetzen: Portale mit zwei Saeulen, Querbalken und Haengestangen; am Hauptweg Doppelportal links und rechts */
  PX.forEach(x=>{const z0=zl(x),por=Math.abs(x)<10,fc=por?K.rot:K.grau,of=por?7.2:4.2;
    [-1,1].forEach(s=>{cyl(.35,18.3,fc,x,9.15,z0+s*of,scene,true);box(1.1,.5,1.1,K.dunkel,x,.25,z0+s*of,scene);kreis(x,z0+s*of,.6);box(.2,1.7,.2,K.dunkel,x,17.2,z0+s*TD,scene)});
    box(.9,.6,2*of+1.2,por?K.gelb:K.blau,x,18.3,z0,scene,true);if(por){[-1,1].forEach(s=>{sph(.45,K.gold,x,18.9,z0+s*of,scene);lampe(x,17.7,z0+s*of,'gelb')});box(.3,.3,2*of+1.2,K.rot,x,17.85,z0,scene)}});
  /* Kabinen (haengend): Korper, Fensterband, Dach, 2 Haenger, 2 Raeder */
  const wagon=f=>{const g=grp(0,0,0,scene);g.rotation.y=-Math.atan2(Z1-Z0,X1-X0);box(3.5,2.3,2.2,f,0,13.45,0,g,true);box(2.8,.8,2.32,K.himmel,0,13.7,0,g);box(3.7,.22,2.5,K.weiss,0,14.72,0,g,true);
    [-1.1,1.1].forEach(x=>{box(.28,.85,1.2,K.dunkel,x,15.2,0,g);cyl(.3,1.5,K.grau,x,15.95,0,g).rotation.x=PI/2});return g};
  const ease=s=>s*s*(3-2*s),pos=p=>{p=((p%40)+40)%40;return p<16?ease(p/16):p<20?1:p<36?1-ease((p-20)/16):0};
  const trains=[{s:-1,ph:0,wg:[wagon(K.rot),wagon(K.rot)]},{s:1,ph:20,wg:[wagon(K.tuerkis),wagon(K.tuerkis)]}];
  bewegt(trains.reduce((a,t)=>a.concat(t.wg),[]),t=>{trains.forEach(tr=>{const x=X0+(X1-X0)*pos(t+tr.ph);tr.wg.forEach((g,i)=>{const xx=x+(i-.5)*3.8;g.position.set(xx,0,zl(xx)+tr.s*TD)})})},5,134,80)})();

/* ---------- Schwebebahn West (Bahnhof) ---------- */
(function(){const b=ZN('Schwebebahn West'),sx=b.x,sz=b.z,d=-1,PI=Math.PI,F=K.blau,F2=K.weiss;scheibe(sx,sz,13.5,0xc5c6b9,.1);zaun(sx,sz,14,44,0);pfad(b.x,b.z,b.x,116,3.5);
  const lx=sx+d*8,ap=-d;
  /* Bahnsteig oben (y=12), Uebergang, Absatz */
  box(9.2,.4,2.6,F2,sx,11.8,sz,scene,true);[-1,1].forEach(q=>box(9.2,.04,.2,K.gelb,sx,12.02,sz+q*1.15,scene));box(1.8,.4,2.6,F2,sx+d*5.5,11.8,sz,scene);box(3.6,.4,3.8,F2,lx,11.8,sz-1.3,scene,true);
  [-3.6,3.6].forEach(x=>{cyl(.4,11.6,K.grau,sx+x,5.8,sz,scene,true);kreis(sx+x,sz,.6)});cyl(.3,11.6,K.grau,sx+d*5.5,5.8,sz,scene);kreis(sx+d*5.5,sz,.5);
  [[-1.5,-2.8],[1.5,-2.8],[-1.5,.2],[1.5,.2]].forEach(q=>{cyl(.25,11.6,K.grau,lx+q[0],5.8,sz+q[1],scene);kreis(lx+q[0],sz+q[1],.45)});
  /* Treppe (23 Stufen) mit Gelaendern */
  for(let i=0;i<23;i++)box(1.8,.1,.34,K.grau,lx,11.45-i*.5,sz+.77+i*.34,scene);
  [-.9,.9].forEach(q=>{stab(scene,lx+q,12,sz+.6,lx+q,0,sz+8.6,.12,K.dunkel,.35);stab(scene,lx+q*1.05,12.9,sz+.6,lx+q*1.05,.9,sz+8.6,.07,F,.07)});stab(scene,lx+d*1.8,12.9,sz-3.2,lx+d*1.8,12.9,sz+.6,.07,F,.07);
  [-1.2,0,1.2].forEach(q=>{cyl(.1,.9,K.rot,lx+q,.45,sz+9.4,scene);sph(.13,K.weiss,lx+q,.95,sz+9.4,scene);kreis(lx+q,sz+9.4,.3)});stab(scene,lx-1.2,.8,sz+9.4,lx+1.2,.8,sz+9.4,.05,K.rot);
  /* Aufzug aus Glas mit Kabine */
  const ly=sz-4.4,gm=new THREE.MeshLambertMaterial({color:0xcfeaf8,transparent:true,opacity:.35});
  [[0,-1.1,2.2,.06],[0,1.1,2.2,.06],[-1.1,0,.06,2.2],[1.1,0,.06,2.2]].forEach(q=>{const m=new THREE.Mesh(new THREE.BoxGeometry(q[2],14,q[3]),gm);m.position.set(lx+q[0],7,ly+q[1]);scene.add(m)});
  [-1.1,1.1].forEach(p=>[-1.1,1.1].forEach(r=>cyl(.1,14.4,K.dunkel,lx+p,7.2,ly+r,scene)));box(2.5,.3,2.5,F,lx,14.5,ly,scene,true);kreis(lx,ly,1.5);schild('Aufzug',lx,1.6,ly+1.14,1.4,.4,null,'#fff8e6',0);
  const cab=box(1.6,2.1,1.6,K.orange,lx,1.2,ly,scene,true);bewegt(cab,t=>{cab.position.y=7.1-5.9*Math.cos(t*.35)},sx,sz,100);
  /* Haltestelle: Saeulen, Dach, Haenger, Prellbock */
  [-1,1].forEach(p=>[-1,1].forEach(r=>{cyl(.4,18.7,K.grau,sx+p*5.2,9.35,sz+r*4.9,scene,true);kreis(sx+p*5.2,sz+r*4.9,.6)}));box(12.4,.5,11.4,F,sx,19,sz,scene,true);box(12.8,.3,11.8,F2,sx,18.7,sz,scene);
  [-1,1].forEach(q=>[-3.8,0,3.8].forEach(x=>box(.2,2.4,.2,K.dunkel,sx+x,17.55,sz+q*2.4,scene)));box(.4,1,5.6,K.rot,sx+d*4.95,16,sz,scene);
  [-3.5,3.5].forEach(x=>{box(.2,.5,.2,K.dunkel,sx+x,19.5,sz+5.55,scene);box(.2,.5,.2,K.dunkel,sx+x,19.5,sz-5.55,scene)});schild('Schwebebahn West',sx,20.5,sz+5.55,8,2,null,'#fff8e6',0);schild('Schwebebahn West',sx,20.5,sz-5.55,8,2,null,'#fff8e6',PI);
  girlande(sx-6.2,18.5,sz+5.8,sx+6.2,18.5,sz+5.8,16,.4,'blau');wimpel(sx-6.2,18.2,sz-5.8,sx+6.2,18.2,sz-5.8,12,.5);lampe(sx-4.6,18.4,sz,'warm');lampe(sx+4.6,18.4,sz,'warm');
  const fg=grp(sx+5.4,21.9,sz-5.2);cyl(.06,3,K.grau,sx+5.4,20.5,sz-5.2,scene);box(1.3,.8,.04,K.rot,.65,0,0,fg);bewegt(fg,t=>{fg.rotation.y=Math.sin(t*2)*.4},sx,sz,120);
  /* Fahrkartenhaeuschen und Automat */
  const kx=sx+ap*8.6,kz=sz+5;box(3.2,2.8,2.4,K.gelb,kx,1.4,kz,scene,true);box(3.8,.25,3,F,kx,2.95,kz,scene).rotation.x=.12;sperrKasten(kx,kz,3.4,2.6,0);box(1.5,.9,.1,K.himmel,kx-.5,1.7,kz+1.22,scene);box(1.6,.1,.5,K.weiss,kx-.5,1.15,kz+1.4,scene);box(.8,1.9,.1,K.braun,kx+1,.95,kz+1.22,scene);schild('Fahrkarten',kx,2.5,kz+1.24,2.6,.5,null,'#fff8e6',0);
  box(.7,1.5,.5,K.blau,kx+2.6,.75,kz,scene,true);box(.5,.4,.05,K.himmel,kx+2.6,1.2,kz+.27,scene);kreis(kx+2.6,kz,.6);
  /* Ausstattung */
  wegweiser(sx+ap*17.5,sz-3,'Schwebebahn',PI/2);kuebel(sx+ap*11,sz-4.6);kuebel(sx+ap*11,sz+4.6);bank(sx+ap*3,sz+8,PI);bank(sx+ap*3,sz-8,0);laterne(sx+ap*10,sz-6.5);laterne(sx+ap*10,sz+7);laterne(sx-ap*4,sz+9.5);
  eimer(sx+ap*6,sz+2.5);eimer(kx+2,kz+3);ballons(sx+ap*11.5,0,sz+8,5,2.2,2);ballons(sx-ap*10,0,sz-8,4,2.2,5);kuebel(sx+ap*8,sz-8)})();

/* ---------- Schwebebahn Ost (Bahnhof) ---------- */
(function(){const b=ZN('Schwebebahn Ost'),sx=b.x,sz=b.z,d=1,PI=Math.PI,F=K.rot,F2=K.weiss;scheibe(sx,sz,13.5,0xc5c6b9,.1);zaun(sx,sz,14,44,Math.PI);pfad(b.x,b.z,b.x,116,3.5);
  const lx=sx+d*8,ap=-d;
  /* Bahnsteig oben (y=12), Uebergang, Absatz */
  box(9.2,.4,2.6,F2,sx,11.8,sz,scene,true);[-1,1].forEach(q=>box(9.2,.04,.2,K.gelb,sx,12.02,sz+q*1.15,scene));box(1.8,.4,2.6,F2,sx+d*5.5,11.8,sz,scene);box(3.6,.4,3.8,F2,lx,11.8,sz-1.3,scene,true);
  [-3.6,3.6].forEach(x=>{cyl(.4,11.6,K.grau,sx+x,5.8,sz,scene,true);kreis(sx+x,sz,.6)});cyl(.3,11.6,K.grau,sx+d*5.5,5.8,sz,scene);kreis(sx+d*5.5,sz,.5);
  [[-1.5,-2.8],[1.5,-2.8],[-1.5,.2],[1.5,.2]].forEach(q=>{cyl(.25,11.6,K.grau,lx+q[0],5.8,sz+q[1],scene);kreis(lx+q[0],sz+q[1],.45)});
  /* Treppe (23 Stufen) mit Gelaendern */
  for(let i=0;i<23;i++)box(1.8,.1,.34,K.grau,lx,11.45-i*.5,sz+.77+i*.34,scene);
  [-.9,.9].forEach(q=>{stab(scene,lx+q,12,sz+.6,lx+q,0,sz+8.6,.12,K.dunkel,.35);stab(scene,lx+q*1.05,12.9,sz+.6,lx+q*1.05,.9,sz+8.6,.07,F,.07)});stab(scene,lx+d*1.8,12.9,sz-3.2,lx+d*1.8,12.9,sz+.6,.07,F,.07);
  [-1.2,0,1.2].forEach(q=>{cyl(.1,.9,K.rot,lx+q,.45,sz+9.4,scene);sph(.13,K.weiss,lx+q,.95,sz+9.4,scene);kreis(lx+q,sz+9.4,.3)});stab(scene,lx-1.2,.8,sz+9.4,lx+1.2,.8,sz+9.4,.05,K.rot);
  /* Aufzug aus Glas mit Kabine */
  const ly=sz-4.4,gm=new THREE.MeshLambertMaterial({color:0xcfeaf8,transparent:true,opacity:.35});
  [[0,-1.1,2.2,.06],[0,1.1,2.2,.06],[-1.1,0,.06,2.2],[1.1,0,.06,2.2]].forEach(q=>{const m=new THREE.Mesh(new THREE.BoxGeometry(q[2],14,q[3]),gm);m.position.set(lx+q[0],7,ly+q[1]);scene.add(m)});
  [-1.1,1.1].forEach(p=>[-1.1,1.1].forEach(r=>cyl(.1,14.4,K.dunkel,lx+p,7.2,ly+r,scene)));box(2.5,.3,2.5,F,lx,14.5,ly,scene,true);kreis(lx,ly,1.5);schild('Aufzug',lx,1.6,ly+1.14,1.4,.4,null,'#fff8e6',0);
  const cab=box(1.6,2.1,1.6,K.orange,lx,1.2,ly,scene,true);bewegt(cab,t=>{cab.position.y=7.1-5.9*Math.cos(t*.35)},sx,sz,100);
  /* Haltestelle: Saeulen, Dach, Haenger, Prellbock */
  [-1,1].forEach(p=>[-1,1].forEach(r=>{cyl(.4,18.7,K.grau,sx+p*5.2,9.35,sz+r*4.9,scene,true);kreis(sx+p*5.2,sz+r*4.9,.6)}));box(12.4,.5,11.4,F,sx,19,sz,scene,true);box(12.8,.3,11.8,F2,sx,18.7,sz,scene);
  [-1,1].forEach(q=>[-3.8,0,3.8].forEach(x=>box(.2,2.4,.2,K.dunkel,sx+x,17.55,sz+q*2.4,scene)));box(.4,1,5.6,K.rot,sx+d*4.95,16,sz,scene);
  [-3.5,3.5].forEach(x=>{box(.2,.5,.2,K.dunkel,sx+x,19.5,sz+5.55,scene);box(.2,.5,.2,K.dunkel,sx+x,19.5,sz-5.55,scene)});schild('Schwebebahn Ost',sx,20.5,sz+5.55,8,2,null,'#fff8e6',0);schild('Schwebebahn Ost',sx,20.5,sz-5.55,8,2,null,'#fff8e6',PI);
  girlande(sx-6.2,18.5,sz+5.8,sx+6.2,18.5,sz+5.8,16,.4,'blau');wimpel(sx-6.2,18.2,sz-5.8,sx+6.2,18.2,sz-5.8,12,.5);lampe(sx-4.6,18.4,sz,'warm');lampe(sx+4.6,18.4,sz,'warm');
  const fg=grp(sx+5.4,21.9,sz-5.2);cyl(.06,3,K.grau,sx+5.4,20.5,sz-5.2,scene);box(1.3,.8,.04,K.rot,.65,0,0,fg);bewegt(fg,t=>{fg.rotation.y=Math.sin(t*2)*.4},sx,sz,120);
  /* Fahrkartenhaeuschen und Automat */
  const kx=sx+ap*8.6,kz=sz+5;box(3.2,2.8,2.4,K.gelb,kx,1.4,kz,scene,true);box(3.8,.25,3,F,kx,2.95,kz,scene).rotation.x=.12;sperrKasten(kx,kz,3.4,2.6,0);box(1.5,.9,.1,K.himmel,kx-.5,1.7,kz+1.22,scene);box(1.6,.1,.5,K.weiss,kx-.5,1.15,kz+1.4,scene);box(.8,1.9,.1,K.braun,kx+1,.95,kz+1.22,scene);schild('Fahrkarten',kx,2.5,kz+1.24,2.6,.5,null,'#fff8e6',0);
  box(.7,1.5,.5,K.blau,kx+2.6,.75,kz,scene,true);box(.5,.4,.05,K.himmel,kx+2.6,1.2,kz+.27,scene);kreis(kx+2.6,kz,.6);
  /* Ausstattung */
  wegweiser(sx+ap*17.5,sz-3,'Schwebebahn',PI/2);kuebel(sx+ap*11,sz-4.6);kuebel(sx+ap*11,sz+4.6);bank(sx+ap*3,sz+8,PI);bank(sx+ap*3,sz-8,0);laterne(sx+ap*10,sz-6.5);laterne(sx+ap*10,sz+7);laterne(sx-ap*4,sz+9.5);
  eimer(sx+ap*6,sz+2.5);eimer(kx+2,kz+3);ballons(sx+ap*11.5,0,sz+8,5,2.2,2);ballons(sx-ap*10,0,sz-8,4,2.2,5);kuebel(sx+ap*8,sz-8)})();

/* ---------- Wegweiser zu den neuen Orten ---------- */
wegweiser(24,38.5,'Dino-Park',0);wegweiser(34,38.5,'Sternwarte',0);wegweiser(44,38.5,'Wildwasserbahn',0);wegweiser(-44,38.5,'Rutschenturm',0);wegweiser(-24,-96.5,'Zirkuszelt',0);wegweiser(-14,124,'Schwebebahn',0);wegweiser(14,124,'Eispalast',0);wegweiser(-24,124,'Parkteich',0);
/* ---------- Landschaft: Büsche, Gras, Blumen (instanziert) ---------- */
(function(){const bu=[],bu2=[],gr=[],st=[],bk=[[],[],[],[],[],[],[],[]];let t=0;
  while(bu.length<150&&t++<9000){const x=GRENZE.x0+8+rnd()*(GRENZE.x1-GRENZE.x0-16),z=GRENZE.z0+8+rnd()*(GRENZE.z1-GRENZE.z0-16);if(!frei(x,z))continue;const s=.7+rnd()*.7;bu.push([x,.55*s,z,.9*s,.7*s,.9*s]);bu2.push([x+.5,.6*s,z+.3,.6*s,.5*s,.6*s]);kreis(x,z,.8*s)}
  t=0;while(gr.length<900&&t++<12000){const x=GRENZE.x0+4+rnd()*(GRENZE.x1-GRENZE.x0-8),z=GRENZE.z0+4+rnd()*(GRENZE.z1-GRENZE.z0-8);if(!frei(x,z))continue;for(let k=0;k<3;k++)gr.push([x+(rnd()-.5)*.5,.4,z+(rnd()-.5)*.5,.1,.8+rnd()*.4,.1])}
  t=0;let cl=0;while(cl<70&&t++<6000){const cx=GRENZE.x0+8+rnd()*(GRENZE.x1-GRENZE.x0-16),cz=GRENZE.z0+8+rnd()*(GRENZE.z1-GRENZE.z0-16);if(!frei(cx,cz))continue;cl++;const c=Math.floor(rnd()*8);for(let k=0;k<8;k++){const x=cx+(rnd()-.5)*3,z=cz+(rnd()-.5)*3;st.push([x,.25,z,.03,.5,.03]);bk[(c+k%2)%8].push([x,.55,z,.16,.16,.16])}}
  instanz(scene,gSph,0x3f8a3a,bu);instanz(scene,gSph,0x56a04a,bu2);instanz(scene,gCone,0x4aa040,gr);instanz(scene,gCyl,0x3f9a46,st);bk.forEach((l,i)=>instanz(scene,gSph,BUNT[i],l))})();
/* ---------- Leben: Tauben, Ballonverkäufer, Clown, Lotta spaziert ---------- */
(function(){
  const taube=par=>{const g=grp(0,0,0,par);sph(.3,0x9aa0a6,0,.35,0,g,1.3,.9,.8);sph(.18,0xb8bec4,.35,.6,0,g);cone(.05,.12,0xf0a030,.52,.58,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>{sph(.035,0x111111,.46,.65,z*.1,g);cyl(.02,.2,0xe0605a,0,.1,z*.1,g)});sph(.2,0x7a8088,-.3,.4,0,g,1.4,.5,.7);g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*6))*.04};return g};
  const lauf=(w,f,ph)=>{bewegt(w,t=>{const a=t*f.v+ph,x=f.x+Math.cos(a)*f.rx,z=f.z+Math.sin(a)*f.rz,vx=-Math.sin(a)*f.rx,vz=Math.cos(a)*f.rz;w.position.set(x,0,z);w.rotation.y=Math.atan2(-vz,vx)},f.x,f.z,90)};
  [[0,104],[-20,84],[-12,-50]].forEach((p,i)=>{const w=grp(0,0,0,scene);const a=taube(w);leben(a,i);lauf(w,{x:p[0],z:p[1],rx:3+i,rz:2.5,v:.15+i*.03},i*1.7)});
  const bunch=(g,n,hoch)=>{const gb=grp(.5,.9,.25,g);cyl(.015,hoch,K.grau,0,hoch/2,0,gb);for(let i=0;i<n;i++){const a=i*2.3;sph(.42,BUNT[i%8],Math.cos(a)*.5,hoch+.3+(i%3)*.35,Math.sin(a)*.5,gb)}};
  const mk=(i,jacke,haar,stil,f0)=>{const f=besucherFigur(Object.assign({},AVATARE[i%AVATARE.length],{jacke,haar,stil}));const p=BPTS[Math.floor(rnd()*BPTS.length)];f.g.position.set(p[0],0,p[1]);f.ziel=BPTS[Math.floor(rnd()*BPTS.length)];f.v=1.6+rnd()*.5;besucher.push(f);if(f0)f0(f.g);return f};
  mk(2,K.gelb,0x6b4626,'cap',g=>bunch(g,14,2.8));
  mk(5,K.rot,0xe8c24a,'zoepfe',g=>bunch(g,6,2.4));mk(7,K.gruen,0x1b1410,'pferd',g=>bunch(g,5,2.2));
  mk(3,K.lila,0xf59e3f,'locken',g=>{sph(.15,K.rot,0,2.01,.52,g);cone(.4,.9,K.gelb,0,2.95,0,g);sph(.14,K.rot,0,3.45,0,g);[-1,1].forEach(s=>sph(.17,K.rosa,s*.42,1.95,0,g))});
  mk(1,K.blau,0x2a1d14,'kurz',g=>{cone(.2,.7,K.gold,.75,1.2,.35,g).rotation.x=-1.2;cyl(.06,.3,K.gold,.6,1.2,.3,g)});
  const w=grp(0,0,0,scene);w.scale.setScalar(.55);const lo=lotta(w,K.rot);leben(lo,0);bewegt(w,t=>{const s=t*.04,z=10+Math.sin(s)*100,vz=Math.cos(s);w.position.set(wegX(z)+4.4,0,z);w.rotation.y=vz>0?0:Math.PI},0,0,400)})();
/* kleine feste Teile werfen keinen Schatten (weniger verschiedene Blöcke nach dem Verschmelzen) */
scene.traverse(m=>{if(!m.isMesh||m.isInstancedMesh||!m.castShadow)return;for(let o=m;o;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep))return}const q=m.scale;if(Math.max(q.x,q.y,q.z)<3.2)m.castShadow=false});
lichtBauen();
/* ---------- Besucher ---------- */
(function(){const jc=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0xe0605a,0x9b6fd0,0x4caf6a],hc=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a,0xe8c24a,0x2a1d14,0xb5651d,0x6b4626],st=['kurz','zoepfe','cap','pferd','kurz','zoepfe','cap','pferd','kurz','zoepfe'];
  for(let i=0;i<10;i++){const f=besucherFigur(Object.assign({},AVATARE[(i+1)%AVATARE.length],{jacke:jc[i%10],haar:hc[(i*3)%10],stil:st[i%10]}));const p=BPTS[(i*2)%BPTS.length];f.g.position.set(p[0]+(rnd()-.5)*2,0,p[1]);f.ziel=BPTS[(i*3+1)%BPTS.length];f.v=1.8+rnd()*.8;besucher.push(f)}})();
}
