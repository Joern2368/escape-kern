/* Welt: Zoo (Kennwort zoo). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Schilder: ausgeschaltet (Wunsch der Lehrkraft, 24.11.2026). Frühere Liste zum Wiedereinschalten: SCHILDER_ALT einfach als SCHILDER eintragen und WEGMAX auf 14 setzen. */
const SCHILDER_ALT=['Ausgang', 'Geschafft!', 'Savanne', 'Pinguine', 'Affen', 'Elefantenpark', 'Giraffenwiese', 'Löwen', 'Tiger', 'Eisbären', 'Streichelzoo', 'Seehunde', 'Papageien', 'Reptilienhaus', 'Spielplatz', 'Picknick'];
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Wilma Waschbär';
const START={x:0,z:119};
const BEREICHE={
  eingang:{name:'Eingangsplatz',x:0,z:117,plaetze:[]},
  savanne:{name:'Savanne',x:88,z:32,plaetze:[]},
  teich:{name:'Pinguinteich',x:-88,z:32,plaetze:[]},
  wiese:{name:'Affen und Schafe',x:0,z:-60,plaetze:[]}
};
const EXTRAZONEN=[{name:'Spielplatz',x:-88,z:-100,r:15},{name:'Picknick',x:88,z:-100,r:15},{name:'Elefantenpark',x:95,z:-35,r:26},{name:'Giraffenwiese',x:-95,z:-35,r:26},{name:'Löwen',x:-45,z:70,r:19},{name:'Tiger',x:45,z:70,r:19},{name:'Nilpferde',x:-45,z:0,r:20},{name:'Eisbären',x:45,z:0,r:19},{name:'Kängurus',x:-45,z:-68,r:19},{name:'Bären',x:45,z:-68,r:19},{name:'Streichelzoo',x:-45,z:102,r:11},{name:'Seehunde',x:45,z:102,r:12},{name:'Papageien',x:-45,z:-132,r:12},{name:'Reptilien',x:45,z:-132,r:14},{name:'Aquarium',x:45,z:28,r:9},{name:'Nachttierhaus',x:-45,z:30,r:8},{name:'Futterküche',x:45,z:-41,r:8},{name:'Tierarzt',x:-45,z:-41,r:7},{name:'Flamingoteich',x:45,z:-97,r:8},{name:'Zoo-Schule',x:-45,z:-97,r:8},{name:'Delfin-Show',x:100,z:90,r:22},{name:'Greifvögel',x:-100,z:84,r:21},{name:'Pandagarten',x:-153,z:-72,r:16},{name:'Wolfswald',x:98,z:-146,r:16},{name:'Nashörner',x:152,z:35,r:16},{name:'Otter und Biber',x:-98,z:-148,r:16},{name:'Kletterturm',x:-153,z:38,r:16},{name:'Schmetterlinge',x:153,z:92,r:13},{name:'Zoo-Café',x:76,z:116,r:16},{name:'Aquarium-Tunnel',x:-153,z:95,r:17}];
const SEITENWEGE=[35,-35,-100];
const WEGBOGEN=11;
const VERTEXFARBEN=true,MERGEZELLE=60,FERNBESUCHER=50,FERNLEBEN=80;
const GRENZE={x0:-170,x1:170,z0:-240,z1:140};
const TORZ=-185, FEST={x:0,z:-215};
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
const BPTS=[[0,126],[0,35],[-70,35],[70,35],[0,-35],[-70,-35],[70,-35],[0,-100],[-60,-100],[60,-100],[0,70],[-40,98],[40,98],[0,-60],[0,-130],[-90,-60],[90,-60],[-30,70],[30,70],[-30,0],[30,0],[-30,-68],[30,-68],[-30,102],[30,102],[-30,-132],[30,-132]];

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
  for(const e of EXTRAZONEN){if(Math.hypot(x-e.x,z-e.z)<30)return false}if(Math.abs(x-wegX(z))<6&&z>TORZ+2)return false;for(const w of SEITENWEGE){if(Math.abs(z-w)<9&&Math.abs(x)<110)return false}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<24)return false;if(Math.abs(x)<5&&z<TORZ)return false;if(nahNeu(x,z,7))return false;return true}
for(let i=0;i<190;i++){const x=GRENZE.x0+6+rnd()*(GRENZE.x1-GRENZE.x0-12),z=GRENZE.z0+6+rnd()*(GRENZE.z1-GRENZE.z0-12);if(frei(x,z))baumListe.push({x,z,s:.8+rnd()*.5})}
for(let x=GRENZE.x0;x<=GRENZE.x1;x+=11){if(Math.abs(x)>8)baumListe.push({x,z:GRENZE.z1,s:1.2});baumListe.push({x,z:GRENZE.z0,s:1.2});if(Math.abs(x)>8)baumListe.push({x,z:TORZ,s:1})}
for(let z=GRENZE.z0;z<=GRENZE.z1;z+=11){baumListe.push({x:GRENZE.x0,z,s:1.2});baumListe.push({x:GRENZE.x1,z,s:1.2})}
const LP=g=>g===gSph?gSphL:g===gCone?gConL:g===gCyl?gCylL:g;
const BAUMTEIL=WINTER?
  [[gCyl,0x7a5230,0,.9,0,.28,1.8,.28],[gCone,0x2f6b4a,0,2.6,0,1.7,2.7,1.7],[gCone,0x37805a,0,4.1,0,1.35,2.4,1.35],[gCone,0xffffff,0,3.15,0,1.25,1.6,1.25],[gCone,0xffffff,0,4.7,0,.95,1.4,.95],[gCone,0x3e9468,0,5.5,0,.8,1.6,.8]]:
  [[gCyl,0x7a5230,0,1.3,0,.36,2.6,.36],[gSph,0x4aa84e,0,3.9,0,2.1,1.8,2.1],[gSph,0x5cba5c,1.2,3.4,.6,1.5,1.3,1.5],[gSph,0x3f9a46,-1.2,3.5,-.5,1.6,1.4,1.6]];
(function(){const n=baumListe.length;
  const ms=BAUMTEIL.map(m=>{const im=new THREE.InstancedMesh(LP(m[0]),mat(m[1]),n);im.frustumCulled=false;scene.add(im);return im});ms[1].castShadow=true;
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


  /* ========== Dichte-Runde (24.11.2026): 6 neue Orte, Landschaft, Kleinteile, Bewegung ========== */
  function bewegt(teil,fn){teil.userData.keep=1;lebendig.push({o:{userData:{anim:fn}},ph:0})}
  function instanziert(geo,farbe,liste){geo=geo===gSph?gSphL:geo===gCone?gConL:geo===gCyl?gCylL:geo;const im=new THREE.InstancedMesh(geo,mat(farbe),liste.length);im.frustumCulled=false;scene.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3();liste.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);M.compose(P,Q,S);im.setMatrixAt(i,M)});im.instanceMatrix.needsUpdate=true;return im}
  const PW35=wellen(-76,35,92,35),PW_35=wellen(-100,-35,100,-35),PW_100=wellen(-92,-100,92,-100);
  function pz(pts,x){for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];if(x>=a[0]&&x<=b[0])return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return pts[pts.length-1][1]}
  function eule(par){const g=grp(0,0,0,par),f=0x8a6a44;
    sph(.5,f,0,.7,0,g,1,1.3,.9).castShadow=true;sph(.4,0xe8d8b8,0,.62,.3,g,.9,1.2,.45);
    const kopf=grp(0,1.5,0,g);sph(.42,f,0,0,0,kopf,1.1,.95,.95);
    [-1,1].forEach(s=>{sph(.17,0xf4ecd8,s*.17,.05,.3,kopf,1,1,.4);sph(.1,0xffd23a,s*.17,.05,.4,kopf);sph(.05,0x111111,s*.17,.05,.47,kopf);cone(.1,.28,f,s*.28,.45,0,kopf);sph(.3,0x6e5232,s*.5,.65,-.05,g,.35,1.3,.7)});
    cone(.07,.2,0xf59e3f,0,-.08,.45,kopf).rotation.x=Math.PI/2;[-.15,.15].forEach(s=>box(.1,.08,.2,0xf59e3f,s,.05,.15,g));
    g.userData.anim=t=>{kopf.rotation.y=Math.sin(t*.7)*.7};return g}
  function vogelhaus(x,z){const g=grp(x,0,z);cyl(.06,2,0x6a4220,0,1,0,g,true);box(.55,.4,.45,0xc98a4b,0,2.2,0,g);const r1=box(.7,.05,.32,0xb94a3a,0,2.55,-.12,g);r1.rotation.x=-.6;const r2=box(.7,.05,.32,0xb94a3a,0,2.55,.12,g);r2.rotation.x=.6;sph(.07,0x2a1d14,0,2.2,.23,g);box(.3,.04,.2,0x6a4220,0,1.98,.28,g);kreis(x,z,.25)}
  function trinkbrunnen(x,z){const g=grp(x,0,z);cyl(.18,1,0x9aa8b4,0,.5,0,g,true);cyl(.4,.14,0xb8c4cc,0,1.05,0,g);cyl(.3,.05,0x4aa3d8,0,1.12,0,g);sph(.09,0x7a8894,0,1.2,.1,g);kreis(x,z,.45)}
  /* Orte der Dichte-Runde: Mitten in den Lücken zwischen den Gehegen, jeweils an einem Seitenweg */
  /* Aquarium */
  (function(){const b=EXTRAZONEN[14],x=b.x,z=b.z,fz=z+3.5,wz=pz(PW35,x);
    cyl(8.5,.1,0xe6dcb4,x,.05,z+1,scene).receiveShadow=true;pfad(x,fz+2.4,x,wz-1.5,3.5);
    haus(x,z,12,7,0x4a9ac8,0x2f6b9a);
    box(8.4,.6,.9,0x1f4f7a,x,.3,fz+.45,scene);box(8.4,.2,.9,0x1f4f7a,x,2.2,fz+.45,scene);[-1,1].forEach(s=>box(.2,1.9,.9,0x1f4f7a,x+s*4.2,1.25,fz+.45,scene));
    box(8,1.5,.12,0x1e6aa8,x,1.35,fz+.1,scene);box(8,.2,.6,0xe8d8a0,x,.72,fz+.45,scene);glas(8,1.5,.7,x,1.45,fz+.45);
    [-3,-1.5,.5,2,3.4].forEach((o,i)=>{cyl(.05,.7+i%3*.3,0x2f9a5a,x+o,.9+(.7+i%3*.3)/2-.1,fz+.3,scene)});sph(.35,0x9aa0a6,x-3.4,.95,fz+.5,scene,1.3,.7,1);sph(.3,0xe0605a,x+1.2,.9,fz+.55,scene,1,.5,1);
    box(.95,1.7,.1,0x7a5230,x+5.1,.85,fz+.05,scene);box(.12,.12,.08,0xf5d442,x+5.4,.9,fz+.12,scene);box(10.2,.1,1.3,0x2f6b9a,x,2.5,fz+.9,scene).rotation.x=.35;
    [[0,1.0,0xf59e3f,1,0],[1.7,1.4,0xe0605a,.8,1.3],[3.1,1.2,0xffd45e,.9,2.6],[4.4,.9,0x3b8fc4,1,.7],[5.6,1.6,0xb06ae0,.7,3.3],[2.4,.85,0x4caf6a,.85,5.2]].forEach(f=>{
      const g=grp(x,f[1],fz+.5,scene);g.userData.keep=1;const s=f[3];sph(.24*s,f[2],0,0,0,g,1.5,1,.55);cone(.15*s,.3*s,f[2],-.36*s,0,0,g).rotation.z=-Math.PI/2;sph(.04,0x111111,.26*s,.06,.1*s,g);sph(.04,0x111111,.26*s,.06,-.1*s,g);
      bewegt(g,t=>{const a=t*.35+f[4];g.position.x=x+Math.sin(a)*3.4;g.rotation.y=Math.cos(a)>0?0:Math.PI;g.position.y=f[1]+Math.sin(t*1.1+f[0])*.12})});
    [-3,-1,1.5,3.2].forEach((bx,i)=>{const s=sph(.06,0xffffff,x+bx,1,fz+.5,scene);bewegt(s,t=>{const u=(t*.4+i*.27)%1;s.position.y=.8+u*1.2;s.position.x=x+bx+Math.sin(t*3+i)*.05})});
    const fg=grp(x,4.7,z,scene);fg.userData.keep=1;sph(1.3,0xf59e3f,0,0,0,fg,1.8,1,.55);cone(.8,1.3,0xe8782a,-2.75,0,0,fg).rotation.z=-Math.PI/2;cone(.55,.9,0xe8782a,0,1.2,0,fg);[-1,1].forEach(s=>{sph(.2,0xffffff,1.5,.3,s*.46,fg);sph(.1,0x111111,1.6,.3,s*.55,fg)});cyl(.1,1.6,0x6a4220,0,-1.5,0,fg);
    bewegt(fg,t=>{fg.position.y=4.7+Math.sin(t)*.15;fg.rotation.y=Math.sin(t*.5)*.3});
    sperrKasten(x,fz+.45,8.8,.9,0);bank(x+8.6,z+3.4,-Math.PI/2);tonne(x-8,z+4.2)})();
  /* Nachttierhaus */
  (function(){const b=EXTRAZONEN[15],x=b.x,z=b.z,fz=z+3.55,wz=pz(PW35,x);
    cyl(8,.1,0xd8d0b8,x,.05,z+1,scene).receiveShadow=true;pfad(x,z+5,x,wz-1.5,3.5);
    haus(x,z,10,7,0x3a4066,0x1f2540);fassade(x,z,10,7,0,[-3.2,3.2]);[-3.2,3.2].forEach(q=>box(.95,.75,.12,0xffe28a,x+q,1.35,fz+.04,scene));
    const mo=grp(x,5.2,z+.3,scene);mo.userData.keep=1;sph(1.1,0xfff0a0,0,0,0,mo,1,1,.35);[[-.4,.3],[.35,-.2],[.1,.5]].forEach(p=>sph(.2,0xe8d880,p[0],p[1],.3,mo,1,1,.3));cyl(.07,2,0x6a4220,0,-1.6,0,mo);
    [[-2,1.2],[2.3,1.6],[-1.6,-1.4],[1.9,-1.2],[0,2]].forEach((p,i)=>{const s=sph(.12,0xffe060,p[0],p[1],.2,mo);bewegt(s,t=>{s.scale.setScalar(.12*(.7+.5*Math.sin(t*2+i*1.7)))})});
    bewegt(mo,t=>{mo.rotation.z=Math.sin(t*.4)*.06});
    [-4.4,4.4].forEach(q=>{cyl(.12,2.9,0x6a4220,x+q,1.45,z+5.2,scene,true);sph(.18,0xffe28a,x+q,3.05,z+5.2,scene);kreis(x+q,z+5.2,.3)});box(9.2,.2,.3,0x6a4220,x,2.85,z+5.2,scene);
    [-3.2,-1.6,.1,1.7,3.3].forEach(o=>{const g=grp(x+o,2.75,z+5.2,scene);sph(.13,0x3a2a22,0,-.25,0,g,1,1.4,1);sph(.09,0x4a3a2c,0,-.45,.03,g);[-1,1].forEach(s=>{cone(.05,.12,0x3a2a22,s*.06,-.55,.03,g);sph(.18,0x2a1f1a,s*.13,-.25,0,g,.3,1.3,.5);sph(.02,0xe0302a,s*.04,-.45,.11,g)});g.scale.setScalar(1.6)});
    [-6,6].forEach((q,i)=>{cyl(.09,1.9,0x6a4220,x+q,.95,z+1.4,scene,true);const e=eule(scene);e.userData.keep=1;e.position.set(x+q,1.9,z+1.4);e.rotation.y=i?-.4:.4;e.scale.setScalar(.9);lebendig.push({o:e,ph:i*2});kreis(x+q,z+1.4,.3)});
    bank(x+7,z+5.5,-Math.PI/2);tonne(x-8,z+4)})();
  /* Futterküche */
  (function(){const b=EXTRAZONEN[16],x=b.x,z=b.z,wz=pz(PW_35,x);
    cyl(8.5,.1,0xe6dcb4,x,.05,z+2,scene).receiveShadow=true;pfad(x,z+3.5,x,wz-1.5,3.5);
    haus(x,z,9,6,0xe8d8a0,0xb94a3a);fassade(x,z,9,6,-1.5,[2.4]);cyl(.4,2.2,0x9a6a50,x+3,3.2,z-1,scene,true);
    const rg=grp(x+3,4.4,z-1,scene);const ps=[0,1,2,3].map(()=>sph(.4,0xf2f2f2,0,0,0,rg));bewegt(rg,t=>{ps.forEach((p,i)=>{const f=(t*.35+i*.25)%1;p.position.set(f*1.2,f*2.8,0);p.scale.setScalar(.18+f*.5)})});
    [[-5.6,z+.2,0],[-5.6,z+1.5,1]].forEach(q=>{box(1.1,.7,.8,0xa8743f,x+q[0],.35,q[1],scene,true);if(q[2]===0){for(let i=0;i<6;i++)sph(.17,0xe0302a,x+q[0]-.35+(i%3)*.35,.8,q[1]-.15+(i>2?.3:0),scene)}else{for(let i=0;i<5;i++){const c=cone(.09,.55,0xf2882a,x+q[0]-.4+i*.2,.78,q[1],scene);c.rotation.z=Math.PI/2}}kreis(x+q[0],q[1],.7)});
    box(1.1,.7,.8,0xa8743f,x-5.6,1.05,z+.8,scene);[0,1,2].forEach(i=>sph(.2,0x6cc04a,x-5.9+i*.3,1.5,z+.8,scene));
    heu(x+6.4,z-.5,0);heu(x+6.4,z+1.6,.3);
    [-3.4,-2.2].forEach(q=>{cyl(.45,1,0x8a5a32,x+q,.5,z+3.6,scene,true);cyl(.47,.08,0x4a3320,x+q,.55,z+3.6,scene);cyl(.47,.08,0x4a3320,x+q,.95,z+3.6,scene);kreis(x+q,z+3.6,.5)});
    const sk=grp(x+4,0,z+4.4,scene);sk.rotation.y=.4;box(1.1,.4,.7,0x3b8fc4,0,.65,0,sk,true);cyl(.25,.1,0x222222,.65,.28,0,sk).rotation.x=Math.PI/2;sph(.4,0xe8c850,0,.95,0,sk,1.2,.5,.8);[-1,1].forEach(s=>box(.9,.05,.05,0x6a4220,-.9,.7,s*.3,sk));kreis(x+4,z+4.4,.9);
    const kw=grp(x,0,wz,scene);kw.userData.keep=1;box(2.2,.5,1.2,0xa8743f,0,.8,0,kw,true);sph(.9,0xe8c850,0,1.2,0,kw,1.2,.55,.8);[[-.8,.5],[-.8,-.5],[.8,.5],[.8,-.5]].forEach(p=>cyl(.3,.1,0x222222,p[0],.3,p[1]*1.1,kw).rotation.x=Math.PI/2);box(1,.06,.06,0x6a4220,-1.6,1,0,kw);
    const wa=grp(-1.9,0,0,kw);cyl(.3,.9,0x3e7a4a,0,.95,0,wa);sph(.23,0xf0c8a0,0,1.6,0,wa);box(.5,.1,.4,0x3e7a4a,.05,1.82,0,wa);cyl(.1,.8,0x2a4a8a,0,.4,0,wa);
    wa.userData.frei=1;vmVerschm(kw);bewegt(kw,t=>{const a=t*.13,xx=x+Math.sin(a)*22,sg=Math.cos(a)>0?1:-1,s=pz(PW_35,xx+1)-pz(PW_35,xx);kw.position.set(xx,0,pz(PW_35,xx));kw.rotation.y=Math.atan2(-sg*s,sg);wa.position.y=Math.abs(Math.sin(t*5))*.06});
    bank(x-8,z+3.2,Math.PI/2)})();
  /* Tierarztstation */
  (function(){const b=EXTRAZONEN[17],x=b.x,z=b.z,wz=pz(PW_35,x);
    cyl(8,.1,0xe6dcb4,x,.05,z+2,scene).receiveShadow=true;pfad(x,z+3.5,x,wz-1.5,3.5);
    haus(x,z,8,6,0xf4f4f0,0x3b8fc4);fassade(x,z,8,6,-1.5,[1.8]);box(.9,.3,.1,0xe0302a,x+.1,1.4,z+3.1,scene);box(.3,.9,.1,0xe0302a,x+.1,1.4,z+3.1,scene);
    const tt=grp(x-5.8,0,z+2.8,scene);box(1.8,.12,1,0xdde4ea,0,.85,0,tt,true);[[-.8,-.4],[.8,-.4],[-.8,.4],[.8,.4]].forEach(p=>cyl(.05,.85,0x8a9aa6,p[0],.42,p[1],tt));kreis(x-5.8,z+2.8,1.1);
    const sh=tier(schaf,x-5.8,z+2.8,x-5.8,z+10,.6);sh.position.y=.9;
    const van=grp(x+7,0,z+3.2,scene);van.userData.keep=1;box(3,1.4,1.6,0xffffff,0,1.2,0,van,true);box(1,1,1.5,0xffffff,1.9,.95,0,van);box(.05,.55,1.3,0x9fd0ea,2.42,1.15,0,van);box(3.02,.2,1.62,0xe0605a,0,.85,0,van);[1,-1].forEach(s=>{box(.7,.2,.05,0xe0302a,-.3,1.5,s*.83,van);box(.2,.7,.05,0xe0302a,-.3,1.5,s*.83,van)});
    [[-.9,.8],[-.9,-.8],[1.8,.8],[1.8,-.8]].forEach(p=>cyl(.35,.2,0x222222,p[0],.35,p[1],van).rotation.x=Math.PI/2);const li=box(.4,.14,.4,0x3b8fc4,.9,1.98,0,van);bewegt(li,t=>{li.visible=Math.sin(t*6)>0});vmVerschm(van);sperrKasten(x+7,z+3.2,3.2,1.8,0);
    tonne(x+9.5,z+5.5);bank(x-8,z+4.6,Math.PI/2)})();
  /* Flamingoteich */
  (function(){const b=EXTRAZONEN[18],x=b.x,z=b.z;
    cyl(8,.1,0xdcecc0,x,.04,z,scene).receiveShadow=true;
    wasserFl(x,z,5.5,WASSER);wasserFl(x-.8,z+.6,3.4,0x6ec0ea,.02);const ring=new THREE.Mesh(new THREE.TorusGeometry(5.7,.3,6,36),mat(0xb8bec4));ring.rotation.x=Math.PI/2;ring.position.set(x,.25,z);scene.add(ring);sperrRing(x,z,5.9,36);
    for(let i=0;i<14;i++){const a=i/14*6.283;felsen(x+Math.cos(a)*6.2,z+Math.sin(a)*6.2,.45+rnd()*.3)}
    [[2.5,0,1],[1,2.8,1.1],[-1.8,2.4,.95],[-3.2,.2,1],[-1.6,-2.5,1.05],[1.3,-2.8,.95],[3.2,-1.6,1],[0,.2,1.1]].forEach((p,i)=>{const f=tier(flamingo,x+p[0],z+p[1],x,z,p[2],.5);f.position.y=.1;f.rotation.y+=i*1.1});
    const lp=[],rd=[],bl=[];for(let i=0;i<10;i++){const a=i*2.1,r=1.5+(i%4)*.9;lp.push([x+Math.cos(a)*r,.2,z+Math.sin(a)*r,.55,.03,.55]);if(i%3===0)bl.push([x+Math.cos(a)*r,.28,z+Math.sin(a)*r,.12,.1,.12])}
    for(let i=0;i<34;i++){const a=i/34*6.283+rnd()*.1,r=5.2+rnd()*.5;rd.push([x+Math.cos(a)*r,.8,z+Math.sin(a)*r,.05,.8+rnd()*.5,.05])}
    instanziert(gCyl,0x4aa84e,lp);instanziert(gSph,0xf0a0c8,bl);instanziert(gCyl,0xc9b97a,rd);
    bank(x+9,z+1,-Math.PI/2);bank(x-9,z+1,Math.PI/2)})();
  /* Zoo-Schule (Klassenzimmer im Freien) */
  (function(){const b=EXTRAZONEN[19],x=b.x,z=b.z;
    cyl(8,.1,0xe6dcb4,x,.05,z,scene).receiveShadow=true;
    [[-2.8,-1.9],[2.8,-1.9],[-2.8,1.9],[2.8,1.9]].forEach(p=>{cyl(.12,2.8,0x7a5230,x+p[0],1.4,z-2.2+p[1],scene,true);kreis(x+p[0],z-2.2+p[1],.3)});
    const r=box(6.6,.15,4.6,0x4a9a5a,x,2.9,z-2.2,scene,true);r.rotation.x=.14;
    const tf=grp(x,0,z-3.8,scene);box(4,2,.12,0x2f5a45,0,1.6,0,tf,true);[[-2.1,0],[2.1,0]].forEach(p=>box(.12,2.1,.14,0x8a5a32,p[0],1.6,0,tf));box(4.3,.1,.16,0x8a5a32,0,.55,0,tf);box(4.3,.1,.16,0x8a5a32,0,2.65,0,tf);[-1.4,1.4].forEach(p=>box(.12,.55,.14,0x8a5a32,p,.28,0,tf));
    [[-1.4,1.8,.9],[-.2,1.5,1.2],[1.1,1.9,.7]].forEach(p=>box(p[2],.05,.02,0xffffff,p[0],p[1],.08,tf));sph(.35,0xe8a060,1.2,1.4,.09,tf,1,.7,.1);sph(.3,0x6aa84a,-1.2,1.1,.09,tf,1.2,.8,.1);box(.4,.06,.12,0xffffff,0,.62,.1,tf);sperrKasten(x,z-3.8,4.4,.5,0);
    [[-2.6,z+1.2],[2.6,z+1.2],[-2.6,z+3.6],[2.6,z+3.6]].forEach(p=>bank(x+p[0],p[1],Math.PI));
    const gl=grp(x-6.5,0,z+1.5,scene);gl.userData.keep=1;cyl(.08,1.3,0x6a4220,0,.65,0,gl,true);const ku=grp(0,1.6,0,gl);sph(.55,0x3b8fc4,0,0,0,ku);[[.3,.2,.5,.2],[-.4,.1,.4,.18],[.1,-.3,.45,.15]].forEach(p=>sph(.17,0x6aa84a,p[0],p[1],p[2],ku,1,1,.5));bewegt(ku,t=>{ku.rotation.y=t*.4});kreis(x-6.5,z+1.5,.5);
    tonne(x+7,z+3);vogelhaus(x+7.5,z-1.5)})();
  /* ----- Landschaft: Büsche, Blumen, Gras, Hecken ----- */
  const KT=[[58,1,10.8],[22,-1,10.8],[-22,1,10.8],[-84,-1,10.8],[-118,1,10.8],[40,1,10.8],[58,-1,7.6],[-12,1,7.6],[-60,-1,7.6],[-112,1,7.6],[-142,-1,7.6]].map(q=>[wegX(q[0])+q[1]*q[2],q[0]]);
  const frei2=(x,z,m)=>{for(const k of KT){if(Math.hypot(x-k[0],z-k[1])<m+1.5)return false}for(const d of [[0,0],[m,0],[-m,0],[0,m],[0,-m]]){const p=hindernisse(x+d[0],z+d[1]);if(Math.hypot(p[0]-x-d[0],p[1]-z-d[1])>.02)return false}return true};
  (function(){const sz=[102,70,0,-68,-132],bu1=[],bu2=[],fl=[[],[],[],[]],st=[],gr=[],he=[];const fc=[0xe0605a,0xffd45e,0xf59e3f,0xb06ae0];
    for(let zz=100;zz>TORZ+10;zz-=5.5){if(Math.abs(zz-117)<17)continue;let skip=false;SEITENWEGE.forEach(w=>{if(Math.abs(zz-w)<9)skip=true});sz.forEach(q=>{if(Math.abs(zz-q)<5)skip=true});if(skip)continue;
      [-1,1].forEach(sd=>{const x=wegX(zz)+sd*(8.5+rnd()*2.5),s=1+rnd()*.8,zb=zz+(rnd()-.5)*2;const lst=rnd()<.5?bu1:bu2;if(!frei2(x,zb,1.4*s))return;lst.push([x,.55*s,zb,1.2*s,.85*s,1.1*s])})}
    for(let zz=96;zz>TORZ+10;zz-=11){if(Math.abs(zz-117)<17)continue;let skip=false;SEITENWEGE.forEach(w=>{if(Math.abs(zz-w)<9)skip=true});sz.forEach(q=>{if(Math.abs(zz-q)<6)skip=true});if(skip)continue;
      [-1,1].forEach(sd=>{const cx=wegX(zz)+sd*6.9;for(let i=0;i<6;i++){const x=cx+(rnd()-.5)*1.6,z2=zz+(rnd()-.5)*2.2;if(!frei2(x,z2,.2))continue;st.push([x,.25,z2,.03,.5,.03]);fl[(i+(sd>0?1:0))%4].push([x,.55,z2,.14,.14,.14])}})}
    const okG=(x,z)=>{for(const k in BEREICHE){const q=BEREICHE[k];if(Math.hypot(x-q.x,z-q.z)<(k==='eingang'?17:21))return false}for(const e of EXTRAZONEN){if(Math.hypot(x-e.x,z-e.z)<(e.r||0)+2)return false}if(z>TORZ+2&&Math.abs(x-wegX(z))<3.6)return false;if(z<TORZ+14)return false;
      if(Math.abs(z-pz(PW35,Math.max(-76,Math.min(92,x))))<3.6&&x>-78&&x<94)return false;if(Math.abs(z-pz(PW_35,x))<3.6)return false;if(Math.abs(z-pz(PW_100,Math.max(-92,Math.min(92,x))))<3.6&&Math.abs(x)<94)return false;return true};
    for(let i=0,n=0;i<900&&n<260;i++){const x=GRENZE.x0+4+rnd()*(GRENZE.x1-GRENZE.x0-8),z=GRENZE.z0+60+rnd()*(GRENZE.z1-GRENZE.z0-70);if(!okG(x,z))continue;const s=.7+rnd()*.7;gr.push([x,.2*s,z,.16*s,.4*s,.16*s]);n++}
    [[45,28,9.6],[-45,30,8.8],[45,-41,9.6],[-45,-41,8.2]].forEach(p=>[-1,1].forEach(sd=>{const hx=p[0]+sd*p[2];he.push([hx,.55,p[1],4,1.1,1.1]);sperrKasten(hx,p[1],4,1.1,0)}));
    instanziert(gSph,0x3f9a46,bu1);instanziert(gSph,0x5cba5c,bu2);instanziert(gCyl,0x3f9a46,st);fl.forEach((l,i)=>instanziert(gSph,fc[i],l));instanziert(gCone,0x58b04a,gr);instanziert(gBox,0x2f8a3e,he)})();
  /* ----- Kleinteile ----- */
  (function(){[[58,1],[22,-1],[-22,1],[-84,-1],[-118,1],[40,1]].forEach(q=>vogelhaus(wegX(q[0])+q[1]*10.8,q[0]));
    [[58,-1],[-12,1],[-60,-1],[-112,1],[-142,-1]].forEach(q=>trinkbrunnen(wegX(q[0])+q[1]*7.6,q[0]))})();
  /* ----- Bewegung: Zoo-Bahn, Vögel, Schmetterlinge ----- */
  (function(){const g=grp(0,0,100,scene);g.userData.keep=1;
    function rad(par,x,z,r){cyl(r,.2,0x222222,x,r,z,par).rotation.z=Math.PI/2}
    const lok=grp(0,0,0,g);box(1.5,.9,2.4,0x3b9a5a,0,.95,.4,lok,true);box(1.5,1,1.1,0xe8d8a0,0,1.85,-.7,lok);box(1.7,.12,1.3,0xe0605a,0,2.4,-.7,lok);cyl(.18,.7,0x333333,0,1.8,1.2,lok);[-.5,.5].forEach(s=>sph(.1,0xfff0a0,s,1,1.62,lok));[-.8,.8].forEach(s=>{rad(lok,s,1,.35);rad(lok,s,-.8,.35)});[-1,1].forEach(s=>box(.05,.5,.7,0x9fd0ea,s*.76,1.9,-.7,lok));
    [-4,-8].forEach((oz,i)=>{const w=grp(0,0,oz,g);box(1.7,.3,3,i?0x3b8fc4:0xf5d442,0,.6,0,w,true);[-1,1].forEach(s=>box(1.5,.1,.5,0x9a5a30,0,1,s*.8,w));[[-.8,-1.4],[.8,-1.4],[-.8,1.4],[.8,1.4]].forEach(p=>cyl(.06,1.6,0x7a5230,p[0],1.5,p[1],w));box(1.9,.1,3.2,0xe0605a,0,2.3,0,w);[-.8,.8].forEach(s=>{rad(w,s,1,.3);rad(w,s,-1,.3)})});
    vmVerschm(g);bewegt(g,t=>{const v=4.5,L=270,P=2*(L/v+4);const u=t%P;let pos,sgn;if(u<L/v){pos=u*v;sgn=-1}else if(u<L/v+4){pos=L;sgn=-1}else if(u<2*L/v+4){pos=L-(u-L/v-4)*v;sgn=1}else{pos=0;sgn=1}const z=100-pos;g.position.set(wegX(z),0,z);g.rotation.y=Math.atan2(wegX(z+sgn)-wegX(z),sgn)})})();
  (function(){function vogel(cx,cz,r,h,ph,c){const g=grp(cx+r,h,cz,scene);g.userData.keep=1;sph(.22,c,0,0,0,g,1.7,.8,.8);cone(.08,.3,0xf59e3f,.38,0,0,g).rotation.z=-Math.PI/2;const fl=[-1,1].map(s=>box(.12,.03,.6,c,0,.02,s*.35,g));
      bewegt(g,t=>{const a=t*.25+ph;g.position.set(cx+Math.cos(a)*r,h+Math.sin(t*.7+ph)*1.2,cz+Math.sin(a)*r);g.rotation.y=-a-Math.PI/2;fl[0].rotation.x=Math.sin(t*9)*.5;fl[1].rotation.x=-Math.sin(t*9)*.5})}
    vogel(-40,40,45,26,0,0x3a3f4a);vogel(40,-40,50,30,2,0x8a6a44);vogel(0,-100,35,24,4,0x3a3f4a);vogel(0,80,30,28,1,0xe8e8e8);
    function falter(cx,cz,r,farbe,ph){const g=grp(cx+r,1.3,cz,scene);g.userData.keep=1;sph(.06,0x3a2a22,0,0,0,g,2,.6,.6);const fl=[-1,1].map(s=>sph(.22,farbe,0,0,s*.2,g,.9,.1,1.1));
      bewegt(g,t=>{const a=t*.5+ph;g.position.set(cx+Math.cos(a)*r,1.3+Math.sin(t*1.7+ph)*.4,cz+Math.sin(a*1.3)*r);g.rotation.y=-a;const f=Math.sin(t*16+ph)*.7;fl[0].rotation.x=f;fl[1].rotation.x=-f})}
    falter(-11,127,3.5,0xffd45e,0);falter(13,129,3.5,0xf06a9c,2);falter(45,-97,8,0xf59e3f,1);falter(-45,-97,6,0xb06ae0,3);falter(wegX(-20)+7,-20,3,0x4aa8e0,4)})();

  /* ========== Dichte-Runde 2 (24.11.2026): Fläche 340 x 380, 10 neue Orte, Landschaft, Bewegung ========== */
  /* ----- Wege: Ringweg um den ganzen Zoo mit Promenade vor dem Eingang, Stichwege zu den neuen Orten ----- */
  weg(LOOPPTS,4.2);SPURS.forEach(q=>weg(q,3.4));
  [[132,92,5.5],[133,40,5.5],[-133,40,5.5],[-132,-72,5.5],[0,-174,7]].forEach(k=>kreuzplatz(k[0],k[1],k[2]));
  /* ----- Bäche mit Teichen am Ende und begehbaren Brücken ----- */
  function bruecke(x,z,s,w){let bi=0,bd=1e9;s.forEach((q,i)=>{const d=Math.hypot(q[0]-x,q[1]-z);if(d<bd){bd=d;bi=i}});const a=s[Math.max(0,bi-1)],c=s[Math.min(s.length-1,bi+1)],th=Math.atan2(-(c[1]-a[1]),c[0]-a[0]);
    const g=grp(s[bi][0],0,s[bi][1]);g.rotation.y=th;const L=w+5.4;box(4.6,.1,L,0x9a6a3a,0,.14,0,g,true);for(let i=0;i<9;i++)box(4.5,.05,.12,0x6a4220,0,.2,-L/2+.6+i*(L-1.2)/8,g);
    [-1,1].forEach(sg=>{box(.14,.14,L,0x6a4220,sg*2.2,1.05,0,g);box(.14,.14,L,0x6a4220,sg*2.2,.65,0,g);for(let i=0;i<5;i++)box(.18,1.0,.18,0x7a5230,sg*2.2,.5,-L/2+.3+i*(L-.6)/4,g)});
    [-1,1].forEach(sg=>box(4.6,.08,1.2,0x9a6a3a,0,.08,sg*(L/2+.5),g))}
  BACHDATEN.forEach(b=>{const s=spl(b.p,2.2),r=b.w/2+.15;wegBand(s,b.w+1.4,0xb9a577,.056);wegBand(s,b.w,WASSER,.082);b.s=s;
    const nb=(x,z)=>b.b.some(q=>Math.hypot(x-q[0],z-q[1])<r+1.9);
    for(let i=0;i<s.length-1;i++){if(nb(s[i][0],s[i][1])||nb(s[i+1][0],s[i+1][1]))continue;sperrLinie(s[i][0],s[i][1],s[i+1][0],s[i+1][1],r)}
    const t=b.t;wasserFl(t[0],t[1],t[2],WASSER);sperrRing(t[0],t[1],t[2]+.1,30);for(let i=0;i<18;i++){const a=i/18*6.283;felsen(t[0]+Math.cos(a)*(t[2]+.9),t[1]+Math.sin(a)*(t[2]+.9),.5+rnd()*.35)}
    b.b.forEach(q=>bruecke(q[0],q[1],s,b.w))});

  /* ----- Hilfen für die neuen Orte ----- */
  const SOCK=(x,z,r,c)=>{const o=cyl(r,.12,c,x,.06,z,scene);o.receiveShadow=true;return o};
  const WALD=[0x2f6b4a,0x37805a,0x3e9468,0x2a5f40];
  /* ===== 1) Delfin- und Seelöwen-Show (100|90) ===== */
  (function(){const cx=100,cz=90,pz0=84;SOCK(cx,cz,21,0xdcd4be);
    box(23.6,1,13.6,0xb8bec4,cx,.5,pz0,scene,true);box(21.6,.1,11.6,0x56b2e6,cx,1.02,pz0,scene);sperrKasten(cx,pz0,23.8,13.8,0);
    [94,106].forEach(gx=>{[-1,1].forEach(sg=>{cyl(.18,6,0xe0605a,gx,3,pz0+sg*7.6,scene,true);kreis(gx,pz0+sg*7.6,.35)});box(.25,.25,15.6,0xe0605a,gx,6,pz0,scene);
      const r=new THREE.Mesh(new THREE.TorusGeometry(1.5,.14,6,20),mat(0xffd45e));r.rotation.y=Math.PI/2;r.position.set(gx,3.6,pz0);scene.add(r);cyl(.03,2.3,0x333333,gx,5.0,pz0,scene)});
    function springer(fn,sk,per,ph,zz,dir){const a=fn(scene),an=a.userData.anim;a.scale.setScalar(sk);a.userData.anim=null;a.visible=false;
      bewegt(a,t=>{const u=((t+ph)%per)/per,s=u/.4;if(s>1){a.visible=false;return}a.visible=true;const x=cx+dir*(-10+s*20),q=(x-cx)/10,y=1.0+4*(1-q*q),dydx=-4*2*q/10;a.position.set(x,y,pz0+zz);a.rotation.y=dir>0?0:Math.PI;a.rotation.z=Math.atan(dydx*dir);if(an)an(t)})}
    springer(seeloewe,.8,8,0,-2,1);springer(delfin,.7,8,2,2,-1);springer(seeloewe,.8,8,4,2,-1);springer(delfin,.7,8,6,-2,1);
    [[-4,2],[3,-3],[7,3]].forEach((p,i)=>sph(.45,[0xe0605a,0xffd45e,0x3b8fc4][i],cx+p[0],1.5,pz0+p[1],scene));
    const bx=cx,bz=pz0-9.4;box(9,.7,3.4,0xe8d8a0,bx,.35,bz,scene,true);sperrKasten(bx,bz,9,3.4,0);
    [-2.8,2.8].forEach(o=>{const s=tier(seeloewe,bx+o,bz,bx+o,bz+10,.8);s.position.y=.7});
    const t=erwachsener(scene,0x2a7ab8,0x2a2a3a,'cap');t.g.position.set(bx,.7,bz);t.al.rotation.x=-.5;cyl(.35,.5,0x3b8fc4,bx-1.8,.95,bz+.5,scene);[0,1,2].forEach(i=>sph(.14,0xc8d4dc,bx-1.95+i*.2,1.28,bz+.5,scene,1.6,.6,.6));
    const tz=pz0+10.8;for(let k=0;k<4;k++){const h=(k+1)*.8,z=tz+1.3+k*2.4;box(24,h,2.4,0xd8c8a0,cx,h/2,z,scene,true);box(23,.1,.9,k%2?0x3b8fc4:0xe0605a,cx,h+.05,z+.2,scene)}sperrKasten(cx,tz+4.9,24,9.6,0);
    [-11.5,11.5].forEach(o=>{cyl(.2,6.2,0x6a4220,cx+o,3.1,tz+9.7,scene,true);kreis(cx+o,tz+9.7,.3)});box(25.5,.25,12,0xe0605a,cx,6.3,tz+4.9,scene);
    [[-6,1],[0,1],[6,1],[-3,2],[3,2],[0,3]].forEach((q,i)=>{const h=(q[1]+1)*.8,k=kindModell(Object.assign({},AVATARE[(i+2)%8]),scene);k.g.position.set(cx+q[0],h,tz+1.4+q[1]*2.4);k.g.rotation.y=Math.PI});
    [-1,1].forEach(s=>{cyl(.08,6,0xdddddd,cx+s*13.2,3,pz0+4,scene);box(1.6,.9,.04,s>0?0xe0605a:0x3b8fc4,cx+s*13.2+.8*s,5.4,pz0+4,scene);kreis(cx+s*13.2,pz0+4,.25)});
    bank(cx+16,cz-2,-Math.PI/2);tonne(cx+16,cz+4)})();
  /* ===== 2) Greifvogel-Schau (-100|84) ===== */
  (function(){const cx=-100,cz=76;SOCK(cx,cz+8,20,0xd8d0a8);const pts=[];
    [9,11.4,13.8].forEach((R,k)=>{for(let i=0;i<9;i++){const th=Math.PI*(.2+.6*i/8),x=cx+R*Math.cos(th),z=cz+R*Math.sin(th),hh=.5+k*.6,b=box(R*.236*1.04,hh+.35,1.5,k%2?0xb08850:0x9a6a3a,x,(hh+.35)/2,z,scene,true);b.rotation.y=-th-Math.PI/2;if(k===1)pts.push([x,z])}});
    for(let i=0;i<pts.length-1;i++)sperrLinie(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],3.3);
    SOCK(cx,cz,4.2,0xc9a46a).position.y=.1;
    [[-6,-3],[6,-3],[0,-8]].forEach(p=>{const x=cx+p[0],z=cz+p[1];cyl(.1,1.7,0x6a4220,x,.85,z,scene,true);box(.9,.08,.08,0x6a4220,x,1.7,z,scene);const a=adler(scene,true);a.position.set(x,1.75,z);blick(a,cx-x,cz-z);a.rotation.z=.12;a.userData.keep=1;lebendig.push({o:a,ph:p[0]});kreis(x,z,.35)});
    const f=erwachsener(scene,0x5a7a3a,0x4a3a2a,'cap');f.g.position.set(cx,0,cz-1.5);f.ar.rotation.x=-1.45;kreis(cx,cz-1.5,.7);const ea=adler(f.g,true);ea.position.set(.47,1.5,.8);ea.rotation.y=-Math.PI/2;ea.rotation.z=.12;ea.scale.setScalar(.5);lebendig.push({o:ea,ph:1});
    [0,2.4].forEach((ph,i)=>{const a=adler(scene,false),an=a.userData.anim;a.scale.setScalar(1.6);a.userData.anim=null;bewegt(a,t=>{const u=t*.35+ph,R=11+i*3;a.position.set(cx+Math.cos(u)*R,9+Math.sin(t*.5+ph)*1.2+i*2,cz+Math.sin(u)*R);a.rotation.y=Math.atan2(-Math.cos(u),-Math.sin(u));an(t)})});
    felsen(cx-8,cz-16,2.6);felsen(cx,cz-18,3.4);felsen(cx+9,cz-16,2.2);felsen(cx+4,cz-17,1.6);
    haus(cx-17,cz-6,6,4,0x9a7a5a,0x6a4a2a);fassade(cx-17,cz-6,6,4,0,[-1.8,1.8]);
    [-1,1].forEach(s=>{cyl(.08,6,0xdddddd,cx+s*16,3,cz+6,scene);box(1.6,.9,.04,s>0?0xffd45e:0x4caf6a,cx+s*16+.8*s,5.4,cz+6,scene);kreis(cx+s*16,cz+6,.25)});
    bank(cx+13,cz-8,0);tonne(cx-12,cz+3)})();
  /* ===== 3) Pandagarten (-153|-72) ===== */
  (function(){const cx=-153,cz=-72;SOCK(cx,cz,15,0xcfe0a8);zaun(cx,cz,15,60,0);
    [[-8,-6,6],[-9,5,5],[-2,-11,5],[5,-9,4],[-12,-1,4]].forEach(h=>{const hx=cx+h[0],hz=cz+h[1];for(let i=0;i<h[2]*5;i++){const a=rnd()*6.283,r=rnd()*h[2]*.5,H=4.4+rnd()*2.6,x=hx+Math.cos(a)*r,z=hz+Math.sin(a)*r;inst('cyl',x,H/2,z,.09,H,.09,rnd()<.5?0x7ab648:0x8cc45a);inst('sph',x,H-.1,z,.55,.3,.55,rnd()<.5?0x5cb04a:0x7acb5a)}kreis(hx,hz,h[2]*.4)});
    wasserFl(cx+5,cz+6,3.6,WASSER);sperrRing(cx+5,cz+6,3.7,18);for(let i=0;i<10;i++){const a=i/10*6.283;felsen(cx+5+Math.cos(a)*4.2,cz+6+Math.sin(a)*4.2,.45+rnd()*.3)}
    felsen(cx+10,cz-3,1.8);felsen(cx-3,cz+10,1.4);felsen(cx+2,cz-12,1.6);
    [[-5,-1],[-5,3]].forEach(p=>{cyl(.25,3,0x7a5230,cx+p[0],1.5,cz+p[1],scene,true);kreis(cx+p[0],cz+p[1],.4)});box(.3,.3,5,0x7a5230,cx-5,3,cz+1,scene);cyl(.04,1.5,0x6a4220,cx-5,2.2,cz-.2,scene);cyl(.5,.2,0x2a2a2a,cx-5,1.4,cz-.2,scene);
    const h=haus(cx-4,cz-10.5,4.4,3.4,0xc9a46a,0x4aa84e);fassade(cx-4,cz-10.5,4.4,3.4,0,[-1.4,1.4]);
    tier(panda,cx-1,cz-3,cx+14,cz,.85,1.1);tier(panda,cx+5,cz-7,cx+14,cz,.9,1.1);tier(panda,cx+1,cz+7,cx+14,cz,.5,.6);
    [[8,8],[10,-9]].forEach(p=>{const b=grp(cx+p[0],0,cz+p[1]);cyl(.04,2.4,0x7ab648,0,1.2,0,b);cyl(.04,2.2,0x7ab648,.2,1.1,.1,b);sph(.4,0x4aa84e,0,2.4,0,b,1,.5,1)});
    bank(cx+10,cz+12,-.4)})();
  /* ===== 4) Wolfswald (98|-146) ===== */
  (function(){const cx=98,cz=-146;SOCK(cx,cz,15,0x7d9a62);zaun(cx,cz,15,64,-Math.PI/2);
    [[-9,-6,1.3],[-4,-11,1.1],[6,-10,1.2],[10,-4,1],[-11,4,1.1],[-6,9,1],[8,8,1.2],[1,-3,.9],[-13,-2,1.2],[12,3,1]].forEach(p=>tanne(cx+p[0],cz+p[1],p[2]));
    felsen(cx-8,cz-4,2);felsen(cx-9.5,cz-1,1.5);felsen(cx-6,cz-6,1.6);sph(1.5,0x1a1a1c,cx-7.4,.7,cz-2.6,scene,1,.8,1);felsen(cx+7,cz-6,2.2);felsen(cx+4,cz+7,1.3);
    tier(wolf,cx+1,cz+4,cx+8,cz+12,1,1.2);tier(wolf,cx-3,cz+8,cx+8,cz+12,.9,1.1);tier(wolf,cx+9,cz+1,cx+14,cz+14,.95,1.1);
    const hw=tier(wolf,cx+7,cz-6,cx+12,cz+10,.85);hw.position.y=2.4;
    stamm(cx+3,cz-1,.4,3.4);stamm(cx-5,cz+2,1.9,2.6);
    for(let i=0;i<3;i++)sph(.18,[0x9a6a3a,0xc98a4b,0x6a4220][i],cx+2+i*.7,.15,cz-2.8+i*.5,scene,2.2,.4,.6);
    bank(cx+2,cz+19,0)})();
  /* ===== 5) Nashorn- und Straußenwiese (152|35) ===== */
  (function(){const cx=152,cz=35;SOCK(cx,cz,15,0xd9c98a);zaun(cx,cz,15,60,Math.PI);
    wasserFl(cx+5,cz-5,3.6,0x8a6a4a);sperrRing(cx+5,cz-5,3.7,18);
    tier(nashorn,cx-3,cz-3,cx+14,cz,1,1.7);tier(nashorn,cx+8,cz+7,cx-14,cz,.8,1.4);tier(nashorn,cx+1,cz+9,cx+14,cz,.5,.9);
    [[-8,-8,1],[-2,3,0],[5,-11,0],[9,0,0],[-10,4,1]].forEach(p=>{const o=tier(function(par){return strauss(par,p[2])},cx+p[0],cz+p[1],cx-14,cz+3,.75,.6)});
    akazie(cx-9,cz+8);akazie(cx+11,cz-8);felsen(cx-11,cz-2,1.5);felsen(cx+12,cz+6,1.2);trog(cx-4,cz+13,0);heu(cx+9,cz+10,.5);heu(cx+7,cz+12,1)})();

  /* ===== 6) Otter- und Biberbach (-98|-148): Bach, Biberdamm, Biberburg, Wasserrad ===== */
  (function(){const cx=-98,cz=-148,s=BACHDATEN[0].s;const nb=x=>{let bi=1,bd=1e9;s.forEach((q,i)=>{const d=Math.abs(q[0]-x);if(d<bd&&i>0&&i<s.length-1){bd=d;bi=i}});return bi};
    const fr=(i)=>{const a=s[i-1],c=s[i+1];return {p:s[i],th:Math.atan2(-(c[1]-a[1]),c[0]-a[0])}};const lw=(f,lx,lz)=>[f.p[0]+lx*Math.cos(f.th)+lz*Math.sin(f.th),f.p[1]-lx*Math.sin(f.th)+lz*Math.cos(f.th)];
    /* Biberdamm */
    {const f=fr(nb(-109)),g=grp(f.p[0],0,f.p[1]);g.rotation.y=f.th;for(let r=0;r<3;r++)for(let j=0;j<3;j++){const l=cyl(.2,5.8-r*.4,[0x7a5230,0x8a6240,0x6a4220][(r+j)%3],(j-1)*.42+(r%2)*.15,.22+r*.34,0,g,true);l.rotation.x=Math.PI/2;l.rotation.y=(j-1)*.08}
      for(let i=0;i<7;i++){const st=cyl(.04,1.2,0x8a5a32,-.6,.6,-2.4+i*.8,g);st.rotation.z=.5+(i%3)*.15}sperrKasten(f.p[0],f.p[1],1.6,6.6,f.th);
      [2.9,-2.9].forEach((o,i)=>{const q=lw(f,i?.8:-.6,o*1.05);tier(biber,q[0],q[1],f.p[0],f.p[1],1,.8)})}
    /* Biberburg im Teich */
    {const t=BACHDATEN[0].t;sph(2.3,0x7a5a3a,t[0],.5,t[1],scene,1,.8,1);for(let i=0;i<14;i++){const a=i*.9,r=1.6+(i%3)*.3,c=cyl(.07,1.6,0x8a6240,t[0]+Math.cos(a)*r,1.0+(i%2)*.4,t[1]+Math.sin(a)*r,scene);c.rotation.z=Math.cos(a)*.6;c.rotation.x=Math.sin(a)*.6}sph(.5,0x1a1410,t[0]+2.0,.5,t[1]+.3,scene,1,1,1.2)}
    /* Wasserrad mit Mühlhaus */
    {const f=fr(nb(-121)),g=grp(f.p[0],0,f.p[1]);g.rotation.y=f.th;[-1,1].forEach(o=>{cyl(.15,2.6,0x6a4220,0,1.3,o*2.3,g,true)});cyl(.12,5,0x4a3220,0,1.7,0,g).rotation.x=Math.PI/2;
      const w=grp(0,1.7,0,g);const rim=new THREE.Mesh(new THREE.TorusGeometry(1.5,.1,6,18),mat(0x6a4220));w.add(rim);for(let i=0;i<8;i++){const a=i/8*6.283;const sp=box(.1,3,.1,0x7a5230,0,0,0,w);sp.rotation.z=a;box(.14,.5,1.2,0x9a6a3a,Math.cos(a)*1.5,Math.sin(a)*1.5,0,w).rotation.z=a}
      vmVerschm(w);bewegt(w,t=>{w.rotation.z=-t*.7});const m=lw(f,0,-5.8);haus(m[0],m[1],4.6,3.6,0x9a7a5a,0xb94a3a);fassade(m[0],m[1],4.6,3.6,0,[-1.5,1.5]);const bq=lw(f,0,3.8);tier(otter,bq[0],bq[1],f.p[0],f.p[1],1.1,.6)}
    {const f=fr(nb(-100)),q=lw(f,-2,2.8),q2=lw(f,3,3.4);tier(otter,q[0],q[1],f.p[0],f.p[1],1.1,.6);const lg=lw(f,5,3.6);stamm(lg[0],lg[1],f.th+.3,3);const o3=tier(otter,q2[0],q2[1],f.p[0],f.p[1],1,.6)}
    /* Schilf, Seerosen */
    for(let i=0;i<46;i++){const k=2+Math.floor(rnd()*(s.length-4)),f=fr(k),o=(rnd()<.5?-1:1)*(2.4+rnd()*.8),q=lw(f,rnd()*1.5,o),H=1+rnd()*1.1;inst('cyl',q[0],H/2,q[1],.04,H,.04,0x8a9a4a);if(i%3===0)inst('cyl',q[0],H,q[1],.07,.4,.07,0x6a4220)}
    const t0=BACHDATEN[0].t;for(let i=0;i<9;i++){const a=i*.8,r=1+rnd()*3.4;inst('cyl',t0[0]+Math.cos(a)*r-1,.22,t0[1]+Math.sin(a)*r,.5,.04,.5,0x3f9a46);if(i%3===0)inst('blm',t0[0]+Math.cos(a)*r-1,.32,t0[1]+Math.sin(a)*r,.16,.12,.16,0xf47ab0)}
    bank(cx+8,cz-12,0);bank(cx-4,cz-14,0)})();
  /* ===== 7) Kletterturm mit Hängebrücke (-153|38) ===== */
  (function(){const cx=-153,cz=38,tx=-157;SOCK(cx,cz,15,0xc9a46a);
    function turm(z,dach){[[-2,-2],[2,-2],[-2,2],[2,2]].forEach(p=>cyl(.22,6.6,0x8a5a32,tx+p[0],3.3,z+p[1],scene,true));box(4.6,.28,4.6,0xa8743f,tx,4.6,z,scene,true);
      [-2,2].forEach(o=>{box(.12,.9,4.4,0x6a4220,tx+o,5.2,z,scene);box(4.4,.9,.12,0x6a4220,tx,5.2,z+o,scene)});if(dach)cone(3.8,1.8,dach,tx,7.5,z,scene);sperrKasten(tx,z,4.6,4.6,0)}
    turm(29,0xb94a3a);turm(47,0x3b8fc4);
    /* Netz an Turm 1 (Ostseite, schräg nach außen) */
    {const n=grp(tx+2.3+2.45,0,29);n.rotation.z=.5;[-1.8,-.9,0,.9,1.8].forEach(o=>cyl(.035,5.2,0xc9a46a,0,2.6,o,n));for(let i=0;i<7;i++)box(.05,.05,4,0xc9a46a,0,.4+i*.75,0,n);sperrKasten(tx+3.4,29,2.4,4.6,0)}
    /* Kletterwand an Turm 2 (Westseite) */
    box(.2,4.6,3.8,0x9a6a3a,tx-2.4,2.3,47,scene);for(let i=0;i<14;i++)sph(.16,[0xe0605a,0xffd45e,0x3b8fc4,0x4caf6a][i%4],tx-2.55,.6+(i%7)*.62,47-1.3+(i%2?1.3:0)+(i*.37%1.2),scene);sperrKasten(tx-2.5,47,.6,4.4,0);
    /* Hängebrücke zwischen den Türmen (z 31,2 bis 44,8) in 4,6 m Höhe */
    for(let i=0;i<14;i++)box(1.3,.08,.78,i%2?0xb08850:0x9a6a3a,tx,4.58,31.5+i*.99,scene);
    [-.75,.75].forEach(o=>{cyl(.03,14.4,0x6a4220,tx+o,5.6,38,scene).rotation.x=Math.PI/2;cyl(.03,14.4,0x6a4220,tx+o,4.7,38,scene).rotation.x=Math.PI/2;for(let i=0;i<8;i++)cyl(.025,1.1,0x6a4220,tx+o,5.15,31.8+i*1.75,scene)});
    /* Rutsche von Turm 2 nach Osten */
    {const L=Math.hypot(9,4.6),sl=box(L,.12,1.3,0xe0605a,tx+2.3+4.5,2.3,47,scene,true);sl.rotation.z=-Math.atan2(4.6,9);[-.65,.65].forEach(o=>{const r=box(L,.3,.12,0xb83a3a,tx+2.3+4.5,2.4,47+o,scene);r.rotation.z=-Math.atan2(4.6,9)});sperrKasten(tx+2.3+4.6,47,9.4,1.8,0);
      [-1,1].forEach(o=>cyl(.08,1.4,0xb83a3a,tx+2.3+.2,5.5,47+o*.6,scene))}
    /* Leiter zu Turm 2 (Nordseite) und Kletterseile */
    for(let i=0;i<7;i++)box(.9,.08,.1,0x6a4220,tx,.6+i*.65,44.9,scene);
    bank(cx+8,cz-8,-Math.PI/2);bank(cx+8,cz+8,-Math.PI/2);tonne(cx+10,cz)})();
  /* ===== 8) Schmetterlingshaus (153|92): Gewächshaus mit Tür nach Westen ===== */
  (function(){const cx=153,cz=92,W=14,D=9,th=-Math.PI/2;SOCK(cx,cz,13,0xe6dcb4);const g=grp(cx,0,cz);g.rotation.y=th;const wd=(lx,lz)=>[cx-lz,cz+lx];
    glas(W,4,.1,0,2,-D/2,g);[-1,1].forEach(o=>glas(.1,4,D,o*W/2,2,0,g));[-1,1].forEach(o=>glas((W-4)/2,4,.1,o*(W+4)/4,2,D/2,g));glas(4,1.2,.1,0,3.4,D/2,g);
    [-1,1].forEach(o=>{const r=glas(W+.4,.12,D/2+.8,0,4.9,o*D/4,g);r.rotation.x=o*.42});[-1,1].forEach(o=>glas(.1,1.1,D*.85,o*W/2,4.6,0,g));
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>box(.25,4.2,.25,0xffffff,p[0]*W/2,2.1,p[1]*D/2,g));[-2,2].forEach(o=>box(.2,4,.2,0xffffff,o,2,D/2,g));box(W+.5,.2,.2,0xffffff,0,5.95,0,g);[-1,1].forEach(o=>{box(W,.14,.14,0xffffff,0,4.1,o*D/2,g);const rb=box(W+.4,.14,.14,0xffffff,0,5.0,o*D/2,g)});
    [[-1,1],[1,1]].forEach(p=>box(.12,1.9,.12,0xffffff,p[0]*W/2,4.95,0,g));
    box(W-1,.04,3,0xe8d8a0,0,.05,0,g);box(3,.04,D-1,0xe8d8a0,0,.05,0,g);
    const sw=(a,b,c,d)=>sperrLinie(a,b,c,d,.2);sw(cx-4.5,cz-7,cx+4.5,cz-7);sw(cx-4.5,cz+7,cx+4.5,cz+7);sw(cx+4.5,cz-7,cx+4.5,cz+7);sw(cx-4.5,cz-7,cx-4.5,cz-2.2);sw(cx-4.5,cz+2.2,cx-4.5,cz+7);
    /* Beete (lokal -> Welt), Blumen, Teich, Palmen */
    [[-4.5,-1.6,5,3],[4.5,-1.6,5,3],[-5.2,2.3,2.4,1.8],[5.2,2.3,2.4,1.8]].forEach((b,i)=>{const q=wd(b[0],b[1]);box(b[3],.4,b[2],0x8b5a2b,q[0],.2,q[1],scene);sperrKasten(q[0],q[1],b[3]+.2,b[2]+.2,0);
      for(let k=0;k<26;k++){const x=q[0]+(rnd()-.5)*(b[3]-.5),z=q[1]+(rnd()-.5)*(b[2]-.5);inst('cyl',x,.65,z,.025,.5,.025,0x3f9a46);inst('blm',x,.95,z,.17,.15,.17,[0xe0605a,0xffd45e,0xf59e3f,0xb06ae0,0xf47ab0,0xffffff][k%6])}});
    {const q=wd(0,-2.7);wasserFl(q[0],q[1],1.5,WASSER);sperrRing(q[0],q[1],1.6,14);for(let i=0;i<7;i++){const a=i*.9;felsen(q[0]+Math.cos(a)*1.9,q[1]+Math.sin(a)*1.9,.35)}}
    [[-5.8,-3.6],[5.8,-3.6],[-6,3.7]].forEach(p=>{const q=wd(p[0],p[1]),pa=grp(q[0],0,q[1]);cyl(.18,3,0x8a5a32,0,1.5,0,pa,true);for(let i=0;i<7;i++){const f2=grp(0,3,0,pa);f2.rotation.y=i*.9;sph(1,i%2?0x4aa84e:0x3f9a46,1.4,-.1,0,f2,1.5,.1,.5).rotation.z=-.3}kreis(q[0],q[1],.45)});
    for(let i=0;i<10;i++){const q=wd(-6.2+i*1.37,4.1);inst('sph',q[0],.4,q[1],.35,.3,.35,0x3f9a46)}
    bank(cx-9,cz-6,Math.PI/2);bank(cx-9,cz+6,Math.PI/2);[[-9,-9],[-9,9]].forEach(p=>{sph(.8,0x3f9a46,cx+p[0],.7,cz+p[1],scene,1.3,.9,1.3);kreis(cx+p[0],cz+p[1],1.2)})})();
  /* ===== 9) Zoo-Café mit Souvenirladen (76|116) ===== */
  (function(){const cx=76;SOCK(cx,116,16,0xe8dcb0);
    haus(66,111,11,6,0xf4e4c0,0xb94a3a);fassade(66,111,11,6,3.5,[-3.6,-1],null);for(let i=0;i<6;i++)box(1.8,.08,1.3,i%2?0xffffff:0xe0605a,66-4.5+i*1.8,2.45,114.6,scene).rotation.x=.3;
    haus(87,111,8,6,0xf6d78a,0x3b8fc4);fassade(87,111,8,6,null,null,5);for(let i=0;i<4;i++)box(2,.08,1.3,i%2?0xffffff:0x3b8fc4,87-3+i*2,2.45,114.6,scene).rotation.x=.3;
    box(22,.15,8.5,0xb8844a,77,.08,121,scene);
    [[68,119.6,0xe0605a],[73.5,122,0x3b8fc4],[79,119.6,0xffd45e],[84,122,0x4caf6a]].forEach((p,i)=>{const g=grp(p[0],0,p[1]);cyl(.85,.1,0xffffff,0,.95,0,g,true);cyl(.1,.9,0x6a4220,0,.5,0,g);cyl(.06,2.5,0x6a4220,0,1.25,0,g);cone(1.9,.7,p[2],0,2.65,0,g,true);
      [0,1.57,3.14,4.71].forEach(a=>{const c=box(.6,.12,.6,0xa8743f,Math.cos(a)*1.3,.6,Math.sin(a)*1.3,g);box(.6,.5,.1,0xa8743f,Math.cos(a)*1.55,.9,Math.sin(a)*1.55,g).rotation.y=-a+Math.PI/2});kreis(p[0],p[1],1.25)});
    [[68,117.3,0],[79,117.4,3],[84,119.5,5]].forEach(q=>{const k=kindModell(Object.assign({},AVATARE[q[2]]),scene);k.g.position.set(q[0],.15,q[1]);k.g.rotation.y=q[2]%2?Math.PI:.4});
    /* Souvenir-Auslage */
    box(4.6,.1,1.4,0xc98a4b,87,.95,119.3,scene,true);[[-2,-.5],[2,-.5],[-2,.5],[2,.5]].forEach(p=>cyl(.07,.9,0x6a4220,87+p[0],.45,119.3+p[1],scene));kreis(87,119.3,2.4);
    [0xc98a4b,0xe8a0c0,0x8ec8e8,0xf2d45e,0xb06ae0].forEach((c,i)=>plusch(scene,85.2+i*.9,1.0,119.3,c,.8));
    cyl(.05,1.2,0x6a4220,91.5,.6,118.6,scene);[0xe0605a,0xffd45e,0x3b8fc4,0x4caf6a,0xb06ae0,0xf59e3f,0xf47ab0].forEach((c,i)=>{const bx=91.5+Math.cos(i*.9)*.7,bz=118.6+Math.sin(i*.9)*.5,by=3.6+(i%3)*.5;sph(.45,c,bx,by,bz,scene,1,1.15,1);cyl(.01,by-1.2,0xdddddd,bx,(by-.5+1.2)/2,bz,scene)});kreis(91.5,118.6,.4);
    {const g=grp(81.5,0,125.2);box(.7,2,.7,0x3b8fc4,0,1,0,g,true);for(let i=0;i<5;i++)box(.5,.35,.05,[0xffd45e,0xe0605a,0xffffff,0x4caf6a,0xf59e3f][i],0,.4+i*.35,.38,g);kreis(81.5,125.2,.6)}
    bank(62,124,0);tonne(93,124);vogelhaus(65,106)})();
  /* ===== 10) Aquarium-Tunnel (-153|95): begehbarer Glastunnel im großen Fischbecken ===== */
  (function(){const x0=-153,z0=95,L=26,Dp=18;SOCK(x0,z0,16.5,0xd8d4c4);
    glas(L,5.5,.1,x0,2.75,z0-Dp/2);glas(L,5.5,.1,x0,2.75,z0+Dp/2);glas(.1,5.5,Dp,x0-L/2,2.75,z0);[89,101].forEach(z=>glas(.1,5.5,6,x0+L/2,2.75,z));
    const wm=new THREE.Mesh(gBox,new THREE.MeshLambertMaterial({color:0x2a8ac8,transparent:true,opacity:.34,depthWrite:false}));wm.position.set(x0,2.6,z0);wm.scale.set(L-.2,5.2,Dp-.2);scene.add(wm);
    const tm=new THREE.Mesh(new THREE.CylinderGeometry(3,3,L-.4,14,1,true,0,Math.PI),new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.24,side:THREE.DoubleSide,depthWrite:false}));tm.rotation.z=Math.PI/2;tm.position.set(x0,0,z0);tm.scale.set(1.15,1,1);scene.add(tm);
    for(let i=0;i<9;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(3,.12,6,14,Math.PI),mat(0xf2f6f8));r.rotation.y=Math.PI/2;r.scale.y=1.15;r.position.set(x0-L/2+.4+i*3.15,0,z0);scene.add(r)}
    box(L,.06,6,0xc8c0a8,x0,.04,z0,scene);box(L,.1,.4,0xfff0a0,x0,3.05,z0,scene);
    [[-L/2,-Dp/2],[L/2,-Dp/2],[-L/2,Dp/2],[L/2,Dp/2]].forEach(p=>box(.35,5.7,.35,0xf2f6f8,x0+p[0],2.85,z0+p[1],scene));box(L+.4,.3,.4,0xf2f6f8,x0,5.65,z0-Dp/2,scene);box(L+.4,.3,.4,0xf2f6f8,x0,5.65,z0+Dp/2,scene);box(.4,.3,Dp,0xf2f6f8,x0-L/2,5.65,z0,scene);
    sperrKasten(x0,z0-6,L,6,0);sperrKasten(x0,z0+6,L,6,0);sperrKasten(x0-L/2-.3,z0,.6,6.4,0);
    [-1,1].forEach(o=>{box(.6,4.4,.6,0x2f6b9a,x0+L/2+.6,2.2,z0+o*3.6,scene);kreis(x0+L/2+.6,z0+o*3.6,.5)});box(.8,.7,8.2,0x2f6b9a,x0+L/2+.6,4.5,z0,scene);for(let i=0;i<5;i++)sph(.35,[0x3b8fc4,0x4aa3d8][i%2],x0+L/2+.6,5.1,z0-3+i*1.5,scene);
    /* Boden des Beckens: Tang, Korallen, Steine */
    for(let i=0;i<60;i++){const side=i%2?1:-1,x=x0-12+rnd()*24,z=z0+side*(4.2+rnd()*3.6),H=1+rnd()*2;inst('cyl',x,H/2,z,.07,H,.07,rnd()<.5?0x2f9a5a:0x4caf6a)}
    for(let i=0;i<22;i++){const side=i%2?1:-1,x=x0-12+rnd()*24,z=z0+side*(4.2+rnd()*3.8);inst('sph',x,.35,z,.4+rnd()*.3,.3,.4+rnd()*.3,[0xe0605a,0xf59e3f,0xe8588a,0xb06ae0][i%4]);inst('sph',x+.5,.25,z+.3,.6,.35,.5,0x8a8f96)}
    /* Fische als Schwarm, Hai und Rochen */
    const FM=new THREE.MeshLambertMaterial({color:0xffffff}),gSchw=new THREE.ConeGeometry(1,1,5);gSchw.rotateZ(-Math.PI/2);
    const lane=[88.5,90.5,99.5,101.5,95],ph=[],A=[],sp=[];for(let i=0;i<30;i++){ph.push(rnd()*6.28);A.push(8+rnd()*3.5);sp.push(.25+rnd()*.25)}
    schwarm(30,[{geo:gSphL,mat:FM,s:[.55,.22,.16]},{geo:gSchw,mat:FM,s:[.4,.4,.06],o:[-.55,0,0],swing:9}],[0xf59e3f,0xffd45e,0x3b8fc4,0xc8d4dc,0xe8588a,0x4caf6a,0xe0605a],(i,t)=>{const u=t*sp[i]+ph[i],zz=lane[i%5],top=i%5===4,y=top?4.2+(i%3)*.35:1+((i*7)%5)*.55;const vx=Math.cos(u)*sp[i];return [x0+Math.sin(u)*A[i],y+Math.sin(t*1.7+ph[i])*.25,zz+Math.sin(t*.7+ph[i])*.8,vx>0?0:Math.PI,.9+((i*3)%4)*.12,1]});
    const ha=hai(scene),han=ha.userData.anim;ha.scale.setScalar(.75);ha.userData.anim=null;bewegt(ha,t=>{const u=t*.28,dx=-Math.sin(u)*9.5,dz=Math.cos(u)*5.2;ha.position.set(x0+Math.cos(u)*9.5,4.5,z0+Math.sin(u)*5.2);ha.rotation.y=Math.atan2(-dz,dx);han(t)});
    [[0,.2,8,3.6,4.9],[2.4,-.17,6,4.5,4.6]].forEach(q=>{const r=rochen(scene),an=r.userData.anim;r.scale.setScalar(.8);r.userData.anim=null;bewegt(r,t=>{const u=t*q[1]+q[0],dx=-Math.sin(u)*q[2]*Math.sign(q[1]),dz=Math.cos(u)*q[3]*Math.sign(q[1]);r.position.set(x0+Math.cos(u)*q[2],q[4],z0+Math.sin(u)*q[3]);r.rotation.y=Math.atan2(-dz,dx);an(t)})});
    bank(x0+17,z0+8,Math.PI/2);tonne(x0+17,z0-8)})();

  /* ========== Bewegung: Safari-Bus, Pfleger mit Futterwagen, Eichhörnchen, Schmetterlingsschwarm, mehr Besucher ========== */
  (function(){const Rt=spl(LOOPPTS,2.5),cum=[0];for(let i=1;i<Rt.length;i++)cum.push(cum[i-1]+Math.hypot(Rt[i][0]-Rt[i-1][0],Rt[i][1]-Rt[i-1][1]));const LL=cum[cum.length-1];
    const at=s=>{let lo=0,hi=cum.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(cum[m]<=s)lo=m;else hi=m}const u=(s-cum[lo])/(cum[hi]-cum[lo]||1);return [Rt[lo][0]+(Rt[hi][0]-Rt[lo][0])*u,Rt[lo][1]+(Rt[hi][1]-Rt[lo][1])*u]};
    const bus=grp(0,0,0);bus.name='safaribus';bus.userData.keep=1;box(7.2,1.5,2.7,0xe8c860,0,1.35,0,bus,true);box(6.6,1.1,2.6,0xe8c860,-.2,2.45,0,bus);box(7,.14,2.9,0xf2efe6,-.2,4.15,0,bus);[-3,0,3].forEach(x=>[-1.3,1.3].forEach(z=>cyl(.07,1.15,0xf2efe6,x,3.55,z,bus)));
    for(let i=0;i<5;i++)box(.3,1.55,2.74,0x1b1b1b,-2.6+i*1.3,1.35,0,bus);
    for(let i=0;i<4;i++)[-1,1].forEach(sg=>box(1.3,.7,.06,0x9fd0ea,-2.3+i*1.55,2.5,sg*1.32,bus));[3.3,-3.5].forEach((x,i)=>box(.06,.85,2.2,0x9fd0ea,x,2.5,0,bus));
    [-2.3,2.3].forEach(x=>[-1.3,1.3].forEach(z=>{cyl(.6,.5,0x222222,x,.6,z,bus).rotation.x=Math.PI/2;cyl(.28,.52,0xc8c8c8,x,.6,z,bus).rotation.x=Math.PI/2}));
    [-.85,.85].forEach(z=>sph(.22,0xfff0a0,3.62,1.2,z,bus));box(.3,.3,2.9,0x3a3a3a,3.7,.6,0,bus);box(.04,.5,1.8,0x2a2a2a,3.62,1.25,0,bus);
    [[-2.2,-.5],[-1.2,.5],[-.2,-.5],[.8,.5],[1.8,-.5],[-1.7,.5],[.3,-.5]].forEach((p,i)=>{sph(.32,[0xf1c9a0,0xd9a77a,0x8a5a3a,0xe8b98f][i%4],p[0],3.3,p[1]*1.6,bus);sph(.34,[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d][i%4],p[0],3.47,p[1]*1.6-.03,bus,1,.8,1);box(.5,.6,.5,[0xe0605a,0x3b8fc4,0x4caf6a,0xf59e3f][i%4],p[0],2.85,p[1]*1.6,bus)});
    vmVerschm(bus);bewegt(bus,t=>{const s=(t*7+60)%LL,p=at(s),q=at((s+1.5)%LL);bus.position.set(p[0],0,p[1]);bus.rotation.y=Math.atan2(-(q[1]-p[1]),q[0]-p[0])})})();
  /* Pfleger mit Futterwagen (Ostring, pendelt) */
  (function(){const Rt=spl(RE,2.5).filter(p=>p[1]<78&&p[1]>-70),cum=[0];for(let i=1;i<Rt.length;i++)cum.push(cum[i-1]+Math.hypot(Rt[i][0]-Rt[i-1][0],Rt[i][1]-Rt[i-1][1]));const LL=cum[cum.length-1];
    const at=s=>{let lo=0,hi=cum.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(cum[m]<=s)lo=m;else hi=m}const u=(s-cum[lo])/(cum[hi]-cum[lo]||1);return [Rt[lo][0]+(Rt[hi][0]-Rt[lo][0])*u,Rt[lo][1]+(Rt[hi][1]-Rt[lo][1])*u]};
    const kw=grp(0,0,0);kw.userData.keep=1;box(2.2,.5,1.3,0xa8743f,0,.85,0,kw,true);box(2.2,.9,.1,0x8a5a32,0,1.3,.65,kw);box(2.2,.9,.1,0x8a5a32,0,1.3,-.65,kw);sph(.9,0xe8c850,0,1.35,0,kw,1.1,.55,.7);[0xe0302a,0xf2882a].forEach((c,i)=>sph(.3,c,.6-i*.9,1.6,.2,kw));
    [[-.8,.7],[-.8,-.7],[.8,.7],[.8,-.7]].forEach(p=>cyl(.3,.1,0x222222,p[0],.3,p[1]*1.05,kw).rotation.x=Math.PI/2);box(1.1,.06,.06,0x6a4220,-1.6,1,0,kw);
    const m=erwachsener(kw,0x3e7a4a,0x2a4a8a,'cap');m.g.position.set(-2.4,0,0);m.g.rotation.y=Math.PI/2;m.al.rotation.x=m.ar.rotation.x=-1.2;vm(kw,m.bl,m.br,m.al,m.ar);
    bewegt(kw,t=>{const L2=LL*2,u=(t*2.2)%L2,fw=u<LL,s=fw?u:L2-u,p=at(s),q=at(Math.min(LL,s+1.2)),d=fw?1:-1;kw.position.set(p[0],0,p[1]);kw.rotation.y=Math.atan2(-(q[1]-p[1])*d,(q[0]-p[0])*d);m.bl.rotation.x=Math.sin(t*6)*.6;m.br.rotation.x=-Math.sin(t*6)*.6})})();
  /* Eichhörnchen: zwei klettern an dicken Stämmen, eines läuft am Boden */
  (function(){[[141,-118,1],[-141,-30,-1]].forEach((b,i)=>{const x=b[0],z=b[1],g=grp(x,0,z);cyl(.65,8.5,0x6a4a2a,0,4.2,0,g,true);[[0,8.6,3],[1.8,7.6,2],[-1.5,7.2,2]].forEach(c=>sph(c[2],i?0x4aa84e:0x3f9a46,c[0],c[1],0,g,1,.8,1));kreis(x,z,.9);
      const e=eichhoernchen(scene),an=e.userData.anim;e.userData.anim=null;e.rotation.z=Math.PI/2;e.rotation.y=b[2]>0?Math.PI:0;e.scale.setScalar(1.3);bewegt(e,t=>{const u=(Math.sin(t*.35+i*2)+1)/2;e.position.set(x-b[2]*.78,1.2+u*6,z+Math.sin(t*.9)*.12);an(t)})});
    {const e=eichhoernchen(scene),an=e.userData.anim;e.userData.anim=null;e.scale.setScalar(1.4);bewegt(e,t=>{const L=14,u=(t*1.6)%(2*L),fw=u<L,s=fw?u:2*L-u,hop=Math.abs(Math.sin(t*7))*.3;e.position.set(126+s,hop,-20.5-Math.sin(s*.4)*.4);e.rotation.y=fw?0:Math.PI;an(t)})}})();
  /* Schmetterlingsschwarm (ein Zeichenaufruf), mit Flug durch das Schmetterlingshaus */
  (function(){const FA=[[153,92,3.4,6,1.8,16],[0,126,10,5,1.4,5],[-60,10,6,5,1.4,4],[104,3,6,5,1.4,4],[-104,4,6,5,1.4,4],[45,-98,8,6,1.5,4],[-45,-98,8,6,1.5,3],[98,-146,9,9,1.8,3],[-153,-72,9,9,1.8,3]],map=[];FA.forEach((a,k)=>{for(let i=0;i<a[5];i++)map.push(k)});
    const pos=(i,t)=>{const a=FA[map[i]],p=i*1.7;return [a[0]+a[2]*Math.sin(t*.25+p)*Math.cos(t*.13+p*.7),a[4]+.5+Math.sin(t*1.3+p)*.5+(map[i]===0?Math.abs(Math.sin(t*.2+p))*1.4:0),a[1]+a[3]*Math.cos(t*.21+p*1.3)]};
    schwarm(map.length,[{geo:gFalter,mat:new THREE.MeshBasicMaterial({side:THREE.DoubleSide}),s:[1,1,1],flap:1}],[0xffd45e,0xf06a9c,0xf59e3f,0x4aa8e0,0xb06ae0,0xffffff,0xe0302a],(i,t)=>{const p=pos(i,t),q=pos(i,t+.1);return [p[0],p[1],p[2],Math.atan2(-(q[2]-p[2]),q[0]-p[0]),1.1,.25+.75*Math.abs(Math.sin(t*10+i))]})})();
  /* Mehr Besucher (28), Figuren verschmolzen */
  (function(){const jc=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0xe0605a,0x9b6fd0,0x4caf6a],hc=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a,0xe8c24a,0x2a1d14,0xb5651d,0x6b4626],st=['kurz','zoepfe','cap','pferd','kurz','zoepfe','cap','pferd','kurz','zoepfe'];
    const NBP=[[60,129.5],[100,128],[131,100],[132,60],[131,20],[132,-30],[131,-80],[-60,129],[-100,128],[-131,100],[-132,60],[-131,20],[-132,-30],[-131,-80],[121,90],[-121,84],[75,127],[-139,95],[139,38],[-139,-72],[98,-165],[-98,-166],[60,-174],[-60,-174],[0,-174],[88,127],[66,126],[132,0],[-133,2]];NBP.forEach(p=>BPTS.push(p));
    for(let i=16;i<28;i++){const f=besucherFigur(Object.assign({},AVATARE[(i+3)%AVATARE.length],{jacke:jc[(i+4)%10],haar:hc[(i*3+1)%10],stil:st[(i+2)%10]}));const p=NBP[(i*2)%NBP.length];f.g.position.set(p[0]+(rnd()-.5)*2,0,p[1]);f.ziel=BPTS[(i*5+2)%BPTS.length];f.v=1.8+rnd()*.8;besucher.push(f)}
    besucher.forEach(f=>{if(f.vmOk)return;f.vmOk=1;[f.bl,f.br,f.al,f.ar].forEach(l=>{vmVerschm(l);l.userData.frei=1});vmVerschm(f.g)})})();

  /* ========== Landschaft der Dichte-Runde 2: Wälder, Alleen, Wiesen, Büsche, Blumeninseln, Hecken, Felsen (alles instanziert) ========== */
  (function(){const CS=1.5,X0=GRENZE.x0,Z0=GRENZE.z0,GW=Math.ceil((GRENZE.x1-X0)/CS)+1,GH=Math.ceil((GRENZE.z1-Z0)/CS)+1,GR=new Uint8Array(GW*GH),GD=new Float32Array(GW*GH).fill(99);
    const ci=x=>Math.round((x-X0)/CS),cj=z=>Math.round((z-Z0)/CS);
    function mk(x,z,r){const n=Math.ceil(r/CS),i0=ci(x),j0=cj(z);for(let j=j0-n;j<=j0+n;j++)for(let i=i0-n;i<=i0+n;i++){if(i<0||j<0||i>=GW||j>=GH)continue;if(Math.hypot(X0+i*CS-x,Z0+j*CS-z)<=r+CS*.6)GR[j*GW+i]=1}}
    colliders.forEach(c=>mk(c.x,c.z,c.r+.8));
    sperrLinien.forEach(q=>{const L=Math.hypot(q.x2-q.x1,q.z2-q.z1),n=Math.max(1,Math.ceil(L/1.2));for(let k=0;k<=n;k++)mk(q.x1+(q.x2-q.x1)*k/n,q.z1+(q.z2-q.z1)*k/n,q.r+.8)});
    sperrKaesten.forEach(k=>{const R=Math.hypot(k.hb,k.ht)+1.5,i0=ci(k.x),j0=cj(k.z),n=Math.ceil(R/CS);for(let j=j0-n;j<=j0+n;j++)for(let i=i0-n;i<=i0+n;i++){if(i<0||j<0||i>=GW||j>=GH)continue;const wx=X0+i*CS-k.x,wz=Z0+j*CS-k.z,lx=wx*k.c-wz*k.s,lz=wx*k.s+wz*k.c;if(Math.abs(lx)<k.hb+1.4&&Math.abs(lz)<k.ht+1.4)GR[j*GW+i]=1}});
    const WP=[];WEGE.forEach(s=>{for(let i=0;i<s.length;i+=2)WP.push(s[i])});BACHDATEN.forEach(b=>b.s.forEach((p,i)=>{if(i%2===0)WP.push([p[0],p[1]])}));
    WP.forEach(p=>{const i0=ci(p[0]),j0=cj(p[1]);for(let j=j0-6;j<=j0+6;j++)for(let i=i0-6;i<=i0+6;i++){if(i<0||j<0||i>=GW||j>=GH)continue;const d=Math.hypot(X0+i*CS-p[0],Z0+j*CS-p[1]);if(d<GD[j*GW+i])GD[j*GW+i]=d}});
    KT.forEach(k=>{const i0=ci(k[0]),j0=cj(k[1]);for(let j=j0-6;j<=j0+6;j++)for(let i=i0-6;i<=i0+6;i++){if(i<0||j<0||i>=GW||j>=GH)continue;const d=Math.hypot(X0+i*CS-k[0],Z0+j*CS-k[1])-3;if(d<GD[j*GW+i])GD[j*GW+i]=d}});
    const okL=(x,z,rad,pm)=>{if(x<X0+3||x>GRENZE.x1-3||z>GRENZE.z1-3||z<Z0+3)return false;if(rad>=1.4&&z>131)return false;
      for(const k in BEREICHE){const q=BEREICHE[k];if(Math.hypot(x-q.x,z-q.z)<(k==='eingang'?18:22)+rad)return false}
      for(const e of EXTRAZONEN)if(Math.hypot(x-e.x,z-e.z)<e.r+2+rad)return false;
      if(Math.hypot(x-FEST.x,z-FEST.z)<22+rad)return false;if(Math.abs(x)<8&&z<TORZ+12)return false;
      const g=cj(z)*GW+ci(x);if(GD[g]<pm||GR[g])return false;if(rad>.7){const n=Math.ceil(rad/CS);for(let a=0;a<8;a++){const xx=x+Math.cos(a*.785)*rad,zz=z+Math.sin(a*.785)*rad;const gg=cj(zz)*GW+ci(xx);if(gg<0||gg>=GR.length||GR[gg]||GD[gg]<pm-1)return false}}return true};
    const GRN=[0x3f9a46,0x4aa84e,0x5cba5c,0x35893f,0x6cc04a],NAD=[0x2f6b4a,0x37805a,0x3e9468,0x2a5f40],BL=[0xe0605a,0xffd45e,0xf59e3f,0xb06ae0,0xf47ab0,0xffffff,0x6aa0e8];
    function baum(x,z,s,tanne){if(tanne){const c=NAD[Math.floor(rnd()*4)];inst('cyl',x,.8*s,z,.22*s,1.6*s,.22*s,0x6a4a2a);inst('conS',x,2.6*s,z,1.5*s,2.8*s,1.5*s,c);inst('conS',x,4.4*s,z,1.1*s,2.4*s,1.1*s,NAD[(Math.floor(rnd()*4)+1)%4])}
      else{inst('cyl',x,1.2*s,z,.3*s,2.4*s,.3*s,0x7a5230);inst('sphS',x,3.7*s,z,2.1*s,1.8*s,2.1*s,GRN[Math.floor(rnd()*5)]);inst('sphS',x+.9*s,3.1*s,z+.5*s,1.3*s,1.1*s,1.3*s,GRN[Math.floor(rnd()*5)])}
      kreis(x,z,.5*s);mk(x,z,1.5*s)}
    function wald(x0,x1,z0,z1,n,tann){let c=0;for(let i=0;i<n*8&&c<n;i++){const x=x0+rnd()*(x1-x0),z=z0+rnd()*(z1-z0),s=.8+rnd()*.7;if(!okL(x,z,1.6*s,3.8))continue;baum(x,z,s,rnd()<tann);c++}}
    /* Wälder und Baumgruppen zwischen den Orten */
    wald(-166,-24,-238,-196,70,.5);wald(24,166,-238,-196,70,.5);wald(139,167,-232,128,95,.35);wald(-167,-139,-232,128,95,.35);wald(60,128,98,138,22,.2);wald(-128,-60,98,138,22,.2);
    wald(110,128,-12,14,10,.3);wald(-128,-110,-12,14,10,.3);wald(50,128,-188,-168,16,.6);wald(-128,-50,-188,-168,16,.6);wald(-125,-52,-124,-112,14,.3);wald(52,125,-124,-112,14,.3);wald(60,125,40,76,16,.3);wald(-125,-60,44,76,16,.3);wald(-30,30,60,100,12,.1);
    /* Alleen entlang des Ringwegs und des Hauptwegs */
    {const s=spl(LOOPPTS,9);for(let i=1;i<s.length-1;i++){const a=s[i-1],b=s[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1])||1,nx=-(b[1]-a[1])/l,nz=(b[0]-a[0])/l;[-1,1].forEach(sg=>{const x=s[i][0]+nx*sg*6.2,z=s[i][1]+nz*sg*6.2;if(okL(x,z,1.5,4.6))baum(x,z,.9+rnd()*.3,false)})}
      for(let z=96;z>TORZ+14;z-=12){[-1,1].forEach(sg=>{const x=wegX(z)+sg*9.5;if(okL(x,z,1.5,4.6))baum(x,z,.95+rnd()*.25,false)})}}
    /* Büsche (auch entlang der Wege) */
    {let c=0;for(let i=0;i<4000&&c<330;i++){const x=X0+4+rnd()*(GRENZE.x1-X0-8),z=Z0+4+rnd()*(GRENZE.z1-Z0-8),s=.7+rnd()*.8;if(!okL(x,z,1.2*s,2.8))continue;inst('sph',x,.5*s,z,1.2*s,.8*s,1.1*s,GRN[Math.floor(rnd()*5)]);mk(x,z,1.1*s);c++}
      const s=spl(LOOPPTS,7);for(let i=1;i<s.length-1;i++){const a=s[i-1],b=s[i+1],l=Math.hypot(b[0]-a[0],b[1]-a[1])||1,nx=-(b[1]-a[1])/l,nz=(b[0]-a[0])/l;[-1,1].forEach(sg=>{const o=3.9+rnd()*1.4,x=s[i][0]+nx*sg*o+(rnd()-.5)*2,z=s[i][1]+nz*sg*o+(rnd()-.5)*2,q=.6+rnd()*.5;if(okL(x,z,1,2.8)){inst('sph',x,.5*q,z,1.2*q,.8*q,1.1*q,GRN[Math.floor(rnd()*5)]);mk(x,z,1)}})}}
    /* Blumeninseln und Blumen */
    {let c=0;for(let i=0;i<3000&&c<22;i++){const x=X0+8+rnd()*(GRENZE.x1-X0-16),z=Z0+8+rnd()*(GRENZE.z1-Z0-16),r=2+rnd()*1.6;if(!okL(x,z,r+1,5))continue;inst('sph',x,.02,z,r,.18,r,0x6dba52);const f=[BL[Math.floor(rnd()*7)],BL[Math.floor(rnd()*7)]];for(let k=0;k<22;k++){const a=rnd()*6.283,d=Math.sqrt(rnd())*r*.85;inst('blm',x+Math.cos(a)*d,.32,z+Math.sin(a)*d,.17,.14,.17,f[k%2])}mk(x,z,r+.8);c++}
      let n2=0;for(let i=0;i<2500&&n2<260;i++){const x=X0+4+rnd()*(GRENZE.x1-X0-8),z=Z0+4+rnd()*(GRENZE.z1-Z0-8);if(!okL(x,z,.4,2.6))continue;inst('cyl',x,.25,z,.03,.5,.03,0x3f9a46);inst('blm',x,.55,z,.15,.13,.15,BL[Math.floor(rnd()*7)]);n2++}}
    /* Gras */
    {let c=0;for(let i=0;i<6000&&c<1500;i++){const x=X0+3+rnd()*(GRENZE.x1-X0-6),z=Z0+3+rnd()*(GRENZE.z1-Z0-6);if(!okL(x,z,.3,2.4))continue;const s=.7+rnd()*.8;inst('con',x,.22*s,z,.16*s,.44*s,.16*s,GRN[Math.floor(rnd()*5)]);inst('con',x+.25,.18*s,z+.15,.12*s,.36*s,.12*s,GRN[Math.floor(rnd()*5)]);c+=2}}
    /* Wiesenflecken in verschiedenen Grüntönen */
    {let c=0;for(let i=0;i<500&&c<22;i++){const x=X0+10+rnd()*(GRENZE.x1-X0-20),z=Z0+10+rnd()*(GRENZE.z1-Z0-20),r=7+rnd()*8;if(!okL(x,z,r,r*.35+3))continue;inst('sph',x,0,z,r,.045,r*.8,[0x8cc86a,0x9ad475,0x84bf62,0xa2d87a][c%4],rnd()*3);c++}}
    /* Hecken: Reihen vor dem Eingang (Süden) und hinter den Orten im Norden */
    [[-126,-12,134.4],[12,126,134.4],[-100,-12,-179.5],[12,100,-179.5]].forEach(h=>{const n=Math.round((h[1]-h[0])/4.6);for(let i=0;i<n;i++)inst('box',h[0]+(i+.5)*(h[1]-h[0])/n,.6,h[2],(h[1]-h[0])/n+.2,1.2,1.2,0x2f8a3e);sperrLinie(h[0],h[2],h[1],h[2],.7)});
    /* Felsgruppen */
    {let c=0;for(let i=0;i<2500&&c<16;i++){const x=X0+8+rnd()*(GRENZE.x1-X0-16),z=Z0+8+rnd()*(GRENZE.z1-Z0-16);if(!okL(x,z,4,5))continue;const n=3+Math.floor(rnd()*3);for(let k=0;k<n;k++){const a=rnd()*6.283,d=rnd()*2.2,r=.5+rnd()*1.2,rx=x+Math.cos(a)*d,rz=z+Math.sin(a)*d;inst('sph',rx,r*.45,rz,r*1.2,r*.75,r,[0x9aa0a6,0x8a9096,0xa8aeb4][k%3],rnd()*3);if(r>.9)kreis(rx,rz,r*.95)}mk(x,z,4);c++}}
  })();
/*@@ENDE@@*/
  instFlush();
}

/* ========== Dichte-Runde 2 (24.11.2026): Daten und Helfer auf Dateiebene (Fläche 340 x 380) ========== */
/* Ringweg um den ganzen Zoo (Ost und West), Promenade vor dem Eingang, Nordverbindung zum Hauptweg */
const RE=[[14,129.5],[50,130.5],[88,129],[116,126],[129,113],[132,92],[131,66],[133,40],[131,14],[133,-10],[131,-34],[133,-60],[131,-86],[133,-112],[131,-134],[128,-152],[112,-166],[84,-172],[50,-174],[22,-174]];
const RW=[[-14,129.5],[-50,129],[-88,130.5],[-116,127],[-129,112],[-132,96],[-131,70],[-133,40],[-131,14],[-133,-8],[-131,-34],[-133,-60],[-131,-86],[-133,-112],[-132,-126],[-131,-138],[-128,-153],[-112,-167],[-84,-173],[-50,-174],[-22,-174]];
const LOOPPTS=[[0,129.5]].concat(RE,[[0,-174]],RW.slice().reverse(),[[0,129.5]]);
const SPURS=[[[132,92],[127,91.5],[121,90]],[[132,92],[139,92.5],[145.5,92]],[[133,40],[137,38.5],[139.5,36]],[[-131,84],[-126,84],[-120,83]],[[-132,96],[-137,95.5],[-140,95]],[[-133,40],[-137,39],[-140,38]],[[-132,-72],[-136,-72],[-139,-72]],[[98,-169],[98,-166],[98,-162]],[[-98,-169.5],[-98,-166],[-98,-163]]];
const BACHDATEN=[
  {p:[[-169,-126],[-152,-131],[-134,-137],[-118,-141],[-104,-147],[-92,-150]],w:3.2,b:[[-132,-137.5]],t:[-86,-151,6.2]},
  {p:[[169,5],[152,3],[134,1],[120,0],[111,3]],w:3.2,b:[[133,1]],t:[105,3,6.2]},
  {p:[[-169,-3],[-152,-1],[-134,2],[-120,1],[-111,4]],w:3.2,b:[[-133,1.5]],t:[-105,4,6.2]}];
function spl(pts,st){const n=pts.length,s=[];for(let i=0;i<n-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n-1,i+2)],k=Math.max(2,Math.ceil(Math.hypot(p2[0]-p1[0],p2[1]-p1[1])/(st||2.5)));
  for(let j=0;j<k;j++){const t=j/k,t2=t*t,t3=t2*t,f=(a,b,c,d)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);s.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}s.push(pts[n-1]);return s}
const NEUWEGE=[spl(LOOPPTS,4)].concat(SPURS.map(q=>spl(q,3)),BACHDATEN.map(b=>spl(b.p,3)));
function nahNeu(x,z,m){for(const s of NEUWEGE)for(let i=0;i<s.length;i++){if(Math.abs(s[i][0]-x)<m&&Math.abs(s[i][1]-z)<m&&Math.hypot(s[i][0]-x,s[i][1]-z)<m)return true}for(const b of BACHDATEN){if(Math.hypot(x-b.t[0],z-b.t[1])<b.t[2]+m)return true}return false}
/* Instanzen: alle Büsche, Blumen, Bäume, Gras usw. werden gesammelt und am Ende je Form zu EINEM Zeichenaufruf (Farbe je Instanz) */
const gSphL=new THREE.SphereGeometry(1,6,4),gSphXL=new THREE.SphereGeometry(1,5,3),gConL=new THREE.ConeGeometry(1,1,7),gCylL=new THREE.CylinderGeometry(1,1,1,6),gBoxI=new THREE.BoxGeometry(1,1,1);
const IR={};
function inst(k,x,y,z,sx,sy,sz,c,ry){(IR[k]=IR[k]||[]).push([x,y,z,sx,sy,sz,c,ry||0])}
function instFlush(){const G={sph:gSphL,blm:gSphXL,con:gConL,cyl:gCylL,box:gBoxI},NM={sphS:'sph',conS:'con'},M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color(),CH=130,gr={},bl=[];
  for(const k0 in IR)IR[k0].forEach(a=>{const k=NM[k0]||k0,key=k+'|'+Math.floor((a[0]+200)/CH)+'|'+Math.floor((a[2]+300)/CH);(gr[key]=gr[key]||{k,l:[]}).l.push(a)});
  for(const key in gr){const q=gr[key],l=q.l;let x0=1e9,x1=-1e9,y1=0,z0=1e9,z1=-1e9,ms=0;l.forEach(a=>{x0=Math.min(x0,a[0]);x1=Math.max(x1,a[0]);z0=Math.min(z0,a[2]);z1=Math.max(z1,a[2]);y1=Math.max(y1,a[1]+a[4]);ms=Math.max(ms,a[3],a[4],a[5])});
    const geo=G[q.k].clone(),im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),l.length);geo.boundingSphere=new THREE.Sphere(new THREE.Vector3((x0+x1)/2,y1/2,(z0+z1)/2),Math.hypot(x1-x0,z1-z0,y1)/2+ms*1.6+2);
    bl.push({im,x:geo.boundingSphere.center.x,z:geo.boundingSphere.center.z,r:geo.boundingSphere.radius});im.frustumCulled=true;if(q.k==='sph'||q.k==='con')im.castShadow=true;
    l.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(0,a[7],0));M.compose(P,Q,S);im.setMatrixAt(i,M);im.setColorAt(i,C.set(a[6]))});im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;scene.add(im)}
  /* weit entfernte Blöcke (im Nebel) gar nicht zeichnen */
  lebendig.push({o:{userData:{anim:t=>{const cx=camera.position.x,cz=camera.position.z;bl.forEach(c=>{const v=Math.hypot(c.x-cx,c.z-cz)-c.r<250;if(c.im.visible!==v)c.im.visible=v})}}},ph:0})}
const VMAT2=new THREE.MeshLambertMaterial({vertexColors:true});
/* Unbewegte Teile einer Gruppe je Material zu einem Mesh verschmelzen (weniger Zeichenaufrufe); Teilgruppen mit userData.frei/anim/keep bleiben einzeln */
function vmVerschm(g){g.updateMatrixWorld(true);if(Math.abs(g.matrixWorld.determinant())<1e-9)return;const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(),gr={},alt=[];
  g.traverse(m=>{if(m===g||!m.isMesh||!m.visible)return;const mt=m.material;if(Array.isArray(mt)||mt.transparent||mt.map)return;for(let o=m;o&&o!==g;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep||o.userData.frei))return}
    const ge=m.geometry.clone();ge.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));const had=mt===VMAT2,vc=had||(mt.isMeshLambertMaterial&&!mt.vertexColors);if(vc&&!had){const n=ge.attributes.position.count,ca=new Float32Array(n*3);for(let i=0;i<n;i++){ca[i*3]=mt.color.r;ca[i*3+1]=mt.color.g;ca[i*3+2]=mt.color.b}ge.setAttribute('color',new THREE.BufferAttribute(ca,3))}const k=(vc?'vc':mt.uuid)+'|'+(m.castShadow?1:0);(gr[k]=gr[k]||{mt:vc?VMAT2:mt,vc,c:m.castShadow,l:[]}).l.push(ge);alt.push(m)});
  for(const k in gr){const q=gr[k];let nv=0,ni=0;q.l.forEach(e=>{nv+=e.attributes.position.count;ni+=e.index?e.index.count:e.attributes.position.count});const P=new Float32Array(nv*3),N=new Float32Array(nv*3),CC=q.vc?new Float32Array(nv*3):null,I=new Uint32Array(ni);let vo=0,io=0;
    q.l.forEach(e=>{const c=e.attributes.position.count;P.set(e.attributes.position.array,vo*3);N.set(e.attributes.normal.array,vo*3);if(CC)CC.set(e.attributes.color.array,vo*3);if(e.index){const ix=e.index.array;for(let j=0;j<ix.length;j++)I[io+j]=ix[j]+vo;io+=ix.length}else{for(let j=0;j<c;j++)I[io+j]=vo+j;io+=c}vo+=c;e.dispose()});
    const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(P,3));G.setAttribute('normal',new THREE.BufferAttribute(N,3));if(CC)G.setAttribute('color',new THREE.BufferAttribute(CC,3));G.setIndex(new THREE.BufferAttribute(I,1));const mm=new THREE.Mesh(G,q.mt);mm.castShadow=q.c;g.add(mm)}
  alt.forEach(m=>{if(m.parent)m.parent.remove(m)})}
/* vm(g, bewegteTeilgruppen...): erst die Teilgruppen einzeln verschmelzen und markieren, dann den Rest */
function vm(g){for(let i=1;i<arguments.length;i++){vmVerschm(arguments[i]);arguments[i].userData.frei=1}vmVerschm(g);return g}
/* Schwarm: viele kleine Tiere (Schmetterlinge, Fische) als Instanzen, ein Zeichenaufruf je Teil; upd(i,t) liefert [x,y,z,gier,skala,flügel] */
function schwarm(n,teile,farben,upd){const ims=teile.map(tl=>{const im=new THREE.InstancedMesh(tl.geo,tl.mat,n);im.frustumCulled=false;const C=new THREE.Color();for(let i=0;i<n;i++)im.setColorAt(i,C.set(farben[i%farben.length]));im.instanceColor.needsUpdate=true;scene.add(im);return im});
  const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler();
  lebendig.push({o:{userData:{anim:t=>{for(let i=0;i<n;i++){const r=upd(i,t);teile.forEach((tl,k)=>{const sw=tl.swing?Math.sin(t*tl.swing+i*1.3)*.5:0,c=Math.cos(r[3]),sn=Math.sin(r[3]),o=tl.o||[0,0,0];
      P.set(r[0]+(o[0]*c+o[2]*sn)*r[4],r[1]+o[1]*r[4],r[2]+(-o[0]*sn+o[2]*c)*r[4]);Q.setFromEuler(E.set(0,r[3]+sw,0));S.set(tl.s[0]*r[4],tl.s[1]*r[4],tl.s[2]*r[4]*(tl.flap?r[5]:1));M.compose(P,Q,S);ims[k].setMatrixAt(i,M)})}ims.forEach(im=>im.instanceMatrix.needsUpdate=true)}}},ph:0});return ims}
const gFalter=(function(){const g=new THREE.BufferGeometry(),v=[];[1,-1].forEach(s=>{v.push(0,0,.04*s,.28,.1,.5*s,-.3,.1,.44*s,0,0,.04*s,-.3,.1,.44*s,-.2,0,.04*s)});v.push(.25,0,0,-.25,0,0,0,.09,0);g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(v),3));return g})();
/* ---------- Neue Tiere der Dichte-Runde 2 (schauen nach +x; unbewegte Teile werden verschmolzen) ---------- */
function seeloewe(par){const g=grp(0,0,0,par),f=0x6e4b33,d=0x55391f;
  sph(.8,f,0,.62,0,g,1.9,.52,.62).castShadow=true;sph(.5,f,-1.35,.4,0,g,1.1,.42,.5);sph(.4,f,.95,1.0,0,g,1.15,1.3,.8);
  const kopf=grp(1.4,1.55,0,g);sph(.38,f,0,0,0,kopf,1.05,1,.9);sph(.2,0x9a7656,.38,-.1,0,kopf,1.1,.75,1.05);sph(.07,0x111111,.6,-.02,0,kopf);
  [-1,1].forEach(s=>{sph(.06,0x111111,.26,.13,s*.2,kopf);sph(.035,0xffffff,.29,.16,s*.2,kopf);cone(.05,.14,d,-.12,.34,s*.26,kopf);cyl(.012,.45,0xf2ecdc,.5,-.1,s*.14,kopf).rotation.x=s*1.35});
  [-1,1].forEach(s=>{sph(.3,d,.55,.2,s*.66,g,1.5,.22,.55).rotation.y=s*.5;sph(.4,d,-1.9,.35,s*.2,g,1.3,.2,.55).rotation.y=-s*.3});
  g.userData.anim=t=>{kopf.rotation.z=.1+Math.sin(t*1.3)*.2};return vm(g,kopf)}
function delfin(par){const g=grp(0,0,0,par),f=0x6f8aa0,b=0xe4edf2,fi=0x5d7a90;
  sph(.9,f,0,0,0,g,2.1,.62,.55);sph(.8,b,.05,-.14,0,g,1.95,.42,.5);cone(.17,.8,fi,2.0,-.02,0,g).rotation.z=-Math.PI/2;cone(.22,.7,fi,-.15,.6,0,g).rotation.z=.55;
  [-1,1].forEach(s=>{sph(.3,fi,.6,-.3,s*.55,g,1.3,.12,.5).rotation.x=s*.5;sph(.05,0x111111,1.35,.1,s*.32,g)});
  const sw=grp(-1.8,0,0,g);cone(.2,.9,f,-.35,0,0,sw).rotation.z=Math.PI/2;[-1,1].forEach(s=>sph(.4,fi,-.85,0,s*.38,sw,.55,.1,1.1));
  g.userData.anim=t=>{sw.rotation.z=Math.sin(t*5)*.35};return vm(g,sw)}
function adler(par,sitz){const g=grp(0,0,0,par),b=0x4a3220,w=0xf6f2ea,y=0xf5c518;
  sph(.4,b,0,0,0,g,1.35,.75,.7).castShadow=true;sph(.38,w,-.75,.02,0,g,1.2,.12,.7);
  const kopf=grp(.62,.18,0,g);sph(.22,w,0,0,0,kopf);cone(.1,.3,y,.22,-.04,0,kopf).rotation.z=-Math.PI/2;cone(.05,.14,y,.34,-.13,0,kopf).rotation.z=Math.PI;[-1,1].forEach(s=>{sph(.05,0xffd23a,.1,.07,s*.17,kopf);sph(.03,0x111111,.13,.07,s*.17,kopf)});
  const fl=[-1,1].map(s=>{const w1=grp(0,.15,s*.3,g);sph(.5,b,0,0,s*.8,w1,1,.1,1.65);for(let i=0;i<4;i++)box(.16,.03,.45,0x2a1c10,-.3+i*.2,0,s*1.95,w1);w1.rotation.x=sitz?s*1.35:0;return w1});
  [-1,1].forEach(s=>{cyl(.05,.3,y,.1,-.38,s*.14,g);cone(.06,.16,y,.18,-.55,s*.14,g).rotation.z=-1.3});
  g.userData.anim=t=>{if(!sitz)fl.forEach((w1,i)=>{w1.rotation.x=(i?1:-1)*Math.sin(t*3.2)*.45});kopf.rotation.y=Math.sin(t*.8)*.5};return vm(g,kopf,fl[0],fl[1])}
function panda(par){const g=grp(0,0,0,par),w=0xf6f6f2,k=0x1c1c1e;
  sph(.9,w,0,.95,0,g,1,1.05,.95).castShadow=true;sph(.93,k,0,1.4,0,g,1.04,.4,1.0);
  [-1,1].forEach(s=>{sph(.34,k,.55,.3,s*.6,g,1.35,.85,.9);const a=grp(.3,1.35,s*.78,g);cyl(.2,.95,k,0,-.45,0,a);sph(.22,k,0,-.95,0,a);a.rotation.z=1.15});
  cyl(.045,1.5,0x7ab648,1.05,1.0,0,g).rotation.x=Math.PI/2;[-.6,0,.6].forEach(o=>sph(.14,0x4aa84e,1.05,1.08,o,g,1.2,.7,1));
  const kopf=grp(.55,2.0,0,g);sph(.62,w,0,0,0,kopf,1.05,.95,1);sph(.25,w,.5,-.14,0,kopf,.9,.7,1);sph(.1,k,.68,-.07,0,kopf,1.1,.8,1.1);
  [-1,1].forEach(s=>{sph(.2,k,-.05,.56,s*.42,kopf);sph(.16,k,.5,.1,s*.22,kopf,.6,1.25,.8);sph(.035,0xffffff,.6,.13,s*.22,kopf)});
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*2.6)*.08};return vm(g,kopf)}
function wolf(par,heul){const g=grp(0,0,0,par),f=0x868a90,d=0x5c6067,l=0xd8dadc;
  sph(.8,f,0,1.25,0,g,1.65,.55,.5).castShadow=true;sph(.8,d,0,1.45,0,g,1.55,.3,.4);sph(.55,l,.35,1.0,0,g,1.5,.4,.4);
  [[-1,.32],[-1,-.32],[1,.32],[1,-.32]].forEach(p=>{cyl(.12,1.1,f,p[0],.55,p[1],g,true);sph(.15,d,p[0]+.08,.07,p[1],g,1.3,.5,.9)});
  sph(.38,f,1.3,1.5,0,g,1.1,1.1,.9);
  const kopf=grp(1.7,1.75,0,g);sph(.36,f,0,0,0,kopf,1.1,.95,.9);sph(.2,0xb8bbc0,.38,-.1,0,kopf,1.5,.7,.7);sph(.06,0x111111,.7,-.04,0,kopf);
  [-1,1].forEach(s=>{sph(.055,0xf2c14e,.22,.11,s*.2,kopf);sph(.03,0x111111,.25,.11,s*.2,kopf);cone(.11,.34,d,-.1,.42,s*.2,kopf);cone(.06,.2,0xd8a8a0,-.08,.4,s*.2,kopf);sph(.15,l,.1,-.2,s*.2,kopf,1,.8,.6)});
  const sw=grp(-1.4,1.35,0,g);sph(.3,f,-.45,-.35,0,sw,1.7,.8,.8).rotation.z=.6;sph(.12,d,-.95,-.75,0,sw);
  g.userData.anim=t=>{kopf.rotation.z=heul?.5+Math.sin(t*.7)*.35:Math.sin(t*.9)*.1;sw.rotation.y=Math.sin(t*1.5)*.25};return vm(g,kopf,sw)}
function nashorn(par){const g=grp(0,0,0,par),f=0x8b8e94,d=0x74777d,h=0x4c4640;
  sph(1.1,f,0,1.4,0,g,1.5,.82,.8).castShadow=true;sph(.8,d,.8,1.5,0,g,.32,1,.9);sph(.8,d,-.85,1.5,0,g,.3,.95,.85);
  [[-1,.6],[-1,-.6],[1,.6],[1,-.6]].forEach(p=>{cyl(.34,.95,f,p[0],.5,p[1],g,true);[-.18,0,.18].forEach(o=>sph(.09,0x4a4a50,p[0]+.3,.08,p[1]+o,g))});
  const kopf=grp(1.95,1.2,0,g);sph(.62,f,0,0,0,kopf,1.5,.8,.8);cone(.17,.85,h,.85,.52,0,kopf).rotation.z=-.4;cone(.1,.4,h,.4,.55,0,kopf).rotation.z=-.2;
  [-1,1].forEach(s=>{sph(.06,0x111111,.45,.2,s*.43,kopf);cone(.11,.3,d,-.5,.45,s*.32,kopf);sph(.05,0x333333,1.0,-.12,s*.2,kopf)});
  cyl(.05,1,d,-1.75,1.2,0,g).rotation.z=.5;sph(.1,0x333333,-1.95,.75,0,g);
  g.userData.anim=t=>{kopf.rotation.z=-.15+Math.sin(t*.9)*.09};return vm(g,kopf)}
function strauss(par,mann){const g=grp(0,0,0,par),b=mann?0x26262a:0x8a7968,w=mann?0xf2efe6:0xa89886,h=0xe8b8a0;
  sph(.72,b,0,1.85,0,g,1.15,.9,.9).castShadow=true;[-1,1].forEach(s=>sph(.5,w,-.15,1.95,s*.6,g,1.1,.8,.3));sph(.5,w,-.9,2.0,0,g,.9,.85,1);
  [-1,1].forEach(s=>{sph(.28,h,0,1.35,s*.35,g,.9,1.2,.7);cyl(.07,1.3,h,.05,.65,s*.3,g,true);box(.5,.06,.2,h,.25,.03,s*.3,g)});
  const neck=grp(.6,2.3,0,g);cyl(.1,1.7,h,.05,.85,0,neck).rotation.z=-.12;
  const kopf=grp(.2,1.7,0,neck);sph(.17,h,0,0,0,kopf,1.25,.9,.9);box(.22,.05,.15,0xf2c9a0,.25,-.05,0,kopf);[-1,1].forEach(s=>{sph(.07,0xffffff,.08,.08,s*.13,kopf);sph(.04,0x111111,.12,.08,s*.14,kopf)});
  g.userData.anim=t=>{neck.rotation.z=Math.sin(t*.8)*.1;kopf.rotation.z=Math.sin(t*1.7)*.25};return vm(g,neck,kopf)}
function biber(par){const g=grp(0,0,0,par),f=0x6b4a30,d=0x4a3220;
  sph(.55,f,0,.5,0,g,1.35,.85,.85).castShadow=true;[[-.35,.25],[-.35,-.25],[.4,.25],[.4,-.25]].forEach(p=>cyl(.08,.25,d,p[0],.12,p[1],g));[-1,1].forEach(s=>box(.35,.04,.18,d,-.45,.03,s*.27,g));
  const kopf=grp(.78,.62,0,g);sph(.3,f,0,0,0,kopf,1.1,1,.95);sph(.13,0x8a6a48,.28,-.08,0,kopf,1,.8,1);sph(.05,0x111111,.4,-.02,0,kopf);[-1,1].forEach(s=>{box(.04,.1,.03,0xf2a43a,.38,-.17,s*.03,kopf);sph(.04,0x111111,.2,.1,s*.2,kopf);sph(.08,d,-.05,.26,s*.18,kopf,.6,1,.6)});
  cyl(.03,.8,0x8a5a32,.42,-.14,0,kopf).rotation.x=Math.PI/2;sph(.35,0x2a2420,-1.0,.2,0,g,1.5,.12,.85).rotation.z=.15;
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.8)*.12};return vm(g,kopf)}
function otter(par){const g=grp(0,0,0,par),f=0x6a4a34,l=0xe0d0b4;
  sph(.4,f,0,.4,0,g,2,.6,.55).castShadow=true;sph(.3,l,.4,.28,0,g,1.2,.4,.5);cone(.18,1.1,f,-1.15,.28,0,g).rotation.z=Math.PI/2;
  [[-.5,.22],[-.5,-.22],[.55,.22],[.55,-.22]].forEach(p=>cyl(.07,.25,f,p[0],.12,p[1],g));
  const kopf=grp(.95,.55,0,g);sph(.27,f,0,0,0,kopf,1.1,.9,.9);sph(.14,l,.2,-.05,0,kopf,1,.8,1);sph(.045,0x111111,.34,.0,0,kopf);[-1,1].forEach(s=>{sph(.04,0x111111,.17,.1,s*.14,kopf);sph(.05,f,-.08,.2,s*.16,kopf)});
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.4)*.25;kopf.rotation.y=Math.sin(t*.9)*.35};return vm(g,kopf)}
function eichhoernchen(par){const g=grp(0,0,0,par),f=0xb5651d;
  sph(.22,f,0,.3,0,g,1.3,1,.8);sph(.16,0xf0e2cc,.1,.26,0,g,1,.9,.7);[-1,1].forEach(s=>cyl(.04,.25,f,.12,.1,s*.1,g));
  const kopf=grp(.28,.5,0,g);sph(.15,f,0,0,0,kopf);sph(.045,0x111111,.1,.04,.1,kopf);sph(.045,0x111111,.1,.04,-.1,kopf);sph(.03,0x111111,.16,-.02,0,kopf);[-1,1].forEach(s=>cone(.04,.12,f,-.03,.17,s*.07,kopf));
  const sw=grp(-.25,.3,0,g);sph(.18,0xc9772a,-.15,.25,0,sw,.8,1.8,.7);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*3)*.2;sw.rotation.z=Math.sin(t*2.2)*.15};return vm(g,kopf,sw)}
function hai(par){const g=grp(0,0,0,par),f=0x7b8d99,b=0xeef2f4;
  sph(1,f,0,0,0,g,2.6,.5,.5);sph(.9,b,.05,-.22,0,g,2.3,.3,.45);cone(.26,1,f,2.9,-.1,0,g).rotation.z=-Math.PI/2;cone(.4,.9,0x6a7c88,-.1,.75,0,g).rotation.z=.4;
  [-1,1].forEach(s=>{sph(.5,0x6a7c88,.6,-.3,s*.6,g,1.2,.08,.6).rotation.x=s*.4;sph(.05,0x111111,2.3,.15,s*.3,g)});
  const sw=grp(-2.5,0,0,g);cone(.4,1.1,f,-.3,.25,0,sw).rotation.z=Math.PI/2+.3;cone(.25,.8,f,-.3,-.25,0,sw).rotation.z=Math.PI/2-.3;
  g.userData.anim=t=>{sw.rotation.y=Math.sin(t*2.2)*.3};return vm(g,sw)}
function rochen(par){const g=grp(0,0,0,par),f=0x8a7a68;
  sph(1,f,0,0,0,g,1.3,.1,1.6);sph(.6,f,.7,.06,0,g,1,.4,.8);cyl(.05,2.2,0x6a5a48,-1.8,0,0,g).rotation.z=Math.PI/2;[-1,1].forEach(s=>sph(.06,0x111111,1.0,.2,s*.25,g));[[0,.5],[-.4,-.6],[.3,-.7],[-.2,.8]].forEach(p=>sph(.1,0xf0e8d8,p[0],.1,p[1],g,1,.2,1));
  const fl=[-1,1].map(s=>{const w=grp(0,0,s*.5,g);sph(.9,f,0,0,s*.7,w,1.1,.08,.8);return w});
  g.userData.anim=t=>{fl.forEach((w,i)=>{w.rotation.x=(i?1:-1)*Math.sin(t*2)*.25})};return vm(g,fl[0],fl[1])}
function erwachsener(par,jacke,hose,stil){const m=kindModell({jacke:jacke,hose:hose,haut:0xe8b98f,haar:0x3a2a1a,stil:stil||'kurz',rucksack:null},par);m.g.scale.setScalar(1.25);return m}
function plusch(par,x,y,z,c,s){const g=grp(x,y,z,par);sph(.35*s,c,0,.35*s,0,g);sph(.26*s,c,0,.85*s,0,g);[-1,1].forEach(q=>{sph(.1*s,c,q*.2*s,1.07*s,0,g);sph(.18*s,c,q*.34*s,.45*s,.12*s,g,.6,1,.6)});sph(.1*s,0xf2d8b0,0,.8*s,.2*s,g);sph(.04*s,0x111111,0,.84*s,.29*s,g);[-1,1].forEach(q=>sph(.03*s,0x111111,q*.09*s,.93*s,.22*s,g));return g}
/* Alte Tiere: unbewegte Teile je Material verschmelzen (bewegte Teile werden selbst erkannt) -> viel weniger Zeichenaufrufe, gleiches Aussehen */
function automerge(fn){return function(){const g=fn.apply(null,arguments),an=g.userData.anim;if(!an||g.userData.vmAuto)return g;g.userData.vmAuto=1;
  const snap=()=>{const r=[];g.traverse(o=>{if(o!==g)r.push([o,o.position.x,o.position.y,o.position.z,o.rotation.x,o.rotation.y,o.rotation.z,o.scale.x,o.scale.y,o.scale.z])});return r};
  const a=snap();an(.37);const b=snap();an(1.91);const c=snap();an(0);const mv=[];
  a.forEach((r,i)=>{for(let k=1;k<10;k++){if(Math.abs(r[k]-b[i][k])>1e-6||Math.abs(r[k]-c[i][k])>1e-6){mv.push(r[0]);break}}});
  mv.forEach(o=>{o.userData._d=0;for(let p=o.parent;p&&p!==g;p=p.parent)o.userData._d++});
  mv.sort((x,y)=>y.userData._d-x.userData._d).forEach(o=>{if(!o.isMesh&&o.children.length)vmVerschm(o);o.userData.frei=1});vmVerschm(g);return g}}
elefant=automerge(elefant);giraffe=automerge(giraffe);zebra=automerge(zebra);pinguin=automerge(pinguin);flamingo=automerge(flamingo);affe=automerge(affe);schaf=automerge(schaf);loewe=automerge(loewe);tiger=automerge(tiger);baer=automerge(baer);nilpferd=automerge(nilpferd);kaenguru=automerge(kaenguru);krokodil=automerge(krokodil);ziege=automerge(ziege);seehund=automerge(seehund);papagei=automerge(papagei);schildkroete=automerge(schildkroete);schlange=automerge(schlange);
