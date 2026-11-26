/* Welt: Regenwald (Kennwort regenwald). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Tropischer Regenwald am Tag: Eingang im Süden, Forscherlager, Gärten, Kleintiere, Baumkronen, Affen, dazu ein breiter Fluss (Rio) quer durch die Welt mit Ufer-Orten, nördlich davon Sumpf, Jaguar, Tempel, Riesenbaum und Baumhausdorf. Dunst, Lianen, Farne, Palmen, Riesenbäume. */
/* Schilder: keine Hinweisschilder (Wunsch der Lehrkraft, 24.11.2026). Nur Ausgang, Geschafft!, Spielname und Zahlen-Schilder der Rätsel. */
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Faultier Fiete';
const START={x:0,z:128};
const VERTEXFARBEN=true,MERGEZELLE=85,FERNBESUCHER=65,FERNLEBEN=95;
const ZOOMMAX=45;
/* Sammelstücke: mögliche Verstecke der 5 Edelsteine (abseits der Wege, in Ecken). Gefunden und geprüft mit werkzeuge/_verstecke.js; die Engine lost je Spiel 5 aus. */
const SAMMELPOOL=[
  {x:-79,z:110,ort:'Wetterstation'},
  {x:80,z:-181,ort:'Pilzlichtung'},
  {x:-140,z:-121,ort:'Sumpf'},
  {x:158,z:24,ort:'Kakaoplantage'},
  {x:-36,z:-23,ort:'Faultier-Allee'},
  {x:46,z:65,ort:'Käferwiese'},
  {x:161,z:-96,ort:'Wasserfall mit Becken'},
  {x:-28,z:-132,ort:'Baumkronenpfad-Turm'},
  {x:59,z:-70,ort:'Piranha-Steg'},
  {x:-118,z:25,ort:'Tukan-Wald'},
  {x:-16,z:137,ort:'Eingangstor'},
  {x:-130,z:-41,ort:'Brüllaffen-Bäume'},
  {x:-83,z:-97,ort:'Krokodilfluss'},
  {x:87,z:110,ort:'Schmetterlingshaus'},
  {x:132,z:-26,ort:'Wildkamera-Station'},
  {x:119,z:-127,ort:'Baumhausdorf'},
  {x:-56,z:67,ort:'Blattschneiderameisen-Straße'},
  {x:132,z:65,ort:'Dorf der Waldbewohner'},
  {x:-50,z:-174,ort:'Regenbogenlichtung'},
  {x:-110,z:76,ort:'Baumfrosch-Teich'},
  {x:81,z:-38,ort:'Ameisenbär-Pfad'},
  {x:113,z:26,ort:'Kolibri-Blüten'},
  {x:-78,z:-32,ort:'Kapuzineräffchen'},
  {x:31,z:104,ort:'Orchideengarten'},
  {x:-61,z:8,ort:'Papageienfelsen'}
];
const BEREICHE={
  eingang:{name:'Eingangstor',x:0,z:134,plaetze:[]}
};
/* Der Rio: breiter Fluss von Osten (Becken des Wasserfalls) nach Westen. Er trennt Süden und Norden; Brücken: Hauptweg (x etwa 3) und Hängebrücke (x = -148). */
const RW=12;
const RIO=spl([[150,-84],[134,-82],[114,-84],[96,-88],[78,-87],[58,-83],[40,-81],[22,-82],[4,-85],[-14,-88],[-34,-88],[-54,-85],[-74,-82],[-94,-84],[-114,-88],[-134,-90],[-154,-88],[-184,-85]],2);
const KARTENFLUSS={pts:RIO,w:RW};
function rioZ(x){let b=0,bd=1e9;for(let i=0;i<RIO.length;i++){const d=Math.abs(RIO[i][0]-x);if(d<bd){bd=d;b=i}}return RIO[b][1]}
/* 37 Orte (dazu der Eingang) und Wasserflächen (Namen 'Fluss' kommen oft vor und zählen nicht als Ort, halten nur die Rätsel aus dem Wasser) */
const EXTRAZONEN=[
  {name:'Forscherlager',x:-128,z:104,r:12},{name:'Wetterstation',x:-84,z:106,r:11},{name:'Heilpflanzengarten',x:-34,z:106,r:12},{name:'Orchideengarten',x:40,z:106,r:11},{name:'Schmetterlingshaus',x:100,z:104,r:14},{name:'Bananen und Kautschuk',x:148,z:104,r:12},
  {name:'Baumfrosch-Teich',x:-116,z:68,r:12},{name:'Blattschneiderameisen-Straße',x:-62,z:68,r:12},{name:'Käferwiese',x:36,z:68,r:12},{name:'Chamäleon-Busch',x:98,z:70,r:11},{name:'Dorf der Waldbewohner',x:146,z:64,r:16},
  {name:'Tukan-Wald',x:-110,z:22,r:14},{name:'Papageienfelsen',x:-56,z:22,r:12},{name:'Baumschule',x:50,z:22,r:13},{name:'Kolibri-Blüten',x:106,z:20,r:13},{name:'Kakaoplantage',x:148,z:18,r:14},
  {name:'Brüllaffen-Bäume',x:-122,z:-30,r:13},{name:'Kapuzineräffchen',x:-84,z:-30,r:12},{name:'Faultier-Allee',x:-44,z:-30,r:12},{name:'Tapir-Lichtung',x:40,z:-30,r:12},{name:'Ameisenbär-Pfad',x:84,z:-30,r:12},{name:'Wildkamera-Station',x:126,z:-30,r:12},
  {name:'Wasserschwein-Ufer',x:-108,z:rioZ(-108)+15,r:11},{name:'Kanu-Anleger',x:-58,z:rioZ(-58)+15,r:10},{name:'Piranha-Steg',x:50,z:rioZ(50)+15,r:10},{name:'Flussdelfin-Bucht',x:106,z:rioZ(106)-1,r:16},{name:'Wasserfall mit Becken',x:152,z:-84,r:13},
  {name:'Krokodilfluss',x:-76,z:rioZ(-76)-15,r:11},{name:'Hängebrücken',x:-148,z:rioZ(-148),r:14},
  {name:'Sumpf',x:-136,z:-134,r:15},{name:'Jaguar-Felsen',x:-96,z:-134,r:12},{name:'Tempelruine',x:-56,z:-134,r:14},{name:'Baumkronenpfad-Turm',x:-22,z:-134,r:10},{name:'Kapok-Riesenbaum',x:44,z:-134,r:14},{name:'Baumhausdorf',x:114,z:-134,r:15},
  {name:'Pilzlichtung',x:76,z:-172,r:12},{name:'Regenbogenlichtung',x:-60,z:-172,r:16}
];
/* Wasserflächen (Kreise): Becken, Bucht, Teiche, Fluss. Alles Feste im Wasser sperrt die Figur. */
const WS=[[152,-84,12],[106,-84,17],[-116,68,7.5]];
for(let i=0;i<RIO.length;i+=4)EXTRAZONEN.push({name:'Fluss',x:RIO[i][0],z:RIO[i][1],r:6});
const SEITENWEGE=[94,44,-8,-58,-110,-160];
const WEGBOGEN=11;
const GRENZE={x0:-180,x1:180,z0:-236,z1:148};
const TORZ=-190, FEST={x:0,z:-212};
let FARBEN,WASSER,ausgang;
const BPTS=[[0,128],[0,100],[0,60],[0,20],[0,-20]];
const BLF=[0xe0302a,0xf59e3f,0xffd45e,0xf47ab0,0xb06ae0,0xffffff];
const ZN=n=>EXTRAZONEN.find(e=>e.name===n);
const HZ=0x9a6a3a,HD=0x6a4220,HW=0xa8743f;
function pfad(x1,z1,x2,z2,w,farbe){weg(wellen(x1,z1,x2,z2),w,farbe)}
const gDisc=new THREE.CylinderGeometry(1,1,1,28);
function scheibe(x,z,r,farbe,h){h=h||.12;const c=mesh(gDisc,farbe,x,h/2,z,r,h,r,scene);c.receiveShadow=true;return c}
function wasserRund(x,z,r,farbe,dy){const w=mesh(gDisc,farbe,x,.1+(dy||0),z,r,.18,r,scene);w.receiveShadow=true;return w}
function schild(text,x,y,z,w,h,schrift,farbe,rot,par){const s=schildText(text,farbe||'#fff8e6',w,h,schrift);s.position.set(x,y,z);if(rot)s.rotation.y=rot;(par||scene).add(s);return s}
function bewegt(teil,fn){teil.userData.keep=1;lebendig.push({o:{userData:{anim:fn}},ph:0})}
function leben(g,ph){lebendig.push({o:g,ph:ph||rnd()*6})}
/* Instanzen: alle Büsche, Blumen, Bäume, Felder werden gesammelt (inst) und am Ende je Form und Kachel zu einem Zeichenaufruf (instFlush, Farbe je Instanz, nur sichtbare Kacheln werden gezeichnet) */
const gSphL=new THREE.SphereGeometry(1,6,4),gSphT=new THREE.SphereGeometry(1,8,6),gSphXL=new THREE.SphereGeometry(1,5,3),gConL=new THREE.ConeGeometry(1,1,7),gCylL=new THREE.CylinderGeometry(1,1,1,6),gBoxI=new THREE.BoxGeometry(1,1,1);
const IR={};
function inst(k,x,y,z,sx,sy,sz,c,ry){(IR[k]=IR[k]||[]).push([x,y,z,sx,sy,sz,c,ry||0])}
function instanziert(geo,farbe,liste){const k=geo===gCone?'con':geo===gCyl?'cyl':geo===gBox?'box':'sph';liste.forEach(a=>inst(k,a[0],a[1],a[2],a[3],a[4],a[5],farbe,a[6]||0))}
function instFlush(){const G={sph:gSphL,sphT:gSphT,blm:gSphXL,con:gConL,cyl:gCylL,box:gBoxI,pyr:gPyr},M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color(),CH=96,gr={},bl=[];
  for(const k in IR)IR[k].forEach(a=>{const key=k+'|'+Math.floor((a[0]+260)/CH)+'|'+Math.floor((a[2]+320)/CH);(gr[key]=gr[key]||{k,l:[]}).l.push(a)});
  for(const key in gr){const q=gr[key],l=q.l;let x0=1e9,x1=-1e9,y1=0,z0=1e9,z1=-1e9,ms=0;l.forEach(a=>{x0=Math.min(x0,a[0]);x1=Math.max(x1,a[0]);z0=Math.min(z0,a[2]);z1=Math.max(z1,a[2]);y1=Math.max(y1,a[1]+a[4]);ms=Math.max(ms,a[3],a[4],a[5])});
    const geo=G[q.k].clone(),im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),l.length);geo.boundingSphere=new THREE.Sphere(new THREE.Vector3((x0+x1)/2,y1/2,(z0+z1)/2),Math.hypot(x1-x0,z1-z0,y1)/2+ms*1.6+2);
    bl.push({im,x:geo.boundingSphere.center.x,z:geo.boundingSphere.center.z,r:geo.boundingSphere.radius});im.frustumCulled=true;if(q.k==='sphT')im.castShadow=true;
    l.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(0,a[7],0));M.compose(P,Q,S);im.setMatrixAt(i,M);im.setColorAt(i,C.set(a[6]))});im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;scene.add(im)}
  lebendig.push({o:{userData:{anim:t=>{const cx=camera.position.x,cz=camera.position.z;bl.forEach(c=>{const v=Math.hypot(c.x-cx,c.z-cz)-c.r<175;if(c.im.visible!==v)c.im.visible=v})}}},ph:0})}
const VMAT2=new THREE.MeshLambertMaterial({vertexColors:true});
let GLAS;
function glas(w,h,d,x,y,z,par){GLAS=GLAS||new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.28,depthWrite:false});const m=new THREE.Mesh(gBox,GLAS);m.position.set(x,y,z);m.scale.set(w,h,d);(par||scene).add(m);return m}
function giebel(g,w,d,y0,dachf,wandf,a){a=a||.62;const h=d/2*Math.tan(a),l=d/2/Math.cos(a)+.35;[-1,1].forEach(s=>{const r=box(w+.7,.22,l,dachf,0,y0+h/2,s*d/4,g,true);r.rotation.x=s*a});box(w,h*.5,d*.5,wandf,0,y0+h*.25,0,g);box(w+.7,.2,.45,dachf,0,y0+h+.02,0,g)}
function stall(x,z,w,d,hh,wand,dach,rot,text){const g=grp(x,0,z);box(w,hh,d,wand,0,hh/2,0,g,true);giebel(g,w,d,hh,dach,wand);
  box(w*.3,hh*.62,.14,0x7a5230,0,hh*.31,d/2+.05,g);if(w>=8)[-1,1].forEach(s=>box(w*.34,.1,.16,0xf6f2e6,0,hh*.31,d/2+.1,g).rotation.z=s*.8);else[-1,1].forEach(s=>{box(.9,.8,.1,0xffffff,s*w*.34,hh*.5,d/2+.05,g);box(.75,.65,.12,0xcfeaf5,s*w*.34,hh*.5,d/2+.07,g)});
  if(text)schild(text,0,Math.min(hh*.85,hh-.7),d/2+.1,w>=8?5:Math.min(w*.45,4),.8,40,'#fff8e6',0,g);g.rotation.y=rot||0;sperrKasten(x,z,w,d,rot||0);return g}
function gehege(b,r,boden,luecke,n){scheibe(b.x,b.z,r,boden,.12);zaun(b.x,b.z,r,n||70,luecke)}
function zugang(b,pz,ex){pfad(b.x,b.z,ex!=null?ex:b.x,pz,3.5)}
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
/* Person (Kind oder Erwachsene), unbewegt; schaut in Richtung rot (0 = nach +z) */
function person(x,z,rot,jacke,hose,haar,stil,s,par){const m=kindL({jacke:jacke,hose:hose,haut:0xe8b98f,haar:haar,stil:stil||'kurz',rucksack:null},par||scene);m.g.position.set(x,0,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.25);return m}
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
/* Bahn (geschlossen): hin auf der einen Seite der Linie s, zurück auf der anderen, Wendebögen an den Enden; at(u) liefert [x,z,dx,dz] */
function pendel(s,o){const n=s.length,nr=i=>{const a=s[Math.max(0,i-1)],b=s[Math.min(n-1,i+1)];let tx=b[0]-a[0],tz=b[1]-a[1];const l=Math.hypot(tx,tz)||1;return[-tz/l,tx/l,tx/l,tz/l]};
  const P=[];for(let i=0;i<n;i++){const q=nr(i);P.push([s[i][0]+q[0]*o,s[i][1]+q[1]*o])}
  let q=nr(n-1);for(let k=1;k<12;k++){const a=k/12*Math.PI;P.push([s[n-1][0]+q[0]*o*Math.cos(a)+q[2]*o*Math.sin(a),s[n-1][1]+q[1]*o*Math.cos(a)+q[3]*o*Math.sin(a)])}
  for(let i=n-1;i>=0;i--){const m=nr(i);P.push([s[i][0]-m[0]*o,s[i][1]-m[1]*o])}
  q=nr(0);for(let k=1;k<12;k++){const a=k/12*Math.PI;P.push([s[0][0]-q[0]*o*Math.cos(a)-q[2]*o*Math.sin(a),s[0][1]-q[1]*o*Math.cos(a)-q[3]*o*Math.sin(a)])}
  return bahn(P)}
function bahn(P){if(!P||P.length<2)return{L:1,at:()=>[0,0,1,0]};const C=[0];for(let i=1;i<=P.length;i++){const a=P[i-1],b=P[i%P.length];C.push(C[i-1]+Math.hypot(b[0]-a[0],b[1]-a[1]))}const L=C[P.length];
  return{L,at:u=>{if(!isFinite(u))u=0;u=((u%L)+L)%L;if(!(u<L))u=0;let lo=0,hi=P.length;while(hi-lo>1){const m=(lo+hi)>>1;if(C[m]<=u)lo=m;else hi=m}const a=P[lo],b=P[(lo+1)%P.length],f=(u-C[lo])/((C[lo+1]-C[lo])||1);return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,b[0]-a[0],b[1]-a[1]]}}}
/* Fahrzeug g (schaut nach +x) fährt auf Bahn B mit Geschwindigkeit v; wird weit weg ausgeblendet */
function fahren(g,B,v,ph){g.userData.keep=1;if(!B||!(B.L>1)){g.visible=false;return}lebendig.push({o:{userData:{anim:t=>{const p=B.at(t*v+ph);if(!p||p[0]!==p[0])return;g.position.set(p[0],0,p[1]);g.rotation.y=Math.atan2(-p[3],p[2]);const sicht=Math.hypot(p[0]-spieler.position.x,p[1]-spieler.position.z)<(dist>35?92:100);if(g.visible!==sicht)g.visible=sicht;if(sicht&&g.userData.anim)g.userData.anim(t)}}},ph:0})}
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
const nr=()=>rnd();
const roadZ=(x,r)=>r+3.5*Math.sin(x*.05+r*.7);
/* Zaun mit schmaler Lücke (gw Einheiten) bei Winkel ga; Hindernis entlang des Zauns */
function zaunL(cx,cz,r,n,ga,gw,farbe){farbe=farbe||0x7a5a3a;const D=Math.asin(Math.min(.9,gw/2/r)),A=Math.PI*2-2*D,g=grp(cx,0,cz);let pa=null;
  for(let i=0;i<=n;i++){const a=ga+D+A*i/n,x=Math.cos(a)*r,z=Math.sin(a)*r;box(.2,1.3,.2,farbe,x,.65,z,g);if(pa)sperrLinie(cx+pa[0],cz+pa[1],cx+x,cz+z,.15);pa=[x,z]}
  [1.05,.55].forEach(h=>{const t=new THREE.Mesh(new THREE.TorusGeometry(r,.07,5,Math.max(24,n),A),mat(farbe));t.rotation.z=ga+D;t.rotation.x=Math.PI/2;t.position.y=h;g.add(t)})}
function gehegeL(b,r,boden,gw){scheibe(b.x,b.z,r,boden,.1);zaunL(b.x,b.z,r,Math.round(r*3.2),b.gap,gw||3.4)}
/* Wasserkante: Hindernis ringsum, optional Lücke (Steg) bei Winkel ga mit Breite gw */
function wRing(cx,cz,r,ga,gw){const n=Math.max(18,Math.round(r*2.4)),D=ga==null?0:Math.asin(Math.min(.9,gw/2/r)),A=Math.PI*2-2*D;let pa=null;for(let i=0;i<=n;i++){const a=(ga||0)+D+A*i/n,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(pa)sperrLinie(pa[0],pa[1],x,z,.2);pa=[x,z]}}
function teichBau(cx,cz,r,farbe,ga,gw){wasserRund(cx,cz,r,farbe||WASSER);wasserRund(cx-r*.1,cz+r*.08,r*.62,0x6ec0ea,.02);wRing(cx,cz,r+.5,ga,gw);
  for(let i=0;i<Math.round(r*2.4);i++){const a=i/Math.round(r*2.4)*6.283+.1;if(ga!=null&&Math.abs(Math.atan2(Math.sin(a-ga),Math.cos(a-ga)))<(gw/2+1)/r)continue;inst('sph',cx+Math.cos(a)*(r+1),.17,cz+Math.sin(a)*(r+1),.4+nr()*.3,.26,.38,0x8e949a)}}
/* Holzsteg von (x1,z1) nach (x2,z2); Geländer als Hindernis */
function steg(x1,z1,x2,z2,w,farbe){farbe=farbe||0x9a6a3a;const dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz),th=Math.atan2(-dz,dx),g=grp((x1+x2)/2,0,(z1+z2)/2);g.rotation.y=th;
  box(L,.1,w,farbe,0,.2,0,g,true);for(let i=0;i<L/1.4;i++)box(.14,.04,w+.1,0x6a4220,-L/2+.5+i*1.4,.26,0,g);
  [-1,1].forEach(s=>{box(L,.08,.1,0x6a4220,0,.9,s*(w/2+.05),g);for(let i=0;i<=Math.round(L/2.4);i++)box(.12,.9,.12,0x7a5230,-L/2+i*L/Math.round(L/2.4),.45,s*(w/2+.05),g)});
  const c=Math.cos(th),s=Math.sin(th),W=(lx,lz)=>[(x1+x2)/2+lx*c+lz*s,(z1+z2)/2-lx*s+lz*c];
  [-1,1].forEach(sg=>{const p=W(-L/2,sg*(w/2+.1)),q=W(L/2,sg*(w/2+.1));sperrLinie(p[0],p[1],q[0],q[1],.1)});const a=W(L/2,-(w/2+.1)),b2=W(L/2,w/2+.1);sperrLinie(a[0],a[1],b2[0],b2[1],.1);return g}
/* ---------- Bäume (instanziert) ---------- */
let BAUMZ=0,KREISE=true;
function baum(x,z,art,s,kol){s=s||1;const c=a=>a[Math.floor(rnd()*a.length)];BAUMZ++;
  if(art===0){inst('cyl',x,1.5*s,z,.42*s,3*s,.42*s,0x6a4a30);const k=c([0x3f8a3a,0x468f3e,0x3a8036]);inst('sph',x,4.8*s,z,2.7*s,2.1*s,2.7*s,k);inst('blm',x+1.4*s,4.2*s,z+.7*s,1.9*s,1.6*s,1.9*s,0x4a9a44);inst('blm',x-1.2*s,4.4*s,z-.7*s,1.8*s,1.5*s,1.8*s,0x358030)}
  else if(art===1){inst('cyl',x,1.8*s,z,.3*s,3.6*s,.3*s,0x8c8a82);inst('sph',x,5.4*s,z,2.9*s,2.4*s,2.9*s,c([0x4a9a44,0x52a248]));inst('blm',x+.9*s,6.9*s,z-.3*s,1.9*s,1.5*s,1.9*s,0x5aaa50)}
  else if(art===2){inst('cyl',x,1.2*s,z,.26*s,2.4*s,.26*s,0x5a3a26);inst('con',x,3.2*s,z,2.3*s,3.6*s,2.3*s,0x2a5e3a);inst('con',x,5.3*s,z,1.85*s,3.2*s,1.85*s,0x2f6b44);inst('con',x,7.2*s,z,1.3*s,2.9*s,1.3*s,0x357a4e)}
  else if(art===3){inst('cyl',x,2.3*s,z,.17*s,4.6*s,.17*s,0xe8e4da);inst('sph',x,5.8*s,z,1.6*s,2.3*s,1.6*s,0x86c458);inst('blm',x+.5*s,4.8*s,z+.3*s,1.1*s,1.5*s,1.1*s,0x78b84c)}
  else if(art===4){inst('cyl',x,3.1*s,z,.24*s,6.2*s,.24*s,0x9a5a38);inst('sph',x,6.8*s,z,2.1*s,1*s,2.1*s,0x3f7a3a);inst('blm',x+1*s,7.7*s,z+.4*s,1.3*s,.75*s,1.3*s,0x468a44);inst('blm',x-1*s,5.9*s,z-.3*s,1.2*s,.7*s,1.2*s,0x3a7036)}
  else{inst('cyl',x,1.5*s,z,.3*s,3*s,.3*s,0x7a5a3a);inst('sph',x,4.5*s,z,2.5*s,2*s,2.5*s,kol||0x6aa83a);inst('blm',x+.9*s,4*s,z+.6*s,1.6*s,1.4*s,1.6*s,0x78b844)}
  if(KREISE)kreis(x,z,.7*s)}
function kindL(av,par){const g=grp(0,0,0,par),bl=grp(-.2,.85,0,g),br=grp(.2,.85,0,g);[bl,br].forEach(b=>{cyl(.13,.8,av.hose,0,-.42,0,b,true);box(.3,.2,.46,0x3a3a44,0,-.88,.07,b)});
  const t=cyl(.37,.9,av.jacke,0,1.3,0,g,true);t.scale.z=.3;box(.78,.12,.58,av.hose,0,.9,0,g);const al=grp(-.47,1.62,0,g),ar=grp(.47,1.62,0,g);[al,ar].forEach(a=>{cyl(.11,.7,av.jacke,0,-.34,0,a,true);sph(.12,av.haut,0,-.76,0,a)});
  if(av.rucksack)box(.55,.65,.25,av.rucksack,0,1.35,-.34,g,true);const kopf=grp(0,2.05,0,g),h=av.haar;sph(.5,av.haut,0,0,0,kopf).castShadow=true;[-1,1].forEach(x=>{sph(.085,0x1b1b1b,x*.18,.05,.46,kopf,1,1.2,.6);sph(.07,0xf2a0a0,x*.3,-.1,.42,kopf,1,.7,.4)});sph(.045,av.haut,0,-.04,.5,kopf);box(.16,.03,.03,0xa84040,0,-.14,.49,kopf);
  if(av.stil==='cap'){sph(.53,h,0,.1,-.08,kopf,1,.8,1);sph(.54,0xe0302a,0,.14,0,kopf,1,.55,1);box(.5,.06,.36,0xe0302a,0,.16,.55,kopf)}else{sph(.54,h,0,.1,-.07,kopf,1,.85,1.02);sph(.3,h,0,.36,.34,kopf,1.4,.4,.7)}
  if(av.stil==='zoepfe')[-1,1].forEach(x=>{sph(.18,h,x*.55,-.18,-.05,kopf,.8,1.6,.8);sph(.08,0xe0605a,x*.52,.04,-.03,kopf)});if(av.stil==='pferd'){sph(.2,h,0,.12,-.58,kopf,.8,1.8,.8);sph(.08,0xe0605a,0,.2,-.5,kopf)}
  return {g,bl,br,al,ar,kopf}}
function moos(x,z,s){s=s||1;inst('box',x,.06,z,.9*s,.1,.8*s,0x5f9a3a,x*3)}
function gras(x,z,h){h=h||.8;inst('con',x,h/2,z,.1,h,.1,0x4aa040)}
function blumeI(x,z,k){const h=.35+rnd()*.3;inst('cyl',x,h/2,z,.03,h,.03,0x3f9a46);inst('blm',x,h+.04,z,.13,.1,.13,BLF[k==null?Math.floor(rnd()*6):k])}
function stumpf(x,z,s){s=s||1;cyl(.55*s,.7*s,0x6a4a32,x,.35*s,z,scene,true);cyl(.5*s,.06,0xcfa86a,x,.72*s,z,scene);cyl(.3*s,.02,0xb08850,x,.755*s,z,scene);kreis(x,z,.62*s)}
function stamm(x,z,len,rot,r){r=r||.5;const c=cyl(r,len,0x6a4a32,x,r,z,scene,true);c.rotation.z=Math.PI/2;c.rotation.y=rot||0;const dx=Math.cos(rot||0)*len/2,dz=-Math.sin(rot||0)*len/2;sperrLinie(x-dx,z-dz,x+dx,z+dz,r*.8);
  [-1,1].forEach(s=>{const e=cyl(r*.9,.05,0xcfa86a,x+s*dx*1.0,r,z+s*dz*1.0,scene);e.rotation.z=Math.PI/2;e.rotation.y=rot||0});if(r>.4)moos(x,z,.8)}
function fels(x,z,r){const g=felsen(x,z,r);if(r>.6)inst('sph',x,r*.78,z,r*.9,r*.28,r*.8,0x5f9a3a);return g}
function tisch(x,z,rot){const g=grp(x,0,z);cyl(.7,.12,0x9a6a3a,0,.9,0,g,true);cyl(.15,.9,0x6a4a32,0,.45,0,g);g.rotation.y=rot||0;kreis(x,z,.8);return g}
function bankW(x,z,rot){const g=grp(x,0,z);box(2.4,.18,.7,0x8a5a32,0,.62,0,g,true);box(2.4,.6,.1,0x8a5a32,0,1.05,-.32,g);[-1,1].forEach(s=>box(.14,.62,.64,0x6a4220,s*1,.31,0,g));g.rotation.y=rot||0;kreis(x-Math.cos(rot||0)*.8,z+Math.sin(rot||0)*.8,.55);kreis(x+Math.cos(rot||0)*.8,z-Math.sin(rot||0)*.8,.55);return g}
function schubkarre(x,z,rot,fr){const g=grp(x,0,z);g.rotation.y=rot||0;box(1.2,.35,.8,0x3b8fc4,.1,.72,0,g,true);cyl(.28,.1,0x2a2a2a,.75,.28,0,g,true).rotation.x=Math.PI/2;[-1,1].forEach(s=>{box(.08,.5,.08,0x6a4220,-.3,.28,s*.3,g);box(1.5,.07,.07,0x6a4220,-.9,.85,s*.3,g).rotation.z=.2});if(fr)for(let i=0;i<6;i++)sph(.14,fr,-.3+(i%3)*.32,.95+(i>2?.1:0),(i%2-.5)*.4,g);kreis(x,z,.8);return g}
function hutAuf(m,col,s){s=s||1;cyl(.66*s,.07,col,0,.36,0,m.kopf);cyl(.4*s,.36,col,0,.56,0,m.kopf)}
/* Allgemeiner Vierbeiner: Körper, vier Beine, Hals mit Kopf (Ohren, Augen, Schnauze), Schwanz; o.x(g,kopf,schwanz,hals) für Besonderheiten */
function vier(par,o){const g=grp(0,0,0,par),f=o.f,w=o.w||f,d=o.d||0x2a2018,h=o.h,bl=o.bl,bh=o.bh,bw=o.bw,hr=o.hr,lr=o.lr;
  sph(1,f,0,h,0,g,bl,bh,bw).castShadow=true;if(o.bauch)sph(1,w,bl*.12,h-bh*.5,0,g,bl*.85,bh*.55,bw*.88);
  const lh=h-bh*.25;[[-.62,1],[-.62,-1],[.6,1],[.6,-1]].forEach(p=>{cyl(lr,lh,o.lf||f,bl*p[0],lh/2,bw*.58*p[1],g,true);sph(lr*1.2,d,bl*p[0]+lr*.6,lr*.45,bw*.58*p[1],g,1.5,.55,1)});
  const nk=grp(bl*.78,h+bh*.2,0,g),kh=grp(0,o.nl,0,nk);cyl(o.nr,o.nl,o.nf||f,0,o.nl/2,0,nk,true);
  sph(hr,o.hf||f,hr*.35,0,0,kh,o.hl||1.5,1,.85).castShadow=true;sph(hr*.55,o.sc||w,hr*1.35,-hr*.28,0,kh,1.3,.78,.8);sph(hr*.17,0x1a1414,hr*2.05,-hr*.2,0,kh);
  [-1,1].forEach(z=>{sph(hr*.2,0x16110d,hr*.95,hr*.32,z*hr*.62,kh);sph(hr*.07,0xffffff,hr*1.03,hr*.4,z*hr*.7,kh);cone(hr*.34,hr*(o.oh||1.1),o.ef||f,-hr*.2,hr*.95,z*hr*.55,kh).rotation.x=z*.35});
  const tl=grp(-bl*.92,h+bh*.25,0,g);if(!o.notail)sph(o.tr,o.tc||f,-o.tr*.7,-o.tr*.1,0,tl,o.tl||1.1,.8,.8);
  if(o.x)o.x(g,kh,tl,nk);
  nk.rotation.z=-o.na;const ph=rnd()*6;g.userData.anim=t=>{kh.rotation.z=o.na-o.ht+Math.sin(t*.9+ph)*.06};return g}
function wurm(x,z,rot,s){const g=grp(x,0,z);g.rotation.y=rot||0;s=s||1;for(let i=0;i<10;i++){const u=i/9;sph(.2*s*(i===0?.9:1),i===3||i===4?0xe0a0a0:0xc47a82,(u-.5)*4*s,.2*s,Math.sin(u*6.5)*.55*s,g,1.15,1,1)}sph(.05*s,0x2a1a1a,-2.1*s,.28*s,.3*s,g);kreis(x,z,1.4*s);return g}
function libelle(cx,cz,r,y,ph,farbe){const g=grp(cx,y,cz);cyl(.035,1.1,farbe,.1,0,0,g).rotation.z=Math.PI/2;sph(.1,0x1a8a4a,.68,.02,0,g);[-1,1].forEach(s=>sph(.06,0x2a5ac8,.7,.05,s*.08,g));const w=[-1,1].map(s=>{const p=grp(.25,.06,0,g);[.0,-.2].forEach(x=>box(.16,.012,.5,0xe4f4ff,x,0,s*.28,p));return p});
  g.userData.anim=t=>{const a=t*1.1+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a*1.4)*r*.7;g.position.set(x,y+Math.sin(t*2+ph)*.5,z);g.rotation.y=Math.atan2(-Math.cos(a*1.4)*1.4*r*.7,-Math.sin(a)*r);w[0].rotation.x=Math.sin(t*30)*.5;w[1].rotation.x=-Math.sin(t*30)*.5};leben(g,ph);return vm(g,w[0],w[1])}
function falter(cx,cz,r,y,ph,farbe){const g=grp(cx,y,cz);sph(.07,0x3a2a22,0,0,0,g,2,.5,.5);const fl=[-1,1].map(s=>sph(.3,farbe,0,0,s*.3,g,.9,.1,1.1));g.userData.anim=t=>{const a=t*.5+ph;g.position.set(cx+Math.cos(a)*r,y+Math.sin(t*1.3+ph)*.4,cz+Math.sin(a)*r*.7);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*14)*.7;fl[1].rotation.x=-Math.sin(t*14)*.7};leben(g,ph);return vm(g,fl[0],fl[1])}
function vogelM(par,f,bf,s){const g=grp(0,0,0,par);sph(.15,f,0,.2,0,g,1.3,1,.9);sph(.11,bf,.07,.15,0,g,1.1,.8,.8);sph(.09,f,.18,.32,0,g);cone(.025,.07,0xe8a030,.27,.32,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>sph(.018,0x111111,.23,.35,z*.05,g));box(.22,.03,.08,f,-.26,.22,0,g).rotation.z=.4;cyl(.012,.12,0x5a4a3a,0,.06,.04,g);cyl(.012,.12,0x5a4a3a,0,.06,-.04,g);g.scale.setScalar(s||1);return g}
const SV=[[0x4a88c8,0xf2d030],[0xd8602a,0xf4ecd8],[0x6a5038,0xd8c8a8],[0x2a2a2a,0x3a3a3a],[0xd8c030,0xf6f0d0],[0x2a9ad8,0xe07a30]];
function sitz(x,y,z,ry,k,s){const v=vogelM(scene,SV[k][0],SV[k][1],s||1.5);v.position.set(x,y,z);v.rotation.y=ry;return v}
function fischK(par,f){f=f||0x8aa0a8;const g=grp(0,0,0,par);sph(.4,f,0,0,0,g,1.5,.55,.5);sph(.2,0xe8eef0,.05,-.12,0,g,1.7,.35,.6);cone(.28,.5,0xa8b8bc,-.75,0,0,g).rotation.z=Math.PI/2;box(.3,.22,.04,f,0,.28,0,g);sph(.05,0x111111,.45,.1,.2,g);sph(.05,0x111111,.45,.1,-.2,g);return vm(g)}
function schwarm(geo,farbe,n,fn){const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:farbe}),n);im.frustumCulled=false;scene.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler();
  lebendig.push({o:{userData:{anim:t=>{if(Math.hypot(camera.position.x-im.userData.cx,camera.position.z-im.userData.cz)>130){im.visible=false;return}im.visible=true;for(let i=0;i<n;i++){const a=fn(i,t);P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(0,a[6]||0,0));M.compose(P,Q,S);im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}}},ph:0});const a0=fn(0,0);im.userData.cx=a0[0];im.userData.cz=a0[2];return im}
/* Fläche aus Punktliste (x,z) */
function landFl(P,farbe,y,tr){const sh=new THREE.Shape();P.forEach((p,i)=>i?sh.lineTo(p[0],-p[1]):sh.moveTo(p[0],-p[1]));const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),tr||mat(farbe));m.rotation.x=-Math.PI/2;m.position.y=y;m.receiveShadow=true;scene.add(m);return m}
/* Linie P seitlich nach innen (zum Land) versetzen */
function inw(P,d){return P.map((p,i)=>{const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)],tx=b[0]-a[0],tz=b[1]-a[1],l=Math.hypot(tx,tz)||1;return[p[0]+tz/l*d,p[1]-tx/l*d]})}
function bandM(s,w,farbe,y,m2){const n0=scene.children.length;wegBand(s,w,farbe,y);const m=scene.children[n0];if(m2)m.material=m2;return m}
/* Hindernis entlang einer Küstenlinie (lu = Lücken [x,z,r]) */
function kante(P,off,lu,r){const Q=inw(P,off);for(let i=0;i<Q.length-1;i++){const a=Q[i],b=Q[i+1],mx=(a[0]+b[0])/2,mz=(a[1]+b[1])/2;if(lu&&lu.some(g=>Math.hypot(mx-g[0],mz-g[1])<g[2]))continue;sperrLinie(a[0],a[1],b[0],b[1],r||.3)}}
/* Dreieck (zweiseitig) für Segel und Fahnen */
function tri(a,b,c,farbe,par){const u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];const l=Math.hypot(n[0],n[1],n[2])||1;n=n.map(q=>q/l);
  [[a,b,c,1],[a,c,b,-1]].forEach(q=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array([].concat(q[0],q[1],q[2])),3));g.setAttribute('normal',new THREE.BufferAttribute(new Float32Array([n[0]*q[3],n[1]*q[3],n[2]*q[3],n[0]*q[3],n[1]*q[3],n[2]*q[3],n[0]*q[3],n[1]*q[3],n[2]*q[3]]),3));const m=new THREE.Mesh(g,mat(farbe));(par||scene).add(m)})}
function fahrrad(x,z,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;[-.55,.55].forEach(q=>{const w=new THREE.Mesh(new THREE.TorusGeometry(.38,.04,5,12),mat(0x2a2a2a));w.position.set(q,.4,0);g.add(w)});box(1.1,.06,.06,farbe||0x3b6fc4,0,.7,0,g).rotation.z=.3;box(.06,.6,.06,farbe||0x3b6fc4,-.3,.7,0,g);box(.06,.5,.06,farbe||0x3b6fc4,.45,.65,0,g);box(.3,.05,.2,0x2a2a2a,-.4,.98,0,g);box(.06,.06,.5,0x2a2a2a,.5,.95,0,g);box(.5,.28,.4,0x8a5a32,.9,.4,0,g);kreis(x,z,.8);return g}
/* Fahne an Mast (weht) */
function fahne(x,z,h,farbe,farbe2){cyl(.08,h,0xe8e4da,x,h/2,z,scene,true);kreis(x,z,.3);const f=grp(x,h-.6,z);for(let i=0;i<4;i++)box(.4,.5,.04,i%2?(farbe2||0xffffff):farbe,.4+i*.4,0,0,f);vm(f);bewegt(f,t=>{f.rotation.y=Math.sin(t*1.7)*.18})}
function streif(fn,B,v,ph,sk){const g=fn(scene);g.scale.setScalar(sk||1);fahren(g,B,v,ph);return g}
function lin(P,st){const o=[];for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],k=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/st));for(let j=0;j<k;j++)o.push([a[0]+(b[0]-a[0])*j/k,a[1]+(b[1]-a[1])*j/k])}o.push(P[P.length-1]);return o}
function flamme(x,y,z,s){s=s||1;const f=grp(x,y,z);const FL=[[0xff5a1a,.6,1.7,0,0],[0xff9a2a,.45,1.3,.3,.1],[0xffd040,.32,.95,-.25,.15]].map(p=>{const m=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:p[0]}));m.scale.set(p[1]*s,p[2]*s,p[1]*s);m.position.set(p[3]*s,p[2]*s/2,p[4]*s);f.add(m);return{m,h:p[2]*s,w:p[1]*s}});
  f.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{FL.forEach((q,i)=>{const k=1+Math.sin(t*9+i*2)*.16+Math.sin(t*15+i)*.08;q.m.scale.set(q.w*(2-k),q.h*k,q.w*(2-k));q.m.position.y=q.h*k/2})}}},ph:0});return f}
function stuhl(x,z,rot,f){const g=grp(x,0,z);box(.5,.08,.5,f||0x3b6fc4,0,.55,0,g,true);box(.5,.5,.06,f||0x3b6fc4,0,.85,-.22,g);[[-.2,-.2],[.2,-.2],[-.2,.2],[.2,.2]].forEach(p=>cyl(.03,.55,0x6a6a70,p[0],.27,p[1],g));g.rotation.y=rot||0;kreis(x,z,.35);return g}
function markise(g,w,y,z,f1,f2,n){n=n||6;for(let i=0;i<n;i++)box(w/n,.1,1.3,i%2?f2:f1,-w/2+(i+.5)*w/n,y,z,g).rotation.x=.25}
function rutsche(x,z,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;[-.6,.6].forEach(s=>{box(.12,3,.12,0x8a5a32,s,1.5,-1.2,g,true)});box(1.6,.12,1.2,0x8a5a32,0,2.9,-1.2,g);const r=box(1.2,.12,3.4,farbe||0xe0302a,0,1.5,.7,g);r.rotation.x=.55;[-1,1].forEach(s=>box(.1,.4,3.4,farbe||0xe0302a,s*.6,1.7,.7,g).rotation.x=.55);for(let i=0;i<5;i++)box(1.3,.06,.1,0x8a5a32,0,.6+i*.5,-1.78,g);sperrKasten(x,z,2.4,4.6,rot||0);return g}
function schaukel(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;[-2,2].forEach(s=>[-1,1].forEach(q=>{cyl(.1,3,0x8a5a32,s,1.4,q*.8,g,true).rotation.x=q*.2}));box(4.4,.14,.14,0x6a4220,0,2.9,0,g);const sw=[-1,1].map(s=>{const p=grp(s*.9,2.9,0,g);box(.04,2.1,.04,0x3a3a3e,0,-1.05,0,p);box(.7,.08,.3,0xe0302a,0,-2.1,0,p);return p});bewegt(sw[0],t=>{sw[0].rotation.x=Math.sin(t*1.7)*.5});bewegt(sw[1],t=>{sw[1].rotation.x=Math.sin(t*1.7+1.2)*.5});sperrKasten(x,z,4.6,2.4,rot||0);return g}
function fernrohr(x,z,rot,h){h=h||1.5;const g=grp(x,0,z);cyl(.07,h,0x3a3a3e,0,h/2,0,g,true);const r=cyl(.12,.9,0x2a3a4a,0,h+.1,0,g);r.rotation.z=1.2;cyl(.15,.12,0x1a1a1a,.4,h+.35,0,g).rotation.z=1.2;g.rotation.y=rot||0;kreis(x,z,.3);return g}
const dk=(c,f)=>new THREE.Color(c).multiplyScalar(f).getHex();
function hecke(x1,z1,x2,z2,gap,k){const L=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(L/1.5));let pa=null;for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n,z=z1+(z2-z1)*i/n,im=gap&&Math.hypot(x-gap[0],z-gap[1])<gap[2];if(!im){inst('sph',x,.55,z,.9,.7,.8,[0x4a8a3a,0x3f7a34][i%2]);if(i%4===0)inst('blm',x,1,z,.5,.4,.5,[0xf47ab0,0xffffff,0xe0605a][(k||0)%3])}if(pa&&!im&&!pa[2])sperrLinie(pa[0],pa[1],x,z,.5);pa=[x,z,im]}}
const fig=(x,z,rot,jk,hs,hr,st,s)=>{kreis(x,z,.5);return person(x,z,rot,jk,hs,hr,st||'kurz',s||1.25)};
function wanderer(B,v,ph,av,hutF){const w=grp(0,0,0);const m=kindL(Object.assign({hose:0x3a4a5a,haut:0xe8b98f,haar:0x6b4626,stil:'kurz',rucksack:null},av),w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.25);if(hutF)hutAuf(m,hutF);
  vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);
  w.userData.anim=t=>{const q=Math.sin(t*6+ph)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q};fahren(w,B,v,ph*B.L/6.3);return w}
const lay=b=>({x:d=>b.x+d,z:d=>b.z+b.dir*d,r:b.dir>0?0:Math.PI});
function strasse(r){const p=[];for(let x=-150;x<150;x+=19)p.push([x,roadZ(x,r)]);p.push([150,roadZ(150,r)]);return p}
/* Ort suchen und mit der nächsten Querstraße verbinden (r0 erzwingt eine Straße) */
function zone(n,r0){const b=ZN(n);if(!b)throw new Error('Zone fehlt: '+n);let best=94,bd=1e9;SEITENWEGE.forEach(r=>{const d=Math.abs(r-b.z);if(d<bd){bd=d;best=r}});if(r0!=null)best=r0;b.road=best;b.dir=best>b.z?1:-1;b.gap=b.dir>0?Math.PI/2:-Math.PI/2;return b}
function ast(b,w,bend){const x=b.x,z0=roadZ(x,b.road),bd=bend==null?(x>0?-2.4:2.4):bend;weg([[x,z0],[x+bd,(z0+b.z)/2],[x,b.z+b.dir*1.5]],w||3.2)}
/* Boden-Tricks: SG-Raster (belegte Flächen), Bäume-Abstand, Zufallsstreuung */
const SGW=181,SGH=193,SG=new Uint8Array(SGW*SGH);
function sgMark(x,z,r){const i0=Math.max(0,Math.floor((x-r+180)/2)),i1=Math.min(SGW-1,Math.ceil((x+r+180)/2)),j0=Math.max(0,Math.floor((z-r+236)/2)),j1=Math.min(SGH-1,Math.ceil((z+r+236)/2));for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const cx=i*2-180,cz=j*2-236;if((cx-x)*(cx-x)+(cz-z)*(cz-z)<=r*r)SG[j*SGW+i]=1}}
function sgFrei(x,z){const i=Math.round((x+180)/2),j=Math.round((z+236)/2);return i>=0&&i<SGW&&j>=0&&j<SGH&&!SG[j*SGW+i]}
const TH={};function thFrei(x,z,d){const i=Math.floor(x/8),j=Math.floor(z/8);for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++){const l=TH[(i+a)+'|'+(j+c)];if(l)for(let k=0;k<l.length;k++){const q=l[k];if((q[0]-x)*(q[0]-x)+(q[1]-z)*(q[1]-z)<d*d)return false}}return true}
function thSet(x,z){const k=Math.floor(x/8)+'|'+Math.floor(z/8);(TH[k]=TH[k]||[]).push([x,z])}
const imW=(x,z)=>WS.some(w=>Math.hypot(x-w[0],z-w[1])<w[2]+2.5);
const frei=(x,z)=>sgFrei(x,z)&&!imW(x,z)&&Math.abs(x)<177&&z>-233&&z<145;
function zuf(fn,anz,pred,x0,x1,z0,z1){let k=0,t=0;x0=x0==null?GRENZE.x0+6:x0;x1=x1==null?GRENZE.x1-6:x1;z0=z0==null?TORZ+5:z0;z1=z1==null?GRENZE.z1-12:z1;while(k<anz&&t++<anz*14){const x=x0+nr()*(x1-x0),z=z0+nr()*(z1-z0);if(!frei(x,z)||(pred&&!pred(x,z)))continue;fn(x,z);k++}}
function block(x,z,r){const g=felsen(x,z,r);return g}
function steinhaufen(x,z,s){s=s||1;for(let i=0;i<5;i++)inst('sph',x+Math.cos(i*1.9)*.5*s,.2*s+(i%2)*.1,z+Math.sin(i*1.9)*.5*s,.35*s,.22*s,.3*s,GRAU[i%5])}
function zaunR(x0,z0,x1,z1,gz,gw,farbe){farbe=farbe||0x7a5a3a;gw=gw||3.6;const cx=(x0+x1)/2;
  const seg=(ax,az,bx,bz)=>{const L=Math.hypot(bx-ax,bz-az);if(L<.2)return;const n=Math.max(1,Math.round(L/2));for(let i=0;i<=n;i++)box(.18,1.2,.18,farbe,ax+(bx-ax)*i/n,.6,az+(bz-az)*i/n,scene,true);[1,.55].forEach(h=>{const r=box(L,.07,.1,farbe,(ax+bx)/2,h,(az+bz)/2,scene);r.rotation.y=Math.atan2(-(bz-az),bx-ax)});sperrLinie(ax,az,bx,bz,.15)};
  const zn=gz>0?z1:z0,zf=gz>0?z0:z1;seg(x0,zf,x1,zf);seg(x0,z0,x0,z1);seg(x1,z0,x1,z1);seg(x0,zn,cx-gw/2,zn);seg(cx+gw/2,zn,x1,zn)}
/* Wandstück aus Fels (Kulisse und Kletterwand), fest */
function felswand(x,z,w,d,h,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;const n=Math.max(2,Math.round(w/3));for(let i=0;i<n;i++){const u=(i+.5)/n-.5,hh=h*(.78+.22*Math.sin(i*2.3+x));box(w/n+.4,hh,d*(.85+.25*Math.sin(i*1.7)),i%2?(farbe||GRAU[1]):(farbe||GRAU[3]),u*w,hh/2,Math.sin(i*3.1)*.4,g,true)}sperrKasten(x,z,w,d,rot||0);return g}
/* Fels-Haufen mit Hindernissen: n Brocken im Umkreis */
function felsgruppe(x,z,rx,rz,n,rmin,rmax,hoch){const L=[];for(let i=0;i<n;i++){const a=i/n*6.283+nr()*.5,q=.35+nr()*.65,px=x+Math.cos(a)*rx*q,pz=z+Math.sin(a)*rz*q,r=rmin+nr()*(rmax-rmin);const m=sph(r,GRAU[i%5],px,r*(hoch||.55),pz,scene,1.2,.8,1);m.castShadow=true;kreis(px,pz,r*.95);L.push([px,pz,r])}return L}
/* Wasserfall-Schleier (ein Zeichenaufruf) */
function fallen(x,z,w,h,n){return schwarm(gBox,0xf4fbff,n,(i,t)=>{const u=((t*.8+i*.371)%1);return[x+(((i*7)%11)/11-.5)*w,h*(1-u)+.3,z,.32,h*.12+.2,.3,0]})}
/* Pfeiler für Seilbahn und Strommasten */
function mast(x,z,h,farbe){cyl(.35,h,farbe||0x6a6a70,x,h/2,z,scene,true);box(3.2,.25,.3,farbe||0x6a6a70,x,h-.4,z,scene);kreis(x,z,.6)}
function rohr(a,b,r,farbe,par){const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),L=d.length(),m=cyl(r,L,farbe,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,par||scene);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.multiplyScalar(1/L));return m}
function hex(x,z,r,farbe,h){h=h||.1;const c=cyl(r,h,farbe,x,h/2,z,scene);c.receiveShadow=true;return c}
/* ==================== Etappe 1: Fläche, Wege, Kulisse, Eingang, Seilbahn, Festplatz ==================== */
const bandE=(z,x)=>z+4*Math.sin(x*.045+z*.3)+3*Math.sin(x*.11+z);
function bandFl(zA,zB,farbe,y){const up=[],dn=[];for(let x=-190;x<=190;x+=19)up.push([x,bandE(zB,x)]);for(let x=190;x>=-190;x-=19)dn.push([x,bandE(zA,x)]);return landFl(up.concat(dn),farbe,y)}

/* ==================== Hilfen für den Regenwald: Pflanzen (instanziert) ==================== */
const TP=[0x2f7a34,0x3a8a3a,0x2a6e30,0x4a9a40,0x357a3a,0x1f6a30,0x56a244];
const tp=()=>TP[Math.floor(nr()*7)];
/* flache Pyramide (4 Dreiecke): billige Blätter für Farne, Palmen und Blumen */
const gPyr=new THREE.ConeGeometry(1,1,4,1,true);
const GRAU=[0x8d9097,0x7e848c,0x9a9a9e,0x848a94,0x969087];
const KHAKI=0xc8b27a,HUTK=0xd8c898,ERDE=0x8a6a45,LEHM=0xc8784a;
function farn(x,z,s,k){if(nr()<.3)return;s=(s||1)*.72;const c=k==null?tp():TP[k%7],a=nr()*3.14;inst('pyr',x,.2*s,z,1.5*s,.4*s,.38*s,c,a);inst('pyr',x,.22*s,z,1.5*s,.4*s,.38*s,dk(c,1.15),a+1.05);inst('pyr',x,.2*s,z,1.4*s,.36*s,.34*s,dk(c,.9),a+2.1)}
function blatt(x,z,s){s=s||1;const c=tp();inst('box',x,.5*s,z,.07*s,1*s,.07*s,0x3a7a30);inst('pyr',x+.2*s,1.0*s,z,1.1*s,.22*s,.78*s,c,nr()*3)}
function palme(x,z,s){s=s||1;const h=(5+nr()*3)*s,a0=nr()*6;inst('cyl',x,h/2,z,.2*s,h,.2*s,0x8a6a48);for(let i=0;i<5;i++){const a=a0+i*1.257;inst('pyr',x+Math.cos(a)*1.5*s,h+(i%2)*.25*s,z-Math.sin(a)*1.5*s,1.8*s,.3*s,.5*s,i%2?0x3f8a38:0x2f7a34,a)}kreis(x,z,.4*s)}
function bambus(x,z,s){s=s||1;for(let i=0;i<4;i++){const a=i*1.6+x,r=.5*s,h=(6+((i*7+Math.floor(Math.abs(x)))%4))*s,px=x+Math.cos(a)*r,pz=z+Math.sin(a)*r;inst('box',px,h/2,pz,.16*s,h,.16*s,i%2?0x8aa83a:0x9ab848);if(i<2)inst('blm',px,h-.3*s,pz,.8*s,.55*s,.8*s,0x5a9a32)}kreis(x,z,.9*s)}
function brom(x,y,z,s,k){s=s||1;const c=[0x3a8a3a,0x4aa040,0x2f7a34][(k||0)%3];inst('blm',x,y,z,.55*s,.17*s,.3*s,c,nr()*3);inst('blm',x,y+.02,z,.55*s,.17*s,.3*s,dk(c,1.15),nr()*3+1.5);inst('sph',x,y+.12*s,z,.13*s,.13*s,.13*s,[0xe03a4a,0xf59e3f,0xb06ae0][(k||0)%3])}
function liane(x,y0,z,len){inst('box',x,y0-len/2,z,.08,len,.08,nr()<.5?0x2e5a28:0x4a4a2a)}
function helico(x,z){const h=.8+nr()*.4,a=nr()*3;inst('box',x,h/2,z,.07,h,.07,0x3f9a46);inst('pyr',x,h+.1,z,.14,.5,.14,0xe0302a);inst('pyr',x+.1,h,z+.05,.12,.4,.12,0xf2c230);inst('pyr',x,.3,z,.55,.14,.22,0x3f9a46,a+1.2)}
function hibiskus(x,z,s){s=s||1;inst('sph',x,.8*s,z,.9*s,.8*s,.9*s,0x3a8a3a);inst('blm',x+.5*s,.9*s,z+.3*s,.6*s,.5*s,.6*s,0x4a9a40);for(let i=0;i<3;i++)inst('blm',x+Math.cos(i*2.2)*.8*s,1.05*s,z+Math.sin(i*2.2)*.8*s,.2*s,.14*s,.2*s,[0xe0302a,0xf47ab0,0xf59e3f][i]);kreis(x,z,.8*s)}
function orch(x,z,k){const h=.5+nr()*.3,c=[0xe070c8,0xffffff,0xb06ae0,0xf0c0e0][(k==null?Math.floor(nr()*4):k)%4];inst('cyl',x,h/2,z,.03,h,.03,0x3f9a46);for(let i=0;i<3;i++)inst('blm',x+(i-1)*.1,h+.02+i*.03,z,.14,.1,.1,c,i);inst('blm',x,.15,z,.4,.07,.15,0x2f7a34,nr()*3)}
function bodenfl(x,z,s,k){inst('sph',x,.02,z,(2.5+nr()*2)*s,.04,(2+nr()*2)*s,[0x3f7a30,0x56882f,0x6a5a38,0x2f6a2c,0x5a9a3a,0x7a5a38][k==null?Math.floor(nr()*6):k%6])}
/* Urwaldbäume: t=0 normaler Baum, t=1 Schirmbaum (flache breite Krone), t=2 Riesenbaum mit Brettwurzeln; kr=false: ohne Hindernis */
function urw(x,z,s,t,kr){s=s||1;t=t||0;const c=tp();
  if(t===0){const h=(7+nr()*3)*s;inst('cyl',x,h/2,z,.32*s,h,.32*s,0x6a4e34);inst('sph',x,h+1.2*s,z,3.2*s,2.1*s,3.2*s,c);inst('blm',x+1.7*s,h-.1*s,z+.6*s,2.4*s,1.6*s,2.4*s,dk(c,.9));if(nr()<.6)liane(x+1.4*s,h-.8*s,z+.5*s,(4+nr()*4)*s);if(nr()<.3)brom(x,2.4*s,z+.45*s,.8,1)}
  else if(t===1){const h=(9+nr()*3)*s;inst('cyl',x,h/2,z,.38*s,h,.38*s,0x7a5a3a);inst('sph',x,h+.6*s,z,5.4*s,1.3*s,5.4*s,c);inst('blm',x+2.6*s,h,z+1.2*s,2.6*s,1*s,2.6*s,dk(c,.9));inst('blm',x-2.4*s,h+.2*s,z-1.4*s,2.6*s,1*s,2.6*s,dk(c,1.1));liane(x+2.5*s,h-.4*s,z+.6*s,(5+nr()*4)*s);liane(x-2*s,h-.4*s,z-1*s,(4+nr()*4)*s)}
  else{const h=(20+nr()*5)*s;inst('cyl',x,h/2,z,.9*s,h,.9*s,0x8a7a6a);for(let i=0;i<5;i++){const a=i*1.2566+.4;inst('con',x+Math.cos(a)*.8*s,2.3*s,z-Math.sin(a)*.8*s,1.8*s,4.6*s,.32*s,0x8a7a6a,a)}inst('sph',x,h+2*s,z,7.5*s,2.4*s,7.5*s,c);inst('blm',x+4.4*s,h,z+2*s,3.6*s,1.8*s,3.6*s,dk(c,.9));inst('blm',x-4*s,h+.6*s,z-2.4*s,3.6*s,1.8*s,3.6*s,dk(c,1.1));for(let i=0;i<3;i++)liane(x+Math.cos(i*2.1)*3.4*s,h-.4*s,z+Math.sin(i*2.1)*3.4*s,(8+nr()*6)*s)}
  if(kr!==false)kreis(x,z,(t===2?2.3:.65)*s)}
/* Strauch-Dickicht: viele Pflanzen auf einmal (Fläche rx mal rz) */
function dickicht(cx,cz,rx,rz,n,pred){let k=0,t=0;while(k<n&&t++<n*10){const x=cx+(nr()*2-1)*rx,z=cz+(nr()*2-1)*rz;if(!frei(x,z)||(pred&&!pred(x,z)))continue;const q=nr();if(q<.5)farn(x,z,.8+nr()*.7);else if(q<.7)blatt(x,z,.9+nr()*.6);else if(q<.82)helico(x,z);else if(q<.92)busch(x,z,.8+nr()*.5,tp());else orch(x,z);k++}}

/* ==================== Tiere und Figuren des Regenwalds (schauen nach +x) ==================== */
function augen(k,x,y,z,r,fr){[-1,1].forEach(s=>{sph(r,fr||0x16110d,x,y,z*s,k);sph(r*.35,0xffffff,x+r*.4,y+r*.4,z*s,k)})}
function faultierM(par,schal){const g=grp(0,0,0,par),f=0x9a8468,h=0xcdbb96;
  sph(.5,f,0,.7,0,g,.95,1.25,.85).castShadow=true;sph(.34,h,.12,.62,0,g,.8,1,.72);sph(.2,0x8a9a64,-.28,1.05,0,g,1,.6,1.2);
  [-1,1].forEach(s=>{sph(.17,f,.1,.1,s*.3,g,1.7,.6,.8);cone(.03,.16,0xe8e0c8,.38,.07,s*.3,g).rotation.z=-1.57});
  [-1,1].map(s=>{const a=grp(.05,1.12,s*.44,g);a.rotation.z=.8;cyl(.1,.95,f,0,-.45,0,a,true);for(let k=-1;k<=1;k++)cone(.028,.3,0xe8e0c8,k*.06,-1.05,0,a);return a});
  const k=grp(.3,1.5,0,g);sph(.34,f,0,0,0,k,1,.95,.96).castShadow=true;sph(.27,h,.1,-.02,0,k,.9,.92,.95);[-1,1].forEach(s=>{sph(.075,0x3a2e22,.3,.05,s*.14,k,1,1.8,.6);sph(.032,0x111111,.35,.07,s*.14,k);sph(.06,f,-.12,.28,s*.26,k)});sph(.055,0x2a1a14,.4,-.07,0,k,1.3,1,1.3);
  box(.03,.025,.16,0x5a3a2a,.37,-.14,0,k);[-1,1].forEach(s=>box(.03,.025,.08,0x5a3a2a,.36,-.12,s*.1,k).rotation.x=s*.6);
  if(schal){cyl(.33,.13,0xe0302a,.14,1.16,0,g);box(.12,.4,.12,0xe0302a,.3,1.0,.2,g)}
  g.userData.anim=t=>{k.rotation.y=Math.sin(t*.6)*.5;k.rotation.z=Math.sin(t*.9)*.06};return g}
const faultier=automerge(p=>faultierM(p,false)),fiete=automerge(p=>faultierM(p,true));
/* Faultier hängt kopfunten am Ast (Ursprung = Ast, Ast läuft entlang x) */
function faultierHang(par){const g=grp(0,0,0,par),f=0x9a8468,h=0xcdbb96;
  sph(.5,f,0,-.58,0,g,1.5,.62,.75).castShadow=true;sph(.4,h,0,-.3,0,g,1.1,.4,.6);sph(.2,0x8a9a64,-.3,-.82,0,g,1.2,.4,1);
  [[.5,1],[.5,-1],[-.5,1],[-.5,-1]].forEach(p=>{cyl(.075,.8,f,p[0],-.15,p[1]*.26,g).rotation.z=p[0]>0?-.25:.25;sph(.08,0xe8e0c8,p[0]+(p[0]>0?.12:-.12),.18,p[1]*.26,g,1.5,.7,.7)});
  const k=grp(.85,-.5,0,g);sph(.3,f,0,0,0,k,1,.95,.95).castShadow=true;sph(.24,h,.1,-.02,0,k,.9,.92,.95);[-1,1].forEach(s=>{sph(.065,0x3a2e22,.27,.05,s*.12,k,1,1.8,.6);sph(.03,0x111111,.31,.06,s*.12,k)});sph(.05,0x2a1a14,.36,-.07,0,k,1.3,1,1.3);box(.03,.025,.14,0x5a3a2a,.33,-.13,0,k);
  g.userData.anim=t=>{k.rotation.z=Math.sin(t*.5)*.12;k.rotation.y=Math.sin(t*.4)*.35;g.rotation.z=Math.sin(t*.7)*.02};return g}
const faultierH=automerge(faultierHang);
function tukanM(par){const g=grp(0,0,0,par),sw=0x1a1a1e;
  sph(.3,sw,0,.7,0,g,1,1.5,.9).castShadow=true;sph(.2,0xf6f6f0,.13,.85,0,g,.8,1.2,.9);sph(.1,0xe03a2a,-.1,.36,0,g,1,.8,1);box(.1,.7,.24,sw,-.28,.28,0,g).rotation.z=.2;[-1,1].forEach(s=>{cyl(.025,.18,0x5a5a60,.02,.12,s*.1,g);box(.2,.04,.08,0x5a5a60,.05,.03,s*.1,g)});
  const k=grp(.18,1.18,0,g);sph(.2,sw,0,0,0,k,1.05,.95,.95).castShadow=true;[-1,1].forEach(s=>{sph(.085,0x3a9ad8,.14,.04,s*.14,k,1,1,.5);sph(.04,0x111111,.17,.05,s*.16,k)});
  sph(.18,0xffb61e,.45,0,0,k,2.4,.8,.7).castShadow=true;sph(.12,0xf06a20,.45,-.1,0,k,2.4,.4,.65);sph(.05,0x2a1a1a,.7,.03,0,k,1,1,1.3);box(.5,.015,.015,0x7a4a10,.45,-.05,.12,k);
  g.userData.anim=t=>{k.rotation.z=Math.sin(t*1.3)*.14;k.rotation.y=Math.sin(t*.8)*.4};return g}
const tukan=automerge(tukanM);
function araM(par,k){const g=grp(0,0,0,par),c=k?0x2a6ac0:0xd8281e,b=k?0xf2c820:0xe8e0d0,w=k?0xf2c820:0x2a6ac0;
  sph(.28,c,0,.75,0,g,.9,1.6,.85).castShadow=true;if(k)sph(.2,b,.12,.7,0,g,.7,1.3,.8);[-1,1].forEach(s=>{sph(.2,w,-.08,.72,s*.2,g,.7,1.5,.35);sph(.1,k?0x2a6ac0:0xf2c820,-.08,.72,s*.24,g,.6,1.2,.4)});box(.1,.9,.2,c,-.25,.1,0,g).rotation.z=.18;box(.06,.5,.16,w,-.38,-.22,0,g).rotation.z=.18;
  const h=grp(.2,1.32,0,g);sph(.2,k?0x4a9a40:c,0,0,0,h).castShadow=true;sph(.13,0xf2eee0,.1,-.02,0,h,1,1,.6);[-1,1].forEach(s=>{sph(.04,0x111111,.14,.04,s*.12,h)});cone(.1,.3,0x2a2a2e,.18,-.06,0,h).rotation.z=-2.2;sph(.07,0x2a2a2e,.2,.05,0,h,1.4,.9,.9);cyl(.03,.2,0x5a5a60,.02,.12,.08,g);cyl(.03,.2,0x5a5a60,.02,.12,-.08,g);
  g.userData.anim=t=>{h.rotation.z=Math.sin(t*1.7)*.12;h.rotation.y=Math.sin(t*.9)*.5};return g}
const ara=automerge(p=>araM(p,0)),ara2=automerge(p=>araM(p,1));
/* Fliegender Vogel: Körper + ein Flügelpaar (2 Zeichenaufrufe), Flügelschlag durch wechselnde Spannweite */
function flieger(cx,cz,r,y,ph,sp,f1,f2){const g=grp(0,y,0);sph(.12,f1,0,0,0,g,1.6,.7,.7);box(.14,.05,.1,f2,.17,0,0,g);const wg=grp(0,.02,0,g);box(.34,.03,1.1,f1,0,0,0,wg);g.scale.setScalar(1.6);
  g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.8,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.8;g.position.set(x,y+Math.sin(t*.8+ph)*1.8,z);g.rotation.y=Math.atan2(-vz,vx);wg.scale.z=.35+.65*Math.abs(Math.sin(t*9));wg.position.y=.02+Math.sin(t*9)*.05};leben(g,ph);return vm(g,wg)}
/* Kolibri schwebt an Blüten */
function kolibri(cx,cz,y,ph,f){const g=grp(cx,y,cz);f=f||0x1aa88a;sph(.1,f,0,0,0,g,1.6,.9,.9);sph(.075,0xe03a4a,.1,-.03,0,g,.9,.8,.9);sph(.07,f,.18,.04,0,g);cyl(.012,.3,0x2a2a2e,.38,.04,0,g).rotation.z=Math.PI/2;box(.18,.02,.08,0x2a6a5a,-.2,-.02,0,g).rotation.z=.2;
  const w=[-1,1].map(s=>{const p=grp(0,.05,s*.06,g);box(.1,.012,.26,0xe4f0f0,0,0,s*.13,p);return p});
  g.userData.anim=t=>{const a=t*.9+ph;g.position.set(cx+Math.cos(a)*.6,y+Math.sin(t*1.7+ph)*.25,cz+Math.sin(a*1.3)*.5);g.rotation.y=-a*1.3+1.5;g.rotation.z=.25;w[0].rotation.x=Math.sin(t*45)*.8;w[1].rotation.x=-Math.sin(t*45)*.8};leben(g,ph);g.scale.setScalar(2.6);return vm(g,w[0],w[1])}
function bruellaffeM(par){const g=grp(0,0,0,par),f=0x8a4a26,d=0x2a1a12;
  sph(.5,f,0,.7,0,g,.9,1.2,.8).castShadow=true;sph(.3,dk(f,1.2),.1,.62,0,g,.7,1,.7);[-1,1].forEach(s=>{sph(.16,d,.18,.15,s*.3,g,1.5,.6,.8);sph(.2,f,-.12,.34,s*.3,g,1.3,1,.8)});
  [-1,1].forEach(s=>{const a=grp(.05,1.1,s*.44,g);a.rotation.z=.35;cyl(.1,.8,f,0,-.4,0,a,true);sph(.11,d,0,-.85,0,a)});
  const k=grp(.22,1.55,0,g);sph(.3,f,0,0,0,k,1.05,1,.9).castShadow=true;sph(.19,d,.28,-.06,0,k,1,.9,.9);sph(.24,dk(f,.7),.05,-.3,0,k,1,1.3,1);[-1,1].forEach(s=>{sph(.05,0x111111,.28,.1,s*.14,k);sph(.08,f,-.1,.12,s*.28,k)});
  for(let i=0;i<7;i++){const u=i/6;sph(.095-u*.03,i>4?d:f,-.5-Math.sin(u*2.4)*.5,.25+u*.9,0,g)}
  g.userData.anim=t=>{k.rotation.z=Math.sin(t*1.1)*.1;k.scale.y=1+Math.max(0,Math.sin(t*.7))*.12};return g}
const bruellaffe=automerge(bruellaffeM);
function kapuzinerM(par){const g=grp(0,0,0,par),f=0x7a5a38,c=0xf0dcb0,d=0x2a1a12;
  sph(.34,f,0,.5,0,g,.9,1.2,.8).castShadow=true;sph(.22,c,.1,.5,0,g,.7,1,.7);[-1,1].forEach(s=>{sph(.12,f,-.1,.2,s*.2,g,1.5,.7,.8)});
  [-1,1].forEach(s=>{const a=grp(.05,.78,s*.3,g);a.rotation.z=.4;cyl(.07,.5,f,0,-.25,0,a,true);sph(.07,d,0,-.52,0,a)});
  const k=grp(.2,1.06,0,g);sph(.22,c,0,0,0,k,1.05,1,.95).castShadow=true;sph(.19,d,-.03,.1,0,k,1.05,.65,1);sph(.11,0xe8c8a0,.15,-.05,0,k,1,.9,.9);[-1,1].forEach(s=>{sph(.04,0x111111,.2,.05,s*.1,k);sph(.06,f,-.02,.0,s*.2,k)});
  for(let i=0;i<8;i++){const u=i/7;sph(.06,i>5?d:f,-.4-Math.sin(u*2.6)*.35,.3+u*.7,0,g)}
  g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*2.2))*.3;k.rotation.y=Math.sin(t*1.2)*.5};return g}
const kapuziner=automerge(kapuzinerM);
function flecken(g,bl,bh,bw,h,n,f){for(let i=0;i<n;i++){const u=(i%7)/6*2-1,a=(.25+(Math.floor(i/7)*.37+(i%3)*.13))*Math.PI*.9;sph(.075,f||0x2a1a10,u*bl*.9,h+Math.sin(a)*bh*.95,(i%2?1:-1)*Math.cos(a)*bw*.92,g,1.3,.5,1.3).rotation.z=u*.2}}
function jaguarM(par){return vier(par,{f:0xe0a030,w:0xf6e8c0,d:0x2a2018,h:.78,bl:1.15,bh:.45,bw:.42,lr:.13,bauch:1,na:.35,nl:.3,nr:.24,hr:.32,hl:1.2,ht:.2,oh:.7,ef:0xe0a030,tr:.11,tl:3.8,tw:2.5,tc:0xe0a030,x:(g,kh,tl,nk)=>{flecken(g,1.15,.45,.42,.78,17);sph(.2,0xf6e8c0,.34,-.14,0,kh,1.1,.8,1)}})}
const jaguar=automerge(jaguarM);
function tapirM(par){return vier(par,{f:0x4a3c34,w:0x5a4a40,d:0x2a2018,h:.78,bl:1.0,bh:.58,bw:.46,lr:.14,na:.5,nl:.28,nr:.26,hr:.3,hl:1.35,ht:.4,oh:.9,ef:0x4a3c34,notail:1,tr:.07,x:(g,kh,tl,nk)=>{sph(.17,0x5a4a40,.5,-.12,0,kh,2.4,.9,.9);sph(.1,0x2a2a2e,.86,-.2,0,kh,1.6,.8,.9);[-1,1].forEach(s=>sph(.08,0x6a5a4e,-.05,.32,s*.2,kh,1,.7,.8))}})}
const tapir=automerge(tapirM);
function wasserschweinM(par){return vier(par,{f:0x8a6a44,w:0xa88a60,d:0x4a3220,h:.52,bl:.95,bh:.5,bw:.42,lr:.1,na:.3,nl:.15,nr:.22,hr:.34,hl:1.3,ht:.1,oh:.5,ef:0x6a4a2a,notail:1,tr:.05,x:(g,kh)=>{box(.34,.32,.52,0x3a2a1a,.5,-.06,0,kh)}})}
const wasserschwein=automerge(wasserschweinM);
function ameisenbaerM(par){const g=grp(0,0,0,par),f=0x7a6a58;
  sph(.5,f,0,.7,0,g,1.5,.8,.7).castShadow=true;sph(.5,0x2a2420,.3,.78,0,g,.18,.85,.78).rotation.z=-.5;sph(.3,0xcdbf9e,.6,.84,.1,g,.5,.15,.2);
  [[.55,1],[.55,-1],[-.55,1],[-.55,-1]].forEach(p=>{cyl(.085,.5,0x5a4a3a,p[0],.28,p[1]*.28,g,true);box(.28,.07,.1,0x2a2420,p[0]+.08,.04,p[1]*.28,g);cone(.025,.14,0xe8e0c8,p[0]+.22,.05,p[1]*.28,g).rotation.z=-1.57});
  const k=grp(.78,.78,0,g);k.rotation.z=-.3;sph(.18,f,0,0,0,k,1.2,1,.9);cyl(.07,.9,0x9a8a74,.55,-.08,0,k).rotation.z=-Math.PI/2+.1;sph(.05,0x2a1a1a,1.0,-.15,0,k);sph(.035,0x111111,.1,.1,.13,k);sph(.035,0x111111,.1,.1,-.13,k);sph(.07,0x5a4a3a,-.05,.18,.1,k);sph(.07,0x5a4a3a,-.05,.18,-.1,k);
  const t=grp(-.75,.8,0,g);sph(.5,0x5a5048,-.5,0,0,t,2.2,.5,.55);sph(.35,0x9a8a74,-.3,.1,0,t,2,.4,.5);t.rotation.z=.25;
  g.userData.anim=t2=>{k.rotation.z=-.3+Math.sin(t2*1.1)*.18;g.position.y=Math.abs(Math.sin(t2*1.5))*.03};return g}
const ameisenbaer=automerge(ameisenbaerM);
function kaimanM(par){const g=grp(0,0,0,par),f=0x5a6a38,d=0x3a4a2a;
  sph(.5,f,0,.3,0,g,2,.45,.8).castShadow=true;for(let i=0;i<5;i++)box(.12,.1,.5,d,-.8+i*.4,.62,0,g);
  const tl=grp(-.95,.28,0,g);for(let i=0;i<6;i++)sph(.34-i*.045,i%2?d:f,-i*.5,0,Math.sin(i*.9)*.12,tl,1.6,.7,.7);
  const k=grp(.95,.34,0,g);sph(.3,f,.1,0,0,k,1.8,.8,.9).castShadow=true;box(1.1,.2,.5,f,.9,-.05,0,k);box(1.0,.1,.46,0xe8e0c0,.95,-.17,0,k);[-1,1].forEach(s=>{sph(.1,0xf2c820,.1,.28,s*.22,k);sph(.04,0x111111,.16,.3,s*.22,k,.6,1.6,.6);for(let i=0;i<4;i++)cone(.025,.08,0xffffff,.55+i*.22,-.14,s*.18,k)});
  [[.5,1],[.5,-1],[-.5,1],[-.5,-1]].forEach(p=>{box(.45,.14,.18,d,p[0],.1,p[1]*.58,g).rotation.y=p[1]*.4*(p[0]>0?1:-1)});
  g.userData.anim=t=>{k.rotation.z=Math.max(0,Math.sin(t*.5))*.08};return g}
const kaiman=automerge(kaimanM);
function delphinM(par){const g=grp(0,0,0,par),f=0xf0a0b8,b=0xf8d0dc;
  sph(.5,f,0,0,0,g,2.6,.8,.75).castShadow=true;sph(.4,b,.1,-.18,0,g,2.2,.45,.6);sph(.42,f,1.15,.12,0,g,.9,.85,.85);cyl(.09,.9,f,1.95,.0,0,g).rotation.z=Math.PI/2-.08;sph(.045,0x111111,1.35,.28,.28,g);sph(.045,0x111111,1.35,.28,-.28,g);
  cone(.2,.55,f,.1,.55,0,g).rotation.z=-.45;[-1,1].forEach(s=>{box(.55,.06,.3,f,.55,-.3,s*.45,g).rotation.z=-.4});
  const tl=grp(-1.4,0,0,g);box(.5,.1,.3,f,0,0,0,tl);box(.5,.1,.3,f,-.15,0,0,tl);[-1,1].forEach(s=>box(.5,.08,.34,f,-.55,0,s*.4,tl).rotation.y=s*.4);
  g.userData.anim=t=>{tl.rotation.z=Math.sin(t*5)*.25};return g}
const delphin=automerge(delphinM);
function piranhaM(par){const g=grp(0,0,0,par),f=0x8a9aa0;sph(.28,f,0,0,0,g,1.5,.95,.5);sph(.22,0xe03a2a,.02,-.12,0,g,1.5,.45,.5);sph(.13,f,.4,.02,0,g,1,.9,.9);box(.12,.07,.3,0xe03a2a,.5,-.08,0,g);for(let i=0;i<3;i++)cone(.025,.07,0xffffff,.48+i*.04,-.07,i%2?.08:-.08,g).rotation.x=Math.PI;[-1,1].forEach(s=>sph(.035,0x111111,.45,.08,s*.17,g));cone(.2,.35,0xe03a2a,-.62,0,0,g).rotation.z=Math.PI/2;box(.3,.14,.04,f,-.05,.3,0,g);return vm(g)}
function baumfroschM(par){const g=grp(0,0,0,par),f=0x3ab02a,bl=0x3a6ad8;
  sph(.25,f,0,.2,0,g,1.3,.9,.9).castShadow=true;sph(.18,0xf6f6e8,.1,.12,0,g,1,.6,.8);[-1,1].forEach(s=>{sph(.08,bl,0,.22,s*.2,g,1.3,.9,.4);sph(.12,f,.2,.28,s*.12,g);sph(.07,0xe03a2a,.28,.35,s*.12,g);sph(.03,0x111111,.34,.35,s*.12,g,.5,1.5,.5);sph(.05,0xf59e3f,.3,.04,s*.22,g,1.2,.6,.9);sph(.05,0xf59e3f,-.2,.04,s*.2,g,1.2,.6,.9);sph(.1,f,-.15,.12,s*.2,g,1.3,.7,.7)});
  const th=sph(.07,0xe8f0b0,.3,.15,0,g,1.2,.8,1);g.userData.anim=t=>{const q=1+Math.max(0,Math.sin(t*2.4))*.5;th.scale.set(.084*q,.056*q,.07*q)};return g}
const baumfrosch=automerge(baumfroschM);
function chamaeleonM(par){const g=grp(0,0,0,par),f=0x6ab040;
  sph(.28,f,0,.3,0,g,1.5,1.1,.55).castShadow=true;sph(.14,0xe8d040,0,.35,.15,g,1.6,.7,.3);[-1,1].forEach(s=>{cyl(.04,.3,dk(f,.85),.2,.14,s*.18,g);cyl(.04,.3,dk(f,.85),-.2,.14,s*.18,g);cyl(.04,.1,dk(f,.7),.2,.0,s*.2,g)});
  const k=grp(.45,.42,0,g);sph(.17,f,0,0,0,k,1.2,.95,.8);cone(.12,.3,dk(f,.8),-.12,.18,0,k).rotation.z=.6;const eg=grp(.08,.1,0,k);[-1,1].forEach(s=>{const e=grp(0,0,s*.14,eg);sph(.075,dk(f,.8),0,0,0,e);sph(.035,0xf2f2d0,.04,0,.03*s,e);sph(.018,0x111111,.07,0,.04*s,e)});
  const tl=grp(-.45,.3,0,g);for(let i=0;i<8;i++){const a=i*.55;sph(.09-i*.008,i%2?0x8ac040:f,-Math.sin(a)*.18-i*.03,Math.cos(a)*.18-.18,0,tl)}
  g.userData.anim=t=>{eg.rotation.y=Math.sin(t*1.3)*.7};return g}
const chamaeleon=automerge(chamaeleonM);
function stabschreckeM(par){const g=grp(0,0,0,par),f=0x7a6a3a;
  const seg=[[0,.1,0],[.3,.35,0],[.7,.5,0],[1.1,.6,0],[1.5,.55,0],[1.8,.4,0]];seg.forEach((p,i)=>{if(i<5){const q=seg[i+1],dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy);const c=cyl(.03,L,f,(p[0]+q[0])/2,(p[1]+q[1])/2,0,g);c.rotation.z=Math.atan2(dx,dy)*-1}});
  [[.6,1],[.6,-1],[1.0,1],[1.0,-1],[1.4,1],[1.4,-1]].forEach(p=>{const a=cyl(.015,.8,dk(f,.9),p[0]+.1,.35,p[1]*.35,g);a.rotation.x=p[1]*.7;a.rotation.z=.3;cyl(.015,.6,dk(f,.9),p[0]+.1,.1,p[1]*.65,g).rotation.x=-p[1]*.2});
  sph(.06,f,1.9,.35,0,g,1.4,1,1);sph(.02,0x111111,1.94,.38,.04,g);sph(.02,0x111111,1.94,.38,-.04,g);cyl(.01,.5,f,2.1,.5,.03,g).rotation.z=-.9;cyl(.01,.5,f,2.1,.5,-.03,g).rotation.z=-.9;
  g.userData.anim=t=>{g.rotation.z=Math.sin(t*1.2)*.04};return g}
const stabschrecke=automerge(stabschreckeM);
function kaeferM(par,k){const g=grp(0,0,0,par),T=[[0x3a2a1e,0x6a4a2e],[0xd8281e,0x2a2018],[0xe8e4d4,0x2a2018],[0x2ab08a,0x3a8a2a]][k%4];
  sph(.45,T[0],0,.4,0,g,1.4,.8,1).castShadow=true;[-1,1].forEach(s=>sph(.3,T[0],-.05,.52,s*.2,g,1.3,.8,.55));box(.04,.04,.9,T[1],-.05,.76,0,g).rotation.y=1.57;
  if(k%4===1)for(let i=0;i<6;i++)sph(.08,0x1a1a1a,-.3+(i%3)*.3,.78,(i<3?-1:1)*.22,g,1,.4,1);if(k%4===2)for(let i=0;i<5;i++)box(.2,.04,.5,T[1],-.4+i*.22,.73,0,g);
  const h=grp(.65,.4,0,g);sph(.22,T[1],0,0,0,h);[-1,1].forEach(s=>{sph(.04,0x111111,.15,.07,s*.12,h);cyl(.015,.5,0x2a2a2a,.15,.15,s*.1,h).rotation.z=-.8});if(k%4===0){cone(.08,.7,T[1],.2,.12,0,h).rotation.z=-1.2;cone(.06,.3,T[1],.1,.02,0,g).rotation.z=-1.0}
  [-1,1].forEach(s=>[-.35,0,.35].forEach(p=>{cyl(.025,.55,0x2a2a2a,p,.2,s*.5,g).rotation.x=s*.9}));
  g.userData.anim=t=>{h.rotation.y=Math.sin(t*.9+k)*.3};return g}
const kaefer=automerge(kaeferM);
/* Forscherin oder Forscher in Safarikleidung (unbewegt) */
function forscher(x,z,rot,k,s){kreis(x,z,.5);const F=[[0xc8b27a,0x6a5a3a,0x6b4626],[0xe0d8b8,0x4a5a3a,0x2a1d14],[0x8aa070,0x6a5a3a,0xb5651d],[0xd8c898,0x3a4a5a,0xe8c24a]][k%4];
  const m=kindL({jacke:F[0],hose:F[1],haut:k%3===0?0xc8946a:0xe8b98f,haar:F[2],stil:k%2?'zoepfe':'kurz',rucksack:[0x6a5a3a,0x8a3a2a,null,0x3a5a7a][k%4]},scene);m.g.position.set(x,0,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.3);hutAuf(m,[HUTK,0x8a7a4a,0xe8e0c0][k%3]);return m}
/* Mensch aus dem Dorf: einfache helle Kleidung, ohne Verkleidung */
function dorfmensch(x,z,rot,k,s){kreis(x,z,.5);const F=[[0xf0e4c8,0x6a5a4a,0x1a1410],[0xe8785a,0x4a3a2a,0x1a1410],[0x4a8aa8,0xf0e4c8,0x2a1d14],[0xf2c230,0x6a4a32,0x1a1410],[0x6aa86a,0x5a4a3a,0x2a1d14]][k%5];
  const m=kindL({jacke:F[0],hose:F[1],haut:[0xb8845a,0xa87a50,0xc4906a][k%3],haar:F[2],stil:k%2?'zoepfe':'kurz',rucksack:null},scene);m.g.position.set(x,0,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.3);return m}
/* Rundhaus: Lehmwand, Strohdach, Tür */
function rundhaus(x,z,r,h,wand,dach,rot){const g=grp(x,0,z);cyl(r,h,wand||0xc8a070,0,h/2,0,g,true);cone(r+.7,h*.9,dach||0xb89a50,0,h+h*.45,0,g,true);cone(.25,.5,dach||0xb89a50,0,h*1.9+.1,0,g);const d=grp(0,0,0,g);d.rotation.y=rot||0;box(.14,h*.7,.9,0x4a3220,r*.99,h*.35,0,d);box(.15,h*.3,.1,0x6a4a2a,r*.99,h*.7,0,d);box(.4,.4,.4,0x6a5a4a,r*.5,.2,r*.9,g);kreis(x,z,r+.3);return g}
/* Zelt (Safari) */
function zelt(x,z,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;farbe=farbe||0xe0d4a8;[-1,1].forEach(s=>box(2.5,.07,3.6,farbe,s*.8,.9,0,g,true).rotation.z=-s*.844);[1.8,-1.8].forEach(q=>tri([-1.6,0,q],[1.6,0,q],[0,1.8,q],dk(farbe,.92),g));box(.8,1.3,.06,0x3a3a30,0,.65,1.82,g);sperrKasten(x,z,3.4,3.8,rot||0);return g}
/* Hängematte zwischen zwei Pfosten */
function haengematte(x,z,rot,f){const g=grp(x,0,z);g.rotation.y=rot||0;[-1,1].forEach(s=>cyl(.08,2.2,0x6a4a2e,s*1.7,1.1,0,g,true));for(let i=0;i<9;i++){const u=i/8*2-1;box(.5,.05,.7,i%2?f||0xe8785a:dk(f||0xe8785a,.8),u*1.5,1.9-(1-u*u)*.8,0,g)}[-1,1].forEach(s=>kreis(x+Math.cos(rot||0)*s*1.7,z-Math.sin(rot||0)*s*1.7,.2));return g}
/* Geländewagen (schaut nach +x) */
function jeep(x,z,rot,f){const g=grp(x,0,z);g.rotation.y=rot||0;f=f||0x8aa070;box(4,.9,1.9,f,0,.95,0,g,true);box(1.8,.9,1.8,f,-.5,1.8,0,g,true);box(1.7,.06,1.9,dk(f,.7),-.5,2.28,0,g);box(.06,.7,1.7,0x9fd0e8,.35,1.8,0,g);[-1,1].forEach(s=>{box(1.2,.5,.06,0x9fd0e8,-.5,1.85,s*.91,g);[-1.3,1.3].forEach(q=>cyl(.46,.4,0x2a2a2e,q,.46,s*.95,g,true).rotation.x=Math.PI/2);sph(.15,0xfff0b0,2.02,1.05,s*.6,g)});cyl(.4,.25,0x2a2a2e,-2.1,1.2,0,g).rotation.z=Math.PI/2;box(2.4,.08,1.5,0x6a5a3a,-.2,2.35,0,g);sperrKasten(x,z,4.4,2.4,rot||0);return g}
/* Kanu (schaut nach +x), schwimmt und wippt */
function kanu(par,f){const g=grp(0,0,0,par);f=f||0xd8602a;box(3.6,.3,.9,f,0,.12,0,g,true);[-1,1].forEach(s=>{box(3.4,.3,.1,f,0,.3,s*.42,g);cone(.45,.8,f,s*1.9,.25,0,g).rotation.z=-s*1.57;});box(.1,.1,.8,0x8a5a32,0,.4,0,g);box(.1,.1,.8,0x8a5a32,.9,.4,0,g);box(.1,.1,.8,0x8a5a32,-.9,.4,0,g);return g}
function schwimmen(g,y0,ph,a){g.userData.keep=1;const x0=g.position.x,z0=g.position.z,r0=g.rotation.y;lebendig.push({o:{userData:{anim:t=>{g.position.y=y0+Math.sin(t*1.1+ph)*.06*(a||1);g.rotation.z=Math.sin(t*.9+ph)*.025;g.rotation.y=r0+Math.sin(t*.4+ph)*.04}}},ph:0})}
/* Fließende Schwärme (Falter, Ameisen): eine Instanz-Gruppe, Farbe je Instanz */
function schwarmF(geo,n,cols,fn,cx,cz){const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),n);im.frustumCulled=false;scene.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color();
  for(let i=0;i<n;i++)im.setColorAt(i,C.set(cols[i%cols.length]));im.instanceColor.needsUpdate=true;
  lebendig.push({o:{userData:{anim:t=>{if(Math.hypot(camera.position.x-cx,camera.position.z-cz)>120){im.visible=false;return}im.visible=true;for(let i=0;i<n;i++){const a=fn(i,t);P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(a[7]||0,a[6]||0,a[8]||0,'YXZ'));M.compose(P,Q,S);im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}}},ph:0});return im}
/* Falterschwarm: n Falter kreisen um (cx,cz) (eine Instanz-Gruppe, die Flügel „schlagen“ durch wechselnde Breite) */
function faltervolk(cx,cz,r,n,cols,y0){const c2=[];cols.forEach(c=>{c2.push(c,c)});return schwarmF(gBox,n*2,c2,(i,t)=>{const b=i>>1,sd=i%2?1:-1,a=t*.35+b*2.4,rr=r*(.35+((b*37)%10)/14),x=cx+Math.cos(a+b)*rr,z=cz+Math.sin(a*1.2+b)*rr*.8,y=(y0||1.6)+((b*13)%9)*.18+Math.sin(t*1.1+b)*.35,hy=-a*1.2+1.5,fl=Math.sin(t*12+b*1.7)*.8+.25;return[x+Math.sin(hy)*sd*.2,y,z+Math.cos(hy)*sd*.2,.3,.04,.4,hy,sd*fl,0]},cx,cz)}
/* Strauch mit zwei Teilen (blm statt sph: weniger Dreiecke) */
function busch(x,z,s,k){s=s||1;inst('blm',x,.55*s,z,.95*s,.7*s,.95*s,k||0x5a8a3a);inst('blm',x+.5*s,.6*s,z+.3*s,.65*s,.5*s,.65*s,0x6aa04a);kreis(x,z,.8*s)}

/* ==================== Etappe 1: Fläche, Wege, Fluss, Eingang, Tor, Festplatz, Kulisse ==================== */
/* Ufer-Hindernis: zwei Linien entlang der Ufer, mit Öffnungen an Brücken und Stegen (offen = Liste [x,z]) */
function uferSperr(s,w,offen){const A=inw(s,w/2+.9),B=inw(s,-(w/2+.9)),skA=new Set(),skB=new Set();offen.forEach(o=>{let bi=0,bd=1e9;s.forEach((q,i)=>{const d=Math.hypot(q[0]-o[0],q[1]-o[1]);if(d<bd){bd=d;bi=i}});if(o[2]!==-1){skA.add(bi-1);skA.add(bi)}if(o[2]!==1){skB.add(bi-1);skB.add(bi)}});
  /* A = Südufer (z größer), B = Nordufer; Öffnungen mit dritter Angabe 1 gelten nur am Südufer (Stege), ohne Angabe an beiden Ufern (Brücken) */
  for(let i=0;i<s.length-1;i++){if(!skA.has(i))sperrLinie(A[i][0],A[i][1],A[i+1][0],A[i+1][1],.3);if(!skB.has(i))sperrLinie(B[i][0],B[i][1],B[i+1][0],B[i+1][1],.3)}}
function rioBauen(){const s=RIO,w=RW;wegBand(s,w+3.2,0x8c7050,.054);wegBand(s,w,WASSER,.082);wegBand(s,w*.55,0x58b4b0,.088);
  /* Strömung: helle Streifen, die treiben */
  const st=[];for(let i=0;i<46;i++){const k=Math.floor(nr()*(s.length-3))+1;st.push(k)}
  const fl=new THREE.InstancedMesh(gBox,new THREE.MeshBasicMaterial({color:0xcfeeee,transparent:true,opacity:.5,depthWrite:false}),st.length);fl.frustumCulled=false;scene.add(fl);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler();
  lebendig.push({o:{userData:{anim:t=>{st.forEach((k,i)=>{const p=(k+t*1.5+i*7)%(s.length-3),j=Math.floor(p),u=p-j,a=s[j],b=s[j+1],ox=Math.sin(i*2.3)*(w*.33);P.set(a[0]+(b[0]-a[0])*u,.11,a[1]+(b[1]-a[1])*u+ox);S.set(1.6+(i%3)*.6,.02,.16);Q.setFromEuler(E.set(0,-Math.atan2(b[1]-a[1],b[0]-a[0]),0));M.compose(P,Q,S);fl.setMatrixAt(i,M)});fl.instanceMatrix.needsUpdate=true}}},ph:0});
  const br=[bruecke(3,rioZ(3),s,w)];return br}
/* Hängebrücke über den Rio (x = bx): Holzdeck, Seile, zwei Türme, Geländer als Hindernis */
function haengebruecke(bx){const s=RIO;let bi=0,bd=1e9;s.forEach((q,i)=>{const d=Math.abs(q[0]-bx);if(d<bd){bd=d;bi=i}});const a=s[Math.max(0,bi-1)],c=s[Math.min(s.length-1,bi+1)],th=Math.atan2(-(c[1]-a[1]),c[0]-a[0]),X=s[bi][0],Z=s[bi][1];
  const g=grp(X,0,Z);g.rotation.y=th;const L=RW+12,hw=1.6;box(hw*2,.12,L,0x9a6a3a,0,.3,0,g,true);for(let i=0;i<L/1.2;i++)box(hw*2+.2,.05,.14,0x6a4220,0,.38,-L/2+.6+i*1.2,g);
  [-1,1].forEach(sg=>{box(.1,.1,L,0x8a7a4a,sg*(hw+.05),1.15,0,g);box(.08,.08,L,0x8a7a4a,sg*(hw+.05),.7,0,g);for(let i=0;i<=L/2.4;i++){box(.1,1.0,.1,0x6a4a2e,sg*(hw+.05),.8,-L/2+i*2.4,g)}});
  [-1,1].forEach(e=>{const z0=e*(L/2-.7);[-1,1].forEach(sg=>{cyl(.28,6.4,0x7a5a3a,sg*(hw+.9),3.2,z0,g,true);cyl(.32,.3,0x5a3a22,sg*(hw+.9),6.3,z0,g)});box(hw*2+2.2,.3,.4,0x6a4a2e,0,6.3,z0,g);
    for(let k=0;k<2;k++)[-1,1].forEach(sg=>{const A=[sg*(hw+.9),6.3,z0],B=[sg*(hw+.9),1.15,e*(L/2-8)];rohr(A,B,.05,0x4a3a22,g)})});
  [-1,1].forEach(sg=>{let pa=null;for(let i=0;i<=8;i++){const u=i/8,z=-L/2+.7+u*(L-1.4),y=6.1-Math.sin(u*Math.PI)*4.7,p=[sg*(hw+.9),y,z];if(pa)rohr(pa,p,.05,0x4a3a22,g);pa=p;if(i>0&&i<8)cyl(.025,y-1.2,0x4a3a22,sg*(hw+.9),(y+1.2)/2,z,g)}});
  const cs=Math.cos(th),sn=Math.sin(th),W=(lx,lz)=>[X+lx*cs+lz*sn,Z-lx*sn+lz*cs];[-1,1].forEach(sg=>{const p=W(sg*(hw+.05),-L/2),q=W(sg*(hw+.05),L/2);sperrLinie(p[0],p[1],q[0],q[1],.1)});
  [-1,1].forEach(e=>[-1,1].forEach(sg=>{const p=W(sg*(hw+.9),e*(L/2-.7));kreis(p[0],p[1],.4)}));return[X,Z]}
function etappe1(){
  WASSER=0x3f9aa0;
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(1400,1400),mat(0x3f7d33));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
  bandFl(160,70,0x4a8a38,.02);bandFl(-60,-120,0x377530,.02);bandFl(-120,-250,0x2f6b2c,.02);
  [[-100,40,26],[60,0,22],[-30,-60,20],[120,-40,24],[-140,-110,22],[90,-130,20],[0,-170,26],[-60,90,18],[110,90,20]].forEach(p=>inst('sphT',p[0],0,p[1],p[2],.05,p[2]*.7,0x6a5a38));
  hauptweg(5);
  SEITENWEGE.forEach(r=>{weg(strasse(r),4);const px=wegX(r);kreuzplatz(px,roadZ(px,r),7.5)});
  /* Ringwege West und Ost, Westweg führt über die Hängebrücke */
  weg(spl([[-146,94],[-152,60],[-146,20],[-150,-20],[-148,-58],[-148,-72]],10),3);weg(spl([[-148,-104],[-150,-112],[-146,-136],[-150,-160]],10),3);weg(spl([[146,94],[150,50],[144,8],[148,-30],[144,-58]],10),3);
  weg([[0,TORZ+2],[0,TORZ-24]],5,FARBEN.platz);scheibe(FEST.x,FEST.z,17,FARBEN.platz,.08);scheibe(0,114,12,FARBEN.platz,.07);
  const br=rioBauen();const hb=haengebruecke(-148),hb2=haengebruecke(78);
  const offen=[br[0],hb,hb2,[-58,rioZ(-58)+6,1],[50,rioZ(50)+6,1],[106,rioZ(106)+6,1]];
  uferSperr(RIO,RW,offen);
  /* ---------- Ausgang (Tor wird geöffnet) ---------- */
  ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{cyl(.8,6.8,0x6a4a2e,s*4.4,3.4,0,g,true);for(let k=0;k<3;k++)cyl(.84,.4,0x4a3220,s*4.4,1+k*2.2,0,g);sph(.9,0x4a8a3a,s*4.4,7.2,0,g,1,.7,1);cone(.3,1.2,0xe0302a,s*4.4,8.2,0,g)});box(10.8,1,.7,0x5a3a22,0,6.3,0,g,true);box(11,.3,1,0x2f7a34,0,6.95,0,g);for(let i=0;i<9;i++){const x=-4.6+i*1.15;cyl(.04,1.2+(i%3)*.7,0x2e5a28,x,5.4-(i%3)*.35,.2,g)}
    const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.3,.4);g.add(s);
    const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,0x8a5a32,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,i%2?0x5a3a22:0x7a4a2a,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.34,0x3a7a3a,s*-1.9,1,0,p);box(3.8,.2,.34,0x3a7a3a,s*-1.9,2.8,0,p);return p});
    kreis(-4.4,TORZ,1);kreis(4.4,TORZ,1);return {g,fl,offen:0}})();
  /* ---------- 1. Eingangstor: geschnitzte Pfosten mit Tukan und Ara, Girlanden, Info-Zelt, Geländewagen, Fiete ---------- */
  (function(){const ez=111;[-1,1].forEach(s=>{cyl(.7,6.6,0x7a5232,s*7,3.3,ez,scene,true);for(let k=0;k<3;k++)cyl(.74,.4,0x4a3220,s*7,1+k*2.2,ez,scene);sph(.8,0x3a8a3a,s*7,7.2,ez,scene,1,.8,1);kreis(s*7,ez,.95)});
    box(14.8,.9,.8,0x5a3a22,0,6.2,ez,scene,true);box(15.2,.35,1.2,0x2f7a34,0,6.85,ez,scene);const sn=schildText(CONFIG.spielname,'#fff8e6',7.5,1.6,CONFIG.spielname.length>12?44:60);sn.position.set(0,6.2,ez+.45);scene.add(sn);
    const t1=tukan(scene);t1.position.set(-7,7.6,ez);t1.rotation.y=Math.PI/2;t1.scale.setScalar(1.5);lebendig.push({o:t1,ph:1});const a1=ara(scene);a1.position.set(7,7.6,ez);a1.rotation.y=Math.PI/2;a1.scale.setScalar(1.5);lebendig.push({o:a1,ph:2});
    for(let i=0;i<13;i++){const t=i/12,x=-6.6+t*13.2;cyl(.04,1+Math.sin(t*9)*.4+.5,0x2e6a2a,x,5.5-Math.sin(t*3.14)*.6,ez+.5,scene);}
    for(let i=0;i<5;i++)sph(.22,[0xe0302a,0xf59e3f,0xf47ab0,0xffd45e,0xb06ae0][i],-4.5+i*2.2,5.3,ez+.7,scene,1,1,.6);
    fahne(-18,104,7,0x2f7a34,0xf2c230);fahne(18,104,7,0xe0302a,0xf2c230);
    zelt(-16,121,.4,0xe0d4a8);zelt(-24,114,.9,0xc8d8a0);
    (function(){const g=grp(15,0,121);g.rotation.y=-.3;box(5,.12,3,0x8a5a32,0,.9,0,g,true);[[-2.3,-1.3],[2.3,-1.3],[-2.3,1.3],[2.3,1.3]].forEach(p=>cyl(.1,.9,0x6a4220,p[0],.45,p[1],g));box(1.2,.5,.8,0x2a4a3a,-1.4,1.3,0,g);box(.8,.6,.6,0xe8e0c0,.2,1.4,.3,g);cyl(.03,2.2,0x3a3a3e,-1.6,2.5,.2,g);box(.9,.08,.7,0xe0302a,1.4,1.2,-.3,g);sperrKasten(15,121,5.2,3.2,-.3);g.rotation.y=-.3})();
    jeep(-22,136,.3);kiste(-9,126,0xf59e3f);kiste(-7.6,126.6,0x8ac040);kiste(-8.4,127.2,0xe0302a);tonne(11,126);tonne(12.2,126.4);
    forscher(-5,117,.4,0,1.3);forscher(5,118,3.4,1,1.25);forscher(-12,123,1.2,2,1.1);
    const f=fiete(scene);f.position.set(8.5,0,124);f.rotation.y=-2.6;f.scale.setScalar(1.7);lebendig.push({o:f,ph:3});stumpf(8.5,124.2,1.6);
    [[-14,110],[14,110],[-30,130],[30,132]].forEach(p=>{farn(p[0],p[1],1.4,0);palme(p[0]+(p[0]>0?4:-4),p[1],1.2)})})();
  /* ---------- Festplatz: Lichtung des Regenbogens, Bühne "Geschafft!" ---------- */
  (function(){const z0=FEST.z,bue=grp(0,0,z0-12);box(16,1,6,0x6a4a2e,0,.5,0,bue,true);box(16.4,.3,6.4,0xc8a060,0,1.05,0,bue);
    [-1,1].forEach(s=>{cyl(.35,11,0x6a4a2e,s*8.2,5.5,-2.6,bue,true);sph(.9,0x3a8a3a,s*8.2,11.4,-2.6,bue,1,.8,1)});box(17,.4,.5,0x5a3a22,0,10.8,-2.6,bue);
    for(let i=0;i<8;i++){const x=-7+i*2;box(1.9,.2,4.4,i%2?0x3a8a3a:0x2f7a34,x,10.5,-1,bue).rotation.x=.25}
    box(11,6.6,.2,0x2f6a34,0,4.4,-2.55,bue);[[-3.6,2.6,2.6,4.4],[0,3.8,3.2,5.4],[3.6,2.4,2.4,4],[-6.4,1.6,1.8,3]].forEach((p,i)=>{const c=cone(p[2],p[3],i%2?0x4a9a40:0x3a8a3a,p[0],1.3+p[3]/2,-2.3,bue);c.scale.z=.15;const k=sph(.5,[0xe0302a,0xf47ab0,0xf59e3f,0xffd45e][i],p[0],1.3+p[3]*.9,-2.1,bue,1,.7,.4)});
    const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.2,-2.4);bue.add(gs);kreis(0,z0-12,9);
    const farben=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4,0xf59e3f];for(let i=0;i<24;i++){const t=i/23,x=-14+t*28,y=6.4-Math.sin(t*Math.PI)*2.2;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:farben[i%5]}));l.position.set(x,y,z0-8);l.scale.setScalar(.28);scene.add(l)}
    [-14,14].forEach(x=>{cyl(.15,7,0x6a4220,x,3.5,z0-8,scene,true)});
    [-12,12].forEach(x=>{cyl(.9,.6,0x3a3a3e,x,1.6,z0+4,scene,true);cyl(.15,1.4,0x3a3a3e,x,.7,z0+4,scene);cyl(.6,1.2,0xe08a2a,x,.1,z0+4,scene);flamme(x,2,z0+4,1);rauch(scene,x+.2,3,z0+4);kreis(x,z0+4,1.1)});
    [[-10,z0+14],[10,z0+14]].forEach((p,i)=>{stall(p[0],p[1],5,3.4,2.6,[0xf0e4c8,0xe8d8b0][i],0x4a8a3a,0)});
    [[-12,z0+22],[12,z0+22],[-4,z0+25],[4,z0+25]].forEach(p=>{tisch(p[0],p[1],0);bankW(p[0]-1.6,p[1],Math.PI/2);bankW(p[0]+1.6,p[1],-Math.PI/2)});
    [[-6,z0-2],[6,z0-2],[-16,z0+8],[16,z0+8],[-8,z0+19],[8,z0+19]].forEach(p=>laterne(p[0],p[1]));
    [[-17,z0+3],[17,z0+3]].forEach(p=>{[[-1.4,.4],[0,0],[1.4,.4]].forEach(q=>{cyl(.45,1,0x8a5a32,p[0]+q[0],.5,p[1]+q[1],scene,true);kreis(p[0]+q[0],p[1]+q[1],.5)})});
    [[-20,z0+10],[20,z0+10]].forEach(p=>{[0,1,2].forEach(k=>{sph(.55,[0xf2c230,0xe8a020,0xf2c230][k],p[0]+(k-1)*.9,.5,p[1]+(k%2)*.5,scene)});kreis(p[0],p[1],1.4)});
    for(let i=0;i<40;i++){const a=nr()*6.28,r=20+nr()*14;const x=Math.cos(a)*r,z=z0-4+Math.sin(a)*r*.7;if(z<-232||z>-192)continue;if(i%2)farn(x,z,1+nr()*.5);else blumeI(x,z,i%6)}
    /* Regenbogen (erscheint beim Finale) */
    (function(){const rb=grp(0,0,z0-30);const cols=[0xe0302a,0xf59e3f,0xf2d030,0x4caf6a,0x3b8fc4,0x4a4aa8,0x9b4ab0];const ms=[];cols.forEach((c,i)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(46-i*1.6,.8,5,40,Math.PI),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:0,depthWrite:false,fog:false}));m.position.set(0,-6,0);rb.add(m);ms.push(m)});rb.userData.keep=1;
      lebendig.push({o:{userData:{anim:t=>{const f=(typeof finale!=='undefined'&&finale)?Math.max(0,Math.min(1,(finale.t-9)/4)):0;ms.forEach(m=>{m.material.opacity=f*.55;m.visible=f>0})}}},ph:0})})();
  })();
}
/* ---------- Kulisse: bewachsene Hügel rundum (fest, außerhalb der Welt) ---------- */
function kulisse(){
  const hu=(x,z,R,H,k)=>{inst('sph',x,H*.1,z,R,H*.75,R*1.1,[0x2f6a30,0x2a6030,0x357a38,0x2c6a3a][k%4]);inst('blm',x+R*.2,H*.7,z,R*.65,H*.32,R*.6,[0x3a8a3a,0x4a9a40][k%2]);inst('blm',x-R*.3,H*.55,z+R*.2,R*.5,H*.28,R*.5,0x2f7a34)};
  for(let x=-330,i=0;x<=330;x+=42,i++){hu(x,-300-(i%3)*18,44+(i*7)%16,70+(i*13)%40,i);hu(x+16,-262-(i%2)*10,34,48+(i*11)%24,i+1)}
  for(let x=-330,i=0;x<=330;x+=46,i++){if(Math.abs(x)<60)continue;hu(x,206+(i%3)*14,40+(i*5)%14,50+(i*9)%30,i)}
  for(let z=-260,i=0;z<=190;z+=40,i++){hu(-222-(i%3)*12,z,40+(i*7)%14,56+(i*11)%36,i);hu(222+(i%3)*12,z+10,40+(i*5)%14,54+(i*13)%34,i+2);hu(-290,z-8,52,90+(i*9)%40,i);hu(290,z-8,52,92+(i*7)%40,i+1)}
  /* Riesenbäume am Rand, ragen über den Zaun */
  for(let z=-228,i=0;z<140;z+=22,i++){[-1,1].forEach(s=>{const x=s*(184+(i%3)*5);urw(x,z+(i%4)*3,1.4+(i%3)*.2,2,false);urw(x+s*10,z+8,1.2,1,false)})}
  for(let x=-170,i=0;x<=170;x+=24,i++){urw(x,-240-(i%2)*6,1.4,2,false);urw(x+10,-252,1.2,1,false);if(Math.abs(x)>26)urw(x,154+(i%2)*5,1.3,i%2?1:2,false)}
}

/* ==================== Etappe 2: Süden, Gärten und Kleintiere (Orte 2 bis 10) ==================== */
/* Waagerechter Ast (Sitzstange) entlang x, um y gedreht */
function ast2(x,y,z,len,rot,r){const c=cyl(r||.16,len,0x6a4a2e,x,y,z,scene,true);c.rotation.z=Math.PI/2;c.rotation.y=rot||0;return c}
function funkMast(x,z,h){cyl(.12,h,0x6a6a70,x,h/2,z,scene,true);[.55,.75,.92].forEach(f=>box(2.4*(1.1-f*.6),.08,.1,0x6a6a70,x,h*f,z,scene));const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xff3030}));l.position.set(x,h+.2,z);l.scale.setScalar(.22);scene.add(l);bewegt(l,t=>{l.visible=Math.sin(t*4)>0});kreis(x,z,.3)}
function gummiWand(x,z,w,h,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;for(let i=0;i<4;i++)box(w/4+.05,h,.3,farbe||0x8a5a32,-w/2+(i+.5)*w/4,h/2,0,g,true);return g}
/* ---------- 2. Forscherlager ---------- */
function ort2(){const b=zone('Forscherlager'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x9a7a52,.09);
  zelt(X(-7),Z(-5),R+.3);zelt(X(2),Z(-8.5),R-.2,0xc8d8a0);zelt(X(9.5),Z(-3),R+.1,0xd8c090);
  (function(){const g=grp(X(-3.5),0,Z(3));g.rotation.y=R;box(2.8,.12,1.3,0x8a5a32,0,1,0,g,true);[-1,1].forEach(s=>[-1,1].forEach(q=>cyl(.07,1,0x6a4220,s*1.2,.5,q*.5,g)));box(1.1,.55,.7,0x3a4a3a,-.6,1.4,0,g);[0,1,2].forEach(i=>cyl(.1,.06,0xe8e0c0,-.9+i*.3,1.72,.37,g).rotation.x=Math.PI/2);box(.7,.35,.5,0x2a3a4a,.55,1.3,0,g);cyl(.04,.9,0x2a2a2e,1.0,1.5,0,g);box(.5,.06,.4,0xe8e8e0,.1,1.1,.3,g);sperrKasten(X(-3.5),Z(3),3,1.5,R)})();
  funkMast(X(-10),Z(-1),9);[[1,0],[-1,0],[0,1]].forEach(a=>rohr([X(-10),8,Z(-1)],[X(-10)+a[0]*4,.2,Z(-1)+a[1]*4+ (a[1]?0:0)],.03,0x3a3a3e));
  (function(){const dx=X(8),dz=Z(6);cyl(.12,1.6,0x6a6a70,dx,.8,dz,scene,true);const d=grp(dx,1.8,dz);const sch=mesh(gHalb,0xe8e8e4,0,0,0,1.2,.6,1.2,d);sch.rotation.x=-1.05;cyl(.04,.9,0x6a6a70,0,.35,.6,d).rotation.x=-.5;sph(.08,0xe0302a,0,.55,.75,d);bewegt(d,t=>{d.rotation.y=Math.sin(t*.15)*1.4});kreis(dx,dz,.4)})();
  (function(){const fx=X(0),fz=Z(5);for(let i=0;i<9;i++)sph(.26,0x8a8d90,fx+Math.cos(i*.7)*1.1,.14,fz+Math.sin(i*.7)*1.1,scene,1.1,.7,1);cyl(.12,1.5,0x5a3a22,fx,.14,fz,scene).rotation.z=.4;cyl(.12,1.5,0x5a3a22,fx,.14,fz,scene).rotation.x=.4;flamme(fx,.2,fz,.9);rauch(scene,fx+.2,1.2,fz);kreis(fx,fz,1.3);[[-2.6,0],[2.6,.4],[0,-2.6]].forEach(p=>stumpf(fx+p[0],fz+p[1],.9))})();
  haengematte(X(-8),Z(5.5),R+1.4,0xe8785a);tisch(X(5),Z(-1),0);box(.5,.25,.4,0x2a2a2e,X(5),1.05,Z(-1),scene);cyl(.08,.5,0x2a2a2e,X(5),1.3,Z(-1),scene);bankW(X(5),Z(1.6),R);
  kiste(X(11),Z(4),0xf59e3f);kiste(X(10),Z(5.4),0x8ac040);tonne(X(-12),Z(7));tonne(X(-11),Z(7.6));laterne(X(-4),Z(-1));laterne(X(7),Z(6.8));kanne(X(3),Z(3));
  forscher(X(-5),Z(6),R+2.4,0,1.3);forscher(X(2.5),Z(2),R-2,1,1.25);forscher(X(-1.8),Z(7),R+3.1,2,1.2);forscher(X(10),Z(6),R-1,3,1.3);
  for(let i=0;i<9;i++){const a=i/9*6.28;farn(bx+Math.cos(a)*11.5,bz+Math.sin(a)*11.5,1.1)}}
/* ---------- 3. Wetterstation mit Regenmesser ---------- */
function regenmesser(x,z,pegel,rot){const g=grp(x,0,z);g.rotation.y=rot||0;cyl(.55,.3,0x6a6a70,0,.15,0,g,true);const t=cyl(.34,2.2,0xd8f0f4,0,1.4,0,g);cyl(.3,2.1*pegel,0x3f9ad8,0,.3+1.05*pegel,0,g);for(let i=0;i<9;i++)box(.2,.04,.04,0x2a2a2e,.38,.5+i*.22,0,g);cone(.6,.5,0xc4cad0,0,2.75,0,g).rotation.x=Math.PI;cyl(.6,.06,0xc4cad0,0,3.0,0,g);kreis(x,z,.6);return g}
function ort3(){const b=zone('Wetterstation'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11,0xb8a880,.09);
  (function(){const g=grp(X(-5),0,Z(-4));g.rotation.y=R;[[-.9,-.7],[.9,-.7],[-.9,.7],[.9,.7]].forEach(p=>cyl(.07,1.6,0x6a6a70,p[0],.8,p[1],g,true));box(2.2,1.3,1.7,0xf6f6f2,0,2.2,0,g,true);for(let i=0;i<5;i++){box(2.24,.07,.05,0xdedede,0,1.75+i*.2,.86,g);box(2.24,.07,.05,0xdedede,0,1.75+i*.2,-.86,g)}box(2.5,.12,2,0xe8e8e4,0,3,0,g).rotation.x=-.06;box(.8,.9,.05,0xe8e8e4,0,2.1,.88,g);sperrKasten(X(-5),Z(-4),2.6,2.1,R)})();
  [.25,.55,.85].forEach((p,i)=>regenmesser(X(2+i*1.9),Z(-6),p,0));
  (function(){const g=grp(X(7),0,Z(-1));cyl(.1,5,0x6a6a70,0,2.5,0,g,true);const r=grp(0,5.1,0,g);[0,1,2].forEach(i=>{const a=grp(0,0,0,r);a.rotation.y=i*2.094;cyl(.04,1.3,0x6a6a70,.65,0,0,a).rotation.z=Math.PI/2;sph(.3,i?0xe0302a:0xf6f6f2,1.3,0,0,a,1,.8,1)});vm(r);bewegt(r,t=>{r.rotation.y=t*3});kreis(X(7),Z(-1),.4)})();
  wetterhahn(scene,X(-9),0,Z(2));kreis(X(-9),Z(2),.4);
  (function(){const g=grp(X(-1),0,Z(3));cyl(.1,.8,0x6a6a70,0,.4,0,g,true);const s=sph(.7,0xcfeaf5,0,1.5,0,g);s.material=new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.45});box(.9,.1,.5,0xc87a3a,0,1.5,0,g);kreis(X(-1),Z(3),.9)})();
  (function(){const g=grp(X(3),0,Z(4));box(.5,3.6,.3,0xf6f6f2,0,1.8,0,g,true);cyl(.09,3.1,0xe0302a,0,1.8,.17,g);sph(.22,0xe0302a,0,.12,.17,g);[...Array(9)].forEach((_,i)=>box(.3,.04,.04,0x2a2a2e,.28,.5+i*.33,.17,g));kreis(X(3),Z(4),.5)})();
  (function(){const g=grp(X(9.5),0,Z(-7));cyl(.1,2.4,0x6a6a70,0,1.2,0,g,true);const p=box(2,.1,1.2,0x2a4a8a,0,2.7,0,g,true);p.rotation.x=-.6;for(let i=1;i<4;i++)box(.04,.12,1.2,0xcfd8e8,-1+i*.5,2.7,0,g).rotation.x=-.6;kreis(X(9.5),Z(-7),.5)})();
  tisch(X(-3),Z(6),0);box(.9,.06,.6,0x3a3a3e,X(-3),1.02,Z(6),scene).rotation.y=.3;stuhl(X(-3),Z(7.2),Math.PI,0x3a6a8a);kiste(X(10),Z(4),0xe8e0c0);
  forscher(X(-6.5),Z(2),R+.5,1,1.3);forscher(X(5),Z(1),R-2.2,3,1.25);laterne(X(-10),Z(-4));
  for(let i=0;i<9;i++){const a=i/9*6.28;farn(bx+Math.cos(a)*10.4,bz+Math.sin(a)*10.4,1)}}
/* ---------- 4. Heilpflanzengarten ---------- */
function ort4(){const b=zone('Heilpflanzengarten'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x8a7a4a,.09);
  const beet=(x,z,k)=>{const g=grp(x,0,z);box(3.6,.4,1.8,0x6a4a2e,0,.2,0,g,true);box(3.2,.12,1.4,0x4a3220,0,.42,0,g);sperrKasten(x,z,3.6,1.8,0);const c=[0xe0302a,0xf59e3f,0xb06ae0,0xffd45e,0xf47ab0,0xffffff][k%6];for(let i=0;i<8;i++){inst('cyl',x-1.3+(i%4)*.85,.75,z-.4+Math.floor(i/4)*.8,.04,.6,.04,0x3f9a46);inst('blm',x-1.3+(i%4)*.85,1.1,z-.4+Math.floor(i/4)*.8,.22,.12,.22,c,i)}for(let i=0;i<5;i++)inst('blm',x-1.2+i*.6,.65,z+(i%2?.3:-.3),.3,.18,.2,[0x4a9a40,0x3a8a3a][i%2],i)};
  [[-6,-6],[-1.5,-6],[3,-6],[-6,-2.6],[-1.5,-2.6],[3,-2.6]].forEach((p,i)=>beet(X(p[0]),Z(p[1]),i));
  (function(){const sx=X(7.5),sz=Z(-4.5);[2.2,1.6,1.0].forEach((r,i)=>cyl(r,.55,[0x9a9a92,0x8a8a82,0x7a7a72][i],sx,.28+i*.5,sz,scene,true));kreis(sx,sz,2.3);for(let i=0;i<10;i++)inst('blm',sx+Math.cos(i*1.9)*(1.6-i*.12),1.5-i*.07+.5,sz+Math.sin(i*1.9)*(1.4-i*.1),.25,.15,.25,[0x4a9a40,0xe070c8,0xffd45e][i%3],i)})();
  (function(){const g=grp(X(-9),0,Z(5));g.rotation.y=R;[-1.5,1.5].forEach(s=>cyl(.1,2.6,0x6a4a2e,s,1.3,0,g,true));box(3.4,.1,.1,0x6a4a2e,0,2.5,0,g);for(let i=0;i<8;i++){const x=-1.3+i*.37;cyl(.03,.9,0x8a7a4a,x,2.0,.05,g);box(.18,.5,.12,[0x4a8a3a,0xb8a050,0x8a3a2a,0x6a8a3a][i%4],x,1.5,.05,g)}sperrLinie(X(-9)-Math.cos(R)*1.6,Z(5),X(-9)+Math.cos(R)*1.6,Z(5),.2);g.rotation.y=R})();
  (function(){const g=grp(X(-3),0,Z(4.5));tisch(X(-3),Z(4.5),0);cyl(.28,.22,0x8a8a82,X(-3.3),1.05,Z(4.5),scene);cyl(.07,.4,0xc8b080,X(-3.1),1.2,Z(4.4),scene).rotation.z=.5;cyl(.3,.2,0xd8a050,X(-2.5),1.04,Z(4.7),scene)})();
  rundhaus(X(4),Z(5.5),2.2,2.2,0xc8a070,0xb89a50,R?1.57:-1.57);dorfmensch(X(0),Z(3),R+.3,0,1.3);dorfmensch(X(-6),Z(2),R-.8,4,1.25);
  for(let i=0;i<12;i++){const a=i/12*6.28;helico(bx+Math.cos(a)*11,bz+Math.sin(a)*11)}for(let i=0;i<6;i++)farn(bx+Math.cos(i*1.05+.3)*10.4,bz+Math.sin(i*1.05+.3)*10.4,1.2);korb(X(8.5),Z(4),0x8ac040);korb(X(9.6),Z(3.6),0xf59e3f);kuebel(X(-11),Z(-2));kuebel(X(11),Z(0))}
/* ---------- 5. Orchideengarten ---------- */
function ort5(){const b=zone('Orchideengarten'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11,0xa89a78,.09);
  [-6.5,0,6.5].forEach((px,k)=>{const g=grp(X(px),0,Z(-5));g.rotation.y=R;[-1.6,1.6].forEach(s=>cyl(.1,3.2,0xf2f2ee,s,1.6,0,g,true));const arc=new THREE.Mesh(new THREE.TorusGeometry(1.6,.07,5,14,Math.PI),mat(0xf2f2ee));arc.position.y=3.2;g.add(arc);for(let i=0;i<7;i++){const a=.2+i*.45;sph(.2,[0xe070c8,0xffffff,0xb06ae0,0xf0a0d0][(i+k)%4],Math.cos(a)*1.6,3.2+Math.sin(a)*1.6,0,g,1.2,.8,.8)}[-1.2,1.2].forEach((s,i)=>{cyl(.02,.7,0x6a6a62,s,2.7,0,g);sph(.24,0x8a5a32,s,2.3,0,g,1,.7,1);sph(.2,[0xe070c8,0xf0e040][(i+k)%2],s,2.55,0,g,1.2,.6,1.2)});kreis(X(px)-1.6*Math.cos(R),Z(-5),.15);kreis(X(px)+1.6*Math.cos(R),Z(-5),.15)});
  /* Orchideenbaum: Stamm mit vielen Blüten */
  (function(){const tx=X(-1),tz=Z(2.5);cyl(.45,5.5,0x6a4e34,tx,2.75,tz,scene,true);sph(2.4,0x3a8a3a,tx,6,tz,scene,1.2,.6,1.2);kreis(tx,tz,.6);for(let i=0;i<20;i++){const a=i*2.4,y=1.2+(i%7)*.62;inst('blm',tx+Math.cos(a)*.55,y,tz+Math.sin(a)*.55,.28,.17,.2,[0xe070c8,0xffffff,0xb06ae0,0xf0e040,0xf0a0d0][i%5],a);inst('sph',tx+Math.cos(a)*.5,y-.1,tz+Math.sin(a)*.5,.14,.1,.14,0x3a8a3a)}})();
  /* Tische mit Töpfen */
  [[-9,4],[-5.5,5.5],[5,5],[9,3]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]),g=grp(x,0,z);box(2.6,.12,1,0x8a5a32,0,.9,0,g,true);[-1,1].forEach(s=>cyl(.07,.9,0x6a4220,s*1.1,.45,0,g));sperrKasten(x,z,2.6,1.1,0);for(let j=0;j<5;j++){inst('cyl',x-1+j*.5,1.1,z,.14,.2,.14,0xc8784a);inst('cyl',x-1+j*.5,1.35,z,.025,.4,.025,0x3f9a46);for(let q=0;q<3;q++)inst('blm',x-1+j*.5,1.5+q*.06,z+(q-1)*.04,.13,.09,.09,[0xe070c8,0xffffff,0xb06ae0,0xf0e040,0xf0a0d0][(i+j)%5],q)}});
  for(let i=0;i<36;i++){const a=i/36*6.28,r=9.2+nr()*1.2;orch(bx+Math.cos(a)*r,bz+Math.sin(a)*r,i)}for(let i=0;i<10;i++)farn(bx+Math.cos(i*.628)*10.4,bz+Math.sin(i*.628)*10.4,1);
  bankW(X(0),Z(7),R);bankW(X(-4),Z(-1.5),R+3.14);forscher(X(5),Z(1),R-2.3,2,1.3);dorfmensch(X(-7),Z(1),R+1.4,1,1.25);laterne(X(10),Z(-1));laterne(X(-10),Z(-1))}
/* ---------- 6. Schmetterlingshaus: begehbare Glashalle ---------- */
function ort6(){const b=zone('Schmetterlingshaus'),L=lay(b),R=L.r,bx=b.x,bz=b.z;ast(b,3.4);scheibe(bx,bz,14,0xb8aa88,.09);const W=(lx,lz)=>[bx+lx*Math.cos(R)+lz*Math.sin(R),bz-lx*Math.sin(R)+lz*Math.cos(R)];
  const g=grp(bx,0,bz);g.rotation.y=R;const hw=11,hd=6.4,hh=4.2;
  box(hw*2+.6,.3,hd*2+.6,0xd8d0b8,0,.15,0,g);for(let i=-3;i<=3;i++){[-1,1].forEach(s=>box(.22,hh,.22,0xf2f2ee,i*hw/3.2,hh/2,s*hd,g,true));box(.2,hh+2.2,.2,0xf2f2ee,i*hw/3.2,hh+1.1,0,g)}
  [-1,1].forEach(s=>{box(hw*2,.2,.2,0xf2f2ee,0,hh,s*hd,g);[-hw,0,hw].forEach(x=>{const rb=box(.14,.14,hd+.4,0xf2f2ee,x,hh+1.4,s*hd/2,g);rb.rotation.x=s*-.42});glas(hw*2,.1,hd*1.05,0,hh+1.05,s*hd*.52,g).rotation.x=s*-.44});
  box(hw*2,.2,.2,0xf2f2ee,0,hh+2.2,0,g);glas(hw*2,hh,.1,0,hh/2,-hd,g);glas(.1,hh,hd*2,-hw,hh/2,0,g);glas(.1,hh,hd*2,hw,hh/2,0,g);glas(hw*.78,hh,.1,-hw*.6,hh/2,hd,g);glas(hw*.78,hh,.1,hw*.6,hh/2,hd,g);glas(hw*.46,hh*.3,.1,0,hh*.85,hd,g);
  [-1,1].forEach(s=>{box(.4,hh+1,.4,0xf2f2ee,s*1.9,(hh+1)/2,hd,g,true)});
  box(hw*2,.16,.16,0xf2f2ee,0,hh*.7,-hd,g);
  const seg=(a,c)=>{const p=W(a[0],a[1]),q=W(c[0],c[1]);sperrLinie(p[0],p[1],q[0],q[1],.2)};seg([-hw,-hd],[hw,-hd]);seg([-hw,-hd],[-hw,hd]);seg([hw,-hd],[hw,hd]);seg([-hw,hd],[-1.9,hd]);seg([1.9,hd],[hw,hd]);
  /* innen: Weg, Pflanzen, Futterstellen, Teich, Schautisch */
  box(3.4,.06,hd*2,0xc8b090,0,.34,hd*0,g).receiveShadow=true;box(hw*2-2,.06,3,0xc8b090,0,.34,0,g);
  const P=(lx,lz)=>W(lx,lz);for(let i=0;i<60;i++){const p=P((nr()*2-1)*(hw-1.2),(nr()*2-1)*(hd-1));if(Math.abs((p[0]-bx)*Math.cos(R)-(p[1]-bz)*Math.sin(R))<2.2&&Math.abs(((p[0]-bx)*Math.sin(R)+(p[1]-bz)*Math.cos(R)))<hd+1&&false)continue;const lx=(p[0]-bx)*Math.cos(R)-(p[1]-bz)*Math.sin(R),lz=(p[0]-bx)*Math.sin(R)+(p[1]-bz)*Math.cos(R);if(Math.abs(lz)<1.7||Math.abs(lx)<1.8)continue;const q=nr();if(q<.4)helico(p[0],p[1]);else if(q<.7)farn(p[0],p[1],1);else hibiskus(p[0],p[1],.9)}
  [[-6,-3.4],[6,-3.4],[-6,3.4],[6,3.4]].forEach((p,i)=>{const w=P(p[0],p[1]);cyl(.5,1.8,0x6a4a2e,w[0],.9,w[1],scene,true);sph(1.6,tp(),w[0],2.6,w[1],scene,1,.8,1);kreis(w[0],w[1],.6)});
  [[-3.5,-4.8],[3.5,-4.8],[-8,0.2],[8,.2]].forEach((p,i)=>{const w=P(p[0],p[1]);cyl(.04,1.1,0x6a6a62,w[0],1.6,w[1],scene);cyl(.28,.05,0xf5a030,w[0],1.1,w[1],scene);cyl(.28,.05,0xf2e040,w[0],1.15,w[1],scene);cyl(.2,.05,0xe03a4a,w[0]+.3,1.1,w[1]+.2,scene)});
  (function(){const w=P(0,-4.8);const t=grp(w[0],0,w[1]);t.rotation.y=R;box(5,.12,1.6,0x8a5a32,0,.95,0,t,true);[-1,1].forEach(s=>cyl(.07,.95,0x6a4220,s*2.2,.47,0,t));/* Ei, Raupe, Puppe, Falter */
    sph(.1,0xf6f6e0,-1.9,1.1,0,t);sph(.14,0x6aa840,-1.9,1.1,.1,t,.8,.8,.8).visible=false;for(let i=0;i<5;i++)sph(.12,i%2?0x6aa840:0x8ac050,-.9+i*.22,1.1,0,t);sph(.07,0xffd45e,-.2,1.12,0,t);cyl(.02,.7,0x6a6a62,.6,1.6,0,t);sph(.17,0x8a8a50,.6,1.2,0,t,.7,1.5,.7);[-1,1].forEach(s=>sph(.4,0xf08a2a,1.7,1.45,s*.4,t,.9,1.1,.12));sph(.08,0x3a2a22,1.7,1.45,0,t,.6,1.8,.6);sperrKasten(w[0],w[1],5,1.7,R)})();
  const pt=P(-8,-3.2);teichBau(pt[0],pt[1],2.4,0x4aa0b0,null,0);const pt2=P(7.5,-4);scheibe(pt2[0],pt2[1],1.4,0x9a8a68,.12);
  faltervolk(bx,bz,9,16,[0x2a6adf,0xf08a2a,0xffd45e,0xffffff,0xe03a4a],2.2);faltervolk(...W(-6,0),6,12,[0xf47ab0,0x2a6adf,0xf2d030,0xb06ae0],1.6);faltervolk(...W(6,0),6,12,[0xf08a2a,0xffffff,0x3a8a3a,0x2a6adf],2);
  forscher(...W(3,2.6).concat([R+2,1,1.3]));dorfmensch(...W(-3.4,-1.6).concat([R-.6,2,1.2]));
  /* draußen: Blumen, Bänke */
  [[-12,10],[12,10],[-16,2],[16,2]].forEach(p=>{const w=W(p[0],p[1]);for(let i=0;i<5;i++)helico(w[0]+(i-2)*.6,w[1]+(i%2)*.5)});bankW(...W(-6,9.2).concat([R]));bankW(...W(6,9.2).concat([R]));laterne(...W(-12,8));laterne(...W(12,8))}
/* ---------- 7. Baumfrosch-Teich ---------- */
function ort7(){const b=zone('Baumfrosch-Teich'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x6a7a48,.09);
  teichBau(bx,bz,7.5,0x3a8a7a,b.gap,4.2);steg(bx+Math.cos(b.gap)*9.5,bz+Math.sin(b.gap)*9.5,bx+Math.cos(b.gap)*3,bz+Math.sin(b.gap)*3,2.6);
  for(let i=0;i<7;i++){const a=i*.9+.3;if(Math.abs(Math.atan2(Math.sin(a-b.gap),Math.cos(a-b.gap)))<.8)continue;const sx=bx+Math.cos(a)*3.6,sz=bz+Math.sin(a)*3.6;cyl(1.1,.06,0x3a9a3a,sx,.17,sz,scene);if(i%2===0)sph(.18,0xf47ab0,sx,.25,sz,scene,1,.6,1)}
  /* Blatt-Stauden mit Fröschen */
  [[-8.5,-6,0],[-4,-9,1],[3,-9,2],[8.5,-5.5,3],[-10,2,4],[10,2,5],[0,-10.5,6]].forEach((p,i)=>{const x=bx+p[0],z=bz+p[1];cyl(.08,1.6,0x3f8a3a,x,.8,z,scene,true);cyl(1,.08,0x3a9a3a,x,1.65,z,scene);cyl(.8,.05,0x4aaa44,x+.3,1.4,z+.4,scene);kreis(x,z,.4);const f=baumfrosch(scene);f.position.set(x,1.7,z);f.rotation.y=Math.atan2(-(bz-z),bx-x);f.scale.setScalar(1.7);lebendig.push({o:f,ph:i*.8})});
  [[-5.5,-4],[4.5,-5],[0,-7.5]].forEach((p,i)=>{const t=urw(bx+p[0],bz+p[1],.9,1)});
  for(let i=0;i<18;i++){const a=i/18*6.28,r=8.6+nr()*2;blatt(bx+Math.cos(a)*r,bz+Math.sin(a)*r,1.1)}for(let i=0;i<8;i++){const a=i*.8,r=9.5;bambus(bx+Math.cos(a+.4)*r,bz+Math.sin(a+.4)*r,.9)}
  forscher(bx+Math.cos(b.gap)*11.5+2,bz+Math.sin(b.gap)*11.5,R+3.6,1,1.3);fernrohr(bx+Math.cos(b.gap)*10.5-3,bz+Math.sin(b.gap)*10.5,R,1.5)}
/* ---------- 8. Blattschneiderameisen-Straße ---------- */
function riesenameise(x,z,rot,s){s=s||1;const g=grp(x,0,z);g.rotation.y=rot||0;const f=0xa8421e;[[-1.5,1.1,.9],[0,1.2,.5],[1.3,1.3,.65]].forEach((p,i)=>sph(.72*s,i===1?dk(f,1.15):f,p[0]*s,p[1]*s,0,g,i===0?1.5:1,i===0?1.1:1,i===0?1:.9).castShadow=true);
  const h=grp(2.1*s,1.4*s,0,g);sph(.55*s,dk(f,1.1),0,0,0,h,1.1,1,1);[-1,1].forEach(q=>{sph(.12*s,0x111111,.3*s,.15*s,q*.4*s,h);cyl(.035*s,1.4*s,0x2a1a10,.45*s,.9*s,q*.35*s,h).rotation.z=-.6;cone(.1*s,.45*s,0x2a1a10,.6*s,-.2*s,q*.18*s,h).rotation.z=-1.57});
  [-1,0,1].forEach(i=>[-1,1].forEach(q=>{const l=cyl(.06*s,2.2*s,0x2a1a10,(i*.7)*s,.9*s,q*.8*s,g);l.rotation.x=q*.55}));
  const bl=box(2.4*s,.1*s,1.6*s,0x3a9a3a,.5*s,3.3*s,0,g);bl.rotation.z=.2;box(1.8*s,.11*s,.1*s,0x2a7a2a,.5*s,3.3*s,0,g).rotation.z=.2;cyl(.07*s,1.4*s,0x2a1a10,2.1*s,2.5*s,0,g).rotation.z=.4;sperrKasten(x,z,5.4*s,1.8*s,rot||0);return g}
function ort8(){const b=zone('Blattschneiderameisen-Straße'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x7a6a42,.09);
  const A=[X(-10),Z(-6)],B=[X(8),Z(-4)];/* Straße vom Blätterbaum zum Nest */
  const Pp=[[A[0],A[1]],[X(-5),Z(-1)],[X(0),Z(-5)],[X(4),Z(-2)],[B[0],B[1]]];const sp=spl(Pp,1.5);wegBand(sp,.9,0x5a4a2e,.07);wegBand(sp,.5,0x6a5a38,.075);
  /* Nest: Hügel mit Löchern */
  inst('sphT',B[0],0,B[1],4.2,2.6,4.2,0x8a5a30);inst('sph',B[0]+1.2,1.6,B[1]-.4,2.2,1.4,2.2,0x9a6a38);for(let i=0;i<6;i++){const a=i*1.1;inst('sph',B[0]+Math.cos(a)*3.2,.8+Math.sin(a*2)*.3,B[1]+Math.sin(a)*3.2,.35,.28,.35,0x2a1a10)}kreis(B[0],B[1],4);
  /* Blätterbaum, Blätter fallen */
  urw(A[0]-3,A[1]-2,1.2,1);for(let i=0;i<5;i++)blatt(A[0]-1+i*.5,A[1]+(i%2?1.5:-1),1.2);
  /* Ameisenzug: 18 hin (leer), 18 zurück mit Blattstück */
  const n=18,cn=sp.length;schwarmF(gSphT,n*2,[0x6a2a14],(i,t)=>{const back=i>=n,k=i%n,u=(((t*.05+k/n)%1)+(back?0:0)),idx=back?(1-u):u,j=Math.min(cn-2,Math.floor(idx*(cn-1))),f=idx*(cn-1)-j,a=sp[j],c=sp[j+1],off=back?.18:-.18,dx=c[0]-a[0],dz=c[1]-a[1],l=Math.hypot(dx,dz)||1;return[a[0]+dx*f-dz/l*off,.18,a[1]+dz*f+dx/l*off,.2,.12,.12,-Math.atan2(dz,dx)+(back?Math.PI:0)]},bx,bz);
  schwarmF(gBox,n,[0x4aaa3a,0x6ac04a,0x3a9a2a],(i,t)=>{const u=((t*.05+i/n)%1),idx=u,j=Math.min(cn-2,Math.floor(idx*(cn-1))),f=idx*(cn-1)-j,a=sp[j],c=sp[j+1],off=-.18,dx=c[0]-a[0],dz=c[1]-a[1],l=Math.hypot(dx,dz)||1;return[a[0]+dx*f-dz/l*off,.5,a[1]+dz*f+dx/l*off,.32,.03,.24,-Math.atan2(dz,dx)]},bx,bz);
  riesenameise(X(-1),Z(5),R+.6,1);
  (function(){const x=X(-8),z=Z(4.5),g=grp(x,0,z);g.rotation.y=R;box(2.6,1.4,1.6,0x6a4a2e,0,.7,0,g,true);glas(2.4,1.2,1.4,0,.75,0,g);for(let i=0;i<5;i++)sph(.35,0xf2f2e8,-.8+i*.4,.4+(i%2)*.4,0,g,1,.8,.8);for(let i=0;i<4;i++)sph(.07,0xa8421e,-.9+i*.6,.9,.3,g,1.4,.8,.8);sperrKasten(x,z,2.8,1.8,R)})();
  forscher(X(5),Z(3),R-2.4,0,1.3);farn(X(9),Z(4),1.2);for(let i=0;i<12;i++){const a=i/12*6.28;farn(bx+Math.cos(a)*11,bz+Math.sin(a)*11,1.1)}stumpf(X(-3),Z(7),1);stumpf(X(1.5),Z(7.5),1.2)}
/* ---------- 9. Käferwiese ---------- */
function ort9(){const b=zone('Käferwiese'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x7aaa48,.09);
  const S=[[-7,-5,0,'stumpf'],[-1,-8,1,'pilz'],[6,-6,2,'stumpf'],[-4,-1,3,'pilz'],[3,-2,0,'stumpf'],[9,0,1,'pilz'],[-9,2,2,'stumpf']];
  S.forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]);const hh=p[3]==='pilz'?1.2:.8;if(p[3]==='pilz'){cyl(.35,hh,0xf0e6c8,x,hh/2,z,scene,true);const c=mesh(gHalb,[0xe0302a,0xf59e3f,0xb86a3a][i%3],x,hh,z,1.3,.8,1.3,scene);c.castShadow=true;for(let k=0;k<5;k++)sph(.1,0xffffff,x+Math.cos(k*1.3)*.7,hh+.45+Math.sin(k)*.1,z+Math.sin(k*1.3)*.7,scene,1,.4,1)}else{stumpf(x,z,1.3)}
    const k=kaefer(scene,p[2]);k.position.set(x,hh+.1,z);k.rotation.y=i*1.1+R;k.scale.setScalar(1.9);lebendig.push({o:k,ph:i});if(p[3]==='pilz')kreis(x,z,.5)});
  /* Käferhotel */
  (function(){const x=X(-1),z=Z(5),g=grp(x,0,z);g.rotation.y=R;box(4.4,2.6,1.2,0x6a4a2e,0,1.3,0,g,true);for(let i=0;i<3;i++)for(let j=0;j<4;j++){box(1,.7,.9,[0x9a7a4a,0x8a6a3a,0xb89a60][(i+j)%3],-1.65+j*1.1,.5+i*.8,.08,g);for(let q=0;q<4;q++)cyl(.07,.3,0x3a2a18,-1.95+j*1.1+q*.2,.5+i*.8,.55,g).rotation.x=Math.PI/2}box(5,.2,1.6,0x4a8a3a,0,2.7,0,g);sperrKasten(x,z,4.6,1.4,R)})();
  for(let i=0;i<46;i++){const a=nr()*6.28,r=3+nr()*8.6;const x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(S.some(p=>Math.hypot(X(p[0])-x,Z(p[1])-z)<2.2)||Math.hypot(X(-1)-x,Z(5)-z)<4)continue;if(i%3===0)gras(x,z,.5+nr()*.5);else blumeI(x,z,i%6)}
  tisch(X(8),Z(5),0);forscher(X(8),Z(3.4),R+3.1,1,1.3);forscher(X(-8),Z(5.5),R+.3,3,1.25);for(let i=0;i<8;i++)farn(bx+Math.cos(i*.785)*11,bz+Math.sin(i*.785)*11,1.1)}
/* ---------- 10. Chamäleon- und Gespensterschrecken-Busch ---------- */
function ort10(){const b=zone('Chamäleon-Busch'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11,0x7a8a50,.09);
  const cx=X(0),cz=Z(-3);cyl(.5,3.2,0x6a4e34,cx,1.6,cz,scene,true);kreis(cx,cz,.9);
  const ZW=[[1.8,2.6,0,2.2,.2],[1.5,3.2,2.4,2.6,2.2],[-1.8,2.8,3.5,2.4,-1.6],[0,3.6,-2.6,2.3,2.6],[-2.2,2.2,-.5,2.6,-.4]];/* x,y,Richtung,Länge */
  ZW.forEach((q,i)=>{const a=ast2(cx+Math.cos(q[2])*q[3]/2,q[1],cz-Math.sin(q[2])*q[3]/2,q[3],q[2],.14);a.rotation.z=Math.PI/2+.12*(i%2?-1:1);sph(1.1,tp(),cx+Math.cos(q[2])*q[3]*.85,q[1]+.5,cz-Math.sin(q[2])*q[3]*.85,scene,1,.7,1)});
  sph(2.6,0x3a8a3a,cx,4.6,cz,scene,1,.8,1);sph(1.8,0x4a9a40,cx+1.2,5.2,cz+.8,scene,1,.7,1);
  /* freie Sitzstangen vorn auf Augenhöhe: große Chamäleons und Gespensterschrecken */
  [[-5.5,3.5,0],[-1.8,5,1],[2,3.8,2],[5.8,5.2,3]].forEach((q,i)=>{const x=X(q[0]),z=Z(q[1]);cyl(.09,1.5,0x6a4e34,x-1,.75,z,scene,true);cyl(.09,1.5,0x6a4e34,x+1,.75,z,scene,true);ast2(x,1.5,z,2.6,0,.1);kreis(x-1,z,.3);kreis(x+1,z,.3);const c=(i%2?stabschrecke:chamaeleon)(scene);c.position.set(x-.2,1.6,z);c.rotation.y=(R?Math.PI:0)+(i%2?0:-.6)+1.57*0+(R?0:Math.PI);c.scale.setScalar(i%2?2.8:3.4);lebendig.push({o:c,ph:i*1.3})});
  [[-5,-4],[6,-3.5],[-6,3],[6,4]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]);cyl(.3,2,0x6a4e34,x,1,z,scene,true);ast2(x,1.9,z,2,i,.1);sph(1.3,tp(),x,2.6,z,scene,1,.8,1);kreis(x,z,.5);const c=i%2?stabschrecke(scene):chamaeleon(scene);c.position.set(x+.3,2.2,z);c.rotation.y=i*1.4;c.scale.setScalar(2.6);lebendig.push({o:c,ph:i+4})});
  forscher(X(-3),Z(5),R+3.3,2,1.3);dorfmensch(X(4),Z(6),R-2.9,3,1.25);bankW(X(-6),Z(6),R);for(let i=0;i<14;i++){const a=i/14*6.28;farn(bx+Math.cos(a)*10,bz+Math.sin(a)*10,1.1)}}
function etappe2(){ort2();ort3();ort4();ort5();ort6();ort7();ort8();ort9();ort10()}

/* ==================== Etappe 3: Tiere im Wald (Orte 11 bis 19) ==================== */
/* Ast an einem Stamm (x,z) in Höhe y in Richtung a; darauf sitzt ein Tier (fn) */
function sitzAst(x,z,y,a,len,fn,sk,ph,dreh){ast2(x+Math.cos(a)*len/2,y,z-Math.sin(a)*len/2,len,a,.14);if(fn){const v=fn(scene);v.position.set(x+Math.cos(a)*len*.78,y+.12,z-Math.sin(a)*len*.78);v.rotation.y=a+(dreh||0);v.scale.setScalar(sk||1.8);lebendig.push({o:v,ph:ph==null?nr()*6:ph});return v}}
function grossBaum(x,z,h,r,kr){cyl(r,h,0x6a4e34,x,h/2,z,scene,true);for(let i=0;i<4;i++){const a=i*1.57+.5;box(1.6,2.4,.25,0x6a4e34,x+Math.cos(a)*r*1.2,1.2,z-Math.sin(a)*r*1.2,scene).rotation.y=a}sph(h*.3,tp(),x,h+1.5,z,scene,1,.6,1);sph(h*.2,tp(),x+h*.2,h-.2,z+h*.1,scene,1,.6,1);sph(h*.2,tp(),x-h*.2,h+.2,z-h*.1,scene,1,.6,1);kreis(x,z,r+.85)}
/* ---------- 11. Tukan-Wald ---------- */
function ort11(){const b=zone('Tukan-Wald'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,14,0x6a7a40,.09);
  const T=[[-8,-7],[-2,-10],[5,-7.5],[-6.5,-.5],[8,-1],[1,-3]];
  T.forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]);grossBaum(x,z,11,.55,.2);for(let k=0;k<2;k++){const a=i*1.1+k*2.6;const f=(i+k)%3===0?(k?ara:ara2):tukan;sitzAst(x,z,3.6+((i+k)%3)*.7,a,3.4,f,1.8,i+k,(i+k)%2?0:Math.PI)}});
  (function(){const x=X(-1),z=Z(5),g=grp(x,0,z);g.rotation.y=R;box(3.4,.7,1.6,0x8a5a32,0,.35,0,g,true);[-1.5,1.5].forEach(s=>cyl(.08,1.8,0x6a4220,s,1.6,0,g));box(3.6,.1,1.8,0x4a8a3a,0,2.5,0,g);for(let i=0;i<6;i++){sph(.22,[0xe0302a,0xf59e3f,0xf2d030,0xe0302a,0x8a3aa0,0xf59e3f][i],-1.2+i*.48,.9,(i%2-.5)*.4,g,1,.9,1);}for(let i=0;i<3;i++)sph(.14,0xf2d030,-.8+i*.8,1.0,.55,g,3,.7,.7).rotation.z=.3;sperrKasten(x,z,3.6,1.8,R)})();
  forscher(X(-6),Z(5),R+.4,0,1.3);forscher(X(5.5),Z(4.5),R-.6,2,1.25);fernrohr(X(8),Z(6),R,1.5);tonne(X(-9),Z(6));
  for(let i=0;i<14;i++){const a=i/14*6.28;farn(bx+Math.cos(a)*12.6,bz+Math.sin(a)*12.6,1.2)}[[X(-10),Z(-3)],[X(10),Z(-6)]].forEach(p=>palme(p[0],p[1],1.3))}
/* ---------- 12. Papageienfelsen mit Lehmlecke ---------- */
function ort12(){const b=zone('Papageienfelsen'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x9a8a6a,.09);const W=(lx,lz)=>[bx+lx*Math.cos(R)+lz*Math.sin(R),bz-lx*Math.sin(R)+lz*Math.cos(R)];
  felswand(...W(0,-9),22,5,10,R,0x8a7a6a);
  (function(){const g=grp(bx,0,bz);g.rotation.y=R;box(9,4.6,.5,LEHM,-2,2.6,-6.4,g);box(5,3,.55,0xb06238,5,2.2,-6.3,g);for(let i=0;i<14;i++)box(.5+(i%3)*.3,.06,.04,0x8a4a22,-6+(i*1.1)%9,1.2+(i%5)*.8,-6.1,g);[[-5.5,1.4],[-2,2.2],[1.5,1.6],[4.5,2.6],[0,3.6],[-4,3.5],[7,1.4]].forEach(p=>{box(2.2,.2,.8,0x6a5a4a,p[0],p[1],-6,g,true)});g.updateMatrixWorld()})();
  const sp=[[-5.5,1.4,0],[-4.6,1.4,1],[-2.2,2.2,0],[-1.2,2.2,2],[1.2,1.6,1],[1.9,1.6,0],[4.5,2.6,2],[5.2,2.6,1],[-.3,3.6,0],[-4,3.5,1],[7,1.4,0]];
  sp.forEach((p,i)=>{const w=W(p[0],-6);const v=(p[2]===1?ara2:ara)(scene);v.position.set(w[0],p[1]+.25,w[1]);v.rotation.y=R?-1.57:1.57;v.scale.setScalar(1.7);lebendig.push({o:v,ph:i*.7})});
  [[-9,-4],[9,-4]].forEach(p=>{const w=W(p[0],p[1]);cyl(.45,9,0x6a4e34,w[0],4.5,w[1],scene,true);sph(3,tp(),w[0],9.5,w[1],scene,1,.6,1);kreis(w[0],w[1],.6)});
  (function(){const x=X(0),z=Z(7),g=grp(x,0,z);g.rotation.y=R;[-2.2,2.2].forEach(s=>[-1,1].forEach(q=>cyl(.1,2.4,0x6a4220,s,1.2,q,g,true)));box(5,.15,2.6,0x8a5a32,0,2.45,0,g,true).rotation.x=.12;box(4.6,.1,2,0x8a5a32,0,.5,0,g);box(4.4,.4,.1,0x7a4a2a,0,1.2,.95,g);sperrKasten(x,z,4.8,2.6,R)})();
  forscher(X(-1.2),Z(7),R+3.14,1,1.3);for(let i=0;i<10;i++){const a=i/10*6.28;if(Math.sin(a)*(R?1:-1)>.5)continue;farn(bx+Math.cos(a)*11,bz+Math.sin(a)*11,1.1)}}
/* ---------- 13. Kolibri-Blüten ---------- */
function riesenblume(x,z,h,f,s){s=s||1;cyl(.06*s,h,0x3f9a46,x,h/2,z,scene);const c=cone(.42*s,1*s,f,x,h+.4*s,z,scene);c.rotation.x=Math.PI;cyl(.5*s,.05,dk(f,1.15),x,h+.88*s,z,scene);sph(.11*s,0xffe070,x,h+.8*s,z,scene);cyl(.012,.5*s,0xf6f6e0,x+.1,h+.95*s,z,scene).rotation.z=.4;kreis(x,z,.3*s);inst('blm',x+.5,.4,z,.5,.1,.2,0x3f9a46,x)}
function ort13(){const b=zone('Kolibri-Blüten'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,13,0x7aa050,.09);
  const FB=[0xe0302a,0xf59e3f,0xf2c230,0xf47ab0,0xb02a8a,0xe0302a];const P=[[-7,-5],[-3,-8],[2,-6],[7,-6],[-9,0],[-4,-2],[4,-1],[9,0],[0,-3],[-1.5,3.5],[6,4],[-7,4]];
  P.forEach((p,i)=>riesenblume(X(p[0]),Z(p[1]),1.6+(i%4)*.35,FB[i%6],1.2+(i%3)*.2));
  [[-3,-8,0x1aa88a],[2,-6,0x3a6ad8],[-4,-2,0xe0a030],[7,-6,0xb02a8a],[-9,0,0x1aa88a],[4,-1,0x3a6ad8],[0,-3,0x1aa88a]].forEach((q,i)=>kolibri(X(q[0])+.2,Z(q[1])+.2,2.3+(i%3)*.3,i*1.9,q[2]));
  /* Futterflaschen */
  [[-5.5,2],[5.5,2.5]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]);cyl(.06,2.4,0x6a4220,x,1.2,z,scene,true);sph(.28,0xe03a4a,x,2.3,z,scene,1,1.3,1);cone(.06,.3,0xf6f6f2,x,1.95,z,scene).rotation.x=Math.PI;kreis(x,z,.3)});
  for(let i=0;i<22;i++){const a=nr()*6.28,r=3+nr()*9.5;const x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(i%3===0)hibiskus(x,z,.8);else helico(x,z)}
  bankW(X(0),Z(6.8),R);forscher(X(2),Z(5),R+2.8,3,1.3);dorfmensch(X(-3),Z(6),R+3.5,1,1.25);for(let i=0;i<10;i++){const a=i/10*6.28;farn(bx+Math.cos(a)*12.4,bz+Math.sin(a)*12.4,1.1)}}
/* ---------- 14. Brüllaffen-Bäume ---------- */
function ort14(){const b=zone('Brüllaffen-Bäume'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,13,0x6a7a40,.09);
  const T=[[-7,-6],[0,-9],[7,-5],[-4,-1],[5,-1.5]];
  T.forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]);grossBaum(x,z,14,.7,.2);for(let k=0;k<2;k++){const a=i*1.3+k*3.1;sitzAst(x,z,5.2+k*1.8,a,3.8,bruellaffe,1.9,i*1.1+k,(i+k)%2?0:Math.PI)}liane(x+1.4,12,z,7);liane(x-1.2,12,z+.8,6)});
  (function(){const x=X(-1),z=Z(5.5),g=grp(x,0,z);g.rotation.y=R;[-2,2].forEach(s=>[-1,1].forEach(q=>cyl(.1,2.8,0x6a4220,s,1.4,q*1.1,g,true)));box(4.8,.16,3,0x8a5a32,0,.9,0,g,true);box(4.6,.16,2.8,0x8a5a32,0,2.7,0,g).visible=false;box(5,.12,3.2,0x4a8a3a,0,2.9,0,g);box(4.8,.7,.1,0x7a4a2a,0,1.4,1.5,g);sperrKasten(x,z,5,3.2,R)})();
  fernrohr(X(-4),Z(7.5),R,1.5);forscher(X(1.5),Z(5.2),R+3.2,0,1.3);forscher(X(8),Z(6),R-.5,3,1.25);for(let i=0;i<12;i++){const a=i/12*6.28;farn(bx+Math.cos(a)*12.2,bz+Math.sin(a)*12.2,1.15)}}
/* ---------- 15. Kapuzineräffchen ---------- */
function trapez(x,z,h,ph,k){const g=grp(x,h,z);cyl(.04,h-.4,0x8a7a4a,0,-(h-.4)/2,0,g);cyl(.3,.08,0x6a4220,0,-(h-.4),0,g).rotation.z=Math.PI/2;vm(g);const m=kapuzinerM(g);m.position.set(0,-(h-.4)+.05,0);m.scale.setScalar(1.3);vm(m);g.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{g.rotation.z=Math.sin(t*1.4+ph)*.55}}},ph:0})}
function ort15(){const b=zone('Kapuzineräffchen'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x8a7a48,.09);
  const M=[[-7,-5],[7,-5],[-7,1.5],[7,1.5]];M.forEach(p=>{cyl(.28,7,0x6a4e34,X(p[0]),3.5,Z(p[1]),scene,true);sph(.45,0x4a8a3a,X(p[0]),7.2,Z(p[1]),scene,1.3,.8,1.3);kreis(X(p[0]),Z(p[1]),.9)});
  [[0,1],[1,3],[2,3],[0,2]].forEach(q=>{const a=M[q[0]],c=M[q[1]];for(let k=0;k<3;k++)rohr([X(a[0]),6.6-k*1.6,Z(a[1])],[X(c[0]),6.6-k*1.6,Z(c[1])],.045,0x8a7a4a)});
  for(let i=0;i<8;i++){const t=i/7;rohr([X(-7+t*14),6.6,Z(-5)],[X(-7+t*14),2.2,Z(-5)],.035,0x8a7a4a)}
  trapez(X(-2),Z(-3.5),5.6,0);trapez(X(2.5),Z(-4),5.6,2);trapez(X(0),Z(-1),5.6,4);
  [[-6,-4.8,3.2],[6.5,-4.6,5],[0,-5,6]].forEach((p,i)=>{const k=kapuziner(scene);k.position.set(X(p[0]),p[2]*.0+.0,Z(p[1]));k.rotation.y=i*2;k.scale.setScalar(1.7);lebendig.push({o:k,ph:i*1.7})});
  [[-5,3],[4,3.5],[-1,5],[8,5]].forEach((p,i)=>{const k=kapuziner(scene);k.position.set(X(p[0]),0,Z(p[1]));k.rotation.y=i*1.3+1;k.scale.setScalar(1.6);lebendig.push({o:k,ph:i*.9+2})});
  (function(){const x=X(1.5),z=Z(6),g=grp(x,0,z);g.rotation.y=R;box(3,.9,1.4,0x8a5a32,0,.45,0,g,true);for(let i=0;i<6;i++)sph(.16,0xf2d030,-1.1+i*.44,1.0,(i%2-.5)*.4,g,2.2,.6,.6).rotation.z=.2*(i%3-1);sperrKasten(x,z,3.2,1.6,R)})();
  forscher(X(-4),Z(6.5),R+3.4,2,1.3);for(let i=0;i<12;i++){const a=i/12*6.28;farn(bx+Math.cos(a)*11.4,bz+Math.sin(a)*11.4,1.1)}}
/* ---------- 16. Faultier-Allee ---------- */
function ort16(){const b=zone('Faultier-Allee'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,4);scheibe(bx,bz,12,0x8a7a4a,.09);
  const rows=[-9,-3.5,2];const hs=[];rows.forEach((d,k)=>{[-7,7].forEach((px,j)=>{const x=X(px),z=Z(d);grossBaum(x,z,12,.55,.2);hs.push([x,z]);if(k!==2||j===0){sitzAst(x,z,2.8+k*.5,j?3.14:0,2,faultier,1.8,k*2+j,0)}})});
  /* Querast über dem Weg mit hängenden Faultieren */
  rows.forEach((d,k)=>{const z=Z(d),y=5.3+(k%2)*.4;ast2(X(0),y,z,15,0,.2);const f=faultierH(scene);f.position.set(X(-3+k*2.2),y,z);f.rotation.y=k*.9;f.scale.setScalar(1.7);lebendig.push({o:f,ph:k*1.4});if(k!==1){const f2=faultierH(scene);f2.position.set(X(3.5-k),y,z);f2.rotation.y=Math.PI+k;f2.scale.setScalar(1.6);lebendig.push({o:f2,ph:k*1.4+2})}});
  const f=fiete(scene);f.position.set(X(4),0,Z(5.5));f.rotation.y=R?-1:1;kreis(X(4),Z(5.5),.7);f.scale.setScalar(1.7);lebendig.push({o:f,ph:2.2});stumpf(X(4),Z(5.7),1.5);
  bankW(X(-5),Z(6),R);forscher(X(-2),Z(5.5),R+.3,1,1.3);for(let i=0;i<9;i++){const a=i*.6+.2;blatt(X(-10.5+(i%2)),Z(-10+i*2),1.2);blatt(X(10.5-(i%2)),Z(-10+i*2),1.2)}for(let i=0;i<8;i++){const a=i/8*6.28;farn(bx+Math.cos(a)*11.5,bz+Math.sin(a)*11.5,1.1)}}
/* ---------- 17. Jaguar-Felsen ---------- */
function ort17(){const b=zone('Jaguar-Felsen'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.4);scheibe(bx,bz,12,0x6a7a48,.09);
  zaun(bx,bz,11.2,64,b.gap);
  const fl=felsgruppe(bx,bz-b.dir*1,6.5,4.5,8,1.5,3,.7);
  (function(){const x=X(-1),z=Z(-3);sph(3.6,0x8a8d90,x,1.7,z,scene,1.4,.55,1.1).castShadow=true;kreis(x,z,4.6);inst('sph',x,3.4,z,3.4,.4,2.6,0x4a8a3a);const h=sph(1.6,0x1a1a1a,x+2.6,1.6,z-1.6,scene,1,.9,1.2);const j=jaguar(scene);j.position.set(x+.2,3.55,z);j.rotation.y=R?-.4:.4;j.scale.setScalar(1.8);lebendig.push({o:j,ph:1})})();
  (function(){const j=jaguar(scene);j.position.set(X(6),0,Z(-1));j.rotation.y=R+2.6;j.scale.setScalar(1.7);lebendig.push({o:j,ph:3});kreis(X(6),Z(-1),1.6)})();
  (function(){const p=automerge(q=>vier(q,{f:0x2a2a2e,w:0x3a3a3e,d:0x1a1a1a,h:.78,bl:1.15,bh:.45,bw:.42,lr:.13,na:.35,nl:.3,nr:.24,hr:.32,hl:1.2,ht:.2,oh:.7,ef:0x2a2a2e,tr:.11,tl:3.8,tw:2.5,tc:0x2a2a2e,x:(g,kh)=>{flecken(g,1.15,.45,.42,.78,17,0x1a1a1e)}}))(scene);p.position.set(X(-7),0,Z(3));p.rotation.y=R+1.4;p.scale.setScalar(1.7);lebendig.push({o:p,ph:4});kreis(X(-7),Z(3),1.6)})();
  for(let i=0;i<8;i++){const a=i/8*6.28;urw(bx+Math.cos(a)*14.5,bz+Math.sin(a)*14.5,1,i%2,false)}for(let i=0;i<14;i++){const a=i/14*6.28+.2,r=10.2;farn(bx+Math.cos(a)*r,bz+Math.sin(a)*r,1.2)}
  forscher(X(0),Z(8),R+3.1,0,1.3);fernrohr(X(-3),Z(9),R,1.5);fernrohr(X(3),Z(9),R,1.5)}
/* ---------- 18. Tapir-Lichtung ---------- */
function tapirJung(par){return vier(par,{f:0x6a4a38,w:0x7a5a46,d:0x2a1a10,h:.55,bl:.7,bh:.4,bw:.34,lr:.1,na:.5,nl:.2,nr:.18,hr:.24,hl:1.3,ht:.4,oh:.9,ef:0x4a3a2c,notail:1,tr:.05,x:(g,kh)=>{sph(.14,0x5a4a3a,.4,-.1,0,kh,2.2,.9,.9);for(let i=0;i<6;i++){sph(.09,0xfff4e0,-.5+i*.18,.78,(i%2?.2:-.2),g,1.6,.5,.6)}}})}
const tapirJ=automerge(tapirJung);
function ort18(){const b=zone('Tapir-Lichtung'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x6a9a48,.09);
  const mx=X(4),mz=Z(-4);wasserRund(mx,mz,3.6,0x6a4a30);wRing(mx,mz,4.1);for(let i=0;i<9;i++){const a=i*.7;sph(.3,0x8a8d90,mx+Math.cos(a)*4.4,.2,mz+Math.sin(a)*4.4,scene,1.2,.7,1)}
  const t1=tapir(scene);t1.position.set(X(-3),0,Z(-5));t1.rotation.y=R+.6;t1.scale.setScalar(1.8);lebendig.push({o:t1,ph:1});kreis(X(-3),Z(-5),1.9);
  const t2=tapirJ(scene);t2.position.set(X(-5.4),0,Z(-3.8));t2.rotation.y=R+.2;t2.scale.setScalar(1.6);lebendig.push({o:t2,ph:2});
  const P=pendel(spl([[bx-5,bz+2],[bx,bz+4],[bx+5,bz+2],[bx+3,bz-1],[bx-2,bz-1]],1.5),.5);streif(tapir,P,.45,0,1.7);streif(tapirJ,P,.45,P.L*.3,1.5);
  stamm(X(-8),Z(4),3.6,.4,.5);stamm(X(8),Z(3),3.2,-.5,.45);box(1.4,.5,.8,0xe8e0d0,X(8),.25,Z(-4),scene,true);kreis(X(8),Z(-4),.8);
  for(let i=0;i<10;i++){const a=i/10*6.28;urw(bx+Math.cos(a)*14,bz+Math.sin(a)*14,1,i%2,false)}for(let i=0;i<14;i++){const a=i/14*6.28+.1;farn(bx+Math.cos(a)*11,bz+Math.sin(a)*11,1.2)}
  bankW(X(0),Z(7),R);forscher(X(-3),Z(7),R+3.3,2,1.3);forscher(X(5),Z(6.5),R-3,0,1.25)}
/* ---------- 19. Ameisenbär-Pfad ---------- */
function termitenhuegel(x,z,s){s=s||1;cone(1.5*s,3.4*s,0xb88a5a,x,1.7*s,z,scene,true);cone(1*s,2.6*s,0xa87a4a,x+.6*s,1.5*s,z-.4*s,scene);cone(.8*s,2.2*s,0xc8985e,x-.8*s,1.1*s,z+.5*s,scene);for(let i=0;i<5;i++)sph(.2*s,0x8a5a30,x+Math.cos(i*1.3)*1.2*s,.4*s+i*.45*s,z+Math.sin(i*1.3)*1.2*s,scene,1,.7,1);kreis(x,z,1.6*s)}
function ort19(){const b=zone('Ameisenbär-Pfad'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x8a8a50,.09);
  const Pp=[[X(-8),Z(2)],[X(-4),Z(-4)],[X(2),Z(-6)],[X(8),Z(-2)],[X(5),Z(4)],[X(-2),Z(4.5)]];const sp=spl([Pp[0],Pp[1],Pp[2],Pp[3],Pp[4],Pp[5],Pp[0]],2);wegBand(sp,2.4,0xa89060,.07);
  termitenhuegel(X(-6),Z(-8),1.2);termitenhuegel(X(1),Z(-10),1.5);termitenhuegel(X(8),Z(-8),1.1);termitenhuegel(X(-10),Z(-2),.9);termitenhuegel(X(10),Z(2),1);
  const B=pendel(spl([Pp[0],Pp[1],Pp[2],Pp[3],Pp[4]],1.5),.5);streif(ameisenbaer,B,.55,0,1.7);streif(ameisenbaer,B,.55,B.L*.5,1.5);
  const a3=ameisenbaer(scene);a3.position.set(X(0),0,Z(-5.2));a3.rotation.y=R-1.2;a3.scale.setScalar(1.8);lebendig.push({o:a3,ph:2});kreis(X(0),Z(-5.2),1.4);
  stamm(X(-4),Z(7),3.8,.2,.5);bankW(X(4),Z(7.4),R);forscher(X(-1),Z(7),R+3,1,1.3);
  for(let i=0;i<14;i++){const a=i/14*6.28;farn(bx+Math.cos(a)*11.2,bz+Math.sin(a)*11.2,1.2)}for(let i=0;i<6;i++)palme(bx+Math.cos(i*1.05+.5)*10.4,bz+Math.sin(i*1.05+.5)*10.4,1.1)}
function etappe3(){ort11();ort12();ort13();ort14();ort15();ort16();ort17();ort18();ort19()}

/* ==================== Etappe 4: Fluss und Ufer (Orte 20 bis 27) ==================== */
function schilf(x,z,h){h=h||2+nr()*1.2;inst('cyl',x,h/2,z,.035,h,.035,[0x7a9a4a,0x6a8a3a,0x8aaa52][Math.floor(nr()*3)]);if(nr()<.4)inst('cyl',x+.05,h*.9,z,.07,.3,.07,0x6a4a2e)}
function schilfBand(cx,cz,rx,rz,n){for(let i=0;i<n;i++){const a=nr()*6.28,r=Math.sqrt(nr());schilf(cx+Math.cos(a)*rx*r,cz+Math.sin(a)*rz*r)}}
function wasserfallZ(x,z,w,h,n){return schwarm(gBox,0xf4fbff,n,(i,t)=>{const u=((t*.8+i*.371)%1);return[x,h*(1-u)+.3,z+(((i*7)%11)/11-.5)*w,.5,h*.12+.2,.4,0]})}
function ort20(){const b=zone('Wasserschwein-Ufer'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11,0xa89a68,.09);
  const P=[[-6,-6.5,0],[-1,-7.5,1],[4,-6.5,2],[-4,-3,3],[2,-3.4,4],[7,-4.2,5]];
  P.forEach((p,i)=>{const w=(i<3?wasserschwein:wasserschwein)(scene);w.position.set(X(p[0]),0,Z(p[1]));w.rotation.y=(R?Math.PI:0)-1.57+(i%2?.5:-.4)+(R?0:Math.PI);w.scale.setScalar(i<3?1.8:1.15);lebendig.push({o:w,ph:i*1.3});kreis(X(p[0]),Z(p[1]),i<3?1.1:.7)});
  const sw=wasserschwein(scene);const B=pendel(spl([[X(-8),Z(-2)],[X(-2),Z(-1)],[X(6),Z(-1.5)]],1.5),.4);streif(wasserschwein,B,.5,0,1.7);
  wasserRund(X(8),Z(2),2.4,0x6a4a30);wRing(X(8),Z(2),2.8);schilfBand(bx,bz-8.6,12,1.4,40);
  (function(){const x=X(-8),z=Z(5),g=grp(x,0,z);g.rotation.y=R;[-1.2,1.2].forEach(s=>cyl(.08,2.2,0x6a4220,s,1.1,0,g,true));box(2.8,.12,1.8,0x4a8a3a,0,2.3,0,g).rotation.x=.15;box(2.4,.12,.8,0x8a5a32,0,.55,0,g);sperrKasten(x,z,2.8,1.8,R)})();
  const k=sitz(X(7),.9,Z(-7),R?1.2:-1.2,0,1.5);cyl(.07,.9,0x6a4220,X(7),.45,Z(-7),scene,true);forscher(X(1),Z(5),R+3.3,2,1.3);bankW(X(4),Z(6),R);
  for(let i=0;i<10;i++){const a=i/10*6.28;farn(bx+Math.cos(a)*10.4,bz+Math.sin(a)*10.4,1)}for(let i=0;i<6;i++)palme(X(-9+i*3.6),Z(8.8),1.1)}
function ort21(){const b=zone('Krokodilfluss'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11,0xb8a678,.09);
  scheibe(X(0),Z(-6.5),7,0xd0be88,.1);
  const K=[[-8,-5.6,.2],[0,-6.8,-.3],[8,-5.4,.5],[-3.5,-2.2,2.9]];K.forEach((p,i)=>{const k=kaiman(scene);k.position.set(X(p[0]),.1,Z(p[1]));k.rotation.y=(R?Math.PI:0)+p[2]+(R?0:0);k.scale.setScalar(1.3);lebendig.push({o:k,ph:i*1.1});kreis(X(p[0]),Z(p[1]),1.6)});
  /* eins im Wasser: nur Augen und Nase */
  const wz=bz+11;[-1,1].forEach(s=>sph(.16,0xf2c820,X(0)+s*.3,.18,wz,scene));sph(.12,0x5a6a38,X(0),.1,wz-.5,scene,1.5,.7,1.5);
  schilfBand(bx,bz+8.6,12,1.4,36);
  (function(){const x=X(-7),z=Z(3.4),g=grp(x,0,z);g.rotation.y=R;[-1.4,1.4].forEach(s=>cyl(.1,2.4,0x6a4220,s,1.2,0,g,true));box(3.2,.14,2,0x4a8a3a,0,2.45,0,g).rotation.x=.14;box(3,.5,.12,0x7a4a2a,0,1.1,.9,g);sperrKasten(x,z,3.2,2,R)})();
  sitz(X(6.5),.9,Z(-2),1,3,1.4);cyl(.07,.9,0x6a4220,X(6.5),.45,Z(-2),scene,true);stamm(X(7),Z(3),3.4,.3,.5);forscher(X(-3),Z(3),R+3.4,0,1.3);forscher(X(2),Z(4.2),R-3,1,1.25);fernrohr(X(-5),Z(5.5),R,1.5);
  for(let i=0;i<9;i++){const a=i/9*6.28;farn(bx+Math.cos(a)*10.4,bz+Math.sin(a)*10.4,1)}}
function ort22(){const b=zone('Kanu-Anleger'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z,rz=rioZ(bx);ast(b);scheibe(bx,bz,10,0xb8a678,.09);
  steg(bx,rz+11,bx,rz+.5,2.6);box(5,.12,2.4,0x9a6a3a,bx+3.3,.2,rz+6.4,scene,true);
  [[bx-3.6,rz+1.8],[bx+3.6,rz+3.4],[bx-3.8,rz-1.5]].forEach((p,i)=>{const k=kanu(scene,[0xd8602a,0x2a8ad8,0xe0c030][i]);k.position.set(p[0],.1,p[1]);k.rotation.y=-.1+i*.1;k.scale.setScalar(1.3);schwimmen(k,.1,i*2)});
  const k2=kanu(scene,0xe03a3a);k2.position.set(X(6.5),.3,Z(-2));k2.rotation.y=R?.5:-.5;k2.scale.setScalar(1.3);kreis(X(6.5),Z(-2),1.8);
  stall(X(-6),Z(-1),6.4,4,2.8,0xa8743f,0x4a8a3a,R?Math.PI:0);
  (function(){const x=X(-2.6),z=Z(5),g=grp(x,0,z);g.rotation.y=R;box(3,.12,.6,0x6a4220,0,1.5,0,g,true);[-1.3,1.3].forEach(s=>cyl(.06,1.6,0x6a4220,s,.8,0,g));for(let i=0;i<5;i++){cyl(.04,2.2,0x8a5a32,-1.1+i*.55,.9,.1,g).rotation.z=.15;box(.5,.08,.2,0xd8a050,-1.1+i*.55,1.95,.1,g)}sperrKasten(x,z,3,.8,R)})();
  for(let i=0;i<6;i++)box(.5,.7,.3,0xf59e3f,X(2.4+i*.42),.55+(i%2)*.1,Z(6.4),scene);sperrKasten(X(3.4),Z(6.4),2.6,.5,R);kiste(X(8),Z(4),0xf59e3f);tonne(X(-9),Z(4));
  forscher(X(2),Z(3),R+3.2,3,1.3);dorfmensch(X(5),Z(-4),R-.6,2,1.2);schilfBand(bx-8,rz+9,4,2,14);schilfBand(bx+8,rz+9,4,2,14);for(let i=0;i<8;i++){const a=i/8*6.28;farn(bx+Math.cos(a)*9.3,bz+Math.sin(a)*9.3,1)}}
function ort23(){const b=zone('Piranha-Steg'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z,rz=rioZ(bx);ast(b);scheibe(bx,bz,10,0xb8a678,.09);
  steg(bx,rz+11,bx,rz-1.5,2.6);forscher(bx+.7,rz-.6,-1.57,0,1.2);cyl(.03,3.2,0x6a4220,bx+.7,2.2,rz-1.6,scene).rotation.x=-.7;
  /* Aquarium mit Piranhas */
  (function(){const x=X(-5),z=Z(-2),g=grp(x,0,z);g.rotation.y=R;box(5.6,1,2.6,0x6a4220,0,.5,0,g,true);box(5.2,.2,2.2,0xc8b080,0,1.1,0,g);glas(5.2,2.2,2.2,0,2.2,0,g);glas(5.0,1.9,2,0,2.05,0,g);for(let i=0;i<6;i++)inst('cyl',x+(i-2.5)*.8,1.5,z,.05,.8,.05,0x3a8a3a);for(let i=0;i<5;i++)inst('sph',x+(i-2)*.9,1.25,z+.5*(i%2?1:-1),.25,.15,.25,0x8a8d90);sperrKasten(x,z,5.8,2.8,R);
    for(let i=0;i<8;i++){const q=piranhaM(scene);q.userData.keep=1;q.scale.setScalar(.55);lebendig.push({o:{userData:{anim:t=>{const a=t*(.5+(i%3)*.15)+i*1.7,rx=2.1,rz2=.8,lx=Math.cos(a)*rx*(.5+(i%3)*.2),lz=Math.sin(a)*rz2,ly=1.6+Math.sin(t*.9+i)*.4;q.position.set(x+(lx*Math.cos(R)+lz*Math.sin(R)),ly,z+(-lx*Math.sin(R)+lz*Math.cos(R)));q.rotation.y=-Math.atan2(Math.cos(a)*rz2,-Math.sin(a)*rx)+R}}},ph:0})}})();
  box(1.6,.5,1,0x3a5a7a,X(4),.25,Z(-1),scene,true);kreis(X(4),Z(-1),1);cyl(.3,.4,0x8a8d90,X(6.5),.2,Z(-3),scene,true);kreis(X(6.5),Z(-3),.4);
  (function(){const x=X(7.5),z=Z(3),g=grp(x,0,z);g.rotation.y=R;[-1.7,1.7].forEach(s=>cyl(.07,2.2,0x6a4220,s,1.1,0,g,true));box(3.6,.06,.06,0x6a4220,0,2.2,0,g);for(let k=0;k<5;k++)box(.9,.5,.04,0x8a9aa0,-1.4+k*.7,1.6+(k%2)*.15,0,g);sperrKasten(x,z,3.6,.5,R)})();
  tonne(X(-9),Z(5));forscher(X(1),Z(5),R+3.3,1,1.3);for(let i=0;i<4;i++)schilfBand(bx-9+i*6,rz+9,3,2,10);for(let i=0;i<8;i++){const a=i/8*6.28;farn(bx+Math.cos(a)*9.3,bz+Math.sin(a)*9.3,1)}}
function ort24(){const cx=106,cz=-85,b=zone('Flussdelfin-Bucht',-58);ast(b);wasserRund(cx,cz,17,0x4aa8a8);wasserRund(cx-2,cz+1,11,0x62c0bc,.02);wRing(cx,cz,17.6,Math.PI/2,4.4);scheibe(cx,cz+22,6,0xb8a678,.09);
  steg(cx,cz+23,cx,cz+7,3.4);box(5,.12,4,0x9a6a3a,cx,.22,cz+5.5,scene,true);[-2.3,2.3].forEach(s=>sperrLinie(cx+s,cz+3.5,cx+s,cz+7,.15));sperrLinie(cx-2.3,cz+3.5,cx+2.3,cz+3.5,.15);[-2,2].forEach(s=>{cyl(.07,1.1,0x6a4220,cx+s,.7,cz+3.6,scene);cyl(.07,1.1,0x6a4220,cx+s,.7,cz+7.4,scene)});box(4.6,.07,.07,0x6a4220,cx,1.2,cz+3.6,scene);
  for(let i=0;i<3;i++){const d=delphin(scene);d.userData.keep=1;d.scale.setScalar(1.55);const ph=i*2.1,r=7+i*1.6,sp=.5+i*.07;lebendig.push({o:{userData:{anim:t=>{const f=a=>[cx+Math.cos(a)*r,Math.max(-1.2,Math.sin(a*2.4)*2.6-.5),cz+Math.sin(a)*r*.85];const a=t*sp+ph,p=f(a),q=f(a+.04);d.position.set(p[0],p[1],p[2]);d.rotation.y=-Math.atan2(q[2]-p[2],q[0]-p[0]);d.rotation.z=Math.atan2(q[1]-p[1],Math.hypot(q[0]-p[0],q[2]-p[2]))*1;d.visible=Math.hypot(p[0]-spieler.position.x,p[2]-spieler.position.z)<95;if(d.userData.anim&&d.visible)d.userData.anim(t)}}},ph:0})}
  for(let i=0;i<14;i++){const a=nr()*6.28,r=3+nr()*11;const x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(Math.hypot(x-cx,z-cz-5.5)<4.6&&z>cz+2)continue;inst('cyl',x,.16,z,.9+nr()*.4,.05,.9+nr()*.4,0x3a9a3a);if(i%3===0)inst('sph',x,.24,z,.2,.12,.2,0xf47ab0)}
  const bk=kanu(scene,0xe0c030);bk.position.set(cx-12.5,.1,cz+9);bk.rotation.y=.9;bk.scale.setScalar(1.3);schwimmen(bk,.1,1);
  forscher(cx+1.2,cz+22.8-14,3.1,0,1.3);fernrohr(cx-2.6,cz+4.2,Math.PI,1.5);forscher(cx-8,cz+25,.2,1,1.3);bankW(cx+4,cz+24,0);bankW(cx-4,cz+24.6,0);
  for(let i=0;i<22;i++){const a=i/22*6.28;const x=cx+Math.cos(a)*19.5,z=cz+Math.sin(a)*19.5;if(a>.9&&a<2.2)continue;schilf(x,z,2.4);farn(x+Math.cos(a)*1.4,z+Math.sin(a)*1.4,1.1)}}
function ort25(){const cx=152,cz=-84,b=zone('Wasserfall mit Becken',-58);ast(b);wasserRund(cx,cz,12,0x4aa8b0);wasserRund(cx+3,cz,7,0x7ad0d0,.02);wRing(cx,cz,12.5,Math.PI/2,4.2);
  steg(cx,cz+16,cx,cz+9,3.2);box(5,.12,3.2,0x9a6a3a,cx,.22,cz+8,scene,true);sperrLinie(cx-2.5,cz+6.4,cx+2.5,cz+6.4,.15);[-1,1].forEach(s=>sperrLinie(cx+s*2.5,cz+6.4,cx+s*2.5,cz+9.4,.15));
  felswand(169,cz,38,8,22,Math.PI/2,0x7a7a70);felswand(166,cz-22,16,6,15,Math.PI/2,0x6a7a6a);felswand(166,cz+22,16,6,15,Math.PI/2,0x6a7a6a);
  wasserfallZ(165.2,cz,7,21,70);const fo=[[-2.5,.4,1.6],[0,.4,2],[2.5,.4,1.5]];fo.forEach((q,i)=>{const s=sph(1,0xf6fbff,163.5,q[1],cz+q[0],scene,q[2],.4,q[2]);bewegt(s,t=>{const k=1+Math.sin(t*3+i)*.18;s.scale.set(q[2]*k,.4,q[2]*k)})});
  const nb=new THREE.InstancedMesh(gSphL,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.22,depthWrite:false}),7);nb.frustumCulled=false;scene.add(nb);{const M=new THREE.Matrix4(),P=new THREE.Vector3(),S=new THREE.Vector3(),Q=new THREE.Quaternion();lebendig.push({o:{userData:{anim:t=>{for(let i=0;i<7;i++){const u=(t*.12+i/7)%1;P.set(162-u*3+Math.sin(i)*2,1.2+u*5,cz+(i-3)*1.8);S.set(2.4+u*2,1.4+u,2.4+u*2);M.compose(P,Q,S);nb.setMatrixAt(i,M)}nb.instanceMatrix.needsUpdate=true}}},ph:0})}
  felsgruppe(cx+3,cz-1,10,8,8,.8,1.8,.7);felsgruppe(cx-6,cz+8,3,3,3,.6,1,.7);
  for(let i=0;i<9;i++){const x=176+nr()*3,z=cz-18+i*4.5;urw(x,z,1.3,nr()<.5?2:1,false)}for(let i=0;i<26;i++){const a=nr()*6.28;const x=cx+Math.cos(a)*(14+nr()*3),z=cz+Math.sin(a)*(14+nr()*3);if(x>164||(z>cz+4&&x>cx-4&&x<cx+4))continue;if(i%3)farn(x,z,1.3);else blatt(x,z,1.3)}
  forscher(cx-1.6,cz+16,3.14,1,1.3);forscher(cx+2,cz+17.5,3.4,3,1.25);bankW(cx-5,cz+19,0);laterne(cx+6,cz+18)}
function ort26(){const b=zone('Sumpf'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;WS.push([bx,bz,11]);ast(b);scheibe(bx,bz,15,0x5a6a3a,.08);wasserRund(bx,bz,11.4,0x4a7a52);wasserRund(bx+1,bz-1,7,0x5a8a5a,.02);wRing(bx,bz,11.9,Math.PI/2,4.4);
  steg(bx,bz+16,bx,bz+4.4,3);cyl(3.4,.18,0x9a6a3a,bx,.2,bz,scene,true);sperrRing(bx,bz,3.7,24,Math.PI/2);for(let i=0;i<16;i++){const a=i/16*6.28;if(Math.abs(Math.atan2(Math.sin(a-1.57),Math.cos(a-1.57)))<.5)continue;cyl(.07,1.1,0x6a4220,bx+Math.cos(a)*3.3,.7,bz+Math.sin(a)*3.3,scene)}
  [[-5,-3,2.0],[-1,-6,1.6],[4,-4,2.1],[6,1,1.7],[-7,2,1.8],[1,-1.5,1.4],[-3.5,-.5,1.5],[3,5.5,1.6]].forEach((p,i)=>{const x=bx+p[0],z=bz+p[1];inst('cyl',x,.16,z,p[2],.07,p[2],0x3a9a3a);inst('cyl',x,.2,z,p[2]*.94,.05,p[2]*.94,0x4aaa44);inst('cyl',x,.1,z,p[2]*1.0,.04,p[2]*1.0,0x2a6a2a);if(i%2===0){inst('sph',x+.2,.34,z,.34,.2,.34,i%4?0xf47ab0:0xffffff);inst('sph',x-.3,.3,z+.2,.26,.16,.26,0xffffff)}if(i===1||i===3){const f=baumfrosch(scene);f.position.set(x,.2,z);f.rotation.y=i;f.scale.setScalar(1.4);lebendig.push({o:f,ph:i})}});
  /* Kannenpflanzen */
  const kanne2=(x,z,h,s)=>{cyl(.06*s,h,0x4a8a3a,x,h/2,z,scene);for(let i=0;i<3;i++){const a=i*2.1+x,y=h*(.55+i*.17),px=x+Math.cos(a)*.5*s,pz=z+Math.sin(a)*.5*s;cyl(.2*s,.6*s,[0xb83a3a,0x8a3a5a,0x6aa83a][i],px,y,pz,scene).scale.set(.2*s,.6*s,.2*s);cone(.24*s,.3*s,0x8a2a2a,px,y-.42*s,pz,scene).rotation.x=Math.PI;cyl(.22*s,.04,0x4a2a1a,px,y+.35*s,pz,scene)}for(let i=0;i<4;i++)inst('blm',x+Math.cos(i*1.6)*.5*s,.3,z+Math.sin(i*1.6)*.5*s,.6*s,.1,.18*s,0x3a8a3a,i)};
  [[-8,6],[8,5],[-9,-3],[9,-4],[-2,-9],[4,-9.5],[-4,9],[5,9.5]].forEach((p,i)=>{kanne2(bx+p[0],bz+p[1],1.7+(i%3)*.4,1.7);kreis(bx+p[0],bz+p[1],.4)});
  for(let i=0;i<24;i++){const a=nr()*6.28,r=11+nr()*3.2;const x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(Math.abs(Math.atan2(Math.sin(a-1.57),Math.cos(a-1.57)))<.5)continue;for(let k=0;k<3;k++)inst('blm',x+Math.cos(k*2.1)*.35,.06,z+Math.sin(k*2.1)*.35,.4,.05,.14,0xc03a2a,k*2+i);inst('blm',x,.05,z,.3,.05,.12,0x8a3a2a,i)}
  [[-6,-6],[7,-7]].forEach((p,i)=>{const x=bx+p[0],z=bz+p[1];cyl(.25,4.4,0x4a3a2a,x,2.2,z,scene,true);ast2(x+.7,3.2,z,1.8,.5,.1);ast2(x-.6,2.6,z+.3,1.5,2.6,.09);liane(x+1.2,3,z,2.4);sph(.3,0x5a6a38,x,4.6,z,scene,1.4,.5,1.4)});
  schilfBand(bx,bz,13,12,60);for(let i=0;i<12;i++){const a=i/12*6.28;urw(bx+Math.cos(a)*18.5,bz+Math.sin(a)*18.5,1.1,i%2,false)}forscher(bx+2.8,bz+13,3.3,2,1.3);forscher(bx-2.2,bz+14,2.9,0,1.3)}
function ort27(){weg([[78,roadZ(78,-58)],[78,rioZ(78)+13]],3);weg([[78,rioZ(78)-13],[78,roadZ(78,-110)]],3);const cx=-148;[-1,1].forEach(s=>{const z0=rioZ(cx)+s*13.5;scheibe(cx,z0,4,0xb8a678,.09)});
  [[-148],[78]].forEach((q,i)=>{const x=q[0],rz=rioZ(x);[-1,1].forEach((s,k)=>{const z=rz+s*14;box(5,.2,4,0x9a6a3a,x,.2,z,scene,true);const v=(i?ara:ara2)(scene);v.position.set(x+2.8,6.9,rz+s*(6.4+.7));v.rotation.y=1.2*s+i;v.scale.setScalar(1.5);lebendig.push({o:v,ph:k+i})});forscher(x-2.4,rz+16,3.14,i?2:1,1.3);for(let j=0;j<5;j++){farn(x-6+j*2.6,rz+17.5,1.1);farn(x-6+j*2.6,rz-17.5,1.1)}});
  [[-148,1],[78,0]].forEach(q=>{const rz=rioZ(q[0]);const g=sitz(q[0]-3.4,.2,rz+12,3,q[1]?4:5,1.5);laterne(q[0]+4,rz+15);laterne(q[0]-4,rz-15)});
  bankW(-140,rioZ(-140)+19,0);bankW(85,rioZ(85)+19,0)}
function etappe3a(){ort20();ort21();ort22();ort23();ort24();ort25();ort26();ort27()}

/* ==================== Etappe 5: Kronendach, Ruinen, Dorf und Plantagen (Orte 28 bis 38) ==================== */
/* Seilsteg zwischen zwei Punkten in Höhe y (nur zur Ansicht, in der Höhe), Seile und Pfosten */
function seilsteg(x1,z1,x2,z2,y,w,sag){const dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz),n=Math.round(L/.7),th=Math.atan2(-dz,dx);sag=sag||.5;for(let i=0;i<=n;i++){const u=i/n,p=box(.5,.08,w,0x9a6a3a,x1+dx*u,y-Math.sin(u*Math.PI)*sag,z1+dz*u,scene);p.rotation.y=th}
  [-1,1].forEach(s=>{const ox=-dz/L*s*(w/2+.05),oz=dx/L*s*(w/2+.05);let pa=null;for(let i=0;i<=8;i++){const u=i/8,p=[x1+dx*u+ox,y+1-Math.sin(u*Math.PI)*sag,z1+dz*u+oz];if(pa)rohr(pa,p,.04,0x6a4a2e);pa=p;cyl(.04,1,0x6a4a2e,p[0],y+.5-Math.sin(u*Math.PI)*sag,p[2],scene)}})}
function plattform(x,y,z,w,rail){box(w,.3,w,0x8a5a32,x,y,z,scene,true);if(rail!==false){[[0,-1],[0,1]].forEach(p=>box(w,.1,.1,0x6a4220,x,y+1.1,z+p[1]*w/2,scene));[[-1,0],[1,0]].forEach(p=>box(.1,.1,w,0x6a4220,x+p[0]*w/2,y+1.1,z,scene));[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>cyl(.06,1.1,0x6a4220,x+p[0]*w/2,y+.7,z+p[1]*w/2,scene))}}
function leiter(x,z,y,rot){const g=grp(x,0,z);g.rotation.y=rot||0;[-.4,.4].forEach(s=>box(.08,y,.1,0x6a4220,s,y/2,0,g));for(let i=0;i<y/.45;i++)box(.8,.06,.08,0x8a5a32,0,.3+i*.45,0,g);return g}
function ort28(){const b=zone('Baumkronenpfad-Turm'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10,0x8a7a52,.09);
  const H=13,hw=2.4;[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>cyl(.3,H,0x7a5a3a,bx+p[0]*hw,H/2,bz+p[1]*hw,scene,true));
  for(let k=0;k<3;k++){const y0=k*4.33,y1=y0+4.33;[[-1,-1,1,-1],[1,-1,1,1],[1,1,-1,1],[-1,1,-1,-1]].forEach(s=>{rohr([bx+s[0]*hw,y0,bz+s[1]*hw],[bx+s[2]*hw,y1,bz+s[3]*hw],.07,0x6a4a2e);rohr([bx+s[2]*hw,y0,bz+s[3]*hw],[bx+s[0]*hw,y1,bz+s[1]*hw],.07,0x6a4a2e);box(Math.abs(s[2]-s[0])?hw*2+.4:.2,.2,Math.abs(s[3]-s[1])?hw*2+.4:.2,0x6a4a2e,bx+(s[0]+s[2])/2*hw,y1,bz+(s[1]+s[3])/2*hw,scene)})}
  plattform(bx,H,bz,hw*2+2.2);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>cyl(.08,3.4,0x6a4220,bx+p[0]*(hw+.9),H+1.7,bz+p[1]*(hw+.9),scene));cone(5,2,0x3a7a3a,bx,H+4.4,bz,scene,true);
  for(let i=0;i<30;i++){const a=i*.43+.3,r=3.8;const st=box(1.3,.18,.9,0x9a6a3a,bx+Math.cos(a)*r,.4+i*.43,bz+Math.sin(a)*r,scene);st.rotation.y=-a}
  sperrKasten(bx,bz,9.4,9.4,0);
  const t1=[bx+15,bz+4],t2=[bx-14,bz-4];[t1,t2].forEach((t,i)=>{grossBaum(t[0],t[1],20,.9,.3);plattform(t[0],H,t[1],4.4,true);seilsteg(bx+(t[0]>bx?hw+1.1:-hw-1.1),bz,t[0]+(t[0]>bx?-2.2:2.2),t[1],H+.15,1.4,.7)});
  box(3,2.4,3,0xa8743f,t1[0]+.4,H+1.4,t1[1],scene);giebel(grp(t1[0]+.4,0,t1[1]),3,3,H+2.6,0x4a8a3a,0xa8743f);
  [[bx+2.6,H+1.2,bz+hw+1.1],[bx-2.6,H+1.2,bz-hw-1.1]].forEach((p,i)=>{const v=(i?ara:ara2)(scene);v.position.set(p[0],p[1],p[2]);v.rotation.y=i?3.5:.5;v.scale.setScalar(1.6);lebendig.push({o:v,ph:i})});
  forscher(X(-5),Z(6),R+3.4,2,1.3);forscher(X(5),Z(5.5),R-3,0,1.3);kiste(X(0),Z(7),0xf59e3f);for(let i=0;i<10;i++){const a=i/10*6.28;farn(bx+Math.cos(a)*9.6,bz+Math.sin(a)*9.6,1.1)}}
function baumhaus(x,y,z,rot,f){const g=grp(x,y,z);g.rotation.y=rot||0;box(5.4,.3,5.4,0x8a5a32,0,0,0,g,true);box(3.6,2.6,3.4,f||0xa8743f,-.3,1.6,-.4,g,true);giebel(g,3.6,3.4,2.9,0x4a8a3a,f||0xa8743f);box(.9,1.7,.1,0x5a3a22,-.3,1.2,1.35,g);box(.8,.8,.1,0xcfeaf5,.9,1.9,1.35,g);box(1,.1,.5,0x8a5a32,.9,1.4,1.55,g);[-1,1].forEach(s=>{box(5.4,.1,.1,0x6a4220,0,1.1,s*2.7,g);box(.1,.1,5.4,0x6a4220,s*2.7,1.1,0,g);[-1,1].forEach(q=>cyl(.06,1.1,0x6a4220,s*2.7,.7,q*2.7,g))});return g}
function ort29(){const b=zone('Baumhausdorf'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,15,0x7a7a48,.09);
  const T=[[-8,-6,.6],[8,-6,2.2],[8.5,3,3.6],[-8.5,2,5.2]],Y=8;const pos=T.map(p=>[X(p[0]),Z(p[1])]);
  pos.forEach((p,i)=>{grossBaum(p[0],p[1],17,.9,.3);baumhaus(p[0],Y,p[1],T[i][2]+(R?Math.PI:0),[0xa8743f,0xb8844f,0x9a6a3a,0xc8944f][i]);const a=Math.atan2(bz-p[1],bx-p[0]);leiter(p[0]+Math.cos(a)*1.4,p[1]+Math.sin(a)*1.4,Y,-a+1.57);liane(p[0]+1.3,17,p[1]+.6,9)});
  for(let i=0;i<4;i++){const a=pos[i],c=pos[(i+1)%4];if(i===3)continue;const dx=c[0]-a[0],dz=c[1]-a[1],l=Math.hypot(dx,dz);seilsteg(a[0]+dx/l*2.7,a[1]+dz/l*2.7,c[0]-dx/l*2.7,c[1]-dz/l*2.7,Y+.15,1.4,.8)}
  /* Seilzug-Korb */
  (function(){const x=X(0),z=Z(-5.5);rohr([x,Y+4,z],[x,.2,z],.03,0x6a4a2e);const k=box(1,.7,1,0x8a5a32,x,3,z,scene);k.userData.keep=1;sph(.3,0xf2d030,x,3.6,z,scene).userData.keep=1;lebendig.push({o:{userData:{anim:t=>{k.position.y=.6+(Math.sin(t*.4)*.5+.5)*(Y-.8)}}},ph:0})})();
  stall(X(0),Z(4),6,3.6,2.8,0xa8743f,0x4a8a3a,R?Math.PI:0);(function(){const fx=X(-5),fz=Z(5);for(let i=0;i<8;i++)sph(.25,0x8a8d90,fx+Math.cos(i*.8)*1,.14,fz+Math.sin(i*.8)*1,scene,1.1,.7,1);flamme(fx,.2,fz,.8);kreis(fx,fz,1.2);[[-2.2,0],[2.2,.4]].forEach(p=>stumpf(fx+p[0],fz+p[1],.9))})();
  kiste(X(6),Z(5),0xf59e3f);kiste(X(7.2),Z(5.6),0x8ac040);tonne(X(9),Z(6));seil2(X(-9),Z(6));forscher(X(3.5),Z(6.6),R+3.2,1,1.3);forscher(X(-2),Z(-1),R+.5,0,1.3);dorfmensch(X(1),Z(-3),R-1,3,1.2);
  for(let i=0;i<6;i++){const v=(i%2?tukan:ara)(scene);const p=pos[i%4];v.position.set(p[0]+(i%3-1)*1.2,Y+1.4,p[1]+1.9);v.rotation.y=i;v.scale.setScalar(1.5);lebendig.push({o:v,ph:i})}
  for(let i=0;i<12;i++){const a=i/12*6.28;farn(bx+Math.cos(a)*14.2,bz+Math.sin(a)*14.2,1.2)}}
function seil2(x,z){const g=grp(x,0,z);for(let i=0;i<5;i++){cyl(.28,.12,0xc8a870,0,.06+i*.1,0,g,true).scale.set(.28+(5-i)*.1,.12,.28+(5-i)*.1)}kreis(x,z,.8)}
function ort30(){const b=zone('Kapok-Riesenbaum'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,14,0x6a7a40,.09);
  const tx=bx,tz=bz-b.dir*3;cyl(2.3,36,0x8a7a6a,tx,18,tz,scene,true);cyl(2.7,4,0x8a7a6a,tx,2,tz,scene,true);
  for(let i=0;i<6;i++){const a=i*1.047+.3;const r=mesh(gCone,0x8a7a6a,tx+Math.cos(a)*2.4,3.4,tz-Math.sin(a)*2.4,2.6,6.8,.5,scene,true);r.rotation.y=a}
  kreis(tx,tz,5.3);
  sph(13,tp(),tx,38,tz,scene,1,.5,1).castShadow=true;sph(8,tp(),tx+9,35,tz+4,scene,1,.55,1);sph(8,tp(),tx-8,35,tz-5,scene,1,.55,1);sph(7,tp(),tx+2,35,tz-9,scene,1,.5,1);
  for(let i=0;i<16;i++){const a=i*.9+.4,r=5+(i%4)*2.2;liane(tx+Math.cos(a)*r,34,tz+Math.sin(a)*r,30+(i%3)*2);if(i%2)liane(tx+Math.cos(a)*r+.3,34,tz+Math.sin(a)*r+.3,26)}
  for(let i=0;i<24;i++){const a=i*2.4,y=3+(i*1.7)%24;brom(tx+Math.cos(a)*2.45,y,tz+Math.sin(a)*2.45,1.2,i);if(i%3===0)inst('blm',tx+Math.cos(a)*2.4,y+.4,tz+Math.sin(a)*2.4,.3,.2,.2,[0xe070c8,0xffffff,0xf0e040][i%3],a)}
  [[3.6,0,tukan],[-3,2,ara],[1,-4,ara2]].forEach((q,i)=>{const v=q[2](scene);v.position.set(tx+q[0]*1.1,5.6+i*.8,tz+q[1]*.9);v.rotation.y=i*2.1;v.scale.setScalar(1.7);lebendig.push({o:v,ph:i})});
  /* Kinder und Forscher umarmen den Baum: Kreis */
  for(let i=0;i<9;i++){const a=i/9*6.28+.2,r=6.5;const m=(i%3===0?dorfmensch:forscher)(tx+Math.cos(a)*r,tz+Math.sin(a)*r,-a+1.57+3.14,i,1.15);const arm=1.2;}
  stumpf(X(-8),Z(6),1.3);stumpf(X(8),Z(7),1.2);bankW(X(0),Z(8.4),R);for(let i=0;i<14;i++){const a=i/14*6.28;farn(bx+Math.cos(a)*13,bz+Math.sin(a)*13,1.3)}}
function ort31(){const b=zone('Tempelruine'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.4);scheibe(bx,bz,14,0x7a8a60,.09);
  const g=grp(bx,0,bz-b.dir*2);g.rotation.y=R;const S=[0x9a9a88,0x8a9a82,0x9a9a8a,0x8a8a7a];[[14,2.2],[11,2.2],[8,2.2],[5.4,2]].forEach((t,i)=>{let y0=0;for(let k=0;k<i;k++)y0+=[2.2,2.2,2.2,2][k];box(t[0],t[1],t[0],S[i],0,y0+t[1]/2,0,g,true);box(t[0]+.3,.2,t[0]+.3,0x6a7a62,0,y0+t[1],0,g)});
  for(let i=0;i<19;i++)box(3.4,.47*(i+1),.3,0xa0a090,0,.235*(i+1),7.6-i*.26,g);
  box(4,2.8,4,0x8a9a82,0,8.6+1.4,0,g,true);box(1.2,2,.14,0x1a1a1a,0,9.6+0,2.02,g);box(5,.4,5,0x7a8a72,0,12.2,0,g);box(1.5,.8,1.5,0x9a9a88,0,12.8,0,g);
  const gx=bx,gz=bz-b.dir*2;sperrKasten(gx,gz,14.4,14.4,0);
  for(let i=0;i<22;i++){const a=nr()*6.28,s=[7,5.5,4,2.7][i%4];inst('blm',gx+(nr()-.5)*s*1.5,[2.3,4.5,6.7,8.6][i%4]+.05,gz+(nr()-.5)*s*1.5,.9,.06,.7,0x3a7a38,a)}for(let i=0;i<14;i++)liane(gx+(i%2?7.1:-7.1),[2.2,2.2][0]+4,gz-6+i*.9,3+(i%4));
  for(let i=0;i<5;i++){const x=X(-12.5),z=Z(-6+i*3.2);const h=i===1?2.2:4.6;cyl(.55,h,0x9a9a88,x,h/2,z,scene,true);if(i!==1)box(1.5,.4,1.5,0x8a8a7a,x,h+.2,z,scene);kreis(x,z,.7)}
  cyl(.55,3.6,0x8a8a7a,X(-9.5),.55,Z(5.5),scene,true).rotation.z=Math.PI/2;kreis(X(-9.5),Z(5.5),.8);
  [[-8,-9,5,.3],[9,-9.5,4,-.2]].forEach(p=>{box(p[2],2.2,.8,0x8a9a82,X(p[0]),1.1,Z(p[1]),scene,true).rotation.y=R+p[3];sperrKasten(X(p[0]),Z(p[1]),p[2],.8,R+p[3])});
  (function(){const x=X(10),z=Z(5.6),h=grp(x,0,z);h.rotation.y=R;sph(1.5,0x8a9a82,0,1.2,0,h,1,1.1,.9).castShadow=true;box(.4,.8,.5,0x8a9a82,0,1.2,1.2,h);[-1,1].forEach(s=>{sph(.28,0x2a3a30,s*.55,1.6,1.15,h,1.3,.6,.5);box(.8,.18,.14,0x7a8a72,s*.5,1.9,1.18,h).rotation.z=s*.2});box(1,.14,.3,0x2a3a30,0,.7,1.25,h);kreis(x,z,1.7)})();
  (function(){const x=X(-4),z=Z(8),g2=grp(x,0,z);[[-1.4,-1.4],[1.4,-1.4],[-1.4,1.4],[1.4,1.4]].forEach(p=>{cyl(.05,.9,0x8a5a32,p[0],.45,p[1],g2);});[-1.4,1.4].forEach(s=>{box(2.9,.03,.03,0xf2f2ee,0,.8,s,g2);box(.03,.03,2.9,0xf2f2ee,s,.8,0,g2)});for(let i=0;i<2;i++)box(2.8,.03,.03,0xf2f2ee,0,.8,-.4+i*.8,g2);sperrKasten(x,z,3,3,0)})();
  forscher(X(-1),Z(8),R+3.3,2,1.3);forscher(X(3),Z(9),R+3,0,1.25);for(let i=0;i<6;i++)urw(bx+Math.cos(i*1.05+.4)*16.5,bz+Math.sin(i*1.05+.4)*16.5,1.1,i%2,false);for(let i=0;i<14;i++){const a=i/14*6.28;farn(bx+Math.cos(a)*12.8,bz+Math.sin(a)*12.8,1.2)}
  const v=ara(scene);v.position.set(gx-5.4,14,gz+1);v.scale.setScalar(1.6);lebendig.push({o:v,ph:1})}
function ort32(){const b=zone('Dorf der Waldbewohner'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.4);scheibe(bx,bz,16,0xb8986a,.09);scheibe(bx,bz,7,0xd0b080,.1);
  const dreh=(hx,hz)=>Math.atan2(hz-bz,-(hx-bx));const HH=[[-11,-5,2.6,2.4,0xc8a070],[-3,-11.5,2.9,2.6,0xb8a070],[8,-10,2.7,2.4,0xc8986a],[13,-1,2.4,2.2,0xd0a878],[-13,3,2.5,2.3,0xb8986a],[3,12,2.4,2.2,0xc8a070]];
  HH.forEach(h=>{const x=X(h[0]),z=Z(h[1]);rundhaus(x,z,h[2],h[3],h[4],0xb89a50,dreh(x,z));[0,1,2].forEach(k=>sph(.2,0x8a6a3a,x+Math.cos(k*2.1)*h[2]*.7,.2,z+Math.sin(k*2.1)*h[2]*1.1,scene))});
  (function(){const fx=bx,fz=bz;for(let i=0;i<10;i++)sph(.28,0x8a8d90,fx+Math.cos(i*.63)*1.3,.15,fz+Math.sin(i*.63)*1.3,scene,1.1,.7,1);[0,1,2].forEach(i=>cyl(.05,2,0x5a3a22,fx+Math.cos(i*2.1)*.5,1,fz+Math.sin(i*2.1)*.5,scene).rotation.z=Math.cos(i*2.1)*.3);cyl(.55,.6,0x3a3a3e,fx,1.1,fz,scene);sph(.5,0x3a3a3e,fx,1.2,fz,scene,1,.5,1);flamme(fx,.2,fz,.8);rauch(scene,fx+.3,1.8,fz);kreis(fx,fz,1.4);[[3,0],[-3,.6],[0,3.2],[-.4,-3.2]].forEach(p=>stumpf(fx+p[0],fz+p[1],1))})();
  /* Töpferei */
  (function(){const x=X(-6),z=Z(9.5),g=grp(x,0,z);g.rotation.y=R;[[-2.4,-1.4],[2.4,-1.4],[-2.4,1.4],[2.4,1.4]].forEach(p=>cyl(.1,2.4,0x6a4220,p[0],1.2,p[1],g,true));box(5.8,.14,3.6,0xb89a50,0,2.55,0,g).rotation.x=.12;box(4.6,.1,.8,0x8a5a32,0,1.1,-1.1,g);for(let i=0;i<6;i++){cyl(.22,.5,[0xc8784a,0xb8683a,0xd88a5a][i%3],-2+i*.8,1.4,-1.1,g);sph(.18,0xc8784a,-2+i*.8,1.75,-1.1,g,1,.7,1)}cyl(.55,.18,0x8a5a32,-.8,.9,.9,g);cyl(.3,.1,0xc8784a,-.8,1.06,.9,g);cyl(.15,.9,0x6a4220,-.8,.45,.9,g);sperrKasten(x,z,5.8,3.6,R)})();
  (function(){const x=X(-1),z=Z(9.5);sph(1.5,0xb8784a,x,1.2,z,scene,1,.8,1);box(.9,.8,.5,0x2a1a10,x,.7,z+1.2*(R?-1:1),scene);kreis(x,z,1.7);for(let i=0;i<6;i++)inst('cyl',x+3+(i%3)*.7,.35+Math.floor(i/3)*.7,z+(i%2)*.5,.3,.5,.3,[0xc8784a,0xb8683a][i%2])})();
  /* Boote (Einbäume) auf Gestell */
  [[8,5],[8.4,8]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]),g=grp(x,0,z);g.rotation.y=R?Math.PI+1.57+.1*i:1.57+.1*i;box(5.6,.55,.95,0x8a5a32,0,.75,0,g,true);box(5.2,.3,.6,0x5a3a22,0,.9,0,g);cone(.5,.8,0x8a5a32,2.9,.8,0,g).rotation.z=-1.57;cone(.5,.8,0x8a5a32,-2.9,.8,0,g).rotation.z=1.57;[-2,2].forEach(s=>box(.3,.4,1.2,0x6a4a2e,s,.2,0,g));box(.12,.12,2.2,0x6a4220,.8,.9,.1,g).rotation.y=.5;sperrKasten(x,z,5.8,1.2,R?Math.PI+1.57:1.57)});
  /* Maniok-Beet */
  for(let i=0;i<16;i++){const x=X(-14+(i%4)*1.1)+0,z=Z(-12+Math.floor(i/4)*1.2);if(0)continue;inst('cyl',X(6+(i%4)*1.3),.6,Z(5.5+Math.floor(i/4)*1.3),.04,1.2,.04,0x7a5a3a);inst('blm',X(6+(i%4)*1.3),1.3,Z(5.5+Math.floor(i/4)*1.3),.45,.14,.3,0x3a8a3a,i);inst('blm',X(6+(i%4)*1.3),1.2,Z(5.5+Math.floor(i/4)*1.3),.45,.14,.3,0x4aa040,i+1.5)}
  korb(X(4),Z(3),0xc8a870);korb(X(-4),Z(-2),0xf2c230);eimer(X(11),Z(5),0x8a5a32,0x3f9ad8);
  [[-1.5,-1.5,0],[2.5,-2,1],[1.5,2.6,2],[-3.2,2.2,3],[6,6,4],[-8,6,2],[3,-8,1]].forEach((p,i)=>dorfmensch(X(p[0]),Z(p[1]),i*1.2,i,i<2||i===4?1.3:i===6?1.0:1.25));
  for(let i=0;i<18;i++){const a=i/18*6.28;farn(bx+Math.cos(a)*17,bz+Math.sin(a)*17,1.2)}for(let i=0;i<6;i++)palme(bx+Math.cos(i*1.05)*16.4,bz+Math.sin(i*1.05)*16.4,1.2)}
function ort33(){const b=zone('Kakaoplantage'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.4);scheibe(bx,bz,14,0x7a6a40,.09);
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){const x=X(-9+i*4.4),z=Z(-10+j*3.4);if(Math.hypot(x-bx,z-bz)>14)continue;inst('cyl',x,1.4,z,.18,2.8,.18,0x6a4a2e);inst('sph',x,3.3,z,1.8,1.1,1.8,tp());inst('blm',x+.8,3.0,z+.4,1.2,.8,1.2,dk(tp(),.9));for(let k=0;k<4;k++)inst('sph',x+Math.cos(k*1.6)*.28,1.1+k*.45,z+Math.sin(k*1.6)*.28,.17,.3,.17,[0xe8a020,0xe0602a,0xf2c230,0xb83a2a][(i+j+k)%4]);kreis(x,z,.35)}
  stall(X(6),Z(3),6,3.6,2.8,0xa8743f,0x4a8a3a,R?Math.PI:0);
  [[-6,3],[-1.5,5.5]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]),g=grp(x,0,z);g.rotation.y=R;box(3.4,.12,1.6,0x8a5a32,0,.9,0,g,true);[-1.5,1.5].forEach(s=>[-.6,.6].forEach(q=>cyl(.06,.9,0x6a4220,s,.45,q,g)));for(let k=0;k<7;k++)box(.4,.08,1.3,[0x6a4220,0x8a5a32,0x5a3a22][k%3],-1.4+k*.46,1,0,g);sperrKasten(x,z,3.4,1.6,R)});
  for(let i=0;i<5;i++)sack(X(10+(i%3)*.8),Z(8+Math.floor(i/3)*.9),0xd8c090,1);schubkarre(X(1),Z(-1),R+.4,0xe8a020);korb(X(-3),Z(-2),0xe8a020);korb(X(2.2),Z(-5),0xe0602a);
  dorfmensch(X(-2),Z(3),R+2.5,1,1.3);dorfmensch(X(3),Z(-2),R-1,3,1.25);forscher(X(8),Z(6),R+3.3,2,1.3);for(let i=0;i<14;i++){const a=i/14*6.28;farn(bx+Math.cos(a)*13.4,bz+Math.sin(a)*13.4,1.2)}}
function ort34(){const b=zone('Bananen und Kautschuk'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x7a8a48,.09);
  const banane=(x,z,s)=>{inst('cyl',x,1.5*s,z,.26*s,3*s,.26*s,0x7ab048);for(let i=0;i<6;i++){const a=i*1.05+x;inst('blm',x+Math.cos(a)*.9*s,3.1*s,z-Math.sin(a)*.9*s,1.5*s,.07*s,.5*s,i%2?0x3a9a3a:0x2f8a34,a)}for(let i=0;i<5;i++)inst('sph',x+.3*s,2.4*s-i*.0,z+.1*s+(i-2)*.12*s,.1*s,.55*s,.1*s,0x8ac040);inst('sph',x+.3*s,1.8*s,z,.2*s,.3*s,.2*s,0x7a2a5a);kreis(x,z,.45*s)};
  [[-8,-5],[-5,-8],[-2,-5],[2,-8],[5,-5],[8,-8],[-7,-1],[-3,-1.5],[4,-1],[8,-3.5]].forEach((p,i)=>banane(X(p[0]),Z(p[1]),1.1+(i%3)*.1));
  /* Kautschukbäume mit Zapfrinne */
  [[-6,4.5],[0,5],[6,3.5]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]);inst('cyl',x,3.5,z,.38,7,.38,0x9a8a7a);inst('sph',x,7.4,z,2.6,1.4,2.6,0x3a8a3a);inst('blm',x+1.4,6.8,z+.6,1.6,1,1.6,0x4a9a40);kreis(x,z,.5);const g=grp(x,0,z);g.rotation.y=R;box(.9,.08,.12,0x4a3a2a,.2,1.4,.34,g).rotation.z=.5;box(.9,.08,.12,0x4a3a2a,-.2,1.4,.34,g).rotation.z=-.5;cyl(.18,.28,0x2a2a2e,0,.95,.42,g);cyl(.15,.05,0xf6f2e0,0,1.1,.42,g)});
  /* Trockengestell mit Kautschukplatten */
  (function(){const x=X(9),z=Z(3),g=grp(x,0,z);g.rotation.y=R;[-2,2].forEach(s=>cyl(.08,2.6,0x6a4220,s,1.3,0,g,true));box(4.4,.1,.1,0x6a4220,0,2.5,0,g);for(let i=0;i<6;i++)box(.5,1.5,.05,i%2?0xe8d8b0:0xc8a870,-1.8+i*.72,1.75,0,g);sperrKasten(x,z,4.4,.6,R)})();
  eimer(X(-2),Z(2),0x3a3a3e,0xf6f2e0);eimer(X(-1),Z(2.6),0x3a3a3e,0xf6f2e0);dorfmensch(X(-4),Z(3),R+.3,1,1.3);dorfmensch(X(3),Z(2),R+3.3,4,1.25);forscher(X(1),Z(7),R+3.2,3,1.3);korb(X(7),Z(6),0x8ac040);sack(X(-8),Z(5),0xd8c090,1);
  for(let i=0;i<12;i++){const a=i/12*6.28;farn(bx+Math.cos(a)*11,bz+Math.sin(a)*11,1.1)}}
function ort35(){const b=zone('Baumschule'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,13,0x8a7a4a,.09);
  /* Anzuchtbeete: Reihen kleiner Setzlinge */
  [[-8,-6],[-2.5,-6],[3,-6],[8.5,-6]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]),g=grp(x,0,z);box(4.4,.4,2.2,0x6a4a2e,0,.2,0,g,true);box(4,.14,1.8,0x4a3220,0,.4,0,g);sperrKasten(x,z,4.4,2.2,0);for(let j=0;j<12;j++){const hh=.25+i*.18;inst('cyl',x-1.7+(j%6)*.68,.4+hh/2,z-.5+Math.floor(j/6)*1,.03,hh,.03,0x5a8a3a);inst('blm',x-1.7+(j%6)*.68,.4+hh,z-.5+Math.floor(j/6)*1,.14+i*.04,.08,.14+i*.04,0x4aa040,j)}});
  /* Schattennetz auf Pfosten */
  (function(){const x=X(0),z=Z(1.5),g=grp(x,0,z);g.rotation.y=R;[[-5,-2.2],[5,-2.2],[-5,2.2],[5,2.2],[0,-2.2],[0,2.2]].forEach(p=>cyl(.08,2.8,0x6a4220,p[0],1.4,p[1],g,true));box(10.6,.06,4.8,0x2a5a2a,0,2.85,0,g);for(let i=0;i<4;i++)box(2.4,.4,.9,0x6a4a2e,-3.75+i*2.5,.2,0,g);for(let i=0;i<40;i++)cyl(.1,.2,0x1a1a1e,-4.3+(i%20)*.45,.1,(i<20?-.7:.7),g);for(let i=0;i<20;i++)inst('con',x+(-4.3+(i%20)*.45)*Math.cos(R),.35,z+(i<20?-.7:.7),.06,.5,.06,0x4aa040);sperrKasten(x,z,10.6,4.8,R)})();
  /* Wachstumsreihe: drei Bäumchen, drei Größen */
  [[-4,6.2,.35],[0,6.2,.8],[4,6.2,1.5]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]),s=p[2];inst('cyl',x,1.3*s,z,.1*s,2.6*s,.1*s,0x6a4a2e);inst('sph',x,3.3*s,z,1.3*s,1.1*s,1.3*s,[0x5ab048,0x3a9a3a,0x2f8a34][i]);kreis(x,z,.3+s*.2);cyl(.05,.9,0x6a4220,x+.5,.45,z,scene)});
  kanne(X(-9),Z(5));kanne(X(-8),Z(5.8));schubkarre(X(8),Z(4),R+.5,0x3a8a3a);for(let i=0;i<5;i++)cyl(.22,.35,0x1a1a1e,X(9)+(i%3)*.5,.18,Z(6)+Math.floor(i/3)*.5,scene);
  forscher(X(-5),Z(2),R+2.5,0,1.3);dorfmensch(X(4),Z(2),R-2,4,1.25);forscher(X(6),Z(7.5),R+3.3,3,1.3);for(let i=0;i<14;i++){const a=i/14*6.28;farn(bx+Math.cos(a)*12.2,bz+Math.sin(a)*12.2,1.1)}}
function ort36(){const b=zone('Wildkamera-Station'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x6a7a48,.09);
  const kam=(x,y,z,rot)=>{const g=grp(x,y,z);g.rotation.y=rot||0;box(.5,.7,.3,0x4a5a3a,0,0,0,g);cyl(.12,.1,0x1a1a1e,0,.12,.2,g).rotation.x=Math.PI/2;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xff3030}));l.position.set(.16,.25,.17);l.scale.setScalar(.05);g.add(l);box(.6,.05,.08,0x6a5a3a,0,.1,.0,g);bewegt(l,t=>{l.visible=Math.sin(t*3+x)>.6});return g};
  [[-7,-5],[0,-8],[7,-5]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]);cyl(.5,6,0x6a4e34,x,3,z,scene,true);sph(3,tp(),x,7,z,scene,1,.6,1);kreis(x,z,.7);kam(x,1.8,z+.45*(R?-1:1),R?3.14:0);liane(x+1.3,6.6,z,3.5)});
  /* Fotos der Kameras auf Tafeln */
  [[-6,1],[0,2.6],[6,1]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]),g=grp(x,0,z);g.rotation.y=R;cyl(.08,2.2,0x6a4220,-.8,1.1,0,g,true);cyl(.08,2.2,0x6a4220,.8,1.1,0,g,true);box(2.2,1.5,.12,0x5a3a22,0,2,0,g,true);box(1.9,1.2,.05,[0x2f6a30,0x3a5a3a,0x4a7a40][i],0,2,.08,g);if(i===0){sph(.4,0xe0a030,-.1,1.95,.12,g,1.5,.8,.2);sph(.2,0xe0a030,.45,2.1,.12,g,1,.9,.2)}if(i===1){sph(.38,0x3a3a3e,-.1,1.9,.12,g,1.6,.9,.2);sph(.2,0xe8e8e4,-.1,1.95,.13,g,.9,.8,.2)}if(i===2){sph(.34,0xa88a60,0,1.85,.12,g,1.6,.8,.2);sph(.22,0x7a5a3a,.5,1.95,.12,g,1,.9,.2)}sperrKasten(x,z,2.2,.4,R)});
  (function(){const x=X(9),z=Z(5),g=grp(x,0,z);g.rotation.y=R;cyl(.08,3.4,0x6a6a70,0,1.7,0,g,true);const p=box(2,.1,1.2,0x2a4a8a,0,3.6,0,g,true);p.rotation.x=-.5;box(.8,.5,.5,0x3a4a3a,0,.5,.4,g);kreis(x,z,.8)})();
  (function(){const x=X(-3),z=Z(6),g=grp(x,0,z);g.rotation.y=R;box(2.8,.12,1.3,0x8a5a32,0,.9,0,g,true);[-1.2,1.2].forEach(s=>cyl(.07,.9,0x6a4220,s,.45,0,g));box(.7,.04,.5,0x2a2a2e,-.6,1,0,g);box(.5,.3,.5,0x3a4a3a,.6,1.1,0,g);sperrKasten(x,z,2.8,1.3,R)})();
  for(let i=0;i<14;i++)sph(.2,0x3a2a1a,X(-8+i*.9),.03,Z(-1.5+Math.sin(i*.8)*.6),scene,1.3,.12,.9);
  streif(wasserschwein,pendel(spl([[X(-9),Z(-1.5)],[X(0),Z(0)],[X(9),Z(-1)]],1.5),.3),.6,0,1.6);
  forscher(X(-2.4),Z(5),R+3.3,2,1.3);forscher(X(3),Z(6.4),R-3,1,1.25);for(let i=0;i<12;i++){const a=i/12*6.28;farn(bx+Math.cos(a)*11.4,bz+Math.sin(a)*11.4,1.1)}}
function pilz(x,z,h,r,k){const C=[0xe0302a,0xf59e3f,0xf2d030,0xe8e4d4,0xb86a3a,0xb06ae0][k%6];inst('cyl',x,h/2,z,r*.28,h,r*.28,0xf0e6c8);inst('sphT',x,h,z,r,r*.55,r,C);if(k%6===0||k%6===4)for(let i=0;i<5;i++)inst('sph',x+Math.cos(i*1.3)*r*.62,h+r*.38+(i%2)*.04,z+Math.sin(i*1.3)*r*.62,r*.12,r*.05,r*.12,0xffffff);kreis(x,z,r>1?r*.5:.3)}
function ort37(){const b=zone('Pilzlichtung'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x5a7a40,.09);
  for(let i=0;i<14;i++){const a=i/14*6.28,r=6.5;pilz(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.9,.6+(i%3)*.25,.5+(i%2)*.15,i)}
  [[-1,-3,3.2,2.2],[4,-1,2.4,1.7],[-5,-1,2.8,1.9],[2,3,1.8,1.4],[-3,4,2.2,1.5],[7,4,2.6,1.7],[-8,3,2,1.4],[0,-8,3.6,2.4],[8,-6,2.4,1.6],[-8,-7,2.8,1.8]].forEach((p,i)=>pilz(X(p[0]),Z(p[1]),p[2],p[3],i+2));
  for(let i=0;i<30;i++){const a=nr()*6.28,r=2+nr()*9;const x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;pilz(x,z,.25+nr()*.3,.2+nr()*.18,i)}
  (function(){const x=X(-9.5),z=Z(7),g=grp(x,0,z);cyl(.7,5,0x6a4e34,0,.7,0,g,true).rotation.z=Math.PI/2;for(let i=0;i<4;i++)box(.9,.12,.5,0xe8e0c8,-1.2+i*.9,1.1+i*.12,.6,g);kreis(x-1.8,z,.8);kreis(x+1.8,z,.8)})();
  for(let i=0;i<6;i++){const k=kaefer(scene,i);const a=i*1.05;k.position.set(bx+Math.cos(a)*5.5,.6,bz+Math.sin(a)*5);k.scale.setScalar(.8);k.rotation.y=a;lebendig.push({o:k,ph:i})}
  forscher(X(2),Z(8),R+3.2,1,1.3);dorfmensch(X(-4),Z(8.4),R+3,2,1.2);for(let i=0;i<16;i++){const a=i/16*6.28;farn(bx+Math.cos(a)*11,bz+Math.sin(a)*11,1.1)}for(let i=0;i<8;i++)moos(bx+Math.cos(i)*5,bz+Math.sin(i)*6,1.6)}
function ort38(){const b=zone('Regenbogenlichtung'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.6);scheibe(bx,bz,16,0x7aaa50,.09);
  /* kleiner Regenbogen dauerhaft */
  (function(){const g=grp(bx,0,bz-b.dir*10);g.rotation.y=R;[0xe0302a,0xf59e3f,0xf2d030,0x4caf6a,0x3b8fc4,0x4a4aa8,0x9b4ab0].forEach((c,i)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(8-i*.42,.2,5,24,Math.PI),mat(c));t.position.y=.1;g.add(t)});[-1,1].forEach(s=>{sph(1,0xffffff,s*7.2,.5,0,g,1.4,.7,1);sph(1.4,0xffffff,s*8.2,.4,.2,g,1.2,.6,1)});vm(g)})();
  /* Lianenschaukel am Riesenbaum */
  (function(){const tx=X(-8),tz=Z(-2);grossBaum(tx,tz,15,.9,.3);ast2(tx+3,9,tz,6,0,.2);const sw=grp(tx+5.2,9,tz);cyl(.06,5.6,0x3a7a30,0,-2.8,0,sw);box(.8,.12,.4,0x8a5a32,0,-5.6,0,sw);sph(.2,0xf47ab0,.35,-5.5,0,sw);vm(sw);const m=kindL({jacke:0xe0605a,hose:0x3a4a6a,haut:0xe8b98f,haar:0x2a1d14,stil:'zoepfe',rucksack:null},sw);m.g.position.set(0,-5.4,0);m.g.scale.setScalar(.9);vm(m.g);bewegt(sw,t=>{sw.rotation.x=Math.sin(t*1.3)*.55})})();
  /* Klettergerüst mit Netz und Rutsche */
  (function(){const x=X(7),z=Z(-5),g=grp(x,0,z);g.rotation.y=R;[-2,2].forEach(s=>[-1.6,1.6].forEach(q=>cyl(.12,3.4,0x6a4220,s,1.7,q,g,true)));box(4.6,.2,3.6,0x8a5a32,0,3.3,0,g);for(let i=0;i<7;i++){box(.05,3.3,.05,0xe8d8a0,-1.8+i*.6,1.65,1.75,g);if(i<6)box(4.2,.05,.05,0xe8d8a0,0,.5+i*.55,1.75,g)}[-1,1].forEach(s=>box(.1,.1,3.7,0x6a4220,s*2.3,3.9,0,g));sperrKasten(x,z,4.8,3.8,R);rutsche(X(11.5),Z(-5),R+1.57,0xe0302a);kreis(X(11.5),Z(-5),2)})();
  /* Wippe */
  (function(){const x=X(-3),z=Z(5),g=grp(x,0,z);g.rotation.y=R;box(.4,.5,.4,0x6a4220,0,.25,0,g,true);const p=grp(0,.6,0,g);box(4,.14,.5,0xf59e3f,0,0,0,p);box(.4,.1,.3,0x3a3a3e,-1.6,.15,0,p);box(.4,.1,.3,0x3a3a3e,1.6,.15,0,p);vm(p);bewegt(p,t=>{p.rotation.z=Math.sin(t*1.2)*.3});kreis(x,z,.8);[-1.8,1.8].forEach(s=>kreis(x+Math.cos(R)*s,z-Math.sin(R)*s,.45))})();
  schaukel(X(2),Z(5.5),R);sandbox(X(-8),Z(5.5),R);
  [[-1,-1,0],[4,0,1],[-5,-5,2],[2,-7,3],[9,2,4],[-9,2,1],[5,4,0]].forEach((p,i)=>dorfmensch(X(p[0]),Z(p[1]),i*1.3,i,i%2?1.0:1.2));forscher(X(0),Z(8),R+3.2,1,1.3);
  [0xe0302a,0xf2c230,0x3b8fc4,0x4caf6a].forEach((c,i)=>sph(.36,c,X(-1+i*1.1),.36,Z(1.4+(i%2)*.8),scene));tisch(X(10),Z(6),0);bankW(X(8),Z(8),R);bankW(X(12),Z(7),R);
  for(let i=0;i<24;i++){const a=i/24*6.28;const x=bx+Math.cos(a)*15.2,z=bz+Math.sin(a)*15.2;if(i%2)farn(x,z,1.2);else blumeI(x,z,i%6)}for(let i=0;i<30;i++){const a=nr()*6.28,r=3+nr()*11;if(i%3===0)blumeI(bx+Math.cos(a)*r,bz+Math.sin(a)*r,i%6)}}
function sandbox(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;[[0,-1.3,3.2,.2],[0,1.3,3.2,.2],[-1.6,0,.2,2.8],[1.6,0,.2,2.8]].forEach(p=>box(p[2],.4,p[3]||.2,0x8a5a32,p[0],.2,p[1],g));box(3,.2,2.4,0xe8d090,0,.15,0,g);sph(.4,0xe8c870,.5,.4,.2,g,1.2,.7,1);sperrKasten(x,z,3.4,3,rot||0)}
function etappe3b(){ort28();ort29();ort30();ort31();ort32();ort33();ort34();ort35();ort36();ort37();ort38()}

/* ==================== Etappe 6: Landschaft, dichter Urwald, Kleinteile ==================== */
function etappe4(){
  WEGE.forEach(s=>s.forEach((q,i)=>{if(i%2===0)sgMark(q[0],q[1],4.8)}));EXTRAZONEN.forEach(e=>{if(e.name!=='Fluss')sgMark(e.x,e.z,e.r+2.5)});WS.forEach(w=>sgMark(w[0],w[1],w[2]+4));RIO.forEach((q,i)=>{if(i%2===0)sgMark(q[0],q[1],RW/2+3.2)});
  sgMark(0,120,22);sgMark(0,90,14);sgMark(-20,126,12);sgMark(FEST.x,FEST.z,26);for(let z=TORZ-30;z<TORZ+12;z+=2)sgMark(0,z,6);sgMark(0,-190,8);
  /* Randwald: dicht, mit Riesenbäumen */
  for(let z=-232;z<144;z+=3.6)[[-178,-152],[152,178]].forEach(rg=>{for(let k=0;k<2;k++){const x=rg[0]+nr()*(rg[1]-rg[0]),zz=z+nr()*3.4;if(!frei(x,zz)||!thFrei(x,zz,3.6))continue;const q=nr();if(q<.3){urw(x,zz,1.2,2);thSet(x,zz)}else if(q<.5){urw(x,zz,1,1);thSet(x,zz)}else if(q<.75){urw(x,zz,.9+nr()*.4,0);thSet(x,zz)}else if(q<.88)palme(x,zz,1.1);else bambus(x,zz,1)}});
  for(let z=146;z>-236;z-=18)[-1,1].forEach(s=>{const x=s*(142+nr()*10);if(frei(x,z)&&thFrei(x,z,5)){urw(x,z,1.3,2);thSet(x,z)}});
  /* Waldgürtel im Inneren (zwischen den Orten) */
  zuf((x,z)=>{if(thFrei(x,z,4.4)){urw(x,z,.9+nr()*.4,nr()<.2?1:0);thSet(x,z)}},210);
  zuf((x,z)=>{if(thFrei(x,z,9)){urw(x,z,1.15+nr()*.2,2);thSet(x,z)}},38,(x,z)=>Math.abs(x)>16);
  zuf((x,z)=>{if(thFrei(x,z,2.4))palme(x,z,.9+nr()*.4)},105);
  zuf((x,z)=>{if(thFrei(x,z,3))bambus(x,z,.9+nr()*.3)},46,(x,z)=>x>-120);
  zuf((x,z)=>busch(x,z,.9+nr()*.6,tp()),170);zuf((x,z)=>hibiskus(x,z,.8+nr()*.4),34);
  /* Unterwuchs: Farne, große Blätter, Heliconien, Orchideen, Bromelien */
  zuf((x,z)=>farn(x,z,.8+nr()*.6),1900);zuf((x,z)=>blatt(x,z,.9+nr()*.7),600);zuf((x,z)=>helico(x,z),230);zuf((x,z)=>orch(x,z),160);
  zuf((x,z)=>{const q=nr();if(q<.5)brom(x,.2,z,1,Math.floor(nr()*3));else stumpf(x,z,.8+nr()*.5)},60);
  zuf((x,z)=>bodenfl(x,z,1),230);zuf((x,z)=>moos(x,z,1+nr()),90);
  zuf((x,z)=>{if(thFrei(x,z,2.6)&&!EXTRAZONEN.some(e=>e.name!=='Fluss'&&Math.hypot(x-e.x,z-e.z)<e.r+2)){fels(x,z,.9+nr()*1.2);thSet(x,z)}},30);
  zuf((x,z)=>{stamm(x,z,3+nr()*3,nr()*3,.4+nr()*.2)},16,(x,z)=>thFrei(x,z,3));
  /* Ufer des Rio: Schilf, Farne, Riesenblätter, Palmen */
  RIO.forEach((q,i)=>{if(i%3)return;[-1,1].forEach(s=>{const a=RIO[Math.max(0,i-1)],c=RIO[Math.min(RIO.length-1,i+1)],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1,nx=-tz/l*s,nz=tx/l*s;const x=q[0]+nx*(RW/2+1.8+nr()*1.6),z=q[1]+nz*(RW/2+1.8+nr()*1.6);if(Math.abs(x)>176||!sgFrei(x,z)&&false)return;const k=i%5;if(k===0)schilf(x,z);else if(k===1)farn(x,z,1);else if(k===2)blatt(x,z,1.2);else if(k===3&&thFrei(x,z,3)){palme(x,z,1.1);thSet(x,z)}else schilf(x+.4,z+.3)})});
  /* Wegränder */
  WEGE.forEach((s,wi)=>{for(let i=2;i<s.length-2;i+=8){const a=s[i-1],c=s[i+1],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1,sd=((i/5+wi)%2)?1:-1,x=s[i][0]-tz/l*sd*4.1,z=s[i][1]+tx/l*sd*4.1;if(Math.abs(x)>176||z<-233||z>145)continue;if(imW(x,z))continue;if((i/8)%3<2)helico(x,z);else blatt(x,z,.8)}});
  /* Kleinteile an Wegen */
  (function(){const nahe=(x,z)=>EXTRAZONEN.some(e=>e.name!=='Fluss'&&Math.hypot(x-e.x,z-e.z)<e.r+4)||imW(x,z);
    SEITENWEGE.forEach((r,ri)=>{for(let x=-130;x<=142;x+=17){if(Math.abs(x-wegX(r))<12)continue;const z=roadZ(x,r),side=((Math.round(x/17)+ri)%2)?1:-1,zz=z+side*4.8;if(nahe(x,zz))continue;const f=Math.round(x/17+ri*3)%8;
      if(f===0)bankW(x,zz,side>0?0:Math.PI);else if(f===1)laterne(x,zz);else if(f===2)haengematte(x,zz,0,[0xe8785a,0x4a8aa8,0xf2c230][ri%3]);else if(f===3)kanne(x,zz);else if(f===4)tonne(x,zz);else if(f===5){tisch(x,zz,0);bankW(x,zz+1.6,Math.PI);bankW(x,zz-1.6,0)}else if(f===6){kiste(x,zz,0xf59e3f);kiste(x+1.2,zz+.4,0x8ac040)}else{korb(x,zz,0xf2c230);sack(x+1,zz,0xd8c090)}}});
    for(let z=GRENZE.z1-34;z>TORZ+6;z-=14){if(SEITENWEGE.some(r=>Math.abs(z-r)<12)||Math.abs(z-114)<16||Math.abs(z-rioZ(wegX(z)))<14)continue;const x=wegX(z),side=(Math.round(z/14)%2)?1:-1,xx=x+side*4.6,f=Math.round(z/14)%5;if(nahe(xx,z)||!sgFrei(xx,z)&&false)continue;if(f===0)bankW(xx,z,side>0?-Math.PI/2:Math.PI/2);else if(f===1)laterne(xx,z);else if(f===2)holzstapel(xx+side*1.6,z,1.57);else if(f===3){kiste(xx,z,0xf59e3f)}else{fahrrad(xx,z,1.57,0xe0302a)}}})();
  /* Ruheplätze und Lagerstellen im Wald */
  [[-150,60],[150,40],[-150,-40],[150,-60],[-20,-60],[30,-60],[-100,-60],[0,92],[60,0],[-20,40]].forEach((p,i)=>{if(!frei(p[0],p[1]))return;haengematte(p[0],p[1],i*.7,[0xe8785a,0x4a8aa8,0xf2c230,0x6aa86a][i%4]);bankW(p[0]+3,p[1]+2,.4)});
  /* Lichtstrahlen und Dunst */
  dunst();
}
function strahlen(){const P=[[-110,22],[-44,-30],[44,-134],[-60,-172],[40,106],[100,104],[-84,-134],[76,-172],[-34,106],[126,-30],[0,40],[-20,-60],[140,64],[-120,-140],[-130,70]];
  const g=new THREE.CylinderGeometry(.6,2.6,26,7,1,true),mt=new THREE.MeshBasicMaterial({color:0xfff4c0,transparent:true,opacity:.13,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});const im=new THREE.InstancedMesh(g,mt,P.length);im.frustumCulled=false;scene.add(im);
  const M=new THREE.Matrix4(),Q=new THREE.Quaternion().setFromEuler(new THREE.Euler(0,0,-.3)),Pv=new THREE.Vector3(),S=new THREE.Vector3();P.forEach((p,i)=>{Pv.set(p[0]+3.8,12.6,p[1]);S.set(1+(i%3)*.25,1,1+(i%3)*.25);M.compose(Pv,Q,S);im.setMatrixAt(i,M)});im.instanceMatrix.needsUpdate=true;
  lebendig.push({o:{userData:{anim:t=>{mt.opacity=.12+.05*Math.sin(t*.4)}}},ph:0})}
function dunst(){const N=44,im=new THREE.InstancedMesh(gSphL,new THREE.MeshBasicMaterial({color:0xeaf5ee,transparent:true,opacity:.2,depthWrite:false}),N);im.frustumCulled=false;scene.add(im);
  const P=[];for(let i=0;i<N;i++){if(i<24){const k=Math.floor(i/24*(RIO.length-1));P.push([RIO[k][0]+(i%2?3:-3),RIO[k][1]+(i%3-1)*3,5+(i%3)*2])}else P.push([-160+nr()*320,-220+nr()*340,6+nr()*4])}
  const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),Pv=new THREE.Vector3(),S=new THREE.Vector3();lebendig.push({o:{userData:{anim:t=>{for(let i=0;i<N;i++){const p=P[i];Pv.set(p[0]+Math.sin(t*.07+i)*6,.9+Math.sin(t*.2+i)*.3,p[1]+Math.cos(t*.05+i*2)*3);S.set(p[2],.9,p[2]*.7);M.compose(Pv,Q,S);im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}}},ph:0})}

/* ==================== Etappe 7: Bewegung, Besucher, Finale ==================== */
function etappe5(){
  /* ---- Wolken (klein) ---- */
  for(let i=0;i<6;i++){const g=grp(0,50+nr()*14,0);for(let k=0;k<2;k++)sph(1,0xffffff,(k-.5)*4+nr()*2,nr()*1.5,(nr()-.5)*4,g,5+nr()*2,2+nr(),3+nr()*2);const x0=nr()*700,z=-230+nr()*400,v=1.2+nr()*1.4;bewegt(g,t=>{g.position.x=((x0+t*v)%700+700)%700-350;g.position.z=z})}
  /* ---- Vögel am Himmel: Aras und Tukane ---- */
  [[-100,90,30,13,0,.3,0xd8281e,0x2a6ac0],[60,100,34,14,2,.28,0x2a6ac0,0xf2c820],[-120,-20,28,12,4,.33,0xd8281e,0xf2c820],[110,-20,26,15,1,.35,0x1a1a1e,0xf2a020],[0,20,40,16,3,.25,0xd8281e,0x2a6ac0],[-60,-110,24,11,5,.32,0x2a6ac0,0xf2c820],[100,60,22,13,2,.3,0x1a1a1e,0xf2a020],[-130,60,26,14,4.4,.34,0x3a9a3a,0xf2c820],[30,-80,32,15,1.6,.27,0xd8281e,0x2a6ac0],[0,-150,30,17,3.7,.26,0x2a6ac0,0xf2c820],[-80,-170,26,13,2.2,.3,0x1a1a1e,0xf2a020],[90,-150,24,14,.7,.31,0xd8281e,0xf2c820]].forEach(f=>flieger(f[0],f[1],f[2],f[3],f[4],f[5],f[6],f[7]));
  /* ---- Falter und Libellen ---- */
  [[-100,60],[-70,-20],[-20,30],[40,40],[60,-10],[-10,-60],[30,-70],[-40,-100],[80,-120],[-110,-110],[-60,70],[100,80],[-130,20],[140,0],[10,90],[-30,-160],[100,-165],[130,-75]].forEach((f,i)=>faltervolk(f[0],f[1],7,10,[[0x2a6adf,0xffffff],[0xf08a2a,0xffd45e],[0xf47ab0,0xb06ae0],[0xf2d030,0x3a8a3a]][i%4].concat([0x2a6adf,0xf08a2a][i%2]),1.6+(i%3)*.4));
  [[-30,-85,0x2a5ac8],[60,-84,0xc0302a],[-120,-88,0x1a9a6a],[-116,68,0x2a5ac8],[-136,-134,0x1a9a6a],[106,-85,0x2a5ac8]].forEach((l,i)=>libelle(l[0],l[1],5,1.1+(i%3)*.4,i*2,l[2]));
  /* ---- Wege für Spaziergänger ---- */
  const sp=(pts,f)=>spl(pts,2.5).filter(f),hw=z0=>sp(Array.from({length:30},(_,i)=>[wegX(112-i*10),112-i*10]),q=>q[1]<=z0[0]&&q[1]>=z0[1]),rd=(r,x0,x1)=>sp(strasse(r),q=>q[0]>=x0&&q[0]<=x1);
  const JK=[0xc8b27a,0xe0d8b8,0x8aa070,0xd8c898,0xe8785a,0x4a8aa8,0xf2c230,0xb06ae0,0x6aa86a],HR=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a],ST=['kurz','zoepfe','cap','pferd'],RU=[0x6a5a3a,0x8a3a2a,0x3a5a7a,null,0xe0a030,null];
  const routen=[[hw([108,70]),1.2],[hw([60,6]),1.2],[hw([6,-60]),1.2],[hw([-100,-128]),1.2],[hw([-130,-176]),1.2],[rd(94,-140,-14),1.3],[rd(94,14,140),1.3],[rd(44,-140,-14),1.3],[rd(44,14,140),1.3],[rd(-8,-140,-14),1.3],[rd(-8,14,140),1.3],[rd(-58,-140,-14),1.3],[rd(-58,14,140),1.3],[rd(-110,-140,-14),1.3],[rd(-110,14,140),1.3],[rd(-160,-140,-14),1.3],[rd(-160,14,140),1.3]];
  let k=0;routen.forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);const anz=i<5?2:(i%3?1:2);for(let j=0;j<anz;j++){const av={jacke:JK[(k*3+j)%9],haar:HR[(k+j*2)%6],stil:ST[(k+j)%4],rucksack:RU[(k+j)%6]};wanderer(B,2+((k+j)%3)*.4,j*2.1+i,av,[HUTK,0x8a7a4a,0xe8e0c0,null][(k+j)%4]);k++}});
  [[hw([108,-70]),1.3],[hw([-100,-168]),1.3],[rd(-58,-140,140),1.2],[rd(-110,-140,140),1.2]].forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);for(let j=0;j<(i<2?2:1);j++)wanderer(B,1.6+j*.5,j*3+i,{jacke:JK[(i*2+j+3)%9],haar:HR[(i+j)%6],stil:ST[(i+j)%4],rucksack:RU[(i+j+2)%6]},HUTK)});
  /* ---- Kanus auf dem Rio: Paddler */
  [[-130,-15,1.8,0xd8602a,0],[-60,40,2.2,0x2a8ad8,1],[10,90,1.6,0xe0c030,2],[-100,-30,2.4,0xe03a3a,3]].forEach(c=>{const B=pendel(RIO.filter(q=>q[0]>=c[0]&&q[0]<=c[1]+(c[1]-c[0])*0),1.8);if(B.L<20)return;const kn=kanu(scene,c[3]);const m=kindL({jacke:JK[c[4]*2],hose:0x3a4a5a,haut:0xe8b98f,haar:HR[c[4]],stil:'kurz',rucksack:null},kn);m.g.position.set(.2,.35,0);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(.9);vm(kn);kn.scale.setScalar(1.25);fahren(kn,B,c[2],c[4]*8)});
  /* ---- Tiere, die frei laufen ---- */
  streif(wasserschwein,pendel(spl([[-150,20],[-140,40],[-146,60]],1.5),.5),.4,0,1.6);streif(tapir,pendel(spl([[148,-60],[150,-45],[146,-20]],1.5),.5),.4,0,1.7);streif(kapuziner,pendel(rd(-8,-140,-40),.6),1.2,0,1.5);streif(ameisenbaer,pendel(rd(44,40,120),.6),.6,0,1.7);
  /* ---- Tropischer Regen nur im Finale ---- */
  (function(){const N=1500,pos=new Float32Array(N*3),off=new Float32Array(N);for(let i=0;i<N;i++){pos[i*3]=FEST.x+(nr()-.5)*70;pos[i*3+2]=FEST.z-8+(nr()-.5)*60;off[i]=nr()*30}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const m=new THREE.PointsMaterial({color:0xc8e4f4,size:.28,transparent:true,opacity:0,depthWrite:false});const p=new THREE.Points(g,m);p.frustumCulled=false;p.visible=false;scene.add(p);p.userData.keep=1;
    lebendig.push({o:{userData:{anim:t=>{const f=(typeof finale!=='undefined'&&finale)?finale.t:0,a=f>0&&f<14?Math.min(1,f/2)*Math.min(1,(14-f)/3):0;p.visible=a>0;if(!p.visible)return;m.opacity=.75*a;for(let i=0;i<N;i++)pos[i*3+1]=30-((t*26+off[i])%30);g.attributes.position.needsUpdate=true}}},ph:0})})();
}
function paradeBauen(){
  const wp=(jk,hs,hr,hat,st)=>p=>{const w=grp(0,0,0,p);const m=kindL({jacke:jk,hose:hs,haut:0xe8b98f,haar:hr,stil:st||'kurz',rucksack:null},w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.4);if(hat)hutAuf(m,hat);[m.bl,m.br,m.al,m.ar].forEach(q=>{vmVerschm(q);q.userData.frei=1});vmVerschm(m.g);w.userData.anim=t=>{const q=Math.sin(t*6)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q;m.al.rotation.x=-q*.7;m.ar.rotation.x=q*.7};return w};
  const liste=[[fiete,2.6],[tukan,2.2],[wp(0xc8b27a,0x6a5a3a,0x6b4626,HUTK,'zoepfe'),1],[jaguar,1.9],[ara,2.2],[wp(0xe0d8b8,0x4a5a3a,0x2a1d14,0x8a7a4a),1],[tapir,1.9],[kapuziner,2.2],[wp(0x8aa070,0x6a5a3a,0xb5651d,HUTK,'cap'),1],[wasserschwein,2],[ameisenbaer,1.8],[wp(0xe8785a,0x3a4a5a,0xe8c24a,null,'zoepfe'),1],[faultier,2.2],[ara2,2.2],[kaiman,1.4],[wp(0x4a8aa8,0x6a5a3a,0x2a1d14,HUTK),1]];
  liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
/*@@F@@*/
function weltBauen(){
/* Leistung: gröbere Grundformen (Kugel 8x5, Zylinder 8, Kegel 7) für alle Teile dieser Welt */
gSph.copy(new THREE.SphereGeometry(1,8,5));gCyl.copy(new THREE.CylinderGeometry(1,1,1,8));gCone.copy(new THREE.ConeGeometry(1,1,7));
/* Himmel und Luft: warmer, feuchter Dunst */
NEBEL_TAG.set(0xcde4d2);BOT_TAG.set(0xcfe6d8);TOP_TAG.set(0x74b4d8);skyMat.uniforms.top.value.copy(TOP_TAG);skyMat.uniforms.bottom.value.copy(BOT_TAG);scene.fog.color.copy(NEBEL_TAG);scene.fog.near=75;scene.fog.far=235;hemi.color.set(0xdcf0d4);hemi.intensity=.62;dir.color.set(0xfff0c8);
FARBEN={boden:0x3f7d33,pfad:0xb08258,platz:0xd0b084,gehege:0x6a9a48};
etappe1();
kulisse();
etappe2();
etappe3();
etappe3a();
etappe3b();
etappe4();
etappe5();
/*@@ENDE@@*/
instFlush();
}
