/* Welt: Zoo (Kennwort zoo). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
const MASKOTTCHEN='Wilma Waschbär';
const START={x:0,z:94};
const BEREICHE={
  eingang:{name:'Eingangsplatz',x:0,z:92,plaetze:[]},
  savanne:{name:'Savanne',x:88,z:32,plaetze:[]},
  teich:{name:'Pinguinteich',x:-88,z:32,plaetze:[]},
  wiese:{name:'Affen und Schafe',x:0,z:-60,plaetze:[]}
};
const EXTRAZONEN=[{name:'Spielplatz',x:-88,z:-100},{name:'Picknick',x:88,z:-100},{name:'Elefantenpark',x:95,z:-35},{name:'Giraffenwiese',x:-95,z:-35}];
const SEITENWEGE=[35,-35,-100];
const GRENZE={x0:-125,x1:125,z0:-215,z1:115};
const TORZ=-160, FEST={x:0,z:-190};
let FARBEN,WASSER,ausgang;
function pfad(x1,z1,x2,z2,w,farbe){const l=Math.hypot(x2-x1,z2-z1);const b=box(w,.06,l,farbe||FARBEN.pfad,(x1+x2)/2,.03,(z1+z2)/2);b.rotation.y=Math.atan2(x2-x1,z2-z1);b.receiveShadow=true;scene.add(b)}
function elefant(par){const g=grp(0,0,0,par),k=0x9aa0a8,d=0x868c94;
  sph(1.5,k,0,2.2,0,g,1.25,.95,.85).castShadow=true;[[-1.1,.7],[-1.1,-.7],[1.1,.7],[1.1,-.7]].forEach(p=>cyl(.38,1.6,k,p[0],.8,p[1],g,true));
  const kopf=grp(1.9,2.7,0,g);sph(.85,k,0,0,0,kopf,1,1.05,.95);sph(.1,0x111111,.55,.25,.55,kopf);sph(.1,0x111111,.55,.25,-.55,kopf);
  const ohrL=sph(.7,d,-.3,.1,.95,kopf,.18,1,1),ohrR=sph(.7,d,-.3,.1,-.95,kopf,.18,1,1);
  [-.45,.45].forEach(z=>{const z1=cone(.1,.9,0xfff4dc,.7,-.45,z,kopf);z1.rotation.z=-1.1});
  const r=grp(.72,-.15,0,kopf);cyl(.3,1.1,k,0,-.55,0,r);const r2=grp(0,-1.05,0,r);cyl(.25,1,k,0,-.5,0,r2);sph(.26,k,0,-1,0,r2);r.rotation.z=.2;
  cyl(.06,.9,d,-1.85,2.1,0,g).rotation.z=.4;
  g.userData.anim=t=>{r.rotation.z=.2+Math.sin(t*1.3)*.2;r2.rotation.z=-.15+Math.sin(t*1.3+1)*.3;ohrL.rotation.y=Math.sin(t*1.8)*.18;ohrR.rotation.y=-Math.sin(t*1.8)*.18};return g}
function giraffe(par){const g=grp(0,0,0,par),f=0xe8b24a,fl=0x8b5a2b;
  sph(1,f,0,3.4,0,g,1.5,.8,.7).castShadow=true;[[-.95,.4],[-.95,-.4],[.95,.4],[.95,-.4]].forEach(p=>cyl(.15,3,f,p[0],1.5,p[1],g,true));
  [[-.5,3.9,.55],[.4,3.8,-.55],[.9,3.4,.6],[-.9,3.3,-.6],[0,3.75,0]].forEach(p=>sph(.28,fl,p[0],p[1],p[2],g,1,.8,.3));
  const hals=grp(1.2,3.9,0,g);const h1=cyl(.24,2.6,f,.5,1.2,0,hals);h1.rotation.z=-.35;
  const kopf=grp(1.55,2.5,0,hals);box(.8,.4,.38,f,.35,0,0,kopf,true);box(.3,.3,.36,0xd89a3a,.8,-.02,0,kopf);cyl(.05,.35,fl,0,.3,.12,kopf);cyl(.05,.35,fl,0,.3,-.12,kopf);sph(.1,fl,0,.5,.12,kopf);sph(.1,fl,0,.5,-.12,kopf);sph(.06,0x111111,.45,.1,.2,kopf);sph(.06,0x111111,.45,.1,-.2,kopf);
  [[.4,1.5,.15],[.2,.8,-.2],[.7,2,-.1]].forEach(p=>sph(.17,fl,p[0],p[1],p[2],hals,1,1,.3));
  cyl(.04,.9,fl,-1.45,3.3,0,g).rotation.z=.3;
  g.userData.anim=t=>{hals.rotation.z=Math.sin(t*.7)*.08;kopf.rotation.z=Math.sin(t*1.1)*.12};return g}
function zebra(par){const g=grp(0,0,0,par);
  sph(1,0xf6f6f6,0,1.6,0,g,1.3,.6,.55).castShadow=true;[[-.9,.3],[-.9,-.3],[.9,.3],[.9,-.3]].forEach(p=>cyl(.1,1.4,0x2a2a2a,p[0],.7,p[1],g,true));
  for(let i=-3;i<=3;i++)box(.12,1.05,.56,0x1b1b1b,i*.28,1.65,0,g);
  const hals=grp(1.1,1.9,0,g);const h=box(.34,1.1,.34,0xf6f6f6,.25,.4,0,hals);h.rotation.z=-.5;box(.1,1,.36,0x1b1b1b,.05,.45,0,hals).rotation.z=-.5;
  const kopf=grp(1.7,2.6,0,g);box(.7,.34,.32,0xf6f6f6,.25,-.05,0,kopf,true);box(.25,.28,.3,0x2a2a2a,.65,-.1,0,kopf);box(.08,.25,.12,0x2a2a2a,0,.25,.1,kopf);box(.08,.25,.12,0x2a2a2a,0,.25,-.1,kopf);sph(.05,0x111111,.4,.05,.17,kopf);sph(.05,0x111111,.4,.05,-.17,kopf);
  const sw=grp(-1.4,1.7,0,g);cyl(.05,.9,0x1b1b1b,0,-.4,0,sw);
  g.userData.anim=t=>{sw.rotation.z=Math.sin(t*3)*.3;kopf.rotation.z=Math.sin(t*.9)*.1};return g}
function pinguin(par){const g=grp(0,0,0,par);
  sph(.5,0x20262e,0,.8,0,g,.85,1.4,.75,true).castShadow=true;sph(.4,0xffffff,.14,.72,0,g,.7,1.3,.62);sph(.32,0x20262e,0,1.55,0,g);sph(.05,0xffffff,.2,1.6,.15,g);sph(.05,0xffffff,.2,1.6,-.15,g);sph(.03,0x111111,.23,1.6,.15,g);sph(.03,0x111111,.23,1.6,-.15,g);
  cone(.1,.3,0xf59e3f,.36,1.5,0,g).rotation.z=-Math.PI/2;box(.3,.06,.18,0xf59e3f,.1,.03,.2,g);box(.3,.06,.18,0xf59e3f,.1,.03,-.2,g);
  const fa=box(.1,.6,.3,0x20262e,0,.95,.5,g),fb=box(.1,.6,.3,0x20262e,0,.95,-.5,g);
  g.userData.anim=t=>{g.rotation.x=Math.sin(t*3)*.08;fa.rotation.x=Math.sin(t*2)*.2;fb.rotation.x=-Math.sin(t*2)*.2};return g}
function flamingo(par){const g=grp(0,0,0,par),p=0xf48fb1;
  sph(.5,p,0,1.9,0,g,1.2,.75,.7).castShadow=true;cyl(.04,1.7,0xe8799a,0,.85,.12,g);cyl(.04,1.1,0xe8799a,0,1.2,-.14,g).rotation.z=.5;
  const hals=grp(.5,2.1,0,g);cyl(.07,.9,p,.1,.4,0,hals).rotation.z=-.3;const kopf=grp(.35,.95,0,hals);sph(.17,p,0,0,0,kopf);cone(.07,.35,0x30262a,.25,-.04,0,kopf).rotation.z=-Math.PI/2;sph(.03,0x111111,.1,.05,.12,kopf);sph(.03,0x111111,.1,.05,-.12,kopf);
  sph(.3,0xf06a9c,-.4,1.95,0,g,1.3,.4,.8);
  g.userData.anim=t=>{hals.rotation.z=Math.sin(t*1.2)*.12;kopf.rotation.z=Math.sin(t*2.2)*.25};return g}
function affe(par){const g=grp(0,0,0,par),f=0x8a5a32;
  sph(.4,f,0,1.0,0,g,.8,1.1,.7).castShadow=true;sph(.32,f,.06,1.65,0,g);sph(.22,0xe8c9a0,.28,1.6,0,g,.7,.9,.9);sph(.04,0x111111,.42,1.68,.1,g);sph(.04,0x111111,.42,1.68,-.1,g);sph(.12,0xe8c9a0,0,1.7,.32,g);sph(.12,0xe8c9a0,0,1.7,-.32,g);
  const a1=cyl(.08,.9,f,.1,1.1,.4,g),a2=cyl(.08,.9,f,.1,1.1,-.4,g);cyl(.1,.7,f,-.05,.35,.2,g);cyl(.1,.7,f,-.05,.35,-.2,g);
  const t1=cyl(.05,1.2,f,-.5,.9,0,g);t1.rotation.z=.9;
  g.userData.anim=t=>{a1.rotation.z=Math.sin(t*2.5)*.4;a2.rotation.z=-Math.sin(t*2.5)*.4;g.position.y=(g.userData.y0||0)+Math.max(0,Math.sin(t*1.6))*.25};return g}
function schaf(par){const g=grp(0,0,0,par);
  sph(.6,0xf4f0e6,0,.95,0,g,1.3,.95,.95).castShadow=true;[[.35,.55,.4],[-.4,.5,-.4],[.5,.5,-.3],[-.5,.45,.35],[0,.72,0],[-.1,.5,.5]].forEach(p=>sph(.36,0xf8f5ee,p[0],p[1]+.5,p[2],g));
  [[-.5,.3],[-.5,-.3],[.5,.3],[.5,-.3]].forEach(p=>cyl(.07,.7,0x3a3030,p[0],.35,p[1],g));
  const kopf=grp(.85,1.1,0,g);box(.5,.4,.32,0x3a3030,.1,0,0,kopf,true);box(.07,.3,.14,0x3a3030,-.05,.02,.2,kopf);box(.07,.3,.14,0x3a3030,-.05,.02,-.2,kopf);sph(.04,0xf4f0e6,.3,.08,.12,kopf);sph(.04,0xf4f0e6,.3,.08,-.12,kopf);
  g.userData.anim=t=>{kopf.rotation.z=-.4+Math.sin(t*1.4)*.35};return g}
function bank(x,z,rot){const g=grp(x,0,z);box(2.4,.15,.8,0x9a5a30,0,.7,0,g,true);box(2.4,.7,.1,0x9a5a30,0,1.1,-.35,g);box(.12,.7,.7,0x6a4220,-1,.35,0,g);box(.12,.7,.7,0x6a4220,1,.35,0,g);g.rotation.y=rot||0;kreis(x,z,1.2);return g}
function laterne(x,z){const g=grp(x,0,z);cyl(.08,3.4,0x3a4a56,0,1.7,0,g,true);const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xfff0b8}));l.position.y=3.5;l.scale.setScalar(.35);g.add(l);kreis(x,z,.3)}
function beet(x,z){const g=grp(x,0,z);box(2.6,.35,1.2,0x8b5a2b,0,.18,0,g);box(2.3,.2,.9,0x6b4a2f,0,.38,0,g);const f=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0];for(let i=0;i<8;i++)blume(x-1+i*.28,z+((i%2)-.5)*.5,f[i%5]);kreis(x,z,1.4)}
function tonne(x,z){cyl(.4,1,0x4a7a5a,x,.5,z,scene,true);cyl(.44,.12,0x3a6a4a,x,1.05,z,scene);kreis(x,z,.5)}
const SCHMUCK=[bank,laterne,beet,tonne];
function akazie(x,z){const a=grp(x,0,z);cyl(.3,3.4,0x7a5230,0,1.7,0,a,true);sph(1,0x6aa84a,0,3.6,0,a,3.2,.5,3.2).castShadow=true;kreis(x,z,.5)}
const BPTS=[[0,104],[0,35],[-70,35],[70,35],[0,-35],[-70,-35],[70,-35],[0,-100],[-60,-100],[60,-100],[0,70],[-40,98],[40,98],[0,-60],[0,-130],[-90,-60],[90,-60]];
function paradeBauen(){const liste=[[elefant,.65],[giraffe,.6],[zebra,.8],[pinguin,1.3],[affe,1.2],[flamingo,1],[schaf,1],[pinguin,1.3]];liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
function weltBauen(){
FARBEN=WINTER?{boden:0xd5e4ee,pfad:0xe9dcc0,platz:0xf6e4b8,gehege:0xe8e0c8}:{boden:0x93cf72,pfad:0xe8d5a0,platz:0xf0dfae,gehege:0xd9c48a};
const boden=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200),mat(FARBEN.boden));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
pfad(0,GRENZE.z1,0,TORZ+2,5);pfad(-92,35,92,35,4);pfad(-100,-35,100,-35,4);pfad(-92,-100,92,-100,4);pfad(0,TORZ+2,0,GRENZE.z0+4,5,FARBEN.platz);
for(const k in BEREICHE){const b=BEREICHE[k];const c=cyl(k==='eingang'?14:10,.07,FARBEN.pfad,b.x,.035,b.z);scene.add(c);c.receiveShadow=true}
const fest=cyl(17,.08,FARBEN.platz,FEST.x,.04,FEST.z);scene.add(fest);
/* ---------- Bäume (instanziert, wenige) ---------- */
const baumListe=[];
function frei(x,z){for(const k in BEREICHE){const b=BEREICHE[k];if(Math.hypot(x-b.x,z-b.z)<24)return false}
  for(const e of EXTRAZONEN){if(Math.hypot(x-e.x,z-e.z)<30)return false}if(Math.abs(x)<6&&z>TORZ+2)return false;for(const w of SEITENWEGE){if(Math.abs(z-w)<9&&Math.abs(x)<110)return false}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<24)return false;if(Math.abs(x)<5&&z<TORZ)return false;return true}
for(let i=0;i<520;i++){const x=GRENZE.x0+6+rnd()*(GRENZE.x1-GRENZE.x0-12),z=GRENZE.z0+6+rnd()*(GRENZE.z1-GRENZE.z0-12);if(frei(x,z))baumListe.push({x,z,s:.8+rnd()*.5})}
for(let x=GRENZE.x0;x<=GRENZE.x1;x+=6){if(Math.abs(x)>8)baumListe.push({x,z:GRENZE.z1,s:1.2});baumListe.push({x,z:GRENZE.z0,s:1.2});if(Math.abs(x)>3.5)baumListe.push({x,z:TORZ,s:1})}
for(let z=GRENZE.z0;z<=GRENZE.z1;z+=6){baumListe.push({x:GRENZE.x0,z,s:1.2});baumListe.push({x:GRENZE.x1,z,s:1.2})}
const BAUMTEIL=WINTER?
  [[gCyl,0x7a5230,0,.9,0,.28,1.8,.28],[gCone,0x2f6b4a,0,2.6,0,1.7,2.7,1.7],[gCone,0x37805a,0,4.1,0,1.35,2.4,1.35],[gCone,0xffffff,0,3.15,0,1.25,1.6,1.25],[gCone,0xffffff,0,4.7,0,.95,1.4,.95],[gCone,0x3e9468,0,5.5,0,.8,1.6,.8]]:
  [[gCyl,0x7a5230,0,1.3,0,.36,2.6,.36],[gSph,0x4aa84e,0,3.9,0,2.1,1.8,2.1],[gSph,0x5cba5c,1.2,3.4,.6,1.5,1.3,1.5],[gSph,0x3f9a46,-1.2,3.5,-.5,1.6,1.4,1.6]];
(function(){const n=baumListe.length;
  const ms=BAUMTEIL.map(m=>{const im=new THREE.InstancedMesh(m[0],mat(m[1]),n);im.frustumCulled=false;scene.add(im);return im});ms[1].castShadow=true;
  const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),SC=new THREE.Vector3();
  baumListe.forEach((t,i)=>{const s=t.s;BAUMTEIL.forEach((m,k)=>{P.set(t.x+m[2]*s,m[3]*s,t.z+m[4]*s);SC.set(m[5]*s,m[6]*s,m[7]*s);M.compose(P,Q,SC);ms[k].setMatrixAt(i,M)});kreis(t.x,t.z,.9*s)});
  ms.forEach(m=>m.instanceMatrix.needsUpdate=true)})();
WASSER=WINTER?0xbfe6f4:0x4aa3d8;
/* Eingang */
(function(){const b=BEREICHE.eingang;tor(0,b.z+17,12);const s=schildText(CONFIG.spielname,'#fff8e6',7.5,1.6,CONFIG.spielname.length>12?44:60);s.position.set(0,6.6,b.z+17.3);scene.add(s);
  haus(b.x-17,b.z+3,4,3.5,0xc98a4b,0xb94a3a);kreis(b.x-17,b.z+3,2.6);const ks=schildText('Kasse','#ffe9a8',2.6,.9);ks.position.set(b.x-17,3.4,b.z+4.8);scene.add(ks);
  haus(b.x+17,b.z+3,4,3.5,0x6ab0d8,0xe0605a);kreis(b.x+17,b.z+3,2.6);const es=schildText('Eis & Getränke','#e8f6ff',3.4,.9,40);es.position.set(b.x+17,3.4,b.z+4.8);scene.add(es);
  const bank=grp(b.x+7,0,b.z+9);box(2.4,.15,.8,0x9a5a30,0,.7,0,bank);box(2.4,.7,.1,0x9a5a30,0,1.1,-.35,bank);box(.12,.7,.7,0x6a4220,-1,.35,0,bank);box(.12,.7,.7,0x6a4220,1,.35,0,bank);kreis(b.x+7,b.z+9,1.3);
  const br=grp(b.x,0,b.z-14);cyl(2.2,.5,0xb8bec4,0,.25,0,br,true);cyl(1.8,.2,WASSER,0,.5,0,br);cyl(.25,1.6,0xb8bec4,0,1,0,br);sph(.5,0xdff4ff,0,2,0,br);kreis(b.x,b.z-14,2.4);
  wegweiser(-6,b.z-8,'Savanne →',0);wegweiser(6,b.z-8,'← Pinguine',0);wegweiser(3.5,b.z-20,'Affen ↑',0);
  if(!WINTER){const f=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0];for(let i=0;i<26;i++){const a=rnd()*6.28,rr=3+rnd()*2;blume(b.x-11+Math.cos(a)*rr,b.z+10+Math.sin(a)*rr*.6,f[i%5]);blume(b.x+13+Math.cos(a)*rr,b.z+12+Math.sin(a)*rr*.6,f[(i+2)%5])}}
  else{[ -11,13].forEach(x=>{const m=grp(b.x+x,0,b.z+11);sph(.8,0xffffff,0,.8,0,m);sph(.6,0xffffff,0,1.9,0,m);sph(.42,0xffffff,0,2.8,0,m);box(.5,.4,.5,0x3a4a56,0,3.3,0,m)})}})();
/* Savanne */
(function(){const b=BEREICHE.savanne;const bo=cyl(19,.12,FARBEN.gehege,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;zaun(b.x,b.z,19,60,Math.PI);
  tier(giraffe,b.x-8,b.z-14,b.x,b.z,1,1.4);tier(giraffe,b.x+4,b.z-16,b.x,b.z,1.15,1.4);tier(elefant,b.x-17,b.z+8,b.x,b.z,1,2.6);tier(elefant,b.x+14,b.z+13,b.x,b.z,.75,2);
  tier(zebra,b.x+14,b.z-12,b.x,b.z,1,1.4);tier(zebra,b.x+17,b.z-7,b.x,b.z,1,1.4);tier(zebra,b.x+13,b.z+4,b.x,b.z,.9,1.3);
  [[-4,-8],[12,6]].forEach(p=>{const a=grp(b.x+p[0],0,b.z+p[1]);cyl(.3,3.4,0x7a5230,0,1.7,0,a,true);sph(1,0x6aa84a,0,3.6,0,a,3.2,.5,3.2).castShadow=true;kreis(b.x+p[0],b.z+p[1],.5)});
  felsen(b.x-14,b.z-12,1.8);felsen(b.x+18,b.z+1,1.2);const w=wasserFl(b.x+2,b.z+16,3,WASSER);wegweiser(b.x-20.5,b.z+1,'Savanne',Math.PI/2)})();
/* Pinguinteich */
(function(){const b=BEREICHE.teich;const bo=cyl(19,.12,0xd8d2c0,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;wasserFl(b.x,b.z,7.5,WASSER);wasserFl(b.x-1,b.z+1,4,WINTER?0xe6f6ff:0x6ec0ea);
  for(let i=0;i<24;i++){const a=i/24*6.283;felsen(b.x+Math.cos(a)*8,b.z+Math.sin(a)*8,.5+rnd()*.35)}kreis(b.x,b.z,7);
  [[6,-3],[5,0],[4,-5],[7,-6]].forEach((p,i)=>tier(pinguin,b.x+p[0],b.z+p[1],b.x,b.z,1.3,.6));tier(pinguin,b.x-4,b.z-2,b.x,b.z,1.2);
  tier(flamingo,b.x+1,b.z+10,b.x,b.z,1,.5);tier(flamingo,b.x+4,b.z+11,b.x,b.z,1,.5);tier(flamingo,b.x-2,b.z+11.5,b.x,b.z,1.1,.5);tier(flamingo,b.x+7,b.z+9.5,b.x,b.z,.95,.5);
  for(let i=0;i<10;i++){const a=2.2+i*.3;cyl(.05,1.6,0xc9b97a,b.x+Math.cos(a)*9.6,.8,b.z+Math.sin(a)*9.6,scene)}
  const fels=grp(b.x-3,0,b.z-6);felsen(0,0,1.6,fels);felsen(1.5,.5,1.1,fels);wegweiser(b.x+17,b.z+1,'Pinguinteich',-Math.PI/2)})();
/* Affen und Schafe */
(function(){const b=BEREICHE.wiese;
  const fz=grp(b.x-12,0,b.z-11);[[0,0,2.4],[2.2,.5,1.8],[-2,.6,1.7],[.4,2,1.5],[-1.5,2.6,1],[1.6,2.7,.9]].forEach(p=>felsen(p[0],p[1]*.9,p[2],fz));
  const a1=tier(affe,b.x-12,b.z-11,b.x,b.z,1.2);a1.position.y=2.7;a1.userData.y0=2.7;const a2=tier(affe,b.x-9.5,b.z-10,b.x,b.z,1.1);a2.position.y=1.3;a2.userData.y0=1.3;const a3=tier(affe,b.x-14.5,b.z-8,b.x,b.z,1,.6);kreis(b.x-12,b.z-11,3);
  const pa=grp(b.x-6,0,b.z-14);cyl(.35,7,0x8a5a32,0,3.5,0,pa,true);[[0,0],[2,.5],[-2,.5],[.7,-1.8],[-.7,1.8]].forEach(p=>{const bl=cone(1.1,4,0x4aa84e,p[0]*1.1,7+p[1]*.3,p[1]*1.1,pa);bl.rotation.z=p[0]*.28;bl.rotation.x=p[1]*.28});kreis(b.x-6,b.z-14,.6);
  zaun(b.x+14,b.z-12,6.5,26,Math.PI*.6);const heu=cyl(.7,1.2,0xe8c850,b.x+17,.6,b.z-15,scene);heu.rotation.z=Math.PI/2;kreis(b.x+17,b.z-15,1.2);
  [[12,-11],[15,-9],[13,-14],[16,-13]].forEach((p,i)=>tier(schaf,b.x+p[0],b.z+p[1],b.x,b.z,1,.9));
  wegweiser(b.x-6,b.z-5,'Affen und Schafe',0)})();
/* Ausgang (Tor wird geöffnet) */
ausgang=(function(){const g=grp(0,0,TORZ);[-1,1].forEach(s=>{box(1.4,6,1.4,0x9a7a5a,s*4.2,3,0,g,true);box(1.8,.5,1.8,0xffffff,s*4.2,6.2,0,g)});box(10.6,1,.7,0x3e9468,0,6.2,0,g,true);
  const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.2,.4);g.add(s);
  const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,0x8b5d2e,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,0xd8b878,s*-1.9+(i-2)*.7,1.9,0,p);return p});
  kreis(-4.2,TORZ,.9);kreis(4.2,TORZ,.9);return {g,fl,offen:0}})();
/* Festplatz */
(function(){const z0=FEST.z;const bue=grp(0,0,z0-12);box(16,1,6,0xb94a3a,0,.5,0,bue,true);box(16.4,.3,6.4,0xf6e4b8,0,1.05,0,bue);[-1,1].forEach(s=>{box(.5,7,.5,0x6a4220,s*8,3.5,-2.6,bue,true)});box(16.6,1.2,.5,0xe0605a,0,7,-2.6,bue);
  const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.2,-2.4);bue.add(gs);kreis(0,z0-12,9);
  const farben=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4,0xf59e3f];for(let i=0;i<24;i++){const t=i/23;const x=-14+t*28,y=6.4-Math.sin(t*Math.PI)*2.2;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:farben[i%5]}));l.position.set(x,y,z0-8);l.scale.setScalar(.28);scene.add(l)}
  [-14,14].forEach(x=>{cyl(.15,7,0x6a4220,x,3.5,z0-8,scene,true)})})();
(function(){let n=0;for(let z=GRENZE.z1-12;z>TORZ+4;z-=16){let nah=false;for(const k in BEREICHE){if(Math.abs(z-BEREICHE[k].z)<17)nah=true}for(const w of SEITENWEGE){if(Math.abs(z-w)<9)nah=true}if(nah)continue;
  const side=(n%2?1:-1),f=SCHMUCK[n%4];f===bank?bank(side*5.2,z,side>0?-Math.PI/2:Math.PI/2):f(side*5.2,z);n++}})();
(function(){const b=EXTRAZONEN[0];const bo=cyl(15,.12,0xe8d8a8,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;pfad(b.x,b.z,0,b.z,3.5);
  const sk=grp(b.x-6,0,b.z+5);box(5,.4,.3,0x8b5a2b,0,.2,2.5,sk);box(5,.4,.3,0x8b5a2b,0,.2,-2.5,sk);box(.3,.4,5,0x8b5a2b,2.5,.2,0,sk);box(.3,.4,5,0x8b5a2b,-2.5,.2,0,sk);box(4.7,.3,4.7,0xf0d890,0,.15,0,sk);sph(.35,0xe0605a,.8,.45,.5,sk,1,.8,1);kreis(b.x-6,b.z+5,3.4);
  const ru=grp(b.x+5,0,b.z-4);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>cyl(.12,3,0xd8433a,p[0]*1.2,1.5,p[1]*1.2,ru,true));box(3,.2,3,0xf59e3f,0,3,0,ru,true);const ra=box(1.7,.15,5.4,0x3b8fc4,0,1.5,4.2,ru,true);ra.rotation.x=.57;box(.12,.4,5.4,0x2a6f9e,-.85,1.7,4.2,ru).rotation.x=.57;box(.12,.4,5.4,0x2a6f9e,.85,1.7,4.2,ru).rotation.x=.57;
  for(let i=0;i<5;i++)box(1.2,.1,.1,0xd8433a,0,.5+i*.5,-1.5,ru);kreis(b.x+5,b.z-4,2.4);
  const sc=grp(b.x-5,0,b.z-8);[-1,1].forEach(x=>{const a=cyl(.1,3.4,0x3a4a56,x*2.4,1.7,0,sc,true);});cyl(.08,5,0x3a4a56,0,3.4,0,sc).rotation.z=Math.PI/2;
  const sitze=[-1,1].map(x=>{const p=grp(x*1,3.4,0,sc);cyl(.03,2,0x666,-.5,-1,0,p);cyl(.03,2,0x666,.5,-1,0,p);box(1.2,.12,.5,x>0?0xe0605a:0x4caf6a,0,-2,0,p,true);return p});
  lebendig.push({o:{userData:{anim:t=>{sitze[0].rotation.z=Math.sin(t*1.6)*.35;sitze[1].rotation.z=Math.sin(t*1.6+1.5)*.35}}},ph:0});kreis(b.x-5-2.4,b.z-8,.4);kreis(b.x-5+2.4,b.z-8,.4);
  const wi=grp(b.x+7,0,b.z+7);cyl(.3,.6,0x666,0,.3,0,wi);const pl=box(4.6,.15,.5,0xf5d442,0,.8,0,wi,true);lebendig.push({o:{userData:{anim:t=>{pl.rotation.z=Math.sin(t*1.3)*.18}}},ph:0});kreis(b.x+7,b.z+7,.6);
  wegweiser(6,b.z+3.5,'← Spielplatz',Math.PI/2*0)})();
/* Picknickplatz (rechts hinten) */
(function(){const b=EXTRAZONEN[1];const bo=cyl(15,.12,0xdcecc0,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;pfad(b.x,b.z,0,b.z,3.5);
  [[-6,4],[4,6],[7,-5]].forEach((p,i)=>{const g=grp(b.x+p[0],0,b.z+p[1]);box(2.4,.12,1.2,0xa8743f,0,.9,0,g,true);[-1,1].forEach(s=>{box(.12,.9,.9,0x6a4220,s*1,.45,0,g)});box(2.4,.1,.5,0x9a5a30,0,.5,.95,g);box(2.4,.1,.5,0x9a5a30,0,.5,-.95,g);cyl(.06,2.8,0x6a4220,0,1.4,0,g);cone(1.6,.6,i%2?0xe0605a:0x3b8fc4,0,2.9,0,g,true);kreis(b.x+p[0],b.z+p[1],1.8)});
  const w=haus(b.x-4,b.z-8,5.4,3.6,0xf5d442,0xe0605a);kreis(b.x-4,b.z-8,3);const ws=schildText('Snacks','#fff0b0',2.8,.9);ws.position.set(b.x-4,3.4,b.z-6.1);scene.add(ws);
  tonne(b.x+9,b.z+8);sph(.4,0xe0605a,b.x+6,.4,b.z+1,scene);sph(.4,0x3b8fc4,b.x+6.8,.4,b.z+1.4,scene);
  wegweiser(-6,b.z+3.5,'Picknick →',0)})();
/* Elefantenpark (rechts Mitte) */
(function(){const b=EXTRAZONEN[2];const bo=cyl(26,.12,0xd9c48a,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;zaun(b.x,b.z,26,80,Math.PI);
  tier(elefant,b.x-8,b.z-12,b.x,b.z,1.2,2.8);tier(elefant,b.x+11,b.z-6,b.x,b.z,1,2.4);tier(elefant,b.x+3,b.z+14,b.x,b.z,.9,2.2);tier(elefant,b.x-13,b.z+10,b.x,b.z,.55,1.4);
  wasserFl(b.x+14,b.z+10,5.5,WASSER);felsen(b.x+19,b.z-2,2);felsen(b.x-18,b.z-10,1.6);akazie(b.x-2,b.z-4);akazie(b.x+8,b.z+4);akazie(b.x-16,b.z+3);
  wegweiser(b.x-29,b.z+3,'Elefantenpark',Math.PI/2)})();
/* Giraffenwiese (links Mitte) */
(function(){const b=EXTRAZONEN[3];const bo=cyl(26,.12,0xcfd89a,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;zaun(b.x,b.z,26,80,0);
  tier(giraffe,b.x-10,b.z-12,b.x,b.z,1.1,1.4);tier(giraffe,b.x+4,b.z-14,b.x,b.z,1.25,1.4);tier(giraffe,b.x+12,b.z+4,b.x,b.z,1,1.4);tier(giraffe,b.x-12,b.z+10,b.x,b.z,.7,1.1);
  tier(zebra,b.x-16,b.z-2,b.x,b.z,1,1.4);tier(zebra,b.x+2,b.z+13,b.x,b.z,1,1.4);
  akazie(b.x-3,b.z-3);akazie(b.x+9,b.z-8);akazie(b.x-9,b.z+3);akazie(b.x+4,b.z+6);felsen(b.x+17,b.z+10,1.8);
  wegweiser(b.x+29,b.z+3,'Giraffenwiese',-Math.PI/2)})();
(function(){const jc=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0xe0605a,0x9b6fd0,0x4caf6a],hc=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a,0xe8c24a,0x2a1d14,0xb5651d,0x6b4626],st=['kurz','zoepfe','cap','pferd','kurz','zoepfe','cap','pferd','kurz','zoepfe'];
  for(let i=0;i<16;i++){const f=besucherFigur(Object.assign({},AVATARE[(i+1)%AVATARE.length],{jacke:jc[i%10],haar:hc[(i*3)%10],stil:st[i%10]}));const p=BPTS[(i*2)%BPTS.length];f.g.position.set(p[0]+(rnd()-.5)*2,0,p[1]);f.ziel=BPTS[(i*3+1)%BPTS.length];f.v=1.8+rnd()*.8;besucher.push(f)}})();
}
