/* Welt: Bauernhof (Kennwort bauernhof). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Schilder: ausgeschaltet (Wunsch der Lehrkraft, 24.11.2026). Frühere Liste zum Wiedereinschalten: SCHILDER_ALT einfach als SCHILDER eintragen und WEGMAX auf 9 setzen. */
const SCHILDER_ALT=['Ausgang', 'Geschafft!', 'Kühe, Hühner', 'Schweine', 'Mühle', 'Spielplatz', 'Picknick', 'Bauernhaus', 'Maislabyrinth', 'Gänse', 'Molkerei', 'Ponys und Kutsche', 'Windmühle', 'Scheune', 'Kürbisfeld', 'Hofladen'];
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Hanna Huhn';
const START={x:0,z:94};
const VERTEXFARBEN=true,MERGEZELLE=60,FERNBESUCHER=50,FERNLEBEN=80;
/* Sammelstücke: mögliche Verstecke der 5 Edelsteine (abseits der Wege, in Ecken). Gefunden und geprüft mit werkzeuge/_verstecke.js; die Engine lost je Spiel 5 aus. */
const SAMMELPOOL=[
  {x:-160,z:97,ort:'Lavendelgarten'},
  {x:130,z:-137,ort:'Wassermühle'},
  {x:-126,z:-128,ort:'Alpakaweide'},
  {x:156,z:99,ort:'Backhaus'},
  {x:29,z:-23,ort:'Schäferei'},
  {x:139,z:-24,ort:'Wagenremise'},
  {x:-167,z:16,ort:'Maislabyrinth'},
  {x:28,z:-123,ort:'Traktoren'},
  {x:-61,z:62,ort:'Hühnerhof'},
  {x:71,z:60,ort:'Schweinestall'},
  {x:-65,z:-76,ort:'Gemüsegarten'},
  {x:-161,z:-84,ort:'Gänsewiese'},
  {x:71,z:-72,ort:'Imkerei'},
  {x:171,z:-70,ort:'Getreidefeld'},
  {x:-53,z:-10,ort:'Entenweiher'},
  {x:110,z:87,ort:'Kartoffelacker'},
  {x:-151,z:42,ort:'Bauernhaus'},
  {x:-121,z:12,ort:'Pferdekoppel'},
  {x:-119,z:-72,ort:'Kürbisfeld'},
  {x:134,z:67,ort:'Molkerei'},
  {x:-58,z:-129,ort:'Scheune'},
  {x:33,z:58,ort:'Streichelzoo'},
  {x:-119,z:64,ort:'Kuhweide'},
  {x:-164,z:-132,ort:'Eselgehege'},
  {x:-33,z:-90,ort:'Weidenwäldchen'}
];
const BEREICHE={
  eingang:{name:'Hofeinfahrt',x:0,z:92,plaetze:[]},
  obstgarten:{name:'Obstgarten',x:45,z:-68,plaetze:[]}
};
const EXTRAZONEN=[{name:'Kuhweide',x:-95,z:66,r:22},{name:'Schweinestall',x:95,z:66,r:22},{name:'Hühnerhof',x:-45,z:70,r:15},{name:'Streichelzoo',x:45,z:70,r:14},{name:'Pferdekoppel',x:-95,z:0,r:26},{name:'Schafweide',x:95,z:0,r:26},{name:'Entenweiher',x:-45,z:0,r:19},{name:'Windmühle',x:45,z:0,r:19},{name:'Gemüsegarten',x:-45,z:-68,r:19},{name:'Kürbisfeld',x:-95,z:-66,r:22},{name:'Imkerei',x:95,z:-66,r:22},{name:'Scheune',x:-45,z:-135,r:20},{name:'Traktoren',x:45,z:-135,r:20},{name:'Spielplatz',x:-88,z:-104,r:13},{name:'Picknick',x:88,z:-104,r:13},{name:'Bauernhaus',x:-145,z:66,r:22},{name:'Maislabyrinth',x:-145,z:0,r:24},{name:'Gänsewiese',x:-145,z:-68,r:20},{name:'Molkerei',x:145,z:66,r:22},{name:'Wagenremise',x:145,z:0,r:22},{name:'Alpakaweide',x:-108,z:-138,r:18},{name:'Eselgehege',x:-148,z:-140,r:15},{name:'Erdbeerfeld',x:-110,z:105,r:17},{name:'Kartoffelacker',x:110,z:105,r:17},{name:'Getreidefeld',x:147,z:-68,r:24},{name:'Lavendelgarten',x:-150,z:105,r:12},{name:'Backhaus',x:150,z:105,r:12},{name:'Fischteich',x:100,z:-140,r:17},{name:'Wassermühle',x:142,z:-135,r:13},{name:'Lagerfeuer',x:-148,z:-106,r:12}];
const SEITENWEGE=[35,-35,-100];
/* Feldwege der zweiten Dichte-Runde (Linien mit Breite) und der Bach bei der Wassermühle */
const NEUPFADE=[{p:[[-3,88],[-14,89.8],[-30,92.5],[-60,93.2],[-95,93],[-125,93.4],[-150,93]],w:3.2},{p:[[-150,93],[-150,99]],w:2.6},{p:[[3,88],[14,89.8],[30,92.5],[60,93.2],[95,93],[125,93.4],[150,93]],w:3.2},{p:[[150,93],[150,100]],w:2.6},
  {p:[[-92,-100],[-110,-101],[-130,-100],[-146,-99.5]],w:3.2},{p:[[-148,-114],[-148,-124]],w:2.6},{p:[[-108,-100.5],[-108,-120]],w:2.6},
  {p:[[92,-100],[104,-102],[107,-112],[100,-127]],w:3.2},{p:[[107,-113],[120,-121],[134,-127],[140.2,-128.8]],w:3},{p:[[124,-123],[124,-138.5]],w:2.4},{p:[[124,-142],[124,-153]],w:2.4},{p:[[136,-127.6],[146,-127.8],[154,-130],[157,-134],[157,-138.5]],w:2.6},{p:[[157,-142.5],[157,-153]],w:2.4},{p:[[147,-37],[146,-49]],w:2.8}];
const BACHP=[[108,-140.2],[118,-141.8],[128,-140.6],[138,-140.4],[148,-140.4],[155,-141.6],[165,-140],[177,-141.5]];
const NEUSPL=NEUPFADE.map(q=>spl(q.p,3)).concat([spl(BACHP,3)]);
function nahNeu(x,z,m){for(const s of NEUSPL)for(const q of s){if(Math.hypot(q[0]-x,q[1]-z)<m)return true}return false}
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
/* Instanzen: alle Büsche, Blumen, Bäume, Felder werden gesammelt (inst) und am Ende je Form und Kachel zu einem Zeichenaufruf (instFlush, Farbe je Instanz, nur sichtbare Kacheln werden gezeichnet) */
const gSphL=new THREE.SphereGeometry(1,6,4),gSphT=new THREE.SphereGeometry(1,8,6),gSphXL=new THREE.SphereGeometry(1,5,3),gConL=new THREE.ConeGeometry(1,1,7),gCylL=new THREE.CylinderGeometry(1,1,1,6),gBoxI=new THREE.BoxGeometry(1,1,1);
const IR={};
function inst(k,x,y,z,sx,sy,sz,c,ry){(IR[k]=IR[k]||[]).push([x,y,z,sx,sy,sz,c,ry||0])}
function instanziert(geo,farbe,liste){const k=geo===gCone?'con':geo===gCyl?'cyl':geo===gBox?'box':'sph';liste.forEach(a=>inst(k,a[0],a[1],a[2],a[3],a[4],a[5],farbe,a[6]||0))}
function instFlush(){const G={sph:gSphL,sphT:gSphT,blm:gSphXL,con:gConL,cyl:gCylL,box:gBoxI},M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color(),CH=80,gr={},bl=[];
  for(const k in IR)IR[k].forEach(a=>{const key=k+'|'+Math.floor((a[0]+260)/CH)+'|'+Math.floor((a[2]+320)/CH);(gr[key]=gr[key]||{k,l:[]}).l.push(a)});
  for(const key in gr){const q=gr[key],l=q.l;let x0=1e9,x1=-1e9,y1=0,z0=1e9,z1=-1e9,ms=0;l.forEach(a=>{x0=Math.min(x0,a[0]);x1=Math.max(x1,a[0]);z0=Math.min(z0,a[2]);z1=Math.max(z1,a[2]);y1=Math.max(y1,a[1]+a[4]);ms=Math.max(ms,a[3],a[4],a[5])});
    const geo=G[q.k].clone(),im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),l.length);geo.boundingSphere=new THREE.Sphere(new THREE.Vector3((x0+x1)/2,y1/2,(z0+z1)/2),Math.hypot(x1-x0,z1-z0,y1)/2+ms*1.6+2);
    bl.push({im,x:geo.boundingSphere.center.x,z:geo.boundingSphere.center.z,r:geo.boundingSphere.radius});im.frustumCulled=true;if(q.k==='sphT')im.castShadow=true;
    l.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(0,a[7],0));M.compose(P,Q,S);im.setMatrixAt(i,M);im.setColorAt(i,C.set(a[6]))});im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;scene.add(im)}
  lebendig.push({o:{userData:{anim:t=>{const cx=camera.position.x,cz=camera.position.z;bl.forEach(c=>{const v=Math.hypot(c.x-cx,c.z-cz)-c.r<250;if(c.im.visible!==v)c.im.visible=v})}}},ph:0})}
const VMAT2=new THREE.MeshLambertMaterial({vertexColors:true});
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
function flatter(x,z,cx,cz,r,farbe,ph){const g=grp(x,1.4,z);sph(.07,0x3a2a22,0,0,0,g,2,.5,.5);[-1,1].forEach(z=>cyl(.012,.25,0x3a2a22,.2,.1,z*.05,g).rotation.z=-.9);const fl=[-1,1].map(s=>{const w=sph(.3,farbe,0,0,s*.3,g,.9,.1,1.1);return w});g.userData.anim=t=>{const a=t*.5+ph;g.position.set(cx+Math.cos(a)*r,1.3+Math.sin(t*1.3+ph)*.4,cz+Math.sin(a)*r*.7);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*14)*.7;fl[1].rotation.x=-Math.sin(t*14)*.7};leben(g,ph);return vm(g,fl[0],fl[1])}
function biene(cx,cz,r,ph){const g=grp(cx,1.3,cz);sph(.12,0xf2c230,0,0,0,g,1.4,1,1).castShadow=false;[-.05,.06].forEach(x=>sph(1,0x2a2a2a,x,0,0,g,.03,.125,.125));[-1,1].forEach(z=>{sph(.04,0xffffff,.15,.04,z*.07,g);sph(.022,0x111111,.18,.04,z*.07,g)});const fl=[-1,1].map(s=>box(.16,.02,.2,0xe8f4ff,0,.12,s*.14,g));g.userData.anim=t=>{const a=t*1.4+ph;g.position.set(cx+Math.cos(a)*r,1.2+Math.sin(t*2+ph)*.5,cz+Math.sin(a*1.3)*r);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*40)*.6;fl[1].rotation.x=-Math.sin(t*40)*.6};leben(g,ph);return vm(g,fl[0],fl[1])}
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
BPTS.push([-30,92],[30,92],[-60,93],[60,93],[-100,93],[100,93],[-140,93],[140,93],[-108,-112],[-125,-100],[-146,-110],[106,-110],[118,-122],[140,-129],[124,-124],[146,-48],[-62,101],[62,101],[-20,-118],[22,-116]);
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
/* ========== Zweite Dichte-Runde (24.11.2026): neue Tiere, Figuren und Bauhilfen ========== */
/* Alpaka (klein, kurze Ohren, Schopf) und Lama (größer, lange Ohren); schauen nach +x */
function alpaka(par,f,lama){f=f||0xf2ebdc;const w=new THREE.Color(f).lerp(new THREE.Color(0xffffff),.22).getHex(),d=new THREE.Color(f).multiplyScalar(.68).getHex(),s=lama?1.2:1,g=grp(0,0,0,par);
  sph(.7*s,f,0,1.25*s,0,g,1.45,.92,.8).castShadow=true;[[.4,.5,.35],[-.45,.45,-.3],[-.7,.2,.3],[.1,.62,-.38],[.7,.3,-.3],[0,.7,.2]].forEach(p=>sph(.38*s,w,p[0]*s,(1.25+p[1])*s,p[2]*s,g,1,.85,.9));
  [[-.55,.3],[-.55,-.3],[.55,.3],[.55,-.3]].forEach(p=>{cyl(.1*s,1.0*s,d,p[0]*s,.5*s,p[1]*s,g,true);sph(.13*s,0x3a3030,p[0]*s,.07*s,p[1]*s,g,1.2,.6,1.2)});
  cyl(.17*s,1.3*s,w,.88*s,2.0*s,0,g).rotation.z=-.3;sph(.3*s,w,.92*s,1.95*s,0,g,1,1.5,.95);
  const kopf=grp(1.12*s,2.72*s,0,g);sph(.27*s,w,0,0,0,kopf,1.15,1,.85);sph(.17*s,lama?0xe8d6c0:0xe9d8c6,.27*s,-.1*s,0,kopf,1.1,.8,.9);sph(.045*s,0x3a2a22,.43*s,-.08*s,0,kopf);
  [-1,1].forEach(z=>{sph(.06*s,0x1a1a1a,.17*s,.08*s,z*.19*s,kopf);sph(.022*s,0xffffff,.2*s,.1*s,z*.2*s,kopf);cone((lama?.09:.07)*s,(lama?.55:.3)*s,f,-.02*s,(lama?.42:.3)*s,z*.14*s,kopf).rotation.x=z*.22});
  sph((lama?.16:.22)*s,w,-.02*s,.3*s,0,kopf,1.1,.9,1.1);
  const sw=grp(-1.0*s,1.6*s,0,g);cone(.11*s,.4*s,f,0,.1*s,0,sw).rotation.z=.9;
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*.9)*.14;sw.rotation.z=Math.sin(t*1.7)*.18};return g}
/* Esel: grau, helle Schnauze und Bauch, lange Ohren, kurze Stehmähne, Schwanzquaste */
function esel(par,f){f=f||0x8e8e96;const l=0xeee9de,d=0x4a4a52,g=grp(0,0,0,par);
  sph(.85,f,0,1.25,0,g,1.3,.62,.55).castShadow=true;sph(.8,l,.1,1.05,0,g,1.15,.3,.5);
  [[-.85,.35],[-.85,-.35],[.85,.35],[.85,-.35]].forEach(p=>{cyl(.13,1.1,f,p[0],.55,p[1],g,true);cyl(.14,.14,l,p[0],.3,p[1],g);box(.2,.16,.26,0x3a3a40,p[0],.08,p[1],g)});
  box(1.9,.06,.16,d,0,1.78,0,g);box(.16,.06,.8,d,.5,1.79,0,g);
  cyl(.27,1.0,f,.95,1.95,0,g).rotation.z=-.7;for(let i=0;i<5;i++)box(.1,.3,.08,d,.58+i*.11,2.02+i*.17,0,g).rotation.z=-.7;
  const kopf=grp(1.33,2.38,0,g);sph(.38,f,.15,0,0,kopf,1.5,1,.8).rotation.z=-.3;sph(.24,l,.64,-.2,0,kopf,1.1,.85,.9);sph(.05,0x2a2a2a,.84,-.22,.1,kopf);sph(.05,0x2a2a2a,.84,-.22,-.1,kopf);
  [-1,1].forEach(z=>{sph(.065,0x1a1a1a,.24,.14,z*.22,kopf);sph(.022,0xffffff,.27,.16,z*.23,kopf);cone(.12,.78,f,-.08,.55,z*.17,kopf).rotation.x=z*.25;cone(.065,.6,0xe8b8b0,-.04,.5,z*.18,kopf).rotation.x=z*.25});
  const sw=grp(-1.12,1.6,0,g);cyl(.05,1.0,f,0,-.45,0,sw);sph(.15,d,0,-1.0,0,sw,.8,1.8,.8);
  g.userData.anim=t=>{kopf.rotation.z=-.3+Math.sin(t*.8)*.16;sw.rotation.z=Math.sin(t*1.6)*.15};return g}
/* Koi (Teichfisch, schwimmt nach +x) */
function koi(par,f){f=f||0xf59e3f;const g=grp(0,0,0,par);sph(.4,f,0,0,0,g,1.5,.55,.5);sph(.2,0xffffff,.05,.2,.1,g,1.7,.35,.6);cone(.3,.5,f,-.75,0,0,g).rotation.z=Math.PI/2;box(.3,.22,.04,f,0,.28,0,g);sph(.05,0x111111,.45,.1,.2,g);sph(.05,0x111111,.45,.1,-.2,g);return vm(g)}
/* Person (Kind oder Erwachsene), unbewegt; schaut in Richtung rot (0 = nach +z) */
function person(x,z,rot,jacke,hose,haar,stil,s,par){const m=kindModell({jacke:jacke,hose:hose,haut:0xe8b98f,haar:haar,stil:stil||'kurz',rucksack:null},par||scene);m.g.position.set(x,0,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.25);return m}
function bodenFl(x,z,w,d,farbe,h){h=h||.1;const b=box(w,h,d,farbe,x,h/2,z,scene);b.receiveShadow=true;return b}
function sack(x,z,f,s,par){const g=grp(x,0,z,par);s=s||1;sph(.5*s,f||0xd8c090,0,.45*s,0,g,1,1.15,.85);sph(.18*s,f||0xd8c090,0,1.0*s,0,g,1,.8,1);kreis(x,z,.5*s);return g}
function korb(x,z,fr,par){const g=grp(x,0,z,par);cyl(.36,.36,0xc9a46a,0,.18,0,g,true);const h=new THREE.Mesh(new THREE.TorusGeometry(.3,.03,5,10,Math.PI),mat(0xa8743f));h.position.y=.34;g.add(h);for(let i=0;i<5;i++)sph(.12,fr,Math.cos(i*1.3)*.2,.4,Math.sin(i*1.3)*.2,g);return g}
function eimer(x,z,f,inhalt){const g=grp(x,0,z);cyl(.34,.5,f,0,.25,0,g,true);const h=new THREE.Mesh(new THREE.TorusGeometry(.3,.025,5,10,Math.PI),mat(0x6a6a70));h.position.y=.48;g.add(h);if(inhalt)for(let i=0;i<3;i++)sph(.13,inhalt,(i-1)*.16,.52,(i%2)*.1,g,1.3,.7,.8);kreis(x,z,.45);return g}
function holzstapel(x,z,rot,par){const g=grp(x,0,z,par);for(let i=0;i<4;i++)for(let j=0;j<5-i;j++)cyl(.26,1.8,i%2?0x9a6a3a:0x8a5a32,0,.3+i*.5,-1.2+j*.56+i*.28,g,true).rotation.z=Math.PI/2;g.rotation.y=rot||0;kreis(x,z,1.6);return g}
/* Brücke über einen Bach s (Liste von Punkten); Geländer sind Hindernisse, Mitte bleibt frei */
function bruecke(x,z,s,w){let bi=0,bd=1e9;s.forEach((q,i)=>{const d=Math.hypot(q[0]-x,q[1]-z);if(d<bd){bd=d;bi=i}});const a=s[Math.max(0,bi-1)],c=s[Math.min(s.length-1,bi+1)],th=Math.atan2(-(c[1]-a[1]),c[0]-a[0]),bx=s[bi][0],bz=s[bi][1];
  const g=grp(bx,0,bz);g.rotation.y=th;const L=w+5.4;box(4.6,.1,L,0x9a6a3a,0,.14,0,g,true);for(let i=0;i<9;i++)box(4.5,.05,.12,0x6a4220,0,.2,-L/2+.6+i*(L-1.2)/8,g);
  [-1,1].forEach(sg=>{box(.14,.14,L,0x6a4220,sg*2.2,1.05,0,g);box(.14,.14,L,0x6a4220,sg*2.2,.65,0,g);for(let i=0;i<5;i++)box(.18,1.0,.18,0x7a5230,sg*2.2,.5,-L/2+.3+i*(L-.6)/4,g)});
  [-1,1].forEach(sg=>box(4.6,.08,1.2,0x9a6a3a,0,.08,sg*(L/2+.5),g));
  const cs=Math.cos(th),sn=Math.sin(th),W=(lx,lz)=>[bx+lx*cs+lz*sn,bz-lx*sn+lz*cs];[-1,1].forEach(sg=>{const p=W(sg*2.2,-L/2),q=W(sg*2.2,L/2);sperrLinie(p[0],p[1],q[0],q[1],.1)});return[bx,bz]}
/* Bach: Spline s, Breite w; Hindernis entlang beider Ufer, außer an den Brücken (Brückenmitten br) */
function bachBauen(s,w,br){wegBand(s,w+1.4,0xb9a577,.056);wegBand(s,w,WASSER,.082);wegBand(s,w*.5,0x6ec0ea,.088);const r=w/2+.15;
  for(let i=0;i<s.length-1;i++){if(br.some(q=>Math.hypot(s[i][0]-q[0],s[i][1]-q[1])<3.9||Math.hypot(s[i+1][0]-q[0],s[i+1][1]-q[1])<3.9))continue;sperrLinie(s[i][0],s[i][1],s[i+1][0],s[i+1][1],r)}}
/* Bahn (geschlossen): hin auf der einen Seite der Linie s, zurück auf der anderen, Wendebögen an den Enden; at(u) liefert [x,z,dx,dz] */
function pendel(s,o){const n=s.length,nr=i=>{const a=s[Math.max(0,i-1)],b=s[Math.min(n-1,i+1)];let tx=b[0]-a[0],tz=b[1]-a[1];const l=Math.hypot(tx,tz)||1;return[-tz/l,tx/l,tx/l,tz/l]};
  const P=[];for(let i=0;i<n;i++){const q=nr(i);P.push([s[i][0]+q[0]*o,s[i][1]+q[1]*o])}
  let q=nr(n-1);for(let k=1;k<12;k++){const a=k/12*Math.PI;P.push([s[n-1][0]+q[0]*o*Math.cos(a)+q[2]*o*Math.sin(a),s[n-1][1]+q[1]*o*Math.cos(a)+q[3]*o*Math.sin(a)])}
  for(let i=n-1;i>=0;i--){const m=nr(i);P.push([s[i][0]-m[0]*o,s[i][1]-m[1]*o])}
  q=nr(0);for(let k=1;k<12;k++){const a=k/12*Math.PI;P.push([s[0][0]-q[0]*o*Math.cos(a)-q[2]*o*Math.sin(a),s[0][1]-q[1]*o*Math.cos(a)-q[3]*o*Math.sin(a)])}
  return bahn(P)}
function bahn(P){const C=[0];for(let i=1;i<=P.length;i++){const a=P[i-1],b=P[i%P.length];C.push(C[i-1]+Math.hypot(b[0]-a[0],b[1]-a[1]))}const L=C[P.length];
  return{L,at:u=>{u=((u%L)+L)%L;let lo=0,hi=P.length;while(hi-lo>1){const m=(lo+hi)>>1;if(C[m]<=u)lo=m;else hi=m}const a=P[lo],b=P[(lo+1)%P.length],f=(u-C[lo])/((C[lo+1]-C[lo])||1);return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,b[0]-a[0],b[1]-a[1]]}}}
/* Fahrzeug g (schaut nach +x) fährt auf Bahn B mit Geschwindigkeit v; wird weit weg ausgeblendet */
function fahren(g,B,v,ph){g.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{const p=B.at(t*v+ph);g.position.set(p[0],0,p[1]);g.rotation.y=Math.atan2(-p[3],p[2]);const sicht=Math.hypot(p[0]-spieler.position.x,p[1]-spieler.position.z)<(dist>35?85:100);if(g.visible!==sicht)g.visible=sicht;if(sicht&&g.userData.anim)g.userData.anim(t)}}},ph:0})}
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
/* Tiere: unbewegte Teile verschmelzen (bewegte Teile werden selbst erkannt) -> viel weniger Zeichenaufrufe, gleiches Aussehen */
function automerge(fn){return function(){const g=fn.apply(null,arguments),an=g.userData.anim;if(!an||g.userData.vmAuto)return g;g.userData.vmAuto=1;
  const snap=()=>{const r=[];g.traverse(o=>{if(o!==g)r.push([o,o.position.x,o.position.y,o.position.z,o.rotation.x,o.rotation.y,o.rotation.z,o.scale.x,o.scale.y,o.scale.z])});return r};
  const a=snap();an(.37);const b=snap();an(1.91);const c=snap();an(0);const mv=[];
  a.forEach((r,i)=>{for(let k=1;k<10;k++){if(Math.abs(r[k]-b[i][k])>1e-6||Math.abs(r[k]-c[i][k])>1e-6){mv.push(r[0]);break}}});
  mv.forEach(o=>{o.userData._d=0;for(let p=o.parent;p&&p!==g;p=p.parent)o.userData._d++});
  mv.sort((x,y)=>y.userData._d-x.userData._d).forEach(o=>{if(!o.isMesh&&o.children.length)vmVerschm(o);o.userData.frei=1});vmVerschm(g);return g}}
function spl(pts,st){const n=pts.length,s=[];for(let i=0;i<n-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n-1,i+2)],k=Math.max(2,Math.ceil(Math.hypot(p2[0]-p1[0],p2[1]-p1[1])/(st||2.5)));
  for(let j=0;j<k;j++){const t=j/k,t2=t*t,t3=t2*t,f=(a,b,c,d)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);s.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}s.push(pts[n-1]);return s}
kuh=automerge(kuh);schwein=automerge(schwein);huhn=automerge(huhn);kueken=automerge(kueken);pferd=automerge(pferd);schaf=automerge(schaf);ziege=automerge(ziege);ente=automerge(ente);hund=automerge(hund);katze=automerge(katze);hase=automerge(hase);gans=automerge(gans);truthahn=automerge(truthahn);pfau=automerge(pfau);traktor=automerge(traktor);alpaka=automerge(alpaka);esel=automerge(esel);
function paradeBauen(){const liste=[[kuh,.6],[schwein,.8],[huhn,1.3],[pferd,.6],[schaf,1],[ziege,1],[ente,1.3],[hund,1],[traktor,.5],[huhn,1.3]];liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
function weltBauen(){
FARBEN=WINTER?{boden:0xdfe9f1,pfad:0xe9dcc0,platz:0xf6e4b8,gehege:0xe8e4d4}:{boden:0x93cf72,pfad:0xe8d5a0,platz:0xf0dfae,gehege:0x9ed47a};
const boden=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200),mat(FARBEN.boden));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
WASSER=WINTER?0xbfe6f4:0x4aa3d8;
hauptweg(5);SEITENWEGE.forEach(w=>kreuzplatz(wegX(w),w,7.5));pfad(-150,35,150,35,4);pfad(-150,-35,150,-35,4);pfad(-92,-100,92,-100,4);pfad(0,TORZ+2,0,GRENZE.z0+4,5,FARBEN.platz);NEUPFADE.forEach(q=>weg(q.p,q.w));
scheibe(0,92,14,FARBEN.pfad,.07);scheibe(FEST.x,FEST.z,17,FARBEN.platz,.08);
/* ---------- Bäume (instanziert, wenige) ---------- */
const baumListe=[];
function frei(x,z){if(Math.hypot(x-0,z-92)<24||Math.hypot(x-45,z+68)<24)return false;if(nahNeu(x,z,6))return false;
  for(const e of EXTRAZONEN){if(Math.hypot(x-e.x,z-e.z)<e.r+9)return false}if(Math.abs(x-wegX(z))<6&&z>TORZ+2)return false;for(const w of SEITENWEGE){if(Math.abs(z-w)<9&&Math.abs(x)<165)return false}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<24)return false;if(Math.abs(x)<5&&z<TORZ)return false;return true}
for(let i=0;i<130;i++){const x=GRENZE.x0+6+rnd()*(GRENZE.x1-GRENZE.x0-12),z=GRENZE.z0+6+rnd()*(GRENZE.z1-GRENZE.z0-12);if(frei(x,z))baumListe.push({x,z,s:.8+rnd()*.5})}
for(let x=GRENZE.x0;x<=GRENZE.x1;x+=11){if(Math.abs(x)>8)baumListe.push({x,z:GRENZE.z1,s:1.2});baumListe.push({x,z:GRENZE.z0,s:1.2});if(Math.abs(x)>8)baumListe.push({x,z:TORZ,s:1})}
for(let z=GRENZE.z0;z<=GRENZE.z1;z+=11){baumListe.push({x:GRENZE.x0,z,s:1.2});baumListe.push({x:GRENZE.x1,z,s:1.2})}
const BAUMTEIL=WINTER?
  [[gCyl,0x7a5230,0,.9,0,.28,1.8,.28],[gCone,0x2f6b4a,0,2.6,0,1.7,2.7,1.7],[gCone,0x37805a,0,4.1,0,1.35,2.4,1.35],[gCone,0xffffff,0,3.15,0,1.25,1.6,1.25],[gCone,0xffffff,0,4.7,0,.95,1.4,.95],[gCone,0x3e9468,0,5.5,0,.8,1.6,.8]]:
  [[gCyl,0x7a5230,0,1.3,0,.36,2.6,.36],[gSph,0x4aa84e,0,3.9,0,2.1,1.8,2.1],[gSph,0x5cba5c,1.2,3.4,.6,1.5,1.3,1.5],[gSph,0x3f9a46,-1.2,3.5,-.5,1.6,1.4,1.6]];
(function(){const KEY=new Map([[gCyl,'cyl'],[gSph,'sph'],[gCone,'con']]);baumListe.forEach(t=>{const s=t.s;BAUMTEIL.forEach((m,k)=>{inst(k===1&&m[0]===gSph?'sphT':KEY.get(m[0]),t.x+m[2]*s,m[3]*s,t.z+m[4]*s,m[5]*s,m[6]*s,m[7]*s,m[1])});kreis(t.x,t.z,.9*s)})})();
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
  for(let i=0;i<26;i++){const f=besucherFigur(Object.assign({},AVATARE[(i+1)%AVATARE.length],{jacke:jc[i%10],haar:hc[(i*3)%10],stil:st[i%10]}));const p=BPTS[(i*2)%BPTS.length];f.g.position.set(p[0]+(rnd()-.5)*2,0,p[1]);f.ziel=BPTS[(i*3+1)%BPTS.length];f.v=1.8+rnd()*.8;besucher.push(f)}})();
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
/* ========== Zweite Dichte-Runde: neue Orte 23 bis 32 ========== */
/* ---------- 23. Alpaka- und Lamaweide ---------- */
(function(){const b=ZN('Alpakaweide');gehege(b,18,ZW(0xa8d880,0xe8f0f6),Math.PI/2,64);
  const A=[[0xf2ebdc,-5,-3,1,0],[0x8a5a38,4,-8,1,0],[0x3a3030,8,2,.95,0],[0xd8bf98,-9,5,1,0],[0xf2ebdc,-3,.5,.55,0],[0xc8a878,1,6,1,1],[0xf6f2e6,-11,-6,1,1],[0x6a4a32,10,-6,1,1]];
  A.forEach(a=>tier(p=>alpaka(p,a[0],a[4]),b.x+a[1],b.z+a[2],b.x,b.z,a[3],1.4*a[3]));
  trog(b.x-4,b.z+12,.2,0x4aa3d8);trog(b.x+5,b.z+12.5,-.3,0xe8c850);
  const us=grp(b.x-9,0,b.z-11);[[-3,-1.8],[3,-1.8],[-3,1.8],[3,1.8]].forEach(p=>cyl(.13,2.8,0x7a5230,p[0],1.4,p[1],us,true));box(7,.18,4.8,0x6a4a3a,0,2.95,0,us,true).rotation.x=.12;box(6.4,2.6,.16,0x8a6a4a,0,1.3,-1.9,us);sph(1.1,0xe8c850,-1.6,.5,-.8,us,1.4,.55,1);sph(.8,0xd8b840,1.4,.4,-1,us,1.2,.5,.9);box(1.4,.5,.9,0x8a5a32,.4,.25,1.2,us);sperrKasten(b.x-9,b.z-11,6.8,4.4,0);
  const hr=grp(b.x+11,0,b.z-9);[-1,1].forEach(s=>{cyl(.08,1.3,0x7a5230,s*1.1,.65,0,hr,true)});box(2.4,.1,.7,0x6a4220,0,1.3,0,hr);for(let i=0;i<7;i++)box(.07,.5,.07,0x8a5a32,-1+i*.33,1.55,.3,hr);sph(.7,0xe8c850,0,1.0,0,hr,1.6,.5,.6);kreis(b.x+11,b.z-9,1.4);
  const bm=grp(b.x+9,0,b.z+8);cyl(.32,2.4,0x7a5230,0,1.2,0,bm,true);sph(1,0x5cb04a,0,3.3,0,bm,2.1,1.6,2.1).castShadow=true;sph(1,0x4a9a3e,1.2,2.9,.5,bm,1.4,1.1,1.4);kreis(b.x+9,b.z+8,.8);
  felsen(b.x+13,b.z+2,1.1);felsen(b.x-13,b.z+5,.95);ballen(b.x-14,b.z-3,.4)})();
/* ---------- 24. Eselgehege ---------- */
(function(){const b=ZN('Eselgehege');gehege(b,15,ZW(0xc9d48a,0xe8f0f6),Math.PI/2,56);
  tier(p=>esel(p,0x8e8e96),b.x-4,b.z+2,b.x,b.z,.8,1.3);tier(p=>esel(p,0x6a6a72),b.x+5,b.z-3,b.x,b.z,.8,1.3);tier(p=>esel(p,0xb0a8a0),b.x-2,b.z-7,b.x,b.z,.8,1.3);tier(p=>esel(p,0x8e8e96),b.x+3,b.z+5,b.x,b.z,.45,.8);
  stall(b.x+7,b.z-9,5.6,3.8,2.5,0x9a6a3a,0x6a4a3a,.2,'');
  sph(1.3,0xe8c850,b.x-9,.6,b.z-6,scene,1,.7,1);kreis(b.x-9,b.z-6,1.3);ballen(b.x-10,b.z+4,.3);ballen(b.x-11.4,b.z+4.4,.6);
  const hr=grp(b.x+1,0,b.z-11);[-1,1].forEach(s=>cyl(.08,1.2,0x7a5230,s*1.1,.6,0,hr,true));box(2.4,.1,.7,0x6a4220,0,1.2,0,hr);for(let i=0;i<7;i++)box(.07,.5,.07,0x8a5a32,-1+i*.33,1.45,.3,hr);sph(.7,0xe8c850,0,.95,0,hr,1.6,.5,.6);kreis(b.x+1,b.z-11,1.4);
  trog(b.x-3,b.z+10,.1,0x4aa3d8);eimer(b.x+4,b.z+9,0xe0605a,0xf59e3f);eimer(b.x+5.1,b.z+9.6,0xe0605a,0xf59e3f);
  const kw=grp(b.x-10,0,b.z+8.5);kw.rotation.y=.5;box(2.2,.18,1.4,0x8a5a32,0,1.05,0,kw,true);[-1,1].forEach(z=>box(2.2,.45,.08,0xa8743f,0,1.35,z*.66,kw));box(.08,.45,1.4,0xa8743f,-1.06,1.35,0,kw);[-1,1].forEach(z=>{cyl(.7,.12,0x4a3220,0,.7,z*.82,kw,true).rotation.x=Math.PI/2;cyl(.18,.16,0xc9a46a,0,.7,z*.82,kw).rotation.x=Math.PI/2;box(2.6,.09,.09,0x6a4220,1.9,.75,z*.5,kw)});sperrKasten(b.x-10,b.z+8.5,2.4,1.8,.5);
  const bm=grp(b.x+11,0,b.z+5);cyl(.3,2.2,0x7a5230,0,1.1,0,bm,true);sph(1,0x5cb04a,0,3.1,0,bm,2,1.5,2).castShadow=true;kreis(b.x+11,b.z+5,.8)})();
/* ---------- 25. Erdbeerfeld mit Selbstpflück-Stand ---------- */
function schubkarre(x,z,rot,fr){const g=grp(x,0,z);g.rotation.y=rot||0;box(1.2,.35,.8,0x3b8fc4,.1,.72,0,g,true);cyl(.28,.1,0x2a2a2a,.75,.28,0,g,true).rotation.x=Math.PI/2;[-1,1].forEach(s=>{box(.08,.5,.08,0x6a4220,-.3,.28,s*.3,g);box(1.5,.07,.07,0x6a4220,-.9,.85,s*.3,g).rotation.z=.2});if(fr)for(let i=0;i<6;i++)sph(.14,fr,-.3+(i%3)*.32,.95+(i>2?.1:0),(i%2-.5)*.4,g);kreis(x,z,.8);return g}
(function(){const cx=-110,x0=-125,len=30;bodenFl(cx,105,32,16,0x6e5236,.08);
  const zs=[99.5,102.3,105.1,107.9,110.7];
  zs.forEach(z=>{box(len,.28,1.5,0x6b4a2f,cx,.14,z,scene);box(len,.05,.9,0xd8c070,cx,.3,z,scene);
    for(let i=0;i<32;i++){const x=x0+i*.94+(rnd()-.5)*.2;inst('sph',x,.52,z,.42,.28,.38,0x4aa84e);inst('sph',x+.22,.46,z+.15,.3,.22,.3,0x3f8a3a);inst('sph',x+.3,.36,z-.4,.11,.11,.11,0xe0302a);inst('sph',x-.2,.34,z+.42,.1,.1,.1,0xe0302a);if(i%3===0)inst('sph',x-.1,.62,z-.2,.07,.05,.07,0xffffff)}});
  const sg=grp(cx,0,96.6);[-2.2,2.2].forEach(x=>[-.55,.55].forEach(z=>cyl(.08,2.7,0x7a5230,x,1.35,z,sg,true)));box(4.6,.2,1.2,0x9a6a3a,0,1.05,0,sg,true);[-2,2].forEach(x=>box(.12,1,1,0x6a4220,x,.5,0,sg));box(4.6,.9,.14,0x8a5a32,0,1.6,.58,sg);
  for(let i=0;i<7;i++){const r=box(.7,.1,1.9,i%2?0xfff8e6:0xe0605a,-2.1+i*.7,2.85-Math.abs(i-3)*.02,0,sg);r.rotation.x=.12}
  [-1.4,0,1.4].forEach(x=>{box(1.1,.3,.7,0xa8743f,x,1.3,-.05,sg);for(let i=0;i<9;i++)sph(.15,0xe0302a,x-.35+(i%3)*.35,1.5+(i>5?.15:0),-.25+Math.floor(i/3)*.2,sg,1,.9,1)});
  sperrKasten(cx,96.6,4.8,1.6,0);korb(-114.4,95.3,0xe0302a);korb(-105.8,95.1,0xe0302a);korb(-115.4,96.4,0xf26a5a);kiste(-105.6,97.1,0xe0302a);kreis(-114.4,95.3,.4);kreis(-105.8,95.1,.4);kreis(-115.4,96.4,.4);
  schubkarre(-121.5,95.8,.4,0xe0302a);
  [[-118,101.1,Math.PI,0xe0605a,0x3b6fc4,0x6b4626,'zoepfe'],[-101.5,106.5,-1.2,0x4caf6a,0x6a5a8a,0xe8c24a,'cap']].forEach(k=>{const m=person(k[0],k[1],k[2],k[3],k[4],k[5],k[6],.8);kreis(k[0],k[1],.45);korb(k[0]+(k[2]>0?.6:.7),k[1]-.4,0xe0302a)});
  tier(hund,-95.5,100,-100,106,.7,.5)})();
/* ---------- 26. Kartoffelacker mit Pflug ---------- */
function pflug(par){const g=grp(0,0,0,par);box(3.8,.18,.22,0x3a3a40,-1.9,.95,0,g,true);for(let i=0;i<3;i++){const x=-1.0-i*1.0,z=-.55+i*.55;box(.1,.7,.1,0x3a3a40,x,.62,z,g);box(.8,.12,.4,0x6a7078,x-.1,.25,z,g);sph(.4,0x8a949c,x-.2,.55,z+.12,g,1,1.2,.35).rotation.y=-.3}box(.14,.3,.14,0x3a3a40,-3.6,.8,0,g);cyl(.35,.12,0x2a2a2a,-3.5,.35,-.7,g,true).rotation.x=Math.PI/2;box(.08,.7,.08,0x3a3a40,-3.5,.65,-.7,g);box(.5,.3,.3,0xd8433a,-.2,.95,0,g);return g}
function kartoffelkiste(x,z,n,rot){const g=grp(x,0,z);g.rotation.y=rot||0;for(let i=0;i<n;i++)box(1.1,.42,.8,0xa8743f,0,.21+i*.44,0,g,true);for(let i=0;i<7;i++)sph(.17,0xc9a46a,-.4+(i%4)*.27,.42*n+.1+(i>3?.05:0),(i%2-.5)*.4,g,1.2,.8,1);kreis(x,z,.8);return g}
(function(){bodenFl(110,105.3,31,15.5,0x5a4430,.08);
  [98.8,101.1,103.4,105.7,108,110.3,112.6].forEach((z,r)=>{box(30,.36,1.2,0x7a5a3a,110,.18,z,scene);if(r!==3)for(let i=0;i<16;i++){const x=111.6+i*.86+(rnd()-.5)*.2;inst('sph',x,.62,z,.5,.38,.45,0x4f9a3a);inst('sph',x+.2,.5,z+.2,.32,.25,.3,0x3f8a3a);if(i%4===0)inst('sph',x,.92,z,.09,.07,.09,0xf8f0ff)}});
  const tr=traktor(scene,true);tr.position.set(108.8,0,105.7);sperrKasten(109.4,105.7,5,2.6,0);const pf=pflug(scene);pf.position.set(106.7,0,105.7);sperrKasten(104.9,105.7,3.8,1.9,0);
  kartoffelkiste(126.6,99.8,3,.1);kartoffelkiste(126.8,101.4,2,-.1);kartoffelkiste(128.2,100.5,3,.3);kartoffelkiste(126.8,109.6,1,.2);
  [[126.2,104.2],[127.4,105.4],[126,106.5]].forEach(p=>sack(p[0],p[1],0xd8c090,.9));schubkarre(95.6,111,2.8,0xc9a46a);
  tier(katze,127,112,126,106,.9,.4)})();
/* ---------- 27. Getreidefeld mit Mähdrescher ---------- */
function maehdrescherNeu(par){const g=grp(0,0,0,par),gr=0x2f8a46,r=[];
  box(4.4,1.4,2.5,gr,0,1.9,0,g,true);box(2,1.6,2.3,gr,1.3,3.2,0,g,true);glas(.1,1.2,2.1,2.3,3.3,0,g);glas(1.8,1.2,.1,1.3,3.3,1.15,g);glas(1.8,1.2,.1,1.3,3.3,-1.15,g);box(2.5,.2,2.7,0xf6f2e6,1.3,4.1,0,g,true);[-1,1].forEach(z=>{[.4,2.2].forEach(x=>box(.1,1.3,.1,0x2a2a2a,x,3.3,z*1.15,g))});box(.6,.5,.5,0x3a3a3a,1.6,2.8,0,g);
  box(2.8,1.3,2.5,gr,-1.4,3.2,0,g,true);box(2.9,.12,2.6,0xb8bec4,-1.4,3.9,0,g);const au=grp(-.4,3.8,1.2,g);cyl(.24,3.6,0x8a949c,0,1.1,1.4,au,true).rotation.x=.9;cone(.26,.5,0xe0605a,0,2.3,2.9,au).rotation.x=Math.PI;
  box(1.5,1,5.2,0xe8c230,3.6,.95,0,g,true);box(.2,.1,5.3,0x8a949c,4.4,.42,0,g);[-1,1].forEach(z=>box(1.2,.9,.12,0xe8c230,3.7,1.15,z*2.65,g).rotation.y=z*.15);
  const ha=grp(3.9,2.2,0,g);cyl(.12,5,0x6a6a70,0,0,0,ha).rotation.x=Math.PI/2;for(let i=0;i<6;i++){const a=i/6*Math.PI*2;box(.1,.12,5,0xd8433a,Math.cos(a)*.85,Math.sin(a)*.85,0,ha)}[-1,1].forEach(z=>{box(1.8,.1,.1,0x6a6a70,0,0,z*2.5,ha);box(.1,1.8,.1,0x6a6a70,0,0,z*2.5,ha)});
  [-1,1].forEach(s=>{const w=grp(1.1,1.05,s*1.45,g);cyl(1.05,.75,0x2a2a2a,0,0,0,w,true).rotation.x=Math.PI/2;cyl(.45,.8,0xe8c230,0,0,0,w).rotation.x=Math.PI/2;for(let i=0;i<8;i++){const a=i/8*Math.PI*2;box(.3,.2,.8,0x1a1a1a,Math.cos(a)*1.05,Math.sin(a)*1.05,0,w).rotation.z=a}r.push(w);const k=grp(-2.2,.62,s*1.1,g);cyl(.62,.5,0x2a2a2a,0,0,0,k,true).rotation.x=Math.PI/2;cyl(.28,.55,0xe8c230,0,0,0,k).rotation.x=Math.PI/2;box(.2,.9,.12,0x1a1a1a,0,0,0,k);r.push(k)});
  [-1,1].forEach(z=>sph(.16,0xfff0b8,4.4,1.6,z*1.8,g));box(.4,.5,.3,0xd8433a,-2.2,2.5,0,g);
  g.userData.anim=t=>{ha.rotation.z=-t*2.4;r.forEach((w,i)=>{w.rotation.z=-t*(i%2?5:3)})};return g}
maehdrescherNeu=automerge(maehdrescherNeu);
(function(){const lw=5,N=7,X0=129.5,ZA=-51.5,ZB=-84.5,LEN=33,STEP=.85;bodenFl(147,-68,36,36,0xcaa850,.08);
  const WH=(function(){const P=[],Nn=[],C=[],I=[];[[new THREE.BoxGeometry(.07,1.3,.07).translate(0,.65,0),[.79,.65,.23]],[new THREE.ConeGeometry(.17,.65,5).translate(0,1.55,0),[.9,.78,.35]]].forEach(q=>{const g=q[0],o=P.length/3,pa=g.attributes.position.array,na=g.attributes.normal.array;for(let i=0;i<pa.length;i+=3){P.push(pa[i],pa[i+1],pa[i+2]);Nn.push(na[i],na[i+1],na[i+2]);C.push(q[1][0],q[1][1],q[1][2])}Array.from(g.index.array).forEach(i=>I.push(i+o))});const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.Float32BufferAttribute(P,3));G.setAttribute('normal',new THREE.Float32BufferAttribute(Nn,3));G.setAttribute('color',new THREE.Float32BufferAttribute(C,3));G.setIndex(I);return G})();
  const rows=Math.floor((LEN-1)/STEP),cols=8,lanes=[];
  for(let k=0;k<N;k++){const xk=X0+lw*(k+.5),dir=k%2?1:-1,zs=k%2?ZB:ZA,l=new THREE.InstancedMesh(WH.clone(),VMAT2,rows*cols),M=new THREE.Matrix4(),P=new THREE.Vector3(),S=new THREE.Vector3(),Q=new THREE.Quaternion();let n=0;
    for(let r=rows-1;r>=0;r--)for(let c=0;c<cols;c++){P.set(xk-2.2+c*.63+(rnd()-.5)*.15,0,zs+dir*(.5+r*STEP+(rnd()-.5)*.2));const sy=.9+rnd()*.25;S.set(1,sy,1);M.compose(P,Q,S);l.setMatrixAt(n++,M)}
    l.instanceMatrix.needsUpdate=true;l.geometry.boundingSphere=new THREE.Sphere(new THREE.Vector3(xk,.8,(ZA+ZB)/2),Math.hypot(lw/2,LEN/2,1)+2);l.frustumCulled=true;scene.add(l);
    lanes.push({m:l,xk,dir,zs,rows,cols,cnt:-1,sc:-1});
    bodenFl(xk,-68,lw-.2,LEN+1.5,k%2?0xc4a352:0xcdb05a,.1)}
  /* Bahn des Mähdreschers: Bahnen hin und her mit Wendebögen, dann außen herum zurück */
  const P=[],idx=[];for(let k=0;k<N;k++){const L=lanes[k],xe=L.xk,ze=L.zs+L.dir*LEN;idx.push(P.length);P.push([L.xk,L.zs]);P.push([xe,ze]);if(k<N-1){const nx=lanes[k+1].xk;for(let j=1;j<10;j++){const a=j/10*Math.PI;P.push([L.xk+(nx-L.xk)/2-(nx-L.xk)/2*Math.cos(a),ze+L.dir*2.5*Math.sin(a)])}}}
  let R=[[162,-84.5],[163,-89],[158,-91.5],[140,-92],[126,-90],[123,-70],[124,-50],[128,-46.5],[132,-45.5],[132,-48]];for(let it=0;it<3;it++){const q=[R[0]];for(let i=0;i<R.length-1;i++){const a=R[i],c=R[i+1];q.push([.75*a[0]+.25*c[0],.75*a[1]+.25*c[1]],[.25*a[0]+.75*c[0],.25*a[1]+.75*c[1]])}q.push(R[R.length-1]);R=q}
  R.slice(1).forEach(p=>P.push(p));const B=bahn(P);
  const U=[];let acc=0;for(let i=1;i<P.length;i++){acc+=Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]);U[i]=acc}
  const LS=lanes.map((L,k)=>({a:U[idx[k]]||0,b:U[idx[k]+1]})),UE=LS[N-1].b,V=3.4,w=grp(0,0,0);w.userData.keep=1;const mo=maehdrescherNeu(w);lebendig.push({o:mo,ph:0});
  bewegt(w,t=>{const u=((t*V)%B.L+B.L)%B.L,p=B.at(u);w.position.set(p[0],0,p[1]);w.rotation.y=Math.atan2(-p[3],p[2]);
    const gr=u>UE+6?Math.min(1,(u-UE-6)/Math.max(1,B.L-UE-30)):(u>UE?.05:1);
    lanes.forEach((L,k)=>{let n=L.rows*L.cols,s=1;if(u>UE){s=Math.max(.05,gr);n=L.rows*L.cols}else if(u>=LS[k].b)n=0;else if(u>LS[k].a){const pr=(u-LS[k].a)+3.8,rem=Math.max(0,Math.min(L.rows,L.rows-Math.floor((pr-.5)/STEP)-1));n=rem*L.cols}
      if(L.cnt!==n){L.cnt=n;L.m.count=n}if(L.sc!==s){L.sc=s;L.m.scale.y=s}})});
  ballen(167.5,-80,.2);ballen(167.5,-77.6,.5);ballen(167.8,-72,.1);ballen(167.5,-69.6,.4);ballen(167.6,-63,.2);ballen(167.4,-60.5,.3);ballen(167.2,-56,.5);
  stroh(126.5,-82,.2,null,.5,true);stroh(126.5,-82,.2,null,1.5,false);kreis(126.5,-82,1.3);vogelscheuche(127.3,-52.5);
  const an=anhaenger(scene);an.position.set(133,0,-43);an.rotation.y=.2;kreis(133,-43,1.8);[[140,-43.5,.3],[142,-42.5,.5]].forEach(p=>ballen(p[0],p[1],p[2]))})();
/* ---------- 28. Lavendel- und Kräutergarten ---------- */
(function(){const cx=-150;bodenFl(cx,105.5,21,16,0xa89a6a,.08);
  [100.8,103.4,106].forEach((z,r)=>{box(19.5,.18,1.7,0x8a7a52,cx,.09,z,scene);for(let i=0;i<14;i++){const x=cx-9+i*1.38+(rnd()-.5)*.2;inst('sph',x,.3,z,.5,.34,.46,0x5a7a3a);for(let k=0;k<7;k++){const q=k*.9+i;inst('cyl',x+Math.cos(q)*.3,.36,z+Math.sin(q)*.28,.03,.5,.03,0x5a8a4a);inst('con',x+Math.cos(q)*.3,.78+(k%3)*.1,z+Math.sin(q)*.28,.075,.5,.075,k%2?0xb28ae8:0x9a6ad0)}}});
  const bx=[-158,-154.9,-151.8,-148.7];bx.forEach((x,i)=>{const z=110;box(2.4,.4,.14,0x8a5a32,x,.2,z-1.1,scene);box(2.4,.4,.14,0x8a5a32,x,.2,z+1.1,scene);box(.14,.4,2.4,0x8a5a32,x-1.1,.2,z,scene);box(.14,.4,2.4,0x8a5a32,x+1.1,.2,z,scene);box(2.2,.3,2.2,0x6b4a2f,x,.18,z,scene);
    for(let k=0;k<6;k++){const px=x-.7+(k%3)*.7,pz=z-.5+Math.floor(k/3)*1;if(i===0)inst('sph',px,.55,pz,.38,.3,.38,0x4cb04a);else if(i===1)inst('con',px,.7,pz,.26,.8,.26,0x2f6b3a);else if(i===2)inst('sph',px,.5,pz,.38,.26,.38,0x9ab08a);else{inst('sph',px,.5,pz,.3,.25,.3,0x6cc04a);if(k%2)inst('sph',px,.75,pz,.12,.12,.12,0xc878d8)}}
    cyl(.04,.7,0xd8c070,x+.9,.55,z-.9,scene)});
  [[2.2,.45,0x9aa0a6],[1.6,.85,0x8a9096],[1.0,1.25,0x9aa0a6],[.5,1.65,0x8a9096]].forEach(p=>cyl(p[0],p[1],p[2],-143.2,p[1]/2,110,scene,true));[[-143.2,110]].forEach(p=>{for(let k=0;k<7;k++){const a=k*.9;inst('sph',p[0]+Math.cos(a)*(.5+k*.25),1.7-k*.1,p[1]+Math.sin(a)*(.5+k*.25),.3,.22,.3,[0x4cb04a,0x7a52b8,0x6cc04a][k%3])}});kreis(-143.2,110,2.3);
  const rk=grp(-156,0,113.3);[-2,2].forEach(x=>cyl(.1,2.3,0x7a5230,x,1.15,0,rk,true));box(4.4,.12,.14,0x6a4220,0,2.25,0,rk);for(let i=0;i<8;i++){const x=-1.8+i*.52;cyl(.012,.3,0x8a7a52,x,2.05,0,rk);cone(.13,.6,i%2?0x9a6ad0:0xb28ae8,x,1.6,0,rk).rotation.x=Math.PI}sperrKasten(-156,113.3,4.4,.5,0);
  bank(-139.3,103,-Math.PI/2);
  for(let i=0;i<5;i++)biene(cx-3+i*1.5,103,1.4+i*.3,i*1.3);for(let i=0;i<3;i++)flatter(cx,103,cx+1,104,5+i*2,[0xe8588a,0xffd45e,0x6ab0e8][i],i*2.1)})();
/* ---------- 29. Backhaus ---------- */
(function(){const cx=150,cz=106.5,g=grp(cx,0,cz);g.rotation.y=Math.PI;
  box(7,.9,5,0x9aa0a6,0,.45,0,g,true);box(7,2.4,5,0xf0e2c0,0,2.1,0,g,true);giebel(g,7,5,3.3,0xa8432f,0xf0e2c0,.55);
  box(1.1,2,.14,0x7a5230,-2.3,1.9,2.55,g);box(1.3,.12,.2,0x5a3a20,-2.3,2.95,2.58,g);box(2.1,1.1,.12,0xfff8e6,.7,2.2,2.55,g);box(1.8,.85,.14,0x2a1a10,.7,2.25,2.58,g);box(2.5,.14,.8,0x9a6a3a,.7,1.5,2.95,g);
  for(let i=0;i<5;i++){const r=box(.62,.08,1.2,i%2?0xfff8e6:0xe0605a,-.2+i*.62,2.95,3.0,g);r.rotation.x=.4}[0,.7,1.3].forEach((x,i)=>sph(.22,0xd9a24a,x,1.72,2.95,g,1.3,.75,.9));
  box(.8,2.2,.8,0xa8543a,2.4,4.6,-1.2,g);box(1,.14,1,0x6a3a2a,2.4,5.75,-1.2,g);rauch(g,2.4,5.9,-1.2);
  box(2.6,1.2,2.4,0x8a8a90,-4.8,.6,0,g,true);sph(1.5,0xb85a3a,-4.8,1.3,0,g,1,.85,.95).castShadow=true;box(.95,.8,.12,0x2a1a10,-4.8,1.1,1.44,g);const gl=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xff9a3a}));gl.position.set(-4.8,.95,1.5);gl.scale.set(.3,.22,.1);g.add(gl);cyl(.25,1.5,0x8a8a90,-4.8,3.2,0,g,true);rauch(g,-4.8,4,0);
  const sh=grp(2.9,0,3.2,g);box(1.4,2.3,.08,0x9a6a3a,0,1.15,-.2,sh,true);[-.66,.66].forEach(x=>box(.08,2.3,.5,0x9a6a3a,x,1.15,0,sh));box(1.4,.08,.5,0x9a6a3a,0,2.3,0,sh);[.6,1.2,1.8].forEach((y,i)=>{box(1.3,.06,.5,0x6a4220,0,y,0,sh);for(let k=0;k<3;k++)sph(.2,i===1?0xc8802a:0xd9a24a,-.4+k*.4,y+.2,0,sh,1.4,.8,.9)});cyl(.07,.9,0xe8c070,.3,1.9,.1,sh).rotation.z=1.4;
  const br=new THREE.Mesh(new THREE.TorusGeometry(.32,.07,5,12),mat(0xc8802a));br.position.set(3.0,2.85,2.64);g.add(br);box(.5,.08,.06,0xc8802a,3.0,2.85,2.66,g);
  sperrKasten(cx,cz,7,5,0);sperrKasten(cx+4.8,cz,2.8,2.6,0);sperrKasten(cx-2.9,cz-3.2,1.5,.7,0);
  const tb=grp(152,0,100.6);box(2.6,.1,1.1,0xe0605a,0,1.0,0,tb,true);box(2.6,.12,.5,0xfff8e6,0,1.02,.2,tb);[-1.1,1.1].forEach(x=>[-.4,.4].forEach(z=>cyl(.06,1,0x6a4220,x,.5,z,tb)));for(let i=0;i<5;i++)sph(.2,0xd9a24a,-.9+i*.45,1.2,(i%2)*.15,tb,1.3,.8,.9);cyl(.07,.7,0xe8c070,.6,1.2,.35,tb).rotation.z=1.4;sperrKasten(152,100.6,2.6,1.2,0);
  const m=person(152,102.3,Math.PI,0xf6f2ea,0x8a6a4a,0x6b4626,'dutt',1.25);box(.7,.9,.08,0xffffff,0,1.05,.3,m.g);cyl(.4,.45,0xffffff,0,.62,0,m.kopf);sph(.5,0xffffff,0,.95,0,m.kopf,.9,.55,.9);kreis(152,102.3,.5);
  holzstapel(158.6,108,.3);[[157.6,102.6],[158.8,103.6],[157.2,104.4]].forEach(p=>sack(p[0],p[1],0xf2eee4,.9));
  const bt=grp(145.6,0,100.4);box(2.2,.1,.9,0xa8743f,0,.9,0,bt,true);[-1,1].forEach(x=>box(.1,.9,.8,0x6a4220,x*.9,.45,0,bt));kreis(145.6,100.4,1.1);scheibe(150,99.5,9,0xe8d9a8,.07);
  tier(katze,146.6,102.2,150,101,1,.4)})();
/* ---------- 30. Fischteich mit Angelsteg ---------- */
(function(){const cx=100,cz=-140,R=10;scheibe(cx,cz,16.5,0xa8d68a,.1);wasserFl(cx,cz,R,WASSER);wasserFl(cx-1.5,cz+1,R*.62,0x6ec0ea,.02);
  const ang=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
  for(let i=0;i<44;i++){const a0=i/44*Math.PI*2,a1=(i+1)/44*Math.PI*2;if(ang(a0,Math.PI/2)<.05||ang(a1,Math.PI/2)<.05)continue;sperrLinie(cx+Math.cos(a0)*(R+.5),cz+Math.sin(a0)*(R+.5),cx+Math.cos(a1)*(R+.5),cz+Math.sin(a1)*(R+.5),.2)}
  box(2.2,.14,8.6,0x8a5a32,cx,.17,-132.6,scene,true);for(let i=0;i<10;i++)box(2.3,.05,.12,0x6a4220,cx,.26,-128.6-i*.85,scene);
  [-1,1].forEach(s=>{for(let i=0;i<4;i++)cyl(.11,1.0,0x6a4220,cx+s*1.15,.5,-129-i*2,scene,true);box(.1,.1,6.6,0x6a4220,cx+s*1.15,.95,-132,scene)});
  sperrLinie(cx-1.3,-128.2,cx-1.3,-136.7,.1);sperrLinie(cx+1.3,-128.2,cx+1.3,-136.7,.1);sperrLinie(cx-1.3,-137,cx+1.3,-137,.1);
  const an=person(cx-.3,-135.6,Math.PI,0x3b8fc4,0x6a5a8a,0x6b4626,'cap',.9);an.g.position.y=-.225;an.bl.rotation.x=-1.45;an.br.rotation.x=-1.45;an.al.rotation.x=-1.2;an.ar.rotation.x=-1.2;
  cyl(.035,3.6,0x6a4a2a,cx-.3,1.92,-137.4,scene).rotation.x=-1.0;cyl(.01,2.7,0xdddddd,cx-.3,1.55,-138.9,scene);sph(.09,0xe0302a,cx-.3,.25,-138.9,scene);
  box(.9,.4,.6,0x4a8a3a,cx+.55,.45,-134,scene,true);eimer(cx+2.9,-127.6,0x3b8fc4,0xf59e3f);
  [[0xf59e3f,3.5,0,.5,7.5],[0xf6f2e6,5.5,2,.38,9],[0xe85a3a,6.8,4,.42,8],[0xf59e3f,4.6,5.5,.55,11],[0xffd45e,2.4,1,.6,10]].forEach((k,i)=>{const f=koi(scene,k[0]);const rr=k[1];f.position.set(cx+rr,.2,cz);f.userData.anim=t=>{const a=t*k[3]+k[2],vx=-Math.sin(a),vz=Math.cos(a),jp=((t+k[2]*3)%k[4])/k[4];let y=.2;if(jp<.1){y+=Math.sin(jp/.1*Math.PI)*1.2}f.position.set(cx+Math.cos(a)*rr,y,cz+Math.sin(a)*rr);f.rotation.y=Math.atan2(-vz,vx);f.rotation.z=jp<.1?Math.cos(jp/.1*Math.PI)*.7:0};lebendig.push({o:f,ph:0})});
  [[-3,-2],[2,3],[4,-4],[-6,3]].forEach((p,i)=>{const e=tier(ente,cx+p[0],cz+p[1],cx,cz,1.05-(i%2)*.15);e.position.y=.2});
  [[-5,-3],[1,-6],[5,2],[-2,4],[6,-5],[-7,1],[3,-1]].forEach(p=>{inst('sph',cx+p[0],.21,cz+p[1],.65,.04,.65,0x3f9a46);inst('sph',cx+p[0]+.1,.27,cz+p[1],.14,.1,.14,0xf8a8c8)});
  for(let i=0;i<40;i++){const a=i/40*Math.PI*2+.07;if(ang(a,Math.PI/2)<.3)continue;inst('sph',cx+Math.cos(a)*(R+1),.16,cz+Math.sin(a)*(R+1),.5+rnd()*.35,.3,.42,0x9aa0a6)}
  for(let i=0;i<34;i++){const a=rnd()*6.283;if(ang(a,Math.PI/2)<.4||ang(a,0)<.3)continue;const r=R+.1+rnd()*.9,h=1.6+rnd(),x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;inst('cyl',x,h/2,z,.04,h,.04,0x8a9a4a);inst('con',x,h,z,.09,.4,.09,0x6a3a22)}
  bank(cx-9.5,cz+9.5,Math.PI);laterne(cx+6.5,cz+10.5);stall(cx+14.5,cz+9.5,4.2,3,2.3,0x8a6a4a,0x3b6fc4,0,'');
  const nz=grp(cx+16,0,cz+5);cyl(.06,2.4,0x7a5230,0,1.2,0,nz,true);const rg=new THREE.Mesh(new THREE.TorusGeometry(.5,.04,5,14),mat(0x6a6a70));rg.position.set(0,2.5,0);nz.add(rg);kreis(cx+16,cz+5,.4)})();
/* ---------- 31. Bach mit Wassermühle und Brücken ---------- */
(function(){const cx=142,cz=-135.4,s=spl(BACHP,2.2),br=[bruecke(124,-141,s,3.4),bruecke(157,-141,s,3.4)];bachBauen(s,3.4,br);
  const g=grp(cx,0,cz);box(8,1.3,6,0x9aa0a6,0,.65,0,g,true);box(8,2.6,6,0xe8dcc0,0,2.6,0,g,true);giebel(g,8,6,3.9,0x6a4a3a,0xe8dcc0,.75);
  [-3.9,-1.3,1.3,3.9].forEach(x=>box(.2,2.6,.1,0x6a4a3a,x,2.6,3.05,g));box(8,.2,.1,0x6a4a3a,0,3.85,3.05,g);box(8,.2,.1,0x6a4a3a,0,1.35,3.05,g);
  box(1.3,2.2,.14,0x6a4220,-1.8,1.1,3.08,g);box(1.1,.9,.12,0xcfeaf5,1.9,2.7,3.08,g);box(1.3,.12,.16,0x6a4a3a,1.9,3.2,3.1,g);box(1.3,.12,.16,0x6a4a3a,1.9,2.2,3.1,g);
  box(.12,.9,1,0xcfeaf5,4.03,2.7,0,g);box(1.1,1.2,.12,0x6a4220,0,5.1,2.95,g);box(.2,.2,1.6,0x6a4220,0,6.1,3.4,g);cyl(.012,1.8,0x8a7a52,0,5.2,4.15,g);box(.9,.8,.7,0x8a5a32,2.7,5.9,-1.5,g);box(.7,.12,.7,0x6a4a3a,2.7,6.4,-1.5,g);
  sperrKasten(cx,cz,8.4,6.4,0);
  const wd=grp(cx,2.7,-139.65);const rim=new THREE.Mesh(new THREE.TorusGeometry(2.55,.12,5,24),mat(0x6a4a2a));wd.add(rim);for(let i=0;i<4;i++)box(.14,5.1,.14,0x6a4a2a,0,0,0,wd).rotation.z=i*Math.PI/4;
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;box(.8,.22,1,0x8a5a32,Math.cos(a)*2.6,Math.sin(a)*2.6,0,wd).rotation.z=a}cyl(.2,1.6,0x4a3220,0,0,.6,wd).rotation.x=Math.PI/2;vmVerschm(wd);wd.userData.anim=t=>{wd.rotation.z=-t*.75};lebendig.push({o:wd,ph:0});
  [[-3.6,4.4],[-2.7,4.9],[-4.4,5.3]].forEach(p=>sack(cx+p[0],cz+p[1],0xf2eee4,.95));
  cyl(1.1,.4,0x9aa0a6,cx+4,.2,cz+4.6,scene,true);cyl(.25,.42,0x4a4a4a,cx+4,.21,cz+4.6,scene);cyl(1,.34,0x8a9096,cx+5.6,.5,cz+3.4,scene,true).rotation.z=.9;kreis(cx+4,cz+4.6,1.1);kreis(cx+5.7,cz+3.4,.9);
  const mu=person(cx-1.8,cz+4.7,Math.PI,0xf6f2ea,0x8a6a4a,0xd0d0d0,'kurz',1.25);cyl(.4,.45,0xf6f2ea,0,.62,0,mu.kopf);kreis(cx-1.8,cz+4.7,.5);schubkarre(cx+8.5,cz+2.9,.8,0xf2eee4);
  [[128,-140.8,.4],[131,-140.2,2.5],[146,-140.7,1]].forEach(p=>{const e=tier(ente,p[0],p[1],p[0]+1,p[1],1,0);e.position.y=.2;e.rotation.y=-.1});
  s.forEach((q,i)=>{if(i%3||i<4)return;const a=s[Math.max(0,i-1)],c=s[Math.min(s.length-1,i+1)],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1,nx=-tz/l,nz=tx/l;[-1,1].forEach(sg=>{if(rnd()<.5)inst('sph',q[0]+nx*sg*2.4,.18,q[1]+nz*sg*2.4,.4+rnd()*.3,.25,.35,0x9aa0a6);if(rnd()<.45){const h=1.3+rnd()*.8;inst('cyl',q[0]+nx*sg*2.2,h/2,q[1]+nz*sg*2.2,.04,h,.04,0x8a9a4a);inst('con',q[0]+nx*sg*2.2,h,q[1]+nz*sg*2.2,.09,.4,.09,0x6a3a22)}})});
  [[116,-147],[167,-146.5]].forEach(p=>{cyl(.45,3.8,0x6a4a32,p[0],1.9,p[1],scene,true);kreis(p[0],p[1],.7);inst('sphT',p[0],4.4,p[1],3,2,3,0x6aa84a);for(let k=0;k<16;k++){const a=k/16*6.283;inst('cyl',p[0]+Math.cos(a)*2.5,2.7,p[1]+Math.sin(a)*2.5,.05,2.5,.05,0x8ac86a)}})})();
/* ---------- 32. Lagerfeuer- und Grillplatz mit Hängematten ---------- */
(function(){const cx=-148,cz=-106;scheibe(cx,cz,10,0xd8c89a,.1);
  for(let i=0;i<9;i++){const a=i/9*6.283;sph(.34,0x8a8f96,cx+Math.cos(a)*1.2,.22,cz+Math.sin(a)*1.2,scene,1.2,.8,1)}kreis(cx,cz,1.6);
  const f=grp(cx,.25,cz);[0,1.2,2.4].forEach(a=>{cyl(.14,1.5,0x4a3220,0,.12,0,f).rotation.set(Math.PI/2,0,a)});
  const FL=[[0xff5a1a,.55,1.5,0,0],[0xff9a2a,.42,1.15,.3,.1],[0xffd040,.3,.85,-.25,.15],[0xff7a2a,.32,.95,.05,-.3]].map(p=>{const m=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:p[0]}));m.scale.set(p[1],p[2],p[1]);m.position.set(p[3],p[2]/2,p[4]);f.add(m);return{m,h:p[2],w:p[1]}});
  f.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{FL.forEach((q,i)=>{const s=1+Math.sin(t*9+i*2)*.16+Math.sin(t*15+i)*.08;q.m.scale.set(q.w*(2-s),q.h*s,q.w*(2-s));q.m.position.y=q.h*s/2})}}},ph:0});rauch(scene,cx+.2,1.8,cz);
  for(let i=1;i<6;i++){const a=i*1.0+.4,x=cx+Math.cos(a)*3.5,z=cz+Math.sin(a)*3.5,gg=grp(x,0,z);gg.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));const l=cyl(.4,2.2,0x8a5a32,0,.4,0,gg,true);l.rotation.z=Math.PI/2;cyl(.36,.06,0xd8b070,1.1,.4,0,gg).rotation.z=Math.PI/2;cyl(.36,.06,0xd8b070,-1.1,.4,0,gg).rotation.z=Math.PI/2;kreis(x+Math.cos(a+1.57)*.7,z+Math.sin(a+1.57)*.7,.55);kreis(x-Math.cos(a+1.57)*.7,z-Math.sin(a+1.57)*.7,.55)}
  const T=[[-157,-111],[-157,-103.5],[-152,-97.5]];T.forEach(p=>{cyl(.38,3.8,0x7a5230,p[0],1.9,p[1],scene,true);sph(1,0x4aa84e,p[0],5,p[1],scene,2.5,1.9,2.5).castShadow=true;sph(1,0x5cba5c,p[0]+1,4.4,p[1]+.6,scene,1.6,1.3,1.6);kreis(p[0],p[1],.65)});
  function hang(a,b,schlaf){const dx=b[0]-a[0],dz=b[1]-a[1],L=Math.hypot(dx,dz),hg=grp((a[0]+b[0])/2,0,(a[1]+b[1])/2);hg.rotation.y=Math.atan2(-dz,dx);const sw=grp(0,0,0,hg),n=8,seg=(L-1.2)/n;
    for(let i=0;i<n;i++){const u=-(L-1.2)/2+seg*(i+.5),u2=u/(L/2),y=1.85-1.05*(1-u2*u2),sl=Math.atan2(1.05*2*u2/(L/2)*-1,1);box(seg*1.06,.07,.95,i%2?0xfff8e6:0xe0605a,u,y,0,sw).rotation.z=Math.atan(4.2*u2/L)}
    [-1,1].forEach(s=>box(.9,.05,.05,0x8a6a4a,s*(L/2-.2),1.95,0,sw).rotation.z=s*.5);
    if(schlaf){const m=kindModell({jacke:0xf59e3f,hose:0x3b6fc4,haut:0xe8b98f,haar:0x6b4626,stil:'zoepfe',rucksack:null},sw);m.g.rotation.z=-Math.PI/2;m.g.scale.setScalar(.7);m.g.position.set(-1.0,1.22,0)}
    vmVerschm(sw);bewegt(sw,t=>{sw.rotation.x=Math.sin(t*.9)*.05})}
  hang(T[0],T[1],true);hang(T[1],T[2],false);
  const gg=grp(-141,0,-108.5);cyl(.75,.14,0x2a2a2a,0,.95,0,gg,true);sph(.75,0x2a2a2a,0,1.0,0,gg,1,.7,1);cyl(.68,.04,0x8a8f96,0,1.18,0,gg);cyl(.6,.04,0xff6a2a,0,1.1,0,gg);[0,2.1,4.2].forEach(a=>cyl(.05,1,0x4a4a4a,Math.cos(a)*.5,.5,Math.sin(a)*.5,gg));for(let i=0;i<4;i++)cyl(.07,.5,0xb8502a,-.35+i*.23,1.25,(i%2-.5)*.15,gg).rotation.z=Math.PI/2;rauch(gg,0,1.4,0);kreis(-141,-108.5,.9);
  const tb=grp(-143,0,-101.6);box(2.6,.12,1.1,0xa8743f,0,.95,0,tb,true);[-1.1,1.1].forEach(x=>[-.4,.4].forEach(z=>cyl(.07,.95,0x6a4220,x,.47,z,tb)));box(2.6,.1,.5,0x9a5a30,0,.5,.95,tb);box(2.6,.1,.5,0x9a5a30,0,.5,-.95,tb);box(1.4,.04,.7,0xe0605a,0,1.03,0,tb);[-.5,.4].forEach(x=>cyl(.2,.05,0xffffff,x,1.07,0,tb));sperrKasten(-143,-101.6,2.8,2.6,0);
  const gr=person(-141,-111.2,0,0xd8433a,0x3a3a44,0x2a1d14,'kurz',1.25);box(.7,.9,.08,0xffffff,0,1.05,.3,gr.g);kreis(-141,-111.2,.5);
  const zt=grp(-140.6,0,-117);cone(2.2,2.5,0xf59e3f,0,1.25,0,zt,true);box(1,1.5,.1,0x3a2a1a,0,.75,1.5,zt);kreis(-140.6,-117,2);
  holzstapel(-139,-112.5,1.57);
  [0,1,2,3,4,5,6,7].forEach(i=>{const t=i/7,x=-157+t*5,z=-103.5+t*6;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:[0xffd45e,0xe0605a,0x6ab0e8,0x8ac24a][i%4]}));l.position.set(x,2.2-Math.sin(t*Math.PI)*.4,z);l.scale.setScalar(.14);scene.add(l)})})();
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
/* ========== Landschaft der zweiten Dichte-Runde: Hecken, Alleen, Streuobstwiesen, Teiche, Blumenwiesen (alles instanziert) ========== */
(function(){
  function frei2(x,z,m){m=m||1.6;if(x<GRENZE.x0+3||x>GRENZE.x1-3||z<TORZ+6||z>GRENZE.z1-1.5)return false;
    for(const c of colliders)if(Math.abs(x-c.x)<c.r+m&&Math.abs(z-c.z)<c.r+m&&Math.hypot(x-c.x,z-c.z)<c.r+m)return false;
    for(const k of sperrKaesten)if(Math.hypot(x-k.x,z-k.z)<Math.hypot(k.hb,k.ht)+m)return false;
    for(const q of sperrLinien){const vx=q.x2-q.x1,vz=q.z2-q.z1,l2=vx*vx+vz*vz||1;let t=((x-q.x1)*vx+(z-q.z1)*vz)/l2;t=t<0?0:t>1?1:t;if(Math.hypot(x-q.x1-vx*t,z-q.z1-vz*t)<q.r+m)return false}
    for(const e of EXTRAZONEN)if(Math.hypot(x-e.x,z-e.z)<e.r+m)return false;
    for(const s of WEGE)for(let i=0;i<s.length;i+=1)if(Math.abs(s[i][0]-x)<m+3&&Math.abs(s[i][1]-z)<m+3&&Math.hypot(s[i][0]-x,s[i][1]-z)<m+2.6)return false;
    if(nahNeu(x,z,m+3.4))return false;if(Math.hypot(x,z-92)<18||Math.hypot(x-FEST.x,z-FEST.z)<24)return false;return true}
  const GR=[0x3f8a3a,0x4a9a44,0x56a04a];
  function hecke(x1,z1,x2,z2){const L=Math.hypot(x2-x1,z2-z1),n=Math.max(2,Math.round(L/1.5));for(let i=0;i<=n;i++){const t=i/n,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;inst('sph',x,.72,z,.95,.78,.85,GR[i%3]);if(i%4===0)inst('sph',x,1.3,z,.55,.4,.55,GR[(i+1)%3])}sperrLinie(x1,z1,x2,z2,.6)}
  hecke(-174.6,114.6,-14,114.6);hecke(14,114.6,174.6,114.6);hecke(-174.6,-152,-174.6,114.6);hecke(174.6,-152,174.6,114.6);
  const FR=[0xe0302a,0xf2c230,0xd8502a];
  function obstbaum(x,z,s){s=s||1;inst('cyl',x,1.1*s,z,.26*s,2.2*s,.26*s,0x7a5230);inst('sphT',x,3.0*s,z,2.1*s,1.7*s,2.1*s,[0x5cb04a,0x4aa84e,0x68b858][Math.floor(rnd()*3)]);for(let k=0;k<6;k++){const a=k*1.05+x;inst('sph',x+Math.cos(a)*1.75*s,(2.5+(k%3)*.4)*s,z+Math.sin(a)*1.75*s,.17,.17,.17,FR[k%3])}kreis(x,z,.6*s)}
  function allee(pts,abst,w){const s=spl(pts,3);let acc=0,n=0;for(let i=1;i<s.length;i++){const a=s[i-1],b=s[i],l=Math.hypot(b[0]-a[0],b[1]-a[1]);acc+=l;if(acc<abst)continue;acc=0;const tx=b[0]-a[0],tz=b[1]-a[1],ll=Math.hypot(tx,tz)||1,nx=-tz/ll,nz=tx/ll;[-1,1].forEach(sg=>{const x=b[0]+nx*sg*(w/2+3.4),z=b[1]+nz*sg*(w/2+3.4);if(!frei2(x,z,1.2))return;const sc=.9+rnd()*.25;inst('cyl',x,1.3*sc,z,.3*sc,2.6*sc,.3*sc,0x7a5230);inst('sphT',x,3.6*sc,z,1.9*sc,1.7*sc,1.9*sc,n%2?0x4aa84e:0x5cba5c);kreis(x,z,.6*sc)});n++}}
  [4,7,8].forEach(k=>allee(NEUPFADE[k].p,8.5,NEUPFADE[k].w));allee(NEUPFADE[0].p,9,3.2);allee(NEUPFADE[2].p,9,3.2);
  /* Streuobstwiesen */
  function streuobst(x0,z0,x1,z1,dx,dz,keep){for(let x=x0;x<=x1;x+=dx)for(let z=z0;z<=z1;z+=dz){const px=x+(rnd()-.5)*2.4,pz=z+(rnd()-.5)*2.4;if(keep&&!keep(px,pz))continue;if(frei2(px,pz,1.6))obstbaum(px,pz,.85+rnd()*.3)}}
  /* Teiche */
  function teich(cx,cz,r,enten){wasserFl(cx,cz,r,WASSER);wasserFl(cx-.5,cz+.4,r*.6,0x6ec0ea,.02);sperrRing(cx,cz,r+.45,26);
    for(let i=0;i<20;i++){const a=i/20*6.283+.1;inst('sph',cx+Math.cos(a)*(r+.8),.16,cz+Math.sin(a)*(r+.8),.45+rnd()*.3,.28,.4,0x9aa0a6)}
    for(let i=0;i<16;i++){const a=rnd()*6.283,rr=r+.1+rnd()*.7,h=1.4+rnd()*.9,x=cx+Math.cos(a)*rr,z=cz+Math.sin(a)*rr;inst('cyl',x,h/2,z,.04,h,.04,0x8a9a4a);inst('con',x,h,z,.09,.38,.09,0x6a3a22)}
    for(let i=0;i<3;i++){const a=i*2.2,rr=r*.5;inst('sph',cx+Math.cos(a)*rr,.21,cz+Math.sin(a)*rr,.55,.04,.55,0x3f9a46);inst('sph',cx+Math.cos(a)*rr+.1,.27,cz+Math.sin(a)*rr,.13,.1,.13,0xf8a8c8)}
    for(let i=0;i<enten;i++){const e=tier(ente,cx+Math.cos(i*3)*r*.4,cz+Math.sin(i*3)*r*.4,cx,cz,.95-i*.1);e.position.y=.2}}
  const pS=(x,z)=>Math.hypot(x+62,z-105)>7.5;
  teich(-62,105,4.6,2);streuobst(-90,99,-33,112,8.6,8.4,pS);
  streuobst(34,99,90,112,8.6,8.4,(x,z)=>Math.hypot(x-62,z-105)>7.5);teich(62,105,4.2,2);
  streuobst(-90,-154,-70,-118,9,9);streuobst(70,-154,80,-118,8,9);
  teich(-20,-124,4.6,2);teich(22,-121,3.8,1);
  /* Blumenwiesen */
  const BL=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0,0xf47ab0];
  function wiese(cx,cz,rx,rz,n){for(let i=0;i<n;i++){const a=rnd()*6.283,r=Math.sqrt(rnd()),x=cx+Math.cos(a)*r*rx,z=cz+Math.sin(a)*r*rz;if(!frei2(x,z,.7)||Math.abs(x-wegX(z))<4.6)continue;const h=.4+rnd()*.3;inst('cyl',x,h/2,z,.025,h,.025,0x3f9a46);inst('blm',x,h+.04,z,.14,.1,.14,BL[(i+Math.floor(x/7))%6]);if(i%5===0)inst('con',x+.2,.14,z,.1,.28,.1,0x4aa040)}}
  wiese(15,0,8,26,110);wiese(-15,0,8,26,110);wiese(15,-70,8,22,90);wiese(-15,-70,8,22,90);wiese(14,-126,7,18,90);wiese(-14,-126,6,18,80);wiese(-55,-108,20,6,100);wiese(55,-108,20,6,100);wiese(130,-151,22,5,90);wiese(-62,98,26,3,60);wiese(60,98,26,3,60);wiese(-130,-155,18,4,60);
  /* Hasen: Wiesen */
  void 0})();
/* ---------- Bewegung: Wolken, Schwalben, freilaufende Hühner, Hofkatze, Hofhund ---------- */
(function(){
  for(let i=0;i<7;i++){const g=grp(0,48+rnd()*10,0);const n=2;for(let k=0;k<n;k++)sph(1,0xffffff,(k-n/2)*4+rnd()*2,rnd()*1.5,(rnd()-.5)*4,g,5+rnd()*2,2+rnd(),3+rnd()*2);const x0=rnd()*600,z=-200+rnd()*340,v=1.2+rnd()*1.4;bewegt(g,t=>{g.position.x=((x0+t*v)%600+600)%600-300;g.position.z=z})}
  for(let i=0;i<4;i++){const g=grp(0,12,0);sph(.12,0x1a2a4a,0,0,0,g,1.6,.7,.7);box(.14,.05,.1,0xe0605a,.17,0,0,g);const fl=[-1,1].map(s=>box(.5,.03,.18,0x1a2a4a,0,.02,s*.25,g));const cx=-90+rnd()*180,cz=-120+rnd()*190,r=22+rnd()*20,ph=rnd()*6,sp=.35+rnd()*.2;g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.7,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.7;g.position.set(x,10+Math.sin(t*.8+ph)*2.5,z);g.rotation.y=Math.atan2(-vz,vx);fl[0].rotation.x=Math.sin(t*18)*.7;fl[1].rotation.x=-Math.sin(t*18)*.7};leben(g,ph)}
  const lauf=(w,f,ph)=>{bewegt(w,t=>{const a=t*f.v+ph,x=f.x+Math.cos(a)*f.rx,z=f.z+Math.sin(a)*f.rz,vx=-Math.sin(a)*f.rx,vz=Math.cos(a)*f.rz;w.position.set(x,0,z);w.rotation.y=Math.atan2(-vz,vx)})};
  for(let i=0;i<5;i++){const w=grp(0,0,0);const h=huhn(w,i%5===0);leben(h,rnd()*6);lauf(w,{x:[-10,10,-8,12,0,-14,14][i],z:[84,80,52,58,18,-28,-24][i],rx:4+rnd()*3,rz:3+rnd()*3,v:.12+rnd()*.06},rnd()*6)}
  for(let i=0;i<2;i++){const w=grp(0,0,0);const k=kueken(w);leben(k,rnd()*6);lauf(w,{x:[-9,11,3,-12][i],z:[82,56,16,-26][i],rx:3,rz:2.5,v:.2},rnd()*6)}
  const strolch=(fn,zc,span,side,ph)=>{const w=grp(0,0,0);const a=fn(w);leben(a,ph);bewegt(w,t=>{const s=t*.1+ph,z=zc+Math.sin(s)*span,vz=Math.cos(s)*span*.1;w.position.set(wegX(z)+side+Math.sin(t*.6)*.8,0,z);w.rotation.y=vz>0?-Math.PI/2:Math.PI/2})};
  strolch(katze,50,45,3.5,0);strolch(hund,10,55,-3.2,1);strolch(katze,-100,35,3.6,3);strolch(hund,-60,35,3.3,2);strolch(katze,60,-35,3.5,5);strolch(hund,-20,60,-3.3,4);
})();
/* ========== Bewegung der zweiten Dichte-Runde: Traktor mit Anhänger, Heuwagen mit Kindern, Pferdekutsche, Hasen ========== */
(function(){
  /* Traktor mit Anhänger fährt den Feldweg im Süden hin und zurück */
  (function(){const w=grp(0,0,0),tr=traktor(w),ah=anhaenger(tr);ah.position.set(-3.6,0,0);vmVerschm(ah);w.userData.anim=t=>{if(tr.userData.anim)tr.userData.anim(t)};
    fahren(w,pendel(spl(NEUPFADE[2].p,2.5).filter(q=>q[0]>24&&q[0]<142),1.0),2.8,0)})();
  /* Heuwagen mit winkenden Kindern fährt auf dem Querweg bei z = -35 */
  (function(){const w=grp(0,0,0),tr=traktor(w),ah=anhaenger(tr);ah.position.set(-3.6,0,0);
    [[-.9,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe'],[0,0x4caf6a,0x6a5a8a,0x6b4626,'cap'],[.9,0xf59e3f,0x3b6fc4,0x2a1d14,'pferd']].forEach(k=>{const m=kindModell({jacke:k[1],hose:k[2],haut:0xe8b98f,haar:k[3],stil:k[4],rucksack:null},ah);m.g.position.set(k[0],1.9,0);m.g.scale.setScalar(.55);m.al.rotation.z=-2.6;m.ar.rotation.z=2.6});
    vmVerschm(ah);w.userData.anim=t=>{if(tr.userData.anim)tr.userData.anim(t)};
    fahren(w,pendel(WEGE[2].filter(q=>q[0]>-125&&q[0]<125),1.3),3.2,40)})();
  /* Pferdekutsche fährt eine Runde auf dem Querweg bei z = 35 */
  (function(){const w=grp(0,0,0),kb=grp(0,0,0,w),wr=[];
    box(3,.25,1.8,0x6a4a2a,0,1.15,0,kb,true);box(3.04,.08,1.84,0xe8c230,0,1.32,0,kb);[-1,1].forEach(s=>box(2.8,1.5,.14,0x2f6b4a,0,2.05,s*.87,kb,true));box(.14,1.5,1.8,0x2f6b4a,-1.4,2.05,0,kb);box(3.3,.16,2.3,0x2a1a10,0,2.9,0,kb,true);box(2.6,.2,2,0x3a2a1a,0,3.08,0,kb);
    [-1,1].forEach(s=>glas(1.3,.8,.1,0,2.4,s*.94,kb));box(.9,.45,1.5,0x8a3a30,-.7,1.55,0,kb);box(.2,.9,1.6,0x6a4a2a,1.3,1.7,0,kb);box(1.1,.3,1.7,0x6a4a2a,1.95,2.0,0,kb);
    [-1,1].forEach(s=>sph(.16,0xfff0b8,1.55,2.65,s*.95,kb));box(3,.12,.12,0x6a4a2a,3.2,1.0,0,kb);box(.12,.12,1.9,0x6a4a2a,4.4,1.3,0,kb);
    const fk=kindModell({jacke:0x2a3a5a,hose:0x3a3a44,haut:0xe8b98f,haar:0x2a1d14,stil:'kurz',rucksack:null},kb);fk.g.rotation.y=Math.PI/2;fk.g.position.set(1.95,1.42,0);fk.bl.rotation.x=-1.45;fk.br.rotation.x=-1.45;fk.al.rotation.x=-1.0;fk.ar.rotation.x=-1.0;cyl(.4,.6,0x1a1a1a,0,.85,0,fk.kopf);cyl(.55,.06,0x1a1a1a,0,.56,0,fk.kopf);
    [[-1.0,.75],[1.1,.55]].forEach(p=>[-1,1].forEach(s=>{const g=grp(p[0],p[1],s*1.05,kb);const r=new THREE.Mesh(new THREE.TorusGeometry(p[1]*.92,.07,5,16),mat(0x2a1a10));g.add(r);for(let i=0;i<4;i++)box(p[1]*1.84,.08,.08,0xe8c230,0,0,0,g).rotation.z=i*Math.PI/4;cyl(.14,.2,0xe8c230,0,0,0,g).rotation.x=Math.PI/2;wr.push({g,r:p[1]})}));
    vm.apply(null,[kb].concat(wr.map(q=>q.g)));
    const h1=pferd(w,0x8a5a2a,0x2a1d14),h2=pferd(w,0xf2e8d0,0xc8b8a0);[[h1,.85],[h2,-.85]].forEach(q=>{q[0].position.set(5.2,0,q[1]);q[0].scale.setScalar(.62)});
    w.userData.anim=t=>{wr.forEach(q=>{q.g.rotation.z=-t*4.5/q.r});h1.userData.anim(t);h2.userData.anim(t+1.3);kb.position.y=Math.abs(Math.sin(t*6))*.03};
    fahren(w,pendel(WEGE[1].filter(q=>q[0]>-80&&q[0]<80),1.2),4.5,0)})();
  /* Hasen hoppeln über die Wiesen */
  (function(){const hl=(cx,cz,rx,rz,v,ph)=>{const w=grp(0,0,0);const h=hase(w);leben(h,ph*2);bewegt(w,t=>{const a=t*v+ph,x=cx+Math.cos(a)*rx,z=cz+Math.sin(a)*rz,vx=-Math.sin(a)*rx,vz=Math.cos(a)*rz;w.position.set(x,0,z);w.rotation.y=Math.atan2(-vz,vx)})};
    [[16,12,5,9,.17,0],[-17,-14,5,9,.15,2],[16,-72,5,8,.16,1],[-55,-108,9,3,.1,4],[55,-108,9,3,.11,3],[14,-126,4,8,.17,5],[130,-151,9,2.5,.1,6],[-62,99.5,10,2.5,.1,7],[-130,-154,8,2,.12,8]].forEach(a=>hl.apply(null,a))})();
})();
/* ========== Nordstreifen hinter dem Tor (24.11.2026): Obsthain, Schäferei, Weidenwäldchen, Feldwege, Hecken, Wiesen, Strohballen, Traktor und Radfahrer ========== */
(function(){
  let ns=24112026;const nr=()=>{ns=(ns*16807)%2147483647;return(ns-1)/2147483646};
  /* Eigener Zufall (nr), damit die übrige Welt unverändert bleibt. Orte werden hier eingetragen (Minikarte). */
  /* ACHTUNG (24.11.2026): Nördlich von TORZ (z < -160) ist im Spiel NICHTS erreichbar (unsichtbare Tor-Wand der Engine; das Tor öffnet sich erst nach allen Rätseln zum Finale). Alles, was die Kinder besuchen sollen, steht südlich davon. Der Nordstreifen (Hecken, Feldwege, Stoppelfeld, Wiesen, Heu) ist reine Kulisse hinter dem Tor. */
  /* Die drei neuen Orte liegen auf freien Flächen im Süden (per Hindernis-Raster geprüft) und hängen mit Stichwegen am Hauptweg: Obsthain westlich des Hauptwegs bei z = 56, Schäferei östlich bei z = -15, Weidenwäldchen westlich bei z = -82. */
  const ZO={name:'Obsthain',x:-14.5,z:56,r:17.5},ZS={name:'Schäferei',x:13,z:-15,r:15.8},ZB={name:'Weidenwäldchen',x:-13,z:-82,r:14.8};
  const ANDERE=EXTRAZONEN.concat([BEREICHE.obstgarten&&{x:BEREICHE.obstgarten.x,z:BEREICHE.obstgarten.z,r:19},{x:0,z:92,r:19}].filter(Boolean));
  [ZO,ZS,ZB].forEach(e=>EXTRAZONEN.push(e));
  const PW=[[-3,-168],[-22,-168.6],[-45,-169.4],[-68,-169],[-88,-169.2],[-112,-169.6],[-140,-169.2],[-164,-169]];
  const PE=[[3,-168],[22,-168.6],[45,-169.4],[60,-169.2],[95,-169.6],[130,-169.2],[150,-169.4],[164,-169]];
  /* Stichwege der drei Orte (vom Hauptweg zum Zugang) */
  const AB=[[[ZO.x,ZO.z+2],[ZO.x,ZO.z+19],[ZO.x+6.5,ZO.z+22.5],[wegX(78),78]],
    [[ZS.x,ZS.z+2],[ZS.x,ZS.z+16.5],[ZS.x-7,ZS.z+19.5],[wegX(5),5]],
    [[wegX(-66),-66],[ZB.x+7,-66],[ZB.x-2.3,-73],[ZB.x-2.3,ZB.z+2.5]]];
  const SP=[PW,PE].map(p=>spl(p,3)),SPN=AB.map(p=>spl(p,3));
  const nahPfad=(x,z,m)=>{for(const s of SP)for(const q of s)if(Math.hypot(q[0]-x,q[1]-z)<m)return true;return false};
  const nahStich=(x,z,m)=>{for(const s of SPN)for(const q of s)if(Math.hypot(q[0]-x,q[1]-z)<m)return true;return false};
  /* Alte Zufallsbäume, Büsche und Gras auf den Flächen der drei Orte, auf den Stichwegen und auf den Nordwegen entfernen (nicht in Nachbarorten) */
  (function(){const inN=(x,z)=>{for(const e of ANDERE)if(Math.hypot(x-e.x,z-e.z)<e.r-.5)return false;for(const e of[ZO,ZS,ZB])if(Math.hypot(x-e.x,z-e.z)<e.r+3)return true;return nahStich(x,z,3.6)};
    const inB=(x,z)=>(Math.abs(x)>22&&nahPfad(x,z,4.5))||inN(x,z);
    for(const k in IR)IR[k]=IR[k].filter(a=>!inB(a[0],a[2]));
    for(let i=colliders.length-1;i>=0;i--){const c=colliders[i];if(c.r<(Math.abs(c.x)>22&&nahPfad(c.x,c.z,4.5)?1.6:1.25)&&inB(c.x,c.z))colliders.splice(i,1)}})();
  weg(PW,3.2);weg(PE,3.2);AB.forEach(p=>weg(p,2.8));
  /* Tor-Lücke freiräumen (24.11.2026): Zufallsbäume (kleine Hindernis-Kreise samt Instanzen) direkt vor und hinter dem Tor sperrten den 5 m breiten Gang; die Torpfosten (x = ±4,2) bleiben fest */
  (function(){const weg1=[];for(let i=colliders.length-1;i>=0;i--){const c=colliders[i];if(c.r<1.25&&Math.abs(c.x)<5.2&&Math.abs(c.z-TORZ)<5&&!(Math.abs(Math.abs(c.x)-4.2)<.1&&Math.abs(c.z-TORZ)<.1)){weg1.push(c);colliders.splice(i,1)}}
    for(const k in IR)IR[k]=IR[k].filter(a=>!weg1.some(c=>Math.hypot(a[0]-c.x,a[2]-c.z)<2.3))})();
  const wp=(x,z,ry,lx,lz)=>[x+lx*Math.cos(ry)+lz*Math.sin(ry),z-lx*Math.sin(ry)+lz*Math.cos(ry)];
  const freiN=(x,z,m)=>{m=m||1;if(x<-171||x>171||z<-211||z>-164)return false;
    for(const c of colliders)if(Math.abs(x-c.x)<c.r+m&&Math.abs(z-c.z)<c.r+m&&Math.hypot(x-c.x,z-c.z)<c.r+m)return false;
    for(const k of sperrKaesten)if(Math.hypot(x-k.x,z-k.z)<Math.hypot(k.hb,k.ht)+m)return false;
    for(const q of sperrLinien){const vx=q.x2-q.x1,vz=q.z2-q.z1,l2=vx*vx+vz*vz||1;let t=((x-q.x1)*vx+(z-q.z1)*vz)/l2;t=t<0?0:t>1?1:t;if(Math.hypot(x-q.x1-vx*t,z-q.z1-vz*t)<q.r+m)return false}
    if(Math.hypot(x,z+190)<22)return false;if(x>-166&&x<-126&&z>-208&&z<-178)return false;if(z>-193&&z<-183&&x<16&&x>-62)return false;if(nahPfad(x,z,m+2.2))return false;return true};
  const GR=[0x3f8a3a,0x4a9a44,0x56a04a];
  function hecke(x1,z1,x2,z2){const L=Math.hypot(x2-x1,z2-z1),n=Math.max(2,Math.round(L/2));for(let i=0;i<=n;i++){const t=i/n,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;inst('sph',x,.78,z,1.25,.85,1.0,GR[i%3]);if(i%5===0)inst('sph',x,1.35,z,.7,.4,.6,GR[(i+1)%3])}sperrLinie(x1,z1,x2,z2,.6)}
  function weidezaun(x1,z1,x2,z2){const L=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(L/2.4)),a=-Math.atan2(z2-z1,x2-x1);for(let i=0;i<=n;i++){const t=i/n;inst('cyl',x1+(x2-x1)*t,.6,z1+(z2-z1)*t,.09,1.2,.09,0x8b5a2b)}[.95,.55].forEach(h=>inst('box',(x1+x2)/2,h,(z1+z2)/2,L,.07,.1,0xa87846,a));sperrLinie(x1,z1,x2,z2,.15)}
  const BL=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0,0xf47ab0];
  function wiese(cx,cz,rx,rz,n){n=Math.round(n*.42);for(let i=0;i<n;i++){const a=nr()*6.283,r=Math.sqrt(nr()),x=cx+Math.cos(a)*r*rx,z=cz+Math.sin(a)*r*rz;if(!freiN(x,z,.5))continue;const h=.4+nr()*.3;inst('box',x,h/2,z,.05,h,.05,0x3f9a46);inst('blm',x,h+.04,z,.17,.12,.17,BL[(i+Math.floor(x/7))%6])}}
  function leiter(x,z,ry,len,ang){const g=grp(x,0,z);g.rotation.y=ry;const lg=grp(0,0,0,g);lg.rotation.x=ang;[-.34,.34].forEach(s=>box(.09,len,.09,0xb8874a,s,len/2,0,lg,true));for(let i=1;i<=Math.floor(len/.45);i++)box(.68,.07,.08,0xd0a060,0,i*.45-.1,0,lg);kreis(x,z,.45);return g}
  const MS=[];
  function mensch(x,z,rot,jk,hs,hr,stil,s,y){const m=person(x,z,rot,jk,hs,hr,stil,s);if(y)m.g.position.y=y;MS.push(m);return m}
  function hut(m,f,br){cyl(.62*br,.05,f,0,.52,0,m.kopf);cyl(.44,.34,f,0,.72,0,m.kopf)}
  /* Arme heben und senken (Obst pflücken): Arme einzeln verschmelzen, Mensch bleibt beweglich */
  function pfluecker(m,ph){m.pf=1;vm(m.g,m.al,m.ar);bewegt(m.g,t=>{m.al.rotation.x=-2.55+Math.sin(t*2.1+ph)*.32;m.ar.rotation.x=-2.55+Math.sin(t*2.1+ph+2.2)*.32})}
  function korb2(x,z,fr){const g=grp(x,0,z);cyl(.36,.36,0xc9a46a,0,.18,0,g,true);const h=new THREE.Mesh(new THREE.TorusGeometry(.3,.03,5,10,Math.PI),mat(0xa8743f));h.position.y=.34;g.add(h);for(let i=0;i<5;i++)inst('blm',x+Math.cos(i*1.3)*.2,.42,z+Math.sin(i*1.3)*.2,.13,.12,.13,fr)}
  function fernglas(m){[-1,1].forEach(s=>cyl(.12,.5,0x2a2a2a,s*.2,0,.62,m.kopf).rotation.x=Math.PI/2);m.al.rotation.x=m.ar.rotation.x=-2.2}

  /* ---------- 36. Obsthain mit Leitern und Erntekörben ---------- */
  (function(){const b=ZO;gehege(b,17,ZW(0x8fcf6c,0xe6eef4),Math.PI/2,64);
    const AP=[[0xe0302a,0x5cb04a],[0xd8502a,0x4aa84e],[0xc8302a,0x68b858]],BI=[0xd8d040,0x7fb84a];
    const T=[[-5.5,-10],[-5.5,-3],[-5.5,4],[5.5,-10],[5.5,-3],[5.5,4],[-10,-9],[-10,-2],[-10,5],[10,-9],[10,-2],[10,5],[-13.5,-4],[-13.5,3],[13.5,-4],[13.5,3]];
    T.forEach((p,i)=>{const x=b.x+p[0],z=b.z+p[1],s=.92+nr()*.14;
      if(i%3===1){inst('cyl',x,1.2*s,z,.24*s,2.4*s,.24*s,0x7a5230);inst('sphT',x,3.3*s,z,1.7*s,2.2*s,1.7*s,BI[1]);inst('sphT',x+.6*s,2.6*s,z+.4*s,1.1*s,1.2*s,1.1*s,0x6aa840);for(let k=0;k<8;k++){const a=k*.8+i;inst('sph',x+Math.cos(a)*1.55*s,(2.3+(k%4)*.45)*s,z+Math.sin(a)*1.55*s,.15,.24,.15,BI[0])}for(let k=0;k<3;k++){const a=k*2.1+i;inst('sph',x+Math.cos(a)*(1+k*.5),.09,z+Math.sin(a)*(1+k*.5),.12,.12,.12,BI[0])}}
      else{const c=AP[i%3];inst('cyl',x,1.1*s,z,.26*s,2.2*s,.26*s,0x7a5230);inst('sphT',x,3.0*s,z,2.1*s,1.7*s,2.1*s,c[1]);inst('sphT',x+1.1*s,2.7*s,z+.6*s,1.3*s,1.1*s,1.3*s,0x4a9a44);inst('sphT',x-1.0*s,2.8*s,z-.5*s,1.2*s,1.0*s,1.2*s,0x5cba5c);for(let k=0;k<9;k++){const a=k*.7+i;inst('sph',x+Math.cos(a)*1.85*s,(2.3+(k%4)*.4)*s,z+Math.sin(a)*1.85*s,.17,.17,.17,c[0])}for(let k=0;k<4;k++){const a=k*1.7+i;inst('sph',x+Math.cos(a)*(1+k*.45),.09,z+Math.sin(a)*(1+k*.45),.13,.13,.13,c[0])}}
      kreis(x,z,.6*s)});
    /* Leitern an den Bäumen */
    const rA=Math.PI/2;
    leiter(b.x-5.5+3.2,b.z-3,-rA,5,.55);const p1=mensch(b.x-5.5+1.7,b.z-3,-rA,0xe0605a,0x3b6fc4,0x6b4626,'zoepfe',.8,2.4);pfluecker(p1,0);korb2(b.x-5.5+3.6,b.z-3.9,0xe0302a);
    leiter(b.x+5.5-3.2,b.z+4,rA,5,.55);const p2=mensch(b.x+5.5-1.7,b.z+4,rA,0x4caf6a,0x6a5a8a,0xe8c24a,'cap',.8,2.4);pfluecker(p2,1.7);
    leiter(b.x+10,b.z-2+3.2,Math.PI,5,.55);
    /* Pflücker am Boden, Körbe, Kisten */
    const q1=mensch(b.x-2.4,b.z-5.5,-.6,0xf59e3f,0x3a4a6a,0x2a1d14,'kurz',1,0);korb2(b.x-1.6,b.z-5.1,0xe0302a);
    const q2=mensch(b.x+2.6,b.z+1,2.2,0x3b8fc4,0x6a5a3a,0xb5651d,'pferd',.95,0);korb2(b.x+3.3,b.z+.4,0xd8d040);
    const q3=mensch(b.x+6.5,b.z-5.8,.8,0x9b6fd0,0x3a3a44,0x1b1410,'dutt',.85,0);pfluecker(q3,.6);
    [[-8.2,-6.2,0xe0302a],[-12,0,0xd8502a],[8,0,0xd8d040],[12.8,-6.5,0xe0302a],[2.2,-11.6,0xd8d040],[-3,8.4,0xe0302a],[7.6,8,0xe0302a]].forEach(p=>korb2(b.x+p[0],b.z+p[1],p[2]));
    function stapel(x,z,rot,n,fr){const g=grp(x,0,z);g.rotation.y=rot;for(let i=0;i<n;i++)box(1.1,.4,.8,0xa8743f,0,.21+i*.42,0,g,true);for(let i=0;i<8;i++){const q=wp(x,z,rot,-.4+(i%4)*.27,(i%2-.5)*.4);inst('blm',q[0],.42*n+.14+(i>3?.07:0),q[1],.15,.13,.15,fr)}sperrKasten(x,z,1.2,.9,rot)}
    stapel(b.x+9.6,b.z+10.2,.3,3,0xe0302a);stapel(b.x+11.1,b.z+9.8,.1,2,0xd8d040);stapel(b.x-1.2,b.z-12.2,0,2,0xe0302a);
    /* Leiterwagen mit Äpfeln */
    (function(){const x=b.x-8.5,z=b.z+10.5,ry=.28,g=grp(x,0,z);g.rotation.y=ry;box(3.6,.22,1.7,0x8a5a32,0,1.0,0,g,true);
      [-1,1].forEach(s=>{box(3.6,.08,.1,0xa8743f,0,1.95,s*.85,g);box(3.6,.08,.1,0xa8743f,0,1.5,s*.85,g);for(let i=0;i<6;i++)box(.1,.95,.1,0x9a6a3a,-1.75+i*.7,1.5,s*.85,g)});
      box(.1,.95,1.7,0x9a6a3a,-1.8,1.5,0,g);box(.1,.95,1.7,0x9a6a3a,1.8,1.5,0,g);
      [[-1.1,.72],[1.1,.52]].forEach(p=>[-1,1].forEach(s=>{const w=cyl(p[1],.14,0x4a3220,p[0],p[1],s*1.0,g,true);w.rotation.x=Math.PI/2;cyl(p[1]*.3,.2,0xc9a46a,p[0],p[1],s*1.0,g).rotation.x=Math.PI/2}));
      box(2.6,.1,.14,0x6a4220,3.0,.78,0,g);
      for(let i=0;i<3;i++)box(1.0,.4,1.3,0xa8743f,-1.05+i*1.05,1.32,0,g,true);for(let i=0;i<14;i++){const q=wp(x,z,ry,-1.5+(i%7)*.5,(i%2?.35:-.3));inst('blm',q[0],1.68+(i>6?.12:0),q[1],.18,.16,.18,i%3?0xe0302a:0xd8502a)}
      sperrKasten(x,z,3.8,2.2,ry)})();
    schubkarre(b.x-2.6,b.z-8.8,.9,0xd8d040);
    /* Gerätehäuschen, Bank, Tränke, Hund */
    stall(b.x+1,b.z-14.2,5,3,2.4,0xc98a4b,0x6a4a3a,0,'');bank(b.x+13.2,b.z+8.5,-Math.PI/2+.4);tonne(b.x-12.8,b.z+9.4);eimer(b.x-3.3,b.z-3.6,0xe0605a,0xe0302a);eimer(b.x+4.3,b.z+8.2,0x3b8fc4,0xd8d040);
    tier(hund,b.x+4.5,b.z-1.5,b.x,b.z,.8,.6);
    for(let i=0;i<4;i++)flatter(b.x,b.z,b.x-3+i*3,b.z-1,4+i,[0xf8f4e0,0xffd45e,0xf59e3f,0xffffff][i],i*1.7)
  })();

  /* ---------- 37. Schäferei mit Schäferwagen, Herde und Hütehund ---------- */
  (function(){const b=ZS,K=.84;gehege(b,15,ZW(0x9fd67c,0xe8f0f6),Math.PI/2,60);
    /* Schäferwagen: grüner Holzaufbau, rotes Dach, Eisenräder, Ofenrohr, Treppe an der Tür */
    (function(){const x=b.x+9.24,z=b.z-6.72,ry=-2.5,g=grp(x,0,z);g.rotation.y=ry;
      box(4.4,.2,2.3,0x6a4a2a,0,.95,0,g,true);box(4.4,1.8,2.2,0x6a8f5a,0,1.9,0,g,true);
      const dach=cyl(1.2,4.9,0x9a3a30,0,2.8,0,g,true);dach.rotation.z=Math.PI/2;
      box(.12,1.55,.9,0x7a5230,2.22,1.85,0,g);box(.1,.55,.55,0xcfeaf5,2.28,2.1,0,g);box(.12,.2,.95,0xf6f2e6,2.22,2.7,0,g);
      [-1,1].forEach(s=>{box(1.0,.8,.12,0xf6f2e6,.4,2.05,s*1.12,g);box(.82,.62,.14,0xcfeaf5,.4,2.05,s*1.12,g)});
      [[-1.2,.8],[1.3,.62]].forEach(p=>[-1,1].forEach(s=>{const w=cyl(p[1],.14,0x3a3a3a,p[0],p[1],s*1.3,g,true);w.rotation.x=Math.PI/2;cyl(p[1]*.3,.2,0xc9a46a,p[0],p[1],s*1.3,g).rotation.x=Math.PI/2;for(let i=0;i<3;i++)box(p[1]*1.8,.05,.05,0x3a3a3a,p[0],p[1],s*1.3+s*.08,g).rotation.z=i*Math.PI/3}));
      box(1.2,.1,.14,0x3a3a3a,-2.8,.75,0,g);cyl(.22,.1,0x3a3a3a,-3.4,.2,0,g).rotation.x=Math.PI/2;
      [[2.9,.4],[3.3,.2]].forEach(p=>box(.6,.14,1.1,0x9a6a3a,p[0],p[1],0,g,true));
      cyl(.13,1.4,0x2a2a2a,-1.3,3.7,.4,g,true);cyl(.2,.1,0x2a2a2a,-1.3,4.45,.4,g);
      const rp=wp(x,z,ry,-1.3,.4);rauch(scene,rp[0],4.5,rp[1]);
      sperrKasten(x,z,4.8,2.5,ry)})();
    /* Feuerstelle mit Kochtopf */
    (function(){const x=b.x+5.46,z=b.z-2.69;for(let i=0;i<9;i++){const a=i/9*6.283;felsen(x+Math.cos(a)*.75,z+Math.sin(a)*.75,.28+nr()*.08)}
      cyl(.6,.1,0x3a2a22,x,.05,z,scene);for(let i=0;i<3;i++){const l=cyl(.09,.9,0x6a4220,x,.18,z,scene);l.rotation.z=Math.PI/2;l.rotation.y=i*1.05}
      sph(.2,0xe0602a,x,.3,z,scene,1,.8,1);sph(.14,0xffd45e,x,.38,z,scene,1,.8,1);
      [0,1,2].forEach(i=>{const a=i*2.09,l=cyl(.04,1.7,0x3a3a3a,x+Math.cos(a)*.35,.8,z+Math.sin(a)*.35,scene);l.rotation.z=-Math.cos(a)*.38;l.rotation.x=Math.sin(a)*.38});
      cyl(.34,.4,0x2a2a2a,x,1.05,z,scene,true);cyl(.38,.06,0x3a3a3a,x,1.28,z,scene);kreis(x,z,.9);rauch(scene,x,1.5,z);
      bank(x-.5,z+2.4,Math.PI);tonne(x+2.3,z-1.6)})();
    /* Herde */
    [[-9,2,1,.4],[-4,6,.95,-.5],[-1,1,1.05,.2],[4,6.5,1,-1],[-6,-3,1,.7],[-11,-5,1,-.2]].forEach(p=>tier(schaf,b.x+p[0]*K,b.z+p[1]*K,b.x+p[0]*K+Math.sin(p[3])*5,b.z+p[1]*K+Math.cos(p[3])*5,p[2],1));
    [[-3,4.5,.55,.3],[1.5,-3.2,.5,-.6]].forEach(p=>tier(schaf,b.x+p[0]*K,b.z+p[1]*K,b.x+p[0]*K+Math.sin(p[3])*5,b.z+p[1]*K+Math.cos(p[3])*5,p[2],.6));
    const lauf=(w,f,ph)=>{bewegt(w,t=>{const a=t*f.v+ph,x=f.x+Math.cos(a)*f.rx,z=f.z+Math.sin(a)*f.rz,vx=-Math.sin(a)*f.rx,vz=Math.cos(a)*f.rz;w.position.set(x,0,z);w.rotation.y=Math.atan2(-vz,vx)})};
    [[-2,-8,3,2,.07,0]].forEach(a=>{const w=grp(0,0,0);const s=schaf(w);s.scale.setScalar(.95);leben(s,nr()*6);lauf(w,{x:b.x+a[0]*K,z:b.z+a[1]*K,rx:a[2],rz:a[3],v:a[4]},a[5])});
    /* Hütehund: schwarz-weißer Collie läuft um die Herde */
    function collieBauen(par){const g=grp(0,0,0,par),f=0x25262b,w=0xf6f2ea;
      sph(.5,f,0,.85,0,g,1.4,.8,.7).castShadow=true;sph(.3,w,.3,.8,0,g,1,.9,.8);sph(.32,w,-.35,.75,0,g,.6,.55,.65);[[-.5,.2],[-.5,-.2],[.5,.2],[.5,-.2]].forEach(p=>{cyl(.07,.7,f,p[0],.35,p[1],g,true);sph(.09,w,p[0],.06,p[1],g,1.3,.6,1)});
      const kopf=grp(.85,1.25,0,g);sph(.28,f,0,0,0,kopf);sph(.15,w,.2,-.08,0,kopf,1.2,.8,.9);sph(.06,0x111111,.34,-.04,0,kopf);sph(.05,w,.12,.1,0,kopf,1,.6,.4);[-1,1].forEach(z=>{sph(.05,0xffffff,.2,.11,z*.14,kopf);sph(.03,0x111111,.24,.11,z*.14,kopf)});[-1,1].forEach(z=>box(.12,.3,.1,f,-.05,.14,z*.22,kopf).rotation.x=z*.5);
      const sw=grp(-.7,1.05,0,g);cone(.11,.8,f,-.25,.25,0,sw).rotation.z=.9;cone(.07,.3,w,-.55,.55,0,sw).rotation.z=.9;
      g.userData.anim=t=>{sw.rotation.y=Math.sin(t*7)*.5;kopf.rotation.z=Math.sin(t*1.2)*.12};return g}
    const collie=automerge(collieBauen);
    (function(){const w=grp(0,0,0);const h=collie(w);h.scale.setScalar(.95);leben(h,1.3);lauf(w,{x:b.x-3.36,z:b.z+2.1,rx:10,rz:7.5,v:.27},0)})();
    /* Schäfer mit Hut und Stab */
    (function(){const m=mensch(b.x+4.03,b.z-.67,-1.3,0x6f7a4a,0x4a4a3a,0xb5651d,'kurz',1.2,0);hut(m,0x6a4a2a,1.0);m.al.rotation.x=-.35;
      cyl(.045,2.5,0x7a5230,.62,1.25,.2,m.g,true);const k=new THREE.Mesh(new THREE.TorusGeometry(.18,.04,5,10,Math.PI),mat(0x7a5230));k.position.set(.44,2.5,.2);m.g.add(k);box(.5,.5,.25,0x8a5a32,0,1.2,-.38,m.g)})();
    /* Wolle, Raufe, Heu, Tränke, Hundehütte, Unterstand */
    sack(b.x+6.97,b.z-3.19,0xf0ead8,.9);sack(b.x+7.9,b.z-3.86,0xf0ead8,.8);sack(b.x+11.26,b.z-2.69,0xf0ead8,.85);
    (function(){const x=b.x-10.5,z=b.z-10.08,g=grp(x,0,z);g.rotation.y=.35;[-1.2,1.2].forEach(s=>cyl(.08,1.3,0x7a5230,s,.65,0,g,true));box(2.8,.1,.7,0x6a4220,0,1.3,0,g);for(let i=0;i<8;i++)box(.07,.5,.07,0x8a5a32,-1.2+i*.34,1.55,.3,g);sph(.7,0xe8c850,0,1.0,0,g,1.8,.5,.6);sperrKasten(x,z,3,1,.35)})();
    ballen(b.x-12.18,b.z-4.62,.3);ballen(b.x-11.09,b.z-6.89,.7);stroh(b.x-12.6,b.z+.84,.4,null,.5,true);kreis(b.x-12.6,b.z+.84,1.2);
    trog(b.x-2.52,b.z+12.18,0,0x4aa3d8);eimer(b.x+1.51,b.z+11.42,0x3b8fc4,null);
    (function(){const hh=grp(b.x+2.69,0,b.z-11.09);box(1.5,1,1.3,0x9a5a30,0,.5,0,hh,true);box(1.8,.12,1.6,0xb94a3a,0,1.15,0,hh);box(.5,.65,.06,0x2a1a10,0,.35,.66,hh);sperrKasten(b.x+2.69,b.z-11.09,1.6,1.4,0);cyl(.2,.08,0xc4cad0,b.x+3.86,.05,b.z-9.74,scene)})();
    unterstand(b.x-8.82,b.z+7.98,.3,0x9a5a30);
    [[-6,-9],[-14,-1],[13.5,3]].forEach((p,i)=>{const g=grp(b.x+p[0]*K,0,b.z+p[1]*K);cyl(.28,2.2,0x7a5230,0,1.1,0,g,true);sph(1,0x5cb04a,0,3.0,0,g,2,1.5,2).castShadow=true;kreis(b.x+p[0]*K,b.z+p[1]*K,.7)})
  })();

  /* ---------- 38. Weidenwäldchen mit Vogelbeobachtungsturm und Futterhäuschen ---------- */
  (function(){const b=ZB,K=.77;scheibe(b.x,b.z,14.2,ZW(0x86c864,0xe6eef4),.1);
    /* kleine Bruchstellen: Pfad von der Straße zum Turm */
    const WE=[[-14,-4],[-12,-11],[-6,-14],[2,-14],[9,-12.5],[14,-6],[15,1],[-15,4],[-12,10],[-8,13],[5,13],[11,10]].map(p=>[p[0]*K,p[1]*K]);
    WE.forEach((p,i)=>{const x=b.x+p[0],z=b.z+p[1],s=.95+nr()*.25;
      inst('cyl',x,1.3*s,z,.34*s,2.6*s,.34*s,0x6a5a42);inst('sphT',x,4.4*s,z,2.3*s,1.9*s,2.3*s,0x9ac85a);inst('sphT',x+.9*s,4.1*s,z-.7*s,1.5*s,1.3*s,1.5*s,0xa8d466);inst('sphT',x-.8*s,4.2*s,z+.8*s,1.4*s,1.2*s,1.4*s,0x8cba4e);
      for(let k=0;k<24;k++){const a=k/24*6.283+i+nr()*.12,h=(2.0+nr()*1.5)*s,rr=(2.0+nr()*.65)*s;inst('box',x+Math.cos(a)*rr,4.2*s-h/2,z+Math.sin(a)*rr,.62*s,h,.1,[0x86b84e,0x7aa845,0x94c25a][k%3],-(a+Math.PI/2))}
      for(let k=0;k<10;k++){const a=k/10*6.283+i*.7,h=(1.6+nr()*.8)*s;inst('box',x+Math.cos(a)*1.25*s,3.9*s-h/2,z+Math.sin(a)*1.25*s,.6*s,h,.1,0x6e9a40,-(a+Math.PI/2))}
      kreis(x,z,.8*s)});
    /* Nistkästen an den Stämmen */
    function nistkasten(x,y,z,ry){const g=grp(x,y,z);g.rotation.y=ry;box(.42,.55,.36,0xb8793c,0,0,0,g,true);const r=box(.56,.08,.5,0x7a4a2a,0,.33,0,g);r.rotation.z=.12;cyl(.08,.04,0x1a1a1a,0,.06,.19,g).rotation.x=Math.PI/2;box(.14,.04,.1,0x6a4220,0,-.12,.22,g)}
    [0,1,3,5,7,10].forEach(q=>{const p=WE[q],x=b.x+p[0],z=b.z+p[1],a=Math.atan2(-p[0]*.4,-p[1]*.4+.001);nistkasten(x+Math.sin(a)*.45,2.5,z+Math.cos(a)*.45,a)});
    /* Vögel */
    function vogelM(par,f,bf,s){const g=grp(0,0,0,par);sph(.15,f,0,.2,0,g,1.3,1,.9);sph(.11,bf,.07,.15,0,g,1.1,.8,.8);sph(.09,f,.18,.32,0,g);cone(.025,.07,0xe8a030,.27,.32,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>sph(.018,0x111111,.23,.35,z*.05,g));box(.22,.03,.08,f,-.26,.22,0,g).rotation.z=.4;cyl(.012,.12,0x5a4a3a,0,.06,.04,g);cyl(.012,.12,0x5a4a3a,0,.06,-.04,g);g.scale.setScalar(s||1);return g}
    const SV=[[0x4a88c8,0xf2d030],[0xd8602a,0xf4ecd8],[0x6a5038,0xd8c8a8],[0x2a2a2a,0x3a3a3a],[0xd8c030,0xf6f0d0]];
    function sitz(x,y,z,ry,k,s){const v=vogelM(scene,SV[k][0],SV[k][1],s||1.4);v.position.set(x,y,z);v.rotation.y=ry}
    /* Futterhäuschen auf Pfosten */
    function futterhaus(x,z,s){const g=grp(x,0,z);cyl(.08*s,2.4*s,0x7a5230,0,1.2*s,0,g,true);box(1.3*s,.07*s,1.0*s,0xb8793c,0,2.4*s,0,g);box(1.0*s,.5*s,.8*s,0xb8793c,0,2.7*s,0,g,true);giebel(g,1.1*s,.9*s,2.95*s,0xb94a3a,0xb8793c,.55);box(.4*s,.3*s,.05,0x2a1a10,0,2.7*s,.42*s,g);for(let i=0;i<6;i++)sph(.06,0xe8c850,-.45*s+i*.18*s,2.47*s,.4*s,g,1,.5,1);kreis(x,z,.35)}
    futterhaus(b.x+3.46,b.z-4.62,1.1);futterhaus(b.x-7.32,b.z+1.54,1);futterhaus(b.x+7.7,b.z-1.16,.9);
    sitz(b.x+3.31,3.3,b.z-4.77,.8,1);sitz(b.x+3.77,2.5,b.z-4.31,2.4,0);sitz(b.x-7.16,2.55,b.z+1.69,-.5,2);sitz(b.x-7.55,2.95,b.z+1.31,-2.2,0);sitz(b.x+7.93,2.2,b.z-1,1.2,4);
    /* Futtersäule mit Meisenknödeln */
    (function(){const x=b.x-3.46,z=b.z+3.85,g=grp(x,0,z);cyl(.07,2.8,0x7a5230,0,1.4,0,g,true);box(1.8,.07,.07,0x7a5230,0,2.7,0,g);[-.8,0,.8].forEach((o,i)=>{cyl(.012,.4,0x3a3a3a,o,2.5,0,g);sph(.14,i%2?0xe8d890:0xd8c060,o,2.25,0,g)});kreis(x,z,.3);sitz(x+.8,2.82,z,.3,1,1.3)})();
    /* Vogelbeobachtungsturm aus Holz */
    (function(){const tx=b.x-2.31,tz=b.z-3.08,g=grp(tx,0,tz),H=4.4,hz=1.4;
      [-1,1].forEach(sx=>[-1,1].forEach(sz=>cyl(.17,H-.1,0x7a5230,sx*hz,(H-.1)/2,sz*hz,g,true)));
      const L=Math.hypot(2*hz,3.3),A=Math.atan2(3.3,2*hz);
      [-1,1].forEach(s=>{[1,-1].forEach(k=>{box(L,.1,.1,0x8a5a32,0,2.0,s*hz,g).rotation.z=k*A;box(.1,.1,L,0x8a5a32,s*hz,2.0,0,g).rotation.x=k*A})});
      [1.0,3.0].forEach(y=>{[-1,1].forEach(s=>{box(2*hz+.2,.14,.14,0x6a4220,0,y,s*hz,g);box(.14,.14,2*hz+.2,0x6a4220,s*hz,y,0,g)})});
      box(3.7,.25,3.7,0x9a6a3a,0,H+.05,0,g,true);
      /* Geländer */
      [.55,1.05].forEach(h=>{box(3.7,.09,.09,0x8a5a32,0,H+h,-1.8,g);[-1,1].forEach(s=>{box(.09,.09,3.7,0x8a5a32,s*1.8,H+h,0,g);box(.9,.09,.09,0x8a5a32,s*1.35,H+h,1.8,g)})});
      [[-1.8,-1.8],[1.8,-1.8],[-1.8,1.8],[1.8,1.8],[0,-1.8],[-1.8,0],[1.8,0],[-.9,1.8],[.9,1.8]].forEach(p=>cyl(.06,1.1,0x7a5230,p[0],H+.6,p[1],g));
      /* Dach */
      [[-1.8,-1.8],[1.8,-1.8],[-1.8,1.8],[1.8,1.8]].forEach(p=>cyl(.1,2.2,0x6a4220,p[0],H+1.3,p[1],g,true));
      box(3.7,1.2,.12,0x9a6a3a,0,H+1.0,-1.8,g);[-1,1].forEach(s=>box(.12,.9,3.7,0x9a6a3a,s*1.8,H+.8,0,g));
      giebel(g,4.2,4.2,H+2.4,0x7a4a2a,0xe8d29a,.45);
      sperrKasten(tx,tz,3.5,3.5,0);
      /* Leiter an der Vorderseite */
      leiter(tx,tz+2.55,0,4.7,-.2);
      /* Beobachter auf dem Turm */
      const m=mensch(tx-.5,tz+.2,.93,0xe0605a,0x3b6fc4,0x6b4626,'zoepfe',.85,H+.2);fernglas(m);
      const m2=mensch(tx+.9,tz-.5,.6,0x3b8fc4,0x4a4a5a,0x2a1d14,'cap',.75,H+.2);m2.al.rotation.z=-.2;m2.ar.rotation.x=-1.9;
      /* Fahne */
      cyl(.04,1.6,0x6a4220,tx+1.2,H+3.6,tz,scene);box(.7,.4,.04,0xe0605a,tx+1.55,H+4.1,tz,scene)})();
    /* Beobachter am Boden mit Fernrohr auf Stativ */
    (function(){const x=b.x+1.16,z=b.z+2.7,g=grp(x,0,z);g.rotation.y=.8;
      [0,1,2].forEach(i=>{const a=i*2.094,lg=grp(0,1.25,0,g);lg.rotation.y=a;const c=cyl(.028,1.3,0x3a3a3a,0,-.6,-.25,lg);c.rotation.x=.4});
      box(.12,.12,.7,0x2a2a2a,0,1.35,.12,g);cyl(.09,.12,0x1a1a1a,0,1.35,.5,g).rotation.x=Math.PI/2;kreis(x,z,.5);
      const m=mensch(x-.9*Math.sin(.8),z-.9*Math.cos(.8),.8,0x6f7a4a,0x4a4a3a,0xe8c24a,'pferd',1.1,0);hut(m,0x5a6a3a,.9);
      const m3=mensch(x+1.7,z-1.3,-.6,0xf59e3f,0x3a4a6a,0xb5651d,'zoepfe',.8,0);m3.ar.rotation.x=-1.6;fernglas(mensch(x-2.7,z+1.3,.6,0x9b6fd0,0x3a3a44,0x1b1410,'kurz',.78,0))})();
    /* Teich mit Schilf, Seerosen, Enten */
    (function(){const cx=b.x+6.93,cz=b.z+3.85,r=3.6;wasserFl(cx,cz,r,WASSER);wasserFl(cx-.4,cz+.3,r*.6,0x6ec0ea,.02);sperrRing(cx,cz,r+.45,22);
      for(let i=0;i<14;i++){const a=i/14*6.283+.2;inst('sph',cx+Math.cos(a)*(r+.8),.16,cz+Math.sin(a)*(r+.8),.45+nr()*.3,.28,.4,0x9aa0a6)}
      for(let i=0;i<22;i++){const a=nr()*6.283,rr=r+.1+nr()*.8,h=1.5+nr()*1,x=cx+Math.cos(a)*rr,z=cz+Math.sin(a)*rr;inst('cyl',x,h/2,z,.04,h,.04,0x8a9a4a);inst('con',x,h,z,.09,.38,.09,0x6a3a22)}
      for(let i=0;i<3;i++){const a=i*2.2,rr=r*.5;inst('sph',cx+Math.cos(a)*rr,.21,cz+Math.sin(a)*rr,.55,.04,.55,0x3f9a46);inst('sph',cx+Math.cos(a)*rr+.1,.27,cz+Math.sin(a)*rr,.13,.1,.13,0xf8a8c8)}
      for(let i=0;i<2;i++){const e=tier(ente,cx+Math.cos(i*3)*r*.4,cz+Math.sin(i*3)*r*.4,cx,cz,.9-i*.1);e.position.y=.2}})();
    /* Baumstumpf-Sitze */
    [[-.3,1],[2.2,.2],[2,3.8],[-1.6,4.4],[-3.1,2.7]].forEach(p=>{const x=b.x+(p[0]+3)*K,z=b.z+(p[1]+6.5)*K;cyl(.45,.5,0x8a5a32,x,.25,z,scene,true);cyl(.4,.06,0xd8b878,x,.52,z,scene);kreis(x,z,.5)});
    /* Reh und Kitz */
    function rehBauen(par,kitz){const g=grp(0,0,0,par),f=0xb5793e,w=0xf4ecd8,d=0x6a4a2a;
      sph(.6,f,0,1.15,0,g,1.5,.8,.7).castShadow=true;sph(.5,w,.15,.85,0,g,1.4,.5,.6);sph(.3,w,-.85,1.15,0,g,.5,1,.9);
      [[-.6,.24],[-.6,-.24],[.55,.24],[.55,-.24]].forEach(p=>{cyl(.055,.9,f,p[0],.55,p[1],g,true);cyl(.065,.14,d,p[0],.07,p[1],g)});
      sph(.09,w,-1.03,1.3,0,g,1,1.3,1);
      const nk=grp(.65,1.3,0,g),kh=grp(0,1.0,0,nk);cyl(.13,1.0,f,0,.5,0,nk);kh.rotation.z=-.9;
      sph(.2,f,.14,0,0,kh,1.5,1,.8).castShadow=true;sph(.1,0x3a2a20,.4,-.08,0,kh,.9,.8,.8);sph(.1,w,.3,-.1,0,kh,1.2,.6,1);[-1,1].forEach(z=>{sph(.04,0x111111,.2,.07,z*.14,kh);sph(.1,f,-.04,.25,z*.14,kh,.5,1.7,.35);sph(.06,0xe8a0a0,-.02,.24,z*.17,kh,.3,1.1,.2)});
      if(kitz)for(let i=0;i<9;i++)sph(.07,w,Math.cos(i*1.4)*.7,1.52+Math.sin(i*2.1)*.1,Math.sin(i*1.4)*.4,g);
      g.userData.anim=t=>{const u=Math.max(0,Math.sin(t*.3+(kitz?1.5:0)));nk.rotation.z=-.7-1.6*u;kh.rotation.z=-.9+.5*u};return g}
    const reh=automerge(rehBauen);
    tier(p=>reh(p,false),b.x-7.32,b.z-6.16,b.x-3.85,b.z-3.85,1,1.2);tier(p=>reh(p,true),b.x-6.54,b.z-4.62,b.x-3.85,b.z-3.85,.55,.6);
    /* Vögel am Boden und in der Luft */
    const lauf=(w,f,ph)=>{bewegt(w,t=>{const a=t*f.v+ph,x=f.x+Math.cos(a)*f.rx,z=f.z+Math.sin(a)*f.rz,vx=-Math.sin(a)*f.rx,vz=Math.cos(a)*f.rz;w.position.set(x,Math.abs(Math.sin(t*5+ph))*.1,z);w.rotation.y=Math.atan2(-vz,vx)})};
    [[-2,6,2.5,1.5,.33,0,3],[4,-2,2,1.5,.28,2,0]].forEach(a=>{const w=grp(0,0,0);const v=vogelM(w,SV[a[6]][0],SV[a[6]][1],1.5);vmVerschm(v);lauf(w,{x:b.x+(a[0]+1)*K,z:b.z+a[1]*K,rx:a[2],rz:a[3],v:a[4]},a[5])});
    for(let i=0;i<4;i++){const g=grp(0,9,0);sph(.12,i%2?0x4a88c8:0xd8602a,0,0,0,g,1.6,.7,.7);box(.14,.05,.1,0xf4ecd8,.17,0,0,g);const fl=[-1,1].map(s=>box(.5,.03,.18,i%2?0x2a4a7a:0x6a3a22,0,.02,s*.25,g));const cx=b.x+nr()*6-3,cz=b.z+nr()*6-3,r=9+nr()*5,ph=nr()*6,sp=.3+nr()*.15;g.scale.setScalar(1.6);
      g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.8,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.8;g.position.set(x,7+Math.sin(t*.8+ph)*1.8,z);g.rotation.y=Math.atan2(-vz,vx);fl[0].rotation.x=Math.sin(t*16)*.7;fl[1].rotation.x=-Math.sin(t*16)*.7};leben(g,ph)}
    /* Farn, Blumen und Gras unter den Weiden */
    const okW=(x,z)=>Math.hypot(x-(b.x+6.93),z-(b.z+3.85))>5.4&&!nahPfad(x,z,2)&&colliders.every(c=>Math.hypot(x-c.x,z-c.z)>c.r+.5)&&sperrKaesten.every(k=>Math.hypot(x-k.x,z-k.z)>Math.hypot(k.hb,k.ht)+.6);
    for(let i=0;i<110;i++){const a=nr()*6.283,r=Math.sqrt(nr())*17*K,x=b.x+Math.cos(a)*r,z=b.z+Math.sin(a)*r;if(!okW(x,z))continue;
      if(i%3===0){inst('con',x,.3,z,.12,.6+nr()*.4,.12,0x4aa040)}else{const h=.35+nr()*.3;inst('box',x,h/2,z,.05,h,.05,0x3f9a46);inst('blm',x,h+.04,z,.17,.12,.17,BL[i%6])}}
  })();

  /* ---------- Landschaft im Nordstreifen: Hecken, Zäune, Blumenwiesen, Strohballen, Büsche ---------- */
  [[-173,-130],[-124,-70],[-64,-12]].forEach(s=>{hecke(s[0],-164.8,s[1],-164.8);hecke(-s[1],-164.8,-s[0],-164.8)});
  hecke(-174.6,-153,-174.6,-209);hecke(174.6,-153,174.6,-209);
  /* Stoppelfeld mit Strohballen im Nordwesten */
  (function(){const cx=-146,cz=-193;bodenFl(cx,cz,36,26,0xd8c878,.06);for(let k=0;k<9;k++)inst('box',cx,.1,cz-11+k*2.75,34,.05,.25,0xb89a50);
    weidezaun(cx-18,cz+13,cx+18,cz+13);weidezaun(cx-18,cz-13,cx-18,cz+13);weidezaun(cx-18,cz-13,cx+18,cz-13);
    [[-12,-6],[-4,-7],[4,-5],[-8,3],[0,2],[9,4],[-13,8],[12,-8]].forEach((p,i)=>ballen(cx+p[0],cz+p[1],i*.8));
    for(let i=0;i<3;i++)stroh(cx+14,cz+2+i*0,.3,null,.5+i*1,i%2===0);kreis(cx+14,cz+2,1.3);
    stroh(cx-15,cz-6,.1,null,.5,false);stroh(cx-15,cz-6,.1,null,1.5,true);kreis(cx-15,cz-6,1.3);
    vogelscheuche(cx+4,cz+8)})();
  /* Heuballen-Stapel im Nordosten */
  (function(){const x=160,z=-190;[[0,0],[2.2,0],[1.1,1.4]].forEach((p,i)=>stroh(x+p[0],z+p[1],.2,null,i<2?.5:1.5,true));kreis(x+1,z+.5,2);ballen(x-3,z+4,.4);ballen(x+2,z+6,1.2);vogelscheuche(x+4,z-8)})();
  /* Blumenwiesen */
  wiese(-45,-203,16,5,260);wiese(-45,-177,19,4,200);wiese(95,-190,6,16,200);wiese(160,-203,8,6,120);wiese(36,-190,5,15,160);wiese(-120,-185,6,12,200);wiese(-168,-196,4,18,140);wiese(-45,-190,16,2.5,100);wiese(148,-176,12,3,150);wiese(-20,-203,6,6,150);wiese(163,-180,6,8,110);
  /* Streuobst-Bäume zwischen den Orten */
  (function(){function obst(x,z,s){inst('cyl',x,1.1*s,z,.26*s,2.2*s,.26*s,0x7a5230);inst('sphT',x,3.0*s,z,2.1*s,1.7*s,2.1*s,[0x5cb04a,0x4aa84e,0x68b858][Math.floor(nr()*3)]);for(let k=0;k<4;k++){const a=k*1.5+x;inst('blm',x+Math.cos(a)*1.85*s,(2.3+(k%3)*.4)*s,z+Math.sin(a)*1.85*s,.17,.17,.17,[0xe0302a,0xf2c230,0xd8502a][k%3])}kreis(x,z,.6*s)}
    let n=0,t=0;while(n<26&&t++<3000){const x=-170+nr()*340,z=-210+nr()*44;if(!freiN(x,z,3))continue;obst(x,z,.85+nr()*.3);n++}})();
  /* Büsche, Gras und Blumeninseln */
  (function(){let n=0,t=0;const bu=[],bu2=[];while(n<46&&t++<4000){const x=-170+nr()*340,z=-210+nr()*44;if(!freiN(x,z,1.4)||(z>-193&&z<-183&&x<16&&x>-62))continue;const s=.7+nr()*.7;bu.push([x,.55*s,z,.9*s,.7*s,.9*s]);bu2.push([x+.5,.6*s,z+.3,.6*s,.5*s,.6*s]);kreis(x,z,.8*s);n++}
    instanziert(gSph,0x3f8a3a,bu);instanziert(gSph,0x56a04a,bu2);
    const gr=[];t=0;while(gr.length<420&&t++<9000){const x=-170+nr()*340,z=-210+nr()*44;if(!freiN(x,z,.4))continue;for(let k=0;k<3;k++)gr.push([x+(nr()-.5)*.5,.4,z+(nr()-.5)*.5,.1,.8+nr()*.4,.1])}
    instanziert(gCone,0x4aa040,gr)})();

  /* ---------- Bewegung: Traktor mit Heuanhänger (Querweg z = -100) und Radfahrerin (Feldweg im Südwesten): beide fahren im erreichbaren Süden ---------- */
  (function(){const w=grp(0,0,0),tr=traktor(w),ah=anhaenger(tr);ah.position.set(-3.6,0,0);vmVerschm(ah);w.userData.anim=t=>{if(tr.userData.anim)tr.userData.anim(t)};
    fahren(w,pendel(WEGE[3].filter(q=>q[0]>=14&&q[0]<66),1.0),2.7,20)})();
  (function(){const g=grp(0,0,0),rad=[];const fa=0xe0605a;
    [-.55,.55].forEach(x=>{const wg=grp(x,.4,0,g);const r=new THREE.Mesh(new THREE.TorusGeometry(.38,.035,6,16),mat(0x2a2a2a));wg.add(r);cyl(.05,.08,0x8a8f96,0,0,0,wg).rotation.x=Math.PI/2;box(.7,.02,.02,0x8a8f96,0,0,0,wg);box(.02,.7,.02,0x8a8f96,0,0,0,wg);rad.push(wg)});
    box(1.1,.05,.05,fa,0,.78,0,g);box(.9,.05,.05,fa,.1,.55,0,g).rotation.z=.7;box(.05,.5,.05,fa,-.3,.62,0,g);box(.05,.5,.05,fa,.55,.72,0,g);box(.05,.05,.5,0x2a2a2a,.58,1.02,0,g);box(.3,.06,.16,0x3a2a22,-.3,.95,0,g);
    const m=kindModell({jacke:0x3b8fc4,hose:0x3a3a44,haut:0xe8b98f,haar:0x6b4626,stil:'zoepfe',rucksack:null},g);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(.62);m.g.position.set(-.3,.44,0);m.al.rotation.x=-1.05;m.ar.rotation.x=-1.05;
    g.userData.anim=t=>{rad.forEach(wg=>{wg.rotation.z=-t*8});m.bl.rotation.x=Math.sin(t*8)*.8;m.br.rotation.x=-Math.sin(t*8)*.8};
    vm.apply(null,[g].concat(rad,[m.bl,m.br]));
    fahren(g,pendel(spl(NEUPFADE[0].p,2.5).filter(q=>q[0]>-140&&q[0]<-24),1.0),3.8,0)})();
MS.forEach(m=>{if(!m.pf)vmVerschm(m.g);m.g.userData.keep=1;lebendig.push({o:m.g,ph:0})});
})();
/* ---------- Abschluss: Besucher verschmelzen, Instanzen bündeln ---------- */
besucher.forEach(f=>{if(f.vmOk)return;f.vmOk=1;[f.bl,f.br,f.al,f.ar].forEach(l=>{vmVerschm(l);l.userData.frei=1});vmVerschm(f.g)});
instFlush();
}
