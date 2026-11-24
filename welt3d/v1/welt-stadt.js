/* Welt: Stadt (Kennwort stadt). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Schilder: ausgeschaltet (Wunsch der Lehrkraft, 24.11.2026). Frühere Liste zum Wiedereinschalten: SCHILDER_ALT einfach als SCHILDER eintragen und WEGMAX auf 3 setzen. */
const SCHILDER_ALT=['Ausgang', 'Geschafft!', 'Rathaus', 'Bahnhof', 'Krankenhaus', 'Schule', 'Feuerwache', 'Polizei', 'Museum', 'KINO', 'Kino', 'Schwimmbad', 'Supermarkt', 'Hafen', 'Sportplatz'];
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
/* Leistung (iPad): Stadt ist groß – Zoom begrenzen, größere Verschmelz-Zellen, bewegte Teile beim Herauszoomen früher ausblenden */
const ZOOMMAX=42,MERGEZELLE=150,FERNBESUCHER=40,FERNLEBEN=55;
const MASKOTTCHEN='Toni Taube';
const START={x:0,z:150};
const BEREICHE={
  eingang:{name:'Stadttor',x:0,z:128,plaetze:[]}
};
const EXTRAZONEN=[{name:'Stadttor',x:0,z:128,r:17},{name:'Marktplatz',x:0,z:22,r:18},{name:'Rathaus',x:0,z:-24,r:15},{name:'Kirche',x:-52,z:22,r:14},{name:'Stadtbrunnen',x:50,z:22,r:11},
{name:'Bahnhof',x:-112,z:126,r:19},{name:'Bushaltestelle',x:-45,z:98,r:11},{name:'Kreuzung',x:0,z:84,r:14},{name:'Tankstelle',x:158,z:118,r:15},{name:'Fahrradstraße',x:-108,z:84,r:14},{name:'Hafen',x:130,z:-86,r:17},{name:'Flussbrücke',x:-15,z:-103,r:16},
{name:'Feuerwache',x:-55,z:-26,r:15},{name:'Polizeiwache',x:55,z:-26,r:14},{name:'Krankenhaus',x:-110,z:-18,r:21},{name:'Schule',x:-158,z:34,r:19},{name:'Bibliothek',x:-104,z:26,r:14},{name:'Postamt',x:140,z:22,r:12},{name:'Recyclinghof',x:-170,z:-70,r:15},
{name:'Supermarkt',x:100,z:115,r:17},{name:'Bäckerei',x:-32,z:62,r:10},{name:'Eisdiele',x:34,z:62,r:10},{name:'Pizzeria',x:98,z:24,r:13},{name:'Kaufhaus',x:55,z:106,r:15},
{name:'Stadtpark',x:-56,z:-72,r:19},{name:'Spielplatz',x:110,z:60,r:14},{name:'Schwimmbad',x:-112,z:-76,r:17},{name:'Sportplatz',x:155,z:-128,r:22},{name:'Kino',x:100,z:-62,r:12},{name:'Museum',x:52,z:-70,r:15},{name:'Baustelle',x:-110,z:-130,r:18},{name:'Wohnviertel',x:170,z:58,r:22}];
/* Dichte-Runde (24.11.2026): neue Orte */
EXTRAZONEN.push({name:'Skatepark',x:-176,z:-12,r:21},{name:'Hundewiese',x:-180,z:70,r:17},{name:'Hotel',x:112,z:-22,r:17},{name:'Café',x:183,z:9,r:13},{name:'Einkaufsgasse',x:36,z:150,r:21},{name:'Leuchtturm',x:174,z:-90,r:11},{name:'Tennisplatz',x:194,z:-121,r:15},{name:'Basketball',x:188,z:-141,r:10},{name:'Kiosk',x:-72,z:108,r:12});
const SEITENWEGE=[84,-47,-103];
const GRENZE={x0:-220,x1:220,z0:-215,z1:175};
const TORZ=-160, FEST={x:0,z:-190};
let FARBEN,WASSER,ausgang;
const ZN=n=>EXTRAZONEN.find(e=>e.name===n);
/* Farbpalette (klein halten: weniger verschiedene Farben = weniger Zeichenaufrufe nach dem Verschmelzen) */
const K={rot:0xe0605a,gelb:0xffd45e,gruen:0x4caf6a,blau:0x3b8fc4,orange:0xf59e3f,lila:0xb06ae0,tuerkis:0x2fb5a8,rosa:0xf47ab0,weiss:0xf6f2ea,holz:0x8a5a32,braun:0x8a5a32,dunkel:0x3a4a56,grau:0x9aa0a6,creme:0xf6f2ea,schwarz:0x2a2a2a,himmel:0xc8e0f0,gold:0xe8b930,ziegel:0xc4674a,sand:0xe8d9b0,asph:0x5d6672,platz:0xd9d3c4,hellgrau:0xcfd4d8,laub:0x3f9a46};
const BUNT=[K.rot,K.gelb,K.gruen,K.blau,K.orange,K.lila,K.tuerkis,K.rosa];
const HAUT=[0xf2c9a0,0xc68a5a,0xe8b88a,0x8a5a3a];
const fs=t=>t.length>12?36:t.length>9?42:t.length>6?50:58;
const LAMPEN={warm:[],rot:[],gelb:[],blau:[],gruen:[]};
const LART=['rot','gelb','blau','gruen'];
const FEN=[],STRICH=[],SCHWELLEN=[];
/* Kurzformen (immer mit Elternobjekt scene, wenn keins angegeben ist) */
const qb=(w,h,d,c,x,y,z,p,s)=>box(w,h,d,c,x,y,z,p||scene,s);
const qc=(r,h,c,x,y,z,p,s)=>cyl(r,h,c,x,y,z,p||scene,s);
const qs=(r,c,x,y,z,p,sx,sy,sz)=>sph(r,c,x,y,z,p||scene,sx,sy,sz);
const qk=(r,h,c,x,y,z,p,s)=>cone(r,h,c,x,y,z,p||scene,s);
/* ---------- Hilfsfunktionen ---------- */
function pfad(x1,z1,x2,z2,w,farbe,h){h=h||.06;const l=Math.hypot(x2-x1,z2-z1);const b=box(w,h,l,farbe||FARBEN.pfad,(x1+x2)/2,h/2,(z1+z2)/2,scene);b.rotation.y=Math.atan2(x2-x1,z2-z1);b.receiveShadow=true;return b}
function scheibe(x,z,r,farbe,h){h=h||.1;const c=cyl(r,h,farbe,x,h/2,z,scene);c.receiveShadow=true;return c}
function schild(text,x,y,z,w,h,schrift,farbe,rot,par){const s=schildText(text,farbe||'#fff8e6',w,h,schrift||fs(text));s.position.set(x,y,z);if(rot)s.rotation.y=rot;(par||scene).add(s);return s}
/* Tafel in der Welt: wird aus der Ferne ausgeblendet (spart Zeichenaufrufe) */
function tafel(text,x,y,z,w,h,farbe,rot,schrift){h=Math.max(h,w/4.6);const s=schild(text,x,y,z,w,h,schrift,farbe,rot);lebendig.push({o:s,ph:0});return s}
function bewegt(teil,fn,wx,wz,fern){const L=Array.isArray(teil)?teil:[teil];L.forEach(o=>{o.userData.keep=1});
  lebendig.push({o:{userData:{anim:t=>{if(wx!=null){const s=Math.hypot(wx-spieler.position.x,wz-spieler.position.z)<(fern||95);if(L[0].visible!==s)L.forEach(o=>{o.visible=s});if(!s)return}fn(t)}}},ph:0})}
/* Bewegtes Objekt, das seinen Ort selbst ändert: Sichtbarkeit nach dem Abstand des Objekts */
function bewegt2(g,fn,fern){g.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{fn(t);const s=Math.hypot(g.position.x-spieler.position.x,g.position.z-spieler.position.z)<(fern||110);if(g.visible!==s)g.visible=s}}},ph:0})}
function instanz(par,geo,farbe,liste,hell){const m=hell?new THREE.MeshBasicMaterial({color:farbe}):mat(farbe);const im=new THREE.InstancedMesh(geo,m,liste.length);im.frustumCulled=false;par.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S3=new THREE.Vector3();liste.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S3.set(a[3],a[4],a[5]);M.compose(P,Q,S3);im.setMatrixAt(i,M)});im.instanceMatrix.needsUpdate=true;return im}
function stab(par,x1,y1,z1,x2,y2,z2,d,farbe,dh,cast){const dx=x2-x1,dy=y2-y1,dz=z2-z1,l=Math.hypot(dx,dy,dz);const m=box(d,dh||d,l,farbe,(x1+x2)/2,(y1+y2)/2,(z1+z2)/2,par,cast);m.rotation.order='YXZ';m.rotation.y=Math.atan2(dx,dz);m.rotation.x=-Math.atan2(dy,Math.hypot(dx,dz));return m}
function kreisLinie(x1,z1,x2,z2,r,ab){const l=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(l/(ab||2)));for(let i=0;i<=n;i++)kreis(x1+(x2-x1)*i/n,z1+(z2-z1)*i/n,r)}
function lampe(x,y,z,art){LAMPEN[art||'warm'].push([x,y,z,.17,.17,.17])}
function girlande(x1,y1,z1,x2,y2,z2,n,hang,art){for(let i=0;i<=n;i++){const t=i/n;lampe(x1+(x2-x1)*t,y1+(y2-y1)*t-Math.sin(t*Math.PI)*hang,z1+(z2-z1)*t,art||LART[i%4])}}
function wimpel(x1,y1,z1,x2,y2,z2,n,hang){for(let i=0;i<n;i++){const t=(i+.5)/n;const c=cone(.28,.6,BUNT[i%8],x1+(x2-x1)*t,y1+(y2-y1)*t-Math.sin(t*Math.PI)*hang-.3,z1+(z2-z1)*t,scene);c.rotation.z=Math.PI}}
function mast(x,z,h,farbe){qc(.14,h,farbe||K.weiss,x,h/2,z,scene,true);kreis(x,z,.3)}
function kBox(x,z,w,d){sperrKasten(x,z,w,d,0)}
function fen(x,y,z,w,h,d){FEN.push([x,y,z,w||1.3,h||1.5,d||.14])}
function dach(x,z,w,d,h,f,ach,rh){const n=3;rh=rh||Math.min(w,d)*.38;for(let i=0;i<n;i++){const k=1-i/n;if(ach==='z')qb(w*k+.5,rh/n+.02,d+.8,f,x,h+rh/n*(i+.5),z);else qb(w+.8,rh/n+.02,d*k+.5,f,x,h+rh/n*(i+.5),z)}}
/* Gebäude (Vorderseite zeigt nach +z): Wände, Dach, Fenster, Tür, Kollision */
function bau(x,z,w,d,h,wand,df,o){o=o||{};qb(w,h,d,wand,x,h/2,z,scene,true);
  if(o.flach)qb(w+.6,.5,d+.6,df,x,h+.25,z);else if(df!=null)dach(x,z,w,d,h,df,o.ach,o.rh);
  const et=o.et||Math.max(1,Math.round(h/3.5)),n=o.n||Math.max(1,Math.round(w/3.6)),zf=z+d/2+.07,tx=o.tx||0,fh=h/et;
  if(o.fenster!==false)for(let f=0;f<et;f++)for(let i=0;i<n;i++){const xs=x-w/2+(i+.5)*w/n;if(f===0&&o.tuer!==false&&Math.abs(xs-(x+tx))<1.7)continue;fen(xs,fh*(f+.5)+.4,zf,1.3,Math.min(1.7,fh*.45))}
  if(o.tuer!==false)qb(1.8,2.6,.2,o.tuerF||K.braun,x+tx,1.3,zf);
  if(o.fenster!==false){const zb=z-d/2-.07,fh2=Math.min(1.7,fh*.45);for(let f=0;f<et;f++)for(let i=0;i<n;i++)fen(x-w/2+(i+.5)*w/n,fh*(f+.5)+.4,zb,1.3,fh2);if(d>=5){const ns=Math.max(1,Math.round(d/3.6));for(let f=0;f<et;f++)for(let j=0;j<ns;j++){const zs=z-d/2+(j+.5)*d/ns;[-1,1].forEach(sd=>fen(x+sd*(w/2+.07),fh*(f+.5)+.4,zs,.14,fh2,1.3))}}}
  kBox(x,z,w,d)}
function kasten(x,y,z,w){qb(w,.4,.55,K.holz,x,y,z);for(let i=0;i<4;i++)qs(.2,BUNT[(i*3+Math.round(x))&7],x-w*.375+i*w*.25,y+.38,z)}
function fahne(x,z,h,farbe,fl){qc(.07,h,K.grau,x,h/2,z,scene,true);const f=qb(1.5,.9,.06,farbe,x+.8,h-.55,z);if(fl)bewegt(f,t=>{f.rotation.y=Math.sin(t*2+x)*.25},x,z,70);kreis(x,z,.3)}
function markise(par,w,y,fa,fb){const n=6;for(let i=0;i<n;i++){const m=box(w/n,.12,1.3,i%2?fb:fa,-w/2+(i+.5)*w/n,y+.25,.3,par);m.rotation.x=.3}}
function bude(x,z,rot,w,fa,fb,text,hh){hh=hh||2.6;const g=grp(x,0,z);box(w,1,1.2,fa,0,.5,.9,g,true);box(w,hh,.25,K.creme,0,hh/2,-1.1,g);[-1,1].forEach(s=>box(.2,hh+1.4,.2,K.holz,s*(w/2-.1),(hh+1.4)/2,1.1,g));markise(g,w,hh,fa,fb);
  if(text)schild(text,0,hh+.9,1.3,Math.min(w,4.6),.85,null,'#fff8e6',0,g);g.rotation.y=rot||0;kreis(x,z,w*.5+.4);return g}
function bank(x,z,rot){const g=grp(x,0,z);box(2.4,.15,.8,K.holz,0,.7,0,g,true);box(2.4,.7,.1,K.holz,0,1.1,-.35,g);box(.12,.7,.7,K.braun,-1,.35,0,g);box(.12,.7,.7,K.braun,1,.35,0,g);g.rotation.y=rot||0;kreis(x,z,1.2);return g}
function laterne(x,z){qc(.08,3.6,K.dunkel,x,1.8,z,scene,true);lampe(x,3.75,z,'warm');kreis(x,z,.3)}
function eimer(x,z){qc(.4,.9,K.gruen,x,.45,z,scene,true);qc(.44,.1,K.dunkel,x,.92,z,scene);kreis(x,z,.5)}
function kuebel(x,z){qc(.6,.7,K.holz,x,.35,z,scene,true);qc(.5,.1,K.braun,x,.72,z);for(let i=0;i<6;i++)blume(x-.3+(i%3)*.3,z-.2+Math.floor(i/3)*.4,BUNT[i%8]);kreis(x,z,.7)}
function beet(x,z,r,n){for(let i=0;i<n;i++){const a=rnd()*6.28,rr=rnd()*r;blume(x+Math.cos(a)*rr,z+Math.sin(a)*rr*.7,BUNT[i%8])}}
function tisch(x,z,f){qc(.75,.1,K.weiss,x,.95,z,scene,true);qc(.07,.95,K.grau,x,.47,z);[[-1.1,0],[1.1,0],[0,1.1],[0,-1.1]].forEach(p=>qb(.5,.5,.5,K.holz,x+p[0],.3,z+p[1]));qc(.05,2,K.grau,x,1.95,z);qk(1.6,.55,f||K.rot,x,3,z);kreis(x,z,1.6)}
function schirm(x,z,f){qc(.05,2.4,K.grau,x,1.2,z);qk(1.5,.5,f,x,2.6,z)}
function brezel(x,y,z,r,f){const t=new THREE.Mesh(new THREE.TorusGeometry(r,r*.28,6,12),mat(f||0xb87a3a));t.position.set(x,y,z);scene.add(t);const q=qb(r*1.9,r*.3,r*.3,f||0xb87a3a,x,y,z);q.rotation.z=.7;return t}
function wegweiserN(x,z,namen,rot){namen=namen.filter(wegOk);if(!namen.length)return null;_inWeg=true;const g=grp(x,0,z);qc(.1,3.6,0x7a5230,0,1.8,0,g,true);namen.forEach((n,i)=>{const s=schildText(n,'#fff8e6',3.6,.8,50);s.position.set(.1,3.3-i*.9,.12);g.add(s);const s2=s.clone();s2.position.z=-.12;s2.rotation.y=Math.PI;g.add(s2)});g.rotation.y=rot||0;kreis(x,z,.4);_inWeg=false;return g}
function zebra(x,z,ns){for(let i=0;i<6;i++){if(ns)qb(7,.03,.75,K.weiss,x,.095,z-3.75+i*1.5);else qb(.75,.03,7,K.weiss,x-3.75+i*1.5,.095,z)}}
function strich(x1,z1,x2,z2){const l=Math.hypot(x2-x1,z2-z1),n=Math.floor(l/6);for(let i=0;i<n;i++){const t=(i*6+3)/l;STRICH.push([x1+(x2-x1)*t,.09,z1+(z2-z1)*t,Math.abs(x2-x1)>Math.abs(z2-z1)?2.4:.25,.03,Math.abs(x2-x1)>Math.abs(z2-z1)?.25:2.4])}}
function sperre(x1,z1,x2,z2,r){const l=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(l/(r*1.3)));for(let i=0;i<=n;i++)EXTRAZONEN.push({name:'Straße',x:x1+(x2-x1)*i/n,z:z1+(z2-z1)*i/n,r:r})}
function baeumchen(x,z,s){s=s||1;qc(.25*s,2.2*s,0x7a5230,x,1.1*s,z,scene,true);qs(1.5*s,0x4aa84e,x,3*s,z,scene,1,1.1,1).castShadow=true;kreis(x,z,.8*s)}
function fontaene(x,z,h,n,ph,r0){const g=grp(x,0,z),tr=[];for(let i=0;i<n;i++)tr.push(sph(.15,0xcfeeff,0,0,0,g));bewegt(g,t=>{tr.forEach((p,i)=>{const f=(t*.9+i/n+ph)%1,a=i*2.4;p.position.set(Math.cos(a)*f*(r0||2.4),.5+4*f*(1-f)*h,Math.sin(a)*f*(r0||2.4))})},x,z,80)}
function brunnen(x,z,s,n){const g=grp(x,0,z);qc(4.2*s,.9,K.grau,0,.45,0,g,true);qc(3.7*s,.2,WASSER,0,.9,0,g);qc(.7*s,2.6,K.weiss,0,1.8,0,g,true);qc(1.8*s,.3,K.weiss,0,2.9,0,g);qs(.45*s,K.gold,0,3.3,0,g);kreis(x,z,4.6*s);
  const sp=grp(x,0,z),tr=[];for(let i=0;i<(n||8);i++)tr.push(sph(.16,0xcfeeff,0,3.2,0,sp));bewegt(sp,t=>{tr.forEach((p,i)=>{const f=(t*.8+i/(n||8))%1,a=i*.785,r=f*3.2*s;p.position.set(Math.cos(a)*r,3.2+f*(1-f)*9-f*2.2,Math.sin(a)*r)})},x,z,90)}
function plakat(){const c=document.createElement('canvas');c.width=256;c.height=340;const t=c.getContext('2d');t.fillStyle='#e9eedd';t.fillRect(0,0,256,340);
  const X=x=>(x-GRENZE.x0)/(GRENZE.x1-GRENZE.x0)*256,Z=z=>(z-GRENZE.z0)/(GRENZE.z1-GRENZE.z0)*340;t.fillStyle='#9fd0f0';t.fillRect(0,Z(-108),256,Z(-98)-Z(-108));
  t.strokeStyle='#9aa0a6';t.lineWidth=5;t.beginPath();t.moveTo(X(-82),Z(-47));t.lineTo(X(76),Z(-47));t.lineTo(X(76),Z(84));t.lineTo(X(-82),Z(84));t.closePath();t.stroke();t.strokeStyle='#d8c690';t.lineWidth=6;t.beginPath();t.moveTo(X(0),Z(170));t.lineTo(X(0),Z(-160));t.stroke();
  EXTRAZONEN.forEach((e,i)=>{if(e.name==='Straße')return;t.fillStyle=['#e0605a','#ffd45e','#4caf6a','#3b8fc4','#f59e3f','#b06ae0','#2fb5a8','#f47ab0'][i%8];t.beginPath();t.arc(X(e.x),Z(e.z),e.r*.4,0,6.3);t.fill()});
  t.fillStyle='#4a2f12';t.beginPath();t.arc(X(0),Z(150),6,0,6.3);t.fill();t.strokeStyle='#8b5a2b';t.lineWidth=8;t.strokeRect(4,4,248,332);
  return new THREE.Mesh(new THREE.PlaneGeometry(3.8,5),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}))}
function leucht(par,x,y,z,r,m){const s=new THREE.Mesh(gSph,m);s.scale.set(r,r,r);s.position.set(x,y,z);s.userData.frei=1;par.add(s);return s}
/* Fahrzeuge: unbewegte Teile (Karosserie, Fenster, Räder, Lichter) je Material zu einem Mesh verschmelzen; Gruppe braucht userData.vm; Teile mit userData.frei/anim/keep bleiben einzeln */
function vmVerschm(g){g.updateMatrixWorld(true);if(Math.abs(g.matrixWorld.determinant())<1e-9)return;const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(),gr={},alt=[];
  g.traverse(m=>{if(m===g||!m.isMesh||!m.visible)return;const mt=m.material;if(Array.isArray(mt)||mt.transparent||mt.map)return;for(let o=m;o&&o!==g;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep||o.userData.frei))return}
    const ge=m.geometry.clone();ge.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));const k=mt.uuid+'|'+(m.castShadow?1:0);(gr[k]=gr[k]||{mt,c:m.castShadow,l:[]}).l.push(ge);alt.push(m)});
  for(const k in gr){const q=gr[k];let nv=0,ni=0;q.l.forEach(e=>{nv+=e.attributes.position.count;ni+=e.index?e.index.count:e.attributes.position.count});const P=new Float32Array(nv*3),N=new Float32Array(nv*3),I=new Uint32Array(ni);let vo=0,io=0;
    q.l.forEach(e=>{const c=e.attributes.position.count;P.set(e.attributes.position.array,vo*3);N.set(e.attributes.normal.array,vo*3);if(e.index){const ix=e.index.array;for(let j=0;j<ix.length;j++)I[io+j]=ix[j]+vo;io+=ix.length}else{for(let j=0;j<c;j++)I[io+j]=vo+j;io+=c}vo+=c;e.dispose()});
    const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(P,3));G.setAttribute('normal',new THREE.BufferAttribute(N,3));G.setIndex(new THREE.BufferAttribute(I,1));const mm=new THREE.Mesh(G,q.mt);mm.castShadow=q.c;g.add(mm)}
  alt.forEach(m=>{if(m.parent)m.parent.remove(m)})}
function vmPass(){besucher.forEach(f=>{if(f.vmOk||!f.bl)return;f.vmOk=1;f.g.userData.vm=1;[f.bl,f.br,f.al,f.ar].forEach(l=>{vmVerschm(l);l.userData.frei=1})});const L=[];scene.traverse(o=>{if(o.userData&&o.userData.vm&&!o.userData.vmFertig)L.push(o)});L.forEach(g=>{g.userData.vmFertig=1;vmVerschm(g)})}
const MBLAU=new THREE.MeshBasicMaterial({color:0x55aaff}),MGELB=new THREE.MeshBasicMaterial({color:0xffc83a});
function lichtBauen(){const farbe={warm:0xfff0b8,rot:0xff5a4a,gelb:0xffe45a,blau:0x5ab4ff,gruen:0x6aff8a},m={};
  for(const k in LAMPEN)if(LAMPEN[k].length)m[k]=instanz(scene,gSph,farbe[k],LAMPEN[k],true);
  if(m.rot)bewegt([m.rot,m.blau].filter(Boolean).concat([m.gelb,m.gruen].filter(Boolean)),t=>{const a=Math.sin(t*2.6)>0;[m.rot,m.blau].forEach(x=>{if(x)x.visible=a});[m.gelb,m.gruen].forEach(x=>{if(x)x.visible=!a})})}
/* ---------- Figuren und Fahrzeuge (alle Fahrzeuge schauen nach +x) ---------- */
function vogel(par,tasche){const g=grp(0,0,0,par),f=0x9fb0c4,h=0xdfe6ee;
  [-1,1].forEach(s=>{cyl(.07,.7,K.orange,s*.3,.35,0,g,true);box(.5,.1,.25,K.orange,s*.3,.05,.12,g)});
  sph(1,f,0,1.5,0,g,1.3,1,.95).castShadow=true;sph(.75,h,.35,1.35,0,g,1.05,.9,.8);
  const kopf=grp(1.25,2.45,0,g);sph(.55,f,0,0,0,kopf);sph(.42,0x5fae8f,-.1,-.5,0,kopf,1.1,.6,1.1);cone(.15,.5,K.orange,.6,-.05,0,kopf).rotation.z=-Math.PI/2;
  [-1,1].forEach(s=>{sph(.15,K.weiss,.38,.15,s*.3,kopf);sph(.08,K.schwarz,.47,.15,s*.3,kopf)});
  box(.9,.2,.7,0x7a8ca2,-1.55,1.35,0,g).rotation.z=.4;
  const fl=[-1,1].map(s=>{const w=grp(-.1,1.95,s*.95,g);box(1.5,.15,.8,0x8a9cb2,-.5,0,s*.35,w);return w});
  if(tasche){box(.6,.65,.28,K.braun,.1,1.15,1.08,g);box(.62,.14,.3,K.gold,.1,1.4,1.08,g);const r=box(.12,1.5,.1,K.holz,.1,1.75,.85,g);r.rotation.z=.45}
  g.userData.anim=t=>{kopf.rotation.z=-.15+Math.max(0,Math.sin(t*2.4))*.55;fl.forEach((w,i)=>{w.rotation.x=(i?1:-1)*(.15+Math.sin(t*(tasche?4:1.3)+i)*(tasche?.35:.05))})};
  g.userData.kopf=kopf;g.userData.fl=fl;return g}
const toni=par=>vogel(par,true);
function taube(par){const g=grp(0,0,0,par),f=0x9fb0c4;[-1,1].forEach(s=>cyl(.07,.7,K.orange,s*.3,.35,0,g));sph(1,f,0,1.5,0,g,1.4,1,.95).castShadow=true;
  const kopf=grp(1.25,2.45,0,g);sph(.55,f,0,0,0,kopf);cone(.15,.5,K.orange,.6,-.05,0,kopf).rotation.z=-Math.PI/2;box(.9,.2,.7,0x7a8ca2,-1.55,1.35,0,g).rotation.z=.4;
  const fl=[-1,1].map(s=>{const w=grp(-.1,1.95,s*.95,g);box(1.5,.15,.8,0x8a9cb2,-.5,0,s*.35,w);return w});
  g.userData.anim=t=>{kopf.rotation.z=-.15+Math.max(0,Math.sin(t*2.4))*.55;fl.forEach((w,i)=>{w.rotation.x=(i?1:-1)*(.15+Math.sin(t*1.3+i)*.05)})};g.userData.kopf=kopf;g.userData.fl=fl;return g}
function fliegendeTaube(par){const g=taube(par);const a=g.userData.anim;g.userData.anim=t=>{a(t);g.userData.fl.forEach((w,i)=>{w.rotation.x=(i?1:-1)*Math.sin(t*14)*.9})};return g}
function kleinKind(par,j,h){const g=grp(0,0,0,par);[-1,1].forEach(s=>box(.18,.5,.2,K.dunkel,s*.13,.28,0,g));cyl(.3,.7,j,0,.85,0,g,true);sph(.33,h,0,1.45,0,g);sph(.34,0x5a3a22,0,1.55,-.04,g,1,.7,1);return g}
function rad4(g,xs,r,zz){xs.forEach(x=>[-1,1].forEach(s=>{cyl(r,.4,K.schwarz,x,r,s*zz,g).rotation.x=Math.PI/2;cyl(r*.5,.42,K.grau,x,r,s*zz,g).rotation.x=Math.PI/2}))}
function lichter(g,x,y,z,b){[-1,1].forEach(s=>{box(.1,.28,.5,K.gelb,x,y,s*z,g);box(.12,.3,.55,K.rot,-x+(b||0),y,s*z,g)})}
function pkw(par,f,fest){const g=grp(0,0,0,par);if(!fest){g.userData.keep=1;g.userData.vm=1}box(4.2,.8,2,f,0,.85,0,g,true);box(2.2,.75,1.8,f,-.3,1.6,0,g);box(1.9,.5,1.84,K.himmel,-.3,1.65,0,g);box(2.24,.5,1.5,K.himmel,-.3,1.65,0,g);rad4(g,[-1.3,1.3],.45,.95);lichter(g,2.12,.95,.62);return g}
function parken(f,x,z,rot){const g=pkw(scene,f,true);g.position.set(x,0,z);g.rotation.y=rot||0;kreis(x,z,2.2);return g}
function feuerwehr(par,fest){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;
  box(7.6,.9,2.7,K.schwarz,0,.55,0,g);box(2.2,2,2.6,K.rot,2.7,1.9,0,g,true);box(.12,.9,2.2,K.himmel,3.82,2.3,0,g);box(4.8,2,2.6,K.rot,-1.2,1.9,0,g,true);box(7.4,.3,2.65,K.weiss,0,1.4,0,g);rad4(g,[-2.4,2.6],.65,1.25);lichter(g,3.82,1.2,.8);
  const le=grp(-1.2,3.1,0,g);le.userData.frei=1;[-.45,.45].forEach(s=>box(4.6,.14,.14,K.grau,0,0,s,le));for(let i=0;i<5;i++)box(.1,.1,1,K.grau,-2+i,0,0,le);
  const b1=leucht(g,2.6,3.05,.6,.28,MBLAU),b2=leucht(g,2.6,3.05,-.6,.28,MBLAU);
  g.userData.anim=t=>{const a=Math.sin(t*7)>0;b1.visible=a;b2.visible=!a;le.rotation.z=.04+(Math.sin(t*.8)+1)*.16;le.rotation.y=Math.sin(t*.6)*.5};return g}
function polizeiAuto(par){const g=pkw(par,K.weiss);box(4.3,.3,2.05,K.blau,0,.9,0,g);box(1.4,.18,1.6,K.blau,-.3,1.95,0,g);
  const b1=leucht(g,-.3,2.1,.55,.25,MBLAU),b2=leucht(g,-.3,2.1,-.55,.25,MBLAU);g.userData.anim=t=>{const a=Math.sin(t*6)>0;b1.visible=a;b2.visible=!a};return g}
function rettung(par){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;box(6.2,.8,2.4,K.schwarz,0,.5,0,g);box(2,1.9,2.3,K.weiss,2.1,1.8,0,g,true);box(.1,.8,2,K.himmel,3.12,2.2,0,g);box(4.2,2.5,2.4,K.weiss,-1,2.05,0,g,true);box(6.1,.35,2.45,K.rot,0,1.5,0,g);box(1,1.1,.1,K.rot,-1,2.5,1.25,g);box(.3,.3,.12,K.weiss,-1,2.5,1.3,g);rad4(g,[-1.9,2.1],.6,1.1);lichter(g,3.12,1.2,.8);
  const b1=leucht(g,2.2,2.95,.5,.25,MBLAU),b2=leucht(g,2.2,2.95,-.5,.25,MBLAU);g.userData.anim=t=>{const a=Math.sin(t*6)>0;b1.visible=a;b2.visible=!a};return g}
function busM(par,f){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;box(9,2.4,2.7,f||K.gelb,0,1.9,0,g,true);box(8.4,.9,2.74,K.himmel,-.1,2.35,0,g);box(9.2,.2,2.8,K.weiss,0,3.2,0,g);box(8,.9,2.6,K.schwarz,0,.5,0,g);box(.1,1,2.4,K.himmel,4.52,2.2,0,g);box(.1,.35,1.4,K.dunkel,4.52,3.0,0,g);rad4(g,[-2.9,2.9],.6,1.25);lichter(g,4.52,1.2,.9);return g}
function muell(par){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;box(7.4,.8,2.6,K.schwarz,0,.5,0,g);box(2.4,2.2,2.5,K.orange,2.6,1.9,0,g,true);box(.1,.9,2.2,K.himmel,3.82,2.4,0,g);box(4.8,2.5,2.5,K.orange,-1.4,2.15,0,g,true);box(1.4,2.2,2.5,K.dunkel,-4.2,1.9,0,g);box(4.8,.25,2.55,K.weiss,-1.4,2.2,0,g);rad4(g,[-3.2,2.6],.65,1.2);lichter(g,3.82,1.2,.8);
  const l=leucht(g,2.6,3.2,0,.25,MGELB);g.userData.anim=t=>{l.visible=Math.sin(t*5)>0};return g}
function wagenM(par,f){const g=grp(0,0,0,par);box(5.4,2.4,2.5,K.weiss,0,1.9,0,g,true);box(5,.9,2.55,K.himmel,0,2.4,0,g);box(5.4,.3,2.55,f,0,1.35,0,g);box(5.4,.25,2.6,K.dunkel,0,3.2,0,g);box(5,.9,2.6,K.schwarz,0,.6,0,g);rad4(g,[-1.7,1.7],.4,1.35);return g}
function zugM(par,n){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;box(5,2.4,2.5,K.rot,0,1.9,0,g,true);box(.1,1,2.2,K.himmel,2.52,2.4,0,g);box(5,.25,2.6,K.weiss,0,3.2,0,g);box(4.6,.9,2.6,K.schwarz,0,.6,0,g);rad4(g,[-1.7,1.7],.4,1.35);box(.5,1.2,2.3,K.dunkel,2.7,1.5,0,g);leucht(g,2.55,1.7,.8,.2,MGELB);leucht(g,2.55,1.7,-.8,.2,MGELB);
  for(let i=1;i<=n;i++)wagenM(g,i%2?K.gelb:K.blau).position.x=-5.8*i;return g}
function radler(par,j,fest){const g=grp(0,0,0,par);if(!fest)g.userData.keep=1;[-.85,.85].forEach(x=>{cyl(.5,.1,K.schwarz,x,.5,0,g).rotation.x=Math.PI/2});box(1.9,.12,.12,K.rot,0,.85,0,g);box(.1,.7,.1,K.grau,.85,.9,0,g);
  cyl(.27,.9,j,-.2,1.55,0,g);sph(.27,HAUT[Math.floor(rnd()*4)],-.1,2.2,0,g);sph(.3,K.gelb,-.1,2.35,0,g,1,.6,1);
  const bl=grp(-.2,1.05,.22,g),br=grp(-.2,1.05,-.22,g);[bl,br].forEach(b=>box(.15,.8,.15,K.dunkel,.1,-.4,0,b));
  if(!fest)g.userData.anim=t=>{bl.rotation.z=Math.sin(t*8)*.7;br.rotation.z=-Math.sin(t*8)*.7};return g}
function bagger(par){const g=grp(0,0,0,par);g.userData.keep=1;box(4.6,.8,2.8,K.schwarz,0,.5,0,g);const dr=grp(0,.9,0,g);box(2.8,1.2,2.4,K.gelb,0,.6,0,dr,true);box(1.3,1.2,1.4,K.himmel,.7,1.7,.4,dr);box(1,.8,2.2,K.dunkel,-1.2,.5,0,dr);
  const a1=grp(1.3,.9,-.6,dr);box(3.4,.4,.4,K.gelb,1.6,0,0,a1);const a2=grp(3.2,0,0,a1);box(2.6,.35,.35,K.gelb,1.2,0,0,a2);const sch=grp(2.5,0,0,a2);box(.9,.8,1.2,K.dunkel,.2,-.3,0,sch);
  g.userData.anim=t=>{dr.rotation.y=Math.sin(t*.5)*.9;a1.rotation.z=.5+Math.sin(t*.9)*.35;a2.rotation.z=-.9+Math.sin(t*.9+1)*.5;sch.rotation.z=-.4+Math.sin(t*1.8)*.5};return g}
function schiff(par){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;box(11,1.5,3.8,K.dunkel,0,.45,0,g,true);cone(1.9,3.2,K.dunkel,6.6,.45,0,g).rotation.z=-Math.PI/2;box(11,.25,3.9,K.rot,0,1.1,0,g);[-4,-1,2,5].forEach(x=>[-1,1].forEach(q=>sph(.18,K.himmel,x,.7,q*1.92,g)));box(3.2,2.4,3,K.weiss,-3.6,2.4,0,g,true);box(3.4,.7,3.1,K.himmel,-3.6,2.8,0,g);qc2(g);
  [[-1.2,K.rot],[1.4,K.blau],[3.8,K.gelb]].forEach((c,i)=>{box(2.2,1.6,2.8,c[1],c[0]+.4,2.1,0,g);box(2.2,1.6,2.8,BUNT[(i+4)%8],c[0]+.4,3.7,0,g)});return g}
function qc2(g){cyl(.55,1.8,K.gelb,-3.9,4.4,0,g);cyl(.6,.4,K.rot,-3.9,5.2,0,g)}
function heli(par){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;sph(1.1,K.rot,0,1.5,0,g,1.5,1,.9).castShadow=true;sph(.8,K.himmel,1,1.7,0,g,.9,.9,.9);box(3,.35,.35,K.rot,-2.3,1.8,0,g);box(.2,.9,.14,K.rot,-3.7,2.1,0,g);[-1,1].forEach(s=>{box(2.6,.1,.1,K.dunkel,0,.35,s*.7,g);box(.1,.9,.1,K.dunkel,.6,.8,s*.7,g);box(.1,.9,.1,K.dunkel,-.6,.8,s*.7,g)});
  const ro=grp(0,2.7,0,g);ro.userData.frei=1;box(6,.07,.28,K.dunkel,0,0,0,ro);box(.28,.07,6,K.dunkel,0,0,0,ro);box(.14,.4,.14,K.grau,0,-.2,0,ro);g.userData.anim=t=>{ro.rotation.y=t*14};return g}
function kranBauen(x,z,h,jib,farbe,fern){qb(1,h,1,farbe,x,h/2,z,scene,true);for(let i=0;i<5;i++)qb(1.5,.2,1.5,K.grau,x,h*.2*(i+.5)*1,z);kreis(x,z,1.2);
  const dr=grp(x,h,z);box(.9,1.2,1.4,K.himmel,.4,.8,.9,dr);box(jib,.5,.5,farbe,jib*.3,.3,0,dr);box(3,1.4,1.4,K.dunkel,-jib*.35,.4,0,dr);box(.3,2,.3,farbe,0,1.5,0,dr);
  const sl=box(.6,.5,.7,K.dunkel,jib*.4,-.2,0,dr),sei=cyl(.05,1,K.schwarz,jib*.4,-1,0,dr),ha=box(.7,.5,.7,K.gelb,jib*.4,-2,0,dr);
  bewegt(dr,t=>{dr.rotation.y=Math.sin(t*.35)*1.2;const k=3+Math.sin(t*.9)*2.4;sei.scale.y=k;sei.position.y=-.2-k/2;ha.position.y=-.2-k-.2},x,z,fern||110)}
function ente(par){const g=grp(0,0,0,par);g.userData.keep=1;sph(.42,0xa07a50,0,.2,0,g,1.35,.8,1);sph(.26,0x2f7a5a,.5,.5,0,g);cone(.1,.3,K.orange,.8,.45,0,g).rotation.z=-Math.PI/2;sph(.1,K.weiss,.4,.38,0,g,1,.4,1.4);box(.4,.1,.3,0x7a5a3a,-.55,.35,0,g).rotation.z=.3;return g}
function schmetterling(cx,cz,r,col,i){const g=grp(cx,1.5,cz);g.userData.keep=1;const f=[-1,1].map(s=>{const w=grp(0,0,0,g);sph(.2,col,0,0,s*.2,w,1,.12,1.1);return w});sph(.06,K.dunkel,0,0,0,g,.6,.6,2);
  bewegt(g,t=>{const a=t*.7+i*2.1;g.position.set(cx+Math.cos(a)*r+Math.sin(t*1.7)*.6,1.3+Math.sin(t*1.3+i)*.5,cz+Math.sin(a*1.3)*r);g.rotation.y=-a;f.forEach((w,k)=>{w.rotation.x=(k?1:-1)*Math.abs(Math.sin(t*14))*1.1})},cx,cz,90)}
function dinoBau(par){const g=grp(0,0,0,par),b=0xf4ecd2;
  for(let i=0;i<9;i++)sph(.36,b,-2.6+i*.7,2.6+Math.sin(i/8*Math.PI)*.5,0,g);
  [-1.6,-.9,-.2,.5,1.2].forEach(x=>[-1,1].forEach(z=>{const r=cyl(.08,1.7,b,x,2.0,z*.55,g);r.rotation.x=z*.35}));box(3.4,.14,.14,b,-.2,1.2,0,g);
  [[-1.4,.55],[-1.4,-.55],[1.4,.55],[1.4,-.55]].forEach(p=>{cyl(.17,1.2,b,p[0],1.5,p[1],g);cyl(.13,1.1,b,p[0],.5,p[1],g);box(.8,.2,.45,b,p[0]+.2,.1,p[1],g)});
  for(let i=0;i<7;i++)sph(.34-i*.04,b,-3.4-i*.75,2.4-i*.1,0,g);
  const nk=grp(2.6,2.8,0,g);for(let i=0;i<6;i++)sph(.3-i*.015,b,i*.38,i*.5,0,nk);
  const kp=grp(2.3,3.2,0,nk);box(1.3,.55,.5,b,.5,0,0,kp);box(1,.16,.42,b,.45,-.38,0,kp);for(let i=0;i<5;i++)cone(.05,.2,K.weiss,.15+i*.2,-.26,.16,kp).rotation.x=Math.PI;[-1,1].forEach(z=>sph(.13,K.dunkel,.35,.1,z*.26,kp));
  g.userData.nk=nk;return g}
function postAuto(par){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;box(5.4,.5,2.2,K.schwarz,0,.75,0,g);box(3.4,2,2.2,K.gelb,-.9,1.95,0,g,true);box(1.7,1.5,2.2,K.gelb,1.75,1.7,0,g,true);box(.1,.75,1.9,K.himmel,2.62,2.1,0,g);[-1,1].forEach(q=>{box(1.5,.7,.1,K.himmel,1.7,2.1,q*1.12,g);const hr=new THREE.Mesh(new THREE.TorusGeometry(.35,.08,6,14),mat(K.schwarz));hr.position.set(-.9,2.4,q*1.13);g.add(hr);box(2.8,.12,.12,K.rot,-.9,1.5,q*1.14,g)});box(3.4,.18,2.25,K.rot,-.9,2.98,0,g);rad4(g,[-1.8,1.9],.55,1.05);lichter(g,2.7,1.1,.7);box(.2,.3,2.2,K.grau,2.75,.6,0,g);return g}
/* ---------- Ampel und Ringstraße um den Marktplatz ---------- */
const ampelPhase=t=>{const c=t%30;return c<14?0:c<17?1:2};
const fussGruen=t=>{const c=t%30;return c>=19&&c<28};
const AM={r:new THREE.MeshBasicMaterial({color:0x501818}),y:new THREE.MeshBasicMaterial({color:0x504818}),g:new THREE.MeshBasicMaterial({color:0x184a20}),pr:new THREE.MeshBasicMaterial({color:0x501818}),pg:new THREE.MeshBasicMaterial({color:0x184a20})};
function ampelMast(x,z,rc,rp){const g=grp(x,0,z);g.userData.keep=1;cyl(.12,4,K.dunkel,0,2,0,g,true);
  const hc=grp(0,3.7,0,g);hc.rotation.y=rc;box(.6,1.7,.5,K.schwarz,0,0,0,hc);leucht(hc,0,.55,.28,.19,AM.r);leucht(hc,0,0,.28,.19,AM.y);leucht(hc,0,-.55,.28,.19,AM.g);
  const hp=grp(0,2.2,0,g);hp.rotation.y=rp;box(.5,1,.4,K.schwarz,0,0,0,hp);leucht(hp,0,.25,.22,.15,AM.pr);leucht(hp,0,-.25,.22,.15,AM.pg);kreis(x,z,.4)}
const RX0=-82,RX1=76,RZ0=-47,RZ1=84,RW=RX1-RX0,RH=RZ1-RZ0,RP=2*(RW+RH);
function ringPunkt(s,l){s=((s%RP)+RP)%RP;if(s<RW)return[RX0+s,RZ0+l];s-=RW;if(s<RH)return[RX1-l,RZ0+s];s-=RH;if(s<RW)return[RX1-s,RZ1-l];s-=RW;return[RX0+l,RZ1-s]}
function verkehrBauen(){const autos=[];
  const neu=(fn,q,rev,len,ex)=>{const g=fn(scene);g.visible=false;autos.push(Object.assign({g,q,rev,len,v:10+rnd()*2,wait:0,hat:0,stop:rev?207.5-len/2:359.5-len/2},ex||{}))};
  neu(q=>pkw(q,K.rot),20,false,4.2);neu(muell,200,false,7.4);neu(postAuto,400,false,5.6);
  neu(q=>busM(q,K.gelb),60,true,9,{halt:168,v:10});neu(q=>pkw(q,K.blau),270,true,4.2);neu(q=>pkw(q,K.orange),450,true,4.2);
  let tl=null;
  lebendig.push({o:{userData:{anim:t=>{const dt=tl==null?0:Math.min(.1,t-tl);tl=t;const ph=ampelPhase(t),px=spieler.position.x,pz=spieler.position.z;
    AM.r.color.setHex(ph===2?0xff3030:0x501818);AM.y.color.setHex(ph===1?0xffd020:0x504818);AM.g.color.setHex(ph===0?0x30e060:0x184a20);const fg=fussGruen(t);AM.pr.color.setHex(fg?0x501818:0xff3030);AM.pg.color.setHex(fg?0x30e060:0x184a20);
    autos.forEach(c=>{let gap=1e9,lg=0;autos.forEach(o=>{if(o!==c&&o.rev===c.rev){const d=((o.q-c.q)%RP+RP)%RP;if(d<gap){gap=d;lg=o.len}}});
      let st=c.v*dt;st=Math.min(st,Math.max(0,gap-(c.len+lg)/2-2.4));
      if(ph!==0){const dq=((c.stop-c.q)%RP+RP)%RP;if(dq<16)st=Math.min(st,dq)}
      if(c.halt!=null){const dq=((c.halt-c.q)%RP+RP)%RP;if(c.wait>0){c.wait-=dt;st=0}else if(!c.hat){st=Math.min(st,dq);if(dq<.12){c.wait=5;c.hat=1;st=0}}else if(dq<400&&dq>30)c.hat=0}
      c.q=(c.q+st)%RP;const s=c.rev?RP-c.q:c.q,L=c.rev?-2.2:2.2;
      const a=ringPunkt(s-1.5,L),b=ringPunkt(s,L),d=ringPunkt(s+1.5,L),f=ringPunkt(s+2.5,L),r=ringPunkt(s-2.5,L);let dx=f[0]-r[0],dz=f[1]-r[1];if(c.rev){dx=-dx;dz=-dz}
      c.g.position.set((a[0]+b[0]+d[0])/3,0,(a[1]+b[1]+d[1])/3);c.g.rotation.y=Math.atan2(-dz,dx);
      const sicht=Math.hypot(c.g.position.x-px,c.g.position.z-pz)<130;if(c.g.visible!==sicht)c.g.visible=sicht;if(c.g.userData.anim)c.g.userData.anim(t)})}}},ph:0})}
/* Verkehrsschilder */
function vschild(typ,x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;cyl(.07,2.8,K.grau,0,1.4,0,g,true);const k=grp(0,2.9,.1,g);
  if(typ==='stop'){cyl(.75,.08,K.weiss,0,0,0,k).rotation.x=Math.PI/2;cyl(.65,.1,K.rot,0,0,0,k).rotation.x=Math.PI/2;box(.9,.16,.12,K.weiss,0,0,.05,k)}
  else if(typ==='vorfahrt'){box(1.15,1.15,.06,K.weiss,0,0,0,k).rotation.z=.785;box(.85,.85,.1,K.gelb,0,0,0,k).rotation.z=.785}
  else if(typ==='fussgaenger'){box(1.2,1.2,.08,K.blau,0,0,0,k);sph(.13,K.weiss,0,.35,.06,k);box(.2,.55,.06,K.weiss,0,0,.06,k);box(.5,.1,.06,K.weiss,0,.1,.06,k)}
  else if(typ==='tempo'){cyl(.7,.08,K.rot,0,0,0,k).rotation.x=Math.PI/2;cyl(.55,.1,K.weiss,0,0,0,k).rotation.x=Math.PI/2;box(.18,.6,.05,K.schwarz,-.15,0,.07,k);box(.18,.6,.05,K.schwarz,.18,0,.07,k)}
  else if(typ==='einfahrt'){cyl(.7,.08,K.rot,0,0,0,k).rotation.x=Math.PI/2;box(.8,.2,.1,K.weiss,0,0,.05,k)}
  else if(typ==='rad'){cyl(.7,.08,K.blau,0,0,0,k).rotation.x=Math.PI/2;[-.25,.25].forEach(s=>{cyl(.2,.05,K.weiss,s,-.15,.06,k).rotation.x=Math.PI/2});box(.5,.07,.05,K.weiss,0,-.05,.06,k)}
  else if(typ==='halt'){cyl(.7,.08,K.gelb,0,0,0,k).rotation.x=Math.PI/2;box(.18,.7,.06,K.gruen,-.15,0,.06,k);box(.18,.7,.06,K.gruen,.18,0,.06,k)}
  kreis(x,z,.3)}
/* ---------- Dichte-Runde (24.11.2026): neue Hilfsfunktionen ---------- */
const glatt=u=>u*u*(3-2*u);
/* Figur mit beweglichen Armen und Beinen (schaut nach +z); fest = unbewegt (wird verschmolzen) */
function figur(par,jacke,hose,haut,haar,fest){const g=grp(0,0,0,par);if(!fest)g.userData.keep=1;
  const bl=grp(-.14,.72,0,g),br=grp(.14,.72,0,g);[bl,br].forEach(b=>box(.2,.72,.22,hose,0,-.36,0,b));
  box(.6,.72,.36,jacke,0,1.08,0,g);sph(.3,haut,0,1.72,0,g);sph(.31,haar,0,1.8,-.05,g,1,.72,1);[-1,1].forEach(s=>sph(.045,K.schwarz,s*.1,1.76,.27,g));
  const al=grp(-.4,1.4,0,g),ar=grp(.4,1.4,0,g);[al,ar].forEach(a=>box(.14,.62,.15,jacke,0,-.3,0,a));
  g.userData.bl=bl;g.userData.br=br;g.userData.al=al;g.userData.ar=ar;return g}
function gehen(g,t,v){const s=Math.sin(t*v)*.7,u=g.userData;u.bl.rotation.x=s;u.br.rotation.x=-s;u.al.rotation.x=-s*.8;u.ar.rotation.x=s*.8}
/* Hund (schaut nach +x). Bewegt: g.userData.bein[4], g.userData.sw (Schwanz) */
function hund(par,fell,hell,ohr,fest){const g=grp(0,0,0,par);if(!fest)g.userData.keep=1;
  sph(.5,fell,0,.95,0,g,1.45,.72,.68);sph(.3,hell,.3,.8,0,g,1,.7,.95);sph(.3,fell,.72,1.2,0,g,.75,1.1,.7);
  const kopf=grp(.9,1.38,0,g);sph(.3,fell,0,0,0,kopf);box(.34,.2,.22,hell,.3,-.07,0,kopf);sph(.06,K.schwarz,.49,-.01,0,kopf);
  [-1,1].forEach(s=>{sph(.045,K.schwarz,.2,.1,s*.14,kopf);const o=box(.1,.3,.12,ohr,-.02,-.04,s*.25,kopf);o.rotation.x=s*.25});
  const bein=[[.5,.24],[.5,-.24],[-.5,.24],[-.5,-.24]].map(p=>{const l=grp(p[0],.62,p[1],g);box(.15,.62,.15,fell,0,-.31,0,l);return l});
  const sw=grp(-.72,1.1,0,g);box(.5,.1,.1,fell,-.25,.12,0,sw).rotation.z=.5;g.userData.bein=bein;g.userData.sw=sw;g.userData.kopf=kopf;return g}
function hundGeh(g,t,v){const s=Math.sin(t*v)*.65,b=g.userData.bein;b[0].rotation.z=s;b[3].rotation.z=s;b[1].rotation.z=-s;b[2].rotation.z=-s;g.userData.sw.rotation.y=Math.sin(t*13)*.5}
/* Skateboard mit Kind (Brett längs x) */
function skater(par,j,h,quer){const g=grp(0,0,0,par);g.userData.keep=1;const bd=grp(0,0,0,g);box(1.5,.09,.42,K.rot,0,.22,0,bd);[-.5,.5].forEach(x=>box(.14,.1,.34,K.grau,x,.13,0,bd));if(quer)bd.rotation.y=Math.PI/2;const k=kleinKind(g,j,h);k.position.y=.27;return g}
/* Gehen auf einem geschlossenen Linienzug (Tempo v); dreht weich; liefert die Animationsfunktion für bewegt2 */
function laufPfad(g,pts,v,off,hop){const P=pts.concat([pts[0]]),L=[];let tot=0;for(let i=0;i<P.length-1;i++){const l=Math.hypot(P[i+1][0]-P[i][0],P[i+1][1]-P[i][1]);L.push(l);tot+=l}let tl=null,yaw=null;
  return t=>{const dt=tl==null?0:Math.min(.1,Math.max(0,t-tl));tl=t;let s=(((t*v+(off||0))%tot)+tot)%tot,i=0;while(i<L.length-1&&s>L[i]){s-=L[i];i++}const a=P[i],b=P[i+1],f=L[i]>0?s/L[i]:0;
    const ty=Math.atan2(b[0]-a[0],b[1]-a[1]);if(yaw==null)yaw=ty;let d=ty-yaw;d=Math.atan2(Math.sin(d),Math.cos(d));yaw+=d*Math.min(1,dt*7);
    g.position.x=a[0]+(b[0]-a[0])*f;g.position.z=a[1]+(b[1]-a[1])*f;g.position.y=hop?Math.abs(Math.sin(t*9))*.1:0;g.rotation.y=yaw;if(g.userData.bl)gehen(g,t,v>2.4?11:8)}}
/* Rampe: Viertelkreis aus geneigten Platten, wächst von (x0,0) nach außen (s=+1 nach +x, -1 nach -x); w = Breite in z */
function viertel(g,x0,z,r,w,col,s){const n=5;let px=x0,py=0;
  for(let i=1;i<=n;i++){const a0=(i-1)/n*Math.PI/2,a=i/n*Math.PI/2,nx=x0+s*r*Math.sin(a),ny=r-r*Math.cos(a);stab(g,px,py,z,nx,ny,z,w,col,.22,false);
    const ym=r-r*Math.cos((a0+a)/2),bw=r*(Math.sin(a)-Math.sin(a0)),cx=x0+s*r*(Math.sin(a)+Math.sin(a0))/2;[-1,1].forEach(q=>box(bw,ym,.14,K.grau,cx,ym/2,z+q*(w/2-.07),g));px=nx;py=ny}
  box(2.2,.24,w,col,x0+s*(r+1.1),r-.12,z,g);box(2.2,r-.24,w-.3,K.grau,x0+s*(r+1.1),(r-.24)/2,z,g);cyl(.07,w,K.hellgrau,x0+s*r,r+.02,z,g).rotation.x=Math.PI/2}
function halfpipe(g,x,z,L,r,w,col){box(L,.24,w,col,x,.12,z,g);viertel(g,x-L/2,z,r,w,col,-1);viertel(g,x+L/2,z,r,w,col,1)}
function leerRad(par,f){const g=grp(0,0,0,par);[-.85,.85].forEach(x=>cyl(.5,.1,K.schwarz,x,.5,0,g).rotation.x=Math.PI/2);box(1.9,.12,.12,f,0,.85,0,g);box(.1,.7,.1,K.grau,.85,.9,0,g);box(.5,.08,.2,K.schwarz,-.55,1.05,0,g);box(.12,.12,.7,K.grau,.85,1.25,0,g);return g}
/* Fahrradständer: Reihe von n Rädern, Räder zeigen nach -z, Reihe läuft in x-Richtung */
function radStaender(x,z,n,rot){const g=grp(x,0,z);g.rotation.y=rot||0;qb(n*1.2+.4,.07,.14,K.grau,0,.04,-1.1,g);for(let i=0;i<=n;i++)qb(.06,.5,.06,K.grau,-n*.6+i*1.2,.3,-1.1,g);
  for(let i=0;i<n;i++){const r=leerRad(g,BUNT[(i*3+Math.round(x))&7]);r.position.set(-n*.6+.6+i*1.2,0,0);r.rotation.y=Math.PI/2}kreis(x,z,n*.6+.6);return g}
/* Gaststuhl und liegende Gäste sind einfache Kästen; Popcorn und Dampf: weiße Kügelchen */
function dampf(x,y,z,n,hoch,sx){const pg=grp(x,y,z),pu=[];for(let i=0;i<n;i++)pu.push(sph(1,K.weiss,0,0,0,pg));bewegt(pg,t=>{pu.forEach((s,i)=>{const f=(t*.4+i/n)%1;s.position.set(Math.sin(t*1.5+i)*.08*hoch,f*hoch,0);s.scale.setScalar((sx||.12)*(.4+f*.9))})},x,z,60)}
const schiffX=t=>91+109*Math.sin(t*.08);
function weltBauen(){
FARBEN={boden:0x93c97a,pfad:0xe6dcc0,platz:K.platz};
WASSER=0x4aa3d8;
const boden=new THREE.Mesh(new THREE.PlaneGeometry(1200,1200),mat(FARBEN.boden));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
/* ---------- Straßen, Gehwege, Fluss, Gleise ---------- */
pfad(0,172,0,TORZ+2,7,FARBEN.pfad);pfad(0,TORZ+2,0,GRENZE.z0+4,7,K.platz);
pfad(-62,84,205,84,8,K.asph,.08);pfad(-150,84,-62,84,7,0xc4604f,.08);pfad(-205,-47,125,-47,8,K.asph,.08);pfad(-82,84,-82,-96,8,K.asph,.08);pfad(76,84,76,-96,8,K.asph,.08);
[[-62,205,78.8],[-62,205,89.2]].forEach(a=>pfad(a[0],a[2],a[1],a[2],2.4,K.platz));[[-205,125,-52.2],[-205,125,-41.8]].forEach(a=>pfad(a[0],a[2],a[1],a[2],2.4,K.platz));
[-87.2,-76.8].forEach(x=>pfad(x,84,x,-96,2.4,K.platz));[70.8,81.2].forEach(x=>pfad(x,84,x,-96,2.4,K.platz));
strich(-62,84,205,84);strich(-205,-47,125,-47);strich(-82,84,-82,-96);strich(76,84,76,-96);
sperre(-150,84,205,84,5);sperre(-205,-47,125,-47,5);sperre(-82,84,-82,-96,5);sperre(76,84,76,-96,5);sperre(-215,134,-40,134,4);
/* Fluss mit Ufermauern; Kollision als Kreise (Lücken bei den Brücken) */
qb(440,.14,10,WASSER,0,.07,-103);qb(440,.5,.8,K.grau,0,.25,-97.6);qb(440,.5,.8,K.grau,0,.25,-108.4);
for(let x=-216;x<=216;x+=6){if(Math.abs(x)<12||Math.abs(x+30)<12)continue;kreis(x,-103,5.2)}
/* Gleise */
(function(){qb(176,.12,3.6,0x8c8a85,-128,.06,134);[-.8,.8].forEach(s=>qb(176,.2,.2,K.grau,-128,.22,134+s));for(let x=-214;x<-42;x+=1.8)SCHWELLEN.push([x,.14,134,.5,.12,2.8])})();
/* ---------- Stadttor und Bahnhofsplatz (Start) ---------- */
(function(){const gz=118;scheibe(0,128,17,K.platz,.1);
  [-1,1].forEach(s=>{const tx=s*9;qb(5,10,5,K.sand,tx,5,gz,scene,true);qk(3.9,3.8,K.ziegel,tx,11.9,gz);fen(tx,6,gz+2.57,.9,1.5);fen(tx,8.6,gz+2.57,.9,1.2);for(let i=0;i<3;i++)qb(1.2,.7,.5,K.grau,tx-1.6+i*1.6,10.35,gz+2.4);fahne(tx,gz,15,s>0?K.rot:K.blau,true);kBox(tx,gz,5,5);
    qb(21,5,2.4,K.sand,s*22,2.5,gz,scene,true);for(let i=0;i<7;i++)qb(1.8,.9,2.6,K.sand,s*(13.5+i*3),5.45,gz);kBox(s*22,gz,21,2.4)});
  qb(14,2.4,4.4,K.sand,0,8.6,gz,scene,true);tafel('Willkommen in der Stadt',0,8.6,gz+2.3,10,2.1);
  
  const t=toni(scene);t.position.set(-9,0,140);t.scale.setScalar(1.6);t.rotation.y=-Math.PI/2;lebendig.push({o:t,ph:0});kreis(-9,140,1.8);tafel('Ich bin Toni!',-9,1.5,143.5,3.4,.7,null,0,34);
  wegweiserN(-7,134,['Marktplatz','Rathaus','Hafen'],0);wegweiserN(7,134,['Bahnhof','Kaufhaus','Kino'],0);
  laterne(-5,112);laterne(5,112);laterne(-5,148);laterne(5,148);bank(-12,146,0);bank(12,146,0);bank(-12,112,Math.PI);bank(12,112,Math.PI);eimer(-6,126);eimer(6,126);
  beet(-14,134,4,20);beet(15,148,4,18);kuebel(-10,150);kuebel(10,150);baeumchen(-18,142,1);baeumchen(19,126,1.1);parken(K.gelb,-15,126,Math.PI/2);parken(K.weiss,16,132,Math.PI/2);
  for(let i=0;i<3;i++)tier(taube,-3+i*3.5,144+i%2*2,0,150,.32,0)})();
/* ---------- Marktplatz ---------- */
(function(){scheibe(0,22,18,0xcdbfa0,.1);brunnen(-9,24,.8,6);
  function stand(x,z,rot,fa,text,ware){bude(x,z,rot,5.2,fa,K.weiss,text);const s=rot?-1:1;ware(x,z+.9*s,s)}
  stand(-13,10,0,K.rot,'Obst',(x,z,s)=>{for(let i=0;i<9;i++)qs(.22,[K.rot,K.gelb,K.gruen,K.orange][i%4],x-2+i*.5,1.2,z+(i%2)*.25);qb(.9,.4,.7,K.holz,x+2.3,.3,z+1.2*s);qs(.2,K.rot,x+2.3,.62,z+1.2*s)});
  stand(13,10,0,K.gelb,'Käse',(x,z,s)=>{for(let i=0;i<3;i++){qc(.45,.3,K.gelb,x-1.5+i*1.2,1.2,z);qs(.07,K.orange,x-1.5+i*1.2,1.2,z+.45*s)}qb(.9,.7,.8,K.gelb,x+2.2,.4,z+1.2*s)});
  stand(-13,36,Math.PI,K.rosa,'Blumen',(x,z,s)=>{for(let i=0;i<3;i++){qc(.3,.6,K.blau,x-1.6+i*1.3,1.3,z);for(let k=0;k<3;k++)qs(.2,BUNT[(i*3+k)%8],x-1.6+i*1.3+(k-1)*.2,1.8+(k%2)*.2,z)}});
  stand(13,36,Math.PI,K.gruen,'Gemüse',(x,z,s)=>{for(let i=0;i<8;i++)qs(.24,[K.orange,K.gruen,K.rot,K.gruen][i%4],x-1.9+i*.55,1.2,z+(i%2)*.2);qb(.9,.4,.7,K.holz,x+2.3,.3,z-1.2*s)});
  mast(-17,22,7);mast(17,22,7);wimpel(-17,6.8,22,17,6.8,22,14,1.2);girlande(-17,6.5,22,17,6.5,22,16,1.2,'warm');
  bank(-16,22,Math.PI/2);bank(16,22,-Math.PI/2);laterne(-8,12);laterne(8,12);laterne(-8,34);laterne(8,34);eimer(6,18);eimer(-6,28);kuebel(-6,14);kuebel(6,32);
  for(let i=0;i<4;i++)tier(taube,-6+i*3.5,26+(i%2)*3,-9,24,.32,0)})();
/* ---------- Rathaus mit Uhrturm ---------- */
(function(){scheibe(0,-24,15,K.platz,.1);const z0=-34;
  bau(0,z0,22,9,9,K.sand,K.ziegel,{n:5,et:2,tuer:false});kBox(0,-28.5,6,6);
  qb(6,20,6,K.sand,0,10,-28.5,scene,true);qk(4.6,7,0x4aa69a,0,23.5,-28.5);qc(.08,3,K.grau,0,27.8,-28.5);qb(1.4,.8,.06,K.rot,.8,28.6,-28.5);
  qc(1.9,.3,K.weiss,0,16,-25.45).rotation.x=Math.PI/2;[[0,1.5],[0,-1.5],[1.5,0],[-1.5,0]].forEach(p=>qb(.2,.3,.08,K.schwarz,p[0],16+p[1],-25.25));
  const mh=grp(0,16,-25.25),sh=grp(0,16,-25.25);qb(.12,1.5,.08,K.schwarz,0,.7,0,mh);qb(.16,1,.08,K.schwarz,0,.45,.04,sh);bewegt([mh,sh],t=>{mh.rotation.z=-t*.25;sh.rotation.z=-t*.25/12},0,-28,110);
  fen(0,11,-25.46,1.2,2.4);qb(2.4,3.6,.25,K.holz,0,1.8,-25.4);qb(7,.3,1.4,K.grau,0,.15,-24.5);qb(6,.3,1.4,K.grau,0,.45,-24.9);qb(1.4,1.7,.15,K.rot,0,6.4,-25.4);qb(1.4,.4,.2,K.gold,0,6.5,-25.38);
  tafel('Rathaus',0,8.6,-25.3,5,1,null,0,56);fahne(-9,-28,11,K.rot,true);fahne(9,-28,11,K.blau,true);
  [-6,6].forEach(x=>kasten(x*1.7,1.4,z0+4.7,2.4));laterne(-8,-16);laterne(8,-16);bank(-10,-14,0);bank(10,-14,0);eimer(-4,-12);eimer(4,-12);beet(-12,-22,3,14);beet(12,-22,3,14);baeumchen(-17,-16,1.1);baeumchen(17,-16,1.1);
  tier(taube,-7,-18,0,-14,.32,0);tier(taube,6,-20,0,-14,.32,0)})();
/* ---------- Kirche mit Glockenturm ---------- */
(function(){const cx=-52,cz=22,tz=cz+7;scheibe(cx,cz,14,K.platz,.1);
  qb(10,8,17,K.creme,cx,4,cz-3,scene,true);dach(cx,cz-3,10,17,8,K.ziegel,'z',4.5);kBox(cx,cz-3,10,17);
  qb(6,15,6,K.sand,cx,7.5,tz,scene,true);qb(6.8,.5,6.8,K.grau,cx,15.2,tz);kBox(cx,tz,6,6);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>qb(.8,4,.8,K.sand,cx+p[0]*2.9,17.4,tz+p[1]*2.9));qb(6.8,.6,6.8,K.sand,cx,19.7,tz);qk(4.4,9,K.dunkel,cx,24.5,tz);qb(.2,1.5,.2,K.gold,cx,29.7,tz);qb(.9,.2,.2,K.gold,cx,29.8,tz);
  qb(2.8,.25,.25,K.holz,cx,19.1,tz);const bell=grp(cx,19,tz);qk(.9,1.5,K.gold,0,-.9,0,bell);qs(.2,K.dunkel,0,-1.75,0,bell);bewegt(bell,t=>{bell.rotation.z=Math.sin(t*2.2)*.65},cx,tz,110);
  qc(1.4,.3,K.gold,cx,11,tz+3.1).rotation.x=Math.PI/2;qc(1.05,.35,K.blau,cx,11,tz+3.1).rotation.x=Math.PI/2;qb(2.6,4.4,.3,K.holz,cx,2.2,tz+3.1);qc(1.3,.3,K.holz,cx,4.4,tz+3.1).rotation.x=Math.PI/2;
  [-1,1].forEach(s=>{for(let i=0;i<3;i++)fen(cx+s*5.06,4.4,cz-9+i*4.5,.16,3.4,1.2)});tafel('Kirche',cx,13,tz+3.15,3.6,.8,null,0,50);
  baeumchen(cx-12,cz+4,1.1);baeumchen(cx+12,cz-6,1.1);baeumchen(cx-11,cz-10,1);bank(cx+9,cz+12,0);bank(cx-9,cz+12,0);laterne(cx-6,cz+14);laterne(cx+6,cz+14);beet(cx-10,cz+8,3,12);beet(cx+11,cz+6,3,12);kuebel(cx+4,cz+13)})();
/* ---------- Stadtbrunnen mit Tauben ---------- */
(function(){const cx=50,cz=22;scheibe(cx,cz,11,K.platz,.1);qc(5.6,.16,K.hellgrau,cx,.08,cz);brunnen(cx,cz,1.1,10);
  for(let i=0;i<4;i++){const a=i*1.57+.78;bank(cx+Math.cos(a)*8.6,cz+Math.sin(a)*8.6,Math.atan2(-Math.cos(a),-Math.sin(a)))}
  for(let i=0;i<9;i++){const a=i*.7+.2,r=6.4+(i%3)*.6;tier(taube,cx+Math.cos(a)*r,cz+Math.sin(a)*r,cx,cz,.3+(i%3)*.03,0)}
  [0,1,2].forEach(i=>{const g=fliegendeTaube(scene);g.scale.setScalar(.4);bewegt2(g,t=>{const a=t*.5+i*2.1,r=15+i*3;g.position.set(cx+Math.cos(a)*r,7+i*1.5+Math.sin(t*1.3+i),cz+Math.sin(a)*r);g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a));g.userData.anim(t)},110)});
  [[-9,-9],[9,-9],[-9,9],[9,9]].forEach((p,i)=>i%2?laterne(cx+p[0],cz+p[1]):kuebel(cx+p[0],cz+p[1]));baeumchen(cx+12,cz+9,1);baeumchen(cx-12,cz-8,1)})();
/* ---------- Bahnhof mit Gleisen und Zug ---------- */
(function(){const cx=-112,cz=126;scheibe(cx,cz,19,K.platz,.1);
  bau(cx,cz-9,30,8,6,K.ziegel,K.dunkel,{n:7,et:1,tuer:false});qb(2.6,3.4,.2,K.holz,cx,1.7,cz-4.9);qb(5.4,5,5.4,K.sand,cx,8.5,cz-9,scene,true);qk(3.9,3,K.ziegel,cx,12.5,cz-9);
  qc(1.7,.3,K.weiss,cx,8.5,cz-6.25).rotation.x=Math.PI/2;const mh=grp(cx,8.5,cz-6.1);qb(.1,1.3,.08,K.schwarz,0,.6,0,mh);bewegt(mh,t=>{mh.rotation.z=-t*.25},cx,cz,100);
  tafel('Bahnhof',cx,4.6,cz-4.75,8,1.3,'#e6f0ff',0,56);
  qb(34,.3,5,K.hellgrau,cx,.15,128.5);qb(34,.32,.4,K.gelb,cx,.16,130.8);qb(30,.3,4.4,K.blau,cx,5,127.5);for(let i=0;i<6;i++)qc(.15,5,K.grau,cx-13+i*5.2,2.5,126.2);
  bank(cx-9,127.4,0);bank(cx+2,127.4,0);bank(cx+12,127.4,0);eimer(cx+15,128);qb(3.2,2,.2,K.dunkel,cx+7,2.2,125.8);tafel('Abfahrt',cx+7,2.4,125.95,3,.6);tafel('Gleis 1',cx-14,3.4,129.6,2.4,.6);
  for(let i=0;i<3;i++){const k=kleinKind(scene,BUNT[(i*3)%8],HAUT[i]);k.position.set(cx-4+i*1.6,.3,128.8);k.rotation.y=0}
  for(let i=0;i<3;i++)tier(taube,cx-6+i*7,129.5,cx,134,.3,0);
  qb(20,7,8,K.grau,-32,3.5,134,scene,true);qs(9,0x6fb35a,-32,4,134,scene,1.4,.55,.9);qb(.4,5,3.8,K.schwarz,-42.1,2.6,134);kBox(-32,134,20,8);tafel('Tunnel',-42.4,6.2,134,3,.7,null,-Math.PI/2);
  wegweiserN(cx+20,140,['Bahnhofsplatz'],0);laterne(cx-16,138);laterne(cx+16,138);beet(cx-12,140,4,16);baeumchen(cx+17,119,1.1);
  const zug=zugM(scene,2);bewegt2(zug,t=>{const c=t%40;let x=-1000;if(c<6){const f=c/6;x=-232+(1-(1-f)*(1-f))*134}else if(c<13)x=-98;else if(c<19){const f=(c-13)/6;x=-98+f*f*76}if(x>-28)x=-1000;zug.position.set(x,0,134)},170)})();
/* ---------- Bushaltestelle ---------- */
(function(){const x=-45,z=93;scheibe(x,98,11,K.platz,.1);const g=grp(x,0,z);qb(6,.25,2.8,K.blau,0,3.4,0,g);[[-2.8,-1.2],[2.8,-1.2],[-2.8,1.2],[2.8,1.2]].forEach(p=>qc(.08,3.3,K.dunkel,p[0],1.65,p[1],g));qb(5.6,2.4,.1,K.himmel,0,1.9,-1.25,g);qb(3.4,.15,.7,K.holz,0,.6,-.7,g);qb(.15,.6,.5,K.dunkel,-1.5,.3,-.7,g);qb(.15,.6,.5,K.dunkel,1.5,.3,-.7,g);qb(1.3,1.8,.12,K.weiss,-2.5,1.7,-1.1,g);qb(1.1,.3,.14,K.gelb,-2.5,2.4,-1.1,g);g.rotation.y=Math.PI;kreisLinie(x-2.6,z,x+2.6,z,1.1,2);
  vschild('halt',x+5,90.8,0);tafel('Bushaltestelle',x,4.5,z+1.6,4.6,.85);laterne(x-6,92);eimer(x+4,94.5);kasten(x-6,.8,95,2.2);bank(x+2,99,0);bank(x-4,100,0);beet(x+7,100,3,10);baeumchen(x-9,103,1);
  for(let i=0;i<2;i++){const k=kleinKind(scene,BUNT[i*3+1],HAUT[i+1]);k.position.set(x-1.2+i*1.2,0,z-.4)}})();
/* ---------- Kreuzung mit Ampel, Zebrastreifen und Verkehrsschildern ---------- */
(function(){zebra(0,84,true);qb(.4,.03,3.6,K.weiss,5.7,.095,81.8);qb(.4,.03,3.6,K.weiss,-5.7,.095,86.2);
  ampelMast(6.8,78.8,Math.PI/2,0);ampelMast(-6.8,78.8,-Math.PI/2,0);ampelMast(6.8,89.2,Math.PI/2,Math.PI);ampelMast(-6.8,89.2,-Math.PI/2,Math.PI);
  vschild('vorfahrt',-14,91.8,0);vschild('tempo',-10,91.8,0);vschild('stop',10,91.8,0);vschild('fussgaenger',14,91.8,0);vschild('einfahrt',18,91.8,0);
  wegweiserN(5.5,93.5,['Marktplatz','Bahnhof','Hafen'],0);laterne(9,77);laterne(-9,91);eimer(12,78);bank(16,77.4,Math.PI);kuebel(-16,78)})();
/* ---------- Tankstelle und Werkstatt ---------- */
(function(){const cx=158,cz=118;scheibe(cx,cz,15,K.hellgrau,.1);
  qb(14,.5,8,K.rot,cx,5.2,cz,scene,true);qb(14.2,.2,8.2,K.weiss,cx,4.9,cz);[[-5.5,-3],[5.5,-3],[-5.5,3],[5.5,3]].forEach(p=>qc(.2,5,K.weiss,cx+p[0],2.5,cz+p[1],scene,true));
  [-3,3].forEach(s=>{qb(1.2,.2,6,K.grau,cx+s,.1,cz);[-1.6,1.6].forEach(q=>{qb(.8,1.8,.7,K.rot,cx+s,1,cz+q);qb(.5,.4,.1,K.schwarz,cx+s,1.5,cz+q+.4);qb(.12,.12,.7,K.schwarz,cx+s+.5,1.2,cz+q);kreis(cx+s,cz+q,.8)})});
  qc(.15,7,K.grau,168,3.5,112);qb(2.4,3,.4,K.weiss,168,7,112);qb(2,.5,.45,K.rot,168,8.1,112);qb(2,.5,.45,K.gelb,168,6,112);tafel('Tanken',168,6.9,112.25,2.2,.6);kreis(168,112,.5);
  bau(158,107,10,5,4,K.weiss,K.rot,{flach:true,n:3,tuerF:K.blau});tafel('Shop',158,3.6,109.65,3,.7);
  bau(144,106,12,8,6,K.hellgrau,K.dunkel,{flach:true,tuer:false,fenster:false});[141.5,148].forEach(x=>{qb(4,3.8,.2,K.schwarz,x,1.9,110.1);qb(4.4,.4,.25,K.orange,x,4,110.1)});tafel('Werkstatt',144,6,110.2,6,1.1,null,0,52);
  const c=pkw(scene,K.blau);c.position.set(138,.8,116);c.rotation.y=Math.PI/2;bewegt2(c,t=>{c.position.y=.8+(Math.sin(t*.6)+1)*1.1},100);[136.7,139.3].forEach(x=>qc(.12,3.4,K.gelb,x,1.7,116));kreis(138,116,1.8);
  for(let i=0;i<4;i++)qc(.55,.5,K.schwarz,150,.25+i*.5,114);kreis(150,114,.7);qc(.4,.9,K.blau,152,.45,114.5);qc(.4,.9,K.blau,152.9,.45,113.8);kreis(152.5,114,.9);
  parken(K.gruen,170,126,0);laterne(146,126);laterne(170,108);eimer(165,112);beet(146,132,3,10)})();
/* ---------- Fahrradstraße ---------- */
(function(){[-135,-108,-80].forEach(x=>{[-.9,.9].forEach(s=>qc(.45,.03,K.weiss,x+s,.095,84));qb(1.8,.03,.12,K.weiss,x,.095,84)});qb(88,.03,.2,K.weiss,-106,.095,80.4);qb(88,.03,.2,K.weiss,-106,.095,87.6);
  vschild('rad',-146,90.6,0);vschild('rad',-70,90.6,0);
  bau(-108,69,10,5,4.5,K.tuerkis,K.gelb,{flach:true,n:3});tafel('Fahrräder',-108,3.9,71.65,5.6,1);
  for(let i=0;i<5;i++){const r=radler(scene,BUNT[i],true);r.position.set(-113+i*1.2,0,75);r.rotation.y=Math.PI/2}qb(.1,.5,6.2,K.grau,-110,.3,75);kreis(-110,75,2.4);
  [0,1,2,3].forEach(i=>{const g=radler(scene,BUNT[(i*2+1)%8]),v=5+i*.8,lo=-146,hi=-68;bewegt2(g,t=>{const u=(t*v/(hi-lo)+i*.27)%2,f=u<1?u:2-u;g.position.set(lo+f*(hi-lo),0,u<1?86:82);g.rotation.y=u<1?0:Math.PI;g.userData.anim(t)},110)});
  laterne(-130,91);laterne(-86,91);bank(-120,92,Math.PI);bank(-96,92,Math.PI);baeumchen(-140,94,1.1);baeumchen(-78,96,1.1);beet(-125,76,3,10);eimer(-100,92)})();
/* ---------- Hafen am Fluss ---------- */
(function(){const cx=130;qb(46,.12,15,0xb8b4a8,cx,.06,-90.5);for(let x=110;x<=150;x+=6)qc(.3,.5,K.dunkel,x,.3,-96.6);
  [[114,-92,2],[121,-92,3],[114,-87.5,1],[121,-87.5,2]].forEach((s,i)=>{for(let k=0;k<s[2];k++)qb(5.8,2.4,2.4,BUNT[(i*3+k*2)%8],s[0],1.3+k*2.4,s[1],scene,k===0);kBox(s[0],s[1],5.8,2.4)});
  bau(145,-84,14,8,6,K.hellgrau,K.blau,{flach:true,fenster:false,tuer:false});qb(3,3.6,.2,K.orange,145,1.8,-79.9);tafel('Hafen',145,5,-79.8,5,1.2,null,0,56);
  kranBauen(130,-94,15,17,K.orange,110);
  [112,121].forEach((x,i)=>{const g=grp(x,0,-100.4);qs(1,K.rot,0,.3,0,g,1.8,.4,.75);qk(.6,1,K.rot,1.9,.3,0,g).rotation.z=-Math.PI/2;qc(.09,3.4,K.holz,0,1.8,0,g);qk(1.1,2.6,K.weiss,.5,1.8,0,g);bewegt(g,t=>{g.position.y=Math.sin(t*1.5+x)*.08;g.rotation.z=Math.sin(t*1.1+x)*.05},x,-101,90)});
  const sh=schiff(scene);bewegt2(sh,t=>{const x=schiffX(t),v=Math.cos(t*.08);sh.position.set(x,.1+Math.sin(t*2)*.05,-105.5);sh.rotation.y=v>0?0:Math.PI},170);
  laterne(108,-96);laterne(150,-87);eimer(125,-84);baeumchen(110,-82,1)})();
/* ---------- Flussbrücke und Zugbrücke ---------- */
(function(){scheibe(-15,-98,6,K.platz,.1);
  qb(9,.5,12.4,K.grau,-30,.45,-103,scene,true);[-1,1].forEach(s=>{sperrLinie(-30+s*4.2,-109.2,-30+s*4.2,-96.8,.25);qb(.5,1.1,12.4,K.sand,-30+s*4.2,1.25,-103);qb(.8,1.8,.8,K.sand,-30+s*4.2,1.3,-97.3);qb(.8,1.8,.8,K.sand,-30+s*4.2,1.3,-108.7)});tafel('Flussbrücke',-30,3.3,-96.6,5,.9);laterne(-35,-96);laterne(-25,-110);
  [[-1,-97.2],[1,-97.2],[-1,-108.8],[1,-108.8]].forEach(p=>{qb(1.6,8,1.6,K.ziegel,p[0]*5.6,4,p[1],scene,true);qk(1.5,2,K.dunkel,p[0]*5.6,9,p[1]);kreis(p[0]*5.6,p[1],1.1)});
  tafel('Zugbrücke',0,10.8,-96.4,4.8,.9);
  const mk=(pz,s)=>{const g=grp(0,.45,pz);qb(9,.5,5.3,K.dunkel,0,0,s*2.65,g,true);[-1,1].forEach(q=>qb(.4,.9,5.3,K.rot,q*4.2,.7,s*2.65,g));return g},sl=mk(-97.6,-1),nl=mk(-108.4,1);
  bewegt([sl,nl],t=>{const f=Math.max(0,Math.min(1,(30-Math.abs(schiffX(t)))/12)),w=f*f*(3-2*f)*1.15;sl.rotation.x=w;nl.rotation.x=-w},0,-103,130);
  const ang=kleinKind(scene,K.gruen,HAUT[1]);ang.position.set(-20,.2,-96.4);stab(scene,-20,1.3,-96.4,-17,3,-100,.06,K.holz);stab(scene,-17,3,-100,-17,.4,-100.2,.02,K.weiss);const bo=qs(.18,K.rot,-17,.2,-100.2);bewegt(bo,t=>{bo.position.y=.2+Math.sin(t*2)*.05},-17,-100,80);
  bank(-18,-93.8,0);bank(-8,-93.8,0);laterne(-12,-94.5);baeumchen(-22,-92,1);eimer(-14,-93.5);beet(-10,-92,3,10)})();
/* ---------- Feuerwache ---------- */
(function(){const cx=-55;scheibe(cx,-26,15,K.hellgrau,.1);
  bau(cx,-33,18,9,7.5,K.rot,K.dunkel,{flach:true,tuer:false,fenster:false});qb(18.2,.5,9.2,K.weiss,cx,5.6,-33);[-5.5,5.5].forEach(x=>{qb(5,4.6,.2,K.schwarz,cx+x,2.4,-28.4);qb(5.6,.4,.25,K.weiss,cx+x,4.8,-28.4);qb(5,1.1,.3,K.grau,cx+x,4.1,-28.35);fen(cx+x,6.8,-28.4,3,1.1)});
  tafel('Feuerwache',cx,6.7,-28.3,7,1.2,null,0,52);
  qb(4,16,4,K.rot,-67,8,-34,scene,true);qb(4.6,.6,4.6,K.dunkel,-67,16.3,-34);fen(-67,12,-31.95,1,2.2);fen(-67,7,-31.95,1,2.2);qb(.5,6,.2,K.gelb,-67,11,-31.9);qb(.5,6,.2,K.gelb,-65.8,11,-31.9);kBox(-67,-34,4,4);
  const t=feuerwehr(scene);t.position.set(cx,0,-19);t.rotation.y=-Math.PI/2;lebendig.push({o:t,ph:0});kreis(cx,-19,3.4);
  [-10,10].forEach(x=>{qc(.3,.9,K.rot,cx+x,.45,-20);qs(.3,K.rot,cx+x,1,-20);kreis(cx+x,-20,.5)});
  tafel('Notruf 112',cx+12,2.4,-26,2.6,.8);fahne(cx-10,-27,10,K.rot,true);laterne(cx-12,-14);laterne(cx+12,-14);eimer(cx+9,-16);beet(cx-12,-20,3,12)})();
/* ---------- Polizeiwache ---------- */
(function(){const cx=55;scheibe(cx,-26,14,K.hellgrau,.1);
  bau(cx,-32,16,8,6.5,K.weiss,K.blau,{flach:true,n:4,et:2,tuerF:K.blau});qb(16.2,1.2,8.2,K.blau,cx,5.5,-32);tafel('Polizei',cx,5.5,-27.85,6.4,1.1,'#dbe9ff',0,56);leucht(scene,cx,3.9,-27.7,.4,MBLAU);
  const w=polizeiAuto(scene);w.position.set(cx,0,-19);w.rotation.y=-Math.PI/2;lebendig.push({o:w,ph:0});kreis(cx,-19,2.4);
  for(let i=0;i<2;i++){const r=radler(scene,K.blau,true);r.position.set(cx-9,0,-22+i*1.2);r.rotation.y=Math.PI/2}
  qb(1.6,2.4,.3,K.blau,cx+9,1.6,-24);tafel('Notruf 110',cx+9,2.2,-23.8,1.5,.6);qc(.1,1.2,K.grau,cx+8.2,.6,-24);qc(.1,1.2,K.grau,cx+9.8,.6,-24);kreis(cx+9,-24,1);
  [[cx-12,-14],[cx+12,-14]].forEach(p=>{for(let i=0;i<3;i++)qc(.12,1,i%2?K.weiss:K.rot,p[0]+i*.9,.5,p[1]);kreis(p[0]+.9,p[1],1.2)});
  fahne(cx+10,-30,9,K.blau,true);laterne(cx-12,-22);laterne(cx+12,-12);bank(cx-6,-14,0);eimer(cx+6,-14)})();
/* ---------- Krankenhaus mit Landeplatz ---------- */
(function(){const cx=-110;scheibe(cx,-18,21,K.hellgrau,.1);
  bau(cx,-28,28,10,11,K.weiss,K.blau,{flach:true,n:7,et:3,tuerF:K.blau});qb(4.4,1.3,.3,K.rot,cx,9.6,-22.85);qb(1.3,4.4,.3,K.rot,cx,9.6,-22.85);
  qb(7,.4,3.4,K.blau,cx,3.8,-21.2);[-3,3].forEach(s=>qc(.15,3.6,K.grau,cx+s,1.8,-19.7));tafel('Krankenhaus',cx,5.6,-22.8,7,1.2,null,0,50);tafel('Notaufnahme',cx+9,2.7,-22.85,4,.8,'#ffd0d0');
  const rw=rettung(scene);rw.position.set(cx+14,0,-14);rw.rotation.y=-Math.PI/2;lebendig.push({o:rw,ph:0});kreis(cx+14,-14,3.2);
  scheibe(-124,-8,6,K.grau,.18);qc(5.4,.22,K.gelb,-124,.11,-8);qc(4.9,.24,K.grau,-124,.12,-8);qb(.6,.28,3.4,K.weiss,-125.3,.14,-8);qb(.6,.28,3.4,K.weiss,-122.7,.14,-8);qb(2.6,.28,.6,K.weiss,-124,.14,-8);
  const h=heli(scene);h.position.set(-124,.3,-8);h.rotation.y=Math.PI/2;lebendig.push({o:h,ph:0});kreis(-124,-8,2.6);tafel('Landeplatz',-124,2,-1.6,3.6,.7);
  fahne(cx-13,-20,11,K.blau,true);baeumchen(cx-19,-14,1.1);baeumchen(cx+16,-4,1.1);bank(cx-4,-12,0);bank(cx+4,-12,0);laterne(cx-8,-14);laterne(cx+8,-14);beet(cx-10,-14,3,12);beet(cx+12,-8,3,12);eimer(cx,-12)})();
/* ---------- Schule mit Schulhof ---------- */
(function(){const cx=-158;scheibe(cx,34,19,K.hellgrau,.1);
  bau(cx,24,28,9,8,K.gelb,K.ziegel,{n:7,et:2});tafel('Schule',cx,4.3,28.65,5,1.2,null,0,58);qb(3.4,4,3.4,K.sand,cx,10,24,scene,true);qk(2.6,2.8,K.ziegel,cx,13.4,24);qc(.9,.2,K.weiss,cx,10.5,25.75).rotation.x=Math.PI/2;
  for(let i=0;i<5;i++)qb(1.1,.03,1.1,BUNT[i],cx-9,.11,44+i*1.25);qb(1.1,.03,1.1,K.weiss,cx-9,.11,50.5);
  qc(.1,3.4,K.grau,cx+12,1.7,42);qb(1.6,1,.1,K.weiss,cx+12,3.5,41.9);const kb=new THREE.Mesh(new THREE.TorusGeometry(.38,.04,6,12),mat(K.orange));kb.rotation.x=Math.PI/2;kb.position.set(cx+12,3.1,42.45);scene.add(kb);kreis(cx+12,42,.5);
  for(let i=0;i<3;i++){const r=radler(scene,BUNT[i+3],true);r.position.set(cx-17,0,34+i*1.2);r.rotation.y=Math.PI/2}qb(.1,.5,4,K.grau,cx-17.6,.3,35.2);
  const kid=[0,1,2,3].map(i=>kleinKind(scene,BUNT[(i*2+1)%8],HAUT[i]));
  bewegt(kid,t=>{kid.forEach((k,i)=>{const ph=i<3?t*(.8+i*.05)+i*.9:t*.8+.55,a=ph,x=cx+Math.cos(a)*(i<3?8:7.5),z=45+Math.sin(a)*(i<3?5.5:5);k.position.set(x,Math.abs(Math.sin(t*9+i))*.12,z);k.rotation.y=Math.atan2(-Math.sin(a)*8,Math.cos(a)*5.5)})},cx,45,100);
  qb(2.2,2.6,2.2,K.rot,cx+4,1.3,50);qb(2.6,.2,2.6,K.gelb,cx+4,2.7,50);qk(1.8,1,K.rot,cx+4,3.3,50);qb(1.2,.15,3.6,K.blau,cx+4,1.2,52.3).rotation.x=-.55;kreis(cx+4,50,1.8);qb(3,.3,3,K.sand,cx-2,.15,52);kreis(cx-2,52,1.6);fahne(cx+16,30,10,K.rot,true);bank(cx-6,32,0);bank(cx+6,32,0);baeumchen(cx-17,46,1.2);baeumchen(cx+16,26,1.1);laterne(cx-14,32);laterne(cx+14,32);eimer(cx+3,31)})();
/* ---------- Bibliothek mit Lesegarten ---------- */
(function(){const cx=-104;scheibe(cx,26,14,K.platz,.1);scheibe(cx,33,8,0x7cc16a,.12);
  bau(cx,17,18,8,7,K.ziegel,K.dunkel,{flach:true,n:5,et:2});qb(6.4,.2,2.6,K.blau,cx,7.7,17);const p1=qb(3,.2,2.4,K.weiss,cx-1.5,8,17),p2=qb(3,.2,2.4,K.weiss,cx+1.5,8,17);p1.rotation.z=.22;p2.rotation.z=-.22;
  tafel('Bibliothek',cx,4.3,21.65,7,1.1,null,0,50);
  for(let i=0;i<3;i++){const a=2.4+i*.95;bank(cx+Math.cos(a)*5.5,33+Math.sin(a)*4.5*.8,Math.atan2(-Math.cos(a),-Math.sin(a)))}
  qb(1.6,2,.8,K.holz,cx+8,1,34);for(let i=0;i<8;i++)qb(.18,.5,.5,BUNT[i],cx+7.4+i*.17,.7+(i%2)*.8,34.1);qb(1.9,.2,1.1,K.rot,cx+8,2.1,34);kreis(cx+8,34,1);
  tafel('Lesegarten',cx,2.8,40.45,3.6,.8);baeumchen(cx-9,32,1.1);baeumchen(cx+10,28,1.1);baeumchen(cx-6,38,1);beet(cx-4,36,3,12);beet(cx+4,38,3,12);laterne(cx-10,24);laterne(cx+10,24);eimer(cx+6,24);
  for(let i=0;i<2;i++){const r=radler(scene,BUNT[i*4],true);r.position.set(cx-9,0,22+i*1.2);r.rotation.y=Math.PI/2}})();
/* ---------- Postamt ---------- */
(function(){const cx=140;scheibe(cx,22,12,K.platz,.1);
  bau(cx,14,14,8,6,K.gelb,K.dunkel,{flach:true,n:4,et:2,tuerF:K.rot});tafel('Post',cx,4,18.65,3.6,1,'#fff0a0',0,58);const hn=new THREE.Mesh(new THREE.TorusGeometry(.55,.12,6,12),mat(K.dunkel));hn.position.set(cx+3.8,3.9,18.2);scene.add(hn);
  [-8,8].forEach((o,i)=>{const x=cx+o,z=23;qb(1.2,1.5,.9,K.gelb,x,.85,z,scene,true);qc(.45,1.2,K.gelb,x,1.65,z).rotation.z=Math.PI/2;qb(.7,.1,.12,K.schwarz,x,1.3,z+.46);qs(.15,K.dunkel,x,1,z+.46);kreis(x,z,.8)});
  for(let i=0;i<4;i++)qb(1,.8,.8,K.holz,cx+4+i%2*1.1,.4+Math.floor(i/2)*.8,26);kreis(cx+4.5,26,1.2);
  const pa=postAuto(scene);pa.position.set(cx-6,0,29);pa.rotation.y=Math.PI/2;kreis(cx-6,29,2.4);
  fahne(cx-9,17,9,K.gelb,true);baeumchen(cx+10,28,1);laterne(cx-5,20);laterne(cx+7,20);bank(cx+2,30,0);eimer(cx+8,30)})();
/* ---------- Recyclinghof ---------- */
(function(){const cx=-170,cz=-70;scheibe(cx,cz,15,K.hellgrau,.1);zaun(cx,cz,14.5,44,Math.PI/2);
  [[-182,K.blau,'Papier'],[-176,K.gruen,'Glas'],[-170,K.gelb,'Plastik'],[-164,K.grau,'Restmüll']].forEach(b=>{qb(5,3,3,b[1],b[0],1.5,-78,scene,true);qb(4.4,.2,2.4,K.dunkel,b[0],3.05,-78);tafel(b[2],b[0],4.2,-76.4,4,.9,null,0,50);kBox(b[0],-78,5,3)});
  for(let i=0;i<8;i++)qb(.8,1.1,.8,[K.blau,K.gruen,K.gelb,K.grau][i%4],cx-9+i*1.3,.55,-62);kreisLinie(cx-9,-62,cx+1,-62,.7,1.2);
  const ma=muell(scene);ma.position.set(cx+3,0,-66);ma.rotation.y=.4;lebendig.push({o:ma,ph:0});kreis(cx+3,-66,3.4);
  bau(-158,-74,5,4,3.4,K.sand,K.ziegel,{n:2,et:1});qk(2.2,2,K.grau,cx-8,1,-72);qk(1.8,1.5,K.gelb,cx-5,.8,-70);qs(1.1,K.gruen,cx-11,.7,-69);kreis(cx-8,-71,2.2);
  const wk=[0,1].map(i=>{const k=kleinKind(scene,K.orange,HAUT[i]);qs(.37,K.gelb,0,1.7,0,k,1,.7,1);return k});bewegt(wk,t=>{wk.forEach((k,i)=>{const a=t*.4+i*2.4;k.position.set(cx-6+Math.sin(a)*5,0,-66+Math.cos(a)*3);k.rotation.y=Math.atan2(Math.cos(a)*5,-Math.sin(a)*3)})},cx,-66,100);tafel('Recyclinghof',cx,3.2,-56,6.4,1.2,null,0,46);laterne(cx-10,-58);laterne(cx+10,-58)})();
/* ---------- Supermarkt mit Einkaufswagen ---------- */
(function(){const cx=100;scheibe(cx,115,17,K.hellgrau,.1);
  bau(cx,105,24,11,6.5,K.weiss,K.gruen,{flach:true,fenster:false,tuer:false});qb(24.2,1.6,11.2,K.gruen,cx,5.8,105);qb(17,3.4,.2,K.himmel,cx-2.5,2.1,110.6);qb(3.6,3.2,.25,K.dunkel,cx+9.5,1.7,110.65);qb(.3,3.4,.3,K.weiss,cx+7.5,1.7,110.7);
  tafel('Supermarkt',cx,5.8,110.7,10,1.4,'#ffffff',0,52);tafel('Kasse',cx+9.5,3.7,110.8,2.4,.6);
  for(let i=0;i<3;i++){qb(1.4,.6,1,K.holz,cx-9+i*2.2,.3,112.4);for(let k=0;k<5;k++)qs(.2,[K.rot,K.gelb,K.gruen][i],cx-9.4+i*2.2+k*.22,.75,112.4+(k%2)*.2)}
  for(let i=0;i<6;i++){const x=cx+2+i*1.3;qb(1.1,.1,.7,K.grau,x,.35,114);qb(1.1,.5,.7,K.grau,x,.75,114);qb(.1,.6,.7,K.dunkel,x-.55,1.1,114);qb(1,.15,.1,K.schwarz,x,.15,114)}
  qb(9,.2,2.6,K.blau,cx+5.7,2.2,114);[-4.2,4.2].forEach(s=>qc(.08,2.2,K.dunkel,cx+5.7+s,1.1,115.2));kreis(cx+5.7,114,.9);
  qb(30,.06,11,K.asph,cx,.13,126);for(let i=0;i<8;i++){qb(.12,.03,5,K.weiss,cx-14+i*4,.17,126)}[0,2,5,6].forEach((q,i)=>parken(BUNT[(i*3)%8],cx-12+q*4,126,Math.PI/2));
  fahne(cx+14,108,10,K.gruen,true);laterne(cx-12,111);laterne(cx+14,120);baeumchen(cx-14,132,1);baeumchen(cx+14,134,1);eimer(cx+12,112)})();
/* ---------- Bäckerei ---------- */
(function(){const cx=-32;scheibe(cx,62,10,K.platz,.1);bau(cx,57,9,6,5,K.sand,K.ziegel,{n:2,et:1,tx:-2.2});const g=grp(cx+1.5,0,59.5);markise(g,5,3.3,K.rot,K.weiss);
  qb(1,2,1,K.ziegel,cx+3,6.5,55,scene,true);const pg=grp(cx+3,7.6,55),pu=[0,1,2].map(i=>sph(1,K.weiss,0,0,0,pg));bewegt(pg,t=>{pu.forEach((s,i)=>{const f=(t*.35+i/3)%1;s.position.set(f*1.4,f*3.4,0);s.scale.setScalar(.25+f*.6)})},cx,57,80);
  tafel('Bäckerei',cx,4.1,60.15,5,.9,'#fff0c0');brezel(cx+3.6,4.1,60.3,.8);qb(2,.1,1,K.holz,cx-2.5,.9,62.8);[-.8,.8].forEach(s=>qc(.06,.9,K.holz,cx-2.5+s,.45,62.8));for(let i=0;i<4;i++)brezel(cx-3.2+i*.45,1.05,62.8,.18);kreis(cx-2.5,62.8,1.2);
  tafel('Frische Brötchen',cx+5.5,1.5,63.05,2.6,.7,null,0,34);kasten(cx+2.7,1.3,59.9,3);bank(cx-6,64,0);laterne(cx+6,58);eimer(cx-5,60)})();
/* ---------- Eisdiele ---------- */
(function(){const cx=34;scheibe(cx,62,10,K.platz,.1);bau(cx,57,9,6,5,K.rosa,K.weiss,{n:2,et:1,tx:0});
  const co=qk(1.1,3,K.sand,cx,8.4,57);co.rotation.x=Math.PI;qs(1.2,K.creme,cx,10.2,57);qs(1.1,K.braun,cx,11.2,57);qs(1.0,K.rosa,cx,12.1,57);qs(.3,K.rot,cx,13.1,57);
  const g=grp(cx,0,59.5);markise(g,6,3.3,K.tuerkis,K.weiss);tafel('Eisdiele',cx,4.1,60.15,5,.9,'#ffe0ec');
  tisch(cx-6,66,K.rosa);tisch(cx,67.5,K.tuerkis);tisch(cx+6,66,K.gelb);tafel('Eis 1 Euro',cx+5.5,1.2,61.2,2.4,.7,null,0,34);
  kasten(cx-3,1.3,59.9,3);laterne(cx-8,60);laterne(cx+8,60);eimer(cx+7,58);baeumchen(cx+9,66,.9)})();
/* ---------- Pizzeria mit Terrasse ---------- */
(function(){const cx=98;scheibe(cx,24,13,K.platz,.1);bau(cx,16,12,7,5,K.orange,K.ziegel,{n:3,et:1,tx:0});
  tafel('Pizzeria',cx,4.3,19.65,5,.9,'#fff0d8');qc(1,.2,K.sand,cx+4.6,3.6,19.7).rotation.x=Math.PI/2;qc(.85,.22,K.rot,cx+4.6,3.6,19.72).rotation.x=Math.PI/2;[[-.3,.2],[.3,.3],[0,-.35]].forEach(p=>qs(.14,K.dunkel,cx+4.6+p[0],3.6+p[1],19.9));
  qb(14,.2,8,K.holz,cx,.1,25.5);qb(14,.7,.1,K.holz,cx,.55,29.5);[-7,7].forEach(s=>qb(.1,.7,8,K.holz,cx+s,.55,25.5));
  tisch(cx-5,25,K.rot);tisch(cx,26.5,K.gruen);tisch(cx+5,25,K.weiss);tisch(cx-2.5,28.5,K.gruen);mast(cx-6.5,29.5,4.4,K.holz);mast(cx+6.5,29.5,4.4,K.holz);girlande(cx-6.5,4.3,29.5,cx+6.5,4.3,29.5,12,.6,'warm');girlande(cx-6.5,4.3,29.5,cx-6.5,4.3,20,6,.3,'warm');girlande(cx+6.5,4.3,29.5,cx+6.5,4.3,20,6,.3,'warm');
  kasten(cx-4,1.3,19.7,3);laterne(cx-9,20);laterne(cx+9,32);kuebel(cx+8,21);baeumchen(cx-10,30,1)})();
/* ---------- Kaufhaus-Block ---------- */
(function(){const cx=55;scheibe(cx,106,15,K.hellgrau,.1);bau(cx,99,26,12,13,K.tuerkis,K.dunkel,{flach:true,n:6,et:4,tuer:false});
  [-10,-5,5,10].forEach((x,i)=>{qb(4.2,2.6,.2,K.himmel,cx+x,1.6,105.15);qb(4.6,.2,.3,K.weiss,cx+x,3,105.2);qc(.25,1.4,BUNT[(i*2)%8],cx+x-.8,1.1,104.8);qs(.26,HAUT[i],cx+x-.8,2.1,104.8);qb(.6,.6,.6,BUNT[(i*2+3)%8],cx+x+.8,.8,104.8);qb(.5,.5,.5,BUNT[(i*2+5)%8],cx+x+1.4,.55,104.8)});
  qb(3.4,3.1,.2,K.dunkel,cx,1.55,105.15);[-.9,.9].forEach(q=>{qb(1.5,2.7,.1,K.himmel,cx+q,1.5,105.3);qb(.1,.5,.1,K.gold,cx+q*.25,1.5,105.4)});qc(1.3,2.8,K.himmel,cx,1.5,105.8);qb(.12,2.8,2.5,K.grau,cx,1.5,105.8);qb(5,.3,2.2,K.rot,cx,3.5,106.2);[-2.3,2.3].forEach(s=>qc(.08,3.4,K.grau,cx+s,1.7,107.2));
  tafel('Kaufhaus',cx,11.6,105.25,12,2.2,'#fff0d0',0,56);[-9,-4,4,9].forEach((x,i)=>qb(1.4,3.5,.1,BUNT[(i*2+1)%8],cx+x,8.3,105.2));
  parken(K.gelb,cx-17,112,0);laterne(cx-12,109);laterne(cx+12,109);bank(cx-7,110,0);bank(cx+7,110,0);kuebel(cx-3,110);kuebel(cx+3,110);eimer(cx+14,108);baeumchen(cx+16,114,1);baeumchen(cx-17,102,1)})();
/* ---------- Stadtpark mit Teich ---------- */
(function(){const cx=-56,cz=-72;scheibe(cx,cz,19,0x7cc16a,.1);weg([[cx,-53],[cx+7,-60],[cx-4,-68],[cx+5,-76],[cx-3,-84],[cx,-91]],3,K.platz,.06);weg(wellen(cx-17,cz,cx+17,cz),3,K.platz,.06);
  const te=qc(1,.14,WASSER,-52,.12,-70);te.scale.set(8,.14,5.5);for(let i=0;i<20;i++){const a=i/20*6.283;felsen(-52+Math.cos(a)*8.6,-70+Math.sin(a)*6.1,.35+rnd()*.25)}kreis(-52,-70,7.4);
  for(let i=0;i<7;i++){const a=3.5+i*.45;qk(.12,1.6,K.gruen,-52+Math.cos(a)*7.4,.8,-70+Math.sin(a)*5.2)}
  qb(5,.15,1.6,K.holz,-46.8,.3,-70);[-1,1].forEach(s=>qc(.1,.7,K.holz,-44.6,.3,-70+s*.7));
  const du=[0,1,2,3].map(i=>ente(scene));bewegt(du,t=>{du.forEach((e,i)=>{const a=t*(.18+i*.02)+i*1.6,x=-52+Math.cos(a)*(4.6+i%2*1.2),z=-70+Math.sin(a)*(3+i%2*.8);e.position.set(x,.2+Math.sin(t*2+i)*.03,z);e.rotation.y=Math.atan2(Math.cos(a)*3,Math.sin(a)*4.6)})},-52,-70,100);
  bank(-52,-61,Math.PI);bank(-52,-79.5,0);bank(-66,-72,Math.PI/2);bank(-38.5,-72,-Math.PI/2);
  qb(7,.2,7,K.platz,-70,.15,-82);[[-2.8,-2.8],[2.8,-2.8],[-2.8,2.8],[2.8,2.8]].forEach(p=>{qc(.14,3.6,K.holz,-70+p[0],1.8,-82+p[1],scene,true);kreis(-70+p[0],-82+p[1],.3)});qk(5.2,2.4,K.rot,-70,4.8,-82);qb(2.6,.15,.7,K.holz,-70,.7,-84.4);
  [[-72,-62],[-44,-84],[-64,-90],[-40,-62],[-72,-72],[-46,-90]].forEach((p,i)=>baeumchen(p[0],p[1],1.1+i%3*.15));beet(-44,-62,3,14);beet(-68,-62,3,14);beet(-60,-88,3,12);laterne(-48,-58);laterne(-64,-58);laterne(-40,-78);eimer(-54,-60);eimer(-60,-85);
  [0,1,2,3].forEach(i=>schmetterling(-56+(i-1.5)*8,-72+(i%2?8:-8),4,BUNT[(i*2+1)%8],i));tafel('Stadtpark',cx,2.4,-52.4,4.4,.9)})();
/* ---------- Spielplatz ---------- */
(function(){const cx=110,cz=60;scheibe(cx,cz,14,0xf4e3b0,.11);zaun(cx,cz,13.5,40,Math.PI/2);
  const ru=grp(cx-5,0,cz-6);box(2.2,.3,2.2,K.blau,0,3.2,0,ru,true);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(p=>box(.2,3.2,.2,K.gelb,p[0],1.6,p[1],ru));cone(1.8,1.2,K.rot,0,4.1,0,ru);stab(ru,0,3.1,1.1,0,.3,6,1.5,K.gelb,.2,true);for(let i=0;i<4;i++)box(1,.1,.1,K.holz,0,.6+i*.7,-1.15,ru);kreis(cx-5,cz-6,1.7);kreis(cx-5,cz,1.2);
  const sc2=grp(cx+6,0,cz+2);[-1,1].forEach(x=>cyl(.1,3.4,K.dunkel,x*2.4,1.7,0,sc2,true));cyl(.08,5,K.dunkel,0,3.4,0,sc2).rotation.z=Math.PI/2;
  const sitze=[-1,1].map(x=>{const p=grp(x*1,3.4,0,sc2);cyl(.03,2,K.grau,-.5,-1,0,p);cyl(.03,2,K.grau,.5,-1,0,p);box(1.2,.12,.5,x>0?K.rot:K.gruen,0,-2,0,p,true);return p});
  bewegt(sitze,t=>{sitze[0].rotation.z=Math.sin(t*1.6)*.35;sitze[1].rotation.z=Math.sin(t*1.6+1.5)*.35},cx+6,cz+2,80);kreis(cx+3.6,cz+2,.4);kreis(cx+8.4,cz+2,.4);
  const wi=grp(cx-2,0,cz+8);cyl(.3,.6,K.grau,0,.3,0,wi);const pl=box(4.6,.15,.5,K.gelb,0,.8,0,wi,true);bewegt(pl,t=>{pl.rotation.z=Math.sin(t*1.3)*.18},cx-2,cz+8,80);kreis(cx-2,cz+8,.6);
  const kr=grp(cx+1,.4,cz-3);cyl(1.9,.2,K.rot,0,0,0,kr,true);[0,1].forEach(i=>{const b=box(.1,1,3.6,K.blau,0,.6,0,kr);b.rotation.y=i*1.57});bewegt(kr,t=>{kr.rotation.y=t*.9},cx+1,cz-3,80);kreis(cx+1,cz-3,2);
  qb(5,.3,.3,K.holz,cx+9,.2,cz-8);qb(5,.3,.3,K.holz,cx+9,.2,cz-12);qb(.3,.3,4,K.holz,cx+11.5,.2,cz-10);qb(.3,.3,4,K.holz,cx+6.5,.2,cz-10);qb(4.7,.25,3.7,0xf0d890,cx+9,.12,cz-10);kreis(cx+9,cz-10,2.8);
  const kid=[0,1,2].map(i=>kleinKind(scene,BUNT[i*3],HAUT[i]));bewegt(kid,t=>{kid.forEach((k,i)=>{const a=t*(.7+i*.1)+i*2.1,x=cx+Math.cos(a)*4,z=cz+8+Math.sin(a)*2.2;k.position.set(x,Math.abs(Math.sin(t*8+i))*.1,z);k.rotation.y=Math.atan2(-Math.sin(a)*4,Math.cos(a)*2.2)})},cx,cz,90);
  bank(cx-9,cz+4,Math.PI/2);bank(cx+12,cz+4,-Math.PI/2);eimer(cx-8,cz+10);baeumchen(cx-11,cz-9,1);baeumchen(cx+11,cz+9,1);beet(cx-3,cz-10,3,10);tafel('Spielplatz',cx,2.4,cz+13.5,4.6,.9)})();
/* ---------- Schwimmbad ---------- */
(function(){const cx=-112,cz=-80;scheibe(cx,-76,17,K.platz,.1);
  qb(20,.4,10,0xdff0f8,cx,.2,cz);qb(18.4,.1,8.4,WASSER,cx,.45,cz);kBox(cx,cz,20,10);
  const sp=grp(cx+9,0,cz);qb(1.4,5.4,1.4,K.grau,0,2.7,0,sp,true);[1.8,3.4,5.2].forEach(y=>{qb(3.6,.2,1.6,K.weiss,-1.4,y,0,sp);qb(.1,.9,1.6,K.grau,-3.1,y+.45,0,sp)});for(let i=0;i<8;i++)qb(.1,.12,1,K.grau,.8,.6+i*.65,.9,sp);kreis(cx+9,cz,1.1);
  const rz=-80;qb(2,5.4,2,K.gelb,cx-12.4,2.7,rz,scene,true);stab(scene,cx-12.4,5.2,rz,cx-9.2,.7,rz,1.3,K.rot,.25,true);[-.7,.7].forEach(s=>stab(scene,cx-12.4,5.5,rz+s,cx-9.2,1,rz+s,.12,K.rot,.4));for(let i=0;i<8;i++)qb(.1,.12,.8,K.grau,cx-13.5,.6+i*.65,rz+1.1);kreis(cx-12.4,rz,1.4);
  const k=kleinKind(scene,K.gelb,HAUT[2]);bewegt2(k,t=>{const f=(t*.3)%1.5;if(f<1)k.position.set(cx-12.4+f*3.2,5.2-f*4.5,rz);else k.position.set(cx-12.4,-5,rz)},110);
  const sw=[0,1,2,3].map(i=>{const g=grp(0,0,0,scene);sph(.3,HAUT[i],0,.5,0,g);sph(.32,BUNT[(i*2)%8],0,.62,0,g,1,.6,1);return g});
  bewegt(sw,t=>{sw.forEach((g,i)=>{g.position.set(cx+Math.sin(t*.3+i*1.7)*(5+i%2),.05+Math.sin(t*2+i)*.06,cz-3+i*2);g.rotation.y=Math.cos(t*.3+i*1.7)>0?1.57:-1.57})},cx,cz,100);
  for(let i=0;i<4;i++){qb(.9,.2,2,i%2?K.rosa:K.gelb,cx-8+i*2.4,.4,-70.5);qb(.9,.5,.2,i%2?K.rosa:K.gelb,cx-8+i*2.4,.7,-69.6).rotation.x=.4}schirm(cx-6.5,-68,K.rot);schirm(cx+2.5,-68,K.blau);kreis(cx-6.5,-68,1.3);kreis(cx+2.5,-68,1.3);
  qb(1,.2,1,K.weiss,cx-3,2.2,-85.2);[-.4,.4].forEach(s=>qc(.06,2.2,K.weiss,cx-3+s,1.1,-85.2));
  bau(-100,-63,5,3.4,3.2,K.tuerkis,K.weiss,{flach:true,n:1,et:1});tafel('Schwimmbad',-112,3.8,-63,7,1.2,null,0,50);const rr=new THREE.Mesh(new THREE.TorusGeometry(.5,.14,6,12),mat(K.rot));rr.position.set(cx+6,1.6,-75.2);scene.add(rr);
  qb(24,1.4,.8,K.laub,cx,.7,-91);laterne(cx-9,-64);laterne(cx+9,-64);baeumchen(cx-15,-86,1);baeumchen(cx+15,-86,1);eimer(cx+3,-66)})();
/* ---------- Sportplatz ---------- */
(function(){const cx=155,cz=-128;scheibe(cx,cz,22,K.hellgrau,.08);const e1=qc(1,.1,K.ziegel,cx,.07,cz);e1.scale.set(22,.1,13.5);const e2=qc(1,.12,0x5fb04a,cx,.08,cz);e2.scale.set(18,.12,9.6);
  [[26,.2,0,-6.2],[26,.2,0,6.2]].forEach(l=>qb(l[0],.03,l[1],K.weiss,cx,.16,cz+l[3]));[-12.5,0,12.5].forEach(x=>qb(.2,.03,12.4,K.weiss,cx+x,.16,cz));const mk=new THREE.Mesh(new THREE.TorusGeometry(2.4,.07,4,20),mat(K.weiss));mk.rotation.x=Math.PI/2;mk.position.set(cx,.17,cz);scene.add(mk);
  [-1,1].forEach(s=>{const x=cx+s*12.9;[-1.8,1.8].forEach(q=>{qc(.1,2.4,K.weiss,x,1.2,cz+q);qb(1.8,.06,.06,K.weiss,x+s*.9,2.4,cz+q);qb(.06,.06,.06,K.weiss,x+s*1.8,.05,cz+q)});qb(.12,.12,3.8,K.weiss,x,2.4,cz);qb(.05,2.2,3.6,K.hellgrau,x+s*1.8,1.2,cz);qb(1.8,.04,3.6,K.hellgrau,x+s*.9,2.4,cz);kreis(x,cz-1.8,.4);kreis(x,cz+1.8,.4)});
  for(let k=0;k<3;k++)qb(18,.8,1.6,K.grau,cx,.4+k*.8,cz-16.5-k*1.5);qb(19,.3,5.5,K.blau,cx,5,cz-18.5);[-8,8].forEach(x=>qc(.15,5,K.grau,cx+x,2.5,cz-15));kBox(cx,cz-18,18,6);
  for(let i=0;i<9;i++){const k=i%3,x=cx-7+i*1.7,z=cz-16.5-k*1.5,y=.8+k*.8;qb(.5,.6,.4,BUNT[(i*3)%8],x,y+.3,z);qs(.28,HAUT[i%4],x,y+.9,z)}
  [-1,1].forEach(s=>{qc(.2,12,K.grau,cx+s*21,6,cz+16);qb(2.2,1.2,.4,K.dunkel,cx+s*21,12.3,cz+16);lampe(cx+s*21-.6,12.3,cz+16.3,'warm');lampe(cx+s*21+.6,12.3,cz+16.3,'warm');kreis(cx+s*21,cz+16,.4)});
  const ru=[0,1,2,3,4].map(i=>kleinKind(scene,BUNT[(i*2)%8],HAUT[i%4]));bewegt(ru,t=>{ru.forEach((k,i)=>{const a=-t*(.28+i*.03)+i*1.3;k.position.set(cx+Math.cos(a)*(19.5-i%2*1.4),Math.abs(Math.sin(t*10+i))*.1,cz+Math.sin(a)*(11.6-i%2*.9));k.rotation.y=Math.atan2(Math.sin(a)*19.5,-Math.cos(a)*11.6)})},cx,cz,120);
  const ball=qs(.3,K.weiss,cx,.4,cz);bewegt(ball,t=>{ball.position.set(cx+Math.sin(t*.6)*10,.4+Math.abs(Math.sin(t*1.8))*.3,cz+Math.sin(t*.9)*3)},cx,cz,100);
  tafel('Sportplatz',cx,2.4,cz+18,4.8,.9);fahne(cx-20,cz-14,9,K.rot,true);fahne(cx+20,cz-14,9,K.blau,true);bank(cx-8,cz+16,0);bank(cx+8,cz+16,0);eimer(cx,cz+16)})();
/* ---------- Kino ---------- */
(function(){const cx=100;scheibe(cx,-62,12,K.platz,.1);bau(cx,-68,14,8,9,K.lila,K.dunkel,{flach:true,fenster:false,tuer:false});
  qb(10,1.6,3,K.dunkel,cx,4.8,-62.2);tafel('KINO',cx,4.8,-60.65,8,1.3,'#ffe27a',0,64);for(let i=0;i<15;i++){lampe(cx-5+i*.714,5.7,-60.6,LART[i%4]);lampe(cx-5+i*.714,3.9,-60.6,LART[(i+2)%4])}
  [[-5.5,K.rot],[5.5,K.blau],[-5.5,K.gruen]].forEach((p,i)=>{if(i<2){qb(2.4,3.4,.15,p[1],cx+p[0],6.8,-63.9);qb(1.8,1.2,.2,K.gelb,cx+p[0],7.5,-63.8);qb(1.8,1.2,.2,K.weiss,cx+p[0],6.1,-63.8)}});
  qb(3.6,3,.2,K.schwarz,cx,1.5,-63.9);qb(3,.04,8,K.rot,cx,.1,-58);
  qb(2.6,2.6,2.2,K.tuerkis,cx+8,1.3,-57,scene,true);qb(1.6,1,.1,K.himmel,cx+8,1.6,-55.9);qb(1.8,.12,.6,K.holz,cx+8,1.05,-55.6);qb(3.2,.25,2.8,K.rot,cx+8,2.8,-57);tafel('Kasse',cx+8,2.9,-55.85,1.6,.5);kBox(cx+8,-57,2.6,2.2);
  qb(2,1,1.2,K.rot,cx-8,.8,-57,scene,true);qb(1.8,1.2,1,K.himmel,cx-8,2,-57);qb(2.2,.2,1.4,K.weiss,cx-8,2.7,-57);for(let i=0;i<6;i++)qs(.2,i%2?K.weiss:K.gelb,cx-8.6+i*.25,1.5,-57+(i%2)*.2);kreis(cx-8,-57,1.4);
  fahne(cx-7,-70,11,K.lila,true);laterne(cx-9,-53);laterne(cx+9,-53);bank(cx,-52,0);eimer(cx+4,-52);beet(cx-11,-62,2.5,10);beet(cx+11,-62,2.5,10)})();
/* ---------- Museum mit Dino-Skelett ---------- */
(function(){const cx=52;scheibe(cx,-70,15,K.platz,.1);bau(cx,-76,24,9,8.5,K.creme,K.sand,{flach:true,fenster:false,tuer:false});
  for(let i=0;i<6;i++){qc(.6,7.2,K.weiss,cx-10+i*4,3.6,-69.6,scene,true);kreis(cx-10+i*4,-69.6,.6)}qb(24.6,1.4,2,K.sand,cx,7.9,-69.6);qb(24.6,.8,1.6,K.sand,cx,8.9,-69.8);qb(16,.8,1.4,K.sand,cx,9.7,-69.9);qb(8,.8,1.2,K.sand,cx,10.5,-70);tafel('Museum',cx,7.9,-68.55,8,1.1,'#fff8e6',0,56);
  qb(26,.3,2,K.grau,cx,.15,-67.8);qb(24,.3,1.6,K.grau,cx,.45,-68.4);qb(9,5.4,.15,K.dunkel,cx,3.6,-71.4);[-1,1].forEach(s=>kreis(cx+s*11,-69.6,.7));kBox(cx,-76,24,9);
  const d=dinoBau(scene);d.position.set(cx,.3,-66.2);d.rotation.y=-.4;d.scale.setScalar(1);const nk=d.userData.nk;bewegt(nk,t=>{nk.rotation.z=Math.sin(t*.8)*.08},cx,-66,100);kreis(cx,-66.2,3.2);
  [-13.4,13.4].forEach((x,i)=>qb(1.5,5,.1,i?K.rot:K.blau,cx+x,4,-70.2));fahne(cx-14,-62,9,K.blau,true);fahne(cx+14,-62,9,K.rot,true);
  bank(cx-8,-62,0);bank(cx+8,-62,0);laterne(cx-11,-62);laterne(cx+11,-62);beet(cx-5,-64,2.5,10);beet(cx+5,-64,2.5,10);baeumchen(cx-14,-66,1.1);baeumchen(cx+14,-66,1.1)})();
/* ---------- Baustelle ---------- */
(function(){const cx=-110,cz=-130;scheibe(cx,cz,18,0xd9c9a0,.1);for(let i=0;i<14;i++){const x=cx-13+i*2;if(Math.abs(x-cx)<3.6)continue;qb(1.9,1.1,.12,K.orange,x,.55,-114.5);qb(1.9,.15,.14,K.weiss,x,.8,-114.5)}kreisLinie(cx-13,-114.5,cx-4.2,-114.5,.9,2);kreisLinie(cx+4.2,-114.5,cx+13,-114.5,.9,2);
  tafel('Achtung Baustelle',cx,2.8,-114.2,5.4,.9,'#ffd45e',0,34);
  kranBauen(cx+14,-142,24,22,K.gelb,130);
  const gx=cx-8,gz=-134;for(let k=0;k<3;k++){qb(12,.5,9,K.grau,gx,.25+k*3.6,gz);if(k<2)[[-5.5,-4],[5.5,-4],[-5.5,4],[5.5,4]].forEach(p=>qb(.6,3.1,.6,K.grau,gx+p[0],1.8+k*3.6,gz+p[1]))}qb(12,1.8,.5,K.ziegel,gx,1.15,gz+4);qb(.4,2.4,.4,K.holz,gx-4,5.5,gz+4);kBox(gx,gz,12,9);
  const bg=bagger(scene);bg.position.set(cx+6,0,-124);bg.rotation.y=-.6;lebendig.push({o:bg,ph:0});kreis(cx+6,-124,2.6);qk(3,2,0x9a7a52,cx+12,1,-123);qk(2,1.4,0xd9c068,cx-12,.7,-122);kreis(cx+12,-123,2.6);kreis(cx-12,-122,1.9);
  const mx2=grp(cx-2,0,-122);mx2.userData.keep=1;box(6,.8,2.4,K.schwarz,0,.5,0,mx2);rad4(mx2,[-2,2.3],.5,1.35);box(2,1.8,2.3,K.gelb,2.3,1.7,0,mx2,true);box(.1,.8,2,K.himmel,3.32,2.1,0,mx2);const sp=grp(-.8,2.1,0,mx2);const dru=cyl(1.2,3.6,K.orange,0,0,0,sp);dru.rotation.z=Math.PI/2;box(3.4,.15,.5,K.weiss,0,1.22,0,sp);box(3.4,.15,.5,K.weiss,0,-.6,1.06,sp);mx2.userData.anim=t=>{sp.rotation.x=t*1.4};lebendig.push({o:mx2,ph:0});kreis(cx-2,-122,3);
  qb(5,2.6,2.4,K.blau,cx-14,1.3,-142,scene,true);qb(1.2,1,.1,K.himmel,cx-15,1.6,-140.7);qb(1,2,.1,K.holz,cx-12.6,1,-140.75);kBox(cx-14,-142,5,2.4);
  for(let i=0;i<8;i++){qk(.35,.8,K.orange,cx-10+i*3.2,.4,-119+(i%2)*.8);qb(.5,.12,.5,K.weiss,cx-10+i*3.2,.5,-119+(i%2)*.8)}
  for(let i=0;i<3;i++)qc(.4,5,K.grau,cx+8,.4+i*.7,-136+(i%2)*.1).rotation.z=Math.PI/2;kreis(cx+8,-136,2.4);
  [[cx-4,-126],[cx+2,-130]].forEach((p,i)=>{const w=kleinKind(scene,K.orange,HAUT[i]);qs(.37,K.gelb,0,1.7,0,w,1,.7,1);w.position.set(p[0],0,p[1]);w.rotation.y=i?2:-1});
  lampe(cx-3,3,-114.6,'gelb');lampe(cx+3,3,-114.6,'gelb');eimer(cx-6,-117);baeumchen(cx+16,-118,1)})();
/* ---------- Wohnviertel ---------- */
(function(){const cx=170;pfad(150,58,190,58,4,K.platz);
  [[157.25,K.gelb],[163.75,K.rosa],[170.25,K.himmel],[176.75,K.orange]].forEach((h,i)=>{bau(h[0],46,6.4,7,7,h[1],i%2?K.ziegel:K.dunkel,{n:2,et:2,tuerF:BUNT[(i*2)%8]});qb(6,.7,.12,K.weiss,h[0],.35,50.5);kasten(h[0]+1.4,2.2,49.9,2);qb(.4,.5,.3,BUNT[i*2+1],h[0]-2.6,.9,50.6)});
  [[158,K.weiss],[170,K.tuerkis],[182,K.gelb]].forEach((h,i)=>{bau(h[0],70,6,6,5,h[1],i%2?K.dunkel:K.ziegel,{n:2,et:1,tuerF:BUNT[(i*3+1)%8]});qb(6,.7,.12,K.weiss,h[0],.35,73.5);qb(.4,.5,.3,BUNT[i*3],h[0]+2.4,.9,73.6)});
  [152,164].forEach(x=>qc(.08,3,K.holz,x,1.5,39));qb(12,.04,.04,K.dunkel,158,3,39);for(let i=0;i<5;i++){const g=grp(153+i*2.1,3,39);box(.9,1.1,.05,BUNT[(i*3)%8],0,-.6,0,g);bewegt(g,t=>{g.rotation.z=Math.sin(t*1.8+i)*.12},158,39,90)}
  parken(K.blau,188,60,Math.PI/2);parken(K.rot,152,62,Math.PI/2);for(let i=0;i<5;i++)baeumchen(150+i*10,56+(i%2)*3,.9);beet(165,62,4,16);beet(178,62,4,16);
  [0,1,2].forEach(i=>schmetterling(160+i*10,52,5,BUNT[(i*3+2)%8],i));laterne(155,58);laterne(185,58);tafel('Wohnviertel',cx,2.5,78.7,4.6,.9)})();
/* ========== Dichte-Runde (24.11.2026): neue Orte ========== */
/* ---------- Skatepark (Rampen, Halfpipe, Rails, Skater) ---------- */
(function(){const cx=-176,cz=-12,g=grp(cx,0,cz);
  qb(38,.12,28,K.hellgrau,0,.06,0,g);[-1,1].forEach(s=>{qb(38.6,.3,.3,K.grau,0,.15,s*14.1,g);qb(.3,.3,28,K.grau,s*19.1,.15,0,g)});
  halfpipe(g,-8,-8,6,2.8,7,K.blau);sperrKasten(cx-8,cz-8,16,7,0);
  viertel(g,11.5,-8,2.6,8,K.orange,1);sperrKasten(cx+13.9,cz-8,4.8,8,0);
  qb(3.6,.9,4,K.gelb,5,.45,-8,g);stab(g,.8,0,-8,3.2,.9,-8,4,K.orange,.2,false);stab(g,9.2,0,-8,6.8,.9,-8,4,K.orange,.2,false);[-1,1].forEach(q=>[2,8].forEach(x=>qb(2.4,.35,.14,K.grau,x,.17,-8+q*1.93,g)));
  [3.6,6.4].forEach(x=>qc(.05,.5,K.grau,x,1.15,-8,g));cyl(.06,3.6,K.rot,5,1.42,-8,g).rotation.z=Math.PI/2;sperrKasten(cx+5,cz-8,8.4,4,0);
  [-5,-1.5,2].forEach(x=>{qc(.06,.9,K.grau,x,.45,-1,g);kreis(cx+x,cz-1,.3)});cyl(.07,7.4,K.gelb,-1.5,.92,-1,g).rotation.z=Math.PI/2;
  qb(5,.5,.9,K.hellgrau,-12,.25,4,g);qb(5.02,.08,.2,K.gelb,-12,.5,3.6,g);sperrKasten(cx-12,cz+4,5,.9,0);
  for(let i=0;i<4;i++)qb(1,.3*(i+1),3.4,i%2?K.tuerkis:K.blau,9.5+i,.15*(i+1),6.5,g);stab(g,9,.95,8.3,13.6,1.95,8.3,.1,K.rot,.1,false);[[9,1],[13.6,2]].forEach(p=>{qc(.05,p[1],K.rot,p[0],p[1]/2,8.3,g);qc(.05,p[1],K.rot,p[0],p[1]/2,4.7,g)});stab(g,9,.95,4.7,13.6,1.95,4.7,.1,K.rot,.1,false);sperrKasten(cx+11.5,cz+6.5,5,3.6,0);
  qb(34,3.2,.4,K.grau,0,1.6,-13.4,g);for(let i=0;i<6;i++){const x=-14+i*5.6;qb(4.4,2.2,.06,BUNT[i],x,1.6,-13.15,g);qs(.7,BUNT[(i+4)%8],x+.5,1.9,-13.1,g,1,1,.1);qb(1.6,.3,.08,K.weiss,x-1,1.0,-13.1,g)}sperrKasten(cx,cz-13.4,34,.5,0);
  bank(cx-3,cz+12,0);bank(cx+3,cz+12,0);eimer(cx+6,cz+12);laterne(cx-18,cz+12);laterne(cx+18,cz+12);laterne(cx-18,cz-12);baeumchen(cx-21,cz+6,1);baeumchen(cx+21,cz+2,1.1);baeumchen(cx+21,cz-10,1);
  [0,1].forEach(i=>{const k=kleinKind(scene,BUNT[i*3+2],HAUT[i]);k.position.set(cx-3.6+i*7+i*.3,.35,cz+12)});
  {const r=grp(cx+15,0,cz+10);box(1.1,.1,.3,K.rot,0,.35,0,r);cyl(.04,1.1,K.grau,.5,.9,0,r);box(.04,.04,.5,K.grau,.5,1.45,0,r);[-.5,.5].forEach(x=>cyl(.15,.06,K.schwarz,x,.15,0,r).rotation.x=Math.PI/2);const k=kleinKind(r,K.gruen,HAUT[2]);k.position.set(.1,.3,.1);r.rotation.y=-.7;kreis(cx+15,cz+10,.6)}
  const s1=skater(scene,K.gruen,HAUT[1]);bewegt2(s1,t=>{const L=6,r=2.8,xx=Math.sin(t*.85)*(L/2+r*.9),q=Math.max(0,Math.abs(xx)-L/2),y=r-Math.sqrt(r*r-q*q),sl=Math.asin(Math.min(.95,q/r));s1.position.set(cx-8+xx,y+.02,cz-8+Math.sin(t*.4)*1.2);s1.rotation.z=Math.sign(xx)*sl},110);
  const cp=[];for(let i=0;i<16;i++){const a=i/16*6.283;cp.push([cx-4+Math.cos(a)*3.5,cz+8+Math.sin(a)*3.5])}const s2=skater(scene,K.rot,HAUT[0],true);bewegt2(s2,laufPfad(s2,cp,4.6,0),110);
  const s3=skater(scene,K.lila,HAUT[2],true);bewegt2(s3,laufPfad(s3,[[cx-13,cz+2.5],[cx+13,cz+2.5]],6.5,0),110)})();
/* ---------- Café mit Terrasse ---------- */
(function(){const cx=183,cz=2;bau(cx,cz,14,7,5.5,K.creme,K.braun,{flach:true,n:3,et:1,tuerF:K.rot});
  const aw=grp(cx,0,cz+3.5);markise(aw,12,3.5,K.rot,K.weiss);
  const ta=grp(cx-4,6.1,cz);qc(1.6,.2,K.rosa,0,0,0,ta);qc(1.05,1.5,K.weiss,0,.85,0,ta);qc(.95,.08,K.braun,0,1.62,0,ta);const hn=new THREE.Mesh(new THREE.TorusGeometry(.5,.14,6,12),mat(K.weiss));hn.position.set(1.15,.85,0);ta.add(hn);dampf(cx-4,7.9,cz,3,2.2,.35);
  qb(16,.22,8.4,K.holz,cx,.11,cz+7.7);const rz=cz+11.9;
  const rl=(x1,z1,x2,z2)=>{const n=Math.max(1,Math.round(Math.hypot(x2-x1,z2-z1)/1.6));for(let i=0;i<=n;i++)qc(.07,1,K.weiss,x1+(x2-x1)*i/n,.6,z1+(z2-z1)*i/n);stab(scene,x1,1.05,z1,x2,1.05,z2,.08,K.weiss,.08,false);stab(scene,x1,.6,z1,x2,.6,z2,.06,K.weiss,.06,false);sperrLinie(x1,z1,x2,z2,.2)};
  rl(175,rz,180.5,rz);rl(185.5,rz,191,rz);rl(175,cz+3.6,175,rz);rl(191,cz+3.6,191,rz);
  [[178,cz+6.4,K.rot],[188,cz+6.4,K.gelb],[178,cz+10,K.blau],[188,cz+10,K.gruen]].forEach((t,i)=>{tisch(t[0],t[1],t[2]);qc(.12,.14,K.weiss,t[0]+.3,1.07,t[1]);qc(.12,.14,K.weiss,t[0]-.3,1.07,t[1]+.2);
    [[1.1,0],[-1.1,0],[0,1.1]].forEach((p,k)=>{if((i+k)%2===0){const g=kleinKind(scene,BUNT[(i*3+k*2+1)%8],HAUT[(i+k)%4]);g.position.set(t[0]+p[0],.3,t[1]+p[1]);g.rotation.y=Math.atan2(-p[0],-p[1])}})});
  mast(175,rz,4.2,K.holz);mast(191,rz,4.2,K.holz);girlande(175,4.1,rz,191,4.1,rz,16,.7,'warm');kuebel(176,cz+4.6);kuebel(190,cz+4.6);
  const w=kleinKind(scene,K.weiss,HAUT[0]);box(.9,.05,.5,K.grau,.5,1.5,.2,w);qc(.1,.14,K.weiss,.5,1.6,.2,w);qc(.1,.14,K.rot,.8,1.6,.3,w);bewegt2(w,laufPfad(w,[[183,cz+4.5],[183,cz+8.2],[180.6,cz+8.2],[183,cz+8.2],[185.6,cz+8.2],[183,cz+8.2]],1.5,0,true),70);
  [0,1].forEach(i=>{const k=kleinKind(scene,BUNT[i*4+1],HAUT[i+1]);bewegt2(k,laufPfad(k,[[168+i*4,cz+17],[198-i*3,cz+17]],1.4,i*20,true),90)});
  radStaender(165,cz+2,3,Math.PI);laterne(172,cz+16);laterne(196,cz+16);bank(180,cz+18,Math.PI);baeumchen(200,cz+14,1.1);baeumchen(166,cz+12,1);beet(172,cz+10,3,12);beet(196,cz+8,3,12)})();
/* ---------- Einkaufsgasse mit vier kleinen Läden ---------- */
(function(){const z0=150,d=6,zf=z0+d/2;
  const laden=(x,h,wand,dach,tuer)=>{bau(x,z0,8,d,h,wand,dach,{flach:true,fenster:false,tuer:false});qb(4.2,2.2,.12,K.himmel,x-1.5,1.6,zf+.07);qb(1.7,2.6,.2,tuer,x+2.4,1.3,zf+.1);qb(.12,.12,.14,K.gold,x+2.9,1.3,zf+.22);qb(4.5,.12,.4,K.grau,x-1.5,.5,zf+.2);fen(x-2.8,4.5,zf+.07,1.2,1.4);fen(x+2.8,4.5,zf+.07,1.2,1.4);const a=grp(x,0,zf);return a};
  /* Apotheke */
  {const x=24;const a=laden(x,6.4,K.weiss,K.gruen,K.gruen);markise(a,8,3.2,K.gruen,K.weiss);qb(2.6,2.6,.12,K.weiss,x,5.3,zf+.1);qb(1.9,.55,.1,K.gruen,x,5.3,zf+.2);qb(.55,1.9,.1,K.gruen,x,5.3,zf+.2);
    for(let i=0;i<6;i++){const c=[K.gruen,K.weiss,K.blau,K.orange,K.gruen,K.rosa][i];qc(.14,.5,c,x-3.1+i*.5,.82,zf+.32);qs(.1,K.weiss,x-3.1+i*.5,1.12,zf+.32)}for(let i=0;i<3;i++)qb(.5,.35,.3,BUNT[i*2],x-1.2+i*.7,.72,zf+.4);qb(.6,1.5,.3,K.gruen,x-3.5,1.1,zf+.6);qb(.1,.6,.35,K.weiss,x-3.5,1.5,zf+.62)}
  /* Friseur */
  {const x=32;const a=laden(x,5.6,K.himmel,K.blau,K.blau);markise(a,8,3.2,K.blau,K.weiss);const px=x-3.7;qc(.22,.18,K.blau,px,.95,zf+.4);qc(.2,2,K.weiss,px,2,zf+.4);qc(.22,.18,K.blau,px,3.05,zf+.4);qs(.2,K.blau,px,3.2,zf+.4);
    const bd=[0,1,2,3].map(i=>qc(.215,.24,K.rot,px,1,zf+.4));bewegt(bd,t=>{bd.forEach((b,i)=>{b.position.y=1.05+((i*.5+t*.35)%2)*.95})},px,zf,60);
    qb(2.5,1.6,.1,K.blau,x+2.4,4.7,zf+.1);const s1=qb(.14,1.4,.08,K.grau,x+2.4,4.7,zf+.2);s1.rotation.z=.6;const s2=qb(.14,1.4,.08,K.grau,x+2.4,4.7,zf+.2);s2.rotation.z=-.6;[-.35,.35].forEach(o=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.2,.05,5,10),mat(K.weiss));r.position.set(x+2.4+o,4.1,zf+.22);scene.add(r)});
    qs(.55,K.holz,x-.3,1.9,zf+.15,scene,1,1.4,.2);qs(.5,K.hellgrau,x-.3,1.9,zf+.2,scene,1,1.4,.2);[0,1].forEach(i=>qs(.13,BUNT[i*3],x-2,1.2+i*.9,zf+.15))}
  /* Blumenladen */
  {const x=40;const a=laden(x,5.4,K.gelb,K.gruen,K.rosa);markise(a,8,3.2,K.rosa,K.weiss);
    for(let i=0;i<6;i++){const bx=x-3.6+i*1.3;qc(.36,.5,K.hellgrau,bx,.25,zf+1.5);for(let k=0;k<4;k++){const fh=.7+(k%2)*.3,fx=bx+(k-1.5)*.18;qc(.025,fh,K.gruen,fx,.5+fh/2,zf+1.5+(k%2)*.1);qs(.16,BUNT[(i*2+k)%8],fx,.5+fh,zf+1.5+(k%2)*.1)}}
    for(let i=0;i<3;i++)for(let k=0;k<5;k++)qs(.17,BUNT[(i*3+k)%8],x-2.8+k*.55,.95+i*.5,zf+.15);qs(.5,K.gelb,x+2.4,4.7,zf+.12,scene,1,1,.3);for(let i=0;i<6;i++){const a2=i*1.047;qs(.3,K.rosa,x+2.4+Math.cos(a2)*.7,4.7+Math.sin(a2)*.7,zf+.12,scene,1,1,.3)}
    [-1,1].forEach(s=>{qs(.35,K.gruen,x+s*3.9,3.2,zf+.5);qs(.2,BUNT[s>0?1:3],x+s*3.9,3.5,zf+.8)})}
  /* Buchladen */
  {const x=48;const a=laden(x,5.8,K.ziegel,K.dunkel,K.holz);markise(a,8,3.2,K.blau,K.weiss);
    for(let r=0;r<3;r++){qb(4,.08,.6,K.holz,x-1.5,.75+r*.8,zf+.35);for(let k=0;k<14;k++)qb(.22,.55+(k%3)*.08,.4,BUNT[(k*3+r)%8],x-3.2+k*.27,1.05+r*.8+(k%3)*.04,zf+.35)}
    qb(2.8,1.2,.14,K.braun,x+2.4,4.7,zf+.1);qb(1.2,.95,.1,K.weiss,x+1.75,4.7,zf+.2).rotation.z=.12;qb(1.2,.95,.1,K.weiss,x+3.05,4.7,zf+.2).rotation.z=-.12;
    for(let i=0;i<3;i++)qb(1.4,.2,1.0,BUNT[i*2+1],x-3.4,.1+i*.2+.1,zf+1.6)}
  pfad(16,158,58,158,5,K.platz);
  laterne(21,157);laterne(53,157);laterne(37,157);bank(30,160.6,Math.PI);bank(44,160.6,Math.PI);baeumchen(16,160,1);baeumchen(58,160,1);kuebel(35,155.8);kuebel(41,155.8);eimer(27,155.6);radStaender(52,156.5,3,0);
  [[26,K.rot],[35,K.blau],[47,K.gruen]].forEach((p,i)=>{const k=kleinKind(scene,p[1],HAUT[i]);k.position.set(p[0],0,157.2);k.rotation.y=Math.PI;qb(.3,.4,.15,BUNT[i*2+3],p[0]+.4,.9,157.3)});
  [0,1].forEach(i=>{const k=kleinKind(scene,BUNT[i*4+2],HAUT[i+1]);bewegt2(k,laufPfad(k,[[20,159.2],[54,159.2]],1.5,i*14,true),90)})})();
/* ---------- Hotel mit Dachterrasse ---------- */
(function(){const cx=112,cz=-26,zf=cz+5;scheibe(cx,-16,13,K.platz,.1);bau(cx,cz,14,10,27,K.sand,K.dunkel,{flach:true,n:4,et:7,tuer:false});
  qb(7.4,3.4,.2,K.himmel,cx,1.8,zf+.12);qb(7.6,.25,.3,K.dunkel,cx,3.6,zf+.2);[-3.6,3.6].forEach(s=>qb(.2,3.4,.3,K.dunkel,cx+s,1.8,zf+.2));for(let f=1;f<7;f++)qb(14.4,.28,.16,K.weiss,cx,3.857*f,zf+.05);
  const aw=grp(cx,0,zf+.1);markise(aw,7,4.4,K.rot,K.weiss);[-3.2,3.2].forEach(s=>{qc(.1,4.3,K.gold,cx+s,2.15,zf+2.3);kreis(cx+s,zf+2.3,.3)});qb(2.8,.05,7.4,K.rot,cx,.08,zf+3.7);
  for(let i=0;i<4;i++){const x=cx-1.8+i*1.2;qb(.7,.7,.1,K.gold,x,7,zf+.12);qb(.7,.7,.1,K.gold,x,7,zf+.13).rotation.z=Math.PI/4}
  const dr=grp(cx,0,zf+1.3);[-1,1].forEach(s=>qc(.07,2.8,K.grau,s*1.4,1.4,0,dr));qc(1.5,.2,K.dunkel,0,2.9,0,dr);qc(1.5,.06,K.hellgrau,0,.04,0,dr);const fl=grp(0,1.4,0,dr);[0,1].forEach(i=>{const b=box(2.7,2.6,.07,K.himmel,0,0,0,fl);b.rotation.y=i*1.57});bewegt(fl,t=>{fl.rotation.y=t*.7},cx,zf,70);
  [-5.5,5.5].forEach((s,i)=>{qc(.4,.7,K.holz,cx+s,.35,zf+1.5);kreis(cx+s,zf+1.5,.6);qc(.18,2.6,K.holz,cx+s,2,zf+1.5);for(let k=0;k<5;k++){const a=k*1.257,c=qk(.3,1.7,K.laub,cx+s+Math.cos(a)*.75,3.5,zf+1.5+Math.sin(a)*.75);c.rotation.z=-Math.cos(a)*1.0;c.rotation.x=Math.sin(a)*1.0}});
  const page=kleinKind(scene,K.rot,HAUT[1]);page.position.set(cx+4.2,0,zf+4);page.rotation.y=-.6;qb(1.5,.12,.9,K.gold,cx+5.7,.5,zf+4.6);[0,1].forEach(i=>qb(.9,.7,.4,BUNT[i*3+1],cx+5.4+i*.7,.95+i*.1,zf+4.6));qb(.08,1.1,.9,K.gold,cx+6.4,1,zf+4.6);kreis(cx+5.7,zf+4.6,1);
  const li=parken(K.schwarz,cx-10,-13,Math.PI/2);li.scale.x=1.3;fahne(cx-8,zf+1.5,9,K.rot,true);fahne(cx+8,zf+1.5,9,K.blau,true);laterne(cx-6,zf+7);laterne(cx+6,zf+7);bank(cx-9,zf+8,Math.PI);eimer(cx+9,zf+7);beet(cx-5,zf+9,3,12);beet(cx+5,zf+9,3,12);baeumchen(cx+13,-14,1.1);
  /* Dachterrasse entfernt: von keiner Kamera aus sichtbar */
})();
/* ---------- Hundewiese mit Agility-Geräten ---------- */
(function(){const cx=-180,cz=70;scheibe(cx,cz,13.6,0x7cc16a,.1);zaun(cx,cz,14,44,0);pfad(cx+13,cz,-152,83,3,K.platz);
  const tx=cx-5,tz=cz-6;qc(.9,4,K.blau,tx,.9,tz).rotation.z=Math.PI/2;[-1,1].forEach(s=>qc(.78,.06,K.dunkel,tx+s*2.03,.9,tz).rotation.z=Math.PI/2);[-1.4,0,1.4].forEach(o=>qc(.92,.3,K.gelb,tx+o,.9,tz).rotation.z=Math.PI/2);sperrKasten(tx,tz,4.2,1.9,0);
  [[cx+4,cz-8],[cx+6,cz+4]].forEach((p,i)=>{[-1,1].forEach(s=>{qc(.06,1.2,K.weiss,p[0],.6,p[1]+s*1.1);kreis(p[0],p[1]+s*1.1,.25)});qc(.05,2.2,i?K.blau:K.rot,p[0],1,p[1]).rotation.x=Math.PI/2;qc(.045,2.2,K.weiss,p[0],.6,p[1]).rotation.x=Math.PI/2});
  for(let i=0;i<6;i++){qc(.05,1.3,BUNT[i],cx-9+i*1.3,.65,cz+7);kreis(cx-9+i*1.3,cz+7,.2)}
  stab(scene,cx-1.8,.1,cz+10,cx,1.7,cz+10,1.6,K.gelb,.12,false);stab(scene,cx,1.7,cz+10,cx+1.8,.1,cz+10,1.6,K.gelb,.12,false);sperrKasten(cx,cz+10,3.8,1.6,0);
  [-1,1].forEach(s=>qc(.07,2.3,K.weiss,cx-8+s*1.1,1.15,cz-1));const ri=new THREE.Mesh(new THREE.TorusGeometry(.7,.13,6,14),mat(K.rot));ri.position.set(cx-8,1.3,cz-1);scene.add(ri);qb(2.6,.1,.3,K.weiss,cx-8,.05,cz-1);kreis(cx-9.1,cz-1,.25);kreis(cx-6.9,cz-1,.25);
  [0,1,2].forEach(i=>qs(.2,BUNT[i*3],cx+1+i*2.3,.22,cz-3+i%2*3));qc(.35,.15,K.blau,cx+11,.08,cz+2);
  bank(cx+9,cz+10,Math.PI*.8);bank(cx-11,cz+4,Math.PI/2);eimer(cx+11,cz-3);eimer(cx+12,cz+4);laterne(cx+15,cz-5);baeumchen(cx-12,cz-5,1.1);baeumchen(cx+6,cz-11,1);baeumchen(cx-6,cz+11,1);
  [[cx+9.5,cz-6,K.rot,K.orange,K.weiss,K.orange],[cx-10.5,cz-1,K.blau,K.schwarz,K.weiss,K.schwarz],[cx+8,cz+7,K.gruen,K.holz,K.sand,K.holz]].forEach((o,i)=>{const k=kleinKind(scene,o[2],HAUT[i]);k.position.set(o[0],0,o[1]);k.scale.setScalar(1.15);k.rotation.y=i*1.7+.5;const h=hund(scene,o[3],o[4],o[5],true);h.position.set(o[0]+1.2,0,o[1]+.5);h.rotation.y=-.5+i;h.scale.setScalar(.9)});
  const lauf=(pts,v,off,fell,hell,ohr,sprung)=>{const w=grp(0,0,0,scene);w.userData.keep=1;const d=hund(w,fell,hell,ohr);d.rotation.y=-Math.PI/2;const L=laufPfad(w,pts,v,off);bewegt2(w,t=>{L(t);hundGeh(d,t,v>4?15:11);if(sprung){const dz=Math.abs(w.position.z-sprung);w.position.y=dz<1.5?Math.cos(dz/1.5*Math.PI/2)*1.1:0}},75)};
  const c1=[];for(let i=0;i<14;i++){const a=i/14*6.283;c1.push([cx-1+Math.cos(a)*7,cz+1+Math.sin(a)*5])}lauf(c1,5,0,K.orange,K.weiss,K.holz);
  lauf([[cx-9,cz-8],[cx+9,cz-10],[cx+8,cz+2],[cx-6,cz+3]],4.2,6,K.schwarz,K.weiss,K.schwarz);
  lauf([[cx+4,cz-13],[cx+4,cz-3]],4.6,0,K.holz,K.sand,K.dunkel,cz-8)})();
/* ---------- Leuchtturm und Fähre ---------- */
(function(){const cx=174,cz=-90,top=18.5;scheibe(cx,cz,5.3,K.platz,.1);qc(4.4,.5,K.hellgrau,cx,.25,cz,scene,true);
  for(let i=0;i<6;i++)qc(3.1-i*.14,3.02,i%2?K.weiss:K.rot,cx,.5+1.5+i*3,cz,scene,true);
  [5,9,13,17].forEach(y=>{const r=3.1-Math.floor((y-.5)/3)*.14;fen(cx,y,cz+r,.5,.9)});qb(1.4,2.5,.3,K.holz,cx,1.75,cz+3.1);
  qc(2.9,.35,K.dunkel,cx,top+.2,cz);for(let i=0;i<14;i++){const a=i/14*6.283;qc(.05,.9,K.grau,cx+Math.cos(a)*2.75,top+.8,cz+Math.sin(a)*2.75)}const rg=new THREE.Mesh(new THREE.TorusGeometry(2.75,.05,4,20),mat(K.grau));rg.rotation.x=Math.PI/2;rg.position.set(cx,top+1.25,cz);scene.add(rg);
  for(let i=0;i<8;i++){const a=i/8*6.283;qc(.07,2.2,K.dunkel,cx+Math.cos(a)*1.3,top+1.3,cz+Math.sin(a)*1.3)}qc(1.5,.2,K.dunkel,cx,top+.45,cz);qk(2.1,1.5,K.rot,cx,top+3.2,cz);qs(.3,K.gold,cx,top+4.1,cz);
  const la=grp(cx,top+1.6,cz);leucht(la,0,0,0,.6,MGELB);const bm=new THREE.MeshBasicMaterial({color:0xfff2b0,transparent:true,opacity:.2,depthWrite:false,blending:THREE.AdditiveBlending});[1,-1].forEach(s=>{const b=new THREE.Mesh(gCone,bm);b.scale.set(4.5,26,4.5);b.position.set(s*13,0,0);b.rotation.z=s*Math.PI/2;la.add(b)});bewegt(la,t=>{la.rotation.y=t*.8},cx,cz,130);kreis(cx,cz,3.5);
  bau(cx-10,cz+3,6,5,3.8,K.weiss,K.rot,{n:2,et:1});qb(.8,1.6,.8,K.ziegel,cx-11.5,4.6,cz+2,scene,true);dampf(cx-11.5,5.5,cz+2,3,1.8,.3);
  for(let i=0;i<9;i++)felsen(cx-5+i*1.3,-94.2+(i%2)*.7,.8+(i%3)*.25);
  [[160,-94.4],[166,-94.6],[183,-94.5],[196,-94.3]].forEach((p,i)=>felsen(p[0],p[1],.7+i%2*.4));
  /* Anleger Ost */
  qb(12,.3,6,0xb8b4a8,188,.15,-94.8);[184,192].forEach(x=>{qc(.25,.5,K.dunkel,x,.55,-97);kreis(x,-97,.3)});laterne(194,-92);bank(186,-91.4,0);eimer(190,-91.6);
  [0,1].forEach(i=>{const k=kleinKind(scene,BUNT[i*3+2],HAUT[i]);k.position.set(188+i*1.2,.3,-95);k.rotation.y=Math.PI});
  [144,150].forEach(x=>{qc(.25,.5,K.dunkel,x,.55,-96.9)});
  const g=grp(0,0,0,scene);g.userData.keep=1;box(5.6,.9,2.4,K.blau,0,.45,0,g);[-1,1].forEach(s=>{box(1.7,.9,1.7,K.blau,s*2.8,.45,0,g).rotation.y=Math.PI/4});box(6,.2,2.4,K.weiss,0,.98,0,g);
  box(4.2,1.5,2,K.weiss,0,1.85,0,g);box(4.3,.5,2.05,K.himmel,0,2.0,0,g);box(4.6,.2,2.4,K.rot,0,2.7,0,g);box(1.6,.9,1.6,K.weiss,0,3.25,0,g);box(1.7,.4,1.7,K.himmel,0,3.3,0,g);box(1.9,.15,1.9,K.rot,0,3.8,0,g);
  cyl(.3,1,K.gelb,1.3,3.3,0,g);cyl(.32,.15,K.dunkel,1.3,3.85,0,g);cyl(.04,1.4,K.grau,-1.4,3.5,0,g);box(.6,.35,.04,K.rot,-1.1,3.95,0,g);
  [-1,1].forEach(s=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.25,.07,6,10),mat(K.orange));r.position.set(s*1.2,1.5,1.03);g.add(r)});
  [[-2.55,K.gruen],[2.55,K.rosa],[-2.7,K.gelb],[2.7,K.lila]].forEach((p,i)=>{box(.3,.5,.25,p[1],p[0],1.35,(i<2?.45:-.45),g);sph(.17,HAUT[i],p[0],1.75,(i<2?.45:-.45),g)});
  bewegt2(g,t=>{const u=t%24;let x=147;if(u>=4&&u<12)x=147+41*glatt((u-4)/8);else if(u>=12&&u<16)x=188;else if(u>=16)x=188-41*glatt((u-16)/8);g.position.set(x,.1+Math.sin(t*1.5)*.03,-99.6);g.rotation.z=Math.sin(t*1.1)*.025},140)})();
/* ---------- Tennisplatz ---------- */
(function(){const cx=194,cz=-124;sperrLinie(cx,cz-5.7,cx,cz+5.7,.2);qb(27,.08,14,K.gruen,cx,.05,cz);qb(22,.1,10.6,K.blau,cx,.1,cz);
  [-1,1].forEach(s=>{qb(22.2,.03,.12,K.weiss,cx,.17,cz+s*5.3);qb(.12,.03,10.7,K.weiss,cx+s*11,.17,cz);qb(22,.03,.1,K.weiss,cx,.17,cz+s*4);qb(.1,.03,8,K.weiss,cx+s*6.4,.17,cz)});qb(12.8,.03,.1,K.weiss,cx,.17,cz);
  [-1,1].forEach(s=>{qc(.07,1.2,K.grau,cx,.6,cz+s*5.7);kreis(cx,cz+s*5.7,.3)});qb(.05,.85,11.4,K.dunkel,cx,.65,cz);qb(.08,.12,11.4,K.weiss,cx,1.1,cz);
  const gt=(x1,z1,x2,z2)=>{const n=Math.max(1,Math.round(Math.hypot(x2-x1,z2-z1)/3));for(let i=0;i<=n;i++)qc(.06,3.2,K.grau,x1+(x2-x1)*i/n,1.6,z1+(z2-z1)*i/n);[.7,1.5,2.3,3.1].forEach(y=>stab(scene,x1,y,z1,x2,y,z2,.05,K.grau,.05,false));sperrLinie(x1,z1,x2,z2,.2)};
  gt(cx-13.5,cz-7,cx+13.5,cz-7);gt(cx-13.5,cz-7,cx-13.5,cz+7);gt(cx+13.5,cz-7,cx+13.5,cz+7);gt(cx-13.5,cz+7,cx-2,cz+7);gt(cx+2,cz+7,cx+13.5,cz+7);
  [[cx-1.6,cz-6.1],[cx+1.6,cz-6.1]].forEach(p=>{qc(.06,2.2,K.grau,p[0],1.1,p[1])});qb(1.2,.1,1.2,K.weiss,cx,2.3,cz-6.1);qb(1.2,.9,.1,K.weiss,cx,2.8,cz-6.6);[-1,1].forEach(s=>[-1,1].forEach(q=>qc(.05,2.3,K.weiss,cx+s*.5,1.15,cz-6.1+q*.5)));const ur=kleinKind(scene,K.weiss,HAUT[1]);ur.position.set(cx,2.35,cz-6.1);ur.scale.setScalar(.75);
  bank(cx-8,cz+9,Math.PI);bank(cx+8,cz+9,Math.PI);eimer(cx+11,cz+9);laterne(cx-14,cz+9);baeumchen(cx-16,cz-5,1.1);baeumchen(cx+16.5,cz+8,1);
  const sp=(i,fa)=>{const k=kleinKind(scene,fa,HAUT[i]);const r=grp(.55,1.15,.2,k);box(.07,.55,.07,K.holz,0,.28,0,r);const h=new THREE.Mesh(new THREE.TorusGeometry(.26,.04,5,12),mat(K.weiss));h.position.y=.8;r.add(h);k.userData.rk=r;return k};
  const p1=sp(0,K.rot),p2=sp(2,K.gelb),ba=qs(.16,K.gelb,cx,1,cz);
  bewegt([p1,p2,ba],t=>{const u=(t/1.5)%2,f=u<1?u:2-u,z1=cz+Math.sin(t*.7)*3.2,z2=cz+Math.sin(t*.7+1.7)*3.2;p1.position.set(cx-9.5,Math.abs(Math.sin(t*4))*.06,z1);p2.position.set(cx+9.5,Math.abs(Math.sin(t*4+1))*.06,z2);p1.rotation.y=Math.PI/2;p2.rotation.y=-Math.PI/2;p1.userData.rk.rotation.z=u<.12||(u>1&&u<1.04)?-.9:.2;p2.userData.rk.rotation.z=u>1&&u<1.12?-.9:.2;
    ba.position.set(cx-9+f*18,.6+Math.sin(f*Math.PI)*2.6,z1+(z2-z1)*f)},cx,cz,100)})();
/* ---------- Basketballplatz ---------- */
(function(){const cx=188,cz=-141;qb(17,.06,10,K.grau,cx,.03,cz);qb(15,.1,8,K.ziegel,cx,.1,cz);
  [-1,1].forEach(s=>{qb(15,.03,.12,K.weiss,cx,.17,cz+s*3.94);qb(.12,.03,8,K.weiss,cx+s*7.44,.17,cz);qb(2.8,.03,3.6,K.blau,cx+s*6.1,.16,cz);
    qc(.1,3.4,K.grau,cx+s*8.1,1.7,cz);kreis(cx+s*8.1,cz,.3);qb(.5,.1,.1,K.grau,cx+s*7.85,3.3,cz);qb(.1,1.2,1.8,K.weiss,cx+s*7.5,3.2,cz);qb(.06,.5,.7,K.rot,cx+s*7.45,3.05,cz);
    const ri=new THREE.Mesh(new THREE.TorusGeometry(.36,.04,6,12),mat(K.orange));ri.rotation.x=Math.PI/2;ri.position.set(cx+s*7.1,3,cz);scene.add(ri);const ne=qk(.32,.65,K.weiss,cx+s*7.1,2.65,cz);ne.rotation.x=Math.PI});
  qb(.1,.03,8,K.weiss,cx,.17,cz);const mc=new THREE.Mesh(new THREE.TorusGeometry(1.2,.05,4,20),mat(K.weiss));mc.rotation.x=Math.PI/2;mc.position.set(cx,.18,cz);scene.add(mc);
  bank(cx,cz+6.2,Math.PI);eimer(cx+4,cz+6.2);qs(.28,K.orange,cx-3.6,.3,cz+6.3);laterne(cx-10,cz+5);baeumchen(cx+11,cz+5,1);
  [0,1].forEach(i=>{const k=kleinKind(scene,BUNT[i*3+3],HAUT[i+1]);k.position.set(cx-.6+i*1.2,.35,cz+6.2)});
  const ks=[0,1,2,3].map(i=>{const k=kleinKind(scene,i<2?K.rot:K.blau,HAUT[i]);return k}),ball=qs(.26,K.orange,cx,1,cz);
  const rt=[[[cx-4,cz-2.5],[cx+4,cz-2],[cx+4,cz+2.5],[cx-4,cz+2]],[[cx+5,cz+2],[cx-3,cz+2.8],[cx-5,cz-1.5],[cx+3,cz-2.8]],[[cx-6,cz],[cx+1,cz-3],[cx+6,cz],[cx+1,cz+3]],[[cx+6,cz-1],[cx,cz+3],[cx-6,cz+1],[cx,cz-3]]];
  const ls=ks.map((k,i)=>laufPfad(k,rt[i],2.6,i*5,true));
  bewegt(ks.concat([ball]),t=>{ks.forEach((k,i)=>ls[i](t));ball.position.set(ks[0].position.x+Math.sin(ks[0].rotation.y)*.7,.3+Math.abs(Math.sin(t*6))*.9,ks[0].position.z+Math.cos(ks[0].rotation.y)*.7)},cx,cz,100)})();
/* ---------- Kiosk mit Taxi-Stand ---------- */
(function(){const cx=-72,cz=104,g=grp(cx,0,cz);box(6,3,3.6,K.rot,0,1.5,0,g,true);box(7.2,.3,4.4,K.dunkel,0,3.15,.4,g);box(4.2,1.2,.2,K.dunkel,0,1.9,1.82,g);box(4.6,.15,.7,K.holz,0,1.25,2.1,g);kBox(cx,cz,6,3.6);
  for(let i=0;i<8;i++){box(.42,.58,.04,BUNT[i],-2.1+i*.6,1.62,2.3,g).rotation.x=-.3}[-1,1].forEach(s=>box(.12,.6,.12,K.holz,s*2.5,1.55,2.4,g));
  const ag=grp(cx,0,cz+1.9);markise(ag,6.4,3,K.gelb,K.weiss);const vb=box(.8,.7,.5,K.blau,.4,1.65,1.55,g);sph(.28,HAUT[2],.4,2.3,1.55,g);sph(.29,K.dunkel,.4,2.38,1.5,g,1,.7,1);
  const zt=box(2.4,.12,1.6,K.weiss,0,4,0,g);zt.rotation.x=-.35;[-.3,0,.3].forEach(o=>box(1.9,.05,.08,K.grau,0,4.03+o*.2,o*1.1,g).rotation.x=-.35);
  [[-4.4,1.5],[4.4,1.5]].forEach((p,i)=>{const r=grp(cx+p[0],0,cz+p[1]);box(1.2,1.8,.5,K.holz,0,.9,0,r,true);for(let k=0;k<3;k++)for(let m=0;m<3;m++)box(.3,.4,.06,BUNT[(k*3+m+i*2)%8],-.35+m*.35,.7+k*.5,.3,r);kreis(cx+p[0],cz+p[1],.9)});
  const sp=grp(cx+3.4,0,cz+3.6);cyl(.06,1.6,K.grau,0,.8,0,sp);const spc=grp(0,1.5,0,sp);for(let i=0;i<4;i++){const a=box(.5,.7,.05,BUNT[(i*2+1)%8],0,0,0,spc);a.position.set(Math.cos(i*1.57)*.5,0,Math.sin(i*1.57)*.5);a.rotation.y=-i*1.57+1.57}bewegt(spc,t=>{spc.rotation.y=t*.5},cx,cz,60);kreis(cx+3.4,cz+3.6,.7);
  qb(18,.05,7,K.asph,-72,.075,117);qb(18,.06,.3,K.gelb,-72,.1,113.6);for(let i=0;i<5;i++)qb(.1,.03,4.6,K.weiss,-79.5+i*3.8,.12,116.4);
  [-77.6,-70].forEach((x,i)=>{const t=parken(K.gelb,x,116.4,Math.PI/2);box(1,.36,.56,K.weiss,-.3,2.2,0,t);const lf=new THREE.Mesh(gBox,MGELB);lf.scale.set(.9,.14,.6);lf.position.set(-.3,2.42,0);t.add(lf);for(let k=0;k<4;k++)box(.1,.38,.58,K.schwarz,-.6+k*.2,2.2,0,t);for(let k=0;k<10;k++)for(let m=0;m<2;m++)[-1,1].forEach(q=>box(.4,.2,.04,(k+m)%2?K.schwarz:K.weiss,-1.9+k*.42,.78+m*.2,q*1.02,t));const d=kleinKind(scene,K.blau,HAUT[i+1]);d.position.set(x+(i?-2.6:2.8),0,i?114.8:118);d.rotation.y=i?-.5:2.5});
  const pa=kleinKind(scene,K.lila,HAUT[0]);pa.position.set(-80.5,0,114.6);qb(.7,.9,.4,K.rot,-79.6,.55,114.6);qb(.1,.5,.1,K.grau,-79.6,1.2,114.6);
  [0,1].forEach(i=>{const k=kleinKind(scene,BUNT[i*4+1],HAUT[i+2]);k.position.set(cx-1+i*1.6,0,cz+4.2);k.rotation.y=Math.PI});
  bank(-64,108,-Math.PI/2);eimer(-64.2,105);laterne(-80,108);laterne(-62,114);baeumchen(-84,100,1.1);baeumchen(-60,100,1);beet(-80,102,3,10);beet(-65,121,3,10);radStaender(-82,111,2,Math.PI/2)})();
/* ========== Dichte-Runde: karge Orte füllen ========== */
/* ---------- Bushaltestelle: Wartende, Fahrgäste ---------- */
(function(){const x=-45;
  [[-47.4,92.2,K.rot,0],[-45.6,91.8,K.blau,1],[-43.7,92.4,K.gruen,2],[-41.9,92,K.orange,3]].forEach(p=>{const k=kleinKind(scene,p[2],HAUT[p[3]]);k.position.set(p[0],0,p[1]);k.rotation.y=Math.PI+(p[3]-1.5)*.15});
  const si=kleinKind(scene,K.lila,HAUT[1]);si.position.set(-45.9,.38,93.7);const su=kleinKind(scene,K.gelb,HAUT[2]);su.position.set(-44.2,.38,93.7);
    qb(.8,1.8,.6,K.blau,-37.5,.9,93.6,scene,true);qb(.5,.4,.08,K.himmel,-37.5,1.4,93.28);qb(.4,.1,.08,K.gelb,-37.5,.95,93.28);kreis(-37.5,93.6,.7);
  radStaender(-52,98,3,0);const hu=hund(scene,K.holz,K.sand,K.dunkel,true);hu.position.set(-41,0,96.5);hu.rotation.y=-.6;hu.scale.setScalar(.9);const bs=kleinKind(scene,K.tuerkis,HAUT[3]);bs.position.set(-39.8,0,96.8);bs.scale.setScalar(1.12);
  const kf=qb(.5,.55,.3,K.gold,-47,.45,95.2);const kg=kleinKind(scene,K.rosa,HAUT[0]);kg.position.set(-48.2,0,95.4);
  const fk=kleinKind(scene,K.gelb,HAUT[1]);bewegt2(fk,laufPfad(fk,[[-41,100],[-34,100],[-34,104],[-41,104]],1.7,0,true),80);eimer(-50,92);laterne(-38,100)})();
/* ---------- Schwimmbad: Schwimmer, Leinen, Liegen, Planschbecken, Bademeister ---------- */
function schwimmer(par,hz,kappe,col){const g=grp(0,0,0,par);g.userData.keep=1;sph(.3,hz,0,.55,.1,g);sph(.32,kappe,0,.65,.05,g,1,.6,1);box(.55,.2,.9,col,0,.42,-.55,g);const a1=grp(.38,.5,.1,g),a2=grp(-.38,.5,.1,g);box(.14,.1,.7,hz,0,0,.3,a1);box(.14,.1,.7,hz,0,0,.3,a2);g.userData.a=[a1,a2];return g}
(function(){const cx=-112,cz=-80;
  [-1.4,1.4].forEach(o=>{for(let i=0;i<16;i++)qs(.13,i%2?K.rot:K.weiss,cx-8+i*1.07,.54,cz+o)});
  [[-2.8,0,K.gelb],[0,7,K.rot],[2.8,12,K.lila]].forEach((l,i)=>{const w=schwimmer(scene,HAUT[i],BUNT[(i*3+1)%8],l[2]);const L=laufPfad(w,[[cx-8,cz+l[0]],[cx+8,cz+l[0]]],1.6+i*.2,l[1]);bewegt2(w,t=>{L(t);w.position.y=.1+Math.sin(t*2+i)*.03;w.userData.a.forEach((a,k)=>{a.rotation.x=Math.sin(t*4+k*3.1)*1.1})},90)});
  const bb=grp(0,0,0,scene);sph(.4,K.rot,0,0,0,bb);sph(.41,K.weiss,0,0,0,bb,1,.3,1);bewegt2(bb,t=>{bb.position.set(cx+Math.sin(t*.35)*6.5,.7+Math.abs(Math.sin(t*2.5))*.12,cz+Math.cos(t*.27)*2.2);bb.rotation.y=t},80);
  [0,1,3].forEach((i,k)=>{const x=cx-8+i*2.4,su=BUNT[(k*3+2)%8];qb(.35,.2,.7,HAUT[k],x,.64,-71.1);qb(.45,.22,.7,su,x,.66,-70.4);sph(.2,HAUT[k],x,.74,-69.8,scene);sph(.21,K.dunkel,x,.8,-69.7,scene,1,.7,1)});
  schirm(cx-12,-66,K.gruen);schirm(cx-1,-66,K.orange);schirm(cx+9,-68,K.lila);[[cx-12,-66],[cx-1,-66],[cx+9,-68]].forEach(p=>kreis(p[0],p[1],1.2));
  [[-124,-65,K.rot],[-107,-65.5,K.blau],[-127,-69,K.gelb],[-104,-69,K.gruen]].forEach((t,i)=>{qb(1.1,.04,2,t[2],t[0],.13,t[1]).rotation.y=i*.5;qs(.22,BUNT[i*2],t[0]+1.1,.25,t[1]+.6)});
  const px=-97,pz=-79;qc(3.3,.45,K.tuerkis,px,.22,pz);qc(2.95,.1,WASSER,px,.45,pz);kreis(px,pz,3.4);qs(.2,K.gelb,px+.5,.6,pz,scene,1.2,.8,1);qs(.12,K.gelb,px+.8,.72,pz);
  [0,1].forEach(i=>{const k=kleinKind(scene,BUNT[i*3+1],HAUT[i]);k.position.set(px-1+i*1.4,.2,pz+.5);k.scale.set(.8,.55,.8)});const pb=qs(.18,K.rot,px,.6,pz-1);bewegt(pb,t=>{pb.position.set(px+Math.cos(t*.6)*1.4,.6+Math.abs(Math.sin(t*3))*.15,pz+Math.sin(t*.6)*1.4)},px,pz,60);
  const lx=-100,lz=-72,lg=grp(lx,0,lz);[[-.8,-.8],[.8,-.8],[-.8,.8],[.8,.8]].forEach(p=>box(.12,2.4,.12,K.weiss,p[0],1.2,p[1],lg,true));box(2,.12,2,K.holz,0,2.4,0,lg);box(2,.9,.1,K.weiss,0,2.9,-.95,lg);box(2.5,.12,2.5,K.rot,0,3.5,0,lg);for(let i=0;i<5;i++)box(.1,.12,.6,K.holz,.8,.4+i*.5,1.1,lg);
  const bm=kleinKind(lg,K.rot,HAUT[1]);bm.position.set(0,2.46,0);const bo=new THREE.Mesh(new THREE.TorusGeometry(.35,.1,6,12),mat(K.rot));bo.position.set(1.05,1.4,0);bo.rotation.y=Math.PI/2;lg.add(bo);kreis(lx,lz,1.3);
  qc(.06,2.4,K.grau,-126,1.2,-73);qs(.2,K.grau,-125.7,2.45,-73,scene,1.5,.5,1);qb(1.2,.06,1.2,K.hellgrau,-126,.1,-73);kreis(-126,-73,.4);eimer(-108,-64);baeumchen(-128,-80,1.1)})();
/* ---------- Hafen: Container, Lastwagen, Gabelstapler, Boote, Möwen ---------- */
function lkw(par,fa,cc){const g=grp(0,0,0,par);box(8.2,.7,2.5,K.schwarz,0,.9,0,g);box(2.2,2.2,2.5,fa,3.2,2.1,0,g,true);box(.1,.9,2.2,K.himmel,4.32,2.5,0,g);box(5.8,2.6,2.5,cc,-1.3,2.5,0,g,true);for(let i=0;i<8;i++)box(.1,2.4,2.55,K.weiss,-3.6+i*.66,2.5,0,g);rad4(g,[-3.4,-2.1,2.8],.6,1.3);lichter(g,4.32,1.2,.8);return g}
function moewe(par){const g=grp(0,0,0,par);g.userData.keep=1;sph(.35,K.weiss,0,0,0,g,1.5,.7,.7);sph(.2,K.weiss,.5,.12,0,g);cone(.07,.25,K.orange,.78,.1,0,g).rotation.z=-Math.PI/2;box(.4,.08,.3,K.hellgrau,-.6,.05,0,g);const fl=[-1,1].map(s=>{const w=grp(0,.1,s*.15,g);box(.5,.06,1.1,K.hellgrau,0,0,s*.55,w);return w});g.userData.fl=fl;return g}
(function(){
  [[128,-91.5,2],[134,-91.5,3],[128,-87.5,3],[134,-87.5,1],[108,-87,2]].forEach((s,i)=>{for(let k=0;k<s[2];k++){const c=BUNT[(i*3+k*2+1)%8];qb(5.8,2.4,2.4,c,s[0],1.3+k*2.4,s[1],scene,k===0);for(let r=0;r<7;r++)qb(.12,2.3,2.5,K.weiss,s[0]-2.6+r*.87,1.3+k*2.4,s[1])}kBox(s[0],s[1],5.8,2.4)});
  const t=lkw(scene,K.blau,K.orange);t.position.set(144,0,-91.6);kBox(144,-91.6,8.8,2.6);
  const fg=grp(126,0,-84);fg.rotation.y=-.5;box(2.2,1,1.4,K.gelb,0,.9,0,fg,true);box(.1,3,.1,K.dunkel,1.2,1.7,.4,fg);box(.1,3,.1,K.dunkel,1.2,1.7,-.4,fg);box(.7,.08,.12,K.grau,1.5,.3,.4,fg);box(.7,.08,.12,K.grau,1.5,.3,-.4,fg);box(.1,1.3,1.4,K.dunkel,-.5,1.9,0,fg);[[.8,.6],[.8,-.6],[-.8,.6],[-.8,-.6]].forEach(p=>cyl(.3,.25,K.schwarz,p[0],.3,p[1],fg).rotation.x=Math.PI/2);const fk=kleinKind(fg,K.orange,HAUT[0]);fk.position.set(-.4,1.2,0);fk.scale.setScalar(.7);box(.8,.7,.8,K.holz,1.9,.7,0,fg);kreis(126,-84,1.5);
  for(let i=0;i<6;i++){qb(1.1,.8,1.1,K.holz,111+(i%3)*1.15,.4+Math.floor(i/3)*.8,-94.6);}kreis(112,-94.6,1.8);
  [[150,-90.5,K.rot],[151,-89.5,K.blau],[150.6,-91.7,K.gruen]].forEach(b=>{qc(.4,.9,b[2],b[0],.45,b[1]);qc(.42,.08,K.dunkel,b[0],.92,b[1])});kreis(150.7,-90.7,1.3);
  const fi=kleinKind(scene,K.gruen,HAUT[2]);fi.position.set(106.2,.28,-96.2);fi.rotation.y=Math.PI;stab(scene,106.5,1.4,-96.2,110.8,3.2,-99.4,.06,K.holz);stab(scene,110.8,3.2,-99.4,110.8,.4,-99.6,.02,K.weiss);const fb=qs(.16,K.rot,110.8,.3,-99.6);bewegt(fb,t=>{fb.position.y=.3+Math.sin(t*1.8)*.05},110,-99,70);
  [134,139].forEach((x,i)=>{const g=grp(x,0,-99.9);box(3.2,.5,1.1,i?K.rot:K.gruen,0,.25,0,g);box(.8,.5,.8,i?K.rot:K.gruen,1.7,.25,0,g).rotation.y=Math.PI/4;box(1,.8,.9,K.weiss,-.5,.8,0,g);box(1.1,.08,1,K.dunkel,-.5,1.25,0,g);bewegt(g,t=>{g.position.y=Math.sin(t*1.5+x)*.06;g.rotation.z=Math.sin(t*1.1+x)*.05},x,-100,90)});
  [0,1,2].forEach(i=>{const m=moewe(scene);bewegt2(m,t=>{const a=t*(.35+i*.07)+i*2.1,r=13+i*5;m.position.set(130+Math.cos(a)*r,9+i*1.6+Math.sin(t*1.2+i)*.8,-92+Math.sin(a)*r*.6);m.rotation.y=Math.atan2(-Math.cos(a)*r*.6,-Math.sin(a)*r);m.userData.fl.forEach((w,k)=>{w.rotation.x=(k?1:-1)*Math.sin(t*9+i)*.5})},120)});
  const mw=moewe(scene);mw.position.set(122,3.6,-98.5);mw.userData.fl.forEach(w=>{w.rotation.x=0});mw.scale.setScalar(.8)})();
/* ---------- Kino-Umfeld: Popcorn-Wagen, Schaukästen, Teppich, Scheinwerfer ---------- */
(function(){const cx=100;
  const pw=grp(cx-5,0,-53);pw.rotation.y=.3;box(2.2,1,1.4,K.rot,0,.95,0,pw,true);box(2,1.1,1.2,K.himmel,0,2,0,pw);box(2.3,.14,1.5,K.weiss,0,2.62,0,pw);[-1,1].forEach(s=>cyl(.4,.2,K.schwarz,s*.8,.4,.8,pw).rotation.x=Math.PI/2);[-1,1].forEach(s=>cyl(.4,.2,K.schwarz,s*.8,.4,-.8,pw).rotation.x=Math.PI/2);box(.1,.1,1.4,K.grau,-1.5,.9,0,pw);
  for(let i=0;i<14;i++)sph(.2,i%2?K.weiss:K.gelb,Math.cos(i*2.4)*.7,2.85+Math.floor(i/5)*.16,Math.sin(i*2.4)*.35,pw);box(2.6,.1,1.8,K.rot,0,3.6,0,pw);[-1,1].forEach(s=>[-1,1].forEach(q=>cyl(.05,1,K.grau,s*1.2,3.1,q*.8,pw)));kreis(cx-5,-53,1.4);
  const pp=[0,1,2].map(i=>sph(.15,K.weiss,0,0,0,scene));bewegt(pp,t=>{pp.forEach((s,i)=>{const f=(t*.7+i/3)%1;s.position.set(cx-5+(i-1)*.5,2.9+Math.sin(f*Math.PI)*1.1,-53)})},cx-5,-53,60);
  const vk=kleinKind(scene,K.gelb,HAUT[2]);vk.position.set(cx-3.4,0,-52.2);vk.rotation.y=2.6;
  [[-1,K.blau,K.gelb],[1,K.rot,K.weiss]].forEach((v,i)=>{const x=cx+v[0]*4.4,g=grp(x,0,-56.4);[-.8,.8].forEach(o=>cyl(.07,.9,K.grau,o,.45,0,g));box(2.2,3.2,.3,K.dunkel,0,2.4,0,g,true);box(1.9,2.8,.08,v[1],0,2.4,.17,g);
    if(i===0){sph(.5,v[2],-.3,3.1,.22,g,1,1,.1);sph(1.2,K.gruen,.3,1.5,.2,g,1.2,.55,.1)}else{box(.9,.9,.08,v[2],0,2.6,.22,g);box(.9,.9,.08,v[2],0,2.6,.23,g).rotation.z=.785;box(1.6,.3,.08,K.gold,0,1.6,.22,g)}kreis(x,-56.4,1.3)});
  for(let i=0;i<4;i++)[-1,1].forEach(s=>{const z=-61+i*2.7;qc(.07,1,K.gold,cx+s*1.8,.5,z);if(i)qb(.04,.04,2.7,K.rot,cx+s*1.8,.85,z+1.35)});
  for(let i=0;i<7;i++)[-1,1].forEach(s=>{const x=cx+s*2.6,z=-61.2+i*1.15;qb(.8,.03,.8,K.gold,x,.14,z);qb(.8,.03,.8,K.gold,x,.15,z).rotation.y=.785});
  [0,1,2,3].forEach(i=>{const k=kleinKind(scene,BUNT[(i*3+1)%8],HAUT[i%4]);k.position.set(cx+(i%2?.4:-.4),0,-55.6+i*1.5);k.rotation.y=Math.PI});
  [-1,1].forEach((s,i)=>{const sg=grp(cx+s*4,9.2,-66);const b=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:0xfff2b0,transparent:true,opacity:.16,depthWrite:false,blending:THREE.AdditiveBlending}));b.scale.set(3,22,3);b.position.set(0,11,0);sg.add(b);bewegt(sg,t=>{sg.rotation.z=s*(.35+Math.sin(t*.9+i*2)*.3);sg.rotation.x=Math.sin(t*.7+i)*.25},cx,-66,120);box(.8,.5,.8,K.dunkel,cx+s*4,9.35,-66,scene)});
})();
/* ---------- Fahrradstraße: mehr Radfahrer und Ständer ---------- */
(function(){[4,5,6,7].forEach(i=>{const g=radler(scene,BUNT[(i*3+2)%8]),v=4+i*.45,lo=-146,hi=-68;bewegt2(g,t=>{const u=(t*v/(hi-lo)+i*.31)%2,f=u<1?u:2-u;g.position.set(lo+f*(hi-lo),0,u<1?(i%2?85.4:86.6):(i%2?81.4:82.6));g.rotation.y=u<1?0:Math.PI;g.userData.anim(t)},70)});
  radStaender(-141,77,4,0);radStaender(-90,77,3,0);radStaender(-104,93,3,0);beet(-132,76,3,10);beet(-84,76,3,10)})();
/* ---------- Straßenmöbel: Laternen, Bänke, Mülleimer, Fahnen, Wegweiser ---------- */
(function(){
  [-58,-28,24,50,100,130,160,190].forEach(x=>laterne(x,77.4));[-62,28,100,130,160,190].forEach(x=>laterne(x,90.8));[-190,-160,-130,-30,30,70,100].forEach(x=>laterne(x,-53.6));[-190,-130,-30,30,100].forEach(x=>laterne(x,-40.4));
  [60,30,-10,-30,-60,-85].forEach(z=>{laterne(-90.4,z);laterne(-73.6,z);laterne(84.4,z);laterne(67.6,z)});
  [[-180,-53],[-150,-41],[-20,-53],[20,-41],[120,-53],[-70,-41]].forEach((p,i)=>{bank(p[0],p[1],p[1]<-47?Math.PI:0);eimer(p[0]+2.4,p[1])});
  [[-75,66],[-75,0],[-75,-30],[82,66],[82,-10],[82,-80],[-88,48]].forEach((p,i)=>{bank(p[0],p[1],i%2?-Math.PI/2:Math.PI/2);eimer(p[0],p[1]+2)});
  [104,70,44,2,-60,-125,-140].forEach((z,i)=>{fahne(5.8,z,7,BUNT[(i*3)%8],true);fahne(-5.8,z,7,BUNT[(i*3+4)%8],true)});
  for(let i=0;i<6;i++){kuebel(-9+i*3.6,-60-i*0)}
  wegweiserN(6.8,52,['Eisdiele','Stadtbrunnen','Pizzeria'],0);wegweiserN(-6.8,52,['Bäckerei','Kirche','Bibliothek','Schule'],0);
  wegweiserN(6.8,-8,['Museum','Kino','Polizei'],0);wegweiserN(-6.8,-8,['Feuerwache','Krankenhaus','Stadtpark'],0);
  wegweiserN(6.8,-92,['Hafen','Sportplatz'],0);wegweiserN(-6.8,-92,['Schwimmbad','Baustelle','Recyclinghof'],0);
  wegweiserN(-14,94,['Fahrradstraße'],0);wegweiserN(14,64,['Spielplatz','Wohnviertel'],0);wegweiserN(-6.8,-150,['Ausgang'],0)})();
/* ---------- Bäume (instanziert) ---------- */
const baumListe=[];
function weitWeg(x,z){if(Math.abs(x)<8&&z>TORZ-2&&z<172)return true;if(Math.abs(z-84)<9&&x>-155)return true;if(Math.abs(z+47)<9&&x<126)return true;if(Math.abs(x+82)<9&&z>-100&&z<88)return true;if(Math.abs(x-76)<9&&z>-100&&z<88)return true;if(z>-116&&z<-90)return true;if(Math.abs(z-134)<7&&x<-30)return true;if(z>30&&z<44&&x>86)return true;
  for(const e of EXTRAZONEN){if(e.name==='Straße')continue;if(Math.hypot(x-e.x,z-e.z)<e.r+6)return true}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<32)return true;if(Math.abs(x)<6&&z<TORZ)return true;return false}
for(let i=0;i<340;i++){const x=GRENZE.x0+8+rnd()*(GRENZE.x1-GRENZE.x0-16),z=GRENZE.z0+8+rnd()*(GRENZE.z1-GRENZE.z0-16);if(!weitWeg(x,z))baumListe.push({x,z,s:.8+rnd()*.5})}
for(let x=GRENZE.x0;x<=GRENZE.x1;x+=11){if(Math.abs(x)>8)baumListe.push({x,z:GRENZE.z1,s:1.2});baumListe.push({x,z:GRENZE.z0,s:1.2});if(Math.abs(x)>3.5)baumListe.push({x,z:TORZ,s:1})}
for(let z=GRENZE.z0;z<=GRENZE.z1;z+=11){baumListe.push({x:GRENZE.x0,z,s:1.2});baumListe.push({x:GRENZE.x1,z,s:1.2})}
/* ---------- Alleen (Bäume entlang von Straßen und Ufer, instanziert) ---------- */
[-136,-128,-120,-112,-98].forEach(x=>baumListe.push({x,z:94.5,s:1}));
for(let x=95;x<=203;x+=10)baumListe.push({x,z:93.5,s:1.05});
for(let x=92;x<=148;x+=11)baumListe.push({x,z:76,s:1});
for(let z=76;z>=48;z-=7)baumListe.push({x:-94,z,s:1});
[-196,-184,-172,-160,-148,-136,-88,-76,-64,-52,18,30,42,54,66,78,90,102,114].forEach(x=>baumListe.push({x,z:-114.5,s:1.05}));
const BAUMTEIL=[[gCyl,0x7a5230,0,1.3,0,.36,2.6,.36],[gSph,0x4aa84e,0,3.9,0,2.1,1.8,2.1],[gSph,0x5cba5c,1.2,3.4,.6,1.5,1.3,1.5],[gSph,0x3f9a46,-1.2,3.5,-.5,1.6,1.4,1.6]];
(function(){const n=baumListe.length;
  const ms=BAUMTEIL.map(m=>{const im=new THREE.InstancedMesh(m[0],mat(m[1]),n);im.frustumCulled=false;scene.add(im);return im});ms[1].castShadow=true;
  const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),SC=new THREE.Vector3();
  baumListe.forEach((t,i)=>{const s=t.s;BAUMTEIL.forEach((m,k)=>{P.set(t.x+m[2]*s,m[3]*s,t.z+m[4]*s);SC.set(m[5]*s,m[6]*s,m[7]*s);M.compose(P,Q,SC);ms[k].setMatrixAt(i,M)});kreis(t.x,t.z,.9*s)});
  ms.forEach(m=>{m.instanceMatrix.needsUpdate=true})})();
/* ========== Dichte-Runde: Straßenbahn, Vorgärten, Landschaft, Bewegung ========== */
function strassenbahn(par){const g=grp(0,0,0,par);g.userData.keep=1;g.userData.vm=1;
  [-3.4,3.4].forEach(sx=>{box(6.2,.55,2.5,K.dunkel,sx,.75,0,g);box(6.2,1.9,2.5,K.rot,sx,1.95,0,g);box(6.25,.25,2.55,K.weiss,sx,1.35,0,g);box(6,.8,2.54,K.himmel,sx,2.4,0,g);box(6.3,.2,2.6,K.weiss,sx,3.05,0,g);box(1.1,1.7,.06,K.dunkel,sx*.5,1.85,1.28,g);box(1.1,1.7,.06,K.dunkel,sx*.5,1.85,-1.28,g)});
  box(1.6,2.2,2.2,K.dunkel,0,1.9,0,g);[-5.2,0,5.2].forEach(x=>[-1,1].forEach(s=>cyl(.55,.3,K.schwarz,x,.55,s*1.0,g).rotation.x=Math.PI/2));
  [-1,1].forEach(s=>{box(.1,1,2.2,K.himmel,s*6.55,2.4,0,g);[-.8,.8].forEach(q=>box(.1,.3,.4,K.gelb,s*6.55,1.2,q,g))});
  box(1.4,.1,1.2,K.dunkel,-1.5,3.2,0,g);stab(g,-2.2,3.2,0,-1.5,5.35,0,.1,K.dunkel,.1,false);stab(g,-.8,3.2,0,-1.5,5.35,0,.1,K.dunkel,.1,false);box(.15,.08,1.5,K.grau,-1.5,5.4,0,g);return g}
(function(){const z0=36.5,x0=92,x1=202;
  qb(x1-x0+4,.08,3.4,0x8c8a85,(x0+x1)/2,.04,z0);[-.72,.72].forEach(s=>qb(x1-x0+4,.2,.14,K.grau,(x0+x1)/2,.18,z0+s));for(let x=x0-1;x<=x1+1;x+=1.8)SCHWELLEN.push([x,.14,z0,.5,.12,2.8]);
  [x0-2.3,x1+2.3].forEach(x=>{qb(.5,.7,2.4,K.rot,x,.45,z0);kreis(x,z0,1.1)});
  for(let i=0;i<=5;i++){const x=x0+i*22;qc(.12,5.6,K.dunkel,x,2.8,z0+2.4);qb(.2,.2,2.6,K.dunkel,x,5.6,z0+1.2);kreis(x,z0+2.4,.3)}qb(x1-x0+4,.05,.05,K.schwarz,(x0+x1)/2,5.5,z0);
  [126,172].forEach((px,i)=>{qb(14,.3,2.6,K.hellgrau,px,.15,z0-3.2);qb(14,.04,.3,K.gelb,px,.32,z0-2.1);[-1,1].forEach(s=>[-1,1].forEach(q=>{qc(.07,3.2,K.dunkel,px+s*3.6,1.6,z0-3.2+q*1.1);kreis(px+s*3.6,z0-3.2+q*1.1,.2)}));qb(8,.2,2.6,K.blau,px,3.3,z0-3.2);qb(3,.15,.7,K.holz,px+1,.7,z0-4.1);qb(.15,.6,.6,K.dunkel,px-.4,.45,z0-4.1);qb(.15,.6,.6,K.dunkel,px+2.4,.45,z0-4.1);laterne(px+6,z0-4.2);bank(px-4,z0-4.4,0);
    [0,1,2].forEach(k=>{const w=kleinKind(scene,BUNT[(k*3+i*2+1)%8],HAUT[(k+i)%4]);w.position.set(px-1.5+k*1.2+i,.3,z0-2.9);w.rotation.y=0})});
  sperre(x0,z0,x1,z0,3.5);
  const tr=strassenbahn(scene),st=[100,126,172,198,172,126],ln=[26,46,26,26,46,26],P=3,seg=[];let T=0;st.forEach((a,i)=>{const b=st[(i+1)%st.length],d=ln[i]/7;seg.push({t0:T+P,t1:T+P+d,a,b});T+=P+d});
  bewegt2(tr,t=>{const u=t%T;let x=st[0];for(const s of seg){if(u>=s.t0&&u<s.t1){x=s.a+(s.b-s.a)*glatt((u-s.t0)/(s.t1-s.t0));break}else if(u>=s.t1)x=s.b}tr.position.set(x,0,z0)},120)})();
/* ---------- Vorgärten im Wohnviertel: Zäune, Hecken, Blumenkästen (instanziert) ---------- */
(function(){const P=[],R=[],H=[],FB=[],FL=[[],[],[],[]];
  const zaunSeg=(x1,x2,z)=>{const l=Math.abs(x2-x1),n=Math.max(1,Math.round(l/.9));for(let i=0;i<=n;i++)P.push([x1+(x2-x1)*i/n,.45,z,.12,.9,.12]);R.push([(x1+x2)/2,.7,z,l,.08,.06]);R.push([(x1+x2)/2,.3,z,l,.08,.06]);sperrLinie(x1,z,x2,z,.15)};
  const kaesten=(x,y,z)=>{FB.push([x,y,z,1.4,.3,.4]);for(let k=0;k<5;k++)FL[(k+Math.round(x))&3].push([x-.55+k*.27,y+.28,z,.26,.26,.26])};
  [157.25,163.75,170.25,176.75].forEach((x,i)=>{const zf=49.57;fen(x-2.35,2,zf,1.3,1.5);fen(x+2.35,2,zf,1.3,1.5);kaesten(x-2.35,1.1,zf+.25);kaesten(x+2.35,1.1,zf+.25);kaesten(x-1.6,4.75,zf+.25);kaesten(x+1.6,4.75,zf+.25);
    zaunSeg(x-3.2,x-1.1,54.2);zaunSeg(x+1.1,x+3.2,54.2);qb(1.2,.05,4.5,K.platz,x,.1,51.9);H.push([x-3,.55,52,.7,1.1,.7]);H.push([x+3,.55,52,.7,1.1,.7]);kreis(x-3,52,.5);kreis(x+3,52,.5)});
  [158,170,182].forEach((x,i)=>{const zf=73.07;fen(x-2.1,2.1,zf,1.3,1.5);fen(x+2.1,2.1,zf,1.3,1.5);kaesten(x-2.1,1.2,zf+.25);kaesten(x+2.1,1.2,zf+.25);zaunSeg(x-3,x-1.1,76.2);zaunSeg(x+1.1,x+3,76.2);qb(1.2,.05,3.1,K.platz,x,.1,74.7);H.push([x-3,.55,75.2,.7,1.1,.7]);H.push([x+3,.55,75.2,.7,1.1,.7]);kreis(x-3,75.2,.5);kreis(x+3,75.2,.5)});
  instanz(scene,gBox,K.weiss,P);instanz(scene,gBox,K.weiss,R);instanz(scene,gBox,K.laub,H);instanz(scene,gBox,K.holz,FB);instanz(scene,gSph,K.rot,FL[0]);instanz(scene,gSph,K.gelb,FL[1]);instanz(scene,gSph,K.rosa,FL[2]);instanz(scene,gSph,K.lila,FL[3])})();
/* ---------- Joggerinnen und Jogger ---------- */
(function(){const j1=figur(scene,K.orange,K.dunkel,HAUT[1],K.schwarz),j2=figur(scene,K.tuerkis,K.blau,HAUT[0],K.holz),j3=figur(scene,K.rosa,K.dunkel,HAUT[2],0xe8c24a);
  bewegt2(j1,laufPfad(j1,[[-80,-93.4],[-40,-93.4]],3.3,0),65);
  const el=[];for(let i=0;i<20;i++){const a=i/20*6.283;el.push([-52+Math.cos(a)*17,-70+Math.sin(a)*12])}bewegt2(j2,laufPfad(j2,el,3.1,0),65);
  bewegt2(j3,laufPfad(j3,[[-3.5,62],[-3.5,-8],[3.5,-8],[3.5,62]],2.9,12),65);
})();
/* ---------- Drachen am Himmel ---------- */
(function(){[[126,58,118,52,14,K.rot,K.gelb],[-36,-84,-46,-98,16,K.gruen,K.orange],[198,62,190,50,15,K.blau,K.rosa]].forEach((d,i)=>{const kid=kleinKind(scene,BUNT[i*3+1],HAUT[i]);kid.position.set(d[0],0,d[1]);kid.rotation.y=Math.PI;
    const g=grp(0,0,0,scene);box(1.5,1.5,.05,d[5],0,0,0,g).rotation.z=Math.PI/4;box(.1,2.1,.07,d[6],0,0,.03,g);box(2.1,.1,.07,d[6],0,0,.03,g);const sc=[0,1,2,3].map(k=>{const b=box(.35,.25,.05,BUNT[(k*2+i)%8],0,-1.4-k*.6,0,g);return b});
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(6),3));const ln=new THREE.Line(geo,new THREE.LineBasicMaterial({color:0xffffff}));ln.frustumCulled=false;scene.add(ln);
    bewegt2(g,t=>{const a=t*.4+i*2,kx=d[2]+Math.sin(a)*6,kz=d[3]+Math.cos(a*.8)*4,ky=d[4]+Math.sin(t*.9+i)*1.4;g.position.set(kx,ky,kz);g.rotation.z=Math.sin(t*.8+i)*.25;g.rotation.y=Math.sin(a)*.5;sc.forEach((b,k)=>{b.position.x=Math.sin(t*3+k*.9)*.3});
      const p=geo.attributes.position.array;p[0]=d[0]+.4;p[1]=1.5;p[2]=d[1];p[3]=kx;p[4]=ky-.8;p[5]=kz;geo.attributes.position.needsUpdate=true;ln.visible=g.visible},120)})})();
/* ---------- Hecken, Büsche, Gras und Blumen (instanziert) ---------- */
(function(){const nahe=(x,z,m)=>{if(Math.abs(x)<8&&z>TORZ-2&&z<172)return true;if(Math.abs(z-84)<9&&x>-155)return true;if(Math.abs(z+47)<9&&x<126)return true;if(Math.abs(x+82)<9&&z>-100&&z<88)return true;if(Math.abs(x-76)<9&&z>-100&&z<88)return true;if(z>-116&&z<-90)return true;if(Math.abs(z-134)<7&&x<-30)return true;if(z>30&&z<44&&x>86)return true;
    for(const e of EXTRAZONEN){if(e.name==='Straße')continue;if(Math.hypot(x-e.x,z-e.z)<e.r+m)return true}for(const c of colliders){if(Math.hypot(x-c.x,z-c.z)<c.r+m*.4)return true}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<32)return true;if(Math.abs(x)<6&&z<TORZ)return true;return false};
  const BU=[[],[]],GR=[[],[]],ST=[],BL=[[],[],[],[]];const X0=GRENZE.x0+6,W=GRENZE.x1-GRENZE.x0-12,Z0=GRENZE.z0+6,Hh=GRENZE.z1-GRENZE.z0-12;
  for(let i=0;i<190;i++){const x=X0+rnd()*W,z=Z0+rnd()*Hh;if(nahe(x,z,2))continue;const s=.7+rnd()*.6;BU[i&1].push([x,.5*s,z,1.3*s,.95*s,1.2*s]);kreis(x,z,.8*s)}
  for(let i=0;i<620;i++){const x=X0+rnd()*W,z=Z0+rnd()*Hh;if(nahe(x,z,0))continue;for(let k=0;k<3;k++){const h=.5+rnd()*.5;GR[(i+k)&1].push([x+(rnd()-.5)*.7,h/2,z+(rnd()-.5)*.7,.14,h,.14])}}
  for(let i=0;i<160;i++){const x=X0+rnd()*W,z=Z0+rnd()*Hh;if(nahe(x,z,0))continue;const gx=x,gz=z;for(let k=0;k<4;k++){const px=gx+(rnd()-.5)*1.6,pz=gz+(rnd()-.5)*1.6;ST.push([px,.2,pz,.03,.4,.03]);BL[(i+k)&3].push([px,.45,pz,.16,.16,.16])}}
  instanz(scene,gSph,K.laub,BU[0]);instanz(scene,gSph,0x2f8a3e,BU[1]);instanz(scene,gCone,0x3f9a46,GR[0]);instanz(scene,gCone,0x5cba5c,GR[1]);instanz(scene,gCyl,K.laub,ST);[K.rot,K.gelb,K.rosa,K.lila].forEach((c,i)=>instanz(scene,gSph,c,BL[i]));
  /* Hecken an der Zufahrt zum Ausgang */
  [-1,1].forEach(s=>{const H=[];for(let z=-124;z>=-152;z-=2.2)H.push([s*8.4,.55,z,1.1,1.1,2.4]);instanz(scene,gBox,K.laub,H);sperrLinie(s*8.4,-123,s*8.4,-153,.6)})})();
/* ---------- Ausgang (Tor wird geöffnet) ---------- */
ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{for(let i=0;i<4;i++)box(1.7,1.7,1.7,i%2?K.ziegel:K.sand,s*4.4,.85+i*1.7,0,g,true);cone(1.4,1.8,K.rot,s*4.4,7.7,0,g)});box(11,1,.7,K.blau,0,6.4,0,g,true);
  const s=schildText('Ausgang','#e6f6ea',5.4,1.3);s.position.set(0,6.4,.4);g.add(s);
  const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,K.rot,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,K.weiss,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.34,K.braun,s*-1.9,1,0,p);box(3.8,.2,.34,K.braun,s*-1.9,2.8,0,p);return p});
  kreis(-4.4,TORZ,1.1);kreis(4.4,TORZ,1.1);return {g,fl,offen:0}})();
/* ---------- Festplatz: Stadtfest am Stadtrand ---------- */
(function(){const z0=FEST.z;scheibe(FEST.x,FEST.z,24,K.platz,.08);const bue=grp(0,0,z0-14);box(18,1,7,K.holz,0,.5,0,bue,true);box(18.4,.3,7.4,K.creme,0,1.05,0,bue);[-1,1].forEach(s=>box(.6,9,.6,K.braun,s*8.6,4.5,-3,bue,true));box(18.6,1.4,.5,K.gold,0,9.2,-3,bue);box(17,7,.3,K.lila,0,4.6,-3.2,bue,true);
  const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,9.3,-2.7);bue.add(gs);kreis(0,z0-14,9.6);
  sph(1.6,K.gold,0,6.4,-2.7,bue,1,1,.3);for(let i=0;i<5;i++){const a=i/5*6.283+1.57;const c=cone(.55,1.5,K.gold,Math.cos(a)*1.9,6.4+Math.sin(a)*1.9,-2.7,bue);c.rotation.z=a-1.57}
  [-6,6].forEach(x=>{box(1.6,2.4,1.2,K.schwarz,x,2.4,2,bue,true)});
  for(let i=0;i<14;i++)lampe(-8+i*1.23,8.5,z0-14.5,LART[i%4]);
  for(let r=0;r<6;r++)for(let c=0;c<8;c++)box(2,.05,2,(r+c)%2?K.lila:K.gelb,-7+c*2,.09,z0-8+r*2,scene);
  for(let i=0;i<22;i++){const a=i/21*Math.PI;sph(.6,BUNT[i%8],Math.cos(a)*8.5,.6+Math.sin(a)*8.5,z0+10,scene)}kreis(-8.5,z0+10,.9);kreis(8.5,z0+10,.9);
  [-14,14].forEach(x=>{[-8,0,8].forEach(dz=>{cyl(.15,7,K.braun,x,3.5,z0+dz,scene,true)})});[-8,0,8].forEach(dz=>girlande(-14,6.8,z0+dz,14,6.8,z0+dz,18,2.2));
  [[-8,4],[8,4],[-12,-6],[12,-6],[-4,12],[4,12]].forEach((p,i)=>ballons(p[0],0,z0+p[1],7,3+(i%3),i));
  bude(-16,z0+4,.8,4.8,K.rot,K.weiss,'Eis');bude(16,z0+4,-.8,4.8,K.blau,K.weiss,'Brezeln');
  [[-12,12],[12,12]].forEach((p,i)=>{const t=grp(p[0],0,z0+p[1]);cyl(1.2,.12,K.gelb,0,.9,0,t,true);cyl(.15,.8,K.braun,0,.45,0,t);cone(1.2,.5,BUNT[i*3],0,1.3,0,t);kreis(p[0],z0+p[1],1.6)});
  mast(-20,z0-6,7);mast(20,z0-6,7);wimpel(-20,6.8,z0-6,20,6.8,z0-6,20,1.8)})();
function ballons(x,y0,z,n,hoch,ph){const g=grp(x,y0,z);cyl(.025,hoch,K.dunkel,0,hoch/2,0,g);for(let i=0;i<n;i++){const a=i*2.4+(ph||0);sph(.5,BUNT[(i+(ph||0))%8],Math.cos(a)*.7,hoch+.4+(i%3)*.45,Math.sin(a)*.7,g,.9,1.15,.9)}
  const p=ph||0;bewegt(g,t=>{g.rotation.z=Math.sin(t*1.2+p)*.06;g.rotation.x=Math.cos(t*.9+p)*.06},x,z,80);return g}
verkehrBauen();
instanz(scene,gBox,K.weiss,STRICH);instanz(scene,gBox,K.holz,SCHWELLEN);instanz(scene,gBox,0xa8d8f0,FEN,true);
/* kleine feste Teile werfen keinen Schatten (weniger verschiedene Blöcke nach dem Verschmelzen) */
scene.traverse(m=>{if(!m.isMesh||m.isInstancedMesh||!m.castShadow)return;for(let o=m;o;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep))return}const q=m.scale;if(Math.max(q.x,q.y,q.z)<3.2)m.castShadow=false});
lichtBauen();
/* ---------- Besucher ---------- */
(function(){const jc=[0xe0605a,0x4caf6a,0xb06ae0,0xf59e3f,0x2fb5a8,0xffd45e,0x3b8fc4,0xe0605a,0x9b6fd0,0x4caf6a],hc=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a,0xe8c24a,0x2a1d14,0xb5651d,0x6b4626],st=['kurz','zoepfe','cap','pferd','kurz','zoepfe','cap','pferd','kurz','zoepfe'];
  for(let i=0;i<8;i++){const f=besucherFigur(Object.assign({},AVATARE[(i+1)%AVATARE.length],{jacke:jc[i%10],haar:hc[(i*3)%10],stil:st[i%10]}));const p=BPTS[(i*2)%BPTS.length];f.g.position.set(p[0]+(rnd()-.5)*2,0,p[1]);f.ziel=BPTS[(i*3+1)%BPTS.length];f.v=1.8+rnd()*.8;besucher.push(f)}})();
vmPass();
}
/* Wegpunkte der Besucher (nur auf dem freien Hauptweg südlich des Rathauses) */
const BPTS=[[0,146],[-5,142],[7,142],[0,128],[-4,124],[4,124],[0,110],[-4,102],[4,100],[0,92],[-9,74],[9,72],[0,64],[-6,52],[7,48],[0,40],[-2,28],[6,24],[0,12],[-8,4],[8,6],[0,-6],[-10,-9],[10,-9]];
function radGruppe(par){const g=grp(0,0,0,par),r=[0,1,2].map(i=>{const q=radler(g,BUNT[(i*3)%8]);q.position.set(-i*3,0,(i-1)*1.8);return q});g.userData.anim=t=>r.forEach(q=>q.userData.anim(t));return g}
function paradeBauen(){const liste=[[toni,1.2],[feuerwehr,.42],[polizeiAuto,.45],[q=>busM(q,K.gelb),.4],[muell,.42],[q=>zugM(q,2),.27],[radGruppe,.5],[bagger,.5],[toni,.8]];
  liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})});vmPass()}
