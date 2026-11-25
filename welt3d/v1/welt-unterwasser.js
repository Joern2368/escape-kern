/* Welt: Unterwasserwelt und Korallenriff (Kennwort unterwasser). Fest, gehostet. Enthält nur Daten und Bauanleitungen; die Engine (engine.js) ruft weltBauen() auf. */
/* Tropisch klares Türkisblau: Meeresgrund aus Sand mit Seegras, Felsen und Korallen, blauer Dunst, Wasseroberfläche als heller Himmel, aufsteigende Luftblasen, Fischschwärme. Besucher und Forscher sind Taucher. Süden: Tauchstation und flaches Riff, Mitte: lebendiges Riff, Norden: Tiefsee, Höhlen und Wrack. */
/* Schilder: keine Hinweisschilder (Wunsch der Lehrkraft, 24.11.2026). Nur Ausgang, Geschafft!, Spielname und Zahlen-Schilder der Rätsel. */
const SCHILDER=['Ausgang','Geschafft!'];
const WEGMAX=0;
const MASKOTTCHEN='Schildkröte Tilda';
const START={x:0,z:128};
const VERTEXFARBEN=true,MERGEZELLE=85,FERNBESUCHER=65,FERNLEBEN=88;
const ZOOMMAX=45;
const BEREICHE={
  eingang:{name:'Eingangstor',x:0,z:134,plaetze:[]}
};
/* 38 Orte in sieben Reihen (z = 106, 68, 22, -30, -84, -134, -172), dazwischen Querwege (SEITENWEGE) */
const EXTRAZONEN=[
  {name:'Pinguin-Tauchbecken',x:-132,z:106,r:13},{name:'Tauchschule',x:-88,z:108,r:12},{name:'Tauchstation',x:-40,z:112,r:13},{name:'Forschungsstation',x:40,z:108,r:15},{name:'Wetterboje',x:92,z:106,r:11},{name:'Leuchtturm',x:140,z:104,r:12},
  {name:'Kelpwald der Seeotter',x:-132,z:68,r:16},{name:'Seegraswiese',x:-88,z:68,r:16},{name:'Seepferdchen-Wiese',x:-40,z:68,r:13},{name:'Korallengarten',x:40,z:68,r:15},{name:'Anemonen und Clownfische',x:92,z:70,r:12},{name:'Perlentaucher-Dorf',x:140,z:66,r:16},
  {name:'Schildkröten-Strand',x:-132,z:22,r:14},{name:'Muschelbank',x:-88,z:22,r:12},{name:'Seesterne und Seeigel',x:-40,z:22,r:12},{name:'Putzerstation',x:40,z:22,r:13},{name:'Krabben- und Hummerfelsen',x:92,z:22,r:12},{name:'Unterwasser-Spielplatz',x:140,z:20,r:14},
  {name:'Delfinbucht',x:-132,z:-30,r:16},{name:'Rochen-Plateau',x:-88,z:-30,r:13},{name:'Tintenfisch-Höhle',x:-40,z:-30,r:12},{name:'Quallenfeld',x:40,z:-30,r:15},{name:'Tangwald',x:92,z:-30,r:15},{name:'Aquarium-Tunnel',x:140,z:-30,r:14},
  {name:'Schiffswrack',x:-132,z:-84,r:17},{name:'Schatzhöhle',x:-88,z:-84,r:13},{name:'Fischschwarm-Tunnel',x:-40,z:-84,r:14},{name:'Haifisch-Riff',x:40,z:-84,r:15},{name:'U-Boot-Dock',x:92,z:-84,r:15},{name:'Müll-Rettungsstation',x:140,z:-84,r:13},
  {name:'Walgesang-Höhle',x:-132,z:-134,r:17},{name:'Unterwasser-Windpark',x:-88,z:-134,r:15},{name:'Tiefsee-Plateau',x:-40,z:-134,r:14},{name:'Leuchtfisch-Schlucht',x:40,z:-134,r:14},{name:'Unterwasser-Vulkan',x:92,z:-134,r:14},{name:'Rotes Meer',x:140,z:-134,r:13},
  {name:'Nachhaltige Fischerei',x:-88,z:-170,r:14},{name:'Regenbogenriff',x:60,z:-170,r:16}
];
/* Flächen, auf denen kein Bewuchs wachsen darf (Becken u. Ä.): [x,z,r] */
const WS=[];
const SEITENWEGE=[94,44,-8,-58,-110,-160];
const WEGBOGEN=11;
const GRENZE={x0:-180,x1:180,z0:-236,z1:148};
const TORZ=-190, FEST={x:0,z:-212};
let FARBEN,WASSER,ausgang;
const BPTS=[[0,128],[0,100],[0,60],[0,20],[0,-20]];
const BLF=[0xff7a5a,0xffb04a,0xffd45e,0xf47ab0,0xb06ae0,0xffffff];
const SAND=0xbfc88e,SAND2=0xafba7e,SAND3=0xd0d8a2;
let GLAS;
function pfad(x1,z1,x2,z2,w,farbe){weg(wellen(x1,z1,x2,z2),w,farbe)}
const gDisc=new THREE.CylinderGeometry(1,1,1,28);
function scheibe(x,z,r,farbe,h){h=h||.12;const c=mesh(gDisc,farbe,x,h/2,z,r,h,r,scene);c.receiveShadow=true;return c}
function wasserRund(x,z,r,farbe,dy){const w=mesh(gDisc,farbe,x,.1+(dy||0),z,r,.18,r,scene);w.receiveShadow=true;return w}
function schild(text,x,y,z,w,h,schrift,farbe,rot,par){const s=schildText(text,farbe||'#fff8e6',w,h,schrift);s.position.set(x,y,z);if(rot)s.rotation.y=rot;(par||scene).add(s);return s}
function bewegt(teil,fn){teil.userData.keep=1;lebendig.push({o:{userData:{anim:fn}},ph:0})}
function leben(g,ph){lebendig.push({o:g,ph:ph||rnd()*6})}
const gSphL=new THREE.SphereGeometry(1,6,3),gSphT=new THREE.SphereGeometry(1,8,6),gSphXL=new THREE.SphereGeometry(1,5,3),gConL=new THREE.ConeGeometry(1,1,7),gCylL=new THREE.CylinderGeometry(1,1,1,6),gBoxI=new THREE.BoxGeometry(1,1,1);
const IR={};
const VMAT2=new THREE.MeshLambertMaterial({vertexColors:true});
function glas(w,h,d,x,y,z,par){GLAS=GLAS||new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.28,depthWrite:false});const m=new THREE.Mesh(gBox,GLAS);m.position.set(x,y,z);m.scale.set(w,h,d);(par||scene).add(m);return m}
function person(x,z,rot,jacke,hose,haar,stil,s,par){const m=kindL({jacke:jacke,hose:hose,haut:0xe8b98f,haar:haar,stil:stil||'kurz',rucksack:null},par||scene);m.g.position.set(x,0,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.25);return m}
function bodenFl(x,z,w,d,farbe,h){h=h||.1;const b=box(w,h,d,farbe,x,h/2,z,scene);b.receiveShadow=true;return b}
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
function kindL(av,par){const g=grp(0,0,0,par),bl=grp(-.2,.85,0,g),br=grp(.2,.85,0,g);[bl,br].forEach(b=>{cyl(.13,.8,av.hose,0,-.42,0,b,true);box(.3,.2,.46,0x3a3a44,0,-.88,.07,b)});
  const t=cyl(.37,.9,av.jacke,0,1.3,0,g,true);t.scale.z=.3;box(.78,.12,.58,av.hose,0,.9,0,g);const al=grp(-.47,1.62,0,g),ar=grp(.47,1.62,0,g);[al,ar].forEach(a=>{cyl(.11,.7,av.jacke,0,-.34,0,a,true);sph(.12,av.haut,0,-.76,0,a)});
  if(av.rucksack)box(.55,.65,.25,av.rucksack,0,1.35,-.34,g,true);const kopf=grp(0,2.05,0,g),h=av.haar;sph(.5,av.haut,0,0,0,kopf).castShadow=true;[-1,1].forEach(x=>{sph(.085,0x1b1b1b,x*.18,.05,.46,kopf,1,1.2,.6);sph(.07,0xf2a0a0,x*.3,-.1,.42,kopf,1,.7,.4)});sph(.045,av.haut,0,-.04,.5,kopf);box(.16,.03,.03,0xa84040,0,-.14,.49,kopf);
  if(av.stil==='cap'){sph(.53,h,0,.1,-.08,kopf,1,.8,1);sph(.54,0xe0302a,0,.14,0,kopf,1,.55,1);box(.5,.06,.36,0xe0302a,0,.16,.55,kopf)}else{sph(.54,h,0,.1,-.07,kopf,1,.85,1.02);sph(.3,h,0,.36,.34,kopf,1.4,.4,.7)}
  if(av.stil==='zoepfe')[-1,1].forEach(x=>{sph(.18,h,x*.55,-.18,-.05,kopf,.8,1.6,.8);sph(.08,0xe0605a,x*.52,.04,-.03,kopf)});if(av.stil==='pferd'){sph(.2,h,0,.12,-.58,kopf,.8,1.8,.8);sph(.08,0xe0605a,0,.2,-.5,kopf)}
  return {g,bl,br,al,ar,kopf}}
function hutAuf(m,col,s){s=s||1;cyl(.66*s,.07,col,0,.36,0,m.kopf);cyl(.4*s,.36,col,0,.56,0,m.kopf)}
function schwarm(geo,farbe,n,fn){const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:farbe}),n);im.frustumCulled=false;scene.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler();
  lebendig.push({o:{userData:{anim:t=>{if(Math.hypot(camera.position.x-im.userData.cx,camera.position.z-im.userData.cz)>130){im.visible=false;return}im.visible=true;for(let i=0;i<n;i++){const a=fn(i,t);P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(0,a[6]||0,0));M.compose(P,Q,S);im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}}},ph:0});const a0=fn(0,0);im.userData.cx=a0[0];im.userData.cz=a0[2];return im}
function schwarmF(geo,n,cols,fn,cx,cz){const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),n);im.frustumCulled=false;scene.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color();
  for(let i=0;i<n;i++)im.setColorAt(i,C.set(cols[i%cols.length]));im.instanceColor.needsUpdate=true;
  lebendig.push({o:{userData:{anim:t=>{if(Math.hypot(camera.position.x-cx,camera.position.z-cz)>120){im.visible=false;return}im.visible=true;for(let i=0;i<n;i++){const a=fn(i,t);P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(a[7]||0,a[6]||0,a[8]||0,'YXZ'));M.compose(P,Q,S);im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true}}},ph:0});return im}
function lin(P,st){const o=[];for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],k=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/st));for(let j=0;j<k;j++)o.push([a[0]+(b[0]-a[0])*j/k,a[1]+(b[1]-a[1])*j/k])}o.push(P[P.length-1]);return o}
const lay=b=>({x:d=>b.x+d,z:d=>b.z+b.dir*d,r:b.dir>0?0:Math.PI});
function strasse(r){const p=[];for(let x=-150;x<150;x+=19)p.push([x,roadZ(x,r)]);p.push([150,roadZ(150,r)]);return p}
function zone(n,r0){const b=ZN(n);if(!b)throw new Error('Zone fehlt: '+n);let best=94,bd=1e9;SEITENWEGE.forEach(r=>{const d=Math.abs(r-b.z);if(d<bd){bd=d;best=r}});if(r0!=null)best=r0;b.road=best;b.dir=best>b.z?1:-1;b.gap=b.dir>0?Math.PI/2:-Math.PI/2;return b}
function ast(b,w,bend){const x=b.x,z0=roadZ(x,b.road),bd=bend==null?(x>0?-2.4:2.4):bend;weg([[x,z0],[x+bd,(z0+b.z)/2],[x,b.z+b.dir*1.5]],w||3.2)}
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
function felsgruppe(x,z,rx,rz,n,rmin,rmax,hoch){const L=[];for(let i=0;i<n;i++){const a=i/n*6.283+nr()*.5,q=.35+nr()*.65,px=x+Math.cos(a)*rx*q,pz=z+Math.sin(a)*rz*q,r=rmin+nr()*(rmax-rmin);const m=sph(r,GRAU[i%5],px,r*(hoch||.55),pz,scene,1.2,.8,1);m.castShadow=true;kreis(px,pz,r*.95);L.push([px,pz,r])}return L}
function rohr(a,b,r,farbe,par){const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),L=d.length(),m=cyl(r,L,farbe,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,par||scene);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.multiplyScalar(1/L));return m}
function hex(x,z,r,farbe,h){h=h||.1;const c=cyl(r,h,farbe,x,h/2,z,scene);c.receiveShadow=true;return c}
const gPyr=new THREE.ConeGeometry(1,1,4,1,true);
const GRAU=[0x8d9097,0x7e848c,0x9a9a9e,0x848a94,0x969087];
function augen(k,x,y,z,r,fr){[-1,1].forEach(s=>{sph(r,fr||0x16110d,x,y,z*s,k);sph(r*.35,0xffffff,x+r*.4,y+r*.4,z*s,k)})}
function flecken(g,bl,bh,bw,h,n,f){for(let i=0;i<n;i++){const u=(i%7)/6*2-1,a=(.25+(Math.floor(i/7)*.37+(i%3)*.13))*Math.PI*.9;sph(.075,f||0x2a1a10,u*bl*.9,h+Math.sin(a)*bh*.95,(i%2?1:-1)*Math.cos(a)*bw*.92,g,1.3,.5,1.3).rotation.z=u*.2}}
function schwimmen(g,y0,ph,a){g.userData.keep=1;const x0=g.position.x,z0=g.position.z,r0=g.rotation.y;lebendig.push({o:{userData:{anim:t=>{g.position.y=y0+Math.sin(t*1.1+ph)*.06*(a||1);g.rotation.z=Math.sin(t*.9+ph)*.025;g.rotation.y=r0+Math.sin(t*.4+ph)*.04}}},ph:0})}
const fig=(x,z,rot,jk,hs,hr,st,s)=>{kreis(x,z,.5);return person(x,z,rot,jk,hs,hr,st||'kurz',s||1.25)};
const dk=(c,f)=>new THREE.Color(c).multiplyScalar(f).getHex();
const ZN=n=>EXTRAZONEN.find(e=>e.name===n);
/* Instanzen mit Neigung: inst(form,x,y,z,sx,sy,sz,farbe,ry,rx,rz) */
function inst(k,x,y,z,sx,sy,sz,c,ry,rx,rz){(IR[k]=IR[k]||[]).push([x,y,z,sx,sy,sz,c,ry||0,rx||0,rz||0])}
function instFlush(){const G={sph:gSphL,sphT:gSphT,blm:gSphXL,con:gConL,cyl:gCylL,box:gBoxI,pyr:gPyr},M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color(),CH=96,gr={},bl=[];
  for(const k in IR)IR[k].forEach(a=>{const key=k+'|'+Math.floor((a[0]+260)/CH)+'|'+Math.floor((a[2]+320)/CH);(gr[key]=gr[key]||{k,l:[]}).l.push(a)});
  for(const key in gr){const q=gr[key],l=q.l;let x0=1e9,x1=-1e9,y1=0,z0=1e9,z1=-1e9,ms=0;l.forEach(a=>{x0=Math.min(x0,a[0]);x1=Math.max(x1,a[0]);z0=Math.min(z0,a[2]);z1=Math.max(z1,a[2]);y1=Math.max(y1,a[1]+a[4]);ms=Math.max(ms,a[3],a[4],a[5])});
    const geo=G[q.k].clone(),im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),l.length);geo.boundingSphere=new THREE.Sphere(new THREE.Vector3((x0+x1)/2,y1/2,(z0+z1)/2),Math.hypot(x1-x0,z1-z0,y1)/2+ms*1.6+2);
    bl.push({im,x:geo.boundingSphere.center.x,z:geo.boundingSphere.center.z,r:geo.boundingSphere.radius});im.frustumCulled=true;if(q.k==='sphT')im.castShadow=true;
    l.forEach((a,i)=>{P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(a[8]||0,a[7],a[9]||0,'YXZ'));M.compose(P,Q,S);im.setMatrixAt(i,M);im.setColorAt(i,C.set(a[6]))});im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;scene.add(im)}
  lebendig.push({o:{userData:{anim:t=>{const cx=camera.position.x,cz=camera.position.z;bl.forEach(c=>{const v=Math.hypot(c.x-cx,c.z-cz)-c.r<138;if(c.im.visible!==v)c.im.visible=v})}}},ph:0})}/* ---------- Unterwasser-Bewuchs (alles instanziert) ---------- */
const KC=[0xff7a8a,0xff9a4a,0xffc83a,0xe85aa0,0xa86ae0,0xf06a5a,0x4ac8c0,0xf8e060,0xff5a5a,0x7a8af0];
const kc=i=>KC[((Math.floor(i)%10)+10)%10];
const SG1=[0x3fa860,0x58c070,0x2f9a58,0x6ac878],TK=[0x8a7a2a,0x9a8a3a,0x6a7a2a,0x7a8a34];
const bas=c=>{BM[c]=BM[c]||new THREE.MeshBasicMaterial({color:c});return BM[c]},BM={};
function leucht(r,c,x,y,z,par,sx,sy,sz){const m=new THREE.Mesh(gSph,bas(c));m.position.set(x,y,z);m.scale.set(r*(sx||1),r*(sy||1),r*(sz||1));if(par)par.add(m);return m}
/* Ast: Kegel von (x,y,z) aus in Richtung (Neigung t, Himmelsrichtung az), Länge len */
function zweig(x,y,z,len,r,t,az,c,k){const dx=Math.sin(t)*Math.cos(az),dy=Math.cos(t),dz=Math.sin(t)*Math.sin(az);inst(k||'con',x+dx*len/2,y+dy*len/2,z+dz*len/2,r,len,r,c,Math.PI/2-az,t,0)}
function seegras(x,z,h,k){h=h||1.2+nr()*1.2;const c=SG1[Math.floor(nr()*4)];zweig(x,0,z,h,.2,.1+nr()*.25,nr()*6.28,c,'pyr')}
function seegrasBusch(x,z,s){s=s||1;for(let i=0;i<5;i++)seegras(x+(nr()-.5)*1.2*s,z+(nr()-.5)*1.2*s,(1+nr()*1.6)*s)}
function stein(x,z,s){s=s||1;inst('sph',x,.28*s,z,s,.55*s,s*.9,GRAU[Math.floor(nr()*5)],nr()*3)}
function hirn(x,z,s,c){s=s||1;c=c==null?kc(nr()*10):c;inst('sph',x,.42*s,z,1.1*s,.8*s,1.0*s,c,nr()*3);for(let i=0;i<4;i++){const a=i*1.6+x;inst('sph',x+Math.cos(a)*.5*s,.6*s,z+Math.sin(a)*.5*s,.5*s,.35*s,.5*s,dk(c,.78))}}
function geweih(x,z,s,c){s=s||1;c=c==null?kc(nr()*10):c;for(let i=0;i<7;i++){const a=i*.9+x*1.7;zweig(x+Math.cos(a)*.12*s,0,z+Math.sin(a)*.12*s,(1.0+(i%3)*.45)*s,.2*s,.3+(i%3)*.12,a,c)}zweig(x,0,z,1.9*s,.24*s,0,0,dk(c,1.1))}
function orgel(x,z,s,c){s=s||1;c=c==null?kc(nr()*10):c;for(let i=0;i<6;i++){const a=i*1.05,h=(.9+(i%3)*.5)*s;inst('cyl',x+Math.cos(a)*.35*s,h/2,z+Math.sin(a)*.35*s,.2*s,h,.2*s,c);inst('sph',x+Math.cos(a)*.35*s,h+.02,z+Math.sin(a)*.35*s,.2*s,.1*s,.2*s,dk(c,.6))}}
function tischK(x,z,s,c){s=s||1;c=c==null?kc(nr()*10):c;inst('cyl',x,.55*s,z,.22*s,1.1*s,.22*s,dk(c,.7));inst('cyl',x,1.12*s,z,1.5*s,.16*s,1.5*s,c);inst('cyl',x,1.02*s,z,1.15*s,.14*s,1.15*s,dk(c,1.15))}
function faecher(x,z,s,c,ry){s=s||1;c=c==null?kc(nr()*10):c;ry=ry||0;inst('cyl',x,.4*s,z,.1*s,.8*s,.1*s,dk(c,.7));for(let j=-3;j<=3;j++)zweig(x,.7*s,z,(2.1-.15*Math.abs(j))*s,.09*s,Math.abs(j)*.19,j<0?ry+Math.PI:ry,c);inst('cyl',x,1.5*s,z,.05*s,.1*s,.05*s,c)}
function baumK(x,z,s,c){s=s||1;c=c==null?kc(nr()*10):c;inst('cyl',x,.9*s,z,.2*s,1.8*s,.2*s,dk(c,.8));for(let i=0;i<4;i++){const a=i*1.57+x*.3,t=.45;const bx=x+Math.sin(t)*Math.cos(a)*1.5*s,bz=z+Math.sin(t)*Math.sin(a)*1.5*s;zweig(x,1.4*s,z,1.7*s,.13*s,t,a,c);for(let j=0;j<3;j++)zweig(bx,1.4*s+Math.cos(t)*1.5*s,bz,1.0*s,.07*s,.5+j*.25,a+(j-1)*1.1,dk(c,1.15))}}
/* Korallenturm: mächtig, aus Kegeln und Kugeln; Hindernis */
function turm(x,z,s,c,solid){s=s||1;c=c==null?kc(nr()*10):c;inst('blm',x,.9*s,z,2.6*s,1.6*s,2.6*s,dk(c,.8));inst('sph',x,2.3*s,z,1.7*s,1.9*s,1.7*s,c);inst('con',x,4.5*s,z,1.5*s,3.6*s,1.5*s,dk(c,1.1));for(let i=0;i<6;i++){const a=i*1.05+x;inst('con',x+Math.cos(a)*1.5*s,1.4*s+(i%3)*.6*s,z+Math.sin(a)*1.5*s,.7*s,(2.3+(i%3))*s,.7*s,i%2?dk(c,1.2):c,0,.25,0)}for(let i=0;i<5;i++){const a=i*1.3;inst('sph',x+Math.cos(a)*1.3*s,2.8*s+(i%2)*.8*s,z+Math.sin(a)*1.3*s,.45*s,.4*s,.45*s,dk(c,.7))}if(solid!==false)kreis(x,z,2.4*s)}
function anemone(x,z,s,c){s=s||1;c=c==null?[0xf06a9a,0xb06ae0,0xff9a4a,0x7ad06a][Math.floor(nr()*4)]:c;inst('cyl',x,.22*s,z,.35*s,.44*s,.35*s,dk(c,.7));for(let i=0;i<9;i++){const a=i*.7;zweig(x+Math.cos(a)*.15*s,.35*s,z+Math.sin(a)*.15*s,.95*s,.075*s,.5+(i%3)*.2,a,i%2?c:dk(c,1.2),'pyr')}}
function seeigel(x,z,s,c){s=s||1;c=c||0x4a2a5a;inst('sph',x,.3*s,z,.32*s,.3*s,.32*s,c);for(let i=0;i<10;i++){const a=i*.63+x,t=.5+(i%3)*.4;zweig(x,.3*s,z,.55*s,.05*s,t,a,c,'pyr')}}
function seestern(x,z,s,c,ry){s=s||1;c=c==null?[0xff7a3a,0xe0302a,0xf0c030,0xe85aa0][Math.floor(nr()*4)]:c;ry=ry==null?nr()*3:ry;inst('sph',x,.07*s,z,.2*s,.1*s,.2*s,dk(c,1.1),ry);for(let i=0;i<5;i++){const a=ry+i*1.2566;inst('box',x+Math.cos(a)*.34*s,.05*s,z+Math.sin(a)*.34*s,.62*s,.09*s,.17*s,c,-a)}}
function muschelK(x,z,s,c){s=s||1;c=c||0xf0dcc8;inst('sph',x,.18*s,z,.5*s,.28*s,.4*s,c,nr()*3);inst('sph',x,.28*s,z,.42*s,.1*s,.32*s,dk(c,.8),nr()*3)}
function schwamm(x,z,s,c){s=s||1;c=c||0xe8a838;inst('cyl',x,.7*s,z,.34*s,1.4*s,.34*s,c);inst('cyl',x,1.42*s,z,.27*s,.06*s,.27*s,dk(c,.5));inst('cyl',x+.5*s,.45*s,z+.2*s,.24*s,.9*s,.24*s,dk(c,1.1))}
function tang(x,z,h){h=h||4+nr()*4;const c=TK[Math.floor(nr()*4)];inst('cyl',x,h/2,z,.07,h,.07,c);for(let i=1;i<4;i++)inst('blm',x+Math.sin(i+x)*.3,h*i/4,z+Math.cos(i+z)*.3,.8,.12+.0,.35,c,i*1.3,0,0)}
function alge(x,z,s){s=s||1;const c=[0x4aa88a,0x5ab87a,0x3a9a8a,0x6ac08a][Math.floor(nr()*4)];inst('blm',x,.3*s,z,.9*s,.45*s,.8*s,c,nr()*3);inst('blm',x+.5*s,.25*s,z+.2*s,.6*s,.35*s,.55*s,dk(c,.85),nr()*3);if(nr()<.5)inst('sph',x-.4*s,.22*s,z-.3*s,.3*s,.25*s,.3*s,[0xf2a0c0,0xf8d070,0xb8a0f0][Math.floor(nr()*3)])}
function sandfl(x,z,s){inst('sph',x,.02,z,(2.5+nr()*2)*s,.04,(2+nr()*2)*s,[SAND2,SAND3,0xcdb87e,0xe0cf98][Math.floor(nr()*4)],nr()*3)}
/* Riffgruppe: gemischte Korallen auf kleiner Fläche (Dichte) */
function riff(x,z,r,n,farbe){for(let i=0;i<n;i++){const a=nr()*6.28,d=Math.sqrt(nr())*r,px=x+Math.cos(a)*d,pz=z+Math.sin(a)*d,q=Math.floor(nr()*7),c=farbe==null?undefined:farbe,s=.7+nr()*.7;if(q===0)hirn(px,pz,s,c);else if(q===1)geweih(px,pz,s,c);else if(q===2)orgel(px,pz,s,c);else if(q===3)tischK(px,pz,s*.8,c);else if(q===4)faecher(px,pz,s,c,nr()*3);else if(q===5)anemone(px,pz,s);else seegrasBusch(px,pz,s)}}
function fels(x,z,r){const g=felsen(x,z,r);if(r>.6)inst('sph',x,r*.78,z,r*.9,r*.28,r*.8,0x58b898);return g}
/* ==================== Meerestiere und Taucher ==================== */
/* Fisch, schaut nach +x. o: f Körper, b Bauch, fl Flossen, l Länge, h Höhe, st Streifen, sp Punkte */
function fischM(par,o){const g=grp(0,0,0,par),f=o.f,b=o.b||f,L=o.l||1,H=o.h||.4,fn=o.fl||f;
  sph(1,f,0,0,0,g,L*.5,H*.5,H*.3);sph(1,b,L*.04,-H*.16,0,g,L*.42,H*.3,H*.26);
  if(o.st){sph(1,o.st,L*.13,0,0,g,L*.045,H*.53,H*.31);sph(1,o.st,-L*.2,0,0,g,L*.04,H*.4,H*.27)}
  if(o.sp)for(let i=0;i<8;i++){const sd=i%2?1:-1;sph(1,o.sp,L*(.3-(i>>1)*.14),H*((i>>1)%2?.12:-.05),sd*H*.285,g,H*.07,H*.07,H*.03)}
  const tl=grp(-L*.45,0,0,g);const t=cone(H*.42,L*.32,fn,-L*.14,0,0,tl);t.rotation.z=-Math.PI/2;t.scale.z=H*.1;
  const d=cone(H*.2,H*.5,fn,-L*.02,H*.5,0,g);d.scale.z=H*.07;if(o.dh){const d2=cone(H*.16,H*.5,fn,-L*.02,-H*.4,0,g);d2.rotation.z=Math.PI;d2.scale.z=H*.06}
  [-1,1].forEach(s=>{const p=box(L*.18,H*.05,H*.2,fn,L*.1,-H*.1,s*H*.3,g);p.rotation.y=s*.5});
  augen(g,L*.34,H*.12,H*.21,H*.1);if(o.mund)sph(1,o.mund,L*.5,-H*.05,0,g,L*.03,H*.07,H*.1);
  g.userData.anim=t2=>{tl.rotation.y=Math.sin(t2*9)*.45};return g}
const fisch=o=>automerge(p=>fischM(p,o));
const clownF=fisch({f:0xff7a1a,b:0xff9a3a,st:0xf8f8f8,l:1.1,h:.5,sp:0x1a1a1a}),doktorF=fisch({f:0x2a5ad8,fl:0xf2d030,l:1.2,h:.7,sp:0x101830}),kaiserF=fisch({f:0xf2c820,b:0xf8e060,st:0x2a6ad8,fl:0x2a6ad8,l:1.3,h:.75}),
  thunF=fisch({f:0x2a4a7a,b:0xdde8f0,fl:0x2a4a7a,l:2.2,h:.7,dh:1}),heringF=fisch({f:0xaebfca,b:0xeef4f8,fl:0x8aa0b0,l:.9,h:.26}),putzerF=fisch({f:0x3a8af0,b:0xf4f8ff,st:0x1a1a22,l:.8,h:.22}),
  rotF=fisch({f:0xe0302a,b:0xff8a6a,fl:0xc02020,l:1.2,h:.6}),falterF=fisch({f:0xf6f2d8,b:0xffffff,st:0x2a2a30,fl:0xf2c820,l:1.1,h:.8}),laterneF=fisch({f:0x1a2038,b:0x2a3a58,fl:0x2a3a58,l:.9,h:.34,sp:0x7af0ff,mund:0x7af0ff}),
  barschF=fisch({f:0x4aa88a,b:0xc8e8d8,fl:0x2a8a6a,l:1.3,h:.5,st:0x1f6a52}),lippF=fisch({f:0xd8603a,b:0xffd0a0,fl:0xd8603a,l:1.1,h:.45,sp:0x2a6ad8,mund:0xd04060});
function kugelfischM(par){const g=grp(0,0,0,par),f=0xe8d070;sph(.5,f,0,0,0,g,1,.95,.95);sph(.4,0xfff0c8,.05,-.2,0,g,.9,.6,.9);for(let i=0;i<10;i++){const a=i*.9+.3,y=(i%3-1)*.28;cone(.05,.2,0x8a6a2a,Math.cos(a)*.48,y,Math.sin(a)*.48,g).rotation.z=Math.cos(a)>0?-1.2:1.2}
  augen(g,.38,.18,.3,.08);sph(.08,0xd06050,.5,-.08,0,g);const tl=grp(-.5,0,0,g);box(.3,.25,.05,f,-.12,0,0,tl);g.userData.anim=t=>{tl.rotation.y=Math.sin(t*8)*.5};return g}
const kugelfisch=automerge(kugelfischM);
/* Meeresschildkröte; sc=1: Tilda mit rotem Schal */
function schildM(par,sc){const g=grp(0,0,0,par),pz=0x7a6a38,pd=0x4f4222;
  sph(1,pz,0,.2,0,g,1.5,.62,1.2);for(let i=0;i<7;i++){const a=i?(i-1)*1.047:0,r=i?.62:0;sph(.42,pd,Math.cos(a)*r*1.2,.8,Math.sin(a)*r,g,1,.28,1)}
  sph(1,0xd8cc9a,0,-.12,0,g,1.38,.32,1.1);sph(.42,0x8a9a52,1.7,.2,0,g,1.15,.9,.9);cone(.12,.3,0xd8a050,2.05,.1,0,g).rotation.z=-Math.PI/2;augen(g,1.95,.38,.27,.08);
  const fl=[],hl=[];[-1,1].forEach(s=>{const p=grp(.75,-.05,s*1.0,g);sph(1,0x7a9a52,.15,0,s*.7,p,.28,.08,.85);fl.push([p,s]);const q=grp(-1.1,-.05,s*.8,g);sph(1,0x7a9a52,-.15,0,s*.4,q,.3,.07,.45);hl.push([q,s])});
  cone(.14,.45,0x7a9a52,-1.75,0,0,g).rotation.z=Math.PI/2;
  if(sc){sph(.46,0xe0302a,1.35,.15,0,g,.55,.8,1.15);[-1,1].forEach(s=>sph(.2,0xe0302a,1.2,-.25,s*.3,g,.5,1.5,.4))}
  g.userData.anim=t=>{fl.forEach(a=>{a[0].rotation.x=a[1]*Math.sin(t*1.6)*.5});hl.forEach(a=>{a[0].rotation.x=-a[1]*Math.sin(t*1.6)*.3})};return g}
const schildkroete=automerge(p=>schildM(p,0)),tilda=automerge(p=>schildM(p,1));
function walM(par){const g=grp(0,0,0,par),f=0x3d5a72,b=0xdbe6ee;
  sph(1,f,0,0,0,g,8,2.4,2.5);sph(1,b,.5,-.9,0,g,6.8,1.5,2.2);sph(1,f,7,.0,0,g,2.8,1.9,2.1);sph(1,b,7.5,-.95,0,g,2.7,.8,1.7);[-1,1].forEach(s=>{box(5.2,.12,.1,0x1a2a3a,7.1,-.45,s*1.85,g).rotation.y=s*.06;sph(.24,0xffffff,8.3,.25,s*1.95,g);sph(.13,0x101820,8.4,.25,s*2.1,g)});
  for(let i=0;i<5;i++)sph(.22,0x5a7a92,6+i*.7,1.9-Math.abs(i-2)*.1,(i%2-.5)*.7,g);cone(.5,.9,f,-3,2.3,0,g);
  [-1,1].forEach(s=>{const p=grp(5,-.8,s*2.3,g);const b2=box(5.2,.16,1.2,b,-2.2,-.6,s*.6,p);b2.rotation.y=s*.25;b2.rotation.z=-.25;g.userData['pf'+s]=p});
  sph(1,f,-8.5,.2,0,g,4,1.4,1.5);sph(1,f,-12,.3,0,g,2.4,.8,.8);const tl=grp(-13.5,.3,0,g);[-1,1].forEach(s=>{const fx=box(1.8,.22,4,f,-.3,0,s*1.9,tl);fx.rotation.y=-s*.45});
  g.userData.anim=t=>{tl.rotation.z=Math.sin(t*1.3)*.22;[-1,1].forEach(s=>{g.userData['pf'+s].rotation.x=s*Math.sin(t*.9)*.2})};return g}
const wal=automerge(walM);
function haiM(par){const g=grp(0,0,0,par),f=0xa88a62,b=0xe8dcc0;
  sph(1,f,0,0,0,g,2.6,.66,.62);sph(1,b,.1,-.28,0,g,2.3,.36,.54);sph(1,f,2.5,-.05,0,g,1.1,.5,.78);sph(.18,0xb89a72,3.4,-.12,0,g,1,.6,1.3);[-1,1].forEach(s=>{cone(.04,.35,0xc8aa82,3.45,-.28,s*.25,g).rotation.x=Math.PI});augen(g,2.95,.18,.52,.08);
  box(.5,.06,.9,0x5a3a2a,3.2,-.3,0,g);cone(.5,1.0,f,.3,.95,0,g).scale.z=.22;cone(.34,.6,f,-1.3,.7,0,g).scale.z=.2;
  [-1,1].forEach(s=>{const p=sph(1,f,1.2,-.4,s*.95,g,.85,.1,.55);p.rotation.y=s*.4;p.rotation.z=s*.2});
  const tl=grp(-2.7,0,0,g);const u=cone(.35,1.9,f,-.9,.55,0,tl);u.rotation.z=Math.PI/2+.6;u.scale.z=.2;const l2=cone(.2,.9,f,-.4,-.25,0,tl);l2.rotation.z=Math.PI/2-.5;l2.scale.z=.2;
  g.userData.anim=t=>{tl.rotation.y=Math.sin(t*2.2)*.3};return g}
const hai=automerge(haiM);
function mantaM(par){const g=grp(0,0,0,par),f=0x3a4a5c;sph(1,f,0,0,0,g,1.5,.38,1.2);sph(1,0xf0f4f8,.1,-.1,0,g,1.3,.28,1.0);
  const wg=[-1,1].map(s=>{const p=grp(0,0,s*.7,g);sph(1,f,-.2,0,s*1.5,p,1.1,.1,1.9);sph(1,0xf0f4f8,-.2,-.07,s*1.5,p,1.0,.08,1.7);return[p,s]});
  [-1,1].forEach(s=>{cone(.15,.9,f,1.6,-.05,s*.45,g).rotation.z=-Math.PI/2});augen(g,1.15,.14,.8,.1);cyl(.05,3.4,0x2a323c,-3.3,0,0,g).rotation.z=Math.PI/2;sph(.2,0xe8f0f8,.4,.4,.4,g,1.2,.3,1);sph(.2,0xe8f0f8,-.2,.38,-.5,g,1.2,.3,1);
  g.userData.anim=t=>{wg.forEach(w=>{w[0].rotation.x=w[1]*Math.sin(t*2.2)*.38})};return g}
const manta=automerge(mantaM);
function seepferdM(par,f){f=f||0xffb83a;const g=grp(0,0,0,par);sph(.5,f,0,.9,0,g,.75,1.15,.65);sph(.36,f,.1,1.62,0,g,.95,.8,.7);cyl(.07,.62,f,.55,1.55,0,g).rotation.z=Math.PI/2;sph(.1,f,.9,1.55,0,g,.8,.8,.8);augen(g,.3,1.72,.22,.07);
  for(let i=0;i<3;i++)cone(.06,.3,dk(f,.8),-.02-i*.09,2.0-i*.05,0,g);box(.05,.5,.4,0xffe0a0,-.35,1.0,0,g);
  for(let i=0;i<7;i++){const a=i*.55;sph(.3-i*.03,f,-.1-Math.sin(a)*.55*(1-i*.05),.45-(1-Math.cos(a))*.5,0,g)}
  for(let i=0;i<5;i++)sph(.07,dk(f,.7),.1,.55+i*.2,.33,g);g.userData.anim=t=>{g.children[0].rotation.z=0};return g}
const seepferd=automerge(p=>seepferdM(p,0xffb83a)),seepferd2=automerge(p=>seepferdM(p,0xf08ab0)),seepferd3=automerge(p=>seepferdM(p,0x8ad0c0));
function krabbeM(par,f){f=f||0xe85a2a;const g=grp(0,0,0,par);sph(1,f,0,.38,0,g,.6,.3,.5);[-1,1].forEach(s=>{cyl(.03,.28,0x2a2a2a,.4,.62,s*.18,g);sph(.07,0x111111,.4,.78,s*.18,g);sph(.06,0xffffff,.43,.8,s*.18,g);
  cyl(.04,.5,f,.45,.45,s*.55,g).rotation.x=s*.9;sph(.2,f,.6,.45,s*.82,g,1.2,.8,.9);cone(.07,.3,f,.82,.5,s*.8,g).rotation.z=-Math.PI/2+.5;cone(.07,.3,f,.82,.4,s*.8,g).rotation.z=-Math.PI/2-.3;
  for(let i=0;i<4;i++){const l=cyl(.035,.55,f,-.25+i*.17,.2,s*.62,g);l.rotation.x=s*.9}});
  const w=grp(0,0,0,g);box(.3,.04,.2,0xff9a5a,.1,.7,0,w);g.userData.anim=t=>{w.position.y=Math.abs(Math.sin(t*6))*.03;w.rotation.z=Math.sin(t*6)*.1};return g}
const krabbe=automerge(p=>krabbeM(p,0xe85a2a)),krabbe2=automerge(p=>krabbeM(p,0xd8b868));
function hummerM(par){const g=grp(0,0,0,par),f=0x8a2a1e,h=0xc04a2a;sph(1,f,.2,.4,0,g,.9,.38,.42);sph(1,h,-.8,.38,0,g,.55,.33,.4);for(let i=0;i<3;i++)sph(1,f,-1.3-i*.3,.34,0,g,.3-i*.03,.3-i*.03,.38-i*.04);box(.4,.06,.6,h,-2.35,.3,0,g);sph(1,h,1.0,.46,0,g,.35,.28,.3);
  [-1,1].forEach(s=>{cyl(.025,1.5,0xd05a3a,1.6,.8,s*.1,g).rotation.z=Math.PI/2-.35;sph(.06,0x111111,1.2,.6,s*.22,g);cyl(.06,.7,f,1.2,.4,s*.5,g).rotation.z=Math.PI/2;sph(.28,h,1.9,.4,s*.55,g,1.5,.7,.8);cone(.09,.55,h,2.3,.45,s*.5,g).rotation.z=-Math.PI/2;for(let i=0;i<4;i++){const l=cyl(.03,.6,f,.7-i*.3,.18,s*.5,g);l.rotation.x=s*.8}});g.userData.anim=t=>{g.children[0].rotation.z=Math.sin(t*3)*.02};return g}
const hummer=automerge(hummerM);
function tintenM(par,f){f=f||0xd8604a;const g=grp(0,0,0,par);sph(.7,f,0,1.5,0,g,.9,1.3,.9);sph(.55,f,.45,.9,0,g,1,.9,1);[-1,1].forEach(s=>{sph(.2,0xfff0b0,.78,1.05,s*.38,g);sph(.1,0x101010,.9,1.05,s*.4,g,.4,1.6,1)});
  for(let i=0;i<8;i++){const a=i*.785;for(let j=0;j<4;j++){const r=.35+j*.22;sph(.2-j*.035,j%2?dk(f,.85):f,Math.cos(a)*r+.1,.35-j*.06+(j>1?.0:.2),Math.sin(a)*r,g)}}
  for(let i=0;i<12;i++)sph(.06,0xf2c0b0,Math.cos(i*.8)*.65,.3,Math.sin(i*.8)*.65,g);g.userData.anim=t=>{g.children[0].scale.y=.91*(1+Math.sin(t*2)*.05)};return g}
const tintenfisch=automerge(p=>tintenM(p,0xd8604a)),tintenfisch2=automerge(p=>tintenM(p,0x9a6ad8));
function pinguinM(par){const g=grp(0,0,0,par);sph(1,0x20242c,0,.95,0,g,.55,.95,.5);sph(1,0xf4f4f4,.14,.9,0,g,.45,.8,.42);sph(.32,0x20242c,.12,1.95,0,g);cone(.1,.35,0xf2a020,.42,1.9,0,g).rotation.z=-Math.PI/2;augen(g,.38,2.05,.2,.06);
  [-1,1].forEach(s=>{const a=grp(0,1.4,s*.5,g);box(.12,.8,.28,0x20242c,0,-.4,s*.05,a).rotation.x=s*.2;a.rotation.x=s*.15;box(.4,.1,.22,0xf2a020,.12,.05,s*.2,g)});g.userData.anim=t=>{g.rotation.z=Math.sin(t*3)*.03};return g}
const pinguin=automerge(pinguinM);
function seekuhM(par){const g=grp(0,0,0,par),f=0x8c8e96;sph(1,f,0,0,0,g,2.1,.9,.85);sph(.5,f,2.1,-.15,0,g,.9,.85,.85);sph(.28,0x7a7c84,2.6,-.28,0,g,1,.75,1.2);[-1,1].forEach(s=>{sph(.05,0x222222,2.45,0,s*.35,g);cyl(.02,.2,0x3a3a3a,2.8,-.26,s*.15,g)});
  [-1,1].forEach(s=>{const p=grp(1.4,-.4,s*.8,g);sph(1,f,0,-.1,s*.3,p,.5,.1,.3);g.userData['f'+s]=p});sph(1,f,-2.3,0,0,g,.9,.45,.5);const tl=grp(-3,0,0,g);sph(1,f,-.5,0,0,tl,.75,.1,1.1);
  g.userData.anim=t=>{tl.rotation.z=Math.sin(t*2)*.2;[-1,1].forEach(s=>{g.userData['f'+s].rotation.x=s*Math.sin(t*2)*.3})};return g}
const seekuh=automerge(seekuhM);
function otterM(par){const g=grp(0,0,0,par),f=0x6a4a30;sph(1,f,0,.5,0,g,1.1,.45,.5);sph(1,0xc8a880,.1,.55,0,g,.8,.35,.42);sph(.36,0xd8c0a0,1.15,.75,0,g,1.1,.95,.95);sph(.1,0x1a1a1a,1.5,.75,0,g,1,.7,1);[-1,1].forEach(s=>{sph(.07,0x1a1a1a,1.4,.9,s*.2,g);sph(.1,f,1.0,1.05,s*.25,g)});
  sph(.3,0xf0a8b8,.7,.9,.25,g,1,.7,1);[-1,1].forEach(s=>{sph(.12,f,.7,.75,s*.4,g,1.5,.6,.6)});cone(.14,1.3,f,-1.45,.4,0,g).rotation.z=Math.PI/2;sph(.18,f,-.6,.25,.4,g,1.4,.5,.7);sph(.18,f,-.6,.25,-.4,g,1.4,.5,.7);g.userData.anim=t=>{g.rotation.z=Math.sin(t*1.5)*.06};return g}
const otter=automerge(otterM);
function anglerM(par){const g=grp(0,0,0,par),f=0x6a76b8;sph(1,f,0,0,0,g,1.1,.95,.8);sph(1,0x4a5698,.9,-.3,0,g,.6,.4,.75);const lc=new THREE.Mesh(new THREE.TorusGeometry(.5,.05,6,12,Math.PI),mat(0x2a2a50));lc.position.set(1.28,-.05,0);lc.rotation.set(0,Math.PI/2,Math.PI);g.add(lc);
  augen(g,.7,.45,.5,.19);cyl(.03,1.2,0x8a7ab0,.5,.9,0,g).rotation.z=-.6;leucht(.14,0xfff08a,1.0,1.4,0,g);const tl=grp(-1.1,0,0,g);box(.4,.8,.05,f,-.2,0,0,tl);g.userData.anim=t=>{tl.rotation.y=Math.sin(t*3)*.4};return g}
const angler=automerge(anglerM);
function murM(par){const g=grp(0,0,0,par),f=0x7a8a3a;for(let i=0;i<10;i++){const u=i/9;sph(.3-u*.12,i%2?f:dk(f,.8),-i*.42,.3+Math.sin(u*5)*.1,Math.sin(u*6)*.5,g,1.5,1,1)}sph(.34,f,.4,.38,.0,g,1.4,1,1);box(.45,.05,.2,0x8a2a2a,.65,.28,0,g);[-1,1].forEach(s=>{for(let i=0;i<3;i++)cone(.025,.1,0xf4f4f4,.5+i*.13,.32,s*.1,g).rotation.z=Math.PI;sph(.06,0xf2d030,.62,.52,s*.17,g)});g.userData.anim=t=>{g.rotation.y=Math.sin(t*1.2)*.12};return g}
const muraene=automerge(murM);
function quallenM(par,c){c=c||0xff9ad8;const g=grp(0,0,0,par);const b=new THREE.Mesh(gSph,new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:.7,depthWrite:false}));b.position.y=.9;b.scale.set(1,.7,1);g.add(b);leucht(.35,0xffffff,0,.9,0,g,1,.7,1);
  for(let i=0;i<6;i++){const a=i*1.05;cyl(.04,1.3+(i%2)*.5,c,Math.cos(a)*.5,.1,Math.sin(a)*.5,g)}g.userData.anim=t=>{const s=Math.sin(t*2.2);b.scale.set(1+s*.08,.7-s*.08,1+s*.08)};return g}
/* U-Boot (gelb, Bullaugen, Turm, Schraube) */
function uboot(par){const g=grp(0,0,0,par);sph(1,0xf2c820,0,0,0,g,4.2,1.7,1.7);box(5.2,.3,.1,0xe0302a,0,-.2,1.55,g);box(5.2,.3,.1,0xe0302a,0,-.2,-1.55,g);sph(.9,0xf2c820,.3,1.6,0,g,1.1,1.1,.8);cyl(.1,1.2,0x5a5a60,.2,2.8,0,g);box(.4,.1,.1,0x5a5a60,.4,3.4,0,g);
  [-1,1].forEach(s=>{for(let i=0;i<4;i++){sph(.36,0xc8e8f4,-1.9+i*1.3,.2,s*1.45,g,1,1,.3);sph(.44,0x4a4a50,-1.9+i*1.3,.2,s*1.4,g,1,1,.2)}});sph(.5,0xf2c820,4.1,.2,0,g,.6,.9,.9);[-1,1].forEach(s=>{sph(.5,0xc8e8f4,3.6,.5,s*.8,g,.5,.6,.35)});
  const pr=grp(-4.4,0,0,g);box(.1,2.2,.35,0x5a5a60,0,0,0,pr);box(.1,.35,2.2,0x5a5a60,0,0,0,pr);cone(.3,.7,0x5a5a60,-4.2,0,0,g).rotation.z=Math.PI/2;
  [-1,1].forEach(s=>box(.5,.1,1.8,0xe0302a,-3.6,.3,s*1.5,g));g.userData.anim=t=>{pr.rotation.x=t*10};return g}
const ubootA=automerge(uboot);
/* Taucher */
function taucherGeraet(m,tank,fl){const k=m.kopf;box(.8,.4,.12,0x1a2a3a,0,.04,.52,k);[-1,1].forEach(s=>{box(.32,.26,.08,0xb8ecff,s*.19,.04,.6,k);sph(.05,0x111111,s*.19,.04,.65,k)});box(.1,.1,.9,0xffffff,0,.5,0,k).rotation.x=.0;
  cyl(.05,.9,0xff7a1a,.42,.5,.1,k);[-1,1].forEach(s=>{cyl(.22,.95,tank,s*.2,1.35,-.42,m.g,true);cyl(.08,.14,0xc8cad0,s*.2,1.9,-.42,m.g)});box(.5,.08,.1,0xc8cad0,0,1.92,-.42,m.g);
  [m.bl,m.br].forEach(b=>{box(.36,.06,.9,fl,0,-.9,.45,b)});box(.5,.2,.1,0x2a2a30,0,.9,.28,m.g)}
const TC=[0xf2c820,0x2a8ad8,0xe0302a,0x4aa84a,0xff7a1a,0xb06ae0],TJ=[0x2a3a5a,0x1a1a22,0x2a5a7a,0x3a3a40,0x6a2a2a,0x2a6a5a];
/* Spielfigur ist Taucherin oder Taucher: Maske, Schnorchel, zwei Flaschen und Flossen (Engine ruft SPIELERMODELL nach dem Bauen der Figur) */
function SPIELERMODELL(m){taucherGeraet(m,0xf2c820,0x2a8ad8);[m.bl,m.br].forEach(b=>{box(.42,.1,1.1,0xffd23a,0,-.8,.62,b)})}
function taucherW(B,v,ph,av,k){const w=grp(0,0,0);const m=kindL(Object.assign({hose:0x1a1a22,haut:0xe8b98f,haar:0x6b4626,stil:'kurz',rucksack:null},av),w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.25);taucherGeraet(m,TC[k%6],TC[(k+2)%6]);
  vmVerschm(m.bl);m.bl.userData.frei=1;vmVerschm(m.br);m.br.userData.frei=1;vmVerschm(m.g);w.userData.anim=t=>{const q=Math.sin(t*5+ph)*.6;m.bl.rotation.x=q;m.br.rotation.x=-q};fahren(w,B,v,ph*B.L/6.3);return w}
function taucherSteh(x,z,rot,k,s){kreis(x,z,.55);const m=kindL({jacke:TJ[k%6],hose:0x1a1a22,haut:k%3===0?0xc8946a:0xe8b98f,haar:[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d][k%4],stil:['kurz','zoepfe','cap','pferd'][k%4],rucksack:null},scene);m.g.position.set(x,0,z);m.g.rotation.y=rot||0;m.g.scale.setScalar(s||1.3);taucherGeraet(m,TC[k%6],TC[(k+3)%6]);return m}
function delfinM(par){const g=grp(0,0,0,par),f=0x7c9cb4,b=0xe6eef2;
  sph(.5,f,0,0,0,g,2.6,.8,.75).castShadow=true;sph(.4,b,.1,-.18,0,g,2.2,.45,.6);sph(.42,f,1.15,.12,0,g,.9,.85,.85);cyl(.09,.9,f,1.95,.0,0,g).rotation.z=Math.PI/2-.08;sph(.045,0x111111,1.35,.28,.28,g);sph(.045,0x111111,1.35,.28,-.28,g);
  cone(.2,.55,f,.1,.55,0,g).rotation.z=-.45;[-1,1].forEach(s=>{box(.55,.06,.3,f,.55,-.3,s*.45,g).rotation.z=-.4});
  const tl=grp(-1.4,0,0,g);box(.5,.1,.3,f,0,0,0,tl);box(.5,.1,.3,f,-.15,0,0,tl);[-1,1].forEach(s=>box(.5,.08,.34,f,-.55,0,s*.4,tl).rotation.y=s*.4);
  g.userData.anim=t=>{tl.rotation.z=Math.sin(t*5)*.25};return g}
const delfin=automerge(delfinM);
function landFl(P,farbe,y,tr){const sh=new THREE.Shape();P.forEach((p,i)=>i?sh.lineTo(p[0],-p[1]):sh.moveTo(p[0],-p[1]));const m=new THREE.Mesh(new THREE.ShapeGeometry(sh),tr||mat(farbe));m.rotation.x=-Math.PI/2;m.position.y=y;m.receiveShadow=true;scene.add(m);return m}
const bandE=(z,x)=>z+4*Math.sin(x*.045+z*.3)+3*Math.sin(x*.11+z);
function bandFl(zA,zB,farbe,y){const up=[],dn=[];for(let x=-190;x<=190;x+=19)up.push([x,bandE(zB,x)]);for(let x=190;x>=-190;x-=19)dn.push([x,bandE(zA,x)]);return landFl(up.concat(dn),farbe,y)}
/* ---------- Bewegung: Rundkurse, Blasen, Schwärme ---------- */
/* g schwimmt auf einer Ellipse um (cx,cz); Anfangsstellung wird sofort gesetzt */
function kreisen(g,cx,cz,rx,rz,y,sp,ph,dy){g.userData.keep=1;const an=g.userData.anim,sg=sp<0?-1:1;g.userData.anim=t=>{if(an)an(t);const a=t*sp+ph,x=cx+Math.cos(a)*rx,z=cz+Math.sin(a)*rz;g.position.set(x,y+Math.sin(t*.7+ph*2)*(dy==null?.4:dy),z);g.rotation.y=Math.atan2(-Math.cos(a)*rz*sg,-Math.sin(a)*rx*sg)};g.userData.anim(ph/(sp||1)*0);leben(g,ph);return g}
/* g steht an Ort und wiegt sich */
function wiegen(g,ph,a){g.userData.keep=1;const an=g.userData.anim,y0=g.position.y,r0=g.rotation.y;g.userData.anim=t=>{if(an)an(t);g.position.y=y0+Math.sin(t*1.1+ph)*.12*(a||1);g.rotation.y=r0+Math.sin(t*.5+ph)*.15};leben(g,ph);return g}
function geoVon(fn){const g=new THREE.Group();fn(g);g.updateMatrixWorld(true);vmVerschm(g);const l=[];g.children.forEach(c=>{if(c.isMesh)l.push(c.geometry)});return l[0]}
function schwarmG(geo,n,cols,fn,cx,cz,vis,mt){const im=new THREE.InstancedMesh(geo,mt||VMAT2,n);im.frustumCulled=false;scene.add(im);const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),P=new THREE.Vector3(),S=new THREE.Vector3(),E=new THREE.Euler(),C=new THREE.Color();
  for(let i=0;i<n;i++)im.setColorAt(i,C.set(cols?cols[i%cols.length]:0xffffff));im.instanceColor.needsUpdate=true;
  const an=t=>{if(Math.hypot(camera.position.x-cx,camera.position.z-cz)>(vis||125)){im.visible=false;return}im.visible=true;for(let i=0;i<n;i++){const a=fn(i,t);P.set(a[0],a[1],a[2]);S.set(a[3],a[4],a[5]);Q.setFromEuler(E.set(a[7]||0,a[6]||0,a[8]||0,'YXZ'));M.compose(P,Q,S);im.setMatrixAt(i,M)}im.instanceMatrix.needsUpdate=true};
  lebendig.push({o:{userData:{anim:an}},ph:0});an(0);return im}
function fischGeo(o){return geoVon(g=>fischM(g,o))}
/* Fischschwarm: ein Anführer fährt auf einer Ellipse, die Fische schwirren um ihn */
function fischZug(geo,n,cx,cz,rx,rz,y0,dy,sp,sz,cols,sprd,vis){sprd=sprd||2.6;return schwarmG(geo,n,cols,(i,t)=>{const a=t*sp,lx=cx+Math.cos(a)*rx,lz=cz+Math.sin(a)*rz,hd=Math.atan2(-Math.cos(a)*rz,-Math.sin(a)*rx),c=Math.cos(hd),s=Math.sin(hd);
  const u=(((i*7919)%97)/97-.5)*sprd*3,v=(((i*104729)%89)/89-.5)*sprd*2;
  return[lx+u*c+v*s+Math.sin(t*.9+i)*.3,y0+Math.sin(a*2)*dy+(((i*31)%7)/7-.5)*sprd*.8+Math.sin(t*1.3+i)*.2,lz-u*s+v*c+Math.cos(t*.8+i)*.3,sz,sz,sz,hd+Math.sin(t*4+i)*.12]},cx,cz,vis)}
const gBlase=new THREE.SphereGeometry(1,5,3);
/* Luftblasen steigen auf (nur bei fest=true: nur im Finale) */
function blasen(x,z,h,n,r,fest){const im=schwarmF(gBlase,n,[0xe8fbff,0xcdf2ff],(i,t)=>{const u=((t*(.35+(i%3)*.08)+i/n)%1),y=.5+u*h,s=(.1+(i%4)*.05)*(1+u*.6);return[x+Math.sin(u*9+i*2)*r*(.3+u),y,z+Math.cos(u*7+i)*r*(.3+u),s,s,s,0]},x,z);im.material.transparent=true;im.material.opacity=.62;im.material.depthWrite=false;
  if(fest){im.visible=false;lebendig.push({o:{userData:{anim:t=>{const f=(typeof finale!=='undefined'&&finale)?1:0;if(!f)im.visible=false}}},ph:0})}return im}
/* Schwankender Tang: eine Instanzgruppe, Spitzen schwingen */
let KELPG;
function kelpGeo(){return KELPG||(KELPG=geoVon(g=>{mesh(gCylL,0x7a7a28,0,.5,0,.06,1,.06,g);[.38,.62,.86].forEach((y,i)=>{mesh(gSphXL,0x8a8a30,Math.sin(i*2)*.14,y,Math.cos(i*2)*.1,.34,.19,.1,g).rotation.y=i*1.1;mesh(gSphXL,0x6a7a24,-Math.sin(i*2)*.12,y+.07,-Math.cos(i*2)*.1,.3,.15,.09,g).rotation.y=-i})}))}
function kelpFeld(cx,cz,rx,rz,n,h0,h1,cols,hartes){const P=[];for(let i=0;i<n;i++){const a=nr()*6.28,d=Math.sqrt(nr());P.push([cx+Math.cos(a)*rx*d,cz+Math.sin(a)*rz*d,h0+nr()*(h1-h0),nr()*6])}
  if(hartes)P.forEach(p=>{if(nr()<.5)kreis(p[0],p[1],.55)});
  return schwarmG(kelpGeo(),n,cols||[0xffffff,0xe0f0c8,0xf0e8b0],(i,t)=>{const p=P[i];return[p[0],0,p[1],.85,p[2],.85,p[3],Math.sin(t*.8+p[3])*.1,Math.cos(t*.65+p[3]*1.3)*.1]},cx,cz,150)}
/* Quallenschwarm: Glocken und Fangfäden in zwei Instanzgruppen, leuchtend */
let QG,QF;
function quallen(cx,cz,rx,rz,n,y0,cols,sz){QG=QG||new THREE.SphereGeometry(1,8,5,0,6.2832,0,1.75);QF=QF||geoVon(g=>{for(let i=0;i<5;i++){const a=i*1.25;cyl(.035,1.5+(i%2)*.7,0xffffff,Math.cos(a)*.45,-.75-(i%2)*.35,Math.sin(a)*.45,g)}});
  sz=sz||1;const mt=new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:.66,depthWrite:false,emissive:0x2a3a58,side:THREE.DoubleSide}),mf=new THREE.MeshLambertMaterial({color:0xffffff,transparent:true,opacity:.5,depthWrite:false,emissive:0x2a3a58});
  const fn=(i,t)=>{const s=Math.sin(t*2+i),q=(1+s*.1)*sz,x=cx+Math.cos(t*.1+i*2.3)*rx*(.35+((i*37)%10)/16),z=cz+Math.sin(t*.09+i*1.7)*rz*(.35+((i*53)%10)/16),y=y0+((i*13)%7)*1.0+Math.sin(t*.7+i)*.9;return[x,y,z,q,(1-s*.1)*.7*sz,q,0]};
  const a=schwarmG(QG,n,cols,fn,cx,cz,125,mt),b=schwarmG(QF,n,cols,(i,t)=>{const r=fn(i,t);r[3]=sz;r[4]=sz*(1-Math.sin(t*2+i)*.1);r[5]=sz;return r},cx,cz,125,mf);return[a,b]}
/* ==================== Etappe 1: Fläche, Wege, Eingang, Ausgang, Festplatz, Kulisse ==================== */
function qLampe(x,y,z,c,par){const g=grp(x,y,z,par);const b=leucht(.7,c,0,0,0,g,1,.72,1);for(let i=0;i<6;i++){const a=i*1.05;cyl(.04,1.2+(i%2)*.5,c,Math.cos(a)*.4,-.7,Math.sin(a)*.4,g)}g.userData.keep=1;const ph=nr()*6;bewegt(g,t=>{g.position.y=y+Math.sin(t*.8+ph)*.3;b.scale.set(.7*(1+Math.sin(t*2+ph)*.07),.5,.7*(1+Math.sin(t*2+ph)*.07))});return g}
function etappe1(){
  WASSER=0x4ab8d8;
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(1400,1400),mat(SAND));boden.rotation.x=-Math.PI/2;boden.receiveShadow=true;scene.add(boden);
  bandFl(160,70,SAND3,.02);bandFl(0,-60,SAND2,.02);bandFl(-90,-150,0xd2c690,.02);bandFl(-150,-250,0xb8b48c,.02);
  [[-100,40,26],[60,0,22],[-30,-60,20],[120,-40,24],[-140,-110,22],[90,-130,20],[0,-170,26],[-60,90,18],[110,90,20],[-130,10,20],[140,30,18]].forEach(p=>inst('sphT',p[0],0,p[1],p[2],.05,p[2]*.7,SAND3));
  hauptweg(5);
  SEITENWEGE.forEach(r=>{weg(strasse(r),4);const px=wegX(r);kreuzplatz(px,roadZ(px,r),7.5)});
  /* Zusätzliche Bögen: Ringweg West und Ost (verbinden die Querwege) */
  weg(spl([[-150,94],[-156,60],[-150,20],[-154,-20],[-150,-58],[-156,-100],[-150,-110]],10),3);weg(spl([[150,94],[156,50],[150,10],[154,-30],[150,-58],[156,-100],[150,-110]],10),3);
  weg([[0,TORZ+2],[0,TORZ-24]],5,FARBEN.platz);scheibe(FEST.x,FEST.z,17,FARBEN.platz,.08);scheibe(0,114,12,FARBEN.platz,.07);
  /* ---------- Ausgang (Tor wird geöffnet): zwei Korallensäulen ---------- */
  ausgang=(function(){const g=grp(0,0,TORZ);g.userData.keep=1;[-1,1].forEach(s=>{cyl(.9,6.8,0xe8708a,s*4.4,3.4,0,g,true);for(let k=0;k<3;k++)cyl(.95,.4,0xb84a6a,s*4.4,1+k*2.2,0,g);sph(1,0xff9a7a,s*4.4,7.2,0,g,1,.8,1);for(let k=0;k<5;k++){const a=k*1.25;cone(.22,1.5,0xffc84a,s*4.4+Math.cos(a)*.6,8.1,Math.sin(a)*.6,g)}});
    box(10.8,1,.7,0x5a7a8a,0,6.3,0,g,true);box(11,.3,1,0x3a9a8a,0,6.95,0,g);for(let i=0;i<9;i++){const x=-4.6+i*1.15;cyl(.04,1.2+(i%3)*.7,0x2e8a5a,x,5.4-(i%3)*.35,.2,g)}
    const s=schildText('Ausgang','#e6f6ff',5.4,1.3);s.position.set(0,6.3,.4);g.add(s);
    const fl=[-1,1].map(s=>{const p=grp(s*4,0,0,g);box(3.8,3.4,.25,0x4a8a9a,s*-1.9,1.9,0,p,true);for(let i=0;i<5;i++)box(.1,3.2,.3,i%2?0x2f6a7a:0x5a9aaa,s*-1.9+(i-2)*.7,1.9,0,p);box(3.8,.2,.34,0xe8708a,s*-1.9,1,0,p);box(3.8,.2,.34,0xe8708a,s*-1.9,2.8,0,p);sph(.3,0xffd45e,s*-3.4,1.9,.2,p);return p});
    kreis(-4.4,TORZ,1.1);kreis(4.4,TORZ,1.1);return {g,fl,offen:0}})();
  /* ---------- Eingangstor: Korallensäulen, Girlande, Tilda, Taucher ---------- */
  (function(){const ez=111;[-1,1].forEach(s=>{cyl(.8,6.6,0xf08a6a,s*7,3.3,ez,scene,true);for(let k=0;k<3;k++)cyl(.85,.4,0xc0503a,s*7,1+k*2.2,ez,scene);sph(1,0xffb04a,s*7,7.2,ez,scene,1,.8,1);for(let k=0;k<5;k++){const a=k*1.25;cone(.2,1.6,0xff7aa0,s*7+Math.cos(a)*.6,8.2,ez+Math.sin(a)*.6,scene)}kreis(s*7,ez,1.05)});
    box(14.8,.9,.8,0x4a7a8a,0,6.2,ez,scene,true);box(15.2,.35,1.2,0x3a9a8a,0,6.85,ez,scene);const sn=schildText(CONFIG.spielname,'#fff8e6',7.5,1.6,CONFIG.spielname.length>12?44:60);sn.position.set(0,6.2,ez+.45);scene.add(sn);
    for(let i=0;i<13;i++){const t=i/12,x=-6.6+t*13.2;cyl(.04,1+Math.sin(t*9)*.4+.5,0x2e8a5a,x,5.5-Math.sin(t*3.14)*.6,ez+.5,scene)}
    for(let i=0;i<5;i++)sph(.22,[0xff7a5a,0xffd45e,0xf47ab0,0x7ad0e8,0xb06ae0][i],-4.5+i*2.2,5.3,ez+.7,scene,1,1,.6);
    blasen(-7,ez+1,12,10,.6);blasen(7,ez+1,12,10,.6);
    [[-15,104],[15,104]].forEach((p,i)=>{cyl(.1,6,0x8a9aa4,p[0],3,p[1],scene,true);const fl=grp(p[0],5.4,p[1]);for(let k=0;k<4;k++)box(.4,.5,.04,k%2?0xffffff:[0xe0302a,0x2a8ad8][i],.4+k*.4,0,0,fl);vm(fl);bewegt(fl,t=>{fl.rotation.y=Math.sin(t*1.7)*.18});kreis(p[0],p[1],.3)});
    const f=tilda(scene);f.position.set(9,.4,124);f.rotation.y=-2.6;f.scale.setScalar(1.7);lebendig.push({o:f,ph:3});kreis(9,124,1.7);
    taucherSteh(-5,117,.4,0,1.3);taucherSteh(5,118,3.4,1,1.25);taucherSteh(-14,122,1.2,2,1.15);
    box(5,.12,3,0xc8a870,-18,.9,121,scene,true);[[-2.3,-1.3],[2.3,-1.3],[-2.3,1.3],[2.3,1.3]].forEach(p=>cyl(.1,.9,0x8a6a40,-18+p[0],.45,121+p[1],scene));for(let i=0;i<3;i++)cyl(.22,.9,TC[i],-19+i*.9,1.5,121,scene);sperrKasten(-18,121,5.2,3.2,0);
    [[-16,134],[20,132]].forEach(p=>{seegrasBusch(p[0],p[1],1.5);inst('sph',p[0]+2,.4,p[1],1,.6,.9,GRAU[0]);hirn(p[0]+3,p[1]+1,1.2)})})();
  /* ---------- Festplatz: Sandfläche mit Muschelbühne "Geschafft!", Quallen-Lichterketten ---------- */
  (function(){const z0=FEST.z,bue=grp(0,0,z0-12);box(16,1,6,0xd8c8a0,0,.5,0,bue,true);box(16.4,.3,6.4,0xf0e4c0,0,1.05,0,bue);
    [[-7,5,.75,0xe8708a],[-5.4,7,.75,0xff9a7a],[-3.8,9,.8,0xffb04a],[-2.2,10.5,.8,0xf47ab0],[-.7,11.5,.85,0xb06ae0],[.8,11.5,.85,0x7ad0e8],[2.3,10.5,.8,0xf47ab0],[3.9,9,.8,0xffb04a],[5.5,7,.75,0xff9a7a],[7.1,5,.75,0xe8708a]].forEach((p,i)=>{cyl(p[2],p[1],p[3],p[0],1.2+p[1]/2,-2.6,bue,true);sph(p[2]*1.05,dk(p[3],1.2),p[0],1.2+p[1]+.2,-2.6,bue,1,.55,1)});
    [-1,1].forEach(s=>{cyl(.5,9,0x6a8a9a,s*9.4,4.5,-2.6,bue,true);sph(1.2,0xff9a7a,s*9.4,9.2,-2.6,bue,1,.8,1)});box(17,.5,.5,0x5a7a8a,0,12.2,-2.6,bue);
    const gs=schildText('Geschafft!','#fff0b0',9,2);gs.position.set(0,13.6,-2.4);bue.add(gs);box(10,3,.3,0x2a6a7a,0,13.6,-2.65,bue);kreis(0,z0-12,9);
    const farben=[0xff7a5a,0xffd45e,0x4caf9a,0x3b8fc4,0xf47ab0,0xb06ae0];for(let i=0;i<26;i++){const t=i/25,x=-14+t*28,y=7.2-Math.sin(t*Math.PI)*2.2;leucht(.3,farben[i%6],x,y,z0-8,scene)}
    [-14,14].forEach(x=>{cyl(.15,8,0x6a8a9a,x,4,z0-8,scene,true);kreis(x,z0-8,.3)});[-9,-4.5,0,4.5,9].forEach((x,i)=>qLampe(x,6.2+(i%2)*1.2,z0-6,[0xff9ad8,0x9ad8ff,0xffe08a,0xb8ffd0,0xd8a0ff][i]));
    [-12,12].forEach(x=>{cyl(.9,.6,0x4a6a7a,x,1.6,z0+4,scene,true);cyl(.15,1.4,0x4a6a7a,x,.7,z0+4,scene);cyl(.6,1.2,0xe8708a,x,.1,z0+4,scene);leucht(.8,0xaaf0ff,x,3.3,z0+4,scene);kreis(x,z0+4,1.1);blasen(x,z0+4,16,12,.5)});
    [[-10,z0+14],[10,z0+14]].forEach((p,i)=>{const g=grp(p[0],0,p[1]);box(5,2.4,3.2,[0xf0e4c8,0xe8d8b0][i],0,1.2,0,g,true);for(let k=0;k<6;k++)box(5/6,.12,1.6,k%2?0x2a8ad8:0xffffff,-2.08+k*.83,2.5,1.7,g).rotation.x=.3;box(1.6,1.4,.14,0x4a6a7a,0,1.0,1.6,g);sperrKasten(p[0],p[1],5,3.2,0)});
    [[-12,z0+22],[12,z0+22],[-4,z0+25],[4,z0+25]].forEach(p=>{cyl(.8,.1,0xd8c8a0,p[0],.9,p[1],scene,true);cyl(.16,.9,0x6a8a9a,p[0],.45,p[1],scene);kreis(p[0],p[1],.9);[[-1.8,0],[1.8,0]].forEach(q=>{sph(.7,0xf0dcc8,p[0]+q[0],.35,p[1]+q[1],scene,1,.5,1);kreis(p[0]+q[0],p[1]+q[1],.7)})});
    [[-6,z0-2],[6,z0-2],[-16,z0+8],[16,z0+8],[-8,z0+19],[8,z0+19]].forEach(p=>{cyl(.08,3.4,0x6a8a9a,p[0],1.7,p[1],scene,true);leucht(.35,0xfff0b8,p[0],3.5,p[1],scene);kreis(p[0],p[1],.3)});
    for(let i=0;i<40;i++){const a=nr()*6.28,r=20+nr()*14;const x=Math.cos(a)*r,z=z0-4+Math.sin(a)*r*.7;if(z<-232||z>-192)continue;if(i%2)seegrasBusch(x,z,1);else hirn(x,z,.8)}
    for(let k=0;k<4;k++)turm(-24+k*16,z0-22,1.1+(k%2)*.3,kc(k*2+1));
  })();
}
/* ---------- Kulisse: Riffwand rundum (fest, außerhalb der Welt) ---------- */
function kulisse(){
  const hu=(x,z,R,H,k)=>{inst('sph',x,H*.1,z,R,H*.75,R*1.1,[0x4a8a9a,0x3f7a8a,0x578ea0,0x467a90][k%4]);inst('blm',x+R*.2,H*.7,z,R*.65,H*.32,R*.6,[0x5a9aaa,0x6aa8b0][k%2]);inst('blm',x-R*.3,H*.55,z+R*.2,R*.5,H*.28,R*.5,0x3f8a9a)};
  for(let x=-330,i=0;x<=330;x+=42,i++){hu(x,-300-(i%3)*18,44+(i*7)%16,70+(i*13)%40,i);hu(x+16,-262-(i%2)*10,34,48+(i*11)%24,i+1)}
  for(let x=-330,i=0;x<=330;x+=46,i++){if(Math.abs(x)<60)continue;hu(x,206+(i%3)*14,40+(i*5)%14,50+(i*9)%30,i)}
  for(let z=-260,i=0;z<=190;z+=40,i++){hu(-222-(i%3)*12,z,40+(i*7)%14,56+(i*11)%36,i);hu(222+(i%3)*12,z+10,40+(i*5)%14,54+(i*13)%34,i+2);hu(-290,z-8,52,90+(i*9)%40,i);hu(290,z-8,52,92+(i*7)%40,i+1)}
  /* Korallentürme am Rand */
  for(let x=-186,i=0;x<=186;x+=15,i++){if(Math.abs(x)>12)turm(x+(i%3)*2,155+(i%2)*4,1.1+(i%3)*.3,kc(i),false);turm(x+(i%3)*2,-242-(i%2)*4,1.2+(i%3)*.3,kc(i+3),false)}
  for(let z=-230,i=0;z<=146;z+=15,i++){turm(-188-(i%2)*4,z,1.1+(i%3)*.3,kc(i+5),false);turm(188+(i%2)*4,z,1.1+(i%3)*.3,kc(i+7),false)}
}
/* ==================== Kleinteile und Ortsgerüst ==================== */
function P(n,fn,o){o=o||{};const b=zone(n),L=lay(b);ast(b,o.w,o.bend);if(o.d!==false)scheibe(b.x,b.z,b.r-(o.dr==null?1.5:o.dr),o.c||SAND3,.1);fn(b,L.x,L.z,L.r,b.x,b.z)}
function kisteU(x,z,c,rot,par){const g=grp(x,0,z,par);g.rotation.y=rot||0;box(1.3,.9,1,c||0x9a6a3a,0,.45,0,g,true);box(1.4,.12,1.1,dk(c||0x9a6a3a,.7),0,.92,0,g);box(.12,.9,1.02,dk(c||0x9a6a3a,.6),-.4,.45,0,g);box(.12,.9,1.02,dk(c||0x9a6a3a,.6),.4,.45,0,g);if(!par)kreis(x,z,.85);return g}
function amphore(x,z,s,c,kol){s=s||1;c=c||0xc87a4a;const g=grp(x,0,z);sph(.6*s,c,0,.7*s,0,g,1,1.15,1);cyl(.24*s,.5*s,c,0,1.55*s,0,g);cyl(.32*s,.1*s,dk(c,.7),0,1.82*s,0,g);[-1,1].forEach(q=>{const t=new THREE.Mesh(new THREE.TorusGeometry(.2*s,.05*s,4,8,Math.PI),mat(dk(c,.8)));t.position.set(q*.2*s,1.55*s,0);t.rotation.z=q>0?-Math.PI/2:Math.PI/2;g.add(t)});box(.9*s,.08*s,.9*s,dk(c,.6),0,1.0*s,0,g);g.rotation.z=(s>1?0:0);if(kol!==false)kreis(x,z,.65*s);return g}
function fass(x,z,c){cyl(.55,1.1,c||0x8a5a32,x,.55,z,scene,true);[.2,.9].forEach(y=>cyl(.58,.1,0x3a3a40,x,y,z,scene));kreis(x,z,.6)}
function eimer(x,z,f,inhalt){const g=grp(x,0,z);cyl(.34,.5,f,0,.25,0,g,true);const h=new THREE.Mesh(new THREE.TorusGeometry(.3,.025,5,10,Math.PI),mat(0x6a6a70));h.position.y=.48;g.add(h);if(inhalt)for(let i=0;i<3;i++)sph(.13,inhalt,(i-1)*.16,.52,(i%2)*.1,g,1.3,.7,.8);kreis(x,z,.45);return g}
function anker(x,z,rot,s){s=s||1;const g=grp(x,0,z);g.rotation.y=rot||0;cyl(.1*s,2.6*s,0x4a4a52,0,1.5*s,0,g,true);box(1.6*s,.12*s,.12*s,0x4a4a52,0,2.5*s,0,g);const t=new THREE.Mesh(new THREE.TorusGeometry(.8*s,.1*s,5,12,Math.PI),mat(0x4a4a52));t.position.set(0,.5*s,0);t.rotation.z=Math.PI;g.add(t);const r=new THREE.Mesh(new THREE.TorusGeometry(.25*s,.05*s,5,8),mat(0x4a4a52));r.position.set(0,2.9*s,0);g.add(r);g.rotation.z=.15;kreis(x,z,.9*s);return g}
function ketteU(x,z,len){for(let i=0;i<len;i++)box(.14,.14,.2,0x5a5a62,x+(i%2)*.1,.1,z+i*.28,scene)}
function boje(x,z,c,h){cyl(.05,h||5,0x6a6a72,x,(h||5)/2,z,scene);sph(.55,c||0xe0302a,x,h||5,z,scene,1,1,1);sph(.2,0xffffff,x,(h||5)+.55,z,scene);kreis(x,z,.3)}
function schild2(x,z,rot,c){const g=grp(x,0,z);g.rotation.y=rot||0;cyl(.06,2.6,0x8a9aa4,0,1.3,0,g,true);box(1.2,.8,.08,c||0xff7a1a,0,2.4,0,g);box(.7,.12,.09,0xffffff,0,2.4,0,g);kreis(x,z,.3)}
function tauchflagge(x,z){cyl(.05,3.2,0x8a9aa4,x,1.6,z,scene,true);const f=grp(x,3,z);box(1.3,.9,.05,0xe0302a,.65,0,0,f);box(1.3,.18,.06,0xffffff,.65,0,0,f).rotation.z=-.5;vm(f);bewegt(f,t=>{f.rotation.y=Math.sin(t*1.7)*.2});kreis(x,z,.2)}
function flaschenGestell(x,z,rot,n){const g=grp(x,0,z);g.rotation.y=rot||0;n=n||5;box(n*.7+.4,.1,.8,0x5a6a72,0,.4,0,g,true);box(n*.7+.4,.1,.8,0x5a6a72,0,1.5,0,g);for(let i=0;i<n;i++){const xx=-(n-1)*.35+i*.7;cyl(.28,1.7,TC[i%6],xx,1.2,0,g,true);sph(.28,TC[i%6],xx,2.05,0,g);cyl(.07,.2,0xc8cad0,xx,2.4,0,g)}[-1,1].forEach(s=>cyl(.07,1.6,0x5a6a72,s*(n*.35+.1),.8,0,g));sperrKasten(x,z,n*.7+.4,.9,rot||0);return g}
function bojenReihe(x1,z1,x2,z2,n,y){for(let i=0;i<n;i++){const t=i/(n-1),x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;cyl(.03,y||2,0xaaaaaa,x,(y||2)/2,z,scene);leucht(.24,[0xffd45e,0xff7a5a,0x7ad0e8][i%3],x,y||2,z,scene)}}
function felsTor(x,z,w,h,rot){const g=grp(x,0,z);g.rotation.y=rot||0;[-1,1].forEach((s,i)=>{sph(1,GRAU[i],s*w/2,h*.4,0,g,w*.28,h*.55,w*.3);sph(1,GRAU[i+2],s*w*.42,h*.8,0,g,w*.2,h*.35,w*.25)});sph(1,GRAU[1],0,h*.95,0,g,w*.62,h*.18,w*.22);const c=Math.cos(rot||0),s2=Math.sin(rot||0);[-1,1].forEach(s=>kreis(x+s*w/2*c,z-s*w/2*s2,w*.28));return g}
function felsHaufen(x,z,r,n,h){const a=[];for(let i=0;i<n;i++){const q=i/n*6.28+nr(),d=r*(.3+nr()*.7),px=x+Math.cos(q)*d,pz=z+Math.sin(q)*d,s=(.7+nr()*.9)*(h||1);sph(s,GRAU[i%5],px,s*.55,pz,scene,1.2,.8,1);kreis(px,pz,s*1.05);a.push([px,pz,s])}return a}
/* ==================== Etappe 2: Orte 1 bis 8 (Süden) ==================== */
function ort1(){P('Tauchstation',(b,X,Z,R,bx,bz)=>{
  const g=grp(bx,0,bz-2*b.dir);g.rotation.y=R;box(8,3.2,5.4,0xf0eadc,0,1.6,0,g,true);[-1,1].forEach(s=>box(8.4,.16,3.4,0x2a8ad8,0,3.5,s*1.4,g).rotation.x=-s*.35);box(8,.9,.12,0x2a8ad8,0,2.9,2.74,g);box(1.6,2.2,.14,0x6a4a2a,-1.8,1.1,2.74,g);[1.2,3.2].forEach(x=>{box(1.5,1.2,.14,0x4a5a64,x,1.9,2.74,g);box(1.3,1,.16,0xb8ecff,x,1.9,2.76,g)});sperrKasten(bx,bz-2*b.dir,8.2,5.6,R);
  box(5,.14,1.6,0xc8a870,0,.35,4.3,g,true);box(.2,.7,.2,0x8a6a40,-2.4,.35,3.6,g);box(.2,.7,.2,0x8a6a40,2.4,.35,3.6,g);
  flaschenGestell(X(-9),Z(2),R,5);flaschenGestell(X(9.5),Z(1),R+.3,4);tauchflagge(X(-5.5),Z(6));tauchflagge(X(5.5),Z(6.4));
  /* Boot an der Oberfläche mit Strickleiter */
  const bt=grp(X(-4),22,Z(-2));bt.rotation.y=R+.5;sph(1,0xf4f4f8,0,0,0,bt,6,1.6,2.4);box(10,.3,3.6,0xffffff,0,1.0,0,bt);box(10.4,.3,.3,0x2a8ad8,0,.6,2.3,bt);box(10.4,.3,.3,0x2a8ad8,0,.6,-2.3,bt);box(2.4,2,2.2,0xf0eadc,1,2.2,0,bt);box(2.5,.8,2.3,0x2a8ad8,1,3.5,0,bt);cyl(.1,3,0x6a6a72,-2.5,2.5,0,bt);box(.1,1.4,.9,0xe0302a,-2.5,3.9,0,bt);vm(bt);bt.userData.keep=1;bewegt(bt,t=>{bt.position.y=22+Math.sin(t*.7)*.5;bt.rotation.z=Math.sin(t*.6)*.05});
  [-.5,.5].forEach(s=>cyl(.04,10,0xc8a870,X(-4)+s,5,Z(-2)+3.5,scene));for(let i=0;i<7;i++)box(1,.08,.12,0xc8a870,X(-4),1.2+i*1.3,Z(-2)+3.5,scene);
  taucherSteh(X(-2),Z(7),R+3.14,0,1.3);taucherSteh(X(2.5),Z(7.5),R+3.0,2,1.25);kisteU(X(8),Z(7),0x2a8ad8,.3);kisteU(X(9.3),Z(7.4),0xff7a1a,.1);
  blasen(X(0),Z(9),10,8,.5);seegrasBusch(X(11),Z(-4),1.4);
  const k=clownF(scene);k.scale.setScalar(1.6);kreisen(k,X(2),Z(11),3,2,1.6,.9,0);const k2=doktorF(scene);k2.scale.setScalar(1.6);kreisen(k2,X(-3),Z(12),3.4,2,2.2,-.8,2)})}
function ort2(){P('Forschungsstation',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz,7,0xd8d0c0,.16);const dm=new THREE.Mesh(new THREE.SphereGeometry(1,16,8,0,6.2832,0,1.5708),new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.34,depthWrite:false,side:THREE.DoubleSide}));dm.position.set(bx,.2,bz);dm.scale.set(6,5.4,6);scene.add(dm);
  const t=new THREE.Mesh(new THREE.TorusGeometry(1,.035,4,16,Math.PI),mat(0x5a6a74));for(let i=0;i<4;i++){const q=t.clone();q.position.set(bx,.2,bz);q.scale.set(6,5.4,6);q.rotation.y=i*.785;scene.add(q)}cyl(6.1,.3,0x5a6a74,bx,.3,bz,scene,true);sperrRing(bx,bz,6.3,36,R+Math.PI/2);
  sperrKasten(bx-1,bz-1.5,3,1.2,0);kreis(bx+2.5,bz+1,.9);sperrKasten(bx-3,bz+2.2,2.6,1.2,0);box(3,.12,1.2,0xe8e8f0,bx-1,1.0,bz-1.5,scene,true);box(2.6,.7,.5,0x2a3a4a,bx-1,1.6,bz-1.9,scene);box(2.2,.5,.04,0x7ad0e8,bx-1,1.6,bz-1.64,scene);cyl(.5,.9,0xe0e8f0,bx+2.5,.5,bz+1,scene);sph(.9,0x4aa8d8,bx+2.5,1.4,bz+1,scene,1,.8,1);for(let i=0;i<4;i++){cyl(.12,.5,[0xe0302a,0x4caf6a,0xf2c820,0x2a8ad8][i],bx-3+i*.4,1.2,bz+2,scene)}box(2.6,.12,1.2,0xe8e8f0,bx-3,.9,bz+2.2,scene);
  const md=g=>{cyl(1.7,5.4,0xe8e8f0,0,0,0,g,true).rotation.z=Math.PI/2;[-1.6,0,1.6].forEach(x=>sph(.45,0xb8ecff,x,.7,1.6,g,1,1,.3));cyl(1.9,.3,0x2a8ad8,-2.6,0,0,g).rotation.z=Math.PI/2;cyl(1.9,.3,0x2a8ad8,2.6,0,0,g).rotation.z=Math.PI/2};
  const m1=grp(X(13),1.7,Z(-3));md(m1);sperrKasten(X(13),Z(-3),5.6,3.6,0);cyl(.5,3,0xe8e8f0,X(8.5),1.2,Z(-3),scene).rotation.z=Math.PI/2;
  const m2=grp(X(-12),1.7,Z(4));m2.rotation.y=1.2;md(m2);sperrKasten(X(-12),Z(4),5.6,3.6,1.2);
  cyl(.1,6,0x6a6a72,X(14),5.5,Z(-5),scene,true);const sc=grp(X(14),8.6,Z(-5));box(2.4,.1,1.4,0x2a3a6a,0,0,0,sc).rotation.x=.5;sph(.6,0xe8e8f0,0,.4,0,sc);vm(sc);bewegt(sc,t=>{sc.rotation.y=t*.4});kreis(X(14),Z(-5),.3);
  /* ROV (gelbe Drohne) */
  const rov=grp(0,0,0);box(1.6,.8,1.2,0xf2c820,0,0,0,rov,true);[-.8,.8].forEach(s=>{cyl(.35,.2,0x2a2a30,s,.5,0,rov);cyl(.3,.15,0x2a2a30,s,-.3,.5,rov)});leucht(.2,0xffffff,.8,0,.4,rov);leucht(.2,0xffffff,.8,0,-.4,rov);cyl(.03,2.8,0x2a2a30,-1,.8,0,rov).rotation.z=.6;
  vm(rov);rov.userData.keep=1;const rp=bx+3;rov.userData.anim=t=>{const a=t*.4;rov.position.set(rp+Math.cos(a)*9,2.5+Math.sin(t*1.3)*.5,bz+Math.sin(a)*9);rov.rotation.y=-a-Math.PI/2};rov.userData.anim(0);scene.add(rov);leben(rov,1);
  taucherSteh(X(5),Z(-8),R+1,3,1.3);taucherSteh(X(-6),Z(9),R+3,1,1.3);riff(bx,bz-12*b.dir,5,6);blasen(X(0),Z(11),10,8,.5)},{dr:1})}
function ort3(){P('Tauchschule',(b,X,Z,R,bx,bz)=>{
  const g=grp(bx,0,bz-3*b.dir);g.rotation.y=R;[[-4,-2],[4,-2],[-4,2],[4,2]].forEach(p=>cyl(.15,3,0x8a6a40,p[0],1.5,p[1],g,true));[-1,1].forEach(s=>box(9.2,.18,3.4,0x2a8ad8,0,3.3,s*1,g).rotation.x=-s*.25);for(let i=0;i<5;i++)box(1.7,.04,3.4,0xffffff,-3.4+i*1.7,3.5,0,g).rotation.x=.0;box(8.4,2,.12,0xe8f4fa,0,1.8,-2.1,g);
  for(let i=0;i<5;i++){box(.5,.4,.08,[0x2a8ad8,0xe0302a,0xf2c820,0x4caf6a,0xff7a1a][i],-3.4+i*1.7,2.4,-2.03,g);cyl(.05,.5,0x1a1a22,-3.4+i*1.7,1.5,-2.0,g)}for(let i=0;i<5;i++){box(.7,.06,.5,TC[i%6],-3.2+i*1.5,.9,1.4,g);box(.5,.3,.12,0x1a2a3a,-3.2+i*1.5,.5,1.5,g)}
  kreis(bx-4*1,bz-3*b.dir,.5);sperrKasten(bx,bz-5*b.dir,9,.4,R);flaschenGestell(X(-11),Z(2),R+.2,5);flaschenGestell(X(11),Z(2),R-.2,4);
  [[-3,6],[0,9],[3,12]].forEach((p,i)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(2.1,.18,6,16),mat([0xff7a1a,0xf2c820,0x2a8ad8][i]));t.position.set(X(p[0]*1.3),2.6,Z(p[1]));t.rotation.y=R+Math.PI/2;scene.add(t);cyl(.12,.8,0x6a6a72,X(p[0]*1.3),.4,Z(p[1])-2.6*0,scene);kreis(X(p[0]*1.3),Z(p[1])-2,.2)});
  taucherSteh(X(-2),Z(-2),R,0,1.35);[[-5,2],[-7,3.4],[-8.5,1.4]].forEach((p,i)=>taucherSteh(X(p[0]),Z(p[1]+4),R+3.14,i+2,1.1));
  const f=heringF(scene);f.scale.setScalar(2);kreisen(f,X(4),Z(10),3,3,2,1,0);const z2=fischZug(fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26}),14,X(0),Z(14),5,4,3,.6,.5,1.4,null,2.2,110)})}
function ort4(){P('Wetterboje',(b,X,Z,R,bx,bz)=>{
  const ph=nr()*6;cyl(1.6,.9,0x8a8a90,bx,.45,bz,scene,true);cyl(1.2,.2,0x6a6a72,bx,1.0,bz,scene);kreis(bx,bz,1.7);
  cyl(.08,26,0x6a6a72,bx,14,bz,scene);for(let i=0;i<60;i++)box(.2,.2,.32,i%2?0x7a7a82:0x5a5a62,bx+(i%2)*.12,1.1+i*.42,bz,scene).rotation.y=i%2?0:1.57;
  const by=grp(bx,27,bz);by.userData.keep=1;sph(1,0xff7a1a,0,0,0,by,2.2,1.5,2.2);cyl(2.3,.4,0xffffff,0,-.2,0,by);cyl(.2,2.6,0x6a6a72,0,1.8,0,by);sph(.4,0xe0302a,0,3.2,0,by);box(1.6,.06,1.1,0x2a3a6a,.9,1.9,0,by).rotation.z=-.4;
  const w=grp(0,3.2,0,by);[0,1,2].forEach(i=>{const a=grp(0,0,0,w);a.rotation.y=i*2.09;cyl(.04,1.2,0x4a4a52,.6,0,0,a).rotation.z=Math.PI/2;sph(.25,0xffffff,1.2,0,0,a,1,.7,1)});vm(by,w);bewegt(w,t=>{w.rotation.y=t*3});bewegt(by,t=>{by.position.y=27+Math.sin(t*.6+ph)*.4;by.rotation.z=Math.sin(t*.5)*.03});
  [[3,5,0xe0302a],[3,10,0x2a8ad8]].forEach(p=>{cyl(.05,5,0x7a7a82,bx+p[0],2.5,bz+p[1]*0,scene)});
  [[5,-3],[-5,-3],[0,6]].forEach((p,i)=>{const g=grp(bx+p[0]*1.5,0,bz+p[1]*1.5);box(1.2,1,.8,0x8a9aa4,0,.5,0,g,true);cyl(.05,3.2+i,0xc8cad0,0,2.6+i*.5,0,g,true);sph(.3,[0xe0302a,0x2a8ad8,0xf2c820][i],0,4.3+i,0,g);box(.9,.5,.05,0x3a4a5a,0,.8,.42,g);kreis(g.position.x,g.position.z,.8)});
  for(let i=0;i<4;i++){cyl(.12,5.5,[0xe0302a,0xffffff][i%2],bx-5+i*.35,2.8,bz+7,scene,true)}kreis(bx-4.3,bz+7,.6);cyl(.5,1.4,0xe0e8f0,bx+6.5,.7,bz+4,scene,true);cyl(.5,.2,0xe0302a,bx+6.5,1.5,bz+4,scene);kreis(bx+6.5,bz+4,.6);
  for(let i=0;i<5;i++){const c=cyl(.22,1.1,0xe8e8f0,bx-7+i*.7,.6,bz-5,scene,true);cyl(.24,.2,[0xe0302a,0x2a8ad8][i%2],bx-7+i*.7,1.2,bz-5,scene)}kreis(bx-5.6,bz-5,1.6);
  taucherSteh(X(-8),Z(-5),R+1.6,4,1.3);blasen(X(5),Z(6),12,8,.5);riff(bx,bz,9,6)})}
function ort5(){P('Korallengarten',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz,b.r-.5,0xf0e6c0,.08);for(let i=0;i<20;i++){const a=i/20*6.283,r=b.r-2.5;inst('sph',bx+Math.cos(a)*r,.25,bz+Math.sin(a)*r,.55,.35,.5,GRAU[i%5])}
  const cs=[0xff7a8a,0xff9a4a,0xf8e060,0xe85aa0,0xa86ae0,0x4ac8c0];
  for(let k=0;k<6;k++){const a=k*1.047+.4,cx=bx+Math.cos(a)*7.5,cz=bz+Math.sin(a)*7.5;for(let i=0;i<9;i++){const q=nr()*6.28,d=Math.sqrt(nr())*3.4,px=cx+Math.cos(q)*d,pz=cz+Math.sin(q)*d,m=i%4;if(m===0)hirn(px,pz,1+nr()*.5,cs[k]);else if(m===1)geweih(px,pz,1+nr()*.6,cs[k]);else if(m===2)faecher(px,pz,1.1,cs[k],a);else tischK(px,pz,1,cs[k])}}
  turm(bx,bz,1.5,0xff8a6a);const f=doktorF(scene);f.scale.setScalar(1.8);kreisen(f,bx,bz,9,7,2.4,.55,0);const f2=kaiserF(scene);f2.scale.setScalar(1.8);kreisen(f2,bx,bz,6,8,3,-.5,2);const f3=falterF(scene);f3.scale.setScalar(1.8);kreisen(f3,bx,bz,11,10,2,.4,4);
  fischZug(fischGeo({f:0xf2c820,b:0xf8e060,l:.8,h:.4,st:0x2a6ad8}),18,bx,bz,8,8,2.8,.8,.35,1.5,null,2.2,110);
  [[-12,4],[12,-3]].forEach(p=>{const t=taucherSteh(X(p[0]),Z(p[1]),R,3,1.3)});box(1.8,.6,.8,0x2a2a30,X(10),1.4,Z(-8),scene);kreis(X(10),Z(-8),1)},{dr:.5,c:0xf0e6c0})}
function ort6(){P('Anemonen und Clownfische',(b,X,Z,R,bx,bz)=>{
  const cs=[0xf06a9a,0xb06ae0,0xff9a4a,0x7ad06a,0xf06a9a];[[-5,-3],[4,-5],[-1,4],[6,3],[-7,3]].forEach((p,i)=>{const px=bx+p[0],pz=bz+p[1];anemone(px,pz,2.4,cs[i]);kreis(px,pz,1.5);stein(px+2,pz,1.4);const a=clownF(scene);a.scale.setScalar(1.8);kreisen(a,px,pz,2.4,2.4,1.6,.9+i*.1,i);const c=clownF(scene);c.scale.setScalar(1.4);kreisen(c,px,pz,1.6,1.9,2.1,-1.1,i+3)});
  for(let i=0;i<10;i++){const a=nr()*6.28,d=5+nr()*7;anemone(bx+Math.cos(a)*d,bz+Math.sin(a)*d,1.1+nr()*.5)}felsHaufen(bx,bz-8*b.dir,5,5,.9);for(let i=0;i<6;i++)muschelK(bx+(nr()-.5)*14,bz+(nr()-.5)*14,1.2,i%2?0xf0dcc8:0xf0b0b8)})}
function ort7(){P('Seepferdchen-Wiese',(b,X,Z,R,bx,bz)=>{
  for(let i=0;i<110;i++){const a=nr()*6.28,d=Math.sqrt(nr())*(b.r-1);const px=bx+Math.cos(a)*d,pz=bz+Math.sin(a)*d;if(Math.hypot(px-bx,pz-(bz+b.dir*b.r*.45))<3)continue;seegras(px,pz,2.2+nr()*1.8)}
  const F=[seepferd,seepferd2,seepferd3,seepferd,seepferd2];[[-5,-4],[3,-6],[7,1],[-6,5],[1,3],[-1,-8],[6,-9]].forEach((p,i)=>{const s=F[i%5](scene);s.position.set(bx+p[0],.8+(i%3)*.9,bz+p[1]);s.rotation.y=i*1.7;s.scale.setScalar(1.2);wiegen(s,i,1.2);seegras(bx+p[0],bz+p[1],4.2);seegras(bx+p[0]+.3,bz+p[1]-.2,3.8)});
  [[-8,0],[8,-5]].forEach((p,i)=>{inst('sph',bx+p[0],.3,bz+p[1],1.2,.55,1,GRAU[i]);kreis(bx+p[0],bz+p[1],1.1)});
  const lp=fischZug(fischGeo({f:0xf0c0a0,b:0xffffff,l:.6,h:.16}),10,bx,bz,7,6,3.2,.5,.3,1.6,null,1.8,110);for(let i=0;i<12;i++){inst('sph',bx+(nr()-.5)*14,.12,bz+(nr()-.5)*14,.3,.2,.28,0xf4c0c8)}})}
function ort8(){P('Seesterne und Seeigel',(b,X,Z,R,bx,bz)=>{
  wRing(bx,bz-b.dir*2,5.2,Math.PI*(b.dir>0?.5:-.5),3);for(let i=0;i<22;i++){const a=i/22*6.283;if(Math.abs(Math.atan2(Math.sin(a-(b.dir>0?1.57:-1.57)),Math.cos(a-(b.dir>0?1.57:-1.57))))<.5)continue;sph(.7,GRAU[i%5],bx+Math.cos(a)*5.2,.45,bz-b.dir*2+Math.sin(a)*5.2,scene,1.3,.8,1)}scheibe(bx,bz-b.dir*2,4.8,0xd8e8e8,.12);
  for(let i=0;i<14;i++){const a=nr()*6.28,d=Math.sqrt(nr())*4.2;seestern(bx+Math.cos(a)*d,bz-b.dir*2+Math.sin(a)*d,1.6+nr()*.6)}for(let i=0;i<6;i++){const a=nr()*6.28,d=Math.sqrt(nr())*4;seeigel(bx+Math.cos(a)*d,bz-b.dir*2+Math.sin(a)*d,1.5)}
  for(let i=0;i<30;i++){const a=nr()*6.28,d=7+nr()*6;const px=bx+Math.cos(a)*d,pz=bz+Math.sin(a)*d;if(i%2)seestern(px,pz,1.4+nr()*.8);else seeigel(px,pz,1.1+nr()*.6)}
  for(let i=0;i<5;i++){const a=i*1.3,px=bx+Math.cos(a)*9,pz=bz+Math.sin(a)*9;inst('cyl',px,.2,pz,.22,.4,.22,0x5a4a3a,a);inst('cyl',px+.4,.15,pz+.3,.18,.3,.18,0x6a5a42,a+1)}
  const big=grp(bx-b.dir*0+8,.2,bz+6*b.dir);big.rotation.y=.6;sph(1,0xff7a3a,0,.2,0,big,1,.4,1);for(let i=0;i<5;i++)box(3.4,.5,.9,0xff7a3a,Math.cos(i*1.2566)*1.8,.25,Math.sin(i*1.2566)*1.8,big).rotation.y=-i*1.2566;sperrKasten(big.position.x,big.position.z,6,6,0);
  riff(bx,bz,12,8);for(let i=0;i<4;i++)stein(bx+(nr()-.5)*20,bz+(nr()-.5)*20,1.2)})}
function etappe2(){ort1();ort2();ort3();ort4();ort5();ort6();ort7();ort8()}
/* ==================== Etappe 3: Orte 9 bis 16 ==================== */
function riesenmuschel(x,z,s,rot,ph){const g=grp(x,0,z);g.rotation.y=rot;sph(1,0xe8d8c8,0,.7*s,0,g,2.1*s,.75*s,1.7*s);for(let i=0;i<6;i++)sph(1,0xd0b8a0,(i-2.5)*.6*s,1.2*s,0,g,.14*s,.12*s,1.5*s*(1-Math.abs(i-2.5)*.12));
  sph(1,0xf4a0b8,0,1.15*s,0,g,1.7*s,.2*s,1.3*s);sph(1,0xffffff,0,1.4*s,0,g,.5*s,.5*s,.5*s);const lid=grp(0,1.2*s,-1.5*s,g);sph(1,0xe0cfbe,0,0,1.5*s,lid,2.1*s,.4*s,1.7*s);for(let i=0;i<6;i++)sph(1,0xc8b098,(i-2.5)*.6*s,.35*s,1.5*s,lid,.14*s,.14*s,1.5*s*(1-Math.abs(i-2.5)*.12));lid.userData.keep=1;bewegt(lid,t=>{lid.rotation.x=-.75-Math.sin(t*.5+ph)*.55});kreis(x,z,2.3*s);return g}
function ort9(){P('Muschelbank',(b,X,Z,R,bx,bz)=>{
  for(let i=0;i<5;i++)inst('sphT',bx+(nr()-.5)*14,0,bz+(nr()-.5)*14,5+nr()*3,.12,5+nr()*3,SAND2);
  for(let i=0;i<150;i++){const a=nr()*6.28,d=Math.sqrt(nr())*(b.r-1);muschelK(bx+Math.cos(a)*d,bz+Math.sin(a)*d,.8+nr()*.9,[0xf0dcc8,0xf0b0b8,0xf8e8a0,0xd8c0e8,0xe8e0d0][i%5])}
  riesenmuschel(bx-4.5,bz-3,1.3,.6,0);riesenmuschel(bx+4.5,bz-4,1.5,-.5,2);riesenmuschel(bx,bz+4*b.dir*-1,1.1,1.5,4);
  for(let i=0;i<4;i++){const px=bx+(i-1.5)*3.2,pz=bz+8*b.dir;const g=grp(px,0,pz);cyl(.7,.12,0xc8a870,0,.9,0,g,true);cyl(.1,.9,0x8a6a40,0,.45,0,g);for(let k=0;k<3;k++)sph(.2,0xffffff,(k-1)*.3,1.1,(k%2)*.2,g);kreis(px,pz,.8)}
  taucherSteh(X(8),Z(6),R+2.5,1,1.25);const k=krabbe2(scene);k.scale.setScalar(1.6);kreisen(k,bx,bz,6,4,0,.7,0,0);riff(bx,bz,12,6)})}
function ort10(){P('Putzerstation',(b,X,Z,R,bx,bz)=>{
  const rs=felsHaufen(bx,bz-3*b.dir,6,8,1.3);felsTor(bx,bz+4*b.dir*-1+b.dir*4,7,4.8,0);
  const m=muraene(scene);m.position.set(bx-5,.8,bz-4*b.dir);m.rotation.y=2.6;m.scale.setScalar(1.7);wiegen(m,1,1);
  const big=barschF(scene);big.scale.setScalar(5);kreisen(big,bx,bz+2*b.dir,3.5,2.5,3.6,.3,0,.3);
  for(let i=0;i<4;i++){const pf=putzerF(scene);pf.scale.setScalar(1.7);kreisen(pf,bx,bz+2*b.dir,3.8,3,3.7,.9+i*.15,i*1.5,.5)}
  const s=schildkroete(scene);s.scale.setScalar(1.6);kreisen(s,bx,bz,9,7,2.4,.25,3,.3);
  for(let i=0;i<4;i++)anemone(bx+(i-1.5)*3.5,bz+7*b.dir*-1,1.4);[[8,3],[-8,5]].forEach((p,i)=>{const kr=krabbeM(scene,0xffffff);kr.position.set(bx+p[0],.2,bz+p[1]);kr.scale.setScalar(.6)});
  taucherSteh(X(7),Z(8),R+3.2,0,1.3);riff(bx,bz,12,7)})}
function ort11(){P('Seegraswiese',(b,X,Z,R,bx,bz)=>{
  for(let i=0;i<260;i++){const a=nr()*6.28,d=Math.sqrt(nr())*(b.r-.5);seegras(bx+Math.cos(a)*d,bz+Math.sin(a)*d,1.8+nr()*2.2)}
  [[0,0,10,7,0,.14],[3,2,14,10,2.2,-.11]].forEach((p,i)=>{const s=seekuh(scene);s.scale.setScalar(i?.7:1.2);kreisen(s,bx+p[0],bz+p[1],p[2],p[3],1.6+i*.6,p[5],p[4],.3)});
  const t=schildkroete(scene);t.scale.setScalar(1.4);kreisen(t,bx,bz,8,6,.9,.3,1,.2);for(let i=0;i<5;i++)stein(bx+(nr()-.5)*22,bz+(nr()-.5)*22,1);
  taucherSteh(X(10),Z(6),R+3,2,1.3);fischZug(fischGeo({f:0x8ad0a0,b:0xe8f8e8,l:.8,h:.3}),12,bx,bz,8,6,2.4,.5,.3,1.5,null,2,110)})}
function ort12(){P('Tangwald',(b,X,Z,R,bx,bz)=>{
  kelpFeld(bx,bz,b.r-5,b.r-5,44,6,9,null,true);for(let i=0;i<40;i++){const a=nr()*6.28,d=Math.sqrt(nr())*(b.r+1);tang(bx+Math.cos(a)*d,bz+Math.sin(a)*d,3+nr()*3)}for(let i=0;i<12;i++){const a=nr()*6.28,d=nr()*b.r;inst('sph',bx+Math.cos(a)*d,.2,bz+Math.sin(a)*d,.5,.35,.5,0x6a5a2a)}
  [[0,.4],[3,-.35],[5,.3]].forEach((p,i)=>{const f=[kaiserF,doktorF,lippF][i](scene);f.scale.setScalar(1.8);kreisen(f,bx,bz,8+i*2,7,2.6+i,p[1],p[0])});fischZug(fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26}),16,bx,bz,9,8,5,1.5,.25,1.6,null,2.4,110);
  taucherSteh(X(11),Z(-4),R+.4,3,1.3);blasen(bx,bz,22,10,1)},{dr:.5})}
function ort13(){P('Schildkröten-Strand',(b,X,Z,R,bx,bz)=>{
  inst('sphT',bx,0,bz-3*b.dir,11,.17,9,SAND3);inst('sphT',bx+3,0,bz-5*b.dir,7,.2,6,0xf4e8c0);
  for(let n=0;n<3;n++){const nx=bx-6+n*6,nz=bz-6*b.dir+(n%2)*3;scheibe(nx,nz,1.4,0xd8c890,.14);for(let i=0;i<7;i++){const a=i*.9;inst('sph',nx+Math.cos(a)*1.2,.2,nz+Math.sin(a)*1.2,.35,.25,.3,GRAU[i%5])}for(let i=0;i<5;i++)inst('sph',nx+Math.cos(i*1.3)*.4,.3,nz+Math.sin(i*1.3)*.4,.22,.26,.22,0xfaf6ec)}
  for(let i=0;i<5;i++){const s=schildkroete(scene);s.scale.setScalar(.55);s.position.y=0;kreisen(s,bx-2+i*1.2,bz-4*b.dir,3.5+i*.5,2.5,0,.45+i*.05,i*1.3,0)}
  [[0,.28,10,7,2.6],[2,-.22,13,9,3.4],[4,.2,8,10,1.8]].forEach((p,i)=>{const s=schildkroete(scene);s.scale.setScalar(1.7);kreisen(s,bx,bz+4*b.dir,p[2],p[3],p[4],p[1],p[0],.3)});
  cyl(.5,5,0x8a6a4a,bx+8,.6,bz+4*b.dir,scene,true).rotation.z=Math.PI/2+.1;kreis(bx+6,bz+4*b.dir,.7);kreis(bx+9.5,bz+4*b.dir,.7);
  for(let i=0;i<8;i++)seegrasBusch(bx+(nr()-.5)*26,bz+(nr()-.5)*26,1);taucherSteh(X(-8),Z(5),R+3.4,2,1.3);riff(bx,bz,13,4)})}
function hummerkorb(x,z,rot){const g=grp(x,0,z);g.rotation.y=rot||0;cyl(.8,1.2,0x9a7a4a,0,.6,0,g,true).scale.x=1.4;for(let i=0;i<8;i++){const a=i*.785;box(.08,1.2,.08,0x6a4a2a,Math.cos(a)*1.1,.6,Math.sin(a)*.8,g)}box(.9,.06,.9,0x6a4a2a,0,1.22,0,g);cone(.5,.7,0xc87a4a,-1.3,.35,0,g).rotation.z=Math.PI/2;kreis(x,z,1.3);return g}
function ort14(){P('Krabben- und Hummerfelsen',(b,X,Z,R,bx,bz)=>{
  const rs=felsHaufen(bx,bz-2*b.dir,7,10,1.4);for(let i=0;i<3;i++){const h=hummer(scene);h.scale.setScalar(1.5);const r=rs[i*3];h.position.set(r[0]+r[2]*1.1,0,r[1]+r[2]*.2);h.rotation.y=i*2.1;wiegen(h,i,.5)}
  [[0,.6,6,3],[2,-.7,8,4],[4,.5,5,5],[1,-.5,9,3]].forEach((p,i)=>{const k=(i%2?krabbe:krabbe2)(scene);k.scale.setScalar(1.7);kreisen(k,bx,bz+5*b.dir,p[2],p[3],0,p[1],p[0],0)});
  hummerkorb(X(-9),Z(7),.4);hummerkorb(X(-6.5),Z(8.5),1.2);hummerkorb(X(9),Z(6),2.2);boje(X(-9),Z(10),0xff7a1a,5);boje(X(9.5),Z(9),0xe0302a,5);
  for(let i=0;i<5;i++)fass(X(-3+i*1.4),Z(10)+(i%2)*.6,i%2?0x2a8ad8:0x8a5a32);taucherSteh(X(4),Z(10),R+3.2,4,1.3);riff(bx,bz,13,5)})}
function ort15(){P('Tintenfisch-Höhle',(b,X,Z,R,bx,bz)=>{
  const gx=bx,gz=bz-3*b.dir;const L=[];for(let i=0;i<9;i++){const a=(i/9)*Math.PI*1.7+(b.dir>0?Math.PI*.65:Math.PI*1.65);const r=5+((i*3)%3)*.4;const px=gx+Math.cos(a)*r,pz=gz+Math.sin(a)*r;const s=1.9+(i%2)*.7;sph(s,GRAU[i%5],px,s*.7,pz,scene,1.1,.95,1.1);kreis(px,pz,s*1.0);L.push([px,pz])}
  sph(2.4,GRAU[2],gx,3.3,gz-2*b.dir,scene,1.7,.5,1.3);[[-3,1.5],[3,1.5]].forEach(p=>{sph(1.6,GRAU[4],gx+p[0],3.0,gz+p[1]*b.dir*-1,scene,1.1,.6,1)});
  const o1=tintenfisch(scene);o1.position.set(gx,.2,gz-1);o1.scale.setScalar(1.6);o1.rotation.y=b.dir>0?1.57:-1.57;kreis(gx,gz-1,1.7);kreis(gx+8,gz+8*b.dir,1.3);wiegen(o1,0,.6);const o2=tintenfisch2(scene);o2.position.set(gx+8,0,gz+8*b.dir);o2.scale.setScalar(1.2);o2.rotation.y=2;wiegen(o2,2,.6);
  amphore(gx-8,gz+7*b.dir,1.4,0xc87a4a);amphore(gx-9.5,gz+8*b.dir,1,0xa86a3a);amphore(gx+10,gz-2*b.dir,1.2,0xb8784a);for(let i=0;i<6;i++){inst('sph',gx-2+i*.5,.25,gz-3*b.dir+(i%2)*.4,.22,.3,.22,0xf4ecd8)}
  const kr=krabbe2(scene);kr.scale.setScalar(1.3);kreisen(kr,gx,gz+9*b.dir,5,3,0,.6,1,0);taucherSteh(X(-10),Z(5),R+3,5,1.3);riff(bx,bz,13,5)})}
function stechrochen(par){const g=manta(par);g.scale.setScalar(.7);return g}
function ort16(){P('Rochen-Plateau',(b,X,Z,R,bx,bz)=>{
  cyl(b.r-2.5,.7,0xe4d6a8,bx,.35,bz,scene).receiveShadow=true;cyl(b.r-3.2,.1,0xf0e4c0,bx,.72,bz,scene);const n=26,ga=b.dir>0?Math.PI/2:-Math.PI/2;
  for(let i=0;i<n;i++){const a=i/n*6.283;if(Math.abs(Math.atan2(Math.sin(a-ga),Math.cos(a-ga)))<.3)continue;const px=bx+Math.cos(a)*(b.r-2),pz=bz+Math.sin(a)*(b.r-2),s=.8+(i%3)*.3;sph(s,GRAU[i%5],px,.5*s+.1,pz,scene,1.2,.8,1.1);kreis(px,pz,s*1.1)}
  [[0,.2,15,11,6],[2.1,-.17,18,13,8.5],[4.2,.15,11,14,10.5]].forEach((p,i)=>{const m=manta(scene);m.scale.setScalar(1.1+i*.15);kreisen(m,bx,bz,p[2],p[3],p[4],p[1],p[0],.8)});
  [[-3,-2],[3,2],[0,-5]].forEach((p,i)=>{const r=stechrochen(scene);r.position.set(bx+p[0],.9,bz+p[1]);r.rotation.y=i*2;kreis(bx+p[0],bz+p[1],1.3);wiegen(r,i,.3)});
  for(let i=0;i<5;i++)hirn(bx+(i-2)*1.2,bz-6*b.dir,.7,kc(i*2));taucherSteh(X(8),Z(6),R+3.3,0,1.3);fischZug(fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26}),12,bx,bz,8,7,3,.8,.35,1.5,null,2,110)},{d:false})}
function etappe3(){ort9();ort10();ort11();ort12();ort13();ort14();ort15();ort16()}
/* ==================== Etappe 3b: Orte 17 bis 24 ==================== */
function rauchSaeule(x,y,z,h,n,c){const im=schwarmF(gBlase,n,[c,dk(c,1.4)],(i,t)=>{const u=((t*.3+i/n)%1),s=(.4+u*1.6)*(1+(i%3)*.2);return[x+Math.sin(u*6+i)*.5*u*3,y+u*h,z+Math.cos(u*5+i*2)*.5*u*3,s,s,s,0]},x,z);im.material.transparent=true;im.material.opacity=.55;im.material.depthWrite=false;return im}
function ort17(){P('Fischschwarm-Tunnel',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz,b.r-1,SAND3,.1);for(let i=0;i<6;i++){const zz=bz-12+i*4.8;[-1,1].forEach((s,k)=>{const r=2.2+(i%2)*.4;sph(r,GRAU[(i+k)%5],bx+s*6.2,r*.9,zz,scene,1,1.15,1);sph(r*.65,GRAU[(i+k+2)%5],bx+s*5.6,r*2.1,zz,scene,1,.9,1);kreis(bx+s*6.2,zz,r*.95)});sph(2.4,GRAU[(i+3)%5],bx,6.4,zz,scene,3.3,.5,1.1);sph(1.7,GRAU[(i+1)%5],bx-2.2*(i%2?1:-1),5.2,zz,scene,1.4,.8,1.2)}
  const hz=fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26});fischZug(hz,40,bx,bz,3.4,13,3.4,.9,.5,1.5,null,2.0,125);fischZug(hz,30,bx,bz,3,12,2.4,.7,-.42,1.4,[0xc8d8e0,0xaebfca],1.8,125);
  fischZug(fischGeo({f:0x2a4a7a,b:0xdde8f0,l:2.2,h:.7,dh:1}),9,bx,bz,12,18,5.5,1.2,.28,1.3,null,3.4,125);const t=thunF(scene);t.scale.setScalar(2);kreisen(t,bx,bz,10,16,7,.3,2);
  taucherSteh(X(10),Z(10),R+3,2,1.3);riff(bx,bz-b.dir*14,6,5);riff(bx,bz+b.dir*14,6,5)},{dr:.5,d:false})}
function ort18(){P('Delfinbucht',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz-b.dir*2,b.r-2,0xf2e6bc,.1);const ga=b.dir>0?Math.PI/2:-Math.PI/2,n=34;for(let i=0;i<n;i++){const a=i/n*6.283;if(Math.abs(Math.atan2(Math.sin(a-ga),Math.cos(a-ga)))<.65)continue;const rr=b.r+(i%3)*.8,px=bx+Math.cos(a)*rr,pz=bz-b.dir*2+Math.sin(a)*rr,s=1.6+(i%4)*.5;sph(s,GRAU[i%5],px,s*.7,pz,scene,1.2,1,1.1);kreis(px,pz,s*1.05)}
  [[0,.45,9,7,3.2],[2.4,-.4,11,8,3.8],[4.4,.5,6,6,2.6]].forEach((p,i)=>{const d=delfin(scene);d.scale.setScalar(1.7);kreisen(d,bx,bz-b.dir*2,p[2],p[3],p[4],p[1],p[0],1.5)});
  [-1,1].forEach(s=>cyl(.15,6,0xe0e8f0,bx+s*3,3,bz+6*b.dir*-1+b.dir*0,scene,true));const rg=new THREE.Mesh(new THREE.TorusGeometry(3,.22,6,18),mat(0xff7a1a));rg.position.set(bx,6,bz-6*b.dir);scene.add(rg);[-1,1].forEach(s=>kreis(bx+s*3,bz-6*b.dir,.3));
  bojenReihe(X(-12),Z(12),X(12),Z(12),7,2.2);const ball=grp(X(5),3,Z(4));sph(.8,0xffffff,0,0,0,ball);sph(.82,0xe0302a,0,0,0,ball,1,.3,1);ball.userData.keep=1;bewegt(ball,t=>{ball.position.y=3+Math.abs(Math.sin(t*1.3))*2});
  [[6,8],[-6,9]].forEach((p,i)=>{eimer(X(p[0]),Z(p[1]),0x2a8ad8,0xaebfca)});taucherSteh(X(0),Z(9),R+3.14,1,1.3);taucherSteh(X(-9),Z(7),R+3,3,1.3);seegrasBusch(X(-14),Z(2),1.4);riff(bx,bz,16,3)},{d:false})}
function ort19(){P('Quallenfeld',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz,b.r-1,0xcfd4e8,.1);quallen(bx,bz,12,11,13,3,[0xff9ad8,0xffb0e8,0xf8a0c8],1.2);quallen(bx-3,bz+3,11,9,11,4.5,[0x9ad8ff,0xb0e0ff,0xa0c8f8],1.5);quallen(bx+3,bz-2,13,10,10,6,[0xb8ffd0,0xd0ffe8,0xa8f0c8],1.1);quallen(bx,bz,9,8,8,2.5,[0xffe08a,0xfff0a8],1.3);
  for(let i=0;i<5;i++){const q=quallenM(scene,[0xff9ad8,0x9ad8ff,0xb8ffd0,0xffe08a,0xd8a0ff][i]);q.scale.setScalar(1.8);kreisen(q,bx,bz,7+i,6+i,2.4+i*.5,.2+i*.03,i*1.2,.8)}
  for(let i=0;i<24;i++){const a=nr()*6.28,d=Math.sqrt(nr())*(b.r-1),c=[0x9af0ff,0xff9ad8,0xb8ffd0][i%3];leucht(.18,c,bx+Math.cos(a)*d,.35,bz+Math.sin(a)*d,scene,1,.7,1);inst('cyl',bx+Math.cos(a)*d,.2,bz+Math.sin(a)*d,.1,.4,.1,0xe8d8f0)}
  for(let i=0;i<5;i++)orgel(bx+(i-2)*5,bz-8*b.dir,1.1,[0xd8a0ff,0xff9ad8][i%2]);[[-9,5],[9,-4]].forEach(p=>{felsen(bx+p[0],bz+p[1],1.5)});taucherSteh(X(9),Z(7),R+3.4,5,1.3);blasen(bx,bz,16,10,1.4);blasen(bx+8,bz-6,14,8,1)},{dr:.5})}
function ort20(){P('Haifisch-Riff',(b,X,Z,R,bx,bz)=>{
  const rs=felsHaufen(bx,bz-4*b.dir,8,9,1.6);sph(2.6,GRAU[1],bx,4.6,bz-6*b.dir,scene,2,.6,1.3);
  [[-6,6,.5],[7,4,-.6]].forEach((p,i)=>{const h=hai(scene);h.scale.setScalar(1.5);h.position.set(bx+p[0],.7,bz+p[1]*b.dir*-1);h.rotation.y=p[2]+3;wiegen(h,i,.4)});const h3=hai(scene);h3.scale.setScalar(1.7);kreisen(h3,bx,bz,14,10,3.6,.22,0,.5);const h4=hai(scene);h4.scale.setScalar(1.3);kreisen(h4,bx,bz,9,13,5.4,-.26,2,.5);
  fischZug(fischGeo({f:0x4aa88a,b:0xc8e8d8,l:.9,h:.4}),16,bx,bz,8,7,2.5,.8,.4,1.5,null,2,110);const ka=kaiserF(scene);ka.scale.setScalar(1.6);kreisen(ka,bx-2,bz,6,5,2,.5,3);
  const tk=taucherSteh(X(8),Z(8),R+3.3,1,1.3);box(.6,.4,.5,0x2a2a30,X(8)+.7,2.4,Z(8),scene);riff(bx,bz,14,8)})}
function ort21(){P('Walgesang-Höhle',(b,X,Z,R,bx,bz)=>{
  const gx=bx,gz=bz-3*b.dir,ga=b.dir>0?Math.PI/2:-Math.PI/2,n=11;for(let i=0;i<n;i++){const a=i/n*6.283;if(Math.abs(Math.atan2(Math.sin(a-ga),Math.cos(a-ga)))<.55)continue;const rr=8+(i%3)*.5,px=gx+Math.cos(a)*rr,pz=gz+Math.sin(a)*rr,s=3.4+(i%3)*.8;sph(s,GRAU[i%5],px,s*.85,pz,scene,1,1.2,1);kreis(px,pz,s*1.0);sph(s*.7,GRAU[(i+2)%5],px*.8+gx*.2,s*1.8,pz*.8+gz*.2,scene,1.1,.8,1.1)}
  sph(5.8,GRAU[2],gx,8.4,gz,scene,1,.55,1);for(let i=0;i<6;i++){const a=i*1.1;leucht(.35,0x7ae8ff,gx+Math.cos(a)*5,.5,gz+Math.sin(a)*5,scene,1,1.4,1);inst('con',gx+Math.cos(a)*5,.9,gz+Math.sin(a)*5,.3,1.8,.3,0x9aeaf4)}
  const w=wal(scene);w.scale.setScalar(.85);kreisen(w,bx,bz,17,15,7,.09,0,.8);
  const ringe=[0,1,2].map(i=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1,.06,4,24),new THREE.MeshBasicMaterial({color:0xcff8ff,transparent:true,opacity:.5,depthWrite:false}));m.rotation.x=Math.PI/2;scene.add(m);return m});
  lebendig.push({o:{userData:{anim:t=>{ringe.forEach((m,i)=>{const u=((t*.18+i/3)%1),s=2+u*13;m.position.set(gx,5+u*5,gz);m.scale.set(s,s,s);m.material.opacity=.5*(1-u);m.visible=Math.hypot(camera.position.x-gx,camera.position.z-gz)<120})}}},ph:0});
  taucherSteh(X(-11),Z(8),R+3,0,1.3);taucherSteh(X(11),Z(7),R+3.3,2,1.3);riff(bx,bz+b.dir*10,10,5);blasen(bx-8,bz+8,18,8,1)},{dr:.5})}
function ort22(){P('Schiffswrack',(b,X,Z,R,bx,bz)=>{
  const g=grp(bx,0,bz-2*b.dir);g.rotation.y=.35;g.rotation.z=.12;const W=0x6a4a2e,W2=0x7a5636,W3=0x4f3622;
  box(14,2.4,4.6,W,0,1.2,0,g,true);box(14,.2,4.9,W2,0,2.5,0,g);const bow=box(3.6,2.4,3.6,W,8.4,1.4,0,g,true);bow.rotation.y=.0;box(2.6,2.2,2.4,W,10.8,1.7,0,g);box(1.8,2,1.4,W,12.4,2.0,0,g);box(3,.3,3.8,W3,-8.2,2.6,0,g);box(3,2.4,4.2,W,-8,1.2,0,g);box(2.4,3,4.2,W2,-9.8,2.4,0,g);
  box(7,.15,4.6,0x8a6a42,-1,2.4,0,g);for(let i=0;i<8;i++)box(.1,.05,4.6,W3,-4.5+i*1.3,2.5,0,g);[-1,1].forEach(s=>{for(let i=0;i<7;i++)box(.3,3.4,.2,W3,-6+i*2,2.7,s*2.2,g);for(let i=0;i<7;i++){sph(.25,0x2a3a42,-5.5+i*1.8,1.5,s*2.34,g,1,1,.3)}});
  for(let i=0;i<5;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(2.2,.12,4,10,Math.PI),mat(W3));t.position.set(1+i*1.3,2.4,0);t.rotation.y=Math.PI/2;g.add(t)}
  cyl(.35,7,W3,3,5.5,0,g,true).rotation.z=.35;cyl(.18,4.5,W3,5.6,7.6,0,g,true).rotation.x=Math.PI/2+.1;box(.2,.2,3,W3,2,5,0,g).rotation.z=.4;cyl(.2,1.8,W3,-12,2.4,0,g,true).rotation.z=1.2;box(.3,2.6,.9,W3,-11.8,1.6,0,g);
  {const cs=Math.cos(.35),sn=Math.sin(.35),gz2=bz-2*b.dir;[[0,14.4,4.8],[9.4,5.6,3.6],[-9,5.4,4.4]].forEach(q=>sperrKasten(bx+q[0]*cs,gz2-q[0]*sn,q[1],q[2],.35))}
  anker(bx+12,bz+6*b.dir,.5,1.3);for(let i=0;i<4;i++){fass(bx-13+i*1.3,bz+8*b.dir,0x8a5a32)}kisteU(bx+4,bz+8*b.dir,0x8a6a40,.2);amphore(bx-4,bz+9*b.dir,1.2,0xa8683a);
  for(let i=0;i<14;i++){const a=nr()*6.28;hirn(bx+Math.cos(a)*(8+nr()*3),bz-2*b.dir+Math.sin(a)*(3+nr()*3),.7,kc(i));if(i%2)inst('sph',bx-6+i*.8,3.2,bz-2*b.dir+(i%3-1)*1.4,.5,.3,.5,kc(i+2),0)}
  fischZug(fischGeo({f:0xf2c820,b:0xf8e060,l:.8,h:.4,st:0x2a6ad8}),14,bx,bz-2*b.dir,9,3,3.2,.7,.4,1.5,null,1.8,110);const m=muraene(scene);m.position.set(bx-3,3,bz-1.6*b.dir);m.rotation.y=2;m.scale.setScalar(1.2);wiegen(m,2,.3);const bg=barschF(scene);bg.scale.setScalar(3);kreisen(bg,bx,bz-2*b.dir,10,5,4.5,.25,1,.4);
  taucherSteh(X(8),Z(11),R+3.3,3,1.3);riff(bx,bz+b.dir*10,9,6)},{dr:0})}
function schatzKiste(x,z,rot,s){const g=grp(x,0,z);g.rotation.y=rot||0;s=s||1;box(2.4*s,1.1*s,1.5*s,0x7a4a22,0,.55*s,0,g,true);box(2.5*s,.14*s,1.6*s,0xd8a82a,0,1.1*s,0,g);[-.8,.8].forEach(x=>box(.2*s,1.15*s,1.55*s,0xd8a82a,x*s,.55*s,0,g));
  const lid=grp(0,1.1*s,-.75*s,g);box(2.4*s,.2*s,1.5*s,0x7a4a22,0,.1*s,.75*s,lid);box(2.5*s,.12*s,1.6*s,0xd8a82a,0,.2*s,.75*s,lid);lid.rotation.x=-1.1;
  for(let i=0;i<24;i++){cyl(.2*s,.04*s,0xffd24a,(((i*7)%11)/11-.5)*1.9*s,1.15*s+((i%4)*.05)*s,((i%5)/5-.4)*1.0*s,g)}for(let i=0;i<7;i++)sph(.14*s,i%2?0xffffff:0xf8c8e8,(i-3)*.28*s,1.25*s,(i%3-1)*.3*s,g);[0xe0302a,0x2a8ad8,0x4caf6a].forEach((c,i)=>sph(.13*s,c,(i-1)*.5*s,1.28*s,.45*s,g,1,.8,1));
  sperrKasten(x,z,2.6*s,1.7*s,rot||0);return g}
function ort23(){P('Schatzhöhle',(b,X,Z,R,bx,bz)=>{
  const gx=bx,gz=bz-3*b.dir,ga=b.dir>0?Math.PI/2:-Math.PI/2,n=10;for(let i=0;i<n;i++){const a=i/n*6.283;if(Math.abs(Math.atan2(Math.sin(a-ga),Math.cos(a-ga)))<.62)continue;const rr=6.5+(i%2)*.6,px=gx+Math.cos(a)*rr,pz=gz+Math.sin(a)*rr,s=2.6+(i%3)*.6;sph(s,GRAU[i%5],px,s*.85,pz,scene,1,1.2,1);kreis(px,pz,s*1.0)}
  sph(5,GRAU[3],gx,6.2,gz,scene,1,.5,1);sph(2.2,GRAU[1],gx+(b.dir>0?-1:1)*3,7.4,gz+2.4*b.dir,scene,1.2,.7,1.1);
  schatzKiste(gx,gz,b.dir>0?0:Math.PI,1.3);leucht(.35,0xffe27a,gx,3.2,gz,scene,1,.5,1);for(let i=0;i<6;i++){const a=i*1.05;cyl(.5,.08,0xffd24a,gx+Math.cos(a)*3.2,.1,gz+Math.sin(a)*3.2,scene);sph(.22,0xffffff,gx+Math.cos(a+.3)*2.4,.25,gz+Math.sin(a+.3)*2.4,scene)}
  amphore(gx-4.2,gz-1,1.3,0xc87a4a);amphore(gx+4.3,gz,1.1,0xa86a3a);for(let i=0;i<8;i++)cyl(.22,.04,0xffd24a,gx-4+i*.3,.15,gz-.5,scene);const kr=krabbe(scene);kr.scale.setScalar(1.3);kreisen(kr,gx,gz+10*b.dir,3,2,0,.5,0,0);
  for(let i=0;i<6;i++){const t=leucht(.14,0xfff2a8,gx+(nr()-.5)*5,.8+nr()*2,gz+(nr()-.5)*5,scene);t.userData.keep=1;const ph=nr()*6,s0=t.scale.x;bewegt(t,tt=>{const f=.6+.6*Math.abs(Math.sin(tt*2+ph));t.scale.set(s0*f,s0*f,s0*f)})}
  taucherSteh(X(8),Z(9),R+3.3,4,1.3);riff(bx,bz+b.dir*8,10,5)},{dr:.5})}
function ort24(){P('Unterwasser-Vulkan',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz,b.r-1,0x6a5a52,.12);cone(10,8.4,0x4a3a3a,bx,4.2,bz,scene);cone(7.5,6.2,0x5a4640,bx,3.1,bz,scene);cyl(2.9,1.4,0x3a2a2a,bx,8.1,bz,scene);cyl(2.5,.3,0xff5a1a,bx,8.85,bz,scene);leucht(2.3,0xff8a2a,bx,8.95,bz,scene,1,.22,1);kreis(bx,bz,9.4);for(let i=0;i<9;i++){const a=i*.7,r=7.5+(i%3);sph(1.4,GRAU[i%5]===0x8d9097?0x4a4448:0x403a3e,bx+Math.cos(a)*r,.7,bz+Math.sin(a)*r,scene,1.2,.8,1.1);kreis(bx+Math.cos(a)*r,bz+Math.sin(a)*r,1.4)}
  rauchSaeule(bx,9,bz,24,18,0x4a4448);rauchSaeule(bx-8,3,bz+5*b.dir,20,10,0x3a3438);
  [[-9,4],[10,5],[-3,10]].forEach((p,i)=>{cyl(.5,3.2+i,0x3a2e2e,bx+p[0],1.6+i*.5,bz+p[1]*b.dir*-1,scene,true);kreis(bx+p[0],bz+p[1]*b.dir*-1,.6);rauchSaeule(bx+p[0],3.4+i,bz+p[1]*b.dir*-1,12,7,0x2a2a2e)});
  for(let i=0;i<60;i++){const a=nr()*6.28,d=11+nr()*6,px=bx+Math.cos(a)*d,pz=bz+Math.sin(a)*d;inst('cyl',px,.4,pz,.1,.8,.1,0xf2f2f2);inst('cyl',px,.85,pz,.12,.2,.12,0xe0302a);inst('cyl',px+.25,.3,pz,.08,.6,.08,0xf2f2f2);inst('sph',px+.25,.65,pz,.1,.1,.1,0xe0302a)}
  for(let i=0;i<4;i++){const c=krabbe2(scene);c.scale.setScalar(1.2);c.position.set(bx+Math.cos(i*1.6)*12,0,bz+Math.sin(i*1.6)*12);c.rotation.y=i;wiegen(c,i,.2)}
  taucherSteh(X(11),Z(9),R+3.3,1,1.3);for(let i=0;i<5;i++)leucht(.2,0xff9a3a,bx+(nr()-.5)*4,9.2,bz+(nr()-.5)*4,scene)},{dr:.5})}
function etappe3b(){ort17();ort18();ort19();ort20();ort21();ort22();ort23();ort24()}
/* ==================== Etappe 3c: Orte 25 bis 32 ==================== */
function ort25(){P('Tiefsee-Plateau',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz,b.r-.8,0x6a6a88,.12);for(let i=0;i<60;i++){const a=nr()*6.28,d=Math.sqrt(nr())*(b.r-1),px=bx+Math.cos(a)*d,pz=bz+Math.sin(a)*d;if(i%4===0)leucht(.14,[0x7af0ff,0xff9ad8,0xb8ffd0][i%3],px,.2,pz,scene);else if(i%4===1){inst('cyl',px,.8,pz,.05,1.6,.05,0xa8a8c8);inst('sph',px,1.65,pz,.2,.3,.2,[0xff9ad8,0x9af0ff,0xffe08a][i%3])}else if(i%4===2){inst('cyl',px,.9,pz,.35,1.8,.35,0xe0e8f0);inst('cyl',px,1.82,pz,.28,.06,.28,0x8a98a8)}else inst('con',px,.7,pz,.4,1.4,.4,0x4a4a68)}
  for(let i=0;i<8;i++){const a=i*.8,px=bx+Math.cos(a)*(8+(i%3)),pz=bz+Math.sin(a)*(7+(i%2)),s=1.4+(i%3)*.5;cone(s,s*3.2,0x3a3a54,px,s*1.6,pz,scene);kreis(px,pz,s*.9)}
  [[0,.3,8,6,2.4],[2,-.26,11,9,3.6],[4,.24,6,7,4.6]].forEach((p,i)=>{const a=angler(scene);a.scale.setScalar(1.1);kreisen(a,bx,bz,p[2],p[3],p[4],p[1],p[0],.5)});
  fischZug(fischGeo({f:0x1a2038,b:0x2a3a58,l:.9,h:.34,sp:0x7af0ff}),22,bx,bz,9,8,4,1.5,.3,1.6,null,2.4,110);[[-6,8],[7,6]].forEach((p,i)=>{const k=krabbeM(scene,0xe03a2a);k.position.set(bx+p[0],0,bz+p[1]);k.scale.setScalar(1.3);wiegen(k,i,.2)});
  taucherSteh(X(8),Z(9),R+3.3,5,1.3);for(let i=0;i<5;i++)leucht(.4,0x7af0ff,bx-6+i*3,2.4+(i%2),bz-9*b.dir,scene,1,.6,1)})}
function ort26(){P('Leuchtfisch-Schlucht',(b,X,Z,R,bx,bz)=>{
  for(let i=0;i<8;i++){const zz=bz-14+i*4;[-1,1].forEach((s,k)=>{const r=2.6+((i+k)%3)*.6,px=bx+s*(10+(i%2)*.8);sph(r,GRAU[(i+k)%5],px,r*.9,zz,scene,1,1.5,1);sph(r*.7,GRAU[(i+k+2)%5],px+s*.5,r*2.6,zz+1,scene,1,1.1,1);sph(r*.45,GRAU[(i+k+1)%5],px+s*.2,r*3.9,zz,scene,1,1,1);kreis(px,zz,r*1.0);const c=[0x7af0ff,0xff9ad8,0xb8ffd0,0x9a9aff][(i+k)%4];leucht(.3,c,px-s*r*.9,1.4+(i%3),zz+(i%2)-.5,scene);leucht(.22,c,px-s*r*.7,3.6,zz+1,scene);for(let q=0;q<3;q++)inst('con',px-s*r*.8,.8,zz-1.2+q*1.1,.25,1.4+q*.3,.25,c)})}
  fischZug(fischGeo({f:0x1a2038,b:0x2a3a58,l:.9,h:.34,sp:0x7af0ff,mund:0x7af0ff}),34,bx,bz,3.6,11,4,2,.5,1.6,null,1.6,110);fischZug(fischGeo({f:0x2a3a78,b:0x4a5a98,l:.8,h:.3,sp:0xff9ad8}),26,bx,bz,2.4,10,5,1.5,-.42,1.6,null,1.6,110);
  const a=angler(scene);a.scale.setScalar(1.05);kreisen(a,bx,bz,3,9,3,.25,1,.5);taucherSteh(X(9),Z(14),R+3.3,2,1.3);blasen(bx,bz,12,8,1)},{d:false,dr:.5})}
function ort27(){P('Rotes Meer',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz,b.r-.6,0xe8b098,.11);const rt=[0xe0302a,0xc02030,0xff5a4a,0xb81c2a,0xff7a5a];for(let i=0;i<16;i++){const a=nr()*6.28,d=3+Math.sqrt(nr())*(b.r-4);const px=bx+Math.cos(a)*d,pz=bz+Math.sin(a)*d;if(i%2)baumK(px,pz,1.2+nr()*.5,rt[i%5]);else faecher(px,pz,1.3+nr()*.5,rt[i%5],a)}
  for(let i=0;i<16;i++){const a=nr()*6.28,d=Math.sqrt(nr())*(b.r-1);faecher(bx+Math.cos(a)*d,bz+Math.sin(a)*d,.9,rt[i%5],nr()*3);if(i%3===0)hirn(bx+Math.cos(a+1)*d,bz+Math.sin(a+1)*d,.9,rt[(i+2)%5])}turm(bx-2,bz-5*b.dir,1.5,0xe0302a);turm(bx+6,bz-2*b.dir,1.1,0xc02030);
  fischZug(fischGeo({f:0xe0302a,b:0xff8a6a,l:1.2,h:.6}),24,bx,bz,9,8,3,1,.4,1.5,null,2.2,110);const r2=rotF(scene);r2.scale.setScalar(2);kreisen(r2,bx,bz,7,6,2,-.5,2);const b3=lippF(scene);b3.scale.setScalar(2);kreisen(b3,bx,bz,10,9,3.5,.4,4);
  taucherSteh(X(10),Z(10),R+3.3,4,1.3);inst('sph',bx,.25,bz+7,3,.1,2,0xe8b098)},{dr:.5,c:0xe8b098})}
function ort28(){P('U-Boot-Dock',(b,X,Z,R,bx,bz)=>{
  const g=grp(bx,0,bz);g.rotation.y=R;box(22,.8,12,0x6a7a86,0,.4,0,g,true);box(22.4,.12,12.4,0xf2c820,0,.82,0,g);[-1,1].forEach(s=>[-1,1].forEach(q=>{cyl(.4,5.6,0x5a6a74,s*10.4,3,q*5.6,g,true)}));[-1,1].forEach(s=>{box(22.6,.4,.5,0x5a6a74,0,5.9,s*6,g);box(22.6,.2,.6,0xe0302a,0,6.3,s*6,g)});[-1,1].forEach(s=>box(.5,.4,12.6,0x5a6a74,s*10.8,5.9,0,g));for(let i=0;i<5;i++)box(.3,.3,12.6,0x5a6a74,-8+i*4,5.9,0,g);
  sperrKasten(bx,bz,22,12,R);const sb=ubootA(g);sb.position.set(0,3.4,0);sb.scale.setScalar(1);sb.rotation.y=.0;sb.userData.keep=1;leben(sb,0);
  [-1,1].forEach(s=>{for(let i=0;i<3;i++)box(.3,.2,1.2,0x8a7a4a,-8+i*8,.9,s*7.2,g)});for(let i=0;i<5;i++)cyl(.3,.7,0x3a3a40,-9+i*4.5,1.1,7.2,g,true);
  const cr=grp(X(0),0,Z(-4));cyl(.5,13,0xe0302a,13,6.5,0,cr,true);box(12,.5,.5,0xe0302a,7.5,12.6,0,cr);cyl(.04,5,0x3a3a40,3,10,0,cr);box(.8,.8,.8,0xf2c820,3,7.2,0,cr);kreis(bx+13*Math.cos(R),bz,.6);
  for(let i=0;i<3;i++)kisteU(X(-14+i*1.4),Z(9),[0x2a8ad8,0xff7a1a,0x4caf6a][i],.2);const s2=ubootA(scene);s2.scale.setScalar(.7);kreisen(s2,bx,bz,20,17,8,.18,0,1);
  taucherSteh(X(-13),Z(-8),R+1,0,1.3);taucherSteh(X(14),Z(8),R+3,3,1.3);blasen(bx-6,bz+6,16,8,1);riff(bx,bz-b.dir*12,6,3)},{dr:.5})}
function ort29(){P('Aquarium-Tunnel',(b,X,Z,R,bx,bz)=>{
  const L=28,gl=new THREE.Mesh(new THREE.CylinderGeometry(4.2,4.2,L,14,1,true,0,Math.PI),new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.26,depthWrite:false,side:THREE.DoubleSide}));gl.rotation.x=Math.PI/2;gl.rotation.z=-Math.PI/2;gl.position.set(bx,0,bz);scene.add(gl);
  box(8.6,.3,L,0xe8f0f4,bx,.15,bz,scene,true);for(let i=0;i<=9;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(4.2,.14,5,14,Math.PI),mat(0x7a8a96));t.position.set(bx,0,bz-L/2+i*L/9);scene.add(t)}[-1,1].forEach(s=>{box(.3,.3,L,0x7a8a96,bx+s*4.25,.2,bz,scene);sperrLinie(bx+s*4.3,bz-L/2,bx+s*4.3,bz+L/2,.2)});for(let i=0;i<9;i++)leucht(.2,0xfff8d0,bx,4.1,bz-L/2+1.5+i*3,scene);
  [-1,1].forEach(s=>{kreis(bx+s*5.3,bz-L/2-1,.8);cyl(.8,6,0xe8f0f4,bx+s*5.8,3,bz-L/2-1,scene,true)});
  const hz=fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26});[-1,1].forEach((s,k)=>{fischZug(hz,22,bx+s*12,bz,4,12,3,1.5,.4*s,1.5,null,2,110);const m=manta(scene);m.scale.setScalar(.9);kreisen(m,bx+s*13,bz,3,10,6,.3*s,k*2,.5);const h=hai(scene);h.scale.setScalar(1.4);kreisen(h,bx+s*11,bz,4,12,2.6,-.2*s,k,.4);riff(bx+s*10,bz,8,6);turm(bx+s*9.5,bz+b.dir*11,1,kc(k*3+2))});
  const sk=schildkroete(scene);sk.scale.setScalar(1.6);kreisen(sk,bx+10,bz,3,9,4.8,.35,0,.3);fischZug(fischGeo({f:0xf2c820,b:0xf8e060,l:1.3,h:.75,st:0x2a6ad8}),10,bx-10,bz,4,10,4.6,1,.45,1.4,null,2,110);
  taucherSteh(bx+2,bz-6,1.5,1,1.3);taucherSteh(bx-2,bz+6,-1.5,5,1.3);taucherSteh(bx,bz-1,.4,2,1.3)},{d:false})}
function ort30(){P('Unterwasser-Windpark',(b,X,Z,R,bx,bz)=>{
  const T=[[-9,-8],[9,-8],[-11,6],[2,12],[12,5]];T.forEach((p,i)=>{const px=bx+p[0],pz=bz+p[1]*b.dir,h=26+(i%2)*2;cyl(1.4,1,0x7a8a96,px,.5,pz,scene,true);cyl(.9,2.4,0x9aa8b4,px,2,pz,scene);cyl(.55,h,0xe8eef2,px,h/2+1,pz,scene,true);box(1.4,1.4,2.8,0xdde6ec,px,h+1.2,pz+.3,scene,true);const ro=grp(px,h+1.2,pz+1.8);for(let k=0;k<3;k++){const a=grp(0,0,0,ro);a.rotation.z=k*2.094;cone(.5,9,0xf4f8fa,0,4.6,0,a);}sph(.6,0xe0302a,0,0,.3,ro);vm(ro);bewegt(ro,t=>{ro.rotation.z=t*(.5+(i%3)*.1)+i});leucht(.3,0xff3a2a,px,h+2.2,pz+.3,scene);kreis(px,pz,1.6);for(let k=0;k<4;k++)inst('con',px,.5,pz,.5,1.2,.5,0x4aa88a,k*1.57)});
  const sx=bx,sz=bz+1*b.dir;box(4,2.6,3,0xf2c820,sx,1.3,sz,scene,true);box(4.2,.2,3.2,0x4a5a64,sx,2.7,sz,scene);cyl(.1,3,0x6a6a72,sx+1.5,4,sz,scene);sperrKasten(sx,sz,4.2,3.2,0);
  const kab=(x1,z1,x2,z2)=>{const L=Math.hypot(x2-x1,z2-z1);const c=box(L,.16,.34,0x2a2a30,(x1+x2)/2,.1,(z1+z2)/2,scene);c.rotation.y=Math.atan2(-(z2-z1),x2-x1)};T.forEach(p=>kab(sx,sz,bx+p[0],bz+p[1]*b.dir));
  for(let i=0;i<6;i++)seegrasBusch(bx+(nr()-.5)*28,bz+(nr()-.5)*28,1.2);fischZug(fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26}),20,bx,bz,10,8,6,2,.3,1.5,null,2.4,125);const m=manta(scene);m.scale.setScalar(1.2);kreisen(m,bx,bz,12,10,10,.2,1,1);
  taucherSteh(X(6),Z(-5),R+3.3,3,1.3);taucherSteh(X(-6),Z(-10),R+1.5,0,1.3);riff(bx,bz+b.dir*8,10,5)},{dr:.5})}
function muellStueck(x,z,k,s){s=s||1;if(k===0)cyl(.3*s,.6*s,0xc0c8d0,x,.3*s,z,scene);else if(k===1){cyl(.22*s,.9*s,0x7ad0a0,x,.2*s,z,scene).rotation.z=1.4;cyl(.1*s,.2*s,0xffffff,x+.5*s,.25*s,z,scene)}else if(k===2){const t=new THREE.Mesh(new THREE.TorusGeometry(.6*s,.25*s,5,10),mat(0x2a2a2e));t.position.set(x,.3*s,z);t.rotation.x=Math.PI/2;scene.add(t)}else if(k===3)sph(.5*s,0xf0f4f8,x,.3*s,z,scene,1.3,.5,1);else box(.9*s,.5*s,.6*s,0xc8a060,x,.25*s,z,scene)}
function ort31(){P('Müll-Rettungsstation',(b,X,Z,R,bx,bz)=>{
  const g=grp(bx,0,bz-4*b.dir);g.rotation.y=R;box(8,3,5,0xe8f4ec,0,1.5,0,g,true);box(8.6,.2,5.6,0x4caf6a,0,3.1,0,g);box(1.6,2.2,.14,0x6a4a2a,-2,1.1,2.54,g);box(2.4,1.2,.14,0xb8ecff,1.6,1.8,2.54,g);sperrKasten(bx,bz-4*b.dir,8.2,5.2,R);
  [[0x2a8ad8],[0xf2c820],[0x4caf6a],[0x8a8a90]].forEach((c,i)=>{const x=-4.5+i*3,bn=grp(X(x),0,Z(8));box(1.6,1.5,1.2,c[0],0,.75,0,bn,true);box(1.8,.2,1.4,dk(c[0],.8),0,1.6,0,bn);kreis(X(x),Z(8),1)});
  for(let i=0;i<14;i++){const a=nr()*6.28,d=Math.sqrt(nr())*3.2;muellStueck(X(10)+Math.cos(a)*d,Z(-2)+Math.sin(a)*d*b.dir,i%5,1+nr()*.5)}kreis(X(10),Z(-2),3.4);
  const cv=grp(X(-10),0,Z(0));box(1.4,.5,9,0x4a5a64,0,.9,0,cv,true);for(let i=0;i<6;i++)box(.2,.5,1,0x2a2a30,0,.55,-4+i*1.6,cv);const items=[0,1,2,3].map(i=>{const m=box(.8,.5,.8,[0xc8a060,0x7ad0a0,0xf0f4f8,0xc0c8d0][i],0,1.4,0,cv);m.userData.keep=1;return m});lebendig.push({o:{userData:{anim:t=>{items.forEach((m,i)=>{m.position.z=-4.2+((t*1+i*2.2)%8.8)})}}},ph:0});sperrKasten(X(-10),Z(0),1.6,9.4,0);
  const rp=scheibe(X(0),Z(-12),4,0x5aa8c8,.14);const wr=new THREE.Mesh(new THREE.TorusGeometry(4,.35,5,20),mat(0xe0302a));wr.position.set(X(0),.5,Z(-12));wr.rotation.x=Math.PI/2;scene.add(wr);sperrRing(X(0),Z(-12),4.3,20);const s=schildkroete(scene);s.scale.setScalar(1.2);kreisen(s,X(0),Z(-12),2,1.6,.8,.7,0,.1);
  taucherSteh(X(6),Z(6),R+3.3,2,1.3);taucherSteh(X(-3),Z(11),R+3,0,1.3);const sk=grp(X(8),0,Z(8));sph(.6,0x4a4a52,0,.5,0,sk,1,.9,1);kreis(X(8),Z(8),.7);riff(bx,bz-b.dir*10,6,4)})}
function ort32(){P('Nachhaltige Fischerei',(b,X,Z,R,bx,bz)=>{
  const n=18,ga=b.dir>0?Math.PI/2:-Math.PI/2,rr=10;for(let i=0;i<n;i++){const a=i/n*6.283;if(Math.abs(Math.atan2(Math.sin(a-ga),Math.cos(a-ga)))<.3)continue;const px=bx+Math.cos(a)*rr,pz=bz+Math.sin(a)*rr;cyl(.14,4,0x8a5a32,px,2,pz,scene,true);sph(.35,[0xff7a1a,0xe0302a][i%2],px,4.2,pz,scene);const a2=a+6.283/n;if(Math.abs(Math.atan2(Math.sin(a2-ga),Math.cos(a2-ga)))>=.3)for(let h=1;h<=3;h++){const qx=bx+Math.cos(a2)*rr,qz=bz+Math.sin(a2)*rr,L=Math.hypot(qx-px,qz-pz),c=box(L,.05,.05,0xd8d0b0,(px+qx)/2,h*1.1,(pz+qz)/2,scene);c.rotation.y=Math.atan2(-(qz-pz),qx-px)}}sperrRing(bx,bz,rr+.3,40,ga);
  fischZug(fischGeo({f:0xf0a060,b:0xfff0d8,l:1,h:.5}),18,bx,bz,5,4.5,2.4,.8,.35,1.4,null,2,110);fischZug(fischGeo({f:0x4aa88a,b:0xc8e8d8,l:1.1,h:.45}),12,bx,bz,3,3,3.4,.6,-.4,1.4,null,1.6,110);const s=schildkroete(scene);s.scale.setScalar(1.5);kreisen(s,bx,bz,5.5,4.5,1.8,.3,0,.3);
  const nz=grp(X(-12),0,Z(5));box(.2,4,.2,0x8a5a32,-3,2,0,nz,true);box(.2,4,.2,0x8a5a32,3,2,0,nz);for(let i=0;i<=6;i++)box(6,.05,.05,0xd8d0b0,0,.4+i*.55,0,nz);for(let i=0;i<=12;i++)box(.05,3.4,.05,0xd8d0b0,-3+i*.5,2.1,0,nz);const lo=new THREE.Mesh(new THREE.TorusGeometry(.7,.1,4,10),mat(0xe0302a));lo.position.set(0,2,.05);nz.add(lo);kreis(X(-15),Z(5),.4);kreis(X(-9),Z(5),.4);sperrLinie(X(-15),Z(5),X(-9),Z(5),.2);
  const bt=grp(X(12),22,Z(0));sph(1,0x2a6ac0,0,0,0,bt,5,1.4,2);box(8,.3,3,0xf0e8d8,0,1,0,bt);box(2,1.6,2,0xf0e8d8,-1,2,0,bt);box(2.1,.4,2.1,0xe0302a,-1,3,0,bt);vm(bt);bt.userData.keep=1;bewegt(bt,t=>{bt.position.y=22+Math.sin(t*.7)*.5;bt.rotation.z=Math.sin(t*.6)*.05});
  for(let i=0;i<7;i++)box(.05,22,.05,0xd8d0b0,X(12)+1+i*.4-1.2,11,Z(0)+1.2,scene);for(let i=0;i<=14;i++)box(2.8,.05,.05,0xd8d0b0,X(12),i*1.5+.4,Z(0)+1.2,scene);
  for(let i=0;i<3;i++){cyl(.5,.6,0xc9a46a,X(-2+i*1.4),.3,Z(12),scene,true);for(let k=0;k<3;k++)sph(.15,[0xf0a060,0xaebfca][k%2],X(-2+i*1.4)+(k-1)*.2,.7,Z(12),scene,1,.5,2);kreis(X(-2+i*1.4),Z(12),.5)}
  taucherSteh(X(4),Z(10),R+3.2,1,1.3);riff(bx,bz-b.dir*14,6,4)},{dr:.5})}
function etappe3c(){ort25();ort26();ort27();ort28();ort29();ort30();ort31();ort32()}
/* ==================== Etappe 3d: Orte 33 bis 38 ==================== */
function ort33(){P('Pinguin-Tauchbecken',(b,X,Z,R,bx,bz)=>{
  scheibe(bx,bz,b.r-.5,0xeaf6ff,.12);for(let i=0;i<5;i++)inst('sphT',bx+(nr()-.5)*18,0,bz+(nr()-.5)*18,3+nr()*2,.1,3+nr()*2,0xffffff);
  const tx=bx,tz=bz-2*b.dir;cyl(5.2,.4,0x6a8aa0,tx,.2,tz,scene,true);const gl=new THREE.Mesh(new THREE.CylinderGeometry(5,5,3,20,1,true),new THREE.MeshLambertMaterial({color:0xbfe8ff,transparent:true,opacity:.3,depthWrite:false,side:THREE.DoubleSide}));gl.position.set(tx,1.7,tz);scene.add(gl);cyl(5.1,.5,0x4aa8d8,tx,.6,tz,scene);const rm=new THREE.Mesh(new THREE.TorusGeometry(5,.18,5,24),mat(0x8aa8bc));rm.position.set(tx,3.2,tz);rm.rotation.x=Math.PI/2;scene.add(rm);sperrRing(tx,tz,5.4,28);
  [[0,.9,3,2.5,1.2],[2,-.8,2.2,3.2,1.8],[4,1.1,3.4,2,1.5]].forEach((p,i)=>{const pg=pinguin(scene);pg.scale.setScalar(.9);pg.rotation.z=Math.PI/2*0;kreisen(pg,tx,tz,p[2],p[3]*.8,p[4],p[1],p[0],.2)});
  [[-8,5],[8,3],[-6,-7],[9,-6],[3,8],[-10,-1]].forEach((p,i)=>{const px=bx+p[0],pz=bz+p[1];box(2.4,1.2,2,0xc8e8f8,px,.6,pz,scene,true);box(2.5,.14,2.1,0xf4fbff,px,1.24,pz,scene);kreis(px,pz,1.5);const pg=pinguin(scene);pg.position.set(px,1.3,pz);pg.rotation.y=i*1.1;pg.scale.setScalar(1.05);wiegen(pg,i,.3)});
  [[-9,-9,3,7],[10,-9,2.6,6],[-11,6,2.2,5]].forEach((p,i)=>{cone(p[2],p[3],0xcfeaf8,bx+p[0],p[3]/2,bz+p[1]*b.dir,scene,true);cone(p[2]*.6,p[3]*.8,0xe8f6ff,bx+p[0]+1.5,p[3]*.4,bz+p[1]*b.dir+1,scene);kreis(bx+p[0],bz+p[1]*b.dir,p[2]*.8)});
  eimer(X(5),Z(9),0xe0302a,0xaebfca);eimer(X(-5),Z(10),0x2a8ad8,0xaebfca);taucherSteh(X(0),Z(10),R+3.14,1,1.3);fischZug(fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26}),12,tx,tz,3,3,2,.5,.5,1.2,null,1.6,110)},{dr:.5})}
function ort34(){P('Kelpwald der Seeotter',(b,X,Z,R,bx,bz)=>{
  kelpFeld(bx,bz,b.r-5,b.r-5,40,6,10,[0xffffff,0xf0e8b0,0xe0f0c8],true);for(let i=0;i<30;i++){const a=nr()*6.28,d=Math.sqrt(nr())*(b.r+1);tang(bx+Math.cos(a)*d,bz+Math.sin(a)*d,4+nr()*4)}
  [[-5,-3],[4,-6],[7,4],[-7,6],[0,2]].forEach((p,i)=>{const o=otter(scene);o.position.set(bx+p[0],1.2+(i%3)*.4,bz+p[1]);o.rotation.y=i*1.4;o.scale.setScalar(1.7);o.rotation.x=Math.PI;wiegen(o,i,1.3)});
  for(let i=0;i<8;i++)seeigel(bx+(nr()-.5)*20,bz+(nr()-.5)*20,1.3);for(let i=0;i<6;i++)muschelK(bx+(nr()-.5)*20,bz+(nr()-.5)*20,1.2);felsHaufen(bx+6,bz-8*b.dir,3,3,1);
  fischZug(fischGeo({f:0xd8603a,b:0xffd0a0,l:1.1,h:.45,sp:0x2a6ad8}),16,bx,bz,9,8,6,2,.3,1.5,null,2.4,125);taucherSteh(X(11),Z(8),R+3.3,3,1.3);blasen(bx-4,bz+3,24,8,1)},{dr:.5})}
function ort35(){P('Perlentaucher-Dorf',(b,X,Z,R,bx,bz)=>{
  const huts=[[-8,-6],[8,-7],[-10,4],[10,3]];huts.forEach((p,i)=>{const hx=bx+p[0],hz=bz+p[1]*b.dir;cyl(2.6,2.4,[0xe8d4a8,0xd8c498][i%2],hx,1.2,hz,scene,true);cone(3.4,2.8,[0x9a7a4a,0x8a6a3a][i%2],hx,3.8,hz,scene,true);cyl(.7,.14,0x6a4a2a,hx,.9,hz+2.5*b.dir,scene);box(1,1.7,.1,0x6a4a2a,hx,.85,hz+2.55*b.dir,scene);sph(.4,0xb8ecff,hx+1.6,1.7,hz+1.9*b.dir,scene,1,1,.3);kreis(hx,hz,2.8);for(let k=0;k<5;k++)sph(.2,[0xf0dcc8,0xf0b0b8][k%2],hx+Math.cos(k*1.3)*2.7,2.4,hz+Math.sin(k*1.3)*2.7,scene,1,.7,1)});
  const st=grp(X(0),0,Z(8));box(5,.14,2.4,0xc8a870,0,1.0,0,st,true);[[-2.3,-1],[2.3,-1],[-2.3,1],[2.3,1]].forEach(p=>cyl(.1,1,0x6a4a2a,p[0],.5,p[1],st));for(let i=0;i<7;i++)sph(.3,[0xffffff,0xf8d8e8,0xe8e0ff][i%3],-2+i*.65,1.4,(i%2)*.4-.2,st);box(5.4,.12,3,0x2a8ad8,0,3,0,st).rotation.x=.1;[[-2.4,-1.2],[2.4,-1.2]].forEach(p=>cyl(.08,3,0x6a4a2a,p[0],1.5,p[1],st));sperrKasten(X(0),Z(8),5.2,2.6,0);
  for(let r=0;r<3;r++){const lz=bz-13*b.dir+r*3.2*b.dir;cyl(.1,3,0x6a4a2a,bx-11,1.5,lz,scene,true);cyl(.1,3,0x6a4a2a,bx+11,1.5,lz,scene);box(22,.06,.06,0xd8d0b0,bx,3,lz,scene);for(let i=0;i<9;i++){const x=bx-9+i*2.25;box(.04,1.8,.04,0xd8d0b0,x,2.1,lz,scene);cyl(.35,.5,0xc9a46a,x,1.2,lz,scene);sph(.12,0xffffff,x,1.5,lz,scene)}kreis(bx-11,lz,.3);kreis(bx+11,lz,.3)}
  const pr=grp(X(0),0,Z(-2));cyl(1.2,.4,0xc8c0b0,0,.2,0,pr,true);sph(1,0xe8d8c8,0,.9,0,pr,1.4,.5,1.1);sph(.55,0xfff8ff,0,1.5,0,pr);kreis(X(0),Z(-2),1.5);
  [[6,8],[-6,9],[-13,-1],[13,-2],[2,-6]].forEach((p,i)=>taucherSteh(X(p[0]),Z(p[1]),R+i*1.1,i+1,1.3));for(let i=0;i<2;i++){const d=schildkroete(scene);d.scale.setScalar(1.2);kreisen(d,bx,bz,12,8,2.5,.3,i*3,.3)}riff(bx,bz-b.dir*3,14,3)})}
function ort36(){P('Leuchtturm',(b,X,Z,R,bx,bz)=>{
  sph(5.2,GRAU[1],bx,2,bz-b.dir*2,scene,1,.7,1);sph(3.6,GRAU[3],bx+2,1.4,bz-b.dir*3,scene);kreis(bx,bz-b.dir*2,4.2);const tz=bz-b.dir*2;
  for(let i=0;i<6;i++)cyl(2.7-i*.15,4.2,i%2?0xf4f4f4:0xe0302a,bx,2.8+i*4.2,tz,scene,true);cyl(3.2,.5,0x4a4a52,bx,28,tz,scene);cyl(2.4,.3,0x4a4a52,bx,28.4,tz,scene);
  const lm=new THREE.Mesh(gCyl,new THREE.MeshLambertMaterial({color:0xcfeaf5,transparent:true,opacity:.32,depthWrite:false}));lm.position.set(bx,30,tz);lm.scale.set(1.9,3,1.9);scene.add(lm);leucht(1.1,0xfff2a0,bx,30,tz,scene);cone(2.6,2.2,0xe0302a,bx,33,tz,scene);cyl(.1,1.4,0x4a4a52,bx,34.8,tz,scene);
  const tc=new THREE.Mesh(new THREE.TorusGeometry(3,.1,4,18),mat(0x4a4a52));tc.position.set(bx,29.2,tz);tc.rotation.x=Math.PI/2;scene.add(tc);for(let i=0;i<14;i++)cyl(.06,1,0x4a4a52,bx+Math.cos(i*.449)*3,28.9,tz+Math.sin(i*.449)*3,scene);
  box(1.4,2.4,.14,0x6a4a2a,bx,1.2,tz+2.7*b.dir,scene);for(let i=0;i<4;i++)sph(.35,0xb8ecff,bx+Math.cos(i*1.6+.3)*2.55,6+i*5,tz+Math.sin(i*1.6+.3)*2.55,scene,1,1,.5);
  /* Aussichtsdeck mit Fernrohr nach oben */
  const dx=X(0),dz=Z(8);cyl(4.2,.5,0xc8c0b0,dx,.25,dz,scene,true);const rg=new THREE.Mesh(new THREE.TorusGeometry(4,.1,4,22,5.5),mat(0xe0e8f0));rg.position.set(dx,1.3,dz);rg.rotation.x=Math.PI/2;rg.rotation.z=b.dir>0?-1.9:1.2;scene.add(rg);for(let i=0;i<14;i++){const a=i*.4+(b.dir>0?-1.5:1.6);cyl(.07,1.1,0xe0e8f0,dx+Math.cos(a)*4,.8,dz+Math.sin(a)*4,scene)}sperrRing(dx,dz,4.3,24,b.dir>0?-Math.PI/2:Math.PI/2);
  cyl(.12,1.4,0x3a3a42,dx,1.2,dz,scene,true);const fr=cyl(.28,3.4,0x6a7a86,dx,3,dz,scene,true);fr.rotation.z=.25;cyl(.34,.5,0xf2c820,dx-.5,4.5,dz,scene).rotation.z=.25;kreis(dx,dz,.5);bankW2(dx+3,dz+1.5,-1.2);
  taucherSteh(X(-8),Z(7),R+3,0,1.3);taucherSteh(X(8),Z(9),R+3.3,2,1.3);fischZug(fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26}),24,bx,tz,7,7,14,5,.3,1.5,null,3,125);blasen(bx+4,tz+4,24,10,1);riff(bx,bz+b.dir*8,11,6)},{dr:.5})}
function bankW2(x,z,rot){const g=grp(x,0,z);box(2.4,.18,.7,0x8a5a32,0,.62,0,g,true);box(2.4,.6,.1,0x8a5a32,0,1.05,-.32,g);[-1,1].forEach(s=>box(.14,.62,.64,0x6a4220,s*1,.31,0,g));g.rotation.y=rot||0;kreis(x,z,1.2);return g}
function ort37(){P('Unterwasser-Spielplatz',(b,X,Z,R,bx,bz)=>{
  /* Rutsche */
  const ru=grp(X(-8),0,Z(-3));ru.rotation.y=R;for(let i=0;i<6;i++)box(1.4,.2,.9,0xf2c820,-2.4+i*.01,.5+i*.5,-1.2+i*.0,ru).position.set(0,.4+i*.55,-1.4+i*.0);[-.7,.7].forEach(s=>box(.1,3.6,.1,0x2a8ad8,s,1.8,-1.9,ru));box(1.8,.2,1.4,0xe0302a,0,3.4,-1.8,ru);const sl=box(1.2,.12,5.4,0xff7a1a,0,1.9,1.4,ru);sl.rotation.x=.58;[-.7,.7].forEach(s=>{box(.1,.3,5.4,0xe0302a,s,1.95,1.4,ru).rotation.x=.58});sperrKasten(X(-8),Z(-3),3,7,R);
  /* Algenschaukel */
  const sc=grp(X(6),0,Z(-4));[-2,2].forEach(s=>cyl(.14,4.4,0x4aa88a,s,2.2,0,sc,true));box(4.4,.2,.3,0x3a8a6a,0,4.3,0,sc);const sw=grp(0,4.2,0,sc);[-.5,.5].forEach(s=>cyl(.03,2.8,0x2f9a58,s,-1.4,0,sw));box(1.3,.12,.6,0xff7a1a,0,-2.8,0,sw);vm(sw);bewegt(sw,t=>{sw.rotation.z=Math.sin(t*1.2)*.5});sperrKasten(X(6),Z(-4),4.6,.6,R);
  /* Muschel-Trampolin */
  const tr=grp(X(0),0,Z(5));sph(1.9,0xf0b0c8,0,.7,0,tr,1,.45,1);sph(1.6,0xf8d8e8,0,1.1,0,tr,1,.2,1);kreis(X(0),Z(5),1.9);const kd=taucherSteh(X(0),Z(5),R,4,.9);kd.g.visible=false;const kj=kindL({jacke:0xff7a1a,hose:0x1a1a22,haut:0xe8b98f,haar:0x6b4626,stil:'zoepfe',rucksack:null},scene);kj.g.position.set(X(0),1.2,Z(5)-0*b.dir);kj.g.scale.setScalar(.9);taucherGeraet(kj,0xf2c820,0xe0302a);vmVerschm(kj.g);kj.g.userData.keep=1;bewegt(kj.g,t=>{kj.g.position.y=1.2+Math.abs(Math.sin(t*2.2))*2.6});
  /* Wippe */
  const wp=grp(X(-3),0,Z(10));cyl(.3,.9,0x6a6a72,0,.45,0,wp,true);const bb=grp(0,.9,0,wp);box(5,.2,.7,0x4caf6a,0,0,0,bb);box(.6,.5,.7,0xe0302a,2.2,.35,0,bb);box(.6,.5,.7,0xe0302a,-2.2,.35,0,bb);vm(bb);bewegt(bb,t=>{bb.rotation.z=Math.sin(t*1.3)*.3});kreis(X(-3),Z(10),.7);
  /* Kletterringe */
  [-1,0,1].forEach(i=>{const t=new THREE.Mesh(new THREE.TorusGeometry(1.7,.16,5,14),mat([0xe0302a,0xf2c820,0x2a8ad8][i+1]));t.position.set(X(8+i*3.2),1.9,Z(7));t.rotation.y=R+Math.PI/2*0;scene.add(t)});
  for(let i=0;i<3;i++)turm(X(-12+i*12),Z(-12),.8,kc(i*2));seegrasBusch(X(10),Z(0),1);
  const sk=new THREE.Group();for(let i=0;i<8;i++){const a=i*.785;sph(.5,GRAU[i%5],X(11)+Math.cos(a)*2.2,.3,Z(-8)+Math.sin(a)*2.2,scene,1.2,.6,1)}scheibe(X(11),Z(-8),1.9,0xf0e4b8,.14);
  [[-5,6],[5,8],[9,-2],[-9,-8]].forEach((p,i)=>taucherSteh(X(p[0]),Z(p[1]),R+i*1.3,i+1,1.0));const k=clownF(scene);k.scale.setScalar(1.8);kreisen(k,bx,bz,6,5,3,.6,0);blasen(X(6),Z(2),10,8,.8)},{dr:.5})}
function ort38(){P('Regenbogenriff',(b,X,Z,R,bx,bz)=>{
  const rc=[0xe0302a,0xff7a1a,0xf2d030,0x4caf6a,0x2a9ad8,0x4a4ac8,0x9b4ab0];for(let i=0;i<7;i++){const r=14-i*1.8;cyl(r,.1,rc[i],bx,.05+i*.012,bz-b.dir*2,scene).receiveShadow=true}
  for(let i=0;i<7;i++){const a=Math.PI+(i/6)*Math.PI,px=bx+Math.cos(a)*12.5,pz=bz-b.dir*2-b.dir*Math.abs(Math.sin(a))*9;turm(px,pz,.95,rc[i])}
  /* Aussichtsfelsen mit Treppe */
  const ax=bx,az=bz-b.dir*10;cyl(3.4,3,0xc8b890,ax,1.5,az,scene,true);cyl(3.6,.3,0xe8d8b0,ax,3.1,az,scene);kreis(ax,az,3.5);for(let i=0;i<5;i++)box(2.4,.4,.9,0xd8c8a0,ax+(i-2)*.0,.2+i*.6,az+(4.3-i*.9)*b.dir,scene,true);
  cyl(.1,5.5,0xe8e4da,ax,5.8,az,scene,true);const f=grp(ax,7.6,az);for(let i=0;i<7;i++)box(.5,.35,.04,rc[i],.4+i*.5,0,0,f);vm(f);bewegt(f,t=>{f.rotation.y=Math.sin(t*1.7)*.18});
  [[-6,6],[6,6],[0,9],[-9,0],[9,0]].forEach((p,i)=>{const bk=bankW2(X(p[0]),Z(p[1]),R+3.14);});
  fischZug(fischGeo({f:0xffffff,b:0xffffff,l:1,h:.45,st:0xe0302a}),21,bx,bz,8,7,4,1.4,.35,1.5,[0xe0302a,0xff7a1a,0xf2d030,0x4caf6a,0x2a9ad8,0x9b4ab0,0xf47ab0],2.2,110);
  const ks=[kaiserF,clownF,doktorF,falterF].map((fn,i)=>{const q=fn(scene);q.scale.setScalar(1.8);kreisen(q,bx,bz,6+i*2,5+i*1.5,2.5+i*.7,.5*(i%2?-1:1),i*1.5,.5)});
  for(let i=0;i<12;i++){const a=nr()*6.28,d=15+nr()*3;const c=rc[i%7];hirn(bx+Math.cos(a)*d,bz+Math.sin(a)*d,1,c);if(i%2)geweih(bx+Math.cos(a+.2)*d,bz+Math.sin(a+.2)*d,1,c)}
  taucherSteh(X(-4),Z(10),R+3,3,1.3);taucherSteh(X(4),Z(11),R+3.2,0,1.3);blasen(bx,bz,16,10,1.2)},{dr:.5})}
function etappe3d(){ort33();ort34();ort35();ort36();ort37();ort38()}
/* ==================== Etappe 4: Bewuchs und Kleinteile zwischen den Orten ==================== */
function etappe4(){
  WEGE.forEach(s=>s.forEach((q,i)=>{if(i%2===0)sgMark(q[0],q[1],4.8)}));EXTRAZONEN.forEach(e=>sgMark(e.x,e.z,e.r+2.5));WS.forEach(w=>sgMark(w[0],w[1],w[2]+4));
  sgMark(0,120,22);sgMark(0,90,14);sgMark(-20,126,12);sgMark(FEST.x,FEST.z,26);for(let z=TORZ-30;z<TORZ+12;z+=2)sgMark(0,z,6);sgMark(0,-190,8);
  /* Rand: dichte Korallen und Seegras entlang der Grenze */
  for(let z=-232;z<144;z+=4)[[-178,-160],[160,178]].forEach(rg=>{const x=rg[0]+nr()*(rg[1]-rg[0]),zz=z+nr()*3.4;if(!frei(x,zz))return;const q=nr();if(q<.22&&thFrei(x,zz,7)){turm(x,zz,.9+nr()*.4,kc(nr()*10));thSet(x,zz)}else if(q<.4)geweih(x,zz,1+nr()*.6);else if(q<.55)orgel(x,zz,1+nr()*.5);else if(q<.7)hirn(x,zz,1+nr()*.5);else seegrasBusch(x,zz,1.2)});
  for(let x=-170;x<=170;x+=5)[[-236,-224],[140,146]].forEach(rg=>{const z=rg[0]+nr()*(rg[1]-rg[0]);if(!frei(x,z))return;if(nr()<.5)seegrasBusch(x,z,1.2);else if(nr()<.5)hirn(x+nr()*3,z,1+nr()*.5);else geweih(x,z,1)});
  /* Große Wow-Objekte: Korallentürme, Felsen, Tanggruppen */
  zuf((x,z)=>{if(thFrei(x,z,16)){turm(x,z,1.1+nr()*.6,kc(nr()*10));thSet(x,z)}},26);
  zuf((x,z)=>{if(thFrei(x,z,5)){fels(x,z,1.1+nr()*1.6);thSet(x,z)}},46);
  zuf((x,z)=>{if(thFrei(x,z,5)&&nr()<1){const L=felsgruppe(x,z,2.4,2.4,3,.8,1.4);thSet(x,z)}},12);
  for(let i=0;i<6;i++){const cx=-150+nr()*300,cz=-200+nr()*330;if(frei(cx,cz)&&thFrei(cx,cz,12)){kelpFeld(cx,cz,6,6,22,8,13,null,true);thSet(cx,cz)}}
  /* Gemischter Bewuchs (instanziert) */
  zuf((x,z)=>seegras(x,z),2300);zuf((x,z)=>seegrasBusch(x,z,.8+nr()*.8),200);zuf((x,z)=>alge(x,z,.8+nr()*.8),200);
  zuf((x,z)=>hirn(x,z,.8+nr()*.8),85);zuf((x,z)=>geweih(x,z,.8+nr()*.8),85);zuf((x,z)=>orgel(x,z,.8+nr()*.7),70);zuf((x,z)=>tischK(x,z,.7+nr()*.6),50);zuf((x,z)=>faecher(x,z,.8+nr()*.7,undefined,nr()*3),75);zuf((x,z)=>anemone(x,z,.8+nr()*.8),60);
  zuf((x,z)=>baumK(x,z,.9+nr()*.5),24,(x,z)=>x>20);zuf((x,z)=>schwamm(x,z,.8+nr()*.6),50);zuf((x,z)=>tang(x,z),70,(x,z)=>thFrei(x,z,2.2));
  zuf((x,z)=>seestern(x,z,1.2+nr()*.6),50);zuf((x,z)=>seeigel(x,z,1+nr()*.5),30);zuf((x,z)=>muschelK(x,z,.9+nr()*.7,[0xf0dcc8,0xf0b0b8,0xf8e8a0][Math.floor(nr()*3)]),70);
  zuf((x,z)=>stein(x,z,.7+nr()*1),200);zuf((x,z)=>sandfl(x,z,1),240);zuf((x,z)=>steinhaufen(x,z,1),40);
  /* Wegränder */
  WEGE.forEach((s,wi)=>{for(let i=2;i<s.length-2;i+=7){const a=s[i-1],c=s[i+1],tx=c[0]-a[0],tz=c[1]-a[1],l=Math.hypot(tx,tz)||1,sd=((i/5+wi)%2)?1:-1,x=s[i][0]-tz/l*sd*4.2,z=s[i][1]+tx/l*sd*4.2;if(Math.abs(x)>176||z<-233||z>145)continue;if(imW(x,z))continue;const q=(i/7)%4;if(q<1)seegrasBusch(x,z,.8);else if(q<2)hirn(x,z,.7);else if(q<3)anemone(x,z,.8);else geweih(x,z,.7)}});
  /* Kleinteile an Wegen */
  (function(){const nahe=(x,z)=>EXTRAZONEN.some(e=>Math.hypot(x-e.x,z-e.z)<e.r+4)||imW(x,z);
    SEITENWEGE.forEach((r,ri)=>{for(let x=-140;x<=148;x+=15){if(Math.abs(x-wegX(r))<12)continue;const z=roadZ(x,r),side=((Math.round(x/15)+ri)%2)?1:-1,zz=z+side*4.8;if(nahe(x,zz))continue;const f=Math.round(x/15+ri*3)%9;
      if(f===0)amphore(x,zz,1,0xc87a4a);else if(f===1)kisteU(x,zz,0x9a6a3a,.3);else if(f===2)fass(x,zz);else if(f===3)boje(x,zz,[0xe0302a,0xff7a1a,0xf2c820][ri%3],4.5);else if(f===4)anker(x,zz,.4,.8);else if(f===5)hummerkorb(x,zz,.5);else if(f===6)bankW2(x,zz,side>0?0:Math.PI);else if(f===7)tauchflagge(x,zz);else{kisteU(x,zz,0x2a8ad8,.1);kisteU(x+1.4,zz+.4,0xff7a1a,.4)}}});
    for(let z=GRENZE.z1-34;z>TORZ+6;z-=14){if(SEITENWEGE.some(r=>Math.abs(z-r)<12)||Math.abs(z-114)<16)continue;const x=wegX(z),side=(Math.round(z/14)%2)?1:-1,xx=x+side*4.6,f=Math.round(z/14)%6;if(nahe(xx,z))continue;if(f===0)bankW2(xx,z,side>0?-Math.PI/2:Math.PI/2);else if(f===1)boje(xx,z,0xe0302a,4);else if(f===2)amphore(xx,z,.9,0xa86a3a);else if(f===3)kisteU(xx,z,0xf2c820,.2);else if(f===4)flaschenGestell(xx+side*1.8,z,1.57,3);else{ketteU(xx,z,6);anker(xx+side*1.5,z,.3,.7)}}})();
  /* Taucherausrüstung und Leinen im Gelände */
  [[-150,60],[150,40],[-150,-40],[150,-60],[-20,-60],[30,-60],[-100,-60],[0,92],[60,0],[-20,40],[-60,-10],[100,-110]].forEach((p,i)=>{if(!frei(p[0],p[1]))return;flaschenGestell(p[0],p[1],i*.7,3);bankW2(p[0]+4,p[1]+2,.4);kisteU(p[0]-3,p[1]+3,TC[i%6],i)});
  plankton();
}
/* Schwebeteilchen rund um die Kamera */
function plankton(){const N=520,pos=new Float32Array(N*3),b=[];for(let i=0;i<N;i++)b.push([nr()*90,nr()*30,nr()*90,.3+nr()*.7]);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const m=new THREE.PointsMaterial({color:0xe8fbff,size:.22,transparent:true,opacity:.7,depthWrite:false});const p=new THREE.Points(g,m);p.frustumCulled=false;scene.add(p);p.userData.keep=1;
  lebendig.push({o:{userData:{anim:t=>{const cx=camera.position.x,cz=camera.position.z;for(let i=0;i<N;i++){const q=b[i];pos[i*3]=cx-45+((q[0]+t*q[3]*.6+Math.sin(t*.3+i)*.8)%90+90)%90;pos[i*3+1]=((q[1]+t*q[3]*.5)%30+30)%30;pos[i*3+2]=cz-45+((q[2]+t*q[3]*.4)%90+90)%90}g.attributes.position.needsUpdate=true}}},ph:0})}
/* ==================== Etappe 5: Bewegung, Besucher ==================== */
function etappe5(){
  const G={he:fischGeo({f:0xaebfca,b:0xeef4f8,l:.9,h:.26}),thun:fischGeo({f:0x2a4a7a,b:0xdde8f0,l:2.2,h:.7,dh:1}),bunt:fischGeo({f:0xf2c820,b:0xf8e060,l:1,h:.5,st:0x2a6ad8}),rot:fischGeo({f:0xe0302a,b:0xff8a6a,l:1.1,h:.55}),blau:fischGeo({f:0x2a5ad8,fl:0xf2d030,l:1.1,h:.6,sp:0x101830}),grn:fischGeo({f:0x4aa88a,b:0xc8e8d8,l:1.2,h:.5})};
  [[0,60,40,30,'he',5,.3],[-60,-58,30,24,'he',6,-.28],[60,-58,30,28,'bunt',4,.34],[-110,-108,34,26,'he',7,.26],[110,-108,28,30,'rot',5,-.3],[0,-100,36,22,'thun',8,.25],[-60,90,26,24,'blau',3,.3],[60,90,30,24,'grn',4,-.32],[0,-150,38,26,'he',7,.22],[-120,0,32,22,'bunt',4,.3],[120,0,34,22,'blau',5,-.3],[0,0,36,30,'he',9,-.25],[-30,-20,30,24,'grn',3,.35],[130,60,24,20,'rot',4,.3],[-140,-60,30,24,'thun',6,.2],[20,130,20,16,'bunt',3,.35]].forEach((s,i)=>fischZug(G[s[4]],s[2],s[0],s[1],s[5]*2.2,s[5]*1.7+6,s[6]*0+s[5]*.6+1.6,1.4,s[6],1.5,null,2.6,130));
  /* Große Tiere auf weiten Runden */
  [[0,20,70,50,.1,0],[0,-100,100,40,-.08,2]].forEach((p,i)=>{const w=wal(scene);w.scale.setScalar(.8+i*.2);kreisen(w,p[0],p[1],p[2],p[3],18+i*3,p[4],p[5],2)});
  [[-90,50,.14],[80,-60,-.12],[-20,-100,.13],[110,30,-.11],[-100,-100,.1]].forEach((p,i)=>{const d=delfin(scene);d.scale.setScalar(1.6);kreisen(d,p[0],p[1],38,26,5+i%3,p[2],i*2,1.6)});
  [[-30,70,.12],[60,-20,-.1],[-80,-60,.11],[40,-110,.12]].forEach((p,i)=>{const m=manta(scene);m.scale.setScalar(1.2);kreisen(m,p[0],p[1],34,24,9+i,p[2],i*1.7,1)});
  [[-60,100,.07],[100,70,-.06],[-120,-30,.08],[50,-70,-.07],[-20,10,.06],[130,-100,.07]].forEach((p,i)=>{const s=schildkroete(scene);s.scale.setScalar(1.6);kreisen(s,p[0],p[1],30,20,3+i%3*1.5,p[2],i*1.1,.6)});
  [[-130,90],[110,10],[-40,-60],[70,-110]].forEach((p,i)=>{const h=hai(scene);h.scale.setScalar(1.5);kreisen(h,p[0],p[1],26,18,5+i,.1*(i%2?-1:1),i*1.9,.8)});
  const ts=tilda(scene);ts.scale.setScalar(1.8);kreisen(ts,0,100,26,10,3,.12,0,.5);
  /* Quallenschwärme zwischen den Orten */
  [[-110,50,0xff9ad8],[100,-60,0x9ad8ff],[-20,-110,0xb8ffd0],[20,40,0xffe08a]].forEach((q,i)=>quallen(q[0],q[1],16,14,9,3+i%2*1.5,[q[2],dk(q[2],1.1)],1.2));
  /* Luftblasen aus dem Boden */
  [[-14,85],[16,50],[-10,0],[20,-60],[-22,-100],[14,-150],[-90,44],[90,44],[-100,-8],[102,-8],[-50,-58],[50,-58],[-70,-160],[70,-110],[0,138],[6,-175]].forEach(p=>blasen(p[0],p[1],20,9,.8));
  /* Besucher: Taucher auf den Wegen */
  const sp=(pts,f)=>spl(pts,2.5).filter(f),hw=z0=>sp(Array.from({length:30},(_,i)=>[wegX(112-i*10),112-i*10]),q=>q[1]<=z0[0]&&q[1]>=z0[1]),rd=(r,x0,x1)=>sp(strasse(r),q=>q[0]>=x0&&q[0]<=x1);
  const HR=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d,0x1b1410,0x8a6a4a],ST=['kurz','zoepfe','cap','pferd'],RU=[null,null,null,null,null,null];
  const routen=[[hw([108,70]),1.2],[hw([60,6]),1.2],[hw([6,-60]),1.2],[hw([-60,-128]),1.2],[hw([-128,-182]),1.2],[rd(94,-140,-14),1.3],[rd(94,14,140),1.3],[rd(44,-140,-14),1.3],[rd(44,14,140),1.3],[rd(-8,-140,-14),1.3],[rd(-8,14,140),1.3],[rd(-58,-140,-14),1.3],[rd(-58,14,140),1.3],[rd(-110,-140,-14),1.3],[rd(-110,14,140),1.3],[rd(-160,-140,-14),1.3],[rd(-160,14,140),1.3]];
  let k=0;routen.forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);const anz=i<5?2:(i%3?1:2);for(let j=0;j<anz;j++){taucherW(B,2+((k+j)%3)*.4,j*2.1+i,{jacke:TJ[(k*3+j)%6],haar:HR[(k+j*2)%6],stil:ST[(k+j)%4],rucksack:RU[(k+j)%6]},k+j);k++}});
  [[hw([108,-70]),1.3],[hw([-100,-168]),1.3],[rd(-58,-140,140),1.2],[rd(-110,-140,140),1.2],[rd(-8,-150,150),1.2],[rd(94,-150,150),1.2]].forEach((r,i)=>{if(r[0].length<4)return;const B=pendel(r[0],r[1]);for(let j=0;j<(i<2?2:1);j++){taucherW(B,1.6+j*.5,j*3+i,{jacke:TJ[(i*2+j+3)%6],haar:HR[(i+j)%6],stil:ST[(i+j)%4],rucksack:null},i*3+j+5);k++}});
  /* Tiere, die frei laufen (am Boden): Krebse und Seesterne */
  [[-30,-8,0],[50,-20,1],[-80,20,0],[20,60,1]].forEach((c,i)=>{const kr=(i%2?krabbe:krabbe2)(scene);kr.scale.setScalar(1.6);kreisen(kr,c[0],c[1],6,4,0,.5,i,0)});
}
function paradeBauen(){
  const wp=(k)=>p=>{const w=grp(0,0,0,p);const m=kindL({jacke:TJ[k%6],hose:0x1a1a22,haut:0xe8b98f,haar:HR2[k%4],stil:['kurz','zoepfe','cap','pferd'][k%4],rucksack:null},w);m.g.rotation.y=Math.PI/2;m.g.scale.setScalar(1.4);taucherGeraet(m,TC[k%6],TC[(k+2)%6]);[m.bl,m.br,m.al,m.ar].forEach(q=>{vmVerschm(q);q.userData.frei=1});vmVerschm(m.g);w.userData.anim=t=>{const q=Math.sin(t*6)*.7;m.bl.rotation.x=q;m.br.rotation.x=-q;m.al.rotation.x=-q*.7;m.ar.rotation.x=q*.7};return w};
  const hoch=(fn,y)=>p=>{const w=grp(0,0,0,p);const c=fn(w);c.position.y=y;w.userData.anim=t=>{if(c.userData.anim)c.userData.anim(t)};return w};
  const liste=[[tilda,2.6],[delfin,1.8],[wp(0),1],[hoch(manta,2.5),1.3],[schildkroete,2],[wp(1),1],[hoch(wal,3.5),.22],[seekuh,1.5],[wp(2),1],[hoch(hai,1.6),1.5],[pinguin,1.4],[wp(3),1],[hoch(delfin,2),1.8],[krabbe,2.2],[wp(4),1],[hoch(tilda,1.6),1.6]];
  liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
const HR2=[0x6b4626,0xe8c24a,0x2a1d14,0xb5651d];
function weltBauen(){
/* Leistung: gröbere Grundformen (Kugel 8x5, Zylinder 8, Kegel 7) für alle Teile dieser Welt */
gSph.copy(new THREE.SphereGeometry(1,8,5));gCyl.copy(new THREE.CylinderGeometry(1,1,1,8));gCone.copy(new THREE.ConeGeometry(1,1,7));
/* Himmel und Luft: klares Türkisblau, Wasseroberfläche als heller Himmel; Finale: tiefes Blau */
NEBEL_TAG.set(0x4fbcd2);BOT_TAG.set(0x5cc6da);TOP_TAG.set(0xa6eefa);NEBEL_ABEND.set(0x0a2a58);TOP_ABEND.set(0x061a44);BOT_ABEND.set(0x0f3c72);skyMat.uniforms.top.value.copy(TOP_TAG);skyMat.uniforms.bottom.value.copy(BOT_TAG);scene.fog.color.copy(NEBEL_TAG);scene.fog.near=26;scene.fog.far=165;hemi.color.set(0xb8e8ff);hemi.intensity=.5;dir.color.set(0xe8f8ff);dir.intensity=.7;
sternMat.color.set(0xa8f0ff);sternMat.size=1.5;
FARBEN={boden:SAND,pfad:0xe8deb0,platz:0xf2e8c0,gehege:0xbab07a};
etappe1();
kulisse();
etappe2();
etappe3();
etappe3b();
etappe3c();
etappe3d();
etappe4();
etappe5();
instFlush();
}
