/* Welt: Burg und Mittelalterstadt (Kennwort mittelalter). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Sonniger Sommertag im Mittelalter: Dorf, Mühlen und Felder im Süden, ein Fluss, dahinter die ummauerte Stadt mit Markt, Kirche und Handwerkern, im Norden die Burg mit Bergfried, Graben und Turnierplatz. Die Höhe der Burg ist nur optisch (Boden bleibt eben). Fast alle Gebäude, Mauern, Bäume und Felder sind instanziert (wenige Zeichenaufrufe). */
/* Schilder: keine Hinweisschilder (Wunsch der Lehrkraft, 24.11.2026). Nur Ausgang, Geschafft!, Spielname und Zahlen-Schilder der Rätsel. */
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Burgfalke Falko';
const START={x:0,z:128};
const VERTEXFARBEN=true,MERGEZELLE=70,FERNBESUCHER=65,FERNLEBEN=92;
const ZOOMMAX=45;
/* Sammelstücke: mögliche Verstecke der 5 Edelsteine (abseits der Wege, hinter Häusern und in Ecken). Die Engine lost bei jedem neuen Spiel 5 davon aus. */
const SAMMELPOOL=[
  {x:-99,z:134,ort:'Schafweide'},
  {x:-70,z:118,ort:'Bauerndorf'},
  {x:58,z:107,ort:'Weinberg'},
  {x:103,z:104,ort:'Windmühle'},
  {x:-121,z:106,ort:'Fischerhafen'},
  {x:168,z:55,ort:'Wassermühle'},
  {x:-162,z:11,ort:'Pilger-Rastplatz'},
  {x:164,z:0,ort:'Spielplatz'},
  {x:-19,z:-116,ort:'Falknerei'},
  {x:-102,z:31,ort:'Waschbrunnen'},
  {x:24,z:27,ort:'Gaukler-Platz'},
  {x:83,z:35,ort:'Gasthaus'},
  {x:-36,z:1,ort:'Rathaus'},
  {x:32,z:3,ort:'Stadtkirche'},
  {x:-102,z:-26,ort:'Bäckerei'},
  {x:-71,z:-32,ort:'Schmiede'},
  {x:48,z:-21,ort:'Weberei'},
  {x:-97,z:-47,ort:'Zimmerei'},
  {x:101,z:-45,ort:'Kloster'},
  {x:29,z:-105,ort:'Burgküche'},
  {x:-45,z:-124,ort:'Stall'},
  {x:-60,z:-158,ort:'Burggarten'},
  {x:45,z:-135,ort:'Rittersaal'},
  {x:113,z:-154,ort:'Turnierplatz'},
  {x:-119,z:-125,ort:'Zeltlager'}
];
const BEREICHE={
  eingang:{name:'Dorfeingang',x:0,z:134,plaetze:[]}
};
/* 38 Orte (dazu der Dorfeingang). Wasserzonen ('Fluss', 'Graben', 'Bach' kommen oft vor und zählen nicht als Ort) halten nur die Rätsel aus dem Wasser. */
const EXTRAZONEN=[
  {name:'Schäfer mit Schafweide',x:-96,z:116,r:15},{name:'Bauerndorf',x:-50,z:118,r:16},{name:'Weinberg und Obstgarten',x:50,z:118,r:16},{name:'Windmühle und Getreidefeld',x:98,z:114,r:16},{name:'Fischerhafen am Fluss',x:-132,z:100,r:11},
  {name:'Stadttor und Stadtmauer',x:11,z:60,r:9},{name:'Wassermühle am Mühlbach',x:158,z:58,r:12},{name:'Pilger-Rastplatz mit Kreuz',x:-158,z:14,r:11},{name:'Mittelalter-Spielplatz',x:158,z:-6,r:12},{name:'Kräuterfrau am Waldrand',x:-158,z:-44,r:13},
  {name:'Waschbrunnen mit Waschfrauen',x:-92,z:32,r:9},{name:'Marktstände',x:-36,z:32,r:10},{name:'Gaukler-Platz',x:36,z:34,r:10},{name:'Gasthaus „Zum Bären“',x:92,z:32,r:9},
  {name:'Rathaus',x:-38,z:10,r:11},{name:'Marktplatz mit Brunnen',x:0,z:14,r:12},{name:'Stadtkirche',x:44,z:8,r:12},
  {name:'Bäckerei',x:-96,z:-24,r:8},{name:'Schmiede',x:-68,z:-24,r:9},{name:'Töpferei',x:-42,z:-24,r:8},{name:'Weberei und Färberei',x:42,z:-24,r:9},{name:'Schusterei und Gerberei',x:68,z:-24,r:9},{name:'Apotheke und Kräuterhaus',x:96,z:-24,r:8},
  {name:'Zimmerei und Holzfällerplatz',x:-88,z:-48,r:10},{name:'Glockengießerei',x:-50,z:-48,r:8},{name:'Spielleute-Bühne',x:50,z:-48,r:9},{name:'Kloster mit Schreibstube',x:88,z:-50,r:11},
  {name:'Burgtor mit Zugbrücke und Wassergraben',x:0,z:-97,r:10},{name:'Stall und Reitplatz',x:-52,z:-114,r:11},{name:'Falknerei',x:-22,z:-110,r:7},{name:'Burgküche',x:24,z:-110,r:8},{name:'Burgkapelle',x:54,z:-114,r:9},
  {name:'Burghof',x:0,z:-134,r:13},{name:'Burggarten',x:-50,z:-142,r:10},{name:'Rittersaal',x:50,z:-148,r:13},{name:'Bergfried',x:-48,z:-166,r:9},
  {name:'Turnierplatz',x:120,z:-138,r:17},{name:'Ritter-Zeltlager',x:-118,z:-138,r:15}
];
/* Flussverlauf (Mitte) und Mühlbach; Wasserzonen für Spielfeld-Freihaltung */
const RIO=[];for(let x=-200;x<=200;x+=20)RIO.push([x,76+4*Math.sin(x*.035)]);
const RW=9;
const KARTENFLUSS={pts:RIO,w:RW};
const BACH=[[128,74],[136,70],[144,64],[152,61],[162,60],[172,61],[180,64]];
for(let x=-176;x<=176;x+=14)EXTRAZONEN.push({name:'Fluss',x:x,z:76+4*Math.sin(x*.035),r:7});
BACH.forEach(p=>EXTRAZONEN.push({name:'Bach',x:p[0],z:p[1],r:4}));
/* Burg: Mauer x -70..70, z -176..-96; Graben außen bis 79 / -87 / -185 */
const BX=70,BZ0=-96,BZ1=-176,GR=79;
(function(){const add=(x,z)=>EXTRAZONEN.push({name:'Graben',x:x,z:z,r:5});
  for(let x=-74;x<=74;x+=8){add(x,BZ0+4.5+0);add(x,BZ1-4.5)}for(let z=-92;z>=-180;z-=8){add(-74.5,z);add(74.5,z)}})();
const WS=[];
const SEITENWEGE=[94,44,-8,-58,-80];
const WEGBOGEN=11;
const GRENZE={x0:-180,x1:180,z0:-236,z1:148};
const TORZ=-190, FEST={x:0,z:-212};
let FARBEN,WASSER,ausgang;
const BPTS=[[0,128],[0,100],[0,60],[0,20],[0,-20]];
const ZN=n=>EXTRAZONEN.find(e=>e.name===n);

function pfad(x1,z1,x2,z2,w,farbe){weg(wellen(x1,z1,x2,z2),w,farbe)}
const gDisc=new THREE.CylinderGeometry(1,1,1,28);
function scheibe(x,z,r,farbe,h){h=h||.12;const c=mesh(gDisc,farbe,x,h/2,z,r,h,r,scene);c.receiveShadow=true;return c}
function wasserRund(x,z,r,farbe,dy){const w=mesh(gDisc,farbe,x,.1+(dy||0),z,r,.18,r,scene);w.receiveShadow=true;return w}
function bewegt(teil,fn){teil.userData.keep=1;lebendig.push({o:{userData:{anim:fn}},ph:0})}
function leben(g,ph){lebendig.push({o:g,ph:ph||rnd()*6})}
let GLAS;
function glas(w,h,d,x,y,z,par){GLAS=GLAS||new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.28,depthWrite:false});const m=new THREE.Mesh(gBox,GLAS);m.position.set(x,y,z);m.scale.set(w,h,d);(par||scene).add(m);return m}
function bank(x,z,rot){const g=grp(x,0,z);box(2.4,.15,.8,0x9a5a30,0,.7,0,g,true);box(2.4,.7,.1,0x9a5a30,0,1.1,-.35,g);box(.12,.7,.7,0x6a4220,-1,.35,0,g);box(.12,.7,.7,0x6a4220,1,.35,0,g);g.rotation.y=rot||0;kreis(x,z,1.2);return g}
function laterne(x,z){const g=grp(x,0,z);cyl(.08,3.4,0x3a4a56,0,1.7,0,g,true);const l=new THREE.Mesh(gSph,new THREE.MeshBasicMaterial({color:0xfff0b8}));l.position.y=3.5;l.scale.setScalar(.35);g.add(l);kreis(x,z,.3)}
function kuebel(x,z){const g=grp(x,0,z);cyl(.6,.7,0x9a5a30,0,.35,0,g,true);cyl(.5,.1,0x4a3220,0,.72,0,g);if(!WINTER){const f=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0];for(let i=0;i<6;i++)blume(x-.3+(i%3)*.3,z-.2+Math.floor(i/3)*.4,f[i%5])}kreis(x,z,.7)}
function kanne(x,z){const g=grp(x,0,z);cyl(.38,1,0xc4cad0,0,.5,0,g,true);cyl(.28,.25,0xc4cad0,0,1.1,0,g);cyl(.42,.1,0xe0605a,0,.9,0,g);kreis(x,z,.5)}
function tonne(x,z){cyl(.5,1,0x8a5a32,x,.5,z,scene,true);cyl(.52,.1,0x4a3220,x,.7,z,scene);kreis(x,z,.55)}
function trog(x,z,rot,wasser){const g=grp(x,0,z);box(2.2,.5,.8,0x8a5a32,0,.25,0,g,true);box(1.9,.1,.5,wasser||0x4aa3d8,0,.5,0,g);g.rotation.y=rot||0;kreis(x,z,1.1)}
function kiste(x,z,fr,par){const g=grp(x,0,z,par);box(1.2,.4,.8,0xa8743f,0,.2,0,g,true);for(let i=0;i<4;i++)sph(.22,fr,-.42+i*.28,.5,(i%2-.5)*.3,g);return g}
function rauch(par,x,y,z){const g=grp(x,y,z,par);const ps=[0,1,2,3].map(i=>sph(.5,0xf2f2f2,0,0,0,g));bewegt(g,t=>{ps.forEach((p,i)=>{const f=(t*.35+i*.25)%1;p.position.set(f*1.2,f*2.8,0);p.scale.setScalar(.18+f*.4)})});return g}
function wetterhahn(par,x,y,z){const g=grp(x,y,z,par);cyl(.05,1.6,0x3a3a3a,0,.8,0,g,true);box(1,.06,.06,0x3a3a3a,0,.9,0,g);box(.06,.06,1,0x3a3a3a,0,.9,0,g);const h=grp(0,1.6,0,g);box(.9,.06,.06,0x3a3a3a,0,0,0,h);sph(.18,0xe0302a,.35,.18,0,h,1.2,1,.6);cone(.08,.2,0xf2a830,.55,.2,0,h).rotation.z=-Math.PI/2;box(.3,.3,.04,0xe0302a,-.35,.2,0,h);bewegt(h,t=>{h.rotation.y=Math.sin(t*.5)*1.1})}
function person(x,z,rot,jacke,hose,haar,stil,s,par){const m=kindL({jacke:jacke,hose:hose,haut:0xe8b98f,haar:haar,stil:stil||'kurz',rucksack:null},par||scene);m.g.position.set(x,0,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.25);return m}
function bodenFl(x,z,w,d,farbe,h){h=h||.1;const b=box(w,h,d,farbe,x,h/2,z,scene);b.receiveShadow=true;return b}
function sack(x,z,f,s,par){const g=grp(x,0,z,par);s=s||1;sph(.5*s,f||0xd8c090,0,.45*s,0,g,1,1.15,.85);sph(.18*s,f||0xd8c090,0,1.0*s,0,g,1,.8,1);kreis(x,z,.5*s);return g}
function korb(x,z,fr,par){const g=grp(x,0,z,par);cyl(.36,.36,0xc9a46a,0,.18,0,g,true);const h=new THREE.Mesh(new THREE.TorusGeometry(.3,.03,5,10,Math.PI),mat(0xa8743f));h.position.y=.34;g.add(h);for(let i=0;i<5;i++)sph(.12,fr,Math.cos(i*1.3)*.2,.4,Math.sin(i*1.3)*.2,g);return g}
function eimer(x,z,f,inhalt){const g=grp(x,0,z);cyl(.34,.5,f,0,.25,0,g,true);const h=new THREE.Mesh(new THREE.TorusGeometry(.3,.025,5,10,Math.PI),mat(0x6a6a70));h.position.y=.48;g.add(h);if(inhalt)for(let i=0;i<3;i++)sph(.13,inhalt,(i-1)*.16,.52,(i%2)*.1,g,1.3,.7,.8);kreis(x,z,.45);return g}
function holzstapel(x,z,rot,par){const g=grp(x,0,z,par);for(let i=0;i<4;i++)for(let j=0;j<5-i;j++)cyl(.26,1.8,i%2?0x9a6a3a:0x8a5a32,0,.3+i*.5,-1.2+j*.56+i*.28,g,true).rotation.z=Math.PI/2;g.rotation.y=rot||0;kreis(x,z,1.6);return g}
function bruecke(x,z,s,w,hb){hb=hb||3.4;let bi=0,bd=1e9;s.forEach((q,i)=>{const d=Math.hypot(q[0]-x,q[1]-z);if(d<bd){bd=d;bi=i}});const a=s[Math.max(0,bi-1)],c=s[Math.min(s.length-1,bi+1)],th=Math.atan2(-(c[1]-a[1]),c[0]-a[0]),bx=s[bi][0],bz=s[bi][1];
  const g=grp(bx,0,bz);g.rotation.y=th;const L=w+5.4;box(2*hb+.2,.1,L,0x9a6a3a,0,.14,0,g,true);for(let i=0;i<9;i++)box(2*hb,.05,.12,0x6a4220,0,.2,-L/2+.6+i*(L-1.2)/8,g);
  [-1,1].forEach(sg=>{box(.14,.14,L,0x6a4220,sg*hb,1.05,0,g);box(.14,.14,L,0x6a4220,sg*hb,.65,0,g);for(let i=0;i<5;i++)box(.18,1.0,.18,0x7a5230,sg*hb,.5,-L/2+.3+i*(L-.6)/4,g)});
  [-1,1].forEach(sg=>box(2*hb+.2,.08,1.2,0x9a6a3a,0,.08,sg*(L/2+.5),g));
  const cs=Math.cos(th),sn=Math.sin(th),W=(lx,lz)=>[bx+lx*cs+lz*sn,bz-lx*sn+lz*cs];[-1,1].forEach(sg=>{const p=W(sg*hb,-L/2),q=W(sg*hb,L/2);sperrLinie(p[0],p[1],q[0],q[1],.1)});return[bx,bz]}
function bachBauen(s,w,br){wegBand(s,w+1.4,0xb9a577,.056);wegBand(s,w,WASSER,.082);wegBand(s,w*.5,0x6ec0ea,.088);const r=w/2+.15,D=3.8+r;
  for(let i=0;i<s.length-1;i++){if(br.some(q=>Math.hypot(s[i][0]-q[0],s[i][1]-q[1])<D||Math.hypot(s[i+1][0]-q[0],s[i+1][1]-q[1])<D))continue;sperrLinie(s[i][0],s[i][1],s[i+1][0],s[i+1][1],r)}}
function pendel(s,o){const n=s.length,nr=i=>{const a=s[Math.max(0,i-1)],b=s[Math.min(n-1,i+1)];let tx=b[0]-a[0],tz=b[1]-a[1];const l=Math.hypot(tx,tz)||1;return[-tz/l,tx/l,tx/l,tz/l]};
  const P=[];for(let i=0;i<n;i++){const q=nr(i);P.push([s[i][0]+q[0]*o,s[i][1]+q[1]*o])}
  let q=nr(n-1);for(let k=1;k<12;k++){const a=k/12*Math.PI;P.push([s[n-1][0]+q[0]*o*Math.cos(a)+q[2]*o*Math.sin(a),s[n-1][1]+q[1]*o*Math.cos(a)+q[3]*o*Math.sin(a)])}
  for(let i=n-1;i>=0;i--){const m=nr(i);P.push([s[i][0]-m[0]*o,s[i][1]-m[1]*o])}
  q=nr(0);for(let k=1;k<12;k++){const a=k/12*Math.PI;P.push([s[0][0]-q[0]*o*Math.cos(a)-q[2]*o*Math.sin(a),s[0][1]-q[1]*o*Math.cos(a)-q[3]*o*Math.sin(a)])}
  return bahn(P)}
function bahn(P){if(!P||P.length<2)return{L:1,at:()=>[0,0,1,0]};const C=[0];for(let i=1;i<=P.length;i++){const a=P[i-1],b=P[i%P.length];C.push(C[i-1]+Math.hypot(b[0]-a[0],b[1]-a[1]))}const L=C[P.length];
  return{L,at:u=>{if(!isFinite(u))u=0;u=((u%L)+L)%L;if(!(u<L))u=0;let lo=0,hi=P.length;while(hi-lo>1){const m=(lo+hi)>>1;if(C[m]<=u)lo=m;else hi=m}const a=P[lo],b=P[(lo+1)%P.length],f=(u-C[lo])/((C[lo+1]-C[lo])||1);return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,b[0]-a[0],b[1]-a[1]]}}}
function fahren(g,B,v,ph){g.userData.keep=1;if(!B||!(B.L>1)){g.visible=false;return}lebendig.push({o:{userData:{anim:t=>{const p=B.at(t*v+ph);if(!p||p[0]!==p[0])return;g.position.set(p[0],0,p[1]);g.rotation.y=Math.atan2(-p[3],p[2]);const sicht=Math.hypot(p[0]-spieler.position.x,p[1]-spieler.position.z)<(dist>35?92:100);if(g.visible!==sicht)g.visible=sicht;if(sicht&&g.userData.anim)g.userData.anim(t)}}},ph:0})}
function vmVerschm(g){g.updateMatrixWorld(true);if(Math.abs(g.matrixWorld.determinant())<1e-9)return;const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(),gr={},alt=[];
  g.traverse(m=>{if(m===g||!m.isMesh||!m.visible)return;const mt=m.material;if(Array.isArray(mt)||mt.transparent||mt.map)return;for(let o=m;o&&o!==g;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep||o.userData.frei))return}
    const ge=m.geometry.clone();ge.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));const had=mt===VMAT2,vc=had||(mt.isMeshLambertMaterial&&!mt.vertexColors);if(vc&&!had){const n=ge.attributes.position.count,ca=new Float32Array(n*3);for(let i=0;i<n;i++){ca[i*3]=mt.color.r;ca[i*3+1]=mt.color.g;ca[i*3+2]=mt.color.b}ge.setAttribute('color',new THREE.BufferAttribute(ca,3))}const k=(vc?'vc':mt.uuid)+'|'+(m.castShadow?1:0);(gr[k]=gr[k]||{mt:vc?VMAT2:mt,vc,c:m.castShadow,l:[]}).l.push(ge);alt.push(m)});
  for(const k in gr){const q=gr[k];let nv=0,ni=0;q.l.forEach(e=>{nv+=e.attributes.position.count;ni+=e.index?e.index.count:e.attributes.position.count});const P=new Float32Array(nv*3),N=new Float32Array(nv*3),CC=q.vc?new Float32Array(nv*3):null,I=new Uint32Array(ni);let vo=0,io=0;
    q.l.forEach(e=>{const c=e.attributes.position.count;P.set(e.attributes.position.array,vo*3);N.set(e.attributes.normal.array,vo*3);if(CC)CC.set(e.attributes.color.array,vo*3);if(e.index){const ix=e.index.array;for(let j=0;j<ix.length;j++)I[io+j]=ix[j]+vo;io+=ix.length}else{for(let j=0;j<c;j++)I[io+j]=vo+j;io+=c}vo+=c;e.dispose()});
    const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(P,3));G.setAttribute('normal',new THREE.BufferAttribute(N,3));if(CC)G.setAttribute('color',new THREE.BufferAttribute(CC,3));G.setIndex(new THREE.BufferAttribute(I,1));const mm=new THREE.Mesh(G,q.mt);mm.castShadow=q.c;g.add(mm)}
  alt.forEach(m=>{if(m.parent)m.parent.remove(m)})}
function vm(g){for(let i=1;i<arguments.length;i++){vmVerschm(arguments[i]);arguments[i].userData.frei=1}vmVerschm(g);return g}
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
function wRing(cx,cz,r,ga,gw){const n=Math.max(18,Math.round(r*2.4)),D=ga==null?0:Math.asin(Math.min(.9,gw/2/r)),A=Math.PI*2-2*D;let pa=null;for(let i=0;i<=n;i++){const a=(ga||0)+D+A*i/n,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;if(pa)sperrLinie(pa[0],pa[1],x,z,.2);pa=[x,z]}}
function teichBau(cx,cz,r,farbe,ga,gw){wasserRund(cx,cz,r,farbe||WASSER);wasserRund(cx-r*.1,cz+r*.08,r*.62,0x6ec0ea,.02);wRing(cx,cz,r+.5,ga,gw);
  for(let i=0;i<Math.round(r*2.4);i++){const a=i/Math.round(r*2.4)*6.283+.1;if(ga!=null&&Math.abs(Math.atan2(Math.sin(a-ga),Math.cos(a-ga)))<(gw/2+1)/r)continue;inst('sph',cx+Math.cos(a)*(r+1),.17,cz+Math.sin(a)*(r+1),.4+nr()*.3,.26,.38,0x8e949a)}}
function steg(x1,z1,x2,z2,w,farbe){farbe=farbe||0x9a6a3a;const dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz),th=Math.atan2(-dz,dx),g=grp((x1+x2)/2,0,(z1+z2)/2);g.rotation.y=th;
  box(L,.1,w,farbe,0,.2,0,g,true);for(let i=0;i<L/1.4;i++)box(.14,.04,w+.1,0x6a4220,-L/2+.5+i*1.4,.26,0,g);
  [-1,1].forEach(s=>{box(L,.08,.1,0x6a4220,0,.9,s*(w/2+.05),g);for(let i=0;i<=Math.round(L/2.4);i++)box(.12,.9,.12,0x7a5230,-L/2+i*L/Math.round(L/2.4),.45,s*(w/2+.05),g)});
  const c=Math.cos(th),s=Math.sin(th),W=(lx,lz)=>[(x1+x2)/2+lx*c+lz*s,(z1+z2)/2-lx*s+lz*c];
  [-1,1].forEach(sg=>{const p=W(-L/2,sg*(w/2+.1)),q=W(L/2,sg*(w/2+.1));sperrLinie(p[0],p[1],q[0],q[1],.1)});const a=W(L/2,-(w/2+.1)),b2=W(L/2,w/2+.1);sperrLinie(a[0],a[1],b2[0],b2[1],.1);return g}
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
function gras(x,z,h){h=h||.8;inst('con',x,h/2,z,.1,h,.1,0x4aa040)}
function blumeI(x,z,k){const h=.35+rnd()*.3;inst('cyl',x,h/2,z,.03,h,.03,0x3f9a46);inst('blm',x,h+.04,z,.13,.1,.13,BLF[k==null?Math.floor(rnd()*6):k])}
function moos(x,z,s){s=s||1;inst('box',x,.06,z,.9*s,.1,.8*s,0x5f9a3a,x*3)}
function stumpf(x,z,s){s=s||1;cyl(.55*s,.7*s,0x6a4a32,x,.35*s,z,scene,true);cyl(.5*s,.06,0xcfa86a,x,.72*s,z,scene);cyl(.3*s,.02,0xb08850,x,.755*s,z,scene);kreis(x,z,.62*s)}
function stamm(x,z,len,rot,r){r=r||.5;const c=cyl(r,len,0x6a4a32,x,r,z,scene,true);c.rotation.z=Math.PI/2;c.rotation.y=rot||0;const dx=Math.cos(rot||0)*len/2,dz=-Math.sin(rot||0)*len/2;sperrLinie(x-dx,z-dz,x+dx,z+dz,r*.8);
  [-1,1].forEach(s=>{const e=cyl(r*.9,.05,0xcfa86a,x+s*dx*1.0,r,z+s*dz*1.0,scene);e.rotation.z=Math.PI/2;e.rotation.y=rot||0});if(r>.4)moos(x,z,.8)}
function tisch(x,z,rot){const g=grp(x,0,z);cyl(.7,.12,0x9a6a3a,0,.9,0,g,true);cyl(.15,.9,0x6a4a32,0,.45,0,g);g.rotation.y=rot||0;kreis(x,z,.8);return g}
function bankW(x,z,rot){const g=grp(x,0,z);box(2.4,.18,.7,0x8a5a32,0,.62,0,g,true);box(2.4,.6,.1,0x8a5a32,0,1.05,-.32,g);[-1,1].forEach(s=>box(.14,.62,.64,0x6a4220,s*1,.31,0,g));g.rotation.y=rot||0;kreis(x-Math.cos(rot||0)*.8,z+Math.sin(rot||0)*.8,.55);kreis(x+Math.cos(rot||0)*.8,z-Math.sin(rot||0)*.8,.55);return g}
function schubkarre(x,z,rot,fr){const g=grp(x,0,z);g.rotation.y=rot||0;box(1.2,.35,.8,0x3b8fc4,.1,.72,0,g,true);cyl(.28,.1,0x2a2a2a,.75,.28,0,g,true).rotation.x=Math.PI/2;[-1,1].forEach(s=>{box(.08,.5,.08,0x6a4220,-.3,.28,s*.3,g);box(1.5,.07,.07,0x6a4220,-.9,.85,s*.3,g).rotation.z=.2});if(fr)for(let i=0;i<6;i++)sph(.14,fr,-.3+(i%3)*.32,.95+(i>2?.1:0),(i%2-.5)*.4,g);kreis(x,z,.8);return g}
function hutAuf(m,col,s){s=s||1;cyl(.66*s,.07,col,0,.36,0,m.kopf);cyl(.4*s,.36,col,0,.56,0,m.kopf)}
function vier(par,o){const g=grp(0,0,0,par),f=o.f,w=o.w||f,d=o.d||0x2a2018,h=o.h,bl=o.bl,bh=o.bh,bw=o.bw,hr=o.hr,lr=o.lr;
  sph(1,f,0,h,0,g,bl,bh,bw).castShadow=true;if(o.bauch)sph(1,w,bl*.12,h-bh*.5,0,g,bl*.85,bh*.55,bw*.88);
  const lh=h-bh*.25;[[-.62,1],[-.62,-1],[.6,1],[.6,-1]].forEach(p=>{cyl(lr,lh,o.lf||f,bl*p[0],lh/2,bw*.58*p[1],g,true);sph(lr*1.2,d,bl*p[0]+lr*.6,lr*.45,bw*.58*p[1],g,1.5,.55,1)});
  const nk=grp(bl*.78,h+bh*.2,0,g),kh=grp(0,o.nl,0,nk);cyl(o.nr,o.nl,o.nf||f,0,o.nl/2,0,nk,true);
  sph(hr,o.hf||f,hr*.35,0,0,kh,o.hl||1.5,1,.85).castShadow=true;sph(hr*.55,o.sc||w,hr*1.35,-hr*.28,0,kh,1.3,.78,.8);sph(hr*.17,0x1a1414,hr*2.05,-hr*.2,0,kh);
  [-1,1].forEach(z=>{sph(hr*.2,0x16110d,hr*.95,hr*.32,z*hr*.62,kh);sph(hr*.07,0xffffff,hr*1.03,hr*.4,z*hr*.7,kh);cone(hr*.34,hr*(o.oh||1.1),o.ef||f,-hr*.2,hr*.95,z*hr*.55,kh).rotation.x=z*.35});
  const tl=grp(-bl*.92,h+bh*.25,0,g);if(!o.notail)sph(o.tr,o.tc||f,-o.tr*.7,-o.tr*.1,0,tl,o.tl||1.1,.8,.8);
  if(o.x)o.x(g,kh,tl,nk);
  const ph=rnd()*6;g.userData.anim=t=>{const u=Math.max(0,Math.sin(t*.35+ph)),a=o.na+(o.gr||0)*u;nk.rotation.z=-a;kh.rotation.z=a-o.ht-u*(o.gr?.6:0)+Math.sin(t*.9)*.06;tl.rotation.y=Math.sin(t*(o.tw||3))*.35};return g}
function falter(cx,cz,r,y,ph,farbe){const g=grp(cx,y,cz);sph(.07,0x3a2a22,0,0,0,g,2,.5,.5);const fl=[-1,1].map(s=>sph(.3,farbe,0,0,s*.3,g,.9,.1,1.1));g.userData.anim=t=>{const a=t*.5+ph;g.position.set(cx+Math.cos(a)*r,y+Math.sin(t*1.3+ph)*.4,cz+Math.sin(a)*r*.7);g.rotation.y=-a;fl[0].rotation.x=Math.sin(t*14)*.7;fl[1].rotation.x=-Math.sin(t*14)*.7};leben(g,ph);return vm(g,fl[0],fl[1])}
function vogelM(par,f,bf,s){const g=grp(0,0,0,par);sph(.15,f,0,.2,0,g,1.3,1,.9);sph(.11,bf,.07,.15,0,g,1.1,.8,.8);sph(.09,f,.18,.32,0,g);cone(.025,.07,0xe8a030,.27,.32,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>sph(.018,0x111111,.23,.35,z*.05,g));box(.22,.03,.08,f,-.26,.22,0,g).rotation.z=.4;cyl(.012,.12,0x5a4a3a,0,.06,.04,g);cyl(.012,.12,0x5a4a3a,0,.06,-.04,g);g.scale.setScalar(s||1);return g}
const SV=[[0x4a88c8,0xf2d030],[0xd8602a,0xf4ecd8],[0x6a5038,0xd8c8a8],[0x2a2a2a,0x3a3a3a],[0xd8c030,0xf6f0d0],[0x2a9ad8,0xe07a30]];
function sitz(x,y,z,ry,k,s){const v=vogelM(scene,SV[k][0],SV[k][1],s||1.5);v.position.set(x,y,z);v.rotation.y=ry;return v}
function flieger(cx,cz,r,y,ph,sp,f1,f2){const g=grp(0,y,0);sph(.12,f1,0,0,0,g,1.6,.7,.7);box(.14,.05,.1,f2,.17,0,0,g);const fl=[-1,1].map(s=>box(.5,.03,.18,f1,0,.02,s*.25,g));g.scale.setScalar(1.6);
  g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.8,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.8;g.position.set(x,y+Math.sin(t*.8+ph)*1.8,z);g.rotation.y=Math.atan2(-vz,vx);fl[0].rotation.x=Math.sin(t*16)*.7;fl[1].rotation.x=-Math.sin(t*16)*.7};leben(g,ph);return vm(g,fl[0],fl[1])}
function landFl(P,farbe,y,tr){const sh=new THREE.Shape();P.forEach((p,i)=>i?sh.lineTo(p[0],-p[1]):sh.moveTo(p[0],-p[1]));const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),tr||mat(farbe));m.rotation.x=-Math.PI/2;m.position.y=y;m.receiveShadow=true;scene.add(m);return m}
const bandE=(z,x)=>z+4*Math.sin(x*.045+z*.3)+3*Math.sin(x*.11+z);
function bandFl(zA,zB,farbe,y){const up=[],dn=[];for(let x=-190;x<=190;x+=19)up.push([x,bandE(zB,x)]);for(let x=190;x>=-190;x-=19)dn.push([x,bandE(zA,x)]);return landFl(up.concat(dn),farbe,y)}
function fahne(x,z,h,farbe,farbe2){cyl(.08,h,0xe8e4da,x,h/2,z,scene,true);kreis(x,z,.3);const f=grp(x,h-.6,z);for(let i=0;i<4;i++)box(.4,.5,.04,i%2?(farbe2||0xffffff):farbe,.4+i*.4,0,0,f);vm(f);bewegt(f,t=>{f.rotation.y=Math.sin(t*1.7)*.18})}
function streif(fn,B,v,ph,sk){const g=fn(scene);g.scale.setScalar(sk||1);fahren(g,B,v,ph);return g}
function lin(P,st){const o=[];for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],k=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/st));for(let j=0;j<k;j++)o.push([a[0]+(b[0]-a[0])*j/k,a[1]+(b[1]-a[1])*j/k])}o.push(P[P.length-1]);return o}
function flamme(x,y,z,s){s=s||1;const f=grp(x,y,z);const FL=[[0xff5a1a,.6,1.7,0,0],[0xff9a2a,.45,1.3,.3,.1],[0xffd040,.32,.95,-.25,.15]].map(p=>{const m=new THREE.Mesh(gCone,new THREE.MeshBasicMaterial({color:p[0]}));m.scale.set(p[1]*s,p[2]*s,p[1]*s);m.position.set(p[3]*s,p[2]*s/2,p[4]*s);f.add(m);return{m,h:p[2]*s,w:p[1]*s}});
  f.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{FL.forEach((q,i)=>{const k=1+Math.sin(t*9+i*2)*.16+Math.sin(t*15+i)*.08;q.m.scale.set(q.w*(2-k),q.h*k,q.w*(2-k));q.m.position.y=q.h*k/2})}}},ph:0});return f}
const hundM=automerge(function(par){return vier(par,{f:0x2a2a2e,w:0xf6f2ea,d:0x1a1a1a,sc:0xf6f2ea,h:.72,bl:.65,bh:.3,bw:.24,lr:.07,bauch:1,na:.45,nl:.3,nr:.14,hr:.22,hl:1.4,ht:.3,oh:1.2,ef:0x2a2a2e,tr:.1,tl:2.6,tw:7})});
const dk=(c,f)=>new THREE.Color(c).multiplyScalar(f).getHex();
function hecke(x1,z1,x2,z2,gap,k){const L=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(L/1.5));let pa=null;for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n,z=z1+(z2-z1)*i/n,im=gap&&Math.hypot(x-gap[0],z-gap[1])<gap[2];if(!im){inst('sph',x,.55,z,.9,.7,.8,[0x4a8a3a,0x3f7a34][i%2]);if(i%4===0)inst('blm',x,1,z,.5,.4,.5,[0xf47ab0,0xffffff,0xe0605a][(k||0)%3])}if(pa&&!im&&!pa[2])sperrLinie(pa[0],pa[1],x,z,.5);pa=[x,z,im]}}
const fig=(x,z,rot,jk,hs,hr,st,s)=>{kreis(x,z,.5);return person(x,z,rot,jk,hs,hr,st||'kurz',s||1.25)};
function wanderer(B,v,ph,av,hutF){const w=grp(0,0,0);const m=kindL(Object.assign({hose:0x3a4a5a,haut:0xe8b98f,haar:0x6b4626,stil:'kurz',rucksack:null},av),w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.25);if(hutF)hutAuf(m,hutF);
  vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);
  w.userData.anim=t=>{const q=Math.sin(t*6+ph)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q};fahren(w,B,v,ph*B.L/6.3);return w}
function schafM(par,lamm){const s=lamm?.55:1,h=.78*s+.22,bl=.78*s+.1,bh=.5*s+.1,bw=.46*s+.06;const g=vier(par,{f:0xf3ecdc,w:0xf3ecdc,d:0x2a2a2a,lf:0x2a2a2a,hf:0x2a2a2a,sc:0x3a3a3a,nf:0x2a2a2a,h:h,bl:bl,bh:bh,bw:bw,lr:.06,na:.5,nl:.36*s+.08,nr:.12,hr:.17*s+.03,hl:1.5,ht:.35,gr:.9,oh:1.4,ef:0x2a2a2a,tr:.1,tl:1.1,
  x:(g)=>{for(let i=0;i<6;i++)sph(.36*s+.06,0xf3ecdc,Math.cos(i*2.1)*bl*.55,h+Math.sin(i*1.3)*bh*.3,Math.sin(i*2.1)*bw*.6,g);sph(.26*s+.04,0xf3ecdc,bl*.55,h+bh*.55,0,g)}});return g}
const schaf=automerge(p=>schafM(p,false)),lamm=automerge(p=>schafM(p,true));
const kuh=automerge(function(par){const h=1.05,bl=1.15,bh=.62,bw=.55;return vier(par,{f:0xf6f0e4,w:0xf6f0e4,d:0x3a2a22,h:h,bl:bl,bh:bh,bw:bw,lr:.12,bauch:1,na:.55,nl:.55,nr:.22,hr:.32,hl:1.45,ht:.4,gr:1,oh:1.1,ef:0x7a5a42,sc:0xe8b8b0,tr:.12,tl:3.2,tw:2,
  x:(g,kh,tl,nk)=>{[[.5,.25,1],[-.5,.1,-1],[0,-.15,1],[-.2,.3,1],[.7,-.1,-1]].forEach(p=>sph(.3,0x4a3022,p[0],h+p[1],p[2]*bw*.93,g,1,.9,.22));sph(.34,0x4a3022,-.1,h+bh*.9,.1,g,1.2,.3,1);sph(.2,0xe8b0a8,-.3,h-bh*.85,0,g,1.1,.7,1);
    [-1,1].forEach(z=>{cone(.045,.3,0xf2e8d0,-.04,.38,z*.2,kh).rotation.x=z*.7});cyl(.24,.1,0x7a4a2a,0,.2,0,nk);cone(.17,.28,0xe8b830,.2,.1,0,nk);sph(.05,0x6a5a20,.2,-.06,0,nk)}})});
const ziege=automerge(function(par){return vier(par,{f:0xe8e2d4,w:0xf6f2ea,d:0x3a3028,h:.7,bl:.62,bh:.32,bw:.26,lr:.055,bauch:1,na:.6,nl:.32,nr:.1,hr:.15,hl:1.5,ht:.3,gr:.9,oh:1.3,ef:0xe8e2d4,sc:0xd8d0c0,tr:.08,tl:1.2,tw:6,
  x:(g,kh)=>{[-1,1].forEach(z=>cone(.035,.32,0x3a2a1a,-.05,.28,z*.07,kh).rotation.z=.8);cone(.04,.2,0xf6f2ea,.28,-.2,0,kh).rotation.z=Math.PI}})});
const SGW=181,SGH=193,SG=new Uint8Array(SGW*SGH);
function sgMark(x,z,r){const i0=Math.max(0,Math.floor((x-r+180)/2)),i1=Math.min(SGW-1,Math.ceil((x+r+180)/2)),j0=Math.max(0,Math.floor((z-r+236)/2)),j1=Math.min(SGH-1,Math.ceil((z+r+236)/2));for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const cx=i*2-180,cz=j*2-236;if((cx-x)*(cx-x)+(cz-z)*(cz-z)<=r*r)SG[j*SGW+i]=1}}
function sgFrei(x,z){const i=Math.round((x+180)/2),j=Math.round((z+236)/2);return i>=0&&i<SGW&&j>=0&&j<SGH&&!SG[j*SGW+i]}
const TH={};function thFrei(x,z,d){const i=Math.floor(x/8),j=Math.floor(z/8);for(let a=-1;a<=1;a++)for(let c=-1;c<=1;c++){const l=TH[(i+a)+'|'+(j+c)];if(l)for(let k=0;k<l.length;k++){const q=l[k];if((q[0]-x)*(q[0]-x)+(q[1]-z)*(q[1]-z)<d*d)return false}}return true}
function thSet(x,z){const k=Math.floor(x/8)+'|'+Math.floor(z/8);(TH[k]=TH[k]||[]).push([x,z])}
const imW=(x,z)=>WS.some(w=>Math.hypot(x-w[0],z-w[1])<w[2]+2.5);
const frei=(x,z)=>sgFrei(x,z)&&!imW(x,z)&&Math.abs(x)<177&&z>-233&&z<145;
function zuf(fn,anz,pred,x0,x1,z0,z1){let k=0,t=0;x0=x0==null?GRENZE.x0+6:x0;x1=x1==null?GRENZE.x1-6:x1;z0=z0==null?TORZ+5:z0;z1=z1==null?GRENZE.z1-12:z1;while(k<anz&&t++<anz*14){const x=x0+nr()*(x1-x0),z=z0+nr()*(z1-z0);if(!frei(x,z)||(pred&&!pred(x,z)))continue;fn(x,z);k++}}
const GRAU=[0x8d9097,0x7e848c,0x9a9a9e,0x848a94,0x969087];
function busch(x,z,s,k){s=s||1;inst('sph',x,.55*s,z,.9*s,.7*s,.9*s,k||0x5a8a3a);inst('sph',x+.5*s,.6*s,z+.3*s,.6*s,.5*s,.6*s,0x6aa04a);kreis(x,z,.8*s)}
function steinhaufen(x,z,s){s=s||1;for(let i=0;i<5;i++)inst('sph',x+Math.cos(i*1.9)*.5*s,.2*s+(i%2)*.1,z+Math.sin(i*1.9)*.5*s,.35*s,.22*s,.3*s,GRAU[i%5])}
function felsgruppe(x,z,rx,rz,n,rmin,rmax,hoch){const L=[];for(let i=0;i<n;i++){const a=i/n*6.283+nr()*.5,q=.35+nr()*.65,px=x+Math.cos(a)*rx*q,pz=z+Math.sin(a)*rz*q,r=rmin+nr()*(rmax-rmin);const m=sph(r,GRAU[i%5],px,r*(hoch||.55),pz,scene,1.2,.8,1);m.castShadow=true;kreis(px,pz,r*.95);L.push([px,pz,r])}return L}
function fels(x,z,r){const g=felsen(x,z,r);if(r>.6)inst('sph',x,r*.78,z,r*.9,r*.28,r*.8,0x5f9a3a);return g}
function hex(x,z,r,farbe,h){h=h||.1;const c=cyl(r,h,farbe,x,h/2,z,scene);c.receiveShadow=true;return c}
function ente0(par){const g=grp(0,0,0,par);sph(.5,0xc8a878,0,.35,0,g,1.3,.7,.85).castShadow=true;sph(.3,0xc8a878,-.55,.55,0,g,.8,.9,.6);cyl(.09,.4,0x2f7a4a,.4,.65,0,g);
  const kopf=grp(.45,.9,0,g);sph(.22,0x2f7a4a,0,0,0,kopf);box(.28,.08,.2,0xf2b230,.24,-.04,0,kopf);sph(.035,0x111111,.1,.07,.13,kopf);sph(.035,0x111111,.1,.07,-.13,kopf);
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*1.5)*.25;g.rotation.z=Math.sin(t*1.1)*.03};return g}
const ente=automerge(ente0);
function rutsche(x,z,rot,farbe){const g=grp(x,0,z);g.rotation.y=rot||0;[-.6,.6].forEach(s=>{box(.12,3,.12,0x8a5a32,s,1.5,-1.2,g,true)});box(1.6,.12,1.2,0x8a5a32,0,2.9,-1.2,g);const r=box(1.2,.12,3.4,farbe||0xe0302a,0,1.5,.7,g);r.rotation.x=.55;[-1,1].forEach(s=>box(.1,.4,3.4,farbe||0xe0302a,s*.6,1.7,.7,g).rotation.x=.55);for(let i=0;i<5;i++)box(1.3,.06,.1,0x8a5a32,0,.6+i*.5,-1.78,g);sperrKasten(x,z,2.4,4.6,rot||0);return g}
function schaukel(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;[-2,2].forEach(s=>[-1,1].forEach(q=>{cyl(.1,3,0x8a5a32,s,1.4,q*.8,g,true).rotation.x=q*.2}));box(4.4,.14,.14,0x6a4220,0,2.9,0,g);const sw=[-1,1].map(s=>{const p=grp(s*.9,2.9,0,g);box(.04,2.1,.04,0x3a3a3e,0,-1.05,0,p);box(.7,.08,.3,0xe0302a,0,-2.1,0,p);return p});bewegt(sw[0],t=>{sw[0].rotation.x=Math.sin(t*1.7)*.5});bewegt(sw[1],t=>{sw[1].rotation.x=Math.sin(t*1.7+1.2)*.5});sperrKasten(x,z,4.6,2.4,rot||0);return g}
function ballen(x,z,rot){const c=cyl(.7,1.1,0xe8c850,x,.55,z,scene,true);c.rotation.z=Math.PI/2;c.rotation.y=rot||0;kreis(x,z,.9)}
function stroh(x,z,rot,par,y,hell){const o=box(1.7,1,1,hell?0xe8c850:0xd8b440,x,y||.5,z,par||scene,true);o.rotation.y=rot||0;box(1.74,1.04,.12,0x6a4a2a,x,y||.5,z,par||scene).rotation.y=rot||0;return o}
function markise(g,w,y,z,f1,f2,n){n=n||6;for(let i=0;i<n;i++)box(w/n,.1,1.3,i%2?f2:f1,-w/2+(i+.5)*w/n,y,z,g).rotation.x=.25}
function schirm(x,z,f,tisch0){cyl(.06,2.7,0xe8e4da,x,1.35,z,scene,true);cone(1.7,.7,f,x,2.75,z,scene);cone(.1,.25,0xf6f6f2,x,3.2,z,scene);if(tisch0!==false){cyl(.7,.08,0xf6f6f2,x,.95,z+.01,scene);cyl(.08,.9,0x6a6a70,x+.01,.45,z+.01,scene)}kreis(x,z,.7)}
const VMAT2=new THREE.MeshLambertMaterial({vertexColors:true});
function libelle(cx,cz,r,y,ph,farbe){const g=grp(cx,y,cz);cyl(.035,1.1,farbe,.1,0,0,g).rotation.z=Math.PI/2;sph(.1,0x1a8a4a,.68,.02,0,g);[-1,1].forEach(s=>sph(.06,0x2a5ac8,.7,.05,s*.08,g));const w=[-1,1].map(s=>{const p=grp(.25,.06,0,g);[.0,-.2].forEach(x=>box(.16,.012,.5,0xe4f4ff,x,0,s*.28,p));return p});
  g.userData.anim=t=>{const a=t*1.1+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a*1.4)*r*.7;g.position.set(x,y+Math.sin(t*2+ph)*.5,z);g.rotation.y=Math.atan2(-Math.cos(a*1.4)*1.4*r*.7,-Math.sin(a)*r);w[0].rotation.x=Math.sin(t*30)*.5;w[1].rotation.x=-Math.sin(t*30)*.5};leben(g,ph);return vm(g,w[0],w[1])}
const BLF=[0xe0605a,0xffd45e,0xf59e3f,0xffffff,0xb06ae0,0xf47ab0];
function rohr(a,b,r,farbe,par){const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),L=d.length(),m=cyl(r,L,farbe,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,par||scene);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.multiplyScalar(1/L));return m}
function block(x,z,r){const g=felsen(x,z,r);return g}
function windsack(x,z,h){cyl(.08,h,0xe8e4da,x,h/2,z,scene,true);kreis(x,z,.25);const g=grp(x,h,z);const ks=[];for(let i=0;i<4;i++)ks.push(cone(.4-i*.05,.7,i%2?0xf6f6f2:0xe0302a,.4+i*.7,0,0,g));ks.forEach(k=>k.rotation.z=-Math.PI/2);vm(g);bewegt(g,t=>{g.rotation.y=Math.sin(t*.4)*.5;g.rotation.z=Math.sin(t*2)*.08})}

/* ==================== Bausatz Mittelalter (alles instanziert) ==================== */
/* Instanzen: Büsche, Bäume, Felder, Mauern, Fachwerkhäuser werden gesammelt (inst) und am Ende je Form und Kachel zu einem Zeichenaufruf (instFlush) */
const gSphL=new THREE.SphereGeometry(1,6,4),gSphT=new THREE.SphereGeometry(1,8,6),gSphXL=new THREE.SphereGeometry(1,5,3),gConL=new THREE.ConeGeometry(1,1,7),gCylL=new THREE.CylinderGeometry(1,1,1,7),gBoxI=new THREE.BoxGeometry(1,1,1),gCylT=new THREE.CylinderGeometry(1,1,1,14),gConT=new THREE.ConeGeometry(1,1,14);
/* Dreiecksprisma (Satteldach): Grundfläche y=0, First y=1 (Länge entlang x, Tiefe entlang z) */
const gGab=(function(){const A=[-.5,0,-.5],B=[-.5,0,.5],C=[-.5,1,0],D=[.5,0,-.5],E=[.5,0,.5],F=[.5,1,0],p=[];
  [[E,D,F],[A,B,C],[B,E,F],[B,F,C],[D,A,C],[D,C,F]].forEach(t=>t.forEach(v=>p.push(v[0],v[1],v[2])));
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(p),3));g.computeVertexNormals();return g})();
const IR={};
function inst(k,x,y,z,sx,sy,sz,c,ry,rx,rz){(IR[k]=IR[k]||[]).push([x,y,z,sx,sy,sz,c,ry||0,rx||0,rz||0])}
function instFlush(){const G={sph:gSphL,sphT:gSphT,blm:gSphXL,con:gConL,cyl:gCylL,box:gBoxI,cylT:gCylT,conT:gConT,gab:gGab},M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color(),CH=84,gr={},bl=[];
  for(const k in IR)IR[k].forEach(a=>{const key=k+'|'+Math.floor((a[0]+260)/CH)+'|'+Math.floor((a[2]+320)/CH);(gr[key]=gr[key]||{k,l:[]}).l.push(a)});
  for(const key in gr){const q=gr[key],l=q.l;let x0=1e9,x1=-1e9,y1=0,z0=1e9,z1=-1e9,ms=0;l.forEach(a=>{x0=Math.min(x0,a[0]);x1=Math.max(x1,a[0]);z0=Math.min(z0,a[2]);z1=Math.max(z1,a[2]);y1=Math.max(y1,a[1]+a[4]);ms=Math.max(ms,a[3],a[4],a[5])});
    const geo=G[q.k].clone(),im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),l.length);geo.boundingSphere=new THREE.Sphere(new THREE.Vector3((x0+x1)/2,y1/2,(z0+z1)/2),Math.hypot(x1-x0,z1-z0,y1)/2+ms*1.6+2);
    bl.push({im,x:geo.boundingSphere.center.x,z:geo.boundingSphere.center.z,r:geo.boundingSphere.radius});im.frustumCulled=true;if(q.k==='sphT')im.castShadow=true;
    l.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(a[8]||0,a[7],a[9]||0,'YXZ'));M.compose(P,Q,S);im.setMatrixAt(i,M);im.setColorAt(i,C.set(a[6]))});im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;scene.add(im)}
  lebendig.push({o:{userData:{anim:t=>{const cx=camera.position.x,cz=camera.position.z;bl.forEach(c=>{const v=Math.hypot(c.x-cx,c.z-cz)-c.r<VIS;if(c.im.visible!==v)c.im.visible=v})}}},ph:0})}
let VIS=205;
/* Lokales Koordinatensystem (Position x,z, Drehung rot; +z ist die Vorderseite). Teile werden als Instanzen angelegt. */
function LG(x,z,rot){rot=rot||0;const c=Math.cos(rot),s=Math.sin(rot),P=(lx,lz)=>[x+lx*c+lz*s,z-lx*s+lz*c];
  return{P:P,
    b:(lx,y,lz,sx,sy,sz,col,rx,rz)=>{const p=P(lx,lz);inst('box',p[0],y,p[1],sx,sy,sz,col,rot,rx,rz)},
    c:(lx,y0,lz,r,h,col,k)=>{const p=P(lx,lz);inst(k||'cyl',p[0],y0+h/2,p[1],r,h,r,col,rot)},
    k:(lx,y0,lz,r,h,col,k)=>{const p=P(lx,lz);inst(k||'con',p[0],y0+h/2,p[1],r,h,r,col,rot)},
    s:(lx,y,lz,sx,sy,sz,col)=>{const p=P(lx,lz);inst('sph',p[0],y,p[1],sx,sy,sz,col,rot)},
    g:(lx,y0,lz,sx,sy,sz,col)=>{const p=P(lx,lz);inst('gab',p[0],y0,p[1],sx,sy,sz,col,rot)},
    d:(lx,y,lz,r,t,col,k)=>{const p=P(lx,lz);inst(k||'cylT',p[0],y,p[1],r,t,r,col,rot,Math.PI/2)}}}
const WAND=[0xf2e6c8,0xeadcb8,0xf6efd8,0xe6c58a,0xe8b8a0,0xd4dcc0,0xf0d8b0,0xeadcb8];
const DACH=[0xb4503a,0xc9a64a,0xa8452e,0x6f7680,0x8a5a3a,0xb4503a,0xc9a64a];
const STEIN=0xb4aea0,BALK=0x4a3020;
/* Fachwerkhaus: w breit (x), d tief (z), Tür vorn (+z); o: wand, dach, balken, og (Obergeschoss), h1, hr, s (einfach), door (false = keine Tür) */
function fachwerk(x,z,w,d,rot,o){o=o||{};const L=LG(x,z,rot),W=o.wand==null?WAND[Math.floor(nr()*WAND.length)]:o.wand,DA=o.dach==null?DACH[Math.floor(nr()*DACH.length)]:o.dach,BK=o.balken||BALK;
  const h1=o.h1||3.2,h2=o.og?(o.og===true?2.6:o.og):0,sock=.6;
  L.b(0,sock/2,0,w+.3,sock,d+.3,0x8c8a84);L.b(0,sock+h1/2,0,w,h1,d,W);
  let H=sock+h1,wo=w,dO=d;
  if(h2){wo=w+.7;dO=d+.7;L.b(0,H+.12,0,wo+.1,.24,dO+.1,BK);L.b(0,H+.24+h2/2,0,wo,h2,dO,W);H+=.24+h2}
  const fl=[[sock,h1,w,d]];if(h2)fl.push([sock+h1+.24,h2,wo,dO]);
  fl.forEach(f=>{const y0=f[0],hf=f[1],wf=f[2],df=f[3],n=Math.max(2,Math.round(wf/2.3)+1);
    [1,-1].forEach(sg=>{if(o.s&&sg<0)return;const zf=sg*(df/2+.05);
      for(let i=0;i<n;i++)L.b(-wf/2+i*wf/(n-1),y0+hf/2,zf,.2,hf,.14,BK);
      L.b(0,y0+.1,zf,wf,.2,.14,BK);L.b(0,y0+hf-.1,zf,wf,.2,.14,BK);
      if(sg===1&&!o.s){const sp=wf/(n-1),a=Math.atan2(sp,hf*.6);for(let i=0;i<n-1;i+=2)L.b(-wf/2+(i+.5)*sp,y0+hf*.7,zf,.16,Math.hypot(sp,hf*.6),.12,BK,0,i%4?a:-a)}});
    [1,-1].forEach(sg=>{const xf=sg*(wf/2+.05);L.b(xf,y0+.1,0,.14,.2,df,BK);L.b(xf,y0+hf-.1,0,.14,.2,df,BK);if(!o.s&&df>3.5)L.b(xf,y0+hf/2,0,.14,hf,.2,BK)})});
  /* Fenster (Glas, Läden), Tür */
  const px=w<4.6?[0]:(w<7?[-w*.3,w*.3]:[-w*.33,0,w*.33]),SH=[0x3f7a4a,0x9a3a2e,0x2f5a8a,0x4a6a3a][Math.floor(nr()*4)],zf=d/2+.07;
  const fen=(lx,y,zz)=>{L.b(lx,y,zz,1.1,1.15,.1,0x86b0c8);L.b(lx,y,zz+.03,1.15,.12,.1,BK);L.b(lx,y,zz+.03,.12,1.2,.1,BK);[-1,1].forEach(s=>L.b(lx+s*.82,y,zz+.02,.4,1.15,.1,SH));L.b(lx,y-.66,zz+.04,1.6,.12,.26,0x8c8a84)};
  const dx=o.door===false?99:(px.length>1?px[0]:0);
  if(dx<90){L.b(dx,sock+1.4,zf,1.5,2.8,.12,0x6b4524);L.b(dx,sock+2.9,zf,1.9,.22,.18,BK);L.b(dx,.1,zf+.3,2,.2,.6,0x8c8a84);L.s(dx+.5,sock+1.4,zf+.1,.09,.09,.09,0xd8b830)}
  px.forEach((p,i)=>{if(Math.abs(p-dx)<.2)return;fen(p,sock+h1*.58,zf)});
  if(h2){const z2=dO/2+.07,y2=sock+h1+.24+h2*.55;(px.length>1?px:[0]).forEach(p=>fen(p,y2,z2));if(o.blumen!==false&&px.length>1){L.b(px[1],y2-.72,z2+.14,1.5,.2,.34,0x7a4a2a);L.s(px[1],y2-.55,z2+.14,.7,.2,.2,[0xe0504a,0xf59e3f,0xf47ab0][Math.floor(nr()*3)])}}
  /* Dach: Prisma (Satteldach), Giebelwand, First, Schornstein */
  const hr=o.hr||Math.max(2.2,dO*.46);
  L.g(0,H,0,wo+1.1,hr,dO+1.0,DA);L.g(0,H,0,wo+1.16,hr*.9*dO/(dO+1),dO*.9,W);L.b(0,H+hr+.04,0,wo+1.2,.2,.3,dk(DA,.75));
  L.b(w*.28,H+(hr+.9)/2,-dO*.16,1,hr+.9,1,0x9a9088);L.b(w*.28,H+hr+.95,-dO*.16,1.3,.18,1.3,0x7a726a);
  sperrKasten(x,z,wo+.5,dO+.5,rot||0);return{H:H,hr:hr,L:L,wo:wo,dO:dO}}
/* Steinbau: Wand aus Stein, wahlweise Zinnen oder Satteldach (o.dach), Fensterschlitze, Tor vorn */
function steinbau(x,z,w,d,h,rot,o){o=o||{};const L=LG(x,z,rot),S=o.stein||STEIN;
  L.b(0,h/2,0,w,h,d,S);L.b(0,.35,0,w+.4,.7,d+.4,dk(S,.82));
  const nz=Math.max(1,Math.round(w/4.2));for(let i=0;i<nz;i++){const lx=-w/2+(i+.5)*w/nz;[1,-1].forEach(sg=>{if(sg<0&&o.s)return;L.b(lx,h*.62,sg*(d/2+.05),.55,1.3,.12,0x3a342c)});if(o.glas){L.b(lx,h*.62,d/2+.06,.7,1.3,.1,0x86b0c8)}}
  [1,-1].forEach(sg=>{L.b(sg*(w/2+.05),h*.62,0,.12,1.3,.55,0x3a342c)});
  if(o.tor!==false){L.b(o.tx||0,1.5,d/2+.07,1.7,3,.14,0x6b4524);L.b(o.tx||0,3.15,d/2+.08,2.1,.4,.2,dk(S,.7))}
  let top=h;
  if(o.zinnen){zinnen(L,w,d,h,S)}
  else{const hr=o.hr||Math.max(2,d*.4);L.g(0,h,0,w+.9,hr,d+.9,o.dach||0xa8452e);L.g(0,h,0,w+.96,hr*.9*d/(d+.9),d*.9,S);L.b(0,h+hr+.04,0,w+1,.2,.3,dk(o.dach||0xa8452e,.75));top=h+hr}
  sperrKasten(x,z,w+.5,d+.5,rot||0);return{H:top,L:L}}
function zinnen(L,w,d,y,S){const step=1.9;for(let lx=-w/2+.5;lx<=w/2-.4;lx+=step)[1,-1].forEach(sg=>L.b(lx,y+.45,sg*(d/2-.3),1,.9,.6,S));for(let lz=-d/2+2;lz<=d/2-1.9;lz+=step)[1,-1].forEach(sg=>L.b(sg*(w/2-.3),y+.45,lz,.6,.9,1,S))}
/* Rundturm (Stein) mit Zinnen oder Kegeldach */
function mTurm(x,z,r,h,o){o=o||{};const S=o.stein||0xa9a396,R=o.dach==null?0xb04a38:o.dach;
  inst('cylT',x,h/2,z,r,h,r,S);inst('cylT',x,.4,z,r+.4,.8,r+.4,dk(S,.8));inst('cylT',x,h+.5,z,r+.5,1,r+.5,dk(S,.9));
  if(o.zinnen){const n=Math.max(6,Math.round(r*3.2));for(let i=0;i<n;i++){const a=i/n*6.283;if(i%2)continue;inst('box',x+Math.cos(a)*(r+.2),h+1.45,z+Math.sin(a)*(r+.2),Math.max(.9,r*.55),.9,.7,S,-a+1.5708)}}
  else{const rh=o.rh||r*2;inst('conT',x,h+1+rh/2,z,r+.7,rh,r+.7,R)}
  for(let k=0;k<3;k++){const a=k*2.1+x*.3;inst('box',x+Math.cos(a)*(r+.02),h*.6,z+Math.sin(a)*(r+.02),.35,1.2,.35,0x3a342c,-a+1.5708)}
  kreis(x,z,r+.5)}
/* Mauerstück von (x1,z1) nach (x2,z2); gaps = [[Abstand vom Start, halbe Breite]]; Stein, Zinnen, Hindernis */
function mauer(x1,z1,x2,z2,gaps,h,dicke,S){S=S||0xb0aa9c;h=h||6.4;dicke=dicke||2.2;gaps=(gaps||[]).slice().sort((a,b)=>a[0]-b[0]);
  const dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz),ux=dx/L,uz=dz/L,th=Math.atan2(-dz,dx),runs=[];let a=0;
  gaps.forEach(g=>{const b=g[0]-g[1];if(b>a+.1)runs.push([a,b]);a=g[0]+g[1]});if(L>a+.1)runs.push([a,L]);
  runs.forEach(r=>{const len=r[1]-r[0],n=Math.max(1,Math.ceil(len/7)),sl=len/n;
    for(let i=0;i<n;i++){const u=r[0]+(i+.5)*sl,cx=x1+ux*u,cz=z1+uz*u;inst('box',cx,h/2,cz,sl+.05,h,dicke,i%2?dk(S,.95):S,th);inst('box',cx,h+.1,cz,sl+.1,.3,dicke+.3,dk(S,.8),th)}
    for(let u=r[0]+1;u<=r[1]-.5;u+=2.1)[1,-1].forEach(sg=>inst('box',x1+ux*u-uz*sg*(dicke/2-.25),h+.7,z1+uz*u+ux*sg*(dicke/2-.25),1.05,.9,.55,S,th));
    sperrLinie(x1+ux*r[0],z1+uz*r[0],x1+ux*r[1],z1+uz*r[1],dicke/2+.45)})}
/* Zaun aus Pfosten und Latten (instanziert); gap = [x,z,r] lässt eine Lücke frei */
function zaunI(x1,z1,x2,z2,gap,farbe){farbe=farbe||0x8a6a42;const L=Math.hypot(x2-x1,z2-z1),n=Math.max(1,Math.round(L/1.9)),th=Math.atan2(-(z2-z1),x2-x1);let pa=null;
  for(let i=0;i<=n;i++){const x=x1+(x2-x1)*i/n,z=z1+(z2-z1)*i/n,im=gap&&Math.hypot(x-gap[0],z-gap[1])<gap[2];if(!im)inst('box',x,.65,z,.2,1.3,.2,farbe,th);
    if(pa&&!im&&!pa[2]){const mx=(x+pa[0])/2,mz=(z+pa[1])/2,l=L/n;inst('box',mx,.5,mz,l,.1,.08,farbe,th);inst('box',mx,.98,mz,l,.1,.08,farbe,th);sperrLinie(pa[0],pa[1],x,z,.18)}pa=[x,z,im]}}
/* Zaunring um einen Kreis mit Lücke bei Winkel ga (Breite gw) */
function ringI(cx,cz,r,ga,gw,farbe){const n=Math.max(10,Math.round(r*2.3)),gh=Math.asin(Math.min(.95,gw/2/r));let pa=null;
  for(let i=0;i<=n;i++){const a=ga+gh+(Math.PI*2-2*gh)*i/n,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;inst('box',x,.65,z,.2,1.3,.2,farbe||0x8a6a42,0);if(pa){const mx=(x+pa[0])/2,mz=(z+pa[1])/2,l=Math.hypot(x-pa[0],z-pa[1]),th=Math.atan2(-(z-pa[1]),x-pa[0]);inst('box',mx,.5,mz,l,.1,.08,farbe||0x8a6a42,th);inst('box',mx,.98,mz,l,.1,.08,farbe||0x8a6a42,th);sperrLinie(pa[0],pa[1],x,z,.18)}pa=[x,z]}}
/* Acker mit Reihen (Getreide, Rüben, Kohl); begehbar */
function acker(x,z,w,d,rot,crop,n){const L=LG(x,z,rot);L.b(0,.04,0,w,.08,d,0x6a4a2e);n=n||Math.max(3,Math.floor(d/1.5));for(let i=0;i<n;i++){const zz=-d/2+(i+.5)*d/n;L.b(0,.42,zz,w-.6,.85,.6,crop[i%crop.length])}}
/* Dichter Bewuchs: Wiesenstück aus Gras, Blumen, Büschen */
function wiese(x,z,r,n,blm){for(let i=0;i<n;i++){const a=nr()*6.28,d=Math.sqrt(nr())*r,px=x+Math.cos(a)*d,pz=z+Math.sin(a)*d;if(!frei(px,pz))continue;const q=nr();if(q<.5)gras(px,pz,.5+nr()*.6);else if(q<.5+(blm==null?.35:blm))blumeI(px,pz);else busch(px,pz,.5+nr()*.5,[0x5a8a3a,0x4f7f34,0x68943c][i%3])}}
const KOLOR=[0xc03a3a,0x3a5ea8,0xe8b830,0x3a8a4a,0x8a4a9a,0xd8782a,0xf2f2ea,0x2a2a32];

/* ==================== Tiere und Figuren ==================== */
/* Burgfalke sitzend (schaut nach +x) */
function falkeSitz(par,s){const g=grp(0,0,0,par),br=0x7a5a3a,hell=0xf0e4c8;
  sph(.42,br,0,.8,0,g,.85,1.35,.8).castShadow=true;sph(.34,hell,.14,.72,0,g,.65,1.2,.7);
  for(let i=0;i<6;i++)sph(.04,0x5a3a22,.3+(i%2)*.01,.45+i*.13,(i%3-1)*.14,g);
  const kopf=grp(.05,1.5,0,g);sph(.26,br,0,0,0,kopf);sph(.14,hell,.17,-.05,0,kopf,1,.9,1.2);[-1,1].forEach(z=>{sph(.075,0x14100c,.19,.08,z*.15,kopf);sph(.026,0xffffff,.22,.11,z*.16,kopf);box(.05,.2,.05,0x3a2a1c,.24,-.1,z*.1,kopf)});
  cone(.075,.24,0xe0c040,.27,-.02,0,kopf).rotation.z=-Math.PI/2;cone(.05,.12,0x3a3a3a,.37,-.1,0,kopf).rotation.z=-Math.PI/2-.9;
  [-1,1].forEach(z=>sph(.3,0x5a3a22,-.08,.82,z*.35,g,1.1,2.1,.25));box(.34,.95,.14,0x4a3220,-.34,.26,0,g).rotation.z=.22;
  [-1,1].forEach(z=>{cyl(.045,.34,0xe0b830,.06,.17,z*.17,g);box(.22,.05,.07,0xe0b830,.14,.03,z*.17,g)});g.scale.setScalar(s||1.6);
  g.userData.anim=t=>{kopf.rotation.y=Math.sin(t*.5)*.7;kopf.rotation.z=Math.sin(t*.9)*.12};return g}
const falkeSM=automerge(falkeSitz);
/* Falke im Flug (kreist) */
function falkeFlug(cx,cz,r,y,ph,sp,sk){const g=grp(0,y,0);sph(.25,0x7a5a3a,0,0,0,g,2.1,.55,.65);sph(.17,0x7a5a3a,.5,.1,0,g);sph(.12,0xf0e4c8,.42,.0,0,g,1,.8,1);cone(.05,.14,0xe0c040,.68,.06,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>sph(.03,0x111111,.6,.16,z*.09,g));box(.7,.04,.38,0x4a3220,-.75,-.02,0,g);
  const w=[-1,1].map(s=>{const p=grp(0,.05,s*.16,g);box(.55,.03,.6,0x6a4a2e,.0,0,s*.3,p).rotation.y=s*.25;box(.4,.03,.7,0x3a2a1c,-.25,0,s*.8,p).rotation.y=s*.45;return p});g.scale.setScalar(sk||1.8);
  g.userData.anim=t=>{const a=t*sp+ph,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r*.8,vx=-Math.sin(a)*r,vz=Math.cos(a)*r*.8;g.position.set(x,y+Math.sin(t*.4+ph)*2.5,z);g.rotation.y=Math.atan2(-vz,vx);w[0].rotation.x=Math.sin(t*1.8)*.14-.12;w[1].rotation.x=-Math.sin(t*1.8)*.14+.12};leben(g,ph);return vm(g,w[0],w[1])}
/* Pferd, Esel */
function pferdM(par,f,m){return vier(par,{f:f,w:f,d:0x2a2018,lf:f,h:1.55,bl:1.5,bh:.62,bw:.48,lr:.1,bauch:0,na:.72,nl:1.05,nr:.24,hr:.3,hl:1.9,ht:.18,gr:.6,oh:1.2,ef:f,sc:dk(f,.8),tr:.1,tl:1.2,tw:2,x:(g,kh,tl,nk)=>{box(.14,1.0,.36,m,-.2,.5,0,nk);cone(.16,1.3,m,-.25,-.6,0,tl);box(.1,.4,.22,m,.1,.28,0,kh)}})}
const pferd1=automerge(p=>pferdM(p,0x7a4a2a,0x2a1d14)),pferd2=automerge(p=>pferdM(p,0xf2eee4,0xd8d2c0)),pferd3=automerge(p=>pferdM(p,0x2f2a28,0x1a1614)),pferd4=automerge(p=>pferdM(p,0xb8803a,0x6a4a22));
const esel=automerge(function(par){return vier(par,{f:0x8d8d94,w:0xe8e4da,d:0x2a2a2e,h:1.15,bl:1.1,bh:.5,bw:.4,lr:.09,bauch:0,na:.65,nl:.7,nr:.2,hr:.27,hl:1.7,ht:.25,gr:.5,oh:2.8,ef:0x8d8d94,sc:0xe8e4da,tr:.08,tl:2.4,tw:3})});
/* Huhn, Gans */
function huhn0(par,f){f=f||0xb87a3a;const g=grp(0,0,0,par);sph(.3,f,0,.42,0,g,1.15,1,.85).castShadow=true;sph(.18,dk(f,.7),-.35,.72,0,g,1,.5,.3).rotation.z=.6;cone(.1,.5,dk(f,.7),-.38,.62,0,g).rotation.z=.9;
  [-1,1].forEach(z=>sph(.22,dk(f,.9),-.02,.45,z*.22,g,1.2,.75,.3));const kopf=grp(.3,.78,0,g);sph(.15,f,0,0,0,kopf);box(.05,.13,.12,0xd8302a,0,.14,0,kopf);cone(.05,.15,0xf0b030,.16,-.02,0,kopf).rotation.z=-Math.PI/2;sph(.045,0xd8302a,.12,-.1,0,kopf);[-1,1].forEach(z=>sph(.03,0x111111,.1,.05,z*.1,kopf));
  [-1,1].forEach(z=>cyl(.025,.32,0xe8a830,0,.16,z*.1,g));g.userData.anim=t=>{const u=Math.max(0,Math.sin(t*2.6+g.id))*.9;kopf.rotation.z=-u;g.position.y=0};return g}
const huhn=automerge(p=>huhn0(p,0xb87a3a)),huhnW=automerge(p=>huhn0(p,0xf2eee4)),huhnS=automerge(p=>huhn0(p,0x4a3a30));
function gans0(par){const g=grp(0,0,0,par);sph(.5,0xf6f4ee,0,.6,0,g,1.3,.9,.9).castShadow=true;box(.5,.1,.3,0xf6f4ee,-.7,.8,0,g).rotation.z=.4;[-1,1].forEach(z=>sph(.38,0xe8e4da,-.1,.68,z*.4,g,1.3,.8,.3));
  const nk=grp(.5,.9,0,g);cyl(.1,.8,0xf6f4ee,0,.4,0,nk).rotation.z=-.2;const kopf=grp(.1,.85,0,nk);sph(.17,0xf6f4ee,0,0,0,kopf,1.2,1,.9);box(.3,.08,.16,0xf08a20,.2,-.02,0,kopf);[-1,1].forEach(z=>sph(.035,0x111111,.1,.06,z*.1,kopf));
  [-1,1].forEach(z=>cyl(.04,.36,0xf08a20,0,.18,z*.2,g));g.userData.anim=t=>{nk.rotation.z=Math.sin(t*.9+g.id)*.2;kopf.rotation.z=Math.sin(t*1.4)*.2};return g}
const gans=automerge(gans0);
/* Kleiner Kahn (schaut nach +x) mit Ruder; fischer = Figur im Boot */
function kahnM(par,farbe,fischer){const g=grp(0,0,0,par);box(4.6,.45,1.7,farbe,0,.4,0,g,true);[-1,1].forEach(s=>{box(1.4,.45,1.5,farbe,s*2.7,.6,0,g,true).rotation.z=-s*.45;box(4.8,.35,.14,dk(farbe,.7),0,.82,.82,g);box(4.8,.35,.14,dk(farbe,.7),0,.82,-.82,g)});box(.3,.12,1.5,0x8a5a32,0,.75,0,g);box(.3,.12,1.5,0x8a5a32,1.4,.75,0,g);box(.3,.12,1.5,0x8a5a32,-1.4,.75,0,g);
  [-1,1].forEach(s=>{const o=box(.1,.08,2.6,0x6a4a2e,-.3,.9,s*1.1,g);o.rotation.x=s*.5});
  if(fischer){const m=kindL({jacke:fischer,hose:0x4a3a2a,haut:0xe8b98f,haar:0x6b4626,stil:'kurz',rucksack:null},g);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1);m.g.position.set(-.3,.35,0);m.bl.rotation.x=-1.3;m.br.rotation.x=-1.3;hutAuf(m,0xd8c070)}
  vmVerschm(g);return g}
/* Tracht für kindL-Figuren */
function tracht(m,q){const g=m.g,k=m.kopf;
  if(q.rock!=null){cone(.64,1.3,q.rock,0,.62,0,g);box(.82,.13,.6,dk(q.rock,.55),0,.92,0,g)}else if(q.gurt)box(.82,.13,.6,0x4a3220,0,.92,0,g);
  if(q.schuerze)box(.6,.9,.08,0xf4f0e6,0,.7,.28,g);
  if(q.typ==='haube'){sph(.53,0xf4f0e6,0,.14,-.1,k,1,.8,1);sph(.2,0xf4f0e6,0,-.05,-.5,k,1.2,1,.5)}
  else if(q.typ==='hut')hutAuf(m,q.hut||0x8a3a2a);
  else if(q.typ==='kapuze'){sph(.58,q.j,0,.08,-.1,k,1,.95,1.05);cone(.4,.6,q.j,0,-.35,-.55,k).rotation.x=2.5}
  else if(q.typ==='barett'){sph(.52,q.hut||0x2a6a3a,.04,.2,0,k,1.15,.42,1.1);cone(.03,.5,0xe8b830,-.3,.5,0,k).rotation.z=.6}
  else if(q.typ==='helm'){sph(.57,0x9aa2ac,0,.12,0,k,1,.95,1);box(.5,.14,.1,0x5a626c,0,.0,.53,k);box(.1,.5,.1,0x7a828c,0,-.1,.55,k);sph(.11,q.fed||0xc03a3a,0,.62,0,k)}
  else if(q.typ==='narr'){cone(.3,.9,0xc03a3a,-.32,.7,0,k).rotation.z=.85;cone(.3,.9,0xe8b830,.32,.7,0,k).rotation.z=-.85;sph(.08,0xf2c230,-.65,.95,0,k);sph(.08,0xf2c230,.65,.95,0,k)}
  else if(q.typ==='krone'){cyl(.5,.2,0xf2c230,0,.55,0,k);for(let i=0;i<5;i++)cone(.09,.22,0xf2c230,Math.cos(i*1.26)*.42,.76,Math.sin(i*1.26)*.42,k)}
  if(q.umhang){const c=box(1.0,1.5,.1,q.umhang,0,1.3,-.38,g);c.rotation.x=.08}
  if(q.kragen)sph(.5,q.kragen,0,1.78,0,g,1,.3,.6)}
const KOST=[
  {j:0x7a4a2a,h:0x4a3a2a,hr:0x6b4626,typ:'hut',hut:0x8a3a2a,gurt:1},
  {j:0xc03a3a,h:0x3a3a5a,hr:0xe8c24a,rock:0x3a5ea8,typ:'haube',schuerze:1,stil:'zoepfe'},
  {j:0x6a4a2e,h:0x6a4a2e,hr:0x2a1d14,rock:0x6a4a2e,typ:'kapuze'},
  {j:0x3a8a4a,h:0x5a4a3a,hr:0xb5651d,typ:'barett',hut:0x2a6a3a,gurt:1},
  {j:0xe8b830,h:0xc03a3a,hr:0x6b4626,typ:'narr',gurt:1},
  {j:0x8a4a9a,h:0x3a3a4a,hr:0x2a1d14,rock:0x8a4a9a,typ:'haube',schuerze:1},
  {j:0x9aa2ac,h:0x7c848e,hr:0x6b4626,typ:'helm',umhang:0xc03a3a,kragen:0xb0b8c0},
  {j:0x3a5ea8,h:0x3a3a4a,hr:0x6b4626,typ:'hut',hut:0xc03a3a,gurt:1,stil:'cap'},
  {j:0xd8782a,h:0x4a3a2a,hr:0x1b1410,rock:0xd8782a,typ:'haube',schuerze:1,stil:'pferd'},
  {j:0x8a8a8a,h:0x5a5a5a,hr:0xb0b0b0,typ:'barett',hut:0x7a3a8a,gurt:1},
  {j:0xf2f2ea,h:0x6a4a2e,hr:0x6b4626,typ:'hut',hut:0xe8c850,schuerze:1},
  {j:0x2f5a8a,h:0x4a4a5a,hr:0xe8c24a,rock:0xc89a3a,typ:'krone',stil:'zoepfe'}
];
function kostFig(q,par,sk){const w=grp(0,0,0,par);const m=kindL({jacke:q.j,hose:q.h,haut:q.haut||0xe8b98f,haar:q.hr,stil:q.stil||'kurz',rucksack:null},w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(sk||1.25);tracht(m,q);w.traverse(o=>{if(o.isMesh)o.castShadow=false});return{w,m}}
/* Spaziergänger in Tracht auf Bahn B */
function lauf(B,v,ph,k,sk){const q=KOST[k%KOST.length],f=kostFig(q,null,sk),w=f.w,m=f.m;vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);
  w.userData.anim=t=>{const a=Math.sin(t*6+ph)*.7;m.bl.rotation.x=a;m.br.rotation.x=-a};fahren(w,B,v,ph*B.L/6.3);return w}
/* stehende Figur in Tracht (mit Hindernis); rot: Blickrichtung wie bei person() */
function figK(x,z,rot,k,sk,extra){const q=Object.assign({},KOST[k%KOST.length],extra||{}),f=kostFig(q,null,sk||1.25);f.m.g.rotation.y=0;f.w.position.set(x,0,z);f.w.rotation.y=rot||0;vmVerschm(f.m.g);vmVerschm(f.w);kreis(x,z,.55);return f}
/* Ritter ohne Waffe, hält ein Banner (Stange, Fahne) */
function ritterFig(x,z,rot,k,farbe,farbe2){const f=figK(x,z,rot,6,1.3,{umhang:farbe,fed:farbe2||farbe}),g=grp(x,0,z);g.rotation.y=rot||0;cyl(.07,3.6,0x6a4a2e,1.0,1.8,.5,g,true);const fl=box(1.5,1.1,.08,farbe,1.8,3.1,.5,g);box(1.5,.28,.1,farbe2||0xf2f2ea,1.8,3.1,.5,g);sph(.16,0xe0c040,1.0,3.7,.5,g);vm(g);return f}
/* Wirtshausschild nur als Bild (Bär), an einem Ausleger */
function baerSchild(par,x,y,z){const g=grp(x,y,z,par);box(.14,.14,2.6,0x3a3a3e,0,0,1.3,g);box(.2,1.6,.2,0x3a3a3e,0,-.8,0,g);const b=box(.3,2.2,2.0,0xe8d8b0,0,-1.5,2.2,g);box(.34,.2,2.1,0x6a4a2e,0,-.35,2.2,g);
  sph(.5,0x7a4a2a,.2,-1.75,2.2,g,.5,1,1);sph(.36,0x7a4a2a,.2,-1.1,2.2,g,.6,.9,.9);[-1,1].forEach(s=>{sph(.12,0x7a4a2a,.3,-.78,2.2+s*.28,g);sph(.05,0x111111,.34,-1.15,2.2+s*.12,g)});sph(.14,0xd8b890,.36,-1.0,2.2,g,.5,.7,.9);sph(.06,0x111111,.42,-1.0,2.2,g);
  [-1,1].forEach(s=>{sph(.16,0x7a4a2a,.2,-2.2,2.2+s*.4,g,.6,1.4,.6)});return g}

/* ==================== Hilfen für Wege, Orte und Stadt ==================== */
const gx=z=>wegX(z);
const lay=b=>({x:d=>b.x+d,z:d=>b.z+b.dir*d,r:b.dir>0?0:Math.PI});
function strasse(r,x0,x1){const p=[];x0=x0==null?-150:x0;x1=x1==null?150:x1;for(let x=x0;x<x1;x+=19)p.push([x,roadZ(x,r)]);p.push([x1,roadZ(x1,r)]);return p}
/* Ort suchen und mit der nächsten Querstraße verbinden (r0 erzwingt eine Straße) */
function zone(n,r0){const b=ZN(n);if(!b)throw new Error('Zone fehlt: '+n);let best=94,bd=1e9;SEITENWEGE.forEach(r=>{const d=Math.abs(r-b.z);if(d<bd){bd=d;best=r}});if(r0!=null)best=r0;b.road=best;b.dir=best>b.z?1:-1;b.gap=b.dir>0?Math.PI/2:-Math.PI/2;return b}
function ast(b,w,bend,farbe){const x=b.x,z0=roadZ(x,b.road),bd=bend==null?(x>0?-2.4:2.4):bend;weg([[x,z0],[x+bd,(z0+b.z)/2],[x,b.z+b.dir*1.5]],w||3.2,farbe)}
function hauptSeg(z0,z1,w,farbe){const r=[];for(let z=z0;z>z1+.5;z-=10)r.push([gx(z),z]);r.push([gx(z1),z1]);weg(r,w,farbe)}
const COB=0xb3ada0,ERDE=0xcdb284;
/* Wasser im Burggraben (Rechteck mit Loch), Uferrand */
function grabenFl(){const sh=new THREE.Shape(),ho=new THREE.Path(),R=(S,x0,x1,z0,z1,rev)=>{const p=[[x0,z0],[x1,z0],[x1,z1],[x0,z1]];if(rev)p.reverse();p.forEach((q,i)=>i?S.lineTo(q[0],-q[1]):S.moveTo(q[0],-q[1]))};
  R(sh,-GR,GR,-87,-185);R(ho,-BX-1,BX+1,BZ0+1,BZ1-1,true);sh.holes.push(ho);const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),mat(WASSER));m.rotation.x=-Math.PI/2;m.position.y=.09;m.receiveShadow=true;scene.add(m);
  const sh2=new THREE.Shape(),h2=new THREE.Path();R(sh2,-GR-1.4,GR+1.4,-85.6,-186.4);R(h2,-GR+.2,GR-.2,-87.2,-184.8,true);sh2.holes.push(h2);const m2=new THREE.Mesh(new THREE.ShapeGeometry(sh2),mat(0x9a8a62));m2.rotation.x=-Math.PI/2;m2.position.y=.06;m2.receiveShadow=true;scene.add(m2);
  /* Ufer-Hindernis außen, an den Brücken offen */
  const gS=gx(-87),gN=0;sperrLinie(-GR,-87,gS-4.6,-87,.5);sperrLinie(gS+4.6,-87,GR,-87,.5);sperrLinie(-GR,-185,gN-4.6,-185,.5);sperrLinie(gN+4.6,-185,GR,-185,.5);sperrLinie(-GR,-87,-GR,-185,.5);sperrLinie(GR,-87,GR,-185,.5)}
/* Torhaus: zwei Rundtürme links und rechts einer Öffnung, Torbalken oben; achse 'x' = Mauer läuft entlang x */
function torhaus(x,z,achse,r,h,balken){const e=5.5+r;[-1,1].forEach(s=>mTurm(achse==='x'?x+s*e:x,achse==='x'?z:z+s*e,r,h,{zinnen:true}));
  const L=LG(x,z,achse==='x'?0:Math.PI/2);L.b(0,balken||5.6,0,e*2,1.5,2.6,0xa09a8c);L.b(0,(balken||5.6)+1.0,0,e*2-1,.3,3,0x8a847a);for(let i=-2;i<=2;i++)L.b(i*1.2,(balken||5.6)-1.2,0,.18,1.1,.18,0x3a342c)}
function etappe1(){
  WASSER=0x4aa5d4;FARBEN={boden:0x76b04e,pfad:ERDE,platz:COB,gehege:0x9ccb66};
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(1400,1400),mat(0x76b04e));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
  bandFl(160,95,0x7db652,.02);bandFl(66,-70,0x6fa84a,.02);bandFl(-95,-150,0x80b858,.02);bandFl(-150,-250,0x70a64c,.02);
  [[-150,40,26],[160,-60,24],[-150,-110,24],[150,-150,22],[-100,100,20],[110,138,20]].forEach(p=>inst('sphT',p[0],0,p[1],p[2],.05,p[2]*.7,0x86bc5a));
  /* Stadtboden (Pflaster) und Burghof-Boden */
  [[0,-6,224,132,0xb9b2a0],[0,-136,140,80,0xb8ad92]].forEach(f=>{const b=box(f[2],.07,f[3],f[4],f[0],.035,f[1],scene);b.receiveShadow=true});
  /* Hauptweg: Erde, in der Stadt und in der Burg Pflaster */
  hauptSeg(148,66,5,ERDE);hauptSeg(66,-74,5,COB);hauptSeg(-74,-96,5,ERDE);hauptSeg(-96,-176,5,COB);hauptSeg(-176,TORZ+2,5,ERDE);
  SEITENWEGE.forEach(r=>{const innen=r===44||r===-8||r===-58;if(innen){weg(strasse(r,-112,112),4,COB);weg(strasse(r,-150,-110),4,ERDE);weg(strasse(r,110,150),4,ERDE)}else weg(strasse(r),4,ERDE);const px=gx(r);kreuzplatz(px,roadZ(px,r),7.5)});
  /* Ringwege West und Ost (Erde) */
  weg(spl([[-136,94],[-140,60],[-134,20],[-138,-20],[-134,-58],[-140,-84],[-138,-110],[-142,-150],[-138,-176]],10),3.4,ERDE);weg(spl([[136,94],[140,62],[134,20],[138,-20],[134,-58],[140,-84],[138,-110],[142,-150],[138,-176]],10),3.4,ERDE);
  scheibe(0,114,12,COB,.07);weg([[0,TORZ+2],[0,TORZ-24]],5,FARBEN.platz);scheibe(FEST.x,FEST.z,17,FARBEN.platz,.08);
  /* Fluss mit Brücken (Hauptweg, Ringwege), Mühlbach mit Brücke */
  (function(){const s=spl(RIO,2.5),br=[bruecke(gx(76),76,s,RW),bruecke(-138,80,s,RW),bruecke(138,80,s,RW)];bachBauen(s,RW,br);sgFluss(s,7);
    const s2=spl(BACH,2.5),b2=[bruecke(140,66,s2,4)];bachBauen(s2,4,b2);sgFluss(s2,4);
    /* Uferlinien bis an das Brückengeländer (sonst bleibt ein Spalt, durch den man auf dem Wasser läuft) */
    {const q=b2[0],i0=s2.reduce((m,p,i)=>Math.hypot(p[0]-q[0],p[1]-q[1])<Math.hypot(s2[m][0]-q[0],s2[m][1]-q[1])?i:m,0),a=s2[Math.max(0,i0-1)],c=s2[Math.min(s2.length-1,i0+1)],l=Math.hypot(c[0]-a[0],c[1]-a[1]),tx=(c[0]-a[0])/l,tz=(c[1]-a[1])/l;
      [-1,1].forEach(v=>[-1,1].forEach(u=>sperrLinie(q[0]+u*3.4*tx-v*2*tz,q[1]+u*3.4*tz+v*2*tx,q[0]+u*9.5*tx-v*2*tz,q[1]+u*9.5*tz+v*2*tx,.2)))}})();
  /* Burggraben */
  grabenFl();
  /* Stadtmauer: Rechteck x -112..112, z -72..60; Tore für Hauptweg und die Querwege 44, -8, -58 */
  (function(){const X=112,Z0=60,Z1=-72,g0=gx(Z0),g1=gx(Z1),rz=(x,r)=>roadZ(x,r);
    mauer(-X,Z0,X,Z0,[[g0+X,5.4]]);mauer(X,Z1,-X,Z1,[[X-g1,5.4]]);
    mauer(-X,Z0,-X,Z1,[44,-8,-58].map(r=>[Z0-rz(-X,r),5.4]));mauer(X,Z1,X,Z0,[44,-8,-58].map(r=>[rz(X,r)-Z1,5.4]));
    [[-X,Z0],[X,Z0],[-X,Z1],[X,Z1]].forEach(p=>mTurm(p[0],p[1],4.2,11,{zinnen:true}));
    torhaus(g0,Z0,'x',2.6,8);torhaus(g1,Z1,'x',2.6,8);[44,-8,-58].forEach(r=>{torhaus(-X,rz(-X,r),'z',2.4,8);torhaus(X,rz(X,r),'z',2.4,8)});
    [[-76,Z0],[-40,Z0],[-8,Z0],[34,Z0],[70,Z0],[-76,Z1],[-40,Z1],[40,Z1],[76,Z1]].forEach(p=>{if(Math.abs(p[0]-(p[1]===Z0?g0:g1))>9)mTurm(p[0],p[1],2.8,9.5,{zinnen:true})});
    [[-X,26],[-X,-32],[X,26],[X,-32],[-X,-66],[X,-66]].forEach(p=>mTurm(p[0],p[1],2.8,9.5,{zinnen:true}))})();
  /* Burgmauer: x ±70, z -176..-96; Tor im Süden (Hauptweg), Hintertor im Norden */
  (function(){const g0=gx(BZ0),g1=0;
    mauer(-BX,BZ0,BX,BZ0,[[g0+BX,5.4]],8.6,3,0xa8a294);mauer(BX,BZ1,-BX,BZ1,[[BX-g1,5.4]],8.6,3,0xa8a294);mauer(-BX,BZ0,-BX,BZ1,[],8.6,3,0xa8a294);mauer(BX,BZ1,BX,BZ0,[],8.6,3,0xa8a294);
    [[-BX,BZ0],[BX,BZ0],[-BX,BZ1],[BX,BZ1]].forEach(p=>mTurm(p[0],p[1],5.4,16,{zinnen:false,rh:9}));
    [[-BX,-136],[BX,-136],[-35,BZ1],[35,BZ1],[-35,BZ0],[38,BZ0]].forEach(p=>mTurm(p[0],p[1],3.4,12,{zinnen:true}));
    torhaus(g0,BZ0,'x',3.4,11,7.2);torhaus(g1,BZ1,'x',3.2,11,7.2)})();
  /* ---------- Ausgang (Tor wird geöffnet): zwei Steinsäulen mit Holzflügeln ---------- */
  ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{cyl(.95,6.8,0xa8a294,s*4.4,3.4,0,g,true);for(let k=0;k<3;k++)cyl(1.0,.4,0x8a847a,s*4.4,1+k*2.2,0,g);cone(1.5,2.2,0xb04a38,s*4.4,8,0,g);cyl(.08,1.4,0x3a3a3a,s*4.4,9.5,0,g)});box(10.8,1,.9,0x7a5230,0,6.3,0,g,true);box(11,.3,1.2,0xb04a38,0,6.95,0,g);
    const s=schildText('Ausgang','#f2e6c8',5.4,1.3);s.position.set(0,6.3,.5);g.add(s);
    const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.3,0x7a5230,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.34,i%2?0x5a3a20:0x8a6238,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.38,0x3a3a40,s*-1.9,1,0,p);box(3.8,.2,.38,0x3a3a40,s*-1.9,2.8,0,p);sph(.25,0x3a3a40,s*-3.4,1.9,.2,p);return p});
    kreis(-4.4,TORZ,1.2);kreis(4.4,TORZ,1.2);vm(g,fl[0],fl[1]);lebendig.push({o:{userData:{anim:t=>{const v=Math.abs(camera.position.z-TORZ)<240;if(g.visible!==v)g.visible=v}}},ph:0});return {g,fl,offen:0}})();
  /* ---------- Dorfeingang: Holztor mit Wimpeln, Falke Falko, Karren, Wachen ---------- */
  (function(){const ez=111;[-1,1].forEach(s=>{cyl(.55,7,0x7a5230,s*7,3.5,ez,scene,true);for(let k=0;k<3;k++)cyl(.6,.35,0x4a3220,s*7,1+k*2.4,ez,scene);cone(1.3,2,0xb04a38,s*7,8,ez,scene);kreis(s*7,ez,.95);
      const f=grp(s*7,5.6,ez+.2);box(.12,3,1.8,s>0?0xc03a3a:0x3a5ea8,s*.4,-1.2,0,f);box(.14,.3,1.9,0xe8b830,s*.4,-.1,0,f);vm(f)});
    box(14.8,1.1,.9,0x7a5230,0,6.4,ez,scene,true);box(15.2,.4,1.3,0xb04a38,0,7.1,ez,scene);const sn=schildText(CONFIG.spielname,'#f2e6c8',7.5,1.6,CONFIG.spielname.length>12?44:60);sn.position.set(0,6.4,ez+.5);scene.add(sn);
    for(let i=0;i<13;i++){const t=i/12,x=-6.6+t*13.2;inst('con',x,5.4-Math.sin(t*3.14)*.7,ez+.6,.32,.75,.32,KOLOR[i%6],0,Math.PI)}
    [[-16,104],[16,104],[-24,120],[24,120]].forEach((p,i)=>fahne(p[0],p[1],7.5,[0xc03a3a,0x3a5ea8,0xe8b830,0x3a8a4a][i],0xf2f2ea));
    /* Falke Falko auf der Stange */
    (function(){const g=grp(-9,0,122);cyl(.14,3.4,0x6a4a2e,0,1.7,0,g,true);box(1.4,.14,.14,0x6a4a2e,0,3.3,0,g);box(1.6,.2,.4,0x5a3a22,0,.1,0,g);kreis(-9,122,.9);
      const f=falkeSM(g,2.3);f.position.set(0,3.4,0);f.rotation.y=.4;leben(f,0)})();
    /* Karren mit Heu und Esel */
    (function(){const g=grp(15,0,126);g.rotation.y=-.4;box(4,.3,2.2,0x8a5a32,0,1.2,0,g,true);[-1,1].forEach(s=>{cyl(.9,.25,0x6a4a2e,-1.2,.9,s*1.3,g,true).rotation.x=Math.PI/2;cyl(.9,.25,0x6a4a2e,1.2,.9,s*1.3,g).rotation.x=Math.PI/2;box(4,.8,.15,0x8a5a32,0,1.7,s*1.05,g)});sph(1,0xd8b848,0,2.3,0,g,2,.9,1.1);box(2.6,.12,.12,0x6a4a2e,3.2,1.1,0,g);sperrKasten(15,126,4.4,2.6,-.4);
      const e=esel(scene);e.position.set(19.4,0,127.6);e.rotation.y=Math.PI+.1;e.scale.setScalar(1.5);lebendig.push({o:e,ph:1});kreis(19.4,127.6,.9)})();
    fig(-5,118,.4,0xc03a3a,0x4a4a5a,0x6b4626,'kurz',1.3);fig(5,118.5,3.3,0x3a5ea8,0x4a4a5a,0xe8c24a,'zoepfe',1.25);fig(-14,116,1.2,0x8a6a42,0x5a4a3a,0x2a1d14,'cap',1.2);
    for(let i=0;i<14;i++){const a=nr()*6.28,r=4+nr()*3;blumeI(-20+Math.cos(a)*r,100+Math.sin(a)*r*.6,i%6);blumeI(20+Math.cos(a)*r,100+Math.sin(a)*r*.6,(i+2)%6)}
    [[-12,134],[12,134]].forEach(p=>{tonne(p[0],p[1]);tonne(p[0]+1.1,p[1]+.3)});holzstapel(-22,130,.3);ballen(24,138,.5);ballen(-24,138,2)})();
  /* ---------- Festplatz: Burgfest mit Bühne, Feuerkörben, Wimpeln ---------- */
  (function(){const z0=FEST.z,bue=grp(0,0,z0-12);box(16,1,6,0x8a5a32,0,.5,0,bue,true);box(16.4,.3,6.4,0xc8a86a,0,1.05,0,bue);
    [-1,1].forEach(s=>{cyl(.35,11,0x7a5230,s*8.2,5.5,-2.6,bue,true);cone(.9,1.3,0xb04a38,s*8.2,11.5,-2.6,bue)});box(17,.5,.5,0x7a5230,0,10.4,-2.6,bue);
    for(let i=0;i<8;i++){const q=box(2.2,.15,6.8,i%2?0xc03a3a:0xf2e6c8,-7.7+i*2.2,10.9-Math.abs(i-3.5)*.12,-.2,bue);q.rotation.x=.12}
    box(11,5.4,.3,0x3a5ea8,0,4.6,-2.9,bue);[[-3.6,0xc03a3a],[0,0xe8b830],[3.6,0xc03a3a]].forEach(p=>{sph(.9,p[1],p[0],5,-2.7,bue,1,1.2,.2)});
    const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,8.6,-2.4);bue.add(gs);kreis(0,z0-12,9);
    for(let i=0;i<28;i++){const t=i/27,x=-14+t*28;inst('con',x,6.4-Math.sin(t*Math.PI)*2.2-.3,z0-8,.4,.85,.4,KOLOR[i%6],0,Math.PI)}
    [-14,14].forEach(x=>{cyl(.18,8,0x7a5230,x,4,z0-8,scene,true);kreis(x,z0-8,.35)});
    /* Feuerkörbe */
    [[-12,z0+4],[12,z0+4],[-18,z0-6],[18,z0-6],[-6,z0+14],[6,z0+14]].forEach((p,i)=>{cyl(.14,1.5,0x3a3a3e,p[0],.75,p[1],scene,true);cyl(.7,.5,0x3a3a3e,p[0],1.6,p[1],scene);if(i<4)flamme(p[0],1.8,p[1],1);else inst('sph',p[0],1.95,p[1],.5,.16,.5,0x8a2a1a);if(i===0)rauch(scene,p[0]+.2,3,p[1]);kreis(p[0],p[1],.8)});
    /* Zelte, Tische, Strohballen */
    [[-12,z0+22],[12,z0+22]].forEach((p,i)=>{const g=grp(p[0],0,p[1]);cone(3.6,4,[0xc03a3a,0x3a5ea8][i],0,2.2,0,g,true).scale.set(1,1,1);box(2,2.6,.2,0x2a2a2e,0,1.3,2.6,g);kreis(p[0],p[1],3.4)});
    [[-24,z0+10],[24,z0+10],[-4,z0+26],[4,z0+26],[-20,z0+24],[20,z0+24]].forEach(p=>{tisch(p[0],p[1],0);bankW(p[0]-1.6,p[1],Math.PI/2);bankW(p[0]+1.6,p[1],-Math.PI/2)});
    [[-20,z0+2],[20,z0+2],[-26,z0-4],[26,z0-4]].forEach(p=>{ballen(p[0],p[1],.3);ballen(p[0]+1.5,p[1]+.4,1)});
    [[-8,z0-2],[8,z0-2],[-16,z0+8],[16,z0+8]].forEach(p=>{cyl(.08,3.4,0x7a5230,p[0],1.7,p[1],scene,true);kreis(p[0],p[1],.3)});
    for(let i=0;i<40;i++){const a=nr()*6.28,r=22+nr()*16;const x=Math.cos(a)*r,z=z0-4+Math.sin(a)*r*.7;if(z<-232||z>-194)continue;if(i%3===0)gras(x,z,.8);else if(i%3===1)blumeI(x,z);else busch(x,z,.9)}
    [[-26,z0-10],[26,z0-10],[-30,z0+6],[30,z0+6]].forEach((p,i)=>baum(p[0],p[1],i%2?0:1,1.1));
  })();
}
/* Fluss-Cluster: Raster-Flächen für den Bewuchs sperren */
function sgFluss(s,w){s.forEach((q,i)=>{if(i%2===0)sgMark(q[0],q[1],w+1.5)})}

/* ==================== Gemeinsame Kleinteile ==================== */
/* Fahne an einer Stange (Stange instanziert, Tuch bewegt sich) */
function flagge(x,y0,z,len,c1,c2,breit){inst('cyl',x,y0+len/2,z,.07,len,.07,0xe8e4da);inst('sph',x,y0+len+.05,z,.14,.14,.14,0xe0c040);const f=grp(x,y0+len-.7,z);for(let i=0;i<4;i++)box(.45*(breit||1),.9,.05,i%2?c2:c1,.25+i*.45*(breit||1),0,0,f);vm(f);bewegt(f,t=>{f.rotation.y=Math.sin(t*1.7+x)*.2})}
function fackel(x,z,h){h=h||3;inst('cyl',x,h/2,z,.09,h,.09,0x5a3a22);inst('sph',x,h+.1,z,.28,.4,.28,0xffcf50);kreis(x,z,.3)}
function brunnen(x,z,s,wasser){s=s||1;inst('cylT',x,.55*s,z,1.8*s,1.1*s,1.8*s,0x9a948a);inst('cylT',x,1.1*s,z,1.95*s,.2*s,1.95*s,0x7e786e);inst('cylT',x,1.02*s,z,1.5*s,.1*s,1.5*s,wasser||0x4aa5d4);
  [-1,1].forEach(q=>inst('box',x+q*1.6*s,2.1*s,z,.22*s,2.2*s,.22*s,0x6a4a2e));inst('box',x,3.2*s,z,3.6*s,.2*s,.2*s,0x6a4a2e);
  [-1,1].forEach(q=>inst('box',x,3.7*s,z+q*.5*s,3.7*s,.15*s,1.1*s,0xb04a38,0,q*.7));inst('cyl',x,2.9*s,z,.05*s,.9*s,.05*s,0x6a4a2e);inst('cyl',x,2.4*s,z,.35*s,.45*s,.35*s,0x8a5a32);kreis(x,z,2.1*s)}
function karren(x,z,rot,ladung){const g=grp(x,0,z);g.rotation.y=rot||0;box(3.6,.28,1.9,0x8a5a32,0,1.15,0,g,true);[-1,1].forEach(s=>{cyl(.85,.2,0x6a4a2e,-1,.85,s*1.15,g).rotation.x=Math.PI/2;cyl(.85,.2,0x6a4a2e,1,.85,s*1.15,g).rotation.x=Math.PI/2;box(3.6,.6,.12,0x8a5a32,0,1.6,s*.9,g)});box(2.4,.1,.1,0x6a4a2e,2.9,1.0,0,g);
  if(ladung==='heu')sph(1,0xd8b848,0,2.1,0,g,1.8,.8,1);else if(ladung==='faesser'){cyl(.5,.9,0x8a5a32,-.7,1.8,0,g);cyl(.5,.9,0x8a5a32,.7,1.8,0,g)}else if(ladung==='kohl'){for(let i=0;i<7;i++)sph(.42,0x6ab04a,-1.2+i*.4,1.7+(i%2)*.3,(i%3-1)*.4,g)}else if(ladung==='saecke'){for(let i=0;i<4;i++)sph(.5,0xd8c090,-1.1+i*.75,1.7,(i%2-.5)*.5,g,1,1.1,.9)}
  vm(g);sperrKasten(x,z,4,2.6,rot||0);return g}
function fassI(x,z,s,c){s=s||1;inst('cyl',x,.55*s,z,.5*s,1.1*s,.5*s,c||0x8a5a32);[.2,.9].forEach(y=>inst('cyl',x,y*s,z,.54*s,.1*s,.54*s,0x3a3a40));kreis(x,z,.6*s)}
function kistenI(x,z,n,rot){for(let i=0;i<n;i++)inst('box',x+(i%2)*.3,.4+(i>>1)*.8,z+(i%2)*.2,1.3,.8,1.1,[0xa8743f,0x9a6a3a,0xb88450][i%3],rot||0);kreis(x,z,1.1)}
function heuI(x,z,s){s=s||1;inst('sph',x,.8*s,z,1.5*s,1.0*s,1.3*s,0xd8b848);kreis(x,z,1.4*s)}
/* Marktstand mit Dach (Streifen), Ware: 'obst','tuch','gewuerz','brot','fisch','kaese','topf' */
function stand(x,z,rot,k,ware){const L=LG(x,z,rot),c1=KOLOR[k%6],c2=0xf2f2ea;L.b(0,.5,0,3.4,.18,1.5,0x8a5a32);[-1.6,1.6].forEach(s=>[-.8,.8].forEach(t=>L.c(s,0,t,.07,2.6,0x6a4a2e)));L.b(0,.25,0,3.0,.5,1.2,0x9a6a3a);
  for(let i=0;i<6;i++)L.b(-1.9+i*.76,2.62+(i%2)*.03,.1,.76,.08,2.2,i%2?c2:c1,.3);
  const WR={obst:[0xd8302a,0x6ab04a,0xf0a830,0xd8302a],tuch:[0xc03a3a,0x3a5ea8,0xe8b830,0x3a8a4a],gewuerz:[0xe8a830,0xc03a3a,0x8a5a32,0xd8c070],brot:[0xc8944a,0xd8a85a,0xb8803a,0xe0b870],fisch:[0xb8c8d0,0x9aaab8,0xc8d4dc,0x8a9aaa],kaese:[0xf0d060,0xf2dc7a,0xe8c850,0xf8e48a],topf:[0xc87a4a,0xa85a32,0xd89060,0x8a4a2e]}[ware||'obst'];
  for(let i=0;i<9;i++){const lx=-1.2+(i%5)*.6,lz=-.3+(i>>2)*.55;if(ware==='tuch')L.c(lx,.62,lz,.22,.7,WR[i%4]);else if(ware==='kaese')L.c(lx,.62,lz,.3,.25,WR[i%4]);else if(ware==='topf')L.s(lx,.9,lz,.28,.3,.28,WR[i%4]);else L.s(lx,.72,lz,.2,.2,.2,WR[i%4])}
  sperrKasten(x,z,3.6,1.9,rot||0)}
/* kleines Holzhaus (Schuppen) */
function schuppen(x,z,w,d,rot,dach,wand){const L=LG(x,z,rot);L.b(0,1.4,0,w,2.8,d,wand||0x8a6238);for(let i=0;i<Math.round(w/1.2);i++)L.b(-w/2+.6+i*1.2,1.4,d/2+.04,.12,2.8,.1,0x5a3a22);L.g(0,2.8,0,w+.8,1.5,d+.8,dach||0x7a5a3a);L.b(0,1.1,d/2+.06,1.3,2.2,.12,0x4a3220);sperrKasten(x,z,w+.4,d+.4,rot||0)}
function weinI(x,z,len,rot){const L=LG(x,z,rot);for(let i=0;i<=len/2;i++)L.b(-len/2+i*2,1.0,0,.12,2,.12,0x6a4a2e);L.b(0,1.7,0,len,.06,.06,0x6a4a2e);L.b(0,1.1,0,len,.06,.06,0x6a4a2e);for(let i=0;i<len/1.2;i++){L.s(-len/2+.6+i*1.2,1.35,0,.55,.7,.4,[0x4f8a3a,0x5a9a40][i%2]);if(i%2)L.s(-len/2+.6+i*1.2,.75,.2,.14,.2,.14,0x5a2a7a)}}
function obstbaum(x,z,s,kol){s=s||1;baum(x,z,5,s,kol||0x68a03a);for(let i=0;i<5;i++){const a=i*1.3+x;inst('sph',x+Math.cos(a)*1.6*s,4.2*s+(i%2)*.8,z+Math.sin(a)*1.4*s,.2,.2,.2,[0xd8302a,0xf0c030,0xd8302a][i%3])}}

/* ==================== Etappe 2: Dorf und Land im Süden ==================== */
function ort27(){const b=zone('Windmühle und Getreidefeld'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,5.5,0xc8b890,.09);
  inst('cylT',bx,.4,bz,5.4,.8,5.4,0x8a847a);inst('cylT',bx,3.5,bz,4.1,6.2,4.1,0xf0e8d4);inst('cylT',bx,8.4,bz,3.4,3.8,3.4,0xe8dcc0);inst('cylT',bx,12.2,bz,2.8,3.8,2.8,0xf0e8d4);inst('conT',bx,15.6,bz,3.5,3.6,3.5,0x8a3a2a);
  for(let k=0;k<3;k++)inst('box',bx+Math.cos(k*2.1)*4.1,5+k*2.8,bz+Math.sin(k*2.1)*4.1,.9,1.2,.2,0x86b0c8,-k*2.1+1.57);
  inst('box',bx,1.9,bz+4.1,1.9,3.2,.3,0x6b4524);
  inst('box',bx,12.4,bz+3,.6,.6,2.6,0x5a3a22);
  const hub=grp(bx,14.8,bz+4.2);const sg=grp(0,0,0,hub);for(let i=0;i<4;i++){const a=grp(0,0,0,sg);a.rotation.z=i*Math.PI/2;box(.45,10.6,.35,0x6a4a2e,0,5.3,0,a);box(2.0,7.2,.1,0xf6f0e0,1.2,5.8,0,a);for(let k=0;k<5;k++)box(2.1,.1,.2,0x6a4a2e,1.2,2.2+k*1.4,0,a)}sph(.55,0x3a3a40,0,0,0,hub);vm(hub);bewegt(hub,t=>{hub.rotation.z=t*.55});
  kreis(bx,bz,5.3);
  /* Felder (Getreide) rundum, Vogelscheuche, Heu, Esel mit Sack */
  acker(X(-17),Z(-4),14,11,R,[0xdcb94a,0xe6c85c,0xd0ac40]);acker(X(17),Z(-6),14,10,R+.1,[0xd8b448,0xe2c458]);acker(X(-14),Z(12),12,9,R,[0x9ac24a,0xaed25a]);acker(X(16),Z(10),12,9,R,[0x8abf48,0x9ac856]);
  (function(){const x=X(-17),z=Z(3.6);inst('cyl',x,1.6,z,.09,3.2,.09,0x6a4a2e);inst('box',x,2.6,z,2.2,.1,.1,0x6a4a2e);inst('sph',x,3.5,z,.4,.45,.4,0xe8d8a0);inst('cyl',x,3.85,z,.7,.1,.7,0x6a4a2e);inst('con',x,4.1,z,.4,.5,.4,0x6a4a2e);inst('box',x,2.0,z,.9,1.2,.3,0xc03a3a)})();
  heuI(X(8),Z(-9),1);heuI(X(10.2),Z(-10),.9);kistenI(X(-7),Z(8),3);
  const e=esel(scene);e.position.set(X(7),0,Z(7));e.rotation.y=R+2.4;e.scale.setScalar(1.5);lebendig.push({o:e,ph:2});kreis(X(7),Z(7),1);sack(X(5),Z(8),0xd8c090,1.1);sack(X(5.8),Z(8.8),0xe0cc9a,1);
  figK(X(-4),Z(7),R+.6,10,1.3);figK(X(12),Z(3),R-.8,0,1.25)}
function ort29(){const b=zone('Fischerhafen am Fluss'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,8,0xc8b88a,.09);
  steg(bx,92,bx,81.5,3.2);steg(bx+4,90,bx+4,83,2.4);steg(bx-5.6,82,bx-5.6,87,2);
  kahnM(scene,0x8a5a32,0x3a5ea8).position.set(bx-2.8,.05,80.6);kahnM(scene,0x6a8a9a,0xc03a3a).position.set(bx+6,.05,81.2);const kk=kahnM(scene,0x8a4a2e,null);kk.position.set(bx-9,.05,79);kk.rotation.y=.4;
  fachwerk(bx-6,bz-3,7,5.6,R+.2,{dach:0xc9a64a,og:false,wand:0xe6c58a});fachwerk(bx+8,bz-6,6,5,R-.2,{dach:0xc9a64a,og:false,wand:0xd4dcc0});
  for(let i=0;i<2;i++){const x=bx-8+i*10,z=bz+4.5;inst('cyl',x,2.2,z,.1,4.4,.1,0x6a4a2e);inst('cyl',x+5,2.2,z,.1,4.4,.1,0x6a4a2e);inst('box',x+2.5,3.4,z,5.1,.1,.1,0x6a4a2e);inst('box',x+2.5,2.4,z,5,2.3,.1,[0x6a8a8a,0x7a9a8a][i]);inst('sph',x+1.4,.5,z+.2,.3,.2,.3,0xc0c8d0)}
  fassI(bx+3,bz+1,1,0x6a4a2e);fassI(bx+4.2,bz+1.4,.9,0x8a5a32);kistenI(bx-1,bz+4,3);
  [[bx+5,bz+4.4],[bx-4,bz+5.6]].forEach(p=>{inst('cyl',p[0],.5,p[1],.5,1,.5,0x9a7a4a);inst('cyl',p[0]+1.1,.5,p[1]+.3,.5,1,.5,0xa88a56)});
  /* Räucherofen */
  inst('box',bx+10,1.5,bz+3,2.2,3,2,0x8a847a);inst('box',bx+10,3.4,bz+3,1,.8,1,0x6a645a);rauch(scene,bx+10,3.6,bz+3);sperrKasten(bx+10,bz+3,2.4,2.2,0);
  figK(bx+1,86.5,R,3,1.25,{typ:'hut',hut:0xd8c070});figK(bx-3,bz+2,R+1,0,1.3);const gg=[];for(let i=0;i<4;i++){const g=gans(scene);g.position.set(bx+12+i*1.1,0,bz+8+(i%2)*.8);g.rotation.y=nr()*6;g.scale.setScalar(1.4);lebendig.push({o:g,ph:i});kreis(g.position.x,g.position.z,.5)}
  for(let i=0;i<8;i++)gras(bx+(nr()-.5)*30,83.5+nr()*1.5,.9+nr()*.6)}
function ort30(){const b=zone('Bauerndorf'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,8,0x8abf5a,.09);
  fachwerk(X(-12),Z(-6),8,6,R+.2,{dach:0xc9a64a,og:false});fachwerk(X(10),Z(-8),7.5,6.4,R-.2,{dach:0xc9a64a,og:true,wand:0xe8b8a0});fachwerk(X(-14),Z(9),7,5.6,R+Math.PI/2,{dach:0xc9a64a,og:false,wand:0xd4dcc0});fachwerk(X(14),Z(8),6.4,5.6,R-Math.PI/2,{dach:0xc9a64a,og:false});
  /* Scheune */
  (function(){const x=X(-1),z=Z(-14),L2=LG(x,z,R);L2.b(0,2.3,0,11,4.6,7.4,0x8a6a42);for(let i=0;i<8;i++)L2.b(-4.8+i*1.4,2.3,3.76,.2,4.6,.1,0x5a3a22);L2.g(0,4.6,0,12,3.2,8.4,0x7a5a3a);L2.b(0,2,3.8,4.2,3.8,.2,0x5a3a22);L2.b(-1,2,3.9,.2,3.8,.2,0x3a2a1a);L2.b(1,2,3.9,.2,3.8,.2,0x3a2a1a);sperrKasten(x,z,11.4,7.8,R)})();
  brunnen(bx,bz,.9);
  for(let i=0;i<7;i++){const h=huhn(scene);h.position.set(bx+(nr()-.5)*14,0,bz+(nr()-.5)*10);h.rotation.y=nr()*6;h.scale.setScalar(1.3);lebendig.push({o:h,ph:i});kreis(h.position.x,h.position.z,.35)}
  /* Gemüsegärten, Zäune, Karren */
  acker(X(-14),Z(-1),6,5,0,[0x6ab04a,0x7ac05a,0x5aa03a]);acker(X(15),Z(0),6,5,0,[0x7a9a3a,0x6ab04a]);zaunI(X(-17.5),Z(-3.5),X(-17.5),Z(1.6));zaunI(X(11.5),Z(-2.5),X(18.5),Z(-2.5));
  karren(X(4),Z(7),R+.5,'kohl');heuI(X(-6),Z(-9));holzstapel(X(14),Z(-1.6),R+1.57);
  figK(X(-3),Z(4),R+.4,0,1.3);figK(X(5),Z(2),R+3.2,1,1.25);figK(X(0),Z(8),R+2,2,1);figK(X(-8),Z(3),R-1,5,.95);
  /* Taubenschlag */
  (function(){const x=X(8),z=Z(-2);inst('cyl',x,2.4,z,.2,4.8,.2,0x6a4a2e);inst('box',x,5.2,z,1.5,1.2,1.5,0xe8dcc0);inst('gab',x,5.8,z,2,1.1,2,0x8a3a2a);kreis(x,z,.8);for(let i=0;i<3;i++)sitz(x+(i-1)*.5,6.2,z+.8,0,(i+3)%6,.9)})();
  [[X(-17),Z(-12)],[X(15),Z(-14)],[X(-18),Z(10)],[X(18),Z(12)]].forEach((p,i)=>baum(p[0],p[1],i%2?0:5,1.1))}
function ort31(){const b=zone('Weinberg und Obstgarten'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,5,0xc8b890,.09);
  for(let r=0;r<6;r++)weinI(X(-6),Z(-3-r*2.3),12,R+0);for(let r=0;r<4;r++)weinI(X(-6),Z(5+r*2.3),12,R+0);
  for(let i=0;i<4;i++)for(let j=0;j<3;j++)obstbaum(X(8+i*4.6),Z(-12+j*4.8),.9+(i+j)%2*.15,[0x68a03a,0x78b040][(i+j)%2]);
  fachwerk(X(11),Z(7),6.4,5,R,{dach:0xb4503a,og:false,wand:0xf0e8d0});
  /* Kelter und Fässer */
  (function(){const x=X(2),z=Z(12),L2=LG(x,z,R);L2.b(0,.7,0,3,1.4,2.2,0x8a5a32);L2.c(-.7,1.4,0,.9,.3,0xb04a38);L2.b(0,2.7,0,.3,2.6,.3,0x6a4a2e);L2.b(0,3.9,0,3,.3,.3,0x6a4a2e);L2.s(0,1.6,0,.7,.2,.7,0x5a2a7a);sperrKasten(x,z,3.2,2.4,R)})();
  fassI(X(-3),Z(12),1.1);fassI(X(-4.4),Z(12.6),1);fassI(X(-3.4),Z(13.8),1.1,0x6a4a2e);
  (function(){const g=grp(X(5),0,Z(13));g.rotation.y=R;cyl(.4,.5,0xc9a46a,0,.25,0,g,true);for(let i=0;i<7;i++)sph(.15,0x5a2a7a,Math.cos(i)*.2,.55+i%2*.1,Math.sin(i)*.2,g);kreis(X(5),Z(13),.5)})();
  /* Leiter */
  (function(){const L2=LG(X(-8),Z(-17),R);[-.4,.4].forEach(s=>L2.b(s,2.3,0,.1,4.6,.1,0x8a6a42,.0,s>0?.1:-.1));for(let i=0;i<6;i++)L2.b(0,.6+i*.7,0,.9,.08,.1,0x8a6a42)})();
  figK(X(-1),Z(6),R+.3,0,1.3);figK(X(4),Z(-5),R+2,5,1.2,{rock:0x6a8a4a});
  for(let i=0;i<8;i++){const a=i*.9;falter(bx+Math.cos(a)*10,bz+Math.sin(a)*8,3,2+i%3*.4,i,[0xf6d030,0xffffff,0xf47ab0][i%3])}
  hecke(X(-9),Z(-18),X(-9),Z(18),null,0)}
function ort32(){const b=zone('Schäfer mit Schafweide'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b);scheibe(bx,bz,13,0x8ec65a,.08);
  ringI(bx,bz-2,12,b.gap,3.6);
  for(let i=0;i<9;i++){const s=schaf(scene);s.position.set(bx+Math.cos(i*2.4)*(3+i%4*2),0,bz-2+Math.sin(i*2.4)*(2+i%3*2.6));s.rotation.y=i*1.7;s.scale.setScalar(1.55);lebendig.push({o:s,ph:i*.7});kreis(s.position.x,s.position.z,.9)}
  for(let i=0;i<3;i++){const s=lamm(scene);s.position.set(bx-4+i*2.5,0,bz+3+(i%2)*1.5);s.rotation.y=i*2;s.scale.setScalar(1.5);lebendig.push({o:s,ph:i});kreis(s.position.x,s.position.z,.6)}
  /* Schäferkarren (rundes Dach) */
  (function(){const x=bx+14,z=bz-8,g=grp(x,0,z);g.rotation.y=-.6;box(4.2,.3,2.2,0x8a5a32,0,1.2,0,g,true);box(4,1.8,2,0x6a8a9a,0,2.2,0,g);const t=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.1,4.2,10,1,false,0,Math.PI),mat(0xe8dcc0));t.rotation.z=Math.PI/2;t.rotation.y=0;t.rotation.x=0;t.position.set(0,3.1,0);g.add(t);[-1,1].forEach(s=>{cyl(.8,.2,0x6a4a2e,-1.2,.8,s*1.2,g).rotation.x=Math.PI/2;cyl(.8,.2,0x6a4a2e,1.2,.8,s*1.2,g).rotation.x=Math.PI/2});box(.1,1.4,1.1,0x4a3220,2.05,2.1,0,g);vm(g);sperrKasten(x,z,4.4,2.6,-.6)})();
  figK(bx-1,bz+6,R+.5,2,1.3,{typ:'hut',hut:0x5a3a22});(function(){const g=grp(bx-1+1.1,0,bz+6.4);cyl(.06,4.2,0x6a4a2e,0,2.1,0,g,true);const k=new THREE.Mesh(new THREE.TorusGeometry(.5,.07,5,10,Math.PI*1.4),mat(0x6a4a2e));k.position.y=4.3;g.add(k)})();
  streif(hundM,pendel(spl([[bx-9,bz+8],[bx+2,bz+9],[bx+10,bz+4],[bx+8,bz-12],[bx-8,bz-13],[bx-12,bz-2]],1.5),1.4),2.6,0,1.3);
  trog(bx+7,bz+8,.3);heuI(bx-12,bz-10);heuI(bx-10.4,bz-11);ballen(bx+12,bz+2,.4)}

/* ==================== Etappe 3: Seitenorte außerhalb der Mauer ==================== */
function ort28(){const b=ZN('Wassermühle am Mühlbach'),bx=158,bz=54.3;pfad(bx,bz+4,138,66,3.2);scheibe(bx,bz+1,9,0xc8b890,.09);
  fachwerk(bx,bz,9,6,0,{dach:0xb4503a,og:true,wand:0xf0e4c8,door:false});
  /* Mühlrad am Mühlbach (Achse entlang z, hängt an der Südwand ins Wasser) */
  const rad=grp(bx-2.4,3.8,58.9);const nab=grp(0,0,0,rad);box(.8,.8,1.4,0x4a3220,0,0,0,nab);for(let i=0;i<8;i++){const a=grp(0,0,0,rad);a.rotation.z=i*Math.PI/4;box(.3,7.2,.3,0x6a4a2e,0,0,0,a);box(.2,.5,1.5,0x8a5a32,0,3.5,0,a)}
  const ring=new THREE.Mesh(new THREE.TorusGeometry(3.5,.18,5,16),mat(0x6a4a2e));rad.add(ring);const ring2=ring.clone();ring2.position.z=.7;rad.add(ring2);ring.position.z=-.7;vm(rad);bewegt(rad,t=>{rad.rotation.z=-t*.6});
  box(.4,.5,3,0x4a3220,bx-2.4,3.8,58.9,scene);sperrKasten(bx-2.4,58.9,7.6,2.2,0);
  /* Säcke, Karren, Mehl */
  for(let i=0;i<5;i++)sack(bx+6+(i%3)*.8,bz+3.5+(i>>1)*.9,0xf2ecdc,1.1);karren(bx+9,bz+5.5,.3,'saecke');
  (function(){const e=esel(scene);e.position.set(bx+13,0,bz+7);e.rotation.y=2.6;e.scale.setScalar(1.5);lebendig.push({o:e,ph:1});kreis(bx+13,bz+7,1)})();
  figK(bx+5,bz+7,3.6,10,1.3,{typ:'hut',hut:0xf2f2ea,schuerze:1});figK(bx-5,bz+7.5,.4,0,1.2);
  /* Entenfamilie auf dem Bach */
  for(let i=0;i<3;i++){const d=ente(scene);d.position.set(bx+8+i*1.4,.2,60.4);d.scale.setScalar(1.2);d.rotation.y=2.1;lebendig.push({o:d,ph:i})}
  [[bx+3,bz-8],[bx-9,bz-6],[bx+12,bz-4]].forEach((p,i)=>baum(p[0],p[1],i%2?0:1,1.1))}
function ort36(){const b=ZN('Pilger-Rastplatz mit Kreuz'),bx=-158,bz=14;pfad(bx+4,bz+4,-136,bz+6,3.2);scheibe(bx,bz,9,0xc8b890,.09);
  /* Wegkreuz auf Steinsockel */
  inst('box',bx,.6,bz,3.2,1.2,3.2,0x9a948a);inst('box',bx,1.5,bz,2.2,.6,2.2,0x8a847a);inst('box',bx,5,bz,.7,7,.7,0x7a5230);inst('box',bx,6.4,bz,3.6,.7,.7,0x7a5230);inst('sph',bx,8.7,bz,.45,.35,.45,0xe0c040);kreis(bx,bz,1.9);
  for(let i=0;i<4;i++)inst('cyl',bx+Math.cos(i*1.57)*2.3,.35,bz+Math.sin(i*1.57)*2.3,.2,.5,.2,[0xf8e040,0xe0504a][i%2]);
  fachwerk(bx-4.4,bz+9,8,5.4,.0,{dach:0xc9a64a,og:false,wand:0xe6c58a});
  bankW(bx+5,bz-1,-Math.PI/2);bankW(bx-5,bz-6,Math.PI/2);bankW(bx+4,bz+4,-Math.PI/2);
  brunnen(bx+6,bz+7,.8);
  (function(){const L=LG(bx-4,bz-9,0);L.c(-1.4,0,-.8,.12,2.6,0x6a4a2e);L.c(1.4,0,-.8,.12,2.6,0x6a4a2e);L.b(0,2.7,-.8,3.4,.1,2.4,0x9a5a30,.3);L.b(0,1.1,-.8,2.6,.3,.9,0x8a5a32)})();
  [[bx-7,bz-3],[bx+7,bz-8]].forEach(p=>{flamme(p[0],.6,p[1],.8);for(let i=0;i<4;i++)inst('sph',p[0]+Math.cos(i*1.6)*.9,.3,p[1]+Math.sin(i*1.6)*.9,.4,.3,.4,0x6a6a6e);kreis(p[0],p[1],1)});
  /* Pilger: Mantel, breiter Hut, Stab, Jakobsmuschel */
  [[bx+2.6,bz+3.4,2.4,0x6a5a4a],[bx-2.2,bz-3.4,.6,0x5a4a3a],[bx+2,bz-4.4,3.9,0x7a6a52]].forEach((p,i)=>{figK(p[0],p[1],p[2],i%2?3:0,1.3,{j:p[3],h:0x4a3a2a,typ:'hut',hut:0x2a2a2e,umhang:dk(p[3],.8)});const g=grp(p[0]+.9*Math.cos(p[2]),0,p[1]-.9*Math.sin(p[2]));cyl(.06,4,0x6a4a2e,0,2,0,g,true);sph(.25,0xf0e4c8,0,3.2,.1,g,1,.8,.4);vm(g)});
  for(let i=0;i<10;i++)blumeI(bx+(nr()-.5)*16,bz+(nr()-.5)*14,i%6);[[bx-10,bz+3],[bx+10,bz+2],[bx-8,bz-11]].forEach((p,i)=>baum(p[0],p[1],i%2?0:1,1.1))}
function ort37(){const b=ZN('Mittelalter-Spielplatz'),bx=158,bz=-6;pfad(bx-4,bz+2,136,bz-2,3.2);scheibe(bx,bz,10,0x9ccb66,.08);
  /* Ringelreihen (Kinder drehen sich im Kreis) */
  (function(){const g=grp(bx-6,0,bz-3);const n=6;for(let i=0;i<n;i++){const a=i/n*6.28,f=kostFig(Object.assign({},KOST[i%KOST.length],{typ:i%2?'haube':'hut',hut:KOLOR[i%6],rock:i%2?KOLOR[(i+2)%6]:undefined,umhang:undefined,kragen:undefined}),g,.95);f.w.position.set(Math.cos(a)*2.6,0,Math.sin(a)*2.6);f.w.rotation.y=-a-Math.PI/2+1.57;f.m.g.rotation.y=0;vmVerschm(f.m.g);vmVerschm(f.w)}
    inst('cylT',bx-6,.05,bz-3,3.7,.1,3.7,0x8ab85a);bewegt(g,t=>{g.rotation.y=t*.5});kreis(bx-6,bz-3,4)})();
  /* Stelzenläufer */
  [[bx+2,bz-4,0],[bx+5,bz-1,2]].forEach((p,i)=>{const g=grp(p[0],0,p[1]),f=kostFig(Object.assign({},KOST[(i+4)%8],{typ:'hut',hut:KOLOR[i+2]}),g,.9);f.w.position.y=2.2;f.m.g.rotation.y=0;[-1,1].forEach(s=>{cyl(.08,3.2,0x8a5a32,s*.3,1.0,0,g);box(.5,.12,.4,0x8a5a32,s*.3,2.1,.0,g)});vm(g);bewegt(g,t=>{g.position.x=p[0]+Math.sin(t*.4+i*2)*3;g.position.z=p[1]+Math.cos(t*.4+i*2)*1.4;g.rotation.y=Math.atan2(Math.cos(t*.4+i*2)*3,-Math.sin(t*.4+i*2)*1.4)+1.57})});
  /* Seilziehen */
  (function(){const L=LG(bx+2,bz+8,.2);L.b(0,.9,0,12,.14,.14,0xc8a870);L.b(0,.95,0,.4,.5,.4,0xc03a3a);[-1,1].forEach(s=>{for(let i=0;i<3;i++){figK(L.P(s*(2.4+i*1.2),0.4)[0],L.P(s*(2.4+i*1.2),.4)[1],s>0?-1.4:1.7,i+(s>0?1:5),.95)}})})();
  /* Wippe, Reifen, Kreisel, Hüpfspiel, Holzpferd */
  (function(){const g=grp(bx-6,0,bz-5);box(.3,.9,.3,0x6a4a2e,0,.45,0,g,true);const br=grp(0,.95,0,g);box(5,.2,.6,0xb8803a,0,0,0,br);sph(.3,0xc03a3a,-2.4,.3,0,br);sph(.3,0x3a5ea8,2.4,.3,0,br);vm(br);bewegt(br,t=>{br.rotation.z=Math.sin(t*1.3)*.28});vm(g);kreis(bx-6,bz-5,2.4)})();
  for(let i=0;i<8;i++)inst('cylT',bx+4+(i%4)*1.2,.05,bz+9+(i>>2)*1.3,.5,.06,.5,KOLOR[i%6]);
  for(let i=0;i<3;i++){const x=bx+8,z=bz-2+i*1.4;const t=grp(x,0,z,scene);cone(.3,.7,KOLOR[i],0,.35,0,t);cone(.12,.2,0x6a4a2e,0,-.0,0,t).rotation.x=Math.PI;vm(t);bewegt(t,tt=>{t.rotation.y=tt*(8+i)})}
  (function(){const g=grp(bx-9,0,bz+1);box(.2,1.6,.3,0x8a5a32,0,.8,0,g,true);sph(.5,0x8a5a32,.5,1.9,0,g,1.3,.9,.7);cone(.12,.3,0x8a5a32,.8,2.3,.2,g);cone(.12,.3,0x8a5a32,.8,2.3,-.2,g);box(1.8,.1,.3,0x6a4a2e,0,1.6,0,g);vm(g);kreis(bx-9,bz+1,1)})();
  schaukel(bx+9,bz-8,1.6);figK(bx+6,bz+3,3.5,8,.9);figK(bx-1,bz-8,.5,1,.95);figK(bx+8.5,bz+4,2,5,.9);
  for(let i=0;i<10;i++)blumeI(bx+(nr()-.5)*22,bz+(nr()-.5)*20,i%6)}
function ort35(){const b=ZN('Kräuterfrau am Waldrand'),bx=-158,bz=-44;pfad(bx+6,bz+2,-136,bz+4,3);scheibe(bx,bz,10,0x7aa84a,.08);
  /* Wald dahinter und daneben */
  for(let i=0;i<26;i++){const a=nr()*6.28,r=9+nr()*8;const x=bx-4+Math.cos(a)*r,z=bz+Math.sin(a)*r;if(x>bx+5||x<-176||(x>bx-9&&x<bx+6&&z>bz-10&&z<bz+13))continue;baum(x,z,i%3===0?2:(i%3===1?0:5),1+nr()*.5)}
  /* Hütte mit Mooshaube, schiefem Schornstein */
  (function(){const L=LG(bx-3,bz-3,Math.PI/2);L.b(0,1.7,0,6.4,3.4,5,0xdcc8a0);L.b(0,.3,0,6.8,.6,5.4,0x8a847a);[-1.9,0,1.9].forEach(x=>L.b(x,1.7,2.53,.18,3.4,.12,BALK));L.b(0,3.3,2.53,6.4,.18,.12,BALK);L.g(0,3.4,0,7.4,2.6,6,0x6a9a4a);L.g(0,3.4,0,7.46,2.3,5.4,0xdcc8a0);L.b(-1.3,1.4,2.58,1.3,2.6,.14,0x6b4524);L.b(1.6,1.9,2.58,1.1,1.1,.12,0x86b0c8);L.b(2.6,5,-1.2,.9,2.6,.9,0x8a847a,0,.16);L.s(.6,5.2,0,1.4,.6,1.2,0x7aaa52);L.s(-2,5,1,1,.5,.9,0x7aaa52);sperrKasten(bx-3,bz-3,6.8,5.4,Math.PI/2)})();
  rauch(scene,bx-3.2,8.4,bz-5.2);
  /* Kräuterbeete: bunte Streifen */
  for(let r=0;r<3;r++){const z=bz+3+r*2.2;inst('box',bx-4,.12,z,5,.24,1.3,0x5a3a22);for(let i=0;i<9;i++){const x=bx-6+i*.55;inst('cyl',x,.4,z,.03,.5,.03,0x4a9a3a);inst('blm',x,.7,z,.2,.18,.2,[0xb06ae0,0xffd45e,0xf47ab0,0x8ad8a0,0xffffff,0xe0605a][(i+r*2)%6])}}
  zaunI(bx-8,bz+1.4,bx-8,bz+9.4);zaunI(bx-8,bz+9.4,bx-1,bz+9.4);zaunI(bx-8,bz+1.4,bx-1,bz+1.4,[bx-2,bz+1.4,1.4]);
  /* Kessel über Feuer, Kräuterbündel, Besen */
  (function(){const x=bx+3,z=bz-2;[-1,1].forEach(s=>inst('cyl',x+s*.7,1,z,.07,2,.07,0x3a3a40,0,0,s*.35));inst('sph',x,1.3,z,.8,.55,.8,0x5a9a6a);inst('cylT',x,1.85,z,.55,.2,.55,0x8adf8a);flamme(x,.1,z,.8);rauch(scene,x,2.2,z);kreis(x,z,1.1)})();
  [[bx+1,bz-8],[bx+2.5,bz-8]].forEach(p=>{inst('cyl',p[0],1.8,p[1],.05,3.6,.05,0x6a4a2e);for(let i=0;i<5;i++)inst('con',p[0]+(i%2?.3:-.3),3.4-(i>>1)*.5,p[1],.16,.7,.16,[0x6ab04a,0xb06ae0,0xd8c040,0x4aa84a,0xf47ab0][i],0,Math.PI)});
  /* Kräuterfrau (freundlich: grünes Kleid, Kopftuch), Eule im Baum, Katze */
  figK(bx+4.8,bz+3,1.9,5,1.3,{rock:0x4a8a5a,j:0x3a7a4a,typ:'haube',hr:0xb0b0b0,schuerze:1});
  sitz(bx-8,5.6,bz-9,.6,2,2.4);sitz(bx-11,3.4,bz-1,1.2,2,2);
  for(let i=0;i<6;i++){const a=i*1.1;falter(bx+Math.cos(a)*7,bz+3+Math.sin(a)*5,3,1.6+i%3*.4,i,[0xf6d030,0xffffff,0xf47ab0,0xb06ae0][i%4])}
  korb(bx+6,bz-4,0x6ab04a);korb(bx+7.2,bz-3.4,0xb06ae0);stumpf(bx+9,bz+2,1);stumpf(bx+8,bz+5,.8)}

/* ==================== Etappe 3b: Stadt (Orte 11 bis 18) ==================== */
function ort11(){const bx=11,bz=60;scheibe(bx,bz,8,COB,.08);
  /* Zollhaus, Wachhaus, Fahnen auf den Torürmen */
  fachwerk(bx-15,bz-7.5,7,5.6,Math.PI/2,{dach:0xa8452e,og:true,wand:0xf0e4c8,door:true});fachwerk(bx+15,bz-7.5,6.4,5.4,-Math.PI/2,{dach:0x6f7680,og:false,wand:0xe8dcc0});
  [-1,1].forEach(s=>flagge(bx+s*8.1,8.9,bz,4,s>0?0xc03a3a:0x3a5ea8,0xf2f2ea,1.3));
  ritterFig(bx-13.5,bz+4,.0,6,0xc03a3a,0xf2f2ea);ritterFig(bx+13.5,bz+4,.0,6,0x3a5ea8,0xf2f2ea);
  /* Händlerwagen mit Pferd wartet vor dem Tor */
  karren(bx-9,bz+12,.6,'faesser');const p=pferd1(scene);p.position.set(bx-5.2,0,bz+13.4);p.rotation.y=-2.6;p.scale.setScalar(1.4);lebendig.push({o:p,ph:1});kreis(bx-5.2,bz+13.4,1.4);
  kistenI(bx+10,bz+10,4);fassI(bx+12,bz+8.4,1);fassI(bx+13.2,bz+9,1);
  figK(bx+6,bz+9,3.5,3,1.25);figK(bx-1.4,bz+11,.2,1,1.25);figK(bx+2.6,bz+13,3.4,8,1.2);figK(bx+8,bz+13,2.3,5,1);
  fackel(bx-5,bz-3,4.2);fackel(bx+5,bz-3,4.2);fackel(bx-7,bz+7,3.6);fackel(bx+7,bz+7,3.6);
  [[bx-12,bz+3],[bx+14,bz+3]].forEach(q=>{kuebel(q[0],q[1])})}
function ort17(){const b=zone('Waschbrunnen mit Waschfrauen'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);scheibe(bx,bz,7,0xc4bdae,.09);
  /* Brunnen mit langem Waschtrog */
  brunnen(X(-2),Z(-3),1.1);[-1,1].forEach(s=>{const L2=LG(X(-2+s*5.6),Z(-3),R+Math.PI/2);L2.b(0,.55,0,7,1.1,1.5,0x8a847a);L2.b(0,1.05,0,6.4,.12,1.1,0x4aa5d4);sperrKasten(X(-2+s*5.6),Z(-3),1.8,7.4,R+Math.PI/2)});
  /* Waschfrauen, Eimer, Waschbretter */
  [[X(-6.5),Z(-1.2),R,5],[X(-4.6),Z(0.2),R+.2,1],[X(5),Z(-1.4),R-.2,8],[X(7),Z(0.3),R,5]].forEach((p,i)=>figK(p[0],p[1],p[2],p[3],1.25));
  eimer(X(-8),Z(3),0x8a5a32,0x4aa5d4);eimer(X(8),Z(3),0x8a5a32,0x4aa5d4);eimer(X(-3),Z(4),0x6a4a2e);
  /* Wäscheleinen mit Tüchern (flatternd) */
  [[-9,-7,9,-7],[-9,7,9,7]].forEach((l,k)=>{const x1=X(l[0]),z1=Z(l[1]),x2=X(l[2]),z2=Z(l[3]);inst('cyl',x1,1.8,z1,.08,3.6,.08,0x6a4a2e);inst('cyl',x2,1.8,z2,.08,3.6,.08,0x6a4a2e);inst('box',(x1+x2)/2,3.5,(z1+z2)/2,18,.04,.04,0xc8c0a8);
    for(let i=0;i<6;i++){const tx=x1+(x2-x1)*(i+.5)/6,g=grp(tx,3.4,(z1+z2)/2);box(1.5,1.7,.08,[0xf6f2e8,0xc03a3a,0x3a5ea8,0xf2f2ea,0xe8b830,0xf6f2e8][(i+k)%6],0,-.9,0,g);vm(g);bewegt(g,t=>{g.rotation.x=Math.sin(t*1.4+i)*.12})}});
  heuI(X(9),Z(-9),.8);sack(X(11),Z(1.6),0xf2ecdc,.9);
  /* Bleichwiese: große Blumenwiese links und rechts vom Weg; Tücher mit Abstand (nichts liegt gleich hoch übereinander, sonst flackert es) */
  [-1,1].forEach(s=>{[[8.2,10.3,6,2.8,.12,0x86bd55],[12.4,9.6,3.8,2.4,.15,0x7fb64e],[5.2,10.4,2.7,2.3,.18,0x8fc65c]].forEach(w=>{const m=mesh(gDisc,w[5],X(s*w[0]),w[4]/2,Z(w[1]),w[2],w[4],w[3],scene);m.receiveShadow=true});
    const tuch=[[4.9,10.2,.12],[8.3,9.9,-.1],[11.7,10.4,.16]];tuch.forEach((c,i)=>inst('box',X(s*c[0]),.22,Z(c[1]),2.2,.04,2,[0xf6f2e8,0xcfe0f2,0xf2e4c4][(i+(s>0?1:0))%3],R+c[2]*s));
    for(let i=0;i<90;i++){const f=(i*.6180339)%1,g=(i*.4142135)%1,dx=3+f*12.6,dz=7.9+g*4.8;if(((dx-9)/7)**2+((dz-10.2)/2.7)**2>1||tuch.some(c=>Math.abs(dx-c[0])<1.45&&Math.abs(dz-c[1])<1.35))continue;const x=X(s*dx),z=Z(dz),h=.3+((i*.7320508)%1)*.25;
      if(i%3){inst('cyl',x,h/2+.1,z,.03,h,.03,0x3f9a46);inst('blm',x,h+.14,z,.17,.13,.17,[0xffffff,0xffd45e,0xf47ab0,0xe0605a,0xb06ae0][i%5])}else inst('con',x,h/2+.1,z,.12,h,.12,0x4aa040)}});
  [[X(11),Z(-8)],[X(-11),Z(-8)]].forEach((p,i)=>baum(p[0],p[1],i?0:5,.9))}
function ort16(){const b=zone('Marktstände'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);scheibe(bx,bz,9,0xc4bdae,.09);
  const W=['obst','tuch','gewuerz','brot','fisch','kaese','topf','obst'];
  [[-6.4,-5.2],[-2.1,-5.2],[2.2,-5.2],[6.5,-5.2],[-6.4,4.6],[-2.1,4.6],[2.2,4.6],[6.5,4.6]].forEach((p,i)=>stand(X(p[0]),Z(p[1]),R+(p[1]>0?Math.PI:0),i,W[i]));
  /* Kundschaft, Körbe, Kisten */
  [[-4,0,1],[0,0.5,5],[4,-.4,8],[7.4,0,0],[-7.5,1,3]].forEach((p,i)=>figK(X(p[0]),Z(p[1]),R+i*1.3,p[2],i%2?1.2:1.3));
  kistenI(X(-9),Z(-1),3);kistenI(X(9),Z(1),3,.5);korb(X(-1),Z(-9),0xd8302a);korb(X(4),Z(-9),0x6ab04a);fassI(X(-9),Z(8),1);karren(X(9),Z(9),R-.4,'kohl');fackel(X(-8.6),Z(-9),3.6);fackel(X(8.6),Z(-9),3.6)}
function ort12(){const bx=-1,bz=14;scheibe(bx,bz,11.5,0xc8c2b4,.09);scheibe(bx,bz,10,0xb3ada0,.1);brunnen(bx,bz,1.7);
  /* Spritzer am Brunnen */
  const sp=cyl(.14,1.6,0x9fd8f0,bx,4.8,bz,scene);bewegt(sp,t=>{sp.scale.y=1+.18*Math.sin(t*6)});
  for(let i=0;i<8;i++){const a=i*.785+.4;inst('cylT',bx+Math.cos(a)*7,.2,bz+Math.sin(a)*7,.8,.4,.8,[0xd8302a,0xf0a830][i%2]);inst('blm',bx+Math.cos(a)*7,.7,bz+Math.sin(a)*7,.6,.4,.6,[0xf47ab0,0xffffff,0xffd45e,0xe0605a][i%4])}
  [[0,-9,0],[0,9,Math.PI],[-9,0,Math.PI/2],[9,0,-Math.PI/2]].forEach(p=>bankW(bx+p[0],bz+p[1],p[2]));
  [[-8,-6],[8,-6],[-8,6],[8,6]].forEach(p=>fackel(bx+p[0],bz+p[1],4));
  [[5,3,0],[-4,5,5],[3,-5,8],[-6,-3,1],[0,6.8,3],[7,-1,10],[-3,-7.5,2]].forEach((p,i)=>figK(bx+p[0],bz+p[1],i*1.2,p[2],i%3?1.25:.95));
  for(let i=0;i<6;i++)sitz(bx+Math.cos(i*1.1)*2.6,1.2+(i%2)*0,bz+Math.sin(i*1.1)*2.6,i,(i+3)%6,1.1);
  for(let i=0;i<4;i++)flieger(bx+(i-1.5)*5,bz+(i%2)*6,9,12+i*1.5,i*1.7,.4,0x8a8d92,0xf2f2f2);
  streif(hundM,pendel(spl([[bx-6,bz+5],[bx+2,bz+9],[bx+8,bz+3],[bx+4,bz-7],[bx-7,bz-4]],1.5),1.2),2.2,0,1.4)}
function ort13(){const b=ZN('Rathaus'),bx=-38,bz=10,R=Math.PI/2,L=LG(bx,bz,R);
  /* Erdgeschoss: Steinhalle mit Bogenreihe, Obergeschoss Fachwerk, hohes Dach, Uhrenturm */
  L.b(0,2.2,0,15,4.4,8,0xcfc8b8);L.b(0,.4,0,15.4,.8,8.4,0x9a948a);for(let i=0;i<5;i++){const lx=-6+i*3;L.c(lx,0,4.5,.5,3.8,0xb4aea0,'cylT');L.b(lx+1.5,3.6,4.5,2.2,.8,.9,0xb4aea0)}L.b(0,4.4,4.5,15.4,.5,1.2,0x9a948a);
  L.b(0,6.9,0,15,4.6,8,0xf0e4c8);for(let i=0;i<7;i++)L.b(-6.9+i*2.3,6.9,4.05,.22,4.6,.14,BALK);L.b(0,4.75,4.05,15,.24,.14,BALK);L.b(0,9.1,4.05,15,.24,.14,BALK);
  for(let i=0;i<5;i++){L.b(-6+i*3,7,4.1,1.1,1.5,.1,0x86b0c8);L.b(-6+i*3-.8,7,4.12,.4,1.5,.1,0x9a3a2e);L.b(-6+i*3+.8,7,4.12,.4,1.5,.1,0x9a3a2e)}
  L.b(0,1.7,4.1,2.4,3.4,.2,0x6b4524);L.b(0,3.5,4.15,2.9,.4,.3,0x7a746a);
  L.g(0,9.2,0,16,4.8,9.4,0xb4503a);L.g(0,9.2,0,16.06,4.2,8.4,0xf0e4c8);
  /* Uhrenturm */
  L.b(0,12.4,-.4,3.6,6.2,3.6,0xf0e4c8);L.d(0,12.6,1.5,1.2,.25,0xf6f0d8);L.b(0,12.6,1.65,.12,.9,.1,0x2a2a2a);L.b(.35,12.6,1.65,.7,.12,.1,0x2a2a2a);L.k(0,15.5,-.4,2.8,3.4,0x2f6a8a);L.s(0,19.2,-.4,.4,.4,.4,0xe0c040);
  /* Treppe, Wappenschilde (Zunftzeichen als Bild) */
  for(let i=0;i<3;i++)L.b(0,.2+i*.2,6.2-i*.7,7-i*1,.4,1.1,0x9a948a);
  [[-5.6,0],[5.6,1]].forEach(p=>{L.b(p[0],3,4.9,1.6,1.8,.3,0xf6f0d8);if(p[1]===0){L.s(p[0],3,5.1,.45,.45,.2,0xd8a030);L.b(p[0],3.55,5.1,.9,.1,.1,0xd8a030);L.b(p[0]-.45,3.2,5.1,.1,.5,.1,0xd8a030);L.b(p[0]+.45,3.2,5.1,.1,.5,.1,0xd8a030)}else{L.b(p[0],3.2,5.1,.9,.35,.2,0x3a3a40);L.b(p[0]-.1,2.8,5.1,.5,.4,.2,0x3a3a40);L.b(p[0]+.5,3.0,5.1,.6,.15,.2,0x6a4a2e)}});
  L.b(0,5.4,4.9,1.8,1.6,.3,0xf6f0d8);L.s(0,5.4,5.1,.4,.5,.2,0xc03a3a);L.s(0,5.8,5.1,.3,.2,.2,0xe8b830);
  sperrKasten(bx,bz,16,9,R);const e=LG(bx,bz,R);flagge(e.P(7.6,4)[0],9.4,e.P(7.6,4)[1],4.4,0xc03a3a,0xf2f2ea);flagge(e.P(-7.6,4)[0],9.4,e.P(-7.6,4)[1],4.4,0x3a5ea8,0xf2f2ea);
  const f1=e.P(0,8.6),f2=e.P(-4,8.4),f3=e.P(4,8.6);figK(f1[0],f1[1],R,6,1.2,{umhang:0x3a5ea8,typ:'barett',hut:0xc03a3a,gurt:1});figK(f2[0],f2[1],R+.4,3,1.2,{umhang:0x8a4a9a});figK(f3[0],f3[1],R-.3,0,1.25,{typ:'barett',hut:0x2a6a3a});
  fackel(e.P(-9,5)[0],e.P(-9,5)[1],4);fackel(e.P(9,5)[0],e.P(9,5)[1],4)}
function ort14(){const bx=44,bz=8,R=-Math.PI/2,L=LG(bx,bz,R);
  L.b(0,5,0,10,10,20,0xd4ccbc);L.b(0,.5,0,10.5,1,20.5,0x9a948a);L.g(0,10,0,11.4,5.2,21,0x6f7680);L.g(0,10,0,11.46,4.7,18.8,0xd4ccbc);L.b(0,15.35,0,11.5,.22,.4,0x555a62);
  for(let i=0;i<5;i++)[-1,1].forEach(s=>{L.b(s*5.04,5.6,-8+i*4,.12,3.8,1.3,0x3a4a8a);L.b(s*5.04,7.7,-8+i*4,.12,.9,.9,0xb8a040)});
  for(let i=0;i<4;i++)[-1,1].forEach(s=>L.b(s*5.6,3.5,-6+i*4.6,1.2,7,1.1,0xb8b0a0));
  /* Chor (Apsis) hinten und Turm vorn */
  L.c(0,0,-10.4,3.4,9,0xd4ccbc,'cylT');L.k(0,9,-10.4,3.8,3.6,0x6f7680,'conT');
  L.b(0,11,6.6,6.6,22,6.6,0xd4ccbc);L.b(0,.5,6.6,7.2,1,7.2,0x9a948a);L.b(0,22.2,6.6,7.2,.8,7.2,0xb4aea0);L.k(0,22.6,6.6,4.6,10,0x2f6a8a,'conT');L.b(0,33.3,6.6,.3,2.4,.3,0xe0c040);L.b(0,33.6,6.6,1.4,.3,.3,0xe0c040);
  [-1,1].forEach(s=>{L.b(0,19.8,6.6+s*3.32,1.4,2.8,.2,0x2a2a3a);L.b(s*3.32,19.8,6.6,.2,2.8,1.4,0x2a2a3a)});
  L.b(0,10,10,2.2,3.6,.2,0x2a2a3a);
  /* Eingang (Portal), Rosenfenster, Stufen */
  L.b(0,3,10.04,3,6,.22,0x6b4524);L.b(0,6.2,10.1,3.6,.5,.3,0x9a948a);L.b(0,2.2,10.12,.12,4.4,.1,0x3a2a1a);L.d(0,13,10.1,2.4,.25,0xe8c040);L.d(0,13,10.2,1.9,.25,0x3a5ec8);L.d(0,13,10.3,.7,.25,0xc03a3a);L.b(0,13,10.35,.2,3.6,.1,0xe8c040);L.b(0,13,10.35,3.6,.2,.1,0xe8c040);
  for(let i=0;i<3;i++)L.b(0,.2+i*.2,11.2-i*.6,5-i*.6,.4,1,0x9a948a);
  sperrKasten(bx,bz,11.6,21,R);{const t=L.P(0,6.6);kreis(t[0],t[1],4.2)}
  /* Wetterhahn, Friedhofsecke mit Kreuzen, Hecke, Blumen */
  {const t=L.P(0,6.6);wetterhahn(scene,t[0],34.2,t[1])}
  {const q=L.P(0,-15);[[-4,0],[0,2],[4,0],[-2,3.4],[2,-2]].forEach((c,i)=>{const w=LG(q[0]+c[0],q[1]+c[1],R);w.b(0,.8,0,.45,1.6,.25,0x9a948a);w.b(0,1.3,0,1.1,.3,.25,0x9a948a)});zaunI(q[0]-7,q[1]-4,q[0]+7,q[1]-4);zaunI(q[0]-7,q[1]-4,q[0]-7,q[1]+5);zaunI(q[0]+7,q[1]-4,q[0]+7,q[1]+5)}
  {const q=L.P(0,15);figK(q[0],q[1],R+1.57,3,1.25);const q2=L.P(-3,14);figK(q2[0],q2[1],R+1.57,1,1.2);const q3=L.P(2,16.6);figK(q3[0],q3[1],R+1.57,2,1.25);fackel(L.P(-3,12)[0],L.P(-3,12)[1],3.8);fackel(L.P(3,12)[0],L.P(3,12)[1],3.8)}
  for(let i=0;i<4;i++){const a=L.P(6.6,-6+i*3.4);baum(a[0],a[1],i%2?0:5,.8)}}
function ort15(){const b=zone('Gasthaus „Zum Bären“'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  const h=fachwerk(bx,bz-4,12,7,R,{dach:0xa8452e,og:true,wand:0xf4ecd4,blumen:true});
  /* Wirtshausschild nur als Bild: Bär auf Tafel am Ausleger */
  const e=LG(bx,bz-4,R),q=e.P(-5.4,3.6);baerSchild(scene,q[0],7.4,q[1]).rotation.y=R-Math.PI/2+1.57;
  /* Tische, Bänke und Gäste im Freien */
  [[-4,5.6],[2,6.6],[7,5]].forEach((p,i)=>{tisch(X(p[0]),Z(p[1]),0);bankW(X(p[0]),Z(p[1]-1.6),0);bankW(X(p[0]),Z(p[1]+1.6),Math.PI);cyl(.16,.34,0xc0a040,X(p[0]-.3),1.0,Z(p[1])+.2,scene);cyl(.16,.34,0xc0a040,X(p[0]+.4),1.0,Z(p[1])-.2,scene)});
  figK(X(-4),Z(4),R+3.1,3,1.25);figK(X(-4),Z(7.4),R,0,1.25);figK(X(2),Z(8.2),R,8,1.2);figK(X(7.6),Z(6.6),R+1.6,1,1.25);figK(X(-8),Z(4.6),R+.8,4,1.3);
  fassI(X(10),Z(0),1.1);fassI(X(11.2),Z(1),1);fassI(X(10.4),Z(2.4),1.1,0x6a4a2e);
  /* Pferde am Balken */
  inst('box',X(-9.4),1.4,Z(4),.18,2.8,.18,0x6a4a2e);inst('box',X(-9.4),2.6,Z(10),.18,.18,6,0x6a4a2e,R+0);inst('box',X(-9.4),1.4,Z(10),.18,2.8,.18,0x6a4a2e);
  [[0,5],[0,8.6]].forEach((p,i)=>{const pf=(i?pferd2:pferd4)(scene);pf.position.set(X(-11.6),0,Z(p[1]));pf.rotation.y=R-Math.PI/2;pf.scale.setScalar(1.4);lebendig.push({o:pf,ph:i*2});kreis(X(-11.6),Z(p[1]),1.5)});
  fackel(X(-6.8),Z(2.6),3.6);fackel(X(6.8),Z(2.6),3.6);rauch(scene,X(3.4),12.8,Z(-6))}
function ort18(){const b=zone('Gaukler-Platz'),L=lay(b),X=L.x,Z=L.z,R=L.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);scheibe(bx,bz,8,0xcfc8b8,.09);
  /* Kleine Bühne mit bunten Tüchern */
  (function(){const L2=LG(X(0),Z(-5.4),R);L2.b(0,.5,0,8,1,3.6,0x8a5a32);L2.b(0,1.05,0,8.4,.2,4,0xc8a870);[-1,1].forEach(s=>L2.c(s*3.8,1,-1.4,.14,3.8,0x6a4a2e));for(let i=0;i<8;i++)L2.b(-3.5+i,4.6-Math.abs(i-3.5)*.07,-1.4,1.02,.08,3.6,KOLOR[i%6],.15);L2.b(0,2.9,-1.7,8,3.4,.15,0x3a5ea8);[-3,0,3].forEach((x,i)=>L2.s(x,3,-1.6,.8,.9,.2,KOLOR[i+1]));sperrKasten(X(0),Z(-5.4),8.4,4,R)})();
  /* Jongleure mit kreisenden Bällen */
  [[-4,3,0],[4.4,2,3]].forEach((p,i)=>{const x=X(p[0]),z=Z(p[1]);figK(x,z,R+i*2,4,1.3);const g=grp(x,3.8,z);for(let k=0;k<3;k++)sph(.28,KOLOR[k+i],0,0,0,g);g.userData.keep=1;const ks=g.children.slice();bewegt(g,t=>{ks.forEach((q,k)=>{const a=t*3.2+k*2.09;q.position.set(Math.cos(a)*.9,Math.sin(a*2)*.5+.3,0)})})});
  /* Marionettentheater */
  (function(){const L2=LG(X(8),Z(-1),R+1.2);L2.b(0,2.2,0,3.4,4.4,1.6,0x8a5a32);L2.b(0,3.4,.82,2.2,1.6,.1,0x1a1a22);L2.b(-1.3,1.8,.82,.7,3.6,.12,0xc03a3a);L2.b(1.3,1.8,.82,.7,3.6,.12,0xc03a3a);L2.b(0,4.6,.8,3.6,.3,.3,0xe8b830);L2.s(-.4,3.3,.9,.2,.2,.2,0xe8b98f);L2.b(-.4,2.9,.9,.2,.5,.1,0x3a5ea8);L2.s(.5,3.3,.9,.2,.2,.2,0xe8b98f);L2.b(.5,2.9,.9,.2,.5,.1,0xc03a3a);L2.b(-.4,4.0,.88,.03,1.4,.03,0xcccccc);L2.b(.5,4.0,.88,.03,1.4,.03,0xcccccc);sperrKasten(X(8),Z(-1),3.6,2,R+1.2)})();
  /* Seiltänzer: Seil zwischen zwei Pfosten */
  {const x1=X(-8),z1=Z(5),x2=X(-1.5),z2=Z(8);inst('cyl',x1,2,z1,.1,4,.1,0x6a4a2e);inst('cyl',x2,2,z2,.1,4,.1,0x6a4a2e);const th=Math.atan2(-(z2-z1),x2-x1),ln=Math.hypot(x2-x1,z2-z1);inst('box',(x1+x2)/2,3.8,(z1+z2)/2,ln,.05,.05,0xd8c898,th);kreis(x1,z1,.3);kreis(x2,z2,.3);
    const f=kostFig(KOST[4],null,.9);f.m.g.rotation.y=0;vmVerschm(f.m.g);const w=f.w;w.position.set((x1+x2)/2,3.8,(z1+z2)/2);w.rotation.y=th+1.57;vmVerschm(w);bewegt(w,t=>{w.rotation.z=Math.sin(t*1.5)*.08})}
  /* Trommel, Hut, Gauklerwagen, Kinder, Fahnen */
  cyl(.7,.9,0xc03a3a,X(-6),.45,Z(-1),scene,true);kreis(X(-6),Z(-1),.8);figK(X(-6),Z(1.2),R+3,4,1.25);
  [[2,5.6,0],[-2.4,6.2,1],[5,6,5],[-5,4.8,8]].forEach((p,i)=>figK(X(p[0]),Z(p[1]),R+3.14+i*.3,p[2],i%2?.9:1.25));
  karren(X(-10),Z(-4),R+1.2,'saecke');flagge(X(-9.4),0,Z(5),5.4,0xc03a3a,0xe8b830);flagge(X(9.6),0,Z(5),5.4,0x3a5ea8,0xe8b830);
  for(let i=0;i<14;i++)inst('con',X(-8+i*1.25),6.2-Math.sin(i/13*3.14)*1.3,Z(-9),.3,.7,.3,KOLOR[i%6],0,Math.PI)}

/* ==================== Etappe 3c: Handwerksviertel und Kloster (Orte 19 bis 26, 33, 34) ==================== */
function amboss(x,z,rot){const L=LG(x,z,rot);L.c(0,0,0,.6,1,0x5a4a3a);L.b(0,1.15,0,1.5,.5,.8,0x3a3a40);L.k(.95,.9,0,.32,.9,0x3a3a40);kreis(x,z,.9)}
function hammer(x,y,z,rot){const g=grp(x,y,z);g.rotation.y=rot||0;box(.12,1.5,.12,0x6a4a2e,0,.75,0,g);box(.7,.3,.3,0x4a4a52,0,1.5,0,g);vm(g);return g}
function esse(L,lx,lz){L.b(lx,1.5,lz,2.6,3,2.4,0x8a847a);L.b(lx,.9,lz+1.25,1.6,1.1,.1,0x1a1a1e);L.b(lx,5.6,lz-.4,1.2,5,1.2,0x7a746a);L.s(lx,.5,lz+.5,.55,.3,.5,0xff6a1a)}
function ort19(){const b=zone('Schmiede'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  const h=fachwerk(X(0),Z(-3.4),9,6,R,{dach:0x6f7680,og:false,wand:0xd8d0c0,door:false});const e=LG(X(0),Z(-3.4),R);esse(e,-2.6,-.4);const q=e.P(-2.6,.8);flamme(q[0],.7,q[1],.7);const sm=e.P(-2.6,-.6);rauch(scene,sm[0],8.4,sm[1]);
  amboss(X(1.6),Z(3.2),R);const hm=hammer(X(.4),1.4,Z(3.2),R);bewegt(hm,t=>{hm.rotation.z=-Math.abs(Math.sin(t*3.2))*1.0});figK(X(0.2),Z(4.6),R+3.14,0,1.3,{schuerze:1,j:0x6a4a2e});
  /* Pferd wird beschlagen, Werkzeug, Hufeisen, Kohle, Wasserbottich */
  const p=pferd3(scene);p.position.set(X(6),0,Z(2));p.rotation.y=R+1.2;p.scale.setScalar(1.4);lebendig.push({o:p,ph:2});kreis(X(6),Z(2),1.5);figK(X(7.6),Z(4.6),R+3.6,8,1.2,{schuerze:1});
  for(let i=0;i<5;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(.32,.06,4,8,5),mat(0x3a3a40));t.position.set(X(-5.6)+i*.0,1.3+i*.34,Z(-.4));t.rotation.y=R;scene.add(t)}
  inst('cylT',X(-3.6),.6,Z(4),.8,1.2,.8,0x6a4a2e);inst('cylT',X(-3.6),1.1,Z(4),.65,.1,.65,0x4aa5d4);kreis(X(-3.6),Z(4),.9);
  for(let i=0;i<5;i++)inst('sph',X(-6.4+i%2*.8),.3+(i>>1)*.3,Z(2.2+i*.2),.7,.4,.6,0x2a2a30);
  for(let i=0;i<4;i++)inst('cyl',X(4.5),.15+i*.3,Z(-2),.07,3.6,.07,0x4a4a52,R,0,1.57+i*.01);
  fackel(X(-7.6),Z(5),3.4);fackel(X(8.6),Z(6),3.4)}
function ort20(){const b=zone('Bäckerei'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  fachwerk(X(0),Z(-3.2),7.4,5.6,R,{dach:0xb4503a,og:true,wand:0xf6efd8});
  /* Brezel als Zunftzeichen (Bild) über der Tür */
  const e=LG(X(0),Z(-3.2),R);const t=new THREE.Mesh(new THREE.TorusGeometry(.5,.12,5,10),mat(0xd8a030));{const q=e.P(-1.9,3.4);t.position.set(q[0],3.8,q[1]);t.rotation.y=R;scene.add(t);vm(t)}
  /* Backofen aus Stein mit Rauch, Tisch mit Broten */
  {const q=e.P(5,-1);inst('sph',q[0],1.3,q[1],2.2,1.6,2.2,0xa8a094);inst('box',q[0]+Math.sin(R)*2,1.0,q[1]+Math.cos(R)*2,1.4,1.1,.2,0x2a1a14,R);kreis(q[0],q[1],2.4);rauch(scene,q[0],2.6,q[1])}
  {const q=e.P(-2,6.4);const L2=LG(q[0],q[1],R);L2.b(0,.95,0,4,.2,1.6,0x8a5a32);[-1.8,1.8].forEach(s=>[-.6,.6].forEach(u=>L2.b(s,.45,u,.2,.9,.2,0x6a4a2e)));for(let i=0;i<8;i++)L2.s(-1.6+i*.45,1.2,((i%2)-.5)*.6,.3,.22,.24,[0xc8944a,0xd8a85a,0xb8803a][i%3]);for(let i=0;i<3;i++)L2.s(-.6+i*.6,1.3,.0,.4,.18,.55,0xe0b070);sperrKasten(q[0],q[1],4.2,1.8,R)}
  for(let i=0;i<4;i++)sack(X(6+(i%2)*.9),Z(3+(i>>1)*.9),0xf6f2e8,1.1);holzstapel(X(-7.6),Z(1),R+1.57);korb(X(3.4),Z(6.6),0xc8944a);
  figK(X(-1.4),Z(4.6),R+3.14,0,1.3,{typ:'hut',hut:0xf6f4ee,schuerze:1,j:0xf6f4ee});figK(X(1.8),Z(8.2),R,1,1.15);figK(X(-5),Z(8),R,8,.9);fackel(X(-6.4),Z(4),3.4)}
function ort21(){const b=zone('Töpferei'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  fachwerk(X(-1),Z(-3.4),7,5.4,R,{dach:0xb4503a,og:false,wand:0xe6c58a});
  /* Töpferscheibe (dreht sich) mit Töpfer, Brennofen mit Rauch, Krüge und Töpfe */
  {const x=X(1.2),z=Z(3.6);inst('cyl',x,.5,z,.18,1,.18,0x6a4a2e);const d=grp(x,1.05,z);cyl(.7,.12,0x8a5a32,0,0,0,d);sph(.34,0xc87a4a,0,.35,0,d,1,1.2,1);vm(d);bewegt(d,t=>{d.rotation.y=t*3});figK(x,z+2.2,R+3.14,3,1.25,{j:0x8a6a3a,schuerze:1});kreis(x,z,.8)}
  {const x=X(7),z=Z(1);inst('cylT',x,1.8,z,2,3.6,2,0xb09878);inst('sph',x,3.8,z,1.9,1,1.9,0x9a8268);inst('cyl',x+1,4.6,z,.4,2.2,.4,0x8a7258);inst('box',x,.9,z+1.9,1,1.1,.2,0x1a1210,R);kreis(x,z,2.4);rauch(scene,x+1,5.6,z);flamme(x,.3,z+1.5,.5)}
  for(let i=0;i<9;i++){const x=X(-6+(i%5)*.9),z=Z(5+(i>>2)*1.2),c=[0xc87a4a,0xa85a32,0xd89060][i%3];inst('sph',x,.6,z,.5,.6,.5,c);inst('cyl',x,1.15,z,.22,.35,.22,dk(c,.8))}
  [[3,7],[4,7.6]].forEach((p,i)=>{inst('sph',X(p[0]),1.0,Z(p[1]),.9,1.1,.9,[0xa85a32,0xd89060][i]);inst('cyl',X(p[0]),2.0,Z(p[1]),.4,.8,.4,0x8a4a2e);kreis(X(p[0]),Z(p[1]),.9)});
  inst('sph',X(-7),.5,Z(1),1.4,.8,1.2,0x9a6a42);kistenI(X(-5),Z(-1.4),2);fassI(X(5),Z(7.6),1,0x6a4a2e);figK(X(-3.4),Z(7.6),R+.4,1,1.2)}
function ort22(){const b=zone('Weberei und Färberei'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  fachwerk(X(-2),Z(-3.6),7.6,5.6,R,{dach:0x8a5a3a,og:true,wand:0xd4dcc0});
  /* Webstuhl, Spinnrad */
  {const L2=LG(X(1),Z(4),R);[-1.6,1.6].forEach(s=>L2.b(s,1.7,0,.25,3.4,.25,0x6a4a2e));L2.b(0,3.4,0,3.5,.25,.25,0x6a4a2e);L2.b(0,.9,0,3.5,.2,.25,0x6a4a2e);for(let i=0;i<9;i++)L2.b(-1.4+i*.35,2.1,0,.05,2.3,.05,KOLOR[i%6]);L2.b(0,1.5,0,3.0,.8,.1,0xc03a3a);kreis(X(1),Z(4),2);figK(X(1),Z(5.6),R+3.14,5,1.2)}
  {const g=grp(X(-6),0,Z(5));g.rotation.y=R;box(1.4,.2,.8,0x6a4a2e,0,.6,0,g,true);[-.5,.5].forEach(s=>box(.1,1.2,.1,0x6a4a2e,s,.6,0,g));const w=grp(.0,1.3,.5,g);w.add(new THREE.Mesh(new THREE.TorusGeometry(.7,.06,5,14),mat(0x8a5a32)));for(let i=0;i<4;i++){const a=box(.05,1.4,.05,0x6a4a2e,0,0,0,w);a.rotation.z=i*.785}vm(w);bewegt(w,t=>{w.rotation.z=-t*2});vm(g);kreis(X(-6),Z(5),1)}
  /* Färbebottiche mit buntem Wasser */
  [[5,1,0x3a5ea8],[7,1,0xc03a3a],[9,1,0xe8b830]].forEach(p=>{inst('cylT',X(p[0]),.7,Z(p[1]),1.0,1.4,1.0,0x8a5a32);inst('cylT',X(p[0]),1.38,Z(p[1]),.85,.1,.85,p[2]);kreis(X(p[0]),Z(p[1]),1.1)});
  /* Tuchgestell mit gefärbten Stoffbahnen */
  [[-6,-1],[6.4,7]].forEach((p,k)=>{const x=X(p[0]),z=Z(p[1]);inst('cyl',x-2.4,2,z,.1,4,.1,0x6a4a2e);inst('cyl',x+2.4,2,z,.1,4,.1,0x6a4a2e);inst('box',x,3.9,z,5,.1,.1,0x6a4a2e,R);for(let i=0;i<5;i++){const g=grp(x-2+i*1,3.8,z);box(.8,2.6,.08,[0x3a5ea8,0xc03a3a,0xe8b830,0x3a8a4a,0x8a4a9a][(i+k)%5],0,-1.3,0,g);vm(g);bewegt(g,t=>{g.rotation.x=Math.sin(t*1.3+i)*.1})}kreis(x,z,.4)});
  for(let i=0;i<4;i++)sph(.55,[0xf2f2ea,0xc03a3a,0x3a5ea8,0xe8b830][i],X(-8+i*.9),.5,Z(2),scene,1,.9,1);figK(X(7),Z(4.4),R+2.4,8,1.2)}
function ort23(){const b=zone('Schusterei und Gerberei'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  fachwerk(X(-2.4),Z(-3.4),6.6,5.4,R,{dach:0x8a5a3a,og:false,wand:0xe8d2a8});
  /* Stiefel als Zunftzeichen (Bild) */
  {const e=LG(X(-2.4),Z(-3.4),R);e.b(0,4.4,3.0,.8,1.2,.4,0x6a4a2e);e.b(.5,3.9,3.0,1.2,.5,.4,0x6a4a2e);e.b(0,4.9,3.0,1.2,.2,.4,0x4a3220);e.b(0,4.8,2.7,.12,.12,.9,0x3a3a40)}
  /* Werkbank mit Schuhen, Schuster sitzt auf Hocker */
  {const L2=LG(X(1),Z(4),R);L2.b(0,.95,0,3.4,.2,1.4,0x8a5a32);[-1.5,1.5].forEach(s=>L2.b(s,.45,0,.2,.9,.2,0x6a4a2e));for(let i=0;i<5;i++){L2.b(-1.2+i*.6,1.2,0,.4,.3,.5,[0x6a4a2e,0x3a2a1c,0x8a5a32][i%3]);L2.b(-1.2+i*.6+.1,1.45,-.1,.2,.3,.3,0x4a3220)}sperrKasten(X(1),Z(4),3.6,1.6,R);cyl(.4,.7,0x8a5a32,X(1),.35,Z(5.8),scene);figK(X(1),Z(5.8),R+3.14,2,1.2,{typ:'hut',hut:0x4a3220,schuerze:1,j:0x6a4a2e})}
  /* Gerberei: Lederrahmen, Gruben, Felle */
  [[5,-1],[7.4,2]].forEach(p=>{inst('box',X(p[0]),.2,Z(p[1]),2.8,.4,2.2,0x6a4a2e);inst('box',X(p[0]),.38,Z(p[1]),2.3,.1,1.7,0x7a5a2e);kreis(X(p[0]),Z(p[1]),1.7)});
  [[-7,2],[-7,5]].forEach((p,i)=>{inst('cyl',X(p[0]),1.8,Z(p[1])-1.4,.1,3.6,.1,0x6a4a2e);inst('cyl',X(p[0]),1.8,Z(p[1])+1.4,.1,3.6,.1,0x6a4a2e);inst('box',X(p[0]),3.4,Z(p[1]),.1,.1,3,0x6a4a2e,R);for(let k=0;k<3;k++)inst('box',X(p[0]),2.4,Z(p[1])-.9+k*.9,.1,2,.7,[0x8a5a32,0xa87a4a,0x6a4a2e][(i+k)%3],R);kreis(X(p[0]),Z(p[1]),1.8)});
  eimer(X(4),Z(6.4),0x6a4a2e,0x6a4a2e);figK(X(6.4),Z(5.6),R+3.6,0,1.25,{j:0x7a5a3a,schuerze:1})}
function ort24(){const b=zone('Zimmerei und Holzfällerplatz'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  /* Rohbau eines Hauses: Steinsockel, Fachwerk mit Streben, erste gefüllte Fächer, offener Dachstuhl und Leiter */
  {const L2=LG(X(-2),Z(-4),R),H=0x8a5a32,S=0xb88450;L2.b(0,.2,0,7.9,.4,5.9,STEIN);
    [-3.6,-1.2,1.2,3.6].forEach(x=>[-2.6,2.6].forEach(z=>L2.b(x,2.4,z,.32,4.1,.32,H)));[-3.6,3.6].forEach(x=>L2.b(x,2.4,0,.28,4.1,.28,H));
    [.55,2.35,4.4].forEach(y=>{[-2.6,2.6].forEach(z=>L2.b(0,y,z,7.55,.28,.34,H));[-3.6,3.6].forEach(x=>L2.b(x,y,0,.34,.28,5.2,H))});
    /* Streben in den äußeren Fächern vorn und hinten */
    [-2.6,2.6].forEach(z=>[-1,1].forEach(s=>L2.b(s*2.4,3.38,z,.2,3.1,.2,S,0,s*.86)));
    /* schon fertige Lehmfächer */
    [-2.4,0,2.4].forEach(x=>L2.b(x,1.45,-2.6,2.1,1.55,.14,0xeadcb8));[-1.3,1.3].forEach(z=>L2.b(-3.6,1.45,z,.14,1.55,2.35,0xeadcb8));L2.b(-2.4,1.45,2.6,2.1,1.55,.14,0xeadcb8);
    /* Dachstuhl: Sparrenpaare treffen sich oben am First */
    [-3.6,-1.2,1.2,3.6].forEach(x=>{[-1,1].forEach(s=>L2.b(x,5.52,s*1.5,.24,3.75,.24,S,-s*.935));L2.b(x,5.4,0,.18,.18,3.3,S)});L2.b(0,6.62,0,7.9,.28,.28,H);[-3.6,3.6].forEach(x=>L2.b(x,5.5,0,.24,2.2,.24,H));
    /* Leiter an der Vorderseite */
    [-.35,.35].forEach(d=>L2.b(2.4+d,2.3,3.35,.1,4.75,.1,0xc9a46a,-.24));for(let i=0;i<8;i++){const y=.45+i*.55;L2.b(2.4,y,3.35-(y-2.3)*.245,.7,.08,.08,0xc9a46a)}
    sperrKasten(X(-2),Z(-4),8,5.9,R);const lp=L2.P(2.4,3.45);sperrKasten(lp[0],lp[1],1,1.2,R)}
  /* Tretradkran (Rad dreht sich neben dem Mast), Balkenstapel, Sägebock mit Säger */
  {const L2=LG(X(7),Z(1),R+1.57);L2.b(0,3,0,.4,6,.4,0x7a5230);L2.b(1.6,5.8,0,3.6,.3,.3,0x7a5230);L2.b(1,5,0,.2,2.3,.2,0x7a5230,0,-.9);L2.b(3.2,3.95,0,.06,3.5,.06,0xc8a870);L2.b(3.2,1.9,0,.9,.7,.9,0x9a6a3a);
    L2.b(0,2.25,.9,.26,.26,1.8,0x5a3a22);L2.b(0,1.15,1.8,.36,2.3,.36,0x7a5230);
    const w=grp(L2.P(0,.95)[0],2.25,L2.P(0,.95)[1]);w.rotation.y=R+1.57;const rad=grp(0,0,0,w);[-.45,.45].forEach(z=>{const rg=new THREE.Mesh(new THREE.TorusGeometry(2,.13,5,16),mat(0x8a5a32));rg.position.z=z;rad.add(rg);for(let i=0;i<4;i++){const a=box(.13,4,.1,0x6a4a2e,0,0,z,rad);a.rotation.z=i*.785}});
    for(let i=0;i<16;i++){const a=i/16*6.283,br=box(.12,.55,.95,0xb88450,Math.cos(a)*2,Math.sin(a)*2,0,rad);br.rotation.z=a}vm(rad);bewegt(rad,t=>{rad.rotation.z=-t*.4});
    const m=L2.P(0,1);sperrKasten(m[0],m[1],4.4,2.2,R+1.57);const e=L2.P(3.2,0);kreis(e[0],e[1],.7)}
  for(let i=0;i<3;i++)for(let j=0;j<3-i;j++)inst('box',X(-8)+j*.6,.3+i*.6,Z(3)+j*0,.5,.5,5,[0xb88450,0xa87a42][(i+j)%2],R);kreis(X(-8),Z(3),3);
  {const x=X(0.4),z=Z(5);inst('box',x,.9,z,3,.2,.5,0x7a5230,R);[-1.2,1.2].forEach(s=>inst('box',x+s,.45,z,.2,.9,.9,0x7a5230,R,0,s>0?.3:-.3));inst('cyl',x,1.4,z,.35,3.2,.35,0xa87a42,R,0,1.57);kreis(x,z,1.7);const sg=grp(x+.3,1.2,z);sg.rotation.y=R;box(.1,.7,.9,0xc8c8d0,0,.4,0,sg);box(.1,.2,.1,0x6a4a2e,0,.8,.4,sg);vm(sg);bewegt(sg,t=>{sg.position.z=z+Math.sin(t*3)*.35;});figK(x+.4,z+1.25,R+3.14,0,1.25,{j:0x7a4a2a})}
  [[-6,6],[-4,8]].forEach(p=>stamm(X(p[0]),Z(p[1]),5,R,.5));stumpf(X(3),Z(8),1);stumpf(X(4.4),Z(7),.9);holzstapel(X(-7.4),Z(-3),R);holzstapel(X(10),Z(-3),R+1.57);
  figK(X(8.6),Z(4.4),R+2.8,3,1.25,{j:0x4a7a3a});figK(X(-5),Z(4.2),R+.6,0,1.2)}
function ort25(){const b=zone('Apotheke und Kräuterhaus'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  fachwerk(X(0),Z(-3.4),7,5.6,R,{dach:0x2f6a8a,og:true,wand:0xf0e4c8});
  /* Mörser mit Stößel als Bild-Schild am Ausleger (kein Text) */
  {const e=LG(X(0),Z(-3.4),R);e.b(2.6,5.4,3.6,.14,.14,1.6,0x3a3a3e);e.c(2.6,3.6,4.2,.7,.9,0x8a8a92,'cylT');e.c(2.6,3.4,4.2,.9,.3,0x6a6a72,'cylT');e.b(2.9,5.0,4.0,.2,1.8,.2,0xe8dcc0,0,.5)}
  /* Kräuterbeete in Reihen, Trockengestell mit Bündeln, Waage, Tonkrüge */
  for(let r=0;r<4;r++){const z=Z(3+r*1.7);inst('box',X(-5.4),.12,z,6,.24,1.2,0x5a3a22,R);for(let i=0;i<10;i++){const x=X(-8+i*.6);inst('cyl',x,.4,z,.03,.5,.03,0x4a9a3a);inst('blm',x,.7,z,.2,.2,.2,[0xb06ae0,0xffd45e,0xf47ab0,0x8ad8a0,0xffffff,0xe0605a][(i+r*2)%6])}}
  [[X(6),Z(4)],[X(6),Z(7)]].forEach(p=>{inst('cyl',p[0]-1.6,1.6,p[1],.08,3.2,.08,0x6a4a2e);inst('cyl',p[0]+1.6,1.6,p[1],.08,3.2,.08,0x6a4a2e);inst('box',p[0],3.1,p[1],3.4,.1,.1,0x6a4a2e,R);for(let i=0;i<5;i++)inst('con',p[0]-1.2+i*.6,2.6,p[1],.2,1,.2,[0x6ab04a,0xb06ae0,0xd8c040,0x4aa84a,0xf47ab0][i],0,Math.PI);kreis(p[0]-1.6,p[1],.2);kreis(p[0]+1.6,p[1],.2)});
  {const L2=LG(X(1),Z(7.4),R);L2.b(0,.95,0,2.8,.2,1.2,0x8a5a32);[-1.2,1.2].forEach(s=>L2.b(s,.45,0,.2,.9,.2,0x6a4a2e));L2.b(0,2.0,0,.1,2,.1,0x3a3a3e);L2.b(0,2.95,0,2.0,.08,.08,0x3a3a3e);[-1,1].forEach(s=>L2.c(s,1.9,0,.4,.1,0xc8a830));sperrKasten(X(1),Z(7.4),3,1.4,R)}
  for(let i=0;i<4;i++){inst('sph',X(-1+i*.8),.5,Z(10.4),.4,.5,.4,[0xc87a4a,0x6a8a9a,0xd8c070,0xa85a32][i]);kreis(X(-1+i*.8),Z(10.4),.4)}
  figK(X(2.8),Z(5.6),R+3.3,10,1.25,{typ:'barett',hut:0x3a5ea8,umhang:0xf2f2ea});figK(X(-3),Z(9.6),R+.2,1,1.15)}
function ort26(){const b=zone('Glockengießerei'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  fachwerk(X(-.5),Z(-3.4),8,5.6,R,{dach:0x6f7680,og:false,wand:0xd8d0c0,door:false});const e=LG(X(-.5),Z(-3.4),R);esse(e,3,-.4);const q=e.P(3,.8);flamme(q[0],.7,q[1],.7);const sm=e.P(3,-.6);rauch(scene,sm[0],8.4,sm[1]);
  /* Glockengerüst mit schwingender Glocke, fertige Glocken am Boden */
  {const L2=LG(X(-3),Z(4.6),R);[-1.8,1.8].forEach(s=>{L2.b(s,2.4,0,.4,4.8,.4,0x7a5230);L2.b(s,3.0,0,.2,.2,2.6,0x7a5230,0,0)});L2.b(0,4.8,0,4.4,.4,.4,0x7a5230);kreis(X(-3)-1.8*Math.cos(R),Z(4.6),.5);kreis(X(-3)+1.8*Math.cos(R),Z(4.6),.5);
    const g=grp(L2.P(0,0)[0],4.6,L2.P(0,0)[1]);g.rotation.y=R;const gl=grp(0,0,0,g);cone(1.1,1.9,0xc8a02e,0,-1.4,0,gl);cyl(1.1,.2,0xb8901e,0,-2.35,0,gl);sph(.3,0x6a4a2e,0,-2.0,0,gl);vm(gl);bewegt(gl,t=>{gl.rotation.x=Math.sin(t*1.6)*.3})}
  for(let i=0;i<3;i++){inst('con',X(5+i*2.4),1.1,Z(6+(i%2)*1.4),1.4-i*.2,2.2-i*.4,1.4-i*.2,0xc8a02e);inst('cyl',X(5+i*2.4),.1,Z(6+(i%2)*1.4),1.5-i*.2,.2,1.5-i*.2,0xb8901e);kreis(X(5+i*2.4),Z(6+(i%2)*1.4),1.3-i*.2)}
  inst('con',X(-7),1.5,Z(1.6),1.6,3,1.6,0x6a4a38);inst('sph',X(-7),.4,Z(3.6),1.6,.6,1.6,0x6a4a38);kreis(X(-7),Z(1.6),1.6);
  figK(X(1),Z(1),R+2.4,0,1.3,{schuerze:1,j:0x7a5a3a});figK(X(7),Z(3),R+.4,8,1.2,{schuerze:1});fackel(X(-8),Z(6),3.4)}
function ort34(){const b=zone('Spielleute-Bühne'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  /* Holzbühne mit Dach auf Pfosten und Wimpeln */
  {const L2=LG(X(0),Z(-4.4),R);L2.b(0,.45,0,9,.9,4.4,0x8a5a32);L2.b(0,.95,0,9.4,.15,4.8,0xc8a870);[-4.2,4.2].forEach(s=>[-1.8,1.8].forEach(t=>L2.c(s,.9,t,.16,3.6,0x6a4a2e)));L2.g(0,4.5,0,10.4,1.6,5.4,0xb04a38);L2.b(0,3.0,-2.1,8.4,3,.16,0x3a5ea8);L2.s(0,3.0,-2.0,1,1,.2,0xe8b830);sperrKasten(X(0),Z(-4.4),9.4,4.8,R);
    for(let i=0;i<9;i++)L2.k(-4+i,3.3,2.5,.28,.7,KOLOR[i%6],'con')}
  /* Musikanten: Laute, Flöte, Trommel, Dudelsack */
  {const A=[[-3,-3.6,'laute'],[-1,-3.8,'floete'],[1.2,-3.8,'trommel'],[3.2,-3.6,'dudel']];A.forEach((a,i)=>{const p=LG(X(a[0]),Z(a[1]),R);const w=p.P(0,0);const f=figK(w[0],w[1],R,[3,11,4,7][i],1.25);const g=grp(w[0],1.9,w[1]);g.rotation.y=R;if(a[2]==='laute'){sph(.55,0xc8803a,.3,0,.7,g,1,1.2,.5);box(.1,1.1,.12,0x6a4a2e,.3,.9,.7,g).rotation.z=.5}else if(a[2]==='floete'){cyl(.05,1.3,0x6a4a2e,.3,.5,.55,g).rotation.x=1.2;}else if(a[2]==='trommel'){cyl(.55,.5,0xc03a3a,0,-.3,.8,g);cyl(.57,.1,0xf2f2ea,0,-.05,.8,g)}else{sph(.4,0x3a8a4a,.2,-.2,.7,g,1,1.2,.8);[-.3,.3].forEach(s=>cyl(.05,1.1,0x3a2a1a,s,.5,.6,g))}vm(g);bewegt(g,t=>{g.position.y=1.9+Math.abs(Math.sin(t*4+i))*.12})})}
  /* Tanzplatz mit tanzenden Paaren und Kindern */
  {const x=X(0),z=Z(4.8);inst('cylT',x,.05,z,5,.1,5,0xd8c898);for(let i=0;i<10;i++)inst('box',x+Math.cos(i*.628)*3.2,.12,z+Math.sin(i*.628)*3.2,.9,.05,.9,KOLOR[i%6],i*.628);
    const g=grp(x,0,z);for(let i=0;i<4;i++){const a=i/4*6.28,f=kostFig(KOST[[1,4,5,8][i]],g,1.1);f.w.position.set(Math.cos(a)*2.2,0,Math.sin(a)*2.2);f.m.g.rotation.y=0;f.w.rotation.y=-a;vmVerschm(f.m.g);vmVerschm(f.w)}bewegt(g,t=>{g.rotation.y=-t*.7});kreis(x,z,.5)}
  bankW(X(-7),Z(4),Math.PI/2*(R?-1:1));bankW(X(7),Z(4),-Math.PI/2);figK(X(-6),Z(8),R+3,0,1.2);figK(X(5.6),Z(8.4),R+3.3,2,1.25);figK(X(-4),Z(9),R+3.1,5,.9);fackel(X(-8),Z(0),3.6);fackel(X(8),Z(0),3.6);
  for(let i=0;i<14;i++)inst('con',X(-8+i*1.2),6.4-Math.sin(i/13*3.14)*1.2,Z(9.6),.3,.7,.3,KOLOR[i%6],0,Math.PI)}
function ort33(){const b=zone('Kloster mit Schreibstube'),L0=lay(b),X=L0.x,Z=L0.z,R=L0.r,bx=b.x,bz=b.z;ast(b,3.2,0,COB);
  const e=LG(bx,bz,R);
  /* Klosterbau hinten (Stein, Dach), davor Kreuzgang mit Säulen, in der Mitte Klostergarten */
  steinbau(e.P(0,-6.6)[0],e.P(0,-6.6)[1],16,6,6.4,R,{stein:0xcdbfa0,dach:0x8a3a2a,tor:false,s:true});
  {const q=e.P(-6,-6.6);mTurm(q[0],q[1],2.4,12,{stein:0xcdbfa0,dach:0x2f6a8a})}
  [[-7.6,-3.4,0,7],[7.6,-3.4,0,7]].forEach(p=>{});
  for(let i=0;i<=8;i++){const lx=-7.6+i*1.9;if(i===4)continue;e.c(lx,0,5,.35,3.4,0xcfc4aa);inst('box',e.P(lx,5)[0],3.5,e.P(lx,5)[1],2,.35,.8,0xb8ad92,R);kreis(e.P(lx,5)[0],e.P(lx,5)[1],.5)}
  for(let i=0;i<=4;i++)[-1,1].forEach(s=>{const lz=-2.8+i*1.9;e.c(s*7.6,0,lz,.35,3.4,0xcfc4aa);kreis(e.P(s*7.6,lz)[0],e.P(s*7.6,lz)[1],.5)});
  [-1,1].forEach(s=>{e.b(s*7.6,3.5,1.2,.8,.35,8.4,0xb8ad92)});e.b(0,3.5,5,16,.35,.8,0xb8ad92);e.b(0,3.9,5,16,.5,.8,0xa8453a,0,0);
  /* Garten: Beete, Brunnen, Bienenkörbe */
  for(let r=0;r<3;r++)[-1,1].forEach(s=>{const q=e.P(s*3.6,-1+r*2);for(let i=0;i<5;i++){inst('box',q[0],.12,q[1],2.2,.24,1,0x5a3a22,R);}for(let i=0;i<6;i++){const a=e.P(s*3.6-1+i*.4,-1+r*2);inst('blm',a[0],.5,a[1],.22,.2,.22,[0xb06ae0,0xffd45e,0xf47ab0,0x8ad8a0,0xffffff,0xe0605a][(i+r)%6])}});
  {const q=e.P(0,1.4);brunnen(q[0],q[1],.8)}
  for(let i=0;i<3;i++){const q=e.P(-7+i*1.1,-1);inst('conT',q[0],.5,q[1],.55,.9,.55,0xd8b050)}
  /* Schreibstube (offene Seite zum Hof): Pulte, Bücher, Mönche beim Schreiben */
  for(let i=0;i<3;i++){const p=e.P(-4+i*4,-3.8),L2=LG(p[0],p[1],R);L2.b(0,.9,0,2.4,.15,1.3,0x8a5a32,.3);[-1,1].forEach(s=>L2.b(s*1.0,.45,0,.15,.9,.9,0x6a4a2e));L2.b(0,1.1,0,1.1,.12,.8,0xf6f0d8,.3);L2.b(.7,1.05,.3,.5,.14,.4,[0x8a2a2a,0x2a4a8a,0x3a6a3a][i],.3);figK(p[0],p[1]+Math.cos(R)*1.6,R+3.14,2,1.2)}
  for(let i=0;i<5;i++)for(let k=0;k<3;k++){const q=e.P(-7+i*1.1+(k?0:0),-8.8);const L2=LG(q[0],q[1],R);L2.b(0,1.1+k*1.1,0,.9,.9,.5,[0x8a2a2a,0x2a4a8a,0x3a6a3a,0x6a4a2e,0xc8a030][(i+k)%5])}
  sperrKasten(e.P(0,-8.8)[0],e.P(0,-8.8)[1],12,.8,R);
  /* Mönche im Hof, Kerzen, Glocke */
  {const q=e.P(-5,2),q2=e.P(5.2,2.6);figK(q[0],q[1],R+1,2,1.25);figK(q2[0],q2[1],R+3,2,1.25)}
  for(let i=0;i<4;i++){const a=e.P(-3.6+i*2.4,-7.4);inst('cyl',a[0],1.1,a[1],.07,.5,.07,0xf6f0d8);inst('sph',a[0],1.45,a[1],.08,.12,.08,0xffcf50)}
  flagge(e.P(7,-6.6)[0],6.4,e.P(7,-6.6)[1],3.2,0xf2f2ea,0xc89a3a)}

/* ==================== Etappe 3d: Burg (Orte 1 bis 9) ==================== */
function zelt(x,z,w,d,h,rot,c1,c2){const L=LG(x,z,rot),n=6;for(let i=0;i<n;i++)L.g(-w/2+(i+.5)*w/n,0,0,w/n+.02,h,d,i%2?c2:c1);L.b(0,h*.45,d/2+.02,w*.5,h*.9,.1,0x2a2a2e);L.b(0,h+.15,0,w+.2,.2,.25,0x7a5230);kreis(x,z,Math.max(w,d)*.55)}
function pfadB(bx,bz){const z=bz;weg(wellen(gx(z),z,bx,bz),3.2,COB)}
function ort1(){const bx=gx(-96),zz=-96;
  /* Zugbrücke über den Graben (begehbar) mit Ketten, Fallgitter, Torwinde */
  {const x1=gx(-85),z1=-85,x2=bx,z2=-96,Ln=Math.hypot(x2-x1,z2-z1),rt=Math.atan2(x2-x1,z2-z1),B=LG((x1+x2)/2,(z1+z2)/2,rt);B.b(0,.17,0,6.8,.34,Ln+.6,0x7a5230);for(let k=-Ln/2;k<Ln/2;k+=1.1)B.b(0,.36,k,6.8,.05,.18,0x4a3220);
    [-1,1].forEach(sg=>{B.b(sg*3.4,.95,0,.14,.14,Ln,0x6a4220);for(let k=-Ln/2;k<=Ln/2+.1;k+=2.2)B.b(sg*3.4,.5,k,.16,1,.16,0x7a5230);const p=B.P(sg*3.4,-Ln/2),q=B.P(sg*3.4,Ln/2);sperrLinie(p[0],p[1],q[0],q[1],.15)});
    [-1,1].forEach(sg=>{inst('box',x2+sg*3.7,3.5,z2+5.5,.14,.14,12,0x4a4a52,0,.58);inst('cyl',x2+sg*3.7,6.9,z2-.2,.22,.22,.22,0x4a4a52)})}
  for(let i=-3;i<=3;i++)inst('cyl',bx+i*.85,5.2,zz+1.2,.07,2.6,.07,0x4a4a52);inst('box',bx,6.4,zz+1.2,6,.12,.12,0x4a4a52);inst('box',bx,4.4,zz+1.2,6,.12,.12,0x4a4a52);inst('box',bx,5.4,zz+1.2,6,.1,.1,0x4a4a52);
  [-1,1].forEach(s=>flagge(bx+s*8.9,11.9,zz,4.2,s>0?0xc03a3a:0x3a5ea8,0xf2f2ea,1.4));
  [[-1,0xc03a3a],[1,0x3a5ea8]].forEach(p=>ritterFig(bx+p[0]*5.9,zz-6,Math.PI,6,p[1],0xf2f2ea));
  /* Wappenbanner an den Türmen, Schilf, Seerosen, Schwäne und Enten im Graben */
  [[-1,0xc03a3a],[1,0x3a5ea8]].forEach(p=>{inst('box',bx+p[0]*8.9,6,zz+3.9,1.6,3.6,.12,p[1]);inst('box',bx+p[0]*8.9,4.5,zz+3.9,1.6,.3,.14,0xe8b830);inst('sph',bx+p[0]*8.9,6.5,zz+4,.4,.4,.1,0xe8b830)});
  for(let i=0;i<14;i++){const x=-72+i*10.5;if(Math.abs(x-bx)<8)continue;for(let k=0;k<4;k++)inst('cyl',x+k*.4,.9,-87.6+nr()*.6,.04,1.8,.04,0x4a8a3a);inst('cylT',x+3,.11,-91,.7,.04,.7,0x3a8a4a);inst('sph',x+3,.15,-91,.2,.1,.2,0xf6a8c8)}
  [[-30,-91,0],[34,-91,2],[-40,-180.5,1],[44,-180.5,3]].forEach((p,i)=>{const g=(i<2?gans:ente)(scene);g.scale.setScalar(i<2?1.7:1.5);g.userData.keep=1;const x0=p[0],z0=p[1];lebendig.push({o:{userData:{anim:t=>{g.position.set(x0+Math.sin(t*.15+i)*12,.1,z0+Math.sin(t*.4)*.8);g.rotation.y=Math.cos(t*.15+i)>0?0:Math.PI}}},ph:0})});
  fackel(bx-6,-85,4);fackel(bx+6,-85,4);[-1,1].forEach(s=>{fassI(bx+s*8,-83,1);kistenI(bx+s*10.6,-84,2)})}
function ort2(){const bx=0,bz=-134;scheibe(bx,bz,12.4,0xc8c0ae,.09);brunnen(-7,bz+2,1.2);
  /* Linde mit Bank, Hühner und Gänse, Holz, Kisten, Pferdetränke */
  baum(-11,bz-6,0,1.6);bankW(-8,bz-7,.3);bankW(-12.4,bz-3.4,1.9);
  for(let i=0;i<8;i++){const h=([huhn,huhnW,huhnS][i%3])(scene);h.position.set(-9+(nr()-.2)*20,0,bz+(nr()-.5)*14);h.rotation.y=nr()*6;h.scale.setScalar(1.3);lebendig.push({o:h,ph:i});kreis(h.position.x,h.position.z,.35)}
  for(let i=0;i<3;i++){const g=gans(scene);g.position.set(-12+i*1.4,0,bz+8+(i%2));g.rotation.y=nr()*6;g.scale.setScalar(1.4);lebendig.push({o:g,ph:i});kreis(g.position.x,g.position.z,.5)}
  holzstapel(-11,bz+9.4,Math.PI/2);kistenI(12,bz-6,4);fassI(13.6,bz+3,1);fassI(14.8,bz+3.8,1);trog(10,bz+8,.2);karren(8,bz-9,.7,'heu');
  [[4,bz-3,0],[-3,bz+5,5],[9,bz+4,8],[-2,bz-8,3],[3,bz+9,10]].forEach((p,i)=>figK(p[0],p[1],i*1.1,p[2],i%2?.95:1.25));
  streif(hundM,pendel(spl([[-4,bz-4],[4,bz-8],[8,bz+2],[-2,bz+8],[-8,bz+1]],1.5),1.2),2.2,0,1.3);
  [[-8,bz-9],[8,bz+9],[-12,bz+9],[12,bz-1]].forEach(p=>fackel(p[0],p[1],4));
  for(let i=0;i<6;i++)sitz(-7+Math.cos(i*1.1)*1.9,2.5+(i%2)*0,bz+2+Math.sin(i*1.1)*1.9,i,(i+3)%6,1.1);
  for(let i=0;i<5;i++)flieger(0,bz,9+i*2,11+i,i*1.3,.45,0x8a8d92,0xf2f2f2)}
function ort3(){const bx=-48,bz=-166;
  /* Felssockel, Rundturm mit Zinnen und Wachhäuschen, Außentreppe */
  inst('sph',bx,1.5,bz,11,3,11,0x8d9097);inst('sph',bx+5,1.6,bz+3,5,2.2,4.4,0x7e848c);inst('sph',bx-6,1.4,bz+1,4,2,4,0x9a9a9e);
  inst('cylT',bx,13,bz,6.6,26,6.6,0x9a948a);inst('cylT',bx,.5,bz,7.6,1,7.6,0x7a746a);inst('cylT',bx,26.5,bz,7.5,1.4,7.5,0x8a847a);
  for(let i=0;i<16;i++){const a=i/16*6.283;if(i%2)continue;inst('box',bx+Math.cos(a)*7.2,28,bz+Math.sin(a)*7.2,2,1.4,1,0x9a948a,-a+1.5708)}
  inst('cylT',bx,31.2,bz,3.2,6.2,3.2,0xa8a094);inst('conT',bx,36.8,bz,4,5.4,4,0xb04a38);
  for(let k=0;k<5;k++){const a=k*1.26+.3;[7,13,19,24].forEach((y,j)=>inst('box',bx+Math.cos(a)*6.6,y,bz+Math.sin(a)*6.6,.5,1.6,.5,0x2a2a30,-a+1.5708+j*0))}
  for(let i=0;i<10;i++)inst('box',bx+7.6+i*.6,.4+i*.6,bz+2.4-i*.5,1.4,.7,1.6,0x8a847a);inst('box',bx+5.7,6.6,bz+1.4,1.6,3,2.4,0x6b4524);
  flagge(bx,38,bz,5,0xc03a3a,0xf2f2ea,1.6);kreis(bx,bz,10.8);
  falkeFlug(bx,bz,13,34,0,.35,1.8);falkeFlug(bx,bz,16,29,3.1,-.3,1.6);
  for(let i=0;i<4;i++){const a=i*1.57+.3;sitz(bx+Math.cos(a)*7.2,28.4+1.4,bz+Math.sin(a)*7.2,a,(i*2+1)%6,1.4)}
  pfadB(bx+8,bz+8);figK(bx+9,bz+6,.5,6,1.3,{umhang:0xc03a3a});figK(bx+2,bz+9,3,0,1.2);fackel(bx+10,bz+9,4);fackel(bx-8,bz+8,4);fassI(bx+10.5,bz-1,1);kistenI(bx-9,bz-4,3)}
function ort4(){const bx=50,bz=-148,R=-Math.PI/2,L=LG(bx,bz,R),S=0xcfc8b8;
  /* Große Halle: Rückwand, Seitenwände, Dach; vorn offene Säulenfront; innen Tafel, Throne, Kronleuchter, Banner */
  L.b(0,5,-5.4,22,10,.9,S);[-1,1].forEach(s=>L.b(s*10.7,5,0,.9,10,11,S));L.b(0,.5,0,23,1,12,0x8a847a);
  L.g(0,10,0,24,6,12.6,0x6f7680);L.g(0,10,-.1,24.06,5.4,11.4,S);L.b(0,16.05,0,24,.24,.5,0x555a62);
  for(let i=0;i<6;i++){const lx=-10+i*4;L.c(lx,0,5.4,.55,9.4,0xb4aea0,'cylT');L.b(lx,9.6,5.4,3.9,.7,.9,0xb4aea0)}
  for(let i=0;i<4;i++)[-1,1].forEach(s=>L.b(s*11.2,5.4,-3.6+i*2.4,.12,4,1,0x3a4a8a));
  for(let i=0;i<5;i++)L.b(-8+i*4,6.6,-4.9,1.2,3.4,.1,0x3a4a8a);
  L.b(0,1.3,0,14,.2,2.4,0x6a4a2e);[-6.4,6.4].forEach(x=>L.b(x,.65,0,.3,1.3,2,0x5a3a22));[-1,1].forEach(s=>{L.b(0,.6,s*2,14,.2,.9,0x7a5230);[-6,6].forEach(x=>L.b(x,.3,s*2,.3,.6,.7,0x5a3a22))});
  for(let i=0;i<10;i++){L.s(-6.3+i*1.4,1.5,.4,.3,.16,.3,[0xc8944a,0xe8d8b0][i%2]);L.c(-6.3+i*1.4,1.4,-.5,.14,.4,0xc8a030)}
  L.b(0,.14,0,22,.08,3.4,0xa83a3a);
  [[-2.2,0xc8a030],[2.2,0xc8a030]].forEach(p=>{L.b(p[0],1.2,-4.4,1.4,2.4,1.1,0x6a2a2a);L.b(p[0],2.9,-4.8,1.4,2.6,.3,0x6a2a2a)});
  for(let i=0;i<5;i++)L.b(-8+i*4,7.6,4.2,1.4,4.6,.12,[0xc03a3a,0x3a5ea8,0xe8b830,0x3a8a4a,0xc03a3a][i]);
  [-4,4].forEach(x=>{L.d(x,8.6,0,1.6,.2,0x3a3a40);for(let i=0;i<6;i++){const a=i*1.05;L.c(x+Math.cos(a)*1.5,8.7,Math.sin(a)*1.5,.07,.5,0xf6f0d8);L.s(x+Math.cos(a)*1.5,9.4,Math.sin(a)*1.5,.1,.18,.1,0xffcf50)}L.c(x,8.6,0,.04,1.4,0x3a3a40)});
  sperrKasten(L.P(0,-5.4)[0],L.P(0,-5.4)[1],23,1.1,R);[-1,1].forEach(s=>sperrKasten(L.P(s*10.7,0)[0],L.P(s*10.7,0)[1],1.1,12,R));
  [-10,-6,-2,2,6,10].forEach(x=>kreis(L.P(x,5.4)[0],L.P(x,5.4)[1],.9));sperrKasten(L.P(0,0)[0],L.P(0,0)[1],14,2.6,R);
  [[-8,0],[-3,-3],[3,-3],[8,-1],[0,3.6]].forEach((p,i)=>{const q=L.P(p[0],p[1]);figK(q[0],q[1],R+i*1.5,[7,1,3,5,11][i],1.25,{umhang:i%2?0x3a5ea8:undefined})});
  flagge(L.P(-11.6,5.6)[0],9.8,L.P(-11.6,5.6)[1],6,0xc03a3a,0xf2f2ea,1.4);flagge(L.P(11.6,5.6)[0],9.8,L.P(11.6,5.6)[1],6,0x3a5ea8,0xf2f2ea,1.4);
  fackel(L.P(-8,8)[0],L.P(-8,8)[1],4);fackel(L.P(8,8)[0],L.P(8,8)[1],4);for(let i=0;i<3;i++)L.b(0,.2+i*.2,8-i*.8,14-i*.8,.4,1.2,0x9a948a)}
function ort5(){const bx=54,bz=-114,R=-Math.PI/2,L=LG(bx,bz,R),S=0xd8d0c0;
  L.b(0,3.6,0,8,7.2,11,S);L.b(0,.4,0,8.4,.8,11.4,0x9a948a);L.g(0,7.2,0,9,3.6,12,0x6f7680);L.g(0,7.2,0,9.06,3.2,10.8,S);
  L.c(0,0,-3.6,2.2,7.2,S,'cylT');L.k(0,7.2,-3.6,2.6,3.4,0x6f7680,'conT');L.b(0,11.2,-3.6,.2,1.4,.2,0xe0c040);L.b(0,11.6,-3.6,.9,.2,.2,0xe0c040);
  /* Turm vorn mit Glocke */
  L.b(0,6,4.4,3.4,12,3.4,S);L.b(0,.5,4.4,3.8,1,3.8,0x9a948a);L.k(0,12,4.4,2.4,3.4,0xb04a38,'conT');L.b(0,10.6,6.1,1.2,1.6,.12,0x2a2a3a);L.c(0,9.4,4.4,.5,.8,0xc8a02e,'cylT');
  [-1,1].forEach(s=>{L.b(s*4.05,3.8,-1,.12,3,1.2,0x3a4a8a);L.b(s*4.05,3.8,2,.12,3,1.2,0xb8a040)});L.b(0,2.2,6.2,1.7,3.6,.2,0x6b4524);
  for(let i=0;i<3;i++)L.b(0,.2+i*.2,7.4-i*.5,3.4-i*.4,.4,.8,0x9a948a);
  sperrKasten(bx,bz,8.6,11.4,R);{const q=L.P(0,4.4);kreis(q[0],q[1],2.8)}
  for(let i=0;i<8;i++){const q=L.P(-5.8+(i%2)*11.6,-4+Math.floor(i/2)*2.6);inst('blm',q[0],.4,q[1],.7,.5,.7,[0xe0605a,0xffd45e,0xf47ab0,0xffffff][i%4])}
  figK(L.P(-2.4,9.2)[0],L.P(-2.4,9.2)[1],R,2,1.25);figK(L.P(2.4,10)[0],L.P(2.4,10)[1],R+.3,11,1.2);fackel(L.P(-3,7.6)[0],L.P(-3,7.6)[1],3.4);fackel(L.P(3,7.6)[0],L.P(3,7.6)[1],3.4);
  pfadB(bx-8,bz+2);wetterhahn(scene,L.P(0,4.4)[0],15.4,L.P(0,4.4)[1])}
function ort6(){const bx=-50,bz=-142;scheibe(bx,bz,9,0x9acb6a,.08);pfadB(bx+10,bz);
  /* Rosenbeete, Kräuterspirale, Laube, Bänke, Springbrunnen */
  for(let r=0;r<4;r++){const z=bz-6+r*3.8;[-1,1].forEach(s=>{const x=bx+s*5.4;inst('box',x,.12,z,5,.24,1.7,0x5a3a22);for(let i=0;i<8;i++){const px=x-2+i*.58;inst('sph',px,.55,z,.38,.45,.38,0x3f8a3a);inst('blm',px,.9,z-.2+(i%2)*.4,.28,.24,.28,[0xe0302a,0xf47ab0,0xffffff,0xf0c030,0xd8302a][(i+r+(s>0?1:0))%5])}})}
  brunnen(bx,bz,.8,0x6ec0ea);
  {const L2=LG(bx,bz-9,0);[-2.2,2.2].forEach(s=>[-1.4,1.4].forEach(t=>L2.c(s,0,t,.12,3.4,0x6a4a2e)));L2.b(0,3.5,0,5,.14,3.2,0x6a4a2e);for(let i=0;i<8;i++){L2.b(-2.1+i*.6,3.2,0,.1,.1,3,0x6a4a2e);L2.s(-2.1+i*.6,3.4,1.4,.28,.28,.28,[0xe0302a,0xf47ab0][i%2])}[-1,1].forEach(s=>L2.s(s*2.2,2.2,1.4,.3,.3,.3,0xe0302a));kreis(bx-2.2,bz-10.4,.3);kreis(bx+2.2,bz-10.4,.3);kreis(bx-2.2,bz-7.6,.3);kreis(bx+2.2,bz-7.6,.3)}
  bankW(bx-8,bz,Math.PI/2);bankW(bx+3,bz-7.4,0);{const x=bx-3,z=bz+8;for(let i=0;i<5;i++)inst('cylT',x,.2+i*.35,z,2.2-i*.4,.4,2.2-i*.4,[0x9a948a,0x8a847a][i%2]);for(let i=0;i<10;i++)inst('blm',x+Math.cos(i*.9)*(1.4-i*.1),.6+i*.1,z+Math.sin(i*.9)*(1.4-i*.1),.22,.18,.22,[0xb06ae0,0xffd45e,0x8ad8a0,0xf47ab0][i%4]);kreis(x,z,2.2)}
  figK(bx+1,bz+4,2,5,1.2,{rock:0x4a8a5a,typ:'haube'});figK(bx-6,bz+4,.6,1,1.2);hecke(bx-9,bz-9,bx-9,bz+9,[bx-9,bz+4,2.5],0);hecke(bx-9,bz-9,bx+9,bz-9,null,1);hecke(bx-9,bz+9,bx+9,bz+9,null,2);
  for(let i=0;i<6;i++)falter(bx+Math.cos(i*1.1)*7,bz+Math.sin(i*1.1)*6,3,1.6+i%3*.4,i,[0xf6d030,0xffffff,0xf47ab0][i%3]);inst('conT',bx+7.6,.5,bz+7,.6,.9,.6,0xd8b050);inst('conT',bx+8.8,.5,bz+7.4,.6,.9,.6,0xd8b050);kreis(bx+8.2,bz+7.2,1.2)}
function ort7(){const bx=-22,bz=-110;scheibe(bx,bz,6.4,0xc8b890,.09);pfadB(bx+6,bz+2);
  fachwerk(bx-2,bz-4,6.6,5,0,{dach:0x8a5a3a,og:false,wand:0xe8d2a8});
  /* Greifvögel auf Block- und Bogenstangen (Falken, Habicht, Eule) */
  [[3.6,0,1.1],[5.4,2.2,1.4],[1.4,3.8,1.2],[-1.4,4.6,1.0],[6.4,-2.6,1.3]].forEach((p,i)=>{const x=bx+p[0],z=bz+p[1];inst('cyl',x,.8,z,.3,1.6,.3,0x7a5230);inst('cylT',x,1.7,z,.55,.14,.55,0x5a3a22);kreis(x,z,.55);const f=falkeSM(scene,p[2]);f.position.set(x,1.78,z);f.rotation.y=i*1.3;leben(f,i)});
  {const L2=LG(bx+8,bz-5,0);[-2,2].forEach(s=>L2.c(s,0,0,.16,3.6,0x6a4a2e));L2.b(0,3.6,0,4.4,.2,.2,0x6a4a2e);L2.b(0,2.6,0,3.6,.14,.14,0x6a4a2e);sperrKasten(bx+8,bz-5,4.6,.6,0);const e=falkeSM(scene,1.2);e.position.set(bx+7,2.7,bz-5);e.rotation.y=.3;leben(e,3);const e2=falkeSM(scene,1.3);e2.position.set(bx+9,2.7,bz-5);e2.rotation.y=-.5;leben(e2,5)}
  /* Falkner mit Falke auf dem Handschuh */
  {const f=figK(bx-1,bz+3.6,.4,2,1.3,{j:0x3a6a3a,typ:'hut',hut:0x4a3220,gurt:1});const k=falkeSM(scene,.9);k.position.set(bx+.4,3.4,bz+4.4);k.rotation.y=.9;leben(k,2)}
  falkeFlug(bx,bz,10,14,0,.5,1.6);falkeFlug(bx,bz,12,17,2.5,-.42,1.5);
  kistenI(bx-5.6,bz+2,2);korb(bx-3,bz+5.4,0xc8944a);fackel(bx+5,bz+5.6,3.4)}
function ort8(){const bx=24,bz=-110,R=0;scheibe(bx,bz,7,0xc8b890,.09);pfadB(bx-7,bz+2);
  steinbau(bx+1,bz-5,10,6,5.2,R,{stein:0xc8bca2,dach:0x8a3a2a,tor:false,s:true});
  {const L=LG(bx+1,bz-5,R);L.b(-2.4,7.2,-1.4,2.6,3.6,2.2,0x8a847a);L.c(-2.4,9,-1.4,.8,3,0x7a746a);L.b(0,2,3.04,1.8,3.6,.2,0x6b4524);rauch(scene,bx-1.4,12.6,bz-6.4)}
  /* Küchenhof unter Dach: Feuerstelle mit Kessel, Bratspieß, Tische, Köche */
  {const L=LG(bx-1,bz+3,R);[-3,3].forEach(s=>[-1.6,1.6].forEach(t=>L.c(s,0,t,.14,3.4,0x6a4a2e)));L.g(0,3.4,0,7.4,1.5,4.2,0xb04a38);
    L.b(0,.2,0,3,.4,2.2,0x7a746a);flamme(L.P(0,0)[0],.4,L.P(0,0)[1],.9);[-1.4,1.4].forEach(s=>L.b(s,1.3,0,.14,2.4,.14,0x3a3a40));
    const sp=grp(L.P(0,0)[0],1.8,L.P(0,0)[1]);const sl=grp(0,0,0,sp);cyl(.07,3.2,0x3a3a40,0,0,0,sl).rotation.z=Math.PI/2;sph(.55,0xc87a3a,0,0,0,sl,1.5,.9,.9);sph(.3,0xd89a50,1.0,0,0,sl);sph(.3,0xd89a50,-1.0,0,0,sl);vm(sl);bewegt(sl,t=>{sl.rotation.x=t*1.5});
    sperrKasten(bx-1,bz+3,7,4.4,R)}
  {const x=bx+8,z=bz+4;inst('sph',x,.9,z,1,.8,1,0x2a2a2e);inst('cylT',x,1.5,z,.6,.2,.6,0x6ab04a);kreis(x,z,1.1);rauch(scene,x,2,z);flamme(x,.1,z+.6,.5)}
  [[-5.4,6],[5.4,7]].forEach((p,i)=>{const L=LG(bx+p[0],bz+p[1],R);L.b(0,.95,0,3.4,.2,1.4,0x8a5a32);[-1.4,1.4].forEach(s=>L.b(s,.45,0,.2,.9,.2,0x6a4a2e));for(let k=0;k<7;k++)L.s(-1.2+k*.4,1.2,((k%2)-.5)*.5,.26,.26,.26,[0xd8302a,0x6ab04a,0xf0a830,0xc8944a][(k+i)%4]);sperrKasten(bx+p[0],bz+p[1],3.6,1.6,R)});
  figK(bx-2.6,bz+1,R+1.2,2,1.3,{typ:'hut',hut:0xf6f4ee,j:0xf6f4ee,schuerze:1});figK(bx+3.4,bz+1,R+3.5,5,1.25,{typ:'hut',hut:0xf6f4ee,j:0xf6f4ee,schuerze:1});figK(bx-5,bz+8.4,R+3,8,1.15);fassI(bx+9,bz-2,1);fassI(bx+10,bz-1,1);
  for(let i=0;i<4;i++){inst('cyl',bx-4+i*1.5,3.5,bz+.5,.03,1,.03,0x3a3a40);inst('cyl',bx-4+i*1.5,2.8,bz+.5,.14,.7,.14,[0xc8503a,0xa84a32][i%2])}}
function ort9(){const bx=-52,bz=-114;scheibe(bx,bz,10,0xc8b890,.09);pfadB(bx+10,bz);
  /* Stall mit Boxen (offene Fronten), Reitplatz mit Sprunghindernissen, Pferde */
  {const L=LG(bx-1,bz-6,0);L.b(0,2,0,15,4,5.2,0x8a6238);for(let i=0;i<6;i++){L.b(-6+i*2.4,1.6,2.64,1.7,3.2,.12,0x3a2a1a);L.b(-6+i*2.4,3.4,2.64,.1,.1,.2,0x4a3220)}L.g(0,4,0,16,2.4,6.2,0x7a5a3a);sperrKasten(bx-1,bz-6,15.4,5.6,0)}
  inst('cylT',bx+1,.05,bz+4,7.6,.1,7.6,0xe0cc98);ringI(bx+1,bz+4,8,Math.PI/2,3.6,0x8a6a42);
  [[-3.6,4.4,0],[0,2.6,.5],[3.6,5.6,-.4]].forEach((p,i)=>{const x=bx+1+p[0],z=bz+p[1];inst('cyl',x-1.4,.7,z,.1,1.4,.1,0xf2f2ea);inst('cyl',x+1.4,.7,z,.1,1.4,.1,0xf2f2ea);inst('box',x,.8,z,2.8,.1,.1,0xc03a3a,p[2]);inst('box',x,.4,z,2.8,.1,.1,0xf2f2ea,p[2]);kreis(x-1.4,z,.2);kreis(x+1.4,z,.2)});
  [pferd1,pferd2,pferd3,pferd4].forEach((fn,i)=>{const p=fn(scene);p.position.set(bx+1+(i-1.5)*2.6,0,bz+7.2-(i%2)*2.6);p.rotation.y=i*1.8;p.scale.setScalar(1.4);lebendig.push({o:p,ph:i*1.3});kreis(p.position.x,p.position.z,1.4)});
  /* Reiterin auf dem Pferd */
  {const p=pferd2(scene);p.position.set(bx-6,0,bz+8);p.rotation.y=Math.PI/2;p.scale.setScalar(1.4);lebendig.push({o:p,ph:1});kreis(bx-6,bz+8,1.4);const q=Object.assign({},KOST[1],{rock:undefined,schuerze:0}),f=kostFig(q,null,1.0);f.m.g.rotation.y=0;f.w.position.set(bx-6,2.5,bz+8);f.w.rotation.y=Math.PI/2;f.m.bl.rotation.x=0;vmVerschm(f.m.g);vmVerschm(f.w)}
  /* Sattelständer, Heu, Tröge, Stallknecht */
  {const L=LG(bx+8,bz-3,0);L.b(0,.9,0,2.6,.14,.14,0x6a4a2e);[-1.2,1.2].forEach(s=>L.b(s,.45,0,.14,.9,.14,0x6a4a2e));L.b(0,1.2,0,1.2,.4,.7,0x8a4a2a);L.b(-.7,1.0,0,.4,.6,.7,0x8a4a2a);kreis(bx+8,bz-3,1.4)}
  heuI(bx-12,bz-8,1.2);heuI(bx-10,bz-9,1);trog(bx+9,bz+8,0,0x4aa5d4);trog(bx-9,bz+2,1.57,0x8a6a42);figK(bx+4,bz-1,1.2,3,1.25,{typ:'hut',hut:0x8a5a32});fackel(bx+10,bz+1,3.6)}

/* ==================== Turnierplatz und Zeltlager (Orte 10 und 38) ==================== */
function reiter(x,z,rot,fn,k,banner){const p=fn(scene);p.position.set(x,0,z);p.rotation.y=rot;p.scale.setScalar(1.4);lebendig.push({o:p,ph:k});kreis(x,z,1.5);
  const f=kostFig(Object.assign({},KOST[6],{umhang:banner[0],fed:banner[1],kragen:0xb0b8c0}),null,1.05);f.m.g.rotation.y=0;f.w.position.set(x,2.55,z);f.w.rotation.y=rot;vmVerschm(f.m.g);vmVerschm(f.w);
  const g=grp(x,0,z);g.rotation.y=rot;cyl(.07,5.4,0x6a4a2e,.4,2.7,.9,g,true);box(1.5,1.1,.08,banner[0],1.2,4.9,.9,g);box(1.5,.3,.1,banner[1],1.2,4.9,.9,g);sph(.14,0xe0c040,.4,5.55,.9,g);
  const dk2=box(1.9,1.6,.06,banner[0],.0,1.7,1.42,g);box(1.9,.4,.08,banner[1],0,1.7,1.44,g);vm(g)}
function ort10(){const bx=120,bz=-138;pfad(bx-13,bz+4,138,bz+10,3.2);scheibe(bx,bz,16,0x9ccb66,.08);
  /* Turnierbahn aus Sand mit Schranke in der Mitte (Zaun, zwei Zugänge) */
  {const L=LG(bx,bz,0);L.b(0,.05,0,30,.1,9.4,0xe0cc98);[-1,1].forEach(s=>{inst('box',bx,.8,bz+s*4.9,31,.12,.1,0x8a6a42);inst('box',bx,.4,bz+s*4.9,31,.12,.1,0x8a6a42);sperrLinie(bx-15.5,bz+s*4.9,bx-2.4,bz+s*4.9,.2);sperrLinie(bx+2.4,bz+s*4.9,bx+15.5,bz+s*4.9,.2);for(let i=-7;i<=7;i++)if(Math.abs(i*2.1)>2.2)inst('box',bx+i*2.1,.65,bz+s*4.9,.2,1.3,.2,0x8a6a42)});
    sperrLinie(bx-15.5,bz-4.9,bx-15.5,bz+4.9,.2);sperrLinie(bx+15.5,bz-4.9,bx+15.5,bz+4.9,.2);inst('box',bx-15.5,.65,bz,.2,1.3,9.8,0x8a6a42);inst('box',bx+15.5,.65,bz,.2,1.3,9.8,0x8a6a42);
    inst('box',bx,.7,bz,28,.12,.2,0xc03a3a);inst('box',bx,1.0,bz,28,.12,.2,0xf2f2ea);for(let i=-6;i<=6;i++)inst('box',bx+i*2.3,.5,bz,.2,1,.2,0x6a4a2e);sperrLinie(bx-14,bz,bx+14,bz,.3)}
  /* Zwei Tribünen mit Dach, Zuschauern und Fahnen */
  [-1].forEach((s,k)=>{const z=bz+s*11.2,L=LG(bx,z,s>0?0:Math.PI);for(let i=0;i<4;i++)L.b(0,.6+i*.6,-.6-i*.9,18,1.2+i*1.2,1.2,[0x8a6238,0x9a7040][i%2]);L.b(0,.3,.9,18.6,.6,.6,0x7a5230);[-8.6,8.6].forEach(x=>L.c(x,0,-3.6,.18,6.4,0x6a4a2e));for(let i=0;i<9;i++)L.b(-8+i*2,6.6,-1.8,2.02,.12,5.6,i%2?0xf2f2ea:[0xc03a3a,0x3a5ea8][k],.35);
    sperrKasten(bx,z-s*.6,18.6,4.6,s>0?0:Math.PI);for(let i=0;i<6;i++){const q=L.P(-7+i*2.8,-1.8-(i%3)*.9);figK(q[0],q[1],s>0?0:Math.PI,(i+k*4)%12,.95)}flagge(L.P(-9,.6)[0],0,L.P(-9,.6)[1],7.6,[0xc03a3a,0x3a5ea8][k],0xe8b830,1.3);flagge(L.P(9,.6)[0],0,L.P(9,.6)[1],7.6,[0x3a5ea8,0xc03a3a][k],0xe8b830,1.3)});
  /* Stechpuppe aus Stroh (dreht sich) */
  {const x=bx+6,z=bz+8.2;inst('cyl',x,2.4,z,.18,4.8,.18,0x6a4a2e);const g=grp(x,4.4,z);box(3,.18,.18,0x6a4a2e,0,0,0,g);sph(.6,0xd8b848,-1.2,-.5,0,g,.9,1.3,.7);sph(.3,0xe8d070,-1.2,.35,0,g);box(.1,1,.9,0x3a5ea8,-1.8,-.5,0,g);sph(.35,0xd8b848,1.4,-.8,0,g);vm(g);bewegt(g,t=>{g.rotation.y=Math.sin(t*.8)*1.2});kreis(x,z,.5)}
  /* Fähnchen-Stangen entlang der Bahn, Wappenzelte, Pferde mit Reitern (Banner) */
  for(let i=0;i<10;i++){const x=bx-14+i*3.1;flagge(x,0,bz-6.4,3.4,KOLOR[i%6],KOLOR[(i+2)%6],.9)}
  zelt(bx-12,bz-19,6.4,5,4.6,Math.PI,0xc03a3a,0xf2f2ea);zelt(bx+12,bz-19,6.4,5,4.6,Math.PI,0x3a5ea8,0xf2f2ea);ritterFig(bx-8,bz+9.6,0,6,0xc03a3a,0xf2f2ea);ritterFig(bx+11,bz+9.6,0,6,0x3a5ea8,0xe8b830);for(let i=0;i<6;i++)flagge(bx-12+i*4.8,0,bz+6.4,2.6,KOLOR[(i+1)%6],KOLOR[(i+3)%6],.8);
  reiter(bx-10,bz-1.6,0,pferd1,1,[0xc03a3a,0xf2f2ea]);reiter(bx+10,bz+1.6,Math.PI,pferd2,2,[0x3a5ea8,0xe8b830]);
  /* Herold mit Trompete, Fürstenloge, Helfer */
  figK(bx-2,bz-8.4,0,6,1.3,{umhang:0xe8b830,typ:'krone'});{const g=grp(bx-2.4,3.4,bz-7.4);cone(.35,2.4,0xe0c040,0,0,.6,g).rotation.x=Math.PI/2;cyl(.07,1.6,0xe0c040,0,0,-.6,g).rotation.x=Math.PI/2;vm(g)}
  figK(bx+3,bz+7.6,3,3,1.2);figK(bx-6,bz+7.2,1,8,1.2);[[-15,-12],[15,-12],[-15,12],[15,12]].forEach(p=>baum(bx+p[0],bz+p[1],p[0]>0?0:5,1.1));
  for(let i=0;i<8;i++){const a=i*.8;blumeI(bx-14+Math.cos(a)*3,bz-14+Math.sin(a)*2,i%6)}}
function ort38(){const bx=-118,bz=-138;pfad(bx+12,bz+4,-136,bz-6,3.2);scheibe(bx,bz,14,0x9ccb66,.08);
  /* Fünf Zelte (gestreift) um die Feuerstelle, Banner, Rüstungsständer, Feldküche */
  [[-9,-7,0,0xc03a3a],[8,-8,.4,0x3a5ea8],[-10,6,-.3,0xe8b830],[9,7,-.5,0x3a8a4a],[0,-12,0,0x8a4a9a]].forEach((p,i)=>{zelt(bx+p[0],bz+p[1],6.6,5.2,4.8,p[2]+(i===4?0:Math.atan2(-p[0],p[1])*.0),p[3],0xf2f2ea);flagge(bx+p[0],4.8,bz+p[1],3.6,p[3],0xf2f2ea,1.2)});
  {const x=bx,z=bz;for(let i=0;i<8;i++)inst('sph',x+Math.cos(i*.785)*1.3,.3,z+Math.sin(i*.785)*1.3,.4,.3,.4,0x7a7a80);flamme(x,.3,z,1.1);rauch(scene,x,3,z);kreis(x,z,1.6);[[-3.4,0],[3.4,0],[0,-3.4]].forEach((p,i)=>{inst('cylT',x+p[0],.4,z+p[1],.6,.8,.6,0x8a5a32);kreis(x+p[0],z+p[1],.7)})}
  [[-5,3],[5,-3]].forEach((p,i)=>{const x=bx+p[0],z=bz+p[1],L=LG(x,z,i*.8);L.b(0,.2,0,1.8,.4,.8,0x6a4a2e);L.b(0,1.4,0,.12,2.2,.12,0x6a4a2e);L.b(0,1.9,0,1.5,.3,.3,0x6a4a2e);L.c(0,.9,0,.5,1.2,0x9aa2ac);L.s(0,2.5,0,.45,.5,.45,0x9aa2ac);L.b(0,2.45,.38,.4,.1,.1,0x5a626c);L.c(-.9,1.4,0,.18,1,0x9aa2ac);L.c(.9,1.4,0,.18,1,0x9aa2ac);kreis(x,z,1)});
  /* Feldküche: Kessel, Tisch */
  {const x=bx+4,z=bz+11;inst('sph',x,1.4,z,.9,.7,.9,0x2a2a2e);[-1,1].forEach(s=>inst('cyl',x+s*.8,.9,z,.07,1.8,.07,0x3a3a40));inst('cylT',x,2.0,z,.7,.1,.7,0x6ab04a);flamme(x,.1,z,.7);kreis(x,z,1.1);const L=LG(x-5,z,0);L.b(0,.95,0,3.4,.2,1.4,0x8a5a32);[-1.4,1.4].forEach(s=>L.b(s,.45,0,.2,.9,.2,0x6a4a2e));for(let k=0;k<5;k++)L.s(-1.2+k*.6,1.2,0,.25,.25,.25,[0xd8302a,0xc8944a,0x6ab04a][k%3]);sperrKasten(x-5,z,3.6,1.6,0)}
  /* Pferde an der Leine, Knappen, Heu, Wagen, Kisten */
  [pferd1,pferd3,pferd4].forEach((fn,i)=>{const p=fn(scene);p.position.set(bx-12+i*3,0,bz+12.4);p.rotation.y=Math.PI/2+i*.2;p.scale.setScalar(1.4);lebendig.push({o:p,ph:i});kreis(p.position.x,p.position.z,1.4)});inst('box',bx-9,.9,bz+13.8,12,.1,.1,0x6a4a2e);for(let i=0;i<5;i++)inst('cyl',bx-14+i*3,.8,bz+13.8,.12,1.6,.12,0x6a4a2e);
  [[-3,-3,0,6],[2,4,2.4,3],[-4,8,1,5],[7,-1,3.9,8]].forEach((p,i)=>figK(bx+p[0],bz+p[1],p[2],p[3],i%2?.95:1.25,i===0?{umhang:0xc03a3a}:undefined));
  ritterFig(bx-13,bz-3,1.6,6,0xc03a3a,0xf2f2ea);ritterFig(bx+13,bz+2,-1.6,6,0x3a8a4a,0xe8b830);
  karren(bx+12,bz-8,.4,'heu');heuI(bx-4,bz-14);heuI(bx-2,bz-14.4);kistenI(bx+6,bz-14,3);fassI(bx+14,bz-4,1);fassI(bx+15,bz-3,1);
  [[-13,-12],[13,-13],[-14,12],[14,12]].forEach((p,i)=>baum(bx+p[0],bz+p[1],i%2?0:2,1.1))}

/* ==================== Kulisse: Hügel und Wald rundum (fest, außerhalb der Welt) ==================== */
function huegel(x,z,R,H,k){const c=[0x5f9a46,0x6aa84e,0x558e40,0x74b056][k%4];inst('sph',x,H*.2,z,R,H*.8,R*1.1,c);inst('blm',x+R*.2,H*.6,z-R*.1,R*.62,H*.4,R*.6,[0x68a84c,0x5a9a44][k%2]);
  for(let i=0;i<5;i++){const a=i*1.3+k;inst('con',x+Math.cos(a)*R*.5,H*.34+(i%3)*H*.1,z+Math.sin(a)*R*.5,R*.16,H*.38,R*.16,0x2f6a3a)}}
function kulisse(){
  for(let x=-330,i=0;x<=330;x+=46,i++){huegel(x,-285-(i%3)*18,46+(i*7)%16,38+(i*13)%34,i);huegel(x+18,-250-(i%2)*10,34,26+(i*11)%18,i+1)}
  for(let x=-330,i=0;x<=330;x+=50,i++){if(Math.abs(x)<50)continue;huegel(x,205+(i%3)*16,40+(i*5)%14,26+(i*9)%24,i)}
  for(let z=-250,i=0;z<=190;z+=44,i++){huegel(-232-(i%3)*12,z,42+(i*7)%14,36+(i*11)%28,i);huegel(232+(i%3)*12,z+10,42+(i*5)%14,34+(i*13)%28,i+2)}
  /* Ferne Berge */
  for(let x=-340,i=0;x<=340;x+=70,i++)inst('con',x,60+(i%3)*14,-380-(i%2)*30,70,120+(i%3)*28,70,[0x8a9ab0,0x7a8aa4,0x9aaabe][i%3],i);
  /* Burgruine in der Ferne */
  inst('cylT',-250,24,-190,6,48,6,0x9a948a);inst('conT',-250,52,-190,7.4,10,7.4,0x8a3a2a);inst('box',-236,16,-190,14,32,10,0x9a948a);
  /* Rand der Welt: dichter Bewuchs hinter den Grenzen */
  for(let z=-232;z<146;z+=5)[[-179,-172],[172,179]].forEach(rg=>{const x=rg[0]+nr()*(rg[1]-rg[0]);baum(x,z+nr()*4,[0,2,0,5][Math.floor(nr()*4)],1.2+nr()*.8)});
  for(let x=-170;x<=170;x+=6)[[-236,-229],[142,147]].forEach(rg=>{if(Math.abs(x)<14&&rg[0]<0)return;baum(x+nr()*3,rg[0]+nr()*(rg[1]-rg[0]),[0,2,5][Math.floor(nr()*3)],1.2+nr()*.6)})}

/* ==================== Etappe 4: Bewuchs, Stadtviertel, Kleinteile ==================== */
const inTown=(x,z)=>x>-116&&x<116&&z>-76&&z<64,inBurg=(x,z)=>x>-84&&x<84&&z>-190&&z<-83;
function sgRect(x0,z0,x1,z1){for(let x=x0;x<=x1;x+=2)for(let z=z0;z<=z1;z+=2)sgMark(x,z,1.2)}
function etappe4(){
  WEGE.forEach(s=>s.forEach((q,i)=>{if(i%2===0)sgMark(q[0],q[1],4.8)}));EXTRAZONEN.forEach(e=>sgMark(e.x,e.z,e.r+2.5));
  sgMark(0,120,22);sgMark(0,90,14);sgMark(FEST.x,FEST.z,28);for(let z=TORZ-30;z<TORZ+12;z+=2)sgMark(0,z,7);sgMark(0,-188,10);
  sgRect(-84,-190,84,-84);sgMark(27,8,9);sgMark(-22,10,9);sgMark(0,60,10);sgMark(44,38,8);sgMark(-37,21,8);sgMark(0,-70,9);sgMark(86,-42,8);sgMark(54,-106,8);
  /* Stadtviertel: Bürgerhäuser, die zur nächsten Gasse schauen */
  (function(){const RD=[44,-8,-58];let n=0;
    for(let x=-104;x<=104;x+=9)for(let z=-70;z<=56;z+=8.5){const jx=x+((x*7+z*3)%5)-2,jz=z+((x*5+z*11)%4)-1.5;if(!inTown(jx,jz)||Math.abs(jx)>106||jz>56||jz<-68)continue;
      const w=5.8+((jx*3+jz)%3+3)%3*.9,d=5+((jx+jz*2)%3+3)%3*.7,m=Math.max(w,d)/2+1.2;
      if(!frei(jx,jz)||!frei(jx-m,jz)||!frei(jx+m,jz)||!frei(jx,jz-m)||!frei(jx,jz+m)||!thFrei(jx,jz,9.6))continue;
      let br=RD[0],bd=1e9;RD.forEach(r=>{const dd=Math.abs(jz-roadZ(jx,r));if(dd<bd){bd=dd;br=r}});const rot=roadZ(jx,br)>jz?0:Math.PI;
      const hh=fachwerk(jx,jz,w,d,rot,{og:((n*7)%5)<3,dach:DACH[n%7],s:Math.abs(jx)>60});thSet(jx,jz);sgMark(jx,jz,m+.6);n++;if(n%8===0){const q=hh.L.P(w*.28,-hh.dO*.16);rauch(scene,q[0],hh.H+hh.hr+1.3,q[1])}}
    n=0;for(let x=-100;x<=100;x+=14)for(let z=-66;z<=52;z+=12){const jx=x+((x*3+z)%7)-3,jz=z+((x+z*5)%5)-2;if(!inTown(jx,jz)||!frei(jx,jz)||!thFrei(jx,jz,6)||Math.abs(jx-gx(jz))<7)continue;n++;if(n%3===0)baum(jx,jz,n%2?0:5,.8);else if(n%3===1)busch(jx,jz,.9,0x5a8a3a);else {blumeI(jx,jz);blumeI(jx+.8,jz+.4)}thSet(jx,jz)}})();
  /* Straßenlaternen (Fackeln) in der Stadt und an den Wegen */
  for(let z=52;z>-70;z-=15){if(EXTRAZONEN.some(e=>e.r<20&&Math.hypot(gx(z)-e.x,z-e.z)<e.r+3))continue;fackel(gx(z)+4.2,z,3.6);fackel(gx(z)-4.2,z-7,3.6)}
  /* Bewuchs im Land */
  const ausser=(x,z)=>!inTown(x,z)&&!inBurg(x,z);
  /* Alleen am Weg im Süden */
  for(let z=104;z>74;z-=8){baum(gx(z)+6.4,z,0,1.2);baum(gx(z)-6.4,z-3,0,1.2)}
  /* Waldstücke */
  [[-160,-100,16,46],[-166,-165,14,40],[-166,66,10,30],[-165,130,14,34],[160,-100,14,38],[166,-162,14,36],[168,40,10,26],[160,128,16,36],[-120,-186,12,20],[120,-186,12,20],[0,142,10,16]].forEach(w=>{for(let i=0;i<w[3];i++){const a=nr()*6.28,d=Math.sqrt(nr())*w[2],x=w[0]+Math.cos(a)*d,z=w[1]+Math.sin(a)*d;if(!frei(x,z)||!thFrei(x,z,4.6))continue;baum(x,z,[0,2,2,5,1][Math.floor(nr()*5)],.9+nr()*.7);thSet(x,z)}});
  zuf((x,z)=>{if(thFrei(x,z,10)){baum(x,z,[0,5,1][Math.floor(nr()*3)],.9+nr()*.6);thSet(x,z)}},70,ausser);
  zuf((x,z)=>{if(thFrei(x,z,7)){busch(x,z,.8+nr()*.7,[0x5a8a3a,0x4f7f34,0x68943c][Math.floor(nr()*3)]);thSet(x,z)}},180,ausser);
  zuf((x,z)=>gras(x,z,.5+nr()*.7),3300,ausser);zuf((x,z)=>blumeI(x,z),900,ausser);zuf((x,z)=>{inst('sph',x,.12,z,.7,.18,.6,0x4a8a3a);gras(x+.3,z+.2,.7);gras(x-.3,z-.2,.6)},260,ausser);
  zuf((x,z)=>{if(thFrei(x,z,5)){fels(x,z,.9+nr()*1.4);thSet(x,z)}},26,ausser);zuf((x,z)=>steinhaufen(x,z,1),40,ausser);zuf((x,z)=>heuI(x,z,.9),12,ausser);
  /* Felder und Weiden im Land (begehbar) */
  [[-130,66,22,12,.1,0],[-96,64,20,12,0,1],[-60,66,16,10,.05,2],[134,100,22,14,.1,0],[-150,94,14,10,0,1],[40,86,18,10,.15,3],[-80,84,18,8,0,1]].forEach(f=>{const c=[[0xdcb94a,0xe6c85c],[0x9ac24a,0xaed25a],[0x6ab04a,0x7ac05a],[0xc8a040,0xd8b44a]][f[5]];if(frei(f[0],f[1])&&frei(f[0]+f[2]/2-2,f[1])&&frei(f[0]-f[2]/2+2,f[1]))acker(f[0],f[1],f[2],f[3],f[4],c)});
  /* Kühe auf der Weide am Fluss (Westen), Zaun mit Lücke */
  (function(){const cx=-152,cz=44;ringI(cx,cz,8,0,4,0x8a6a42);for(let i=0;i<4;i++){const k=kuh(scene);k.position.set(cx+Math.cos(i*1.7)*3.4,0,cz+Math.sin(i*1.7)*3.4);k.rotation.y=i*1.9;k.scale.setScalar(1.5);lebendig.push({o:k,ph:i});kreis(k.position.x,k.position.z,1.2)}})();
  /* Weiden mit Ziegen im Osten */
  (function(){const cx=116,cz=70;if(!frei(cx,cz))return;ringI(cx,cz,7,Math.PI,3.6,0x8a6a42);for(let i=0;i<4;i++){const k=ziege(scene);k.position.set(cx+Math.cos(i*1.7)*3,0,cz+Math.sin(i*1.7)*3);k.rotation.y=i*1.9;k.scale.setScalar(1.5);lebendig.push({o:k,ph:i});kreis(k.position.x,k.position.z,.8)}})();
  /* Ufer: Schilf, Weiden, Steine */
  RIO.forEach((q,i)=>{if(i%1!==0)return;[-1,1].forEach(s=>{const z=q[1]+s*(RW/2+1.6);for(let k=0;k<5;k++){const x=q[0]+(k-2)*3.4+nr()*2;const zz=z+s*nr()*1.4;if(Math.abs(x-gx(76))<8||Math.abs(x+138)<8||Math.abs(x-138)<8)continue;for(let m=0;m<4;m++)inst('cyl',x+m*.3,.9,zz,.04,1.8+nr()*.6,.04,0x4a8a3a);if(k===0&&nr()<.5)inst('sph',x+1,.2,zz,.6,.35,.5,0x8d9097)}})});
  [[-60,88],[40,88],[-100,66],[90,88],[-20,66],[60,66]].forEach((p,i)=>{if(frei(p[0],p[1]))baum(p[0],p[1],3,1.4)});
  /* Kleinteile an den Landstraßen */
  SEITENWEGE.forEach((r,ri)=>{for(let x=-146;x<=146;x+=17){if(Math.abs(x-gx(r))<12||inTown(x,roadZ(x,r)))continue;const z=roadZ(x,r),side=((Math.round(x/17)+ri)%2)?1:-1,zz=z+side*4.4;if(!frei(x,zz)&&!sgFrei(x,zz+side*3))continue;const f=Math.round(x/17+ri*3)%8;
    if(f===0)bank(x,zz,side>0?Math.PI:0);else if(f===1)fassI(x,zz,1);else if(f===2)kistenI(x,zz,3);else if(f===3)heuI(x,zz);else if(f===4)holzstapel(x,zz,.4);else if(f===5)fackel(x,zz,3.6);else if(f===6)karren(x,zz,side*1.2,'heu');else{kuebel(x,zz)}}});
  /* Ringwege: Bänke, Wegkreuze, Fackeln */
  [[-137,1],[137,-1]].forEach(rw=>{for(let z=90;z>-174;z-=19){const x=rw[0]+rw[1]*(-3.6)+Math.sin(z*.04)*3,f=Math.round(z/19)%4;if(EXTRAZONEN.some(e=>e.r<20&&Math.hypot(x-e.x,z-e.z)<e.r+3)||inTown(x,z))continue;if(f===0)bankW(x,z,rw[1]>0?Math.PI/2:-Math.PI/2);else if(f===1)fackel(x,z,3.6);else if(f===2)fassI(x,z,1);else heuI(x,z)}});
  /* Gruppen von Schafen (frei) auf der Wiese im Süden */
  [[-20,138],[24,138]].forEach(p=>{for(let i=0;i<3;i++){const s=schaf(scene);s.position.set(p[0]+Math.cos(i*2.1)*3,0,p[1]+Math.sin(i*2.1)*2.4);s.rotation.y=i*1.7;s.scale.setScalar(1.55);lebendig.push({o:s,ph:i});kreis(s.position.x,s.position.z,.9)}});
  /* Burg: Nebengebäude, Hecken, Kleinteile im Hof */
  [[-26,-160,8,6,0],[26,-166,8,6,Math.PI],[-62,-100,6,5,.3],[62,-130,6,5,-1.57],[-62,-128,6,5,1.57]].forEach((p,i)=>fachwerk(p[0],p[1],p[2],p[3],p[4],{og:i%2===0,dach:0x8a5a3a,wand:0xd8d0c0,s:true}));
  [[-30,-128],[-34,-100],[30,-170],[-16,-170],[60,-172],[-60,-172],[28,-128]].forEach((p,i)=>{if(i%2)kistenI(p[0],p[1],3);else fassI(p[0],p[1],1);});
  [[165,100,14],[110,-100,13],[120,-118,9],[150,0,13],[-150,-10,8]].forEach((w,i)=>{wiese(w[0],w[1],w[2],55,.45);for(let k=0;k<5;k++){const a=k*1.3+i,x=w[0]+Math.cos(a)*w[2]*.6,z=w[1]+Math.sin(a)*w[2]*.6;if(!frei(x,z))continue;if(k%2)heuI(x,z,.9);else busch(x,z,1,0x5a8a3a);if(k===3)steinhaufen(x+2,z,1)}});
  [[-90,-8],[-96,-12],[-84,-4]].forEach((p,i)=>{if(i===0){fassI(p[0],p[1],1);fassI(p[0]+1.2,p[1]+.4,1)}else if(i===1)kistenI(p[0],p[1],3);else karren(p[0],-1,.5,'kohl')});for(let i=0;i<4;i++){const h=huhn(scene);h.position.set(-92+i*1.4,0,-9+(i%2));h.rotation.y=i*1.7;h.scale.setScalar(1.3);lebendig.push({o:h,ph:i});kreis(h.position.x,h.position.z,.35)}[[-94,-2],[-86,-12]].forEach((p,i)=>{inst('box',p[0],.4,p[1],1.4,.5,.6,0x7a4a2e);inst('blm',p[0],.8,p[1],.4,.35,.35,[0xe0504a,0xf47ab0][i])});
  fassI(20,-161,1);kistenI(23,-159,3);heuI(17,-163,1);fassI(9,121,1);kistenI(-9,122,2);heuI(12,123,.9);
  /* Kleine Hügel mit Bäumen vor der Welt, damit die Ränder lebendig wirken */
  [[-172,100,9,8],[172,90,10,9],[-172,-10,10,9],[172,-20,9,8],[-172,-120,10,9],[172,-130,10,10]].forEach((h,i)=>{huegel(h[0],h[1],h[2],h[3],i);kreis(h[0],h[1],h[2]*.85)})}

/* ==================== Etappe 5: Bewegung, Besucher ==================== */
function kutsche(par,ladung,pfn){const g=grp(0,0,0,par);const p=pfn(g);p.position.set(2.8,0,0);p.scale.setScalar(1.4);const L=grp(-1.4,0,0,g);box(3.8,.3,2,0x8a5a32,0,1.15,0,L,true);[-1,1].forEach(s=>{cyl(.85,.2,0x6a4a2e,-.9,.85,s*1.15,L).rotation.x=Math.PI/2;cyl(.85,.2,0x6a4a2e,.9,.85,s*1.15,L).rotation.x=Math.PI/2;box(3.8,.7,.12,0x8a5a32,0,1.6,s*.95,L)});box(.12,.7,2,0x8a5a32,-1.9,1.6,0,L);
  if(ladung==='heu')sph(1,0xd8b848,0,2.2,0,L,1.8,.9,1.1);else if(ladung==='faesser'){cyl(.5,.9,0x8a5a32,-.7,1.8,0,L);cyl(.5,.9,0x8a5a32,.7,1.8,0,L)}else if(ladung==='kohl'){for(let i=0;i<7;i++)sph(.42,0x6ab04a,-1.2+i*.4,1.7+(i%2)*.3,(i%3-1)*.4,L)}else{box(2.4,1.8,1.8,0xe8dcc0,0,2.2,0,L);const c=new THREE.Mesh(new THREE.CylinderGeometry(.95,.95,2.6,10,1,false,0,Math.PI),mat(0xf0e8d0));c.rotation.z=Math.PI/2;c.position.y=3.1;L.add(c)}
  const f=kostFig(KOST[0],g,1.1);f.m.g.rotation.y=0;f.w.position.set(.2,1.35,0);f.w.rotation.y=1.57;vmVerschm(f.m.g);vmVerschm(f.w);vmVerschm(L);
  const an=p.userData.anim;g.userData.anim=t=>{if(an)an(t)};return g}
function falkeFl(par,sk){const g=grp(0,0,0,par);sph(.25,0x7a5a3a,0,0,0,g,2.1,.55,.65);sph(.17,0x7a5a3a,.5,.1,0,g);sph(.12,0xf0e4c8,.42,.0,0,g,1,.8,1);cone(.05,.14,0xe0c040,.68,.06,0,g).rotation.z=-Math.PI/2;[-1,1].forEach(z=>sph(.03,0x111111,.6,.16,z*.09,g));box(.7,.04,.38,0x4a3220,-.75,-.02,0,g);
  const w=[-1,1].map(s=>{const p=grp(0,.05,s*.16,g);box(.55,.03,.6,0x6a4a2e,.0,0,s*.3,p).rotation.y=s*.25;box(.4,.03,.7,0x3a2a1c,-.25,0,s*.8,p).rotation.y=s*.45;return p});g.scale.setScalar(sk||1);
  g.userData.anim=t=>{g.position.y=Math.sin(t*1.5)*.15;w[0].rotation.x=Math.sin(t*5)*.5;w[1].rotation.x=-Math.sin(t*5)*.5};return vm(g,w[0],w[1])}
function etappe5(){
  /* ---- Wolken ---- */
  for(let i=0;i<9;i++){const g=grp(0,50+nr()*16,0);for(let k=0;k<2;k++)sph(1,0xffffff,(k-.5)*4+nr()*2,nr()*1.5,(nr()-.5)*4,g,5+nr()*2,2+nr(),3+nr()*2);const x0=nr()*700,z=-230+nr()*400,v=1.2+nr()*1.4;bewegt(g,t=>{g.position.x=((x0+t*v)%700+700)%700-350;g.position.z=z})}
  /* ---- Tauben und Falken am Himmel ---- */
  [[-60,100,24,12,0,.36],[50,90,20,13,2,.3],[0,20,30,14,3,.25],[-110,0,22,12,4,.34],[110,-10,20,13,1,.32],[-40,-60,24,12,2.6,.3],[60,-80,26,14,5,.28],[0,-130,30,15,1.4,.27]].forEach(f=>flieger(f[0],f[1],f[2],f[3],f[4],f[5],0x8a8d92,0xf2f2f2));
  [[-80,40,50,22,0,.12],[80,-40,56,24,2,.1],[0,-120,60,26,4,.09],[-110,-100,40,20,1,.13]].forEach(a=>falkeFlug(a[0],a[1],a[2],a[3],a[4],a[5],1.9));
  /* ---- Wege für Spaziergänger ---- */
  const sp=(pts,f)=>spl(pts,2.5).filter(f),hw=z0=>sp(Array.from({length:40},(_,i)=>[gx(140-i*10),140-i*10]),q=>q[1]<=z0[0]&&q[1]>=z0[1]),rd=(r,x0,x1)=>sp(strasse(r,x0,x1),q=>q[0]>=x0&&q[0]<=x1);
  const rW=spl([[-136,94],[-140,60],[-134,20],[-138,-20],[-134,-58],[-140,-84],[-138,-110],[-142,-150],[-138,-176]],2.5),rO=spl([[136,94],[140,62],[134,20],[138,-20],[134,-58],[140,-84],[138,-110],[142,-150],[138,-176]],2.5);
  const routen=[[hw([132,90]),1.2],[hw([70,30]),1.2],[hw([54,-6]),1.2],[hw([-6,-40]),1.2],[hw([-40,-72]),1.2],[hw([-100,-130]),1.2],[hw([-130,-176]),1.2],[rd(94,-130,-14),1.3],[rd(94,14,130),1.3],[rd(44,-104,-14),1.3],[rd(44,14,104),1.3],[rd(-8,-104,-14),1.3],[rd(-8,14,104),1.3],[rd(-58,-104,-14),1.3],[rd(-58,14,104),1.3],[rd(-80,-130,-14),1.3],[rd(-80,14,130),1.3],[rW,1.1],[rO,1.1],[rd(44,-146,-116),1.2],[rd(-8,116,146),1.2]];
  let k=0;routen.forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);const anz=i<7?2:(i%3?1:2);for(let j=0;j<anz;j++){lauf(B,2+((k+j)%3)*.4,j*2.1+i,k*5+j*3+i);k++}});
  /* Mönche im Kloster, Handwerker unterwegs, Wachen am Burgtor ohne Waffen */
  lauf(pendel(spl([[80,-46],[96,-46],[96,-54],[80,-54]],1.5),1),1.1,0,2);
  /* Kutschen und Karren auf den Straßen */
  [[rd(94,-130,130),'heu',pferd1,3.4],[rd(44,-100,100),'kohl',pferd4,3.2],[rd(-80,-130,130),'faesser',pferd2,3.6],[hw([128,66]),'faesser',pferd3,3.2]].forEach((q,i)=>{if(q[0].length<4)return;const B=pendel(q[0],2.2),g=kutsche(scene,q[1],q[2]);fahren(g,B,q[3],i*20)});
  /* Kähne auf dem Fluss */
  [[0x8a5a32,0x3a5ea8,-60,1.4,0],[0x6a8a9a,0xc03a3a,40,1.6,30],[0x8a4a2e,0xe8b830,110,1.5,10],[0x8a5a32,0x3a8a4a,-120,1.3,50]].forEach((q,i)=>{const s=spl([[q[2]-40,76+4*Math.sin((q[2]-40)*.035)],[q[2],76+4*Math.sin(q[2]*.035)],[q[2]+40,76+4*Math.sin((q[2]+40)*.035)]],2),B=pendel(s,1.7),g=kahnM(scene,q[0],q[1]);g.userData.anim=t=>{g.position.y=.05+Math.sin(t*1.4+i)*.07;g.rotation.z=Math.sin(t*1.1+i)*.04};fahren(g,B,q[3],q[4])});
  /* Enten und Gänse auf Fluss und Mühlbach */
  for(let i=0;i<8;i++){const d=(i%3?ente:gans)(scene),x0=-150+i*40,z0=76+4*Math.sin(x0*.035)+(i%2?2:-2);d.scale.setScalar(i%3?1.3:1.3);d.userData.keep=1;lebendig.push({o:{userData:{anim:t=>{d.position.set(x0+Math.sin(t*.12+i)*16,.12,z0+Math.sin(t*.3+i)*.7);d.rotation.y=Math.cos(t*.12+i)>0?0:Math.PI}}},ph:0})}
  /* Hunde und Katzen in der Stadt */
  streif(hundM,pendel(rd(-8,-100,-20),.8),2.2,0,1.2);streif(hundM,pendel(rd(44,20,100),.8),2.2,5,1.2);streif(hundM,pendel(rd(94,20,100),.8),2.2,8,1.2);
  /* Schmetterlinge, Libellen am Fluss */
  [[-100,100,0xf6d030],[-70,70,0xf08a2a],[-20,110,0xffffff],[40,100,0xf6d030],[100,90,0xf08a2a],[-130,30,0xffffff],[130,-30,0xf6d030],[-130,-80,0xf08a2a],[130,-100,0xffffff],[-30,70,0xf47ab0],[70,66,0xf6d030],[-160,0,0xffffff]].forEach((f,i)=>{falter(f[0],f[1],5,1.5+(i%3)*.4,i*1.7,f[2]);if(i%3===0)falter(f[0]+3,f[1]-2,4,1.9,i+1,0xf47ab0)});
  for(let i=0;i<4;i++)libelle(-100+i*55,76+4*Math.sin((-100+i*55)*.035)+(i%2?6:-6),4,1.3+i*.3,i*2,[0x2a5ac8,0x1a9a6a,0xc0302a,0x2a5ac8][i])}
function paradeBauen(){
  const wp=(k,extra)=>p=>{const f=kostFig(Object.assign({},KOST[k%KOST.length],extra||{}),p,1.4),m=f.m,w=f.w;[m.bl,m.br,m.al,m.ar].forEach(q=>{vmVerschm(q);q.userData.frei=1});vmVerschm(m.g);w.userData.anim=t=>{const q=Math.sin(t*6)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q;m.al.rotation.x=-q*.7;m.ar.rotation.x=q*.7};return w};
  const rr=(fn,c1,c2)=>p=>{const w=grp(0,0,0,p);const h=fn(w);h.scale.setScalar(1.3);const f=kostFig(Object.assign({},KOST[6],{umhang:c1,fed:c2}),w,1.0);f.m.g.rotation.y=0;f.w.position.set(0,2.3,0);f.w.rotation.y=1.57;vmVerschm(f.m.g);vmVerschm(f.w);cyl(.07,4.6,0x6a4a2e,.4,2.3,.9,w,true);box(1.5,1.1,.08,c1,1.2,4.1,.9,w);box(1.5,.3,.1,c2,1.2,4.1,.9,w);sph(.14,0xe0c040,.4,4.65,.9,w);vm(w);w.userData.anim=t=>{if(h.userData.anim)h.userData.anim(t)};return w};
  const hoch=(fn,y)=>p=>{const w=grp(0,0,0,p);const c=fn(w);c.position.y=y;w.userData.anim=t=>{if(c.userData.anim)c.userData.anim(t)};return w};
  const liste=[[hoch(p=>falkeFl(p,1),3.8),2.8],[wp(4),1],[rr(pferd1,0xc03a3a,0xf2f2ea),1],[wp(7),1],[p=>esel(p),1.5],[wp(2),1],[wp(11),1],[rr(pferd2,0x3a5ea8,0xe8b830),1],[wp(1),1],[p=>schaf(p),1.5],[wp(6,{umhang:0x3a8a4a}),1],[wp(4),1],[rr(pferd3,0x3a8a4a,0xf2f2ea),1],[wp(3),1],[p=>huhn(p),1.8],[wp(9),1],[hoch(p=>falkeFl(p,1),3),2.2]];
  liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
function weltBauen(){
/* Leistung: gröbere Grundformen (Kugel 8x5, Zylinder 8, Kegel 7) für alle Teile dieser Welt */
gSph.copy(new THREE.SphereGeometry(1,8,5));gCyl.copy(new THREE.CylinderGeometry(1,1,1,8));gCone.copy(new THREE.ConeGeometry(1,1,7));
NEBEL_TAG.set(0xdcecf7);
etappe1();
kulisse();
ort27();ort29();ort30();ort31();ort32();
ort11();ort28();ort36();ort37();ort35();
ort17();ort16();ort18();ort15();ort13();ort12();ort14();
ort19();ort20();ort21();ort22();ort23();ort24();ort25();ort26();ort34();ort33();
ort1();ort2();ort3();ort4();ort5();ort6();ort7();ort8();ort9();
ort10();ort38();
etappe4();
etappe5();
instFlush();
}
