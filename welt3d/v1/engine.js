/* Engine für begehbare 3D-Welten. Fest, gehostet. Erwartet: CONFIG (Inhalt) und die Welt-Datei (welt-<kennwort>.js) davor. */
document.body.insertAdjacentHTML('afterbegin',`<div id="gl"></div>
<div id="zaehler" class="pille"><span id="titelz"><span id="titel">Rätsel-Zoo</span></span><span>📖 <b id="zk">0</b>/<span id="zn">10</span></span><span>❓ <b id="zr">0</b>/<span id="zn2">10</span></span></div>
<div id="knoepfe"><span id="fps">FPS: --</span><button class="rund" id="mappe" title="Wissensmappe">📖</button><button class="rund" id="kartenknopf" title="Karte">🗺️</button><button class="rund" id="tonknopf" title="Ton">🔊</button></div>
<div id="spruch" class="pille"></div>
<canvas id="mini" width="170" height="225"></canvas>
<button class="knopf" id="aktion"></button>
<canvas id="konf"></canvas>
<div id="maske"><div class="karte" id="karte"></div></div>`);
/* ===================================================================
   HILFSFUNKTIONEN UND RÄTSELTYPEN (fest)
   =================================================================== */
const $=s=>document.querySelector(s);
const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const mischen=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t}return a};
const mischenNeu=a=>{let b=mischen(a),n=0;while(a.length>1&&b.join('|')===a.join('|')&&n++<9)b=mischen(a);return b};
const gleich=(a,b)=>{const n=s=>String(s).trim().toLowerCase().replace(/[\s\-–]/g,'');return n(a)===n(b)};
const ZAHL=/^[0-9.,\/]+$/;
/* ---------- Ton ---------- */
let AC=null,tonAn=true;
function piep(f,d,typ){if(!tonAn)return;d=d||.12;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;f.forEach((fr,i)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=typ||'sine';o.frequency.value=fr;g.gain.setValueAtTime(.0001,t+i*d);g.gain.exponentialRampToValueAtTime(.16,t+i*d+.02);g.gain.exponentialRampToValueAtTime(.0001,t+(i+1)*d);o.connect(g);g.connect(AC.destination);o.start(t+i*d);o.stop(t+(i+1)*d+.03)})}catch(e){}}
const sRichtig=()=>piep([523,659,784,1047]),sFalsch=()=>piep([247,208],.16,'triangle'),sMuenze=()=>piep([988,1319],.07),sBau=()=>piep([392,523,659,784],.1,'triangle'),sKlick=()=>piep([700],.05);

/* ---------- Vorlesen (nur auf Klick) ---------- */
function vorlesen(text){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(String(text).split('·').join(''));u.lang='de-DE';u.rate=.9;speechSynthesis.speak(u)}catch(e){}}
const lautKnopf=(getText)=>{const b=el('button','rund','🔊');b.title='Vorlesen';b.style.width='40px';b.style.height='40px';b.style.fontSize='18px';b.onclick=()=>vorlesen(getText());return b};

/* ---------- Rätseltypen ---------- */
const PUZZLE={};

PUZZLE.auswahl=r=>{
  const richtig=r.optionen[0],opts=mischen(r.optionen);let sel=null;
  const node=el('div');
  const draw=()=>{node.innerHTML='';opts.forEach(o=>{const b=el('button','option'+(sel===o?' gewaehlt':''));b.textContent=o;b.onclick=()=>{sel=o;sKlick();draw()};node.appendChild(b)})};draw();
  return {node,pruefe:()=>sel==null?{leer:true}:{ok:sel===richtig,falsch:[0]}};
};

PUZZLE.eingabe=r=>{
  const node=el('div');const inp=el('input','eing');inp.type='text';inp.autocomplete='off';inp.autocapitalize='off';inp.setAttribute('inputmode','text');node.appendChild(inp);
  return {node,pruefe:()=>{const v=inp.value.trim();if(!v)return {leer:true};
    const ok=r.antworten.some(a=>ZAHL.test(String(a).trim())?v.replace(/\s/g,'')===String(a).trim():gleich(v,a));return {ok,falsch:[0]}}};
};

PUZZLE.wahrfalsch=r=>{
  const ant=r.aussagen.map(()=>null);const node=el('div');
  const draw=()=>{node.innerHTML='';r.aussagen.forEach((a,i)=>{const z=el('div','wf');const s=el('span');s.textContent=a.text;z.appendChild(s);
    [['wahr','✔ Wahr',true],['falsch','✘ Falsch',false]].forEach(([c,t,v])=>{const b=el('button',c+(ant[i]===v?' gewaehlt':''),t);b.onclick=()=>{ant[i]=v;sKlick();draw()};z.appendChild(b)});node.appendChild(z)})};draw();
  return {node,pruefe:()=>{if(ant.some(x=>x==null))return {leer:true};const falsch=[];r.aussagen.forEach((a,i)=>{if(ant[i]!==a.wahr)falsch.push(i)});return {ok:!falsch.length,falsch}}};
};

PUZZLE.luecke=r=>{
  const parts=[];let last=0,m;const re=/\[([^\]]+)\]/g;
  while((m=re.exec(r.text))){parts.push({s:r.text.slice(last,m.index)});parts.push({l:m[1].split('|')});last=re.lastIndex}
  parts.push({s:r.text.slice(last)});
  const gaps=parts.filter(p=>p.l);gaps.forEach(g=>g.v=-1);
  const chips=mischen(gaps.map(g=>g.l[0]).concat(r.extraWoerter||[])).map(t=>({t,used:false}));
  let aktiv=0;const node=el('div');
  const draw=()=>{node.innerHTML='';const t=el('div','luecke-text');let gi=0;
    parts.forEach(p=>{if(p.s!=null){t.appendChild(document.createTextNode(p.s))}else{const idx=gi++;const b=el('button','lk'+(aktiv===idx?' aktiv':'')+(p.v>=0?' voll':''));b.textContent=p.v>=0?chips[p.v].t:'';b.onclick=()=>{if(p.v>=0){chips[p.v].used=false;p.v=-1}aktiv=idx;draw()};t.appendChild(b)}});
    node.appendChild(t);const pool=el('div','pool');
    chips.forEach((c,ci)=>{if(c.used)return;const b=el('button','chip');b.textContent=c.t;b.onclick=()=>{let g=gaps[aktiv];if(g.v>=0){const e=gaps.findIndex(x=>x.v<0);if(e<0)return;aktiv=e;g=gaps[e]}g.v=ci;c.used=true;const n=gaps.findIndex(x=>x.v<0);if(n>=0)aktiv=n;sKlick();draw()};pool.appendChild(b)});node.appendChild(pool)};draw();
  return {node,pruefe:()=>{if(gaps.some(g=>g.v<0))return {leer:true};const falsch=[];gaps.forEach((g,i)=>{if(!g.l.some(a=>gleich(chips[g.v].t,a)))falsch.push(i)});return {ok:!falsch.length,falsch}}};
};

PUZZLE.zuordnen=r=>{
  const L=r.paare.map(p=>p[0]),R=mischenNeu(r.paare.map(p=>p[1]));const zu=L.map(()=>-1);let selL=null;const node=el('div','zwei');
  const draw=()=>{node.innerHTML='';
    L.forEach((t,i)=>{const b=el('button',selL===i?'gewaehlt':'');b.textContent=t;if(zu[i]>=0){const m=el('span','m',String(i+1));m.style.background=FARBE[i%6];b.appendChild(m);b.style.borderColor=FARBE[i%6]}b.onclick=()=>{selL=i;zu[i]=-1;sKlick();draw()};node.appendChild(b);
      const rr=R.map((t2,j)=>j);const j=zu.indexOf(i)>=0?null:null;
      const rb=el('button','');const rt=R[i];const von=zu.indexOf(i);rb.textContent=rt;if(von>=0){const m=el('span','m',String(von+1));m.style.background=FARBE[von%6];rb.appendChild(m);rb.style.borderColor=FARBE[von%6]}
      rb.onclick=()=>{if(selL==null)return;const alt=zu.indexOf(i);if(alt>=0)zu[alt]=-1;zu[selL]=i;selL=null;sKlick();draw()};node.appendChild(rb)});
  };draw();
  return {node,pruefe:()=>{if(zu.some(x=>x<0))return {leer:true};const falsch=[];L.forEach((t,i)=>{if(R[zu[i]]!==r.paare[i][1])falsch.push(i)});return {ok:!falsch.length,falsch}}};
};

PUZZLE.reihenfolge=r=>{
  const items=mischenNeu(r.elemente);const ord=[];const node=el('div','reihe');
  const draw=()=>{node.innerHTML='';items.forEach((t,i)=>{const pos=ord.indexOf(i);const b=el('button',pos>=0?'gewaehlt':'');b.innerHTML=`<span class="z">${pos+1}</span>`;const s=el('span');s.textContent=t;b.appendChild(s);b.onclick=()=>{if(pos>=0)ord.splice(pos,1);else ord.push(i);sKlick();draw()};node.appendChild(b)})};draw();
  return {node,pruefe:()=>{if(ord.length<items.length)return {leer:true};const falsch=[];ord.forEach((ix,p)=>{if(items[ix]!==r.elemente[p])falsch.push(p)});return {ok:!falsch.length,falsch}}};
};

PUZZLE.gruppen=r=>{
  const items=mischen(r.gruppen.flatMap((g,gi)=>g.begriffe.map(b=>({t:b,g:gi,platz:-1}))));let sel=null;const node=el('div');
  const chip=(c)=>{const b=el('button','chip'+(sel===c?' gewaehlt':''));b.textContent=c.t;return b};
  const draw=()=>{node.innerHTML='';const pool=el('div','pool');
    items.forEach(c=>{if(c.platz>=0)return;const b=chip(c);b.onclick=e=>{e.stopPropagation();sel=sel===c?null:c;sKlick();draw()};pool.appendChild(b)});node.appendChild(pool);
    const ko=el('div','koerbe');
    r.gruppen.forEach((g,gi)=>{const k=el('div','korb'+(sel?' ziel':''));k.appendChild(el('h4',null,g.name));const p=el('div','pool');
      items.forEach(c=>{if(c.platz!==gi)return;const b=chip(c);b.classList.add('dran');b.onclick=e=>{e.stopPropagation();c.platz=-1;sKlick();draw()};p.appendChild(b)});k.appendChild(p);
      k.onclick=()=>{if(sel){sel.platz=gi;sel=null;sKlick();draw()}};ko.appendChild(k)});node.appendChild(ko)};draw();
  return {node,pruefe:()=>{if(items.some(c=>c.platz<0))return {leer:true};const falsch=[];r.gruppen.forEach((g,gi)=>{if(items.some(c=>c.platz===gi&&c.g!==gi))falsch.push(gi)});return {ok:!falsch.length,falsch}}};
};

PUZZLE.bauen=r=>{
  const zeilen=r.zeilen.map(z=>z.split('|'));
  const chips=mischen(zeilen.flat().concat(r.extra||[])).map(t=>({t,used:false}));
  const rows=zeilen.map(z=>z.map(()=>-1));let aktiv=0;const node=el('div');
  const draw=()=>{node.innerHTML='';const zs=el('div','zeilen');
    rows.forEach((row,ri)=>{const z=el('div','zeile'+(ri===aktiv?' aktiv':''));z.onclick=()=>{aktiv=ri;draw()};
      row.forEach((c,si)=>{const s=el('button','bslot'+(c>=0?' voll':''));s.textContent=c>=0?chips[c].t:'';s.onclick=e=>{e.stopPropagation();if(c>=0){chips[c].used=false;row[si]=-1}aktiv=ri;sKlick();draw()};z.appendChild(s)});zs.appendChild(z)});
    node.appendChild(zs);const pool=el('div','pool');
    chips.forEach((c,ci)=>{if(c.used)return;const b=el('button','chip');b.textContent=c.t;b.onclick=()=>{let ri=aktiv;if(rows[ri].every(x=>x>=0))ri=rows.findIndex(rw=>rw.some(x=>x<0));if(ri<0)return;const si=rows[ri].findIndex(x=>x<0);rows[ri][si]=ci;c.used=true;aktiv=ri;if(rows[ri].every(x=>x>=0)){const n=rows.findIndex(rw=>rw.some(x=>x<0));if(n>=0)aktiv=n}sKlick();draw()};pool.appendChild(b)});node.appendChild(pool)};draw();
  return {node,pruefe:()=>{if(rows.some(rw=>rw.some(x=>x<0)))return {leer:true};const falsch=[];rows.forEach((rw,ri)=>{if(rw.map(c=>chips[c].t).join('|')!==zeilen[ri].join('|'))falsch.push(ri)});return {ok:!falsch.length,falsch}}};
};


/* ===================================================================
   SPIEL: begehbare 3D-Welt (fest, wird später gehostet)
   =================================================================== */
const FARBE=['#e0605a','#3b8fc4','#4caf6a','#f59e3f','#9b6fd0','#2fb5a8'];
const AVATARE=[
  {jacke:0xe0605a,hose:0x3a5a8a,haut:0xf1c9a0,haar:0x6b4626,stil:'kurz',rucksack:0x3b8fc4},
  {jacke:0x9b6fd0,hose:0x3a4a6a,haut:0xf1c9a0,haar:0xe8c24a,stil:'zoepfe',rucksack:null},
  {jacke:0x4caf6a,hose:0x5a5a64,haut:0xd9a77a,haar:0x2a1d14,stil:'cap',rucksack:0xf59e3f},
  {jacke:0xf59e3f,hose:0x3a5a8a,haut:0x8a5a3a,haar:0x1b1410,stil:'pferd',rucksack:null},
  {jacke:0x2fb5a8,hose:0x4a4a5a,haut:0xe8b98f,haar:0xb5651d,stil:'brille',rucksack:0xe0605a},
  {jacke:0xe8588a,hose:0x3a4a6a,haut:0xf1c9a0,haar:0x2a1d14,stil:'dutt',rucksack:null},
  {jacke:0x3b8fc4,hose:0x5a4a3a,haut:0x6b4226,haar:0x120d09,stil:'locken',rucksack:0xffd45e},
  {jacke:0xffd45e,hose:0x3a5a8a,haut:0xd9a77a,haar:0x8a5a32,stil:'muetze',rucksack:null}
];
/* ---------- Vorschaubild einer Figur (für die Auswahl) ---------- */
const hx=c=>'#'+('000000'+c.toString(16)).slice(-6);
function avSvg(av){const H=hx(av.haar),h=av.haut,F=hx(h),J=hx(av.jacke);let s='<svg viewBox="0 0 60 60" width="64" height="64">';
  s+='<rect width="60" height="60" rx="14" fill="#e6f3fa"/><ellipse cx="30" cy="60" rx="21" ry="15" fill="'+J+'"/>';
  const st=av.stil;
  if(st==='zoepfe')s+='<ellipse cx="13" cy="38" rx="4" ry="9" fill="'+H+'"/><ellipse cx="47" cy="38" rx="4" ry="9" fill="'+H+'"/>';
  if(st==='pferd')s+='<ellipse cx="46" cy="36" rx="4" ry="10" fill="'+H+'"/>';
  if(st==='locken')[[13,24],[47,24],[16,14],[44,14],[30,8],[12,36],[48,36]].forEach(p=>{s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="8" fill="'+H+'"/>'});
  if(st==='dutt')s+='<circle cx="30" cy="9" r="7" fill="'+H+'"/>';
  s+='<circle cx="30" cy="31" r="16" fill="'+F+'"/>';
  if(st==='cap')s+='<path d="M14 28A16 16 0 0 1 46 28Z" fill="#e0302a"/><rect x="28" y="25" width="22" height="5" rx="2" fill="#e0302a"/>';
  else if(st==='muetze')s+='<path d="M14 29A16 16 0 0 1 46 29Z" fill="#e0302a"/><rect x="13" y="26" width="34" height="6" rx="3" fill="#fff"/><circle cx="30" cy="12" r="4" fill="#fff"/>';
  else s+='<path d="M14 30A16 16 0 0 1 46 30Q40 22 30 24Q20 22 14 30Z" fill="'+H+'"/>';
  s+='<circle cx="24" cy="33" r="2" fill="#222"/><circle cx="36" cy="33" r="2" fill="#222"/><path d="M25 39Q30 43 35 39" stroke="#a84040" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
  if(st==='brille')s+='<circle cx="24" cy="33" r="5" fill="none" stroke="#2a2a2a" stroke-width="1.5"/><circle cx="36" cy="33" r="5" fill="none" stroke="#2a2a2a" stroke-width="1.5"/><path d="M29 33H31" stroke="#2a2a2a" stroke-width="1.5"/>';
  return s+'</svg>'}
let S={name:'',jacke:0,karten:{},geloest:{}};
let modal=false,gestartet=false;
const KEY=n=>'welt3d|'+CONFIG.spielname+'|'+n;
function speichern(){try{if(typeof spieler!=='undefined'&&gestartet){S.x=Math.round(spieler.position.x*10)/10;S.z=Math.round(spieler.position.z*10)/10}localStorage.setItem(KEY(S.name),JSON.stringify(S))}catch(e){}}
const LETZT='welt3d-letzter|'+CONFIG.spielname;
function letzter(){try{return JSON.parse(localStorage.getItem(LETZT))||null}catch(e){return null}}
function laden(n){try{const t=localStorage.getItem(KEY(n));return t?JSON.parse(t):null}catch(e){return null}}
const N=CONFIG.auftraege.length;
const zaehle=o=>Object.keys(o).filter(k=>o[k]).length;
const WINTER=CONFIG.kulisse==='winter'; /* sommer (Standard) oder winter */

/* ---------- WebGL starten ---------- */
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'})}catch(e){document.body.innerHTML='<p style="padding:30px;font-size:22px">Dein Gerät kann diese 3D-Welt leider nicht anzeigen.</p>';throw e}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
$('#gl').appendChild(renderer.domElement);
const cv3=renderer.domElement;
const scene=new THREE.Scene();
const NEBEL_TAG=new THREE.Color(0xdcecf7),NEBEL_ABEND=new THREE.Color(0x2a3a66);
scene.fog=new THREE.Fog(0xdcecf7,90,300);
const camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.5,700);

/* ---------- Hilfsfunktionen zum Bauen ---------- */
let seed=11;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const mc={};const mat=c=>mc[c]||(mc[c]=new THREE.MeshLambertMaterial({color:c}));
const gSph=new THREE.SphereGeometry(1,12,8),gBox=new THREE.BoxGeometry(1,1,1),gCone=new THREE.ConeGeometry(1,1,8),gCyl=new THREE.CylinderGeometry(1,1,1,10);
function mesh(g,c,x,y,z,sx,sy,sz,par,cast){const m=new THREE.Mesh(g,mat(c));m.position.set(x,y,z);m.scale.set(sx,sy,sz);if(cast)m.castShadow=true;if(par)par.add(m);return m}
const sph=(r,c,x,y,z,par,sx,sy,sz)=>mesh(gSph,c,x,y,z,r*(sx||1),r*(sy||1),r*(sz||1),par);
const box=(w,h,d,c,x,y,z,par,cast)=>mesh(gBox,c,x,y,z,w,h,d,par,cast);
const cone=(r,h,c,x,y,z,par,cast)=>mesh(gCone,c,x,y,z,r,h,r,par,cast);
const cyl=(r,h,c,x,y,z,par,cast)=>mesh(gCyl,c,x,y,z,r,h,r,par,cast);
const grp=(x,y,z,par)=>{const g=new THREE.Group();g.position.set(x,y,z);(par||scene).add(g);return g};
const colliders=[];const kreis=(x,z,r)=>colliders.push({x,z,r});

/* ---------- Himmel, Licht ---------- */
const himmel=new THREE.Group();himmel.userData.keep=1;scene.add(himmel);
const skyMat=new THREE.ShaderMaterial({uniforms:{top:{value:new THREE.Color(0x5fa8e8)},bottom:{value:new THREE.Color(0xdcecf7)}},
  vertexShader:'varying float h;void main(){h=normalize(position).y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:'uniform vec3 top;uniform vec3 bottom;varying float h;void main(){gl_FragColor=vec4(mix(bottom,top,smoothstep(-0.05,0.65,h)),1.0);}',side:THREE.BackSide,depthWrite:false,fog:false});
const sky=new THREE.Mesh(new THREE.SphereGeometry(450,24,16),skyMat);sky.renderOrder=-10;himmel.add(sky);
const sonne=new THREE.Mesh(new THREE.SphereGeometry(10,16,12),new THREE.MeshBasicMaterial({color:0xfff2b0,fog:false}));sonne.position.set(140,110,-60);himmel.add(sonne);
const sternPos=new Float32Array(400*3);for(let i=0;i<400;i++){const a=rnd()*6.283,b=Math.acos(rnd()*.9+.1);sternPos[i*3]=Math.sin(b)*Math.cos(a)*260;sternPos[i*3+1]=Math.cos(b)*260;sternPos[i*3+2]=Math.sin(b)*Math.sin(a)*260}
const sternGeo=new THREE.BufferGeometry();sternGeo.setAttribute('position',new THREE.BufferAttribute(sternPos,3));
const sternMat=new THREE.PointsMaterial({color:0xffffff,size:2.4,sizeAttenuation:false,transparent:true,opacity:0,fog:false,depthWrite:false});himmel.add(new THREE.Points(sternGeo,sternMat));
const hemi=new THREE.HemisphereLight(0xcfe6ff,0xe8eef5,.55);scene.add(hemi);
const dir=new THREE.DirectionalLight(0xfff2d6,.8);dir.castShadow=true;dir.shadow.mapSize.set(1024,1024);
const sc=dir.shadow.camera;sc.left=-24;sc.right=24;sc.top=24;sc.bottom=-24;sc.near=1;sc.far=90;dir.shadow.bias=-.0008;scene.add(dir);scene.add(dir.target);
let abend=0; /* 0 = Tag, 1 = Abend (Feuerwerk) */
const TOP_TAG=new THREE.Color(0x5fa8e8),TOP_ABEND=new THREE.Color(0x0e1633),BOT_TAG=new THREE.Color(0xdcecf7),BOT_ABEND=new THREE.Color(0x3a4a86);
function setzeAbend(a){abend=a;skyMat.uniforms.top.value.copy(TOP_TAG).lerp(TOP_ABEND,a);skyMat.uniforms.bottom.value.copy(BOT_TAG).lerp(BOT_ABEND,a);scene.fog.color.copy(NEBEL_TAG).lerp(NEBEL_ABEND,a);hemi.intensity=.55-.3*a;dir.intensity=.8-.5*a;sternMat.opacity=a;sonne.visible=a<.5}

/* ---------- Tiere (aus einfachen Formen, schauen nach +x) ---------- */
const lebendig=[];
function blick(o,dx,dz){o.rotation.y=Math.atan2(-dz,dx)}
function tier(fn,x,z,bx,bz,sk,r){const o=fn(scene);let ersterKoerper=true;o.traverse(m=>{if(m.isMesh&&m.castShadow){if(ersterKoerper)ersterKoerper=false;else m.castShadow=false}});o.position.set(x,0,z);blick(o,bx-x,bz-z);o.scale.setScalar(sk||1);if(r)kreis(x,z,r*(sk||1));lebendig.push({o,ph:rnd()*6});return o}
/* ---------- Bereiche aufbauen ---------- */
function zaun(cx,cz,r,n,luecke){const g=grp(cx,0,cz);for(let i=0;i<n;i++){const a=i/n*Math.PI*2;if(luecke!=null&&Math.abs(Math.atan2(Math.sin(a-luecke),Math.cos(a-luecke)))<.4)continue;box(.18,1.2,.18,0x8b5a2b,Math.cos(a)*r,.6,Math.sin(a)*r,g)}
  [1.0,.55].forEach(h=>{const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.06,5,Math.max(24,n)),mat(0xa87846));ring.rotation.x=Math.PI/2;ring.position.y=h;g.add(ring)})}
function haus(x,z,w,d,wand,dach,par){const g=grp(x,0,z,par);box(w,2.2,d,wand,0,1.1,0,g,true);const r1=box(w+.6,.15,d/2+.5,dach,0,2.6,-d/4,g);r1.rotation.x=.5;const r2=box(w+.6,.15,d/2+.5,dach,0,2.6,d/4,g);r2.rotation.x=-.5;return g}
function schildText(text,farbe,sx,sy,schrift){const c=document.createElement('canvas');c.width=512;c.height=128;const t=c.getContext('2d');t.fillStyle=farbe||'#fff8e6';t.fillRect(0,0,512,128);t.strokeStyle='#8b5a2b';t.lineWidth=10;t.strokeRect(5,5,502,118);t.fillStyle='#4a2f12';t.font='bold '+(schrift||64)+'px Andika,Arial,sans-serif';t.textAlign='center';t.textBaseline='middle';t.fillText(text,256,68);
  const tex=new THREE.CanvasTexture(c);return new THREE.Mesh(new THREE.PlaneGeometry(sx||5,sy||1.25),new THREE.MeshBasicMaterial({map:tex}))}
function wegweiser(x,z,text,winkel){const g=grp(x,0,z);cyl(.1,2.6,0x7a5230,0,1.3,0,g,true);const s=schildText(text,'#fff8e6',3.2,.8,52);s.position.set(0,2.5,.12);g.add(s);const s2=s.clone();s2.rotation.y=Math.PI;s2.position.z=-.12;g.add(s2);g.rotation.y=winkel||0;kreis(x,z,.4)}
function blume(x,z,farbe){cyl(.03,.5,0x3f9a46,x,.25,z,scene);sph(.13,farbe,x,.55,z,scene)}
function tor(x,z,breite){const g=grp(x,0,z);[-1,1].forEach(s=>{box(1,5,1,0x9a7a5a,s*breite/2,2.5,0,g,true);box(1.3,.4,1.3,0xffffff,s*breite/2,5.1,0,g)});box(breite+1,.9,.5,0xb94a3a,0,4.6,0,g,true);return g}
function felsen(x,z,r,par){const g=sph(r,0x9aa0a6,x,r*.5,z,par||scene,1.2,.75,1);g.castShadow=true;return g}
function wasserFl(x,z,r,farbe,dy){const w=cyl(r,.18,farbe,x,.1+(dy||0),z);scene.add(w);w.receiveShadow=true;return w}
/* ---------- Besucher (andere Kinder spazieren durch den Zoo) ---------- */
const besucher=[];
const gHalb=new THREE.SphereGeometry(1,14,8,0,Math.PI*2,0,Math.PI/2);
function kindModell(av,par){const g=grp(0,0,0,par);
  const bl=grp(-.2,.85,0,g),br=grp(.2,.85,0,g);[bl,br].forEach(b=>{cyl(.13,.8,av.hose,0,-.42,0,b,true);box(.3,.2,.46,0xf5f5f5,0,-.82,.07,b);box(.3,.08,.46,0x3a3a44,0,-.92,.07,b)});
  const t=cyl(.37,.9,av.jacke,0,1.3,0,g,true);t.scale.z=.3;box(.78,.12,.58,av.hose,0,.9,0,g);
  const al=grp(-.47,1.62,0,g),ar=grp(.47,1.62,0,g);[al,ar].forEach(a=>{cyl(.11,.7,av.jacke,0,-.34,0,a,true);sph(.12,av.haut,0,-.76,0,a)});
  if(av.rucksack)box(.55,.65,.25,av.rucksack,0,1.35,-.34,g,true);
  const kopf=grp(0,2.05,0,g);sph(.5,av.haut,0,0,0,kopf).castShadow=true;
  [-1,1].forEach(x=>{sph(.1,av.haut,x*.5,0,0,kopf,1,1.2,.6);sph(.11,0xffffff,x*.18,.06,.43,kopf,1,1.25,.5);sph(.065,0x1b1b1b,x*.18,.05,.47,kopf,1,1.2,.6);sph(.022,0xffffff,x*.2,.1,.51,kopf);sph(.08,0xf2a0a0,x*.3,-.1,.4,kopf,1,.7,.4)});
  sph(.045,av.haut,0,-.04,.5,kopf);const mund=new THREE.Mesh(new THREE.TorusGeometry(.09,.022,6,10,Math.PI),mat(0xa84040));mund.rotation.z=Math.PI;mund.position.set(0,-.12,.47);kopf.add(mund);
  const h=av.haar;
  if(av.stil==='cap'){sph(.53,h,0,.04,-.08,kopf,1,.8,1);const k=mesh(gHalb,0xe0302a,0,.1,0,.55,.55,.55,kopf);k.scale.set(.55,.5,.58);box(.5,.06,.36,0xe0302a,0,.16,.55,kopf)}
  else{sph(.54,h,0,.1,-.07,kopf,1,.85,1.02);sph(.3,h,0,.36,.34,kopf,1.4,.4,.7)}
  if(av.stil==='zoepfe')[-1,1].forEach(x=>{sph(.18,h,x*.55,-.18,-.05,kopf,.8,1.6,.8);sph(.08,0xe0605a,x*.52,.04,-.03,kopf)});
  if(av.stil==='pferd'){sph(.2,h,0,.12,-.58,kopf,.8,1.8,.8);sph(.08,0xe0605a,0,.2,-.5,kopf)}
  if(av.stil==='dutt'){sph(.24,h,0,.66,-.12,kopf);sph(.07,0xe0605a,0,.5,-.12,kopf)}
  if(av.stil==='locken')[[-.52,.12,.1],[.52,.12,.1],[-.46,.34,-.2],[.46,.34,-.2],[0,.52,-.12],[-.28,.5,.1],[.28,.5,.1],[-.3,-.1,-.46],[.3,-.1,-.46]].forEach(p=>sph(.22,h,p[0],p[1],p[2],kopf));
  if(av.stil==='muetze'){const k=mesh(gHalb,0xe0302a,0,.1,0,.57,.57,.57,kopf);k.scale.set(.57,.55,.6);box(.62,.12,.5,0xffffff,0,.08,.02,kopf);sph(.14,0xffffff,0,.64,0,kopf)}
  if(av.stil==='brille'){[-1,1].forEach(x=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.15,.028,6,14),mat(0x2a2a2a));r.position.set(x*.2,.06,.5);kopf.add(r)});box(.12,.03,.03,0x2a2a2a,0,.08,.52,kopf)}
  return {g,bl,br,al,ar,kopf}}
function besucherFigur(av){const m=kindModell(av);m.g.userData.keep=1;m.t=rnd()*9;return m}
function besucherUpdate(dt){besucher.forEach(f=>{const g=f.g;let dx=f.ziel[0]-g.position.x,dz=f.ziel[1]-g.position.z;const l=Math.hypot(dx,dz);
  if(l<1.2){f.ziel=BPTS[Math.floor(rnd()*BPTS.length)];f.pause=1+rnd()*3}
  if(f.pause>0){f.pause-=dt;f.bl.rotation.x=f.br.rotation.x=f.al.rotation.x=f.ar.rotation.x=0;return}
  dx/=l;dz/=l;g.position.x+=dx*f.v*dt;g.position.z+=dz*f.v*dt;g.rotation.y=Math.atan2(dx,dz);f.t+=dt*7;const s=Math.sin(f.t)*.7;f.bl.rotation.x=s;f.br.rotation.x=-s;f.al.rotation.x=-s*.7;f.ar.rotation.x=s*.7})}

/* ---------- Unbewegliche Teile zu Blöcken zusammenfassen (weniger Zeichenaufrufe, wichtig fürs iPad) ---------- */
function verschmelzen(){
  const gr={},alt=[];scene.updateMatrixWorld(true);
  scene.traverse(m=>{
    if(!m.isMesh||m.isInstancedMesh||!m.visible)return;
    const mt=m.material;if(Array.isArray(mt)||mt.transparent||mt.map||mt.wireframe||mt.isShaderMaterial)return;
    for(let o=m;o;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep))return}
    const g=m.geometry.clone();g.applyMatrix4(m.matrixWorld);g.computeBoundingSphere();
    if(g.boundingSphere.radius>40){g.dispose();return}
    const c=g.boundingSphere.center,key=mt.uuid+'|'+Math.floor(c.x/45)+'|'+Math.floor(c.z/45)+'|'+(m.castShadow?1:0)+(m.receiveShadow?1:0);
    (gr[key]=gr[key]||{mt,cast:m.castShadow,recv:m.receiveShadow,liste:[]}).liste.push(g);alt.push(m)});
  for(const k in gr){const q=gr[k];let nv=0,ni=0;q.liste.forEach(g=>{nv+=g.attributes.position.count;ni+=g.index?g.index.count:g.attributes.position.count});
    const P=new Float32Array(nv*3),N=new Float32Array(nv*3),I=new Uint32Array(ni);let vo=0,io=0;
    q.liste.forEach(g=>{const c=g.attributes.position.count;P.set(g.attributes.position.array,vo*3);N.set(g.attributes.normal.array,vo*3);
      if(g.index){const ix=g.index.array;for(let j=0;j<ix.length;j++)I[io+j]=ix[j]+vo;io+=ix.length}else{for(let j=0;j<c;j++)I[io+j]=vo+j;io+=c}vo+=c;g.dispose()});
    const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(P,3));G.setAttribute('normal',new THREE.BufferAttribute(N,3));G.setIndex(new THREE.BufferAttribute(I,1));
    const mm=new THREE.Mesh(G,q.mt);mm.castShadow=q.cast;mm.receiveShadow=q.recv;scene.add(mm)}
  alt.forEach(m=>{if(m.parent)m.parent.remove(m)})}

/* ---------- Welt bauen (Datei welt-<kennwort>.js) ---------- */
weltBauen();
verschmelzen();

/* ---------- Stationen (Rätsel) und Wissenskarten ---------- */
function marke(txt,bg){const c=document.createElement('canvas');c.width=c.height=128;const t=c.getContext('2d');t.fillStyle=bg;t.beginPath();t.arc(64,64,58,0,6.3);t.fill();t.strokeStyle='#fff';t.lineWidth=8;t.stroke();t.fillStyle='#fff';t.font='bold 80px Andika,Arial,sans-serif';t.textAlign='center';t.textBaseline='middle';t.fillText(txt,64,70);const tx=new THREE.CanvasTexture(c);return tx}
const balkenMat=(c)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.22,depthWrite:false,blending:THREE.AdditiveBlending});
const stationen=[],karten=[];
/* gut verteilte freie Stellen im ganzen Zoo (je Rätsel eine Stelle und je Wissenskarte eine) */
const SPOTS=(function(){const cand=[];for(let x=GRENZE.x0+10;x<=GRENZE.x1-10;x+=5)for(let z=TORZ+12;z<=GRENZE.z1-14;z+=5){let ok=true;for(const c of colliders){if(Math.hypot(x-c.x,z-c.z)<c.r+2.4){ok=false;break}}if(ok&&typeof EXTRAZONEN!=='undefined'&&EXTRAZONEN.some(e=>Math.hypot(x-e.x,z-e.z)<(e.r||0)+1.5))ok=false;if(ok)cand.push([x,z])}
  const need=2*N,pick=[],dm=cand.map(c=>Math.min(Math.hypot(c[0]-START.x,c[1]-START.z),Math.hypot(c[0],c[1]-TORZ)*.6));
  while(pick.length<need&&cand.length){let bj=0;for(let j=1;j<cand.length;j++)if(dm[j]>dm[bj])bj=j;const c=cand[bj];pick.push(c);for(let j=0;j<cand.length;j++){const d=Math.hypot(cand[j][0]-c[0],cand[j][1]-c[1]);if(d<dm[j])dm[j]=d}}
  return pick})();
CONFIG.auftraege.forEach((a,i)=>{
  const x=SPOTS[2*i%SPOTS.length][0],z=SPOTS[2*i%SPOTS.length][1];
  const g=grp(x,0,z);cyl(.18,2.2,0x7a5230,0,1.1,0,g,true);const ring=new THREE.Mesh(new THREE.RingGeometry(1.5,2.1,32),new THREE.MeshBasicMaterial({color:0xf59e3f,side:THREE.DoubleSide,transparent:true,opacity:.85}));ring.rotation.x=-Math.PI/2;ring.position.y=.08;g.add(ring);
  const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:marke('?','#f59e3f'),depthTest:false}));spr.scale.set(2.2,2.2,1);spr.position.y=3.6;spr.renderOrder=5;g.add(spr);
  const nr=schildText(String(i+1),'#fff8e6',1.3,1.3);nr.position.set(0,2.3,.25);g.add(nr);kreis(x,z,.5);
  stationen.push({i,x,z,g,ring,spr});
  /* Wissenskarte in der Nähe */
  const kx=SPOTS[(2*i+1)%SPOTS.length][0],kz=SPOTS[(2*i+1)%SPOTS.length][1];const kg=grp(kx,0,kz);const kar=grp(0,1.9,0,kg);box(1.2,1.6,.12,0xe8b930,0,0,0,kar,true);box(.95,1.3,.14,0xfff6d0,0,0,0,kar);box(.6,.08,.16,0xc99a20,0,.35,0,kar);box(.6,.08,.16,0xc99a20,0,.1,0,kar);box(.6,.08,.16,0xc99a20,0,-.15,0,kar);
  const ks2=new THREE.Sprite(new THREE.SpriteMaterial({map:marke(String(i+1),'#e8b930')}));ks2.scale.set(1.3,1.3,1);ks2.position.y=3.5;kg.add(ks2);
  const ks=new THREE.Mesh(new THREE.RingGeometry(.9,1.3,24),new THREE.MeshBasicMaterial({color:0xffd45e,side:THREE.DoubleSide,transparent:true,opacity:.8}));ks.rotation.x=-Math.PI/2;ks.position.y=.08;kg.add(ks);
  karten.push({i,x:kx,z:kz,g:kg,kar,da:true});
});
function stationFertig(st){st.ring.material.color.set(0x4caf6a);st.spr.material.map=marke('✓','#4caf6a');st.spr.material.needsUpdate=true}
function kartePicken(k){k.da=false;k.g.visible=false}

/* ---------- Spielfigur ---------- */
const spieler=grp(START.x,0,START.z);
const teile={};
function figurBauen(av){while(spieler.children.length)spieler.remove(spieler.children[0]);const m=kindModell(av,spieler);teile.beinL=m.bl;teile.beinR=m.br;teile.armL=m.al;teile.armR=m.ar}
figurBauen(AVATARE[0]);

/* ---------- Eingaben ---------- */
let yaw=0,pitch=.52,dist=11,joy={x:0,y:0},tasten={},ziel=null,blickWinkel=Math.PI;
addEventListener('keydown',e=>{tasten[e.key.toLowerCase()]=true});addEventListener('keyup',e=>{tasten[e.key.toLowerCase()]=false});
const zeiger={};let halteT=0;
cv3.addEventListener('pointerdown',e=>{cv3.setPointerCapture(e.pointerId);zeiger[e.pointerId]={x:e.clientX,y:e.clientY,t:performance.now(),bew:0}});
cv3.addEventListener('pointermove',e=>{const p=zeiger[e.pointerId];if(!p)return;const ids=Object.keys(zeiger);
  if(ids.length===2){const q=zeiger[ids.find(k=>+k!==e.pointerId)];const d0=Math.hypot(p.x-q.x,p.y-q.y);p.x=e.clientX;p.y=e.clientY;const d1=Math.hypot(p.x-q.x,p.y-q.y);dist=Math.max(5,Math.min(55,dist*d0/Math.max(d1,1)));p.bew+=99;return}
  const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;p.bew+=Math.abs(dx)+Math.abs(dy);if(p.bew>10){yaw-=dx*.006;pitch=Math.max(.2,Math.min(1.15,pitch+dy*.004))}});
const zeigerAus=e=>{const p=zeiger[e.pointerId];delete zeiger[e.pointerId];if(p&&p.bew<10&&performance.now()-p.t<400&&!modal&&gestartet)tippGehen(e.clientX,e.clientY)};
cv3.addEventListener('pointerup',zeigerAus);cv3.addEventListener('pointercancel',e=>{delete zeiger[e.pointerId]});
cv3.addEventListener('wheel',e=>{dist=Math.max(5,Math.min(55,dist+e.deltaY*.03));e.preventDefault()},{passive:false});
const ray=new THREE.Raycaster(),ebene=new THREE.Plane(new THREE.Vector3(0,1,0),0),pt=new THREE.Vector3();
const zielMarke=new THREE.Mesh(new THREE.RingGeometry(.4,.65,20),new THREE.MeshBasicMaterial({color:0xf59e3f,side:THREE.DoubleSide,transparent:true,opacity:.9}));zielMarke.rotation.x=-Math.PI/2;zielMarke.visible=false;scene.add(zielMarke);
function tippGehen(cx,cy,stumm){ray.setFromCamera({x:cx/innerWidth*2-1,y:-(cy/innerHeight)*2+1},camera);if(ray.ray.intersectPlane(ebene,pt)){ziel={x:Math.max(GRENZE.x0,Math.min(GRENZE.x1,pt.x)),z:Math.max(GRENZE.z0,Math.min(GRENZE.z1,pt.z))};zielMarke.position.set(ziel.x,.1,ziel.z);zielMarke.visible=true;if(!stumm)sKlick()}}

/* ---------- Bewegung ---------- */
const SPEED=11;let laufT=0;
function bewegen(dt){
  let ix=joy.x,iy=joy.y;if(tasten['arrowleft']||tasten['a'])ix-=1;if(tasten['arrowright']||tasten['d'])ix+=1;if(tasten['arrowup']||tasten['w'])iy+=1;if(tasten['arrowdown']||tasten['s'])iy-=1;
  let dx=0,dz=0;const sy=Math.sin(yaw),cy=Math.cos(yaw);
  if(Math.hypot(ix,iy)>.12){const l=Math.min(1,Math.hypot(ix,iy));const fx=-sy,fz=-cy,rx=cy,rz=-sy;dx=(fx*iy+rx*ix);dz=(fz*iy+rz*ix);const n=Math.hypot(dx,dz)||1;dx=dx/n*l;dz=dz/n*l;ziel=null;zielMarke.visible=false;if(tasten['arrowleft']||tasten['arrowright']||tasten['arrowup']||tasten['arrowdown']||tasten['w']||tasten['a']||tasten['s']||tasten['d'])ziel=null}
  else if(ziel){const vx=ziel.x-spieler.position.x,vz=ziel.z-spieler.position.z,l=Math.hypot(vx,vz);if(l<.5){ziel=null;zielMarke.visible=false}else{dx=vx/l;dz=vz/l}}
  const ist=Math.hypot(dx,dz)>0;
  if(ist){const ox=spieler.position.x,oz=spieler.position.z;let nx=ox+dx*SPEED*dt,nz=oz+dz*SPEED*dt;
    nx=Math.max(GRENZE.x0+1,Math.min(GRENZE.x1-1,nx));nz=Math.max(GRENZE.z0+1,Math.min(GRENZE.z1-1,nz));
    /* Tor-Wand */
    if(oz>TORZ&&nz<=TORZ&&(ausgang.offen<.9||Math.abs(nx)>2.6))nz=oz;
    if(oz<=TORZ&&nz>TORZ&&Math.abs(nx)>2.6)nz=oz;
    for(const c of colliders){const ex=nx-c.x,ez=nz-c.z,d=Math.hypot(ex,ez),m=c.r+.55;if(d<m&&d>.001){nx=c.x+ex/d*m;nz=c.z+ez/d*m}}
    spieler.position.x=nx;spieler.position.z=nz;
    const w=Math.atan2(dx,dz);let dw=w-blickWinkel;dw=Math.atan2(Math.sin(dw),Math.cos(dw));blickWinkel+=dw*Math.min(1,dt*12);spieler.rotation.y=blickWinkel;
    laufT+=dt*11}
  const s=ist?Math.sin(laufT)*.8:0;teile.beinL.rotation.x=s;teile.beinR.rotation.x=-s;teile.armL.rotation.x=-s*.8;teile.armR.rotation.x=s*.8;
  spieler.position.y=ist?Math.abs(Math.sin(laufT))*.08:0;
}

/* ---------- Schnee ---------- */
const NS=700,sPos=new Float32Array(NS*3),sV=new Float32Array(NS);
for(let i=0;i<NS;i++){sPos[i*3]=(rnd()-.5)*60;sPos[i*3+1]=rnd()*26;sPos[i*3+2]=(rnd()-.5)*60;sV[i]=1.2+rnd()*1.6}
const flockeTex=(()=>{const c=document.createElement('canvas');c.width=c.height=32;const t=c.getContext('2d');const g=t.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'#fff');g.addColorStop(1,'#fff0');t.fillStyle=g;t.fillRect(0,0,32,32);return new THREE.CanvasTexture(c)})();
const sGeo=new THREE.BufferGeometry();sGeo.setAttribute('position',new THREE.BufferAttribute(sPos,3));
const schnee=new THREE.Points(sGeo,new THREE.PointsMaterial({color:0xffffff,size:.32,map:flockeTex,transparent:true,depthWrite:false,opacity:.95}));schnee.frustumCulled=false;schnee.visible=WINTER;scene.add(schnee);
function schneeUpdate(dt){const px=spieler.position.x,pz=spieler.position.z;for(let i=0;i<NS;i++){let y=sPos[i*3+1]-sV[i]*dt;if(y<0)y+=26;sPos[i*3+1]=y;let x=sPos[i*3],z=sPos[i*3+2];if(x-px>30)x-=60;else if(x-px<-30)x+=60;if(z-pz>30)z-=60;else if(z-pz<-30)z+=60;sPos[i*3]=x+Math.sin(y+i)*.004;sPos[i*3+2]=z}sGeo.attributes.position.needsUpdate=true}

/* ---------- Feuerwerk ---------- */
const NF=1200,fPos=new Float32Array(NF*3),fCol=new Float32Array(NF*3),fVel=new Float32Array(NF*3),fLeb=new Float32Array(NF),fBasis=new Float32Array(NF*3);let fi=0;
for(let i=0;i<NF;i++)fPos[i*3+1]=-200;
const fGeo=new THREE.BufferGeometry();fGeo.setAttribute('position',new THREE.BufferAttribute(fPos,3));fGeo.setAttribute('color',new THREE.BufferAttribute(fCol,3));
const fw=new THREE.Points(fGeo,new THREE.PointsMaterial({size:1.7,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,map:flockeTex}));fw.frustumCulled=false;scene.add(fw);
function burst(x,y,z){const c=new THREE.Color().setHSL(rnd(),1,.6);for(let k=0;k<70;k++){const i=fi++%NF;const a=rnd()*6.283,b=Math.acos(rnd()*2-1),v=6+rnd()*5;fPos[i*3]=x;fPos[i*3+1]=y;fPos[i*3+2]=z;fVel[i*3]=Math.sin(b)*Math.cos(a)*v;fVel[i*3+1]=Math.cos(b)*v;fVel[i*3+2]=Math.sin(b)*Math.sin(a)*v;fLeb[i]=1.6+rnd()*.6;fBasis[i*3]=c.r;fBasis[i*3+1]=c.g;fBasis[i*3+2]=c.b}}
function feuerwerkUpdate(dt){for(let i=0;i<NF;i++){if(fLeb[i]<=0)continue;fLeb[i]-=dt;fVel[i*3+1]-=5*dt;fPos[i*3]+=fVel[i*3]*dt;fPos[i*3+1]+=fVel[i*3+1]*dt;fPos[i*3+2]+=fVel[i*3+2]*dt;const f=Math.max(0,Math.min(1,fLeb[i]*1.6));fCol[i*3]=fBasis[i*3]*f;fCol[i*3+1]=fBasis[i*3+1]*f;fCol[i*3+2]=fBasis[i*3+2]*f;if(fLeb[i]<=0)fPos[i*3+1]=-200}fGeo.attributes.position.needsUpdate=true;fGeo.attributes.color.needsUpdate=true}

/* ---------- Tierparade ---------- */
const parade=[];let finale=null;
function paradeBauen(){const liste=[[elefant,.65],[giraffe,.6],[zebra,.8],[pinguin,1.3],[affe,1.2],[flamingo,1],[schaf,1],[pinguin,1.3]];liste.forEach((f,i)=>{const o=f[0](scene);o.position.set(-20-i*3.8,0,FEST.z+2);o.scale.setScalar(f[1]);parade.push({o,i})})}
function paradeUpdate(t,dt){parade.forEach(p=>{p.o.position.x+=dt*3;if(p.o.position.x>12)p.o.position.x-=parade.length*3.8;if(p.o.userData.anim)p.o.userData.anim(t+p.i);p.o.position.y=Math.abs(Math.sin(t*6+p.i))*.3;p.o.position.z=FEST.z+2+Math.sin(p.o.position.x*.15+p.i)*2})}

/* ---------- Tiere bewegen sich leicht ---------- */
function lebenUpdate(t){const px=spieler.position.x,pz=spieler.position.z;lebendig.forEach(l=>{const o=l.o;if(o.isObject3D){const s=Math.hypot(o.position.x-px,o.position.z-pz)<85;if(o.visible!==s)o.visible=s;if(!s)return}if(o.userData.anim)o.userData.anim(t+l.ph)})}

/* ---------- Oberfläche (HUD) ---------- */
let sprechT=null;
function sag(text,ms){const s=$('#spruch');s.textContent=text;s.style.opacity=1;clearTimeout(sprechT);sprechT=setTimeout(()=>s.style.opacity=0,ms||6000)}
function hud(){$('#mappe').textContent='\uD83D\uDCD6 '+zaehle(S.karten);$('#zk').textContent=zaehle(S.karten);$('#zr').textContent=zaehle(S.geloest);$('#zn').textContent=N;$('#zn2').textContent=N}
const mini=$('#mini'),mx=mini.getContext('2d');let miniAn=true;
$('#kartenknopf').onclick=()=>{miniAn=!miniAn;mini.style.display=miniAn?'block':'none'};
function miniZeichnen(){const W=mini.width,H=mini.height,sx=W/(GRENZE.x1-GRENZE.x0),sz=H/(GRENZE.z1-GRENZE.z0);const X=x=>(x-GRENZE.x0)*sx,Z=z=>(z-GRENZE.z0)*sz;
  mx.clearRect(0,0,W,H);mx.fillStyle='#eaf4fa';mx.fillRect(0,0,W,H);mx.strokeStyle='#e0cfa6';mx.lineWidth=4;mx.beginPath();mx.moveTo(X(0),Z(GRENZE.z1));mx.lineTo(X(0),Z(GRENZE.z0));SEITENWEGE.forEach(w=>{mx.moveTo(X(-100),Z(w));mx.lineTo(X(100),Z(w))});mx.stroke();
  mx.fillStyle='#8fb4cc';mx.font='9px Arial';mx.textAlign='center';for(const k in BEREICHE){const b=BEREICHE[k];mx.fillText(b.name,X(b.x),Z(b.z)-26)}EXTRAZONEN.forEach(b=>mx.fillText(b.name,X(b.x),Z(b.z)));
  mx.fillStyle='#3e9468';mx.fillRect(X(-5),Z(TORZ)-3,X(5)-X(-5),6);mx.fillStyle='#e0605a';mx.fillText('Ausgang',X(0),Z(TORZ)-6);
  mx.textAlign='center';karten.forEach(k=>{if(!k.da)return;mx.fillStyle='#e8b930';mx.fillRect(X(k.x)-5,Z(k.z)-6,10,12);mx.fillStyle='#4a2f0a';mx.font='bold 9px Arial';mx.fillText(String(k.i+1),X(k.x),Z(k.z)+3)});
  stationen.forEach(s=>{mx.fillStyle=S.geloest[s.i]?'#4caf6a':'#f59e3f';mx.beginPath();mx.arc(X(s.x),Z(s.z),7,0,6.3);mx.fill();mx.fillStyle='#fff';mx.font='bold 9px Arial';mx.fillText(S.geloest[s.i]?'\u2713':String(s.i+1),X(s.x),Z(s.z)+3)})
  mx.save();mx.translate(X(spieler.position.x),Z(spieler.position.z));mx.rotate(-blickWinkel+Math.PI);mx.fillStyle='#e0302a';mx.beginPath();mx.moveTo(0,-8);mx.lineTo(6,6);mx.lineTo(-6,6);mx.closePath();mx.fill();mx.restore()}

/* ---------- Ton / Konfetti ---------- */
const kcv=$('#konf'),kx=kcv.getContext('2d');let bunt=[];
function kgroesse(){kcv.width=innerWidth;kcv.height=innerHeight}
function konfetti(n){for(let i=0;i<n;i++)bunt.push({x:innerWidth/2+(Math.random()-.5)*innerWidth*.5,y:innerHeight*.3,vx:(Math.random()-.5)*9,vy:-Math.random()*9-3,c:FARBE[i%6],s:6+Math.random()*7,l:90+Math.random()*50})}
function konfettiUpdate(){kx.clearRect(0,0,kcv.width,kcv.height);bunt=bunt.filter(p=>p.l-->0);bunt.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.35;kx.globalAlpha=Math.min(1,p.l/30);kx.fillStyle=p.c;kx.fillRect(p.x,p.y,p.s,p.s*.6)});kx.globalAlpha=1}

/* ---------- Dialoge ---------- */
function karteOeffnen(){modal=true;const k=$('#karte');k.innerHTML='';k.className='karte';$('#maske').classList.add('auf');return k}
function karteSchliessen(){modal=false;try{speechSynthesis.cancel()}catch(e){}$('#maske').classList.remove('auf')}
function kopf(k,titel,sym){const kp=el('div','kopf');if(sym)kp.appendChild(el('div','nr',sym));kp.appendChild(el('h2',null,titel));const x=el('button','x','✕');x.onclick=karteSchliessen;kp.appendChild(x);k.appendChild(kp)}
function tafelAnsicht(k,i,zurueck,neu,beschr){const t=CONFIG.auftraege[i].tafel;k.className='karte papyrus';k.innerHTML='';
  const kp=el('div','mkopf');kp.appendChild(el('h2',null,'\uD83C\uDCCF '+t.titel));const x=el('button','x','\u00D7');x.onclick=karteSchliessen;kp.appendChild(x);k.appendChild(kp);
  if(neu)k.appendChild(el('div','neukarte','\uD83C\uDCCF Neue Wissenskarte! Sie liegt jetzt in deiner Mappe.'));
  k.appendChild(el('div','tafeltext',t.text));k.appendChild(el('div','keinraetsel','\uD83D\uDCA1 Das ist eine Lerntafel. Sie hilft dir bei einem Rätsel.'));
  const l=el('div','leiste');if(CONFIG.vorlesen)l.appendChild(lautKnopf(()=>t.titel+'. '+t.text));l.appendChild(el('div','platz'));
  const b=el('button','knopf',zurueck?(beschr||'\u2190 Zurück zur Aufgabe'):(neu?'Weiter erkunden':'Schließen'));
  b.onclick=zurueck||(()=>{karteSchliessen();if(neu)fliege('<div>\uD83C\uDCCF<br>'+t.titel+'</div>',$('#mappe'))});l.appendChild(b);k.appendChild(l)}
function fliege(html,zielEl){const z=zielEl.getBoundingClientRect(),d=document.createElement('div');d.className='flugkarte';d.innerHTML=html;document.body.appendChild(d);const b=d.getBoundingClientRect(),vx=innerWidth/2,vy=innerHeight/2;d.style.left=(vx-b.width/2)+'px';d.style.top=(vy-b.height/2)+'px';d.getBoundingClientRect();
  d.style.transform='translate('+(z.left+z.width/2-vx)+'px,'+(z.top+z.height/2-vy)+'px) scale(.15)';d.style.opacity='.2';
  setTimeout(()=>{d.remove();zielEl.classList.remove('bump');void zielEl.offsetWidth;zielEl.classList.add('bump')},880)}
function kartenFund(kk){S.karten[kk.i]=true;speichern();kartePicken(kk);hud();piep([500,660,1320],.14);const k=karteOeffnen();tafelAnsicht(k,kk.i,null,true);
  sag('Wissenskarte '+zaehle(S.karten)+' von '+N+' gefunden.',4000)}
function raetselOeffnen(i){const a=CONFIG.auftraege[i],r=a.raetsel;const k=karteOeffnen();raetselSeite(k,i,a,r)}
function raetselSeite(k,i,a,r){k.className='karte';k.innerHTML='';kopf(k,'Rätsel '+(i+1),String(i+1));k.appendChild(el('div','frage',r.frage));
  const p=PUZZLE[r.typ](r);k.appendChild(p.node);const hb=el('div','hinweisbox');k.appendChild(hb);const mel=el('div','meldung');k.appendChild(mel);
  const l=el('div','leiste');if(CONFIG.vorlesen)l.appendChild(lautKnopf(()=>r.frage));
  const tb=el('button','knopf blau','📖 Karte');if(!S.karten[i]){tb.classList.add('grau');tb.onclick=()=>{mel.textContent='Die Wissenskarte dazu liegt noch irgendwo in der Nähe. Suche das goldene Leuchten!'}}else tb.onclick=()=>tafelAnsicht(k,i,()=>raetselSeite(k,i,a,r));l.appendChild(tb);
  const hk=el('button','knopf grau','💡 Hinweis');l.appendChild(hk);l.appendChild(el('div','platz'));const pr=el('button','knopf','Prüfen');l.appendChild(pr);k.appendChild(l);
  let letzte=null,fehler=0;
  hk.onclick=()=>{const f0=letzte&&letzte.falsch&&letzte.falsch.length?letzte.falsch[0]:-1;const t=(f0>=0&&r.hinweise&&r.hinweise[f0])||(f0>=0&&r.gruppen&&r.gruppen[f0]&&r.gruppen[f0].hinweis)||r.hinweis||'Lies die Wissenskarte noch einmal.';hb.textContent='💡 '+t;hb.classList.add('auf')};
  pr.onclick=()=>{const res=p.pruefe();letzte=res;if(res.leer){mel.textContent='Fülle erst alles aus.';return}
    if(res.ok)geloest(k,i,a);else{fehler++;sFalsch();mel.textContent='Das stimmt noch nicht. Versuche es noch einmal.';k.classList.remove('wackeln');void k.offsetWidth;k.classList.add('wackeln')}}}
function geloest(k,i,a){S.geloest[i]=true;speichern();stationFertig(stationen[i]);hud();sRichtig();konfetti(50);k.innerHTML='';
  k.appendChild(el('div','gruss','🎉'));k.appendChild(el('div','frage','Richtig! Gut gemacht.'));if(a.raetsel.erklaerung)k.appendChild(el('div','tafeltext',a.raetsel.erklaerung));
  const rest=N-zaehle(S.geloest);k.appendChild(el('div','beute',rest>0?'Noch '+rest+' Rätsel':'Alle Rätsel gelöst!'));
  const l=el('div','leiste');l.appendChild(el('div','platz'));const b=el('button','knopf','Weiter');b.onclick=()=>{karteSchliessen();if(rest===0)torAuf(true)};l.appendChild(b);k.appendChild(l)}
function torAuf(meldung){ausgang.ziel=1;if(meldung)sag('Alle Rätsel gelöst! Das Tor zum Ausgang ist offen. Geh zum Ausgang, dort wartet eine Überraschung!',12000)}
function mappeZeigen(){const k=karteOeffnen();k.className='karte papyrus';
  const kp=el('div','mkopf');kp.appendChild(el('h2',null,'\uD83C\uDCCF Deine Wissensmappe'));const x=el('button','x','\u00D7');x.onclick=karteSchliessen;kp.appendChild(x);k.appendChild(kp);
  const f=CONFIG.auftraege.map((a,i)=>i).filter(i=>S.karten[i]);
  k.appendChild(el('div',f.length?'keinraetsel':'tafeltext',f.length?'\uD83D\uDC49 Tippe eine Karte an, dann wird sie groß.':'Du hast noch keine Karten. Suche die goldenen Wissenskarten im Zoo. Die Zahl auf der Karte zeigt, zu welchem Rätsel sie gehört.'));
  const raster=el('div','mappe-raster');f.forEach(i=>{const t=CONFIG.auftraege[i].tafel;const sk=el('div','sk');sk.style.cursor='pointer';sk.appendChild(el('h3',null,(i+1)+'. '+t.titel));sk.appendChild(el('p',null,t.text));sk.onclick=()=>{sKlick();tafelAnsicht(k,i,mappeZeigen,false,'\u2190 Zurück zur Mappe')};raster.appendChild(sk)});k.appendChild(raster);
  const l=el('div','leiste');l.appendChild(el('div','platz'));const z=el('button','knopf','Zurück zum Spiel');z.onclick=karteSchliessen;l.appendChild(z);k.appendChild(l)}
$('#mappe').onclick=()=>{if(modal)return;mappeZeigen()};
$('#tonknopf').onclick=()=>{tonAn=!tonAn;$('#tonknopf').textContent=tonAn?'🔊':'🔇'};
$('#aktion').onclick=()=>{if(modal||!aktiv)return;raetselOeffnen(aktiv.i)};
let aktiv=null,warnT=0;

/* ---------- Silbenschrift (blau/rot, automatisch getrennt, Mittelpunkt überschreibt) ---------- */
const PUNKT='·',VOK='aeiouäöüy',DIPH=['ei','ai','au','eu','äu','ie','ey','ay'];
const ONSET=['schl','schr','schw','str','spr','spl','sch','ch','ck','ph','qu','bl','br','dr','fl','fr','gl','gr','kl','kr','pl','pr','tr','zw','th'];
const ohnePunkte=t=>String(t).split(PUNKT).join('');
function silbenWort(w){
  if(w.includes(PUNKT))return w.split(PUNKT).filter(Boolean);
  const l=w.toLowerCase(),kerne=[];let i=0;
  while(i<l.length){if(VOK.includes(l[i])&&!(l[i]==='u'&&l[i-1]==='q')){let j=i+1;if(DIPH.includes(l.slice(i,i+2))||(l[i+1]===l[i]&&'aeo'.includes(l[i])))j=i+2;kerne.push([i,j]);i=j}else i++}
  if(kerne.length<2)return [w];
  const out=[];let start=0;
  for(let k=0;k<kerne.length-1;k++){const a=kerne[k][1],b=kerne[k+1][0],kons=l.slice(a,b);let on=kons.slice(-1);for(const o of ONSET)if(kons.endsWith(o)&&o.length>on.length)on=o;const cut=b-on.length;if(cut>start){out.push(w.slice(start,cut));start=cut}}
  out.push(w.slice(start));return out}
const istBuchstabe=c=>c===PUNKT||c==='ß'||c.toLowerCase()!==c.toUpperCase();
function silbenHtml(text){let out='',wort='';
  const fertig=()=>{if(!wort)return;silbenWort(wort).forEach((s,k)=>{out+='<span class="'+(k%2?'sr':'sb')+'">'+s+'</span>'});wort=''};
  for(const c of text){if(istBuchstabe(c))wort+=c;else{fertig();out+=c==='<'?'&lt;':(c==='&'?'&amp;':c)}}
  fertig();return out}
function aufbereiten(wurzel){
  if(!wurzel||wurzel.nodeType!==1)return;
  const gang=document.createTreeWalker(wurzel,NodeFilter.SHOW_TEXT),knoten=[];while(gang.nextNode())knoten.push(gang.currentNode);
  knoten.forEach(n=>{const p=n.parentElement;if(!p||!p.closest('#karte')||p.closest('svg,script,style,input,.sw,.sb,.sr'))return;
    const farbig=CONFIG.silbenschrift&&!p.closest('.chip,.bslot,.m,.z,.x,.rund,.knopf,.nr,.lk');
    if(farbig&&n.nodeValue.trim()){const sp=document.createElement('span');sp.className='sw';sp.innerHTML=silbenHtml(n.nodeValue);p.replaceChild(sp,n)}
    else if(n.nodeValue.includes(PUNKT))n.nodeValue=ohnePunkte(n.nodeValue)})}
new MutationObserver(liste=>liste.forEach(m=>{if(m.type==='characterData')aufbereiten(m.target.parentElement);else m.addedNodes.forEach(n=>aufbereiten(n.nodeType===3?n.parentElement:n))})).observe(document.body,{childList:true,subtree:true,characterData:true});

/* ---------- Urkunde ---------- */
function urkunde(){const k=karteOeffnen();k.className='karte';
  const d=new Date().toLocaleDateString('de-DE');
  k.innerHTML='<div class="urkunde"><div class="ur-rahmen"><div class="ur-stern">★ ★ ★</div><div class="ur-titel">URKUNDE</div><div class="ur-klein">'+CONFIG.spielname+'</div><div class="ur-name"></div><div class="ur-text"></div><div class="ur-fuss"><span>'+d+'</span><span>'+MASKOTTCHEN+'</span></div></div></div>';
  k.querySelector('.ur-name').textContent=S.name;k.querySelector('.ur-text').textContent=CONFIG.urkundeText;
  const l=el('div','leiste noprint');l.appendChild(el('div','platz'));const z=el('button','knopf','Weiter feiern');z.onclick=karteSchliessen;l.appendChild(z);k.appendChild(l)}
function finaleStart(){if(finale)return;finale={t:0,burstT:0,urk:false};sag('Überraschung! Die Tiere feiern mit dir!',9000);paradeBauen();konfetti(120);sRichtig()}

/* ---------- Hauptschleife ---------- */
const clock=new THREE.Clock();let saveT=0,tges=0,fpsN=0,fpsT=0;
function schleife(){requestAnimationFrame(schleife);const dt=Math.min(.05,clock.getDelta());tges+=dt;
  if(gestartet&&!modal){bewegen(dt);const ids=Object.keys(zeiger);if(ids.length===1){const q=zeiger[ids[0]];if(q.bew<10&&performance.now()-q.t>300&&tges-halteT>.12){halteT=tges;tippGehen(q.x,q.y,true)}}}else{teile.beinL.rotation.x=teile.beinR.rotation.x=teile.armL.rotation.x=teile.armR.rotation.x=0}
  /* Kamera */
  const tx=spieler.position.x,ty=1.8,tz=spieler.position.z;himmel.position.set(tx,0,tz);const cp=Math.cos(pitch),sp=Math.sin(pitch);
  const wx=tx+Math.sin(yaw)*dist*cp,wy=ty+dist*sp,wz=tz+Math.cos(yaw)*dist*cp;const wzk=Math.min(wz,GRENZE.z1-5);camera.position.x+=(wx-camera.position.x)*Math.min(1,dt*8);camera.position.y+=(wy-camera.position.y)*Math.min(1,dt*8);camera.position.z+=(wzk-camera.position.z)*Math.min(1,dt*8);camera.lookAt(tx,ty+(finale?Math.min(1,finale.t/3)*6:0),tz-(finale?Math.min(1,finale.t/3)*3:0));
  dir.position.set(tx+14,tz*0+20,tz+9);dir.target.position.set(tx,0,tz);
  /* Karten, Stationen */
  karten.forEach(k=>{if(!k.da)return;k.kar.rotation.y=tges*1.6;k.kar.position.y=1.9+Math.sin(tges*2+k.i)*.25;if(gestartet&&!modal&&Math.hypot(k.x-spieler.position.x,k.z-spieler.position.z)<2.4)kartenFund(k)});
  aktiv=null;let nah=1e9;stationen.forEach(s=>{if(S.geloest[s.i]){s.spr.position.y=3.6;return}s.spr.position.y=3.6+Math.sin(tges*3+s.i)*.2;s.ring.rotation.z=tges;const d=Math.hypot(s.x-spieler.position.x,s.z-spieler.position.z);if(d<3.6&&d<nah){nah=d;aktiv=s}});
  const ab=$('#aktion');ab.style.display=(aktiv&&!modal&&gestartet)?'block':'none';if(aktiv)ab.textContent='❓ Rätsel '+(aktiv.i+1)+' lösen';
  /* Tor */
  if(ausgang.ziel!=null){ausgang.offen+=(ausgang.ziel-ausgang.offen)*Math.min(1,dt*1.5);ausgang.fl[0].rotation.y=-ausgang.offen*1.5;ausgang.fl[1].rotation.y=ausgang.offen*1.5}
  if(gestartet&&!modal&&ausgang.offen<.9&&Math.abs(spieler.position.x)<6&&Math.abs(spieler.position.z-TORZ)<4&&tges-warnT>8){warnT=tges;sag('Das Tor ist noch zu. Löse erst alle Rätsel ('+zaehle(S.geloest)+' von '+N+').',5000)}
  /* Finale */
  if(!finale&&gestartet&&Math.hypot(spieler.position.x-FEST.x,spieler.position.z-(FEST.z+4))<9&&zaehle(S.geloest)>=N)finaleStart();
  if(finale){finale.t+=dt;abend=Math.min(1,finale.t/4);setzeAbend(abend);finale.burstT-=dt;if(finale.burstT<=0){finale.burstT=.55+rnd()*.5;burst(FEST.x+(rnd()-.5)*40,22+rnd()*12,FEST.z-12-rnd()*14)}
    paradeUpdate(tges,dt);if(!finale.urk&&finale.t>9){finale.urk=true;urkunde()}}
  if(gestartet&&tges-saveT>5){saveT=tges;speichern()}lebenUpdate(tges);besucherUpdate(dt);if(WINTER)schneeUpdate(dt);feuerwerkUpdate(dt);konfettiUpdate();miniZeichnen();
  fpsN++;fpsT+=dt;if(fpsT>=1){$('#fps').textContent='FPS: '+Math.round(fpsN/fpsT);fpsN=0;fpsT=0}
  renderer.render(scene,camera)}

/* ---------- Start ---------- */
function weltWiederherstellen(){karten.forEach(k=>{if(S.karten[k.i])kartePicken(k)});stationen.forEach(s=>{if(S.geloest[s.i])stationFertig(s)});if(zaehle(S.geloest)>=N){ausgang.ziel=1;ausgang.offen=1;ausgang.fl[0].rotation.y=-1.5;ausgang.fl[1].rotation.y=1.5}hud()}
function gespeicherte(){const out=[],pre='welt3d|'+CONFIG.spielname+'|';try{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key.indexOf(pre)===0){const s=JSON.parse(localStorage.getItem(key));if(s&&s.name&&(zaehle(s.karten||{})+zaehle(s.geloest||{}))>0)out.push(s)}}}catch(e){}return out.slice(0,8)}
function losGehts(n,jacke,alt){S=alt||{name:n,jacke:0,karten:{},geloest:{}};S.name=n;S.jacke=jacke;try{localStorage.setItem(LETZT,JSON.stringify({name:n,jacke:jacke}))}catch(e){}figurBauen(AVATARE[jacke]);const weiter=!!alt;
  if(alt&&S.x!=null)spieler.position.set(S.x,0,S.z);else spieler.position.set(START.x,0,START.z);
  if(!alt){karten.forEach(k=>{k.da=true;k.g.visible=true});stationen.forEach(s=>{s.ring.material.color.set(0xf59e3f);s.spr.material.map=marke('?','#f59e3f');s.spr.material.needsUpdate=true});ausgang.ziel=0;ausgang.offen=0;ausgang.fl[0].rotation.y=0;ausgang.fl[1].rotation.y=0}
  gestartet=true;speichern();karteSchliessen();weltWiederherstellen();sKlick();
  sag(weiter?'Willkommen zurück, '+n+'! Du hast '+zaehle(S.karten)+' Karten und '+zaehle(S.geloest)+' Rätsel. Es geht dort weiter, wo du aufgehört hast.':'Hallo '+n+'! Tippe auf den Boden, um zu laufen. Suche die goldenen Wissenskarten und die orangen Rätsel-Schilder. Die kleine Karte oben rechts hilft dir.',9000)}
function start(){document.title=CONFIG.spielname;$('#titel').textContent=CONFIG.spielname;
  const k=karteOeffnen();k.innerHTML='';k.appendChild(el('h2',null,CONFIG.spielname));k.appendChild(el('div','tafeltext',CONFIG.einleitung));
  k.appendChild(el('div','frage','So geht es: Tippe auf den Boden (oder halte den Finger gedrückt), dann läuft deine Figur dorthin. Ziehe mit dem Finger, um dich umzuschauen. Suche goldene Wissenskarten 📖 und Rätsel-Schilder ❓.'));
  const let0=letzter();let jacke=let0&&AVATARE[let0.jacke]?let0.jacke:0;const fz=el('div','figuren');AVATARE.forEach((av,i)=>{const b=el('button','fig'+(i===jacke?' gewaehlt':''),avSvg(av));b.setAttribute('aria-label','Figur '+(i+1));b.onclick=()=>{jacke=i;sKlick();[...fz.children].forEach((x,j)=>x.classList.toggle('gewaehlt',j===i));figurBauen(AVATARE[i])};fz.appendChild(b)});k.appendChild(el('div','frage','Wähle deine Figur:'));k.appendChild(fz);
  k.appendChild(el('div','keinraetsel','\uD83D\uDCBE Das Spiel speichert alles. Wenn du später weiterspielen willst, gib genau denselben Namen ein.'));const l=el('div','leiste');const inp=el('input','eing');inp.placeholder='Dein Name';if(let0&&let0.name)inp.value=let0.name;figurBauen(AVATARE[jacke]);inp.maxLength=20;inp.style.maxWidth='260px';l.appendChild(inp);l.appendChild(el('div','platz'));
  const b=el('button','knopf','Los geht’s!');b.onclick=()=>{const n=inp.value.trim()||'Gast';const alt=laden(n);
    if(alt&&(zaehle(alt.karten||{})+zaehle(alt.geloest||{}))>0){const k2=karteOeffnen();k2.appendChild(el('h2',null,'Spielstand gefunden'));
      k2.appendChild(el('div','tafeltext',n+', du hast schon '+zaehle(alt.karten||{})+' Wissenskarten gefunden und '+zaehle(alt.geloest||{})+' von '+N+' Rätseln gelöst. Möchtest du dort weiterspielen oder noch einmal von vorn anfangen?'));
      const l2=el('div','leiste');const nb=el('button','knopf grau','Neu starten');nb.onclick=()=>{sKlick();losGehts(n,jacke,null)};l2.appendChild(nb);l2.appendChild(el('div','platz'));
      const wb=el('button','knopf','▶ Weiterspielen');wb.onclick=()=>losGehts(n,jacke,alt);l2.appendChild(wb);k2.appendChild(l2);
      const zb=el('button','knopf blau','← Zurück');zb.style.marginTop='10px';zb.onclick=start;k2.appendChild(zb);return}
    losGehts(n,jacke,alt)};
  const alle=gespeicherte();if(alle.length){k.appendChild(el('div','frage','Gespeicherte Spiele:'));const ls=el('div','pool');
    alle.forEach(s=>{const bt=el('button','chip','▶ '+s.name+' ('+zaehle(s.karten||{})+' Karten, '+zaehle(s.geloest||{})+' von '+N+' Rätseln)');bt.onclick=()=>losGehts(s.name,AVATARE[s.jacke]?s.jacke:0,s);ls.appendChild(bt)});k.appendChild(ls)}
  l.appendChild(b);k.appendChild(l);$('#maske').onclick=null}
addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();kgroesse()});
kgroesse();hud();camera.position.set(START.x,9,START.z+14);start();schleife();
