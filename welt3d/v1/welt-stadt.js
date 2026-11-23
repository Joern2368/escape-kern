/* Welt: Stadt (Kennwort stadt). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
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
  kBox(x,z,w,d)}
function kasten(x,y,z,w){qb(w,.4,.55,K.holz,x,y,z);for(let i=0;i<4;i++)qs(.2,BUNT[(i*3+Math.round(x))&7],x-w*.375+i*w*.25,y+.38,z)}
function fahne(x,z,h,farbe,fl){qc(.07,h,K.grau,x,h/2,z,scene,true);const f=qb(1.5,.9,.06,farbe,x+.8,h-.55,z);if(fl)bewegt(f,t=>{f.rotation.y=Math.sin(t*2+x)*.25},x,z,70);kreis(x,z,.3)}
function markise(par,w,y,fa,fb){const n=6;for(let i=0;i<n;i++){const m=box(w/n,.14,2.9,i%2?fb:fa,-w/2+(i+.5)*w/n,y,.55,par);m.rotation.x=.22}}
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
function wegweiserN(x,z,namen,rot){const g=grp(x,0,z);qc(.1,3.6,0x7a5230,0,1.8,0,g,true);namen.forEach((n,i)=>{const s=schildText(n,'#fff8e6',3.6,.8,50);s.position.set(.1,3.3-i*.9,.12);g.add(s);const s2=s.clone();s2.position.z=-.12;s2.rotation.y=Math.PI;g.add(s2)});g.rotation.y=rot||0;kreis(x,z,.4);return g}
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
function leucht(par,x,y,z,r,m){const s=new THREE.Mesh(gSph,m);s.scale.set(r,r,r);s.position.set(x,y,z);par.add(s);return s}
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
function lichter(g,x,y,z,b){[-1,1].forEach(s=>{box(.1,.25,.45,K.gelb,x,y,s*z,g);box(.1,.25,.45,K.rot,-x+(b||0),y,s*z,g)})}
function pkw(par,f,fest){const g=grp(0,0,0,par);if(!fest)g.userData.keep=1;box(4.2,.8,2,f,0,.85,0,g,true);box(2.2,.75,1.8,f,-.3,1.6,0,g);box(1.9,.5,1.84,K.himmel,-.3,1.65,0,g);box(2.24,.5,1.5,K.himmel,-.3,1.65,0,g);rad4(g,[-1.3,1.3],.45,.95);lichter(g,2.12,.95,.62);return g}
function parken(f,x,z,rot){const g=pkw(scene,f,true);g.position.set(x,0,z);g.rotation.y=rot||0;kreis(x,z,2.2);return g}
function feuerwehr(par,fest){const g=grp(0,0,0,par);g.userData.keep=1;
  box(7.6,.9,2.7,K.schwarz,0,.55,0,g);box(2.2,2,2.6,K.rot,2.7,1.9,0,g,true);box(.12,.9,2.2,K.himmel,3.82,2.3,0,g);box(4.8,2,2.6,K.rot,-1.2,1.9,0,g,true);box(7.4,.3,2.65,K.weiss,0,1.4,0,g);rad4(g,[-2.4,2.6],.65,1.25);lichter(g,3.82,1.2,.8);
  const le=grp(-1.2,3.1,0,g);[-.45,.45].forEach(s=>box(4.6,.14,.14,K.grau,0,0,s,le));for(let i=0;i<5;i++)box(.1,.1,1,K.grau,-2+i,0,0,le);
  const b1=leucht(g,2.6,3.05,.6,.28,MBLAU),b2=leucht(g,2.6,3.05,-.6,.28,MBLAU);
  g.userData.anim=t=>{const a=Math.sin(t*7)>0;b1.visible=a;b2.visible=!a;le.rotation.z=.04+(Math.sin(t*.8)+1)*.16;le.rotation.y=Math.sin(t*.6)*.5};return g}
function polizeiAuto(par){const g=pkw(par,K.weiss);box(4.3,.3,2.05,K.blau,0,.9,0,g);box(1.4,.18,1.6,K.blau,-.3,1.95,0,g);
  const b1=leucht(g,-.3,2.1,.55,.25,MBLAU),b2=leucht(g,-.3,2.1,-.55,.25,MBLAU);g.userData.anim=t=>{const a=Math.sin(t*6)>0;b1.visible=a;b2.visible=!a};return g}
function rettung(par){const g=grp(0,0,0,par);g.userData.keep=1;box(6.2,.8,2.4,K.schwarz,0,.5,0,g);box(2,1.9,2.3,K.weiss,2.1,1.8,0,g,true);box(.1,.8,2,K.himmel,3.12,2.2,0,g);box(4.2,2.5,2.4,K.weiss,-1,2.05,0,g,true);box(6.1,.35,2.45,K.rot,0,1.5,0,g);box(1,1.1,.1,K.rot,-1,2.5,1.25,g);box(.3,.3,.12,K.weiss,-1,2.5,1.3,g);rad4(g,[-1.9,2.1],.6,1.1);lichter(g,3.12,1.2,.8);
  const b1=leucht(g,2.2,2.95,.5,.25,MBLAU),b2=leucht(g,2.2,2.95,-.5,.25,MBLAU);g.userData.anim=t=>{const a=Math.sin(t*6)>0;b1.visible=a;b2.visible=!a};return g}
function busM(par,f){const g=grp(0,0,0,par);g.userData.keep=1;box(9,2.4,2.7,f||K.gelb,0,1.9,0,g,true);box(8.4,.9,2.74,K.himmel,-.1,2.35,0,g);box(9.2,.2,2.8,K.weiss,0,3.2,0,g);box(8,.9,2.6,K.schwarz,0,.5,0,g);box(.1,1,2.4,K.himmel,4.52,2.2,0,g);box(.1,.35,1.4,K.dunkel,4.52,3.0,0,g);rad4(g,[-2.9,2.9],.6,1.25);lichter(g,4.52,1.2,.9);return g}
function muell(par){const g=grp(0,0,0,par);g.userData.keep=1;box(7.4,.8,2.6,K.schwarz,0,.5,0,g);box(2.4,2.2,2.5,K.orange,2.6,1.9,0,g,true);box(.1,.9,2.2,K.himmel,3.82,2.4,0,g);box(4.8,2.5,2.5,K.orange,-1.4,2.15,0,g,true);box(1.4,2.2,2.5,K.dunkel,-4.2,1.9,0,g);box(4.8,.25,2.55,K.weiss,-1.4,2.2,0,g);rad4(g,[-3.2,2.6],.65,1.2);lichter(g,3.82,1.2,.8);
  const l=leucht(g,2.6,3.2,0,.25,MGELB);g.userData.anim=t=>{l.visible=Math.sin(t*5)>0};return g}
function wagenM(par,f){const g=grp(0,0,0,par);box(5.4,2.4,2.5,K.weiss,0,1.9,0,g,true);box(5,.9,2.55,K.himmel,0,2.4,0,g);box(5.4,.3,2.55,f,0,1.35,0,g);box(5.4,.25,2.6,K.dunkel,0,3.2,0,g);box(5,.9,2.6,K.schwarz,0,.6,0,g);return g}
function zugM(par,n){const g=grp(0,0,0,par);g.userData.keep=1;box(5,2.4,2.5,K.rot,0,1.9,0,g,true);box(.1,1,2.2,K.himmel,2.52,2.4,0,g);box(5,.25,2.6,K.weiss,0,3.2,0,g);box(4.6,.9,2.6,K.schwarz,0,.6,0,g);box(.5,1.2,2.3,K.dunkel,2.7,1.5,0,g);leucht(g,2.55,1.7,.8,.2,MGELB);leucht(g,2.55,1.7,-.8,.2,MGELB);
  for(let i=1;i<=n;i++)wagenM(g,i%2?K.gelb:K.blau).position.x=-5.8*i;return g}
function radler(par,j,fest){const g=grp(0,0,0,par);if(!fest)g.userData.keep=1;[-.85,.85].forEach(x=>{cyl(.5,.1,K.schwarz,x,.5,0,g).rotation.x=Math.PI/2});box(1.9,.12,.12,K.rot,0,.85,0,g);box(.1,.7,.1,K.grau,.85,.9,0,g);
  cyl(.27,.9,j,-.2,1.55,0,g);sph(.27,HAUT[Math.floor(rnd()*4)],-.1,2.2,0,g);sph(.3,K.gelb,-.1,2.35,0,g,1,.6,1);
  const bl=grp(-.2,1.05,.22,g),br=grp(-.2,1.05,-.22,g);[bl,br].forEach(b=>box(.15,.8,.15,K.dunkel,.1,-.4,0,b));
  if(!fest)g.userData.anim=t=>{bl.rotation.z=Math.sin(t*8)*.7;br.rotation.z=-Math.sin(t*8)*.7};return g}
function bagger(par){const g=grp(0,0,0,par);g.userData.keep=1;box(4.6,.8,2.8,K.schwarz,0,.5,0,g);const dr=grp(0,.9,0,g);box(2.8,1.2,2.4,K.gelb,0,.6,0,dr,true);box(1.3,1.2,1.4,K.himmel,.7,1.7,.4,dr);box(1,.8,2.2,K.dunkel,-1.2,.5,0,dr);
  const a1=grp(1.3,.9,-.6,dr);box(3.4,.4,.4,K.gelb,1.6,0,0,a1);const a2=grp(3.2,0,0,a1);box(2.6,.35,.35,K.gelb,1.2,0,0,a2);const sch=grp(2.5,0,0,a2);box(.9,.8,1.2,K.dunkel,.2,-.3,0,sch);
  g.userData.anim=t=>{dr.rotation.y=Math.sin(t*.5)*.9;a1.rotation.z=.5+Math.sin(t*.9)*.35;a2.rotation.z=-.9+Math.sin(t*.9+1)*.5;sch.rotation.z=-.4+Math.sin(t*1.8)*.5};return g}
function schiff(par){const g=grp(0,0,0,par);g.userData.keep=1;box(11,1.5,3.8,K.dunkel,0,.45,0,g,true);box(1.6,1.2,3.4,K.dunkel,5.9,.6,0,g);box(3.2,2.4,3,K.weiss,-3.6,2.4,0,g,true);box(3.4,.7,3.1,K.himmel,-3.6,2.8,0,g);qc2(g);
  [[-1.2,K.rot],[1.4,K.blau],[3.8,K.gelb]].forEach((c,i)=>{box(2.2,1.6,2.8,c[1],c[0]+.4,2.1,0,g);box(2.2,1.6,2.8,BUNT[(i+4)%8],c[0]+.4,3.7,0,g)});return g}
function qc2(g){cyl(.55,1.8,K.gelb,-3.9,4.4,0,g);cyl(.6,.4,K.rot,-3.9,5.2,0,g)}
function heli(par){const g=grp(0,0,0,par);g.userData.keep=1;sph(1.1,K.rot,0,1.5,0,g,1.5,1,.9).castShadow=true;sph(.8,K.himmel,1,1.7,0,g,.9,.9,.9);box(3,.35,.35,K.rot,-2.3,1.8,0,g);box(.2,.9,.14,K.rot,-3.7,2.1,0,g);[-1,1].forEach(s=>{box(2.6,.1,.1,K.dunkel,0,.35,s*.7,g);box(.1,.9,.1,K.dunkel,.6,.8,s*.7,g);box(.1,.9,.1,K.dunkel,-.6,.8,s*.7,g)});
  const ro=grp(0,2.7,0,g);box(6,.07,.28,K.dunkel,0,0,0,ro);box(.28,.07,6,K.dunkel,0,0,0,ro);box(.14,.4,.14,K.grau,0,-.2,0,ro);g.userData.anim=t=>{ro.rotation.y=t*14};return g}
function kranBauen(x,z,h,jib,farbe,fern){qb(1,h,1,farbe,x,h/2,z,scene,true);for(let i=0;i<5;i++)qb(1.5,.2,1.5,K.grau,x,h*.2*(i+.5)*1,z);kreis(x,z,1.2);
  const dr=grp(x,h,z);box(.9,1.2,1.4,K.himmel,.4,.8,.9,dr);box(jib,.5,.5,farbe,jib*.3,.3,0,dr);box(3,1.4,1.4,K.dunkel,-jib*.35,.4,0,dr);box(.3,2,.3,farbe,0,1.5,0,dr);
  const sl=box(.6,.5,.7,K.dunkel,jib*.4,-.2,0,dr),sei=cyl(.05,1,K.schwarz,jib*.4,-1,0,dr),ha=box(.7,.5,.7,K.gelb,jib*.4,-2,0,dr);
  bewegt(dr,t=>{dr.rotation.y=Math.sin(t*.35)*1.2;const k=3+Math.sin(t*.9)*2.4;sei.scale.y=k;sei.position.y=-.2-k/2;ha.position.y=-.2-k-.2},x,z,fern||110)}
function ente(par){const g=grp(0,0,0,par);g.userData.keep=1;sph(.42,0xa07a50,0,.2,0,g,1.35,.8,1);sph(.26,0x2f7a5a,.5,.5,0,g);cone(.1,.3,K.orange,.8,.45,0,g).rotation.z=-Math.PI/2;sph(.1,K.weiss,.4,.38,0,g,1,.4,1.4);box(.4,.1,.3,0x7a5a3a,-.55,.35,0,g).rotation.z=.3;return g}
function schmetterling(cx,cz,r,col,i){const g=grp(cx,1.5,cz);g.userData.keep=1;const f=[-1,1].map(s=>{const w=grp(0,0,0,g);sph(.2,col,0,0,s*.2,w,1,.12,1.1);return w});sph(.06,K.dunkel,0,0,0,g,.6,.6,2);
  bewegt(g,t=>{const a=t*.7+i*2.1;g.position.set(cx+Math.cos(a)*r+Math.sin(t*1.7)*.6,1.3+Math.sin(t*1.3+i)*.5,cz+Math.sin(a*1.3)*r);g.rotation.y=-a;f.forEach((w,k)=>{w.rotation.x=(k?1:-1)*Math.abs(Math.sin(t*14))*1.1})},cx,cz,90)}
function dinoBau(par){const g=grp(0,0,0,par),b=K.creme;
  for(let i=0;i<8;i++)sph(.32,b,-2.4+i*.7,2.5+Math.sin(i/7*Math.PI)*.5,0,g);for(let i=0;i<4;i++)box(.1,1.2,.9,b,-.8+i*.8,1.7,0,g);
  [[-1.4,.5],[-1.4,-.5],[1.4,.5],[1.4,-.5]].forEach(p=>cyl(.14,2,b,p[0],1,p[1],g));
  for(let i=0;i<6;i++)sph(.3-i*.04,b,-3.2-i*.8,2.3-i*.15,0,g);
  const nk=grp(2.6,2.8,0,g);for(let i=0;i<6;i++)sph(.26-i*.015,b,i*.38,i*.5,0,nk);const kp=grp(2.3,3.2,0,nk);box(.9,.4,.4,b,.3,0,0,kp);sph(.1,K.dunkel,.2,.1,.22,kp);sph(.1,K.dunkel,.2,.1,-.22,kp);
  g.userData.nk=nk;return g}
function postAuto(par){const g=grp(0,0,0,par);g.userData.keep=1;box(5.6,.8,2.3,K.schwarz,0,.5,0,g);box(3.6,2.2,2.3,K.gelb,-.9,1.8,0,g,true);box(1.6,1.6,2.3,K.gelb,1.9,1.5,0,g);box(.1,.7,2,K.himmel,2.72,1.9,0,g);box(5.6,.15,2.35,K.rot,0,1.2,0,g);return g}
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
  const pl=grp(13,0,138);[-1,1].forEach(s=>qc(.1,3.2,K.holz,s*2,1.6,0,pl,true));const pm=plakat();pm.position.set(0,3.1,.08);pl.add(pm);qb(4.2,5.4,.1,K.holz,0,3.1,0,pl);tafel('Stadtplan',13,6.4,138.12,3.8,.9);kreis(13,138,2.3);
  const t=toni(scene);t.position.set(-9,0,140);t.scale.setScalar(1.6);t.rotation.y=-Math.PI/2;lebendig.push({o:t,ph:0});kreis(-9,140,1.8);qc(.08,1.2,K.holz,-9,.6,143.5);tafel('Ich bin Toni!',-9,1.5,143.5,3.4,.7,null,0,34);
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
(function(){zebra(0,84,false);qb(.4,.03,3.6,K.weiss,5.7,.095,81.8);qb(.4,.03,3.6,K.weiss,-5.7,.095,86.2);
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
  qc(1.6,3,K.rot,153,1.5,-94);qc(1.4,3,K.weiss,153,4.5,-94);qc(1.2,3,K.rot,153,7.5,-94);qk(1.2,1.2,K.dunkel,153,9.6,-94);leucht(scene,153,8.9,-94,.45,MGELB);kreis(153,-94,1.7);
  [112,121].forEach((x,i)=>{const g=grp(x,0,-100.4);qb(3.4,.6,1.4,K.rot,0,.15,0,g);qc(.05,2.4,K.grau,0,1.3,0,g);qb(.05,1.8,1.2,K.weiss,0,1.5,.5,g);bewegt(g,t=>{g.position.y=Math.sin(t*1.5+x)*.08;g.rotation.z=Math.sin(t*1.1+x)*.05},x,-101,90)});
  const sh=schiff(scene);bewegt2(sh,t=>{const x=schiffX(t),v=Math.cos(t*.08);sh.position.set(x,.1+Math.sin(t*2)*.05,-103);sh.rotation.y=v>0?0:Math.PI},170);
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
  tafel('Notruf 112',cx+12,2.4,-26,2.6,.8);qc(.07,2.2,K.holz,cx+12,1.1,-26);fahne(cx-10,-27,10,K.rot,true);laterne(cx-12,-14);laterne(cx+12,-14);eimer(cx+9,-16);beet(cx-12,-20,3,12)})();
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
  const h=heli(scene);h.position.set(-124,.3,-8);h.rotation.y=Math.PI/2;lebendig.push({o:h,ph:0});kreis(-124,-8,2.6);tafel('Landeplatz',-124,2,-1.6,3.6,.7);qc(.06,2,K.holz,-124,1,-1.6);
  fahne(cx-13,-20,11,K.blau,true);baeumchen(cx-14,-8,1.1);baeumchen(cx+16,-4,1.1);bank(cx-4,-12,0);bank(cx+4,-12,0);laterne(cx-8,-14);laterne(cx+8,-14);beet(cx-10,-14,3,12);beet(cx+12,-8,3,12);eimer(cx,-12)})();
/* ---------- Schule mit Schulhof ---------- */
(function(){const cx=-158;scheibe(cx,34,19,K.hellgrau,.1);
  bau(cx,24,28,9,8,K.gelb,K.ziegel,{n:7,et:2});tafel('Schule',cx,4.3,28.65,5,1.2,null,0,58);qb(3.4,4,3.4,K.sand,cx,10,24,scene,true);qk(2.6,2.8,K.ziegel,cx,13.4,24);qc(.9,.2,K.weiss,cx,10.5,25.75).rotation.x=Math.PI/2;
  for(let i=0;i<5;i++)qb(1.1,.03,1.1,BUNT[i],cx-9,.11,44+i*1.25);qb(1.1,.03,1.1,K.weiss,cx-9,.11,50.5);
  qc(.1,3.4,K.grau,cx+12,1.7,42);qb(1.6,1,.1,K.weiss,cx+12,3.5,41.9);const kb=new THREE.Mesh(new THREE.TorusGeometry(.38,.04,6,12),mat(K.orange));kb.rotation.x=Math.PI/2;kb.position.set(cx+12,3.1,42.45);scene.add(kb);kreis(cx+12,42,.5);
  for(let i=0;i<3;i++){const r=radler(scene,BUNT[i+3],true);r.position.set(cx-17,0,34+i*1.2);r.rotation.y=Math.PI/2}qb(.1,.5,4,K.grau,cx-17.6,.3,35.2);
  const kid=[0,1,2,3].map(i=>kleinKind(scene,BUNT[(i*2+1)%8],HAUT[i]));
  bewegt(kid,t=>{kid.forEach((k,i)=>{const ph=i<3?t*(.8+i*.05)+i*.9:t*.8+.55,a=ph,x=cx+Math.cos(a)*(i<3?8:7.5),z=45+Math.sin(a)*(i<3?5.5:5);k.position.set(x,Math.abs(Math.sin(t*9+i))*.12,z);k.rotation.y=Math.atan2(-Math.sin(a)*8,Math.cos(a)*5.5)})},cx,45,100);
  fahne(cx+16,30,10,K.rot,true);bank(cx-6,32,0);bank(cx+6,32,0);baeumchen(cx-17,46,1.2);baeumchen(cx+16,26,1.1);laterne(cx-14,32);laterne(cx+14,32);eimer(cx+3,31)})();
/* ---------- Bibliothek mit Lesegarten ---------- */
(function(){const cx=-104;scheibe(cx,26,14,K.platz,.1);scheibe(cx,33,8,0x7cc16a,.12);
  bau(cx,17,18,8,7,K.ziegel,K.dunkel,{flach:true,n:5,et:2});qb(6.4,.2,2.6,K.blau,cx,7.7,17);const p1=qb(3,.2,2.4,K.weiss,cx-1.5,8,17),p2=qb(3,.2,2.4,K.weiss,cx+1.5,8,17);p1.rotation.z=.22;p2.rotation.z=-.22;
  tafel('Bibliothek',cx,4.3,21.65,7,1.1,null,0,50);
  for(let i=0;i<3;i++){const a=2.4+i*.95;bank(cx+Math.cos(a)*5.5,33+Math.sin(a)*4.5*.8,Math.atan2(-Math.cos(a),-Math.sin(a)))}
  qb(1.6,2,.8,K.holz,cx+8,1,34);for(let i=0;i<8;i++)qb(.18,.5,.5,BUNT[i],cx+7.4+i*.17,.7+(i%2)*.8,34.1);qb(1.9,.2,1.1,K.rot,cx+8,2.1,34);kreis(cx+8,34,1);
  qc(.06,2.6,K.holz,cx,1.3,40.4);tafel('Lesegarten',cx,2.8,40.45,3.6,.8);baeumchen(cx-9,32,1.1);baeumchen(cx+10,28,1.1);baeumchen(cx-6,38,1);beet(cx-4,36,3,12);beet(cx+4,38,3,12);laterne(cx-10,24);laterne(cx+10,24);eimer(cx+6,24);
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
  qc(.08,3,K.holz,cx-4,1.5,-56);qc(.08,3,K.holz,cx+4,1.5,-56);tafel('Recyclinghof',cx,3.2,-56,6.4,1.2,null,0,46);laterne(cx-10,-58);laterne(cx+10,-58)})();
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
  qc(.06,1.2,K.holz,cx+5.5,.6,63);tafel('Frische Brötchen',cx+5.5,1.5,63.05,2.6,.7,null,0,34);kasten(cx+2.7,1.3,59.9,3);bank(cx-6,64,0);laterne(cx+6,58);eimer(cx-5,60)})();
/* ---------- Eisdiele ---------- */
(function(){const cx=34;scheibe(cx,62,10,K.platz,.1);bau(cx,57,9,6,5,K.rosa,K.weiss,{n:2,et:1,tx:0});
  const co=qk(1.1,3,K.sand,cx,8.4,57);co.rotation.x=Math.PI;qs(1.2,K.creme,cx,10.2,57);qs(1.1,K.braun,cx,11.2,57);qs(1.0,K.rosa,cx,12.1,57);qs(.3,K.rot,cx,13.1,57);
  const g=grp(cx,0,59.5);markise(g,6,3.3,K.tuerkis,K.weiss);tafel('Eisdiele',cx,4.1,60.15,5,.9,'#ffe0ec');
  tisch(cx-6,66,K.rosa);tisch(cx,67.5,K.tuerkis);tisch(cx+6,66,K.gelb);tafel('Eis 1 Euro',cx+5.5,1.2,61.2,2.4,.7,null,0,34);qc(.06,1.2,K.holz,cx+5.5,.6,61.2);
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
  qc(1.3,2.8,K.himmel,cx,1.5,105.4);qb(.12,2.8,2.5,K.grau,cx,1.5,105.4);qb(5,.3,2.2,K.rot,cx,3.5,106.2);[-2.3,2.3].forEach(s=>qc(.08,3.4,K.grau,cx+s,1.7,107.2));
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
  [0,1,2,3].forEach(i=>schmetterling(-56+(i-1.5)*8,-72+(i%2?8:-8),4,BUNT[(i*2+1)%8],i));qc(.06,2.2,K.holz,cx-5,1.1,-52.4);qc(.06,2.2,K.holz,cx+5,1.1,-52.4);tafel('Stadtpark',cx,2.4,-52.4,4.4,.9)})();
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
  bank(cx-9,cz+4,Math.PI/2);bank(cx+12,cz+4,-Math.PI/2);eimer(cx-8,cz+10);baeumchen(cx-11,cz-9,1);baeumchen(cx+11,cz+9,1);beet(cx-3,cz-10,3,10);qc(.06,2.2,K.holz,cx-4,1.1,cz+13.5);qc(.06,2.2,K.holz,cx+4,1.1,cz+13.5);tafel('Spielplatz',cx,2.4,cz+13.5,4.6,.9)})();
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
  bau(-100,-63,5,3.4,3.2,K.tuerkis,K.weiss,{flach:true,n:1,et:1});qc(.1,3.8,K.holz,-116,1.9,-63);qc(.1,3.8,K.holz,-108,1.9,-63);tafel('Schwimmbad',-112,3.8,-63,7,1.2,null,0,50);const rr=new THREE.Mesh(new THREE.TorusGeometry(.5,.14,6,12),mat(K.rot));rr.position.set(cx+6,1.6,-75.2);scene.add(rr);
  qb(24,1.4,.8,K.laub,cx,.7,-91);laterne(cx-9,-64);laterne(cx+9,-64);baeumchen(cx-15,-86,1);baeumchen(cx+15,-86,1);eimer(cx+3,-66)})();
/* ---------- Sportplatz ---------- */
(function(){const cx=155,cz=-128;scheibe(cx,cz,22,K.hellgrau,.08);const e1=qc(1,.1,K.ziegel,cx,.07,cz);e1.scale.set(22,.1,13.5);const e2=qc(1,.12,0x5fb04a,cx,.08,cz);e2.scale.set(18,.12,9.6);
  [[26,.2,0,-6.2],[26,.2,0,6.2]].forEach(l=>qb(l[0],.03,l[1],K.weiss,cx,.16,cz+l[3]));[-12.5,0,12.5].forEach(x=>qb(.2,.03,12.4,K.weiss,cx+x,.16,cz));const mk=new THREE.Mesh(new THREE.TorusGeometry(2.4,.07,4,20),mat(K.weiss));mk.rotation.x=Math.PI/2;mk.position.set(cx,.17,cz);scene.add(mk);
  [-1,1].forEach(s=>{const x=cx+s*12.9;[-1.8,1.8].forEach(q=>qc(.1,2.4,K.weiss,x,1.2,cz+q));qb(.12,.12,3.8,K.weiss,x,2.4,cz);qb(.05,2.2,3.6,K.hellgrau,x+s*.9,1.2,cz);kreis(x,cz-1.8,.4);kreis(x,cz+1.8,.4)});
  for(let k=0;k<3;k++)qb(18,.8,1.6,K.grau,cx,.4+k*.8,cz-16.5-k*1.5);qb(19,.3,5.5,K.blau,cx,5,cz-18.5);[-8,8].forEach(x=>qc(.15,5,K.grau,cx+x,2.5,cz-15));kBox(cx,cz-18,18,6);
  for(let i=0;i<9;i++){const k=i%3,x=cx-7+i*1.7,z=cz-16.5-k*1.5,y=.8+k*.8;qb(.5,.6,.4,BUNT[(i*3)%8],x,y+.3,z);qs(.28,HAUT[i%4],x,y+.9,z)}
  [-1,1].forEach(s=>{qc(.2,12,K.grau,cx+s*21,6,cz+16);qb(2.2,1.2,.4,K.dunkel,cx+s*21,12.3,cz+16);lampe(cx+s*21-.6,12.3,cz+16.3,'warm');lampe(cx+s*21+.6,12.3,cz+16.3,'warm');kreis(cx+s*21,cz+16,.4)});
  const ru=[0,1,2,3,4].map(i=>kleinKind(scene,BUNT[(i*2)%8],HAUT[i%4]));bewegt(ru,t=>{ru.forEach((k,i)=>{const a=-t*(.28+i*.03)+i*1.3;k.position.set(cx+Math.cos(a)*(19.5-i%2*1.4),Math.abs(Math.sin(t*10+i))*.1,cz+Math.sin(a)*(11.6-i%2*.9));k.rotation.y=Math.atan2(Math.sin(a)*19.5,-Math.cos(a)*11.6)})},cx,cz,120);
  const ball=qs(.3,K.weiss,cx,.4,cz);bewegt(ball,t=>{ball.position.set(cx+Math.sin(t*.6)*10,.4+Math.abs(Math.sin(t*1.8))*.3,cz+Math.sin(t*.9)*3)},cx,cz,100);
  qc(.06,2.2,K.holz,cx-4,1.1,cz+18);qc(.06,2.2,K.holz,cx+4,1.1,cz+18);tafel('Sportplatz',cx,2.4,cz+18,4.8,.9);fahne(cx-20,cz-14,9,K.rot,true);fahne(cx+20,cz-14,9,K.blau,true);bank(cx-8,cz+16,0);bank(cx+8,cz+16,0);eimer(cx,cz+16)})();
/* ---------- Kino ---------- */
(function(){const cx=100;scheibe(cx,-62,12,K.platz,.1);bau(cx,-68,14,8,9,K.lila,K.dunkel,{flach:true,fenster:false,tuer:false});
  qb(10,1.6,3,K.dunkel,cx,4.8,-62.2);tafel('KINO',cx,4.8,-60.65,8,1.3,'#ffe27a',0,64);for(let i=0;i<15;i++){lampe(cx-5+i*.714,5.7,-60.6,LART[i%4]);lampe(cx-5+i*.714,3.9,-60.6,LART[(i+2)%4])}
  [[-5.5,K.rot],[5.5,K.blau],[-5.5,K.gruen]].forEach((p,i)=>{if(i<2){qb(2.4,3.4,.15,p[1],cx+p[0],6.8,-63.9);qb(1.8,1.2,.2,K.gelb,cx+p[0],7.5,-63.8);qb(1.8,1.2,.2,K.weiss,cx+p[0],6.1,-63.8)}});
  qb(3.6,3,.2,K.schwarz,cx,1.5,-63.9);qb(3,.04,8,K.rot,cx,.1,-58);
  qb(2.6,2.6,2.2,K.tuerkis,cx+8,1.3,-57,scene,true);qb(1.6,1,.1,K.himmel,cx+8,1.6,-55.9);tafel('Kasse',cx+8,2.9,-55.85,1.6,.5);kBox(cx+8,-57,2.6,2.2);
  qb(2,1,1.2,K.rot,cx-8,.8,-57,scene,true);qb(1.8,1,1,K.himmel,cx-8,1.8,-57);for(let i=0;i<6;i++)qs(.2,i%2?K.weiss:K.gelb,cx-8.6+i*.25,1.5,-57+(i%2)*.2);qc(.5,.15,K.grau,cx-8.7,.4,-56.2).rotation.x=Math.PI/2;kreis(cx-8,-57,1.4);
  fahne(cx-7,-70,11,K.lila,true);laterne(cx-9,-53);laterne(cx+9,-53);bank(cx,-52,0);eimer(cx+4,-52);beet(cx-11,-62,2.5,10);beet(cx+11,-62,2.5,10)})();
/* ---------- Museum mit Dino-Skelett ---------- */
(function(){const cx=52;scheibe(cx,-70,15,K.platz,.1);bau(cx,-76,24,9,8.5,K.creme,K.sand,{flach:true,fenster:false,tuer:false});
  for(let i=0;i<6;i++){qc(.6,7.2,K.weiss,cx-10+i*4,3.6,-69.6,scene,true);kreis(cx-10+i*4,-69.6,.6)}qb(24.6,1.4,2,K.sand,cx,7.9,-69.6);qb(24.6,.8,1.6,K.sand,cx,8.9,-69.8);qb(16,.8,1.4,K.sand,cx,9.7,-69.9);qb(8,.8,1.2,K.sand,cx,10.5,-70);tafel('Museum',cx,7.9,-68.55,8,1.1,'#fff8e6',0,56);
  qb(26,.3,2,K.grau,cx,.15,-67.8);qb(24,.3,1.6,K.grau,cx,.45,-68.4);qb(9,5.4,.15,K.dunkel,cx,3.6,-71.4);[-1,1].forEach(s=>kreis(cx+s*11,-69.6,.7));kBox(cx,-76,24,9);
  const d=dinoBau(scene);d.position.set(cx,.3,-71);d.scale.setScalar(.8);const nk=d.userData.nk;bewegt(nk,t=>{nk.rotation.z=Math.sin(t*.8)*.08},cx,-71,100);
  [-13.4,13.4].forEach((x,i)=>qb(1.5,5,.1,i?K.rot:K.blau,cx+x,4,-70.2));fahne(cx-14,-62,9,K.blau,true);fahne(cx+14,-62,9,K.rot,true);
  bank(cx-8,-62,0);bank(cx+8,-62,0);laterne(cx-11,-62);laterne(cx+11,-62);beet(cx-5,-64,2.5,10);beet(cx+5,-64,2.5,10);baeumchen(cx-14,-66,1.1);baeumchen(cx+14,-66,1.1)})();
/* ---------- Baustelle ---------- */
(function(){const cx=-110,cz=-130;scheibe(cx,cz,18,0xd9c9a0,.1);for(let i=0;i<14;i++){const x=cx-13+i*2;if(Math.abs(x-cx)<2.2)continue;qb(1.9,1.1,.12,K.orange,x,.55,-114.5);qb(1.9,.15,.14,K.weiss,x,.8,-114.5)}kreisLinie(cx-13,-114.5,cx-3,-114.5,.9,2);kreisLinie(cx+3,-114.5,cx+13,-114.5,.9,2);
  tafel('Achtung Baustelle',cx,2.8,-114.2,5.4,.9,'#ffd45e',0,34);qc(.06,2.4,K.holz,cx-2.6,1.2,-114.2);qc(.06,2.4,K.holz,cx+2.6,1.2,-114.2);
  kranBauen(cx+14,-142,24,22,K.gelb,130);
  const gx=cx-8,gz=-134;for(let k=0;k<3;k++){qb(12,.5,9,K.grau,gx,.25+k*3.6,gz);if(k<2)[[-5.5,-4],[5.5,-4],[-5.5,4],[5.5,4]].forEach(p=>qb(.6,3.1,.6,K.grau,gx+p[0],1.8+k*3.6,gz+p[1]))}qb(12,1.8,.5,K.ziegel,gx,1.15,gz+4);qb(.4,2.4,.4,K.holz,gx-4,5.5,gz+4);kBox(gx,gz,12,9);
  const bg=bagger(scene);bg.position.set(cx+6,0,-124);bg.rotation.y=-.6;lebendig.push({o:bg,ph:0});kreis(cx+6,-124,2.6);qk(3,2,0x9a7a52,cx+12,1,-123);qk(2,1.4,0xd9c068,cx-12,.7,-122);
  const mx2=grp(cx-2,0,-122);mx2.userData.keep=1;box(6,.8,2.4,K.schwarz,0,.5,0,mx2);box(2,1.8,2.3,K.gelb,2.3,1.7,0,mx2,true);box(.1,.8,2,K.himmel,3.32,2.1,0,mx2);const sp=grp(-.8,2.1,0,mx2);const dru=cyl(1.2,3.6,K.orange,0,0,0,sp);dru.rotation.z=Math.PI/2;box(3.4,.15,.5,K.weiss,0,1.22,0,sp);box(3.4,.15,.5,K.weiss,0,-.6,1.06,sp);mx2.userData.anim=t=>{sp.rotation.x=t*1.4};lebendig.push({o:mx2,ph:0});kreis(cx-2,-122,3);
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
  [0,1,2].forEach(i=>schmetterling(160+i*10,52,5,BUNT[(i*3+2)%8],i));laterne(155,58);laterne(185,58);qc(.06,2.2,K.holz,cx-3,1.1,78.6);qc(.06,2.2,K.holz,cx+3,1.1,78.6);tafel('Wohnviertel',cx,2.5,78.7,4.6,.9)})();
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
function weitWeg(x,z){if(Math.abs(x)<8&&z>TORZ-2&&z<172)return true;if(Math.abs(z-84)<9&&x>-155)return true;if(Math.abs(z+47)<9&&x<126)return true;if(Math.abs(x+82)<9&&z>-100&&z<88)return true;if(Math.abs(x-76)<9&&z>-100&&z<88)return true;if(z>-116&&z<-90)return true;if(Math.abs(z-134)<7&&x<-30)return true;
  for(const e of EXTRAZONEN){if(e.name==='Straße')continue;if(Math.hypot(x-e.x,z-e.z)<e.r+6)return true}if(z<TORZ+2&&Math.hypot(x-FEST.x,z-FEST.z)<32)return true;if(Math.abs(x)<6&&z<TORZ)return true;return false}
for(let i=0;i<340;i++){const x=GRENZE.x0+8+rnd()*(GRENZE.x1-GRENZE.x0-16),z=GRENZE.z0+8+rnd()*(GRENZE.z1-GRENZE.z0-16);if(!weitWeg(x,z))baumListe.push({x,z,s:.8+rnd()*.5})}
for(let x=GRENZE.x0;x<=GRENZE.x1;x+=11){if(Math.abs(x)>8)baumListe.push({x,z:GRENZE.z1,s:1.2});baumListe.push({x,z:GRENZE.z0,s:1.2});if(Math.abs(x)>3.5)baumListe.push({x,z:TORZ,s:1})}
for(let z=GRENZE.z0;z<=GRENZE.z1;z+=11){baumListe.push({x:GRENZE.x0,z,s:1.2});baumListe.push({x:GRENZE.x1,z,s:1.2})}
const BAUMTEIL=[[gCyl,0x7a5230,0,1.3,0,.36,2.6,.36],[gSph,0x4aa84e,0,3.9,0,2.1,1.8,2.1],[gSph,0x5cba5c,1.2,3.4,.6,1.5,1.3,1.5],[gSph,0x3f9a46,-1.2,3.5,-.5,1.6,1.4,1.6]];
(function(){const n=baumListe.length;
  const ms=BAUMTEIL.map(m=>{const im=new THREE.InstancedMesh(m[0],mat(m[1]),n);im.frustumCulled=false;scene.add(im);return im});ms[1].castShadow=true;
  const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),SC=new THREE.Vector3();
  baumListe.forEach((t,i)=>{const s=t.s;BAUMTEIL.forEach((m,k)=>{P.set(t.x+m[2]*s,m[3]*s,t.z+m[4]*s);SC.set(m[5]*s,m[6]*s,m[7]*s);M.compose(P,Q,SC);ms[k].setMatrixAt(i,M)});kreis(t.x,t.z,.9*s)});
  ms.forEach(m=>{m.instanceMatrix.needsUpdate=true})})();
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
}
/* Wegpunkte der Besucher (nur auf dem freien Hauptweg südlich des Rathauses) */
const BPTS=[[0,146],[-5,142],[7,142],[0,128],[-4,124],[4,124],[0,110],[-4,102],[4,100],[0,92],[-9,74],[9,72],[0,64],[-6,52],[7,48],[0,40],[-2,28],[6,24],[0,12],[-8,4],[8,6],[0,-6],[-10,-9],[10,-9]];
function radGruppe(par){const g=grp(0,0,0,par),r=[0,1,2].map(i=>{const q=radler(g,BUNT[(i*3)%8]);q.position.set(-i*3,0,(i-1)*1.8);return q});g.userData.anim=t=>r.forEach(q=>q.userData.anim(t));return g}
function paradeBauen(){const liste=[[toni,1.2],[feuerwehr,.42],[polizeiAuto,.45],[q=>busM(q,K.gelb),.4],[muell,.42],[q=>zugM(q,2),.27],[radGruppe,.5],[bagger,.5],[toni,.8]];
  liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
