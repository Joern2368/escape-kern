/* Welt: Berge und Alpen (Kennwort alpen). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Alpiner Sommer: Talstation und Dorf im Süden, darüber Alm, Bergwald, Wasser und Energie, ganz oben Fels und Eis. Die Höhe ist nur optisch (Boden bleibt eben), Berge und Wände stehen am Rand und im Norden. */
/* Schilder: keine Hinweisschilder (Wunsch der Lehrkraft, 24.11.2026). Nur Ausgang, Geschafft!, Spielname und Zahlen-Schilder der Rätsel. */
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Murmeltier Molli';
const START={x:0,z:128};
const VERTEXFARBEN=true,MERGEZELLE=50,FERNBESUCHER=65,FERNLEBEN=95;
const ZOOMMAX=45;
const BEREICHE={
  eingang:{name:'Talstation',x:0,z:134,plaetze:[]}
};
/* 37 Orte (dazu die Talstation) und Wasserflächen/Bäche (Namen 'Staubecken', 'Bach' kommen mehrfach vor und zählen nicht als Ort, halten nur die Rätsel aus dem Wasser) */
const EXTRAZONEN=[
  {name:'Dorfplatz',x:-34,z:106,r:12},{name:'Berghotel',x:-84,z:106,r:13},{name:'Bergsteigerschule',x:40,z:106,r:11},{name:'Bergwacht',x:100,z:104,r:13},{name:'Dorfladen',x:-128,z:104,r:11},
  {name:'Almhütte',x:-116,z:68,r:11},{name:'Kuhalm',x:-62,z:68,r:18},{name:'Ziegen- und Schafweide',x:36,z:68,r:15},{name:'Sennerei',x:98,z:70,r:11},{name:'Alpenblumenwiese',x:-110,z:22,r:15},{name:'Imkerei',x:-56,z:22,r:10},
  {name:'Holzfällerplatz',x:50,z:22,r:13},{name:'Bergwald-Lehrpfad',x:106,z:20,r:14},{name:'Gämsenfelsen',x:-122,z:-30,r:13},{name:'Steinbock-Felsen',x:-84,z:-30,r:12},{name:'Murmeltierwiese',x:-44,z:-30,r:12},
  {name:'Adlerhorst',x:40,z:-30,r:12},{name:'Bergbach mit Mühle',x:84,z:-30,r:12},{name:'Wasserfall',x:124,z:-34,r:12},
  {name:'Bergsee',x:-96,z:-92,r:23},{name:'Staudamm',x:100,z:-90,r:16},{name:'Wasserkraftwerk',x:50,z:-80,r:10},{name:'Gletscherbach',x:-36,z:-90,r:11},
  {name:'Geröllhalde',x:-136,z:-134,r:13},{name:'Klettersteig-Wand',x:-98,z:-134,r:12},{name:'Alpengarten',x:-60,z:-134,r:13},{name:'Tropfsteinhöhle',x:-24,z:-134,r:10},{name:'Wetterstation',x:40,z:-134,r:11},{name:'Schutzhütte',x:78,z:-134,r:11},{name:'Skisprung-Schanze',x:116,z:-134,r:13},
  {name:'Gletscher',x:-138,z:-174,r:16},{name:'Eishöhle',x:-98,z:-174,r:11},{name:'Skihütte',x:-60,z:-174,r:11},{name:'Gipfelkreuz',x:20,z:-174,r:11},{name:'Bergstation',x:68,z:-174,r:11},{name:'Hängebrücke',x:112,z:-174,r:13},
  {name:'Zahnradbahn',x:146,z:-70,r:10}
];
/* Wasserflächen (Kreise): Staubecken, Wasserfall-Becken, Teiche, Bäche. Alles Feste im Wasser sperrt die Figur. */
const WS=[[88,-93,10],[104,-95,10],[120,-93,10],[124,-41,5.8],[-96,-92,21.5]];
[[88,-93],[104,-95],[120,-93]].forEach(p=>EXTRAZONEN.push({name:'Staubecken',x:p[0],z:p[1],r:11}));
const SEITENWEGE=[94,44,-8,-58,-110,-160];
const WEGBOGEN=11;
const GRENZE={x0:-180,x1:180,z0:-236,z1:148};
const TORZ=-190, FEST={x:0,z:-212};
let FARBEN,WASSER,ausgang;
const BPTS=[[0,128],[0,100],[0,60],[0,20],[0,-20]];
const BLF=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0,0xf47ab0];
const ZN=n=>EXTRAZONEN.find(e=>e.name===n);

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
function instFlush(){const G={sph:gSphL,sphT:gSphT,blm:gSphXL,con:gConL,cyl:gCylL,box:gBoxI},M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color(),CH=96,gr={},bl=[];
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
function heide(x,z,s){s=s||1;inst('sph',x,.2*s,z,.5*s,.22*s,.5*s,0x6a8a4a);for(let k=0;k<2;k++)inst('blm',x+(rnd()-.5)*.6*s,.34*s,z+(rnd()-.5)*.6*s,.16*s,.12*s,.16*s,k%2?0xa04ab0:0xc070c8)}
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
/* ==================== Tiere (schauen nach +x) ==================== */
/* Allgemeiner Vierbeiner: Körper, vier Beine, Hals mit Kopf (Ohren, Augen, Schnauze), Schwanz; o.x(g,kopf,schwanz,hals) für Besonderheiten */
function vier(par,o){const g=grp(0,0,0,par),f=o.f,w=o.w||f,d=o.d||0x2a2018,h=o.h,bl=o.bl,bh=o.bh,bw=o.bw,hr=o.hr,lr=o.lr;
  sph(1,f,0,h,0,g,bl,bh,bw).castShadow=true;if(o.bauch)sph(1,w,bl*.12,h-bh*.5,0,g,bl*.85,bh*.55,bw*.88);
  const lh=h-bh*.25;[[-.62,1],[-.62,-1],[.6,1],[.6,-1]].forEach(p=>{cyl(lr,lh,o.lf||f,bl*p[0],lh/2,bw*.58*p[1],g,true);sph(lr*1.2,d,bl*p[0]+lr*.6,lr*.45,bw*.58*p[1],g,1.5,.55,1)});
  const nk=grp(bl*.78,h+bh*.2,0,g),kh=grp(0,o.nl,0,nk);cyl(o.nr,o.nl,o.nf||f,0,o.nl/2,0,nk,true);
  sph(hr,o.hf||f,hr*.35,0,0,kh,o.hl||1.5,1,.85).castShadow=true;sph(hr*.55,o.sc||w,hr*1.35,-hr*.28,0,kh,1.3,.78,.8);sph(hr*.17,0x1a1414,hr*2.05,-hr*.2,0,kh);
  [-1,1].forEach(z=>{sph(hr*.2,0x16110d,hr*.95,hr*.32,z*hr*.62,kh);sph(hr*.07,0xffffff,hr*1.03,hr*.4,z*hr*.7,kh);cone(hr*.34,hr*(o.oh||1.1),o.ef||f,-hr*.2,hr*.95,z*hr*.55,kh).rotation.x=z*.35});
  const tl=grp(-bl*.92,h+bh*.25,0,g);if(!o.notail)sph(o.tr,o.tc||f,-o.tr*.7,-o.tr*.1,0,tl,o.tl||1.1,.8,.8);
  if(o.x)o.x(g,kh,tl,nk);
  const ph=rnd()*6;g.userData.anim=t=>{const u=Math.max(0,Math.sin(t*.35+ph)),a=o.na+(o.gr||0)*u;nk.rotation.z=-a;kh.rotation.z=a-o.ht-u*(o.gr?.6:0)+Math.sin(t*.9)*.06;tl.rotation.y=Math.sin(t*(o.tw||3))*.35};return g}
function hase0(par){const g=grp(0,0,0,par),f=0xa8845a;sph(.4,f,0,.4,0,g,1.2,.9,.8).castShadow=true;sph(.28,f,.4,.7,0,g);[-1,1].forEach(z=>sph(.1,f,.35,1.15,z*.1,g,.6,2.4,.4));sph(.1,0xffffff,-.5,.45,0,g);[-1,1].forEach(z=>{sph(.05,0x111111,.63,.78,z*.14,g);sph(.2,f,-.1,.2,z*.28,g,1.4,.8,.6)});sph(.04,0xe8788a,.67,.7,0,g);
  g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*2.2))*.25};return g}
const haseM=automerge(hase0);
function wurm(x,z,rot,s){const g=grp(x,0,z);g.rotation.y=rot||0;s=s||1;for(let i=0;i<10;i++){const u=i/9;sph(.2*s*(i===0?.9:1),i===3||i===4?0xe0a0a0:0xc47a82,(u-.5)*4*s,.2*s,Math.sin(u*6.5)*.55*s,g,1.15,1,1)}sph(.05*s,0x2a1a1a,-2.1*s,.28*s,.3*s,g);kreis(x,z,1.4*s);return g}
function libelle(cx,cz,r,y,ph,farbe){const g=grp(cx,y,cz);cyl(.035,1.1,farbe,.1,0,0,g).rotation.z=Math.PI/2;sph(.1,0x1a8a4a,.68,.02,0,g);[-1,1].forEach(s=>sph(.06,0x2a5ac8,.7,.05,s*.08,g));const w=[-1,1].map(s=>{const p=grp(.25,.06,0,g);[.0,-.2].forEach(x=>box(.16,.012,.5,0xe4f4ff,x,0,s*.28,p));return p});
  g.userData.anim=t=>{const a=t*1.1+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a*1.4)*r*.7;g.position.set(x,y+Math.sin(t*2+ph)*.5,z);g.rotation.y=Math.atan2(-Math.cos(a*1.4)*1.4*r*.7,-Math.sin(a)*r);w[0].rotation.x=Math.sin(t*30)*.5;w[1].rotation.x=-Math.sin(t*30)*.5};leben(g,ph);return vm(g,w[0],w[1])}
function falter(cx,cz,r,y,ph,farbe){const g=grp(cx,y,cz);sph(.07,0x3a2a22,0,0,0,g,2,.5,.5);const fl=[-1,1].map(s=>sph(.3,farbe,0,0,s*.3,g,.9,.1,1.1));g.userData.anim=t=>{const a=t*.5+ph;g.position.set(cx+Math.cos(a)*r,y+Math.sin(t*1.3+ph)*.4,cz+Math.sin(a)*r*.7);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*14)*.7;fl[1].rotation.x=-Math.sin(t*14)*.7};leben(g,ph);return vm(g,fl[0],fl[1])}
function vogelM(par,f,bf,s){const g=grp(0,0,0,par);sph(.15,f,0,.2,0,g,1.3,1,.9);sph(.11,bf,.07,.15,0,g,1.1,.8,.8);sph(.09,f,.18,.32,0,g);cone(.025,.07,0xe8a030,.27,.32,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>sph(.018,0x111111,.23,.35,z*.05,g));box(.22,.03,.08,f,-.26,.22,0,g).rotation.z=.4;cyl(.012,.12,0x5a4a3a,0,.06,.04,g);cyl(.012,.12,0x5a4a3a,0,.06,-.04,g);g.scale.setScalar(s||1);return g}
const SV=[[0x4a88c8,0xf2d030],[0xd8602a,0xf4ecd8],[0x6a5038,0xd8c8a8],[0x2a2a2a,0x3a3a3a],[0xd8c030,0xf6f0d0],[0x2a9ad8,0xe07a30]];
function sitz(x,y,z,ry,k,s){const v=vogelM(scene,SV[k][0],SV[k][1],s||1.5);v.position.set(x,y,z);v.rotation.y=ry;return v}
function flieger(cx,cz,r,y,ph,sp,f1,f2){const g=grp(0,y,0);sph(.12,f1,0,0,0,g,1.6,.7,.7);box(.14,.05,.1,f2,.17,0,0,g);const fl=[-1,1].map(s=>box(.5,.03,.18,f1,0,.02,s*.25,g));g.scale.setScalar(1.6);
  g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.8,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.8;g.position.set(x,y+Math.sin(t*.8+ph)*1.8,z);g.rotation.y=Math.atan2(-vz,vx);fl[0].rotation.x=Math.sin(t*16)*.7;fl[1].rotation.x=-Math.sin(t*16)*.7};leben(g,ph);return vm(g,fl[0],fl[1])}
function ente0(par){const g=grp(0,0,0,par);sph(.5,0xc8a878,0,.35,0,g,1.3,.7,.85).castShadow=true;sph(.3,0xc8a878,-.55,.55,0,g,.8,.9,.6);cyl(.09,.4,0x2f7a4a,.4,.65,0,g);
  const kopf=grp(.45,.9,0,g);sph(.22,0x2f7a4a,0,0,0,kopf);box(.28,.08,.2,0xf2b230,.24,-.04,0,kopf);sph(.035,0x111111,.1,.07,.13,kopf);sph(.035,0x111111,.1,.07,-.13,kopf);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.5)*.25;g.rotation.z=Math.sin(t*1.1)*.03};return g}
const ente=automerge(ente0);
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
/* Boot (schaut nach +x): Rumpf mit Spitze, Deck, Streifen. L Länge, B Breite, H Höhe über dem Wasser */
function rumpf(g,L,B,H,farbe,deck,streifen){const l=L-B*.5,x0=-B*.1;box(l,H,B,farbe,x0,H/2-.3,0,g,true);const bg=box(B*.7,H,B*.7,farbe,x0+l/2,H/2-.3,0,g);bg.rotation.y=Math.PI/4;box(l,.2,B*.9,deck,x0,H-.3,0,g);const d2=box(B*.6,.2,B*.6,deck,x0+l/2,H-.3,0,g);d2.rotation.y=Math.PI/4;
  if(streifen){box(l+.04,.3,B+.04,streifen,x0,.05,0,g);const s2=box(B*.7+.04,.3,B*.7+.04,streifen,x0+l/2,.05,0,g);s2.rotation.y=Math.PI/4}return x0+l/2+B*.35}
function reling(g,l,B,y,x0,farbe){[-1,1].forEach(s=>{box(l,.07,.07,farbe,x0,y+.6,s*B*.46,g);for(let i=0;i<=Math.round(l/1.4);i++)box(.07,.6,.07,farbe,x0-l/2+i*l/Math.round(l/1.4),y+.3,s*B*.46,g)})}
function wipp(g,y0,ph,a){g.userData.keep=1;g.userData.anim=t=>{g.position.y=y0+Math.sin(t*.9+ph)*.1*(a||1);g.rotation.z=Math.sin(t*.7+ph)*.02*(a||1);g.rotation.x=Math.sin(t*.55+ph*2)*.015*(a||1)};lebendig.push({o:g,ph:ph})}
/* Krabbenkutter (Fischerboot): Rumpf, Steuerhaus, Mast mit Ausleger, Netze, Kisten, Leuchten */
function kutter(par,farbe,haus,sk){const g=grp(0,0,0,par);rumpf(g,11,3.8,1.7,farbe,0xb08850,0xf2f2f2);reling(g,6.5,3.8,1.4,.8,0xf2f2f2);
  box(2.8,2,3,haus,-2.7,2.2,0,g,true);box(3.1,.18,3.3,0xe0302a,-2.7,3.3,0,g);box(.06,.9,2.4,0x9fd0e8,-1.28,2.5,0,g);[-1,1].forEach(s=>{box(1.6,.8,.06,0x9fd0e8,-2.7,2.5,s*1.52,g)});box(.9,1.4,.06,0x6a4a2a,-3.6,1.9,1.52,g);
  cyl(.12,5.6,0x7a5a3a,1.3,3.6,0,g,true);const bm=cyl(.07,4.4,0x7a5a3a,1.3,3.8,0,g);bm.rotation.x=Math.PI/2;[-1,1].forEach(s=>{const a=cyl(.07,6,0x7a5a3a,1.3,4.2,s*2.4,g);a.rotation.set(s*-.62,0,.18)});
  cyl(.15,1.2,0x2a2a2a,-3.7,3.9,.5,g);sph(.16,0xfff0b0,2.3,1.6,0,g);sph(.14,0xe0302a,-.6,3.45,1.3,g);sph(.14,0x2fb55a,-.6,3.45,-1.3,g);
  for(let i=0;i<3;i++)box(.9,.4,.6,0xa8743f,.3+i*1.1,1.65,i%2?-.9:.9,g,true);[0,1,2].forEach(i=>sph(.3,0xf59e3f,3.3+i*.5,1.6,(i-1)*.9,g));
  sph(.8,0x4a6a58,-.2,1.9,0,g,2.2,.55,2.2);tri([1.3,6,0],[1.3,5,0],[2.6,5.3,0],0xe0605a,g);
  g.scale.setScalar(sk||1);return vm(g)}
/* Segelboot */
function segler(par,farbe,segel,sk){const g=grp(0,0,0,par);rumpf(g,6.4,2.2,.9,farbe,0xe8dcc0,segel);cyl(.07,6.6,0xe8e4da,.2,3.9,0,g,true);cyl(.05,2.8,0xe8e4da,-.9,1.4,0,g).rotation.z=Math.PI/2-.12;
  tri([.15,.9,0],[.15,6.6,0],[-2.3,1.3,0],segel,g);tri([.35,1.1,0],[.35,6.2,0],[2.4,1.1,0],0xffffff,g);box(1.4,.5,1.2,0x9a8a6a,-1.3,.75,0,g);sph(.12,0xfff0b0,3,.9,0,g);box(.08,.9,.08,0xe0302a,-2.9,.8,0,g);
  g.scale.setScalar(sk||1);return vm(g)}
/* Ruderboot / Schlauchboot klein */
function ruder(par,farbe){const g=grp(0,0,0,par);rumpf(g,3.4,1.5,.7,farbe,0xc9a46a,0xf2f2f2);box(.2,.08,1.3,0x8a5a32,.2,.55,0,g);box(1.6,.06,.1,0x8a5a32,.2,.6,.7,g).rotation.y=.3;box(1.6,.06,.1,0x8a5a32,.2,.6,-.7,g).rotation.y=-.3;return vm(g)}
/* ---- Möwe (stehend) ---- */
function moeweM(par,sk){const g=grp(0,0,0,par);sph(.34,0xf6f6f2,0,.62,0,g,1.5,.85,.8).castShadow=true;sph(.25,0xa8b0b8,-.1,.72,0,g,1.4,.35,1.15);sph(.1,0x6a737a,-.52,.7,0,g,1.8,.4,.9);box(.28,.04,.1,0xf6f6f2,-.56,.66,.1,g).rotation.y=.2;
  const kopf=grp(.38,.98,0,g);sph(.16,0xf6f6f2,0,0,0,kopf);cone(.05,.3,0xf2b020,.2,-.01,0,kopf).rotation.z=-Math.PI/2;sph(.025,0xd8302a,.26,-.05,0,kopf);[-1,1].forEach(z=>{sph(.032,0x111111,.1,.04,z*.1,kopf);sph(.012,0xffffff,.12,.06,z*.1,kopf)});cone(.1,.5,0xf6f6f2,.18,.4,0,g).rotation.z=.35;
  [-1,1].forEach(z=>{cyl(.025,.32,0xe8902a,.02,.16,z*.12,g);box(.2,.025,.1,0xe8902a,.08,.02,z*.12,g)});g.scale.setScalar(sk||1.6);
  g.userData.anim=t=>{kopf.rotation.y=Math.sin(t*.8)*.7;kopf.rotation.z=Math.sin(t*2.3)*.06};return g}
const moewe=automerge(moeweM);
/* ---- Seehund (liegend) ---- */
function robbeM(par,sk){const g=grp(0,0,0,par),f=0x8a8f94,b=0xcfd2d4;sph(.9,f,0,.5,0,g,1.8,.62,.75).castShadow=true;sph(.6,b,.1,.3,0,g,1.8,.35,.75);sph(.38,f,-1.4,.42,0,g,1.8,.6,.7);
  [-1,1].forEach(z=>{sph(.32,0x6a6f74,-1.85,.3,z*.3,g,1.5,.25,1);sph(.3,0x6a6f74,.7,.22,z*.62,g,1.3,.22,.7)});
  const kopf=grp(1.55,.88,0,g);sph(.42,f,0,0,0,kopf,1.1,.95,.95);sph(.22,b,.3,-.1,0,kopf,1.1,.8,1.1);sph(.1,0x16110d,.55,-.02,0,kopf,1,.8,1.1);[-1,1].forEach(z=>{sph(.075,0x111111,.28,.15,z*.2,kopf);sph(.025,0xffffff,.31,.18,z*.21,kopf);for(let i=0;i<3;i++)box(.4,.012,.012,0xf2f2ee,.46,-.05-i*.02,z*.2,kopf).rotation.y=z*(.3+i*.2)});
  g.rotation.y=0;g.scale.setScalar(sk||1);g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*.9)*.12+.18;kopf.rotation.y=Math.sin(t*.5)*.4;g.rotation.z=Math.sin(t*1.2)*.012};return g}
const robbe=automerge(robbeM);
/* ---- Krabbe ---- */
function krabbeM(par,sk){const o=grp(0,0,0,par),g=grp(0,0,0,o),f=0xd8402a;sph(.34,f,0,.2,0,g,1.15,.5,1).castShadow=true;[-1,1].forEach(z=>{const au=grp(.3,.42,z*.17,g);cyl(.02,.14,0x2a1a14,0,.07,0,au);sph(.055,0xf6f6f2,0,.17,0,au);sph(.025,0x111111,.03,.18,0,au);
  const arm=grp(.32,.2,z*.38,g);cyl(.04,.4,f,.1,0,z*.12,arm).rotation.x=z*1.1;sph(.13,f,.2,.04,z*.28,arm,1.2,.7,.9);cone(.05,.2,0xb8301e,.34,.04,z*.3,arm).rotation.z=-Math.PI/2;
  for(let i=0;i<3;i++){const l=cyl(.025,.4,0xb8301e,-.12+i*.14,.1,z*.38,g);l.rotation.x=z*.9}});o.scale.setScalar(sk||1.6);
  o.userData.anim=t=>{g.position.x=Math.sin(t*1.4)*.25;g.rotation.y=Math.sin(t*.3)*.3;g.rotation.z=Math.sin(t*9)*.05};return o}
const krabbe=automerge(krabbeM);
/* ---- Schaf und Lamm (schauen nach +x): Wollkörper, dunkles Gesicht und dunkle Beine ---- */
function schafM(par,lamm){const s=lamm?.55:1,h=.78*s+.22,bl=.78*s+.1,bh=.5*s+.1,bw=.46*s+.06;const g=vier(par,{f:0xf3ecdc,w:0xf3ecdc,d:0x2a2a2a,lf:0x2a2a2a,hf:0x2a2a2a,sc:0x3a3a3a,nf:0x2a2a2a,h:h,bl:bl,bh:bh,bw:bw,lr:.06,na:.5,nl:.36*s+.08,nr:.12,hr:.17*s+.03,hl:1.5,ht:.35,gr:.9,oh:1.4,ef:0x2a2a2a,tr:.1,tl:1.1,
  x:(g)=>{for(let i=0;i<6;i++)sph(.36*s+.06,0xf3ecdc,Math.cos(i*2.1)*bl*.55,h+Math.sin(i*1.3)*bh*.3,Math.sin(i*2.1)*bw*.6,g);sph(.26*s+.04,0xf3ecdc,bl*.55,h+bh*.55,0,g)}});return g}
const schaf=automerge(p=>schafM(p,false)),lamm=automerge(p=>schafM(p,true));
/* ---- Austernfischer und Strandvögel ---- */
function strandvogel(par,k,sk){const f=[0x1a1a1e,0xe4dccb,0xf4f0e6][k%3],b=[0xf4f0e6,0xb8a888,0x3a3a3a][k%3],v=vogelM(par,f,b,sk||1.6);if(k%3===0){const sn=cone(.03,.4,0xe86a1a,.38,.34,0,v);sn.rotation.z=-Math.PI/2;}return v}
/* ---- Sandburg ---- */
function sandburg(x,z,s,fahne){s=s||1;const g=grp(x,0,z);cyl(1.2*s,.4*s,0xe2cc90,0,.2*s,0,g,true);[[-.9,-.9],[.9,-.9],[-.9,.9],[.9,.9]].forEach(p=>{cyl(.4*s,1*s,0xe8d49c,p[0]*s,.7*s,p[1]*s,g,true);cone(.5*s,.5*s,0xd8c080,p[0]*s,1.45*s,p[1]*s,g)});cyl(.7*s,1.4*s,0xe8d49c,0,.9*s,0,g,true);cone(.8*s,.7*s,0xd8c080,0,1.95*s,0,g);box(.5*s,.6*s,.1,0x8a6a3a,0,.5*s,1.2*s,g);
  cyl(.03,1*s,0xe8e4da,0,2.55*s,0,g);tri([.03,2.9*s,0],[.03,2.45*s,0],[.7*s,2.67*s,0],fahne||0xe0302a,g);kreis(x,z,1.6*s);return g}
/* ---- Strandkorb (Hauptseite nach +z) ---- */
function strandkorb(x,z,rot,farbe,par){const g=grp(x,0,z,par);g.rotation.y=rot||0;const f=farbe||0xe0605a,s=0xfff8e6;box(1.7,.6,1.1,0xc9a46a,0,.5,0,g,true);box(1.7,1.7,.2,0xc9a46a,0,1.3,-.5,g,true);[-1,1].forEach(q=>box(.2,1.3,1.1,0xc9a46a,q*.78,.9,0,g));
  box(1.5,.12,.9,f,0,.85,.1,g);for(let i=0;i<4;i++)box(.34,1.6,.05,i%2?s:f,-.54+i*.36,1.3,-.38,g);const d=box(1.9,.16,1.4,f,0,2.1,.05,g);d.rotation.x=-.12;box(1.9,.1,.3,s,0,1.95,.72,g);[-1,1].forEach(q=>box(.12,.28,.7,0xb88a4a,q*.5,.14,.4,g));kreis(x,z,.95);return g}
/* ---- Poller, Rettungsring, Boje, Fischkiste, Reuse, Netz ---- */
function poller(x,z){inst('cyl',x,.35,z,.25,.7,.25,0x3a3a3e);inst('sph',x,.72,z,.3,.14,.3,0x4a4a50)}
function ring(par,x,y,z,ry){const g=grp(x,y,z,par);g.rotation.y=ry||0;g.add(new THREE.Mesh(new THREE.TorusGeometry(.38,.13,6,14),mat(0xf2f2f2)));for(let i=0;i<4;i++){const a=i*1.57+.8;box(.3,.27,.3,0xe0302a,Math.cos(a)*.38,Math.sin(a)*.38,0,g).rotation.z=a}return g}
function boje(x,z,f){f=f||0xf59e3f;sph(.4,f,x,.4,z,scene,1,1.1,1);cyl(.05,.5,0x3a3a3a,x,.95,z,scene);kreis(x,z,.45)}
function fischkiste(x,z,rot,fisch,par){const g=grp(x,0,z,par);g.rotation.y=rot||0;box(1.2,.45,.8,0xe8e8e8,0,.23,0,g,true);for(let i=0;i<5;i++){const f=sph(.2,fisch||0xa8b8bc,-.4+i*.2,.5,(i%2-.5)*.3,g,1.6,.45,.6);f.rotation.y=i}kreis(x,z,.8);return g}
function reuse(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;cyl(.5,1.7,0x9a7a4a,0,.55,0,g,true).rotation.z=Math.PI/2;for(let i=0;i<4;i++)box(.06,.06,1.1,0x6a4a2a,-.6+i*.4,.55,0,g);cone(.4,.5,0x9a7a4a,.95,.55,0,g).rotation.z=-Math.PI/2;kreis(x,z,.9);return g}
function netz(x,z,rot,w,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;sph(1,farbe||0x5a8a9a,0,.3,0,g,w||1.4,.45,w?w*.7:1);for(let i=0;i<5;i++)sph(.12,0xf59e3f,(i-2)*.5*(w||1.4),.62,(i%2)*.3-.15,g);kreis(x,z,(w||1.4)*.7);return g}
function fahrrad(x,z,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;[-.55,.55].forEach(q=>{const w=new THREE.Mesh(new THREE.TorusGeometry(.38,.04,5,12),mat(0x2a2a2a));w.position.set(q,.4,0);g.add(w)});box(1.1,.06,.06,farbe||0x3b6fc4,0,.7,0,g).rotation.z=.3;box(.06,.6,.06,farbe||0x3b6fc4,-.3,.7,0,g);box(.06,.5,.06,farbe||0x3b6fc4,.45,.65,0,g);box(.3,.05,.2,0x2a2a2a,-.4,.98,0,g);box(.06,.06,.5,0x2a2a2a,.5,.95,0,g);box(.5,.28,.4,0x8a5a32,.9,.4,0,g);kreis(x,z,.8);return g}
/* Drache an Schnur: fliegt über Punkt (cx,cz), Kind hält die Schnur */
function drache(cx,cz,r,y,ph,farbe,farbe2){const g=grp(cx,y,cz);const k=grp(0,0,0,g);box(1.2,1.6,.05,farbe,0,0,0,k).rotation.z=0;box(.1,1.6,.07,farbe2,0,0,0,k);box(1.2,.1,.07,farbe2,0,0,0,k);for(let i=0;i<5;i++)box(.3,.18,.04,i%2?farbe2:0xffffff,0,-1-i*.55,0,k).rotation.z=Math.sin(i*1.4)*.5;vm(k);
  const s=new THREE.Mesh(gCyl,mat(0xf2f2f2));s.scale.set(.02,1,.02);scene.add(s);s.userData.keep=1;const hx=cx-r*.2,hz=cz+r*.1,up=new THREE.Vector3(0,1,0),d=new THREE.Vector3();
  g.userData.keep=1;const an=t=>{const a=t*.5+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a*1.3)*r*.5,yy=y+Math.sin(t*.9+ph)*2;g.position.set(x,yy,z);k.rotation.z=Math.sin(t*1.7+ph)*.35;k.rotation.x=.3+Math.sin(t*.8)*.2;d.set(x-hx,yy-1.9,z-hz);const L=d.length();s.position.set((x+hx)/2,(yy+1.9)/2,(z+hz)/2);s.scale.y=L;s.quaternion.setFromUnitVectors(up,d.multiplyScalar(1/L))};an(0);lebendig.push({o:{userData:{anim:an}},ph:ph})}
/* Fahne an Mast (weht) */
function fahne(x,z,h,farbe,farbe2){cyl(.08,h,0xe8e4da,x,h/2,z,scene,true);kreis(x,z,.3);const f=grp(x,h-.6,z);for(let i=0;i<4;i++)box(.4,.5,.04,i%2?(farbe2||0xffffff):farbe,.4+i*.4,0,0,f);vm(f);bewegt(f,t=>{f.rotation.y=Math.sin(t*1.7)*.18})}
function streif(fn,B,v,ph,sk){const g=fn(scene);g.scale.setScalar(sk||1);fahren(g,B,v,ph);return g}
function lin(P,st){const o=[];for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],k=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/st));for(let j=0;j<k;j++)o.push([a[0]+(b[0]-a[0])*j/k,a[1]+(b[1]-a[1])*j/k])}o.push(P[P.length-1]);return o}
function flamme(x,y,z,s){s=s||1;const f=grp(x,y,z);const FL=[[0xff5a1a,.6,1.7,0,0],[0xff9a2a,.45,1.3,.3,.1],[0xffd040,.32,.95,-.25,.15]].map(p=>{const m=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:p[0]}));m.scale.set(p[1]*s,p[2]*s,p[1]*s);m.position.set(p[3]*s,p[2]*s/2,p[4]*s);f.add(m);return{m,h:p[2]*s,w:p[1]*s}});
  f.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{FL.forEach((q,i)=>{const k=1+Math.sin(t*9+i*2)*.16+Math.sin(t*15+i)*.08;q.m.scale.set(q.w*(2-k),q.h*k,q.w*(2-k));q.m.position.y=q.h*k/2})}}},ph:0});return f}
/* Möwen am Boden (stehend) */
function moeweAm(x,y,z,rot,sk){y=y<.7?.1:y;const m=moewe(scene);m.position.set(x,y,z);m.rotation.y=rot||0;m.scale.setScalar(sk||1.6);lebendig.push({o:m,ph:rnd()*6});return m}
function schirm(x,z,f,tisch0){cyl(.06,2.7,0xe8e4da,x,1.35,z,scene,true);cone(1.7,.7,f,x,2.75,z,scene);cone(.1,.25,0xf6f6f2,x,3.2,z,scene);if(tisch0!==false){cyl(.7,.08,0xf6f6f2,x,.95,z+.01,scene);cyl(.08,.9,0x6a6a70,x+.01,.45,z+.01,scene)}kreis(x,z,.7)}
function stuhl(x,z,rot,f){const g=grp(x,0,z);box(.5,.08,.5,f||0x3b6fc4,0,.55,0,g,true);box(.5,.5,.06,f||0x3b6fc4,0,.85,-.22,g);[[-.2,-.2],[.2,-.2],[-.2,.2],[.2,.2]].forEach(p=>cyl(.03,.55,0x6a6a70,p[0],.27,p[1],g));g.rotation.y=rot||0;kreis(x,z,.35);return g}
function markise(g,w,y,z,f1,f2,n){n=n||6;for(let i=0;i<n;i++)box(w/n,.1,1.3,i%2?f2:f1,-w/2+(i+.5)*w/n,y,z,g).rotation.x=.25}
function rutsche(x,z,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;[-.6,.6].forEach(s=>{box(.12,3,.12,0x8a5a32,s,1.5,-1.2,g,true)});box(1.6,.12,1.2,0x8a5a32,0,2.9,-1.2,g);const r=box(1.2,.12,3.4,farbe||0xe0302a,0,1.5,.7,g);r.rotation.x=.55;[-1,1].forEach(s=>box(.1,.4,3.4,farbe||0xe0302a,s*.6,1.7,.7,g).rotation.x=.55);for(let i=0;i<5;i++)box(1.3,.06,.1,0x8a5a32,0,.6+i*.5,-1.78,g);sperrKasten(x,z,2.4,4.6,rot||0);return g}
function schaukel(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;[-2,2].forEach(s=>[-1,1].forEach(q=>{cyl(.1,3,0x8a5a32,s,1.4,q*.8,g,true).rotation.x=q*.2}));box(4.4,.14,.14,0x6a4220,0,2.9,0,g);const sw=[-1,1].map(s=>{const p=grp(s*.9,2.9,0,g);box(.04,2.1,.04,0x3a3a3e,0,-1.05,0,p);box(.7,.08,.3,0xe0302a,0,-2.1,0,p);return p});bewegt(sw[0],t=>{sw[0].rotation.x=Math.sin(t*1.7)*.5});bewegt(sw[1],t=>{sw[1].rotation.x=Math.sin(t*1.7+1.2)*.5});sperrKasten(x,z,4.6,2.4,rot||0);return g}
function fernrohr(x,z,rot,h){h=h||1.5;const g=grp(x,0,z);cyl(.07,h,0x3a3a3e,0,h/2,0,g,true);const r=cyl(.12,.9,0x2a3a4a,0,h+.1,0,g);r.rotation.z=1.2;cyl(.15,.12,0x1a1a1a,.4,h+.35,0,g).rotation.z=1.2;g.rotation.y=rot||0;kreis(x,z,.3);return g}
function windsack(x,z,h){cyl(.08,h,0xe8e4da,x,h/2,z,scene,true);kreis(x,z,.25);const g=grp(x,h,z);const ks=[];for(let i=0;i<4;i++)ks.push(cone(.4-i*.05,.7,i%2?0xf6f6f2:0xe0302a,.4+i*.7,0,0,g));ks.forEach(k=>k.rotation.z=-Math.PI/2);vm(g);bewegt(g,t=>{g.rotation.y=Math.sin(t*.4)*.5;g.rotation.z=Math.sin(t*2)*.08})}
const hundM=automerge(function(par){return vier(par,{f:0x2a2a2e,w:0xf6f2ea,d:0x1a1a1a,sc:0xf6f2ea,h:.72,bl:.65,bh:.3,bw:.24,lr:.07,bauch:1,na:.45,nl:.3,nr:.14,hr:.22,hl:1.4,ht:.3,oh:1.2,ef:0x2a2a2e,tr:.1,tl:2.6,tw:7})});
const dk=(c,f)=>new THREE.Color(c).multiplyScalar(f).getHex();
function hecke(x1,z1,x2,z2,gap,k){const L=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(L/1.5));let pa=null;for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n,z=z1+(z2-z1)*i/n,im=gap&&Math.hypot(x-gap[0],z-gap[1])<gap[2];if(!im){inst('sph',x,.55,z,.9,.7,.8,[0x4a8a3a,0x3f7a34][i%2]);if(i%4===0)inst('blm',x,1,z,.5,.4,.5,[0xf47ab0,0xffffff,0xe0605a][(k||0)%3])}if(pa&&!im&&!pa[2])sperrLinie(pa[0],pa[1],x,z,.5);pa=[x,z,im]}}
function windrad(x,z,s,rot,sp){s=s||1;const g=grp(x,0,z);g.rotation.y=rot||0;cyl(1.1*s,.8*s,0xe8e8e4,0,.4*s,0,g,true);cyl(.5*s,22*s,0xf2f2ee,0,11.4*s,0,g,true);cyl(.4*s,2*s,0xe8e8e4,0,22.5*s,0,g);box(2.8*s,1.4*s,1.5*s,0xf2f2ee,.4*s,23.2*s,0,g,true);cone(.8*s,1.4*s,0xe0302a,2.1*s,23.2*s,0,g).rotation.z=-Math.PI/2;
  const bl=grp(1.6*s,23.2*s,0,g);for(let i=0;i<3;i++){const a=grp(0,0,0,bl);a.rotation.x=i*2.094;box(.25*s,5.6*s,.9*s,0xf6f6f2,0,3.2*s,0,a);box(.2*s,1.2*s,.5*s,0xe0302a,0,6*s,0,a)}vm(bl);bewegt(bl,t=>{bl.rotation.x=t*(sp||.9)});kreis(x,z,1.3*s);return g}
function solar(par,x,y,z,w,d,rx){const g=grp(x,y,z,par);const p=box(w,.12,d,0x2a4a8a,0,0,0,g,true);p.rotation.x=rx||-.5;for(let i=1;i<4;i++)box(.04,.14,d,0xcfd8e8,-w/2+i*w/4,0,0,g).rotation.x=rx||-.5;return g}
const fig=(x,z,rot,jk,hs,hr,st,s)=>{kreis(x,z,.5);return person(x,z,rot,jk,hs,hr,st||'kurz',s||1.25)};
const rfd=b=>0;
function wanderer(B,v,ph,av,hutF){const w=grp(0,0,0);const m=kindL(Object.assign({hose:0x3a4a5a,haut:0xe8b98f,haar:0x6b4626,stil:'kurz',rucksack:null},av),w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.25);if(hutF)hutAuf(m,hutF);
  vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);
  w.userData.anim=t=>{const q=Math.sin(t*6+ph)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q};fahren(w,B,v,ph*B.L/6.3);return w}
function radler(B,v,ph,jk,rad,haar){const g=grp(0,0,0);const w1=new THREE.Mesh(new THREE.TorusGeometry(.4,.05,5,12),mat(0x2a2a2a)),w2=new THREE.Mesh(new THREE.TorusGeometry(.4,.05,5,12),mat(0x2a2a2a));w1.position.set(-.55,.42,0);w2.position.set(.55,.42,0);w1.userData.frei=1;w2.userData.frei=1;g.add(w1);g.add(w2);
  box(1.2,.07,.07,rad,0,.75,0,g).rotation.z=.15;box(.07,.6,.07,rad,-.35,.75,0,g);box(.07,.55,.07,rad,.5,.7,0,g);box(.35,.06,.22,0x2a2a2a,-.4,1.02,0,g);box(.07,.07,.55,0x2a2a2a,.5,1.0,0,g);
  const m=kindL({jacke:jk,hose:0x3a4a5a,haut:0xe8b98f,haar:haar||0x6b4626,stil:'kurz',rucksack:null},g);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1);m.g.position.set(-.2,.25,0);vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);vmVerschm(g);
  g.userData.anim=t=>{w1.rotation.z=-t*9;w2.rotation.z=-t*9;const q=Math.sin(t*7+ph)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q};fahren(g,B,v,ph*B.L/6.3);return g}
function trecker(par){const g=grp(0,0,0,par);box(2.8,1.1,1.5,0x2fa56a,.3,1.3,0,g,true);box(1.4,1.5,1.5,0x2fa56a,-.7,2.4,0,g);box(.06,1,1.3,0x9fd0e8,.01,2.5,0,g);box(1.6,.12,1.6,0x2f6a3a,-.7,3.2,0,g);cyl(.12,1,0x2a2a2a,1.2,2.4,.4,g);[-1,1].forEach(s=>{cyl(.95,.5,0x2a2a2a,-.7,.95,s*.95,g,true).rotation.x=Math.PI/2;cyl(.55,.4,0x2a2a2a,1.3,.55,s*.85,g).rotation.x=Math.PI/2;cyl(.4,.52,0xd8c040,-.7,.95,s*.95,g).rotation.x=Math.PI/2;sph(.14,0xfff0b0,1.75,1.3,s*.5,g)});
  const a=grp(-4.2,0,0,g);box(3.6,.2,1.9,0x6a4220,0,.9,0,a);[-1,1].forEach(s=>{box(3.6,.7,.12,0x8a5a32,0,1.3,s*.95,a);cyl(.6,.3,0x2a2a2a,-.9,.6,s*1.05,a).rotation.x=Math.PI/2});for(let i=0;i<3;i++)cyl(.55,.8,0xe8c850,-1+i*1,1.6,0,a).rotation.x=Math.PI/2;box(.8,.1,.1,0x6a4220,2.2,.9,0,a);return vm(g)}
/* ==================== Hilfen für die Alpen ==================== */
const HZ=0x9a6a3a,HD=0x6a4220,HW=0xa8743f;
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
function x_in_zone(x,z){return EXTRAZONEN.some(e=>e.name!=='Staubecken'&&Math.hypot(x-e.x,z-e.z)<e.r+3)}
/* Bäche (Spline-Punkte) */
const BACH1=spl([[119,-37],[110,-30],[101,-25],[84,-23],[66,-17],[54,-19]],2.5);
const BACH2=spl([[-34,-152],[-28,-138],[-36,-124],[-30,-112],[-38,-100],[-33,-88],[-38,-76],[-32,-64],[-38,-50],[-30,-42]],2.5);
BACH1.forEach((p,i)=>{if(i%3===0)EXTRAZONEN.push({name:'Bach',x:p[0],z:p[1],r:4})});BACH2.forEach((p,i)=>{if(i%3===0)EXTRAZONEN.push({name:'Bach',x:p[0],z:p[1],r:4})});
/* ---------- Berge (Kulisse): Fels, grüner Fuß, Schneekappe; Gipfel mit Alpenglühen ---------- */
const GRAU=[0x8d9097,0x7e848c,0x9a9a9e,0x848a94,0x969087];
const CAPMAT=new THREE.MeshLambertMaterial({color:0xf4f8fa});
function berg(x,z,R,H,k,schnee){k=k||0;inst('con',x,H/2,z,R,H,R,GRAU[k%5],k*1.3);inst('con',x,H*.16,z,R*1.13,H*.32,R*1.13,k%2?0x4f8a44:0x5a9448,0);
  if(schnee!==false&&H>34)inst('con',x,H*.84,z,R*.34,H*.32,R*.34,0xf4f8fa,k);if(R>22)inst('con',x+R*.5,H*.3,z+R*.15,R*.6,H*.6,R*.6,GRAU[(k+2)%5],k+1)}
function gipfel(x,z,R,H,k){k=k||0;inst('con',x,H/2,z,R,H,R,GRAU[k%5],k);inst('con',x,H*.15,z,R*1.14,H*.3,R*1.14,0x4f8a44,0);inst('con',x+R*.55,H*.3,z+R*.1,R*.62,H*.6,R*.62,GRAU[(k+3)%5],1);
  const c=new THREE.Mesh(gCone,CAPMAT);c.scale.set(R*.36,H*.36,R*.36);c.position.set(x,H*.82,z);c.userData.keep=1;scene.add(c)}
/* ---------- Pflanzen (instanziert) ---------- */
function laerche(x,z,s){s=s||1;inst('cyl',x,1.4*s,z,.22*s,2.8*s,.22*s,0x7a5a3a);inst('con',x,3.7*s,z,1.5*s,3.4*s,1.5*s,0x86b24a);inst('con',x,5.6*s,z,1.05*s,2.6*s,1.05*s,0x7ba844);kreis(x,z,.6*s);thSet(x,z)}
function fichte(x,z,s,kr){const alt=KREISE;KREISE=kr!==false;baum(x,z,2,s);KREISE=alt;thSet(x,z)}
function latsche(x,z,s){s=s||1;inst('sph',x,.5*s,z,1.1*s,.55*s,1*s,0x3a6a38);inst('sph',x+.7*s,.4*s,z+.3*s,.8*s,.4*s,.7*s,0x447a40);kreis(x,z,.9*s)}
function arose(x,z,s){s=s||1;inst('sph',x,.4*s,z,.55*s,.4*s,.55*s,0x3f7a34);for(let i=0;i<4;i++)inst('blm',x+Math.cos(i*1.6)*.35*s,.62*s+(i%2)*.1,z+Math.sin(i*1.6)*.3*s,.15*s,.12*s,.15*s,i%2?0xe04a6a:0xf06a8a)}
function enzian(x,z){const h=.28+nr()*.15;inst('cyl',x,h/2,z,.025,h,.025,0x3f9a46);inst('blm',x,h+.05,z,.1,.14,.1,0x2848d0)}
function edelweiss(x,z){inst('cyl',x,.12,z,.02,.24,.02,0x7ab070);inst('blm',x,.27,z,.17,.06,.17,0xf4f4ea);inst('sph',x,.3,z,.05,.04,.05,0xf2d040)}
function arnika(x,z){const h=.3+nr()*.15;inst('cyl',x,h/2,z,.02,h,.02,0x3f9a46);inst('blm',x,h+.04,z,.13,.05,.13,0xf6c820)}
function glocke(x,z){const h=.3+nr()*.15;inst('cyl',x,h/2,z,.02,h,.02,0x3f9a46);inst('blm',x,h+.04,z,.09,.12,.09,0x8a5ad0)}
function gras(x,z,h){h=h||.8;inst('con',x,h/2,z,.1,h,.1,0x4aa040)}
function busch(x,z,s,k){s=s||1;inst('sph',x,.55*s,z,.9*s,.7*s,.9*s,k||0x5a8a3a);inst('sph',x+.5*s,.6*s,z+.3*s,.6*s,.5*s,.6*s,0x6aa04a);kreis(x,z,.8*s)}
function block(x,z,r){const g=felsen(x,z,r);return g}
function steinhaufen(x,z,s){s=s||1;for(let i=0;i<5;i++)inst('sph',x+Math.cos(i*1.9)*.5*s,.2*s+(i%2)*.1,z+Math.sin(i*1.9)*.5*s,.35*s,.22*s,.3*s,GRAU[i%5])}
/* ---------- Gebäude, Zäune ---------- */
function chalet(x,z,w,d,rot,o){o=o||{};const hh=o.h||3.2,g=stall(x,z,w,d,hh,o.wand||HW,o.dach||0x7a4a32,rot);
  box(w*.8,.14,1.2,HZ,0,hh*.62,d/2+.6,g);box(w*.8,.08,.08,HD,0,hh*.62+.9,d/2+1.15,g);for(let i=0;i<=6;i++)box(.07,.8,.07,HD,-w*.4+i*w*.8/6,hh*.62+.5,d/2+1.15,g);
  if(!o.kein)[-1,1].forEach(s=>{box(w*.2,.2,.3,0x7a4a2a,s*w*.34,hh*.5-.4,d/2+.2,g);for(let i=0;i<4;i++)sph(.12,i%2?0xe03a4a:0xf06a8a,s*w*.34-.2+i*.13,hh*.5-.2,d/2+.25,g)});
  if(o.stein)for(let i=0;i<6;i++)box(.9,.12,.6,0x8a8f94,-w*.3+(i%3)*w*.3,hh+d*.17,(i<3?-1:1)*d*.2,g).rotation.x=(i<3?-1:1)*-.5;
  if(o.rauch)rauch(g,w*.28,hh+d*.3+1.3,-d*.15);return g}
function zaunR(x0,z0,x1,z1,gz,gw,farbe){farbe=farbe||0x7a5a3a;gw=gw||3.6;const cx=(x0+x1)/2;
  const seg=(ax,az,bx,bz)=>{const L=Math.hypot(bx-ax,bz-az);if(L<.2)return;const n=Math.max(1,Math.round(L/2));for(let i=0;i<=n;i++)box(.18,1.2,.18,farbe,ax+(bx-ax)*i/n,.6,az+(bz-az)*i/n,scene,true);[1,.55].forEach(h=>{const r=box(L,.07,.1,farbe,(ax+bx)/2,h,(az+bz)/2,scene);r.rotation.y=Math.atan2(-(bz-az),bx-ax)});sperrLinie(ax,az,bx,bz,.15)};
  const zn=gz>0?z1:z0,zf=gz>0?z0:z1;seg(x0,zf,x1,zf);seg(x0,z0,x0,z1);seg(x1,z0,x1,z1);seg(x0,zn,cx-gw/2,zn);seg(cx+gw/2,zn,x1,zn)}
/* Wandstück aus Fels (Kulisse und Kletterwand), fest */
function felswand(x,z,w,d,h,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;const n=Math.max(2,Math.round(w/3));for(let i=0;i<n;i++){const u=(i+.5)/n-.5,hh=h*(.78+.22*Math.sin(i*2.3+x));box(w/n+.4,hh,d*(.85+.25*Math.sin(i*1.7)),i%2?(farbe||GRAU[1]):(farbe||GRAU[3]),u*w,hh/2,Math.sin(i*3.1)*.4,g,true)}sperrKasten(x,z,w,d,rot||0);return g}
/* Fels-Haufen mit Hindernissen: n Brocken im Umkreis */
function felsgruppe(x,z,rx,rz,n,rmin,rmax,hoch){const L=[];for(let i=0;i<n;i++){const a=i/n*6.283+nr()*.5,q=.35+nr()*.65,px=x+Math.cos(a)*rx*q,pz=z+Math.sin(a)*rz*q,r=rmin+nr()*(rmax-rmin);const m=sph(r,GRAU[i%5],px,r*(hoch||.55),pz,scene,1.2,.8,1);m.castShadow=true;kreis(px,pz,r*.95);L.push([px,pz,r])}return L}
/* ---------- Tiere (schauen nach +x) ---------- */
const kuh=automerge(function(par){const h=1.05,bl=1.15,bh=.62,bw=.55;return vier(par,{f:0xf6f0e4,w:0xf6f0e4,d:0x3a2a22,h:h,bl:bl,bh:bh,bw:bw,lr:.12,bauch:1,na:.55,nl:.55,nr:.22,hr:.32,hl:1.45,ht:.4,gr:1,oh:1.1,ef:0x7a5a42,sc:0xe8b8b0,tr:.12,tl:3.2,tw:2,
  x:(g,kh,tl,nk)=>{[[.5,.25,1],[-.5,.1,-1],[0,-.15,1],[-.2,.3,1],[.7,-.1,-1]].forEach(p=>sph(.3,0x4a3022,p[0],h+p[1],p[2]*bw*.93,g,1,.9,.22));sph(.34,0x4a3022,-.1,h+bh*.9,.1,g,1.2,.3,1);sph(.2,0xe8b0a8,-.3,h-bh*.85,0,g,1.1,.7,1);
    [-1,1].forEach(z=>{cone(.045,.3,0xf2e8d0,-.04,.38,z*.2,kh).rotation.x=z*.7});cyl(.24,.1,0x7a4a2a,0,.2,0,nk);cone(.17,.28,0xe8b830,.2,.1,0,nk);sph(.05,0x6a5a20,.2,-.06,0,nk)}})});
const ziege=automerge(function(par){return vier(par,{f:0xe8e2d4,w:0xf6f2ea,d:0x3a3028,h:.7,bl:.62,bh:.32,bw:.26,lr:.055,bauch:1,na:.6,nl:.32,nr:.1,hr:.15,hl:1.5,ht:.3,gr:.9,oh:1.3,ef:0xe8e2d4,sc:0xd8d0c0,tr:.08,tl:1.2,tw:6,
  x:(g,kh)=>{[-1,1].forEach(z=>cone(.035,.32,0x3a2a1a,-.05,.28,z*.07,kh).rotation.z=.8);cone(.04,.2,0xf6f2ea,.28,-.2,0,kh).rotation.z=Math.PI}})});
const gams=automerge(function(par){const hr=.16;return vier(par,{f:0x9a7040,w:0xd8c8a0,d:0x2a1a10,hf:0xf0e6cc,h:.74,bl:.6,bh:.38,bw:.3,lr:.058,bauch:1,na:.55,nl:.26,nr:.13,hr:hr,hl:1.4,ht:.3,gr:.8,oh:1.2,ef:0xc8b890,sc:0x2a1a10,tr:.06,tl:.8,tw:5,
  x:(g,kh)=>{[-1,1].forEach(z=>{box(hr*1.6,.05,.03,0x2a1a10,hr*.8,hr*.14,z*hr*.78,kh);cyl(.026,.2,0x1a1a1a,hr*.1,hr+.1,z*hr*.32,kh);cone(.03,.14,0x1a1a1a,hr*.1-.06,hr+.24,z*hr*.32,kh).rotation.z=2.3});box(.9,.05,.12,0x3a2a18,0,1.1,0,g)}})});
function bogenHorn(par,x,y,z,s){let px=x,py=y;for(let i=0;i<7;i++){const u=i/6,f=.3+u*1.55,l=.24*s,cx=px-Math.sin(f)*l/2,cy=py+Math.cos(f)*l/2;cyl(.075*s*(1-u*.6),l,0x5a4a32,cx,cy,z,par).rotation.z=f;if(i%2===0)cyl(.09*s*(1-u*.6),.03*s,0x3a2a1a,cx,cy,z,par).rotation.z=f;px-=Math.sin(f)*l;py+=Math.cos(f)*l}}
const steinbock=automerge(function(par){const hr=.2;return vier(par,{f:0x8a7860,w:0xc8b898,d:0x2a2018,h:.95,bl:.8,bh:.4,bw:.3,lr:.07,bauch:1,na:.5,nl:.4,nr:.13,hr:hr,hl:1.5,ht:.3,gr:.6,oh:1.2,ef:0x8a7860,sc:0x6a5a46,tr:.07,tl:.9,tw:4,
  x:(g,kh)=>{[-1,1].forEach(z=>bogenHorn(kh,hr*.2,hr*.85,z*hr*.38,.62));cone(.045,.2,0xc8b898,hr*1.2,-hr*.9,0,kh).rotation.z=Math.PI}})});
/* Murmeltier (aufrecht sitzend); schal: rotes Halstuch (Molli) */
function murmelM(par,schal){const g=grp(0,0,0,par),f=0x8a6a48;sph(.45,f,0,.55,0,g,1,1.15,.9).castShadow=true;sph(.3,0xc8a888,.1,.5,0,g,.7,1,.8);
  const k=grp(.14,1.05,0,g);sph(.3,0x9a7a58,0,0,0,k,1.05,.95,.95);sph(.15,0xc8a888,.3,-.07,0,k,1.2,.8,.9);sph(.05,0x2a1a1a,.43,-.02,0,k);[-1,1].forEach(z=>{sph(.05,0x111111,.22,.1,z*.15,k);sph(.02,0xffffff,.25,.12,z*.15,k);sph(.09,0x6a4a30,-.08,.27,z*.16,k)});box(.04,.08,.04,0xf6f0d0,.42,-.12,.02,k);
  [-1,1].forEach(z=>{sph(.1,f,.32,.5,z*.2,g,1.4,.7,.6);sph(.17,0x6a4a30,.1,.06,z*.22,g,1.5,.4,.8)});sph(.14,0x6a4a30,-.5,.2,0,g,2,.8,.8);
  if(schal){cyl(.33,.14,0xe0302a,.1,.88,0,g);box(.12,.3,.1,0xe0302a,.28,.76,0,g)}
  g.userData.anim=t=>{k.rotation.y=Math.sin(t*.7)*.6;k.rotation.z=Math.sin(t*1.9)*.05};return g}
const murmel=automerge(p=>murmelM(p,false)),molli=automerge(p=>murmelM(p,true));
/* Steinadler: fliegend (kreist) und sitzend */
function adlerKoerper(g){sph(.3,0x6a4a2a,0,0,0,g,2.1,.6,.7);sph(.2,0x7a5a30,.62,.12,0,g,1,1,.9);sph(.12,0xc8a060,.55,.2,0,g,1,1,1);cone(.07,.2,0xe8b830,.82,.08,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>sph(.03,0x111111,.74,.2,z*.1,g));box(.7,.04,.45,0x4a3220,-.85,-.02,0,g)}
function adler(cx,cz,r,y,ph,sp){const g=grp(0,y,0);adlerKoerper(g);const w=[-1,1].map(s=>{const p=grp(0,.05,s*.18,g);box(.8,.03,1.1,0x5a3a20,0,0,s*.55,p);box(.5,.03,.6,0x3a2418,-.1,0,s*1.2,p);return p});g.scale.setScalar(1.7);
  g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.8,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.8;g.position.set(x,y+Math.sin(t*.3+ph)*3,z);g.rotation.y=Math.atan2(-vz,vx);g.rotation.x=0;w[0].rotation.x=Math.sin(t*1.6)*.12-.15;w[1].rotation.x=-Math.sin(t*1.6)*.12+.15};leben(g,ph);return vm(g,w[0],w[1])}
function adlerSitz(par,s){const g=grp(0,0,0,par);sph(.4,0x6a4a2a,0,.75,0,g,.8,1.3,.8);sph(.22,0x7a5a30,.1,1.45,0,g);sph(.14,0xc8a060,.05,1.62,0,g);cone(.08,.22,0xe8b830,.32,1.45,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>{sph(.04,0x111111,.26,1.52,z*.1,g);sph(.3,0x5a3a20,-.1,.8,z*.32,g,1.1,1.5,.25);cyl(.05,.3,0xe8b830,.05,.15,z*.15,g)});box(.5,.05,.4,0x4a3220,-.55,.3,0,g).rotation.z=.9;g.scale.setScalar(s||1.6);
  g.userData.anim=t=>{g.rotation.y=Math.sin(t*.3)*.3};return g}
/* Gleitschirm mit Flieger; kreist hoch über dem Tal */
function gleitschirm(cx,cz,r,y,ph,sp,f1,f2){const g=grp(cx,y,cz);const k=grp(0,0,0,g);for(let i=-3;i<=3;i++){const s=box(1.5,.14,1.1,Math.abs(i)%2?f2:f1,0,3.3-i*i*.1,i*1.05,k);s.rotation.x=i*.1}
  [-2.2,0,2.2].forEach(z=>{[-.35,.35].forEach(x=>{const c=cyl(.012,3.1,0x2a2a2a,x*.6,1.7,z*.45,k);c.rotation.z=x*.35;c.rotation.x=-z*.1})});
  const m=kindL({jacke:f1,hose:0x3a3a4a,haut:0xe8b98f,haar:0x6b4626,stil:'cap',rucksack:null},k);m.g.scale.setScalar(.55);m.g.rotation.y=Math.PI/2;box(.5,.1,.7,0x2a2a2a,0,.55,0,k);
  vm(k);g.userData.keep=1;g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.7;g.position.set(x,y+Math.sin(t*.4+ph)*3,z);g.rotation.y=Math.atan2(Math.cos(a)*r*.7,-Math.sin(a)*r);g.rotation.x=.15;k.rotation.x=Math.sin(t*.8+ph)*.12};leben(g,ph);return g}
/* Rettungshubschrauber */
function heli(par){const g=grp(0,0,0,par);sph(1,0xd8302a,0,1.5,0,g,2.3,1,1).castShadow=true;box(3.4,.3,2,0xf6f6f2,-.2,.95,0,g);sph(.9,0xbfe3f2,1.8,1.7,0,g,1,.8,.9);cyl(.35,3.2,0xd8302a,-3.2,1.9,0,g).rotation.z=Math.PI/2;box(.15,1.4,.6,0xf6f6f2,-4.7,2.5,0,g);
  [-1,1].forEach(s=>{cyl(.07,4.2,0x2a2a2e,0,.25,s*1,g).rotation.z=Math.PI/2;cyl(.06,1.1,0x2a2a2e,.8,.8,s*1,g);cyl(.06,1.1,0x2a2a2e,-.8,.8,s*1,g);box(.1,.6,.1,0xf6f6f2,.2,1.5,s*1.02,g);box(.5,.1,.04,0xf6f6f2,.2,1.5,s*1.02,g)});
  cyl(.12,.6,0x2a2a2e,0,2.7,0,g);const ro=grp(0,3.05,0,g);box(8,.06,.4,0x2a2a2e,0,0,0,ro);box(.4,.06,8,0x2a2a2e,0,0,0,ro);vm(ro);bewegt(ro,t=>{ro.rotation.y=t*(g.userData.leer?3:16)});
  const tr=grp(-4.9,2.5,.4,g);box(.08,1.3,.12,0x2a2a2e,0,0,0,tr);box(1.3,.08,.12,0x2a2a2e,0,0,0,tr);vm(tr);bewegt(tr,t=>{tr.rotation.z=t*18});return vm(g,ro,tr)}
/* Seilbahn-Kabine (hängt unter dem Seil bei y=3.15 der Gruppe) */
function gondel(par,f){const g=grp(0,0,0,par);cyl(.08,1.5,0x3a3a3e,0,2.4,0,g,true);box(.5,.14,.14,0x3a3a3e,0,3.15,0,g);box(2.2,1.1,1.7,f,0,1.05,0,g,true);box(2.3,.9,1.8,0xbfe3f2,0,1.9,0,g);box(2.4,.15,1.9,0xf6f6f2,0,2.4,0,g);box(2.4,.2,1.9,0x3a3a3e,0,.5,0,g);[-1,1].forEach(s=>box(.1,.9,.1,f,s*1.15,1.9,0,g));return vm(g)}
/* Zahnradbahn (schaut nach +x) */
function zug(par,f){const g=grp(0,0,0,par);for(let k=0;k<2;k++){const x=k*-5.2;box(5,2.3,2.5,f,x,2.0,0,g,true);box(5.1,.5,2.6,0xf6f0e0,x,1.1,0,g);box(5.1,.25,2.6,0xf6f0e0,x,2.95,0,g);for(let i=0;i<4;i++)[-1,1].forEach(s=>box(.9,.8,.06,0x2a4a6a,x-1.6+i*1.1,2.3,s*1.28,g));box(5,.2,2.4,0x6a6a70,x,3.2,0,g);
    [-1,1].forEach(s=>[-1.5,1.5].forEach(q=>cyl(.45,.2,0x2a2a2e,x+q,.45,s*1.1,g).rotation.x=Math.PI/2))}
  box(.4,1.8,2.3,0xbfe3f2,2.55,2.1,0,g).rotation.z=-.25;[-1,1].forEach(s=>sph(.2,0xfff0b0,2.65,1.2,s*.8,g));box(.4,1.8,2.3,0xbfe3f2,-7.75,2.1,0,g).rotation.z=.25;[-1,1].forEach(s=>sph(.2,0xfff0b0,-7.85,1.2,s*.8,g));box(.5,.3,.3,0x3a3a3e,-2.6,.9,0,g);cyl(.35,.2,0x6a6a70,0,.35,0,g).rotation.x=Math.PI/2;return vm(g)}
/* Kletterer an der Wand (Arme hoch, Helm) */
function kletterer(par,x,y,z,jk,helm){const m=kindL({jacke:jk,hose:0x3a4a5a,haut:0xe8b98f,haar:0x6b4626,stil:'kurz',rucksack:null},par);m.g.position.set(x,y,z);m.g.rotation.y=Math.PI;m.g.scale.setScalar(.9);m.ar.rotation.x=-2.7;m.al.rotation.x=-2.3;m.bl.rotation.x=-.5;m.br.rotation.x=.3;hutAuf(m,helm||0xf6c820);return m}
/* Wasserfall-Schleier (ein Zeichenaufruf) */
function fallen(x,z,w,h,n){return schwarm(gBox,0xf4fbff,n,(i,t)=>{const u=((t*.8+i*.371)%1);return[x+(((i*7)%11)/11-.5)*w,h*(1-u)+.3,z,.32,h*.12+.2,.3,0]})}
/* Pfeiler für Seilbahn und Strommasten */
function mast(x,z,h,farbe){cyl(.35,h,farbe||0x6a6a70,x,h/2,z,scene,true);box(3.2,.25,.3,farbe||0x6a6a70,x,h-.4,z,scene);kreis(x,z,.6)}
function rohr(a,b,r,farbe,par){const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),L=d.length(),m=cyl(r,L,farbe,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,par||scene);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.multiplyScalar(1/L));return m}
function hex(x,z,r,farbe,h){h=h||.1;const c=cyl(r,h,farbe,x,h/2,z,scene);c.receiveShadow=true;return c}
function kristall(x,z,s,f){const g=grp(x,0,z);for(let i=0;i<5;i++){const c=cone(.12*s,(.5+(i%3)*.25)*s,f,Math.cos(i*1.3)*.2*s,.3*s,Math.sin(i*1.3)*.2*s,g);c.rotation.z=Math.cos(i*1.3)*.4;c.rotation.x=Math.sin(i*1.3)*.4}return g}

/* ==================== Etappe 1: Fläche, Wege, Kulisse, Eingang, Seilbahn, Festplatz ==================== */
const bandE=(z,x)=>z+4*Math.sin(x*.045+z*.3)+3*Math.sin(x*.11+z);
function bandFl(zA,zB,farbe,y){const up=[],dn=[];for(let x=-190;x<=190;x+=19)up.push([x,bandE(zB,x)]);for(let x=190;x>=-190;x-=19)dn.push([x,bandE(zA,x)]);return landFl(up.concat(dn),farbe,y)}
/* Seilbahn: Stützen (x,z,Höhe), Seilhöhe = Höhe - .3 */
const SEIL=[[30,120,6.8],[68,98,9],[68,64,11],[77,24,13],[62,-30,14],[70,-100,15],[59,-134,16],[68,-170,17]];
const SEILL=(function(){let L=0;const c=[0];for(let i=1;i<SEIL.length;i++){L+=Math.hypot(SEIL[i][0]-SEIL[i-1][0],SEIL[i][1]-SEIL[i-1][1]);c.push(L)}return{L,c}})();
function seilPos(u,o){u=Math.max(0,Math.min(SEILL.L,u));let i=1;while(i<SEIL.length-1&&SEILL.c[i]<u)i++;const a=SEIL[i-1],b=SEIL[i],f=(u-SEILL.c[i-1])/(SEILL.c[i]-SEILL.c[i-1]||1),dx=b[0]-a[0],dz=b[1]-a[1],l=Math.hypot(dx,dz)||1;
  return[a[0]+dx*f-dz/l*o,a[2]-.3+(b[2]-a[2])*f,a[1]+dz*f+dx/l*o,dx,dz]}
function seilbahn(){
  SEIL.forEach((p,i)=>{if(i>0&&i<SEIL.length-1){mast(p[0],p[1],p[2]);box(.5,p[2]*.5,.5,0x6a6a70,p[0]+.9,p[2]*.25,p[1],scene);box(.5,p[2]*.5,.5,0x6a6a70,p[0]-.9,p[2]*.25,p[1],scene);box(2.2,.2,.2,0x6a6a70,p[0],p[2]*.5,p[1],scene)}});
  [-1.2,1.2].forEach(o=>{for(let i=1;i<SEIL.length;i++){const a=seilPos(SEILL.c[i-1]+.01,o),b=seilPos(SEILL.c[i]-.01,o);rohr([a[0],a[1],a[2]],[b[0],b[1],b[2]],.07,0x2a2a2e)}});
  const F=[0xd8302a,0x3b8fc4,0xf2c230,0x4caf6a,0xe0605a,0xf59e3f,0x9b6fd0,0x2fb5a8];
  for(let k=0;k<8;k++){const gd=gondel(scene,F[k]);gd.userData.keep=1;const off=k*SEILL.L/4;
    lebendig.push({o:{userData:{anim:t=>{const s=((t*6+off)%(2*SEILL.L)),up=s<SEILL.L,p=seilPos(up?s:2*SEILL.L-s,up?-1.2:1.2);const sicht=Math.hypot(p[0]-spieler.position.x,p[2]-spieler.position.z)<115;if(gd.visible!==sicht)gd.visible=sicht;if(!sicht)return;gd.position.set(p[0],p[1]-3.15,p[2]);gd.rotation.y=Math.atan2(-p[4],p[3])+(up?0:Math.PI);gd.rotation.z=Math.sin(t*1.1+k)*.03}}},ph:0})}}
function etappe1(){
  WASSER=0x3f93b8;
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(1400,1400),mat(0x72ad4e));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
  bandFl(160,80,0x72ad4e,.02);bandFl(80,8,0x8fc45a,.02);bandFl(8,-70,0x5f9a46,.02);bandFl(-70,-120,0x6d9c52,.02);bandFl(-120,-170,0x8b9a68,.02);bandFl(-170,-240,0x9a9c8a,.02);
  /* Fels- und Kiesflächen */
  [[-150,-175,26],[-120,-150,18],[-60,-160,14],[30,-150,16],[130,-160,22],[150,-200,26],[-20,-200,16],[60,-205,20]].forEach(p=>{inst('sphT',p[0],0,p[1],p[2],.05,p[2]*.7,0x8d8f86)});
  hauptweg(5);
  SEITENWEGE.forEach(r=>{weg(strasse(r),4);const px=wegX(r);kreuzplatz(px,roadZ(px,r),7.5)});
  /* Höhenwege West und Ost (Ringweg) */
  weg(spl([[-146,94],[-152,60],[-146,20],[-150,-20],[-144,-60],[-150,-110],[-146,-160]],10),3);weg(spl([[146,94],[150,50],[144,8],[148,-30],[142,-70],[146,-110],[142,-160]],10),3);
  weg([[0,TORZ+2],[0,TORZ-24]],5,FARBEN.platz);scheibe(FEST.x,FEST.z,17,FARBEN.platz,.08);scheibe(0,114,12,FARBEN.platz,.07);
  /* ---------- Ausgang (Tor wird geöffnet) ---------- */
  ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{cyl(.75,6.6,0x8a5a32,s*4.4,3.3,0,g,true);for(let k=0;k<3;k++)cyl(.78,.4,0x6a4220,s*4.4,1+k*2.1,0,g);cone(1.3,1.5,0x7a3a2a,s*4.4,7.3,0,g);cyl(.1,1.4,0x3a3a3a,s*4.4,8.6,0,g)});box(10.8,1,.7,0x6a4220,0,6.2,0,g,true);box(11,.3,1,0x4a88c8,0,6.85,0,g);
    const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.2,.4);g.add(s);
    const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,0xf2f2f2,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,i%2?0x4a88c8:0xc8d8e8,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.34,0x8a5a32,s*-1.9,1,0,p);box(3.8,.2,.34,0x8a5a32,s*-1.9,2.8,0,p);return p});
    kreis(-4.4,TORZ,1);kreis(4.4,TORZ,1);return {g,fl,offen:0}})();
  /* ---------- 1. Talstation (Eingang): Torbogen, Seilbahn-Station, Bus, Wartende ---------- */
  (function(){const ez=111;[-1,1].forEach(s=>{cyl(.6,6.4,0x9a6a3a,s*7,3.2,ez,scene,true);for(let k=0;k<3;k++)cyl(.63,.4,0x6a4220,s*7,1+k*2.2,ez,scene);cone(1.1,1.2,0x7a3a2a,s*7,7,ez,scene);kreis(s*7,ez,.9)});box(14.8,.9,.8,0x6a4220,0,6.1,ez,scene,true);box(15.2,.35,1.2,0x4a88c8,0,6.75,ez,scene);const sn=schildText(CONFIG.spielname,'#fff8e6',7.5,1.6,CONFIG.spielname.length>12?44:60);sn.position.set(0,6.1,ez+.45);scene.add(sn);
    fahne(-18,104,7,0x4a88c8,0xffffff);fahne(18,104,7,0xe0302a,0xffffff);
    /* Talstation der Seilbahn */
    (function(){const g=grp(30,0,126);box(9,3.4,16,0xd8d0c0,0,1.7,0,g,true);box(9.2,.3,16.2,0x6a6a70,0,3.5,0,g);[-1,1].forEach(s=>{const r=box(5.4,.25,17,0x7a3a2a,s*2.2,5.2,0,g,true);r.rotation.z=-s*.5});box(9,.4,.3,0x6a4220,0,6.1,0,g);
      for(let i=0;i<5;i++)glas(1.6,1.8,.1,-4.5,2,-6+i*3,g).rotation.y=Math.PI/2;box(.2,2.4,1.6,0x6a4220,-4.55,1.2,3.2,g);for(let i=0;i<4;i++)box(.1,.6,1.4,0xf6f6f2,-4.6,3,-5+i*3.4,g);
      vm(g);
      sperrKasten(30,126,9.4,16.4,0)})();
    (function(){const rg=grp(30,5.9,118.8);cyl(1.6,.5,0x3a3a3e,0,0,0,rg).rotation.z=Math.PI/2;box(.3,3.4,.3,0x6a6a70,0,0,0,rg);box(.3,.3,3.4,0x6a6a70,0,0,0,rg);vm(rg);bewegt(rg,t=>{rg.rotation.x=t*.8})})();
    /* Bus, Kiosk, Fahrräder, Gepäck, Wartende */
    (function(){const g=grp(-22,0,124);box(9,2.6,3,0xf2c230,0,1.8,0,g,true);box(9.1,.5,3.05,0xf6f6f2,0,1.1,0,g);for(let i=0;i<5;i++)[-1,1].forEach(s=>box(1.2,.9,.06,0x9fd0e8,-3.4+i*1.7,2.2,s*1.52,g));box(.06,1.2,2.6,0x9fd0e8,4.5,2.1,0,g);box(9.1,.2,3.05,0x2a4a8a,0,3.2,0,g);[-1,1].forEach(s=>[-3,3].forEach(q=>cyl(.55,.4,0x2a2a2e,q,.55,s*1.4,g).rotation.x=Math.PI/2));[-1,1].forEach(s=>sph(.2,0xfff0b0,4.55,1.1,s*1,g));sperrKasten(-22,124,9.4,3.4,0)})();
    (function(){const g=grp(-12,0,108);box(4,2.8,3,0xf6f6f2,0,1.4,0,g,true);box(4.4,.3,3.4,0x4a88c8,0,2.95,0,g);for(let i=0;i<4;i++)box(.9,.12,.5,i%2?0xe0302a:0xffffff,-1.5+i,2.5,1.8,g);box(1.2,.9,.1,0x4a88c8,-.8,1,1.55,g);box(1.4,1,.1,0xcfeaf5,.9,1.6,1.55,g);box(1.6,.12,.5,0x8a5a32,.9,1,1.8,g);sperrKasten(-12,108,4.2,3.2,0)})();
    [[-10,98,0],[-9.6,97.2,.4],[-8.8,98.4,-.3]].forEach((p,i)=>fahrrad(p[0],p[1],p[2]+1.57,[0xe0302a,0x3b6fc4,0xf59e3f][i]));
    (function(){const g=grp(12,0,106);box(2.4,.15,1.2,0x6a6a70,0,.55,0,g,true);[-1,1].forEach(s=>cyl(.2,.1,0x2a2a2a,s*.8,.2,.7,g).rotation.x=Math.PI/2);box(1.8,.9,.8,0x3a6a3a,-.2,1.1,0,g);box(1.2,.7,.7,0xb83a2e,.3,1.9,0,g);box(.1,.1,1.4,0x3a3a3e,-1.4,.8,0,g);kreis(12,106,1.4)})();
    fig(-4,108,1.2,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(-6,110,-.6,0x4caf6a,0x4a4a5a,0x2a1d14,'kurz',1.35);fig(5.4,109,3.5,0xf59e3f,0x3a4a6a,0x6b4626,'cap',1.3);fig(7,107,3.9,0x9b6fd0,0x4a4a5a,0xb5651d,'pferd',.9);
    kuebel(-7,98);kuebel(7,98);bankW(-8,104,0);bankW(8,104,0);
    for(let i=0;i<14;i++){const a=nr()*6.28,r=4+nr()*3;blumeI(-22+Math.cos(a)*r,100+Math.sin(a)*r*.6,i%6);blumeI(22+Math.cos(a)*r,100+Math.sin(a)*r*.6,(i+2)%6)}})();
  seilbahn();
  /* ---------- Festplatz: Gipfelfest ---------- */
  (function(){const z0=FEST.z,bue=grp(0,0,z0-12);box(16,1,6,0x8a5a32,0,.5,0,bue,true);box(16.4,.3,6.4,0xd8b878,0,1.05,0,bue);
    [-1,1].forEach(s=>{cyl(.3,11,0x8a5a32,s*8.2,5.5,-2.6,bue,true);cone(.8,1.1,0x7a3a2a,s*8.2,11.5,-2.6,bue)});box(11,6.6,.2,0x3a78b0,0,4.4,-2.55,bue);
    [[-3.6,2.6,2.6,4.4],[0,3.8,3.2,5.4],[3.6,2.4,2.4,4],[-6.4,1.6,1.8,3]].forEach((p,i)=>{const c=cone(p[2],p[3],i%2?0x9a9ea6:0xb8bcc4,p[0],1.3+p[3]/2,-2.3,bue);c.scale.z=.15;const k=cone(p[2]*.4,p[3]*.4,0xf6f8fa,p[0],1.3+p[3]*.8,-2.2,bue);k.scale.z=.16});
    const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.2,-2.4);bue.add(gs);kreis(0,z0-12,9);
    const farben=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4,0xf59e3f];for(let i=0;i<24;i++){const t=i/23,x=-14+t*28,y=6.4-Math.sin(t*Math.PI)*2.2;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:farben[i%5]}));l.position.set(x,y,z0-8);l.scale.setScalar(.28);scene.add(l)}
    [-14,14].forEach(x=>{cyl(.15,7,0x6a4220,x,3.5,z0-8,scene,true)});const fa=[0x4a88c8,0xffffff,0x4a88c8,0xffffff];for(let i=0;i<14;i++){const t=i/13;cone(.4,.8,fa[i%4],-12+t*24,6.2-Math.sin(t*Math.PI)*1.8-.5,z0-8,scene).rotation.z=Math.PI}
    [-12,12].forEach(x=>{cyl(.9,.6,0x3a3a3e,x,1.6,z0+4,scene,true);cyl(.15,1.4,0x3a3a3e,x,.7,z0+4,scene);cyl(.6,1.2,0xe08a2a,x,.1,z0+4,scene);flamme(x,2,z0+4,1);rauch(scene,x+.2,3,z0+4);kreis(x,z0+4,1.1)});
    /* Alphorn und Festbänke, Stände */
    (function(){const g=grp(6.4,.6,z0-11.2);const h=cyl(.13,5,0x8a5a32,1.4,1.6,0,g);h.rotation.z=1.15;cone(.6,.8,0x8a5a32,3.6,.35,0,g).rotation.z=-2.6;[0,1].forEach(i=>cyl(.15,.1,0x2a2a2a,-.6+i*.01,.1,0,g));fig(5.5,z0-8.8,.4,0x2a5a2a,0x6a4a32,0x6b4626,'kurz',1.3)})();
    [[-10,z0+14],[10,z0+14]].forEach((p,i)=>{stall(p[0],p[1],5,3.4,2.6,[0xf6f6f2,0xe8d8b0][i],0x7a3a2a,0)});
    [[-12,z0+22],[12,z0+22],[-4,z0+25],[4,z0+25]].forEach(p=>{tisch(p[0],p[1],0);bankW(p[0]-1.6,p[1],Math.PI/2);bankW(p[0]+1.6,p[1],-Math.PI/2)});
    [[-6,z0-2],[6,z0-2],[-16,z0+8],[16,z0+8],[-8,z0+19],[8,z0+19]].forEach(p=>laterne(p[0],p[1]));
    [[-17,z0+3],[17,z0+3]].forEach(p=>{[[-1.4,.4],[0,0],[1.4,.4]].forEach(q=>{cyl(.45,1,0x8a5a32,p[0]+q[0],.5,p[1]+q[1],scene,true);kreis(p[0]+q[0],p[1]+q[1],.5)})});
    [[-20,z0+10],[20,z0+10]].forEach(p=>{[0,1,2].forEach(k=>{cyl(.9,.5,0xf0c850,p[0],.25+k*.5,p[1],scene,true)});kreis(p[0],p[1],1)});
  })();
}
/* ---------- Kulisse: Berge rundum (fest, außerhalb der Welt) ---------- */
function kulisse(){
  gipfel(0,-335,80,175,0);gipfel(-115,-325,70,145,2);gipfel(118,-330,70,150,3);gipfel(-215,-300,60,125,4);gipfel(215,-305,60,130,1);
  [[-170,-290,45,95],[-60,-288,45,100],[62,-292,46,105],[170,-288,45,98],[-270,-260,52,115],[270,-262,52,112],[-50,-370,70,150],[60,-380,70,160],[-170,-360,60,120],[170,-365,60,125]].forEach((p,i)=>berg(p[0],p[1],p[2],p[3],i));
  for(let z=130,i=0;z>-260;z-=44,i++){const h=(55+((i*37)%50));berg(-236,z,46,h,i+1);berg(236,z+10,46,h-8,i+3);berg(-306,z-18,62,h+45,i+2,true);berg(306,z-22,62,h+40,i);if(i%3===1){gipfel(-340,z-30,70,h+85,i);gipfel(340,z-34,70,h+80,i+2)}}
  for(let x=-150,i=0;x<=150;x+=50,i++)[[x,200,40,28],[x+22,235,48,34]].forEach(p=>{inst('con',p[0],p[3]/2,p[1],p[2],p[3],p[2],0x5a9448,i);inst('con',p[0],p[3]*.7,p[1],p[2]*.5,p[3]*.6,p[2]*.5,0x4f8a44,i)});
  /* Felswände am Nordrand und an den Seiten (fest) */
  for(let x=-186,i=0;x<=186;x+=26,i++)if(Math.abs(x)>24)berg(x+(i%3)*4,-258-(i%2)*8,22+(i*7)%9,30+(i*11)%22,i,i%4===0);
  [[-178,-160],[-178,-215],[178,-160],[178,-215]].forEach(p=>felswand(p[0],p[1],36,5,13,Math.PI/2));
  /* Alpenglühen: die Schneekappen der großen Gipfel leuchten beim Finale rosa und orange */
  lebendig.push({o:{userData:{anim:t=>{const a=abend;CAPMAT.color.setRGB(.957+.043*a,.973-.43*a,.98-.55*a);CAPMAT.emissive.setRGB(a*.85,a*.36,a*.28)}}},ph:0});
}

/* ==================== Etappe 2: Tal, Dorf und Alm (Orte 2 bis 12) ==================== */
function tierPfad(cx,cz,r){return pendel(spl([[cx-r*.5,cz-r*.4],[cx+r*.4,cz-r*.5],[cx+r*.5,cz+r*.3],[cx-r*.2,cz+r*.5],[cx-r*.55,cz+r*.1]],2),.5)}
function weideFl(b,r,boden,farbe){scheibe(b.x,b.z,r,boden||0x9ccb66,.08);zaunL(b.x,b.z,r+.4,Math.round(r*3.2),b.gap,3.6,farbe||0x8a5a32);sgMark(b.x,b.z,r+4)}
function weideTiere(cx,cz,r,fn,anz,sk,v,ph0){const L=tierPfad(cx,cz,r);for(let i=0;i<anz;i++)streif(fn,L,v||.35,(ph0||0)+i*L.L/anz,sk||1)}
function trachtFig(x,z,rot,k,s){const f=[[0x2a5a8a,0xf6f6f2,0x6b4626,'zoepfe'],[0xc03a4a,0x3a3a4a,0xe8c24a,'zoepfe'],[0x4a6a3a,0x6a4a32,0x2a1d14,'kurz'],[0xf6f6f2,0x4a3a2a,0xb5651d,'cap']][k%4];return fig(x,z,rot,f[0],f[1],f[2],f[3],s||1.3)}
/* ---------- 2. Dorfplatz mit Brunnen ---------- */
function ort2(){const b=zone('Dorfplatz'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10,0xcdc4b0,.09);
  cyl(2.4,.9,0x9a9fa4,bx,.45,bz,scene,true);cyl(2,.2,WASSER,bx,.86,bz,scene);cyl(.5,2.2,0xb8bcc2,bx,1.5,bz,scene);sph(.7,0xb8bcc2,bx,2.7,bz,scene,1,.5,1);kreis(bx,bz,2.6);
  const sp=cyl(.12,1.2,0x9fd8f0,bx,3.2,bz,scene);bewegt(sp,t=>{sp.scale.y=1.1+.2*Math.sin(t*6)});sitz(bx+1.9,.95,bz,0,3,1.4);sitz(bx-1.6,.95,bz+1,2,2,1.4);
  chalet(X(-15),Z(-9),8,6,R,{stein:1,rauch:1});chalet(X(-2),Z(-11),9,6.4,R,{h:3.6});
  (function(){const g=grp(X(12),0,Z(-10));box(5,4,7,0xf2eee4,0,2,0,g,true);giebel(g,5,7,4,0x8a3a2a,0xf2eee4);box(2.6,8,2.6,0xf2eee4,0,4,-3,g);cone(1.9,2.6,0x2a6a4a,0,9.3,-3,g);sph(.5,0xe8b830,0,10.9,-3,g);box(.7,1.2,.1,0x7a5230,0,1.2,3.55,g);box(.8,1.6,.08,0xcfeaf5,0,5.6,-1.5,g);sperrKasten(X(12),Z(-10),5.2,7.2,0);g.rotation.y=R})();
  (function(){const g=grp(X(8),0,Z(2));cyl(.2,10,0x9a6a3a,0,5,0,g,true);for(let i=0;i<8;i++){const r=box(.12,2.4,.04,[0xe0302a,0x4a88c8,0xf2c230,0xffffff][i%4],Math.cos(i*.8)*.6,7.6,Math.sin(i*.8)*.6,g);r.rotation.z=Math.cos(i*.8)*.2}const t=new THREE.Mesh(new THREE.TorusGeometry(.9,.15,5,12),mat(0x4a8a3a));t.position.y=9;t.rotation.x=Math.PI/2;g.add(t);for(let i=0;i<3;i++)cone(.6-i*.15,1.2,0x4a8a3a,0,9.9+i*.9,0,g);kreis(X(8),Z(2),.5)})();
  [[-7,5],[-3,6.5],[5,6]].forEach((p,i)=>bankW(X(p[0]),Z(p[1]),R+(i-1)*.5));[[-9,0],[9,-3],[0,7]].forEach(p=>laterne(X(p[0]),Z(p[1])));kuebel(X(-12),Z(0));kuebel(X(12),Z(1));
  trachtFig(X(-5),Z(2),.6,0,1.25);trachtFig(X(4),Z(4),3.6,2,1.3);trachtFig(X(-8),Z(-3),1.8,1,.9);trachtFig(X(-6.4),Z(-2),4.2,3,.85);trachtFig(X(6),Z(-5),R,3,1.3);
  streif(hundM,pendel(spl([[bx-6,bz+3],[bx-3,bz+7],[bx+5,bz+6],[bx+6,bz-2],[bx-2,bz-5]],1.5),.4),1.2,0,1.1);
  for(let i=0;i<12;i++){const a=i/12*6.28;blumeI(bx+Math.cos(a)*7.5,bz+Math.sin(a)*7.5,i%6)}}
/* ---------- 3. Berghotel ---------- */
function ort3(){const b=zone('Berghotel'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0xd8d0bc,.09);
  (function(){const g=grp(X(0),0,Z(-5));box(18,8.4,8,0xf4efe4,0,4.2,0,g,true);box(18.2,.3,8.2,0x8a5a32,0,2.8,0,g);box(18.2,.3,8.2,0x8a5a32,0,5.6,0,g);
    giebel(g,18,8,8.4,0x8a3a2a,0xf4efe4);
    [1,2].forEach(f=>{box(18,.14,1.6,HZ,0,f*2.8,4.7,g);box(18,.08,.08,HD,0,f*2.8+1,5.5,g);for(let i=0;i<=12;i++)box(.07,.9,.07,HD,-9+i*1.5,f*2.8+.5,5.5,g)});
    for(let f=0;f<3;f++)for(let i=0;i<6;i++){box(1.2,1.4,.1,0xcfeaf5,-7.2+i*2.9,1.5+f*2.8,4.05,g);box(.5,1.4,.12,0xc03a2a,-7.8+i*2.9,1.5+f*2.8,4.06,g);box(.5,1.4,.12,0xc03a2a,-6.6+i*2.9,1.5+f*2.8,4.06,g)}
    box(3.2,2.6,.2,0x6a4220,0,1.3,4.1,g);box(5,.2,2.4,0xc03a2a,0,3,5.2,g);[-1,1].forEach(s=>cyl(.12,3,0x6a4220,s*2.3,1.5,6.2,g));
    cyl(.08,8,0xe8e4da,8.2,13,0,g);vm(g);g.rotation.y=R;sperrKasten(X(0),Z(-5),18.4,8.4,0);fahne(X(10),Z(-1),9,0xc03a2a,0xffffff);fahne(X(-10),Z(-1),9,0x4a88c8,0xffffff)})();
  /* Terrasse und Pool */
  [[-8,6],[-3,8],[3,7]].forEach((p,i)=>schirm(X(p[0]),Z(p[1]),[0xc03a2a,0xf6f6f2,0x3b8fc4][i]));[[-8,6],[-3,8],[3,7]].forEach((p,i)=>{stuhl(X(p[0]+1.2),Z(p[1]+.4),R-1.6);stuhl(X(p[0]-1.2),Z(p[1]-.3),R+1.6)});
  (function(){const px=X(9),pz=Z(7);box(8,.5,5,0xcfd8e0,px,.25,pz,scene,true);box(7.2,.2,4.2,0x4ab0d8,px,.52,pz,scene);box(7.2,.04,4.2,0x8ad8f0,px,.6,pz,scene);sperrKasten(px,pz,8.2,5.2,0);[[-3,0],[-3,2]].forEach(p=>cyl(.05,1,0xc8c8c8,px+p[0]-3.6,.9,pz+p[1]-1,scene));
    [[-2,-3.6],[2,-3.6]].forEach(p=>{const l=box(.7,.12,1.8,0xf6f6f2,px+p[0],.4,pz+p[1],scene);l.rotation.x=-.3;box(.7,.4,.1,0xf6f6f2,px+p[0],.7,pz+p[1]-.9,scene)})})();
  fig(X(-2),Z(4),R+.4,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.2);fig(X(2),Z(2.5),R+3,0x4caf6a,0x4a4a5a,0x2a1d14,'kurz',1.3);fig(X(-6),Z(1),R-.8,0xf6f6f2,0x2a2a3a,0xb5651d,'pferd',1.3);
  kuebel(X(-12),Z(-1));kuebel(X(12),Z(-1));bankW(X(-11),Z(5),R+1.57);[[-9,0],[8,1]].forEach(p=>laterne(X(p[0]),Z(p[1])))}
/* ---------- 4. Bergsteigerschule ---------- */
function ort4(){const b=zone('Bergsteigerschule'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10.5,0xcdc4b0,.09);
  (function(){const g=grp(X(-4),0,Z(-6));g.rotation.y=R;box(8,8,2,0x8a8f94,0,4,0,g,true);for(let i=0;i<14;i++){const c=[0xe0302a,0xf2c230,0x3b8fc4,0x4caf6a,0xf59e3f,0xb06ae0][i%6];sph(.2,c,-3+(i%5)*1.5,1+Math.floor(i/5)*2.3+(i%3)*.3,1.1,g,1,.7,.6)}box(.14,8.4,.14,0x2a2a2e,-3.2,4.2,1.2,g);box(.14,8.4,.14,0xe0302a,3.2,4.2,1.2,g);box(8.4,.3,2.4,0x6a4220,0,8.1,0,g);vm(g);sperrKasten(X(-4),Z(-6),8.2,2.2,0);
    kletterer(g,-1.5,2.8,1.25,0x3b8fc4,0xe0302a).g.scale.setScalar(.8);kletterer(g,1.8,4.6,1.25,0xf59e3f,0xf2c230).g.scale.setScalar(.8)})();
  chalet(X(8),Z(-5),6,5,R,{h:3});
  [[-9,2,0xe0302a],[-6.4,4.5,0x3b8fc4]].forEach(p=>{const t=cone(2.2,2.6,p[2],X(p[0]),1.3,Z(p[1]),scene,true);t.rotation.y=.4;box(.1,1.8,.1,0xf6f6f2,X(p[0]),1.5,Z(p[1])+(b.dir>0?2.1:-2.1),scene);kreis(X(p[0]),Z(p[1]),1.8)});
  for(let i=0;i<4;i++){const g=grp(X(3+i*1.1),0,Z(3));cyl(.04,.9,0x6a4220,0,.45,0,g);const t=new THREE.Mesh(new THREE.TorusGeometry(.28,.07,5,10),mat([0xe0302a,0xf2c230,0x3b8fc4,0x4caf6a][i]));t.position.y=1;g.add(t)}
  box(4.2,.12,.12,0x6a4220,X(4.5),1.3,Z(3),scene);sack(X(-2),Z(2),0xb83a2e,1);sack(X(-.5),Z(3),0x3b6fc4,.9);sack(X(.6),Z(2.2),0x4a6a3a,1.1);
  fig(X(0),Z(5),R+3.14,0xd8302a,0x3a4a5a,0x2a1d14,'kurz',1.4);[[2.5,6],[4,7.4],[-1.4,7]].forEach((p,i)=>{const f=fig(X(p[0]),Z(p[1]),R+.5+i,[0xf59e3f,0x4caf6a,0x9b6fd0][i],0x3a4a6a,[0xe8c24a,0x6b4626,0x2a1d14][i],'cap',.95);hutAuf(f,[0xf2c230,0xe0302a,0x3b8fc4][i],.9)});
  kuebel(X(-10),Z(-2));kuebel(X(9),Z(4))}
/* ---------- 5. Bergwacht mit Rettungshubschrauber ---------- */
function ort5(){const b=zone('Bergwacht'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0xcdc4b0,.09);
  (function(){const g=stall(X(-5),Z(-6),11,6,3.6,0xf6f6f2,0xc03a2a,R);box(.6,.2,.04,0xc03a2a,-2,2.8,3.12,g);box(.2,.6,.04,0xc03a2a,-2,2.8,3.12,g);box(4,3,.2,0xc03a2a,2.6,1.5,3.1,g)})();
  scheibe(X(8),Z(2),6,0x8a8f94,.1);
  [[1.4],[-1.4]].forEach(p=>{const m=box(.6,.12,3.2,0xf6f6f2,X(8)+p[0],.17,Z(2),scene)});box(3,.12,.6,0xf6f6f2,X(8),.17,Z(2),scene);
  (function(){const h=heli(scene);h.userData.leer=1;h.position.set(X(8),.2,Z(2));h.rotation.y=b.dir>0?Math.PI/2:-Math.PI/2;h.scale.setScalar(1);kreis(X(8),Z(2),2.4)})();
  windsack(X(14),Z(-2),6);
  (function(){const g=grp(X(-6),0,Z(4));g.rotation.y=R+.3;box(4.2,1.2,2,0xc03a2a,0,1.1,0,g,true);box(2.2,1.1,1.9,0xc03a2a,.4,2.2,0,g);box(.06,.9,1.7,0x9fd0e8,1.45,2.3,0,g);box(4.3,.5,2.05,0xf6f6f2,0,1,0,g);[-1,1].forEach(s=>[-1.4,1.4].forEach(q=>cyl(.5,.35,0x2a2a2e,q,.5,s*.95,g).rotation.x=Math.PI/2));box(1.6,.2,.5,0x3b8fc4,.4,2.9,0,g);sperrKasten(X(-6),Z(4),4.4,2.2,R+.3)})();
  fig(X(0),Z(4),R+.5,0xc03a2a,0x3a3a4a,0x6b4626,'kurz',1.4);fig(X(2),Z(5),R-.4,0xc03a2a,0x3a3a4a,0xb5651d,'cap',1.35);fig(X(-1.4),Z(6.4),R+2,0xf2c230,0x3a3a4a,0x2a1d14,'kurz',1.3);
  streif(hundM,pendel(spl([[bx+2,bz+5],[bx+6,bz+8],[bx+10,bz+5],[bx+6,bz+2]],1.4),.35),1.2,0,1.2);
  (function(){const g=grp(X(-1),0,Z(-2.6));g.rotation.y=R+.2;box(.12,2.6,.9,0xe8a030,0,1.4,0,g,true);box(.5,.1,.9,0xe8a030,0,.2,0,g)})();
  kuebel(X(-12),Z(1));laterne(X(11),Z(6))}
/* ---------- 6. Dorfladen mit Bäckerei ---------- */
function ort6(){const b=zone('Dorfladen'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10.5,0xcdc4b0,.09);
  (function(){const g=chalet(X(-4),Z(-6),11,6,R,{h:3.6});markise(g,10,3.2,3.9,0xc03a2a,0xffffff,8);const t=new THREE.Mesh(new THREE.TorusGeometry(.45,.1,6,14),mat(0xd8a040));t.position.set(3.6,4.6,3.3);g.add(t);box(.9,.16,.16,0xd8a040,3.6,4.6,3.3,g);for(let i=0;i<4;i++)box(.9,.1,.1,0xe8b860,-3.6+i*.9,3,3.3,g)})();
  [[-9,3],[-5.2,3.4],[-1.4,3],[2.4,3.4]].forEach((p,i)=>{const g=grp(X(p[0]),0,Z(p[1]));g.rotation.y=R;box(2.4,.9,1,HZ,0,.45,0,g,true);const f=[0xe03a3a,0xf2c230,0x86c458,0xe8a050][i];for(let k=0;k<5;k++)sph(.2,f,-.9+k*.45,1.05,(k%2-.5)*.3,g);sperrKasten(X(p[0]),Z(p[1]),2.5,1.1,R)});
  kanne(X(6),Z(3));kanne(X(7),Z(3.8));tonne(X(8.4),Z(2));
  (function(){const g=grp(X(8),0,Z(-5));g.rotation.y=R;box(3.4,1.6,1.8,0x3a6a3a,0,1.4,0,g,true);box(1.8,1.2,1.7,0x3a6a3a,-1.2,2.5,0,g);[-1,1].forEach(s=>[-1,1].forEach(q=>cyl(.4,.3,0x2a2a2e,q*1.1,.4,s*.9,g).rotation.x=Math.PI/2));sperrKasten(X(8),Z(-5),3.6,2,R)})();
  fahrrad(X(-11),Z(2),1.57,0xe0302a);(function(){const f=fig(X(-3),Z(1.5),R+3.14,0xf6f6f2,0xf6f6f2,0x6b4626,'kurz',1.3);sph(.4,0xf6f6f2,0,.6,0,f.kopf,1,.7,1)})();
  fig(X(1),Z(5.2),R+.3,0xb06ae0,0x3a3a4a,0xe8c24a,'zoepfe',1.2);fig(X(-6),Z(6),R-.4,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1);
  bankW(X(4),Z(7),R);kuebel(X(-10),Z(-2));kuebel(X(9),Z(1));laterne(X(-8),Z(6))}
/* ---------- 7. Almhütte mit Sennerin ---------- */
function ort7(){const b=zone('Almhütte'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3);scheibe(bx,bz,10,0x9ccb66,.08);
  (function(){const g=stall(X(0),Z(-4),8,6,2.8,0x9a6a3a,0x6a5a4a,R);box(8.4,1.2,6.4,0x8a8f94,0,.6,0,g);for(let i=0;i<8;i++)box(1.1,.1,.8,0x7a8086,-3+(i%4)*2,3.9+Math.floor(i/4)*.3,(i<4?-1:1)*1.1,g).rotation.x=(i<4?-1:1)*-.5;box(.9,.9,.9,0x8a8f94,2,5,-1.2,g);rauch(g,2,5.6,-1.2);box(2.2,.2,1.4,HZ,-2,3,3.6,g);[-1,1].forEach(s=>cyl(.1,2.8,0x6a4220,-2+s*1,1.4,4,g))})();
  trog(X(-7),Z(2),1.57,0x6ec0ea);holzstapel(X(8),Z(-5),1.57);tisch(X(5),Z(4),0);bankW(X(5),Z(5.8),R);bankW(X(5),Z(2.2),R+Math.PI);
  (function(){const g=grp(X(-4.5),0,Z(4));cyl(.45,1.2,0x9a6a3a,0,.6,0,g,true);cyl(.5,.1,0x6a4220,0,1.2,0,g);cyl(.05,1.6,0x6a4220,0,1.9,0,g);box(.5,.08,.08,0x6a4220,.2,2.5,0,g);kreis(X(-4.5),Z(4),.6)})();
  [[8,1],[9,2.2]].forEach(p=>kanne(X(p[0]),Z(p[1])));
  (function(){const f=fig(X(-1),Z(3.6),R+3.14,0x2a5a8a,0x2a5a8a,0x6b4626,'zoepfe',1.3);box(.8,.9,.06,0xf6f6f2,0,1.0,.4,f.g)})();
  streif(hundM,pendel(spl([[bx-5,bz+4],[bx-1,bz+7],[bx+5,bz+6],[bx+6,bz+1]],1.4),.35),1.2,0,1.2);
  for(let i=0;i<10;i++){const a=nr()*6.28,r=6+nr()*3;arnika(bx+Math.cos(a)*r,bz+Math.sin(a)*r);enzian(bx+Math.cos(a+1)*(r+1),bz+Math.sin(a+1)*(r+1))}}
/* ---------- 8. Kuhalm ---------- */
function ort8(){const b=zone('Kuhalm'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.4);weideFl(b,17.5,0xa0d06a);weideTiere(bx,bz,17,kuh,7,1.15,.3);
  (function(){const g=stall(X(0),Z(-14),9,5,2.8,0xa8743f,0x6a4a32,R);box(9.2,.5,.3,0x6a4220,0,.5,2.6,g);sperrKasten(X(0),Z(-14),9,5,R)})();
  trog(X(-8),Z(-6),0,0x6ec0ea);trog(X(8),Z(-5),.4,0x6ec0ea);ballen(X(-12),Z(-10),.3);ballen(X(12),Z(-9),-.3);box(.8,.6,.8,0xe8e4da,X(5),.3,Z(2),scene,true);kreis(X(5),Z(2),.6);
  (function(){const g=grp(X(-3),0,Z(-4));cyl(.12,2,0x6a4220,0,1,0,g,true);const br=cyl(.3,1.2,0x2a2a2e,0,1.4,0,g);br.rotation.z=Math.PI/2;bewegt(br,t=>{br.rotation.x=t*1.5});kreis(X(-3),Z(-4),.5)})();
  fig(X(10),Z(5),R+2.4,0x4a6a3a,0x6a4a32,0x6b4626,'cap',1.3);for(let i=0;i<12;i++){const a=nr()*6.28,r=3+nr()*12;arnika(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.9)}}
/* ---------- 9. Ziegen- und Schafweide ---------- */
function ort9(){const b=zone('Ziegen- und Schafweide'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.4);weideFl(b,14.5,0xa0d06a);weideTiere(bx,bz,14,ziege,5,1.2,.4);weideTiere(bx,bz,14,schaf,5,1.15,.33,7);weideTiere(bx,bz,13,lamm,2,1.2,.45,3);
  (function(){const rx=bx-6,rz=bz-8,L2=felsgruppe(rx,rz,3.4,2.6,6,1,1.7,.9);[[0,0],[1,1]].forEach((q,i)=>{const z=ziege(scene);z.position.set(rx+(i?1.2:-1),2.1+i*.4,rz-(i?.5:0));z.rotation.y=i?2.2:.7;z.scale.setScalar(1.2);lebendig.push({o:z,ph:i*2})})})();
  unterstand(X(8),Z(-9),R,0x8a5a32);(function(){const g=grp(X(-9),0,Z(-3));box(2.4,.2,.5,HZ,0,1,0,g,true);for(let i=0;i<5;i++)box(.06,.7,.06,HD,-1+i*.5,.55,.25,g);kreis(X(-9),Z(-3),1.2)})();
  trog(X(2),Z(4),0,0x6ec0ea);box(.7,.5,.7,0xf2f2f2,X(5),.25,Z(3),scene,true);kreis(X(5),Z(3),.5);
  fig(X(10),Z(3),R+1.8,0x2f6a3a,0x5a4a3a,0x6b4626,'cap',1.3);streif(hundM,pendel(spl([[bx+8,bz+2],[bx+4,bz+6],[bx-2,bz+7],[bx-7,bz+3]],1.4),.35),1.4,0,1.2)}
/* ---------- 10. Sennerei (Käse) ---------- */
function ort10(){const b=zone('Sennerei'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10.5,0xcdc4b0,.09);
  chalet(X(-4),Z(-5),9,6,R,{h:3.4,rauch:1});
  (function(){const g=grp(X(7),0,Z(-6));g.rotation.y=R;[-1,1].forEach(s=>[-1,1].forEach(q=>cyl(.12,2.6,0x6a4220,s*2,1.3,q*1.4,g,true)));box(4.6,.2,3.4,0x7a4a32,0,2.7,0,g);for(let r=0;r<3;r++)box(3.6,.1,2.4,0x8a5a32,0,.5+r*.8,0,g);for(let r=0;r<3;r++)for(let k=0;k<4;k++)cyl(.45,.3,k%2?0xf0c850:0xe8b840,-1.5+k*1,.7+r*.8,(r%2)*.4,g);sperrKasten(X(7),Z(-6),4.6,3.4,R)})();
  (function(){const kx=X(-2),kz=Z(4);cyl(1.2,1,0xb87333,kx,1.4,kz,scene,true);cyl(1.3,.2,0xb87333,kx,1.95,kz,scene);cyl(.7,.1,0xf6e8c0,kx,1.92,kz,scene);cyl(.2,.5,0x2a2a2e,kx,2.2,kz,scene);[-1,1].forEach(s=>cyl(.1,1.4,0x2a2a2e,kx+s*1.3,.7,kz,scene));cyl(1.3,.5,0x3a3a3e,kx,.4,kz,scene);flamme(kx,.3,kz,.7);kreis(kx,kz,1.5)})();
  for(let i=0;i<5;i++)cyl(.5,.3,i%2?0xf0c850:0xe8b840,X(5),.15+i*.3,Z(4),scene,true);kreis(X(5),Z(4),.6);[[-8,2],[-9,3]].forEach(p=>kanne(X(p[0]),Z(p[1])));[[-6.5,5],[-5.5,5.6]].forEach(p=>kanne(X(p[0]),Z(p[1])));
  (function(){const g=grp(X(9),0,Z(3));g.rotation.y=R+.3;cyl(.9,2.8,0xe8e8e4,0,1.6,0,g,true).rotation.z=Math.PI/2;box(3.6,.3,1.4,0x3a3a3e,0,.6,0,g);[-1,1].forEach(s=>cyl(.4,.3,0x2a2a2e,s*1.4,.4,.9,g).rotation.x=Math.PI/2);sperrKasten(X(9),Z(3),3.8,1.8,R+.3)})();
  fig(X(0),Z(1.5),R+3.14,0xf6f6f2,0x2a5a8a,0xe8c24a,'zoepfe',1.3);fig(X(3),Z(6.4),R+.4,0x4caf6a,0x4a4a5a,0x6b4626,'kurz',1);kuebel(X(-9),Z(-1))}
/* ---------- 11. Alpenblumenwiese ---------- */
function ort11(){const b=zone('Alpenblumenwiese'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.4);scheibe(bx,bz,14,0xa4d06a,.08);
  const f=[enzian,edelweiss,arnika,glocke,(x,z)=>blumeI(x,z)];for(let i=0;i<1100;i++){const a=nr()*6.28,r=Math.sqrt(nr())*13.5,x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(b.dir*(z-bz)>9&&Math.abs(x-bx)<3)continue;f[i%5](x,z)}
  for(let i=0;i<6;i++){const a=i*1.1;arose(bx+Math.cos(a)*11,bz+Math.sin(a)*11,1.1)}
  (function(){const P=spl([[bx,bz+b.dir*13],[bx-3,bz+b.dir*8],[bx+3,bz+b.dir*2],[bx-2,bz-b.dir*4],[bx+1,bz-b.dir*9]],2);wegBand(P,2,HZ,.1)})();
  bankW(X(6),Z(-2),R+1.57);bankW(X(-6),Z(1),R-1.57);[[-4,-8],[3,-9],[8,5],[-9,6]].forEach((p,i)=>falter(X(p[0]),Z(p[1]),3,1.3+i*.3,i*1.5,[0xf6d030,0xf47ab0,0xffffff,0xf08a2a][i]));
  [[-1,3],[4,-1],[-6,-4]].forEach((p,i)=>{fig(X(p[0]),Z(p[1]),R+i,[0xe0605a,0x3b8fc4,0x4caf6a][i],0x3a4a6a,[0xe8c24a,0x2a1d14,0x6b4626][i],'zoepfe',.95)});
  zaunR(bx-14.5,bz-14.5,bx+14.5,bz+14.5,b.dir,4,0xe8e0d0)}
/* ---------- 12. Imkerei mit Bienenstand ---------- */
function ort12(){const b=zone('Imkerei'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,9.5,0x9ccb66,.08);
  (function(){const g=stall(X(0),Z(-5),8,4.4,2.6,0xf4efe4,0x8a5a32,R);for(let r=0;r<2;r++)for(let k=0;k<5;k++)box(1.1,.9,.9,[0x4a88c8,0xf2c230,0xf6f6f2,0xe0605a,0x4caf6a][(k+r)%5],-3+k*1.5,1+r*1,2.5,g)})();
  [[-7,3],[-4.4,4.4],[-1.8,3],[1.2,4.6],[4,3.2],[6.8,4.6]].forEach((p,i)=>{const g=grp(X(p[0]),0,Z(p[1]));g.rotation.y=R;[0,1,2].forEach(k=>box(1,.5,1,[0x4a88c8,0xf2c230,0xf6f6f2][(i+k)%3],0,.9+k*.5,0,g,true));box(1.2,.12,1.2,0x6a4220,0,2.5,0,g);box(.9,.1,.1,0x2a2a2a,0,.62,.52,g);cyl(.06,.6,0x6a4220,.4,.3,.4,g);cyl(.06,.6,0x6a4220,-.4,.3,.4,g);kreis(X(p[0]),Z(p[1]),.9)});
  schwarm(gSph,0xf2c230,36,(i,t)=>{const k=i%6,a=t*(1.5+i%3*.4)+i,hx=[-7,-4.4,-1.8,1.2,4,6.8][k],hz=[3,4.4,3,4.6,3.2,4.6][k];return[X(hx)+Math.cos(a)*1.6,1.4+Math.sin(a*1.3)*.5,Z(hz)+Math.sin(a)*1.6+b.dir*.5,.07,.05,.05,0]});
  (function(){const f=fig(X(-3),Z(1),R+3.2,0xf6f6f2,0xf6f6f2,0x6b4626,'kurz',1.3);cyl(.8,.1,0xf6f6f2,0,.6,0,f.kopf);cyl(.5,.5,0xf6f6f2,0,.85,0,f.kopf);sph(.55,0xe8e8e8,0,0,0,f.kopf,1,1.05,1)})();
  (function(){const g=grp(X(5),0,Z(-3));box(2,.9,1,HZ,0,.45,0,g,true);[-.6,0,.6].forEach((x,i)=>{cyl(.28,.4,i%2?0xe8a020:0xf2c230,x,1.1,0,g);cyl(.3,.06,0xd8d0c0,x,1.34,0,g)});sperrKasten(X(5),Z(-3),2.2,1.2,R)})();
  cyl(.5,1.2,0xc4cad0,X(8),.6,Z(-1),scene,true);kreis(X(8),Z(-1),.6);for(let i=0;i<30;i++){const a=nr()*6.28,r=3+nr()*5.5;glocke(bx+Math.cos(a)*r,bz+Math.sin(a)*r);arnika(bx+Math.cos(a+2)*r,bz+Math.sin(a+2)*r)}}
function etappe2(){ort2();ort3();ort4();ort5();ort6();ort7();ort8();ort9();ort10();ort11();ort12()}

/* ==================== Etappe 3: Bergwald, Wasser und Energie (Orte 13 bis 24) ==================== */
/* Bach mit Farben: Uferstreifen, Wasser, Mitte; Hindernis entlang beider Ufer außer an Brücken/Furten (br) */
function bachFarbe(s,w,br,c1,c2){wegBand(s,w+1.4,0xb9a577,.056);wegBand(s,w,c1,.082);wegBand(s,w*.5,c2,.088);const r=w/2+.15;
  for(let i=0;i<s.length-1;i++){if(br.some(q=>Math.hypot(s[i][0]-q[0],s[i][1]-q[1])<3.9||Math.hypot(s[i+1][0]-q[0],s[i+1][1]-q[1])<3.9))continue;sperrLinie(s[i][0],s[i][1],s[i+1][0],s[i+1][1],r)}
  for(let i=1;i<s.length-1;i+=2)inst('sph',s[i][0]+(i%4?1.8:-1.8),.17,s[i][1]+(i%3-1)*.8,.4+nr()*.3,.26,.38,0x8e949a)}
function ellipse(cx,cz,rx,rz,n){const P=[];for(let i=0;i<(n||24);i++){const a=i/(n||24)*Math.PI*2;P.push([cx+Math.cos(a)*rx,cz+Math.sin(a)*rz])}return bahn(P)}
function trittstein(x,z,s){cyl(.55*(s||1),.16,0x9a9ea4,x,.1,z,scene,true)}
/* ---------- 13. Holzfällerplatz mit Sägewerk ---------- */
function ort13(){const b=zone('Holzfällerplatz'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0xb8a888,.09);
  (function(){const g=grp(X(-3),0,Z(-7));g.rotation.y=R;[[-3.6,-2.2],[3.6,-2.2],[-3.6,2.2],[3.6,2.2]].forEach(p=>cyl(.2,3.4,0x6a4220,p[0],1.7,p[1],g,true));const r=box(9,.2,6.4,0x7a4a32,0,3.5,0,g,true);r.rotation.x=.12;
    box(7,.5,1.2,0x6a6a70,0,.6,0,g,true);[-1,1].forEach(s=>box(7,.1,.14,0x3a3a3e,0,.9,s*.5,g));const ba=cyl(.45,5,0xa8743f,-1,1.45,0,g);ba.rotation.z=Math.PI/2;
    const sg=grp(2.6,1.9,0,g);const sw=cyl(1.1,.06,0xc8ccd4,0,0,0,sg);sw.rotation.z=Math.PI/2;for(let i=0;i<10;i++){const a=i*.628;box(.08,.2,.2,0xc8ccd4,0,Math.sin(a)*1.1,Math.cos(a)*1.1,sg)}vm(sg);bewegt(sg,t=>{sg.rotation.x=-t*9});box(.3,2.3,.3,0x6a6a70,2.6,1.1,0,g);sperrKasten(X(-3),Z(-7),9,6,R)})();
  [[8,-3,0],[8,-6.4,.1],[8,-9.8,-.1]].forEach(p=>holzstapel(X(p[0]),Z(p[1]),1.57+p[2]));[[-9,0],[-9.6,3]].forEach(p=>holzstapel(X(p[0]),Z(p[1]),.1));
  for(let i=0;i<3;i++){const g=grp(X(2+i*2.6),0,Z(-1));for(let k=0;k<5;k++)box(2,.12,1.4,0xe0c890,0,.1+k*.14,0,g);box(2.2,.1,1.5,0x6a4220,0,.02,0,g);kreis(X(2+i*2.6),Z(-1),1)}
  cone(1.8,1.2,0xe8d8a8,X(-8),.6,Z(-7),scene);kreis(X(-8),Z(-7),1.4);stumpf(X(-6),Z(3),1.2);stumpf(X(-4.6),Z(4.4),.9);stamm(X(6),Z(4),5,.3,.5);stamm(X(9),Z(6),4,-.4,.4);
  (function(){const t=trecker(scene);t.position.set(X(-9),0,Z(-3.4));t.rotation.y=b.dir>0?Math.PI/2:-Math.PI/2;sperrKasten(X(-9),Z(-3.4),3,9,0)})();
  [[-2,2.4,0xf59e3f],[1.4,5,0xf59e3f]].forEach((p,i)=>{const f=fig(X(p[0]),Z(p[1]),R+i*2,p[2],0x3a4a3a,0x6b4626,'kurz',1.35);hutAuf(f,0xf59e3f,1)});fig(X(4),Z(6),R+2.4,0x4a6a3a,0x3a3a4a,0x2a1d14,'cap',1);
  for(let i=0;i<4;i++)arose(bx+Math.cos(i*1.5)*11.5,bz+Math.sin(i*1.5)*11.5,1)}
/* ---------- 14. Bergwald-Lehrpfad ---------- */
function ort14(){const b=zone('Bergwald-Lehrpfad'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,13,0x6a9a48,.07);
  weg(spl([[X(0),Z(12)],[X(-8),Z(6)],[X(-9),Z(-4)],[X(0),Z(-10)],[X(9),Z(-4)],[X(8),Z(6)],[X(0),Z(12)]],2),2.4,0xa89870);
  (function(){const sx=X(-11.5),sz=Z(-2);cyl(1.3,.5,0xcfa86a,sx,.25,sz,scene,true);[.3,.6,.9].forEach(r=>{const t=new THREE.Mesh(new THREE.TorusGeometry(r,.025,4,18),mat(0x8a6a3a));t.rotation.x=Math.PI/2;t.position.set(sx,.51,sz);scene.add(t)});kreis(sx,sz,1.4)})();
  (function(){const sx=X(-6),sz=Z(-9);cyl(.12,2.4,0x6a4220,sx-.8,1.2,sz,scene,true);cyl(.12,2.4,0x6a4220,sx+.8,1.2,sz,scene,true);box(2.2,2,.5,0x8a5a32,sx,1.5,sz,scene,true);for(let i=0;i<14;i++)box(.12,.12,.5,[0x2a1a10,0xc8a060][i%2],sx-.9+(i%7)*.3,1.05+Math.floor(i/7)*.9,sz+.28,scene);box(2.5,.2,.9,0x7a3a2a,sx,2.6,sz,scene);kreis(sx,sz,1.3)})();
  (function(){const sx=X(8),sz=Z(-8);cyl(.1,2.8,0x6a4220,sx,1.4,sz,scene,true);box(.9,.7,.9,0xa8743f,sx,3.1,sz,scene);box(1.1,.1,1.1,0x7a3a2a,sx,3.55,sz,scene);sitz(sx+.6,2.2,sz,1,0,1.3);sitz(sx-.5,3.55,sz+.1,0,5,1.3);kreis(sx,sz,.4)})();
  stamm(X(11),Z(3),4,1.2,.5);[[11,3],[11.7,2],[10.4,5]].forEach((p,i)=>{cyl(.1,.4,0xf2eee4,X(p[0]),.2,Z(p[1]),scene);sph(.3,i%2?0xd8302a:0xe8a030,X(p[0]),.45,Z(p[1]),scene,1,.6,1)});
  [[3,2],[6,3.4],[0,5]].forEach((p,i)=>{cyl(.14,.9,0xf2eee4,X(p[0]),.45,Z(p[1]),scene,true);sph(.7,0xd8302a,X(p[0]),.95,Z(p[1]),scene,1,.6,1);for(let k=0;k<4;k++)sph(.1,0xffffff,X(p[0])+Math.cos(k*1.6)*.4,1.15,Z(p[1])+Math.sin(k*1.6)*.35,scene);kreis(X(p[0]),Z(p[1]),.8)});
  (function(){const tx=X(-3),tz=Z(-3);[[-1.2,-1.2],[1.2,-1.2],[-1.2,1.2],[1.2,1.2]].forEach(p=>cyl(.14,5,0x6a4220,tx+p[0],2.5,tz+p[1],scene,true));box(3.2,.2,3.2,HZ,tx,5,tz,scene);[-1,1].forEach(s=>{box(.08,.9,3.2,HD,tx+s*1.5,5.5,tz,scene);box(3.2,.9,.08,HD,tx,5.5,tz+s*1.5,scene)});for(let i=0;i<7;i++)box(1,.1,.3,0x8a5a32,tx+1.5,.4+i*.7,tz-1.1+(i%2)*.1,scene);sperrKasten(tx,tz,3,3,0)})();
  for(let i=0;i<3;i++)box(2,.15,2,[0xe8d8a8,0x8a8f94,0x9a6a3a][i],X(6+i*2.2),.08,Z(-1),scene);
  fig(X(0),Z(-1),R+.5,0x4a6a3a,0x4a3a2a,0x6b4626,'cap',1.35);[[-2,3],[3,0],[-7,2]].forEach((p,i)=>fig(X(p[0]),Z(p[1]),R+i*2,[0xe0605a,0x3b8fc4,0xf59e3f][i],0x3a4a6a,[0xe8c24a,0x2a1d14,0x6b4626][i],'zoepfe',.95));
  (function(){const hx=X(-9),hz=Z(6.5),cs=[0xc8a060,0x8a5a32,0xe8d8a8,0x6a4220];box(2.8,2.4,.6,0x8a5a32,hx,1.7,hz,scene,true);box(3.2,.25,1,0x7a3a2a,hx,3,hz,scene);[-1,1].forEach(q=>cyl(.1,.5,0x6a4220,hx+q*1.2,.25,hz,scene));
    for(let r=0;r<3;r++)for(let c=0;c<4;c++){const col=cs[(r+c)%4];[-1,1].forEach(sd=>{box(.5,.5,.06,col,hx-.9+c*.6,.95+r*.7,hz+sd*.33,scene);sph(.06,0x2a1a10,hx-.9+c*.6-.1,.95+r*.7+.1,hz+sd*.37,scene);sph(.06,0x2a1a10,hx-.9+c*.6+.1,.95+r*.7-.1,hz+sd*.37,scene)})}
    sperrKasten(hx,hz,3,1,0)})();
  stamm(X(13),Z(7),3.2,.3,.45);stamm(X(13.4),Z(8),2.6,-.2,.38);stamm(X(12.8),Z(7.6),2.2,.9,.32);sph(.4,0x5a8a3a,X(13),.9,Z(7.4),scene,1.4,.5,1);
  fernrohr(X(9),Z(9.5),R+Math.PI,1.5);
  [[-12,2],[-7,-5],[6,-6],[11,-3],[-10,10],[4,10],[14,3],[-13,-4]].forEach((p,i)=>{for(let k=0;k<7;k++){const a=k*.9+i;inst('sph',X(p[0])+Math.cos(a)*.55,.32,Z(p[1])+Math.sin(a)*.55,.95,.14,.28,0x3f8a3a,-a)}});
  [[-13,-7],[14,-5],[10,10],[-5,12.5],[1,-12],[-14,6]].forEach((p,i)=>busch(X(p[0]),Z(p[1]),1+i%3*.15));
  [[-12,-8],[12,-9],[-4,11]].forEach((p,i)=>fichte(X(p[0]),Z(p[1]),.9+i*.1))}
/* ---------- Felsen-Hilfe für Gämse und Steinbock ---------- */
function felsStein(x,z,r,y,k){const m=sph(r,GRAU[k%5],x,y,z,scene,1.1,.9,1);m.castShadow=true;kreis(x,z,r*.95);return y+.9*r}
/* ---------- 15. Gämsenfelsen ---------- */
function ort15(){const b=zone('Gämsenfelsen'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0x7a9a5a,.07);
  const A=felsStein(X(-5),Z(-10),3.6,2.2,0),B=felsStein(X(4),Z(-10),4.4,2.6,1),C=felsStein(X(-.5),Z(-7.5),2.4,1.2,2);felsStein(X(10),Z(-8),2.4,1.2,3);felsStein(X(-10),Z(-6),2,1,4);
  [[X(-5),Z(-10),A,.8],[X(4),Z(-10),B,2.4],[X(-.5),Z(-7.5),C,-1.2],[X(4.8),Z(-9),B-.4,1.5]].forEach((p,i)=>{const g=gams(scene);g.position.set(p[0],p[2]-.15,p[1]);g.rotation.y=p[3];g.scale.setScalar(1.25);lebendig.push({o:g,ph:i*1.9})});
  weideTiere(bx,bz-b.dir*2,8,gams,2,1.25,.45);const g2=gams(scene);g2.position.set(X(7),0,Z(2));g2.rotation.y=-.6;g2.scale.setScalar(1.25);lebendig.push({o:g2,ph:3});kreis(X(7),Z(2),.7);
  zaunR(bx-9,bz-3,bx+9,bz+6,b.dir,4,0x9a8a6a);fernrohr(X(-3),Z(8),Math.PI,1.5);bankW(X(3),Z(9),R);fig(X(-6),Z(8.4),R+3.4,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.95);fig(X(0),Z(8.6),R+3,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.3);
  for(let i=0;i<4;i++)arose(bx+(i-1.5)*5,bz-b.dir*5,1)}
/* ---------- 16. Steinbock-Felsen ---------- */
function ort16(){const b=zone('Steinbock-Felsen'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11.5,0x7a9a5a,.07);
  cone(6.4,9.6,GRAU[0],X(-3),4.8,Z(-9),scene,true);kreis(X(-3),Z(-9),6);sph(2.1,GRAU[2],X(-3),9.3,Z(-9),scene,1.15,.75,1);sph(1.3,GRAU[4],X(-1.4),8.4,Z(-8.2),scene,1.1,.8,1);cone(4.2,5.6,GRAU[3],X(5),2.8,Z(-8),scene,true);kreis(X(5),Z(-8),3.9);sph(1.5,GRAU[1],X(5),5.4,Z(-8),scene,1.2,.7,1);felsgruppe(X(-3),Z(-9),7,5,6,.9,1.8,.6);
  [[4.2,0],[7.2,1]].forEach((p,i)=>{const rr=6.4*(1-p[0]/9.6);box(2.6,.35,2.2,GRAU[2],X(-3)+(i?-1:1)*(rr-.4),p[0],Z(-9),scene,true).rotation.y=i?.4:-.3;
    const s=steinbock(scene);s.position.set(X(-3)+(i?-1:1)*(rr-.3),p[0]+.15,Z(-9));s.rotation.y=i?Math.PI+.3:-.3;s.scale.setScalar(1.4);lebendig.push({o:s,ph:i*2.2})});
  (function(){const s=steinbock(scene);s.position.set(X(5),3.4,Z(-8)+(b.dir>0?-.3:.3));s.rotation.y=b.dir>0?-1.7:1.7;s.scale.setScalar(1.4);lebendig.push({o:s,ph:5});box(3,.6,2,GRAU[4],X(5),.3,Z(-4),scene,true);sperrKasten(X(5),Z(-4),3,2,0);const s2=steinbock(scene);s2.position.set(X(5),.6,Z(-4));s2.rotation.y=R+1.5;s2.scale.setScalar(1.5);lebendig.push({o:s2,ph:1.3})})();
  weideTiere(bx,bz,9,steinbock,2,1.4,.4);weideTiere(bx,bz,8,gams,1,1.25,.45,5);
  (function(){const px=X(2),pz=Z(8),zf=pz+(b.dir>0?-2:2);box(8,.12,4,HZ,px,.07,pz,scene).receiveShadow=true;sperrLinie(px-4,zf,px+4,zf,.1);box(8,.1,.1,HD,px,1,zf,scene);for(let i=0;i<5;i++)box(.12,1,.12,HD,px-4+i*2,.5,zf,scene)})();
  fernrohr(X(-1),Z(7),R+Math.PI,1.5);bankW(X(5),Z(9),R);fig(X(-4),Z(8),R+3.4,0xf59e3f,0x3a4a6a,0x6b4626,'cap',1.3);fig(X(8),Z(7),R+2.8,0x9b6fd0,0x4a4a5a,0xe8c24a,'pferd',.9)}
/* ---------- 17. Murmeltierwiese ---------- */
function ort17(){const b=zone('Murmeltierwiese'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11.5,0xa4d06a,.08);
  const P=[[-7,-6,.6],[-2,-8,2.4],[5,-7,-.8],[8,-1,3.8],[-8,1,1.2],[1,-1,-2.4],[-4,4,0],[4,4,2.7]];
  P.forEach((p,i)=>{if(i===5)return;const x=X(p[0]),z=Z(p[1]);const m=sph(1.2,0x7a5a3a,x,0,z,scene,1.5,.55,1.3);m.receiveShadow=true;sph(.4,0x1a120a,x+(i%2?.7:-.7),.2,z,scene,.5,.7,.5);kreis(x,z,1.3);const t=murmel(scene);t.position.set(x+(i%2?-.9:.9),.15,z+.6);t.rotation.y=p[2];t.scale.setScalar(1.25);lebendig.push({o:t,ph:i*1.7});kreis(t.position.x,t.position.z,.5)});
  (function(){const x=X(1),z=Z(-1);box(2.8,.8,2.2,GRAU[2],x,.4,z,scene,true);sperrKasten(x,z,2.8,2.2,0);const m=molli(scene);m.position.set(x,.8,z);m.rotation.y=R;m.scale.setScalar(2.2);lebendig.push({o:m,ph:.5})})();
  weideTiere(bx,bz+b.dir*2,7,murmel,3,1.25,.7);
  zaunR(bx-11,bz-b.dir*4-3,bx+11,bz+b.dir*8,b.dir,4,0xa8885a);fernrohr(X(-6),Z(9.4),R+Math.PI,1.5);bankW(X(6),Z(10.4),R);fig(X(0),Z(9.6),R+3,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.95);
  for(let i=0;i<30;i++){const a=nr()*6.28,r=3+nr()*8;edelweiss(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.9);if(i%2)glocke(bx+Math.cos(a+2)*r,bz+Math.sin(a+2)*r*.9)}}
/* ---------- 18. Adlerhorst mit Beobachtungsplatz ---------- */
function ort18(){const b=zone('Adlerhorst'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11.5,0x8a9a68,.07);
  cone(7,12.5,GRAU[1],X(0),6.25,Z(-9),scene,true);kreis(X(0),Z(-9),6.6);cyl(2.1,.7,GRAU[2],X(0),12.2,Z(-9),scene,true);sph(1.4,GRAU[3],X(2),11,Z(-8),scene,1.1,.8,1);cone(4.2,7,GRAU[4],X(-5),3.5,Z(-8),scene,true);kreis(X(-5),Z(-8),3.9);
  (function(){const nx=X(0),nz=Z(-9);const n=new THREE.Mesh(new THREE.TorusGeometry(1.1,.35,6,14),mat(0x6a4a2a));n.rotation.x=Math.PI/2;n.position.set(nx,12.7,nz);scene.add(n);sph(1,0x5a3a20,nx,12.5,nz,scene,1.1,.35,1.1);for(let i=0;i<6;i++){const s=cyl(.05,1.8,0x7a5a30,nx+Math.cos(i*1.05)*1.2,12.9,nz+Math.sin(i*1.05)*1.2,scene);s.rotation.z=Math.cos(i)*.7;s.rotation.x=Math.sin(i)*.7}
    const a=adlerSitz(scene,1.7);a.position.set(nx-.2,13,nz);a.rotation.y=R+.5;lebendig.push({o:a,ph:0});sph(.2,0xf2f2ea,nx+.8,13.2,nz+.3,scene,1,1.3,1);sph(.2,0xf2f2ea,nx+.5,13.2,nz-.7,scene,1,1.3,1)})();
  (function(){const tx=X(8),tz=Z(-5);cyl(.6,8,0x5a4a3a,tx,4,tz,scene,true);kreis(tx,tz,.7);cone(3,3.6,0x2f6a3a,tx,7,tz,scene);cone(2.4,3.2,0x3a7a44,tx,9,tz,scene);cone(1.6,2.6,0x44864c,tx,10.9,tz,scene);[[1.4,.8,5.4],[-1.3,-.4,4.4],[.6,-1.4,6.2]].forEach(p=>{const c=cyl(.16,2.2,0x5a4a3a,tx+p[0]*.7,p[2],tz+p[1],scene);c.rotation.z=-p[0]*.6});const a=adlerSitz(scene,1.5);a.position.set(tx+1.2,5.6,tz+.8);a.rotation.y=-.6;lebendig.push({o:a,ph:2})})();
  (function(){const px=X(0),pz=Z(5);box(10,.12,5,HZ,px,.07,pz,scene).receiveShadow=true;const e=(ax,az,bx2,bz2)=>{box(Math.hypot(bx2-ax,bz2-az),.1,.1,HD,(ax+bx2)/2,1,(az+bz2)/2,scene).rotation.y=Math.atan2(-(bz2-az),bx2-ax);sperrLinie(ax,az,bx2,bz2,.12)};const zf=pz+b.dir*-2.5;e(px-5,zf,px+5,zf);for(let i=0;i<6;i++)box(.12,1,.12,HD,px-5+i*2,.5,zf,scene);
    [-3,0,3].forEach(x=>fernrohr(px+x,zf+b.dir*.8,R+Math.PI,1.5));bankW(px-3,pz+b.dir*2,R);bankW(px+3,pz+b.dir*2,R)})();
  fig(X(-2),Z(3),R+3.4,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.95);fig(X(2),Z(3.4),R+3,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.3);
  [[bx,bz-b.dir*4,12,24,0,.24],[bx,bz,16,30,2.1,.2],[bx+4,bz-b.dir*8,10,34,4,.3],[bx-6,bz,18,28,5.2,.18]].forEach(a=>adler(a[0],a[1],a[2],a[3],a[4],a[5]))}
/* ---------- 19. Bergbach mit Mühle ---------- */
function ort19(){const b=zone('Bergbach mit Mühle'),bx=b.x,bz=b.z;const br=[];br.push(bruecke(94,-24,BACH1,3));
  weg(spl([[96,roadZ(96,-8)],[98,-13],[96,-19],[91,-29],[90,-32]],3),3,0xc8b890);
  bachFarbe(BACH1,3,br,WASSER,0x6ec0ea);BACH1.forEach(q=>sgMark(q[0],q[1],4));
  (function(){const g=stall(84,-27.2,7,5,3,0xa8743f,0x6a4a32,0);const wg=grp(84,2.5,-23.4);[-.5,.5].forEach(z=>{const t=new THREE.Mesh(new THREE.TorusGeometry(2.4,.12,5,20),mat(0x6a4220));t.position.z=z;wg.add(t)});
    for(let i=0;i<12;i++){const a=i*.5236;box(.16,.9,1.2,0x8a5a32,Math.cos(a)*2.4,Math.sin(a)*2.4,0,wg).rotation.z=a}for(let i=0;i<6;i++)box(.14,4.8,.2,0x6a4220,0,0,0,wg).rotation.z=i*.5236;cyl(.3,1.4,0x3a2a1a,0,0,0,wg).rotation.x=Math.PI/2;vm(wg);bewegt(wg,t=>{wg.rotation.z=-t*.55});
    box(1.2,.3,.5,0x6a4220,84-2.4,3.4,-24,scene);kreis(84,-23.4,.5)})();
  sack(78,-24,0xe8e0c8,1.1);sack(78.8,-25.2,0xe8e0c8,.9);sack(77.2,-25.6,0xd8cfb4,1);
  (function(){const g=grp(80,0,-34);cyl(.9,.3,0x9a9ea4,0,.5,0,g,true);cyl(.9,.3,0x8a8e94,0,.15,0,g);kreis(80,-34,1);const s=cyl(.9,.3,0x9a9ea4,0,1.1,0,g);s.rotation.x=1.1;s.position.set(.2,1,.9)})();
  (function(){const g=grp(90,0,-26);box(2.2,.9,1.4,HZ,0,.45,0,g,true);for(let i=0;i<5;i++)sack(0,0,0xe8e0c8,.6,g).position.set(-.8+i*.4,1.1,0);sperrKasten(90,-26,2.4,1.6,0)})();
  streif(ente,pendel(BACH1.slice(8,15),.3),.5,0,1.2);streif(ente,pendel(BACH1.slice(10,17),.3),.45,3,1.1);
  for(let i=0;i<2;i++)streif(p=>fischK(p,i?0xc88a58:0x8aa0a8),pendel(BACH1.slice(4+i*6,10+i*6),.2),.7,i*5,1.3);
  fig(76,-19,1.5,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.3);fig(88,-17,-1.5,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);
  for(let i=0;i<8;i++){const a=nr()*6.28,r=4+nr()*9;glocke(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.7);arnika(bx+Math.cos(a+2)*r,bz+Math.sin(a+2)*r*.7)}}
/* ---------- 20. Wasserfall ---------- */
function ort20(){const bx=124,bz=-41;ast(zone('Wasserfall'));
  felswand(124,-48.5,38,6,16,0,GRAU[1]);felswand(104,-47,16,5,11,.2);felswand(144,-47,16,5,11,-.2);box(3.2,14.4,.4,0xe4f4fa,124,7.4,-45.6,scene);
  fallen(124,-45.2,3,14,30);teichBau(bx,bz,5.8,0x3f93b8);
  [[0,0],[1.6,.4],[-1.5,.5],[.4,-.8]].forEach((p,i)=>{const m=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.35,depthWrite:false}));m.userData.keep=1;scene.add(m);bewegt(m,t=>{const u=(t*.3+i*.27)%1;m.position.set(bx+p[0]*1.5,.5+u*5,bz-4.6+p[1]);m.scale.setScalar(.8+u*1.8);m.material.opacity=.35*(1-u)})});
  [0xe0302a,0xf59e3f,0xf2d030,0x4caf6a,0x3b8fc4,0x7a5ac8].forEach((c,i)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(9-i*.45,.22,6,32,Math.PI),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.32,depthWrite:false}));t.position.set(bx-8,0,bz+3);t.rotation.y=-.5;t.userData.keep=1;scene.add(t)});
  box(9,.12,3.4,HZ,bx+4,.07,bz+11,scene).receiveShadow=true;bankW(bx+2,bz+12.6,0);bankW(bx+6,bz+12.6,0);fernrohr(bx+9,bz+11,Math.PI,1.5);
  felsgruppe(bx-14,bz-3,2.5,3,5,.9,1.6,.6);felsgruppe(bx+14,bz-3,2.5,3,5,.9,1.6,.6);
  fig(bx+3,bz+9,3.3,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.95);fig(bx+5.4,bz+9.6,3,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.3);fig(bx-3,bz+8,3.6,0xf59e3f,0x3a4a6a,0x6b4626,'kurz',1);
  for(let i=0;i<14;i++){const a=nr()*3.14+3.14,r=6.5+nr()*3;inst('cyl',bx+Math.cos(a)*r,.9,bz+Math.sin(a)*r+8,.05,1.8,.05,0x6f8a42);inst('blm',bx+Math.cos(a)*r,1.8,bz+Math.sin(a)*r+8,.1,.3,.1,0x7a5a32)}}
/* ---------- 21. Bergsee mit Steg und Ruderbooten ---------- */
function ort21(){const cx=-96,cz=-92,r=21.5;teichBau(cx,cz,r,0x3a9ec0,0,5.4);
  weg(spl([[-72,-90],[-60,-88],[-48,-91]],3),3.4);steg(-74,-92,-90,-92,3.6);box(3.6,.1,.1,0x8a5a32,-90.2,.8,-92,scene);sperrLinie(-90.6,-94.2,-90.6,-89.8,.3);bankW(-88.4,-92,Math.PI/2);poller(-90,-89.9);poller(-90,-94.1);
  (function(){const cols=[0xe0605a,0x3b6fc4,0xf2c230];[[-81,-94.7],[-81,-89.3],[-86,-94.7]].forEach((p,i)=>{const bt=ruder(scene,cols[i]);bt.position.set(p[0],.1,p[1]);bt.rotation.y=i===2?.3:Math.PI;wipp(bt,.1,i*2,1.4)})})();
  [[0,-1,10,9,0x3b6fc4],[1,2,6.5,5,0xe0605a]].forEach((q,i)=>{const bt=ruder(scene,q[4]);person(-.4,.1,0,[0xf59e3f,0x4caf6a][i],0x3a4a6a,0x6b4626,'cap',.9,bt).g.position.y=.7;person(.7,-.1,3.14,0xe0605a,0x3a4a6a,0xe8c24a,'zoepfe',.8,bt).g.position.y=.7;fahren(bt,ellipse(cx+q[1]*3,cz+q[0]*2,q[2],q[3],20),1.3+i*.3,i*30)});
  for(let i=0;i<3;i++)streif(ente,pendel(spl([[cx-8+i*3,cz+4],[cx-2+i*3,cz+9],[cx+3,cz+4],[cx-4,cz-2]],1.2),.3),.5,i*4,1.3);
  for(let i=0;i<40;i++){const a=i/40*6.28+nr()*.1;if(Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<.4)continue;const x=cx+Math.cos(a)*(r+1.1),z=cz+Math.sin(a)*(r+1.1);for(let k=0;k<3;k++){inst('cyl',x+k*.25,1.1,z+k*.2,.04,2.2+nr()*.8,.04,0x6f8a42);if(k===1)inst('sph',x+k*.25,2.4,z+k*.2,.09,.28,.09,0x7a5a32)}}
  (function(){const g=chalet(-96,-66,7,4.6,0,{h:2.8});box(7,.4,1.6,HZ,0,.3,4,g)})();weg([[-96,-56],[-96,-62]],3);
  fig(-86,-92.6,-1.57,0x4a6a3a,0x4a3a2a,0x6b4626,'cap',1.2);cyl(.02,2.8,0x6a4220,-87,1.8,-92.6,scene).rotation.z=.9;
  [[-80,-72],[-116,-74],[-116,-110],[-76,-110],[-96,-114]].forEach((p,i)=>{if(i<2)blumeI(p[0],p[1],i);fels(p[0],p[1],1+nr()*.8)});
  schwarm(gBox,0xe8f6fa,40,(i,t)=>{const a=i*2.4,q=((i*37)%19)+1;return[cx+Math.cos(a)*q,.14,cz+Math.sin(a)*q,1.8+(i%4)*.5,.03,.12+.08*Math.sin(t*.8+i),0]})}
/* ---------- 22. Staudamm ---------- */
const DAMM=[[74,-79],[88,-82],[104,-83.5],[120,-82],[134,-79]];
function ort22(){const bx=100;weg([[bx-12,roadZ(bx-12,-58)],[bx-11,-66],[bx-12,-72]],3.4);
  WS.slice(0,3).forEach(w=>{wasserRund(w[0],w[1],w[2],0x3a9ec0);wasserRund(w[0]-1,w[1]+1,w[2]*.62,0x6ec0ea,.02);wRing(w[0],w[1],w[2]+.5)});
  for(let i=0;i<DAMM.length-1;i++){const a=DAMM[i],c=DAMM[i+1],L=Math.hypot(c[0]-a[0],c[1]-a[1]),m=[(a[0]+c[0])/2,(a[1]+c[1])/2],th=Math.atan2(-(c[1]-a[1]),c[0]-a[0]);const g=grp(m[0],0,m[1]);g.rotation.y=th;box(L+.4,7.2,3.4,0xbdbdb8,0,3.6,0,g,true);box(L+.5,.5,4,0xa8a8a4,0,7.3,0,g);box(L+.4,.12,.12,0xd8d8d4,0,8.4,1.7,g);for(let k=0;k<=Math.round(L/2.4);k++)box(.1,1.2,.1,0xd8d8d4,-L/2+k*L/Math.round(L/2.4),7.9,1.7,g);for(let k=0;k<4;k++)box(.7,6,.6,0xa8a8a4,-L/2+(k+.5)*L/4,3.2,1.9,g);vm(g);sperrLinie(a[0],a[1],c[0],c[1],1.9)}
  sperrLinie(74,-79,74,-92,.3);sperrLinie(134,-79,134,-92,.3);
  (function(){const g=grp(104,0,-79);for(let i=0;i<5;i++)box(4,.4,2.4,0xcfe8f4,0,6.4-i*1.3,3.6+i*2.4,g);box(4,.2,12,0xe4f4fa,0,3.4,8,g).rotation.x=.33;vm(g);sperrKasten(104,-72,4.4,12,0)})();
  fallen(104,-76,3.2,6,18);wasserRund(104,-62,5.4,0x4aa6c9);wRing(104,-62,5.9);
  (function(){const x=104,z=-96;cyl(1.3,7,0xe8e8e4,x,3.5,z,scene,true);cyl(1.5,.5,0xc03a2a,x,7.2,z,scene);kreis(x,z,1.5);box(.8,.2,12,0x9a9ea4,x,6.4,z+6.8,scene)})();
  (function(){const g=grp(133,0,-86);box(4,3.4,3,0xd8d0c0,0,1.7,0,g,true);box(4.4,.3,3.4,0x6a6a70,0,3.5,0,g);box(1.1,2,.1,0x3a5a7a,0,1,1.55,g);sperrKasten(133,-86,4.2,3.2,0)})();
  (function(){const px=88,pz=-71;box(7,.12,3.8,HZ,px,.07,pz,scene).receiveShadow=true;const zf=pz+1.9;box(7,.1,.1,HD,px,1,zf,scene);for(let i=0;i<5;i++)box(.12,1,.12,HD,px-3+i*1.5,.5,zf,scene);sperrLinie(px-3.5,zf,px+3.5,zf,.1);sperrLinie(px-3.5,pz-1.9,px-3.5,zf,.1);sperrLinie(px+3.5,pz-1.9,px+3.5,zf,.1);bankW(px-1.5,pz,Math.PI);fernrohr(px+2,pz+.4,0,1.5)})();
  fig(94,-68,3.4,0xf59e3f,0x3a4a6a,0x6b4626,'cap',1.3);fig(110,-70,3.1,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.95);
  (function(){rohr([76,3.6,-80],[56.5,3.6,-80],.9,0x8a8f94);[78,70,63,58].forEach(x=>{cyl(.3,3.6,0x6a6a70,x,1.8,-80,scene,true);kreis(x,-80,.5)})})();
  zuf((x,z)=>{inst('sph',x,.25,z,.5+nr()*.5,.3,.5,GRAU[Math.floor(nr()*5)])},40,(x,z)=>Math.hypot(x-104,z+94)>14&&Math.hypot(x-104,z+94)<22,80,128,-112,-78)}
/* ---------- 23. Wasserkraftwerk ---------- */
function ort23(){const b=zone('Wasserkraftwerk',-58),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10,0xcdc4b0,.09);
  (function(){const g=grp(X(0),0,Z(-3));g.rotation.y=R;box(12,7,6.4,0xe8e4da,0,3.5,0,g,true);box(12.4,.4,6.8,0x6a6a70,0,7.2,0,g);box(12.4,.3,7,0x3a7a5a,0,8,0,g);for(let i=0;i<4;i++){box(1.2,2.4,.1,0xcfeaf5,-4.2+i*2.8,3.6,3.25,g);cyl(.6,.1,0xcfeaf5,-4.2+i*2.8,4.8,3.25,g).rotation.x=Math.PI/2}box(2.2,3,.2,0x3a5a7a,5,1.5,3.25,g);vm(g);sperrKasten(X(0),Z(-3),12.2,6.6,R)})();
  (function(){const tx=X(0),tz=Z(5.2);box(.5,2.4,5,0xc8ccd4,tx-3,1.2,tz,scene);box(.5,2.4,5,0xc8ccd4,tx+3,1.2,tz,scene);sperrLinie(tx-3,tz-2.5,tx-3,tz+2.5,.3);sperrLinie(tx+3,tz-2.5,tx+3,tz+2.5,.3);
    const wg=grp(tx,2.4,tz);cyl(1.9,.6,0x3a6aa8,0,0,0,wg).rotation.x=Math.PI/2;for(let i=0;i<14;i++){const a=i/14*6.283;sph(.4,0xb8bcc4,Math.cos(a)*1.9,Math.sin(a)*1.9,0,wg,1,1,.8)}for(let i=0;i<4;i++)box(.2,3.8,.3,0xc8ccd4,0,0,0,wg).rotation.z=i*.785;cyl(.3,5.6,0x2a2a2e,0,0,0,wg).rotation.x=Math.PI/2;vm(wg);bewegt(wg,t=>{wg.rotation.z=-t*3})})();
  (function(){const g=grp(X(-8),0,Z(-3));box(3,2.4,3,0x8a8f94,0,1.2,0,g,true);for(let i=0;i<3;i++){cyl(.2,1,0xf6f6f2,-1+i,2.9,0,g);cone(.35,.5,0xf6f6f2,-1+i,3.5,0,g)}sperrKasten(X(-8),Z(-3),3.2,3.2,0)})();
  [[X(-12),Z(-4)],[X(12),Z(-8)]].forEach(p=>{cyl(.35,12,0x6a6a70,p[0],6,p[1],scene,true);kreis(p[0],p[1],.6);[0,1,2].forEach(i=>box(4,.25,.3,0x6a6a70,p[0],11.4-i*1.8,p[1],scene))});
  [-1.7,0,1.7].forEach((o,i)=>rohr([X(-12)+o,11.4-i*1.8,Z(-4)],[X(12)+o,11.4-i*1.8,Z(-8)],.04,0x2a2a2e));
  wegBand(spl([[bx+8,bz-3*b.dir],[bx+10,bz+3*b.dir],[bx+9,bz+8*b.dir]],2),2.4,0x6ec0ea,.08);
  fig(X(5),Z(3.6),R+3,0xf2c230,0x3a4a6a,0x6b4626,'kurz',1.4);hutAuf(fig(X(-2),Z(6),R+2.8,0xf2c230,0x3a4a6a,0xb5651d,'kurz',1.3),0xf2c230);bankW(X(8),Z(6),R);kuebel(X(-10),Z(4))}
/* ---------- 24. Gletscherbach mit Furt ---------- */
function ort24(){const br=[];
  [-110,-58].forEach(r=>{let bi=0,bd=1e9;BACH2.forEach((q,i)=>{const d=Math.abs(q[1]-roadZ(q[0],r));if(d<bd){bd=d;bi=i}});br.push(bruecke(BACH2[bi][0],BACH2[bi][1],BACH2,3))});
  br.push([-34.5,-90]);bachFarbe(BACH2,3.4,br,0x7ccbd8,0xa8e4ec);BACH2.forEach(q=>sgMark(q[0],q[1],4));
  [[-36.5,-89],[-35.6,-90.3],[-34.6,-91.4],[-33.8,-92.6],[-33,-93.7]].forEach((p,i)=>trittstein(p[0]+(i%2)*.1,p[1],1));[[-39,-87.2],[-38.2,-88.6],[-37.5,-89.9]].forEach(p=>trittstein(p[0],p[1],.9));
  fig(-30.8,-85.5,3.9,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.95);fig(-38,-94,-.8,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.2);person(-35.2,-90.6,2.2,0xf59e3f,0x3a4a6a,0x6b4626,'cap',1.2);
  [[-31,-96],[-40,-84]].forEach(p=>{const g=grp(p[0],0,p[1]);for(let k=0;k<3;k++)sph(.5-k*.12,GRAU[k],0,.3+k*.5,0,g,1.1,.7,1);kreis(p[0],p[1],.6)});
  schwarm(gBox,0xe8f6fa,24,(i,t)=>{const q=BACH2[Math.floor(((i/24)*(BACH2.length-2)+t*.5)%(BACH2.length-1))];return[q[0]+Math.sin(i*3)*.8,.1,q[1],.5,.02,.12,0]});
  for(let i=0;i<20;i++){const a=nr()*6.28,r=6+nr()*5;glocke(-36+Math.cos(a)*r,-90+Math.sin(a)*r);edelweiss(-36+Math.cos(a+2)*r,-90+Math.sin(a+2)*r)}}
function etappe3(){ort13();ort14();ort15();ort16();ort17();ort18();ort19();ort20();ort21();ort22();ort23();ort24()}

/* ==================== Etappe 3b: Fels und Eis (Orte 25 bis 38) ==================== */
const EIS=[0xcdeaf6,0xe8f6fb,0xb8e0f0,0xdcf0f8];
function eisblock(x,z,w,h,d,rot,k){const m=box(w,h,d,EIS[k%4],x,h/2,z,scene,true);m.rotation.y=rot;sperrKasten(x,z,w,d,rot);return m}
function hoehle(bx,bz,F,dachf,innen){[-1,1].forEach((s,k)=>{const x=bx+s*4.3;sph(1,F[k%F.length],x,1.8,bz,scene,2.3,3.6,7.4).castShadow=true;sph(1,F[(k+1)%F.length],x+s*2.2,1.2,bz+2,scene,2.2,2.4,4.2);sperrKasten(x+s*.4,bz,4.0,14.6,0)});
  box(8.6,1.2,11,dachf,bx,4.1,bz,scene,true);sph(1,F[1],bx,4.4,bz,scene,4.6,1.6,6);bodenFl(bx,bz,4.6,12,innen,.06)}
/* ---------- 25. Gletscher ---------- */
function ort25(){const b=zone('Gletscher'),bx=b.x,bz=b.z;ast(b);
  const P=[];for(let i=0;i<16;i++){const a=i/16*6.283,r=14+3*Math.sin(i*2.1)+2*Math.cos(i*3.3);P.push([bx+Math.cos(a)*r*1.05,bz+Math.sin(a)*r*.9])}landFl(P,0xdcf0f8,.05);
  landFl(P.map(p=>[bx+(p[0]-bx)*.62,bz+(p[1]-bz)*.62]),0xeef8fc,.06);
  [[-6,-8,3,3.4,2.2,.3],[2,-9,2.4,4.4,2,.9],[8,-4,3.2,3,2.4,.2],[-9,-1,2.6,3.6,2,1.2],[5,-12,3,5,2.4,.6],[-3,-3,2,2.6,1.8,.4],[10,4,2.2,2.8,1.8,1],[-11,6,2.4,3,2,.7]].forEach((p,i)=>eisblock(bx+p[0],bz+p[1],p[2],p[3],p[4],p[5],i));
  [[-6,2,10,.3],[4,-6,12,-.2],[-2,7,8,.5]].forEach(p=>{const m=box(p[2],.04,.5,0x2a5a8a,bx+p[0],.08,bz+p[1],scene);m.rotation.y=p[3]});
  for(let i=0;i<60;i++){const a=nr()*6.28,r=13+nr()*5;inst('sph',bx+Math.cos(a)*r,.2,bz+Math.sin(a)*r*.9,.3+nr()*.6,.25,.3+nr()*.5,GRAU[i%5])}
  (function(){const pts=[[bx-2,bz+8],[bx-.8,bz+5.6],[bx+.4,bz+3.2],[bx+1.4,bz+.8]];pts.forEach((p,i)=>{const f=fig(p[0],p[1],-1.2,[0xe0302a,0x3b8fc4,0xf59e3f,0x4caf6a][i],0x3a4a5a,[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d][i],'cap',i?1:1.4);hutAuf(f,[0xf2c230,0xe0302a,0x3b8fc4,0x4caf6a][i],.9);if(i){const a=pts[i-1];const rp=box(Math.hypot(p[0]-a[0],p[1]-a[1]),.05,.05,0xe0302a,(p[0]+a[0])/2,1.2,(p[1]+a[1])/2,scene);rp.rotation.y=Math.atan2(-(p[1]-a[1]),p[0]-a[0])}})})();
  [[-4,12],[3,10]].forEach(p=>{cyl(.07,2.6,0x6a4220,bx+p[0],1.3,bz+p[1],scene,true);tri([bx+p[0],2.5,bz+p[1]],[bx+p[0],1.9,bz+p[1]],[bx+p[0]+.9,2.2,bz+p[1]],0xe0302a,scene)});
  [[12,10,.4,0xf59e3f],[-13,9,-.4,0xe0302a]].forEach(p=>{const t=cone(2,2.3,p[3],bx+p[0],1.15,bz+p[1],scene,true);t.rotation.y=p[2];kreis(bx+p[0],bz+p[1],1.7)});
  for(let i=0;i<4;i++)falter(bx+(i-2)*6,bz+12,3,1.2+i*.3,i*1.7,0xffffff)}
/* ---------- 26. Eishöhle (Tunnel) ---------- */
function ort26(){const b=zone('Eishöhle'),bx=b.x,bz=b.z;ast(b);hoehle(bx,bz,[0xcdeaf6,0xb8e0f0,0xdcf0f8],0xdcf0f8,0xbfe3f0);
  for(let i=0;i<10;i++)cone(.2,.4+nr()*.9,0xd8f2fa,bx-1.8+(i%5)*.9,3.4,bz-4.5+Math.floor(i/5)*5+nr(),scene).rotation.x=Math.PI;
  [-3.8,-1.4,1.6,3.8].forEach((z,i)=>{const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0x8ad8ff}));l.position.set(bx+(i%2?1.3:-1.3),2.6,bz+z);l.scale.setScalar(.22);scene.add(l)});
  (function(){const x=bx-1.5,z=bz-1;sph(.7,0xe8f6fb,x,.6,z,scene);sph(.5,0xe8f6fb,x,1.5,z,scene);sph(.35,0xe8f6fb,x,2.1,z,scene);cone(.06,.3,0xf59e3f,x+.3,2.1,z,scene).rotation.z=-Math.PI/2;sph(.04,0x111111,x+.3,2.2,z+.1,scene);sph(.04,0x111111,x+.3,2.2,z-.1,scene);kreis(x,z,.6)})();
  box(1.4,.5,.6,0xcdeaf6,bx+1.5,.3,bz+2,scene,true);for(let i=0;i<8;i++){const c=cone(.12,.3+nr()*.4,0xcdeaf6,bx-1.6+nr()*3.2,.2,bz-4.6+nr()*9.2,scene);if(nr()<.6)c.position.x=bx+(nr()<.5?-1:1)*1.9}
  fig(bx+7,bz+8,3.4,0xe0302a,0x3a4a5a,0x6b4626,'cap',1.2);fig(bx-8,bz+9,.8,0x3b8fc4,0x4a4a5a,0xe8c24a,'zoepfe',1.1);
  for(let i=0;i<12;i++)inst('sph',bx+Math.cos(i*1.1)*7,.1,bz+8+Math.sin(i*1.3)*3,.8,.12,.6,0xf4f8fa);
  for(let i=0;i<5;i++){const a=nr()*3.14,r=8+nr()*3;fels(bx+Math.cos(a)*r,bz-Math.sin(a)*r*.8,1+nr()*.8)}}
/* ---------- 27. Skihütte (Sommerbetrieb) ---------- */
function ort27(){const b=zone('Skihütte'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10.5,0xcdc4b0,.09);
  (function(){const g=chalet(bx,bz-5,12,6.4,0,{h:3.6,stein:1,rauch:1});[-1,1].forEach(s=>{const sk=box(.14,.1,5.4,0x2a5a8a,s*1.5,2.4,3.3,g);sk.rotation.x=0;sk.rotation.z=.6*s;const p=box(.14,.1,5.4,0xe0302a,s*1.5,2.4,3.3,g);p.rotation.z=-.6*s;sk.scale.z=.35;p.scale.z=.35;sk.rotation.x=Math.PI/2;p.rotation.x=Math.PI/2});box(1.8,.14,.8,0x8a5a32,-4,2.2,3.6,g)})();
  [[-6,4,0xc03a2a],[-1,6,0xf6f6f2],[5,4.4,0x3b8fc4]].forEach((p,i)=>{schirm(bx+p[0],bz+p[1],p[2]);stuhl(bx+p[0]+1.2,bz+p[1]+.4,-1.6);stuhl(bx+p[0]-1.2,bz+p[1]-.3,1.6)});
  [[-9,5.4],[-8,6.8]].forEach(p=>{const g=grp(bx+p[0],0,bz+p[1]);kreis(bx+p[0],bz+p[1],1);box(.8,.1,2,0x3b8fc4,0,.45,0,g,true).rotation.x=-.35;box(.8,.1,.8,0x3b8fc4,0,.75,.9,g);[-1,1].forEach(s=>box(.1,.5,.1,0x6a4220,s*.35,.25,.4,g))});
  (function(){const g=grp(bx+9,0,bz-1);box(3,.12,.4,HD,0,.9,0,g,true);for(let i=0;i<5;i++)[-1,1].forEach(s=>box(.1,2,.08,[0xe0302a,0x3b8fc4,0xf2c230,0x4caf6a,0x9b6fd0][i],-1.2+i*.6,1.1,s*.2,g));sperrKasten(bx+9,bz-1,3.2,.8,0)})();
  [-14,-7,0,7,14].forEach((x,i)=>{mast(bx+x*.9,bz-13.5,6.4+i*0,0x6a6a70);if(i<4)rohr([bx+x*.9,6,bz-13.5],[bx+(x+7)*.9,6,bz-13.5],.06,0x2a2a2e);const t=grp(bx+x*.9+3,0,bz-13.5);cyl(.04,3.8,0x2a2a2e,0,4,0,t);box(1,.1,.1,0xe0302a,0,2.1,0,t)});
  (function(){const g=grp(bx+8,0,bz+8);g.rotation.y=-.5;box(4.4,1.6,2.6,0xe8662a,0,1.5,0,g,true);box(2.2,1.3,2.4,0xe8662a,.6,2.8,0,g);box(.06,1,2.2,0x9fd0e8,1.7,2.8,0,g);[-1,1].forEach(s=>box(5,.9,.6,0x3a3a3e,0,.5,s*1.4,g));box(.4,1.6,3.4,0xf2c230,2.9,1,0,g);sperrKasten(bx+8,bz+8,5.6,3.4,-.5)})();
  fig(bx,bz+2,0,0x2a5a8a,0x3a3a4a,0xe8c24a,'zoepfe',1.3);fig(bx-3,bz+7.8,3.4,0xf59e3f,0x3a4a5a,0x6b4626,'cap',1.2);fahne(bx+11,bz-6,8,0xe0302a,0xffffff);kuebel(bx-10,bz-1)}
/* ---------- 28. Gipfelkreuz-Aussichtsplatz ---------- */
function ort28(){const b=zone('Gipfelkreuz'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10.5,0x9a9c8a,.09);
  sph(1,GRAU[0],bx,2.6,bz-6,scene,6.4,3.6,5.6).castShadow=true;sph(1,GRAU[3],bx-5,1.4,bz-4,scene,3.6,2,3.2);sph(1,GRAU[2],bx+5.4,1.4,bz-3.4,scene,3.4,2,3);kreis(bx,bz-6,5.4);kreis(bx-5,bz-4,3);kreis(bx+5.4,bz-3.4,2.8);
  (function(){const g=grp(bx,6.1,bz-6);box(.5,6.4,.5,0x6a4220,0,3.2,0,g,true);box(3.2,.5,.5,0x6a4220,0,4.8,0,g);box(.1,6,.08,0xe8b830,0,3.2,.27,g);box(3,.1,.08,0xe8b830,0,4.8,.27,g);const bk=box(.8,.6,.5,0xc03a2a,1.2,.3,.8,g);cyl(.04,2,0xe8e4da,-1,1,.9,g)})();
  (function(){const px=bx,pz=bz+5;box(9,.12,4,HZ,px,.07,pz,scene).receiveShadow=true;const zf=pz+2;box(9,.1,.1,HD,px,1,zf,scene);for(let i=0;i<6;i++)box(.12,1,.12,HD,px-4.5+i*1.8,.5,zf,scene);sperrLinie(px-4.5,zf,px+4.5,zf,.1);sperrLinie(px-4.5,pz-2,px-4.5,zf,.1);sperrLinie(px+4.5,pz-2,px+4.5,zf,.1);[-2.8,0,2.8].forEach(x=>fernrohr(px+x,pz-1,Math.PI,1.5));bankW(px,pz-1.9,0)})();
  for(let k=0;k<5;k++){const x=bx-9+k*4.5,z=bz+(k%2?8:10.4);if(k===2)continue;sph(.5,GRAU[k%5],x,.35,z,scene,1.2,.7,1);sph(.36,GRAU[(k+1)%5],x,.95,z,scene,1.1,.7,1);sph(.24,GRAU[(k+2)%5],x,1.35,z,scene);kreis(x,z,.6)}
  [[-3,7],[3,6.6],[0,9]].forEach((p,i)=>{const f=fig(bx+p[0],bz+p[1],3.2+i*.3,[0xe0605a,0x3b8fc4,0x4caf6a][i],0x3a4a6a,[0xe8c24a,0x2a1d14,0x6b4626][i],'cap',1.2-i*.1);f.ar.rotation.x=-2.8});fahne(bx+9,bz-2,7,0xe0302a,0xffffff)}
/* ---------- 29. Klettersteig-Wand ---------- */
function ort29(){const b=zone('Klettersteig-Wand'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11,0xb8b0a0,.09);
  const wz=bz-5;felswand(bx,wz,22,3.4,14,0,GRAU[0]);const fz=wz+1.9;
  [-6,0,6].forEach(x=>{cyl(.04,13,0x3a3a3e,bx+x,6.5,fz,scene);for(let k=0;k<12;k++)box(.7,.08,.08,0x6a6a70,bx+x,.7+k*1.05,fz+.1,scene)});[-3,3].forEach(x=>{cyl(.03,6,0x3a3a3e,bx+x,13.4,fz,scene).rotation.z=Math.PI/2});
  for(let i=0;i<18;i++)box(.6,.4,.5,[0xc88a58,0xa8743f,0x6a6a70][i%3],bx-9+i*1.05,1+(i*37%11),fz+.05,scene);
  [[-6,4,.9,0x3b8fc4,0xe0302a],[0,8,.9,0xf59e3f,0xf2c230],[6,2.6,.9,0xe0302a,0x3b8fc4],[-1.5,5.2,.9,0x4caf6a,0xf6f6f6]].forEach(p=>kletterer(scene,bx+p[0],p[1],fz+.75,p[3],p[4]).g.scale.setScalar(.95));
  (function(){const g=grp(bx-9,0,bz+3);box(2.6,.12,.5,HD,0,1.4,0,g,true);box(.12,1.6,.5,HD,-1.1,.8,0,g);box(.12,1.6,.5,HD,1.1,.8,0,g);for(let i=0;i<5;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(.22,.05,5,10),mat([0xe0302a,0xf2c230,0x3b8fc4,0x4caf6a,0x9b6fd0][i]));t.position.set(-1+i*.5,1.1,.1);g.add(t)}kreis(bx-9,bz+3,1.4)})();
  for(let i=0;i<6;i++){const c=cyl(.4,.1,[0xf2c230,0xe0302a,0x3b8fc4][i%3],bx+7+(i%3)*.8,.12+Math.floor(i/3)*.2,bz+3+Math.floor(i/3)*.6,scene)}
  fig(bx-4,bz+4,3.1,0xe0605a,0x3a4a6a,0xe8c24a,'zoepfe',1);fig(bx+3,bz+5,3.4,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1);fig(bx,bz+2,3,0xd8302a,0x3a3a4a,0xb5651d,'kurz',1.4);fig(bx+5,bz+3,3.6,0xf59e3f,0x3a4a6a,0x6b4626,'cap',.9)}
/* ---------- 30. Tropfsteinhöhle (Tunnel) ---------- */
function ort30(){const b=zone('Tropfsteinhöhle'),bx=b.x,bz=b.z;ast(b);hoehle(bx,bz,[0x8a7a68,0x7a6c5c,0x9a8a76],0x7a6c5c,0x6a5e50);
  for(let i=0;i<16;i++){const x=bx-2+(i%4)*1.35,z=bz-4.6+Math.floor(i/4)*2.6+nr();cone(.17+nr()*.12,.5+nr()*1.2,0xd8cdb8,x,3.45,z,scene).rotation.x=Math.PI}
  [[-1.9,-4],[1.9,-2.4],[-1.9,1.6],[1.9,3.4],[-1.7,-.6]].forEach((p,i)=>{cone(.26,.8+i*.15,0xc8bca6,bx+p[0],.5,bz+p[1],scene);kreis(bx+p[0],bz+p[1],.3)});
  [[-.4,-3],[.6,0],[-.2,4]].forEach((p,i)=>cone(.14,.4,0xd8cdb8,bx+p[0],.2,bz+p[1],scene));
  [[-1.2,-4],[1.2,3]].forEach(p=>{const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xffe9a0}));l.position.set(bx+p[0],2.6,bz+p[1]);l.scale.setScalar(.22);scene.add(l)});
  [[-1.4,-1.5],[1.4,2.4],[.6,-3.8]].forEach((p,i)=>{const g=grp(bx+p[0],3.3,bz+p[1]);sph(.14,0x2a2a2e,0,-.1,0,g,1,1.3,1);[-1,1].forEach(s=>box(.5,.02,.22,0x1a1a1e,0,0,s*.22,g).rotation.x=s*.8);sph(.07,0x2a2a2e,0,-.25,.04,g)});
  kristall(bx-1.8,bz+5,1.2,0xb06ae0);kreis(bx-1.8,bz+5,.55);kristall(bx+1.8,bz-5,1,0xe8f6ff);kreis(bx+1.8,bz-5,.5);
  (function(){const f=fig(bx+7,bz+8,3.4,0xf59e3f,0x4a4a5a,0x6b4626,'cap',1.3);hutAuf(f,0xf2c230,1);const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xfff4c0}));l.position.set(0,.25,.55);l.scale.setScalar(.14);f.kopf.add(l)})();
  fig(bx-8,bz+9,.8,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.05);for(let i=0;i<5;i++){const a=nr()*3.14,r=8+nr()*3;fels(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.8+2,1+nr()*.8)}}
/* ---------- 31. Wetterstation mit Lawinenschutz ---------- */
function ort31(){const b=zone('Wetterstation'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10,0xcdc4b0,.09);
  (function(){const g=grp(bx-3,0,bz-3);box(6,2.8,3,0xf6f6f2,0,1.8,0,g,true);box(6.2,.2,3.2,0x6a6a70,0,3.3,0,g);box(.8,1.8,.1,0x4a88c8,-1.6,1,1.55,g);box(1.4,.8,.1,0xcfeaf5,1,2,1.55,g);box(6,.5,3,0x6a6a70,0,.25,0,g);vm(g);sperrKasten(bx-3,bz-3,6.2,3.2,0);solar(scene,bx-3,3.9,bz-3,3.6,1.6,-.4);cyl(.12,6,0xf6f6f2,bx-5.4,6.5,bz-3,scene,true);for(let i=0;i<5;i++)cyl(.14,.6,i%2?0xe0302a:0xffffff,bx-5.4,4+i*.6,bz-3,scene);kreis(bx-5.4,bz-3,.4);const dm=sph(1,0xf6f6f2,bx+.5,4.3,bz-3.6,scene,.9,.9,.9)})();
  (function(){const x=bx+5,z=bz-2;cyl(.08,3.4,0x3a3a3e,x,1.7,z,scene,true);const w=grp(x,3.5,z);for(let i=0;i<3;i++){const a=i*2.094;cyl(.04,1.2,0x3a3a3e,Math.cos(a)*.6,0,Math.sin(a)*.6,w).rotation.set(0,0,0);box(1.2,.04,.04,0x3a3a3e,0,0,0,w).rotation.y=a;sph(.22,i?0xf6f6f2:0xe0302a,Math.cos(a)*1.2,0,Math.sin(a)*1.2,w,1,.7,1)}vm(w);bewegt(w,t=>{w.rotation.y=t*3});kreis(x,z,.3);
    const s=grp(bx+7.2,0,bz+1);box(1.2,1.2,1,0xf6f6f2,0,1.3,0,s,true);for(let k=0;k<5;k++)box(1.1,.05,.9,0xd8d8d4,0,.9+k*.18,.04,s);[-1,1].forEach(q=>[-1,1].forEach(r=>cyl(.05,.7,0x6a6a70,q*.5,.35,r*.4,s)));kreis(bx+7.2,bz+1,.9);cyl(.2,.7,0xc4cad0,bx+8,.35,bz+3,scene);cone(.3,.2,0xc4cad0,bx+8,.8,bz+3,scene).rotation.x=Math.PI;
    for(let i=0;i<9;i++)box(.2,.4,.2,i%2?0xf6f6f2:0xe0302a,bx+3,.2+i*.4,bz+4,scene)})();
  (function(){const x=bx-8,z=bz+2,bl=sph(.9,0xf6f6f2,x,4,z,scene,1,1.1,1);bl.userData.keep=1;const sn=cyl(.015,4,0x3a3a3e,x,2,z,scene);sn.userData.keep=1;bewegt(bl,t=>{bl.position.y=4+Math.sin(t*.8)*.4;bl.position.x=x+Math.sin(t*.5)*.4});cyl(.4,.4,0x6a6a70,x,.2,z,scene,true);kreis(x,z,.5)})();
  [[-13,-9],[-13,-13],[-13,-17]].forEach((r,ri)=>{for(let i=0;i<5;i++){const x=bx-10+i*5,z=bz+r[1]+9.2;if(i===2){continue}const g=grp(x,0,z);const s=box(.2,2.6,.2,0xc86a2a,0,1.1,0,g,true);s.rotation.x=-.5;box(.2,2.4,.2,0xc86a2a,0,1,.9,g).rotation.x=.1;box(4,.2,.2,0xc86a2a,0,2.2,-.4,g);box(4,.15,.15,0xc86a2a,0,1.4,-.2,g);box(4,.15,.15,0xc86a2a,0,.7,.1,g);sperrKasten(x,z,4.2,1.4,0)}});
  fig(bx+1,bz+5,3.2,0xf6f6f2,0x3a4a6a,0xb5651d,'kurz',1.4);fig(bx-2,bz+6,3.6,0xf59e3f,0x3a4a6a,0x6b4626,'cap',1)}
/* ---------- 32. Geröllhalde mit Kristallsuche ---------- */
function ort32(){const b=zone('Geröllhalde'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12.5,0x9a9a92,.08);
  for(let i=0;i<340;i++){const a=nr()*6.28,r=Math.sqrt(nr())*12;inst('sph',bx+Math.cos(a)*r,.12,bz+Math.sin(a)*r,.2+nr()*.5,.16+nr()*.15,.2+nr()*.4,GRAU[i%5])}
  felsgruppe(bx,bz-3,9,4,7,1.2,2.2,.6);
  [[-6,-2,0xb06ae0],[-1,-5,0xe8f6ff],[5,-3,0xf2c230],[8,1,0xb06ae0],[-8,3,0xe8f6ff],[2,2.4,0xf0a0c8],[-3,5.4,0xf2c230]].forEach((p,i)=>{const k=kristall(bx+p[0],bz+p[1],1.1+i%3*.3,p[2]);sph(.7,GRAU[i%5],bx+p[0],.1,bz+p[1],scene,1.2,.4,1);const m=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xffffff}));m.userData.keep=1;m.scale.setScalar(.1);m.position.set(bx+p[0],1.6,bz+p[1]);scene.add(m);bewegt(m,t=>{m.visible=Math.sin(t*3+i*1.7)>.2})});
  (function(){const g=grp(bx+9,0,bz-6);box(2.4,.12,1.4,0x8a5a32,0,1,0,g,true);[[-1,-.6],[1,-.6],[-1,.6],[1,.6]].forEach(p=>cyl(.07,1,0x6a4220,p[0],.5,p[1],g));const s=box(2,.06,1.2,0x2a2a2e,0,1.3,0,g);s.rotation.x=-.2;kreis(bx+9,bz-6,1.4)})();
  eimer(bx+6,bz+7,0x3b8fc4,0xb06ae0);eimer(bx+7.2,bz+7.6,0xe0302a,0xe8f6ff);eimer(bx-7,bz+7.4,0xf2c230,0xf2c230);schubkarre(bx-9,bz+3,.6,0x8d9097);
  (function(){const g=grp(bx-4,0,bz-9);box(3.4,2.2,.8,0x6a4220,0,1.1,0,g,true);glas(3,1.8,.1,0,1.2,.45,g);for(let i=0;i<5;i++)box(.4,.4,.3,[0xb06ae0,0xe8f6ff,0xf2c230,0xf0a0c8,0x4caf6a][i],-1.2+i*.6,.7+(i%2)*.6,0,g);sperrKasten(bx-4,bz-9,3.6,1,0)})();
  fig(bx+2,bz+6,3.2,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.85);fig(bx-2,bz+7,2.8,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',.9);fig(bx+4,bz+4,3.4,0xf59e3f,0x3a4a6a,0x6b4626,'kurz',1.3)}
/* ---------- 33. Schutzhütte mit Hüttenwirt ---------- */
function ort33(){const b=zone('Schutzhütte'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10.5,0xcdc4b0,.09);
  (function(){const g=chalet(bx,bz-5,10,6,0,{h:3.6,stein:1,rauch:1});box(10.4,1.4,6.4,0x8a8f94,0,.7,0,g);[-1,1].forEach(s=>[0,1].forEach(r=>{box(.9,1.3,.12,[0xc03a2a,0xf6f6f2][r],s*(w=>w)(3.4)-.55+r*1.1,1.8,3.1,g)}));solar(g,-2,6,-1,2.8,1.4,-.5);cyl(.06,3,0x3a3a3e,3,6.6,-1.2,g)})();
  [[-4,4,0],[3,4.6,Math.PI]].forEach((p,i)=>{tisch(bx+p[0],bz+p[1],0);bankW(bx+p[0],bz+p[1]+1.6,0);bankW(bx+p[0],bz+p[1]-1.6,Math.PI)});
  holzstapel(bx+9,bz-4,1.57);sack(bx-9,bz+1,0xb83a2e,1.1);sack(bx-8,bz+2,0x3b6fc4,1);sack(bx-9.6,bz+2.4,0x4a6a3a,1.2);
  (function(){const x=bx+8,z=bz+4;cyl(.2,1.1,0x6a6a70,x,.55,z,scene,true);cyl(.08,.9,0x6a6a70,x+.2,1.1,z,scene).rotation.z=.9;cyl(.1,.5,0x6a6a70,x-.1,.3,z-.4,scene);kreis(x,z,.5)})();
  (function(){const f=fig(bx-1,bz+2,3.2,0xf6f6f2,0x3a3a4a,0x6b4626,'kurz',1.4);box(.8,.9,.06,0xc03a2a,0,1.0,.4,f.g);box(.7,.05,.5,0x8a5a32,.5,1.5,.5,f.g)})();
  fig(bx-3.4,bz+4.8,1.57,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(bx+4.4,bz+5.2,-1.57,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.3);fig(bx+2,bz+3.6,3,0xf59e3f,0x3a4a6a,0xb5651d,'kurz',1.2);
  fahne(bx+8,bz-7,8,0xc03a2a,0xffffff);streif(hundM,pendel(spl([[bx+5,bz+6],[bx+1,bz+8],[bx-5,bz+7]],1.4),.3),1.3,0,1.2)}
/* ---------- 34. Panorama-Hängebrücke ---------- */
function ort34(){const b=zone('Hängebrücke'),cx=112,z0=-188,z1=-166,bzz=-178;
  weg(spl([[96,roadZ(96,-160)],[100,-168],[104,-178]],3),3);weg(spl([[120,-178],[124,-170],[128,roadZ(128,-160)]],3),3);
  landFl([[108,z0],[116,z0],[116,z1],[108,z1]],0x2a2a30,.04);landFl([[109,z0+1],[115,z0+1],[115,z1-1],[109,z1-1]],0x4a3a2a,.045);
  [[-1,0],[1,1]].forEach(s=>{const x=cx+s[0]*(s[0]?4:4)+(s[0]?0:0);});
  [106.8,117.2].forEach(x=>{for(let i=0;i<8;i++){const z=z0+1+i*3,m=box(2.4,1.3+nr()*.5,3.4,GRAU[i%5],x,.7,z,scene,true);m.rotation.y=nr()*.4}});
  [[108,z0,116,z0],[108,z1,116,z1],[108,z0,108,bzz-2],[108,bzz+2,108,z1],[116,z0,116,bzz-2],[116,bzz+2,116,z1]].forEach(l=>sperrLinie(l[0],l[1],l[2],l[3],.3));
  box(24,.14,2.4,0x9a6a3a,cx,.26,bzz,scene,true);for(let i=0;i<24;i++)box(.9,.06,2.5,i%2?0x7a4a2a:0x8a5a32,100.6+i,.34,bzz,scene);
  [-1,1].forEach(s=>{sperrLinie(100,bzz+s*1.35,124,bzz+s*1.35,.1);box(24,.08,.08,0x3a3a3e,cx,1.2,bzz+s*1.35,scene);box(24,.08,.08,0x3a3a3e,cx,.6,bzz+s*1.35,scene);for(let i=0;i<=12;i++)box(.07,1.2,.07,0x3a3a3e,100+i*2,.6,bzz+s*1.35,scene)});
  [-1,1].forEach(s=>{const x=cx+s*11.5;[-1,1].forEach(q=>{cyl(.22,6,0x6a4220,x,3,bzz+q*1.6,scene,true);kreis(x,bzz+q*1.6,.4)});box(.3,.3,3.8,0x6a4220,x,6,bzz,scene);for(let i=0;i<10;i++){const u=i/9,xx=x-s*u*11.5,yy=6-Math.sin(u*Math.PI/2)*5;[-1,1].forEach(q=>{if(i<9)rohr([xx,yy,bzz+q*1.6],[x-s*(u+1/9)*11.5,6-Math.sin((u+1/9)*Math.PI/2)*5,bzz+q*1.6],.035,0x2a2a2e)})}});
  fig(104,bzz,0,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1);fig(120,bzz,3,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.2);fahne(126,-164,7,0xe0302a,0xffffff);bankW(98,-170,1.57);for(let i=0;i<6;i++)fels(cx+(i%2?-1:1)*(3+nr()*2),z0+4+i*3.5,.9+nr()*.5)}
/* ---------- 35. Seilbahn-Bergstation ---------- */
function ort35(){const bx=68,bz=-174;weg(spl([[56,roadZ(56,-160)],[57,-166],[57,-171]],3),3.2);scheibe(bx-3,bz+2,10,0xcdc4b0,.09);
  cyl(10,13,GRAU[1],bx,6.5,bz-3,scene,true);cyl(9,.4,GRAU[4],bx,13.1,bz-3,scene);kreis(bx,bz-3,10);const rk=cyl(8,6,GRAU[0],bx,3,bz-3,scene);
  (function(){const g=grp(bx,13.2,bz-3);box(9,3.6,14,0xd8d0c0,0,1.8,0,g,true);box(9.2,.3,14.2,0x6a6a70,0,3.7,0,g);[-1,1].forEach(s=>{const r=box(5.4,.25,15,0x7a3a2a,s*2.2,5.3,0,g,true);r.rotation.z=-s*.5});for(let i=0;i<5;i++)box(.1,1.6,1.8,0xcfeaf5,-4.55,2,-5+i*2.5,g);box(9,.3,.3,0x6a4220,0,6.2,0,g);box(4,.15,14.4,0x8a5a32,-6.5,.1,0,g);for(let i=0;i<8;i++)box(.1,.9,.1,HD,-8.5,.55,-6+i*1.8,g);box(.1,.1,14.4,HD,-8.5,1,0,g);vm(g)})();
  (function(){const rg=grp(bx,19.5,bz+4.3);cyl(1.6,.5,0x3a3a3e,0,0,0,rg).rotation.z=Math.PI/2;box(.3,3.4,.3,0x6a6a70,0,0,0,rg);box(.3,.3,3.4,0x6a6a70,0,0,0,rg);vm(rg);bewegt(rg,t=>{rg.rotation.x=-t*.8})})();
  (function(){chalet(bx-22,bz+8,6,4.6,0,{h:3})})();
  [[-14,4],[-8,10],[2,12]].forEach((p,i)=>{schirm(bx+p[0],bz+p[1],[0xc03a2a,0xf6f6f2,0x3b8fc4][i]);stuhl(bx+p[0]+1.2,bz+p[1]+.4,-1.6);stuhl(bx+p[0]-1.2,bz+p[1]-.3,1.6)});
  fernrohr(bx+8,bz+8,0,1.5);fernrohr(bx+10,bz+6,0,1.5);fig(bx-4,bz+6,3.3,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1);fig(bx+4,bz+8,3,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.3);fig(bx-11,bz+8,2.8,0xf59e3f,0x3a4a6a,0x6b4626,'kurz',1.3);
  fahne(bx+12,bz-2,9,0x4a88c8,0xffffff);fahne(bx-12,bz+14,7,0xe0302a,0xffffff);kuebel(bx-17,bz+10)}
/* ---------- 36. Alpengarten (Höhenstufen-Lehrpfad) ---------- */
function ort36(){const b=zone('Alpengarten'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,13,0xb8c890,.08);
  const stufen=[0x86c458,0x4a8a3a,0x2a5e3a,0xe04a6a,0xf4f8fa];
  for(let i=0;i<5;i++){const x=bx-10+i*5,z=bz-3,h=.3+i*.28;box(4.2,h,9,0x8a8f94,x,h/2,z,scene,true);box(3.8,.06,8.6,[0x7a5a3a,0x6a4a30,0x5a4a3a,0x6a5a4a,0x9a9a92][i],x,h+.03,z,scene);sperrKasten(x,z,4.4,9.2,0);cyl(.07,3.4,stufen[i],x-1.7,1.7+h,z+4.4,scene);sph(.3,stufen[i],x-1.7,3.5+h,z+4.4,scene)}
  const y0=i=>.36+i*.28;
  for(let k=0;k<4;k++){const x=bx-10,z=bz-6.5+k*2.2;inst('cyl',x-1,y0(0)+.6,z,.04,1.2,.04,0x6aa04a);inst('blm',x-1,y0(0)+1.3,z,.35,.16,.35,0xf2c230);inst('cyl',x+1,y0(0)+.5,z,.03,1,.03,0xc8b050);inst('blm',x+1,y0(0)+1.05,z,.12,.2,.12,0xd8b850)}
  [[-1,-6],[1,-3],[-.5,0]].forEach(p=>{cyl(.1,.8,0x7a5a3a,bx-5+p[0],.9+.6,bz+p[1],scene);sph(.7,0x7ab04a,bx-5+p[0],1.8,bz+p[1],scene,1,.9,1)});
  [[-1,-6],[1,-3],[-.5,0]].forEach(p=>{cyl(.1,.8,0x6a5030,bx+p[0],1.2,bz+p[1],scene);sph(.6,0x3a7a3a,bx+p[0],2,bz+p[1],scene,1,1,1)});
  [[-1,-6],[1,-3],[-.5,0]].forEach(p=>{cone(.7,1.6,0x2a5e3a,bx+5+p[0],1.2+.5,bz+p[1],scene);cyl(.08,.5,0x5a3a26,bx+5+p[0],.9,bz+p[1],scene)});
  for(let i=0;i<20;i++){const x=bx+10+(i%4-1.5)*.8,z=bz-6+Math.floor(i/4)*2.6;if(i%2)edelweiss(x,z);else enzian(x,z)}
  for(let i=0;i<12;i++)inst('sph',bx+15-3.7+(i%4)*1,y0(4)+.1,bz-6+Math.floor(i/4)*5,.35+nr()*.3,.18,.3,i%3?GRAU[i%5]:0xf4f8fa);
  (function(){const g=grp(bx-9,0,bz+9);box(5,.2,3,0x6a4220,0,.1,0,g);for(let i=0;i<5;i++)box(.1,2.8,.1,0xe8f0f4,-2.5+i*1.25,1.5,1.5,g);box(5,.1,3.1,0xcfeaf5,0,3,0,g);glas(5,2.8,.1,0,1.5,1.5,g);sperrKasten(bx-9,bz+9,5.2,3.2,0)})();
  kanne(bx+9,bz+8);schubkarre(bx+4,bz+9,.4,0x4a8a3a);fig(bx-1,bz+6,3.2,0x4a8a3a,0x4a3a2a,0xe8c24a,'zoepfe',1.25);fig(bx+4,bz+5.6,3,0xf59e3f,0x3a4a6a,0x6b4626,'cap',.95)}
/* ---------- 37. Skisprung-Schanze (Sommerbetrieb mit Matten) ---------- */
function ort37(){const b=zone('Skisprung-Schanze'),bx=b.x,bz=b.z;ast(b);const sg=1;scheibe(bx,bz+4,13,0xb8b0a0,.08);
  const g=grp(bx,0,bz);[[-1.6,-1.6],[1.6,-1.6],[-1.6,1.6],[1.6,1.6]].forEach(p=>{cyl(.22,13.4,0x8d9097,p[0],6.7,-11+p[1],g,true)});for(let k=0;k<5;k++)[0,1].forEach(a=>{box(3.4,.12,.12,0x8d9097,0,1.5+k*2.6,-11+(a?1.6:-1.6),g);box(.12,.12,3.4,0x8d9097,(a?1.6:-1.6),1.5+k*2.6,-11,g)});
  box(3.8,1.8,3.8,0xd8d0c0,0,14.3,-11,g,true);box(4.2,.3,4.2,0xc03a2a,0,15.3,-11,g);glas(3.2,.9,.1,0,14.6,-9,g);
  const L=Math.hypot(12,11),th=Math.atan2(11,12);const ir=box(1.4,.3,L,0xcfeaf5,0,8,-5,g,true);ir.rotation.x=th;box(.15,.5,L,0x3a3a3e,.6,8.3,-5,g).rotation.x=th;box(.15,.5,L,0x3a3a3e,-.6,8.3,-5,g).rotation.x=th;
  const tb=box(2.4,.4,3.4,0xf6f6f2,0,2.4,1.5,g,true);tb.rotation.x=.08;
  const ld=box(11,.4,15,0x4aae4a,0,1.15,9.5,g,true);ld.rotation.x=.14;for(let k=0;k<6;k++)box(11,.02,.25,0xf6f6f2,0,.95-k*.2+1.1,5+k*2.4,g).rotation.x=.14;box(11.4,.04,.4,0xe0302a,0,.5,13,g).rotation.x=.14;
  for(let k=0;k<7;k++){cyl(.15,2.4-k*.28,0x8d9097,-5.8,1.2-(k*.12),3+k*2.1,g);cyl(.15,2.4-k*.28,0x8d9097,5.8,1.2-(k*.12),3+k*2.1,g)}
  const sp=kindL({jacke:0xe0302a,hose:0x2a3a5a,haut:0xe8b98f,haar:0x6b4626,stil:'cap',rucksack:null},g);sp.g.position.set(0,14.2,-8.4);sp.g.scale.setScalar(.9);hutAuf(sp,0x2a2a2e,.9);vm(g);
  sperrKasten(bx,bz-11,5,5,0);sperrKasten(bx,bz-5,2,13,0);sperrKasten(bx,bz+9.5,11.6,15,0);
  (function(){const x=bx-12,z=bz-1;box(2.8,5,2.8,0xd8d0c0,x,2.5,z,scene,true);box(3.2,.3,3.2,0x6a6a70,x,5.1,z,scene);glas(2.6,1.4,.1,x,4,z+1.45,scene);sperrKasten(x,z,3,3,0)})();
  fahne(bx+9,bz-3,9,0xe0302a,0xffffff);fahne(bx-9,bz-3,9,0x3b8fc4,0xffffff);
  (function(){const x=bx+13,z=bz+6;[0,1,2].forEach(i=>box(3,.5,6,0x9a6a3a,x,.25+i*.5,z-2.5+i*1,scene,true));sperrKasten(x,z+(-1.5),3,6,0)})();
  [[12,4],[13.4,6.4],[11.6,7.4]].forEach((p,i)=>fig(bx+p[0],bz+p[1],-1.57,[0xe0605a,0x3b8fc4,0x4caf6a][i],0x3a4a6a,[0xe8c24a,0x2a1d14,0x6b4626][i],'zoepfe',1+i*.1));fig(bx-5,bz+4,1.57,0xf6f6f2,0x3a3a4a,0x6b4626,'cap',1.4);fig(bx-6.5,bz+2.4,1.2,0xe0302a,0x3a3a4a,0xb5651d,'kurz',1.2)}
/* ---------- 38. Zahnradbahn mit Haltestelle ---------- */
const GLEIS=spl([[157,104],[155,60],[158,20],[154,-20],[157,-60],[155,-100],[158,-140],[155,-172]],3);
function ort38(){const b=zone('Zahnradbahn'),bx=146,bz=-70;ast(b);
  wegBand(GLEIS,3,0x7a6a58,.05);bandM(inw(GLEIS,.75),.2,0x4a4a50,.07);bandM(inw(GLEIS,-.75),.2,0x4a4a50,.07);bandM(GLEIS,.22,0x8a8a90,.075);
  for(let i=0;i<GLEIS.length-1;i++){const a=GLEIS[i],c=GLEIS[i+1];inst('box',(a[0]+c[0])/2,.08,(a[1]+c[1])/2,2.4,.12,.4,0x5a4030,Math.atan2(-(c[1]-a[1]),c[0]-a[0])+Math.PI/2)}
  GLEIS.forEach(q=>sgMark(q[0],q[1],3.5));
  (function(){const px=152.6,pz=-62;box(2.6,.3,15,0xcfcabc,px,.15,pz,scene).receiveShadow=true;[-5,5].forEach(z=>cyl(.12,3.2,0x6a4220,px-.6,1.6,pz+z,scene,true));box(3,.2,11,0x7a3a2a,px-.3,3.3,pz,scene);bankW(px-.6,pz-2.4,Math.PI/2);bankW(px-.6,pz+2.4,Math.PI/2);laterne(px-1,pz-6.4);laterne(px-1,pz+6.4);box(.6,1.6,.5,0x4a88c8,px-1,.9,pz+4,scene,true);kreis(px-1,pz+4,.5);
    fig(px-.4,pz-.4,1.57,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.95);fig(px-.4,pz+1.4,1.57,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.25);fig(px-.6,pz-3.6,-1.57,0xf59e3f,0x3a4a6a,0x6b4626,'kurz',1.3)})();
  chalet(bx-3,bz-3,6,4.4,Math.PI/2,{h:3});bankW(bx-8,bz+4,0);kuebel(bx-8,bz-1);laterne(bx-6,bz+6);
  const T=bahn(GLEIS.concat(GLEIS.slice(1,-1).reverse()));[0,1].forEach(i=>{const z=zug(scene,i?0x3b6fc4:0xd8302a);fahren(z,T,4,i*T.L/2)})}
function etappe3b(){ort25();ort26();ort27();ort28();ort29();ort30();ort31();ort32();ort33();ort34();ort35();ort36();ort37();ort38()}

/* ==================== Etappe 4: Landschaft, Wälder, Wiesen, Kleinteile ==================== */
function wegkreuz(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;cyl(.12,2.6,0x6a4220,0,1.3,0,g,true);box(1,.14,.14,0x6a4220,0,2,0,g);box(.7,.4,.5,0x8a5a32,0,2.7,0,g);cone(.6,.5,0x7a3a2a,0,3.1,0,g).rotation.y=.8;kreis(x,z,.4)}
function heustadel(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;[[-2,-1.4],[2,-1.4],[-2,1.4],[2,1.4]].forEach(p=>cyl(.14,2.6,0x6a4220,p[0],1.3,p[1],g,true));box(5,.2,3.4,0x6a4220,0,2.6,0,g);box(4.6,2,3,0xa8743f,0,3.7,0,g,true);giebel(g,5,3.4,4.7,0x6a5a4a,0xa8743f);box(4.8,.1,3.2,0xe8c850,0,2.76,0,g);kreis(x,z,2.3)}
function etappe4(){
  WEGE.forEach(s=>s.forEach(q=>sgMark(q[0],q[1],5.6)));EXTRAZONEN.forEach(e=>{if(e.name!=='Staubecken')sgMark(e.x,e.z,e.r+3)});WS.forEach(w=>sgMark(w[0],w[1],w[2]+5));
  sgMark(0,114,16);sgMark(30,126,14);sgMark(-22,124,10);sgMark(FEST.x,FEST.z,26);for(let z=TORZ-30;z<TORZ+12;z+=2)sgMark(0,z,6);SEIL.forEach(q=>sgMark(q[0],q[1],6));for(let x=74;x<=134;x+=6)sgMark(x,-82,7);
  /* Randwald: dichte Fichten und Lärchen an den Seiten */
  for(let z=-232;z<142;z+=5.5)[[-177,-160],[160,177]].forEach(rg=>{for(let k=0;k<3;k++){const x=rg[0]+nr()*(rg[1]-rg[0]),zz=z+nr()*4;if(!frei(x,zz)||!thFrei(x,zz,4.6))continue;if(nr()<.25)laerche(x,zz,1.1+nr()*.6);else fichte(x,zz,1+nr()*.7)}});
  /* Wälder im Mittelteil: Bergwald */
  [[-120,-8,30,26,90],[-20,-6,22,20,46],[70,-6,26,22,70],[132,-4,22,18,40],[-70,-60,26,18,50],[10,-58,22,16,40],[130,-52,20,14,36],[-150,50,14,40,50],[150,52,14,40,50],[-30,80,20,6,16],[96,-94,14,8,12]].forEach(c=>{let n=0,t=0;while(n<c[4]&&t++<c[4]*14){const x=c[0]+(nr()-.5)*c[2]*2,z=c[1]+(nr()-.5)*c[3]*2;if(!frei(x,z)||!thFrei(x,z,5.6))continue;if(nr()<.28)laerche(x,z,.9+nr()*.6);else fichte(x,z,.85+nr()*.7);n++}});
  /* Lärchen und Einzelbäume auf der Alm und im Tal */
  zuf((x,z)=>{if(thFrei(x,z,7))laerche(x,z,.9+nr()*.6)},46,(x,z)=>z<86&&z>10);zuf((x,z)=>{if(thFrei(x,z,6)){baum(x,z,nr()<.5?0:1,.9+nr()*.4);thSet(x,z)}},34,(x,z)=>z>80);
  zuf((x,z)=>{if(thFrei(x,z,4))latsche(x,z,.8+nr()*.7)},110,(x,z)=>z<-80);zuf((x,z)=>{if(thFrei(x,z,5))fichte(x,z,.8+nr()*.5)},40,(x,z)=>z<-90&&z>-186);
  zuf((x,z)=>{if(thFrei(x,z,3)&&!x_in_zone(x,z)){block(x,z,.9+nr()*1.5);thSet(x,z)}},70,(x,z)=>z<-60);zuf((x,z)=>{if(!x_in_zone(x,z))steinhaufen(x,z,1+nr())},60,(x,z)=>z<-60);
  zuf((x,z)=>arose(x,z,.8+nr()*.6),150,(x,z)=>z<60&&z>-130);zuf((x,z)=>busch(x,z,.9+nr()*.5,[0x4a8a3a,0x3f7a34,0x5a9a46][Math.floor(nr()*3)]),70,(x,z)=>z>-50&&thFrei(x,z,2.4));
  /* Wiesenblumen und Gras */
  zuf((x,z)=>gras(x,z,.5+nr()*.6),900);const fl=[enzian,edelweiss,arnika,glocke,(x,z)=>blumeI(x,z)];zuf((x,z)=>fl[Math.floor(nr()*5)](x,z),520,(x,z)=>z>-140);
  zuf((x,z)=>{inst('sph',x,.02,z,3+nr()*3,.04,2.5+nr()*2,[0x9ccb66,0x86bb54,0xa4d070][Math.floor(nr()*3)])},70,(x,z)=>z>-100);
  [[-20,76,0],[20,50,.8],[-90,40,-.4],[70,-55,.4],[-135,86,1.2]].forEach(h=>{if(frei(h[0],h[1]))heustadel(h[0],h[1],h[2])});
  /* Zäune und Hecken an den Weiden (Zufallsstücke längs der Wege) */
  [[-90,84,-60,84],[10,84,34,84],[60,50,92,50],[-140,52,-124,48]].forEach(h=>hecke(h[0],h[1],h[2],h[3],null,0));
  /* Berge am Horizont im Süden und Gletscherzungen sind Kulisse (siehe kulisse) */
  /* ---- Kleinteile an Wegen ---- */
  (function(){const nahe=(x,z)=>EXTRAZONEN.some(e=>e.name!=='Bach'&&Math.hypot(x-e.x,z-e.z)<e.r+4);
    SEITENWEGE.forEach((r,ri)=>{for(let x=-130;x<=142;x+=17){if(Math.abs(x-wegX(r))<12)continue;const z=roadZ(x,r),side=((Math.round(x/17)+ri)%2)?1:-1,zz=z+side*4.6;if(nahe(x,zz)||!frei(x,zz))continue;const f=Math.round(x/17+ri*3)%8;
      if(f===0)bankW(x,zz,side>0?0:Math.PI);else if(f===1)laterne(x,zz);else if(f===2)fahrrad(x,zz,.3,[0xe0302a,0x3b6fc4,0x4caf6a][ri%3]);else if(f===3)kanne(x,zz);else if(f===4)tonne(x,zz);else if(f===5){tisch(x,zz,0);bankW(x,zz+1.6,Math.PI);bankW(x,zz-1.6,0)}else if(f===6)wegkreuz(x,zz,side*.5);else{ballen(x,zz,.3)}}});
    for(let z=GRENZE.z1-34;z>TORZ+6;z-=14){if(SEITENWEGE.some(r=>Math.abs(z-r)<12)||Math.abs(z-114)<16)continue;const x=wegX(z),side=(Math.round(z/14)%2)?1:-1,xx=x+side*4.4,f=Math.round(z/14)%5;if(nahe(xx,z)||!frei(xx,z))continue;if(f===0)bankW(xx,z,side>0?-Math.PI/2:Math.PI/2);else if(f===1)laterne(xx,z);else if(f===2)holzstapel(xx+side*1.6,z,1.57);else if(f===3)steinhaufen(xx,z,1.6);else{fahrrad(xx,z,1.57,0xf59e3f)}}
  })();
  /* Murmeltiere und Gämsen am Rand der Alm */
  [[-146,80,0],[150,70,2],[-150,-70,1],[146,-120,3]].forEach((p,i)=>{if(!frei(p[0],p[1]))return;const m=murmel(scene);m.position.set(p[0],0,p[1]);m.rotation.y=p[2];m.scale.setScalar(1.3);lebendig.push({o:m,ph:i});kreis(p[0],p[1],.5)});
}
/* ==================== Etappe 5: Bewegung, Besucher, Finale ==================== */
function etappe5(){
  /* ---- Wolken ---- */
  for(let i=0;i<8;i++){const g=grp(0,48+nr()*14,0);for(let k=0;k<2;k++)sph(1,0xffffff,(k-.5)*4+nr()*2,nr()*1.5,(nr()-.5)*4,g,5+nr()*2,2+nr(),3+nr()*2);const x0=nr()*700,z=-230+nr()*400,v=1.2+nr()*1.4;bewegt(g,t=>{g.position.x=((x0+t*v)%700+700)%700-350;g.position.z=z})}
  /* ---- Bergdohlen und Adler am Himmel ---- */
  [[-100,90,30,12,0,.3],[60,100,34,13,2,.28],[-120,-20,28,11,4,.33],[110,-20,26,14,1,.35],[0,20,40,15,3,.25],[-60,-110,24,10,5,.32],[100,60,22,12,2,.3],[-130,60,26,13,4.4,.34],[30,-80,32,14,1.6,.27],[0,-150,30,16,3.7,.26]].forEach(f=>flieger(f[0],f[1],f[2],f[3],f[4],f[5],0x2a2a2e,0xe8b830));
  [[-90,-60,50,30,0,.12],[80,-90,60,34,2,.1],[-20,40,70,38,4,.09]].forEach(a=>adler(a[0],a[1],a[2],a[3],a[4],a[5]));
  /* ---- Gleitschirme und Hubschrauber ---- */
  [[-60,60,36,34,0,.09,0xe0302a,0xf6f6f2],[60,-20,30,40,2,.1,0x3b8fc4,0xf2c230],[-100,-120,34,38,4,.08,0xf59e3f,0xe0302a],[110,40,30,36,1,.11,0x4caf6a,0xf6f6f2]].forEach(a=>gleitschirm(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]));
  (function(){const h=heli(scene);h.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{const a=t*.08,x=Math.cos(a)*110,z=-40+Math.sin(a)*90;h.position.set(x,32+Math.sin(t*.3)*2,z);h.rotation.y=Math.atan2(-Math.cos(a)*90,-Math.sin(a)*110);h.rotation.z=-.08}}},ph:0})})();
  /* ---- Wege für Spaziergänger ---- */
  const sp=(pts,f)=>spl(pts,2.5).filter(f),hw=z0=>sp(Array.from({length:30},(_,i)=>[wegX(112-i*10),112-i*10]),q=>q[1]<=z0[0]&&q[1]>=z0[1]),rd=(r,x0,x1)=>sp(strasse(r),q=>q[0]>=x0&&q[0]<=x1);
  const hwW=spl([[-146,94],[-152,60],[-146,20],[-150,-20],[-144,-60],[-150,-110],[-146,-160]],2.5),hwO=spl([[146,94],[150,50],[144,8],[148,-30],[142,-70],[146,-110],[142,-160]],2.5);
  const JK=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0x9b6fd0,0xf2c230],HR=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a],ST=['kurz','zoepfe','cap','pferd'],RU=[0xb83a2e,0x3b6fc4,0x4a6a3a,null,0xe0a030,null];
  const routen=[[hw([108,64]),1.2],[hw([64,6]),1.2],[hw([6,-60]),1.2],[hw([-60,-120]),1.2],[hw([-120,-168]),1.2],[rd(94,-140,-14),1.3],[rd(94,14,140),1.3],[rd(44,-140,-14),1.3],[rd(44,14,140),1.3],[rd(-8,-140,-14),1.3],[rd(-8,14,140),1.3],[rd(-58,-140,-14),1.3],[rd(-58,14,140),1.3],[rd(-110,-140,-14),1.3],[rd(-110,14,140),1.3],[rd(-160,-140,-14),1.3],[rd(-160,14,140),1.3],[hwW,1.1],[hwO,1.1]];
  let k=0;routen.forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);const anz=i<5?2:(i%3?1:2);for(let j=0;j<anz;j++){const av={jacke:JK[(k*3+j)%9],haar:HR[(k+j*2)%6],stil:ST[(k+j)%4],rucksack:RU[(k+j)%6]};wanderer(B,2+((k+j)%3)*.4,j*2.1+i,av,(k+j)%5===0?0xe8c850:null);k++}});
  [[hw([108,-20]),1.3],[hw([-20,-168]),1.3],[rd(94,-140,140),1.2],[rd(44,-140,140),1.2],[rd(-8,-140,140),1.2],[rd(-58,-140,140),1.2]].forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);for(let j=0;j<(i<2?2:1);j++)radler(B,4.2+j*.6,j*3+i,JK[(i*2+j)%9],[0xe0302a,0x3b6fc4,0x4caf6a,0xf59e3f][(i+j)%4],HR[(i+j)%6])});
  /* Hirten, Bergführerin, Traktor, Kuhherde auf der Straße */
  wanderer(pendel(rd(44,-130,-20),.9),1.2,0,{jacke:0x4a6a3a,hose:0x5a4a3a,haar:0x6b4626},0x5a3a22);const HB=pendel(rd(44,-130,-20),1.4);for(let i=0;i<3;i++)streif(kuh,HB,1.2,i*5+2.5,1.1);
  wanderer(pendel(rd(-110,14,100),.9),1.4,0,{jacke:0xd8302a,hose:0x3a3a4a,haar:0xb0b0b0},0xe0302a);wanderer(pendel(rd(-110,14,100),.9),1.4,1.4,{jacke:0xf59e3f,hose:0x3a4a6a,haar:0x6b4626},0xf2c230);
  (function(){const T=pendel(rd(-58,-120,150),2.4);const t=trecker(scene);fahren(t,T,3.4,0)})();
  streif(hundM,pendel(rd(94,-60,-10),.8),2.2,0,1.2);streif(hundM,pendel(rd(-8,40,100),.8),2.2,6,1.2);
  /* ---- Falter und Libellen ---- */
  [[-100,60,0xf6d030],[-70,-20,0xf08a2a],[-20,30,0xffffff],[40,40,0xf6d030],[60,-10,0xf08a2a],[-10,-60,0xffffff],[30,-70,0xf6d030],[-40,-100,0xf08a2a],[80,-120,0xffffff],[-110,-110,0xf6d030],[-60,60,0xf47ab0],[100,80,0xf6d030],[-130,20,0xffffff],[140,0,0xf08a2a]].forEach((f,i)=>{falter(f[0],f[1],5,1.5+(i%3)*.4,i*1.7,f[2]);if(i%3===0)falter(f[0]+3,f[1]-2,4,1.9,i+1,0xf47ab0)});
  for(let i=0;i<3;i++)libelle(-96+(i-1)*8,-92+(i%2)*6,4,1.3+i*.4,i*2,[0x2a5ac8,0x1a9a6a,0xc0302a][i])
}
function paradeBauen(){
  const wp=(jk,hs,hr,hat,st)=>p=>{const w=grp(0,0,0,p);const m=kindL({jacke:jk,hose:hs,haut:0xe8b98f,haar:hr,stil:st||'kurz',rucksack:null},w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.4);if(hat)hutAuf(m,hat);[m.bl,m.br,m.al,m.ar].forEach(q=>{vmVerschm(q);q.userData.frei=1});vmVerschm(m.g);w.userData.anim=t=>{const q=Math.sin(t*6)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q;m.al.rotation.x=-q*.7;m.ar.rotation.x=q*.7};return w};
  const liste=[[molli,2.6],[kuh,1.5],[wp(0x2a5a8a,0x2a5a8a,0x6b4626,null,'zoepfe'),1],[ziege,1.9],[wp(0xd8302a,0x3a3a4a,0xb0b0b0,0xe0302a),1],[gams,1.8],[wp(0x4a6a3a,0x5a4a3a,0x6b4626,0x5a3a22),1],[steinbock,1.6],[p=>schaf(p),1.5],[wp(0xf2c230,0x3a4a6a,0x6b4626,0xf2c230),1],[hundM,1.6],[murmel,1.6],[p=>lamm(p),1.8]];
  liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
/*@@F@@*/
function weltBauen(){
/* Leistung: gröbere Grundformen (Kugel 9x6, Zylinder 8, Kegel 7) für alle Teile dieser Welt */
gSph.copy(new THREE.SphereGeometry(1,8,5));gCyl.copy(new THREE.CylinderGeometry(1,1,1,8));gCone.copy(new THREE.ConeGeometry(1,1,7));
FARBEN={boden:0x72ad4e,pfad:0xd0c2a0,platz:0xe6dcc0,gehege:0x9ccb66};
etappe1();
kulisse();
etappe2();
etappe3();
etappe3b();
etappe4();
etappe5();
/*@@ENDE@@*/
instFlush();
}

