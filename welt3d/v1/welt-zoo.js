/* Welt: Zoo (Kennwort zoo). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
const MASKOTTCHEN='Wilma Waschbär';
const START={x:0,z:94};
const BEREICHE={
  eingang:{name:'Eingangsplatz',x:0,z:92,plaetze:[]},
  savanne:{name:'Savanne',x:88,z:32,plaetze:[]},
  teich:{name:'Pinguinteich',x:-88,z:32,plaetze:[]},
  wiese:{name:'Affen und Schafe',x:0,z:-60,plaetze:[]}
};
const EXTRAZONEN=[{name:'Spielplatz',x:-88,z:-100,r:15},{name:'Picknick',x:88,z:-100,r:15},{name:'Elefantenpark',x:95,z:-35,r:26},{name:'Giraffenwiese',x:-95,z:-35,r:26},{name:'Löwen',x:-45,z:70,r:19},{name:'Tiger',x:45,z:70,r:19},{name:'Nilpferde',x:-45,z:0,r:20},{name:'Eisbären',x:45,z:0,r:19},{name:'Kängurus',x:-45,z:-68,r:19},{name:'Bären',x:45,z:-68,r:19},{name:'Streichelzoo',x:-45,z:102,r:11},{name:'Seehunde',x:45,z:102,r:12},{name:'Papageien',x:-45,z:-132,r:12},{name:'Reptilien',x:45,z:-132,r:14}];
const SEITENWEGE=[35,-35,-100];
const WEGBOGEN=11;
const GRENZE={x0:-125,x1:125,z0:-215,z1:115};
const TORZ=-160, FEST={x:0,z:-190};
let FARBEN,WASSER,ausgang;
function pfad(x1,z1,x2,z2,w,farbe){weg(wellen(x1,z1,x2,z2),w,farbe)}
function elefant(par){const g=grp(0,0,0,par),k=0x9aa0a8,d=0x868c94;
  sph(1.5,k,0,2.2,0,g,1.25,.95,.85).castShadow=true;[[-1.1,.7],[-1.1,-.7],[1.1,.7],[1.1,-.7]].forEach(p=>cyl(.38,1.6,k,p[0],.8,p[1],g,true));
  const kopf=grp(1.9,2.7,0,g);sph(.85,k,0,0,0,kopf,1,1.05,.95);sph(.1,0x111111,.55,.25,.55,kopf);sph(.1,0x111111,.55,.25,-.55,kopf);
  const ohrL=sph(.7,d,-.3,.1,.95,kopf,.18,1,1),ohrR=sph(.7,d,-.3,.1,-.95,kopf,.18,1,1);
  [-.45,.45].forEach(z=>{const z1=cone(.1,.9,0xfff4dc,.7,-.45,z,kopf);z1.rotation.z=-1.1});
  const r=grp(.72,-.15,0,kopf);cyl(.3,1.1,k,0,-.55,0,r);const r2=grp(0,-1.05,0,r);cyl(.25,1,k,0,-.5,0,r2);sph(.26,k,0,-1,0,r2);r.rotation.z=.2;
  cyl(.06,.9,d,-1.85,2.1,0,g).rotation.z=.4;
  g.userData.anim=t=>{r.rotation.z=.2+Math.sin(t*1.3)*.2;r2.rotation.z=-.15+Math.sin(t*1.3+1)*.3;ohrL.rotation.y=Math.sin(t*1.8)*.18;ohrR.rotation.y=-Math.sin(t*1.8)*.18};return g}
function giraffe(par){const g=grp(0,0,0,par),f=0xe8b24a,fl=0x8b5a2b;
  sph(1.05,f,0,3.4,0,g,1.5,.85,.75).castShadow=true;
  [[-.95,.45],[-.95,-.45],[.95,.45],[.95,-.45]].forEach(p=>{cyl(.2,3,f,p[0],1.5,p[1],g,true);cyl(.22,.35,fl,p[0],.17,p[1],g)});
  [[-.6,3.9],[.2,3.95],[.8,3.6],[-.9,3.4],[-.2,3.35],[.5,3.15],[-.7,3.0]].forEach(q=>{const u=q[0]/1.575,v=(q[1]-3.4)/.8925,zz=.7875*Math.sqrt(Math.max(.05,1-u*u-v*v));[-1,1].forEach(sg=>sph(.3,fl,q[0],q[1],sg*zz,g,1,.8,.25))});
  const hals=grp(1.2,3.9,0,g);cyl(.38,2.8,f,.5,1.3,0,hals).rotation.z=-.35;box(.1,2.7,.14,fl,.22,1.4,0,hals).rotation.z=-.35;
  [-.9,-.3,.3,.9].forEach(t=>[-1,1].forEach(sg=>sph(.15,fl,.5+.342*1.4*t,1.3+.94*1.4*t,sg*.37,hals,1,1,.3)));
  const kopf=grp(1.0,2.65,0,hals);sph(.46,f,.28,0,0,kopf,1.35,.75,.75).castShadow=true;sph(.2,0xd89a3a,.7,-.07,0,kopf,1,.75,.85);sph(.04,0x3a2a1a,.88,-.02,.0,kopf);
  [-1,1].forEach(z=>{cyl(.05,.4,fl,.0,.33,z*.14,kopf);sph(.09,fl,0,.55,z*.14,kopf);sph(.1,f,-.08,.12,z*.3,kopf,1.6,.5,.8);sph(.065,0x111111,.45,.1,z*.27,kopf)});
  cyl(.05,1,fl,-1.5,3.3,0,g).rotation.z=.3;sph(.14,fl,-1.65,2.8,0,g);
  g.userData.anim=t=>{hals.rotation.z=Math.sin(t*.7)*.08;kopf.rotation.z=Math.sin(t*1.1)*.12};return g}
function zebra(par){const g=grp(0,0,0,par),w=0xf6f6f6,s=0x1b1b1b;
  sph(1,w,0,1.6,0,g,1.3,.6,.55).castShadow=true;
  for(let i=-5;i<=5;i++){const x=i*.22,k=Math.sqrt(Math.max(0,1-(x/1.3)*(x/1.3)));if(k>.2)sph(1,s,x,1.6,0,g,.045,.6*k+.015,.55*k+.015)}
  [[-.9,.3],[-.9,-.3],[.9,.3],[.9,-.3]].forEach(p=>{cyl(.13,1.4,w,p[0],.7,p[1],g,true);cyl(.14,.3,s,p[0],.15,p[1],g);[.55,.95,1.25].forEach(y=>cyl(.137,.07,s,p[0],y,p[1],g))});
  const hals=grp(1.1,1.9,0,g);cyl(.22,1.2,w,.25,.4,0,hals).rotation.z=-.5;box(.07,1.15,.1,s,.06,.5,0,hals).rotation.z=-.5;
  [-.45,-.15,.15,.45].forEach(t=>{cyl(.235,.07,s,.25+.479*t*1.2,.4+.878*t*1.2,0,hals).rotation.z=-.5});
  const kopf=grp(1.7,2.6,0,g);sph(.3,w,.2,-.05,0,kopf,1.5,.8,.75).castShadow=true;sph(.17,0x2a2a2a,.58,-.12,0,kopf,1,.8,.9);
  [.0,.14].forEach(x=>sph(1,s,x,-.05,0,kopf,.03,.245,.23));
  [-1,1].forEach(z=>{sph(.06,0x111111,.3,.05,z*.2,kopf);cone(.08,.3,w,0,.25,z*.12,kopf);cone(.04,.2,0x2a2a2a,0,.24,z*.12,kopf)});
  const sw=grp(-1.4,1.7,0,g);cyl(.07,.9,s,0,-.4,0,sw);sph(.12,s,0,-.9,0,sw);
  g.userData.anim=t=>{sw.rotation.z=Math.sin(t*3)*.3;kopf.rotation.z=Math.sin(t*.9)*.1};return g}
function pinguin(par){const g=grp(0,0,0,par);
  sph(.5,0x20262e,0,.8,0,g,.85,1.4,.75,true).castShadow=true;sph(.42,0xffffff,.3,.72,0,g,.6,1.35,.7);sph(.32,0x20262e,0,1.55,0,g);sph(.075,0xffffff,.29,1.6,.13,g);sph(.075,0xffffff,.29,1.6,-.13,g);sph(.04,0x111111,.33,1.6,.13,g);sph(.04,0x111111,.33,1.6,-.13,g);
  cone(.1,.3,0xf59e3f,.36,1.5,0,g).rotation.z=-Math.PI/2;box(.3,.06,.18,0xf59e3f,.1,.03,.2,g);box(.3,.06,.18,0xf59e3f,.1,.03,-.2,g);
  const fa=sph(.3,0x20262e,0,.95,.43,g,.35,1.3,.6),fb=sph(.3,0x20262e,0,.95,-.43,g,.35,1.3,.6);
  g.userData.anim=t=>{g.rotation.x=Math.sin(t*3)*.08;fa.rotation.x=Math.sin(t*2)*.2;fb.rotation.x=-Math.sin(t*2)*.2};return g}
function flamingo(par){const g=grp(0,0,0,par),p=0xf48fb1;
  sph(.5,p,0,1.9,0,g,1.2,.75,.7).castShadow=true;cyl(.04,1.7,0xe8799a,0,.85,.12,g);cyl(.04,1.1,0xe8799a,0,1.2,-.14,g).rotation.z=.5;
  const hals=grp(.5,2.1,0,g);cyl(.07,.9,p,.1,.4,0,hals).rotation.z=-.3;const kopf=grp(.35,.95,0,hals);sph(.17,p,0,0,0,kopf);cone(.07,.35,0x30262a,.25,-.04,0,kopf).rotation.z=-Math.PI/2;sph(.03,0x111111,.1,.05,.12,kopf);sph(.03,0x111111,.1,.05,-.12,kopf);
  sph(.3,0xf06a9c,-.4,1.95,0,g,1.3,.4,.8);
  g.userData.anim=t=>{hals.rotation.z=Math.sin(t*1.2)*.12;kopf.rotation.z=Math.sin(t*2.2)*.25};return g}
function affe(par){const g=grp(0,0,0,par),f=0x8a5a32;
  sph(.45,f,0,1.0,0,g,.85,1.15,.8).castShadow=true;sph(.27,f,.06,1.62,0,g);sph(.19,0xe8c9a0,.25,1.58,0,g,.7,.9,.9);sph(.04,0x111111,.42,1.68,.1,g);sph(.04,0x111111,.42,1.68,-.1,g);sph(.12,0xe8c9a0,0,1.7,.32,g);sph(.12,0xe8c9a0,0,1.7,-.32,g);
  const a1=cyl(.12,.95,f,.1,1.1,.45,g),a2=cyl(.12,.95,f,.1,1.1,-.45,g);cyl(.14,.75,f,-.05,.37,.22,g);cyl(.14,.75,f,-.05,.37,-.22,g);
  const t1=cyl(.08,1.2,f,-.5,.9,0,g);t1.rotation.z=.9;
  g.userData.anim=t=>{a1.rotation.z=Math.sin(t*2.5)*.4;a2.rotation.z=-Math.sin(t*2.5)*.4;g.position.y=(g.userData.y0||0)+Math.max(0,Math.sin(t*1.6))*.25};return g}
function schaf(par){const g=grp(0,0,0,par);
  sph(.6,0xf4f0e6,0,.95,0,g,1.3,.95,.95).castShadow=true;[[.35,.55,.4],[-.4,.5,-.4],[.5,.5,-.3],[-.5,.45,.35],[0,.72,0],[-.1,.5,.5]].forEach(p=>sph(.36,0xf8f5ee,p[0],p[1]+.5,p[2],g));
  [[-.5,.3],[-.5,-.3],[.5,.3],[.5,-.3]].forEach(p=>cyl(.07,.7,0x3a3030,p[0],.35,p[1],g));
  const kopf=grp(.85,1.1,0,g);sph(.27,0x3a3030,.1,0,0,kopf,1.25,1,.85).castShadow=true;[-1,1].forEach(z=>{sph(.1,0x3a3030,-.1,.02,z*.3,kopf,.5,1.4,.7);sph(.065,0xffffff,.33,.08,z*.15,kopf);sph(.035,0x111111,.37,.08,z*.15,kopf)});sph(.12,0xf8f5ee,0,.28,0,kopf);sph(.05,0x1a1a1a,.43,-.04,0,kopf);
  g.userData.anim=t=>{kopf.rotation.z=-.4+Math.sin(t*1.4)*.35};return g}
function bank(x,z,rot){const g=grp(x,0,z);box(2.4,.15,.8,0x9a5a30,0,.7,0,g,true);box(2.4,.7,.1,0x9a5a30,0,1.1,-.35,g);box(.12,.7,.7,0x6a4220,-1,.35,0,g);box(.12,.7,.7,0x6a4220,1,.35,0,g);g.rotation.y=rot||0;kreis(x,z,1.2);return g}
function laterne(x,z){const g=grp(x,0,z);cyl(.08,3.4,0x3a4a56,0,1.7,0,g,true);const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xfff0b8}));l.position.y=3.5;l.scale.setScalar(.35);g.add(l);kreis(x,z,.3)}
function beet(x,z){const g=grp(x,0,z);box(2.6,.35,1.2,0x8b5a2b,0,.18,0,g);box(2.3,.2,.9,0x6b4a2f,0,.38,0,g);const f=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0];for(let i=0;i<8;i++)blume(x-1+i*.28,z+((i%2)-.5)*.5,f[i%5]);kreis(x,z,1.4)}
function tonne(x,z){cyl(.4,1,0x4a7a5a,x,.5,z,scene,true);cyl(.44,.12,0x3a6a4a,x,1.05,z,scene);kreis(x,z,.5)}
const SCHMUCK=[bank,laterne,eiswagen,beet,automat,tonne,bank,laterne];
function akazie(x,z){const a=grp(x,0,z);cyl(.3,3.4,0x7a5230,0,1.7,0,a,true);sph(1,0x6aa84a,0,3.6,0,a,3.2,.5,3.2).castShadow=true;kreis(x,z,.5)}
const BPTS=[[0,104],[0,35],[-70,35],[70,35],[0,-35],[-70,-35],[70,-35],[0,-100],[-60,-100],[60,-100],[0,70],[-40,98],[40,98],[0,-60],[0,-130],[-90,-60],[90,-60],[-30,70],[30,70],[-30,0],[30,0],[-30,-68],[30,-68],[-30,102],[30,102],[-30,-132],[30,-132]];

function loewe(par){const g=grp(0,0,0,par),f=0xd9a24a,m=0x8a5a22;
  sph(.9,f,0,1.3,0,g,1.5,.7,.65).castShadow=true;[[-.95,.4],[-.95,-.4],[.95,.4],[.95,-.4]].forEach(p=>cyl(.22,1,f,p[0],.5,p[1],g,true));
  const kopf=grp(1.5,1.75,0,g);sph(.7,m,-.38,-.02,0,kopf,.7,1.05,1.05);sph(.44,0xe8b86a,.12,-.02,0,kopf);sph(.2,0xf4d8a8,.4,-.12,0,kopf,1,.8,1.1);sph(.07,0x3a2a1a,.6,-.04,0,kopf);sph(.065,0x111111,.5,.14,.2,kopf);sph(.065,0x111111,.5,.14,-.2,kopf);sph(.14,m,0,.42,.3,kopf);sph(.14,m,0,.42,-.3,kopf);
  const sw=grp(-1.45,1.5,0,g);cyl(.08,1.08,f,-.3,-.45,0,sw).rotation.z=2.56;sph(.2,m,-.62,-.92,0,sw);
  g.userData.anim=t=>{sw.rotation.z=Math.sin(t*1.6)*.25;kopf.rotation.z=Math.sin(t*.8)*.06};return g}
function tiger(par){const g=grp(0,0,0,par),f=0xe8832a,s=0x1b1b1b,w=0xfff4e0;
  sph(.9,f,0,1.25,0,g,1.6,.6,.56).castShadow=true;sph(.5,w,.2,.95,0,g,1.9,.3,.7);
  for(let i=-4;i<=4;i++){const x=i*.26,k=Math.sqrt(Math.max(0,1-(x/1.44)*(x/1.44)));sph(1,s,x,1.25,0,g,.04,.54*k+.015,.504*k+.015)}
  [[-1,.38],[-1,-.38],[1,.38],[1,-.38]].forEach(p=>{cyl(.17,1,f,p[0],.5,p[1],g,true);sph(.2,w,p[0]+.06,.08,p[1],g,1.2,.5,1)});
  const kopf=grp(1.65,1.7,0,g);sph(.52,f,0,0,0,kopf);[-1,1].forEach(z=>{sph(.2,w,.18,-.2,z*.34,kopf,1,.8,.8);box(.05,.14,.22,s,.3,-.12,z*.5,kopf);box(.05,.14,.2,s,.18,-.02,z*.52,kopf)});
  sph(.22,w,.42,-.1,0,kopf,1,.8,1.3);sph(.07,0xe8788a,.64,-.02,0,kopf);sph(.06,0x111111,.45,.14,.22,kopf);sph(.06,0x111111,.45,.14,-.22,kopf);
  [-1,1].forEach(z=>{cone(.17,.34,f,-.05,.56,z*.34,kopf);cone(.09,.2,0x3a2a22,0,.55,z*.34,kopf)});
  [-.18,0,.18].forEach(z=>box(.06,.22,.08,s,.36,.4,z,kopf));
  const sw=grp(-1.4,1.3,0,g);{let px=0,py=0;for(let i=0;i<5;i++){const a=i*.2,L=.42;cyl(.11-.01*i,L+.04,(i===1||i===3)?s:f,px-Math.cos(a)*L/2,py+Math.sin(a)*L/2,0,sw).rotation.z=Math.PI/2-a;px-=Math.cos(a)*L;py+=Math.sin(a)*L}sph(.1,s,px,py,0,sw)}
  g.userData.anim=t=>{sw.rotation.z=Math.sin(t*1.8)*.18;sw.rotation.y=Math.sin(t*1.3)*.3;kopf.rotation.z=Math.sin(t*.9)*.08};return g}
function baer(par,farbe){const g=grp(0,0,0,par),f=farbe||0x6b4226,h=0xa07850;
  sph(1,f,0,1.4,0,g,1.3,.95,.85).castShadow=true;[[-.9,.55],[-.9,-.55],[.9,.55],[.9,-.55]].forEach(p=>{cyl(.3,1,f,p[0],.6,p[1],g,true);sph(.3,f,p[0]+.08,.1,p[1],g,1.2,.55,1.05)});
  const kopf=grp(1.6,1.95,0,g);sph(.58,f,0,0,0,kopf);sph(.28,farbe?0xe8e8e0:h,.5,-.14,0,kopf,1,.8,1.05);sph(.1,0x111111,.76,-.06,0,kopf);sph(.06,0x111111,.46,.14,.2,kopf);sph(.06,0x111111,.46,.14,-.2,kopf);sph(.16,f,-.05,.5,.36,kopf);sph(.16,f,-.05,.5,-.36,kopf);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*.9)*.12;kopf.rotation.y=Math.sin(t*.6)*.25};return g}
const eisbaer=par=>baer(par,0xf6f6f0);
function nilpferd(par){const g=grp(0,0,0,par),f=0x8a7a8e;
  sph(1.2,f,0,1.1,0,g,1.4,.75,.85).castShadow=true;[[-.9,.55],[-.9,-.55],[.9,.55],[.9,-.55]].forEach(p=>cyl(.36,.7,f,p[0],.35,p[1],g,true));
  const kopf=grp(1.9,1.35,0,g);sph(.75,f,0,0,0,kopf,1.1,.85,1.05);sph(.6,0x9a8a9e,.6,-.15,0,kopf,1,.75,1.1);sph(.1,0x3a2a3a,1.05,.05,.28,kopf);sph(.1,0x3a2a3a,1.05,.05,-.28,kopf);sph(.1,0x111111,.3,.5,.4,kopf);sph(.1,0x111111,.3,.5,-.4,kopf);sph(.15,f,-.2,.65,.45,kopf);sph(.15,f,-.2,.65,-.45,kopf);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*.9)*.08;kopf.position.y=1.35+Math.sin(t*.9)*.05};return g}
function kaenguru(par){const g=grp(0,0,0,par),f=0xc98a4b,l=0xe8c28a;
  const rumpf=grp(0,0,0,g);sph(.7,f,0,1.5,0,rumpf,.75,1.25,.7).castShadow=true;sph(.4,l,.28,1.35,0,rumpf,.5,1.1,.7);sph(.3,0xa8703a,.5,1.0,0,rumpf,.5,.8,.9);sph(.14,f,.62,1.2,0,rumpf);sph(.03,0x111111,.74,1.24,.07,rumpf);sph(.03,0x111111,.74,1.24,-.07,rumpf);
  [-1,1].forEach(z=>{cyl(.18,.9,f,-.1,.5,z*.3,rumpf,true);box(.9,.14,.2,f,.25,.07,z*.3,rumpf)});
  cone(.35,1.9,f,-1,.55,0,rumpf).rotation.z=1.2;
  const kopf=grp(.45,2.65,0,rumpf);sph(.3,f,0,0,0,kopf,1,1,.9);sph(.16,l,.28,-.06,0,kopf,1.1,.8,.9);sph(.05,0x111111,.42,-.04,0,kopf);sph(.045,0x111111,.2,.1,.16,kopf);sph(.045,0x111111,.2,.1,-.16,kopf);cyl(.07,.55,f,-.05,.45,.14,kopf);cyl(.07,.55,f,-.05,.45,-.14,kopf);
  [-1,1].forEach(z=>cyl(.07,.55,f,.35,1.85,z*.4,rumpf).rotation.z=-.7);
  g.userData.anim=t=>{rumpf.position.y=Math.max(0,Math.sin(t*1.7))*.45;rumpf.rotation.z=Math.sin(t*1.7)*.06;kopf.rotation.z=Math.sin(t*1.1)*.1};return g}
function krokodil(par){const g=grp(0,0,0,par),f=0x4a8a3a,d=0x3a6a2a;
  box(2.6,.45,1,f,0,.45,0,g,true);[[-.9,.55],[-.9,-.55],[.9,.55],[.9,-.55]].forEach(p=>box(.3,.4,.3,d,p[0],.2,p[1],g,true));
  for(let i=0;i<6;i++)box(.2,.14,.3,d,-1+i*.4,.75,0,g);
  box(1.5,.28,.7,f,2,.4,0,g,true);box(.5,.3,.5,f,2.9,.42,0,g);sph(.1,0xf6e060,1.6,.72,.22,g);sph(.1,0xf6e060,1.6,.72,-.22,g);sph(.05,0x111111,1.65,.76,.22,g);sph(.05,0x111111,1.65,.76,-.22,g);
  const sw=grp(-1.3,.4,0,g);box(1.6,.32,.6,f,-.8,0,0,sw);box(1.2,.24,.4,d,-2,0,0,sw);
  g.userData.anim=t=>{sw.rotation.y=Math.sin(t*1.5)*.3};return g}

let GLAS;
function glas(w,h,d,x,y,z,par){GLAS=GLAS||new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.28,depthWrite:false});const m=new THREE.Mesh(gBox,GLAS);m.position.set(x,y,z);m.scale.set(w,h,d);(par||scene).add(m);return m}
function eiswagen(x,z){const g=grp(x,0,z);box(2.2,1.1,1.5,0xfff4e0,0,.95,0,g,true);box(2.4,.15,1.7,0xe8588a,0,1.55,0,g);[-1,1].forEach(s=>cyl(.06,1.3,0x6a4220,s*1.05,2.2,.65,g));
  const d=box(2.5,.12,1.4,0xf59e3f,0,2.75,.2,g,true);d.rotation.x=-.25;cyl(.07,.5,0x6a4220,0,3.0,0,g);cone(.4,1.1,0xe8c28a,0,3.7,0,g).rotation.z=Math.PI;sph(.45,0xf6a8c8,0,4.5,0,g);sph(.3,0xfff0b0,0,5,0,g);box(.5,.3,.4,0x8a8f96,-.5,1.65,.3,g);
  const s=schildText('Eis','#fff0b0',1.6,.7,56);s.position.set(0,1,.78);g.add(s);cyl(.25,.55,0x4a7a5a,1.9,.28,.3,g);cyl(.27,.08,0x3a6a4a,1.9,.6,.3,g);kreis(x,z,1.6)}
function automat(x,z){const g=grp(x,0,z);box(.9,1.7,.7,0x3b8fc4,0,.85,0,g,true);box(1,.2,.8,0xf59e3f,0,1.8,0,g);box(.5,.5,.05,0xfff8e6,0,1.15,.37,g);box(.4,.12,.05,0x2a2a2a,0,.5,.37,g);sph(.07,0xe0605a,.2,1.15,.4,g);sph(.07,0x4caf6a,-.2,1.15,.4,g);kreis(x,z,.8)}
function unterstand(x,z,rot,dach){const g=grp(x,0,z);[[-1.4,-1],[1.4,-1],[-1.4,1],[1.4,1]].forEach(p=>cyl(.1,2.2,0x7a5230,p[0],1.1,p[1],g,true));const r=box(3.4,.15,2.8,dach||0x9a5a30,0,2.35,0,g,true);r.rotation.x=.18;box(3,.2,.1,0x6a4220,0,.5,-1.05,g);g.rotation.y=rot||0;kreis(x,z,1.6)}
function stamm(x,z,rot,l){const g=grp(x,0,z);const c=cyl(.45,l||2.6,0x8a5a32,0,.45,0,g,true);c.rotation.z=Math.PI/2;sph(.4,0xc9a46a,(l||2.6)/2,.45,0,g,.3,1,1);g.rotation.y=rot||0;kreis(x,z,.8)}
function trog(x,z,rot,wasser){const g=grp(x,0,z);box(2.2,.5,.8,0x8a5a32,0,.25,0,g,true);box(1.9,.1,.5,wasser||0x4aa3d8,0,.5,0,g);g.rotation.y=rot||0;kreis(x,z,1.1)}
function heu(x,z,rot){const c=cyl(.7,1.1,0xe8c850,x,.55,z,scene,true);c.rotation.z=Math.PI/2;c.rotation.y=rot||0;kreis(x,z,.9)}
function ziege(par){const g=grp(0,0,0,par),f=0xe6d8b8,d=0x7a5a3a;
  sph(.55,f,0,.95,0,g,1.35,.95,.85).castShadow=true;[[-.5,.3],[-.5,-.3],[.5,.3],[.5,-.3]].forEach(p=>cyl(.11,.9,f,p[0],.45,p[1],g,true));cyl(.17,.8,f,.62,1.15,0,g).rotation.z=-.6;
  const kopf=grp(.8,1.4,0,g);sph(.27,f,.1,0,0,kopf,1.2,1,.9);sph(.15,d,.38,-.1,0,kopf,1.1,.9,1);[-1,1].forEach(z=>{sph(.06,0xffffff,.33,.1,z*.16,kopf);sph(.035,0x111111,.37,.1,z*.16,kopf)});
  [-1,1].forEach(z=>{const h=cone(.07,.5,0x5a4a3a,-.05,.32,z*.11,kopf);h.rotation.z=.7;sph(.1,d,-.06,.05,z*.3,kopf,.6,.5,1.8)});cone(.06,.28,d,.3,-.3,0,kopf).rotation.z=Math.PI;
  cone(.07,.3,f,-.62,1.15,0,g).rotation.z=.9;
  g.userData.anim=t=>{kopf.rotation.z=-.3+Math.sin(t*1.5)*.3};return g}
function seehund(par){const g=grp(0,0,0,par),f=0x66717d,l=0xb8c2cc;
  sph(.8,f,0,.55,0,g,1.9,.52,.6).castShadow=true;sph(.5,l,.3,.4,0,g,1.5,.3,.5);
  const kopf=grp(1.45,.95,0,g);sph(.4,f,0,0,0,kopf);sph(.2,l,.3,-.08,0,kopf,1,.8,1.1);sph(.08,0x111111,.5,0,0,kopf);sph(.06,0x111111,.28,.14,.18,kopf);sph(.06,0x111111,.28,.14,-.18,kopf);
  [-1,1].forEach(z=>{sph(.3,f,.5,.14,z*.62,g,1.2,.3,.6).rotation.y=z*.35;sph(.3,f,-1.6,.3,z*.22,g,1.4,.3,.7).rotation.y=-z*.3});
  g.userData.anim=t=>{kopf.rotation.z=.2+Math.sin(t*1.2)*.25};return g}
function papagei(par,c){const g=grp(0,0,0,par),a=c||0xe0302a,b=0x3b8fc4;
  sph(.28,a,0,.6,0,g,.8,1.25,.8);sph(.2,0xffe08a,.1,.55,0,g,.6,1.1,.75);const kopf=grp(.05,1.05,0,g);sph(.2,a,0,0,0,kopf);cone(.08,.2,0xffe08a,.2,-.03,0,kopf).rotation.z=-Math.PI/2;sph(.06,0xffffff,.12,.07,.14,kopf);sph(.06,0xffffff,.12,.07,-.14,kopf);sph(.03,0x111111,.16,.07,.16,kopf);sph(.03,0x111111,.16,.07,-.16,kopf);
  [-1,1].forEach(z=>sph(.2,b,-.1,.6,z*.22,g,.35,1.3,.5));cone(.1,.7,b,-.2,.22,0,g).rotation.z=.35;
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*2.2)*.25};return g}
function schildkroete(par){const g=grp(0,0,0,par);
  sph(.6,0x6a8a3a,0,.35,0,g,1.2,.6,1).castShadow=true;for(let i=0;i<4;i++)sph(.16,0x4a6a2a,Math.cos(i*1.57)*.35,.7,Math.sin(i*1.57)*.3,g,1,.4,1);sph(.2,0x4a6a2a,0,.75,0,g,1.2,.4,1);
  const kopf=grp(.85,.35,0,g);sph(.2,0x9ab86a,0,0,0,kopf);sph(.04,0x111111,.14,.07,.1,kopf);sph(.04,0x111111,.14,.07,-.1,kopf);
  [[.5,.5],[.5,-.5],[-.5,.5],[-.5,-.5]].forEach(p=>sph(.2,0x9ab86a,p[0],.12,p[1],g,1.3,.6,1));
  g.userData.anim=t=>{kopf.position.x=.85+Math.sin(t*.8)*.12};return g}
function schlange(par,c){const g=grp(0,0,0,par),f=c||0x6aa84a,teile=[];
  for(let i=0;i<15;i++)teile.push(sph(.3-i*.012,(i%3===1)?0xe8d060:f,i*.22-1.5,.3,0,g));const kopf=sph(.3,f,1.85,.32,0,g,1.5,.9,1.05);sph(.06,0xffffff,2.05,.45,.17,g);sph(.06,0xffffff,2.05,.45,-.17,g);sph(.035,0x111111,2.09,.45,.17,g);sph(.035,0x111111,2.09,.45,-.17,g);box(.35,.04,.05,0xe0302a,2.4,.28,0,g);
  g.userData.anim=t=>{teile.forEach((s,i)=>{s.position.z=Math.sin(t*2+i*.8)*.35});kopf.position.z=Math.sin(t*2+8)*.35};return g}
function paradeBauen(){const liste=[[elefant,.65],[giraffe,.6],[zebra,.8],[pinguin,1.3],[affe,1.2],[flamingo,1],[schaf,1],[pinguin,1.3],[loewe,.6],[baer,.55]];liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
function fassade(x,z,w,d,tuerX,fx,laden){const fz=z+d/2+.05;
  if(tuerX!=null){box(.95,1.7,.1,0x7a5230,x+tuerX,.85,fz,scene);box(.12,.12,.08,0xf5d442,x+tuerX+.3,.9,fz+.06,scene)}
  (fx||[]).forEach(q=>{box(1.1,.9,.08,0xffffff,x+q,1.35,fz,scene);box(.95,.75,.1,0xcfeaf5,x+q,1.35,fz+.02,scene);box(.05,.75,.12,0xffffff,x+q,1.35,fz+.03,scene)});
  if(laden){box(laden,.9,.1,0x2a3a4a,x,1.4,fz,scene);box(laden+.4,.1,.6,0xf6e4b8,x,.95,fz+.3,scene);box(laden+.6,.08,.9,0xe0605a,x,2.1,fz+.4,scene).rotation.x=.3}}
function weltBauen(){
FARBEN=WINTER?{boden:0xd5e4ee,pfad:0xe9dcc0,platz:0xf6e4b8,gehege:0xe8e0c8}:{boden:0x93cf72,pfad:0xe8d5a0,platz:0xf0dfae,gehege:0xd9c48a};
const boden=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200),mat(FARBEN.boden));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
hauptweg(5);SEITENWEGE.forEach(w=>kreuzplatz(wegX(w),w,7.5));pfad(-76,35,92,35,4);pfad(-100,-35,100,-35,4);pfad(-92,-100,92,-100,4);pfad(0,TORZ+2,0,GRENZE.z0+4,5,FARBEN.platz);
for(const k in BEREICHE){const b=BEREICHE[k];const c=cyl(k==='eingang'?14:10,.07,FARBEN.pfad,b.x,.035,b.z);scene.add(c);c.receiveShadow=true}
const fest=cyl(17,.08,FARBEN.platz,FEST.x,.04,FEST.z);scene.add(fest);
/* ---------- Bäume (instanziert, wenige) ---------- */
const baumListe=[];
function frei(x,z){for(const k in BEREICHE){const b=BEREICHE[k];if(Math.hypot(x-b.x,z-b.z)<24)return false}
  for(const e of EXTRAZONEN){if(Math.hypot(x-e.x,z-e.z)<30)return false}if(Math.abs(x-wegX(z))<6&&z>TORZ+2)return false;for(const w of SEITENWEGE){if(Math.abs(z-w)<9&&Math.abs(x)<110)return false}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<24)return false;if(Math.abs(x)<5&&z<TORZ)return false;return true}
for(let i=0;i<110;i++){const x=GRENZE.x0+6+rnd()*(GRENZE.x1-GRENZE.x0-12),z=GRENZE.z0+6+rnd()*(GRENZE.z1-GRENZE.z0-12);if(frei(x,z))baumListe.push({x,z,s:.8+rnd()*.5})}
for(let x=GRENZE.x0;x<=GRENZE.x1;x+=11){if(Math.abs(x)>8)baumListe.push({x,z:GRENZE.z1,s:1.2});baumListe.push({x,z:GRENZE.z0,s:1.2});if(Math.abs(x)>8)baumListe.push({x,z:TORZ,s:1})}
for(let z=GRENZE.z0;z<=GRENZE.z1;z+=11){baumListe.push({x:GRENZE.x0,z,s:1.2});baumListe.push({x:GRENZE.x1,z,s:1.2})}
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
  haus(b.x-17,b.z+3,4,3.5,0xc98a4b,0xb94a3a);[-1.2,1.2].forEach(q=>box(.9,.8,.1,0xcfeaf5,b.x-17+q,1.4,b.z+4.78,scene));box(.9,1.7,.1,0x7a5230,b.x-17,.85,b.z+4.78,scene);box(.3,.1,.12,0xf5d442,b.x-16.7,.9,b.z+4.84,scene);const ks=schildText('Kasse','#ffe9a8',2.6,.9);ks.position.set(b.x-17,3.4,b.z+4.8);scene.add(ks);
  haus(b.x+17,b.z+3,4,3.5,0x6ab0d8,0xe0605a);[-1.2,1.2].forEach(q=>box(.9,.8,.1,0xcfeaf5,b.x+17+q,1.4,b.z+4.78,scene));box(.9,1.7,.1,0x7a5230,b.x+17,.85,b.z+4.78,scene);eiswagen(b.x+24,b.z+8);automat(b.x+12,b.z+8);const es=schildText('Eis & Getränke','#e8f6ff',3.4,.9,40);es.position.set(b.x+17,3.4,b.z+4.8);scene.add(es);
  const bank=grp(b.x+7,0,b.z+9);box(2.4,.15,.8,0x9a5a30,0,.7,0,bank);box(2.4,.7,.1,0x9a5a30,0,1.1,-.35,bank);box(.12,.7,.7,0x6a4220,-1,.35,0,bank);box(.12,.7,.7,0x6a4220,1,.35,0,bank);kreis(b.x+7,b.z+9,1.3);
  const br=grp(b.x,0,b.z-14);cyl(2.2,.5,0xb8bec4,0,.25,0,br,true);cyl(1.8,.2,WASSER,0,.5,0,br);cyl(.25,1.6,0xb8bec4,0,1,0,br);sph(.5,0xdff4ff,0,2,0,br);cyl(.1,.7,0xbfe6f8,0,2.55,0,br);sph(.2,0xbfe6f8,0,2.95,0,br);for(let i=0;i<10;i++){const a=i/10*6.283;sph(.1,0xbfe6f8,Math.cos(a)*.8,1.9-(i%2)*.2,Math.sin(a)*.8,br);sph(.09,0xbfe6f8,Math.cos(a)*1.4,1.2,Math.sin(a)*1.4,br)}kreis(b.x,b.z-14,2.4);
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
(function(){const b=BEREICHE.teich;const bo=cyl(19,.12,0xd8d2c0,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;wasserFl(b.x,b.z,7.5,WASSER);wasserFl(b.x-1,b.z+1,4,WINTER?0xe6f6ff:0x6ec0ea,.02);
  for(let i=0;i<24;i++){const a=i/24*6.283;felsen(b.x+Math.cos(a)*8,b.z+Math.sin(a)*8,.5+rnd()*.35)}kreis(b.x,b.z,7);
  [[6,-3],[5,0],[4,-5],[7,-6]].forEach((p,i)=>tier(pinguin,b.x+p[0],b.z+p[1],b.x,b.z,.95,.5));tier(pinguin,b.x-4,b.z-2,b.x,b.z,.9);
  tier(flamingo,b.x+1,b.z+10,b.x,b.z,1,.5);tier(flamingo,b.x+4,b.z+11,b.x,b.z,1,.5);tier(flamingo,b.x-2,b.z+11.5,b.x,b.z,1.1,.5);tier(flamingo,b.x+7,b.z+9.5,b.x,b.z,.95,.5);
  for(let i=0;i<10;i++){const a=2.2+i*.3;cyl(.05,1.6,0xc9b97a,b.x+Math.cos(a)*9.6,.8,b.z+Math.sin(a)*9.6,scene)}
  const fels=grp(b.x-3,0,b.z-6);felsen(0,0,1.6,fels);felsen(1.5,.5,1.1,fels);wegweiser(b.x+17,b.z+1,'Pinguinteich',-Math.PI/2)})();
/* Affen und Schafe */
(function(){const b=BEREICHE.wiese;
  const fz=grp(b.x-12,0,b.z-11);[[0,0,2.4],[2.2,.5,1.8],[-2,.6,1.7],[.4,2,1.5],[-1.5,2.6,1],[1.6,2.7,.9]].forEach(p=>felsen(p[0],p[1]*.9,p[2],fz));
  const a1=tier(affe,b.x-12,b.z-11,b.x,b.z,1.2);a1.position.y=2.7;a1.userData.y0=2.7;const a2=tier(affe,b.x-9.5,b.z-10,b.x,b.z,1.1);a2.position.y=1.3;a2.userData.y0=1.3;const a3=tier(affe,b.x-14.5,b.z-8,b.x,b.z,1,.6);kreis(b.x-12,b.z-11,3);
  const pa=grp(b.x-6,0,b.z-14);cyl(.35,7,0x8a5a32,0,3.5,0,pa,true);for(let i=0;i<7;i++){const f2=grp(0,7,0,pa);f2.rotation.y=i*.9;const fr=sph(1,i%2?0x4aa84e:0x3f9a46,1.7,-.1,0,f2,1.9,.1,.55);fr.rotation.z=-.3}[[.3,.3],[-.3,.2],[0,-.35]].forEach(q=>sph(.25,0x6a4a2a,q[0],6.7,q[1],pa));kreis(b.x-6,b.z-14,.6);
  zaun(b.x+14,b.z-12,6.5,26,Math.PI*.6);const heu=cyl(.7,1.2,0xe8c850,b.x+17,.6,b.z-15,scene);heu.rotation.z=Math.PI/2;kreis(b.x+17,b.z-15,1.2);
  [[12,-11],[15,-9],[13,-14],[16,-13]].forEach((p,i)=>tier(schaf,b.x+p[0],b.z+p[1],b.x,b.z,1,.9));
  wegweiser(b.x-6,b.z-5,'Affen und Schafe',0)})();
/* Ausgang (Tor wird geöffnet) */
ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{box(1.4,6,1.4,0x9a7a5a,s*4.2,3,0,g,true);box(1.8,.5,1.8,0xffffff,s*4.2,6.2,0,g)});box(10.6,1,.7,0x3e9468,0,6.2,0,g,true);
  const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.2,.4);g.add(s);
  const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,0x8b5d2e,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,0xd8b878,s*-1.9+(i-2)*.7,1.9,0,p);return p});
  kreis(-4.2,TORZ,.9);kreis(4.2,TORZ,.9);return {g,fl,offen:0}})();
/* Festplatz */
(function(){const z0=FEST.z;const bue=grp(0,0,z0-12);box(16,1,6,0xb94a3a,0,.5,0,bue,true);box(16.4,.3,6.4,0xf6e4b8,0,1.05,0,bue);[-1,1].forEach(s=>{box(.5,7,.5,0x6a4220,s*8,3.5,-2.6,bue,true)});box(16.6,1.2,.5,0xe0605a,0,7,-2.6,bue);
  const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.2,-2.4);bue.add(gs);[-1,1].forEach(q=>{box(2.4,5,.3,0xb94a3a,q*5.5,3.5,-2.3,bue);sph(.5,q>0?0xe0605a:0x3b8fc4,q*7,5.5,3.2,bue)});box(6,.5,2,0xd8c8a0,0,.25,3.8,bue);kreis(0,z0-12,9);
  const farben=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4,0xf59e3f];for(let i=0;i<24;i++){const t=i/23;const x=-14+t*28,y=6.4-Math.sin(t*Math.PI)*2.2;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:farben[i%5]}));l.position.set(x,y,z0-8);l.scale.setScalar(.28);scene.add(l)}
  [-14,14].forEach(x=>{cyl(.15,7,0x6a4220,x,3.5,z0-8,scene,true)})})();
(function(){let n=0;for(let z=GRENZE.z1-12;z>TORZ+4;z-=16){let nah=false;for(const k in BEREICHE){if(Math.abs(z-BEREICHE[k].z)<17)nah=true}for(const w of SEITENWEGE){if(Math.abs(z-w)<9)nah=true}if(nah)continue;
  const side=(n%2?1:-1),f=SCHMUCK[n%SCHMUCK.length];f===bank?bank(wegX(z)+side*5.2,z,side>0?-Math.PI/2:Math.PI/2):f(wegX(z)+side*5.2,z);n++}})();
(function(){const b=EXTRAZONEN[0];const bo=cyl(15,.12,0xe8d8a8,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const sk=grp(b.x-6,0,b.z+5);box(5,.4,.3,0x8b5a2b,0,.2,2.5,sk);box(5,.4,.3,0x8b5a2b,0,.2,-2.5,sk);box(.3,.4,5,0x8b5a2b,2.5,.2,0,sk);box(.3,.4,5,0x8b5a2b,-2.5,.2,0,sk);box(4.7,.3,4.7,0xf0d890,0,.15,0,sk);cyl(.3,.45,0xe0605a,.8,.5,.5,sk);cyl(.34,.06,0xb83a3a,.8,.74,.5,sk);box(.1,.05,.7,0x3b8fc4,-.8,.4,-.4,sk);box(.4,.05,.3,0x3b8fc4,-.8,.4,-.8,sk);kreis(b.x-6,b.z+5,3.4);
  const ru=grp(b.x+5,0,b.z-4);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>cyl(.12,3,0xd8433a,p[0]*1.2,1.5,p[1]*1.2,ru,true));box(3,.2,3,0xf59e3f,0,3,0,ru,true);const ra=box(1.7,.15,5.4,0x3b8fc4,0,1.5,4.2,ru,true);ra.rotation.x=.57;box(.12,.4,5.4,0x2a6f9e,-.85,1.7,4.2,ru).rotation.x=.57;box(.12,.4,5.4,0x2a6f9e,.85,1.7,4.2,ru).rotation.x=.57;
  for(let i=0;i<5;i++)box(1.2,.1,.1,0xd8433a,0,.5+i*.5,-1.5,ru);kreis(b.x+5,b.z-4,2.4);
  const sc=grp(b.x-5,0,b.z-8);[-1,1].forEach(x=>{const a=cyl(.1,3.4,0x3a4a56,x*2.4,1.7,0,sc,true);});cyl(.08,5,0x3a4a56,0,3.4,0,sc).rotation.z=Math.PI/2;
  const sitze=[-1,1].map(x=>{const p=grp(x*1,3.4,0,sc);cyl(.03,2,0x666666,-.5,-1,0,p);cyl(.03,2,0x666666,.5,-1,0,p);box(1.2,.12,.5,x>0?0xe0605a:0x4caf6a,0,-2,0,p,true);return p});
  sitze.forEach(s=>{s.userData.keep=1});lebendig.push({o:{userData:{anim:t=>{sitze[0].rotation.z=Math.sin(t*1.6)*.35;sitze[1].rotation.z=Math.sin(t*1.6+1.5)*.35}}},ph:0});kreis(b.x-5-2.4,b.z-8,.4);kreis(b.x-5+2.4,b.z-8,.4);
  const wi=grp(b.x+7,0,b.z+7);box(.7,.8,1,0x8a8a8a,0,.4,0,wi,true);const pl=grp(0,.9,0,wi);box(4.6,.15,.5,0xf5d442,0,0,0,pl,true);[-1,1].forEach(q=>{box(.1,.5,.1,0x333333,q*1.7,.3,0,pl);box(.5,.12,.45,0xe0605a,q*2,.14,0,pl)});pl.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{pl.rotation.z=Math.sin(t*1.3)*.18}}},ph:0});kreis(b.x+7,b.z+7,.6);
  wegweiser(6,b.z+3.5,'← Spielplatz',Math.PI/2*0)})();
/* Picknickplatz (rechts hinten) */
(function(){const b=EXTRAZONEN[1];const bo=cyl(15,.12,0xdcecc0,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  [[-6,4],[4,6],[7,-5]].forEach((p,i)=>{const g=grp(b.x+p[0],0,b.z+p[1]);box(2.4,.12,1.2,0xa8743f,0,.9,0,g,true);[-1,1].forEach(s=>{box(.12,.9,.9,0x6a4220,s*1,.45,0,g)});box(2.4,.1,.5,0x9a5a30,0,.5,.95,g);box(2.4,.1,.5,0x9a5a30,0,.5,-.95,g);cyl(.06,2.8,0x6a4220,0,1.4,0,g);cone(1.6,.6,i%2?0xe0605a:0x3b8fc4,0,2.9,0,g,true);kreis(b.x+p[0],b.z+p[1],1.8)});
  const w=haus(b.x-4,b.z-8,5.4,3.6,0xf5d442,0xe0605a);fassade(b.x-4,b.z-8,5.4,3.6,1.9,null,2.2);const ws=schildText('Snacks','#fff0b0',2.8,.9);ws.position.set(b.x-4,3.45,b.z-6.1);scene.add(ws);[-1,1].forEach(q=>cyl(.04,.6,0x6a4220,b.x-4+q*1.1,3.0,b.z-6.1,scene));
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

  /* Neue Gehege entlang des Hauptwegs */
  function gehege(b,r,boden,luecke,n){const bo=cyl(r,.12,boden,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;zaun(b.x,b.z,r,n||70,luecke);pfad(b.x,b.z,wegX(b.z),b.z,3.5)}
  function tanne(x,z,s){const a=grp(x,0,z);cyl(.22*s,1.6*s,0x7a5230,0,.8*s,0,a,true);cone(1.3*s,2.4*s,0x2f6b4a,0,2.4*s,0,a,true);cone(.95*s,2*s,0x37805a,0,3.7*s,0,a);kreis(x,z,.5*s)}
  /* Löwen */ (function(){const b=EXTRAZONEN[4];gehege(b,19,0xe6cf8c,0);
    tier(loewe,b.x-6,b.z-8,b.x,b.z,1.15,1.6);tier(loewe,b.x+7,b.z+6,b.x,b.z,1,1.5);tier(loewe,b.x+3,b.z-12,b.x,b.z,.7,1);
    felsen(b.x-12,b.z+8,2.4);felsen(b.x+13,b.z-9,1.6);akazie(b.x-3,b.z+11);akazie(b.x-14,b.z-4);wegweiser(b.x+22,b.z+4,'Löwen',-Math.PI/2)})();
  /* Tiger */ (function(){const b=EXTRAZONEN[5];gehege(b,19,0xc2d48c,Math.PI);
    tier(tiger,b.x-6,b.z-9,b.x,b.z,1.1,1.5);tier(tiger,b.x+8,b.z+5,b.x,b.z,1,1.4);tier(tiger,b.x-2,b.z+10,b.x,b.z,.75,1);
    wasserFl(b.x+10,b.z-10,4,WASSER);felsen(b.x-13,b.z+3,2);tanne(b.x+4,b.z-1,1);tanne(b.x-9,b.z+13,.9);tanne(b.x+14,b.z+10,1.1);wegweiser(b.x-22,b.z+4,'Tiger',Math.PI/2)})();
  /* Nilpferde und Krokodile */ (function(){const b=EXTRAZONEN[6];gehege(b,20,0xd8cf9a,0);
    wasserFl(b.x-2,b.z-2,10,WASSER);wasserFl(b.x-3,b.z-1,6,WINTER?0xe6f6ff:0x6ec0ea,.02);
    tier(nilpferd,b.x-8,b.z+4,b.x,b.z,1.1,1.6);tier(nilpferd,b.x+4,b.z-6,b.x,b.z,.9,1.4);tier(nilpferd,b.x-12,b.z-6,b.x,b.z,.6,1);
    tier(krokodil,b.x+9,b.z+8,b.x,b.z,1,1.4);tier(krokodil,b.x+13,b.z-2,b.x,b.z,.8,1.2);felsen(b.x+5,b.z+14,1.4);wegweiser(b.x+23,b.z+4,'Nilpferde',-Math.PI/2)})();
  /* Eisbären */ (function(){const b=EXTRAZONEN[7];gehege(b,19,0xe6f0f6,Math.PI);
    wasserFl(b.x+4,b.z+4,6,0xbfe6f4);
    tier(eisbaer,b.x-6,b.z-6,b.x,b.z,1.2,1.7);tier(eisbaer,b.x+8,b.z-8,b.x,b.z,.9,1.4);tier(eisbaer,b.x-8,b.z+8,b.x,b.z,.6,1);
    [[-12,-2,2],[10,-14,1.6],[-4,12,1.4],[13,6,1.8]].forEach(p=>{const f=sph(p[2],0xe8eef2,b.x+p[0],p[2]*.5,b.z+p[1],scene,1.2,.75,1);f.castShadow=true;kreis(b.x+p[0],b.z+p[1],p[2]*1.05)});wegweiser(b.x-22,b.z+4,'Eisbären',Math.PI/2)})();
  /* Kängurus */ (function(){const b=EXTRAZONEN[8];gehege(b,19,0xd9c48a,0);
    [[-8,-6],[0,-10],[8,-4],[6,8],[-6,7]].forEach((p,i)=>tier(kaenguru,b.x+p[0],b.z+p[1],b.x,b.z,i%2?.85:1,.8));
    akazie(b.x-12,b.z+4);akazie(b.x+12,b.z+10);felsen(b.x+14,b.z-8,1.5);wegweiser(b.x+22,b.z+4,'Kängurus',-Math.PI/2)})();
  /* Bären */ (function(){const b=EXTRAZONEN[9];gehege(b,19,0xb8c88a,Math.PI);
    tier(baer,b.x-6,b.z-7,b.x,b.z,1.15,1.6);tier(baer,b.x+8,b.z+5,b.x,b.z,.95,1.4);tier(baer,b.x-4,b.z+11,b.x,b.z,.6,.9);
    wasserFl(b.x+10,b.z-9,3.5,WASSER);felsen(b.x-13,b.z+2,2.2);tanne(b.x+2,b.z-12,1.1);tanne(b.x-12,b.z-12,1);tanne(b.x+14,b.z+9,1.2);tanne(b.x+4,b.z+1,.9);wegweiser(b.x-22,b.z+4,'Bären',Math.PI/2)})();


  /* Ausstattung der Gehege: Unterstände, Baumstämme, Futtertröge */
  (function(){const Z=i=>EXTRAZONEN[i];let b;
    b=Z(4);unterstand(b.x-9,b.z-14,0,0xb8844a);stamm(b.x+12,b.z+1,.4);trog(b.x+1,b.z+14,0);
    b=Z(5);unterstand(b.x-14,b.z-8,1.2,0x7a5a3a);stamm(b.x+2,b.z-15,0);stamm(b.x-8,b.z+1,.8,2);trog(b.x+13,b.z-1,1.5);
    b=Z(6);stamm(b.x+14,b.z-10,.3);trog(b.x+2,b.z+15,0);
    b=Z(7);trog(b.x+1,b.z-14,0,0xbfe6f4);stamm(b.x-14,b.z-9,.5,2);
    b=Z(8);unterstand(b.x-14,b.z-10,.6,0xb8844a);stamm(b.x-3,b.z+14,0);trog(b.x+10,b.z-14,.5);
    b=Z(9);stamm(b.x-9,b.z+3,.5);stamm(b.x+8,b.z-3,1.6,2);trog(b.x-1,b.z+15,0)})();
  /* Streichelzoo */ (function(){const b=EXTRAZONEN[10];gehege(b,11,0xd8e6a8,0,56);
    [[-4,-3],[2,-6],[5,3]].forEach((p,i)=>tier(schaf,b.x+p[0],b.z+p[1],b.x,b.z,.9-i*.05,.8));[[-5,4],[1,5],[6,-2],[-1,0]].forEach((p,i)=>tier(ziege,b.x+p[0],b.z+p[1],b.x,b.z,1-i*.05,.6));
    const st=haus(b.x-7,b.z-7,4.6,3.2,0xc98a4b,0x4aa84e);fassade(b.x-7,b.z-7,4.6,3.2,-1.2,[1.2]);const ss=schildText('Streicheln erlaubt','#e8f6e0',4.4,1.1,42);ss.position.set(b.x-7,3.4,b.z-5.3);scene.add(ss);
    heu(b.x+8,b.z-5,.3);heu(b.x+4,b.z+8,1.2);trog(b.x-2,b.z+9,0);automat(b.x+9,b.z+4);wegweiser(b.x+14.5,b.z+3,'Streichelzoo',-Math.PI/2)})();
  /* Seehunde */ (function(){const b=EXTRAZONEN[11];gehege(b,12,0xd8d2c0,Math.PI,60);
    wasserFl(b.x,b.z,8,WASSER);wasserFl(b.x-1,b.z+1,5,WINTER?0xe6f6ff:0x6ec0ea,.02);const ring=new THREE.Mesh(new THREE.TorusGeometry(8.4,.4,6,40),mat(0xb8bec4));ring.rotation.x=Math.PI/2;ring.position.set(b.x,.3,b.z);scene.add(ring);
    sperrRing(b.x,b.z,8.3,40);[.6,2.4,4.4].forEach((a,i)=>{const rr=i===0?9.8:5.2,x=b.x+Math.cos(a)*rr,z=b.z+Math.sin(a)*rr;if(i===0)felsen(x,z,1.1);const s=tier(seehund,x,z,b.x,b.z,1.2-i*.1,1.4);s.position.y=i===0?1.3:.22});
    felsen(b.x-4,b.z-5,1.2);trog(b.x+5,b.z-10,.3,0xbfe6f4);wegweiser(b.x-15,b.z+3,'Seehunde',Math.PI/2)})();
  /* Papageien-Voliere */ (function(){const b=EXTRAZONEN[12];const bo=cyl(11,.12,0xe0d0a0,b.x,.06,b.z);scene.add(bo);bo.receiveShadow=true;pfad(b.x,b.z,wegX(b.z),b.z,3.5);
    const kup=new THREE.Mesh(new THREE.SphereGeometry(1,28,8,0,Math.PI*2,0,Math.PI/2),new THREE.MeshBasicMaterial({color:0x7d8d99,wireframe:true}));kup.position.set(b.x,0,b.z);kup.scale.set(11,7.5,11);scene.add(kup);sperrRing(b.x,b.z,11,48,0);
    const rg=new THREE.Mesh(new THREE.TorusGeometry(11,.2,6,40),mat(0x4a5a66));rg.rotation.x=Math.PI/2;rg.position.set(b.x,.2,b.z);scene.add(rg);
    [[1,0xe0302a],[2,0xffd45e],[3,0x4caf6a],[4,0x3b8fc4],[5,0xe8588a],[6,0xf59e3f]].forEach((q,i)=>{const a=i*1.05+.3,x=b.x+Math.cos(a)*5.5,z=b.z+Math.sin(a)*5.5;
      cyl(.08,2.2,0x7a5230,x,1.1,z,scene,true);const arm=cyl(.05,1.6,0x7a5230,x,2.2,z,scene);arm.rotation.z=Math.PI/2;
      const p=papagei(scene,q[1]);p.position.set(x,2.2,z);p.rotation.y=-a+Math.PI;p.scale.setScalar(.9);lebendig.push({o:p,ph:i});kreis(x,z,.4)});
    [[-6,5],[3,-7],[7,4]].forEach(p=>{cyl(.15,1.2,0x7a5230,b.x+p[0],.6,b.z+p[1],scene,true);sph(1.1,0x4aa84e,b.x+p[0],1.8,b.z+p[1],scene,1,.9,1);kreis(b.x+p[0],b.z+p[1],.5)});
    const sch=schildText('Papageien','#fff8e6',4,1,46);sch.position.set(b.x+11.6,4,b.z);sch.rotation.y=-Math.PI/2;scene.add(sch);wegweiser(b.x+15,b.z+3,'Papageien',-Math.PI/2)})();
  /* Reptilienhaus */ (function(){const b=EXTRAZONEN[13];gehege(b,14,0xd8d0a0,Math.PI,64);
    const h=haus(b.x+3,b.z-9,9,4,0x5a8a5a,0x2f6b4a);fassade(b.x+3,b.z-9,9,4,0,[-2.8,2.8]);const hs=schildText('Reptilienhaus','#e0f0d8',5,1.1,40);hs.position.set(b.x+3,3.5,b.z-6.8);scene.add(hs);
    [[-2,-3.5,0x6aa84a],[6,-3.5,0xe8c050]].forEach(p=>{const x=b.x+p[0],z=b.z+p[1];box(3,.3,2,0xd8c080,x,.15,z,scene);glas(3,1.8,2,x,1.1,z);[-1.5,1.5].forEach(dx=>[-1,1].forEach(dz=>box(.1,1.9,.1,0x4a5a66,x+dx,1.1,z+dz,scene)));box(3.1,.1,2.1,0x4a5a66,x,2.05,z,scene);const s=schlange(scene,p[2]);s.position.set(x,.3,z);s.scale.setScalar(.6);lebendig.push({o:s,ph:p[0]});kreis(x,z,1.7)});
    wasserFl(b.x-5,b.z+3,4.2,WASSER);[[-5,3],[-8,2],[-3,6]].forEach((p,i)=>{const s=tier(schildkroete,b.x+p[0]+(i==1?.5:0),b.z+p[1],b.x,b.z,.7+i*.1,.6);s.position.y=0});
    felsen(b.x+8,b.z+4,1.3);felsen(b.x+10,b.z+7,.9);wegweiser(b.x-17,b.z+3,'Reptilien',Math.PI/2)})();

}
