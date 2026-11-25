/* Welt: Insel und Küste (Kennwort insel). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Nordsee-Insel im Sommer: Fähranleger im Süden, Hafen, Strand und Dünen im Westen, Deich und Watt im Osten, Felsen und Leuchtturm im Nordwesten. */
/* Schilder: keine Hinweisschilder (Wunsch der Lehrkraft, 24.11.2026). Nur Ausgang, Geschafft!, Spielname und Zahlen-Schilder der Rätsel. */
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Möwe Mila';
const START={x:0,z:128};
const VERTEXFARBEN=true,MERGEZELLE=50,FERNBESUCHER=65,FERNLEBEN=95;
const ZOOMMAX=45;
const BEREICHE={
  eingang:{name:'Fähranleger',x:0,z:134,plaetze:[]}
};
/* 37 Orte (dazu der Fähranleger) und Wasserflächen ('Meer', 'Hafenbecken': kommen mehrfach vor und zählen nicht als Ort, halten nur die Rätsel aus dem Wasser) */
const EXTRAZONEN=[
  {name:'Hafencafé',x:24,z:104,r:11},{name:'Strandpromenade',x:-34,z:106,r:12},{name:'Strandkorbstrand',x:-126,z:64,r:12},{name:'Strandspielplatz',x:-106,z:76,r:11},{name:'Rettungsstation',x:-60,z:109,r:8},
  {name:'Krabbenkutter-Hafen',x:105,z:110,r:16},{name:'Fischmarkt',x:84,z:76,r:11},{name:'Räucherei',x:112,z:76,r:10},{name:'Segelschule',x:160,z:108,r:12},{name:'Werft',x:52,z:110,r:10},{name:'Kapitänshaus',x:58,z:74,r:9},{name:'Zollhaus',x:140,z:76,r:10},
  {name:'Dünenlandschaft',x:-120,z:20,r:16},{name:'Muschelstrand',x:-134,z:-32,r:11},{name:'Drachenwiese',x:-94,z:-30,r:17},{name:'Seehundbank',x:-134,z:-84,r:11},{name:'Vogelinsel',x:-136,z:-136,r:10},{name:'Strandbar',x:-100,z:-84,r:12},
  {name:'Wattwanderweg',x:148,z:20,r:16},{name:'Gezeiten-Station',x:124,z:58,r:11},{name:'Salzwiese',x:112,z:12,r:13},{name:'Muschelbank',x:150,z:-30,r:12},{name:'Nationalpark-Haus',x:112,z:-44,r:12},
  {name:'Deich',x:82,z:26,r:10},{name:'Windpark',x:118,z:-130,r:28},{name:'Energiehaus',x:60,z:-134,r:10},{name:'Fischerdorf',x:-52,z:66,r:20},{name:'Dorfladen',x:-10,z:66,r:10},{name:'Windmühle',x:28,z:62,r:10},
  {name:'Leuchtturm',x:-104,z:-146,r:12},{name:'Klippenpfad',x:-70,z:-138,r:12},{name:'Höhle',x:-30,z:-134,r:11},{name:'Wrack',x:-134,z:-178,r:9},{name:'Piratenspielplatz',x:-54,z:-84,r:12},
  {name:'Inselmuseum',x:-26,z:14,r:14},{name:'Kräutergarten',x:-66,z:12,r:15},{name:'Picknickplatz',x:30,z:6,r:13}
];
/* Wasserflächen: halten die Rätsel und Karten aus dem Meer und dem Hafenbecken */
for(let x=-166;x<=170;x+=28)EXTRAZONEN.push({name:'Meer',x:x,z:134,r:15});
for(let z=-220;z<=80;z+=30)EXTRAZONEN.push({name:'Meer',x:-170,z:z,r:20});
[[-146,74,14],[-160,96,22],[-132,102,14],[-112,116,14],[-88,124,14],[-64,128,14],[-40,132,14],[-150,121,12],[-141,112,9],[-136,90,8],[44,128,10],[70,127,9],[154,127,10]].forEach(p=>EXTRAZONEN.push({name:'Meer',x:p[0],z:p[1],r:p[2]}));
[[86,112],[104,112],[122,112],[136,110]].forEach(p=>EXTRAZONEN.push({name:'Hafenbecken',x:p[0],z:p[1],r:12}));
/* Deichkrone: keine Rätsel auf dem Deich (er ist nicht begehbar) */
spl([[88,66],[91,44],[89,20],[93,-10],[90,-40],[92,-70],[89,-100]],9).forEach(q=>EXTRAZONEN.push({name:'Deichkrone',x:q[0],z:q[1],r:6}));
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
/* ==================== Hilfen für die Insel ==================== */
const RX0=r=>r>80?-112:-136,RX1=r=>r>80?171:156;
function strasse(r){const p=[];for(let x=RX0(r);x<RX1(r);x+=19)p.push([x,roadZ(x,r)]);p.push([RX1(r),roadZ(RX1(r),r)]);return p}
/* Ort suchen und mit der nächsten Querstraße verbinden (Zugang von der Straßenseite) */
function zone(n){const b=ZN(n);if(!b)throw new Error('Zone fehlt: '+n);let best=94,bd=1e9;SEITENWEGE.forEach(r=>{if(b.x<RX0(r)||b.x>RX1(r))return;const d=Math.abs(r-b.z);if(d<bd){bd=d;best=r}});b.road=best;b.dir=best>b.z?1:-1;b.gap=b.dir>0?Math.PI/2:-Math.PI/2;return b}
function ast(b,w,bend){const x=b.x,z0=roadZ(x,b.road),bd=bend==null?(x>0?-2.4:2.4):bend;weg([[x,z0],[x+bd,(z0+b.z)/2],[x,b.z+b.dir*1.5]],w||3.2)}
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
/* ==================== Etappe 1: Meer, Küste, Wege, Tor, Fähranleger, Festplatz ==================== */
const KW0=[[-152,-420],[-152,-300],[-152,-236],[-149,-190],[-153,-140],[-150,-90],[-154,-40],[-152,10],[-148,50],[-138,78],[-122,96],[-100,106],[-76,113],[-52,118],[-28,121],[-5,121.5]];
const KS0=[[5,121.5],[26,120],[46,118],[58,117.5]];
const KH0=[[62,117],[67,112],[72,103],[77,100.5],[134,100.5],[138,103],[141,117]];
const KS1=[[150,118],[185,119]];
const KE0=[[186,70],[176,66],[168,58],[165,44],[166,0],[165,-60],[167,-120],[165,-180],[166,-236],[166,-300]];
let KH,KEW,LANDP,K0;
const WATTP=[[300,72],[184,70],[150,66],[134,58],[126,40],[132,22],[124,2],[130,-20],[122,-46],[130,-72],[128,-98],[154,-110],[160,-150],[160,-420],[300,-420]];
function faehre(par){const g=grp(0,0,0,par);rumpf(g,24,8,3,0x1f4e79,0xd8d0c0,0xf2f2f2);box(14,2.6,6.6,0xf6f6f2,-2,4.3,0,g,true);box(10,2.4,5.6,0xf6f6f2,-3,6.8,0,g);box(4.6,2,4.6,0xf6f6f2,-2,8.9,0,g);box(14.4,.2,7,0xe0302a,-2,5.7,0,g);
  [-1,1].forEach(s=>{for(let i=0;i<7;i++)box(1.1,.9,.06,0x2a4a6a,-7.5+i*1.9,4.4,s*3.34,g);for(let i=0;i<5;i++)box(1.1,.9,.06,0x2a4a6a,-6.5+i*1.9,6.9,s*2.84,g);box(.9,.4,2.2,0xf59e3f,2.2,6.4,s*3.6,g);box(3.6,.9,.06,0x2a4a6a,-2,9.1,s*2.34,g)});box(.06,.9,4,0x2a4a6a,.34,9.1,0,g);box(.06,.9,3.4,0x2a4a6a,-4.6,6.9,0,g);
  cyl(1.1,2.4,0xd8302a,-6,9,0,g,true);cyl(1.12,.6,0x1a1a1a,-6,10,0,g);cyl(.1,3.2,0xe8e4da,-1.5,11.3,0,g);box(.1,.12,1.4,0x3a3a3e,-1.5,12.3,0,g);box(.5,.06,.5,0xe0302a,-1.5,12.8,0,g);
  box(.14,2.6,5.2,0x4a4a54,-11.9,2.3,0,g);sph(.14,0xe0302a,-.5,10.1,1.5,g);sph(.14,0x2fb55a,-.5,10.1,-1.5,g);sph(.16,0xfff0b0,8,3.4,0,g);ring(g,-3,6.6,3.4);ring(g,-3,6.6,-3.4,Math.PI);
  tri([-1.5,12.8,0],[-1.5,12.2,0],[-.4,12.5,0],0xe0302a,g);return vm(g)}
function pierBauen(){
  const z0=116,z1=148,L=z1-z0;box(7,.14,L,0x9a6a3a,0,.15,(z0+z1)/2,scene).receiveShadow=true;for(let i=0;i<L/1.6;i++)box(7.1,.04,.12,0x6a4220,0,.23,z0+.8+i*1.6,scene);
  for(let z=z0+2;z<=z1;z+=3.5)[-1,1].forEach(s=>{cyl(.22,2.2,0x4a3a2a,s*3.4,-.3,z,scene,true);box(.4,.1,.4,0x3a2a1a,s*3.4,.85,z,scene)});
  [-1,1].forEach(s=>{box(.1,.1,L,0x6a4220,s*3.45,1.05,(z0+z1)/2,scene);box(.1,.1,L,0x6a4220,s*3.45,.65,(z0+z1)/2,scene);for(let z=z0;z<=z1;z+=3.5)box(.14,1.05,.14,0x7a5230,s*3.45,.52,z,scene)});
  box(7,.1,.1,0x6a4220,0,1.05,z1,scene);box(7,.1,.1,0x6a4220,0,.65,z1,scene);sperrLinie(-3.55,z0,-3.55,z1,.15);sperrLinie(3.55,z0,3.55,126.7,.15);sperrLinie(3.55,129.3,3.55,z1,.15);sperrLinie(-3.55,z1,3.55,z1,.15);
  /* Landungsbrücke zur Fähre */
  box(4.6,.14,1.8,0x8a8a90,5.8,.3,128,scene).receiveShadow=true;[-1,1].forEach(s=>{box(4.6,.08,.08,0xe0302a,5.8,1.0,128+s*.95,scene);box(4.6,.08,.08,0xf2f2f2,5.8,.6,128+s*.95,scene);sperrLinie(3.6,128+s*.95,8,128+s*.95,.12)});
  const f=faehre(scene);f.position.set(12,0,135);f.rotation.y=-Math.PI/2;wipp(f,0,0,1);sperrKasten(12,135,8.2,24,0);
  [[-2.6,119],[2.6,125],[-2.6,131],[2.6,137]].forEach(p=>laterne(p[0],p[1]));[[-3.05,122,.4],[3.05,133,-.4]].forEach(p=>ring(scene,p[0]*1.1,1.3,p[1],1.57));
  [[-3.1,117],[3.1,117],[-3.1,140],[3.1,140]].forEach(p=>poller(p[0],p[1]));bankW(-2.2,138,Math.PI/2);bankW(2.2,121,-Math.PI/2);moeweAm(3.4,1.1,140,2.2);moeweAm(-3.4,1.1,118,-1,1.5)}
/* Hafenbecken, Kai, Stege */
function hafenBauen(){
  landFl([[62,121],[141,121],[141,100.5],[62,100.5]],0x4aa6c9,.02);
  bandM(inw(KH,1.7),3.2,0x9a6a3a,.07);bandM(inw(KH,.15),.35,0x5a3a20,.078);for(let i=0;i<KH.length;i+=4){const q=inw(KH,1)[i];if(q&&!(q[1]<102&&Math.abs(q[0]-90)<4)&&!(q[1]<102&&Math.abs(q[0]-120)<4))poller(q[0],q[1])}
  steg(90,98.5,90,113.5,3.4);steg(120,98.5,120,113.5,3.4);[90,120].forEach(x=>{[-1,1].forEach(s=>poller(x+s*1.5,113));laterne(x+1.8,101)});
  kante(KH,1.0,[[90,100.5,2.2],[120,100.5,2.2]]);sperrLinie(58,116.1,61,117,.3);sperrLinie(142,117,150,116.6,.3);[90,120].forEach(x=>{sperrLinie(x-1.8,100.5,x-1.8,114,.3);sperrLinie(x+1.8,100.5,x+1.8,114,.3);sperrLinie(x-1.8,114,x+1.8,114,.3)});sperrLinie(61,118.5,142,118.5,.3)}
function etappe1(){
  WASSER=0x3f93b8;
  const meer=new THREE.Mesh(new THREE.PlaneGeometry(1600,1600),mat(0x2f86ad));meer.rotation.x=-Math.PI/2;meer.receiveShadow=true;scene.add(meer);
  const KW=spl(KW0,4),KS=spl(KS0,5),K=KW.concat(KS);KH=lin(KH0,3);KEW=spl(KE0,5);
  bandM(K,20,0x6fc3cc,.012);bandM(KH,12,0x6fc3cc,.026);
  LANDP=KW.concat(KS,KH0,KS1,[[300,119],[300,-420]]);landFl(LANDP,0x86b05a,.03);K0=K;
  bandM(inw(K,5.5),11,0xe9dcaa,.042);bandM(inw(K,1.1),2.2,0xcbbd90,.046);
  /* Watt (Wattboden) und Salzwiese */
  landFl(WATTP,0xcdbd98,.042);
  landFl([[98,64],[124,56],[132,40],[118,20],[126,-4],[116,-26],[120,-46],[100,-44],[96,-10],[100,30]],0x7da35a,.036);
  /* Flut und Ebbe: das Wasser vor der Lahnungs-Kante steigt und sinkt ganz langsam */
  const tr1=new THREE.MeshLambertMaterial({color:0x4fa9c7,transparent:true,opacity:.8,depthWrite:false}),tr2=new THREE.MeshLambertMaterial({color:0x9ad3de,transparent:true,opacity:.5,depthWrite:false});
  const fl1=landFl([[0,62],[160,62],[160,-420],[0,-420]],0,.09,tr1),fl2=landFl([[0,62],[160,62],[160,-420],[0,-420]],0,.07,tr2);fl1.userData.keep=1;fl2.userData.keep=1;
  lebendig.push({o:{userData:{anim:t=>{const f=.5+.5*Math.sin(t*.06);fl1.position.x=172+(1-f)*26;fl2.position.x=fl1.position.x-9}}},ph:0});
  /* Küstenhindernis (Strand, Hafen, Watt-Kante mit Lahnung) */
  kante(K,1.4,[[0,121.5,4.9]]);kante(spl(KS1,5),1.4);kante(KEW,1.2);
  KEW.forEach((p,i)=>{if(i%2)return;inst('cyl',p[0],.6,p[1],.1,1.2,.1,0x6a5238);inst('box',p[0]+(i%4?.35:-.35),.28,p[1],.7,.55,1,0x9a8a58)});
  /* Wasser-Wellen (ein Zeichenaufruf je Gruppe) */
  [[-230,-110],[-110,10],[10,110]].forEach(zz=>{const n=44,P=K.filter(q=>q[0]<-120&&q[1]>=zz[0]&&q[1]<=zz[1]);if(P.length<4)return;schwarm(gBox,0xffffff,n,(i,t)=>{const q=P[Math.floor(i/n*(P.length-1))],a=P[Math.min(P.length-1,Math.floor(i/n*(P.length-1))+1)],tx=a[0]-q[0],tz=a[1]-q[1],l=Math.hypot(tx,tz)||1,u=((t*.12+i*.37)%1),d=-1.5-(1-u)*9;return[q[0]-tz/l*d,.075,q[1]+tx/l*d,l*(.8+i%3*.3),.04,.16*Math.sin(u*Math.PI)+.01,Math.atan2(-tz,tx)]})});
  (function(){const P=K.filter(q=>q[0]>-90&&q[0]<62&&q[1]>110),n=36;schwarm(gBox,0xffffff,n,(i,t)=>{const q=P[Math.floor(i/n*(P.length-1))],u=((t*.12+i*.41)%1);return[q[0],.075,q[1]+1.2+(1-u)*9,4*(.8+i%3*.3),.04,.16*Math.sin(u*Math.PI)+.01,0]})})();
  (function(){const n=50;[[-188,-170],[-188,-60],[-188,50],[-110,150],[-30,152],[60,150],[140,150]].forEach(c=>schwarm(gBox,0xe8f6fa,n,(i,t)=>{const a=i*2.4,r=((i*37)%23)+4;return[c[0]+Math.cos(a)*r*1.2,.06,c[1]+Math.sin(a)*r*1.2,2.2+(i%4)*.6,.03,.14+.1*Math.sin(t*.8+i),0]}))})();
  hauptweg(5);
  SEITENWEGE.forEach(r=>{weg(strasse(r),4);const px=wegX(r);kreuzplatz(px,roadZ(px,r),7.5)});
  /* Küstenweg im Westen, Deichweg im Osten (Ringweg) */
  weg(inw(KW.filter(q=>q[1]>-180&&q[1]<44),26),3.2);weg([[72,70],[82,48],[80,20],[84,-14],[81,-44],[84,-76],[80,-106],[70,-140],[20,-168]],3.2);
  weg([[0,TORZ+2],[0,TORZ-24]],5,FARBEN.platz);scheibe(FEST.x,FEST.z,17,FARBEN.platz,.08);scheibe(0,114,12,FARBEN.platz,.07);
  hafenBauen();pierBauen();
  /* ---------- Ausgang (Tor wird geöffnet) ---------- */
  ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{cyl(.75,6.6,0xf2f2f2,s*4.4,3.3,0,g,true);for(let k=0;k<3;k++)cyl(.78,.5,0x1f4e79,s*4.4,1+k*2.1,0,g);sph(.95,0xe0302a,s*4.4,6.9,0,g,1,.9,1);cyl(.1,1.4,0x3a3a3a,s*4.4,7.9,0,g)});box(10.8,1,.7,0x1f4e79,0,6.2,0,g,true);box(11,.3,1,0xe0302a,0,6.85,0,g);
    const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.2,.4);g.add(s);
    const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,0xf2f2f2,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,i%2?0x1f4e79:0xc8d8e8,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.34,0xe0302a,s*-1.9,1,0,p);box(3.8,.2,.34,0xe0302a,s*-1.9,2.8,0,p);return p});
    kreis(-4.4,TORZ,1);kreis(4.4,TORZ,1);return {g,fl,offen:0}})();
  /* ---------- 1. Fähranleger: Kiosk, Fahrräder, Gepäck, Wartende ---------- */
  (function(){const b={x:0,z:106},ez=111;[-1,1].forEach(s=>{cyl(.6,6.4,0xf2f2f2,s*7,3.2,ez,scene,true);for(let k=0;k<3;k++)cyl(.63,.5,0x1f4e79,s*7,1+k*2.2,ez,scene);sph(.85,0xe0302a,s*7,6.7,ez,scene,1,.9,1);kreis(s*7,ez,.9)});box(14.8,.9,.8,0x1f4e79,0,6.1,ez,scene,true);box(15.2,.35,1.2,0xe0302a,0,6.75,ez,scene);const sn=schildText(CONFIG.spielname,'#fff8e6',7.5,1.6,CONFIG.spielname.length>12?44:60);sn.position.set(0,6.1,ez+.45);scene.add(sn);
    (function(){const g=grp(-15,0,110);box(5,3,4,0xf6f6f2,0,1.5,0,g,true);box(5.4,.3,4.4,0x1f4e79,0,3.15,0,g);for(let i=0;i<5;i++)box(.9,.12,.5,i%2?0xe0302a:0xffffff,-2+i,2.6,2.3,g);box(1.1,2.1,.1,0x1f4e79,-1.4,1.1,2.05,g);box(1.6,1,.1,0xcfeaf5,1.2,1.7,2.05,g);box(1.8,.12,.5,0x8a5a32,1.2,1.05,2.2,g);sperrKasten(-15,110,5.2,4.2,0)})();
    fahne(-18,104,7,0x1f4e79,0xffffff);fahne(18,104,7,0xe0302a,0xffffff);
    [[-10,100,0],[-9.6,99.2,.4],[-8.8,100.4,-.3]].forEach((p,i)=>fahrrad(p[0],p[1],p[2]+1.57,[0xe0302a,0x3b6fc4,0xf59e3f][i]));
    (function(){const g=grp(10,0,108);box(2.4,.15,1.2,0x6a6a70,0,.55,0,g,true);[-1,1].forEach(s=>cyl(.2,.1,0x2a2a2a,s*.8,.2,.7,g).rotation.x=Math.PI/2);box(1.8,.9,.8,0x8a5a32,-.2,1.1,0,g);box(1.2,.7,.7,0x3b8fc4,.3,1.9,0,g);box(.1,.1,1.4,0x3a3a3e,-1.4,.8,0,g);kreis(10,108,1.4)})();
    person(-4,108,1.2,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);person(-6,110,-.6,0x4caf6a,0x4a4a5a,0x2a1d14,'kurz',1.35);person(5.4,109,3.5,0xf59e3f,0x3a4a6a,0x6b4626,'cap',1.3);person(7,107,3.9,0x9b6fd0,0x4a4a5a,0xb5651d,'pferd',.9);
    kuebel(-7,98);kuebel(7,98);bankW(-8,104,0);bankW(8,104,0);
    for(let i=0;i<14;i++){const a=nr()*6.28,r=4+nr()*3;blumeI(-22+Math.cos(a)*r,100+Math.sin(a)*r*.6,i%6);blumeI(22+Math.cos(a)*r,100+Math.sin(a)*r*.6,(i+2)%6)}})();
  /* ---------- Festplatz: Hafenfest ---------- */
  (function(){const z0=FEST.z,bue=grp(0,0,z0-12);box(16,1,6,0x8a5a32,0,.5,0,bue,true);box(16.4,.3,6.4,0xd8b878,0,1.05,0,bue);
    [-1,1].forEach(s=>{cyl(.28,11,0xe8e4da,s*8.2,5.5,-2.6,bue,true);sph(.4,0xe0302a,s*8.2,11.1,-2.6,bue)});box(11,6.6,.2,0x24527a,0,4.4,-2.55,bue);
    tri([-7.6,1.3,-2.8],[-7.6,10.4,-2.8],[-1.4,1.3,-2.8],0xf6f6f2,bue);tri([7.6,1.3,-2.8],[7.6,10.4,-2.8],[1.4,1.3,-2.8],0xe0605a,bue);
    const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.2,-2.4);bue.add(gs);kreis(0,z0-12,9);
    const rad=new THREE.Mesh(new THREE.TorusGeometry(2,.22,8,24),mat(0x8a5a32));rad.position.set(0,4.7,-2.3);bue.add(rad);for(let i=0;i<8;i++){const a=i*Math.PI/4;box(.18,4,.18,0x8a5a32,0,4.7,-2.3,bue).rotation.z=a;sph(.28,0x8a5a32,Math.cos(a)*2.2,4.7+Math.sin(a)*2.2,-2.3,bue)}
    const farben=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4,0xf59e3f];for(let i=0;i<24;i++){const t=i/23,x=-14+t*28,y=6.4-Math.sin(t*Math.PI)*2.2;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:farben[i%5]}));l.position.set(x,y,z0-8);l.scale.setScalar(.28);scene.add(l)}
    [-14,14].forEach(x=>{cyl(.15,7,0x6a4220,x,3.5,z0-8,scene,true)});const fa=[0xe0605a,0xffd45e,0x4caf6a,0x3b8fc4];for(let i=0;i<14;i++){const t=i/13;cone(.4,.8,fa[i%4],-12+t*24,6.2-Math.sin(t*Math.PI)*1.8-.5,z0-8,scene).rotation.z=Math.PI}
    /* Leuchtfeuer (Feuerkörbe) */
    [-12,12].forEach(x=>{cyl(.9,.6,0x3a3a3e,x,1.6,z0+4,scene,true);cyl(.15,1.4,0x3a3a3e,x,.7,z0+4,scene);cyl(.6,1.2,0xe08a2a,x,.1,z0+4,scene);flamme(x,2,z0+4,1);rauch(scene,x+.2,3,z0+4);kreis(x,z0+4,1.1)});
    /* Boote auf Anhängern und Hafenfest-Stände */
    [[-15,z0+14,.3],[15,z0+14,Math.PI-.3]].forEach((p,i)=>{const w=grp(p[0],0,p[1]);w.rotation.y=p[2];const k=kutter(w,[0x3b6fc4,0xe0605a][i],0xf6f6f2,.55);k.position.y=1.1;box(6,.2,2.2,0x6a4220,.2,.7,0,w);[-1,1].forEach(s=>cyl(.4,.25,0x2a2a2a,s*1.8,.4,1.1,w).rotation.x=Math.PI/2);sperrKasten(p[0],p[1],6.4,2.8,p[2])});
    [[-9,z0+14],[9,z0+14]].forEach((p,i)=>{stall(p[0],p[1],5,3.4,2.6,[0xf6f6f2,0xe8d8b0][i],0x1f4e79,0)});
    [[-12,z0+22],[12,z0+22],[-4,z0+25],[4,z0+25]].forEach(p=>{tisch(p[0],p[1],0);bankW(p[0]-1.6,p[1],Math.PI/2);bankW(p[0]+1.6,p[1],-Math.PI/2)});
    [[-6,z0-2],[6,z0-2],[-16,z0+8],[16,z0+8],[-8,z0+19],[8,z0+19]].forEach(p=>laterne(p[0],p[1]));
    [[-17,z0+3],[17,z0+3],[-11,z0+9],[11,z0+9]].forEach((p,i)=>{cyl(.45,1,0x8a5a32,p[0],.5,p[1],scene,true);kreis(p[0],p[1],.5);if(i<2)netz(p[0]+(i?-1.6:1.6),p[1]+1.2,.4,1.1)});
  })();
}
/* ==================== Etappe 2: Orte am Anleger, am Strand und im Hafen ==================== */
const fig=(x,z,rot,jk,hs,hr,st,s)=>{kreis(x,z,.5);return person(x,z,rot,jk,hs,hr,st||'kurz',s||1.25)};
const rfd=b=>0;
function schirm(x,z,f,tisch0){cyl(.06,2.7,0xe8e4da,x,1.35,z,scene,true);cone(1.7,.7,f,x,2.75,z,scene);cone(.1,.25,0xf6f6f2,x,3.2,z,scene);if(tisch0!==false){cyl(.7,.08,0xf6f6f2,x,.95,z+.01,scene);cyl(.08,.9,0x6a6a70,x+.01,.45,z+.01,scene)}kreis(x,z,.7)}
function stuhl(x,z,rot,f){const g=grp(x,0,z);box(.5,.08,.5,f||0x3b6fc4,0,.55,0,g,true);box(.5,.5,.06,f||0x3b6fc4,0,.85,-.22,g);[[-.2,-.2],[.2,-.2],[-.2,.2],[.2,.2]].forEach(p=>cyl(.03,.55,0x6a6a70,p[0],.27,p[1],g));g.rotation.y=rot||0;kreis(x,z,.35);return g}
function sandFl(x,z,r){scheibe(x,z,r,0xe9dcaa,.09)}
function markise(g,w,y,z,f1,f2,n){n=n||6;for(let i=0;i<n;i++)box(w/n,.1,1.3,i%2?f2:f1,-w/2+(i+.5)*w/n,y,z,g).rotation.x=.25}
function eisTuete(par,x,y,z,s){s=s||1;cone(.5*s,1.4*s,0xe8b868,x,y,z,par).rotation.x=Math.PI;sph(.5*s,0xf4b6c8,x,y+.9*s,z,par);sph(.42*s,0xf6f0d0,x,y+1.45*s,z,par);sph(.3*s,0x7a4a2a,x,y+1.9*s,z,par)}
function fischSchild(par,x,y,z,s,f){s=s||1;const g=grp(x,y,z,par);sph(.6*s,f||0x8aa8b8,0,0,0,g,1.7,.8,.3);cone(.4*s,.7*s,f||0x8aa8b8,-1.2*s,0,0,g).rotation.z=Math.PI/2;sph(.07*s,0x111111,.55*s,.1*s,.2*s,g);return g}
function rutsche(x,z,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;[-.6,.6].forEach(s=>{box(.12,3,.12,0x8a5a32,s,1.5,-1.2,g,true)});box(1.6,.12,1.2,0x8a5a32,0,2.9,-1.2,g);const r=box(1.2,.12,3.4,farbe||0xe0302a,0,1.5,.7,g);r.rotation.x=.55;[-1,1].forEach(s=>box(.1,.4,3.4,farbe||0xe0302a,s*.6,1.7,.7,g).rotation.x=.55);for(let i=0;i<5;i++)box(1.3,.06,.1,0x8a5a32,0,.6+i*.5,-1.78,g);sperrKasten(x,z,2.4,4.6,rot||0);return g}
function schaukel(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;[-2,2].forEach(s=>[-1,1].forEach(q=>{cyl(.1,3,0x8a5a32,s,1.4,q*.8,g,true).rotation.x=q*.2}));box(4.4,.14,.14,0x6a4220,0,2.9,0,g);const sw=[-1,1].map(s=>{const p=grp(s*.9,2.9,0,g);box(.04,2.1,.04,0x3a3a3e,0,-1.05,0,p);box(.7,.08,.3,0xe0302a,0,-2.1,0,p);return p});bewegt(sw[0],t=>{sw[0].rotation.x=Math.sin(t*1.7)*.5});bewegt(sw[1],t=>{sw[1].rotation.x=Math.sin(t*1.7+1.2)*.5});sperrKasten(x,z,4.6,2.4,rot||0);return g}
/* ---------- 2. Hafencafé mit Fischbrötchen-Bude ---------- */
function ort2(){const b=zone('Hafencafé'),bx=b.x,bz=b.z;ast(b);
  (function(){const g=stall(bx-9,bz-6,10,5.6,3.4,0xf6f6f2,0x1f4e79,rfd(b));markise(g,8,3.0,3.4,0x3b8fc4,0xffffff,8);fischSchild(g,0,5.6,2.9,.9);for(let i=0;i<3;i++)box(1.3,1,.06,0xcfeaf5,-3.2+i*2.6,1.8,2.84,g)})();
  (function(){const g=stall(bx+8,bz-2,4.2,3,2.5,0xe0605a,0xf6f6f2,rfd(b));markise(g,4.4,2.1,2,0xffd45e,0xe0302a,4);box(2.6,.1,.8,0x8a5a32,0,1.15,2.1,g);for(let i=0;i<3;i++)sph(.2,0xe8c890,-.8+i*.8,1.3,2.1,g,1.6,.6,.8);fischSchild(g,0,3.6,2,.55,0xe0302a);fig(bx+8,bz+1.6,Math.PI,0xf6f6f2,0x3b6fc4,0x6b4626,'cap',1.25)})();
  [[-9,4],[-4,6],[1,4],[-12,0],[5,8]].forEach((p,i)=>{schirm(bx+p[0],bz+p[1],[0xe0302a,0xffd45e,0x3b8fc4,0xf59e3f,0x4caf6a][i]);stuhl(bx+p[0]+1.2,bz+p[1]+.4,-1.6);stuhl(bx+p[0]-1.2,bz+p[1]-.3,1.6)});
  fig(bx-9,bz+3,0,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.2);fig(bx-3,bz+5,3.1,0x4caf6a,0x4a4a5a,0x2a1d14,'kurz',1.3);fig(bx+4.2,bz+7,.4,0xb06ae0,0x3a3a4a,0xb5651d,'pferd',1.2);fig(bx-1,bz+1.5,Math.PI,0x1f4e79,0xf6f6f2,0xe8c24a,'kurz',1.3);
  moeweAm(bx-4,1.05,bz+6.2,1.2);moeweAm(bx+1,1.05,bz+4.2,-.5);moeweAm(bx+9,.1,bz+4,2.8,1.4);[-1,1].forEach(s=>kuebel(bx-10,bz-7+s*5.5));fahrrad(bx+13,bz-6,.2,0xe0302a);fahrrad(bx+14,bz-4.6,.5,0xf59e3f)}
/* ---------- 3. Strandpromenade mit Eisdiele ---------- */
function ort3(){const b=zone('Strandpromenade'),bx=b.x,bz=b.z;ast(b);
  bodenFl(bx,bz+7,40,6.4,0xd8d0c0,.1);bodenFl(bx,bz+10.4,40,.5,0x9a6a3a,.14);for(let i=0;i<=8;i++)box(.2,1,.2,0x7a5230,bx-19+i*4.75,.5,bz+10.4,scene,true);box(40,.1,.1,0xf2f2f2,bx,1.05,bz+10.4,scene);box(40,.1,.1,0xf2f2f2,bx,.65,bz+10.4,scene);sperrLinie(bx-20,bz+10.4,bx+20,bz+10.4,.12);
  (function(){const g=stall(bx-9,bz-4,11,5.4,3.6,0xf6c8d8,0xf6f6f2,rfd(b));markise(g,9,3.1,3.4,0xe0605a,0xffffff,8);box(2,2.8,.1,0xffffff,-3.8,1.6,2.84,g);eisTuete(g,0,5,0,1.4);for(let i=0;i<3;i++)eisTuete(g,-2.4+i*2.4,1.9,3.1,.55);box(5,.12,.7,0xf6f6f2,1.4,1.2,3.3,g)})();
  [[-15,3],[-7,4],[8,4],[16,3]].forEach((p,i)=>{bankW(bx+p[0],bz+p[1]+2,Math.PI);laterne(bx+p[0]+3,bz+p[1]+2)});
  (function(){const g=grp(bx+14,0,bz-1);box(3,1.4,2,0xffd45e,0,1.2,0,g,true);box(3.4,.2,2.4,0xe0302a,0,3.1,0,g);[-1,1].forEach(s=>cyl(.05,1.8,0x6a6a70,s*1.6,2.2,1.1,g));[-1,1].forEach(s=>cyl(.4,.2,0x2a2a2a,s*.9,.4,1.05,g).rotation.x=Math.PI/2);eisTuete(g,0,3.2,0,.8);box(.2,.1,.1,0x3a3a3e,-1.7,.9,0,g);sperrKasten(bx+14,bz-1,3.2,2.2,0)})();
  fig(bx-4,bz+6,0,0xf59e3f,0x3a4a6a,0x6b4626,'cap',1.25);fig(bx-10,bz+5,1,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(bx+4,bz+6.6,-2,0x2fb5a8,0x4a4a5a,0x2a1d14,'kurz',1.3);fig(bx+10,bz+5.2,3,0xb06ae0,0x3a3a4a,0xb5651d,'pferd',.9);
  [[-14,8],[12,8],[-2,9]].forEach(p=>fahrrad(bx+p[0],bz+p[1],1.57,[0xe0302a,0x3b6fc4,0x4caf6a][Math.abs(p[0])%3]));moeweAm(bx-1,1.1,bz+10.4,1.6);moeweAm(bx-16,.2,bz+8,2,1.5)}
/* ---------- 4. Strandkorbstrand ---------- */
function ort4(){const b=zone('Strandkorbstrand'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,12);
  const F=[0xe0605a,0x3b8fc4,0xffd45e,0x4caf6a,0xf59e3f,0xb06ae0];let k=0;for(let r=0;r<3;r++)for(let c=0;c<5;c++){const x=bx-9+c*4.5+(r%2)*1.2,z=bz-5+r*4.8;if(Math.hypot(x-bx,z-bz)>12)continue;strandkorb(x,z,.15+(c-2)*.12,F[(k++)%6]);if(k%3===0)box(.7,.06,1.3,0xf6f6f2,x+1.8,.1,z+.7,scene).rotation.y=.3}
  fahne(bx-12,bz+4,6,0xe0302a,0xffd45e);fahne(bx+12,bz+4,6,0x3b8fc4,0xffffff);eimer(bx+3,bz+10.4,0xe0302a,0xe2cc90);sandburg(bx-4,bz+8.5,.9,0x3b8fc4);fig(bx+6,bz+8,.5,0xffd45e,0x3b6fc4,0xe8c24a,'zoepfe',.95);fig(bx-8,bz+9,-.8,0x4caf6a,0x3a3a4a,0x2a1d14,'kurz',1.2);
  [[bx-1,bz-8],[bx+8,bz-7]].forEach(p=>{box(1.2,.08,2.4,[0xe0605a,0x3b8fc4][Math.abs(p[0])%2],p[0],.1,p[1],scene).rotation.y=.2;sph(.35,0xf2c8a0,p[0],.3,p[1]-.2,scene,1,.5,1)});moeweAm(bx+11,.2,bz+9,2.5);moeweAm(bx-12,.2,bz+10,.3,1.5)}
/* ---------- 5. Strandspielplatz mit Sandburgen ---------- */
function ort5(){const b=zone('Strandspielplatz'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,12);zaunL(bx,bz,12.4,40,b.gap,3.6,0xf2f2f2);
  sandburg(bx-6,bz+5,1.6,0xe0302a);sandburg(bx+5,bz+6,1.1,0x3b8fc4);sandburg(bx+7,bz-5,.9,0xffd45e);sandburg(bx-8,bz-4,.8,0x4caf6a);
  (function(){const g=grp(bx,0,bz-3);box(7,.8,.8,0xb88a4a,0,.6,0,g,true);box(4,1.2,3,0x8a5a32,0,.9,-.4,g,true);const m=cyl(.14,5,0xe8e4da,0,3,-.4,g,true);tri([.14,5.2,-.4],[.14,2.2,-.4],[2.4,2.6,-.4],0xe0605a,g);tri([-.14,5.2,-.4],[-.14,2.4,-.4],[-2,2.4,-.4],0xf6f6f2,g);for(let i=0;i<3;i++)sph(.5,0x3b8fc4,-1.2+i*1.2,1.7,1.1,g,.5,.5,.1);sperrKasten(bx,bz-3,7.2,3.4,0)})();
  rutsche(bx+9,bz-1,-1.57,0xe0302a);schaukel(bx-9,bz+1,1.57);
  (function(){const g=grp(bx+1,0,bz+1);[[-1.5,-1.5],[1.5,-1.5],[-1.5,1.5],[1.5,1.5]].forEach(p=>box(.2,.5,.2,0x8a5a32,p[0],.25,p[1],g,true));[[0,-1.5,3.2,.2],[0,1.5,3.2,.2]].forEach(p=>box(p[2],.4,p[3],0x8a5a32,p[0],.3,p[1],g));[[-1.5,0],[1.5,0]].forEach(p=>box(.2,.4,3.2,0x8a5a32,p[0],.3,p[1],g));kreis(bx+1,bz+1,1.2)})();
  [[-3,2],[2,-1],[6,3]].forEach((p,i)=>eimer(bx+p[0],bz+p[1],[0xe0302a,0x3b8fc4,0xffd45e][i],0xe2cc90));fig(bx-4,bz+1,.5,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',.9);fig(bx+3,bz+4,3.6,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',.95);fig(bx+8,bz+5,-1,0xf59e3f,0x3a4a6a,0x6b4626,'kurz',.9);fig(bx-1,bz-6,0,0xb06ae0,0x4a4a5a,0xb5651d,'pferd',.9)}
/* ---------- 6. Rettungsstation mit Rettungsboot ---------- */
function ort6(){const b=zone('Rettungsstation'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,7);
  (function(){const g=grp(bx,0,bz-1);[[-2.6,-2.2],[2.6,-2.2],[-2.6,2.2],[2.6,2.2]].forEach(p=>cyl(.22,2.2,0x7a5a3a,p[0],1.1,p[1],g,true));box(7,.3,5.6,0xb08850,0,2.3,0,g);box(6.2,2.4,4.8,0xf6f6f2,0,3.6,0,g,true);box(6.4,.2,5,0xe0302a,0,4.9,0,g);box(6.4,.2,5,0xe0302a,0,2.6,0,g);box(1.3,1.1,.06,0xcfeaf5,-1.7,3.8,2.43,g);box(1.3,1.1,.06,0xcfeaf5,1.7,3.8,2.43,g);box(1,2,.06,0xe0302a,0,3.4,2.43,g);
    [-1,1].forEach(s=>{cyl(.08,.7,0xe8e4da,s*3,5.4,-2,g);box(.5,.5,.08,s>0?0xe0302a:0xffd45e,s*3.3,5.5,-2,g)});for(let i=0;i<5;i++){box(1.4,.12,.5,0x8a5a32,0,.15+i*.45,2.7+(4-i)*.5,g);}sperrKasten(bx,bz-1,7,5.8,0);
    })();
  (function(){const g=grp(bx+8.5,0,bz+3);g.rotation.y=.3;const B=grp(0,.9,0,g);rumpf(B,6.4,2.4,1,0xf59e3f,0xf6f6f2,0xf6f6f2);box(1.2,.7,.1,0xe0302a,-.4,1.2,0,B);sph(.18,0xffd45e,1.5,1,0,B);vm(B);[-1,1].forEach(s=>cyl(.4,.3,0x2a2a2a,s*.6,.4,1.4,g).rotation.x=Math.PI/2);box(5,.2,1,0x6a4220,0,.7,0,g);sperrKasten(bx+8.5,bz+3,6.6,2.8,.3)})();
  [[-6,3],[-3,5]].forEach((p,i)=>{fig(bx+p[0],bz+p[1],i?2.8:3.1,0xe0302a,0xe0302a,[0xe8c24a,0x2a1d14][i],'kurz',1.3)});[[-6.4,3],[5,5]].forEach(p=>ring(scene,p[0]+bx,1.4,p[1]+bz,.5));
  (function(){const g=grp(bx-7,0,bz-6);cyl(.12,2.6,0x7a5230,-.9,1.3,0,g,true);cyl(.12,2.6,0x7a5230,.9,1.3,0,g);box(2.4,.14,1.2,0xe0302a,0,2.8,0,g);box(1.6,.1,.9,0x8a5a32,0,1.2,0,g);kreis(bx-7,bz-6,1.3)})();
  sph(.45,0xf59e3f,bx-3,.4,bz+6,scene);sph(.45,0xf59e3f,bx+2,.4,bz+6.5,scene);moeweAm(bx+2,5.1,bz-1,3.5)}
/* ---------- 7. Krabbenkutter-Hafen ---------- */
function ort7(){const b=zone('Krabbenkutter-Hafen'),bx=b.x;const Kf=[0x3b6fc4,0xe0605a,0x2fa56a,0x1f4e79,0xf59e3f,0x6a4a9a];
  [[80,104.5],[100,104.5],[112,104.5],[128,104.5],[82,114.2],[104,114.2],[130,114.2]].forEach((p,i)=>{const k=kutter(scene,Kf[i%6],[0xf6f6f2,0xf2e8c0,0xe8e4da][i%3]);k.position.set(p[0],0,p[1]);k.rotation.y=(i%3===1?Math.PI:0);wipp(k,0,i*1.3,1);const L=11;sperrKasten(p[0],p[1],L,3.8,0)});
  [[96.5,111.5],[110,110],[136,110]].forEach((p,i)=>{const s=segler(scene,[0xf6f6f2,0xe0302a,0x1f4e79][i],[0xe0302a,0xffd45e,0x3b8fc4][i],.9);s.position.set(p[0],0,p[1]);s.rotation.y=Math.PI/2*(i-1)*.2;wipp(s,0,i,1.2);sperrKasten(p[0],p[1],6,2.2,s.rotation.y)});
  [[75.5,110],[113.5,111]].forEach((p,i)=>{const r=ruder(scene,[0xe0605a,0x3b8fc4][i]);r.position.set(p[0],0,p[1]);wipp(r,0,i,1.4);sperrKasten(p[0],p[1],3.4,1.6,0)});
  /* Kran am Kai, Fischer, Kisten, Netze, Reusen */
  (function(){const g=grp(bx-18.2,0,99.6);box(2,.4,2,0x6a6a70,0,.2,0,g,true);cyl(.4,6,0xe0302a,0,3.2,0,g,true);const a=box(.4,.4,6.5,0xe0302a,0,6.4,2.4,g);cyl(.04,2.8,0x2a2a2a,0,5,4.6,g);box(.6,.6,.6,0xf59e3f,0,3.4,4.6,g);sperrKasten(bx-18.2,99.6,2.2,2.2,0)})();
  [[78,98],[98,98.3],[108,98],[124,98.2],[131,98]].forEach((p,i)=>{fischkiste(p[0],p[1],i*.4,[0xa8b8bc,0xe08a3a,0xc8c8d0][i%3]);if(i%2)reuse(p[0]+2.6,p[1]-.2,1.2);else netz(p[0]+2.4,p[1],.5,1.3)});
  [[84,98],[94,98.4],[116,98.2],[134,98.4]].forEach((p,i)=>{fig(p[0],p[1],i%2?Math.PI:.3,0xf2c230,0x3a4a6a,[0x6b4626,0xb5651d,0x2a1d14,0x9a9a9a][i],'kurz',1.3)});
  [[90,111.5],[120,111.5]].forEach((p,i)=>{const m=person(p[0],p[1],i?-1.2:1.2,0xf2c230,0x3a4a6a,0x6b4626,'kurz',1.3);hutAuf(m,0x1f4e79);kreis(p[0],p[1],.45)});
  [[72,99.5],[137,99.5]].forEach(p=>{tonne(p[0],p[1]);tonne(p[0]+1,p[1]+.3)});for(let i=0;i<5;i++)moeweAm(76+i*14,.1,99,i*1.2+.4,1.4);
  const sea=spl([[40,125],[60,132],[90,138],[130,134],[160,128],[120,126],[80,128],[50,127]],4);const B1=bahn(sea);const k1=kutter(scene,0xe0605a,0xf6f6f2,1);fahren(k1,B1,2.6,0);const k2=kutter(scene,0x2fa56a,0xf2e8c0,1);fahren(k2,B1,2.6,B1.L*.5)}
/* ---------- 8. Fischmarkt ---------- */
function ort8(){const b=zone('Fischmarkt'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0xd8d0c0,.09);
  [[-8,-4],[-2.4,-4],[3.2,-4],[8.8,-4]].forEach((p,i)=>{const g=stall(bx+p[0],bz+p[1],5,3,2.4,[0xf6f6f2,0xe8f0f6][i%2],[0x3b8fc4,0xe0302a,0x1f4e79,0x2fa56a][i],rfd(b));markise(g,5,2.1,2,[0x3b8fc4,0xe0302a,0x1f4e79,0x2fa56a][i],0xffffff,5);box(3.6,.1,1,0xe8e8e8,0,1.1,2.2,g);for(let k=0;k<4;k++)fischSchild(g,-1.2+k*.8,1.3,2.2,.3,[0xa8b8bc,0xe08a3a,0x8aa8b8,0xc8a878][k]);if(i%2===0)fig(bx+p[0],bz+p[1]+3.2,Math.PI,0xf6f6f2,0x3b6fc4,[0x6b4626,0xe8c24a][i/2],'cap',1.3)});
  [[-9,4],[-3,6],[5,5],[10,7]].forEach((p,i)=>{fischkiste(bx+p[0],bz+p[1],i*.7,[0xa8b8bc,0xe08a3a,0xc8c8d0][i%3]);fischkiste(bx+p[0]+1.4,bz+p[1]+.3,i,0xa8b8bc)});
  (function(){const g=grp(bx,0,bz+9);box(2.6,.12,.9,0xc4cad0,0,1.1,0,g,true);[-1,1].forEach(s=>cyl(.05,1,0x6a6a70,s*1.1,.55,0,g));cyl(.05,.9,0x6a6a70,0,1.55,0,g);box(1.6,.06,.06,0x6a6a70,0,2,0,g);[-.8,.8].forEach(s=>box(.5,.04,.4,0xc4cad0,s,1.5,0,g));kreis(bx,bz+9,1.4)})();
  fig(bx-5.6,bz+9,.6,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.2);fig(bx+3,bz+10,-2.8,0x4caf6a,0x4a4a5a,0x2a1d14,'kurz',1.3);fig(bx+9,bz+1,1.2,0xb06ae0,0x3a3a4a,0xb5651d,'pferd',1.2);
  for(let i=0;i<6;i++)moeweAm(bx-10+i*4,.1,bz+2+(i%3)*4,i*1.1,1.5);tonne(bx-9,bz-7.5);tonne(bx+11,bz-8);[[-6,10],[6,11]].forEach(p=>schirm(bx+p[0],bz+p[1],0xf59e3f,false))}
/* ---------- 9. Räucherei ---------- */
function ort9(){const b=zone('Räucherei'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11,0xc8c0b0,.09);
  (function(){const g=stall(bx,bz-4,9,5.4,3.6,0xb8643a,0x4a4a54,rfd(b));[-1,1].forEach(s=>box(1.1,1,.06,0x2a2a2a,s*2.8,1.8,2.84,g));const sc=box(1.8,7,1.8,0x8a4a2a,-2.6,5.5,-.8,g,true);box(2.2,.3,2.2,0x5a3a2a,-2.6,9,-.8,g);rauch(g,-2.6,9.2,-.8);rauch(g,-2.6,10.8,-.8)})();
  [-7,7].forEach((x,i)=>{const g=grp(bx+x,0,bz+3);[-1.8,1.8].forEach(s=>cyl(.1,3.4,0x6a4220,s,1.7,0,g,true));box(4,.12,.12,0x6a4220,0,3.3,0,g);box(4,.12,.12,0x6a4220,0,2.5,0,g);for(let k=0;k<8;k++){const f=fischSchild(g,-1.5+k*.43,2.4-(k%2)*.8,.1,.22,[0xd8a050,0xc88a3a][k%2]);f.rotation.z=Math.PI/2;f.rotation.x=0}sperrKasten(bx+x,bz+3,4,.8,0)});
  [[-3,6],[3,7],[10,-4],[-10,-5]].forEach((p,i)=>{cyl(.6,1.1,0x8a5a32,bx+p[0],.55,bz+p[1],scene,true);cyl(.5,.08,0x4a3220,bx+p[0],1.12,bz+p[1],scene);kreis(bx+p[0],bz+p[1],.65)});holzstapel(bx+9,bz+5,.3);
  const m=person(bx+1.4,bz+1.2,Math.PI,0xf6f6f2,0x3a4a6a,0x6b4626,'kurz',1.3);hutAuf(m,0xf6f6f2);kreis(bx+1.4,bz+1.2,.5);fig(bx-5,bz+7,-.4,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.15);moeweAm(bx+7,3.4,bz+3,2.3);moeweAm(bx-7,3.4,bz+3.1,.8)}
/* ---------- 10. Segelschule ---------- */
function ort10(){const b=zone('Segelschule'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,12,0xe0d4b4,.09);
  (function(){const g=stall(bx+8,bz-4,9,5,3,0xf6f6f2,0x1f4e79,rfd(b));[-1,1].forEach(s=>box(2.4,.7,.06,[0x3b8fc4,0xffd45e][(s+1)/2],s*2.5,3.9,2.54,g));tri([0,5.6,2.4],[0,3.8,2.4],[2,4.4,2.4],0xe0302a,g);cyl(.05,1.8,0xe8e4da,0,4.6,2.4,g)})();
  for(let i=0;i<6;i++){const s=ruder(scene,[0xe0302a,0x3b8fc4,0xffd45e,0x4caf6a,0xf59e3f,0xb06ae0][i]);s.scale.setScalar(.9);const p=[bx-9.5+i*3.5,bz+3.6];s.position.set(p[0],.35,p[1]);s.rotation.y=(i%2)*.1;kreis(p[0],p[1],1.1);const mm=cyl(.05,4,0xe8e4da,p[0],2.2,p[1],scene);tri([p[0],4,p[1]],[p[0],1.6,p[1]],[p[0]+2,1.8,p[1]],[0xf6f6f2,0xe0605a,0xffd45e][i%3],scene)}
  box(5,.2,2.6,0x8a5a32,bx-9,.25,bz+9,scene);const sl=box(3.4,.14,8,0x9a8a6a,bx-12.5,.25,bz-1,scene);kreis(bx-12.5,bz-1,.2);
  (function(){const g=grp(bx+10,0,bz+2);box(.1,2,3,0xf6f6f2,0,1.6,0,g,true);box(.14,.2,3.2,0x6a4220,0,2.7,0,g);[-1.5,1.5].forEach(s=>cyl(.08,1.8,0x6a4220,0,.9,s,g));sperrKasten(bx+10,bz+2,.6,3.4,0)})();
  const kids=[[bx-2,bz+7,2.5,0xf59e3f],[bx+1,bz+8,3.6,0xf59e3f],[bx+4,bz+6,2,0xf59e3f],[bx-5,bz+9,-.5,0xf59e3f]];kids.forEach((k,i)=>fig(k[0],k[1],k[2],k[3],0x3b6fc4,[0xe8c24a,0x2a1d14,0x6b4626,0xb5651d][i],['zoepfe','kurz','cap','pferd'][i],1));const t=person(bx+2,bz+9.5,Math.PI,0x1f4e79,0xf6f6f2,0x6b4626,'kurz',1.35);hutAuf(t,0xf6f6f2);kreis(bx+2,bz+9.5,.5);[[-12,-8],[13,-6]].forEach(p=>fahne(bx+p[0],bz+p[1],6.5,0x3b8fc4,0xffffff))}
/* ---------- 11. Werft mit Boot im Dock ---------- */
function ort11(){const b=zone('Werft'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10.5,0xc8c0b0,.09);
  (function(){const g=grp(bx-3,0,bz-6);box(12,.2,7,0x8a8a90,0,.1,0,g);[[-5.8,-3.3],[5.8,-3.3],[5.8,3.3],[-5.8,3.3]].forEach(p=>cyl(.2,5,0x6a6a70,p[0],2.5,p[1],g,true));[-5.8,5.8].forEach(x=>{box(.3,.3,7,0x6a6a70,x,5,0,g)});box(12,.3,.3,0x6a6a70,0,5.2,-3.3,g);box(12,.3,.3,0x6a6a70,0,5.2,3.3,g);[-1,1].forEach(s=>box(12.4,.2,3.8,0x7a7a82,0,5.35,s*1.7,g).rotation.x=s*-.2);box(12,5,.2,0x9a9aa2,0,2.6,-3.4,g,true);sperrKasten(bx-3,bz-6,12.4,.5,0);[[-5.8],[5.8]].forEach(s=>sperrKasten(bx-3+s[0],bz-6,.5,7,0));
    const B=grp(0,2.4,0,g);rumpf(B,9,3.2,1.8,0x2a5078,0xb08850,0xe0302a);box(2,1.4,2.4,0xf6f6f2,-1.5,1.4,0,B);cyl(.1,5,0xe8e4da,1,3,0,B);vm(B);[-1.8,0,1.8].forEach(x=>{box(.3,2.2,2.6,0x8a5a32,x-.2,1.1,0,g);box(.3,2.2,.3,0x8a5a32,x-.2,1.1,0,g)});})();
  [[5,-1],[8,3]].forEach(p=>{box(4,.3,.8,0xc9a46a,bx+p[0],.3,bz+p[1],scene);box(4,.3,.8,0xb08850,bx+p[0],.6,bz+p[1],scene);kreis(bx+p[0],bz+p[1],1.6)});[[3,6],[-6,6],[6,7]].forEach((p,i)=>{cyl(.4,.6,[0xe0302a,0x3b8fc4,0xffd45e][i],bx+p[0],.3,bz+p[1],scene,true);kreis(bx+p[0],bz+p[1],.45)});
  box(.2,.2,7,0xe8e4da,bx+8,.35,bz+7,scene);tisch(bx-8,bz+5,0);bankW(bx-8,bz+7,Math.PI);const w=person(bx-1,bz+1.6,Math.PI,0x3b6fc4,0x4a4a5a,0x6b4626,'kurz',1.3);hutAuf(w,0xf2c230);kreis(bx-1,bz+1.6,.5);fig(bx+2,bz+5,.8,0xf59e3f,0x4a4a5a,0x2a1d14,'kurz',1.3);moeweAm(bx+9,.1,bz-3,2)}
/* ---------- 12. Kapitänshaus ---------- */
function ort12(){const b=zone('Kapitänshaus'),bx=b.x,bz=b.z;ast(b);const h=sph(1,0x86b05a,bx,0,bz-2,scene,9,1.4,8);h.castShadow=true;
  const g=stall(bx,bz-4,7,5.4,3.8,0xf6f6f2,0x1f4e79,rfd(b));const r=new THREE.Mesh(new THREE.TorusGeometry(.5,.08,6,14),mat(0x8a5a32));r.position.set(0,6.2,2.2);g.add(r);sph(.42,0xcfeaf5,0,6.2,2.2,g,1,1,.1);box(1.2,.9,.06,0xcfeaf5,-2.3,2,2.84,g);box(1.2,.9,.06,0xcfeaf5,2.3,2,2.84,g);box(.8,2.4,.8,0x8a4a2a,2.2,6.8,-.6,g);
  fahne(bx-8,bz+1,9,0x1f4e79,0xffffff);const ank=grp(bx+6,0,bz+2);box(.2,2.2,.2,0x2a2a2e,0,1.1,0,ank);box(1.4,.2,.2,0x2a2a2e,0,1.8,0,ank);const ar=new THREE.Mesh(new THREE.TorusGeometry(.7,.1,6,12,Math.PI),mat(0x2a2a2e));ar.rotation.z=Math.PI;ar.position.y=.8;ank.add(ar);kreis(bx+6,bz+2,.6);
  (function(){const g2=grp(bx-4,0,bz+3.4);cyl(.16,3.4,0x3a3a3e,0,1.7,0,g2,true);cyl(.5,.4,0x8a5a32,0,3.4,0,g2);const f=cyl(.2,2,0xc9a46a,0,3.9,0,g2);f.rotation.z=1;kreis(bx-4,bz+3.4,.6)})();
  const rad=grp(bx+3.4,0,bz+2.4);const w=new THREE.Mesh(new THREE.TorusGeometry(.7,.08,6,18),mat(0x8a5a32));w.position.y=1.6;rad.add(w);for(let i=0;i<8;i++)box(.07,1.4,.07,0x8a5a32,0,1.6,0,rad).rotation.z=i*Math.PI/4;box(.2,1.6,.2,0x6a4220,0,.8,0,rad);kreis(bx+3.4,bz+2.4,.7);
  const k=person(bx+1,bz+4.4,Math.PI,0x1f4e79,0x3a3a4a,0xb0b0b0,'kurz',1.35);hutAuf(k,0xf6f6f2);kreis(bx+1,bz+4.4,.5);bankW(bx-6,bz+6,0);ring(scene,bx+3.4,2,bz-1.1,0);laterne(bx+7,bz+5);laterne(bx-7,bz+5);zaunL(bx,bz+1,9.5,36,b.gap,3.6,0xf2f2f2)}
/* ---------- 13. Zollhaus mit Lotsenstation ---------- */
function ort13(){const b=zone('Zollhaus'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10.5,0xd8d0c0,.09);
  stall(bx-4,bz-4,8,5,3.2,0xc8c0b8,0x5a3a2a,rfd(b));
  (function(){const g=grp(bx+6.5,0,bz-5);box(3.6,8,3.6,0xf6f6f2,0,4,0,g,true);box(3.8,.3,3.8,0xe0302a,0,8.1,0,g);box(4.6,2.2,4.6,0x3a4a56,0,9.4,0,g,true);for(let i=0;i<4;i++){const a=i*Math.PI/2;box(.06,1.4,3.6,0x9fd0e8,Math.sin(a)*2.34,9.5,Math.cos(a)*2.34,g).rotation.y=a}box(5,.3,5,0xe0302a,0,10.6,0,g);cyl(.12,2,0x3a3a3e,0,11.8,0,g);const ra=grp(0,12.6,0,g);box(2.6,.15,.3,0x3a3a3e,0,0,0,ra);vm(ra);bewegt(ra,t=>{ra.rotation.y=t*1.4});sperrKasten(bx+6.5,bz-5,3.8,3.8,0)})();
  (function(){const g=grp(bx-1,0,bz+6);box(.3,.6,.3,0x6a6a70,-3.3,.3,0,g,true);const arm=box(5.4,.25,.25,0xf6f6f2,-.5,1.1,0,g);for(let i=0;i<5;i++)box(.5,.27,.27,0xe0302a,-2.6+i*1.1,1.1,0,g);box(.3,.9,.3,0x6a6a70,2.5,.45,0,g,true);kreis(bx-4.3,bz+6,.3);kreis(bx+1.5,bz+6,.3)})();
  const z1=fig(bx+1,bz+4,Math.PI*1.2,0x2f6a3a,0x2f6a3a,0x2a1d14,'kurz',1.35);const m=person(bx-6,bz+3,.8,0x2f6a3a,0x2f6a3a,0x6b4626,'kurz',1.3);hutAuf(m,0x2f6a3a);kreis(bx-6,bz+3,.5);fahne(bx-9,bz+1,7,0xe0302a,0xffffff);fahne(bx+10,bz+4,7,0x1f4e79,0xf6c040);
  [[bx+8,bz+4],[bx-9,bz-6]].forEach(p=>{fischkiste(p[0],p[1],.4);})}
function etappe2(){ort2();ort3();ort4();ort5();ort6();ort7();ort8();ort9();ort10();ort11();ort12();ort13()}
/* ==================== Etappe 3: Dünen, Strand, Watt ==================== */
const DUENEN=[0xe3d49c,0xdccb8e,0xe8dca8];
function duene(x,z,rx,ry,rz,k){inst('sphT',x,0,z,rx,ry,rz,DUENEN[k==null?Math.floor(nr()*3):k])}
function hafer(x,z,s){s=s||1;for(let i=0;i<3;i++){const a=i*2.1+x;inst('con',x+Math.cos(a)*.15*s,.55*s,z+Math.sin(a)*.15*s,.08,1.1*s,.08,[0xb2b668,0xa4ac5a,0xbcc070][i])}}
function sanddorn(x,z,s){s=s||1;inst('sph',x,.6*s,z,.8*s,.6*s,.8*s,0x7f9a4a);for(let i=0;i<6;i++)inst('sph',x+Math.cos(i*1.1)*.7*s,.7*s+(i%2)*.2,z+Math.sin(i*1.1)*.6*s,.12,.12,.12,0xf08a1a)}
function muschel(x,z,s,f,rot){f=f||0xf2e6d8;const g=grp(x,0,z);g.rotation.y=rot||0;sph(.5*s,f,0,.14*s,0,g,1,.28,1.1);for(let i=0;i<5;i++)box(.04*s,.05*s,.5*s,0xd8c4ae,(i-2)*.16*s,.3*s,0,g).rotation.y=(i-2)*.28;box(.4*s,.1*s,.16*s,0xd8c4ae,0,.16*s,-.5*s,g);return g}
function seestern(x,z,s,f){f=f||0xe8662a;const g=grp(x,0,z);for(let i=0;i<5;i++){const c=cone(.2*s,.8*s,f,Math.cos(i*1.257)*.4*s,.08*s,Math.sin(i*1.257)*.4*s,g);c.rotation.z=Math.PI/2;c.rotation.y=-i*1.257;c.scale.y=.8*s;c.scale.z=.3*s}sph(.22*s,f,0,.1*s,0,g,1,.4,1);return g}
function fernrohr(x,z,rot,h){h=h||1.5;const g=grp(x,0,z);cyl(.07,h,0x3a3a3e,0,h/2,0,g,true);const r=cyl(.12,.9,0x2a3a4a,0,h+.1,0,g);r.rotation.z=1.2;cyl(.15,.12,0x1a1a1a,.4,h+.35,0,g).rotation.z=1.2;g.rotation.y=rot||0;kreis(x,z,.3);return g}
function windsack(x,z,h){cyl(.08,h,0xe8e4da,x,h/2,z,scene,true);kreis(x,z,.25);const g=grp(x,h,z);const ks=[];for(let i=0;i<4;i++)ks.push(cone(.4-i*.05,.7,i%2?0xf6f6f2:0xe0302a,.4+i*.7,0,0,g));ks.forEach(k=>k.rotation.z=-Math.PI/2);vm(g);bewegt(g,t=>{g.rotation.y=Math.sin(t*.4)*.5;g.rotation.z=Math.sin(t*2)*.08})}
function pricke(x,z){inst('cyl',x,.8,z,.04,1.6,.04,0x6a5238);inst('sph',x,1.5,z,.15,.4,.15,0x5a4a28);inst('sph',x+.05,1.2,z,.12,.3,.12,0x6a5a38)}
function steg2(x1,z1,x2,z2,w){return steg(x1,z1,x2,z2,w)}
/* ---------- 14. Dünenlandschaft ---------- */
function ort14(){const b=zone('Dünenlandschaft'),bx=b.x,bz=b.z;ast(b);
  const D=[[-9,-6,5,2.2,4],[3,-9,6,2.6,5],[10,-2,4,1.9,5],[-4,5,5,1.7,4],[8,8,4,1.5,3.5],[-12,6,3.5,1.4,3],[0,-1,3,1.3,3]];D.forEach((d,i)=>{duene(bx+d[0],bz+d[1],d[2],d[3],d[4],i);if(d[3]>1.6&&i!==3)kreis(bx+d[0],bz+d[1],d[2]*.55)});
  for(let i=0;i<46;i++){const a=nr()*6.28,r=Math.sqrt(nr())*14;hafer(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.9,.9+nr()*.5)}for(let i=0;i<5;i++)sanddorn(bx+Math.cos(i*1.3+.5)*10,bz+Math.sin(i*1.3+.5)*9,.9+nr()*.4);for(let i=0;i<8;i++)heide(bx+(nr()-.5)*24,bz+(nr()-.5)*20,1);
  bandM(spl([[bx-13,bz+10],[bx-5,bz+7],[bx+1,bz+9],[bx+8,bz+4],[bx+13,bz-4]],2),2.4,0x9a6a3a,.075);for(let i=0;i<9;i++){const u=i/8;inst('cyl',bx-13+u*26,.5,bz+9-Math.sin(u*3)*8,.07,1,.07,0x6a4220)}
  (function(){const g=grp(bx+6,0,bz-12);[[-1.3,-1],[1.3,-1],[-1.3,1],[1.3,1]].forEach(p=>cyl(.14,2.6,0x7a5230,p[0],1.3,p[1],g,true));box(3.4,.2,2.8,0x9a6a3a,0,2.6,0,g);box(3.4,.1,.1,0x6a4220,0,3.3,1.3,g);box(3.4,.1,.1,0x6a4220,0,3.3,-1.3,g);for(let i=0;i<4;i++)box(.9,.12,.6,0x9a6a3a,-.6,.3+i*.6,1.8+(3-i)*.5,g);sperrKasten(bx+6,bz-12,3.4,3,0)})();
  streif(haseM,pendel(spl([[bx-12,bz+9],[bx-4,bz+3],[bx+4,bz+10],[bx+11,bz+4]],2.5),.8),1.8,0,1.2);streif(haseM,pendel(spl([[bx+2,bz-6],[bx+8,bz+2],[bx-3,bz+6]],2.5),.7),1.6,4,1.2);
  fig(bx-6,bz+9,.5,0x2f6a3a,0x4a4a3a,0x6b4626,'kurz',1.3);fig(bx+4,bz+12,3.5,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1)}
/* ---------- 15. Muschelstrand ---------- */
function ort15(){const b=zone('Muschelstrand'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,11.5);
  for(let i=0;i<140;i++){const a=nr()*6.28,r=Math.sqrt(nr())*11,x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;inst('sph',x,.06,z,.16+nr()*.1,.07,.13,[0xf6eee0,0xe8c8c0,0xd8b48a,0xf2f2ee,0xc8d0d8][i%5],nr()*3)}
  [[-3,-2,2,0xf6eee0],[3,1,1.6,0xf2c8c0],[-6,4,1.4,0xe8d4b0],[5,-5,1.8,0xf6eee0],[0,5,1.2,0xe8c8c0]].forEach((m,i)=>muschel(bx+m[0],bz+m[1],m[2]*1.3,m[3],i*1.3));
  [[-8,-3,1.3],[7,-2,1],[2,-7,1.1],[-2,7,.9]].forEach((p,i)=>seestern(bx+p[0],bz+p[1],p[2],[0xe8662a,0xd8a030,0xe0605a,0xe8662a][i]));
  stamm(bx-7,bz+7,5,.4,.35);stamm(bx+8,bz-8,4,2.2,.3);for(let i=0;i<6;i++)inst('box',bx-9+i*3.4,.04,bz+10.5+Math.sin(i)*.4,2.4,.04,.35,0xcbbd90,.2);
  netz(bx+9,bz+4,.5,1.5);eimer(bx-1,bz+1,0xe0302a,0xf6eee0);korb(bx+3,bz+9,0xf6eee0);
  const sam=fig(bx-3,bz+9,.5,0xf59e3f,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(bx+1,bz+8,-1.4,0x4caf6a,0x4a4a5a,0x2a1d14,'kurz',1.25);moeweAm(bx+6,.2,bz+8,1.9);
  for(let i=0;i<2;i++){const k=krabbe(scene);k.position.set(bx-4+i*7,0,bz+3+i*3);k.scale.setScalar(1.8);lebendig.push({o:k,ph:i*3})}}
/* ---------- 16. Drachenwiese ---------- */
function ort16(){const b=zone('Drachenwiese'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,16.5,0x9ec36a,.07);
  [[0xe0302a,0xffd45e],[0x3b8fc4,0xffffff],[0x4caf6a,0xffd45e],[0xf59e3f,0x3b6fc4],[0xb06ae0,0xffd45e]].forEach((c,i)=>{drache(bx-7+i*3.4,bz-1+(i%2)*3,5.5,13+i*1.6,i*1.9,c[0],c[1])});
  [[-9,3,.6,0xe0605a,'zoepfe'],[-3,6,-.3,0x4caf6a,'cap'],[3,4,.2,0xf59e3f,'kurz'],[9,6,-.6,0x3b8fc4,'pferd'],[0,9,.1,0xb06ae0,'kurz']].forEach((p,i)=>{const f=fig(bx+p[0]+(-1+i%2),bz+p[1]-2,Math.PI+p[2]*.3,p[3],0x3a4a6a,[0xe8c24a,0x2a1d14,0x6b4626,0xb5651d,0x9a9a9a][i],p[4],1.1)});
  (function(){const g=grp(bx+11,0,bz-9);box(6,.15,.15,0x6a4220,0,2.6,0,g);[-3,3].forEach(s=>cyl(.1,2.8,0x6a4220,s,1.4,0,g,true));[0xe0302a,0x3b8fc4,0xffd45e,0x4caf6a,0xf59e3f].forEach((c,i)=>{const k=box(.9,1.2,.05,c,-2.4+i*1.2,1.9,.1,g);k.rotation.z=.78;box(.05,1.7,.05,0xf6f6f6,-2.4+i*1.2,1.9,.12,g)});sperrKasten(bx+11,bz-9,6.4,.6,0);box(3.4,1,2,0xf6f6f2,0,.5,2,g,true);box(3.8,.15,2.4,0xe0302a,0,1.1,2,g);sperrKasten(bx+11,bz-7,3.4,2,0)})();
  windsack(bx-12,bz-8,5);windsack(bx+12,bz+9,5);[[-6,-9],[7,-3]].forEach(p=>{box(2.4,.05,2,[0xe0605a,0x3b8fc4][Math.abs(p[0])%2],bx+p[0],.1,bz+p[1],scene);korb(bx+p[0]+.5,bz+p[1],0xe0302a)});for(let i=0;i<26;i++){const a=nr()*6.28,r=6+nr()*9;blumeI(bx+Math.cos(a)*r,bz+Math.sin(a)*r,i%6)}}
/* ---------- 17. Seehundbank ---------- */
function ort17(){const b=zone('Seehundbank'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,11.5);scheibe(bx-3,bz-1,6.5,0xcdbd98,.1);
  [[-5,-2,.4,1.25],[-1,0,2.6,1.1],[2.4,-3.4,-.6,1.2],[-3.6,3.4,1,1],[1,3.8,3.2,.55],[4.6,1,.2,.55]].forEach((p,i)=>{const r=robbe(scene);r.position.set(bx+p[0]-3,0,bz+p[1]-1);r.rotation.y=p[2];r.scale.setScalar(p[3]);lebendig.push({o:r,ph:i*2.2});kreis(bx+p[0]-3,bz+p[1]-1,p[3]*1.2)});
  zaunL(bx-3,bz-1,8.6,34,b.gap,3.6,0x8a6a3a);fernrohr(bx+6,bz+6,-1.5);fernrohr(bx+8,bz+4,-1.6,1.2);
  (function(){const g=grp(bx+8,0,bz-5);[-1,1].forEach(s=>cyl(.12,2.4,0x6a4220,s*1.2,1.2,0,g,true));box(3.2,1.8,.14,0x8a5a32,0,2.1,0,g,true);sph(.6,0x8a8f94,0,2.1,.1,g,1.6,.7,.1);sph(.18,0x16110d,.8,2.1,.14,g);sperrKasten(bx+8,bz-5,3.2,.6,0)})();
  bankW(bx+5,bz+9,Math.PI);moeweAm(bx-7,.2,bz+6,1.2);moeweAm(bx+3,.2,bz-8,3);for(let i=0;i<6;i++)inst('sph',bx-9+nr()*14,.1,bz-8+nr()*14,.4,.16,.3,0x9a9aa2)}
/* ---------- 18. Vogelinsel mit Beobachtungshütte ---------- */
function ort18(){const b=zone('Vogelinsel'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,9);
  (function(){const g=stall(bx-5,bz-3,7,4,2.8,0x8a6a42,0x3a5a3a,0);[-1,1].forEach(s=>box(1.6,.22,.06,0x1a1410,s*2,1.8,2.04,g));box(3.2,.22,.06,0x1a1410,0,2.2,-2.06,g)})();
  fernrohr(bx-4,bz+3,-1.5);fernrohr(bx-6.4,bz+4.6,-1.6,1.2);bankW(bx+1,bz+6,Math.PI);
  const IX=-167,IZ=-136;landFl([[IX-9,IZ],[IX-5,IZ-5],[IX+3,IZ-6],[IX+9,IZ-1],[IX+6,IZ+5],[IX-2,IZ+7],[IX-8,IZ+4]],0xe6d8a4,.07);landFl([[IX-11,IZ],[IX-6,IZ-7],[IX+3,IZ-8],[IX+11,IZ-1],[IX+8,IZ+7],[IX-2,IZ+9],[IX-10,IZ+5]],0x8fd0d4,.05);
  duene(IX-1,IZ-1,6,.8,4,1);for(let i=0;i<5;i++)hafer(IX-5+i*2.2,IZ-1+(i%2)*2,.8);
  for(let i=0;i<14;i++){const a=i*.9,r=2+(i%4)*1.2;const v=i%3===1?moewe(scene):strandvogel(scene,i%3,1.6);v.position.set(IX+Math.cos(a)*r,.07,IZ+Math.sin(a)*r*.7);v.rotation.y=a*3;if(i%3===1)v.scale.setScalar(1.3);if(i%3===1)lebendig.push({o:v,ph:i})}
  [[-148,-136,18,16,0],[-160,-120,22,14,2.1],[-170,-150,16,15,4]].forEach((f,i)=>flieger(f[0],f[1],f[2],f[3],f[4],.3+i*.06,0xf6f6f2,0xe8a030))}
/* ---------- 19. Strandbar mit Beachvolleyball ---------- */
function ort19(){const b=zone('Strandbar'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,12.5);
  (function(){const g=stall(bx-3,bz-5,8,4,2.8,0xe8c890,0xe0605a,0);markise(g,8.4,2.9,2.8,0xe0605a,0xf6f6f2,8);box(5,1.1,.9,0x8a5a32,0,.55,3.1,g,true);for(let i=0;i<4;i++){cyl(.3,.1,0xe0302a,-1.8+i*1.2,.85,4.2,g);cyl(.06,.8,0x6a6a70,-1.8+i*1.2,.4,4.2,g)}sperrKasten(bx-3,bz+0,5,.9,0)})();
  for(let i=0;i<7;i++){const x=bx-10+i*1.9;const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:[0xffd45e,0xe0605a,0xf6f6f2][i%3]}));l.position.set(x,2.9+Math.sin(i)*.25,bz-1.2);l.scale.setScalar(.2);scene.add(l)}
  (function(){const cx=bx+6,cz=bz+3;bodenFl(cx,cz,9,16,0xf0e2b0,.11);[-1,1].forEach(s=>cyl(.1,2.6,0x8a5a32,cx,1.3,cz+s*4.4,scene,true));box(.04,.9,8.8,0xf6f6f6,cx,2.2,cz,scene);for(let i=0;i<6;i++)box(.03,.03,8.8,0x3a3a3e,cx,1.8+i*.12,cz,scene);[[-1,1].forEach(s=>kreis(cx,cz+s*4.4,.3))];sperrLinie(cx,cz-4.4,cx,cz+4.4,.2);
    sph(.28,0xf6f6f2,cx+1.4,2.9,cz+1,scene);
    [[-2.6,-3,0],[2.4,-2.6,.4],[-2.4,3.6,Math.PI],[2.6,3,Math.PI+.3]].forEach((p,i)=>{fig(cx+p[0],cz+p[1],p[2],[0xe0302a,0xe0302a,0x3b8fc4,0x3b8fc4][i],0x3a4a6a,[0xe8c24a,0x2a1d14,0x6b4626,0xb5651d][i],'kurz',1.3)})})();
  [[-9,4],[-6,7],[-12,8]].forEach((p,i)=>{const g=grp(bx+p[0],0,bz+p[1]);g.rotation.y=.4+i;const r=box(.9,.08,1.6,[0xe0605a,0x3b8fc4,0xffd45e][i],0,.45,0,g);r.rotation.x=-.35;box(.06,.4,.06,0x6a4220,0,.2,.7,g);box(.06,.5,.06,0x6a4220,0,.25,-.7,g);kreis(bx+p[0],bz+p[1],.8)});
  [[bx-14,bz-3],[bx+14,bz-6]].forEach(p=>laterne(p[0],p[1]));fig(bx-4,bz-.8,Math.PI,0xf6f6f2,0x3b6fc4,0x6b4626,'cap',1.3);schirm(bx-1,bz+8,0x4caf6a);schirm(bx-8,bz+9,0xf59e3f);moeweAm(bx+12,.2,bz+8,1.1)}
/* ---------- Priele im Watt ---------- */
function priel(P,w,xs,ex){const s=spl(P,2.2),br=[];xs.forEach(r=>{let bi=0,bd=1e9;s.forEach((q,i)=>{const d=Math.abs(q[1]-roadZ(q[0],r));if(d<bd){bd=d;bi=i}});if(bd<14)br.push(bruecke(s[bi][0],s[bi][1],s,w+.5))});(ex||[]).forEach(p=>{let bi=0,bd=1e9;s.forEach((q,i)=>{const d=Math.hypot(q[0]-p[0],q[1]-p[1]);if(d<bd){bd=d;bi=i}});br.push(bruecke(s[bi][0],s[bi][1],s,w+.5))});bachBauen(s,w,br);for(let i=0;i<s.length;i+=3){const q=s[i];[-1,1].forEach(sg=>{if(nr()<.5)inst('sph',q[0]+sg*(w/2+1.3),.12,q[1]+nr()*.8,.5+nr()*.4,.14,.4,0x9a8a68)})}return s}
/* ---------- 20. Wattwanderweg ---------- */
function ort20(){const b=zone('Wattwanderweg'),bx=b.x,bz=b.z;ast(b,4);
  const pr=priel([[bx+13,bz-14],[bx+8,bz-6],[bx+12,bz+2],[bx+6,bz+10],[bx+9,bz+19]],2.6,[44,-8],[[bx+11,bz+1]]);
  const P=spl([[bx-14,bz+1],[bx-4,bz-2],[bx+4,bz+3],[bx+16,bz-1]],2);weg(P,2.6,0xb09a74);P.forEach((q,i)=>{if(i%3===0){pricke(q[0]+1.9,q[1]+1.4);pricke(q[0]-1.9,q[1]-1.4)}});
  for(let i=0;i<60;i++){const a=nr()*6.28,r=3+nr()*14,x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r*.9;if(Math.abs(x-bx-9)<4&&z>bz-16&&z<bz+20)continue;if(i%2){inst('sph',x,.08,z,.28,.1,.28,0x6a5a42);inst('sph',x+.18,.06,z+.1,.2,.08,.2,0x74644a)}else inst('cyl',x,.06,z,.12,.12,.12,0x6a5a42)}
  for(let i=0;i<14;i++)inst('box',bx-14+(i%7)*4.4,.05,bz-8+Math.floor(i/7)*16,3.6,.03,.2,0xb8a880,i*.3);
  for(let i=0;i<3;i++){const k=krabbe(scene);k.position.set(bx-4+i*5,.02,bz+8+(i%2)*3);k.scale.setScalar(2);lebendig.push({o:k,ph:i*2.5})}
  const fu=person(bx-8,bz+6,1.2,0xf2c230,0x2f4a3a,0x6b4626,'kurz',1.35);hutAuf(fu,0x2f4a3a);kreis(bx-8,bz+6,.5);[[-6,8,.6],[-4.4,6.4,1.5],[-5.6,4.6,1.9]].forEach((p,i)=>fig(bx+p[0],bz+p[1],p[2],[0xe0605a,0x4caf6a,0x3b8fc4][i],[0x3a4a6a,0x4a4a5a,0x6a5238][i],[0xe8c24a,0x2a1d14,0x6b4626][i],['zoepfe','kurz','cap'][i],1.05));
  eimer(bx-3,bz+9,0x3b8fc4,0x6a5a42);korb(bx+2,bz+9.5,0x6a5a42);moeweAm(bx+3,.3,bz-5,2);moeweAm(bx-9,.3,bz-8,.2);[[bx-12,bz+12],[bx+15,bz-12]].forEach(p=>{[-1,1].forEach(s=>{cyl(.35,.6,0x2a2a2a,p[0]+s*.6,.3,p[1],scene);})})}
/* ---------- 21. Gezeiten-Station ---------- */
function ort21(){const b=zone('Gezeiten-Station'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10,0xd8d0c0,.09);
  stall(bx-4,bz-4,6,4.4,3,0xf6f6f2,0x3a5a7a,0);
  (function(){const px=bx+5.5,pz=bz+2;wasserRund(px,pz,3.4,0x6ec0ea,.1);wRing(px,pz,3.9);const g=grp(px,0,pz);cyl(.18,9,0xf6f6f2,0,4.5,0,g,true);for(let i=0;i<12;i++)box(.5,.32,.1,i%2?0x3a3a3e:0xf59e3f,.3,.5+i*.7,.12,g);box(.24,.1,.7,0x3a3a3e,-.3,9,0,g);const fl=grp(.34,3,0,g);box(.5,.28,.14,0xe0302a,0,0,0,fl);vm(fl);bewegt(fl,t=>{fl.position.y=.8+6.4*(.5+.5*Math.sin(t*.06))})})();
  (function(){const g=grp(bx,0,bz+9);box(.14,2,.14,0x6a4220,-3,1,0,g,true);box(.14,2,.14,0x6a4220,3,1,0,g);box(6.6,3.4,.2,0x24527a,0,3.2,0,g,true);const fl2=[-2.6,-1.4,-.2,1,2.2];fl2.forEach((x,i)=>{box(.9,.5+Math.sin(i*1.6)*.4+.4,.08,0x6ec0ea,x,3.2+Math.sin(i*1.6)*.3-.5,.14,g)});sph(.4,0xf6f6f2,-2.4,4.4,.14,g,1,1,.2);box(1.2,.5,.08,0xe0302a,2.2,4.3,.14,g);box(1.2,.5,.08,0x4caf6a,2.2,3.6,.14,g);sperrKasten(bx,bz+9,6.6,.5,0)})();
  (function(){const g=grp(bx-7,0,bz+5);sph(1.1,0x3a7ab8,0,2.2,0,g);sph(.9,0x4caf6a,.3,2.4,.5,g,1,.6,.5);cyl(.1,2.6,0x6a6a70,0,.9,0,g);const m=grp(0,2.2,0,g);sph(.35,0xd8d8dc,3.2,0,0,m);vm(m);bewegt(m,t=>{m.rotation.y=t*.5});kreis(bx-7,bz+5,1.4)})();
  fig(bx-1,bz+4,Math.PI,0x3a5a7a,0xf6f6f2,0x6b4626,'kurz',1.3);fig(bx+2,bz+6,2.6,0xe0605a,0x4a4a5a,0xe8c24a,'zoepfe',1.1);fernrohr(bx+8,bz-6,.5);bankW(bx-8,bz+8,0);moeweAm(bx+3,.1,bz+8,2);fahne(bx+9,bz-2,6,0x24527a,0xffffff)}
/* ---------- 22. Salzwiese mit Lämmern ---------- */
function ort22(){const b=zone('Salzwiese'),bx=b.x,bz=b.z;ast(b,3.2);
  for(let i=0;i<80;i++){const a=nr()*6.28,r=Math.sqrt(nr())*13;const x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;inst('sph',x,.14,z,.34,.14,.34,0x6f9a52);if(i%2===0){inst('cyl',x,.35,z,.025,.6,.025,0x6f9a52);inst('blm',x,.7,z,.17,.1,.17,0xb694d8)}}
  const pr=priel([[bx-10,bz-12],[bx-6,bz-3],[bx-9,bz+5],[bx-4,bz+13]],1.8,[-8]);
  const g1=pendel(spl([[bx-3,bz-6],[bx+5,bz-3],[bx+8,bz+4],[bx,bz+8],[bx-4,bz+2]],2),.8);for(let i=0;i<5;i++)streif(lamm,g1,.5+(i%3)*.15,i*g1.L/5,1.3);for(let i=0;i<3;i++)streif(schaf,pendel(spl([[bx-2+i,bz-8],[bx+6,bz-2],[bx+1,bz+9]],2),1.1),.45,i*7,1.15);
  for(let i=0;i<5;i++){const s=lamm(scene);s.position.set(bx-7+i*3.4,0,bz+10+(i%2)*1.5);s.rotation.y=nr()*6;s.scale.setScalar(1.3);lebendig.push({o:s,ph:i*1.9});kreis(bx-7+i*3.4,bz+10+(i%2)*1.5,.7)}
  for(let i=0;i<4;i++){const x=bx+8+i*.2,z=bz-8+i*1.4;cyl(.08,1.3,0x6a4a2a,x,.65,z,scene,true);kreis(x,z,.2)}sitz(bx+8,1.45,bz-8,1,0,1.5);sitz(bx+8.2,1.45,bz-6.6,2.2,1,1.5);sitz(bx+8.6,1.45,bz-5.2,4,2,1.5);
  steg(bx-1,bz+14,bx+7,bz+16,2.2);fig(bx+2,bz+12,-.5,0x3b6fc4,0x4a4a5a,0x6b4626,'cap',1.2);fig(bx+4.6,bz+13,3.2,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1)}
/* ---------- 23. Muschelbank ---------- */
function ort23(){const b=zone('Muschelbank'),bx=b.x,bz=b.z;ast(b,4);
  for(let i=0;i<150;i++){const a=nr()*6.28,r=Math.sqrt(nr())*9,x=bx+Math.cos(a)*r*1.2,z=bz+Math.sin(a)*r*.9;inst('sph',x,.1,z,.34+nr()*.2,.18,.26+nr()*.15,[0x23283a,0x2c3446,0x3a3a4a][i%3],nr()*3)}
  for(let i=0;i<8;i++)inst('box',bx-12+(i%4)*7,.05,bz-8+Math.floor(i/4)*16,5,.03,.25,0xb8a880,i*.4);
  (function(){const g=grp(bx-2,0,bz-1);g.rotation.y=-.1;const k=kutter(g,0x2a5078,0xf6f6f2,1);k.position.y=.4;k.rotation.z=.08;[-1,1].forEach(s=>cyl(.3,2.2,0x6a4220,-1,.7,s*2.3,g).rotation.x=s*-.45);sperrKasten(bx-2,bz-1,11,4.2,-.1)})();
  for(let i=0;i<12;i++){const x=bx-11+nr()*22,z=bz-10+nr()*20;if(Math.hypot(x-bx+2,z-bz+1)<6.5)continue;const v=strandvogel(scene,i%2?0:2,1.6);v.position.set(x,.02,z);v.rotation.y=nr()*6.28}
  seestern(bx+7,bz+5,1.3,0xe8662a);seestern(bx-9,bz+6,1,0xd8a030);muschel(bx+4,bz+9,1.6,0x2c3446,.4);const w=person(bx+5,bz+3,.4,0xf2c230,0x2f4a3a,0x6b4626,'kurz',1.3);hutAuf(w,0x2f4a3a);kreis(bx+5,bz+3,.5);korb(bx+3.4,bz+3.6,0x23283a);eimer(bx+6.6,bz+4.2,0x3b8fc4,0x23283a);for(let i=0;i<2;i++){const k=krabbe(scene);k.position.set(bx-7+i*4,.02,bz+8);k.scale.setScalar(2);lebendig.push({o:k,ph:i*4})}}
/* ---------- 24. Nationalpark-Haus ---------- */
function ort24(){const b=zone('Nationalpark-Haus'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,11.5,0xd8d0c0,.09);
  (function(){const g=grp(bx-1,0,bz-5);box(14,3.4,5.6,0xb8905a,0,1.7,0,g,true);box(14.6,.5,6.2,0x6aa84a,0,3.55,0,g);for(let i=0;i<14;i++)inst('sph',bx-1-6.5+i*1,3.95,bz-5+((i*7)%5-2)*.9,.4,.2,.4,0x5f9a3a);for(let i=0;i<5;i++)box(1.5,1.9,.06,0xcfeaf5,-5+i*2.5,1.9,2.84,g);box(1.4,2.4,.1,0x3a5a7a,.4,1.2,2.84,g);const t=box(3,9,3,0xc8a070,6.5,4.5,-1.4,g,true);box(3.8,.3,3.8,0x6aa84a,6.5,9.2,-1.4,g);for(let i=0;i<4;i++)box(.06,1.1,3.1,0xcfeaf5,6.5,7.6,-1.4,g).rotation.y=i*Math.PI/2;sperrKasten(bx-1,bz-5,14.4,5.8,0);sperrKasten(bx+5.5,bz-6.4,3.2,3.2,0)})();
  (function(){const g=grp(bx-8,0,bz+5);for(let i=0;i<7;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(1.5-Math.abs(i-3)*.12,.09,5,14,Math.PI),mat(0xe8e0cc));t.position.set(i*.8-2.4,.1,0);t.rotation.y=Math.PI/2;t.rotation.z=0;g.add(t)}box(5.6,.22,.22,0xe8e0cc,0,.12,0,g);sph(.8,0xe8e0cc,3.5,.5,0,g,1.8,.7,.6);sperrKasten(bx-8,bz+5,6,1.4,0)})();
  seestern(bx+5,bz+6,2.4,0xe8662a);muschel(bx+8,bz+4,3.2,0xf2e6d8,.6);wurm(bx+6,bz+10,.4,1.6);bankW(bx-1,bz+8,0);bankW(bx+10,bz+8,0.3);fernrohr(bx-4,bz+11,.2);fig(bx+2,bz+7,3.4,0x2f6a3a,0x4a4a3a,0x6b4626,'kurz',1.35);fig(bx-3,bz+5,.7,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(bx+9,bz+7,-.7,0x3b8fc4,0x4a4a5a,0x2a1d14,'cap',1.15);fahne(bx-10,bz-1,7,0x2f6a3a,0xffffff)}
function torbogenFest(){[[-4.1,108],[5.4,109],[7,107]].forEach(p=>kreis(p[0],p[1],.8))}
function wattFuellung(){torbogenFest();const bx=152,bz=-92;haus(bx,bz,4.4,3.2,0xb8905a,0x6aa84a);box(1,1.4,.1,0x3a5a7a,bx,.7,bz+1.65,scene);fahne(bx+3.5,bz-1,6,0x2f6a3a,0xffffff);bankW(bx-4,bz+4,0);fernrohr(bx+3,bz+4,.3);
  fig(bx+6,bz+9,3.4,0xf2c230,0x2f4a3a,0x6b4626,'kurz',1.3);fig(bx-8,bz+12,.5,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(bx+4,bz+18,2,0x3b8fc4,0x4a4a5a,0x2a1d14,'cap',1.2);fig(bx-3,bz-14,1,0x4caf6a,0x4a4a5a,0x2a1d14,'kurz',1.25);
  for(let i=0;i<10;i++){const v=strandvogel(scene,i%2?0:2,1.6);v.position.set(bx-10+nr()*20,.02,bz+8+nr()*30);v.rotation.y=nr()*6.28}
  for(let i=0;i<3;i++){const k=krabbe(scene);k.position.set(bx-6+i*5,.02,bz+14);k.scale.setScalar(2);lebendig.push({o:k,ph:i*4})}
  for(let i=0;i<12;i++)pricke(bx+10+(i%2)*2,bz-20+i*3.5);for(let i=0;i<10;i++)inst('box',bx-12+nr()*22,.05,bz-16+nr()*34,3+nr()*2,.03,.25,0xb8a880,nr()*3)}
function etappe3(){wattFuellung();ort14();ort15();ort16();ort17();ort18();ort19();ort20();ort21();ort22();ort23();ort24()}
/* ==================== Etappe 3b: Deich und Land, Felsen und Klippen, Inselmitte ==================== */
const hundM=automerge(function(par){return vier(par,{f:0x2a2a2e,w:0xf6f2ea,d:0x1a1a1a,sc:0xf6f2ea,h:.72,bl:.65,bh:.3,bw:.24,lr:.07,bauch:1,na:.45,nl:.3,nr:.14,hr:.22,hl:1.4,ht:.3,oh:1.2,ef:0x2a2a2e,tr:.1,tl:2.6,tw:7})});
const dk=(c,f)=>new THREE.Color(c).multiplyScalar(f).getHex();
function hecke(x1,z1,x2,z2,gap,k){const L=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(L/1.5));let pa=null;for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n,z=z1+(z2-z1)*i/n,im=gap&&Math.hypot(x-gap[0],z-gap[1])<gap[2];if(!im){inst('sph',x,.55,z,.9,.7,.8,[0x4a8a3a,0x3f7a34][i%2]);if(i%4===0)inst('blm',x,1,z,.5,.4,.5,[0xf47ab0,0xffffff,0xe0605a][(k||0)%3])}if(pa&&!im&&!pa[2])sperrLinie(pa[0],pa[1],x,z,.5);pa=[x,z,im]}}
function windrad(x,z,s,rot,sp){s=s||1;const g=grp(x,0,z);g.rotation.y=rot||0;cyl(1.1*s,.8*s,0xe8e8e4,0,.4*s,0,g,true);cyl(.5*s,22*s,0xf2f2ee,0,11.4*s,0,g,true);cyl(.4*s,2*s,0xe8e8e4,0,22.5*s,0,g);box(2.8*s,1.4*s,1.5*s,0xf2f2ee,.4*s,23.2*s,0,g,true);cone(.8*s,1.4*s,0xe0302a,2.1*s,23.2*s,0,g).rotation.z=-Math.PI/2;
  const bl=grp(1.6*s,23.2*s,0,g);for(let i=0;i<3;i++){const a=grp(0,0,0,bl);a.rotation.x=i*2.094;box(.25*s,5.6*s,.9*s,0xf6f6f2,0,3.2*s,0,a);box(.2*s,1.2*s,.5*s,0xe0302a,0,6*s,0,a)}vm(bl);bewegt(bl,t=>{bl.rotation.x=t*(sp||.9)});kreis(x,z,1.3*s);return g}
function solar(par,x,y,z,w,d,rx){const g=grp(x,y,z,par);const p=box(w,.12,d,0x2a4a8a,0,0,0,g,true);p.rotation.x=rx||-.5;for(let i=1;i<4;i++)box(.04,.14,d,0xcfd8e8,-w/2+i*w/4,0,0,g).rotation.x=rx||-.5;return g}
function reetHaus(x,z,w,d,hh,wand,rot,hof){const g=stall(x,z,w,d,hh,wand,0xc4a862,rot);box(w+.9,.5,.5,0xb09450,0,hh+d/2*Math.tan(.62)+.22,0,g);box(.7,2,.7,0x8a4a2a,w*.28,hh+1.6,-d*.15,g);box(.9,.2,.9,0x6a3a2a,w*.28,hh+2.7,-d*.15,g);if(hof)rauch(g,w*.28,hh+2.9,-d*.15);return g}
/* ---------- 25. Deich mit Deichschäfer und Schafherde ---------- */
const DEICH=[[88,66],[91,44],[89,20],[93,-10],[90,-40],[92,-70],[89,-100]];
function deichBauen(){const s=spl(DEICH,3),luecke=q=>SEITENWEGE.some(r=>Math.abs(q[1]-roadZ(q[0],r))<6.5);let pa=null;
  s.forEach((q,i)=>{const lk=luecke(q);if(!lk){inst('sphT',q[0],.2,q[1],6.2,2.7,5,0x7fae58);inst('sphT',q[0]-1,2,q[1],3.6,1.3,3.4,0x8dbb62);if(i%3===0)hafer(q[0]+1,q[1],.8)}else{inst('sph',q[0],.1,q[1],4,.5,5,0x7fae58)}if(pa&&!lk&&!pa[2])sperrLinie(pa[0],pa[1],q[0],q[1],3.4);pa=[q[0],q[1],lk]});
  for(let i=0;i<s.length;i+=2)if(!luecke(s[i])){const q=s[i];for(let k=0;k<3;k++)blumeI(q[0]+3+k*.8,q[1]+(k-1)*1.3,[3,1,5][k]);inst('blm',q[0]-3.4,.5,q[1],.5,.35,.5,0x6f9a52)}}
function ort25(){const b=zone('Deich'),bx=b.x,bz=b.z;ast(b);deichBauen();
  const sw=person(bx-5,bz-3,.5,0x2f6a3a,0x5a4a3a,0x6b4626,'kurz',1.35);hutAuf(sw,0x5a3a22,1.1);kreis(bx-5,bz-3,.5);const st=grp(bx-4.4,0,bz-2.4);cyl(.05,2.4,0x6a4220,0,1.2,0,st);const h=new THREE.Mesh(new THREE.TorusGeometry(.35,.05,5,10,Math.PI*1.3),mat(0x6a4220));h.position.set(.2,2.4,0);st.add(h);
  tier(hundM,bx-7,bz-1,bx-9,bz+3,1.1,.5);
  const P1=pendel(spl([[bx-12,bz-24],[bx-8,bz-12],[bx-12,bz+2],[bx-8,bz+14]],2.5),1.4);for(let i=0;i<9;i++)streif(i%3===2?lamm:schaf,P1,.45+(i%4)*.1,i*P1.L/9,1.15);
  const P2=pendel(spl([[bx-16,bz-18],[bx-14,bz-4],[bx-16,bz+10]],2.5),2.2);for(let i=0;i<5;i++)streif(i%2?lamm:schaf,P2,.4,i*P2.L/5,1.15);
  for(let i=0;i<5;i++){const x=bx-22+i*3.2,z=bz+8+(i%2)*3;const s=schaf(scene);s.position.set(x,0,z);s.rotation.y=nr()*6;s.scale.setScalar(1.15);lebendig.push({o:s,ph:i*1.6});kreis(x,z,.8)}
  (function(){const g=grp(bx-18,0,bz);box(5,2.4,3,0x8a5a32,0,1.2,0,g,true);const r=box(5.6,.15,2,0x3a3a42,0,2.7,-.7,g);r.rotation.x=.4;const r2=box(5.6,.15,2,0x3a3a42,0,2.7,.7,g);r2.rotation.x=-.4;[-1.6,1.6].forEach(x=>cyl(.5,.2,0x2a2a2a,x,.5,1.6,g).rotation.x=Math.PI/2);box(1,1.4,.1,0xe8d8b0,-1,1.1,1.55,g);sperrKasten(bx-18,bz,5.2,3.2,0);box(1.4,.1,.1,0x6a4220,3.4,.9,0,g)})();
    holzstapel(bx-14,bz+4,.4);trog(bx-10,bz+9,0.2,0x6ec0ea);ballen(bx-12,bz+13,.3)}
/* ---------- 26. Windpark ---------- */
function ort26(){const b=zone('Windpark'),bx=b.x,bz=b.z;ast(b,4);
  [[96,-124,0,.9],[121,-122,.2,.8],[144,-126,-.2,.95],[104,-140,.1,.85],[130,-146,-.1,.9],[112,-150,0,.8],[148,-146,.2,.85]].forEach(t=>windrad(t[0],t[1],1,t[2],t[3]));
  (function(){const g=grp(bx+18,0,bz+12);box(4,2.6,3,0xc8c0b8,0,1.3,0,g,true);box(4.4,.3,3.4,0x6a6a70,0,2.8,0,g);box(1,1.8,.1,0x4a5a6a,.8,1,1.55,g);sperrKasten(bx+18,bz+12,4.2,3.2,0)})();
  for(let i=0;i<5;i++){const x=bx-14+i*7,z=bz-23+(i%2)*2;const s=schaf(scene);s.position.set(x,0,z);s.rotation.y=nr()*6;s.scale.setScalar(1.15);lebendig.push({o:s,ph:i*1.7});kreis(x,z,.8)}
  fig(bx-3,bz+6,2.4,0xf2c230,0x3a4a6a,0x6b4626,'kurz',1.3);fig(bx-1,bz+8,3.6,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);for(let i=0;i<30;i++){const a=nr()*6.28,r=Math.sqrt(nr())*24;heide(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.9,1.2)}}
/* ---------- 27. Energiehaus ---------- */
function ort27(){const b=zone('Energiehaus'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,10,0xd8d0c0,.09);
  (function(){const g=stall(bx-1,bz-4,9,5.4,3.2,0xf6f6f2,0x5a7a9a,0);solar(g,-2.2,4.45,1.35,3.4,2.2,.62);solar(g,2.4,4.45,1.35,3.4,2.2,.62);sph(.5,0xffd45e,0,2.7,2.85,g,1,1,.3);for(let i=0;i<8;i++)box(.07,.7,.05,0xffd45e,Math.sin(i*Math.PI/4)*.8,2.7+Math.cos(i*Math.PI/4)*.8,2.85,g).rotation.z=-i*Math.PI/4;box(1.4,.9,.06,0xcfeaf5,-3,1.9,2.84,g);box(1.4,.9,.06,0xcfeaf5,3,1.9,2.84,g)})();
  windrad(bx+8,bz-6,.45,.4,2);(function(){const g=grp(bx-9,0,bz-1);const w=grp(0,2,0,g);const rd=new THREE.Mesh(new THREE.TorusGeometry(1.8,.14,6,16),mat(0x6a4220));w.add(rd);for(let i=0;i<8;i++){box(.16,3.4,.1,0x6a4220,0,0,0,w).rotation.z=i*Math.PI/8;box(.5,.14,.7,0x9a6a3a,Math.cos(i*Math.PI/4)*1.8,Math.sin(i*Math.PI/4)*1.8,0,w).rotation.z=i*Math.PI/4}vm(w);bewegt(w,t=>{w.rotation.z=-t*.6});[-1,1].forEach(s=>cyl(.15,2.8,0x6a4220,0,1.4,s*.6,g,true));box(3,.4,1.1,0x6ec0ea,-.8,.2,2.6,g);box(5,.14,1,0x6a4220,2,3.4,0,g);sperrKasten(bx-9,bz-1,.8,3,0)})();
  (function(){const g=grp(bx+6,0,bz+3);box(.7,1.6,.5,0x2fa56a,0,.8,0,g,true);box(.5,.5,.06,0x1a1a1e,0,1.1,.28,g);sph(.1,0xffd45e,0,1.5,.3,g);cyl(.04,1.2,0x2a2a2a,.5,.6,.2,g);kreis(bx+6,bz+3,.5)})();
  (function(){const g=grp(bx+8,0,bz+7);g.rotation.y=2.6;box(3.4,.8,1.6,0x3b8fc4,0,.7,0,g,true);box(1.8,.7,1.4,0x9fd0e8,-.2,1.4,0,g);[-1,1].forEach(s=>[-1,1].forEach(q=>cyl(.38,.3,0x2a2a2a,s*1.1,.38,q*.8,g).rotation.x=Math.PI/2));kreis(bx+8,bz+7,1.5)})();
  fahrrad(bx-4,bz+8,.5,0x4caf6a);fahrrad(bx-3.2,bz+9,.2,0xffd45e);fig(bx+3,bz+6,3.6,0x2fa56a,0x4a4a5a,0xe8c24a,'zoepfe',1.15);fig(bx-6,bz+5,1.2,0xe0605a,0x3b6fc4,0x2a1d14,'cap',1.2)}
/* ---------- 28. Fischerdorf mit Reetdachhäusern ---------- */
function ort28(){const b=zone('Fischerdorf'),bx=b.x,bz=b.z;ast(b);const kk=Math.PI;
  const H=[[-14,-10,7,5,3,0xf6f6f2,0],[-3,-12,8,5.4,3.2,0xc0583a,0],[9,-10,7,5,3,0xf2ead8,0],[-12,6,6.6,4.8,2.8,0xe8d8b0,kk],[2,8,7.4,5,3,0xb8643a,kk],[13,5,6.4,4.6,2.8,0xf6f6f2,kk]];
  H.forEach((h,i)=>{reetHaus(bx+h[0],bz+h[1],h[2],h[3],h[4],h[5],h[6],i%2===0)});
  hecke(bx-18,bz-15,bx-10,bz-15,null,0);hecke(bx-18,bz-15,bx-18,bz-4,null,1);hecke(bx+3,bz-16,bx+14,bz-16,null,2);hecke(bx+14,bz-16,bx+14,bz-4,null,0);hecke(bx-18,bz+11,bx-6,bz+11,[bx-12,bz+11,2],1);hecke(bx+8,bz+10,bx+19,bz+10,[bx+13,bz+10,2],2);
  [[-9,-5,1],[-4,-5,2],[5,-6,0],[13,-5,1],[-6,3,2],[5,3,0],[18,2,1]].forEach(p=>{for(let k=0;k<4;k++){inst('cyl',bx+p[0]+k*.3,.9,bz+p[1],.05,1.8,.05,0x3f9a46);inst('blm',bx+p[0]+k*.3,1.9,bz+p[1],.2,.18,.2,[0xe0605a,0xf47ab0,0xf6f6f2][(p[2]+k)%3])}});
  netz(bx-1,bz+1,.3,1.6);fischkiste(bx+7,bz-2,.4,0xa8b8bc);fahrrad(bx-7,bz-1,1.4,0x3b6fc4);fahrrad(bx+10,bz+1,.4,0xe0302a);(function(){const g=grp(bx+17,0,bz-6);g.rotation.y=.6;const k=ruder(g,0x3b8fc4);k.position.y=.5;box(3,.3,1.6,0x6a4220,0,.2,0,g);sperrKasten(bx+17,bz-6,3.6,2,.6)})();
  (function(){const g=grp(bx,0,bz+1);for(let k=0;k<3;k++)cyl(.1,2.6,0x6a4220,-2+k*2,1.3,0,g,true);box(4.2,.05,.05,0xe8e4da,0,2.3,0,g);for(let k=0;k<5;k++)box(.7,.05,.9,0x8aa8b8,-1.8+k*.9,2.2,0,g);kreis(bx-2,bz+1,.2);kreis(bx+2,bz+1,.2)})();
  fig(bx-5,bz-1,1.4,0xf2c230,0x3a4a6a,0xb0b0b0,'kurz',1.35);fig(bx+1,bz+4,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.15);fig(bx+6,bz+2.4,-1,0x4caf6a,0x4a4a5a,0x2a1d14,'kurz',1.3);bankW(bx-1,bz-4.6,0);baum(bx+17,bz+14,5,1.1,0x6aa83a);baum(bx-17,bz+14,5,1.1,0x6aa83a);moeweAm(bx-14,5.25,bz-10,0);moeweAm(bx+9,5.25,bz-10,1)}
/* ---------- 29. Dorfladen mit Bäckerei ---------- */
function ort29(){const b=zone('Dorfladen'),bx=b.x,bz=b.z;ast(b);
  (function(){const g=stall(bx-4,bz-4,7,5,3,0xf2d878,0x5a3a2a,0);markise(g,7.4,2.7,3,0x3b8fc4,0xffffff,7);box(2.6,.9,.06,0xcfeaf5,-2,1.6,2.54,g)})();
  (function(){const g=stall(bx+5,bz-4,6.4,5,3,0xb8643a,0x4a4a54,0);markise(g,6.8,2.7,3,0xe0605a,0xf6f6f2,6);for(let i=0;i<2;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(.5,.12,6,12),mat(0xc8883a));t.position.set(-1.4+i*0,4.9,2.7);g.add(t)}sph(.6,0xc8883a,1.6,4.8,2.7,g,1.7,.8,.5);box(.8,3,.8,0x8a4a2a,-2,5.4,-1,g);rauch(g,-2,6.9,-1)})();
  [[-9,1],[-6.5,1.6],[-2,2],[2,2],[7,1.4],[10,.6]].forEach((p,i)=>{if(i<3){box(1.4,.5,.9,0xa8743f,bx+p[0],.25,bz+p[1],scene,true);for(let k=0;k<5;k++)sph(.2,[0xe0302a,0xf59e3f,0x6aa83a,0xffd45e,0xe0302a][k],bx+p[0]-.5+k*.25,.6,bz+p[1]+(k%2-.5)*.3,scene);kreis(bx+p[0],bz+p[1],.8)}else if(i<5){tisch(bx+p[0],bz+p[1],0);stuhl(bx+p[0]+1.1,bz+p[1],-1.57,0xe0605a);stuhl(bx+p[0]-1.1,bz+p[1],1.57,0xe0605a)}else kuebel(bx+p[0],bz+p[1])});
  fig(bx+1,bz+4,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.15);fig(bx-8,bz+3,.6,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.3);fig(bx+8,bz+3.4,-.4,0xf6f6f2,0x3a3a4a,0x6b4626,'kurz',1.35);fahrrad(bx-1,bz+5,1.5,0x4caf6a);fahrrad(bx+4,bz+6,.3,0xf59e3f);korb(bx-9,bz+4,0xe8c890);laterne(bx-11,bz+6)}
/* ---------- 30. Windmühle ---------- */
function ort30(){const b=zone('Windmühle'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,9.5,0xd8d0c0,.09);
  const g=grp(bx,0,bz-3);cyl(4.2,3,0x8a5a32,0,1.5,0,g,true);cyl(3.7,3.4,0xc0583a,0,4.4,0,g,true);cyl(3.2,3.4,0xc0583a,0,7.7,0,g);cyl(2.7,3,0xc0583a,0,10.9,0,g);const kap=sph(2.8,0x4a3a2a,0,12.5,0,g,1,.9,1);box(7.6,.35,7.6,0x6a4a2a,0,3.1,0,g);box(1.4,2.4,.15,0x5a3a20,0,1.2,4.25,g);box(1.2,1,.1,0xcfeaf5,0,6.4,3.28,g);box(1,1,.1,0xcfeaf5,0,9.6,2.78,g);
  const gal=new THREE.Mesh(new THREE.TorusGeometry(4.4,.1,5,24),mat(0x5a3a20));gal.rotation.x=Math.PI/2;gal.position.y=3.8;g.add(gal);
  const fl=grp(0,12,3.2,g);for(let i=0;i<4;i++){const a=grp(0,0,0,fl);a.rotation.z=i*Math.PI/2;box(.3,10.5,.12,0x6a4a2a,0,5.5,0,a);for(let k=0;k<5;k++)box(1.6,.9,.08,0xf0e8d0,.9+(k%2?0:.1),2.2+k*1.7,.04,a);box(.14,.14,.14,0x4a3a2a,0,0,0,a)}vm(fl);bewegt(fl,t=>{fl.rotation.z=t*.35});box(.5,.5,.5,0x3a3a3e,0,12,2.8,g);
  sperrKasten(bx,bz-3,8,8,0);[[-6,3],[-4,5]].forEach(p=>sack(bx+p[0],bz+p[1],0xe8dcc0,1.2));box(2.2,.9,1.5,0x8a5a32,bx+6,.7,bz+3,scene,true);sperrKasten(bx+6,bz+3,2.4,1.7,0);[-1,1].forEach(s=>cyl(.4,.2,0x2a2a2a,bx+6+s*.7,.4,bz+3.8,scene).rotation.x=Math.PI/2);
  const m=person(bx+2,bz+3,3.4,0xf6f6f2,0x6a5a4a,0xb0b0b0,'kurz',1.35);hutAuf(m,0xf6f6f2);kreis(bx+2,bz+3,.5);fig(bx-1,bz+6,0,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);for(let i=0;i<14;i++){const a=nr()*6.28,r=5+nr()*7;inst('cyl',bx+Math.cos(a)*r,.5,bz+Math.sin(a)*r,.03,1,.03,0x3f9a46);inst('blm',bx+Math.cos(a)*r,1.05,bz+Math.sin(a)*r,.13,.1,.13,[0xf6c840,0xe0605a][i%2])}}
/* ---------- 31. Leuchtturm auf dem Felsen ---------- */
function ort31(){const b=zone('Leuchtturm'),bx=b.x,bz=b.z;ast(b);
  [[0,-1,5.2],[-5,1,3.4],[5,1.5,3.2],[2,4.5,2.4],[-4,-5,2.6],[6,-4,2.8],[-7,5,2]].forEach((r,i)=>{const s=r[2];sph(s,[0x8a8f94,0x7a8086,0x9a9fa4][i%3],bx+r[0],0,bz+r[1],scene,1.3,.5,1.15).castShadow=true;kreis(bx+r[0],bz+r[1],s*1.05)});
  for(let i=0;i<7;i++){const a=i*.9+.4,r=4+(i%3);inst('sph',bx+Math.cos(a)*r*1.2,2.4+(i%2),bz+Math.sin(a)*r,.9,.35,.8,0x6f9a52)}
  const g=grp(bx,2.6,bz-1);const R=[[2.3,1.9],[2.15,2.4],[2,2.4],[1.85,2.4],[1.7,2.4],[1.55,2.4]];let y=0;R.forEach((r,i)=>{cyl(r[0],r[1],i%2?0xf6f6f2:0xd8302a,0,y+r[1]/2,0,g,true);y+=r[1]});
  box(.9,1.8,.1,0x5a3a20,0,1.2,2.3,g);box(.8,.9,.1,0xcfeaf5,0,6.4,2.06,g);box(.8,.9,.1,0xcfeaf5,0,9.4,1.76,g);cyl(2.4,.3,0x3a3a3e,0,y+.15,0,g);const gl=new THREE.Mesh(gCyl,GLAS||(GLAS=new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.28,depthWrite:false})));gl.scale.set(1.5,2,1.5);gl.position.set(0,y+1.3,0);g.add(gl);
  for(let i=0;i<8;i++){const a=i*.785;cyl(.07,2,0x3a3a3e,Math.cos(a)*1.5,y+1.3,Math.sin(a)*1.5,g)}cone(1.9,1.4,0xd8302a,0,y+3,0,g);cyl(.06,.9,0x3a3a3e,0,y+4.1,0,g);const rl=new THREE.Mesh(new THREE.TorusGeometry(2.45,.07,5,24),mat(0x3a3a3e));rl.rotation.x=Math.PI/2;rl.position.y=y+.6;g.add(rl);
  const la=sph(.4,0xfff0a0,0,y+1.3,0,g);la.material=new THREE.MeshBasicMaterial({color:0xfff6c0});const bm=grp(0,y+1.3,0,g);const cn=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:0xfff6c0,transparent:true,opacity:.35,depthWrite:false}));cn.scale.set(2.4,16,2.4);cn.rotation.z=Math.PI/2;cn.position.x=8;bm.add(cn);bm.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{bm.rotation.y=t*1.1}}},ph:0});kreis(bx,bz-1,2.6);
  const h=stall(bx+7.5,bz+7,6.4,4.4,2.6,0xf6f6f2,0xd8302a,0);
  fahne(bx-6,bz+8,8,0xd8302a,0xffffff);const w=person(bx+1.4,bz+5.6,0,0x1f4e79,0x3a3a4a,0xb0b0b0,'kurz',1.35);hutAuf(w,0xf6f6f2);kreis(bx+1.4,bz+5.6,.5);moeweAm(bx-5,1.75,bz+1,.6,1.8);moeweAm(bx+5,1.65,bz+1.5,2.4,1.8);moeweAm(bx+7.5,4.5,bz+7,1.4,1.5)}
/* ---------- 32. Klippenpfad mit Möwenfelsen ---------- */
function ort32(){const b=zone('Klippenpfad'),bx=b.x,bz=b.z;ast(b);
  [[-8,-6,4.4],[-2,-9,5],[6,-7,4],[11,-3,3.4],[-11,0,3.2],[0,-3,3]].forEach((r,i)=>{const s=r[2];const f=sph(s,[0x8a8f94,0x7a8086,0x9a9fa4][i%3],bx+r[0],s*.5,bz+r[1],scene,1.1,1.1,1);f.castShadow=true;kreis(bx+r[0],bz+r[1],s*1.0);sph(s*.6,0xaab0b4,bx+r[0]+s*.2,s*1.0,bz+r[1],scene,1,.6,1)});
  const P=spl([[bx-14,bz+11],[bx-6,bz+7],[bx+2,bz+5],[bx+9,bz+2],[bx+13,bz-4]],2);weg(P,2.4,0xb09a74);P.forEach((q,i)=>{if(i%4===0){cyl(.07,1.1,0x6a4220,q[0],.55,q[1]-1.8,scene);box(.08,.08,2,0x6a4220,q[0],.9,q[1]-1.8,scene)}});for(let i=0;i<P.length-1;i++)sperrLinie(P[i][0],P[i][1]-1.9,P[i+1][0],P[i+1][1]-1.9,.1);
  for(let i=0;i<14;i++){const r=[[-8,-6,4.4],[-2,-9,5],[6,-7,4],[11,-3,3.4],[-11,0,3.2],[0,-3,3]][i%6];const a=i*1.3,s=r[2];moeweAm(bx+r[0]+Math.cos(a)*s*.5,s*1.45+.1,bz+r[1]+Math.sin(a)*s*.5,a,1.4)}
  for(let i=0;i<30;i++){const a=nr()*6.28,r=4+nr()*10,x=bx+Math.cos(a)*r,z=bz+Math.sin(a)*r;inst('sph',x,.15,z,.4,.14,.4,0x6f9a52);if(i%2){inst('cyl',x,.35,z,.03,.6,.03,0x4a8a3a);inst('blm',x,.7,z,.14,.1,.14,0xf47ab0)}}
  bankW(bx-2,bz+9,Math.PI);fernrohr(bx+7,bz+6,-1.2);fig(bx-9,bz+10,.5,0xf59e3f,0x3b6fc4,0x6b4626,'cap',1.25);fig(bx-3,bz+8,-.3,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1)}
/* ---------- 33. Höhle (Tunnel zum Durchgehen) ---------- */
function ort33(){const b=zone('Höhle'),bx=b.x,bz=b.z;ast(b);const F=[0x7a8086,0x8a8f94,0x6a7076];
  [-1,1].forEach((s,k)=>{const x=bx+s*4.3;sph(1,F[k],x,1.8,bz,scene,2.3,3.6,7.4).castShadow=true;sph(1,F[k+1],x+s*2.2,1.2,bz+2,scene,2.2,2.4,4.2);sperrKasten(x+s*.4,bz,4.0,14.6,0)});
  box(8.6,1.2,11,0x7a8086,bx,4.1,bz,scene,true);sph(1,0x8a8f94,bx,4.4,bz,scene,4.6,1.6,6);
  for(let i=0;i<8;i++)cone(.18,.9,0x9a9fa4,bx-1.4+(i%4)*.95,3.4,bz-3+(i>3?3:0)+i%2,scene).rotation.x=Math.PI;
  [[-1.2,-4],[1.2,3]].forEach(p=>{const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xffe9a0}));l.position.set(bx+p[0],2.6,bz+p[1]);l.scale.setScalar(.22);scene.add(l)});
  (function(){const g=grp(bx-.2,0,bz+.5);box(1.1,.6,.7,0x8a5a32,0,.3,0,g,true);const lid=box(1.1,.2,.7,0x6a4220,0,.7,0,g);lid.rotation.x=-.4;for(let i=0;i<5;i++)sph(.12,0xf2c230,-.3+i*.15,.65,.1+(i%2)*.1,g,1,.4,1);kreis(bx-.2,bz+.5,.45)})();
  for(let i=0;i<5;i++)inst('sph',bx-1.2+nr()*2.4,.1,bz-4+nr()*8,.25,.1,.25,0x5a6066);fig(bx+7,bz+8,3.4,0xf59e3f,0x4a4a5a,0x6b4626,'cap',1.2);fig(bx-8,bz+9,.8,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);
  for(let i=0;i<5;i++){const a=nr()*3.14,r=8+nr()*3;fels(bx+Math.cos(a)*r,bz+Math.sin(a)*r*.8+2,1+nr()*.8)}}
/* ---------- 34. Wrack am Strand ---------- */
function ort34(){const b=zone('Wrack'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,9.5);
  const g=grp(bx,0,bz-1);g.rotation.y=.5;g.rotation.z=.12;const dk2=0x6a4a2a;box(10,.5,3.4,dk2,0,.4,0,g,true);for(let i=0;i<8;i++){const x=-4+i*1.2;const r=box(.3,2.6-Math.abs(i-4)*.12,.2,0x7a5230,x,1.6,1.6,g);box(.3,2.6-Math.abs(i-4)*.12,.2,0x7a5230,x,1.6,-1.6,g);r.rotation.z=.12*(i-4)*.25;if(i%2===0)box(.3,.12,3.4,0x7a5230,x,2.8,0,g)}
  box(.25,.3,3.2,0x5a3a20,-5,1.2,0,g);const m=cyl(.2,5,0x6a4a2a,1,3.2,0,g,true);m.rotation.z=.5;box(.14,.14,3,0x6a4a2a,1.8,4.1,0,g).rotation.z=.4;cone(.5,.7,0x4a6a3a,-3,.9,1.8,g);sph(.5,0x4a6a3a,2.4,.8,-1.9,g,1.6,.5,.8);sph(.4,0x4a6a3a,-2,.7,-1.7,g,1.5,.5,.8);sperrKasten(bx,bz-1,10.4,4,.5);
  for(let i=0;i<6;i++)inst('sph',bx-3+nr()*6,.08,bz+3+nr()*5,.4,.08,.3,0x3f6a3a);muschel(bx+4,bz+5,1.4,0xf6eee0,1);seestern(bx-5,bz+4,1.1,0xe8662a);fig(bx-1,bz+5,Math.PI,0xf59e3f,0x3b6fc4,0x2a1d14,'kurz',1.2);for(let i=0;i<2;i++){const k=krabbe(scene);k.position.set(bx-6+i*10,.02,bz+7);k.scale.setScalar(2);lebendig.push({o:k,ph:i*3})}moeweAm(bx+2,.1,bz+6,1.6,1.6)}
/* ---------- 35. Piratenspielplatz ---------- */
function ort35(){const b=zone('Piratenspielplatz'),bx=b.x,bz=b.z;ast(b);sandFl(bx,bz,12);
  (function(){const g=grp(bx-1,0,bz-3);const B=grp(0,.6,0,g);rumpf(B,12,4.2,2.2,0x6a4a2a,0x9a7a4a,0xb06a2a);box(1.4,1.4,.1,0x5a3a20,-3,1.6,2.1,B);cyl(.18,8,0x6a4a2a,.5,4.6,0,B,true);tri([.7,8,0],[.7,2.4,0],[4,2.6,0],0xf6f6f2,B);tri([.3,7.6,0],[.3,3,0],[-3,3.4,0],0xf0e2c0,B);tri([.5,8.6,0],[.5,8,0],[2,8.3,0],0xe0302a,B);box(1,.3,1,0x5a3a20,.5,6,0,B);const w=grp(-4,2.2,0,B);const wr=new THREE.Mesh(new THREE.TorusGeometry(.6,.07,5,16),mat(0x8a5a32));w.add(wr);for(let i=0;i<4;i++)box(.07,1.3,.07,0x8a5a32,0,0,0,w).rotation.z=i*Math.PI/4;vm(B);sperrKasten(bx-1,bz-3,12,4.4,0);})();
  (function(){const g=grp(bx+8,0,bz-5);[-2,2].forEach(s=>cyl(.12,3.4,0x6a4220,s,1.7,0,g,true));for(let i=0;i<7;i++)box(4,.05,.05,0x8a6a3a,0,.4+i*.45,0,g);for(let i=0;i<9;i++)box(.05,3,.05,0x8a6a3a,-1.8+i*.45,1.6,0,g);sperrKasten(bx+8,bz-5,4.6,.6,0)})();
  (function(){const g=grp(bx-7,0,bz+5);box(1.4,.8,.9,0x8a5a32,0,.4,0,g,true);const lid=box(1.4,.25,.9,0x6a4220,0,.9,0,g);lid.rotation.x=-.5;for(let i=0;i<7;i++)sph(.16,0xf2c230,-.5+i*.15,.7+(i%2)*.1,.1,g,1,.4,1);box(1.5,.1,.1,0xb88a2a,0,.55,.45,g);kreis(bx-7,bz+5,.9)})();
  rutsche(bx+7,bz+5,3.14,0x3b8fc4);schaukel(bx-9,bz-6,.2);hangmatte2(bx+3,bz+9);[[0,6],[4,7],[-3,8]].forEach((p,i)=>{fig(bx+p[0],bz+p[1],i*1.7,[0xe0605a,0x3b8fc4,0x4caf6a][i],0x3a4a6a,[0xe8c24a,0x2a1d14,0x6b4626][i],['zoepfe','cap','kurz'][i],1)});sitz(bx-1.6,8.4,bz-3,.4,0,1.8);eimer(bx+10,bz+8,0xe0302a,0xe2cc90)}
function hangmatte2(x,z){[-2.6,2.6].forEach(d=>{cyl(.14,3,0x6a4220,x+d,1.5,z,scene,true);kreis(x+d,z,.3)});const g=grp(x,0,z);for(let k=0;k<7;k++){const u=-2.2+k*.73,y=2.5-.7*(1-(u/2.4)*(u/2.4));box(.8,.07,1,k%2?0xfff8e6:0xe0605a,u,y,0,g).rotation.z=Math.atan(.6*u/2.4)}}
/* ---------- 36. Inselmuseum (offene Halle) ---------- */
function ort36(){const b=zone('Inselmuseum'),bx=b.x,bz=b.z;ast(b);bodenFl(bx,bz-2,18,10,0xd8cfb8,.12);
  const g=grp(bx,0,bz-2);[[-8,-4],[8,-4],[-8,4],[8,4],[-3,4],[3,4],[0,-4.4]].forEach((p,i)=>{if(i<6){cyl(.3,4.4,0xe8e4da,p[0],2.2,p[1],g,true);kreis(bx+p[0],bz-2+p[1],.4)}});[-8,8].forEach(x=>{box(.4,.4,10,0xe8e4da,x,4.4,0,g)});box(18,.4,.4,0xe8e4da,0,4.4,-4,g);box(18,.4,.4,0xe8e4da,0,4.4,4,g);
  [-1,1].forEach(s=>{const r=box(19,.3,6,0x3a5a7a,0,5.2,s*2.6,g);r.rotation.x=s*-.3});box(19,.3,.5,0x3a5a7a,0,5.8,0,g);box(18,4.4,.3,0xf2ead8,0,2.4,-4.6,g,true);[-1,1].forEach(s=>box(.3,4.4,3,0xf2ead8,s*8.8,2.4,-2.8,g));
  for(let i=0;i<4;i++)box(2.2,2.2,.06,0xcfeaf5,-6.4+i*4.2,2.6,-4.4,g);sperrKasten(bx,bz-6.6,18,.6,0);[-8.8,8.8].forEach(x=>sperrKasten(bx+x,bz-4.6,.4,3.2,0));
  /* Schiffsmodell, Anker, Leuchtturm-Linse, Taucherhelm, Seekarten, Boot */
  (function(){const m=grp(bx-5,0,bz-3);box(2.4,.8,1.2,0x6a4a2a,0,.4,0,m,true);const S=grp(0,1.1,0,m);rumpf(S,3.4,1,.6,0x6a4a2a,0xb08850,0xe0302a);cyl(.04,2.2,0xe8e4da,.2,1.3,0,S);tri([.24,2.3,0],[.24,.7,0],[1.1,.8,0],0xf6f6f2,S);tri([-.04,2.1,0],[-.04,.7,0],[-.9,.8,0],0xf6f6f2,S);vm(S);sperrKasten(bx-5,bz-3,2.6,1.4,0);
    const a=grp(bx+7,0,bz-5);box(.2,2.2,.2,0x2a2a2e,0,1.1,0,a);box(1.4,.2,.2,0x2a2a2e,0,1.8,0,a);const ar=new THREE.Mesh(new THREE.TorusGeometry(.7,.1,6,12,Math.PI),mat(0x2a2a2e));ar.rotation.z=Math.PI;ar.position.y=.8;a.add(ar);kreis(bx+7,bz-5,.8);
    const l=grp(bx+2,0,bz-4);cyl(.7,1.2,0x6a4a2a,0,.6,0,l,true);const fl=new THREE.Mesh(gCyl,GLAS||(GLAS=new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.28,depthWrite:false})));fl.scale.set(.6,1.5,.6);fl.position.y=1.9;l.add(fl);for(let i=0;i<6;i++)sph(.55,0xf6f0c0,0,1.2+i*.28,0,l,1,.14,1);kreis(bx+2,bz-4,.8);
    const h=grp(bx+5,0,bz+2);cyl(.5,.3,0x6a6a70,0,.5,0,h,true);sph(.55,0xb08a4a,0,1.2,0,h);box(.5,.4,.1,0xcfeaf5,0,1.3,.5,h);for(let i=0;i<3;i++)sph(.1,0xb08a4a,.4+i*.04,1.2+i*.2,.2,h);cyl(.6,.8,0x6a4a2a,0,.4,0,h);kreis(bx+5,bz+2,.7);
    const t=grp(bx-1,0,bz-1);box(3,.2,1.6,0x8a5a32,0,.95,0,t,true);[[-1.3,-.6],[1.3,-.6],[-1.3,.6],[1.3,.6]].forEach(p=>cyl(.08,.9,0x6a4220,p[0],.45,p[1],t));box(2.6,.04,1.3,0xf0e2c0,0,1.07,0,t);box(.9,.04,.04,0x3b6fc4,-.4,1.1,0,t);box(.04,.04,.9,0xe0302a,.5,1.1,.1,t);sph(.2,0xe8c24a,.9,1.2,.4,t,1,.4,1);sperrKasten(bx-1,bz-1,3.2,1.8,0);
    const bt=grp(bx+1,0,bz+4.4);rumpf(bt,4.6,1.6,.8,0xe0605a,0xc9a46a,0xf6f6f2);box(.2,.1,1.3,0x8a5a32,.2,.55,0,bt);vm(bt);bt.position.y=.4;[-1.4,1.4].forEach(s=>box(.2,.5,1.4,0x6a4a2a,s,.25,0,bt));sperrKasten(bx+1,bz+4.4,5,1.8,0)})();
  fig(bx-3,bz+1,Math.PI,0x3a5a7a,0xf6f6f2,0xb0b0b0,'kurz',1.35);fig(bx+8,bz+2,2.6,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(bx-8,bz+4,.5,0xf59e3f,0x4a4a5a,0x2a1d14,'cap',1.2);bankW(bx+4,bz+5,0);fahne(bx-11,bz-6,8,0x3a5a7a,0xffffff)}
/* ---------- 37. Kräutergarten und Streichelhof ---------- */
function ort37(){const b=zone('Kräutergarten'),bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,14.5,0xa8c872,.08);
  const KR=[[0x8a5ac8,0xa070d8,'Lavendel'],[0x7a9a6a,0xb0c8a0,'Salbei'],[0x4a9a4a,0x6ac06a,'Minze'],[0xf6f6f2,0xf2d030,'Kamille'],[0xf59e3f,0xffb040,'Ringelblume'],[0x6a8a4a,0x8aaa6a,'Thymian']];
  KR.forEach((k,i)=>{const x=bx-11+(i%3)*5.2,z=bz-8+Math.floor(i/3)*5;box(4,.5,3.4,0x8a5a32,x,.25,z,scene,true);box(3.6,.1,3,0x4a3220,x,.52,z,scene);sperrKasten(x,z,4.2,3.6,0);for(let q=0;q<14;q++){const px=x-1.5+(q%5)*.75,pz=z-1+Math.floor(q/5)*.9;inst('sph',px,.75,pz,.4,.28,.4,k[0]);inst('blm',px+.1,1.05,pz,.16,.12,.16,k[1])}});
  (function(){const g=grp(bx,0,bz+2);cyl(.7,.4,0xb0b0b8,0,.2,0,g,true);cyl(.25,1.1,0xb0b0b8,0,.95,0,g);box(1.2,.1,.8,0xc8a85a,0,1.55,0,g).rotation.x=-.4;kreis(bx,bz+2,.8)})();
  const px=bx+8,pz=bz+4;zaunL(px,pz,6.2,26,b.gap+0,3.4,0x8a5a32);
  [[-2,-2,0xf6f6f2],[2,1,0xe0b878],[-1,2.4,0x4a3a2a],[2.4,-2.4,0xf6f6f2]].forEach((p,i)=>{const t=i<2?schaf(scene):hase0(scene);t.position.set(px+p[0],0,pz+p[1]);t.rotation.y=nr()*6;if(i<2)t.scale.setScalar(1.1);else t.scale.setScalar(1.4);lebendig.push({o:t,ph:i*1.5});kreis(px+p[0],pz+p[1],.7)});
  for(let i=0;i<3;i++){const z0=bz-6+i*2.4;const e=ente(scene);e.position.set(px-3+i,0,z0+9);e.rotation.y=nr()*6;e.scale.setScalar(1.3);lebendig.push({o:e,ph:i*2})}
  (function(){stall(bx+6,bz-9,6,4,2.6,0xb8643a,0xc4a862,0)})();ballen(bx+13,bz-7,.4);ballen(bx+14.4,bz-6,.2);trog(bx+10,bz+10,0,0x6ec0ea);
  fig(bx+5,bz+9,Math.PI,0xe0605a,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(bx+10.6,bz+7.6,.4,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.2);fig(bx-8,bz+7,-.4,0xf6f6f2,0x4a4a5a,0x6b4626,'kurz',1.3);bankW(bx-4,bz+9,0);kuebel(bx-13,bz+3)}
/* ---------- 38. Picknickplatz am Teich ---------- */
function ort38(){const b=zone('Picknickplatz'),bx=b.x,bz=b.z;ast(b);const tx=bx,tz=bz-1;
  teichBau(tx,tz,6.3,WASSER,-Math.PI/2,3.2);steg(tx,tz-8.6,tx,tz-3,2.4);schilfAm2(tx,tz,6.6,-1.57);
  const r=ruder(scene,0xe0605a);r.position.set(tx+3.5,0,tz+2.6);r.rotation.y=.4;wipp(r,0,1,1);
  const D=pendel(spl([[tx-4,tz-2],[tx,tz-4],[tx+4,tz-1],[tx+1,tz+2],[tx-3,tz+1]],1.5),.3);for(let i=0;i<3;i++)streif(ente,D,.8,i*D.L/3,1.4);
  const sw=ente(scene);sw.position.set(tx-1,.1,tz+1);sw.scale.setScalar(2.2);lebendig.push({o:sw,ph:1});
  [[-6,12,0xe0605a],[0,14,0x3b8fc4],[6,13,0xffd45e]].forEach((p,i)=>{box(2.4,.05,2.2,p[2],bx+p[0],.1,bz+p[1],scene).rotation.y=.2*i;box(.6,.4,.6,0x8a5a32,bx+p[0]+.4,.3,bz+p[1],scene,true);korb(bx+p[0]-.5,bz+p[1]-.2,0xe0302a);kreis(bx+p[0],bz+p[1],.5)});
  tisch(bx-10,bz+2,0);bankW(bx-10,bz+4,Math.PI);bankW(bx-10,bz,0);tisch(bx+11,bz+1,0);bankW(bx+11,bz+3,Math.PI);bankW(bx+11,bz-1,0);baum(bx-12,bz-8,5,1.5,0x6aa83a);baum(bx+13,bz-8,5,1.4,0x78b844);
  fig(bx-8,bz+8,.4,0xf59e3f,0x3b6fc4,0xe8c24a,'zoepfe',1.1);fig(bx-3,bz+12,3,0x4caf6a,0x4a4a5a,0x2a1d14,'cap',1.2);fig(bx+9,bz+9,2.4,0xe0605a,0x3a4a6a,0x6b4626,'kurz',1.3);const a1=fig(tx-8,tz+2,1.57,0x3b8fc4,0x4a4a5a,0xb5651d,'pferd',1.1);cyl(.025,3,0x6a4a2a,tx-7,1.6,tz+2,scene).rotation.z=-.9;
  for(let i=0;i<3;i++)libelle(tx+(i-1)*2,tz,3.4,1.3+i*.4,i*2,[0x2a5ac8,0x1a9a6a,0xc0302a][i])}
function schilfAm2(cx,cz,r,sk){sk=sk==null?1.57:sk;for(let i=0;i<30;i++){const a=i/30*6.28+nr()*.2;if(Math.abs(Math.atan2(Math.sin(a-sk),Math.cos(a-sk)))<.5)continue;const x=cx+Math.cos(a)*(r+.5),z=cz+Math.sin(a)*(r+.5);for(let k=0;k<3;k++){inst('cyl',x+k*.2,1.2,z+k*.15,.04,2.4+nr()*.8,.04,0x6f8a42);inst('sph',x+k*.2,2.5+k*.1,z+k*.15,.09,.28,.09,0x7a5a32)}}}
function etappe3b(){ort25();ort26();ort27();ort28();ort29();ort30();ort31();ort32();ort33();ort34();ort35();ort36();ort37();ort38()}
/* ==================== Etappe 4: Landschaft, Priele, Kleinteile ==================== */
const SGW=181,SGH=193,SG=new Uint8Array(SGW*SGH);
function sgMark(x,z,r){const i0=Math.max(0,Math.floor((x-r+180)/2)),i1=Math.min(SGW-1,Math.ceil((x+r+180)/2)),j0=Math.max(0,Math.floor((z-r+236)/2)),j1=Math.min(SGH-1,Math.ceil((z+r+236)/2));for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const cx=i*2-180,cz=j*2-236;if((cx-x)*(cx-x)+(cz-z)*(cz-z)<=r*r)SG[j*SGW+i]=1}}
function sgFrei(x,z){const i=Math.round((x+180)/2),j=Math.round((z+236)/2);return i>=0&&i<SGW&&j>=0&&j<SGH&&!SG[j*SGW+i]}
const TH={};function thFrei(x,z,d){const i=Math.floor(x/8),j=Math.floor(z/8);for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++){const l=TH[(i+a)+'|'+(j+c)];if(l)for(let k=0;k<l.length;k++){const q=l[k];if((q[0]-x)*(q[0]-x)+(q[1]-z)*(q[1]-z)<d*d)return false}}return true}
function thSet(x,z){const k=Math.floor(x/8)+'|'+Math.floor(z/8);(TH[k]=TH[k]||[]).push([x,z])}
function pip(P,x,z){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
function istLand(x,z){return pip(LANDP,x,z)&&pip(LANDP,x+2.5,z)&&pip(LANDP,x-2.5,z)&&pip(LANDP,x,z+2.5)&&pip(LANDP,x,z-2.5)}
const imWatt=(x,z)=>pip(WATTP,x,z);
const frei=(x,z)=>sgFrei(x,z)&&istLand(x,z)&&!imWatt(x,z);
function busch(x,z,s,k){s=s||1;inst('sph',x,.55*s,z,.9*s,.7*s,.9*s,k||0x5a8a3a);inst('sph',x+.5*s,.6*s,z+.3*s,.6*s,.5*s,.6*s,0x6aa04a);kreis(x,z,.8*s)}
function kiefer(x,z,s,kr){const alt=KREISE;KREISE=kr!==false;baum(x,z,nr()<.6?4:2,s);KREISE=alt;thSet(x,z)}
function zuf(fn,anz,pred,x0,x1,z0,z1){let k=0,t=0;x0=x0==null?GRENZE.x0+6:x0;x1=x1==null?GRENZE.x1-6:x1;z0=z0==null?TORZ+5:z0;z1=z1==null?GRENZE.z1-12:z1;while(k<anz&&t++<anz*14){const x=x0+nr()*(x1-x0),z=z0+nr()*(z1-z0);if(!frei(x,z)||(pred&&!pred(x,z)))continue;fn(x,z);k++}}
function weide(cx,cz,r,anz){scheibe(cx,cz,r,0xa8c872,.08);const road=SEITENWEGE.reduce((a,q)=>Math.abs(q-cz)<Math.abs(a-cz)?q:a,94);zaunL(cx,cz,r+.4,Math.round(r*3.2),road>cz?Math.PI/2:-Math.PI/2,3.6,0x8a5a32);const L=pendel(spl([[cx-r*.5,cz-r*.4],[cx+r*.4,cz-r*.5],[cx+r*.5,cz+r*.3],[cx-r*.2,cz+r*.5],[cx-r*.55,cz+r*.1]],2),.5);for(let i=0;i<anz;i++)streif(i%3===2?lamm:schaf,L,.35+(i%3)*.1,i*L.L/anz,1.15);trog(cx+r*.3,cz-r*.6,.3,0x6ec0ea);ballen(cx-r*.5,cz+r*.5,.4);sgMark(cx,cz,r+4)}
function feld(x0,x1,z0,z1,farbe,blm,hoch){for(let x=x0;x<=x1;x+=1.1)for(let z=z0;z<=z1;z+=1.5){inst('cyl',x+nr()*.3,hoch/2,z+nr()*.3,.07,hoch,.07,0x6aa04a);inst('blm',x+nr()*.3,hoch+.05,z+nr()*.3,.3,.22,.3,farbe)}sgMark((x0+x1)/2,(z0+z1)/2,Math.max(x1-x0,z1-z0)/2+3);}
function etappe4(){
  WEGE.forEach(s=>s.forEach(q=>sgMark(q[0],q[1],5.6)));EXTRAZONEN.forEach(e=>{if(e.name!=='Meer'&&e.name!=='Hafenbecken')sgMark(e.x,e.z,e.r+3)});sgMark(0,114,16);sgMark(FEST.x,FEST.z,26);for(let z=TORZ-30;z<TORZ+12;z+=2)sgMark(0,z,6);DEICH.forEach(q=>sgMark(q[0],q[1],9));
  /* Küstenstreifen: Dünen und Strandhafer im Westen, Seetang am Spülsaum */
  zuf((x,z)=>{duene(x,z,3+nr()*3,.7+nr()*1.1,3+nr()*3);},95,(x,z)=>x<-118&&z<95&&z>TORZ);
  zuf((x,z)=>{const rx=4+nr()*3,ry=1.5+nr()*.5;duene(x,z,rx,ry,rx*.9);kreis(x,z,rx*.55);thSet(x,z);sgMark(x,z,rx+1)},14,(x,z)=>x<-122&&z<85&&z>TORZ&&thFrei(x,z,9));
  zuf((x,z)=>hafer(x,z,.9+nr()*.5),420,(x,z)=>x<-112&&z>TORZ&&z<100);zuf((x,z)=>sanddorn(x,z,.9+nr()*.4),22,(x,z)=>x<-116&&z>TORZ&&z<90);
  const KI=inw(K0,1.9);for(let i=0;i<K0.length;i+=2){const q2=KI[i];if(i%3===0)inst('box',q2[0],.06,q2[1],1.6,.05,.5,0x2f4a28,i);else if(i%5===1)inst('sph',q2[0],.1,q2[1],.5,.1,.35,0x3a5a2a)}
  /* Heide, Wiesen, Blumen, Büsche */
  for(let c=0;c<26;c++){const cx=-100+nr()*160,cz=-165+nr()*215;if(!frei(cx,cz)||x_in_zone(cx,cz))continue;for(let k=0;k<18;k++){const a=nr()*6.28,r=Math.sqrt(nr())*7;if(frei(cx+Math.cos(a)*r,cz+Math.sin(a)*r))heide(cx+Math.cos(a)*r,cz+Math.sin(a)*r*.8,1+nr()*.6)}}
  zuf((x,z)=>gras(x,z,.5+nr()*.6),800);zuf((x,z)=>blumeI(x,z),380);zuf((x,z)=>{if(thFrei(x,z,2.4))busch(x,z,.9+nr()*.5,[0x4a8a3a,0x3f7a34,0x5a9a46][Math.floor(nr()*3)])},110,null,-110,165);
  zuf((x,z)=>{inst('sph',x,.02,z,3+nr()*3,.04,2.5+nr()*2,[0x8dbb62,0x7aa84e,0x9ac46c][Math.floor(nr()*3)])},70);
  zuf((x,z)=>{if(thFrei(x,z,3)){fels(x,z,.9+nr()*1.1);thSet(x,z)}},26,(x,z)=>x>-130);
  /* Kiefern: Waldstücke und Rand */
  [[-30,-175,60,10],[-100,-60,30,6],[70,-60,20,7],[-70,100,26,5]].forEach(c=>{let n=0,t=0;while(n<c[3]*3&&t++<400){const x=c[0]+(nr()-.5)*c[2]*2,z=c[1]+(nr()-.5)*c[2];if(!frei(x,z)||!thFrei(x,z,5))continue;kiefer(x,z,.85+nr()*.5);n++}});
  for(let z=100;z>TORZ+6;z-=16){const x=wegX(z);if(Math.abs(z-114)<10||SEITENWEGE.some(r=>Math.abs(z-r)<10))continue;[-1,1].forEach(s=>{if(frei(x+s*7.5,z))kiefer(x+s*7.5,z,.9+nr()*.3)})}
  for(let x=-140;x<=160;x+=12){if(Math.abs(x)>14&&istLand(x,TORZ+2))kiefer(x,TORZ+2,1.1,true);for(let k=0;k<3;k++){const xx=x+nr()*10,zz=TORZ-8-nr()*40;if(Math.abs(xx)>26&&xx<150&&istLand(xx,zz)&&thFrei(xx,zz,6))kiefer(xx,zz,.9+nr()*.6,Math.abs(xx)<70)}}
  /* Weiden, Felder, Hecken */
  weide(-34,-34,10,6);weide(44,-34,10,6);weide(30,-84,10,7);feld(12,28,-44,-26,0xf6d030,.7);feld(-34,-14,-104,-90,0xd8b050,1);
  [[-60,-20,-40,-18],[-24,-70,-18,-88],[64,48,64,60],[20,34,48,34],[-94,66,-78,60],[-62,-121,-40,-119],[-120,-100,-104,-108]].forEach((h,i)=>hecke(h[0],h[1],h[2],h[3],null,i));
  /* Teiche und Rinnen */
  [[-4,-66,4],[70,-10,3.4],[-84,-30,4.6]].forEach(t=>{if(!frei(t[0],t[1]))return;teichBau(t[0],t[1],t[2],WASSER);sgMark(t[0],t[1],t[2]+5);schilfAm2(t[0],t[1],t[2]-.2);for(let i=0;i<2;i++)streif(ente,pendel(spl([[t[0]-t[2]*.4,t[1]-t[2]*.3],[t[0]+t[2]*.3,t[1]-t[2]*.4],[t[0]+t[2]*.4,t[1]+t[2]*.2],[t[0]-t[2]*.2,t[1]+t[2]*.4]],1.2),.2),.7,i*5,1.3)});
  /* Priele jenseits der Lahnung (nur Kulisse) und Halligen */
  [[60,8],[30,-6],[0,5],[-30,-4],[-60,6],[-90,-5],[-120,4],[-150,-4]].forEach(p=>bandM(spl([[166,p[0]],[178,p[0]+p[1]],[196,p[0]-p[1]*.6],[214,p[0]+p[1]*.5]],2.5),2.8+Math.abs(p[1])*.1,0x8f836a,.05));
  [[230,40],[246,-60],[222,-130]].forEach((p,i)=>{inst('sphT',p[0],0,p[1],11,.6,9,0x86b05a);stall(p[0]-2,p[1],6,4,2.6,[0xf6f6f2,0xe8d8b0,0xb8643a][i],0xc4a862,0);inst('blm',p[0]+5,2.2,p[1]+2,2,1.6,2,0x4a8a3a)});
  /* fernes Schiff und Segler am Horizont */
  (function(){const g=grp(-235,0,-20);const B=rumpf(g,26,6,3.4,0x2a3a4a,0x6a6a70,0xc03a2a);box(5,3,5,0xf6f6f2,-6,3.6,0,g);box(3,2,3.4,0xe8e4da,-6,6,0,g);for(let i=0;i<4;i++)box(2.6,1.6,4,[0xe0302a,0x3b8fc4,0xe8c24a,0x4caf6a][i],-1+i*3.2,3.4,0,g);vm(g);g.userData.keep=1;g.rotation.y=Math.PI/2;lebendig.push({o:{userData:{anim:t=>{g.position.z=((-(t*1.1)%420)+420)%420-300}}},ph:0})})();
  [[-200,60],[-215,-110],[-190,-190]].forEach((p,i)=>{const s=segler(scene,0xf6f6f2,[0xe0302a,0x3b8fc4,0xffd45e][i],2.2);s.position.set(p[0],0,p[1]);bewegt(s,t=>{s.position.x=p[0]+Math.sin(t*.05+i)*10;s.position.z=p[1]+Math.cos(t*.04+i)*18;s.rotation.y=Math.atan2(Math.sin(t*.04+i)*.72,Math.cos(t*.05+i)*.5)})});
  /* ---- Kleinteile an Wegen ---- */
  (function(){const nahe=(x,z)=>EXTRAZONEN.some(e=>e.name!=='Meer'&&e.name!=='Hafenbecken'&&Math.hypot(x-e.x,z-e.z)<e.r+4);
    SEITENWEGE.forEach((r,ri)=>{for(let x=RX0(r)+20;x<=RX1(r)-8;x+=17){if(Math.abs(x-wegX(r))<12)continue;const z=roadZ(x,r),side=((Math.round(x/17)+ri)%2)?1:-1,zz=z+side*4.6;if(nahe(x,zz)||!istLand(x,zz)||imWatt(x,zz)&&x>158)continue;const f=Math.round(x/17+ri*3)%8;
      if(f===0)bankW(x,zz,side>0?0:Math.PI);else if(f===1)laterne(x,zz);else if(f===2)fahrrad(x,zz,.3,[0xe0302a,0x3b6fc4,0x4caf6a][ri%3]);else if(f===3)fischkiste(x,zz,.3);else if(f===4)tonne(x,zz);else if(f===5){tisch(x,zz,0);bankW(x,zz+1.6,Math.PI);bankW(x,zz-1.6,0)}else if(f===6)boje(x,zz);else{poller(x,zz);poller(x+2,zz)}}});
    for(let z=GRENZE.z1-34;z>TORZ+6;z-=14){if(SEITENWEGE.some(r=>Math.abs(z-r)<12)||Math.abs(z-114)<16)continue;const x=wegX(z),side=(Math.round(z/14)%2)?1:-1,xx=x+side*4.4,f=Math.round(z/14)%5;if(nahe(xx,z))continue;if(f===0)bankW(xx,z,side>0?-Math.PI/2:Math.PI/2);else if(f===1)laterne(xx,z);else if(f===2)ring(scene,xx,1.4,z,0);else if(f===3)boje(xx,z);else{fahrrad(xx,z,1.57,0xf59e3f)}}
  })();
  /* Strandkörbe und Sandburgen verstreut am Strand */
  [[-130,52],[-126,64],[-110,92],[-104,96],[-140,38],[-146,0],[-142,-20],[-146,-60],[-143,-100],[-146,-150]].forEach((p,i)=>{if(istLand(p[0]+6,p[1])&&sgFrei(p[0],p[1])){if(i%2)strandkorb(p[0],p[1],-1.3,[0xe0605a,0x3b8fc4,0xffd45e,0x4caf6a][i%4]);else sandburg(p[0],p[1],.8,0xe0302a)}});
}
function x_in_zone(x,z){return EXTRAZONEN.some(e=>e.name!=='Meer'&&e.name!=='Hafenbecken'&&Math.hypot(x-e.x,z-e.z)<e.r+3)}
/* ==================== Etappe 5: Bewegung, Besucher, Finale ==================== */
function wanderer(B,v,ph,av,hutF){const w=grp(0,0,0);const m=kindL(Object.assign({hose:0x3a4a5a,haut:0xe8b98f,haar:0x6b4626,stil:'kurz',rucksack:null},av),w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.25);if(hutF)hutAuf(m,hutF);
  vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);
  w.userData.anim=t=>{const q=Math.sin(t*6+ph)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q};fahren(w,B,v,ph*B.L/6.3);return w}
function radler(B,v,ph,jk,rad,haar){const g=grp(0,0,0);const w1=new THREE.Mesh(new THREE.TorusGeometry(.4,.05,5,12),mat(0x2a2a2a)),w2=new THREE.Mesh(new THREE.TorusGeometry(.4,.05,5,12),mat(0x2a2a2a));w1.position.set(-.55,.42,0);w2.position.set(.55,.42,0);w1.userData.frei=1;w2.userData.frei=1;g.add(w1);g.add(w2);
  box(1.2,.07,.07,rad,0,.75,0,g).rotation.z=.15;box(.07,.6,.07,rad,-.35,.75,0,g);box(.07,.55,.07,rad,.5,.7,0,g);box(.35,.06,.22,0x2a2a2a,-.4,1.02,0,g);box(.07,.07,.55,0x2a2a2a,.5,1.0,0,g);
  const m=kindL({jacke:jk,hose:0x3a4a5a,haut:0xe8b98f,haar:haar||0x6b4626,stil:'kurz',rucksack:null},g);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1);m.g.position.set(-.2,.25,0);vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);vmVerschm(g);
  g.userData.anim=t=>{w1.rotation.z=-t*9;w2.rotation.z=-t*9;const q=Math.sin(t*7+ph)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q};fahren(g,B,v,ph*B.L/6.3);return g}
function trecker(par){const g=grp(0,0,0,par);box(2.8,1.1,1.5,0x2fa56a,.3,1.3,0,g,true);box(1.4,1.5,1.5,0x2fa56a,-.7,2.4,0,g);box(.06,1,1.3,0x9fd0e8,.01,2.5,0,g);box(1.6,.12,1.6,0x2f6a3a,-.7,3.2,0,g);cyl(.12,1,0x2a2a2a,1.2,2.4,.4,g);[-1,1].forEach(s=>{cyl(.95,.5,0x2a2a2a,-.7,.95,s*.95,g,true).rotation.x=Math.PI/2;cyl(.55,.4,0x2a2a2a,1.3,.55,s*.85,g).rotation.x=Math.PI/2;cyl(.4,.52,0xd8c040,-.7,.95,s*.95,g).rotation.x=Math.PI/2;sph(.14,0xfff0b0,1.75,1.3,s*.5,g)});
  const a=grp(-4.2,0,0,g);box(3.6,.2,1.9,0x6a4220,0,.9,0,a);[-1,1].forEach(s=>{box(3.6,.7,.12,0x8a5a32,0,1.3,s*.95,a);cyl(.6,.3,0x2a2a2a,-.9,.6,s*1.05,a).rotation.x=Math.PI/2});for(let i=0;i<3;i++)cyl(.55,.8,0xe8c850,-1+i*1,1.6,0,a).rotation.x=Math.PI/2;box(.8,.1,.1,0x6a4220,2.2,.9,0,a);return vm(g)}
function etappe5(){
  /* ---- Wolken ---- */
  for(let i=0;i<6;i++){const g=grp(0,46+nr()*12,0);for(let k=0;k<2;k++)sph(1,0xffffff,(k-.5)*4+nr()*2,nr()*1.5,(nr()-.5)*4,g,5+nr()*2,2+nr(),3+nr()*2);const x0=nr()*600,z=-230+nr()*400,v=1.2+nr()*1.4;bewegt(g,t=>{g.position.x=((x0+t*v)%600+600)%600-300;g.position.z=z})}
  /* ---- Möwen am Himmel ---- */
  [[-100,90,30,12,0,.3],[60,100,34,13,2,.28],[-120,-20,28,11,4,.33],[110,-20,26,14,1,.35],[0,20,40,15,3,.25],[-60,-110,24,10,5,.32],[100,60,22,12,2,.3],[-130,60,26,13,4.4,.34],[30,-80,32,14,1.6,.27],[80,110,20,11,3.3,.36],[-30,115,24,12,.7,.3],[140,-110,26,15,5.1,.29],[-90,-150,22,12,2.9,.31],[0,-100,30,16,3.7,.26]].forEach(f=>flieger(f[0],f[1],f[2],f[3],f[4],f[5],0xf6f6f2,0xe8a030));
  /* ---- Wege für Spaziergänger ---- */
  const sp=(pts,f)=>spl(pts,2.5).filter(f),hw=z0=>sp(Array.from({length:30},(_,i)=>[wegX(112-i*10),112-i*10]),q=>q[1]<=z0[0]&&q[1]>=z0[1]),rd=(r,x0,x1)=>sp(strasse(r),q=>q[0]>=x0&&q[0]<=x1);
  const ku=sp(K0.filter(q=>q[0]<-118&&q[1]>-170&&q[1]<44).map((q,i,a)=>[q[0]+26,q[1]]),q=>true),dw=sp([[72,70],[82,48],[80,20],[84,-14],[81,-44],[84,-76],[80,-106]],q=>true);
  const JK=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0x9b6fd0,0xf2c230],HR=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a],ST=['kurz','zoepfe','cap','pferd'],RU=[0xb83a2e,0x3b6fc4,0x4a6a3a,null,0xe0a030,null];
  const routen=[[hw([108,64]),1.2],[hw([64,6]),1.2],[hw([6,-60]),1.2],[hw([-60,-120]),1.2],[hw([-120,-168]),1.2],[rd(94,-100,-12),1.3],[rd(94,12,160),1.3],[rd(44,-130,-14),1.3],[rd(44,14,150),1.3],[rd(-8,-130,-14),1.3],[rd(-8,14,150),1.3],[rd(-58,-130,-14),1.3],[rd(-58,14,150),1.3],[rd(-110,-130,-14),1.3],[rd(-110,14,150),1.3],[rd(-160,-130,-14),1.3],[rd(-160,14,150),1.3],[ku,1.1],[dw,1.1]];
  let k=0;routen.forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);const anz=i<5?2:(i%3?1:2);for(let j=0;j<anz;j++){const av={jacke:JK[(k*3+j)%9],haar:HR[(k+j*2)%6],stil:ST[(k+j)%4],rucksack:RU[(k+j)%6]};wanderer(B,2+((k+j)%3)*.4,j*2.1+i,av,(k+j)%5===0?0xe8c850:null);k++}});
  /* Radfahrer auf den Querstraßen und dem Hauptweg */
  [[hw([108,-20]),1.3],[hw([-20,-168]),1.3],[rd(94,-100,160),1.2],[rd(44,-130,150),1.2],[rd(-8,-130,150),1.2],[rd(-58,-130,150),1.2],[rd(-110,-130,150),1.2]].forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);for(let j=0;j<(i<2?2:1);j++)radler(B,4.2+j*.6,j*3+i,JK[(i*2+j)%9],[0xe0302a,0x3b6fc4,0x4caf6a,0xf59e3f][(i+j)%4],HR[(i+j)%6])});
  /* Fischer und Schäfer auf den Wegen, Traktor */
  wanderer(pendel(rd(94,10,150),.9),1.4,0,{jacke:0xf2c230,hose:0x3a4a6a,haar:0x6b4626},0x1f4e79);wanderer(pendel(rd(44,10,150),.9),1.3,2,{jacke:0xf2c230,hose:0x3a4a6a,haar:0xb0b0b0},0x1f4e79);wanderer(pendel(dw,.7),1.1,1,{jacke:0x2f6a3a,hose:0x5a4a3a,haar:0x6b4626},0x5a3a22);
  wanderer(pendel(ku,.8),1.4,3,{jacke:0xe0302a,hose:0xe0302a,haar:0xe8c24a},null);wanderer(pendel(ku,.8),1.4,0,{jacke:0xe0302a,hose:0xe0302a,haar:0x2a1d14},null);
  (function(){const T=pendel(rd(-58,-120,150),2.4);const t=trecker(scene);fahren(t,T,3.4,0)})();
  /* Hunde am Strand und an den Wegen */
  streif(hundM,pendel(ku.filter((q,i)=>i>10&&i<40),.9),2.4,0,1.2);streif(hundM,pendel(rd(94,-90,-20),.8),2.2,6,1.2);streif(hundM,pendel(dw.slice(10,30),.9),2.2,3,1.2);
  /* ---- Boote im Meer ---- */
  const ell=(cx,cz,rx,rz,n)=>{const P=[];for(let i=0;i<(n||24);i++){const a=i/(n||24)*Math.PI*2;P.push([cx+Math.cos(a)*rx,cz+Math.sin(a)*rz])}return bahn(P)};
  [[-80,137,46,6,0,0xf6f6f2,0xe0302a],[-110,134,36,7,1,0xe0302a,0xffd45e],[90,138,36,6,2,0x1f4e79,0xf6f6f2],[60,141,30,5,3,0xf6f6f2,0x3b8fc4]].forEach((c,i)=>{const s=segler(scene,c[5],c[6],.95);fahren(s,ell(c[0],c[1],c[2],c[3]),2.4+(i%2)*.4,i*20);});
  (function(){const B1=ell(-166,-30,6,70,30);const s=segler(scene,0xf6f6f2,0x3b8fc4,.9);fahren(s,B1,2.2,0);const k=kutter(scene,0x2fa56a,0xf2e8c0,.9);fahren(k,B1,2.2,B1.L*.5);const B2=ell(-166,-130,6,45,26);const s2=segler(scene,0xffd45e,0xe0302a,.9);fahren(s2,B2,2.4,0)})();
  /* ---- Falter, Libellen ---- */
  [[-100,60,0xf6d030],[-70,-20,0xf08a2a],[-20,30,0xffffff],[40,40,0xf6d030],[60,-10,0xf08a2a],[-10,-60,0xffffff],[30,-70,0xf6d030],[-40,-100,0xf08a2a],[80,-120,0xffffff],[-110,-110,0xf6d030],[-60,60,0xf47ab0]].forEach((f,i)=>{falter(f[0],f[1],5,1.5+(i%3)*.4,i*1.7,f[2]);if(i%3===0)falter(f[0]+3,f[1]-2,4,1.9,i+1,0xf47ab0)});
  /* ---- Krebse und Strandläufer ---- */
  for(let i=0;i<6;i++){const k=krabbe(scene);k.position.set(-142+nr()*3,.04,-120+i*34);k.scale.setScalar(1.8);k.rotation.y=nr()*6;lebendig.push({o:k,ph:i*1.4})}
}
function paradeBauen(){
  const Ma=p=>moewe(p),wp=(jk,hs,hr,hat,st)=>p=>{const w=grp(0,0,0,p);const m=kindL({jacke:jk,hose:hs,haut:0xe8b98f,haar:hr,stil:st||'kurz',rucksack:null},w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.4);if(hat)hutAuf(m,hat);[m.bl,m.br,m.al,m.ar].forEach(q=>{vmVerschm(q);q.userData.frei=1});vmVerschm(m.g);w.userData.anim=t=>{const q=Math.sin(t*6)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q;m.al.rotation.x=-q*.7;m.ar.rotation.x=q*.7};return w};
  const wagen=(f,hf,seg)=>p=>{const g=grp(0,0,0,p);box(6,.25,2.2,0x6a4220,0,.7,0,g,true);[-1,1].forEach(s=>[-1.8,1.8].forEach(x=>cyl(.45,.3,0x2a2a2a,x,.45,s*1.2,g).rotation.x=Math.PI/2));const b=seg?segler(g,f,hf,.8):kutter(g,f,hf,.5);b.position.set(seg?-.3:.2,.85,0);box(6.2,.12,.12,0x6a4220,0,.7,1.2,g);return g};
  const liste=[[Ma,2.4],[krabbe,2.2],[wp(0xe0302a,0xe0302a,0xe8c24a,null),1],[wagen(0x3b6fc4,0xf6f6f2,false),.8],[p=>schaf(p),1.3],[wp(0xf2c230,0x3a4a6a,0x6b4626,0x1f4e79),1],[robbe,.8],[wp(0x2f6a3a,0x5a4a3a,0x6b4626,0x5a3a22),1],[wagen(0xf6f6f2,0xe0302a,true),.8],[p=>lamm(p),1.6],[wp(0x1f4e79,0x3a3a4a,0xb0b0b0,0xf6f6f2),1],[krabbe,2.2]];
  liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
/*@@F@@*/
function weltBauen(){
/* Leistung: gröbere Grundformen (Kugel 9x6, Zylinder 8, Kegel 7) für alle Teile dieser Welt */
gSph.copy(new THREE.SphereGeometry(1,8,5));gCyl.copy(new THREE.CylinderGeometry(1,1,1,8));gCone.copy(new THREE.ConeGeometry(1,1,7));
FARBEN={boden:0x86b05a,pfad:0xd9c79a,platz:0xe9dcb4,gehege:0x9ec36a};
etappe1();
etappe2();
etappe3();
etappe3b();
etappe4();
etappe5();
/*@@ENDE@@*/
instFlush();
}
