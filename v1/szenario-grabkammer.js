document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-ankh\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\"><ellipse cx=\"0\" cy=\"-9\" rx=\"6.5\" ry=\"8.5\"/><path d=\"M0 -.5V18M-11 2H11\"/></g></symbol>\n<symbol id=\"sym-auge\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M-16 -2Q0 -13 16 -2Q0 8 -16 -2Z\"/><path d=\"M-15 -9Q0 -17 15 -9M-3 5L-6 16M3 5Q9 15 16 9\"/></g><circle cx=\"0\" cy=\"-3\" r=\"3.6\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-skarabaeus\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><ellipse cx=\"0\" cy=\"4\" rx=\"9\" ry=\"12\"/><path d=\"M0 -8V16\"/><circle cx=\"0\" cy=\"-12\" r=\"4\"/><path d=\"M-9 -2L-17 -8M9 -2L17 -8M-9 6H-17M9 6H17M-8 13L-15 18M8 13L15 18\"/></g></symbol>\n<symbol id=\"sym-feder\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M-3 18C-8 4 -3 -10 6 -18C13 -6 10 6 -1 13\"/><path d=\"M-3 18L-4 21M6 -18L-2 14\"/></g></symbol>\n<symbol id=\"sym-sonne\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><circle r=\"7.5\"/><path d=\"M0 -17V-12M0 12V17M-17 0H-12M12 0H17M-12 -12L-9 -9M9 9L12 12M-12 12L-9 9M9 -9L12 -12\"/></g></symbol>\n<symbol id=\"sym-vogel\" viewBox=\"-20 -20 40 40\"><path d=\"M-14 12L-5 3Q-7 -8 2 -11Q9 -12 10 -6L16 -5L10 -2Q9 7 0 11Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-wasser\" viewBox=\"-20 -20 40 40\"><path d=\"M-17 0L-12 -6L-6 0L0 -6L6 0L12 -6L17 0M-17 9L-12 3L-6 9L0 3L6 9L12 3L17 9\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const S=(c,w)=>` stroke="${c}" stroke-width="${w}"`;
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.32)"/>`;
const defs=(b1,b2)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1||'#7a5630'}"/><stop offset="1" stop-color="${b2||'#3f2a15'}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="#ffc870" stop-opacity=".5"/><stop offset="1" stop-color="#ffc870" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></radialGradient>
</defs>`;
function steine(y0,y1,h,w,f,W){W=W||1600;let d='';for(let y=y0,r=0;y<y1;y+=h,r++){d+=`M0 ${y}H${W}`;for(let x=(r%2)*w/2;x<W;x+=w)d+=`M${x} ${y}V${Math.min(y+h,y1)}`;}return`<path d="${d}" stroke="${f||'rgba(60,38,12,.35)'}" stroke-width="2" fill="none"/>`;}
function boden(W,H){W=W||1600;H=H||780;const m=W/2;let d='';for(let x=-W;x<=2*W;x+=180)d+=`M${m+(x-m)*.35} 470L${x} ${H}`;for(const y of[490,520,560,610,670,740])if(y<H)d+=`M0 ${y}H${W}`;return`<polygon points="0,470 ${W},470 ${W},${H} 0,${H}" fill="url(#boden)"/><path d="${d}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;}
function fries(y,W){W=W||1600;const g=['auge','vogel','ankh','wasser','skarabaeus','feder','sonne'],f=['#1f4f6a','#a33b22','#2b2418'];let s=`<rect x="0" y="${y}" width="${W}" height="62" fill="#caa262"/><path d="M0 ${y}H${W}M0 ${y+62}H${W}"${S('#6b4a1c',4)}/>`;for(let k=0,x=14;x<W-10;x+=52,k++)s+=`<use href="#sym-${g[k%7]}" x="${x}" y="${y+10}" width="42" height="42" color="${f[k%3]}"/>`;return s;}
function streifen(y,W){W=W||1600;const f=['#1f4f6a','#a33b22','#3f7a4a'];let s=`<rect x="0" y="${y}" width="${W}" height="34" fill="#e0c48a"/>`;for(let k=0,x=2;x<W;x+=17,k++)s+=`<rect x="${x}" y="${y+6}" width="11" height="24" rx="5" fill="${f[k%3]}"/>`;return s+`<path d="M0 ${y+34}H${W}"${S('#6b4a1c',3)}/>`;}
function sterne(W){W=W||1600;let s=`<rect width="${W}" height="96" fill="#1b2a48"/>`;for(let k=0;k<Math.round(W/28);k++){const x=(k*97)%W+14,y=14+((k*37)%66);s+=`<path transform="translate(${x} ${y})" d="M0 -7L2 -2L7 -2L3 1L5 7L0 3L-5 7L-3 1L-7 -2L-2 -2Z" fill="#e8c45a"/>`;}return s+`<path d="M0 96H${W}"${S('#d8a73a',5)}/>`;}
function fackel(x,y){return`<g transform="translate(${x} ${y})"><circle r="130" fill="url(#licht)"/><rect x="-6" y="0" width="12" height="62" fill="#4a3218"/><path d="M-18 -5H18L10 15H-10Z" fill="#6e4b22"${S('#3a2610',2)}/><g class="flamme"><path d="M0 -58Q15 -32 12 -12Q8 -3 0 -3Q-8 -3 -12 -12Q-15 -32 0 -58Z" fill="#ff9a2a"/><path d="M0 -40Q7 -24 6 -12Q4 -6 0 -6Q-4 -6 -6 -12Q-7 -24 0 -40Z" fill="#ffe07a"/></g></g>`;}
function kartusche(x,y,g){let s=`<g transform="translate(${x} ${y})"><rect x="-32" y="-82" width="64" height="164" rx="30" fill="#c9a066"${S('#5a3d1c',4)}/><path d="M-36 90H36"${S('#5a3d1c',6)}/>`;g.forEach((n,k)=>s+=`<use href="#sym-${n}" x="-18" y="${-68+k*44}" width="36" height="36" color="#3a2510"/>`);return s+'</g>';}
const krug=()=>`${schatten(42,96)}<path d="M-13 -6Q-38 -8 -38 16M13 -6Q38 -8 38 16"${S('#6b2e14',6)} fill="none"/><path d="M-18 -8Q-46 30 -31 70Q-21 95 0 95Q21 95 31 70Q46 30 18 -8Z" fill="#b5532a"${S('#6b2e14',3)}/><rect x="-21" y="-22" width="42" height="15" rx="4" fill="#8f3f1c"${S('#6b2e14',3)}/><path d="M-34 30H34"${S('#e8c36a',5)}/><path d="M-33 46H33"${S('#1f4f6a',4)}/><path d="M-14 8Q-22 40 -12 70" stroke="rgba(255,255,255,.22)" stroke-width="6" fill="none" stroke-linecap="round"/>`;
const papyrus=()=>`${schatten(55,112)}<rect x="-38" y="40" width="76" height="72" fill="#b48c55"${S('#6b4a1c',3)}/><rect x="-48" y="28" width="96" height="14" fill="#9a7340"${S('#6b4a1c',3)}/><path d="M-44 24L-36 -22H36L44 24Z" fill="#f1e2b4"${S('#9b8255',2)}/><rect x="-42" y="-30" width="84" height="11" rx="5.5" fill="#dcc58e"${S('#9b8255',2)}/><rect x="-48" y="20" width="96" height="10" rx="5" fill="#dcc58e"${S('#9b8255',2)}/><path d="M-28 -8H26M-30 3H28M-32 13H14"${S('#5a4a30',3)} stroke-dasharray="5 4"/><use href="#sym-vogel" x="16" y="2" width="18" height="18" color="#a33b22"/>`;
const katze=()=>`${schatten(50,146)}<rect x="-36" y="96" width="72" height="50" fill="#a9834c"${S('#5a3d1c',3)}/><path d="M-30 112H30M-30 128H30"${S('#5a3d1c',1.5)} opacity=".6"/><path d="M22 92Q42 90 38 68"${S('#26232e',7)} fill="none" stroke-linecap="round"/><path d="M-22 96L-24 40Q-26 14 -13 4L-15 -22L-6 -10H6L15 -22L13 4Q26 14 24 40L22 96Z" fill="#26232e"${S('#000',2)}/><path d="M-12 22Q0 31 12 22"${S('#d8a73a',4)} fill="none"/><circle cx="0" cy="30" r="4" fill="#d8a73a"/><path d="M-8 -2L-3 -1M3 -1L8 -2"${S('#e8c45a',3)} stroke-linecap="round"/><circle cx="-13" cy="-6" r="2.5" fill="#d8a73a"/>`;
const truhe=()=>`${schatten(78,66)}<rect x="-62" y="58" width="12" height="9" fill="#3d230c"/><rect x="50" y="58" width="12" height="9" fill="#3d230c"/><rect x="-66" y="0" width="132" height="60" fill="#7a4a1e"${S('#3d230c',3)}/><path d="M-66 0Q0 -42 66 0Z" fill="#8d5726"${S('#3d230c',3)}/><path d="M-66 0H66"${S('#d8a73a',6)}/><path d="M-50 0V60M50 0V60"${S('#d8a73a',5)}/><rect x="-15" y="8" width="30" height="38" rx="3" fill="#d8a73a"${S('#8a6420',2)}/><use href="#sym-ankh" x="-13" y="12" width="26" height="30" color="#3d230c"/>`;
const wandtafel=()=>`<rect x="-58" y="-48" width="116" height="96" fill="#8d6a3c"${S('#4a3016',4)}/><rect x="-48" y="-38" width="96" height="76" fill="#b08a52"/>${[['ankh',-44,-34],['skarabaeus',-14,-34],['auge',16,-34],['vogel',-44,2],['wasser',-14,2],['sonne',16,2]].map(([n,x,y])=>`<use href="#sym-${n}" x="${x}" y="${y}" width="28" height="28" color="#3a2510"/>`).join('')}`;
const sarkophag=()=>`${schatten(150,76)}<rect x="-140" y="8" width="280" height="64" rx="6" fill="#5b3a1a"${S('#2e1c0a',3)}/><rect x="-140" y="30" width="280" height="17" fill="#1f4f6a"/>${[...Array(9)].map((_,k)=>`<use href="#sym-${['ankh','auge','feder'][k%3]}" x="${-128+k*30}" y="31" width="15" height="15" color="#e8c45a"/>`).join('')}<path d="M-140 10Q-142 -18 -112 -30L118 -22Q142 -18 140 10Z" fill="#d8a73a"${S('#8a6420',3)}/><path d="M-70 -27V9M-40 -26V9M-10 -25V9M20 -24V9M50 -23V9M80 -22V9"${S('#1f4f6a',5)}/><ellipse cx="-112" cy="-30" rx="28" ry="24" fill="#1f4f6a"${S('#8a6420',2)}/><path d="M-128 -42Q-112 -52 -96 -42L-98 -20Q-112 -10 -126 -20Z" fill="#e8b94a"${S('#8a6420',2)}/><path d="M-122 -34h6M-108 -34h6"${S('#1a1208',3)} stroke-linecap="round"/>`;
const krugK=(dx,kopf)=>`<g transform="translate(${dx} 0)"><path d="M-14 -8Q-24 14 -16 34Q-10 40 0 40Q10 40 16 34Q24 14 14 -8Z" fill="#e9dcbc"${S('#8a7a5a',2)}/><path d="M-19 12H19"${S('#1f4f6a',3)}/>${kopf}</g>`;
const kanopen=()=>`${schatten(76,64)}<rect x="-72" y="40" width="144" height="16" fill="#8a6838"${S('#4a3016',3)}/><path d="M-62 56V64M62 56V64"${S('#4a3016',6)}/>${krugK(-45,'<circle cx="0" cy="-18" r="12" fill="#e3c48a" stroke="#8a7a5a" stroke-width="2"/><path d="M-12 -20Q0 -36 12 -20" fill="#1f4f6a"/>')}${krugK(0,'<path d="M-11 -6L-12 -32L-5 -21L0 -23L5 -21L12 -32L11 -6Z" fill="#26232e"/>')}${krugK(45,'<circle cx="0" cy="-18" r="12" fill="#8a6a3a"/><path d="M8 -21L17 -16L8 -12Z" fill="#d8a73a"/>')}`;
const maske=()=>`${schatten(42,142)}<rect x="-28" y="34" width="56" height="106" fill="#a07c48"${S('#4a3016',3)}/><rect x="-38" y="24" width="76" height="12" fill="#8a6838"${S('#4a3016',3)}/><path d="M-34 22L-30 -40Q0 -62 30 -40L34 22Z" fill="#1f4f6a"${S('#8a6420',2)}/><path d="M-32 -20H-16M-33 -6H-15M-34 8H-14M16 -20H32M15 -6H33M14 8H34"${S('#e0ae3e',5)}/><path d="M-16 -32Q0 -40 16 -32L14 4Q0 16 -14 4Z" fill="#e8b94a"${S('#8a6420',2)}/><path d="M-10 -20h7M3 -20h7"${S('#1a1208',3)} stroke-linecap="round"/><rect x="-4" y="10" width="8" height="16" rx="2" fill="#1f4f6a" stroke="#8a6420"/>`;
const malerei=()=>`<rect x="-86" y="-62" width="172" height="124" fill="#6b4a1c"/><rect x="-78" y="-54" width="156" height="108" fill="#ecd9a8"/><circle cx="0" cy="-28" r="15" fill="#c0392b"/><path d="M-62 16Q0 40 62 16L52 6H-52Z" fill="#8a5a2a"/><circle cx="-18" cy="-14" r="5" fill="#3a2510"/><path d="M-23 -8H-13L-11 6H-25Z" fill="#f4f0e0" stroke="#3a2510"/><circle cx="16" cy="-14" r="5" fill="#3a2510"/><path d="M11 -8H21L23 6H9Z" fill="#f4f0e0" stroke="#3a2510"/><path d="M30 -4L48 22"${S('#3a2510',3)}/><path d="M-72 38q9-7 18 0t18 0t18 0t18 0t18 0t18 0t18 0t18 0"${S('#1f4f6a',3)} fill="none"/>`;
const schale=()=>`${schatten(48,72)}<path d="M-34 28L-30 70M34 28L30 70"${S('#4a3016',6)}/><rect x="-42" y="18" width="84" height="10" fill="#8a6838"${S('#4a3016',2)}/><circle cx="-14" cy="-4" r="8" fill="#6a2c70"/><circle cx="-2" cy="-9" r="8" fill="#7b3a85"/><circle cx="10" cy="-4" r="8" fill="#c0392b"/><ellipse cx="22" cy="-1" rx="12" ry="7" fill="#c98a3c"/><path d="M-36 2Q0 34 36 2Z" fill="#d8a73a"${S('#8a6420',2)}/>`;
function lampe(x){return`<g transform="translate(${x} 470)"><circle cy="-165" r="120" fill="url(#licht)"/><path d="M0 0V-150M-20 0H20"${S('#c9a04a',6)}/><path d="M-26 -150H26L16 -132H-16Z" fill="#d8a73a"${S('#8a6420',2)}/><g transform="translate(0 -148) scale(.75)"><g class="flamme"><path d="M0 -58Q15 -32 12 -12Q8 -3 0 -3Q-8 -3 -12 -12Q-15 -32 0 -58Z" fill="#ff9a2a"/><path d="M0 -40Q7 -24 6 -12Q4 -6 0 -6Q-4 -6 -6 -12Q-7 -24 0 -40Z" fill="#ffe07a"/></g></g></g>`;}
function fluegel(x,y){const f=(sx)=>[['#1f4f6a',200,0],['#3f7a4a',160,14],['#a33b22',120,28]].map(([c,l,o])=>`<path d="M0 ${o}Q${-sx*l*.5} ${o-44} ${-sx*l} ${o-8}Q${-sx*l*.55} ${o+14} 0 ${o+20}Z" fill="${c}"${S('#e0c48a',2)}/>`).join('');return`<g transform="translate(${x} ${y})" opacity=".9">${f(1)}${f(-1)}<circle cx="0" cy="4" r="26" fill="#c0392b"${S('#e0c48a',3)}/></g>`;}
function podest(x){return`<rect x="${x-190}" y="468" width="380" height="20" fill="#6f8792"${S('#2c3d4a',2)}/><rect x="${x-210}" y="488" width="420" height="18" fill="#5a707b"${S('#2c3d4a',2)}/>`;}
function saeule(x){return`<g transform="translate(${x} 0)"><rect x="-26" y="108" width="52" height="362" fill="#c9a066"${S('#5a3d1c',3)}/><path d="M-26 150H26M-26 162H26M-26 420H26M-26 432H26"${S('#1f4f6a',5)}/><path d="M-26 108L-46 62H46L26 108Z" fill="#3f7a4a"${S('#5a3d1c',3)}/><path d="M-34 64L-18 106M0 64V106M34 64L18 106"${S('#e0c48a',3)}/><rect x="-52" y="46" width="104" height="18" fill="#c9a066"${S('#5a3d1c',3)}/><rect x="-36" y="460" width="72" height="12" fill="#a07c48"/></g>`;}
function haeufchen(x,y){return`<g transform="translate(${x} ${y})"><ellipse rx="34" ry="10" fill="#b8862a"/><path d="M-30 0Q0 -26 30 0Z" fill="#d8a73a"/><circle cx="-12" cy="-6" r="6" fill="#f3d27a" stroke="#a07a20"/><circle cx="6" cy="-10" r="6" fill="#f3d27a" stroke="#a07a20"/><circle cx="18" cy="-3" r="6" fill="#f3d27a" stroke="#a07a20"/></g>`;}
const thron=()=>`${schatten(58,94)}<rect x="-40" y="-95" width="80" height="100" rx="6" fill="#d8a73a"${S('#8a6420',3)}/><path d="M-26 -60V-6M-13 -60V-6M0 -60V-6M13 -60V-6M26 -60V-6"${S('#1f4f6a',5)}/><use href="#sym-sonne" x="-15" y="-90" width="30" height="30" color="#a33b22"/><path d="M-46 22V86M46 22V86"${S('#8a6420',10)}/><path d="M-54 88h18M36 88h18"${S('#8a6420',8)} stroke-linecap="round"/><rect x="-54" y="0" width="108" height="22" rx="4" fill="#e6b94a"${S('#8a6420',3)}/><rect x="-58" y="-32" width="14" height="36" rx="5" fill="#c99a3a"${S('#8a6420',2)}/><rect x="44" y="-32" width="14" height="36" rx="5" fill="#c99a3a"${S('#8a6420',2)}/>`;
const goldschatz=()=>`${schatten(92,40)}<path d="M-86 38Q-72 -20 -20 -38Q20 -50 56 -20Q86 6 88 38Z" fill="#d8a73a"${S('#8a6420',3)}/>${[[-60,24],[-40,8],[-18,-10],[4,-24],[26,-14],[48,4],[66,24],[-30,28],[-6,14],[18,22],[40,26],[-50,-2],[10,0]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="#f3d27a"${S('#a07a20',1.5)}/>`).join('')}<circle cx="-24" cy="-22" r="6" fill="#c0392b"/><circle cx="34" cy="10" r="6" fill="#1f4f6a"/><circle cx="-8" cy="24" r="6" fill="#3f7a4a"/><path d="M28 -62H58L54 -44Q43 -36 32 -44Z" fill="#e8c45a"${S('#8a6420',2)}/><rect x="40" y="-42" width="6" height="14" fill="#e8c45a" stroke="#8a6420"/><rect x="33" y="-30" width="20" height="6" rx="2" fill="#e8c45a" stroke="#8a6420"/>`;
const anubis=()=>`${schatten(82,94)}<rect x="-72" y="0" width="144" height="90" fill="#d8a73a"${S('#8a6420',3)}/><rect x="-62" y="12" width="124" height="66" fill="none"${S('#1f4f6a',4)}/><use href="#sym-ankh" x="-50" y="24" width="40" height="40" color="#1f4f6a"/><use href="#sym-auge" x="10" y="24" width="40" height="40" color="#1f4f6a"/><path d="M-58 0Q-62 -26 -34 -30L30 -30Q46 -30 46 -12L46 0Z" fill="#1d1a22"/><path d="M-58 -6Q-74 -4 -70 6"${S('#1d1a22',6)} fill="none" stroke-linecap="round"/><rect x="40" y="-7" width="36" height="7" rx="3" fill="#1d1a22"/><path d="M28 -28L32 -50L34 -72L40 -56L44 -72L47 -54L51 -48L72 -42L72 -35L49 -33L47 -26Z" fill="#1d1a22"/><path d="M30 -32L48 -30"${S('#d8a73a',4)}/><circle cx="52" cy="-44" r="2.2" fill="#e8c45a"/>`;
const schmuck=()=>`${schatten(52,46)}<path d="M-42 0L-36 -36H40L42 0Z" fill="#2a5f80"${S('#8a6420',2)}/><rect x="-46" y="0" width="92" height="44" rx="4" fill="#1f4f6a"${S('#d8a73a',3)}/><path d="M-46 12H46"${S('#d8a73a',3)}/>${[-34,-24,-14,-4,6,16,26,36].map((x,k)=>`<circle cx="${x}" cy="${18+Math.round(10*Math.sin((k/7)*Math.PI))}" r="4.5" fill="${['#c0392b','#e8c45a','#3f7a4a','#e8c45a'][k%4]}"/>`).join('')}<circle cx="-18" cy="-6" r="7" fill="#c0392b"/><circle cx="2" cy="-9" r="7" fill="#3f9ad0"/><circle cx="22" cy="-5" r="7" fill="#3f7a4a"/>`;
const boot=()=>`<rect x="-92" y="30" width="184" height="10" fill="#5a2a14"/><path d="M-80 40L-66 56M80 40L66 56"${S('#4a2410',5)}/><path d="M-90 -20Q-62 26 0 26Q62 26 90 -20L76 -4Q50 12 0 12Q-50 12 -76 -4Z" fill="#d8a73a"${S('#8a6420',2)}/><path d="M-60 6Q0 30 60 6L58 14Q0 34 -58 14Z" fill="#1f4f6a"/><rect x="-20" y="-14" width="40" height="24" fill="#1f4f6a"${S('#d8a73a',2)}/><circle cx="0" cy="-28" r="11" fill="#c0392b"${S('#e0c48a',2)}/><path d="M40 -16L62 30"${S('#5a2a14',3)}/>`;
function koloss(x){return`<g transform="translate(${x} 470)"><rect x="-74" y="-190" width="148" height="190" fill="#a89070"${S('#5a4a30',3)}/><rect x="-44" y="-130" width="32" height="130" fill="#b89a74"${S('#5a4a30',2)}/><rect x="12" y="-130" width="32" height="130" fill="#b89a74"${S('#5a4a30',2)}/><path d="M-44 -190V-310Q-44 -338 0 -338Q44 -338 44 -310V-190Z" fill="#b89a74"${S('#5a4a30',2)}/><path d="M-44 -150H44"${S('#5a4a30',2)}/><path d="M-36 -338L-32 -410Q0 -432 32 -410L36 -338Z" fill="#1f4f6a" opacity=".85"/><path d="M-19 -404Q0 -413 19 -404L17 -356Q0 -344 -17 -356Z" fill="#c9a57a"/><path d="M-12 -386h7M5 -386h7"${S('#3a2510',3)} stroke-linecap="round"/><rect x="-5" y="-352" width="10" height="20" fill="#1f4f6a"/></g>`;}
function lichtstrahl(x){return`<polygon points="${x-40},60 ${x+40},60 ${x+190},470 ${x-190},470" fill="#fff3b0" opacity=".16"/><polygon points="${x-190},470 ${x+190},470 ${x+260},560 ${x-260},560" fill="#fff3b0" opacity=".1"/>`;}
const raeucher=()=>`${schatten(30,4)}<path d="M-6 0V-58M6 0V-58"${S('#8a6420',5)}/><rect x="-24" y="-4" width="48" height="7" rx="3" fill="#8a6420"/><path d="M-26 -60H26L18 -44H-18Z" fill="#d8a73a"${S('#8a6420',2)}/><circle cx="-6" cy="-62" r="4" fill="#ff9a2a"/><circle cx="6" cy="-62" r="3" fill="#ffcf5a"/><path d="M0 -66Q-14 -84 0 -100Q14 -116 0 -134"${S('#efe8da',7)} fill="none" opacity=".6" stroke-linecap="round"/>`;
const altar=()=>`${schatten(74,4)}<rect x="-62" y="-60" width="124" height="60" fill="#d9ccb0"${S('#6b5a3a',3)}/><rect x="-72" y="-70" width="144" height="12" fill="#c9b994"${S('#6b5a3a',3)}/><path d="M-50 -30H50"${S('#1f4f6a',6)}/><use href="#sym-ankh" x="-12" y="-28" width="24" height="24" color="#a33b22"/><ellipse cx="-38" cy="-78" rx="17" ry="8" fill="#c98a3c"/><ellipse cx="-16" cy="-80" rx="14" ry="9" fill="#d8a050"/><path d="M12 -70Q10 -96 21 -100Q32 -96 30 -70Z" fill="#b5532a"${S('#6b2e14',2)}/><path d="M48 -70V-94"${S('#3f7a4a',3)}/><path transform="translate(48 -98)" d="M0 6Q-10 -2 -7 -14Q-3 -6 0 -15Q3 -6 7 -14Q10 -2 0 6Z" fill="#e88aa8" stroke="#a33b6b"/>`;
const sphinx=()=>`${schatten(84,4)}<rect x="-76" y="-30" width="152" height="30" fill="#a8977a"${S('#4a3a24',3)}/><path d="M-68 -40Q-86 -44 -82 -30"${S('#d9b67c',6)} fill="none" stroke-linecap="round"/><path d="M-66 -30Q-70 -62 -40 -64L30 -64Q42 -64 42 -48L42 -30Z" fill="#d9b67c"${S('#8a6a3a',2)}/><rect x="38" y="-40" width="36" height="10" rx="5" fill="#d9b67c" stroke="#8a6a3a"/><path d="M20 -62L18 -100Q33 -114 48 -100L46 -62Z" fill="#1f4f6a"${S('#8a6a3a',2)}/><path d="M25 -98Q33 -104 41 -98L40 -72Q33 -64 26 -72Z" fill="#d9b67c"/><path d="M28 -88h4M35 -88h4"${S('#1a1208',2.5)} stroke-linecap="round"/>`;
const harfe=()=>{const p=t=>[((1-t)*(1-t)*-24+2*t*(1-t)*-44+t*t*12).toFixed(1),((1-t)*(1-t)*0+2*t*(1-t)*-70+t*t*-132).toFixed(1)];return`${schatten(38,4)}${[.3,.45,.6,.75,.9].map((t,k)=>{const q=p(t);return`<path d="M${-14+k*8} 0L${q[0]} ${q[1]}"${S('#e8dcc0',1.5)}/>`;}).join('')}<path d="M-24 0Q-44 -70 12 -132"${S('#8a5a2a',10)} fill="none" stroke-linecap="round"/><path d="M-30 0H28"${S('#8a5a2a',9)} stroke-linecap="round"/><circle cx="12" cy="-134" r="7" fill="#d8a73a"/>`;};
const relief=()=>`<rect x="-82" y="-96" width="164" height="192" fill="#cdbf9f"${S('#6b5a3a',4)}/><rect x="-72" y="-86" width="144" height="172" fill="none"${S('#a89070',2)}/><circle cx="0" cy="-60" r="18" fill="#c0392b"/><path d="M-12 -40Q0 -50 12 -40L10 -18H-10Z" fill="#3f6a4a"/><path d="M10 -32L22 -28L10 -24Z" fill="#d8a73a"/><path d="M-16 -18H16L22 54H-22Z" fill="#f4f0e0"${S('#3a2510',2)}/><path d="M-10 54V80M10 54V80"${S('#3f6a4a',7)}/><use href="#sym-ankh" x="18" y="-6" width="30" height="30" color="#1f4f6a"/><path d="M-16 0H-34V40"${S('#3a2510',5)} fill="none"/>`;
function seil(x,l){return`<path d="M${x} 0V${l}"${S('#a88a5a',5)}/><path d="M${x} ${l}q-14 10 0 20q14 10 0 20"${S('#a88a5a',5)} fill="none"/>`;}
function becken(x,y){return`<ellipse cx="${x}" cy="${y}" rx="190" ry="48" fill="#5a6a70"${S('#2c3a40',4)}/><ellipse cx="${x}" cy="${y}" rx="172" ry="38" fill="#2f6f8f"/><ellipse cx="${x-40}" cy="${y-6}" rx="60" ry="10" fill="none"${S('#8fcbe0',2)} opacity=".7"/><ellipse cx="${x+60}" cy="${y+8}" rx="40" ry="7" fill="none"${S('#8fcbe0',2)} opacity=".6"/>`;}
function treppe(x){let s='';for(let k=0;k<4;k++)s+=`<rect x="${x-150+k*12}" y="${470+k*14}" width="${300-k*24}" height="14" fill="${k%2?'#55646a':'#61727a'}"${S('#2c3a40',2)}/>`;return s;}
const eimer=()=>`${schatten(32,4)}<path d="M-24 -50Q0 -92 24 -50"${S('#555',3)} fill="none"/><path d="M-26 -50L-19 0H19L26 -50Z" fill="#8a5a2a"${S('#4a2410',3)}/><path d="M-25 -38H25M-21 -14H21"${S('#4a2410',3)}/><ellipse cx="0" cy="-50" rx="26" ry="6" fill="#3f8fbf"${S('#4a2410',2)}/>`;
const winde=()=>`${schatten(58,4)}<path d="M-50 0L-40 -92M50 0L40 -92"${S('#6b4a1c',10)} stroke-linecap="round"/><path d="M0 -74V-8"${S('#c9a26a',3)}/><path d="M-8 -8H8L6 4H-6Z" fill="#555"/><rect x="-46" y="-98" width="92" height="24" rx="12" fill="#8a5a2a"${S('#4a2410',3)}/><path d="M-34 -98V-74M-20 -98V-74M-6 -98V-74M8 -98V-74M22 -98V-74M34 -98V-74"${S('#c9a26a',3)}/><path d="M46 -86H66V-60"${S('#4a2410',6)} fill="none" stroke-linecap="round"/>`;
const krokodil=()=>`${schatten(72,4)}<rect x="-66" y="-26" width="132" height="26" fill="#6f7f72"${S('#2c3a30',3)}/><path d="M-62 -30Q-82 -28 -86 -42"${S('#3f7a4a',9)} fill="none" stroke-linecap="round"/><path d="M-30 -46L-24 -55L-18 -46L-12 -55L-6 -46L0 -55L6 -46L12 -55L18 -46Z" fill="#3f7a4a"${S('#1f3f25',2)}/><path d="M-62 -26Q-62 -48 -30 -46L30 -44L68 -36L68 -30L30 -30L30 -26Z" fill="#3f7a4a"${S('#1f3f25',2)}/><path d="M34 -33H66"${S('#e8e0c8',2)} stroke-dasharray="3 3"/><circle cx="26" cy="-46" r="4" fill="#e8c45a"/>`;
const korb=()=>`${schatten(42,4)}<path d="M-14 -40L-26 -80"${S('#6b4a1c',6)} stroke-linecap="round"/><rect x="-40" y="-92" width="26" height="14" rx="3" fill="#666" transform="rotate(-20 -27 -85)"/><path d="M12 -40L20 -84"${S('#999',5)} stroke-linecap="round"/><path d="M-38 -40L-31 0H31L38 -40Z" fill="#c9a26a"${S('#6b4a1c',3)}/><path d="M-36 -27H36M-33 -13H33M-19 -40L-16 0M0 -40V0M19 -40L16 0"${S('#8a6a3a',2)}/>`;
const messlatte=()=>`<rect x="-24" y="-112" width="48" height="224" fill="#8a9a9e"${S('#2c3a40',3)}/>${[...Array(9)].map((_,k)=>`<path d="M-24 ${-90+k*22}H${k%2?0:12}"${S('#1d2a30',3)}/>`).join('')}<path d="M-24 80q12-8 24 0t24 0"${S('#3f8fbf',4)} fill="none"/><use href="#sym-wasser" x="-14" y="86" width="28" height="22" color="#1f4f6a"/>`;
const inschrift=()=>kartusche(0,0,['ankh','auge','feder']);
const stele=()=>`${schatten(44,6)}<path d="M-36 0V-122Q-36 -154 0 -154Q36 -154 36 -122V0Z" fill="#a8977a"${S('#4a3a24',3)}/><circle cx="0" cy="-124" r="15" fill="#c0392b"${S('#e0c48a',2)}/><path d="M-26 -100H26M-26 -60H26M-26 -22H26"${S('#4a3a24',2)}/>${[['vogel',-26,-96],['wasser',-4,-96],['auge',-26,-58],['ankh',-4,-58]].map(([n,x,y])=>`<use href="#sym-${n}" x="${x}" y="${y}" width="30" height="30" color="#3a2510"/>`).join('')}`;
const vase=()=>`${schatten(32,4)}<path d="M2 -70V-118M-8 -70Q-20 -100 -26 -112M10 -70Q22 -96 30 -106"${S('#3f7a4a',4)} fill="none"/>${[[2,-120],[-27,-114],[31,-108]].map(([x,y])=>`<path transform="translate(${x} ${y})" d="M0 6Q-12 -4 -8 -16Q-3 -8 0 -18Q3 -8 8 -16Q12 -4 0 6Z" fill="#e88aa8"${S('#a33b6b',1.5)}/>`).join('')}<path d="M-16 0Q-30 -30 -18 -56Q-12 -64 -14 -72H14Q12 -64 18 -56Q30 -30 16 0Z" fill="#3a7ab0"${S('#1f4f6a',2)}/><path d="M-24 -30H24"${S('#e8c45a',4)}/>`;
const sternkarte=()=>`<rect x="-62" y="-50" width="124" height="100" fill="#1b2a48"${S('#d8a73a',4)}/><path d="M-40 -30L-10 -20L25 -34M-30 10L5 25L35 30"${S('#e8c45a',1.5)} opacity=".6"/>${[[-40,-30],[-10,-20],[25,-34],[40,0],[-30,10],[5,25],[35,30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#e8c45a"/>`).join('')}`;
const uschebti=()=>`${schatten(50,40)}${[-28,0,28].map(x=>`<rect x="${x-9}" y="-34" width="18" height="40" rx="9" fill="#3f9a8a"${S('#1f4f6a',2)}/>`).join('')}<rect x="-46" y="0" width="92" height="40" fill="#7a4a1e"${S('#3d230c',3)}/><path d="M-46 14H46"${S('#d8a73a',4)}/>`;
const senet=()=>`${schatten(60,52)}<path d="M-44 10V52M44 10V52"${S('#5a3d1c',7)}/><rect x="-60" y="-6" width="120" height="18" fill="#c9a066"${S('#5a3d1c',3)}/><path d="M-60 3H60${[...Array(9)].map((_,k)=>`M${-48+k*12} -6V12`).join('')}"${S('#5a3d1c',1.5)}/><circle cx="-30" cy="-11" r="5" fill="#f4f0e0"/><path d="M14 -6L18 -20L22 -6Z" fill="#1d1a22"/>`;
const schatzliste=()=>`<rect x="-50" y="-60" width="100" height="120" rx="8" fill="#e0c48a"${S('#6b4a1c',4)}/><circle cy="-38" r="10" fill="#f3d27a"${S('#a07a20',2)}/><path d="M-34 -14H34M-34 8H34M-34 30H34"${S('#5a3d1c',4)} stroke-dasharray="8 5"/>`;
const waage=()=>`${schatten(50,4)}<path d="M0 0V-90M-44 -84H44M-44 -84L-56 -50M-44 -84L-32 -50M44 -84L32 -50M44 -84L56 -50"${S('#8a6420',4)} fill="none"/><path d="M-60 -50Q-44 -36 -28 -50ZM28 -50Q44 -36 60 -50Z" fill="#d8a73a"${S('#8a6420',2)}/><rect x="-22" y="-6" width="44" height="8" fill="#8a6420"/><use href="#sym-feder" x="34" y="-74" width="20" height="24" color="#f4f0e0"/>`;
const pult=()=>`${schatten(58,50)}<path d="M-46 0L-50 50M46 0L50 50"${S('#5a3d1c',7)}/><rect x="-58" y="-8" width="116" height="12" fill="#8d5726"${S('#3d230c',3)}/><path d="M-50 -8L-44 -20H10L14 -8Z" fill="#f1e2b4"${S('#9b8255',2)}/><rect x="20" y="-16" width="34" height="8" rx="2" fill="#c9a066" stroke="#5a3d1c"/><circle cx="28" cy="-12" r="2.5" fill="#1d1a22"/><circle cx="36" cy="-12" r="2.5" fill="#c0392b"/><path d="M44 -14L60 -36"${S('#3f7a4a',3)}/>`;
const kalender=()=>`<circle r="62" fill="#cdbf9f"${S('#6b5a3a',4)}/><path d="${[...Array(12)].map((_,k)=>{const c=Math.cos(k*.5236),s=Math.sin(k*.5236);return`M${Math.round(22*c)} ${Math.round(22*s)}L${Math.round(62*c)} ${Math.round(62*s)}`;}).join('')}"${S('#6b5a3a',2)}/><circle r="22" fill="#d8a73a"${S('#8a6420',3)}/><use href="#sym-sonne" x="-16" y="-16" width="32" height="32" color="#a33b22"/>`;
const ibis=()=>`${schatten(40,4)}<rect x="-30" y="-36" width="60" height="36" fill="#a8977a"${S('#4a3a24',3)}/><path d="M-26 -50L-36 -36M-12 -40V-36"${S('#1d1a22',4)}/><path d="M-22 -40Q-34 -70 0 -74Q20 -74 14 -50Z" fill="#f4f0e0"${S('#3a2510',2)}/><path d="M8 -70Q14 -100 0 -106Q-6 -106 -8 -100Q-24 -94 -30 -76"${S('#1d1a22',5)} fill="none" stroke-linecap="round"/>`;
const obelisk=()=>`${schatten(30,4)}<rect x="-30" y="-14" width="60" height="14" fill="#8a7a5a"${S('#4a3a24',2)}/><path d="M-18 -14L-12 -150L0 -166L12 -150L18 -14Z" fill="#d9ccb0"${S('#6b5a3a',3)}/><path d="M-12 -150L0 -166L12 -150Z" fill="#d8a73a"/>${['ankh','vogel','auge'].map((n,k)=>`<use href="#sym-${n}" x="-10" y="${-136+k*38}" width="20" height="24" color="#3a2510"/>`).join('')}`;
const nilkarte=()=>`<rect x="-56" y="-66" width="112" height="132" fill="#f1e2b4"${S('#9b8255',3)}/><path d="M-4 60Q-18 30 -4 0Q12 -30 -4 -44M-4 -44Q-26 -54 -40 -58M-4 -44Q16 -56 36 -60"${S('#3f8fbf',6)} fill="none" stroke-linecap="round"/><path d="M18 14L28 -2L38 14ZM-40 30L-32 16L-24 30Z" fill="#d8a73a" stroke="#8a6420"/>`;
const stauden=()=>`${schatten(40,4)}<path d="${[-20,-6,8,22].map((x,k)=>`M${x/2} -30L${x} ${-100-k%2*20}`).join('')}"${S('#3f7a4a',4)}/>${[-20,-6,8,22].map((x,k)=>`<path d="M${x} ${-98-k%2*20}l-11 -16h22Z" fill="#6fa04a"/>`).join('')}<rect x="-34" y="-32" width="68" height="32" rx="4" fill="#7a8a8e"${S('#2c3a40',3)}/>`;
const scherben=()=>`${schatten(46,40)}<path d="M-36 -2L-28 -20L-14 -6ZM-10 -4L4 -24L18 -4ZM14 -2L30 -16L38 0Z" fill="#c9845a"${S('#6b2e14',2)}/><rect x="-42" y="-4" width="84" height="44" fill="#8a5a2a"${S('#4a2410',3)}/><path d="M-42 18H42M-14 -4V40M14 -4V40"${S('#4a2410',2)}/>`;
SZENARIEN.grabkammer={
name:"Ägyptische Grabkammer",
symbole:["ankh","auge","skarabaeus","feder","sonne"],
symbolNamen:["Ankh","Auge des Horus","Skarabäus","Feder der Maat","Sonnenscheibe"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><polygon points="8,86 60,8 112,86" fill="#d8a73a"${S('#8a6420',3)}/><path d="M34 47H86M21 66H99"${S('#8a6420',2)}/><use href="#sym-auge" x="42" y="40" width="36" height="36" color="#1f4f6a"/></svg>`,
texte:{
einleitung:"Ihr seid ein Team von Forscherinnen und Forschern im Tal der Könige. Kaum habt ihr das Grab betreten, fällt hinter euch krachend eine Steinplatte zu! An jeder Tür hängt ein uraltes Zahlenschloss. Untersucht die Gegenstände in den Räumen: Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findet ihr den Weg zurück ans Tageslicht?",
startKnopf:"Das Grab betreten",
hinweisGeber:"Der heilige Skarabäus flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Götter schütteln den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das steinerne Zahlenschloss",
schlossSymbol:"Über jedem Steinrad ist ein Zeichen eingemeißelt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Es knirscht – aber die Steinplatte bewegt sich nicht. Überprüft eure Ziffern!",
zeitUmTitel:"Die Fackeln sind erloschen!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus der Grabkammer zurück ans Tageslicht gefunden. Der Pharao wäre stolz auf euch!"
},
texteDu:{
einleitung:"Du bist Forscherin oder Forscher im Tal der Könige. Kaum hast du das Grab betreten, fällt hinter dir krachend eine Steinplatte zu! An jeder Tür hängt ein uraltes Zahlenschloss. Untersuche die Gegenstände in den Räumen: Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findest du den Weg zurück ans Tageslicht?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Götter schütteln den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Steinrad ist ein Zeichen eingemeißelt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Es knirscht – aber die Steinplatte bewegt sich nicht. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus der Grabkammer zurück ans Tageslicht gefunden. Der Pharao wäre stolz auf dich!"
},
einfach:{
name:"Das alte Grab in Ägypten",
symbolNamen:["Henkelkreuz","Auge","Käfer","Feder","Sonne"],
texte:{
einleitung:"Ihr seid in Ägypten und besucht ein sehr altes Grab. Hier liegt ein Pharao. So hießen die Könige im alten Ägypten. Plötzlich fällt hinter euch eine schwere Steintür zu! An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
hinweisGeber:"Der kleine Käfer flüstert:",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
texteDu:{
einleitung:"Du bist in Ägypten und besuchst ein sehr altes Grab. Hier liegt ein Pharao. So hießen die Könige im alten Ägypten. Plötzlich fällt hinter dir eine schwere Steintür zu! An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Der lange Gang",
intro:"Ein langer, dunkler Gang. Fackeln geben Licht. An den Wänden sind bunte Bilder und Zeichen. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[
{name:"Krug",fund:"Im Krug liegt eine kleine Tafel:"},
{name:"Schriftrolle",fund:"In der Schriftrolle steckt ein Stein:"},
{name:"Katzenfigur",fund:"Die Augen der Katze leuchten. Unter der Katze liegt:"},
{name:"Truhe",fund:"Die Truhe geht auf! Darin liegt:"},
{name:"Steintafel",fund:"Ein Stein in der Tafel ist lose. Dahinter liegt:"}
],
infoObjekte:[{name:"Zeichen an der Wand",fund:"Hinter den Zeichen ist ein kleines Fach:"},{name:"Stein mit Bildern",fund:"Am Stein liegt:"},{name:"Blumenvase",fund:"Zwischen den Blumen steckt:"}]},
{titel:"Die Grabkammer",
intro:"Ihr seid in der Grabkammer. Hier steht ein großer goldener Sarg. An der Decke leuchten Sterne. Findet die Zahlen für das nächste Schloss!",
introDu:"Du bist in der Grabkammer. Hier steht ein großer goldener Sarg. An der Decke leuchten Sterne. Finde die Zahlen für das nächste Schloss!",
objekte:[
{name:"Goldener Sarg",fund:"Im Deckel vom Sarg ist ein Geheimfach:"},
{name:"Drei Krüge",fund:"Unter einem Krug liegt:"},
{name:"Goldene Maske",fund:"Hinter der Maske steht:"},
{name:"Bild an der Wand",fund:"Im Bild leuchtet ein Zeichen:"},
{name:"Obstschale",fund:"Unter dem Obst liegt eine goldene Münze:"}
],
infoObjekte:[{name:"Bild mit Sternen",fund:"Hinter einem Stern steht:"},{name:"Kiste mit kleinen Figuren",fund:"Unter den Figuren liegt:"},{name:"Altes Brettspiel",fund:"Unter dem Spiel klebt:"}]},
{titel:"Die Schatzkammer",
intro:"Das ist die Schatzkammer! Überall liegt Gold. Löst die Aufgaben, dann geht die Tür auf.",
introDu:"Das ist die Schatzkammer! Überall liegt Gold. Löse die Aufgaben, dann geht die Tür auf.",
objekte:[
{name:"Goldener Stuhl",fund:"Unter dem Stuhl klebt:"},
{name:"Haufen Gold",fund:"Zwischen dem Gold liegt:"},
{name:"Hundefigur",fund:"In der Kiste unter dem Hund liegt:"},
{name:"Schmuckkiste",fund:"Unter den Ketten liegt:"},
{name:"Kleines Boot",fund:"Im Boot liegt:"}
],
infoObjekte:[{name:"Liste an der Wand",fund:"Unter der Liste steht:"},{name:"Waage",fund:"In der Waage liegt:"},{name:"Schreibtisch",fund:"Auf dem Tisch liegt ein Blatt:"}]},
{titel:"Der Tempel",
intro:"Ihr seid in einem Tempel. Zwei riesige Figuren aus Stein stehen an der Wand. Von oben fällt Licht herein.",
introDu:"Du bist in einem Tempel. Zwei riesige Figuren aus Stein stehen an der Wand. Von oben fällt Licht herein.",
objekte:[
{name:"Schale mit Duft",fund:"In der Schale liegt:"},
{name:"Tisch mit Gaben",fund:"Zwischen den Gaben liegt:"},
{name:"Steinlöwe",fund:"Unter der Pfote liegt:"},
{name:"Harfe",fund:"Eine Saite klingt. Im Holz steckt:"},
{name:"Bild mit Vogelkopf",fund:"Die rote Sonne leuchtet:"}
],
infoObjekte:[{name:"Kalender aus Stein",fund:"Hinter der Sonne steckt:"},{name:"Vogel aus Stein",fund:"Unter dem Vogel steht:"},{name:"Spitze Steinsäule",fund:"Auf der Säule steht:"}]},
{titel:"Der Brunnen",
intro:"Ihr seid tief unten im Brunnen. Wasser tropft von den Wänden. Seile hängen von oben herab. Öffnet das letzte Schloss!",
introDu:"Du bist tief unten im Brunnen. Wasser tropft von den Wänden. Seile hängen von oben herab. Öffne das letzte Schloss!",
objekte:[
{name:"Eimer",fund:"Im Eimer liegt:"},
{name:"Rolle mit Seil",fund:"Am Seil hängt:"},
{name:"Krokodil-Figur",fund:"Im Maul des Krokodils liegt:"},
{name:"Korb mit Werkzeug",fund:"Unter dem Hammer liegt:"},
{name:"Messlatte",fund:"Hinter der Messlatte steckt:"}
],
infoObjekte:[{name:"Karte vom Fluss",fund:"Neben dem Fluss steht:"},{name:"Kiste mit Scherben",fund:"Auf einer Scherbe steht:"},{name:"Hohe Pflanzen",fund:"Zwischen den Pflanzen steckt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Eingangsgang",
intro:"Ein schmaler Gang, nur von flackernden Fackeln beleuchtet. An den Wänden leuchten bunte Hieroglyphen. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
tuerX:800,
hintergrund:()=>`${defs()}<rect width="1600" height="470" fill="#b48a52"/><rect width="1600" height="470" fill="#d9b67c" opacity=".55"/>${steine(102,470,46,112)}<rect width="1600" height="40" fill="#3a2a17"/>${fries(40)}${boden()}${fackel(200,232)}${fackel(630,232)}${fackel(970,232)}${fackel(1400,232)}`,
objekte:[
{name:"Tonkrug",x:270,boden:560,fuss:96,by:-55,zeichne:krug,fund:"Am Boden des Krugs liegt eine kleine Tontafel:"},
{name:"Papyrusrolle",x:520,boden:650,fuss:112,by:-62,zeichne:papyrus,fund:"In der Papyrusrolle steckt ein Steinchen:"},
{name:"Katzenstatue der Bastet",x:1090,boden:560,fuss:146,by:-55,zeichne:katze,fund:"Die Augen der Katze leuchten – auf ihrem Sockel erscheint:"},
{name:"Holztruhe",x:1330,boden:690,fuss:66,by:-50,zeichne:truhe,fund:"Die Truhe springt auf! Darin liegt:"},
{name:"Wandtafel",x:420,y:282,wand:true,by:-78,zeichne:wandtafel,fund:"Ein Stein der Tafel lässt sich herausziehen:"}
],
infoObjekte:[
{name:"Inschrift",x:1190,y:262,wand:true,by:-108,zeichne:inschrift,fund:"Hinter der Inschrift öffnet sich ein kleines Fach:"},
{name:"Gedenkstein",x:130,boden:740,fuss:6,by:-180,zeichne:stele,fund:"Am Fuß des Gedenksteins liegt:"},
{name:"Lotusvase",x:1520,boden:590,fuss:4,by:-150,zeichne:vase,fund:"Zwischen den Lotusblüten steckt:"}
]},
{titel:"Die Grabkammer",
intro:"Ihr steht in der Grabkammer des Pharaos. Ein goldener Sarkophag ruht auf einem Podest, an der Decke funkeln Sterne. Findet die Ziffern für das nächste Schloss!",
introDu:"Du stehst in der Grabkammer des Pharaos. Ein goldener Sarkophag ruht auf einem Podest, an der Decke funkeln Sterne. Finde die Ziffern für das nächste Schloss!",
tuerX:1350,
hintergrund:()=>`${defs('#3a4d58','#141c24')}<rect width="1600" height="470" fill="#2b5260"/><circle cx="760" cy="330" r="520" fill="#6fa3ad" opacity=".22"/>${steine(130,470,48,120,'rgba(8,22,30,.5)')}${sterne()}${streifen(96)}${fluegel(760,232)}${boden()}${podest(760)}${lampe(560)}${lampe(960)}`,
objekte:[
{name:"Sarkophag",x:760,boden:492,fuss:76,by:-82,zeichne:sarkophag,fund:"Im Deckel des Sarkophags öffnet sich ein Geheimfach:"},
{name:"Kanopenkrüge",x:250,boden:600,fuss:64,by:-68,zeichne:kanopen,fund:"Unter einem der Krüge liegt:"},
{name:"Goldene Totenmaske",x:1090,boden:560,fuss:142,by:-78,zeichne:maske,fund:"Hinter der Maske ist etwas eingeritzt:"},
{name:"Wandmalerei",x:330,y:232,wand:true,by:-88,zeichne:malerei,fund:"In der Sonnenbarke erscheint ein Zeichen:"},
{name:"Opferschale",x:600,boden:700,fuss:72,by:-48,zeichne:schale,fund:"Unter den Feigen liegt eine goldene Münze:"}
],
infoObjekte:[
{name:"Sternenkarte",x:1130,y:250,wand:true,by:-80,zeichne:sternkarte,fund:"Ein goldener Stern lässt sich drehen. Dahinter steht:"},
{name:"Kasten mit Uschebti-Figuren",x:110,boden:720,fuss:40,by:-64,zeichne:uschebti,fund:"Unter den kleinen Dienerfiguren liegt:"},
{name:"Senet-Spielbrett",x:1530,boden:690,fuss:52,by:-50,zeichne:senet,fund:"Unter dem Spielbrett klebt:"}
]},
{titel:"Die Schatzkammer",
intro:"Ihr habt die Schatzkammer gefunden! Überall glänzt Gold im Licht. Doch auch diese Tür ist verschlossen – nur wer die Rätsel löst, kommt weiter.",
introDu:"Du hast die Schatzkammer gefunden! Überall glänzt Gold im Licht. Doch auch diese Tür ist verschlossen – nur wenn du die Rätsel löst, kommst du weiter.",
tuerX:220,
hintergrund:()=>`${defs('#6b3418','#2a1206')}<rect width="1600" height="470" fill="#7c2f1d"/><circle cx="900" cy="330" r="520" fill="url(#licht)"/>${steine(48,470,46,100,'rgba(40,10,4,.45)')}<rect width="1600" height="48" fill="#2a1208"/>${boden()}${saeule(430)}${saeule(830)}${saeule(1230)}${saeule(1580)}${haeufchen(480,560)}${haeufchen(1000,600)}${haeufchen(1300,745)}${haeufchen(760,760)}`,
objekte:[
{name:"Goldener Thron",x:600,boden:600,fuss:94,by:-125,zeichne:thron,fund:"Unter dem Sitz des Throns klebt:"},
{name:"Goldschatz",x:900,boden:700,fuss:40,by:-88,zeichne:goldschatz,fund:"Zwischen den Goldmünzen liegt:"},
{name:"Anubis-Figur",x:1120,boden:560,fuss:94,by:-100,zeichne:anubis,fund:"Im Schrein unter Anubis liegt:"},
{name:"Schmuckkästchen",x:1430,boden:690,fuss:46,by:-64,zeichne:schmuck,fund:"Unter den Ketten liegt:"},
{name:"Modell der Sonnenbarke",x:630,y:210,wand:true,by:-62,zeichne:boot,fund:"Im kleinen Boot liegt:"}
],
infoObjekte:[
{name:"Schatzverzeichnis",x:1030,y:262,wand:true,by:-88,zeichne:schatzliste,fund:"Unter der Liste der Schätze steht:"},
{name:"Goldwaage",x:1480,boden:560,fuss:4,by:-125,zeichne:waage,fund:"In der Waagschale liegt:"},
{name:"Schreiberpult",x:400,boden:730,fuss:50,by:-66,zeichne:pult,fund:"Auf dem Pult liegt ein Blatt Papyrus:"}
]},
{titel:"Der Tempel der Götter",
intro:"Ihr betretet einen Tempel. Zwei riesige Steinfiguren bewachen den Raum, durch eine Öffnung in der Decke fällt ein Lichtstrahl. Hier ehrten die Ägypter ihre Götter.",
introDu:"Du betrittst einen Tempel. Zwei riesige Steinfiguren bewachen den Raum, durch eine Öffnung in der Decke fällt ein Lichtstrahl. Hier ehrten die Ägypter ihre Götter.",
tuerX:800,
hintergrund:()=>`${defs('#8a7a5a','#3a3020')}<rect width="1600" height="470" fill="#c9bea2"/><circle cx="800" cy="300" r="560" fill="#7fb59a" opacity=".22"/>${steine(60,470,52,130,'rgba(90,74,48,.35)')}<rect width="1600" height="60" fill="#3a3020"/>${streifen(60)}${koloss(300)}${koloss(1300)}${boden()}${lichtstrahl(800)}`,
objekte:[
{name:"Räuchergefäß",x:560,boden:610,fuss:4,by:-150,zeichne:raeucher,fund:"Im Rauch erscheint ein Zeichen:"},
{name:"Opferaltar",x:1060,boden:560,fuss:4,by:-120,zeichne:altar,fund:"Zwischen den Opfergaben liegt:"},
{name:"Sphinx",x:320,boden:700,fuss:4,by:-130,zeichne:sphinx,fund:"Unter der Pranke der Sphinx liegt:"},
{name:"Harfe",x:1400,boden:660,fuss:4,by:-160,zeichne:harfe,fund:"Eine Saite klingt – im Rahmen steckt:"},
{name:"Relief des Sonnengottes Ra",x:1080,y:250,wand:true,by:-120,zeichne:relief,fund:"Die Sonnenscheibe leuchtet auf:"}
],
infoObjekte:[
{name:"Tempelkalender",x:520,y:262,wand:true,by:-90,zeichne:kalender,fund:"Hinter der Sonne des Kalenders steckt:"},
{name:"Ibis-Statue des Thot",x:140,boden:560,fuss:4,by:-135,zeichne:ibis,fund:"Am Sockel des Ibis ist eingemeißelt:"},
{name:"Kleiner Obelisk",x:1520,boden:740,fuss:4,by:-190,zeichne:obelisk,fund:"Auf dem Obelisken steht:"}
]},
{titel:"Der Brunnenschacht",
intro:"Tief unter dem Grab liegt ein alter Brunnenschacht. Wasser tropft von den Wänden, Seile hängen von oben herab. Über die Treppe geht es hinaus – wenn ihr das letzte Schloss öffnet.",
introDu:"Tief unter dem Grab liegt ein alter Brunnenschacht. Wasser tropft von den Wänden, Seile hängen von oben herab. Über die Treppe geht es hinaus – wenn du das letzte Schloss öffnest.",
tuerX:300,
hintergrund:()=>`${defs('#2f3a40','#12181c')}<rect width="1600" height="470" fill="#3a4a52"/><circle cx="1000" cy="200" r="420" fill="#9fc8d8" opacity=".12"/>${steine(0,470,44,96,'rgba(10,18,22,.5)')}<ellipse cx="620" cy="380" rx="70" ry="18" fill="#3f7a4a" opacity=".5"/><ellipse cx="1420" cy="300" rx="50" ry="14" fill="#3f7a4a" opacity=".45"/>${seil(900,300)}${seil(1110,240)}${boden()}${treppe(300)}${becken(1000,650)}`,
objekte:[
{name:"Wassereimer",x:640,boden:640,fuss:4,by:-110,zeichne:eimer,fund:"Am Boden des Eimers liegt:"},
{name:"Seilwinde",x:1150,boden:530,fuss:4,by:-130,zeichne:winde,fund:"Am Ende des Seils hängt:"},
{name:"Krokodilfigur des Sobek",x:1380,boden:690,fuss:4,by:-90,zeichne:krokodil,fund:"Im Maul des Krokodils liegt:"},
{name:"Werkzeugkorb",x:470,boden:745,fuss:4,by:-120,zeichne:korb,fund:"Zwischen Hammer und Meißel liegt:"},
{name:"Wasserstandsmesser",x:780,y:280,wand:true,by:-140,zeichne:messlatte,fund:"Hinter der Messlatte steckt:"}
],
infoObjekte:[
{name:"Karte des Nils",x:1300,y:262,wand:true,by:-94,zeichne:nilkarte,fund:"Neben dem Fluss auf der Karte steht:"},
{name:"Kiste mit Tonscherben",x:1530,boden:560,fuss:40,by:-54,zeichne:scherben,fund:"Auf einer Tonscherbe steht:"},
{name:"Papyrusstauden",x:130,boden:720,fuss:4,by:-150,zeichne:stauden,fund:"Zwischen den Stauden steckt:"}
]}
],
tuer:(n,bereit,def)=>{
const dx=((def&&def.tuerX)||500)-500;
let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="330" r="8" fill="#2a1a08"${S('#d8a73a',2)}/>`;
return`<defs><clipPath id="tuerclip"><polygon points="410,470 423,180 577,180 590,470"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#8a6534"/><stop offset=".5" stop-color="#a47a42"/><stop offset="1" stop-color="#7a5528"/></linearGradient><radialGradient id="dunkel" cy=".35"><stop offset="0" stop-color="#6a4a1c"/><stop offset="1" stop-color="#0a0603"/></radialGradient></defs>
    <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Tür mit Zahlenschloss">
     <polygon points="382,470 398,150 602,150 618,470" fill="#a27a44"${S('#5a3d1c',4)}/>
     <polygon points="410,470 423,180 577,180 590,470" fill="url(#dunkel)"/>
     <g clip-path="url(#tuerclip)"><g id="platte"><polygon points="410,470 423,180 577,180 590,470" fill="url(#platteG)"/><path d="M430 232H570M428 404H572"${S('#5a3d1c',3)}/><use href="#sym-auge" x="468" y="244" width="64" height="64" color="#2a1a08"/><rect x="${500-n*11-12}" y="312" width="${n*22+24}" height="36" rx="6" fill="#5a3f1e"${S('#d8a73a',2)}/>${d}</g></g>
     <rect x="368" y="112" width="264" height="44" fill="#c39555"${S('#5a3d1c',4)}/>
     <path d="M488 134Q448 116 404 126Q448 142 488 140ZM512 134Q552 116 596 126Q552 142 512 140Z" fill="#1f4f6a"/><circle cx="500" cy="134" r="13" fill="#e0ae3e"${S('#8a6420',2)}/>
    </g></g>`;
},
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fa8d3"/><stop offset=".75" stop-color="#f6d8a0"/></linearGradient><linearGradient id="py" x1="0" x2="1"><stop offset=".5" stop-color="#e6b96c"/><stop offset=".5" stop-color="#b9873f"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/><circle cx="740" cy="160" r="95" fill="#fff1b8" opacity=".35"/><circle cx="740" cy="160" r="58" fill="#fff1b8"/>
   <path d="M300 120l10 6 10-6M340 100l8 5 8-5M600 90l9 5 9-5"${S('#3a2a17',2.5)} fill="none"/>
   <polygon points="90,440 190,318 290,440" fill="url(#py)"/><polygon points="250,435 430,205 610,435" fill="url(#py)"/><polygon points="570,435 705,262 840,435" fill="url(#py)"/>
   <path d="M0 430Q250 392 500 430T1000 420V600H0Z" fill="#e8c27a"/><path d="M0 485Q300 445 600 492T1000 470V600H0Z" fill="#d9a95a"/>
   <path d="M0 0H1000V600H0Z M150 600L180 80H820L850 600Z" fill="#2a1a0c" fill-rule="evenodd"/><path d="M150 600L180 80H820L850 600"${S('#5a3d1c',8)} fill="none"/>${fries(14)}`
};
})();