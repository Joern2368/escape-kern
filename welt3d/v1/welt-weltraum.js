/* Welt: Weltraum, Mondbasis (Kennwort weltraum). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Schwarzer Sternenhimmel mit Erde, heller grauer Mondboden, weiße Basis mit bunten Farbtupfern. Grün gibt es nur in der Gewächshaus-Kuppel und in der Park-Kuppel. Draußen keine Bäume, Wolken, Vögel oder Schmetterlinge, keine wehenden Fahnen (keine Luft). */
/* Aufbau: Süden Ankommen und Wohnen, Mitte Arbeiten und Versorgen, Norden Forschen (Krater, Lavahöhle, Startrampe). Querwege, ein geschwungener Hauptweg und ein Ringweg. */
/* Schilder: keine Hinweisschilder. Nur Ausgang, Geschafft!, Spielname und Zahlen-Schilder der Rätsel. */
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Roboter Pico';
const START={x:0,z:128};
const VERTEXFARBEN=true,MERGEZELLE=62,FERNBESUCHER=70,FERNLEBEN=92;
const ZOOMMAX=45;
/* Optionale Welt-Konstanten der Engine (nur diese Welt nutzt sie) */
const PITCHSTART=.44; /* Kamera beim Start etwas flacher, damit man weiter sieht */
const ABENDWERTE={sterne:1,hemi:[.55,.36],dir:[.62,.32]}; /* Sterne sind immer da; Licht am Tag und beim Finale */
const FEUERWERK=false; /* auf dem Mond: Lichtershow und Raketenstart statt Feuerwerk (siehe FINALESCHAU) */
const WELTORT='auf der Mondbasis';
/* Sammelstücke: mögliche Verstecke der 5 Edelsteine (abseits der Wege, in Ecken). Gefunden und geprüft mit werkzeuge/_verstecke.js; die Engine lost je Spiel 5 aus. */
const SAMMELPOOL=[
  {x:-136.4,z:-43.4,ort:'Batteriehaus'},{x:107,z:-180,ort:'Meteoriten-Feld'},{x:150,z:123,ort:'Erdblick-Plattform'},{x:-88.2,z:-78.6,ort:'Recyclingstation'},{x:30,z:13,ort:'Mondschule'},
  {x:-42,z:-94,ort:'Roboterwerkstatt'},{x:157,z:-77,ort:'Rover-Teststrecke'},{x:-139.5,z:9.7,ort:'Wasserwerk'},{x:35,z:110,ort:'Empfangsschleuse'},{x:-42.5,z:57,ort:'Wohnkuppeln'},
  {x:130,z:13,ort:'Trainingskarussell'},{x:37,z:-132,ort:'Satelliten-Werkstatt'},{x:-98,z:-31,ort:'Luftstation'},{x:80,z:67,ort:'Sporthalle mit Laufband'},{x:46.1,z:-182.4,ort:'Mondbeben-Messstation'},
  {x:77,z:-80,ort:'Rover-Garage'},{x:47,z:118,ort:'Empfangsschleuse'},{x:-36.6,z:-44.7,ort:'Kontrollzentrum'},{x:-49,z:14,ort:'Krankenstation'},{x:-144,z:-80.7,ort:'Spiegelteleskop-Feld'},
  {x:-85,z:67,ort:'Schlafkabinen'},{x:43,z:-44,ort:'Mondlabor'},{x:141,z:-123,ort:'Bohrturm'},{x:94,z:116,ort:'Museum der ersten Mondlandung'},{x:83,z:6,ort:'Schwebe-Übungshalle'}
];
const BEREICHE={};
/* 40 Orte in sieben Reihen, dazwischen Querwege (SEITENWEGE) */
const EXTRAZONEN=[
  {name:'Landeplatz mit Mondfähre',x:-42,z:119,r:13},{name:'Empfangsschleuse',x:42,z:118,r:12},{name:'Raumanzug-Werkstatt',x:-90,z:118,r:12},{name:'Museum der ersten Mondlandung',x:90,z:119,r:13},{name:'Erdblick-Plattform',x:141,z:118,r:12},{name:'Solarfeld',x:-142,z:118,r:14},
  {name:'Wohnkuppeln',x:-42,z:69,r:14},{name:'Weltraumküche und Kantine',x:42,z:69,r:13},{name:'Schlafkabinen',x:-89,z:69,r:12},{name:'Sporthalle mit Laufband',x:89,z:69,r:12},{name:'Gewächshaus-Kuppel',x:-142,z:69,r:14},{name:'Park-Kuppel',x:142,z:69,r:14},
  {name:'Krankenstation',x:-42,z:19,r:12},{name:'Mondschule',x:42,z:19,r:13},{name:'Algenzucht',x:-89,z:19,r:12},{name:'Wasserwerk',x:-141,z:19,r:13},{name:'Schwebe-Übungshalle',x:89,z:19,r:13},{name:'Trainingskarussell',x:141,z:19,r:13},
  {name:'Kontrollzentrum',x:-42,z:-33,r:14},{name:'Mondlabor',x:42,z:-33,r:13},{name:'Luftstation',x:-89,z:-33,r:12},{name:'Batteriehaus',x:-141,z:-33,r:12},{name:'Planetenpark',x:89,z:-33,r:14},{name:'Raumstations-Modell',x:141,z:-33,r:13},
  {name:'Roboterwerkstatt',x:-42,z:-84,r:13},{name:'Gesteinssammlung',x:42,z:-84,r:12},{name:'Recyclingstation',x:-89,z:-84,r:13},{name:'Rover-Garage',x:89,z:-84,r:13},{name:'Rover-Teststrecke',x:142,z:-84,r:14},{name:'Spiegelteleskop-Feld',x:-142,z:-84,r:13},
  {name:'Funkschüsseln',x:-141,z:-132,r:13},{name:'Frachtlager',x:-42,z:-132,r:13},{name:'Satelliten-Werkstatt',x:42,z:-132,r:13},{name:'Startrampe mit großer Rakete',x:89,z:-131,r:14},{name:'Großer Krater mit Aussichtssteg',x:-88,z:-132,r:15},{name:'Bohrturm',x:141,z:-132,r:12},
  {name:'Eiskrater',x:-87,z:-173,r:11},{name:'Lavahöhle',x:-139,z:-173,r:12},{name:'Mondbeben-Messstation',x:44,z:-173,r:11},{name:'Meteoriten-Feld',x:111,z:-173,r:12}
];
const SEITENWEGE=[94,44,-8,-58,-108,-154];
const WEGBOGEN=11;
const GRENZE={x0:-180,x1:180,z0:-234,z1:148};
const TORZ=-190, FEST={x:0,z:-212};
let FARBEN,ausgang;
const BPTS=[[0,128],[0,100],[0,60],[0,20],[0,-20]];
const STAUB=0x9a9eac,WEISS=0xe9ecf2,HELLGRAU=0xc9ced8,GRAU1=0x8b909c,DUNKEL=0x4a4f5e,METALL=0x9aa4b4,ORANGE=0xf59a2c,BLAU=0x3b8fd4,GELB=0xffd23e,ROT=0xe2564a,TUERKIS=0x2fc0c0,LILA=0x9a78d8,GOLD=0xdcae3c,PANEL=0x27407a;
const FELSF=[0x8c909a,0x7b7f8a,0x9a9da6,0x858893,0x989aa0];
const ANZUG=[0xf2f4f8,0xf59a2c,0x3b8fd4,0xe2564a,0xffd23e,0x9a78d8,0x2fc0c0,0xf07aa8];
const HAUT=[0xf1c9a0,0xd9a77a,0x8a5a3a,0xe8b98f,0x6b4226,0xf1c9a0];
const HAARE=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a5a32];
const STILE=['kurz','zoepfe','pferd','kurz','dutt','brille'];
/* ==================== Grundhelfer ==================== */
const nr=()=>rnd();
const dk=(c,f)=>new THREE.Color(c).multiplyScalar(f).getHex();
const ZN=n=>EXTRAZONEN.find(e=>e.name===n);
const GC={};
function gK(k,fn){return GC[k]||(GC[k]=fn())}
/* Ring oder Bogen (Torus), Rohrstärke t */
function ring(R,t,c,x,y,z,par,bogen,seg){const g=gK('t'+R+'_'+t+'_'+(bogen||0)+'_'+(seg||0),()=>new THREE.TorusGeometry(R,t,4,seg?Math.max(8,seg-4):14,bogen||Math.PI*2));const m=new THREE.Mesh(g,mat(c));m.position.set(x,y,z);(par||scene).add(m);return m}
function liegend(m){m.rotation.x=Math.PI/2;return m}
function teilG(geo,c,x,y,z,sx,sy,sz,par,cast){const m=new THREE.Mesh(geo,mat(c));m.position.set(x,y,z);m.scale.set(sx,sy,sz);if(cast)m.castShadow=true;(par||scene).add(m);return m}
/* Tonnendach: halber Zylinder, Achse in x-Richtung, Breite w, Höhe h, Tiefe d */
function tonnendach(w,h,d,c,x,y,z,par){const g=gK('tonne',()=>{const q=new THREE.CylinderGeometry(1,1,1,12,1,false,0,Math.PI);q.rotateZ(Math.PI/2);return q});return teilG(g,c,x,y,z,w,h,d/2,par,true)}
/* Halbkugel (Kuppel, Helm) */
function halbkugel(r,h,c,x,y,z,par){const g=gK('halb',()=>new THREE.SphereGeometry(1,16,6,0,Math.PI*2,0,Math.PI/2));return teilG(g,c,x,y,z,r,h,r,par,true)}
const gScheibe=new THREE.CylinderGeometry(1,1,1,24);
function scheibeW(r,h,c,x,y,z,par){const m=teilG(gScheibe,c,x,y,z,r,h,r,par);m.receiveShadow=true;return m}
/* leuchtende Teile: ein gemeinsames Material mit Farben je Eckpunkt (lässt sich gut zusammenfassen) */
const LM=new THREE.MeshBasicMaterial({vertexColors:true});
function lgeo(form,c){return gK('l'+form+c,()=>{const q=(form==='box'?new THREE.BoxGeometry(1,1,1):form==='scheibe'?new THREE.CylinderGeometry(1,1,1,12):new THREE.SphereGeometry(1,7,5));const n=q.attributes.position.count,a=new Float32Array(n*3),f=new THREE.Color(c);for(let i=0;i<n;i++){a[i*3]=f.r;a[i*3+1]=f.g;a[i*3+2]=f.b}q.setAttribute('color',new THREE.BufferAttribute(a,3));return q})}
function licht(r,c,x,y,z,par,sx,sy,sz){const m=new THREE.Mesh(lgeo('sph',c),LM);m.position.set(x,y,z);m.scale.set(r*(sx||1),r*(sy||1),r*(sz||1));(par||scene).add(m);return m}
function lbox(w,h,d,c,x,y,z,par){const m=new THREE.Mesh(lgeo('box',c),LM);m.position.set(x,y,z);m.scale.set(w,h,d);(par||scene).add(m);return m}
function lscheibe(r,h,c,x,y,z,par){const m=new THREE.Mesh(lgeo('scheibe',c),LM);m.position.set(x,y,z);m.scale.set(r,h,r);(par||scene).add(m);return m}
/* Glas (Kuppeln) und Helme: durchsichtig, werden am Ende blockweise zusammengefasst */
const GLAS=new THREE.MeshLambertMaterial({color:0xc4e8ff,transparent:true,opacity:.17,depthWrite:false,side:THREE.DoubleSide});
const HELM=new THREE.MeshPhongMaterial({color:0xd8f0ff,specular:0xffffff,shininess:90,transparent:true,opacity:.16,depthWrite:false});
const gHelm=new THREE.SphereGeometry(1,12,8);
function glasK(r,h,x,y,z,par){const g=gK('gk',()=>new THREE.SphereGeometry(1,20,7,0,Math.PI*2,0,Math.PI/2));const m=new THREE.Mesh(g,GLAS);m.position.set(x,y,z);m.scale.set(r,h,r);m.renderOrder=2;(par||scene).add(m);return m}
function glasZ(r,h,x,y,z,par){const g=gK('gz',()=>new THREE.CylinderGeometry(1,1,1,10,1,true));const m=new THREE.Mesh(g,GLAS);m.position.set(x,y,z);m.scale.set(r,h,r);(par||scene).add(m);return m}
function glasB(w,h,d,x,y,z,par){const m=new THREE.Mesh(gBox,GLAS);m.position.set(x,y,z);m.scale.set(w,h,d);(par||scene).add(m);return m}
/* Teile eines Objekts zu wenigen Blöcken zusammenfassen (bewegte Untergruppen mit userData.frei bleiben) */
const VMAT2=new THREE.MeshLambertMaterial({vertexColors:true});
function blockGeo(L,vc){let nv=0,ni=0;L.forEach(e=>{nv+=e.attributes.position.count;ni+=e.index?e.index.count:e.attributes.position.count});const P=new Float32Array(nv*3),N=new Float32Array(nv*3),C=vc?new Float32Array(nv*3):null,I=new Uint32Array(ni);let vo=0,io=0;
  L.forEach(e=>{const c=e.attributes.position.count;P.set(e.attributes.position.array,vo*3);N.set(e.attributes.normal.array,vo*3);if(C)C.set(e.attributes.color.array,vo*3);if(e.index){const ix=e.index.array;for(let j=0;j<ix.length;j++)I[io+j]=ix[j]+vo;io+=ix.length}else{for(let j=0;j<c;j++)I[io+j]=vo+j;io+=c}vo+=c;e.dispose()});
  const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(P,3));G.setAttribute('normal',new THREE.BufferAttribute(N,3));if(C)G.setAttribute('color',new THREE.BufferAttribute(C,3));G.setIndex(new THREE.BufferAttribute(I,1));return G}
function vmVerschm(g){g.updateMatrixWorld(true);const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(),gr={},alt=[];
  g.traverse(m=>{if(m===g||!m.isMesh||!m.visible)return;const mt=m.material;if(Array.isArray(mt)||mt.map)return;for(let o=m;o&&o!==g;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep||o.userData.frei))return}
    const ge=m.geometry.clone();ge.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));const neu=mt.isMeshLambertMaterial&&!mt.vertexColors&&!mt.transparent,vc=neu||!!mt.vertexColors;
    if(neu){const n=ge.attributes.position.count,a=new Float32Array(n*3);for(let i=0;i<n;i++){a[i*3]=mt.color.r;a[i*3+1]=mt.color.g;a[i*3+2]=mt.color.b}ge.setAttribute('color',new THREE.BufferAttribute(a,3))}
    const zm=neu?VMAT2:mt,k=zm.uuid+'|'+(m.castShadow?1:0);(gr[k]=gr[k]||{mt:zm,vc,c:m.castShadow,l:[]}).l.push(ge);alt.push(m)});
  for(const k in gr){const q=gr[k],mm=new THREE.Mesh(blockGeo(q.l,q.vc),q.mt);mm.castShadow=q.c;g.add(mm)}
  alt.forEach(m=>{if(m.parent)m.parent.remove(m)})}
function vm(g){for(let i=1;i<arguments.length;i++){vmVerschm(arguments[i]);arguments[i].userData.frei=1}vmVerschm(g);return g}
/* Bewegtes: g bekommt eine Zeitfunktion; die Engine blendet weit Entferntes aus */
function leben(g,fn,ph){g.userData.keep=1;g.userData.anim=fn;lebendig.push({o:g,ph:ph==null?nr()*6:ph});return g}
/* Gruppe an der Stelle (x,y,z) im Ort, die sich bewegt: Teile zuerst bauen, dann bewegen */
function dreh(g,v,achse){vm(g);return leben(g,t=>{g.rotation[achse||'y']=t*v})}
function bahn(P){const C=[0];for(let i=1;i<=P.length;i++){const a=P[i-1],b=P[i%P.length];C.push(C[i-1]+Math.hypot(b[0]-a[0],b[1]-a[1]))}const L=C[P.length];
  return{L,at:u=>{u=((u%L)+L)%L;if(!(u<L))u=0;let lo=0,hi=P.length;while(hi-lo>1){const m=(lo+hi)>>1;if(C[m]<=u)lo=m;else hi=m}const a=P[lo],b=P[(lo+1)%P.length],f=(u-C[lo])/((C[lo+1]-C[lo])||1);return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,b[0]-a[0],b[1]-a[1]]}}}
/* Hin und zurück entlang eines Weges, mit seitlichem Abstand o */
function pendel(s,o){const n=s.length,q=i=>{const a=s[Math.max(0,i-1)],b=s[Math.min(n-1,i+1)];let tx=b[0]-a[0],tz=b[1]-a[1];const l=Math.hypot(tx,tz)||1;return[-tz/l,tx/l]};const P=[];
  for(let i=0;i<n;i++){const v=q(i);P.push([s[i][0]+v[0]*o,s[i][1]+v[1]*o])}for(let i=n-1;i>=0;i--){const v=q(i);P.push([s[i][0]-v[0]*o,s[i][1]-v[1]*o])}return bahn(P)}
/* bewegte Dinge werfen keinen Schatten (spart Zeichenaufrufe) */
function ohneSchatten(g){g.traverse(m=>{m.castShadow=false});return g}
/* Figur oder Fahrzeug (schaut nach +x) fährt eine Bahn */
function fahren(g,B,v,ph,fn){g.userData.keep=1;const f=t=>{const p=B.at(t*v+ph);g.position.x=p[0];g.position.z=p[1];g.rotation.y=Math.atan2(-p[3],p[2]);if(fn)fn(t)};g.userData.anim=f;f(0);lebendig.push({o:g,ph:0});return g}
function spl(pts,st){const n=pts.length,s=[];for(let i=0;i<n-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n-1,i+2)],k=Math.max(2,Math.ceil(Math.hypot(p2[0]-p1[0],p2[1]-p1[1])/(st||2.5)));
  for(let j=0;j<k;j++){const t=j/k,t2=t*t,t3=t2*t,f=(a,b,c,d)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);s.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}s.push(pts[n-1]);return s}
const roadZ=(x,r)=>r+3.2*Math.sin(x*.047+r*.7);
function strasse(r){const e=r===-154?136:158,p=[];for(let x=-e;x<e-8;x+=19)p.push([x,roadZ(x,r)]);p.push([e,roadZ(e,r)]);return p}
/* Ringweg: zwei lange Bögen im Westen und Osten, oben und unten durch die Querwege geschlossen */
function ringseite(s){const p=[];[94,69,44,19,-8,-33,-58,-84,-108,-131,-154].forEach((z,i)=>{const x=s*115+(i%2?s*3.2:0);p.push([x,i%2?z:roadZ(x,z)])});return p}
/* ==================== Instanzen (Landschaft, Wiederholtes) ==================== */
const IR={};
function inst(k,x,y,z,sx,sy,sz,c,ry,rx,rz){(IR[k]=IR[k]||[]).push([x,y,z,sx,sy,sz,c,ry||0,rx||0,rz||0])}
function instFlush(){const kr=new THREE.TorusGeometry(1,.17,3,12);kr.rotateX(Math.PI/2);
  const G={fels:new THREE.DodecahedronGeometry(1,0),kies:new THREE.IcosahedronGeometry(1,0),krater:kr,platte:new THREE.CylinderGeometry(1,1,1,14),rund:new THREE.CylinderGeometry(1,1,1,7),box:new THREE.BoxGeometry(1,1,1),kugel:new THREE.SphereGeometry(1,7,4),stein:new THREE.IcosahedronGeometry(1,0),kegel:new THREE.ConeGeometry(1,1,6),hell:new THREE.IcosahedronGeometry(1,0),blatt:new THREE.SphereGeometry(1,6,4)};
  const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color(),CH=80,gr={},bl=[];
  for(const k in IR)IR[k].forEach(a=>{const key=k+'|'+Math.floor((a[0]+260)/CH)+'|'+Math.floor((a[2]+320)/CH);(gr[key]=gr[key]||{k,l:[]}).l.push(a)});
  for(const key in gr){const q=gr[key],l=q.l;let x0=1e9,x1=-1e9,y1=0,z0=1e9,z1=-1e9,ms=0;l.forEach(a=>{x0=Math.min(x0,a[0]);x1=Math.max(x1,a[0]);z0=Math.min(z0,a[2]);z1=Math.max(z1,a[2]);y1=Math.max(y1,a[1]+a[4]);ms=Math.max(ms,a[3],a[4],a[5])});
    const geo=G[q.k].clone(),im=new THREE.InstancedMesh(geo,q.k==='hell'?new THREE.MeshBasicMaterial({color:0xffffff}):new THREE.MeshLambertMaterial({color:0xffffff}),l.length);geo.boundingSphere=new THREE.Sphere(new THREE.Vector3((x0+x1)/2,y1/2,(z0+z1)/2),Math.hypot(x1-x0,z1-z0,y1)/2+ms*1.6+2);
    bl.push({im,x:geo.boundingSphere.center.x,z:geo.boundingSphere.center.z,r:geo.boundingSphere.radius,klein:q.k==='kies'?1:q.k==='stein'?2:0});if(q.k==='platte'||q.k==='krater')im.receiveShadow=true;
    l.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(a[8],a[7],a[9],'YXZ'));M.compose(P,Q,S);im.setMatrixAt(i,M);im.setColorAt(i,C.set(a[6]))});im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;scene.add(im)}
  lebendig.push({o:{userData:{anim:()=>{const cx=camera.position.x,cz=camera.position.z;bl.forEach(c=>{const v=Math.hypot(c.x-cx,c.z-cz)-c.r<(c.klein?(c.klein>1?105:80):150);if(c.im.visible!==v)c.im.visible=v})}}},ph:0})}
/* Durchsichtiges blockweise zusammenfassen; ferne Blöcke ausblenden (der Dunst verdeckt sie ohnehin) */
function glasFlush(){scene.updateMatrixWorld(true);const gr={},alt=[];scene.traverse(m=>{if(!m.isMesh||(m.material!==GLAS&&m.material!==HELM))return;for(let o=m;o;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep))return}
    const ge=m.geometry.clone();ge.applyMatrix4(m.matrixWorld);ge.computeBoundingSphere();const c=ge.boundingSphere.center,k=m.material.uuid+'|'+Math.floor(c.x/70)+'|'+Math.floor(c.z/70);(gr[k]=gr[k]||{mt:m.material,l:[]}).l.push(ge);alt.push(m)});
  for(const k in gr){const m=new THREE.Mesh(blockGeo(gr[k].l,false),gr[k].mt);m.renderOrder=2;scene.add(m)}alt.forEach(m=>m.parent.remove(m))}
function sichtweite(){let L=null;lebendig.push({o:{userData:{anim:()=>{if(!L){L=[];scene.children.forEach(m=>{if(!m.isMesh||m.isInstancedMesh||m.userData.keep)return;const t=m.material;if(t!==window.__VMAT&&t!==LM&&t!==GLAS&&t!==HELM&&t!==VMAT2)return;if(!m.geometry.boundingSphere)m.geometry.computeBoundingSphere();const s=m.geometry.boundingSphere;if(s.radius<90)L.push({m,x:s.center.x,z:s.center.z,r:s.radius})})}
    const cx=camera.position.x,cz=camera.position.z;L.forEach(c=>{const v=Math.hypot(c.x-cx,c.z-cz)-c.r<(c.m.material===HELM?72:146);if(c.m.visible!==v)c.m.visible=v})}}},ph:0})}
/* ==================== Figuren ==================== */
/* Raumanzug: dicke Stiefel, Handschuhe, Kragenring, Bedienfeld, Rucksack und durchsichtiger Helm (Gesicht bleibt gut sichtbar) */
function anzugTeile(m,farbe){const kragen=farbe===0xf2f4f8?ORANGE:0xf2f4f8;
  [m.bl,m.br].forEach(b=>{box(.36,.3,.56,0xd8dce6,0,-.8,.08,b);box(.4,.09,.6,DUNKEL,0,-.93,.08,b);cyl(.17,.12,kragen,0,-.5,0,b)});
  [m.al,m.ar].forEach(a=>{sph(.16,0xd8dce6,0,-.76,0,a);cyl(.145,.1,kragen,0,-.58,0,a)});
  box(.46,.34,.08,0x4a5474,0,1.42,.32,m.g);[ROT,GELB,TUERKIS].forEach((c,i)=>licht(.055,c,-.13+i*.13,1.47,.37,m.g));lbox(.28,.05,.03,0x9ff4ff,0,1.33,.365,m.g);
  box(.62,.8,.3,0xd8dce6,0,1.4,-.3,m.g,true);box(.5,.12,.32,kragen,0,1.65,-.3,m.g);
  liegend(ring(.4,.075,kragen,0,1.73,0,m.g,0,16))}
function helm(kopf){const h=new THREE.Mesh(gHelm,HELM);h.position.set(0,.1,0);h.scale.set(.82,.8,.82);h.renderOrder=3;kopf.add(h);
  const b=ring(.8,.025,0xf4f6fa,0,.1,-.05,kopf,Math.PI,16);b.rotation.y=0;sph(.07,ORANGE,0,.9,-.05,kopf);licht(.06,0xffffff,-.42,.52,.5,kopf,1.6,.5,.4).rotation.z=.6}
/* Spielfigur trägt den Anzug und Helm (Engine ruft SPIELERMODELL nach dem Bauen der Figur) */
function SPIELERMODELL(m){
  /* weißer Raumanzug; die Farbe der gewählten Figur bleibt als Streifen, Kragen und Gürtel */
  const torso=m.g.children.find(o=>o.isMesh&&o.geometry===gCyl),farbe=torso?torso.material.color.getHex():ORANGE,bein=m.bl.children.find(o=>o.isMesh&&o.geometry===gCyl),hose=bein?bein.material.color.getHex():farbe,weiss=mat(0xf4f6fa);
  m.g.traverse(o=>{if(!o.isMesh)return;for(let q=o;q;q=q.parent)if(q===m.kopf)return;const h=o.material.color.getHex();if(h===farbe||h===hose)o.material=weiss});
  anzugTeile(m,0xf2f4f8);m.g.traverse(o=>{if(o.isMesh&&o.material.color&&o.material.color.getHex()===ORANGE&&!(function(){for(let q=o;q;q=q.parent)if(q===m.kopf)return true;return false})())o.material=mat(farbe)});
  [m.al,m.ar].forEach(a=>{cyl(.135,.13,farbe,0,-.22,0,a)});box(.8,.12,.62,farbe,0,.93,0,m.g);box(.46,.4,.06,farbe,0,1.42,-.47,m.g);
  helm(m.kopf)}
function astro(par,k,s){const f=ANZUG[((k%8)+8)%8],m=kindModell({jacke:f,hose:f,haut:HAUT[k%6],haar:HAARE[(k+2)%6],stil:STILE[(k+1)%6],rucksack:null},par||scene);anzugTeile(m,f);helm(m.kopf);sparsam(m.g);m.g.scale.setScalar(s||1.2);return m}
/* kleine Kugeln und der Mund der anderen Astronauten bekommen gröbere Formen (spart Dreiecke) */
function sparsam(g){const klein=gK('kl',()=>new THREE.IcosahedronGeometry(1,0));g.traverse(m=>{if(!m.isMesh)return;if(m.geometry===gSph&&Math.max(m.scale.x,m.scale.y,m.scale.z)<.19)m.geometry=klein;else if(m.geometry.type==='TorusGeometry'&&m.geometry.parameters.radius<.2){m.geometry=gBox;m.scale.set(.15,.035,.03);m.position.y-=.05}})}
/* stehende Astronautin oder stehender Astronaut (fest) */
function steh(x,z,rot,k,s,par,wx,wz){const m=astro(par,k,s);m.g.userData.figur=1;m.g.position.set(x,0,z);m.g.rotation.y=rot||0;if(wx!=null)kreis(wx,wz,.55);return m}
/* spazierende Astronauten (schauen nach +x, laufen eine Bahn); drei Blöcke je Figur und Helm */
function laeufer(B,v,ph,k){const w=grp(0,0,0);const m=astro(w,k,1.2);m.g.rotation.y=Math.PI/2;ohneSchatten(w);vm(m.g,m.bl,m.br);fahren(w,B,v,ph,t=>{const q=Math.sin(t*v*3.2+ph)*.55;m.bl.rotation.x=q;m.br.rotation.x=-q;w.position.y=Math.abs(Math.sin(t*v*1.6+ph))*.22});return w}
/* winkende Figur */
function winker(x,z,rot,k,par){const w=grp(x,0,z,par);w.userData.figur=1;const m=astro(w,k,1.2);w.rotation.y=rot||0;m.g.userData.frei=0;m.ar.rotation.z=2.5;vm(m.g,m.ar);return leben(w,t=>{m.ar.rotation.z=2.4+Math.sin(t*5)*.35})}
/* Roboter Pico: kleiner runder Roboter mit Bildschirmgesicht, Antenne, Armen und zwei Rädern; schaut nach +z */
function picoBau(par,col,gesicht){const g=grp(0,0,0,par),f=col||0xf4f6fa,a=gesicht||ORANGE;
  [-1,1].forEach(s=>{const r=cyl(.28,.24,DUNKEL,s*.48,.28,0,g,true);r.rotation.z=Math.PI/2;cyl(.12,.27,a,s*.49,.28,0,g).rotation.z=Math.PI/2});
  sph(.55,f,0,.82,0,g,1,1.05,.9);ring(.5,.06,a,0,.72,0,g,0,16).rotation.x=Math.PI/2;sph(.14,a,0,.9,.46,g,1,1,.5);licht(.07,0x9ff4ff,0,.9,.55,g);
  const kopf=grp(0,1.72,0,g);box(.98,.72,.7,f,0,0,0,kopf,true);box(.84,.54,.08,0x1c2440,0,0,.34,kopf);[-1,1].forEach(s=>{licht(.1,0x7ff2ff,s*.2,.07,.39,kopf,1,1.15,.4);cyl(.13,.14,a,s*.54,0,0,kopf).rotation.z=Math.PI/2});
  [-.14,-.07,0,.07,.14].forEach(x=>lbox(.07,.045,.04,0x7ff2ff,x,-.15+x*x*3,.39,kopf));cyl(.025,.34,METALL,0,.52,0,kopf);licht(.1,0xffa030,0,.74,0,kopf);
  const arme=[-1,1].map(s=>{const p=grp(s*.58,1.05,0,g);cyl(.07,.5,METALL,s*.04,-.22,0,p);sph(.12,a,s*.05,-.5,0,p);return p});return{g,kopf,arme}}
/* kleiner Helfer-Roboter auf einer Bahn */
function helfer(B,v,ph,k){const w=grp(0,0,0);const p=picoBau(w,[0xd8dce6,0xffd23e,0x8ad0f0,0xf4f6fa][k%4],[BLAU,DUNKEL,ORANGE,LILA][k%4]);p.g.rotation.y=Math.PI/2;p.g.scale.setScalar(.7);ohneSchatten(w);vm(w);return fahren(w,B,v,ph,t=>{w.position.y=Math.abs(Math.sin(t*5+ph))*.06})}
/* fliegende Drohne mit Düsen (auf dem Mond gibt es keine Luft für Propeller) */
function drohne(cx,cy,cz,rx,rz,v,k){const g=grp(cx,cy,cz),f=ANZUG[(k+1)%8];sph(.5,WEISS,0,0,0,g,1,.7,1);ring(.62,.07,f,0,0,0,g,0,14).rotation.x=Math.PI/2;licht(.15,0x8ff0ff,0,.02,.46,g);[-1,1].forEach(s=>{cyl(.16,.3,METALL,s*.72,0,0,g);licht(.13,0x9ad8ff,s*.72,-.3,0,g,1,1.9,1)});cyl(.02,.4,METALL,0,.5,0,g);licht(.07,ROT,0,.74,0,g);ohneSchatten(g);vm(g);
  const ph=nr()*6;return leben(g,t=>{const a=t*v+ph;g.position.set(cx+Math.cos(a)*rx,cy+Math.sin(t*1.7+ph)*.35,cz+Math.sin(a)*rz);g.rotation.y=-a},0)}
/* Mondauto mit sechs Rädern, Kameramast und Solardach; fährt Richtung +x */
function roverBau(par,farbe,gross){const g=grp(0,0,0,par);[-1.2,0,1.2].forEach(x=>[-1,1].forEach(s=>{const r=cyl(.44,.34,DUNKEL,x,.44,s*.95,g,true);r.rotation.x=Math.PI/2;cyl(.2,.37,METALL,x,.44,s*.95,g).rotation.x=Math.PI/2;box(.1,.12,.5,METALL,x,.72,s*.7,g)}));
  box(3,.5,1.5,farbe,0,.95,0,g,true);box(1.3,.7,1.3,WEISS,.55,1.5,0,g,true);box(.06,.42,1.1,0x24345c,1.22,1.55,0,g);box(1,.38,.05,0x9ad4f8,.55,1.58,.66,g);box(1,.38,.05,0x9ad4f8,.55,1.58,-.66,g);
  box(1.3,.08,1.4,PANEL,-.8,1.35,0,g);for(let i=0;i<3;i++)box(.05,.1,1.4,0xc8d4f0,-1.25+i*.45,1.36,0,g);cyl(.05,1.3,METALL,1.2,2.5,-.4,g);box(.3,.24,.4,WEISS,1.25,3.2,-.4,g);licht(.08,0x8ff0ff,1.42,3.2,-.4,g);
  [-.45,.45].forEach(z=>{licht(.13,0xfff2b0,1.52,1,z,g,.5,1,1);licht(.09,ROT,-1.52,1,z,g,.5,1,1)});if(gross)g.scale.setScalar(gross);return g}
function roverFahrt(B,v,ph,farbe,s){const w=grp(0,0,0);roverBau(w,farbe,s||1);ohneSchatten(w);vm(w);return fahren(w,B,v,ph,t=>{w.position.y=Math.abs(Math.sin(t*7+ph))*.05})}
/* ==================== Bauteile der Basis ==================== */
/* Ort: Gruppe in der Mitte, lokales +z zeigt zum Weg. K/S/L tragen Hindernisse in Ortskoordinaten ein. */
function O(name,fn,o){o=o||{};const b=ZN(name);if(!b)throw new Error('Ort fehlt: '+name);
  let road=SEITENWEGE[0];SEITENWEGE.forEach(r=>{if(Math.abs(r-b.z)<Math.abs(road-b.z))road=r});if(o.road!=null)road=o.road;
  const d=o.dir||(road>b.z?1:-1),R=d>0?0:Math.PI,x0=b.x,z0=b.z;
  const W=(x,z)=>[x0+d*x,z0+d*z];
  const g=grp(x0,0,z0);g.rotation.y=R;
  /* o.bogen: Der Weg kommt von der Straße im Norden seitlich herum zur Südseite */
  if(o.bogen){const q=x0>0?-1:1;weg([[x0+q*13.5,roadZ(x0+q*13.5,road)],[x0+q*13.2,z0-2],[x0+q*12,z0+6.5],[x0+q*7,z0+10],[x0+q*1.5,z0+9],[x0,z0+(o.ende==null?3:o.ende)]],3.4)}
  else weg([[x0,roadZ(x0,road)],[x0+(x0>0?-2.4:2.4),(roadZ(x0,road)+z0+d*6)/2],[x0,z0+d*(o.ende==null?3:o.ende)]],3.4);
  if(o.platz!==0)scheibeW(o.platz||b.r-1.5,.04,o.farbe||0xc6c9d2,x0,.02,z0,scene);
  const c={g,b,R,d,W,K:(x,z,r)=>{const p=W(x,z);kreis(p[0],p[1],r)},S:(x,z,w,t,rot)=>{const p=W(x,z);sperrKasten(p[0],p[1],w,t,(rot||0)+R)},L:(a,b2,c2,d2)=>{const p=W(a,b2),q=W(c2,d2);sperrLinie(p[0],p[1],q[0],q[1],.2)}};
  fn(c,g);if(c.wand)durchsicht(c,c.wand[0],c.wand[1])}
/* rundes Fenster auf einer Wand, die nach +z zeigt */
function bullauge(g,x,y,z,r,innen){ring(r,r*.22,0x8d98ac,x,y,z+.04,g,0,14);const m=lscheibe(r,.06,innen||0x9fe0ff,x,y,z,g);m.rotation.x=Math.PI/2;lbox(r*.5,.07,.05,0xffffff,x-r*.3,y+r*.35,z+.07,g).rotation.z=.7}
/* Schleusentür (nach +z) */
function luke(g,x,z,farbe,s){s=s||1;box(1.7*s,2.5*s,.16,farbe||ORANGE,x,1.25*s,z,g);box(1.3*s,2.15*s,.2,0x6d7890,x,1.2*s,z,g);box(.1,2.1*s,.24,0x566078,x,1.2*s,z,g);ring(.28*s,.06*s,WEISS,x,1.5*s,z+.14,g,0,12);licht(.1*s,0x7ff2c0,x,2.65*s,z+.05,g)}
/* Wohnmodul: Kasten mit Tonnendach, Fenster und Tür auf der Vorderseite (+z) */
function modul(g,x,z,w,h,t,farbe,streifen,opt){opt=opt||{};const m=grp(x,0,z,g);m.rotation.y=opt.rot||0;
  box(w,h,t,farbe,0,h/2+.15,0,m,true);tonnendach(w,1,t,opt.dach||HELLGRAU,0,h+.15,0,m);box(w+.2,.3,t+.2,0x7a8296,0,.15,0,m);box(w+.08,.24,t+.08,streifen,0,h-.1,0,m);
  [-1,1].forEach(s=>{box(.3,h+.3,t+.18,0xb4bccc,s*(w/2-.05),h/2+.15,0,m)});
  if(opt.tuer!==false)luke(m,opt.tx||0,t/2+.02,streifen,Math.min(1,h/3));
  (opt.fenster||[-w*.3,w*.3]).forEach(fx=>bullauge(m,fx,h*.55+.2,t/2+.06,opt.fr||.48,opt.licht||0xffe9a8));
  return m}
/* Kuppelhaus mit Fenstern und Eingang nach +z */
function kuppelhaus(g,x,z,r,farbe,streifen){const m=grp(x,0,z,g);scheibeW(r+.35,.4,0x7a8296,0,.2,0,m);cyl(r,1.2,farbe,0,.8,0,m,true);halbkugel(r,r*.82,farbe,0,1.4,0,m);liegend(ring(r+.02,.13,streifen,0,1.45,0,m,0,28));
  [-.95,.95].forEach(a=>{const f=grp(Math.sin(a)*(r+.02),0,Math.cos(a)*(r+.02),m);f.rotation.y=a;bullauge(f,0,1.05,0,.45,0xffe9a8)});
  const e=grp(0,0,r-.1,m);box(2.1,2.5,1.1,farbe,0,1.35,.2,e,true);tonnendach(2.1,.5,1.1,streifen,0,2.6,.2,e).rotation.y=0;luke(e,0,.78,streifen,.92);
  cyl(.07,1,METALL,r*.3,r*.82+1.7,-r*.2,m);licht(.16,ROT,r*.3,r*.82+2.3,-r*.2,m);return m}
/* offene Halle: Boden, Rückwand, niedrige Seitenwände, Dachbögen hinten (vorn offen, Kamera frei) */
function halle(c,w,t,z,farbe,streifen,h,ohneFenster){const g=c.g;h=h||3.4;const zh=z-t/2;c.wand=[zh-.9,zh+1.2];
  box(w,.12,t,0x99a2b6,0,.07,z,g).receiveShadow=true;box(w,h,.4,farbe,0,h/2,zh,g,true);box(w+.1,.35,.5,streifen,0,h,zh,g);
  [-1,1].forEach(s=>{box(.4,1.3,t*.62,farbe,s*(w/2),.65,zh+t*.31,g,true);box(.5,.16,t*.62,streifen,s*(w/2),1.38,zh+t*.31,g);cyl(.16,h+.9,METALL,s*(w/2),(h+.9)/2,zh+.1,g,true);licht(.22,0xfff0b8,s*(w/2),h+1.05,zh+.1,g);c.L(s*w/2,zh,s*w/2,zh+t*.62)});
  c.S(0,zh,w+.4,.6);rueckseite(g,w,zh-.22,streifen,h);
  if(!ohneFenster)for(let i=0;i<Math.floor(w/3.6);i++){const x=-w/2+2.2+i*3.6;bullauge(g,x,h*.68,zh+.24,.5,0x1c2748);licht(.05,0xffffff,x-.15,h*.72,zh+.34,g);licht(.04,0xffffff,x+.18,h*.62,zh+.34,g)}
  else[-1,1].forEach(s=>{[.3,.62].forEach((q,i)=>box(w*.42,.12,.06,i?TUERKIS:streifen,s*w*.24,h*q+1.15,zh+.24,g))})}
/* Außenseite einer Rückwand: Sockelstreifen, Tür, erleuchtete Fenster, Rohr (nach hinten sichtbar) */
function rueckseite(g,w,z,streifen,h){const q=grp(0,0,z,g);q.rotation.y=Math.PI;
  box(w+.1,.5,.1,0x6d7890,0,.25,.02,q);box(w,.22,.08,streifen,0,.72,.03,q);luke(q,-w*.31,.06,streifen,Math.min(.9,h/3.2));
  const n=Math.max(2,Math.floor(w/4));for(let i=0;i<n;i++){const x=-w*.12+i*(w*.56)/(n-1);bullauge(q,x,h*.56,.04,.46,0xffe9a8)}
  rohr(q,[-w*.14,h-.55,.18],[w*.46,h-.55,.18],.13,METALL);rohr(q,[w*.46,h-.55,.18],[w*.46,.1,.18],.13,METALL);[-.14,.16,.46].forEach(f=>sph(.19,streifen,w*f,h-.55,.18,q))}
/* Durchsicht: Steht eine hohe Wand zwischen Kamera und Spielfigur, wird sie niedrig (wie ein Schnittmodell) */
const DS=[];
function durchsicht(c,za,zb){const g=c.g;g.updateMatrixWorld(true);const wg=grp(0,0,0,g);wg.userData.keep=1;const m=new THREE.Vector3(),b=new THREE.Box3();
  g.children.slice().forEach(ch=>{if(ch===wg||ch.userData.figur)return;b.setFromObject(ch);if(b.isEmpty())return;b.getCenter(m);g.worldToLocal(m);if(m.z>=za&&m.z<=zb)wg.add(ch)});
  if(!wg.children.length)return;
  /* Prüfhilfe (?pruefung): hohe Teile nahe der Wand, unter denen nichts Stehendes bleibt (sie würden schweben) */
  if(/pruefung/.test(location.search)){const rest=g.children.filter(ch=>ch!==wg).map(ch=>({ch,k:new THREE.Box3().setFromObject(ch)}));rest.forEach(a=>{if(a.k.isEmpty()||a.k.min.y<.9)return;a.k.getCenter(m);g.worldToLocal(m);if(m.z>zb+2.2||m.z<za-.5)return;
      const traegt=rest.some(o=>o!==a&&o.k.min.y<a.k.min.y-.05&&o.k.max.y>a.k.min.y-.2&&o.k.min.x<a.k.max.x&&o.k.max.x>a.k.min.x&&o.k.min.z<a.k.max.z&&o.k.max.z>a.k.min.z);if(!traegt)(window.__schweb=window.__schweb||[]).push([c.b.name,+m.x.toFixed(1),+a.k.min.y.toFixed(2),+m.z.toFixed(1),+zb.toFixed(1)])})}
  wg.updateMatrixWorld(true);
  /* je Teil ein eigener Kasten: nur was wirklich zwischen Kamera und Figur steht, zählt */
  const kaesten=wg.children.map(ch=>new THREE.Box3().setFromObject(ch)).filter(k=>!k.isEmpty()&&k.max.y>1);const alles=new THREE.Box3().setFromObject(wg);vm(wg);wandMerken(wg,alles,kaesten)}
function wandMerken(wg,alles,kaesten){DS.push({o:wg,k:kaesten,x:(alles.min.x+alles.max.x)/2,z:(alles.min.z+alles.max.z)/2})}
function durchsichtStart(){const ray=new THREE.Ray(),ziel=new THREE.Vector3(),tr=new THREE.Vector3();
  lebendig.push({o:{userData:{anim:()=>{const cx=camera.position.x,cz=camera.position.z,p=spieler.position;DS.forEach(w=>{const nah=Math.hypot(w.x-cx,w.z-cz)<150;w.o.visible=nah;if(!nah)return;let hit=false;
    if(Math.abs(w.x-p.x)<30&&Math.abs(w.z-p.z)<32)for(const y of [.5,1.6,2.8])for(const dx of [-.5,.5]){ziel.set(p.x+dx,y,p.z).sub(camera.position);const l=ziel.length();ray.set(camera.position,ziel.divideScalar(l));if(w.k.some(k=>ray.intersectBox(k,tr)&&tr.distanceTo(camera.position)<l-.3)){hit=true;break}}
    const soll=hit?.2:1,ist=w.o.scale.y;w.o.scale.y=Math.abs(soll-ist)<.02?soll:ist+(soll-ist)*.25})}}},ph:0})}
function lampe(x,z,h,farbe,par,fest){h=h||3;const g=grp(x,0,z,par);cyl(.09,h,METALL,0,h/2,0,g);cyl(.28,.22,DUNKEL,0,.11,0,g);licht(.28,farbe||0xfff0b0,0,h+.1,0,g,1,.8,1);cyl(.34,.08,WEISS,0,h+.34,0,g);if(fest!==false&&!par)kreis(x,z,.35);return g}
function kiste(g,x,z,farbe,rot,s,y){s=s||1;const k=grp(x,y||0,z,g);k.rotation.y=rot||0;k.scale.setScalar(s);box(1.2,.9,1,farbe||ORANGE,0,.45,0,k,true);box(1.3,.12,1.1,HELLGRAU,0,.92,0,k);[-.4,.4].forEach(q=>box(.1,.92,1.04,dk(farbe||ORANGE,.7),q,.45,0,k));box(.3,.2,.03,WEISS,0,.5,.52,k);return k}
function kistenhaufen(c,x,z,farbe){kiste(c.g,x,z,farbe,.2);kiste(c.g,x+1.35,z+.1,HELLGRAU,-.15);kiste(c.g,x+.6,z,BLAU,.5,.85,.95);c.S(x+.65,z,2.7,1.3)}
function fass(g,x,z,farbe,s){s=s||1;cyl(.55*s,1.2*s,farbe,x,.6*s,z,g,true);[.2,1].forEach(y=>cyl(.58*s,.1,METALL,x,y*s,z,g));sph(.55*s,farbe,x,1.2*s,z,g,1,.35,1)}
function tank(c,x,z,r,h,farbe,streifen){const g=c.g;[-1,1].forEach(a=>[-1,1].forEach(b=>cyl(.14,1.1,METALL,x+a*r*.6,.55,z+b*r*.6,g)));cyl(r,h,farbe,x,.9+h/2,z,g,true);sph(r,farbe,x,.9+h,z,g,1,.45,1);sph(r,farbe,x,.9,z,g,1,.35,1);liegend(ring(r+.03,.12,streifen,x,.9+h*.65,z,g,0,22));cyl(.18,.6,METALL,x,1.1+h+r*.45,z,g);c.K(x,z,r+.1)}
function rohr(g,a,b,r,farbe){const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),L=d.length(),m=cyl(r,L,farbe,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,g);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.multiplyScalar(1/L));return m}
/* Schüssel-Antenne; dreht sich, wenn v nicht 0 ist */
function schuessel(g,x,z,r,h,v,farbe){cyl(.2,h,METALL,x,h/2,z,g,true);cyl(r*.35,.25,DUNKEL,x,.12,z,g);const k=grp(x,h,z,g),n=grp(0,0,0,k);n.rotation.x=.75;
  const sg=gK('schale',()=>new THREE.SphereGeometry(1,16,5,0,Math.PI*2,Math.PI*.62,Math.PI*.38));const s=teilG(sg,farbe||WEISS,0,r*.95,0,r,r,r,n,true);s.material=gK('schalem'+(farbe||WEISS),()=>new THREE.MeshLambertMaterial({color:farbe||WEISS,side:THREE.DoubleSide}));
  liegend(ring(r*.92,.06,METALL,0,r*.35,0,n,0,20));[0,2.09,4.19].forEach(a=>rohr(n,[Math.cos(a)*r*.7,r*.25,Math.sin(a)*r*.7],[0,r*1.05,0],.035,METALL));licht(r*.11,ORANGE,0,r*1.08,0,n);box(r*.4,r*.3,r*.4,HELLGRAU,0,-.05,0,n);
  if(v){vm(k);leben(k,t=>{k.rotation.y=Math.sin(t*v)*1.6},nr()*9)}return k}
function solarpaneel(g,x,z,w,rot){const p=grp(x,0,z,g);p.rotation.y=rot||0;cyl(.09,1.2,METALL,0,.6,0,p);const f=grp(0,1.35,0,p);f.rotation.x=.55;box(w,.1,1.7,PANEL,0,0,0,f,true);for(let i=0;i<=Math.round(w/.8);i++)box(.04,.12,1.7,0x9ab0e0,-w/2+i*w/Math.round(w/.8),0,0,f);[-.84,0,.84].forEach(q=>box(w,.12,.05,0x9ab0e0,0,0,q,f));return f}
function bank(g,x,z,rot,farbe){const b=grp(x,0,z,g);b.rotation.y=rot||0;box(2.2,.16,.7,farbe||BLAU,0,.6,0,b,true);box(2.2,.5,.14,farbe||BLAU,0,1.05,-.32,b);[-.85,.85].forEach(q=>box(.14,.55,.6,METALL,q,.28,0,b))}
function pult(g,x,z,rot,farbe){const p=grp(x,0,z,g);p.rotation.y=rot||0;box(1.8,.14,.9,farbe||HELLGRAU,0,1,0,p,true);[-.75,.75].forEach(q=>box(.12,1,.7,METALL,q,.5,0,p));box(1,.62,.08,DUNKEL,0,1.5,-.2,p);lbox(.86,.48,.03,0x2a78c0,0,1.5,-.15,p);[-.2,0,.2].forEach((q,i)=>lbox(.5-i*.1,.04,.02,0x9ff4ff,q*.4,1.62-i*.13,-.12,p));box(.8,.06,.3,DUNKEL,0,1.1,.2,p);return p}
function hocker(g,x,z,farbe){cyl(.34,.14,farbe||ORANGE,x,.6,z,g,true);cyl(.09,.55,METALL,x,.3,z,g);cyl(.28,.06,DUNKEL,x,.05,z,g)}
function tisch(g,x,z,w,t,farbe){box(w,.14,t,farbe||WEISS,x,1,z,g,true);[-1,1].forEach(a=>[-1,1].forEach(b=>cyl(.07,1,METALL,x+a*(w/2-.15),.5,z+b*(t/2-.15),g)))}
/* Roboterarm, der sich langsam bewegt */
function greifarm(g,x,z,farbe,s,ph){cyl(.55*s,.4*s,DUNKEL,x,.2*s,z,g,true);const a=grp(x,.4*s,z,g);a.scale.setScalar(s);sph(.34,farbe,0,.1,0,a);const o=grp(0,.1,0,a);o.rotation.z=.35;cyl(.17,1.7,farbe,0,.85,0,o,true);const u=grp(0,1.7,0,o);sph(.25,DUNKEL,0,0,0,u);u.rotation.z=-1.5;cyl(.13,1.5,farbe,0,.75,0,u);const h=grp(0,1.5,0,u);sph(.17,DUNKEL,0,0,0,h);[-1,1].forEach(q=>{box(.07,.42,.14,METALL,q*.13,.24,0,h).rotation.z=-q*.2});vm(a,o,u);
  return leben(a,t=>{a.rotation.y=Math.sin(t*.7)*1.1;o.rotation.z=.35+Math.sin(t*1.1)*.2;u.rotation.z=-1.5+Math.sin(t*1.5+1)*.35},ph)}
/* Blinklicht: eigenes kleines Teil, wechselt die Größe */
function blink(x,y,z,farbe,r,par,v){const g=grp(x,y,z,par);licht(r||.2,farbe,0,0,0,g);return leben(g,t=>{const s=Math.sin(t*(v||3))>0?1:.35;g.scale.setScalar(s)})}
function felsK(x,z,r,par,f){const m=teilG(gK('dode',()=>new THREE.DodecahedronGeometry(1,0)),f||FELSF[Math.floor(nr()*5)],x,r*.5,z,r*1.15,r*.85,r,par||scene,true);m.rotation.y=nr()*6;return m}
function kegelMast(g,x,z){cyl(.06,.9,ORANGE,x,.45,z,g);cone(.28,.7,ORANGE,x,.35,z,g);cyl(.19,.14,WEISS,x,.42,z,g);box(.6,.08,.6,DUNKEL,x,.04,z,g)}
const FLACH=[];const flachFrei=(x,z,r)=>FLACH.every(q=>Math.hypot(q[0]-x,q[1]-z)>q[2]+r+.25);
function krater(x,z,r,hell,y){FLACH.push([x,z,r*1.2]);y=y||0;inst('platte',x,y+.012+nr()*.012,z,r,.012,r,0x858a98,nr()*6);inst('platte',x+r*.12,y+.03+nr()*.006,z+r*.1,r*.6,.012,r*.6,0x747988);inst('krater',x,y+.032,z,r,r*.8>1.6?1.6:r*.8,r,hell||0xc3c7d2,nr()*6)}
/* ==================== Orte 1 bis 12: Ankommen und Wohnen ==================== */
function ort1(){O('Landeplatz mit Mondfähre',(c,g)=>{
  scheibeW(8.4,.1,0x6f7688,0,.06,-2.5,g);liegend(ring(7.6,.16,ORANGE,0,.13,-2.5,g,0,40));liegend(ring(4.6,.12,WEISS,0,.13,-2.5,g,0,30));
  for(let i=0;i<8;i++){const a=i*.785+.39,x=Math.cos(a)*8.9,z=-2.5+Math.sin(a)*8.9;if(z>5)continue;cyl(.22,.5,DUNKEL,x,.25,z,g);const p=c.W(x,z);blink(p[0],.65,p[1],i%2?ORANGE:0x7ff2ff,.24,null,2.5);c.K(x,z,.35)}
  /* Mondfähre: goldene Landestufe mit vier Beinen, weiße Kabine mit Fenstern, Leiter */
  const f=grp(0,0,-4.2,g);cyl(2.5,1.8,GOLD,0,2.2,0,f,true);for(let i=0;i<8;i++){const a=i*.785+.39;box(.16,1.82,.16,0xa87a1c,Math.cos(a)*2.52,2.2,Math.sin(a)*2.52,f)}cyl(2.58,.16,DUNKEL,0,3.12,0,f);cyl(.8,.7,0x6a6a72,0,.95,0,f);
  [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(p=>{rohr(f,[p[0]*1.7,2.7,p[1]*1.7],[p[0]*3,.25,p[1]*3],.14,METALL);rohr(f,[p[0]*1.7,1.5,p[1]*1.7],[p[0]*2.6,1,p[1]*2.6],.08,GOLD);cyl(.6,.18,GOLD,p[0]*3,.14,p[1]*3,f)});
  box(2.9,2.2,2.5,WEISS,0,4.3,0,f,true);tonnendach(2.9,.7,2.5,HELLGRAU,0,5.4,0,f);[-1,1].forEach(s=>{const w=box(.78,.7,.1,0x1c2748,s*.65,4.65,1.28,f);w.rotation.z=s*.25;lbox(.3,.06,.03,0x9fe0ff,s*.65-.1,4.85,1.35,f);box(.9,1.2,1.4,HELLGRAU,s*1.75,4.2,-.1,f);sph(.4,METALL,s*1.8,5.05,-.2,f)});luke(f,0,1.27,ORANGE,.5);
  cyl(.06,1.4,METALL,.9,6.4,-.4,f);const s=grp(.9,7.1,-.4,f);sph(.45,WEISS,0,0,0,s,1,.25,1);s.rotation.x=.6;licht(.14,ROT,-.9,6.2,.3,f);
  [-.45,.45].forEach(x=>rohr(f,[x,3.2,2.5],[x,.15,3.7],.06,WEISS));for(let i=0;i<7;i++){const t=i/7;box(.96,.07,.18,WEISS,0,3.1-t*2.9,2.55+t*1.12,f)}box(1.4,.14,.8,METALL,0,3.2,2.1,f);c.K(0,-4.2,3.6);c.S(0,-1.2,1.2,1.4);
  winker(-4.4,2.2,.3,1,g);c.K(-4.4,2.2,.55);steh(4.8,.4,-.7,2,1.2,g,...c.W(4.8,.4));kiste(g,6,1.4,ORANGE,.4);c.K(6,1.4,.85);
  kistenhaufen(c,-10.2,-1,TUERKIS);lampe(...c.W(-8.6,6.4),3.4);lampe(...c.W(8.6,6.4),3.4,0x9ff4ff);
  const p=c.W(0,-2);drohne(p[0],7,p[1],6,5,.6,0)},{platz:11,farbe:0xbfc3ce})}
function ort2(){O('Empfangsschleuse',(c,g)=>{
  /* große Schleuse: liegende Röhre mit runder Tür, zwei Seitenmodule */
  const t=grp(0,0,-5,g);box(7.4,.5,6.2,0x7a8296,0,.25,0,t);tonnendach(6.6,4.4,5.8,WEISS,0,.5,0,t).rotation.y=Math.PI/2;t.children[t.children.length-1].scale.set(5.8,4.2,3.3);
  [-2.9,-1,1,2.9].forEach(z=>{const r=ring(3.35,.14,z>2?ORANGE:HELLGRAU,0,.5,z,t,Math.PI,20);r.scale.y=1.27});
  const tor=grp(0,0,3.05,t);box(4.4,3.9,.2,HELLGRAU,0,2.3,-.1,tor,true);cyl(1.65,.2,0x6d7890,0,2.1,.05,tor).rotation.x=Math.PI/2;ring(1.7,.2,ORANGE,0,2.1,.16,tor,0,26);ring(.5,.09,WEISS,0,2.1,.2,tor,0,14);[0,1.05,2.1].forEach(a=>box(1,.1,.1,WEISS,0,2.1,.2,tor).rotation.z=a);
  [-1,1].forEach(s=>{const p=c.W(s*2.6,-1.85);blink(p[0],3.6,p[1],s<0?0x7ff2c0:ORANGE,.22,null,2)});box(3.4,.12,1.8,METALL,0,.12,4,t);
  c.S(0,-5,7.2,6.1);
  [-1,1].forEach(s=>{modul(g,s*7,-4.5,3.6,2.4,3.4,WEISS,s<0?BLAU:ORANGE,{tuer:false,fenster:[0],fr:.6,rot:0});rohr(g,[s*3.4,1,-4.5],[s*5.4,1,-4.5],.75,HELLGRAU);c.S(s*6.6,-4.5,4.6,3.6)});
  /* Anzug-Spinde und Begrüßungsroboter */
  for(let i=0;i<3;i++){const x=-9.2+i*1.2;box(1.05,2.3,.8,[BLAU,ORANGE,TUERKIS][i],x,1.15,2.2,g,true);box(.8,.5,.06,0x2a3454,x,1.8,2.62,g);licht(.07,0xffffff,x+.3,.95,2.62,g)}c.S(-8,2.2,3.6,.9);
  const w=grp(5.2,0,2.6,g);const p=picoBau(w,0x8ad0f0,BLAU);vm(p.kopf,p.arme[0],p.arme[1]);vm(w);leben(w,t=>{p.arme[1].rotation.z=2.3+Math.sin(t*5)*.4;p.kopf.rotation.y=Math.sin(t*.8)*.5});w.rotation.y=-.5;c.K(5.2,2.6,.7);
  lampe(...c.W(8.4,4.4),3.2);lampe(...c.W(-9.6,5.6),3.2,0x9ff4ff);bank(g,8.4,1.2,-1.1,ORANGE);c.S(8.4,1.2,2.3,.9,-1.1);c.wand=[-8.2,-2.6]},{dir:1,bogen:true})}
function ort29(){O('Raumanzug-Werkstatt',(c,g)=>{
  halle(c,15,6.4,-5,WEISS,ORANGE,3.4,true);
  /* Anzüge auf Ständern (ohne Kopf, die Helme liegen im Regal) */
  [[-5.4,-5.6,0],[-3,-5.9,1],[-.6,-5.9,2],[1.8,-5.7,3]].forEach(p=>{const s=grp(p[0],0,p[1],g),f=ANZUG[p[2]];cyl(.5,.12,DUNKEL,0,.2,0,s);cyl(.06,1,METALL,0,.7,0,s);[-.24,.24].forEach(x=>{cyl(.2,.9,f,x,1.15,0,s,true);box(.36,.28,.52,0xd8dce6,x,.62,.08,s)});cyl(.46,1.05,f,0,2.05,0,s,true).scale.z=.34;[-.62,.62].forEach(x=>{cyl(.16,.95,f,x,2.05,0,s).rotation.z=x*.35;sph(.17,0xd8dce6,x*1.28,1.55,0,s)});liegend(ring(.34,.09,METALL,0,2.62,0,s,0,14));box(.4,.3,.1,HELLGRAU,0,2.15,.3,s);licht(.06,ROT,-.1,2.18,.37,s);licht(.06,GELB,.1,2.18,.37,s);c.K(p[0],p[1],.75)});
  /* Helmregal */
  [1.2,2.4].forEach(y=>{box(3.2,.14,.9,METALL,5.2,y,-7.2,g);for(let i=0;i<3;i++){const x=4.2+i*1;sph(.45,WEISS,x,y+.5,-7.2,g,1,1,1);sph(.32,[0x2a3a5c,GOLD,0x2a3a5c][i],x,y+.5,-7.02,g,1,.85,.5)}});[-1.5,1.5].forEach(q=>box(.14,2.6,.9,METALL,5.2+q,1.3,-7.2,g));c.S(5.2,-7.2,3.4,1);
  /* Nähtisch mit Nähmaschine, Stoffrollen, Stiefelreihe */
  tisch(g,-5.2,-1.2,2.8,1.4,0xb8c4e0);box(1,.28,.4,TUERKIS,-5.2,1.22,-1.2,g,true);box(.22,.7,.36,TUERKIS,-4.75,1.55,-1.2,g);box(.9,.22,.3,TUERKIS,-5.15,1.85,-1.2,g);cyl(.03,.34,METALL,-5.55,1.6,-1.2,g);box(.8,.05,.9,ORANGE,-6,1.1,-1.1,g);c.S(-5.2,-1.2,3,1.6);hocker(g,-5.2,.4,BLAU);c.K(-5.2,.4,.4);
  [ORANGE,WEISS,BLAU].forEach((f,i)=>{cyl(.28,1.8,f,6.2,.42+i*.12,-2.4+i*.6,g,true).rotation.z=Math.PI/2});c.S(6.2,-1.8,2,1.9);
  box(4.4,.14,.9,0x6d7890,-.9,.4,-3.1,g,true);[-2.8,1].forEach(x=>box(.14,.4,.8,METALL,x,.2,-3.1,g));
  [ORANGE,BLAU,ROT].forEach((f,i)=>[0,.52].forEach(q=>{const x=-2.6+i*1.45+q;box(.4,.1,.78,DUNKEL,x,.52,-2.98,g);box(.36,.26,.7,WEISS,x,.7,-2.98,g);sph(.2,WEISS,x,.7,-2.62,g,.95,.75,1);cyl(.19,.62,WEISS,x,1.08,-3.18,g,true);cyl(.215,.14,f,x,1.4,-3.18,g)}));c.S(-.9,-3.1,4.5,1)
  steh(-7.7,1,2.2,4,1.2,g,...c.W(-7.7,1));winker(4.2,-2.6,-.5,5,g);c.K(4.2,-2.6,.55);lampe(...c.W(-8.6,3.6),3);lampe(...c.W(8.4,3),3,0x9ff4ff);werkstattVorn(c)},{dir:1,bogen:true})}
function ort39(){O('Museum der ersten Mondlandung',(c,g)=>{
  scheibeW(11,.07,0xd6d2c6,0,.05,-1,g);
  /* Flagge an einer Querstange (steht still, weil es keine Luft gibt) */
  const fl=grp(-6.8,0,-3.4,g);cyl(.09,5.2,METALL,0,2.6,0,fl,true);rohr(fl,[0,5,0],[2.9,5,0],.06,METALL);box(2.8,1.7,.06,WEISS,1.45,4.1,0,fl,true);for(let i=0;i<4;i++)box(2.82,.2,.08,ROT,1.45,4.85-i*.43,0,fl);box(1.2,.86,.1,0x274a9a,.65,4.5,0,fl);for(let i=0;i<9;i++)sph(.05,WEISS,.22+(i%3)*.42,4.76-Math.floor(i/3)*.27,.07,fl);sph(.14,GOLD,0,5.3,0,fl);cyl(.5,.12,DUNKEL,0,.1,0,fl);c.K(-6.8,-3.4,.55);
  /* Nachbau der Landestufe (unterer Teil bleibt auf dem Mond) */
  const f=grp(1,0,-6.6,g);box(3.6,1.3,3.6,GOLD,0,1.8,0,f,true).rotation.y=0;[0,1].forEach(i=>box(3.64,.1,3.64,0xa87a1c,0,1.4+i*.8,0,f));[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(p=>{rohr(f,[p[0]*1.5,2.2,p[1]*1.5],[p[0]*2.8,.2,p[1]*2.8],.12,METALL);cyl(.5,.14,GOLD,p[0]*2.8,.12,p[1]*2.8,f)});for(let i=0;i<6;i++)box(.9,.06,.14,METALL,0,2.3-i*.38,1.95+i*.22,f);cyl(1,.4,0x6a6a72,0,2.7,0,f);c.K(1,-6.6,3.1);
  /* großer Stiefelabdruck unter Glas */
  const a=grp(6.6,0,-2.2,g);a.rotation.y=-.5;box(2.8,.7,3.4,HELLGRAU,0,.35,0,a,true);box(2.4,.1,3,0x9a9da8,0,.74,0,a);sph(.62,0x6a6d7a,0,.78,-.35,a,1,.1,1.4);sph(.48,0x6a6d7a,0,.78,.85,a,1,.1,1);for(let i=0;i<6;i++)box(.95-(i>3?.25:0),.07,.14,0xc4c7d0,0,.83,-.95+i*.38,a);glasB(2.7,.7,3.3,0,1.1,0,a);c.S(6.6,-2.2,3,3.6,-.5);
  /* Vitrinen mit Mondgestein, Kamera und Bilderwand */
  [[-6,2.4,0],[6.8,3,1]].forEach(p=>{box(1.4,1,1.4,BLAU,p[0],.5,p[1],g,true);if(p[2]){box(.7,.5,.5,METALL,p[0],1.28,p[1],g);cyl(.18,.4,DUNKEL,p[0],1.28,p[1]+.4,g).rotation.x=Math.PI/2;licht(.07,0x9ff4ff,p[0],1.28,p[1]+.62,g);box(.2,.16,.2,GOLD,p[0]-.15,1.6,p[1],g)}else{felsK(p[0],p[1],.36,g,0x6c707c).position.y=1.32}glasB(1.35,.95,1.35,p[0],1.5,p[1],g);c.S(p[0],p[1],1.5,1.5)});
  box(7.4,3,.3,0x4a5a8a,-2.4,2.3,-10,g,true);[-5.8,-2.4,1].forEach((x,i)=>{box(2.5,1.9,.1,WEISS,x,2.4,-9.8,g);box(2.2,1.6,.12,0x0c1024,x,2.4,-9.8,g);if(i===0){sph(.55,0xcfd2da,x,2.4,-9.68,g,1,1,.15);sph(.12,0x9a9da8,x-.15,2.55,-9.58,g,1,1,.2);sph(.09,0x9a9da8,x+.2,2.2,-9.58,g,1,1,.2)}else if(i===1){sph(.55,0x2a6ad0,x,2.4,-9.68,g,1,1,.15);sph(.22,0x4aa860,x-.15,2.5,-9.58,g,1.2,.8,.2);sph(.15,0xd8c080,x+.18,2.2,-9.58,g,1,1,.2)}else{cone(.22,.5,ORANGE,x,2.9,-9.68,g);cyl(.22,.8,WEISS,x,2.3,-9.68,g);licht(.16,0xffc040,x,1.8,-9.68,g,1,1.6,.3)}});c.S(-2.4,-10,7.6,.5);
  /* Spur aus Stiefelabdrücken */
  for(let i=0;i<14;i++){const x=-3.6+Math.sin(i*.5)*.6+(i%2)*.45,z=3.4-i*.52;box(.26,.03,.42,0x8a8e9a,x,.1,z,g)}
  steh(-3.8,-3,.6,0,1.25,g,...c.W(-3.8,-3));steh(4.4,-.4,-.9,3,.95,g,...c.W(4.4,-.4));lampe(...c.W(-9,4.6),3.2);lampe(...c.W(9.4,-6),3.2);rueckseite(g,7.4,-10.2,ORANGE,3.4);g.children[g.children.length-1].position.x=-2.4;museumVorn(c);c.wand=[-10.9,-9]},{platz:0,dir:1,bogen:true})}
function ort38(){O('Erdblick-Plattform',(c,g)=>{
  /* Aussichtsdeck aus Metall mit Geländer (vorn offen) */
  box(15,.12,10,0x8f9ab4,0,.08,-3.4,g).receiveShadow=true;for(let i=0;i<7;i++)box(.1,.14,10,0x7a86a4,-6+i*2,.08,-3.4,g);
  const gel=(x1,z1,x2,z2)=>{const n=Math.max(1,Math.round(Math.hypot(x2-x1,z2-z1)/1.5));for(let i=0;i<=n;i++)cyl(.07,1.1,WEISS,x1+(x2-x1)*i/n,.65,z1+(z2-z1)*i/n,g);rohr(g,[x1,1.2,z1],[x2,1.2,z2],.08,ORANGE);rohr(g,[x1,.7,z1],[x2,.7,z2],.04,METALL);c.L(x1,z1,x2,z2)};
  gel(-7.5,-8.4,7.5,-8.4);gel(-7.5,-8.4,-7.5,1.6);gel(7.5,-8.4,7.5,1.6);
  /* Ferngläser */
  [-4.6,0,4.6].forEach((x,i)=>{const f=grp(x,0,-7,g);cyl(.35,.14,DUNKEL,0,.2,0,f);cyl(.1,1.4,METALL,0,.9,0,f,true);const k=grp(0,1.75,0,f);k.rotation.x=.35;[-.2,.2].forEach(q=>{cyl(.17,.8,[BLAU,ORANGE,TUERKIS][i],q,0,-.1,k,true).rotation.x=Math.PI/2;cyl(.2,.1,DUNKEL,q,0,-.52,k).rotation.x=Math.PI/2;licht(.1,0x9fe0ff,q,0,-.58,k,1,1,.3)});box(.2,.12,.3,DUNKEL,0,0,0,k);c.K(x,-7,.45)});
  /* großer Globus der Erde, dreht sich */
  const s=grp(-4.6,0,-2.4,g);cyl(1,.3,DUNKEL,0,.3,0,s);cyl(.25,1.2,METALL,0,1,0,s,true);const k=grp(0,2.9,0,s);k.rotation.z=.4;erdkugel(k,1.45);const bogen=ring(1.65,.07,GOLD,0,2.9,0,s,Math.PI,24);bogen.rotation.z=Math.PI/2+.4;c.K(-4.6,-2.4,1.3);vm(k);leben(k,t=>{k.rotation.y=t*.35});
  bank(g,3.6,-3.4,Math.PI,ORANGE);bank(g,5.8,-.8,-1.5708,BLAU);c.S(3.6,-3.4,2.4,.9);c.S(5.8,-.8,.9,2.4);
  steh(1.6,-6.2,Math.PI,6,1.2,g,...c.W(1.6,-6.2));steh(-2.2,-5.9,Math.PI-.3,7,.95,g,...c.W(-2.2,-5.9));winker(5.4,1.2,-.8,2,g);c.K(5.4,1.2,.55);
  [[-7.5,-8.4],[7.5,-8.4],[-7.5,1.6],[7.5,1.6]].forEach((p,i)=>{cyl(.1,2.4,METALL,p[0],1.2,p[1],g);licht(.26,i<2?0x9ff4ff:0xfff0b0,p[0],2.55,p[1],g)})},{platz:0,ende:2})}
/* Erdkugel mit der gemalten Weltkarte (wie die Erde am Himmel) */
function erdkugel(par,r){const m=new THREE.Mesh(gK('erdgeo',()=>new THREE.SphereGeometry(1,22,14)),gK('erdmat',()=>new THREE.MeshLambertMaterial({map:erdTextur(),emissive:0x1a2a44})));m.scale.setScalar(r);m.castShadow=true;par.add(m);return m}
function erdTextur(){return gK('erdtex',()=>{const c=document.createElement('canvas');c.width=512;c.height=256;const t=c.getContext('2d');t.fillStyle='#1f66c8';t.fillRect(0,0,512,256);
  const fl=(f,P)=>{t.fillStyle=f;t.beginPath();const n=P.length;t.moveTo((P[n-1][0]+P[0][0])/2,(P[n-1][1]+P[0][1])/2);P.forEach((p,i)=>{const q=P[(i+1)%n];t.quadraticCurveTo(p[0],p[1],(p[0]+q[0])/2,(p[1]+q[1])/2)});t.closePath();t.fill()};
  /* grobe Umrisse der Kontinente (Länge 0 bis 360 Grad = 0 bis 512 Punkte) */
  fl('#4a9c52',[[232,52],[262,44],[300,38],[360,34],[420,46],[452,60],[430,82],[400,100],[376,118],[360,98],[330,104],[300,86],[282,92],[262,80],[236,78]]);
  fl('#c8b068',[[236,84],[268,80],[292,92],[306,112],[296,122],[300,138],[282,168],[268,176],[262,150],[250,126],[230,112],[228,98]]);fl('#4a9c52',[[250,112],[290,116],[296,138],[276,152],[260,132]]);
  fl('#4a9c52',[[48,50],[90,40],[128,46],[150,62],[132,74],[120,90],[104,104],[92,96],[76,84],[62,66]]);fl('#4a9c52',[[112,112],[136,118],[160,132],[150,158],[132,184],[122,204],[116,170],[108,140]]);
  fl('#c89c58',[[422,150],[452,144],[470,160],[462,176],[436,178],[420,166]]);fl('#e8f0f4',[[160,26],[196,22],[204,40],[180,50],[166,42]]);
  t.fillStyle='#eef6ff';t.fillRect(0,0,512,16);t.fillRect(0,238,512,18);
  for(let i=0;i<44;i++){t.fillStyle='rgba(255,255,255,'+(.28+((i*37)%30)/100)+')';const x=(i*113)%512,y=26+(i*71)%204;for(let k=0;k<5;k++){t.beginPath();t.ellipse(x+k*11-22,y+Math.sin(k+i)*5,9+(i*k)%13,3+(i+k)%4,.15,0,6.3);t.fill()}}
  return new THREE.CanvasTexture(c)})}
function ort13(){O('Solarfeld',(c,g)=>{
  scheibeW(13,.05,0x9aa0b0,0,.03,-1,g);
  [-10,-6.8,-3.6,3.6,6.8,10].forEach((x,i)=>{[-8,-4.6,-1.2,2.2].forEach((z,j)=>{if(Math.abs(x)>9&&(j===0||j===3))return;if((i+j)%7===3){const f=solarpaneel(g,x,z,2.5,0);const t=f;const p=f.parent;vm(p,t);leben(t,u=>{t.rotation.x=.55+Math.sin(u*.4)*.3})}else solarpaneel(g,x,z,2.5,0);c.S(x,z,2.7,1.5)})});
  /* Wechselrichter-Häuschen, Kabel, Putzroboter */
  const h=grp(0,0,-9,g);box(3,1.9,1.8,WEISS,0,.95,0,h,true);box(3.2,.2,2,ORANGE,0,2,0,h);for(let i=0;i<3;i++){lbox(.4,.5,.05,i<2?0x7ff2c0:GELB,-.8+i*.8,1.2,.93,h)}box(1,.12,.06,DUNKEL,0,.55,.93,h);c.S(0,-9,3.2,2);
  [-6.8,-3.6,3.6,6.8].forEach(x=>box(.14,.08,10.4,DUNKEL,x,.1,-2.9,g));[-1.4,1.4].forEach(x=>box(.14,.08,8,DUNKEL,x,.1,-4.4,g));
  const r=grp(0,0,0);box(1.3,.6,1,TUERKIS,0,.55,0,r,true);cyl(.22,2.2,0xf4f6fa,.8,.35,0,r).rotation.x=Math.PI/2;sph(.3,WEISS,-.2,1.05,0,r);licht(.09,0x1c2440,.05,1.1,.12,r);licht(.09,0x1c2440,.05,1.1,-.12,r);[-.45,.45].forEach(x=>[-.55,.55].forEach(z=>cyl(.22,.16,DUNKEL,x,.22,z,r).rotation.x=Math.PI/2));vm(r);
  fahren(r,pendel([c.W(-1.5,-7),c.W(-1.5,3.5)],.01),1.6,0);
  steh(1.9,-6.6,2.8,3,1.2,g,...c.W(1.9,-6.6));lampe(...c.W(-12,5.4),3);lampe(...c.W(11.6,5.4),3)},{platz:0,ende:1})}
function ort3(){O('Wohnkuppeln',(c,g)=>{
  const K=[[-8,-2.6,3.1,WEISS,BLAU,.55],[0,-7.4,3.6,0xf4efe4,ORANGE,0],[8,-2.6,3.1,0xe8f0fa,TUERKIS,-.55]];
  K.forEach(k=>{const h=kuppelhaus(g,k[0],k[1],k[2],k[3],k[4]);h.rotation.y=k[5];c.K(k[0],k[1],k[2]+.45);c.K(k[0]+Math.sin(k[5])*(k[2]+.4),k[1]+Math.cos(k[5])*(k[2]+.4),1)});
  [[-5.4,-4.2,-2.7,-5.9],[5.4,-4.2,2.7,-5.9]].forEach(r=>{rohr(g,[r[0],1,r[1]],[r[2],1,r[3]],.7,HELLGRAU);for(let i=1;i<3;i++){const t=i/3;const m=ring(.74,.07,ORANGE,r[0]+(r[2]-r[0])*t,1,r[1]+(r[3]-r[1])*t,g,0,14);m.rotation.y=Math.atan2(r[2]-r[0],r[3]-r[1])}c.L(r[0],r[1],r[2],r[3])});
  /* Vorplatz: Bank, Briefkasten, Lampen, Wäschekiste, Spielball */
  bank(g,-4.6,3.4,.4,ORANGE);c.S(-4.6,3.4,2.3,.9,.4);cyl(.08,1,METALL,4.2,.5,2.8,g);box(.9,.6,.6,ROT,4.2,1.25,2.8,g,true);tonnendach(.9,.26,.6,ROT,4.2,1.55,2.8,g);box(.4,.06,.03,DUNKEL,4.2,1.32,3.12,g);c.K(4.2,2.8,.55);
  lampe(...c.W(-11,3.4),3);lampe(...c.W(11,3.4),3);lampe(...c.W(-3.8,-2.4),2.6,0x9ff4ff);lampe(...c.W(3.8,-2.4),2.6,0x9ff4ff);
  tisch(g,6.8,3.6,1.4,1,0xffe0a0);cyl(.16,.32,BLAU,6.5,1.24,3.6,g);sph(.18,ORANGE,7.1,1.24,3.5,g);hocker(g,8,3.8,TUERKIS);hocker(g,5.6,3.9,ROT);c.S(6.8,3.7,3.2,1.2);
  steh(2.8,-2.4,-.4,5,1.2,g,...c.W(2.8,-2.4));winker(-2.8,-2.2,.4,7,g);c.K(-2.8,-2.2,.55);
  const ball=grp(-7.6,0,5.4,g);sph(.5,ROT,0,0,0,ball);liegend(ring(.51,.07,WEISS,0,0,0,ball,0,14));vm(ball);leben(ball,t=>{ball.position.y=.5+Math.abs(Math.sin(t*1.1))*2.4;ball.rotation.x=t});steh(-9.4,5.2,1.4,2,.9,g,...c.W(-9.4,5.2))})}
function ort4(){O('Weltraumküche und Kantine',(c,g)=>{
  halle(c,17,7,-4.8,0xfff0d8,ROT,3.6);c.wand[1]+=.6; /* Griff und Lämpchen des Kühlschranks gehen mit */
  /* Theke mit Töpfen, Herd, Kühlschrank, Vorratsregal mit Tuben und Päckchen */
  box(9,1.1,1.3,0x3b8fd4,-1.6,.65,-6,g,true);box(9.2,.14,1.5,WEISS,-1.6,1.26,-6,g);[-5,-3.4,-1.8].forEach((x,i)=>{cyl(.45,.5,[METALL,ROT,METALL][i],x,1.6,-6,g,true);cyl(.47,.07,DUNKEL,x,1.86,-6,g);sph(.1,DUNKEL,x,1.95,-6,g);[-.55,.55].forEach(q=>box(.18,.07,.14,DUNKEL,x+q,1.68,-6,g))});
  [0,.9,1.8].forEach(q=>{cyl(.34,.1,WEISS,q,1.37,-6,g);sph(.22,[ORANGE,GELB,ROT][Math.round(q/.9)],q,1.46,-6,g,1,.5,1)});c.S(-1.6,-6,9.4,1.6);
  box(1.8,3.1,1.1,WEISS,-7.2,1.6,-7.2,g,true);box(.1,1.1,.1,METALL,-6.55,2.1,-6.6,g);box(1.82,.07,.04,METALL,-7.2,1.5,-6.63,g);licht(.1,0x9ff4ff,-7.7,2.7,-6.62,g);c.S(-7.2,-7.2,2,1.3);
  [1.3,2.2,3.1].forEach(y=>{box(3.6,.12,.8,0x8a6a4a,5.6,y,-7.5,g);for(let i=0;i<6;i++){const x=4.2+i*.56,f=ANZUG[(i+Math.round(y))%8];if((i+Math.round(y*2))%2){cyl(.15,.55,f,x,y+.34,-7.5,g);cyl(.07,.14,WEISS,x,y+.68,-7.5,g)}else{box(.42,.5,.3,f,x,y+.31,-7.5,g);box(.24,.14,.03,WEISS,x,y+.34,-7.34,g)}}});[-1.75,1.75].forEach(q=>box(.14,3.4,.8,0x8a6a4a,5.6+q,1.7,-7.5,g));c.S(5.6,-7.5,3.8,.9);
  const koch=steh(-2.6,-7.4,0,0,1.25,g);cyl(.42,.5,WEISS,0,.95,-.05,koch.kopf);sph(.55,WEISS,0,1.3,-.05,koch.kopf,1,.55,1);
  /* Esstische mit Gästen */
  [[-5.4,-1],[5.4,-1]].forEach((p,i)=>{cyl(1.3,.14,i?0xffd890:0xbfe4ff,p[0],1,p[1],g,true);cyl(.16,1,METALL,p[0],.5,p[1],g);cyl(.6,.08,DUNKEL,p[0],.1,p[1],g);for(let k=0;k<3;k++){const a=k*2.09+.5;hocker(g,p[0]+Math.cos(a)*1.9,p[1]+Math.sin(a)*1.9,[ORANGE,TUERKIS,LILA][k])}cyl(.34,.08,WEISS,p[0]-.5,1.12,p[1],g);sph(.2,ORANGE,p[0]-.5,1.2,p[1],g,1,.6,1);cyl(.13,.34,BLAU,p[0]+.5,1.24,p[1]-.2,g);cyl(.02,.3,ROT,p[0]+.52,1.48,p[1]-.2,g).rotation.z=-.3;sph(.15,ROT,p[0]+.1,1.2,p[1]+.55,g);c.K(p[0],p[1],2.2)});
  /* schwebender Trinkbeutel (kleine Schwerkraft) und Servier-Roboter */
  const tr=grp(2.4,2.4,-3.4,g);box(.35,.55,.18,TUERKIS,0,0,0,tr);cyl(.03,.3,WEISS,.06,.4,0,tr);vm(tr);leben(tr,t=>{tr.position.y=2.4+Math.sin(t*1.3)*.35;tr.rotation.z=Math.sin(t*.8)*.5;tr.rotation.y=t*.6});
  const kellner=grp(0,0,0);const p=picoBau(kellner,0xffe0a0,ROT);box(1.1,.07,.8,METALL,0,1.25,.75,p.g);cyl(.18,.3,BLAU,-.25,1.45,.75,p.g);sph(.16,ROT,.25,1.42,.75,p.g);p.g.rotation.y=Math.PI/2;p.g.scale.setScalar(.75);vm(kellner);fahren(kellner,pendel([c.W(-2.6,-3.6),c.W(2.6,-3.4),c.W(2.4,1.6)],.4),1.3,2);
  lampe(...c.W(-9.4,3.6),3);lampe(...c.W(9.4,3.6),3)})}
function ort5(){O('Schlafkabinen',(c,g)=>{
  scheibeW(10.5,.05,0xb8b4d0,0,.03,-1.5,g);
  /* Kapseln mit Bett, Kissen, Decke und Leselicht; drei hinten, je zwei an den Seiten */
  const kapsel=(x,z,rot,i,schlaf)=>{const k=grp(x,0,z,g);k.rotation.y=rot;const f=[BLAU,LILA,TUERKIS,ORANGE,0xf07aa8,GELB,BLAU][i%7];box(2.5,.6,3,HELLGRAU,0,.3,0,k,true);box(2.5,2,.2,WEISS,0,1.4,-1.45,k,true);[-1.2,1.2].forEach(q=>box(.14,1.1,3,WEISS,q,1.1,0,k,true));const d=tonnendach(3,1.35,2.5,f,0,1.65,-.55,k);d.rotation.y=Math.PI/2;d.scale.set(1.9,1.2,1.27);
    box(2.2,.22,2.7,WEISS,0,.72,0,k);box(1.3,.24,.55,0xfff2c8,0,.92,-.95,k);box(2.22,.2,1.6,f,0,.92,.55,k);box(2.24,.06,.16,WEISS,0,1.04,.2,k);licht(.15,0xffe6a0,-.9,1.8,-1.28,k);bullauge(k,.45,1.6,-1.36,.34,0x1c2748);
    if(schlaf){const kp=grp(0,1.15,-.72,k);sph(.4,HAUT[i%6],0,0,0,kp,1,.85,1);sph(.42,HAARE[i%6],0,.06,-.14,kp,1,.85,.9);[-.14,.14].forEach(q=>box(.14,.03,.04,0x3a2a20,q,.32,.16,kp).rotation.x=-.6);sph(.05,0xe07878,0,.28,.33,kp,1.4,.6,1)}c.S(x,z,2.7,3.2,rot)};
  kapsel(-5.4,-7,0,0,true);kapsel(-1.8,-7.4,0,1);kapsel(1.8,-7.4,0,2,true);kapsel(5.4,-7,0,3);kapsel(-7.6,-2.4,1.25,4);kapsel(7.6,-2.4,-1.25,5,true);
  /* Mond-Wecker, Teppich, Pantoffeln, Kuschelrakete */
  const w=grp(0,0,-3.6,g);cyl(.08,1.6,METALL,0,.8,0,w);cyl(.7,.2,LILA,0,2,0,w,true).rotation.x=Math.PI/2;cyl(.58,.22,0xfff8e0,0,2,.01,w).rotation.x=Math.PI/2;box(.07,.4,.04,DUNKEL,0,2.14,.14,w);box(.3,.07,.04,DUNKEL,.12,2,.14,w);[-.45,.45].forEach(q=>sph(.22,GOLD,q,2.68,0,w));c.K(0,-3.6,.6);
  scheibeW(2.4,.07,0x7a68c0,0,.05,-.6,g);[[-1,.2],[-.6,.25],[.9,-1.4],[1.3,-1.3]].forEach((p,i)=>sph(.24,i<2?ROT:TUERKIS,p[0],.14,p[1],g,1,.5,1.6));
  const r=grp(-4.2,0,2.6,g);cyl(.35,1.2,WEISS,0,.8,0,r,true);cone(.35,.6,ROT,0,1.7,0,r);sph(.2,0x9fe0ff,0,1,.3,r,1,1,.5);[0,2.09,4.19].forEach(a=>box(.1,.5,.4,ROT,Math.sin(a)*.4,.35,Math.cos(a)*.4,r).rotation.y=a);c.K(-4.2,2.6,.55);
  [0,1,2].forEach(i=>{const z=grp(-5.4,0,-6,g);const zz=[-5.4,1.8,7.6][i];z.position.set(zz,0,i===2?-2.2:-6.8);lbox(.5,.09,.04,0xfff2c8,0,.22,0,z);lbox(.09,.62,.04,0xfff2c8,0,0,0,z).rotation.z=-.7;lbox(.5,.09,.04,0xfff2c8,0,-.22,0,z);vm(z);leben(z,t=>{const q=(t*.35+i*.33)%1;z.position.y=2.9+q*1.8;z.scale.setScalar(.4+q*.8)},0)});
  steh(4.4,1.8,-.8,1,1.15,g,...c.W(4.4,1.8));lampe(...c.W(-8.4,4),2.6,0xd8c0ff);lampe(...c.W(8.2,3.6),2.6,0xd8c0ff)},{platz:0})}
function ort6(){O('Sporthalle mit Laufband',(c,g)=>{
  halle(c,17,7.4,-4.6,0xdcefff,BLAU,3.8);
  /* zwei Laufbänder mit Haltegurten, eine Person läuft */
  [[-5,0],[-1.6,1]].forEach(p=>{const l=grp(p[0],0,-5.6,g);box(1.8,.35,3.2,DUNKEL,0,.32,0,l,true);box(1.4,.05,3,0x2a2e3a,0,.52,0,l);for(let i=0;i<7;i++)box(1.4,.02,.06,0x6a7088,0,.55,-1.3+i*.42,l);[-.9,.9].forEach(q=>{cyl(.07,1.7,METALL,q,1.3,-1.4,l);rohr(l,[q,2.15,-1.4],[q,1.75,.2],.06,ORANGE)});box(1.9,.5,.16,BLAU,0,2.35,-1.45,l);lbox(.9,.3,.04,0x7ff2c0,0,2.35,-1.35,l);c.S(p[0],-5.6,2.1,3.4)});
  const lf=grp(-5,0,-5.2,g),m=astro(lf,3,1.15);m.g.position.y=.55;m.g.rotation.y=Math.PI;[-.5,.5].forEach(q=>rohr(m.g,[q*.6,1.5,.1],[q*1.3,.1,.2],.035,ROT));vm(m.g,m.bl,m.br,m.al,m.ar);leben(lf,t=>{const q=Math.sin(t*8)*.75;m.bl.rotation.x=q;m.br.rotation.x=-q;m.al.rotation.x=-q;m.ar.rotation.x=q;lf.position.y=Math.abs(Math.cos(t*8))*.1});
  /* Standfahrrad */
  const fr=grp(3,0,-5.8,g);box(.5,.16,2,DUNKEL,0,.15,0,fr);rohr(fr,[0,.2,.6],[0,1.35,.2],.09,ROT);rohr(fr,[0,.2,-.6],[0,1.8,-.8],.09,ROT);rohr(fr,[0,.9,.35],[0,.9,-.55],.08,ROT);box(.5,.14,.7,0x22262e,0,1.45,.3,fr);rohr(fr,[-.45,1.85,-.8],[.45,1.85,-.8],.05,DUNKEL);const sr=grp(0,.65,-.45,fr);cyl(.5,.14,METALL,0,0,0,sr).rotation.z=Math.PI/2;box(.18,1.1,.1,ORANGE,0,0,0,sr);vm(sr);leben(sr,t=>{sr.rotation.x=t*5});c.S(3,-5.8,1,2.2);
  /* Zugbänder an der Wand, Bälle, Matten, Sprossenwand */
  for(let i=0;i<5;i++)box(2.2,.09,.09,0xd8a060,6.4,.5+i*.55,-7.9,g);[-1.1,1.1].forEach(q=>box(.14,3,.14,0xd8a060,6.4+q,1.5,-7.9,g));c.S(6.4,-7.9,2.4,.5);
  [[5.6,-5.4,.65,ROT],[7,-4.4,.5,GELB],[6.2,-3.2,.42,TUERKIS]].forEach(p=>{sph(p[2],p[3],p[0],p[2]+.1,p[1],g);liegend(ring(p[2]+.02,.05,WEISS,p[0],p[2]+.1,p[1],g,0,16));c.K(p[0],p[1],p[2]+.1)});
  [[-5.8,-1,BLAU],[-5.8,.4,LILA]].forEach(p=>box(3,.18,1.1,p[2],p[0],.22,p[1],g));[[-7,-3.4],[-3.4,-2.4]].forEach(p=>{cyl(.09,1.9,METALL,p[0],.95,p[1],g);for(let i=0;i<3;i++)liegend(ring(.5,.1,[ROT,GELB,BLAU][i],p[0],.5+i*.55,p[1],g,0,14));c.K(p[0],p[1],.6)});
  const sp=winker(2.2,-2.2,0,6,g);const p2=grp(5.6,0,.4,g),m2=astro(p2,4,1.1);p2.rotation.y=-.7;vm(m2.g,m2.al,m2.ar);leben(p2,t=>{const q=Math.abs(Math.sin(t*2.2));p2.position.y=q*1.6;m2.al.rotation.z=-q*2.6;m2.ar.rotation.z=q*2.6});c.K(5.6,.4,.7);c.K(2.2,-2.2,.55);
  lampe(...c.W(-9.4,3.6),3);lampe(...c.W(9.4,3.6),3)})}
function ort9(){O('Gewächshaus-Kuppel',(c,g)=>{
  const R=11.4;scheibeW(R+.4,.14,0x7a8296,0,.08,-.5,g);scheibeW(R-.1,.18,0x9a7a5a,0,.1,-.5,g);box(3.6,.22,R*2-1,0xd8d0c0,0,.12,-.5,g);
  /* Glaskuppel: vorn offen, Gerüst aus Bögen */
  const ga=.38;wandRing(c,0,-.5,R,Math.PI/2,ga);kuppelGeruest(g,0,-.5,R,7.6,ga);
  const beet=(x,z,w,t,art)=>{box(w,.55,t,0xc8cdd8,x,.45,z,g,true);box(w-.2,.14,t-.2,0x6a4a30,x,.75,z,g);const n=Math.round(w/1.05),m=Math.max(1,Math.round(t/1));for(let i=0;i<n;i++)for(let j=0;j<m;j++){const px=x-w/2+.55+i*(w-1.1)/Math.max(1,n-1),pz=z-t/2+.5+j*(t-1)/Math.max(1,m-1),p=c.W(px,pz);
      if(art===0){inst('blatt',p[0],.98,p[1],.4,.28,.4,0x5ec25a);inst('blatt',p[0],1.08,p[1],.24,.24,.24,0x86d860)}else if(art===1){inst('rund',p[0],1.35,p[1],.05,1.1,.05,0x3a7a30);inst('blatt',p[0],1.5,p[1],.34,.5,.34,0x3f9a40);for(let k=0;k<3;k++){const a=k*2.1+i;inst('kugel',p[0]+Math.cos(a)*.3,1.2+k*.24,p[1]+Math.sin(a)*.3,.15,.15,.15,0xe8402a)}}else if(art===2){inst('kegel',p[0],1.12,p[1],.26,.65,.26,0x54b848,i);inst('rund',p[0]+.1,.86,p[1]+.1,.09,.12,.09,0xf0801e)}else{inst('blatt',p[0],.96,p[1],.42,.24,.42,0x3a8a46);inst('kugel',p[0]+.22,1.04,p[1],.14,.14,.14,0xf8d030);inst('kugel',p[0]-.2,1,p[1]+.2,.12,.12,.12,0xf8d030)}}c.S(x,z,w,t)};
  beet(-6.4,-5,4.4,2,0);beet(-7.2,-.6,4.4,2,1);beet(-6,3.8,4,2,2);beet(6.4,-5,4.4,2,1);beet(7.2,-.6,4.4,2,3);beet(6,3.8,4,2,0);beet(0,-8.6,5.6,2,1);
  /* Pflanzenlampen und Gärtnerin, Gießroboter */
  [[-6.8,-2.8],[6.8,-2.8],[-6,1.6],[6,1.6],[0,-6.6]].forEach(p=>{[-1.6,1.6].forEach(q=>cyl(.06,2.5,METALL,p[0]+q,1.25,p[1],g));box(3.4,.14,.3,WEISS,p[0],2.55,p[1],g);lbox(3.1,.08,.22,0xf090f0,p[0],2.45,p[1],g)});
  steh(-3.2,-3.2,-1.4,1,1.15,g,...c.W(-3.2,-3.2));steh(3.4,1,1.5,5,.95,g,...c.W(3.4,1));
  const r=grp(0,0,0);const p=picoBau(r,0xd8f0c8,0x3a9a46);cyl(.26,.42,0x3a9a46,.0,1.0,.82,p.g);rohr(p.g,[0,1.05,1],[0,1.35,1.5],.06,0x3a9a46);[0,1,2].forEach(i=>licht(.07,0x8ad8ff,(i-1)*.14,1.22-i*.06,1.66,p.g));p.g.rotation.y=Math.PI/2;p.g.scale.setScalar(.75);vm(r);fahren(r,pendel([c.W(-2.4,-5.6),c.W(2.4,-2),c.W(-2.2,2.4)],.2),1,1);
  fass(g,-3,-6.8,BLAU,.8);fass(g,3,-6.8,BLAU,.8);c.K(-3,-6.8,.6);c.K(3,-6.8,.6);
  for(let i=0;i<5;i++){const s=schmetter([ORANGE,GELB,0xf07aa8,0x7ac8ff,LILA][i]),p0=c.W([-6,5,-4,6,0][i],[-3,2,3,-5,-5][i]);leben(s,t=>{s.position.set(p0[0]+Math.sin(t*.7+i)*2,1.9+Math.sin(t*1.9+i)*.5,p0[1]+Math.cos(t*.6+i*2)*1.8);s.rotation.y=t*.7+i;s.scale.x=.35+Math.abs(Math.sin(t*9+i))*.65},0)}},{platz:0,ende:5})}
function schmetter(farbe){const s=grp(0,2,0);[-1,1].forEach(q=>{box(.34,.04,.28,farbe,q*.18,0,0,s);box(.22,.04,.2,farbe,q*.14,0,-.2,s)});box(.06,.06,.4,DUNKEL,0,0,-.06,s);vm(s);return s}
/* runde Wand (Kuppelfuß) mit Öffnung in Richtung ga */
function wandRing(c,cx,cz,r,richtung,halb){const n=Math.round(r*3.2);let pa=null;for(let i=0;i<=n;i++){const a=richtung+halb+(Math.PI*2-2*halb)*i/n,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(pa){c.L(pa[0],pa[1],x,z);const mx=(pa[0]+x)/2,mz=(pa[1]+z)/2,s=box(Math.hypot(x-pa[0],z-pa[1])+.06,.7,.34,i%3?WEISS:ORANGE,mx,.45,mz,c.g);s.rotation.y=-Math.atan2(z-pa[1],x-pa[0])}pa=[x,z]}
  [-1,1].forEach(s=>{const a=richtung+s*halb,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;cyl(.26,2.6,WEISS,x,1.3,z,c.g,true);licht(.28,0xfff0b0,x,2.75,z,c.g)})}
/* Glaskuppel mit Rippen; vorn (lokal +z) ein Ausschnitt */
function kuppelGeruest(g,cx,cz,r,h,ga){const geo=gK('kg'+ga,()=>new THREE.SphereGeometry(1,26,7,Math.PI/2+ga+.12,Math.PI*2-2*(ga+.12),0,Math.PI/2));const m=new THREE.Mesh(geo,GLAS);m.position.set(cx,.8,cz);m.scale.set(r,h,r);m.rotation.y=0;m.renderOrder=2;
  /* SphereGeometry: phi=0 zeigt nach -x, phi=PI/2 nach +z */
  g.add(m);const n=10;for(let i=0;i<n;i++){const a=Math.PI/2+ga+(Math.PI*2-2*ga)*i/(n-1),x=Math.cos(a),z=Math.sin(a);let pa=[x*r,.8,z*r];for(let k=1;k<=6;k++){const q=k/6*Math.PI/2,nx=[x*r*Math.cos(q),.8+h*Math.sin(q),z*r*Math.cos(q)];rohr(g,[cx+pa[0],pa[1],cz+pa[2]],[cx+nx[0],nx[1],cz+nx[2]],.07,0xdde4f0);pa=nx}}
  const o=ring(r*.5,.08,0xdde4f0,cx,.8+h*.866,cz,g,0,28);o.rotation.x=Math.PI/2;sph(.4,ORANGE,cx,.8+h,cz,g)}
function ort16(){O('Park-Kuppel',(c,g)=>{
  const R=11.6;scheibeW(R+.4,.14,0x7a8296,0,.08,-.5,g);scheibeW(R-.1,.18,0x6cc455,0,.1,-.5,g);scheibeW(3.2,.2,0xe8dcb8,0,.11,0,g);box(2.8,.22,9,0xe8dcb8,0,.12,6.2,g);
  const ga=.4;wandRing(c,0,-.5,R,Math.PI/2,ga);kuppelGeruest(g,0,-.5,R,8.4,ga);
  /* kleine Bäume (nur hier unter der Kuppel) */
  [[-7.4,-3.6,1],[-4.4,-7.8,1.15],[4.8,-7.6,.9],[8,-2.4,1.1],[-8,3,.8]].forEach((p,i)=>{cyl(.28*p[2],2.2*p[2],0x8a5a32,p[0],1.1*p[2],p[1],g,true);const f=[0x4aa844,0x62bc4e,0x3d9648][i%3];sph(1.35*p[2],f,p[0],2.9*p[2],p[1],g,1,.85,1);sph(.85*p[2],dk(f,1.15),p[0]+.7*p[2],3.5*p[2],p[1]+.3,g);sph(.8*p[2],f,p[0]-.7*p[2],3.4*p[2],p[1]-.2,g);if(i%2)for(let k=0;k<5;k++){const a=k*1.3;sph(.14,ROT,p[0]+Math.cos(a)*1.2*p[2],2.7*p[2]+(k%2)*.5,p[1]+Math.sin(a)*1.2*p[2],g)}c.K(p[0],p[1],.5)});
  /* Teich mit Brunnen und Entchen aus Plastik */
  scheibeW(2.8,.24,0xd0c8b8,5.4,.13,2.8,g);scheibeW(2.45,.28,0x4ab4e8,5.4,.14,2.8,g);cyl(.35,.9,WEISS,5.4,.65,2.8,g);sph(.5,WEISS,5.4,1.15,2.8,g,1,.4,1);c.K(5.4,2.8,2.85);
  const fo=grp(5.4,1.3,2.8,g);for(let i=0;i<10;i++){const a=i*.628;licht(.11,0xb8ecff,Math.cos(a)*.55,.35+(i%2)*.4,Math.sin(a)*.55,fo)}licht(.18,0xdff6ff,0,.9,0,fo);vm(fo);leben(fo,t=>{fo.scale.set(1+Math.sin(t*3)*.15,1+Math.sin(t*5)*.25,1+Math.sin(t*3)*.15);fo.rotation.y=t});
  const ente=grp(0,0,0);sph(.34,GELB,0,0,0,ente,1.3,.8,1);sph(.22,GELB,.3,.3,0,ente);cone(.08,.2,ORANGE,.55,.28,0,ente).rotation.z=-Math.PI/2;[-.1,.1].forEach(z=>sph(.035,DUNKEL,.44,.37,z,ente));vm(ente);const ep=c.W(5.4,2.8);leben(ente,t=>{const a=t*.5;ente.position.set(ep[0]+Math.cos(a)*1.6,.45+Math.sin(t*2)*.04,ep[1]+Math.sin(a)*1.6);ente.rotation.y=-a-Math.PI/2},0);
  for(let i=0;i<120;i++){const a=nr()*6.28,q=3.8+nr()*7,x=Math.cos(a)*q,z=-.5+Math.sin(a)*q;if((Math.abs(x)<2&&z>0)||Math.hypot(x-5.4,z-2.8)<3.2||Math.hypot(x,z+.5)>R-.8)continue;const p=c.W(x,z);if(i%3){inst('kegel',p[0],.42,p[1],.16,.42,.16,[0x4aa83c,0x6cc450][i%2],a)}else{inst('rund',p[0],.38,p[1],.04,.4,.04,0x3a8a30);inst('kugel',p[0],.62,p[1],.17,.12,.17,[ROT,GELB,0xf47ab0,WEISS,LILA][(i/3|0)%5])}}
  [[-6.4,.4,1.3],[-3.4,-5.6,.4],[3.4,-5.4,-.4]].forEach(p=>{bank(g,p[0],p[1],p[2],0xb87a42);c.S(p[0],p[1],2.3,.9,p[2])});
  [[-9,-.8],[0,-9.6],[9,-6]].forEach(p=>{sph(.8,0x3f9a40,p[0]*.97,.65,p[1]*.97,g,1.2,.85,1);c.K(p[0]*.97,p[1]*.97,.85)});
  steh(-4.2,1.6,1.2,6,1.15,g,...c.W(-4.2,1.6));winker(2.2,-3.6,-.3,4,g);c.K(2.2,-3.6,.55);steh(-1.8,-5,.5,2,.9,g,...c.W(-1.8,-5));
  for(let i=0;i<7;i++){const s=schmetter([ORANGE,GELB,0xf07aa8,0x7ac8ff,LILA,WEISS,ROT][i]),p0=c.W([-6,3,-2,7,-7,1,4][i],[-4,-4,3,-3,2,-7,1][i]);leben(s,t=>{s.position.set(p0[0]+Math.sin(t*.7+i)*2,2+Math.sin(t*1.9+i)*.6,p0[1]+Math.cos(t*.6+i*2)*1.8);s.rotation.y=t*.7+i;s.scale.x=.35+Math.abs(Math.sin(t*9+i))*.65},0)}},{platz:0,ende:6})}
/* ==================== Orte: Versorgung und Alltag ==================== */
function ort7(){O('Krankenstation',(c,g)=>{
  scheibeW(10,.05,0xdce6ee,0,.03,-1.5,g);
  const h=grp(0,0,-7,g);box(11,3.4,3.6,WEISS,0,1.85,0,h,true);tonnendach(11,1.2,3.6,0x6ab4e8,0,3.55,0,h);box(11.2,.3,3.8,0x7a8296,0,.15,0,h);box(11.1,.3,3.7,BLAU,0,3.35,0,h);luke(h,0,1.83,BLAU,1.05);[-3.9,-2.1,2.1,3.9].forEach(x=>bullauge(h,x,2,1.86,.55,0xffe9a8));
  /* blaues Kreuz über der Tür */
  cyl(.85,.2,WEISS,0,4.35,1.7,h).rotation.x=Math.PI/2;ring(.85,.1,BLAU,0,4.35,1.82,h,0,20);box(1.05,.34,.1,BLAU,0,4.35,1.85,h);box(.34,1.05,.1,BLAU,0,4.35,1.86,h);c.S(0,-7,11.2,3.8);
  /* Liege mit Patient, Herzmonitor, Medizinschrank */
  const l=grp(-5.2,0,-1.8,g);l.rotation.y=.3;box(1.5,.3,3,WEISS,0,.95,0,l,true);box(1.52,.16,1.7,0x8ad0f0,0,1.14,.55,l);box(1.1,.24,.6,0xfff2c8,0,1.18,-1,l);[-.6,.6].forEach(x=>[-1.2,1.2].forEach(z=>cyl(.08,.8,METALL,x,.4,z,l)));const k=grp(0,1.45,-.9,l);sph(.4,HAUT[1],0,0,0,k);sph(.42,HAARE[3],0,.05,-.14,k,1,.9,.9);[-.14,.14].forEach(x=>sph(.05,0x1b1b1b,x,.32,.18,k));box(.2,.04,.04,0xa84040,0,.26,.3,k);c.S(-5.2,-1.8,1.7,3.2,.3);
  const mo=grp(-7.6,0,-2.8,g);mo.rotation.y=.5;cyl(.07,1.5,METALL,0,.75,0,mo);cyl(.4,.08,DUNKEL,0,.08,0,mo);box(1.5,1,.3,DUNKEL,0,1.95,0,mo,true);lbox(1.32,.82,.03,0x0c3a30,0,1.95,.16,mo);[[-.5,0],[-.32,0],[-.22,.25],[-.12,-.2],[0,0],[.2,0],[.3,.15],[.4,0],[.52,0]].reduce((a,b)=>{if(a){const dx=b[0]-a[0],dy=b[1]-a[1];lbox(Math.hypot(dx,dy)+.03,.045,.03,0x6affb0,(a[0]+b[0])/2,1.95+(a[1]+b[1])/2,.19,mo).rotation.z=Math.atan2(dy,dx)}return b},null);const pk=grp(-.55,1.95,.22,mo);licht(.08,0xffffff,0,0,0,pk);leben(pk,t=>{const u=(t*.5)%1;pk.position.x=-.55+u*1.1},0);c.K(-7.6,-2.8,.7);
  const s=grp(7.8,0,-3.4,g);s.rotation.y=-.6;box(2,2.4,.8,WEISS,0,1.2,0,s,true);[.5,1.2,1.9].forEach(y=>{box(1.8,.08,.7,METALL,0,y,.1,s);for(let i=0;i<4;i++)cyl(.14,.38,[ROT,BLAU,TUERKIS,ORANGE][(i+Math.round(y*3))%4],-.65+i*.43,y+.24,.28,s)});c.S(7.8,-3.4,2.2,1,-.6);
  /* Ärztin, Medizin-Roboter, Rollstuhl-frei: Waage */
  const a=steh(-3.2,-2.4,-.9,0,1.2,g,...c.W(-3.2,-2.4));box(.1,.3,.05,BLAU,.2,1.62,.22,a.g);box(.3,.1,.05,BLAU,.2,1.62,.22,a.g);
  const r=grp(4.2,0,-1.6,g);const p=picoBau(r,WEISS,BLAU);box(.7,.5,.4,WEISS,.0,1.1,.75,p.g);box(.36,.11,.03,BLAU,0,1.1,.97,p.g);box(.11,.36,.03,BLAU,0,1.1,.98,p.g);vm(p.kopf);vm(r);r.rotation.y=-.6;leben(r,t=>{p.kopf.rotation.y=Math.sin(t)*.6;r.position.y=Math.abs(Math.sin(t*2))*.08});c.K(4.2,-1.6,.7);
  box(1.5,.2,1.5,HELLGRAU,5.4,.15,2.4,g);cyl(.08,1.6,METALL,5.4,.95,1.75,g);box(.7,.4,.2,BLAU,5.4,1.8,1.75,g);c.K(5.4,1.75,.45);bank(g,-5.8,3.4,.25,TUERKIS);c.S(-5.8,3.4,2.3,.9,.25);
  lampe(...c.W(-8.6,4.4),3,0x9ff4ff);lampe(...c.W(8.4,3.6),3,0x9ff4ff);rueckseite(g,11,-8.85,BLAU,3.4);c.wand=[-9.5,-5]},{platz:0})}
function ort8(){O('Mondschule',(c,g)=>{
  halle(c,16,6.6,-5.2,0xffe6b8,TUERKIS,3.6);
  /* Tafel mit Sonne und Planeten */
  box(9,2.8,.16,0xc8944a,-1,2.1,-8.15,g);box(8.6,2.5,.2,0x172046,-1,2.1,-8.1,g);licht(.75,0xffc830,-4.6,2.1,-7.98,g,1,1,.2);[[.12,0xb8b0a8],[.2,0xe8c078],[.22,0x3a80e0],[.16,0xd8603a],[.42,0xd8a878],[.34,0xe8d090],[.28,0x8ad8e0],[.28,0x4a6ad8]].forEach((p,i)=>{const x=-3.4+i*.82,y=2.1+Math.sin(i*1.7)*.55;sph(p[0],p[1],x,y,-7.95,g,1,1,.3);if(i===5)ring(.5,.04,0xf0e0b0,x,y,-7.9,g,0,18).rotation.x=1.2});
  /* Pulte mit Schulkindern in Raumanzügen */
  [[-4.6,-4.4],[-1,-4.4],[2.6,-4.4],[-4.6,-2],[-1,-2],[2.6,-2]].forEach((p,i)=>{tisch(g,p[0],p[1]-.6,1.9,.9,[0xffd890,0xbfe4ff][i%2]);box(.8,.06,.55,DUNKEL,p[0],1.1,p[1]-.6,g);lbox(.7,.03,.45,0x9fe0ff,p[0],1.14,p[1]-.6,g);if(i!==4){hocker(g,p[0],p[1]+.3,BLAU);const m=astro(g,i+1,.82);m.g.position.set(p[0],.12,p[1]+.35);m.g.rotation.y=Math.PI;m.bl.rotation.x=m.br.rotation.x=-1.4}c.S(p[0],p[1]-.2,2,1.7)});
  const lehr=winker(5.6,-6.4,-.5,5,g);c.K(5.6,-6.4,.6);
  /* Mondglobus, dreht sich; Fernrohr */
  const gl=grp(6.4,0,-2.2,g);cyl(.6,.2,DUNKEL,0,.2,0,gl);cyl(.12,1.2,METALL,0,.85,0,gl,true);const k=grp(0,2.2,0,gl);mondkugel(k,.95);vm(k);leben(k,t=>{k.rotation.y=t*.5});c.K(6.4,-2.2,1);
  const f=grp(-7,0,-.6,g);[0,2.09,4.19].forEach(a=>rohr(f,[Math.cos(a)*.7,0,Math.sin(a)*.7],[0,1.4,0],.07,0x8a6a4a));const r=grp(0,1.6,0,f);r.rotation.set(.65,.4,0);cyl(.26,2,ORANGE,0,0,0,r,true).rotation.x=Math.PI/2;cyl(.32,.3,DUNKEL,0,0,-1,r).rotation.x=Math.PI/2;cyl(.12,.3,DUNKEL,0,0,1.1,r).rotation.x=Math.PI/2;c.K(-7,-.6,.8);
  /* Schulranzen und Schulglocke */
  [[-6.2,-3.6,ROT],[4.6,-.4,TUERKIS]].forEach(p=>{box(.6,.7,.35,p[2],p[0],.45,p[1],g,true);box(.5,.3,.1,WEISS,p[0],.4,p[1]+.22,g);c.K(p[0],p[1],.45)});
  lampe(...c.W(-8.8,3.8),3);lampe(...c.W(8.8,3.8),3)})}
function mondkugel(par,r){sph(r,0xc9ccd6,0,0,0,par);[[.2,.4,.9,.26],[-.6,-.1,.7,.2],[.7,-.35,.5,.17],[-.2,-.6,.75,.13],[-.9,.4,-.1,.24],[.85,.35,-.3,.2],[.1,.1,-1,.3],[-.4,.85,.2,.16],[.35,-.9,-.1,.18]].forEach(p=>{const v=new THREE.Vector3(p[0],p[1],p[2]).normalize(),m=sph(r*p[3],0x969aa8,v.x*r*.94,v.y*r*.94,v.z*r*.94,par,1,1,.3);m.lookAt(v.x*r*3,v.y*r*3,v.z*r*3)})}
function ort10(){O('Algenzucht',(c,g)=>{
  scheibeW(10.5,.05,0xb4c8d0,0,.03,-1.5,g);
  /* hohe Glasröhren mit türkisblauen Algen, Blasen steigen auf */
  [[-7,-4.6],[-4.2,-6.4],[-1.4,-7.2],[1.4,-7.2],[4.2,-6.4],[7,-4.6]].forEach((p,i)=>{const f=[0x18b8a8,0x20a0b8,0x28c8b0][i%3];cyl(.85,.4,METALL,p[0],.25,p[1],g,true);lscheibe(.6,3.2,f,p[0],2.1,p[1],g);glasZ(.74,3.9,p[0],2.4,p[1],g);cyl(.85,.3,METALL,p[0],4.45,p[1],g);cyl(.14,.6,DUNKEL,p[0],4.8,p[1],g);[1.2,2.9].forEach(y=>liegend(ring(.75,.045,WEISS,p[0],y,p[1],g,0,14)));
    const b=grp(p[0],.6,p[1],g);for(let k=0;k<5;k++){const a=k*2.4;licht(.09,0xdffcff,Math.cos(a)*.62,k*.55,Math.sin(a)*.62,b)}vm(b);leben(b,t=>{b.position.y=.6+((t*.7+i*.3)%1.6);b.rotation.y=t},0);c.K(p[0],p[1],.95)});
  [[0,1],[1,2],[2,3],[3,4],[4,5]].forEach(q=>{const P=[[-7,-4.6],[-4.2,-6.4],[-1.4,-7.2],[1.4,-7.2],[4.2,-6.4],[7,-4.6]];rohr(g,[P[q[0]][0],4.9,P[q[0]][1]],[P[q[1]][0],4.9,P[q[1]][1]],.12,TUERKIS)});
  /* flache Becken, Pumpe, Pult */
  [[-6.4,.4],[6.4,.4]].forEach((p,i)=>{box(3.8,.6,2.6,WEISS,p[0],.4,p[1],g,true);lbox(3.4,.1,2.2,0x18b0a0,p[0],.72,p[1],g);const r=grp(p[0],.92,p[1],g);box(2,.1,.14,METALL,0,0,0,r);box(.14,.1,2,METALL,0,0,0,r);cyl(.18,.34,ORANGE,0,0,0,r);vm(r);leben(r,t=>{r.rotation.y=t*(i?-.9:.9)});c.S(p[0],p[1],4,2.8)});
  pult(g,-2.6,-3.4,.3,0xbfe4ff);c.S(-2.6,-3.4,2,1.1,.3);cyl(.9,1.4,BLAU,3,-0+.7,-3.8,g,true);sph(.9,BLAU,3,1.4,-3.8,g,1,.4,1);[0,1].forEach(i=>liegend(ring(.93,.08,ORANGE,3,.5+i*.7,-3.8,g,0,18)));rohr(g,[3,1.7,-3.8],[4.2,4.8,-6.4],.12,TUERKIS);c.K(3,-3.8,1);
  steh(-1,-3,.3,6,1.15,g,...c.W(-1,-3));algenVorn(c);lampe(...c.W(-9,4.2),3,0x7ff2e0);lampe(...c.W(9,4.2),3,0x7ff2e0);c.wand=[-9,-4.2]},{platz:0})}
function ort11(){O('Wasserwerk',(c,g)=>{
  scheibeW(11.4,.05,0xb0c0d4,0,.03,-1.5,g);
  tank(c,-7,-5.6,2,3.6,WEISS,BLAU);tank(c,-1.8,-7.8,2.4,4.4,0x7ac0f0,WEISS);tank(c,3.8,-7,1.8,3,WEISS,BLAU);
  [[[-5.2,1.5,-5.8],[-4,1.5,-7.4]],[[.4,2.2,-7.8],[2.2,2.2,-7.2]],[[-7,1.2,-3.6],[-7,1.2,-1.4]],[[3.8,1.2,-5.2],[6.6,1.2,-3.6]]].forEach(r=>{rohr(g,r[0],r[1],.26,BLAU);c.L(r[0][0],r[0][2],r[1][0],r[1][2]);[r[0],r[1]].forEach(p=>sph(.34,METALL,p[0],p[1],p[2],g))});
  /* Handräder, die sich drehen */
  [[-7,-1.2],[6.8,-3.4]].forEach((p,i)=>{cyl(.3,1.2,BLAU,p[0],.6,p[1],g,true);const r=grp(p[0],1.75,p[1]+.1,g);ring(.62,.09,ROT,0,0,0,r,0,16);box(1.2,.1,.08,ROT,0,0,0,r);box(.1,1.2,.08,ROT,0,0,0,r);sph(.14,DUNKEL,0,0,0,r);vm(r);leben(r,t=>{r.rotation.z=Math.sin(t*.8+i*2)*2});c.K(p[0],p[1],.7)});
  /* Förderband mit Eisblöcken zum Schmelzofen */
  box(8,.7,1.5,DUNKEL,2.2,.5,-.6,g,true);for(let i=0;i<9;i++)cyl(.16,1.6,METALL,-1.5+i*.92,.86,-.6,g).rotation.x=Math.PI/2;c.S(2.2,-.6,8.2,1.7);
  box(2.2,2.4,2.2,ORANGE,7.4,1.2,-.6,g,true);box(2.4,.25,2.4,DUNKEL,7.4,2.5,-.6,g);lbox(.1,.9,1.1,0xffb040,6.26,1.35,-.6,g);cyl(.25,.9,METALL,7.8,3.1,-1,g);c.S(7.4,-.6,2.4,2.4);
  for(let i=0;i<4;i++){const e=grp(0,1.3,-.6,g);box(.75,.6,.75,0xc4ecff,0,0,0,e);licht(.12,0xffffff,.15,.28,.2,e);vm(e);leben(e,t=>{const u=(t*.14+i*.25)%1;e.position.x=-1.4+u*7.4;e.rotation.y=i},0)}
  /* Wassertropfen-Figur und Trinkbrunnen */
  const tr=grp(-5.4,0,2.6,g);cyl(.9,.4,WEISS,0,.2,0,tr);sph(.75,0x3aa4f0,0,1.15,0,tr);cone(.6,1,0x3aa4f0,0,2,0,tr);sph(.18,0xffffff,-.28,1.35,.62,tr,1,1.5,.4);c.K(-5.4,2.6,1);
  cyl(.3,1,METALL,4.6,.5,2.8,g,true);cyl(.55,.2,WEISS,4.6,1.05,2.8,g);lscheibe(.42,.06,0x6ac8ff,4.6,1.17,2.8,g);c.K(4.6,2.8,.6);
  steh(1.2,-3.6,.2,2,1.2,g,...c.W(1.2,-3.6));steh(2.8,1.4,-.7,0,1,g,...c.W(2.8,1.4));lampe(...c.W(-9.6,5),3,0x9ad8ff);lampe(...c.W(9.4,5),3,0x9ad8ff);c.wand=[-10.8,-4.4]},{platz:0})}
function ort28(){O('Schwebe-Übungshalle',(c,g)=>{
  /* offene Halle: Boden, Rückwand, hohe Pfosten mit Bögen im hinteren Teil */
  box(18,.14,13,0x7a86c8,0,.08,-2.5,g).receiveShadow=true;box(18,2.2,.4,WEISS,0,1.1,-9,g,true);box(18.2,.3,.5,LILA,0,2.3,-9,g);c.S(0,-9,18.4,.6);
  [-9,-4.5,0,4.5,9].forEach((x,i)=>{cyl(.16,5.6,METALL,x,2.8,-8.7,g,true);licht(.24,[0xfff0b0,0x9ff4ff][i%2],x,5.75,-8.7,g)});rohr(g,[-9,5.4,-8.7],[9,5.4,-8.7],.12,LILA);
  [-9,9].forEach(x=>{cyl(.16,3,METALL,x,1.5,-2,g,true);cyl(.16,1.4,METALL,x,.7,3.4,g);rohr(g,[x,2.9,-8.7],[x,2.9,-2],.1,LILA);rohr(g,[x,1.3,-8.7],[x,1.3,3.4],.08,ORANGE);c.L(x,-9,x,3.4)});
  /* Matten, Haltestangen, Reifen zum Durchschweben */
  [[-5.6,-5.6,ORANGE],[0,-6.4,TUERKIS],[5.6,-5.6,GELB],[-6,-.8,TUERKIS],[6,-.8,ORANGE]].forEach(p=>box(3.6,.2,2.4,p[2],p[0],.24,p[1],g));
  [[-3.2,3.2,ROT],[2.6,4,GELB],[0,4.8,TUERKIS]].forEach((p,i)=>{const r=grp((i-1)*5.2,p[1],-6.4,g);ring(1.25,.14,p[2],0,0,0,r,0,22);vm(r);leben(r,t=>{r.position.y=p[1]+Math.sin(t*.7+i*2)*.5;r.rotation.y=Math.sin(t*.5+i)*.7})});
  /* schwebende Astronautinnen, Astronauten und Bälle */
  [[-5.4,2.6,-3.6,1],[1.4,3.1,-3,3],[5.6,2.3,-4.4,5],[-1.8,4.2,-5.6,6]].forEach((p,i)=>{const w=grp(p[0],p[1],p[2],g),d=grp(0,0,0,w),m=astro(d,p[3],1.05);m.g.position.y=-1.4;m.al.rotation.z=-1.9-i*.2;m.ar.rotation.z=1.6+i*.25;m.bl.rotation.x=.5;m.br.rotation.x=-.4;vm(m.g,m.al,m.ar,m.bl,m.br);leben(w,t=>{w.position.y=p[1]+Math.sin(t*.6+i*1.7)*.6;w.position.x=p[0]+Math.sin(t*.33+i)*1;d.rotation.z=Math.sin(t*.4+i*2)*1.2;d.rotation.x=Math.sin(t*.3+i)*.4;w.rotation.y=Math.sin(t*.22+i)*1.4})});
  [[-3,1.8,-1.6,ROT],[3.4,1.5,-1.8,GELB],[.2,2.4,-7,0xf07aa8],[7.2,3.4,-6.4,TUERKIS],[-7.4,3.6,-5,ORANGE]].forEach((p,i)=>{const b=grp(p[0],p[1],p[2],g);sph(.45,p[3],0,0,0,b);liegend(ring(.46,.05,WEISS,0,0,0,b,0,14));vm(b);leben(b,t=>{b.position.set(p[0]+Math.sin(t*.5+i*2)*.8,p[1]+Math.sin(t*.8+i)*.5,p[2]+Math.cos(t*.4+i)*.6);b.rotation.set(t*.4,t*.3,t*.2)})});
  winker(-7.4,2,.9,2,g);c.K(-7.4,2,.55);steh(7.4,1.8,-1,4,1.15,g,...c.W(7.4,1.8));lampe(...c.W(-10.8,5),3);lampe(...c.W(10.8,5),3);c.wand=[-9.5,-8.3]},{platz:0})}
function ort27(){O('Trainingskarussell',(c,g)=>{
  const cz=-2.6;scheibeW(10.2,.08,0x8a92aa,0,.05,cz,g);liegend(ring(8.6,.14,ORANGE,0,.12,cz,g,0,44));
  cyl(1.5,1,DUNKEL,0,.6,cz,g,true);cyl(.7,2,METALL,0,1.9,cz,g,true);
  const arm=grp(0,2.6,cz,g);cyl(1,.6,ORANGE,0,0,0,arm,true);box(7,.4,.5,WEISS,3.4,0,0,arm,true);rohr(arm,[0,1.1,0],[6.2,.15,0],.06,METALL);cyl(.1,1.2,METALL,0,.6,0,arm);box(3.2,.4,.5,WEISS,-1.6,0,0,arm);box(1.2,1,1.2,DUNKEL,-3.3,0,0,arm);
  const k=grp(7.1,-.3,0,arm);sph(1.05,0x3b8fd4,0,0,0,k,1.25,.95,1).castShadow=true;ring(1.08,.1,WEISS,0,0,0,k,0,20).rotation.x=Math.PI/2;[-.5,.5].forEach(x=>{sph(.34,0x9fe0ff,x,.25,.86,k,1,1,.45);sph(.34,0x9fe0ff,x,.25,-.86,k,1,1,.45)});const kp=grp(1.05,.15,0,k);sph(.3,HAUT[0],0,0,0,kp);licht(.09,0x9fe0ff,.3,.1,0,kp);licht(.14,ROT,0,1,0,k);
  vm(arm);leben(arm,t=>{arm.rotation.y=t*.85},0);
  for(let i=0;i<20;i++){const a=i/20*6.283,x=Math.cos(a)*9.3,z=cz+Math.sin(a)*9.3;cyl(.08,1.1,WEISS,x,.55,z,g);if(i%4===0)licht(.18,GELB,x,1.25,z,g)}wandZaun(c,0,cz,9.3);c.K(0,cz,1.7);
  /* Steuerpult außerhalb */
  pult(g,-6,7.6,-.3,0xffd890);c.S(-6,7.6,2,1.1,-.3);steh(-6.5,9.2,Math.PI-.3,3,1.15,g,...c.W(-6.5,9.2));steh(6,8,3.5,5,1,g,...c.W(6,8));bank(g,10.4,4.6,-1.8,BLAU);c.S(10.4,4.6,.9,2.3,-.23);
  lampe(...c.W(-10.6,4),3);lampe(...c.W(3.6,9.4),3)},{platz:0,ende:9.5})}
/* niedriges Geländer rund um etwas Bewegtes (ganz geschlossen) */
function wandZaun(c,cx,cz,r){const n=36;let pa=null;for(let i=0;i<=n;i++){const a=i/n*6.2832,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(pa){c.L(pa[0],pa[1],x,z);rohr(c.g,[pa[0],.85,pa[1]],[x,.85,z],.06,ORANGE)}pa=[x,z]}}
/* ==================== Orte: Steuern, Forschen, Technik ==================== */
function ort17(){O('Kontrollzentrum',(c,g)=>{
  box(19,.14,13,0x7684a8,0,.08,-3,g).receiveShadow=true;box(19,4.2,.5,0x3a4a78,0,2.1,-9.6,g,true);box(19.2,.35,.6,ORANGE,0,4.35,-9.6,g);c.S(0,-9.6,19.4,.7);
  /* große Bildschirmwand: Erde, Mond, Umlaufbahn */
  box(11.4,3.2,.14,METALL,0,2.5,-9.32,g);lbox(11,2.9,.1,0x0c1838,0,2.5,-9.26,g);licht(.9,0x2a78e0,-2.6,2.5,-9.16,g,1,1,.15);licht(.3,0x58c070,-2.9,2.7,-9.04,g,1.2,.8,.2);licht(.22,0x58c070,-2.3,2.2,-9.04,g,1,1,.2);licht(.36,0xd8dae4,2.8,3,-9.16,g,1,1,.15);for(let i=0;i<30;i++){const a=i/30*6.283;licht(.04,0x7ff2ff,-2.6+Math.cos(a)*2.3,2.5+Math.sin(a)*1.05,-9.15,g)}
  const sat=grp(0,2.5,-9.05,g);licht(.13,GELB,0,0,0,sat);lbox(.5,.08,.03,0xffffff,0,0,0,sat);leben(sat,t=>{sat.position.set(-2.6+Math.cos(t*.7)*2.3,2.5+Math.sin(t*.7)*1.05,-9.05)},0);
  [-1,1].forEach(s=>{const x=s*7.6;box(3,2.2,.14,METALL,x,2.5,-9.32,g);lbox(2.7,1.9,.1,0x102848,x,2.5,-9.26,g);for(let i=0;i<5;i++){const h=.3+((i*7+s*3+9)%5)*.25;lbox(.28,h,.03,[0x7ff2c0,GELB,0x7ff2ff,ORANGE,0xf07aa8][i],x-.9+i*.45,1.75+h/2,-9.19,g)}});
  /* Pultreihen mit Stühlen und Menschen */
  [[-6.2,-5.6],[-2.2,-5.9],[2.2,-5.9],[6.2,-5.6],[-6.4,-1.8],[6.4,-1.8]].forEach((p,i)=>{pult(g,p[0],p[1],0,[HELLGRAU,0xbfe4ff][i%2]);if(i!==2){hocker(g,p[0],p[1]+1.1,DUNKEL);const m=astro(g,i+2,.95);m.g.position.set(p[0],.05,p[1]+1.15);m.g.rotation.y=Math.PI;m.bl.rotation.x=m.br.rotation.x=-1.35}c.S(p[0],p[1]+.55,2,2)});
  winker(2.4,-3.8,.3,1,g);c.K(2.4,-3.8,.55);
  [-9.2,9.2].forEach((x,i)=>{box(.9,2.6,1.4,DUNKEL,x,1.3,-7.4,g,true);for(let k=0;k<8;k++)licht(.07,[0x7ff2c0,GELB,ROT,0x7ff2ff][(k+i)%4],x+(i?-.48:.48),.5+k*.27,-7.4+((k*3)%5-2)*.22,g);c.S(x,-7.4,1.1,1.6);const p=c.W(x,-7.4);blink(p[0],2.85,p[1],i?GELB:0x7ff2c0,.2,null,3+i)});
  const s=grp(-6.6,4.35,-9.6,g);schuessel(s,0,0,1.4,1.2,.5);const s2=grp(6.8,4.35,-9.6,g);cyl(.1,3,METALL,0,1.5,0,s2);[1,1.8,2.6].forEach((y,i)=>box(1.4-i*.35,.08,.08,METALL,0,y,0,s2));licht(.18,ROT,0,3.1,0,s2);
  lampe(...c.W(-10.4,3.4),3.4);lampe(...c.W(10.4,3.4),3.4);rueckseite(g,19,-9.87,ORANGE,4.1);c.wand=[-10.9,-8.5]},{platz:0})}
function ort18(){O('Mondlabor',(c,g)=>{
  halle(c,17,7,-4.8,0xe6f4fa,TUERKIS,3.5);
  const bank_=(x,z,w)=>{box(w,1.1,1.3,WEISS,x,.65,z,g,true);box(w+.2,.14,1.5,TUERKIS,x,1.28,z,g);c.S(x,z,w+.3,1.6)};
  bank_(-4.2,-6.8,6);bank_(4.2,-6.8,6);
  const kolben=(x,z,f)=>{sph(.28,f,x,1.6,z,g);cyl(.08,.5,0xdff4ff,x,1.98,z,g);cyl(.11,.06,DUNKEL,x,2.24,z,g)};kolben(-6.4,-6.8,0x4ac8f0);kolben(-5.5,-6.6,0xf07aa8);kolben(-4.6,-6.9,GELB);
  for(let i=0;i<6;i++){cyl(.07,.55,[ROT,BLAU,GELB,TUERKIS,LILA,ORANGE][i],-3.6+i*.28,1.65,-6.5,g)}box(1.9,.1,.4,METALL,-2.9,1.55,-6.5,g);
  /* Mikroskop */
  const m=grp(2.2,1.36,-6.7,g);box(.6,.12,.8,DUNKEL,0,.06,0,m);box(.14,.8,.16,WEISS,0,.5,-.25,m);const t=cyl(.14,.65,WEISS,0,.88,.02,m,true);t.rotation.x=.45;cyl(.09,.2,DUNKEL,0,1.2,.18,m).rotation.x=.45;cyl(.07,.26,METALL,0,.52,-.1,m).rotation.x=.45;box(.46,.05,.4,METALL,0,.38,.05,m);
  /* Gesteinsprobe unter Glasglocke */
  cyl(.55,.12,DUNKEL,5.4,1.4,-6.8,g);felsK(5.4,-6.8,.28,g,0x5a5e6a).position.y=1.65;glasK(.55,.75,5.4,1.46,-6.8,g);
  /* Zentrifuge */
  const z=grp(-5.2,0,-1.8,g);cyl(1,.9,BLAU,0,.45,0,z,true);cyl(1.08,.16,WEISS,0,.95,0,z);const zr=grp(0,1.2,0,z);cyl(.16,.35,DUNKEL,0,0,0,zr);[0,1.57,3.14,4.71].forEach((a,i)=>{const q=grp(0,0,0,zr);q.rotation.y=a;box(.7,.08,.1,METALL,.4,0,0,q);const v=cyl(.12,.42,[ROT,GELB,TUERKIS,LILA][i],.78,-.06,0,q);v.rotation.z=1.1});vm(zr);leben(zr,u=>{zr.rotation.y=u*7},0);glasK(1,.7,0,1.0,0,z);c.K(-5.2,-1.8,1.15);
  pult(g,5.2,-2.2,-.4,0xbfe4ff);c.S(5.2,-2.2,2,1.1,-.4);
  /* Tafel mit Atom-Modell, das sich dreht */
  const at=grp(0,2.9,-7.4,g);sph(.3,ORANGE,0,0,0,at);[0,1.05,2.1].forEach(a=>{const r=ring(.95,.03,0x7a88a8,0,0,0,at,0,20);r.rotation.set(1.2,a,0);sph(.1,BLAU,Math.cos(a*2)*.95,Math.sin(a*2)*.35,Math.sin(a*2)*.87,at)});vm(at);leben(at,u=>{at.rotation.y=u*.9});
  const f=steh(-2.2,-5.3,Math.PI+.2,0,1.15,g,...c.W(-2.2,-5.3));steh(3.6,-4.8,2.7,6,1.15,g,...c.W(3.6,-4.8));
  [0,1].forEach(i=>fass(g,7.4,-1.4+i*1.2,[ORANGE,TUERKIS][i],.75));c.S(7.4,-.8,1,2.2);lampe(...c.W(-9.4,3.6),3,0x9ff4ff);lampe(...c.W(9.4,3.6),3,0x9ff4ff);laborVorn(c)})}
function ort12(){O('Luftstation',(c,g)=>{
  scheibeW(10.5,.05,0xb4c4cc,0,.03,-1.5,g);
  /* Kugeltanks für Sauerstoff */
  [[-6.4,-5.4,2.1,0x9ad8f8],[0,-7.4,2.4,WEISS],[6.4,-5.4,2.1,0x9ad8f8]].forEach(p=>{[0,1.57,3.14,4.71].forEach(a=>rohr(g,[p[0]+Math.cos(a)*p[2]*.9,0,p[1]+Math.sin(a)*p[2]*.9],[p[0]+Math.cos(a)*p[2]*.7,p[2]*1.2,p[1]+Math.sin(a)*p[2]*.7],.14,METALL));sph(p[2],p[3],p[0],p[2]+.7,p[1],g).castShadow=true;liegend(ring(p[2]+.03,.13,BLAU,p[0],p[2]+.7,p[1],g,0,24));cyl(.2,.7,METALL,p[0],p[2]*2+.8,p[1],g);sph(.22,ORANGE,p[0],p[2]*2+1.2,p[1],g);c.K(p[0],p[1],p[2]+.25)});
  rohr(g,[-4.4,2.6,-6],[-2.2,3,-7],.2,BLAU);rohr(g,[4.4,2.6,-6],[2.2,3,-7],.2,BLAU);
  /* Ventilatoren mit drehenden Flügeln */
  [[-5.2,-.6,.45],[5.2,-.6,-.45]].forEach((p,i)=>{const v=grp(p[0],0,p[1],g);v.rotation.y=p[2];box(2.8,2.8,1,HELLGRAU,0,1.6,0,v,true);box(3,.3,1.2,DUNKEL,0,.15,0,v);cyl(1.15,.1,0x2a3248,0,1.65,.5,v).rotation.x=Math.PI/2;ring(1.18,.1,ORANGE,0,1.65,.6,v,0,22);const r=grp(0,1.65,.62,v);for(let k=0;k<4;k++){const q=grp(0,0,0,r);q.rotation.z=k*1.571;box(.9,.34,.05,WEISS,.55,0,0,q).rotation.x=.4}sph(.2,BLAU,0,0,.03,r);vm(r);leben(r,t=>{r.rotation.z=t*(i?-5:5)},0);c.S(p[0],p[1],3,1.3,p[2])});
  /* Druckanzeigen mit Zeigern */
  box(3.6,1.8,.4,BLAU,0,1.3,-3.6,g,true);[-1.2,0,1.2].forEach((x,i)=>{cyl(.5,.12,WEISS,x,1.5,-3.36,g).rotation.x=Math.PI/2;ring(.5,.06,DUNKEL,x,1.5,-3.3,g,0,14);const z=grp(x,1.5,-3.24,g);box(.07,.4,.04,ROT,0,.18,0,z);sph(.07,DUNKEL,0,0,0,z);vm(z);leben(z,t=>{z.rotation.z=Math.sin(t*.9+i*2)*1.1})});c.S(0,-3.6,3.8,.6);
  steh(-1.8,-2,.3,4,1.15,g,...c.W(-1.8,-2));[[-7.6,2.6],[-6.5,3],[7.2,2.8]].forEach(p=>{cyl(.4,1.4,0x7ac8f0,p[0],.7,p[1],g,true);sph(.4,0x7ac8f0,p[0],1.4,p[1],g,1,.6,1);cyl(.12,.24,METALL,p[0],1.7,p[1],g);c.K(p[0],p[1],.45)});
  lampe(...c.W(-9,5),3,0x9ff4ff);lampe(...c.W(9,5),3,0x9ff4ff)},{platz:0})}
function ort14(){O('Batteriehaus',(c,g)=>{
  scheibeW(10.5,.05,0xc8c4b8,0,.03,-1.5,g);
  const h=grp(0,0,-7.2,g);box(13,.3,4,0x7a8296,0,.15,0,h);box(13,3.6,.4,0xfff0c0,0,1.95,-1.8,h,true);[-1,1].forEach(s=>box(.4,3.6,4,0xfff0c0,s*6.3,1.95,0,h,true));tonnendach(13.2,1,4,ORANGE,0,3.75,-.4,h).scale.z=1.6;[-6.3,-2.1,2.1,6.3].forEach(x=>cyl(.14,3.6,METALL,x,1.95,1.9,h));c.S(0,-8.9,13.2,.6);c.L(-6.4,-9,-6.4,-5.2);c.L(6.4,-9,6.4,-5.2);
  /* große Batteriezellen mit Ladeanzeige */
  [-4.7,-2.35,0,2.35,4.7].forEach((x,i)=>{cyl(.85,2.2,[0x3b8fd4,0x2fc0c0][i%2],x,1.4,-7.6,g,true);cyl(.88,.2,WEISS,x,2.55,-7.6,g);cyl(.3,.3,METALL,x,2.8,-7.6,g);box(.34,.08,.05,WEISS,x,2.15,-6.74,g);box(.08,.34,.05,WEISS,x,2.15,-6.74,g);box(.42,1.2,.1,DUNKEL,x,1.15,-6.76,g);
    for(let k=0;k<4;k++){const s=grp(x,.74+k*.28,-6.68,g);lbox(.3,.2,.04,k<1?ROT:k<2?GELB:0x7ff2c0,0,0,0,s);leben(s,t=>{const f=((t*.35+i*.2)%1)*5;s.visible=true;s.scale.setScalar(k<f?1:.15)},0)}c.K(x,-7.6,.95)});
  /* Blitz-Zeichen, Kabeltrommeln, Ladesäulen */
  const bl=grp(0,5.3,-7.2,g);box(.9,.34,.18,GELB,.14,.5,0,bl).rotation.z=1.05;box(.9,.34,.18,GELB,0,0,0,bl).rotation.z=-.35;box(.9,.34,.18,GELB,-.14,-.5,0,bl).rotation.z=1.05;
  [[-6.6,-1.4],[6.2,.2]].forEach((p,i)=>{const t=grp(p[0],0,p[1],g);t.rotation.y=i?-.5:.4;[-.5,.5].forEach(x=>cyl(.9,.14,0xc8924a,x,.9,0,t,true).rotation.z=Math.PI/2);cyl(.55,.9,DUNKEL,0,.9,0,t).rotation.z=Math.PI/2;c.K(p[0],p[1],1)});
  [[-3.6,.4],[3.6,-1.4]].forEach(p=>{box(.7,1.7,.5,WEISS,p[0],.85,p[1],g,true);lbox(.4,.4,.04,0x7ff2c0,p[0],1.35,p[1]+.27,g);ring(.4,.06,DUNKEL,p[0]+.5,.9,p[1],g,0,14);c.K(p[0],p[1],.6)});
  [[-4.7,-5],[0,-5],[4.7,-5]].forEach(p=>box(.18,.1,3,DUNKEL,p[0],.12,p[1]+.8,g));steh(1.4,-3.6,-.3,3,1.2,g,...c.W(1.4,-3.6));
  lampe(...c.W(-9,4.4),3);lampe(...c.W(9,4.4),3);rueckseite(g,13,-9.25,ORANGE,3.6);batterieVorn(c);c.wand=[-10,-6.5]},{platz:0})}
function ort15(){O('Recyclingstation',(c,g)=>{
  scheibeW(11.4,.05,0xc4ccc0,0,.03,-1.5,g);
  /* vier Sammelbehälter in verschiedenen Farben mit Inhalt */
  [[-7.6,GELB],[-4.6,BLAU],[4.6,ORANGE],[7.6,WEISS]].forEach((p,i)=>{const x=p[0],z=-6.4+(Math.abs(x)>5?1.4:0);box(2.5,2,2,p[1],x,1.05,z,g,true);box(2.7,.2,2.2,DUNKEL,x,2.1,z,g);box(2.7,.7,.16,dk(p[1],.8),x,2.7,z-1.1,g).rotation.x=-.4;box(1,.7,.05,0xffffff,x,1.1,z+1.02,g);
    if(i===0)for(let k=0;k<5;k++)box(.45,.35,.45,[GELB,0xfff0a0][k%2],x-.7+k*.35,2.35+(k%2)*.16,z+(k%3)*.3-.3,g).rotation.y=k;else if(i===1)for(let k=0;k<5;k++)cyl(.18,.5,[METALL,0x9ac8f0][k%2],x-.7+k*.36,2.38,z+(k%3)*.3-.3,g).rotation.z=1+k*.4;else if(i===2)for(let k=0;k<4;k++)ring(.28,.09,METALL,x-.6+k*.4,2.32,z+(k%2)*.4-.2,g,0,10).rotation.x=1.2;else for(let k=0;k<4;k++)box(.6,.08,.75,0xf0e8d8,x-.2+k*.1,2.28+k*.1,z,g).rotation.y=k*.5;c.S(x,z,2.8,2.4)});
  /* Sortierband mit wandernden Teilen, Presse */
  box(7.4,.7,1.5,DUNKEL,0,.5,-3,g,true);for(let i=0;i<8;i++)cyl(.15,1.6,METALL,-3.2+i*.92,.86,-3,g).rotation.x=Math.PI/2;c.S(0,-3,7.6,1.7);
  for(let i=0;i<6;i++){const e=grp(0,1.28,-3,g);if(i%3===0)box(.55,.45,.55,GELB,0,0,0,e);else if(i%3===1)cyl(.22,.55,BLAU,0,0,0,e);else sph(.3,ORANGE,0,0,0,e,1,.8,1);vm(e);leben(e,t=>{const u=(t*.12+i/6)%1;e.position.x=-3.4+u*6.8;e.rotation.y=u*2+i},0)}
  const pr=grp(0,0,-8,g);box(3.6,.5,2.4,TUERKIS,0,.25,0,pr);[-1.6,1.6].forEach(x=>box(.4,3.8,.5,TUERKIS,x,2.1,0,pr,true));box(3.8,.5,.8,TUERKIS,0,4.1,0,pr);const st=grp(0,2.4,0,pr);cyl(.22,1.6,METALL,0,.8,0,st);box(2.6,.5,1.8,ORANGE,0,0,0,st);vm(st);leben(st,t=>{st.position.y=1.5+Math.abs(Math.sin(t*1.2))*1.4},0);box(1.2,.8,1.2,METALL,0,.9,0,pr);c.S(0,-8,3.8,2.6);
  greifarm(g,5.6,-1.2,ORANGE,1.1,2);c.K(5.6,-1.2,.8);
  /* Ballen, Sackkarre, Mitarbeiter */
  [[-7.4,-1.6],[-7.2,0],[-7.3,-.8,1]].forEach(p=>{box(1.4,1,1.3,METALL,p[0],.5+(p[2]?1:0),p[1],g,true);[-.35,.35].forEach(q=>box(.1,1.04,1.34,DUNKEL,p[0]+q,.5+(p[2]?1:0),p[1],g))});c.S(-7.3,-.8,1.7,3);
  steh(-2.6,-.8,.1,5,1.2,g,...c.W(-2.6,-.8));winker(3,-.6,-.5,4,g);c.K(3,-.6,.55);lampe(...c.W(-9.4,4.6),3);lampe(...c.W(9.2,4.2),3)},{platz:0})}
function ort19(){O('Spiegelteleskop-Feld',(c,g)=>{
  scheibeW(11.6,.05,0x9298ac,0,.03,-1.5,g);
  /* drei offene Teleskope mit Spiegel auf Drehgabel */
  const tele=(x,z,r,f,ph)=>{cyl(r*.9,.5,DUNKEL,x,.25,z,g,true);cyl(r*.45,1,METALL,x,.9,z,g,true);const d=grp(x,1.4,z,g);box(r*2.5,.3,.7,f,0,0,0,d,true);[-1,1].forEach(s=>box(.24,r*1.8,.5,f,s*r*1.15,r*.85,0,d,true));const k=grp(0,r*1.5,0,d);k.rotation.x=.55;
      cyl(r,.45,f,0,-r*.9,0,k,true);cyl(r*.88,.12,0xdceeff,0,-r*.9+.25,0,k);sph(r*.3,0xffffff,-r*.35,-r*.9+.31,r*.2,k,1,.1,.7);[0,1.57,3.14,4.71].forEach(a=>rohr(k,[Math.cos(a)*r*.9,-r*.8,Math.sin(a)*r*.9],[Math.cos(a)*r*.75,r*.95,Math.sin(a)*r*.75],.07,METALL));liegend(ring(r*.78,.1,f,0,r*.95,0,k,0,20));cyl(r*.2,.25,DUNKEL,0,r*.95,0,k);[0,2.09,4.19].forEach(a=>rohr(k,[Math.cos(a)*r*.75,r*.95,Math.sin(a)*r*.75],[0,r*.95,0],.03,METALL));[-1,1].forEach(s=>cyl(.22,.4,DUNKEL,s*r*1.05,0,0,k).rotation.z=Math.PI/2);
      vm(k);vm(d);leben(d,t=>{d.rotation.y=Math.sin(t*.16+ph)*.9;k.rotation.x=.55+Math.sin(t*.23+ph)*.25},0);c.K(x,z,r*1.45)};
  tele(-6.8,-3.4,1.5,WEISS,0);tele(.4,-7.2,2.1,0x9ac8f4,2);tele(7,-3,1.4,0xffd890,4);
  /* großer Sechseck-Spiegel (Muster) auf einem Gestell, Steuerhaus */
  const s=grp(-6.4,0,3,g);s.rotation.y=.6;[-.9,.9].forEach(x=>box(.2,1.6,.6,METALL,x,.8,0,s,true));const p=grp(0,2.2,0,s);p.rotation.x=-.25;const hx=gK('hex',()=>{const q=new THREE.CylinderGeometry(1,1,1,6);q.rotateX(Math.PI/2);return q});[[0,0],[.78,.45],[-.78,.45],[.78,-.45],[-.78,-.45],[0,.9],[0,-.9]].forEach(q=>{teilG(hx,GOLD,q[0],q[1],0,.5,.5,.14,p,true);teilG(hx,0xffe48a,q[0],q[1],.09,.4,.4,.04,p)});c.K(-6.4,3,1.5);
  const h=grp(6.6,0,3.2,g);h.rotation.y=-.7;box(2.8,2,2,WEISS,0,1.1,0,h,true);box(3,.22,2.2,BLAU,0,2.2,0,h);bullauge(h,-.65,1.2,1.02,.4,0xffe9a8);luke(h,.65,1.02,BLAU,.7);c.S(6.6,3.2,3,2.2,-.7);
  steh(-2.6,-4,-.5,2,1.2,g,...c.W(-2.6,-4));teleskopVorn(c);steh(3.6,-2.4,.8,7,.95,g,...c.W(3.6,-2.4));lampe(...c.W(-10,-7),2.4,0xd8c0ff);lampe(...c.W(10,-7),2.4,0xd8c0ff)},{platz:0})}
function ort20(){O('Funkschüsseln',(c,g)=>{
  scheibeW(11.6,.05,0x9aa2b4,0,.03,-1.5,g);
  [[-7.2,-3,1.65,2.5,.21],[0,-7.4,1.95,3.1,.15],[7.2,-3,1.6,2.4,.27],[-6.6,4,1,1.5,.4],[6.8,3.8,1.15,1.7,.33]].forEach((p,i)=>{schuessel(g,p[0],p[1],p[2],p[3],p[4],i%2?0xffe0b0:WEISS);c.K(p[0],p[1],p[2]*.45+.2)});
  /* Funkwellen: dünne Bögen, die nach oben laufen und größer werden */
  const wg_=()=>gK('welle',()=>{const q=new THREE.TorusGeometry(1,.028,4,12,1.7);q.rotateZ(Math.PI/2-.85);const n=q.attributes.position.count,a=new Float32Array(n*3),f=new THREE.Color(0x8ff0ff);for(let i=0;i<n;i++){a[i*3]=f.r;a[i*3+1]=f.g;a[i*3+2]=f.b}q.setAttribute('color',new THREE.BufferAttribute(a,3));return q});
  [[0,4.6,-7.4,0],[-7.2,3.5,-3,1]].forEach(p=>{[0,1,2].forEach(k=>{const w=grp(p[0],p[1],p[2],g);w.add(new THREE.Mesh(wg_(),LM));leben(w,t=>{const u=(t*.5+k/3+p[3]*.2)%1;w.scale.setScalar(.35+u*1.15);w.position.y=p[1]+u*1.5;w.visible=u<.9},0)})});
  /* Funkpult mit Kopfhörer */
  pult(g,-1.8,-2.2,.2,0xbfe4ff);c.S(-1.8,-2.2,2,1.1,.2);const m=steh(-1.8,-.9,Math.PI+.2,1,1.15,g,...c.W(-1.8,-.9));
  box(1.8,1.3,1,ORANGE,3.2,.65,-2.2,g,true);for(let i=0;i<6;i++)licht(.07,[0x7ff2c0,GELB,0x7ff2ff][i%3],2.55+i*.26,1,-1.68,g);box(1.4,.2,.05,DUNKEL,3.2,.5,-1.68,g);c.S(3.2,-2.2,1.9,1.1);
  [[-4.8,-5],[2.6,-5.6],[-4,1.4],[4.6,.8]].forEach(p=>box(.16,.08,3.6,DUNKEL,p[0],.1,p[1],g).rotation.y=p[0]*.2);steh(2.4,.6,-.6,4,1.2,g,...c.W(2.4,.6));
  lampe(...c.W(-10.6,.8),2.8);lampe(...c.W(10.6,.8),2.8)},{platz:0})}
function ort21(){O('Roboterwerkstatt',(c,g)=>{
  halle(c,17,7,-5,0xffd9a0,0x5a6a9a,3.6);
  /* Werkbank, Werkzeugwand, halb fertiger Roboter */
  box(6,1.1,1.4,0x5a6a9a,-4,.65,-6.9,g,true);box(6.2,.14,1.6,0xc8944a,-4,1.28,-6.9,g);c.S(-4,-6.9,6.3,1.7);
  [[-6.2,2.7],[-5,2.9],[-3.8,2.6],[-2.6,2.8]].forEach((p,i)=>{if(i%2){box(.14,.9,.08,METALL,p[0],p[1],-8.2,g);ring(.18,.07,METALL,p[0],p[1]+.55,-8.2,g,4.7,10)}else{box(.12,.8,.08,ORANGE,p[0],p[1]-.1,-8.2,g);box(.55,.24,.14,DUNKEL,p[0],p[1]+.4,-8.2,g)}});
  const hb=grp(-5.2,1.35,-6.8,g);sph(.45,WEISS,0,.45,0,hb,1,1,.9);box(.7,.5,.55,0xffd23e,0,1.15,0,hb);[-.14,.14].forEach(x=>licht(.08,0x7ff2ff,x,1.18,.29,hb));cyl(.06,.5,METALL,-.55,.4,0,hb).rotation.z=.8;
  [[-3.4,TUERKIS],[-2.5,ROT],[-1.8,METALL]].forEach(p=>{sph(.22,p[1],p[0],1.55,-6.8,g)});cyl(.05,.5,METALL,-3.4,1.9,-6.8,g);
  /* Zahnräder an der Wand */
  [[3.4,2.4,1,.8,GOLD],[5.1,2.9,.7,-1.15,METALL],[5.2,1.6,.55,1.5,ORANGE]].forEach(p=>{const z=grp(p[0],p[1],-8.1,g);cyl(p[2]*.8,.18,p[4],0,0,0,z).rotation.x=Math.PI/2;for(let i=0;i<8;i++){const q=grp(0,0,0,z);q.rotation.z=i*.785;box(p[2]*.28,p[2]*.3,.18,p[4],0,p[2]*.9,0,q)}sph(p[2]*.22,DUNKEL,0,0,.1,z);vm(z);leben(z,t=>{z.rotation.z=t*p[3]},0)});
  greifarm(g,5.2,-5.2,ORANGE,1.25,0);c.K(5.2,-5.2,.9);greifarm(g,2.4,-5.6,TUERKIS,.9,3);c.K(2.4,-5.6,.65);
  /* Roboterteile in Kisten, Ladestation mit wartendem Roboter */
  [[-7.4,-2],[7.3,-1.6]].forEach((p,i)=>{kiste(g,p[0],p[1],i?BLAU:ORANGE,.3);for(let k=0;k<3;k++)sph(.18,[METALL,GELB,ROT][k],p[0]-.35+k*.35,1.12,p[1],g);c.K(p[0],p[1],.9)});
  const l=grp(-6.4,0,1.4,g);cyl(.9,.2,DUNKEL,0,.1,0,l);const lr=picoBau(l,0xf4f6fa,LILA);lr.g.scale.setScalar(.75);l.rotation.y=.8;(function(){const p=c.W(-6.4,.3);blink(p[0],2.05,p[1],0x7ff2c0,.18,null,2)})();box(.3,2,.2,METALL,-6.4,1,.3,g);c.K(-6.4,1.2,1);
  steh(-1.2,-5.4,Math.PI-.6,3,1.2,g,...c.W(-1.2,-5.4));
  [0,1,2].forEach(i=>{const B=bahn([[-4+i*.7,-3.6+i],[3.8-i*.6,-3+i],[3-i*.4,-.2+i*.9],[-3.6+i*.8,-.6+i*.8]].map(p=>c.W(p[0],p[1])));const h=helfer(B,1.4+i*.3,i*7,i+1);h.scale.setScalar(.8)});
  lampe(...c.W(-9.4,3.8),3);lampe(...c.W(9.4,3.8),3)},{road:-58})}
function ort22(){O('Gesteinssammlung',(c,g)=>{
  scheibeW(10.6,.07,0xd4ccc0,0,.04,-1.5,g);
  /* Regalwand mit Proben */
  box(13,3.4,.3,0x6a5a8a,0,1.8,-8.6,g,true);box(13.4,.3,.9,ORANGE,0,3.6,-8.4,g);c.S(0,-8.5,13.4,.9);
  [.9,1.9,2.8].forEach((y,j)=>{box(12.6,.1,.8,WEISS,0,y,-8.1,g);for(let i=0;i<12;i++){const x=-5.7+i*1.04,f=[0x5a5e68,0xd8dae0,0x8a8890,0x3a3c48,0xa89888,0xd8a050][(i+j*2)%6];felsK(x,-8.05,.2+((i+j)%3)*.05,g,f).position.y=y+.26;box(.4,.1,.04,0xfff4d0,x,y-.0,-7.68,g)}});
  /* Sockel mit großen Steinen unter Glas */
  [[-6,-4.2,0x4a4c58,.75],[-2.2,-5,0xe4e4ec,.65],[2.2,-5,0xd89a4a,.55],[6,-4.2,0x8a8690,.8]].forEach((p,i)=>{cyl(.8,.9,[TUERKIS,BLAU,LILA,ORANGE][i],p[0],.45,p[1],g,true);cyl(.95,.14,WEISS,p[0],.96,p[1],g);felsK(p[0],p[1],p[3]*.62,g,p[2]).position.y=1.45;if(i===2)for(let k=0;k<7;k++){const a=k*.9;licht(.08,0xffb040,p[0]+Math.cos(a)*.4,1.45+Math.sin(k*2)*.3,p[1]+Math.sin(a)*.4,g)}glasB(1.5,1.5,1.5,p[0],1.78,p[1],g);c.K(p[0],p[1],1.05)});
  /* Sortiertisch mit Lupe, Waage, Werkzeug */
  tisch(g,-5.4,.8,3,1.5,0xc8a878);[0,1,2,3].forEach(i=>felsK(-6.4+i*.5,.8+(i%2)*.3-.15,.15,g,FELSF[i]).position.y=1.2);ring(.38,.07,DUNKEL,-4.4,1.65,.8,g,0,14);glasK(.34,.12,-4.4,1.65,.8,g).rotation.x=1.5708;rohr(g,[-4.4,1.28,.8],[-4.2,1.1,1.25],.05,0x8a5a32);c.S(-5.4,.8,3.2,1.7);
  const w=grp(5.4,0,.6,g);box(1.2,1,1,WEISS,0,.5,0,w,true);lbox(.7,.25,.04,0x7ff2c0,0,.7,.52,w);cyl(.55,.08,METALL,0,1.08,0,w);felsK(0,0,.24,w,0x6a6e78).position.y=1.35;c.K(5.4,.6,.8);
  steh(-3.4,-1.4,.5,7,1.2,g,...c.W(-3.4,-1.4));winker(3.4,-2.2,-.4,2,g);c.K(3.4,-2.2,.55);lampe(...c.W(-9,4.2),3);lampe(...c.W(9,4.2),3);rueckseite(g,13,-8.8,LILA,3.4);gesteinVorn(c);c.wand=[-9.5,-7.5]},{platz:0,road:-58})}
function gittermast(g,x,z,w,w2,h,farbe){const n=Math.round(h/2.2);[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(p=>rohr(g,[x+p[0]*w,0,z+p[1]*w],[x+p[0]*w2,h,z+p[1]*w2],.11,farbe));
  for(let i=0;i<=n;i++){const t=i/n,q=w+(w2-w)*t,y=h*t;[[-1,1,1,1],[1,1,1,-1],[1,-1,-1,-1],[-1,-1,-1,1]].forEach(s=>{if(i)rohr(g,[x+s[0]*q,y,z+s[1]*q],[x+s[2]*q,y,z+s[3]*q],.06,farbe);if(i<n){const t2=(i+1)/n,q2=w+(w2-w)*t2;rohr(g,[x+s[0]*q,y,z+s[1]*q],[x+s[2]*q2,h*t2,z+s[3]*q2],.045,farbe)}})}}
function ort23(){O('Bohrturm',(c,g)=>{
  scheibeW(10.6,.05,0x9a948c,0,.03,-1.5,g);
  gittermast(g,0,-6,2.2,.7,10,ORANGE);box(2,.4,2,DUNKEL,0,10.2,-6,g,true);[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(p=>c.K(p[0]*2.2,-6+p[1]*2.2,.45));c.S(0,-6,3.6,3.6);const pb=c.W(0,-6);blink(pb[0],10.8,pb[1],ROT,.34,null,3);
  /* Bohrgestänge dreht sich und fährt auf und ab */
  const b=grp(0,3.6,-6,g);cyl(.22,6.5,METALL,0,1,0,b);for(let i=0;i<9;i++){const r=ring(.36,.09,DUNKEL,0,-2+i*.5,0,b,5,10);r.rotation.x=Math.PI/2;r.rotation.z=i*1.1}box(1.2,.9,1.2,BLAU,0,4.4,0,b);cone(.4,.8,DUNKEL,0,-2.5,0,b).rotation.x=Math.PI;vm(b);leben(b,t=>{b.position.y=3.4+Math.sin(t*.45)*.9;b.rotation.y=t*3},0);
  liegend(ring(1.5,.35,0x7a7480,0,.25,-6,g,0,18));
  /* Bohrkerne in Regalen, Staubhaufen, Steuerhütte */
  [[-6.4,-2.4,.3],[-6,.4,.1]].forEach((p,j)=>{const t=grp(p[0],0,p[1],g);t.rotation.y=p[2];tisch(t,0,0,3.4,1.5,0xc8a878);for(let k=0;k<4;k++)for(let i=0;i<5;i++)cyl(.14,.55,[0x6a6e78,0xa89888,0x4a4c58,0xd0d0d8,0x8a6a58][(i+k+j)%5],-1.3+i*.62,1.22,-.5+k*.33,t).rotation.z=Math.PI/2;c.S(p[0],p[1],3.6,1.7,p[2])});
  [[4.6,-7.4,1.4],[6.2,-5.6,1],[4.2,-4.6,.7]].forEach(p=>{cone(p[2]*1.3,p[2]*1.2,0x8a8690,p[0],p[2]*.6,p[1],g,true);c.K(p[0],p[1],p[2]*1.1)});
  const h=grp(6.4,0,-.4,g);h.rotation.y=-.9;box(2.8,2.2,2.2,WEISS,0,1.2,0,h,true);box(3,.22,2.4,ORANGE,0,2.4,0,h);bullauge(h,-.65,1.3,1.12,.42,0xffe9a8);luke(h,.65,1.12,ORANGE,.75);c.S(6.4,-.4,3,2.4,-.9);
  rohr(g,[1,.2,-5],[5.4,.2,-1.2],.14,DUNKEL);steh(-2.8,-2.6,.6,1,1.2,g,...c.W(-2.8,-2.6));steh(2.6,-2.2,-.6,4,1.2,g,...c.W(2.6,-2.2));lampe(...c.W(-9,4.2),3);lampe(...c.W(8.6,4.4),3)},{platz:0})}
function ort24(){O('Mondbeben-Messstation',(c,g)=>{
  scheibeW(9.6,.05,0xa8a4b4,0,.03,-1,g);
  /* Messgeräte: goldene Hauben mit Folienrock, Kabel zur Station */
  [[-6.2,-2.6],[-3.4,2.6],[5.8,2.2],[6.4,-3.2]].forEach((p,i)=>{cyl(1.15,.14,0xc89a30,p[0],.1,p[1],g);cyl(.8,.35,GOLD,p[0],.32,p[1],g,true);halbkugel(.75,.75,WEISS,p[0],.48,p[1],g);cyl(.06,.7,METALL,p[0],1.45,p[1],g);const q=c.W(p[0],p[1]);blink(q[0],1.85,q[1],i%2?ORANGE:0x7ff2c0,.17,null,2+i*.6);c.K(p[0],p[1],1);rohr(g,[p[0],.12,p[1]],[0,.12,-5.4],.07,DUNKEL);
    const w=grp(p[0],.2,p[1],g),r=ring(1,.045,0xf8d870,0,0,0,w,0,22);r.rotation.x=Math.PI/2;leben(w,t=>{const u=(t*.4+i*.27)%1;w.scale.set(1+u*1.6,1,1+u*1.6);w.visible=u<.8},0)});
  /* Station mit großer Schreibtrommel */
  const s=grp(0,0,-6.4,g);box(7,.2,3,0x6a7494,0,.12,0,s);box(7,2.8,.3,0xd8ccf0,0,1.5,-1.4,s,true);tonnendach(7.2,.6,2,LILA,0,2.9,-.8,s);[-3.4,3.4].forEach(x=>cyl(.14,2.9,METALL,x,1.45,.1,s));c.S(0,-7.6,7.2,1);
  [-1.7,1.7].forEach(x=>box(.3,1.6,.6,DUNKEL,x,.8,0,s,true));const tr=grp(0,1.55,0,s);cyl(.62,3,0xfff8e8,0,0,0,tr,true).rotation.z=Math.PI/2;for(let k=0;k<3;k++){const a=k*2.09;for(let i=0;i<14;i++){const x=-1.35+i*.2,h=(i>5&&i<10)?.34:.08,an=a+(i%2?h:-h)*.8;box(.17,.045,.045,0x24346c,x,Math.cos(an)*.64,Math.sin(an)*.64,tr)}}[-1.55,1.55].forEach(x=>cyl(.72,.14,ORANGE,x,0,0,tr).rotation.z=Math.PI/2);vm(tr);leben(tr,t=>{tr.rotation.x=t*.8},0);rohr(s,[-.1,2.7,-.2],[0,2.2,.4],.05,METALL);sph(.12,ROT,0,2.18,.42,s);c.S(0,-6.4,3.8,1.6);
  /* Antenne und Forscherin, die ein Gerät aufstellt */
  cyl(.1,4,METALL,-5.6,2,-6.4,g,true);schuessel(g,5.6,-6.6,1,2.2,.5);c.K(-5.6,-6.4,.35);c.K(5.6,-6.6,.7);const p0=c.W(-5.6,-6.4);blink(p0[0],4.2,p0[1],ROT,.26,null,3);
  const f=steh(-3.2,-3,-.9,6,1.15,g,...c.W(-3.2,-3));f.al.rotation.x=f.ar.rotation.x=-1.1;box(.6,.4,.6,GOLD,-4.15,1,-2.35,g);steh(2.6,-3.4,-.3,0,1.2,g,...c.W(2.6,-3.4));lampe(...c.W(-8.2,4),2.8);lampe(...c.W(8.4,4.6),2.8);rueckseite(g,7,-8,LILA,2.8);c.wand=[-9,-6.2]},{platz:0})}
function ort25(){O('Rover-Garage',(c,g)=>{
  halle(c,19,8,-5,0xcfd8ec,ORANGE,4.2);
  [[-5.6,GELB],[0,WEISS],[5.6,0x8ad0f0]].forEach((p,i)=>{const r=roverBau(g,p[1]);r.position.set(p[0],.1,-5.6);r.rotation.y=-Math.PI/2;c.S(p[0],-5.6,2.4,3.8);
    [-1.7,1.7].forEach(q=>box(.14,.05,4.6,GELB,p[0]+q,.17,-5.4,g));box(.6,1.4,.4,DUNKEL,p[0]+2.1,.8,-8.2,g);lbox(.3,.3,.04,0x7ff2c0,p[0]+2.1,1.15,-7.98,g);rohr(g,[p[0]+2.1,.9,-8],[p[0]+.5,1,-7.3],.05,ORANGE);c.L(p[0]+2.1,-8,p[0]+.5,-7.3)});
  /* Reifenstapel, Werkzeugwagen, Mechanikerin */
  [[-8.2,-1.6,3],[8.4,-2,2]].forEach(p=>{for(let i=0;i<p[2];i++){liegend(ring(.48,.2,DUNKEL,p[0],.25+i*.38,p[1],g,0,16))}c.K(p[0],p[1],.75)});
  const w=grp(-7.2,0,1,g);w.rotation.y=.4;box(1.8,.9,.9,ROT,0,.75,0,w,true);[.55,.85].forEach(y=>box(1.82,.05,.05,WEISS,0,y,.46,w));[-.7,.7].forEach(x=>cyl(.22,.92,DUNKEL,x,.22,0,w).rotation.x=Math.PI/2);[-.4,0,.4].forEach((x,i)=>cyl(.06,.5,[METALL,ORANGE,BLAU][i],x,1.3,0,w).rotation.z=.9);c.S(-7.2,1,2,1.1,.4);
  const r=steh(-2.8,-4.2,-1.3,4,1.15,g,...c.W(-2.8,-4.2));box(.14,.7,.1,METALL,0,-.9,.16,r.ar);r.ar.rotation.x=-1.2;
  steh(3,-1.8,-.4,2,1.2,g,...c.W(3,-1.8));
  /* ein Rover fährt gerade vor der Garage hin und her */
  roverFahrt(pendel([c.W(-6,4.8),c.W(-2,5.6),c.W(2,4.8),c.W(7,5.6)],.6),2.2,3,ORANGE,.75);
  lampe(...c.W(-10.8,3.4),3.2);lampe(...c.W(10.8,3.4),3.2);garageVorn(c)},{ende:2,road:-58})}
function ort26(){O('Rover-Teststrecke',(c,g)=>{
  const cz=-1.2;
  /* ovale Strecke mit Randsteinen, Hügeln und Hütchen */
  const oval=(a,b,n)=>Array.from({length:n},(_,i)=>{const w=i/n*6.2832;return[Math.cos(w)*a,cz+Math.sin(w)*b]});
  weg(spl(oval(8.6,7,24).concat([[8.6,cz]]).map(p=>c.W(p[0],p[1])),2),3,0x8a8e9e,.02);
  oval(10.6,9,40).forEach((p,i)=>{if(p[1]>5.8&&Math.abs(p[0])<3.4)return;box(.8,.18,.5,i%2?ROT:WEISS,p[0],.12,p[1],g).rotation.y=-Math.atan2(Math.cos(i/40*6.2832)*9,-Math.sin(i/40*6.2832)*10.6)});
  oval(6.4,5,16).forEach(p=>{if(p[1]>2.6&&Math.abs(p[0])<2.6)return;kegelMast(g,p[0],p[1])});
  [[-2.2,-3.6,1.5],[.4,-.8,1.2],[2.6,-3,1.7]].forEach(p=>{sph(p[2],0x969cac,p[0],-.15,p[1],g,1.4,.45,1.1);c.K(p[0]-p[2]*.4,p[1],p[2]*1.02);c.K(p[0]+p[2]*.4,p[1],p[2]*1.02)});
  /* Rampe und Zielbogen mit Karomuster (kein Schild) */
  const bo=grp(-8.6,0,cz,g);[-2.1,2.1].forEach(x=>{cyl(.18,3.4,METALL,x,1.7,0,bo,true);c.K(-8.6+x,cz,.35)});for(let i=0;i<10;i++)for(let j=0;j<2;j++)box(.42,.36,.2,(i+j)%2?DUNKEL:WEISS,-1.9+i*.42,3.2+j*.36,0,bo);
  const B=bahn(spl(oval(8.6,7,24).concat([[8.6,cz]]).map(p=>c.W(p[0],p[1])),2));roverFahrt(B,4.2,0,GELB,.72);roverFahrt(B,4.2,B.L*.5,0x8ad0f0,.72);
  steh(-1.2,2,.2,5,1.15,g,...c.W(-1.2,2));winker(11.4,3.4,-1.2,1,g);c.K(11.4,3.4,.55);lampe(...c.W(-12,5),3);lampe(...c.W(11.8,-7),3);lampe(...c.W(-11.4,-7.6),3)},{platz:0,ende:5})}
/* große Rakete: Stufen, zwei Zusatzraketen, Fenster, Flossen; Fußpunkt bei y=0 */
function raketeBau(g,farbe){[-1,1].forEach(s=>{cyl(.75,8,WEISS,s*2.2,5,0,g,true);cone(.75,1.8,farbe,s*2.2,9.9,0,g);cyl(.55,.8,DUNKEL,s*2.2,.65,0,g);[3,6.5].forEach(y=>cyl(.78,.34,farbe,s*2.2,y,0,g));box(.7,.3,.5,METALL,s*1.4,7,0,g);box(.7,.3,.5,METALL,s*1.4,3,0,g)});
  cyl(1.55,10,WEISS,0,6.2,0,g,true);cyl(1.58,.7,farbe,0,3.2,0,g);cyl(1.58,.35,DUNKEL,0,11.2,0,g);cyl(1.2,3.4,WEISS,0,12.9,0,g,true);cyl(1.23,.5,farbe,0,13.4,0,g);
  const sp=gK('spitze',()=>new THREE.ConeGeometry(1,1,14));teilG(sp,farbe,0,16.2,0,1.2,3.2,1.2,g,true);cyl(.08,1.4,METALL,0,18.3,0,g);licht(.18,ROT,0,19,0,g);
  [7.6,9.2].forEach(y=>bullauge(g,0,y,1.53,.5,0x9fe0ff));bullauge(g,0,12.4,1.18,.36,0x9fe0ff);cyl(1,.9,DUNKEL,0,.75,0,g);[0,1.57,3.14,4.71].forEach(a=>{const f=grp(0,0,0,g);f.rotation.y=a+.785;box(.18,2.2,1.5,farbe,0,2,1.9,f,true).rotation.x=-.35})}
function ort30(){O('Startrampe mit großer Rakete',(c,g)=>{
  const cz=-4.4;scheibeW(8.8,.3,0x7a8296,0,.15,cz,g);liegend(ring(8.3,.18,ORANGE,0,.33,cz,g,0,44));scheibeW(4,.36,0x4a5064,0,.19,cz,g);
  const r=grp(0,.3,cz,g);raketeBau(r,ROT);c.K(0,cz,3.2);
  /* Startturm mit Brücke zur Kapsel */
  gittermast(g,-5.6,cz,1.1,1,15,ORANGE);c.S(-5.6,cz,2.6,2.6);box(3.8,.25,1.2,METALL,-2.9,12.4,cz,g,true);[-.55,.55].forEach(z=>rohr(g,[-4.7,13.3,cz+z],[-1.2,13.3,cz+z],.05,WEISS));box(2.4,.3,2.4,DUNKEL,-5.6,15.2,cz,g);const p=c.W(-5.6,cz);blink(p[0],15.9,p[1],ROT,.35,null,3);
  tank(c,6.8,-8.2,1.2,2.6,WEISS,ORANGE);tank(c,7.6,-4.4,.9,2,0x9ad8f8,WEISS);rohr(g,[5.8,1,-7.6],[2.6,1,cz-1],.2,METALL);c.L(5.8,-7.6,2.6,cz-1);
  /* Dampf unter der Rakete */
  for(let i=0;i<6;i++){const d=grp(0,.7,cz,g);sph(.55,0xf4f6ff,0,0,0,d,1,.8,1);const a=i*1.05;leben(d,t=>{const u=(t*.3+i/6)%1;d.position.set(Math.cos(a)*(2.8+u*3),.5+u*1.4,cz+Math.sin(a)*(2.8+u*3));d.scale.setScalar((1-u)*1.1+.05)},0)}
  /* Absperrung vorn */
  for(let x=-8;x<=8;x+=2){if(Math.abs(x)<1)continue}[-1,1].forEach(s=>{for(let i=0;i<4;i++){const x=s*(2.4+i*1.5),z=cz+9.6-i*.55;kegelMast(g,x,z)}c.L(s*2.4,cz+9.6,s*6.9,cz+7.95)});
  winker(-3.6,7,.2,0,g);c.K(-3.6,7,.55);steh(3.8,6.8,3.3,2,.95,g,...c.W(3.8,6.8));steh(5,6.4,3.4,6,1.2,g,...c.W(5,6.4));lampe(...c.W(-10.4,4.4),3.4);lampe(...c.W(10.4,3.4),3.4);c.wand=[-10,-1.5]},{platz:0,ende:5})}
function ort31(){O('Frachtlager',(c,g)=>{
  scheibeW(11.6,.05,0x9aa0ac,0,.03,-1.5,g);
  const cont=(x,z,y,f,rot)=>{const k=grp(x,y,z,g);k.rotation.y=rot||0;box(4,1.9,2,f,0,.98,0,k,true);for(let i=0;i<7;i++)box(.12,1.8,2.06,dk(f,.78),-1.65+i*.55,.98,0,k);box(4.1,.16,2.1,dk(f,.62),0,1.98,0,k);box(.08,1.5,.08,METALL,2.04,.95,-.2,k);box(.08,1.5,.08,METALL,2.04,.95,.2,k)};
  cont(-6.4,-7,0,ORANGE);cont(-1.9,-7.4,0,BLAU);cont(2.6,-7.4,0,ROT);cont(7,-6.6,0,TUERKIS,-.35);cont(-4.4,-7.2,2.05,GELB);cont(.6,-7.4,2.05,TUERKIS);cont(-1.9,-7.4,4.1,ORANGE,.06);cont(-8.2,-1.8,0,LILA,1.35);
  c.S(-2,-7.2,13,2.4);c.S(7,-6.6,4.2,2.4,-.35);c.S(-8.2,-1.8,2.3,4.3,-.22);
  /* Portalkran mit Haken, der eine Kiste bewegt */
  [-4.6,6.8].forEach(x=>{[-.9,.9].forEach(z=>rohr(g,[x,0,-2.6+z*1.4],[x,6.4,-2.6],.14,GELB));c.S(x,-2.6,.7,3)});box(12.2,.5,.7,GELB,1.1,6.6,-2.6,g,true);
  const kz=grp(0,6.2,-2.6,g);box(1,.4,1,DUNKEL,0,0,0,kz);const seil=grp(0,0,0,kz);cyl(.04,2.2,DUNKEL,0,-1.1,0,seil);kiste(seil,0,0,ORANGE,.3,1,-3.1);vm(seil);vm(kz,seil);leben(kz,t=>{kz.position.x=1.1+Math.sin(t*.35)*3.6;seil.position.y=Math.sin(t*.7)*.5},0);
  /* Gabelstapler-Roboter, Paletten, Kisten */
  const st=grp(0,0,0);box(1.6,.8,1.2,GELB,0,.7,0,st,true);box(.8,.7,1,DUNKEL,-.3,1.4,0,st);licht(.12,0x7ff2ff,.12,1.45,.28,st);licht(.12,0x7ff2ff,.12,1.45,-.28,st);[-.55,.55].forEach(x=>[-.65,.65].forEach(z=>cyl(.32,.22,DUNKEL,x,.32,z,st).rotation.x=Math.PI/2));[-.4,.4].forEach(z=>{box(.12,1.8,.12,METALL,.92,1.1,z,st);box(1,.08,.18,METALL,1.45,.55,z,st)});kiste(st,1.5,0,BLAU,0,.75,.62);vm(st);fahren(st,bahn([c.W(-4.2,.4),c.W(4.8,.2),c.W(5,2.6),c.W(-4,3)]),1.7,0);
  [[7.8,.6,BLAU],[8.4,2.2,ORANGE],[-7,3.2,ROT]].forEach((p,i)=>{box(1.6,.2,1.3,0xb88a52,p[0],.12,p[1],g);kiste(g,p[0],p[1],p[2],i*.4,1,.22);if(i<1)kiste(g,p[0],p[1],HELLGRAU,.7,.8,1.2);c.K(p[0],p[1],.95)});
  steh(-2.4,-4.8,.2,7,1.2,g,...c.W(-2.4,-4.8));steh(3.4,-4.6,-.5,3,1.2,g,...c.W(3.4,-4.6));lampe(...c.W(-10,5),3.4);lampe(...c.W(10,5),3.4);c.wand=[-9,-5.9]},{platz:0,road:-108})}
function satellitBau(par,art){const g=grp(0,0,0,par);if(art){cyl(.8,1.7,GOLD,0,0,0,g,true);[-.9,.9].forEach(y=>cyl(.84,.14,METALL,0,y,0,g))}else{box(1.5,1.5,1.5,GOLD,0,0,0,g,true);[-.5,.5].forEach(y=>box(1.54,.07,1.54,0xa87a1c,0,y,0,g))}
  [-1,1].forEach(s=>{cyl(.07,.8,METALL,s*1.1,0,0,g).rotation.z=Math.PI/2;box(2.2,1.1,.08,PANEL,s*2.55,0,0,g,true);for(let i=0;i<=4;i++)box(.05,1.12,.1,0x9ab0e0,s*(1.5+i*.52),0,0,g);box(2.2,.05,.1,0x9ab0e0,s*2.55,0,0,g)});
  const d=grp(0,1.15,0,g);cyl(.06,.4,METALL,0,-.2,0,d);sph(.6,WEISS,0,.1,0,d,1,.25,1);cyl(.03,.5,METALL,0,.4,0,d);licht(.09,ORANGE,0,.68,0,d);licht(.2,0x7ff2ff,0,0,.8,g,1,1,.25);return g}
function ort32(){O('Satelliten-Werkstatt',(c,g)=>{
  halle(c,18,7.6,-5,0xd8ecff,GOLD,4);
  /* zwei Satelliten auf Böcken, einer auf einem Drehteller */
  cyl(1.2,.3,DUNKEL,-4.6,.3,-5.4,g);cyl(.3,1.2,METALL,-4.6,.9,-5.4,g,true);const s1=satellitBau(g,0);s1.position.set(-4.6,2.4,-5.4);s1.scale.setScalar(.85);s1.rotation.y=.25;c.S(-4.6,-5.4,6,2);
  cyl(1.5,.35,ORANGE,4.4,.3,-5.2,g,true);cyl(.3,1,METALL,4.4,.9,-5.2,g);const s2=satellitBau(g,1);s2.position.set(4.4,2.3,-5.2);s2.scale.setScalar(.8);vm(s2);leben(s2,t=>{s2.rotation.y=t*.5},0);c.K(4.4,-5.2,2.8);
  greifarm(g,0,-6.6,WEISS,1.1,1);c.K(0,-6.6,.8);
  /* Ersatzteile: Solarflügel, Schüsseln, Folienrollen */
  [[-7.6,-2,.5],[-6.9,-1.2,.35]].forEach(p=>{const q=grp(p[0],0,p[1],g);q.rotation.y=p[2];box(2,1.5,.1,PANEL,0,.95,0,q,true);for(let i=0;i<4;i++)box(.05,1.5,.12,0x9ab0e0,-.7+i*.47,.95,0,q);box(2.1,.16,.5,METALL,0,.1,0,q)});c.S(-7.3,-1.6,2.4,1.6,.4);
  schuessel(g,7.6,-1.4,.9,1.1,0);c.K(7.6,-1.4,.7);[0,1,2].forEach(i=>cyl(.28,1.2,[GOLD,0xd8dce8,GOLD][i],6+i*.1,.32+i*.5,1.2,g,true).rotation.z=Math.PI/2);c.S(6.1,1.2,1.4,.8);
  pult(g,-3,-1.6,.3,0xffd890);c.S(-3,-1.6,2,1.1,.3);
  const a=steh(-1.3,-3.6,-2,6,1.15,g,...c.W(-1.3,-3.6));a.ar.rotation.x=-1.3;steh(1.3,-1.8,2.2,1,1.2,g,...c.W(1.3,-1.8));winker(-5.8,2.6,.5,4,g);c.K(-5.8,2.6,.55);
  lampe(...c.W(-10,3.8),3.2);lampe(...c.W(10,3.8),3.2);satellitVorn(c)},{road:-108})}
function ort33(){O('Raumstations-Modell',(c,g)=>{
  const cz=-3.4;scheibeW(8,.2,0x3a4670,0,.11,cz,g);liegend(ring(7.6,.14,TUERKIS,0,.23,cz,g,0,40));
  cyl(1.3,.7,DUNKEL,0,.55,cz,g,true);cyl(.4,5,METALL,0,3.2,cz,g,true);c.K(0,cz,1.5);
  /* Modell der Raumstation: langer Träger, Module, acht Sonnenflügel; dreht sich langsam */
  const s=grp(0,6.2,cz,g);box(11,.3,.3,METALL,0,0,0,s,true);for(let i=0;i<12;i++)box(.1,.5,.5,HELLGRAU,-5.2+i*.95,0,0,s);
  const m=(x,y,z,r,l,achse,f)=>{const q=cyl(r,l,f,x,y,z,s,true);if(achse==='z')q.rotation.x=Math.PI/2;else q.rotation.z=Math.PI/2;return q};
  m(0,-.55,0,.55,2.2,'z',WEISS);m(0,-.55,1.8,.48,1.3,'z',HELLGRAU);m(0,-.55,-1.8,.5,1.3,'z',WEISS);m(1.15,-.55,.6,.42,1.4,'x',WEISS);m(-1.15,-.55,.6,.42,1.4,'x',HELLGRAU);m(0,-.55,-2.8,.34,.7,'z',ORANGE);sph(.4,0x9fe0ff,0,-1,1.8,s,1,.6,1);m(0,-.55,2.6,.3,.4,'z',DUNKEL);
  [-4.9,-3.6,3.6,4.9].forEach(x=>{[-1,1].forEach(q=>{box(.95,.06,2.5,GOLD,x,0,q*1.6,s,true);for(let i=0;i<5;i++)box(.97,.08,.04,0x7a5210,x,0,q*(.55+i*.5),s);box(.04,.08,2.5,0x7a5210,x,0,q*1.6,s)})});[-1.8,1.8].forEach(x=>box(.9,1.4,.05,WEISS,x,.85,-.2,s));cyl(.04,.8,METALL,.3,.4,0,s);sph(.3,WEISS,.3,.85,0,s,1,.3,1);licht(.12,ROT,5.6,0,0,s);licht(.12,0x7ff2c0,-5.6,0,0,s);
  vm(s);leben(s,t=>{s.rotation.y=t*.22;s.rotation.z=Math.sin(t*.3)*.07},0);
  /* Erdkugel am Sockel, Bänke, Lichter */
  const e=grp(4.8,0,cz+2,g);cyl(.6,.5,METALL,0,.35,0,e);const ek=grp(0,1.7,0,e);erdkugel(ek,1.1);vm(ek);leben(ek,t=>{ek.rotation.y=t*.3},0);c.K(4.8,cz+2,1.15);
  [[-6.4,2.6,.8],[7,3,-.8]].forEach(p=>{bank(g,p[0],p[1],p[2],ORANGE);c.S(p[0],p[1],2.3,.9,p[2])});
  for(let i=0;i<10;i++){const a=i*.628+.31,x=Math.cos(a)*8.6,z=cz+Math.sin(a)*8.6;if(z>2&&Math.abs(x)<3.4)continue;cyl(.14,.5,DUNKEL,x,.25,z,g);licht(.2,0x9ff4ff,x,.6,z,g);c.K(x,z,.25)}
  steh(-3.6,1,2.9,2,1.2,g,...c.W(-3.6,1));steh(-2.4,1.4,3.2,5,.9,g,...c.W(-2.4,1.4));winker(2.6,2.6,.2,3,g);c.K(2.6,2.6,.55)},{platz:0,ende:2})}
/* Kraterwall aus Felsen; Lücke in Richtung ga */
function wall(c,cx,cz,r,ga,gw,farbe){const n=Math.round(r*3.4);for(let i=0;i<n;i++){const a=i/n*6.2832,d=Math.abs(Math.atan2(Math.sin(a-ga),Math.cos(a-ga)));if(d<gw)continue;const x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r,s=.75+((i*7)%5)*.15;felsK(x,z,s,c.g,farbe?farbe[i%farbe.length]:FELSF[i%5]);const x2=cx+Math.cos(a+.09)*(r+1),z2=cz+Math.sin(a+.09)*(r+1);if(i%2){felsK(x2,z2,s*.62,c.g,farbe?farbe[(i+1)%farbe.length]:FELSF[(i+2)%5]);c.K(x2,z2,s*.62)}c.K(x,z,s*.95+.25)}
  const m=22;let pa=null;for(let i=0;i<=m;i++){const a=ga+gw+(6.2832-2*gw)*i/m,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(pa)c.L(pa[0],pa[1],x,z);pa=[x,z]}}
function ort34(){O('Großer Krater mit Aussichtssteg',(c,g)=>{
  const cz=-3.2,R=10.4;
  /* nach innen immer dunklere Ringe: wirkt wie eine tiefe Mulde; in der Mitte der Zentralberg */
  [[R,0x9ca0ae,.05],[8.4,0x848898,.07],[6.6,0x6a6e80,.09],[4.8,0x535668,.11],[3,0x3e4052,.13]].forEach((p,i)=>scheibeW(p[0],.04,p[1],i*.25,p[2],cz-i*.45,g));
  cone(2,2.6,0x8a8e9c,1.2,1.3,cz-2.8,g,true);cone(1.2,1.6,0x9a9eac,-.4,.8,cz-3.6,g);cone(.9,1.1,0x787c8c,2.8,.55,cz-1.8,g);
  [[-5,-1,.6],[4.6,1.6,.5],[-3.4,-6.4,.8],[5.4,-5,.55]].forEach(p=>felsK(p[0],cz+p[1],p[2],g,0x6a6e7e));
  wall(c,0,cz,R,Math.PI/2,.19);
  /* Steg bis zur Plattform über der Mitte */
  const z0=cz+R+.8,z1=cz+2.6;box(3.2,.18,z0-z1,0xc8944a,0,.28,(z0+z1)/2,g).receiveShadow=true;for(let z=z1+.4;z<z0;z+=.75)box(3.2,.04,.08,0x8a5a2a,0,.39,z,g);
  scheibeW(3.1,.2,0xc8944a,0,.29,z1-1.6,g);
  const gel=(a,b,cc,d)=>{c.L(a,b,cc,d);const n=Math.max(1,Math.round(Math.hypot(cc-a,d-b)/1.6));for(let i=0;i<=n;i++)cyl(.07,1.1,WEISS,a+(cc-a)*i/n,.9,b+(d-b)*i/n,g);rohr(g,[a,1.45,b],[cc,1.45,d],.08,ORANGE);rohr(g,[a,.95,b],[cc,.95,d],.04,METALL)};
  const pm=z1-1.6;gel(-1.75,z0-.2,-1.75,z1-.3);gel(1.75,z0-.2,1.75,z1-.3);
  let pa=[1.75,z1-.3];[[3.1,pm],[2.4,pm-2.1],[0,pm-3.1],[-2.4,pm-2.1],[-3.1,pm],[-1.75,z1-.3]].forEach(p=>{gel(pa[0],pa[1],p[0],p[1]);pa=p});
  const f=grp(-1.3,.35,pm-1.4,g);cyl(.08,1.2,METALL,0,.6,0,f);const r=grp(0,1.35,0,f);r.rotation.set(-.2,.4,0);cyl(.22,1.3,BLAU,0,0,0,r,true).rotation.x=Math.PI/2;cyl(.28,.18,DUNKEL,0,0,-.7,r).rotation.x=Math.PI/2;c.K(-1.3,pm-1.4,.4);
  steh(1.5,pm-1.2,Math.PI-.3,1,1.1,g,...c.W(1.5,pm-1.2));winker(-4.2,10,.3,5,g);c.K(-4.2,10,.55);
  const q=c.W(0,cz);drohne(q[0],3.6,q[1],6.5,5,.35,4);lampe(...c.W(-3.4,8.8),3);lampe(...c.W(3.4,8.8),3)},{platz:0,ende:9})}
function ort35(){O('Eiskrater',(c,g)=>{
  const cz=-2.4,R=7.4;[[R,0xb8d0e8,.05],[6,0xd4ecff,.08],[4,0xeaf8ff,.11]].forEach((p,i)=>scheibeW(p[0],.05,p[1],i*.2,p[2],cz-i*.25,g));
  wall(c,0,cz,R,Math.PI/2,.34,[0x9aa8c0,0xc4d8ec,0x8a96b0]);
  /* Eiskristalle */
  const kr=gK('kristall',()=>new THREE.ConeGeometry(1,1,5));[[-3.6,-3,1.3],[-1,-5,1.8],[2.8,-4,1.4],[4,-1,.9],[-4.4,.2,.8]].forEach((p,i)=>{for(let k=0;k<4;k++){const a=k*1.6+i,h=p[2]*(k?1.1:2),x=p[0]+(k?Math.cos(a)*.55:0),z=cz+3+p[1]-.6+(k?Math.sin(a)*.55:0);const m=teilG(kr,[0xa8e4ff,0xdcf6ff,0x7accf4][(i+k)%3],x,h*.45,z,p[2]*(k?.28:.42),h,p[2]*(k?.28:.42),g,true);m.rotation.z=k?Math.cos(a)*.35:0;m.rotation.x=k?-Math.sin(a)*.35:0}c.K(p[0],cz+2.4+p[1],p[2]*.75)});
  for(let i=0;i<14;i++){const a=i*2.4,q=1.5+(i%5);const gl=grp(Math.cos(a)*q,.4,cz+Math.sin(a)*q*.8,g);licht(.09,0xffffff,0,0,0,gl,1,2,1);leben(gl,t=>{gl.scale.setScalar(Math.max(.05,Math.sin(t*2.2+i*1.3)))},0)}
  /* Eis-Sammelroboter mit Schlitten voll Eisblöcken */
  const r=grp(0,0,0);const p=picoBau(r,0x8ad0f0,ORANGE);p.g.rotation.y=Math.PI/2;p.g.scale.setScalar(.7);box(1.4,.14,1,METALL,-1.4,.3,0,r);[0,1,2].forEach(i=>box(.5,.45,.5,0xd0f0ff,-1.75+i*.35,.6+(i%2)*.3,(i-1)*.18,r));rohr(r,[-.7,.4,0],[-.3,.7,0],.05,DUNKEL);vm(r);fahren(r,pendel([c.W(-2.6,.6),c.W(0,1.6),c.W(2.6,.4)],.5),.9,1);
  const f=steh(3.2,-.2,-2.2,0,1.15,g,...c.W(3.2,-.2));f.ar.rotation.x=-1.2;steh(-5.2,7.4,2.7,3,1.1,g,...c.W(-5.2,7.4));
  lampe(...c.W(-4,6.4),2.8,0x9ad8ff);lampe(...c.W(4,6.4),2.8,0x9ad8ff)},{platz:0,ende:4})}
/* Felsbogen aus einem Stück: halber Ring bis zum Boden, Ecken verschoben, damit er wie Gestein aussieht */
function felsBogen(g,z,R,t,farbe,seed){const q=new THREE.TorusGeometry(R,t,7,18,Math.PI),P=q.attributes.position,v=new THREE.Vector3();
  for(let i=0;i<P.count;i++){v.fromBufferAttribute(P,i);const n=Math.sin(v.x*2.3+seed)*Math.cos(v.y*1.9+seed*2)+Math.sin(v.z*3.1+v.x*1.3+seed);v.x*=1+n*.035;v.y*=1+n*.035;v.z+=n*.2;P.setXYZ(i,v.x,v.y,v.z)}
  const geo=q.toNonIndexed();geo.computeVertexNormals();const m=new THREE.Mesh(geo,mat(farbe));m.position.set(0,0,z);m.castShadow=true;g.add(m);return m}
function ort36(){O('Lavahöhle',(c,g)=>{
  /* alte Lavaröhre: dunkler Boden, geschlossene Felsbögen bis zum Boden, hinten ein dunkler Gang mit rötlichem Licht */
  scheibeW(9.4,.07,0x5a4c58,0,.04,-1,g);box(7.6,.05,8,0x3a2a34,0,.1,-5.6,g);
  felsBogen(g,-4.2,6.2,1.35,0x7c6270,1);felsBogen(g,-6.4,5.5,1.35,0x5c4450,4);felsBogen(g,-8.3,4.9,1.35,0x40283a,7);felsBogen(g,1.2,6.9,.75,0x8a6e74,9);
  /* dunkle Rückwand mit Glut */
  const hg=gK('halbrund',()=>new THREE.CircleGeometry(1,20,0,Math.PI)),dunkel=(r,f,z)=>{const m=new THREE.Mesh(hg,gK('dk'+f,()=>new THREE.MeshBasicMaterial({color:f})));m.position.set(0,0,z);m.scale.set(r,r,1);g.add(m)};
  dunkel(4.9,0x180810,-9.1);dunkel(3.5,0x6a1420,-9.05);dunkel(2.6,0xb0321c,-9);dunkel(1.6,0xf06a2a,-8.95);dunkel(.7,0xffc060,-8.9);lbox(3.4,.04,.9,0x8a2a1c,0,.14,-8.2,g);lbox(1.8,.05,.5,0xe0602a,0,.15,-8.5,g);
  [[-3.2,.35,-7.4],[3.1,.35,-7.8],[-1.4,.2,-8.6],[1.7,.25,-8.5],[0,.18,-8.8]].forEach((p,i)=>{licht(.28+(i%2)*.1,i%2?0xff5a28:0xff8a38,p[0],p[1],p[2],g,1.4,.7,1)});
  const gl=grp(0,.7,-8.7,g);[-1,0,1].forEach(q=>licht(.2,0xffa040,q*.7,Math.abs(q)*.3,0,gl));leben(gl,t=>{gl.scale.setScalar(.8+Math.sin(t*2.4)*.25)},0);
  c.L(-4,-9,4,-9);c.S(0,-11.4,17,12.2);[-1,1].forEach(q=>{c.L(q*4.9,-4.2,q*4.2,-6.4);c.L(q*4.2,-6.4,q*3.6,-9);[[6.2,-4.2,1.45],[5.5,-6.4,1.45],[4.9,-8.3,1.45],[6.9,1.2,.85]].forEach(a=>c.K(q*a[0],a[1],a[2]));
    /* niedrige Seitenfelsen verbinden die Bogenfüße */
    [[6.9,-2.4,1.15],[7.2,-.5,.85],[6.4,-5.6,1.2],[5.6,-8,1.4],[7.8,-4.4,1.5],[7.2,-7,1.6]].forEach((a,i)=>{felsK(q*a[0],a[1],a[2],g,[0x6a5460,0x5a4854,0x7c6270][i%3]);c.K(q*a[0],a[1],a[2]*1.05)});c.L(q*6.2,-4.2,q*6.9,1.2)});
  /* Fels über dem Eingang und dahinter, macht daraus einen Berg */
  [[-4.6,6.2,-6.2,1.5],[-2,7.2,-6.4,1.7],[1,7.4,-6.6,1.9],[3.8,6.4,-6.2,1.6],[-1,6.2,-8.6,2],[2.4,5.6,-8.8,1.9],[-3.4,4.8,-9,1.9]].forEach((a,i)=>{felsK(a[0],a[2],a[3],g,[0x6a5460,0x5a4854,0x4a3844][i%3]).position.y=a[1]});
  [[-3.5,-9.9,2.2],[0,-10,2.4],[3.5,-9.9,2.2]].forEach(a=>{felsK(a[0],a[1],a[2],g,0x4a3844);c.K(a[0],a[1],a[2])});
  /* Leuchtkristalle, Kabellampen, Forschende mit Stirnlampen */
  [[-5.4,3.8,0xd090ff],[5.4,3.6,0x70f0e0],[-3.7,-5.2,0xffb060],[3.6,-3.6,0xd090ff],[-7.4,3.2,0x70f0e0],[7.4,2.6,0xffb060]].forEach(p=>{for(let k=0;k<4;k++){const m=new THREE.Mesh(gK('lk'+p[2],()=>{const q=new THREE.ConeGeometry(1,1,5),n=q.attributes.position.count,a=new Float32Array(n*3),f=new THREE.Color(p[2]);for(let i=0;i<n;i++){const s=.75+(i%3)*.12;a[i*3]=f.r*s;a[i*3+1]=f.g*s;a[i*3+2]=f.b*s}q.setAttribute('color',new THREE.BufferAttribute(a,3));return q}),LM);m.position.set(p[0]+(k-1.5)*.3,.45+(k%2)*.2,p[1]+(k%2)*.3);m.scale.set(.18,.9+(k%2)*.5,.18);m.rotation.z=(k-1.5)*.25;g.add(m)}c.K(p[0],p[1],.65)});
  [[-4.4,-2],[4.4,-1.6],[-4.6,5.6],[4.6,5.6]].forEach(p=>{cyl(.05,1.5,METALL,p[0],.75,p[1],g);licht(.2,0xffe6a0,p[0],1.6,p[1],g);c.K(p[0],p[1],.25)});
  [[-2.6,-4.6,.9,1],[2.2,-5.8,-.4,5]].forEach(p=>{const m=steh(p[0],p[1],p[2],p[3],1.15,g,...c.W(p[0],p[1]));licht(.12,0xfffbd0,0,.62,.62,m.kopf)});
  kiste(g,3.4,.4,TUERKIS,.6);c.K(3.4,.4,.85);
  roverFahrt(pendel([c.W(-2.6,-1.4),c.W(-.8,-3),c.W(1.2,-1.6),c.W(1.6,.8)],.3),1.2,0,0xffd23e,.55);
  lampe(...c.W(-5.4,7.4),2.8,0xffc080);lampe(...c.W(5.4,7.4),2.8,0xffc080)},{platz:0,ende:2})}
function ort37(){O('Planetenpark',(c,g)=>{
  const cz=-1.5;scheibeW(12.4,.07,0x2a3260,0,.04,cz,g);for(let i=0;i<8;i++){const r=ring(2.8+i*1.2,.035,0x8a9ad8,0,.1,cz,g,0,48);r.rotation.x=Math.PI/2}
  /* Planeten-Maschine: Sonne in der Mitte, acht Planeten kreisen auf Armen */
  cyl(1.2,.8,GOLD,0,.4,cz,g,true);cyl(.35,4,METALL,0,2.4,cz,g,true);const so=grp(0,5.4,cz,g);licht(1.35,0xffc428,0,0,0,so);licht(.5,0xffe870,.7,.5,.8,so);licht(.45,0xffa018,-.8,-.3,.7,so);for(let i=0;i<10;i++){const a=i*.628;lbox(.55,.16,.16,0xffd850,Math.cos(a)*1.65,Math.sin(a)*1.65,0,so).rotation.z=a}vm(so);leben(so,t=>{so.rotation.y=t*.25;so.rotation.z=t*.12},0);c.K(0,cz,1.5);
  /* Abstand, Größe, Höhe, Tempo: Merkur bis Neptun */
  [[2.8,.28,3.2,.9,0xb0a8a0],[4,.46,3.9,.66,0xe8c070],[5.2,.5,3,.52,0x2a72d8],[6.4,.38,3.7,.42,0xd8603a],[7.6,1,4.4,.24,0xd8a878],[8.8,.8,3.6,.18,0xe8d090],[10,.62,4.2,.13,0x8ae0e0],[11.2,.6,3.2,.1,0x4466d8]].forEach((p,i)=>{const a=grp(0,0,cz,g),y=p[2];rohr(a,[0,1+i*.13,0],[p[0],1+i*.13,0],.05,GOLD);cyl(.05,y-1-i*.13,GOLD,p[0],(y+1+i*.13)/2,0,a);const k=grp(p[0],y,0,a);sph(p[1],p[4],0,0,0,k).castShadow=true;
      if(i===2){k.remove(k.children[0]);erdkugel(k,p[1]);sph(.14,0xc8ccd6,p[1]+.28,.2,0,k)}if(i===3)sph(p[1]*.4,WEISS,0,p[1]*.82,0,k,1,.4,1);if(i===4){[-.4,.05,.45].forEach(q=>{const r=ring(p[1]*Math.sqrt(1-q*q)*.995,.07,q?0xa87050:0xf0d8b0,0,q*p[1],0,k,0,24);r.rotation.x=Math.PI/2});sph(.22,0xc0482a,.3,-.25,.9,k,1.4,.8,.5)}
      if(i===5){const r=ring(p[1]*1.6,.13,0xf4e4b8,0,0,0,k,0,32);r.rotation.x=1.25;r.scale.z=.35;const r2=ring(p[1]*2,.07,0xc8a870,0,0,0,k,0,32);r2.rotation.x=1.25;r2.scale.z=.35}if(i===6){const r=ring(p[1]*1.5,.025,0xd8ffff,0,0,0,k,0,28);r.rotation.y=.35}if(i===0)sph(.08,0x8a8078,.15,.1,.2,k);if(i===1)sph(p[1]*.5,0xf4dca0,0,.1,.1,k,1.5,.5,1.4);if(i===7)sph(p[1]*.35,0x7a98f0,.15,.15,.4,k,1.5,.6,.6);
      vm(a);leben(a,t=>{a.rotation.y=t*p[3]*.4+i*2.3},0)});
  for(let i=0;i<12;i++){const a=i*.5236+.26,x=Math.cos(a)*13,z=cz+Math.sin(a)*13;if(z>5&&Math.abs(x)<5)continue;cyl(.14,.9,DUNKEL,x,.45,z,g);licht(.22,i%2?0xfff0b0:0xd8c0ff,x,1,z,g);c.K(x,z,.3)}
  steh(-3.2,3,2.6,4,1.15,g,...c.W(-3.2,3));winker(3.4,3.6,.4,7,g);c.K(3.4,3.6,.55);steh(4.6,2.8,-2.7,1,.9,g,...c.W(4.6,2.8));bank(g,-6.8,8.6,2.6,LILA);c.S(-6.8,8.6,2.3,.9,2.6);bank(g,6.8,8.6,-2.6,TUERKIS);c.S(6.8,8.6,2.3,.9,-2.6)},{platz:0,ende:4})}
function ort40(){O('Meteoriten-Feld',(c,g)=>{
  scheibeW(11.4,.05,0x948e98,0,.03,-1,g);
  [[-6.4,-4.6,2.4],[4.8,-6,3],[7.6,.4,1.8],[-6.8,2.6,1.6],[-.6,-7.8,1.4],[1.8,-1.8,1.1]].forEach((p,i)=>{const q=c.W(p[0],p[1]);krater(q[0],q[1],p[2],0xd0ccd8,.05);for(let k=0;k<7;k++){const a=k*.9+i;inst('box',q[0]+Math.cos(a)*(p[2]+1),.1,q[1]+Math.sin(a)*(p[2]+1),1.3,.02,.16,0xc8c4d0,-a)}});
  /* dunkle Meteoriten mit Dellen und metallischen Flecken */
  [[-6.4,-4.6,1.25],[4.8,-6,1.7],[7.6,.4,.85],[-6.8,2.6,.75],[-.6,-7.8,.7]].forEach((p,i)=>{const m=felsK(p[0],p[1],p[2],g,0x453a40);for(let k=0;k<5;k++){const a=k*1.4+i;sph(p[2]*.22,k%2?0x2c242c:0xb08868,p[0]+Math.cos(a)*p[2]*.85,p[2]*(.6+(k%3)*.28),p[1]+Math.sin(a)*p[2]*.75,g,1,.8,1)}c.K(p[0],p[1],p[2]*1.15)});
  /* Forschungszelt, Probenkoffer, Magnet-Roboter */
  const z=grp(-3.6,0,-3.4,g);z.rotation.y=.45;box(3.4,.12,2.6,DUNKEL,0,.08,0,z);box(3.2,1,.14,ORANGE,0,.6,-1.15,z);tonnendach(3.3,1.8,2.5,ORANGE,0,.9,-.55,z).scale.z=.65;[-1.5,1.5].forEach(x=>cyl(.07,1.6,METALL,x,.8,1.1,z));tisch(z,0,-.5,1.8,.8,WEISS);[-.4,.1,.55].forEach((x,i)=>felsK(x,-.5,.16,z,[0x453a40,0xb08868,0x6a6270][i]).position.y=1.22);c.S(-3.6,-3.9,3.5,1.6,.45);
  [[2.6,.4],[3.5,.9]].forEach((p,i)=>{box(.8,.4,.55,i?BLAU:HELLGRAU,p[0],.26,p[1],g,true);box(.3,.1,.08,DUNKEL,p[0],.52,p[1],g)});c.S(3,.65,1.8,1);
  const r=grp(0,0,0);const p=picoBau(r,0xff9a7a,DUNKEL);const mg=grp(0,.7,.95,p.g);ring(.34,.14,ROT,0,0,0,mg,Math.PI,12).rotation.x=Math.PI/2;[-.34,.34].forEach(x=>box(.26,.26,.2,METALL,x,0,.1,mg));p.g.rotation.y=Math.PI/2;p.g.scale.setScalar(.7);vm(r);fahren(r,bahn([c.W(-3.4,.4),c.W(1,-4),c.W(4.4,-2),c.W(5,3),c.W(-2,3.6)]),1.1,0);
  /* Sternschnuppen-Brocken, der ab und zu weit hinten herunterfällt (hoch über der Wand) */
  const sn=grp(0,20,-9,g);licht(.4,0xfff0b0,0,0,0,sn);for(let i=1;i<6;i++)licht(.34-i*.05,[0xffd060,0xffa040,0xff7a40,0xd06050,0x8a5060][i-1],i*.6,i*.45,0,sn);vm(sn);leben(sn,t=>{const u=(t*.16)%1;sn.visible=u<.3;sn.position.set(8-u*40,17-u*34,-12)},0);
  const f=steh(.2,.7,-2.4,2,1.15,g,...c.W(.2,.7));f.al.rotation.x=-1;steh(5.6,-2.6,-1,6,1.15,g,...c.W(5.6,-2.6));lampe(...c.W(-8.8,5.6),2.8);lampe(...c.W(8.6,5.2),2.8)},{platz:0})}
/* ==================== Kleinteile für die vordere Hälfte der Ortsplätze ==================== */
function matte(c,x,z,w,t,farbe){box(w,.05,t,farbe,x,.085,z,c.g).receiveShadow=true;box(w-.35,.052,t-.35,dk(farbe,1.18),x,.09,z,c.g)}
/* Rolltisch mit Dingen: art 0 Fläschchen, 1 Steine, 2 Werkzeug, 3 Helme, 4 kleine Satelliten */
function rolltisch(c,x,z,rot,farbe,art){const g=grp(x,0,z,c.g);g.rotation.y=rot;box(2,.12,1,farbe,0,.95,0,g,true);box(1.9,.08,.9,HELLGRAU,0,.45,0,g);[-.85,.85].forEach(a=>[-.38,.38].forEach(b=>{cyl(.05,.85,METALL,a,.52,b,g);sph(.11,DUNKEL,a,.11,b,g)}));
  for(let i=0;i<4;i++){const q=-.68+i*.45,f=[ROT,GELB,TUERKIS,LILA][i];if(art===0){cyl(.13,.34,f,q,1.18,(i%2)*.2-.1,g);cyl(.05,.18,WEISS,q,1.44,(i%2)*.2-.1,g)}else if(art===1){felsK(q,(i%2)*.2-.1,.19,g,[0x5a5e68,0xd8a050,0xe4e4ec,0x8a5a60][i]).position.y=1.17}else if(art===2){box(.1,.08,.6,METALL,q,1.06,0,g);box(.28,.12,.2,f,q,1.08,.28,g)}else if(art===3){if(i<3){sph(.3,WEISS,q*1.2+.1,1.3,0,g);sph(.2,GOLD,q*1.2+.1,1.32,.2,g,1,.85,.5)}}else{box(.28,.28,.28,GOLD,q,1.2,0,g);box(.1,.05,.7,PANEL,q,1.22,0,g)}}
  box(.7,.35,.6,farbe,-.4,.68,0,g);box(.6,.3,.55,ORANGE,.45,.65,0,g);c.S(x,z,2.2,1.2,rot)}
function buntFracht(c,x,z,f1,f2){kiste(c.g,x,z,f1,.25,.9);kiste(c.g,x+1.15,z+.2,f2,-.3,.8);kiste(c.g,x+.5,z+.05,GELB,.6,.65,.85);c.S(x+.55,z+.1,2.5,1.25)}
function buntFass(c,x,z,farben){farben.forEach((f,i)=>{const px=x+(i%2)*1.05+(i>1?.5:0),pz=z+(i>1?.95:i*.1);fass(c.g,px,pz,f,.72);c.K(px,pz,.45)})}
/* Gestell mit bunten Sachen zum Aufhängen */
function haengen(c,x,z,rot,art){const g=grp(x,0,z,c.g);g.rotation.y=rot;[-1.2,1.2].forEach(q=>{cyl(.07,1.7,METALL,q,.85,0,g,true);box(.12,.1,.8,DUNKEL,q,.08,0,g)});rohr(g,[-1.2,1.65,0],[1.2,1.65,0],.06,METALL);[ORANGE,TUERKIS,ROT,LILA,BLAU].forEach((f,i)=>{const q=-.9+i*.45;if(art){box(.36,.85,.07,f,q,1.18,0,g)}else{sph(.17,f,q,1.28,0,g,1,1.2,.6);cyl(.1,.22,WEISS,q,1.5,0,g);sph(.07,f,q+.14,1.28,0,g)}});c.S(x,z,2.7,.7,rot)}
function stativ(c,x,z,farbe,rot){const g=grp(x,0,z,c.g);g.rotation.y=rot||0;[0,2.09,4.19].forEach(a=>rohr(g,[Math.cos(a)*.6,0,Math.sin(a)*.6],[0,1.25,0],.06,METALL));const r=grp(0,1.4,0,g);r.rotation.x=-.5;cyl(.22,1.2,farbe,0,0,0,r,true).rotation.x=Math.PI/2;cyl(.27,.2,DUNKEL,0,0,.65,r).rotation.x=Math.PI/2;licht(.14,0x9fe0ff,0,0,.76,r,1,1,.3);c.K(x,z,.65)}
function liege(c,x,z,rot,farbe){const g=grp(x,0,z,c.g);g.rotation.y=rot;box(.9,.14,1.5,farbe,0,.55,.2,g,true);box(.9,.14,.9,farbe,0,.85,-.75,g).rotation.x=.9;box(.8,.1,.3,WEISS,0,1.05,-.9,g).rotation.x=.9;[-.38,.38].forEach(a=>[-.5,.7].forEach(b=>cyl(.05,.5,METALL,a,.27,b,g)));c.S(x,z-.1*Math.cos(rot),1,2.3,rot)}
function absperr(c,x1,z1,x2,z2){[[x1,z1],[x2,z2],[(x1+x2)/2,(z1+z2)/2]].forEach(p=>{cyl(.1,1,GOLD,p[0],.5,p[1],c.g,true);cyl(.28,.1,GOLD,p[0],.08,p[1],c.g);sph(.14,GOLD,p[0],1.05,p[1],c.g)});rohr(c.g,[x1,.85,z1],[(x1+x2)/2,.7,(z1+z2)/2],.07,ROT);rohr(c.g,[(x1+x2)/2,.7,(z1+z2)/2],[x2,.85,z2],.07,ROT);c.L(x1,z1,x2,z2)}
function museumVorn(c){matte(c,-6.2,5.2,3.6,2.6,0x7a4a9a);matte(c,6.2,5.4,3.6,2.4,0x3a6ab0);absperr(c,-3.4,1.2,-3.4,6.2);absperr(c,3.4,1.2,3.4,5.4);stativ(c,-6.4,5.2,GOLD,.6);const m=grp(6.2,0,5.4,c.g);cyl(.55,.5,LILA,0,.3,0,m);cyl(.1,.8,METALL,0,.9,0,m);const k=grp(0,1.9,0,m);mondkugel(k,.75);vm(k);leben(k,t=>{k.rotation.y=t*.45},0);c.K(6.2,5.4,.85);bank(c.g,-7.6,.6,1.5708,ROT);c.S(-7.6,.6,.9,2.3)}
function werkstattVorn(c){matte(c,-5.8,4.2,4,3,0x3b8fd4);matte(c,5.6,3.8,4,3.2,0xe07a3a);haengen(c,-5.8,4.4,.25,0);rolltisch(c,5.6,2.2,-.3,0x9a78d8,3);haengen(c,6.2,5.4,-.35,1);buntFracht(c,-9,6.2,ROT,TUERKIS)}
function laborVorn(c){matte(c,-5.8,3.8,4.2,3.2,0x2fa8a8);matte(c,5.8,3.8,4.2,3.2,0x8a68c8);rolltisch(c,-5.8,3.2,.35,0x2fc0c0,0);rolltisch(c,5.6,2.8,-.35,ORANGE,1);buntFass(c,6,5.4,[ROT,GELB,BLAU]);buntFracht(c,-8,5.8,LILA,GELB);stativ(c,3.8,5.8,TUERKIS,-.4)}
function batterieVorn(c){matte(c,-5.6,4.2,4,2.8,0xe0b020);matte(c,5.6,3.8,4,3,0x30a070);const r=roverBau(c.g,TUERKIS,.62);r.position.set(-5.6,0,4.2);r.rotation.y=.3;c.S(-5.6,4.2,2.4,1.5,.3);box(.5,1.5,.5,WEISS,-3.7,.75,2.6,c.g,true);lbox(.3,.4,.05,0x7ff2c0,-3.7,1.1,2.88,c.g);c.K(-3.7,2.6,.45);buntFass(c,4.6,3.2,[GELB,BLAU,GELB]);rolltisch(c,6.2,6,-.5,BLAU,2);buntFracht(c,-9,.8,GELB,BLAU)}
function teleskopVorn(c){matte(c,4.2,6.6,3.6,2.6,0x4a3a8a);matte(c,-2.8,7.4,2.8,2.4,0x2a5a9a);liege(c,3.4,6.6,-.25,ROT);liege(c,5.2,6.4,.15,TUERKIS);stativ(c,-3.4,7.2,ORANGE,.5);stativ(c,9.4,.8,LILA,-1);rolltisch(c,-9.2,-.4,1.3,GELB,0);buntFracht(c,7.6,-7.2,BLAU,ORANGE)}
function garageVorn(c){matte(c,-7,7.4,3.4,2.4,0xd8a020);matte(c,7.2,2.2,3.2,2.6,0x3b8fd4);buntFass(c,-8,7,[ROT,BLAU,GELB]);rolltisch(c,7.4,2,-.4,ORANGE,2);buntFracht(c,6.2,8.2,TUERKIS,ROT);[-4.6,-4.6].forEach((x,i)=>{liegend(ring(.5,.2,DUNKEL,x,.25+i*.4,8.4,c.g,0,16))});c.K(-4.6,8.4,.75);haengen(c,-8.2,3.6,1.4,1)}
function satellitVorn(c){matte(c,-5.6,3.8,4,3,0xc89a20);matte(c,5.6,3.6,4,3,0x3a5ab0);rolltisch(c,-5.4,4.2,.3,GOLD,4);rolltisch(c,5.4,3,-.3,0x3b8fd4,2);const s=satellitBau(c.g,0);s.scale.setScalar(.45);s.position.set(6.2,1.1,5.8);cyl(.35,.8,ORANGE,6.2,.4,5.8,c.g,true);c.S(6.2,5.8,3,1);buntFracht(c,-8.6,.8,LILA,TUERKIS);buntFass(c,3.2,6,[GOLD,WEISS])}
function gesteinVorn(c){matte(c,-5.8,4.6,4,2.8,0xa8603a);matte(c,5.6,4.4,4,2.8,0x5a7a9a);rolltisch(c,5.6,4.2,-.35,TUERKIS,1);const k=grp(-5.8,0,4.6,c.g);k.rotation.y=.4;box(1.8,.6,1.2,ORANGE,0,.75,0,k,true);cyl(.42,.2,DUNKEL,1,.42,0,k).rotation.x=Math.PI/2;[-.5,.5].forEach(z=>{box(.9,.08,.1,METALL,-1.3,.85,z,k);cyl(.07,.55,METALL,-.7,.28,z,k)});[[-.4,0],[.35,.25],[.2,-.3],[0,.05]].forEach((p,i)=>{felsK(p[0],p[1],.36,k,[0x5a5e68,0xd8a050,0xe4e4ec,0x8a5a60][i]).position.y=1.15+(i===3?.3:0)});c.S(-5.8,4.6,2.8,1.4,.4);buntFracht(c,-10.4,-2,BLAU,ROT);buntFass(c,7.4,.2,[LILA,GELB,TUERKIS])}
function algenVorn(c){matte(c,-5.6,4.4,4,2.8,0x18988a);matte(c,5.6,4.4,4,2.8,0x2a78b0);haengen(c,-5.6,4.6,.3,1);rolltisch(c,5.4,4,-.35,TUERKIS,0);buntFass(c,3.4,5.6,[TUERKIS,BLAU,TUERKIS]);buntFracht(c,-8.8,2.6,TUERKIS,WEISS)}
/* ==================== Fläche, Himmel, Wege, Eingang, Ausgang, Festplatz ==================== */
function himmelBauen(){
  NEBEL_TAG.set(0x333a58);BOT_TAG.set(0x222a4e);TOP_TAG.set(0x03040a);NEBEL_ABEND.set(0x251c48);BOT_ABEND.set(0x2c1c56);TOP_ABEND.set(0x050212);
  skyMat.uniforms.top.value.copy(TOP_TAG);skyMat.uniforms.bottom.value.copy(BOT_TAG);scene.fog.color.copy(NEBEL_TAG);scene.fog.near=70;scene.fog.far=178;
  hemi.color.set(0xe8eeff);hemi.groundColor.set(0x8e8898);hemi.intensity=.55;dir.color.set(0xfff2de);dir.intensity=.62;
  sternMat.opacity=1;sternMat.size=2.2;
  /* viele Sterne bis zum Horizont, in zwei Größen */
  [[1100,1.4,0xdfe8ff],[200,3,0xfff4d8]].forEach(q=>{const P=new Float32Array(q[0]*3);for(let i=0;i<q[0];i++){const a=nr()*6.283,h=-.04+Math.pow(nr(),1.35)*1.02,e=Math.asin(Math.max(-1,Math.min(1,h)));P[i*3]=Math.cos(e)*Math.cos(a)*405;P[i*3+1]=Math.sin(e)*405;P[i*3+2]=Math.cos(e)*Math.sin(a)*405}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));himmel.add(new THREE.Points(g,new THREE.PointsMaterial({color:q[2],size:q[1],sizeAttenuation:false,transparent:true,opacity:.95,fog:false,depthWrite:false})))});
  sonne.material.color.set(0xfffbee);sonne.scale.setScalar(.55);sonne.position.set(190,70,-150);
  erdeBauen();
  /* Komet, der langsam über den Himmel zieht */
  const ko=new THREE.Group();himmel.add(ko);const km=new THREE.MeshBasicMaterial({color:0xe8fbff,fog:false}),sm=new THREE.MeshBasicMaterial({color:0x8ad0ff,fog:false,transparent:true,opacity:.45,depthWrite:false,blending:THREE.AdditiveBlending});
  ko.add(new THREE.Mesh(new THREE.SphereGeometry(1.5,10,8),km));const sw=new THREE.Mesh(new THREE.ConeGeometry(1.5,22,10,1,true),sm);sw.rotation.z=-Math.PI/2;sw.position.x=11.5;ko.add(sw);
  lebendig.push({o:{userData:{anim:t=>{const u=(t*.022+.35)%1;ko.position.set(210-u*420,26+Math.sin(u*3.14)*34,-270);ko.rotation.z=-.25+u*.5}}},ph:0});
  /* kleine Satelliten ziehen vorbei */
  for(let i=0;i<5;i++){const s=new THREE.Group();himmel.add(s);s.add(new THREE.Mesh(new THREE.BoxGeometry(1.6,1.6,1.6),new THREE.MeshBasicMaterial({color:0xf2d080,fog:false})));[-1,1].forEach(q=>{const f=new THREE.Mesh(new THREE.BoxGeometry(3.4,1.2,.2),new THREE.MeshBasicMaterial({color:0x6a90e0,fog:false}));f.position.x=q*2.8;s.add(f)});
    lebendig.push({o:{userData:{anim:t=>{const a=t*(.018+i*.004)*(i%2?1:-1)+i*1.35;s.position.set(Math.sin(a)*240,18+i*13,-Math.cos(a)*240);s.rotation.y=-a;s.rotation.z=t*.2+i;s.scale.setScalar(.8+Math.max(0,Math.sin(t*2+i*2))*.35)}}},ph:0})}}
function erdeBauen(){const tx=erdTextur();const e=new THREE.Mesh(new THREE.SphereGeometry(17,36,24),new THREE.MeshBasicMaterial({map:tx,fog:false}));const g=new THREE.Group();g.position.set(-74,21,-232);g.rotation.z=.35;g.add(e);himmel.add(g);
  const schein=new THREE.Mesh(new THREE.SphereGeometry(18.4,30,20),new THREE.MeshBasicMaterial({color:0x6ab8ff,fog:false,transparent:true,opacity:.22,side:THREE.BackSide,depthWrite:false,blending:THREE.AdditiveBlending}));g.add(schein);
  e.rotation.y=-2.2;lebendig.push({o:{userData:{anim:t2=>{e.rotation.y=-2.2+t2*.02}}},ph:0})}
function kreisPlatz(x,z,r,mitte){scheibeW(r,.07,0xb4b0a2,x,.045,z,scene);scheibeW(r-.7,.08,FARBEN.platz,x,.05,z,scene);
  if(mitte==null)return;cyl(1.9,.4,METALL,x,.2,z,scene,true);cyl(1.6,.14,0x4a5476,x,.45,z,scene);
  if(mitte%3===0){felsK(x,z,.8,scene,0x6a6e80).position.y=1.1;glasK(1.5,1.7,x,.45,z)}else if(mitte%3===1){cyl(.14,2.6,METALL,x,1.7,z,scene);licht(.45,0xfff0b0,x,3.2,z,scene);for(let i=0;i<4;i++){const a=i*1.57;rohr(scene,[x,2.5,z],[x+Math.cos(a)*1.1,2.9,z+Math.sin(a)*1.1],.05,METALL);licht(.22,0x9ff4ff,x+Math.cos(a)*1.1,2.95,z+Math.sin(a)*1.1,scene)}}else{const g=grp(x,0,z);cyl(.12,1.2,METALL,0,1,0,g);const k=grp(0,2.3,0,g);mondkugel(k,.85);vm(k);leben(k,t=>{k.rotation.y=t*.4})}kreis(x,z,2.1)}
function etappe1(){
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(1300,1300),mat(STAUB));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
  hauptweg(5);
  SEITENWEGE.forEach(r=>weg(strasse(r),4));
  [-1,1].forEach(s=>weg(spl(ringseite(s),6),3.4));
  weg([[0,129],[0,122]],6,FARBEN.platz,.004);scheibeW(9,.06,FARBEN.platz,0,.04,123,scene);
  SEITENWEGE.forEach((r,i)=>{const px=wegX(r);kreisPlatz(px,roadZ(px,r),7.2,i)});
  [-1,1].forEach(s=>[94,44,-8,-58,-108,-154].forEach(r=>kreisPlatz(s*115,roadZ(s*115,r),4.2,null)));
  weg([[0,TORZ+2],[0,TORZ-16]],6,FARBEN.platz);scheibeW(18,.09,FARBEN.platz,0,.05,FEST.z,scene);liegend(ring(13,.18,ORANGE,0,.11,FEST.z,scene,0,56));
  /* ---------- Ausgang: Schleusentor mit zwei Flügeln ---------- */
  ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{cyl(1,6.4,WEISS,s*4.6,3.2,0,g,true);cyl(1.25,.5,DUNKEL,s*4.6,.25,0,g);[1.6,3.4,5.2].forEach(y=>cyl(1.04,.36,ORANGE,s*4.6,y,0,g));halbkugel(1.15,1,0x3b8fd4,s*4.6,6.4,0,g);licht(.34,0x7ff2ff,s*4.6,7.7,0,g)});
    box(10.4,1.5,.6,0x3a4670,0,6.15,0,g,true);box(10.6,.2,.8,ORANGE,0,7,0,g);[-3.6,-2.8,2.8,3.6].forEach(x=>licht(.16,0x7ff2c0,x,6.15,.34,g));
    const s=schildText('Ausgang','#e8f6ff',4.8,1.2);s.position.set(0,6.15,.34);g.add(s);
    const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.85,3.6,.25,HELLGRAU,s*-1.92,1.95,0,p,true);box(3.4,.4,.3,ORANGE,s*-1.92,3.2,0,p);box(3.4,.4,.3,ORANGE,s*-1.92,.7,0,p);const f=cyl(.62,.3,0x24345c,s*-1.92,1.95,0,p);f.rotation.x=Math.PI/2;ring(.66,.09,METALL,s*-1.92,1.95,.17,p,0,18);return p});
    kreis(-4.6,TORZ,1.25);kreis(4.6,TORZ,1.25);return {g,fl,offen:0}})();
  /* niedrige Lichtschranke entlang der Torlinie (zeigt, wo es noch nicht weitergeht) */
  for(let x=7;x<=178;x+=5.6)[-1,1].forEach(s=>{inst('rund',s*x,.7,TORZ,.2,1.4,.2,0x8d97ac);inst('hell',s*x,1.55,TORZ,.24,.24,.24,0x7ff2ff);if(x<173)inst('box',s*(x+2.8),1,TORZ,5.6,.14,.14,0xb8c4dc)});
  eingangBauen();festBauen()}
function eingangBauen(){const ez=110;
  [-1,1].forEach(s=>{const x=s*7.6;cyl(1.2,.5,DUNKEL,x,.25,ez,scene,true);cyl(.85,6,WEISS,x,3.2,ez,scene,true);[1.5,3.2].forEach(y=>cyl(.89,.34,s<0?BLAU:ORANGE,x,y,ez,scene));halbkugel(1.1,1,s<0?ORANGE:BLAU,x,6.2,ez,scene);cyl(.06,1,METALL,x,7.6,ez,scene);blink(x,8.2,ez,s<0?0x7ff2ff:ORANGE,.32,null,2.4);kreis(x,ez,1.25)});
  const bn=grp(0,0,ez);box(14,.4,.4,METALL,0,7.85,0,bn,true);box(12.4,1.9,.35,0x2a3668,0,6.85,0,bn);const t=String(CONFIG.spielname),s=schildText(t,'#fff6d8',11.8,1.5,t.length>26?34:t.length>18?44:60);s.position.set(0,6.85,.2);bn.add(s);
  for(let i=0;i<13;i++)licht(.15,[GELB,0x7ff2ff,0xff9ad0][i%3],-6+i,8.15,0,bn);vm(bn);bn.userData.keep=1;
  bn.position.y=-2.15;lebendig.push({o:{userData:{anim:()=>{const p=spieler.position,oben=Math.abs(p.x)<34&&p.z<125&&p.z>78;bn.position.y+=((oben?7.5:-2.15)-bn.position.y)*.12}}},ph:0});
  [-1,1].forEach(q=>cyl(.22,9.4,METALL,q*7.6,10.8,ez,scene));
  /* Pico begrüßt am Eingang, zweiter Helfer rollt herum */
  const w=grp(5.2,0,119.5);const p=picoBau(w);w.rotation.y=-.45;p.g.scale.setScalar(1.15);vm(p.kopf,p.arme[0],p.arme[1]);vm(p.g);leben(w,u=>{p.arme[1].rotation.z=2.4+Math.sin(u*4.5)*.45;p.kopf.rotation.y=Math.sin(u*.7)*.45;p.kopf.rotation.z=Math.sin(u*1.1)*.08},0);kreis(5.2,119.5,.85);
  helfer(bahn([[-9,126],[-3,117],[-12,115],[-14,124]]),1.2,3,2);
  steh(-5.6,119,.5,1,1.2,scene,-5.6,119);winker(-12,106,.3,4,scene);kreis(-12,106,.55);
  [[-9.5,121],[11,124.5],[-11,133],[10,134.5],[-15,110],[15,109]].forEach((q,i)=>lampe(q[0],q[1],3.4,i%2?0x9ff4ff:0xfff0b0));
  const g=grp(11.5,0,113);kiste(g,0,0,ORANGE,.4);kiste(g,1.3,.4,BLAU,-.2);kiste(g,.6,.2,HELLGRAU,.7,.8,.95);kreis(12.1,113.2,1.5);
  bank(scene,-12.5,128.5,1.8,ORANGE);sperrKasten(-12.5,128.5,.9,2.3,.23);drohne(0,5.5,103,9,4,.5,2)}
let SHOW=null;
function rundTex(){const c=document.createElement('canvas');c.width=c.height=32;const t=c.getContext('2d'),g=t.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'#fff');g.addColorStop(.5,'#fff');g.addColorStop(1,'#fff0');t.fillStyle=g;t.fillRect(0,0,32,32);return new THREE.CanvasTexture(c)}
function festBauen(){
  const z0=FEST.z-12.5;
  const b=grp(0,0,z0);box(19,1,6,0x3a4670,0,.5,0,b,true);box(19.4,.2,6.4,ORANGE,0,1.05,0,b);for(let i=0;i<17;i++)licht(.18,[GELB,0x7ff2ff,0xff9ad0,0x7ff2c0][i%4],-8.8+i*1.1,.55,3.1,b);
  [-9,9].forEach(x=>{gittermast(b,x,-2.2,.6,.5,9,METALL);[7.4,8.6].forEach((y,i)=>licht(.45,i?GELB:0x7ff2ff,x*.93,y,-1.5,b))});box(19.4,.5,.6,ORANGE,0,9.2,-2.2,b);
  box(14,5.6,.3,0x202a58,0,3.9,-2.6,b,true);for(let i=0;i<22;i++)licht(.09,0xfff6c0,-6.4+((i*37)%129)/10,1.8+((i*53)%48)/10,-2.4,b);
  box(10.6,2.9,.3,0xfff0b8,0,7.7,-2.45,b);const gs=schildText('Geschafft!','#fff0b0',10,2.5);gs.position.set(0,7.7,-2.27);b.add(gs);
  const p=picoBau(grp(0,1.1,.6,b));p.g.scale.setScalar(1.3);[-5.4,-3.2,3.2,5.4].forEach((x,i)=>{const m=astro(b,i*2+1,1.15);m.g.position.set(x,1.1,.2);m.al.rotation.z=-2.3;m.ar.rotation.z=i%2?2.4:.4});
  sperrKasten(0,z0,19.6,6.6,0);
  /* Zuschauerplätze, Lampen, Kisten */
  [-1,1].forEach(s=>{for(let i=0;i<3;i++){bank(scene,s*15.5,FEST.z-4+i*4.5,-s*1.5708,i%2?BLAU:ORANGE);sperrKasten(s*15.5,FEST.z-4+i*4.5,.9,2.3,0)}winker(s*19,FEST.z+1,-s*1.4,s<0?2:5,scene);kreis(s*19,FEST.z+1,.55);winker(s*18.5,FEST.z+7,-s*1.6,s<0?6:3,scene);kreis(s*18.5,FEST.z+7,.55);
    [[12,-18.5],[19,-9],[21,8],[12,15]].forEach((q,i)=>lampe(s*q[0],FEST.z+q[1],4,[0xfff0b0,0x9ff4ff,0xff9ad0,0xfff0b0][i]))});
  /* Startplatz hinter der Bühne mit zweiter Rakete (startet beim Finale) */
  const rx=14.5,rz=-229;scheibeW(5,.3,0x7a8296,rx,.15,rz,scene);liegend(ring(4.6,.14,ORANGE,rx,.33,rz,scene,0,30));kreis(rx,rz,4.2);
  const r=grp(rx,.3,rz);r.userData.keep=1;const rk=grp(0,0,0,r);raketeBau(rk,BLAU);rk.scale.setScalar(.82);vm(rk);
  const flamme=grp(0,0,0,r);[[0,1.1,5],[-1.8,.55,3],[1.8,.55,3]].forEach(q=>{[[1,0xff8a20,1],[.6,0xffd030,.72],[.3,0xfff6c0,.5]].forEach(f=>{const m=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:f[1],fog:false}));m.rotation.x=Math.PI;m.position.set(q[0],.4-q[2]*f[2]/2,0);m.scale.set(q[1]*f[0],q[2]*f[2],q[1]*f[0]);flamme.add(m)})});flamme.visible=false;
  const rauch=[];const rm=new THREE.MeshLambertMaterial({color:0xf2f2fa,transparent:true,opacity:.75,depthWrite:false});for(let i=0;i<16;i++){const m=new THREE.Mesh(gSph,rm);m.visible=false;m.userData.keep=1;scene.add(m);rauch.push(m)}
  /* Lichtkegel der Lichtershow */
  const kg=new THREE.CylinderGeometry(2.6,.25,30,14,1,true);kg.translate(0,15,0);const strahlen=[0xff5ab0,0x40d8ff,0xffe040,0x60ffb0,0xb070ff,0xff9040].map((f,i)=>{const m=new THREE.Mesh(kg,new THREE.MeshBasicMaterial({color:f,transparent:true,opacity:.2,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));m.position.set([-13,-8,-3,3,8,13][i],1,z0-1.4);m.visible=false;m.userData.keep=1;scene.add(m);return m});
  const NB=160,pos=new Float32Array(NB*3),col=new Float32Array(NB*3),cc=new THREE.Color();for(let i=0;i<NB;i++){cc.setHSL(i/NB*3%1,1,.65);col.set([cc.r,cc.g,cc.b],i*3)}const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.BufferAttribute(pos,3));bg.setAttribute('color',new THREE.BufferAttribute(col,3));
  const funk=new THREE.Points(bg,new THREE.PointsMaterial({size:.85,map:rundTex(),vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));funk.visible=false;funk.frustumCulled=false;scene.add(funk);
  SHOW={r,rk,rx,rz,flamme,rauch,strahlen,funk,pos,NB}}
/* Finale: Lichtershow und Raketenstart (die Engine ruft das jeden Moment des Finales auf) */
function FINALESCHAU(t){const S2=SHOW;if(!S2)return;
  S2.strahlen.forEach((m,i)=>{m.visible=true;m.rotation.z=Math.sin(t*(.9+i*.13)+i*1.7)*.65;m.rotation.x=Math.sin(t*(.6+i*.09)+i)*.35-.1;m.material.opacity=.09+.09*Math.abs(Math.sin(t*2.4+i*1.1))});
  S2.funk.visible=true;for(let i=0;i<S2.NB;i++){const a=i*.41+t*(i%2?.35:-.28),q=6+(i%13)*1.5,h=2+((i*.37+t*(.9+(i%5)*.12))%13);S2.pos[i*3]=Math.cos(a)*q;S2.pos[i*3+1]=h;S2.pos[i*3+2]=FEST.z-4+Math.sin(a)*q*.7}S2.funk.geometry.attributes.position.needsUpdate=true;
  const u=t%15,steigt=u>3,y=steigt?Math.min(130,(u-3)*(u-3)*.45):0;S2.r.position.set(S2.rx+(u>1.5&&u<4?Math.sin(t*45)*.06:0),.3+y,S2.rz);S2.flamme.visible=u>2;S2.flamme.scale.set(1,1+Math.sin(t*31)*.18,1);
  S2.rauch.forEach((m,i)=>{const v=((t*.55+i/16)%1);m.visible=u>1.5&&u<10;const a=i*.39*3.1;m.position.set(S2.rx+Math.cos(a)*(1.2+v*6),.6+v*2.4+(i%3)*.4,S2.rz+Math.sin(a)*(1.2+v*5));m.scale.setScalar((.5+v*2)*(u>8?(10-u)/2:1))})}
/* ==================== Landschaft zwischen den Orten ==================== */
/* Belegungsraster: Wege, Orte, Eingang, Festplatz sind besetzt */
const SG=new Uint8Array(181*196);
function sgMark(x,z,r){for(let j=Math.max(0,Math.floor((z-r+238)/2));j<=Math.min(195,Math.ceil((z+r+238)/2));j++)for(let i=Math.max(0,Math.floor((x-r+180)/2));i<=Math.min(180,Math.ceil((x+r+180)/2));i++){const cx=i*2-180,cz=j*2-238;if((cx-x)*(cx-x)+(cz-z)*(cz-z)<=r*r)SG[j*181+i]=1}}
function frei(x,z,r){r=r||0;const P=[[0,0],[r,0],[-r,0],[0,r],[0,-r],[r*.7,r*.7],[-r*.7,r*.7],[r*.7,-r*.7],[-r*.7,-r*.7]];return P.every((q,k)=>{if(k&&!r)return true;const i=Math.round((x+q[0]+180)/2),j=Math.round((z+q[1]+238)/2);return i>=0&&i<181&&j>=0&&j<196&&!SG[j*181+i]})}
function sgBauen(){WEGE.forEach(w=>{for(let k=0;k<w.length-1;k++){const a=w[k],b=w[k+1],n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/1.5));for(let i=0;i<=n;i++)sgMark(a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n,3.4)}});
  EXTRAZONEN.forEach(e=>sgMark(e.x,e.z,e.r-.5));sgMark(0,123,13);sgMark(0,110,10);sgMark(0,TORZ,9);sgMark(0,FEST.z,23);sgMark(14.5,-229,7);SEITENWEGE.forEach(r=>sgMark(wegX(r),roadZ(wegX(r),r),9));[-1,1].forEach(s=>SEITENWEGE.forEach(r=>sgMark(s*115,roadZ(s*115,r),5.5)))}
function zuf(fn,anz,r,x0,x1,z0,z1){let k=0,t=0;x0=x0==null?-176:x0;x1=x1==null?176:x1;z0=z0==null?TORZ+3:z0;z1=z1==null?144:z1;while(k<anz&&t++<anz*25){const x=x0+nr()*(x1-x0),z=z0+nr()*(z1-z0);if(!frei(x,z,r))continue;fn(x,z,k);k++}}
/* kleine Stationen in den Zwischenräumen: damit nirgends eine leere Fläche bleibt */
function kleinstation(x,z,art){const g=grp(x,0,z),rot=nr()*6.28,f=ANZUG[1+art%7];g.rotation.y=rot;
  if(art===0){kiste(g,-.7,0,f,.2);kiste(g,.7,.2,HELLGRAU,-.3);kiste(g,0,.1,BLAU,.6,.75,.95);if(nr()>.5)fass(g,.3,-1.3,f,.8);kreis(x,z,1.7)}
  else if(art===1){cyl(.1,3.4,METALL,0,1.7,0,g,true);box(.8,.5,.5,WEISS,0,.8,.2,g);licht(.07,0x7ff2c0,0,.95,.47,g);const d=grp(0,3.45,0,g);box(1.5,.06,.06,METALL,0,0,0,d);[-.75,.75].forEach(q=>sph(.2,f,q,0,0,d));sph(.14,METALL,0,.15,0,d);vm(d);leben(d,t=>{d.rotation.y=t*1.3});kreis(x,z,.55)}
  else if(art===2){cyl(1.3,.9,WEISS,0,.55,0,g,true);halbkugel(1.3,1,f,0,1,0,g);bullauge(g,0,.62,1.3,.36,0xffe9a8);cyl(1.38,.2,DUNKEL,0,.1,0,g);cyl(.04,.9,METALL,0,2.4,0,g);licht(.12,ROT,0,2.9,0,g);kreis(x,z,1.55)}
  else if(art===3){solarpaneel(g,-1.1,0,2,0);solarpaneel(g,1.1,0,2,0);box(.7,.6,.5,f,0,.3,-1,g);sperrKasten(x,z,4.6,2.2,rot)}
  else if(art===4){schuessel(g,0,0,1.05,1.7,nr()>.5?.4:0,nr()>.5?WEISS:0xffe0b0);box(1,.7,.7,f,1.2,.35,0,g,true);licht(.08,0x7ff2ff,1.2,.5,.37,g);kreis(x,z,.8);const c2=Math.cos(rot),s2=Math.sin(rot);kreis(x+1.2*c2,z-1.2*s2,.7)}
  else if(art===5){const r=roverBau(g,f);r.scale.setScalar(.72);sperrKasten(x,z,2.5,1.8,rot)}
  else if(art===6){[-.55,.55].forEach((q,i)=>{cyl(.42,2.2,i?WEISS:0x9ad8f8,q,1.2,0,g,true);sph(.42,i?WEISS:0x9ad8f8,q,2.3,0,g,1,.6,1);cyl(.45,.16,f,q,1.6,0,g);cyl(.1,.3,METALL,q,2.65,0,g)});box(2.1,.2,1,DUNKEL,0,.1,0,g);kreis(x,z,1.25)}
  else if(art===7){bank(g,0,0,0,f);lampe(0,0,2.8,0xfff0b0,g).position.set(1.8,0,0);cyl(.3,.7,TUERKIS,-1.6,.35,0,g,true);cyl(.34,.1,DUNKEL,-1.6,.75,0,g);sperrKasten(x,z,4.4,1,rot)}
  else if(art===8){const m=astro(g,Math.floor(nr()*8),1.15);m.al.rotation.x=-.9;box(.6,.5,.5,METALL,-.2,.25,.9,g);cyl(.05,1.2,METALL,1,.6,.4,g);box(.3,.25,.4,f,1,1.3,.4,g);licht(.07,0x7ff2ff,1,1.3,.63,g);kreis(x,z,1.35)}
  else{[[0,0,1.5],[-1.4,.6,.9],[1.2,.9,.75],[.4,-1.3,.85]].forEach(q=>felsK(q[0],q[1],q[2],g));[[.9,-.6],[-.8,-.8],[.2,1.4]].forEach((q,i)=>cone(.18,.9+i*.25,[0xd8c0ff,0xb0ecff,0xffd8b0][i],q[0],.45+i*.1,q[1],g));kreis(x,z,2)}}
/* Verbindungsröhre über einem Querweg: Rippen zum Durchlaufen */
function roehrenTunnel(x0,x1,r,farbe){const n=Math.round((x1-x0)/2.2),P=[];for(let i=0;i<=n;i++){const x=x0+(x1-x0)*i/n;P.push([x,roadZ(x,r)])}
  P.forEach((p,i)=>{const a=P[Math.max(0,i-1)],b=P[Math.min(n,i+1)],w=-Math.atan2(b[1]-a[1],b[0]-a[0]);const m=ring(3.1,i%n?.09:.24,i%n?0xd8e0f0:farbe,p[0],.1,p[1],scene,Math.PI,18);m.rotation.y=w+Math.PI/2;
    if(i<n){const q=P[i+1];[[0,3.2],[1.9,2.55],[-1.9,2.55]].forEach(s=>rohr(scene,[p[0],s[1],p[1]+s[0]],[q[0],s[1],q[1]+s[0]],.07,s[0]?farbe:0xd8e0f0))}if(i%2===0)licht(.14,0xfff6c8,p[0],3.05,p[1],scene)});
  [-3.15,3.15].forEach(dz=>{for(let i=0;i<n;i++)sperrLinie(P[i][0],P[i][1]+dz,P[i+1][0],P[i+1][1]+dz,.15)});sgMark((x0+x1)/2,roadZ((x0+x1)/2,r),5)}
/* niedrige Leitung auf Stützen, nur auf freien Stücken */
function leitung(x1,z1,x2,z2,farbe){const n=Math.ceil(Math.hypot(x2-x1,z2-z1)/3);for(let i=0;i<=n;i++)if(!frei(x1+(x2-x1)*i/n,z1+(z2-z1)*i/n,1))return false;rohr(scene,[x1,.8,z1],[x2,.8,z2],.34,farbe);
  for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n,z=z1+(z2-z1)*i/n;inst('box',x,.35,z,.3,.7,.5,0x6a7288,-Math.atan2(z2-z1,x2-x1));if(i%3===0)inst('kugel',x,.8,z,.5,.5,.5,0xdde4f0)}sperrLinie(x1,z1,x2,z2,.4);sgMark((x1+x2)/2,(z1+z2)/2,1.5);for(let i=0;i<=n;i++)sgMark(x1+(x2-x1)*i/n,z1+(z2-z1)*i/n,2.2);return true}
function landschaft(){
  /* Röhrentunnel auf den Querwegen */
  [[-72,-58,94,ORANGE],[56,72,94,TUERKIS],[-34,-18,44,BLAU],[58,72,-8,ORANGE],[-74,-60,-58,TUERKIS],[20,34,-108,LILA],[-30,-16,-154,ORANGE],[124,134,44,BLAU]].forEach(t=>roehrenTunnel(t[0],t[1],t[2],t[3]));
  /* Straßenlampen, Bänke und Markierungsstäbe entlang der Wege */
  SEITENWEGE.forEach((r,ri)=>{for(let x=-150;x<=(r===-154?128:150);x+=14){if(Math.abs(x-wegX(r))<10||Math.abs(Math.abs(x)-115)<6)continue;const s=((Math.round(x/14)+ri)%2)?1:-1,z=roadZ(x,r)+s*3.6;if(EXTRAZONEN.some(e=>Math.hypot(e.x-x,e.z-z)<e.r))continue;
      const art=Math.abs(Math.round(x/14)*3+ri)%5;if(WEGE.slice(10).some(w=>w.some(p=>Math.hypot(p[0]-x,p[1]-z)<3.2)))continue;
      if(art<3){inst('rund',x,1.3,z,.09,2.6,.09,0x9aa4b8);inst('rund',x,.1,z,.3,.2,.3,0x4a4f5e);inst('hell',x,2.72,z,.28,.24,.28,[0xfff0b0,0x9ff4ff,0xffd0a0][art]);inst('platte',x,2.98,z,.34,.07,.34,0xf0f2f8);kreis(x,z,.3)}
      else if(art===3){bank(scene,x,z+s*.5,s>0?Math.PI:0,ANZUG[1+(ri+Math.abs(x))%7|0]||BLAU);sperrKasten(x,z+s*.5,2.3,.9,0)}
      else{inst('rund',x,.8,z,.06,1.6,.06,0xdde2ee);inst('box',x+.35,1.4,z,.7,.45,.05,[ORANGE,TUERKIS,ROT][ri%3]);kreis(x,z,.2)}}});
  for(let z=104;z>TORZ+6;z-=11){[-1,1].forEach(s=>{const x=wegX(z)+s*4.4;if(SEITENWEGE.some(r=>Math.abs(z-r)<10)||EXTRAZONEN.some(e=>Math.hypot(e.x-x,e.z-z)<e.r))return;if((Math.round(z/11)+(s>0?0:1))%2)return;inst('rund',x,1.6,z,.11,3.2,.11,0xdde2ee);inst('rund',x,.12,z,.36,.24,.36,0x4a4f5e);inst('hell',x,3.4,z,.36,.3,.36,s>0?0x9ff4ff:0xfff0b0);kreis(x,z,.35)})}
  [-1,1].forEach(s=>{for(let z=86;z>-148;z-=10){const x=s*(121+((z/10|0)%2?1.4:0));if(SEITENWEGE.some(r=>Math.abs(z-r)<7)||EXTRAZONEN.some(e=>Math.hypot(e.x-x,e.z-z)<e.r))continue;inst('rund',x,.5,z,.1,1,.1,0xdde2ee);inst('hell',x,1.1,z,.2,.2,.2,z%20?0xff9ad0:0x7ff2c0);kreis(x,z,.2)}});
  /* Leitungen auf freien Stücken */
  let nl=0;for(let t=0;t<900&&nl<26;t++){const x=-170+nr()*340,z=TORZ+8+nr()*320,q=nr()>.5,l=8+nr()*14;if(Math.abs(x)<18)continue;if(leitung(x,z,x+(q?l:l*.2),z+(q?l*.15:l),[0xd8dee8,ORANGE,0x5ab0e8,0xd8dee8][nl%4]))nl++}
  /* kleine Stationen */
  let ns=0;zuf((x,z)=>{kleinstation(x,z,ns%10);sgMark(x,z,4.4);ns++},150,3.4,-168,168,TORZ+7,140);
  /* Krater (flach, man kann darüber laufen) */
  zuf((x,z,k)=>{const r=1+nr()*nr()*3;if(!frei(x,z,r*.8)||!flachFrei(x,z,r*1.2))return;krater(x,z,r,[0xc3c7d2,0xd0cdd8,0xb8bcc8][k%3]);sgMark(x,z,r*.8)},300,2);
  /* Felsen (fest) und Felsgruppen */
  zuf((x,z,k)=>{const r=.9+nr()*.9;inst('fels',x,r*.45,z,r*1.2,r*.85,r,FELSF[k%5],nr()*6,nr()*.3);inst('fels',x+r*1.05,r*.2,z+.3,r*.55,r*.45,r*.55,FELSF[(k+2)%5],nr()*6);if(k%3===0)inst('fels',x-r*.8,r*.15,z+r*.6,r*.4,r*.3,r*.4,FELSF[(k+3)%5],nr()*6);kreis(x,z,r*1.15);sgMark(x,z,r*1.4)},330,1.6);
  /* Geröll, Kiesel, Staubflecken */
  zuf((x,z,k)=>{const r=.22+nr()*.32;inst('stein',x,r*.4,z,r,r*.7,r*.85,FELSF[k%5],nr()*6)},2000,.4);
  zuf((x,z,k)=>{const r=.08+nr()*.14;inst('kies',x,r*.4,z,r,r*.7,r,[0x7a7e8a,0xc8ccd6,0x8a8690][k%3],nr()*6)},3200);
  {let np=0;for(let t=0;t<9000&&np<300;t++){const x=-176+nr()*352,z=TORZ+3+nr()*(141-TORZ),q=1.2+nr()*nr()*3.6;if(!flachFrei(x,z,q)||!frei(x,z,q*.7))continue;FLACH.push([x,z,q]);inst('platte',x,.008,z,q,.008,q,[0xa6aab8,0xb6bac8,0xaca2b8,0x92a4bc,0xbcae9e][np%5],nr()*6);np++}}
  /* leuchtende Kristalle und kleine Lichtpilze aus Metall (Bodenleuchten) */
  zuf((x,z,k)=>{kreis(x,z,.45);for(let i=0;i<3;i++){const h=.5+nr()*.7;inst('kegel',x+Math.cos(i*2.1)*.35,h*.45,z+Math.sin(i*2.1)*.35,.17,h,.17,[0xcab0ff,0x9ae8ff,0xffd0a0,0xffb0d8][k%4],nr()*3,(i-1)*.25,i===1?.3:-.1)}},150,.8);
  zuf((x,z,k)=>{inst('rund',x,.22,z,.07,.44,.07,0x6a7288);inst('hell',x,.5,z,.17,.12,.17,[0xfff0b0,0x9ff4ff,0xff9ad0,0x7ff2c0][k%4])},320,.5);
  /* bunte Fracht und Markierungen zwischen den Orten */
  zuf((x,z,k)=>{const f=ANZUG[1+k%7],f2=ANZUG[1+(k+3)%7],a=nr()*6,c=Math.cos(a),s2=Math.sin(a);
    if(k%3===0){inst('box',x,.45,z,1.1,.9,.9,f,a);inst('box',x,.93,z,1.2,.1,1,0xdde2ee,a);inst('box',x+c*1.15,.35,z-s2*1.15,.8,.7,.7,f2,a+.4);kreis(x+c*.55,z-s2*.55,1.25)}
    else if(k%3===1){[[0,0,f],[.95,.15,f2],[.4,.8,f]].forEach(q=>{inst('rund',x+q[0],.55,z+q[1],.42,1.1,.42,q[2]);inst('platte',x+q[0],1.12,z+q[1],.45,.08,.45,0xdde2ee)});kreis(x+.45,z+.35,1.15)}
    else{inst('rund',x,1.1,z,.07,2.2,.07,0xdde2ee);inst('box',x+.5,1.85,z,1,.65,.06,f);inst('box',x+.5,1.85,z,1.02,.16,.08,0xffffff);inst('rund',x,.1,z,.3,.2,.3,0x4a4f5e);kreis(x,z,.35)}sgMark(x,z,2.2)},150,1.9);
  /* Fußspuren neben den Wegen */
  WEGE.forEach((w,wi)=>{if(wi%2)return;for(let k=3;k<w.length-2;k+=5){const a=w[k],b=w[k+1],l=Math.hypot(b[0]-a[0],b[1]-a[1])||1,tx=(b[0]-a[0])/l,tz=(b[1]-a[1])/l;for(let i=0;i<4;i++){const q=3.1+(i%2)*.34,x=a[0]-tz*q+tx*i*.6,z=a[1]+tx*q+tz*i*.6;inst('box',x,.014,z,.24,.012,.42,0x8a8e9c,Math.atan2(tx,tz))}}});
  /* Hügel und Bergketten am Rand */
  for(let i=0;i<150;i++){const seite=i%4,u=nr(),r=8+nr()*13,aus=nr()*20,x=seite===0?-(182+r*1.35)-aus:seite===1?182+r*1.35+aus:-215+u*430,z=seite===2?GRENZE.z1+10+r+aus:seite===3?-(237+r)-aus:-245+u*410;inst('fels',x,r*.08,z,r*1.3,r*(.35+nr()*.4),r,[0x888c9a,0x989aa8,0x7c8090,0xa4a2b0][i%4],nr()*6)}
  for(let i=0;i<200;i++){const seite=i%4,u=nr(),x=seite===0?-178+nr()*2:seite===1?178-nr()*2:-176+u*352,z=seite===2?147-nr()*3:seite===3?-232+nr()*2:-230+u*374;if((Math.abs(x)<24&&z<-190)||(Math.abs(x)<10&&z>130))continue;const r=1+nr()*2.2;inst('fels',x,r*.4,z,r*1.2,r,r,FELSF[i%5],nr()*6);if(z>TORZ-2)kreis(x,z,r*1.05)}
  /* Nordfläche hinter dem Tor */
  zuf((x,z,k)=>{const r=.4+nr()*1.3;inst('fels',x,r*.4,z,r,r*.75,r,FELSF[k%5],nr()*6)},130,2,-170,170,-232,TORZ-3);
  [[-70,-210],[-120,-206],[72,-212],[124,-208],[-40,-226],[48,-224],[-150,-220],[152,-224]].forEach((p,i)=>{const g=grp(p[0],0,p[1]);if(i%2){kuppelhaus(g,0,0,3.4,WEISS,ANZUG[1+i%7])}else{schuessel(g,0,0,2.4,2.8,.2)}kreis(p[0],p[1],4)})}
/* ==================== Bewegung: Astronautinnen und Astronauten, Fahrzeuge, Roboter, Drohnen ==================== */
function bewegung(){
  /* Fahrzeuge und Figuren weichen der Mitte der Kreuzplätze aus; quer: 1 = Weg läuft in x-Richtung */
  const um=(P,quer)=>P.map(p=>{for(const r of SEITENWEGE){const cx=wegX(r),cz=roadZ(cx,r),d=quer?p[0]-cx:p[1]-cz;if(Math.abs(d)<5.5&&Math.hypot(p[0]-cx,p[1]-cz)<5.5){const q=Math.sqrt(30.25-d*d);return quer?[p[0],cz+q]:[cx+q,p[1]]}}return p});
  const sp=pts=>spl(pts,1.6),str=(r,x0,x1)=>um(sp(strasse(r)),1).filter(p=>p[0]>=x0&&p[0]<=x1),hw=(a,b)=>um(sp(Array.from({length:34},(_,i)=>{const z=104-i*8.8;return[wegX(z),z]})),0).filter(p=>p[1]<=a&&p[1]>=b),ri=(s,a,b)=>sp(ringseite(s)).filter(p=>p[1]<=a&&p[1]>=b);
  let k=0;const geh=(r,o,anz,v)=>{if(r.length<4)return;const B=pendel(r,o);for(let j=0;j<anz;j++){laeufer(B,(v||1.6)+(k%4)*.25,B.L*j/anz+(k%3)*7,k);k++}};
  /* Querwege, je zwei Abschnitte, mit Kreuzplatz in der Mitte frei */
  SEITENWEGE.forEach((r,i)=>{geh(str(r,-108,-13),1.2,i<4?2:1);geh(str(r,13,r===-154?108:108),1.2,i<4?2:1);if(i<5)geh(str(r,i%2?-152:120,i%2?-120:152),1.1,1,1.3)});
  geh(hw(86,50),1.5,2);geh(hw(36,-2),1.5,1);geh(hw(-16,-52),1.5,2);geh(hw(-66,-100),1.5,1);geh(hw(-116,-148),1.5,2);
  [-1,1].forEach(s=>{geh(ri(s,92,-6),1.1,2);geh(ri(s,-10,-152),1.1,2)});
  /* Rover auf den Wegen */
  [[str(94,-150,150),GELB],[str(-8,-150,150),ORANGE],[str(-108,-150,150),0x8ad0f0],[ri(-1,92,-152),WEISS],[ri(1,92,-152),0xf07aa8],[str(-154,-136,132),LILA],[str(44,-150,150),TUERKIS]].forEach((q,i)=>{if(q[0].length<4)return;roverFahrt(pendel(q[0],.9),3.2+(i%3)*.6,i*53,q[1],.62)});
  /* Helfer-Roboter */
  [str(69-25,-100,-20),str(-58,20,100),str(-58,-100,-20),str(-8,20,100),str(94,20,100),hw(20,-40),hw(100,40),str(-108,-100,-20),str(44,20,104),str(-154,-100,100)].forEach((r,i)=>{if(r.length<4)return;helfer(pendel(r,1.7),1.3+(i%3)*.3,i*31,i)});
  /* Drohnen */
  [[0,106],[-66,70],[66,44],[0,18],[-114,-8],[66,-60],[0,-84],[-64,-108],[114,-108],[0,-154],[-114,44],[66,-154],[-20,-132],[20,106],[-66,-154],[116,18]].forEach((p,i)=>drohne(p[0],3.2+(i%3)*.8,p[1],7+(i%4)*2,5+(i%3),(.25+(i%4)*.07)*(i%2?1:-1),i));
  /* hüpfende Astronauten (auf dem Mond springt man weit) */
  [[-66,88],[66,54],[-20,-20],[20,-68],[-115,-30],[66,-182]].forEach((p,i)=>{let x=p[0],z=p[1],o=0;while(!frei(x,z,1.8)&&o<60){o++;x=p[0]+Math.cos(o)*o*.35;z=p[1]+Math.sin(o)*o*.35}const g=grp(x,0,z),m=astro(g,i+2,1.15);g.rotation.y=nr()*6;vm(m.g,m.al,m.ar);sgMark(x,z,2);leben(g,t=>{const u=(t*.42+i*.17)%1,h=u<.72?Math.sin(u/.72*3.1416):0;g.position.y=h*2.4;m.al.rotation.z=-h*2.2;m.ar.rotation.z=h*2.2})})}
/* Parade beim Finale: Pico, Astronautinnen und Astronauten, Rover, Roboter */
function paradeBauen(){
  const fig=k=>p=>{const w=grp(0,0,0,p);const m=astro(w,k,1.45);m.g.rotation.y=Math.PI/2;vm(m.g,m.bl,m.br,m.al,m.ar);w.userData.anim=t=>{const q=Math.sin(t*6)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q;m.al.rotation.z=-2.2-Math.sin(t*5)*.3;m.ar.rotation.z=2.2+Math.cos(t*5)*.3};return w};
  const pico=(f,a,s)=>p=>{const w=grp(0,0,0,p);const q=picoBau(w,f,a);q.g.rotation.y=Math.PI/2;q.g.scale.setScalar(s);vm(q.kopf,q.arme[0],q.arme[1]);vm(q.g);w.userData.anim=t=>{q.arme[0].rotation.x=Math.sin(t*5)*1.4;q.arme[1].rotation.x=-Math.sin(t*5)*1.4;q.kopf.rotation.y=Math.sin(t*3)*.6};return w};
  const rov=f=>p=>{const w=grp(0,0,0,p);roverBau(w,f,.8);vm(w);return w};
  const liste=[pico(0xf4f6fa,ORANGE,1.6),fig(1),rov(GELB),fig(2),pico(0x8ad0f0,BLAU,1.1),fig(3),fig(4),rov(0x8ad0f0),pico(0xffd23e,DUNKEL,1.1),fig(5),fig(6),rov(0xf07aa8),pico(0xd8c0ff,LILA,1.1),fig(7)];
  liste.forEach((f,i)=>{const o=f(scene);o.position.set(-20-i*3.8,0,FEST.z+2);parade.push({o,i})})}
function weltBauen(){
  /* Leistung: gröbere Grundformen (Kugel 8x6, Zylinder 8, Kegel 7) für alle Teile dieser Welt */
  gSph.copy(new THREE.SphereGeometry(1,8,5));gCyl.copy(new THREE.CylinderGeometry(1,1,1,8));gCone.copy(new THREE.ConeGeometry(1,1,7));
  FARBEN={boden:STAUB,pfad:0xcbc5b2,platz:0xd6d0be,gehege:0x9a9eaa};
  himmelBauen();etappe1();
  [ort1,ort2,ort29,ort39,ort38,ort13,ort3,ort4,ort5,ort6,ort9,ort16,ort7,ort8,ort10,ort11,ort28,ort27,ort17,ort18,ort12,ort14,ort37,ort33,ort21,ort22,ort15,ort25,ort26,ort19,ort20,ort31,ort32,ort30,ort34,ort23,ort35,ort36,ort24,ort40].forEach(f=>f());
  sgBauen();landschaft();bewegung();durchsichtStart();
  instFlush();glasFlush();sichtweite()}
