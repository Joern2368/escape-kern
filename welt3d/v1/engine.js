/* Engine für begehbare 3D-Welten. Fest, gehostet. Erwartet: CONFIG (Inhalt) und die Welt-Datei (welt-<kennwort>.js) davor. */
document.body.insertAdjacentHTML('afterbegin',`<div id="gl"></div>
<div id="zaehler" class="pille"><span id="titelz"><span id="titel">Rätsel-Zoo</span></span><span>📖 <b id="zk">0</b>/<span id="zn">10</span></span><span>❓ <b id="zr">0</b>/<span id="zn2">10</span></span><span id="zsw" style="display:none">💎 <b id="zs">0</b>/5</span></div>
<div id="knoepfe"><span id="fps">FPS: --</span><button class="rund" id="urknopf" title="Urkunde" style="display:none">🏆</button><button class="rund" id="mappe" title="Wissensmappe">📖</button><button class="rund" id="kartenknopf" title="Karte">🗺️</button><button class="rund" id="tonknopf" title="Ton">🔊</button></div>
<div id="spruch" class="pille"></div>
<canvas id="mini" width="170" height="225"></canvas>
<button class="knopf" id="aktion"></button>
<canvas id="konf"></canvas>
<div id="gk"><div id="gkbox"><div id="gkkopf"><h2>🗺️ Karte</h2><button class="x" id="gkx" aria-label="Schließen">✕</button></div><div id="gkinhalt"><div id="gkkarte"><canvas id="gkc"></canvas><div id="gkblase"></div></div><div id="gkseite"><div id="gkzeichen"></div><h3 id="gkort">Orte</h3><div id="gkliste"></div><div id="gkmehr">↓ mehr Orte</div></div></div></div></div>
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
  const chips=mischen(zeilen.flat().concat([].concat(...(r.extra||[]).map(x=>String(x).split('|')))).filter(x=>x!=='')).map(t=>({t,used:false}));
  const rows=zeilen.map(z=>z.map(()=>-1));let aktiv=0;const node=el('div');
  const draw=()=>{node.innerHTML='';const zs=el('div','zeilen');
    rows.forEach((row,ri)=>{const z=el('div','zeile'+(ri===aktiv?' aktiv':''));z.onclick=()=>{aktiv=ri;draw()};
      row.forEach((c,si)=>{const s=el('button','bslot'+(c>=0?' voll':''));s.textContent=c>=0?chips[c].t:'';s.onclick=e=>{e.stopPropagation();if(c>=0){chips[c].used=false;row[si]=-1}aktiv=ri;sKlick();draw()};z.appendChild(s)});zs.appendChild(z)});
    node.appendChild(zs);const pool=el('div','pool');
    chips.forEach((c,ci)=>{if(c.used)return;const b=el('button','chip');b.textContent=c.t;b.onclick=()=>{let ri=aktiv;if(rows[ri].every(x=>x>=0))ri=rows.findIndex(rw=>rw.some(x=>x<0));if(ri<0)return;const si=rows[ri].findIndex(x=>x<0);rows[ri][si]=ci;c.used=true;aktiv=ri;if(rows[ri].every(x=>x>=0)){const n=rows.findIndex(rw=>rw.some(x=>x<0));if(n>=0)aktiv=n}sKlick();draw()};pool.appendChild(b)});node.appendChild(pool)};draw();
  return {node,pruefe:()=>{if(rows.some(rw=>rw.some(x=>x<0)))return {leer:true};const soll=zeilen.map(z=>z.join('|')),da=soll.map(()=>false);rows.forEach(rw=>{const g=rw.map(c=>chips[c].t).join('|');const j=soll.findIndex((s,k)=>!da[k]&&s===g);if(j>=0)da[j]=true});const falsch=[];da.forEach((d,k)=>{if(!d)falsch.push(k)});return {ok:!falsch.length,falsch}}};
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
const WINTER=false; /* Winter gibt es nicht mehr (23.11.2026); CONFIG.kulisse wird ignoriert */

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
/* Hindernisse fuer die Spielfigur: Linien (Zaeune, Mauern), Rechtecke (Gebaeude, Staende) */
const sperrLinien=[],sperrKaesten=[];
function sperrLinie(x1,z1,x2,z2,r){sperrLinien.push({x1,z1,x2,z2,r:r||.15})}
function sperrKasten(x,z,b,t,rot){sperrKaesten.push({x,z,hb:b/2,ht:t/2,c:Math.cos(rot||0),s:Math.sin(rot||0)})}
function sperrRing(cx,cz,r,n,luecke){const m=Math.max(8,n||60),ok=a=>luecke==null||Math.abs(Math.atan2(Math.sin(a-luecke),Math.cos(a-luecke)))>=.4;for(let i=0;i<m;i++){const a0=i/m*Math.PI*2,a1=(i+1)/m*Math.PI*2;if(ok(a0)&&ok(a1))sperrLinie(cx+Math.cos(a0)*r,cz+Math.sin(a0)*r,cx+Math.cos(a1)*r,cz+Math.sin(a1)*r)}}


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
/* Optionale Welt-Konstanten (z. B. Welt Weltraum): ABENDWERTE={sterne:Helligkeit der Sterne am Tag, sonne:Sonne immer sichtbar, hemi:[Tag,Finale], dir:[Tag,Finale]} */
const ABW=typeof ABENDWERTE!=='undefined'?ABENDWERTE:null;
function setzeAbend(a){abend=a;skyMat.uniforms.top.value.copy(TOP_TAG).lerp(TOP_ABEND,a);skyMat.uniforms.bottom.value.copy(BOT_TAG).lerp(BOT_ABEND,a);scene.fog.color.copy(NEBEL_TAG).lerp(NEBEL_ABEND,a);hemi.intensity=.55-.3*a;dir.intensity=.8-.5*a;sternMat.opacity=a;sonne.visible=a<.5;if(ABW){if(ABW.hemi)hemi.intensity=ABW.hemi[0]+(ABW.hemi[1]-ABW.hemi[0])*a;if(ABW.dir)dir.intensity=ABW.dir[0]+(ABW.dir[1]-ABW.dir[0])*a;if(ABW.sterne!=null)sternMat.opacity=Math.max(a,ABW.sterne);if(ABW.sonne!=null)sonne.visible=ABW.sonne}}

/* ---------- Tiere (aus einfachen Formen, schauen nach +x) ---------- */
const lebendig=[];
function blick(o,dx,dz){o.rotation.y=Math.atan2(-dz,dx)}
function tier(fn,x,z,bx,bz,sk,r){const o=fn(scene);let ersterKoerper=true;o.traverse(m=>{if(m.isMesh&&m.castShadow){if(ersterKoerper)ersterKoerper=false;else m.castShadow=false}});o.position.set(x,0,z);blick(o,bx-x,bz-z);o.scale.setScalar(sk||1);if(r)kreis(x,z,r*(sk||1));lebendig.push({o,ph:rnd()*6});return o}
/* ---------- Bereiche aufbauen ---------- */
function zaun(cx,cz,r,n,luecke){sperrRing(cx,cz,r,n,luecke);const g=grp(cx,0,cz);for(let i=0;i<n;i++){const a=i/n*Math.PI*2;if(luecke!=null&&Math.abs(Math.atan2(Math.sin(a-luecke),Math.cos(a-luecke)))<.4)continue;box(.18,1.2,.18,0x8b5a2b,Math.cos(a)*r,.6,Math.sin(a)*r,g)}
  [1.0,.55].forEach(h=>{const ring=new THREE.Mesh(luecke!=null?new THREE.TorusGeometry(r,.06,5,Math.max(24,n),Math.PI*2-.8):new THREE.TorusGeometry(r,.06,5,Math.max(24,n)),mat(0xa87846));if(luecke!=null)ring.rotation.z=luecke+.4;ring.rotation.x=Math.PI/2;ring.position.y=h;g.add(ring)})}
function haus(x,z,w,d,wand,dach,par){if(!par)sperrKasten(x,z,w,d,0);const g=grp(x,0,z,par);box(w,2.2,d,wand,0,1.1,0,g,true);const r1=box(w+.6,.15,d/2+.5,dach,0,2.6,-d/4,g);r1.rotation.x=-.5;const r2=box(w+.6,.15,d/2+.5,dach,0,2.6,d/4,g);r2.rotation.x=.5;return g}
/* Schilder-Regel (Wunsch der Lehrkraft): pro Welt nur etwa 15 Schilder. Jede Welt nennt in SCHILDER die erlaubten Texte (ohne Pfeile); jeder Text hoechstens einmal als Gebaeude-/Ortsschild und hoechstens fuenf Wegweiser pro Welt. */
const _SZ={};let _inWeg=false,_wegZ=0;const _schildBasis=t=>String(t).split('→').join('').split('←').join('').split('↑').join('').split('↓').join('').trim();
function schildErlaubt(t){if(typeof SCHILDER==='undefined')return true;if(/^[0-9]+$/.test(t)||t===CONFIG.spielname)return true;return SCHILDER.indexOf(_schildBasis(t))>=0}
function wegOk(t){if(typeof SCHILDER==='undefined')return true;return SCHILDER.indexOf(_schildBasis(t))>=0&&!_SZ['W|'+_schildBasis(t)]&&_wegZ<(typeof WEGMAX==='number'?WEGMAX:5)}
const _gLeer=new THREE.BufferGeometry(),_mLeer=new THREE.MeshBasicMaterial();
function schildText(text,farbe,sx,sy,schrift){if(typeof SCHILDER!=='undefined'&&!/^[0-9]+$/.test(text)&&text!==CONFIG.spielname){const k=_schildBasis(text);let schlecht=SCHILDER.indexOf(k)<0;if(!schlecht){if(_inWeg){schlecht=!!_SZ['W|'+k]||_wegZ>=(typeof WEGMAX==='number'?WEGMAX:5);if(!schlecht){_SZ['W|'+k]=1;_wegZ++}}else{schlecht=!!_SZ[k];if(!schlecht)_SZ[k]=1}}if(schlecht){const m=new THREE.Mesh(_gLeer,_mLeer);m.visible=false;return m}}const c=document.createElement('canvas');c.width=512;c.height=128;const t=c.getContext('2d');t.fillStyle=farbe||'#fff8e6';t.fillRect(0,0,512,128);t.strokeStyle='#8b5a2b';t.lineWidth=10;t.strokeRect(5,5,502,118);t.fillStyle='#4a2f12';t.font='bold '+(schrift||64)+'px Andika,Arial,sans-serif';t.textAlign='center';t.textBaseline='middle';t.fillText(text,256,68);
  const tex=new THREE.CanvasTexture(c);return new THREE.Mesh(new THREE.PlaneGeometry(sx||5,sy||1.25),new THREE.MeshBasicMaterial({map:tex}))}
/* ---------- Kurvige Wege (gemeinsam fuer alle Welten) ---------- */
function wegX(z){if(typeof WEGBOGEN!=='number')return 0;const a=TORZ+20,b=START.z-16;if(z<=a||z>=b)return 0;return WEGBOGEN*Math.sin(3*Math.PI*(z-a)/(b-a))}
function wegBand(s,w,farbe,y){const n=s.length;if(n<2)return;const P=new Float32Array(n*6),N=new Float32Array(n*6),I=[];
  for(let i=0;i<n;i++){const a=s[Math.max(0,i-1)],b=s[Math.min(n-1,i+1)];let tx=b[0]-a[0],tz=b[1]-a[1];const l=Math.hypot(tx,tz)||1;tx/=l;tz/=l;const nx=-tz*w/2,nz=tx*w/2;
    P.set([s[i][0]+nx,y,s[i][1]+nz,s[i][0]-nx,y,s[i][1]-nz],i*6);N.set([0,1,0,0,1,0],i*6);if(i<n-1){const k=i*2;I.push(k,k+2,k+1,k+1,k+2,k+3)}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('normal',new THREE.BufferAttribute(N,3));g.setIndex(I);
  const m=new THREE.Mesh(g,mat(farbe));m.receiveShadow=true;scene.add(m)}
const WEGE=[];function weg(pts,w,farbe,dy){dy=dy||0;const n=pts.length,s=[];
  for(let i=0;i<n-1;i++){const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n-1,i+2)],st=Math.max(2,Math.ceil(Math.hypot(p2[0]-p1[0],p2[1]-p1[1])/2.5));
    for(let k=0;k<st;k++){const t=k/st,t2=t*t,t3=t2*t,f=(a,b,c,d)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);s.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}}
  s.push(pts[n-1]);WEGE.push(s);const c=new THREE.Color(farbe||FARBEN.pfad).multiplyScalar(.84).getHex();wegBand(s,w+.9,c,.05+dy);wegBand(s,w,farbe||FARBEN.pfad,.062+dy)}
function wellen(x1,z1,x2,z2){const dx=x2-x1,dz=z2-z1,l=Math.hypot(dx,dz);if(l<14)return[[x1,z1],[x2,z2]];const k=Math.max(1,Math.round(l/60)),n=Math.max(4,k*4),am=Math.min(9,l*.07),sg=(Math.round(x1*7+z1*13)%2)?1:-1,nx=-dz/l,nz=dx/l,r=[];
  for(let i=0;i<=n;i++){const t=i/n,o=am*sg*Math.sin(t*Math.PI*k);r.push([x1+dx*t+nx*o,z1+dz*t+nz*o])}return r}
function hauptweg(w,farbe){const r=[];for(let z=GRENZE.z1;z>TORZ+2;z-=10)r.push([wegX(z),z]);r.push([0,TORZ+2]);weg(r,w,farbe)}
function kreuzplatz(x,z,r){cyl(r,.07,new THREE.Color(FARBEN.pfad).multiplyScalar(.84).getHex(),x,.045,z,scene).receiveShadow=true;cyl(r-.8,.08,FARBEN.platz,x,.05,z,scene).receiveShadow=true;
  cyl(2,.4,0x6dba52,x,.2,z,scene);for(let i=0;i<6;i++){const a=i*1.05;sph(.28,[0xe0605a,0xffd45e,0xf47ab0,0xffffff,0xb06ae0,0xf59e3f][i],x+Math.cos(a)*1.2,.55,z+Math.sin(a)*1.2,scene)}kreis(x,z,2.1)}
function wegweiser(x,z,text,winkel){if(!wegOk(text))return;_inWeg=true;const g=grp(x,0,z);cyl(.1,2.6,0x7a5230,0,1.3,0,g,true);const s=schildText(text,'#fff8e6',3.2,.8,52);s.position.set(0,2.5,.12);g.add(s);const s2=s.clone();s2.rotation.y=Math.PI;s2.position.z=-.12;g.add(s2);g.rotation.y=winkel||0;kreis(x,z,.4);_inWeg=false}
function blume(x,z,farbe){cyl(.03,.5,0x3f9a46,x,.25,z,scene);sph(.13,farbe,x,.55,z,scene)}
function tor(x,z,breite){kreis(x-breite/2,z,.9);kreis(x+breite/2,z,.9);const g=grp(x,0,z);[-1,1].forEach(s=>{box(1,5,1,0x9a7a5a,s*breite/2,2.5,0,g,true);box(1.3,.4,1.3,0xffffff,s*breite/2,5.1,0,g)});box(breite+1,.9,.5,0xb94a3a,0,4.6,0,g,true);return g}
function felsen(x,z,r,par){if(!par&&r>=.9)kreis(x,z,r*.95);const g=sph(r,0x9aa0a6,x,r*.5,z,par||scene,1.2,.75,1);g.castShadow=true;return g}
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
function besucherUpdate(dt){const px=spieler.position.x,pz=spieler.position.z;besucher.forEach(f=>{const g=f.g;const sicht=Math.hypot(g.position.x-px,g.position.z-pz)<(dist>35&&typeof FERNBESUCHER==='number'?FERNBESUCHER:58);if(g.visible!==sicht)g.visible=sicht;let dx=f.ziel[0]-g.position.x,dz=f.ziel[1]-g.position.z;const l=Math.hypot(dx,dz);
  if(l<1.2){f.ziel=BPTS[Math.floor(rnd()*BPTS.length)];f.pause=1+rnd()*3}
  if(f.pause>0){f.pause-=dt;f.bl.rotation.x=f.br.rotation.x=f.al.rotation.x=f.ar.rotation.x=0;return}
  dx/=l;dz/=l;g.position.x+=dx*f.v*dt;g.position.z+=dz*f.v*dt;g.rotation.y=Math.atan2(dx,dz);f.t+=dt*7;const s=Math.sin(f.t)*.7;f.bl.rotation.x=s;f.br.rotation.x=-s;f.al.rotation.x=-s*.7;f.ar.rotation.x=s*.7})}

/* ---------- Unbewegliche Teile zu Blöcken zusammenfassen (weniger Zeichenaufrufe, wichtig fürs iPad) ---------- */
function verschmelzen(){
  const ZELLE=typeof MERGEZELLE==='number'?MERGEZELLE:90,VC=typeof VERTEXFARBEN!=='undefined'&&VERTEXFARBEN;
  const gr={},alt=[];scene.updateMatrixWorld(true);
  scene.traverse(m=>{
    if(!m.isMesh||m.isInstancedMesh||!m.visible)return;
    const mt=m.material;if(Array.isArray(mt)||mt.transparent||mt.map||mt.wireframe||mt.isShaderMaterial)return;
    for(let o=m;o;o=o.parent){if(o.userData&&(o.userData.anim||o.userData.keep))return}
    const g=m.geometry.clone();g.applyMatrix4(m.matrixWorld);g.computeBoundingSphere();const vcx=!!(mt.vertexColors&&g.attributes.color),vcm=VC&&mt.isMeshLambertMaterial&&!mt.vertexColors;if(vcm){const n=g.attributes.position.count,ca=new Float32Array(n*3);for(let i=0;i<n;i++){ca[i*3]=mt.color.r;ca[i*3+1]=mt.color.g;ca[i*3+2]=mt.color.b}g.setAttribute('color',new THREE.BufferAttribute(ca,3))}
    if(g.boundingSphere.radius>40){g.dispose();return}
    const c=g.boundingSphere.center,key=(vcm?'vc':mt.uuid)+'|'+Math.floor(c.x/ZELLE)+'|'+Math.floor(c.z/ZELLE)+'|'+(m.castShadow?1:0)+(m.receiveShadow?1:0);
    (gr[key]=gr[key]||{mt:vcm?(window.__VMAT=window.__VMAT||new THREE.MeshLambertMaterial({vertexColors:true})):mt,vc:vcm||vcx,cast:m.castShadow,recv:m.receiveShadow,liste:[]}).liste.push(g);alt.push(m)});
  for(const k in gr){const q=gr[k];let nv=0,ni=0;q.liste.forEach(g=>{nv+=g.attributes.position.count;ni+=g.index?g.index.count:g.attributes.position.count});
    const P=new Float32Array(nv*3),N=new Float32Array(nv*3),CC=q.vc?new Float32Array(nv*3):null,I=new Uint32Array(ni);let vo=0,io=0;
    q.liste.forEach(g=>{const c=g.attributes.position.count;P.set(g.attributes.position.array,vo*3);N.set(g.attributes.normal.array,vo*3);if(CC)CC.set(g.attributes.color.array,vo*3);
      if(g.index){const ix=g.index.array;for(let j=0;j<ix.length;j++)I[io+j]=ix[j]+vo;io+=ix.length}else{for(let j=0;j<c;j++)I[io+j]=vo+j;io+=c}vo+=c;g.dispose()});
    const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(P,3));G.setAttribute('normal',new THREE.BufferAttribute(N,3));if(CC)G.setAttribute('color',new THREE.BufferAttribute(CC,3));G.setIndex(new THREE.BufferAttribute(I,1));
    const mm=new THREE.Mesh(G,q.mt);mm.castShadow=q.cast;mm.receiveShadow=q.recv;scene.add(mm)}
  alt.forEach(m=>{if(m.parent)m.parent.remove(m)})}

/* ---------- Welt bauen (Datei welt-<kennwort>.js) ---------- */
/* Pruefhilfe (nur mit ?pruefung in der Adresse): listet Objekte, durch die man hindurchlaufen kann */
function kollisionsPruefung(){scene.updateMatrixWorld(true);const out=[];
  scene.children.forEach((o,idx)=>{if(o.isLight||o.isSprite||o.isPoints||o===himmel||o.userData.anim||o.userData.keep)return;let torus=false,meshes=0,anim=false;o.traverse(m=>{if(m.geometry&&m.geometry.type==='TorusGeometry')torus=true;if(m.isMesh)meshes++;if(m.userData&&(m.userData.anim||m.userData.keep))anim=true});if(torus||anim||!meshes)return;
    const b=new THREE.Box3().setFromObject(o),sx=b.max.x-b.min.x,sy=b.max.y-b.min.y,sz=b.max.z-b.min.z;if(sy<.8||sx>45||sz>45||sx<.3&&sz<.3&&sy<2.5)return;
    if(Math.max(sx,sz)<1)return;let blockiert=0;for(let i=0;i<3;i++)for(let j=0;j<3;j++){const x=b.min.x+sx*(.2+.3*i),z=b.min.z+sz*(.2+.3*j),p=hindernisse(x,z);if(Math.hypot(p[0]-x,p[1]-z)>.05||colliders.some(c=>Math.hypot(c.x-x,c.z-z)<c.r+.6))blockiert++}
    if(blockiert>0)return;let frei=9,tot=9;
    if(frei>=Math.ceil(tot/2))out.push({idx,x:+((b.min.x+b.max.x)/2).toFixed(1),z:+((b.min.z+b.max.z)/2).toFixed(1),b:+sx.toFixed(1),t:+sz.toFixed(1),h:+sy.toFixed(1),frei:frei+'/'+tot,meshes})});
  return out}

weltBauen();if(/pruefung/.test(location.search))window.__fehlend=kollisionsPruefung();
BPTS.forEach(p=>{if(Math.abs(p[0])<3)p[0]=wegX(p[1])});
verschmelzen();

/* ---------- Stationen (Rätsel) und Wissenskarten ---------- */
function marke(txt,bg){const c=document.createElement('canvas');c.width=c.height=128;const t=c.getContext('2d');t.fillStyle=bg;t.beginPath();t.arc(64,64,58,0,6.3);t.fill();t.strokeStyle='#fff';t.lineWidth=8;t.stroke();t.fillStyle='#fff';t.font='bold '+(String(txt).length>2?46:String(txt).length>1?64:80)+'px Andika,Arial,sans-serif';t.textAlign='center';t.textBaseline='middle';t.fillText(txt,64,70);const tx=new THREE.CanvasTexture(c);return tx}
const balkenMat=(c)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.22,depthWrite:false,blending:THREE.AdditiveBlending});
const stationen=[],karten=[];
/* Wissenskarte als ein einziges Teil (Vertexfarben): 1 statt 5 Zeichenaufrufe je Karte, wichtig bei bis zu 24 Karten */
const KARTENGEO=(function(){const T=[[1.2,1.6,.12,0xe8b930,0],[.95,1.3,.14,0xfff6d0,0],[.6,.08,.16,0xc99a20,.35],[.6,.08,.16,0xc99a20,.1],[.6,.08,.16,0xc99a20,-.15]],gs=[];let nv=0,ni=0;
  T.forEach(q=>{const g=gBox.clone();g.applyMatrix4(new THREE.Matrix4().makeScale(q[0],q[1],q[2]));g.translate(0,q[4],0);const n=g.attributes.position.count,c=new THREE.Color(q[3]),ca=new Float32Array(n*3);for(let i=0;i<n;i++){ca[i*3]=c.r;ca[i*3+1]=c.g;ca[i*3+2]=c.b}g.setAttribute('color',new THREE.BufferAttribute(ca,3));gs.push(g);nv+=n;ni+=g.index.count});
  const P=new Float32Array(nv*3),N=new Float32Array(nv*3),C=new Float32Array(nv*3),I=new Uint16Array(ni);let vo=0,io=0;gs.forEach(g=>{P.set(g.attributes.position.array,vo*3);N.set(g.attributes.normal.array,vo*3);C.set(g.attributes.color.array,vo*3);const ix=g.index.array;for(let j=0;j<ix.length;j++)I[io+j]=ix[j]+vo;io+=ix.length;vo+=g.attributes.position.count});
  const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(P,3));G.setAttribute('normal',new THREE.BufferAttribute(N,3));G.setAttribute('color',new THREE.BufferAttribute(C,3));G.setIndex(new THREE.BufferAttribute(I,1));return G})(),KARTENMAT=new THREE.MeshLambertMaterial({vertexColors:true});
/* Platzwahl (ab 24.11.2026): Die begehbare Flaeche wird in N gleich grosse Gebiete geteilt (k-means ueber alle freien Stellen). In jedem Gebiet liegen ein Raetsel-Schild und seine Wissenskarte, nicht direkt nebeneinander, aber in der Naehe. Die Nummern laufen als Rundweg vom Eingang aus. Rein rechnerisch (ohne Zufall): gleiche Welt und gleiche Anzahl ergeben immer dieselben Plaetze. Nur Stellen, die vom Start aus ueber freie Flaeche zu erreichen sind (Zusammenhang der freien Rasterpunkte). SPOTS[2*i] = Raetsel i, SPOTS[2*i+1] = Karte i. */
const SPOTS=(function(){const X0=GRENZE.x0+14,Z0=TORZ+12,ST=5,nx=Math.floor((GRENZE.x1-14-X0)/ST)+1,nz=Math.floor((GRENZE.z1-16-Z0)/ST)+1,grid=new Array(nx*nz).fill(null),cand=[];
  for(let i=0;i<nx;i++)for(let j=0;j<nz;j++){const x=X0+i*ST,z=Z0+j*ST;let ok=Math.hypot(x-START.x,z-START.z)>=18;for(const c of colliders){if(!ok)break;if(Math.hypot(x-c.x,z-c.z)<c.r+2.4)ok=false}if(ok&&(sperrKaesten.some(k=>Math.hypot(x-k.x,z-k.z)<Math.hypot(k.hb,k.ht)+3)||sperrLinien.some(q=>{const vx=q.x2-q.x1,vz=q.z2-q.z1,l2=vx*vx+vz*vz||1;let t=((x-q.x1)*vx+(z-q.z1)*vz)/l2;t=t<0?0:t>1?1:t;return Math.hypot(x-q.x1-vx*t,z-q.z1-vz*t)<3})))ok=false;if(ok&&typeof EXTRAZONEN!=='undefined'&&EXTRAZONEN.some(e=>Math.hypot(x-e.x,z-e.z)<(e.r||0)+1.5))ok=false;if(ok){const c={x,z,i,j,k:-1};grid[i*nz+j]=c;cand.push(c)}}
  /* Zusammenhangskomponenten der freien Rasterpunkte; nur die groesste zaehlt (Stellen in abgeschlossenen Ecken faellen weg) */
  let nk=0;const gr=[];cand.forEach(c=>{if(c.k>=0)return;c.k=nk;let n=0;const st=[c];while(st.length){const a=st.pop();n++;for(let di=-2;di<=2;di++)for(let dj=-2;dj<=2;dj++){const b=a.i+di>=0&&a.i+di<nx&&a.j+dj>=0&&a.j+dj<nz?grid[(a.i+di)*nz+a.j+dj]:null;if(b&&b.k<0){b.k=nk;st.push(b)}}}gr.push(n);nk++});
  let bk=0;gr.forEach((n,k)=>{if(n>gr[bk])bk=k});let pool=cand.filter(c=>c.k===bk);if(pool.length<2*N||pool.length<cand.length*.8)pool=cand;
  const inP=new Set(pool),H=(a,b,c,d)=>Math.hypot(a-c,b-d),n=Math.max(1,Math.min(N,pool.length>>1));
  /* Gebiete: Startpunkte weit auseinander, danach k-means (Lloyd) */
  const cs=[];{const dm=pool.map(c=>H(c.x,c.z,START.x,START.z));for(let k=0;k<n;k++){let b=0;for(let j=1;j<pool.length;j++)if(dm[j]>dm[b])b=j;cs.push([pool[b].x,pool[b].z]);for(let j=0;j<pool.length;j++){const d=H(pool[j].x,pool[j].z,pool[b].x,pool[b].z);if(d<dm[j])dm[j]=d}}}
  for(let it=0;it<14;it++){const sm=cs.map(()=>[0,0,0]);pool.forEach(p=>{let b=0,bd=1e9;for(let k=0;k<n;k++){const d=H(p.x,p.z,cs[k][0],cs[k][1]);if(d<bd){bd=d;b=k}}sm[b][0]+=p.x;sm[b][1]+=p.z;sm[b][2]++});sm.forEach((s,k)=>{if(s[2]){cs[k][0]=s[0]/s[2];cs[k][1]=s[1]/s[2]}})}
  /* Reihenfolge: Rundweg vom Eingang aus (naechster unbesuchter Mittelpunkt) */
  const ord=[];{const rest=cs.map((c,k)=>k);let px=START.x,pz=START.z;while(rest.length){let bi=0,bd=1e9;rest.forEach((k,ri)=>{const d=H(cs[k][0],cs[k][1],px,pz);if(d<bd){bd=d;bi=ri}});const k=rest.splice(bi,1)[0];ord.push(k);px=cs[k][0];pz=cs[k][1]}}
  const dp=Math.max(24,Math.min(56,Math.sqrt(pool.length*ST*ST/n)*.85));
  const near=(x,z,md)=>{const ci=Math.round((x-X0)/ST),cj=Math.round((z-Z0)/ST);let b=null,bd=md;for(let di=-2;di<=2;di++)for(let dj=-2;dj<=2;dj++){const i=ci+di,j=cj+dj;if(i<0||j<0||i>=nx||j>=nz)continue;const c=grid[i*nz+j];if(!c||!inP.has(c))continue;const d=H(x,z,c.x,c.z);if(d<bd){bd=d;b=c}}return b};
  const placed=[[START.x,START.z]],out=[];
  ord.forEach((k,t)=>{const c=cs[k];let best=null,bs=-1e9;
    for(let a=0;a<16;a++){const ang=a*Math.PI/8+t*.9,dx=Math.cos(ang)*dp/2,dz=Math.sin(ang)*dp/2,p=near(c[0]-dx,c[1]-dz,7),q=near(c[0]+dx,c[1]+dz,7);if(!p||!q||p===q)continue;const dpq=H(p.x,p.z,q.x,q.z);if(dpq<dp*.75)continue;
      let m=1e9;for(const o of placed)m=Math.min(m,H(p.x,p.z,o[0],o[1]),H(q.x,q.z,o[0],o[1]));for(let u=0;u<n;u++)if(u!==k)m=Math.min(m,H(p.x,p.z,cs[u][0],cs[u][1])-dp/2,H(q.x,q.z,cs[u][0],cs[u][1])-dp/2);
      const s=m-Math.abs(dpq-dp)*.5;if(s>bs){bs=s;best=[p,q]}}
    if(!best){let p=near(c[0],c[1],40)||pool[0],q=null,qs=-1e9;pool.forEach(r=>{const d=H(r.x,r.z,p.x,p.z);if(d<dp*.5||d>dp*1.6)return;let m=1e9;for(const o of placed)m=Math.min(m,H(r.x,r.z,o[0],o[1]));if(m>qs){qs=m;q=r}});if(!q)q=pool.find(r=>r!==p)||p;best=[p,q]}
    placed.push([best[0].x,best[0].z],[best[1].x,best[1].z]);out.push(t%2?[[best[1].x,best[1].z],[best[0].x,best[0].z]]:[[best[0].x,best[0].z],[best[1].x,best[1].z]])});
  const pick=[];out.forEach(pq=>{pick.push(pq[0],pq[1])});pick.info={cand:cand.length,pool:pool.length,komp:gr.slice().sort((a,b)=>b-a).slice(0,6)};return pick})();
CONFIG.auftraege.forEach((a,i)=>{
  const x=SPOTS[2*i%SPOTS.length][0],z=SPOTS[2*i%SPOTS.length][1];
  const g=grp(x,0,z);cyl(.18,2.2,0x7a5230,0,1.1,0,g,true);const ring=new THREE.Mesh(new THREE.RingGeometry(1.5,2.1,32),new THREE.MeshBasicMaterial({color:0xf59e3f,side:THREE.DoubleSide,transparent:true,opacity:.85}));ring.rotation.x=-Math.PI/2;ring.position.y=.08;g.add(ring);
  const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:marke('?','#f59e3f'),depthTest:false}));spr.scale.set(2.2,2.2,1);spr.position.y=3.6;spr.renderOrder=5;g.add(spr);
  const nr=schildText(String(i+1),'#fff8e6',1.3,1.3);nr.position.set(0,2.3,.25);g.add(nr);kreis(x,z,.5);
  stationen.push({i,x,z,g,ring,spr});
  /* Wissenskarte in der Nähe */
  const kM=Math.max(1,SPOTS.length>>1),kS=SPOTS[(2*((i+1)%kM)+1)%SPOTS.length];const kx=kS[0],kz=kS[1];/* Karte i liegt im Gebiet des naechsten Raetsels (i+1, die letzte im Gebiet von Raetsel 1): man muss ein Stueck suchen */const kg=grp(kx,0,kz);const kar=grp(0,1.9,0,kg);const km=new THREE.Mesh(KARTENGEO,KARTENMAT);km.castShadow=true;kar.add(km);
  const ks2=new THREE.Sprite(new THREE.SpriteMaterial({map:marke(String(i+1),'#e8b930')}));ks2.scale.set(1.3,1.3,1);ks2.position.y=3.5;kg.add(ks2);
  const ks=new THREE.Mesh(new THREE.RingGeometry(.9,1.3,24),new THREE.MeshBasicMaterial({color:0xffd45e,side:THREE.DoubleSide,transparent:true,opacity:.8}));ks.rotation.x=-Math.PI/2;ks.position.y=.08;kg.add(ks);
  karten.push({i,x:kx,z:kz,g:kg,kar,da:true});
});
function stationFertig(st){st.ring.material.color.set(0x4caf6a);st.spr.material.map=marke('✓','#4caf6a');st.spr.material.needsUpdate=true}
function kartePicken(k){k.da=false;k.g.visible=false}

/* ---------- Spielfigur ---------- */
const spieler=grp(START.x,0,START.z);
const teile={};
function figurBauen(av){while(spieler.children.length)spieler.remove(spieler.children[0]);const m=kindModell(av,spieler);if(typeof SPIELERMODELL==='function')SPIELERMODELL(m);teile.beinL=m.bl;teile.beinR=m.br;teile.armL=m.al;teile.armR=m.ar}
figurBauen(AVATARE[0]);

/* ---------- Eingaben ---------- */
let yaw=0,pitch=typeof PITCHSTART==='number'?PITCHSTART:.52,dist=11,joy={x:0,y:0},tasten={},ziel=null,blickWinkel=Math.PI;
addEventListener('keydown',e=>{tasten[e.key.toLowerCase()]=true});addEventListener('keyup',e=>{tasten[e.key.toLowerCase()]=false});
const zeiger={};let halteT=0;
cv3.addEventListener('pointerdown',e=>{cv3.setPointerCapture(e.pointerId);zeiger[e.pointerId]={x:e.clientX,y:e.clientY,t:performance.now(),bew:0}});
cv3.addEventListener('pointermove',e=>{const p=zeiger[e.pointerId];if(!p)return;const ids=Object.keys(zeiger);
  if(ids.length===2){const q=zeiger[ids.find(k=>+k!==e.pointerId)];const d0=Math.hypot(p.x-q.x,p.y-q.y);p.x=e.clientX;p.y=e.clientY;const d1=Math.hypot(p.x-q.x,p.y-q.y);dist=Math.max(5,Math.min(typeof ZOOMMAX==='number'?ZOOMMAX:55,dist*d0/Math.max(d1,1)));p.bew+=99;return}
  const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;p.bew+=Math.abs(dx)+Math.abs(dy);if(p.bew>10){yaw-=dx*.006;pitch=Math.max(.2,Math.min(1.15,pitch+dy*.004))}});
const zeigerAus=e=>{const p=zeiger[e.pointerId];delete zeiger[e.pointerId];if(p&&p.bew<10&&performance.now()-p.t<400&&!modal&&gestartet&&!steinTipp(e.clientX,e.clientY))tippGehen(e.clientX,e.clientY)};
cv3.addEventListener('pointerup',zeigerAus);cv3.addEventListener('pointercancel',e=>{delete zeiger[e.pointerId]});
cv3.addEventListener('wheel',e=>{dist=Math.max(5,Math.min(typeof ZOOMMAX==='number'?ZOOMMAX:55,dist+e.deltaY*.03));e.preventDefault()},{passive:false});
const ray=new THREE.Raycaster(),ebene=new THREE.Plane(new THREE.Vector3(0,1,0),0),pt=new THREE.Vector3();
const zielMarke=new THREE.Mesh(new THREE.RingGeometry(.4,.65,20),new THREE.MeshBasicMaterial({color:0xf59e3f,side:THREE.DoubleSide,transparent:true,opacity:.9}));zielMarke.rotation.x=-Math.PI/2;zielMarke.visible=false;scene.add(zielMarke);
function tippGehen(cx,cy,stumm){ray.setFromCamera({x:cx/innerWidth*2-1,y:-(cy/innerHeight)*2+1},camera);if(ray.ray.intersectPlane(ebene,pt)){ziel={x:Math.max(GRENZE.x0,Math.min(GRENZE.x1,pt.x)),z:Math.max(GRENZE.z0,Math.min(GRENZE.z1,pt.z))};zielMarke.position.set(ziel.x,.1,ziel.z);zielMarke.visible=true;if(!stumm)sKlick()}}

/* ---------- Bewegung ---------- */
const SPEED=11;let laufT=0;let haengt=0;
function hindernisse(x,z){const R=.55;
  for(const c of colliders){const ex=x-c.x,ez=z-c.z,d=Math.hypot(ex,ez),m=c.r+R;if(d<m&&d>.001){x=c.x+ex/d*m;z=c.z+ez/d*m}}
  for(const q of sperrLinien){const vx=q.x2-q.x1,vz=q.z2-q.z1,l2=vx*vx+vz*vz||1;let t=((x-q.x1)*vx+(z-q.z1)*vz)/l2;t=t<0?0:t>1?1:t;const px=q.x1+vx*t,pz=q.z1+vz*t,ex=x-px,ez=z-pz,d=Math.hypot(ex,ez),m=q.r+R;
    if(d<m){if(d>.001){x=px+ex/d*m;z=pz+ez/d*m}else{const l=Math.sqrt(l2);x=px-vz/l*m;z=pz+vx/l*m}}}
  for(const k of sperrKaesten){const wx=x-k.x,wz=z-k.z,lx=wx*k.c-wz*k.s,lz=wx*k.s+wz*k.c,hb=k.hb+R,ht=k.ht+R;
    if(Math.abs(lx)<hb&&Math.abs(lz)<ht){let ax=lx,az=lz;if(hb-Math.abs(lx)<ht-Math.abs(lz))ax=(lx<0?-hb:hb);else az=(lz<0?-ht:ht);x=k.x+ax*k.c+az*k.s;z=k.z-ax*k.s+az*k.c}}
  return[x,z]}
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
    const gx=nx,gz=nz;nx=ox;nz=oz;const sl=Math.hypot(gx-ox,gz-oz),sn=Math.max(1,Math.ceil(sl/.25));
    for(let k=1;k<=sn;k++){nx=ox+(gx-ox)*k/sn;nz=oz+(gz-oz)*k/sn;const p=hindernisse(nx,nz);nx=p[0];nz=p[1]}
    const bew=Math.hypot(nx-ox,nz-oz);if(ziel&&bew<SPEED*dt*.25){haengt+=dt;if(haengt>.5){ziel=null;zielMarke.visible=false;haengt=0}}else haengt=0;
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

/* ---------- Sammelstücke: 5 bunte Edelsteine (nur wenn die Welt SAMMELPOOL = [{x,z,ort,y?}, ...] nennt) ----------
   Bei jedem neuen Spiel werden 5 Verstecke aus dem Pool ausgelost (mit Abstand voneinander) und im Spielstand gespeichert. Kein Eintrag auf der Karte. */
const STEINE=[{name:'roten',farbe:0xe5243b},{name:'blauen',farbe:0x1f6fe0},{name:'grünen',farbe:0x0b9150},{name:'gelben',farbe:0xffe01f},{name:'lila',farbe:0xa23fe0}];
const SAMMELN=typeof SAMMELPOOL!=='undefined'&&SAMMELPOOL.length>=STEINE.length;
const steine=[];let steinNah=null;
const steinZahl=s=>zaehle((s&&s.sammel&&s.sammel.funde)||{});
if(SAMMELN){$('#zsw').style.display='';$('#zaehler').classList.add('sammel');
  const form=new THREE.LatheGeometry([[.001,-.66],[.56,0],[.3,.48],[.001,.48]].map(p=>new THREE.Vector2(p[0],p[1])),6),kanten=new THREE.EdgesGeometry(form,10),kMat=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.75});
  const stern=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const t=c.getContext('2d');t.fillStyle='#fff';t.beginPath();[[32,0],[37,27],[64,32],[37,37],[32,64],[27,37],[0,32],[27,27]].forEach((p,i)=>i?t.lineTo(p[0],p[1]):t.moveTo(p[0],p[1]));t.closePath();t.fill();return new THREE.CanvasTexture(c)})();
  STEINE.forEach((f,i)=>{const g=grp(0,0,0),k=new THREE.Mesh(form,new THREE.MeshPhongMaterial({color:f.farbe,emissive:new THREE.Color(f.farbe).multiplyScalar(.4),specular:0xffffff,shininess:80,flatShading:true,side:THREE.DoubleSide}));k.castShadow=true;k.add(new THREE.LineSegments(kanten,kMat));g.add(k);
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(7*3),3));
    const gl=new THREE.Points(geo,new THREE.PointsMaterial({color:0xffffff,size:.6,map:stern,transparent:true,depthWrite:false,opacity:0}));gl.frustumCulled=false;g.add(gl);g.visible=false;
    steine.push({i,g,k,gl,x:0,z:0,y:1.15,da:false})})}
function steineWaehlen(){
  /* Verstecke direkt neben Rätsel-Schildern und Wissenskarten fallen weg */
  const frei=SAMMELPOOL.filter(p=>stationen.every(s=>Math.hypot(s.x-p.x,s.z-p.z)>6.5)&&karten.every(k=>Math.hypot(k.x-p.x,k.z-p.z)>5)),basis=frei.length>=10?frei:SAMMELPOOL;
  for(let md=90;;md-=10){const out=[];for(const p of mischen(basis)){if(out.length<STEINE.length&&out.every(q=>Math.hypot(q[0]-p.x,q[1]-p.z)>=md))out.push([p.x,p.z])}if(out.length===STEINE.length)return out}}
function sammelStart(){if(!SAMMELN)return;const s=S.sammel,imPool=o=>SAMMELPOOL.find(p=>p.x===o[0]&&p.z===o[1]);
  if(!(s&&s.funde&&Array.isArray(s.orte)&&s.orte.length===STEINE.length&&s.orte.every((o,i)=>s.funde[i]||imPool(o))))S.sammel={orte:steineWaehlen(),funde:(s&&s.funde)||{}};
  steine.forEach(st=>{const o=S.sammel.orte[st.i],p=imPool(o);st.x=o[0];st.z=o[1];st.y=(p&&p.y)||1.15;st.da=!S.sammel.funde[st.i];st.g.position.set(st.x,0,st.z);st.g.visible=false})}
function steinFinden(st){if(!st.da)return;st.da=false;st.g.visible=false;steinNah=null;S.sammel.funde[st.i]=true;speichern();hud();piep([1047,1319,1568,2093],.08);konfetti(24);fliege('<div style="font-size:44px">💎</div>',$('#zsw'),'stein');
  const n=steinZahl(S);sag('Du hast den '+STEINE[st.i].name+' Edelstein gefunden! '+(n<STEINE.length?n+' von '+STEINE.length+'.':'Super, jetzt hast du alle '+STEINE.length+' Edelsteine!'),6000)}
/* Kein Aufheben durch Zäune und Wände: zwischen Figur und Stein darf keine Mauer, kein Zaun und kein Gebäude liegen */
function steinFrei(st){const px=spieler.position.x,pz=spieler.position.z,n=Math.ceil(Math.hypot(st.x-px,st.z-pz)/.2);
  for(let i=1;i<n;i++){const x=px+(st.x-px)*i/n,z=pz+(st.z-pz)*i/n;
    if(sperrKaesten.some(k=>{const wx=x-k.x,wz=z-k.z;return Math.abs(wx*k.c-wz*k.s)<k.hb&&Math.abs(wx*k.s+wz*k.c)<k.ht}))return false;
    if(sperrLinien.some(q=>{const vx=q.x2-q.x1,vz=q.z2-q.z1;let t=((x-q.x1)*vx+(z-q.z1)*vz)/(vx*vx+vz*vz||1);t=t<0?0:t>1?1:t;return Math.hypot(x-q.x1-vx*t,z-q.z1-vz*t)<q.r+.05}))return false}
  return true}
/* Ist der Stein auf dem Bildschirm zu sehen (nichts davor)? Nur beim Antippen geprüft. */
const _sr=new THREE.Raycaster();
/* Trifft der Strahl eines der Teile? Instanzierte Teile haben eine Huell-Kugel fuer den ganzen Block (zum Ausblenden), zum Treffen braucht es kurz die Kugel des einzelnen Teils. */
function strahlTreffer(m){if(!m.isInstancedMesh)return _sr.intersectObject(m,false);const g=m.geometry,welt=g.boundingSphere;if(!g.userData.lokal){g.boundingSphere=null;g.computeBoundingSphere();g.userData.lokal=g.boundingSphere}g.boundingSphere=g.userData.lokal;const r=_sr.intersectObject(m,false);g.boundingSphere=welt;return r}
function steinSichtbar(st){const o=camera.position,d=new THREE.Vector3(st.x,st.k.position.y,st.z).sub(o),l=d.length(),teile=[];
  scene.traverseVisible(m=>{if(!m.isMesh||m.material.transparent)return;for(let p=m;p;p=p.parent)if(p===spieler||p===himmel||p===st.g)return;teile.push(m)});
  _sr.set(o,d.normalize());_sr.far=l-.7;return !teile.some(m=>strahlTreffer(m).length)}
/* Antippen eines sichtbaren Steins: nah genug = aufheben, sonst bis kurz davor laufen */
const _sp=new THREE.Vector3();
function steinTipp(cx,cy){for(const st of steine){if(!st.da||!st.g.visible)continue;const d=Math.hypot(st.x-spieler.position.x,st.z-spieler.position.z);if(d>18)continue;_sp.set(st.x,st.y,st.z).project(camera);if(_sp.z>1||Math.hypot((_sp.x+1)/2*innerWidth-cx,(1-_sp.y)/2*innerHeight-cy)>46||!steinSichtbar(st))continue;
    if(d<5.5&&steinFrei(st))steinFinden(st);else{const f=Math.min(1,2.3/(d||1)),zx=st.x+(spieler.position.x-st.x)*f,zz=st.z+(spieler.position.z-st.z)*f;ziel={x:zx,z:zz};zielMarke.position.set(zx,.1,zz);zielMarke.visible=true;sKlick()}return true}return false}
/* Drehen, Schweben, Glitzern (nur in der Nähe); merkt sich den Stein in Griffweite */
function steineUpdate(t){steinNah=null;let nah=3.5;steine.forEach(st=>{if(!st.da)return;const d=Math.hypot(st.x-spieler.position.x,st.z-spieler.position.z),sicht=d<60;st.g.visible=sicht;if(!sicht)return;
    st.k.rotation.y=t*1.1+st.i;st.k.position.y=st.y+Math.sin(t*2.2+st.i)*.1;if(d<nah&&steinFrei(st)){nah=d;steinNah=st}
    const o=Math.max(0,Math.min(1,(18-d)/7));st.gl.visible=o>0;if(!o)return;st.gl.material.opacity=o;const a=st.gl.geometry.attributes.position;
    for(let j=0;j<7;j++){const ph=t*.9+j*.37+st.i,an=j*2.4+Math.floor(ph)*1.7,h=(Math.floor(ph)*7+j*3)%5/5;if(ph%1<.55)a.setXYZ(j,Math.cos(an)*(.55+h*.5),st.y-.4+((j*5)%7)/6+h*.3,Math.sin(an)*(.55+h*.5));else a.setXYZ(j,0,-50,0)}a.needsUpdate=true})}

/* ---------- Tierparade ---------- */
const parade=[];let finale=null;
function paradeUpdate(t,dt){parade.forEach(p=>{p.o.position.x+=dt*3;if(p.o.position.x>12)p.o.position.x-=parade.length*3.8;if(p.o.userData.anim)p.o.userData.anim(t+p.i);p.o.position.y=Math.abs(Math.sin(t*6+p.i))*.3;p.o.position.z=FEST.z+2+Math.sin(p.o.position.x*.15+p.i)*2})}

/* ---------- Tiere bewegen sich leicht ---------- */
const _lw=new THREE.Vector3();function lebenUpdate(t){const px=spieler.position.x,pz=spieler.position.z;lebendig.forEach(l=>{const o=l.o;if(o.isObject3D){if(o.parent&&o.parent!==scene)o.getWorldPosition(_lw);else _lw.copy(o.position);const s=Math.hypot(_lw.x-px,_lw.z-pz)<(dist>35&&typeof FERNLEBEN==='number'?FERNLEBEN:85);if(o.visible!==s)o.visible=s;if(!s)return}if(o.userData.anim)o.userData.anim(t+l.ph)})}

/* ---------- Oberfläche (HUD) ---------- */
let sprechT=null;
function sag(text,ms){const s=$('#spruch');s.textContent=text;s.style.opacity=1;clearTimeout(sprechT);sprechT=setTimeout(()=>s.style.opacity=0,ms||6000)}
function hud(){$('#mappe').textContent='\uD83D\uDCD6 '+zaehle(S.karten);$('#zk').textContent=zaehle(S.karten);$('#zr').textContent=zaehle(S.geloest);$('#zn').textContent=N;$('#zn2').textContent=N;$('#zs').textContent=steinZahl(S)}
/* ---------- Karte (ab 24.11.2026): kleine Karte oben rechts, grosse Karte mit nummerierten Orten, Legende und Antippen ---------- */
const ASP=(GRENZE.z1-GRENZE.z0)/(GRENZE.x1-GRENZE.x0),VIEL=N>12,PUNKTFARBE='#3b6b8c';
/* Orte (Bereiche und Zonen) in fester Reihenfolge: Zeilen von Sueden nach Norden, in jeder Zeile von links nach rechts. Nur suedlich vom Tor. */
const ORTE=(function(){const l=[],roh=[];for(const k in BEREICHE){const b=BEREICHE[k];roh.push([b.name,b.x,b.z])}EXTRAZONEN.forEach(e=>roh.push([e.name,e.x,e.z]));const anz={};roh.forEach(r=>anz[r[0]]=(anz[r[0]]||0)+1);/* Namen, die oft vorkommen (z. B. Straße), sind keine Orte */
  const add=(name,x,z)=>{if(anz[name]>=3||z<=TORZ+4||l.some(o=>o.name===name&&Math.hypot(o.x-x,o.z-z)<25))return;l.push({name,x,z})};roh.forEach(r=>add(r[0],r[1],r[2]));
  l.sort((a,b)=>(Math.round(b.z/30)-Math.round(a.z/30))||(a.x-b.x));l.forEach((o,i)=>o.n=i+1);return l})();
const mini=$('#mini'),mx=mini.getContext('2d');let miniAn=true;mini.width=VIEL?210:170;mini.height=Math.round(mini.width*ASP);if(VIEL)mini.classList.add('viel');
let gkAuf=false,gkWahl=null,gkLay=null,gkGebaut=false;const gkAus={o:false,r:false,k:false};
$('#kartenknopf').onclick=()=>{if(gkAuf){miniGross(false);return}miniAn=!miniAn;mini.style.display=miniAn?'block':'none'};
function miniGross(an){if(an===gkAuf)return;gkAuf=an;$('#gk').classList.toggle('auf',an);modal=an;if(an){gkBauen();gkWahl=null;gkLayout();gkBlase();gkPassen()}}
/* Legende: lange Ortsnamen nie mitten im Wort umbrechen, sondern die Schrift verkleinern, bis das Wort passt */
function gkPassen(){document.querySelectorAll('#gkliste .gkt').forEach(s=>{s.style.fontSize='';let f=16;while(f>10&&s.scrollWidth>s.clientWidth+1){f--;s.style.fontSize=f+'px'}})}
mini.onclick=()=>{if(modal)return;miniGross(true);sKlick()};
$('#gkx').onclick=()=>miniGross(false);
$('#gk').onclick=e=>{if(e.target===$('#gk'))miniGross(false)};
addEventListener('keydown',e=>{if(e.key==='Escape'&&gkAuf)miniGross(false)});
function gkMehr(){const l=$('#gkliste'),m=$('#gkmehr');m.style.display=l.scrollHeight-l.clientHeight>6&&l.scrollTop+l.clientHeight<l.scrollHeight-6?'block':'none'}
function gkBauen(){if(gkGebaut)return;gkGebaut=true;$('#gkliste').onscroll=gkMehr;
  const zz=$('#gkzeichen');[['o','zo','','Ort (Nummer in der Liste)'],['r','zr','1','Rätsel'],['k','zk','1','Wissenskarte']].forEach(a=>{const b=el('button','gks');b.type='button';b.setAttribute('aria-pressed','true');b.dataset.g=a[0];const i=el('i',a[1],a[2]);b.appendChild(i);b.appendChild(el('span','gkh','✓'));b.appendChild(document.createTextNode(a[3]));b.onclick=()=>{sKlick();gkSchalt(a[0],gkAus[a[0]])};zz.appendChild(b)});
  zz.insertAdjacentHTML('beforeend','<span><i class="zg">✓</i>gelöst</span><span><i class="zd"></i>Du</span><span><i class="za"></i>Ausgang</span>');
  const ls=$('#gkliste');if(!ORTE.length)$('#gkort').style.display='none';
  ORTE.forEach((o,i)=>{const b=el('button','gko');b.appendChild(el('span','gkn',String(o.n)));b.appendChild(el('span','gkt',o.name));b.onclick=()=>{sKlick();if(gkAus.o)gkSchalt('o',true,true);gkSetze(gkWahl&&gkWahl.t==='o'&&gkWahl.i===i?null:{t:'o',i},false)};ls.appendChild(b)});
  $('#gkc').onclick=e=>{const c=$('#gkc'),r=c.getBoundingClientRect(),k=gkLay.w/r.width,x=(e.clientX-r.left)*k,z=(e.clientY-r.top)*k;let best=null,bd=17;
    const probe=(t,i,px,pz)=>{const d=Math.hypot(px-x,pz-z);if(d<bd){bd=d;best={t,i}}};
    if(!gkAus.o)gkLay.o.forEach((p,i)=>probe('o',i,p.px,p.pz));if(!gkAus.r)stationen.forEach(s=>probe('r',s.i,gkLay.X(s.x),gkLay.Z(s.z)));if(!gkAus.k)karten.forEach(s=>{if(s.da)probe('k',s.i,gkLay.X(s.x),gkLay.Z(s.z))});
    sKlick();gkSetze(best,true)}}
/* Schalter der grossen Karte: an=true blendet die Gruppe (o/r/k) ein, false aus; Positionen bleiben (Layout wird nicht neu berechnet) */
function gkSchalt(g,an,still){gkAus[g]=!an;document.querySelectorAll('#gkzeichen .gks').forEach(b=>{if(b.dataset.g===g){b.setAttribute('aria-pressed',an?'true':'false');b.classList.toggle('aus',!an)}});if(!an&&gkWahl&&gkWahl.t===g)gkWahl=null;document.querySelectorAll('#gkliste .gko').forEach((b,i)=>b.classList.toggle('an',!!gkWahl&&gkWahl.t==='o'&&gkWahl.i===i));if(!still){gkBlase();gkZeichnen()}}
function gkSetze(w,ausKarte){gkWahl=w;document.querySelectorAll('#gkliste .gko').forEach((b,i)=>b.classList.toggle('an',!!w&&w.t==='o'&&w.i===i));
  if(w&&w.t==='o'){const b=document.querySelectorAll('#gkliste .gko')[w.i];if(b&&ausKarte)b.scrollIntoView({block:'nearest'})}gkBlase()}
function gkPos(w){if(!w)return null;if(w.t==='o'){const p=gkLay.o[w.i];return[p.px,p.pz,12]}if(w.t==='r'){const s=stationen[w.i];return[gkLay.X(s.x),gkLay.Z(s.z),13]}const k=karten[w.i];return[gkLay.X(k.x),gkLay.Z(k.z),13]}
function gkBlase(){const b=$('#gkblase'),w=gkWahl;if(!w||!gkLay){b.style.display='none';return}
  b.textContent=w.t==='o'?ORTE[w.i].n+' · '+ORTE[w.i].name:w.t==='r'?'Rätsel '+(w.i+1)+(S.geloest[w.i]?' (gelöst)':''):'Wissenskarte '+(w.i+1);
  b.style.display='block';const p=gkPos(w),bw=b.offsetWidth,bh=b.offsetHeight,W=gkLay.w,H=gkLay.h,g=p[2]+18,L=gkLay;
  /* Sprechblase: mehrere Lagen (oben, unten, rechts, links, versetzt) pruefen; gewaehlt wird die mit der kleinsten Ueberdeckung (Raetsel/Karten zaehlen sehr stark, Orte schwach, die eigene Markierung am staerksten) */
  const mk=[[p[0],p[1],p[2]+4,5000]];if(!gkAus.r)stationen.forEach(s=>{const x=L.X(s.x),z=L.Z(s.z);if(Math.abs(x-p[0])>.5||Math.abs(z-p[1])>.5)mk.push([x,z,14,1000])});karten.forEach(k=>{if(!k.da||gkAus.k)return;const x=L.X(k.x),z=L.Z(k.z);if(Math.abs(x-p[0])>.5||Math.abs(z-p[1])>.5)mk.push([x,z,14,1000])});if(!gkAus.o)L.o.forEach(q=>{if(Math.abs(q.px-p[0])>.5||Math.abs(q.pz-p[1])>.5)mk.push([q.px,q.pz,12,1])});
  const kl=(v,lo,hi)=>Math.max(lo,Math.min(hi,v)),cand=[];[.5,.25,.75,.1,.9].forEach(f=>{cand.push(['o',p[0]-f*bw,p[1]-g-bh]);cand.push(['u',p[0]-f*bw,p[1]+g])});[.5,.15,.85].forEach(f=>{cand.push(['r',p[0]+g,p[1]-f*bh]);cand.push(['l',p[0]-g-bw,p[1]-f*bh])});[.5,.25,.75].forEach(f=>{cand.push(['o',p[0]-f*bw,p[1]-g-22-bh,300]);cand.push(['u',p[0]-f*bw,p[1]+g+22,300]);cand.push(['r',p[0]+g+22,p[1]-f*bh,300]);cand.push(['l',p[0]-g-22-bw,p[1]-f*bh,300])});
  let best=null,bs=1e18;for(const c of cand){const x=kl(c[1],4,W-bw-4),y=kl(c[2],4,H-bh-4);let sc=c[3]||0;for(const m of mk){const d=Math.hypot(kl(m[0],x,x+bw)-m[0],kl(m[1],y,y+bh)-m[1]);if(d<m[2])sc+=m[3]*(m[2]-d)}if(sc<bs-.001){bs=sc;best={d:c[0],x,y}}}
  b.style.left=best.x+'px';b.style.top=best.y+'px';b.style.setProperty('--sp',(best.d==='o'||best.d==='u'?kl(p[0]-best.x,12,bw-12):kl(p[1]-best.y,10,bh-10))+'px');b.classList.toggle('unten',best.d==='u');b.classList.toggle('sl',best.d==='r');b.classList.toggle('sr',best.d==='l')}
function gkLayout(){if(!gkAuf)return;const c=$('#gkc'),dpr=Math.min(2,window.devicePixelRatio||1),hoch=innerHeight>innerWidth,viele=ORTE.length>14;let w;
  if(hoch)w=Math.min(innerWidth-24,(innerHeight*(viele?.54:.62))/ASP,680);else w=Math.min((innerHeight-92)/ASP,(innerWidth-48)*(viele?.58:.66),780);
  w=Math.max(220,Math.floor(w));const h=Math.round(w*ASP);c.style.width=w+'px';c.style.height=h+'px';c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);
  const PD=10,X=x=>PD+(x-GRENZE.x0)*(w-2*PD)/(GRENZE.x1-GRENZE.x0),Z=z=>PD+(z-GRENZE.z0)*(h-2*PD)/(GRENZE.z1-GRENZE.z0);
  /* Ort-Markierungen so verschieben, dass sie weder einander noch Raetseln, Karten und dem Ausgang ueberdecken */
  const fix=[];stationen.forEach(s=>fix.push([X(s.x),Z(s.z),13]));karten.forEach(k=>fix.push([X(k.x),Z(k.z),13]));fix.push([X(0),Z(TORZ),15],[X(START.x),Z(START.z),9]);
  const o=ORTE.map(p=>({px:X(p.x),pz:Z(p.z),x:X(p.x),z:Z(p.z)})),R=11;
  for(let it=0;it<80;it++){let b=0;for(let a=0;a<o.length;a++){const p=o[a];
    for(const f of fix){const dx=p.px-f[0],dz=p.pz-f[1],d=Math.hypot(dx,dz),m=R+f[2]+2;if(d<m){const u=d<.01?1:dx/d,v=d<.01?0:dz/d;p.px+=u*(m-d);p.pz+=v*(m-d);b=1}}
    for(let q=a+1;q<o.length;q++){const r=o[q],dx=p.px-r.px,dz=p.pz-r.pz,d=Math.hypot(dx,dz),m=2*R+2;if(d<m){const u=d<.01?1:dx/d,v=d<.01?.3:dz/d,s=(m-d)/2;p.px+=u*s;p.pz+=v*s;r.px-=u*s;r.pz-=v*s;b=1}}
    p.px=Math.max(R+2,Math.min(w-R-2,p.px));p.pz=Math.max(R+2,Math.min(h-R-2,p.pz))}if(!b)break}
  gkLay={w,h,dpr,X,Z,o};gkBlase();gkMehr();setTimeout(gkMehr,60)}
function gkZeichnen(){if(!gkAuf||!gkLay)return;const c=$('#gkc'),cx=c.getContext('2d'),L=gkLay;cx.setTransform(L.dpr,0,0,L.dpr,0,0);kartenBild(cx,L.w,L.h,1,true)}
function miniZeichnen(){kartenBild(mx,mini.width,mini.height,mini.width/170,false);if(gkAuf)gkZeichnen()}
/* gemeinsames Zeichnen: q = Pixel je Grundeinheit (klein: Breite/170, gross: 1), gross = grosse Karte */
function kartenBild(cx,W,H,q,gross){const PD=10*q,X=x=>PD+(x-GRENZE.x0)*(W-2*PD)/(GRENZE.x1-GRENZE.x0),Z=z=>PD+(z-GRENZE.z0)*(H-2*PD)/(GRENZE.z1-GRENZE.z0);
  const rR=gross?12.5:(VIEL?5.2:7)*q,kb=gross?11:(VIEL?4.4:5)*q,kh=gross?12:(VIEL?5.2:6)*q,fs=gross?13:(VIEL?7.4:9)*q;
  cx.clearRect(0,0,W,H);cx.fillStyle='#eaf4fa';cx.fillRect(0,0,W,H);if(typeof KARTENFLUSS!=='undefined'){const f=KARTENFLUSS;cx.save();cx.strokeStyle='#8fcbe6';cx.lineCap='round';cx.lineJoin='round';cx.lineWidth=Math.max(3,f.w*(X(1)-X(0)));cx.beginPath();f.pts.forEach((p,i)=>i?cx.lineTo(X(p[0]),Z(p[1])):cx.moveTo(X(p[0]),Z(p[1])));cx.stroke();cx.restore()}cx.strokeStyle='#e0cfa6';cx.lineWidth=(gross?7:4)*q;cx.lineJoin='round';cx.beginPath();cx.moveTo(X(0),Z(GRENZE.z1));for(let zz=GRENZE.z1;zz>TORZ;zz-=8)cx.lineTo(X(wegX(zz)),Z(zz));cx.lineTo(X(0),Z(TORZ));cx.lineTo(X(0),Z(GRENZE.z0));if(typeof WEGBOGEN!=='number')SEITENWEGE.forEach(w=>{cx.moveTo(X(GRENZE.x0+25),Z(w));cx.lineTo(X(GRENZE.x1-25),Z(w))});else WEGE.forEach(e=>{cx.moveTo(X(e[0][0]),Z(e[0][1]));e.forEach(p=>cx.lineTo(X(p[0]),Z(p[1])))});cx.stroke();
  cx.textAlign='center';cx.textBaseline='alphabetic';
  /* Orte: klein = Punkte ohne Text (nur wo kein anderes Zeichen liegt), gross = nummerierte Kreise */
  if(!gross){cx.fillStyle=PUNKTFARBE;ORTE.forEach(o=>{const x=X(o.x),y=Z(o.z);if(stationen.some(s=>Math.hypot(X(s.x)-x,Z(s.z)-y)<rR+3.5*q)||karten.some(k=>Math.hypot(X(k.x)-x,Z(k.z)-y)<kh+3.5*q)||Math.hypot(X(0)-x,Z(TORZ)-y)<9*q)return;cx.beginPath();cx.arc(x,y,2.5*q,0,6.3);cx.fill()})}
  else if(!gkAus.o){ORTE.forEach((o,i)=>{const p=gkLay.o[i],x0=X(o.x),y0=Z(o.z);if(Math.hypot(p.px-x0,p.pz-y0)>5){cx.strokeStyle=PUNKTFARBE;cx.lineWidth=1.5;cx.beginPath();cx.moveTo(x0,y0);cx.lineTo(p.px,p.pz);cx.stroke();cx.fillStyle=PUNKTFARBE;cx.beginPath();cx.arc(x0,y0,2.5,0,6.3);cx.fill()}})}
  cx.fillStyle='#3e9468';cx.fillRect(X(-5),Z(TORZ)-(gross?5:3*q),X(5)-X(-5),gross?10:6*q);cx.fillStyle='#e0605a';cx.font='bold '+(gross?13:6*q)+'px Andika,Arial,sans-serif';cx.fillText('Ausgang',X(0),Z(TORZ)-(gross?9:6*q));
  cx.font='bold '+fs+'px Andika,Arial,sans-serif';
  karten.forEach(k=>{if(!k.da||(gross&&gkAus.k))return;const x=X(k.x),y=Z(k.z);cx.fillStyle='#e8b930';cx.fillRect(x-kb,y-kh,2*kb,2*kh);if(gross){cx.strokeStyle='#fff';cx.lineWidth=2;cx.strokeRect(x-kb,y-kh,2*kb,2*kh)}cx.fillStyle='#4a2f0a';cx.fillText(String(k.i+1),x,y+fs*.36)});
  stationen.forEach(s=>{if(gross&&gkAus.r)return;const x=X(s.x),y=Z(s.z);cx.fillStyle=S.geloest[s.i]?'#2f7d4b':'#b85c00';cx.beginPath();cx.arc(x,y,rR,0,6.3);cx.fill();if(gross){cx.strokeStyle='#fff';cx.lineWidth=2;cx.stroke()}cx.fillStyle='#fff';cx.fillText(S.geloest[s.i]?'✓':String(s.i+1),x,y+fs*.36)});
  if(gross){cx.font='bold 12px Andika,Arial,sans-serif';if(!gkAus.o)ORTE.forEach((o,i)=>{const p=gkLay.o[i],w=gkWahl&&gkWahl.t==='o'&&gkWahl.i===i;cx.fillStyle=w?'#173a55':PUNKTFARBE;cx.beginPath();cx.arc(p.px,p.pz,w?13:11,0,6.3);cx.fill();cx.strokeStyle='#fff';cx.lineWidth=2;cx.stroke();cx.fillStyle='#fff';cx.fillText(String(o.n),p.px,p.pz+4.4)});
    if(gkWahl){const p=gkPos(gkWahl);cx.strokeStyle='#1f3a4d';cx.lineWidth=3;cx.beginPath();cx.arc(p[0],p[1],p[2]+5,0,6.3);cx.stroke();cx.strokeStyle='#fff';cx.lineWidth=1.2;cx.beginPath();cx.arc(p[0],p[1],p[2]+7,0,6.3);cx.stroke()}}
  cx.save();cx.translate(X(spieler.position.x),Z(spieler.position.z));cx.rotate(-blickWinkel+Math.PI);const ps=gross?1.15:q;cx.scale(ps,ps);cx.fillStyle='#e0302a';cx.beginPath();cx.moveTo(0,-8);cx.lineTo(6,6);cx.lineTo(-6,6);cx.closePath();cx.fill();if(gross){cx.strokeStyle='#fff';cx.lineWidth=1.6;cx.stroke()}cx.restore()}

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
function fliege(html,zielEl,art){const z=zielEl.getBoundingClientRect(),d=document.createElement('div');d.className='flugkarte'+(art?' '+art:'');d.innerHTML=html;document.body.appendChild(d);const b=d.getBoundingClientRect(),vx=innerWidth/2,vy=innerHeight/2;d.style.left=(vx-b.width/2)+'px';d.style.top=(vy-b.height/2)+'px';d.getBoundingClientRect();
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
let mappeScroll=0;
function mappeZeigen(){const k=karteOeffnen();k.className='karte papyrus mappe';
  const kp=el('div','mkopf');kp.appendChild(el('h2',null,'\uD83C\uDCCF Deine Wissensmappe'));const x=el('button','x','\u00D7');x.onclick=karteSchliessen;kp.appendChild(x);k.appendChild(kp);
  const f=CONFIG.auftraege.map((a,i)=>i).filter(i=>S.karten[i]);
  k.appendChild(el('div',f.length?'keinraetsel':'tafeltext',f.length?'\uD83D\uDC49 Tippe eine Karte an, dann wird sie groß.':'Du hast noch keine Karten. Suche die goldenen Wissenskarten '+(typeof WELTORT==='string'?WELTORT:'im Zoo')+'. Die Zahl auf der Karte zeigt, zu welchem Rätsel sie gehört.'));
  const viel=N>8,raster=el('div','mappe-raster'+(viel?' kompakt':''));f.forEach(i=>{const t=CONFIG.auftraege[i].tafel;const sk=el('div','sk'+(viel?' klein':''));sk.style.cursor='pointer';sk.appendChild(el('h3',null,(i+1)+'. '+t.titel));if(!viel)sk.appendChild(el('p',null,t.text));sk.onclick=()=>{sKlick();mappeScroll=k.scrollTop;tafelAnsicht(k,i,mappeZeigen,false,'\u2190 Zurück zur Mappe')};raster.appendChild(sk)});k.appendChild(raster);
  const l=el('div','leiste');l.appendChild(el('div','platz'));const z=el('button','knopf','Zurück zum Spiel');z.onclick=karteSchliessen;l.appendChild(z);k.appendChild(l);k.scrollTop=mappeScroll}
$('#mappe').onclick=()=>{if(modal)return;mappeScroll=0;mappeZeigen()};
$('#tonknopf').onclick=()=>{tonAn=!tonAn;$('#tonknopf').textContent=tonAn?'🔊':'🔇'};
$('#aktion').onclick=()=>{if(modal)return;if(aktiv)raetselOeffnen(aktiv.i);else if(steinNah)steinFinden(steinNah)};
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
  k.innerHTML='<div class="urkunde"><div class="ur-rahmen"><div class="ur-stern">★ ★ ★</div><div class="ur-titel">URKUNDE</div><div class="ur-klein">'+CONFIG.spielname+'</div><div class="ur-name"></div><div class="ur-text"></div>'+(SAMMELN?'<div class="ur-sammel">💎 Du hast '+steinZahl(S)+' von '+STEINE.length+' Edelsteinen gefunden.</div>':'')+'<div class="ur-fuss"><span>'+d+'</span><span>'+MASKOTTCHEN+'</span></div></div></div>';
  k.querySelector('.ur-name').textContent=S.name;k.querySelector('.ur-text').textContent=CONFIG.urkundeText;
  const l=el('div','leiste noprint');l.appendChild(el('div','platz'));const gz=el('button','knopf blau','Urkunde groß zeigen');gz.onclick=urkundeGross;l.appendChild(gz);const z=el('button','knopf','Weiter feiern');z.onclick=karteSchliessen;l.appendChild(z);k.appendChild(l);$('#urknopf').style.display=''}
/* Urkunde gross: nur die Urkunde auf ruhigem Hintergrund (fuer das Bildschirmfoto der Kinder). Tippen schliesst, die Urkunde ist dann wieder offen. */
function urkundeGross(){const q=document.querySelector('#karte .urkunde');if(!q)return;const o=el('div');o.id='urgross';const c=q.cloneNode(true);c.className='urkunde urgrossk';o.appendChild(c);const h=el('div','urhinweis','Mache jetzt dein Bildschirmfoto. Tippe danach irgendwo, um zurückzugehen.');o.appendChild(h);document.body.appendChild(o);
  const s=Math.min(innerWidth*.94/c.offsetWidth,innerHeight*.86/c.offsetHeight);c.style.transform='scale('+s+')';setTimeout(()=>{h.style.opacity='0'},4500);o.onclick=()=>{o.remove()}}
$('#urknopf').onclick=()=>{if(modal)return;urkunde()};
function finaleStart(){if(finale)return;finale={t:0,burstT:0,urk:false};sag('Überraschung! Alle feiern mit dir!',9000);paradeBauen();konfetti(120);sRichtig()}

/* ---------- Hauptschleife ---------- */
const clock=new THREE.Clock();let saveT=0,tges=0,fpsN=0,fpsT=0;
function schleife(){requestAnimationFrame(schleife);const dt=Math.min(.05,clock.getDelta());tges+=dt;
  if(gestartet&&!modal){bewegen(dt);const ids=Object.keys(zeiger);if(ids.length===1){const q=zeiger[ids[0]];if(q.bew<10&&performance.now()-q.t>300&&tges-halteT>.12){halteT=tges;tippGehen(q.x,q.y,true)}}}else{teile.beinL.rotation.x=teile.beinR.rotation.x=teile.armL.rotation.x=teile.armR.rotation.x=0}
  /* Kamera */
  const tx=spieler.position.x,ty=1.8,tz=spieler.position.z;himmel.position.set(tx,0,tz);const cp=Math.cos(pitch),sp=Math.sin(pitch);
  const wx=tx+Math.sin(yaw)*dist*cp,wy=ty+dist*sp,wz=tz+Math.cos(yaw)*dist*cp;let wzk=Math.min(wz,GRENZE.z1-5),wxk=wx,wyk=wy;{const imK=(x,z)=>sperrKaesten.some(k=>{const ax=x-k.x,az=z-k.z,lx=ax*k.c-az*k.s,lz=ax*k.s+az*k.c;return Math.abs(lx)<k.hb+.7&&Math.abs(lz)<k.ht+.7});if(imK(wxk,wzk)){let f=1;for(let i=0;i<8&&imK(tx+(wx-tx)*f,tz+(wzk-tz)*f);i++)f-=.12;f=Math.max(.2,f);wxk=tx+(wx-tx)*f;wzk=tz+(wzk-tz)*f;wyk=ty+(wy-ty)*Math.max(.5,f)}}camera.position.x+=(wxk-camera.position.x)*Math.min(1,dt*8);camera.position.y+=(wyk-camera.position.y)*Math.min(1,dt*8);camera.position.z+=(wzk-camera.position.z)*Math.min(1,dt*8);camera.lookAt(tx,ty+(finale?Math.min(1,finale.t/3)*6:0),tz-(finale?Math.min(1,finale.t/3)*3:0));
  dir.position.set(tx+14,tz*0+20,tz+9);dir.target.position.set(tx,0,tz);
  /* Karten, Stationen */
  karten.forEach(k=>{if(!k.da)return;k.kar.rotation.y=tges*1.6;k.kar.position.y=1.9+Math.sin(tges*2+k.i)*.25;if(gestartet&&!modal&&Math.hypot(k.x-spieler.position.x,k.z-spieler.position.z)<2.4)kartenFund(k)});
  aktiv=null;let nah=1e9;stationen.forEach(s=>{if(S.geloest[s.i]){s.spr.position.y=3.6;return}s.spr.position.y=3.6+Math.sin(tges*3+s.i)*.2;s.ring.rotation.z=tges;const d=Math.hypot(s.x-spieler.position.x,s.z-spieler.position.z);if(d<3.6&&d<nah){nah=d;aktiv=s}});
  if(gestartet)steineUpdate(tges);if(steinNah&&aktiv){if(Math.hypot(steinNah.x-spieler.position.x,steinNah.z-spieler.position.z)<nah)aktiv=null;else steinNah=null}
  const ab=$('#aktion'),abT=aktiv?'❓ Rätsel '+(aktiv.i+1)+' lösen':steinNah?'💎 Edelstein aufheben':'';ab.style.display=(abT&&!modal&&gestartet)?'block':'none';if(abT&&ab.textContent!==abT)ab.textContent=abT;
  /* Tor */
  if(ausgang.ziel!=null){ausgang.offen+=(ausgang.ziel-ausgang.offen)*Math.min(1,dt*1.5);ausgang.fl[0].rotation.y=-ausgang.offen*1.5;ausgang.fl[1].rotation.y=ausgang.offen*1.5}
  if(gestartet&&!modal&&ausgang.offen<.9&&Math.abs(spieler.position.x)<6&&Math.abs(spieler.position.z-TORZ)<4&&tges-warnT>8){warnT=tges;sag('Das Tor ist noch zu. Löse erst alle Rätsel ('+zaehle(S.geloest)+' von '+N+').',5000)}
  /* Finale */
  if(!finale&&gestartet&&Math.hypot(spieler.position.x-FEST.x,spieler.position.z-(FEST.z+4))<9&&zaehle(S.geloest)>=N)finaleStart();
  if(finale){finale.t+=dt;abend=Math.min(1,finale.t/4);setzeAbend(abend);finale.burstT-=dt;if(typeof FINALESCHAU==='function')FINALESCHAU(finale.t,dt);if(finale.burstT<=0&&!(typeof FEUERWERK!=='undefined'&&FEUERWERK===false)){finale.burstT=.55+rnd()*.5;burst(FEST.x+(rnd()-.5)*40,22+rnd()*12,FEST.z-12-rnd()*14)}
    paradeUpdate(tges,dt);if(!finale.urk&&finale.t>9){finale.urk=true;urkunde()}}
  if(gestartet&&tges-saveT>5){saveT=tges;speichern()}lebenUpdate(tges);besucherUpdate(dt);if(WINTER)schneeUpdate(dt);feuerwerkUpdate(dt);konfettiUpdate();miniZeichnen();
  fpsN++;fpsT+=dt;if(fpsT>=1){$('#fps').textContent='FPS: '+Math.round(fpsN/fpsT);fpsN=0;fpsT=0}
  renderer.render(scene,camera)}

/* ---------- Start ---------- */
function weltWiederherstellen(){karten.forEach(k=>{if(S.karten[k.i])kartePicken(k)});stationen.forEach(s=>{if(S.geloest[s.i])stationFertig(s)});if(zaehle(S.geloest)>=N){ausgang.ziel=1;ausgang.offen=1;ausgang.fl[0].rotation.y=-1.5;ausgang.fl[1].rotation.y=1.5}hud()}
function gespeicherte(){const out=[],pre='welt3d|'+CONFIG.spielname+'|';try{for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key.indexOf(pre)===0){const s=JSON.parse(localStorage.getItem(key));if(s&&s.name&&(zaehle(s.karten||{})+zaehle(s.geloest||{})+steinZahl(s))>0)out.push(s)}}}catch(e){}return out.slice(0,8)}
function losGehts(n,jacke,alt){$('#urknopf').style.display='none';S=alt||{name:n,jacke:0,karten:{},geloest:{}};S.name=n;S.jacke=jacke;try{localStorage.setItem(LETZT,JSON.stringify({name:n,jacke:jacke}))}catch(e){}figurBauen(AVATARE[jacke]);const weiter=!!alt;
  if(alt&&S.x!=null)spieler.position.set(S.x,0,S.z);else spieler.position.set(START.x,0,START.z);
  if(!alt){karten.forEach(k=>{k.da=true;k.g.visible=true});stationen.forEach(s=>{s.ring.material.color.set(0xf59e3f);s.spr.material.map=marke('?','#f59e3f');s.spr.material.needsUpdate=true});ausgang.ziel=0;ausgang.offen=0;ausgang.fl[0].rotation.y=0;ausgang.fl[1].rotation.y=0}
  sammelStart();gestartet=true;speichern();karteSchliessen();weltWiederherstellen();sKlick();
  sag(weiter?'Willkommen zurück, '+n+'! Du hast '+zaehle(S.karten)+' Karten'+(SAMMELN?', '+zaehle(S.geloest)+' Rätsel und '+steinZahl(S)+(steinZahl(S)===1?' Edelstein':' Edelsteine'):' und '+zaehle(S.geloest)+' Rätsel')+'. Es geht dort weiter, wo du aufgehört hast.':'Hallo '+n+'! Tippe auf den Boden, um zu laufen. Suche die goldenen Wissenskarten und die orangen Rätsel-Schilder.'+(SAMMELN?' Findest du auch die '+STEINE.length+' bunten Edelsteine?':'')+' Die kleine Karte oben rechts hilft dir.',SAMMELN?16000:9000)}
function start(){document.title=CONFIG.spielname;$('#titel').textContent=CONFIG.spielname;
  const k=karteOeffnen();k.innerHTML='';k.appendChild(el('h2',null,CONFIG.spielname));k.appendChild(el('div','tafeltext',CONFIG.einleitung));
  if(SAMMELN)k.appendChild(el('div','neukarte','💎 Hier sind auch '+STEINE.length+' bunte Edelsteine versteckt. Findest du sie? Suche auch abseits der Wege!'));
  k.appendChild(el('div','frage','So geht es: Tippe auf den Boden (oder halte den Finger gedrückt), dann läuft deine Figur dorthin. Ziehe mit dem Finger, um dich umzuschauen. Suche goldene Wissenskarten 📖 und Rätsel-Schilder ❓.'));
  const let0=letzter();let jacke=let0&&AVATARE[let0.jacke]?let0.jacke:0;const fz=el('div','figuren');AVATARE.forEach((av,i)=>{const b=el('button','fig'+(i===jacke?' gewaehlt':''),avSvg(av));b.setAttribute('aria-label','Figur '+(i+1));b.onclick=()=>{jacke=i;sKlick();[...fz.children].forEach((x,j)=>x.classList.toggle('gewaehlt',j===i));figurBauen(AVATARE[i])};fz.appendChild(b)});k.appendChild(el('div','frage','Wähle deine Figur:'));k.appendChild(fz);
  k.appendChild(el('div','keinraetsel','\uD83D\uDCBE Das Spiel speichert alles. Wenn du später weiterspielen willst, gib genau denselben Namen ein.'));const l=el('div','leiste');const inp=el('input','eing');inp.placeholder='Dein Name';if(let0&&let0.name)inp.value=let0.name;figurBauen(AVATARE[jacke]);inp.maxLength=20;inp.style.maxWidth='260px';l.appendChild(inp);l.appendChild(el('div','platz'));
  const b=el('button','knopf','Los geht’s!');b.onclick=()=>{const n=inp.value.trim()||'Gast';const alt=laden(n);
    if(alt&&(zaehle(alt.karten||{})+zaehle(alt.geloest||{})+steinZahl(alt))>0){const k2=karteOeffnen();k2.appendChild(el('h2',null,'Spielstand gefunden'));
      k2.appendChild(el('div','tafeltext',n+', du hast schon '+zaehle(alt.karten||{})+' Wissenskarten gefunden'+(SAMMELN?', ':' und ')+zaehle(alt.geloest||{})+' von '+N+' Rätseln gelöst'+(SAMMELN?' und '+steinZahl(alt)+' von '+STEINE.length+' Edelsteinen entdeckt':'')+'. Möchtest du dort weiterspielen oder noch einmal von vorn anfangen?'));
      const l2=el('div','leiste');const nb=el('button','knopf grau','Neu starten');nb.onclick=()=>{sKlick();losGehts(n,jacke,null)};l2.appendChild(nb);l2.appendChild(el('div','platz'));
      const wb=el('button','knopf','▶ Weiterspielen');wb.onclick=()=>losGehts(n,jacke,alt);l2.appendChild(wb);k2.appendChild(l2);
      const zb=el('button','knopf blau','← Zurück');zb.style.marginTop='10px';zb.onclick=start;k2.appendChild(zb);return}
    losGehts(n,jacke,alt)};
  const alle=gespeicherte();if(alle.length){k.appendChild(el('div','frage','Gespeicherte Spiele:'));const ls=el('div','pool');
    alle.forEach(s=>{const bt=el('button','chip','▶ '+s.name+' ('+zaehle(s.karten||{})+' Karten, '+zaehle(s.geloest||{})+' von '+N+' Rätseln'+(SAMMELN?', '+steinZahl(s)+' von '+STEINE.length+' Edelsteinen':'')+')');bt.onclick=()=>losGehts(s.name,AVATARE[s.jacke]?s.jacke:0,s);ls.appendChild(bt)});k.appendChild(ls)}
  l.appendChild(b);k.appendChild(l);$('#maske').onclick=null}
addEventListener('resize',()=>{gkLayout();if(gkAuf)gkPassen();renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();kgroesse()});
kgroesse();hud();camera.position.set(START.x,9,START.z+14);start();schleife();
