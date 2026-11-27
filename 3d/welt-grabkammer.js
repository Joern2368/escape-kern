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
const palme=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0Q-8 -70 16 -130" stroke="#8a5a2a" stroke-width="13" fill="none" stroke-linecap="round"/>${[-170,-135,-95,-50,-10,25,155].map(a=>`<ellipse cx="44" cy="0" rx="46" ry="11" fill="#3f9a4a" transform="translate(16 -130) rotate(${a})"/>`).join('')}<circle cx="10" cy="-124" r="7" fill="#6b4a24"/><circle cx="22" cy="-122" r="7" fill="#6b4a24"/></g>`;
const kamel=()=>`${schatten(78,4)}<path d="M-46 -8V-62M-24 -8V-60M24 -8V-62M46 -8V-60" stroke="#a8783a" stroke-width="11" stroke-linecap="round"/><path d="M-62 -66Q-66 -112 -10 -114Q40 -116 62 -98Q70 -84 64 -66Q40 -52 0 -54Q-46 -52 -62 -66Z" fill="#c8985a"${S('#6b4a24',3)}/><path d="M-30 -104Q-24 -140 0 -142Q22 -140 26 -108Z" fill="#c8985a"${S('#6b4a24',3)}/><path d="M56 -96Q76 -130 82 -158Q108 -160 106 -140Q100 -130 92 -128L88 -100Z" fill="#c8985a"${S('#6b4a24',3)}/><circle cx="96" cy="-148" r="3" fill="#222"/><path d="M-62 -76Q-82 -66 -76 -44" stroke="#6b4a24" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="-28" y="-98" width="56" height="18" rx="6" fill="#c0392b"${S('#6a1a10',2)}/>`;
const zelt=()=>`${schatten(100,4)}<path d="M-96 0L0 -130L96 0Z" fill="#efe2c0"${S('#8a7a5a',3)}/><path d="M-30 0L0 -130L30 0Z" fill="#8a6420"${S('#5a3d1c',2)}/><path d="M0 -130V-150" stroke="#5a3d1c" stroke-width="4"/><path d="M0 -150L22 -144L0 -138Z" fill="#c0392b"/><path d="M-96 0L-120 6M96 0L120 6" stroke="#8a7a5a" stroke-width="3"/>`;
const grabspaten=()=>`${schatten(50,4)}<path d="M-50 2Q-20 -24 0 -22Q24 -24 50 2Z" fill="#e8c27a"${S('#b8965a',2)}/><g transform="rotate(-12 0 -10)"><path d="M0 -12V-140" stroke="#8a5a2a" stroke-width="9" stroke-linecap="round"/><path d="M-18 -140H18" stroke="#6b3f1f" stroke-width="9" stroke-linecap="round"/><path d="M-12 28H12L16 -12Q0 -24 -16 -12Z" fill="#9aa0a8"${S('#5a6068',3)}/></g>`;
const wasserfass=()=>`${schatten(44,4)}<path d="M-34 0Q-44 -50 -34 -104H34Q44 -50 34 0Z" fill="#8a5a2a"${S('#4a2a12',3)}/><path d="M-38 -24H38M-40 -52H40M-38 -80H38" stroke="#3a4a5a" stroke-width="5"/><ellipse cx="0" cy="-104" rx="34" ry="8" fill="#4a90c8"/><use href="#sym-wasser" x="-14" y="-72" width="28" height="22" color="#e8f4f8"/>`;
const grabplan=()=>`<path d="M0 50V230M-24 230H24"${S('#6b3f1f',8)} stroke-linecap="round"/><rect x="-74" y="-56" width="148" height="110" fill="#efe2c0"${S('#6b4a1c',4)}/><path d="M-56 -30H20M-56 -10H50M-56 10H0" stroke="#8a7a5a" stroke-width="4"/><path d="M26 -34L50 -22L38 -2Z" fill="#d8a73a"${S('#8a6420',2)}/><path d="M-50 36H-10" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/>`;
const hinweisstein=()=>`<path d="M0 60V220M-22 220H22"${S('#6b3f1f',8)} stroke-linecap="round"/><path d="M-60 60V-30Q-60 -62 0 -62Q60 -62 60 -30V60Z" fill="#c9b48a"${S('#6b5a3a',4)}/>${[['auge',-44,-40],['feder',2,-40],['ankh',-22,6]].map(([n,x,y])=>`<use href="#sym-${n}" x="${x}" y="${y}" width="34" height="34" color="#3a2510"/>`).join('')}`;
const zeichenblock=()=>`${schatten(56,4)}<rect x="-52" y="-72" width="104" height="72" fill="#d9ccb0"${S('#6b5a3a',3)}/><rect x="-52" y="-72" width="104" height="14" fill="#c9bc9c"/>${[['skarabaeus',-44],['sonne',-14],['wasser',16]].map(([n,x])=>`<use href="#sym-${n}" x="${x}" y="-52" width="28" height="28" color="#3a2510"/>`).join('')}`;
const fundkiste=()=>`${schatten(54,4)}<rect x="-48" y="-52" width="96" height="50" fill="#a87a44"${S('#4a2a12',3)}/><path d="M-48 -30H48" stroke="#4a2a12" stroke-width="2"/><path d="M-30 -52L-24 -70L-8 -56ZM10 -52L22 -66L34 -52Z" fill="#c9845a"${S('#6b2e14',2)}/><path d="M30 -68L58 -90" stroke="#8a5a2a" stroke-width="5" stroke-linecap="round"/><path d="M52 -92L64 -84L58 -76Z" fill="#c0392b"/>`;
const sonnenuhr=()=>`${schatten(46,4)}<ellipse cx="0" cy="-16" rx="46" ry="14" fill="#d9ccb0"${S('#6b5a3a',3)}/><ellipse cx="0" cy="-22" rx="36" ry="9" fill="#c9bc9c"/><path d="M0 -22L10 -62L18 -22Z" fill="#8a6420"${S('#5a3d1c',2)}/><path d="M-28 -22H-8M-20 -30L-8 -24" stroke="#6b5a3a" stroke-width="2"/>`;
const schlossPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08"${S('#d8a73a',2)}/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#5a3f1e"${S('#d8a73a',2)}/>`+d;};
const symOben=(s,y)=>`<use href="#sym-${s}" x="476" y="${y}" width="48" height="48" color="#2a1a08"/>`;
const TDEF=`<defs><clipPath id="tuerclip"><polygon points="410,470 423,180 577,180 590,470"/></clipPath><clipPath id="wandclip"><rect x="410" y="180" width="180" height="290"/></clipPath><clipPath id="faclip"><polygon points="296,484 704,484 704,566 296,566"/></clipPath><clipPath id="sgclip"><rect x="410" y="240" width="180" height="230"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#8a6534"/><stop offset=".5" stop-color="#a47a42"/><stop offset="1" stop-color="#7a5528"/></linearGradient><radialGradient id="dunkel" cy=".35"><stop offset="0" stop-color="#6a4a1c"/><stop offset="1" stop-color="#0a0603"/></radialGradient></defs>`;
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out}.tuer.offen #pla{transform:translateX(240px)}.tuer.offen #wl{transform:translateX(-100px)}.tuer.offen #wr{transform:translateX(100px)}.tuer.offen #fal{transform:translateX(320px)}.tuer.offen #gfl{transform:translateY(250px)}.tuer.offen #gfr{transform:translateY(250px)}.tuer.offen #dec{transform:translateY(-170px)}.tuer #strahl{opacity:0;transition:opacity 1.5s ease-in .8s}.tuer.offen #strahl{opacity:.45}</style>`;
function tuerPlatte(n){
return`<polygon points="382,470 398,150 602,150 618,470" fill="#a27a44"${S('#5a3d1c',4)}/><polygon points="410,470 423,180 577,180 590,470" fill="url(#dunkel)"/><circle cx="500" cy="400" r="80" fill="url(#licht)"/>
   <g clip-path="url(#tuerclip)"><g id="pla" class="tb"><polygon points="410,470 423,180 577,180 590,470" fill="url(#platteG)"/><path d="M430 232H570M428 404H572"${S('#5a3d1c',3)}/><use href="#sym-auge" x="468" y="244" width="64" height="64" color="#2a1a08"/>${schlossPl(n,330)}</g></g>
   <rect x="368" y="112" width="264" height="44" fill="#c39555"${S('#5a3d1c',4)}/><path d="M488 134Q448 116 404 126Q448 142 488 140ZM512 134Q552 116 596 126Q552 142 512 140Z" fill="#1f4f6a"/><circle cx="500" cy="134" r="13" fill="#e0ae3e"${S('#8a6420',2)}/>`;
}
function tuerWand(n){
const blk=x=>`<path d="M${x} 240H${x+90}M${x} 300H${x+90}M${x} 360H${x+90}M${x} 420H${x+90}"${S('#5a3d1c',2)}/>`;
return`<rect x="410" y="180" width="180" height="290" fill="#1a0f06"/><circle cx="500" cy="380" r="90" fill="url(#licht)"/>
   <g clip-path="url(#wandclip)"><g id="wl" class="tb"><rect x="410" y="180" width="90" height="290" fill="#c9a066"${S('#5a3d1c',3)}/>${blk(410)}<use href="#sym-ankh" x="438" y="194" width="34" height="34" color="#1f4f6a"/><use href="#sym-vogel" x="438" y="312" width="34" height="34" color="#a33b22"/><use href="#sym-wasser" x="438" y="432" width="34" height="30" color="#1f4f6a"/></g><g id="wr" class="tb"><rect x="500" y="180" width="90" height="290" fill="#c9a066"${S('#5a3d1c',3)}/>${blk(500)}<use href="#sym-feder" x="528" y="194" width="34" height="34" color="#3f7a4a"/><use href="#sym-skarabaeus" x="528" y="312" width="34" height="34" color="#1f4f6a"/><use href="#sym-sonne" x="528" y="432" width="34" height="30" color="#a33b22"/></g></g>
   <rect x="372" y="118" width="256" height="58" fill="#c39555"${S('#5a3d1c',4)}/>${symOben('sonne',60)}${schlossPl(n,147)}`;
}
function tuerFall(n){
return`<polygon points="296,484 704,484 748,570 252,570" fill="#6f6a5a"${S('#2c2a20',4)}/><polygon points="332,490 668,490 706,562 294,562" fill="#0a0604"/><path d="M352 512H648L660 526H340ZM344 536H656L668 550H332Z" fill="#3a3224"/><path d="M350 512H650M342 536H658M336 560H664" stroke="#6a5a3a" stroke-width="3"/><circle cx="500" cy="528" r="90" fill="url(#licht)"/>
   <g clip-path="url(#faclip)"><g id="fal" class="tb"><polygon points="332,490 668,490 706,562 294,562" fill="url(#platteG)"${S('#5a3d1c',3)}/><path d="M360 498L336 556M640 498L664 556M500 492V560"${S('#5a3d1c',2)}/><use href="#sym-auge" x="378" y="504" width="40" height="40" color="#2a1a08"/>${schlossPl(n,528)}</g></g>`;
}
function tuerSonne(n){
let st='';for(let k=0;k<12;k++){const a=k*Math.PI/6;st+=`M${(500+Math.cos(a)*40).toFixed(0)} ${(160+Math.sin(a)*40).toFixed(0)}L${(500+Math.cos(a)*54).toFixed(0)} ${(160+Math.sin(a)*54).toFixed(0)}`;}
const wing=(x,id)=>`<g id="${id}" class="tb"><rect x="${x}" y="240" width="90" height="230" fill="#a89070"${S('#5a4a30',3)}/><path d="M${x+22} 252V470M${x+45} 252V470M${x+68} 252V470"${S('#7a6a4a',3)}/><path d="M${x} 330H${x+90}M${x} 400H${x+90}"${S('#5a4a30',3)}/></g>`;
return`<path d="M366 470V150Q366 110 406 110H594Q634 110 634 150V470Z" fill="#c9a066"${S('#5a3d1c',4)}/><rect x="410" y="240" width="180" height="230" fill="#2a1c0a"/><circle cx="500" cy="380" r="90" fill="url(#licht)"/>
   <circle cx="500" cy="160" r="34" fill="#e8c45a"${S('#8a6420',4)}/><path d="${st}"${S('#d8a73a',4)} stroke-linecap="round"/><circle cx="500" cy="160" r="14" fill="#c0392b"/>
   <g clip-path="url(#sgclip)">${wing(410,'gfl')}${wing(500,'gfr')}</g>${schlossPl(n,216)}`;
}
function tuerDecke(n){
return`<rect x="380" y="14" width="240" height="154" fill="#5a4a30"${S('#2a1c0a',4)}/><rect x="396" y="28" width="208" height="126" fill="#8ccaf0"/><circle cx="560" cy="66" r="20" fill="#fff1b8"/><path d="M420 120q16-14 34 0q18-12 34 2" fill="#fff" opacity=".9"/>
   <polygon id="strahl" points="396,154 604,154 720,470 280,470" fill="#fff3b0"/>
   <g id="dec" class="tb"><path d="M420 28V-120M580 28V-120"${S('#a88a5a',6)}/><rect x="396" y="28" width="208" height="126" fill="url(#platteG)"${S('#5a3d1c',4)}/><path d="M448 28V154M500 28V154M552 28V154"${S('#5a3d1c',2)}/>${symOben('sonne',34)}${schlossPl(n,128)}</g>`;
}
function tuerGrab(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'platte';
const arten={platte:[tuerPlatte,'Steinplatte mit Zahlenschloss'],wand:[tuerWand,'Geheimwand mit Zahlenschloss'],fall:[tuerFall,'Falltür mit Zahlenschloss'],sonne:[tuerSonne,'Sonnentor mit Zahlenschloss'],decke:[tuerDecke,'Deckenplatte mit Zahlenschloss']};
const a=arten[art]||arten.platte;
return`${TDEF}${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.grabkammer={
name:"Ägyptische Grabkammer",
symbole:["ankh","auge","skarabaeus","feder","sonne"],
symbolNamen:["Ankh","Auge des Horus","Skarabäus","Feder der Maat","Sonnenscheibe"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><polygon points="8,86 60,8 112,86" fill="#d8a73a"${S('#8a6420',3)}/><path d="M34 47H86M21 66H99"${S('#8a6420',2)}/><use href="#sym-auge" x="42" y="40" width="36" height="36" color="#1f4f6a"/></svg>`,
texte:{
einleitung:"Ihr seid ein Team von Forscherinnen und Forschern im Tal der Könige. Vor euch liegt der Eingang zu einem uralten Grab, versperrt von einer schweren Steinplatte! Wer die Rätsel löst, kommt hinein und auch wieder heraus. Jeder Durchgang hat ein uraltes Zahlenschloss. Untersucht die Gegenstände in den Räumen: Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findet ihr den Weg durch das Grab zurück ans Tageslicht?",
startKnopf:"Ins Tal der Könige",
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
einleitung:"Du bist Forscherin oder Forscher im Tal der Könige. Vor dir liegt der Eingang zu einem uralten Grab, versperrt von einer schweren Steinplatte! Wer die Rätsel löst, kommt hinein und auch wieder heraus. Jeder Durchgang hat ein uraltes Zahlenschloss. Untersuche die Gegenstände in den Räumen: Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findest du den Weg durch das Grab zurück ans Tageslicht?",
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
einleitung:"Ihr seid in Ägypten und besucht ein sehr altes Grab. Hier liegt ein Pharao. So hießen die Könige im alten Ägypten. Vor dem Grab liegt eine schwere Steinplatte. Sie versperrt den Eingang! An jedem Weg hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
hinweisGeber:"Der kleine Käfer flüstert:",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
texteDu:{
einleitung:"Du bist in Ägypten und besuchst ein sehr altes Grab. Hier liegt ein Pharao. So hießen die Könige im alten Ägypten. Vor dem Grab liegt eine schwere Steinplatte. Sie versperrt den Eingang! An jedem Weg hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Die Wüste",intro:"Ihr seid in der Wüste. Die Sonne ist heiß. Vor euch ist der Eingang zum Grab. Ein großer Stein versperrt ihn. Hier sind die Zahlen für das Schloss versteckt.",introDu:"Du bist in der Wüste. Die Sonne ist heiß. Vor dir ist der Eingang zum Grab. Ein großer Stein versperrt ihn. Hier sind die Zahlen für das Schloss versteckt.",
objekte:[
{name:"Kamel Karim",fund:"Im Sattel steckt:"},
{name:"Zelt der Forscher",fund:"Unter dem Zelt liegt:"},
{name:"Spaten",fund:"Im Sand steckt:"},
{name:"Fass mit Wasser",fund:"Auf dem Deckel klebt:"},
{name:"Plan an der Stange",fund:"Hinter dem Plan steckt:"}
],
infoObjekte:[{name:"Tafel aus Stein",fund:"In einer Ritze steckt:"},{name:"Stein mit Zeichen",fund:"Auf dem Stein liegt:"},{name:"Kiste vom Forscher",fund:"Zwischen den Scherben liegt:"}]},
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
intro:"Das ist die Schatzkammer! Überall liegt Gold. Löst die Aufgaben, dann geht die Platte im Boden auf.",
introDu:"Das ist die Schatzkammer! Überall liegt Gold. Löse die Aufgaben, dann geht die Platte im Boden auf.",
objekte:[
{name:"Goldener Stuhl",fund:"Unter dem Stuhl klebt:"},
{name:"Haufen Gold",fund:"Zwischen dem Gold liegt:"},
{name:"Hundefigur",fund:"In der Kiste unter dem Hund liegt:"},
{name:"Schmuckkiste",fund:"Unter den Ketten liegt:"},
{name:"Kleines Boot",fund:"Im Boot liegt:"}
],
infoObjekte:[{name:"Liste an der Wand",fund:"Unter der Liste steht:"},{name:"Waage",fund:"In der Waage liegt:"},{name:"Schreibtisch",fund:"Auf dem Tisch liegt ein Blatt:"}]},
{titel:"Der Tempel",
intro:"Ihr seid in einem Tempel. Zwei riesige Figuren aus Stein stehen an der Wand. Von oben fällt Licht herein. Das große Tor mit der Sonne ist zu.",
introDu:"Du bist in einem Tempel. Zwei riesige Figuren aus Stein stehen an der Wand. Von oben fällt Licht herein. Das große Tor mit der Sonne ist zu.",
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
{titel:"Die Wüste vor dem Grab",
intro:"Ihr steht in der Wüste vor dem Eingang zum Grab. Die Sonne brennt, Sand weht über die Dünen, und am Horizont ragen Pyramiden auf. Eine schwere Steinplatte versperrt den Eingang. Irgendwo hier sind die Ziffern für ihr Schloss versteckt …",
introDu:"Du stehst in der Wüste vor dem Eingang zum Grab. Die Sonne brennt, Sand weht über die Dünen, und am Horizont ragen Pyramiden auf. Eine schwere Steinplatte versperrt den Eingang. Irgendwo hier sind die Ziffern für ihr Schloss versteckt …",
tuerX:800,tuerArt:"platte",
hintergrund:()=>`${defs('#e8c27a','#a8783a')}<defs><linearGradient id="wh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5fa8d3"/><stop offset=".8" stop-color="#f6e0b0"/></linearGradient><linearGradient id="py2" x1="0" x2="1"><stop offset=".5" stop-color="#e6b96c"/><stop offset=".5" stop-color="#b9873f"/></linearGradient></defs><rect width="1600" height="470" fill="url(#wh)"/><circle cx="1250" cy="150" r="95" fill="#fff1b8" opacity=".35"/><circle cx="1250" cy="150" r="58" fill="#fff1b8"/><path d="M300 120l10 6 10-6M360 100l8 5 8-5M900 90l9 5 9-5"${S('#3a2a17',2.5)} fill="none"/><polygon points="130,440 290,250 450,440" fill="url(#py2)"/><polygon points="1100,438 1300,200 1500,438" fill="url(#py2)"/><path d="M0 440Q250 392 500 430T1000 420T1600 430V470H0Z" fill="#e8c27a"/><path d="M520 470Q530 190 800 120Q1070 190 1080 470Z" fill="#c9985a"${S('#8a5a2a',6)}/><path d="M600 300H1000M580 380H1020M640 220H960"${S('#a8783a',4)}/><polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="M0 520Q300 500 600 520T1200 520T1600 516M0 620Q300 600 600 620T1200 620T1600 616M0 720Q300 700 600 720T1200 720T1600 716" stroke="rgba(150,100,40,.35)" stroke-width="4" fill="none"/>${palme(120,460,1.3)}${palme(1500,462,1.1)}`,
objekte:[
{name:"Kamel Karim",x:1250,boden:640,fuss:4,by:-165,zeichne:kamel,fund:"Im Sattel von Karim steckt:"},
{name:"Forscherzelt",x:300,boden:600,fuss:4,by:-150,zeichne:zelt,fund:"Unter dem Zeltdach liegt:"},
{name:"Spaten im Sand",x:1000,boden:720,fuss:4,by:-165,zeichne:grabspaten,fund:"Im Sand am Spaten steckt:"},
{name:"Wasserfass",x:560,boden:700,fuss:4,by:-115,zeichne:wasserfass,fund:"Auf dem Fassdeckel klebt:"},
{name:"Grabungsplan",x:1450,y:250,wand:true,by:-75,zeichne:grabplan,fund:"Hinter dem Grabungsplan steckt:"}
],
infoObjekte:[
{name:"Hinweistafel aus Stein",x:150,y:270,wand:true,by:-85,zeichne:hinweisstein,fund:"In einer Ritze der Tafel steckt:"},
{name:"Block mit Zeichen",x:130,boden:740,fuss:4,by:-85,zeichne:zeichenblock,fund:"Auf dem Block liegt:"},
{name:"Kiste mit Fundstücken",x:1500,boden:560,fuss:4,by:-95,zeichne:fundkiste,fund:"Zwischen den Scherben liegt:"}
]},
{titel:"Die Grabkammer",
intro:"Ihr steht in der Grabkammer des Pharaos. Ein goldener Sarkophag ruht auf einem Podest, an der Decke funkeln Sterne. Die bemalte Hieroglyphenwand ist in Wahrheit eine Geheimtür. Findet die Ziffern für ihr Schloss!",
introDu:"Du stehst in der Grabkammer des Pharaos. Ein goldener Sarkophag ruht auf einem Podest, an der Decke funkeln Sterne. Die bemalte Hieroglyphenwand ist in Wahrheit eine Geheimtür. Finde die Ziffern für ihr Schloss!",
tuerX:1350,tuerArt:"wand",
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
intro:"Ihr habt die Schatzkammer gefunden! Überall glänzt Gold im Licht. Doch die schwere Steinplatte im Boden ist verschlossen – nur wer die Rätsel löst, kommt weiter.",
introDu:"Du hast die Schatzkammer gefunden! Überall glänzt Gold im Licht. Doch die schwere Steinplatte im Boden ist verschlossen – nur wenn du die Rätsel löst, kommst du weiter.",
tuerX:220,tuerArt:"fall",
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
intro:"Ihr betretet einen Tempel. Zwei riesige Steinfiguren bewachen den Raum, durch eine Öffnung in der Decke fällt ein Lichtstrahl. Hier ehrten die Ägypter ihre Götter. Das große Sonnentor ist verschlossen.",
introDu:"Du betrittst einen Tempel. Zwei riesige Steinfiguren bewachen den Raum, durch eine Öffnung in der Decke fällt ein Lichtstrahl. Hier ehrten die Ägypter ihre Götter. Das große Sonnentor ist verschlossen.",
tuerX:800,tuerArt:"sonne",
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
intro:"Tief unter dem Grab liegt ein alter Brunnenschacht. Wasser tropft von den Wänden, Seile hängen von oben herab. Über die Treppe geht es hinaus ans Licht – wenn ihr das Schloss der Deckenplatte öffnet.",
introDu:"Tief unter dem Grab liegt ein alter Brunnenschacht. Wasser tropft von den Wänden, Seile hängen von oben herab. Über die Treppe geht es hinaus ans Licht – wenn du das Schloss der Deckenplatte öffnest.",
tuerX:300,tuerArt:"decke",
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
tuer:tuerGrab,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a8ad0"/><stop offset=".5" stop-color="#f4a98a"/><stop offset="1" stop-color="#ffe3a8"/></linearGradient><linearGradient id="py" x1="0" x2="1"><stop offset=".5" stop-color="#e6b96c"/><stop offset=".5" stop-color="#b9873f"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/><circle cx="700" cy="330" r="110" fill="#fff1b8" opacity=".35"/><circle cx="700" cy="330" r="62" fill="#fff1b8"/>
   <path d="M300 120l10 6 10-6M340 100l8 5 8-5M600 90l9 5 9-5"${S('#3a2a17',2.5)} fill="none"/>
   <polygon points="90,440 190,318 290,440" fill="url(#py)"/><polygon points="250,435 430,205 610,435" fill="url(#py)"/><polygon points="570,435 705,262 840,435" fill="url(#py)"/>
   <path d="M0 430Q250 392 500 430T1000 420V600H0Z" fill="#e8c27a"/><path d="M0 485Q300 445 600 492T1000 470V600H0Z" fill="#d9a95a"/><ellipse cx="300" cy="530" rx="120" ry="24" fill="#4aa0d0"/><path d="M200 530q20-6 40 0t40 0" stroke="#bfe8f8" stroke-width="3" fill="none"/>${palme(220,525,.8)}${palme(380,530,.7)}<g transform="translate(760 540) scale(.7)">${kamel()}</g>
   <path d="M0 0H1000V600H0Z M150 600L180 80H820L850 600Z" fill="#2a1a0c" fill-rule="evenodd"/><path d="M150 600L180 80H820L850 600"${S('#5a3d1c',8)} fill="none"/>${fries(14)}`
};
})();
;
/* Bausteine zum Zeichnen in 3D: von der Raumansicht und von den Raum-Dateien benutzt (global) */
const V = (x,y,z) => new THREE.Vector3(x,y,z);
/* ---------- Bausteine ---------- */
const MAT = {};
const mat = (c,opt) => { const k=c+JSON.stringify(opt||''); return MAT[k] || (MAT[k]=new THREE.MeshLambertMaterial(Object.assign({color:c},opt||{}))); };
const basis = (c,opt) => new THREE.MeshBasicMaterial(Object.assign({color:c},opt||{}));
const GEO = { box:new THREE.BoxGeometry(1,1,1), sph:new THREE.SphereGeometry(1,16,12), cyl:new THREE.CylinderGeometry(1,1,1,18), cone:new THREE.ConeGeometry(1,1,16) };
function teil(par,geo,m,x,y,z,sx,sy,sz){ const t=new THREE.Mesh(geo,typeof m==='number'?mat(m):m); t.position.set(x,y,z); t.scale.set(sx,sy,sz); t.castShadow=true; t.receiveShadow=true; par.add(t); return t; }
const box = (p,w,h,d,c,x,y,z) => teil(p,GEO.box,c,x,y,z,w,h,d);
const ball = (p,r,c,x,y,z,sx,sy,sz) => teil(p,GEO.sph,c,x,y,z,r*(sx||1),r*(sy||1),r*(sz||1));
const walze = (p,r,h,c,x,y,z) => teil(p,GEO.cyl,c,x,y,z,r,h,r);
const kegel = (p,r,h,c,x,y,z) => teil(p,GEO.cone,c,x,y,z,r,h,r);
function rohr(p,r1,r2,h,c,x,y,z,seg,offen){ const t=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,seg||18,1,!!offen),typeof c==='number'?mat(c,offen?{side:THREE.DoubleSide}:null):c); t.position.set(x,y,z); t.castShadow=true; t.receiveShadow=true; p.add(t); return t; }
function ring(p,r,d,c,x,y,z,bogen){ const t=new THREE.Mesh(new THREE.TorusGeometry(r,d,8,28,bogen||Math.PI*2),typeof c==='number'?mat(c):c); t.position.set(x,y,z); t.castShadow=true; p.add(t); return t; }
function strich(p,a,b,r,c){ const A=V(a[0],a[1],a[2]), B=V(b[0],b[1],b[2]), d=B.clone().sub(A), l=d.length(); const t=walze(p,r,l,c,0,0,0); t.position.copy(A).addScaledVector(d,.5); t.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); return t; }
const gruppe = (p,x,y,z) => { const g=new THREE.Group(); g.position.set(x,y,z); p.add(g); return g; };
/* Feste Teile einer Gruppe je Farbe zu einem Körper zusammenfassen (weniger Zeichenaufrufe) */
function verschmelze(g){
  g.updateMatrixWorld(true);
  const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(), toepfe=new Map(), weg=[];
  g.traverse(m=>{ if(!m.isMesh || m.isInstancedMesh || !m.material.visible || m.material.transparent || m.material.map) return;
    for(let p=m; p && p!==g; p=p.parent) if(p.userData && p.userData.lebendig) return; /* bewegte Tiere bleiben einzeln */
    if(!toepfe.has(m.material)) toepfe.set(m.material,[]); toepfe.get(m.material).push(m); weg.push(m); });
  toepfe.forEach((liste,material)=>{
    const P=[], N=[]; let schatten=false;
    liste.forEach(m=>{ const q=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone(); q.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));
      const p=q.attributes.position.array, n=q.attributes.normal.array; for(let i=0;i<p.length;i++){ P.push(p[i]); N.push(n[i]); }
      q.computeBoundingSphere(); if(m.castShadow && q.boundingSphere.radius>.25) schatten=true; q.dispose(); });
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));
    const neu=new THREE.Mesh(geo,material); neu.castShadow=schatten; neu.receiveShadow=true; g.add(neu);
  });
  weg.forEach(m=>m.parent.remove(m));
}
let saat=7; const zufall = () => { saat=(saat*16807)%2147483647; return (saat-1)/2147483646; };
function bild(w,h,mal){ const c=document.createElement('canvas'); c.width=w; c.height=h; mal(c.getContext('2d'),w,h); const t=new THREE.CanvasTexture(c); t.anisotropy=4; return t; }
function leuchtBild(innen){ return bild(128,128,(g)=>{ const v=g.createRadialGradient(64,64,0,64,64,64); v.addColorStop(0,innen); v.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=v; g.fillRect(0,0,128,128); }); }
function schein(p,farbe,x,y,z,gr){ const s=new THREE.Sprite(new THREE.SpriteMaterial({map:leuchtBild(farbe),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); s.position.set(x,y,z); s.scale.set(gr,gr,1); p.add(s); return s; }

/* ---------- Schilder, Sterne und Ziffern über Gegenständen ---------- */
function textSprite(text){
  const c=document.createElement('canvas'), g=c.getContext('2d'); g.font='700 40px Andika, Arial, sans-serif';
  c.width=Math.ceil(g.measureText(text).width)+48; c.height=68;
  g.font='700 40px Andika, Arial, sans-serif'; g.fillStyle='rgba(245,230,190,.96)'; g.strokeStyle='#8a6420'; g.lineWidth=5;
  g.beginPath(); const r=16, w=c.width-6, h=c.height-6; g.moveTo(3+r,3); g.arcTo(3+w,3,3+w,3+h,r); g.arcTo(3+w,3+h,3,3+h,r); g.arcTo(3,3+h,3,3,r); g.arcTo(3,3,3+w,3,r); g.fill(); g.stroke();
  g.fillStyle='#2a1a08'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(text,c.width/2,c.height/2+1);
  const t=new THREE.CanvasTexture(c); t.minFilter=THREE.LinearFilter;
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,depthTest:false,transparent:true})); s.scale.set(c.width/c.height*.5,.5,1); s.renderOrder=20; return s;
}

/* Schlussbilder: je Szenario eine Funktion (k, kamera, figur) -> Bildschleife (t, dt) */
const FINALE3D = {};

/* Räume: je Szenario trägt sich jede Raum-Datei in RAEUME3D.<kennwort>[n] ein */
const RAEUME3D = {};

/* ---------- bewegte Tiere (nicht fest, man kann sie nicht anfassen) ---------- */
function laeufer(k,o,punkte,tempo,start,huepf){
  const P=punkte.map(p=>V(p[0],0,p[1])), L=P.map((p,i)=>p.distanceTo(P[(i+1)%P.length])), ges=L.reduce((a,b)=>a+b,0);
  k.anim.push(t=>{ let s=(t*tempo+start)%ges, i=0; while(s>L[i]){ s-=L[i]; i++; } const a=P[i], b=P[(i+1)%P.length];
    o.position.lerpVectors(a,b,s/L[i]); o.position.y=Math.abs(Math.sin(t*huepf+start))*.03; o.rotation.y=Math.atan2(-(b.z-a.z),b.x-a.x); });
}
function katze(k,weg,tempo){
  const g=gruppe(k.scene,0,0,0), F=0xe08a30, D=0xa85a18, rumpf=gruppe(g,0,0,0);
  ball(rumpf,.36,F,0,.55,0,1.5,.9,.85); [-.28,0,.28].forEach(x=>ball(rumpf,.3,D,x-.05,.62,0,.16,.96,.96)); ball(rumpf,.2,0xf6ead8,.32,.46,0,1,1,1.1);
  ball(rumpf,.27,F,.62,.86,0); ball(rumpf,.13,0xf6ead8,.84,.8,0,.8,.7,1.2); ball(rumpf,.035,0xe0707a,.93,.85,0);
  [-1,1].forEach(s=>{ kegel(rumpf,.1,.2,F,.6,1.13,s*.15); ball(rumpf,.05,0x6fe05a,.85,.94,s*.11,.6,1.1,.8); ball(rumpf,.022,0x101008,.89,.94,s*.11,.5,1.3,.5);
    [-.04,.03].forEach(h=>strich(rumpf,[.9,.8,s*.07],[.92,.8+h,s*.38],.006,0xffffff)); });
  const schwanz=gruppe(rumpf,-.5,.62,0); strich(schwanz,[0,0,0],[-.32,.22,0],.08,F); strich(schwanz,[-.32,.22,0],[-.36,.6,0],.07,F); ball(schwanz,.09,D,-.36,.62,0);
  const beine=[[.32,.17],[.32,-.17],[-.3,.17],[-.3,-.17]].map(p=>{ const b=gruppe(g,p[0],.45,p[1]); walze(b,.075,.42,F,0,-.21,0); ball(b,.09,0xf6ead8,.03,-.41,0,1.2,.6,1); return b; });
  verschmelze(rumpf);
  k.anim.push(t=>{ beine.forEach((b,i)=>b.rotation.z=Math.sin(t*6+(i%3?3.14:0))*.45); });
  laeufer(k,g,weg,tempo||1.6,0,6);
}
function maeuschen(k,punkte,tempo,start){
  const m=gruppe(k.scene,0,0,0); ball(m,.17,0x9a928c,0,.14,0,1.5,.9,.95); ball(m,.11,0xa8a09a,.27,.18,0); [-1,1].forEach(s=>{ ball(m,.065,0xe8a8a8,.27,.31,s*.08,.5,1,1); ball(m,.022,0x14100e,.36,.2,s*.055); }); ball(m,.025,0xe8808a,.39,.16,0); strich(m,[-.22,.12,0],[-.55,.05,.12],.018,0xd89a9a);
  verschmelze(m); laeufer(k,m,punkte,tempo,start,14);
}
/* flackerndes Punktlicht (höchstens 6 je Raum, wegen der Bildrate) */
function flacker(k,x,y,z,farbe,staerke,weit){ const l=new THREE.PointLight(farbe,staerke,weit,1.5); l.position.set(x,y,z); k.scene.add(l); k.anim.push(t=>{ l.intensity=staerke*(1+Math.sin(t*11+x)*.08+Math.sin(t*6.1+z)*.06); }); }
/* Ausgang des Raums. opt: steh [x,z] (Platz davor), durch [x,z] (wohin die Figur beim Öffnen läuft), tief (true: Figur steigt nach unten), hoch (Zahl: Figur steigt bis zu dieser Höhe nach oben),
   rutsch [[x,y,z],...] (Figur rutscht ab durch sitzend an diesen Punkten entlang, y darf unter 0 gehen), rutschDauer (Sekunden, Standard 1.5),
   losNach (Sekunden, bis die Figur nach dem Öffnen losläuft, Standard 1.1; z. B. bis eine Brücke gebaut ist), warte (zusätzliche Sekunden vor dem Abblenden, Standard 0),
   blick {pitch,zoom,hoehe} (Kamera beim offenen Ausgang; hoehe: Blickpunkt steigt mit der Figur),
   treffer {x,y,z,b,h,t} (Tippfläche), name (Schild), schildOben [x,y,z], glanz [x,y,z], bewege(auf) (auf läuft von 0 bis 1) */
function ausgang(k,opt){
  const sc=k.scene, a=opt.treffer;
  const treffer=new THREE.Mesh(GEO.box,basis(0,{visible:false})); treffer.scale.set(a.b,a.h,a.t); treffer.position.set(a.x,a.y,a.z); sc.add(treffer);
  /* Bis Klasse 6 (einfache Sprache) darf der Ausgang einen leichteren Namen haben */
  const leicht=typeof CONFIG!=='undefined' && (typeof CONFIG.einfacheSprache==='boolean' ? CONFIG.einfacheSprache : parseInt(CONFIG.klasse,10)<=6);
  const schild=textSprite(leicht && opt.einfach ? opt.einfach : opt.name); schild.position.set(opt.schildOben[0],opt.schildOben[1],opt.schildOben[2]); schild.visible=false; sc.add(schild);
  const tuer={ steh:opt.steh, durch:opt.durch, tief:!!opt.tief, hoch:opt.hoch||0, rutsch:opt.rutsch||null, rutschDauer:opt.rutschDauer||1.5, losNach:opt.losNach||1.1, warte:opt.warte||0, blick:opt.blick||null, treffer, schild, bereit:false, offen:false };
  const g=schein(sc,'rgba(255,225,120,.9)',opt.glanz[0],opt.glanz[1],opt.glanz[2],2.2); g.visible=false;
  let auf=0;
  k.anim.push((t,dt)=>{ g.visible=tuer.bereit; if(tuer.bereit){ const s=1.8+Math.sin(t*5)*.5; g.scale.set(s,s,1); } auf+=((tuer.offen?1:0)-auf)*Math.min(1,dt*2.5); opt.bewege(auf,t); });
  return tuer;
}

/* ===================================================================
   GRABKAMMER in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei grabkammer-raum<n>.js, die sich in RAEUME3D.grabkammer[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.grabkammer = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen */
const NEU=[
  [['Fernglas auf Stativ','Durch das Fernglas siehst du:','Fernglas auf drei Beinen','Im Fernglas siehst du:'],['Handkarren','Im Handkarren liegt:','Karren','Im Karren liegt:']],
  [['Öllampe auf Ständer','Unter der Öllampe liegt:','Lampe auf Ständer','Unter der Lampe liegt:'],['Bett mit Löwenfüßen','Unter dem Kissen liegt:','Bett mit Löwenfüßen','Unter dem Kissen liegt:']],
  [['Goldener Spiegel','Im Spiegel erscheint:','Goldener Spiegel','Im Spiegel siehst du:'],['Federfächer','Zwischen den Federn steckt:','Fächer aus Federn','In den Federn steckt:']],
  [['Vase mit Lotusblumen','Zwischen den Blüten steckt:','Vase mit Blumen','Bei den Blumen steckt:'],['Große Trommel','Auf der Trommel liegt:','Große Trommel','Auf der Trommel liegt:']],
  [['Wasserrad','An einer Schaufel des Wasserrads klebt:','Rad im Wasser','Am Rad klebt:'],['Schildkröte aus Stein','Unter der Schildkröte liegt:','Schildkröte aus Stein','Unter der Schildkröte liegt:']]
];
const SZG=SZENARIEN.grabkammer;
/* Einfache Einleitungen: den Ausgang nennen */
if(SZG.einfach) [[0,'Der große Stein ist die Steintür.'],[1,'Der Ausgang ist die goldene Tür mit den Zeichen.'],[4,'Der Ausgang ist oben an der Treppe.']].forEach(([i,satz])=>{ const r=SZG.einfach.raeume[i]; if(r) ['intro','introDu'].forEach(k=>{ if(r[k] && r[k].indexOf(satz)<0) r[k]=r[k]+' '+satz; }); });
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZG.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZG.einfach) SZG.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const GRAB = (function(){
const SAND=0xe2c58a, SAND2=0xc9a266, SAND3=0x9c7a48, STEIN=0xb49466, DUNKEL=0x4a3418, HOLZ=0x9a6a38, HOLZ2=0x6b421e, GOLD=0xe8b830, GOLD2=0xb88a1e,
  TUERKIS=0x1fa8a0, BLAU=0x1f4f9a, ROT=0xc0442c, GRUEN=0x3f8a3c, WEISS=0xf4ecd8, SCHWARZ=0x1c160e;

/* Boden-Bild: Grundfarbe mit Sprenkeln (kachelbar). grund = [r,g,b] */
function sandBild(grund,streu){
  const G=grund||[216,184,124], s=streu||20;
  return bild(512,512,(g)=>{ g.fillStyle='rgb('+G.join(',')+')'; g.fillRect(0,0,512,512);
    for(let i=0;i<1100;i++){ const h=Math.floor(zufall()*2*s)-s, x=zufall()*512, y=zufall()*512, r=2+zufall()*7; g.fillStyle='rgba('+(G[0]+h)+','+(G[1]+h)+','+(G[2]+h)+',.75)';
      [-512,0,512].forEach(dx=>[-512,0,512].forEach(dy=>{ g.beginPath(); g.ellipse(x+dx,y+dy,r,r*.55,i,0,7); g.fill(); })); } });
}
/* Quader aus Sandstein: für Wände (reihen 8) und Steinböden (reihen 4). grund = [r,g,b], fuge = CSS-Farbe */
function quaderBild(grund,fuge,reihen){
  const G=grund||[190,150,96], n=reihen||6, h=512/n;
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#5a4220'; g.fillRect(0,0,512,512);
    for(let r=0;r<n;r++){ let x=(r%2)*-64; while(x<512){ const w=128, v=Math.floor(zufall()*24)-12;
      const mal=xx=>{ g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(xx+2,r*h+2,w-4,h-4);
        g.fillStyle='rgba(255,245,210,.13)'; g.fillRect(xx+2,r*h+2,w-4,5); g.fillStyle='rgba(60,35,10,.16)'; g.fillRect(xx+2,r*h+h-9,w-4,7);
        for(let k=0;k<14;k++){ g.fillStyle=k%2?'rgba(80,50,20,.18)':'rgba(255,240,200,.14)'; g.fillRect(xx+8+((k*37)%(w-18)),r*h+8+((k*23)%Math.max(8,h-18)),5,3); } };
      mal(x); if(x<0) mal(x+512); x+=w; } } });
}
/* Ein Bildzeichen im alten Stil auf eine Zeichenfläche malen (Mitte x,y; Größe s). art 0 bis 7: Vogel, Wasser, Sonne, Auge, Schilf, Käfer, Fisch, Haus */
function zeichen(g,art,x,y,s,farbe){
  g.save(); g.translate(x,y); g.scale(s/40,s/40); g.fillStyle=g.strokeStyle=farbe||'#5a3018'; g.lineWidth=4; g.lineCap='round'; g.lineJoin='round';
  const linie=P=>{ g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); };
  const oval=(a,b,c,d)=>{ g.beginPath(); g.ellipse(a,b,c,d,0,0,7); g.fill(); };
  switch(art%8){
    case 0: oval(-2,2,12,8); oval(9,-9,6,6); linie([[14,-9],[19,-7]]); linie([[-13,3],[-19,10]]); linie([[-4,9],[-4,18],[2,18]]); break;
    case 1: [-9,2,13].forEach(v=>linie([[-17,v],[-9,v-6],[-1,v],[7,v-6],[15,v]])); break;
    case 2: g.beginPath(); g.arc(0,0,13,0,7); g.stroke(); oval(0,0,4,4); break;
    case 3: g.beginPath(); g.moveTo(-18,0); g.quadraticCurveTo(0,-15,18,0); g.quadraticCurveTo(0,12,-18,0); g.stroke(); oval(0,-1,5,5); break;
    case 4: [[-9,-8],[0,0],[9,-5]].forEach(([a,b])=>{ linie([[a,18],[a,b-4]]); oval(a,b-9,3.5,8); }); break;
    case 5: oval(0,3,9,12); oval(0,-12,6,4); [-1,1].forEach(v=>[-4,4,12].forEach(w=>linie([[v*8,w],[v*17,w+4]]))); break;
    case 6: oval(-2,0,13,7); g.beginPath(); g.moveTo(10,0); g.lineTo(20,-9); g.lineTo(20,9); g.fill(); break;
    default: g.strokeRect(-14,-10,28,24); linie([[-18,-10],[18,-10]]); g.fillRect(-4,2,8,12);
  }
  g.restore();
}
/* Streifen mit Zeichen in Spalten (heller Putz, farbige Bänder): als Bild auf eine Fläche legen */
function zeichenBild(w,h,spalten,zeilen){
  const F=['#5a3018','#1f4f9a','#a83820','#1f7a60'];
  return bild(w,h,(g)=>{ g.fillStyle='#e6cc92'; g.fillRect(0,0,w,h);
    g.fillStyle='#1f6a80'; g.fillRect(0,0,w,h*.05); g.fillRect(0,h*.95,w,h*.05); g.fillStyle='#b8442a'; g.fillRect(0,h*.05,w,h*.025); g.fillRect(0,h*.925,w,h*.025);
    const sw=w/spalten, zh=h*.82/zeilen;
    for(let i=0;i<spalten;i++){ g.fillStyle='rgba(120,80,30,.45)'; g.fillRect(i*sw,h*.08,3,h*.84);
      for(let j=0;j<zeilen;j++) zeichen(g,(i*3+j*5+Math.floor(zufall()*3)),(i+.5)*sw,h*.09+(j+.5)*zh,Math.min(sw,zh)*.7,F[(i+j)%4]); } });
}
/* flache Bildtafel (z. B. Wandmalerei), Blick nach +z */
function tafel(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
function mauer(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const quer=Math.max(w,d); t.repeat.set(quer/5,h/5); t.offset.set(((w>d?x-w/2:z-d/2)/5)%1,((y-h/2)/5)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* ---------- Innenraum: Licht, Boden, Wände (hinten, links, rechts, in den Wandgruppen, blenden beim Drehen aus), Leisten ----------
   opt: B,T,H, himmelLicht, grund, staerke, sonne, sonneStaerke, wandBild (aus quaderBild), bodenBild, bodenWdh [x,z], leiste (Farbe), band (Farbe des Zierbands oder null),
        oeffnung {x,b,h} (Loch in der Rückwand für den Ausgang), bodenLoch {x,z,b,t} (Loch im Boden, z. B. für eine Falltreppe) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6;
  sc.background=new THREE.Color(0x140d06);
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xffe8c4,opt.grund||0x5a4022,opt.staerke||.78));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xffe2b0,opt.sonneStaerke||.4); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const platten=opt.bodenBild||quaderBild([188,152,100],'#6a4c26',4); platten.wrapS=platten.wrapT=THREE.RepeatWrapping; const w=opt.bodenWdh||[B/10,T/10];
  const bodenM=new THREE.MeshLambertMaterial({map:platten}), L=opt.bodenLoch;
  const flaeche=(x1,x2,z1,z2)=>{ if(x2-x1<.05||z2-z1<.05) return; const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/.5)),Math.max(1,Math.round((z2-z1)/.5))), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,((x1+B/2)+uv.getX(i)*(x2-x1))/B*w[0],((T/2-z2)+uv.getY(i)*(z2-z1))/T*w[1]);
    const m=new THREE.Mesh(geo,bodenM); m.rotation.x=-Math.PI/2; m.position.set((x1+x2)/2,0,(z1+z2)/2); m.receiveShadow=true; sc.add(m); };
  if(L){ const a=L.x-L.b/2, b=L.x+L.b/2, d=L.z-L.t/2, e=L.z+L.t/2; flaeche(-B/2,B/2,-T/2,d); flaeche(-B/2,B/2,e,T/2); flaeche(-B/2,a,d,e); flaeche(b,B/2,d,e); } else flaeche(-B/2,B/2,-T/2,T/2);
  flaeche(-B/2-10,B/2+10,T/2,T/2+10); /* Boden läuft vorn weiter, damit hochkant keine dunkle Fläche entsteht */
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x241a0e)); aussen.rotation.x=-Math.PI/2; aussen.position.y=L?-4:-.06; sc.add(aussen);
  const tex=opt.wandBild||quaderBild(), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    mauer(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); mauer(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); if(H-o.h>.05) mauer(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else mauer(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  mauer(links,tex,.5,H,T,-B/2-.25,H/2,0); mauer(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.leiste||SAND3, band=opt.band===undefined?TUERKIS:opt.band, s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  box(s[0],B+1,.28,.72,f,0,H+.12,-T/2-.25);
  [-1,1].forEach((v,i)=>{ box(s[i+1],.18,.28,T,f,v*(B/2-.06),.14,0); box(s[i+1],.72,.28,T+1,f,v*(B/2+.25),H+.12,0); });
  if(band!==null){ const y=H-.55; if(o){ const l=o.x-o.b/2+B/2, r=B/2-o.x-o.b/2; if(y>o.h+.1) box(s[0],B,.2,.08,band,0,y,-T/2+.03); else { box(s[0],l,.2,.08,band,-B/2+l/2,y,-T/2+.03); box(s[0],r,.2,.08,band,B/2-r/2,y,-T/2+.03); } } else box(s[0],B,.2,.08,band,0,y,-T/2+.03);
    [-1,1].forEach((v,i)=>box(s[i+1],.08,.2,T,band,v*(B/2-.03),y,0)); }
  s.forEach(verschmelze);
  return { sc, B, T, H, hinten, links, rechts };
}
/* Säule im alten Stil mit Blüten-Kapitell. Hindernis (k.kreis) und k.verdecker setzt die Funktion selbst; Rückgabe: Gruppe */
function saeule(par,k,x,z,h,farbe){
  const g=gruppe(par,x,0,z), c=farbe||SAND;
  box(g,1.3,.3,1.3,SAND3,0,.15,0); rohr(g,.46,.55,h-.9,c,0,.3+(h-.9)/2,0);
  [.75,.95].forEach((y,i)=>rohr(g,.575,.575,.12,i?ROT:BLAU,0,y,0)); [h-1.0,h-.8].forEach((y,i)=>rohr(g,.5,.5,.12,i?TUERKIS:ROT,0,y,0));
  rohr(g,.8,.46,.55,GRUEN,0,h-.34,0); for(let i=0;i<8;i++){ const a=i*Math.PI/4; strich(g,[Math.cos(a)*.47,h-.58,Math.sin(a)*.47],[Math.cos(a)*.78,h-.1,Math.sin(a)*.78],.05,GOLD); }
  box(g,1.45,.22,1.45,SAND3,0,h+.05,0); verschmelze(g); k.kreis(x,z,.75); k.verdecker(g,x,z,.8); return g;
}
/* Feuerschale auf Ständer mit flackernder Flamme (ohne Licht: dafür flacker(...)). Hindernis setzt die Funktion selbst */
function feuerschale(par,k,x,z){
  const g=gruppe(par,x,0,z); walze(g,.34,.1,DUNKEL,0,.05,0); walze(g,.09,1.5,GOLD2,0,.8,0); rohr(g,.5,.22,.36,GOLD,0,1.68,0); ring(g,.5,.05,GOLD2,0,1.86,0).rotation.x=Math.PI/2;
  const f=gruppe(g,0,1.85,0); f.userData.lebendig=true;
  const f1=kegel(f,.28,.75,basis(0xff8a1e),0,.36,0), f2=kegel(f,.15,.48,basis(0xffe066),0,.26,.07); f1.castShadow=f2.castShadow=false;
  const s=schein(g,'rgba(255,170,70,.7)',0,2.3,.1,2.4);
  k.anim.push(t=>{ const a=1+Math.sin(t*13+x)*.12+Math.sin(t*7.3+z*3)*.1; f1.scale.y=.75*a; f2.scale.y=.48*(2-a); s.scale.set(2.4*a,2.4*a,1); });
  k.kreis(x,z,.52); return g;
}
/* Zahlenschloss (golden, drei Felder), Blick nach +z */
function zahlenschloss(par,x,y,z){
  const g=gruppe(par,x,y,z); box(g,.9,.66,.22,GOLD,0,0,0); ring(g,.27,.075,0x9aa3ad,0,.33,0,Math.PI); [-.25,0,.25].forEach(v=>{ box(g,.2,.3,.04,0xfff3cf,v,-.02,.12); box(g,.045,.16,.02,0x2a1a08,v,-.02,.15); });
  return g;
}
/* Tonkrug (Höhe h, Fuß bei y=0) */
function krug(par,x,z,h,farbe){
  const g=gruppe(par,x,0,z), f=farbe||0xc07a44; g.scale.setScalar(h); ball(g,.34,f,0,.42,0,1,1.2,1); rohr(g,.13,.17,.2,f,0,.84,0); ring(g,.15,.035,0x8a4a24,0,.95,0).rotation.x=Math.PI/2; walze(g,.17,.06,0x8a4a24,0,.03,0); ring(g,.34,.02,0x5a3018,0,.5,0).rotation.x=Math.PI/2;
  return g;
}
/* Palme (nicht fest: Hindernis selbst setzen, Radius etwa .45) */
function palme(par,x,z,h,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  for(let i=0;i<7;i++){ const u=i/7; rohr(g,.24-u*.09,.28-u*.09,h/7+.04,i%2?0x9a7040:0x866034,u*u*.8,(i+.5)*h/7,0,10); }
  const kx=.82; for(let i=0;i<8;i++){ const a=i*.785, bl=gruppe(g,kx,h,0); bl.rotation.y=a;
    ball(bl,.7,i%2?0x4a9a34:0x66b03c,.62,.12,0,1,.1,.36); const e=gruppe(bl,1.2,.1,0); e.rotation.z=-.55; ball(e,.6,i%2?0x3f8a30:0x58a038,.45,0,0,1,.09,.28); }
  [[.12,.1],[-.12,.14],[.02,-.18]].forEach(([a,b])=>ball(g,.14,0x9a5a1e,kx+a,h-.15,b));
  return g;
}
/* Viele Büschel, Steine oder Münzen als eine Instanz-Gruppe. liste: [[x,y,z,sx,sy,sz,farbe,drehY,drehX,drehZ]], geo: GEO.sph / GEO.cone / GEO.box / GEO.cyl */
function viele(par,geo,liste){
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(e[8]||0,e[7]||0,e[9]||0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.receiveShadow=true; im.frustumCulled=false; par.add(im); return im;
}
/* Kamel Karim (ein Höcker, mit Sattel), Blick nach +x, etwa 3,6 hoch und 3,6 lang. Bleibt beweglich (Kopf nickt, Maul kaut, Schwanz wedelt).
   Hindernis selbst setzen. Rückgabe: { g, hals, kopf } (hals.rotation.z zum Nicken im Finale) */
function kamel(par,k,x,z,dreh,gr){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1); g.userData.lebendig=true;
  const F=0xd2a25e, D=0xa87a40, H=0xf0d8a8;
  const r=gruppe(g,0,0,0);
  ball(r,.8,F,0,1.85,0,1.5,.82,.8); ball(r,.55,F,-.1,2.52,0,1.3,.95,.9);
  [[-.85,.38],[-.85,-.38],[.82,.38],[.82,-.38]].forEach(([a,b])=>{ strich(r,[a,1.75,b],[a+.04,.95,b],.15,F); ball(r,.16,F,a+.04,.95,b); strich(r,[a+.04,.95,b],[a,.16,b],.11,F); ball(r,.19,D,a+.05,.11,b,1.15,.6,1); });
  /* Satteldecke und Sattel */
  ball(r,.62,0xb83a2a,-.1,2.48,0,.75,.92,.97); [-.36,.16].forEach(a=>ring(r,.53,.035,GOLD,a,2.45,0).rotation.y=Math.PI/2);
  box(r,.5,.14,.46,HOLZ2,-.1,3.07,0); [-.32,.12].forEach(a=>{ walze(r,.05,.3,HOLZ2,a,3.22,0); ball(r,.08,GOLD,a,3.4,0); });
  [-1,1].forEach(s=>{ box(r,.5,.42,.16,0x8a5a2c,-.15,1.95,s*.72); });
  verschmelze(r);
  const hals=gruppe(g,1.0,1.9,0); strich(hals,[0,0,0],[.65,.35,0],.25,F); ball(hals,.24,F,.65,.35,0); strich(hals,[.65,.35,0],[.9,1.3,0],.18,F);
  const kopf=gruppe(hals,.95,1.4,0); ball(kopf,.27,F,.05,0,0,1.15,.95,.85); ball(kopf,.2,F,.38,-.07,0,1.4,.8,.85);
  const maul=gruppe(kopf,.4,-.2,0); ball(maul,.15,H,.05,0,0,1.4,.5,.9);
  [-1,1].forEach(s=>{ ball(kopf,.055,SCHWARZ,.17,.09,s*.21); ball(kopf,.018,0xffffff,.2,.11,s*.25); strich(kopf,[.1,.17,s*.2],[.25,.16,s*.2],.025,D); ball(kopf,.03,SCHWARZ,.63,-.03,s*.07); const o=kegel(kopf,.08,.24,F,-.14,.28,s*.17); o.rotation.x=s*.4; });
  ring(kopf,.19,.025,0xb83a2a,.32,-.07,0).rotation.y=Math.PI/2;
  const schwanz=gruppe(g,-1.15,2.0,0); strich(schwanz,[0,0,0],[-.22,-.65,0],.06,F); ball(schwanz,.11,D,-.23,-.74,0,.9,1.5,.9);
  k.anim.push(t=>{ hals.rotation.z=Math.sin(t*.6)*.07; kopf.rotation.z=Math.sin(t*1.1)*.08; maul.position.z=Math.sin(t*5)*.035; maul.position.y=-.2-Math.abs(Math.sin(t*2.5))*.03; schwanz.rotation.x=Math.sin(t*1.9)*.35; });
  return { g, hals, kopf };
}
/* Pyramide (Spitze oben), nur Deko weit weg */
function pyramide(par,x,z,b,h,farbe){ const m=new THREE.Mesh(new THREE.ConeGeometry(b*.71,h,4),mat(farbe||0xd8b070)); m.position.set(x,h/2-.05,z); m.rotation.y=Math.PI/4; par.add(m); return m; }
return { SAND, SAND2, SAND3, STEIN, DUNKEL, HOLZ, HOLZ2, GOLD, GOLD2, TUERKIS, BLAU, ROT, GRUEN, WEISS, SCHWARZ,
  sandBild, quaderBild, zeichen, zeichenBild, tafel, mauer, huelle, saeule, feuerschale, zahlenschloss, krug, palme, viele, kamel, pyramide };
})();

/* Raum 1: Die Wüste vor dem Grab. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die große Steinplatte in der Felswand hinten. Sie schiebt sich nach rechts, dahinter führen Stufen ins Dunkle. */
RAEUME3D.grabkammer[0] = (function(){
const B=36, T=27;
const FELS=0xc29a62, FELS2=0xa97e4a, FELS3=0xd6b27a, DUENE=0xe0bd79, DUENE2=0xd9b572;
const HOLZ=0x9a6a38, HOLZ2=0x6b421e, HOLZ3=0xbe8a50, ZELT=0xf2e6c4, ZELT2=0xdcc492, ROT=0xc8402a, BLAU=0x2a6aa8, WEISS=0xf6f0e0;
const METALL=0x93a4b0, METALL2=0x4a565e, DUNKEL=0x33220f, SCHWARZ=0x1c1612, TON=0xc46a38, GRUEN=0x2f6a4a, LAUB=0x7c9a3a;
const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });

/* ---------- Grundformen ---------- */
/* ausgeschnittene Platte mit Dicke (Punkte in x/y, Dicke nach +z) */
function platte(par,punkte,tiefe,farbe,x,y,z){
  const f=new THREE.Shape(); punkte.forEach((p,i)=>{ if(i) f.lineTo(p[0],p[1]); else f.moveTo(p[0],p[1]); });
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tiefe,bevelEnabled:false}),mat(farbe)); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}
/* flacher Fleck auf dem Boden (Walze mit eigener Streckung) */
function scheibe(par,rx,h,rz,c,x,y,z){ const m=walze(par,1,h,c,x,y,z); m.scale.set(rx,h,rz); return m; }
/* runder Fels aus mehreren Brocken */
function fels(par,x,z,s,dreh){
  ball(par,s,FELS,x,s*.38,z,1,.72,.9).rotation.y=dreh||0;
  ball(par,s*.6,FELS3,x-s*.34,s*.6,z+s*.1,1,.7,.9);
  ball(par,s*.45,FELS2,x+s*.6,s*.18,z+s*.3,1.1,.65,.9);
}
/* flatternder Wimpel an einem Mast (Spitze zeigt nach +x) */
function wimpel(par,k,x,y,z,farbe,phase){
  const g=gruppe(par,x,y,z); g.userData.lebendig=true; const stuecke=[]; let eltern=g;
  for(let i=0;i<4;i++){ const s=gruppe(eltern,i?.22:0,0,0); box(s,.23,.38-i*.08,.035,farbe,.11,0,0); stuecke.push(s); eltern=s; }
  k.anim.push(t=>stuecke.forEach((s,i)=>{ s.rotation.y=Math.sin(t*6-i*1.3+phase)*(.18+i*.07); }));
}

/* ---------- Boden: Sand mit Loch hinter der Steinplatte ---------- */
function boden(k){
  const sc=k.scene, t=GRAB.sandBild([222,186,118],15); t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const m=new THREE.MeshLambertMaterial({map:t});
  const flaeche=(x1,x2,z1,z2)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,(x1+uv.getX(i)*(x2-x1))/9,(-z2+uv.getY(i)*(z2-z1))/9);
    const f=new THREE.Mesh(geo,m); f.rotation.x=-Math.PI/2; f.position.set((x1+x2)/2,-.012,(z1+z2)/2); f.receiveShadow=true; sc.add(f); };
  flaeche(-140,-1.7,-140,140); flaeche(1.7,140,-140,140); flaeche(-1.7,1.7,-140,-17.45); flaeche(-1.7,1.7,-13.5,140);
  /* Windrippen und ein ausgetretener Weg zum Eingang */
  const w=bild(1024,768,g=>{
    const X=x=>(x+B/2)/B*1024, Z=z=>(z+T/2)/T*768; g.lineCap='round';
    const spur=(P,br,f)=>{ g.strokeStyle=f; g.lineWidth=br; g.beginPath(); g.moveTo(X(P[0][0]),Z(P[0][1])); for(let i=1;i<P.length-1;i++) g.quadraticCurveTo(X(P[i][0]),Z(P[i][1]),X((P[i][0]+P[i+1][0])/2),Z((P[i][1]+P[i+1][1])/2)); const e=P[P.length-1]; g.lineTo(X(e[0]),Z(e[1])); g.stroke(); };
    [[[0,-12.9],[0,-9],[-1.5,-5],[1,0],[0,5],[1,13.5]],[[-1,-5],[-5,-5],[-9,-4],[-11,-5]],[[1,0],[5,-.6],[9,0],[14,-3],[17,-3]]].forEach(P=>{ spur(P,70,'rgba(180,128,66,.2)'); spur(P,40,'rgba(190,140,76,.3)'); });
    for(let i=0;i<130;i++){ const x=zufall()*1024, y=zufall()*768, l=24+zufall()*60;
      g.lineWidth=3; g.strokeStyle='rgba(160,112,52,.3)'; g.beginPath(); g.moveTo(x,y); g.quadraticCurveTo(x+l/2,y-8,x+l,y); g.stroke();
      g.strokeStyle='rgba(255,236,180,.4)'; g.beginPath(); g.moveTo(x,y+4); g.quadraticCurveTo(x+l/2,y-4,x+l,y+4); g.stroke(); }
    /* flache Fußspuren im Sand (Sohle und Ferse, abwechselnd links und rechts) */
    const tritte=P=>{ let n=0; for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], ax=X(a[0]), az=Z(a[1]), dx=X(b[0])-ax, dz=Z(b[1])-az, l=Math.hypot(dx,dz), w=Math.atan2(dz,dx);
      for(let d=0;d<l;d+=19){ const s=(n++%2)?7:-7; g.save(); g.translate(ax+dx*d/l,az+dz*d/l); g.rotate(w); g.fillStyle='rgba(138,92,40,.42)';
        g.beginPath(); g.ellipse(3,s,7,4.2,0,0,7); g.fill(); g.beginPath(); g.ellipse(-8,s,3.4,3.4,0,0,7); g.fill(); g.restore(); } } };
    tritte([[.9,12.9],[1.7,10.4],[.8,8],[1.1,5.6],[.2,4]]); tritte([[-6,12.6],[-3.6,10.2],[-3.1,7.2],[-1.4,4.6]]); tritte([[7.8,12.4],[5.4,9.6],[3.2,7.6]]);
  });
  const o=new THREE.Mesh(new THREE.PlaneGeometry(B,T-.1),new THREE.MeshLambertMaterial({map:w,transparent:true,depthWrite:false})); o.rotation.x=-Math.PI/2; o.position.set(0,.006,.05); o.receiveShadow=true; sc.add(o);
}

/* ---------- Ausgang: Felswand, Stufen und Steinplatte ---------- */
function eingang(k){
  const sc=k.scene, wand=k.wand('hinten'), g=gruppe(wand,0,0,0);
  /* Felsblöcke links und rechts vom Gang: [Mitte x, Breite, Höhe] */
  [[-7.5,1.4,2.3],[-6.1,1.5,3.4],[-4.5,1.8,4.5],[-2.65,1.9,5.2],[2.65,1.9,5.1],[4.5,1.8,4.4],[6.1,1.5,3.3],[7.5,1.4,2.2]].forEach(([x,w,h],i)=>{
    const f=[FELS,FELS3,FELS2][i%3];
    box(g,w+.02,h+.05,4.05,f,x,h/2-.05,-15.58-(i%2)*.03);
    ball(g,w*.55,[FELS3,FELS,FELS3][i%3],x+.1,h-.05,-14.9,1.15,.55,1.4); ball(g,w*.45,FELS2,x-.2,h,-16.4,1.2,.7,1.3);
    for(let y=.8+(i%3)*.22;y<h-.4;y+=1.15) box(g,w*.92,.07,.06,FELS2,x+(i%2?.04:-.04),y,-13.54);
  });
  /* Sturz über dem Gang */
  box(g,3.42,1.75,4.05,FELS,0,4.37,-15.58); ball(g,1.3,FELS3,-.4,5.2,-15,1.3,.5,1.2); ball(g,1,FELS2,1,5.15,-16,1.3,.7,1.2);
  /* Brocken am Fuß der Wand, außerhalb der Schiebebahn */
  [[-7.9,.75],[-6.7,.5],[-4.8,.42],[7.2,.55],[8.1,.75]].forEach(([x,s],i)=>fels(g,x,-13.45,s,i));
  /* Gesims und Türpfosten */
  [-1.95,1.95].forEach(x=>{ box(g,.5,3.8,.5,GRAB.SAND2,x,1.9,-13.7); [.5,1.5,2.5].forEach(y=>box(g,.52,.06,.52,GRAB.SAND3,x,y,-13.7)); });
  box(g,5.1,.62,.62,GRAB.SAND,0,4.11,-13.36); box(g,5.5,.18,.78,GRAB.SAND3,0,4.51,-13.36);
  /* Schiene und Anschlag der Platte */
  box(g,8.3,.08,.5,GRAB.SAND3,2,.035,-13.22); box(g,.4,.6,.55,GRAB.SAND3,6.4,.3,-13.22);
  /* Pfeiler mit dem Zahlenschloss */
  box(g,1.2,.22,.7,GRAB.SAND3,-2.82,.11,-13.18); box(g,.98,3.15,.5,GRAB.SAND,-2.82,1.62,-13.2); box(g,1.15,.2,.66,GRAB.SAND3,-2.82,3.27,-13.2);
  verschmelze(g);
  const fries=GRAB.zeichenBild(512,64,10,1); GRAB.tafel(wand,fries,4.7,.5,0,4.11,-13.04);
  /* Gang mit Stufen ins Dunkle */
  const tief=gruppe(sc,0,0,0), nacht=basis(0x160d05);
  [-1.66,1.66].forEach(x=>box(tief,.07,6.1,3.75,nacht,x,.45,-15.58));
  box(tief,3.4,6.1,.1,nacht,0,.45,-17.42); box(tief,3.4,.08,3.5,nacht,0,3.47,-15.7); box(tief,3.4,.1,3.95,nacht,0,-2.5,-15.45);
  [0x9a7646,0x7a5a32,0x5a4224,0x3e2c17,0x28190c].forEach((f,i)=>{ const oben=-.05-i*.25, z=-13.86-i*.74;
    box(tief,3.25,.3,.74,basis(f),0,oben-.15,z); box(tief,3.25,.05,.08,basis([0xc8a26a,0xa27e4e,0x7c5e38,0x5a4226,0x3c2a18][i]),0,oben+.002,z+.33); });
  ohneSchatten(tief); verschmelze(tief);
  schein(sc,'rgba(255,170,70,.45)',0,.2,-16.7,2.4);
  flacker(k,0,1.2,-15.6,0xffa040,.55,5);
  /* die große Steinplatte */
  const pl=gruppe(sc,0,0,-13.22);
  box(pl,3.9,3.68,.34,0xa88458,0,1.92,0);
  [-1.9,1.9].forEach(x=>box(pl,.12,3.68,.38,0x86643c,x,1.92,0)); [.14,3.7].forEach(y=>box(pl,3.9,.12,.38,0x86643c,0,y,0));
  const t=bild(512,484,c=>{ c.fillStyle='#b8945e'; c.fillRect(0,0,512,484);
    for(let i=0;i<500;i++){ c.fillStyle=i%2?'rgba(90,60,28,.22)':'rgba(255,232,180,.2)'; c.fillRect(zufall()*505,zufall()*478,4+(i%4),3); }
    c.strokeStyle='#6a4a24'; c.lineWidth=9; c.strokeRect(22,22,468,440); c.beginPath(); c.arc(256,190,112,0,7); c.stroke();
    GRAB.zeichen(c,3,256,190,170,'#3f2408');
    [0,4,2,5].forEach((a,i)=>GRAB.zeichen(c,a,92+i*110,388,78,'#4a2c0c')); [1,6].forEach((a,i)=>GRAB.zeichen(c,a,82+i*348,96,66,'#4a2c0c')); });
  GRAB.tafel(pl,t,3.55,3.36,0,1.92,.178);
  verschmelze(pl);
  /* Schloss und Lämpchen */
  const schloss=GRAB.zahlenschloss(sc,-2.82,2.12,-12.8); schloss.scale.setScalar(1.35); verschmelze(schloss);
  const rot=ball(sc,.16,basis(0xff3a2a),-2.82,3.52,-13.1), gruen=ball(sc,.16,basis(0x4af05a),-2.82,3.52,-13.1); gruen.visible=false;
  const tuer=ausgang(k,{ steh:[0,-11.4], durch:[0,-16.2], tief:true, treffer:{x:-.6,y:2,z:-12.95,b:5.8,h:4,t:.8}, name:'Steinplatte', einfach:'Steintür', schildOben:[0,4.25,-12.6], glanz:[-2.82,2.2,-12.4],
    bewege:auf=>{ pl.position.x=auf*4.15; rot.visible=auf<.5; gruen.visible=auf>=.5; } });
  k.kasten(0,-13.25,16.4,.8);
  return tuer;
}

/* ---------- niedrige Begrenzung aus Felsen und Mäuerchen ---------- */
function begrenzung(k){
  const hinten=gruppe(k.wand('hinten'),0,0,0), links=gruppe(k.wand('links'),0,0,0), rechts=gruppe(k.wand('rechts'),0,0,0);
  const mauerchen=(g,x,z,w,d)=>{ const quer=w>d, n=Math.round((quer?w:d)/.95);
    for(let i=0;i<n;i++){ const v=(i+.5)/n-.5, h=.55+((i*3)%4)*.09; box(g,quer?w/n-.07:w,h,quer?d:d/n-.07,[0xcaa468,0xb89058,0xd8b47c][i%3],x+(quer?v*w:0),h/2,z+(quer?0:v*d)); }
    box(g,quer?w*.55:w+.1,.18,quer?d+.1:d*.55,0xa07c48,x-(quer?w*.14:0),.86,z-(quer?0:d*.12)); };
  [-1,1].forEach(s=>{
    mauerchen(hinten,s*11.4,-13.95,4.4,.6);
    [[8.9,.85],[14.4,1],[15.7,.7],[16.9,1.05],[18.2,.8]].forEach(([x,r],i)=>fels(hinten,s*x,-14.05-(i%2)*.15,r,i*s));
  });
  [[links,-1],[rechts,1]].forEach(([g,s])=>{
    mauerchen(g,s*18.3,-6.2,.6,4.6); mauerchen(g,s*18.3,5.6,.6,5);
    [[-12.4,.9],[-10.6,.7],[-9.2,.85],[-3.2,.75],[-1.6,1],[.2,.6],[1.8,.85],[9,.8],[10.7,1],[12.5,.75]].forEach(([z,r],i)=>fels(g,s*(18.55+(i%2)*.2),z,r*.9,i*s));
  });
  [hinten,links,rechts].forEach(verschmelze);
}

/* ---------- Landschaft: Pyramiden, Dünen, Sonne ---------- */
function landschaft(k){
  const sc=k.scene, p=gruppe(sc,0,0,0);
  [[-13.5,-25,8,4.9,0xd4a864],[-21,-37,13,8.6,0xdcb470],[13,-24.5,6.6,4.1,0xd4a864],[22,-34,12,8,0xc89c58],[2,-52,18,11,0xdcb470],[-45,-9,13,8,0xd4a864],[46,3,12,7.4,0xc89c58],[-40,24,9,5.5,0xdcb470]]
    .forEach(([x,z,b,h,f])=>{ GRAB.pyramide(p,x,z,b,h,f); GRAB.pyramide(p,x,z,b*.16,h*.16,0xf2d898).position.y=h*.93-.04; });
  ohneSchatten(p); verschmelze(p);
  /* Dünen: je Gruppe drei überlappende Hügel, tief in den Sand gesenkt. [x, z, halbe Breite, sichtbare Höhe, halbe Tiefe] */
  const d=gruppe(sc,0,0,0);
  [[-29,-19,6,2.6,4.5],[-9,-29,6.5,3,4.5],[9,-31,6,3.4,4.5],[30,-20,6,2.8,5],[-31,0,5.5,2.4,6.5],[31,5,5.5,2.5,6.5],[-30,22,6,1.9,5],[29,24,5.5,2,5],[-10,36,7,1.7,4.5],[15,38,6.5,1.8,4.5],[-48,-32,11,4.6,7],[50,-26,11,4.8,8]]
    .forEach(([x,z,rx,h,rz],i)=>{ [[0,0,1,1],[.62,.28,.68,.72],[-.6,-.2,.74,.58]].forEach(([a,b,br,ho],j)=>{ const v=h*ho/.5; ball(d,1,(i+j)%2?DUENE:DUENE2,x+a*rx,-v*.5,z+b*rz,rx*br,v,rz*br); }); });
  /* kleine Dünen dicht hinter der Felswand */
  [[-6.8,-20.8,3.4,2.4,2.6],[-2.4,-21.6,3.2,3,3],[2.2,-21.2,3,2.7,2.8],[6.6,-21,3.4,2.2,2.6]].forEach(([x,z,rx,h,rz],i)=>{ const v=h/.6; ball(d,1,i%2?DUENE:DUENE2,x,-v*.4,z,rx,v,rz); });
  ohneSchatten(d); verschmelze(d);
  const sonne=gruppe(sc,17,10,-44); ball(sonne,2.4,basis(0xfff4b8),0,0,0,1,1,.3).castShadow=false;
  const hof=schein(sonne,'rgba(255,236,150,.95)',0,0,1,11);
  k.anim.push(t=>{ const s=10.5+Math.sin(t*1.3)*.8; hof.scale.set(s,s,1); });
}

/* ---------- Ausstattung: Palmen, Lagerplatz, Grabungsfeld, Wasserloch ---------- */
function palmen(k){
  [[-16.3,-11.2,4.4,2.6],[-13.9,-12.1,3.6,.4],[15.9,-11.3,4.5,.5],[10.4,-11.9,3.5,2.4],[-16.8,-1.4,3.9,1.2],[-16.4,10.6,3.5,.3],[17,8.3,3.8,2.7],[11,11.9,3.1,2.2],[17,-5.6,3.4,3.4]].forEach(([x,z,h,d])=>{
    const g=GRAB.palme(k.scene,x,z,h,d); verschmelze(g); k.verdecker(g,x+Math.cos(d)*.8,z-Math.sin(d)*.8,1.4); k.kreis(x,z,.45); });
}
function lager(k,g){
  /* Klapptisch mit Lampe, Becher und Hut */
  box(g,1.7,.1,1,HOLZ3,-15.6,.92,-6.4); [-1,1].forEach(s=>{ strich(g,[-16.3,0,-6.4+s*.38],[-14.9,.9,-6.4+s*.38],.05,HOLZ2); strich(g,[-14.9,0,-6.4+s*.38],[-16.3,.9,-6.4+s*.38],.05,HOLZ2); });
  walze(g,.17,.1,METALL2,-16.1,1.02,-6.5); walze(g,.13,.32,mat(0xffd870,{emissive:0xc08a28}),-16.1,1.22,-6.5); kegel(g,.22,.18,METALL2,-16.1,1.47,-6.5); ring(g,.13,.018,METALL2,-16.1,1.58,-6.5);
  walze(g,.11,.22,BLAU,-15.5,1.08,-6.15); ring(g,.07,.022,BLAU,-15.38,1.08,-6.15);
  walze(g,.34,.05,0xd8b878,-15.05,1.0,-6.45); ball(g,.2,0xd8b878,-15.05,1.04,-6.45,1,.8,1); walze(g,.205,.06,HOLZ2,-15.05,1.07,-6.45);
  k.kasten(-15.6,-6.4,1.9,1.15);
  /* Klappstuhl */
  [-1,1].forEach(s=>{ strich(g,[-15.9,0,-4.1+s*.34],[-15.2,.66,-4.1+s*.34],.04,HOLZ2); strich(g,[-15.2,0,-4.1+s*.34],[-16,1.35,-4.1+s*.34],.04,HOLZ2); });
  box(g,.68,.07,.72,GRUEN,-15.55,.66,-4.1); box(g,.07,.38,.72,GRUEN,-15.93,1.15,-4.1); k.kreis(-15.6,-4.1,.55);
  /* Feuerstelle (aus) mit Teekessel */
  const fx=-14.6, fz=.9;
  scheibe(g,.62,.02,.62,0x6a5238,fx,.012,fz); for(let i=0;i<9;i++){ const a=i*.698; ball(g,.2,i%2?0x8a7a66:0xa8967c,fx+Math.cos(a)*.65,.1,fz+Math.sin(a)*.65,1,.75,1); }
  [0,2.1,4.2].forEach(a=>strich(g,[fx+Math.cos(a)*.45,.08,fz+Math.sin(a)*.45],[fx-Math.cos(a)*.12,.2,fz-Math.sin(a)*.12],.08,HOLZ2));
  ball(g,.24,METALL2,fx,.42,fz,1,.85,1); ball(g,.06,SCHWARZ,fx,.66,fz); strich(g,[fx+.18,.42,fz],[fx+.43,.6,fz],.045,METALL2); ring(g,.18,.025,SCHWARZ,fx,.6,fz,Math.PI);
  k.kreis(fx,fz,.82);
  /* Rucksack neben dem Zelt */
  box(g,.7,.8,.46,0x7a8a3a,-8.15,.4,-8.3); ball(g,.37,0x7a8a3a,-8.15,.78,-8.3,1,.65,.68); box(g,.5,.34,.14,0x5c6a28,-8.15,.3,-8.04); [-.18,.18].forEach(x=>box(g,.08,.55,.05,DUNKEL,-8.15+x,.66,-8.03));
  walze(g,.17,.9,ROT,-8.15,1.08,-8.3).rotation.z=Math.PI/2; k.kreis(-8.15,-8.3,.5);
  /* Tonkrüge */
  [[-17,5.2,1.2],[-16.4,5.9,.8],[-17.1,6.5,.95],[8.6,-12.1,1.1],[9.2,-11.6,.75]].forEach(([x,z,h],i)=>GRAB.krug(g,x,z,h,i%2?TON:0xd08a50));
  k.kasten(-16.75,5.85,1.5,2); k.kasten(8.85,-11.9,1.4,1.1);
  /* Mast mit Fahne (flache Kappe) */
  walze(g,.07,3.5,HOLZ2,-8.4,1.75,-11.8); walze(g,.13,.12,GRAB.GOLD,-8.4,3.52,-11.8); [0,1,2].forEach(i=>ball(g,.22,FELS2,-8.4+Math.cos(i*2.1)*.24,.1,-11.8+Math.sin(i*2.1)*.24,1,.7,1)); k.kreis(-8.4,-11.8,.45);
  wimpel(k.scene,k,-8.36,3.22,-11.8,ROT,0);
}
function grabungsfeld(k,g){
  const x=4.7, z=-8.6;
  scheibe(g,1.35,.016,.95,0xb88850,x,.012,z); scheibe(g,.85,.022,.55,0x9a6c3a,x-.15,.016,z+.05);
  const E=[[-1.7,-1.25],[0,-1.25],[1.7,-1.25],[1.7,1.25],[0,1.25],[-1.7,1.25]];
  E.forEach((p,i)=>{ const q=E[(i+1)%E.length]; walze(g,.065,.72,HOLZ,x+p[0],.36,z+p[1]); walze(g,.085,.09,ROT,x+p[0],.76,z+p[1]);
    strich(g,[x+p[0],.62,z+p[1]],[x+(p[0]+q[0])/2,.52,z+(p[1]+q[1])/2],.022,WEISS); strich(g,[x+(p[0]+q[0])/2,.52,z+(p[1]+q[1])/2],[x+q[0],.62,z+q[1]],.022,WEISS); });
  [[-.6,-.3],[.5,.35],[.75,-.4],[-.2,.45]].forEach(([a,b],i)=>ball(g,.13+(i%2)*.06,i%2?FELS:FELS2,x+a,.07,z+b,1.2,.65,1));
  /* Eimer mit Sand */
  rohr(g,.3,.22,.46,METALL,x+.35,.25,z-.05); ball(g,.27,DUENE2,x+.35,.47,z-.05,1,.35,1); ring(g,.3,.02,METALL2,x+.35,.5,z-.05,Math.PI);
  k.kasten(x,z,3.6,2.7);
}
function wasserloch(k,g){
  const x=14.3, z=10.4;
  scheibe(g,2.05,.03,1.35,0xa87c48,x,.014,z); scheibe(g,1.75,.04,1.1,0x3a9ac8,x,.024,z); scheibe(g,.95,.046,.55,0x72c4e4,x-.2,.028,z+.1);
  for(let i=0;i<17;i++){ const a=i/17*Math.PI*2, s=.2+((i*7)%5)*.035; ball(g,s,[FELS,FELS3,FELS2][i%3],x+Math.cos(a)*1.9,s*.4,z+Math.sin(a)*1.22,1.15,.7,1); }
  [[-1.5,-.8],[-1.15,-1],[-1.75,-.4],[1.45,-.85],[1.75,-.45]].forEach(([a,b],i)=>{ const h=.9+(i%3)*.25, n=i%2?.13:-.13; strich(g,[x+a,0,z+b],[x+a+n,h,z+b],.03,0x5a8a34); walze(g,.07,.3,0x7a4a20,x+a+n*1.05,h+.08,z+b); strich(g,[x+a+.1,0,z+b+.06],[x+a+.4,h*.7,z+b+.1],.025,LAUB); });
  k.kasten(x,z,4.3,2.9);
  const welle=ring(k.scene,.5,.018,basis(0xe0f6ff,{transparent:true,opacity:.6,depthWrite:false}),x+.3,.062,z); welle.rotation.x=Math.PI/2; welle.castShadow=false;
  k.anim.push(t=>{ const s=.3+(t*.4%1); welle.scale.set(s,s*.8,1); });
}
function ausstattung(k){
  const g=gruppe(k.scene,0,0,0);
  lager(k,g); grabungsfeld(k,g); wasserloch(k,g);
  [[-9.4,11.4,.9],[6.4,11.6,.75],[-1.9,-9,.5],[17,1.8,.7],[-12.4,-.9,.5],[9.9,-6.2,.45],[-17,-8.8,.65]].forEach(([x,z,s],i)=>{ fels(g,x,z,s,i*1.3); k.kreis(x+s*.1,z,s*1.12); });
  verschmelze(g);
}
/* trockene Büsche, Grasbüschel, Blüten, Scherben und Kiesel (Instanzen) */
function bewuchs(k){
  const sc=k.scene, busch=[], halme=[], kiesel=[], scherben=[];
  const halm=(x,y,z,d,h,f,a,n)=>halme.push([x,y,z,d,h,d,f,0,Math.sin(a)*n,-Math.cos(a)*n]);
  /* ein Strauch: viele kleine Blattknäuel und abstehende Halme, kein glatter Ball */
  const strauch=(x,z,r,n)=>{ for(let j=0;j<11;j++){ const a=j*2.4+n, w=j<6?r*.75:r*.38, s=r*(.17+(j%3)*.05);
      busch.push([x+Math.cos(a)*w*(.8+zufall()*.4),j<6?s*.75:r*(.38+zufall()*.2),z+Math.sin(a)*w*(.7+zufall()*.4),s,s*.8,s,[0x7c8a36,0x96984a,0x647a2e,0xa89c50][(j+n)%4],a]); }
    for(let j=0;j<10;j++){ const a=j*.63+n, h=r*(.75+zufall()*.6); halm(x+Math.cos(a)*r*.5,h*.42+r*.12,z+Math.sin(a)*r*.45,.03,h,j%2?0x8a8a34:0xaa9a44,a,.55); } };
  [[-17.5,-4.8],[-17.4,2.9],[-17.3,12.4],[-12.8,12.6],[-6,12.7],[-1.8,12.9],[3.6,12.6],[9,12.9],[17.5,12.4],[17.4,4.2],[17.5,-1],[17.6,-9],[13.2,-12.6],[-10.2,-12.5],[7.2,-12.5],[-11.6,-12.4]].forEach(([x,z],i)=>{
    strauch(x,z,.5,i); if(i%3) busch.push([x-.18,.5,z+.2,.055,.05,.055,i%2?0xffd23a:0xf47a50,0]); });
  const buschel=(x,z,h)=>{ for(let j=0;j<5;j++){ const a=j*1.26+x; halm(x+Math.cos(a)*.11,h*.45,z+Math.sin(a)*.11,.045,h*(.7+(j%3)*.2),[0xa8983c,0xc4a848,0x8a8a34][(j+Math.floor(zufall()*3))%3],a,.35); } };
  [[-13.9,-9.9],[-7.8,-12.2],[-3.9,-12],[3.1,-11.8],[7.4,-6.4],[16,-7.6],[15.8,2.6],[12.2,8],[8.4,10],[2.6,10.8],[-3.4,11],[-8,9],[-14.2,9.2],[-16,-.1],[-10.4,.6],[2.4,-3.4],[-8.6,-5.6],[16.2,11.9],[12.2,12.4],[-13.2,-3.3],
   [-4.6,6.2],[2.2,8.4],[-1.4,11.8],[6.6,8.8],[-5.8,11.4],[-.9,7.2],[4.6,12],[-2.6,9]].forEach(([x,z],i)=>buschel(x,z,.26+(i%4)*.07));
  /* kleine Tonscherben, halb im Sand (vorne in der Mitte) */
  [[-2.4,6.6],[3.4,9.8],[-.4,10.8],[5.6,6.8],[-5,8.8]].forEach(([x,z],i)=>{ for(let j=0;j<4;j++){ const a=j*2.2+i, w=.12+j*.09; scherben.push([x+Math.cos(a)*w,.025,z+Math.sin(a)*w,.13-j*.018,.035,.08,[0xb0603a,0x9a4e2e,0xc07a48][(i+j)%3],a,.22*(j%2?1:-1),.18]); } kiesel.push([x+.4,.05,z-.2,.12,.08,.1,0xa8845a,i]); });
  /* außerhalb: kleinere Sträucher */
  for(let i=0;i<48;i++){ const s=i%4; let x,z;
    if(s===0){ x=(i%8<4?-1:1)*(9+zufall()*15); z=-15.6-zufall()*7; } else if(s===3){ x=-26+zufall()*52; z=14.6+zufall()*9; } else { x=(s===1?-1:1)*(19.9+zufall()*7); z=-15+zufall()*30; }
    buschel(x,z,.32+zufall()*.3); strauch(x+.9,z+.3,.26+zufall()*.16,i); }
  for(let i=0;i<240;i++){ const x=-17.5+zufall()*35, z=-12.3+zufall()*25.6, r=.035+zufall()*.075; kiesel.push([x,r*.4,z,r*1.3,r*.7,r,[0xa8845a,0xc8a878,0x8a6c48][i%3],i]); }
  for(let i=0;i<90;i++){ const s=i%2?-1:1, x=s*(19.5+zufall()*13), z=-20+zufall()*40, r=.15+zufall()*.3; kiesel.push([x,r*.3,z,r*1.3,r*.6,r,[0xb8905c,0xd0ac74][i%2],i]); }
  GRAB.viele(sc,GEO.sph,busch).castShadow=false; GRAB.viele(sc,GEO.cone,halme); GRAB.viele(sc,GEO.sph,kiesel); GRAB.viele(sc,GEO.box,scherben);
}

/* ---------- Bewegung: wehender Sand, Geier, Eidechsen, Katze ---------- */
function wehsand(k){
  const L=[]; for(let i=0;i<260;i++) L.push({ x:zufall()*60, z:-14+zufall()*30, y:.06+Math.pow(zufall(),2)*1.3, v:1.6+zufall()*2.6, p:zufall()*7, s:.05+zufall()*.13 });
  const im=new THREE.InstancedMesh(GEO.box,basis(0xfff0c4,{transparent:true,opacity:.65,depthWrite:false}),L.length), o=new THREE.Object3D();
  const setze=t=>{ L.forEach((e,i)=>{ const x=(e.x+t*e.v)%60-30, z=e.z+Math.sin(t*.8+e.p)*.6; o.position.set(x,e.y+Math.sin(t*2.2+e.p)*.05,z); o.rotation.set(0,Math.cos(t*.8+e.p)*-.2,0); o.scale.set(e.s*1.7,.018,.025); if(Math.abs(x)<2.4 && z<-12.7) o.scale.set(0,0,0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; };
  setze(0); im.frustumCulled=false; k.scene.add(im); k.anim.push(setze);
}
function geier(k){
  const koerper=0x5a3a22, spitze=0x2c1c10, hell=0xf0e4cc;
  /* flacher Umriss in der Ebene x/z */
  const flach=(par,punkte,farbe,y)=>{ const m=platte(par,punkte,.04,farbe,0,y,0); m.rotation.x=Math.PI/2; return m; };
  for(let i=0;i<4;i++){ const g=gruppe(k.scene,0,5.2,-8); g.scale.setScalar(.55);
    const r=gruppe(g,0,0,0); ball(r,.2,koerper,0,0,0,2,.75,.8); ball(r,.13,hell,.38,.03,0); ball(r,.1,0xe0a890,.54,.08,0); kegel(r,.045,.13,0xe8b030,.67,.06,0).rotation.z=-Math.PI/2;
    flach(r,[[-.28,.08],[-.72,.24],[-.64,.08],[-.76,0],[-.64,-.08],[-.72,-.24],[-.28,-.08]],spitze,.02); verschmelze(r);
    /* spitz zulaufende Flügel mit gespreizten Federn ("Fingern") */
    const fl=[-1,1].map(s=>{ const f=gruppe(g,0,.03,s*.1);
      const P=L=>L.map(([x,z])=>[x,z*s]);
      flach(f,P([[.24,0],[.27,.55],[.1,1.02],[-.2,.98],[-.34,.55],[-.24,0]]),koerper,0);
      flach(f,P([[.1,.98],[.07,1.34],[-.01,1.62],[-.02,1.26],[-.09,1.14],[-.13,1.54],[-.15,1.15],[-.2,1.08],[-.28,1.38],[-.26,1.03],[-.31,.96],[-.45,1.14],[-.3,.78],[-.2,.96]]),spitze,.004);
      verschmelze(f); return f; });
    const seite=i<2?-1:1, w0=i*3.1+seite, rx=3.6+(i%2)*1.2, rz=2+(i%2)*.8;
    k.anim.push(t=>{ const w=t*(.24+i*.015)+w0; g.position.set(seite*11.4+Math.cos(w)*rx,5+(i%2)*.45+Math.sin(t*.7+i)*.15,-7.6+Math.sin(w)*rz); g.rotation.y=Math.atan2(-Math.cos(w)*rz,-Math.sin(w)*rx);
      const s=.1+Math.sin(t*2.2+i*1.7)*.24; fl[0].rotation.x=s; fl[1].rotation.x=-s; }); }
}
function eidechse(k,weg,tempo,start){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), r=gruppe(g,0,0,0), F=0x4a9a44, D=0x2c6a2c;
  ball(r,.17,F,0,.13,0,1.9,.65,.85); ball(r,.11,F,.38,.16,0,1.35,.75,.95); [-1,1].forEach(s=>ball(r,.03,SCHWARZ,.43,.22,s*.08)); [-.14,.04,.2].forEach(x=>ball(r,.045,0xe8d040,x,.23,0));
  const schwanz=gruppe(g,-.28,.1,0); strich(schwanz,[0,0,0],[-.28,-.02,.05],.06,F); strich(schwanz,[-.28,-.02,.05],[-.52,-.04,-.03],.035,D);
  const beine=[[.17,1],[.17,-1],[-.17,1],[-.17,-1]].map(([x,s])=>{ const b=gruppe(g,x,.11,s*.1); strich(b,[0,0,0],[.05,-.07,s*.19],.032,D); ball(b,.045,D,.07,-.08,s*.2,1.3,.5,1); return b; });
  verschmelze(r);
  k.anim.push(t=>{ schwanz.rotation.y=Math.sin(t*9+start)*.4; beine.forEach((b,i)=>b.rotation.y=Math.sin(t*14+(i%3?3.14:0))*.45); });
  laeufer(k,g,weg,tempo,start,10);
}

/* ---------- Gegenstände ---------- */
function kamelKarim(g,k){ GRAB.kamel(g,k,-.5,0,0,1); }
function forscherzelt(g,k){
  platte(g,[[-2.05,0],[2.05,0],[0,2.82]],2.9,ZELT2,0,0,-1.45);
  [-1,1].forEach(s=>{ const w=Math.atan2(2.9,2.1), d=gruppe(g,s*1.06,1.45,0); d.rotation.z=-s*w;
    box(d,3.62,.08,3.2,ZELT,0,0,0); box(d,.16,.09,3.23,ROT,-s*1.55,0,0); [-1.35,1.35].forEach(z=>box(d,3.55,.1,.09,ZELT2,0,0,z)); });
  walze(g,.07,3.3,HOLZ2,0,2.93,0).rotation.x=Math.PI/2;
  /* Eingang mit Lampe drinnen */
  platte(g,[[-.95,0],[.95,0],[0,2.15]],.04,0x4a3218,0,0,1.45);
  box(g,.9,.14,.03,0x2a6a8a,0,.09,1.51);
  const klappe=(s,phase)=>{ const f=gruppe(g,0,2.15,1.52+(s>0?.012:0)); f.userData.lebendig=true; platte(f,[[0,0],[s*.98,-2.13],[s*.4,-2.13]],.035,ZELT,0,0,0); strich(f,[s*.4,-2.13,.05],[0,0,.05],.025,ROT);
    k.anim.push(t=>{ f.rotation.x=-(.07+Math.max(0,Math.sin(t*2.3+phase))*.1+Math.sin(t*5.1+phase)*.025); }); };
  klappe(-1,0); klappe(1,1.9);
  /* Abspannseile und Heringe */
  [-1,1].forEach(s=>[-1.5,1.5].forEach(z=>{ strich(g,[s*1.02,1.5,z],[s*2.3,.1,z*1.18],.018,HOLZ2); walze(g,.055,.28,HOLZ2,s*2.32,.12,z*1.18).rotation.z=-s*.5; }));
  [-1.5,1.55].forEach(z=>{ walze(g,.05,z>0?.95:.45,HOLZ2,0,z>0?3.35:3.1,z); });
  ball(g,.09,GRAB.GOLD,0,3.85,1.55); wimpel(g,k,.04,3.62,1.55,ROT,2.2);
}
function spaten(g){
  ball(g,1,0xc89850,0,0,0,.85,.32,.68); ball(g,.45,0xb88844,.45,.04,.3,1,.55,.9); ball(g,.35,0xd8aa60,-.5,.05,-.2,1,.6,1);
  [[.75,.5],[-.7,.45],[-.35,.62],[.2,.66]].forEach(([x,z],i)=>ball(g,.09+(i%2)*.04,FELS2,x,.07,z,1.2,.7,1));
  const s=gruppe(g,0,.18,0); s.rotation.z=-.2;
  /* Blatt aus Metall, unten im Sand */
  platte(s,[[-.36,.7],[.36,.7],[.35,.22],[.2,-.02],[-.2,-.02],[-.35,.22]],.09,METALL,0,0,-.045);
  box(s,.76,.08,.14,METALL2,0,.71,0); walze(s,.1,.34,METALL2,0,.86,0);
  walze(s,.075,1.15,HOLZ3,0,1.52,0); walze(s,.095,.2,ROT,0,2.08,0);
  [-1,1].forEach(v=>strich(s,[0,2.12,0],[v*.24,2.38,0],.05,ROT)); strich(s,[-.3,2.4,0],[.3,2.4,0],.075,HOLZ2);
}
function wasserfass(g){
  [-.45,.45].forEach(x=>box(g,.24,.24,1.55,HOLZ2,x,.12,0));
  rohr(g,.79,.63,.72,HOLZ,0,.6,0,18); rohr(g,.63,.79,.72,HOLZ,0,1.32,0,18);
  for(let i=0;i<14;i++){ const a=i/14*Math.PI*2+.22, p=(r,y)=>[Math.sin(a)*r,y,Math.cos(a)*r]; strich(g,p(.638,.26),p(.795,.96),.014,HOLZ2); strich(g,p(.795,.96),p(.638,1.66),.014,HOLZ2); }
  [[.38,.69],[.74,.765],[1.18,.765],[1.54,.69]].forEach(([y,r])=>ring(g,r,.045,METALL2,0,y,0).rotation.x=Math.PI/2);
  walze(g,.6,.05,0x3a9ad0,0,1.69,0); walze(g,.34,.056,0x72c8ec,-.08,1.694,.08); ring(g,.62,.065,HOLZ2,0,1.7,0).rotation.x=Math.PI/2;
  /* halb aufgelegter Holzdeckel */
  const deckel=gruppe(g,-.44,1.83,-.1); deckel.rotation.z=.05;
  walze(deckel,.66,.1,HOLZ3,0,0,0); ring(deckel,.63,.035,HOLZ2,0,.04,0).rotation.x=Math.PI/2; [-.34,0,.34].forEach(x=>box(deckel,.025,.012,x?1.08:1.26,HOLZ2,x,.055,0));
  box(deckel,.9,.07,.14,HOLZ,0,.085,0); [-.18,.18].forEach(x=>walze(deckel,.04,.14,HOLZ2,x,.17,0)); walze(deckel,.05,.46,HOLZ2,0,.25,0).rotation.z=Math.PI/2;
  const t=bild(128,128,c=>{ c.fillStyle='#f4ecd4'; c.beginPath(); c.arc(64,64,60,0,7); c.fill(); c.strokeStyle='#4a2a12'; c.lineWidth=6; c.stroke();
    c.fillStyle='#1f78c0'; c.beginPath(); c.moveTo(64,18); c.bezierCurveTo(78,44,96,60,96,80); c.arc(64,80,32,0,Math.PI); c.bezierCurveTo(32,60,50,44,64,18); c.fill(); c.fillStyle='#c4ecff'; c.beginPath(); c.ellipse(50,80,7,13,.4,0,7); c.fill(); });
  const m=new THREE.Mesh(new THREE.CircleGeometry(.34,24),new THREE.MeshLambertMaterial({map:t})); m.position.set(0,1.1,.805); m.rotation.x=-.22; g.add(m);
  /* Zapfhahn und Becher */
  walze(g,.07,.24,GRAB.GOLD,0,.52,.79).rotation.x=Math.PI/2; walze(g,.05,.16,GRAB.GOLD,0,.46,.9); box(g,.24,.06,.07,ROT,0,.62,.85);
  walze(g,.14,.28,METALL,.42,.14,.98); ring(g,.08,.025,METALL,.57,.15,.98);
}
function grabungsplan(g){
  [-1.5,1.5].forEach(x=>{ walze(g,.1,2.95,HOLZ2,x,1.47,0); walze(g,.15,.14,HOLZ3,x,2.98,0); [0,1,2].forEach(i=>ball(g,.2,FELS2,x+Math.cos(i*2.1)*.2,.09,Math.sin(i*2.1)*.2,1,.7,1)); });
  box(g,2.82,1.95,.07,0xf4e8c4,0,1.75,0); walze(g,.08,3.1,HOLZ,0,2.75,.02).rotation.z=Math.PI/2; walze(g,.08,3.1,HOLZ,0,.76,.02).rotation.z=Math.PI/2;
  const t=bild(512,352,c=>{ c.fillStyle='#f6eac6'; c.fillRect(0,0,512,352);
    c.strokeStyle='rgba(60,110,150,.28)'; c.lineWidth=2; for(let x=32;x<512;x+=32){ c.beginPath(); c.moveTo(x,0); c.lineTo(x,352); c.stroke(); } for(let y=32;y<352;y+=32){ c.beginPath(); c.moveTo(0,y); c.lineTo(512,y); c.stroke(); }
    c.strokeStyle='#4a3014'; c.lineWidth=7; c.strokeRect(48,70,104,92); c.strokeRect(152,98,96,34); c.strokeRect(248,64,120,110); c.strokeRect(288,174,40,66); c.strokeRect(240,240,136,76);
    c.fillStyle='#e8b830'; c.fillRect(282,96,52,46); c.fillStyle='#b0783a'; c.beginPath(); c.moveTo(390,150); c.lineTo(438,64); c.lineTo(488,150); c.fill(); c.fillStyle='#d8a060'; c.beginPath(); c.moveTo(390,150); c.lineTo(438,64); c.lineTo(444,150); c.fill();
    c.strokeStyle='#d02818'; c.lineWidth=7; c.setLineDash([16,12]); c.beginPath(); c.moveTo(60,310); c.quadraticCurveTo(110,200,100,118); c.lineTo(296,115); c.stroke(); c.setLineDash([]);
    c.lineWidth=10; c.beginPath(); c.moveTo(294,262); c.lineTo(332,296); c.moveTo(332,262); c.lineTo(294,296); c.stroke();
    c.strokeStyle='#1f78b8'; c.lineWidth=12; c.beginPath(); c.moveTo(512,220); c.bezierCurveTo(440,210,470,300,404,352); c.stroke();
    GRAB.zeichen(c,2,48,38,40,'#a83820'); GRAB.zeichen(c,4,190,272,56,'#1f7a50'); c.fillStyle='#4a3014'; for(let i=0;i<3;i++) c.fillRect(100,24+i*13,110-i*22,5); });
  GRAB.tafel(g,t,2.68,1.8,0,1.75,.042);
  [-1,1].forEach(a=>[2.58,.93].forEach(y=>ball(g,.065,ROT,a*1.22,y,.07)));
}
function steintafel(g){
  const F=0xc4ae82;
  box(g,2.25,.32,.9,0x9a845c,0,.16,0); box(g,1.8,1.7,.4,F,0,1.17,0); walze(g,.9,.398,F,0,2.02,0).rotation.x=Math.PI/2;
  ring(g,.9,.08,0x8a7250,0,2.02,0,Math.PI); [-.9,.9].forEach(x=>strich(g,[x,.32,0],[x,2.02,0],.08,0x8a7250));
  const t=bild(320,384,c=>{ c.fillStyle='#c4ae82'; c.fillRect(0,0,320,384);
    for(let i=0;i<260;i++){ c.fillStyle=i%2?'rgba(90,66,36,.2)':'rgba(255,240,200,.22)'; c.fillRect(zufall()*314,zufall()*378,4,3); }
    GRAB.zeichen(c,2,160,54,76,'#8a3418');
    c.strokeStyle='#6a5232'; c.lineWidth=4; [102,196,290].forEach(y=>{ c.beginPath(); c.moveTo(26,y); c.lineTo(294,y); c.stroke(); });
    [3,4,0,1,6,7].forEach((a,i)=>GRAB.zeichen(c,a,66+(i%3)*94,150+Math.floor(i/3)*94,66,'#3a2008'));
    c.fillStyle='#4a3418'; for(let i=0;i<3;i++) c.fillRect(46+i*10,316+i*18,228-i*20,6); });
  GRAB.tafel(g,t,1.52,1.82,0,1.42,.212);
  /* Ritze */
  strich(g,[.88,.9,.215],[.66,1.08,.215],.022,DUNKEL); strich(g,[.66,1.08,.215],[.74,1.24,.215],.018,DUNKEL);
  ball(g,.22,FELS2,-1.05,.14,.42,1,.7,1); ball(g,.16,FELS,1.08,.1,.46,1.1,.7,1);
}
function zeichenblock(g){
  const F=0xe0d4b4;
  box(g,1.95,.16,1.4,0x9a8a66,0,.08,0); box(g,1.75,1.05,1.2,F,0,.68,0); box(g,1.86,.17,1.3,0xc4b490,0,1.28,0);
  const mal=(w,h,arten,farben)=>bild(w,h,c=>{ c.fillStyle='#e8dcba'; c.fillRect(0,0,w,h); c.strokeStyle='#7a6640'; c.lineWidth=8; c.strokeRect(8,8,w-16,h-16);
    arten.forEach((a,i)=>GRAB.zeichen(c,a,(i+.5)*w/arten.length,h/2,Math.min(h*.7,w/arten.length*.76),farben[i])); });
  GRAB.tafel(g,mal(384,224,[5,2,1],['#1f4f9a','#b03818','#1f7a60']),1.55,.9,0,.68,.605);
  const o=GRAB.tafel(g,mal(384,256,[0,3,7],['#5a3018','#1f4f9a','#a83820']),1.65,1.1,0,1.368,0); o.rotation.x=-Math.PI/2;
  [-1,1].forEach(s=>{ const t=GRAB.tafel(g,mal(192,224,[s>0?6:4],['#5a3018']),.9,.9,s*.88,.68,0); t.rotation.y=s*Math.PI/2; });
}
function fundkiste(g){
  const F=0xa87238;
  box(g,2,.12,1.35,HOLZ2,0,.14,0); [-.62,.62].forEach(z=>box(g,2,.76,.11,F,0,.56,z)); [-.95,.95].forEach(x=>box(g,.11,.76,1.24,F,x,.56,0));
  [-1,1].forEach(x=>[-.66,.66].forEach(z=>box(g,.17,.92,.15,HOLZ2,x*.96,.46,z)));
  [.36,.74].forEach(y=>box(g,1.78,.06,.04,HOLZ2,0,y,.69));
  /* Stroh und Scherben */
  box(g,1.8,.3,1.14,0xe8c050,0,.62,0);
  for(let i=0;i<22;i++){ const x=-.8+zufall()*1.6, z=-.48+zufall()*.96; strich(g,[x,.76,z],[x+(zufall()-.5)*.6,.84+zufall()*.1,z+(zufall()-.5)*.4],.016,i%2?0xf6d870:0xd0a438); }
  /* große Scherben mit Muster */
  [[-.5,.2,-.3,.35,0],[.05,-.22,.25,-.5,1],[.55,.2,.1,.2,2]].forEach(([x,z,rz,ry,i])=>{ const s=gruppe(g,x,.82,z); s.rotation.set(-.18,ry,rz);
    platte(s,[[-.32,0],[.3,0],[.36,.3],[.12,.52],[.02,.34],[-.24,.46]],.08,i===1?0xd88a50:TON,0,0,0); box(s,.5,.07,.02,i===2?0x1f6a80:DUNKEL,.01,.16,.09); box(s,.4,.04,.02,0xf4dca8,0,.27,.09); });
  const topf=GRAB.krug(g,-.5,-.3,.7,0xd89a60); topf.position.y=.72;
  ball(g,.15,GRAB.GOLD,.5,.88,-.3,1,.45,1); ball(g,.13,0x1fa8a0,.1,.86,-.34);
  /* Pinsel quer über dem Rand */
  strich(g,[.32,.99,.65],[.78,.99,.34],.045,ROT); box(g,.18,.11,.14,METALL,.85,.99,.29).rotation.y=.6; box(g,.22,.09,.17,0xf0dcb0,1.0,.99,.19).rotation.y=.6;
}
function fernglas(g){
  const D=0x1f4a34;
  [0,2.09,4.19].forEach(a=>{ strich(g,[0,1.5,0],[Math.sin(a)*.7,.05,Math.cos(a)*.7],.06,HOLZ); ball(g,.1,METALL2,Math.sin(a)*.7,.07,Math.cos(a)*.7); strich(g,[0,.65,0],[Math.sin(a)*.42,.64,Math.cos(a)*.42],.02,METALL2); });
  walze(g,.15,.2,METALL2,0,1.55,0); walze(g,.07,.28,METALL2,0,1.74,0);
  const kopf=gruppe(g,0,2.02,0); kopf.rotation.x=.08;
  box(kopf,.34,.16,.46,D,0,0,0); walze(kopf,.07,.3,GRAB.GOLD,0,.16,.08).rotation.x=Math.PI/2;
  [-1,1].forEach(s=>{ const x=s*.34;
    walze(kopf,.24,.7,GRUEN,x,0,-.06).rotation.x=Math.PI/2; walze(kopf,.31,.34,GRUEN,x,0,-.54).rotation.x=Math.PI/2;
    ring(kopf,.29,.045,GRAB.GOLD,x,0,-.72); walze(kopf,.25,.03,0x1c3c58,x,0,-.72).rotation.x=Math.PI/2; ball(kopf,.06,basis(0xcceeff),x-.08,.09,-.74,1,1,.3);
    ring(kopf,.25,.035,GRAB.GOLD,x,0,-.34); walze(kopf,.15,.3,SCHWARZ,x,0,.43).rotation.x=Math.PI/2; walze(kopf,.19,.12,SCHWARZ,x,0,.62).rotation.x=Math.PI/2; walze(kopf,.11,.025,0x6aaac8,x,0,.685).rotation.x=Math.PI/2; });
}
function handkarren(g){
  const w=gruppe(g,-.45,0,0), F=0xb07c42;
  box(w,2.3,.14,1.35,HOLZ,0,.82,0);
  [-.64,.64].forEach(z=>{ box(w,2.36,.2,.1,F,0,1.0,z); box(w,2.36,.17,.1,HOLZ3,0,1.24,z); [-1.12,0,1.12].forEach(x=>box(w,.12,.55,.13,HOLZ2,x,1.1,z)); });
  [-1.14,1.14].forEach(x=>box(w,.1,.42,1.2,F,x,1.07,0));
  /* zwei große Räder mit Speichen */
  walze(w,.07,1.9,METALL2,-.12,.66,0).rotation.x=Math.PI/2;
  [-.9,.9].forEach(z=>{ ring(w,.58,.085,HOLZ2,-.12,.66,z); ring(w,.665,.025,METALL2,-.12,.66,z); for(let i=0;i<4;i++){ const a=i*Math.PI/4, c=Math.cos(a)*.56, s=Math.sin(a)*.56; strich(w,[-.12-c,.66-s,z],[-.12+c,.66+s,z],.04,HOLZ3); } walze(w,.14,.18,GRAB.GOLD,-.12,.66,z).rotation.x=Math.PI/2; });
  /* Deichsel bis zum Boden, Stütze hinten */
  [-.48,.48].forEach(z=>strich(w,[1.05,.82,z],[2.42,.09,z],.065,HOLZ3)); strich(w,[2.42,.09,-.62],[2.42,.09,.62],.08,HOLZ2);
  [-.45,.45].forEach(z=>strich(w,[-.98,.78,z],[-1.06,.05,z],.06,HOLZ2));
  /* Ladung: Sandhaufen, Decke und Sieb */
  ball(w,.5,0xc4904c,-.45,.92,0,1.2,.85,1); ball(w,.28,0xd8a860,-.2,1.12,.2,1.1,.75,1); ball(w,.09,FELS2,-.6,1.34,.12);
  walze(w,.23,1.1,ROT,.42,1.14,0).rotation.x=Math.PI/2; [-.34,.34].forEach(z=>ring(w,.24,.03,WEISS,.42,1.14,z));
  const sieb=gruppe(w,.88,1.34,.05); sieb.rotation.z=.55; ring(sieb,.38,.065,HOLZ3,0,0,0).rotation.x=Math.PI/2; [-.2,-.07,.07,.2].forEach(v=>{ box(sieb,.66,.018,.018,METALL2,0,0,v); box(sieb,.018,.018,.66,METALL2,v,0,0); });
}

function baue(k){
  const sc=k.scene;
  sc.add(new THREE.HemisphereLight(0xfff2d8,0x9a7440,.72));
  const sonne=new THREE.DirectionalLight(0xffe6b0,.58); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  boden(k);
  const tuer=eingang(k);
  begrenzung(k);
  landschaft(k);
  palmen(k);
  ausstattung(k);
  bewuchs(k);
  wehsand(k);
  geier(k);
  eidechse(k,[[8.2,7.4],[10.8,6.6],[11.6,8.7],[9.2,9.4]],.9,0);
  eidechse(k,[[-10.8,-2.6],[-8.2,-1.8],[-8.8,-.2],[-10.6,-.8]],.75,2.4);
  katze(k,[[-8.2,7],[-3.6,8.4],[-.6,10.4],[-6.6,10.2]],1.3);
  flacker(k,-16.1,1.4,-6.3,0xffb850,.3,4);
  return { tuer, start:[0,3.4] };
}
const verstecke=[[-12.6,-10],[-3.6,-11.2],[2,-11.4],[12.2,-10.8],[15.8,-8.6],[1.6,-5.8],[10.4,-3.8],[-9,-4],[-13.4,-1.6],[16,-.8],[-15.6,2.8],[-3.2,1],[3.4,1.4],[15.8,5.8],[7,7.8],[1.4,11.6],[-4.6,5.2],[-13,10],[-16,8.2],[8.6,-8.8]];
const gegenstaende=[
  { x:6, z:-3.5, steh:[5.9,-1.2], kasten:[4.2,1.8], treffer:[4.3,3.8,1.8], baue:kamelKarim },
  { x:-11, z:-7.6, steh:[-11,-4.8], kasten:[4.9,3.7], treffer:[4.6,3.7,3.4], baue:forscherzelt },
  { x:4.3, z:4.6, steh:[2.5,5.6], r:.85, treffer:[1.8,2.7,1.4], baue:spaten },
  { x:-7.6, z:2.8, steh:[-5.6,3.6], r:.95, treffer:[2.3,2.2,1.9], baue:wasserfass },
  { x:12.8, z:-7.8, dreh:-.32, steh:[12.1,-5.6], kasten:[3.3,1.3], treffer:[3.3,3.1,.8], baue:grabungsplan },
  { x:-5.6, z:-9.8, dreh:.12, steh:[-5.4,-7.9], kasten:[2.3,1.0], treffer:[2.3,3,.9], baue:steintafel },
  { x:-11.8, z:5.8, dreh:.28, steh:[-9.8,6.2], kasten:[2.1,1.8], treffer:[2,1.6,1.5], baue:zeichenblock },
  { x:11.4, z:3.2, dreh:-.2, steh:[9.2,3.9], kasten:[2.3,1.8], treffer:[2.4,1.7,1.6], baue:fundkiste },
  { x:14.2, z:-1.6, dreh:-.75, steh:[12.4,-.6], r:.82, treffer:[1.8,2.5,1.8], baue:fernglas },
  { x:-3.6, z:-3.4, dreh:-.18, steh:[-3.4,-1.1], kasten:[4,2.3], treffer:[4,1.8,2], baue:handkarren }
];
return { titel:'Die Wüste vor dem Grab', himmel:0x8ec8ec, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 2: Die Grabkammer. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Warmes Ockerlicht, oben an den Wänden ein dunkelblauer Sternenfries mit funkelnden Sternen, in der Mitte das Podest mit dem goldenen Sarg.
   Ausgang: die bemalte Geheimwand rechts hinten. Ihre zwei Hälften schieben sich in die Mauer, dahinter liegt ein heller Gang. */
RAEUME3D.grabkammer[1] = (function(){
const { SAND, SAND2, SAND3, STEIN, DUNKEL, HOLZ, HOLZ2, GOLD, GOLD2, TUERKIS, BLAU, ROT, SCHWARZ } = GRAB;
const CREME=0xeadfbc, LEINEN=0xf6f0e0;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* leuchtende Teile (ohne Schatten) */
const feld=(p,w,h,d,c,x,y,z)=>{ const t=box(p,w,h,d,basis(c),x,y,z); t.castShadow=false; return t; };
/* liegende Walze entlang x oder z */
const quer=(p,r,l,c,x,y,z,achse)=>{ const w=walze(p,r,l,c,x,y,z); if(achse==='x') w.rotation.z=Math.PI/2; else w.rotation.x=Math.PI/2; return w; };
/* Wanddeko wirft keinen Schatten */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* fünfzackiger Stern als flache Form (Radius r) */
function sternForm(r){
  const s=new THREE.Shape();
  for(let i=0;i<10;i++){ const a=Math.PI/2+i*Math.PI/5, q=i%2?r*.44:r, x=Math.cos(a)*q, y=Math.sin(a)*q; if(i) s.lineTo(x,y); else s.moveTo(x,y); }
  return new THREE.ShapeGeometry(s);
}
/* flache Platte aus einem Umriss [[x,y],...], Dicke d, Vorderseite bei z+d */
function platte(p,punkte,d,c,x,y,z){
  const s=new THREE.Shape(); punkte.forEach((q,i)=>i?s.lineTo(q[0],q[1]):s.moveTo(q[0],q[1]));
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:false}),mat(c)); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; p.add(m); return m;
}
/* Flamme (bleibt beweglich), Fuß bei (x,y,z) */
function flamme(k,p,x,y,z,gr){
  const f=gruppe(p,x,y,z); f.userData.lebendig=true;
  const a=kegel(f,.15*gr,.5*gr,basis(0xff8a1e),0,.25*gr,0), b=kegel(f,.08*gr,.3*gr,basis(0xffe880),0,.17*gr,.06*gr); a.castShadow=b.castShadow=false;
  const s=schein(f,'rgba(255,175,75,.75)',0,.25*gr,.08,1.5*gr);
  k.anim.push(t=>{ const w=1+Math.sin(t*12+x*3+z)*.13+Math.sin(t*7.7+z*2)*.09; a.scale.y=.5*gr*w; b.scale.y=.3*gr*(2-w); s.scale.set(1.5*gr*w,1.5*gr*w,1); });
}

/* ---------- Ausgang: die bemalte Geheimwand ---------- */
const TX=10, TB=3.6, TH=3.5;
function baueAusgang(k,sc,hinten){
  const Z=-13.5;
  /* heller Gang dahinter */
  const gang=gruppe(hinten,TX,0,0);
  box(gang,4.2,.1,4.4,0xc9a266,0,-.052,-15.7);
  [-1,1].forEach(s=>{ box(gang,.2,3.8,3.9,SAND2,s*2.0,1.9,-15.97); [.9,2.6].forEach(y=>feld(gang,.04,.1,3.8,y>2?0x40c8c0:0xe06a40,s*1.88,y,-15.97));
    [-14.5,-15.8,-17.1].forEach(z=>box(gang,.24,3.7,.22,SAND3,s*1.82,1.85,z)); });
  box(gang,4.2,.16,3.9,SAND3,0,3.84,-15.97);
  const hell=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,130,8,128,130,185); v.addColorStop(0,'#ffffff'); v.addColorStop(.4,'#fff2b8'); v.addColorStop(1,'#d88a30'); g.fillStyle=v; g.fillRect(0,0,256,256);
    /* Stufen nach oben ins Tageslicht */
    for(let i=0;i<6;i++){ g.fillStyle='rgba(150,90,30,'+(.55-i*.08)+')'; g.fillRect(40+i*13,236-i*20,176-i*26,9); } });
  const ende=new THREE.Mesh(new THREE.PlaneGeometry(4.2,3.8),new THREE.MeshBasicMaterial({map:hell})); ende.position.set(0,1.9,-17.86); gang.add(ende);
  verschmelze(gang); gang.visible=false;
  /* goldener Rahmen mit dunkelblauem Außenrand, damit er sich von der Sandwand abhebt */
  const r=gruppe(hinten,TX,0,Z), G=mat(0xf8c426,{emissive:0x5c3c00});
  [-1,1].forEach(s=>box(r,.16,TH+.42,.14,0x14286a,s*(TB/2+.43),(TH+.42)/2,.07));
  [-1,1].forEach(s=>{ box(r,.36,TH,.36,G,s*(TB/2+.18),TH/2,.18); box(r,.5,.26,.5,GOLD2,s*(TB/2+.2),.13,.25); [.6,.85,2.75,3.0].forEach((y,i)=>box(r,.38,.1,.38,i%2?ROT:BLAU,s*(TB/2+.18),y,.19)); });
  box(r,TB+.9,.3,.42,G,0,TH+.15,.21); box(r,TB+1.2,.12,.52,GOLD2,0,TH+.36,.26);
  for(let i=-5;i<=5;i++) box(r,.2,.14,.05,i%2?TUERKIS:BLAU,i*.38,TH+.15,.43);
  /* Sonnenscheibe über der Mitte */
  const sonne=walze(r,.27,.1,ROT,0,TH+.34,.55); sonne.rotation.x=Math.PI/2; ring(r,.28,.05,G,0,TH+.34,.6);
  verschmelze(r);
  /* zwei goldene Türhälften mit Zeichen und Beschlägen, sie liegen knapp hinter der Wandfläche und gleiten in die Mauer */
  const haelften=[-1,1].map(s=>{ const h=gruppe(hinten,TX+s*TB/4,0,Z-.21), B2=TB/2;
    box(h,B2,TH,.28,G,0,TH/2,0);
    const tex=bild(256,512,(c)=>{ const v=c.createLinearGradient(0,0,256,512); v.addColorStop(0,'#ffe27a'); v.addColorStop(.5,'#f2b822'); v.addColorStop(1,'#ffd650'); c.fillStyle=v; c.fillRect(0,0,256,512);
      c.strokeStyle='#8a5c08'; c.lineWidth=8; c.strokeRect(14,14,228,484);
      for(let i=0;i<2;i++) for(let j=0;j<4;j++) GRAB.zeichen(c,i*3+j*5+(s>0?2:0),76+i*104,80+j*118,58,(i+j)%2?'#14408a':'#7a3a08'); });
    const m=new THREE.Mesh(new THREE.PlaneGeometry(B2-.14,TH-.14),new THREE.MeshLambertMaterial({map:tex,emissive:0x2c1e00})); m.position.set(0,TH/2,.146); h.add(m);
    /* Beschläge: drei Bänder mit Nieten, Kanten und ein großer Griffring */
    [.2,1.22,2.36,TH-.2].forEach(y=>{ box(h,B2-.04,.13,.04,GOLD2,0,y,.158); [-.68,-.34,0,.34,.68].forEach(x=>ball(h,.055,G,x,y,.18,1,1,.5)); });
    [-1,1].forEach(v=>box(h,.08,TH-.04,.04,G,v*(B2/2-.045),TH/2,.162));
    walze(h,.13,.04,GOLD2,-s*.5,1.8,.165).rotation.x=Math.PI/2; ring(h,.2,.035,G,-s*.5,1.66,.172);
    verschmelze(h); return h; });
  /* Pfeiler mit Zahlenschloss rechts neben der Wand */
  const pf=gruppe(hinten,12.9,0,Z);
  box(pf,.86,2.8,.4,SAND3,0,1.4,.2); box(pf,1.06,.2,.56,DUNKEL,0,.1,.28); box(pf,1.04,.18,.52,GOLD2,0,2.88,.26);
  box(pf,1.14,.96,.06,BLAU,0,2.02,.42); [-1,1].forEach(s=>box(pf,.07,.96,.08,GOLD,s*.54,2.02,.44));
  walze(pf,.2,.12,DUNKEL,0,3.04,.26);
  verschmelze(pf);
  const lm=basis(0xff5a3a), lampe=ball(hinten,.17,lm,12.9,3.2,Z+.26); lampe.castShadow=false;
  const schloss=GRAB.zahlenschloss(hinten,12.9,1.98,Z+.57); schloss.scale.setScalar(1.05); verschmelze(schloss);
  const haken=gruppe(hinten,12.9,2.02,Z+.47);
  feld(haken,.8,.72,.03,0x1f9a4a,0,0,0);
  [[-.17,-.07,.34,-.75],[.11,.02,.58,.85]].forEach(([x,y,l,w])=>{ const t=feld(haken,l,.13,.03,0xeafff0,x,y,.035+(w>0?.009:0)); t.rotation.z=w; });
  verschmelze(haken); haken.visible=false;
  /* Schwelle: goldene Streifen führen zur Wand */
  const schwelle=gruppe(sc,TX,0,0);
  box(schwelle,TB+.2,.04,.5,GOLD2,0,.02,-13.1);
  [-1,1].forEach(s=>{ box(schwelle,.12,.016,3.2,GOLD,s*1.7,.012,-11.4); box(schwelle,.08,.016,3.2,TUERKIS,s*1.48,.012,-11.4); });
  ohneSchatten(schwelle); verschmelze(schwelle);
  const licht=new THREE.PointLight(0xffefc0,0,13,1.5); licht.position.set(TX,2.6,-15); sc.add(licht);
  k.kasten(10.65,-13.15,5.7,.75);
  return ausgang(k,{ name:'Geheimwand', einfach:'Goldene Tür', steh:[TX,-10.9], durch:[TX,-15.9],
    treffer:{x:TX+.6,y:2.1,z:-13,b:5.6,h:4.2,t:1}, schildOben:[TX,4.7,-12.4], glanz:[12.9,2.0,-12.6],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.06)/.9)), e=a*a*(3-2*a);
      haelften.forEach((h,i)=>{ const s=i?1:-1; h.position.x=TX+s*(TB/4+e*(TB/2-.04)); });
      gang.visible=auf>.02; licht.intensity=1.6*auf; lm.color.setHex(auf>.15?0x5aff7a:0xff5a3a); schloss.visible=auf<.04; haken.visible=auf>=.04; } });
}

/* ---------- Sternenfries oben an den Wänden mit funkelnden Sternen ---------- */
function sternenfries(k,wand,seite){
  const laenge=seite==='hinten'?36:27, g=gruppe(wand,0,0,0);
  if(seite==='hinten') g.position.z=-13.47; else { const v=seite==='links'?-1:1; g.position.x=v*17.97; g.rotation.y=-v*Math.PI/2; }
  const t=bild(512,128,(c)=>{ const v=c.createLinearGradient(0,0,0,128); v.addColorStop(0,'#0a1234'); v.addColorStop(1,'#203a78'); c.fillStyle=v; c.fillRect(0,0,512,128);
    for(let i=0;i<110;i++){ c.fillStyle='rgba(255,236,170,'+(.25+zufall()*.5)+')'; c.fillRect(zufall()*508,6+zufall()*108,2+zufall()*2,2+zufall()*2); }
    c.fillStyle='#e8b830'; c.fillRect(0,118,512,10); c.fillStyle='#1fa8a0'; c.fillRect(0,112,512,4); });
  t.wrapS=THREE.RepeatWrapping; t.repeat.set(laenge/9,1);
  const f=new THREE.Mesh(new THREE.PlaneGeometry(laenge,2.12),new THREE.MeshBasicMaterial({map:t})); f.position.y=4.96; g.add(f);
  const n=Math.round(laenge*1.7), liste=[];
  for(let i=0;i<n;i++) liste.push({ x:-laenge/2+(i+.5)*laenge/n+(zufall()-.5)*.3, y:4.16+((i*7)%10)*.17+zufall()*.08, s:(i%5===0?1.5:.75)+zufall()*.35, p:zufall()*6.3, v:1.4+zufall()*2.2, w:zufall()*.5-.25 });
  const im=new THREE.InstancedMesh(sternForm(.14),basis(0xffdc6a),n), o=new THREE.Object3D(); im.frustumCulled=false; g.add(im);
  const setze=t=>{ liste.forEach((q,i)=>{ const a=q.s*(.8+.28*Math.sin(t*q.v+q.p)); o.position.set(q.x,q.y,.02); o.rotation.set(0,0,q.w); o.scale.set(a,a,1); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; };
  setze(0); k.anim.push(setze);
}

/* ---------- Wandfackel (hängt an der Wand, Blick in den Raum) ---------- */
function fackel(k,wand,x,z,dreh){
  const g=gruppe(wand,x,2.6,z); g.rotation.y=dreh;
  box(g,.34,.6,.08,DUNKEL,0,-.1,.05); strich(g,[0,-.25,.08],[0,-.05,.36],.05,DUNKEL); strich(g,[0,-.35,.3],[0,.4,.42],.07,HOLZ2);
  rohr(g,.17,.09,.22,GOLD2,0,.46,.43); verschmelze(g);
  flamme(k,g,0,.55,.43,1);
}

/* ---------- Papyrus im Steinkübel ---------- */
function papyrus(k,par,x,z,halme){
  box(par,1.0,.5,1.0,SAND3,x,.25,z); box(par,1.12,.1,1.12,SAND,x,.52,z); box(par,.86,.04,.86,0x4a2e14,x,.58,z); box(par,1.02,.08,1.02,TUERKIS,x,.3,z);
  for(let i=0;i<9;i++){ const a=i*2.4, q=.1+(i%3)*.12, h=1.1+(i%4)*.28, bx=x+Math.cos(a)*q, bz=z+Math.sin(a)*q, sx=x+Math.cos(a)*(q+.22), sz=z+Math.sin(a)*(q+.22);
    strich(par,[bx,.55,bz],[sx,.55+h,sz],.025,0x4a8a30);
    for(let j=0;j<7;j++){ const b=j*.9+i; halme.push([sx+Math.cos(b)*.11,.62+h,sz+Math.sin(b)*.11,.025,.25,.025,j%2?0x6aae3c:0x8cc850,0,Math.sin(b)*.85,-Math.cos(b)*.85]); } }
  k.kreis(x,z,.62);
}

/* ---------- Skarabäus: freundlicher goldblauer Käfer, krabbelt seine Runde ---------- */
function skarabaeus(k){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0);
  [-1,1].forEach(s=>{ ball(r,.3,BLAU,-.08,.23,s*.07,1.35,.7,.82); strich(r,[-.38,.36,s*.16],[.12,.41,s*.14],.018,GOLD); ball(r,.04,TUERKIS,-.14,.42,s*.17); });
  strich(r,[-.45,.34,0],[.22,.43,0],.02,GOLD); ball(r,.2,GOLD,.28,.25,0,.85,.75,1.15); ball(r,.14,BLAU,.47,.24,0,.9,.85,1.1);
  [-1,1].forEach(s=>{ ball(r,.065,0xffffff,.55,.31,s*.09); ball(r,.032,SCHWARZ,.61,.32,s*.095); strich(r,[.52,.34,s*.07],[.72,.48,s*.2],.012,GOLD2); ball(r,.035,GOLD,.72,.48,s*.2); });
  const mund=ring(r,.05,.012,SCHWARZ,.6,.23,0,Math.PI); mund.rotation.set(0,Math.PI/2,Math.PI);
  verschmelze(r);
  const beine=[];
  [-1,1].forEach(s=>[-.24,.05,.3].forEach((x,i)=>{ const b=gruppe(g,x,.2,s*.2); strich(b,[0,0,0],[(i-1)*.1,.03,s*.2],.025,GOLD2); strich(b,[(i-1)*.1,.03,s*.2],[(i-1)*.18,-.18,s*.27],.022,GOLD2); beine.push(b); }));
  g.scale.setScalar(.9);
  k.anim.push(t=>{ beine.forEach((b,i)=>b.rotation.y=Math.sin(t*10+(i%2)*3.14)*.35); });
  laeufer(k,g,[[3.8,1.1],[7.6,.6],[7.9,2.7],[4.8,3.3]],.8,0,12);
}

function baue(k){
  const sc=k.scene;
  const h=GRAB.huelle(k,{ B:36, T:27, H:6, himmelLicht:0xffd998, grund:0x5c3a14, staerke:.74, sonne:0xffcf80, sonneStaerke:.42, band:null,
    wandBild:GRAB.quaderBild([196,148,82],'#5c3e18',7), bodenBild:GRAB.quaderBild([178,136,84],'#5a3e1c',4), oeffnung:{x:TX,b:TB,h:TH} });
  sc.background=new THREE.Color(0x0b1028);
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc,hinten);

  /* ---------- Sternendecke angedeutet ---------- */
  sternenfries(k,hinten,'hinten'); sternenfries(k,links,'links'); sternenfries(k,rechts,'rechts');

  /* ---------- bemalte Wände: Sockelstreifen und lange Bänder mit Bildzeichen ---------- */
  const wh=gruppe(hinten,0,0,0), wl=gruppe(links,0,0,0), wr=gruppe(rechts,0,0,0);
  const band=(par,laenge,hoehe,x,y,z,dreh)=>{ const t=GRAB.zeichenBild(1024,96,18,1); t.wrapS=THREE.RepeatWrapping; t.repeat.set(laenge/(hoehe*10.7),1); const m=GRAB.tafel(par,t,laenge,hoehe,x,y,z); m.rotation.y=dreh||0; };
  band(wh,26.1,.56,-4.95,.32,-13.47); band(wh,4.4,.56,15.8,.32,-13.47);
  [-1,1].forEach((v,i)=>{ const w=i?wr:wl; band(w,26.9,.95,v*17.96,2.75,0,-v*Math.PI/2); band(w,26.9,.5,v*17.96,.34,0,-v*Math.PI/2);
    [[3.42,GOLD2],[2.08,GOLD2],[1.9,ROT],[1.72,TUERKIS],[3.62,BLAU]].forEach(([y,c])=>box(w,.05,.09,26.9,c,v*17.96,y,0)); });
  /* Streifen an der Rückwand, an der Geheimwand unterbrochen */
  [[.68,ROT],[3.84,GOLD2]].forEach(([y,c])=>{ box(wh,25.7,.09,.05,c,-5.1,y,-13.47); box(wh,4.5,.09,.05,c,15.75,y,-13.47); });
  [wh,wl,wr].forEach(w=>{ ohneSchatten(w); verschmelze(w); });
  /* Fackeln in Wandhaltern */
  [-14,-2.4,14.6].forEach(x=>fackel(k,hinten,x,-13.46,0));
  [-9.5,-2.5,8].forEach(z=>fackel(k,links,-17.96,z,Math.PI/2));
  [-9.5-2,.8,8].forEach(z=>fackel(k,rechts,17.96,z,-Math.PI/2));

  /* ---------- Säulen ---------- */
  [[-16.1,-12.1,4.4],[-5.3,-12.1,4.4],[6.9,-12.1,4.4],[16.1,-12.1,4.4],[-5.8,-6.8,4.6],[14.4,-.9,4.6],[-16.7,-.8,4.4],[-16.7,10.2,4.4],[16.7,3.2,4.4],[16.7,-8.2,4.4]]
    .forEach(([x,z,hh])=>GRAB.saeule(sc,k,x,z,hh));

  /* ---------- Papyrus in Steinkübeln ---------- */
  const gruen=gruppe(sc,0,0,0), halme=[];
  [[-16.8,-9.4],[16.8,-5.2],[-8.4,12.4],[8.2,12.4],[16.7,8.9],[-16.6,12.3],[-16.8,-5.0],[-9.2,7.2]].forEach(([x,z])=>papyrus(k,gruen,x,z,halme));
  verschmelze(gruen); GRAB.viele(sc,GEO.cone,halme);

  /* ---------- Möbel und Baustellen-Reste ---------- */
  const m=gruppe(sc,0,0,0);
  /* Steinbänke an den Seiten */
  [[-17.0,3.8],[17.0,-1.8]].forEach(([x,z])=>{ [-.95,.95].forEach(v=>box(m,.8,.55,.4,SAND3,x,.28,z+v)); box(m,.95,.2,2.7,SAND,x,.65,z); box(m,.99,.06,2.74,TUERKIS,x,.55,z); k.kasten(x,z,1.0,2.8); });
  /* Hocker beim Brettspiel */
  { const x=14.4, z=4.5; [-.3,.3].forEach(a=>[-.3,.3].forEach(b=>strich(m,[x+a*1.15,0,z+b*1.15],[x+a,.7,z+b],.06,HOLZ2))); box(m,.8,.12,.8,HOLZ,x,.74,z); box(m,.68,.14,.68,ROT,x,.84,z); k.kreis(x,z,.5); }
  /* lose Steinblöcke */
  [[-3.2,12.4],[13.4,12.3]].forEach(([x,z],i)=>{ box(m,1.2,.65,.9,SAND2,x-.4,.33,z); box(m,.9,.55,.85,STEIN,x+.75,.28,z+.05); const o=box(m,.85,.5,.7,SAND,x-.2+i*.2,.91,z); o.rotation.y=.35; k.kasten(x+.1,z,2.3,1.1); });
  /* Holzschlitten mit großem Steinblock und Seil */
  { const x=3.4, z=12.35; [-.45,.45].forEach(v=>{ box(m,2.6,.16,.18,HOLZ2,x,.08,z+v); strich(m,[x+1.3,.1,z+v],[x+1.6,.42,z+v],.08,HOLZ2); });
    [-.9,0,.9].forEach(v=>box(m,.2,.12,1.15,HOLZ,x+v,.22,z)); box(m,1.7,.8,.9,SAND,x-.1,.68,z); [-.55,.4].forEach(v=>box(m,.07,.84,.94,0x7a5a30,x+v,.68,z));
    for(let i=0;i<3;i++) reif(m,.32-i*.02,.05,0xb89050,x+2.1,.06+i*.09,z); k.kasten(x+.45,z,4.4,1.15); }
  /* Leiter an der rechten Wand */
  { const z=12.2; [-.45,.45].forEach(v=>strich(m,[16.5,0,z+v],[17.65,3.1,z+v],.07,HOLZ)); for(let i=1;i<8;i++){ const u=i/8; strich(m,[16.5+1.15*u,3.1*u,z-.45],[16.5+1.15*u,3.1*u,z+.45],.045,HOLZ2); } k.kasten(17.1,z,1.4,1.2); }
  verschmelze(m);

  /* ---------- Sandhaufen und Steinchen ---------- */
  const brocken=[];
  [].forEach(([x,z,r])=>{
    brocken.push([x,0,z,r,r*.45,r*.75,0xd8b46c]); brocken.push([x+r*.35,0,z+.15,r*.55,r*.35,r*.5,0xc9a25c]);
    for(let i=0;i<10;i++){ const a=i*2.4; brocken.push([x+Math.cos(a)*r*.7,.1+zufall()*.08,z+Math.sin(a)*r*.5,.07+zufall()*.08,.06+zufall()*.05,.08+zufall()*.06,[0xa8844c,0xe2c58a,0x8a6a3a][i%3],a]); }
    k.kreis(x,z,r*.85); });
  /* kleine Kiesel entlang der Wände (flach, begehbar) */
  for(let i=0;i<150;i++){ const s=i%2?1:-1, quer2=i%3===0, x=quer2?-17+zufall()*34:s*(17.1+zufall()*.7), z=quer2?-13.35+zufall()*.4:-12.8+zufall()*25.8;
    if(quer2 && x>7.5 && x<13.8) continue; brocken.push([x,.03,z,.04+zufall()*.09,.03+zufall()*.04,.05+zufall()*.08,[0xa8844c,0xd8b878,0x8a6a3a][i%3],zufall()*3]); }
  GRAB.viele(sc,GEO.sph,brocken);

  /* ---------- Bodenzier: farbige Rahmenlinien ---------- */
  const zier=gruppe(sc,0,0,0);
  const linien=(x,zz,w,t,d,c,y)=>{ box(zier,w,.012,d,c,x,y,zz-t/2); box(zier,w,.012,d,c,x,y,zz+t/2); box(zier,d,.012,t-d,c,x-w/2+d/2,y,zz); box(zier,d,.012,t-d,c,x+w/2-d/2,y,zz); };
  linien(0,-3,7.6,5.4,.16,BLAU,.008); linien(0,-3,8.2,6.0,.1,GOLD2,.009); linien(0,-.2,31.2,22.4,.14,0x9a4a28,.007); linien(0,-.2,31.9,23.1,.08,0x1f7a70,.008);
  /* Läufer aus bunten Platten vom Podest nach vorn */
  [-1,1].forEach(s=>{ box(zier,.12,.012,9.6,ROT,s*1.5,.01,5.6); box(zier,.07,.012,9.6,GOLD2,s*1.74,.01,5.6); });
  for(let i=0;i<8;i++){ const q=box(zier,.17,.012,.17,i%2?TUERKIS:BLAU,i%2?-1.15:1.15,.011,1.4+i*1.2); q.rotation.y=Math.PI/4; const p=box(zier,.17,.012,.17,i%2?BLAU:TUERKIS,i%2?1.15:-1.15,.011,1.4+i*1.2); p.rotation.y=Math.PI/4; }
  ohneSchatten(zier); verschmelze(zier);

  /* ---------- Lichtbahn über dem Sarg und Staubfunken ---------- */
  const strahl=rohr(sc,.9,2.7,6.4,basis(0xffe6a0,{transparent:true,opacity:.07,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}),0,3.9,-3,24,true); strahl.castShadow=false; strahl.receiveShadow=false;
  const funken=[]; for(let i=0;i<110;i++){ const nah=i<50; funken.push({ x:nah?-2.2+zufall()*4.4:-16+zufall()*32, z:nah?-4.6+zufall()*3.2:-11+zufall()*20, p:zufall(), v:.03+zufall()*.05, s:.012+zufall()*.022, d:zufall()*6.3 }); }
  const im=new THREE.InstancedMesh(GEO.sph,basis(0xffe8a0,{transparent:true,opacity:.75,depthWrite:false}),funken.length), o=new THREE.Object3D(); im.frustumCulled=false; sc.add(im);
  k.anim.push(t=>{ funken.forEach((f,i)=>{ const a=(t*f.v+f.p)%1, s=f.s*Math.sin(a*Math.PI)*(1+.4*Math.sin(t*3+f.d)); o.position.set(f.x+Math.sin(t*.5+f.d)*.3,.7+a*4.2,f.z+Math.cos(t*.4+f.d)*.25); o.scale.set(s,s,s); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; });

  /* ---------- Tiere ---------- */
  skarabaeus(k);
  katze(k,[[-8.2,8.9],[7.4,9.0],[14.6,9.8],[7.4,10.8],[-8.2,10.8]],1.3);

  /* ---------- Licht (zusammen mit dem Ausgang 5 Punktlichter) ---------- */
  flacker(k,0,4.4,-2.2,0xffd070,.75,13);
  flacker(k,-14,3.4,-8,0xff9a3a,.7,13);
  flacker(k,13.6,3.0,-4.4,0xffa848,.75,11);
  flacker(k,-7,3.4,6,0xffb060,.45,14);
  return { tuer, start:[4.2,4.2] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-14.2,-10.4],[-7.4,-10.2],[-2.2,-9.4],[4.8,-9.8],[14.2,-10.2],[15.2,-3.8],[14.8,1.0],[15.0,7.2],[10.8,11.6],[6.8,6.0],
  [.2,11.9],[-5.8,11.9],[-11,11.4],[-15.4,7.6],[-14.6,2.0],[-14.8,-2.8],[-8.6,-8.2],[-3.6,-6.0],[8.4,-7.4],[-8.8,3.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:0, z:-3, steh:[0,-.2], kasten:[6.0,3.8], treffer:[5.2,2.6,3.0], baue(g,k){ /* 1 Sarkophag: goldener Sarg auf zweistufigem Podest */
      box(g,6.0,.3,3.8,SAND3,0,.15,0); box(g,5.1,.3,2.9,SAND,0,.45,0); box(g,5.16,.08,2.96,TUERKIS,0,.45,0);
      /* vier goldene Sockelklötze */
      [-1.5,1.4].forEach(x=>[-.72,.72].forEach(z=>box(g,.5,.22,.36,GOLD2,x,.71,z*.62)));
      /* Umriss von oben: breites rundes Kopfende (links), schmales Fußende (rechts) */
      const umriss=(d,h,c,y)=>{ const f=new THREE.Shape();
        for(let i=0;i<=16;i++){ const a=Math.PI/2+i*Math.PI/16, x=-1.45+(.85+d)*Math.cos(a), z=(.95+d)*Math.sin(a); if(i) f.lineTo(x,z); else f.moveTo(x,z); }
        for(let i=0;i<=16;i++){ const a=-Math.PI/2+i*Math.PI/16; f.lineTo(1.7+(.5+d)*Math.cos(a),(.55+d)*Math.sin(a)); }
        const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:h,bevelEnabled:false}),mat(c)); m.rotation.x=-Math.PI/2; m.position.y=y; m.castShadow=true; m.receiveShadow=true; g.add(m); };
      umriss(.08,.14,GOLD2,.82); umriss(0,.59,GOLD,.96); umriss(.025,.2,BLAU,1.16); umriss(.035,.04,TUERKIS,1.09); umriss(.08,.13,GOLD2,1.55);
      /* nur wenige große Edelsteine an den Längsseiten */
      [-1.1,.1,1.3].forEach(x=>{ const hz=.95-(x+1.45)/3.15*.4+.03; [-1,1].forEach(v=>{ ball(g,.13,GOLD2,x,1.26,v*hz,1.3,1,.35); ball(g,.08,ROT,x,1.26,v*(hz+.04),1.3,1,.5); }); });
      /* gewölbter Deckel, zum Fußende hin schmaler und flacher */
      const rad=x=>.86-(x+1.45)/3.15*.36;
      const bogen=(x1,x2,plus,c)=>{ const t=rohr(g,rad(x2)+plus,rad(x1)+plus,x2-x1,c,(x1+x2)/2,1.68,0,24); t.rotation.z=-Math.PI/2; t.scale.x=.6; };
      bogen(-1.45,1.7,0,GOLD); ball(g,1,GOLD,-1.45,1.68,0,.8,.516,.86); ball(g,1,GOLD,1.7,1.68,0,.45,.3,.5);
      /* gestreiftes Kopfende und zwei Bänder am Fußende */
      [[-1.4,BLAU],[-1.08,TUERKIS],[-.76,BLAU],[.95,BLAU],[1.5,TUERKIS]].forEach(([x,c])=>bogen(x-.08,x+.08,.025,c));
      /* Sonnenscheibe mit Geheimfach oben */
      walze(g,.34,.12,BLAU,.1,2.07,0); reif(g,.35,.055,GOLD2,.1,2.13,0); ball(g,.17,ROT,.1,2.14,0,1,.55,1);
      const glanz=[[-1.7,2.15,.6],[.9,2.05,.5],[2.15,1.7,.4]].map(p=>schein(g,'rgba(255,250,200,.9)',p[0],p[1],p[2],.6));
      k.anim.push(t=>{ glanz.forEach((s,i)=>{ const a=Math.max(0,Math.sin(t*1.8+i*2.2)); s.scale.set(.15+a*.6,.15+a*.6,1); s.material.opacity=a; }); }); } },
  { x:-9.2, z:-1.6, dreh:.14, steh:[-8.9,.5], kasten:[3.0,1.65], treffer:[2.7,2.7,1.3], baue(g){ /* 2 Kanopenkrüge: drei Krüge mit freundlichen Tierköpfen auf einem Tisch */
      [-1.15,1.15].forEach(x=>[-.45,.45].forEach(z=>box(g,.18,.7,.18,HOLZ2,x,.35,z))); box(g,2.7,.16,1.25,HOLZ,0,.76,0); box(g,2.74,.07,1.29,GOLD2,0,.69,0); box(g,2.3,.1,.1,HOLZ2,0,.26,.45);
      [-.9,0,.9].forEach((x,i)=>{ const f=[TUERKIS,ROT,BLAU][i];
        walze(g,.22,.08,f,x,.88,0); ball(g,.37,CREME,x,1.32,0,1,1.25,1); rohr(g,.25,.3,.18,CREME,x,1.74,0); reif(g,.355,.035,f,x,1.45,0); reif(g,.355,.025,GOLD,x,1.22,0); box(g,.2,.26,.04,f,x,1.31,.37); ball(g,.05,GOLD,x,1.31,.4);
        walze(g,.29,.09,f,x,1.86,0);
        const augen=(y,z,a)=>[-1,1].forEach(s=>{ ball(g,.05,0xffffff,x+s*a,y,z); ball(g,.028,SCHWARZ,x+s*a,y,z+.04); });
        const mund=(y,z)=>{ const m=ring(g,.055,.012,SCHWARZ,x,y,z,Math.PI); m.rotation.z=Math.PI; };
        if(i===0){ /* Katze */ ball(g,.25,0xe0a040,x,2.12,0); [-1,1].forEach(s=>{ const o=kegel(g,.09,.22,0xe0a040,x+s*.15,2.38,0); o.rotation.z=-s*.25; }); ball(g,.1,LEINEN,x,2.05,.21,1.2,.8,.7); ball(g,.03,0xd06070,x,2.09,.29); augen(2.17,.215,.1); mund(2.03,.285); }
        else if(i===1){ /* Vogel */ ball(g,.25,LEINEN,x,2.13,0); ball(g,.17,0x8a5a2a,x,2.27,-.07,1.35,.8,1.2); const s=kegel(g,.09,.24,GOLD,x,2.08,.3); s.rotation.x=Math.PI/2+.3; augen(2.18,.215,.11); }
        else { /* Äffchen */ ball(g,.25,0x9a6a3a,x,2.12,0); [-1,1].forEach(s=>{ ball(g,.1,0x9a6a3a,x+s*.26,2.14,0,.6,1,1); ball(g,.06,0xf0c8a0,x+s*.28,2.14,.04,.5,1,1); }); ball(g,.15,0xf0c8a0,x,2.07,.15,1.15,.95,.8); augen(2.17,.255,.08); mund(2.02,.275); }
      }); } },
  { x:5.2, z:-5.6, dreh:-.18, steh:[4.9,-3.5], r:.9, treffer:[2.0,3.8,1.2], baue(g,k){ /* 3 Goldene Maske auf Ständer */
      box(g,1.2,.22,1.0,DUNKEL,0,.11,0); box(g,.62,1.15,.56,BLAU,0,.78,0); [.42,1.12].forEach(y=>box(g,.68,.09,.62,GOLD,0,y,0)); box(g,1.15,.16,.8,HOLZ2,0,1.43,0);
      /* Kopftuch mit Streifen */
      platte(g,[[-.86,1.5],[-.44,1.5],[-.4,2.1],[.4,2.1],[.44,1.5],[.86,1.5],[.78,2.55],[.72,3.1],[.45,3.46],[0,3.58],[-.45,3.46],[-.72,3.1],[-.78,2.55]],.26,GOLD,0,0,-.2);
      [-1,1].forEach(s=>{ [1.68,1.94,2.2,2.46].forEach((y,i)=>box(g,.3+(i>2?-.04:0),.11,.05,BLAU,s*(.62-i*.01),y,.07)); [2.74,3.0].forEach((y,i)=>{ const b=box(g,.28,.11,.05,BLAU,s*(.54-i*.06),y+.06,.07); b.rotation.z=-s*.28; }); });
      [-.18,0,.18].forEach(x=>box(g,.08,.2,.05,BLAU,x,3.4,.07));
      box(g,.95,.14,.12,BLAU,0,3.16,.1);
      /* Gesicht */
      ball(g,.5,0xf4cc52,0,2.58,.08,.95,1.18,.58);
      [-1,1].forEach(s=>{ ball(g,.12,0xffffff,s*.19,2.68,.34,1.15,.7,.4); ball(g,.055,SCHWARZ,s*.19,2.68,.39,1,1,.5); const l=ring(g,.14,.018,BLAU,s*.19,2.67,.37,Math.PI*.8); l.rotation.z=Math.PI*.1; strich(g,[s*.31,2.69,.37],[s*.42,2.66,.31],.018,BLAU); ball(g,.12,0xf4cc52,s*.5,2.52,.06,.55,1,.5); ball(g,.04,TUERKIS,s*.52,2.4,.12); });
      ball(g,.07,GOLD,0,2.52,.38,.8,1.5,.9); const m=ring(g,.13,.028,0xa8481e,0,2.38,.37,Math.PI); m.rotation.z=Math.PI;
      box(g,.13,.3,.12,BLAU,0,1.86,.2); [1.78,1.9].forEach(y=>box(g,.15,.035,.14,GOLD,0,y,.2));
      /* bunter Halskragen */
      [[.56,BLAU],[.45,ROT],[.34,TUERKIS]].forEach(([r,f],i)=>{ const c=ring(g,r,.055,f,0,2.14,.12+i*.015,Math.PI); c.rotation.z=Math.PI; });
      const s=[[-.5,3.2],[.55,2.0],[.15,2.9]].map(p=>schein(g,'rgba(255,250,200,.9)',p[0],p[1],.5,.5));
      k.anim.push(t=>{ s.forEach((q,i)=>{ const a=Math.max(0,Math.sin(t*2.1+i*2.1)); q.scale.set(.1+a*.55,.1+a*.55,1); q.material.opacity=a; }); }); } },
  { wand:'hinten', x:-9.8, z:-13.5, steh:[-9.8,-11.4], kasten:[4.6,.9], treffer:[4.5,2.95,.8], trefferY:.75, baue(g){ /* 4 Wandmalerei: Boot mit Sonne auf dem Fluss, breites Bild */
      box(g,4.4,2.76,.08,HOLZ2,0,2.2,.06);
      [-1,1].forEach(v=>{ box(g,4.5,.12,.14,HOLZ,0,2.2+v*1.36,.1); box(g,.12,2.84,.14,HOLZ,v*2.2,2.2,.1); });
      const tex=bild(768,470,(p)=>{ p.fillStyle='#f4e2b0'; p.fillRect(0,0,768,470);
        const oval=(x,y,a,b,f)=>{ p.fillStyle=f; p.beginPath(); p.ellipse(x,y,a,b,0,0,7); p.fill(); };
        const poly=(f,q)=>{ p.fillStyle=f; p.beginPath(); q.forEach((e,i)=>i?p.lineTo(e[0],e[1]):p.moveTo(e[0],e[1])); p.closePath(); p.fill(); };
        const linie=(f,w,q)=>{ p.strokeStyle=f; p.lineWidth=w; p.lineCap='round'; p.beginPath(); q.forEach((e,i)=>i?p.lineTo(e[0],e[1]):p.moveTo(e[0],e[1])); p.stroke(); };
        /* große Sonne mit Strahlen */
        for(let i=0;i<16;i++){ const a=i*Math.PI/8; linie('#e89a20',9,[[384+Math.cos(a)*80,106+Math.sin(a)*80],[384+Math.cos(a)*102,106+Math.sin(a)*102]]); }
        oval(384,106,72,72,'#d8402a'); oval(384,106,50,50,'#f06a2a');
        /* Wasser */
        p.fillStyle='#2a78b8'; p.fillRect(0,352,768,118);
        for(let r=0;r<4;r++){ p.strokeStyle=r%2?'#a8e0f4':'#14508a'; p.lineWidth=7; p.beginPath(); for(let x=0;x<=768;x+=48){ if(!x) p.moveTo(x,374+r*26); else p.quadraticCurveTo(x-24,356+r*26,x,374+r*26); } p.stroke(); }
        /* Boot */
        p.fillStyle='#8a4a1e'; p.beginPath(); p.moveTo(86,236); p.quadraticCurveTo(120,360,200,376); p.lineTo(568,376); p.quadraticCurveTo(648,360,690,232); p.quadraticCurveTo(630,318,560,318); p.lineTo(208,318); p.quadraticCurveTo(140,318,86,236); p.fill();
        linie('#e8b830',10,[[200,340],[568,340]]); linie('#1f4f9a',8,[[196,358],[572,358]]); oval(86,232,17,17,'#3f8a3c'); oval(690,228,17,17,'#3f8a3c');
        /* Dach in der Mitte */
        p.fillStyle='#1f8a88'; p.fillRect(316,214,136,22); linie('#8a4a1e',10,[[328,236],[328,318]]); linie('#8a4a1e',10,[[440,236],[440,318]]); oval(384,282,26,26,'#e8b830'); oval(384,282,12,12,'#d8402a');
        /* zwei Leute mit Rudern */
        [[236,'#1a1208'],[524,'#3a2008']].forEach(([x,haar])=>{ poly('#ffffff',[[x-20,262],[x+20,262],[x+32,318],[x-32,318]]); p.strokeStyle='#8a6a3a'; p.lineWidth=3; p.strokeRect(x-18,288,36,6);
          oval(x,228,25,27,haar); oval(x+4,234,19,21,'#c8804a'); oval(x+12,229,4,4,'#101008'); linie('#7a3a20',3,[[x+6,245],[x+17,243]]);
          linie('#c8804a',11,[[x,270],[x+40,292]]); linie('#5a2e10',8,[[x+28,262],[x+70,400]]); oval(x+75,414,11,28,'#5a2e10'); });
        /* Schilf an den Seiten */
        [28,52,720,742].forEach((x,i)=>{ linie('#3f8a3c',7,[[x,360],[x+(i<2?8:-8),210+(i%2)*40]]); oval(x+(i<2?8:-8),196+(i%2)*40,14,26,'#5aae3c'); });
        /* Rahmenband */
        p.fillStyle='#b8442a'; p.fillRect(0,0,768,16); p.fillStyle='#1f6a80'; p.fillRect(0,16,768,8); });
      GRAB.tafel(g,tex,4.28,2.62,0,2.2,.112); } },
  { x:-4.8, z:4.4, dreh:.18, steh:[-4.6,6.6], kasten:[2.3,1.9], treffer:[2.2,2.1,1.8], baue(g){ /* 5 Opferschale: goldene Obstschale auf einem Tisch */
      [-.75,.75].forEach(x=>[-.55,.55].forEach(z=>{ strich(g,[x*1.1,0,z*1.1],[x*.9,.8,z*.9],.08,HOLZ2); ball(g,.11,GOLD2,x*1.1,.08,z*1.1); }));
      box(g,2.1,.16,1.6,HOLZ,0,.86,0); box(g,2.14,.07,1.64,TUERKIS,0,.78,0);
      walze(g,.38,.08,GOLD2,0,.98,0); rohr(g,.12,.2,.2,GOLD,0,1.1,0); rohr(g,.8,.36,.34,GOLD,0,1.36,0); reif(g,.8,.06,GOLD2,0,1.53,0); reif(g,.6,.025,BLAU,0,1.36,0);
      /* Feigen, Trauben, Granatäpfel und Datteln */
      [[-.5,0],[-.22,.42],[.02,-.42],[-.16,0],[-.45,-.28]].forEach(([x,z],i)=>{ const y=1.62+(i===3?.2:0); ball(g,.21,i%2?0x6a2c78:0x8a3a8a,x,y,z); const s=kegel(g,.11,.2,i%2?0x6a2c78:0x8a3a8a,x,y+.2,z); ball(g,.035,0x4a7a2a,x,y+.31,z); });
      [[.42,.3],[.5,-.22]].forEach(([x,z])=>{ ball(g,.25,0xd03a28,x,1.66,z); [-1,0,1].forEach(a=>kegel(g,.045,.12,0xe8a030,x+a*.07,1.93,z)); });
      for(let i=0;i<12;i++){ const a=i*2.4, q=.05+(i%4)*.05; ball(g,.095,i%3?0x7ab83a:0x9ad04a,.14+Math.cos(a)*q,1.62+(i%3)*.08,.34+Math.sin(a)*q); }
      [[.56,.04],[.12,-.1],[.3,-.5]].forEach(([x,z],i)=>{ const d=ball(g,.1,0xc07a28,x,1.62+(i===1?.22:0),z,1,1,1.7); d.rotation.y=i; });
      ball(g,.18,0x4a9a34,-.34,1.8,.24,1.4,.18,.7); } },
  { wand:'hinten', x:2.4, z:-13.5, steh:[2.4,-11.4], kasten:[3.4,.9], treffer:[3.2,3.15,.8], trefferY:.72, baue(g,k){ /* 6 Sternenkarte: runde Karte mit Sternbildern auf heller Tafel */
      box(g,3.0,3.0,.08,CREME,0,2.3,.06);
      [-1,1].forEach(v=>{ box(g,3.16,.14,.14,GOLD2,0,2.3+v*1.5,.1); box(g,.14,3.14,.14,GOLD2,v*1.5,2.3,.1); [-1,1].forEach(w=>{ ball(g,.17,ROT,v*1.5,2.3+w*1.5,.17,1,1,.6); ball(g,.09,TUERKIS,v*1.12,2.3+w*1.12,.12,1,1,.5); }); });
      const tex=bild(512,512,(p)=>{ p.fillStyle='#eadfbc'; p.fillRect(0,0,512,512);
        p.fillStyle='#14306a'; p.beginPath(); p.arc(256,256,238,0,7); p.fill();
        p.strokeStyle='rgba(170,210,255,.45)'; p.lineWidth=3; [80,160].forEach(r=>{ p.beginPath(); p.arc(256,256,r,0,7); p.stroke(); });
        for(let i=0;i<12;i++){ const a=i*Math.PI/6; p.beginPath(); p.moveTo(256+Math.cos(a)*80,256+Math.sin(a)*80); p.lineTo(256+Math.cos(a)*236,256+Math.sin(a)*236); p.stroke(); }
        const bilder=[[[90,170],[130,130],[185,140],[210,95]],[[320,80],[350,135],[410,140],[400,200],[345,190],[350,135]],[[75,300],[125,330],[120,395],[180,420]],[[300,430],[330,370],[390,390],[440,320]],[[205,60],[256,80],[262,40]]];
        bilder.forEach(b=>{ p.strokeStyle='#ffffff'; p.lineWidth=4; p.beginPath(); b.forEach((q,i)=>i?p.lineTo(q[0],q[1]):p.moveTo(q[0],q[1])); p.stroke();
          b.forEach(q=>{ p.fillStyle='#ffe070'; p.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, r=i%2?6:15; p.lineTo(q[0]+Math.cos(a)*r,q[1]+Math.sin(a)*r); } p.fill(); }); });
        p.fillStyle='#f4f0d0'; p.beginPath(); p.arc(150,245,28,0,7); p.fill(); p.fillStyle='#14306a'; p.beginPath(); p.arc(163,236,24,0,7); p.fill(); });
      const scheibe=new THREE.Mesh(new THREE.CircleGeometry(1.34,40),new THREE.MeshLambertMaterial({map:tex})); scheibe.position.set(0,2.3,.112); g.add(scheibe);
      ring(g,1.37,.08,GOLD,0,2.3,.14);
      /* der drehbare goldene Stern */
      const st1=gruppe(g,0,2.3,.17); st1.userData.lebendig=true;
      const a=new THREE.Mesh(sternForm(.46),mat(GOLD,{emissive:0x6a4a00})); st1.add(a); ball(st1,.12,ROT,0,0,.04,1,1,.6);
      const s=schein(g,'rgba(255,230,130,.7)',0,2.3,.3,1.2);
      k.anim.push(t=>{ st1.rotation.z=t*.35; const w=.9+Math.sin(t*2.4)*.3; s.scale.set(w,w,1); }); } },
  { x:-13, z:6.2, dreh:.22, steh:[-12.5,8.5], kasten:[2.9,1.8], treffer:[2.7,2.5,1.6], baue(g){ /* 7 Kasten mit Uschebti-Figuren: offene Holzkiste mit kleinen Dienerfiguren */
      [-1.15,1.15].forEach(x=>[-.55,.55].forEach(z=>box(g,.24,.2,.24,GOLD2,x,.1,z)));
      box(g,2.6,.18,1.4,HOLZ2,0,.27,0);
      box(g,2.6,.62,.14,HOLZ,0,.66,.63); box(g,2.6,.9,.14,HOLZ,0,.8,-.63); [-1,1].forEach(s=>box(g,.14,.75,1.14,HOLZ,s*1.23,.73,0));
      box(g,2.66,.1,.2,GOLD,0,.99,.63); box(g,2.62,.14,.05,BLAU,0,.62,.71); [-.9,-.45,0,.45,.9].forEach(x=>ball(g,.07,GOLD,x,.62,.74,1,1,.6));
      /* offener Deckel, hinten angelehnt */
      const d=gruppe(g,0,1.24,-.72); d.rotation.x=-.45; box(d,2.7,.8,.1,HOLZ,0,.36,-.02); box(d,2.4,.54,.04,TUERKIS,0,.36,.05); box(d,2.74,.1,.16,GOLD,0,.76,-.02);
      /* fünf Figuren: hinten drei, vorn zwei, auf kleinen Sockeln */
      [[-.82,-.26,1.34],[0,-.26,1.42],[.82,-.26,1.34],[-.42,.24,1.1],[.42,.24,1.1]].forEach(([x,z,y],i)=>{ const f=i%2?0x2fb4a4:0x3a9ac8;
        box(g,.34,y-.62,.3,HOLZ2,x,.36+(y-.62)/2,z);
        rohr(g,.14,.2,.52,f,x,y,z); box(g,.2,.05,.04,GOLD,x,y-.02,z+.18); box(g,.14,.04,.04,GOLD,x,y-.12,z+.19);
        [-1,1].forEach(s=>strich(g,[x+s*.14,y+.2,z],[x+s*.04,y+.06,z+.17],.04,f));
        ball(g,.17,0x1f4f9a,x,y+.43,z-.03,1.15,1,.9); ball(g,.135,0xe0a868,x,y+.42,z+.07);
        [-1,1].forEach(s=>ball(g,.022,SCHWARZ,x+s*.05,y+.45,z+.2)); const m=ring(g,.045,.01,0x8a3a20,x,y+.39,z+.2,Math.PI); m.rotation.z=Math.PI; box(g,.28,.05,.24,GOLD,x,y+.56,z); }); } },
  { x:11.4, z:4.4, dreh:-.16, steh:[11.2,6.7], kasten:[3.7,1.9], treffer:[3.5,1.9,1.7], baue(g){ /* 8 Senet-Spielbrett: Tisch mit Brett (3 mal 10 Felder) und Spielfiguren */
      [-1.45,1.45].forEach(x=>[-.6,.6].forEach(z=>{ strich(g,[x*1.06,0,z*1.08],[x,.8,z],.09,HOLZ2); ball(g,.12,GOLD2,x*1.06,.09,z*1.08); }));
      [-.6,.6].forEach(z=>box(g,2.9,.1,.1,HOLZ2,0,.35,z));
      box(g,3.3,.14,1.6,HOLZ,0,.86,0); box(g,3.16,.24,1.2,HOLZ2,0,1.05,0); box(g,3.2,.05,1.24,GOLD,0,1.15,0);
      for(let i=0;i<10;i++) for(let j=0;j<3;j++){ const x=-1.35+i*.3, z=-.34+j*.34; box(g,.27,.05,.31,(i+j)%2?0xf4e6c0:0x2a8a88,x,1.19,z); if((i===2&&j===0)||(i===7&&j===2)||(i===9&&j===1)) ball(g,.07,ROT,x,1.22,z,1,.25,1); }
      [[0,1],[2,1],[4,0],[5,2],[7,1]].forEach(([i,j])=>{ const x=-1.35+i*.3, z=-.34+j*.34; kegel(g,.12,.36,LEINEN,x,1.39,z); ball(g,.075,LEINEN,x,1.56,z); });
      [[1,0],[3,2],[5,1],[6,0],[8,2]].forEach(([i,j])=>{ const x=-1.35+i*.3, z=-.34+j*.34; rohr(g,.07,.13,.2,0x2a1a30,x,1.31,z); walze(g,.11,.07,0x2a1a30,x,1.45,z); });
      /* Wurfstäbe */
      [0,1,2,3].forEach(i=>{ const s=box(g,.62,.05,.07,i%2?0xf4e6c0:0xb88a4a,-1.0+i*.2,.97,.7+(i%2)*.04); s.rotation.y=-.3+i*.22; }); } },
  { x:13.6, z:-4.6, steh:[13.2,-2.5], r:.75, treffer:[2.0,3.5,1.4], baue(g,k){ /* 9 Öllampe auf Ständer: hoher dreibeiniger Ständer mit Lampe mit Schnabel und Henkel */
      [0,1,2].forEach(i=>{ const a=i*2.094+.5; strich(g,[Math.cos(a)*.66,.08,Math.sin(a)*.66],[0,.55,0],.07,GOLD2); ball(g,.12,GOLD2,Math.cos(a)*.66,.09,Math.sin(a)*.66); });
      walze(g,.085,1.75,GOLD,0,1.35,0); [.6,1.35,2.1].forEach(y=>ball(g,.15,GOLD2,0,y,0,1,.7,1)); rohr(g,.4,.12,.2,GOLD,0,2.3,0); walze(g,.46,.07,GOLD2,0,2.43,0);
      /* Lampe aus rotem Ton */
      const T=0xc85a30;
      walze(g,.2,.1,0x8a3a1e,-.08,2.52,0); ball(g,.45,T,-.08,2.75,0,1.15,.6,1); reif(g,.24,.04,GOLD,-.08,3.0,0); ball(g,.15,0x8a3a1e,-.08,3.0,0,1,.35,1);
      strich(g,[.2,2.75,0],[.76,2.86,0],.13,T); ball(g,.15,T,.76,2.86,0,1,.8,1); walze(g,.08,.05,SCHWARZ,.77,2.98,0);
      ring(g,.22,.06,T,-.68,2.82,0); [-1,1].forEach(s=>{ ball(g,.07,GOLD,-.35,2.75,s*.41); ball(g,.07,GOLD,.1,2.75,s*.42); });
      flamme(k,g,.77,2.98,0,1.15); } },
  { x:-13.2, z:-6.4, dreh:.06, steh:[-12.8,-3.9], kasten:[4.6,2.4], treffer:[4.4,2.3,2.1], baue(g){ /* 10 Bett mit Löwenfüßen: goldene Pranken, weiße Laken, Kissen */
      [-1.8,1.8].forEach(x=>[-.78,.78].forEach(z=>{
        ball(g,.27,GOLD,x+.08,.17,z,1.25,.62,1.05); [-.15,0,.15].forEach(v=>ball(g,.095,GOLD,x+.38,.11,z+v,1.2,.9,.9)); [-.075,.075].forEach(v=>strich(g,[x+.36,.2,z+v],[x+.48,.1,z+v],.012,DUNKEL));
        strich(g,[x+.04,.22,z],[x-.1,.55,z],.15,GOLD); strich(g,[x-.1,.55,z],[x,.92,z],.18,GOLD); ball(g,.2,GOLD,x-.08,.6,z); reif(g,.2,.035,BLAU,x,.86,z); }));
      box(g,4.1,.22,1.9,HOLZ,0,1.0,0); box(g,4.14,.08,1.94,GOLD,0,1.1,0); [-1,1].forEach(v=>{ for(let i=-4;i<=4;i++) box(g,.22,.1,.03,i%2?TUERKIS:BLAU,i*.42,.98,v*.97); });
      box(g,3.85,.3,1.72,LEINEN,0,1.28,0);
      /* gefaltete Decke am Fußende */
      box(g,1.5,.12,1.78,ROT,.85,1.47,0); [.35,.65,1.35].forEach((x,i)=>box(g,.12,.125,1.8,i%2?GOLD:BLAU,x,1.475,0)); [-1,1].forEach(v=>box(g,1.5,.34,.06,ROT,.85,1.28,v*.9));
      /* Kissen am Kopfende */
      ball(g,.62,0x3a9ac8,-1.25,1.62,0,.9,.4,1.12); ball(g,.4,0x6ac0e0,-1.25,1.74,0,.85,.35,1.15); [-.62,.62].forEach(z=>ball(g,.09,GOLD,-1.25,1.62,z*1.15));
      /* Kopfteil mit geschwungenem Rand, niedriges Fußbrett */
      box(g,.2,1.1,1.96,HOLZ,-2.05,1.55,0); quer(g,.15,2.08,GOLD,-2.1,2.12,0,'z'); [-1,1].forEach(v=>ball(g,.19,GOLD,-2.1,2.12,v*1.04)); box(g,.05,.55,1.5,BLAU,-1.93,1.75,0); [-.4,0,.4].forEach(z=>ball(g,.1,GOLD,-1.9,1.86,z,.5,1,1));
      box(g,.18,.55,1.96,HOLZ,2.05,1.3,0); quer(g,.1,2.04,GOLD,2.07,1.6,0,'z'); } }
];

return { titel:'Die Grabkammer', breite:36, tiefe:27, oben:['8,12,34','14,22,52','24,36,76'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Die Schatzkammer. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die Bodenplatte hinten links. Sie schiebt sich nach links, darunter führt eine Treppe ins Licht, die Figur steigt hinab. */
RAEUME3D.grabkammer[2] = (function(){
const { SAND, SAND2, SAND3, DUNKEL, HOLZ, HOLZ2, GOLD, GOLD2, TUERKIS, WEISS, SCHWARZ } = GRAB;
const NACHT=0x1c2c64, WEIN=0x7a1c24, ROT=0xc23a2e, BLAU=0x2a62c0, GRUEN=0x2f9a58, HELLGOLD=0xffd866, BRONZE=0xa8682c;

/* ---------- kleine Helfer ---------- */
/* leicht selbstleuchtendes Gold, damit es im warmen Licht glänzt */
const gold=()=>mat(GOLD,{emissive:0x3c2800});
const hell=()=>mat(HELLGOLD,{emissive:0x4a3200});
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* flacher Körper aus einem Umriss (Punkte [x,y]), Dicke d nach vorn und hinten */
const flachform=(p,punkte,d,c,x,y,z)=>{ const f=new THREE.Shape(); punkte.forEach((q,i)=>i?f.lineTo(q[0],q[1]):f.moveTo(q[0],q[1]));
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:d,bevelEnabled:false}),typeof c==='number'?mat(c):c); m.position.set(x,y,z-d/2); m.castShadow=true; m.receiveShadow=true; p.add(m); return m; };
/* Edelstein als kleiner, leicht gestreckter Körper */
const juwel=(p,r,f,x,y,z)=>ball(p,r,mat(f,{emissive:f,emissiveIntensity:.25}),x,y,z,1,.8,1);
/* goldener Becher (Fuß bei y) */
const becher=(p,x,y,z,s)=>{ walze(p,.16*s,.05*s,gold(),x,y+.025*s,z); walze(p,.045*s,.24*s,gold(),x,y+.16*s,z); rohr(p,.2*s,.09*s,.26*s,hell(),x,y+.4*s,z); reif(p,.2*s,.025*s,GOLD2,x,y+.53*s,z); };
/* flache Schale */
const schale=(p,x,y,z,s,f)=>{ walze(p,.12*s,.06*s,GOLD2,x,y+.03*s,z); rohr(p,.34*s,.14*s,.18*s,f||gold(),x,y+.15*s,z); reif(p,.34*s,.028*s,GOLD2,x,y+.24*s,z); };

/* ---------- Münzen als Instanzen: Haufen mit Radius r und Höhe h ---------- */
const MUENZFARBEN=[0xf2c230,0xffd75a,0xe0a81c,0xffe488,0xd89c18];
function muenzHaufen(par,x,y,z,r,h,zahl,gr){
  const kern=gruppe(par,x,y,z);
  [[1,.34],[.76,.62],[.5,.82],[.28,.93]].forEach(([a,b])=>rohr(kern,r*a*.72,r*a*.97,h*(b>.9?.2:.3),mat(0xc8921c,{emissive:0x2c1c00}),0,h*b-h*(b>.9?.2:.3)*.8,0,20));
  verschmelze(kern);
  const L=[];
  for(let i=0;i<zahl;i++){ const u=Math.sqrt((i+.5)/zahl), a=i*2.39996, d=u*r, yy=h*(1-Math.pow(u,1.5))+.03+zufall()*.06, s=.2+zufall()*.35;
    L.push([x+Math.cos(a)*d, y+yy, z+Math.sin(a)*d, gr, gr*.3, gr, MUENZFARBEN[i%5], zufall()*3, Math.sin(a)*s+(zufall()-.5)*.4, -Math.cos(a)*s+(zufall()-.5)*.4]); }
  const im=GRAB.viele(par,GEO.cyl,L); im.material.emissive=new THREE.Color(0x3a2600); return im;
}

/* ---------- Glitzern: kleine Sterne, die auf dem Gold aufblitzen ---------- */
let glitzerStoff=null;
function glitzer(k,par,x,y,z,gr,versatz){
  const s=new THREE.Sprite(glitzerStoff); s.position.set(x,y,z); s.scale.set(.01,.01,1); par.add(s);
  k.anim.push(t=>{ const a=Math.pow(Math.max(0,Math.sin(t*2.1+versatz)),6)*gr+.001; s.scale.set(a,a,1); });
}

/* ---------- Ausgang: Bodenplatte mit Treppe darunter ---------- */
const BX=-10, BZ=-8, LB=4.4, LT=3.6, WEG=4.9;
function baueFalltuer(k,sc){
  /* Schacht mit Treppe: selbstleuchtend, damit es unten hell wirkt */
  const schacht=gruppe(sc,BX,0,BZ), w1=basis(0x8a5a24), w2=basis(0x6e461a), fm=basis(0xc98e3c);
  [-1,1].forEach(s=>{ box(schacht,.1,3.1,LT+.2,w2,s*(LB/2+.05),-1.56,0); box(schacht,LB,3.1,.1,w1,0,-1.56,s*(LT/2+.05)); });
  box(schacht,LB,.06,LT,basis(0xffd470),0,-3.12,0);
  [-.7,-1.6,-2.45].forEach(y=>{ box(schacht,LB-.02,.06,.02,fm,0,y,-LT/2+.012); [-1,1].forEach(s=>box(schacht,.02,.06,LT-.02,fm,s*(LB/2-.012),y,0)); });
  /* Stufen von vorn (oben) nach hinten (unten), helle Kanten */
  const st1=basis(0xd8a85c), st2=basis(0xffe6a8);
  for(let i=0;i<6;i++){ const z=LT/2-.3-i*.56, y=-.35-i*.44; box(schacht,3.0,.2,.56,st1,0,y-.1,z); box(schacht,3.0,.05,.1,st2,0,y+.02,z+.23); }
  verschmelze(schacht); ohneSchatten(schacht);
  schein(sc,'rgba(255,215,120,.55)',BX,-1.8,BZ-1.0,3.4);
  /* steinerner Rahmen mit goldener Einlage, vorn in der Mitte flacher Einstieg */
  const rand=gruppe(sc,BX,0,BZ);
  for(let i=0;i<9;i++){ const x=-2.4+i*.6; [-1,1].forEach(s=>{ if(s<0 || Math.abs(x)>.8) box(rand,.58,.2,.46,i%2?SAND3:0x7c5c30,x,.1,s*(LT/2+.23)); }); }
  for(let i=0;i<6;i++){ const z=-1.5+i*.6; [-1,1].forEach(s=>box(rand,.48,.196,.58,i%2?0x7c5c30:SAND3,s*(LB/2+.25),.098,z)); }
  box(rand,1.62,.02,.46,GOLD2,0,.012,LT/2+.23); [-.5,0,.5].forEach(x=>box(rand,.22,.012,.34,NACHT,x,.028,LT/2+.23));
  /* Führungsschienen, auf denen die Platte nach links gleitet */
  [-1,1].forEach(s=>{ box(rand,5.0,.08,.16,BRONZE,-4.9,.17,s*2.12); [-7.2,-6.0,-4.8,-3.6].forEach(x=>box(rand,.18,.14,.26,DUNKEL,x,.07,s*2.12)); box(rand,.2,.4,.3,gold(),-7.45,.28,s*2.12); });
  verschmelze(rand); ohneSchatten(rand);
  /* Licht schimmert durch die Fugen */
  const fuge=basis(0xffc848), fg=gruppe(sc,BX,0,BZ);
  [-1,1].forEach(s=>{ box(fg,LB+.56,.02,.08,fuge,0,.212,s*(LT/2+.22)); box(fg,.08,.02,LT+.4,fuge,s*(LB/2+.24),.214,0); });
  verschmelze(fg); ohneSchatten(fg);
  /* die schwere Steinplatte */
  const deckel=gruppe(sc,BX,0,BZ), platte=gruppe(deckel,0,0,0), S1=0xd9c59a, S2=0xbfa676;
  box(platte,LB+.3,.24,LT+.3,S1,0,.34,0);
  [-1,1].forEach(s=>{ box(platte,LB,.03,.2,NACHT,0,.47,s*1.62); box(platte,.2,.031,3.04,NACHT,s*2.02,.47,0);
    box(platte,LB-.7,.028,.07,gold(),0,.47,s*1.35); box(platte,.07,.029,2.63,gold(),s*1.72,.47,0);
    [-1,1].forEach(v=>{ box(platte,.34,.1,.34,gold(),s*2.02,.49,v*1.62); ball(platte,.1,hell(),s*2.02,.55,v*1.62,1,.6,1); }); });
  /* große Sonnenscheibe und zwei Griffringe */
  walze(platte,.82,.05,gold(),0,.48,0); reif(platte,.82,.06,GOLD2,0,.51,0); walze(platte,.36,.06,ROT,0,.5,0); reif(platte,.38,.04,hell(),0,.53,0);
  for(let i=0;i<12;i++){ const a=i*Math.PI/6, b=box(platte,.34,.03,.11,gold(),Math.cos(a)*1.08,.475,Math.sin(a)*1.08); b.rotation.y=-a; }
  [-1.38,1.38].forEach(x=>{ box(platte,.3,.12,.2,DUNKEL,x,.52,-.3); reif(platte,.32,.065,BRONZE,x,.54,0); });
  [[-1.1,.9],[1.3,-.95],[.9,1.05]].forEach(([x,z],i)=>{ const r=box(platte,.5,.012,.035,S2,x,.467,z); r.rotation.y=i*1.3+.4; });
  verschmelze(platte);
  /* Pfosten mit Zahlenschloss, vorn rechts neben der Platte */
  const PX=BX+3.35, PZ=BZ+1.7, pf=gruppe(sc,PX,0,PZ);
  box(pf,.85,.2,.7,NACHT,0,.1,0); rohr(pf,.2,.27,1.05,SAND2,0,.72,0); [.38,1.05].forEach(y=>reif(pf,.25,.05,gold(),0,y,0));
  box(pf,1.25,1.0,.28,NACHT,0,1.72,0); box(pf,1.38,.14,.38,gold(),0,2.28,0); box(pf,1.34,.1,.34,gold(),0,1.19,0); ball(pf,.15,hell(),0,2.44,0);
  verschmelze(pf);
  const schloss=GRAB.zahlenschloss(sc,PX,1.65,PZ+.27); schloss.scale.set(1.15,1.15,1.15); verschmelze(schloss);
  k.kreis(PX,PZ,.5);
  const licht=new THREE.PointLight(0xffc860,.35,10,1.5); licht.position.set(BX,1.0,BZ); sc.add(licht);
  /* ein Hindernis für Platte, Schacht und Schienen */
  k.kasten(-12.65,BZ,10.7,4.7);
  return ausgang(k,{ name:'Bodenplatte', einfach:'Platte im Boden', steh:[BX,-4.5], durch:[BX,-7.1], tief:true,
    treffer:{x:BX,y:.7,z:BZ+.1,b:5.3,h:1.4,t:4.5}, schildOben:[BX,2.8,BZ], glanz:[PX,1.65,PZ+.6],
    bewege:(auf)=>{ deckel.position.x=BX-auf*WEG; licht.intensity=.35+auf*1.5; } });
}

/* ---------- gewebte Teppiche mit Fransen ---------- */
function teppichBild(grund,rand,muster){
  return bild(256,384,(g)=>{ g.fillStyle=rand; g.fillRect(0,0,256,384); g.fillStyle='#e0aa30'; g.fillRect(10,10,236,364); g.fillStyle=grund; g.fillRect(20,20,216,344);
    g.strokeStyle='#e0aa30'; g.lineWidth=3; g.strokeRect(36,36,184,312);
    for(let i=0;i<5;i++){ const y=72+i*60; [[44,'#e0aa30'],[28,muster],[11,'#f4e4b0']].forEach(([r,f])=>{ g.fillStyle=f; g.beginPath(); g.moveTo(128,y-r*.62); g.lineTo(128+r,y); g.lineTo(128,y+r*.62); g.lineTo(128-r,y); g.fill(); });
      [60,196].forEach(x=>{ g.fillStyle=muster; g.fillRect(x-7,y-7,14,14); }); }
    for(let x=24;x<236;x+=16){ g.fillStyle=muster; g.fillRect(x,26,8,5); g.fillRect(x,353,8,5); } });
}
function teppich(par,tex,x,y,z,b,t){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(b,t),new THREE.MeshLambertMaterial({map:tex})); m.rotation.x=-Math.PI/2; m.position.set(x,y,z); m.receiveShadow=true; par.add(m);
  const f=gruppe(par,x,0,z), n=Math.floor(b/.26);
  for(let i=0;i<n;i++){ const xx=-b/2+.13+i*(b-.26)/(n-1); [-1,1].forEach(s=>box(f,.07,.012,.26,0xe8c060,xx,y,s*(t/2+.12))); }
  verschmelze(f); ohneSchatten(f);
}

/* ---------- Wandbehang: schmales Tuch mit Zickzack und Troddeln (blickt nach +z) ---------- */
function behang(par,x,z,dreh,nr){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; const f=nr%2?0x1f5a6a:NACHT;
  strich(g,[-.72,4.55,.12],[.72,4.55,.12],.06,gold()); [-1,1].forEach(s=>ball(g,.11,hell(),s*.76,4.55,.12));
  box(g,1.15,2.3,.06,f,0,3.36,.08); [-1,1].forEach(s=>box(g,.08,2.3,.03,gold(),s*.47,3.36,.12));
  [4.0,3.35,2.7].forEach((y,i)=>{ [-1,1].forEach(s=>{ const b=box(g,.46,.1,.025,i===1?ROT:gold(),s*.17,y,.125); b.rotation.z=s*.55; }); });
  for(let i=0;i<6;i++){ const xx=-.48+i*.192; strich(g,[xx,2.22,.09],[xx,2.0,.09],.022,gold()); ball(g,.055,hell(),xx,1.98,.09); }
}

/* ---------- Wandregal mit Goldgefäßen (steht an einer Seitenwand, s = -1 links, +1 rechts) ---------- */
function regal(k,par,s,z,l,nr){
  const g=gruppe(par,s*17.45,0,z); g.rotation.y=-s*Math.PI/2;
  [-l/2,l/2].forEach(x=>{ box(g,.18,3.2,.9,HOLZ2,x,1.6,0); ball(g,.13,hell(),x,3.28,.2); });
  box(g,l,3.1,.08,0x2a1408,0,1.6,-.42);
  [.35,1.4,2.45].forEach((y,e)=>{ box(g,l,.13,.9,HOLZ,0,y,0); box(g,l,.06,.05,gold(),0,y,.46);
    const n=Math.floor(l/.85);
    for(let i=0;i<n;i++){ const x=-l/2+l/n*(i+.5), a=(i+e*2+nr)%5, yy=y+.065;
      if(a===0) GRAB.krug(g,x,0,.68,e%2?GOLD:0x1fa8a0).position.y=yy;
      else if(a===1) becher(g,x,yy,.05,1.05);
      else if(a===2){ schale(g,x,yy,.08,.95); juwel(g,.1,ROT,x-.09,yy+.27,.08); juwel(g,.09,BLAU,x+.1,yy+.26,.12); }
      else if(a===3){ [[-.17,0],[.17,0],[0,.17]].forEach(([dx,dy])=>{ const b=rohr(g,.14,.21,.16,dy?hell():gold(),x+dx,yy+.08+dy,.05,4); b.rotation.y=Math.PI/4; }); }
      else { rohr(g,.11,.2,.5,BLAU,x,yy+.25,0); reif(g,.15,.03,gold(),x,yy+.34,0); ball(g,.12,gold(),x,yy+.56,0); } } });
  k.kasten(s*17.45,z,1.1,l+.3);
}

/* ---------- Stapel aus Goldbarren ---------- */
function barren(k,par,x,z){
  const g=gruppe(par,x,0,z);
  box(g,1.7,.12,1.0,HOLZ2,0,.06,0);
  [[-.52,0],[0,0],[.52,0],[-.26,1],[.26,1],[0,2]].forEach(([a,e],i)=>[-.2,.2].forEach((v,j)=>{ const b=rohr(g,.25,.34,.22,(i+j)%2?gold():hell(),a,.23+e*.23,v,4); b.geometry.rotateY(Math.PI/4); b.scale.set(1,1,.74); }));
  k.kasten(x,z,1.8,1.1);
}

/* ---------- bauchige Vorratsgefäße in Gold und Blau ---------- */
function gefaesse(k,par,x,z,nr){
  GRAB.krug(par,x-.45,z,1.35,nr%2?NACHT:0xd8a428); GRAB.krug(par,x+.45,z+.12,1.0,nr%2?0xd8a428:0x1f7a80); GRAB.krug(par,x+.12,z-.42,.75,WEIN);
  k.kasten(x,z-.05,1.9,1.35);
}

function baue(k){
  const sc=k.scene;
  glitzerStoff=new THREE.SpriteMaterial({ map:bild(64,64,(g)=>{ const v=g.createRadialGradient(32,32,0,32,32,14); v.addColorStop(0,'rgba(255,255,240,1)'); v.addColorStop(1,'rgba(255,220,120,0)'); g.fillStyle=v; g.fillRect(0,0,64,64);
    g.fillStyle='#fffbe0'; g.beginPath(); [[32,0],[35,29],[64,32],[35,35],[32,64],[29,35],[0,32],[29,29]].forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.fill(); }), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending });
  const h=GRAB.huelle(k,{ B:36, T:27, H:6, himmelLicht:0xffe6bc, grund:0x5a3418, staerke:.76, sonne:0xffdc9c, sonneStaerke:.4,
    wandBild:GRAB.quaderBild([128,48,38],'#35100a',8), bodenBild:GRAB.quaderBild([152,108,70],'#4a2a14',4), leiste:NACHT, band:GOLD,
    bodenLoch:{x:BX,z:BZ,b:LB,t:LT} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueFalltuer(k,sc);

  /* ---------- Wandschmuck: Sockelstreifen, Rautenfries, Behänge ---------- */
  const wd=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  box(wd[0],36,.7,.07,NACHT,0,.35,-13.47); box(wd[0],36,.09,.09,gold(),0,.75,-13.46);
  [-1,1].forEach((s,i)=>{ box(wd[i+1],.07,.7,27,NACHT,s*17.97,.35,0); box(wd[i+1],.09,.09,27,gold(),s*17.96,.75,0); });
  for(let i=0;i<30;i++){ const x=-17.4+i*1.2, r=box(wd[0],.28,.28,.05,i%2?gold():0x1fa8a0,x,4.98,-13.46); r.rotation.z=Math.PI/4; }
  for(let i=0;i<22;i++){ const z=-12.6+i*1.2; [-1,1].forEach((s,j)=>{ const r=box(wd[j+1],.05,.28,.28,i%2?gold():0x1fa8a0,s*17.96,4.98,z); r.rotation.x=Math.PI/4; }); }
  [-12.9,-7.5,3.1,8.9,17.0].forEach((x,i)=>behang(wd[0],x,-13.5,0,i));
  [-7.2,2.6,12.4].forEach((z,i)=>behang(wd[1],-18,z,Math.PI/2,i+1));
  [-10.0,-3.0,5.2].forEach((z,i)=>behang(wd[2],18,z,-Math.PI/2,i));
  regal(k,wd[1],-1,-2.4,3.6,0); regal(k,wd[1],-1,9.4,3.4,2);
  regal(k,wd[2],1,1.4,3.6,1); regal(k,wd[2],1,-6.6,2.8,3); regal(k,wd[2],1,9.0,3.0,4);
  wd.forEach(verschmelze); wd.forEach(ohneSchatten);

  /* ---------- Säulen und Feuerschalen ---------- */
  [[-15.4,-11.8],[1.3,-11.8],[10.6,-11.9],[-16.6,6.0],[16.6,5.4]].forEach(([x,z])=>GRAB.saeule(sc,k,x,z,5.0));
  [[-2.5,-1.0],[5.5,-1.0],[-14.4,11.6],[15.2,11.6]].forEach(([x,z])=>GRAB.feuerschale(sc,k,x,z));
  flacker(k,-2.5,2.9,-.9,0xff9a40,.55,12); flacker(k,5.5,2.9,-.9,0xff9a40,.55,12);
  flacker(k,-13.6,3.2,8.4,0xffa450,.55,15); flacker(k,13.4,3.2,7.0,0xffa450,.55,15);
  const schatzLicht=new THREE.PointLight(0xffd070,.75,10,1.5); schatzLicht.position.set(1.5,3.8,-2.4); sc.add(schatzLicht);

  /* ---------- Teppiche ---------- */
  const tRot=teppichBild('#7a1c24','#3a0c10','#1c2c64'), tBlau=teppichBild('#1c2c64','#0c1434','#a8282c');
  teppich(sc,tRot,0,.014,6.0,3.8,10.0);
  teppich(sc,tBlau,-7.4,.018,7.4,4.6,4.0);
  teppich(sc,tBlau,11.2,.022,3.7,4.0,4.2);
  teppich(sc,tRot,-11.5,.026,2.5,4.4,4.6);
  teppich(sc,tBlau,-9.5,.016,-1.6,3.0,2.6);

  /* ---------- kleine Münzhäufchen, nur am Rand (viel kleiner als der Goldschatz) ---------- */
  [[-16.8,12.2,.75],[16.9,12.4,.65],[-16.7,-4.9,.5],[16.9,-9.2,.7],[8.4,-12.6,.6],[-.7,-12.7,.5],[-11.9,12.5,.55],[11.6,12.5,.6],[17.0,-1.8,.45]].forEach(([x,z,r],i)=>{
    muenzHaufen(sc,x,0,z,r,r*.6,Math.round(r*80),.1); glitzer(k,sc,x,r*.75,z+.1,.6,i*1.7); k.kreis(x,z,r*.95); });

  /* ---------- Goldbarren und Gefäße ---------- */
  const lager=gruppe(sc,0,0,0);
  barren(k,lager,-10.4,-12.4);
  verschmelze(lager);
  const toepfe=gruppe(sc,0,0,0);
  gefaesse(k,toepfe,-7.4,-12.35,0); gefaesse(k,toepfe,-4.2,12.35,1); gefaesse(k,toepfe,4.2,12.3,1); gefaesse(k,toepfe,-9.6,12.35,3); gefaesse(k,toepfe,16.5,-11.9,2); gefaesse(k,toepfe,-16.6,3.2,1);
  verschmelze(toepfe);
  glitzer(k,sc,-10.4,.95,-12.0,.6,.4); glitzer(k,sc,-16.9,2.0,-2.0,.5,4.1); glitzer(k,sc,16.9,2.0,1.9,.5,5.3); glitzer(k,sc,-16.9,2.9,9.0,.45,1.2); glitzer(k,sc,-9.3,.75,-6.9,.5,3.6);

  /* ---------- schwebender Goldstaub ---------- */
  const N=130, staub=new THREE.InstancedMesh(GEO.sph,basis(0xffe08a,{transparent:true,opacity:.7,depthWrite:false}),N), o=new THREE.Object3D(), P=[];
  staub.frustumCulled=false; sc.add(staub);
  for(let i=0;i<N;i++){ const nah=i<40; P.push({ x:nah?1.5+(zufall()-.5)*5:-16+zufall()*32, z:nah?-3.5+(zufall()-.5)*4:-12+zufall()*24, p:zufall(), d:zufall()*6.28, r:.015+zufall()*.022 }); }
  const schwebe=t=>{ P.forEach((q,i)=>{ const f=(t*.045+q.p)%1, r=q.r*Math.sin(f*Math.PI); o.position.set(q.x+Math.sin(t*.4+q.d)*.4,.4+f*4.2,q.z+Math.cos(t*.33+q.d)*.4); o.scale.set(r,r,r); o.updateMatrix(); staub.setMatrixAt(i,o.matrix); }); staub.instanceMatrix.needsUpdate=true; };
  schwebe(0); k.anim.push(schwebe);

  /* ---------- die Palastkatze streift über den Teppich ---------- */
  katze(k,[[-3.4,3.4],[3.2,3.4],[3.2,11.0],[-3.4,11.0]],1.4);

  return { tuer, start:[-.6,8.6] };
}

const verstecke=[[-13.6,10.0],[-11.0,9.8],[-1.6,12.4],[1.4,12.2],[8.4,11.6],[13.2,10.4],[15.4,7.6],[15.6,.9],[15.4,-6.4],[11.8,-8.8],
  [7.8,-9.4],[3.0,-9.2],[1.4,-7.2],[-4.6,-9.6],[-15.2,-1.0],[-14.8,4.7],[-14.6,-4.6],[-5.6,2.0],[8.0,.8],[8.8,7.0]];

/* ---------- Gegenstände ---------- */
const gegenstaende=[
  { x:-12.8, z:1.0, dreh:.55, steh:[-11.3,3.45], kasten:[3.5,3.4], treffer:[2.5,4.3,2.2], baue(g,k){ /* 1 Goldener Thron auf einem Podest */
      box(g,2.8,.22,2.4,NACHT,0,.11,0); box(g,2.5,.2,2.1,WEIN,0,.32,0); box(g,2.56,.06,.06,gold(),0,.4,1.05);
      /* Löwenbeine */
      [-.72,.72].forEach(x=>[-.55,.5].forEach(z=>{ rohr(g,.17,.1,.85,gold(),x,.92,z); ball(g,.17,hell(),x,.52,z+.07,1,.65,1.25); [-.08,0,.08].forEach(d=>ball(g,.045,GOLD2,x+d,.49,z+.28)); ball(g,.18,gold(),x,1.27,z,1,.8,1); }));
      /* Sitz mit rotem Kissen */
      box(g,1.8,.26,1.45,gold(),0,1.43,-.02); box(g,1.84,.07,1.49,BLAU,0,1.4,-.02); ball(g,.5,ROT,0,1.62,.06,1.45,.28,1.2);
      /* hohe Lehne mit Sonnenscheibe und Streifen */
      box(g,1.75,2.15,.2,gold(),0,2.6,-.68); box(g,1.45,1.8,.05,NACHT,0,2.55,-.56);
      [-.5,-.25,0,.25,.5].forEach((x,i)=>box(g,.11,.85,.03,i%2?gold():0x1fa8a0,x,2.1,-.52));
      const sc=walze(g,.4,.07,hell(),0,3.0,-.52); sc.rotation.x=Math.PI/2; ring(g,.42,.05,ROT,0,3.0,-.48); juwel(g,.15,ROT,0,3.0,-.47);
      const bogen=walze(g,.87,.19,gold(),0,3.67,-.68); bogen.rotation.x=Math.PI/2; bogen.scale.set(.87,.19,.45);
      ring(g,.6,.05,ROT,0,3.66,-.56,Math.PI).scale.y=.52; juwel(g,.12,BLAU,0,3.86,-.56);
      [-1,1].forEach(s=>{ walze(g,.09,2.25,hell(),s*.94,2.65,-.68); ball(g,.17,hell(),s*.94,3.86,-.68);
        /* Armlehnen mit Knäufen */
        box(g,.22,.14,1.2,hell(),s*.97,2.1,-.02); walze(g,.07,.6,gold(),s*.97,1.76,.45); ball(g,.19,gold(),s*.97,2.14,.62); [-1,1].forEach(v=>ball(g,.07,gold(),s*.97+v*.12,2.3,.62)); juwel(g,.06,GRUEN,s*.97,2.15,.82); });
      /* Fußschemel */
      box(g,1.0,.1,.45,gold(),0,.66,.88); [-.4,.4].forEach(x=>box(g,.1,.22,.34,GOLD2,x,.52,.88)); box(g,.86,.07,.34,ROT,0,.74,.88);
      glitzer(k,g,.9,3.9,-.4,.8,.6); glitzer(k,g,-.8,2.2,.7,.55,3.4); } },
  { x:1.5, z:-3.5, steh:[1.5,-.55], r:2.15, treffer:[3.6,2.9,3.4], baue(g,k){ /* 2 Goldschatz: großer Münzhaufen auf einem runden Podest */
      rohr(g,2.1,2.15,.24,NACHT,0,.12,0,40); reif(g,2.1,.06,gold(),0,.25,0); rohr(g,1.86,1.9,.24,WEIN,0,.37,0,40); reif(g,1.86,.07,hell(),0,.49,0);
      for(let i=0;i<12;i++){ const a=i*Math.PI/6+.26; juwel(g,.09,i%2?0x2fd0c0:HELLGOLD,Math.cos(a)*2.14,.13,Math.sin(a)*2.14); }
      muenzHaufen(g,0,.5,0,1.65,1.55,520,.15);
      /* großer Pokal obenauf */
      const p=gruppe(g,.12,1.98,0); becher(p,0,0,0,1.55); [-1,1].forEach(s=>{ const t=ring(p,.16,.035,hell(),s*.34,.62,0,Math.PI); t.rotation.z=-s*Math.PI/2; }); juwel(p,.07,ROT,0,.62,.28);
      /* Edelsteine, Perlenkette und eine Krone im Haufen */
      [[-.75,1.6,.55,ROT],[.9,1.35,.6,BLAU],[-.15,1.15,1.17,GRUEN],[.5,1.8,.4,0xc050e0],[-1.1,1.0,-.35,BLAU],[1.25,.9,-.25,ROT]].forEach(([x,y,z,f])=>juwel(g,.17,f,x,y,z));
      for(let i=0;i<17;i++){ const u=i/16, x=-1.2+u*1.5, z=.75+Math.sin(u*Math.PI)*.5; ball(g,.07,0xfff6e8,x,.5+1.55*(1-Math.pow(Math.min(1,Math.hypot(x,z)/1.65),1.5))+.1,z); }
      const kr=gruppe(g,-.62,1.82,.15); kr.rotation.set(.1,0,.4); rohr(kr,.36,.32,.2,hell(),0,0,0,20,true); reif(kr,.33,.035,GOLD2,0,-.09,0);
      for(let i=0;i<8;i++){ const a=i*Math.PI/4; ball(kr,.075,hell(),Math.cos(a)*.36,.18,Math.sin(a)*.36,1,1.5,1); } juwel(kr,.08,ROT,0,0,.36);
      [[.1,2.9,.3,1.0],[-1.0,1.5,.8,.8],[1.1,1.3,.7,.75],[-.3,.9,1.5,.65],[.8,1.9,-.3,.7],[-1.3,.8,-.5,.6],[1.5,.7,.2,.55],[.4,1.5,1.0,.6]].forEach(([x,y,z,s],i)=>glitzer(k,g,x,y,z,s,i*.9));
      schein(g,'rgba(255,205,80,.28)',0,1.5,0,4.6); } },
  { x:9.6, z:-6.2, dreh:-.3, steh:[8.85,-3.8], kasten:[3.4,2.5], treffer:[3.0,3.9,1.7], baue(g,k){ /* 3 Anubis-Figur: liegender schwarzer Hund auf einem goldenen Kasten */
      box(g,3.0,.2,1.7,NACHT,0,.1,0); box(g,2.7,1.3,1.4,gold(),0,.85,0); box(g,2.92,.18,1.6,hell(),0,1.59,0); box(g,2.8,.06,1.5,NACHT,0,1.47,0);
      /* Felder mit Rauten */
      [-.66,.66].forEach(x=>{ box(g,1.12,.86,.04,NACHT,x,.82,.71); box(g,.96,.7,.03,gold(),x,.82,.73);
        const a=box(g,.42,.42,.03,0x1fa8a0,x,.82,.75); a.rotation.z=Math.PI/4; const b=box(g,.2,.2,.03,ROT,x,.82,.77); b.rotation.z=Math.PI/4; });
      [-1,1].forEach(s=>{ box(g,.04,.86,1.0,NACHT,s*1.36,.82,0); box(g,.05,.5,.64,0x1fa8a0,s*1.37,.82,0); });
      const F=0x17141c, F2=0x2c2836;
      /* Körper, Hinterläufe, Pfoten, Schwanz */
      ball(g,.5,F,-.25,2.05,0,1.7,.78,.9); ball(g,.45,F,.38,2.12,0,.95,1.0,.92);
      [-1,1].forEach(s=>{ ball(g,.34,F2,-.7,1.98,s*.34,1.15,.95,.55); ball(g,.12,F,-.35,1.78,s*.5,2.1,.75,.9);
        strich(g,[.5,1.9,s*.26],[1.28,1.79,s*.3],.13,F); ball(g,.15,F2,1.32,1.79,s*.3,1.25,.7,1); [-.06,.06].forEach(d=>ball(g,.025,GOLD,1.49,1.79,s*.3+d)); });
      strich(g,[-1.0,1.95,.1],[-1.36,1.78,.5],.1,F); strich(g,[-1.36,1.78,.5],[-1.4,1.18,.72],.085,F); ball(g,.1,F,-1.4,1.14,.72,1,1.4,1);
      /* Hals mit goldenem Halsband */
      strich(g,[.5,2.2,0],[.8,2.78,0],.25,F); const hb=ring(g,.27,.07,hell(),.67,2.54,0); hb.rotation.set(Math.PI/2,-.48,0); juwel(g,.09,ROT,.9,2.42,.14);
      /* Kopf dreht sich freundlich nach vorn */
      const kopf=gruppe(g,.85,2.98,0); kopf.rotation.y=-.85; kopf.userData.lebendig=true; const fest=gruppe(kopf,0,0,0);
      ball(fest,.34,F,0,0,0,1.05,1,.95); ball(fest,.2,F,.36,-.08,0,1.7,.8,.85); ball(fest,.085,0x4a4658,.7,-.04,0);
      [-1,1].forEach(s=>{ const o=kegel(fest,.15,.62,F,-.08,.48,s*.2); o.rotation.x=s*.2; const i=kegel(fest,.075,.4,gold(),-.01,.45,s*.215); i.rotation.x=s*.2;
        ball(fest,.082,0xffffff,.27,.1,s*.19); ball(fest,.045,0x100c14,.335,.105,s*.205); ball(fest,.015,0xffffff,.375,.125,s*.2); strich(fest,[.2,.215,s*.12],[.3,.2,s*.27],.018,GOLD); });
      const mund=ring(fest,.13,.016,0xe0788a,.5,-.17,0,Math.PI); mund.rotation.set(0,Math.PI/2,Math.PI);
      verschmelze(fest);
      k.anim.push(t=>{ kopf.rotation.z=Math.sin(t*.9)*.05; kopf.rotation.y=-.85+Math.sin(t*.5)*.18; });
      glitzer(k,g,-1.2,1.65,.8,.55,1.9); glitzer(k,g,1.3,.9,.8,.45,4.6); } },
  { x:11.2, z:3.2, steh:[11.2,5.1], kasten:[2.2,1.55], treffer:[2.2,2.9,1.5], baue(g,k){ /* 4 Schmuckkästchen: offen, Ketten hängen heraus */
      [-.85,.85].forEach(x=>[-.5,.5].forEach(z=>{ rohr(g,.11,.06,.8,gold(),x,.4,z); ball(g,.12,gold(),x,.8,z); }));
      box(g,2.1,.14,1.4,HOLZ2,0,.86,0); box(g,1.98,.05,1.28,WEIN,0,.955,0); box(g,1.98,.26,.04,WEIN,0,.76,.71); box(g,1.98,.05,.05,gold(),0,.63,.71);
      /* Kästchen: türkisblau mit Goldkanten, Deckel aufgeklappt */
      const B=0x1f7ab0;
      box(g,1.5,.1,.9,B,0,1.03,-.05); [-.42,.32].forEach(z=>box(g,1.5,.5,.1,B,0,1.28,z)); [-1,1].forEach(s=>box(g,.1,.5,.84,B,s*.72,1.28,-.05));
      box(g,1.34,.04,.66,ROT,0,1.4,-.05);
      [-.45,.4].forEach(z=>box(g,1.58,.08,.09,gold(),0,1.54,z)); [-1,1].forEach(s=>{ box(g,.09,.08,.9,gold(),s*.75,1.54,-.03); box(g,.09,.5,.04,gold(),s*.72,1.28,.38); });
      juwel(g,.12,ROT,0,1.24,.39); [-.4,.4].forEach(x=>juwel(g,.08,HELLGOLD,x,1.24,.39));
      const d=gruppe(g,0,1.56,-.47); d.rotation.x=-.38; box(d,1.56,.9,.1,B,0,.45,-.04); box(d,1.32,.7,.03,ROT,0,.45,.025); box(d,1.6,.08,.14,gold(),0,.92,-.04); [-1,1].forEach(s=>box(d,.08,.9,.14,gold(),s*.76,.45,-.04));
      juwel(d,.13,BLAU,0,.5,.07); ring(d,.2,.03,hell(),0,.5,.05);
      /* Ketten aus Perlen: sie quellen über den vorderen Rand */
      const kette=(P,f,r)=>{ for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], n=Math.max(1,Math.round(Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2])/(r*1.7))); for(let j=0;j<n;j++){ const u=j/n; ball(g,r,f,a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u); } } };
      kette([[-.55,1.5,0],[-.45,1.62,.42],[-.42,1.15,.55],[-.22,.99,.62],[0,1.15,.55],[.04,1.6,.42],[0,1.5,.05]],hell(),.065);
      kette([[.1,1.5,-.15],[.25,1.63,.43],[.34,1.2,.52],[.52,1.02,.6],[.68,1.28,.5],[.64,1.62,.38],[.5,1.5,0]],0xfff4e4,.065);
      kette([[-.6,1.55,-.25],[-.2,1.66,-.1],[.15,1.55,.15],[.5,1.66,-.2]],mat(ROT),.07);
      kette([[.75,1.58,.1],[.95,1.1,.2],[.9,.99,.55],[.6,.99,.62]],mat(0x2fd0a0),.055);
      [[-.3,1.52,.05,BLAU],[.35,1.54,.1,GRUEN],[0,1.52,-.2,0xc050e0]].forEach(([x,y,z,f])=>juwel(g,.14,f,x,y,z));
      reif(g,.15,.045,hell(),-.8,1.02,.35); reif(g,.12,.04,gold(),-.62,1.01,.55);
      glitzer(k,g,-.45,1.75,.5,.65,.2); glitzer(k,g,.5,1.7,.3,.55,2.5); glitzer(k,g,-.8,1.15,.4,.45,4.4); } },
  { wand:'hinten', x:-3.4, z:-13.5, steh:[-3.4,-11.6], kasten:[4.0,1.2], treffer:[3.8,2.6,1.0], trefferY:1.3, baue(g,k){ /* 5 Modell der Sonnenbarke auf einem Wandbrett */
      /* runde dunkelblaue Zierscheibe dahinter, damit sich das Boot abhebt */
      const s=walze(g,1.45,.08,NACHT,0,2.75,.07); s.rotation.x=Math.PI/2; ring(g,1.48,.07,gold(),0,2.75,.12);
      box(g,3.8,.16,.95,HOLZ,0,1.66,.48); box(g,3.84,.06,.05,gold(),0,1.66,.97);
      [-1.45,1.45].forEach(x=>{ box(g,.18,.7,.14,HOLZ2,x,1.25,.07); strich(g,[x,.95,.12],[x,1.58,.8],.08,HOLZ2); ball(g,.1,hell(),x,.9,.14); });
      /* Ständer des Modells */
      [-.6,.6].forEach(x=>box(g,.18,.22,.5,NACHT,x,1.84,.55));
      flachform(g,[[-1.75,3.0],[-1.55,3.02],[-1.38,2.55],[-.95,2.34],[.95,2.34],[1.38,2.55],[1.55,3.02],[1.75,3.0],[1.62,2.45],[1.15,2.04],[.55,1.92],[-.55,1.92],[-1.15,2.04],[-1.62,2.45]],.46,gold(),0,0,.58);
      flachform(g,[[-1.3,2.27],[-.9,2.18],[.9,2.18],[1.3,2.27],[1.2,2.14],[.85,2.05],[-.85,2.05],[-1.2,2.14]],.05,BLAU,0,0,.83);
      [-.75,-.25,.25,.75].forEach((x,i)=>juwel(g,.06,i%2?ROT:HELLGOLD,x,2.26,.83));
      [-1,1].forEach(v=>{ ball(g,.17,hell(),v*1.66,3.08,.58,1,1.1,1); ball(g,.07,ROT,v*1.66,3.28,.58); });
      /* Häuschen und rote Sonnenscheibe */
      box(g,.95,.52,.4,BLAU,0,2.6,.55); box(g,1.1,.1,.48,hell(),0,2.9,.55); [-.38,-.13,.13,.38].forEach(x=>box(g,.07,.52,.03,gold(),x,2.6,.76));
      walze(g,.05,.2,gold(),0,3.02,.55); const so=walze(g,.38,.1,mat(ROT,{emissive:0x501008}),0,3.46,.55); so.rotation.x=Math.PI/2; ring(g,.4,.055,hell(),0,3.46,.57);
      /* zwei lange Ruder: Griff im Boot, in einer Gabel auf der Bordwand gelagert, Blatt schräg nach unten vor dem Wandbrett */
      [[-1.02,2.4],[-.6,2.35]].forEach(([x,y])=>{ const dx=-.625, dy=-.78, ort=(u)=>[x+dx*u,y+dy*u,.9+u*.2];
        strich(g,ort(-.62),ort(.8),.028,0xd8a868); const gr=ort(-.62); ball(g,.05,HOLZ2,gr[0],gr[1],gr[2]);
        const b=gruppe(g,...ort(.98)); b.rotation.z=Math.atan2(dx,-dy); box(b,.19,.46,.035,0xf0d088,0,0,0); box(b,.194,.08,.04,ROT,0,-.14,0); box(b,.194,.05,.04,BLAU,0,-.04,0);
        box(g,.2,.1,.18,NACHT,x,y-.04,.86); [-1,1].forEach(v=>walze(g,.025,.17,hell(),x+v*.07,y+.05,.93-v*.015)); });
      glitzer(k,g,1.5,3.0,.9,.55,1.1); glitzer(k,g,-.7,2.3,.95,.4,3.9); } },
  { wand:'hinten', x:5.8, z:-13.5, steh:[5.8,-11.6], kasten:[3.0,1.1], treffer:[2.9,3.5,.7], trefferY:.8, baue(g){ /* 6 Schatzverzeichnis: große Liste an der Wand */
      const tex=bild(384,448,(c)=>{ c.fillStyle='#f0dcaa'; c.fillRect(0,0,384,448); for(let i=0;i<260;i++){ c.fillStyle=i%2?'rgba(150,110,50,.12)':'rgba(255,248,220,.2)'; c.fillRect(zufall()*384,zufall()*448,10+zufall()*30,2); }
        c.strokeStyle='#8a3020'; c.lineWidth=6; c.strokeRect(14,14,356,420); c.fillStyle='#8a3020'; c.fillRect(40,38,304,10);
        [90,128,166,206,244,282].forEach((x,i)=>GRAB.zeichen(c,i+2,x+8,74,34,'#1f4f9a'));
        c.fillStyle='#5a3018'; c.fillRect(30,102,324,5); c.fillRect(140,112,4,306);
        for(let z=0;z<5;z++){ const y=145+z*62;
          c.fillStyle=c.strokeStyle='#8a5a10'; c.lineWidth=6;
          if(z===0){ [0,1,2].forEach(i=>{ c.beginPath(); c.ellipse(78,y+14-i*13,26,7,0,0,7); c.fillStyle='#d8981c'; c.fill(); c.stroke(); }); }
          else if(z===1){ c.beginPath(); c.moveTo(58,y-22); c.lineTo(104,y-22); c.lineTo(90,y+4); c.lineTo(72,y+4); c.closePath(); c.fillStyle='#d8981c'; c.fill(); c.fillRect(77,y+4,8,14); c.fillRect(64,y+18,34,6); }
          else if(z===2){ c.beginPath(); c.arc(80,y,20,0,7); c.stroke(); c.fillStyle='#b8302a'; c.beginPath(); c.arc(80,y-22,9,0,7); c.fill(); }
          else if(z===3){ c.fillStyle='#1f7a60'; c.beginPath(); c.moveTo(80,y-24); c.lineTo(108,y); c.lineTo(80,y+24); c.lineTo(52,y); c.fill(); }
          else { c.fillStyle='#a85a2a'; c.beginPath(); c.ellipse(80,y+4,20,22,0,0,7); c.fill(); c.fillRect(70,y-26,20,14); }
          c.fillStyle='#3a2010'; const n=[7,4,9,5,3][z]; for(let i=0;i<n;i++) c.fillRect(168+i*19+(i>=5?12:0),y-18,7,36);
          c.fillStyle='rgba(90,48,24,.5)'; c.fillRect(30,y+29,324,3); } });
      GRAB.tafel(g,tex,2.4,2.8,0,2.55,.17);
      box(g,2.44,2.84,.07,0xc8a868,0,2.55,.1);
      [3.99,1.11].forEach(y=>{ strich(g,[-1.4,y,.2],[1.4,y,.2],.13,HOLZ); [-1,1].forEach(s=>{ ball(g,.17,hell(),s*1.44,y,.2); }); });
      [-1,1].forEach(s=>strich(g,[s*1.1,4.05,.18],[0,4.62,.1],.025,gold())); ball(g,.12,hell(),0,4.64,.12);
      strich(g,[.9,1.0,.28],[.9,.78,.28],.025,ROT); juwel(g,.12,ROT,.9,.72,.28); } },
  { x:14.3, z:-2.6, dreh:-.45, steh:[13.2,-.3], r:1.4, treffer:[3.1,3.7,1.3], baue(g,k){ /* 7 Goldwaage: Balkenwaage mit zwei Schalen */
      k.kreis(13.08,-3.19,.5); k.kreis(15.52,-2.01,.5); /* die ausladenden Schalen sind ebenfalls fest */
      walze(g,.85,.18,NACHT,0,.09,0); walze(g,.62,.16,gold(),0,.26,0); rohr(g,.09,.17,2.75,gold(),0,1.7,0); [.8,1.9].forEach(y=>ball(g,.19,hell(),0,y,0,1,.7,1));
      ball(g,.2,hell(),0,3.1,0); ball(g,.11,ROT,0,3.38,0);
      const balken=gruppe(g,0,3.08,.14); balken.userData.lebendig=true; const b0=gruppe(balken,0,0,0);
      box(b0,2.7,.13,.12,hell(),0,0,0); [-1,1].forEach(s=>ball(b0,.13,gold(),s*1.35,0,0)); strich(b0,[0,0,.08],[0,.5,.08],.03,DUNKEL); juwel(b0,.1,BLAU,0,0,.1); verschmelze(b0);
      const schalen=[-1,1].map(s=>{ const p=gruppe(g,s*1.35,3.08,.14); p.userData.lebendig=true; const f=gruppe(p,0,0,0);
        [[-.48,0],[.24,.42],[.24,-.42]].forEach(([x,z])=>strich(f,[0,0,0],[x,-1.35,z],.018,GOLD2));
        rohr(f,.58,.3,.18,gold(),0,-1.43,0,24); reif(f,.58,.04,hell(),0,-1.33,0);
        if(s<0){ [[-.2,.05],[.16,.12],[0,-.2],[.25,-.12],[-.1,.25]].forEach(([x,z],i)=>walze(f,.15,.05,i%2?hell():mat(0xf0b820),x,-1.31+i*.028,z)); walze(f,.14,.05,hell(),.02,-1.16,.02); }
        else { [[-.2,0,.19],[.2,.1,.15],[.05,-.22,.12]].forEach(([x,z,r])=>{ walze(f,r,r*1.5,0x6a6e78,x,-1.34+r*.75,z); ball(f,r*.38,0x8a909c,x,-1.34+r*1.62,z); }); }
        verschmelze(f); return p; });
      k.anim.push(t=>{ const a=Math.sin(t*.8)*.1; balken.rotation.z=a; schalen.forEach((p,i)=>{ const s=i?1:-1; p.position.set(s*1.35*Math.cos(a),3.08+s*1.35*Math.sin(a),.14); }); });
      glitzer(k,g,-1.3,1.95,.5,.5,2.2); glitzer(k,g,.1,3.2,.35,.5,5.0); } },
  { x:-7.4, z:7.2, dreh:.3, steh:[-6.65,9.55], kasten:[3.0,2.2], treffer:[2.8,2.4,1.8], baue(g){ /* 8 Schreiberpult mit Papyrus */
      [-1.05,1.05].forEach(x=>{ box(g,.16,1.0,.16,HOLZ2,x,.5,.5); box(g,.16,1.35,.16,HOLZ2,x,.68,-.5); box(g,.12,.12,1.0,HOLZ2,x,.35,0); });
      box(g,2.1,.1,.1,HOLZ2,0,.35,-.5);
      /* schräge Platte */
      const p=gruppe(g,0,1.22,0); p.rotation.x=.34; box(p,2.5,.14,1.35,HOLZ,0,0,0); box(p,2.5,.12,.1,HOLZ2,0,.11,.66);
      /* Papyrus mit gerollten Enden und Zeilen aus Bildzeichen */
      const tex=bild(384,256,(c)=>{ c.fillStyle='#f6e6b8'; c.fillRect(0,0,384,256); for(let i=0;i<90;i++){ c.fillStyle='rgba(160,120,50,.16)'; c.fillRect(zufall()*384,zufall()*256,20+zufall()*40,2); }
        for(let z=0;z<4;z++){ for(let i=0;i<(z===3?4:8);i++) GRAB.zeichen(c,i*3+z*5,38+i*44,40+z*56,34,z===0?'#a83820':'#3a2418'); c.fillStyle='rgba(120,80,40,.45)'; c.fillRect(20,66+z*56,344,2); } });
      const bl=GRAB.tafel(p,tex,1.55,.98,-.22,.085,-.02); bl.rotation.x=-Math.PI/2;
      [-1,1].forEach(s=>{ const r=walze(p,.1,1.06,0xe8d298,-.22+s*.84,.16,-.02); r.rotation.x=Math.PI/2; [-.56,.56].forEach(z=>ball(p,.07,HOLZ2,-.22+s*.84,.16,z-.02)); });
      /* Farbpalette und Schreibrohre */
      box(p,.42,.08,.85,0xd8b878,.93,.11,0); walze(p,.11,.05,0x18141c,.93,.17,-.22); walze(p,.11,.05,ROT,.93,.17,.1);
      [[.85,.42],[1.02,.44]].forEach(([x,z],i)=>{ strich(p,[x,.19,z],[x-.03,.19,z-.5],.025,i?GRUEN:0xb8a048); });
      /* Tintennapf mit Rohrfeder auf einem Seitenbrett */
      box(g,.5,.1,.5,HOLZ,-1.4,.9,.1); strich(g,[-1.12,.6,.1],[-1.55,.86,.1],.05,HOLZ2); rohr(g,.16,.2,.22,NACHT,-1.42,1.06,.1); reif(g,.15,.025,gold(),-1.42,1.18,.1); strich(g,[-1.42,1.15,.1],[-1.56,1.55,.02],.025,0xd8c060);
      /* Sitzkissen davor */
      box(g,1.3,.16,.5,WEIN,0,.09,.92); box(g,1.34,.04,.54,gold(),0,.09,.92);
      /* Papyrusrollen in einem Köcher aus Ton */
      rohr(g,.28,.22,.55,0xb86a38,1.42,.28,-.5); [[0,0],[.1,.1],[-.1,.08]].forEach(([x,z])=>{ strich(g,[1.42+x*.5,.4,-.5+z*.5],[1.42+x*1.8,1.05,-.5+z*1.5],.075,0xf0dca8); }); } },
  { x:14.2, z:-11.0, dreh:-.45, steh:[13.2,-8.9], r:1.15, treffer:[2.5,4.0,1.1], baue(g,k){ /* 9 Goldener Spiegel: Standspiegel mit runder Metallfläche */
      box(g,2.1,.2,1.0,NACHT,0,.1,0); box(g,1.7,.16,.75,gold(),0,.28,0);
      rohr(g,.14,.3,.95,gold(),0,.82,0); ball(g,.24,hell(),0,.72,0,1,.7,1); box(g,.95,.18,.28,hell(),0,1.34,0); [-1,1].forEach(s=>strich(g,[s*.1,.9,0],[s*.7,1.55,0],.08,gold()));
      const rueck=walze(g,1.12,.12,GOLD2,0,2.5,-.02); rueck.rotation.x=Math.PI/2;
      const tex=bild(256,256,(c)=>{ const v=c.createLinearGradient(30,20,226,236); v.addColorStop(0,'#fffbe8'); v.addColorStop(.35,'#f0d8a0'); v.addColorStop(.55,'#c8e4ea'); v.addColorStop(.75,'#e0b870'); v.addColorStop(1,'#9a6a30'); c.fillStyle=v; c.fillRect(0,0,256,256);
        c.strokeStyle='rgba(255,255,255,.75)'; c.lineCap='round'; [[22,60,150,150,66],[9,100,178,168,110],[6,150,206,196,160]].forEach(([w,a,b,d,e])=>{ c.lineWidth=w; c.beginPath(); c.moveTo(a,b); c.lineTo(d,e); c.stroke(); }); });
      const f=new THREE.Mesh(new THREE.CircleGeometry(.96,40),new THREE.MeshBasicMaterial({map:tex})); f.position.set(0,2.5,.075); g.add(f);
      ring(g,1.04,.12,hell(),0,2.5,.09);
      for(let i=0;i<16;i++){ const a=i*Math.PI/8; juwel(g,.065,i%2?0x2fd0c0:ROT,Math.cos(a)*1.05,2.5+Math.sin(a)*1.05,.21); }
      /* Schmuckaufsatz */
      ball(g,.2,hell(),0,3.74,0); [-1,1].forEach(s=>{ const t=ring(g,.24,.055,gold(),s*.34,3.68,0,Math.PI*1.4); t.rotation.z=s>0?-.4:2.0; }); juwel(g,.11,BLAU,0,3.74,.19);
      /* wandernder Lichtreflex */
      const licht=schein(g,'rgba(255,255,255,.75)',0,2.5,.25,.8);
      k.anim.push(t=>{ licht.position.set(Math.sin(t*.7)*.55,2.5+Math.cos(t*.7)*.45,.25); const s=.55+Math.sin(t*2.3)*.2; licht.scale.set(s,s,1); });
      glitzer(k,g,.85,3.2,.35,.65,.9); } },
  { x:5.7, z:8.6, steh:[5.9,10.45], kasten:[2.9,1.0], treffer:[2.9,3.7,.8], baue(g,k){ /* 10 Federfächer: großer Fächer aus bunten Federn auf einem Ständer */
      walze(g,.55,.16,NACHT,0,.08,0); walze(g,.36,.14,gold(),0,.22,0); rohr(g,.1,.15,1.5,gold(),0,1.0,0); [.6,1.2].forEach(y=>ball(g,.17,hell(),0,y,0,1,.65,1));
      const fa=gruppe(g,0,1.75,0); fa.userData.lebendig=true; const f=gruppe(fa,0,0,0);
      /* eine Feder: schmale Fahne mit Einkerbungen und spitzem Ende, Federkiel mit schrägen Ästen */
      const FAHNE=[[.025,.2],[.085,.32],[.125,.48],[.135,.6],[.045,.62],[.13,.69],[.115,.79],[.05,.77],[.09,.87],[.045,.95],[0,1.04],[-.045,.95],[-.095,.85],[-.125,.74],[-.045,.7],[-.135,.62],[-.13,.5],[-.095,.4],[-.035,.41],[-.075,.3],[-.025,.2]];
      const feder=(winkel,laenge,farbe,tupfen,z)=>{ const q=gruppe(f,0,0,z); q.rotation.z=winkel; const kiel=farbe===0xf6f0e0?0xa88450:0xfff2d0;
        flachform(q,FAHNE.map(([x,y])=>[x,y*laenge]),.03,farbe,0,0,0); strich(q,[0,0,.03],[0,laenge*.97,.03],.014,kiel);
        [.34,.46,.57,.72,.84].forEach(u=>[-1,1].forEach(s=>strich(q,[0,laenge*u,.022],[s*.075,laenge*u+.1,.022],.005,kiel)));
        if(tupfen!==null){ ball(q,.06,tupfen,0,laenge*.84,.025,1,1.5,.35); ball(q,.028,HELLGOLD,0,laenge*.84,.045,1,1.4,.4); } };
      const A=[0xf6f0e0,0x1fb8b0,0xd83a34,0x2f6ad0];
      for(let i=0;i<11;i++){ const w=-1.5+i*.3; feder(w,1.58,A[i%4],i%4===0?0x2f6ad0:0xf6f0e0,-.05+(i%2)*.025); }
      for(let i=0;i<9;i++){ const w=-1.32+i*.33; feder(w,.98,[0xff9a2a,0x38b058,0x9a50c8][i%3],null,.07+(i%2)*.02); }
      /* goldene Fassung in Halbkreisform */
      const halb=walze(f,.48,.14,gold(),0,0,.15); halb.rotation.x=Math.PI/2; ring(f,.5,.07,hell(),0,0,.23,Math.PI); box(f,1.1,.14,.2,hell(),0,0,.15); juwel(f,.16,ROT,0,.14,.25); [-.28,.28].forEach(x=>juwel(f,.08,0x2fd0c0,x,.12,.25));
      verschmelze(f);
      k.anim.push(t=>{ fa.rotation.z=Math.sin(t*1.1)*.045; fa.rotation.x=Math.sin(t*.8)*.05; });
      glitzer(k,g,.2,1.95,.35,.45,3.1); } }
];

return { titel:'Die Schatzkammer', breite:36, tiefe:27, oben:['24,10,6','52,22,12','90,44,20'], baue, gegenstaende, verstecke };
})();

/* Raum 4: Der Tempel der Götter. Helle, hohe Halle aus Kalkstein mit Grün und Türkis, bunten Säulen,
   einem Lichtstrahl von oben und zwei sitzenden Steinfiguren. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das Sonnentor in der Mitte der Rückwand, zwei Flügel schwingen auf. */
RAEUME3D.grabkammer[3] = (function(){
const { TUERKIS, BLAU, ROT, GOLD, GOLD2, HOLZ, HOLZ2, SCHWARZ } = GRAB;
const KALK=0xece4cc, KALK2=0xd2c8aa, KALK3=0xaa9f82, FIGUR=0xbdb49c, FIGUR2=0xa0977f, GRUEN=0x3f9a6a, GRUEN2=0x236a50, TUERKIS2=0x127a78, PETROL=0x1c5a66, CREME=0xfbf5e2, BRONZE=0xc08a30;
const B=36, T=27, H=7.5, HINTEN=-13.5;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
/* leuchtendes Teil ohne Schatten */
const hell=m=>{ m.castShadow=false; return m; };
/* flache runde Scheibe mit Blick nach +z */
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
/* ebene Flächen mit scharfen Kanten (für Körper mit wenigen Seiten) */
const kantig=m=>{ m.geometry=m.geometry.toNonIndexed(); m.geometry.computeVertexNormals(); return m; };
/* Wanddeko wirft keinen Schatten */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* Flamme aus drei Kegeln, flackert. Fuß bei (x,y,z) */
function flamme(k,par,x,y,z,gr){
  const f=gruppe(par,x,y,z); f.userData.lebendig=true;
  const teile=[[0,0,.26,.8,0xff7a18],[-.13,.04,.16,.52,0xffa022],[.12,.08,.15,.46,0xffe066]].map(([a,b,r,h,c])=>({ m:hell(kegel(f,r*gr,h*gr,basis(c),a*gr,h*gr/2,b*gr)), h:h*gr }));
  const s=schein(par,'rgba(255,170,60,.55)',x,y+.45*gr,z+.1,1.9*gr);
  k.anim.push(t=>{ teile.forEach((q,i)=>{ const a=1+Math.sin(t*(9+i*3.1)+x+i*2)*.2; q.m.scale.y=q.h*a; q.m.position.y=q.h*a/2; q.m.rotation.z=Math.sin(t*6+i+z)*.07; });
    const g=1.9*gr*(1+Math.sin(t*12+x)*.08); s.scale.set(g,g,1); });
}

/* ---------- Ausgang: das Sonnentor ---------- */
function baueTor(k,sc,hinten){
  const SY=3.5; /* Höhe der Sonnenscheibe, im Startbild sichtbar */
  /* Gang voller Licht dahinter */
  const gang=gruppe(hinten,0,0,0);
  box(gang,4.6,.1,4,0xf6e6b0,0,-.045,-15.5);
  [-1,1].forEach(s=>{ box(gang,.2,4.4,3.6,0xfff0c4,s*2.25,2.2,-15.7); [.35,3.2].forEach(y=>hell(box(gang,.05,.14,3.4,basis(0x40c8b8),s*2.13,y,-15.7))); });
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,150,8,128,150,180); v.addColorStop(0,'#ffffff'); v.addColorStop(.35,'#fff6c0'); v.addColorStop(1,'#f0b040'); g.fillStyle=v; g.fillRect(0,0,256,256);
    g.strokeStyle='rgba(255,255,255,.6)'; g.lineWidth=6; for(let i=0;i<14;i++){ const a=i*Math.PI/7; g.beginPath(); g.moveTo(128+Math.cos(a)*34,150+Math.sin(a)*34); g.lineTo(128+Math.cos(a)*190,150+Math.sin(a)*190); g.stroke(); } });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4.6,4.4),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,2.2,-17.45); gang.add(e);
  verschmelze(gang); gang.visible=false;
  /* fester Rahmen mit Sonnenscheibe */
  const r=gruppe(hinten,0,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.7,3.75,.55,KALK2,s*2.36,1.87,.18); box(r,.92,.34,.75,GRUEN2,s*2.36,.17,.22);
    [.7,.95].forEach((y,i)=>box(r,.76,.14,.6,i?GOLD:TUERKIS,s*2.36,y,.19)); [3.0,3.25].forEach((y,i)=>box(r,.76,.14,.6,i?TUERKIS:ROT,s*2.36,y,.19)); });
  box(r,5.7,.42,.62,KALK,0,3.82,.2); box(r,6.0,.16,.72,GRUEN,0,4.1,.22); box(r,5.5,.1,.04,GOLD,0,3.82,.53);
  /* Sonnenscheibe, vorn auf dem Torbalken */
  scheibe(r,.45,.14,GOLD2,0,SY,.6); scheibe(r,.38,.16,GOLD,0,SY,.62); scheibe(r,.2,.18,0xf08a20,0,SY,.64); ring(r,.285,.025,CREME,0,SY,.73);
  verschmelze(r);
  const strahlen=gruppe(hinten,0,SY,HINTEN+.62); strahlen.userData.lebendig=true;
  for(let i=0;i<7;i++){ const a=i*Math.PI/6, l=i%2?1.0:1.2; strich(strahlen,[Math.cos(a)*.78,Math.sin(a)*.78,0],[Math.cos(a)*l,Math.sin(a)*l,0],.06,GOLD); ball(strahlen,.08,GOLD,Math.cos(a)*l,Math.sin(a)*l,0); }
  verschmelze(strahlen); strahlen.scale.setScalar(.66);
  const sonnenglanz=schein(hinten,'rgba(255,220,110,.7)',0,SY,HINTEN+.85,1.6);
  /* zwei Türflügel, Drehpunkt außen */
  const fluegel=[-1,1].map(s=>{ const f=gruppe(hinten,s*2,0,HINTEN-.06), t=gruppe(f,-s*1,0,0); f.userData.lebendig=true;
    box(t,1.98,3.58,.18,TUERKIS2,0,1.82,0);
    [.2,1.05,3.45].forEach(y=>box(t,1.98,.18,.06,GOLD,0,y,.11));
    [-.9,.9].forEach(x=>box(t,.14,3.58,.05,GOLD2,x,1.82,.105));
    [-.45,0,.45].forEach(x=>box(t,.2,.58,.04,GRUEN,x,.62,.1));
    /* halbe Sonne an der Mittelkante: zusammen eine ganze */
    const m=-s*.98;
    [[.52,GOLD,.14],[.3,0xf08a20,.155]].forEach(([rad,c,z])=>{ const h=new THREE.Mesh(new THREE.CircleGeometry(rad,22,s<0?Math.PI/2:-Math.PI/2,Math.PI),mat(c)); h.position.set(m,1.75,z); t.add(h); });
    for(let i=1;i<5;i++){ const a=(s<0?Math.PI/2:-Math.PI/2)+i*Math.PI/5; strich(t,[m+Math.cos(a)*.62,1.75+Math.sin(a)*.62,.11],[m+Math.cos(a)*.9,1.75+Math.sin(a)*.9,.11],.045,GOLD); }
    [-.55,0,.55].forEach(x=>ball(t,.085,GOLD,x,3.15,.11,1,1,.6));
    verschmelze(t); return f; });
  /* Riegel und Zahlenschloss */
  const sperre=gruppe(hinten,0,2.32,HINTEN+.2);
  box(sperre,2.5,.16,.1,GOLD2,0,0,0); [-1.2,1.2].forEach(x=>box(sperre,.2,.36,.18,BRONZE,x,0,0)); box(sperre,1.2,.96,.06,PETROL,0,0,.07); box(sperre,1.06,.82,.07,CREME,0,0,.08);
  const schloss=GRAB.zahlenschloss(sperre,0,-.07,.24); schloss.scale.setScalar(1.05);
  verschmelze(sperre);
  const licht=new THREE.PointLight(0xffdf90,0,13,1.5); licht.position.set(0,2.8,-14.6); sc.add(licht);
  [-1,1].forEach(s=>k.kasten(s*2.4,-13.1,.85,.8));
  return ausgang(k,{ name:'Sonnentor', einfach:'Tor mit der Sonne', steh:[0,-11.4], durch:[0,-15.4],
    treffer:{x:0,y:2.4,z:-13,b:4.8,h:4.4,t:.8}, schildOben:[0,3.65,-12.2], glanz:[0,2.5,-12.8],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.06)/.9)), w=1.52*a*a*(3-2*a);
      fluegel[0].rotation.y=w; fluegel[1].rotation.y=-w; sperre.visible=auf<.06; gang.visible=auf>.02; licht.intensity=1.7*auf;
      strahlen.scale.setScalar(.66*(1+auf*(.1+Math.sin(t*3)*.06))); const g=1.6+auf*2.4+Math.sin(t*2)*.15; sonnenglanz.scale.set(g,g,1); } });
}

/* ---------- sitzende Steinfigur (Deko an der Rückwand) ---------- */
function steinfigur(k,sc,x){
  const g=gruppe(sc,x,0,-12.2);
  /* Sockel und Thron */
  box(g,3.7,.34,2.6,KALK3,0,.17,0); box(g,3.4,.24,2.35,KALK2,0,.46,0); box(g,3.42,.1,.04,TUERKIS,0,.46,1.19);
  box(g,2.7,1.35,1.5,FIGUR2,0,1.25,-.4); box(g,2.5,2.7,.4,FIGUR2,0,2.25,-1.05); box(g,2.74,.14,.46,GRUEN2,0,3.62,-1.05);
  [-1,1].forEach(s=>{ box(g,.05,.9,1.1,GRUEN2,s*1.37,1.25,-.4); box(g,.06,.55,.7,TUERKIS,s*1.38,1.25,-.4);
    /* Beine, Füße, Oberschenkel */
    box(g,.55,1.35,.55,FIGUR,s*.46,1.25,.67); ball(g,.34,FIGUR,s*.46,.72,.96,.9,.55,1.25); box(g,.62,.46,1.5,FIGUR,s*.46,2.1,.18); ball(g,.31,FIGUR,s*.46,2.1,.9,1,.85,.8);
    /* Arme liegen ruhig auf den Knien */
    ball(g,.34,FIGUR,s*.94,3.35,-.4); strich(g,[s*.98,3.3,-.4],[s*1.0,2.55,-.28],.21,FIGUR); strich(g,[s*1.0,2.55,-.28],[s*.55,2.46,.58],.17,FIGUR); ball(g,.22,FIGUR,s*.5,2.43,.72,1,.5,1.35); });
  box(g,1.2,.3,1.0,CREME,0,2.2,-.15); box(g,.44,1.0,.08,CREME,0,1.65,.97); box(g,1.24,.14,.9,GOLD2,0,2.42,-.3);
  rohr(g,.78,.55,1.1,FIGUR,0,2.95,-.45);
  /* breiter Halskragen */
  [[.68,GOLD],[.52,TUERKIS],[.37,ROT]].forEach(([r,c],i)=>{ const q=ball(g,r,c,0,3.47,0.12+i*.045,1,.34,.55); q.castShadow=false; });
  /* Kopf mit gestreiftem Tuch, freundliches Gesicht */
  walze(g,.22,.3,FIGUR,0,3.62,-.35);
  box(g,1.4,.9,.35,TUERKIS2,0,4.08,-.65); ball(g,.62,TUERKIS2,0,4.45,-.42,1.05,.75,.8);
  [-1,1].forEach(s=>{ box(g,.34,1.05,.26,TUERKIS2,s*.56,3.9,-.25); [3.55,3.8,4.05,4.3].forEach(y=>box(g,.35,.08,.27,GOLD,s*.56,y,-.245)); });
  ball(g,.47,FIGUR,0,4.1,-.15,.95,1.05,.85); box(g,1.0,.13,.2,GOLD,0,4.52,.12);
  [-1,1].forEach(s=>{ ball(g,.075,CREME,s*.17,4.19,.23,1.3,.85,.5); ball(g,.04,SCHWARZ,s*.17,4.19,.27); strich(g,[s*.07,4.32,.23],[s*.28,4.31,.19],.022,FIGUR2); ball(g,.1,FIGUR,s*.46,4.08,-.14,.6,1.2,.8); });
  ball(g,.075,FIGUR2,0,4.07,.28,.8,1.2,1); const mund=ring(g,.15,.024,0x7a5a48,0,3.98,.255,Math.PI*.7); mund.rotation.z=Math.PI*1.15;
  verschmelze(g); k.kasten(x,-12.1,3.8,2.8); k.verdecker(g,x,-12.2,1.9);
}

/* ---------- bemalte Bilder für die Wände ---------- */
function uferBild(){
  return bild(512,288,(g)=>{ g.fillStyle='#f2e8c8'; g.fillRect(0,0,512,288);
    g.fillStyle='#2f9aa0'; g.fillRect(0,200,512,88); g.strokeStyle='#bfeee4'; g.lineWidth=5; for(let r=0;r<3;r++){ g.beginPath(); for(let x=0;x<=512;x+=16) g.lineTo(x,220+r*24+(x/16%2?7:-3)); g.stroke(); }
    for(let i=0;i<17;i++){ const x=18+i*30+(i%3)*5, y=70+(i*37)%70; if(i>5&&i<11) continue; g.strokeStyle='#2f7a48'; g.lineWidth=5; g.beginPath(); g.moveTo(x,214); g.quadraticCurveTo(x+6,150,x,y); g.stroke();
      g.fillStyle=i%2?'#4aa860':'#2f8a58'; g.beginPath(); g.moveTo(x,y+4); g.lineTo(x-20,y-22); g.quadraticCurveTo(x,y-40,x+20,y-22); g.fill(); }
    /* kleines Segelboot */
    g.fillStyle='#8a5a2a'; g.beginPath(); g.moveTo(190,196); g.quadraticCurveTo(256,240,322,196); g.lineTo(306,214); g.quadraticCurveTo(256,228,206,214); g.fill();
    g.fillRect(253,100,6,104); g.fillStyle='#c8503a'; g.fillRect(222,112,68,64); g.fillStyle='#f6d060'; g.fillRect(222,132,68,12);
    g.strokeStyle='#1f6a80'; g.lineWidth=12; g.strokeRect(6,6,500,276); g.strokeStyle='#c8902a'; g.lineWidth=4; g.strokeRect(18,18,476,252); });
}
function wandSchmuck(k,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  /* Schriftbänder oben */
  const band=GRAB.zeichenBild(1024,112,16,1);
  [-1,1].forEach(s=>{ GRAB.tafel(h,band,11.4,1.0,s*11.6,5.85,HINTEN+.03);
    box(h,11.7,.1,.1,GOLD2,s*11.6,6.42,HINTEN+.05); box(h,11.7,.1,.1,GRUEN2,s*11.6,5.28,HINTEN+.05);
    /* grüner Sockelstreifen */
    box(h,15.0,.5,.06,GRUEN,s*10.4,.25,HINTEN+.04); box(h,15.0,.08,.08,GOLD2,s*10.4,.55,HINTEN+.05); });
  const ufer=uferBild();
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.04), dreh=-s*Math.PI/2;
    [-6.7,6.7].forEach(z=>{ const m=GRAB.tafel(w,band,12.4,1.0,x,5.85,z); m.rotation.y=dreh; });
    box(w,.1,.1,T,GOLD2,s*(B/2-.05),6.42,0); box(w,.1,.1,T,GRUEN2,s*(B/2-.05),5.28,0);
    box(w,.06,.5,T,GRUEN,s*(B/2-.04),.25,0); box(w,.08,.08,T,GOLD2,s*(B/2-.05),.55,0);
    /* Bilder vom Flussufer */
    [-10.6,2.25,9.2].forEach(z=>{ const m=GRAB.tafel(w,ufer,3.9,2.2,x,2.9,z); m.rotation.y=dreh; });
    /* helle Fensterschlitze */
    [-11,-5,1,7,12].forEach(z=>{ box(w,.08,.62,1.5,GRUEN2,s*(B/2-.04),6.85,z); hell(box(w,.06,.44,1.3,basis(0xd8fbff),s*(B/2-.09),6.85,z)); box(w,.05,.46,.09,GRUEN2,s*(B/2-.13),6.85,z); });
    /* Stoffbahnen mit Streifen, bewegen sich leicht */
    [-4.3,12.1].forEach((z,i)=>{ const b=gruppe(w,s*(B/2-.14),5.1,z); b.userData.lebendig=true; const innen=gruppe(b,0,0,0);
      box(innen,.06,2.5,1.25,i?TUERKIS:GRUEN,0,-1.3,0); [-.5,-1.9].forEach(y=>box(innen,.075,.16,1.27,GOLD,0,y,0)); box(innen,.075,.5,1.27,CREME,0,-1.2,0); box(innen,.085,.18,1.28,ROT,0,-1.2,0);
      box(innen,.12,.1,1.5,HOLZ2,0,0,0); [-.75,.75].forEach(v=>ball(innen,.09,GOLD,0,0,v)); [-.42,0,.42].forEach(v=>ball(innen,.09,GOLD,0,-2.62,v));
      verschmelze(innen); ohneSchatten(innen); k.anim.push(t=>{ b.rotation.z=Math.sin(t*.9+z+s)*.018; }); });
  });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Möbel und Pflanzen als Deko ---------- */
/* Regal mit Schriftrollen an der Seitenwand (s: -1 links, 1 rechts) */
function rollenRegal(par,k,s,z){
  const g=gruppe(par,s*17.35,0,z);
  [-1.05,1.05].forEach(v=>box(g,.8,2.5,.14,HOLZ2,0,1.25,v)); [.18,.95,1.72,2.48].forEach(y=>box(g,.84,.1,2.2,HOLZ,0,y,0));
  [.38,1.15,1.92].forEach((y,e)=>{ for(let i=0;i<5-(e%2);i++){ const a=-.8+i*.38+(e%2)*.18, r=walze(g,.14,.68,i%3?0xf2e2b4:0xe4cc90,-s*.04,y,a); r.rotation.z=Math.PI/2; const b=walze(g,.15,.1,[ROT,TUERKIS,GRUEN][(i+e)%3],-s*.18,y,a); b.rotation.z=Math.PI/2; } });
  verschmelze(g); k.kasten(s*17.3,z,.95,2.3);
}
/* Steinbank an der Wand */
function bank(par,k,x,z){
  const g=gruppe(par,x,0,z);
  [-.85,.85].forEach(v=>{ box(g,.6,.5,.36,KALK3,0,.25,v); }); box(g,.78,.18,2.4,KALK,0,.59,0); box(g,.8,.06,2.2,GRUEN,0,.55,0);
  box(g,.66,.1,1.9,TUERKIS2,0,.72,0); [-.6,0,.6].forEach(v=>box(g,.67,.11,.14,GOLD,0,.722,v));
  verschmelze(g); k.kasten(x,z,.85,2.45);
}
/* niedriger eckiger Feuerstein mit Flamme */
function feuerstein(par,k,x,z){
  const g=gruppe(par,x,0,z);
  box(g,.9,.16,.9,GRUEN2,0,.08,0); box(g,.66,.74,.66,KALK2,0,.53,0); box(g,.7,.14,.7,TUERKIS,0,.5,0); box(g,.88,.2,.88,KALK,0,1.0,0); box(g,.6,.06,.6,0x4a3418,0,1.12,0);
  verschmelze(g); flamme(k,par,x,1.12,z,.85); k.kreis(x,z,.55);
}
/* Palme in eckigem Steinbeet */
function palmenBeet(par,k,x,z,dreh){
  const g=gruppe(par,x,0,z);
  box(g,1.4,.6,1.4,KALK2,0,.3,0); box(g,1.5,.12,1.5,GRUEN2,0,.64,0); box(g,1.2,.06,1.2,0x7a5430,0,.71,0); box(g,1.42,.14,1.42,TUERKIS,0,.3,0);
  const p=GRAB.palme(g,-.3*Math.cos(dreh),.3*Math.sin(dreh),4.2,dreh); p.position.y=.65;
  verschmelze(g); k.kasten(x,z,1.5,1.5); k.verdecker(g,x,z,1.2);
}
/* Papyrus-Büschel (Stängel mit Fächerkronen) in eine Instanzliste schreiben */
function papyrus(stiele,kronen,x,y,z,n,r,h){
  for(let i=0;i<n;i++){ const a=i*2.4, d=r*Math.sqrt((i+.5)/n), px=x+Math.cos(a)*d, pz=z+Math.sin(a)*d, hh=h*(.65+zufall()*.4), nx=(zufall()-.5)*.22, nz=(zufall()-.5)*.22;
    stiele.push([px,y+hh/2,pz,.03,hh,.03,0x3f8a48,0,nz,-nx]);
    kronen.push([px+nx*hh*.5,y+hh,pz+nz*hh*.5,.22,.24,.22,i%2?0x5ab458:0x83c456,a,Math.PI,0]); }
}
/* flaches Wasserbecken mit Rand, Seerosenblättern und Fischen */
function becken(par,k,x,z,b,t){
  const g=gruppe(par,x,0,z);
  [-1,1].forEach(s=>{ box(g,b,.36,.3,KALK,0,.18,s*(t/2-.15)); box(g,.3,.36,t-.6,KALK,s*(b/2-.15),.18,0); box(g,b+.02,.08,.32,TUERKIS,0,.2,s*(t/2-.15)); });
  box(g,b-.6,.2,t-.6,0x2c9ab0,0,.1,0);
  [[-.8,-.35],[.5,.4],[1.2,-.25],[-.2,.15]].forEach(([a,c],i)=>{ walze(g,.2-(i%2)*.05,.03,i%2?0x4aa84a:0x2f8a48,a,.215,c); });
  verschmelze(g);
  [[0xf08a2a,.55,0,.9],[0xffd23a,.38,2.4,.65],[0xe85a4a,.44,4.4,.8]].forEach(([c,tempo,start,w])=>{ const f=gruppe(par,x,.22,z); ball(f,.13,c,0,0,0,1.5,.4,.75); const sw=kegel(f,.1,.18,c,-.26,0,0); sw.rotation.z=-Math.PI/2; sw.scale.y=.18; sw.scale.x=.04; verschmelze(f); ohneSchatten(f);
    k.anim.push(a=>{ const u=a*tempo+start; f.position.set(x+Math.cos(u)*(b/2-.75)*w,.22,z+Math.sin(u)*(t/2-.65)*w); f.rotation.y=Math.atan2(-Math.cos(u)*(t/2-.65),-Math.sin(u)*(b/2-.75)); }); });
  k.kasten(x,z,b,t);
}

/* ---------- Lichtstrahl von oben mit tanzendem Staub ---------- */
function lichtstrahl(k,sc,x,z){
  [[.7,2.5,.075],[.45,1.5,.06]].forEach(([o,u,a])=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(o,u,10,28,1,true),basis(0xfff0a8,{transparent:true,opacity:a,depthWrite:false,side:THREE.DoubleSide})); m.position.set(x,5,z); sc.add(m); });
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(7,7),basis(0xffffff,{map:leuchtBild('rgba(255,236,150,.27)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); fleck.rotation.x=-Math.PI/2; fleck.position.set(x,.05,z); sc.add(fleck);
  const n=60, staub=new THREE.InstancedMesh(GEO.box,basis(0xfff8d0,{transparent:true,opacity:.8,depthWrite:false}),n), o=new THREE.Object3D(), D=[];
  for(let i=0;i<n;i++) D.push([zufall()*6.283,Math.sqrt(zufall()),zufall(),.02+zufall()*.03]);
  staub.frustumCulled=false; sc.add(staub);
  k.anim.push(t=>{ D.forEach((d,i)=>{ const h=(d[2]+t*.025)%1, y=.2+(1-h)*6.5, r=d[1]*(2.2-y*.2), a=d[0]+t*.12*(i%2?1:-1); o.position.set(x+Math.cos(a)*r,y,z+Math.sin(a)*r); o.rotation.set(t+i,t*.7+i,0); o.scale.set(d[3],d[3],d[3]); o.updateMatrix(); staub.setMatrixAt(i,o.matrix); }); staub.instanceMatrix.needsUpdate=true; });
}
/* kleine Schwalbe, kreist hoch in der Halle */
function schwalbe(k,sc,cx,cz,rx,rz,y,tempo,start){
  const g=gruppe(sc,cx,y,cz), F=0x24508a; g.scale.setScalar(.55);
  ball(g,.14,F,0,0,0,1.7,.8,.8); ball(g,.1,F,.24,.05,0); ball(g,.07,CREME,.08,-.07,0,1.8,.7,.9); ball(g,.04,0xf0a030,.36,.04,0,1.4,.7,.7);
  [-1,1].forEach(s=>strich(g,[-.2,0,s*.03],[-.48,.03,s*.15],.025,F));
  verschmelze(g); ohneSchatten(g);
  const fl=[-1,1].map(s=>{ const a=gruppe(g,0,.03,s*.07); hell(ball(a,.3,F,-.04,0,s*.24,.42,.07,1)); return a; });
  k.anim.push(t=>{ const u=t*tempo+start; g.position.set(cx+Math.cos(u)*rx,y+Math.sin(u*2.3)*.14,cz+Math.sin(u)*rz); const v=Math.sign(tempo); g.rotation.y=Math.atan2(-v*Math.cos(u)*rz,-v*Math.sin(u)*rx);
    const w=Math.sin(t*11+start)*.7; fl[0].rotation.x=w; fl[1].rotation.x=-w; });
}

function baue(k){
  const sc=k.scene;
  const h=GRAB.huelle(k,{ B,T,H, himmelLicht:0xf4fff8, grund:0x6a8a78, staerke:.68, sonne:0xfff2d8, sonneStaerke:.38,
    wandBild:GRAB.quaderBild([224,218,194],'#8f9a80',8), bodenBild:GRAB.quaderBild([196,206,184],'#5f8476',4), bodenWdh:[B/10,T/10],
    leiste:KALK3, band:TUERKIS, oeffnung:{x:0,b:4,h:3.6} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  sc.background=new THREE.Color(0x1d3a34);
  const tuer=baueTor(k,sc,hinten);
  wandSchmuck(k,hinten,links,rechts);
  [-1,1].forEach(s=>steinfigur(k,sc,s*11.4));

  /* ---------- bunte Säulen ---------- */
  [-1,1].forEach(s=>{ GRAB.saeule(sc,k,s*3.9,-9.8,6.4,KALK); [-7.5,-1,5.5].forEach((z,i)=>GRAB.saeule(sc,k,s*16.4,z,6.4,i%2?0xd4ecdc:KALK)); });

  /* ---------- Bodenschmuck: Weg zum Tor und Rahmen aus farbigen Platten ---------- */
  const boden=gruppe(sc,0,0,0);
  box(boden,3.0,.012,24.6,0xd6caa4,0,.008,.0);
  [-1,1].forEach(s=>{ box(boden,.24,.016,24.6,TUERKIS2,s*1.62,.012,0); box(boden,.1,.018,24.6,GOLD2,s*1.35,.014,0);
    box(boden,.18,.012,25,GRUEN,s*15.2,.008,0); box(boden,13.4,.012,.18,GRUEN,s*8.5,.008,-9.2); });
  for(let z=-11.4;z<=11.8;z+=2.9) [-1,1].forEach(s=>{ const q=box(boden,.2,.02,.2,ROT,s*1.62,.014,z); q.rotation.y=Math.PI/4; });
  verschmelze(boden); ohneSchatten(boden);

  lichtstrahl(k,sc,0,-3);

  /* ---------- Feuer, Becken, Möbel, Palmen ---------- */
  [[-3.45,-12.45],[3.45,-12.45],[-16.5,8.8],[16.5,8.8]].forEach(([x,z])=>feuerstein(sc,k,x,z));
  flacker(k,-3.4,2.1,-11.8,0xffa040,.55,8); flacker(k,3.4,2.1,-11.8,0xffa040,.55,8);
  const oben=new THREE.PointLight(0xfff0b0,.3,11,1.5); oben.position.set(0,4.2,-3); sc.add(oben);
  becken(sc,k,-12.6,10.5,4.4,2.4); becken(sc,k,10.4,11.1,4.4,2.2);
  [-1,1].forEach(s=>{ rollenRegal(sc,k,s,-4.3); bank(sc,k,s*17.0,2.25); });
  [[-16.3,-12,-.7],[16.3,-12,3.84],[-16.4,12,.7],[16.4,12,2.44]].forEach(([x,z,d])=>palmenBeet(sc,k,x,z,d));

  /* Papyrus in Becken und flachen Beeten */
  const stiele=[], kronen=[], gruen=gruppe(sc,0,0,0);
  [[-14.1,-12.4],[14.1,-12.4]].forEach(([x,z])=>{ box(gruen,1.1,.4,1.0,KALK2,x,.2,z); box(gruen,1.18,.1,1.08,GRUEN2,x,.42,z); papyrus(stiele,kronen,x,.4,z,14,.45,1.8); k.kasten(x,z,1.2,1.1); });
  [[-14.2,11.1],[-11.0,11.2],[11.9,11.6]].forEach(([x,z])=>papyrus(stiele,kronen,x,.2,z,7,.32,1.1));
  verschmelze(gruen);
  /* Grasbüschel an den Beckenrändern und unter den Regalen */
  const gras=[];
  [[-15.1,9.3],[-10.1,9.2],[-15.1,11.9],[8,10],[12.9,10.1],[-17.3,-10],[17.3,-10],[-17.3,11],[17.3,.2],[-17.3,.2],[9,-12.9],[-9,-12.9]].forEach(([x,z])=>{ for(let i=0;i<9;i++) gras.push([x+(zufall()-.5)*.5,.17,z+(zufall()-.5)*.4,.07,.34+zufall()*.2,.07,i%2?0x4a9a48:0x76b858,0,(zufall()-.5)*.6,(zufall()-.5)*.6]); });
  GRAB.viele(sc,GEO.cyl,stiele); GRAB.viele(sc,GEO.cone,kronen); GRAB.viele(sc,GEO.cone,gras);

  /* Blattgirlanden hoch an den Wänden */
  [[links,-1],[rechts,1]].forEach(([w,s])=>{ const blatt=[];
    for(let a=0;a<4;a++) for(let i=0;i<=18;i++){ const u=i/18, z=-13+a*6.5+u*6.5; blatt.push([s*(B/2-.2),5.05-Math.sin(u*Math.PI)*.55,z,.12,.16,.24,i%4===2?0xf0a0b8:(i%2?0x3f8a3c:0x66b04c),0,u*3,0]); }
    GRAB.viele(w,GEO.sph,blatt); });
  [-1,1].forEach(s=>{ const blatt=[]; for(let i=0;i<=24;i++){ const u=i/24; blatt.push([s*(3+u*5),5.12-Math.sin(u*Math.PI)*.22,HINTEN+.18,.2,.13,.12,i%4===2?0xf0a0b8:(i%2?0x3f8a3c:0x66b04c),0,0,u*3]); } GRAB.viele(hinten,GEO.sph,blatt); });

  /* ---------- Leben: Schwalben und eine Tempelkatze ---------- */
  schwalbe(k,sc,-15,-4,1.6,5.5,7.15,.5,0); schwalbe(k,sc,15,-3,1.6,6,7.25,-.45,2); schwalbe(k,sc,-10,-11.6,4.2,1,7.2,.55,4);
  katze(k,[[-2.4,-8],[2.4,-8],[2.8,-1],[2,5.5],[-2.2,5.8],[-2.8,-1]],1.3);

  return { tuer, start:[0,5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-14.6,-9.4],[-8.8,-9.2],[-2.8,-6.4],[-9,-1.6],[-14.6,1.6],[-6.8,.6],[-14,6.8],[-9.8,12],[-3.4,11.8],[-3.4,2.6],[3.4,1.2],[8.8,-9.2],[14.4,-9.6],[13.8,-3.6],[8.4,-1.4],[15,3],[9.4,8.2],[3.6,8.4],[15,10],[2.6,-6]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-5.5, z:-5, steh:[-5.5,-3.1], r:.8, treffer:[1.8,3.4,1.6], baue(g,k){ /* 1 Räuchergefäß: Schale auf hohem Fuß, aus der Duft aufsteigt */
      walze(g,.68,.12,PETROL,0,.06,0); rohr(g,.28,.6,.26,BRONZE,0,.25,0); walze(g,.11,1.25,GOLD,0,.98,0);
      [.55,1.05].forEach(y=>ball(g,.2,GOLD2,0,y,0,1,.7,1)); liegend(ring(g,.15,.045,TUERKIS,0,1.3,0));
      rohr(g,.72,.2,.46,GOLD,0,1.8,0); liegend(ring(g,.71,.065,GOLD2,0,2.03,0)); liegend(ring(g,.55,.04,ROT,0,1.86,0));
      [-1,1].forEach(s=>ring(g,.17,.04,BRONZE,s*.72,1.87,0));
      walze(g,.62,.05,0x5a3a28,0,2.02,0);
      [[-.28,.12],[.22,-.16],[.04,.27],[.31,.17],[-.14,-.26],[-.02,.02]].forEach(([x,z],i)=>{ const c=box(g,.17,.11,.14,i%2?0x2a201c:0x43342c,x,2.09,z); c.rotation.set(i*.5,i*1.3,i*.4); });
      [[-.13,.06],[.16,.04]].forEach(([x,z])=>hell(box(g,.07,.03,.06,basis(0xff6a1a),x,2.15,z)));
      /* drei Räucherstäbchen mit glimmender Spitze */
      [[-.3,-.05],[0,-.14],[.3,-.02]].forEach(([x,z])=>{ strich(g,[x*.4,2.06,z],[x,2.62,z],.018,0x6a3018); hell(ball(g,.04,basis(0xff7a20),x,2.64,z)); });
      /* Duftschwaden */
      const tex=leuchtBild('rgba(185,165,215,1)');
      const wolken=[]; for(let i=0;i<12;i++){ const s=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false})); g.add(s); wolken.push(s); }
      k.anim.push(t=>{ wolken.forEach((s,i)=>{ const a=(t*.22+i/12)%1; s.position.set(Math.sin(a*7+t*.6)*.3*a,2.4+a*1.6,Math.cos(a*5+i)*.12); const gr=.6+a*1.05; s.scale.set(gr,gr,1); s.material.opacity=.55*Math.min(1,1.35*(1-a))*Math.min(1,a*7); }); }); } },
  { x:6, z:-6, steh:[6,-3.9], kasten:[3.6,1.8], treffer:[3.5,2.4,1.8], baue(g){ /* 2 Opferaltar: Steintisch mit Obst, Brot und Blumen */
      box(g,3.4,.18,1.7,GRUEN2,0,.09,0); [-1.15,1.15].forEach(x=>{ box(g,.6,.95,1.2,KALK2,x,.65,0); box(g,.64,.14,1.24,TUERKIS,x,.5,0); });
      box(g,1.7,.6,.2,KALK3,0,.65,-.3); box(g,3.3,.26,1.6,KALK,0,1.24,0); box(g,3.32,.07,1.62,GOLD2,0,1.18,0);
      box(g,1.1,.03,1.64,CREME,0,1.385,0); box(g,1.1,.55,.03,CREME,0,1.12,.83); [.92,1.0].forEach((y,i)=>box(g,1.12,.05,.04,i?ROT:TUERKIS,0,y,.84));
      /* Brote */
      [[-1.2,.3,1],[-.8,-.15,.85],[-1.25,-.4,.7]].forEach(([x,z,s])=>{ ball(g,.3*s,0xc8843a,x,1.37+.15*s,z,1.15,.62,.9); [-.1,.08].forEach(v=>{ const q=box(g,.05,.02,.28*s,0xf4d090,x+v,1.37+.34*s,z); q.rotation.y=.5; }); });
      /* Obst: Melone, Orangen, Feigen, Trauben, Datteln */
      ball(g,.34,0x3f9a40,.1,1.7,-.25,1.2,.95,.95); [-.2,0,.2].forEach(v=>{ const q=ring(g,.31,.018,0x1f6a28,.1+v,1.7,-.25); q.rotation.y=Math.PI/2; q.scale.setScalar(1-Math.abs(v)*.5); });
      [[-.35,.4],[-.05,.45],[-.2,.18],[-.19,.35,.24]].forEach(([x,z,y])=>ball(g,.17,0xf59020,x,1.55+(y||0),z));
      [[.32,.42],[.56,.3]].forEach(([x,z])=>{ ball(g,.12,0x7a2a58,x,1.51,z,1,1.15,1); kegel(g,.045,.1,0x4a8a30,x,1.67,z); });
      for(let i=0;i<14;i++) ball(g,.085,i%3?0x8a3aa8:0x6a2a88,.55+(i%4)*.11+(i%2)*.03,1.46+(i>8?.11:0)+(i>12?.09:0),-.45+Math.floor(i/4)*.1);
      /* Blumenstrauß, flach auf dem Tisch */
      [[1.05,.42,0xe8508a],[1.3,.5,0xffd23a],[1.45,.25,0xf4f0ff],[1.18,.15,0xff7a50],[1.42,-.02,0xe8508a],[1.1,-.12,0xffd23a]].forEach(([x,z,c])=>{ strich(g,[.72,1.42,.05],[x,1.5,z],.028,0x3f8a3c);
        for(let i=0;i<5;i++){ const a=i*1.2566; ball(g,.075,c,x+Math.cos(a)*.085,1.54,z+Math.sin(a)*.085,1,.55,1); } ball(g,.055,0xf8b020,x,1.57,z); });
      [-.1,.14].forEach(z=>ball(g,.16,0x4aa040,.9,1.45,z,1.4,.2,.6)); } },
  { x:-10.5, z:3.5, dreh:-.45, steh:[-10.4,5.95], kasten:[4.2,3.1], treffer:[3.9,3.0,1.9], baue(g){ /* 3 Sphinx: liegender Steinlöwe mit Menschengesicht und Kopftuch */
      const F=0xdcb268, D=0xb88c48;
      box(g,4.0,.24,1.95,PETROL,0,.12,0); box(g,3.75,.34,1.75,KALK2,0,.41,0); box(g,3.77,.1,.04,GOLD,0,.41,.89);
      ball(g,.62,F,-1.05,1.08,0,1.15,.95,1.05); ball(g,.55,F,-.15,1.08,0,1.7,.88,.95); ball(g,.55,F,.55,1.08,0,.95,.9,.95);
      [-1,1].forEach(s=>{ ball(g,.38,F,-.9,.88,s*.6,1.15,.95,.65); ball(g,.17,F,-.4,.69,s*.78,1.7,.7,.8);
        /* Vorderpfoten */
        strich(g,[.65,.85,s*.45],[1.65,.74,s*.45],.18,F); ball(g,.22,F,1.7,.74,s*.45,1.25,.85,1); [-.1,0,.1].forEach(v=>strich(g,[1.8,.8,s*.45+v],[1.97,.7,s*.45+v],.018,D)); });
      strich(g,[-1.65,.75,.2],[-1.55,.68,.8],.08,F); strich(g,[-1.55,.68,.8],[-.55,.65,.93],.075,F); ball(g,.14,D,-.48,.67,.93,1.5,.9,.9);
      /* Kopf mit Tuch, zur Kamera gedreht */
      strich(g,[.68,1.4,0],[.72,2.05,0],.21,F);
      const kopf=gruppe(g,.72,2.28,0); kopf.rotation.y=.9;
      box(kopf,1.16,.72,.34,TUERKIS2,0,-.08,-.24); ball(kopf,.52,TUERKIS2,0,.28,-.07,1.05,.75,.85);
      [-1,1].forEach(s=>{ box(kopf,.29,.9,.26,TUERKIS2,s*.46,-.27,.08); [-.6,-.4,-.2,0].forEach(y=>box(kopf,.3,.07,.27,GOLD,s*.46,y,.083));
        ball(kopf,.065,CREME,s*.15,.09,.45,1.3,.85,.5); ball(kopf,.035,SCHWARZ,s*.15,.09,.485); strich(kopf,[s*.06,.2,.45],[s*.25,.19,.41],.02,D); ball(kopf,.09,F,s*.38,0,.14,.6,1.2,.8); });
      ball(kopf,.4,F,0,0,.13,.95,1.05,.88); box(kopf,.84,.11,.16,GOLD,0,.34,.39); ball(kopf,.065,D,0,-.04,.49,.8,1.15,1);
      const m=ring(kopf,.13,.022,0x8a4a30,0,-.1,.48,Math.PI*.7); m.rotation.z=Math.PI*1.15;
      /* breiter, flacher Brustkragen, an die Brust angelegt */
      rohr(g,.3,.64,.22,GOLD,.68,1.35,0,28); [[.63,1.25,TUERKIS],[.47,1.355,TUERKIS],[.31,1.455,GOLD2]].forEach(([rad,y,c])=>liegend(ring(g,rad,.035,c,.68,y,0))); } },
  { x:11, z:1.5, dreh:-.2, steh:[10.8,3.5], kasten:[2.8,1.4], treffer:[2.7,3.9,1.2], baue(g,k){ /* 4 Harfe: großer Bogen aus Holz mit goldenen Saiten */
      box(g,2.7,.16,1.0,PETROL,0,.08,0); box(g,2.45,.12,.82,GOLD2,0,.22,0);
      /* Klangkörper */
      strich(g,[-.85,.58,0],[1.0,.85,0],.24,HOLZ); ball(g,.34,HOLZ,-.8,.58,0,1.2,.95,.9); ball(g,.24,HOLZ2,1.0,.85,0); [.45,1.0].forEach(x=>box(g,.18,.36,.3,HOLZ2,x-.5,.34,0));
      [-.4,.1,.6].forEach(x=>{ const r=ring(g,.255,.035,GOLD,x,.58+(x+.85)*.146,0); r.rotation.y=Math.PI/2; });
      const P=t=>[(1-t)*(1-t)*-.85+2*t*(1-t)*-1.75+t*t*.8,(1-t)*(1-t)*.6+2*t*(1-t)*2.75+t*t*3.5,0];
      for(let i=0;i<14;i++){ strich(g,P(i/14),P((i+1)/14),.14-i*.004,HOLZ); ball(g,.14-i*.004,HOLZ,P((i+1)/14)[0],P((i+1)/14)[1],0); }
      [.2,.55,.85].forEach(t=>ball(g,.175-t*.05,TUERKIS,P(t)[0],P(t)[1],0,1,1,1));
      ball(g,.26,GOLD,.86,3.52,0); ball(g,.11,ROT,.86,3.82,0);
      /* Saiten */
      const saiten=[];
      for(let i=0;i<8;i++){ const t=.34+i*.085, o=P(t), ux=-.5+i*.19, uy=.6+(ux+.85)*.146+.2, s=gruppe(g,0,0,0); s.userData.lebendig=true;
        strich(s,[ux,uy,.02],o,.017,i%3?0xc8861a:0x8a3a20); saiten.push(s); ball(g,.05,GOLD,o[0],o[1],.1); ball(g,.04,GOLD2,ux,uy,.06); }
      const klang=schein(g,'rgba(255,230,140,.75)',0,1.9,.15,.5);
      k.anim.push(t=>{ const n=Math.floor(t*1.3)%8, a=(t*1.3)%1; saiten.forEach((s,i)=>{ s.position.z=i===n?Math.sin(t*55)*.035*(1-a):0; }); klang.position.set(-.5+n*.19,1.6+n*.12,.15); klang.material.opacity=.7*(1-a); }); } },
  { x:6.3, z:HINTEN, wand:'hinten', steh:[6.3,-11.6], kasten:[2.9,.8], treffer:[3.0,3.7,.8], trefferY:1.05, baue(g,k){ /* 5 Relief des Sonnengottes Ra: Figur mit Vogelkopf und roter Sonnenscheibe */
      box(g,3.0,3.7,.14,TUERKIS2,0,2.9,.07); box(g,2.74,3.44,.16,GOLD2,0,2.9,.08); box(g,2.58,3.28,.18,0xf0dfae,0,2.9,.09);
      const z=.22;
      /* Sonnenscheibe */
      scheibe(g,.5,.09,GOLD,0,4.0,z-.03); scheibe(g,.4,.1,0xd03020,0,4.0,z);
      /* Kopftuch, Vogelkopf, Schnabel */
      box(g,.62,.7,.07,BLAU,-.14,2.98,z-.03); box(g,.24,.55,.08,BLAU,-.28,2.6,z-.02); [2.5,2.72].forEach(y=>box(g,.26,.06,.09,GOLD,-.28,y,z-.02));
      ball(g,.34,0x7a4a22,.02,3.24,z,1.05,1,.4); ball(g,.2,CREME,.14,3.12,z+.07,1,.9,.35);
      ball(g,.17,0xf4b020,.38,3.2,z+.06,1.35,.75,.4); const sn=kegel(g,.09,.24,0x3a2a1a,.57,3.11,z+.07); sn.rotation.z=-2.5; sn.scale.z=.04;
      ball(g,.09,CREME,.12,3.31,z+.13,1,1,.4); ball(g,.048,SCHWARZ,.14,3.31,z+.17,1,1,.5); strich(g,[.14,3.2,z+.15],[.06,3.02,z+.15],.022,SCHWARZ);
      /* Körper: Kragen, grünes Oberteil, heller Rock, Beine */
      box(g,.66,.7,.09,GRUEN,0,2.5,z); ball(g,.4,GOLD,0,2.82,z+.02,1,.36,.25); ball(g,.25,ROT,0,2.84,z+.07,1,.35,.2);
      box(g,.72,.14,.11,GOLD,0,2.14,z); box(g,.7,.5,.09,CREME,0,1.86,z); box(g,.18,.55,.11,GOLD2,0,1.83,z);
      [-.24,.2].forEach(x=>{ box(g,.18,.42,.08,0x9a5a30,x,1.42,z); box(g,.34,.1,.1,0x9a5a30,x+.09,1.2,z); });
      /* Arme: eine Hand offen nach vorn, eine unten */
      strich(g,[.3,2.72,z+.03],[.6,2.35,z+.03],.075,0x9a5a30); strich(g,[.6,2.35,z+.03],[.95,2.55,z+.03],.065,0x9a5a30); ball(g,.12,0x9a5a30,1.02,2.6,z+.03,1.3,.7,.5);
      strich(g,[-.34,2.72,z+.03],[-.62,2.2,z+.03],.075,0x9a5a30); ball(g,.1,0x9a5a30,-.66,2.1,z+.03,1,1.2,.5);
      box(g,2.2,.12,.07,GRUEN2,0,1.1,z-.02);
      /* Schriftspalten links und rechts */
      const tex=GRAB.zeichenBild(96,512,1,6); [-1,1].forEach(s=>GRAB.tafel(g,tex,.34,1.7,s*1.06,s<0?3.35:3.5,.19));
      const glut=schein(g,'rgba(255,90,40,.75)',0,4.0,.4,1.5);
      k.anim.push(t=>{ const a=1.35+Math.sin(t*1.8)*.35; glut.scale.set(a,a,1); }); } },
  { x:-6.3, z:HINTEN, wand:'hinten', steh:[-6.3,-11.6], kasten:[2.9,.8], treffer:[3.0,3.0,.8], trefferY:1.25, baue(g,k){ /* 6 Tempelkalender: runde Steinscheibe mit zwölf Feldern */
      scheibe(g,1.45,.18,KALK3,0,2.75,.09);
      const tex=bild(512,512,(p)=>{ const F=['#e8d8a8','#9ad0c0'];
        for(let i=0;i<12;i++){ const a=i*Math.PI/6; p.fillStyle=F[i%2]; p.beginPath(); p.moveTo(256,256); p.arc(256,256,250,a,a+Math.PI/6); p.fill();
          p.strokeStyle='#5a4a2a'; p.lineWidth=6; p.beginPath(); p.moveTo(256,256); p.lineTo(256+Math.cos(a)*250,256+Math.sin(a)*250); p.stroke();
          const m=a+Math.PI/12; GRAB.zeichen(p,i,256+Math.cos(m)*176,256+Math.sin(m)*176,56,'#5a2a14');
          /* Zählpunkte */
          p.fillStyle='#1f4f9a'; for(let j=0;j<=i%4;j++){ const w=m+(j-(i%4)/2)*.075; p.beginPath(); p.arc(256+Math.cos(w)*226,256+Math.sin(w)*226,6,0,7); p.fill(); } }
        [132,250].forEach(r=>{ p.strokeStyle='#5a4a2a'; p.lineWidth=7; p.beginPath(); p.arc(256,256,r,0,7); p.stroke(); });
        p.fillStyle='#f6e8c0'; p.beginPath(); p.arc(256,256,128,0,7); p.fill(); });
      const m=new THREE.Mesh(new THREE.CircleGeometry(1.32,48),new THREE.MeshLambertMaterial({map:tex})); m.position.set(0,2.75,.19); g.add(m);
      ring(g,1.39,.1,GOLD2,0,2.75,.2); ring(g,.68,.045,TUERKIS,0,2.75,.22);
      for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(g,.07,GOLD,Math.cos(a)*1.39,2.75+Math.sin(a)*1.39,.3); }
      scheibe(g,.3,.14,GOLD,0,2.75,.25); scheibe(g,.16,.17,0xd8481c,0,2.75,.26);
      for(let i=0;i<8;i++){ const a=i*Math.PI/4; strich(g,[Math.cos(a)*.37,2.75+Math.sin(a)*.37,.25],[Math.cos(a)*.55,2.75+Math.sin(a)*.55,.25],.035,GOLD2); }
      /* langsam wandernder Zeiger */
      const z=gruppe(g,0,2.75,.36); z.userData.lebendig=true; strich(z,[0,.18,0],[0,1.02,0],.05,ROT); ball(z,.12,ROT,0,1.04,0,1,1,.5);
      k.anim.push(t=>{ z.rotation.z=-t*.25; }); } },
  { x:-13.5, z:-4.6, dreh:-.2, steh:[-11.55,-4.3], r:.95, treffer:[2.4,3.5,1.4], baue(g){ /* 7 Ibis-Statue: Vogel mit langem gebogenem Schnabel auf Sockel */
      const W=0xfbf8ee, S=0x201e28;
      box(g,1.7,.2,1.2,PETROL,0,.1,0); box(g,1.45,.7,1.0,KALK2,0,.55,0); box(g,1.62,.14,1.14,KALK,0,.97,0); box(g,1.47,.16,1.02,TUERKIS,0,.55,0); box(g,1.48,.05,1.03,GOLD,0,.72,0);
      [-.2,.2].forEach((z,i)=>{ const x=-.1+i*.22; strich(g,[x,1.06,z],[x-.08,1.55,z],.055,S); strich(g,[x-.08,1.55,z],[x,1.95,z*.8],.065,S); [[.28,0],[.22,.14],[.22,-.14]].forEach(([a,b])=>strich(g,[x,1.08,z],[x+a,1.06,z+b],.035,S)); });
      ball(g,.5,W,-.05,2.12,0,1.4,.88,.82); ball(g,.3,W,.38,2.28,0,1,1,.85);
      [-1,1].forEach(s=>ball(g,.34,0xe4e0d4,-.2,2.15,s*.33,1.5,.7,.28));
      [-.16,0,.16].forEach((z,i)=>strich(g,[-.6,2.18,z],[-1.12,1.65+(i===1?-.1:0),z*1.4],.085,S));
      strich(g,[.45,2.35,0],[.72,2.75,0],.15,W); strich(g,[.72,2.75,0],[.62,3.08,0],.12,S); ball(g,.22,S,.66,3.14,0,1.1,.95,.9);
      [-1,1].forEach(s=>{ ball(g,.055,GOLD,.76,3.19,s*.17); ball(g,.025,S,.79,3.19,s*.21); });
      /* langer, nach unten gebogener Schnabel */
      const P=[[.78,3.13],[1.08,3.1],[1.3,2.93],[1.43,2.68],[1.46,2.4]]; for(let i=0;i<4;i++){ strich(g,[P[i][0],P[i][1],0],[P[i+1][0],P[i+1][1],0],.085-i*.017,0x3a3440); ball(g,.085-i*.017,0x3a3440,P[i+1][0],P[i+1][1],0); }
      liegend(ring(g,.17,.04,GOLD,.55,2.5,0)).rotation.y=-.55; } },
  { x:13.8, z:7.8, dreh:-.12, steh:[11.75,7.8], r:.95, treffer:[1.7,4.2,1.6], baue(g,k){ /* 8 Kleiner Obelisk: spitze Steinsäule mit Zeichen und goldener Spitze */
      box(g,1.65,.22,1.65,PETROL,0,.11,0); box(g,1.3,.26,1.3,KALK3,0,.35,0); box(g,1.05,.14,1.05,TUERKIS,0,.55,0);
      const schaft=kantig(rohr(g,.41,.66,2.8,0xe6cfa0,0,2.0,0,4)); schaft.rotation.y=Math.PI/4;
      const spitze=new THREE.Mesh(new THREE.ConeGeometry(.43,.62,4),mat(GOLD)); kantig(spitze); spitze.position.set(0,3.71,0); spitze.rotation.y=Math.PI/4; spitze.castShadow=true; g.add(spitze);
      const tex=bild(96,512,(p)=>{ p.fillStyle='#f4e4bc'; p.fillRect(10,0,76,512); [0,6,3,2,5].forEach((a,i)=>GRAB.zeichen(p,a,48,54+i*101,64,i%2?'#1f4f9a':'#6a2a10')); });
      const f=GRAB.tafel(g,tex,.42,2.6,0,2.0,.385); f.rotation.x=-.0625;
      const glanz=schein(g,'rgba(255,240,170,.8)',0,3.98,.1,.6);
      k.anim.push(t=>{ glanz.material.opacity=.35+.4*Math.abs(Math.sin(t*1.4)); }); } },
  { x:-7.2, z:8.4, steh:[-7.1,10.45], r:.98, treffer:[2.2,3.0,1.9], baue(g,k){ /* 9 Vase mit Lotusblumen */
      walze(g,.78,.14,GOLD2,0,.07,0); walze(g,.34,.2,BLAU,0,.22,0);
      const profil=[[0,0],[.34,0],[.64,.28],[.74,.62],[.6,.98],[.34,1.18],[.32,1.34],[.5,1.5]];
      const v=new THREE.Mesh(new THREE.LatheGeometry(profil.map(p=>new THREE.Vector2(p[0],p[1])),28),mat(0x2468b8,{side:THREE.DoubleSide})); v.position.y=.25; v.castShadow=v.receiveShadow=true; g.add(v);
      [[.73,.8,GOLD],[.75,.9,CREME],[.7,1.05,GOLD],[.34,1.47,GOLD],[.51,1.75,GOLD2]].forEach(([r,y,c])=>liegend(ring(g,r,.035,c,0,y,0)));
      for(let i=0;i<10;i++){ const a=i*.6283, q=ball(g,.1,TUERKIS,Math.sin(a)*.7,.62,Math.cos(a)*.7,.7,1.7,.35); q.rotation.y=a; }
      /* drei Henkelblätter und fünf Blüten */
      [[0,2.85,.05,0xf2609a],[-.62,2.5,.18,0xfff0f6],[.64,2.45,.12,0xfff0f6],[-.25,2.25,.5,0xf890bc],[.34,2.2,.48,0xf2609a]].forEach(([x,y,z,c],n)=>{
        const bl=gruppe(g,0,0,0); bl.userData.lebendig=true; strich(bl,[x*.25,1.6,z*.25],[x,y,z],.035,0x3a8a40);
        const kopf=gruppe(bl,x,y,z); kopf.rotation.set(.45+z*.4,0,-x*.5);
        for(let i=0;i<8;i++){ const a=i*.785, p=gruppe(kopf,0,0,0); p.rotation.y=a; const q=ball(p,.2,i%2?c:0xffb8d4,.16,.1,0,.55,1.25,.3); q.rotation.z=-.75; }
        for(let i=0;i<4;i++){ const a=i*1.571+.4; ball(kopf,.08,c,Math.cos(a)*.07,.19,Math.sin(a)*.07,.8,1.7,.8); }
        ball(kopf,.1,0xffd020,0,.14,0,1,.8,1); verschmelze(bl);
        k.anim.push(t=>{ bl.rotation.z=Math.sin(t*1.1+n*1.7)*.012; }); });
      [[-.72,1.95,.25],[.74,1.9,-.1],[.05,1.9,.68]].forEach(([x,y,z])=>{ strich(g,[x*.3,1.6,z*.3],[x,y,z],.03,0x3a8a40); ball(g,.34,0x3f9a48,x,y,z,1,.14,.75); }); } },
  { x:6.6, z:5, steh:[6.5,7.25], r:1.18, treffer:[2.5,2.4,2.4], baue(g){ /* 10 Große Trommel mit Seilen und zwei weichen Schlägeln */
      [-.7,.7].forEach(x=>{ box(g,.24,.2,2.0,HOLZ2,x,.1,0); [-.55,.55].forEach(z=>box(g,.2,.34,.24,HOLZ2,x,.32,z)); });
      walze(g,.92,1.2,0xb8402c,0,1.05,0); ball(g,.98,0xb8402c,0,1.05,0,1,.42,1);
      [.5,1.6].forEach(y=>walze(g,.98,.16,HOLZ,0,y,0)); [.59,1.51].forEach(y=>liegend(ring(g,.96,.035,GOLD,0,y,0)));
      for(let i=0;i<14;i++){ const a=i*.4488, b=a+.2244, c=a+.4488; const P=(w,y)=>[Math.sin(w)*1.02,y,Math.cos(w)*1.02];
        strich(g,P(a,1.54),P(b,.58),.028,CREME); strich(g,P(b,.58),P(c,1.54),.028,CREME); ball(g,.05,GOLD,Math.sin(a)*1.02,1.55,Math.cos(a)*1.02); }
      walze(g,.93,.07,0xf8ecca,0,1.71,0); liegend(ring(g,.95,.055,HOLZ2,0,1.73,0)); liegend(ring(g,.56,.022,ROT,0,1.755,0)); walze(g,.2,.02,TUERKIS,0,1.755,0);
      [-1,1].forEach(s=>{ const y=1.83+(s>0?.07:0); strich(g,[s*.7,y,.65],[-s*.15,y,-.2],.045,HOLZ); ball(g,.17,s>0?CREME:GOLD,-s*.2,y+.03,-.25); }); } }
];

return { titel:'Der Tempel der Götter', breite:36, tiefe:27, oben:['24,52,46','58,104,88','150,178,156'], baue, gegenstaende, verstecke };
})();

/* Raum 5: Der Brunnenschacht. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Wasserrad) und 10 (Schildkröte aus Stein) sind neu.
   Ausgang: breite Steintreppe links an der Rückwand, oben eine Deckenplatte, die zur Seite fährt; Tageslicht fällt herein. */
RAEUME3D.grabkammer[4] = (function(){
const { HOLZ, HOLZ2, GOLD, GOLD2, ROT, DUNKEL, SCHWARZ } = GRAB;
const STEIN=0x8fb0a8, STEINH=0xb8d4c8, STEIND=0x557872, STEINT=0x3a5a58, MOOS=0x4f9a48, EISEN=0x56646c, SEIL=0xd8b878, SEILD=0xa8884e, TON=0xc87a48;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* durchsichtiges Wasser (bleibt beim Verschmelzen einzeln) */
const nass=(c,a)=>mat(c,{transparent:true,opacity:a,depthWrite:false});
/* flache Scheibe auf dem Boden */
function scheibe(p,r,m,x,y,z,sx,sz){ const t=new THREE.Mesh(new THREE.CircleGeometry(r,28),m); t.rotation.x=-Math.PI/2; t.position.set(x,y,z); t.scale.set(sx||1,sz||1,1); p.add(t); return t; }
/* durchscheinender Wassertropfen */
const perle=()=>basis(0xb0ecff,{transparent:true,opacity:.65,depthWrite:false});
/* Wassertropfen, der fällt und unten einen Ring zieht */
function tropfen(p,k,x,z,unten,oben,takt,versatz){
  const g=gruppe(p,x,0,z); g.userData.lebendig=true;
  const d=ball(g,.045,perle(),0,oben,0,1,1.9,1); d.castShadow=false;
  const m=basis(0xd8fbff,{transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide});
  const r=new THREE.Mesh(new THREE.RingGeometry(.8,1,24),m); r.rotation.x=-Math.PI/2; r.position.y=unten+.02; g.add(r);
  k.anim.push(t=>{ const u=(t/takt+versatz)%1;
    if(u<.55){ const f=u/.55; d.visible=true; d.position.y=oben-(oben-unten)*f*f; r.visible=false; }
    else { const f=(u-.55)/.45; d.visible=false; r.visible=true; const s=.08+f*.52; r.scale.set(s,s,1); m.opacity=.85*(1-f); } });
}
/* hüpfender Frosch (lebendig, knallgrün, Blick nach +x) */
function frosch(k,P,grund,tempo,start,farbe){
  const g=gruppe(k.scene,P[0][0],grund,P[0][1]), f=farbe||0x6ae030;
  ball(g,.24,f,0,.2,0,1.25,.8,1); ball(g,.17,0xf4ee70,.1,.13,0,1.1,.7,1); ball(g,.17,f,.24,.28,0,1,.85,1.1);
  [-1,1].forEach(s=>{ ball(g,.085,f,.27,.43,s*.11); ball(g,.06,0xffffff,.32,.45,s*.11); ball(g,.032,SCHWARZ,.37,.455,s*.115);
    ball(g,.12,f,-.14,.12,s*.24,1.3,.7,.8); ball(g,.07,0x38a818,.04,.03,s*.34,1.8,.35,1); ball(g,.05,0x38a818,.28,.03,s*.17,1.4,.4,1); });
  verschmelze(g);
  const n=P.length;
  k.anim.push(t=>{ const u=t*tempo+start, i=Math.floor(u)%n, f2=u-Math.floor(u), a=P[i], b=P[(i+1)%n];
    const q=f2<.62?0:(f2-.62)/.38;
    g.position.set(a[0]+(b[0]-a[0])*q, grund+Math.sin(Math.PI*q)*.75, a[1]+(b[1]-a[1])*q);
    g.rotation.y=Math.atan2(-(b[1]-a[1]),b[0]-a[0]); g.scale.y=q?1:1+Math.sin(t*7+start*3)*.06; });
}
/* kleiner Fisch, der im Becken seine Runden dreht */
function fisch(k,cx,cz,r,tempo,start,farbe){
  const g=gruppe(k.scene,cx,.24,cz);
  ball(g,.2,farbe,0,0,0,1.6,.55,.7); const s=kegel(g,.15,.28,farbe,-.42,0,0); s.rotation.z=-Math.PI/2; s.scale.z=.05;
  [-1,1].forEach(v=>ball(g,.035,SCHWARZ,.2,.07,v*.09)); verschmelze(g); g.traverse(o=>{ o.castShadow=false; });
  const richt=tempo<0?-1:1;
  k.anim.push(t=>{ const a=start+t*tempo, rr=r+Math.sin(t*.7+start)*.22; g.position.set(cx+Math.cos(a)*rr,.25,cz+Math.sin(a)*rr);
    g.rotation.y=Math.atan2(-Math.cos(a)*richt,-Math.sin(a)*richt)+Math.sin(t*8+start)*.14; });
}
/* hängendes Seil aus dem Dunkel, pendelt. Unten ein Knoten mit Fransen (keine Schlinge) */
function haengeseil(k,x,z,unten,versatz){
  const oben=10.5, l=oben-unten, g=gruppe(k.scene,x,oben,z);
  strich(g,[0,0,0],[0,-l,0],.065,SEIL);
  for(let i=1;i<l/.45;i++) ball(g,.082,SEILD,0,-i*.45,0,1,.55,1);
  ball(g,.17,SEIL,0,-l,0,1,1.15,1); reif(g,.12,.035,SEILD,0,-l+.17,0);
  [[-.1,0],[.1,.03],[0,-.09],[.02,.1]].forEach(([a,b])=>strich(g,[0,-l-.08,0],[a,-l-.5,b],.028,SEILD));
  verschmelze(g);
  k.anim.push(t=>{ g.rotation.z=Math.sin(t*.9+versatz)*.028; g.rotation.x=Math.sin(t*.63+versatz*2)*.018; });
}
/* bemooste Steinsäule (fest, hoch) */
function pfeiler(k,x,z){
  const g=gruppe(k.scene,x,0,z);
  box(g,1.4,.36,1.4,STEIND,0,.18,0);
  for(let i=0;i<6;i++){ const t=rohr(g,.5,.52,.86,i%2?STEIN:0x7c9e98,0,.8+i*.9,0,10); t.rotation.y=i*.3; }
  box(g,1.45,.34,1.45,STEIND,0,6.0,0);
  [[.4,.5,.3,.34],[-.45,1.1,.2,.22],[.1,2.3,.5,.2],[-.3,.45,.52,.3],[.5,3.6,.05,.18]].forEach(([a,y,b,r])=>ball(g,r,MOOS,a,y,b,1,.7,.7));
  verschmelze(g); k.kreis(x,z,.75); k.verdecker(g,x,z,.8);
}
/* Wasserspeier an einer Wand mit Steintrog darunter. seite: hinten, links, rechts; u = Lage entlang der Wand */
function speier(k,wand,seite,u,B,T,tex){
  const dreh=seite==='hinten'?0:seite==='links'?Math.PI/2:-Math.PI/2;
  const x=seite==='hinten'?u:seite==='links'?-B/2:B/2, z=seite==='hinten'?-T/2:u;
  const oben=gruppe(wand,x,0,z); oben.rotation.y=dreh;
  box(oben,1.3,.9,.2,STEIND,0,3.25,.1); box(oben,.62,.18,.7,STEINH,0,2.98,.4); [-.32,.32].forEach(a=>box(oben,.1,.3,.7,STEINH,a,3.12,.4));
  ball(oben,.45,MOOS,.55,3.75,.1,1,.4,.35); ball(oben,.3,MOOS,-.6,2.75,.08,1,1.6,.3); verschmelze(oben);
  const strahl=new THREE.Mesh(new THREE.PlaneGeometry(.46,2.45),new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:.8,depthWrite:false,side:THREE.DoubleSide})); strahl.position.set(0,1.75,.74); oben.add(strahl);
  const trog=gruppe(k.scene,x,0,z); trog.rotation.y=dreh;
  box(trog,2,.5,.16,STEIN,0,.25,.98); [-.92,.92].forEach(a=>box(trog,.16,.5,.98,STEIN,a,.25,.49)); box(trog,1.7,.1,.9,STEINT,0,.08,.46);
  box(trog,2.06,.08,.22,STEINH,0,.52,.98); verschmelze(trog);
  const w=new THREE.Mesh(new THREE.PlaneGeometry(1.68,.88),nass(0x3ac0d0,.75)); w.rotation.x=-Math.PI/2; w.position.set(0,.36,.46); trog.add(w);
  const spritz=[0,1,2,3,4].map(i=>{ const b=ball(trog,.045,perle(),0,.4,.74); b.castShadow=false; return b; });
  k.anim.push(t=>{ spritz.forEach((b,i)=>{ const f=(t*1.6+i*.2)%1; b.position.set((i-2)*.17*f*2,.38+Math.sin(f*Math.PI)*.35,.72+Math.sin(i*2.1)*.15*f); }); });
  if(seite==='hinten') k.kasten(x,z+.52,2.1,1.1); else k.kasten(x+(seite==='links'?.52:-.52),z,1.1,2.1);
}

function baue(k){
  const sc=k.scene;
  const h=GRAB.huelle(k,{ B:36, T:27, H:6, himmelLicht:0xd8fff6, grund:0x2c5658, staerke:.84, sonne:0xd4f4ff, sonneStaerke:.38,
    wandBild:GRAB.quaderBild([102,138,134],'#1d3a3a',8), bodenBild:GRAB.quaderBild([116,146,136],'#2c4a46',4), leiste:0x486c68, band:0x2f9a88 });
  const B=h.B, T=h.T, hinten=h.hinten, links=h.links, rechts=h.rechts;
  sc.background=new THREE.Color(0x07181c);
  /* dunkler Grund außerhalb des Raums: vier Streifen rund um den Boden */
  const aussen=basis(0x0c2224);
  [[0,-48,150,69],[0,48,150,69],[-46.5,0,57,27],[46.5,0,57,27]].forEach(([x,z,b,t])=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(b,t),aussen); m.rotation.x=-Math.PI/2; m.position.set(x,-.03,z); sc.add(m); });

  /* =============== Ausgang: Steintreppe, Deckenplatte, Zahlenschloss =============== */
  const TX=-10, ZF=-6.8, STUFEN=10, SH=.21, ST=.46, OBEN=STUFEN*SH, LY=3.55;   /* LY = Höhe der Deckenöffnung */
  const treppe=gruppe(sc,0,0,0);
  for(let i=0;i<STUFEN;i++){ const z=ZF-ST*i-ST/2, y=SH*(i+1);
    box(treppe,3.4,y,ST,i%2?0xa6c2b6:0x94b2a8,TX,y/2,z); box(treppe,3.44,.07,.13,0xe4f2d8,TX,y-.025,z+ST/2-.05);
    [-1,1].forEach(s=>{ box(treppe,.36,y+.4,ST,STEIND,TX+s*1.88,(y+.4)/2,z); box(treppe,.44,.1,ST+.02,STEINH,TX+s*1.88,y+.43,z); }); }
  const zP=ZF-ST*STUFEN, tP=zP+T/2;   /* Podest oben */
  box(treppe,3.4,OBEN,tP,0x9cbab0,TX,OBEN/2,zP-tP/2); box(treppe,3.44,.07,.13,0xe4f2d8,TX,OBEN-.025,zP-.05);
  [-1,1].forEach(s=>{ box(treppe,.36,OBEN+.4,tP,STEIND,TX+s*1.88,(OBEN+.4)/2,zP-tP/2); box(treppe,.44,.1,tP,STEINH,TX+s*1.88,OBEN+.43,zP-tP/2);
    box(treppe,.62,.85,.62,STEIND,TX+s*1.92,.42,ZF+.0); ball(treppe,.26,STEINH,TX+s*1.92,1.05,ZF);
    /* Schachtwangen neben der Platte */
    box(treppe,.5,5.5,.9,STEINT,TX+s*2.05,2.75,-T/2+.45); ball(treppe,.34,MOOS,TX+s*2.1,4.3,-12.55,.8,1.5,.4); });
  box(treppe,4.7,.5,1.0,STEIND,TX,5.4,-T/2+.5); box(treppe,4.8,.12,1.1,STEINH,TX,5.1,-T/2+.5);
  [[-1.2,.27,-7.05],[1.35,1.1,-8.4],[-1.4,2.2,-10.4]].forEach(([a,y,z])=>ball(treppe,.2,MOOS,TX+a,y,z,1.3,.18,.8));
  verschmelze(treppe);
  /* Öffnung (schräg zum Betrachter): Rahmen, Himmel, Platte */
  const luke=gruppe(sc,TX,LY,-12.72); luke.rotation.x=1.05;
  [-1,1].forEach(s=>{ box(luke,.3,.34,2.5,STEINH,s*1.65,0,0); box(luke,3.6,.34,.26,STEINH,0,0,s*1.2); });
  /* zwei Steinschienen, auf denen die Platte zur Seite gleitet */
  [-.85,.85].forEach(z=>{ box(luke,3.55,.18,.24,STEINH,3.62,.49,z); box(luke,.2,.4,.3,STEIND,5.45,.6,z); });
  verschmelze(luke);
  /* Konsolen: tragen die Schienen von der Rückwand aus */
  const konsolen=gruppe(sc,0,0,0), cs=Math.cos(1.05), sn=Math.sin(1.05);
  [3.0,5.05].forEach(a=>{ const x=TX+a, P=[-.85,.85].map(z=>[x,LY+.38*cs-z*sn,-12.72+.38*sn+z*cs]);
    P.forEach(q=>strich(konsolen,[x,q[1]-.85,-13.45],q,.13,STEIND));
    strich(konsolen,P[0],P[1],.11,STEIND); box(konsolen,.42,2.7,.16,STEINT,x,LY-.25,-13.42); });
  verschmelze(konsolen);
  const himmelTex=bild(256,192,(g)=>{ const v=g.createLinearGradient(0,0,0,192); v.addColorStop(0,'#5ab8f4'); v.addColorStop(1,'#e4f8ff'); g.fillStyle=v; g.fillRect(0,0,256,192);
    const s=g.createRadialGradient(188,54,4,188,54,58); s.addColorStop(0,'#ffffff'); s.addColorStop(.35,'#fff2a0'); s.addColorStop(1,'rgba(255,240,150,0)'); g.fillStyle=s; g.fillRect(0,0,256,192);
    g.fillStyle='rgba(255,255,255,.95)'; [[50,130,28],[80,120,34],[112,134,24],[190,150,18],[212,142,24]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); });
    g.strokeStyle='#3f8a30'; g.lineWidth=7; g.lineCap='round'; [[20,-30],[40,10],[8,25]].forEach(([a,b])=>{ g.beginPath(); g.moveTo(0,40); g.quadraticCurveTo(a+10,b+20,a+34,b+46); g.stroke(); }); });
  const himmel=new THREE.Mesh(new THREE.PlaneGeometry(3,2.14),basis(0xffffff,{map:himmelTex})); himmel.rotation.x=-Math.PI/2; himmel.position.y=.02; himmel.visible=false; luke.add(himmel);
  const platte=gruppe(luke,0,.2,0);
  box(platte,3.05,.22,2.2,0xc4b890,0,0,0);
  [-1,1].forEach(s=>{ box(platte,2.75,.05,.08,0x6a5a3a,0,.12,s*.9); box(platte,.08,.05,1.86,0x6a5a3a,s*1.34,.12,0); });
  reif(platte,.46,.07,GOLD,0,.14,0); walze(platte,.22,.06,GOLD,0,.14,0);
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; strich(platte,[Math.cos(a)*.58,.14,Math.sin(a)*.58],[Math.cos(a)*.8,.14,Math.sin(a)*.8],.04,GOLD2); }
  [-1,1].forEach(s=>reif(platte,.17,.045,EISEN,s*.98,.16,.45));
  verschmelze(platte);
  /* schmaler heller Lichtspalt rund um die geschlossene Platte */
  const spalt=gruppe(luke,0,.19,0), spaltM=basis(0xfffbd0);
  [-1,1].forEach(s=>{ box(spalt,.1,.03,2.4,spaltM,s*1.59,0,0); box(spalt,3.28,.03,.1,spaltM,0,0,s*1.16); });
  spalt.children.forEach(m=>{ m.castShadow=false; });
  const strahlM=basis(0xfff2b0,{transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
  const strahl=new THREE.Mesh(new THREE.CylinderGeometry(.95,1.75,6,24,1,true),strahlM); strahl.position.set(TX,2.05,-9.9); strahl.rotation.x=-.99; strahl.visible=false; sc.add(strahl);
  const tagschein=schein(sc,'rgba(255,245,190,.85)',TX,3.7,-12.2,4.4); tagschein.visible=false;
  const fleckM=basis(0xffffff,{map:leuchtBild('rgba(255,233,160,1)'),transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(4.2,3.2),fleckM); fleck.rotation.x=-Math.PI/2; fleck.position.set(TX,.07,-5.7); fleck.visible=false; sc.add(fleck);
  const tageslicht=new THREE.PointLight(0xfff0b8,0,12,1.4); tageslicht.position.set(TX,4.2,-11); sc.add(tageslicht);
  /* Steinpfosten mit Zahlenschloss rechts am Fuß der Treppe */
  const LX=-7.25, LZ=-6.55;
  const pfosten=gruppe(sc,LX,0,LZ);
  box(pfosten,.9,.2,.7,STEINT,0,.1,0); box(pfosten,.6,1.55,.42,STEIND,0,.95,-.05); box(pfosten,1.25,1.05,.34,STEINT,0,2.15,0); box(pfosten,1.38,.14,.46,STEINH,0,2.74,0);
  ball(pfosten,.24,MOOS,-.32,.3,.24,1.2,.7,.7); verschmelze(pfosten);
  const schloss=GRAB.zahlenschloss(sc,LX,2.05,LZ+.31); schloss.scale.set(1.15,1.15,1.15); verschmelze(schloss);
  const lampeRot=ball(sc,.13,basis(0xff5a4a),LX,2.95,LZ), lampeGruen=ball(sc,.15,basis(0x5aff8a),LX,2.95,LZ); lampeGruen.visible=false;
  const tuer=ausgang(k,{ name:'Deckenplatte', einfach:'Treppe nach oben', steh:[-9.8,-5.35], durch:[TX,-11.75], hoch:OBEN,
    treffer:{x:-9.4,y:2.8,z:-9.5,b:5.4,h:5.6,t:6.4}, schildOben:[-9.2,4.2,-7.4], glanz:[LX,2.1,LZ+.7],
    bewege:(auf)=>{ platte.position.x=auf*3.9; platte.position.y=.2+Math.min(1,auf*5)*.5; himmel.visible=auf>.02; spalt.visible=auf<.04;
      schloss.visible=lampeRot.visible=auf<.04; lampeGruen.visible=auf>=.04;
      strahl.visible=tagschein.visible=fleck.visible=auf>.04; strahlM.opacity=.2*auf; tagschein.material.opacity=.7*auf; fleckM.opacity=.7*auf; tageslicht.intensity=1.5*auf;
      /* Die Figur steigt Stufe für Stufe: sie steht genau auf der Trittfläche, nur an jeder Kante gleitet sie kurz hoch */
      const f=k.figur();
      if(auf>0 && f && Math.abs(f.position.x-TX)<1.8){ const w=(ZF-f.position.z)/ST+.12, i=Math.floor(w); f.position.y=w<0?0:SH*Math.min(STUFEN,i+Math.min(1,(w-i)/.24)); } } });
  k.kasten(TX,(ZF+.32-T/2)/2,4.5,ZF+.32+T/2);
  k.kasten(LX,LZ,1.1,.7);

  /* =============== Großes Wasserbecken mit Fischen und Seerosen =============== */
  const BX=1.4, BZ=-1.7, BR=3;
  const becken=gruppe(sc,BX,0,BZ);
  for(let i=0;i<20;i++){ const a=i*Math.PI/10;
    const s=box(becken,.97,.5,.5,i%2?STEIN:0x7a9c96,Math.cos(a)*BR,.25,Math.sin(a)*BR); s.rotation.y=Math.PI/2-a;
    const d=box(becken,1.02,.12,.62,STEINH,Math.cos(a)*BR,.56,Math.sin(a)*BR); d.rotation.y=Math.PI/2-a; }
  [.3,1.5,2.7,3.5,5.1].forEach((a,i)=>ball(becken,.26+(i%2)*.1,MOOS,Math.cos(a)*(BR+.2),.2,Math.sin(a)*(BR+.2),1,.8,1));
  verschmelze(becken);
  scheibe(sc,2.85,mat(0x145868),BX,.04,BZ);
  const wasser=scheibe(sc,2.85,nass(0x40c8d8,.58),BX,.42,BZ);
  [[1.1,.4],[-1.4,-1],[.2,1.7]].forEach(([a,b],i)=>{ const g=gruppe(sc,BX+a,.44,BZ+b); const m=new THREE.Mesh(new THREE.CircleGeometry(.36,18,.35,5.7),mat(0x3fa040)); m.rotation.x=-Math.PI/2; g.add(m);
    if(i!==1){ for(let j=0;j<6;j++){ const w=j*1.047; ball(g,.09,0xf8b0d0,Math.cos(w)*.09,.07,Math.sin(w)*.09,1,.8,1); } ball(g,.07,0xffe060,0,.11,0); }
    verschmelze(g); k.anim.push(t=>{ g.rotation.y=Math.sin(t*.3+i*2)*.7; g.position.x=BX+a+Math.sin(t*.5+i)*.12; }); });
  [[1.9,.7,0,0xff8a20],[1.4,-.9,2.1,0xffd030],[2.2,.5,3.6,0xff5a3a],[.8,1.2,1,0xffa040],[1.7,.55,5,0xf4f4e0]].forEach(([r,v,s,f])=>fisch(k,BX,BZ,r,v,s,f));
  k.kreis(BX,BZ,BR+.3);
  k.anim.push(t=>{ wasser.position.y=.42+Math.sin(t*1.4)*.012; });

  /* =============== Rinne für das Wasserrad mit Zulauf von der Wand =============== */
  const RZ=-8.7;
  const rinne=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ for(let i=0;i<7;i++){ box(rinne,.95,.42,.22,i%2?STEIN:0x7a9c96,.8+i*.96,.21,RZ+s*.66); box(rinne,.97,.08,.3,STEINH,.8+i*.96,.45,RZ+s*.66); } });
  [.22,7.14].forEach(x=>{ box(rinne,.26,.5,1.54,STEIND,x,.25,RZ); });
  box(rinne,6.7,.05,1.1,0x145868,3.68,.04,RZ);
  /* dunkle Öffnung mit Steinrahmen in der Rückwand: hier kommt das Wasser heraus */
  const loch=gruppe(hinten,6.45,0,-T/2);
  box(loch,1.1,1.05,.1,0x03090b,0,2.4,.05); [-.68,.68].forEach(a=>box(loch,.3,1.35,.3,STEINH,a,2.38,.15));
  box(loch,1.9,.34,.36,STEINH,0,3.08,.18); box(loch,1.7,.24,.3,STEIND,0,1.75,.15); ball(loch,.3,MOOS,-.7,3.25,.2,1.3,.5,.6); verschmelze(loch);
  /* schräger Zulauf aus Stein von der Rückwand in die Rinne */
  const schraege=gruppe(rinne,6.45,1.35,-11.35); schraege.rotation.x=.36;
  box(schraege,.8,.14,4.4,STEIND,0,0,0); [-.4,.4].forEach(a=>box(schraege,.14,.3,4.4,STEIN,a,.16,0));
  [[-12.6,1.8],[-10.6,1.05]].forEach(([z,h2])=>box(rinne,.5,h2,.4,STEINT,6.45,h2/2,z));
  verschmelze(rinne);
  const zulauf=new THREE.Mesh(new THREE.BoxGeometry(.62,.05,4.35),nass(0x70e0ee,.8)); zulauf.position.set(0,.14,0); schraege.add(zulauf);
  const rw=new THREE.Mesh(new THREE.PlaneGeometry(6.66,1.1),nass(0x48ccdc,.66)); rw.rotation.x=-Math.PI/2; rw.position.set(3.68,.31,RZ); sc.add(rw);
  const streifen=[0,1,2,3,4,5,6,7].map(i=>{ const b=box(sc,.45,.015,.06,basis(0xd8fbff),0,.33,RZ+((i*3)%7-3)*.14); b.castShadow=false; return b; });
  const fluss=[0,1,2,3,4].map(i=>{ const b=box(schraege,.4,.02,.22,basis(0xe4fcff),0,.18,0); b.castShadow=false; return b; });
  k.anim.push(t=>{ streifen.forEach((b,i)=>{ b.position.x=6.8-((t*1.5+i*.83)%6.3); }); fluss.forEach((b,i)=>{ b.position.z=-2+((t*1.8+i*.85)%4.1); b.position.x=Math.sin(i*2.3)*.14; }); });
  k.kasten(3.68,RZ,7.25,1.6); k.kasten(6.45,-11.4,1,4.2);

  /* =============== Wasserspeier mit Trögen, schmale Seitenrinne =============== */
  const guss=bild(64,128,(g)=>{ g.fillStyle='rgba(110,215,235,.75)'; g.fillRect(8,0,48,128); for(let i=0;i<34;i++){ g.fillStyle=i%3?'rgba(235,252,255,.9)':'rgba(60,160,190,.7)'; const x=10+((i*17)%42), y=(i*31)%128; g.fillRect(x,y,4,16); g.fillRect(x,y-128,4,16); } });
  guss.wrapS=guss.wrapT=THREE.RepeatWrapping; k.anim.push(t=>{ guss.offset.y=(t*1.3)%1; });
  speier(k,hinten,'hinten',-15.3,B,T,guss); speier(k,links,'links',-2.2,B,T,guss); speier(k,rechts,'rechts',7.2,B,T,guss);
  const seitenrinne=gruppe(sc,-17.15,0,9.6);
  for(let i=0;i<6;i++){ box(seitenrinne,.2,.36,.95,i%2?STEIN:0x7a9c96,.62,.18,-2.4+i*.96); box(seitenrinne,.26,.07,.97,STEINH,.62,.38,-2.4+i*.96); }
  [-2.98,2.98].forEach(z=>box(seitenrinne,1.45,.42,.22,STEIND,0,.21,z)); verschmelze(seitenrinne);
  const sw=new THREE.Mesh(new THREE.PlaneGeometry(1.4,5.85),nass(0x48ccdc,.7)); sw.rotation.x=-Math.PI/2; sw.position.set(-.18,.24,0); seitenrinne.add(sw);
  k.kasten(-17.15,9.6,1.75,6.2);

  /* =============== Säulen, Feuerschalen, Krüge, Steinbank, Brocken =============== */
  pfeiler(k,-13.6,-4.6); pfeiler(k,16.5,.3); pfeiler(k,-13.2,11.2); pfeiler(k,-4.8,-10.4);
  GRAB.feuerschale(sc,k,-14.7,-9.4); GRAB.feuerschale(sc,k,8.2,-12.2); GRAB.feuerschale(sc,k,15.6,11.2);
  flacker(k,-14.2,2.9,-8.8,0xffa850,.75,13); flacker(k,14.8,2.9,10.4,0xffa850,.65,13); flacker(k,BX,2.4,BZ,0x50e8e0,.45,10);
  const kruege=gruppe(sc,0,0,0);
  [[-17,-7.2,1.5],[-16.2,-6.2,1],[-17.1,-5.3,1.15],[16.8,-11.8,1.55],[15.7,-12.2,1.1],[-10.6,12.2,1.2],[-9.5,12.4,.85],[16.9,3.2,1]].forEach(([x,z,hh],i)=>{ GRAB.krug(kruege,x,z,hh,i%3?TON:0xa8643c); k.kreis(x,z,.38*hh); });
  verschmelze(kruege);
  const steine=gruppe(sc,0,0,0);
  /* Steinbank vorn */
  box(steine,2,.18,.6,STEIND,2.2,.45,12.4); [-.7,.7].forEach(a=>box(steine,.3,.36,.5,STEINT,2.2+a,.18,12.4)); k.kasten(2.2,12.4,2.1,.7);
  /* herabgefallene Quader und runde Brocken mit Moos */
  [[-6.2,-12.4,1.3,.7,.9,.2],[-5.4,-12.3,.8,.5,.7,-.4],[17,-9.2,1,.8,1.2,.15],[11,11.8,1.5,.6,1,.5],[12.2,12.2,.8,.45,.8,-.2],[-16.8,3.2,1.1,.7,1,.35]].forEach(([x,z,b,hh,t,d],i)=>{
    const q=box(steine,b,hh,t,i%2?STEIN:STEIND,x,hh/2,z); q.rotation.y=d; ball(steine,.34,MOOS,x+.1,hh,z,b,.22,t*.9); k.kreis(x,z,Math.max(b,t)*.55); });
  [[-12.3,.9,.62],[-11.6,.35,.34],[7.4,11.9,.55],[8.1,12.3,.3],[10.8,-8.6,.55],[11.5,-8.2,.3]].forEach(([x,z,r],i)=>{ ball(steine,r,i%2?STEIND:0x6a8c88,x,r*.5,z,1.15,.75,1); ball(steine,r*.55,MOOS,x-.05,r*1.03,z,1.2,.4,1.1); k.kreis(x,z,r*1.05); });
  verschmelze(steine);

  /* =============== Wandschmuck: Wellenband, Moos, Ranken, kleine Öllampen =============== */
  [[hinten,'hinten'],[links,'links'],[rechts,'rechts']].forEach(([w,seite],n)=>{
    const g=gruppe(w,seite==='hinten'?0:(seite==='links'?-B/2:B/2),0,seite==='hinten'?-T/2:0); g.rotation.y=seite==='hinten'?0:(seite==='links'?Math.PI/2:-Math.PI/2);
    const L=seite==='hinten'?B:T;
    /* Moospolster */
    const moos=[], ranken=[];
    for(let i=0;i<(seite==='hinten'?34:26);i++){ const u=-L/2+.8+zufall()*(L-1.6), y=i%3?zufall()*1.5:3.4+zufall()*2.2;
      for(let j=0;j<5;j++) moos.push([u+(zufall()-.5)*1.2,Math.max(.08,y+(zufall()-.5)*.6),.02,.18+zufall()*.34,.1+zufall()*.2,.06,[MOOS,0x3f8240,0x68b050][(i+j)%3]]); }
    for(let i=0;i<9;i++){ const u=-L/2+1.6+i*(L-3.2)/8+(zufall()-.5), l=.8+zufall()*1.5;
      if(seite==='hinten' && (Math.abs(u-TX)<3 || Math.abs(u+1.8)<1.4 || Math.abs(u-11.5)<2.8)) continue;
      for(let y=0;y<l;y+=.2) ranken.push([u+Math.sin(y*5+i)*.12,5.9-y,.08,.15,.12,.07,y%.4<.2?0x57a83c:0x3c8434]); }
    GRAB.viele(g,GEO.sph,moos.concat(ranken));
    /* Wellenband: Zeichen für Wasser */
    for(let u=-L/2+1;u<L/2-1;u+=.62){ if(seite==='hinten' && (Math.abs(u+.3-TX)<2.8 || Math.abs(u+1.8)<1.2 || Math.abs(u-11.5)<2.6 || Math.abs(u-6.45)<.8)) continue;
      strich(g,[u,4.55,.05],[u+.31,4.82,.05],.05,0x8ae0d4); strich(g,[u+.31,4.82,.05],[u+.62,4.55,.05],.05,0x8ae0d4); }
    /* Öllampen auf Konsolen */
    (seite==='hinten'?[-17,-6.4,2.2,15.6]:[-8,3.2]).forEach((u,i)=>{ box(g,.7,.14,.45,STEINH,u,2.7,.22); ball(g,.2,TON,u,2.88,.25,1.4,.6,1); const fl=kegel(g,.09,.28,basis(0xffd050),u+.18,3.12,.25); fl.castShadow=false;
      const s=schein(g,'rgba(255,190,90,.7)',u+.18,3.15,.4,1.3); k.anim.push(t=>{ const a=1.2+Math.sin(t*9+i*2+n)*.14; s.scale.set(a,a,1); }); });
    verschmelze(g); });

  /* =============== Boden: Pfützen, kleines Schilf, Pilze, Kiesel, Schnecken =============== */
  const pfuetze=nass(0x6adce8,.34);
  [[-5.6,-2.6,1.1,.6],[10.6,-.4,.9,.7],[-2.2,8.2,.7,.55],[13,-9.4,1,.6],[-9.6,-.8,.8,.7]].forEach(([x,z,a,b])=>{ scheibe(sc,1,pfuetze,x,.018,z,a,b); scheibe(sc,.55,pfuetze,x+a*.7,.021,z+b*.4,a,b); });
  const schilf=[], schilfOrte=[[-2.1,-3.4],[-1.4,.9],[4.6,-.2],[-17.2,.8],[-17.3,5.6],[.1,-9.95],[7.6,-9.7],[-13.2,-12.9],[17.3,5],[17.3,9.4],[-15.4,12.8],[-5.4,13],[17.2,-3]];
  schilfOrte.forEach(([x,z])=>{ for(let i=0;i<14;i++){ const hh=.22+zufall()*.36; schilf.push([x+(zufall()-.5)*.8,hh/2,z+(zufall()-.5)*.5,.04,hh,.04,[0x6ab84a,0x4a9040,0x8ac858][i%3],0,(zufall()-.5)*.5,(zufall()-.5)*.5]); } });
  GRAB.viele(sc,GEO.cone,schilf);
  const kiesel=[];
  for(let i=0;i<260;i++){ const rand=i%2, x=rand?(zufall()<.5?-1:1)*(15.5+zufall()*2.3):-17.5+zufall()*35, z=rand?-13+zufall()*26:(zufall()<.5?-1:1)*(11.4+zufall()*1.9), r=.05+zufall()*.1;
    kiesel.push([x,r*.4,z,r*1.3,r*.7,r,[0x6a8a86,0x9ab8ae,0x4a6a66,0x5a944c][i%4]]); }
  for(let i=0;i<90;i++){ const a=zufall()*6.28, r=3.45+zufall()*.9; kiesel.push([BX+Math.cos(a)*r,.03,BZ+Math.sin(a)*r,.08,.05,.07,i%3?0x9ab8ae:0x5a944c]); }
  GRAB.viele(sc,GEO.sph,kiesel);
  const stiele=[], huete=[];
  [[-11.9,-12.7],[-17.4,-3.8],[14,-12.8],[17.4,-7.6],[-7.6,12.9],[9.4,13],[17.4,12.8],[-3,-12.9]].forEach(([x,z],o)=>{ for(let i=0;i<5;i++){ const a=x+(zufall()-.5)*.7, b=z+(zufall()-.5)*.35, hh=.14+zufall()*.2;
    stiele.push([a,hh/2,b,.035,hh,.035,0xf0e8d0]); huete.push([a,hh,b,.13,.075,.13,o%2?0xe89a50:0xd8c0f0]); } });
  GRAB.viele(sc,GEO.cyl,stiele); GRAB.viele(sc,GEO.sph,huete);
  [[-12.4,12.4,.4],[13.4,-12.4,2.6],[-6.8,2.2,1.2]].forEach(([x,z,d],i)=>{ const g=gruppe(sc,x,0,z); g.rotation.y=d;
    ball(g,.11,0xd8c8a0,0,.07,0,1.9,.55,.8); ball(g,.15,i%2?0xc87a40:0xd8a050,-.05,.2,0,1,1,.65); reif(g,.075,.018,0x7a4a22,-.05,.2,.1).rotation.x=0;
    [-1,1].forEach(s=>{ strich(g,[.17,.1,s*.04],[.25,.28,s*.08],.012,0xd8c8a0); ball(g,.025,SCHWARZ,.25,.29,s*.08); }); verschmelze(g);
    k.anim.push(t=>{ const u=Math.sin(t*.12+i*2)*.35; g.position.set(x+Math.cos(d)*u,0,z-Math.sin(d)*u); }); });

  /* =============== Leben: Seile, Tropfen, Frösche =============== */
  [[-16.9,-8.9,3.6],[-3.7,-12.7,2.6],[1.7,-12.7,3.1],[14.7,-12.6,2.4],[-17.35,1.4,2.8],[17.35,-5.4,3.2],[4.9,-12.7,3.9]].forEach(([x,z,u],i)=>haengeseil(k,x,z,u,i*1.4));
  [[BX-.9,BZ-.6,.43,2.6,0],[BX+1.5,BZ+.9,.43,3.3,.45],[-5.6,-2.6,.02,2.9,.2],[10.6,-.4,.02,3.6,.7],[-2.2,8.2,.02,4.1,.35],[13,-9.4,.02,3.1,.85],[-9.6,-.8,.02,3.8,.55],[1.9,RZ,.32,2.4,.6]]
    .forEach(([x,z,u,takt,v])=>tropfen(sc,k,x,z,u,6.4,takt,v));
  const rand=[0,1,2,3,4,5,6,7,8,9].map(i=>[BX+Math.cos(i*.628)*3,BZ+Math.sin(i*.628)*3]);
  frosch(k,rand,.61,.5,0);
  frosch(k,[[-10.4,-1],[-8.8,0],[-9,2],[-10.5,2.4]],0,.55,1.3,0x8ae838);
  frosch(k,[[11,8.6],[12.8,9.4],[12.2,10.6],[10.2,10]],0,.45,2.2);
  frosch(k,[[-6.4,10.4],[-4.9,11.5],[-3.2,10.6],[-4.6,9.4]],0,.6,.7,0x50d058);

  return { tuer, start:[-.4,8.8] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-17,-11],[-12.8,-9.6],[-13,-6.8],[-6.2,-8.4],[-2.9,-9.9],[2.2,-11.4],[4.8,-6.5],[9.2,-10],[13.8,-10.6],[16.4,-2.6],
  [11.8,-2],[16.2,5],[13.4,7.4],[9.4,9.8],[5.2,9.4],[-.6,11.4],[-7.4,11.4],[-15,7],[-10.8,3.6],[-6.4,-1]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-4.2, z:3, steh:[-4.1,4.8], r:1.1, treffer:[2.2,2.5,2], baue(g,k){ /* 1 Wassereimer: Holzeimer mit Eisenreifen und hohem Henkel */
      walze(g,1.1,.14,STEINH,0,.07,0);
      rohr(g,.84,.64,1.25,HOLZ,0,.77,0,16,true); walze(g,.63,.08,HOLZ2,0,.18,0);
      for(let i=0;i<16;i++){ const a=i*Math.PI/8; strich(g,[Math.sin(a)*.645,.15,Math.cos(a)*.645],[Math.sin(a)*.845,1.39,Math.cos(a)*.845],.018,HOLZ2); }
      [[.38,.69],[1.08,.8]].forEach(([y,r])=>reif(g,r,.05,EISEN,0,y,0)); reif(g,.84,.055,HOLZ2,0,1.4,0);
      [-1,1].forEach(s=>{ box(g,.16,.3,.24,EISEN,s*.84,1.4,0); ball(g,.08,GOLD2,s*.93,1.45,0); });
      ring(g,.86,.045,EISEN,0,1.45,0,Math.PI); const griff=walze(g,.095,.5,HOLZ2,0,2.31,0); griff.rotation.z=Math.PI/2;
      scheibe(g,.8,nass(0x50d0e8,.9),0,1.27,0);
      tropfen(g,k,.18,.12,1.28,5.2,2.2,.1);
    } },
  { x:8.7, z:-4.4, steh:[8.5,-2.4], kasten:[3.3,1.9], treffer:[3.2,3.2,1.8], baue(g,k){ /* 2 Seilwinde: Holzgestell, Trommel mit Seil, Kurbel, hängender Haken-Stein */
      [-1.25,1.25].forEach(x=>{ [-.7,.7].forEach(z=>strich(g,[x,0,z],[x,2.45,0],.13,HOLZ2)); box(g,.34,.14,1.75,HOLZ2,x,.07,0); strich(g,[x,1,-.42],[x,1,.42],.08,HOLZ); ball(g,.2,EISEN,x,2.45,0); });
      strich(g,[-1.25,.5,-.56],[1.25,.5,-.56],.09,HOLZ);
      const trommel=gruppe(g,0,2.45,0); trommel.userData.lebendig=true;
      const achse=walze(trommel,.12,2.9,HOLZ2,0,0,0); achse.rotation.z=Math.PI/2;
      const w=walze(trommel,.38,1.9,SEIL,0,0,0); w.rotation.z=Math.PI/2;
      for(let i=0;i<11;i++) ring(trommel,.39,.045,i%2?SEILD:SEIL,-.85+i*.17,0,0).rotation.y=Math.PI/2;
      [-1,1].forEach(s=>{ const f=walze(trommel,.58,.12,HOLZ,s*1.02,0,0); f.rotation.z=Math.PI/2; });
      /* Kurbel rechts */
      strich(trommel,[1.5,0,0],[1.5,-.6,.28],.08,EISEN); strich(trommel,[1.5,-.6,.28],[1.95,-.6,.28],.09,HOLZ); ball(trommel,.13,GOLD,1.43,0,0);
      verschmelze(trommel);
      const seil=gruppe(g,-.25,2.4,.42); seil.userData.lebendig=true;
      strich(seil,[0,0,0],[0,-1.5,.06],.055,SEIL); ball(seil,.13,SEILD,0,-1.5,.06); ring(seil,.17,.05,EISEN,0,-1.76,.06,Math.PI*1.5);
      verschmelze(seil);
      k.anim.push(t=>{ seil.rotation.z=Math.sin(t*1.4)*.1; trommel.rotation.x=Math.sin(t*.8)*.18; });
      /* aufgerolltes Seilende am Fuß */
      reif(g,.34,.07,SEIL,.55,.08,.25); reif(g,.25,.07,SEILD,.55,.18,.25);
    } },
  { x:12.7, z:3.4, dreh:Math.PI+.42, steh:[11.4,6], kasten:[4.4,3], treffer:[4.4,2.4,1.9], baue(g){ /* 3 Krokodil-Figur: freundliches Steinkrokodil auf einem Sockel */
      const F=0x9aa88c, D=0x74846a, H=0xc4ceae;
      box(g,4.2,.18,1.75,STEIND,0,.09,0); box(g,3.9,.5,1.5,0xb0aa94,0,.43,0); box(g,4.05,.14,1.64,0xd0cab0,0,.74,0);
      for(let i=0;i<9;i++){ const x=-1.6+i*.4; strich(g,[x,.34,.77],[x+.2,.52,.77],.035,STEINT); strich(g,[x+.2,.52,.77],[x+.4,.34,.77],.035,STEINT); }
      ball(g,.6,F,-.25,1.23,0,1.75,.72,.95); ball(g,.45,H,-.25,1.08,0,1.9,.55,.9);
      /* Schwanz biegt sich zur Seite */
      strich(g,[-1.1,1.2,0],[-1.6,1.1,.12],.27,F); strich(g,[-1.6,1.1,.12],[-1.9,1.05,.45],.18,F); strich(g,[-1.9,1.05,.45],[-1.75,1.2,.72],.1,F);
      [[-1.1,1.2,0,.28],[-1.6,1.1,.12,.2],[-1.9,1.05,.45,.14],[-1.75,1.2,.72,.09]].forEach(([x,y,z,r])=>ball(g,r,F,x,y,z));
      for(let i=0;i<6;i++) [-1,1].forEach(s=>ball(g,.13,D,-1.05+i*.32,1.65-Math.abs(i-2.5)*.045,s*.17,1.1,.8,.7));
      [[.45,1],[.45,-1],[-.85,1],[-.85,-1]].forEach(([x,s])=>{ strich(g,[x,1.15,s*.4],[x+.18,.92,s*.62],.16,F); ball(g,.2,F,x+.27,.89,s*.64,1.4,.55,1); [-.13,0,.13].forEach(v=>ball(g,.065,H,x+.52,.86,s*.64+v)); });
      /* Kopf mit offenem, lächelndem Maul */
      ball(g,.48,F,.88,1.5,0,1.05,.85,.95);
      const oben=gruppe(g,1.0,1.52,0); oben.rotation.z=.14; ball(oben,.34,F,.55,0,0,2.1,.55,1); ball(oben,.25,F,1.18,.04,0,1.1,.7,1.05); [-1,1].forEach(s=>{ ball(oben,.085,D,1.3,.2,s*.14); ball(oben,.035,STEINT,1.34,.26,s*.14);
        for(let i=0;i<4;i++) ball(oben,.055,0xf4f0dc,.5+i*.22,-.16,s*(.28-i*.022),1,1.2,.8); });
      const unten=gruppe(g,.98,1.24,0); unten.rotation.z=-.16; ball(unten,.3,H,.52,-.02,0,2.15,.42,.95); ball(unten,.22,0xc87870,.55,.07,0,2.2,.2,.9);
      [-1,1].forEach(s=>{ ball(g,.22,F,.88,1.9,s*.28); ball(g,.15,0xf8f6e8,.99,1.94,s*.31); ball(g,.075,SCHWARZ,1.11,1.96,s*.34); ball(g,.026,0xffffff,1.17,2.0,s*.35);
        ring(g,.18,.035,D,.96,1.96,s*.31,Math.PI).rotation.y=Math.PI/2;
        strich(g,[.85,1.34,s*.45],[1.2,1.26,s*.4],.028,STEINT); ball(g,.09,0xd89a88,.9,1.52,s*.45,1,.8,.35); });
      ball(g,.2,MOOS,-1.7,.8,-.55,1.5,.3,1);
    } },
  { x:-8.5, z:5.6, steh:[-8.3,7.5], r:1.15, treffer:[2.4,2.5,2], baue(g){ /* 4 Werkzeugkorb: Flechtkorb mit Hammer und Meißel */
      const K=0xd8a858, K2=0xa87434;
      rohr(g,.96,.72,1.05,K,0,.53,0,18,true); walze(g,.72,.1,K2,0,.06,0);
      [.12,.34,.56,.78].forEach(y=>reif(g,.72+y*.23,.055,K2,0,y,0)); reif(g,.97,.1,0xc48c40,0,1.07,0);
      for(let i=0;i<18;i++){ const a=i*Math.PI/9; strich(g,[Math.sin(a)*.745,.05,Math.cos(a)*.745],[Math.sin(a)*.985,1.05,Math.cos(a)*.985],.035,0xecc880); }
      walze(g,.88,.06,0x5a3a18,0,.82,0);
      /* großer Hammer: Holzstiel, grauer Eisenkopf */
      strich(g,[-.15,.7,.1],[-.5,1.9,.2],.1,HOLZ);
      const kopf=gruppe(g,-.53,2.0,.21); kopf.rotation.z=.28; box(kopf,.95,.42,.42,0xaab4bc,0,0,0); [-.5,.5].forEach(a=>box(kopf,.1,.48,.48,EISEN,a,0,0));
      /* zwei Meißel: flache Schneide unten im Korb, Holzgriff oben */
      [[.25,.1,.5,1.72,.28],[.45,-.35,.85,1.55,-.35]].forEach(([x,z,x2,y2,z2])=>{ const a=[x,.75,z], m=[x+(x2-x)*.62,.75+(y2-.75)*.62,z+(z2-z)*.62];
        strich(g,a,m,.065,0xc4ced6); strich(g,m,[x2,y2,z2],.12,0x8a4a22); ball(g,.125,HOLZ2,x2,y2,z2,1,.7,1); ball(g,.1,GOLD2,m[0],m[1],m[2],1.2,.5,1.2); });
      /* Holzklüpfel */
      strich(g,[-.2,.7,-.35],[-.1,1.45,-.55],.075,HOLZ2); const kl=rohr(g,.24,.19,.42,0xc89454,-.08,1.62,-.59); kl.rotation.x=-.25;
    } },
  { x:-1.8, y:0, z:-13.45, wand:'hinten', steh:[-1.8,-11.5], treffer:[1.7,4.7,.8], baue(g,k){ /* 5 Wasserstandsmesser: helle Messlatte mit Strichen und Zeiger */
      box(g,1.45,4.65,.14,STEINT,0,2.42,0); box(g,1.65,.18,.4,STEINH,0,4.82,.1); box(g,1.65,.22,.55,STEINH,0,.11,.2);
      const tex=bild(128,576,(c)=>{ c.fillStyle='#f6ecc8'; c.fillRect(0,0,128,576); c.fillStyle='#48b8d8'; c.fillRect(0,400,128,176);
        c.strokeStyle='#e8fbff'; c.lineWidth=5; [420,470,520].forEach(y=>{ c.beginPath(); for(let x=0;x<=128;x+=16) c.lineTo(x,y+((x/16)%2)*10); c.stroke(); });
        c.fillStyle='#2a1a08'; c.font='700 44px Andika, Arial, sans-serif'; c.textBaseline='middle';
        for(let i=0;i<=16;i++){ const y=548-i*32; c.fillRect(0,y-3,i%2?34:62,i%2?5:8); if(i%2===0 && i>0){ c.fillStyle=y>400?'#0a2a3a':'#a8321e'; c.fillText(String(i/2),78,y); c.fillStyle='#2a1a08'; } }
        c.strokeStyle='#8a6420'; c.lineWidth=10; c.strokeRect(5,5,118,566); });
      GRAB.tafel(g,tex,.95,4.25,-.1,2.42,.09);
      strich(g,[.58,.4,.14],[.58,4.45,.14],.04,GOLD2);
      const zeiger=gruppe(g,.5,2,.18); zeiger.userData.lebendig=true;
      box(zeiger,.42,.14,.12,ROT,.0,0,0); const sp=kegel(zeiger,.14,.3,ROT,-.34,0,0); sp.rotation.z=Math.PI/2; sp.scale.z=.07; ball(zeiger,.11,GOLD,.1,0,.05);
      verschmelze(zeiger); k.anim.push(t=>{ zeiger.position.y=1.9+Math.sin(t*.7)*.28; });
    } },
  { x:11.5, y:0, z:-13.45, wand:'hinten', steh:[11.5,-11.5], treffer:[4.4,3.5,.7], trefferY:1.15, baue(g){ /* 6 Karte des Nils: großes Blatt zwischen zwei Holzstäben */
      const tex=bild(512,400,(c)=>{ c.fillStyle='#f2e2b0'; c.fillRect(0,0,512,400);
        for(let i=0;i<500;i++){ c.fillStyle=i%2?'rgba(150,110,50,.13)':'rgba(255,250,220,.35)'; c.fillRect((i*97)%512,(i*53)%400,14,2); }
        const fluss=(breit,farbe)=>{ c.strokeStyle=farbe; c.lineCap='round'; c.lineWidth=breit; c.beginPath(); c.moveTo(262,382); c.bezierCurveTo(190,320,330,270,258,205); c.bezierCurveTo(215,165,290,150,256,122); c.stroke();
          [[130,46],[256,30],[392,52]].forEach(([x,y])=>{ c.beginPath(); c.moveTo(256,122); c.quadraticCurveTo((256+x)/2+(x-256)*.1,80,x,y); c.stroke(); }); };
        fluss(46,'#7ab850'); fluss(20,'#2a88c8');
        c.fillStyle='#3aa0d8'; c.fillRect(24,18,464,26); c.strokeStyle='#e0f6ff'; c.lineWidth=3; c.beginPath(); for(let x=30;x<=480;x+=14) c.lineTo(x,28+((x/14|0)%2)*7); c.stroke();
        const pyr=(x,y,s)=>{ c.fillStyle='#e8b030'; c.beginPath(); c.moveTo(x-s,y); c.lineTo(x,y-s*1.25); c.lineTo(x+s,y); c.fill(); c.fillStyle='#b07818'; c.beginPath(); c.moveTo(x,y-s*1.25); c.lineTo(x+s,y); c.lineTo(x+s*.25,y); c.fill(); };
        pyr(120,190,34); pyr(170,196,22); pyr(390,300,28);
        const baum=(x,y)=>{ c.strokeStyle='#8a5a2a'; c.lineWidth=6; c.beginPath(); c.moveTo(x,y); c.lineTo(x+4,y-30); c.stroke(); c.strokeStyle='#2f8a30'; [[-18,-4],[-12,-18],[4,-22],[18,-14],[22,2]].forEach(([a,b])=>{ c.beginPath(); c.moveTo(x+4,y-30); c.quadraticCurveTo(x+4+a*.6,y-34+b*.7,x+4+a,y-28+b*.5); c.stroke(); }); };
        baum(345,190); baum(380,205); baum(110,330); baum(145,345);
        c.fillStyle='#a85a24'; c.beginPath(); c.moveTo(238,300); c.lineTo(292,300); c.lineTo(278,316); c.lineTo(250,316); c.fill(); c.fillStyle='#fff8e8'; c.beginPath(); c.moveTo(264,298); c.lineTo(264,262); c.lineTo(290,292); c.fill();
        c.fillStyle='#4a2a10'; c.font='700 44px Andika, Arial, sans-serif'; c.textAlign='center'; c.fillText('NIL',420,120);
        c.strokeStyle='#a8321e'; c.lineWidth=7; c.strokeRect(10,8,492,384); });
      GRAB.tafel(g,tex,3.8,2.95,0,2.85,.16);
      box(g,4.0,3.12,.08,HOLZ2,0,2.85,.06);
      [4.42,1.28].forEach(y=>{ const s=walze(g,.13,4.35,HOLZ,0,y,.2); s.rotation.z=Math.PI/2; [-1,1].forEach(v=>ball(g,.19,GOLD,v*2.22,y,.2)); });
      [-1.5,1.5].forEach(x=>{ strich(g,[x,4.5,.18],[x*.4,5.15,.1],.035,SEILD); }); ball(g,.12,GOLD2,-.6,5.15,.1); ball(g,.12,GOLD2,.6,5.15,.1);
    } },
  { x:15.4, z:-5.7, dreh:-.35, steh:[13.3,-4.9], kasten:[2.8,2.6], treffer:[2.7,2.4,2], baue(g){ /* 7 Kiste mit Tonscherben: offene Holzkiste, oben voller gebogener Scherben */
      box(g,2.3,.14,1.7,HOLZ2,0,.14,0);
      [-1,1].forEach(s=>{ [.4,.76,1.1].forEach(y=>{ box(g,2.3,.3,.12,y>.5&&y<1?0xb88048:HOLZ,0,y,s*.8); box(g,.12,.3,1.52,y>.5&&y<1?HOLZ:0xb88048,s*1.09,y,0); }); });
      [-1.1,1.1].forEach(x=>[-.81,.81].forEach(z=>{ box(g,.2,1.28,.2,HOLZ2,x,.64,z); ball(g,.07,EISEN,x,1.1,z+(z>0?.1:-.1)); }));
      box(g,2.05,.1,1.5,0x8a4a28,0,.95,0);
      const farben=[0xd8804a,0xb85a30,0xeaa068];
      const scherbe=(x,y,z,r,hh,bogen,farbe,dx,dy,dz)=>{ const e=gruppe(g,x,y,z); e.rotation.set(dx,dy,dz);
        const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r*.72,hh,8,1,true,-bogen/2,bogen),mat(farbe,{side:THREE.DoubleSide})); m.position.z=-r; m.castShadow=true; e.add(m);
        const s=new THREE.Mesh(new THREE.CylinderGeometry(r*.935,r*.795,hh*.16,8,1,true,-bogen/2,bogen),mat(0x3a2418,{side:THREE.DoubleSide})); s.position.set(0,0,-r+.07*r); e.add(s); };
      [[-.65,1.3,.3,.6,.7,1.5,0,-.35,.4,.35],[.05,1.38,.1,.7,.85,1.4,1,-.15,-.2,-.15],[.68,1.26,.35,.5,.62,1.7,2,-.5,.5,-.4],[-.4,1.28,-.35,.55,.6,1.8,2,-.2,2.6,.2],[.45,1.35,-.3,.6,.75,1.3,0,.1,-1.2,.25],[-.05,1.12,.52,.45,.4,1.6,2,-1.1,.2,.7],[.8,1.14,-.1,.4,.5,1.8,1,-.8,1.6,0],[-.82,1.12,-.1,.42,.45,1.6,1,-.7,-1.6,.3]]
        .forEach(([x,y,z,r,hh,b,f,dx,dy,dz])=>scherbe(x,y,z,r,hh,b,farben[f],dx,dy,dz));
      /* Topfhals mit Rand */
      const hals=gruppe(g,.25,1.5,.45); hals.rotation.set(1.0,0,-.5); rohr(hals,.2,.28,.32,0xd8804a,0,0,0,12,true); reif(hals,.21,.06,0xb85a30,0,.17,0);
    } },
  { x:-14.7, z:4.2, steh:[-12.8,5.2], r:1.35, treffer:[2.8,4.3,2.4], baue(g,k){ /* 8 Papyrusstauden: hohe Stängel mit Wedelkronen in einem Wasserbecken aus Stein */
      rohr(g,1.35,1.2,.55,0xb8b098,0,.28,0,16,true); reif(g,1.33,.09,0xd8d0b4,0,.56,0); walze(g,1.18,.08,0x145868,0,.38,0);
      scheibe(g,1.25,nass(0x48ccdc,.7),0,.47,0);
      [[0,0,4.0],[-.62,.2,3.1],[.58,.3,3.35],[-.3,-.55,3.6],[.45,-.45,2.75],[.05,.65,2.35],[-.7,-.25,2.2]].forEach(([x,z,hh],i)=>{
        const s=gruppe(g,x*.7,.4,z*.7); s.userData.lebendig=true;
        const ex=x*.75, ez=z*.75, y=hh-.4;
        strich(s,[0,0,0],[ex,y,ez],.07,i%2?0x58a838:0x74c048);
        ball(s,.13,0x8a9a34,ex,y,ez);
        for(let j=0;j<18;j++){ const a=j*Math.PI/9+i, r=j%2?.72:.5, hoch=j%2?.22:.5;
          strich(s,[ex,y,ez],[ex+Math.cos(a)*r,y+hoch,ez+Math.sin(a)*r],.028,j%3?0x9ad048:0x68b038); ball(s,.055,0xd8d868,ex+Math.cos(a)*r,y+hoch,ez+Math.sin(a)*r,1,.7,1); }
        verschmelze(s);
        k.anim.push(t=>{ s.rotation.z=Math.sin(t*.8+i*1.3)*.028; s.rotation.x=Math.sin(t*.6+i)*.022; }); });
    } },
  { x:3.5, z:-8.7, steh:[3.5,-6.7], kasten:[3.5,1.9], treffer:[3.4,3.6,1.8], baue(g,k){ /* 9 Wasserrad: großes Holzrad mit Schaufeln, dreht sich in der Rinne */
      const Y=1.85, R=1.6;
      [-.78,.78].forEach(z=>{ [-.85,.85].forEach(x=>strich(g,[x,0,z],[0,Y,z],.11,HOLZ2)); box(g,.5,.34,.18,HOLZ2,0,Y,z); box(g,2.1,.16,.32,STEIND,0,.52,z+(z>0?.06:-.06)); });
      const achse=walze(g,.14,1.95,EISEN,0,Y,0); achse.rotation.x=Math.PI/2; ball(g,.2,GOLD,0,Y,1.0);
      const rad=gruppe(g,0,Y,0); rad.userData.lebendig=true;
      [-.34,.34].forEach(z=>{ ring(rad,R,.09,HOLZ,0,0,z); ring(rad,R*.62,.055,HOLZ2,0,0,z);
        for(let i=0;i<8;i++){ const a=i*Math.PI/4; strich(rad,[0,0,z],[Math.cos(a)*R,Math.sin(a)*R,z],.07,i%2?HOLZ:0xb88048); } });
      for(let i=0;i<12;i++){ const a=i*Math.PI/6, s=gruppe(rad,Math.cos(a)*(R+.08),Math.sin(a)*(R+.08),0); s.rotation.z=a;
        box(s,.48,.09,.94,0xc89458,.04,0,0); box(s,.09,.24,.94,HOLZ2,.27,.1,0); }
      const nabe=walze(rad,.34,.86,HOLZ2,0,0,0); nabe.rotation.x=Math.PI/2;
      verschmelze(rad);
      const tr=[0,1,2,3,4,5].map(i=>{ const b=ball(g,.045,perle(),0,1,0,1,1.7,1); b.userData.lebendig=true; b.castShadow=false; return b; });
      k.anim.push(t=>{ rad.rotation.z=-t*.65; tr.forEach((b,i)=>{ const f=(t*.9+i/6)%1; b.position.set(-1.5-Math.sin(i*2)*.2-f*.2, 2.2-f*f*1.85, Math.sin(i*4.1)*.35); }); });
    } },
  { x:6.8, z:5.8, dreh:-2.2, steh:[6.2,8.1], r:1.5, treffer:[2.9,2.2,2.6], baue(g){ /* 10 Schildkröte aus Stein auf runder Platte */
      const P=0x9a9484, D=0x6e6858, H=0xc8c0a8;
      walze(g,1.5,.2,STEIND,0,.1,0); walze(g,1.36,.2,0xd4ccb0,0,.3,0);
      for(let i=0;i<14;i++){ const a=i*Math.PI/7; ball(g,.07,D,Math.cos(a)*1.38,.3,Math.sin(a)*1.38); }
      /* Panzer mit Rand und Feldern */
      const dom=new THREE.Mesh(new THREE.SphereGeometry(1,22,10,0,Math.PI*2,0,Math.PI*.5),mat(P)); dom.position.set(-.1,.75,0); dom.scale.set(1.08,.88,.94); dom.castShadow=true; g.add(dom);
      ball(g,.9,H,-.1,.75,0,1.1,.2,.97); const rd=reif(g,1,.1,D,-.1,.76,0); rd.scale.set(1.08,.94,1);
      const feld=(a,b,r)=>{ const th=b, x=Math.sin(th)*Math.cos(a), y=Math.cos(th), z=Math.sin(th)*Math.sin(a), q=1-r*r*.42;   /* q: Ring liegt auf der Wölbung */
        const t=ring(g,r,.04,D,-.1+x*1.085*q,.75+y*.89*q,z*.945*q); t.quaternion.setFromUnitVectors(V(0,0,1),V(x/1.08,y/.88,z/.94).normalize()); };
      feld(0,0,.3); for(let i=0;i<6;i++) feld(i*Math.PI/3,.68,.28); for(let i=0;i<10;i++) feld(i*Math.PI/5+.3,1.16,.17);
      /* Kopf, Beine, Schwanz */
      strich(g,[.8,.78,0],[1.22,1.02,0],.23,H); ball(g,.38,H,1.34,1.14,0,1.15,.9,.95);
      [-1,1].forEach(s=>{ ball(g,.12,0xf4f0e0,1.54,1.3,s*.23); ball(g,.065,SCHWARZ,1.63,1.32,s*.26); ball(g,.022,0xffffff,1.68,1.35,s*.27);
        strich(g,[1.55,1.02,s*.27],[1.75,1.07,s*.08],.025,D); ball(g,.025,D,1.76,1.18,s*.07);
        [[.62,.8],[-.82,.75]].forEach(([x,z])=>{ ball(g,.33,H,x,.58,s*z,1.15,.6,.9); [-.16,0,.16].forEach(v=>ball(g,.07,D,x+v,.48,s*(z+.27-Math.abs(v)*.3))); }); });
      const sw=kegel(g,.17,.5,H,-1.28,.66,0); sw.rotation.z=Math.PI/2+.25;
      ball(g,.24,MOOS,-.75,.4,.85,1.4,.3,1);
    } }
];

return { titel:'Der Brunnenschacht', breite:36, tiefe:27, baue, gegenstaende, verstecke, oben:['5,16,20','11,38,44','34,74,76'] };
})();

/* Schlussbild Grabkammer: Sonnenuntergang in Ägypten. Die runde Steinplatte rollt zur Seite, aus dem warm leuchtenden
   Grabeingang tritt die Spielfigur, läuft nach vorn, winkt und jubelt. Kamel Karim nickt freundlich, eine Katze sitzt auf einem
   Steinblock, hinten liegen der Nil mit Segelboot und drei Pyramiden, dazu Palmen, Vögel, Goldstaub und erste Sterne. Ohne Schrift. */
FINALE3D.grabkammer = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  if(!k.kreis) k.kreis=function(){}; /* im Schlussbild braucht es keine Hindernisse */
  const HORIZONT=0xffc888;
  sc.background=new THREE.Color(HORIZONT);
  sc.fog=new THREE.Fog(HORIZONT,40,125);
  sc.add(new THREE.HemisphereLight(0xe8d4ff,0x8a6030,.66));
  const licht=new THREE.DirectionalLight(0xffc080,.62); licht.position.set(9,12,13); licht.castShadow=true; licht.shadow.mapSize.set(1024,1024);
  const sk=licht.shadow.camera; sk.left=-15; sk.right=15; sk.top=13; sk.bottom=-11; sk.near=1; sk.far=48; licht.shadow.bias=-.001; sc.add(licht);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const FELS=[0xc8975a,0xb8844c,0xd4a766,0xa97640,0xc08e54];
  const STEIN=0xd9b678, STEIN2=0xa47c48, GOLD=GRAB.GOLD, TUERKIS=GRAB.TUERKIS, BLAU=GRAB.BLAU, ROT=GRAB.ROT, HOLZ=GRAB.HOLZ, HOLZ2=GRAB.HOLZ2, WEISS=GRAB.WEISS;
  const GRUEN=[0x4f8a30,0x6a9e38,0x3c7a34,0x86a83c];
  const FELSGEO=new THREE.DodecahedronGeometry(1,0);

  /* ---------- Abendhimmel: Verlauf, Sonne, Wolken ---------- */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#1c2260'); v.addColorStop(.36,'#34408c'); v.addColorStop(.415,'#7c5aa4'); v.addColorStop(.455,'#e0707a'); v.addColorStop(.48,'#ff9c58'); v.addColorStop(.5,'#ffc888'); v.addColorStop(1,'#ffc888'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(100,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(4,32),basis(0xffe89a,{fog:false})); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,180,90,.8)',0,0,0,24); sonnenSchein.material.fog=false;
  const wolkeHell=basis(0xffb494,{fog:false}), wolkeDunkel=basis(0xc87494,{fog:false});
  const wolken=[[-36,15.5,1],[-13,21,.8],[9,17.5,.65],[36,19,.95]].map(p=>{ const g=gruppe(sc,p[0],p[1],-55);
    [[-2.4,0,1.2],[-.9,.35,1.6],[.9,.2,1.4],[2.4,-.05,1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1.3,.4,.4));
    ball(g,1,wolkeDunkel,0,-.35,.15,4.2,.4,.4); g.scale.setScalar(p[2]); verschmelze(g); ohneSchatten(g); return { g, x:p[0] }; });

  /* ---------- Sandboden, Weg, ferne Dünen ---------- */
  const sand=GRAB.sandBild([218,170,104],18); sand.wrapS=sand.wrapT=THREE.RepeatWrapping; sand.repeat.set(26,26);
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshLambertMaterial({map:sand})); boden.rotation.x=-Math.PI/2; boden.receiveShadow=true; sc.add(boden);
  const platten=[];
  for(let r=0;r<11;r++) for(let i=0;i<3;i++){ const x=(i-1)*.92+(r%2?.18:-.18), z=-1.6+r*.82; platten.push([x,.008,z,.82+zufall()*.08,.016,.7,r%2===i%2?0xe6c88e:0xdcba7c,(zufall()-.5)*.1]); }
  GRAB.viele(sc,GEO.box,platten);
  const duenen=gruppe(sc,0,0,0);
  [[-84,-40,20,5,9],[86,-42,22,5.5,9],[-48,-72,24,6,9],[34,-76,22,5,8],[66,-72,20,7,9],[-82,-14,18,6,14],[84,-12,18,6,14]].forEach((d,i)=>ball(duenen,1,i%2?0xcf9658:0xdca866,d[0],-.5,d[1],d[2],d[3],d[4]));
  verschmelze(duenen); ohneSchatten(duenen);

  /* ---------- drei Pyramiden ---------- */
  const pyr=(b,h,farbe,z)=>{ const g=gruppe(sc,0,0,z), m=GRAB.pyramide(g,0,0,b,h,farbe);
    if(m.geometry.index){ m.geometry=m.geometry.toNonIndexed(); } m.geometry.computeVertexNormals(); /* scharfe Kanten */
    const spitze=GRAB.pyramide(g,0,0,b*.14,h*.14,0xffd472); spitze.position.y=h*.935;
    if(spitze.geometry.index){ spitze.geometry=spitze.geometry.toNonIndexed(); } spitze.geometry.computeVertexNormals();
    /* Steinlagen als dünne Bänder */
    for(let i=1;i<8;i++){ const u=i/9, br=b*(1-u)+.12; box(g,br,.14,br,0xb98850,0,h*u-.05,0); }
    verschmelze(g); ohneSchatten(g); return g; };
  const pyrMitte=pyr(25,19,0xd2a066,-61), pyrLinks=pyr(18,13.5,0xc8935c,-47), pyrRechts=pyr(16,12,0xdcac70,-52);
  pyrMitte.position.x=-17.5;

  /* ---------- Nil mit Ufern, Schilf und Glitzern ---------- */
  const NZ1=-8.2, NZ2=-22;
  const wasserBild=bild(4,128,g=>{ const v=g.createLinearGradient(0,0,0,128); v.addColorStop(0,'#c8786c'); v.addColorStop(.35,'#4a6c9c'); v.addColorStop(1,'#1e5a78'); g.fillStyle=v; g.fillRect(0,0,4,128); });
  const nil=new THREE.Mesh(new THREE.PlaneGeometry(220,NZ1-NZ2),new THREE.MeshLambertMaterial({map:wasserBild,emissive:0x142430})); nil.rotation.x=-Math.PI/2; nil.position.set(0,.025,(NZ1+NZ2)/2); sc.add(nil);
  const ufer=[], schilf=[], kolben=[];
  [NZ1,NZ2].forEach(z=>{ ufer.push([0,.03,z,220,.1,.7,0x7c8c38]);
    for(let i=0;i<190;i++){ const x=(i/190-.5)*96+zufall()*.5, zz=z+(zufall()-.5)*.7, h=.35+zufall()*.6;
      schilf.push([x,h/2,zz,.07,h,.07,GRUEN[i%4],0,0,(zufall()-.5)*.3]); if(i%7===0) kolben.push([x+.2,.82,zz,.05,.17,.05,0x7a4a20]), schilf.push([x+.2,.4,zz,.025,.8,.025,GRUEN[i%4]]); } });
  GRAB.viele(sc,GEO.box,ufer); GRAB.viele(sc,GEO.cone,schilf); GRAB.viele(sc,GEO.sph,kolben);
  const NW=70, glitzer=new THREE.InstancedMesh(GEO.box,basis(0xffd8a0,{fog:false}),NW), wd=[]; glitzer.frustumCulled=false; sc.add(glitzer);
  for(let i=0;i<NW;i++) wd.push({ x:(zufall()-.5)*76, z:NZ2+1+zufall()*(NZ1-NZ2-2), b:.4+zufall()*1, p:zufall()*6.28 });

  /* ---------- Segelboot auf dem Nil ---------- */
  const boot=gruppe(sc,13,0,-14), bf=gruppe(boot,0,0,0);
  ball(bf,1,HOLZ2,0,.18,0,2.1,.42,.7); ball(bf,1,HOLZ,0,.4,0,1.9,.16,.6);
  strich(bf,[1.6,.35,0],[2.55,.95,0],.12,HOLZ2); strich(bf,[-1.6,.35,0],[-2.35,.8,0],.12,HOLZ2); ball(bf,.15,GOLD,2.57,.98,0);
  const kante=ring(bf,1,.05,ROT,0,.38,0); kante.rotation.x=Math.PI/2; kante.scale.set(2.02,.68,1);
  walze(bf,.07,4.4,HOLZ2,.35,2.5,0);
  strich(bf,[1.6,.85,.08],[-1.2,4.9,.08],.05,HOLZ2); /* schräge Segelstange */
  const segelForm=(punkte,farbe,z)=>{ const f=new THREE.Shape(); punkte.forEach((p,i)=>i?f.lineTo(p[0],p[1]):f.moveTo(p[0],p[1]));
    const m=new THREE.Mesh(new THREE.ShapeGeometry(f),basis(farbe,{side:THREE.DoubleSide})); m.position.z=z; bf.add(m); return m; };
  segelForm([[1.55,.85],[-1.17,4.82],[-1.75,1.05]],0xffecd0,.1);
  segelForm([[.62,2.21],[.23,2.78],[-1.57,2.24],[-1.65,1.72]],0xd85a3a,.12);
  strich(bf,[-1.75,1.05,.1],[-1.5,.45,0],.02,HOLZ2);
  verschmelze(bf); ohneSchatten(boot);

  /* ---------- Felswand mit Grabeingang ---------- */
  const OB=1.6, OH=3.6, REIHE=.6, HINTEN=-6.4;
  const lagen=[], brocken=[];
  const lage=(x1,x2,i)=>{ let x=x1; while(x<x2-.01){ let b=.9+zufall()*1.2; if(x2-x-b<.7) b=x2-x; const vorn=-3.02-zufall()*.34;
    lagen.push([x+b/2,i*REIHE+REIHE/2,(vorn+HINTEN)/2,b,REIHE,vorn-HINTEN,FELS[Math.floor(zufall()*5)]]); x+=b; } };
  for(let i=0;i<9;i++){ const l=-6.7+i*.3+zufall()*.35, r=6.7-i*.33-zufall()*.35;
    if(i*REIHE<OH-.01){ lage(l,-OB,i); lage(OB,r,i); } else lage(l,r,i);
    [l,r].forEach((x,j)=>brocken.push([x+(j?-.1:.1),i*REIHE+.5,-4.1-zufall(),.32+zufall()*.2,.3,.5,FELS[(i+j)%5],zufall()*3])); }
  for(let i=0;i<20;i++){ const x=-3.7+i*.39+zufall()*.2, g=.28+zufall()*.34; brocken.push([x,5.38+g*.35,-4.2-zufall()*1.4,g*1.3,g*.85,g,FELS[i%5],zufall()*3]); }
  /* Geröll am Fuß der Wand */
  [-1,1].forEach(v=>{ [[6.5,-3.1,.8],[7.3,-3.9,.62],[5.7,-2.75,.36],[7.2,-2.8,.3],[6.9,-5,.9],[5.2,-2.82,.18]].forEach((p,i)=>brocken.push([v*p[0],p[2]*.55,p[1]-(v>0&&p[0]<6?.35:0),p[2]*1.1,p[2]*.8,p[2],FELS[(i+v+5)%5],i*1.3])); });
  GRAB.viele(sc,GEO.box,lagen); GRAB.viele(sc,FELSGEO,brocken);

  /* Leuchtendes Inneres */
  const innenBild=bild(128,128,g=>{ g.fillStyle='#6a3410'; g.fillRect(0,0,128,128); const v=g.createRadialGradient(64,92,4,64,80,84); v.addColorStop(0,'#fff6c8'); v.addColorStop(.35,'#ffca5a'); v.addColorStop(.75,'#d8761e'); v.addColorStop(1,'#6a3410'); g.fillStyle=v; g.fillRect(0,0,128,128);
    g.fillStyle='rgba(110,52,12,.4)'; for(let i=0;i<5;i++) g.fillRect(30+i*6,104+i*5,68-i*12,2); });
  const innen=new THREE.Mesh(new THREE.PlaneGeometry(OB*2,OH),new THREE.MeshBasicMaterial({map:innenBild,fog:false})); innen.position.set(0,OH/2,-5.9); sc.add(innen);
  const innenBoden=box(sc,OB*2,.02,2.9,0xd89448,0,.01,-4.45); innenBoden.castShadow=false;
  const drinnen=new THREE.PointLight(0xffaa44,1.25,8,1.5); drinnen.position.set(0,2.6,-4.6); sc.add(drinnen);
  const lichtBild=leuchtBild('rgba(255,190,90,.55)');
  const lichtfleck=new THREE.Mesh(new THREE.PlaneGeometry(5.4,5),new THREE.MeshBasicMaterial({map:lichtBild,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); lichtfleck.rotation.x=-Math.PI/2; lichtfleck.position.set(0,.05,-2); sc.add(lichtfleck);
  const torSchein=schein(sc,'rgba(255,200,100,.38)',0,1.9,-3.35,4.6);

  /* Türrahmen aus hellem Sandstein mit farbigen Bändern */
  const rahmen=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ const x=v*(OB+.27);
    box(rahmen,.54,OH,.56,STEIN,x,OH/2,-2.98); box(rahmen,.7,.26,.66,STEIN2,x,.13,-2.98);
    [[.7,BLAU],[.9,ROT],[3.0,TUERKIS],[3.2,GOLD]].forEach(([y,c])=>box(rahmen,.58,.12,.6,c,x,y,-2.98)); });
  box(rahmen,4.5,.62,.62,STEIN,0,OH+.31,-2.98);
  box(rahmen,4.7,.14,.7,STEIN2,0,OH+.69,-2.96); box(rahmen,5,.2,.76,STEIN,0,OH+.86,-2.94);
  for(let i=0;i<17;i++) box(rahmen,.14,.34,.05,[BLAU,GOLD,TUERKIS,ROT][i%4],-1.92+i*.24,OH+.31,-2.66);
  [-1,1].forEach(v=>box(rahmen,4.2,.05,.05,GOLD,0,OH+.31+v*.23,-2.66));
  verschmelze(rahmen);

  /* ---------- runde Steinplatte: rollt in ihrer Rinne zur Seite ---------- */
  const PR=1.7, PZ=-2.35, PZIEL=3.38;
  const rinne=gruppe(sc,0,0,0);
  box(rinne,7,.04,.5,0x8a6638,1.7,.02,PZ); box(rinne,6.9,.07,.08,STEIN2,1.7,.035,PZ+.31);
  verschmelze(rinne);
  const platte=gruppe(sc,0,PR+.04,PZ), pf=gruppe(platte,0,0,0);
  rohr(pf,PR,PR,.4,0xc59c62,0,0,0,32).rotation.x=Math.PI/2;
  [[1.52,.08,STEIN],[1.05,.05,STEIN2],[.42,.07,STEIN]].forEach(([r,d,c])=>ring(pf,r,d,c,0,0,.2));
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; strich(pf,[Math.cos(a)*.52,Math.sin(a)*.52,.21],[Math.cos(a)*.96,Math.sin(a)*.96,.21],.045,STEIN2); ball(pf,.11,i%2?TUERKIS:ROT,Math.cos(a)*1.29,Math.sin(a)*1.29,.2,1,1,.45); }
  ball(pf,.24,GOLD,0,0,.2,1,1,.5);
  verschmelze(pf);

  /* ---------- Feuerschalen neben dem Eingang ---------- */
  [-1,1].forEach(v=>{ GRAB.feuerschale(sc,k,v*2.45,-1.35); flacker(k,v*2.45,2.4,-1,0xff9a38,.55,7); });

  /* ---------- Palmen ---------- */
  const haine=gruppe(sc,0,0,0);
  [[-10.6,-5.4,5.3,.5],[-13.8,-6.6,4.3,2.2],[-18.5,-3.8,5.6,-.4],[-23,-6.4,4.6,1.2],[-29,-5,5,2.8],[23.5,-6.2,4.4,2.5],[28.5,-4,5.4,.9],[-16.5,3.2,4.4,2.9],[22,2.4,4.8,.2],
   [-31,-25,3.8,1],[-24,-24.5,3,2.4],[-15,-25.5,3.6,.3],[-7,-24,2.8,1.8],[9,-25,3.2,2.9],[18,-24.2,2.7,.6],[22,-26.5,3.7,2],[33,-24.5,3.2,1.2],[40,-26,3.8,.1],[-40,-26,3.4,2]].forEach(p=>GRAB.palme(haine,p[0],p[1],p[2],p[3]));
  verschmelze(haine);
  /* Palme rechts vorn: rückt je nach Bildformat, damit sie das Boot nicht verdeckt */
  const palmeR=gruppe(sc,10,0,-3.4); GRAB.palme(palmeR,0,0,6,.35); verschmelze(palmeR);

  /* ---------- Grabungslager an den Seiten: Zelte, Krüge, Kisten ---------- */
  const zelt=(x,z,farbe,dreh)=>{ const g=gruppe(sc,x,0,z); g.rotation.y=dreh;
    const d=kegel(g,1.75,1.5,farbe,0,1.75,0); d.rotation.y=Math.PI/4; rohr(g,1.24,1.32,1,WEISS,0,.5,0,4).rotation.y=Math.PI/4;
    box(g,.62,.82,.06,0x5a3a1c,0,.41,.93); rohr(g,1.28,1.28,.08,GOLD,0,1.02,0,4).rotation.y=Math.PI/4;
    walze(g,.04,.5,HOLZ2,0,2.7,0); ball(g,.1,GOLD,0,2.98,0); verschmelze(g); };
  zelt(-14.6,-1.6,0xc8503a,.25); zelt(15.8,-.8,0x2c7a90,-.3);
  const sachen=gruppe(sc,0,0,0);
  [[-9.9,-2.2,1.05],[-10.7,-1.5,.75],[-9.2,-2.7,.65],[9.6,.4,.95],[10.4,.9,.65],[-12.2,1.8,.9],[12.8,2.3,1.1]].forEach((p,i)=>GRAB.krug(sachen,p[0],p[1],p[2],i%2?0xb8683a:0xcc8a50));
  [[8.4,-1.4,.9,.3],[9.35,-1.7,.65,-.2],[-11.8,-.4,.8,.5],[13,-2,.75,.1]].forEach(([x,z,s,d])=>{ const g=gruppe(sachen,x,0,z); g.rotation.y=d; box(g,s,s,s,HOLZ,0,s/2,0);
    [.1,.9].forEach(h=>box(g,s+.05,s*.1,s+.05,HOLZ2,0,s*h,0)); strich(g,[-s*.42,s*.18,s*.52],[s*.42,s*.82,s*.52],s*.045,HOLZ2); });
  verschmelze(sachen);

  /* ---------- Büsche, Grasbüschel, Blüten und Steine ---------- */
  const busch=[], halme=[], kiesel=[], blueten=[];
  for(let i=0;i<70;i++){ const v=i%2?1:-1, x=v*(8.2+zufall()*28), z=-6.4-zufall()*1, s=.25+zufall()*.42; busch.push([x,s*.5,z,s*1.3,s*.85,s,GRUEN[i%4]]); if(i%3===0) blueten.push([x,s*1.3,z+s*.4,.09,.07,.09,i%2?0xff7a9a:0xfff0d0]); }
  for(let i=0;i<200;i++){ const v=i%2?1:-1, x=v*(2.6+zufall()*21), z=-2+zufall()*10; if(Math.abs(x)<10 && z<1.6) continue;
    const g=.07+zufall()*.1; if(i%3) kiesel.push([x,g*.35,z,g*1.2,g*.7,g,FELS[i%5],zufall()*3]); else for(let j=-1;j<2;j++) halme.push([x+j*.07,.14,z,.04,.3,.04,j?0x96903c:0xb0a448,0,0,-j*.45]); }
  GRAB.viele(sc,GEO.sph,busch); GRAB.viele(sc,GEO.cone,halme); GRAB.viele(sc,FELSGEO,kiesel); GRAB.viele(sc,GEO.sph,blueten);

  /* ---------- Kamel Karim ---------- */
  const karim=GRAB.kamel(sc,k,-6.8,0,-.5,.9); karim.g.name='kamel';

  /* ---------- Katze auf einem Steinblock ---------- */
  const platz=gruppe(sc,4.8,0,2.1), block=gruppe(platz,0,0,0);
  box(block,1.35,.46,1.05,STEIN,0,.23,0); box(block,1.45,.1,1.15,STEIN2,0,.05,0); box(block,1.37,.07,1.07,TUERKIS,0,.3,0); verschmelze(block);
  const miez=gruppe(platz,0,.46,0); miez.rotation.y=-.35; miez.scale.setScalar(1.1);
  const MF=0xd8924a, MD=0xa05e24, MH=0xfbeed4, rumpf=gruppe(miez,0,0,0);
  ball(rumpf,.3,MF,0,.27,-.08,1,.9,1.1); ball(rumpf,.22,MF,0,.45,.06,.95,1.35,.9); ball(rumpf,.14,MH,0,.44,.2,.9,1.4,.55);
  [-1,1].forEach(v=>{ ball(rumpf,.17,MF,v*.22,.17,-.04,.8,1,1.15); ball(rumpf,.09,MH,v*.23,.05,.2,.9,.55,1.4); strich(rumpf,[v*.09,.42,.2],[v*.1,.06,.28],.055,MF); ball(rumpf,.075,MH,v*.1,.05,.32,1,.65,1.3); });
  [.18,.34].forEach(y=>ring(rumpf,.27-y*.2,.025,MD,0,y+.12,-.1,Math.PI*2).rotation.x=Math.PI/2);
  const mKopf=gruppe(miez,0,.84,.12);
  ball(mKopf,.22,MF,0,0,0,1.08,.95,.95); ball(mKopf,.1,MH,0,-.07,.17,1.35,.75,.8); ball(mKopf,.028,0xd0606c,0,-.04,.255);
  [-1,1].forEach(v=>{ const ohr=kegel(mKopf,.085,.19,MF,v*.13,.22,0); ohr.rotation.z=-v*.28; const in_=kegel(mKopf,.045,.11,0xe8a0a0,v*.132,.215,.05); in_.rotation.z=-v*.28;
    ball(mKopf,.048,0x78d858,v*.09,.04,.19,1,1.1,.6); ball(mKopf,.022,0x101008,v*.09,.04,.22,.55,1.4,.5);
    [-.02,.035].forEach(h=>strich(mKopf,[v*.06,-.07,.24],[v*.33,-.07+h,.2],.005,0xffffff)); });
  ring(mKopf,.15,.025,BLAU,0,-.17,0).rotation.x=Math.PI/2;
  /* Schwanz liegt auf dem Block und die Spitze wedelt */
  strich(rumpf,[0,.09,-.36],[.34,.07,-.22],.065,MF); strich(rumpf,[.34,.07,-.22],[.41,.065,.08],.06,MF);
  const mSpitze=gruppe(miez,.41,.065,.08); strich(mSpitze,[0,0,0],[-.04,.03,.28],.055,MF); ball(mSpitze,.065,MD,-.04,.035,.29);
  verschmelze(rumpf); verschmelze(mKopf); verschmelze(mSpitze);

  /* ---------- Spielfigur ---------- */
  const u=figur.userData, FS=1.3, VON=-3.9, BIS=2.9;
  figur.position.set(0,0,VON); figur.scale.set(FS,FS,FS); sc.add(figur);

  /* ---------- Vögel, Goldstaub, Sterne ---------- */
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; t.visible=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  const NV=14, voegel=menge(GEO.box,basis(0x3c1e38,{fog:false}),NV);
  const FUNKE=new THREE.OctahedronGeometry(1,0);
  const NG=70, staub=menge(FUNKE,basis(0xffe680),NG), gd=[];
  for(let i=0;i<NG;i++) gd.push({ x:(zufall()*2-1)*(i%3?3:7), y:zufall()*4.6, z:-2+zufall()*4.4, v:.18+zufall()*.35, p:zufall()*6.28 });
  const NS=46, sterne=menge(FUNKE,basis(0xfff6dc,{fog:false}),NS), sd=[];
  for(let i=0;i<NS;i++) sd.push({ x:((i*.618)%1*2-1)*50, y:13+(i*.414)%1*15, g:.12+zufall()*.17, an:2.5+zufall()*5, p:zufall()*6.28 });

  /* ---------- Kamera und Plätze je Bildformat ---------- */
  const NEIG=.14, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=2.75;
  /* e: 0 hochkant, 1 normal; q: 0 normal, 1 breit */
  const plaetze=a=>{ const e=weich((a-.8)/.7), q=weich((a-1.6)/1.4);
    return { e, q, kam:misch(misch(-5.3,-6.5,e),-7.6,q), kz:misch(1.1,-.1,e), katze:misch(misch(3.9,4.6,e),6,q),
      boot:misch(misch(11.2,12.6,e),16.5,q), palme:misch(misch(9.4,10,e),14,q) }; };
  /* kleinster Kameraabstand, bei dem alle wichtigen Punkte im Bild sind */
  const abstand=(P,a,tn)=>{ const punkte=[
      [-4.6,5.9,-3.2],[4.6,5.9,-3.2],[0,-.05,3.9],[0,3.1,3],
      [P.kam-1.4,0,P.kz-.7],[P.kam-1.4,3.4,P.kz-.7],[P.kam+2.2,3.5,P.kz+1.1],[P.kam+1,0,P.kz+1],
      [P.katze+.8,0,2.7],[P.katze+.5,1.7,2.1],[PZIEL+PR,0,PZ],[PZIEL+PR,3.2,PZ],
      [P.boot+3.4,.2,-14],[P.boot+1,4.9,-14]];
    return punkte.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hochB=Math.abs(Y*CN-p[2]*SN);
      return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hochB/(.95*tn)+naeher); },9); };

  const LOS=2, DA=4.8;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), P=plaetze(a), d=abstand(P,a,tn);
    const wippen=Math.sin(t*.22)*.25*weich((t-5)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);
    const c=kamera.position;
    kuppel.position.copy(c);
    /* Sonne sinkt langsam, rechts über der Felswand */
    const sx=c.x+misch(13,23,P.e), sy=c.y+13.5-3*weich(t/14);
    sonne.position.set(sx,sy,c.z-78); sonnenSchein.position.set(sx,sy,c.z-77.5);
    wolken.forEach((w,i)=>{ w.g.position.x=w.x+Math.sin(t*.06+i)*3; });
    pyrLinks.position.x=misch(misch(-25,-32,P.e),-45,P.q); pyrRechts.position.x=misch(misch(25,33,P.e),47,P.q);

    /* Steinplatte rollt zur Seite */
    const roll=weich((t-.4)/1.7), px=PZIEL*roll;
    platte.position.x=px; platte.rotation.z=-px/PR;
    torSchein.scale.set(4.6+Math.sin(t*2.3)*.25,4.6+Math.sin(t*2.3)*.25,1);
    drinnen.intensity=1.25+Math.sin(t*5)*.08;

    /* Figur tritt heraus, läuft nach vorn, winkt und jubelt */
    const lauf=Math.min(1,Math.max(0,(t-LOS)/(DA-LOS))), geht=lauf>0&&lauf<1, s=Math.sin(t*10);
    figur.position.z=misch(VON,BIS,lauf);
    figur.rotation.y=geht?0:Math.sin(t*.9)*.14*weich(t-DA);
    u.beinL.rotation.x=geht?s*.65:0; u.beinR.rotation.x=geht?-s*.65:0;
    const winkt=weich((t-DA)/.4), jubel=weich((Math.sin((t-7)*.9)-.2)/.5)*weich((t-7)/.5);
    u.armR.rotation.x=geht?s*.55:0; u.armL.rotation.x=geht?-s*.55:0;
    u.armR.rotation.z=misch(.18,2.4+Math.sin(t*7.5)*.38,winkt);
    u.armL.rotation.z=misch(-.18,-2.35+Math.sin(t*7.5+1.6)*.35,jubel);
    u.koerper.position.y=geht?Math.abs(Math.cos(t*10))*.07:Math.abs(Math.sin(t*4))*.05*winkt; u.koerper.rotation.z=Math.sin(t*2.2)*.035*winkt;

    /* Kamel Karim nickt freundlich (überschreibt seine ruhige Halsbewegung) */
    karim.g.position.set(P.kam,0,P.kz);
    const nt=t-3.6, nickt=nt<0?0:weich(nt/.5)*weich((Math.sin(nt*.85)+.35)/.5);
    karim.hals.rotation.z=Math.sin(t*.6)*.05-nickt*(.22+Math.sin(t*5)*.16);
    karim.kopf.rotation.z=Math.sin(t*1.1)*.06-nickt*Math.sin(t*5-.7)*.12;

    /* Katze: Schwanzspitze wedelt, Kopf dreht sich zur Figur */
    platz.position.x=P.katze;
    mSpitze.rotation.y=Math.sin(t*2.4)*.4;
    mKopf.rotation.y=-.35*weich((Math.sin(t*.7-1)+.4)/.6); mKopf.rotation.z=Math.sin(t*1.3)*.1;

    /* Boot schaukelt und gleitet, Wasser glitzert */
    palmeR.position.x=P.palme;
    boot.position.set(P.boot+Math.sin(t*.16)*.8,Math.sin(t*1.5)*.05,-14); boot.rotation.z=Math.sin(t*1.1)*.025;
    wd.forEach((w,i)=>{ const g=Math.max(0,Math.sin(t*1.7+w.p)); setze(glitzer,i,w.x+Math.sin(t*.4+w.p)*.5,.04,w.z,w.b*g,.01,.07*g); });
    glitzer.instanceMatrix.needsUpdate=true;

    /* Vögel ziehen über den Himmel */
    voegel.visible=true;
    for(let i=0;i<NV/2;i++){ const x=((t*(1+i*.07)+i*3.4+(i>3?27:8))%70)-35, y=9.4+(i%4)*.9+Math.sin(t*.8+i)*.4, z=-37-(i%3), schlag=Math.sin(t*6+i*1.9)*.45+.15;
      [-1,1].forEach((v,j)=>setze(voegel,i*2+j,x+v*.36*Math.cos(schlag),y+.36*Math.sin(schlag),z,.8,.1,.12,0,0,v*schlag)); }
    voegel.instanceMatrix.needsUpdate=true;

    /* Goldstaub steigt auf, erste Sterne funkeln */
    staub.visible=t>1;
    if(staub.visible){ gd.forEach((f,i)=>{ const y=.15+(f.y+t*f.v)%4.6, g=(.025+.045*Math.pow(Math.max(0,Math.sin(t*3+f.p)),3))*weich(t-1)*weich((4.75-y)/.8);
      setze(staub,i,f.x+Math.sin(t*.7+f.p)*.35,y,f.z,g,g*1.4,g,0,t+f.p,0); }); staub.instanceMatrix.needsUpdate=true; }
    sterne.visible=t>2.5;
    if(sterne.visible){ sd.forEach((f,i)=>{ const g=f.g*weich((t-f.an)/1.5)*(.75+.25*Math.sin(t*2.6+f.p)); setze(sterne,i,c.x+f.x,c.y+f.y,c.z-74,g,g,g); }); sterne.instanceMatrix.needsUpdate=true; }
  };
};

