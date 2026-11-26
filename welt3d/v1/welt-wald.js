/* Welt: Wald und Waldtiere (Kennwort wald). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Schilder: von Anfang an keine Hinweisschilder (Wunsch der Lehrkraft, 24.11.2026). Nur Ausgang, Geschafft!, Spielname und Zahlen-Schilder der Rätsel. */
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Emma Eichhörnchen';
const START={x:0,z:128};
const VERTEXFARBEN=true,MERGEZELLE=50,FERNBESUCHER=65,FERNLEBEN=90;
const ZOOMMAX=45;
/* Sammelstücke: mögliche Verstecke der 5 Edelsteine (abseits der Wege, in Ecken). Gefunden und geprüft mit werkzeuge/_verstecke.js; die Engine lost je Spiel 5 aus. */
const SAMMELPOOL=[
  {x:16,z:138,ort:'Waldeingang'},
  {x:-154,z:-151,ort:'Waldspielplatz'},
  {x:134,z:-163,ort:'Felsenplatz'},
  {x:-158,z:125,ort:'Waldkindergarten'},
  {x:138,z:11,ort:'Pilzlichtung'},
  {x:-46,z:-57,ort:'Ameisenhaufen'},
  {x:-163,z:0,ort:'Wildschweinsuhle'},
  {x:145,z:118,ort:'Waldlager'},
  {x:48,z:-109,ort:'Baumarten-Garten'},
  {x:-54,z:-159,ort:'Wildkamera-Station'},
  {x:-43,z:60,ort:'Rastplatz'},
  {x:42,z:48,ort:'Eichhörnchenwald'},
  {x:40,z:-37,ort:'Fledermaushöhle'},
  {x:-119,z:54,ort:'Rehwiese'},
  {x:110,z:-47,ort:'Waldteich'},
  {x:-88,z:115,ort:'Waldlehrpfad'},
  {x:-109,z:-56,ort:'Moor'},
  {x:-155,z:-92,ort:'Waldbahn'},
  {x:103,z:-114,ort:'Köhlerhütte'},
  {x:50,z:-164,ort:'Wildbienen-Hotel'},
  {x:66,z:119,ort:'Försterhaus'},
  {x:162,z:-45,ort:'Bach mit Furt'},
  {x:-91,z:-98,ort:'Biberburg'},
  {x:145,z:56,ort:'Vogelkundestation'},
  {x:-109,z:14,ort:'Fuchsbau'}
];
const BEREICHE={
  eingang:{name:'Waldeingang',x:0,z:136,plaetze:[]}
};
/* 37 Orte in 6 Reihen (z = 112, 62, 8, -48, -104, -158) und 6 Spalten; dazu der Baumkronenpfad in der Mitte. Jeder Ort liegt an einem Stichweg von der Querstraße südlich der Reihe (Reihe 0: nördlich). */
const EXTRAZONEN=[
  {name:'Waldkindergarten',x:-150,z:112,r:13},{name:'Beerenwiese',x:-114,z:112,r:13},{name:'Waldlehrpfad',x:-78,z:112,r:13},{name:'Försterhaus',x:80,z:112,r:15},{name:'Kräutergarten',x:116,z:112,r:12},{name:'Waldlager',x:152,z:112,r:13},
  {name:'Hasenwiese',x:-146,z:62,r:17},{name:'Rehwiese',x:-98,z:62,r:19},{name:'Rastplatz',x:-48,z:62,r:13},{name:'Eichhörnchenwald',x:48,z:62,r:15},{name:'Hirschlichtung',x:98,z:62,r:19},{name:'Vogelkundestation',x:146,z:62,r:15},
  {name:'Wildschweinsuhle',x:-146,z:8,r:18},{name:'Fuchsbau',x:-98,z:8,r:16},{name:'Eulenbaum',x:-48,z:8,r:13},{name:'Spechtallee',x:48,z:8,r:14},{name:'Dachsburg',x:98,z:8,r:16},{name:'Pilzlichtung',x:146,z:8,r:15},
  {name:'Froschtümpel',x:-146,z:-48,r:15},{name:'Moor',x:-98,z:-48,r:21},{name:'Ameisenhaufen',x:-48,z:-48,r:13},{name:'Fledermaushöhle',x:48,z:-48,r:16},{name:'Waldteich',x:98,z:-48,r:20},{name:'Bach mit Furt',x:146,z:-48,r:16},
  {name:'Waldbahn',x:-146,z:-104,r:18},{name:'Biberburg',x:-98,z:-104,r:22},{name:'Waldboden-Station',x:-48,z:-104,r:12},{name:'Baumarten-Garten',x:48,z:-104,r:14},{name:'Köhlerhütte',x:98,z:-104,r:15},{name:'Sägewerk',x:146,z:-104,r:19},
  {name:'Waldspielplatz',x:-146,z:-158,r:16},{name:'Hochsitz-Gruppe',x:-98,z:-158,r:16},{name:'Wildkamera-Station',x:-48,z:-158,r:12},{name:'Wildbienen-Hotel',x:48,z:-158,r:12},{name:'Aussichtsturm',x:98,z:-158,r:14},{name:'Felsenplatz',x:146,z:-158,r:17},
  {name:'Baumkronenpfad',x:10,z:-104,r:11}
];
const SEITENWEGE=[88,35,-20,-76,-131];
const WEGBOGEN=12;
const GRENZE={x0:-180,x1:180,z0:-236,z1:148};
const TORZ=-190, FEST={x:0,z:-212};
let FARBEN,WASSER,ausgang;
const BPTS=[[0,128],[0,100],[0,60],[0,20],[0,-20]];
const BLF=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0,0xf47ab0];
const ZW=(s,w)=>WINTER?w:s;
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
function instFlush(){const G={sph:gSphL,sphT:gSphT,blm:gSphXL,con:gConL,cyl:gCylL,box:gBoxI},M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color(),CH=64,gr={},bl=[];
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
/* ==================== Hilfen für den Wald ==================== */
const nr=()=>rnd();
const roadZ=(x,r)=>r+3.5*Math.sin(x*.05+r*.7);
function strasse(r){const p=[];for(let x=-171;x<=171;x+=19)p.push([x,roadZ(x,r)]);return p}
const roadOf=z=>{const c=SEITENWEGE.filter(r=>r>z+10);return c.length?Math.min.apply(null,c):88};
function zone(n){const b=ZN(n);if(!b)throw new Error('Zone fehlt: '+n);b.road=roadOf(b.z);b.dir=b.road>b.z?1:-1;b.gap=b.dir>0?Math.PI/2:-Math.PI/2;return b}
/* Stichweg von der Querstraße bis in die Mitte des Ortes */
function ast(b,w,bend){const x=b.x,z0=roadZ(x,b.road),bd=bend==null?(x>0?-2.4:2.4):bend;weg([[x,z0],[x+bd,(z0+b.z)/2],[x,b.z+b.dir*1.5]],w||3.2)}
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
const ARTW=[2,2,2,0,0,1,1,1,3,3,4,5];
/* kleine Bodenpflanzen */
function kindL(av,par){const g=grp(0,0,0,par),bl=grp(-.2,.85,0,g),br=grp(.2,.85,0,g);[bl,br].forEach(b=>{cyl(.13,.8,av.hose,0,-.42,0,b,true);box(.3,.2,.46,0x3a3a44,0,-.88,.07,b)});
  const t=cyl(.37,.9,av.jacke,0,1.3,0,g,true);t.scale.z=.3;box(.78,.12,.58,av.hose,0,.9,0,g);const al=grp(-.47,1.62,0,g),ar=grp(.47,1.62,0,g);[al,ar].forEach(a=>{cyl(.11,.7,av.jacke,0,-.34,0,a,true);sph(.12,av.haut,0,-.76,0,a)});
  if(av.rucksack)box(.55,.65,.25,av.rucksack,0,1.35,-.34,g,true);const kopf=grp(0,2.05,0,g),h=av.haar;sph(.5,av.haut,0,0,0,kopf).castShadow=true;[-1,1].forEach(x=>{sph(.085,0x1b1b1b,x*.18,.05,.46,kopf,1,1.2,.6);sph(.07,0xf2a0a0,x*.3,-.1,.42,kopf,1,.7,.4)});sph(.045,av.haut,0,-.04,.5,kopf);box(.16,.03,.03,0xa84040,0,-.14,.49,kopf);
  if(av.stil==='cap'){sph(.53,h,0,.1,-.08,kopf,1,.8,1);sph(.54,0xe0302a,0,.14,0,kopf,1,.55,1);box(.5,.06,.36,0xe0302a,0,.16,.55,kopf)}else{sph(.54,h,0,.1,-.07,kopf,1,.85,1.02);sph(.3,h,0,.36,.34,kopf,1.4,.4,.7)}
  if(av.stil==='zoepfe')[-1,1].forEach(x=>{sph(.18,h,x*.55,-.18,-.05,kopf,.8,1.6,.8);sph(.08,0xe0605a,x*.52,.04,-.03,kopf)});if(av.stil==='pferd'){sph(.2,h,0,.12,-.58,kopf,.8,1.8,.8);sph(.08,0xe0605a,0,.2,-.5,kopf)}
  return {g,bl,br,al,ar,kopf}}
function farn(x,z,s){s=s||1;const c=[0x3f9a3a,0x4aa844,0x358a34][Math.floor(rnd()*3)],a0=rnd()*6;for(let k=0;k<4;k++){const a=a0+k*1.57+(k%2)*.3;inst('box',x+Math.cos(a)*.42*s,.16*s+(k%2)*.05,z+Math.sin(a)*.42*s,.9*s,.05*s,.2*s,c,-a)}}
function moos(x,z,s){s=s||1;inst('box',x,.06,z,.9*s,.1,.8*s,0x5f9a3a,x*3)}
function pilz(x,z,s,art){s=s||1;const k=art==null?Math.floor(rnd()*3):art;inst('cyl',x,.2*s,z,.07*s,.4*s,.07*s,0xf0e8d8);inst('sph',x,.42*s,z,.2*s,.1*s,.2*s,[0xd8302a,0xa8703a,0xe8c050][k]);if(k===0){inst('sph',x+.08*s,.5*s,z,.04*s,.03*s,.04*s,0xffffff);inst('sph',x-.07*s,.48*s,z+.07*s,.04*s,.03*s,.04*s,0xffffff)}}
function heide(x,z,s){s=s||1;inst('sph',x,.2*s,z,.5*s,.22*s,.5*s,0x6a8a4a);for(let k=0;k<2;k++)inst('blm',x+(rnd()-.5)*.6*s,.34*s,z+(rnd()-.5)*.6*s,.16*s,.12*s,.16*s,k%2?0xa04ab0:0xc070c8)}
function gras(x,z,h){h=h||.8;inst('con',x,h/2,z,.1,h,.1,0x4aa040)}
function blumeI(x,z,k){const h=.35+rnd()*.3;inst('cyl',x,h/2,z,.03,h,.03,0x3f9a46);inst('blm',x,h+.04,z,.13,.1,.13,BLF[k==null?Math.floor(rnd()*6):k])}
function stumpf(x,z,s){s=s||1;cyl(.55*s,.7*s,0x6a4a32,x,.35*s,z,scene,true);cyl(.5*s,.06,0xcfa86a,x,.72*s,z,scene);cyl(.3*s,.02,0xb08850,x,.755*s,z,scene);kreis(x,z,.62*s)}
function stamm(x,z,len,rot,r){r=r||.5;const c=cyl(r,len,0x6a4a32,x,r,z,scene,true);c.rotation.z=Math.PI/2;c.rotation.y=rot||0;const dx=Math.cos(rot||0)*len/2,dz=-Math.sin(rot||0)*len/2;sperrLinie(x-dx,z-dz,x+dx,z+dz,r*.8);
  [-1,1].forEach(s=>{const e=cyl(r*.9,.05,0xcfa86a,x+s*dx*1.0,r,z+s*dz*1.0,scene);e.rotation.z=Math.PI/2;e.rotation.y=rot||0});if(r>.4)moos(x,z,.8)}
function fels(x,z,r){const g=felsen(x,z,r);if(r>.6)inst('sph',x,r*.78,z,r*.9,r*.28,r*.8,0x5f9a3a);return g}
function tisch(x,z,rot){const g=grp(x,0,z);cyl(.7,.12,0x9a6a3a,0,.9,0,g,true);cyl(.15,.9,0x6a4a32,0,.45,0,g);g.rotation.y=rot||0;kreis(x,z,.8);return g}
function nistkasten(x,z,h,rot){const g=grp(x,0,z);cyl(.07,h,0x6a4a32,0,h/2,0,g,true);box(.5,.55,.45,0xb8793c,0,h+.1,0,g,true);const r1=box(.7,.05,.34,0x6a4a2a,0,h+.5,-.12,g);r1.rotation.x=-.6;const r2=box(.7,.05,.34,0x6a4a2a,0,h+.5,.12,g);r2.rotation.x=.6;sph(.07,0x1a1410,0,h+.12,.24,g);box(.3,.04,.2,0x6a4a32,0,h-.15,.28,g);g.rotation.y=rot||0;kreis(x,z,.3);return g}
function futterhaus(x,z,s){s=s||1;const g=grp(x,0,z);cyl(.08*s,2.4*s,0x7a5230,0,1.2*s,0,g,true);box(1.3*s,.07*s,1.0*s,0xb8793c,0,2.4*s,0,g);box(1.0*s,.5*s,.8*s,0xb8793c,0,2.7*s,0,g,true);giebel(g,1.1*s,.9*s,2.95*s,0xb94a3a,0xb8793c,.55);box(.4*s,.3*s,.05,0x2a1a10,0,2.7*s,.42*s,g);for(let i=0;i<6;i++)sph(.06,0xe8c850,-.45*s+i*.18*s,2.47*s,.4*s,g,1,.5,1);kreis(x,z,.35);return g}
function holzlaterne(x,z){const g=grp(x,0,z);cyl(.09,3,0x6a4a32,0,1.5,0,g,true);box(.8,.08,.08,0x6a4a32,.3,2.9,0,g);const l=new THREE.Mesh(gBox,new THREE.MeshBasicMaterial({color:0xffe9a0}));l.position.set(.6,2.55,0);l.scale.set(.32,.4,.32);g.add(l);box(.44,.07,.44,0x4a3220,.6,2.8,0,g);kreis(x,z,.3);return g}
function bankW(x,z,rot){const g=grp(x,0,z);box(2.4,.18,.7,0x8a5a32,0,.62,0,g,true);box(2.4,.6,.1,0x8a5a32,0,1.05,-.32,g);[-1,1].forEach(s=>box(.14,.62,.64,0x6a4220,s*1,.31,0,g));g.rotation.y=rot||0;kreis(x-Math.cos(rot||0)*.8,z+Math.sin(rot||0)*.8,.55);kreis(x+Math.cos(rot||0)*.8,z-Math.sin(rot||0)*.8,.55);return g}
function schubkarre(x,z,rot,fr){const g=grp(x,0,z);g.rotation.y=rot||0;box(1.2,.35,.8,0x3b8fc4,.1,.72,0,g,true);cyl(.28,.1,0x2a2a2a,.75,.28,0,g,true).rotation.x=Math.PI/2;[-1,1].forEach(s=>{box(.08,.5,.08,0x6a4220,-.3,.28,s*.3,g);box(1.5,.07,.07,0x6a4220,-.9,.85,s*.3,g).rotation.z=.2});if(fr)for(let i=0;i<6;i++)sph(.14,fr,-.3+(i%3)*.32,.95+(i>2?.1:0),(i%2-.5)*.4,g);kreis(x,z,.8);return g}
function hutAuf(m,col,s){s=s||1;cyl(.66*s,.07,col,0,.36,0,m.kopf);cyl(.4*s,.36,col,0,.56,0,m.kopf)}
function zeltK(x,z,rot,col){const g=grp(x,0,z);g.rotation.y=rot||0;[-1,1].forEach(s=>{const r=box(.1,2.7,3.2,col,s*.72,1.15,0,g,true);r.rotation.z=s*.55});box(.9,1.3,.08,0x2a2018,0,.7,1.62,g);box(.12,.12,3.3,0x6a4a32,0,2.3,0,g);sperrKasten(x,z,3,3.4,rot||0);return g}
function tipi(x,z,col,s){s=s||1;const g=grp(x,0,z);cone(2.1*s,4.6*s,col,0,2.3*s,0,g,true);for(let i=0;i<9;i++){const a=i*.7;cyl(.04,1.5*s,0x7a5230,Math.cos(a)*.3*s,4.7*s,Math.sin(a)*.3*s,g).rotation.set(Math.sin(a)*.18,0,-Math.cos(a)*.18)}box(1.1*s,2.1*s,.06,0x2a2018,0,1.1*s,2.0*s,g);kreis(x,z,2.1*s);return g}
function bauwagen(x,z,rot,col){const g=grp(x,0,z);g.rotation.y=rot||0;box(4.4,2.1,2.2,col,0,1.9,0,g,true);const d=box(4.6,.5,2.4,0x6a4220,0,3.1,0,g);box(4.6,.3,2.4,0x5a3a20,0,3.3,0,g);[-1,1].forEach(s=>{const w=cyl(.7,.3,0x2a2a2a,s*1.4,.7,1.15,g,true);w.rotation.x=Math.PI/2;const w2=cyl(.7,.3,0x2a2a2a,s*1.4,.7,-1.15,g,true);w2.rotation.x=Math.PI/2});box(.9,1.4,.1,0x7a5230,-1.2,1.5,1.12,g);box(1.0,.8,.1,0xcfeaf5,.9,2.1,1.12,g);box(1.1,.1,.14,0xffffff,.9,1.65,1.14,g);box(.6,1.5,.6,0x6a6a70,1.5,3.9,-.6,g);box(1.6,.12,.12,0x6a4220,3,1.0,0,g);sperrKasten(x,z,4.7,2.5,rot||0);return g}
function leiterB(x,z,rot,h){const g=grp(x,0,z);g.rotation.y=rot||0;[-.4,.4].forEach(s=>box(.08,h,.08,0x7a5230,s,h/2,0,g));for(let i=1;i<h/.45;i++)box(.8,.06,.06,0x8a5a32,0,i*.45,0,g);g.rotation.x=-.18;return g}
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
function geweih(kh,hr,s){[-1,1].forEach(z=>{const a=grp(-hr*.3,hr*.7,z*hr*.5,kh);a.rotation.set(z*.4,0,.5);cyl(.045*s,1.3*s,0xd8c8a0,0,.65*s,0,a);for(let i=0;i<3;i++)cone(.035*s,.5*s,0xd8c8a0,.1*s,(.45+i*.32)*s,0,a).rotation.z=-.75;cone(.03*s,.4*s,0xd8c8a0,0,1.35*s,0,a)})}
const rehM=automerge(function(par,kitz){return vier(par,{f:0xb5793e,w:0xf0e6d0,d:0x4a3220,lf:0xa06a36,sc:0xe6d8bc,h:1.2,bl:.85,bh:.42,bw:.34,lr:.06,bauch:1,na:.55,nl:.85,nr:.12,hr:.2,hl:1.6,ht:.3,gr:1,oh:1.7,tr:.12,tl:1,
  x:(g,kh,tl)=>{sph(.3,0xf6eedc,-.8,1.2,0,g,.5,1,.9);if(kitz)for(let i=0;i<10;i++)sph(.06,0xf6eedc,Math.cos(i*1.7)*.7,1.52+Math.sin(i*2.3)*.06,Math.sin(i*1.7)*.28,g)}})});
const hirschM=automerge(function(par,kuh){return vier(par,{f:kuh?0x8a6038:0x7a5230,w:0xcdbb98,d:0x2a1d14,lf:0x6a4426,sc:0x9a7a58,nf:kuh?0x8a6038:0x5a3a22,h:kuh?1.6:1.85,bl:kuh?1.1:1.3,bh:kuh?.52:.62,bw:kuh?.42:.5,lr:kuh?.085:.1,bauch:1,na:.65,nl:kuh?.9:1.05,nr:kuh?.18:.22,hr:kuh?.26:.3,hl:1.7,ht:.2,gr:1.1,oh:1.2,tr:.18,tl:1,
  x:(g,kh,tl,nk)=>{if(!kuh){sph(.4,0x4a2e1a,.05,.6,0,nk,1.1,1.5,1.2);geweih(kh,.3,1)}sph(.25,0xe8d8b8,kuh?-1.05:-1.2,kuh?1.6:1.85,0,g,.5,1,.8)}})});
const fuchsM=automerge(function(par){return vier(par,{f:0xd8602a,w:0xf7efe0,d:0x1a1410,lf:0x2a1a12,sc:0xf7efe0,h:.68,bl:.7,bh:.3,bw:.26,lr:.055,bauch:1,na:.5,nl:.28,nr:.13,hr:.22,hl:1.5,ht:.15,gr:.7,oh:1.6,ef:0x2a1a12,tr:.3,tl:2.4,tw:2.2,
  x:(g,kh,tl)=>{sph(.2,0xf7efe0,-.88,-.03,0,tl,1,.8,.8)}})});
const wildschweinM=automerge(function(par,frisch){return vier(par,{f:frisch?0x6a5238:0x4e4034,w:0x5e4e3e,d:0x2a2018,sc:0x8a7a6a,h:.98,bl:1.15,bh:.62,bw:.52,lr:.12,na:.05,nl:.35,nr:.4,hr:.42,hl:1.7,ht:.2,gr:.5,oh:.7,tr:.1,tl:1.2,tw:5,
  x:(g,kh)=>{sph(.14,0x9a7a68,.88,-.12,0,kh,.55,1.2,1.25);[-1,1].forEach(z=>cone(.045,.26,0xf4ecd8,.7,-.28,z*.2,kh).rotation.z=-.4);
    if(frisch){[.05,.38,.62].forEach((q,i)=>{const k=Math.sqrt(1-q*q);[-1,1].forEach(z=>box(2.2*k,.06,.05,0xe0bc7a,0,.98+.62*q,z*(.52*k+.01),g))})}else for(let i=0;i<5;i++)cone(.12,.34,0x2e251c,.8-i*.4,1.58,0,g)}})});
const dachsM=automerge(function(par){return vier(par,{f:0x8d8d90,w:0x6a6a6e,d:0x1a1a1a,lf:0x1a1a1a,hf:0xf2f2f0,sc:0xf2f2f0,h:.5,bl:.8,bh:.4,bw:.36,lr:.1,na:.1,nl:.22,nr:.22,hr:.26,hl:1.7,ht:.1,gr:.5,oh:.6,ef:0xf2f2f0,tr:.12,tl:1.3,
  x:(g,kh)=>{[-1,1].forEach(z=>sph(.13,0x1a1a1a,.14,.2,z*.1,kh,1.9,.25,.4))}})});
const rueckepferdM=automerge(function(par){return vier(par,{f:0x8a4a22,w:0x8a4a22,d:0x2a1d14,lf:0x8a4a22,sc:0x6a3818,h:1.95,bl:1.3,bh:.75,bw:.52,lr:.17,na:.75,nl:1.15,nr:.3,hr:.34,hl:1.9,ht:.35,gr:1.2,oh:1.4,notail:1,
  x:(g,kh,tl,nk)=>{box(.12,1.1,.36,0xe8d8b0,-.3,.6,0,nk);box(.1,.3,.2,0xe8d8b0,.4,.24,0,kh);cone(.18,1.5,0xe8d8b0,-.1,-.7,0,tl).rotation.z=Math.PI;cyl(.4,.34,0x5a3418,0,.3,0,nk);[-.62,.6].forEach(p=>[-1,1].forEach(z=>cyl(.21,.5,0xe8d8b0,1.3*p,.25,.52*.58*z,g)))}})});
function hase0(par){const g=grp(0,0,0,par),f=0xa8845a;sph(.4,f,0,.4,0,g,1.2,.9,.8).castShadow=true;sph(.28,f,.4,.7,0,g);[-1,1].forEach(z=>sph(.1,f,.35,1.15,z*.1,g,.6,2.4,.4));sph(.1,0xffffff,-.5,.45,0,g);[-1,1].forEach(z=>{sph(.05,0x111111,.63,.78,z*.14,g);sph(.2,f,-.1,.2,z*.28,g,1.4,.8,.6)});sph(.04,0xe8788a,.67,.7,0,g);
  g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*2.2))*.25};return g}
const haseM=automerge(hase0);
function eichM0(par){const g=grp(0,0,0,par),f=0xb5651d;sph(.22,f,0,.3,0,g,1.3,1,.8);sph(.16,0xf0e2cc,.1,.26,0,g,1,.9,.7);[-1,1].forEach(s=>cyl(.04,.25,f,.12,.1,s*.1,g));
  const kopf=grp(.28,.5,0,g);sph(.15,f,0,0,0,kopf);sph(.045,0x111111,.1,.04,.1,kopf);sph(.045,0x111111,.1,.04,-.1,kopf);sph(.03,0x111111,.16,-.02,0,kopf);[-1,1].forEach(s=>{cone(.04,.12,f,-.03,.17,s*.07,kopf);sph(.02,0x2a1a10,-.03,.27,s*.07,kopf)});
  const sw=grp(-.25,.3,0,g);sph(.18,0xc9772a,-.15,.25,0,sw,.8,1.8,.7);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*3)*.2;sw.rotation.z=Math.sin(t*2.2)*.15};return g}
const eichM=automerge(eichM0);
function emmaM0(par){const g=eichM0(par);const sc=new THREE.Mesh(new THREE.TorusGeometry(.12,.045,5,10),mat(0xd8302a));sc.rotation.x=Math.PI/2;sc.position.set(.2,.34,0);g.add(sc);box(.1,.2,.05,0xd8302a,.14,.22,.12,g);
  box(.2,.22,.12,0x3b6fc4,-.02,.32,.2,g);box(.22,.04,.14,0xf5f5f5,-.02,.44,.2,g);box(.04,.3,.04,0x3b6fc4,.04,.4,.14,g);return g}
const emmaM=automerge(emmaM0);
function igelM(par){const g=grp(0,0,0,par);sph(.5,0x6a5238,0,.42,0,g,1.3,.95,1).castShadow=true;for(let i=0;i<34;i++){const a=i*2.4,b=.3+((i*37)%10)/10*1.1;const px=-.1+Math.sin(b)*Math.cos(a)*.55,py=.42+Math.cos(b)*.45,pz=Math.sin(b)*Math.sin(a)*.5;const c=cone(.07,.3,i%3?0x4a3a28:0x8a7452,px*1.2,py,pz,g);c.rotation.z=-b*Math.cos(a);c.rotation.x=b*Math.sin(a)}
  const kopf=grp(.62,.3,0,g);sph(.22,0xd8b890,0,0,0,kopf,1.3,.9,.85);sph(.06,0x111111,.3,-.02,0,kopf);[-1,1].forEach(z=>{sph(.04,0x111111,.18,.1,z*.13,kopf);sph(.05,0xd8b890,-.02,.17,z*.15,kopf)});
  [[-.3,.22],[-.3,-.22],[.3,.22],[.3,-.22]].forEach(p=>sph(.07,0xc8a880,p[0],.07,p[1],g,1.4,.8,1));g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.6)*.15};return g}
const igel=automerge(igelM);
function frosch(par){const g=grp(0,0,0,par);sph(.25,0x4aa84e,0,.2,0,g,1.2,.8,1).castShadow=true;sph(.2,0xe8f0b0,.06,.12,0,g,1,.6,.9);[-1,1].forEach(z=>{sph(.08,0xffd040,.18,.38,z*.1,g);sph(.045,0x111111,.23,.39,z*.1,g,.6,1,1);sph(.13,0x3f9a46,-.15,.1,z*.2,g,1.6,.7,.8);cyl(.04,.22,0x3f9a46,.2,.1,z*.18,g)});
  g.userData.anim=t=>{g.position.y=Math.max(0,Math.sin(t*2.6))*.5;g.rotation.z=Math.max(0,Math.sin(t*2.6))*.2};return g}
function eule2(par,ohr){const g=grp(0,0,0,par),f=ohr?0x9a6a3a:0x7a5a40,b=ohr?0xe0b878:0xcfc0a8;
  sph(.5,f,0,.7,0,g,1,1.3,.9).castShadow=true;sph(.4,b,.28,.62,0,g,.45,1.15,.8);[-1,1].forEach(s=>{sph(.3,0x6a4a32,-.1,.62,s*.45,g,.45,1.3,.5);box(.14,.1,.26,0xe8b030,.1,.04,s*.2,g)});
  const kopf=grp(0,1.52,0,g);sph(.45,f,0,0,0,kopf,1,.95,1);sph(.36,b,.2,-.02,0,kopf,.5,1,1.25);
  [-1,1].forEach(s=>{sph(.17,ohr?0xf0a020:0x16110d,.4,.08,s*.2,kopf,.4,1,1);sph(.075,0x0a0806,.45,.08,s*.2,kopf,.4,1,1);if(ohr)cone(.09,.5,f,-.05,.55,s*.3,kopf)});
  cone(.07,.2,0xd8b848,.5,-.1,0,kopf).rotation.z=-Math.PI/2;g.userData.anim=t=>{kopf.rotation.y=Math.sin(t*.7)*.9};return g}
const kauzM=automerge(p=>eule2(p,false)),ohreuleM=automerge(p=>eule2(p,true));
function spechtM(par){const g=grp(0,0,0,par);sph(.2,0x1a1a1e,0,0,0,g,.8,1.9,.7).castShadow=true;sph(.17,0xf4f0e6,.08,.05,0,g,.5,1.2,.9);sph(.1,0xd8302a,-.02,-.4,0,g,.9,.7,.9);[-1,1].forEach(z=>{sph(.17,0x1a1a1e,-.08,.05,z*.2,g,.35,1.4,.4);sph(.06,0xf4f0e6,-.05,.08,z*.26,g,.3,.9,.3)});
  const kopf=grp(.04,.45,0,g);sph(.15,0x1a1a1e,0,0,0,kopf);sph(.09,0xd8302a,-.08,.05,0,kopf,.8,.8,1.1);sph(.07,0xf4f0e6,.05,-.04,0,kopf,1,.8,1.5);cone(.04,.3,0x2a2a2a,.28,-.02,0,kopf).rotation.z=-Math.PI/2;[-1,1].forEach(z=>{sph(.04,0xffffff,.1,.04,z*.11,kopf);sph(.02,0x111111,.13,.04,z*.12,kopf)});
  box(.1,.4,.04,0x1a1a1e,-.2,-.5,0,g).rotation.z=.4;g.userData.anim=t=>{const p=Math.max(0,Math.sin(t*7))*(Math.sin(t*.9)>0?1:0);kopf.rotation.z=-p*.5;kopf.position.x=.04+p*.12};return g}
const spechtA=automerge(spechtM);
function fledermaus(par,fl){const g=grp(0,0,0,par),f=0x4a3a32;sph(.2,f,0,0,0,g,1.1,1.25,.9);const kopf=grp(.05,.2,0,g);sph(.12,f,0,0,0,kopf);[-1,1].forEach(z=>{cone(.05,.16,f,-.04,.12,z*.07,kopf);sph(.025,0xf0e0d0,.1,.02,z*.05,kopf)});sph(.04,0xd8a8a0,.12,-.03,0,kopf);
  if(fl){const w=[-1,1].map(s=>{const p=grp(0,.08,s*.12,g);box(.5,.025,.9,f,0,0,s*.45,p);box(.3,.025,.6,f,-.1,0,s*.85,p);return p});vm(g,w[0],w[1]);g.userData.anim=t=>{w[0].rotation.x=Math.sin(t*14)*.8;w[1].rotation.x=-Math.sin(t*14)*.8}}
  else{[-1,1].forEach(s=>sph(.24,0x3a2c26,0,0,s*.16,g,.9,1.4,.3));g.userData.anim=t=>{g.rotation.z=Math.sin(t*1.3)*.05}}return g}
function ameise(par){const g=grp(0,0,0,par),a=0x3a2418,t=0xb8442a,k=0x2a1a14;sph(.5,a,-.9,.8,0,g,1.35,1,.95).castShadow=true;sph(.3,t,-.15,.76,0,g,1.1,.9,.85);sph(.28,k,.45,.82,0,g,1.1,1,1);
  [-1,1].forEach(s=>{sph(.07,0xffffff,.62,.92,s*.19,g);sph(.04,0x111111,.67,.92,s*.2,g);cone(.05,.28,0x4a3020,.78,.7,s*.12,g).rotation.z=-Math.PI/2+s*.4;const an=cyl(.025,.8,k,.62,1.25,s*.12,g);an.rotation.z=-.7;an.rotation.x=-s*.3});
  [-.35,-.12,.1].forEach((x,i)=>[-1,1].forEach(s=>{const l=grp(x,.74,s*.18,g);l.rotation.x=-s*(.9+i*.1);cyl(.035,.9,k,0,-.45,0,l);l.rotation.y=(i-1)*.45*s}));
  g.userData.anim=t=>{g.rotation.z=Math.sin(t*2)*.03};return g}
function wurm(x,z,rot,s){const g=grp(x,0,z);g.rotation.y=rot||0;s=s||1;for(let i=0;i<10;i++){const u=i/9;sph(.2*s*(i===0?.9:1),i===3||i===4?0xe0a0a0:0xc47a82,(u-.5)*4*s,.2*s,Math.sin(u*6.5)*.55*s,g,1.15,1,1)}sph(.05*s,0x2a1a1a,-2.1*s,.28*s,.3*s,g);kreis(x,z,1.4*s);return g}
function assel(x,z,rot,s){const g=grp(x,0,z);g.rotation.y=rot||0;s=s||1;for(let i=0;i<7;i++){const u=i/6,r=.5*(1-Math.abs(u-.35)*.8);sph(r*s,i%2?0x82828c:0x72727c,(.5-u)*2.4*s,.3*s,0,g,.7,.55,1.2)}[-1,1].forEach(q=>{sph(.06*s,0x111111,1.2*s,.42*s,q*.2*s,g);for(let i=0;i<5;i++)cyl(.025*s,.5*s,0x4a4a52,(.45-i*.38)*s,.12*s,q*.55*s,g).rotation.x=q*.8;cyl(.02*s,.8*s,0x4a4a52,1.35*s,.5*s,q*.2*s,g).rotation.z=-1.1});kreis(x,z,1.2*s);return g}
function schnecke(x,z,rot,s){const g=grp(x,0,z);g.rotation.y=rot||0;s=s||1;sph(.35*s,0xc8b890,.1*s,.2*s,0,g,2.1,.5,.7);sph(.5*s,0xb88a4a,-.15*s,.65*s,0,g,1,1,.7);const t=new THREE.Mesh(new THREE.TorusGeometry(.3*s,.07*s,5,12),mat(0x8a5a2a));t.position.set(-.15*s,.65*s,.34*s);g.add(t);[-1,1].forEach(q=>{cyl(.03*s,.5*s,0xc8b890,.7*s,.55*s,q*.12*s,g).rotation.z=-.3;sph(.06*s,0x111111,.78*s,.8*s,q*.14*s,g)});kreis(x,z,1);return g}
function libelle(cx,cz,r,y,ph,farbe){const g=grp(cx,y,cz);cyl(.035,1.1,farbe,.1,0,0,g).rotation.z=Math.PI/2;sph(.1,0x1a8a4a,.68,.02,0,g);[-1,1].forEach(s=>sph(.06,0x2a5ac8,.7,.05,s*.08,g));const w=[-1,1].map(s=>{const p=grp(.25,.06,0,g);[.0,-.2].forEach(x=>box(.16,.012,.5,0xe4f4ff,x,0,s*.28,p));return p});
  g.userData.anim=t=>{const a=t*1.1+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a*1.4)*r*.7;g.position.set(x,y+Math.sin(t*2+ph)*.5,z);g.rotation.y=Math.atan2(-Math.cos(a*1.4)*1.4*r*.7,-Math.sin(a)*r);w[0].rotation.x=Math.sin(t*30)*.5;w[1].rotation.x=-Math.sin(t*30)*.5};leben(g,ph);return vm(g,w[0],w[1])}
function falter(cx,cz,r,y,ph,farbe){const g=grp(cx,y,cz);sph(.07,0x3a2a22,0,0,0,g,2,.5,.5);const fl=[-1,1].map(s=>sph(.3,farbe,0,0,s*.3,g,.9,.1,1.1));g.userData.anim=t=>{const a=t*.5+ph;g.position.set(cx+Math.cos(a)*r,y+Math.sin(t*1.3+ph)*.4,cz+Math.sin(a)*r*.7);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*14)*.7;fl[1].rotation.x=-Math.sin(t*14)*.7};leben(g,ph);return vm(g,fl[0],fl[1])}
function vogelM(par,f,bf,s){const g=grp(0,0,0,par);sph(.15,f,0,.2,0,g,1.3,1,.9);sph(.11,bf,.07,.15,0,g,1.1,.8,.8);sph(.09,f,.18,.32,0,g);cone(.025,.07,0xe8a030,.27,.32,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>sph(.018,0x111111,.23,.35,z*.05,g));box(.22,.03,.08,f,-.26,.22,0,g).rotation.z=.4;cyl(.012,.12,0x5a4a3a,0,.06,.04,g);cyl(.012,.12,0x5a4a3a,0,.06,-.04,g);g.scale.setScalar(s||1);return g}
const SV=[[0x4a88c8,0xf2d030],[0xd8602a,0xf4ecd8],[0x6a5038,0xd8c8a8],[0x2a2a2a,0x3a3a3a],[0xd8c030,0xf6f0d0],[0x2a9ad8,0xe07a30]];
function sitz(x,y,z,ry,k,s){const v=vogelM(scene,SV[k][0],SV[k][1],s||1.5);v.position.set(x,y,z);v.rotation.y=ry;return v}
function flieger(cx,cz,r,y,ph,sp,f1,f2){const g=grp(0,y,0);sph(.12,f1,0,0,0,g,1.6,.7,.7);box(.14,.05,.1,f2,.17,0,0,g);const fl=[-1,1].map(s=>box(.5,.03,.18,f1,0,.02,s*.25,g));g.scale.setScalar(1.6);
  g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.8,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.8;g.position.set(x,y+Math.sin(t*.8+ph)*1.8,z);g.rotation.y=Math.atan2(-vz,vx);fl[0].rotation.x=Math.sin(t*16)*.7;fl[1].rotation.x=-Math.sin(t*16)*.7};leben(g,ph);return vm(g,fl[0],fl[1])}
function biberM(par){const g=grp(0,0,0,par),f=0x6b4a30,d=0x4a3220;sph(.55,f,0,.5,0,g,1.35,.85,.85).castShadow=true;[[-.35,.25],[-.35,-.25],[.4,.25],[.4,-.25]].forEach(p=>cyl(.08,.25,d,p[0],.12,p[1],g));[-1,1].forEach(s=>box(.35,.04,.18,d,-.45,.03,s*.27,g));
  const kopf=grp(.78,.62,0,g);sph(.3,f,0,0,0,kopf,1.1,1,.95);sph(.13,0x8a6a48,.28,-.08,0,kopf,1,.8,1);sph(.05,0x111111,.4,-.02,0,kopf);[-1,1].forEach(s=>{box(.04,.1,.03,0xf2a43a,.38,-.17,s*.03,kopf);sph(.04,0x111111,.2,.1,s*.2,kopf);sph(.08,d,-.05,.26,s*.18,kopf,.6,1,.6)});
  cyl(.03,.8,0x8a5a32,.42,-.14,0,kopf).rotation.x=Math.PI/2;sph(.35,0x2a2420,-1.0,.2,0,g,1.5,.12,.85).rotation.z=.15;g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.8)*.12};return g}
const biber=automerge(biberM);
function ente0(par){const g=grp(0,0,0,par);sph(.5,0xc8a878,0,.35,0,g,1.3,.7,.85).castShadow=true;sph(.3,0xc8a878,-.55,.55,0,g,.8,.9,.6);cyl(.09,.4,0x2f7a4a,.4,.65,0,g);
  const kopf=grp(.45,.9,0,g);sph(.22,0x2f7a4a,0,0,0,kopf);box(.28,.08,.2,0xf2b230,.24,-.04,0,kopf);sph(.035,0x111111,.1,.07,.13,kopf);sph(.035,0x111111,.1,.07,-.13,kopf);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.5)*.25;g.rotation.z=Math.sin(t*1.1)*.03};return g}
const ente=automerge(ente0);
function fischK(par,f){f=f||0x8aa0a8;const g=grp(0,0,0,par);sph(.4,f,0,0,0,g,1.5,.55,.5);sph(.2,0xe8eef0,.05,-.12,0,g,1.7,.35,.6);cone(.28,.5,0xa8b8bc,-.75,0,0,g).rotation.z=Math.PI/2;box(.3,.22,.04,f,0,.28,0,g);sph(.05,0x111111,.45,.1,.2,g);sph(.05,0x111111,.45,.1,-.2,g);return vm(g)}
function schwarm(geo,farbe,n,fn){const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:farbe}),n);im.frustumCulled=false;scene.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler();
  lebendig.push({o:{userData:{anim:t=>{if(Math.hypot(camera.position.x-im.userData.cx,camera.position.z-im.userData.cz)>130){im.visible=false;return}im.visible=true;for(let i=0;i<n;i++){const a=fn(i,t);P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(0,a[6]||0,0));M.compose(P,Q,S);im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}}},ph:0});const a0=fn(0,0);im.userData.cx=a0[0];im.userData.cz=a0[2];return im}
const froschM=automerge(frosch);
function marienkaefer(x,z){sph(.14,0xd8302a,x,.14,z,scene,1.1,.7,1);sph(.05,0x1a1a1a,x+.1,.17,z+.05,scene)}
/* ==================== Etappe 1: Boden, Wege, Tor, Eingang, Festplatz ==================== */
function etappe1(){
const boden=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200),mat(FARBEN.boden));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
WASSER=0x3f93b8;
hauptweg(5);
SEITENWEGE.forEach(r=>{weg(strasse(r),4);const px=wegX(r);kreuzplatz(px,roadZ(px,r),7.5)});
[-1,1].forEach(s=>{const zs=[104];SEITENWEGE.forEach(r=>zs.push(roadZ(171,r)));zs.push(-176);const p=[];zs.forEach((z,i)=>{if(i>0){const m=(zs[i-1]+z)/2;p.push([s*(171+1.4*Math.sin(m*.09)),m])}p.push([s*(171+(i%2?.8:-.8)),z])});weg(p,3.2)});
weg([[0,TORZ+2],[0,TORZ-24]],5,FARBEN.platz);scheibe(FEST.x,FEST.z,17,FARBEN.platz,.08);scheibe(0,122,14,FARBEN.pfad,.07);
/* ---------- Ausgang (Tor wird geöffnet) ---------- */
ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{cyl(.75,6.6,0x6a4a32,s*4.4,3.3,0,g,true);sph(.95,0x4a8a3a,s*4.4,6.8,0,g,1,.45,1)});box(10.8,1,.7,0x5a3a20,0,6.2,0,g,true);box(11,.3,1,0x4a8a3a,0,6.85,0,g);
  const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.2,.4);g.add(s);
  const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,0x8b5d2e,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,0xd8b878,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.34,0x6a4220,s*-1.9,1,0,p);box(3.8,.2,.34,0x6a4220,s*-1.9,2.8,0,p);return p});
  kreis(-4.4,TORZ,1);kreis(4.4,TORZ,1);return {g,fl,offen:0}})();
/* ---------- 1. Waldeingang: Holztor, Infohütte, Brunnen ---------- */
(function(){const b={x:0,z:122},ez=142;[-1,1].forEach(s=>{cyl(.6,6.4,0x6a4a32,s*6.5,3.2,ez,scene,true);sph(.85,0x4a8a3a,s*6.5,6.7,ez,scene,1,.45,1);kreis(s*6.5,ez,.9);for(let k=0;k<3;k++)cone(.3,1.1,0x3f8a3a,s*6.5+(k-1)*.3,7.2,ez+(k%2)*.2,scene)});
  box(14.6,.9,.8,0x5a3a20,0,6.1,ez,scene,true);box(15,.35,1.2,0x4a8a3a,0,6.75,ez,scene);const s=schildText(CONFIG.spielname,'#fff8e6',7.5,1.6,CONFIG.spielname.length>12?44:60);s.position.set(0,6.1,ez+.45);scene.add(s);
  stall(b.x-17,b.z+2,5.4,4,2.7,0x8a5a32,0x4a6a3a,Math.PI/2);box(1.4,.12,.12,0x6a4220,b.x-14,2.4,b.z+2.6,scene);
  /* Wanderkarte (Tafel ohne Schrift) */
  (function(){const g=grp(15,0,b.z+1);g.rotation.y=-Math.PI/2;[-1.5,1.5].forEach(x=>cyl(.1,3.2,0x6a4220,x,1.6,0,g,true));box(3.8,2.5,.14,0x8a5a32,0,2.2,0,g,true);box(3.4,2.1,.06,0xf2e6c8,0,2.2,.1,g);box(2.2,1.2,.03,0x7fbf5a,-.4,2.3,.14,g);box(.8,.5,.03,0x4aa3d8,.7,2.0,.15,g);box(.12,1.6,.03,0xc8a068,.1,2.3,.16,g).rotation.z=.5;[[-1,2.7],[-.2,2.5],[.4,2.8]].forEach(p=>cone(.16,.4,0x2f6b44,p[0],p[1],.17,g));box(3.9,.14,.5,0x4a6a3a,0,3.55,0,g);sperrKasten(15,b.z+1,3.8,.6,-Math.PI/2)})();
  /* Brunnen mit Dach */
  (function(){const g=grp(-9,0,108);cyl(1.6,.9,0x9aa0a6,0,.45,0,g,true);cyl(1.25,.2,WASSER,0,.9,0,g);[-1,1].forEach(s=>cyl(.1,2.6,0x6a4220,s*1.5,1.3,0,g,true));[-1,1].forEach(q=>{box(3.9,.15,1.4,0x4a6a3a,0,2.85,q*.55,g).rotation.x=q*.4});cyl(.04,.9,0x3a3a3a,0,2.2,0,g);cyl(.28,.4,0x8a5a32,0,1.5,0,g);kreis(-9,108,2.1)})();
  holzstapel(-22,130,.2);schubkarre(-22.6,134.5,.5,0xe8c050);tisch(14,136,0);stumpf(11.6,136,1);stumpf(16.4,136.4,1);stumpf(14,138.6,1);bankW(-11,114,Math.PI/2);bankW(11,114,-Math.PI/2);holzlaterne(-5.4,134);holzlaterne(5.4,134);
  [[-6,141],[6,141]].forEach(p=>kuebel(p[0],p[1]));futterhaus(-24,120,1.2);nistkasten(23,128,3,-1);sitz(-23.8,3.5,120.2,.5,0);sitz(-24.2,2.6,119.6,2.4,4);
  person(5,122,Math.PI/2*3,0x4a6a3a,0x4a4a3a,0x5a3a22,'kurz',1.3);kreis(5,122,.6);const f=person(4,125.4,-1.2,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.8);kreis(4,125.4,.5);
  for(let i=0;i<16;i++){const a=nr()*6.28,rr=3+nr()*2;blumeI(-11+Math.cos(a)*rr,126+Math.sin(a)*rr*.6,i%6);blumeI(14+Math.cos(a)*rr,115+Math.sin(a)*rr*.5,(i+2)%6)}})();
/* ---------- Festplatz: Lagerfeuerfest im Wald ---------- */
(function(){const z0=FEST.z,bue=grp(0,0,z0-12);box(16,1,6,0x8a5a32,0,.5,0,bue,true);box(16.4,.3,6.4,0xd8b878,0,1.05,0,bue);[-1,1].forEach(s=>box(.6,7,.6,0x6a4220,s*8,3.5,-2.6,bue,true));box(16.6,1.2,.5,0x4a7a3a,0,7,-2.6,bue);
  const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.2,-2.4);bue.add(gs);kreis(0,z0-12,9);
  const kr=new THREE.Mesh(new THREE.TorusGeometry(2.2,.4,8,24),mat(0x4a7a3a));kr.position.set(0,5,-2.2);bue.add(kr);const kf=[0xe0302a,0xf2882a,0xffd45e,0x4caf6a,0xb06ae0,0xe0302a,0xf2882a,0xffd45e];for(let i=0;i<8;i++){const a=i/8*6.283;sph(.35,kf[i],Math.cos(a)*2.2,5+Math.sin(a)*2.2,-2.0,bue)}box(11,5.6,.2,0x5a4a2a,0,3.8,-2.55,bue);
  [-6.5,6.5].forEach(x=>{for(let i=0;i<5;i++)cone(.45,2.4,0x2f6b44,x+(i-2)*.5,2.2,-1,bue)});
  const farben=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4,0xf59e3f];for(let i=0;i<24;i++){const t=i/23,x=-14+t*28,y=6.4-Math.sin(t*Math.PI)*2.2;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:farben[i%5]}));l.position.set(x,y,z0-8);l.scale.setScalar(.28);scene.add(l)}
  [-14,14].forEach(x=>{cyl(.15,7,0x6a4220,x,3.5,z0-8,scene,true)});
  const fa=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4];for(let i=0;i<14;i++){const t=i/13;cone(.4,.8,fa[i%4],-12+t*24,6.2-Math.sin(t*Math.PI)*1.8-.5,z0-8,scene).rotation.z=Math.PI}
  /* Lagerfeuer */
  const fx=0,fz=z0+10;for(let i=0;i<10;i++){const a=i/10*6.283;sph(.4,0x8a8f96,fx+Math.cos(a)*1.5,.25,fz+Math.sin(a)*1.5,scene,1.2,.8,1)}kreis(fx,fz,1.7);
  const f=grp(fx,.25,fz);[0,1.2,2.4].forEach(a=>{cyl(.15,1.8,0x4a3220,0,.15,0,f).rotation.set(Math.PI/2,0,a)});
  const FL=[[0xff5a1a,.6,1.7,0,0],[0xff9a2a,.45,1.3,.3,.1],[0xffd040,.32,.95,-.25,.15],[0xff7a2a,.34,1.05,.05,-.3]].map(p=>{const m=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:p[0]}));m.scale.set(p[1],p[2],p[1]);m.position.set(p[3],p[2]/2,p[4]);f.add(m);return{m,h:p[2],w:p[1]}});
  f.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{FL.forEach((q,i)=>{const s=1+Math.sin(t*9+i*2)*.16+Math.sin(t*15+i)*.08;q.m.scale.set(q.w*(2-s),q.h*s,q.w*(2-s));q.m.position.y=q.h*s/2})}}},ph:0});rauch(scene,fx+.2,2,fz);
  for(let i=0;i<9;i++){const a=i/9*6.283+.3,x=fx+Math.cos(a)*5.6,z=fz+Math.sin(a)*5.6;stamm(x,z,3,a+Math.PI/2,.42)}
  [[-13,2],[13,2],[-12,16],[12,16]].forEach(p=>{tisch(p[0],z0+p[1],0);stumpf(p[0]+1.8,z0+p[1],.9);stumpf(p[0]-1.8,z0+p[1],.9)});
  [[-9,-2],[9,-2],[-15,9],[15,9],[-7,18],[7,18]].forEach(p=>holzlaterne(p[0],z0+p[1]));
})();
}
/* ==================== Etappe 2: Orte 2 bis 19 ==================== */
const hundM=automerge(function(par){return vier(par,{f:0x8a5a32,w:0xf6f2ea,d:0x3a2a20,sc:0xe8d8c0,h:.72,bl:.65,bh:.3,bw:.24,lr:.07,bauch:1,na:.45,nl:.3,nr:.14,hr:.22,hl:1.4,ht:.3,oh:1.2,ef:0x5a3a22,tr:.1,tl:2.6,tw:7})});
const dk=(c,f)=>new THREE.Color(c).multiplyScalar(f).getHex();
function wp(x,z,rot,jk,hs,hr,st,ruck,s,kr){const m=kindL({jacke:jk,hose:hs,haut:0xe8b98f,haar:hr,stil:st||'kurz',rucksack:ruck||null},scene);m.g.position.set(x,0,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.25);if(kr!==0)kreis(x,z,.5);return m}
function huegel(cx,cz,rx,ry,rz,col){const g=sph(1,col,cx,0,cz,scene,rx,ry,rz);g.castShadow=true;kreis(cx,cz,Math.min(rx,rz)*.95);return g}
function loch(cx,cz,rx,ry,rz,dx,dy,r){const k=1-(dx/rx)*(dx/rx)-(dy/ry)*(dy/ry),dz=rz*Math.sqrt(Math.max(.05,k)),x=cx+dx,z=cz+dz;sph(r*1.35,0x8a6a42,x,dy,z-.12,scene,1.1,1.05,.35);sph(r,0x16100a,x,dy,z+.02,scene,1.1,.95,.5)}
function astBis(b,zEnd,w){const x=b.x,z0=roadZ(x,b.road);weg([[x,z0],[x+(x>0?-2.4:2.4),(z0+zEnd)/2],[x,zEnd]],w||3.2)}
function busch(x,z,s,k){s=s||1;inst('sph',x,.55*s,z,.9*s,.7*s,.9*s,k||0x3f8a3a);inst('sph',x+.5*s,.6*s,z+.3*s,.6*s,.5*s,.6*s,0x56a04a);kreis(x,z,.8*s)}
/* ---------- 2. Waldlehrpfad ---------- */
function ort2(){const b=zone('Waldlehrpfad'),bx=b.x,bz=b.z;ast(b);
  for(let i=0;i<5;i++){const x=bx-9+i*1.9,h=.5+i*.28;cyl(.62,h,0x6a4a32,x,h/2,bz-6,scene,true);cyl(.55,.05,0xd8b878,x,h+.02,bz-6,scene);cyl(.38,.06,0xb8905a,x,h+.04,bz-6,scene);cyl(.18,.07,0xd8b878,x,h+.05,bz-6,scene);kreis(x,bz-6,.7)}
  (function(){const g=grp(bx+8,0,bz-8);[-4.2,4.2].forEach(x=>cyl(.15,3.2,0x6a4220,x,1.6,0,g,true));box(9.4,.2,.5,0x5a3a20,0,3.1,0,g);[0xe8e4da,0x4a3a2a,0x9a5a38,0x8c8a82,0x6a4a3a,0x7a3a2a].forEach((c,i)=>{box(1.45,2.6,.3,c,-3.6+i*1.45,1.5,0,g,true);for(let k=0;k<3;k++)box(.1,2.4,.34,dk(c,.7),-3.95+i*1.45+k*.35,1.5,0,g)});sperrKasten(bx+8,bz-8,9.4,.7,0)})();
  (function(){const g=grp(bx-7,0,bz+3);box(3,.15,1.6,0x9a6a3a,0,1.0,0,g,true);[-1.3,1.3].forEach(x=>[-.6,.6].forEach(z=>cyl(.08,1,0x6a4220,x,.5,z,g)));for(let i=0;i<4;i++)box(.5,.03,.35,[0x4a9a44,0xd8a030,0xc04a2a,0x6aa83a][i],-1.1+i*.55,1.1,.2,g).rotation.y=i;for(let i=0;i<3;i++)cone(.14,.3,0x8a5a32,.5+i*.3,1.17,-.3,g);[0,1].forEach(i=>sph(.14,0x9aa0a6,-.9+i*.4,1.1,-.35,g,1,.7,1));
    const st=grp(.4,0,-.1,g);cyl(.05,1.1,0x3a3a3a,.9,1.55,0,st);const ring=new THREE.Mesh(new THREE.TorusGeometry(.55,.07,6,16),mat(0x3a3a3a));ring.position.set(.9,2.3,0);ring.rotation.y=.4;st.add(ring);const gl=new THREE.Mesh(gCyl,GLAS||(GLAS=new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.28,depthWrite:false})));gl.scale.set(.52,.03,.52);gl.position.set(.9,2.3,0);gl.rotation.x=Math.PI/2;gl.rotation.z=-.4;st.add(gl);
    sperrKasten(bx-7,bz+3,3.2,1.8,0);g.rotation.y=0;wp(bx-9,bz+5.2,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.85);wp(bx-5,bz+5.2,Math.PI,0x4caf6a,0x3a4a6a,0x6b4626,'cap',null,.8);wp(bx-7,bz+1.2,0,0xf59e3f,0x4a4a5a,0x2a1d14,'pferd',null,.85)})();
  for(let i=0;i<5;i++){const c=[0x9aa0a6,0x7a5a3a,0xe8d8a0,0x5f9a3a,0xc8a068][i],x=bx+3.5+i*1.7;box(1.6,.1,2.6,c,x,.06,bz+5,scene).receiveShadow=true;if(i===0)for(let k=0;k<7;k++)inst('sph',x-.5+(k%3)*.5,.15,bz+4+Math.floor(k/3)*.8,.17,.1,.17,0xb0b6bc);box(1.7,.14,.12,0x6a4220,x,.1,bz+3.6,scene);box(1.7,.14,.12,0x6a4220,x,.1,bz+6.4,scene)}
  (function(){const g=grp(bx-3,0,bz+10);[-1,1].forEach(x=>cyl(.08,1.6,0x6a4220,x,.8,0,g,true));box(2.4,1.2,.1,0x8a5a32,0,1.5,0,g,true);for(let i=0;i<6;i++)sph(.07,0x2a1a10,-.8+(i%3)*.8,1.2+(i>2?.5:0),.07,g,1,1,.3);kreis(bx-3,bz+10,1.2)})();
  bankW(bx+4,bz+11,0);bankW(bx-10,bz-1,Math.PI/2);baum(bx-11,bz+8,0,1);baum(bx+11,bz+2,3,1.1);baum(bx+8,bz+12,2,.9);baum(bx-12,bz-8,1,1);baum(bx+11,bz-10,0,1);
  for(let i=0;i<14;i++){const a=nr()*6.28,r=4+nr()*8;farn(bx+Math.cos(a)*r,bz+Math.sin(a)*r,1);if(i%3===0)pilz(bx+Math.cos(a+1)*r,bz+Math.sin(a+1)*r,1)}}
/* ---------- 3. Försterhaus mit Garten ---------- */
function ort3(){const b=zone('Försterhaus'),bx=b.x,bz=b.z;ast(b);gehegeL(b,14,0x86b860,3.6);
  const h=stall(bx,bz+7,8,6,3.4,0x9a6a3a,0x8a3a2a,Math.PI);box(.9,2.2,.9,0xa8543a,bx+2.4,4.6,bz+8.6,scene);box(1.1,.15,1.1,0x6a3a2a,bx+2.4,5.75,bz+8.6,scene);rauch(scene,bx+2.4,5.9,bz+8.6);
  [-1,1].forEach(s=>{box(.12,.12,1.6,0xe8dcc0,bx+s*1.6,3.2,bz+3.9,scene).rotation.x=0});cone(.18,.9,0xd8c8a0,bx-.7,3.9,bz+3.9,scene).rotation.z=.6;cone(.18,.9,0xd8c8a0,bx+.7,3.9,bz+3.9,scene).rotation.z=-.6;box(.5,.35,.1,0xd8c8a0,bx,3.7,bz+3.88,scene);
  const bed=[[-5,-4],[5,-4],[-5,0],[5,0]];bed.forEach((p,i)=>{box(3.4,.35,2.2,0x6b4a2f,bx+p[0],.18,bz+p[1],scene,true);box(3.2,.1,2,0x4a3220,bx+p[0],.38,bz+p[1],scene);for(let k=0;k<8;k++){const x=bx+p[0]-1.4+(k%4)*.93,z=bz+p[1]-.5+Math.floor(k/4)*1;if(i%2){inst('sph',x,.6,z,.3,.26,.3,0x4aa84e);inst('sph',x+.1,.72,z+.1,.1,.1,.1,[0xe0302a,0xf2c230][k%2])}else{inst('cyl',x,.6,z,.04,.5,.04,0x3f9a46);inst('blm',x,.9,z,.16,.12,.16,BLF[(k+i)%6])}}sperrKasten(bx+p[0],bz+p[1],3.4,2.2,0)});
  holzstapel(bx-10,bz+8,Math.PI/2);holzstapel(bx-10,bz+11,Math.PI/2);stumpf(bx+9,bz+9,1.1);tisch(bx+9.5,bz+4,0);bankW(bx+9.5,bz+6,0);
  (function(){const g=grp(bx+11,0,bz-2);cyl(.07,1.2,0x6a4220,0,.6,0,g,true);box(.6,.4,.3,0xffd45e,0,1.35,0,g);box(.05,.25,.05,0xe0302a,.3,1.6,0,g);kreis(bx+11,bz-2,.4)})();
  tier(hundM,bx-3,bz-8,bx,bz-14,1,.6);wp(bx+3,bz-9,Math.PI,0x4a6a3a,0x4a4a3a,0x5a3a22,'kurz',null,1.3);const fm=wp(bx+3.6,bz-11.6,.3,0x4a6a3a,0x4a4a3a,0x8a6a4a,'zoepfe',null,1.25);hutAuf(wp(bx-6,bz+3,.4,0x4a6a3a,0x4a4a3a,0x2a1d14,'kurz',null,1.3),0x4a6a3a);
  nistkasten(bx-12,bz+2,2.6,.8);nistkasten(bx+12,bz+8,2.4,-.8);for(let i=0;i<20;i++){const a=nr()*6.28,r=2+nr()*3;blumeI(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.7-9,i%6)}baum(bx-15,bz+13,0,1.1);baum(bx+16,bz+12,5,1);baum(bx+16,bz-8,3,1)}
/* ---------- 4. Rastplatz mit Wanderhütte ---------- */
function ort4(){const b=zone('Rastplatz'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,9,0xd8c89a,.07);
  (function(){const g=grp(bx-4,0,bz-3),w=7,d=4.4,hh=2.8;box(w,hh,.25,0x9a6a3a,0,hh/2,-d/2,g,true);[-1,1].forEach(s=>box(.25,hh,d,0x9a6a3a,s*w/2,hh/2,0,g,true));[-w/2+.2,w/2-.2].forEach(x=>cyl(.14,hh,0x6a4220,x,hh/2,d/2,g,true));giebel(g,w,d,hh,0x5a4a3a,0x9a6a3a,.5);box(w-.5,.15,d-.4,0xb8a068,0,.1,0,g);[-1.5,1.5].forEach(x=>box(.5,.4,.6,0xe8e4d0,x,.5,-1.3,g));box(5,.12,.7,0x8a5a32,0,.8,-1.7,g);box(1.4,.6,.1,0x8a5a32,2.5,1.2,-1.9,g);
    sperrKasten(bx-4,bz-3,w,d,0);for(let i=0;i<3;i++)cone(.25,.4,0xa0a0a0,-2+i*.4,.9,-1.7,g)})();
  [[5,3,.3],[-1,6,1.9]].forEach(p=>{tisch(bx+p[0],bz+p[1],0);bankW(bx+p[0],bz+p[1]+1.6,0);bankW(bx+p[0],bz+p[1]-1.6,Math.PI)});
  for(let i=0;i<8;i++){const a=i/8*6.283;sph(.3,0x8a8f96,bx+4+Math.cos(a)*1,.2,bz-5+Math.sin(a)*1,scene,1.2,.8,1)}kreis(bx+4,bz-5,1.4);
  const wk=[[6.5,-1,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',0xb83a2e],[7.8,2.6,0x4caf6a,0x6a5a8a,0x6b4626,'cap',0x3b6fc4],[-4,5,0xf59e3f,0x4a4a5a,0x2a1d14,'pferd',0x4a6a3a]];wk.forEach(w=>{const m=wp(bx+w[0],bz+w[1],w[0]>0?-1.3:1,w[2],w[3],w[4],w[5],w[6],1.25);if(w[5]==='cap')hutAuf(m,0xd8a030)});
  [[3.4,1,0xb83a2e],[-3.2,4,0x3b6fc4]].forEach(p=>{kreis(bx+p[0],bz+p[1],.7);const g=grp(bx+p[0],0,bz+p[1]);box(.9,1.1,.5,p[2],0,.6,0,g,true);box(.7,.35,.4,dk(p[2],.8),0,1.3,0,g);cyl(.2,.7,0x6a6a70,.7,.35,0,g)});
  const pd=grp(bx+9,0,bz+7);cyl(.35,1,0x8a8a90,0,.5,0,pd,true);cyl(.1,.5,0x4a4a50,0,1.2,0,pd);cyl(.38,.05,0x4aa3d8,0,1.02,0,pd);kreis(bx+9,bz+7,.5);tonne(bx-9,bz+3);
  baum(bx-11,bz+8,0,1.1);baum(bx+11,bz-6,2,1);baum(bx+12,bz+10,1,1);baum(bx-10,bz-9,3,1);for(let i=0;i<10;i++){farn(bx+(nr()-.5)*22,bz+(nr()-.5)*22,1)}}
/* ---------- 5. Fuchsbau ---------- */
function ort5(){const b=zone('Fuchsbau'),bx=b.x,bz=b.z;ast(b);const cx=bx,cz=bz-4;huegel(cx,cz,7,3.4,6,0x6aa04a);loch(cx,cz,7,3.4,6,-2.2,1.1,.9);loch(cx,cz,7,3.4,6,2.8,.8,.75);loch(cx,cz,7,3.4,6,5.6,.7,.6);
  for(let i=0;i<5;i++)sph(.8,0x8a6a42,cx-2.2+(i-2)*.9,.15,cz-4+5.5+1.5+(i%2)*.4,scene,1.6,.25,1);
  for(let i=0;i<30;i++){const a=nr()*6.28,r=Math.sqrt(nr()),x=cx+Math.cos(a)*r*6,z=cz+Math.sin(a)*r*5;const y=3.4*Math.sqrt(Math.max(0,1-(x-cx)*(x-cx)/49-(z-cz)*(z-cz)/36));if(i%3===0)busch(x,z,.5,0x4a8a3a);else{inst('con',x,y,z,.1,.7,.1,0x4aa040);if(i%5===1)inst('sph',x,y+.1,z,.14,.1,.14,0xf4d040)}}
  tier(fuchsM,bx-2,bz+4.2,bx-2,bz+12,1.15,1);tier(fuchsM,bx+5,bz+4.8,bx+6,bz+12,1,.9);tier(p=>fuchsM(p),bx+1.6,bz+6.8,bx-2,bz+4.2,.6,.5);tier(p=>fuchsM(p),bx+3.6,bz+7.4,bx+2,bz+6,.55,.5);
  stamm(bx-9,bz+3,5,.4,.55);stamm(bx+9,bz-5,4,-.8,.5);fels(bx+10,bz+5,1.1);fels(bx-10,bz-6,1.3);bankW(bx-7,bz+9,0);
  for(let i=0;i<8;i++){const a=nr()*6.28,r=3+nr()*3;inst('sph',bx+Math.cos(a)*r,.05,bz+8+Math.sin(a)*r*.5,.1,.03,.07,0x3a2a1a)}
  baum(bx-12,bz-8,2,1.1);baum(bx+12,bz-10,0,1.2);baum(bx-12,bz+10,3,1);baum(bx+12,bz+11,2,1);for(let i=0;i<12;i++)farn(bx+(nr()-.5)*26,bz+(nr()-.5)*24,1)}
/* ---------- 6. Dachsburg ---------- */
function ort6(){const b=zone('Dachsburg'),bx=b.x,bz=b.z;ast(b);const cx=bx,cz=bz-4;huegel(cx,cz,8.5,3.8,7,0x7aa850);[[-3.5,1.2],[-.5,.9],[3,1],[6.2,.6]].forEach(p=>loch(cx,cz,8.5,3.8,7,p[0],p[1],.85));huegel(cx-8.5,cz+8,3,1.4,2.6,0x7aa850);loch(cx-8.5,cz+8,3,1.4,2.6,0,.5,.5);
  [[-3.5,1.2],[-.5,.9],[3,1],[6.2,.6]].forEach((p,i)=>{for(let k=0;k<4;k++)sph(.8,0xb89a68,cx+p[0]+(k-1.5)*.8,.2,cz+6.6+k*.3+(i%2)*.5,scene,1.5,.3,1)});
  for(let i=0;i<7;i++)cone(.3+nr()*.15,.5,0xd8b84a,cx-6+i*1.2,.25,cz+8+((i*37)%5)*.3,scene);
  tier(dachsM,bx-4,bz+5.6,bx-4,bz+12,1.1,.9);tier(dachsM,bx+2,bz+6.4,bx+2,bz+12,1,.9);tier(p=>dachsM(p),bx+5.4,bz+7.6,bx+2,bz+6,.55,.5);tier(dachsM,bx-8,bz+8.2,bx-4,bz+10,.9,.8);
  stamm(bx+10,bz+2,5,1.1,.55);fels(bx-12,bz+5,1.3);fels(bx+11,bz-8,1.5);baum(bx-12,bz-8,1,1.2);baum(bx+12,bz-9,0,1.2);baum(bx+12,bz+10,2,1);baum(bx-13,bz+11,3,1);bankW(bx+6,bz+11,0);
  for(let i=0;i<14;i++)farn(bx+(nr()-.5)*28,bz+(nr()-.5)*26,1)}
/* ---------- 7. Wildschweinsuhle ---------- */
function ort7(){const b=zone('Wildschweinsuhle'),bx=b.x,bz=b.z;ast(b);gehegeL(b,17,0x8a9a5a,3.4);
  wasserRund(bx-2,bz-1,6,0x6a4a30);wasserRund(bx-2.4,bz-.6,4.2,0x7a5a3a,.02);wRing(bx-2,bz-1,6.5);for(let i=0;i<12;i++){const a=i/12*6.283;sph(.4,0x7a5a3a,bx-2+Math.cos(a)*7,.1,bz-1+Math.sin(a)*7,scene,1.5,.2,1.2)}
  tier(wildschweinM,bx-8,bz+3,bx-2,bz-1,1.15,1.4);tier(wildschweinM,bx+4,bz+4,bx-2,bz-1,1.5,1.7);for(let i=0;i<4;i++)tier(p=>wildschweinM(p,true),bx+5+i*1.4,bz+9+(i%2)*1.2,bx-2,bz-1,.5,.5);tier(wildschweinM,bx+8,bz-6,bx,bz,1.1,1.3);
  const mb=grp(bx+9,0,bz-1);cyl(.55,4.6,0x6a4a32,0,2.3,0,mb,true);for(let i=0;i<6;i++)sph(.35,0x6a4a30,.3,.7+i*.25,.25,mb,1,1.2,.6);sph(1.5,0x3f8a3a,0,5.2,0,mb,1.4,1,1.4);kreis(bx+9,bz-1,.7);
  for(let i=0;i<10;i++)inst('sph',bx-12+nr()*4,.12,bz-8+nr()*5,.12,.1,.12,0x8a6a2a);stamm(bx-11,bz-7,4,.3,.5);fels(bx-1,bz-12,1.2);fels(bx+11,bz+8,1.1);fels(bx-12,bz+9,1);
  baum(bx+13,bz-9,0,1.1);baum(bx-13,bz-10,2,1);for(let i=0;i<10;i++)farn(bx+(nr()-.5)*28,bz+(nr()-.5)*26,1);}
/* ---------- 8. Rehwiese ---------- */
function ort8(){const b=zone('Rehwiese'),bx=b.x,bz=b.z;ast(b);gehegeL(b,19,0x92cc6e,3.4);
  (function(){const g=grp(bx+9,0,bz-8);g.rotation.y=-.4;[-1.6,1.6].forEach(x=>[-.6,.6].forEach(z=>cyl(.09,1.6,0x6a4220,x,.8,z,g,true)));[-1,1].forEach(s=>{const r=box(3.6,.08,.08,0x8a5a32,0,1.5,s*.6,g);box(3.6,.9,.08,0x8a5a32,0,1.2,s*.2,g).rotation.x=s*.35});for(let i=0;i<8;i++)box(3.2,.14,.14,0xe0c050,0,1.1+i*.06,(i%2?.2:-.2),g);box(3.8,.18,1.4,0x8a5a32,0,.3,0,g);for(let i=0;i<6;i++)sph(.32,0xe0c050,-1.5+i*.6,.5,0,g,1.2,.5,1);kreis(bx+9,bz-8,2.2)})();
  box(1.2,.7,.8,0xc8c8c8,bx-7,.35,bz-10,scene,true);sph(.5,0xe0d8d0,bx-7,.8,bz-10,scene,1.1,.6,.8);kreis(bx-7,bz-10,.9);trog(bx-9,bz+6,.3,0x4aa3d8);
  tier(p=>rehM(p,false),bx-4,bz+1,bx+3,bz-4,1.1,1);tier(p=>rehM(p,false),bx+5,bz+5,bx+9,bz-8,1,1);tier(p=>rehM(p,false),bx-9,bz-2,bx-4,bz+1,1.05,1);tier(p=>rehM(p,true),bx-2,bz+4,bx-4,bz+1,.55,.5);tier(p=>rehM(p,true),bx+7,bz+2,bx+5,bz+5,.5,.5);
  tier(p=>rehM(p,false),bx-12,bz+6,bx-6,bz,1.05,1);tier(p=>rehM(p,false),bx+11,bz+1,bx+5,bz-4,1,1);tier(p=>rehM(p,true),bx-10,bz+8,bx-12,bz+6,.55,.5);tier(p=>rehM(p,true),bx+13,bz-3,bx+11,bz+1,.5,.5);ballen(bx-14,bz-5,.4);ballen(bx+14,bz-10,1);ballen(bx+12.6,bz-9.4,2);stroh(bx-3,bz-14,.2,null,.5,true);kreis(bx-3,bz-14,1.3);
  [[-12,-9],[12,9],[-6,12]].forEach((c,k)=>{for(let q=0;q<22;q++){const a=nr()*6.28,r=Math.sqrt(nr())*2.6;blumeI(bx+c[0]+Math.cos(a)*r,bz+c[1]+Math.sin(a)*r,(q+k*2)%6)}});
  for(let i=0;i<4;i++){const a=i*1.6+1,x=bx+Math.cos(a)*12,z=bz+Math.sin(a)*11;baum(x,z,[0,1,3,5][i],.9)}for(let i=0;i<90;i++){const a=nr()*6.28,r=Math.sqrt(nr())*17,x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(Math.abs(x-bx)<2&&z>bz)continue;blumeI(x,z,i%6);if(i%4===0)gras(x+.3,z,.7)}}
/* ---------- 9. Hirschlichtung ---------- */
function ort9(){const b=zone('Hirschlichtung'),bx=b.x,bz=b.z;ast(b);gehegeL(b,19,0x86c060,3.4);
  tier(hirschM,bx-3,bz-2,bx+8,bz+4,1.15,1.9);tier(p=>hirschM(p,true),bx+7,bz+4,bx-3,bz-2,.95,1.6);tier(p=>hirschM(p,true),bx+3,bz-8,bx+7,bz+4,.9,1.5);tier(p=>hirschM(p,true),bx-9,bz+6,bx-3,bz-2,.5,.8);
  (function(){const g=grp(bx-8,0,bz-9);[-2,2].forEach(x=>cyl(.12,1.8,0x6a4220,x,.9,0,g,true));box(4.6,.14,.14,0x8a5a32,0,1.6,0,g);box(4.6,.14,.14,0x8a5a32,0,1.1,0,g);box(4.6,.7,.9,0xe0c050,0,.4,0,g,true);sperrKasten(bx-8,bz-9,4.6,1,0)})();
  tier(p=>hirschM(p,true),bx+12,bz-8,bx+7,bz+4,.95,1.6);tier(p=>hirschM(p,true),bx-12,bz-4,bx-3,bz-2,.9,1.5);tier(p=>hirschM(p,true),bx+10,bz+8,bx+7,bz+4,.5,.8);ballen(bx-14,bz+10,.4);ballen(bx+14,bz+8,1.2);[[-12,-10],[11,10]].forEach((c,k)=>{for(let q=0;q<22;q++){const a=nr()*6.28,r=Math.sqrt(nr())*2.6;blumeI(bx+c[0]+Math.cos(a)*r,bz+c[1]+Math.sin(a)*r,(q+k*3)%6)}});
  trog(bx+11,bz-2,-.3,0x4aa3d8);for(let i=0;i<3;i++){fels(bx+12+i*.8,bz-8+i*.9,.9+i*.2)}stumpf(bx-12,bz+3,1.2);stumpf(bx-13.4,bz+5.2,1);
  for(let i=0;i<4;i++){const a=i*1.6+.4,x=bx+Math.cos(a)*13,z=bz+Math.sin(a)*12.5;baum(x,z,[0,1,0,5][i],1)}for(let i=0;i<90;i++){const a=nr()*6.28,r=Math.sqrt(nr())*17,x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(Math.abs(x-bx)<2&&z>bz+6)continue;if(i%3===0)gras(x,z,.9);else blumeI(x,z,i%6)}}
/* ---------- 10. Eichhörnchenwald ---------- */
function ort10(){const b=zone('Eichhörnchenwald'),bx=b.x,bz=b.z;ast(b);const T=[[-6,-6,0],[6,-5,1],[-7,4,0],[7,5,0],[0,-10,1]];T.forEach(t=>baum(bx+t[0],bz+t[1],t[2],1.3));
  (function(){const tx=bx-7,tz=bz+4,g=grp(tx+1.2,4.6,tz);cyl(.1,1.4,0x6a4a32,-.7,-.1,0,g).rotation.z=1.2;sph(.9,0x8a6a3a,.3,.3,0,g,1.1,.9,1);for(let i=0;i<10;i++){const c=cyl(.03,.9,0x6a4a2a,Math.cos(i*1.4)*.7+.3,.3+Math.sin(i*2.1)*.5,Math.sin(i*1.4)*.6,g);c.rotation.set(i,i*2,i*.7)}box(.4,.4,.1,0x1a120a,1.1,.3,0,g).rotation.y=.3;})();
  [[-6,-6,.7],[6,-5,1.6],[7,5,.4]].forEach((p,i)=>{const x=bx+p[0],z=bz+p[1],w=grp(0,0,0),m=eichM(w);m.scale.setScalar(2);m.rotation.z=Math.PI/2;w.userData.keep=1;const r=.9,ph=p[2]*4;
    lebendig.push({o:{userData:{anim:t=>{const a=p[2]+Math.sin(t*.15+ph)*.5,yy=1.5+Math.abs(Math.sin(t*.25+ph))*4.5;w.position.set(x+Math.cos(a)*r,yy,z+Math.sin(a)*r);w.rotation.y=Math.PI-a;if(m.userData.anim)m.userData.anim(t)}}},ph:0})});
  tier(eichM,bx-6,bz+6,bx-4,bz+2,2,.8);const e2=tier(eichM,bx+7,bz+8,bx+5,bz+4,2,.8);tier(emmaM,bx+10,bz+3,bx+3,bz+4,2.2,.9);
  for(let i=0;i<5;i++){busch(bx-4+i*2.2,bz-11,1,0x2f7a34);}for(let i=0;i<36;i++){inst('sph',bx-10+nr()*20,.1,bz-9+nr()*18,.09,.07,.09,[0x8a6a2a,0xc8a050][i%2])}futterhaus(bx+4,bz+9,1.2);sitz(bx+4.1,3.4,bz+9.2,.4,2);
  [[-3,7],[3,-3],[-1,-3]].forEach(p=>{for(let k=0;k<4;k++)inst('sph',bx+p[0]+(k%2)*.2,.12,bz+p[1]+(k>1?.2:0),.12,.1,.12,0x8a6a2a)});bankW(bx-10,bz-1,Math.PI/2);for(let i=0;i<14;i++)farn(bx+(nr()-.5)*26,bz+(nr()-.5)*24,1)}
/* ---------- 11. Hasenwiese ---------- */
function ort11(){const b=zone('Hasenwiese'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,17,0x9ad070,.06);
  for(let i=0;i<150;i++){const a=nr()*6.28,r=Math.sqrt(nr())*16,x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(Math.abs(x-bx)<2.4&&z>bz)continue;if(i%7===0){inst('cyl',x,.2,z,.03,.4,.03,0x4aa040);inst('sph',x,.45,z,.14,.14,.14,0xfff8c0)}else blumeI(x,z,i%6)}
  huegel(bx-9,bz-7,3.2,1.5,2.6,0x7aa850);loch(bx-9,bz-7,3.2,1.5,2.6,-1,.6,.5);loch(bx-9,bz-7,3.2,1.5,2.6,1.3,.5,.4);
  (function(){const g=grp(bx+9,0,bz-6);box(5,.3,3,0x6b4a2f,0,.15,0,g,true);box(4.8,.1,2.8,0x4a3220,0,.32,0,g);for(let i=0;i<12;i++){const x=-2+(i%6)*.8,z=-.8+Math.floor(i/6)*1.6;cone(.2,.55,0xf08a20,x,.7,z,g).rotation.z=Math.PI;for(let k=0;k<3;k++)cone(.06,.5,0x4aa84e,x+(k-1)*.1,1.1,z,g)}sperrKasten(bx+9,bz-6,5,3,0)})();
  tier(haseM,bx-4,bz+2,bx-7,bz-5,1.3,.6);tier(haseM,bx+2,bz+4,bx+8,bz-5,1.2,.6);tier(haseM,bx+5,bz-1,bx+8,bz-5,1.4,.6);tier(haseM,bx-11,bz+4,bx-4,bz+2,1.1,.6);tier(p=>haseM(p),bx-8,bz-1,bx-9,bz-7,.7,.4);tier(p=>haseM(p),bx-6,bz+3,bx-4,bz+2,.7,.4);
  const hw=grp(0,0,0);const hh=haseM(hw);lebendig.push({o:{userData:{anim:t=>{const a=t*.18;hw.position.set(bx+Math.cos(a)*11,0,bz+Math.sin(a)*9);hw.rotation.y=-a-Math.PI/2;if(hh.userData.anim)hh.userData.anim(t)}}},ph:0});hw.scale.setScalar(1.2);hw.userData.keep=1;
  const hy=grp(bx-2,0,bz-10);for(let i=0;i<3;i++)cone(1.4-i*.3,1.6-i*.2,0xd8b84a,i*.3,.8+i*.9,0,hy,true);kreis(bx-2,bz-10,1.4);baum(bx-13,bz-8,0,1);baum(bx+13,bz+9,3,1);baum(bx+12,bz-11,1,1.1)}
/* ---------- 12. Eulenbaum ---------- */
function ort12(){const b=zone('Eulenbaum'),bx=b.x,bz=b.z;ast(b);const tx=bx,tz=bz-5;
  cyl(1.7,8,0x6a4a30,tx,4,tz,scene,true).castShadow=true;cyl(2.3,1.2,0x6a4a30,tx,.6,tz,scene,true);kreis(tx,tz,2.4);
  [[0,13.3,0,4.6,3.2,4.6,0x3a7a34],[3.4,12.3,1.2,3.4,2.6,3.4,0x44883c],[-3.2,12.7,-1.2,3.4,2.8,3.4,0x358030],[.8,14.9,-.4,3,2,3,0x4a9040]].forEach(c=>sph(1,c[6],tx+c[0],c[1],tz+c[2],scene,c[3],c[4],c[5]));
  const br1=cyl(.45,4.2,0x6a4a30,tx+2.4,7.4,tz+.4,scene,true);br1.rotation.z=-1.1;const br2=cyl(.4,3.8,0x6a4a30,tx-2.2,7.2,tz+.6,scene,true);br2.rotation.z=1.05;
  sph(.8,0x1a120a,tx,3.6,tz+1.4,scene,.8,1.5,.5);box(1.8,.12,.9,0x6a4a30,tx+.2,2.7,tz+2.1,scene);
  const o1=kauzM(scene);o1.position.set(tx+4.2,8.3,tz+.7);o1.rotation.y=-1.4;o1.scale.setScalar(1);const o2=ohreuleM(scene);o2.position.set(tx-4.0,8.1,tz+.8);o2.rotation.y=-1.7;o2.scale.setScalar(1);const o3=kauzM(scene);o3.position.set(tx+.2,3.2,tz+2.3);o3.rotation.y=-1.57;o3.scale.setScalar(.6);
  [o1,o2,o3].forEach(o=>{o.userData.keep=1;leben(o)});
  for(let i=0;i<5;i++)sph(.22,0x6a5a4a,tx-2+i*.9,.14,tz+3+(i%2)*.8,scene,1.4,.6,.8);for(let i=0;i<6;i++)moos(tx+Math.cos(i*1.1)*2.4,tz+Math.sin(i*1.1)*2.4,1);
  nistkasten(bx-9,bz+2,3,.6);nistkasten(bx+9,bz+4,3.2,-.6);bankW(bx-5,bz+7,0);bankW(bx+5,bz+7,0);wp(bx-3,bz+4.6,-.2,0x3b6fc4,0x4a4a5a,0xe8c24a,'zoepfe',null,.9);wp(bx+2,bz+4.8,.3,0xe0605a,0x3a4a6a,0x2a1d14,'cap',null,.9);
  baum(bx-10,bz-8,1,1.1);baum(bx+10,bz-9,0,1.1);baum(bx+10,bz+10,2,1);baum(bx-10,bz+10,3,1);for(let i=0;i<14;i++){farn(bx+(nr()-.5)*24,bz+(nr()-.5)*22,1);if(i%3===0)pilz(bx+(nr()-.5)*22,bz+(nr()-.5)*20,1)}}
/* ---------- 13. Spechtallee ---------- */
function ort13(){const b=zone('Spechtallee'),bx=b.x,bz=b.z;ast(b);let n=0;
  [-1,1].forEach(s=>{for(let i=0;i<5;i++){const x=bx+s*(4.6+(i%2)*.8),z=bz+9-i*4.6,h=5.5+((i*7)%4)*.8;cyl(.5,h,0x8a7a6a,x,h/2,z,scene,true);cone(.5,.8,0x8a7a6a,x,h+.3,z,scene).rotation.z=.2*s;kreis(x,z,.7);
      [[1.2,.35],[2.8,-.4],[4.2,.3]].forEach((q,k)=>{if(q[0]>h-.5)return;const br=cyl(.12,1.2,0x7a6a5a,x+Math.cos(k*2+s)*.9,q[0],z+Math.sin(k*2+s)*.9,scene);br.rotation.z=1.2*s*(k%2?1:-1);br.rotation.x=.4});
      sph(.14,0x1a120a,x-s*.5,2+(i%3),z+.1,scene,1,1.5,.6);sph(.4,0xd8c8a0,x-s*.45,3.6+i*.2,z-.3,scene,.9,.25,1);
      if((i+(s>0?1:0))%2===0){const sp=spechtA(scene);sp.position.set(x-s*.62,2.6+((i*13)%7)*.35,z);sp.rotation.y=s>0?0:Math.PI;sp.userData.keep=1;leben(sp)}}});
  for(let i=0;i<8;i++){const x=bx+(nr()<.5?-1:1)*(3+nr()*10),z=bz+(nr()-.5)*22;moos(x,z,1);if(i%2)pilz(x+.5,z+.4,1)}
  stamm(bx-9,bz+8,5,.5,.5);stamm(bx+9,bz-6,4,-.4,.5);fels(bx-10,bz-8,1.2);bankW(bx+8,bz+12,0);baum(bx-12,bz-2,1,1.1);baum(bx+12,bz+3,0,1.1);baum(bx-11,bz+11,2,1);baum(bx+11,bz-11,2,1);
  for(let i=0;i<4;i++)sitz(bx+(i%2?5:-5),5.2+i*.5,bz-8+i*5,i%2?Math.PI:0,i%5,1.4)}
/* ---------- 14. Ameisenhaufen ---------- */
function ort14(){const b=zone('Ameisenhaufen'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz-3,7.5,0x9a7a4a,.07);const cx=bx,cz=bz-3;huegel(cx,cz,4.8,3.6,4.8,0x8a6a3a);
  for(let i=0;i<260;i++){const a=nr()*6.28,u=nr(),x=cx+Math.cos(a)*4.7*Math.sqrt(1-u*u),z=cz+Math.sin(a)*4.7*Math.sqrt(1-u*u),y=3.6*u;inst('con',x,y,z,.07,.6,.07,[0xc8a868,0xa88848,0xd8b878][i%3],a)}
  for(let k=0;k<4;k++){const a=k*1.6+.4;loch(cx,cz,4.8,3.6,4.8,Math.cos(a)*3.2,.5+k*.3,.5)}
  [[-1.6,2.6],[1.9,2.5],[.2,3.2]].forEach((p,i)=>{const x=cx+p[0],z=cz+p[1],y=3.6*Math.sqrt(Math.max(0,1-(p[0]*p[0]+p[1]*p[1])/23));const a=tier(ameise,x,z,x+(i-1)*3,z+8,.85,0);a.position.y=y-.15;a.rotation.z=-.4});
  const P=[[cx+3.7,cz+3.7],[cx+8,cz+8],[cx+11,cz+4],[cx+11,cz-4],[cx+7,cz-7],[cx+3.7,cz-3.7]],P2=spl(P,1.5),B=bahn(P2);
  const ap=new THREE.Vector3();schwarm(gSphL,0x2a1a14,30,(i,t)=>{const u=(t*1.1+i*B.L/30),q=B.at(u);const o=(i%2?.45:-.45),L=Math.hypot(q[2],q[3])||1;return[q[0]-q[3]/L*o,.25,q[1]+q[2]/L*o,.22,.14,.14,Math.atan2(-q[3],q[2])]});
  schwarm(gSphL,0xb8442a,30,(i,t)=>{const u=(t*1.1+i*B.L/30),q=B.at(u);const o=(i%2?.45:-.45),L=Math.hypot(q[2],q[3])||1;return[q[0]-q[3]/L*o+q[2]/L*.2,.27,q[1]+q[2]/L*o+q[3]/L*.2,.12,.11,.11,0]});
  stamm(bx+12,bz+1,4,1.2,.55);for(let i=0;i<8;i++)inst('con',bx+8+(i%4)*1.3,.5,bz-2+(i>3?1:0)*3,.5,1,.5,0x3f7a3a);baum(bx-11,bz-6,4,1.2);baum(bx-12,bz+6,2,1);baum(bx+12,bz-10,4,1.1);baum(bx+3,bz-12,2,1);bankW(bx-8,bz+5,Math.PI/2);for(let i=0;i<12;i++)farn(bx+(nr()-.5)*26,bz+(nr()-.5)*24,1)}
/* ---------- Wasser-Hilfen ---------- */
function seerose(x,z,s,blume){s=s||1;inst('sph',x,.22,z,.55*s,.03,.55*s,0x3f9a46,nr()*6);inst('sph',x+.42*s,.215,z+.1*s,.3*s,.03,.3*s,0x4aa84e);if(blume)inst('sph',x,.3,z,.17*s,.12*s,.17*s,[0xf8a8c8,0xffffff,0xf8c8d8][Math.floor(nr()*3)])}
function schilfAm(cx,cz,r,a0,a1,n){for(let i=0;i<n;i++){const a=a0+(a1-a0)*nr(),rr=r+.2+nr()*.9,h=1.5+nr()*1.1,x=cx+Math.cos(a)*rr,z=cz+Math.sin(a)*rr;inst('cyl',x,h/2,z,.04,h,.04,0x8a9a4a);if(i%2)inst('con',x,h,z,.09,.38,.09,0x6a3a22);else inst('con',x,h*.9,z,.05,h*.55,.05,0x7aa84a)}}
function schwimm(g,cx,cz,rx,rz,v,ph,y){g.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{const a=t*v+ph,x=cx+Math.cos(a)*rx,z=cz+Math.sin(a)*rz,vx=-Math.sin(a)*rx,vz=Math.cos(a)*rz;g.position.set(x,y,z);g.rotation.y=Math.atan2(-vz,vx)}}},ph:0})}
function froschAuf(x,y,z,s){const w=grp(x,y,z),f=froschM(w);w.scale.setScalar((s||1)*1.7);w.rotation.y=nr()*6;leben(f);w.userData.keep=1;return w}
function reiher(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;cyl(.05,1.6,0xd8b030,0,.8,.12,g);cyl(.05,1.6,0xd8b030,0,.8,-.12,g);sph(.5,0x9aa4ac,0,1.9,0,g,1.5,.8,.7);sph(.3,0xf0f0f0,.5,2.0,0,g,1,.8,.8);const hl=grp(.7,2.1,0,g);cyl(.07,1.1,0xf0f0f0,.1,.55,0,hl).rotation.z=-.25;sph(.17,0xf0f0f0,.3,1.1,0,hl);cone(.05,.6,0xe8b030,.7,1.1,0,hl).rotation.z=-Math.PI/2;sph(.04,0x111111,.37,1.15,.08,hl);box(.5,.08,.1,0x1a1a20,.05,1.2,0,hl);cone(.15,.8,0x6a747c,-.9,1.8,0,g).rotation.z=1.4;kreis(x,z,.4);return g}
function flugF(cx,cz,r,y,ph,s){const g=fledermaus(scene,true),an=g.userData.anim;g.scale.setScalar(s||1.6);g.userData.anim=t=>{an(t);const a=t*.9+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a*1.3)*r*.8;g.position.set(x,y+Math.sin(t*1.7+ph)*.8,z);g.rotation.y=Math.atan2(-Math.cos(a*1.3)*1.3*r*.8,-Math.sin(a)*r)};g.userData.keep=1;leben(g,ph);return g}
/* ---------- 15. Fledermaushöhle ---------- */
function ort15(){const b=zone('Fledermaushöhle'),bx=b.x,bz=b.z;ast(b);const z0=bz+12,z1=bz-11;
  [-1,1].forEach(s=>sperrLinie(bx+s*2.6,z0,bx+s*2.6,z1,.3));sperrLinie(bx-2.6,z1,bx+2.6,z1,.3);
  const RC=[0x8e949a,0x7e848a,0x9aa0a6,0x868c92];
  for(let k=0;k<12;k++){const z=bz+11.5-k*2,r=1.6+((k*7)%3)*.4;[-1,1].forEach(s=>{const sx=r*1.15,c=RC[(k+(s>0?1:0))%4];sph(r,c,bx+s*(2.9+sx*.8),r*.55,z,scene,1.15,.85,1.25);kreis(bx+s*(2.9+sx*.8+.3),z,r*1.1);if(k%2===0)sph(r*.75,RC[(k+2)%4],bx+s*(3.4+sx*.6),r*1.3+.6,z+.5,scene,1.1,.8,1.1);inst('sph',bx+s*(2.9+sx*.8),r*1.35+.2,z,r*.8,r*.2,r*.7,0x5f9a3a)})}
  sph(1,RC[0],bx,0,z1-1.6,scene,4.6,3.6,2.4);box(7.6,1.2,4.6,0x7a8086,bx,3.9,bz-1.5,scene,true);for(let i=0;i<4;i++)sph(1.5,RC[i],bx-3+i*2,4.9,bz-1.5+(i%2),scene,1.2,.7,1.1);[-1,1].forEach(s=>{sph(1,0x7a8086,bx+s*3.6,2.6,bz-1.5,scene,1.6,1.4,2.6)});
  for(let i=0;i<7;i++)cone(.22+nr()*.12,.7+nr()*.5,0x8a8f96,bx-2.4+(i%4)*1.6,3.3-.1,bz-3+Math.floor(i/4)*3.2+nr(),scene).rotation.z=Math.PI;
  const fl0=automerge(fledermaus);for(let i=0;i<7;i++){const f=fl0(scene,false);f.position.set(bx-2+(i%4)*1.3,3.0,bz-3+Math.floor(i/4)*3+(i%3)*.4);f.rotation.x=Math.PI;f.scale.setScalar(1.5);f.userData.keep=1;leben(f)}
  flugF(bx,bz+13,6,5,0);flugF(bx+2,bz+9,5,6.4,2);flugF(bx-2,bz+15,6,5.8,4);
  for(let i=0;i<8;i++){const x=bx+(nr()-.5)*5,z=z1+.3+nr()*.6;box(.9,.6,.4,0x9a6a3a,bx-2.1+i*.6,2.2+((i*5)%3)*.5,z1+.45,scene).rotation.y=0}
  [[-8,8],[8,8],[-9,0],[9,-2]].forEach((p,i)=>{fels(bx+p[0],bz+p[1],1.4+i*.2);busch(bx+p[0]*.7,bz+p[1]+3,1)});wp(bx-5,bz+14,-.4,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.85);wp(bx+5,bz+14.4,.5,0x4caf6a,0x3a4a6a,0x2a1d14,'cap',null,.85);
  baum(bx-12,bz-8,2,1.2);baum(bx+12,bz-9,2,1.1);baum(bx-12,bz+10,0,1);baum(bx+12,bz+11,1,1);for(let i=0;i<14;i++){farn(bx+(nr()-.5)*28,bz+(nr()-.5)*26,1);if(i%3===0)moos(bx+(nr()-.5)*22,bz+(nr()-.5)*20,1.2)}}
/* ---------- 16. Waldteich mit Steg ---------- */
function ort16(){const b=zone('Waldteich'),bx=b.x,bz=b.z,px=bx,pz=bz+4,r=10;astBis(b,pz+r+3);teichBau(px,pz,r,WASSER,Math.PI/2,2.4);steg(px,pz+r+3,px,pz+1.5,2.2);[[0,-7,5.5],[-6.5,0,3.5],[6.5,0,3.5],[-5,6,2.5],[5,6,2.5]].forEach(c=>kreis(px+c[0],pz+c[1],c[2]));
  box(4,.1,3,0x9a6a3a,px,.2,pz+.2,scene,true);[-1.8,1.8].forEach(x=>box(.12,.9,.12,0x7a5230,px+x,.45,pz-1.3,scene));box(4,.08,.1,0x6a4220,px,.9,pz-1.3,scene);sperrKasten(px,pz+.2,4,3,0);
  const k1=wp(px-1.2,pz+.4,-1.57,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.9,0);k1.al.rotation.x=-1.2;const k2=wp(px+1.2,pz+.5,-1.57,0x4caf6a,0x6a5a8a,0x6b4626,'cap',null,.9,0);k2.ar.rotation.x=-1.0;
  eimer(px+1.7,pz+.9,0x3b8fc4);cyl(.03,1.6,0x6a4220,px+.2,.9,pz-.4,scene).rotation.z=1.0;
  for(let i=0;i<12;i++){const a=nr()*6.28,rr=2+nr()*(r-4);seerose(px+Math.cos(a)*rr,pz+Math.sin(a)*rr*.9,.8+nr()*.5,i%2===0)}
  schilfAm(px,pz,r+.5,Math.PI+.4,Math.PI*2-.4,26);schilfAm(px,pz,r+.5,.4,Math.PI-1.2,10);
  [[0,-1.9],[3,1.3],[-4,2.6]].forEach((q,i)=>{const e=ente(scene);e.scale.setScalar(.95);e.userData.keep=1;leben(e,i);schwimm(e,px+q[0],pz+q[1],5+i,4+i*.5,.22+i*.04,i*2,.2)});
  for(let i=0;i<5;i++){const f=fischK(scene,[0x8aa0a8,0xc8a070,0x7a9a8a][i%3]);f.scale.setScalar(.5);schwimm(f,px,pz-1,4+i*.8,3+i*.5,.35+i*.05,i*1.3,.24)}
  [[0,-1],[2.6,2],[-3,1],[1,-3]].forEach((q,i)=>libelle(px+q[0],pz+q[1],3.5+i,1.8+i*.3,i*1.7,[0x2a9ad8,0xd8302a,0x2ab88a,0x2a9ad8][i]));
  const lg=cyl(.4,3.6,0x6a4a32,px-3.5,.25,pz-5,scene);lg.rotation.z=Math.PI/2;lg.rotation.y=.4;const tu=grp(px-3.2,.62,pz-5);sph(.45,0x4a5a2a,0,0,0,tu,1.2,.6,1);sph(.14,0x5a6a3a,.55,-.02,0,tu);tu.rotation.y=-.4;
  reiher(px-r-1.2,pz+2,.4);froschAuf(px+r+.8,.1,pz+3,1);froschAuf(px+r+1.2,.1,pz+1,.8);
  (function(){const x=px-r-4,z=pz-4,g=grp(x,0,z);cyl(.6,5,0x6a4a32,0,2.5,0,g,true);sph(1,0x6aa84a,0,5.4,0,g,2.6,1.7,2.6).castShadow=true;kreis(x,z,.8);for(let k=0;k<26;k++){const a=k/26*6.283;inst('cyl',x+Math.cos(a)*2.4,2.6,z+Math.sin(a)*2.4,.04,3,.04,0x8ac86a);inst('cyl',x+Math.cos(a+.1)*1.5,3.2,z+Math.sin(a+.1)*1.5,.04,2.4,.04,0x7ab85a)}})();
  bankW(px+r+3,pz+8,Math.PI);bankW(px-r-2,pz+8,Math.PI);baum(bx+13,bz-12,0,1.1);baum(bx+14,bz+9,1,1);baum(bx-14,bz+11,2,1);for(let i=0;i<12;i++)farn(bx+(nr()-.5)*34,bz+(nr()-.5)*32,1)}
/* ---------- 17. Froschtümpel ---------- */
function ort17(){const b=zone('Froschtümpel'),bx=b.x,bz=b.z;ast(b);
  const P=[[bx-8,bz-3,4.6],[bx+8.5,bz-2,3.8],[bx-7.5,bz+8,3.2]];teichBau(P[0][0],P[0][1],P[0][2],WASSER,0,2.0);teichBau(P[1][0],P[1][1],P[1][2],WASSER);teichBau(P[2][0],P[2][1],P[2][2],WASSER);steg(bx-1.2,bz-3,bx-8.2,bz-3,1.8);
  P.forEach((p,k)=>{for(let i=0;i<7;i++){const a=nr()*6.28,rr=nr()*(p[2]-1.2);seerose(p[0]+Math.cos(a)*rr,p[1]+Math.sin(a)*rr,.7+nr()*.4,i%2===0)}schilfAm(p[0],p[1],p[2]+.5,0,6.28,12)});
  for(let i=0;i<14;i++)inst('sph',P[0][0]+4.6+nr()*.8,.2,P[0][1]-2+nr()*4,.14,.12,.14,0x2a2a2a);for(let i=0;i<18;i++)inst('sph',P[1][0]-4.3+nr()*.5,.28,P[1][1]-2.5+nr()*5,.13,.13,.13,0xdfe9e0);
  [[P[0][0]-1,P[0][1]-3],[P[1][0]+2,P[1][1]+1.5],[P[2][0]+1,P[2][1]-2]].forEach((q,i)=>{froschAuf(q[0],.24,q[1],1.1)});[[bx-2,bz-8],[bx+3,bz+7],[bx-12,bz+3],[bx+12,bz+4],[bx+4,bz-9]].forEach(q=>froschAuf(q[0],0,q[1],1));
  [[0,0],[5,2],[-4,-3]].forEach((q,i)=>libelle(P[i%3][0]+q[0]*.3,P[i%3][1]+q[1]*.3,3,1.7+i*.3,i*2,[0x2a9ad8,0x2ab88a,0xd8302a][i]));falter(bx+2,bz+4,4,1.6,0,0xf6d030);
  for(let i=0;i<5;i++){const a=i*1.3;stamm(bx+Math.cos(a)*11,bz+Math.sin(a)*10,3,a,.45)}for(let i=0;i<10;i++){const a=nr()*6.28,r=4+nr()*9;if(Math.hypot(Math.cos(a)*r+bx-P[0][0],Math.sin(a)*r+bz-P[0][1])>6)inst('sph',bx+Math.cos(a)*r,.2,bz+Math.sin(a)*r,.4,.14,.4,0xf2c830)}
  wp(bx+1,bz+10,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.85);bankW(bx+5,bz+11,0);baum(bx-13,bz-10,2,1.1);baum(bx+13,bz-9,0,1.1);baum(bx+13,bz+10,3,1);for(let i=0;i<12;i++){farn(bx+(nr()-.5)*30,bz+(nr()-.5)*28,1)}}
/* ---------- 18. Biberburg im Waldsee ---------- */
function ort18(){const b=zone('Biberburg'),bx=b.x,bz=b.z,px=bx,pz=bz-7,r=12.5;astBis(b,pz+r+3);teichBau(px,pz,r,WASSER,Math.PI/2,2.4);steg(px,pz+r+3,px,pz+r-5,2.2);[[0,-5,7],[-8,2,4],[8,2,4],[-6,9,3],[6,9,3]].forEach(c=>kreis(px+c[0],pz+c[1],c[2]));kreis(px-3,pz-3,3.4);
  box(4,.1,3,0x9a6a3a,px,.2,pz+r-5.6,scene,true);sperrKasten(px,pz+r-5.6,4,3,0);[-1.8,1.8].forEach(x=>box(.12,.9,.12,0x7a5230,px+x,.45,pz+r-7.1,scene));box(4,.08,.1,0x6a4220,px,.9,pz+r-7.1,scene);
  (function(){const ix=px-3,iz=pz-3;cyl(3.6,.2,0xc8b078,ix,.2,iz,scene);const g=sph(1,0x6a4a30,ix,.3,iz,scene,3,2.3,3);g.castShadow=true;for(let i=0;i<70;i++){const a=nr()*6.28,u=nr()*.95,x=ix+Math.cos(a)*3*Math.sqrt(1-u*u),z=iz+Math.sin(a)*3*Math.sqrt(1-u*u),y=.3+2.3*u;inst('box',x,y,z,1.5,.12,.12,[0x6a4a30,0x8a6a40,0x5a3a20][i%3],nr()*3)}sph(.6,0x16100a,ix+1.6,.5,iz+2,scene,1,.8,.5)})();
  for(let k=0;k<7;k++){const a=-1.4+k*.22,x=px+Math.cos(a)*(r+1.9),z=pz+Math.sin(a)*(r+1.9);stamm(x,z,3.6,-(a+Math.PI/2),.45);if(k<6){const x2=px+Math.cos(a+.11)*(r+1.9),z2=pz+Math.sin(a+.11)*(r+1.9);const c=cyl(.4,3.4,0x7a5a3a,x2,1.2,z2,scene);c.rotation.z=Math.PI/2;c.rotation.y=-(a+.11+Math.PI/2)}}
  [[-1,5],[0,6.6],[1.3,5.4]].forEach(p=>{const x=px+p[0]*3+16,z=pz+p[1]*0;});
  [[bx+16,bz+4],[bx-17,bz-2],[bx+14,bz-12]].forEach(p=>{cyl(.45,1.2,0x7a5a3a,p[0],.6,p[1],scene,true);cone(.45,.8,0x9a7a52,p[0],1.55,p[1],scene);kreis(p[0],p[1],.6);inst('sph',p[0]+.7,.1,p[1]+.5,.2,.08,.1,0xcfa86a)});stamm(bx+14,bz+9,7,-.5,.5);
  for(let i=0;i<2;i++){const bw=biber(scene);bw.userData.keep=1;leben(bw,i);schwimm(bw,px,pz-1,6+i*2,4.5+i,.2+i*.05,i*3,.15)}tier(biber,bx+16.5,bz+7,bx+15,bz+4,1.2,.8);
  [[2,-2],[-5,3]].forEach((q,i)=>{const e=ente(scene);e.scale.setScalar(.9);e.userData.keep=1;leben(e,i);schwimm(e,px+q[0],pz+q[1],7,5,.18,i*2.4,.2)});for(let i=0;i<10;i++){const a=nr()*6.28,rr=4+nr()*(r-6);seerose(px+Math.cos(a)*rr,pz+Math.sin(a)*rr*.9,.9,i%2===0)}
  schilfAm(px,pz,r+.5,Math.PI+.2,Math.PI*2-.2,32);schilfAm(px,pz,r+.5,.3,Math.PI-1.3,14);libelle(px-5,pz+2,3.5,1.9,0,0x2a9ad8);libelle(px+4,pz-5,3,2.2,2,0xd8302a);
  bankW(px+r+4,pz+r-2,Math.PI);baum(bx+19,bz-5,1,1.2);baum(bx-20,bz+8,0,1.2);baum(bx-19,bz-12,2,1.2);baum(bx+3,bz-20,0,1.3);for(let i=0;i<14;i++)farn(bx+(nr()-.5)*40,bz+(nr()-.5)*40,1)}
/* ---------- 19. Bach mit Trittsteinen und Furt ---------- */
function ort19(){const b=zone('Bach mit Furt'),bx=b.x,bz=b.z;ast(b);
  const BA=[[116,-42],[126,-40.5],[136,-42.2],[146,-41],[156,-39.8],[166,-41.5]],s=spl(BA,2.2),br=bruecke(146,-41,s,3.2),fp=s.reduce((m,q)=>Math.abs(q[0]-131)<Math.abs(m[0]-131)?q:m,s[0]);bachBauen(s,3.2,[br,fp]);
  for(let i=0;i<6;i++){const st=cyl(.6,.34,0x9aa0a6,fp[0]+(nr()-.5)*.7,.17,fp[1]-3.4+i*1.35,scene);st.scale.set(.55+nr()*.12,.34,.55+nr()*.12)}
  [[112,-43],[114,-40.5],[115.5,-44]].forEach((p,i)=>fels(p[0],p[1],1.3+i*.3));busch(112,-38,1);[[118,-48],[122,-36],[150,-36.4],[160,-44]].forEach((p,i)=>fels(p[0],p[1],.9+i*.1));
  s.forEach((q,i)=>{if(i%3||i<3)return;const a=s[Math.max(0,i-1)],c=s[Math.min(s.length-1,i+1)],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1,nx=-tz/l,nz=tx/l;[-1,1].forEach(sg=>{if(Math.hypot(q[0]-fp[0],q[1]-fp[1])<4.5||Math.hypot(q[0]-br[0],q[1]-br[1])<4)return;if(nr()<.5)inst('sph',q[0]+nx*sg*2.4,.18,q[1]+nz*sg*2.4,.4+nr()*.3,.25,.35,0x9aa0a6);inst('cyl',q[0]+nx*sg*2.3,.4,q[1]+nz*sg*2.3,.04,.8,.04,0x3f9a46);inst('sph',q[0]+nx*sg*2.3,.85,q[1]+nz*sg*2.3,.13,.1,.13,0xf2c830)})});
  const B=pendel(s.filter(q=>q[0]>118&&q[0]<164),.5);for(let i=0;i<5;i++){const f=fischK(scene,[0x8aa0a8,0x7a9a8a,0xb09878][i%3]);f.scale.setScalar(.38);fahren(f,B,.9+i*.12,i*B.L/5)}
  [[0,2],[1.5,-1],[-2,0]].forEach((q,i)=>libelle(bx+q[0]*3,bz-8+q[1]*2,3,1.5+i*.3,i*2,[0x2a9ad8,0xd8302a,0x2ab88a][i]));
  (function(){const x=bx+2,z=bz-3.5;cyl(.1,2.8,0x6a4220,x,1.4,z,scene,true);box(1.6,.1,.12,0x6a4220,x-.5,2.8,z,scene);sitz(x-.9,2.9,z,.4,5,.6);kreis(x,z,.4)})();
  wp(bx-9,bz+2,0,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.85);wp(bx-6,bz+5,2.4,0x4caf6a,0x6a5a8a,0x6b4626,'cap',null,.85);eimer(bx-7.4,bz+3.6,0x3b8fc4);falter(bx+4,bz+4,4,1.5,1,0xf08a2a);
  baum(bx-13,bz-10,2,1.1);baum(bx+13,bz-8,0,1.2);baum(bx+14,bz+9,1,1);baum(bx-13,bz+10,3,1);bankW(bx+8,bz+9,0);for(let i=0;i<16;i++)farn(bx+(nr()-.5)*30,bz+(nr()-.5)*28,1)}
function etappe2(){ort2();ort3();ort4();ort5();ort6();ort7();ort8();ort9();ort10();ort11();ort12();ort13();ort14();ort15();ort16();ort17();ort18();ort19()}
/* ==================== Etappe 3: Orte 20 bis 38 ==================== */
function feuer(x,z,s){s=s||1;const f=grp(x,.2,z);[0,1.2,2.4].forEach(a=>cyl(.12*s,1.5*s,0x4a3220,0,.1,0,f).rotation.set(Math.PI/2,0,a));for(let i=0;i<9;i++){const a=i/9*6.283;sph(.3*s,0x8a8f96,x+Math.cos(a)*1.2*s,.2,z+Math.sin(a)*1.2*s,scene,1.2,.8,1)}kreis(x,z,1.4*s);
  const FL=[[0xff5a1a,.5,1.4,0,0],[0xff9a2a,.38,1.05,.25,.1],[0xffd040,.26,.8,-.2,.12]].map(p=>{const m=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:p[0]}));m.scale.set(p[1]*s,p[2]*s,p[1]*s);m.position.set(p[3]*s,p[2]*s/2,p[4]*s);f.add(m);return{m,h:p[2]*s,w:p[1]*s}});
  f.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{FL.forEach((q,i)=>{const k=1+Math.sin(t*9+i*2)*.16+Math.sin(t*15+i)*.08;q.m.scale.set(q.w*(2-k),q.h*k,q.w*(2-k));q.m.position.y=q.h*k/2})}}},ph:0});rauch(scene,x+.2,1.8*s,z);return f}
function biene(cx,cz,r,y,ph,hummel){const g=grp(cx,y,cz),sz=hummel?1.5:1;sph(.12*sz,hummel?0x3a3a3a:0xf2c230,0,0,0,g,1.4,1,1).castShadow=false;[-.05,.06].forEach(x=>sph(1,0x2a2a2a,x*sz,0,0,g,.03,.125*sz,.125*sz));if(hummel)sph(.1,0xf2c230,.1,0,0,g,1,.9,.9);[-1,1].forEach(z=>sph(.022,0x111111,.18*sz,.04,z*.07,g));const fl=[-1,1].map(s=>box(.16,.02,.2,0xe8f4ff,0,.12,s*.14,g));g.userData.anim=t=>{const a=t*1.4+ph;g.position.set(cx+Math.cos(a)*r,y+Math.sin(t*2+ph)*.4,cz+Math.sin(a*1.3)*r);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*40)*.6;fl[1].rotation.x=-Math.sin(t*40)*.6};leben(g,ph);return vm(g,fl[0],fl[1])}
function bohlen(pts,w){const s=spl(pts,1.15);for(let i=0;i<s.length-1;i++){const a=s[i],c=s[i+1],th=Math.atan2(-(c[1]-a[1]),c[0]-a[0]);const p=box(.5,.1,w,0x8a6a42,(a[0]+c[0])/2,.2,(a[1]+c[1])/2,scene,true);p.rotation.y=th;p.receiveShadow=true;if(i%4===0)box(.16,.5,w+.3,0x5a3a20,(a[0]+c[0])/2,.06,(a[1]+c[1])/2,scene).rotation.y=th}}
function pilzGross(x,z,s,art){const g=grp(x,0,z);const cc=[0xd8302a,0xa8703a,0xe8b030,0xe8dcc0][art];cyl(.2*s,1.4*s,0xf4f0e0,0,.7*s,0,g,true);if(art===0){cyl(.32*s,.06*s,0xf4f0e0,0,1.0*s,0,g);sph(1,cc,0,1.45*s,0,g,.95*s,.55*s,.95*s).castShadow=true;for(let i=0;i<8;i++){const a=i*.8,b=.5+(i%3)*.28;sph(.11*s,0xffffff,Math.cos(a)*Math.sin(b)*.8*s,1.45*s+Math.cos(b)*.5*s,Math.sin(a)*Math.sin(b)*.8*s,g)}}
  else if(art===3){cyl(.1*s,2*s,0xe8dcc0,0,1*s,0,g,true);cone(.9*s,.7*s,cc,0,2.2*s,0,g);sph(.2*s,0x8a6a4a,0,2.5*s,0,g)}else sph(1,cc,0,1.45*s,0,g,.9*s,.5*s,.9*s).castShadow=true;kreis(x,z,.5*s);return g}
/* ---------- 20. Moor mit Bohlenweg ---------- */
function ort20(){const b=zone('Moor'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,18,0x5f6e3c,.05);
  const PL=[[bx-9,bz+8,3.2],[bx+9,bz+9,2.6],[bx-9.5,bz-3,3.4],[bx+8.5,bz-4,3],[bx-3,bz-13.5,2.4],[bx+10,bz-12,2.2]];PL.forEach(p=>{wasserRund(p[0],p[1],p[2],0x4f6a4a);wasserRund(p[0]-.3,p[1]+.2,p[2]*.6,0x5f7a58,.02);wRing(p[0],p[1],p[2]+.5);for(let i=0;i<8;i++){const a=nr()*6.28;seerose(p[0]+Math.cos(a)*p[2]*.5,p[1]+Math.sin(a)*p[2]*.5,.5,i%3===0)}});
  const R=[[bx,bz+19],[bx-3.2,bz+10],[bx+3,bz+2],[bx-2,bz-6],[bx+4,bz-12]];bohlen(R,2);box(4,.1,3,0x8a6a42,bx+4,.2,bz-14,scene,true);sperrKasten(bx+4,bz-14,4,3,0);[-1.8,1.8].forEach(x=>box(.12,.9,.12,0x7a5230,bx+4+x,.45,bz-15.5,scene));box(4,.08,.1,0x6a4220,bx+4,.9,bz-15.5,scene);
  wp(bx+3,bz-13.6,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.9,0);wp(bx+5.4,bz-13.8,Math.PI,0x4caf6a,0x6a5a8a,0x6b4626,'cap',null,.9,0);
  for(let i=0;i<140;i++){const a=nr()*6.28,r=Math.sqrt(nr())*17,x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(PL.some(p=>Math.hypot(x-p[0],z-p[1])<p[2]+.8))continue;if(R.some(q=>Math.hypot(x-q[0],z-q[1])<2.4))continue;if(i%3===0){const h=.5+nr()*.4;inst('cyl',x,h/2,z,.02,h,.02,0x8a9a5a);inst('sph',x,h+.05,z,.13,.13,.13,0xfafafa)}else if(i%3===1)inst('sph',x,.08,z,.7,.28,.7,[0x7aa840,0xb0a840,0x6a9a3a][i%3+i%2]);else{inst('sph',x,.05,z,.16,.04,.16,0xc0392b);inst('sph',x+.12,.05,z,.12,.03,.12,0x7ab84a)}}
  [[bx-4.5,bz+5],[bx+6.4,bz-1],[bx-6.2,bz-8]].forEach(p=>{const g=grp(p[0],0,p[1]);cyl(.04,.8,0x6a8a3a,0,.4,0,g);sph(.5,0xc0392b,0,.85,0,g,1.1,.22,1.1);for(let i=0;i<14;i++){const a=i/14*6.283;cone(.03,.34,0xe0604a,Math.cos(a)*.52,.95,Math.sin(a)*.52,g)}sph(.12,0xffffff,0,.95,0,g);kreis(p[0],p[1],.5)});
  baum(bx-14,bz-8,4,.8);baum(bx+14,bz+4,4,.75);baum(bx-12,bz+13,3,.9);baum(bx+12,bz-14,3,.9);baum(bx-1,bz-17,4,.8);[[bx-5,bz+14],[bx+7,bz+5]].forEach(p=>froschAuf(p[0],0,p[1],1));libelle(bx-9,bz+8,3,1.6,0,0x2a9ad8);libelle(bx+8,bz-4,3,1.8,2,0xd8302a);falter(bx,bz,6,1.5,0,0xf6f0d0);stamm(bx-13,bz+3,4,.6,.45);stumpf(bx+12,bz+8,1);for(let i=0;i<10;i++)heide(bx+(nr()-.5)*30,bz+(nr()-.5)*30,1)}
/* ---------- 21. Pilzlichtung ---------- */
function ort21(){const b=zone('Pilzlichtung'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz-2,13,0x86bc62,.05);
  for(let i=0;i<18;i++){const a=i/18*6.283,x=bx+Math.cos(a)*5.2,z=bz-2+Math.sin(a)*5.2;if(Math.sin(a)>.75&&Math.abs(Math.cos(a))<.35)continue;pilzGross(x,z,.7+(i%3)*.1,0)}
  [[-9,-8,1.5,0],[9,-7,1.7,1],[-10,5,1.2,2],[10,6,1.5,3],[0,-12,1.4,0],[7,10,1.1,1],[-7,11,1.3,2]].forEach(p=>pilzGross(bx+p[0],bz+p[1],p[2],p[3]));
  (function(){const g=grp(bx,0,bz-2);cyl(.9,1.5,0x6a4a32,0,.75,0,g,true);cyl(.78,.06,0xcfa86a,0,1.52,0,g);box(.5,.8,.08,0x8a3a2a,0,.55,.9,g);sph(.05,0xf4d040,.15,.55,.95,g);box(.3,.3,.06,0xcfeaf5,.6,.9,.82,g);cone(.9,.9,0xd8302a,0,1.95,0,g);kreis(bx,bz-2,1)})();
  for(const q of [[bx+3,bz+3,.5],[bx-3,bz+4,2.2]])schnecke(q[0],q[1],q[2],1);tier(igel,bx-5,bz+6,bx,bz,1.4,.6);tier(igel,bx+6,bz+4,bx,bz,1.2,.6);
  korb(bx+4,bz+8,0xe8b030);korb(bx+5.2,bz+8.6,0xd8302a);wp(bx+3,bz+9.6,Math.PI,0xf59e3f,0x3a4a6a,0x2a1d14,'kurz',null,.95);wp(bx-4,bz+9,.3,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.9);
  for(let i=0;i<60;i++){const a=nr()*6.28,r=Math.sqrt(nr())*14;pilz(bx+Math.cos(a)*r,bz+Math.sin(a)*r,1+nr()*.8)}for(let i=0;i<14;i++)farn(bx+(nr()-.5)*28,bz+(nr()-.5)*26,1);baum(bx-13,bz-8,1,1.1);baum(bx+13,bz-10,2,1.1);baum(bx-13,bz+10,0,1);baum(bx+13,bz+11,2,1);bankW(bx+9,bz+10,0)}
/* ---------- 22. Beerenwiese ---------- */
function ort22(){const b=zone('Beerenwiese'),bx=b.x,bz=b.z;ast(b);const reihen=[[-8,0x2f6a34,0x2a1a3a,'brom'],[-3,0x2f6a34,0x2a1a3a,'brom'],[3,0x4a8a3a,0xd8302a,'him'],[8,0x3a7a44,0x3a5ac8,'heid']];
  reihen.forEach(r=>{[[-11,-3.2],[3.2,11]].forEach(sg=>{const z=bz+r[0];for(let x=sg[0];x<=sg[1];x+=1.5){inst('sph',bx+x,.7,z,.9,.78,.85,r[1]);inst('sph',bx+x+.4,1.2,z+.2,.55,.4,.55,dk(r[1],1.2));for(let k=0;k<9;k++)inst('sph',bx+x+(nr()-.5)*1.4,.45+nr()*1,z+.6+(nr()-.5)*.2,.15,.15,.15,r[2])}sperrLinie(bx+sg[0],z,bx+sg[1],z,.6)})});
  for(let i=0;i<14;i++){const x=bx-9+(i%7)*3,z=bz+11+Math.floor(i/7)*.9;inst('sph',x,.2,z,.4,.2,.4,0x4aa84e);inst('sph',x+.1,.3,z,.1,.1,.1,0xe0302a)}
  korb(bx-4.4,bz+3,0x3a5ac8);korb(bx+4.4,bz-5.5,0xd8302a);korb(bx-5,bz-9.5,0x2a1a3a);wp(bx+6,bz-6,2.5,0xb06ae0,0x3a4a6a,0xe8c24a,'zoepfe',null,.9);wp(bx-7,bz-10,-1,0xf59e3f,0x3b6fc4,0x2a1d14,'cap',null,.9);korb(bx+5,bz-1,0xd8302a);korb(bx+6,bz+5,0x2a1a3a);const p1=wp(bx-5.6,bz+5.6,.5,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.9);p1.ar.rotation.x=-1.5;const p2=wp(bx+7,bz+5.4,-1,0x4caf6a,0x6a5a8a,0x6b4626,'cap',null,.9);p2.al.rotation.x=-1.4;
  tisch(bx-9,bz+14,0);for(let i=0;i<4;i++){cyl(.2,.4,[0xa02a5a,0xd8302a,0x2a1a6a,0x6a1a4a][i],bx-9.6+i*.4,1.1,bz+14,scene)}schubkarre(bx+9,bz+12,.5,0x2a1a3a);bankW(bx+9,bz-6,Math.PI);
  baum(bx-12,bz-9,0,1);baum(bx+12,bz-10,3,1);baum(bx+12,bz+8,2,1);baum(bx-12,bz+8,1,1);for(let i=0;i<60;i++){const x=bx+(nr()-.5)*24,z=bz+(nr()-.5)*24;if(Math.abs(x-bx)<3)continue;blumeI(x,z,i%6)}}
/* ---------- 23. Kräutergarten ---------- */
function ort23(){const b=zone('Kräutergarten'),bx=b.x,bz=b.z;ast(b);const H=[[0xa070d8,.9],[0x4aa84e,.5],[0x9aaa8a,.6],[0xf8f0c0,.5],[0xf08ab8,.35],[0xe8d84a,1.1]];
  H.forEach((h,i)=>{const a=i/6*6.283+1.02,x=bx+Math.cos(a)*6.4,z=bz+Math.sin(a)*6.4,rot=-a+Math.PI/2,c=Math.cos(rot),sn=Math.sin(rot),g=grp(x,0,z);box(3.2,.4,2.4,0x6b4a2f,0,.2,0,g,true);box(3,.1,2.2,0x4a3220,0,.42,0,g);g.rotation.y=rot;
    for(let k=0;k<12;k++){const lx=(k%4-1.5)*.75,lz=(Math.floor(k/4)-1)*.7;inst('sph',x+lx*c+lz*sn,.65+h[1]*.3,z-lx*sn+lz*c,.3,.25+h[1]*.2,.3,h[0])}sperrKasten(x,z,3.2,2.4,rot)});
  const sd=grp(bx,0,bz);cyl(.4,1,0x9aa0a6,0,.5,0,sd,true);cyl(.6,.12,0x9aa0a6,0,1.05,0,sd);box(.04,.5,.5,0x3a3a3a,0,1.2,0,sd).rotation.y=.5;kreis(bx,bz,.7);
  (function(){const g=grp(bx+9,0,bz+4);[-1.5,1.5].forEach(x=>cyl(.07,2.4,0x6a4220,x,1.2,0,g,true));cyl(.03,3.2,0x6a4220,0,2.35,0,g).rotation.z=Math.PI/2;[0xa070d8,0xe8d84a,0x4aa84e,0xf8f0c0].forEach((c,i)=>{for(let k=0;k<5;k++)cone(.06,.6,c,-1.1+i*.7+(k-2)*.07,2,0,g).rotation.z=Math.PI});kreis(bx+9,bz+4,.4);kreis(bx+10.5,bz+4,.4)})();
  tonne(bx-9,bz+6);bankW(bx-6,bz+10,0);for(let i=0;i<3;i++)falter(bx+nr()*8-4,bz+nr()*8-4,3+i,1.5+i*.3,i*2,[0xf6d030,0xf08a2a,0xffffff][i]);biene(bx-3,bz+2,2.5,1.5,0);biene(bx+4,bz-2,2.5,1.3,2);
  wp(bx+3,bz+10,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.9);baum(bx-12,bz-8,0,1);baum(bx+12,bz-9,1,1);baum(bx+12,bz+10,3,1)}
/* ---------- 24. Baumarten-Garten ---------- */
function ort24(){const b=zone('Baumarten-Garten'),bx=b.x,bz=b.z;ast(b);const P=[[-10,-2,0],[-6,-7,1],[-1.6,-9.4,2],[2.6,-9.4,3],[7,-7,4],[11,-2,5]];
  P.forEach((p,i)=>{const x=bx+p[0],z=bz+p[1];cyl(2.2,.1,0x8a6a42,x,.05,z,scene).receiveShadow=true;baum(x,z,p[2],.95);const sx=x+(p[0]>0?-1:1)*0,sz=z+3.4;const g=grp(x,0,sz);cyl(.6,.5,0x9aa0a6,0,.25,0,g,true);kreis(x,sz,.7);
    if(i===0){[[0,0,.7],[.5,.2,.5],[-.5,.2,.5]].forEach(q=>sph(.4,0x4a9a44,q[0],.7,q[1],g,q[2]*1.2,.12,q[2]*.9))}
    else if(i===1)sph(.55,0x5aaa50,0,.58,0,g,1.1,.1,.75);else if(i===2){cyl(.03,.9,0x5a3a26,0,.75,0,g).rotation.z=1.3;for(let k=0;k<3;k++)cone(.14,.4,0x8a5a32,-.2+k*.25,.7,.1,g)}
    else if(i===3){box(.8,.06,.8,0x86c458,0,.58,0,g).rotation.y=.785}else if(i===4){cone(.18,.8,0x8a5a32,0,.8,0,g).rotation.z=1.4;cone(.14,.6,0x7a4a2a,.3,.65,.2,g).rotation.z=1.2}
    else{for(let k=0;k<5;k++)sph(.35,0x78b844,0,.6,0,g,1.0,.08,.3).rotation.y=k*1.256}});
  for(let i=0;i<10;i++){const x=bx+(nr()-.5)*24,z=bz+(nr()-.5)*22;if(Math.abs(x-bx)<2.8&&z>bz-3)continue;inst('sph',x,.07,z,.8,.1,.8,0x5a9a3a)}
  bankW(bx-6,bz+8,0);bankW(bx+6,bz+8,0);wp(bx-2,bz+4,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.9);wp(bx+3,bz+5,Math.PI,0x4caf6a,0x3a4a6a,0x2a1d14,'cap',null,.9);for(let i=0;i<10;i++){blumeI(bx+(nr()-.5)*26,bz+4+nr()*8,i%6)}}
/* ---------- 25. Waldboden-Station ---------- */
function ort25(){const b=zone('Waldboden-Station'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz-2,9,0x6a4a2a,.06);
  for(let i=0;i<190;i++){const a=nr()*6.28,r=Math.sqrt(nr())*9,x=bx+Math.cos(a)*r,z=bz-2+Math.sin(a)*r;if(Math.abs(x-bx)<2&&z>bz-2)continue;inst('box',x,.08+(i%3)*.02,z,.9,.03,.55,[0xc87a2a,0xa8601a,0x8a4a1a,0xd8a030,0x7a8a2a][i%5],nr()*3)}
  wurm(bx-5,bz-6,.3,1.3);wurm(bx+4,bz-5,2.5,1.2);wurm(bx+6,bz+1,1,1);assel(bx-6,bz+1,.7,1.3);assel(bx+2,bz-8,2.2,1.2);assel(bx-7,bz+5,-.5,1);schnecke(bx+6,bz-9,2,1.3);schnecke(bx-8,bz-3,.6,1.1);
  [[-3,-9],[7,-1],[-8,-8]].forEach((p,i)=>{const x=bx+p[0],z=bz+p[1];kreis(x,z,1.5);sph(1.3,0x5f9a3a,x,0,z,scene,1,.45,1);sph(.9,0x6aa844,x+.9,0,z+.6,scene,1,.5,1);for(let k=0;k<12;k++)cyl(.03,.3,0x7ab84a,x+(nr()-.5)*1.8,.7,z+(nr()-.5)*1.8,scene)});
  (function(){const g=grp(bx+9,0,bz-6);g.rotation.y=-.5;[[.0,.5,0xb87a3a],[.5,.6,0x4a3220],[1.1,.8,0x8a6a42],[1.9,.6,0x9aa0a6]].forEach(l=>{box(3.4,l[1],1.6,l[2],0,l[0]+l[1]/2,0,g,true);box(3.5,.04,.05,0x2a1a10,0,l[0]+l[1],.8,g)});[1.2,2.2].forEach((x,i)=>{for(let k=0;k<4;k++)sph(.12,0xc47a82,-1.4+k*.35+i,1.35+(k%2)*.1,.82,g)});sperrKasten(bx+9,bz-6,3.6,1.8,-.5)})();
  const kf=grp(0,0,0);[[bx-3.5,bz+6],[bx+4.5,bz+7.4]].forEach(p=>{const g=grp(p[0],0,p[1]);sph(.5,0x1a2a5a,0,.45,0,g,1.5,.7,.9);sph(.3,0x1a1a20,.7,.5,0,g,1,.8,.8);[-1,1].forEach(z=>[-.4,0,.4].forEach(x=>cyl(.03,.5,0x1a1a20,x,.25,z*.5,g).rotation.x=z*.8));kreis(p[0],p[1],.9)});
  bankW(bx+8,bz+8,Math.PI);wp(bx-3,bz+8.6,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.9);baum(bx-10,bz-9,1,1.1);baum(bx+11,bz-10,0,1.1);baum(bx-10,bz+9,2,1);for(let i=0;i<10;i++)pilz(bx+(nr()-.5)*22,bz+(nr()-.5)*20,1)}
/* ---------- 26. Köhlerhütte mit Meiler ---------- */
function ort26(){const b=zone('Köhlerhütte'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11,0x5a4a3a,.05);
  (function(){const x=bx-7,z=bz+2,g=grp(x,0,z);cyl(2.4,1.8,0x8a5a32,0,.9,0,g,true);cone(3.2,3,0x5f8a3a,0,3.3,0,g,true);box(1.1,1.5,.1,0x3a2418,0,.75,2.35,g);cyl(.3,.6,0x6a6a70,1.2,3.6,-.4,g);kreis(x,z,2.8)})();
  (function(){const x=bx+3,z=bz-3,g=sph(1,0x5a4a3a,x,0,z,scene,5,3.4,5);g.castShadow=true;kreis(x,z,4.7);for(let i=0;i<24;i++){const a=nr()*6.28,u=nr()*.9,xx=x+Math.cos(a)*5*Math.sqrt(1-u*u),zz=z+Math.sin(a)*5*Math.sqrt(1-u*u);inst('con',xx,3.4*u,zz,.2,.5,.2,0x6a5a3a)}[[1,.5,0],[-1.5,.3,1],[0,.3,-1.5]].forEach(p=>{rauch(scene,x+p[0],3.0+p[1],z+p[2])});for(let i=0;i<6;i++){const a=i/6*6.283;sph(.3,0x1a1a1a,x+Math.cos(a)*4.6,.15,z+Math.sin(a)*4.6,scene,1.4,.3,1)}})();
  holzstapel(bx+11,bz-2,Math.PI/2);holzstapel(bx+11,bz+1,Math.PI/2);holzstapel(bx+8,bz-9,0.3);for(let i=0;i<4;i++)sack(bx-2+(i%2)*1.1,bz+6.5-(i>1?.9:0),0x2a2a2a,1);schubkarre(bx+3,bz+7,.4,0x1a1a1a);
  const k=wp(bx-3,bz+5,.4,0x2a2a2a,0x3a3a3a,0x2a1d14,'kurz',null,1.3);cyl(.03,2,0x6a4220,bx-2.3,1,bz+5,scene).rotation.z=.2;box(.4,.5,.05,0x6a6a70,bx-2.4,.2,bz+5,scene);stumpf(bx-2,bz-8,1.2);tonne(bx-10,bz-6);
  baum(bx-12,bz-9,2,1.2);baum(bx+12,bz-9,2,1.1);baum(bx+13,bz+9,0,1.1);baum(bx-11,bz+11,2,1);for(let i=0;i<8;i++)farn(bx+(nr()-.5)*26,bz+(nr()-.5)*24,1)}
/* ---------- 27. Sägewerk und Holzfällerplatz ---------- */
function ort27(){const b=zone('Sägewerk'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,16,0xb89a68,.05);
  (function(){const x=bx-6,z=bz-6,g=grp(x,0,z);[[-5,-3],[5,-3],[-5,3],[5,3],[0,-3],[0,3]].forEach(p=>cyl(.22,4.2,0x6a4220,p[0],2.1,p[1],g,true));box(11.4,.3,7,0x5a4a3a,0,4.3,0,g);const r1=box(11.6,.18,4,0x7a4a2a,0,4.9,-1.6,g);r1.rotation.x=-.3;const r2=box(11.6,.18,4,0x7a4a2a,0,4.9,1.6,g);r2.rotation.x=.3;box(11.4,1,.2,0x7a4a2a,0,4.6,-3.4,g);
    box(10,.4,5,0x8a6a42,0,.2,0,g);const fr=grp(0,0,0,g);box(.4,3.4,.4,0x5a5a62,-1.4,2.1,0,fr,true);box(.4,3.4,.4,0x5a5a62,1.4,2.1,0,fr,true);box(3.2,.3,.4,0x5a5a62,0,3.9,0,fr);const bl=box(.12,2.4,.12,0xc8ccd0,0,2.2,0,fr);bl.userData.keep=1;fr.userData.keep=1;box(.05,2.4,.3,0xc8ccd0,0,2.2,0,fr);bewegt(bl,t=>{bl.position.y=2.2+Math.sin(t*3)*.4});
    const lg=cyl(.55,6,0x8a5a32,0,.8,0,g,true);lg.rotation.z=Math.PI/2;sperrKasten(x,z,11,7,0);[[-4,1.6],[3,-1.4]].forEach(p=>cone(.9,.7,0xd8b878,p[0],.5,p[1],g))})();
  for(let i=0;i<4;i++)for(let j=0;j<4-i;j++)cyl(.5,6,[0x8a5a32,0x9a6a3a][(i+j)%2],bx+8,.5+i*.9,bz-9+j*1.05+i*.5,scene,true).rotation.z=Math.PI/2;sperrKasten(bx+8,bz-8,6,4.6,0);
  [[bx+10,bz+2,.5],[bx+10.5,bz+5,-.2]].forEach(p=>{const g=grp(p[0],0,p[1]);g.rotation.y=p[2];for(let i=0;i<3;i++)cyl(.4,4,0x8a5a32,0,.4+i*.7,(i-1)*.5,g,true).rotation.z=Math.PI/2;kreis(p[0],p[1],1.6)});
  (function(){const g=grp(bx-4,0,bz+6);cyl(.28,5.4,0x8a5a32,0,.8,0,g,true).rotation.z=Math.PI/2;cyl(.04,1.8,0x6a6a70,2.2,.5,0,g).rotation.z=1.2;kreis(bx-4,bz+6,2.2)})();tier(rueckepferdM,bx+1,bz+6,bx+8,bz+10,.95,1.6);
  const h=wp(bx-8,bz+7.5,.4,0xc04a2a,0x3a3a44,0x2a1d14,'kurz',null,1.3);hutAuf(h,0xf08a20,.9);const h2=wp(bx-2,bz+8.4,-.4,0x4a6a3a,0x4a4a3a,0x5a3a22,'kurz',null,1.3);hutAuf(h2,0x4a6a3a);
  (function(){const x=bx+9,z=bz+10,g=grp(x,0,z);box(.2,1,.2,0x6a4220,-.9,.5,0,g);box(.2,1,.2,0x6a4220,.9,.5,0,g);box(2,.15,.2,0x6a4220,0,1,0,g);kreis(x,z,1.2)})();for(let i=0;i<6;i++)stumpf(bx-12+(i%3)*1.6,bz+11+Math.floor(i/3)*1.6,.8);
  baum(bx+13,bz-13,2,1.2);baum(bx-14,bz-3,2,1.2);baum(bx+14,bz+12,0,1.1);for(let i=0;i<8;i++)farn(bx+(nr()-.5)*34,bz+(nr()-.5)*30,1)}
/* ---------- 28. Waldbahn-Station ---------- */
function ort28(){const b=zone('Waldbahn'),bx=b.x,bz=b.z;ast(b);const cx=bx,cz=bz-2,rx=12,rz=8.5,P=[];for(let i=0;i<40;i++){const a=i/40*6.283;P.push([cx+Math.cos(a)*rx,cz+Math.sin(a)*rz])}const S=spl(P.concat([P[0],P[1]]),1.3),B=bahn(P);
  for(let i=0;i<=B.L;i+=1.4){const q=B.at(i),th=Math.atan2(-q[3],q[2]),L=Math.hypot(q[2],q[3])||1;inst('box',q[0],.1,q[1],2.3,.1,.38,0x6a4a32,th);[-.6,.6].forEach(o=>inst('box',q[0]-q[3]/L*o,.2,q[1]+q[2]/L*o,1.5,.1,.1,0x8a8f96,th))}
  (function(){const x=bx-7,z=bz+8.9;const g=grp(x,0,z);box(10,.4,2.2,0xa8a090,0,.2,0,g,true);sperrKasten(x,z,10,2.2,0)})();
  stall(bx+7,bz-12,5,3.6,2.6,0x8a6a42,0x4a6a3a,0);bankW(bx-4,bz+11.4,0);const sg=grp(bx+13,0,bz+7);cyl(.1,3.4,0x6a6a70,0,1.7,0,sg,true);box(1.3,.2,.1,0xd8302a,.5,3.1,0,sg).rotation.z=-.3;kreis(bx+13,bz+7,.4);
  function lok(par){const g=grp(0,0,0,par);box(2.8,1.1,1.5,0x2f8a46,0,.9,0,g,true);const k=cyl(.62,2.2,0x2f8a46,.5,1.9,0,g,true);k.rotation.z=Math.PI/2;cyl(.28,1,0x2a2a2a,1.3,2.9,0,g);box(1.4,1.8,1.5,0xd8302a,-1.1,1.9,0,g,true);box(1.6,.15,1.7,0x2a2a2a,-1.1,2.85,0,g);glas(.1,.8,.9,-.4,2.2,0,g);[-1,1].forEach(s=>glas(.9,.7,.1,-1.1,2.2,s*.77,g));[[-.9],[.8],[1.9]].forEach(p=>[-1,1].forEach(s=>{const w=cyl(.45,.2,0x2a2a2a,p[0],.45,s*.85,g,true);w.rotation.x=Math.PI/2;cyl(.18,.24,0xf2c230,p[0],.45,s*.85,g).rotation.x=Math.PI/2}));[-1,1].forEach(s=>sph(.16,0xfff0b8,1.6,1.2,s*.4,g));rauch(g,1.3,3.2,0);return vm(g)}
  function lore(par,fr){const g=grp(0,0,0,par);box(2.2,.8,1.5,0x8a5a32,0,1.0,0,g,true);[-1,1].forEach(s=>[-.7,.7].forEach(x=>{const w=cyl(.35,.16,0x2a2a2a,x,.35,s*.8,g,true);w.rotation.x=Math.PI/2}));for(let i=0;i<4;i++)cyl(.22,1.8,fr?0x9a6a3a:0x6a6a70,(i%2-.5)*.6,1.5+(i>1?.3:0),(i>1?.3:-.3),g,true).rotation.z=Math.PI/2;return vm(g)}
  const zug=grp(0,0,0);lok(zug);const l1=grp(-3.4,0,0,zug);lore(l1,true);const l2=grp(-6.2,0,0,zug);lore(l2,false);fahren(zug,B,3,0);
  [[bx-3,bz+2],[bx+4,bz+3]].forEach(p=>fels(p[0],p[1],1));baum(bx-15,bz-8,2,1.2);baum(bx+15,bz-9,0,1.1);baum(bx+15,bz+9,2,1.1);baum(bx-15,bz+11,3,1);for(let i=0;i<8;i++)farn(bx+(nr()-.5)*34,bz+(nr()-.5)*30,1);
  wp(bx-8,bz+10.4,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.95);wp(bx-5.6,bz+10.4,Math.PI,0x4caf6a,0x6a5a8a,0x6b4626,'cap',null,.95)}
function etappe3a(){ort20();ort21();ort22();ort23();ort24();ort25();ort26();ort27();ort28()}
function wpH(x,y,z,rot,jk,hs,hr,st,s){const m=kindL({jacke:jk,hose:hs,haut:0xe8b98f,haar:hr,stil:st||'kurz',rucksack:null},scene);m.g.position.set(x,y,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.1);return m}
function fernglasM(m){[-1,1].forEach(s=>cyl(.11,.42,0x2a2a2e,s*.18,-.02,.5,m.kopf).rotation.x=Math.PI/2)}
function turmB(x,z,h,w,col){const g=grp(x,0,z);[-1,1].forEach(sx=>[-1,1].forEach(sz=>{const c=cyl(.2,h,col||0x7a5230,sx*w/2,h/2,sz*w/2,g,true)}));[h*.35,h*.7].forEach(y=>{[-1,1].forEach(s=>{box(w+.3,.14,.14,0x6a4220,0,y,s*w/2,g);box(.14,.14,w+.3,0x6a4220,s*w/2,y,0,g)});const L=Math.hypot(w,h*.35);[1,-1].forEach(k=>{box(L,.1,.1,0x8a5a32,0,y-h*.175,w/2,g).rotation.z=k*Math.atan2(h*.35,w)})});sperrKasten(x,z,w+.6,w+.6,0);return g}
function plattform(g,w,h,dach){box(w+.8,.25,w+.8,0x9a6a3a,0,h,0,g,true);[.5,1.0].forEach(y=>[-1,1].forEach(s=>{box(w+.8,.09,.09,0x8a5a32,0,h+y,s*(w+.8)/2,g);box(.09,.09,w+.8,0x8a5a32,s*(w+.8)/2,h+y,0,g)}));[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>cyl(.06,1.1,0x7a5230,p[0]*(w+.8)/2,h+.6,p[1]*(w+.8)/2,g))}
function treppe(g,x0,z0,x1,z1,h,w){const n=Math.round(h/.45);for(let i=0;i<n;i++){const t=i/(n-1);box(.9,.1,w,0x9a6a3a,x0+(x1-x0)*t,.3+h*t*.95,z0+(z1-z0)*t,g)}}
/* ---------- 29. Waldkindergarten ---------- */
function ort29(){const b=zone('Waldkindergarten'),bx=b.x,bz=b.z;ast(b);tipi(bx-8,bz+3,0xc8602a,1);tipi(bx+8,bz+2,0x3b8fc4,.9);bauwagen(bx+1,bz+9.4,Math.PI,0x3b6fc4);
  for(let i=0;i<8;i++){const a=i/8*6.283;if(Math.sin(a)<-.8)continue;stumpf(bx+Math.cos(a)*3.8,bz+1+Math.sin(a)*3.8,.85)}wp(bx,bz+1,Math.PI,0xe0605a,0x3a4a6a,0x6a4a2a,'kurz',null,1.3);
  [[2.2,.6,0xf59e3f,0x4a4a5a,0x2a1d14,'pferd'],[-2.4,1.8,0x4caf6a,0x6a5a8a,0xe8c24a,'zoepfe'],[0,4.4,0x3b8fc4,0x3a4a6a,0x6b4626,'cap'],[-1.8,-1.2,0xe0605a,0x3b6fc4,0x2a1d14,'kurz']].forEach(k=>wp(bx+k[0],bz+1+k[1]*.8,k[0]>0?-1.6:1.6,k[2],k[3],k[4],k[5],null,.75));
  (function(){const g=grp(bx-8,0,bz-8);box(2.8,.15,1.3,0x9a6a3a,0,.9,0,g,true);[-1.2,1.2].forEach(x=>[-.5,.5].forEach(z=>cyl(.07,.9,0x6a4220,x,.45,z,g)));[[-.8,0xc8c8c8],[0,0x3a3a3a],[.8,0xd8302a]].forEach(p=>{cyl(.22,.25,p[1],p[0],1.1,0,g);cyl(.24,.04,0x6a4220,p[0],1.25,0,g)});sperrKasten(bx-8,bz-8,3,1.5,0)})();
  for(let i=0;i<3;i++){stumpf(bx+5+i*2.4,bz-8,.7);}stamm(bx+6.2,bz-8,3,0,.3);stamm(bx+8.6,bz-8,3,0,.3);
  (function(){const x=bx-8,z=bz+10,g=grp(x,0,z);box(3.2,.45,3.2,0x8a5a32,0,.22,0,g,true);box(2.9,.1,2.9,0xe8d8a0,0,.45,0,g);cyl(.28,.3,0xe0302a,-.6,.65,.4,g);box(.1,.5,.05,0x8a5a32,.4,.7,0,g);sperrKasten(x,z,3.2,3.2,0)})();
  for(let i=0;i<14;i++){const t=i/13;const c=cone(.22,.5,[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4][i%4],bx-8+t*16,3.8-Math.sin(t*Math.PI)*.8,bz+5,scene);c.rotation.z=Math.PI}[-8,8].forEach(x=>cyl(.1,4.2,0x6a4220,bx+x,2.1,bz+5,scene,true));kreis(bx-8,bz+5,.3);kreis(bx+8,bz+5,.3);
  nistkasten(bx+11,bz-3,2.6,-.8);baum(bx-12,bz-8,0,1.2);baum(bx+12,bz-9,1,1.2);baum(bx+12,bz+10,3,1);baum(bx-12,bz+9,2,1)}
/* ---------- 30. Waldlager ---------- */
function ort30(){const b=zone('Waldlager'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz+3,7,0xc8b88a,.05);feuer(bx,bz+3,1.1);
  for(let i=0;i<5;i++){const a=i/5*6.283+.4;if(Math.sin(a)<-.8)continue;stamm(bx+Math.cos(a)*4.6,bz+3+Math.sin(a)*4.6,3,a+Math.PI/2,.4)}
  (function(){const g=grp(bx,0,bz+3);[0,2.1,4.2].forEach(a=>cyl(.05,3,0x4a4a50,Math.cos(a)*.7,1.4,Math.sin(a)*.7,g).rotation.set(Math.sin(a)*.3,0,-Math.cos(a)*.3));cyl(.35,.5,0x2a2a2e,0,1.8,0,g)})();
  zeltK(bx-8,bz-3,.5,0xe0a030);zeltK(bx+8,bz-4,-.5,0xb83a2e);zeltK(bx-8.5,bz+9,Math.PI-.5,0x3b6fc4);
  (function(){const x=bx+9,z=bz+8;[-3,3].forEach(d=>cyl(.15,3.2,0x6a4220,x,1.6,z+d,scene,true));kreis(x,z-3,.3);kreis(x,z+3,.3);const g=grp(x,0,z);for(let i=0;i<7;i++){const u=-2.4+i*.8,y=2.4-.7*(1-(u/2.6)*(u/2.6));box(.9,.07,1,i%2?0xfff8e6:0xe0605a,0,y,u,g).rotation.x=Math.atan(.5*u/2.6)}const m=kindL({jacke:0xf59e3f,hose:0x3b6fc4,haut:0xe8b98f,haar:0x6b4626,stil:'zoepfe',rucksack:null},g);m.g.rotation.x=-Math.PI/2;m.g.rotation.y=0;m.g.scale.setScalar(.6);m.g.position.set(0,1.95,.8)})();
  [[-4,2],[4,6.4],[-3,8.2]].forEach((p,i)=>{const m=wp(bx+p[0],bz+p[1],Math.atan2(-p[0],3-p[1])+Math.PI,[0xe0605a,0x4caf6a,0xf59e3f][i],0x3a4a6a,[0xe8c24a,0x6b4626,0x2a1d14][i],['zoepfe','cap','kurz'][i],null,.95)});
  [[bx-10,bz-1,0xb83a2e],[bx+10,bz-1,0x3b6fc4]].forEach(p=>{const g=grp(p[0],0,p[1]);sph(.5,p[2],0,.5,0,g,.9,1.1,.7);sph(.3,dk(p[2],.8),0,.85,.1,g,1,.5,.7);kreis(p[0],p[1],.6)});
  for(let i=0;i<3;i++){const c=cyl(.03,1.6,0x6a4220,bx+3+i*.5,.8,bz+.6,scene);c.rotation.z=.4;sph(.14,0xd8a860,bx+3.55+i*.5,1.25,bz+.6,scene,1,1.5,1)}
  cyl(.3,.5,0x2a5ab0,bx-5,.25,bz+11,scene,true);kreis(bx-5,bz+11,.4);baum(bx-12,bz-8,2,1.2);baum(bx+13,bz-9,0,1.2);baum(bx+13,bz+11,2,1.1);baum(bx-13,bz+3,3,1.1);for(let i=0;i<9;i++)farn(bx+(nr()-.5)*28,bz+(nr()-.5)*26,1)}
/* ---------- 31. Wildkamera-/Naturschutzstation ---------- */
function ort31(){const b=zone('Wildkamera-Station'),bx=b.x,bz=b.z;ast(b);stall(bx-1,bz-4,5,3.8,2.7,0x6a5a4a,0x3a3a42,0);
  (function(){const g=grp(bx-6,0,bz+1);cyl(.1,1.4,0x3a3a3a,0,.7,0,g,true);const p=box(2.2,.08,1.4,0x1a2a5a,0,1.7,0,g);p.rotation.x=-.6;for(let i=1;i<4;i++)box(2.2,.1,.03,0x8a9aba,0,1.7,0,g).rotation.x=-.6;kreis(bx-6,bz+1,.4)})();
  (function(){const g=grp(bx+7,0,bz-8);cyl(.07,6,0x8a8f96,0,3,0,g,true);box(1.6,.06,.06,0x8a8f96,0,5,0,g);box(1.2,.06,.06,0x8a8f96,0,4.4,0,g);sph(.6,0xe8e8ec,0,3.4,.3,g,1,.4,1);kreis(bx+7,bz-8,.3)})();
  [[-9,2,0],[8.6,3.8,1],[9,-3,0]].forEach(p=>{const x=bx+p[0],z=bz+p[1];baum(x,z,p[2],1.1);box(.5,.36,.3,0x4a5a3a,x,1.9,z+.5,scene);cyl(.09,.12,0x111111,x,1.9,z+.7,scene).rotation.x=Math.PI/2;box(.12,.12,.06,0xe0302a,x+.2,2.02,z+.67,scene)});
  (function(){const g=grp(bx+4,0,bz+7);[-2.4,2.4].forEach(x=>cyl(.1,3.4,0x6a4220,x,1.7,0,g,true));box(5.4,3,.15,0x8a5a32,0,2.2,0,g,true);[[0xe8a040,-1.8,2.8],[0x8a5a32,0,2.8],[0x3a3a3a,1.8,2.8],[0x9a9aa0,-1.8,1.6],[0xd8b878,0,1.6],[0xb5651d,1.8,1.6]].forEach((f,i)=>{box(1.4,1,.06,0xf6f2e6,f[1],f[2],.1,g);box(1.2,.8,.06,[0x7fbf5a,0x5aa04a][i%2],f[1],f[2],.14,g);sph(.28,f[0],f[1]+.1,f[2]-.05,.2,g,1.4,.9,.3)});sperrKasten(bx+4,bz+7,5.4,.5,0)})();
  (function(){const g=grp(bx-9,0,bz-7);cyl(.06,3.2,0x8a8f96,0,1.6,0,g,true);box(.8,.9,.8,0xf4f4f4,0,1.1,0,g,true);for(let i=0;i<5;i++)box(.82,.04,.84,0xcfd4d8,0,.8+i*.15,0,g);const an=grp(0,3.4,0,g);cyl(.04,.5,0x3a3a3a,0,-.2,0,an);for(let i=0;i<3;i++){const a=i*2.094;const c=cyl(.02,.8,0x3a3a3a,Math.cos(a)*.4,0,Math.sin(a)*.4,an);c.rotation.set(Math.sin(a)*1.57,0,-Math.cos(a)*1.57);sph(.14,0xe0302a,Math.cos(a)*.8,0,Math.sin(a)*.8,an,1,.8,1)}an.userData.keep=1;bewegt(an,t=>{an.rotation.y=t*4});cyl(.2,.5,0xcfeaf5,.9,.3,0,g);kreis(bx-9,bz-7,.7)})();
  const r=wp(bx+1,bz+4,Math.PI,0x4a6a3a,0x4a4a3a,0x5a3a22,'kurz',null,1.3);fernglasM(r);hutAuf(r,0x4a6a3a);tisch(bx-4,bz+7,0);box(.9,.05,.6,0x2a2a30,bx-4,1.0,bz+7,scene);box(.9,.5,.04,0x3a4a6a,bx-4,1.3,bz+6.7,scene);nistkasten(bx-10,bz+7,2.6,.5);bankW(bx+7,bz+9,0);
  baum(bx-10,bz-3,2,1.1);baum(bx+11,bz+10,2,1.1);for(let i=0;i<10;i++)farn(bx+(nr()-.5)*24,bz+(nr()-.5)*22,1)}
/* ---------- 32. Vogelkundestation ---------- */
function ort32(){const b=zone('Vogelkundestation'),bx=b.x,bz=b.z;ast(b);
  (function(){const x=bx-5,z=bz-5,g=turmB(x,z,4.4,2.8);plattform(g,2.8,4.4);giebel(g,3.6,3.6,6.8,0x7a4a2a,0xe8d29a,.45);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>cyl(.08,2.2,0x6a4220,p[0]*1.8,5.5,p[1]*1.8,g,true));box(3.8,.15,3.8,0x6a4220,0,6.6,0,g);leiterB(x,z+2.2,0,4.8);wpH(x-.5,4.6,z+.3,.9,0xe0605a,0x3b6fc4,0x6b4626,'zoepfe',.85);const m2=wpH(x+.7,4.6,z-.4,.5,0x3b8fc4,0x4a4a5a,0x2a1d14,'cap',.75);fernglasM(m2)})();
  [[3,-6,2.6],[6,-3,2.2],[8,1,2.9],[-6,6,2.4],[7,6,2.7],[-8,2,2.3]].forEach((p,i)=>nistkasten(bx+p[0],bz+p[1],p[2],i-1));futterhaus(bx+4,bz+2,1.1);futterhaus(bx-7,bz+4,1);futterhaus(bx+9,bz-7,.9);
  (function(){const g=grp(bx-2,0,bz+3);cyl(.12,1.2,0x9aa0a6,0,.6,0,g,true);cyl(.7,.2,0x9aa0a6,0,1.3,0,g);cyl(.62,.04,0x4aa3d8,0,1.42,0,g);kreis(bx-2,bz+3,.8)})();
  (function(){const x=bx+1.2,z=bz-2,g=grp(x,0,z);g.rotation.y=.8;[0,1,2].forEach(i=>{const lg=grp(0,1.25,0,g);lg.rotation.y=i*2.094;cyl(.028,1.3,0x3a3a3a,0,-.6,-.25,lg).rotation.x=.4});box(.12,.12,.7,0x2a2a2a,0,1.35,.12,g);cyl(.09,.12,0x1a1a1a,0,1.35,.5,g).rotation.x=Math.PI/2;kreis(x,z,.5);const m=wp(x-.9*Math.sin(.8),z-.9*Math.cos(.8),.8,0x6f7a4a,0x4a4a3a,0xe8c24a,'pferd',null,1.2);hutAuf(m,0x5a6a3a,.9);wp(x+1.8,z-1.2,-.6,0xf59e3f,0x3a4a6a,0xb5651d,'zoepfe',null,.85)})();
  [[3.3,3,0],[3.8,2.5,2],[-6.9,4.7,1],[-7.5,4.2,4],[9,-6.7,3],[4,-5.4,2],[7.9,-2.6,0],[-1.8,5.2,1]].forEach((p,i)=>sitz(bx+p[0],2.2+(i%3)*.4,bz+p[1],i,i%6,1.5));
  [[0,0,10,9,0,.4],[3,-4,12,10,1,.35],[-5,3,8,8,2,.5],[6,5,9,9,3,.3]].forEach((f,i)=>flieger(bx+f[0],bz+f[1],f[2],f[3]-3,i*1.5,f[5],SV[f[4]][0],SV[f[4]][1]));
  for(let i=0;i<4;i++){const a=i*1.57;baum(bx+Math.cos(a)*12.5,bz+Math.sin(a)*12,[0,1,3,5][i],1)}bankW(bx+5,bz+10,Math.PI);for(let i=0;i<10;i++){const x=bx+(nr()-.5)*28,z=bz+(nr()-.5)*26;farn(x,z,1)}}
/* ---------- 33. Wildbienen-Hotel mit Totholzhaufen ---------- */
function ort33(){const b=zone('Wildbienen-Hotel'),bx=b.x,bz=b.z;ast(b);const hx=bx,hz=bz-4,g=grp(hx,0,hz);
  [-2.6,2.6].forEach(x=>cyl(.15,4.2,0x6a4220,x,2.1,-.1,g,true));box(5.6,3.6,.5,0x8a5a32,0,2.4,0,g,true);[.6,1.8,3.0].forEach(y=>box(5.4,.14,1,0x6a4220,0,y+.2,.4,g));[-1.8,0,1.8].forEach(x=>box(.14,3.2,1,0x6a4220,x+.9,2.2,.4,g));
  [[-2.7,.9],[-.9,.9],[.9,.9],[2.7,.9]].forEach(()=>{});for(let r=0;r<3;r++)for(let c=0;c<3;c++){const x=(c-1)*1.8,y=.55+r*1.2+.55;const t=(r+c)%3;
    if(t===0){for(let k=0;k<12;k++){const q=cyl(.09,.9,0xe0c880,x-.6+(k%4)*.4,y-.25+Math.floor(k/4)*.3,.55,g);q.rotation.x=Math.PI/2;sph(.06,0x2a1a10,x-.6+(k%4)*.4,y-.25+Math.floor(k/4)*.3,1.0,g,1,1,.3)}}
    else if(t===1){box(1.4,1,.8,0xb8793c,x,y,.55,g);for(let k=0;k<8;k++)sph(.07,0x1a120a,x-.5+(k%4)*.33,y-.25+Math.floor(k/4)*.5,.97,g,1,1,.3)}
    else{for(let k=0;k<6;k++)cone(.16,.4,0x8a5a32,x-.5+(k%3)*.5,y-.3+Math.floor(k/3)*.55,.7,g).rotation.x=Math.PI/2}}
  box(6.2,.2,2,0x4a7a3a,0,4.5,.4,g);box(6.2,.35,1.1,0x3f6a34,0,4.65,.3,g);sperrKasten(hx,hz,5.8,1.8,0);
  (function(){const x=bx-8,z=bz+3,gg=grp(x,0,z);for(let i=0;i<16;i++){const c=cyl(.2+nr()*.12,2.2+nr()*1.4,0x6a4a32,(nr()-.5)*1.6,.3+Math.floor(i/5)*.35,(nr()-.5)*1.6,gg,true);c.rotation.set(nr()*3,nr()*3,1.2+nr()*.5)}[0,1,2].forEach(i=>cyl(.06,1.8,0x5a3a22,-1+i,1.2,.4,gg).rotation.set(0,i,.8));kreis(x,z,2.3);for(let i=0;i<4;i++)pilz(x+(nr()-.5)*2.4,z+(nr()-.5)*2.4,.8)})();
  (function(){const x=bx+8,z=bz+3;box(2.4,.15,1.8,0xe8d8a0,x,.08,z,scene);for(let i=0;i<6;i++)sph(.08,0x6a5a3a,x-.8+i*.32,.16,z+(i%2-.5)*.5,scene,1,.4,1)})();
  for(let i=0;i<6;i++)biene(hx-2+i*.8,hz+2,.8+nr()*.6,1.6+i*.3,i*1.1,false);biene(bx+4,bz+4,1.4,1.2,0,true);biene(bx-3,bz+6,1.2,1,2,true);falter(bx+3,bz+5,4,1.7,0,0xf6d030);falter(bx-5,bz+6,4,1.9,2,0xf08a2a);marienkaefer(bx+2,bz+8);
  for(let i=0;i<90;i++){const x=bx+(nr()-.5)*26,z=bz+1+nr()*10;if(Math.abs(x-bx)<2.4)continue;if(Math.hypot(x-(bx-8),z-(bz+3))<3)continue;blumeI(x,z,i%6)}
  wp(bx+2,bz+6.6,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.85);bankW(bx-4,bz+10,0);baum(bx-11,bz-8,0,1.1);baum(bx+11,bz-9,3,1.1);baum(bx+11,bz+10,1,1)}
/* ---------- 34. Hochsitz-Gruppe ---------- */
function hochsitz(x,z,h,kanzel){const g=turmB(x,z,h,2.2,0x7a5230);plattform(g,2.2,h);if(kanzel){[[0,-1.3,2.6,.15],[-1.3,0,.15,2.6],[1.3,0,.15,2.6]].forEach(w=>box(w[2],1.9,w[3],0x8a5a32,w[0],h+1.2,w[1],g,true));box(2.6,.8,.15,0x8a5a32,0,h+.7,1.3,g);glas(1.6,.8,.1,0,h+1.5,1.3,g)}else{[-1,1].forEach(s=>cyl(.07,2,0x6a4220,s*1.1,h+1.2,-1.1,g,true))}giebel(g,2.9,3,h+2.2,0x5a4a3a,0x8a5a32,.4);leiterB(x,z+1.6,0,h+.4);return g}
function ort34(){const b=zone('Hochsitz-Gruppe'),bx=b.x,bz=b.z;ast(b);hochsitz(bx-9,bz-5,3.6,true);hochsitz(bx+1,bz-8,4.4,false);hochsitz(bx+10,bz-4,3.2,true);
  wpH(bx-9,3.8,bz-4.6,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.75);const m=wpH(bx+1,4.6,bz-7.4,Math.PI,0x4a6a3a,0x4a4a3a,0x5a3a22,'kurz',.85);fernglasM(m);
  box(1.1,.8,.8,0xc8c8c8,bx,.4,bz+4,scene,true);kreis(bx,bz+4,.9);tier(p=>rehM(p,false),bx-4,bz+6,bx,bz+4,1.1,1);tier(p=>rehM(p,true),bx-2.4,bz+8,bx-4,bz+6,.55,.5);tier(p=>rehM(p,false),bx+5,bz+7,bx,bz+4,1,1);tier(fuchsM,bx+9,bz+8,bx+5,bz+7,1,.9);
  wp(bx-3,bz+11,Math.PI,0xf59e3f,0x3a4a6a,0x2a1d14,'kurz',null,.95);bankW(bx+3,bz+11,Math.PI);baum(bx-13,bz-9,2,1.2);baum(bx+13,bz-9,0,1.1);baum(bx-13,bz+10,0,1.1);baum(bx+13,bz+12,2,1.1);for(let i=0;i<10;i++)farn(bx+(nr()-.5)*28,bz+(nr()-.5)*26,1)}
/* ---------- 35. Aussichtsturm über den Baumwipfeln ---------- */
function ort35(){const b=zone('Aussichtsturm'),bx=b.x,bz=b.z;ast(b);const tx=bx,tz=bz-3,g=grp(tx,0,tz),H=14;
  [-1,1].forEach(sx=>[-1,1].forEach(sz=>{const L=Math.hypot(1.0,H),c=cyl(.3,L,0x7a5230,sx*2.1,H/2,sz*2.1,g,true);c.rotation.z=sx*Math.atan2(1,H);c.rotation.x=-sz*Math.atan2(1,H)}));
  [3.2,6.4,9.6].forEach((y,i)=>{const w=5.2-1.0*(y/H)*2;[-1,1].forEach(s=>{box(w,.18,.18,0x6a4220,0,y,s*w/2,g);box(.18,.18,w,0x6a4220,s*w/2,y,0,g)})});
  [[4.5,5],[9,4],[13.4,3.6]].forEach((p,i)=>{const w=p[1];box(w,.25,w,0x9a6a3a,0,p[0],0,g,true);[.5,1.05].forEach(y=>[-1,1].forEach(s=>{box(w,.09,.09,0x8a5a32,0,p[0]+y,s*w/2,g);box(.09,.09,w,0x8a5a32,s*w/2,p[0]+y,0,g)}))});
  for(let k=0;k<3;k++){const y0=[0,4.5,9][k],y1=[4.5,9,13.4][k];treppe(g,-2.4+k*.2,2.3,2.4-k*.2,2.3,y1-y0,.9);}
  [[-1.7,-1.7],[1.7,-1.7],[-1.7,1.7],[1.7,1.7]].forEach(p=>cyl(.1,2.6,0x6a4220,p[0],14.8,p[1],g,true));giebel(g,4.2,4.2,16.1,0x7a4a2a,0x8a5a32,.45);box(4.2,.18,4.2,0x6a4220,0,16.1,0,g);cyl(.05,2,0x6a4220,0,17.8,0,g);box(1,.6,.04,0xe0605a,.55,18.5,0,g);
  sperrKasten(tx,tz,6.2,6.2,0);wpH(tx-.8,13.7,tz+1.2,.4,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.8);const m=wpH(tx+1,13.7,tz+1.3,-.3,0x4caf6a,0x6a5a8a,0x6b4626,'cap',.8);m.ar.rotation.z=2.6;wpH(tx,9.2,tz+1.8,.2,0xf59e3f,0x3a4a6a,0x2a1d14,'kurz',.8);
  (function(){const x=bx-7,z=bz+6,g2=grp(x,0,z);cyl(.1,1.7,0x3a3a3a,0,.85,0,g2,true);cyl(.25,.5,0x3a3a40,0,1.8,.3,g2).rotation.x=Math.PI/2.4;kreis(x,z,.4)})();
  bankW(bx+6,bz+8,Math.PI);bankW(bx-4,bz+8,Math.PI);[-9,9].forEach(x=>{cyl(.07,3,0x6a4220,bx+x,1.5,bz+4,scene,true);box(.9,.5,.04,[0xe0605a,0x3b8fc4][x>0?1:0],bx+x+.5,2.6,bz+4,scene);kreis(bx+x,bz+4,.3)});baum(bx-11,bz-10,0,1.4);baum(bx+11,bz-10,2,1.4);baum(bx+12,bz+9,0,1.2);for(let i=0;i<8;i++)farn(bx+(nr()-.5)*26,bz+(nr()-.5)*24,1)}
/* ---------- 36. Baumkronenpfad ---------- */
function ort36(){const b=zone('Baumkronenpfad'),pz=-104,px=wegX(pz),xa=px-13,xb=px+13,H=9.2;
  [xa,xb].forEach((x,i)=>{const g=turmB(x,pz,H,3.2);plattform(g,3.2,H);treppe(g,(i?-1:1)*2.1,2.1,(i?-1:1)*2.1,-2.1,H,.9);cyl(.1,2.2,0x6a4220,0,H+1.3,0,g,true);giebel(g,4.2,4.2,H+2.3,0x5a4a3a,0x8a5a32,.4);baum(x+(i?4:-4),pz+4,0,1.5)});
  const n=24,L=xb-xa-3.6,x0=xa+1.8,pl=[];for(let i=0;i<=n;i++){const u=i/n,x=x0+L*u,y=H+.3-.9*Math.sin(u*Math.PI);pl.push([x,y])}
  for(let i=0;i<n;i++){const a=pl[i],c=pl[i+1],th=Math.atan2(c[1]-a[1],c[0]-a[0]),mx=(a[0]+c[0])/2,my=(a[1]+c[1])/2;const p=box(Math.hypot(c[0]-a[0],c[1]-a[1])*1.02,.1,1.4,0x9a6a3a,mx,my,pz,scene,true);p.rotation.z=th;[-1,1].forEach(s=>{box(Math.hypot(c[0]-a[0],c[1]-a[1])*1.02,.07,.07,0x6a4220,mx,my+1,pz+s*.75,scene).rotation.z=th;box(.06,1,.06,0x6a4220,a[0],a[1]+.5,pz+s*.75,scene)})}
  wpH(px-3,H+.1-.6,pz,Math.PI/2,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.8);wpH(px+1.4,H+.1-.8,pz+.2,-Math.PI/2,0x4caf6a,0x6a5a8a,0x6b4626,'cap',.8);const m=wpH(px+5,H+.1-.5,pz-.1,Math.PI/2,0xf59e3f,0x3a4a6a,0x2a1d14,'kurz',.8);fernglasM(m);
  for(let i=0;i<6;i++)cone(.5,.9,[0xe0605a,0xffd45e,0x4caf6a][i%3],xa+3+i*4,H+1.9-(i===0||i===5?0:.3),pz+.8,scene).rotation.z=Math.PI;bankW(px-4,pz+6,0);bankW(px+4,pz-6,Math.PI);
  for(let i=0;i<10;i++)farn(px+(nr()-.5)*26,pz+(nr()-.5)*14,1)}
/* ---------- 37. Waldspielplatz ---------- */
function ort37(){const b=zone('Waldspielplatz'),bx=b.x,bz=b.z;ast(b);const tx=bx-8,tz=bz-5;baum(tx,tz,0,1.5);const br=cyl(.35,4.8,0x6a4a32,tx+2.4,6.2,tz,scene,true);br.rotation.z=-Math.PI/2+.1;
  (function(){const sw=grp(tx+3.6,6.1,tz,scene);[-.6,.6].forEach(x=>cyl(.025,4.4,0xc8b078,x,-2.2,0,sw));box(1.5,.1,.35,0x8a5a32,0,-4.4,0,sw);const m=kindL({jacke:0xe0605a,hose:0x3b6fc4,haut:0xe8b98f,haar:0xe8c24a,stil:'zoepfe',rucksack:null},sw);m.g.rotation.y=0;m.g.scale.setScalar(.65);m.g.position.set(0,-4.0,0);m.bl.rotation.x=-1.2;m.br.rotation.x=-1.2;sw.userData.keep=1;vmVerschm(sw);lebendig.push({o:{userData:{anim:t=>{sw.rotation.x=Math.sin(t*1.5)*.55}}},ph:0})})();
  [[7,-6,2.6],[9.4,-3.6,3.4],[6.4,-3,4.2],[4.6,-5.6,3]].forEach(p=>{cyl(.3,p[2],0x8a6a42,bx+p[0],p[2]/2,bz+p[1],scene,true);kreis(bx+p[0],bz+p[1],.5)});for(let i=0;i<6;i++){const a=[7,-6],c=[9.4,-3.6];box(2.6,.06,.06,0xc8b078,bx+8.2,.8+i*.5,bz-4.8,scene).rotation.y=.8;box(.06,.06,2.4,0xc8b078,bx+7,.9+i*.5,bz-4.5,scene)}
  (function(){const x=bx-2,z=bz+3,g=grp(x,0,z);[-.55,.55].forEach(q=>box(.14,1.05,.14,0x4a3220,0,.52,q,g,true).rotation.x=q*.5);cyl(.17,1.3,0x2a2a2e,0,.95,0,g,true).rotation.x=Math.PI/2;const w=grp(0,1.05,0,g);box(5,.22,.7,0x9a6a3a,0,0,0,w);box(.12,.5,.12,0x4a3220,2.2,.35,0,w);box(.12,.5,.12,0x4a3220,-2.2,.35,0,w);w.userData.keep=1;vmVerschm(w);kreis(x,z,.8);lebendig.push({o:{userData:{anim:t=>{w.rotation.z=.2+Math.sin(t*1.2)*.12}}},ph:0})})();
  [[bx+6,bz+6],[bx+9.4,bz+6.6],[bx+12.8,bz+7.2]].forEach((p,i)=>{stumpf(p[0],p[1],.8+i*.1)});for(let i=0;i<3;i++)stamm(bx-12+i*3.4,bz+9,2.6,0,.28);
  (function(){const x=bx+6,z=bz-10,g=grp(x,0,z);[-1,1].forEach(s=>[-1,1].forEach(q=>cyl(.12,2.4,0x7a5230,s*1,1.2,q*1,g,true)));box(2.4,.2,2.4,0x9a6a3a,0,2.4,0,g,true);giebel(g,2.8,2.8,3.2,0x4a6a3a,0x8a5a32,.4);const sl=box(1.1,.1,5,0xc8a068,0,1.2,3.8,g);sl.rotation.x=.45;[-1,1].forEach(s=>box(.1,.4,5,0x8a5a32,s*.55,1.4,3.8,g).rotation.x=.45);leiterB(x,z-1.6,Math.PI,2.5);sperrKasten(x,z+.6,2.6,5,0)})();
  (function(){const x=bx+10,z=bz+11,g=grp(x,0,z);box(3.4,.4,3.4,0x8a5a32,0,.2,0,g,true);box(3.1,.1,3.1,0xe8d8a0,0,.42,0,g);sperrKasten(x,z,3.4,3.4,0);wp(bx+8.6,bz+11.4,.6,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.75,0)})();
  wp(bx-4,bz+8,0,0x3b8fc4,0x3a4a6a,0x6b4626,'cap',null,.8);wp(bx+2,bz+6,2,0x4caf6a,0x6a5a8a,0x2a1d14,'kurz',null,.8);wp(bx-9,bz+2,1,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',null,.8);wp(bx+3,bz-3,-1,0xf59e3f,0x4a4a5a,0x6b4626,'pferd',null,.8);wp(bx+12,bz+8,2.6,0xb06ae0,0x3a4a6a,0x2a1d14,'kurz',null,.8);wp(bx-12,bz-4,0,0x2fb5a8,0x3b6fc4,0xe8c24a,'cap',null,.8);schubkarre(bx+12,bz-4,.6,0xe8c050);eimer(bx+1,bz+10,0x3b8fc4);eimer(bx+13,bz+10.6,0xe0605a);nistkasten(bx-13,bz+2,2.4,.8);holzstapel(bx-13,bz-9,.3);bankW(bx+4,bz+12,0);bankW(bx-6,bz-12,0);baum(bx-12,bz+9,2,1.1);baum(bx+13,bz+3,0,1.2);baum(bx+14,bz-10,1,1.1);for(let i=0;i<10;i++)farn(bx+(nr()-.5)*28,bz+(nr()-.5)*26,1)}
/* ---------- 38. Felsenplatz ---------- */
function eidechse(x,y,z,rot,par){const g=grp(x,y,z,par||scene);g.rotation.y=rot||0;g.scale.setScalar(1.9);sph(.14,0x5a8a3a,0,.1,0,g,2.2,.7,1);sph(.1,0x6a9a44,.4,.12,0,g,1.1,.8,.9);cone(.07,.7,0x5a8a3a,-.7,.08,0,g).rotation.z=Math.PI/2;[-1,1].forEach(s=>{cyl(.03,.2,0x4a7a30,.2,.04,s*.14,g).rotation.x=s*.9;cyl(.03,.2,0x4a7a30,-.2,.04,s*.14,g).rotation.x=s*.9;sph(.025,0x111111,.46,.16,s*.06,g)});return g}
function ort38(){const b=zone('Felsenplatz'),bx=b.x,bz=b.z;ast(b);const cx=bx,cz=bz-4;
  [[3.4,0,0],[2.5,.8,.4],[1.6,.3,-.3]].forEach((r,i)=>{const y=i===0?r[0]*.45:(i===1?3.2:4.8);sph(r[0],[0x9aa0a6,0x8e949a,0x7e848a][i],cx+r[1],y,cz+r[2],scene,1.2,.8,1.05).castShadow=true});kreis(cx,cz,3.8);inst('sph',cx,3.6,cz,3,.4,2.6,0x5f9a3a);inst('sph',cx+.6,5.3,cz+.3,1.5,.25,1.4,0x5f9a3a);
  const A=[.5,1.0,1.6,2.1,2.7,3.5,4.1,4.9,5.6];A.forEach((a,i)=>{const r=8+(i%3)*2.4,rr=1.3+(i%4)*.4,x=cx+Math.cos(a+1)*r,z=cz+Math.sin(a+1)*r;if(z>cz+5&&Math.abs(x-bx)<4)return;const c=[0x9aa0a6,0x8e949a,0x7e848a][i%3];sph(rr,c,x,rr*.5,z,scene,1.2,.75,1).castShadow=true;if(rr>.9)kreis(x,z,rr*1.05);inst('sph',x,rr*.78,z,rr*.95,rr*.28,rr*.85,0x5f9a3a)});
  [[bx+6,bz+7],[bx-7,bz+6],[bx+11,bz-2],[bx-11,bz-1]].forEach((p,i)=>fels(p[0],p[1],1.0+i*.2));
  eidechse(cx+3.2,2.4,cz+2,.6);eidechse(cx-3,.9,cz+4,2);eidechse(bx+9,.2,bz+4,4);
  (function(){const x=bx-8,z=bz-8;sph(1.4,0x9aa0a6,x,.7,z,scene,1.2,.6,1);kreis(x,z,1.5);wpH(x,1.3,z,.6,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.75)})();
  for(let i=0;i<22;i++){const a=nr()*6.28,r=6+nr()*8,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(Math.abs(x-bx)<2.6&&z>cz+4)continue;const h=.9+nr()*.6;inst('cyl',x,h/2,z,.04,h,.04,0x4a8a3a);for(let k=0;k<5;k++)inst('sph',x,.3+k*.2,z,.14-.015*k,.12,.14-.015*k,0xb06ac8)}
  for(let i=0;i<18;i++)moos(bx+(nr()-.5)*30,bz+(nr()-.5)*26,1);for(let i=0;i<14;i++)farn(bx+(nr()-.5)*30,bz+(nr()-.5)*26,1.1);
  wp(bx+2,bz+9,Math.PI,0x6f7a4a,0x4a4a3a,0xe8c24a,'pferd',null,1.2);bankW(bx-4,bz+11,0);baum(bx-14,bz-11,4,1.1);baum(bx+14,bz-11,2,1.2);baum(bx+14,bz+9,2,1.1);baum(bx-14,bz+10,3,1)}
function etappe3b(){ort29();ort30();ort31();ort32();ort33();ort34();ort35();ort36();ort37();ort38()}
/* ==================== Etappe 4: Landschaft, Bäche, Kleinteile ==================== */
const SGW=181,SGH=193,SG=new Uint8Array(SGW*SGH);
function sgMark(x,z,r){const i0=Math.max(0,Math.floor((x-r+180)/2)),i1=Math.min(SGW-1,Math.ceil((x+r+180)/2)),j0=Math.max(0,Math.floor((z-r+236)/2)),j1=Math.min(SGH-1,Math.ceil((z+r+236)/2));for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const cx=i*2-180,cz=j*2-236;if((cx-x)*(cx-x)+(cz-z)*(cz-z)<=r*r)SG[j*SGW+i]=1}}
function sgFrei(x,z){const i=Math.round((x+180)/2),j=Math.round((z+236)/2);return i>=0&&i<SGW&&j>=0&&j<SGH&&!SG[j*SGW+i]}
const TH={};function thFrei(x,z,d){const i=Math.floor(x/8),j=Math.floor(z/8);for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++){const l=TH[(i+a)+'|'+(j+c)];if(l)for(let k=0;k<l.length;k++){const q=l[k];if((q[0]-x)*(q[0]-x)+(q[1]-z)*(q[1]-z)<d*d)return false}}return true}
function thSet(x,z){const k=Math.floor(x/8)+'|'+Math.floor(z/8);(TH[k]=TH[k]||[]).push([x,z])}
function waldBaum(x,z,art,s,kreise){const alt=KREISE;KREISE=kreise!==false;baum(x,z,art,s);KREISE=alt;thSet(x,z)}
function etappe4(){
  /* ---- Sperr-Raster: Wege, Orte, Bäche, Eingang, Festplatz ---- */
  WEGE.forEach(s=>s.forEach(q=>sgMark(q[0],q[1],5.6)));EXTRAZONEN.forEach(e=>sgMark(e.x,e.z,e.r+3));sgMark(0,122,22);sgMark(0,134,16);sgMark(FEST.x,FEST.z,26);for(let z=TORZ-30;z<TORZ+12;z+=2)sgMark(0,z,6);
  /* ---- zwei Bächlein mit Brücken (zwischen den Orte-Spalten) ---- */
  const BA=[[-68,-176],[-70.5,-158],[-67,-140],[-69.5,-122],[-67.5,-104],[-70,-88],[-68,-72],[-69.5,-62]],BB=[[72,-176],[69.5,-158],[73,-140],[70.5,-122],[72.5,-104],[70,-88],[73,-72],[71.5,-62]];
  [BA,BB].forEach((P,k)=>{const s=spl(P,2.2),br=[];[-131,-76].forEach(r=>{let bi=0,bd=1e9;s.forEach((q,i)=>{const d=Math.abs(q[1]-roadZ(q[0],r));if(d<bd){bd=d;bi=i}});br.push(bruecke(s[bi][0],s[bi][1],s,3))});bachBauen(s,3,br);s.forEach(q=>sgMark(q[0],q[1],5.2));
    const e=P[P.length-1];teichBau(e[0],e[1]+3,3.6,WASSER);sgMark(e[0],e[1]+3,9);schilfAm(e[0],e[1]+3,4,0,6.28,10);const q0=P[0];[[0,0,1.4],[2,1.5,1.1],[-2,1,1.2]].forEach(p=>{sph(p[2],0x9aa0a6,q0[0]+p[0],p[2]*.4,q0[1]-3+p[1],scene,1.2,.75,1);kreis(q0[0]+p[0],q0[1]-3+p[1],p[2]*1.05)});sgMark(q0[0],q0[1],6);
    s.forEach((q,i)=>{if(i%2||i<2||br.some(b=>Math.hypot(q[0]-b[0],q[1]-b[1])<5))return;const a=s[Math.max(0,i-1)],c=s[Math.min(s.length-1,i+1)],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1,nx=-tz/l,nz=tx/l;[-1,1].forEach(sg=>{if(nr()<.55)inst('sph',q[0]+nx*sg*2.5,.18,q[1]+nz*sg*2.5,.4+nr()*.3,.25,.35,0x9aa0a6);if(nr()<.5)farn(q[0]+nx*sg*3.2,q[1]+nz*sg*3.2,1.1);if(nr()<.3){inst('cyl',q[0]+nx*sg*2.3,.4,q[1]+nz*sg*2.3,.03,.8,.03,0x3f9a46);inst('blm',q[0]+nx*sg*2.3,.85,q[1]+nz*sg*2.3,.12,.1,.12,0xf2c830)}})});
    const B=pendel(s.filter(q=>q[1]>-170&&q[1]<-68),.5);for(let i=0;i<4;i++){const f=fischK(scene,[0x8aa0a8,0x7a9a8a,0xb09878][i%3]);f.scale.setScalar(.36);fahren(f,B,.8+i*.1,i*B.L/4)}});
  /* ---- Wald: gemischte Bäume zwischen den Orten (mit Hindernis) ---- */
  let n=0,t=0;while(n<350&&t++<14000){const x=GRENZE.x0+8+nr()*(GRENZE.x1-GRENZE.x0-16),z=TORZ+6+nr()*(GRENZE.z1-TORZ-18);if(!sgFrei(x,z)||!thFrei(x,z,8.6))continue;waldBaum(x,z,ARTW[Math.floor(nr()*ARTW.length)],.85+nr()*.5);n++}
  /* Rand: dichte Baumreihe rund um die Welt (Hindernis); Tor- und Eingangsbereich bleiben frei */
  for(let x=-178;x<=178;x+=9){if(Math.abs(x)>11)waldBaum(x,GRENZE.z1-3,ARTW[Math.floor(nr()*12)],1.3);waldBaum(x,GRENZE.z0+3,ARTW[Math.floor(nr()*12)],1.4,Math.abs(x)<70);if(Math.abs(x)>9)waldBaum(x,TORZ+1,ARTW[Math.floor(nr()*12)],1.2)}
  for(let z=-230;z<=144;z+=9){[-1,1].forEach(s=>waldBaum(s*177.5,z,ARTW[Math.floor(nr()*12)],1.35,z>TORZ||Math.abs(z+212)<30))}
  /* Wald im Norden (Festplatz-Kulisse): nur nahe der Bühne mit Hindernis */
  t=0;n=0;while(n<90&&t++<6000){const x=GRENZE.x0+8+nr()*(GRENZE.x1-GRENZE.x0-16),z=GRENZE.z0+8+nr()*(TORZ-GRENZE.z0-12);if(!sgFrei(x,z)||!thFrei(x,z,6))continue;waldBaum(x,z,ARTW[Math.floor(nr()*12)],.9+nr()*.5,Math.abs(x)<70);n++}
  /* ferne Kulisse hinter der Grenze (ohne Hindernis) */
  for(let i=0;i<50;i++){const a=nr()*6.283,rx=215+nr()*35,x=Math.cos(a)*rx*1.0,z=-45+Math.sin(a)*rx*1.15;if(Math.abs(x)<182&&z>-240&&z<150)continue;const s=1.6+nr()*.8;if(nr()<.6){inst('cyl',x,1.2*s,z,.3*s,2.4*s,.3*s,0x5a3a26);inst('con',x,4*s,z,2.4*s,5*s,2.4*s,0x2a5e3a)}else{inst('cyl',x,1.5*s,z,.4*s,3*s,.4*s,0x6a4a30);inst('sph',x,5*s,z,2.8*s,2.2*s,2.8*s,0x3f8a3a)}}
  /* ---- Lichtungen mit Blumen und Sitzgelegenheiten ---- */
  [[-72,62],[72,62],[-72,8],[72,8]].forEach((c,i)=>{const x=c[0],z=c[1];sgMark(x,z,8);for(let k=0;k<26;k++){const a=nr()*6.28,r=Math.sqrt(nr())*6.5;blumeI(x+Math.cos(a)*r,z+Math.sin(a)*r,(k+i)%6);if(k%4===0)gras(x+Math.cos(a+1)*r,z+Math.sin(a)*r,.8)}if(i%2===0)bankW(x,z+3,Math.PI);else if(i%4===1){stumpf(x-2,z,1);stumpf(x+2,z+1.4,1);tisch(x,z+.4,0)}else{stamm(x,z,3.4,.4,.45);fels(x+3.5,z-2,1.1)}});
  /* ---- Unterwuchs ---- */
  const zuf=(fn,anz,m)=>{let k=0,tt=0;while(k<anz&&tt++<anz*12){const x=GRENZE.x0+6+nr()*(GRENZE.x1-GRENZE.x0-12),z=TORZ+5+nr()*(GRENZE.z1-TORZ-12);if(!sgFrei(x,z))continue;fn(x,z);k++}};
  zuf((x,z)=>farn(x,z,1+nr()*.5),300);zuf((x,z)=>moos(x,z,1+nr()),200);zuf((x,z)=>pilz(x,z,.8+nr()*.6),170);zuf((x,z)=>heide(x,z,1+nr()*.5),90);zuf((x,z)=>gras(x,z,.6+nr()*.5),480);zuf((x,z)=>blumeI(x,z),300);
  zuf((x,z)=>{if(thFrei(x,z,2.4))busch(x,z,.9+nr()*.5,[0x3f8a3a,0x2f7a34,0x4a8a3a][Math.floor(nr()*3)])},130);
  zuf((x,z)=>{if(thFrei(x,z,3)){stumpf(x,z,.8+nr()*.5);thSet(x,z)}},34);
  zuf((x,z)=>{if(thFrei(x,z,4)){stamm(x,z,3+nr()*3,nr()*6,.4+nr()*.15);thSet(x,z)}},20);
  zuf((x,z)=>{if(thFrei(x,z,4)){fels(x,z,.9+nr()*1.3);thSet(x,z)}},38);
  /* Brombeerhecken */
  (function(){let k=0,tt=0;while(k<14&&tt++<400){const x=GRENZE.x0+12+nr()*(GRENZE.x1-GRENZE.x0-24),z=TORZ+12+nr()*(GRENZE.z1-TORZ-30),a=nr()*3.14,L=7+nr()*6,x2=x+Math.cos(a)*L,z2=z+Math.sin(a)*L;let ok=true;for(let u=0;u<=1.01;u+=.125)if(!sgFrei(x+(x2-x)*u,z+(z2-z)*u)||!thFrei(x+(x2-x)*u,z+(z2-z)*u,2.2)){ok=false;break}if(!ok)continue;
    const m=Math.max(2,Math.round(L/1.4));for(let i=0;i<=m;i++){const u=i/m,px=x+(x2-x)*u,pz=z+(z2-z)*u;inst('sph',px,.75,pz,.95,.78,.85,[0x2f6a34,0x37783a][i%2]);if(i%3===0)inst('sph',px,1.35,pz,.55,.4,.55,0x3f8a3a);for(let q=0;q<2;q++)inst('sph',px+(nr()-.5)*1.4,.5+nr()*.9,pz+.55,.1,.1,.1,q?0x2a1a3a:0xd8302a);thSet(px,pz)}sperrLinie(x,z,x2,z2,.65);sgMark((x+x2)/2,(z+z2)/2,L/2+2);k++}})();
  /* ---- Kleinteile an Wegen und Straßen ---- */
  (function(){let k=0;const bei=(x,z,seite,rot,fn)=>{fn(x,z,rot)};
    SEITENWEGE.forEach((r,ri)=>{for(let x=-160;x<=160;x+=17){if(Math.abs(x-wegX(r))<12||[48,78,98,114,146,152].some(c=>Math.abs(Math.abs(x)-c)<7))continue;const z=roadZ(x,r),side=((Math.round(x/17)+ri)%2)?1:-1,zz=z+side*4.6,f=Math.round(x/17+ri*3)%7;
      if(f===0)bankW(x,zz,side>0?0:Math.PI);else if(f===1)holzlaterne(x,zz);else if(f===2)nistkasten(x,zz,2.6,side>0?0:Math.PI);else if(f===3)holzstapel(x,zz,.3);else if(f===4)futterhaus(x,zz,1);else if(f===5){tisch(x,zz,0);stumpf(x+1.6,zz,.8);stumpf(x-1.6,zz,.8)}else schubkarre(x,zz,.5,0xe8c050);k++}});
    for(let z=GRENZE.z1-14;z>TORZ+6;z-=14){if(SEITENWEGE.some(r=>Math.abs(z-r)<12))continue;if(Math.abs(z-122)<18||Math.abs(z-108)<6)continue;const x=wegX(z),side=(Math.round(z/14)%2)?1:-1,xx=x+side*4.4,f=Math.round(z/14)%5;if(f===0)bankW(xx,z,side>0?-Math.PI/2:Math.PI/2);else if(f===1)holzlaterne(xx,z);else if(f===2)nistkasten(xx,z,2.4,side>0?-1.57:1.57);else if(f===3)futterhaus(xx,z,1);else{stumpf(xx,z,1);stumpf(xx+side*1.6,z+.4,.8)}}
    [[-40,50],[40,50],[-40,-6],[40,-6],[-40,-62],[40,-62],[-40,-118],[40,-118]].forEach((p,i)=>{if(i%2)holzstapel(p[0]+wegX(p[1])*0,p[1],0.2);else schubkarre(p[0],p[1],.8,0x3b8fc4)});
    [[-24,100],[24,100],[-34,112],[34,112]].forEach((p,i)=>{if(i<2)hangmatte(p[0],p[1],i);else{tisch(p[0],p[1],0);stumpf(p[0]+1.6,p[1],.8);stumpf(p[0]-1.6,p[1],.8)}})})();
}
function hangmatte(x,z,i){[-3,3].forEach(d=>{cyl(.14,3.2,0x6a4220,x+d,1.6,z,scene,true);kreis(x+d,z,.3)});const g=grp(x,0,z);for(let k=0;k<7;k++){const u=-2.4+k*.8,y=2.5-.75*(1-(u/2.6)*(u/2.6));box(.9,.07,1,k%2?0xfff8e6:[0xe0605a,0x3b8fc4][i%2],u,y,0,g).rotation.z=Math.atan(.6*u/2.6)}}
/* ==================== Etappe 5: Bewegung, Besucher, Finale ==================== */
function wanderer(B,v,ph,av,hutF){const w=grp(0,0,0);const m=kindL(Object.assign({hose:0x3a4a5a,haut:0xe8b98f,haar:0x6b4626,stil:'kurz',rucksack:null},av),w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.25);if(hutF)hutAuf(m,hutF);
  vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);
  w.userData.anim=t=>{const q=Math.sin(t*6+ph)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q};fahren(w,B,v,ph*B.L/6.3);return w}
function streif(fn,B,v,ph,sk){const g=fn(scene);g.scale.setScalar(sk||1);fahren(g,B,v,ph);return g}
function etappe5(){
  /* ---- Wolken ---- */
  for(let i=0;i<5;i++){const g=grp(0,48+nr()*10,0);for(let k=0;k<2;k++)sph(1,0xffffff,(k-.5)*4+nr()*2,nr()*1.5,(nr()-.5)*4,g,5+nr()*2,2+nr(),3+nr()*2);const x0=nr()*600,z=-230+nr()*400,v=1.2+nr()*1.4;bewegt(g,t=>{g.position.x=((x0+t*v)%600+600)%600-300;g.position.z=z})}
  /* ---- Vögel am Himmel ---- */
  [[-100,80,30,12,0,.3,0],[90,-60,34,13,2,.28,1],[-60,-120,28,11,4,.33,2],[110,60,26,14,1,.35,3],[0,0,40,15,3,.25,4],[-130,-20,24,10,5,.32,0]].forEach(f=>flieger(f[0],f[1],f[2],f[3],f[4],f[5],SV[f[6]][0],SV[f[6]][1]));
  /* ---- Wege für Wanderer und streifende Tiere ---- */
  const sp=(pts,f)=>spl(pts,2.5).filter(f),hw=z0=>sp(Array.from({length:30},(_,i)=>[wegX(122-i*10),122-i*10]),q=>q[1]<=z0[0]&&q[1]>=z0[1]),rd=(r,x0,x1)=>sp(strasse(r),q=>q[0]>=x0&&q[0]<=x1);
  const ring=(sg,z0,z1)=>{const P=[];for(let z=104;z>=-176;z-=14)P.push([sg*(171+1.2*Math.sin(z*.09)),z]);return sp(P,q=>q[1]<=z0&&q[1]>=z1)};
  /* ---- Wanderer, Försterin, Kinder: gehen auf Wegen ---- */
  const JK=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0x9b6fd0],HR=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a],ST=['kurz','zoepfe','cap','pferd'],RU=[0xb83a2e,0x3b6fc4,0x4a6a3a,null,0xe0a030,null];
  const routen=[[hw([118,70]),1.2],[hw([60,10]),1.2],[hw([0,-60]),1.2],[hw([-62,-120]),1.2],[hw([-110,-168]),1.2],[rd(88,-165,-20),1.3],[rd(88,20,165),1.3],[rd(35,-165,-20),1.3],[rd(35,20,165),1.3],[rd(-20,-165,-20),1.3],[rd(-20,20,165),1.3],[rd(-76,-165,-20),1.3],[rd(-76,20,165),1.3],[rd(-131,-165,-20),1.3],[rd(-131,20,165),1.3],[ring(-1,100,0),1],[ring(1,100,0),1],[ring(-1,0,-170),1],[ring(1,0,-170),1]];
  let k=0;routen.forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);const anz=i<5?2:(i%4?1:2);for(let j=0;j<anz;j++){const av={jacke:JK[(k*3+j)%8],haar:HR[(k+j*2)%6],stil:ST[(k+j)%4],rucksack:RU[(k+j)%6]};wanderer(B,2+((k+j)%3)*.4,j*2.1+i,av,(k+j)%5===0?0x6a8a3a:null);k++}});
  /* Försterin mit Hund auf dem Hauptweg, Emma Eichhörnchen als Begleiterin */
  (function(){const B=pendel(hw([112,50]),1.6);wanderer(B,1.9,0,{jacke:0x4a6a3a,hose:0x4a4a3a,haar:0x5a3a22},0x4a6a3a);const hd=streif(hundM,B,1.9,B.L*.12,1);hd.userData.keep=1;
    const E=pendel(hw([118,60]),2.4);const w=grp(0,0,0),e=emmaM(w);e.scale.setScalar(2.4);e.position.y=0;const pn=w.userData;w.userData.anim=t=>{e.position.y=Math.abs(Math.sin(t*5))*.35;if(e.userData.anim)e.userData.anim(t)};fahren(w,E,2.6,E.L*.35)})();
  /* ---- Tiere streifen umher ---- */
  streif(p=>rehM(p,false),pendel(ring(1,-20,-110),.9),1.1,0,1.1);streif(p=>rehM(p,true),pendel(ring(1,-20,-110),1.5),1.1,6,.6);streif(p=>rehM(p,false),pendel(ring(-1,100,30),.9),1,10,1.05);
  streif(fuchsM,pendel(rd(-131,-165,-100),.7),1.8,0,1.2);streif(fuchsM,pendel(rd(-76,60,130),.7),1.6,20,1.1);
  streif(wildschweinM,pendel(ring(-1,60,0),1.1),1,0,1.25);for(let i=0;i<3;i++)streif(p=>wildschweinM(p,true),pendel(ring(-1,60,0),1.1),1,3+i*2.6,.5);
  streif(haseM,pendel(rd(35,30,100),.6),1.8,0,1.3);streif(haseM,pendel(rd(88,-120,-60),.6),1.8,10,1.3);streif(haseM,pendel(rd(-20,60,120),.6),1.8,4,1.3);
  streif(igel,pendel(rd(88,60,100),.6),.5,0,1.8);streif(igel,pendel(rd(-76,-150,-110),.6),.5,10,1.8);streif(dachsM,pendel(rd(-20,70,120),.7),1.1,0,1.1);streif(eichM,pendel(hw([40,-30]),1.8),2.2,0,2.2);streif(eichM,pendel(hw([-70,-120]),1.8),2.2,7,2.2);
  streif(p=>hirschM(p,false),pendel(ring(1,-120,-170),1),.9,0,1);
  /* ---- Schmetterlinge, Libellen, Bienen in den Lichtungen und Wiesen ---- */
  [[-72,62,0xf6d030],[72,62,0xf08a2a],[-72,8,0xffffff],[72,8,0xf6d030],[-122,35,0xf08a2a],[122,35,0xffffff],[-122,-20,0xf6d030],[122,-20,0xf08a2a],[-122,-76,0xffffff],[122,-76,0xf6d030]].forEach((f,i)=>{if(i<7)falter(f[0],f[1],5,1.5+(i%3)*.4,i*1.7,f[2]);if(i%3===0)falter(f[0]+3,f[1]-2,4,1.9,i+1,0xf47ab0)});
  [[-30,100],[30,100],[-34,112],[34,112]].forEach((p,i)=>{biene(p[0],p[1],2.5,1.5,i,false)});
  /* ---- Glühwürmchen am Abend (erscheinen beim Finale) ---- */
  (function(){const N=240,pos=new Float32Array(N*3),bas=[];for(let i=0;i<N;i++){const x=(nr()-.5)*110,z=-232+nr()*80,y=.6+nr()*5;bas.push([x,y,z,nr()*6,.3+nr()*.5]);pos.set([x,y,z],i*3)}
    const c=document.createElement('canvas');c.width=c.height=32;const cx=c.getContext('2d'),gr=cx.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(255,255,200,1)');gr.addColorStop(.4,'rgba(232,255,106,.7)');gr.addColorStop(1,'rgba(232,255,106,0)');cx.fillStyle=gr;cx.fillRect(0,0,32,32);
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));const pm=new THREE.PointsMaterial({color:0xe8ff6a,size:1.6,map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0}),pt=new THREE.Points(geo,pm);pt.frustumCulled=false;pt.visible=false;scene.add(pt);
    lebendig.push({o:{userData:{anim:t=>{const a=(typeof abend==='number')?abend:0;pt.visible=a>.05;if(!pt.visible)return;pm.opacity=Math.min(1,a)*(.75+Math.sin(t*3)*.25);for(let i=0;i<N;i++){const b=bas[i];pos[i*3]=b[0]+Math.sin(t*b[4]+b[3])*2.5;pos[i*3+1]=b[1]+Math.sin(t*b[4]*1.7+b[3])*.8;pos[i*3+2]=b[2]+Math.cos(t*b[4]+b[3])*2.5}geo.attributes.position.needsUpdate=true}}},ph:0})})();
}
function paradeBauen(){const E=p=>{const g=emmaM(p);g.scale.setScalar(2.4);return g},liste=[[E,1],[p=>fuchsM(p),1.4],[p=>rehM(p,false),1],[igel,2.2],[p=>kauzM(p),1.1],[p=>hirschM(p,false),.8],[haseM,1.7],[p=>wildschweinM(p,false),.9],[dachsM,1.5],[eichM,2.6],[biber,1.7],[froschM,2.6]];
  liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
/*@@F@@*/
function weltBauen(){
/* Leistung: gröbere Grundformen (Kugel 9x6, Zylinder 8, Kegel 7) für alle Teile dieser Welt */
gSph.copy(new THREE.SphereGeometry(1,9,6));gCyl.copy(new THREE.CylinderGeometry(1,1,1,8));gCone.copy(new THREE.ConeGeometry(1,1,7));
FARBEN={boden:0x6fa84e,pfad:0xd8c08a,platz:0xe6d4a0,gehege:0x7fb860};
etappe1();
etappe2();
etappe3a();
etappe3b();
etappe4();
etappe5();
/*@@ENDE@@*/
instFlush();
}
