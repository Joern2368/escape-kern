document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-fisch\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"><path d=\"M-16 0Q-3 -13 9 0Q-3 13 -16 0Z\"/><path d=\"M9 0L17 -8V8Z\"/></g><circle cx=\"-9\" cy=\"-2\" r=\"2.5\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-muschel\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M0 13L-16 -3Q-9 -16 0 -16Q9 -16 16 -3Z\"/><path d=\"M0 13L-8 -14M0 13V-16M0 13L8 -14M-5 13H5V17H-5Z\"/></g></symbol>\n<symbol id=\"sym-seestern\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -16L4.5 -5L16 -5L7 2L11 14L0 7L-11 14L-7 2L-16 -5L-4.5 -5Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"sym-qualle\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-14 0Q-14 -15 0 -15Q14 -15 14 0Z\"/><path d=\"M-8 0Q-12 8 -7 16M0 0V17M8 0Q12 8 7 16\"/></g></symbol>\n<symbol id=\"sym-krake\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M-10 2Q-12 -16 0 -16Q12 -16 10 2Z\"/><path d=\"M-9 2Q-17 9 -13 16M-4 3Q-7 11 -3 17M4 3Q7 11 3 17M9 2Q17 9 13 16\"/></g><circle cx=\"-4\" cy=\"-6\" r=\"2.5\" fill=\"currentColor\"/><circle cx=\"4\" cy=\"-6\" r=\"2.5\" fill=\"currentColor\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const R=(x,y,w,h,f,e)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${e||''}/>`;
const C=(x,y,r,f,e)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${e||''}/>`;
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.3)"/>`;
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l||'#fff6d0'}" stop-opacity=".5"/><stop offset="1" stop-color="${l||'#fff6d0'}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
 <linearGradient id="meer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3fb0e0"/><stop offset="1" stop-color="#0a3a72"/></linearGradient>
 <pattern id="warn" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="20" height="40" fill="#222"/></pattern>
</defs>`;
function boden(){let d='';for(let x=-1600;x<=3200;x+=140)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[495,530,575,630,700])d+=`M0 ${y}H1600`;return`<rect y="470" width="1600" height="310" fill="url(#boden)"/><path d="${d}" stroke="rgba(0,0,0,.2)" stroke-width="2"/><rect y="466" width="1600" height="8" fill="rgba(0,0,0,.3)"/>`;}
function wand(f,s){let d='';for(let x=80;x<1600;x+=160)d+=`M${x} 40V470`;return`<rect width="1600" height="470" fill="${f}"/><path d="${d}M0 180H1600M0 330H1600" stroke="${s}" stroke-width="3"/><path d="M0 188H1600M0 338H1600" stroke="${s}" stroke-width="6" stroke-dasharray="0 32" stroke-linecap="round"/>`;}
const decke=(f,r)=>`<rect width="1600" height="44" fill="${f}"/><path d="M0 56H1600M0 70H1600" stroke="${r}" stroke-width="9"/><path d="M0 63H1600" stroke="rgba(0,0,0,.3)" stroke-width="24" stroke-dasharray="6 194"/>`;
const lampe=(x,f)=>`${C(x,110,130,'url(#licht)')}${R(x-26,76,52,12,f,' rx="4"')}<path d="M${x-22} 88Q${x} 130 ${x+22} 88Z" fill="#fff6c8" stroke="${f}" stroke-width="4"/><path d="M${x} 88V118M${x-12} 92L${x-6} 114M${x+12} 92L${x+6} 114" stroke="${f}" stroke-width="2.5"/>`;
const warnband=(y,h)=>`<rect y="${y}" width="1600" height="${h}" fill="#f2c230"/><rect y="${y}" width="1600" height="${h}" fill="url(#warn)"/>`;
const fisch=(x,y,s,f)=>`<g transform="translate(${x} ${y}) scale(${s} ${Math.abs(s)})"><path d="M-14 0Q0 -11 13 0Q0 11 -14 0ZM11 0L21 -8V8Z" fill="${f}"/>${C(-7,-2,2,'#123')}</g>`;
const stern=(x,y,s,f)=>`<path d="M0 -16L4.5 -5L16 -5L7 2L11 14L0 7L-11 14L-7 2L-16 -5L-4.5 -5Z" fill="${f}" stroke="${f}" stroke-width="5" stroke-linejoin="round" transform="translate(${x} ${y}) scale(${s})"/>`;
const alge=(x,y,h,f)=>`<path d="M${x} ${y}q-12 ${-h/4} 0 ${-h/2}t0 ${-h/2}" stroke="${f}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
const koralle=(x,y,f)=>`<path d="M${x} ${y}V${y-44}M${x} ${y-18}L${x-20} ${y-40}V${y-56}M${x} ${y-28}L${x+18} ${y-50}" stroke="${f}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
const muschel=(x,y,s,f)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0L-16 -16Q0 -34 16 -16Z" fill="${f}" stroke="#a0705a" stroke-width="2"/><path d="M0 0L-8 -26M0 0V-30M0 0L8 -26" stroke="#a0705a" stroke-width="1.5"/></g>`;
const glas=(x,y,f)=>`${R(x-12,y-34,24,34,f,' rx="5" stroke="#7a8a8e" stroke-width="2"')}${R(x-9,y-41,18,8,'#7a8a8e')}`;
const blasen=(x,y)=>[0,1,2].map(k=>`${C(x+(k%2)*8,y-k*22,4+k*2,'none',' stroke="#dff6ff" stroke-width="2" opacity=".8"')}`).join('');
const bullauge=(x,y,r,i)=>`${C(x,y,r+14,'#5a646c',' stroke="#2c3438" stroke-width="4"')}${C(x,y,r,'#1f6aa8')}${i||''}${C(x,y,r+7,'none',` stroke="#c9d2d8" stroke-width="5" stroke-dasharray="0 ${Math.round(r/2)}" stroke-linecap="round"`)}<path d="M${x-r*.6} ${y-r*.4}Q${x-r*.4} ${y-r*.75} ${x} ${y-r*.8}" stroke="#fff" stroke-opacity=".45" stroke-width="6" fill="none" stroke-linecap="round"/>`;
const uboot=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 -44V-64H6" stroke="#555" stroke-width="5" fill="none"/><path d="M-32 -38L-26 -58H18L26 -38Z" fill="#e8a818" stroke="#7a5a10" stroke-width="3"/><ellipse rx="110" ry="44" fill="#f2c230" stroke="#7a5a10" stroke-width="4"/><path d="M-104 12Q0 34 104 12" stroke="#d89a10" stroke-width="6" fill="none"/>${[-50,-10,30].map(k=>`${C(k,-6,13,'#7fd0ff',' stroke="#5a646c" stroke-width="5"')}`).join('')}${R(104,-8,14,16,'#5a646c')}<path d="M124 -26Q134 0 124 26" stroke="#5a646c" stroke-width="9" fill="none" stroke-linecap="round"/>${C(-98,-6,7,'#fff6c8')}</g>`;
const schirm=i=>`${R(-74,-54,148,108,'#2c3438',' rx="10"')}${R(-64,-44,128,88,'#0f4a6a',' rx="4"')}${i}`;
const eimer=(f,oben,bild)=>`${schatten(40,4)}${oben}<path d="M-36 -64L-28 -2H28L36 -64Z" fill="${f}" stroke="rgba(0,0,0,.4)" stroke-width="3"/>${bild||''}<path d="M-36 -64Q0 -98 36 -64" stroke="#555" stroke-width="3" fill="none"/>`;
const anzug=()=>`${R(-34,-86,68,10,'#5a646c',' rx="4"')}<path d="M0 -78V-64M-26 -58Q0 -72 26 -58" stroke="#888" stroke-width="4" fill="none"/><path d="M-24 -60H24L44 -2L32 2L20 -24V28L16 84H4L0 36L-4 84H-16L-20 28V-24L-32 2L-44 -2Z" fill="#1f4f8a" stroke="#0f2a4a" stroke-width="3" stroke-linejoin="round"/><path d="M-21 -6H21M-38 -16L-27 -20M38 -16L27 -20" stroke="#f2c230" stroke-width="6"/><path d="M0 -60V20" stroke="#0f2a4a" stroke-width="2" stroke-dasharray="4 3"/>`;
const flasche=(x,f)=>`${R(x-17,-118,34,116,f,' rx="15" stroke="#7a5a10" stroke-width="3"')}${R(x-17,-84,34,8,'#333')}${R(x-6,-132,12,16,'#666')}<path d="M${x-10} -136H${x+10}" stroke="#888" stroke-width="6" stroke-linecap="round"/>`;
const flaschen=()=>`${schatten(46,4)}${flasche(-19,'#f2c230')}${flasche(19,'#f07a2a')}<path d="M-13 -138Q0 -158 13 -138" stroke="#222" stroke-width="4" fill="none"/>`;
const flosse=(x,r,f)=>`<g transform="translate(${x} 0) rotate(${r})"><path d="M-13 0V-34Q-26 -96 -16 -116H16Q26 -96 13 -34V0Z" fill="${f}" stroke="#0f2a4a" stroke-width="3"/><path d="M-6 -44L-8 -104M6 -44L8 -104" stroke="rgba(0,0,0,.25)" stroke-width="3"/>${R(-13,-30,26,28,'#222',' rx="6"')}</g>`;
const flossen=()=>`${schatten(44,4)}${flosse(-18,-8,'#ffb030')}${flosse(18,8,'#2ab0b0')}`;
const werkzeug=()=>`${schatten(56,4)}<path d="M-20 -52V-66H20V-52" stroke="#444" stroke-width="7" fill="none"/><path d="M28 -50L44 -82" stroke="#999" stroke-width="7" stroke-linecap="round"/>${C(46,-87,8,'none',' stroke="#999" stroke-width="5"')}${R(-52,-52,104,50,'#e04a3a',' rx="5" stroke="#7a1a10" stroke-width="3"')}${R(-52,-40,104,6,'#7a1a10')}${R(-10,-30,20,10,'#c9ccce')}`;
const maske=(x,r,f)=>`<g transform="translate(${x} -72) rotate(${r})">${R(-17,-11,34,22,f,' rx="10" stroke="#0f3a4a" stroke-width="3"')}${R(-12,-7,24,14,'#bfefff',' rx="6"')}</g>`;
const brillen=()=>eimer('#3f7fd0',`${maske(-12,-10,'#2ab0b0')}${maske(14,12,'#ffb030')}<path d="M26 -66V-104Q26 -112 34 -112" stroke="#f2c230" stroke-width="7" fill="none" stroke-linecap="round"/>`);
const aquarium=()=>`${R(-96,-66,192,132,'#2c3438',' rx="6"')}${R(-86,-52,172,110,'#4ac0d8')}${R(-86,-52,172,12,'#8adcea')}<path d="M-86 58V42Q-40 30 0 42T86 38V58Z" fill="#e8d49a"/>${alge(-60,48,64,'#3a9a4a')}${alge(-44,48,44,'#5ab05a')}${koralle(60,50,'#ff7a9a')}${fisch(10,-12,1.6,'#ff7a3a')}${fisch(44,18,-1.1,'#ffd23f')}${blasen(-20,10)}${R(-96,-66,192,12,'#5a646c')}`;
const mikroskop=()=>`${schatten(56,4)}<path d="M-44 0V-72M44 0V-72" stroke="#9aa8ac" stroke-width="7"/>${R(-56,-80,112,10,'#cfd8dc',' rx="3" stroke="#7a8a8e" stroke-width="2"')}${R(-26,-92,50,12,'#2a8a9a',' rx="4"')}<path d="M14 -92Q32 -130 8 -160" stroke="#2a8a9a" stroke-width="12" fill="none" stroke-linecap="round"/>${R(-26,-118,42,7,'#444')}${R(-16,-122,24,4,'#bfefff')}<path d="M-4 -130L-16 -176" stroke="#444" stroke-width="22"/><path d="M-4 -130L-16 -176" stroke="#e8eef0" stroke-width="15"/><path d="M-16 -178L-19 -190" stroke="#444" stroke-width="12"/><path d="M-4 -130V-122" stroke="#444" stroke-width="8"/>${C(20,-128,7,'#444')}`;
const proben=()=>`${schatten(54,4)}${C(-40,-6,7,'#333')}${C(40,-6,7,'#333')}<path d="M-46 -12V-104M46 -12V-104" stroke="#9aa8ac" stroke-width="6"/>${R(-52,-18,104,8,'#cfd8dc')}${R(-52,-62,104,8,'#cfd8dc')}${R(-52,-104,104,8,'#cfd8dc')}${['#ff8a5a','#5ad0a0','#7fb0ff','#ffd23f','#d08aff'].map((f,k)=>`${R(-41+k*17,-142,11,40,f,' rx="5" stroke="#7a8a8e" stroke-width="2"')}`).join('')}${R(-46,-122,92,8,'#2a8a9a')}${glas(-22,-62,'#8adcea')}${glas(20,-62,'#ffb0c0')}`;
const becken=()=>`${schatten(66,4)}<path d="M-50 0V-54M50 0V-54" stroke="#9aa8ac" stroke-width="8"/><path d="M-70 -68V-52Q0 -32 70 -52V-68Z" fill="#cfd8dc" stroke="#7a8a8e" stroke-width="3"/><ellipse cx="0" cy="-68" rx="70" ry="18" fill="#2ab0c8" stroke="#7a8a8e" stroke-width="4"/><g transform="translate(0 -68) scale(1 .55)">${stern(-30,0,.9,'#f07a2a')}${stern(18,-6,.7,'#e04a8a')}${stern(42,10,.6,'#ffd23f')}</g>`;
const drohne=()=>`${schatten(56,4)}<path d="M-46 0V-12M46 0V-12M-54 -4H54" stroke="#333" stroke-width="6"/>${R(-50,-70,100,58,'#f2c230',' rx="8" stroke="#7a5a10" stroke-width="3"')}${R(-50,-70,100,16,'#f07a2a',' rx="6"')}${C(-24,-36,14,'#222')}${C(-24,-36,7,'#5ad0ff')}${C(-27,-39,2.5,'#fff')}${C(12,-34,6,'#fff6c8')}${R(28,-48,14,22,'#555',' rx="3"')}<path d="M-60 -52V-30M60 -52V-30" stroke="#555" stroke-width="10" stroke-linecap="round"/><path d="M0 -70V-86" stroke="#333" stroke-width="3"/>${C(0,-88,4,'#e04a3a')}`;
const ring=()=>`<path d="M0 -76V-60" stroke="#888" stroke-width="6"/>${C(0,-76,6,'#555')}<circle r="50" fill="none" stroke="#fff" stroke-width="22"/><circle r="50" fill="none" stroke="#e04a3a" stroke-width="22" stroke-dasharray="39.27 39.27"/><circle r="63" fill="none" stroke="#e8d49a" stroke-width="4" stroke-dasharray="10 6"/>`;
const riesenmuschel=()=>`${schatten(62,4)}<path d="M-62 -14Q0 10 62 -14Q58 -46 0 -46Q-58 -46 -62 -14Z" fill="#c88aa8" stroke="#7a3a5a" stroke-width="3"/><ellipse cx="0" cy="-34" rx="48" ry="11" fill="#f8d8e8"/>${C(0,-40,12,'#fff',' stroke="#c8c0d0" stroke-width="2"')}${C(-4,-44,3,'#fff')}<path d="M-60 -42Q-50 -112 0 -118Q50 -112 60 -42Q0 -58 -60 -42Z" fill="#e8b0c8" stroke="#7a3a5a" stroke-width="3"/><path d="M0 -112V-56M-30 -102L-16 -54M30 -102L16 -54M-50 -78L-36 -50M50 -78L36 -50" stroke="#a85a7a" stroke-width="2.5"/>`;
const korallen=()=>`${schatten(44,4)}<path d="M-40 0L-32 -40H32L40 0Z" fill="#7a8ea0" stroke="#3a4a5a" stroke-width="3"/>${koralle(-12,-40,'#ff7a9a')}${koralle(14,-40,'#ffb030')}${alge(-24,-40,40,'#3a9a4a')}<path d="M-34 -40V-110Q-34 -142 0 -142Q34 -142 34 -110V-40" fill="#cfefff" fill-opacity=".25" stroke="#9fc8d8" stroke-width="3"/><path d="M-22 -112Q-20 -128 -6 -132" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>`;
const bank=()=>`${schatten(70,4)}<path d="M-56 0V-40M56 0V-40M-60 -62V-50M60 -62V-50" stroke="#3a4a5a" stroke-width="7"/>${R(-70,-50,140,16,'#2ab0b0',' rx="6" stroke="#0f5a5a" stroke-width="3"')}${R(-70,-98,140,36,'#2ab0b0',' rx="8" stroke="#0f5a5a" stroke-width="3"')}<g transform="translate(20 -60)">${R(-17,-12,15,14,'#333',' rx="4"')}${R(2,-12,15,14,'#333',' rx="4"')}${R(-3,-8,6,6,'#666')}</g>`;
const futter=()=>eimer('#f2c230',`<ellipse cx="0" cy="-64" rx="32" ry="8" fill="#b07a3a"/><path d="M8 -66L38 -98" stroke="#e04a3a" stroke-width="6" stroke-linecap="round"/>`,`<use href="#sym-fisch" x="-15" y="-50" width="30" height="30" color="#7a5a10"/>`);
const tafel=()=>`${R(-80,-60,160,120,'#a8683a',' rx="6" stroke="#6a3a1e" stroke-width="4"')}${R(-68,-48,136,96,'#2f4a3a')}<path d="M-56 -30H10M-56 -12H20M-56 6H0M-56 24H16" stroke="#e8f0e8" stroke-width="4" stroke-linecap="round" opacity=".85"/>${fisch(42,-18,1.3,'#ffd23f')}${C(42,22,12,'#e04a3a')}<path d="M42 10Q46 4 50 6" stroke="#3a9a4a" stroke-width="3" fill="none"/>`;
const kuehl=()=>`${schatten(46,4)}${R(-44,-176,88,174,'#f4f6f8',' rx="10" stroke="#9aa8ac" stroke-width="3"')}<path d="M-44 -110H44" stroke="#9aa8ac" stroke-width="3"/><path d="M30 -150V-124M30 -96V-60" stroke="#9aa8ac" stroke-width="6" stroke-linecap="round"/>${C(-20,-150,7,'#e04a3a')}${R(-4,-146,14,10,'#2ab0b0')}${stern(-16,-80,.6,'#f07a2a')}`;
const tisch=()=>`${schatten(70,4)}<path d="M-56 0V-60M56 0V-60" stroke="#6a3a1e" stroke-width="8"/><ellipse cx="0" cy="-64" rx="74" ry="16" fill="#c88a4a" stroke="#6a3a1e" stroke-width="3"/>${R(-48,-80,96,14,'#2ab0b0',' rx="4" stroke="#0f5a5a" stroke-width="2"')}<ellipse cx="-14" cy="-80" rx="20" ry="6" fill="#fff" stroke="#bbb"/><path d="M-26 -82Q-14 -96 -2 -82Z" fill="#f2c230"/>${R(16,-98,16,20,'#e04a3a',' rx="3"')}<path d="M32 -92Q40 -88 32 -84" stroke="#e04a3a" stroke-width="3" fill="none"/>${C(-38,-86,7,'#7ac04a')}`;
const sitzsack=()=>`${schatten(60,4)}<path d="M-58 -4Q-66 -60 -20 -76Q20 -86 50 -60Q66 -30 58 -4Z" fill="#e07a4a" stroke="#8a3a1a" stroke-width="3"/><path d="M-30 -40Q0 -30 30 -44" stroke="#8a3a1a" stroke-width="2" fill="none"/>${R(-8,-92,44,34,'#ffd0e0',' rx="12" stroke="#c87a9a" stroke-width="3" transform="rotate(14 14 -75)"')}`;
const spielkiste=()=>`${schatten(56,4)}${R(-40,-82,60,10,'#3f7fd0')}${R(-36,-92,52,10,'#e04a3a')}${C(30,-70,14,'#f2c230',' stroke="#a07a10" stroke-width="2"')}${R(-52,-62,104,60,'#c88a4a',' stroke="#6a3a1e" stroke-width="3"')}<path d="M-52 -42H52M-52 -22H52" stroke="#6a3a1e" stroke-width="2"/>${R(56,-18,18,18,'#fff',' rx="3" stroke="#888"')}${C(65,-9,2.5,'#222')}`;
const sonar=()=>`${R(-72,-64,144,128,'#3a4652',' rx="12" stroke="#1a222a" stroke-width="4"')}<circle cy="-4" r="48" fill="#0a2a1a" stroke="#3ae07a" stroke-width="3"/><circle cy="-4" r="32" fill="none" stroke="#3ae07a" stroke-width="1.5" opacity=".6"/><circle cy="-4" r="16" fill="none" stroke="#3ae07a" stroke-width="1.5" opacity=".6"/><path d="M0 -4L34 -38A48 48 0 0 1 48 -4Z" fill="#3ae07a" opacity=".35"/>${C(22,-24,4,'#bfffd0')}${C(-20,14,3,'#bfffd0')}${C(-54,52,5,'#e04a3a')}${C(-38,52,5,'#f2c230')}`;
const pult=()=>`${schatten(60,4)}<path d="M24 -84L36 -128" stroke="#222" stroke-width="7" stroke-linecap="round"/>${C(37,-132,11,'#e04a3a',' stroke="#7a1a10" stroke-width="2"')}<path d="M-56 -2V-70L-40 -96H40L56 -70V-2Z" fill="#5a6670" stroke="#2c3438" stroke-width="3"/><path d="M-50 -74L-36 -92H36L50 -74Z" fill="#3a4652"/>${R(-30,-90,34,13,'#3ae07a',' rx="2"')}${[[-38,'#e04a3a'],[-22,'#f2c230'],[-6,'#2ab0b0']].map(([x,f])=>`${C(x,-58,6,f)}`).join('')}${R(20,-90,12,8,'#222')}${R(-40,-40,80,6,'#2c3438')}`;
const anker=()=>`${schatten(56,4)}<path d="M8 -150Q44 -150 62 -4" stroke="#8a969e" stroke-width="5" stroke-dasharray="8 4" fill="none"/><path d="M0 -136V-14M-24 -112H24" stroke="#4a5660" stroke-width="12" stroke-linecap="round"/>${C(0,-148,12,'none',' stroke="#4a5660" stroke-width="8"')}<path d="M-50 -46Q-44 -6 0 -6Q44 -6 50 -46" stroke="#4a5660" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M-62 -38L-50 -60L-38 -40ZM62 -38L50 -60L38 -40Z" fill="#4a5660"/>`;
const scheinwerfer=()=>`${schatten(46,4)}<path d="M0 -76L-36 0M0 -76L36 0M0 -76V0" stroke="#333" stroke-width="5"/>${C(-40,-100,70,'url(#licht)')}<g transform="rotate(-18 0 -96)">${R(-30,-120,54,46,'#e04a3a',' rx="8" stroke="#7a1a10" stroke-width="3"')}<ellipse cx="-30" cy="-97" rx="8" ry="23" fill="#fff6c8" stroke="#7a1a10" stroke-width="3"/></g>`;
const boje=()=>`${schatten(44,4)}<path d="M0 -76V-110" stroke="#333" stroke-width="5"/>${R(-12,-122,24,12,'#333')}${C(0,-130,22,'#ffd23f',' opacity=".3"')}${C(0,-130,9,'#ffd23f')}<path d="M-40 -2Q-44 -70 0 -76Q44 -70 40 -2Z" fill="#e04a3a" stroke="#7a1a10" stroke-width="3"/><path d="M-41 -34Q0 -22 41 -34V-48Q0 -36 -41 -48Z" fill="#fff"/>`;
const infoschirm=()=>schirm(`${fisch(-30,-10,2,'#ffd23f')}<path d="M20 -24H50M20 -10H50M20 4H42M-50 24H50M-50 34H30" stroke="#7fe0ff" stroke-width="4" stroke-linecap="round"/>`);
const vitrine=()=>`${schatten(46,4)}<path d="M-36 0V-50M36 0V-50" stroke="#5a646c" stroke-width="7"/>${R(-46,-58,92,10,'#5a646c')}${R(-42,-124,84,66,'#cfefff',' fill-opacity=".45" stroke="#9fc8d8" stroke-width="3"')}${muschel(-20,-60,1,'#f4c8b0')}${muschel(16,-60,.8,'#ffe0a0')}${stern(4,-100,.7,'#f07a2a')}<path d="M-34 -118L-22 -70" stroke="#fff" stroke-opacity=".6" stroke-width="4"/>${R(-46,-130,92,8,'#5a646c')}`;
const helm=()=>`${schatten(38,4)}<path d="M-30 0H30M0 0V-90" stroke="#5a3418" stroke-width="8" stroke-linecap="round"/><path d="M-40 -88L-34 -104H34L40 -88Z" fill="#a8742a" stroke="#5a3a10" stroke-width="2"/>${C(0,-136,36,'#d8a040',' stroke="#7a5214" stroke-width="3"')}${C(0,-134,16,'#7fd0ff',' stroke="#7a5214" stroke-width="5"')}${C(-28,-136,7,'#7fd0ff',' stroke="#7a5214" stroke-width="3"')}${C(28,-136,7,'#7fd0ff',' stroke="#7a5214" stroke-width="3"')}<path d="M-12 -144Q-6 -150 2 -148" stroke="#fff" stroke-width="3" fill="none"/>`;
const poster=()=>`${R(-60,-76,120,152,'#fff',' stroke="#2a8a9a" stroke-width="4"')}${fisch(-20,-46,1.4,'#ff7a3a')}${stern(28,-14,.8,'#f07a2a')}<use href="#sym-qualle" x="-46" y="8" width="40" height="40" color="#d08aff"/><path d="M8 30H44M8 44H38M-44 62H44" stroke="#7a8a8e" stroke-width="4"/>`;
const rechner=()=>`${schatten(60,4)}<path d="M-50 0V-56M50 0V-56M-6 -72V-62" stroke="#9aa8ac" stroke-width="7"/>${R(-60,-64,120,10,'#cfd8dc')}${R(-36,-124,72,52,'#2c3438',' rx="4"')}${R(-30,-118,60,40,'#0f4a6a')}${fisch(-4,-98,1.2,'#ffd23f')}${R(-40,-72,52,7,'#444',' rx="2"')}`;
const kuehlbox=()=>`${schatten(46,4)}<path d="M-20 -66V-80H20V-66" stroke="#333" stroke-width="5" fill="none"/>${R(-44,-58,88,56,'#fff',' rx="6" stroke="#3f7fd0" stroke-width="4"')}${R(-48,-68,96,14,'#3f7fd0',' rx="5"')}<path d="M0 -44V-12M-14 -36L14 -20M14 -36L-14 -20" stroke="#7fb0ff" stroke-width="4"/>`;
const karte=()=>`${R(-80,-56,160,112,'#e8d49a',' rx="4" stroke="#8a6a3a" stroke-width="4"')}<path d="M-70 -46H70V10Q30 -10 0 14T-70 4Z" fill="#5ab0d8"/><path d="M-60 36Q-20 14 20 38T64 26" stroke="#8a6a3a" stroke-width="3" fill="none" stroke-dasharray="6 4"/>${fisch(-30,-22,1.2,'#ffb030')}${C(36,-18,7,'#e04a3a')}`;
const saeule=()=>`${schatten(36,4)}${R(-30,-12,60,12,'#3a4a5a')}${R(-14,-120,28,110,'#5a6e80',' stroke="#2c3c4a" stroke-width="3"')}${R(-40,-178,80,62,'#2c3c4a',' rx="8"')}${R(-32,-170,64,46,'#0f4a6a',' rx="3"')}<use href="#sym-krake" x="-18" y="-165" width="36" height="36" color="#ff8a6a"/>`;
const fundkiste=()=>`${schatten(54,4)}<path d="M-46 -60L-52 -96H52L46 -60Z" fill="#8a5a30" stroke="#5a3418" stroke-width="3"/>${muschel(-18,-56,.9,'#f4c8b0')}${stern(20,-64,.6,'#ffd23f')}${R(-50,-60,100,58,'#a8683a',' rx="4" stroke="#5a3418" stroke-width="3"')}<path d="M-50 -40H50" stroke="#5a3418" stroke-width="3"/>${R(-8,-46,16,12,'#e0b020')}`;
const buecher=()=>[-10,60].map(y=>`${R(-84,y,168,9,'#6a3a1e')}`+['#e04a3a','#3f7fd0','#f2c230','#2ab0b0','#7ac04a','#d08aff'].map((f,k)=>`${R(-78+k*19,y-44+k%2*6,16,44-k%2*6,f)}`).join('')).join('')+muschel(62,60,.8,'#f4c8b0')+fisch(60,-24,1,'#ffb030');
const globus=()=>`${schatten(36,4)}<path d="M-26 -2H26M0 -2V-30" stroke="#6a3a1e" stroke-width="7" stroke-linecap="round"/><circle cy="-80" r="44" fill="#3f8fd0"/><path d="M-30 -100Q-10 -112 4 -96Q0 -80 -22 -78ZM10 -66Q30 -76 34 -58Q22 -44 8 -50Z" fill="#7ac04a"/><path d="M0 -28A52 52 0 0 1 0 -132" stroke="#c88a4a" stroke-width="5" fill="none"/>`;
const korb=()=>`${schatten(46,4)}${R(-32,-84,40,52,'#fff',' stroke="#999" stroke-width="2" transform="rotate(-10)"')}${R(-4,-86,40,54,'#ffd0e0',' stroke="#c87a9a" stroke-width="2" transform="rotate(8)"')}${fisch(22,-64,1,'#3f7fd0')}<path d="M-44 -50L-36 -2H36L44 -50Z" fill="#d8a860" stroke="#8a5a20" stroke-width="3"/><path d="M-41 -34H41M-38 -18H38" stroke="#8a5a20" stroke-width="2"/>`;
const klemmbrett=()=>`${R(-50,-66,100,132,'#a8742a',' rx="6" stroke="#5a3a10" stroke-width="3"')}${R(-40,-52,80,108,'#fff')}${R(-20,-72,40,18,'#9aa8ac',' rx="4" stroke="#555" stroke-width="2"')}${[-34,-10,14,38].map(y=>`${R(-32,y-6,12,12,'none',' stroke="#333" stroke-width="2"')}<path d="M-12 ${y}H30" stroke="#7a8a8e" stroke-width="4"/>`).join('')}<path d="M-31 -35L-26 -30L-18 -42M-31 -11L-26 -6L-18 -18" stroke="#3ab04a" stroke-width="3" fill="none"/>`;
const regal=()=>`${schatten(50,4)}<path d="M-48 0V-150M48 0V-150" stroke="#5a6670" stroke-width="6"/>${[-10,-60,-110].map(y=>`${R(-52,y,104,7,'#9aa8ac')}`).join('')}${C(-22,-30,16,'none',' stroke="#333" stroke-width="8"')}${R(6,-48,36,38,'#f2c230',' stroke="#7a5a10" stroke-width="2"')}${R(-34,-94,40,34,'#c88a4a',' stroke="#6a3a1e" stroke-width="2"')}${C(26,-76,14,'#fff6c8',' stroke="#555" stroke-width="4"')}<path d="M-16 -130L-34 -146L-30 -124ZM-16 -130L4 -142L2 -120Z" fill="#e0b020"/>${C(-16,-130,5,'#555')}`;
const plaene=()=>`${schatten(50,4)}${[[-24,-14,'#7fb0ff'],[0,4,'#fff'],[24,16,'#bfe8ff']].map(([x,r,f])=>`${R(x-8,-104,16,60,f,` rx="8" stroke="#2a5a9a" stroke-width="2" transform="rotate(${r} ${x} -50)"`)}`).join('')}${R(-48,-58,96,56,'#c88a4a',' stroke="#6a3a1e" stroke-width="3"')}<path d="M-48 -58L48 -2M48 -58L-48 -2" stroke="#6a3a1e" stroke-width="3"/>`;
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500;
let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`${C(x0+k*22,356,8,'#0c1820',' stroke="#ffd23f" stroke-width="2"')}`;
const luke='M412 310A88 128 0 1 0 588 310A88 128 0 1 0 412 310Z';
return`<defs><clipPath id="tuerclip"><path d="${luke}"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#7a8a96"/><stop offset=".5" stop-color="#b4c2cc"/><stop offset="1" stop-color="#6a7884"/></linearGradient></defs>
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Luke mit Zahlenschloss">
   ${R(396,442,208,28,'#4a5660',' rx="6"')}
   <ellipse cx="500" cy="310" rx="120" ry="158" fill="#5a6670" stroke="#2c3438" stroke-width="6"/>
   <ellipse cx="500" cy="310" rx="104" ry="142" fill="none" stroke="#c9d2d8" stroke-width="7" stroke-dasharray="0 28" stroke-linecap="round"/>
   <path d="${luke}" fill="#0c1820"/>
   <g clip-path="url(#tuerclip)"><g id="platte"><path d="${luke}" fill="url(#platteG)"/><ellipse cx="500" cy="310" rx="74" ry="112" fill="none" stroke="#5a6670" stroke-width="4"/><path d="M462 262H538M500 224V300M473 235L527 289M527 235L473 289" stroke="#e04a3a" stroke-width="5"/>${C(500,262,38,'none',' stroke="#e04a3a" stroke-width="8"')}${C(500,262,10,'#8a2a20')}${R(500-n*11-12,338,n*22+24,36,'#0c1820',' rx="6" stroke="#ffd23f" stroke-width="2"')}${d}</g></g>
   ${C(500,136,10,bereit?'#4ae07a':'#ffb030',' stroke="#2c3438" stroke-width="3"')}
  </g></g>`;
}
SZENARIEN.unterwasser={
name:"Die Unterwasserstation",
symbole:["fisch","muschel","seestern","qualle","krake"],
symbolNamen:["Fisch","Muschel","Seestern","Qualle","Krake"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect width="120" height="90" rx="14" fill="#1f6aa0"/><path d="M0 18q15 -8 30 0t30 0t30 0t30 0" stroke="#bfe8ff" stroke-width="3" fill="none"/>${uboot(56,58,.38)}${C(66,26,3,'none',' stroke="#bfe8ff" stroke-width="2"')}${C(72,16,4,'none',' stroke="#bfe8ff" stroke-width="2"')}</svg>`,
texte:{
einleitung:"Ihr besucht eine Forschungsstation tief unten auf dem Meeresgrund. Plötzlich zieht oben über dem Meer ein Sturm auf. Die Station schaltet auf Notbetrieb – alle Luken sind verriegelt! Keine Sorge, ihr seid hier unten sicher. Ein Mini-U-Boot bringt euch nach oben, aber der Weg dorthin führt durch fünf Räume. Jede Luke hat ein Zahlenschloss. Untersucht die Gegenstände: Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zum U-Boot?",
startKnopf:"In die Station tauchen",
hinweisGeber:"Der Delfin Dori pfeift durch den Lautsprecher:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Dori pfeift leise … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Luke",
schlossSymbol:"Über jedem Rad leuchtet ein Meerestier. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss piept – aber die Luke bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Stationsuhr piept!",
zeitUm:"Eure Zeit ist abgelaufen. Aber keine Sorge – ihr dürft weiterspielen und das U-Boot trotzdem noch erreichen!",
geschafft:"Ihr seid aufgetaucht!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und seid mit dem Mini-U-Boot sicher an die Wasseroberfläche aufgetaucht. Dori und Kiki winken euch zum Abschied!"
},
texteDu:{
einleitung:"Du besuchst eine Forschungsstation tief unten auf dem Meeresgrund. Plötzlich zieht oben über dem Meer ein Sturm auf. Die Station schaltet auf Notbetrieb – alle Luken sind verriegelt! Keine Sorge, du bist hier unten sicher. Ein Mini-U-Boot bringt dich nach oben, aber der Weg dorthin führt durch fünf Räume. Jede Luke hat ein Zahlenschloss. Untersuche die Gegenstände: Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zum U-Boot?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Dori pfeift leise … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad leuchtet ein Meerestier. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss piept – aber die Luke bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber keine Sorge – du darfst weiterspielen und das U-Boot trotzdem noch erreichen!",
geschafft:"Du bist aufgetaucht!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und bist mit dem Mini-U-Boot sicher an die Wasseroberfläche aufgetaucht. Dori und Kiki winken dir zum Abschied!"
},
einfach:{
name:"Die Station unter dem Meer",
symbolNamen:["Fisch","Muschel","Seestern","Qualle","Krake"],
texte:{
einleitung:"Ihr seid in einem Haus tief unten im Meer. Dort arbeiten Forscher. Oben auf dem Meer ist ein Sturm. Darum gehen alle Türen zu. Keine Angst, ihr seid hier sicher! Ein kleines U-Boot bringt euch nach oben. An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg zum U-Boot?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
geschafft:"Ihr seid oben!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das U-Boot bringt euch nach oben!"
},
texteDu:{
einleitung:"Du bist in einem Haus tief unten im Meer. Dort arbeiten Forscher. Oben auf dem Meer ist ein Sturm. Darum gehen alle Türen zu. Keine Angst, du bist hier sicher! Ein kleines U-Boot bringt dich nach oben. An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg zum U-Boot?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist oben!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das U-Boot bringt dich nach oben!"
},
raeume:[
{titel:"Der Raum zum Tauchen",intro:"Hier ziehen die Forscher ihre Anzüge an. Dann tauchen sie ins Meer. Im Boden ist ein Becken mit Wasser. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[{name:"Anzug zum Tauchen",fund:"In der Tasche vom Anzug steckt:"},{name:"Flaschen mit Luft",fund:"Zwischen den Flaschen steckt:"},{name:"Flossen",fund:"In einer Flosse steckt:"},{name:"Kiste mit Werkzeug",fund:"In der Kiste liegt:"},{name:"Eimer mit Brillen",fund:"Unter den Brillen liegt:"}],
infoObjekte:[{name:"Bildschirm",fund:"Auf dem Bildschirm steht:"},{name:"Schrank mit Muscheln",fund:"Bei den Muscheln liegt:"},{name:"Alter Helm zum Tauchen",fund:"Im Helm liegt:"}]},
{titel:"Der Raum zum Forschen",intro:"Hier schauen sich die Forscher Tiere aus dem Meer an. Im Aquarium schwimmen bunte Fische. Sucht die Zahlen für das nächste Schloss!",introDu:"Hier schauen sich die Forscher Tiere aus dem Meer an. Im Aquarium schwimmen bunte Fische. Such die Zahlen für das nächste Schloss!",
objekte:[{name:"Aquarium",fund:"Hinter dem Aquarium klebt:"},{name:"Mikroskop",fund:"Unter dem Mikroskop ist:"},{name:"Wagen mit Gläsern",fund:"Auf einem Glas klebt:"},{name:"Becken mit Seesternen",fund:"Ein Seestern hält etwas fest:"},{name:"Kamera zum Tauchen",fund:"Die Kamera zeigt ein Bild:"}],
infoObjekte:[{name:"Poster mit Tieren aus dem Meer",fund:"Hinter dem Poster steckt:"},{name:"Computer",fund:"Der Computer zeigt:"},{name:"Kühlbox",fund:"In der Kühlbox liegt:"}]},
{titel:"Der Tunnel aus Glas",intro:"Die Wände sind aus Glas. Draußen schwimmen Fische. Von oben kommt blaues Licht. Die Krake Kiki winkt euch zu.",introDu:"Die Wände sind aus Glas. Draußen schwimmen Fische. Von oben kommt blaues Licht. Die Krake Kiki winkt dir zu.",
objekte:[{name:"Rettungsring",fund:"Am Ring hängt:"},{name:"Große Muschel",fund:"Die Muschel geht auf. Darin liegt:"},{name:"Koralle",fund:"Unter der Koralle liegt:"},{name:"Bank",fund:"Auf der Bank liegt:"},{name:"Eimer mit Fischfutter",fund:"Im Futter steckt:"}],
infoObjekte:[{name:"Karte vom Meer",fund:"An der Karte hängt:"},{name:"Kiste mit Sachen aus dem Meer",fund:"In der Kiste liegt:"},{name:"Säule mit Bildschirm",fund:"Auf der Säule steht:"}]},
{titel:"Der Raum zum Wohnen",intro:"Hier essen und schlafen die Forscher. Durch das runde Fenster seht ihr einen Wal.",introDu:"Hier essen und schlafen die Forscher. Durch das runde Fenster siehst du einen Wal.",
objekte:[{name:"Tafel mit dem Essen",fund:"Unten auf der Tafel steht:"},{name:"Kühlschrank",fund:"Im Kühlschrank liegt:"},{name:"Tisch mit Essen",fund:"Unter dem Teller liegt:"},{name:"Sitzsack",fund:"Im Kissen steckt:"},{name:"Kiste mit Spielen",fund:"Bei den Spielen liegt:"}],
infoObjekte:[{name:"Regal mit Büchern",fund:"Bei den Büchern liegt:"},{name:"Erdkugel",fund:"An der Erdkugel klebt:"},{name:"Korb mit Heften",fund:"In einem Heft liegt:"}]},
{titel:"Die Garage für das U-Boot",intro:"Da ist das kleine gelbe U-Boot! Es bringt euch nach oben. Öffnet das letzte Schloss!",introDu:"Da ist das kleine gelbe U-Boot! Es bringt dich nach oben. Öffne das letzte Schloss!",
objekte:[{name:"Grüner Bildschirm",fund:"Auf dem Bildschirm blinkt:"},{name:"Pult mit Hebel",fund:"Der Hebel macht klick. Dann leuchtet:"},{name:"Anker",fund:"An der Kette hängt:"},{name:"Große Lampe",fund:"Die Lampe geht an. Im Licht steht:"},{name:"Boje",fund:"In der Boje klappert etwas:"}],
infoObjekte:[{name:"Liste für den Start",fund:"Auf der Liste steht:"},{name:"Regal mit Teilen",fund:"Im Regal liegt:"},{name:"Kiste mit Plänen",fund:"Bei den Plänen liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Taucherschleuse",
intro:"Ihr steht in der Taucherschleuse. Hier ziehen die Forscherinnen und Forscher ihre Taucheranzüge an. Im Boden glitzert ein Wasserbecken – von dort geht es direkt hinaus ins Meer. Irgendwo hier sind die Ziffern für die erste Luke versteckt …",
introDu:"Du stehst in der Taucherschleuse. Hier ziehen die Forscherinnen und Forscher ihre Taucheranzüge an. Im Boden glitzert ein Wasserbecken – von dort geht es direkt hinaus ins Meer. Irgendwo hier sind die Ziffern für die erste Luke versteckt …",
tuerX:800,
hintergrund:()=>`${defs('#7a8288','#2c3236','#fff2c0')}${wand('#8c959c','#6a737a')}${warnband(436,30)}${[1000,1062,1124,1186].map(x=>`${R(x,200,58,236,'#e0b020',' stroke="#8a6a10" stroke-width="3"')}<path d="M${x+12} 220H${x+46}M${x+12} 230H${x+46}M${x+12} 240H${x+46}" stroke="#8a6a10" stroke-width="3"/>${R(x+44,310,6,26,'#5a4a10',' rx="3"')}`).join('')}${bullauge(1420,220,66,fisch(1400,205,1.3,'#ffb030')+fisch(1445,245,-1,'#7fd0ff'))}${decke('#3a4248','#e0b020')}${lampe(400,'#3a4248')}${lampe(1200,'#3a4248')}${boden()}<ellipse cx="1250" cy="612" rx="176" ry="54" fill="#5a646c"/><ellipse cx="1250" cy="612" rx="160" ry="44" fill="#1f7ab0"/><path d="M1150 600q20 -8 40 0t40 0M1250 625q20 -8 40 0t40 0M1190 642q16 -6 32 0" stroke="#bfe8ff" stroke-width="3" fill="none"/><path d="M1360 556V600M1384 558V604M1360 570H1384M1360 586H1384" stroke="#c9ccce" stroke-width="5"/>`,
objekte:[
{name:"Tauchanzug am Haken",x:480,y:250,wand:true,by:-105,zeichne:anzug,fund:"In der Brusttasche des Anzugs steckt:"},
{name:"Taucherflaschen",x:380,boden:600,fuss:4,by:-165,zeichne:flaschen,fund:"Zwischen den Flaschen klemmt:"},
{name:"Schwimmflossen",x:560,boden:720,fuss:4,by:-140,zeichne:flossen,fund:"In einer Flosse steckt:"},
{name:"Werkzeugkiste",x:1000,boden:720,fuss:4,by:-110,zeichne:werkzeug,fund:"Unter dem Schraubenschlüssel liegt:"},
{name:"Eimer mit Taucherbrillen",x:1480,boden:700,fuss:4,by:-130,zeichne:brillen,fund:"Unter den Taucherbrillen liegt:"}
],
infoObjekte:[{name:"Infobildschirm",x:160,y:230,wand:true,by:-75,zeichne:infoschirm,fund:"Auf dem Bildschirm blinkt:"},{name:"Muschelvitrine",x:1500,boden:540,fuss:4,by:-150,zeichne:vitrine,fund:"Zwischen den Muscheln liegt:"},{name:"Tauchhelm-Ständer",x:180,boden:700,fuss:4,by:-195,zeichne:helm,fund:"Im alten Tauchhelm steckt:"}]},
{titel:"Das Forschungslabor",
intro:"Im Labor untersucht das Forschungsteam Tiere und Pflanzen aus dem Meer. Im Aquarium schwimmen bunte Fische, und unter dem Mikroskop liegt eine Wasserprobe. Findet die Ziffern für die nächste Luke!",
introDu:"Im Labor untersucht das Forschungsteam Tiere und Pflanzen aus dem Meer. Im Aquarium schwimmen bunte Fische, und unter dem Mikroskop liegt eine Wasserprobe. Finde die Ziffern für die nächste Luke!",
tuerX:1350,
hintergrund:()=>`${defs('#c8d4d8','#6a7a80','#e0ffff')}${wand('#eef5f5','#c6d8da')}<rect y="390" width="1600" height="80" fill="#2ab0b0"/><rect y="390" width="1600" height="6" fill="#1a8a8a"/><path d="M300 165H490M300 275H490" stroke="#9aa8ac" stroke-width="10"/>${[160,270].map((y,r)=>[325,370,415,460].map((x,k)=>glas(x,y,['#ff8a5a','#8adcea','#ffd23f','#b0e8a0'][(k+r)%4])).join('')).join('')}${bullauge(940,210,80,fisch(912,192,1.5,'#ffd23f')+fisch(968,236,-1.2,'#ff7a9a')+blasen(990,200))}${C(1130,160,28,'#fff',' stroke="#2a8a9a" stroke-width="6"')}<path d="M1130 160V142M1130 160L1144 166" stroke="#333" stroke-width="4" stroke-linecap="round"/>${decke('#2a7a80','#c9d6d8')}${lampe(780,'#2a7a80')}${lampe(1150,'#2a7a80')}${boden()}`,
objekte:[
{name:"Wandaquarium",x:640,y:240,wand:true,by:-85,zeichne:aquarium,fund:"Hinter dem Aquarium klebt:"},
{name:"Mikroskop",x:280,boden:600,fuss:4,by:-215,zeichne:mikroskop,fund:"Unter dem Mikroskop erscheint:"},
{name:"Wagen mit Probengläsern",x:530,boden:720,fuss:4,by:-165,zeichne:proben,fund:"Auf einem Probenglas klebt:"},
{name:"Seestern-Becken",x:780,boden:600,fuss:4,by:-110,zeichne:becken,fund:"Ein Seestern hält etwas fest:"},
{name:"Kamera-Drohne",x:1020,boden:710,fuss:4,by:-115,zeichne:drohne,fund:"Die Kamera zeigt ein Bild:"}
],
infoObjekte:[{name:"Meerestier-Poster",x:160,y:230,wand:true,by:-90,zeichne:poster,fund:"Unter dem Poster steckt:"},{name:"Forschungscomputer",x:1130,boden:545,fuss:4,by:-140,zeichne:rechner,fund:"Auf dem Forschungscomputer leuchtet:"},{name:"Kühlbox für Proben",x:100,boden:730,fuss:4,by:-95,zeichne:kuehlbox,fund:"In der Kühlbox liegt:"}]},
{titel:"Der Glastunnel",
intro:"Wow! Die Wände des Tunnels sind aus dickem Glas. Draußen schwimmen Fische zwischen den Korallen, und von oben fällt blaues Licht herein. Die Krake Kiki winkt euch durch die Scheibe zu.",
introDu:"Wow! Die Wände des Tunnels sind aus dickem Glas. Draußen schwimmen Fische zwischen den Korallen, und von oben fällt blaues Licht herein. Die Krake Kiki winkt dir durch die Scheibe zu.",
tuerX:220,
hintergrund:()=>`${defs('#5a8ab0','#16304a','#bfefff')}<rect width="1600" height="470" fill="url(#meer)"/><path d="M400 40H470L640 470H420ZM800 40H870L980 470H760ZM1330 40H1400L1540 470H1330Z" fill="#fff" opacity=".1"/><path d="M380 470Q600 420 800 450T1600 440V470Z" fill="#d8c48a"/>${koralle(450,462,'#ff7a9a')}${koralle(520,466,'#ffb030')}${koralle(820,458,'#d08aff')}${koralle(1010,455,'#ff7a9a')}${koralle(1370,458,'#ffb030')}${koralle(1520,456,'#ff7a9a')}${alge(480,466,90,'#3a9a4a')}${alge(780,458,120,'#3a9a4a')}${alge(1060,452,100,'#5ab05a')}${alge(1440,456,110,'#3a9a4a')}${stern(1090,448,.8,'#f07a2a')}${fisch(480,160,1.4,'#ffb030')}${fisch(880,120,-1.6,'#ff7a9a')}${fisch(950,180,-1,'#ffd23f')}${fisch(1030,140,-1.2,'#7fe0ff')}${fisch(1420,210,1.8,'#ffb030')}${fisch(1500,310,-1.2,'#a0f0a0')}<use href="#sym-qualle" x="1430" y="70" width="60" height="60" color="#ffc0e0"/><use href="#sym-krake" x="900" y="270" width="90" height="90" color="#ff8a6a"/>${blasen(1000,330)}<path d="M0 40H400V470H0ZM560 40H740V470H560ZM1120 40H1300V470H1120Z" fill="#5a6e80"/><path d="M400 40V470M560 40V470M740 40V470M1120 40V470M1300 40V470" stroke="#2c3c4a" stroke-width="12"/><path d="M0 120H400M560 120H740M1120 120H1300M0 400H400M560 400H740M1120 400H1300" stroke="#c9d2d8" stroke-width="6" stroke-dasharray="0 30" stroke-linecap="round"/><path d="M430 80H468L420 300ZM780 70H818L768 260ZM1340 80H1378L1330 280Z" fill="#fff" opacity=".15"/><rect width="1600" height="44" fill="#2c3c4a"/>${boden()}<path d="M200 560q40 -14 80 0M600 520q50 -16 100 0M1000 600q60 -18 120 0M1300 540q40 -14 80 0M500 760q60 -18 120 0" stroke="#bfefff" stroke-width="4" fill="none" opacity=".25"/>`,
objekte:[
{name:"Rettungsring",x:650,y:230,wand:true,by:-105,zeichne:ring,fund:"Am Rettungsring hängt:"},
{name:"Riesenmuschel",x:520,boden:700,fuss:4,by:-140,zeichne:riesenmuschel,fund:"Die Muschel öffnet sich. Neben der Perle liegt:"},
{name:"Korallen unter der Glashaube",x:900,boden:600,fuss:4,by:-165,zeichne:korallen,fund:"Unter der Glashaube liegt:"},
{name:"Sitzbank mit Fernglas",x:1080,boden:710,fuss:4,by:-125,zeichne:bank,fund:"Neben dem Fernglas liegt:"},
{name:"Eimer mit Fischfutter",x:1420,boden:590,fuss:4,by:-125,zeichne:futter,fund:"Im Fischfutter steckt:"}
],
infoObjekte:[{name:"Karte vom Meeresgrund",x:1210,y:230,wand:true,by:-70,zeichne:karte,fund:"Neben der Karte hängt:"},{name:"Kiste mit Fundstücken",x:1270,boden:730,fuss:4,by:-110,zeichne:fundkiste,fund:"Zwischen den Fundstücken liegt:"},{name:"Infosäule",x:700,boden:560,fuss:4,by:-195,zeichne:saeule,fund:"Auf der Infosäule erscheint:"}]},
{titel:"Der Wohnbereich",
intro:"Hier essen, spielen und schlafen die Forscherinnen und Forscher. Es riecht nach Kakao, und in den Kojen liegen weiche Decken. Durch das runde Fenster schwimmt ganz langsam ein Wal vorbei.",
tuerX:500,
hintergrund:()=>`${defs('#b07a4a','#4a2a14','#ffd890')}${wand('#f0c890','#d8a870')}<rect y="320" width="1600" height="150" fill="#a8683a"/><path d="M0 395H1600" stroke="#7a4420" stroke-width="150" stroke-dasharray="3 57" opacity=".5"/><path d="M0 320H1600" stroke="#7a4420" stroke-width="6"/>${bullauge(1000,200,92,'<path d="M932 200Q960 160 1020 170Q1056 176 1066 198L1084 186L1080 214L1066 206Q1040 236 980 230Q938 224 932 200Z" fill="#3a5a8a"/>'+C(952,196,4,'#fff')+'<path d="M946 214Q980 222 1030 214" stroke="#cfe0f0" stroke-width="3" fill="none"/>'+blasen(990,150))}${R(1230,150,330,320,'#8a5a30',' stroke="#5a3418" stroke-width="5"')}${[170,310].map((y,k)=>`${R(1250,y,290,125,'#5a3418')}${R(1256,y+88,278,32,k?'#e04a3a':'#3f7fd0',' rx="8"')}<ellipse cx="1490" cy="${y+84}" rx="30" ry="14" fill="#fff"/><path d="M1250 ${y}H1340Q1320 ${y+60} 1336 ${y+125}H1250Z" fill="#2ab0b0"/>`).join('')}${decke('#6a3a1e','#b08050')}${lampe(620,'#6a3a1e')}${lampe(1400,'#6a3a1e')}${boden()}`,
objekte:[
{name:"Speiseplan-Tafel",x:760,y:230,wand:true,by:-85,zeichne:tafel,fund:"Unten auf der Tafel steht:"},
{name:"Kühlschrank",x:180,boden:600,fuss:4,by:-200,zeichne:kuehl,fund:"Im Kühlschrank liegt neben dem Pudding:"},
{name:"Esstisch mit Tablett",x:820,boden:620,fuss:4,by:-120,zeichne:tisch,fund:"Unter dem Teller liegt:"},
{name:"Sitzsack mit Kissen",x:1060,boden:720,fuss:4,by:-115,zeichne:sitzsack,fund:"Im Kissen steckt:"},
{name:"Spielekiste",x:1300,boden:700,fuss:4,by:-115,zeichne:spielkiste,fund:"Zwischen den Spielen liegt:"}
],
infoObjekte:[{name:"Bücherbord",x:160,y:230,wand:true,by:-70,zeichne:buecher,fund:"Zwischen den Büchern steckt:"},{name:"Globus",x:1480,boden:580,fuss:4,by:-145,zeichne:globus,fund:"Am Globus klebt:"},{name:"Zeitschriftenkorb",x:310,boden:740,fuss:4,by:-105,zeichne:korb,fund:"In einer Zeitschrift liegt:"}]},
{titel:"Die U-Boot-Garage",
intro:"Da ist es: das gelbe Mini-U-Boot! Es hängt sicher am Kran und wartet auf euch. Nur noch eine Luke trennt euch vom Start – öffnet das letzte Schloss!",
introDu:"Da ist es: das gelbe Mini-U-Boot! Es hängt sicher am Kran und wartet auf dich. Nur noch eine Luke trennt dich vom Start – öffne das letzte Schloss!",
tuerX:1250,
hintergrund:()=>`${defs('#4a5660','#161c22','#ffe9a0')}${wand('#2e3c4a','#1e2a36')}${warnband(440,26)}${[450,1500].map(x=>`<path d="M${x-14} 60L${x-140} 470H${x+140}L${x+14} 60Z" fill="#ffe9a0" opacity=".08"/>`).join('')}<path d="M580 470L612 404H788L820 470" fill="none" stroke="#e0b020" stroke-width="10"/><path d="M700 60V252" stroke="#222" stroke-width="4"/>${uboot(700,330,1.25)}${decke('#10181f','#5a6670')}<rect y="44" width="1600" height="14" fill="#e0b020"/>${R(670,40,60,26,'#5a6670',' rx="4"')}${[450,1500].map(x=>`${R(x-18,56,36,14,'#5a6670',' rx="4"')}`).join('')}${C(120,110,12,'#ff8a2a')}${C(120,110,30,'#ff8a2a',' opacity=".2"')}${boden()}`,
objekte:[
{name:"Sonar-Bildschirm",x:260,y:220,wand:true,by:-90,zeichne:sonar,fund:"Auf dem Sonar blinkt:"},
{name:"Steuerpult mit Hebel",x:360,boden:580,fuss:4,by:-165,zeichne:pult,fund:"Der Hebel klickt. Auf dem Pult leuchtet:"},
{name:"Anker",x:600,boden:720,fuss:4,by:-180,zeichne:anker,fund:"An der Ankerkette hängt:"},
{name:"Scheinwerfer",x:840,boden:600,fuss:4,by:-150,zeichne:scheinwerfer,fund:"Der Scheinwerfer leuchtet auf:"},
{name:"Boje",x:1480,boden:650,fuss:4,by:-160,zeichne:boje,fund:"In der Boje klappert etwas:"}
],
infoObjekte:[{name:"Klemmbrett mit Startliste",x:1000,y:200,wand:true,by:-85,zeichne:klemmbrett,fund:"Auf der Startliste steht:"},{name:"Ersatzteil-Regal",x:130,boden:690,fuss:4,by:-165,zeichne:regal,fund:"Im Regal liegt:"},{name:"Kiste mit Bauplänen",x:1000,boden:740,fuss:4,by:-120,zeichne:plaene,fund:"Zwischen den Bauplänen steckt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ec0f0"/><stop offset="1" stop-color="#e8f6ff"/></linearGradient><linearGradient id="see" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f9ad0"/><stop offset="1" stop-color="#0a3a6a"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/>${C(640,140,95,'#fff6c8',' opacity=".4"')}${C(640,140,58,'#ffe680')}
   <path d="M250 190a30 30 0 0 1 50 -20a36 36 0 0 1 64 10a24 24 0 0 1 6 40H260a22 22 0 0 1 -10 -30Z" fill="#fff"/>
   <path d="M330 110q12 -10 24 0q12 -10 24 0M450 80q9 -8 18 0q9 -8 18 0M560 150q10 -9 20 0q10 -9 20 0" stroke="#3a4652" stroke-width="3" fill="none" stroke-linecap="round"/>
   <rect y="390" width="1000" height="210" fill="url(#see)"/>${uboot(500,400,1.4)}
   <path d="M0 400${'q25 -12 50 0t50 0'.repeat(10)}V600H0Z" fill="#2f9ad0" opacity=".85"/><path d="M0 470${'q25 -8 50 0t50 0'.repeat(10)}" stroke="#bfe8ff" stroke-width="3" fill="none" opacity=".6"/>
   <path d="M340 404q-20 -34 -46 -14M668 404q20 -34 46 -14M380 410q-10 -20 -26 -10" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>
   <path d="M0 0H1000V600H0ZM190 300A310 290 0 1 0 810 300A310 290 0 1 0 190 300Z" fill="#1e2a34" fill-rule="evenodd"/><ellipse cx="500" cy="300" rx="310" ry="290" fill="none" stroke="#6a7884" stroke-width="22"/><ellipse cx="500" cy="300" rx="310" ry="290" fill="none" stroke="#c9d2d8" stroke-width="7" stroke-dasharray="0 40" stroke-linecap="round"/>`
};
})();