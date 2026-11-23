/* Welt: Bauernhof (Kennwort bauernhof). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Schilder: ausgeschaltet (Wunsch der Lehrkraft, 24.11.2026). Frühere Liste zum Wiedereinschalten: SCHILDER_ALT einfach als SCHILDER eintragen und WEGMAX auf 9 setzen. */
const SCHILDER_ALT=['Ausgang', 'Geschafft!', 'Kühe, Hühner', 'Schweine', 'Mühle', 'Spielplatz', 'Picknick', 'Bauernhaus', 'Maislabyrinth', 'Gänse', 'Molkerei', 'Ponys und Kutsche', 'Windmühle', 'Scheune', 'Kürbisfeld', 'Hofladen'];
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Hanna Huhn';
const START={x:0,z:94};
const BEREICHE={
  eingang:{name:'Hofeinfahrt',x:0,z:92,plaetze:[]},
  obstgarten:{name:'Obstgarten',x:45,z:-68,plaetze:[]}
};
const EXTRAZONEN=[{name:'Kuhweide',x:-95,z:66,r:22},{name:'Schweinestall',x:95,z:66,r:22},{name:'Hühnerhof',x:-45,z:70,r:15},{name:'Streichelzoo',x:45,z:70,r:14},{name:'Pferdekoppel',x:-95,z:0,r:26},{name:'Schafweide',x:95,z:0,r:26},{name:'Entenweiher',x:-45,z:0,r:19},{name:'Windmühle',x:45,z:0,r:19},{name:'Gemüsegarten',x:-45,z:-68,r:19},{name:'Kürbisfeld',x:-95,z:-66,r:22},{name:'Imkerei',x:95,z:-66,r:22},{name:'Scheune',x:-45,z:-135,r:20},{name:'Traktoren',x:45,z:-135,r:20},{name:'Spielplatz',x:-88,z:-104,r:13},{name:'Picknick',x:88,z:-104,r:13},{name:'Bauernhaus',x:-145,z:66,r:22},{name:'Maislabyrinth',x:-145,z:0,r:24},{name:'Gänsewiese',x:-145,z:-68,r:20},{name:'Molkerei',x:145,z:66,r:22},{name:'Wagenremise',x:145,z:0,r:22}];
const SEITENWEGE=[35,-35,-100];
const WEGBOGEN=11;
const GRENZE={x0:-175,x1:175,z0:-215,z1:115};
const TORZ=-160, FEST={x:0,z:-190};
let FARBEN,WASSER,ausgang;
const ZW=(s,w)=>WINTER?w:s;
const ZN=n=>EXTRAZONEN.find(e=>e.name===n);
function pfad(x1,z1,x2,z2,w,farbe){weg(wellen(x1,z1,x2,z2),w,farbe)}
function scheibe(x,z,r,farbe,h){h=h||.12;const c=cyl(r,h,farbe,x,h/2,z,scene);c.receiveShadow=true;return c}
function schild(text,x,y,z,w,h,schrift,farbe,rot,par){const s=schildText(text,farbe||'#fff8e6',w,h,schrift);s.position.set(x,y,z);if(rot)s.rotation.y=rot;(par||scene).add(s);return s}
function bewegt(teil,fn){teil.userData.keep=1;lebendig.push({o:{userData:{anim:fn}},ph:0})}
function leben(g,ph){lebendig.push({o:g,ph:ph||rnd()*6})}
function instanziert(geo,farbe,liste){const im=new THREE.InstancedMesh(geo,mat(farbe),liste.length);im.frustumCulled=false;scene.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3();liste.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);M.compose(P,Q,S);im.setMatrixAt(i,M)});im.instanceMatrix.needsUpdate=true;return im}
let GLAS;
function glas(w,h,d,x,y,z,par){GLAS=GLAS||new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.28,depthWrite:false});const m=new THREE.Mesh(gBox,GLAS);m.position.set(x,y,z);m.scale.set(w,h,d);(par||scene).add(m);return m}
function giebel(g,w,d,y0,dachf,wandf,a){a=a||.62;const h=d/2*Math.tan(a),l=d/2/Math.cos(a)+.35;[-1,1].forEach(s=>{const r=box(w+.7,.22,l,dachf,0,y0+h/2,s*d/4,g,true);r.rotation.x=s*a});box(w,h*.5,d*.5,wandf,0,y0+h*.25,0,g);box(w+.7,.2,.45,dachf,0,y0+h+.02,0,g)}
function stall(x,z,w,d,hh,wand,dach,rot,text){const g=grp(x,0,z);box(w,hh,d,wand,0,hh/2,0,g,true);giebel(g,w,d,hh,dach,wand);
  box(w*.3,hh*.62,.14,0x7a5230,0,hh*.31,d/2+.05,g);if(w>=8)[-1,1].forEach(s=>box(w*.34,.1,.16,0xf6f2e6,0,hh*.31,d/2+.1,g).rotation.z=s*.8);else[-1,1].forEach(s=>{box(.9,.8,.1,0xffffff,s*w*.34,hh*.5,d/2+.05,g);box(.75,.65,.12,0xcfeaf5,s*w*.34,hh*.5,d/2+.07,g)});
  if(text)schild(text,0,Math.min(hh*.85,hh-.7),d/2+.1,w>=8?5:Math.min(w*.45,4),.8,40,'#fff8e6',0,g);g.rotation.y=rot||0;sperrKasten(x,z,w,d,rot||0);return g}
function gehege(b,r,boden,luecke,n){scheibe(b.x,b.z,r,boden,.12);zaun(b.x,b.z,r,n||70,luecke)}
function zugang(b,pz,ex){pfad(b.x,b.z,ex!=null?ex:b.x,pz,3.5)}
function stroh(x,z,rot,par,y,hell){const o=box(1.7,1,1,hell?0xe8c850:0xd8b440,x,y||.5,z,par||scene,true);o.rotation.y=rot||0;box(1.74,1.04,.12,0x6a4a2a,x,y||.5,z,par||scene).rotation.y=rot||0;return o}
function ballen(x,z,rot){const c=cyl(.7,1.1,0xe8c850,x,.55,z,scene,true);c.rotation.z=Math.PI/2;c.rotation.y=rot||0;kreis(x,z,.9)}
function bank(x,z,rot){const g=grp(x,0,z);box(2.4,.15,.8,0x9a5a30,0,.7,0,g,true);box(2.4,.7,.1,0x9a5a30,0,1.1,-.35,g);box(.12,.7,.7,0x6a4220,-1,.35,0,g);box(.12,.7,.7,0x6a4220,1,.35,0,g);g.rotation.y=rot||0;kreis(x,z,1.2);return g}
function laterne(x,z){const g=grp(x,0,z);cyl(.08,3.4,0x3a4a56,0,1.7,0,g,true);const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xfff0b8}));l.position.y=3.5;l.scale.setScalar(.35);g.add(l);kreis(x,z,.3)}
function kuebel(x,z){const g=grp(x,0,z);cyl(.6,.7,0x9a5a30,0,.35,0,g,true);cyl(.5,.1,0x4a3220,0,.72,0,g);if(!WINTER){const f=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0];for(let i=0;i<6;i++)blume(x-.3+(i%3)*.3,z-.2+Math.floor(i/3)*.4,f[i%5])}kreis(x,z,.7)}
function kanne(x,z){const g=grp(x,0,z);cyl(.38,1,0xc4cad0,0,.5,0,g,true);cyl(.28,.25,0xc4cad0,0,1.1,0,g);cyl(.42,.1,0xe0605a,0,.9,0,g);kreis(x,z,.5)}
function tonne(x,z){cyl(.5,1,0x8a5a32,x,.5,z,scene,true);cyl(.52,.1,0x4a3220,x,.7,z,scene);kreis(x,z,.55)}
function trog(x,z,rot,wasser){const g=grp(x,0,z);box(2.2,.5,.8,0x8a5a32,0,.25,0,g,true);box(1.9,.1,.5,wasser||0x4aa3d8,0,.5,0,g);g.rotation.y=rot||0;kreis(x,z,1.1)}
function kiste(x,z,fr,par){const g=grp(x,0,z,par);box(1.2,.4,.8,0xa8743f,0,.2,0,g,true);for(let i=0;i<4;i++)sph(.22,fr,-.42+i*.28,.5,(i%2-.5)*.3,g);return g}
function unterstand(x,z,rot,dach){const g=grp(x,0,z);[[-1.4,-1],[1.4,-1],[-1.4,1],[1.4,1]].forEach(p=>cyl(.1,2.2,0x7a5230,p[0],1.1,p[1],g,true));const r=box(3.4,.15,2.8,dach||0x9a5a30,0,2.35,0,g,true);r.rotation.x=.18;g.rotation.y=rot||0;kreis(x,z,1.6)}
function rauch(par,x,y,z){const g=grp(x,y,z,par);const ps=[0,1,2,3].map(i=>sph(.5,0xf2f2f2,0,0,0,g));bewegt(g,t=>{ps.forEach((p,i)=>{const f=(t*.35+i*.25)%1;p.position.set(f*1.2,f*2.8,0);p.scale.setScalar(.18+f*.4)})});return g}
function wetterhahn(par,x,y,z){const g=grp(x,y,z,par);cyl(.05,1.6,0x3a3a3a,0,.8,0,g,true);box(1,.06,.06,0x3a3a3a,0,.9,0,g);box(.06,.06,1,0x3a3a3a,0,.9,0,g);const h=grp(0,1.6,0,g);box(.9,.06,.06,0x3a3a3a,0,0,0,h);sph(.18,0xe0302a,.35,.18,0,h,1.2,1,.6);cone(.08,.2,0xf2a830,.55,.2,0,h).rotation.z=-Math.PI/2;box(.3,.3,.04,0xe0302a,-.35,.2,0,h);bewegt(h,t=>{h.rotation.y=Math.sin(t*.5)*1.1})}
function vogelscheuche(x,z){const g=grp(x,0,z);cyl(.08,3.2,0x7a5230,0,1.6,0,g,true);box(.9,1.2,.5,0x3b6fc4,0,2,0,g,true);box(.9,.3,.52,0xe0605a,0,1.5,0,g);sph(.35,0xe8d29a,0,3.1,0,g);sph(.05,0x111111,.25,3.15,.12,g);sph(.05,0x111111,.25,3.15,-.12,g);box(.2,.06,.3,0xc0392b,.33,3,0,g);cyl(.55,.08,0x6a4a2a,0,3.4,0,g);cyl(.3,.4,0x6a4a2a,0,3.6,0,g);
  const arme=grp(0,2.5,0,g);box(2.6,.16,.16,0x7a5230,0,0,0,arme);[-1,1].forEach(s=>{box(.5,.5,.3,0x3b6fc4,s*.7,0,0,arme);for(let i=0;i<3;i++)box(.05,.4,.05,0xe8c850,s*1.35,-.2,(i-1)*.08,arme)});bewegt(arme,t=>{arme.rotation.z=Math.sin(t*1.2)*.12});kreis(x,z,.6)}
function kuh(par){const g=grp(0,0,0,par),w=0xf6f2ea,s=0x2b2b2b;
  sph(1,w,0,1.55,0,g,1.45,.62,.62).castShadow=true;[[-.9,.4],[-.9,-.4],[.9,.4],[.9,-.4]].forEach(p=>{cyl(.19,1,w,p[0],.5,p[1],g,true);cyl(.21,.2,0x3a3030,p[0],.1,p[1],g)});
  sph(.38,s,-.35,2.1,.15,g,1,.4,1);sph(.3,s,.45,1.7,.58,g,1,1,.3);sph(.3,s,-.2,1.5,-.6,g,1.3,1,.3);sph(.34,0xf2a0a0,-.1,.92,0,g,1.2,.7,.9);
  const kopf=grp(1.75,1.85,0,g);sph(.5,w,0,0,0,kopf,1,.9,.9);sph(.3,0xf2b3a8,.42,-.15,0,kopf,1,.75,1.05);[-1,1].forEach(z=>{sph(.09,0xffffff,.36,.14,z*.3,kopf);sph(.055,0x111111,.41,.14,z*.3,kopf)});[-1,1].forEach(z=>{cone(.08,.3,0xfff4dc,-.02,.5,z*.28,kopf);sph(.16,s,-.1,.12,z*.55,kopf,1,.5,1.3)});
  const sw=grp(-1.4,1.95,0,g);cyl(.04,1.2,w,0,-.6,0,sw);sph(.12,s,0,-1.25,0,sw);
  g.userData.anim=t=>{kopf.rotation.z=-.15+Math.sin(t*.8)*.35;sw.rotation.z=Math.sin(t*1.6)*.25};return g}
function schwein(par){const g=grp(0,0,0,par),f=0xf4b0b8,d=0xe8949e;
  sph(.8,f,0,.85,0,g,1.4,.9,.85).castShadow=true;[[-.6,.3],[-.6,-.3],[.6,.3],[.6,-.3]].forEach(p=>cyl(.12,.5,f,p[0],.25,p[1],g,true));
  const kopf=grp(1.15,1,0,g);sph(.5,f,0,0,0,kopf);cyl(.22,.25,d,.45,-.08,0,kopf).rotation.z=Math.PI/2;sph(.05,0x7a3a40,.58,-.04,.09,kopf);sph(.05,0x7a3a40,.58,-.04,-.09,kopf);[-1,1].forEach(z=>{sph(.07,0xffffff,.42,.16,z*.22,kopf);sph(.04,0x111111,.46,.16,z*.22,kopf)});[-1,1].forEach(z=>box(.28,.3,.08,d,-.1,.42,z*.3,kopf).rotation.x=z*.6);
  const sw=grp(-1.05,1.05,0,g);sph(.1,d,0,0,0,sw);sph(.08,d,-.12,.08,0,sw);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.1)*.18;sw.rotation.z=Math.sin(t*4)*.4};return g}
function huhn(par,hahn){const g=grp(0,0,0,par),f=hahn?0xb8501e:0xfaf6ee,k=hahn?0x2a6a3a:0xf0e8d8;
  sph(.5,f,0,.7,0,g,1.1,.9,.8).castShadow=true;sph(.3,k,-.5,.95,0,g,.7,1.3,.5).rotation.z=.4;[-1,1].forEach(z=>sph(.3,k,-.05,.72,z*.38,g,1.3,.7,.3));[-1,1].forEach(z=>cyl(.04,.4,0xf2a830,.05,.2,z*.15,g));
  const kopf=grp(.45,1.15,0,g);sph(.22,f,0,0,0,kopf);cone(.08,.22,0xf2a830,.22,-.02,0,kopf).rotation.z=-Math.PI/2;sph(.04,0x111111,.12,.07,.15,kopf);sph(.04,0x111111,.12,.07,-.15,kopf);box(.08,.14,.2,0xe0302a,0,.24,0,kopf);sph(.06,0xe0302a,.2,-.2,0,kopf);
  g.userData.anim=t=>{const p=Math.max(0,Math.sin(t*1.7));kopf.rotation.z=p*.9;kopf.position.y=1.15-p*.3};return g}
function kueken(par){const g=grp(0,0,0,par);sph(.22,0xffe45a,0,.25,0,g).castShadow=true;sph(.15,0xffe45a,.18,.46,0,g);cone(.04,.1,0xf2a830,.32,.44,0,g).rotation.z=-Math.PI/2;sph(.025,0x111111,.28,.5,.07,g);sph(.025,0x111111,.28,.5,-.07,g);
  g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*3))*.12};return g}
function pferd(par,f,m){f=f||0x9a5a2a;m=m||0x2a1d14;const g=grp(0,0,0,par);
  sph(1,f,0,2,0,g,1.5,.62,.55).castShadow=true;[[-1,.35],[-1,-.35],[1,.35],[1,-.35]].forEach(p=>{cyl(.14,1.7,f,p[0],.85,p[1],g,true);box(.2,.2,.24,0x2a1d14,p[0],.1,p[1],g)});
  const hals=grp(1.2,2.3,0,g);cyl(.24,1.4,f,.35,.55,0,hals).rotation.z=-.5;box(.14,1.2,.1,m,.1,.6,0,hals).rotation.z=-.5;
  const kopf=grp(.7,1.15,0,hals);sph(.3,f,.35,-.12,0,kopf,1.6,.85,.8).rotation.z=-.35;sph(.2,0x3a2a22,.78,-.4,0,kopf,1,1,.9);[-1,1].forEach(z=>{sph(.07,0xffffff,.4,.04,z*.2,kopf);sph(.04,0x111111,.44,.04,z*.2,kopf)});[-1,1].forEach(z=>cone(.07,.25,f,0,.18,z*.12,kopf));
  const sw=grp(-1.5,2.3,0,g);cone(.16,1.5,m,0,-.75,0,sw);
  g.userData.anim=t=>{sw.rotation.z=Math.sin(t*1.5)*.2;kopf.rotation.z=Math.sin(t*.9)*.15;hals.rotation.z=Math.sin(t*.6)*.06};return g}
function schaf(par){const g=grp(0,0,0,par);
  sph(.6,0xf4f0e6,0,.95,0,g,1.3,.95,.95).castShadow=true;[[.35,.55,.4],[-.4,.5,-.4],[.5,.5,-.3],[-.5,.45,.35],[0,.72,0],[-.1,.5,.5]].forEach(p=>sph(.36,0xf8f5ee,p[0],p[1]+.5,p[2],g));
  [[-.5,.3],[-.5,-.3],[.5,.3],[.5,-.3]].forEach(p=>cyl(.07,.7,0x3a3030,p[0],.35,p[1],g));
  const kopf=grp(.85,1.1,0,g);sph(.27,0x3a3030,.1,0,0,kopf,1.25,1,.85).castShadow=true;[-1,1].forEach(z=>{sph(.1,0x3a3030,-.1,.02,z*.3,kopf,.5,1.4,.7);sph(.065,0xffffff,.33,.08,z*.15,kopf);sph(.035,0x111111,.37,.08,z*.15,kopf)});sph(.12,0xf8f5ee,0,.28,0,kopf);sph(.05,0x1a1a1a,.43,-.04,0,kopf);
  g.userData.anim=t=>{kopf.rotation.z=-.4+Math.sin(t*1.4)*.35};return g}
function ziege(par){const g=grp(0,0,0,par),f=0xe6d8b8,d=0x7a5a3a;
  sph(.55,f,0,.95,0,g,1.35,.95,.85).castShadow=true;[[-.5,.3],[-.5,-.3],[.5,.3],[.5,-.3]].forEach(p=>cyl(.11,.9,f,p[0],.45,p[1],g,true));cyl(.17,.8,f,.62,1.15,0,g).rotation.z=-.6;
  const kopf=grp(.8,1.4,0,g);sph(.27,f,.1,0,0,kopf,1.2,1,.9);sph(.15,d,.38,-.1,0,kopf,1.1,.9,1);[-1,1].forEach(z=>{sph(.06,0xffffff,.33,.1,z*.16,kopf);sph(.035,0x111111,.37,.1,z*.16,kopf)});
  [-1,1].forEach(z=>{const h=cone(.07,.5,0x5a4a3a,-.05,.32,z*.11,kopf);h.rotation.z=.7;sph(.1,d,-.06,.05,z*.3,kopf,.6,.5,1.8)});cone(.06,.28,d,.3,-.3,0,kopf).rotation.z=Math.PI;
  cone(.07,.3,f,-.62,1.15,0,g).rotation.z=.9;
  g.userData.anim=t=>{kopf.rotation.z=-.3+Math.sin(t*1.5)*.3};return g}
function ente(par){const g=grp(0,0,0,par);sph(.5,0xf6f2e6,0,.35,0,g,1.3,.7,.85).castShadow=true;sph(.3,0xf6f2e6,-.55,.55,0,g,.8,.9,.6);cyl(.09,.4,0xf6f2e6,.4,.65,0,g);
  const kopf=grp(.45,.9,0,g);sph(.22,0x2f7a4a,0,0,0,kopf);box(.28,.08,.2,0xf2b230,.24,-.04,0,kopf);sph(.035,0x111111,.1,.07,.13,kopf);sph(.035,0x111111,.1,.07,-.13,kopf);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.5)*.25;g.rotation.z=Math.sin(t*1.1)*.03};return g}
function hund(par){const g=grp(0,0,0,par),f=0x8a5a32,w=0xf6f2ea;
  sph(.5,f,0,.85,0,g,1.4,.8,.7).castShadow=true;sph(.3,w,.3,.8,0,g,1,.9,.8);[[-.5,.2],[-.5,-.2],[.5,.2],[.5,-.2]].forEach(p=>{cyl(.07,.7,f,p[0],.35,p[1],g,true);sph(.09,w,p[0],.06,p[1],g,1.3,.6,1)});
  const kopf=grp(.85,1.25,0,g);sph(.28,f,0,0,0,kopf);sph(.15,w,.2,-.08,0,kopf,1.2,.8,.9);sph(.06,0x111111,.34,-.04,0,kopf);[-1,1].forEach(z=>{sph(.05,0xffffff,.2,.11,z*.14,kopf);sph(.03,0x111111,.24,.11,z*.14,kopf)});[-1,1].forEach(z=>box(.12,.3,.1,f,-.05,.14,z*.22,kopf).rotation.x=z*.5);
  const sw=grp(-.7,1.05,0,g);cone(.11,.8,f,-.25,.25,0,sw).rotation.z=.9;
  g.userData.anim=t=>{sw.rotation.y=Math.sin(t*7)*.5;kopf.rotation.z=Math.sin(t*1.2)*.12};return g}
function katze(par){const g=grp(0,0,0,par),f=0xd9843a;sph(.4,f,0,.45,0,g,1.1,1,.8).castShadow=true;
  const kopf=grp(.35,.95,0,g);sph(.25,f,0,0,0,kopf);[-1,1].forEach(z=>cone(.08,.2,f,0,.26,z*.14,kopf));sph(.04,0x111111,.2,.04,.1,kopf);sph(.04,0x111111,.2,.04,-.1,kopf);sph(.04,0xe8788a,.24,-.04,0,kopf);
  const sw=grp(-.45,.3,0,g);cyl(.06,.9,f,-.2,0,0,sw).rotation.z=Math.PI/2;
  g.userData.anim=t=>{sw.rotation.y=Math.sin(t*1.5)*.5};return g}
function hase(par){const g=grp(0,0,0,par),f=0xcbb8a0;sph(.4,f,0,.4,0,g,1.2,.9,.8).castShadow=true;sph(.28,f,.4,.7,0,g);[-1,1].forEach(z=>sph(.1,f,.35,1.15,z*.1,g,.6,2.4,.4));sph(.1,0xffffff,-.5,.45,0,g);[-1,1].forEach(z=>{sph(.05,0x111111,.63,.78,z*.14,g);sph(.2,f,-.1,.2,z*.28,g,1.4,.8,.6)});sph(.04,0xe8788a,.67,.7,0,g);
  g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*2.2))*.25};return g}
function flatter(x,z,cx,cz,r,farbe,ph){const g=grp(x,1.4,z);sph(.07,0x3a2a22,0,0,0,g,2,.5,.5);[-1,1].forEach(z=>cyl(.012,.25,0x3a2a22,.2,.1,z*.05,g).rotation.z=-.9);const fl=[-1,1].map(s=>{const w=sph(.3,farbe,0,0,s*.3,g,.9,.1,1.1);return w});g.userData.anim=t=>{const a=t*.5+ph;g.position.set(cx+Math.cos(a)*r,1.3+Math.sin(t*1.3+ph)*.4,cz+Math.sin(a)*r*.7);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*14)*.7;fl[1].rotation.x=-Math.sin(t*14)*.7};leben(g,ph);return g}
function biene(cx,cz,r,ph){const g=grp(cx,1.3,cz);sph(.12,0xf2c230,0,0,0,g,1.4,1,1).castShadow=false;[-.05,.06].forEach(x=>sph(1,0x2a2a2a,x,0,0,g,.03,.125,.125));[-1,1].forEach(z=>{sph(.04,0xffffff,.15,.04,z*.07,g);sph(.022,0x111111,.18,.04,z*.07,g)});const fl=[-1,1].map(s=>box(.16,.02,.2,0xe8f4ff,0,.12,s*.14,g));g.userData.anim=t=>{const a=t*1.4+ph;g.position.set(cx+Math.cos(a)*r,1.2+Math.sin(t*2+ph)*.5,cz+Math.sin(a*1.3)*r);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*40)*.6;fl[1].rotation.x=-Math.sin(t*40)*.6};leben(g,ph);return g}
function traktor(par,fest){const g=grp(0,0,0,par),rot=0xd8433a,r=[];
  box(2.6,.9,1.3,rot,0,1.4,0,g,true);box(1.5,.9,1.2,rot,1.5,1.3,0,g,true);box(.5,.7,1,0x3a3a3a,2.35,1.25,0,g);box(1.4,.18,1.5,0xf6f2e6,-.4,3.5,0,g);[-1,1].forEach(z=>{box(.12,1.6,.12,0x3a3a3a,-1,2.7,z*.65,g);box(.12,1.6,.12,0x3a3a3a,.2,2.7,z*.65,g)});glas(1.3,1.5,1.2,-.4,2.7,0,g);box(.6,.2,.6,0x3a3a3a,-.5,2.1,0,g);cyl(.08,1,0x3a3a3a,1.9,2.2,.3,g);[-1,1].forEach(z=>sph(.14,0xfff0b8,2.62,1.4,z*.35,g));
  function rad(rr,x,z){const w=grp(x,rr,z,g);cyl(rr,.5,0x2a2a2a,0,0,0,w,true).rotation.x=Math.PI/2;box(rr*1.5,.12,.62,0xf2c230,0,0,0,w);box(.12,rr*1.5,.62,0xf2c230,0,0,0,w);r.push(w)}
  [-1,1].forEach(s=>{rad(.95,-.9,s*.85);rad(.55,1.6,s*.8)});
  if(!fest)g.userData.anim=t=>{r.forEach((w,i)=>{w.rotation.z=-t*(i%2?4:2.6)})};return g}
function anhaenger(par){const g=grp(0,0,0,par);box(2.8,.25,1.6,0x8a5a32,0,.9,0,g,true);[-1,1].forEach(z=>box(2.8,.5,.1,0xa8743f,0,1.25,z*.75,g));[-1,1].forEach(x=>box(.1,.5,1.6,0xa8743f,x*1.35,1.25,0,g));for(let i=0;i<3;i++)box(.8,.8,1.2,0xe8c850,-.8+i*.8,1.5,0,g,true);[-1,1].forEach(z=>{const w=cyl(.5,.25,0x2a2a2a,0,.5,z*.9,g,true);w.rotation.x=Math.PI/2});return g}
function maehdrescher(x,z,rot){const g=grp(x,0,z);box(4,1.4,2.4,0xd8a32a,0,1.9,0,g,true);box(2,1.6,2.2,0xd8a32a,1.2,3.2,0,g,true);glas(1.7,1.4,2,1.7,3.3,0,g);box(2.4,.3,2.6,0x3a3a3a,1.2,4.1,0,g);cyl(.35,2.2,0x8a949c,-1.2,3.4,.6,g,true);box(1.4,1,4.6,0xb8bec4,3.2,1.1,0,g,true);const hasp=cyl(.5,4.5,0xe0605a,3.8,1.6,0,g);hasp.rotation.x=Math.PI/2;
  [-1,1].forEach(s=>{const w=cyl(.9,.6,0x2a2a2a,-.9,.9,s*1.4,g,true);w.rotation.x=Math.PI/2;cyl(.35,.64,0xf2c230,-.9,.9,s*1.4,g).rotation.x=Math.PI/2;const k=cyl(.55,.5,0x2a2a2a,1.9,.55,s*1,g,true);k.rotation.x=Math.PI/2});g.rotation.y=rot||0;kreis(x,z,3);return g}
const SCHMUCK=[bank,laterne,kuebel,ballen,bank,laterne,kanne,kuebel];
const BPTS=[[0,104],[0,70],[0,35],[-40,35],[40,35],[-70,35],[70,35],[0,0],[0,-35],[-40,-35],[40,-35],[-70,-35],[70,-35],[0,-68],[0,-100],[-60,-100],[60,-100],[0,-130],[-20,98],[20,98],[0,60],[-120,35],[120,35],[-145,35],[145,35],[-120,-35],[120,-35],[-145,-35]];
function gans(par){const g=grp(0,0,0,par),w=0xf8f6f0,o=0xf59e3f;
  sph(.5,w,0,.75,0,g,1.4,.8,.75).castShadow=true;sph(.3,w,-.65,.95,0,g,.7,.7,.6);
  const hals=grp(.55,1.0,0,g);cyl(.1,.8,w,.1,.4,0,hals).rotation.z=-.25;
  const kopf=grp(.28,.85,0,hals);sph(.2,w,0,0,0,kopf);cone(.08,.3,o,.28,-.02,0,kopf).rotation.z=-Math.PI/2;[-1,1].forEach(z=>{sph(.045,0xffffff,.14,.06,z*.13,kopf);sph(.025,0x111111,.18,.06,z*.13,kopf)});
  [-1,1].forEach(z=>{cyl(.04,.45,o,0,.22,z*.2,g);box(.3,.04,.22,o,.08,.02,z*.2,g)});
  g.userData.anim=t=>{hals.rotation.z=Math.sin(t*1.2)*.25;kopf.rotation.z=Math.sin(t*2.4)*.1};return g}
function truthahn(par){const g=grp(0,0,0,par),f=0x6a3a22;
  sph(.5,f,0,.8,0,g,1.2,.85,.8).castShadow=true;
  sph(1,0x8a5a32,-.35,1.25,0,g,.12,.95,.95);sph(1,0xc8903f,-.37,1.25,0,g,.1,.7,.7);sph(1,0x6a3a22,-.39,1.25,0,g,.08,.45,.45);
  cyl(.12,.6,f,.55,1.15,0,g).rotation.z=-.3;
  const kopf=grp(.66,1.5,0,g);sph(.17,0xc0c8e8,0,0,0,kopf);cone(.05,.14,0xf0b030,.18,-.02,0,kopf).rotation.z=-Math.PI/2;sph(.07,0xe0302a,.1,-.16,0,kopf);[-1,1].forEach(z=>{sph(.04,0xffffff,.1,.05,z*.13,kopf);sph(.022,0x111111,.13,.05,z*.13,kopf)});
  [-1,1].forEach(z=>cyl(.06,.5,0x8a6a4a,0,.25,z*.22,g));
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*2)*.15};return g}
function pfau(par){const g=grp(0,0,0,par),b=0x2a6ab8,gr=0x2f9a6a;
  sph(.4,b,0,.9,0,g,1.3,.8,.7).castShadow=true;
  const hals=grp(.5,1.1,0,g);cyl(.09,.9,b,.1,.45,0,hals).rotation.z=-.2;
  const kopf=grp(.2,.95,0,hals);sph(.14,b,0,0,0,kopf);cone(.05,.16,0xf0b030,.16,0,0,kopf).rotation.z=-Math.PI/2;[-1,1].forEach(z=>{sph(.035,0xffffff,.08,.06,z*.1,kopf);sph(.02,0x111111,.1,.06,z*.1,kopf)});[-.05,0,.05].forEach(z=>sph(.03,b,-.02,.17,z*.6,kopf));
  for(let i=-5;i<=5;i++){const a=i*.17;cyl(.07,1.8,gr,-.55,.9+Math.cos(a)*.9,Math.sin(a)*.9,g).rotation.x=a;sph(.12,0xd8c030,-.55,.9+Math.cos(a)*1.75,Math.sin(a)*1.75,g,.5,1,.6)}
  [-1,1].forEach(z=>cyl(.05,.6,0x8a6a4a,0,.3,z*.2,g));
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.3)*.12};return g}
function paradeBauen(){const liste=[[kuh,.6],[schwein,.8],[huhn,1.3],[pferd,.6],[schaf,1],[ziege,1],[ente,1.3],[hund,1],[traktor,.5],[huhn,1.3]];liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
function weltBauen(){
FARBEN=WINTER?{boden:0xdfe9f1,pfad:0xe9dcc0,platz:0xf6e4b8,gehege:0xe8e4d4}:{boden:0x93cf72,pfad:0xe8d5a0,platz:0xf0dfae,gehege:0x9ed47a};
const boden=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200),mat(FARBEN.boden));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
WASSER=WINTER?0xbfe6f4:0x4aa3d8;
hauptweg(5);SEITENWEGE.forEach(w=>kreuzplatz(wegX(w),w,7.5));pfad(-150,35,150,35,4);pfad(-150,-35,150,-35,4);pfad(-92,-100,92,-100,4);pfad(0,TORZ+2,0,GRENZE.z0+4,5,FARBEN.platz);
scheibe(0,92,14,FARBEN.pfad,.07);scheibe(FEST.x,FEST.z,17,FARBEN.platz,.08);
/* ---------- Bäume (instanziert, wenige) ---------- */
const baumListe=[];
function frei(x,z){if(Math.hypot(x-0,z-92)<24||Math.hypot(x-45,z+68)<24)return false;
  for(const e of EXTRAZONEN){if(Math.hypot(x-e.x,z-e.z)<e.r+9)return false}if(Math.abs(x-wegX(z))<6&&z>TORZ+2)return false;for(const w of SEITENWEGE){if(Math.abs(z-w)<9&&Math.abs(x)<165)return false}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<24)return false;if(Math.abs(x)<5&&z<TORZ)return false;return true}
for(let i=0;i<130;i++){const x=GRENZE.x0+6+rnd()*(GRENZE.x1-GRENZE.x0-12),z=GRENZE.z0+6+rnd()*(GRENZE.z1-GRENZE.z0-12);if(frei(x,z))baumListe.push({x,z,s:.8+rnd()*.5})}
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
const BLF=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0];
/* ---------- 1. Hofeinfahrt mit Hofladen und Brunnen ---------- */
(function(){const b=BEREICHE.eingang;tor(0,b.z+17,12);const s=schildText(CONFIG.spielname,'#fff8e6',7.5,1.6,CONFIG.spielname.length>12?44:60);s.position.set(0,6.6,b.z+17.3);scene.add(s);
  const hl=stall(b.x-17,b.z+3,6,4,2.8,0xf0e2c0,0xb94a3a,0,'Hofladen');box(6.6,.12,1.6,0xe0605a,0,2.6,0,scene).position.set(b.x-17,2.7,b.z+5.4);
  [[-19,7.4,0xe0302a],[-17,7.6,0xffd45e],[-15,7.4,0x8ac24a]].forEach(p=>{const k=kiste(b.x+p[0]+17-17,b.z+p[1]-1.8,p[2]);kreis(b.x+p[0],b.z+p[1]-1.8,.8)});
  const st=stall(b.x+17,b.z+3,5,3.6,2.6,0xc8e0f0,0x3b6fc4,0,'Eier und Milch');kanne(b.x+13,b.z+7);kanne(b.x+14.2,b.z+7.6);kiste(b.x+19,b.z+7,0xfff4dc);kreis(b.x+19,b.z+7,.8);
  rauch(scene,b.x-15.5,4.2,b.z+2);box(.7,1.6,.7,0xa8543a,b.x-15.5,3.4,b.z+2,scene);box(.9,.15,.9,0x6a3a2a,b.x-15.5,4.25,b.z+2,scene);
  const br=grp(b.x,0,b.z-14);cyl(1.8,.9,0x9aa0a6,0,.45,0,br,true);cyl(1.4,.2,WASSER,0,.9,0,br);[-1,1].forEach(s=>cyl(.1,2.6,0x7a5230,s*1.6,1.3,0,br,true));[-1,1].forEach(q=>{box(4,.15,1.3,0xb94a3a,0,2.85,q*.55,br).rotation.x=q*.4});cyl(.04,.9,0x3a3a3a,0,2.2,0,br);cyl(.3,.4,0x8a5a32,0,1.5,0,br);kreis(b.x,b.z-14,2.2);
  wegweiser(-6,b.z-8,'Kühe, Hühner',0);wegweiser(6,b.z-8,'Schweine',0);wegweiser(3.5,b.z-22,'Mühle ↑',0);
  if(!WINTER){for(let i=0;i<26;i++){const a=rnd()*6.28,rr=3+rnd()*2;blume(b.x-11+Math.cos(a)*rr,b.z+10+Math.sin(a)*rr*.6,BLF[i%5]);blume(b.x+13+Math.cos(a)*rr,b.z+12+Math.sin(a)*rr*.6,BLF[(i+2)%5])}}
  else{[-11,13].forEach(x=>{const m=grp(b.x+x,0,b.z+11);sph(.8,0xffffff,0,.8,0,m);sph(.6,0xffffff,0,1.9,0,m);sph(.42,0xffffff,0,2.8,0,m);box(.5,.4,.5,0x3a4a56,0,3.3,0,m)})}})();
/* ---------- 2. Kuhweide mit Kuhstall ---------- */
(function(){const b=ZN('Kuhweide');gehege(b,22,ZW(0x86c466,0xe6eef4),0,72);zugang(b,35);
  stall(b.x-13,b.z-12,8,5,3,0xb83a2e,0x6a3a2a,.3,'Kuhstall');
  tier(kuh,b.x-4,b.z-4,b.x,b.z,1,1.9);tier(kuh,b.x+8,b.z+4,b.x,b.z,.95,1.8);tier(kuh,b.x-6,b.z+10,b.x,b.z,1.05,1.9);tier(kuh,b.x+10,b.z-10,b.x,b.z,.55,1);
  trog(b.x+2,b.z+16,0,0x4aa3d8);ballen(b.x-16,b.z+8,.4);ballen(b.x+16,b.z-4,1);
  const pu=grp(b.x+14,0,b.z+12);cyl(.2,1.4,0x3a4a56,0,.7,0,pu,true);box(.8,.2,.2,0x3a4a56,.3,1.4,0,pu);kreis(b.x+14,b.z+12,.5);
  wegweiser(b.x+25,b.z+2,'Kühe',Math.PI/2)})();
/* ---------- 3. Schweinestall mit Suhle ---------- */
(function(){const b=ZN('Schweinestall');gehege(b,22,ZW(0xb59a72,0xe0dcd6),Math.PI,72);zugang(b,35);
  stall(b.x+12,b.z-12,7,5,2.6,0xd8a898,0x8a3a30,-.3,'Schweinestall');
  wasserFl(b.x-3,b.z+3,6,ZW(0x7a5a3a,0x8a7a6a));wasserFl(b.x-3.5,b.z+3.4,4,ZW(0x8a6a48,0x9a8a7a),.02);kreis(b.x-3,b.z+3,5);
  tier(schwein,b.x-5,b.z+8,b.x,b.z,1,1.5);tier(schwein,b.x+3,b.z+5,b.x,b.z,.9,1.4);tier(schwein,b.x-9,b.z-1,b.x,b.z,1,1.5);tier(schwein,b.x+7,b.z-3,b.x,b.z,.45,.8);tier(schwein,b.x+9,b.z-5,b.x,b.z,.4,.7);tier(schwein,b.x-1,b.z-8,b.x,b.z,.8,1.2);
  trog(b.x+3,b.z+14,0,0x8a6a48);stroh(b.x-14,b.z-9,.5,null,.5,true);kreis(b.x-14,b.z-9,1.2);ballen(b.x-16,b.z+6,.2);
  wegweiser(b.x-25,b.z+2,'Schweine',-Math.PI/2)})();
/* ---------- 4. Hühnerhof mit Hühnerstall und Küken ---------- */
(function(){const b=ZN('Hühnerhof');gehege(b,15,ZW(0xe3d3a6,0xe6e2d6),0,52);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const hs=grp(b.x-8,0,b.z-5);[[-1.2,-.8],[1.2,-.8],[-1.2,.8],[1.2,.8]].forEach(p=>cyl(.1,1,0x6a4220,p[0],.5,p[1],hs,true));box(3,1.6,2.2,0xc8503a,0,1.8,0,hs,true);giebel(hs,3,2.2,2.6,0x6a3a2a,0xc8503a,.5);box(.6,.8,.1,0x3a2a1a,.6,1.6,1.15,hs);box(.8,.1,2.2,0x8a5a32,-.3,1,2.4,hs).rotation.x=.6;kreis(b.x-8,b.z-5,2.2);
  [[0,0,0],[4,3,1],[-3,5,0],[6,-4,0],[-2,-8,0],[3,-7,0]].forEach((p,i)=>tier(i===1?(q=>huhn(q,true)):huhn,b.x+p[0],b.z+p[1]+2,b.x,b.z,i===1?1.05:.8,.7));
  [[3,0],[4.5,.8],[1.5,1],[5,4],[-1,3],[-3,-3]].forEach((p,i)=>tier(kueken,b.x+p[0]+3,b.z+p[1]-3,b.x,b.z,1,.3));
  const nest=grp(b.x+9,0,b.z-8);cyl(.7,.25,0xc9a46a,0,.12,0,nest,true);for(let i=0;i<4;i++)sph(.16,0xf6f0e0,Math.cos(i*1.6)*.3,.35,Math.sin(i*1.6)*.3,nest,1,1.3,1);kreis(b.x+9,b.z-8,.9);
  trog(b.x+10,b.z+5,.4,0x4aa3d8);ballen(b.x+11,b.z-4,.5);
  wegweiser(b.x-17,b.z+3,'Hühner',Math.PI/2)})();
/* ---------- 5. Streichelzoo (Ziegen, Schafe, Kaninchen) ---------- */
(function(){const b=ZN('Streichelzoo');gehege(b,14,ZW(0xdde6a8,0xe8ecee),Math.PI,56);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  [[-4,-3],[2,-6],[5,3],[-2,5]].forEach((p,i)=>tier(ziege,b.x+p[0],b.z+p[1],b.x,b.z,.95-i*.05,.6));tier(schaf,b.x+6,b.z-4,b.x,b.z,.8,.8);tier(schaf,b.x-6,b.z+3,b.x,b.z,.7,.7);
  [[-8,6],[-9.5,7.5],[-7,8]].forEach(p=>tier(hase,b.x+p[0],b.z+p[1],b.x,b.z,.8,.3));
  const hh=stall(b.x+7,b.z-8,4.6,3.2,2.2,0xc98a4b,0x4aa84e,0,'Streicheln erlaubt');
  ballen(b.x-3,b.z-9,.3);trog(b.x-2,b.z+9,0);
  const au=grp(b.x+9,0,b.z+4);box(.9,1.7,.7,0x3b8fc4,0,.85,0,au,true);box(1,.2,.8,0xf59e3f,0,1.8,0,au);box(.5,.5,.05,0xfff8e6,0,1.15,.37,au);sph(.38,0xcfeaf5,0,2.2,0,au);sph(.3,0xe8c850,0,2.1,0,au,1,.7,1);const fs=schildText('Futter','#fff0b0',1,.4,36);fs.position.set(0,.55,.4);au.add(fs);kreis(b.x+9,b.z+4,.8);
  wegweiser(b.x-17,b.z+3,'Streichelzoo',Math.PI/2)})();
/* ---------- 6. Pferdekoppel mit Reithalle ---------- */
(function(){const b=ZN('Pferdekoppel');gehege(b,26,ZW(0x8ccb68,0xe4ecf2),0,86);zugang(b,35);
  scheibe(b.x+8,b.z+8,9,ZW(0xe3d3a6,0xe9e6dc),.16);
  const rh=grp(b.x-15,0,b.z-14);[[-4.5,-3],[4.5,-3],[-4.5,3],[4.5,3]].forEach(p=>cyl(.2,3.6,0x7a5230,p[0],1.8,p[1],rh,true));box(10,.25,7.4,0x8a3a30,0,3.7,0,rh,true).rotation.x=.12;box(9,.2,.3,0x6a4220,0,1.2,-3,rh);box(9,.2,.3,0x6a4220,0,.6,-3,rh);box(.3,.2,6,0x6a4220,-4.5,.9,0,rh);const hs=schildText('Reithalle','#fff8e6',3.6,.9,44);hs.position.set(0,2.75,3.5);rh.add(hs);box(9.4,.2,.2,0x6a4220,0,3.4,3.5,rh);kreis(b.x-15,b.z-14,5.2);
  tier(pferd,b.x-5,b.z+3,b.x,b.z,1,1.8);tier(pferd,b.x+4,b.z-8,b.x,b.z,.95,1.7);const p3=tier(pferd,b.x-13,b.z+10,b.x,b.z,.9,1.6);tier(pferd,b.x+14,b.z-10,b.x,b.z,.55,1);
  [[-1,1],[1,1]].forEach(p=>{const x=b.x+3+p[0]*2.2,z=b.z+9;cyl(.1,1.6,0xf6f2ea,x,.8,z,scene,true)});box(4.4,.14,.14,0xe0302a,b.x+3,1.5,b.z+9,scene);box(4.4,.14,.14,0xf6f2ea,b.x+3,1.0,b.z+9,scene);kreis(b.x+3,b.z+9,.5);
  trog(b.x-3,b.z+16,.2);ballen(b.x-20,b.z+4,.7);ballen(b.x-22,b.z+1,.2);
  wegweiser(b.x+29,b.z+3,'Pferde',-Math.PI/2)})();
/* ---------- 7. Schafweide mit Schäferwagen ---------- */
(function(){const b=ZN('Schafweide');gehege(b,26,ZW(0x9ed47a,0xe8f0f6),Math.PI,86);zugang(b,35);
  [[-8,-6,1],[-2,-12,.9],[6,-4,1],[10,6,.95],[-10,8,1],[0,8,.9],[4,-14,1.05]].forEach((p,i)=>tier(schaf,b.x+p[0],b.z+p[1],b.x,b.z,p[2],1));[[-6,-8],[8,0],[-3,12]].forEach(p=>tier(schaf,b.x+p[0],b.z+p[1],b.x,b.z,.55,.6));
  tier(hund,b.x+12,b.z+12,b.x,b.z,.9,.8);
  const sw=grp(b.x+14,0,b.z-14);box(4,2.4,2.4,0x3b6fc4,0,1.9,0,sw,true);const dach=cyl(1.2,4.2,0xf6f2ea,0,3.1,0,sw,true);dach.rotation.z=Math.PI/2;[-1,1].forEach(s=>{const w=cyl(.7,.2,0x8a5a32,-1.3,.7,s*1.45,sw,true);w.rotation.x=Math.PI/2});box(.8,1.2,.1,0xf2c230,1,1.6,1.25,sw);cyl(.06,1,0x3a3a3a,2.4,1,0,sw).rotation.z=1.2;kreis(b.x+14,b.z-14,2.8);
  trog(b.x-3,b.z+16,0);const bk=grp(b.x-16,0,b.z-10);cyl(.3,2.6,0x7a5230,0,1.3,0,bk,true);sph(1,ZW(0x6aa84a,0xdce8ec),0,3.2,0,bk,2.6,.6,2.6).castShadow=true;kreis(b.x-16,b.z-10,.5);
  wegweiser(b.x-29,b.z+3,'Schafweide',Math.PI/2)})();
/* ---------- 8. Entenweiher mit Schilf und Steg ---------- */
(function(){const b=ZN('Entenweiher');scheibe(b.x,b.z,19,ZW(0xa8d68a,0xe8eef2),.1);zugang(b,0,0);
  wasserFl(b.x,b.z,10,WASSER);wasserFl(b.x-1,b.z+1,6.5,WINTER?0xe6f6ff:0x6ec0ea,.02);kreis(b.x,b.z,9.5);
  for(let i=0;i<20;i++){const a=i/20*6.283;if(Math.cos(a)>0&&Math.abs(Math.sin(a)*10.4)<2.2)continue;felsen(b.x+Math.cos(a)*10.4,b.z+Math.sin(a)*10.4,.45+rnd()*.3)}
  const st=[],sp=[];for(let i=0;i<34;i++){const a=2.3+rnd()*3.2,rr=9.2+rnd()*1.8,h=1.6+rnd()*1;st.push([b.x+Math.cos(a)*rr,h/2,b.z+Math.sin(a)*rr,.05,h,.05]);sp.push([b.x+Math.cos(a)*rr,h,b.z+Math.sin(a)*rr,.1,.3,.1])}
  instanziert(gCyl,0x8a9a4a,st);instanziert(gCyl,0x6a3a22,sp);
  const stg=grp(b.x+10,0,b.z);box(9,.2,1.8,0x8a5a32,-1.5,.45,0,stg,true);[-5,-2,1,4].forEach(x=>[-1,1].forEach(s=>cyl(.1,.7,0x6a4220,x-1,.2,s*.8,stg)));  if(!WINTER){[[-3,5],[2,6],[-6,2],[4,-5]].forEach((p,i)=>{sph(.7,0x3f9a46,b.x+p[0],.22,b.z+p[1],scene,1,.1,1);sph(.2,0xf8a8c8,b.x+p[0]+.1,.3,b.z+p[1],scene,1,.6,1)})}
  const bt=grp(b.x+5,0,b.z+5.5);sph(1,0x3b6fc4,0,.32,0,bt,1.7,.4,.7).castShadow=true;box(1.6,.08,.9,0xe8c28a,0,.5,0,bt);box(.1,.4,1.3,0xf6f2ea,0,.7,0,bt);[-1,1].forEach(q=>box(2.5,.3,.1,0x3b6fc4,0,.55,q*.48,bt));box(.1,.3,1,0x3b6fc4,-1.25,.55,0,bt);cone(.5,.9,0x3b6fc4,1.35,.5,0,bt).rotation.z=-Math.PI/2;bt.rotation.y=.5;
  [[-3,-2],[2,3],[4,-4],[-6,3],[0,-6]].forEach((p,i)=>{const e=tier(ente,b.x+p[0],b.z+p[1],b.x,b.z,1.1-(i%2)*.15);e.position.y=.2});
  bank(b.x-8,b.z-13,0);wegweiser(b.x+15,b.z-8,'Entenweiher',-Math.PI/2)})();
/* ---------- 9. Windmühle mit Getreidefeld ---------- */
(function(){const b=ZN('Windmühle');scheibe(b.x,b.z,19,ZW(0xc9d88a,0xe6ecef),.1);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const m=grp(b.x+9,0,b.z-5);cyl(2.7,4,0xf4ead2,0,2,0,m,true);cyl(2.2,3,0xeadfc2,0,5.5,0,m,true);cone(2.8,2.6,0xb94a3a,0,8.2,0,m,true);box(1.2,2.2,.2,0x6a4220,2.7,1.1,0,m).rotation.y=Math.PI/2;[-1,1].forEach(s=>box(.5,.7,.2,0x6a8ab8,2.15,5.5,s*.9,m).rotation.y=Math.PI/2);
  kreis(b.x+9,b.z-5,3.2);
  const mh=grp(b.x+9,6.8,b.z-5+2.9);mh.rotation.y=-Math.PI/2;const sa=grp(0,0,0,mh);sph(.45,0x7a5230,0,0,0,sa);box(.2,8,.4,0x8a5a32,0,0,0,sa);box(.2,.4,8,0x8a5a32,0,0,0,sa);[[2.8,1.15],[-2.8,-1.15]].forEach(p=>box(.08,3.2,2,0xf6f2e6,-.1,p[0],p[1],sa));[[1.15,-2.8],[-1.15,2.8]].forEach(p=>box(.08,2,3.2,0xf6f2e6,-.1,p[0],p[1],sa));bewegt(sa,t=>{sa.rotation.x=t*.45});
  scheibe(b.x-4,b.z+4,8.6,ZW(0xb59a62,0xdfe3e6),.14);
  if(!WINTER){const st=[],kp=[];for(let i=0;i<13;i++)for(let j=0;j<11;j++){const x=b.x-10+i*.75+(rnd()-.5)*.3,z=b.z+0+j*.75+(rnd()-.5)*.3;if(Math.hypot(x-(b.x-4),z-(b.z+4))<8){st.push([x,.7,z,.05,1.4,.05]);kp.push([x,1.55,z,.14,.5,.14])}}instanziert(gCyl,0xd9b84a,st);instanziert(gCyl,0xe6c65a,kp)}
  else{for(let i=0;i<6;i++)box(10,.12,.5,0x8a7a62,b.x-4,.2,b.z+.6+i*1.3,scene).rotation.y=0}
  const sk=grp(b.x+5,0,b.z+8);for(let i=0;i<3;i++){sph(.5,0xe8d9b0,-.6+i*.7,.55,0,sk,1,1.2,.9);cone(.2,.35,0xe8d9b0,-.6+i*.7,1.3,0,sk);cyl(.12,.1,0x8a5a32,-.6+i*.7,1.12,0,sk)}sph(.5,0xe8d9b0,0,1.4,0,sk,1,1.1,.9);cone(.2,.35,0xe8d9b0,0,2.15,0,sk);cyl(.12,.1,0x8a5a32,0,1.97,0,sk);kreis(b.x+5,b.z+8,1.4);
  wegweiser(b.x-17,b.z+3,'Windmühle',Math.PI/2)})();
/* ---------- 10. Gemüsegarten mit Gewächshaus und Vogelscheuche ---------- */
(function(){const b=ZN('Gemüsegarten');scheibe(b.x,b.z,19,ZW(0xa9d386,0xe8f0f4),.1);zaun(b.x,b.z,19,60,0);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const sal=[],koh=[],mohr=[],tom=[],sta=[];
  for(let r=0;r<3;r++)for(let c=0;c<2;c++){const x=b.x-12+c*8.5,z=b.z-9+r*4.2;box(7.6,.4,2.4,ZW(0x6b4a2f,0xdad4cc),x,.2,z,scene);
    if(!WINTER){for(let i=0;i<6;i++){const px=x-3+i*1.2;if((r+c)%3===0)sal.push([px,.65,z,.5,.4,.5]);else if((r+c)%3===1)koh.push([px,.7,z,.55,.5,.55]);else mohr.push([px,.55,z,.28,.3,.28])}}}
  if(!WINTER){const z=b.z+6;box(8,.3,1.4,ZW(0x6b4a2f,0xdad4cc),b.x+5,.15,z,scene);for(let i=0;i<5;i++){const x=b.x+2+i*1.5;sal.push([x,.8,z,.5,.5,.45]);sal.push([x,1.6,z,.4,.4,.4]);sta.push([x,1.2,z,.05,2.4,.05]);tom.push([x,1.6,z+.15,.2,.2,.2]);tom.push([x+.1,.9,z-.15,.18,.18,.18])}}
  instanziert(gSph,0x6cc04a,sal);instanziert(gSph,0x8a5aa8,koh);instanziert(gCone,0xe8832a,mohr);instanziert(gCyl,0x7a5230,sta);instanziert(gSph,0xe0302a,tom);
  const gh=grp(b.x+6,0,b.z-8);box(7,.5,5,0xb8bec4,0,.25,0,gh);[[-3,-2],[3,-2],[-3,2],[3,2]].forEach(p=>cyl(.1,2.6,0xf6f2ea,p[0],1.5,p[1],gh,true));glas(7,2.6,.1,0,1.8,-2.5,gh);glas(7,2.6,.1,0,1.8,2.5,gh);glas(.1,2.6,5,-3.5,1.8,0,gh);glas(.1,2.6,5,3.5,1.8,0,gh);[-1,1].forEach(s=>{const r=glas(7,.1,3,0,3.4,s*1.3,gh);r.rotation.x=-s*.45});box(7.2,.14,.14,0xf6f2ea,0,4.05,0,gh);
  [[-2,0],[0,0],[2,0]].forEach(p=>{box(1.2,.5,3,0x6b4a2f,p[0],.6,p[1],gh);sph(.5,0x4caf6a,p[0],1.2,p[1]-.8,gh);sph(.45,0xe0302a,p[0],1.1,p[1]+.8,gh,1,.8,1)});kreis(b.x+6,b.z-8,4.2);
  vogelscheuche(b.x-4,b.z+12);tonne(b.x+14,b.z+9);const gk=grp(b.x+13,0,b.z+7);cyl(.3,.5,0x3b8fc4,0,.25,0,gk);box(.8,.06,.06,0x3b8fc4,.5,.5,0,gk);
  wegweiser(b.x+17,b.z+12,'Gemüse',-Math.PI/2)})();
/* ---------- 11. Obstgarten ---------- */
(function(){const b=BEREICHE.obstgarten;scheibe(b.x,b.z,19,ZW(0xa4d880,0xe6eef4),.1);zaun(b.x,b.z,19,60,Math.PI);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const ap=[],fall=[];const T=[[-9,-9],[0,-11],[9,-8],[-12,0],[11,2],[-8,9],[2,8],[10,12]];
  T.forEach((p,i)=>{const x=b.x+p[0],z=b.z+p[1];const t=grp(x,0,z);cyl(.3,2.2,0x7a5230,0,1.1,0,t,true);
    if(WINTER){sph(1,0xdfe6ea,0,3.1,0,t,2.2,1.2,2.2);sph(1,0xcdd6dc,1,2.7,.4,t,1.2,.7,1.2)}else{sph(1,0x5cb04a,0,3.1,0,t,2.4,1.8,2.4).castShadow=true;sph(1,0x4a9a3e,1.2,2.8,.5,t,1.4,1.2,1.4);for(let k=0;k<7;k++){const a=k*.9+i;ap.push([x+Math.cos(a)*(1.5+(k%3)*.4),2.8+(k%4)*.35,z+Math.sin(a)*(1.5+(k%3)*.4),.2,.2,.2])}}
    kreis(x,z,.9)});
  if(!WINTER){for(let i=0;i<8;i++)fall.push([b.x+(rnd()-.5)*26,.15,b.z+(rnd()-.5)*26,.18,.18,.18])}
  instanziert(gSph,0xe0302a,ap);instanziert(gSph,0xc9302a,fall);
  const le=grp(b.x-9,0,b.z-5);[-.4,.4].forEach(s=>box(.1,4,.1,0xa8743f,s,2,0,le).rotation.z=0);for(let i=0;i<7;i++)box(.8,.07,.1,0xa8743f,0,.5+i*.55,0,le);le.rotation.z=-.22;le.rotation.y=.4;kreis(b.x-9,b.z-5,.8);
  [[-4,12],[3,-4],[6,5]].forEach((p,i)=>{const k=grp(b.x+p[0],0,b.z+p[1]);cyl(.55,.7,0xc9a46a,0,.35,0,k,true);cyl(.45,.1,0x4a3220,0,.72,0,k);if(!WINTER)for(let j=0;j<5;j++)sph(.2,0xe0302a,Math.cos(j*1.3)*.25,.8,Math.sin(j*1.3)*.25,k);kreis(b.x+p[0],b.z+p[1],.7)});
  const bs=grp(b.x+8,0,b.z-12);box(2.6,.15,1,0x9a5a30,0,.7,0,bs,true);box(2.6,.7,.1,0x9a5a30,0,1.1,-.45,bs);box(.12,.7,.9,0x6a4220,-1,.35,0,bs);box(.12,.7,.9,0x6a4220,1,.35,0,bs);kreis(b.x+8,b.z-12,1.4);
  wegweiser(b.x-17,b.z+3,'Obstgarten',Math.PI/2)})();
/* ---------- 12. Kürbisfeld ---------- */
(function(){const b=ZN('Kürbisfeld');scheibe(b.x,b.z,22,ZW(0xb08a5a,0xe3e7ea),.1);zaun(b.x,b.z,22,72,0);zugang(b,-35);
  const k1=[],k2=[],k3=[],ranke=[],stiel=[];const n=WINTER?10:46;
  for(let i=0;i<n;i++){const a=rnd()*6.283,rr=6+rnd()*13,x=b.x+Math.cos(a)*rr,z=b.z+Math.sin(a)*rr,s=.45+rnd()*.5;if(Math.hypot(x-(b.x-13),z-(b.z+9))<5)continue;const L=i%7===0?k3:i%2?k1:k2;L.push([x,s*.7,z,s,s*.75,s]);if(!WINTER){stiel.push([x,s*1.35,z,.07,.25,.07]);ranke.push([x+.6,.08,z-.3,.9,.1,.5])}}
  instanziert(gSph,0xf2882a,k1);instanziert(gSph,0xe0701c,k2);instanziert(gSph,0x6aa84a,k3);instanziert(gCyl,0x5a7a2a,stiel);instanziert(gSph,0x4aa84e,ranke);
  sph(1.9,0xf2882a,b.x+2,1.4,b.z-2,scene,1,.75,1).castShadow=true;cyl(.18,.7,0x5a7a2a,b.x+2,2.9,b.z-2,scene);kreis(b.x+2,b.z-2,2.1);
  const st=grp(b.x-13,0,b.z+9);box(4.2,.2,1.6,0x8a5a32,0,1.1,0,st,true);[-1,1].forEach(s=>box(.2,1.1,1.4,0x6a4220,s*1.9,.55,0,st));[[-1.2,1.3],[0,1.3],[1.2,1.3]].forEach(p=>sph(.42,0xf2882a,p[0],1.55,0,st,1,.8,1));[-1.9,1.9].forEach(x=>cyl(.07,2.8,0x6a4220,x,1.4,.7,st,true));box(4.4,.12,1.8,0xe0605a,0,2.8,.2,st).rotation.x=.12;schild('Kürbisse',0,2.3,.95,3,.7,40,'#fff0b0',0,st);kreis(b.x-13,b.z+9,2.4);
  const sk=grp(b.x+13,0,b.z-12);sk.scale.setScalar(1.6);box(.9,.4,1.2,0x8a5a32,0,.6,0,sk,true);cyl(.35,.12,0x3a3a3a,0,.35,.9,sk).rotation.x=Math.PI/2;[-1,1].forEach(q=>{cyl(.04,1.3,0x8a5a32,q*.4,.75,-.8,sk).rotation.x=1.2});sph(.3,0xf2882a,0,.95,0,sk,1.3,.8,1);kreis(b.x+13,b.z-12,1.8);
  ballen(b.x+14,b.z+8,.6);wegweiser(b.x+25,b.z+2,'Kürbisfeld',Math.PI/2)})();
/* ---------- 13. Imkerei mit Blumenwiese ---------- */
(function(){const b=ZN('Imkerei');scheibe(b.x,b.z,22,ZW(0xa8d878,0xe6eef4),.1);zaun(b.x,b.z,22,72,Math.PI);zugang(b,-35);
  [[-8,-6],[-2,-9],[5,-6],[-5,-1],[3,-1]].forEach((p,i)=>{const x=b.x+p[0],z=b.z+p[1];const h=grp(x,0,z);[-1,1].forEach(s=>box(.1,.5,.8,0x6a4220,s*.45,.25,0,h));for(let k=0;k<3;k++)box(1,.4,.9,k%2?0xf2d56a:0xf6f2e6,0,.7+k*.4,0,h,true);box(1.2,.12,1.1,ZW(0x8a949c,0xf6f6f6),0,1.95,0,h);box(.6,.06,.1,0x2a2a2a,0,.62,.46,h);kreis(x,z,.8)});
  if(!WINTER){const sf=[],bl=[[],[],[],[]];for(let i=0;i<110;i++){const a=rnd()*6.283,rr=4+rnd()*15,x=b.x+Math.cos(a)*rr,z=b.z+Math.sin(a)*rr+4;if(Math.hypot(x-b.x,z-b.z)>20)continue;sf.push([x,.3,z,.03,.6,.03]);bl[i%4].push([x,.65,z,.14,.1,.14])}
    instanziert(gCyl,0x3f9a46,sf);instanziert(gSph,0xe0605a,bl[0]);instanziert(gSph,0xffd45e,bl[1]);instanziert(gSph,0xb06ae0,bl[2]);instanziert(gSph,0xffffff,bl[3]);
    for(let i=0;i<7;i++)biene(b.x-4+i*1.5,b.z-4,1.5+i*.3,i*1.1);for(let i=0;i<3;i++)flatter(b.x,b.z,b.x+2,b.z+8,6+i*2,[0xe8588a,0xffd45e,0x6ab0e8][i],i*2.1)}
  const bh=grp(b.x+12,0,b.z-10);box(2,2.6,.8,0x8a5a32,0,1.3,0,bh,true);for(let i=0;i<6;i++)for(let j=0;j<4;j++)cyl(.07,.1,0x2a1d14,-.7+i*.28,.4+j*.55,.41,bh).rotation.x=Math.PI/2;box(2.4,.15,1.1,0x6a3a2a,0,2.7,0,bh);kreis(b.x+12,b.z-10,1.4);
  const ho=stall(b.x-13,b.z+11,5,3.4,2.4,0xf2d56a,0x8a5a32,0,'Honig');for(let i=0;i<4;i++)cyl(.22,.4,0xe8a02a,b.x-15+i*.7,.5,b.z+14.2,scene,true);
  wegweiser(b.x-25,b.z+2,'Imkerei',-Math.PI/2)})();
/* ---------- 14. Scheune mit Heuballen und Silo ---------- */
(function(){const b=ZN('Scheune');scheibe(b.x,b.z,20,ZW(0xd8c89a,0xe9e6de),.1);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const sc=stall(b.x-3,b.z-8,12,8,5,0xb83a2e,0x6a3a2a,0,'Scheune');wetterhahn(scene,b.x-3,9.2,b.z-8);
  const si=grp(b.x+11,0,b.z-9);cyl(2.2,9,0xc5ccd2,0,4.5,0,si,true);[2,4.5,7].forEach(y=>cyl(2.3,.2,0x8a949c,0,y,0,si));sph(2.2,0xb83a2e,0,9,0,si,1,.6,1);cyl(.1,9,0x6a4220,2.3,4.5,0,si);for(let i=0;i<10;i++)box(.1,.1,.8,0x6a4220,2.3,.6+i*.85,0,si);kreis(b.x+11,b.z-9,2.5);
  [[8,3],[10,4.5],[12,3.5]].forEach(p=>ballen(b.x+p[0],b.z+p[1],.3));ballen(b.x+10,b.z+3.8,1.6);
  stroh(b.x-13,b.z+3,.4,null,.5);stroh(b.x-13,b.z+3.2,.4,null,1.5);kreis(b.x-13,b.z+3,1.3);
  const hs=grp(b.x-10,0,b.z+8);for(let i=0;i<3;i++)for(let j=0;j<4-i;j++)cyl(.3,2,0x8a5a32,0,.3+i*.5,-1.2+j*.65+i*.32,hs,true).rotation.z=Math.PI/2;kreis(b.x-10,b.z+8,1.6);
  const k=tier(katze,b.x+9,b.z+4.2,b.x,b.z,1);k.position.y=1.1;
  wegweiser(b.x+16,b.z+5,'Scheune',-Math.PI/2)})();
/* ---------- 15. Traktorschuppen mit Maschinen ---------- */
(function(){const b=ZN('Traktoren');scheibe(b.x,b.z,20,ZW(0xc9c0a8,0xe6e6e6),.1);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const sh=grp(b.x+4,0,b.z-12);[[-4.5,-2.5],[4.5,-2.5],[-4.5,2.5],[4.5,2.5]].forEach(p=>cyl(.22,3.8,0x6a4220,p[0],1.9,p[1],sh,true));box(10.6,.25,6.4,0x5a6a7a,0,3.9,0,sh,true).rotation.x=.1;box(10,3.6,.2,0x8a5a32,0,1.8,-2.6,sh);const ps=schildText('Traktoren','#fff8e6',4,.9,44);ps.position.set(0,4.5,3.3);sh.add(ps);
  const t1=traktor(sh,true);t1.position.set(-1.5,0,0);t1.rotation.y=.3;kreis(b.x+4,b.z-12,5);
  maehdrescher(b.x-12,b.z-10,.5);const an=anhaenger(scene);an.position.set(b.x+14,0,b.z-2);an.rotation.y=.4;kreis(b.x+14,b.z-2,1.8);
  [[14,8],[15.2,9.4]].forEach(p=>{cyl(.5,1.1,0x3b6fc4,b.x+p[0],.55,b.z+p[1],scene,true);cyl(.52,.1,0x2a4a7a,b.x+p[0],1.1,b.z+p[1],scene);kreis(b.x+p[0],b.z+p[1],.6)});
  for(let i=0;i<4;i++){const r=cyl(.7,.4,0x2a2a2a,b.x-14,.2+i*.4,b.z+8,scene,true)}kreis(b.x-14,b.z+8,.9);
  const tr=traktor(scene),ah=anhaenger(tr);ah.position.set(-3.6,0,0);const cx=b.x-1,cz=b.z+4;
  lebendig.push({o:{userData:{anim:t=>{const a=t*.32;const x=cx+Math.cos(a)*11,z=cz+Math.sin(a)*6.5,vx=-Math.sin(a)*11,vz=Math.cos(a)*6.5;tr.position.set(x,0,z);tr.rotation.y=Math.atan2(-vz,vx);tr.visible=Math.hypot(x-spieler.position.x,z-spieler.position.z)<95;if(tr.visible)tr.userData.anim(t)}}},ph:0});
  wegweiser(b.x-17,b.z+3,'Traktoren',Math.PI/2)})();
/* ---------- 16. Spielplatz mit Strohballen-Burg ---------- */
(function(){const b=ZN('Spielplatz');scheibe(b.x,b.z,13,ZW(0xe8d8a8,0xece8e0),.12);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const bu=grp(b.x-5,0,b.z-2);[[-2.4,-2.4],[2.4,-2.4],[2.4,2.4],[-2.4,2.4]].forEach((p,i)=>{stroh(p[0],p[1],i*.8,bu,.5,i%2);stroh(p[0],p[1],i*.8+.5,bu,1.5,!(i%2));stroh(p[0],p[1],i*.8,bu,2.5,i%2)});[[0,-2.6,0],[0,2.6,0],[-2.6,0,1.57],[2.6,0,1.57]].forEach((p,i)=>{if(i!==1){stroh(p[0],p[1],p[2],bu,.5,true);stroh(p[0],p[1],p[2],bu,1.5,false)}});
  cyl(.06,2.2,0x6a4220,-2.4,3.6,-2.4,bu);box(1,.6,.06,0xe0302a,-1.9,4.4,-2.4,bu);kreis(b.x-5,b.z-2,3.6);
  const sc=grp(b.x+5,0,b.z-6);[-1,1].forEach(x=>cyl(.1,3.4,0x3a4a56,x*2.4,1.7,0,sc,true));cyl(.08,5,0x3a4a56,0,3.4,0,sc).rotation.z=Math.PI/2;
  const sitze=[-1,1].map(x=>{const p=grp(x*1,3.4,0,sc);cyl(.03,2,0x666666,-.5,-1,0,p);cyl(.03,2,0x666666,.5,-1,0,p);box(1.2,.12,.5,x>0?0xe0605a:0x4caf6a,0,-2,0,p,true);return p});
  bewegt(sitze[0],t=>{sitze[0].rotation.z=Math.sin(t*1.6)*.35;sitze[1].rotation.z=Math.sin(t*1.6+1.5)*.35});sitze[1].userData.keep=1;kreis(b.x+5-2.4,b.z-6,.4);kreis(b.x+5+2.4,b.z-6,.4);
  const wi=grp(b.x+6,0,b.z+5);box(.7,.8,1,0x8a8a8a,0,.4,0,wi,true);const pl=grp(0,.9,0,wi);box(4.6,.15,.5,0xf5d442,0,0,0,pl,true);[-1,1].forEach(q=>{box(.1,.5,.1,0x333333,q*1.7,.3,0,pl);box(.5,.12,.45,0xe0605a,q*2,.14,0,pl)});bewegt(pl,t=>{pl.rotation.z=Math.sin(t*1.3)*.18});kreis(b.x+6,b.z+5,.6);
  const sk=grp(b.x-6,0,b.z+7);box(4,.4,.3,0x8b5a2b,0,.2,2,sk);box(4,.4,.3,0x8b5a2b,0,.2,-2,sk);box(.3,.4,4,0x8b5a2b,2,.2,0,sk);box(.3,.4,4,0x8b5a2b,-2,.2,0,sk);box(3.7,.3,3.7,0xf0d890,0,.15,0,sk);sph(.35,0xe0605a,.6,.45,.4,sk,1,.8,1);kreis(b.x-6,b.z+7,2.8);
  wegweiser(6,b.z+4,'← Spielplatz',0)})();
/* ---------- 17. Picknickplatz ---------- */
(function(){const b=ZN('Picknick');scheibe(b.x,b.z,13,ZW(0xdcecc0,0xe8eef0),.12);pfad(b.x,b.z,wegX(b.z),b.z,3.5);
  const bl=grp(b.x-5,0,b.z+3);[-1.3,0,1.3].forEach(x=>{box(.5,.07,4,0xffffff,x,.1,0,bl);box(4,.07,.5,0xffffff,0,.11,x,bl)});box(4,.06,4,0xe0605a,0,.1,0,bl);
  const ko=grp(b.x-5,0,b.z+3);cyl(.5,.5,0xc9a46a,0,.4,0,ko,true);sph(.2,0xe0302a,.2,.75,0,ko);box(.8,.1,.5,0xf6f2ea,0,.12,1.2,ko);kreis(b.x-5,b.z+3,1.2);
  [[3,6],[7,-3]].forEach((p,i)=>{const g=grp(b.x+p[0],0,b.z+p[1]);box(2.4,.12,1.2,0xa8743f,0,.9,0,g,true);[-1,1].forEach(s=>box(.12,.9,.9,0x6a4220,s*1,.45,0,g));box(2.4,.1,.5,0x9a5a30,0,.5,.95,g);box(2.4,.1,.5,0x9a5a30,0,.5,-.95,g);cyl(.06,2.8,0x6a4220,0,1.4,0,g);cone(1.6,.6,i%2?0xe0605a:0x3b8fc4,0,2.9,0,g,true);kreis(b.x+p[0],b.z+p[1],1.8)});
  const ca=stall(b.x-4,b.z-8,5.4,3.6,2.4,0xf5d442,0xe0605a,0,'Hofcafé');rauch(scene,b.x-2,4,b.z-8.5);box(.6,1.4,.6,0xa8543a,b.x-2,3.1,b.z-8.5,scene);box(.8,.15,.8,0x6a3a2a,b.x-2,3.9,b.z-8.5,scene);
  const ob=grp(b.x+8,0,b.z+8);cyl(.3,2.4,0x7a5230,0,1.2,0,ob,true);sph(1,ZW(0x5cb04a,0xdfe6ea),0,3.3,0,ob,2,1.6,2).castShadow=true;kreis(b.x+8,b.z+8,.7);
  tonne(b.x+10,b.z-8);if(!WINTER)for(let i=0;i<3;i++)flatter(b.x,b.z,b.x+2,b.z+2,5+i*2,[0xffd45e,0xe8588a,0xffffff][i],i*2);
  wegweiser(-6,b.z+3.5,'Picknick →',0)})();
/* ---------- Ausgang (Tor wird geöffnet) ---------- */
ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{box(1.4,6,1.4,0x8a5a32,s*4.2,3,0,g,true);box(1.8,.5,1.8,0xf4ead2,s*4.2,6.2,0,g)});box(10.6,1,.7,0x6a8a3a,0,6.2,0,g,true);
  const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.2,.4);g.add(s);
  const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,0x8b5d2e,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,0xd8b878,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.34,0x6a4220,s*-1.9,1,0,p);box(3.8,.2,.34,0x6a4220,s*-1.9,2.8,0,p);return p});
  kreis(-4.2,TORZ,.9);kreis(4.2,TORZ,.9);return {g,fl,offen:0}})();
/* ---------- Festplatz: Erntefest ---------- */
(function(){const z0=FEST.z;const bue=grp(0,0,z0-12);box(16,1,6,0x8a5a32,0,.5,0,bue,true);box(16.4,.3,6.4,0xf6e4b8,0,1.05,0,bue);[-1,1].forEach(s=>{box(.5,7,.5,0x6a4220,s*8,3.5,-2.6,bue,true)});box(16.6,1.2,.5,0xd8a32a,0,7,-2.6,bue);
  const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.2,-2.4);bue.add(gs);kreis(0,z0-12,9);
  const kr=new THREE.Mesh(new THREE.TorusGeometry(2.2,.4,8,24),mat(0xd8a32a));kr.position.set(0,5,-2.2);bue.add(kr);const kf=[0xe0302a,0xf2882a,0xffd45e,0x4caf6a,0xb06ae0,0xe0302a,0xf2882a,0xffd45e];for(let i=0;i<8;i++){const a=i/8*6.283;sph(.35,kf[i],Math.cos(a)*2.2,5+Math.sin(a)*2.2,-2.0,bue)}box(11,5.6,.2,0x8a5a32,0,3.8,-2.55,bue);
  [-6.5,6.5].forEach(x=>{for(let i=0;i<5;i++)cone(.35,2,0xe6c65a,x+(i-2)*.35,2.1,-1,bue)});
  const farben=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4,0xf59e3f];for(let i=0;i<24;i++){const t=i/23;const x=-14+t*28,y=6.4-Math.sin(t*Math.PI)*2.2;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:farben[i%5]}));l.position.set(x,y,z0-8);l.scale.setScalar(.28);scene.add(l)}
  [-14,14].forEach(x=>{cyl(.15,7,0x6a4220,x,3.5,z0-8,scene,true)});
  const fa=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4];for(let i=0;i<14;i++){const t=i/13;const c=cone(.4,.8,fa[i%4],-12+t*24,6.2-Math.sin(t*Math.PI)*1.8-.5,z0-8,scene);c.rotation.z=Math.PI}
  [[-11,-4],[11,-4],[-13,-12],[13,-12],[-9,4],[9,4]].forEach((p,i)=>{ballen(p[0],z0+p[1],i);ballen(p[0]+(i%2?-1.4:1.4),z0+p[1]+.3,i+1)});stroh(-12,z0+8,.2,null,.5,true);stroh(-12,z0+8,.2,null,1.5,false);kreis(-12,z0+8,1.3);
  const et=grp(14,0,z0+6);box(5,.2,1.8,0x8a5a32,0,1,0,et,true);[-2,2].forEach(x=>box(.2,1,1.6,0x6a4220,x,.5,0,et));[[-1.8,0xe0302a],[-.9,0xf2882a],[0,0xffd45e],[.9,0x8ac24a],[1.8,0xb06ae0]].forEach(p=>sph(.35,p[1],p[0],1.4,0,et));kreis(14,z0+6,2.8);
  const ku=grp(-14,0,z0+6);[[0,0],[.9,0],[.45,.7]].forEach(p=>sph(.5,0xf2882a,p[0],.5,p[1]-0,ku,1,.75,1));sph(.7,0xf2882a,2,.5,.3,ku,1,.75,1);kreis(-14,z0+6,2)})();
/* ---------- Schmuck am Hauptweg ---------- */
(function(){let n=0;for(let z=GRENZE.z1-12;z>TORZ+4;z-=16){let nah=false;if(Math.abs(z-92)<17)nah=true;for(const e of EXTRAZONEN){if(Math.abs(e.x)<50&&Math.abs(z-e.z)<e.r+3)nah=true}for(const w of SEITENWEGE){if(Math.abs(z-w)<9)nah=true}if(nah)continue;
  const side=(n%2?1:-1),f=SCHMUCK[n%SCHMUCK.length];f===bank?bank(wegX(z)+side*5.2,z,side>0?-Math.PI/2:Math.PI/2):f(wegX(z)+side*5.2,z);n++}})();
/* ---------- Besucher ---------- */
(function(){const jc=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0xe0605a,0x9b6fd0,0x4caf6a],hc=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a,0xe8c24a,0x2a1d14,0xb5651d,0x6b4626],st=['kurz','zoepfe','cap','pferd','kurz','zoepfe','cap','pferd','kurz','zoepfe'];
  for(let i=0;i<18;i++){const f=besucherFigur(Object.assign({},AVATARE[(i+1)%AVATARE.length],{jacke:jc[i%10],haar:hc[(i*3)%10],stil:st[i%10]}));const p=BPTS[(i*2)%BPTS.length];f.g.position.set(p[0]+(rnd()-.5)*2,0,p[1]);f.ziel=BPTS[(i*3+1)%BPTS.length];f.v=1.8+rnd()*.8;besucher.push(f)}})();
/* ---------- 18. Bauernhaus mit Garten ---------- */
(function(){const b=ZN('Bauernhaus');gehege(b,22,ZW(0xa9d386,0xe8f0f4),-Math.PI/2,80);zugang(b,35);
  stall(b.x,b.z-8,7.6,6,3.4,0xf4ead0,0xa8432f,0,'Bauernhaus');
  box(.8,2.2,.8,0xa8543a,b.x+2.2,5.0,b.z-9.4,scene);box(1,.15,1,0x6a3a2a,b.x+2.2,6.15,b.z-9.4,scene);rauch(scene,b.x+2.2,6.3,b.z-9.4);[-1.8,1.8].forEach(x=>{box(1.1,.9,.08,0xffffff,b.x+x,1.7,b.z-11.04,scene);box(.95,.75,.1,0xcfeaf5,b.x+x,1.7,b.z-11.06,scene)});box(.95,1.7,.1,0x7a5230,b.x,.85,b.z-11.05,scene);
  box(5.6,.2,2.4,0x9a6a3a,b.x,.1,b.z-3.8,scene);box(5.6,.15,2.4,0x8a5a32,b.x,2.2,b.z-3.8,scene);[-2.6,2.6].forEach(x=>cyl(.1,2.1,0x7a5230,b.x+x,1.1,b.z-2.8,scene,true));
  bank(b.x-1.8,b.z-3.8,0);
  const bk=grp(b.x+6.5,0,b.z-1);cyl(.07,1.2,0x7a5230,0,.6,0,bk,true);box(.5,.35,.3,0xffd45e,0,1.35,0,bk);box(.05,.25,.05,0xe0302a,.28,1.6,0,bk);kreis(b.x+6.5,b.z-1,.4);
  [[-4,2],[4,2]].forEach(p=>{box(4,.4,1,ZW(0x6b4a2f,0xdad4cc),b.x+p[0],.2,b.z+p[1],scene);box(3.8,.12,.8,0x4a8a3a,b.x+p[0],.45,b.z+p[1],scene);for(let i=0;i<10;i++)blume(b.x+p[0]-1.75+i*.39,b.z+p[1]+(i%2?.2:-.2),BLF[(i+(p[0]>0?2:0))%5])});
  tonne(b.x+5.2,b.z-9);
  const hh=grp(b.x-12,0,b.z-9);box(1.5,1,1.3,0x9a5a30,0,.5,0,hh,true);box(1.8,.12,1.6,0xb94a3a,0,1.15,0,hh).rotation.z=0;box(.5,.65,.06,0x2a1a10,0,.35,.66,hh);sperrKasten(b.x-12,b.z-9,1.6,1.4,0);
  tier(hund,b.x-12,b.z-6.5,b.x-12,b.z-12,.9,.6);
  const wl=grp(b.x-8,0,b.z+5);[-4,4].forEach(x=>cyl(.07,2.8,0x7a5230,x,1.4,0,wl,true));cyl(.02,8,0x3a3a3a,0,2.6,0,wl).rotation.z=Math.PI/2;
  const wc=[0xe0605a,0xf6f2ea,0x3b8fc4,0xffd45e,0x4caf6a],tu=wc.map((c,i)=>{const p=grp(-3+i*1.5,2.55,0,wl);box(.9,1.1,.05,c,0,-.55,0,p);p.userData.keep=1;return p});kreis(b.x-12,b.z+5,.3);kreis(b.x-4,b.z+5,.3);
  lebendig.push({o:{userData:{anim:t=>tu.forEach((p,i)=>{p.rotation.z=Math.sin(t*1.6+i)*.12;p.rotation.x=Math.sin(t*1.1+i*2)*.1})}},ph:0});
  const sf=[],sk=[],sm=[];for(let i=0;i<9;i++){const a=Math.PI*(.15+i*.09)+Math.PI,x=b.x+Math.cos(a)*18.5,z=b.z+Math.sin(a)*18.5;sf.push([x,1.1,z,.05,2.2,.05]);sk.push([x,2.3,z,.42,.42,.16]);sm.push([x,2.3,z+.1,.28,.28,.12])}
  instanziert(gCyl,0x4a8a3a,sf);instanziert(gSph,0xffc820,sk);instanziert(gSph,0x5a3a1a,sm);
  tier(huhn,b.x+9,b.z+8,b.x,b.z,.9,.4);tier(huhn,b.x+11,b.z+10,b.x,b.z,.8,.4);const k=tier(katze,b.x-1.8,b.z-3.8,b.x,b.z,1);k.position.y=.85;
  wegweiser(b.x+5,b.z-25,'Bauernhaus',0)})();
/* ---------- 19. Maislabyrinth mit Sonnenblumen ---------- */
(function(){const b=ZN('Maislabyrinth');gehege(b,24,ZW(0xdcc890,0xe8ecef),-Math.PI/2,84);zugang(b,-35);
  const M=['##### #####', '#   #     #', '# # ##### #', '# #     # #', '# ##### # #', '#     # # #', '####### # #', '#       # #', '# ####### #', '#         #', '###########'];
  const ox=b.x-16.5,oz=b.z-16.5,pl=[],cb=[],lf=[],tq=[];
  M.forEach((row,r)=>{let s=-1;for(let c=0;c<=11;c++){const w=c<11&&row[c]==='#';if(w&&s<0)s=c;if(!w&&s>=0){sperrKasten(ox+(s+c)*1.5,oz+r*3+1.5,(c-s)*3,3,0);s=-1}}
    for(let c=0;c<11;c++)if(row[c]==='#')[[-1,-1],[0,-1],[1,-1],[-1,0],[0,0],[1,0],[-1,1],[0,1],[1,1]].forEach((o,i)=>{const x=ox+c*3+1.5+o[0]*.95+(rnd()-.5)*.2,z=oz+r*3+1.5+o[1]*.95+(rnd()-.5)*.2;pl.push([x,1.7,z,.07,3.4,.07]);lf.push([x,1.1+(i%3)*.1,z,.95,.16,.28]);lf.push([x,2.0+(i%2)*.15,z,.28,.16,.95]);tq.push([x,3.5,z,.13,.55,.13]);cb.push([x+.2,1.9+(i%2)*.3,z,.14,.5,.14])})});
  instanziert(gCyl,0x7aa83a,pl);instanziert(gSph,0x4f9a2e,lf);instanziert(gCone,0xd8c060,tq);instanziert(gSph,0xf0d040,cb);
  const cx=ox+5*3+1.5,cz=oz+5*3+1.5;vogelscheuche(cx,cz-.8);bank(cx,cz+1.2,0);
  const sf=[],sk=[],sm=[];for(let i=0;i<22;i++){const a=i/22*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(a+Math.PI/2),Math.cos(a+Math.PI/2)))<.5)continue;const x=b.x+Math.cos(a)*20.5,z=b.z+Math.sin(a)*20.5;sf.push([x,1.2,z,.06,2.4,.06]);sk.push([x,2.5,z,.5,.5,.18]);sm.push([x,2.5,z+.12,.32,.32,.12])}
  instanziert(gCyl,0x4a8a3a,sf);instanziert(gSph,0xffc820,sk);instanziert(gSph,0x5a3a1a,sm);
  ballen(b.x-4,b.z-19,.2);ballen(b.x+4,b.z-19.4,.5);
  wegweiser(b.x+5,b.z-27,'Maislabyrinth',0)})();
/* ---------- 20. Gänsewiese ---------- */
(function(){const b=ZN('Gänsewiese');gehege(b,20,ZW(0x9ed47a,0xe8f0f6),Math.PI/2,72);zugang(b,-35);
  wasserFl(b.x+6,b.z+3,5.5,WASSER);wasserFl(b.x+5,b.z+4,3.6,WINTER?0xe6f6ff:0x6ec0ea,.02);kreis(b.x+6,b.z+3,5.2);for(let i=0;i<14;i++){const a=i/14*6.283;felsen(b.x+6+Math.cos(a)*5.8,b.z+3+Math.sin(a)*5.8,.4+rnd()*.25)}
  [[-7,-2,1],[-4,3,1.1],[-9,6,.9],[0,-8,1],[3,-3,1.05],[-12,-6,.95]].forEach(p=>tier(gans,b.x+p[0],b.z+p[1],b.x+6,b.z+3,p[2],.5));
  tier(truthahn,b.x-10,b.z+10,b.x,b.z,1,.7);tier(truthahn,b.x+8,b.z-9,b.x,b.z,.9,.7);tier(pfau,b.x-2,b.z+11,b.x,b.z,1,.6);
  stall(b.x-9,b.z-9,4.2,3,2,0xc98a4b,0x4aa84e,0,'Gänsehaus');
  const hy=grp(b.x+10,0,b.z-6);sph(1.3,0xe8c850,0,.7,0,hy,1,.7,1);kreis(b.x+10,b.z-6,1.4);trog(b.x+4,b.z-12,0);kuebel(b.x-3,b.z+14);
  wegweiser(b.x+5,b.z+23,'Gänse',Math.PI)})();
/* ---------- 21. Molkerei und Käserei ---------- */
(function(){const b=ZN('Molkerei');scheibe(b.x,b.z,22,ZW(0xd8d4c0,0xe8eaee),.1);zugang(b,35);
  stall(b.x,b.z-8,7.6,6,3.6,0xf6f2ea,0x3b6fc4,0,'Molkerei');
  const tk=cyl(1.4,5,0xc4cad0,b.x+8,2,b.z-9,scene,true);tk.rotation.z=Math.PI/2;[-1.8,1.8].forEach(x=>box(.3,.8,2,0x6a7078,b.x+8+x,.4,b.z-9,scene));cyl(.15,.4,0x4a5058,b.x+8,3.5,b.z-9,scene);sperrKasten(b.x+8,b.z-9,5,2.8,0);
  [[-6,-3],[-5.2,-2.4],[-6.6,-2.2],[-5.6,-1.6]].forEach(p=>kanne(b.x+p[0],b.z+p[1]));box(2.4,.3,1.4,0x8a5a32,b.x-5.8,.15,b.z-2.4,scene);
  const st=grp(b.x-9,0,b.z+5);box(3.4,.15,1.4,0x8a5a32,0,.9,0,st,true);[-1.5,1.5].forEach(x=>cyl(.08,2.4,0x6a4220,x,1.2,.6,st,true));box(3.8,.1,1.8,0xe0605a,0,2.4,.2,st).rotation.x=.18;[[-1,.15],[-.2,.15],[.6,.15]].forEach((p,i)=>{cyl(.5,.3,0xf2c230,p[0],1.1,0,st);if(i<2)cyl(.45,.3,0xf6d860,p[0],1.4,0,st)});[1.3,1.6].forEach(x=>cyl(.1,.35,0xffffff,x,1.2,.1,st));schild('Milch und Käse',0,2.0,1.1,3,.7,36,'#fff0b0',0,st);kreis(b.x-9,b.z+5,2);
  const tr=grp(b.x+6,0,b.z+9);box(3.6,1.6,2,0x3b6fc4,-.4,1.2,0,tr,true);box(1.4,1.2,2,0x2a5aa4,1.7,1.0,0,tr,true);box(.06,.6,1.6,0x24364a,2.43,1.4,0,tr);[-.7,.7].forEach(z=>sph(.14,0xfff2a0,2.45,.75,z,tr));box(.2,.25,2.1,0xc4cad0,2.5,.45,0,tr);box(.1,.4,1.2,0x2a2a2a,2.42,.85,0,tr);const ct=cyl(.8,3,0xf6f2ea,-.4,2.4,0,tr,true);ct.rotation.z=Math.PI/2;[-1,1].forEach(s=>[-1.2,1.6].forEach(x=>{const w=cyl(.45,.3,0x2a2a2a,x,.45,s*1.05,tr,true);w.rotation.x=Math.PI/2}));sperrKasten(b.x+6.3,b.z+9,5.4,2.2,0);
  tier(kuh,b.x-12,b.z-10,b.x,b.z,.6,1.1);kuebel(b.x+13,b.z-1);kuebel(b.x-13,b.z+1);[[-2,-2],[-2.3,-.6],[-1.6,.9]].forEach((p,i)=>{const kg=grp(b.x+p[0]-8,0,b.z+p[1]+15);for(let k=0;k<3-i%2;k++)box(.9,.4,.6,0x3b8fc4,0,.2+k*.42,0,kg,true);kreis(b.x+p[0]-8,b.z+p[1]+15,.7)});bank(b.x+14,b.z+10,Math.PI);laterne(b.x-14,b.z-3);laterne(b.x+14,b.z-3);[[14,6],[-14,12]].forEach(p=>{const t=grp(b.x+p[0],0,b.z+p[1]);cyl(.3,2.4,0x7a5230,0,1.2,0,t,true);sph(1,0x5cb04a,0,3.2,0,t,2,1.6,2).castShadow=true;kreis(b.x+p[0],b.z+p[1],.7)});
  wegweiser(b.x-5,b.z-25,'Molkerei',0)})();
/* ---------- 22. Wagenremise mit Kutsche und Ponys ---------- */
(function(){const b=ZN('Wagenremise');gehege(b,22,ZW(0xa9d386,0xe8f0f4),Math.PI/2,80);zugang(b,35);
  const rh=grp(b.x,0,b.z-10);[-6.5,0,6.5].forEach(x=>[-3,3].forEach(z=>{cyl(.2,3.4,0x7a5230,x,1.7,z,rh,true);kreis(b.x+x,b.z-10+z,.35)}));box(14.6,.25,8,0x8a3a30,0,3.55,0,rh,true).rotation.x=.08;box(14,3.4,.2,0x8a5a32,0,1.7,-3.9,rh,true);sperrLinie(b.x-7,b.z-13.9,b.x+7,b.z-13.9,.3);schild('Wagenremise',0,2.45,3.3,4,.8,40,'#fff8e6',0,rh);
  const rad2=(g,x,z,r)=>{const w=cyl(r,.15,0x4a3220,x,r,z,g,true);w.rotation.x=Math.PI/2;cyl(r*.3,.2,0xc9a46a,x,r,z,g).rotation.x=Math.PI/2};
  const hw=grp(b.x-3.5,0,b.z-10);box(4,.3,2,0x8a5a32,0,1.1,0,hw,true);[-1,1].forEach(z=>box(4,.4,.1,0xa8743f,0,1.45,z,hw));sph(1.5,0xe8c850,0,1.7,0,hw,1.3,.55,.8);[-1.3,1.3].forEach(x=>[-1.1,1.1].forEach(z=>rad2(hw,x,z,.6)));box(2.4,.1,.15,0x6a4220,3.2,.8,0,hw);sperrKasten(b.x-3.5,b.z-10,4.2,2.4,0);
  const ku=grp(b.x+3.8,0,b.z-10);box(2.8,1.6,1.8,0x3b3a6a,0,1.7,0,ku,true);box(3.1,.2,2.1,0x2a2a4a,0,2.6,0,ku,true);glas(.1,.9,1.2,1.45,1.9,0,ku);glas(.1,.9,1.2,-1.45,1.9,0,ku);box(1,.3,1.6,0x6a4a2a,1.9,1.1,0,ku);[-1,1].forEach(z=>{rad2(ku,-1,z*1.05,.65);rad2(ku,1.1,z*1.05,.5)});box(2.6,.1,.12,0x6a4220,3.5,.9,0,ku);sperrKasten(b.x+3.8,b.z-10,3,2.2,0);
  tier(p=>pferd(p,0x8a8a90,0x3a3a40),b.x-8,b.z+6,b.x,b.z,.6,1.1);tier(p=>pferd(p,0xa86a3a,0x2a1d14),b.x+9,b.z+8,b.x,b.z,.55,1);tier(p=>pferd(p,0xf2e8d0,0xc8b8a0),b.x-2,b.z+12,b.x,b.z,.5,.9);
  trog(b.x+4,b.z+2,0);ballen(b.x-6,b.z+14,.3);
  const rb=cyl(.9,1.3,0xe8c850,b.x+8,.9,b.z+14,scene,true);rb.rotation.z=Math.PI/2;bewegt(rb,t=>{const z=b.z+14+Math.sin(t*.25)*4;rb.position.z=z;rb.rotation.x=z/.9});
  wegweiser(b.x+5,b.z+23,'Ponys und Kutsche',Math.PI)})();
/* ---------- Landschaft: Büsche, Gras, Blumen, Felder, Kleinigkeiten ---------- */
(function(){
  const bu=[],bu2=[],gr=[],st=[],bk=[[],[],[],[],[]];let t=0;
  while(bu.length<120&&t++<6000){const x=GRENZE.x0+8+rnd()*(GRENZE.x1-GRENZE.x0-16),z=GRENZE.z0+8+rnd()*(GRENZE.z1-GRENZE.z0-16);if(!frei(x,z))continue;const s=.7+rnd()*.7;bu.push([x,.55*s,z,.9*s,.7*s,.9*s]);bu2.push([x+.5,.6*s,z+.3,.6*s,.5*s,.6*s]);kreis(x,z,.8*s)}
  t=0;while(gr.length<700&&t++<9000){const x=GRENZE.x0+4+rnd()*(GRENZE.x1-GRENZE.x0-8),z=GRENZE.z0+4+rnd()*(GRENZE.z1-GRENZE.z0-8);if(!frei(x,z))continue;for(let k=0;k<3;k++)gr.push([x+(rnd()-.5)*.5,.4,z+(rnd()-.5)*.5,.1,.8+rnd()*.4,.1])}
  t=0;let cl=0;while(cl<45&&t++<4000){const cx=GRENZE.x0+8+rnd()*(GRENZE.x1-GRENZE.x0-16),cz=GRENZE.z0+8+rnd()*(GRENZE.z1-GRENZE.z0-16);if(!frei(cx,cz))continue;cl++;const c=Math.floor(rnd()*5);for(let k=0;k<8;k++){const x=cx+(rnd()-.5)*3,z=cz+(rnd()-.5)*3;st.push([x,.25,z,.03,.5,.03]);bk[(c+k%2)%5].push([x,.55,z,.15,.15,.15])}}
  instanziert(gSph,0x3f8a3a,bu);instanziert(gSph,0x56a04a,bu2);instanziert(gCone,0x4aa040,gr);instanziert(gCyl,0x3f9a46,st);bk.forEach((l,i)=>instanziert(gSph,BLF[i],l));
  /* Felder hinter der Grenze */
  const fl=[[0xe8cf3a],[0x7ab648],[0xa88ad0],[0xa8d060],[0xd8b04a],[0x8ac85a],[0xe8cf3a],[0x7ab648],[0xe8cf3a],[0xa8d060]],rows=[];
  [[-215,-150],[-215,-50],[-215,60],[215,-110],[215,-10],[215,90],[-60,-255],[70,-250],[-70,160],[60,165]].forEach((p,i)=>{const f=fl[i],w=(Math.abs(p[0])>200?60:70),d=(Math.abs(p[0])>200?70:50);box(w,.12,d,f[0],p[0],.06,p[1],scene);const n=Math.abs(p[0])>200?10:12;for(let k=0;k<n;k++){const along=Math.abs(p[0])>200;rows.push(along?[p[0],.16,p[1]-d/2+3+k*(d-6)/(n-1),w-4,.06,.35]:[p[0]-w/2+3+k*(w-6)/(n-1),.16,p[1],.35,.06,d-4])}});
  instanziert(gBox,0x5a6a2a,rows);
  /* Holzstapel, Vogelhäuschen, Taubenschlag, Fahrräder */
  [[50,1],[10,-1],[-50,1],[-88,-1],[-118,1]].forEach(p=>{const x=wegX(p[0])+p[1]*7,z=p[0],g=grp(x,0,z);for(let i=0;i<3;i++)for(let j=0;j<4-i;j++)cyl(.28,1.8,0x8a5a32,0,.3+i*.5,-1+j*.6+i*.3,g,true).rotation.z=Math.PI/2;kreis(x,z,1.5)});
  [[75,-1],[25,1],[-20,-1],[-60,1]].forEach(p=>{const x=wegX(p[0])+p[1]*5.5,z=p[0],g=grp(x,0,z);cyl(.07,2.2,0x7a5230,0,1.1,0,g,true);box(.8,.5,.7,0xc98a4b,0,2.4,0,g,true);const r=box(1,.1,.9,0xb94a3a,0,2.8,0,g);r.rotation.z=.25;box(.22,.22,.05,0x2a1a10,0,2.4,.36,g);kreis(x,z,.4)});
  (function(){const x=wegX(100)+8,z=100,g=grp(x,0,z);cyl(.12,3.6,0x7a5230,0,1.8,0,g,true);box(1.4,1.2,1.4,0xf6f2ea,0,4.1,0,g,true);cone(1.2,.9,0xb94a3a,0,5.1,0,g);for(let i=0;i<3;i++)box(.14,.14,.14,0x2a1a10,-.4+i*.4,4.1,.72,g);box(1.5,.06,.5,0x8a5a32,0,3.5,.95,g);[-.35,.35].forEach(x=>{sph(.17,0xf0f0f0,x,3.72,.95,g,1.2,.9,.9);sph(.1,0xf0f0f0,x+.17,3.9,.95,g);cone(.035,.1,0xf0a030,x+.27,3.9,.95,g).rotation.z=-Math.PI/2;box(.3,.04,.14,0xd8d8d8,x-.22,3.7,.95,g)});kreis(x,z,.5)})();
  [[-30,98,.9,0x3b8fc4],[27,97,2.2,0xe0605a]].forEach(p=>{const g=grp(p[0],0,p[1]);g.rotation.y=p[2];[-.55,.55].forEach(wx=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.38,.035,6,16),mat(0x2a2a2a));r.position.set(wx,.4,0);g.add(r);cyl(.05,.08,0x8a8f96,wx,.4,0,g).rotation.x=Math.PI/2});box(1.1,.05,.05,p[3],0,.75,0,g);box(.9,.05,.05,p[3],.1,.55,0,g).rotation.z=.7;box(.05,.45,.05,p[3],-.3,.6,0,g);box(.05,.5,.05,p[3],.55,.7,0,g);box(.05,.05,.5,0x2a2a2a,.58,1.0,0,g);box(.3,.06,.16,0x3a2a22,-.3,.92,0,g);kreis(p[0],p[1],.7)});
})();
/* ---------- Bewegung: Wolken, Schwalben, freilaufende Hühner, Hofkatze, Hofhund ---------- */
(function(){
  for(let i=0;i<7;i++){const g=grp(0,48+rnd()*10,0);const n=2;for(let k=0;k<n;k++)sph(1,0xffffff,(k-n/2)*4+rnd()*2,rnd()*1.5,(rnd()-.5)*4,g,5+rnd()*2,2+rnd(),3+rnd()*2);const x0=rnd()*600,z=-200+rnd()*340,v=1.2+rnd()*1.4;bewegt(g,t=>{g.position.x=((x0+t*v)%600+600)%600-300;g.position.z=z})}
  for(let i=0;i<4;i++){const g=grp(0,12,0);sph(.12,0x1a2a4a,0,0,0,g,1.6,.7,.7);box(.14,.05,.1,0xe0605a,.17,0,0,g);const fl=[-1,1].map(s=>box(.5,.03,.18,0x1a2a4a,0,.02,s*.25,g));const cx=-90+rnd()*180,cz=-120+rnd()*190,r=22+rnd()*20,ph=rnd()*6,sp=.35+rnd()*.2;g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.7,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.7;g.position.set(x,10+Math.sin(t*.8+ph)*2.5,z);g.rotation.y=Math.atan2(-vz,vx);fl[0].rotation.x=Math.sin(t*18)*.7;fl[1].rotation.x=-Math.sin(t*18)*.7};leben(g,ph)}
  const lauf=(w,f,ph)=>{bewegt(w,t=>{const a=t*f.v+ph,x=f.x+Math.cos(a)*f.rx,z=f.z+Math.sin(a)*f.rz,vx=-Math.sin(a)*f.rx,vz=Math.cos(a)*f.rz;w.position.set(x,0,z);w.rotation.y=Math.atan2(-vz,vx)})};
  for(let i=0;i<5;i++){const w=grp(0,0,0);const h=huhn(w,i%5===0);leben(h,rnd()*6);lauf(w,{x:[-10,10,-8,12,0,-14,14][i],z:[84,80,52,58,18,-28,-24][i],rx:4+rnd()*3,rz:3+rnd()*3,v:.12+rnd()*.06},rnd()*6)}
  for(let i=0;i<2;i++){const w=grp(0,0,0);const k=kueken(w);leben(k,rnd()*6);lauf(w,{x:[-9,11,3,-12][i],z:[82,56,16,-26][i],rx:3,rz:2.5,v:.2},rnd()*6)}
  const strolch=(fn,zc,span,side,ph)=>{const w=grp(0,0,0);const a=fn(w);leben(a,ph);bewegt(w,t=>{const s=t*.1+ph,z=zc+Math.sin(s)*span,vz=Math.cos(s)*span*.1;w.position.set(wegX(z)+side+Math.sin(t*.6)*.8,0,z);w.rotation.y=vz>0?-Math.PI/2:Math.PI/2})};
  strolch(katze,50,45,3.5,0);strolch(hund,10,55,-3.2,1);strolch(katze,-100,35,3.6,3);
})();
}
