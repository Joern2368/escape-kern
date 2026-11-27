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
const klemmbrett=()=>`${R(-50,-66,100,132,'#a8742a',' rx="6" stroke="#5a3a10" stroke-width="3"')}${R(-40,-52,80,108,'#fff')}${R(-20,-72,40,18,'#9aa8ac',' rx="4" stroke="#555" stroke-width="2"')}${[-34,-10,14,38].map(y=>`${R(-32,y-6,12,12,'none',' stroke="#333" stroke-width="2"')}<path d="M-12 ${y}H30" stroke="#7a8a8e" stroke-width="4"/>`).join('')}<path d="M-31 -35L-26 -30L-18 -42M-31 -11L-26 -6L-18 -18" stroke="#3ab04a" stroke-width="3" fill="none"/>`;
const regal=()=>`${schatten(50,4)}<path d="M-48 0V-150M48 0V-150" stroke="#5a6670" stroke-width="6"/>${[-10,-60,-110].map(y=>`${R(-52,y,104,7,'#9aa8ac')}`).join('')}${C(-22,-30,16,'none',' stroke="#333" stroke-width="8"')}${R(6,-48,36,38,'#f2c230',' stroke="#7a5a10" stroke-width="2"')}${R(-34,-94,40,34,'#c88a4a',' stroke="#6a3a1e" stroke-width="2"')}${C(26,-76,14,'#fff6c8',' stroke="#555" stroke-width="4"')}<path d="M-16 -130L-34 -146L-30 -124ZM-16 -130L4 -142L2 -120Z" fill="#e0b020"/>${C(-16,-130,5,'#555')}`;
const plaene=()=>`${schatten(50,4)}${[[-24,-14,'#7fb0ff'],[0,4,'#fff'],[24,16,'#bfe8ff']].map(([x,r,f])=>`${R(x-8,-104,16,60,f,` rx="8" stroke="#2a5a9a" stroke-width="2" transform="rotate(${r} ${x} -50)"`)}`).join('')}${R(-48,-58,96,56,'#c88a4a',' stroke="#6a3a1e" stroke-width="3"')}<path d="M-48 -58L48 -2M48 -58L-48 -2" stroke="#6a3a1e" stroke-width="3"/>`;
const tauchrobo=()=>`${schatten(50,4)}<path d="M-36 -6H36" stroke="#2c3438" stroke-width="10" stroke-linecap="round"/>${R(-34,-76,68,60,'#f2c230',' rx="14" stroke="#8a6a10" stroke-width="3"')}${C(0,-50,18,'#2c3438')}${C(0,-50,10,'#4ae0e0')}<path d="M-34 -52Q-58 -52 -56 -28M34 -52Q58 -52 56 -28" stroke="#8a969e" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M0 -76V-96" stroke="#555" stroke-width="4"/>${C(0,-98,6,'#ff7a6a')}`;
const faecher=()=>`${schatten(50,4)}<path d="M0 0V-30" stroke="#a02a60" stroke-width="8"/><path d="M0 -26L-52 -70Q-60 -110 -20 -122Q0 -128 20 -122Q60 -110 52 -70Z" fill="#ff7aa8" stroke="#a02a60" stroke-width="3"/><path d="M0 -26V-120M0 -40L-34 -100M0 -40L34 -100M0 -60L-48 -84M0 -60L48 -84" stroke="#c0407a" stroke-width="3" fill="none"/>`;
const seegras=()=>`${schatten(40,4)}${[[-22,-110,'#3a9a4a'],[0,-140,'#5ab05a'],[22,-100,'#3a9a4a']].map(([x,h,f])=>`<path d="M${x} 0q-14 ${h/4} 0 ${h/2}t0 ${h/2}" stroke="${f}" stroke-width="9" fill="none" stroke-linecap="round"/>`).join('')}`;
const wrackkiste=()=>`${schatten(60,4)}<g transform="rotate(-6)">${R(-54,-56,108,54,'#6a7a6a',' rx="4" stroke="#2c3a2c" stroke-width="3"')}<path d="M-54 -56Q0 -90 54 -56Z" fill="#7a8a7a" stroke="#2c3a2c" stroke-width="3"/><path d="M-30 -54V-2M30 -54V-2" stroke="#4a5a4a" stroke-width="6"/>${R(-9,-44,18,18,'#c0a040',' rx="3"')}<path d="M-50 -10q8 -10 16 0M30 -20q8 -10 16 0" stroke="#3a9a4a" stroke-width="4" fill="none"/></g>`;
const rostglocke=()=>`<path d="M-40 90V-66H34" stroke="#6a5a4a" stroke-width="10" fill="none"/><path d="M26 -66V-52" stroke="#6a5a4a" stroke-width="6"/><path d="M-6 -50Q-6 -86 26 -86Q58 -86 58 -50L68 -34H-16Z" fill="#9a7a3a" stroke="#5a4a2a" stroke-width="3"/>${C(26,-30,7,'#5a4a2a')}${C(70,-70,5,'none',' stroke="#dff6ff" stroke-width="2"')}`;
const riffinfo=()=>`<path d="M0 66V210M-24 210H24" stroke="#6a7a82" stroke-width="8" stroke-linecap="round"/>${R(-74,-64,148,130,'#2f4a5a',' rx="6" stroke="#c9d2d8" stroke-width="5"')}${koralle(-26,50,'#ff7a9a')}${koralle(26,50,'#ffb030')}${fisch(10,-24,1.6,'#ffd23f')}<path d="M-56 -50H-8" stroke="#e8f4f8" stroke-width="4" stroke-linecap="round"/>`;
const seeigel=()=>`${schatten(56,4)}${[[-30,-18,'#6a3a8a'],[8,-22,'#8a4aa8']].map(([x,y,f])=>`<circle cx="${x}" cy="${y}" r="18" fill="${f}"/>${[0,1,2,3,4,5,6,7].map(k=>`<path d="M${x} ${y}L${(x+Math.cos(k*.785)*30).toFixed(0)} ${(y+Math.sin(k*.785)*30).toFixed(0)}" stroke="${f}" stroke-width="3"/>`).join('')}`).join('')}<g transform="translate(40 -10) scale(.9)">${stern(0,0,1,'#f07a2a')}</g>`;
const messboje=()=>`${schatten(40,4)}<path d="M0 -4V-70" stroke="#5a646c" stroke-width="6"/>${C(0,-100,30,'#e04a3a',' stroke="#7a1a10" stroke-width="3"')}<path d="M-30 -100H30" stroke="#fff" stroke-width="8"/>${C(0,-100,8,'#fff6c8')}<path d="M0 -130V-150" stroke="#5a646c" stroke-width="4"/>${C(0,-152,5,'#ffd23f')}`;
const schlossPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=C(x0+k*22,y,8,'#0c1820',' stroke="#ffd23f" stroke-width="2"');return R(500-n*11-12,y-18,n*22+24,36,'#0c1820',' rx="6" stroke="#ffd23f" stroke-width="2"')+d;};
const fischOben=(y,c)=>`<use href="#sym-fisch" x="476" y="${y}" width="48" height="48" color="${c||'#ffd23f'}"/>`;
const TDEF=`<defs><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#7a8a96"/><stop offset=".5" stop-color="#b4c2cc"/><stop offset="1" stop-color="#6a7884"/></linearGradient><radialGradient id="gangW"><stop offset="0" stop-color="#bfefff"/><stop offset="1" stop-color="#0a3a50"/></radialGradient><clipPath id="aqclip"><rect x="394" y="184" width="212" height="286"/></clipPath><clipPath id="lukclip"><path d="M412 310A88 128 0 1 0 588 310A88 128 0 1 0 412 310Z"/></clipPath><clipPath id="drkclip"><path d="M438 470V340Q438 306 472 306H528Q562 306 562 340V470Z"/></clipPath></defs>`;
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out}.tuer.offen #lid{transform:scaleY(.12)}.tuer.offen #aqu{transform:translateX(240px)}.tuer.offen #luk{transform:scaleX(.1)}.tuer.offen #drk{transform:translateY(190px)}.tuer.offen #lid2{transform:rotate(-78deg)}.tuer #nd{transform:rotate(-65deg);transition:transform 1.8s ease-in-out}.tuer.offen #nd{transform:rotate(62deg)}.tuer .la{transition:fill 1s}.tuer.offen .la{fill:#4ae07a}</style>`;
function tuerBecken(n){
return`<ellipse cx="500" cy="528" rx="138" ry="50" fill="#5a646c" stroke="#2c3438" stroke-width="5"/><ellipse cx="500" cy="528" rx="122" ry="38" fill="#1f7ab0"/><path d="M420 520q20 -8 40 0t40 0M480 540q20 -8 40 0t40 0" stroke="#bfe8ff" stroke-width="3" fill="none"/>${blasen(560,530)}
   <g id="lid" class="tb" style="transform-origin:500px 490px"><ellipse cx="500" cy="528" rx="122" ry="38" fill="url(#platteG)" stroke="#5a6670" stroke-width="4"/><path d="M400 520Q500 500 600 520M400 540Q500 560 600 540" stroke="#8a969e" stroke-width="3" fill="none"/>${C(398,528,7,'#e04a3a')}${C(602,528,7,'#e04a3a')}${schlossPl(n,528)}</g>`;
}
function tuerAqua(n){
return`${R(380,170,240,300,'#2c3438',' rx="10"')}${R(394,184,212,286,'url(#gangW)')}
   <g clip-path="url(#aqclip)"><g id="aqu" class="tb">${R(394,184,212,286,'#4ac0d8')}${R(394,184,212,14,'#8adcea')}${alge(420,470,110,'#3a9a4a')}${alge(580,470,90,'#3a9a4a')}${fisch(440,250,1.7,'#ffd23f')}${fisch(560,300,-1.5,'#ff7a9a')}${fisch(470,420,1.3,'#b0e8a0')}${blasen(520,430)}<path d="M410 200L440 460M580 200L596 330" stroke="#fff" stroke-width="10" opacity=".18"/>${fischOben(262,'#ffd23f')}${schlossPl(n,340)}</g></g>`;
}
function tuerLuke(n){
const luke='M412 310A88 128 0 1 0 588 310A88 128 0 1 0 412 310Z';
return`${R(396,442,208,28,'#4a5660',' rx="6"')}<ellipse cx="500" cy="310" rx="120" ry="158" fill="#5a6670" stroke="#2c3438" stroke-width="6"/><ellipse cx="500" cy="310" rx="104" ry="142" fill="none" stroke="#c9d2d8" stroke-width="7" stroke-dasharray="0 28" stroke-linecap="round"/>
   <path d="${luke}" fill="url(#gangW)"/><g clip-path="url(#lukclip)"><g id="luk" class="tb" style="transform-origin:412px 310px"><path d="${luke}" fill="url(#platteG)"/><ellipse cx="500" cy="310" rx="74" ry="112" fill="none" stroke="#5a6670" stroke-width="4"/><path d="M462 262H538M500 224V300M473 235L527 289M527 235L473 289" stroke="#e04a3a" stroke-width="5"/>${C(500,262,38,'none',' stroke="#e04a3a" stroke-width="8"')}${C(500,262,10,'#8a2a20')}${schlossPl(n,356)}</g></g>`;
}
function tuerGlocke(n){
let ni='';for(let k=-4;k<=4;k++){const a=k*.3;ni+=`M${(500+Math.sin(a)*26).toFixed(1)} ${(262-Math.cos(a)*26).toFixed(1)}L${(500+Math.sin(a)*31).toFixed(1)} ${(262-Math.cos(a)*31).toFixed(1)}`;}
return`<path d="M366 470V350Q366 196 500 196Q634 196 634 350V470Z" fill="#7a8a96" stroke="#2c3438" stroke-width="6"/><path d="M380 340H620M380 410H620" stroke="#5a6670" stroke-width="4"/>${[392,430,570,608].map(x=>C(x,340,4,'#4a5660')).join('')}
   ${C(500,262,36,'#e8eef2',' stroke="#2c3438" stroke-width="5"')}<path d="M480 280A26 26 0 0 1 480 244" stroke="#e04a3a" stroke-width="6" fill="none"/><path d="M520 244A26 26 0 0 1 520 280" stroke="#4ae07a" stroke-width="6" fill="none"/><path d="${ni}" stroke="#2c3438" stroke-width="2"/><g id="nd" style="transform-origin:500px 262px"><path d="M500 262V238" stroke="#2c3438" stroke-width="4" stroke-linecap="round"/></g>${C(500,262,5,'#2c3438')}${C(424,262,9,'#ff5a4a',' class="la"')}${C(576,262,9,'#ff5a4a',' class="la"')}
   <path d="M438 470V340Q438 306 472 306H528Q562 306 562 340V470Z" fill="#d8b050"/><circle cx="500" cy="400" r="70" fill="url(#licht)"/>
   <g clip-path="url(#drkclip)"><g id="drk" class="tb"><path d="M438 470V340Q438 306 472 306H528Q562 306 562 340V470Z" fill="url(#platteG)"/><path d="M438 440H562" stroke="#5a6670" stroke-width="4"/>${fischOben(318,'#2a4a8a')}${schlossPl(n,396)}</g></g>`;
}
function tuerUboot(n){
return`<path d="M244 420Q244 372 330 372H670Q756 372 756 420Q756 468 670 468H330Q244 468 244 420Z" fill="#e8a818" stroke="#8a5a10" stroke-width="4"/><path d="M262 436H738" stroke="#fff6c8" stroke-width="6"/>${C(330,414,14,'#bfe8ff',' stroke="#8a5a10" stroke-width="4"')}${C(670,414,14,'#bfe8ff',' stroke="#8a5a10" stroke-width="4"')}<path d="M756 420L790 380V460Z" fill="#c89a20" stroke="#8a5a10" stroke-width="3"/><path d="M244 420L214 380V460Z" fill="#c89a20" stroke="#8a5a10" stroke-width="3"/>
   ${R(420,236,160,200,'#f2c230',' rx="26" stroke="#8a5a10" stroke-width="4"')}<path d="M436 450V340M436 366H420M436 392H420M436 418H420" stroke="#8a969e" stroke-width="5" stroke-linecap="round"/>
   <ellipse cx="500" cy="236" rx="56" ry="13" fill="#1a1208"/><ellipse cx="500" cy="236" rx="40" ry="8" fill="#ffe9a0"/>
   <g id="lid2" class="tb" style="transform-origin:446px 236px"><ellipse cx="500" cy="236" rx="56" ry="13" fill="#c89a20" stroke="#8a5a10" stroke-width="3"/>${C(500,236,6,'#8a5a10')}</g>
   ${fischOben(264,'#8a5a10')}${schlossPl(n,370)}`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'becken';
const arten={becken:[tuerBecken,'Tauchbecken mit Zahlenschloss'],aqua:[tuerAqua,'Aquarium-Wand mit Zahlenschloss'],luke:[tuerLuke,'Taucher-Luke mit Zahlenschloss'],glocke:[tuerGlocke,'Druckschleuse mit Zahlenschloss'],uboot:[tuerUboot,'U-Boot-Luke mit Zahlenschloss']};
const a=arten[art]||arten.becken;
return`${TDEF}${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.unterwasser={
name:"Die Unterwasserstation",
symbole:["fisch","muschel","seestern","qualle","krake"],
symbolNamen:["Fisch","Muschel","Seestern","Qualle","Krake"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect width="120" height="90" rx="14" fill="#1f6aa0"/><path d="M0 18q15 -8 30 0t30 0t30 0t30 0" stroke="#bfe8ff" stroke-width="3" fill="none"/>${uboot(56,58,.38)}${C(66,26,3,'none',' stroke="#bfe8ff" stroke-width="2"')}${C(72,16,4,'none',' stroke="#bfe8ff" stroke-width="2"')}</svg>`,
texte:{
einleitung:"Ihr besucht eine Forschungsstation tief unten auf dem Meeresgrund. Plötzlich zieht oben über dem Meer ein Sturm auf. Die Station schaltet auf Notbetrieb – alle Luken sind verriegelt! Keine Sorge, ihr seid hier unten sicher. Ein Mini-U-Boot bringt euch nach oben, aber der Weg dorthin führt durch fünf Räume. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände: Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zum U-Boot?",
startKnopf:"In die Station tauchen",
hinweisGeber:"Der Delfin Dori pfeift durch den Lautsprecher:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Dori pfeift leise … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Luke",
schlossSymbol:"Über jedem Rad leuchtet ein Meerestier. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss piept – aber der Weg bleibt versperrt. Überprüft eure Ziffern!",
zeitUmTitel:"Die Stationsuhr piept!",
zeitUm:"Eure Zeit ist abgelaufen. Aber keine Sorge – ihr dürft weiterspielen und das U-Boot trotzdem noch erreichen!",
geschafft:"Ihr seid aufgetaucht!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und seid mit dem Mini-U-Boot sicher an die Wasseroberfläche aufgetaucht. Dori und Kiki winken euch zum Abschied!"
},
texteDu:{
einleitung:"Du besuchst eine Forschungsstation tief unten auf dem Meeresgrund. Plötzlich zieht oben über dem Meer ein Sturm auf. Die Station schaltet auf Notbetrieb – alle Luken sind verriegelt! Keine Sorge, du bist hier unten sicher. Ein Mini-U-Boot bringt dich nach oben, aber der Weg dorthin führt durch fünf Räume. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände: Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zum U-Boot?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Dori pfeift leise … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad leuchtet ein Meerestier. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss piept – aber der Weg bleibt versperrt. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber keine Sorge – du darfst weiterspielen und das U-Boot trotzdem noch erreichen!",
geschafft:"Du bist aufgetaucht!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und bist mit dem Mini-U-Boot sicher an die Wasseroberfläche aufgetaucht. Dori und Kiki winken dir zum Abschied!"
},
einfach:{
name:"Die Station unter dem Meer",
symbolNamen:["Fisch","Muschel","Seestern","Qualle","Krake"],
texte:{
einleitung:"Ihr seid in einem Haus tief unten im Meer. Dort arbeiten Forscher. Oben auf dem Meer ist ein Sturm. Darum sind alle Wege zu. Keine Angst, ihr seid hier sicher! Ein kleines U-Boot bringt euch nach oben. An jedem Weg hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg zum U-Boot?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
geschafft:"Ihr seid oben!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das U-Boot bringt euch nach oben!"
},
texteDu:{
einleitung:"Du bist in einem Haus tief unten im Meer. Dort arbeiten Forscher. Oben auf dem Meer ist ein Sturm. Darum sind alle Wege zu. Keine Angst, du bist hier sicher! Ein kleines U-Boot bringt dich nach oben. An jedem Weg hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg zum U-Boot?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist oben!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das U-Boot bringt dich nach oben!"
},
raeume:[
{titel:"Der Raum zum Tauchen",intro:"Hier ziehen die Forscher ihre Anzüge an. Dann tauchen sie ins Meer. Im Boden ist ein Becken mit Wasser. Es hat eine Abdeckung mit Schloss. Hier sind die Zahlen dafür versteckt.",
objekte:[{name:"Anzug zum Tauchen",fund:"In der Tasche vom Anzug steckt:"},{name:"Flaschen mit Luft",fund:"Zwischen den Flaschen steckt:"},{name:"Flossen",fund:"In einer Flosse steckt:"},{name:"Kiste mit Werkzeug",fund:"In der Kiste liegt:"},{name:"Eimer mit Brillen",fund:"Unter den Brillen liegt:"}],
infoObjekte:[{name:"Bildschirm",fund:"Auf dem Bildschirm steht:"},{name:"Schrank mit Muscheln",fund:"Bei den Muscheln liegt:"},{name:"Alter Helm zum Tauchen",fund:"Im Helm liegt:"}]},
{titel:"Der Raum zum Forschen",intro:"Hier schauen sich die Forscher Tiere aus dem Meer an. Im Aquarium schwimmen bunte Fische. Sucht die Zahlen für das nächste Schloss!",introDu:"Hier schauen sich die Forscher Tiere aus dem Meer an. Im Aquarium schwimmen bunte Fische. Such die Zahlen für das nächste Schloss!",
objekte:[{name:"Aquarium",fund:"Hinter dem Aquarium klebt:"},{name:"Mikroskop",fund:"Unter dem Mikroskop ist:"},{name:"Wagen mit Gläsern",fund:"Auf einem Glas klebt:"},{name:"Becken mit Seesternen",fund:"Ein Seestern hält etwas fest:"},{name:"Kamera zum Tauchen",fund:"Die Kamera zeigt ein Bild:"}],
infoObjekte:[{name:"Poster mit Tieren aus dem Meer",fund:"Hinter dem Poster steckt:"},{name:"Computer",fund:"Der Computer zeigt:"},{name:"Kühlbox",fund:"In der Kühlbox liegt:"}]},
{titel:"Der Tunnel aus Glas",intro:"Die Wände sind aus Glas. Draußen schwimmen Fische. Von oben kommt blaues Licht. Die Krake Kiki winkt euch zu.",introDu:"Die Wände sind aus Glas. Draußen schwimmen Fische. Von oben kommt blaues Licht. Die Krake Kiki winkt dir zu.",
objekte:[{name:"Rettungsring",fund:"Am Ring hängt:"},{name:"Große Muschel",fund:"Die Muschel geht auf. Darin liegt:"},{name:"Koralle",fund:"Unter der Koralle liegt:"},{name:"Bank",fund:"Auf der Bank liegt:"},{name:"Eimer mit Fischfutter",fund:"Im Futter steckt:"}],
infoObjekte:[{name:"Karte vom Meer",fund:"An der Karte hängt:"},{name:"Kiste mit Sachen aus dem Meer",fund:"In der Kiste liegt:"},{name:"Säule mit Bildschirm",fund:"Auf der Säule steht:"}]},
{titel:"Das Riff",intro:"Ihr seid draußen im Meer. Hier sind bunte Korallen und viele Fische. Ein altes Schiff liegt auf dem Boden. Dort steht eine Taucher-Glocke mit einem Schloss. Findet die Zahlen!",introDu:"Du bist draußen im Meer. Hier sind bunte Korallen und viele Fische. Ein altes Schiff liegt auf dem Boden. Dort steht eine Taucher-Glocke mit einem Schloss. Finde die Zahlen!",
objekte:[{name:"Roboter zum Tauchen",fund:"Auf dem Bildschirm vom Roboter blinkt:"},{name:"Rosa Koralle",fund:"In der Koralle klemmt:"},{name:"Seegras",fund:"Im Seegras hängt:"},{name:"Kiste im Schiff",fund:"In der Kiste liegt:"},{name:"Alte Glocke",fund:"In der Glocke steckt:"}],
infoObjekte:[{name:"Tafel vom Riff",fund:"Auf der Tafel steht:"},{name:"Seeigel und Seestern",fund:"Unter dem Seestern klebt:"},{name:"Rote Boje",fund:"An der Boje blinkt:"}]},
{titel:"Die Garage für das U-Boot",intro:"Da ist das kleine gelbe U-Boot! Es bringt euch nach oben. Öffnet das letzte Schloss!",introDu:"Da ist das kleine gelbe U-Boot! Es bringt dich nach oben. Öffne das letzte Schloss!",
objekte:[{name:"Grüner Bildschirm",fund:"Auf dem Bildschirm blinkt:"},{name:"Pult mit Hebel",fund:"Der Hebel macht klick. Dann leuchtet:"},{name:"Anker",fund:"An der Kette hängt:"},{name:"Große Lampe",fund:"Die Lampe geht an. Im Licht steht:"},{name:"Boje",fund:"In der Boje klappert etwas:"}],
infoObjekte:[{name:"Liste für den Start",fund:"Auf der Liste steht:"},{name:"Regal mit Teilen",fund:"Im Regal liegt:"},{name:"Kiste mit Plänen",fund:"Bei den Plänen liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Taucherschleuse",
intro:"Ihr steht in der Taucherschleuse. Hier ziehen die Forscherinnen und Forscher ihre Taucheranzüge an. Im Boden liegt ein Wasserbecken, aber seine Abdeckung ist verriegelt. Irgendwo hier sind die Ziffern für das Schloss versteckt …",
introDu:"Du stehst in der Taucherschleuse. Hier ziehen die Forscherinnen und Forscher ihre Taucheranzüge an. Im Boden liegt ein Wasserbecken, aber seine Abdeckung ist verriegelt. Irgendwo hier sind die Ziffern für das Schloss versteckt …",
tuerX:800,tuerArt:"becken",
hintergrund:()=>`${defs('#7a8288','#2c3236','#fff2c0')}${wand('#8c959c','#6a737a')}${warnband(436,30)}${[1000,1062,1124,1186].map(x=>`${R(x,200,58,236,'#e0b020',' stroke="#8a6a10" stroke-width="3"')}<path d="M${x+12} 220H${x+46}M${x+12} 230H${x+46}M${x+12} 240H${x+46}" stroke="#8a6a10" stroke-width="3"/>${R(x+44,310,6,26,'#5a4a10',' rx="3"')}`).join('')}${bullauge(1420,220,66,fisch(1400,205,1.3,'#ffb030')+fisch(1445,245,-1,'#7fd0ff'))}${decke('#3a4248','#e0b020')}${lampe(400,'#3a4248')}${lampe(1200,'#3a4248')}${boden()}`,
objekte:[
{name:"Tauchanzug am Haken",x:480,y:250,wand:true,by:-105,zeichne:anzug,fund:"In der Brusttasche des Anzugs steckt:"},
{name:"Taucherflaschen",x:380,boden:600,fuss:4,by:-165,zeichne:flaschen,fund:"Zwischen den Flaschen klemmt:"},
{name:"Schwimmflossen",x:560,boden:720,fuss:4,by:-140,zeichne:flossen,fund:"In einer Flosse steckt:"},
{name:"Werkzeugkiste",x:1000,boden:720,fuss:4,by:-110,zeichne:werkzeug,fund:"Unter dem Schraubenschlüssel liegt:"},
{name:"Eimer mit Taucherbrillen",x:1480,boden:700,fuss:4,by:-130,zeichne:brillen,fund:"Unter den Taucherbrillen liegt:"}
],
infoObjekte:[{name:"Infobildschirm",x:160,y:230,wand:true,by:-75,zeichne:infoschirm,fund:"Auf dem Bildschirm blinkt:"},{name:"Muschelvitrine",x:1500,boden:540,fuss:4,by:-150,zeichne:vitrine,fund:"Zwischen den Muscheln liegt:"},{name:"Tauchhelm-Ständer",x:180,boden:700,fuss:4,by:-195,zeichne:helm,fund:"Im alten Tauchhelm steckt:"}]},
{titel:"Das Forschungslabor",
intro:"Im Labor untersucht das Forschungsteam Tiere und Pflanzen aus dem Meer. Im Aquarium schwimmen bunte Fische, und unter dem Mikroskop liegt eine Wasserprobe. Findet die Ziffern für das Schloss der Aquarium-Wand!",
introDu:"Im Labor untersucht das Forschungsteam Tiere und Pflanzen aus dem Meer. Im Aquarium schwimmen bunte Fische, und unter dem Mikroskop liegt eine Wasserprobe. Finde die Ziffern für das Schloss der Aquarium-Wand!",
tuerX:1350,tuerArt:"aqua",
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
intro:"Wow! Die Wände des Tunnels sind aus dickem Glas. Draußen schwimmen Fische zwischen den Korallen, und von oben fällt blaues Licht herein. Die Krake Kiki winkt euch durch die Scheibe zu. Am Ende des Tunnels ist eine runde Taucher-Luke mit Handrad.",
introDu:"Wow! Die Wände des Tunnels sind aus dickem Glas. Draußen schwimmen Fische zwischen den Korallen, und von oben fällt blaues Licht herein. Die Krake Kiki winkt dir durch die Scheibe zu. Am Ende des Tunnels ist eine runde Taucher-Luke mit Handrad.",
tuerX:220,tuerArt:"luke",
hintergrund:()=>`${defs('#5a8ab0','#16304a','#bfefff')}<rect width="1600" height="470" fill="url(#meer)"/><path d="M400 40H470L640 470H420ZM800 40H870L980 470H760ZM1330 40H1400L1540 470H1330Z" fill="#fff" opacity=".1"/><path d="M380 470Q600 420 800 450T1600 440V470Z" fill="#d8c48a"/>${koralle(450,462,'#ff7a9a')}${koralle(520,466,'#ffb030')}${koralle(820,458,'#d08aff')}${koralle(1010,455,'#ff7a9a')}${koralle(1370,458,'#ffb030')}${koralle(1520,456,'#ff7a9a')}${alge(480,466,90,'#3a9a4a')}${alge(780,458,120,'#3a9a4a')}${alge(1060,452,100,'#5ab05a')}${alge(1440,456,110,'#3a9a4a')}${stern(1090,448,.8,'#f07a2a')}${fisch(480,160,1.4,'#ffb030')}${fisch(880,120,-1.6,'#ff7a9a')}${fisch(950,180,-1,'#ffd23f')}${fisch(1030,140,-1.2,'#7fe0ff')}${fisch(1420,210,1.8,'#ffb030')}${fisch(1500,310,-1.2,'#a0f0a0')}<use href="#sym-qualle" x="1430" y="70" width="60" height="60" color="#ffc0e0"/><use href="#sym-krake" x="900" y="270" width="90" height="90" color="#ff8a6a"/>${blasen(1000,330)}<path d="M0 40H400V470H0ZM560 40H740V470H560ZM1120 40H1300V470H1120Z" fill="#5a6e80"/><path d="M400 40V470M560 40V470M740 40V470M1120 40V470M1300 40V470" stroke="#2c3c4a" stroke-width="12"/><path d="M0 120H400M560 120H740M1120 120H1300M0 400H400M560 400H740M1120 400H1300" stroke="#c9d2d8" stroke-width="6" stroke-dasharray="0 30" stroke-linecap="round"/><path d="M430 80H468L420 300ZM780 70H818L768 260ZM1340 80H1378L1330 280Z" fill="#fff" opacity=".15"/><rect width="1600" height="44" fill="#2c3c4a"/>${boden()}<path d="M200 560q40 -14 80 0M600 520q50 -16 100 0M1000 600q60 -18 120 0M1300 540q40 -14 80 0M500 760q60 -18 120 0" stroke="#bfefff" stroke-width="4" fill="none" opacity=".25"/>`,
objekte:[
{name:"Rettungsring",x:650,y:230,wand:true,by:-105,zeichne:ring,fund:"Am Rettungsring hängt:"},
{name:"Riesenmuschel",x:520,boden:700,fuss:4,by:-140,zeichne:riesenmuschel,fund:"Die Muschel öffnet sich. Neben der Perle liegt:"},
{name:"Korallen unter der Glashaube",x:900,boden:600,fuss:4,by:-165,zeichne:korallen,fund:"Unter der Glashaube liegt:"},
{name:"Sitzbank mit Fernglas",x:1080,boden:710,fuss:4,by:-125,zeichne:bank,fund:"Neben dem Fernglas liegt:"},
{name:"Eimer mit Fischfutter",x:1420,boden:590,fuss:4,by:-125,zeichne:futter,fund:"Im Fischfutter steckt:"}
],
infoObjekte:[{name:"Karte vom Meeresgrund",x:1210,y:230,wand:true,by:-70,zeichne:karte,fund:"Neben der Karte hängt:"},{name:"Kiste mit Fundstücken",x:1270,boden:730,fuss:4,by:-110,zeichne:fundkiste,fund:"Zwischen den Fundstücken liegt:"},{name:"Infosäule",x:700,boden:560,fuss:4,by:-195,zeichne:saeule,fund:"Auf der Infosäule erscheint:"}]},
{titel:"Das Riff",
intro:"Ihr schwimmt hinaus ins Riff! Bunte Korallen, Fische und ein altes Schiffswrack: Hier draußen ist alles zu sehen. Dort steht die Tauchglocke mit einer Druckschleuse. Findet die Ziffern für ihr Schloss!",
introDu:"Du schwimmst hinaus ins Riff! Bunte Korallen, Fische und ein altes Schiffswrack: Hier draußen ist alles zu sehen. Dort steht die Tauchglocke mit einer Druckschleuse. Finde die Ziffern für ihr Schloss!",
tuerX:500,tuerArt:"glocke",
hintergrund:()=>`${defs('#d8c48a','#8a7448','#bfefff')}<rect width="1600" height="470" fill="url(#meer)"/><path d="M200 0H280L440 470H160ZM800 0H860L980 470H760ZM1300 0H1380L1560 470H1300Z" fill="#fff" opacity=".1"/><path d="M700 470L716 392Q900 340 1110 396L1090 470Z" fill="#2a4a5a" stroke="#1a3040" stroke-width="4"/><path d="M880 372V230M880 250L950 280M880 250L820 290" stroke="#1a3040" stroke-width="8" fill="none"/><path d="M770 440q10 -8 20 0M900 430q10 -8 20 0M1020 436q10 -8 20 0" stroke="#7fd0e8" stroke-width="3" fill="none"/>${C(790,420,12,'#7fd0e8',' opacity=".5"')}${C(980,416,12,'#7fd0e8',' opacity=".5"')}<rect y="440" width="1600" height="30" fill="#c8b478"/>${koralle(160,462,'#ff7a9a')}${koralle(230,466,'#ffb030')}${koralle(380,460,'#d08aff')}${koralle(1180,458,'#ff7a9a')}${koralle(1300,466,'#ffb030')}${koralle(1420,458,'#d08aff')}${koralle(1540,462,'#ff7a9a')}${alge(300,466,120,'#3a9a4a')}${alge(1250,462,140,'#5ab05a')}${alge(1480,460,100,'#3a9a4a')}${fisch(300,150,1.5,'#ffb030')}${fisch(380,190,1.3,'#ffd23f')}${fisch(1000,150,-1.6,'#ff7a9a')}${fisch(1080,210,-1.2,'#7fe0ff')}${fisch(1450,250,1.8,'#a0f0a0')}${fisch(650,260,-1.4,'#ffb030')}<use href="#sym-qualle" x="1180" y="80" width="60" height="60" color="#ffc0e0"/><use href="#sym-krake" x="1380" y="340" width="70" height="70" color="#ff8a6a"/>${blasen(700,330)}<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="M0 520Q300 500 600 520T1200 520T1600 516M0 640Q300 620 600 640T1200 640T1600 636" stroke="rgba(120,90,40,.35)" stroke-width="4" fill="none"/>${[[260,560],[700,610],[1100,700],[1500,580],[420,730]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="10" ry="5" fill="#a8905a"/>`).join('')}`,
objekte:[
{name:"Tauchroboter",x:1000,boden:620,fuss:4,by:-110,zeichne:tauchrobo,fund:"Auf dem Display des Tauchroboters blinkt:"},
{name:"Fächerkoralle",x:1250,boden:730,fuss:4,by:-130,zeichne:faecher,fund:"Zwischen den Ästen der Koralle klemmt:"},
{name:"Seegras-Büschel",x:1450,boden:600,fuss:4,by:-150,zeichne:seegras,fund:"Im Seegras hängt:"},
{name:"Truhe im Wrack",x:800,boden:700,fuss:4,by:-90,zeichne:wrackkiste,fund:"In der alten Truhe liegt:"},
{name:"Rostige Schiffsglocke",x:900,y:250,wand:true,by:-90,zeichne:rostglocke,fund:"Im Klöppel der Glocke steckt:"}
],
infoObjekte:[{name:"Riff-Infotafel",x:200,y:240,wand:true,by:-70,zeichne:riffinfo,fund:"Auf der Infotafel steht:"},{name:"Seeigel und Seestern",x:700,boden:540,fuss:4,by:-55,zeichne:seeigel,fund:"Unter dem Seestern klebt:"},{name:"Messboje",x:1500,boden:730,fuss:4,by:-165,zeichne:messboje,fund:"An der Messboje blinkt:"}]},
{titel:"Die U-Boot-Garage",
intro:"Da ist es: das gelbe Mini-U-Boot! Es liegt sicher im Dock der Tauchglocke und wartet auf euch. Öffnet die Luke am Turm – das ist das letzte Schloss!",
introDu:"Da ist es: das gelbe Mini-U-Boot! Es liegt sicher im Dock der Tauchglocke und wartet auf dich. Öffne die Luke am Turm – das ist das letzte Schloss!",
tuerX:1250,tuerArt:"uboot",
hintergrund:()=>`${defs('#4a5660','#161c22','#ffe9a0')}${wand('#2e3c4a','#1e2a36')}${warnband(440,26)}${[450,1500].map(x=>`<path d="M${x-14} 60L${x-140} 470H${x+140}L${x+14} 60Z" fill="#ffe9a0" opacity=".08"/>`).join('')}${decke('#10181f','#5a6670')}<rect y="44" width="1600" height="14" fill="#e0b020"/>${[450,1500].map(x=>`${R(x-18,56,36,14,'#5a6670',' rx="4"')}`).join('')}${C(120,110,12,'#ff8a2a')}${C(120,110,30,'#ff8a2a',' opacity=".2"')}${boden()}`,
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
   treffer {x,y,z,b,h,t} (Tippfläche), name (Schild), schildOben [x,y,z], glanz [x,y,z], bewege(auf) (auf läuft von 0 bis 1) */
function ausgang(k,opt){
  const sc=k.scene, a=opt.treffer;
  const treffer=new THREE.Mesh(GEO.box,basis(0,{visible:false})); treffer.scale.set(a.b,a.h,a.t); treffer.position.set(a.x,a.y,a.z); sc.add(treffer);
  /* Bis Klasse 6 (einfache Sprache) darf der Ausgang einen leichteren Namen haben */
  const leicht=typeof CONFIG!=='undefined' && (typeof CONFIG.einfacheSprache==='boolean' ? CONFIG.einfacheSprache : parseInt(CONFIG.klasse,10)<=6);
  const schild=textSprite(leicht && opt.einfach ? opt.einfach : opt.name); schild.position.set(opt.schildOben[0],opt.schildOben[1],opt.schildOben[2]); schild.visible=false; sc.add(schild);
  const tuer={ steh:opt.steh, durch:opt.durch, tief:!!opt.tief, hoch:opt.hoch||0, rutsch:opt.rutsch||null, rutschDauer:opt.rutschDauer||1.5, treffer, schild, bereit:false, offen:false };
  const g=schein(sc,'rgba(255,225,120,.9)',opt.glanz[0],opt.glanz[1],opt.glanz[2],2.2); g.visible=false;
  let auf=0;
  k.anim.push((t,dt)=>{ g.visible=tuer.bereit; if(tuer.bereit){ const s=1.8+Math.sin(t*5)*.5; g.scale.set(s,s,1); } auf+=((tuer.offen?1:0)-auf)*Math.min(1,dt*2.5); opt.bewege(auf,t); });
  return tuer;
}

/* ===================================================================
   UNTERWASSERSTATION in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei unterwasser-raum<n>.js, die sich in RAEUME3D.unterwasser[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, verschmelze, bild, schein, mat, basis, GEO, V,
   zufall, textSprite, laeufer, flacker, ausgang.
   =================================================================== */
RAEUME3D.unterwasser = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen */
const NEU=[
  [['Umkleideschrank','Im Umkleideschrank liegt:','Schrank für Kleidung','Im Schrank liegt:'],['Handtuchstapel','Zwischen den Handtüchern steckt:','Stapel Handtücher','Bei den Handtüchern steckt:']],
  [['Laborwaage','Auf der Laborwaage liegt:','Waage','Auf der Waage liegt:'],['Weltkugel der Meere','An der Weltkugel klebt:','Weltkugel','An der Weltkugel klebt:']],
  [['Pflanzkübel','Zwischen den Wasserpflanzen steckt:','Topf mit Wasserpflanzen','Im Topf steckt:'],['Staffelei','An der Staffelei klemmt:','Bild auf einem Ständer','Am Bild klemmt:']],
  [['Riesenschwamm','Im Riesenschwamm steckt:','Großer Schwamm','Im Schwamm steckt:'],['Sammelkorb','Im Sammelkorb liegt:','Korb','Im Korb liegt:']],
  [['Schlauchtrommel','An der Schlauchtrommel hängt:','Rolle mit Schlauch','An der Rolle hängt:'],['Hocker mit Thermoskanne','Unter der Thermoskanne liegt:','Kanne auf einem Hocker','Unter der Kanne liegt:']]
];
const SZU=SZENARIEN.unterwasser;
/* Einfache Einleitungen: den Ausgang nennen */
if(SZU.einfach) ['Der Ausgang ist das Becken im Boden.','Der Ausgang ist die große Tür mit den Fischen.','Der Ausgang ist die runde Tür mit dem Rad.','Der Ausgang ist die Taucher-Glocke.','Der Ausgang ist oben auf dem U-Boot.'].forEach((satz,i)=>{ const r=SZU.einfach.raeume[i]; ['intro','introDu'].forEach(k=>{ if(r[k] && r[k].indexOf(satz)<0) r[k]=r[k]+' '+satz; }); });
/* Einfache Namen eindeutiger machen (in 3D gibt es mehr Korallen und zwei Glocken) */
if(SZU.einfach) [[2,{'Koralle':'Koralle unter Glas'}],[3,{'Rosa Koralle':'Große rosa Koralle','Alte Glocke':'Schiffs-Glocke','Seegras':'Helles Seegras'}]].forEach(([r,neu])=>SZU.einfach.raeume[r].objekte.forEach(o=>{ if(neu[o.name]) o.name=neu[o.name]; }));
/* Das erste Aquarium steht in 3D frei im Raum, nicht an der Wand */
SZU.raeume[1].objekte.forEach(o=>{ if(o.name==='Wandaquarium'){ o.name='Schau-Aquarium'; o.fund='Hinter dem Schau-Aquarium klebt:'; } });
/* Bis Klasse 6: deutlich vom Ausgang mit den Fischen unterscheiden */
if(SZU.einfach){ const r=SZU.einfach.raeume[1]; r.objekte.forEach(o=>{ if(o.name==='Aquarium'){ o.name='Kleines Aquarium'; o.fund='Hinter dem kleinen Aquarium klebt:'; } }); ['intro','introDu'].forEach(k=>{ if(r[k]) r[k]=r[k].split('Im Aquarium').join('Im kleinen Aquarium'); }); }
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZU.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZU.einfach) SZU.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const UW = (function(){
const METALL=0xa8c0cc, METALL2=0x587684, DUNKEL=0x163442, WEISS=0xeef6fa, GELB=0xffcc22, ORANGE=0xf08a2a, ROT=0xe0443a, TUERKIS=0x2ac8c0, BLAU=0x2f7fd0, GRUEN=0x3aa860, ROSA=0xf07aa0, LILA=0x9a6ad0, SAND=0xd9c48a, MESSING=0xd8a73a;

/* Wand-Bild aus genieteten Stahlplatten (Kachel passt nahtlos). grund = [r,g,b] */
function plattenBild(grund){
  const G=grund||[70,118,132], f=h=>'rgb('+(G[0]+h)+','+(G[1]+h)+','+(G[2]+h)+')';
  return bild(512,512,(g)=>{
    g.fillStyle=f(-34); g.fillRect(0,0,512,512);
    for(let r=0;r<2;r++) for(let i=0;i<2;i++){ const x=i*256, y=r*256, h=Math.floor(zufall()*14)-7;
      g.fillStyle=f(h); g.fillRect(x+4,y+4,248,248); g.fillStyle='rgba(255,255,255,.12)'; g.fillRect(x+4,y+4,248,8); g.fillStyle='rgba(0,0,0,.16)'; g.fillRect(x+4,y+238,248,14);
      g.fillStyle=f(h+22); for(let n=0;n<6;n++){ [[22+n*42,20],[22+n*42,230]].forEach(p=>{ g.beginPath(); g.arc(x+p[0],y+p[1],5,0,7); g.fill(); }); } }
  });
}
/* Wandstück mit gekacheltem Bild (Kachel 4,4 breit und hoch) */
function wandStueck(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const quer=Math.max(w,d); t.repeat.set(quer/4.4,h/4.4); t.offset.set(((w>d?x-w/2:z-d/2)/4.4)%1,((y-h/2)/4.4)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* Licht für alle Räume. opt: himmel, grund, staerke, sonne, sonneStaerke */
function licht(sc,opt){
  sc.add(new THREE.HemisphereLight(opt.himmel||0xd8f4ff,opt.grund||0x2c5a66,opt.staerke||.85));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xcdeeff,opt.sonneStaerke||.42); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
}
/* Raumhülle für Räume IN der Station: Licht, Metallboden, Wände (hinten, links, rechts), Streben, Rohre oben, Leuchtleisten, niedriger Fußsockel.
   Passend dazu in der Raum-Datei: oben: UW.OBEN (Farbverlauf über den Wänden).
   opt: B,T,H, himmel, grund, staerke, sonne, sonneStaerke, wand [r,g,b], boden [r,g,b], strebe (Farbe), leuchte (Farbe der Leisten),
        streben [z-Werte an den Seitenwänden], pfosten [x-Werte an der Rückwand], oeffnung {x,b,h} (Loch in der Rückwand, wenn hinter dem Ausgang etwas zu sehen sein soll),
        bodenLoch {x,z,b,t} (rechteckiges Loch im Boden, z. B. Tauchbecken) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6;
  sc.background=new THREE.Color(0x04141f); licht(sc,opt);
  const bt=plattenBild(opt.boden||[92,124,134]); bt.wrapS=bt.wrapT=THREE.RepeatWrapping;
  const bmat=new THREE.MeshLambertMaterial({map:bt}), L=opt.bodenLoch;
  const flaeche=(x1,x2,z1,z2)=>{ const w=x2-x1, d=z2-z1; if(w<.01||d<.01) return; const geo=new THREE.PlaneGeometry(w,d,Math.max(1,Math.round(w*2)),Math.max(1,Math.round(d*2))), uv=geo.attributes.uv;
    if(uv) for(let i=0;i<uv.count;i++) uv.setXY(i,(x1+uv.getX(i)*w)/5,(-z2+uv.getY(i)*d)/5);
    const m=new THREE.Mesh(geo,bmat); m.rotation.x=-Math.PI/2; m.position.set((x1+x2)/2,0,(z1+z2)/2); m.receiveShadow=true; sc.add(m); };
  if(L){ const a=L.x-L.b/2, b=L.x+L.b/2, c=L.z-L.t/2, d=L.z+L.t/2; flaeche(-B/2,a,-T/2,T/2); flaeche(b,B/2,-T/2,T/2); flaeche(a,b,-T/2,c); flaeche(a,b,d,T/2); }
  else flaeche(-B/2,B/2,-T/2,T/2);
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x08202c)); aussen.rotation.x=-Math.PI/2; aussen.position.y=L?-3.2:-.06; sc.add(aussen);
  /* Rund um den Raum laufen dunklere Stahlplatten weiter, damit er beim Drehen nicht wie eine schwebende Platte wirkt (nie unter dem Raum, wegen Becken) */
  const at=plattenBild(opt.boden||[92,124,134]); at.wrapS=at.wrapT=THREE.RepeatWrapping;
  const amat=new THREE.MeshLambertMaterial({map:at,color:0x6a7c86}), R=16;
  [[R,T+2*R,-B/2-.5-R/2,0],[R,T+2*R,B/2+.5+R/2,0],[B+1,R,0,T/2+R/2],[B+1,R,0,-T/2-.5-R/2]].forEach(([w,d,x,z])=>{ const geo=new THREE.PlaneGeometry(w,d), uv=geo.attributes.uv;
    if(uv) for(let i=0;i<uv.count;i++) uv.setXY(i,uv.getX(i)*w/5,uv.getY(i)*d/5);
    const m=new THREE.Mesh(geo,amat); m.rotation.x=-Math.PI/2; m.position.set(x,-.035,z); sc.add(m); });
  const tex=plattenBild(opt.wand||[70,118,132]), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    wandStueck(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); wandStueck(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); if(H-o.h>.01) wandStueck(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else wandStueck(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  wandStueck(links,tex,.5,H,T,-B/2-.25,H/2,0); wandStueck(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.strebe||METALL2, leucht=basis(opt.leuchte||0x60f0e0), s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  box(s[0],B+1,.34,.7,f,0,H+.12,-T/2-.2);
  (opt.pfosten||[-13,-6.5,6.5,13]).forEach(x=>{ box(s[0],.55,H,.3,f,x,H/2,-T/2+.15); box(s[0],.85,.3,.5,f,x,H-.15,-T/2+.2); box(s[0],.85,.4,.5,f,x,.2,-T/2+.2); [1.2,2.4,3.6,4.8].forEach(y=>ball(s[0],.08,MESSING,x,y,-T/2+.33)); });
  const querRohr=(p,y,z,r,farbe)=>{ const m=walze(p,r,B,farbe,0,y,z); m.rotation.z=Math.PI/2; };
  querRohr(s[0],H-.55,-T/2+.5,.14,ORANGE); querRohr(s[0],H-.95,-T/2+.42,.09,TUERKIS);
  [-1,1].forEach((v,i)=>{ const w=s[i+1]; box(w,.2,.28,T,f,v*(B/2-.07),.14,0); box(w,.7,.34,T+1,f,v*(B/2+.2),H+.12,0); box(w,.06,.08,T-1,leucht,v*(B/2-.03),H-.5,0);
    const m=walze(w,.12,T,i?TUERKIS:ORANGE,v*(B/2-.35),H-1,0); m.rotation.x=Math.PI/2;
    (opt.streben||[-9,-3,3,9]).forEach(z=>{ box(w,.34,H,.6,f,v*(B/2-.17),H/2,z); [1.2,2.4,3.6].forEach(y=>ball(w,.08,MESSING,v*(B/2-.36),y,z)); }); });
  s.forEach(verschmelze);
  const fuss=gruppe(sc,0,0,0); [-1,1].forEach(v=>{ for(let z=-T/2+.6;z<T/2;z+=1.2) box(fuss,.42,.36+(Math.abs(Math.round(z*7))%3)*.03,1.12,f,v*(B/2+.27),.18,z); }); verschmelze(fuss);
  return { sc, B, T, H, hinten, links, rechts };
}
const OBEN=['3,16,26','8,44,62','24,86,104'];

/* ---------- Meerbewohner (alle schauen nach +x) ---------- */
/* Fisch aus Kugel, Schwanzflosse und Augen. Gibt {g, schwanz} zurück; Größe gr (1 = etwa 1 Einheit lang) */
function fisch(par,farbe,farbe2,x,y,z,gr){
  const g=gruppe(par,x,y,z), s=gr||1; g.scale.set(s,s,s);
  const r=gruppe(g,0,0,0); ball(r,.3,farbe,0,0,0,1.5,1,.55); ball(r,.3,farbe2,-.06,0,0,.28,1.04,.59); const rf=kegel(r,.14,.26,farbe2,-.04,.32,0); rf.scale.z=.03; rf.rotation.z=.35;
  [-1,1].forEach(v=>{ ball(r,.07,0xffffff,.27,.07,v*.135,1,1,.5); ball(r,.035,0x101418,.29,.07,v*.17,1,1,.5); });
  const schwanz=gruppe(g,-.4,0,0), k=kegel(schwanz,.24,.34,farbe2,-.15,0,0); k.rotation.z=-Math.PI/2; k.scale.x=.24; k.scale.z=.04;
  verschmelze(r); g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
  return { g, schwanz };
}
/* Schwimmender Fisch auf einer Ellipse um (cx,h,cz) mit Radien rx, rz. tempo negativ = andere Richtung. par optional (sonst Szene) */
function schwimmer(k,cx,h,cz,rx,rz,tempo,start,farbe,farbe2,gr,par){
  const f=fisch(par||k.scene,farbe,farbe2,cx,h,cz,gr);
  k.anim.push(t=>{ const a=t*tempo+start, dx=-Math.sin(a)*rx*Math.sign(tempo||1), dz=Math.cos(a)*rz*Math.sign(tempo||1);
    f.g.position.set(cx+Math.cos(a)*rx,h+Math.sin(t*1.7+start)*.18,cz+Math.sin(a)*rz); f.g.rotation.y=Math.atan2(-dz,dx); f.schwanz.rotation.y=Math.sin(t*9+start*3)*.5; });
  return f.g;
}
/* Aufsteigende Blasen: Säule an (x,z) von y0 bis y0+hoehe */
function blasen(k,par,x,y0,z,anzahl,hoehe,gr){
  const m=basis(0xdff8ff,{transparent:true,opacity:.55}), liste=[];
  for(let i=0;i<anzahl;i++){ const b=ball(par,(gr||.09)*(.6+zufall()*.8),m,x,y0,z); b.castShadow=false; liste.push({b,p:i/anzahl+zufall()*.08,d:zufall()*6}); }
  k.anim.push(t=>{ liste.forEach(o=>{ const a=(t*.28+o.p)%1; o.b.position.set(x+Math.sin(t*2.1+o.d)*.14,y0+a*hoehe,z+Math.cos(t*1.8+o.d)*.1); }); });
}
/* Wiegendes Seegras-Büschel */
function seegras(k,par,x,y,z,h,farbe){
  const g=gruppe(par,x,y,z), halme=[];
  for(let i=0;i<5;i++){ const a=i*1.26, hh=h*(.65+(i%3)*.18), s=gruppe(g,Math.cos(a)*.18,0,Math.sin(a)*.18); const b=ball(s,.5,i%2?farbe||GRUEN:0x2e8a58,0,hh/2,0,.17,hh,.07); b.rotation.y=a; halme.push(s); }
  k.anim.push(t=>{ halme.forEach((s,i)=>{ s.rotation.z=Math.sin(t*1.3+x+i)*.14; s.rotation.x=Math.cos(t*1.1+z+i*2)*.08; }); });
  return g;
}
/* Meerwasser-Bild (Farbverlauf mit Lichtstrahlen, fernen Felsen und Pflanzen) für Fenster */
function meerBild(w,h){
  return bild(w||1024,h||256,(g,W,H)=>{ const v=g.createLinearGradient(0,0,0,H); v.addColorStop(0,'#58c8e0'); v.addColorStop(.55,'#1a7aa8'); v.addColorStop(1,'#0a3a60'); g.fillStyle=v; g.fillRect(0,0,W,H);
    g.fillStyle='rgba(220,250,255,.1)'; for(let i=0;i<7;i++){ const x=(i+.3)*W/7; g.beginPath(); g.moveTo(x,0); g.lineTo(x+W*.035,0); g.lineTo(x-W*.03,H); g.lineTo(x-W*.09,H); g.fill(); }
    g.fillStyle='rgba(8,50,72,.75)'; g.beginPath(); g.moveTo(0,H); for(let x=0;x<=W;x+=W/16) g.lineTo(x,H*(.72+zufall()*.2)); g.lineTo(W,H); g.fill();
    for(let i=0;i<26;i++){ const x=zufall()*W, hh=H*(.12+zufall()*.22); g.strokeStyle=['#1c7a58','#a85a88','#c87848'][i%3]; g.lineWidth=5; g.beginPath(); g.moveTo(x,H); g.quadraticCurveTo(x+14,H-hh*.6,x-6,H-hh); g.stroke(); } });
}
/* Großes Fenster ins Meer in einer Wandgruppe, Blick nach +z (für Seitenwände die Gruppe drehen). Fische schwimmen davor hin und her. */
function meerFenster(k,par,w,h,x,y,z,fische){
  const g=gruppe(par,x,y,z);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:meerBild(1024,Math.max(128,Math.round(1024*h/w)))})); m.position.z=.02; g.add(m);
  const rahmen=gruppe(g,0,0,0); [-1,1].forEach(s=>{ box(rahmen,w+.4,.22,.24,METALL,0,s*(h/2+.08),.12); box(rahmen,.22,h+.4,.24,METALL,s*(w/2+.08),0,.12); });
  for(let i=-3;i<=3;i++) [-1,1].forEach(s=>ball(rahmen,.07,MESSING,i*w/6.4,s*(h/2+.08),.26)); verschmelze(rahmen);
  const F=[[0xf08a2a,0xffffff],[0xffd23a,0x2f7fd0],[0x4ac8f0,0x1a4a90],[0xf07aa0,0xffd23a],[0x8ae05a,0x207a50]];
  for(let i=0;i<(fische===undefined?4:fische);i++){ const f=fisch(g,F[i%5][0],F[i%5][1],0,0,.1,.5+(i%3)*.12); f.g.scale.z*=.25;
    const tempo=.35+(i%3)*.13, weg=w-1.4, yy=-h/2+.45+((i*.37+.1)%1)*(h-.9);
    k.anim.push(t=>{ const u=(t*tempo+i*w*.31)%(2*weg), hin=u<weg; f.g.position.set(-weg/2+(hin?u:2*weg-u),yy+Math.sin(t*1.5+i)*.12,.1+i*.012); f.g.rotation.y=hin?0:Math.PI; f.schwanz.rotation.y=Math.sin(t*8+i)*.5; }); }
  return g;
}
/* Krake Kiki (freundlich, lila). Schaut nach +z. winkt mit einem Arm. gr 1 = etwa 2 hoch. Gibt die Gruppe zurück */
function kiki(k,par,x,y,z,gr){
  const g=gruppe(par,x,y,z), s=gr||1; g.scale.set(s,s,s); const F=0xb45ad0, D=0x8a3aa8, H=0xe8a8f0;
  const kopf=gruppe(g,0,0,0); ball(kopf,.7,F,0,1.35,0,1,1.1,.95); [[-.25,2,.4],[.3,1.9,.45],[.05,2.08,.2]].forEach(p=>ball(kopf,.09,H,p[0],p[1],p[2],1,1,.5));
  [-1,1].forEach(v=>{ ball(kopf,.19,0xffffff,v*.25,1.38,.6,1,1.15,.6); ball(kopf,.09,0x14101c,v*.24,1.36,.72,1,1.1,.6); ball(kopf,.03,0xffffff,v*.21,1.41,.78); ball(kopf,.09,0xf07aa0,v*.46,1.12,.55,1,.6,.4); });
  const mund=ring(kopf,.14,.025,0x4a1a5a,0,1.14,.66,Math.PI); mund.rotation.z=Math.PI; verschmelze(kopf);
  const arme=[];
  for(let i=0;i<8;i++){ const a=gruppe(g,0,0,0); a.rotation.y=(i+.5)/8*Math.PI*2; const winkt=i===0, spitze=gruppe(a,0,.85,.35); if(winkt) a.rotation.y=1.25;
    let p=[0,0,0]; const P=winkt?[[0,.05,.45],[0,.5,.75],[0,1.05,.8],[0,1.35,.68]]:[[0,-.5,.3],[0,-.76,.7],[0,-.7,1.05],[0,-.52,1.15]];
    P.forEach((q,j)=>{ strich(spitze,p,q,.17-j*.033,j%2?D:F); ball(spitze,.17-j*.033,F,q[0],q[1],q[2]); p=q; }); verschmelze(spitze); arme.push({spitze,winkt,i}); }
  k.anim.push(t=>{ kopf.position.y=Math.sin(t*1.6)*.05; arme.forEach(a=>{ if(a.winkt) a.spitze.rotation.z=Math.sin(t*3.4)*.45; else a.spitze.rotation.x=Math.sin(t*1.8+a.i)*.09; }); });
  return g;
}
/* Delfin Dori (freundlich, blaugrau). Schaut nach +x. gr 1 = etwa 3 lang. Gibt {g, schwanz} zurück */
function dori(par,x,y,z,gr){
  const g=gruppe(par,x,y,z), s=gr||1; g.scale.set(s,s,s); const F=0x6aa0c8, B=0xe4f0f6;
  const r=gruppe(g,0,0,0); ball(r,.55,F,0,0,0,1.9,1,.85); ball(r,.5,B,.1,-.12,0,1.75,.85,.8); ball(r,.42,F,.82,.1,0,1.1,1,.9);
  const schnauze=ball(r,.17,F,1.35,-.04,0,1.9,.7,.85); schnauze.rotation.z=-.1; ball(r,.14,B,1.33,-.12,0,1.8,.55,.8); strich(r,[1.1,-.12,.18],[1.58,-.09,.07],.015,0x2a4a60);
  [-1,1].forEach(v=>{ ball(r,.085,0xffffff,1.05,.17,v*.32,1,1,.5); ball(r,.05,0x101418,1.08,.17,v*.36,1,1,.5); const fl=ball(r,.3,F,.15,-.34,v*.5,1.1,.14,.7); fl.rotation.x=v*.5; fl.rotation.y=v*.5; });
  const rf=kegel(r,.3,.62,F,-.1,.66,0); rf.rotation.z=.55; rf.scale.z=.05;
  const schwanz=gruppe(g,-.9,0,0); ball(schwanz,.28,F,-.15,0,0,1.8,.65,.55); [-1,1].forEach(v=>{ const fl=ball(schwanz,.3,F,-.66,0,v*.24,.75,.12,1.1); fl.rotation.y=v*.55; });
  verschmelze(r); verschmelze(schwanz);
  return { g, schwanz };
}
/* Zahlenschloss (golden, drei Felder), Blick nach +z */
function zahlenschloss(par,x,y,z){
  const g=gruppe(par,x,y,z); box(g,.85,.62,.22,MESSING,0,0,0); ring(g,.26,.075,0x9aa3ad,0,.31,0,Math.PI); [-.24,0,.24].forEach(v=>{ box(g,.19,.28,.04,0xfff3cf,v,-.02,.12); box(g,.045,.15,.02,0x2a1a08,v,-.02,.15); });
  return g;
}
return { METALL, METALL2, DUNKEL, WEISS, GELB, ORANGE, ROT, TUERKIS, BLAU, GRUEN, ROSA, LILA, SAND, MESSING, OBEN, plattenBild, wandStueck, licht, huelle, fisch, schwimmer, blasen, seegras, meerBild, meerFenster, kiki, dori, zahlenschloss };
})();

/* Raum 1: Die Taucherschleuse. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das Tauchbecken im Boden. Die Gitter-Abdeckung mit dem Schloss fährt auf Schienen nach rechts, die Figur taucht hinab. */
RAEUME3D.unterwasser[0] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, GELB, ORANGE, ROT, TUERKIS, BLAU, GRUEN, ROSA, LILA, SAND, MESSING } = UW;
const HOLZ=0xb8844a, HOLZ2=0x7a5230, SCHWARZ=0x1c262c, NAVY=0x1f4f8a, NAVY2=0x153660, FLIESE=0xd8f2f4, PETROL=0x2a8a9a;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* flache Fläche mit gemaltem Bild */
const tafel=(p,tex,w,h,x,y,z)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex})); m.position.set(x,y,z); p.add(m); return m; };
/* flacher Körper aus einem Umriss (Punkte [x,y]), Dicke d nach vorn und hinten */
const flachform=(p,punkte,d,c,x,y,z)=>{ const f=new THREE.Shape(); punkte.forEach((q,i)=>i?f.lineTo(q[0],q[1]):f.moveTo(q[0],q[1]));
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:d,bevelEnabled:false}),typeof c==='number'?mat(c):c); m.position.set(x,y,z-d/2); m.castShadow=true; m.receiveShadow=true; p.add(m); return m; };
const sternPunkte=(r)=>{ const P=[]; for(let i=0;i<10;i++){ const a=Math.PI/2+i*Math.PI/5, d=i%2?r*.45:r; P.push([Math.cos(a)*d,Math.sin(a)*d]); } return P; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

/* aufsteigende Blasen als eine Instanz-Gruppe (ein Zeichenaufruf je Säule) */
const blasen=(k,par,x,y0,z,anzahl,hoehe,gr)=>{
  const im=new THREE.InstancedMesh(GEO.sph,basis(0xdff8ff,{transparent:true,opacity:.55,depthWrite:false}),anzahl); im.frustumCulled=false; par.add(im);
  const o=new THREE.Object3D(), L=[]; for(let i=0;i<anzahl;i++) L.push({ p:i/anzahl+zufall()*.08, d:zufall()*6, r:gr*(.6+zufall()*.8) });
  const setze=t=>{ L.forEach((q,i)=>{ const a=(t*.28+q.p)%1; o.position.set(x+Math.sin(t*2.1+q.d)*.14,y0+a*hoehe,z+Math.cos(t*1.8+q.d)*.1); o.scale.set(q.r,q.r,q.r); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; };
  setze(0); k.anim.push(setze);
};
/* wiegendes Seegras: die Halme sind zusammengefasst, das Büschel schwankt als Ganzes */
const gras=(k,par,x,y,z,h,farbe)=>{
  const g=gruppe(par,x,y,z);
  for(let i=0;i<5;i++){ const a=i*1.26, hh=h*(.65+(i%3)*.18), b=ball(g,.5,i%2?farbe||GRUEN:0x2e8a58,Math.cos(a)*.18,hh/2,Math.sin(a)*.18,.17,hh,.07); b.rotation.set(Math.sin(a)*.12,a,-Math.cos(a)*.14); }
  verschmelze(g); ohneSchatten(g);
  k.anim.push(t=>{ g.rotation.z=Math.sin(t*1.3+x+z)*.09; g.rotation.x=Math.cos(t*1.1+z+x)*.06; });
};

/* ---------- Ausgang: Tauchbecken ---------- */
const BX=0, BZ=-8, LB=5.6, LT=4, WEG=6.3;
function baueBecken(k,sc){
  /* Beckenschacht: Wände und Grund (selbstleuchtend, damit das Wasser hell wirkt) */
  const schacht=gruppe(sc,BX,0,BZ), wm=basis(0x1d7fa8), wm2=basis(0x156a92), fm=basis(0x8ad8e8), gm=basis(0x0e5a80);
  [-1,1].forEach(s=>{ box(schacht,.1,3.1,LT+.2,wm2,s*(LB/2+.05),-1.56,0).castShadow=false; box(schacht,LB,3.1,.1,wm,0,-1.56,s*(LT/2+.05)).castShadow=false; });
  box(schacht,LB,.06,LT,gm,0,-3.12,0).castShadow=false;
  [-.55,-1.35,-2.15].forEach(y=>{ box(schacht,LB-.02,.05,.02,fm,0,y,-LT/2+.012).castShadow=false; [-1,1].forEach(s=>box(schacht,.02,.05,LT-.02,fm,s*(LB/2-.012),y,0).castShadow=false); });
  for(let i=-2;i<=2;i++) box(schacht,.05,3.0,.02,fm,i*1.05,-1.55,-LT/2+.018).castShadow=false;
  /* Seesterne und Kiesel am Grund */
  [[-1.7,.8,0xf07a2a],[1.5,-.9,0xe04a8a],[.6,1.1,0xffd23a]].forEach(([x,z,f],i)=>{ const t=flachform(schacht,sternPunkte(.38),.08,basis(f),x,-3.04+i*.008,z); t.rotation.x=-Math.PI/2; t.castShadow=false; });
  const kiesel=basis(0x4aa0b8); for(let i=0;i<14;i++) ball(schacht,.1+zufall()*.1,kiesel,-2.5+zufall()*5,-3.05,-1.7+zufall()*3.4,1,.55,1).castShadow=false;
  verschmelze(schacht); ohneSchatten(schacht);
  /* Unterwasserlampen */
  const lm1=basis(0xfff6c0); [-1.6,1.6].forEach(x=>{ const t=ball(sc,.2,lm1,BX+x,-1.2,BZ-LT/2+.03,1,1,.3); t.castShadow=false; schein(sc,'rgba(150,240,255,.5)',BX+x,-1.2,BZ-LT/2+.4,1.5); });
  gras(k,sc,BX-2.35,-3.1,BZ-1.45,1.3); gras(k,sc,BX+2.35,-3.1,BZ+1.2,1.0,0x5ac070);
  /* Blasen im Becken (bleiben unter der Wasserfläche) */
  blasen(k,sc,BX-1.4,-2.95,BZ-.6,9,2.65,.12); blasen(k,sc,BX+1.1,-2.95,BZ+.5,8,2.65,.1); blasen(k,sc,BX+.1,-2.95,BZ-1.2,6,2.65,.08);
  /* bewegte Wasserfläche */
  const tex=bild(256,256,(g)=>{ g.fillStyle='#34b8d8'; g.fillRect(0,0,256,256); g.lineWidth=4;
    for(let r=0;r<8;r++){ g.strokeStyle=r%2?'rgba(235,255,255,.75)':'rgba(140,235,245,.8)'; g.beginPath(); for(let x=0;x<=256;x+=8){ const y=16+r*32+Math.sin(x/256*Math.PI*4+r*1.7)*9; x?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); } });
  tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
  const wasser=new THREE.Mesh(new THREE.PlaneGeometry(LB,LT),new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:.55,depthWrite:false}));
  wasser.rotation.x=-Math.PI/2; wasser.position.set(BX,-.16,BZ); sc.add(wasser);
  k.anim.push(t=>{ tex.offset.set((t*.035)%1,Math.sin(t*.5)*.08); wasser.position.y=-.16+Math.sin(t*1.4)*.025; });
  /* Beckenrand aus hellen und türkisen Fliesen */
  const rand=gruppe(sc,BX,0,BZ);
  for(let i=0;i<11;i++){ const x=-3.0+i*.6; [-1,1].forEach(s=>{ if(s<0 || Math.abs(x)>.9) box(rand,.58,.3,.5,i%2?FLIESE:TUERKIS,x,.15,s*(LT/2+.25)); }); }
  /* flacher Einstieg vorn in der Mitte: hier steigt die Figur ins Wasser */
  box(rand,1.76,.02,.5,METALL,0,.012,LT/2+.25); for(let i=0;i<5;i++) box(rand,.18,.012,.4,GELB,-.64+i*.32,.028,LT/2+.25);
  for(let i=0;i<7;i++){ const z=-1.714+i*.5714; [-1,1].forEach(s=>box(rand,.5,.296,.55,i%2?TUERKIS:FLIESE,s*(LB/2+.25),.148,z)); }
  /* Schienen, auf denen die Abdeckung fährt */
  box(rand,12.7,.06,.14,METALL2,3.15,.33,-2.2); box(rand,2.32,.06,.14,METALL2,-2.04,.33,2.2); box(rand,8.62,.06,.14,METALL2,5.19,.33,2.2);
  [-1,1].forEach(s=>{ for(let x=3.7;x<=9.5;x+=1.15){ box(rand,.16,.3,.24,DUNKEL,x,.15,s*2.2); } box(rand,.2,.3,.3,ORANGE,9.55,.45,s*2.2); });
  verschmelze(rand); ohneSchatten(rand);
  /* Abdeckung: Rahmen mit Gitterstäben, durch die man das Wasser sieht */
  const deckel=gruppe(sc,BX,0,BZ), platte=gruppe(deckel,0,0,0);
  [-1,1].forEach(s=>{ box(platte,6.0,.16,.34,METALL,0,.45,s*2.03); box(platte,.34,.158,3.72,METALL,s*2.83,.449,0);
    for(let i=0;i<14;i++) box(platte,.2,.012,.24,i%2?SCHWARZ:GELB,-2.7+i*.415,.537,s*2.03);
    [-1,1].forEach(v=>ball(platte,.12,MESSING,s*2.83,.54,v*2.03,1,.6,1)); });
  for(let i=1;i<14;i++) box(platte,.13,.1,3.72,METALL2,-2.66+i*.38,.44,0);
  [-.65,.65].forEach(z=>box(platte,5.36,.06,.18,METALL,0,.505,z));
  /* Griffbügel */
  [1.9,-.2].forEach(x=>{ [-.4,.4].forEach(d=>walze(platte,.06,.28,ORANGE,x+d,.66,.65)); strich(platte,[x-.4,.8,.65],[x+.4,.8,.65],.07,ORANGE); });
  verschmelze(platte);
  /* Sockel mit kleiner Tafel für das Schloss, vorn links (verschwindet beim Öffnen mit dem Schloss) */
  const sockel=gruppe(deckel,-2.0,0,0);
  box(sockel,.7,.1,.55,DUNKEL,0,.57,1.82); box(sockel,.22,.8,.18,METALL2,0,1.0,1.78); box(sockel,.98,.74,.1,METALL,0,1.7,1.77);
  [-1,1].forEach(s=>box(sockel,.07,.66,.04,GELB,s*.43,1.7,1.84));
  verschmelze(sockel);
  const schloss=UW.zahlenschloss(deckel,-2.0,1.62,1.95); schloss.scale.set(1.15,1.15,1.15); verschmelze(schloss);
  /* Signallampen auf Pfosten hinter dem Becken: rot, bei offenem Ausgang grün */
  const am=basis(0xff5a4a);
  const pf=gruppe(sc,0,0,0); [-3.7,3.7].forEach(x=>{ walze(pf,.28,.12,DUNKEL,BX+x,.06,-11.15); walze(pf,.1,1.5,METALL,BX+x,.8,-11.15); [.45,.85,1.25].forEach(y=>walze(pf,.125,.14,GELB,BX+x,y,-11.15)); walze(pf,.24,.12,DUNKEL,BX+x,1.58,-11.15); k.kreis(BX+x,-11.15,.3); }); verschmelze(pf); ohneSchatten(pf);
  const lampen=gruppe(sc,0,0,0); [-3.7,3.7].forEach(x=>{ ball(lampen,.24,am,BX+x,1.82,-11.15).castShadow=false; }); verschmelze(lampen);
  const licht=new THREE.PointLight(0x70f0ff,.7,11,1.5); licht.position.set(BX,1.2,BZ); sc.add(licht);
  k.kasten(3.15,BZ,12.9,5.0);
  return ausgang(k,{ name:'Tauchbecken', einfach:'Becken mit Wasser', steh:[BX,-4.6], durch:[BX,-6.6], tief:true,
    treffer:{x:BX,y:.9,z:BZ+.1,b:6.6,h:1.8,t:5.0}, schildOben:[BX,3.0,BZ], glanz:[BX-2.0,1.75,BZ+2.35],
    bewege:(auf)=>{ deckel.position.x=BX+auf*WEG; schloss.visible=sockel.visible=auf<.04; am.color.setHex(auf>.15?0x5aff7a:0xff5a4a); licht.intensity=.7+auf*.9; } });
}

/* ---------- Bullauge in einer Seitenwand ---------- */
function bullauge(k,par,tex,seite,y,z,r,nr){
  const g=gruppe(par,seite*17.98,y,z); g.rotation.y=-seite*Math.PI/2;
  const m=new THREE.Mesh(new THREE.CircleGeometry(r,36),new THREE.MeshBasicMaterial({map:tex})); m.position.z=.02; g.add(m);
  const rahmen=gruppe(g,0,0,0); ring(rahmen,r+.08,.17,METALL,0,0,.12); ring(rahmen,r+.3,.07,METALL2,0,0,.06);
  for(let i=0;i<10;i++){ const a=i*Math.PI/5; ball(rahmen,.08,MESSING,Math.cos(a)*(r+.08),Math.sin(a)*(r+.08),.28); }
  verschmelze(rahmen); ohneSchatten(rahmen);
  const F=[[0xf08a2a,0xffffff],[0xffd23a,0x2f7fd0],[0xf07aa0,0xffd23a],[0x8ae05a,0x207a50]];
  for(let i=0;i<2;i++){ const f=UW.fisch(g,F[(nr+i)%4][0],F[(nr+i)%4][1],0,0,.1,.5-i*.08); f.g.scale.z*=.2;
    const weg=(r-.5), tempo=.45+i*.17+nr*.04;
    k.anim.push(t=>{ const a=t*tempo+i*2.6+nr; f.g.position.set(Math.sin(a)*weg,(i?-.32:.3)+Math.sin(t*1.5+i+nr)*.07,.1+i*.012); f.g.rotation.y=Math.cos(a)>0?0:Math.PI; f.schwanz.rotation.y=Math.sin(t*8+i+nr)*.5; }); }
}

/* ---------- Wassersäule mit Fischen ---------- */
function saeule(k,sc,x,z,nr){
  const g=gruppe(sc,x,0,z), fest=gruppe(g,0,0,0);
  walze(fest,.8,.14,DUNKEL,0,.07,0); walze(fest,.66,.4,METALL2,0,.34,0); reif(fest,.66,.06,MESSING,0,.54,0); walze(fest,.56,.08,SAND,0,.58,0);
  walze(fest,.66,.24,METALL2,0,3.12,0); reif(fest,.66,.06,MESSING,0,3.0,0); ball(fest,.42,METALL,0,3.24,0,1,.5,1);
  [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78; walze(fest,.035,2.46,METALL,Math.cos(a)*.62,1.78,Math.sin(a)*.62); });
  verschmelze(fest); if(nr>1) ohneSchatten(fest);
  const glas=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,2.4,24,1,true),basis(0x6ad8f0,{transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide})); glas.position.y=1.8; g.add(glas);
  gras(k,g,0,.6,0,1.1,nr%2?0x5ac070:ROSA);
  blasen(k,g,.12,.7,-.1,8,2.2,.07);
  /* Fische nur in den beiden hinteren Säulen */
  if(nr<2){ UW.schwimmer(k,0,1.55,0,.27,.27,.9,nr,nr?GELB:ORANGE,nr?BLAU:WEISS,.32,g);
    UW.schwimmer(k,0,2.35,0,.25,.25,-.7,nr+2,nr?ROSA:0x8ae05a,nr?GELB:0x207a50,.3,g); }
  else { gras(k,g,.1,.6,.12,1.7,0x5ac070); blasen(k,g,-.18,.7,.14,6,2.2,.06); }
  k.kreis(x,z,.82); k.verdecker(g,x,z,.8);
}

/* ---------- Krebs: schaut nach +z und läuft seitwärts ---------- */
function krebs(k,punkte,tempo){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0), F=0xe8553a, D=0xb8321e;
  ball(r,.34,F,0,.36,0,1.25,.65,.95); ball(r,.28,0xff8a62,0,.3,.07,1.15,.55,.95);
  [-1,1].forEach(s=>{ walze(r,.035,.26,D,s*.14,.62,.18); ball(r,.095,0xffffff,s*.14,.79,.18); ball(r,.048,0x101418,s*.14,.8,.26);
    strich(r,[s*.28,.36,.18],[s*.52,.46,.38],.055,D); ball(r,.15,F,s*.58,.54,.42,.9,1.1,.8);
    const a=kegel(r,.07,.2,F,s*.51,.73,.43); a.rotation.z=s*.3; const b=kegel(r,.055,.15,D,s*.67,.7,.43); b.rotation.z=-s*.35; });
  const mund=ring(r,.08,.017,0x5a1008,0,.39,.35,Math.PI); mund.rotation.z=Math.PI;
  verschmelze(r);
  const beine=[];
  [-1,1].forEach(s=>[-.18,0,.18].forEach((z,i)=>{ const b=gruppe(g,s*.32,.3,z-.05); strich(b,[0,0,0],[s*.24,.08,z*.4],.035,D); strich(b,[s*.24,.08,z*.4],[s*.36,-.27,z*.6],.028,D); beine.push([b,i,s]); }));
  k.anim.push(t=>{ beine.forEach(([b,i,s])=>{ b.rotation.z=Math.sin(t*9+i*2.1+(s>0?1.6:0))*.22; }); });
  ohneSchatten(g); laeufer(k,g,punkte,tempo,0,9);
}

function baue(k){
  const sc=k.scene;
  const h=UW.huelle(k,{ B:36, T:27, H:6, wand:[66,122,136], boden:[104,142,150], staerke:.84, sonneStaerke:.4,
    pfosten:[-16.9,-4.75,4.75,16.9], streben:[-10.5,-3.6,4.8,11.4], bodenLoch:{x:BX,z:BZ,b:LB,t:LT} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;

  const tuer=baueBecken(k,sc);

  /* ---------- großes Meerfenster über dem Becken, Delfin Dori schwimmt vorbei ---------- */
  const fenster=UW.meerFenster(k,hinten,7.4,2.5,0,3.0,-13.5,5);
  const d=UW.dori(fenster,0,0,.17,.6); d.g.scale.z=.1; ohneSchatten(d.g);
  k.anim.push(t=>{ const a=t*.28; d.g.position.set(Math.sin(a)*2.5,.2+Math.sin(t*.9)*.2,.17); d.g.rotation.y=Math.cos(a)>0?0:Math.PI; d.schwanz.rotation.z=Math.sin(t*4)*.2; });

  /* ---------- Bullaugen in den Seitenwänden ---------- */
  const meer=UW.meerBild(256,256);
  bullauge(k,links,meer,-1,2.7,-7.0,1.15,0); bullauge(k,links,meer,-1,2.7,.7,1.15,1);
  bullauge(k,rechts,meer,1,2.7,-7.4,1.15,2); bullauge(k,rechts,meer,1,2.7,8.1,1.15,3);

  /* ---------- Wandschmuck: Rettungsringe, Druckmesser, Ventilräder, Lampen, Leitungen ---------- */
  const wd=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  const rettung=(p,x,y,z)=>{ ring(p,.62,.19,WEISS,x,y,z); for(let i=0;i<4;i++){ const t=ring(p,.62,.2,ROT,x,y,z+.004,.7); t.rotation.z=i*Math.PI/2+.45; } walze(p,.07,.25,MESSING,x,y+.82,z-.05).rotation.x=Math.PI/2; };
  rettung(wd[0],-6.3,2.7,-13.27); rettung(wd[0],6.3,2.7,-13.27);
  const messer=(p,pw,x,y,z,rot,n)=>{ const g=gruppe(p,x,y,z); g.rotation.y=rot; const a=walze(g,.46,.14,MESSING,0,0,.05); a.rotation.x=Math.PI/2; const b=walze(g,.37,.04,WEISS,0,0,.13); b.rotation.x=Math.PI/2;
    for(let i=0;i<7;i++){ const w=-2.1+i*.7, s=box(g,.035,.1,.02,i>4?ROT:SCHWARZ,Math.sin(w)*.29,Math.cos(w)*.29,.16); s.rotation.z=-w; }
    const q=gruppe(pw,x,y,z); q.rotation.y=rot; const n0=gruppe(q,0,0,.185); box(n0,.05,.32,.02,ROT,0,.12,0).castShadow=false; ball(n0,.06,SCHWARZ,0,0,0,1,1,.5).castShadow=false;
    k.anim.push(t=>{ n0.rotation.z=Math.sin(t*(.7+n*.13)+n*2)*1.1+Math.sin(t*5+n)*.05; }); };
  const nad=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  messer(wd[0],nad[0],-11.7,3.6,-13.45,0,0); messer(wd[0],nad[0],8.3,3.9,-13.45,0,1); messer(wd[0],nad[0],14.6,3.4,-13.45,0,2); messer(wd[0],nad[0],14.6,2.3,-13.45,0,3);
  messer(wd[1],nad[1],-17.93,3.2,-1.5,Math.PI/2,4); messer(wd[1],nad[1],-17.93,2.1,-1.5,Math.PI/2,5);
  messer(wd[2],nad[2],17.93,3.2,-1.6,-Math.PI/2,6); messer(wd[2],nad[2],17.93,3.2,.2,-Math.PI/2,7);
  /* Rohre unten an der Rückwand */
  [[-12.3,-10.9],[-7.1,-4.2],[4.2,9.3],[13.8,16.2]].forEach(([a,b],i)=>{ strich(wd[0],[a,.75,-13.3],[b,.75,-13.3],.11,i%2?ORANGE:TUERKIS); strich(wd[0],[a,.4,-13.35],[b,.4,-13.35],.07,METALL);
    [a,b].forEach(x=>{ box(wd[0],.18,.8,.3,METALL2,x,.55,-13.35); ring(wd[0],.24,.05,ROT,x,1.15,-13.2); strich(wd[0],[x-.22,1.15,-13.2],[x+.22,1.15,-13.2],.025,ROT); }); });
  const lampe=basis(0xfff2b0);
  [-11.15,-6.3,6.3,15.7].forEach(x=>{ box(wd[0],.8,.18,.3,DUNKEL,x,4.35,-13.33); ball(wd[0],.26,lampe,x,4.2,-13.3,1.1,.7,.7).castShadow=false; schein(hinten,'rgba(255,240,170,.45)',x,4.05,-13.0,1.8); });
  [-1,1].forEach(s=>{ const w=wd[s<0?1:2], X=s*17.86;
    strich(w,[X,.8,-9.4],[X,.8,-4.8],.11,s<0?ORANGE:TUERKIS); strich(w,[X,.8,6.0],[X,.8,10.4],.11,s<0?TUERKIS:ORANGE);
    [-9.4,-4.8,6.0,10.4].forEach(z=>{ box(w,.3,1.0,.18,METALL2,X,.5,z); const t=ring(w,.26,.05,ROT,s*17.7,1.35,z); t.rotation.y=Math.PI/2; strich(w,[X,1.35,z],[s*17.68,1.35,z],.04,METALL); });
    [-12.1,-1.0,2.6,10.0].forEach(z=>{ box(w,.2,.5,.34,DUNKEL,s*17.9,4.15,z); ball(w,.2,lampe,s*17.76,4.15,z,.7,1,.9).castShadow=false; }); });
  /* Rettungsringe und aufgerollte Leinen an den Seitenwänden */
  const seil=(w,s,z)=>{ const x=s*17.84; [.5,.42,.34].forEach((r,i)=>{ const t=ring(w,r,.055,i%2?0xe8d8a8:0xd0b878,x-s*i*.015,2.1,z); t.rotation.y=Math.PI/2; }); box(w,.14,.14,.14,MESSING,x,2.65,z); };
  seil(wd[1],-1,7.6); seil(wd[1],-1,9.0); seil(wd[2],1,3.9); seil(wd[2],1,10.2);
  wd.forEach(verschmelze); wd.concat(nad).forEach(ohneSchatten);

  /* ---------- Rohrbündel in den hinteren Ecken ---------- */
  const ecken=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ const x=s*17.05;
    [[0,-12.7,.34,ORANGE],[-s*.1,-11.95,.22,TUERKIS],[-s*.72,-12.85,.2,METALL]].forEach(([dx,z,r,f])=>{ walze(ecken,r,5.2,f,x+dx,2.6,z); [.3,1.9,3.5].forEach(y=>walze(ecken,r+.08,.18,METALL2,x+dx,y,z)); });
    ring(ecken,.34,.07,ROT,x,1.35,-12.2); strich(ecken,[x-.32,1.35,-12.2],[x+.32,1.35,-12.2],.035,ROT); strich(ecken,[x,1.03,-12.2],[x,1.67,-12.2],.035,ROT);
    k.kasten(s*16.9,-12.45,1.8,1.7); });

  /* ---------- Wasserpumpe mit Schwungrad, Rohr zum Becken ---------- */
  const pumpe=gruppe(sc,-6.7,0,-8.0);
  box(pumpe,2.4,.2,1.5,DUNKEL,0,.1,0); box(pumpe,1.3,.9,1.1,PETROL,-.35,.65,0); box(pumpe,1.4,.12,1.2,METALL,-.35,1.15,0);
  const trommel=walze(pumpe,.5,.8,METALL2,.65,.75,0); trommel.rotation.z=Math.PI/2; [.35,.95].forEach(x=>{ const t=ring(pumpe,.52,.06,MESSING,x,.75,0); t.rotation.y=Math.PI/2; });
  strich(pumpe,[1.0,.75,0],[1.75,.75,0],.2,ORANGE); strich(pumpe,[1.75,.75,0],[2.3,.34,0],.2,ORANGE); strich(pumpe,[2.3,.34,0],[3.4,.34,0],.2,ORANGE); ball(pumpe,.25,ORANGE,1.75,.75,0); ball(pumpe,.25,ORANGE,2.3,.34,0);
  [1.35,2.75].forEach(x=>box(pumpe,.12,.5,.5,METALL2,x,x<2?.75:.34,0));
  walze(pumpe,.14,.8,TUERKIS,-.7,1.5,-.2); ball(pumpe,.18,TUERKIS,-.7,1.9,-.2);
  [-.2,.1].forEach((x,i)=>ball(pumpe,.09,i?0x5aff7a:GELB,x,1.26,.3));
  strich(pumpe,[-.35,.7,.55],[-.35,.7,.72],.08,METALL);
  verschmelze(pumpe);
  const rad=gruppe(pumpe,-.35,.72,.74); ring(rad,.46,.07,GELB,0,0,0); [0,1,2].forEach(i=>{ const s=box(rad,.9,.07,.05,GELB,0,0,0); s.rotation.z=i*Math.PI/3; }); ball(rad,.12,ROT,0,0,.03); verschmelze(rad);
  k.anim.push(t=>{ rad.rotation.z=-t*1.8; });
  k.kasten(-5.6,-8.0,4.8,1.65);

  /* ---------- Wassersäulen ---------- */
  saeule(k,sc,-5.4,-1.4,0); saeule(k,sc,11.7,-6.6,1); saeule(k,sc,-16.4,12.0,2); saeule(k,sc,16.4,11.8,3);

  /* ---------- Warmluftgebläse mit drehendem Flügelrad ---------- */
  const geb=gruppe(sc,16.5,0,2.4);
  const gfest=gruppe(geb,0,0,0); box(gfest,1.1,.16,1.6,DUNKEL,0,.08,0); box(gfest,.3,1.0,.5,METALL2,.15,.6,0);
  const topf=walze(gfest,.9,.5,ORANGE,.15,1.8,0); topf.rotation.z=Math.PI/2; const dk=walze(gfest,.76,.04,SCHWARZ,-.12,1.8,0); dk.rotation.z=Math.PI/2;
  verschmelze(gfest);
  const fl=gruppe(geb,-.18,1.8,0); for(let i=0;i<4;i++){ const a=gruppe(fl,0,0,0); a.rotation.x=i*Math.PI/2; ball(a,.34,METALL,0,.36,.07,.1,1,.55).castShadow=false; } ball(fl,.15,GELB,-.03,0,0); verschmelze(fl);
  k.anim.push(t=>{ fl.rotation.x=t*5; });
  const git=gruppe(geb,-.34,1.8,0); [.34,.62,.86].forEach(r=>{ const t=ring(git,r,.025,DUNKEL,0,0,0); t.rotation.y=Math.PI/2; }); box(git,.03,1.74,.04,DUNKEL,0,0,0); box(git,.03,.04,1.74,DUNKEL,0,0,0); verschmelze(git); ohneSchatten(fl); ohneSchatten(git);
  k.kasten(16.55,2.4,1.3,1.9);

  /* ---------- Süßwasserdusche an einem Pfosten ---------- */
  const dusche=gruppe(sc,-8.9,0,10.2);
  walze(dusche,.34,.1,DUNKEL,0,.05,0); walze(dusche,.09,3.0,METALL,0,1.55,0); strich(dusche,[0,3.05,0],[.85,3.05,0],.08,METALL); ball(dusche,.12,METALL,0,3.05,0);
  kegel(dusche,.32,.3,MESSING,.85,2.9,0); walze(dusche,.33,.05,METALL2,.85,2.74,0);
  ring(dusche,.18,.045,ROT,0,1.5,.14); [.6,2.2].forEach(y=>walze(dusche,.13,.14,TUERKIS,0,y,0));
  box(dusche,1.3,.02,1.3,DUNKEL,.85,.014,0); for(let i=0;i<6;i++) box(dusche,.09,.018,1.15,METALL,.35+i*.2,.031,0);
  verschmelze(dusche); k.kreis(-8.9,10.2,.38);
  const o=new THREE.Object3D(), TR=26, tm=basis(0xbfefff,{transparent:true,opacity:.75});
  const tropfen=new THREE.InstancedMesh(GEO.sph,tm,TR); tropfen.frustumCulled=false; sc.add(tropfen);
  const tp=[]; for(let i=0;i<TR;i++) tp.push({ a:zufall()*6.28, r:zufall()*.28, p:zufall() });
  const regne=t=>{ tp.forEach((q,i)=>{ const f=(t*1.1+q.p)%1, r=q.r*(1+f*.7); o.position.set(-8.05+Math.cos(q.a)*r,2.68-f*f*2.6,10.2+Math.sin(q.a)*r); o.rotation.set(0,0,0); o.scale.set(.035,.09,.035); o.updateMatrix(); tropfen.setMatrixAt(i,o.matrix); }); tropfen.instanceMatrix.needsUpdate=true; };
  regne(0); k.anim.push(regne);

  /* ---------- Sitzbänke aus Holzlatten ---------- */
  const baenke=gruppe(sc,0,0,0);
  const bank=(x,z,l,quer)=>{ const g=gruppe(baenke,x,0,z); g.rotation.y=quer?Math.PI/2:0;
    [-.28,0,.28].forEach(v=>box(g,l,.11,.23,HOLZ,0,.66,v));
    [-l/2+.28,0,l/2-.28].forEach(a=>{ box(g,.14,.6,.7,METALL2,a,.31,0); box(g,.24,.08,.86,DUNKEL,a,.04,0); });
    box(g,l-.4,.08,.1,METALL,0,.26,0);
    k.kasten(x,z,quer?.95:l+.1,quer?l+.1:.95); };
  bank(-3.6,10.9,3.4); bank(9.2,11.0,3.2); bank(-17.0,1.2,3.6,true); bank(-6.8,-5.0,2.4); bank(17.0,-4.4,2.6,true);

  /* ---------- niedrige Pflanzrinnen mit Seegras und Korallen ---------- */
  const rinnen=gruppe(sc,0,0,0);
  const rinne=(x,z,l,quer)=>{ const w=quer?.9:l, t=quer?l:.9;
    box(rinnen,w,.4,t,METALL2,x,.2,z); box(rinnen,w+.1,.1,t+.1,FLIESE,x,.44,z); box(rinnen,w-.2,.04,t-.2,SAND,x,.505,z);
    for(let i=0;i<Math.round(l/.9);i++){ const a=-l/2+.45+i*.9, px=x+(quer?0:a), pz=z+(quer?a:0);
      if(i%2){ const f=[ROSA,ORANGE,LILA,GELB][(i>>1)%4]; strich(rinnen,[px,.5,pz],[px,.95,pz],.07,f); [-1,1].forEach(s=>{ strich(rinnen,[px,.68,pz],[px+s*.24,.95,pz+s*.08],.05,f); ball(rinnen,.09,f,px+s*.24,.97,pz+s*.08); }); ball(rinnen,.1,f,px,.98,pz); }
      else gras(k,sc,px,.5,pz,.8+(i%3)*.15,i%4?0x5ac070:undefined); }
    k.kasten(x,z,w+.15,t+.15); };
  rinne(1.1,12.5,3.6); rinne(-12.4,12.5,3.0); rinne(13.1,12.5,2.8); rinne(-17.05,-4.8,2.2,true); rinne(17.1,5.4,2.0,true);

  /* ---------- Warnpoller am Becken ---------- */
  const poller=gruppe(sc,0,0,0), pl=basis(0x70f0ff);
  [[-3.9,-5.4],[-3.9,-10.0],[10.1,-5.5],[10.1,-10.0]].forEach(([x,z])=>{ walze(poller,.2,.65,GELB,x,.325,z); walze(poller,.215,.14,SCHWARZ,x,.42,z); ball(poller,.15,pl,x,.74,z).castShadow=false; k.kreis(x,z,.24); });

  /* ---------- Bodenzier: Wellenkreis, Leitstreifen, Gitterroste, Gummimatten ---------- */
  const boden=gruppe(sc,0,0,0);
  const flach=(r1,r2,c,x,y,z)=>{ const m=new THREE.Mesh(new THREE.RingGeometry(r1,r2,56),mat(c)); m.rotation.x=-Math.PI/2; m.position.set(x,y,z); m.receiveShadow=true; boden.add(m); };
  flach(3.7,4.0,0x2a8a9a,0,.012,3.2); flach(3.25,3.38,0xd8f2f4,0,.021,3.2); flach(1.5,1.66,0x2a8a9a,0,.012,3.2);
  /* Wellen aus kurzen Strichen im Kreis */
  for(let r=0;r<3;r++) for(let i=0;i<16;i++){ const x=-1.0+i*.133, z=3.2-.55+r*.55+Math.sin(i*.85)*.13, s=box(boden,.17,.014,.11,r===1?0x7ae0e0:0x1f6f90,x,.016+(i%2)*.002,z); s.rotation.y=-Math.cos(i*.85)*.7; }
  for(let i=0;i<16;i++){ const a=i*Math.PI/8, s=box(boden,.55,.012,.16,i%2?0x7ae0e0:0xd8f2f4,Math.cos(a)*4.55,.015,3.2+Math.sin(a)*4.55); s.rotation.y=-a; }
  /* gelbe Leitstreifen vor dem Becken */
  for(let i=0;i<15;i++) box(boden,.5,.014,.2,i%2?SCHWARZ:GELB,-3.5+i*.5,.013,-3.55);
  [-1,1].forEach(s=>[0,1,2].forEach(i=>{ const a=box(boden,.7,.014,.16,0xd8f2f4,s*.27,.017,-3.0+i*.55); a.rotation.y=s*.65; }));
  /* Gitterroste */
  [[-11.2,-7.6],[7.6,-2.8],[-3.6,8.0],[15.0,9.2],[-10.8,-.6]].forEach(([x,z],i)=>{ box(boden,1.8,.016,1.3,DUNKEL,x,.009+i*.0004,z); for(let j=0;j<6;j++) box(boden,.1,.02,1.16,METALL,x-.7+j*.28,.027,z); });
  /* geriffelte Gummimatten */
  [[-14.2,-10.7,3.0,1.5,0x24586a],[4.8,7.9,2.8,2.2,0x2f6a58],[-9.0,-10.9,2.6,1.4,0x24586a]].forEach(([x,z,w,t,f],i)=>{ box(boden,w,.012,t,f,x,.01+i*.0005,z); for(let j=0;j<Math.floor(w/.3);j++) box(boden,.09,.012,t-.2,0x4a9aa0,x-w/2+.24+j*.3,.022,z); });
  /* Wasserleitungen im Boden */
  [[-16.4,3.9,-10.4,3.9],[7.2,-1.2,12.6,-1.2],[11.2,2.8,15.4,2.8]].forEach(([a,z,b],i)=>{ const l=b-a; box(boden,l,.022,.34,DUNKEL,(a+b)/2,.012+i*.001,z); [-.09,.09].forEach((v,j)=>box(boden,l-.2,.012,.07,j?ORANGE:TUERKIS,(a+b)/2,.031,z+v)); });
  /* Nieten im Boden */
  const niet=new THREE.InstancedMesh(GEO.cyl,mat(0x4a7480),140); let n=0;
  for(let r=0;r<10;r++) for(let i=0;i<14;i++){ let x=-16.4+i*2.5+(r%2)*.5, z=-4.8+r*1.9; o.position.set(x,.004,z); o.rotation.set(0,0,0); o.scale.set(.07,.006,.07); o.updateMatrix(); niet.setMatrixAt(n++,o.matrix); }
  niet.frustumCulled=false; niet.receiveShadow=true; sc.add(niet);
  /* Leuchtpunkte entlang der Wände */
  const LP=[]; for(let z=-9.6;z<=10.4;z+=1.6){ LP.push([-15.7,z]); LP.push([15.7,z]); } for(let x=-14.4;x<=14.5;x+=1.6){ if(Math.abs(x)>2) LP.push([x,11.55]); }
  const lms=[basis(0x70f0e0),basis(0x70f0e0)];
  lms.forEach((m,j)=>{ const L=LP.filter((_,i)=>i%2===j), im=new THREE.InstancedMesh(GEO.box,m,L.length); L.forEach((p,i)=>{ o.position.set(p[0],.04,p[1]); o.rotation.set(0,0,0); o.scale.set(.2,.045,.2); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.frustumCulled=false; sc.add(im); });
  k.anim.push(t=>{ lms.forEach((m,j)=>m.color.setHex(Math.sin(t*2.4+j*Math.PI)>0?0xd8fff8:0x2c9a98)); });

  /* ---------- Licht ---------- */
  const l1=new THREE.PointLight(0x8ad8ff,.45,16,1.5); l1.position.set(0,3.8,-11.4); sc.add(l1);
  const l2=new THREE.PointLight(0xffe0a0,.45,13,1.5); l2.position.set(-11,3.4,3.5); sc.add(l2);
  const l3=new THREE.PointLight(0xffe8b0,.4,13,1.5); l3.position.set(10.5,3.4,4.5); sc.add(l3);

  /* ---------- Leben: der kleine Krebs ---------- */
  krebs(k,[[-4.6,1.0],[-2.2,-1.9],[2.8,-2.2],[5.2,.2],[2.2,4.3],[.4,5.1],[-3.8,5.0]],.8);

  /* feste Deko zusammenfassen: Eckrohre, Bänke, Pflanzrinnen, Poller und Bodenzier teilen sich die Farben */
  const deko=gruppe(sc,0,0,0); [boden,ecken,baenke,rinnen,poller].forEach(g=>deko.add(g)); verschmelze(deko); ohneSchatten(deko);
  /* Wandschmuck wirft keine Schatten (die Wand-Gegenstände kommen erst danach dazu) */
  [hinten,links,rechts].forEach(ohneSchatten);

  return { tuer, start:[0,7.2] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-16.2,-10.2],[-11.6,-12.4],[-6.4,-11.9],[-12.4,-8.6],[6.0,-12.2],[15.2,-11.2],[16.2,-8.6],[15.6,-.8],[16.2,7.4],[11.4,11.4],
  [5.8,11.6],[-6.4,11.8],[-14.6,10.2],[-15.9,4.9],[-15.8,-1.6],[-6.8,-3.4],[-9.8,-8.6],[10.4,-3.6],[12.4,3.8],[-1.4,10.0]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { wand:'hinten', x:-9.1, z:-13.5, steh:[-9.1,-11.5], kasten:[2.7,1.5], treffer:[2.7,3.5,1.0], trefferY:.25, baue(g){ /* 1 Tauchanzug am Haken an offener Garderobe: Neoprenanzug mit Kapuze, Streifen und Füßlingen */
      /* offene Garderobe: zwei dünne Metallpfosten und eine Querstange */
      [-1,1].forEach(s=>{ walze(g,.05,3.9,METALL,s*1.34,1.95,.4); box(g,.2,.08,.8,METALL2,s*1.34,.04,.4); ball(g,.09,MESSING,s*1.34,3.92,.4); });
      strich(g,[-1.34,3.84,.4],[1.34,3.84,.4],.05,METALL);
      /* Haken und Bügel */
      ring(g,.11,.035,MESSING,0,3.82,.4).rotation.y=Math.PI/2;
      strich(g,[0,3.74,.4],[0,3.58,.4],.035,MESSING); strich(g,[0,3.58,.4],[-.62,3.18,.4],.05,METALL); strich(g,[0,3.58,.4],[.62,3.18,.4],.05,METALL);
      /* Kapuze mit Gesichtsöffnung */
      ball(g,.33,NAVY,0,3.4,.5,1,1.1,.7); ball(g,.19,SCHWARZ,0,3.38,.7,1,1.15,.35); ring(g,.22,.045,ORANGE,0,3.38,.74).scale.y=1.15;
      /* Rumpf */
      box(g,1.0,.62,.38,NAVY,0,2.78,.45); box(g,.86,.55,.36,NAVY,0,2.22,.45); box(g,.9,.18,.4,SCHWARZ,0,1.94,.45); box(g,.22,.2,.05,MESSING,0,1.94,.66);
      [-1,1].forEach(s=>{ ball(g,.22,NAVY,s*.5,2.95,.45,1,1,.85);
        /* Arme mit gelben Streifen und Handschuhen */
        strich(g,[s*.55,2.98,.45],[s*.86,2.25,.45],.17,NAVY); strich(g,[s*.86,2.25,.45],[s*.98,1.65,.47],.14,NAVY);
        strich(g,[s*.72,2.58,.45],[s*.79,2.42,.45],.19,GELB); ball(g,.17,SCHWARZ,s*1.0,1.52,.49,.85,1.2,.7);
        /* Beine */
        strich(g,[s*.24,1.95,.44],[s*.31,1.15,.44],.21,NAVY); ball(g,.2,NAVY2,s*.31,1.15,.46); strich(g,[s*.31,1.15,.44],[s*.34,.55,.44],.16,NAVY);
        strich(g,[s*.335,.78,.44],[s*.338,.68,.44],.18,GELB); box(g,.34,.3,.46,SCHWARZ,s*.35,.45,.52); box(g,.38,.09,.52,ORANGE,s*.35,.31,.53);
        box(g,.09,1.0,.03,GELB,s*.36,2.52,.65); });
      /* Reißverschluss und Brusttasche */
      box(g,.05,1.1,.03,METALL,0,2.55,.66); box(g,.1,.14,.05,MESSING,0,3.02,.69); box(g,.28,.28,.07,ORANGE,.19,2.68,.66); box(g,.31,.08,.09,GELB,.19,2.84,.66); } },
  { x:-13.4, z:-4.6, steh:[-13.2,-2.8], kasten:[2.8,1.4], treffer:[2.8,2.7,1.4], baue(g){ /* 2 Taucherflaschen: drei große Druckflaschen im Gestell mit Ventilen und Atemschlauch */
      box(g,2.7,.2,1.2,DUNKEL,0,.1,0);
      [-1.3,1.3].forEach(x=>{ box(g,.12,1.35,.12,METALL2,x,.85,-.4); box(g,.12,.55,.12,METALL2,x,.45,.45); });
      box(g,2.7,.12,.1,METALL,0,1.45,-.4); box(g,2.7,.12,.1,METALL,0,.55,.47);
      [[-.82,GELB],[0,ORANGE],[.82,GELB]].forEach(([x,f])=>{ walze(g,.35,1.5,f,x,.95,0); ball(g,.35,f,x,1.7,0,1,.72,1); walze(g,.365,.14,SCHWARZ,x,.3,0); walze(g,.362,.09,SCHWARZ,x,1.15,0); walze(g,.362,.2,WEISS,x,1.45,0);
        walze(g,.13,.2,METALL,x,2.02,0); box(g,.36,.13,.16,METALL2,x,2.16,0); const r=walze(g,.13,.1,SCHWARZ,x+.24,2.16,0); r.rotation.z=Math.PI/2; ball(g,.07,MESSING,x,2.27,0); });
      /* Atemschlauch mit Mundstück */
      const P=[[-.82,2.16,.1],[-.65,2.42,.28],[-.35,2.38,.45],[-.25,2.0,.52],[-.4,1.55,.52],[-.42,1.15,.55]]; for(let i=1;i<P.length;i++){ strich(g,P[i-1],P[i],.05,SCHWARZ); ball(g,.05,SCHWARZ,P[i][0],P[i][1],P[i][2]); }
      const m=walze(g,.17,.14,TUERKIS,-.42,1.02,.57); m.rotation.x=Math.PI/2; box(g,.28,.1,.12,SCHWARZ,-.42,1.02,.66);
      /* Druckanzeige */
      strich(g,[.82,2.16,.1],[.5,1.95,.46],.04,SCHWARZ); const u=walze(g,.17,.12,MESSING,.46,1.85,.5); u.rotation.x=Math.PI/2; const u2=walze(g,.13,.03,WEISS,.46,1.85,.57); u2.rotation.x=Math.PI/2; box(g,.03,.12,.02,ROT,.49,1.88,.6).rotation.z=-.7; } },
  { x:-8.6, z:3.2, steh:[-8.4,5.1], kasten:[2.5,1.1], treffer:[2.5,2.9,1.1], baue(g){ /* 3 Schwimmflossen: zwei große Flossen aufrecht an einem Ständer */
      box(g,2.3,.18,1.0,HOLZ2,0,.09,0);
      [-1.05,1.05].forEach(x=>{ walze(g,.09,2.0,METALL2,x,1.05,-.25); ball(g,.13,MESSING,x,2.08,-.25); });
      strich(g,[-1.05,1.7,-.25],[1.05,1.7,-.25],.07,METALL);
      [[-.54,GELB,.1,ORANGE],[.54,TUERKIS,-.1,NAVY]].forEach(([x,f,w,d])=>{ const q=gruppe(g,x,.18,.12); q.rotation.z=w;
        flachform(q,[[-.24,.55],[.24,.55],[.34,1.2],[.52,2.45],[.26,2.38],[0,2.22],[-.26,2.38],[-.52,2.45],[-.34,1.2]],.1,f,0,0,0);
        [-1,0,1].forEach(i=>strich(q,[i*.15,.75,.08],[i*.34,i?2.2:2.05,.08],.032,d));
        [-1,1].forEach(s=>strich(q,[s*.24,.55,.06],[s*.5,2.42,.06],.045,SCHWARZ));
        /* Fußteil mit Fersenband */
        ball(q,.32,SCHWARZ,0,.4,.1,.95,1.2,.75); ball(q,.19,d,0,.24,.3,1,.85,.4); ring(q,.25,.055,SCHWARZ,0,.16,.12).scale.y=.6; box(q,.5,.12,.1,d,0,.62,.28); }); } },
  { x:8.2, z:.6, dreh:-.1, steh:[8.0,2.5], kasten:[2.8,1.6], treffer:[2.8,2.0,1.6], baue(g){ /* 4 Werkzeugkiste: roter Kasten mit aufgeklapptem Deckel, Griff und großem Schraubenschlüssel */
      const R1=0xe04a3a, R2=0x9a2418;
      [-1,1].forEach(s=>box(g,.5,.09,1.15,DUNKEL,s*.85,.045,0));
      box(g,2.4,.8,1.15,R1,0,.49,0); box(g,2.48,.1,1.23,R2,0,.15,0); box(g,2.48,.1,1.23,METALL,0,.9,0); box(g,2.2,.03,.96,SCHWARZ,0,.955,0);
      [-.75,.75].forEach(x=>{ box(g,.26,.24,.07,METALL,x,.74,.6); box(g,.12,.12,.04,MESSING,x,.7,.65); });
      box(g,.8,.14,.05,R2,0,.45,.6); [-1,1].forEach(s=>ball(g,.1,METALL2,s*1.22,.62,0,.5,1,2));
      /* Deckel nach hinten geklappt, mit Tragegriff */
      const d=gruppe(g,0,.96,-.55); d.rotation.x=-.38; box(d,2.4,.75,.2,R1,0,.38,-.06); box(d,2.2,.55,.03,R2,0,.38,.05); box(d,2.48,.1,.26,METALL,0,.78,-.06);
      [-.4,.4].forEach(x=>strich(d,[x,.8,-.06],[x,1.04,-.06],.055,SCHWARZ)); strich(d,[-.44,1.04,-.06],[.44,1.04,-.06],.09,SCHWARZ);
      /* großer Schraubenschlüssel, ragt schräg heraus */
      const s=gruppe(g,-.5,1.14,.12); s.rotation.z=.42; box(s,1.15,.17,.1,METALL,0,0,0);
      const m1=ring(s,.22,.09,METALL,.74,0,0,Math.PI*1.55); m1.rotation.z=Math.PI*.22; ring(s,.15,.07,METALL,-.68,0,0);
      /* Schraubendreher und Zange */
      strich(g,[.35,1.0,.25],[.55,1.4,.1],.09,GELB); strich(g,[.55,1.4,.1],[.68,1.66,0],.035,METALL);
      [-1,1].forEach(v=>{ strich(g,[.75+v*.16,1.0,.3],[.82,1.3,.25],.05,BLAU); strich(g,[.82,1.3,.25],[.82-v*.08,1.5,.23],.04,METALL2); }); ball(g,.07,MESSING,.82,1.3,.27);
      walze(g,.2,.12,ORANGE,.2,1.03,-.15); walze(g,.09,.13,SCHWARZ,.2,1.035,-.15); } },
  { x:13.4, z:7.0, steh:[11.6,8.1], r:1.0, treffer:[2.1,2.6,2.0], baue(g){ /* 5 Eimer mit Taucherbrillen: großer blauer Eimer mit Henkel, Brillen und Schnorcheln */
      rohr(g,.82,.62,1.15,0x2f7fd0,0,.58,0,24); [.1,.5].forEach(y=>reif(g,.635+y*.17,.035,WEISS,0,y,0)); reif(g,.82,.07,WEISS,0,1.15,0); walze(g,.76,.03,NAVY2,0,1.17,0);
      const hk=ring(g,.84,.035,METALL2,0,1.15,-.2,Math.PI); hk.rotation.x=-.55; [-1,1].forEach(s=>ball(g,.09,METALL,s*.83,1.12,-.1));
      const glas=basis(0x4ab4e0,{transparent:true,opacity:.85}), glanz=basis(0xe8fbff,{transparent:true,opacity:.75});
      /* Tauchmaske: ein breites blaues Glas mit Nasenausschnitt, schräger Glanzstreifen, breites Gummiband */
      const aussen=[[-.45,.2],[-.3,.26],[.3,.26],[.45,.2],[.48,-.05],[.37,-.23],[.14,-.23],[0,-.07],[-.14,-.23],[-.37,-.23],[-.48,-.05]];
      const innen=[[-.37,.14],[-.27,.18],[.27,.18],[.37,.14],[.39,-.04],[.31,-.15],[.17,-.15],[0,.02],[-.17,-.15],[-.31,-.15],[-.39,-.04]];
      const brille=(x,y,z,rx,ry,rz,f,band)=>{ const q=gruppe(g,x,y,z); q.rotation.set(rx,ry,rz);
        flachform(q,aussen,.13,f,0,0,0); flachform(q,innen,.04,glas,0,0,.085).castShadow=false;
        [[-.2,.04,.2,.05],[-.09,.05,.12,.03]].forEach(([a,b,l,d])=>{ const t=box(q,d,l,.012,glanz,a,b,.115); t.rotation.z=-.7; t.castShadow=false; });
        if(band){ [-1,1].forEach(s=>box(q,.08,.16,.42,SCHWARZ,s*.48,.02,-.22)); box(q,1.04,.16,.08,SCHWARZ,0,.02,-.44); } };
      brille(-.34,1.42,.22,-.3,-.2,.3,GELB,true); brille(.38,1.38,-.02,-.3,.25,-.4,ROSA,true);
      /* die dritte Maske hängt an ihrem Band außen über dem Eimerrand */
      brille(0,.8,.9,.08,0,.1,ORANGE,false);
      [-1,1].forEach(s=>{ const o=[s*.44,.83+s*.044,.9], m=[s*.3,1.23,.8], i=[s*.22,1.19,.55]; strich(g,o,m,.065,SCHWARZ); strich(g,m,i,.065,SCHWARZ); ball(g,.065,SCHWARZ,m[0],m[1],m[2]); });
      [[-.15,-.25,-.12,GELB],[.35,-.2,.2,0x5ae07a]].forEach(([x,z,w,f])=>{ const X=x+w*2; strich(g,[x,1.1,z],[X,2.28,z],.08,f); strich(g,[X,2.28,z],[X+.2,2.4,z+.08],.08,f); ball(g,.09,f,X,2.28,z); ball(g,.1,ROT,X+.22,2.41,z+.09); box(g,.2,.12,.16,SCHWARZ,x-.06,1.3,z+.08); }); } },
  { wand:'hinten', x:12.0, z:-13.5, steh:[11.9,-11.5], kasten:[3.4,1.2], treffer:[3.4,2.7,.9], trefferY:.9, baue(g,k){ /* 6 Infobildschirm: großer Bildschirm mit Fisch, Tauchtiefe und Wellen */
      box(g,3.3,2.2,.26,DUNKEL,0,2.35,.15); box(g,3.44,.14,.34,METALL,0,3.5,.17); box(g,3.44,.14,.34,METALL,0,1.2,.17);
      [-1,1].forEach(s=>{ box(g,.14,2.3,.34,METALL,s*1.68,2.35,.17); strich(g,[s*.9,1.2,.2],[s*1.1,.7,.05],.07,METALL2); });
      box(g,1.7,.2,.4,METALL2,0,1.02,.24); [ROT,GELB,0x5aff7a,TUERKIS].forEach((f,i)=>ball(g,.085,f,-.55+i*.37,1.09,.42,1,.7,1));
      const c=document.createElement('canvas'); c.width=384; c.height=244; const p=c.getContext('2d'), tx=new THREE.CanvasTexture(c); tx.minFilter=THREE.LinearFilter;
      const kreis=(x,y,r,f)=>{ p.fillStyle=f; p.beginPath(); p.arc(x,y,r,0,7); p.fill(); };
      const mal=t=>{ p.fillStyle='#0f4a6a'; p.fillRect(0,0,384,244);
        for(let r=0;r<3;r++){ p.strokeStyle=['#58d0f0','#2f9ac8','#1f78a8'][r]; p.lineWidth=5; p.beginPath(); for(let x=0;x<=250;x+=10){ const y=170+r*24+Math.sin(x*.05+t*2+r)*8; x?p.lineTo(x+10,y):p.moveTo(x+10,y); } p.stroke(); }
        const fx=130+Math.sin(t*.7)*70, v=Math.cos(t*.7)>0?1:-1;
        p.save(); p.translate(fx,86+Math.sin(t*1.8)*9); p.scale(v,1); p.fillStyle='#ffd23a'; p.beginPath(); p.ellipse(0,0,44,28,0,0,7); p.fill(); p.beginPath(); p.moveTo(-36,0); p.lineTo(-68,-24); p.lineTo(-68,24); p.fill(); p.fillStyle='#f08a2a'; p.fillRect(-12,-25,9,50); kreis(22,-7,8,'#ffffff'); kreis(24,-7,4,'#101820'); p.restore();
        for(let i=0;i<4;i++){ const y=150-((t*26+i*37)%130); p.strokeStyle='#dff8ff'; p.lineWidth=2.5; p.beginPath(); p.arc(228+(i%2)*14,y,5+i,0,7); p.stroke(); }
        p.fillStyle='#08283c'; p.fillRect(276,18,90,208); p.strokeStyle='#7ae0ff'; p.lineWidth=3; p.strokeRect(276,18,90,208);
        for(let i=0;i<3;i++){ const hh=60+Math.sin(t*1.2+i*2)*35+i*28; p.fillStyle=['#5aff7a','#ffd23a','#ff8a6a'][i]; p.fillRect(288+i*25,214-hh,17,hh); }
        p.fillStyle='#bfefff'; [34,52].forEach((y,i)=>p.fillRect(22,y-18+i*2,i?90:140,8));
        tx.needsUpdate=true; };
      mal(0); tafel(g,tx,3.1,1.97,0,2.35,.292);
      let letzt=-1; k.anim.push(t=>{ const n=Math.floor(t*8); if(n!==letzt){ letzt=n; mal(t); } }); } },
  { x:14.0, z:-3.0, dreh:-.2, steh:[13.5,-1.1], kasten:[2.9,1.7], treffer:[2.7,2.6,1.5], baue(g){ /* 7 Muschelvitrine: Glaskasten auf Holzsockel mit Muscheln, Schnecke, Seestern und Perle */
      [-1.1,1.1].forEach(x=>[-.45,.45].forEach(z=>box(g,.18,.5,.18,HOLZ2,x,.25,z)));
      box(g,2.55,.46,1.2,HOLZ,0,.68,0); box(g,2.66,.1,1.3,MESSING,0,.94,0); [-.55,.55].forEach(x=>ball(g,.09,MESSING,x,.68,.62));
      box(g,2.38,.05,1.02,NAVY,0,1.01,0); box(g,2.2,.06,.42,FLIESE,0,1.62,-.28); [-1,1].forEach(s=>box(g,.07,.56,.4,METALL,s*1.0,1.32,-.28));
      [-1.23,1.23].forEach(x=>[-.55,.55].forEach(z=>box(g,.09,1.35,.09,MESSING,x,1.66,z)));
      box(g,2.6,.14,1.24,HOLZ2,0,2.4,0); box(g,2.2,.08,.9,MESSING,0,2.5,0);
      const gm=basis(0xd0f4ff,{transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide});
      const gl=box(g,2.42,1.33,1.06,gm,0,1.66,0); gl.castShadow=false;
      const gz=box(g,.12,1.0,.02,basis(0xffffff,{transparent:true,opacity:.45,depthWrite:false}),-.85,1.7,.57); gz.rotation.z=-.4; gz.castShadow=false;
      /* Fächermuschel */
      const faecher=(x,y,z,r,f,d)=>{ const P=[[0,0]]; for(let i=0;i<=14;i++){ const a=.3+i*(Math.PI-.6)/14, rr=r*(i%2?.92:1.05); P.push([Math.cos(a)*rr,Math.sin(a)*rr]); } flachform(g,P,.09,f,x,y,z);
        for(let i=1;i<6;i++){ const a=.3+i*(Math.PI-.6)/6; strich(g,[x,y+.03,z+.06],[x+Math.cos(a)*r*.9,y+Math.sin(a)*r*.9,z+.06],.014,d); } box(g,r*.5,.09,.13,d,x,y+.02,z); };
      faecher(-.68,1.05,.18,.46,0xf4a890,0xa86050); faecher(.78,1.66,-.25,.38,0xffe0a0,0xb88a40); faecher(.2,1.05,.3,.26,0xf0b0d0,0xa85a80);
      /* Schnecken */
      const schnecke=(x,y,z,s,f,d)=>{ [[0,.24],[.2,.18],[.35,.12],[.46,.07]].forEach(([dx,r],i)=>ball(g,r*s,i%2?d:f,x+dx*s,y+.2*s+dx*.35*s,z)); kegel(g,.05*s,.16*s,d,x+.56*s,y+.43*s,z).rotation.z=-1.0; ball(g,.11*s,0xffd8c0,x-.1*s,y+.13*s,z+.17*s,1,1,.5); };
      schnecke(.62,1.04,.1,1.1,0xe8b878,0xa86a38); schnecke(-.78,1.66,-.28,.8,0xd8a0e0,0x8a58a0);
      flachform(g,sternPunkte(.34),.09,0xf07a2a,-.05,1.93,-.25); ball(g,.07,0xffd23a,-.05,1.93,-.18);
      /* Perle in offener Muschel */
      ball(g,.2,0xc8a0c0,-.1,1.07,-.05,1.2,.35,1); ball(g,.11,0xffffff,-.1,1.2,-.05); } },
  { x:-13.8, z:6.8, dreh:.35, steh:[-12.0,7.9], r:1.0, treffer:[2.0,3.3,1.9], baue(g){ /* 8 Tauchhelm-Ständer: alter Messinghelm mit Bullaugen auf einem Holzständer */
      [0,1,2].forEach(i=>{ const a=i*2.094; strich(g,[Math.sin(a)*.8,.08,Math.cos(a)*.8],[0,.55,0],.09,HOLZ2); ball(g,.12,HOLZ2,Math.sin(a)*.8,.09,Math.cos(a)*.8); });
      walze(g,.13,.9,HOLZ,0,.85,0); reif(g,.16,.05,MESSING,0,.62,0); walze(g,.55,.14,HOLZ2,0,1.36,0);
      const M2=0xb8822a, GL=0x1a5a80;
      rohr(g,.55,.82,.4,M2,0,1.62,0,20); reif(g,.8,.05,MESSING,0,1.46,0); reif(g,.58,.09,MESSING,0,1.82,0);
      for(let i=0;i<10;i++){ const a=i*Math.PI/5; ball(g,.07,0xffe08a,Math.sin(a)*.73,1.57,Math.cos(a)*.73); }
      ball(g,.66,0xe0aa40,0,2.4,0);
      const v=walze(g,.36,.2,M2,0,2.38,.6); v.rotation.x=Math.PI/2; const w=walze(g,.28,.04,GL,0,2.38,.71); w.rotation.x=Math.PI/2; ring(g,.33,.065,MESSING,0,2.38,.72);
      box(g,.56,.045,.04,MESSING,0,2.38,.74); box(g,.045,.56,.04,MESSING,0,2.38,.745); strich(g,[-.18,2.48,.76],[-.05,2.58,.76],.022,0xdff8ff);
      for(let i=0;i<6;i++){ const a=i*Math.PI/3+.5; ball(g,.05,0xffe08a,Math.cos(a)*.33,2.38+Math.sin(a)*.33,.79); }
      [-1,1].forEach(s=>{ const z=walze(g,.22,.16,M2,s*.6,2.44,0); z.rotation.z=Math.PI/2; const f=walze(g,.16,.03,GL,s*.69,2.44,0); f.rotation.z=Math.PI/2; const r=ring(g,.2,.045,MESSING,s*.7,2.44,0); r.rotation.y=Math.PI/2; });
      walze(g,.16,.14,M2,0,3.08,0); ball(g,.12,MESSING,0,3.2,0); strich(g,[.22,2.98,-.2],[.35,3.15,-.35],.08,MESSING); } },
  { x:-14.0, z:-12.45, steh:[-13.8,-10.6], kasten:[2.9,2.0], treffer:[2.9,3.5,1.2], baue(g){ /* 9 Umkleideschrank: Blech-Spind mit drei Türen, Lüftungsschlitzen und Griffen, eine Tür steht offen */
      const L1=0x4a9ae0, L2=0x2a68a8, L3=0x80c0f0;
      [-1.25,1.25].forEach(x=>[-.3,.3].forEach(z=>box(g,.16,.2,.16,SCHWARZ,x,.1,z)));
      box(g,2.75,3.1,.12,L2,0,1.75,-.4); [-1,1].forEach(s=>box(g,.1,3.1,.82,L2,s*1.33,1.75,.03));
      box(g,2.82,.14,.96,METALL,0,3.35,.02); box(g,2.76,.14,.9,L2,0,.25,.02); [-.44,.44].forEach(x=>box(g,.07,3.0,.82,L2,x,1.75,.03));
      const tuer=(q,f)=>{ box(q,.8,2.9,.08,f,0,0,0); [.95,1.07,1.19,-.95,-1.07,-1.19].forEach(y=>box(q,.46,.05,.03,SCHWARZ,0,y,.05));
        box(q,.09,.34,.1,METALL,.28,0,.08); ball(q,.05,SCHWARZ,.28,-.26,.07); box(q,.24,.15,.03,WEISS,-.02,.6,.05); };
      [-.88,.88].forEach((x,i)=>{ const q=gruppe(g,x,1.76,.44); tuer(q,i?L1:L3); });
      /* mittlere Tür halb offen: innen Fach mit roter Tasche und Jacke am Haken */
      box(g,.8,2.9,.03,SCHWARZ,0,1.76,-.31); box(g,.8,.07,.65,METALL,0,2.55,.02);
      box(g,.5,.34,.4,ROT,0,2.77,.05); strich(g,[-.14,2.95,.05],[.14,2.95,.05],.04,SCHWARZ);
      ball(g,.07,MESSING,0,2.36,-.22); box(g,.5,.95,.16,GELB,0,1.75,-.1); [-1,1].forEach(s=>strich(g,[s*.24,2.15,-.1],[s*.34,1.45,-.08],.07,GELB)); box(g,.04,.9,.03,SCHWARZ,0,1.75,0);
      const auf=gruppe(g,-.4,1.76,.44); auf.rotation.y=-1.05; const q=gruppe(auf,.4,0,0); tuer(q,L1); } },
  { x:4.8, z:5.6, dreh:-.08, steh:[4.8,7.5], kasten:[2.7,1.5], treffer:[2.6,2.3,1.4], baue(g){ /* 10 Handtuchstapel: gefaltete bunte Handtücher auf einem niedrigen Tisch, obendrauf zwei Rollen */
      [-1.05,1.05].forEach(x=>[-.45,.45].forEach(z=>walze(g,.08,.52,HOLZ2,x,.26,z)));
      box(g,2.45,.13,1.2,HOLZ,0,.58,0); box(g,2.2,.08,.9,HOLZ2,0,.22,0);
      /* dicke Lagen mit runden Falzkanten vorn und hinten */
      const stapel=(x,farben)=>farben.forEach((f,i)=>{ const y=.79+i*.29, v=((i*7)%3-1)*.045;
        box(g,.96,.28,.62,f,x+v,y,-.04); [-.35,.27].forEach(z=>{ const a=walze(g,.142,.96,f,x+v,y,z); a.rotation.z=Math.PI/2; }); });
      stapel(-.6,[0xe0443a,0x2f9ae0,0xffcc22,0x3ac080]);
      stapel(.62,[0x9a6ad0,0xf08a2a,0x2ac8c0]);
      /* zwei Rollen obendrauf */
      [[.38,1.75,0x3a8ae0],[.86,1.75,0xff8a6a]].forEach(([x,y,f])=>{ const r=walze(g,.23,.8,f,x,y,-.02); r.rotation.x=Math.PI/2; [.15,.075].forEach(q=>ring(g,q,.025,WEISS,x,y,.39)); });
      /* ein Handtuch hängt mit Fransen über die vordere Tischkante */
      const T=0xf07aa0;
      box(g,.66,.07,.3,T,-.05,.68,.5); const kante=walze(g,.075,.66,T,-.05,.64,.64); kante.rotation.z=Math.PI/2;
      box(g,.66,.4,.07,T,-.05,.44,.68);
      for(let i=0;i<8;i++){ const x=-.34+i*.083; strich(g,[x,.25,.68],[x+(i%3-1)*.025,.08,.69],.018,T); } } }
];

return { titel:'Die Taucherschleuse', breite:36, tiefe:27, oben:UW.OBEN, baue, gegenstaende, verstecke };
})();

/* Raum 2: Das Forschungslabor. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die Aquarium-Wand, eine raumhohe Tür voller Wasser und Fische, die nach links aufschwingt. Dahinter liegt ein heller Gang. */
RAEUME3D.unterwasser[1] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, GELB, ORANGE, ROT, TUERKIS, BLAU, GRUEN, ROSA, LILA, SAND, MESSING } = UW;
const PETROL=0x2a8a9a, PETROL2=0x1c5c6c, HELL=0xdcebee, HOLZ=0x8a5a30, HOLZ2=0x5c3818, SCHWARZ=0x1c262c, GLAS=0xd8f4ff;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* leuchtende Teile (ohne Schatten) */
const lampe=(p,r,c,x,y,z)=>{ const t=ball(p,r,basis(c),x,y,z); t.castShadow=false; return t; };
const feld=(p,w,h,d,c,x,y,z)=>{ const t=box(p,w,h,d,basis(c),x,y,z); t.castShadow=false; return t; };
/* flache Fläche mit gemaltem Bild */
const tafel=(p,tex,w,h,x,y,z)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex})); m.position.set(x,y,z); p.add(m); return m; };
/* stehende oder liegende Walze */
const quer=(p,r,l,c,x,y,z,achse)=>{ const w=walze(p,r,l,c,x,y,z); if(achse==='x') w.rotation.z=Math.PI/2; else w.rotation.x=Math.PI/2; return w; };
const hex=f=>'#'+('00000'+f.toString(16)).slice(-6);

/* Flacher Fisch als Bild (schaut nach +x; dreht man ihn um, schaut er nach -x) */
function flachfisch(par,farbe,farbe2,w,x,y,z){
  const t=bild(128,80,(g)=>{ g.fillStyle=hex(farbe2); g.beginPath(); g.moveTo(34,40); g.lineTo(4,12); g.lineTo(12,40); g.lineTo(4,68); g.fill();
    g.beginPath(); g.moveTo(52,22); g.lineTo(66,3); g.lineTo(88,20); g.fill();
    g.fillStyle=hex(farbe); g.beginPath(); g.ellipse(72,40,48,27,0,0,7); g.fill();
    g.strokeStyle=hex(farbe2); g.lineWidth=9; g.beginPath(); g.moveTo(62,17); g.quadraticCurveTo(52,40,62,63); g.stroke();
    g.fillStyle='#ffffff'; g.beginPath(); g.arc(100,32,10,0,7); g.fill(); g.fillStyle='#101418'; g.beginPath(); g.arc(103,32,5,0,7); g.fill();
    g.strokeStyle='#123040'; g.lineWidth=3; g.beginPath(); g.arc(108,44,8,.4,2.2); g.stroke(); });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.625),new THREE.MeshBasicMaterial({map:t,transparent:true,depthWrite:false,side:THREE.DoubleSide})); m.position.set(x,y,z); par.add(m); return m;
}
/* hin und her schwimmender flacher Fisch zwischen x1 und x2 */
function pendelfisch(k,par,f,w,x1,x2,y,z,tempo,start){
  const m=flachfisch(par,f[0],f[1],w,x1,y,z), l=x2-x1;
  k.anim.push(t=>{ const u=(t*tempo+start)%(2*l), hin=u<l; m.position.set(x1+(hin?u:2*l-u),y+Math.sin(t*1.6+start*3)*.07,z); m.rotation.y=hin?0:Math.PI; });
}

/* Blasen als ein gemeinsamer Körper je Träger (spart Zeichenaufrufe). liste: [x, y, z, Höhe, Größe, Anzahl] */
function perlen(k,par,liste){
  const alle=[]; liste.forEach((q,n)=>{ for(let i=0;i<q[5];i++) alle.push({ q, p:i/q[5]+zufall()*.1, d:n*1.7+i*2.3, s:q[4]*(.6+zufall()*.8) }); });
  const im=new THREE.InstancedMesh(GEO.sph,basis(0xe8fcff,{transparent:true,opacity:.6,depthWrite:false}),alle.length), o=new THREE.Object3D();
  im.frustumCulled=false; par.add(im);
  k.anim.push(t=>{ alle.forEach((b,i)=>{ const a=(t*.28+b.p)%1, q=b.q; o.position.set(q[0]+Math.sin(t*2.1+b.d)*.07,q[1]+a*q[3],q[2]+Math.cos(t*1.8+b.d)*.05); o.scale.set(b.s,b.s,b.s); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; });
}
/* Bewegte Teile in Gegenständen: je Farbe zusammenfassen und als durchsichtig kennzeichnen, damit sie einzeln beweglich bleiben */
function beweglich(g){ verschmelze(g); g.traverse(m=>{ if(m.isMesh){ const c=m.material.clone(); c.transparent=true; m.material=c; } }); }
/* Wanddeko wirft keinen Schatten */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

/* ---------- Ausgang: die Aquarium-Wand ---------- */
const TX=3, TB=4, TH=4.4;
function baueAusgang(k,sc,hinten){
  const Z=-13.5;
  /* heller Gang dahinter */
  const gang=gruppe(hinten,TX,0,0);
  box(gang,4.4,.1,3.9,0x9ac0c8,0,-.045,-15.45);
  [-1,1].forEach(s=>{ box(gang,.2,4.6,3.6,HELL,s*2.2,2.25,-15.6); [.5,3.5].forEach(y=>feld(gang,.06,.12,3.4,0x70f0e0,s*2.07,y,-15.6));
    feld(gang,.14,.03,3.6,0xffffff,s*1.2,.03,-15.5); [-14.5,-15.7,-16.9].forEach(z=>box(gang,.34,4.5,.18,PETROL,s*2.0,2.25,z)); });
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,140,6,128,128,180); v.addColorStop(0,'#ffffff'); v.addColorStop(.45,'#d0fff2'); v.addColorStop(1,'#2aa8a0'); g.fillStyle=v; g.fillRect(0,0,256,256);
    g.strokeStyle='rgba(255,255,255,.85)'; g.lineWidth=5; [40,72,108].forEach(r=>g.strokeRect(128-r,140-r,r*2,r*1.8)); });
  tafel(gang,ende,4.4,4.6,0,2.25,-17.45);
  verschmelze(gang); gang.visible=false;
  /* fester Türrahmen */
  const r=gruppe(hinten,TX,0,Z);
  [-1,1].forEach(s=>{ box(r,.36,TH+.3,.5,METALL2,s*(TB/2+.19),(TH+.3)/2,.2); feld(r,.07,TH,.04,0x60ffe0,s*(TB/2+.19),TH/2,.47); box(r,.52,.3,.62,DUNKEL,s*(TB/2+.19),.15,.22); });
  box(r,TB+.9,.36,.56,METALL2,0,TH+.2,.22); box(r,TB+1.0,.1,.64,MESSING,0,TH+.43,.22);
  for(let i=-4;i<=4;i++) ball(r,.08,MESSING,i*.52,TH+.2,.52,1,1,.6);
  /* drei Scharniere links */
  [.7,2.2,3.7].forEach(y=>{ walze(r,.12,.5,MESSING,-TB/2+.01,y,.52); box(r,.3,.34,.08,MESSING,-TB/2-.16,y,.49); });
  verschmelze(r);
  /* Türflügel: Drehpunkt am linken Rand */
  const fluegel=gruppe(hinten,TX-TB/2,0,Z+.3), t=gruppe(fluegel,TB/2,0,0);
  const rahmen=gruppe(t,0,0,0);
  [-1,1].forEach(s=>box(rahmen,.28,TH-.08,.36,METALL,s*(TB/2-.17),TH/2+.02,0));
  box(rahmen,TB-.6,.46,.36,METALL,0,.29,0); box(rahmen,TB-.6,.28,.36,METALL,0,TH-.16,0);
  [-1,1].forEach(v=>{ for(let i=-3;i<=3;i++){ ball(rahmen,.065,MESSING,i*.5,.29,v*.19,1,1,.6); ball(rahmen,.065,MESSING,i*.5,TH-.16,v*.19,1,1,.6); }
    /* großer Griff */
    strich(rahmen,[1.55,1.35,v*.34],[1.55,2.55,v*.34],.08,MESSING); [1.4,2.5].forEach(y=>strich(rahmen,[1.74,y,v*.16],[1.55,y,v*.34],.06,MESSING));
    /* Sand, Steine und Wasserpflanzen im Becken der Tür */
    box(rahmen,TB-.62,.24,.06,SAND,0,.62,v*.055);
    [-1.4,-.5,.8,1.35].forEach((x,i)=>{ ball(rahmen,.22,[0x8aa0a8,0xc07a8a,0x8aa0a8,0xd89a50][i],x,.72,v*.06,1.2,.7,.25);
      [0,1,2].forEach(j=>{ const b=ball(rahmen,.3,j%2?0x2e8a58:0x5ac860,x+.24+(j-1)*.13,1.0+j%2*.2,v*.05,.2,1.5+j%2*.5,.12); b.rotation.z=(j-1)*-.25; }); }); });
  verschmelze(rahmen);
  const wasser=bild(512,560,(g,W,H)=>{ const v=g.createLinearGradient(0,0,0,H); v.addColorStop(0,'#8aeef4'); v.addColorStop(.4,'#2ab4d8'); v.addColorStop(1,'#0e5a90'); g.fillStyle=v; g.fillRect(0,0,W,H);
    g.fillStyle='rgba(230,255,255,.16)'; for(let i=0;i<5;i++){ const x=40+i*110; g.beginPath(); g.moveTo(x,0); g.lineTo(x+34,0); g.lineTo(x-70,H); g.lineTo(x-130,H); g.fill(); }
    g.strokeStyle='rgba(255,255,255,.55)'; g.lineWidth=4; for(let i=0;i<22;i++){ g.beginPath(); g.arc((i*157)%490+10,(i*89)%500+14,4+(i%4)*2,0,7); g.stroke(); } });
  [-1,1].forEach(v=>{ const m=tafel(t,wasser,TB-.6,TH-.72,0,(TH+.22)/2,v*.014); if(v<0) m.rotation.y=Math.PI; });
  const schein1=basis(0xffffff,{transparent:true,opacity:.16,depthWrite:false});
  [-1,1].forEach(v=>[[-.9,.2],[-.55,.08]].forEach(([x,w])=>{ const s=box(t,w,2.8,.004,schein1,x,2.3,v*.17); s.rotation.z=-.4*v; s.castShadow=false; }));
  /* Fische in der Tür (vorn und hinten) */
  [[1,0xffd23a,0x2f7fd0,3.4,.5,0,1.05],[1,0xf08a2a,0xffffff,2.35,.38,2.2,1.3],[1,0xf07aa0,0xffd23a,1.55,.62,4.1,.85],[1,0x8ae05a,0x207a50,2.9,.28,6,.7],
   [-1,0xf08a2a,0xffffff,3.1,.45,1,1.15],[-1,0xffd23a,0x1a4a90,1.9,.34,3.3,1.05],[-1,0xb08aff,0xffffff,2.5,.55,5,.8]].forEach(([v,f1,f2,y,tempo,start,gr])=>{
    pendelfisch(k,t,[f1,f2],gr,-1.7+gr/2+.05,1.7-gr/2-.05,y,v*.095,tempo,start); });
  /* Zahlenschloss auf einer Säule rechts, dazu ein Riegel und eine Lampe */
  const pult=gruppe(hinten,6.15,0,Z);
  box(pult,.34,1.9,.24,METALL2,0,.95,.14); box(pult,.72,.16,.5,DUNKEL,0,.08,.24); box(pult,1.04,1.0,.12,DUNKEL,0,2.36,.08);
  [-1,1].forEach(s=>feld(pult,.06,.84,.04,0x60ffe0,s*.46,2.36,.16));
  box(pult,.2,.3,.1,METALL2,0,2.98,.08); box(pult,.5,.26,.2,DUNKEL,0,3.18,.12);
  verschmelze(pult);
  const lm=basis(0xff5a4a); const ampel=ball(hinten,.15,lm,6.15,3.2,Z+.28); ampel.castShadow=false;
  const riegel=box(hinten,.9,.16,.14,MESSING,5.25,1.95,Z+.5);
  const schloss=UW.zahlenschloss(hinten,6.15,2.3,Z+.3); verschmelze(schloss);
  /* grünes Häkchen auf der Tafel, wenn das Schloss weg ist */
  const haken=gruppe(hinten,6.15,2.36,Z+.18);
  feld(haken,.82,.76,.03,0x1f9a4a,0,0,0);
  [[-.17,-.07,.36,-.75],[.12,.02,.6,.85]].forEach(([x,y,l,w])=>{ const t=feld(haken,l,.13,.03,0xeafff0,x,y,.035+(w>0?.009:0)); t.rotation.z=w; });
  verschmelze(haken); haken.visible=false;
  /* Schwelle: Leuchtpfeile führen zur Tür */
  const schwelle=gruppe(sc,TX,0,0);
  [0,1,2].forEach(i=>{ [-1,1].forEach(s=>{ const a=feld(schwelle,.7,.018,.14,0x60ffe0,s*.27,.022,-11.6+i*.55); a.rotation.y=s*.65; }); });
  [-1,1].forEach(s=>feld(schwelle,.12,.016,3.4,GELB,s*1.8,.014,-11.5));
  verschmelze(schwelle);
  const licht=new THREE.PointLight(0xc8fff4,0,13,1.5); licht.position.set(TX,2.8,-14.8); sc.add(licht);
  k.kasten(3.55,-13.1,6.3,.85);
  return ausgang(k,{ name:'Aquarium-Wand', einfach:'Tür mit Fischen', steh:[4.4,-9.8], durch:[TX+.3,-15.6],
    treffer:{x:TX+.55,y:2.3,z:-13,b:6.0,h:4.5,t:1}, schildOben:[TX,4.5,-12.4], glanz:[6.15,2.3,-12.8],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.06)/.9)); fluegel.rotation.y=-1.78*a*a*(3-2*a); riegel.position.x=5.25+Math.min(1,auf*8)*.7; riegel.visible=auf<.2;
      gang.visible=auf>.02; licht.intensity=1.5*auf; lm.color.setHex(auf>.15?0x5aff7a:0xff5a4a); schloss.visible=auf<.04; haken.visible=auf>=.04; } });
}

/* ---------- rundes Bullauge ins Meer ---------- */
function bullauge(k,hinten,x,y,R,n){
  const g=gruppe(hinten,x,y,-13.5);
  const scheibe=new THREE.Mesh(new THREE.CircleGeometry(R,32),new THREE.MeshBasicMaterial({map:UW.meerBild(256,256)})); scheibe.position.z=.025; g.add(scheibe);
  const r=gruppe(g,0,0,0); ring(r,R+.07,.15,MESSING,0,0,.1); ring(r,R+.27,.07,METALL2,0,0,.06);
  for(let i=0;i<10;i++){ const a=i*Math.PI/5; ball(r,.065,METALL,Math.cos(a)*(R+.08),Math.sin(a)*(R+.08),.25); }
  verschmelze(r);
  const F=[[0xffd23a,0x2f7fd0],[0xf08a2a,0xffffff],[0xf07aa0,0xffd23a],[0x8ae05a,0x207a50]];
  pendelfisch(k,g,F[n%4],.5,-R*.55,R*.55,R*.25,.05,.34,n*1.3);
  pendelfisch(k,g,F[(n+1)%4],.36,-R*.5,R*.5,-R*.34,.065,.24,n*2.1+1);
}

/* ---------- Laborgeräte für die Deko ---------- */
/* Stehkolben mit Flüssigkeit (kegelförmig), Höhe etwa .6*s */
function kolben(p,x,y,z,s,farbe){
  rohr(p,.09*s,.24*s,.3*s,farbe,x,y+.15*s,z); rohr(p,.065*s,.1*s,.16*s,GLAS,x,y+.37*s,z); walze(p,.06*s,.16*s,GLAS,x,y+.5*s,z); reif(p,.07*s,.018*s,WEISS,x,y+.58*s,z);
}
/* Rundkolben auf Dreifuß */
function rundkolben(p,x,y,z,s,farbe){
  [0,1,2].forEach(i=>{ const a=i*2.094; strich(p,[x+Math.cos(a)*.24*s,y,z+Math.sin(a)*.24*s],[x+Math.cos(a)*.16*s,y+.25*s,z+Math.sin(a)*.16*s],.022,SCHWARZ); });
  reif(p,.17*s,.022,SCHWARZ,x,y+.25*s,z); ball(p,.23*s,farbe,x,y+.4*s,z,1,.9,1); walze(p,.065*s,.34*s,GLAS,x,y+.72*s,z); reif(p,.08*s,.018,WEISS,x,y+.89*s,z);
}
/* Reagenzgläser im Holzständer */
function roehrchen(p,x,y,z){
  box(p,.9,.06,.26,HOLZ,x,y+.04,z); box(p,.9,.05,.26,HOLZ,x,y+.3,z); [-.42,.42].forEach(v=>box(p,.06,.34,.26,HOLZ2,x+v,y+.17,z));
  [0xff7a5a,0x5ad0a0,0x7ab0ff,0xffd23a,0xc08aff].forEach((f,i)=>{ const a=x-.3+i*.15; walze(p,.045,.26+(i%3)*.05,f,a,y+.2+(i%3)*.025,z); walze(p,.045,.18,GLAS,a,y+.42+(i%3)*.05,z); });
}
/* Algenrohr: hohe Glasröhre mit grünen Algen und Blasen */
function algenrohr(par,g,x,z,farbe){
  walze(g,.52,.34,DUNKEL,x,.17,z); walze(g,.46,.1,MESSING,x,.38,z); walze(g,.46,.2,METALL2,x,3.16,z); ball(g,.38,METALL2,x,3.26,z,1,.5,1);
  for(let i=0;i<11;i++){ const a=i*2.4; ball(g,.17+(i%3)*.04,i%2?farbe:0x2e8a48,x+Math.cos(a)*.16,.6+i*.19,z+Math.sin(a)*.16,1,1.2,1); }
  const glas=walze(par,.4,2.65,basis(0xb8f4e0,{transparent:true,opacity:.24,depthWrite:false}),x,1.74,z); glas.castShadow=false;
}

function baue(k){
  const sc=k.scene;
  const h=UW.huelle(k,{ B:36, T:27, H:6, wand:[96,142,150], boden:[148,170,174], strebe:0x55808a, leuchte:0x80ffe8, staerke:.84, sonneStaerke:.38,
    pfosten:[-16.9,-10.4,-5.6,-.6,7.8,16.9], streben:[-11.8,-6,1.4,6,12], oeffnung:{x:TX,b:TB,h:TH} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc,hinten);
  const o=new THREE.Object3D();

  /* ---------- Bullaugen ---------- */
  [[-13.3,3.65,.8],[-3.1,3.25,.9],[12.6,3.5,.85],[15.2,3.5,.65]].forEach((b,i)=>bullauge(k,hinten,b[0],b[1],b[2],i));

  /* Wandgruppen für alles, was mit der Wand verschwinden soll */
  const sg=[gruppe(links,0,0,0),gruppe(rechts,0,0,0)], wd=[gruppe(hinten,0,0,0),sg[0],sg[1]];
  /* Bläschen über den Kolben, gesammelt für Raum, linke und rechte Wand */
  const blubb=[[],[],[]], gas=(n,x,y,z)=>blubb[n].push([x,y,z,.6,.055,3]);

  /* ---------- Destillieranlage (hinten links) ---------- */
  const deko=gruppe(sc,0,0,0), stand=gruppe(sc,0,0,0); /* deko: Möbel an der Wand ohne Schatten, stand: frei stehende Dinge */
  const zeile=(p,x,z,l,farbe)=>{ box(p,l,.9,1.0,farbe,x,.47,z); box(p,l+.14,.14,1.14,HELL,x,.99,z); box(p,l-.1,.08,.92,DUNKEL,x,.04,z);
    const n=Math.max(1,Math.round(l/1.1)); for(let i=0;i<n;i++){ const a=x-l/2+(i+.5)*l/n; box(p,l/n-.14,.66,.05,PETROL2,a,.5,z+.51); box(p,.3,.06,.06,MESSING,a,.7,z+.55); } };
  zeile(deko,-13.4,-12.8,4.0,PETROL);
  rundkolben(deko,-14.7,1.06,-12.75,1.35,0xff8a4a); walze(deko,.16,.12,ORANGE,-14.7,1.12,-12.75);
  strich(deko,[-14.7,2.28,-12.75],[-14.2,2.4,-12.75],.045,GLAS); strich(deko,[-14.2,2.4,-12.75],[-12.9,1.9,-12.75],.045,GLAS);
  for(let i=0;i<9;i++){ const t=ring(deko,.15,.035,i%2?GLAS:0x9ae0f0,-13.9+i*.11,2.28-i*.043,-12.75); t.rotation.y=Math.PI/2; }
  strich(deko,[-13.45,1.06,-12.9],[-13.45,2.05,-12.9],.04,METALL2); box(deko,.5,.07,.4,SCHWARZ,-13.45,1.09,-12.9);
  strich(deko,[-12.9,1.9,-12.75],[-12.85,1.55,-12.75],.04,GLAS); kolben(deko,-12.85,1.06,-12.75,1.1,0x6ae0a0);
  kolben(deko,-12.0,1.06,-12.6,.85,0xc08aff);
  gas(0,-14.7,2.35,-12.7); k.kasten(-13.4,-12.8,4.2,1.2);

  /* ---------- Labortisch mit Kolben (links neben der Tür) ---------- */
  zeile(deko,-3.2,-12.8,3.4,0x3a9aa8);
  kolben(deko,-4.35,1.06,-12.75,1.25,0xff6a9a); kolben(deko,-3.7,1.06,-12.55,.8,0xffd23a); roehrchen(deko,-2.75,1.06,-12.7); rundkolben(deko,-1.85,1.06,-12.75,.95,0x5ab0ff);
  gas(0,-4.35,1.8,-12.75); gas(0,-1.85,1.98,-12.75); k.kasten(-3.2,-12.8,3.6,1.2);

  /* ---------- Algenzucht (rechts neben dem Zahlenschloss) ---------- */
  algenrohr(sc,deko,8.7,-12.65,0x5ac84a); algenrohr(sc,deko,10.15,-12.65,0x9ad83a);
  [8.7,10.15].forEach(x=>blubb[0].push([x+.06,.55,-12.35,2.4,.065,5]));
  strich(deko,[8.7,3.5,-12.65],[10.15,3.5,-12.65],.07,ORANGE); [8.7,10.15].forEach(x=>walze(deko,.07,.2,ORANGE,x,3.43,-12.65));
  k.kasten(9.42,-12.65,2.55,1.1);

  /* ---------- langer Labortisch hinten rechts ---------- */
  zeile(deko,14.2,-12.8,4.8,PETROL);
  roehrchen(deko,12.5,1.06,-12.7); kolben(deko,13.5,1.06,-12.75,1.2,0x6ae0e0); rundkolben(deko,14.4,1.06,-12.8,1.15,0xc06aff);
  /* Brutschrank mit runden Sichtfenstern */
  box(deko,1.5,1.1,.85,WEISS,15.75,1.61,-12.85); [-.34,.34].forEach(a=>{ ring(deko,.24,.06,METALL2,15.75+a,1.68,-12.4); ball(deko,.21,basis(0xffd890),15.75+a,1.68,-12.45,1,1,.2); });
  [-.3,0,.3].forEach((a,i)=>lampe(deko,.05,[0x5aff7a,0xffcf4a,0xff6a5a][i],15.75+a,1.2,-12.41));
  gas(0,13.5,1.78,-12.75); gas(0,14.4,2.1,-12.8); k.kasten(14.2,-12.8,5.0,1.2);

  /* ---------- Labortische und Schränke an den Seitenwänden ---------- */
  const seitenzeile=(s,z,l,farbe)=>{ const p=sg[s<0?0:1], x=s*17.35;
    box(p,1.0,.9,l,farbe,x,.47,z); box(p,1.14,.14,l+.14,HELL,x,.99,z); box(p,.92,.08,l-.1,DUNKEL,x,.04,z);
    const n=Math.max(1,Math.round(l/1.1)); for(let i=0;i<n;i++){ const a=z-l/2+(i+.5)*l/n; box(p,.05,.66,l/n-.14,PETROL2,x-s*.51,.5,a); box(p,.06,.06,.3,MESSING,x-s*.55,.7,a); }
    k.kasten(x,z,1.2,l+.2); return p; };
  /* links hinten: Kolbenreihe */
  let p=seitenzeile(-1,-8.9,3.8,0x3a9aa8);
  rundkolben(p,-17.35,1.06,-10.1,1.2,0xffb03a); kolben(p,-17.2,1.06,-9.1,1.15,0x5ad0ff); kolben(p,-17.45,1.06,-8.4,.8,0xff7a6a); roehrchen(p,-17.35,1.06,-7.6);
  gas(1,-17.35,1.98,-10.1); gas(1,-17.2,1.75,-9.1);
  /* links Mitte: kleiner Labortisch hinter dem Wandaquarium */
  p=seitenzeile(-1,-2.9,2.4,PETROL);
  kolben(p,-17.35,1.06,-3.6,1.0,0x6ae08a); rundkolben(p,-17.35,1.06,-2.4,1.0,0xc08aff);
  /* links vorn: hoher Laborschrank mit bunten Türen */
  p=sg[0]; box(p,1.0,2.7,4.0,HELL,-17.4,1.38,9.0); box(p,1.1,.14,4.1,PETROL2,-17.38,2.8,9.0); box(p,1.08,.14,4.08,DUNKEL,-17.4,.07,9.0);
  [0,1,2,3].forEach(i=>{ const a=7.5+i; box(p,.05,2.3,.88,[0x3ab0b8,0xf0a03a,0x4a90d8,0x6ac070][i],-16.88,1.42,a); box(p,.08,.4,.07,MESSING,-16.83,1.5,a+(i%2?-.28:.28)); [0,1,2].forEach(j=>box(p,.03,.05,.5,SCHWARZ,-16.85,.5+j*.12,a)); });
  kolben(p,-17.3,2.87,8.0,.9,0x5ae0a0); rundkolben(p,-17.3,2.87,10.0,.8,0xff8ac0); k.kasten(-17.4,9.0,1.15,4.15);
  /* rechts hinten: Bücherregal */
  p=sg[1]; box(p,.14,2.9,3.6,HOLZ2,17.9,1.5,-4.2); [-1.8,1.8].forEach(a=>box(p,.8,2.9,.14,HOLZ,17.55,1.5,-4.2+a));
  [.12,1.06,2.0,2.9].forEach(y=>box(p,.8,.12,3.6,HOLZ,17.55,y,-4.2));
  [.18,1.12,2.06].forEach((y,r)=>{ let a=-5.8; let i=0; while(a<-2.65){ const w=.14+((i*3+r)%3)*.05, hh=.55+((i+r*2)%4)*.08; box(p,.52,hh,w,[ROT,BLAU,GRUEN,GELB,LILA,ORANGE,TUERKIS][(i+r*3)%7],17.5,y+hh/2,a+w/2); box(p,.02,.06,w*.8,WEISS,17.23,y+hh*.75,a+w/2); a+=w+.03; i++; } });
  k.kasten(17.55,-4.2,.9,3.8);
  /* rechts Mitte: Labortisch */
  p=seitenzeile(1,-.1,3.2,PETROL);
  roehrchen(p,17.35,1.06,-1.0); kolben(p,17.3,1.06,0,1.2,0xffd23a); rundkolben(p,17.35,1.06,.9,1.2,0x6ae08a);
  gas(2,17.3,1.78,0); gas(2,17.35,2.1,.9);
  /* rechts: Wasserfilter mit zwei Kesseln und Rohrbögen */
  p=sg[1]; box(p,1.2,.24,2.8,DUNKEL,17.25,.12,3.9);
  [3.2,4.6].forEach((z,i)=>{ walze(p,.52,1.9,i?0x3a90d0:0x2ab8b0,17.25,1.19,z); ball(p,.52,i?0x3a90d0:0x2ab8b0,17.25,2.14,z,1,.5,1); [.55,1.75].forEach(y=>reif(p,.53,.05,MESSING,17.25,y,z));
    const u=walze(p,.19,.08,WEISS,16.72,1.35,z); u.rotation.z=Math.PI/2; strich(p,[16.66,1.35,z],[16.66,1.47,z+(i?.08:-.08)],.018,ROT); strich(p,[17.25,2.35,z],[17.25,2.75,z],.09,METALL); });
  strich(p,[17.25,2.75,3.2],[17.25,2.75,4.6],.09,METALL); k.kasten(17.25,3.9,1.3,2.9);
  /* rechts vorn: Schaltschrank mit Lämpchen */
  box(p,1.0,2.4,2.2,0x3a6a78,17.4,1.22,11.4); box(p,1.1,.14,2.3,METALL,17.38,2.48,11.4); box(p,.05,1.0,1.9,SCHWARZ,16.89,1.75,11.4);
  [0,1,2,3,4].forEach(i=>box(p,.05,.06,1.7,METALL2,16.89,.35+i*.15,11.4)); k.kasten(17.4,11.4,1.15,2.35);

  /* ---------- Wandrohre, Lüftungen, Leuchten ---------- */
  [[-15.8,-1.4],[7.4,16]].forEach(([a,b])=>{ strich(wd[0],[a,5.35,-13.3],[b,5.35,-13.3],.07,0x9ac0cc); for(let x=a+.5;x<b;x+=2.3) box(wd[0],.12,.34,.22,METALL2,x,5.35,-13.38); });
  [-15.3,-1.6,8.9].forEach(x=>{ box(wd[0],1.2,.5,.08,DUNKEL,x,.5,-13.45); for(let i=0;i<3;i++) box(wd[0],1.0,.06,.05,METALL,x,.35+i*.15,-13.39); });
  [-1,1].forEach(v=>{ const w=wd[v<0?1:2], X=v*17.9;
    strich(w,[X,4.45,-13.2],[X,4.45,13.2],.08,v<0?GELB:LILA);
    [-9,-2.5,4,10].forEach(z=>{ box(w,.2,.3,.16,METALL2,X,4.45,z); box(w,.1,.2,1.5,DUNKEL,v*17.94,3.85,z); feld(w,.05,.1,1.34,0xd8fff4,v*17.87,3.85,z); });
    [[-12.7,1.8],[v<0?3.8:7.8,2.1]].forEach(([z,y])=>{ box(w,.1,1.0,1.5,DUNKEL,v*17.95,y,z); for(let j=0;j<5;j++) box(w,.06,.07,1.3,METALL,v*17.89,y-.35+j*.17,z); });
    /* Messuhren */
    [v<0?1.9:7.2,v<0?5.2:8.7].forEach((z,i)=>{ const u=walze(w,.46,.1,MESSING,v*17.9,v<0?2.5:3.25,z); u.rotation.z=Math.PI/2; const u2=walze(w,.38,.12,WEISS,v*17.88,v<0?2.5:3.25,z); u2.rotation.z=Math.PI/2;
      strich(w,[v*17.8,v<0?2.5:3.25,z],[v*17.8,(v<0?2.5:3.25)+.24,z+(i?.18:-.14)],.025,ROT); ball(w,.05,SCHWARZ,v*17.8,v<0?2.5:3.25,z); }); });
  wd.forEach(verschmelze); wd.forEach(ohneSchatten);
  [sc,links,rechts].forEach((par,n)=>perlen(k,par,blubb[n]));

  /* blinkende Lämpchen: zwei Gruppen je Wand */
  const blinkFarben=[0x5ff0e0,0xffcf4a,0xff7a6a,0x8af07a].map(f=>basis(f));
  [[hinten,[[-9.9,5.0],[-9.5,5.0],[-9.1,5.0],[-6.9,5.0],[-6.5,5.0],[.1,2.9],[.1,2.5],[.1,2.1],[7.1,4.9],[7.1,4.5],[11.2,4.9],[11.2,5.0]].map(q=>[q[0],q[1],-13.4])],
   [links,[-11.2,-10.6,-10,.2,.8,4.6,5.2,12.4].map((z,i)=>[-17.88,3.15+(i%2)*.2,z])],
   [rechts,[-10.8,-10.2,-9.6,10.6,11,11.4,11.8,12.2].map((z,i)=>i<3?[17.88,3.1+(i%2)*.2,z]:[16.84,2.05-(i%2)*.4,z])]].forEach(([par,liste],n)=>{
    const paar=[gruppe(par,0,0,0),gruppe(par,0,0,0)];
    liste.forEach((q,i)=>{ const j=(i+(i>>2))%2; const b=ball(paar[j],.085,blinkFarben[(n+j*2+(i%3))%4],q[0],q[1],q[2]); b.castShadow=false; });
    paar.forEach(verschmelze); k.anim.push(t=>{ paar[0].visible=Math.sin(t*1.9+n)>-.5; paar[1].visible=Math.sin(t*2.6+n*2+2)>-.4; }); });

  /* ---------- Wasserpumpe (vorn links) ---------- */
  const pumpe=gruppe(stand,-11.3,0,8.7);
  box(pumpe,1.9,.2,1.2,DUNKEL,0,.1,0); quer(pumpe,.45,1.2,ORANGE,-.15,.68,0,'x'); [-.75,.45].forEach(x=>quer(pumpe,.52,.14,METALL2,x,.68,0,'x'));
  box(pumpe,.4,.5,.7,METALL,.68,.45,0); strich(pumpe,[.68,.7,0],[.68,1.3,0],.12,METALL); strich(pumpe,[.68,1.3,0],[-.5,1.3,0],.12,METALL); strich(pumpe,[-.5,1.3,0],[-.5,1.05,0],.12,METALL);
  [-.5,.68].forEach(x=>ball(pumpe,.15,METALL2,x,1.3,0)); ring(pumpe,.26,.05,ROT,.05,1.62,0); strich(pumpe,[.05,1.3,0],[.05,1.62,0],.05,METALL2); strich(pumpe,[-.2,1.62,0],[.3,1.62,0],.03,ROT);
  k.kasten(-11.3,8.7,2.0,1.3);

  /* ---------- Zentrifuge (rechts hinten) ---------- */
  const zentri=gruppe(stand,8.7,0,-7.4);
  walze(zentri,.72,.12,DUNKEL,0,.06,0); rohr(zentri,.34,.46,.62,PETROL,0,.43,0); walze(zentri,.82,.5,WEISS,0,.99,0); reif(zentri,.83,.05,TUERKIS,0,.86,0); walze(zentri,.66,.04,SCHWARZ,0,1.25,0);
  [0,1,2].forEach(i=>lampe(zentri,.06,[0x5aff7a,0xffcf4a,0x5ff0e0][i],-.22+i*.22,1.0,.82));
  const dreher=gruppe(sc,8.7,1.33,-7.4); walze(dreher,.17,.14,MESSING,0,0,0);
  [0,1,2,3,4,5].forEach(i=>{ const a=i*Math.PI/3, x=Math.cos(a)*.42, z=Math.sin(a)*.42; strich(dreher,[0,0,0],[x,0,z],.03,METALL); walze(dreher,.08,.22,[ROT,GELB,GRUEN,BLAU,LILA,ORANGE][i],x,.03,z); });
  verschmelze(dreher); ohneSchatten(dreher); k.anim.push(t=>{ dreher.rotation.y=t*3.2; }); k.kreis(8.7,-7.4,.85);

  /* ---------- kleiner Roboterarm in der vorderen rechten Ecke ---------- */
  const arm=gruppe(sc,15.7,0,9.5); arm.scale.set(.6,.6,.6);
  const tisch=gruppe(arm,0,0,0);
  walze(tisch,.8,.14,DUNKEL,0,.07,0); rohr(tisch,.42,.62,.9,METALL2,0,.58,0,8); walze(tisch,.5,.16,ORANGE,0,1.08,0); reif(tisch,.6,.05,GELB,0,.18,0);
  verschmelze(tisch);
  const hals=gruppe(arm,0,1.17,0), ober=gruppe(hals,0,.1,0), unter=gruppe(ober,0,.95,0), hand=gruppe(unter,.85,0,0);
  ball(hals,.24,METALL2,0,.08,0);
  strich(ober,[0,0,0],[0,.95,0],.12,ORANGE); ball(ober,.19,SCHWARZ,0,.95,0);
  strich(unter,[0,0,0],[.85,0,0],.095,ORANGE); ball(unter,.13,SCHWARZ,.85,0,0);
  strich(hand,[0,0,0],[0,-.28,0],.06,METALL); box(hand,.4,.08,.12,METALL2,0,-.3,0); [-.17,.17].forEach(x=>box(hand,.06,.24,.09,METALL,x,-.44,0)); lampe(hand,.07,0x5ff0e0,0,-.14,.09);
  [hals,ober,unter,hand].forEach(g=>{ const kinder=g.children?g.children.slice().filter(c=>c.isMesh):[]; const fest=new THREE.Group(); g.add(fest); kinder.forEach(c=>fest.add(c)); verschmelze(fest); ohneSchatten(fest); });
  k.anim.push(t=>{ hals.rotation.y=Math.sin(t*.55)*2.4; ober.rotation.z=.16+Math.sin(t*1.1)*.16; unter.rotation.z=-.34-Math.sin(t*1.1+.7)*.2; hand.rotation.z=-ober.rotation.z-unter.rotation.z; });
  k.kreis(15.7,9.5,.75); k.verdecker(arm,15.7,9.5,.7);

  /* ---------- Molekül-Modell (vorn links) ---------- */
  const mol=gruppe(sc,-13.4,0,10.3);
  const mfuss=gruppe(mol,0,0,0); walze(mfuss,.8,.14,DUNKEL,0,.07,0); rohr(mfuss,.25,.5,.5,PETROL,0,.38,0); walze(mfuss,.07,.7,MESSING,0,.9,0); verschmelze(mfuss);
  const mdreh=gruppe(mol,0,1.75,0), atome=[[0,0,0,.34,ROT],[.75,.35,.1,.24,WEISS],[-.7,.42,.25,.24,WEISS],[.15,.8,-.5,.28,BLAU],[-.2,-.45,.65,.22,GELB],[.6,1.2,-.35,.2,WEISS],[-.45,1.1,-.65,.2,GRUEN]];
  [[0,1],[0,2],[0,3],[0,4],[3,5],[3,6]].forEach(([a,b])=>strich(mdreh,atome[a],atome[b],.06,METALL));
  atome.forEach(a=>ball(mdreh,a[3],a[4],a[0],a[1],a[2]));
  verschmelze(mdreh); k.anim.push(t=>{ mdreh.rotation.y=t*.45; }); k.kreis(-13.4,10.3,.95); k.verdecker(mol,-13.4,10.3,.9);

  /* ---------- Walmodell auf einem Holzsockel (vorn rechts) ---------- */
  const wal=gruppe(stand,7.4,0,11.5);
  box(wal,3.0,.36,1.2,HOLZ,0,.18,0); box(wal,3.1,.07,1.3,MESSING,0,.39,0);
  [-.6,.6].forEach(x=>strich(wal,[x,.4,0],[x,.8,0],.07,MESSING));
  ball(wal,.55,0x3a6ab0,.15,1.12,0,2.2,1,1.05); ball(wal,.48,0xd8ecf8,.3,.96,0,2.1,.8,1);
  strich(wal,[-.85,1.12,0],[-1.45,1.35,0],.18,0x3a6ab0); [-1,1].forEach(v=>{ const f=ball(wal,.32,0x3a6ab0,-1.6,1.48,v*.27,.7,.2,1.1); f.rotation.y=v*.55; f.rotation.z=-.25;
    ball(wal,.085,WEISS,.98,1.22,v*.44,1,1,.6); ball(wal,.045,SCHWARZ,1.0,1.22,v*.49); const fl=ball(wal,.3,0x30589a,.3,.82,v*.58,1,.18,.7); fl.rotation.x=v*.5; });
  [[.55,1.94,0],[.42,2.1,.12],[.7,2.12,-.1]].forEach(q=>ball(wal,.09,0x9ae8ff,q[0],q[1],q[2])); strich(wal,[.55,1.62,0],[.55,1.92,0],.04,0x9ae8ff);
  k.kasten(7.25,11.5,3.5,1.35);

  /* ---------- Korallenzucht auf Steinsockeln ---------- */
  const zucht=gruppe(stand,0,0,0);
  const koralle=(x,z,f)=>{ rohr(zucht,.55,.68,.6,0x7a909c,x,.3,z,9); reif(zucht,.56,.06,TUERKIS,x,.6,z);
    [[0,0,.9,0],[-.3,.1,.55,-.5],[.3,-.05,.65,.5],[.05,.28,.45,.15],[-.1,-.28,.5,-.2]].forEach(([a,b,hh,n])=>{ const x2=x+a+n*.35, y2=.6+hh; strich(zucht,[x+a*.5,.6,z+b*.5],[x2,y2,z+b],.09,f); ball(zucht,.13,f,x2,y2,z+b); strich(zucht,[(x+a*.5+x2)/2,.6+hh*.5,z+b*.75],[x2+(n<0?-.2:.22),y2-.08,z+b+.12],.055,f); }); k.kreis(x,z,.7); };
  koralle(-9.7,12.0,0xff6a8a); koralle(-1.9,-6.6,0xffa030); koralle(15.8,-8.6,0xc070e8); koralle(-16.0,5.4,0xffa030); koralle(11.2,12.1,0xff6a8a);

  /* ---------- Laborhocker ---------- */
  const hocker=gruppe(stand,0,0,0);
  [[-7.3,-7.9,ORANGE],[-3.9,-10.8,GELB],[14.6,-10.7,ORANGE],[15.4,.6,GELB],[-15.3,-8.4,ORANGE],[2.2,-7.2,GELB]].forEach(([x,z,f])=>{
    walze(hocker,.42,.16,f,x,.86,z); walze(hocker,.07,.74,METALL,x,.42,z); reif(hocker,.28,.035,METALL2,x,.34,z); [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.4; strich(hocker,[x,.2,z],[x+Math.cos(a)*.38,.04,z+Math.sin(a)*.38],.04,METALL2); }); k.kreis(x,z,.42); });

  /* ---------- niedriger Labortisch vorn ---------- */
  zeile(deko,-2.9,12.35,2.6,0x3a9aa8);
  kolben(deko,-3.75,1.06,12.3,.9,0x5ae0a0); roehrchen(deko,-2.8,1.06,12.35); rundkolben(deko,-1.95,1.06,12.3,.85,0xffa04a);
  gas(0,-1.95,1.9,12.3); k.kasten(-2.9,12.35,2.75,1.2);

  /* ---------- Bodenzier: Leitbahnen, Wellenlinien, Ringe, Gitter, Kabelkanäle ---------- */
  const boden=gruppe(deko,0,0,0);
  const flach=(r1,r2,c,x,y,z,leuchtet)=>{ const m=new THREE.Mesh(new THREE.RingGeometry(r1,r2,48),leuchtet?basis(c):mat(c)); m.rotation.x=-Math.PI/2; m.position.set(x,y,z); boden.add(m); };
  flach(2.25,2.5,PETROL,-2.8,.012,-2.2); flach(2.05,2.12,0x60e8d8,-2.8,.021,-2.2,true);
  /* Kabelkanäle */
  [[-16.5,-5.9,-12.2,-5.9],[10.6,-3.4,16.4,-3.4],[-16.5,11.9,-14.9,11.9]].forEach(([x1,z1,x2],i)=>{ const l=x2-x1; box(boden,l,.025,.34,DUNKEL,(x1+x2)/2,.014+i*.001,z1); [-.1,.1].forEach((a,j)=>box(boden,l-.2,.012,.06,j?ORANGE:TUERKIS,(x1+x2)/2,.034,z1+a)); });
  /* Abflussgitter */
  [[-14.6,.4],[6.9,.4],[-9.8,-1.4],[11.4,-2.2],[-1.4,9.9],[15,4.8]].forEach(([x,z])=>{ box(boden,1.5,.016,1.1,SCHWARZ,x,.01,z); for(let i=0;i<5;i++) box(boden,.1,.02,.98,METALL2,x-.56+i*.28,.03,z); });
  verschmelze(deko); ohneSchatten(deko); verschmelze(stand);
  /* Bodenleuchten, abwechselnd hell */
  const plaetze=[];
  for(let z=-9;z<=11;z+=1.35){ plaetze.push([-15.6,z]); plaetze.push([15.4,z]); }
  for(let x=-14.6;x<=14.8;x+=1.4){ if(x<-.2||x>7) plaetze.push([x,-11.15]); }
  const bl=[0,1,2].map(i=>{ const m=basis(0x70f0e0), liste=plaetze.filter((_,j)=>j%3===i), im=new THREE.InstancedMesh(GEO.box,m,liste.length);
    liste.forEach((q,j)=>{ o.position.set(q[0],.03,q[1]); o.rotation.set(0,0,0); o.scale.set(.24,.04,.24); o.updateMatrix(); im.setMatrixAt(j,o.matrix); }); im.frustumCulled=false; sc.add(im); return m; });
  k.anim.push(t=>{ bl.forEach((m,i)=>m.color.setHex(Math.sin(t*2.6-i*2.09)>.3?0xd8fff8:0x2c908a)); });

  /* ---------- rundes Bodenfenster ins Meer (flach, begehbar) ---------- */
  const BX=-.2, BZ=6.2, BR=2.3;
  const see=new THREE.Mesh(new THREE.CircleGeometry(BR,48),new THREE.MeshBasicMaterial({map:UW.meerBild(512,512)})); see.rotation.x=-Math.PI/2; see.position.set(BX,.013,BZ); sc.add(see);
  [[1,-.55,.5,.28,0],[3,.6,.4,-.22,2.4]].forEach(([n,dz,w,tempo,start])=>{ const f=flachfisch(sc,n===1?0xf08a2a:0xffd23a,n===1?0xffffff:0x2f7fd0,w*1.8,BX,.026+n*.004,BZ); f.rotation.order='YXZ'; f.rotation.x=-Math.PI/2;
    k.anim.push(t=>{ const a=t*tempo+start, r=1.15+dz*.5; f.position.x=BX+Math.cos(a)*r; f.position.z=BZ+Math.sin(a)*r; f.rotation.y=Math.atan2(-Math.cos(a)*Math.sign(tempo),-Math.sin(a)*Math.sign(tempo)); }); });
  const fenster=gruppe(sc,BX,0,BZ);
  const rand=(r,d,c,y)=>{ const t=reif(fenster,r,d,c,0,y,0); t.scale.z=.35; t.castShadow=false; };
  rand(BR+.04,.11,METALL,.03); rand(BR+.28,.07,PETROL,.016);
  [-.77,.77].forEach((a,i)=>{ const l=2*Math.sqrt(BR*BR-a*a); box(fenster,l,.012,.07,METALL,0,.05+i*.001,a); box(fenster,.07,.012,l,METALL,a,.062+i*.001,0); });
  verschmelze(fenster); ohneSchatten(fenster);
  /* ---------- zwei Standleuchten ---------- */
  const leuchten=gruppe(sc,0,0,0);
  [[3.7,7.9],[-4.2,10.2]].forEach(([x,z])=>{ walze(leuchten,.4,.12,DUNKEL,x,.06,z); walze(leuchten,.09,.8,METALL2,x,.52,z); walze(leuchten,.26,.5,basis(0xfff0b0),x,1.16,z); [.9,1.43].forEach(y=>walze(leuchten,.32,.08,PETROL,x,y,z)); kegel(leuchten,.26,.2,PETROL,x,1.57,z); k.kreis(x,z,.42); });
  verschmelze(leuchten);

  /* ---------- Wischroboter: freundliche runde Putzhilfe mit Bürsten ---------- */
  const putz=gruppe(sc,-8.6,0,.6), rumpf=gruppe(putz,0,0,0);
  walze(rumpf,.5,.28,GELB,0,.26,0); reif(rumpf,.5,.05,SCHWARZ,0,.2,0); ball(rumpf,.32,WEISS,0,.4,0,1,.7,1);
  [-1,1].forEach(v=>{ ball(rumpf,.075,SCHWARZ,.27,.53,v*.12); ball(rumpf,.025,WEISS,.33,.56,v*.13); }); strich(rumpf,[-.15,.55,0],[-.22,.9,0],.025,METALL2); lampe(rumpf,.075,0xff6a5a,-.22,.93,0);
  verschmelze(rumpf);
  const buersten=[-1,1].map(v=>{ const b=gruppe(putz,.34,.07,v*.38); [0,1,2].forEach(i=>{ const a=box(b,.44,.05,.07,TUERKIS,0,0,0); a.rotation.y=i*1.047; }); verschmelze(b); return b; });
  k.anim.push(t=>{ buersten.forEach((b,i)=>b.rotation.y=t*(i?9:-9)); });
  laeufer(k,putz,[[-8.6,.6],[-6.2,3.8],[-.2,4.4],[.9,2.0],[1.3,-3.4],[.4,-4.9],[-5.6,-4.4],[-6.8,-1.2]],1.15,0,7);

  /* ---------- Licht ---------- */
  const l1=new THREE.PointLight(0x70e8ff,.6,10,1.5); l1.position.set(-12.3,3.4,-1.8); sc.add(l1);
  const l2=new THREE.PointLight(0x8aff9a,.45,9,1.5); l2.position.set(9.4,2.4,-11); sc.add(l2);
  const l3=new THREE.PointLight(0xffd8a0,.45,12,1.5); l3.position.set(-10,3.6,-9); sc.add(l3);
  const l4=new THREE.PointLight(0xfff0d0,.4,14,1.5); l4.position.set(8,4.5,6); sc.add(l4);

  return { tuer, start:[-1,8.4] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.6,-11.4],[-11,-10.6],[-6.2,-11.6],[-.8,-9.2],[7.8,-10.4],[6.8,-11.2],[16.2,-6.9],[15.6,2],[15.8,7.8],[13.6,11.8],
  [9.8,12.2],[4.8,11.4],[-.4,12.2],[-6,12.2],[-12,12.2],[-15.6,3.6],[-15.8,-5.2],[-10.9,-4.6],[6.8,-8.8],[-9.4,5.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-12.3, z:-3.2, dreh:.2, steh:[-11.8,-1.0], kasten:[3.7,1.7], treffer:[3.4,2.8,1.2], trefferY:.55, baue(g,k){ /* 1 Wandaquarium: kleines rot gerahmtes Becken auf einem Sockelbrett (frei stehend) */
      const h=gruppe(g,0,0,-.45);
      const H1=0xd0522a;
      /* Sockelbrett auf vier Beinen, hinten eine Rückwand */
      box(h,3.4,.18,.95,HOLZ,0,.92,.5); box(h,3.46,.07,1.0,MESSING,0,.8,.5);
      [-1.45,1.45].forEach(x=>[.14,.84].forEach(z=>box(h,.18,.82,.18,HOLZ2,x,.41,z)));
      box(h,2.9,.1,.1,HOLZ2,0,.3,.14); box(h,3.0,1.9,.08,H1,0,2.07,.03);
      /* Rahmen */
      box(h,3.2,.28,.78,H1,0,1.16,.44); box(h,3.2,.28,.78,H1,0,2.98,.44); [-1.46,1.46].forEach(x=>box(h,.28,1.6,.78,H1,x,2.07,.44));
      box(h,3.34,.1,.86,MESSING,0,3.16,.44); [-1,1].forEach(a=>[1.16,2.98].forEach(y=>ball(h,.11,MESSING,a*1.46,y,.85,1,1,.6)));
      ball(h,.22,GELB,0,3.3,.7,1,.8,.5);
      const w=bild(384,224,(p,W,H)=>{ const v=p.createLinearGradient(0,0,0,H); v.addColorStop(0,'#a8f4f8'); v.addColorStop(.5,'#38c0dc'); v.addColorStop(1,'#1878a8'); p.fillStyle=v; p.fillRect(0,0,W,H);
        p.fillStyle='rgba(255,255,255,.15)'; [60,170,300].forEach(x=>{ p.beginPath(); p.moveTo(x,0); p.lineTo(x+30,0); p.lineTo(x-40,H); p.lineTo(x-80,H); p.fill(); });
        p.strokeStyle='#ffffff'; p.lineWidth=5; p.beginPath(); p.moveTo(0,10); for(let x=0;x<=W;x+=24) p.quadraticCurveTo(x+6,2,x+12,10),p.quadraticCurveTo(x+18,18,x+24,10); p.stroke(); });
      tafel(h,w,2.66,1.54,0,2.07,.1);
      /* Sand, Pflanzen, Koralle und Burgfelsen */
      box(h,2.66,.2,.66,SAND,0,1.38,.45);
      [-1.1,-.82,.2].forEach((x,i)=>[0,1,2].forEach(j=>{ const b=ball(h,.3,j%2?0x2e8a48:0x5ac850,x+(j-1)*.12,1.72+(j%2)*.14+(i%2)*.06,.26+j*.06,.2,1.2+(j%2)*.4,.12); b.rotation.z=(j-1)*-.3; }));
      [[0,.62],[-.22,.45],[.24,.5]].forEach(([a,hh])=>{ strich(h,[.88,1.45,.4],[.88+a,1.45+hh,.4],.065,0xff6a8a); ball(h,.09,0xff6a8a,.88+a,1.45+hh,.4); });
      ball(h,.22,0x8aa0a8,-.4,1.5,.5,1.4,.9,.8); ball(h,.15,0xc08ac0,1.18,1.52,.6); ball(h,.11,WEISS,.4,1.5,.68,1.2,.7,1);
      /* Deckel mit Licht */
      feld(h,2.4,.04,.4,0xeafffa,0,2.81,.5);
      pendelfisch(k,h,[0xf08a2a,0xffffff],.72,-.86,.86,2.35,.56,.42,0);
      pendelfisch(k,h,[0xffd23a,0x2f7fd0],.56,-.9,.9,1.92,.7,.3,1.7);
      pendelfisch(k,h,[0xf0509a,0xffd23a],.44,-.95,.95,2.55,.32,.56,3);
      perlen(k,h,[[1.1,1.5,.62,1.2,.05,5]]);
      const glas=box(h,2.66,1.54,.02,basis(0xd8fcff,{transparent:true,opacity:.1,depthWrite:false}),0,2.07,.8); glas.castShadow=false;
      const gl=box(h,.14,1.2,.01,basis(0xffffff,{transparent:true,opacity:.3,depthWrite:false}),-.95,2.12,.82); gl.rotation.z=-.4; gl.castShadow=false; } },
  { x:-9.5, z:-6.2, dreh:.1, steh:[-9.3,-4.1], kasten:[2.5,1.7], treffer:[2.5,2.9,1.7], baue(g){ /* 2 Mikroskop auf einem Tisch */
      [-1,1].forEach(a=>[-1,1].forEach(b=>walze(g,.08,.9,METALL,a*1.05,.45,b*.62)));
      box(g,2.4,.16,1.55,HOLZ,0,.98,0); box(g,2.46,.06,1.61,MESSING,0,.9,0);
      const m=gruppe(g,-.2,1.06,0); m.rotation.y=-.75;
      /* Fuß und gebogener Arm */
      box(m,.95,.18,.72,PETROL,0,.09,0); ball(m,.36,PETROL,.36,.1,0,1,.4,1);
      strich(m,[-.32,.1,0],[-.5,.62,0],.15,TUERKIS); ball(m,.16,TUERKIS,-.5,.62,0); strich(m,[-.5,.62,0],[-.36,1.2,0],.15,TUERKIS); ball(m,.16,TUERKIS,-.36,1.2,0); strich(m,[-.36,1.2,0],[.02,1.34,0],.13,TUERKIS);
      /* Tisch mit Objektträger und Lämpchen */
      box(m,.72,.08,.62,SCHWARZ,.1,.6,0); box(m,.34,.06,.14,SCHWARZ,-.32,.6,0); box(m,.46,.025,.18,0xbff4ff,.14,.655,0); ball(m,.07,0xff6a9a,.16,.675,0,1,.3,1);
      [-1,1].forEach(v=>box(m,.28,.03,.05,METALL,.1,.675,v*.22));
      walze(m,.15,.14,METALL2,.14,.25,0); lampe(m,.11,0xfff4b0,.14,.34,0);
      /* Revolver mit drei Linsen und schräger Tubus */
      walze(m,.2,.12,METALL,.12,1.18,0); [[.14,.95,0,ROT],[-.02,1.0,.15,GELB],[-.02,1.0,-.15,BLAU]].forEach(([x,y,z,f],i)=>{ strich(m,[.1,1.16,0],[x,y-(i?0:.1),z],.065,METALL); ball(m,.072,f,x,y-(i?0:.1),z,1,.6,1); });
      strich(m,[.12,1.2,0],[.12,1.5,0],.19,WEISS); strich(m,[.12,1.45,0],[.5,1.88,0],.13,WEISS); ball(m,.19,WEISS,.12,1.48,0); strich(m,[.5,1.88,0],[.64,2.04,0],.09,SCHWARZ); strich(m,[.62,2.02,0],[.68,2.09,0],.12,SCHWARZ);
      /* Drehknöpfe */
      [-1,1].forEach(v=>{ quer(m,.19,.1,SCHWARZ,-.48,.55,v*.22,'z'); quer(m,.09,.08,MESSING,-.48,.55,v*.3,'z'); });
      /* Glasschälchen mit Wasserproben im Fläschchen */
      [[.72,.3,0x6ae0a0],[.95,.02,0x7ab0ff]].forEach(([x,z,f])=>{ walze(g,.11,.24,f,x,1.18,z); walze(g,.09,.12,GLAS,x,1.36,z); walze(g,.1,.06,HOLZ2,x,1.45,z); }); } },
  { x:-12.0, z:2.8, dreh:.12, steh:[-11.6,4.9], kasten:[2.9,1.6], treffer:[2.6,2.5,1.5], baue(g){ /* 3 Wagen mit Probengläsern */
      [-1,1].forEach(a=>[-1,1].forEach(b=>{ quer(g,.17,.12,SCHWARZ,a*.95,.17,b*.55,'z'); quer(g,.07,.14,METALL,a*.95,.17,b*.55,'z'); walze(g,.055,1.35,METALL,a*1.05,.9,b*.55); ball(g,.08,MESSING,a*1.05,1.6,b*.55); }));
      [.48,1.3].forEach(y=>{ box(g,2.25,.1,1.25,WEISS,0,y,0); [-1,1].forEach(b=>strich(g,[-1.05,y+.2,b*.58],[1.05,y+.2,b*.58],.03,TUERKIS)); });
      /* Schiebegriff */
      strich(g,[1.05,1.55,-.55],[1.4,1.75,-.55],.06,ORANGE); strich(g,[1.05,1.55,.55],[1.4,1.75,.55],.06,ORANGE); strich(g,[1.4,1.75,-.55],[1.4,1.75,.55],.08,ORANGE);
      const probe=(x,y,z,r,hh,f,n)=>{ walze(g,r,hh*.65,f,x,y+hh*.325,z); walze(g,r*.96,hh*.35,GLAS,x,y+hh*.825,z); walze(g,r*1.1,.1,[ROT,BLAU,GELB,SCHWARZ][n%4],x,y+hh+.05,z); box(g,r*1.1,hh*.26,.03,WEISS,x,y+hh*.32,z+r); ball(g,.04,f,x,y+hh*.32,z+r+.025,1,1,.4); };
      [[-.72,.2,.24,.68,0xff8a5a],[-.15,.28,.21,.56,0x4ad09a],[.38,.18,.24,.74,0x6aa8ff],[.85,.3,.18,.5,0xffd23a],[-.45,-.3,.2,.82,0xc080ff],[.15,-.3,.22,.7,0xff7aaa],[.7,-.26,.2,.84,0x8ae05a]].forEach(([x,z,r,hh,f],i)=>probe(x,1.35,z,r,hh,f,i));
      [[-.65,0x6ae0e0],[0,0xffa03a],[.65,0x9a8aff]].forEach(([x,f],i)=>probe(x,.53,.14,.24,.5,f,i+1)); } },
  { x:-2.8, z:-2.2, steh:[-2.5,.3], r:1.5, treffer:[3.0,2.0,3.0], baue(g,k){ /* 4 Seestern-Becken: offenes rundes Becken mit Seesternen */
      walze(g,1.0,.12,DUNKEL,0,.06,0); rohr(g,.6,.8,.55,METALL2,0,.4,0,10);
      rohr(g,1.42,1.1,.5,0x3a90d0,0,.88,0,28); reif(g,1.42,.1,WEISS,0,1.14,0); reif(g,1.28,.06,TUERKIS,0,.9,0);
      walze(g,1.36,.05,SAND,0,1.1,0);
      const stern=(par,x,y,z,r,f,w)=>{ const s=gruppe(par,x,y,z); s.rotation.y=w;
        for(let i=0;i<5;i++){ const a=i*Math.PI*.4, arm=gruppe(s,0,0,0); arm.rotation.y=a; const t=kegel(arm,r*.25,r*.95,f,0,0,r*.52); t.rotation.x=Math.PI/2; t.scale.z=r*.15; ball(arm,r*.07,0xfff0c0,0,r*.13,r*.34); ball(arm,r*.05,0xfff0c0,0,r*.09,r*.62); }
        ball(s,r*.3,f,0,0,0,1,.6,1); return s; };
      /* Steine, auf denen die Seesterne liegen */
      ball(g,.45,0x8a9aa8,-.35,1.12,-.5,1.2,.75,1); ball(g,.3,0xa07a9a,.65,1.14,-.35,1,.8,1); ball(g,.2,0x8a9aa8,-.8,1.13,.35,1,.7,1);
      stern(g,-.38,1.47,-.45,.56,0xff7a1a,.3).rotation.x=.28;
      stern(g,.52,1.22,.42,.68,0xe8308a,1.1);
      stern(g,-.62,1.2,.48,.5,0xffd21a,2.2);
      stern(g,.7,1.4,-.32,.34,0xe83a2a,.8).rotation.x=.35;
      /* ein großer Seestern klebt vorn außen am Becken */
      const vorn=gruppe(g,0,.9,1.31); vorn.rotation.x=Math.PI/2-.5; stern(vorn,0,.04,0,.42,0xff8a2a,Math.PI);
      /* Wasserpflanzen */
      [[-1.0,-.2],[.15,-1.0],[1.05,.05]].forEach(([x,z])=>[0,1,2].forEach(j=>{ const b=ball(g,.28,j%2?0x2e8a48:0x5ac850,x+(j-1)*.1,1.34+(j%2)*.1,z,.18,1.1,.14); b.rotation.z=(j-1)*-.35; }));
      const w=walze(g,1.35,.14,basis(0x50d8f0,{transparent:true,opacity:.28,depthWrite:false}),0,1.21,0); w.castShadow=false;
      const welle=basis(0xffffff,{transparent:true,opacity:.55,depthWrite:false});
      const wellen=[0,1].map(i=>{ const t=reif(g,.4,.015,welle,i?-.1:.15,1.29+i*.012,i?.1:.05); t.castShadow=false; return t; });
      k.anim.push(t=>{ wellen.forEach((r,i)=>{ const s=.5+((t*.3+i*.5)%1)*2.1; r.scale.set(s,s,1); }); }); } },
  { x:9.8, z:1.8, dreh:-.28, steh:[9.4,4.0], r:1.25, treffer:[2.8,2.8,2.2], baue(g,k){ /* 5 Kamera-Drohne: Unterwasserkamera mit Propellern auf einem Ständer */
      walze(g,.8,.12,DUNKEL,0,.06,0); walze(g,.12,.9,METALL,0,.55,0); box(g,1.1,.1,.8,METALL2,0,1.03,0);
      [-1,1].forEach(s=>{ strich(g,[s*.45,1.12,-.5],[s*.45,1.12,.55],.06,SCHWARZ); [-.3,.3].forEach(z=>strich(g,[s*.45,1.12,z],[s*.38,1.38,z],.045,SCHWARZ)); });
      box(g,1.3,.66,1.0,GELB,0,1.65,0); ball(g,.5,GELB,0,1.95,-.05,1.28,.42,.9); box(g,1.34,.12,1.04,ORANGE,0,1.4,0);
      /* großes Objektiv vorn */
      quer(g,.4,.3,SCHWARZ,-.15,1.7,.58,'z'); ring(g,.36,.065,METALL,-.15,1.7,.74); quer(g,.28,.08,0x2a70c0,-.15,1.7,.75,'z'); ball(g,.2,0x50c8ff,-.15,1.7,.78,1,1,.45); ball(g,.065,basis(0xffffff),-.24,1.8,.87);
      /* Scheinwerfer */
      [1.9,1.55].forEach(y=>{ quer(g,.15,.18,METALL2,.42,y,.54,'z'); lampe(g,.11,0xfff8c0,.42,y,.65); });
      strich(g,[-.35,2.12,-.2],[-.35,2.5,-.2],.04,SCHWARZ); const led=basis(0xff4a3a,{transparent:true,opacity:1}); ball(g,.09,led,-.35,2.54,-.2).castShadow=false;
      /* vier Propeller in Schutzringen */
      const prop=[];
      [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>{ const x=a*1.08, z=b*.62; strich(g,[a*.6,1.82,b*.36],[x,1.98,z],.08,SCHWARZ); reif(g,.43,.07,ORANGE,x,2.02,z); walze(g,.09,.22,METALL2,x,2.0,z);
        const pr=gruppe(g,x,2.13,z); [0,1].forEach(i=>{ const f=box(pr,.72,.025,.11,0xe8f4f8,0,i*.004,0); f.rotation.y=i*Math.PI/2; }); beweglich(pr); ohneSchatten(pr); prop.push(pr); });
      k.anim.push(t=>{ prop.forEach((q,i)=>q.rotation.y=t*(i%2?5:-5)); led.opacity=.3+.7*Math.abs(Math.sin(t*2.8)); }); } },
  { wand:'hinten', x:-8.0, z:-13.5, steh:[-8.0,-11.4], kasten:[3.2,.9], treffer:[3.0,3.2,.9], trefferY:.8, baue(g){ /* 6 Meerestier-Poster: großes Plakat mit Tierbildern, ohne Schrift */
      box(g,2.74,3.0,.1,0xf07a2a,0,2.45,.08);
      const tex=bild(512,570,(p)=>{ p.fillStyle='#fff8e4'; p.fillRect(0,0,512,570);
        const feldF=['#bfeaff','#d8f6c8','#ffe0ec','#e8dcff','#fff0b0','#c8f4f0'];
        for(let i=0;i<6;i++){ p.fillStyle=feldF[i]; p.fillRect(16+(i%2)*246,16+Math.floor(i/2)*182,234,174); }
        const oval=(x,y,a,b,f,w)=>{ p.fillStyle=f; p.beginPath(); p.ellipse(x,y,a,b,w||0,0,7); p.fill(); };
        const auge=(x,y,r)=>{ oval(x,y,r,r,'#ffffff'); oval(x+r*.25,y,r*.55,r*.55,'#101418'); };
        const poly=(f,pk)=>{ p.fillStyle=f; p.beginPath(); pk.forEach((q,i)=>i?p.lineTo(q[0],q[1]):p.moveTo(q[0],q[1])); p.fill(); };
        /* Wal */
        poly('#2f6ab8',[[70,110],[34,62],[56,78],[84,58],[88,106]]); oval(140,110,82,48,'#2f6ab8'); oval(150,130,62,24,'#e0f2ff'); auge(186,98,10);
        p.strokeStyle='#3ab0e0'; p.lineWidth=7; [[-22,-4],[0,0],[22,-4]].forEach(a=>{ p.beginPath(); p.moveTo(150,60); p.quadraticCurveTo(150+a[0]*.4,30,150+a[0],38+a[1]); p.stroke(); });
        /* Schildkröte */
        [[336,66],[426,66],[336,146],[426,146]].forEach(q=>oval(q[0],q[1],28,15,'#6ab848',(q[0]<380)===(q[1]<100)?.7:-.7)); oval(450,104,28,22,'#6ab848'); oval(380,106,62,48,'#2e7a40');
        p.strokeStyle='#a8d870'; p.lineWidth=5; p.beginPath(); p.ellipse(380,106,38,28,0,0,7); p.stroke(); auge(458,97,8);
        /* Krake */
        p.strokeStyle='#9a4ac0'; p.lineWidth=17; p.lineCap='round'; for(let i=0;i<6;i++){ const x=82+i*21; p.beginPath(); p.moveTo(x+8,262); p.quadraticCurveTo(x-34+i*10,330,x-24+i*13,356); p.stroke(); }
        oval(134,254,56,50,'#b45ad0'); auge(116,254,13); auge(154,254,13);
        /* Clownfisch */
        poly('#f07a1a',[[326,290],[278,248],[290,290],[278,332]]); oval(386,290,72,44,'#f07a1a'); [352,398].forEach(x=>{ p.fillStyle='#ffffff'; p.fillRect(x,250,16,80); }); auge(434,278,11);
        /* Qualle */
        p.strokeStyle='#8a60d8'; p.lineWidth=7; for(let i=0;i<5;i++){ const x=96+i*19; p.beginPath(); p.moveTo(x,456); p.bezierCurveTo(x+18,482,x-18,504,x+6,536); p.stroke(); }
        p.fillStyle='#b090f0'; p.beginPath(); p.arc(134,458,54,Math.PI,0); p.fill(); auge(117,438,9); auge(151,438,9);
        /* Seepferdchen */
        p.strokeStyle='#f0a018'; p.lineWidth=30; p.beginPath(); p.moveTo(372,430); p.bezierCurveTo(430,470,350,500,380,520); p.stroke();
        p.lineWidth=13; p.beginPath(); p.arc(398,522,18,Math.PI,Math.PI*2.4); p.stroke(); oval(378,424,30,27,'#f0a018'); p.lineWidth=14; p.beginPath(); p.moveTo(388,426); p.lineTo(444,440); p.stroke(); auge(384,416,9); poly('#ffd23a',[[366,452],[322,466],[362,490]]); });
      tafel(g,tex,2.5,2.78,0,2.45,.142);
      [1.0,3.92].forEach(y=>{ quer(g,.09,2.94,HOLZ,0,y,.16,'x'); [-1.5,1.5].forEach(x=>ball(g,.13,MESSING,x,y,.16)); });
      strich(g,[-.9,3.96,.12],[0,4.4,.08],.025,SCHWARZ); strich(g,[.9,3.96,.12],[0,4.4,.08],.025,SCHWARZ); ball(g,.09,ROT,0,4.4,.12); } },
  { x:12.3, z:-8.4, dreh:-.22, steh:[11.8,-6.4], kasten:[3.3,2.0], treffer:[3.1,2.8,1.7], baue(g,k){ /* 7 Forschungscomputer: Schreibtisch mit großem Bildschirm, Tastatur und Rechner */
      [-1.35,1.35].forEach(x=>box(g,.14,.98,1.2,METALL2,x,.49,0)); box(g,2.95,.14,1.45,HELL,0,1.05,0); box(g,2.6,.4,.08,PETROL,0,.7,-.55);
      walze(g,.32,.07,SCHWARZ,-.35,1.15,-.28); strich(g,[-.35,1.15,-.34],[-.35,1.6,-.34],.08,SCHWARZ);
      box(g,2.0,1.35,.14,SCHWARZ,-.35,2.06,-.28);
      const c=document.createElement('canvas'); c.width=384; c.height=252; const p=c.getContext('2d'), tx=new THREE.CanvasTexture(c); tx.minFilter=THREE.LinearFilter;
      const mal=t=>{ p.fillStyle='#0a3a58'; p.fillRect(0,0,384,252);
        const x=70+Math.sin(t*.7)*18; p.fillStyle='#ffc83a'; p.beginPath(); p.ellipse(x+24,66,42,26,0,0,7); p.fill(); p.beginPath(); p.moveTo(x-10,66); p.lineTo(x-40,40); p.lineTo(x-40,92); p.fill(); p.fillStyle='#10243a'; p.beginPath(); p.arc(x+46,58,6,0,7); p.fill();
        for(let i=0;i<6;i++){ const hh=26+Math.abs(Math.sin(t*.9+i*1.3))*76; p.fillStyle=['#5af0c8','#5ab8ff','#ff8ab0'][i%3]; p.fillRect(190+i*30,122-hh,20,hh); }
        p.strokeStyle='rgba(150,230,255,.25)'; p.lineWidth=2; for(let y=150;y<240;y+=28){ p.beginPath(); p.moveTo(14,y); p.lineTo(370,y); p.stroke(); }
        p.strokeStyle='#8affa0'; p.lineWidth=5; p.beginPath(); for(let i=0;i<=44;i++){ const a=14+i*8.1, y=188+Math.sin(i*.45+t*3)*24+Math.sin(i*1.3+t)*9; i?p.lineTo(a,y):p.moveTo(a,y); } p.stroke(); tx.needsUpdate=true; };
      mal(0); tafel(g,tx,1.82,1.19,-.35,2.06,-.198);
      /* Tastatur und Maus */
      box(g,1.45,.08,.5,DUNKEL,-.35,1.16,.34); for(let r=0;r<3;r++) for(let i=0;i<9;i++) box(g,.11,.05,.1,r===2&&i>2&&i<6?TUERKIS:WEISS,-.95+i*.15,1.22,.19+r*.14);
      box(g,.5,.02,.5,PETROL,.72,1.13,.34); ball(g,.13,WEISS,.72,1.2,.34,.8,.55,1.2);
      /* Rechnerturm */
      box(g,.62,1.15,.8,DUNKEL,1.05,1.7,-.2); box(g,.5,.9,.03,METALL2,1.05,1.7,.21); [0,1,2].forEach(i=>box(g,.38,.06,.03,SCHWARZ,1.05,1.4+i*.14,.23));
      const led=[0,1].map(i=>basis(i?0xffcf4a:0x5aff7a,{transparent:true,opacity:1})); led.forEach((m,i)=>{ ball(g,.06,m,.92+i*.26,2.03,.23).castShadow=false; });
      let letzt=-1; k.anim.push(t=>{ const n=Math.floor(t*7); if(n!==letzt){ letzt=n; mal(t); } led[0].opacity=.35+.65*Math.abs(Math.sin(t*3)); led[1].opacity=.35+.65*Math.abs(Math.sin(t*4.6)); }); } },
  { x:-6.6, z:7.2, dreh:.15, steh:[-6.4,9.4], kasten:[2.4,1.7], treffer:[2.3,2.2,1.6], baue(g,k){ /* 8 Kühlbox für Proben: weiß-blaue Box mit Schneeflocke, Deckel einen Spalt offen */
      const B1=0x2f6fd0;
      box(g,2.0,1.0,1.2,WEISS,0,.62,0); box(g,2.08,.2,1.28,B1,0,.2,0); box(g,2.08,.14,1.28,B1,0,1.1,0);
      [-1,1].forEach(a=>[-1,1].forEach(b=>{ box(g,.18,1.1,.18,B1,a*.97,.62,b*.57); ball(g,.12,SCHWARZ,a*.82,.08,b*.45,1,.7,1); }));
      /* Schneeflocke */
      for(let i=0;i<3;i++){ const a=i*Math.PI/3+Math.PI/2, x=Math.cos(a)*.34, y=Math.sin(a)*.34; strich(g,[-x,.65-y,.63],[x,.65+y,.63],.035,0x3a9ae8);
        [-1,1].forEach(s=>[-.4,.4].forEach(d=>{ const w=a+d*1.6; strich(g,[s*x*.62,.65+s*y*.62,.63],[s*x*.62+Math.cos(w+(s<0?Math.PI:0))*.12,.65+s*y*.62+Math.sin(w+(s<0?Math.PI:0))*.12,.63],.022,0x3a9ae8); })); }
      ball(g,.07,WEISS,0,.65,.65,1,1,.5);
      /* Inneres mit Eis und Probenröhrchen */
      box(g,1.8,.04,1.0,0x9ae0ff,0,1.19,0);
      [-.65,-.25,.2,.62].forEach((x,i)=>{ walze(g,.09,.34,[0xff7a5a,0x5ad08a,0xc080ff,0xffd23a][i],x,1.34,.26); walze(g,.11,.07,METALL2,x,1.54,.26); });
      [[-.5,0],[0,.38],[.45,.02],[.82,.3]].forEach(([x,z],i)=>{ const e=box(g,.24,.2,.22,0xd8f6ff,x,1.27,z); e.rotation.y=i*.8; e.rotation.z=.2; });
      /* aufgeklappter Deckel mit Griff */
      const d=gruppe(g,0,1.18,-.6); d.rotation.x=-.85; box(d,2.1,.22,1.28,B1,0,.11,.64); box(d,1.75,.05,.95,WEISS,0,.24,.64);
      [-.45,.45].forEach(x=>strich(d,[x,.22,1.2],[x,.48,1.26],.055,SCHWARZ)); strich(d,[-.45,.48,1.26],[.45,.48,1.26],.075,SCHWARZ);
      [-1,1].forEach(a=>{ box(g,.1,.3,.46,METALL,a*1.07,.82,0); });
      /* Temperaturanzeige */
      box(g,.4,.24,.04,SCHWARZ,.65,.85,.62); feld(g,.28,.1,.02,0x8affff,.65,.85,.65);
      /* kalter Dampf */
      const nebel=[0,1,2,3].map(i=>schein(g,'rgba(220,248,255,.55)',-.6+i*.4,1.4,.4,.7));
      k.anim.push(t=>{ nebel.forEach((n,i)=>{ const a=(t*.3+i*.27)%1; n.position.y=1.35+a*.7; n.position.z=.35+a*.5; n.material.opacity=.7*(1-a); const s=.45+a*.6; n.scale.set(s,s,1); }); }); } },
  { x:5.6, z:-4.0, dreh:-.06, steh:[5.5,-1.9], kasten:[3.6,1.4], treffer:[3.5,2.9,1.3], baue(g,k){ /* 9 Laborwaage: große Balkenwaage mit zwei Schalen und Gewichten */
      box(g,2.8,.34,1.2,HOLZ,0,.17,0); box(g,2.9,.07,1.3,HOLZ2,0,.37,0);
      rohr(g,.22,.4,.3,MESSING,0,.55,0); walze(g,.1,1.8,MESSING,0,1.55,0); reif(g,.15,.04,MESSING,0,1.1,0); ball(g,.16,MESSING,0,2.46,0);
      /* Skala hinter dem Zeiger */
      const sk=walze(g,.34,.05,WEISS,0,1.65,.1); sk.rotation.x=Math.PI/2; ring(g,.35,.04,MESSING,0,1.65,.12); [-.6,-.3,0,.3,.6].forEach(a=>strich(g,[Math.sin(a)*.22,1.65+Math.cos(a)*.22,.14],[Math.sin(a)*.3,1.65+Math.cos(a)*.3,.14],.014,SCHWARZ));
      const gold=0xf0c050, kette=0x9aa8b0, rot=0xe0443a;
      const balken=gruppe(g,0,2.36,.18); strich(balken,[-1.2,0,0],[1.2,0,0],.07,gold); ball(balken,.1,rot,0,0,.04); strich(balken,[0,0,.02],[0,-.5,0],.03,rot);
      [-1.2,1.2].forEach(x=>ball(balken,.1,gold,x,0,0)); beweglich(balken);
      const schalen=[-1,1].map(s=>{ const h2=gruppe(g,s*1.2,2.36,.18);
        [[-.46,0],[.46,0],[0,-.4]].forEach(([x,z])=>strich(h2,[0,0,0],[x,-1.08,z],.022,kette));
        rohr(h2,.54,.34,.16,gold,0,-1.15,0); reif(h2,.54,.035,gold,0,-1.07,0);
        return h2; });
      /* links ein Stein, rechts zwei Gewichte */
      ball(schalen[0],.25,0x6a8a9a,0,-.9,0,1.2,.85,1);
      [[-.18,.28,.14],[.2,.2,.11]].forEach(([x,hh,r])=>{ walze(schalen[1],r,hh,0x7a8890,x,-1.07+hh/2,0); ball(schalen[1],r*.45,0x7a8890,x,-1.05+hh+.04,0); });
      schalen.forEach(beweglich);
      /* Gewichtssatz auf dem Sockel */
      [[-.95,.16,.34],[-.58,.13,.27],[.55,.1,.22],[.82,.085,.18],[1.05,.07,.14]].forEach(([x,r,hh])=>{ walze(g,r,hh,MESSING,x,.4+hh/2,.42); ball(g,r*.5,MESSING,x,.4+hh+r*.35,.42); });
      k.anim.push(t=>{ const a=Math.sin(t*1.1)*.07; balken.rotation.z=a; schalen.forEach((s,i)=>{ const v=i?1:-1; s.position.set(v*1.2*Math.cos(a),2.36+v*1.2*Math.sin(a),.18); }); }); } },
  { x:13.2, z:7.6, steh:[11.6,9.2], r:1.15, treffer:[2.3,3.0,2.0], baue(g,k){ /* 10 Weltkugel der Meere: großer Globus mit viel Blau */
      walze(g,.82,.14,HOLZ2,0,.07,0); walze(g,.6,.1,MESSING,0,.19,0); rohr(g,.14,.38,.55,HOLZ,0,.5,0); ball(g,.18,MESSING,0,.8,0);
      const Y=1.92, R=.92, neig=.38;
      const bogen=ring(g,R+.14,.055,MESSING,0,Y,0,Math.PI*1.08); bogen.rotation.z=Math.PI*.5+neig-.12;
      strich(g,[0,.8,0],[Math.sin(.12)*(R+.14),Y-Math.cos(.12)*(R+.14),0],.07,MESSING);
      const achse=gruppe(g,0,Y,0); achse.rotation.z=neig; walze(achse,.045,2*R+.36,MESSING,0,0,0); [-1,1].forEach(s=>ball(achse,.11,MESSING,0,s*(R+.2),0));
      const tex=bild(512,256,(p)=>{ const v=p.createLinearGradient(0,0,0,256); v.addColorStop(0,'#58b8f0'); v.addColorStop(.5,'#1668c8'); v.addColorStop(1,'#58b8f0'); p.fillStyle=v; p.fillRect(0,0,512,256);
        p.strokeStyle='rgba(220,245,255,.35)'; p.lineWidth=1.5; for(let x=0;x<=512;x+=51.2){ p.beginPath(); p.moveTo(x,0); p.lineTo(x,256); p.stroke(); } for(let y=32;y<256;y+=32){ p.beginPath(); p.moveTo(0,y); p.lineTo(512,y); p.stroke(); }
        const land=(f,pk)=>{ p.fillStyle=f; p.beginPath(); pk.forEach((q,i)=>i?p.lineTo(q[0],q[1]):p.moveTo(q[0],q[1])); p.closePath(); p.fill(); };
        const G='#58b848', B='#d8b860';
        land(G,[[34,56],[84,40],[128,58],[112,84],[92,92],[104,112],[80,108],[56,84]]); land(G,[[104,124],[138,134],[150,156],[124,196],[112,208],[108,164],[96,140]]);
        land(G,[[232,52],[258,42],[276,58],[252,72],[234,68]]); land(B,[[236,86],[282,84],[304,108],[284,126],[272,170],[254,178],[246,134],[222,112]]);
        land(G,[[278,40],[356,30],[428,48],[436,74],[398,84],[390,112],[366,96],[344,120],[322,88],[286,74]]); land(B,[[404,150],[446,142],[462,166],[438,184],[406,174]]);
        p.fillStyle='#f4fcff'; p.fillRect(0,0,512,16); p.fillRect(0,238,512,18);
        p.strokeStyle='rgba(255,255,255,.8)'; p.lineWidth=2.5; [[30,150],[180,70],[190,170],[330,170],[480,110],[40,200],[350,215]].forEach(([x,y])=>{ p.beginPath(); p.moveTo(x,y); p.quadraticCurveTo(x+7,y-7,x+14,y); p.quadraticCurveTo(x+21,y+7,x+28,y); p.stroke(); }); });
      const kugel=new THREE.Mesh(new THREE.SphereGeometry(R,32,22),new THREE.MeshLambertMaterial({map:tex})); kugel.castShadow=true; achse.add(kugel);
      k.anim.push(t=>{ kugel.rotation.y=t*.3; }); } }
];

return { titel:'Das Forschungslabor', breite:36, tiefe:27, oben:UW.OBEN, baue, gegenstaende, verstecke };
})();

/* Raum 3: Der Glastunnel. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Niedrige Sockelwand, darüber große Glasflächen mit Blick ins Meer, Metallbögen oben.
   Ausgang: runde Taucher-Luke mit Handrad in der Rückwand, dahinter ein heller Gang.
   Die Krake Kiki winkt draußen hinter dem Glas. */
RAEUME3D.unterwasser[2] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, GELB, ORANGE, ROT, TUERKIS, BLAU, GRUEN, ROSA, LILA, SAND, MESSING } = UW;
const STAHL=0x8fa6b4, HOLZ=0xa86a36, HOLZ2=0x6e4220, KUPFER=0xc8743a, SCHWARZ=0x182430, PERL=0xfff6ff, MEER=0x0f5878;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* kurze Walze mit Achse nach vorn (+z) */
const scheibe=(p,r,d,c,x,y,z)=>{ const w=walze(p,r,d,c,x,y,z); w.rotation.x=Math.PI/2; return w; };
/* Walze mit Achse quer (x) */
const quer=(p,r,l,c,x,y,z)=>{ const w=walze(p,r,l,c,x,y,z); w.rotation.z=Math.PI/2; return w; };
/* Zug aus Stäben durch mehrere Punkte mit runden Gelenken */
const zug=(p,punkte,r,c)=>{ for(let i=1;i<punkte.length;i++) strich(p,punkte[i-1],punkte[i],r,c); punkte.forEach(q=>ball(p,r*1.06,c,q[0],q[1],q[2])); };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const zwischen=(a,b)=>a+zufall()*(b-a);
/* nur große Teile werfen Schatten (weniger Zeichenaufrufe) */
const grossSchatten=g=>g.traverse(m=>{ if(m.isMesh && Math.max(m.scale.x,m.scale.y,m.scale.z)<.5) m.castShadow=false; });
/* viele gleiche Teile als ein Körper */
function viele(par,geo,m,n){ const i=new THREE.InstancedMesh(geo,m,n); i.frustumCulled=false; i.castShadow=false; par.add(i); return i; }
const dummy=()=>new THREE.Object3D();
/* Seestern, flach auf der Seite liegend (Blick nach oben) */
function seestern(p,r,c,x,y,z,dreh){
  const g=gruppe(p,x,y,z); g.rotation.y=dreh||0;
  for(let i=0;i<5;i++){ const a=gruppe(g,0,0,0); a.rotation.y=i*Math.PI*2/5; const k=kegel(a,r*.3,r,c,r*.5,0,0); k.rotation.z=-Math.PI/2; k.scale.x=r*.16; }
  ball(g,r*.32,c,0,0,0,1,.55,1); ball(g,r*.09,0xfff0c0,0,r*.17,0);
  return g;
}

/* ---------- Korallen (für Glashaube und Meer) ---------- */
function astkoralle(p,x,y,z,h,c,dreh){
  const a=dreh||0, co=Math.cos(a), si=Math.sin(a), P=(u,v)=>[x+u*h*co,y+v*h,z+u*h*si];
  const aeste=[[[0,0],[0,.45]],[[0,.45],[-.32,.75]],[[-.32,.75],[-.38,1]],[[-.32,.75],[-.14,.92]],[[0,.45],[.05,.82]],[[.05,.82],[.0,1.08]],[[0,.28],[.34,.55]],[[.34,.55],[.42,.86]],[[.34,.55],[.58,.66]]];
  aeste.forEach((s,i)=>{ const r=h*(i===0?.1:.065), A=P(s[0][0],s[0][1]), B=P(s[1][0],s[1][1]); strich(p,A,B,r,c); ball(p,r*1.15,c,B[0],B[1],B[2]); });
}
function hirnkoralle(p,x,y,z,r,c,c2){
  ball(p,r,c,x,y+r*.45,z,1,.75,1);
  [-.5,0,.5].forEach((v,i)=>{ const t=ring(p,r*(i===1?.98:.84),r*.07,c2,x+v*r,y+r*.45,z,Math.PI); t.rotation.y=Math.PI/2; t.scale.y=.76; });
}
function roehrenkoralle(p,x,y,z,h,c){
  [[0,0,1],[.36,.1,.7],[-.3,.18,.8],[.08,-.34,.55],[-.16,-.2,.4]].forEach(([u,v,f])=>{ walze(p,h*.13,h*f,c,x+u*h,y+h*f/2,z+v*h); walze(p,h*.15,h*.07,0xfff0b0,x+u*h,y+h*f,z+v*h); walze(p,h*.09,h*.04,0x4a2040,x+u*h,y+h*f+h*.035,z+v*h); });
}
function faecherkoralle(p,x,y,z,h,c,c2,dreh){
  const g=gruppe(p,x,y,z); g.rotation.y=dreh||0;
  walze(g,h*.06,h*.3,c2,0,h*.15,0); ball(g,h*.45,c,0,h*.62,0,1.1,1,.09);
  for(let i=-3;i<=3;i++) strich(g,[0,h*.25,.0],[Math.sin(i*.38)*h*.5,h*.25+Math.cos(i*.38)*h*.78,0],h*.052,c2);
}

/* =============== Raum =============== */
function baue(k){
  const sc=k.scene, B=36, T=27;
  sc.background=new THREE.Color(MEER); sc.fog=new THREE.Fog(MEER,34,82);
  UW.licht(sc,{ himmel:0xc4ecff, grund:0x24506c, staerke:.82, sonne:0x9cd4ff, sonneStaerke:.46 });
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts');

  /* ---------- Böden: innen Metallplatten, außen Meeressand ---------- */
  const bt=UW.plattenBild([84,126,146]); bt.wrapS=bt.wrapT=THREE.RepeatWrapping; bt.repeat.set(B/5,(T+.4)/5);
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(B,T),new THREE.MeshLambertMaterial({map:bt})); boden.rotation.x=-Math.PI/2; boden.receiveShadow=true; sc.add(boden);
  const st=bild(512,512,(g)=>{ g.fillStyle='#8fa68c'; g.fillRect(0,0,512,512);
    for(let i=0;i<2400;i++){ g.fillStyle=['#a8bc9a','#76907c','#b9c8a4','#82988a'][i%4]; g.fillRect(zufall()*508,zufall()*508,2+zufall()*3,2+zufall()*3); }
    g.strokeStyle='rgba(225,245,215,.28)'; g.lineWidth=7; for(let r=0;r<8;r++){ const y=r*64+30; g.beginPath(); g.moveTo(0,y); for(let x=0;x<=512;x+=32) g.lineTo(x,y+Math.sin(x*Math.PI/128+r)*12); g.stroke(); } });
  st.wrapS=st.wrapT=THREE.RepeatWrapping; st.repeat.set(17,17);
  const grund=new THREE.Mesh(new THREE.PlaneGeometry(180,180),new THREE.MeshLambertMaterial({map:st})); grund.rotation.x=-Math.PI/2; grund.position.y=-.07; grund.receiveShadow=true; sc.add(grund);

  /* ---------- Glaswände mit Sockel, Pfosten und Bögen ---------- */
  const tex=UW.plattenBild([58,104,124]);
  const glasM=basis(0xaaeaff,{transparent:true,opacity:.07,depthWrite:false,side:THREE.DoubleSide});
  const glanzM=basis(0xffffff,{transparent:true,opacity:.09,depthWrite:false,side:THREE.DoubleSide});
  const glas=(par,w,x,z,dreh)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,4.9),glasM); m.position.set(x,3.5,z); m.rotation.y=dreh; m.renderOrder=2; par.add(m); };
  const glanz=(par,x,y,z,dreh,h)=>{ const g=gruppe(par,x,y,z); g.rotation.y=dreh; const m=new THREE.Mesh(new THREE.PlaneGeometry(.22,h),glanzM); m.rotation.z=-.55; m.renderOrder=3; g.add(m); const n=new THREE.Mesh(new THREE.PlaneGeometry(.08,h*.7),glanzM); n.position.x=.42; n.rotation.z=-.55; n.renderOrder=3; g.add(n); };
  /* Rückwand: links und rechts vom Schott mit der Luke */
  UW.wandStueck(hinten,tex,11.6,1,.5,-12.7,.5,-13.75); UW.wandStueck(hinten,tex,19.6,1,.5,8.7,.5,-13.75);
  glas(hinten,11.6,-12.7,-13.72,0); glas(hinten,19.6,8.7,-13.72,0);
  [[-16.1,2.6],[-8.4,3],[2.6,2.6],[9,2.4],[15.8,2.8]].forEach(([x,h])=>glanz(hinten,x,3.2,-13.66,0,h));
  const rk=gruppe(hinten,0,0,0);
  box(rk,11.6,.14,.62,METALL,-12.7,1.06,-13.7); box(rk,19.6,.14,.62,METALL,8.7,1.06,-13.7); box(rk,37,.4,.7,METALL2,0,6.12,-13.75); box(rk,37,.08,.1,basis(0x60f0e0),0,5.88,-13.38);
  [-12.7,8.7].forEach((x,i)=>box(rk,i?19.6:11.6,.08,.06,basis(0x60f0e0),x,.2,-13.48));
  const HP=[-17.8,-14.05,-10.95,-6.9,-1.1,1.8,7.6,10.75,14.25,17.8];
  HP.forEach(x=>{ if(x!==-6.9 && x!==-1.1){ box(rk,.32,6,.4,METALL2,x,3,-13.55); box(rk,.56,.26,.56,METALL,x,.13,-13.5); [1.6,2.8,4].forEach(y=>ball(rk,.08,MESSING,x,y,-13.34)); }
    zug(rk,[[x,4.7,-13.4],[x,5.55,-13.15],[x,6.1,-12.7],[x,6.4,-12.15]],.11,METALL); });
  /* Bögen zwischen den Pfosten */
  const bogen=(par,x,y,z,r,hoch,dreh,c)=>{ const t=ring(par,r,.12,c,x,y,z,Math.PI); t.scale.y=hoch/r; t.rotation.y=dreh; };
  for(let i=1;i<HP.length;i++){ const a=HP[i-1], b=HP[i]; if(a===-6.9) continue; bogen(rk,(a+b)/2,4.05,-13.46,(b-a)/2-.06,1.5,0,METALL); bogen(rk,(a+b)/2,3.85,-13.52,(b-a)/2-.1,1.35,0,ORANGE); }
  /* geschlossene Felder hinter Rettungsring und Karte */
  [[-12.5,2.86],[12.5,3.26]].forEach(([x,w])=>{ box(rk,w,3.5,.3,0xdce8ee,x,2.6,-13.45); box(rk,w,.16,.34,ORANGE,x,4.32,-13.45); box(rk,w,.16,.34,ORANGE,x,.9,-13.45);
    [-1,1].forEach(s=>[1.15,4.05].forEach(y=>ball(rk,.08,MESSING,x+s*(w/2-.22),y,-13.29))); });
  verschmelze(rk); ohneSchatten(rk);

  /* Seitenwände */
  const SP=[-13.3,-8.1,-2.7,2.7,8.1,13.3], quallenLampen=[];
  [[links,-1],[rechts,1]].forEach(([w,s])=>{
    UW.wandStueck(w,tex,.5,1,T,s*18.25,.5,0); glas(w,T,s*18.22,0,Math.PI/2);
    [[-10.7,2.6],[.2,3],[10.4,2.4]].forEach(([z,h])=>glanz(w,s*18.16,3.2,z,Math.PI/2,h));
    const g=gruppe(w,0,0,0), X=s*18;
    box(g,.62,.14,T,METALL,s*18.2,1.06,0); box(g,.7,.4,T+1,METALL2,s*18.25,6.12,0); box(g,.1,.08,T-.4,basis(0x60f0e0),X-s*.38,5.88,0); box(g,.06,.08,T-.4,basis(0x60f0e0),X-s*.02,.2,0);
    SP.forEach(z=>{ box(g,.4,6,.32,METALL2,X+s*.05,3,z); box(g,.56,.26,.56,METALL,X,.13,z); [1.6,2.8,4].forEach(y=>ball(g,.08,MESSING,X-s*.16,y,z));
      zug(g,[[X-s*.1,4.7,z],[X-s*.35,5.55,z],[X-s*.8,6.1,z],[X-s*1.35,6.4,z]],.11,METALL); });
    for(let i=1;i<SP.length;i++){ const a=SP[i-1], b=SP[i]; bogen(g,X-s*.04,4.05,(a+b)/2,(b-a)/2-.06,1.5,Math.PI/2,METALL); bogen(g,X+s*.02,3.85,(a+b)/2,(b-a)/2-.1,1.35,Math.PI/2,ORANGE); }
    /* Rohre am Sockel und Handlauf */
    const r1=walze(g,.13,T-.6,s<0?ORANGE:TUERKIS,X-s*.14,.55,0); r1.rotation.x=Math.PI/2;
    const r2=walze(g,.05,T-.6,MESSING,X-s*.22,1.35,0); r2.rotation.x=Math.PI/2;
    SP.forEach(z=>{ strich(g,[X,1.35,z],[X-s*.22,1.35,z],.04,MESSING); box(g,.34,.36,.22,METALL,X-s*.12,.55,Math.max(-13,Math.min(13,z))); });
    /* Lampen in Quallenform unter den Bögen */
    [-5.4,5.4].forEach((z,i)=>{ const x=X-s*.55; strich(g,[X,5.9,z],[x,5.85,z],.05,METALL2); strich(g,[x,5.85,z],[x,4.95,z],.025,METALL2);
      const f=[0x90f0ff,0xffb8e8,0xc8b0ff][(i+(s>0?1:0))%3];
      const dom=new THREE.Mesh(new THREE.SphereGeometry(.42,18,10,0,Math.PI*2,0,Math.PI*.55),basis(f)); dom.position.set(x,4.55,z); g.add(dom);
      reif(g,.41,.05,WEISS,x,4.5,z); [-.22,0,.22].forEach(v=>zug(g,[[x,4.5,z+v],[x+.07,4.22,z+v*1.15],[x-.03,3.95,z+v*1.3]],.025,basis(f)));
      quallenLampen.push([w,x,4.55,z]); });
    verschmelze(g); ohneSchatten(g);
  });
  quallenLampen.forEach(([w,x,y,z])=>schein(w,'rgba(170,235,255,.5)',x,y,z,1.8));
  /* vordere Kante */
  const kante=gruppe(sc,0,0,0); box(kante,37,.2,.4,METALL2,0,.1,13.72); for(let x=-16.5;x<17;x+=3) box(kante,.5,.1,.46,ORANGE,x,.2,13.72); verschmelze(kante); ohneSchatten(kante);

  /* =============== Ausgang: Taucher-Luke =============== */
  const LX=-4, LY=1.75;
  const schott=gruppe(hinten,LX,0,0);
  const form=new THREE.Shape(); form.moveTo(-2.9,0); form.lineTo(2.9,0); form.lineTo(2.9,5.6); form.lineTo(-2.9,5.6); form.lineTo(-2.9,0);
  const loch=new THREE.Path(); loch.absarc(0,LY,1.65,0,Math.PI*2,true); form.holes.push(loch);
  const platte=new THREE.Mesh(new THREE.ExtrudeGeometry(form,{depth:.4,bevelEnabled:false,curveSegments:32}),mat(0x6e8a9a)); platte.position.z=-13.75; platte.receiveShadow=true; schott.add(platte);
  ring(schott,1.76,.15,MESSING,0,LY,-13.36);
  for(let i=0;i<16;i++){ const a=i*Math.PI/8+.2, y=LY+Math.sin(a)*2.1; if(y>.15 && !(Math.cos(a)>.7 && y>1.4 && y<3.6)) ball(schott,.09,MESSING,Math.cos(a)*2.1,y,-13.32); }
  [-2.9,2.9].forEach(x=>{ box(schott,.36,6,.44,ORANGE,x,3,-13.52); box(schott,.6,.26,.6,METALL,x,.13,-13.46); });
  box(schott,5.9,.3,.5,ORANGE,0,5.6,-13.5); bogen(schott,0,4.05,-13.3,2.6,1.35,0,ORANGE);
  /* Druckanzeigen und Rohre am Schott */
  [[-2.25,4.15],[2.25,4.15]].forEach(([x,y],i)=>{ scheibe(schott,.34,.1,MESSING,x,y,-13.31); scheibe(schott,.27,.04,WEISS,x,y,-13.25); strich(schott,[x,y,-13.22],[x+(i?-.15:.15),y+.14,-13.22],.025,ROT); ball(schott,.05,SCHWARZ,x,y,-13.22); strich(schott,[x,y-.34,-13.3],[x,i?3.5:1,-13.3],.06,KUPFER); });
  box(schott,1.2,.1,.1,DUNKEL,2.35,1.45,-13.31);
  /* fester Scharnierpfosten am Rahmen */
  walze(schott,.085,2.5,METALL,-1.7,LY,-13.12);
  [-1.2,0,1.2].forEach(v=>{ box(schott,.34,.24,.34,METALL2,-1.86,LY+v,-13.23); walze(schott,.14,.2,METALL2,-1.7,LY+v*1.0,-13.12); });
  verschmelze(schott); ohneSchatten(schott);
  /* Gang hinter der Luke */
  const gang=gruppe(hinten,LX,0,0);
  const gr=new THREE.Mesh(new THREE.CylinderGeometry(1.72,1.72,3.6,24,1,true),mat(0x3a6478,{side:THREE.DoubleSide,emissive:0x12303c})); gr.rotation.x=Math.PI/2; gr.position.set(0,LY,-15.55); gang.add(gr);
  [-14.6,-15.7,-16.8].forEach(z=>ring(gang,1.66,.07,basis(0xbff8ff),0,LY,z));
  [-17.32].forEach(z=>ring(gang,1.74,.14,METALL,0,LY,z));
  box(gang,1.9,.08,3.7,METALL2,0,.08,-15.55); [-.7,.7].forEach(x=>box(gang,.1,.03,3.6,basis(0xffe890),x,.13,-15.55));
  scheibe(gang,1.7,.06,basis(0xffefb8),0,LY,-17.28);
  verschmelze(gang); ohneSchatten(gang);
  /* Lukendeckel (Scharnier links) mit Handrad */
  const angel=gruppe(sc,LX-1.7,LY,-13.12), blatt=gruppe(angel,1.7,0,0);
  scheibe(blatt,1.66,.2,STAHL,0,0,0); ring(blatt,1.5,.09,METALL2,0,0,.11); ring(blatt,1.08,.07,ORANGE,0,0,.11); scheibe(blatt,.5,.1,METALL2,0,0,.12);
  for(let i=0;i<12;i++){ const a=i*Math.PI/6+.26; ball(blatt,.085,MESSING,Math.cos(a)*1.32,Math.sin(a)*1.32,.12); }
  [-.8,.8].forEach(y=>{ [-.13,.13].forEach(z=>box(blatt,1.1,.22,.09,DUNKEL,-1.2,y,z)); walze(blatt,.15,.42,MESSING,-1.7,y,0); });
  /* Rückseite (bei offener Luke zu sehen) */
  ring(blatt,1.5,.09,METALL2,0,0,-.11); ring(blatt,1.08,.07,ORANGE,0,0,-.11); scheibe(blatt,.5,.1,METALL2,0,0,-.12); ring(blatt,.5,.06,ROT,0,0,-.2); scheibe(blatt,.16,.18,MESSING,0,0,-.16);
  [0,1,2].forEach(i=>{ const a=i*Math.PI/3; strich(blatt,[Math.cos(a)*-.5,Math.sin(a)*-.5,-.2],[Math.cos(a)*.5,Math.sin(a)*.5,-.2],.04,ROT); });
  for(let i=0;i<12;i++){ const a=i*Math.PI/6+.26; ball(blatt,.085,MESSING,Math.cos(a)*1.32,Math.sin(a)*1.32,-.11); }
  verschmelze(blatt); ohneSchatten(blatt);
  const rad=gruppe(blatt,0,0,.3);
  ring(rad,.74,.1,ROT,0,0,0); for(let i=0;i<3;i++){ const a=i*Math.PI/3; strich(rad,[Math.cos(a)*-.74,Math.sin(a)*-.74,0],[Math.cos(a)*.74,Math.sin(a)*.74,0],.06,ROT); }
  for(let i=0;i<6;i++){ const a=i*Math.PI/3; ball(rad,.13,GELB,Math.cos(a)*.74,Math.sin(a)*.74,.02); } scheibe(rad,.2,.22,MESSING,0,0,-.03); ball(rad,.12,MESSING,0,0,.1);
  verschmelze(rad); ohneSchatten(rad);
  /* Zahlenschloss rechts neben der Luke */
  const SX=-1.62;
  const halter=gruppe(hinten,0,0,0); box(halter,1,1,.08,DUNKEL,SX,2.34,-13.33); verschmelze(halter); ohneSchatten(halter);
  const schloss=UW.zahlenschloss(sc,SX,2.3,-13.17); schloss.scale.set(1.12,1.12,1.12); verschmelze(schloss); ohneSchatten(schloss);
  const riegel=gruppe(sc,0,0,0); strich(riegel,[SX-.45,2.3,-13.13],[-2.62,2.3,-12.95],.07,MESSING); ball(riegel,.11,MESSING,-2.62,2.3,-12.95); verschmelze(riegel); ohneSchatten(riegel);
  const lampeRot=ball(sc,.15,basis(0xff5a4a),SX,3.25,-13.2), lampeGruen=ball(sc,.16,basis(0x5aff8a),SX,3.25,-13.2); lampeGruen.visible=false;
  const gangschein=schein(sc,'rgba(255,238,170,.7)',LX,1.8,-14.4,3.8); gangschein.visible=false;
  const fleckM=basis(0xffffff,{map:leuchtBild('rgba(255,233,160,1)'),transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(4,3.4),fleckM); fleck.rotation.x=-Math.PI/2; fleck.position.set(LX,.09,-11.9); fleck.visible=false; sc.add(fleck);
  const ganglicht=new THREE.PointLight(0xfff0c0,0,9,1.5); ganglicht.position.set(LX,2.4,-15); sc.add(ganglicht);
  const tuer=ausgang(k,{ name:'Taucher-Luke', einfach:'Runde Tür', steh:[LX,-11.4], durch:[LX,-15],
    treffer:{x:-3.6,y:2,z:-13,b:5.2,h:4,t:.9}, schildOben:[LX,4.35,-12.5], glanz:[SX,2.35,-12.75],
    bewege:(auf)=>{ rad.rotation.z=-Math.min(1,auf*2.2)*Math.PI*2.5; angel.rotation.y=-Math.max(0,(auf-.35)/.65)*1.9;
      schloss.visible=riegel.visible=auf<.04; lampeRot.visible=auf<.04; lampeGruen.visible=auf>=.04;
      ganglicht.intensity=1.6*auf; gangschein.visible=auf>.3; gangschein.material.opacity=.7*auf; fleck.visible=auf>.3; fleckM.opacity=.6*auf; } });
  k.kasten(LX+.1,-13.1,6.1,.7);
  /* Platz für Rettungsring und Karte: die Figur bleibt davor */
  k.kasten(-12.5,-13.05,2.6,.5); k.kasten(12.5,-13.05,3.4,.5);
  /* hinter der offenen Riesenmuschel: die Figur taucht nicht in die obere Schale */
  k.kasten(-11.4,-7.1,3,.9);

  /* =============== Meer draußen =============== */
  const meer=gruppe(sc,0,0,0);
  const FARBEN=[0xff6a8a,0xffa030,0xb870e0,0xffd23a,0xe8483c,0x40d0b8,0xf088c8];
  const tabu=(x,z)=> (x>-7.4 && x<-.6 && z>-19 && z<14) || (x>1.4 && x<7.8 && z>-19 && z<14) || (Math.abs(x)<19.5 && z>-15);
  const pflanze=(x,z,i,h)=>{ const c=FARBEN[i%7], c2=FARBEN[(i+3)%7];
    if(i%6===0) astkoralle(meer,x,-.05,z,h*1.25,c,i);
    else if(i%6===1) hirnkoralle(meer,x,-.15,z,h*.62,c,c2);
    else if(i%6===2) roehrenkoralle(meer,x,-.05,z,h*1.1,c);
    else if(i%6===3) faecherkoralle(meer,x,-.05,z,h*1.35,c,c2,(i%5-2)*.3);
    else if(i%6===4){ ball(meer,h*.8,0x5a7078,x,h*.15,z,1.4,.75,1); ball(meer,h*.5,0x6e848a,x+h*.8,h*.1,z+h*.4,1.2,.8,1); seestern(meer,h*.5,c,x-h*.2,h*.76,z+h*.15,i); }
    else astkoralle(meer,x,-.05,z,h,c2,i*1.7); };
  let n=0;
  /* hinten: eine nahe Reihe und fernere Gruppen */
  for(let x=-29;x<=29;x+=2.3){ const z=-15.4-zwischen(0,1.2), xx=x+zwischen(-.5,.5); if(!tabu(xx,z)) pflanze(xx,z,n++,zwischen(.7,1.2)); }
  for(let i=0;i<34;i++){ const x=zwischen(-32,32), z=zwischen(-31,-21.5); pflanze(x,z,n++,zwischen(.7,1.2)); }
  [-1,1].forEach(s=>{ for(let z=-13;z<=19;z+=2.5) pflanze(s*zwischen(19.6,21),z+zwischen(-.6,.6),n++,zwischen(.7,1.15));
    for(let i=0;i<15;i++) pflanze(s*zwischen(24,33),zwischen(-20,22),n++,zwischen(1,2)); });
  for(let x=-18;x<=18;x+=3.3) pflanze(x+zwischen(-.6,.6),zwischen(15.4,17.4),n++,zwischen(.45,.7));
  /* niedrige Zier vor dem Fenster der Krake und neben der Luke */
  [[2.2,-15],[7.2,-15.2],[1.9,-18.2],[7.5,-18]].forEach(([x,z],i)=>hirnkoralle(meer,x,-.1,z,.5,FARBEN[(i*2+1)%7],FARBEN[(i*2+4)%7]));
  [[3,-14.6],[6.2,-14.7],[-8,-15],[-.2,-16.2]].forEach(([x,z],i)=>seestern(meer,.55,FARBEN[(i*2)%7],x,.05,z,i));
  /* Felsen der Krake */
  ball(meer,1.5,0x4e6670,4.5,.0,-16.4,1.35,.42,1); ball(meer,.8,0x627c84,3.2,0,-17.2,1.2,.6,1); ball(meer,.7,0x627c84,6.2,0,-16.9,1.2,.65,1);
  /* ferne Felsen */
  [[-24,-33,5],[-8,-37,6],[11,-34,4.5],[28,-30,6],[-38,-8,5],[39,2,5.5],[-34,18,4]].forEach(([x,z,r],i)=>{ ball(meer,r,i%2?0x2c5468:0x244a60,x,0,z,1.5,.7,1); ball(meer,r*.5,0x335c6e,x+r,0,z+r*.4,1.2,1.1,1); });
  verschmelze(meer); ohneSchatten(meer);

  /* wiegende Wasserpflanzen draußen (ein Körper) */
  const halmOrte=[];
  const buschel=(x,z,h)=>{ for(let i=0;i<5;i++) halmOrte.push([x+zwischen(-.4,.4),z+zwischen(-.4,.4),h*zwischen(.6,1.15),zwischen(0,6)]); };
  [[-28,-17],[-22.5,-15.8],[-17.5,-18.5],[-9,-20.5],[-1,-20.8],[9.5,-20.5],[16.5,-18.8],[23,-15.6],[28,-20],[-14,-24],[3,-25],[19,-25]].forEach(([x,z])=>buschel(x,z,2.2));
  [-1,1].forEach(s=>[-10,-4,1.5,7,12.5].forEach((z,i)=>buschel(s*(21.8+(i%2)*1.4),z,2)));
  const halmGeo=new THREE.SphereGeometry(.5,8,8); halmGeo.translate(0,.5,0);
  const halme=viele(sc,halmGeo,mat(0x36a862),halmOrte.length), hd=dummy();
  const halmSetzen=t=>{ halmOrte.forEach(([x,z,h,p],i)=>{ hd.position.set(x,-.1,z); hd.rotation.set(Math.cos(t*.9+p)*.09,p,Math.sin(t*1.2+p)*.15); hd.scale.set(.24,h,.09); hd.updateMatrix(); halme.setMatrixAt(i,hd.matrix); }); halme.instanceMatrix.needsUpdate=true; };
  halmSetzen(0); k.anim.push(halmSetzen);

  /* Fischschwärme: je Schwarm ein Körper */
  const fischGeo=(()=>{ const P=[], N=[]; const dazu=g=>{ const q=g.index?g.toNonIndexed():g; const p=q.attributes.position.array, m=q.attributes.normal.array; for(let i=0;i<p.length;i++){ P.push(p[i]); N.push(m[i]); } };
    const r=new THREE.SphereGeometry(.3,10,8); r.scale(1.35,.85,.45); dazu(r); const s=new THREE.ConeGeometry(.24,.34,4); s.rotateZ(-Math.PI/2); s.scale(1,1,.15); s.translate(-.52,0,0); dazu(s);
    const f=new THREE.ConeGeometry(.12,.22,4); f.scale(1,1,.15); f.translate(-.05,.3,0); dazu(f);
    const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3)); return g; })();
  /* Mitte (cx,h,cz), Radien rx und rz, Tempo, Anzahl, Farbe, Größe */
  const schwarm=(cx,h,cz,rx,rz,tempo,anz,farbe,gr)=>{ const m=viele(sc,fischGeo,mat(farbe,{emissive:farbe,emissiveIntensity:.25}),anz), d=dummy();
    const orte=[]; for(let i=0;i<anz;i++) orte.push([i/anz*1.1+zwischen(-.05,.05),zwischen(-.55,.55),zwischen(-.35,.35),zwischen(0,6),gr*zwischen(.75,1.15)]);
    const setze=t=>{ orte.forEach(([v,dy,dr,p,s],i)=>{ const a=t*tempo+v, f=Math.sign(tempo); d.position.set(cx+Math.cos(a)*(rx+dr),h+dy+Math.sin(t*1.8+p)*.12,cz+Math.sin(a)*(rz+dr*.5));
        d.rotation.set(0,Math.atan2(-Math.cos(a)*rz*f,-Math.sin(a)*rx*f)+Math.sin(t*8+p)*.14,0); d.scale.set(s,s,s); d.updateMatrix(); m.setMatrixAt(i,d.matrix); }); m.instanceMatrix.needsUpdate=true; };
    setze(0); k.anim.push(setze); };
  schwarm(-12.2,2.5,-16.2,3.2,.8,.4,14,0xffd23a,.85);
  schwarm(12.6,3,-16.8,3.6,.9,-.35,14,0x60e0ff,.85);
  schwarm(-22,2.4,3,1.2,7,.28,12,0xff8a40,.95);
  schwarm(22.2,3.1,-3,1.2,8,-.25,12,0xff80b0,.95);
  schwarm(15,4,-23,9,2,.2,16,0xd8f4ff,1);
  /* einzelne größere Fische */
  [[11,1.9,-19.8,6,1,.32,0,0xf08a2a,0xffffff,1.6],[-14,3.9,-16.4,3.5,.7,-.4,2,0x4ac8f0,0x1a4a90,1.4],
    [-21.8,1.9,-7,1.3,4.5,.3,1,0xffd23a,0x2f7fd0,1.4],[21.6,1.8,7,1.3,5,-.3,5,0x4ac8f0,0xffd23a,1.5]]
    .forEach(f=>UW.schwimmer(k,...f));
  /* Krake Kiki winkt durch die Scheibe */
  const kiki=UW.kiki(k,sc,4.5,.5,-16.4,1.45); ohneSchatten(kiki);
  k.anim.push(t=>{ kiki.position.y=.55+Math.sin(t*1.1)*.12; kiki.rotation.y=Math.sin(t*.5)*.12-.08; });
  /* Delfin Dori zieht weiter hinten ihre Runden */
  const delfin=UW.dori(sc,0,2.8,-21,1.1); ohneSchatten(delfin.g);
  k.anim.push(t=>{ const a=t*.22+2; delfin.g.position.set(-3+Math.cos(a)*15,2.9+Math.sin(t*.9)*.5,-22.5+Math.sin(a)*2); delfin.g.rotation.y=Math.atan2(-Math.cos(a)*2,-Math.sin(a)*15); delfin.schwanz.rotation.z=Math.sin(t*5)*.28; });
  /* Meeresschildkröte */
  const kroete=gruppe(sc,-13,3,-19), panzer=gruppe(kroete,0,0,0);
  ball(panzer,.75,0x4a8a48,0,0,0,1.25,.55,1); ball(panzer,.7,0xe0d890,0,-.12,0,1.2,.35,.95); [[0,.4,0],[.42,.32,.28],[-.42,.32,.28],[.42,.32,-.28],[-.42,.32,-.28]].forEach(p=>ball(panzer,.22,0x8ab850,p[0],p[1],p[2],1.1,.3,1));
  ball(panzer,.32,0x9acc70,1.12,.08,0,1.15,.9,.95); [-1,1].forEach(v=>{ ball(panzer,.075,WEISS,1.32,.18,v*.2); ball(panzer,.04,SCHWARZ,1.38,.19,v*.22); });
  verschmelze(panzer);
  const flossen=[[.5,1],[.5,-1],[-.65,1],[-.65,-1]].map(([x,v])=>{ const f=gruppe(kroete,x,-.08,v*.55); ball(f,x>0?.5:.32,0x9acc70,x>0?.08:-.12,0,v*(x>0?.38:.22),.6,.14,1); return {f,v,x}; });
  ohneSchatten(kroete);
  k.anim.push(t=>{ const a=t*.18; kroete.position.set(-13.5+Math.cos(a)*4,3.1+Math.sin(t*.8)*.35,-19.2+Math.sin(a)*1); kroete.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a)*4); flossen.forEach(o=>{ o.f.rotation.x=o.v*Math.sin(t*2.4+(o.x>0?0:1.5))*.4; }); });
  /* Quallen */
  [[-20.8,3.6,-15.5,0xffb0e0],[20.6,3.4,-15.8,0xc8a8ff],[-22.5,3.2,-1,0xa8f0ff],[22,4.2,11,0xffc8a0],[-9.2,3.9,-22,0xc8a8ff],[8.6,4.2,-19,0xffb0e0]].forEach(([x,y,z,c],i)=>{
    const q=gruppe(sc,x,y,z), m=basis(c,{transparent:true,opacity:.72,depthWrite:false});
    const d=new THREE.Mesh(new THREE.SphereGeometry(.55,16,10,0,Math.PI*2,0,Math.PI*.55),m); q.add(d);
    const arme=gruppe(q,0,0,0); [0,1,2,3,4].forEach(j=>{ const a=j*1.256, u=Math.cos(a)*.34, v=Math.sin(a)*.34; zug(arme,[[u,0,v],[u*1.25,-.4,v*1.25],[u*.85,-.78,v*.85],[u*1.1,-1.1,v*1.1]],.03,basis(c)); }); verschmelze(arme); ohneSchatten(q);
    k.anim.push(t=>{ const p=Math.sin(t*2.2+i*1.7); q.position.y=y+Math.sin(t*.6+i*2)*.5; d.scale.set(1+p*.12,1-p*.14,1+p*.12); arme.scale.set(1-p*.08,1+p*.1,1-p*.08); }); });

  /* =============== Licht von oben =============== */
  const strahlM=basis(0x80c8ff,{transparent:true,opacity:.055,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
  [[-14.5,-8.5,.9],[14.8,-2,1],[-15,6,.8],[1,-19,1.4],[-17,-21,1.6],[18,-22,1.5],[-24,4,1.3],[24,-6,1.2]].forEach(([x,z,r],i)=>{
    const m=new THREE.Mesh(new THREE.CylinderGeometry(r*.35,r*1.5,10,14,1,true),strahlM); m.position.set(x,4.9,z); m.rotation.z=.22; m.renderOrder=4; sc.add(m);
    k.anim.push(t=>{ m.rotation.z=.22+Math.sin(t*.35+i)*.07; m.scale.x=m.scale.z=1+Math.sin(t*.8+i*2)*.1; }); });
  /* Lichtmuster der Wellen auf dem Boden */
  const wellen=bild(256,256,(g)=>{ g.clearRect(0,0,256,256); g.fillStyle='#000000'; g.fillRect(0,0,256,256); g.strokeStyle='rgba(150,225,255,.55)'; g.lineWidth=3;
    for(let r=0;r<4;r++) for(let i=0;i<4;i++){ const x=i*64+32+(r%2)*20, y=r*64+32; g.beginPath(); for(let j=0;j<=8;j++){ const a=j/8*Math.PI*2, q=24+Math.sin(a*3+i+r*2)*8; const u=x+Math.cos(a)*q, v=y+Math.sin(a)*q*.8; if(j) g.lineTo(u,v); else g.moveTo(u,v); } g.stroke(); } });
  wellen.wrapS=wellen.wrapT=THREE.RepeatWrapping; wellen.repeat.set(4,3);
  const muster=new THREE.Mesh(new THREE.PlaneGeometry(B,T),basis(0xffffff,{map:wellen,transparent:true,opacity:.17,depthWrite:false,blending:THREE.AdditiveBlending})); muster.rotation.x=-Math.PI/2; muster.position.y=.085; muster.renderOrder=1; sc.add(muster);
  k.anim.push(t=>{ wellen.offset.set(Math.sin(t*.21)*.12+t*.008,Math.cos(t*.17)*.1); });
  flacker(k,-11,4.6,-6,0x409cff,.5,17); flacker(k,11.5,4.6,-3,0x30dce0,.45,17); flacker(k,-1,5,7,0x70b8ff,.32,18); flacker(k,3.2,4,-14.8,0xd8b8ff,.6,8);

  /* =============== Boden: Streifen, Roste, Leuchtpunkte =============== */
  const bz=gruppe(sc,0,0,0);
  /* zwei geschwungene blaue Wellenbänder längs durch den Tunnel */
  [-1,1].forEach(s=>{ [[0,0x2ac8c0,.34],[.55,0x2f7fd0,.2]].forEach(([v,c,w],n2)=>{ const X=z=>s*(10.4+v)+Math.sin(z*.55)*.8; for(let z=-12.4;z<12.6;z+=.7){ const a=X(z), b=X(z+.7), m=box(bz,w,.012,Math.hypot(b-a,.7)+.08,c,(a+b)/2,.012+n2*.009+((Math.round(z*10)%2)?0:.009),z+.35); m.rotation.y=Math.atan2(b-a,.7); m.castShadow=false; } }); });
  /* Gitterroste */
  [[1.8,-7.6,3,2.2],[-14.4,2.4,2.4,2.8],[13.4,-8.8,2.6,2.2]].forEach(([x,z,b,t])=>{ box(bz,b,.012,t,SCHWARZ,x,.036,z);
    for(let i=0;i<Math.round(b/.3);i++) box(bz,.09,.012,t-.2,STAHL,x-b/2+.2+i*.3,.049,z);
    [-1,1].forEach(v=>{ box(bz,b+.24,.03,.14,ORANGE,x,.05,z+v*t/2); box(bz,.14,.022,t-.1,ORANGE,x+v*b/2,.046,z); }); });
  /* Warnstreifen vor der Luke */
  for(let i=0;i<19;i++) box(bz,.28,.012,.3,i%2?SCHWARZ:GELB,LX-2.52+i*.28,.024,-12.3);
  /* großes Mosaik aus Fliesen im Boden: Wellen, Fische und Seesterne */
  const MX=2.7, MZ=7.3, MB=9.9, MT=6.9;
  const fliesen=bild(660,460,(c,W,H)=>{ const nx=33, ny=23, q=20; c.fillStyle='#173c4c'; c.fillRect(0,0,W,H);
    const fisch=(u,v,x,y,s,dir)=>{ const a=(u-x)*dir, b=v-y; if(Math.hypot(a-2.6*s,b+.5*s)<.75) return 2; if((a*a)/(20*s*s)+(b*b)/(6.5*s*s)<=1) return Math.abs(a+.4*s)<.7?3:1; return (a<-3.6*s && a>-7*s && Math.abs(b)<(-a-3*s)*.75)?1:0; };
    for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){
      let f=['#2a7894','#2f86a0','#276c8a'][Math.floor(zufall()*3)];
      const w=j+Math.round(Math.sin(i*.55)*1.6); if(w===4||w===18) f=zufall()<.5?'#6cc8cc':'#84d4d0';
      [[11,9,1.15,1,'#e8923c','#f2d8a0'],[23,14,1,-1,'#d8c050','#c87848']].forEach(F=>{ const t=fisch(i,j,F[0],F[1],F[2],F[3]); if(t) f=t===2?'#102028':t===3?F[5]:F[4]; });
      [[4,19],[28,4]].forEach(S=>{ const dx=i-S[0], dy=j-S[1]; if((Math.abs(dx)+Math.abs(dy)<=1)||(Math.abs(dx)===Math.abs(dy)&&Math.abs(dx)<=2)) f='#d0687c'; });
      if(i===0||j===0||i===nx-1||j===ny-1) f=(i+j)%2?'#c8b47c':'#a89460';
      c.fillStyle=f; c.fillRect(i*q+1,j*q+1,q-2,q-2); } });
  const mosaik=new THREE.Mesh(new THREE.PlaneGeometry(MB,MT),new THREE.MeshLambertMaterial({map:fliesen})); mosaik.rotation.x=-Math.PI/2; mosaik.position.set(MX,.014,MZ); mosaik.receiveShadow=true; sc.add(mosaik);
  [-1,1].forEach(v=>{ box(bz,MB+.36,.012,.18,METALL2,MX,.022,MZ+v*(MT/2+.08)); box(bz,.18,.012,MT-.02,METALL2,MX+v*(MB/2+.08),.021,MZ); });
  verschmelze(bz); ohneSchatten(bz);
  /* Leuchtpunkte: Weg zur Luke */
  const wege=[[[-1.6,12.4],[1.4,5.6],[2,.6],[2.4,-5.6],[-2.6,-10.6]],[[-4.6,12.4],[-2.8,5.8],[-3.8,.8],[-5.4,-5.4],[-5.8,-10.6]]], punkte=[];
  wege.forEach(w=>{ for(let i=1;i<w.length;i++){ const a=w[i-1], b=w[i], m=Math.round(Math.hypot(b[0]-a[0],b[1]-a[1])/.9); for(let j=0;j<m;j++) punkte.push([a[0]+(b[0]-a[0])*j/m,a[1]+(b[1]-a[1])*j/m]); } });
  const lp=viele(sc,new THREE.CylinderGeometry(.13,.15,.05,10),basis(0xffffff),punkte.length), ld=dummy(), f1=new THREE.Color(0x9affff), f2=new THREE.Color(0x1c6a88);
  punkte.forEach(([x,z],i)=>{ ld.position.set(x,.04,z); ld.updateMatrix(); lp.setMatrixAt(i,ld.matrix); lp.setColorAt(i,f1); });
  const halb=punkte.length/2;
  k.anim.push(t=>{ punkte.forEach((p,i)=>lp.setColorAt(i,((i%Math.round(halb))-Math.floor(t*6))%5===0?f1:f2)); if(lp.instanceColor) lp.instanceColor.needsUpdate=true; });

  /* =============== Blubbersäulen =============== */
  const blasenOrte=[];
  [[-15.8,-10.2,0x40e0d0],[15.9,-10.4,0xf088c8],[-15.8,9.6,0xffb040],[15.8,9.6,0x60a8ff]].forEach(([x,z,c],i)=>{
    const g=gruppe(sc,x,0,z);
    rohr(g,.66,.76,.5,METALL2,0,.25,0); reif(g,.67,.07,MESSING,0,.5,0); reif(g,.73,.05,basis(c),0,.18,0); walze(g,.6,.24,METALL2,0,4.2,0); reif(g,.61,.06,MESSING,0,4.08,0); ball(g,.24,basis(c),0,4.42,0);
    [0,1,2].forEach(j=>{ const a=j*2.09+.5; walze(g,.045,3.6,METALL,Math.cos(a)*.57,2.3,Math.sin(a)*.57); });
    grossSchatten(g); verschmelze(g);
    const w=new THREE.Mesh(new THREE.CylinderGeometry(.52,.52,3.6,20,1,true),basis(c,{transparent:true,opacity:.24,depthWrite:false,side:THREE.DoubleSide})); w.position.y=2.3; w.renderOrder=3; g.add(w);
    k.verdecker(g,x,z,.65); k.kreis(x,z,.76);
    for(let j=0;j<12;j++) blasenOrte.push([x+zwischen(-.28,.28),.6,z+zwischen(-.28,.28),3.4,j/12+i*.13,zwischen(.06,.12)]); });
  /* Blasen draußen */
  [[-19.8,-17],[-9.4,-17.8],[8.4,-15.6],[17.5,-17],[-20.2,5],[20.4,-1],[20,13]].forEach(([x,z],i)=>{ for(let j=0;j<9;j++) blasenOrte.push([x,.2,z,5.4,j/9+i*.07,zwischen(.07,.14)]); });
  const bm=viele(sc,new THREE.SphereGeometry(1,8,6),basis(0xe4faff,{transparent:true,opacity:.6,depthWrite:false}),blasenOrte.length), bd=dummy();
  const blubb=t=>{ blasenOrte.forEach(([x,y,z,h,p,r],i)=>{ const a=(t*.26+p)%1; bd.position.set(x+Math.sin(t*2.1+p*9)*.08,y+a*h,z+Math.cos(t*1.7+p*7)*.07); bd.scale.set(r,r,r); bd.updateMatrix(); bm.setMatrixAt(i,bd.matrix); }); bm.instanceMatrix.needsUpdate=true; };
  blubb(0); k.anim.push(blubb);

  /* =============== Ausstattung =============== */
  /* Gestell mit Luftflaschen */
  const flaschen=gruppe(sc,-16.5,0,-1.8);
  box(flaschen,.95,.14,2.7,METALL2,0,.07,0); [-1.3,1.3].forEach(z=>walze(flaschen,.07,1.4,METALL2,-.38,.7,z)); box(flaschen,.1,.12,2.7,ORANGE,-.38,1.35,0); box(flaschen,.08,.08,2.7,ORANGE,.42,.5,0);
  [-.96,-.32,.32,.96].forEach((z,i)=>{ const c=i%2?GELB:ORANGE; walze(flaschen,.28,1.25,c,0,.78,z); ball(flaschen,.28,c,0,1.4,z,1,.7,1); walze(flaschen,.09,.2,MESSING,0,1.66,z); ball(flaschen,.1,SCHWARZ,0,1.78,z); walze(flaschen,.29,.12,WEISS,0,1.0,z); });
  grossSchatten(flaschen); verschmelze(flaschen); k.kasten(-16.5,-1.8,1.1,2.8);
  /* alter Taucherhelm auf einem Ständer */
  const helm=gruppe(sc,16.4,0,-4.6); helm.rotation.y=-.9;
  rohr(helm,.45,.65,.2,HOLZ2,0,.1,0); walze(helm,.13,.9,HOLZ,0,.6,0); walze(helm,.45,.14,HOLZ2,0,1.08,0);
  rohr(helm,.4,.62,.28,KUPFER,0,1.28,0); ball(helm,.55,MESSING,0,1.82,0); reif(helm,.42,.07,KUPFER,0,1.45,0);
  [[0,0,1],[-1,0,0],[1,0,0]].forEach(([u,,w],i)=>{ const f=gruppe(helm,u*.5,1.84,w*.5); f.rotation.y=u*Math.PI/2; const r=i?.15:.25; scheibe(f,r,.1,0x70c8f0,0,0,.03); ring(f,r+.02,.055,KUPFER,0,0,.08); });
  walze(helm,.1,.16,KUPFER,0,2.4,0); grossSchatten(helm); verschmelze(helm); k.kreis(16.4,-4.6,.68);
  /* Anker an einem Holzblock */
  const anker=gruppe(sc,16.4,0,6.7); anker.rotation.y=-.75;
  box(anker,1.3,.24,.8,HOLZ2,0,.12,0); walze(anker,.12,1.7,0x56687a,0,1.1,0); quer(anker,.09,.95,0x56687a,0,1.65,0); [-.5,.5].forEach(x=>ball(anker,.13,0x56687a,x,1.65,0));
  ring(anker,.22,.07,0x56687a,0,2.15,0); const ab=ring(anker,.68,.12,0x56687a,0,.98,0,Math.PI); ab.rotation.z=Math.PI;
  [-1,1].forEach(s=>{ const sp=kegel(anker,.2,.34,0x56687a,s*.68,1.08,0); sp.scale.z=.1; });
  grossSchatten(anker); verschmelze(anker); k.kreis(16.4,6.7,.85);
  /* Sehrohr */
  const sehrohr=gruppe(sc,-13,0,0);
  rohr(sehrohr,.4,.52,.28,METALL2,0,.14,0); walze(sehrohr,.17,3.3,STAHL,0,1.9,0); [.6,2.9].forEach(y=>walze(sehrohr,.24,.2,MESSING,0,y,0));
  box(sehrohr,.52,.5,.46,METALL2,0,1.75,.12); scheibe(sehrohr,.14,.2,SCHWARZ,0,1.78,.42); ring(sehrohr,.14,.035,MESSING,0,1.78,.52);
  [-1,1].forEach(s=>{ quer(sehrohr,.055,.4,METALL2,s*.43,1.65,.12); quer(sehrohr,.085,.24,ROT,s*.65,1.65,.12); });
  box(sehrohr,.42,.4,.5,STAHL,0,3.7,.04); scheibe(sehrohr,.13,.08,basis(0x80f0ff),0,3.72,.31);
  grossSchatten(sehrohr); verschmelze(sehrohr); k.verdecker(sehrohr,-13,0,.55); k.kreis(-13,0,.62);
  /* kleines Messing-Modell vom U-Boot am vorderen Rand */
  const modell=gruppe(sc,-8.4,0,11.75); modell.scale.set(.52,.52,.52);
  box(modell,2.5,.2,1.1,HOLZ2,0,.1,0); [-.65,.65].forEach(x=>walze(modell,.09,.55,KUPFER,x,.45,0));
  ball(modell,.5,0xb08c48,0,1.08,0,2.2,1,1); box(modell,.62,.42,.42,0xb08c48,.05,1.66,0); walze(modell,.06,.4,METALL2,.2,2.04,0); quer(modell,.06,.24,METALL2,.3,2.22,0);
  [-.52,0,.52].forEach(x=>{ scheibe(modell,.14,.1,0x2c5868,x,1.1,.47); ring(modell,.15,.035,KUPFER,x,1.1,.53); });
  const heck=kegel(modell,.3,.4,KUPFER,-1.12,1.08,0); heck.rotation.z=-Math.PI/2; box(modell,.08,.85,.12,KUPFER,-1.32,1.08,0);
  grossSchatten(modell); verschmelze(modell);
  k.kasten(-8.4,11.75,1.4,.65);
  /* Rohrbündel am vorderen Rand */
  const buendel=gruppe(sc,0,0,0);
  [[-13.6,4],[6.6,3.8]].forEach(([x,l])=>{ [[12.35,.28,.22,KUPFER],[12.8,.24,.18,TUERKIS],[12.57,.62,.17,STAHL]].forEach(([z,y,r,c])=>{ quer(buendel,r,l,c,x,y,z); [-1,0,1].forEach(s=>quer(buendel,r+.06,.16,METALL2,x+s*(l/2-.1),y,z)); });
    [-1,1].forEach(s=>box(buendel,.22,.14,1.1,DUNKEL,x+s*(l/2-.7),.07,12.57)); k.kasten(x,12.57,l+.1,1); });
  /* Bodenleuchten */
  [[-5,11.8],[2.2,12.2],[-17,-7.4],[17,1],[6.2,-10.2],[-8.6,-9.4],[-17,12],[15,12.3]].forEach(([x,z],i)=>{ walze(buendel,.28,.12,DUNKEL,x,.06,z); walze(buendel,.13,.62,METALL,x,.4,z); ball(buendel,.2,basis(i%2?0x90ffe8:0x9ad8ff),x,.86,z); walze(buendel,.22,.07,MESSING,x,1.07,z); k.kreis(x,z,.3); });
  grossSchatten(buendel); verschmelze(buendel);

  return { tuer, start:[-.6,7] };
}

/* =============== Gegenstände =============== */
function rettungsring(g){
  ring(g,.78,.25,WEISS,0,0,0);
  [0,1,2,3].forEach(i=>{ const t=ring(g,.78,.265,ROT,0,0,0,Math.PI/4); t.rotation.z=i*Math.PI/2+Math.PI/8; });
  const seil=ring(g,1.08,.04,0xf0d890,0,0,-.04);
  [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+Math.PI/4, t=ring(g,.285,.045,0xf0d890,Math.cos(a)*.78,Math.sin(a)*.78,0); t.rotation.z=a; t.rotation.x=Math.PI/2; ball(g,.1,0xd8b860,Math.cos(a)*1.08,Math.sin(a)*1.08,-.02); });
  strich(g,[0,1.08,-.02],[0,1.32,-.18],.045,METALL2); scheibe(g,.13,.16,MESSING,0,1.34,-.2);
}
function riesenmuschel(g){
  const R=0xe888b0, D=0xb85888, H=0xffd8e8, M=mat(R,{side:THREE.DoubleSide});
  const unten=new THREE.Mesh(new THREE.SphereGeometry(1.3,28,10,0,Math.PI*2,Math.PI/2,Math.PI/2),M); unten.scale.set(1,.55,.85); unten.position.y=.75; unten.castShadow=true; g.add(unten);
  ball(g,1.2,H,0,.68,0,1,.09,.84);
  const P=(a,th)=>[1.33*Math.sin(th)*Math.cos(a),.75+.73*Math.cos(th),1.13*Math.sin(th)*Math.sin(a)];
  for(let i=0;i<14;i++){ const a=(i+.5)*Math.PI/7; zug(g,[P(a,2.9),P(a,2.35),P(a,1.9),P(a,1.6)],.055,D); ball(g,.17,R,1.29*Math.cos(a),.77,1.09*Math.sin(a),1,.7,1); }
  const auf=gruppe(g,0,.75,-.98); auf.rotation.x=-.3;
  const oben=new THREE.Mesh(new THREE.SphereGeometry(1.3,28,10,0,Math.PI*2,0,Math.PI/2),M); oben.rotation.x=-Math.PI/2; oben.scale.set(1,.34,.86); oben.position.set(0,1.02,0); oben.castShadow=true; auf.add(oben);
  ball(auf,1.14,H,0,1.02,.0,1,.83,.06);
  for(let i=0;i<=8;i++){ const a=i*Math.PI/8-.0, x=Math.cos(a)*1.2, y=1.02+Math.sin(a)*1.04; zug(auf,[[Math.cos(a)*.15,.15,.1],[x*.6,.35+(y-.35)*.62,.11],[x,y,.06]],.045,D); }
  for(let i=0;i<13;i++){ const a=i/13*Math.PI*1.5-Math.PI*.25; ball(auf,.18,R,Math.cos(a)*1.25,1.02+Math.sin(a)*1.08,-.02,1,1,.65); }
  box(g,.9,.3,.36,D,0,.74,-1.0);
  ball(g,.48,0xc060a0,0,.76,.12,1.2,.22,1);
  ball(g,.36,mat(PERL,{emissive:0x807088}),0,1.08,.12); ball(g,.08,basis(0xffffff),-.14,1.22,.39);
  ball(g,.7,0x8a9a8a,0,.03,0,1.4,.1,1.1);
  schein(g,'rgba(255,240,255,.55)',0,1.1,.4,1.3);
}
function korallenhaube(g){
  rohr(g,.98,1.12,.18,DUNKEL,0,.09,0,8); rohr(g,.72,.82,.5,METALL,0,.42,0,8); rohr(g,1.02,.8,.2,METALL2,0,.75,0,8); reif(g,.9,.07,MESSING,0,.87,0);
  walze(g,.84,.08,SAND,0,.89,0);
  astkoralle(g,-.34,.9,-.05,.85,0xff5a80,.35); astkoralle(g,.18,.9,-.26,.95,0xffa020,-.4); roehrenkoralle(g,.34,.9,.26,.62,0xa860e0); hirnkoralle(g,-.24,.88,.36,.25,0xffd23a,0xe08820); seestern(g,.22,0xe8483c,.04,.97,.56,.3);
  const glas=basis(0xd4f6ff,{transparent:true,opacity:.17,depthWrite:false,side:THREE.DoubleSide});
  const mantel=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,1.05,24,1,true),glas); mantel.position.y=1.4; mantel.renderOrder=4; g.add(mantel);
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(.9,24,10,0,Math.PI*2,0,Math.PI/2),glas); kuppel.position.y=1.92; kuppel.scale.y=.75; kuppel.renderOrder=4; g.add(kuppel);
  const hell=basis(0xffffff,{transparent:true,opacity:.55,depthWrite:false});
  [[-.55,1.55,.72,.07,.85],[-.36,1.5,.83,.035,.55]].forEach(([x,y,z,w,h])=>{ const b=box(g,w,h,.02,hell,x,y,z); b.rotation.y=-.6; b.castShadow=false; });
  const rand=basis(0xc8f0ff,{transparent:true,opacity:.7}); [0,Math.PI/2].forEach(a=>{ const t=ring(g,.9,.018,rand,0,1.92,0,Math.PI); t.scale.y=.75; t.rotation.y=a+Math.PI/4; });
  reif(g,.9,.025,rand,0,1.92,0); ball(g,.13,MESSING,0,2.65,0);
}
function sitzbank(g){
  const S=0x1ca8a8, S2=0x40d0c8;
  [-1.35,1.35].forEach(x=>{ [-.38,.38].forEach(z=>box(g,.16,.7,.16,METALL2,x,.35,z)); box(g,.16,1.1,.12,METALL2,x,1.25,-.45); box(g,.2,.12,.95,HOLZ,x*1.08,1.16,.02); box(g,.12,.42,.12,METALL2,x*1.08,.9,.38); box(g,.2,.1,1,METALL2,x,.14,0); });
  [-.27,.09,.4].forEach((z,i)=>box(g,3.05,.16,i===1?.34:.27,i===1?S2:S,0,.75,z));
  [1.2,1.6].forEach((y,i)=>box(g,3.05,.3,.12,i?S2:S,0,y,-.42));
  /* großes Fernglas auf der Sitzfläche */
  const f=gruppe(g,.62,.81,.1); f.rotation.y=-.45;
  [-1,1].forEach(s=>{ const x=s*.24; scheibe(f,.2,.42,SCHWARZ,x,.22,.14); scheibe(f,.23,.12,0x303c48,x,.23,.4); ring(f,.2,.035,MESSING,x,.23,.47); scheibe(f,.17,.02,basis(0x8ad8ff),x,.23,.47); ball(f,.045,basis(0xffffff),x-.06,.29,.49);
    scheibe(f,.14,.34,0x303c48,x*.85,.22,-.2); scheibe(f,.11,.14,SCHWARZ,x*.85,.22,-.41); ring(f,.11,.025,MESSING,x*.85,.22,-.47); });
  box(f,.28,.09,.18,0x303c48,0,.29,.08); scheibe(f,.07,.3,ROT,0,.35,-.06);
  zug(f,[[-.45,.22,.1],[-.68,.03,.2],[-.74,.02,-.25],[-.3,.04,-.5]],.025,ROT);
}
function futtereimer(g){
  const Y=0xffc81a, D=0xc88a08;
  rohr(g,.68,.5,1.0,Y,0,.52,0,24,true); walze(g,.5,.08,D,0,.06,0); reif(g,.69,.065,D,0,1.02,0); reif(g,.57,.04,D,0,.42,0);
  walze(g,.63,.08,0x8a5424,0,.9,0);
  ball(g,.55,0xb0702c,0,.9,0,1,.38,1);
  for(let i=0;i<46;i++){ const a=i*2.4, r=Math.sqrt(i/46)*.55, y=1.11-r*r*.38; ball(g,.07,[0xc8843a,0xe0a048,0x8a4c20,0xd86838][i%4],Math.cos(a)*r,y,Math.sin(a)*r); }
  /* Henkel steht schräg nach hinten */
  const h=gruppe(g,0,.98,0); h.rotation.x=-.55; ring(h,.7,.04,STAHL,0,0,0,Math.PI); quer(h,.075,.4,ROT,0,.7,0); [-.68,.68].forEach(x=>ball(g,.09,STAHL,x,.96,0));
  /* Schaufel */
  strich(g,[.2,1.05,.1],[.62,1.62,.28],.075,ROT); ball(g,.12,ROT,.62,1.62,.28);
  /* Fischbild vorn */
  const fi=gruppe(g,0,.54,.6); fi.rotation.x=.17; ball(fi,.24,BLAU,.06,0,0,1.2,.75,.2); const s=kegel(fi,.18,.24,BLAU,-.3,0,0); s.rotation.z=-Math.PI/2; s.scale.z=.04; ball(fi,.045,WEISS,.2,.05,.05); ball(fi,.022,SCHWARZ,.215,.05,.09);
  [[-.86,.35],[-.65,.72],[.84,.44],[.95,.1],[-.9,-.12],[.6,.74],[-.98,.28]].forEach(([x,z])=>ball(g,.07,0xc8843a,x,.06,z));
}
function meereskarte(g){
  box(g,3.1,2.1,.08,HOLZ2,0,0,-.06);
  const b=bild(512,340,(c,W,H)=>{ c.fillStyle='#9ad8ee'; c.fillRect(0,0,W,H);
    const fleck=(x,y,rx,ry,f,w)=>{ c.fillStyle=f; c.beginPath(); for(let i=0;i<=24;i++){ const a=i/24*Math.PI*2, q=1+Math.sin(a*3+w)*.14+Math.sin(a*5+w*2)*.07, u=x+Math.cos(a)*rx*q, v=y+Math.sin(a)*ry*q; if(i) c.lineTo(u,v); else c.moveTo(u,v); } c.fill(); };
    fleck(175,190,180,125,'#5ab4dc',1); fleck(185,200,125,88,'#2f84c0',1.6); fleck(200,208,70,46,'#1a548c',2.2); fleck(205,212,32,18,'#0e3460',3);
    fleck(410,78,80,56,'#e8d896',4); fleck(412,76,52,34,'#6ab45a',4.5); fleck(60,45,52,30,'#e8d896',2); fleck(60,43,28,15,'#6ab45a',2.4); fleck(430,270,62,40,'#74c8c0',5);
    c.fillStyle='#7a5a3a'; [[300,250],[322,236],[340,258],[318,268]].forEach(p=>{ c.beginPath(); c.moveTo(p[0]-18,p[1]+12); c.lineTo(p[0],p[1]-18); c.lineTo(p[0]+18,p[1]+12); c.fill(); });
    c.strokeStyle='#e0402c'; c.lineWidth=7; c.setLineDash([14,10]); c.beginPath(); c.moveTo(72,70); c.bezierCurveTo(180,40,170,190,280,150); c.bezierCurveTo(350,120,340,200,418,258); c.stroke(); c.setLineDash([]);
    c.lineWidth=11; c.beginPath(); c.moveTo(402,244); c.lineTo(436,276); c.moveTo(436,244); c.lineTo(402,276); c.stroke();
    const fi=(x,y,s,f)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,18*s,11*s,0,0,7); c.fill(); c.beginPath(); c.moveTo(x-14*s,y); c.lineTo(x-30*s,y-11*s); c.lineTo(x-30*s,y+11*s); c.fill(); c.fillStyle='#14242c'; c.fillRect(x+7*s,y-4*s,4*s,4*s); };
    fi(105,165,1.2,'#ffb030'); fi(270,70,1,'#f07aa0'); fi(150,285,.9,'#ffe050'); fi(465,175,1,'#ff7a30');
    c.fillStyle='#fff6d8'; c.beginPath(); c.arc(52,282,34,0,7); c.fill(); c.fillStyle='#c0302c'; c.beginPath(); c.moveTo(52,250); c.lineTo(62,282); c.lineTo(42,282); c.fill(); c.fillStyle='#24486a'; c.beginPath(); c.moveTo(52,314); c.lineTo(62,282); c.lineTo(42,282); c.fill();
    c.strokeStyle='#a8742a'; c.lineWidth=10; c.strokeRect(5,5,W-10,H-10); });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(2.86,1.9),new THREE.MeshLambertMaterial({map:b,emissive:0x202020})); m.position.z=.0; g.add(m);
  [-1,1].forEach(s=>{ box(g,3.2,.16,.16,HOLZ,0,s*1.03,.0); box(g,.16,2.2,.16,HOLZ,s*1.52,0,.005); });
  [-1,1].forEach(s=>[-1,1].forEach(v=>ball(g,.1,MESSING,s*1.52,v*1.03,.1)));
}
function fundkiste(g){
  const W=2, H=.82, D=1.15;
  box(g,W,.14,D,HOLZ2,0,.12,0);
  [-1,1].forEach(s=>{ [0,1,2].forEach(i=>{ box(g,W,.24,.12,i%2?0xbc7c40:HOLZ,0,.3+i*.265,s*(D/2-.06)); box(g,.12,.24,D-.24,i%2?0xbc7c40:HOLZ,s*(W/2-.06),.3+i*.265,0); });
    [-1,1].forEach(v=>box(g,.18,H+.14,.18,METALL2,s*(W/2-.04),H/2+.1,v*(D/2-.04))); box(g,.5,.09,.05,DUNKEL,s*.4,.56,D/2+.02); });
  /* offener Deckel lehnt hinten an */
  const dk=gruppe(g,0,.94,-D/2-.02); dk.rotation.x=-.28; box(dk,W+.06,.95,.11,HOLZ,0,.46,0); [-.65,.65].forEach(x=>box(dk,.14,.99,.15,METALL2,x,.46,0));
  box(g,W-.2,.55,D-.2,0x5a3a1c,0,.46,0);
  /* Fundstücke */
  const sn=gruppe(g,-.55,.95,.05); ball(sn,.36,0xf4b898,0,0,0,1.1,.7,.55); for(let i=-3;i<=3;i++) strich(sn,[0,-.2,.18],[Math.sin(i*.4)*.4,-.2+Math.cos(i*.4)*.46,.13],.032,0xd8785c); ball(sn,.11,0xd8785c,0,-.18,.17);
  const st=gruppe(g,.12,1.12,.28); st.rotation.x=.9; seestern(st,.44,0xff8a24,0,0,0,.3);
  const fl=gruppe(g,.66,.98,-.05); fl.rotation.z=-.5; walze(fl,.2,.55,0x48b878,0,.1,0); ball(fl,.2,0x48b878,0,.37,0,1,.6,1); walze(fl,.075,.28,0x48b878,0,.55,0); walze(fl,.1,.12,0xc89058,0,.73,0); walze(fl,.205,.2,0xfff0c8,0,.06,0);
  astkoralle(g,.15,.78,-.32,.8,0xff5a80,.2);
  const sh=gruppe(g,-.18,.84,.3); ball(sh,.2,0xe8d0f0,0,0,0,1,.85,.9); kegel(sh,.14,.28,0xc8a0d8,.02,.2,0); ball(sh,.06,0xc8a0d8,.02,.36,0);
  ball(g,.15,mat(0x40c8f0,{emissive:0x104858}),.5,.84,.34); ball(g,.11,MESSING,.76,.82,.28); ball(g,.11,ROSA,-.8,.82,.32);
}
function infosaeule(g){
  walze(g,.62,.16,DUNKEL,0,.08,0); rohr(g,.4,.52,.18,METALL2,0,.24,0); rohr(g,.22,.27,1.35,METALL,0,.98,0); walze(g,.28,.09,ORANGE,0,.55,0); walze(g,.26,.09,ORANGE,0,1.42,0);
  const k=gruppe(g,0,2.05,0); k.rotation.x=-.2;
  box(k,1.55,1.14,.24,DUNKEL,0,0,0); box(k,1.62,.1,.3,ORANGE,0,.6,0);
  const b=bild(256,176,(c,W,H)=>{ const v=c.createLinearGradient(0,0,0,H); v.addColorStop(0,'#2aa0d0'); v.addColorStop(1,'#0a3c68'); c.fillStyle=v; c.fillRect(0,0,W,H);
    c.fillStyle='#ff8a6a'; c.beginPath(); c.arc(100,70,38,0,7); c.fill(); c.strokeStyle='#ff8a6a'; c.lineWidth=11; c.lineCap='round'; for(let i=0;i<6;i++){ const x=66+i*14; c.beginPath(); c.moveTo(x,96); c.quadraticCurveTo(x+(i-2.5)*14,125,x+(i-2.5)*22,140+(i%2)*10); c.stroke(); }
    c.fillStyle='#ffffff'; [[87,66],[113,66]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],10,0,7); c.fill(); }); c.fillStyle='#14202c'; [[89,68],[111,68]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],5,0,7); c.fill(); });
    c.fillStyle='#ffe050'; [[200,45],[212,100]].forEach(p=>{ c.beginPath(); c.ellipse(p[0],p[1],18,11,0,0,7); c.fill(); c.beginPath(); c.moveTo(p[0]+14,p[1]); c.lineTo(p[0]+32,p[1]-11); c.lineTo(p[0]+32,p[1]+11); c.fill(); });
    c.strokeStyle='rgba(220,250,255,.8)'; c.lineWidth=3; [[35,40,8],[45,20,5],[225,150,7]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],p[2],0,7); c.stroke(); }); });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(1.36,.94),new THREE.MeshBasicMaterial({map:b})); m.position.z=.13; k.add(m);
  [[-.2,ROT],[0,GELB],[.2,0x50e078]].forEach(([x,c])=>{ scheibe(g,.065,.08,c,x,1.27,.26); }); box(g,.62,.2,.1,DUNKEL,0,1.27,.2);
  schein(g,'rgba(110,220,255,.35)',0,2.1,.35,1.9);
}
function pflanzkuebel(g){
  const T1=0x2f6ec0, T2=0x1c4a90;
  rohr(g,.92,.64,.95,T1,0,.55,0,24,true); walze(g,.66,.12,T2,0,.08,0); reif(g,.92,.1,T2,0,1.04,0); reif(g,.78,.06,0xffd23a,0,.55,0);
  for(let i=0;i<10;i++){ const a=i*Math.PI/5; ball(g,.09,WEISS,Math.sin(a)*.78,.76,Math.cos(a)*.78,1,1,.7); }
  walze(g,.88,.06,0x38c0d8,0,.98,0);
  [[-.46,.3],[.5,.34],[.06,.55],[-.62,-.15]].forEach(([x,z],i)=>ball(g,.15,i%2?0xa8b8a8:0xe0d0a0,x,1.02,z,1,.6,1));
  /* lange Blätter */
  [[-.3,-.1,1.55,.24,0x2c9a50],[.28,-.22,1.75,-.2,0x54c050],[0,.06,1.35,.05,0x1e7c48],[-.5,.1,1.05,.5,0x78d058],[.52,.08,1.15,-.5,0x2c9a50],[.08,-.45,1.4,-.06,0x54c050],[-.22,-.4,1.05,.36,0x1e7c48]].forEach(([x,z,h,n,c])=>{
    const bl=gruppe(g,x,.98,z); bl.rotation.z=n; bl.rotation.y=x*.8; ball(bl,.5,c,0,h/2,0,.34,h,.1); strich(bl,[0,0,.052],[0,h*.82,.052],.016,0xb8e880); });
  /* rötliche Stängel mit runden Blättern */
  [[.34,.34,.85],[-.2,.38,.68]].forEach(([x,z,h])=>{ strich(g,[x,.98,z],[x,.98+h,z],.035,0x8a3868); for(let i=1;i<=3;i++) [-1,1].forEach(s=>ball(g,.14,0xd05890,x+s*.13,.98+h*i/3.2,z,1.1,.55,.5)); ball(g,.1,0xf080b0,x,1.03+h,z); });
}
function staffelei(g){
  [-1,1].forEach(s=>{ strich(g,[s*.82,0,.34],[s*.2,2.62,-.1],.075,HOLZ); ball(g,.1,HOLZ2,s*.82,.07,.34); });
  strich(g,[0,0,-.78],[0,2.55,-.14],.07,HOLZ2); box(g,.62,.12,.16,HOLZ2,0,2.45,-.07);
  box(g,2.2,.1,.34,HOLZ2,0,.86,.28); box(g,2.2,.09,.06,HOLZ,0,.94,.45);
  const tafel=gruppe(g,0,1.62,.17); tafel.rotation.x=-.16;
  box(tafel,1.66,1.38,.08,0xe8e0c8,0,0,0);
  const b=bild(320,260,(c,W,H)=>{ c.fillStyle='#fdfaf0'; c.fillRect(0,0,W,H);
    c.lineJoin='round'; c.lineCap='round'; c.strokeStyle='#1c2c48'; c.lineWidth=7;
    c.fillStyle='#ff9a30'; c.beginPath(); c.moveTo(80,130); c.lineTo(28,78); c.quadraticCurveTo(50,130,28,184); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(130,86); c.quadraticCurveTo(170,26,215,84); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(175,132,104,62,0,0,Math.PI*2); c.fill(); c.stroke();
    c.strokeStyle='#ffe070'; c.lineWidth=14; [118,150,182].forEach(x=>{ c.beginPath(); c.moveTo(x,88); c.quadraticCurveTo(x+22,132,x,176); c.stroke(); });
    c.fillStyle='#ffffff'; c.beginPath(); c.arc(232,114,19,0,7); c.fill(); c.strokeStyle='#1c2c48'; c.lineWidth=5; c.stroke(); c.fillStyle='#1c2c48'; c.beginPath(); c.arc(236,116,9,0,7); c.fill();
    c.beginPath(); c.arc(252,142,20,.5,2.2); c.stroke();
    c.strokeStyle='#2c90d0'; c.lineWidth=6; [[292,70,10],[302,38,7],[278,24,5]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],p[2],0,7); c.stroke(); });
    c.beginPath(); c.moveTo(14,228); for(let x=14;x<300;x+=48) c.quadraticCurveTo(x+24,204,x+48,228); c.stroke(); });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.22),new THREE.MeshLambertMaterial({map:b,emissive:0x282828})); m.position.z=.046; tafel.add(m);
  /* Stifte und Pinselbecher auf der Ablage */
  [[-.62,ROT],[-.34,0x2f7fd0],[-.06,GRUEN]].forEach(([x,c])=>{ quer(g,.045,.22,c,x,.956,.39); const sp=kegel(g,.045,.09,0xf0d0a0,x+.155,.956,.39); sp.rotation.z=-Math.PI/2; });
  walze(g,.12,.24,TUERKIS,.98,1.03,.29); [[-.12,ROT],[0,GELB],[.12,LILA]].forEach(([u,c])=>{ strich(g,[.98+u*.3,1.05,.29],[.98+u*1.2,1.45,.3],.022,HOLZ2); ball(g,.05,c,.98+u*1.2,1.47,.3,1,1.4,1); });
}

const gegenstaende=[
  /* 1 Rettungsring (Rückwand) */
  { x:-12.5, z:-13.01, y:2.4, wand:'hinten', steh:[-12.5,-11.5], treffer:[2.4,2.5,.6], trefferY:-1.15, baue:rettungsring },
  /* 2 Riesenmuschel */
  { x:-11.2, z:-6, dreh:.2, steh:[-10.7,-3.8], r:1.45, treffer:[2.9,2.8,2.4], baue:riesenmuschel },
  /* 3 Korallen unter der Glashaube */
  { x:8.4, z:-6.4, steh:[8.1,-4.3], r:1.12, treffer:[2.2,2.8,2.2], baue:korallenhaube },
  /* 4 Sitzbank mit Fernglas */
  { x:-1.4, z:-4.4, steh:[-1.4,-2.7], kasten:[3.3,1.15], treffer:[3.3,2,1.3], baue:sitzbank },
  /* 5 Eimer mit Fischfutter */
  { x:12.8, z:2.2, steh:[11.4,3.5], r:.86, treffer:[1.9,2,1.8], baue:g=>{ const e=gruppe(g,0,0,0); e.scale.set(1.12,1.12,1.12); futtereimer(e); } },
  /* 6 Karte vom Meeresgrund (Rückwand) */
  { x:12.5, z:-13.18, y:2.4, wand:'hinten', steh:[12.5,-11.5], treffer:[3.3,2.3,.6], trefferY:-1.15, baue:meereskarte },
  /* 7 Kiste mit Fundstücken */
  { x:-12.8, z:5.6, dreh:.18, steh:[-12.4,7.5], kasten:[2.4,1.7], treffer:[2.4,2,1.7], baue:fundkiste },
  /* 8 Infosäule */
  { x:5, z:1.8, dreh:-.15, steh:[4.8,3.5], r:.68, treffer:[1.7,2.8,1.3], baue:infosaeule },
  /* 9 Pflanzkübel mit Wasserpflanzen */
  { x:-5.8, z:2.4, steh:[-5.4,4.3], r:1.05, treffer:[2.2,2.8,2], baue:pflanzkuebel },
  /* 10 Staffelei mit Fischbild */
  { x:10.4, z:8.3, dreh:-.2, steh:[10,10.2], r:.95, treffer:[1.9,2.7,1.5], baue:staffelei }
];
/* Wandsachen werfen keine Schatten, am Boden nur die großen Teile */
gegenstaende.forEach(d=>{ const bauen=d.baue; d.baue=(g,k)=>{ bauen(g,k); (d.wand?ohneSchatten:grossSchatten)(g); }; });

/* 20 Verstecke für die Edelsteine */
const verstecke=[[-16.4,-11.8],[-8.2,-11.9],[.9,-12.2],[9.2,-11.9],[16.6,-12.4],[-13.6,-8],[-13.8,-4.6],[10.4,-8.4],[15.4,-7.2],[-1.4,-6.2],
  [-16.6,2],[-10.4,.2],[5.4,-.2],[15.8,3.4],[-15.2,6.6],[-10.8,11.6],[-7.8,8.2],[4,9.4],[12.6,11.8],[16.9,8.2]];

return { titel:'Der Glastunnel', breite:36, tiefe:27, baue, gegenstaende, verstecke, oben:UW.OBEN };
})();

/* Raum 4: Das Riff, draußen auf dem Meeresgrund. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die Tauchglocke mit Druckschleuse hinten rechts; die runde Tür rollt zur Seite und die Figur geht hinein. */
RAEUME3D.unterwasser[3] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, GELB, ORANGE, ROT, TUERKIS, BLAU, GRUEN, ROSA, LILA, MESSING, licht, schwimmer, dori, zahlenschloss } = UW;
const B=36, T=27, Q=Math.PI/2;
const GX=9.2, GZ=-11.2;           /* Bezugspunkt der Tauchglocke */
const MEER=0x1a6c8c;
const HOLZ=0x7a5230, HOLZ2=0x68442a, HOLZ3=0x8c6238, HOLZD=0x3c2818, ROST=0x9a4a22;
const FELS=0x5c7884, FELS2=0x4a6470, FELS3=0x74909a;
const KORALLE=[0xf06a9a,0xff9a3a,0xa86ae0,0x2ac8c0,0xf0584a,0xffc83a];
const doppel=c=>mat(c,{side:THREE.DoubleSide});

/* ---------- Grundformen ---------- */
/* kantiger Fels: unregelmäßig verformter Vielflächner */
function felsGeo(saatF,stufe,rau){
  const geo=new THREE.IcosahedronGeometry(1,stufe===undefined?1:stufe), p=geo.attributes.position, r=rau||.3;
  for(let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i), h=Math.sin(Math.round(x*50)*1.29+Math.round(y*50)*7.82+Math.round(z*50)*3.77+saatF)*4375.8, f=1+(h-Math.floor(h)-.5)*r; p.setXYZ(i,x*f,y*f,z*f); }
  geo.computeVertexNormals(); return geo;
}
function form(par,geo,m,x,y,z){ const t=new THREE.Mesh(geo,typeof m==='number'?mat(m):m); t.position.set(x,y,z); t.castShadow=true; t.receiveShadow=true; par.add(t); return t; }
/* Fläche mit gemaltem Bild, Blick nach +z */
function bildFlaeche(par,w,h,tex,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex,emissive:0xffffff,emissiveMap:tex,emissiveIntensity:.25})); m.position.set(x,y,z); par.add(m); return m; }
/* Halm oder Blatt: schmales, gebogenes Band, Fuß bei y=0, Höhe 1 */
function blattGeo(breit,bogen){
  const geo=new THREE.PlaneGeometry(breit,1,1,8), p=geo.attributes.position;
  for(let i=0;i<p.count;i++){ const u=p.getY(i)+.5; p.setXYZ(i,p.getX(i)*(1-u*u*.85)+Math.sin(u*5)*breit*.25,u,bogen*u*u); }
  geo.computeVertexNormals(); return geo;
}
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
function instanzen(par,geo,m,n){ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; t.castShadow=false; par.add(t); return t; }

/* ---------- Meeresgrund, ferne Felsen und Lichtstrahlen ---------- */
function sandBild(){
  const t=bild(512,512,g=>{
    g.fillStyle='#d6c28c'; g.fillRect(0,0,512,512);
    const rund=(x,y,fn)=>{ [-512,0,512].forEach(a=>[-512,0,512].forEach(b=>fn(x+a,y+b))); };
    for(let i=0;i<46;i++){ const x=zufall()*512, y=zufall()*512, r=24+zufall()*60, c=i%2?'240,224,170':'170,150,104';
      rund(x,y,(X,Y)=>{ const v=g.createRadialGradient(X,Y,0,X,Y,r); v.addColorStop(0,'rgba('+c+',.28)'); v.addColorStop(1,'rgba('+c+',0)'); g.fillStyle=v; g.fillRect(X-r,Y-r,r*2,r*2); }); }
    /* Wellenrippen im Sand (an den Rändern passend) */
    for(let j=0;j<13;j++){ const y0=j*512/13+8; [['rgba(150,124,76,.2)',0],['rgba(255,244,200,.22)',6]].forEach(([c,d])=>{ [-512,0,512].forEach(v=>{ g.strokeStyle=c; g.lineWidth=5; g.beginPath();
          for(let x=0;x<=512;x+=16){ const y=y0+d+v+Math.sin(x/512*6.283*2+j*.7)*11+Math.sin(x/512*6.283*5+j)*4; x?g.lineTo(x,y):g.moveTo(x,y); } g.stroke(); }); }); }
    for(let i=0;i<2600;i++){ g.fillStyle=['rgba(120,96,60,.3)','rgba(255,248,214,.4)','rgba(170,130,100,.25)'][i%3]; g.fillRect(zufall()*509,zufall()*509,2+(i%2),2); }
  });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(16,16); return t;
}
function meeresgrund(k){
  const sc=k.scene;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(224,224),new THREE.MeshLambertMaterial({map:sandBild()})); m.rotation.x=-Q; m.receiveShadow=true; sc.add(m);
  /* ferne Felsen und Tangwald als Silhouetten, rundum */
  const G=[felsGeo(61,1,.35),felsGeo(67,1,.45),felsGeo(71,0,.4)], fern=gruppe(sc,0,0,0);
  const berg=(x,z,b,h,c)=>{ const f=form(fern,G[Math.abs(Math.round(x+z))%3],c,x,h*.25,z); f.scale.set(b,h,b*.7); f.rotation.y=x*.7; f.castShadow=false; };
  for(let i=0;i<17;i++){ const x=-48+i*6; berg(x+(i%3)-1,-28-(i%4)*3,3.4+(i%3),2.6+((i*5)%7)*.8,i%2?0x24586a:0x2c6678); if(i%2) berg(x+2,-45,6,7+(i%5),0x1e5870); }
  for(let i=0;i<9;i++){ const z=-24+i*7; [-1,1].forEach(v=>{ berg(v*(30+(i%3)*3),z,3+(i%3),2.4+((i*3)%5),i%2?0x2a6072:0x356e7e); berg(v*(46+(i%2)*4),z+3,6,6+(i%4)*1.5,0x20586e); }); }
  for(let i=0;i<14;i++){ const x=-39+i*6; berg(x,31+(i%3)*5,2.2+(i%3),1.2+(i%4)*.5,0x3a7280); }
  [-1,1].forEach(v=>{ [[24,-16],[26,-6],[24,6],[25,17],[22,24]].forEach(([x,z],i)=>{ const f=form(fern,G[(i+1)%3],i%2?FELS2:FELS,v*(x+(i%2)),.5,z); f.scale.set(1.8,1.6+(i%3)*.5,1.5); f.castShadow=false; }); });
  verschmelze(fern);
  /* ferner Tang */
  const L=[]; [[-23,-25],[-13,-25],[4,-25.5],[17,-25],[23,-13],[-24,-9],[-22,12],[23,11],[-9,-24],[14,-25],[27,-2],[-28,3],[19,22],[-18,23],[-1,26]].forEach(([x,z])=>{ for(let i=0;i<7;i++) L.push([x+(zufall()-.5)*2.4,z+(zufall()-.5)*1.6,(z>10?1.1:2.6)+zufall()*(z>10?.8:2.4),zufall()*6.28]); });
  const tang=instanzen(sc,blattGeo(.55,.18),doppel(0x226a5c),L.length), o=new THREE.Object3D();
  const setze=t=>{ L.forEach(([x,z,h,a],i)=>{ o.position.set(x,0,z); o.rotation.set(0,a,Math.sin(t*.8+x+i*.4)*.12); o.scale.set(1,h,h*.5); o.updateMatrix(); tang.setMatrixAt(i,o.matrix); }); tang.instanceMatrix.needsUpdate=true; };
  setze(0); k.anim.push(setze);
  /* wenige weiche Lichtstrahlen von oben */
  const st=bild(64,256,g=>{ const v=g.createLinearGradient(0,0,64,0); v.addColorStop(0,'rgba(200,245,255,0)'); v.addColorStop(.5,'rgba(200,245,255,1)'); v.addColorStop(1,'rgba(200,245,255,0)'); g.fillStyle=v; g.fillRect(0,0,64,256);
    g.globalCompositeOperation='destination-in'; const u=g.createLinearGradient(0,0,0,256); u.addColorStop(0,'rgba(0,0,0,1)'); u.addColorStop(.95,'rgba(0,0,0,0)'); g.fillStyle=u; g.fillRect(0,0,64,256); });
  [[-19,-20,3.4,.3],[-2,-22,2.4,.36],[16,-19,3,.26],[-26,-3,2.6,.3],[26,2,3,.34]].forEach(([x,z,br,nei],i)=>{
    const mm=basis(0xffffff,{map:st,transparent:true,opacity:.13,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false});
    const s=new THREE.Mesh(new THREE.PlaneGeometry(br,24),mm); s.position.set(x,9,z); s.rotation.z=-nei; if(Math.abs(x)>24) s.rotation.y=x<0?.9:-.9; sc.add(s);
    k.anim.push(t=>{ mm.opacity=.1+Math.sin(t*.7+i*2)*.05; }); });
}

/* ---------- Korallen, Felsen und Pflanzen (feste Deko) ---------- */
function ast(g,p,w,schief,len,r,tiefe,farbe){
  const q=[p[0]+Math.sin(w)*Math.sin(schief)*len,p[1]+Math.cos(schief)*len,p[2]+Math.cos(w)*Math.sin(schief)*len];
  strich(g,p,q,r,farbe);
  if(tiefe<=0){ ball(g,r*1.5,farbe,q[0],q[1],q[2]); return; }
  ball(g,r,farbe,q[0],q[1],q[2]);
  ast(g,q,w+1.1,schief*.4+.55,len*.8,r*.75,tiefe-1,farbe); ast(g,q,w+4,schief*.4+.2,len*.75,r*.72,tiefe-1,farbe);
}
/* Geweihkoralle: verzweigte runde Äste auf einem Stein */
function geweih(g,x,y,z,s,farbe,dreh){
  const f=form(g,felsGeo(3,0,.3),FELS2,x,y+.12*s,z); f.scale.set(.55*s,.28*s,.5*s);
  [0,2.1,4.2].forEach((a,i)=>ast(g,[x+Math.sin(a+dreh)*.14*s,y+.2*s,z+Math.cos(a+dreh)*.14*s],a+dreh,.45+i*.1,(.52-i*.05)*s,.085*s,2,farbe));
}
/* Hirnkoralle: unregelmäßige Kuppel mit vielen geschlängelten Rillen */
function hirn(g,x,z,r,farbe,rille){
  const beule=(a,w)=>1+.09*Math.sin(a*3+x)*Math.sin(w*2.2)+.06*Math.sin(a*5+w*4+z);
  const geo=new THREE.SphereGeometry(1,28,18), p=geo.attributes.position;
  for(let i=0;i<p.count;i++){ const u=p.getX(i), v=p.getY(i), t=p.getZ(i), f=beule(Math.atan2(t,u),Math.acos(Math.max(-1,Math.min(1,v))))*r; p.setXYZ(i,u*f,v*f*.75,t*f); }
  geo.computeVertexNormals(); form(g,geo,farbe,x,r*.2,z);
  const auf=(a,w)=>{ const f=beule(a,w)*r*1.012; return [x+Math.cos(a)*Math.sin(w)*f,r*.2+Math.cos(w)*f*.75,z+Math.sin(a)*Math.sin(w)*f]; };
  const rinne=(a0,w0,w1,i)=>{ let alt=null; for(let j=0;j<=11;j++){ const w=w0+(w1-w0)*j/11, a=a0+Math.sin(w*11+i*1.9)*.2/Math.max(.4,Math.sin(w)), q=auf(a,w); if(alt) strich(g,alt,q,r*.038,rille); ball(g,r*.038,rille,q[0],q[1],q[2]); alt=q; } };
  for(let i=0;i<11;i++) rinne(i*.571,.34+(i%3)*.13,1.62,i);
  for(let i=0;i<4;i++) rinne(i*1.57+.3,.04,.5,i+11);
}
function brocken(g,x,z,s,i){
  const G=[felsGeo(21,1,.3),felsGeo(27,1,.35),felsGeo(33,0,.4)];
  const a=form(g,G[i%3],[FELS,FELS2,FELS3][i%3],x,s*.45,z); a.scale.set(s,s*.85,s*.85); a.rotation.y=i;
  const b=form(g,G[(i+1)%3],FELS3,x+s*.7,s*.2,z+s*.35); b.scale.set(s*.45,s*.34,s*.4);
  ball(g,s*.5,0x3a8a62,x-s*.15,s*1.08,z,1,.22,.9);
}

/* ---------- Rand: Felsen und Korallen ringsum ---------- */
function rand(k){
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts');
  const G=[felsGeo(1),felsGeo(5),felsGeo(9),felsGeo(14,1,.4)], F=[FELS,FELS2,FELS3];
  const fels=(par,x,y,z,sx,sy,sz,i)=>{ const m=form(par,G[i%4],F[i%3],x,y,z); m.scale.set(sx,sy,sz); m.rotation.y=(zufall()-.5)*.5; return m; };
  const h=gruppe(hinten,0,0,0);
  /* hinten rechts neben dem Wrack und beiderseits der Tauchglocke (dort bleibt Platz frei) */
  [[2.8,-15,1.3,1.5],[4.8,-15.6,1.2,2.1],[5.4,-14.2,.7,.6],[13.4,-14.6,1.2,1.4],[15.2,-15.3,1.5,2.4],[17.3,-14.6,1.3,1.7],[19.2,-15.6,1.6,2.2],[-18.3,-15,1.4,2],[-20,-14,1.5,1.5],[1.5,-16.9,1.4,1.2],[-17,-17,1.6,2.6],[12.6,-17.2,1.4,2]].forEach(([x,z,s,sy],i)=>fels(h,x,sy*.4,z,s,sy,s*.8,i));
  for(let i=0;i<14;i++) fels(h,-17+i*1.35,.1,-17.3-(i%3)*.3,.7,.45+(i%4)*.12,.6,i);
  geweih(h,2.9,1.7,-14.7,1.2,KORALLE[0],0); geweih(h,15.1,2.5,-15,1.3,KORALLE[1],1); geweih(h,13.2,1.5,-14.1,1,KORALLE[2],2); geweih(h,-18,2.1,-14.6,1.2,KORALLE[3],3); geweih(h,18,1.7,-14,1,KORALLE[4],4);
  verschmelze(h);
  [[links,-1],[rechts,1]].forEach(([w,v],n)=>{ const g=gruppe(w,0,0,0);
    for(let i=0,z=-12.8;z<=13.6;i++,z+=1.75){ const sy=.55+zufall()*.6+(z<-4?.5:0), sx=.7+zufall()*.35;
      fels(g,v*(18.25+sx*1.1+zufall()*.2),sy*.4,z,sx,sy,1.05+zufall()*.3,i+n);
      if(i%3===1) fels(g,v*(20.9+zufall()),sy*.6,z+.7,1.3,sy*1.5,1.2,i+2);
      const s=.16+zufall()*.18; fels(g,v*(18.1+s*.6),s*.4,z+.9,s,s*.8,s,i);
      if(i%3===0) geweih(g,v*19.3,sy*.9,z,.95,KORALLE[(i/3+n*3)%6],i);
      if(i%3===2) { ball(g,.55,KORALLE[(i+n+1)%6],v*19.1,sy*1.05,z,1,.7,1); ball(g,.3,KORALLE[(i+n+4)%6],v*18.7,sy*.9,z+.5,1,.75,1); } }
    verschmelze(g); });
  const vorn=gruppe(k.scene,0,0,0);
  for(let i=0,x=-19;x<=19;i++,x+=1.55){ const s=.22+zufall()*.3; fels(vorn,x+zufall()*.5,s*.25,14.3+zufall()*1.2,s*1.4,s*.8,s,i);
    if(i%4===1) geweih(vorn,x+.5,0,15.7,.75,KORALLE[i%6],i); if(i%5===3) ball(vorn,.38,KORALLE[(i+2)%6],x,.1,15.4,1,.7,1); }
  verschmelze(vorn);
  k.kasten(0,-13.75,B+2,.8); k.kasten(-18.6,0,1,T); k.kasten(18.6,0,1,T);
}

/* ---------- das alte Schiffswrack ---------- */
function wrack(k){
  const sc=k.scene, g=gruppe(sc,0,0,0), ZF=-14.1, H=[HOLZ,HOLZ2,HOLZ3];
  /* Rumpf aus Planken: links der hohe Bug, in der Mitte aufgebrochen, rechts das Heck */
  for(let i=0,x=-15.3;x<=.6;i++,x+=.9){
    const mitte=x>-9.6 && x<-3.4, hoch=mitte?1.05+((i*7)%4)*.2 : x<=-9.6 ? 2.45+(-9.6-x)*.18 : 2.5+(x+3.4)*.1;
    const n=Math.round(hoch/.34);
    for(let r=0;r<n;r++){ const u=1-(r+.5)/n; box(g,.89,.315,.3,H[(r+(i>>2))%3],x,.17+r*.34,ZF-u*u*.45); }
    if(!mitte){ box(g,.96,.14,.46,HOLZD,x,n*.34+.07,ZF-.05); if(i%2===0) box(g,.14,.42,.14,HOLZD,x,n*.34+.34,ZF); }
    box(g,.9,hoch*.8,.2,HOLZD,x,hoch*.4,ZF-.75);
  }
  /* abgerundete Enden */
  [[-15.9,3.3],[1.15,2.8]].forEach(([x,hh],i)=>{ const m=walze(g,.42,hh,HOLZ2,x,hh/2,ZF-.45); m.rotation.z=i?-.1:.12; ball(g,.34,HOLZD,x+(i?.15:-.2),hh,ZF-.45); });
  strich(g,[-15.7,3.1,-14.5],[-17.3,4.2,-14.6],.2,HOLZ3); ball(g,.22,HOLZD,-17.3,4.2,-14.6);
  /* Bullaugen */
  [[-13.9,1.7],[-12.1,1.55],[-10.4,1.4],[-2.4,1.45],[-.6,1.5]].forEach(([x,y])=>{ walze(g,.27,.12,0x12303c,x,y,ZF+.14).rotation.x=Q; ring(g,.3,.075,0xa88838,x,y,ZF+.2); ball(g,.06,0x8ad0e0,x-.1,y+.1,ZF+.21,1,1,.3); });
  /* Aufbau am Heck */
  box(g,3.2,1.22,1.1,HOLZ3,-1.2,3.29,ZF-.45); box(g,3.5,.18,1.35,HOLZD,-1.2,3.95,ZF-.45);
  [-2.2,-1.2,-.2].forEach(x=>{ box(g,.56,.5,.06,0x16404e,x,3.38,ZF+.12); [-1,1].forEach(s=>{ box(g,.68,.08,.08,MESSING,x,3.38+s*.28,ZF+.15); box(g,.08,.6,.08,MESSING,x+s*.31,3.38,ZF+.154); }); box(g,.05,.5,.04,MESSING,x,3.38,ZF+.17); });
  /* gebogene Spanten in der Bruchstelle */
  [-8.7,-7.3,-5.6,-4.2].forEach((x,i)=>{ const P=[[0,-13.7],[1.1,-13.85],[2,-14.15],[2.65+(i%2)*.4,-14.6]]; for(let j=0;j<3;j++){ strich(g,[x,P[j][0],P[j][1]],[x+(i-1.5)*.05,P[j+1][0],P[j+1][1]],.14-j*.02,HOLZD); ball(g,.13-j*.02,HOLZD,x,P[j+1][0],P[j+1][1]); } });
  /* abgebrochene Wände rechts und links der Truhe, nach vorn niedriger */
  [-9.4,-3.6].forEach((x,n)=>{ [[-13.75,2.1],[-13.15,1.5],[-12.55,.95]].forEach(([z,hh],i)=>{ for(let r=0;r<Math.round(hh/.34);r++) box(g,.34,.3,.58,H[(r+i+n)%3],x,.17+r*.34,z); box(g,.2,hh+.25,.2,HOLZD,x+(n?-.2:.2),(hh+.25)/2,z-.2); }); k.kasten(x,-12.9,.65,1.4); });
  /* alte Bodenbretter unter der Truhe */
  for(let i=0;i<8;i++) box(g,.52,.05,2.9+((i*5)%3)*.25,H[i%3],-8.6+i*.6,.026+(i%2)*.012,-12.35+((i*3)%4)*.08);
  /* Masten */
  strich(g,[-11.4,2.4,-14.7],[-10.5,6.6,-14.9],.24,HOLZ2); ball(g,.27,HOLZD,-10.5,6.6,-14.9);
  strich(g,[-13.2,5.25,-14.55],[-8.4,5.7,-14.55],.11,HOLZ3);
  strich(g,[-4.9,.9,-14.9],[-4.6,3.2,-14.9],.2,HOLZ2); [-.12,.1].forEach((d,i)=>strich(g,[-4.6+d,3.15,-14.9],[-4.6+d*2.4,3.6+i*.25,-14.9],.07,HOLZ3));
  strich(g,[-8.8,.3,-16.4],[-2.6,1.6,-15.6],.2,HOLZ2);
  /* Muschelkrusten und Algen am Holz */
  for(let i=0;i<30;i++){ const x=-15+((i*53)%155)/10; if(x>-9.3&&x<-3.7) continue; ball(g,.1+(i%3)*.04,[0x4a8a62,0xc8b8a0,0x6aa870][i%3],x,.2+((i*17)%19)/10,ZF+.15,1.2,.8,.35); }
  verschmelze(g);
  /* zerrissenes Segel, bewegt sich leicht */
  const geo=new THREE.PlaneGeometry(4.2,2.3,14,5), p=geo.attributes.position;
  for(let i=0;i<p.count;i++){ const x=p.getX(i); let y=p.getY(i); if(y<-.9) y+=.2+Math.abs(Math.sin(x*3.7))*.75; p.setXYZ(i,x,y,Math.sin(x*2.2)*.16*(1.2-y*.5)); }
  geo.computeVertexNormals();
  const s=gruppe(sc,-10.8,5.4,-14.42); s.rotation.z=.093; form(s,geo,doppel(0xd8ccac),0,-1.15,0);
  k.anim.push(t=>{ s.rotation.x=Math.sin(t*.9)*.05; });
  /* Fässer, Steuerrad und Anker vor dem Wrack */
  const d=gruppe(sc,0,0,0);
  [[-10.9,-11.9,1],[-2.1,-12.1,.9]].forEach(([x,z,s2])=>{ rohr(d,.6*s2,.48*s2,.6*s2,HOLZ3,x,.3*s2,z); rohr(d,.48*s2,.6*s2,.6*s2,HOLZ3,x,.9*s2,z); walze(d,.4*s2,.04,HOLZD,x,1.21*s2,z); [.12,.6,1.08].forEach((y,i)=>{ ring(d,(i===1?.61:.52)*s2,.045,DUNKEL,x,y*s2,z).rotation.x=Q; }); k.kreis(x,z,.65*s2); });
  const rad=gruppe(d,.5,.85,-12.5); rad.rotation.set(-.25,-.15,.2); ring(rad,.68,.09,HOLZ3,0,0,0); ring(rad,.2,.07,MESSING,0,0,0); for(let i=0;i<8;i++){ const a=i*.785; strich(rad,[0,0,0],[Math.cos(a)*.92,Math.sin(a)*.92,0],.05,HOLZ); ball(rad,.09,HOLZD,Math.cos(a)*.94,Math.sin(a)*.94,0); }
  k.kasten(.5,-12.5,1.8,.8);
  const an=gruppe(d,-.9,0,-8.7); an.rotation.y=.5;
  const ar=gruppe(an,0,.12,0); ar.rotation.x=-1.55; strich(ar,[0,0,0],[0,1.65,0],.12,0x4c5a62); ring(ar,.22,.075,ROST,0,1.86,0); strich(ar,[-.55,1.35,0],[.55,1.35,0],.08,0x4c5a62); [-1,1].forEach(v=>ball(ar,.12,ROST,v*.58,1.35,0));
  ring(ar,.68,.12,0x4c5a62,0,.68,0,Math.PI).rotation.z=Math.PI; [-1,1].forEach(v=>ball(ar,.2,ROST,v*.68,.72,0,1,1.3,.7));
  verschmelze(d); k.kasten(-1.15,-9.5,2.1,2.4);
}

/* ---------- Ausgang: die Tauchglocke mit Druckschleuse ---------- */
function glocke(k){
  const sc=k.scene, g=gruppe(sc,GX,0,GZ), r=gruppe(g,0,0,0), BZ=-1.8;
  const hell=0xc4d6de;
  const profil=[[0,.35],[2.3,.35],[2.45,.6],[2.3,1],[2.24,2.7],[2.08,3.5],[1.7,4.15],[1.05,4.65],[.4,4.88],[0,4.9]].map(p=>new THREE.Vector2(p[0],p[1]));
  form(r,new THREE.LatheGeometry(profil,32),doppel(hell),0,0,BZ);
  [[2.46,.62],[2.27,2.75],[1.74,4.12]].forEach(([rr,y])=>{ ring(r,rr,.1,ORANGE,0,y,BZ).rotation.x=Q; for(let i=0;i<18;i++){ const a=i*.349; ball(r,.07,MESSING,Math.sin(a)*(rr-.02),y+.2,BZ+Math.cos(a)*(rr-.02)); } });
  /* Füße */
  [-2.4,-.9,.9,2.4].forEach(a=>{ const s=Math.sin(a), c=Math.cos(a); strich(r,[s*2.1,.8,BZ+c*2.1],[s*2.9,.1,BZ+c*2.9],.15,METALL2); walze(r,.4,.16,DUNKEL,s*2.9,.08,BZ+c*2.9); k.kreis(GX+s*2.9,GZ+BZ+c*2.9,.45); });
  /* Aufhängung mit dicker Kette nach oben */
  walze(r,.55,.3,METALL2,0,4.98,BZ); ring(r,.34,.1,MESSING,0,5.4,BZ);
  for(let i=0;i<16;i++){ const l=ring(r,.22,.065,METALL2,0,5.9+i*.5,BZ); l.rotation.y=i%2?Q:0; l.scale.y=1.4; }
  /* seitliche Bullaugen */
  [-1,1].forEach(v=>{ const a=v*.98, f=gruppe(r,Math.sin(a)*2.24,1.85,BZ+Math.cos(a)*2.24); f.rotation.y=a; walze(f,.4,.12,basis(0x9aeaff),0,0,.02).rotation.x=Q; ring(f,.44,.1,MESSING,0,0,.08); ball(f,.1,basis(0xffffff),-.13,.14,.08,1,1,.3); });
  /* Schleusenvorbau: kurze Röhre mit Flansch vorn */
  const roehre=form(r,new THREE.CylinderGeometry(1.52,1.52,2.6,28,1,true),doppel(METALL2),0,1.4,1.05); roehre.rotation.x=Q;
  [.6,1.5].forEach(z=>ring(r,1.55,.09,METALL,0,1.4,z));
  form(r,new THREE.RingGeometry(1.28,1.62,32),doppel(ORANGE),0,1.4,2.352);
  ring(r,1.64,.11,ORANGE,0,1.4,2.32); for(let i=0;i<12;i++){ const a=i*.524+.26; if(Math.sin(a)<-.9) continue; ball(r,.08,MESSING,Math.cos(a)*1.47,1.4+Math.sin(a)*1.47,2.37); }
  box(r,2.3,.07,2.2,DUNKEL,0,.045,1.4); box(r,2.5,.06,.9,METALL,0,.032,2.9); [2.7,2.95,3.2].forEach(z=>box(r,2.3,.016,.07,GELB,0,.07,z));
  /* Führungsschiene, auf der die Tür nach links rollt */
  box(r,4.4,.07,.22,METALL2,-2.4,.04,2.56); box(r,.24,.5,.34,ORANGE,-4.55,.25,2.56);
  /* Schalttafel mit Zahlenschloss rechts neben der Tür */
  strich(r,[1.5,1.9,2],[2.15,1.9,2.4],.14,METALL2); box(r,1.2,1.1,.18,DUNKEL,2.25,2.05,2.42); box(r,1.3,.1,.24,ORANGE,2.25,2.65,2.42); walze(r,.1,1.5,METALL2,2.4,.75,2.35);
  /* Gehäuse für Druckanzeige und Lampen über der Tür */
  box(r,.9,.5,.8,METALL2,0,3.05,1.75); walze(r,.64,.3,MESSING,0,3.66,2.05).rotation.x=Q;
  [-1,1].forEach(s=>{ box(r,.8,.18,.3,METALL2,s*1.05,3.2,1.95); walze(r,.3,.24,DUNKEL,s*1.45,3.2,2.1).rotation.x=Q; });
  verschmelze(r);
  const zb=bild(256,256,c=>{ c.fillStyle='#f4f8fa'; c.beginPath(); c.arc(128,128,126,0,7); c.fill(); c.lineWidth=30;
    [['#e0443a',3.14,4.2],['#ffd23a',4.2,5.2],['#3ac860',5.2,6.28]].forEach(([f,a,b])=>{ c.strokeStyle=f; c.beginPath(); c.arc(128,128,90,a,b); c.stroke(); });
    c.strokeStyle='#163442'; c.lineWidth=6; for(let i=0;i<=10;i++){ const a=3.14+i*.314; c.beginPath(); c.moveTo(128+Math.cos(a)*108,128+Math.sin(a)*108); c.lineTo(128+Math.cos(a)*122,128+Math.sin(a)*122); c.stroke(); }
    [[-34,50],[0,58],[34,50]].forEach(([x,y])=>{ c.fillStyle='#8aa4b0'; c.beginPath(); c.arc(128+x,128+y,9,0,7); c.fill(); }); });
  const scheibe=new THREE.Mesh(new THREE.CircleGeometry(.56,32),basis(0xdddddd,{map:zb})); scheibe.position.set(0,3.66,2.21); g.add(scheibe);
  const zeiger=gruppe(g,0,3.66,2.24); box(zeiger,.06,.46,.03,basis(0x16222c),0,.19,0); ball(zeiger,.08,ROT,0,0,.02);
  const lm=basis(0xff3a2a), lampen=[-1,1].map(s=>{ ball(g,.23,lm,s*1.45,3.2,2.24); return schein(g,'rgba(255,255,255,.7)',s*1.45,3.2,2.45,1); });
  /* Zahlenschloss */
  const sl=zahlenschloss(g,2.25,1.95,2.57); sl.scale.set(1.15,1.15,1.15); verschmelze(sl);
  /* Innenraum mit warmem Licht (hinter der Tür) */
  const it=bild(256,256,c=>{ c.fillStyle='#5a3410'; c.fillRect(0,0,256,256); const v=c.createRadialGradient(128,128,6,128,128,140); v.addColorStop(0,'#fffbe0'); v.addColorStop(.45,'#ffd870'); v.addColorStop(1,'#8a5216'); c.fillStyle=v; c.fillRect(0,0,256,256);
    c.strokeStyle='rgba(120,70,20,.5)'; c.lineWidth=7; [110,86,60].forEach(rr=>{ c.beginPath(); c.arc(128,128,rr,0,7); c.stroke(); }); ['#e0443a','#3ac860','#2f7fd0'].forEach((f,i)=>{ c.fillStyle=f; c.beginPath(); c.arc(100+i*28,58,8,0,7); c.fill(); }); });
  const innen=new THREE.Mesh(new THREE.CircleGeometry(1.5,32),basis(0x666666,{map:it})); innen.position.set(0,1.4,.62); g.add(innen);
  const warm=new THREE.PointLight(0xffc860,0,8,1.5); warm.position.set(GX,1.9,GZ+1.7); sc.add(warm);
  const glut=schein(g,'rgba(255,205,100,.8)',0,1.4,.9,2.8); glut.material.opacity=0; glut.visible=false;
  /* runde Tür mit Fenster und Drehrad */
  const tg=gruppe(g,0,1.4,2.54), d=gruppe(tg,0,0,0);
  walze(d,1.36,.14,METALL,0,0,0).rotation.x=Q; ring(d,1.27,.09,METALL2,0,0,.08); ring(d,.98,.04,METALL2,0,0,.09);
  for(let i=0;i<14;i++){ const a=i*.4488; ball(d,.075,MESSING,Math.cos(a)*1.13,Math.sin(a)*1.13,.1); }
  walze(d,.33,.06,basis(0x8ae0f0),0,.5,.07).rotation.x=Q; ring(d,.37,.09,MESSING,0,.5,.11); ball(d,.07,basis(0xffffff),-.12,.62,.12,1,1,.3);
  ring(d,.42,.075,ROT,0,-.44,.26); [0,1,2].forEach(i=>{ box(d,.84,.08,.06,ROT,0,-.44,.25+i*.004).rotation.z=i*1.047; }); walze(d,.12,.28,METALL2,0,-.44,.14).rotation.x=Q; ball(d,.13,GELB,0,-.44,.3);
  verschmelze(d);
  let tuer=null;
  tuer=ausgang(k,{ steh:[GX,GZ+4.7], durch:[GX,GZ+1.35], treffer:{x:GX+.3,y:2,z:GZ+2.6,b:4.4,h:4,t:1}, name:'Tauchglocke', einfach:'Taucher-Glocke', schildOben:[GX,4.5,GZ+2.8], glanz:[GX,1.7,GZ+3.1],
    bewege:(auf,t)=>{ const z=t||0; tg.position.x=-auf*2.85; tg.rotation.z=auf*2.1; innen.material.color.setScalar(.45+auf*.55); warm.intensity=auf*(1.6+Math.sin(z*5)*.12); glut.visible=auf>.02; glut.material.opacity=auf*.3;
      const gruen=tuer && (tuer.offen||tuer.bereit); lm.color.setHex(gruen?0x40f070:0xff3a2a); lampen.forEach((s,i)=>{ s.material.color.setHex(gruen?0x40f070:0xff3a2a); const v=.95+Math.sin(z*3+i*3)*.18; s.scale.set(v,v,1); });
      zeiger.rotation.z=(gruen?-.95:.95)+Math.sin(z*2.3)*.12+Math.sin(z*5.1)*.04; } });
  k.kreis(GX,GZ+BZ,2.6); k.kasten(GX+.35,GZ+1.2,4.5,2.7); k.kasten(GX-3.1,GZ+2.4,3,.7);
  return tuer;
}

/* ---------- Ausstattung auf dem Meeresgrund ---------- */
function ausstattung(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  /* Geweihkorallen */
  [[-15.8,10.6,1.25,0],[-8.2,10.9,1,1],[1.8,11.2,1.05,2],[15.7,11,1.3,3],[16.2,4.2,1.15,4],[-16.2,-4.8,1.25,5],[4.3,-11.4,1.2,3],[15.6,-9.8,1.3,2],[-8.8,2.6,.95,1],[3,-.9,.8,3],[-15.6,-12,1.1,4],[16.3,-12,1.2,5],[-7.8,6.4,.75,0],[13.8,12,.8,1]].forEach(([x,z,s,f],i)=>{ geweih(g,x,0,z,s,KORALLE[f],i*1.3); if(i%2===0) geweih(g,x+(x<0?.45:-.45),0,z+.35,s*.55,KORALLE[(f+2)%6],i); k.kreis(x,z,.62*s); });
  /* Hirnkorallen */
  [[-1.8,-2.4,.7,0x8ac86a,0x4a8a4a],[9.4,-2.8,.6,0xf0a860,0xb86a30],[-10.2,-5.2,.72,0xd890d0,0x984a98],[7,11,.65,0x68c8d8,0x2a8098],[-16,6.2,.8,0xf0b860,0xb07828],[13,-6.6,.55,0x8ac86a,0x4a8a4a]].forEach(([x,z,r,f,d])=>{ hirn(g,x,z,r,f,d); k.kreis(x,z,r*1.02); });
  /* Felsbrocken mit Moos */
  [[-5,-5.6,.7],[16.3,-5.6,.85],[-16.7,12.4,.75],[12.4,3.4,.65],[-1.2,4.4,.5],[-12.4,-3.4,.6],[2.4,-8.8,.55],[16.4,8,.6],[-11.2,11.8,.55],[4.4,12.2,.45],[-5.4,12,.5],[12,-4.4,.4]].forEach(([x,z,s],i)=>{ brocken(g,x,z,s,i); k.kreis(x,z,s*1.1); });
  /* Büschel kleiner Becherchen und Knollen an manchen Felsen */
  [[-4.3,-5,1],[-12,-2.8,4],[12.9,4,2],[-16.9,11.2,0],[2.9,-8.3,5],[16.9,8.6,3]].forEach(([x,z,f])=>{ for(let i=0;i<7;i++){ const a=i*2.4, rr=.08+i*.055; ball(g,.17-i*.012,KORALLE[(f+(i%2))%6],x+Math.cos(a)*rr,.14,z+Math.sin(a)*rr,1,1.2,1); } });
  /* Felsgruppe mit Korallen vorn */
  brocken(g,3.8,7.4,.7,1); geweih(g,3.5,.8,7.2,.8,KORALLE[2],.6); geweih(g,4.7,0,7.1,.65,KORALLE[0],2.4); k.kreis(4,7.4,1.15);
  /* Sockel der Seeanemonen */
  const AN=[[.9,8.4,0],[-6.6,3.6,1],[15.4,1.4,0],[4.8,-1.6,1],[-9.8,-9.2,0],[12.6,11.2,1],[-3.4,2.8,0]];
  AN.forEach(([x,z,f])=>{ rohr(g,.28,.4,.34,f?0xd8587a:0xe08a30,x,.17,z,14); ball(g,.27,f?0xf07a9a:0xf0a840,x,.34,z,1,.4,1); k.kreis(x,z,.45); });
  verschmelze(g);
  /* wiegende Fangarme der Anemonen */
  const arm=new THREE.CylinderGeometry(.035,.065,1,6); if(arm.translate) arm.translate(0,.5,0);
  [0,1].forEach(f=>{ const L=[]; AN.filter(a=>a[2]===f).forEach(([x,z])=>{ for(let i=0;i<22;i++){ const a=i*2.4, rr=.04+(i/22)*.24; L.push([x+Math.cos(a)*rr,z+Math.sin(a)*rr,a,rr*2.6,.45+(i%4)*.07]); } });
    const m=instanzen(sc,arm,mat(f?0xffa0c0:0xffd060),L.length), sp=instanzen(sc,GEO.sph,mat(f?0xfff0f6:0xfff6c0),L.length), o=new THREE.Object3D();
    const setze=t=>{ L.forEach(([x,z,a,nei,h],i)=>{ const n=nei+Math.sin(t*1.8+i*.7)*.18; o.position.set(x,.32,z); o.rotation.set(Math.sin(a)*n,0,-Math.cos(a)*n); o.scale.set(1,h,1); o.updateMatrix(); m.setMatrixAt(i,o.matrix);
        o.translateY(h); o.scale.set(.055,.055,.055); o.updateMatrix(); sp.setMatrixAt(i,o.matrix); }); m.instanceMatrix.needsUpdate=true; sp.instanceMatrix.needsUpdate=true; };
    setze(0); k.anim.push(setze); });
  /* dunkelgrüne, kurze Pflanzen (deutlich anders als das große helle Büschel) */
  const P=[]; [[-17,9],[-14,12.4],[-10,12.6],[-2,12.4],[10,12.5],[17,13],[17,-.8],[-17,2],[-17,-8],[17,-8.4],[-.2,-12.4],[2.6,-12.2],[13.4,-12.4],[-12.6,-12.2],[5.8,8.8],[-9.8,-6.8],[8.6,5.8],[-9,7.8],[-4.4,-1.2],[17.2,6],[-1.8,9.8],[6.6,-5],[12,-11.9],[-15.4,-6.6]].forEach(([x,z],j)=>{ const vorn=z>3; for(let i=0;i<9;i++) P.push([x+(zufall()-.5)*.8,z+(zufall()-.5)*.6,(vorn?.45:.7)+zufall()*(vorn?.4:.7),zufall()*6.28,j%2]); });
  [0,1].forEach(f=>{ const L=P.filter(p=>p[4]===f), m=instanzen(sc,blattGeo(.2,.22),doppel(f?0x1e7a5e:0x2e8a46),L.length), o=new THREE.Object3D();
    const setze=t=>{ L.forEach(([x,z,h,a],i)=>{ o.position.set(x,0,z); o.rotation.set(0,a,Math.sin(t*1.3+x+i*.5)*.2); o.scale.set(1,h,h); o.updateMatrix(); m.setMatrixAt(i,o.matrix); }); m.instanceMatrix.needsUpdate=true; };
    setze(0); k.anim.push(setze); });
  /* Kiesel */
  const o=new THREE.Object3D(), KG=felsGeo(2,0,.35);
  [0xb09c78,0x7e98a0,0xe4d4ac].forEach(c=>{ const L=[]; for(let i=0;i<80;i++) L.push([(zufall()-.5)*35.5,(zufall()-.5)*26.6,.04+zufall()*.07,zufall()*6]); for(let i=0;i<34;i++) L.push([(zufall()-.5)*50,i%3?14+zufall()*10:-17-zufall()*5,.1+zufall()*.18,zufall()*6]);
    const m=instanzen(sc,KG,mat(c),L.length); L.forEach((q,i)=>{ o.position.set(q[0],q[2]*.35,q[1]); o.rotation.set(0,q[3],0); o.scale.set(q[2]*1.2,q[2]*.65,q[2]); o.updateMatrix(); m.setMatrixAt(i,o.matrix); }); m.receiveShadow=true; });
}

/* ---------- Tiere und Blasen ---------- */
function schildkroete(k){
  const g=gruppe(k.scene,0,3.4,0), r=gruppe(g,0,0,0), P=0x3e7a3a, D=0x2a5a2c, H=0x8ac868; g.scale.set(.75,.75,.75);
  ball(r,.85,P,0,.06,0,1.15,.48,.95); ball(r,.82,0xe8d898,0,-.08,0,1.1,.3,.9); const saum=ring(r,.82,.07,0xb89a50,0,.02,0); saum.rotation.x=Q; saum.scale.set(1.17,.97,1);
  ball(r,.28,D,0,.44,0,1.1,.28,1); for(let i=0;i<6;i++){ const a=i*1.047; ball(r,.22,i%2?D:0x356a30,Math.cos(a)*.56,.33,Math.sin(a)*.48,1.05,.28,.95); }
  ball(r,.33,H,1.22,.1,0,1.15,.9,.95); strich(r,[.8,0,0],[1.1,.08,0],.2,H);
  [-1,1].forEach(v=>{ ball(r,.1,0xffffff,1.4,.22,v*.22,1,1,.7); ball(r,.055,0x101418,1.47,.23,v*.25,1,1,.7); ball(r,.06,0xf09aa0,1.42,.04,v*.27,1,.6,.4); });
  ring(r,.11,.018,0x2a4a2a,1.58,.06,0,Math.PI).rotation.set(0,Q,Math.PI);
  kegel(r,.12,.34,H,-1.05,0,0).rotation.z=Q;
  verschmelze(r);
  const fl=[[.55,.68,1,.42],[.55,-.68,-1,.42],[-.68,.55,1,-.55],[-.68,-.55,-1,-.55]].map(([x,z,v,d],i)=>{ const a=gruppe(g,x,-.04,z), q=gruppe(a,0,0,0); q.rotation.y=-v*d; const l=i<2?1:.65; ball(q,.3,H,0,0,v*l*.45,.9,.2,l*1.9); ball(q,.1,D,0,.05,v*l*.45,1,.25,2.4*l); verschmelze(q); ohneSchatten(q); return {a,v,i}; });
  k.anim.push(t=>{ const a=t*.17, cx=-1, cz=.6, rx=10, rz=5.8; g.position.set(cx+Math.cos(a)*rx,3.65+Math.sin(t*.9)*.2,cz+Math.sin(a)*rz); g.rotation.y=Math.atan2(-Math.cos(a)*rz,-Math.sin(a)*rx);
    fl.forEach(f=>{ f.a.rotation.x=f.v*Math.sin(t*2.1+(f.i>1?1.4:0))*.45; }); });
}
function qualle(k,x,y,z,farbe,gr,phase){
  const g=gruppe(k.scene,x,y,z), kopf=gruppe(g,0,0,0), m=mat(farbe,{transparent:true,opacity:.68,depthWrite:false,emissive:farbe,emissiveIntensity:.3,side:THREE.DoubleSide});
  const d=form(kopf,new THREE.SphereGeometry(.55,18,9,0,Math.PI*2,0,Q*1.1),m,0,0,0); d.castShadow=false;
  [-1,1].forEach(v=>{ ball(kopf,.07,0x241838,v*.17,.14,.5).castShadow=false; }); const mund=ring(kopf,.09,.018,0x241838,0,.04,.54,Math.PI); mund.rotation.z=Math.PI; mund.castShadow=false;
  const arme=instanzen(g,GEO.sph,m,24), o=new THREE.Object3D();
  for(let i=0;i<24;i++){ const n=i%6, j=Math.floor(i/6), a=n*1.047, d=.065-j*.01; o.position.set(Math.cos(a)*(.32+Math.sin(j*2+n)*.07),-.16-j*.24,Math.sin(a)*(.32+Math.sin(j*2+n)*.07)); o.scale.set(d,d*2.1,d); o.updateMatrix(); arme.setMatrixAt(i,o.matrix); }
  g.scale.set(gr,gr,gr);
  k.anim.push(t=>{ const p=t*1.6+phase, s=Math.sin(p); g.position.y=y+Math.sin(t*.45+phase)*.55; kopf.scale.set(1+s*.1,1-s*.13,1+s*.1); arme.scale.set(1-s*.18,1+s*.12,1-s*.18); arme.rotation.y=Math.sin(t*.5+phase)*.4; });
}
/* Fischschwarm aus vielen kleinen Fischen, die gemeinsam eine Ellipse schwimmen */
function schwarm(k,cx,h,cz,rx,rz,tempo,farbe,farbe2,n){
  const sc=k.scene, leib=instanzen(sc,GEO.sph,mat(farbe),n), flosse=instanzen(sc,new THREE.ConeGeometry(1,1,6),mat(farbe2),n), o=new THREE.Object3D();
  const L=[]; for(let i=0;i<n;i++) L.push([(zufall()-.5)*.9,(zufall()-.5)*.8,(zufall()-.5)*1.1,zufall()*6]);
  const setze=t=>{ L.forEach(([da,dh,dr,p],i)=>{ const a=t*tempo+da*.55, v=Math.sign(tempo), x=cx+Math.cos(a)*(rx+dr*.7), z=cz+Math.sin(a)*(rz+dr*.5), y=h+dh+Math.sin(t*2+p)*.09, w=Math.atan2(-Math.cos(a)*rz*v,-Math.sin(a)*rx*v);
      o.position.set(x,y,z); o.rotation.set(0,w,0,'YXZ'); o.scale.set(.2,.095,.055); o.updateMatrix(); leib.setMatrixAt(i,o.matrix);
      o.position.set(x-Math.cos(w)*.25,y,z+Math.sin(w)*.25); o.rotation.set(0,w+Math.sin(t*10+p)*.5,-Q,'YXZ'); o.scale.set(.1,.14,.02); o.updateMatrix(); flosse.setMatrixAt(i,o.matrix); });
    leib.instanceMatrix.needsUpdate=true; flosse.instanceMatrix.needsUpdate=true; };
  setze(0); k.anim.push(setze);
}
/* freundliche Krabbe: läuft seitwärts, Gesicht nach +z */
function krabbe(k,weg,tempo,start,farbe){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), r=gruppe(g,0,0,0);
  ball(r,.3,farbe,0,.27,0,1.2,.65,.85);
  [-1,1].forEach(v=>{ strich(r,[v*.12,.38,.12],[v*.15,.58,.17],.025,farbe); ball(r,.085,0xffffff,v*.15,.62,.18); ball(r,.04,0x101418,v*.15,.63,.25);
    strich(r,[v*.28,.28,.14],[v*.48,.34,.32],.05,farbe); ball(r,.14,farbe,v*.52,.37,.38,1,.8,.8); ball(r,.07,farbe,v*.47,.49,.4,.8,1.3,.8);
    [-.14,0,.12].forEach(z=>{ strich(r,[v*.26,.25,z],[v*.5,.28,z*1.5-.04],.032,farbe); strich(r,[v*.5,.28,z*1.5-.04],[v*.6,.02,z*1.8-.06],.027,farbe); }); });
  ring(r,.07,.014,0x5a1810,0,.26,.265,Math.PI).rotation.z=Math.PI;
  verschmelze(r); laeufer(k,g,weg,tempo,start,13);
  k.anim.push(()=>{ g.rotation.y*=.25; });
}
function seepferd(k,x,y,z,farbe,dreh){
  const g=gruppe(k.scene,x,y,z), r=gruppe(g,0,0,0);
  [[0,.5,.17],[-.06,.3,.15],[0,.1,.18],[.04,-.1,.16],[-.02,-.28,.12],[-.14,-.42,.09],[-.15,-.56,.075],[-.03,-.62,.06],[.06,-.54,.048],[.01,-.47,.04]].forEach(([a,b,s])=>ball(r,s,farbe,a,b,0,1,1.15,.8));
  ball(r,.21,farbe,.05,.7,0,1.1,1,.85); strich(r,[.18,.67,0],[.5,.56,0],.06,farbe); ball(r,.075,farbe,.5,.56,0);
  [-1,1].forEach(v=>{ ball(r,.06,0xffffff,.14,.76,v*.15,1,1,.6); ball(r,.032,0x101418,.16,.76,v*.185,1,1,.6); });
  [[-.03,.92],[-.17,.76],[-.2,.45],[-.22,.18]].forEach(([a,b])=>ball(r,.08,0xfff0a0,a,b,0,.8,1,.3));
  verschmelze(r); r.rotation.y=dreh; ohneSchatten(r);
  k.anim.push(t=>{ g.position.y=y+Math.sin(t*1.4+x)*.22; g.rotation.z=Math.sin(t*.9+z)*.1; });
}
function blasenfeld(k){
  const sc=k.scene, m=basis(0xe4faff,{transparent:true,opacity:.55,depthWrite:false});
  const Qu=[[4,1.2,7.4,4,6],[-6.6,3.9,-14.4,3,7],[-1.2,3,-15,4,8],[17.6,.5,-3,5,8],[-17.4,.5,8.4,5,8],[2.4,.4,-12.3,4,6],[13.4,1.2,-14.2,4,6],[-12.4,.5,-12.3,4,6],[-19,1,-3,5,7]];
  const L=[]; Qu.forEach(([x,y,z,h,n])=>{ for(let i=0;i<n;i++) L.push([x,y,z,h,i/n+zufall()*.08,.05+zufall()*.07]); });
  const t0=instanzen(sc,GEO.sph,m,L.length), o=new THREE.Object3D();
  const setze=t=>{ L.forEach(([x,y,z,h,p,s],i)=>{ const a=(t*.24+p)%1; o.position.set(x+Math.sin(t*2.1+p*17)*.14,y+a*h,z+Math.cos(t*1.8+p*11)*.1); o.scale.set(s,s,s); o.updateMatrix(); t0.setMatrixAt(i,o.matrix); }); t0.instanceMatrix.needsUpdate=true; };
  setze(0); k.anim.push(setze);
  /* Taucherhelm der Spielfigur: durchsichtige Kugel, daraus steigen Blasen auf */
  const helm=gruppe(sc,0,-9,0), glas=mat(0xbcefff,{transparent:true,opacity:.2,depthWrite:false});
  ball(helm,.5,glas,0,1.68,0).castShadow=false; ball(helm,.07,basis(0xffffff,{transparent:true,opacity:.6}),-.22,1.96,.36,1,1.5,.5).castShadow=false;
  ring(helm,.32,.065,MESSING,0,1.28,0).rotation.x=Q;
  const N=9, fb=instanzen(sc,GEO.sph,m,N), wo=[]; for(let i=0;i<N;i++) wo.push({a:0,x:0,y:-9,z:0});
  k.anim.push(t=>{ const f=k.figur(); if(!f||!f.position) return; const p=f.position; helm.position.set(p.x,p.y,p.z);
    wo.forEach((w,i)=>{ const a=(t*.55+i/N+(i%3)*.04)%1; if(a<w.a || w.y===-9){ w.x=p.x; w.y=p.y; w.z=p.z; } w.a=a; const s=.045+(i%3)*.022+a*.03;
      o.position.set(w.x+Math.sin(t*3+i)*.12,w.y+2.2+a*2.1,w.z-.1+Math.cos(t*2.4+i)*.08); o.scale.set(s,s,s); o.updateMatrix(); fb.setMatrixAt(i,o.matrix); });
    fb.instanceMatrix.needsUpdate=true; });
}
/* Wege der Krabben (frei von festen Dingen) */
const WEG1=[[-6.4,1.1],[-4.2,.1],[-2,1],[-4.8,1.6],[-5,4.8]];
const WEG2=[[2.2,2.8],[4.4,3.6],[4.2,5.2],[1.4,5.8],[.6,4.4]];
const WEG3=[[8.4,-.2],[10.8,.6],[10.6,4.2],[8.8,3.4]];
function tiere(k){
  schildkroete(k);
  qualle(k,-19.4,5,-6,0xf0a0e0,1.2,0); qualle(k,19.5,4.8,3,0x9ac8ff,1.1,2); qualle(k,-18.4,5.2,8.6,0xb8a0ff,.9,4); qualle(k,17.6,5.2,-8.4,0xffb0c8,1,1); qualle(k,3.4,4.6,-11,0xa0e8ff,.75,3); qualle(k,-3.2,5.1,-11.2,0xf0a0e0,.65,5);
  schwarm(k,-6,4.3,0,6.5,3.6,.32,0xffd23a,0xf08a2a,24);
  schwarm(k,3.5,4,3.2,4.2,3.2,-.28,0x5ad8f0,0x1a5aa0,22);
  schwarm(k,-2,3.9,-17.6,12,1.4,.18,0xf07a9a,0xffd0e0,26);
  [[-9,3.9,5,4.2,2.6,.42,0,0xf08a2a,0xffffff,.85],[2,4.5,-4,5.5,2.4,-.35,2,0x4ac8f0,0x1a4a90,.9],[12,3.9,5,3.8,3,.46,4,0xffd23a,0x2f7fd0,.75],[-11,4.4,-4.5,3.5,2.2,-.4,1,0x8ae05a,0x207a50,.7],[3,3.8,8,6,2.2,.3,3,0xf07aa0,0xffd23a,.7],[20.6,4.2,-2,1.2,7,.22,0,0xa86ae0,0xffd23a,1.1],[-20.6,4.2,1,1.2,8,-.2,2,0xf0584a,0xffffff,1.1]].forEach(a=>schwimmer(k,a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9]));
  /* Delfin zieht in der Ferne hinter dem Wrack vorbei */
  const d=dori(k.scene,0,3.6,-20.5,1.1); ohneSchatten(d.g);
  k.anim.push(t=>{ const a=t*.12, v=Math.sin(a); d.g.position.set(Math.cos(a)*22,3.5+Math.sin(t*1.1)*.5,-20.8+v*1); d.g.rotation.y=Math.atan2(-Math.cos(a),-Math.sin(a)*22); d.schwanz.rotation.z=Math.sin(t*4)*.25; });
  krabbe(k,WEG1,.55,0,0xe8543a); krabbe(k,WEG2,.45,2.4,0xf08a2a); krabbe(k,WEG3,.5,1.1,0xd8486a);
  seepferd(k,-15.7,2.55,10.6,0xffb83a,-.3); seepferd(k,16.2,2.6,4.2,0xf07aa0,Math.PI+.4); seepferd(k,-16.1,2.75,-4.8,0x6ae0c0,.2);
}

function baue(k){
  const sc=k.scene;
  licht(sc,{ himmel:0xd4f4ff, grund:0x4a7478, staerke:.8, sonne:0xe4f6ff, sonneStaerke:.46 });
  sc.fog=new THREE.Fog(MEER,27,72);
  meeresgrund(k);
  rand(k);
  wrack(k);
  const tuer=glocke(k);
  ausstattung(k);
  tiere(k);
  blasenfeld(k);
  return { tuer, start:[1,1.4] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-16.8,8.4],[-14.6,11.8],[-9.8,9.4],[-5.8,9.8],[-.2,11.8],[5.8,12],[16.8,12.4],[14.6,5.4],[16.8,-2.6],[13.6,-8.8],[5.2,-7.6],[2.6,-10.4],[-5,-8],[-12.4,-11.4],[-16.8,-7],[-13.2,-4.6],[-11,2],[-1.6,-5.2],[7.6,7.4],[-16.6,3.8]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-7.2, z:-2.8, dreh:.12, steh:[-7,-.6], kasten:[2.4,1.8], treffer:[2.2,2.6,1.3], baue(g,k){ /* 1 Tauchroboter auf Ketten */
      [-.78,.78].forEach(x=>{ box(g,.42,.46,1.2,0x2c3438,x,.3,0); [-.6,.6].forEach(z=>walze(g,.23,.42,0x2c3438,x,.3,z).rotation.z=Q); [-.5,0,.5].forEach(z=>{ walze(g,.13,.05,METALL,x+Math.sign(x)*.22,.3,z).rotation.z=Q; ball(g,.05,GELB,x+Math.sign(x)*.26,.3,z); }); for(let i=0;i<7;i++) box(g,.46,.05,.07,0x545e66,x,.545,-.6+i*.2); });
      box(g,1.2,.24,.9,METALL2,0,.55,0);
      box(g,1.34,.92,.94,GELB,0,1.14,0); walze(g,.47,1.34,GELB,0,1.6,0).rotation.z=Q; [-.68,.68].forEach(x=>{ walze(g,.49,.1,ORANGE,x,1.6,0).rotation.z=Q; box(g,.1,.9,.96,ORANGE,x,1.14,0); });
      /* großes Kameraauge */
      walze(g,.4,.26,0x2c3438,0,1.58,.48).rotation.x=Q; ring(g,.4,.07,METALL,0,1.58,.62); walze(g,.27,.05,basis(0x4ae8e8),0,1.58,.63).rotation.x=Q; walze(g,.12,.03,0x0c2830,0,1.58,.665).rotation.x=Q; ball(g,.065,basis(0xffffff),-.11,1.68,.67,1,1,.5);
      /* Anzeige mit Messkurve */
      const t=bild(256,112,c=>{ c.fillStyle='#0c3448'; c.fillRect(0,0,256,112); c.strokeStyle='#1c6478'; c.lineWidth=2; for(let x=32;x<256;x+=32){ c.beginPath(); c.moveTo(x,0); c.lineTo(x,112); c.stroke(); }
        c.strokeStyle='#6af0a0'; c.lineWidth=7; c.beginPath(); [[8,80],[44,70],[70,30],[96,88],[130,52],[170,60],[206,24],[248,44]].forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.stroke(); c.fillStyle='#ffd23a'; c.beginPath(); c.arc(206,24,10,0,7); c.fill(); });
      box(g,.86,.42,.06,0x2c3438,0,.96,.48); bildFlaeche(g,.76,.33,t,0,.96,.515);
      /* Greifarme mit runden Zangen */
      [-1,1].forEach(v=>{ ball(g,.17,METALL2,v*.76,1.15,.1); strich(g,[v*.76,1.15,.1],[v*1.1,.95,.42],.09,METALL); ball(g,.13,ORANGE,v*1.1,.95,.42); strich(g,[v*1.1,.95,.42],[v*.9,1.08,.82],.075,METALL); ball(g,.1,METALL2,v*.9,1.08,.82);
        const z=ring(g,.17,.055,ORANGE,v*.86,1.12,.98,4.6); z.rotation.set(0,0,Q+.85);
        walze(g,.21,.4,METALL2,v*.62,1.65,-.5).rotation.x=Q; ring(g,.22,.05,DUNKEL,v*.62,1.65,-.72); });
      [-.38,.38].forEach(x=>{ walze(g,.12,.1,basis(0xfff4a0),x,2.02,.32).rotation.x=Q-.3; ring(g,.13,.035,DUNKEL,x,2.04,.37).rotation.x=-.3; });
      strich(g,[0,2.02,-.1],[0,2.48,-.1],.035,METALL2);
      const lm=basis(0xff5a4a,{transparent:true}); ball(g,.13,lm,0,2.54,-.1);
      k.anim.push(t2=>{ lm.opacity=Math.sin(t2*4)>0?1:.35; }); } },
  { x:2.2, z:-5.8, steh:[2.2,-3.8], kasten:[2.9,1.1], treffer:[2.9,2.9,1.1], baue(g){ /* 2 Fächerkoralle: großer flacher Fächer */
      const A=0xe83a80, Hh=0xff7ab0;
      const t=bild(512,384,c=>{ c.clearRect(0,0,512,384); c.beginPath(); c.moveTo(256,384); c.bezierCurveTo(40,330,-6,180,66,86); c.bezierCurveTo(130,-4,382,-4,446,86); c.bezierCurveTo(518,180,472,330,256,384); c.closePath(); c.fillStyle='rgba(255,120,175,.62)'; c.fill(); c.save(); c.clip();
        c.strokeStyle='rgba(190,30,100,.85)'; c.lineWidth=3; for(let i=-14;i<=14;i++){ c.beginPath(); c.moveTo(256,384); c.quadraticCurveTo(256+i*10,200,256+i*24,0); c.stroke(); } for(let r=50;r<390;r+=30){ c.beginPath(); c.arc(256,384,r,3.14,6.28); c.stroke(); } c.restore(); });
      /* durchbrochenes Netz: Löcher werden ausgeschnitten */
      const m=new THREE.Mesh(new THREE.PlaneGeometry(2.8,2.2),new THREE.MeshLambertMaterial({map:t,transparent:true,alphaTest:.15,side:THREE.DoubleSide,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.2})); m.position.set(0,1.6,-.03); m.castShadow=false; g.add(m);
      strich(g,[0,.2,0],[0,.75,0],.17,A);
      [-1.12,-.72,-.34,0,.34,.72,1.12].forEach((w,i)=>{ const l=i===3?1.9:i%2?1.72:1.52, p=[0,.7,0], q=[Math.sin(w*.6)*l*.55,.7+Math.cos(w*.7)*l*.52,.02], e=[Math.sin(w)*l*.98,.7+Math.cos(w*.9)*l,.02];
        strich(g,p,q,.085,A); strich(g,q,e,.055,A); ball(g,.085,A,q[0],q[1],q[2]); ball(g,.085,Hh,e[0],e[1],e[2]);
        const n=[q[0]+Math.sin(w+.5)*.62,q[1]+Math.cos(w+.5)*.55,.04]; strich(g,q,n,.04,A); ball(g,.06,Hh,n[0],n[1],n[2]); });
      const f=form(g,felsGeo(41,1,.3),FELS2,0,.2,0); f.scale.set(.85,.36,.48); const f2=form(g,felsGeo(43,0,.3),FELS3,.85,.14,.15); f2.scale.set(.4,.24,.3);
      /* kleine goldene Muschel zwischen den Ästen */
      ball(g,.17,0xffd860,.42,1.35,.13,1,.85,.45); [-.09,0,.09].forEach(x=>strich(g,[.42,1.24,.2],[.42+x,1.45,.2],.015,0xc89020)); schein(g,'rgba(255,235,150,.7)',.42,1.38,.35,.8); } },
  { x:-12, z:6, steh:[-12,8.2], r:.9, treffer:[2.2,3,1.8], baue(g,k){ /* 3 Seegras-Büschel: groß, hellgrün, mit etwas Glitzerndem */
      const geo=blattGeo(.34,.2), M=[0x9ae840,0xc4f45a,0x74d83a].map(c=>mat(c,{transparent:true,opacity:.99,side:THREE.DoubleSide,emissive:c,emissiveIntensity:.2})), halme=[];
      for(let i=0;i<22;i++){ const a=i*2.4, rr=.1+(i/22)*.55, h=2.85-rr*1.7+(i%3)*.2;
        const s=gruppe(g,Math.cos(a)*rr,.1,Math.sin(a)*rr*.75), b=form(s,geo,M[i%3],0,0,0); b.castShadow=false; b.scale.set(1,h,h*.55); b.rotation.y=Math.sin(a*1.7)*.8; halme.push({s,n:-Math.cos(a)*rr*.35,m:Math.sin(a)*rr*.3,i}); }
      ball(g,.8,0xe8dab0,0,.04,0,1.1,.22,.9); for(let i=0;i<11;i++){ const a=i*.571; ball(g,.13+(i%3)*.03,i%2?0xf4f0e0:0xb8d0d4,Math.cos(a)*.82,.09,Math.sin(a)*.62,1,.65,1); }
      /* goldener Anhänger, der im Gras hängt */
      const gold=mat(0xffd23a,{emissive:0xa87000});
      /* fester Halm, an dem die Schnur des Anhängers hängt */
      [[[-.15,.1,.1],[-.22,1.1,.22]],[[-.22,1.1,.22],[-.18,1.95,.34]],[[-.18,1.95,.34],[.05,2.22,.5]]].forEach(([a,b],i)=>{ strich(g,a,b,.07-i*.012,0x74d83a); ball(g,.07-i*.012,0x74d83a,b[0],b[1],b[2]); });
      strich(g,[.05,2.22,.5],[.05,1.9,.5],.022,0xd8a73a);
      ring(g,.28,.03,gold,.05,1.62,.5); ring(g,.15,.06,gold,.05,1.22,.54); ball(g,.09,basis(0xfff8d8),.05,1.22,.55);
      const gl=schein(g,'rgba(255,240,160,.95)',.05,1.3,.75,.6);
      k.anim.push(t=>{ halme.forEach(h=>{ h.s.rotation.z=h.n+Math.sin(t*1.2+h.i*.5)*.13; h.s.rotation.x=h.m+Math.cos(t+h.i)*.06; }); const v=.7+Math.abs(Math.sin(t*2.6))*.55; gl.scale.set(v*.6,v*.6,1); }); } },
  { x:-6.5, z:-11.2, steh:[-6.5,-9.2], kasten:[2.3,1.4], treffer:[2.4,2.1,1.5], baue(g){ /* 4 alte Truhe im Wrack */
      const H1=0x9a6a34, E=0x5a7a70, M=0xe8b838;
      box(g,2,.82,1.12,H1,0,.52,0); [.35,.6].forEach(y=>box(g,2.02,.035,1.14,HOLZD,0,y,0)); box(g,2.08,.14,1.2,E,0,.18,0); box(g,2.08,.1,1.2,E,0,.93,0);
      [-.68,.68].forEach(x=>box(g,.17,.84,1.18,E,x,.54,0)); [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.18,.9,.18,E,a*.98,.52,b*.54)));
      [-1,1].forEach(a=>[.3,.6,.84].forEach(y=>{ ball(g,.055,M,a*.68,y,.6); ball(g,.05,ROST,a*.98,y,.645); }));
      box(g,.42,.44,.08,M,0,.66,.6); ball(g,.07,0x2a1808,0,.7,.65,1,1,.5); box(g,.05,.14,.02,0x2a1808,0,.6,.65);
      /* Inhalt: Goldmünzen und Perlenkette */
      for(let i=0;i<26;i++){ const x=-.75+((i*37)%150)/100, z=-.32+((i*23)%70)/100; walze(g,.14,.06,i%3?M:0xffd860,x,1+((i*7)%5)*.025+(Math.abs(x)<.4?.07:0),z).rotation.set((i%4)*.2-.3,0,(i%5)*.15-.3); }
      for(let i=0;i<13;i++) ball(g,.07,0xfff6f0,-.55+i*.09,1.04-Math.sin(i/12*3.14)*.12,.58+Math.sin(i/12*3.14)*.08);
      /* gewölbter Deckel, halb offen */
      const d=gruppe(g,0,.99,-.56); d.rotation.x=-.8;
      const dg=new THREE.CylinderGeometry(.58,.58,2.04,18,1,false,0,Math.PI), dm=form(d,dg,doppel(0xa8763c),0,0,.57); dm.rotation.z=Q; dm.scale.x=.75;
      box(d,2,.05,1.1,HOLZD,0,.01,.57);
      [-.68,0,.68].forEach(x=>{ const r=ring(d,.595,.065,E,x,0,.57,Math.PI); r.rotation.y=Q; r.scale.y=.75; });
      box(d,.24,.24,.07,M,0,.05,1.16);
      schein(g,'rgba(255,220,100,.75)',0,1.2,.35,1.7);
      /* Algen und Muschelkrusten */
      [[-.9,.2,.62],[-.78,.34,.62],[.82,.2,.63]].forEach(([x,y,z])=>ball(g,.17,0x3a9a5a,x,y,z,1,1.2,.35)); ball(g,.09,0xe8d8c0,.86,.46,.66,1,.8,.5); } },
  { x:-13.3, z:-8.6, dreh:.18, steh:[-12.95,-6.5], kasten:[2.7,1.2], treffer:[2.7,3.4,1.2], baue(g){ /* 5 rostige Schiffsglocke an einem Balken */
      [-1.1,1.1].forEach(x=>{ box(g,.3,3,.3,HOLZ2,x,1.5,0); box(g,.5,.18,1,HOLZD,x,.09,0); strich(g,[x,.15,.45],[x,.85,.05],.07,HOLZ3); strich(g,[x,.15,-.45],[x,.85,-.05],.07,HOLZ3);
        strich(g,[x,2.4,0],[x*.58,2.96,0],.08,HOLZ3); box(g,.36,.12,.36,0x4a5458,x,2.2,0); });
      box(g,3,.36,.38,HOLZ,0,3.12,0); [-1.5,1.5].forEach(x=>box(g,.1,.44,.46,0x4a5458,x,3.12,0));
      const A=0xb08a3a, D=0x7a5a28;
      box(g,.4,.2,.42,0x4a5458,0,2.9,0); ring(g,.15,.06,D,0,2.72,0);
      ball(g,.45,A,0,2.18,0,1,.85,1); rohr(g,.45,.54,.55,A,0,1.91,0,22,true); rohr(g,.54,.8,.4,A,0,1.45,0,22,true);
      ring(g,.8,.085,D,0,1.25,0).rotation.x=Q; ring(g,.545,.035,D,0,1.65,0).rotation.x=Q; ring(g,.47,.03,D,0,2.12,0).rotation.x=Q;
      walze(g,.77,.04,0x3a2812,0,1.28,0);
      /* Klöppel mit Seil */
      strich(g,[0,1.3,0],[0,.92,.04],.04,D); ball(g,.19,0x6a4a22,0,.86,.04);
      strich(g,[0,.7,.04],[.12,.28,.14],.03,0xd8c090); ball(g,.08,0xd8c090,.12,.28,.14);
      /* Rost- und Grünspanflecken */
      [[-.35,2.18,.33,.13,ROST],[.28,1.8,.46,.16,ROST],[-.42,1.5,.52,.14,0x4a9a80],[.5,1.4,.43,.1,ROST],[.1,2.36,.35,.08,0x4a9a80],[-.1,1.72,.52,.09,ROST]].forEach(([x,y,z,r,c])=>ball(g,r,c,x,y,z,1,1.25,.3));
      /* glitzernder Fund im Klöppel */
      ball(g,.07,basis(0xfff4c0),.12,.92,.21); schein(g,'rgba(255,235,150,.8)',.12,.92,.35,.75); } },
  { x:-15.4, z:-.8, dreh:.42, steh:[-14.5,1.3], kasten:[2.6,1.5], treffer:[2.7,3.2,.8], baue(g){ /* 6 Riff-Infotafel mit Bildern */
      [-1.05,1.05].forEach(x=>{ walze(g,.1,2.3,METALL,x,1.15,-.08); walze(g,.24,.14,DUNKEL,x,.07,-.08); });
      box(g,2.55,1.9,.16,0x2f5a70,0,1.98,-.04); [-1,1].forEach(s=>{ box(g,2.7,.12,.24,METALL,0,1.98+s*.98,-.04); box(g,.12,2.06,.24,METALL,s*1.31,1.98,-.04); });
      box(g,2.9,.12,.5,ORANGE,0,3.12,0);
      const t=bild(512,376,c=>{ const v=c.createLinearGradient(0,0,0,376); v.addColorStop(0,'#8ae0f0'); v.addColorStop(1,'#1a6a98'); c.fillStyle=v; c.fillRect(0,0,512,376);
        c.fillStyle='#e8d498'; c.beginPath(); c.moveTo(0,376); c.lineTo(0,318); c.quadraticCurveTo(140,286,280,322); c.quadraticCurveTo(400,348,512,308); c.lineTo(512,376); c.fill();
        c.lineCap='round';
        const koralle=(x,y,f)=>{ c.strokeStyle=f; c.lineWidth=17; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-95); c.moveTo(x,y-30); c.lineTo(x-40,y-80); c.lineTo(x-42,y-108); c.moveTo(x,y-50); c.lineTo(x+38,y-92); c.lineTo(x+36,y-124); c.stroke(); };
        koralle(86,336,'#f0508a'); koralle(420,332,'#ff9a2a');
        const fi=(x,y,s,f,f2,r)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,44*s,27*s,0,0,7); c.fill(); c.beginPath(); c.moveTo(x-38*s*r,y); c.lineTo(x-72*s*r,y-25*s); c.lineTo(x-72*s*r,y+25*s); c.fill(); c.fillStyle=f2; c.fillRect(x-5*s,y-25*s,10*s,50*s); c.fillStyle='#fff'; c.beginPath(); c.arc(x+22*s*r,y-6*s,9*s,0,7); c.fill(); c.fillStyle='#101418'; c.beginPath(); c.arc(x+25*s*r,y-6*s,4.5*s,0,7); c.fill(); };
        fi(120,80,1.25,'#ffd23a','#2f60c0',1); fi(404,150,.95,'#ff7a2a','#ffffff',-1); fi(210,170,.65,'#a86ae0','#ffe0f0',1);
        /* Schildkröte */
        c.fillStyle='#8ac868'; [[300,45],[300,115],[225,40],[230,118]].forEach(([x,y],i)=>{ c.beginPath(); c.ellipse(x,y,28,12,(i%2?1:-1)*(i<2?.7:-.7),0,7); c.fill(); }); c.beginPath(); c.arc(330,80,22,0,7); c.fill(); c.fillStyle='#3e7a3a'; c.beginPath(); c.ellipse(265,80,55,38,0,0,7); c.fill(); c.strokeStyle='#c8e090'; c.lineWidth=4; c.beginPath(); c.arc(265,80,18,0,7); c.stroke(); c.fillStyle='#101418'; c.beginPath(); c.arc(338,74,4,0,7); c.fill();
        /* Muschel und Seepflanzen */
        c.strokeStyle='#2a9a5a'; c.lineWidth=11; [180,206,322].forEach((x,i)=>{ c.beginPath(); c.moveTo(x,336); c.quadraticCurveTo(x+30,290,x-4,236+i*16); c.stroke(); });
        c.fillStyle='#fff0f6'; c.beginPath(); c.arc(262,338,30,3.14,6.28); c.fill(); c.strokeStyle='#c888b0'; c.lineWidth=3; for(let i=1;i<6;i++){ c.beginPath(); c.moveTo(262,338); c.lineTo(262+Math.cos(3.14+i*.52)*28,338+Math.sin(3.14+i*.52)*28); c.stroke(); }
        c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=3; [[55,170,9],[66,142,6],[470,60,11],[455,34,6]].forEach(([x,y,r])=>{ c.beginPath(); c.arc(x,y,r,0,7); c.stroke(); }); });
      bildFlaeche(g,2.4,1.76,t,0,1.98,.05); } },
  { x:-3, z:6.5, steh:[-3,8.6], kasten:[2.6,1.9], treffer:[2.6,1.9,1.9], baue(g){ /* 7 Seeigel und Seestern auf einem Stein */
      const f=form(g,felsGeo(51,1,.18),0x8a9aa0,0,.28,0); f.scale.set(1.35,.52,.92); const f2=form(g,felsGeo(53,0,.3),FELS,-1.05,.14,.45); f2.scale.set(.38,.26,.34);
      const nadel=new THREE.ConeGeometry(.032,.42,5);
      [[-.62,.98,-.12,.33,0x6a2a98,0x9a54c8],[.02,.86,-.38,.24,0x9a2a78,0xc85aa8]].forEach(([x,y,z,r,c,c2])=>{ ball(g,r,c,x,y,z,1,.85,1);
        for(let i=0;i<70;i++){ const h=1-i/70*1.25, q=Math.sqrt(Math.max(0,1-h*h)), a=i*2.4, d=V(Math.cos(a)*q,h,Math.sin(a)*q), n=form(g,nadel,i%2?c:c2,x+d.x*(r+.15),y+d.y*(r*.85+.15),z+d.z*(r+.15)); n.quaternion.setFromUnitVectors(V(0,1,0),d); }
        [-1,1].forEach(v=>ball(g,.045,basis(0xfff0ff),x+v*r*.3,y+r*.35,z+r*.9)); });
      /* Seestern, schräg nach vorn gelehnt */
      const s=gruppe(g,.55,.78,.42); s.rotation.x=.6; const A=0xff7a1a;
      ball(s,.27,A,0,.06,0,1,.55,1);
      for(let i=0;i<5;i++){ const a=i*1.2566+Math.PI, arm=gruppe(s,0,0,0); arm.rotation.y=a; [[.2,.19],[.37,.155],[.52,.125],[.66,.095],[.77,.07]].forEach(([d,r])=>{ ball(arm,r,A,0,.05,d,1,.6,1.2); ball(arm,r*.28,0xffe0a0,0,.05+r*.62,d); }); }
      [-1,1].forEach(v=>{ ball(s,.065,0xffffff,v*.09,.21,.02); ball(s,.032,0x201008,v*.09,.255,.045); }); } },
  { x:6.6, z:1, steh:[6.6,3], r:.8, treffer:[1.7,3.5,1.7], baue(g,k){ /* 8 Messboje, am Boden verankert */
      box(g,1.15,.32,1.15,0x8a9298,0,.16,0); box(g,.85,.14,.85,0x727a82,0,.38,0); ring(g,.15,.055,DUNKEL,0,.55,0);
      for(let i=0;i<5;i++){ const l=ring(g,.11,.037,0x46545c,0,.73+i*.17,0); l.rotation.y=i%2?Q:0; l.scale.y=1.35; }
      walze(g,.19,.24,METALL2,0,1.6,0);
      ball(g,.66,ROT,0,2.18,0,1,.94,1); walze(g,.668,.24,WEISS,0,2.18,0); [-1,1].forEach(s=>ring(g,.668,.025,METALL2,0,2.18+s*.12,0).rotation.x=Q);
      walze(g,.2,.08,0x2c3438,0,2.4,.58).rotation.x=Q; ring(g,.2,.04,METALL,0,2.43,.62).rotation.x=-.25;
      walze(g,.05,.62,METALL2,0,2.98,0); box(g,.6,.05,.05,METALL2,0,2.98,0); [-.3,.3].forEach(x=>ball(g,.09,TUERKIS,x,2.98,0));
      /* Messfühler an Kabel */
      strich(g,[.42,1.72,.2],[.62,1.25,.3],.025,0x2c3438); walze(g,.12,.46,GELB,.62,1.02,.3); walze(g,.13,.08,DUNKEL,.62,.76,.3);
      const gelb=basis(0xffe23a,{transparent:true}), gruen=basis(0x50f080,{transparent:true});
      ball(g,.15,gelb,0,3.36,0); ball(g,.07,gruen,0,2.4,.66);
      const gl=schein(g,'rgba(255,230,100,.85)',0,3.36,0,1);
      k.anim.push(t=>{ const an=Math.sin(t*3.2)>0; gelb.opacity=an?1:.4; gruen.opacity=an?.35:1; gl.visible=an; }); } },
  { x:14, z:-2.6, steh:[13.5,-.4], r:1.15, treffer:[2.5,2.7,2.2], baue(g){ /* 9 Riesenschwamm: große gelbe Becher mit Löchern */
      const A=0xf4b828, D=0xc8801a, I=0x6a3a0c;
      const becher=(x,z,r,h,neig)=>{ const b=gruppe(g,x,0,z); b.rotation.z=neig;
        /* wellige Wand: Radius und oberer Rand höckerig */
        const rad=(u,a)=>r*(u<.45?.62+u/.45*.24:.86+(u-.45)/.55*.14)*(1+.08*Math.sin(a*5+u*7+x)+.05*Math.sin(a*9-u*13)), hoch=(u,a)=>u*h+u*u*u*h*(.06*Math.sin(a*4+x)+.035*Math.sin(a*7));
        const geo=new THREE.CylinderGeometry(1,1,1,32,12,true), p=geo.attributes.position;
        for(let i=0;i<p.count;i++){ const a=Math.atan2(p.getX(i),p.getZ(i)), u=p.getY(i)+.5, rr=rad(u,a); p.setXYZ(i,Math.sin(a)*rr,hoch(u,a),Math.cos(a)*rr); }
        geo.computeVertexNormals(); form(b,geo,doppel(A),0,0,0);
        for(let i=0;i<30;i++){ const a=i*.2094, rr=rad(1,a)*.97; ball(b,r*(.12+zufall()*.09),i%3?0xffd048:A,Math.sin(a)*rr,hoch(1,a),Math.cos(a)*rr,1,.85,1); }
        walze(b,r*.84,.04,I,0,h*.84,0);
        /* große Löcher, zufällig gestreut */
        for(let i=0;i<19;i++){ const a=i*2.4+zufall()*.9, u=.13+zufall()*.68, rr=rad(u,a), gr=r*(.09+zufall()*.11);
          const loch=gruppe(b,Math.sin(a)*rr,hoch(u,a),Math.cos(a)*rr); loch.rotation.set(0,a,zufall()*3); ball(loch,gr,I,0,0,0,1,1.3,.4); const saum=ring(loch,gr*1.08,gr*.24,D,0,0,.02); saum.scale.y=1.3; }
        for(let i=0;i<34;i++){ const a=zufall()*6.283, u=.08+zufall()*.82, rr=rad(u,a); ball(b,r*(.04+zufall()*.05),0xffd048,Math.sin(a)*rr,hoch(u,a),Math.cos(a)*rr); } };
      becher(-.1,-.1,.82,2.2,.04); becher(.82,.35,.44,1.3,-.2); becher(-.8,.45,.36,.9,.24);
      [[.2,.75,.3],[-.35,.7,.22],[.85,-.4,.26]].forEach(([x,z,r])=>ball(g,r,D,x,r*.5,z,1,.7,1)); } },
  { x:10.6, z:7.4, steh:[10.6,9.5], r:1.05, treffer:[2.3,2.4,2.1], baue(g){ /* 10 Sammelkorb mit Muscheln und Fundstücken */
      const K=0xb87a38, K2=0xdca458, D=0x80501e;
      rohr(g,.86,.66,.86,doppel(D),0,.45,0,24,true); walze(g,.66,.08,D,0,.06,0);
      for(let i=0;i<6;i++) ring(g,.68+i*.036,.06,i%2?K2:K,0,.1+i*.145,0).rotation.x=Q;
      for(let i=0;i<18;i++){ const a=i*.349; strich(g,[Math.sin(a)*.7,.05,Math.cos(a)*.7],[Math.sin(a)*.92,.9,Math.cos(a)*.92],.032,K2); }
      ring(g,.91,.095,K,0,.9,0).rotation.x=Q;
      const h=ring(g,.9,.075,K2,0,.92,-.12,Math.PI); h.scale.y=1.28; for(let i=1;i<8;i++){ const a=i*Math.PI/8; ball(g,.095,D,Math.cos(a)*.9,.92+Math.sin(a)*1.152,-.12,.8,.8,1.1); }
      walze(g,.78,.12,0x9a7238,0,.76,0);
      /* gerippte Muscheln */
      const fach=(x,y,z,s,c,c2,dreh,kipp)=>{ const m=gruppe(g,x,y,z); m.rotation.set(kipp,dreh,0); m.scale.set(s,s,s); for(let i=-3;i<=3;i++){ const a=i*.36; const r=gruppe(m,0,0,0); r.rotation.z=-a; ball(r,.1,i%2?c:c2,0,.22,i%2?.012:0,.85,2.6,.6); } ball(m,.1,c,0,0,0,1.8,.8,.7); };
      fach(-.36,.92,.42,1.05,0xff8a9a,0xffd0d4,.25,-.45); fach(.45,.98,.08,.9,0xfff0d0,0xe8b878,-.6,-.3); fach(-.4,1.02,-.3,.85,0xb890e0,0xe8d8ff,.9,-.2);
      /* Schneckenhaus */
      [[0,0,.26],[.08,.2,.2],[.15,.35,.14],[.2,.46,.09],[.23,.54,.05]].forEach(([x,y,r],i)=>ball(g,r,i%2?0xd87838:0xf8d8a8,.1+x,.98+y,.38-i*.02,1,.85,1));
      ball(g,.17,0xffffff,.55,.94,.46); ball(g,.05,basis(0xffffff),.5,1.02,.61);
      strich(g,[-.05,.8,-.35],[.1,1.55,-.45],.07,0xf0584a); strich(g,[.04,1.15,-.4],[.38,1.42,-.42],.055,0xf0584a); strich(g,[0,1.05,-.4],[-.27,1.35,-.35],.05,0xf0584a); [[.1,1.55,-.45],[.38,1.42,-.42],[-.27,1.35,-.35]].forEach(p=>ball(g,.085,0xf0584a,p[0],p[1],p[2])); } }
];

return { titel:'Das Riff', himmel:MEER, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 5: Die U-Boot-Garage. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: Das gelbe Mini-U-Boot liegt hinten im Dock. Eine Leiter führt zum Turm, die Turmluke klappt auf. */
RAEUME3D.unterwasser[4] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, GELB, ORANGE, ROT, TUERKIS, BLAU, GRUEN, ROSA, LILA, MESSING } = UW;
const GOLDGELB=0xe0a512, NACHT=0x14222c, STAHL=0x5a6e7e, HOLZ=0xb87a42, HOLZ2=0x7a4a26, EISEN=0x2c4058, EISEN2=0x45607c;

/* ---------- kleine Helfer ---------- */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
const lampe=(p,r,c,x,y,z)=>{ const t=ball(p,r,typeof c==='number'?basis(c):c,x,y,z); t.castShadow=false; return t; };
const feld=(p,w,h,d,c,x,y,z)=>{ const t=box(p,w,h,d,typeof c==='number'?basis(c):c,x,y,z); t.castShadow=false; return t; };
const durch=(c,a,add)=>basis(c,Object.assign({transparent:true,opacity:a,depthWrite:false,side:THREE.DoubleSide},add?{blending:THREE.AdditiveBlending}:{}));
const quer=(p,r,h,c,x,y,z)=>{ const t=walze(p,r,h,c,x,y,z); t.rotation.z=Math.PI/2; return t; };
const laengs=(p,r,h,c,x,y,z)=>{ const t=walze(p,r,h,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
const tafel=(p,tex,w,h,x,y,z)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex})); m.position.set(x,y,z); p.add(m); return m; };
/* Zahnrad, Blick nach +z */
function zahnrad(p,r,c,x,y,z){ const g=gruppe(p,x,y,z); ring(g,r*.68,r*.24,c,0,0,0); for(let i=0;i<8;i++){ const a=i*Math.PI/4, t=box(g,r*.28,r*.28,r*.3,c,Math.cos(a)*r,Math.sin(a)*r,0); t.rotation.z=a; } ball(g,r*.22,METALL,0,0,0,1,1,.6); [0,1,2,3].forEach(i=>{ const s=box(g,r*1.1,r*.11,r*.12,c,0,0,0); s.rotation.z=i*Math.PI/4; }); return g; }
/* Schiffsschraube mit drei runden Blättern, Achse entlang z */
function schraube(p,r,c,x,y,z){ const g=gruppe(p,x,y,z); for(let i=0;i<3;i++){ const a=gruppe(g,0,0,0); a.rotation.z=i*Math.PI*2/3; const b=ball(a,r*.5,c,0,r*.55,0,.62,1,.14); b.rotation.y=.45; } const n=ball(g,r*.22,MESSING,0,0,r*.08,1,1,1.4); n.castShadow=false; return g; }
/* Messuhr an der Wand, Blick nach +z */
function uhr(p,r,x,y,z,w){ const s=laengs(p,r,.12,MESSING,x,y,z); s.castShadow=false; laengs(p,r*.8,.14,WEISS,x,y,z+.005).castShadow=false;
  for(let i=0;i<7;i++){ const a=-.6+i*.72; box(p,r*.06,r*.17,.02,NACHT,x+Math.cos(a)*r*.62,y+Math.sin(a)*r*.62,z+.082).rotation.z=a-Math.PI/2; }
  const n=box(p,r*.08,r*.62,.025,ROT,x+Math.sin(w)*r*.26,y+Math.cos(w)*r*.26,z+.092); n.rotation.z=-w; ball(p,r*.11,NACHT,x,y,z+.1,1,1,.5); }

/* ---------- Mini-U-Boot und Ausgang ---------- */
const SY=.55, SZ=-10.2, RX=6.2, RY=1.35, RZ=1.6;       /* Rumpf: Mitte und Halbmesser */
const TX=.5, TZ=-9.95;                                  /* Turm und Leiter */
const rumpfZ=(x,y)=>SZ+RZ*Math.sqrt(Math.max(0,1-(x/RX)*(x/RX)-((y-SY)/RY)*((y-SY)/RY)));
function bullauge(p,x,y,r){
  const z=rumpfZ(x,y), g=gruppe(p,x,y,z), n=V(x/(RX*RX),(y-SY)/(RY*RY),(z-SZ)/(RZ*RZ)).normalize();
  g.quaternion.setFromUnitVectors(V(0,0,1),n);
  ring(g,r,r*.24,MESSING,0,0,.07); ball(g,r,0x7fd8f8,0,0,0,.95,.95,.28); ball(g,r*.22,0xffffff,-r*.32,r*.34,r*.27,1,.7,.35);
  for(let i=0;i<6;i++){ const a=i*Math.PI/3; ball(g,r*.09,0x8a5a10,Math.cos(a)*r*1.02,Math.sin(a)*r*1.02,.15); }
}
function baueBoot(k,sc){
  const g=gruppe(sc,0,0,0);
  const kugel=new THREE.SphereGeometry(1,40,24);
  teil(g,kugel,GELB,0,SY,SZ,RX,RY,RZ);
  /* Zierstreifen um den Rumpf */
  const band=(a,b,c,f)=>{ const t=teil(g,new THREE.SphereGeometry(1,40,3,0,Math.PI*2,Math.PI*a,Math.PI*b),c,0,SY,SZ,RX*f,RY*f,RZ*f); t.castShadow=false; };
  band(.565,.06,ROT,1.006); band(.535,.018,WEISS,1.008); band(.7,.3,GOLDGELB,1.004);
  /* Bullaugen vorn (der Bereich hinter der Leiter bleibt frei) */
  [-4.1,-2.55,-1.35,2.45,3.65].forEach((x,i)=>bullauge(g,x,.95,i===0?.34:.43));
  bullauge(g,5.05,.85,.5);
  /* Scheinwerfer am Bug */
  quer(g,.36,.4,MESSING,6.18,.55,SZ); lampe(g,.27,0xfff6c0,6.38,.55,SZ);
  /* Heckflossen */
  ball(g,.8,ORANGE,-5.35,1.55,SZ,.85,1,.14); ball(g,.75,ORANGE,-5.3,.55,SZ+.75,.85,.13,1); ball(g,.75,ORANGE,-5.3,.55,SZ-.75,.85,.13,1);
  quer(g,.28,.9,METALL2,-6.35,.55,SZ); ring(g,1.02,.09,GOLDGELB,-6.8,.55,SZ).rotation.y=Math.PI/2;
  [-1,1].forEach(v=>strich(g,[-6.8,.55+v*1.0,SZ],[-5.9,.55+v*.35,SZ],.07,GOLDGELB));
  /* Turm */
  const turm=teil(g,new THREE.CylinderGeometry(1,1.08,1,36),GELB,TX,2.04,TZ,1.42,2.28,1.08);
  turm.castShadow=true;
  const rand=(y,d,c,f)=>{ const t=ring(g,1,d,c,TX,y,TZ); t.rotation.x=Math.PI/2; t.scale.set(1.43*f,1.09*f,1); };
  rand(3.17,.09,GOLDGELB,1); rand(1.98,.07,ROT,1.045);
  [-1,1].forEach(v=>{ const x=TX+v*.98, z=TZ+.84, a=v*.55, f=gruppe(g,x,2.45,z); f.rotation.y=a; ring(f,.24,.06,MESSING,0,0,.04); ball(f,.24,0x7fd8f8,0,0,0,.95,.95,.25); ball(f,.055,0xffffff,-.08,.08,.07); });
  /* Sehrohr hinten links */
  strich(g,[TX-.95,3.1,TZ-.45],[TX-.95,4.0,TZ-.45],.09,METALL); ball(g,.13,METALL,TX-.95,4.0,TZ-.45); quer(g,.12,.34,METALL,TX-1.12,4.0,TZ-.45); lampe(g,.085,0x9ae8ff,TX-1.3,4.0,TZ-.45);
  /* Tritt zwischen Leiter und Turm */
  box(g,1.24,.1,.78,STAHL,TX,2.9,-8.51);
  [-1,1].forEach(v=>{ [-8.18,-8.82].forEach(z=>walze(g,.04,.62,METALL,TX+v*.6,3.24,z)); strich(g,[TX+v*.6,3.55,-8.14],[TX+v*.6,3.55,-8.86],.045,ROT); strich(g,[TX+v*.5,2.85,-8.3],[TX+v*.5,2.15,-8.85],.05,STAHL); });
  /* Leiter: genau hier steigt die Figur hinauf */
  [-1,1].forEach(v=>{ walze(g,.065,3.62,METALL,TX+v*.42,1.81,-8.1); ball(g,.1,ROT,TX+v*.42,3.65,-8.1); box(g,.22,.09,.26,NACHT,TX+v*.42,.15,-8.1); });
  for(let y=.34;y<3;y+=.365) quer(g,.045,.84,GELB,TX,y,-8.1);
  verschmelze(g);
  /* drehender Antrieb */
  const antrieb=gruppe(sc,-6.88,.55,SZ), achse=gruppe(antrieb,0,0,0); achse.rotation.y=Math.PI/2; const prop=schraube(achse,.86,0xd8863a,0,0,0); verschmelze(prop);
  k.anim.push(t=>{ prop.rotation.z=t*1.3; });
  /* Luke oben auf dem Turm */
  const innen=gruppe(sc,TX,3.2,TZ);
  const loch=walze(innen,.76,.03,basis(0x2a2008),0,0,0); loch.castShadow=false; reif(innen,.77,.06,MESSING,0,.02,0);
  const hellM=durch(0xffe87a,0), hell=walze(innen,.68,.04,hellM,0,.025,0); hell.castShadow=false;
  const strahlM=durch(0xffe27a,0,true), strahl=new THREE.Mesh(new THREE.CylinderGeometry(1.0,.62,1.5,24,1,true),strahlM); strahl.position.y=.78; innen.add(strahl);
  const angel=gruppe(sc,TX,3.27,TZ-.76), deckel=gruppe(angel,0,0,.76);
  walze(deckel,.8,.14,GOLDGELB,0,.02,0); walze(deckel,.6,.08,GELB,0,.12,0); reif(deckel,.3,.055,ROT,0,.24,0); [0,1].forEach(i=>{ box(deckel,.6,.05,.07,ROT,0,.24,0).rotation.y=i*Math.PI/2; }); walze(deckel,.09,.14,ROT,0,.18,0);
  walze(deckel,.62,.03,METALL,0,-.06,0); reif(deckel,.5,.04,ORANGE,0,-.085,0);
  verschmelze(deckel); quer(angel,.09,.7,METALL2,0,0,0);
  /* Lämpchen am Turm: rot, offen grün */
  const lm=basis(0xff5a4a); [-1,1].forEach(v=>lampe(sc,.12,lm,TX+v*.98,2.92,TZ+.87));
  /* Pfosten mit Zahlenschloss rechts neben der Leiter */
  const pf=gruppe(sc,TX+1.7,0,-7.78);
  walze(pf,.28,.1,NACHT,0,.05,0); walze(pf,.1,2.0,METALL2,0,1.0,0); box(pf,1.18,1.06,.14,DUNKEL,0,2.38,0); [-1,1].forEach(v=>feld(pf,.06,.9,.04,0x60f0e0,v*.54,2.38,.08));
  verschmelze(pf);
  const schloss=UW.zahlenschloss(sc,TX+1.7,2.32,-7.58); schloss.scale.set(1.12,1.12,1.12); verschmelze(schloss);
  /* grüner Haken: erscheint auf der Tafel, wenn das Schloss verschwunden ist */
  const haken=gruppe(sc,TX+1.7,2.38,-7.66);
  laengs(haken,.42,.04,basis(0x2fbf5a),0,0,0).castShadow=false; ring(haken,.42,.045,MESSING,0,0,.03);
  feld(haken,.26,.1,.03,0xffffff,-.15,-.06,.045).rotation.z=-.8; feld(haken,.5,.1,.03,0xffffff,.09,.03,.052).rotation.z=.85;
  haken.visible=false;
  const licht=new THREE.PointLight(0xffe27a,0,8,1.5); licht.position.set(TX,4.0,TZ+.2); sc.add(licht);
  k.kasten(TX,-8.1,1.1,.34); k.kreis(TX+1.7,-7.78,.28);
  return ausgang(k,{ name:'U-Boot-Luke', einfach:'Tür vom U-Boot', steh:[TX,-6.1], durch:[TX,-7.85], hoch:2.95,
    treffer:{x:-.25,y:1.75,z:-8.6,b:9.5,h:3.1,t:.8}, schildOben:[TX,4.5,-7.9], glanz:[TX+1.7,2.35,-7.25],
    bewege:(auf)=>{ angel.rotation.x=-auf*1.85; hellM.opacity=.7*Math.min(1,auf); strahlM.opacity=.2*auf; hell.visible=strahl.visible=auf>.03; licht.intensity=.4*auf; lm.color.setHex(auf>.15?0x5aff7a:0xff5a4a); schloss.visible=auf<.5; haken.visible=auf>=.5; } });
}

/* ---------- Dockbecken mit Wasser ---------- */
function baueDock(k,sc){
  const g=gruppe(sc,0,0,0), X=9.4, Z1=-12.9, Z2=-8.2, ZM=(Z1+Z2)/2, T=Z2-Z1;
  box(g,X*2+.4,.1,T+.4,0x0c3a52,0,-1.65,ZM);
  [Z1-.1,Z2+.1].forEach(z=>box(g,X*2+.4,1.6,.2,0x2a5468,0,-.84,z));
  [-1,1].forEach(v=>box(g,.2,1.6,T,0x2a5468,v*(X+.1),-.83,ZM));
  /* niedrige Kante rundum */
  box(g,X*2+.5,.12,.2,STAHL,0,.06,Z1-.1);
  [-1,1].forEach(v=>box(g,.24,.14,T+.3,STAHL,v*(X+.12),.07,ZM));
  /* Poller und Halteseile */
  [[-6.8,-4.6],[-3.3,-3.0],[4.6,3.9],[7.4,5.2]].forEach(([x,hx])=>{ walze(g,.13,.34,NACHT,x,.17,-7.99); ball(g,.17,GELB,x,.38,-7.99,1,.7,1); strich(g,[x,.33,-8.04],[hx,.95,rumpfZ(hx,.95)-.04],.04,0xe8d8b0); });
  verschmelze(g);
  /* Warnkante vorn: gelb und schwarz im Wechsel */
  const o=new THREE.Object3D();
  [GELB,0x232830].forEach((c,n)=>{ const im=new THREE.InstancedMesh(GEO.box,mat(c),19);
    for(let i=0;i<19;i++){ o.position.set(-9.15+(i*2+n)*.495,.07,-8.1); o.rotation.set(0,0,0); o.scale.set(.49,.14,.2); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }
    im.frustumCulled=false; im.receiveShadow=true; sc.add(im); });
  /* Wasser */
  const tex=bild(256,128,(c,W,H)=>{ c.fillStyle='#1e8cb4'; c.fillRect(0,0,W,H); c.lineWidth=3; for(let i=0;i<46;i++){ const x=zufall()*(W-50), y=6+zufall()*(H-12); c.strokeStyle=i%3?'rgba(190,245,255,.55)':'rgba(8,70,100,.6)'; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+14,y-7,x+28,y); c.quadraticCurveTo(x+36,y+5,x+46,y); c.stroke(); } });
  tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.repeat.set(3,1.5);
  const wasser=new THREE.Mesh(new THREE.PlaneGeometry(X*2,T),new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:.66,depthWrite:false})); wasser.rotation.x=-Math.PI/2; wasser.position.set(0,-.3,ZM); sc.add(wasser);
  k.anim.push(t=>{ tex.offset.x=(t*.025)%1; tex.offset.y=Math.sin(t*.5)*.06; wasser.position.y=-.3+Math.sin(t*1.4)*.03; });
  [[-8.2,-8.9,7],[7.7,-9.3,8],[-6.9,-11.9,6],[8.3,-11.8,6]].forEach(([x,z,n])=>UW.blasen(k,sc,x,-1.3,z,n,1.35,.1));
  const l=new THREE.PointLight(0x40d8ff,.65,11,1.5); l.position.set(-6,.8,-8.6); sc.add(l);
  k.kasten(0,-10.85,19.1,5.3);
}

/* ---------- Meerfenster mit Delfin Dori ---------- */
function baueDoriFenster(k,hinten){
  const f=UW.meerFenster(k,hinten,9.0,3.2,-11.4,2.55,-13.5,2);
  const flach=gruppe(f,0,0,.3); flach.scale.z=.2;
  const d=UW.dori(flach,0,-.15,0,.98);
  d.g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
  let dreh=0;
  k.anim.push((t,dt)=>{ const a=t*.42, ziel=Math.cos(a)>0?0:Math.PI; dreh+=(ziel-dreh)*Math.min(1,dt*3.5);
    d.g.position.set(Math.sin(a)*2.25,-.12+Math.sin(t*1.25)*.24,0); d.g.rotation.y=dreh; d.g.rotation.z=Math.cos(t*1.25)*.09; d.schwanz.rotation.z=Math.sin(t*5)*.28; });
  UW.blasen(k,f,3.8,-1.4,.22,6,2.7,.08); UW.blasen(k,f,-3.9,-1.4,.22,5,2.6,.07);
}

/* ---------- runde Bullaugenfenster mit kleinem Fisch ---------- */
function rundFenster(k,par,x,y,z,dreh,r,n){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh;
  const m=new THREE.Mesh(new THREE.CircleGeometry(r,32),new THREE.MeshBasicMaterial({map:UW.meerBild(256,256)})); m.position.z=.03; g.add(m);
  const ra=gruppe(g,0,0,0); ring(ra,r,.14,METALL,0,0,.1); for(let i=0;i<8;i++){ const a=i*Math.PI/4; ball(ra,.06,MESSING,Math.cos(a)*r,Math.sin(a)*r,.25); } verschmelze(ra);
  const F=[[0xf08a2a,0xffffff],[0xffd23a,0x2f7fd0],[0xf07aa0,0xffd23a],[0x8ae05a,0x207a50]][n%4];
  const wrap=gruppe(g,0,0,.12); wrap.scale.z=.16; const f=UW.fisch(wrap,F[0],F[1],0,0,0,r*.55);
  k.anim.push(t=>{ const a=t*(.6+n*.07)+n*2; f.g.position.set(Math.sin(a)*r*.38,Math.sin(t*1.3+n)*r*.2,0); f.g.rotation.y=Math.cos(a)>0?0:Math.PI; f.schwanz.rotation.y=Math.sin(t*9+n)*.5; });
}

/* ---------- kleine Mitbewohner ---------- */
function krabbe(k,weg){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0); r.rotation.y=Math.PI/2; const F=0xf0603a, D=0xc03a24;
  ball(r,.36,F,0,.34,0,1.35,.65,1);
  [-1,1].forEach(v=>{ strich(r,[.25,.45,v*.14],[.38,.76,v*.16],.035,D); ball(r,.095,0xffffff,.39,.8,v*.16); ball(r,.048,0x101418,.47,.81,v*.16);
    strich(r,[.2,.34,v*.38],[.52,.45,v*.58],.065,D); ball(r,.17,F,.62,.5,v*.6,1.1,.9,.8); ball(r,.07,F,.76,.63,v*.58,1.5,.7,.7);
    [-.24,0,.2].forEach(x=>{ strich(r,[x,.32,v*.3],[x*1.35,.38,v*.6],.045,D); strich(r,[x*1.35,.38,v*.6],[x*1.55,.05,v*.74],.035,D); }); });
  const mund=ring(r,.08,.018,0x5a1a10,.49,.37,0,Math.PI); mund.rotation.y=Math.PI/2; mund.rotation.z=Math.PI;
  verschmelze(r); laeufer(k,g,weg,.8,0,11);
}
function putzroboter(k,weg){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0);
  walze(r,.55,.28,WEISS,0,.24,0); reif(r,.55,.06,TUERKIS,0,.24,0); ball(r,.4,TUERKIS,0,.38,0,1,.7,1);
  [-1,1].forEach(v=>{ ball(r,.11,NACHT,.32,.52,v*.15,.8,1,1); lampe(r,.045,0x9affff,.42,.54,v*.15); quer(r,.1,.16,NACHT,-.1,.12,v*.5).rotation.set(Math.PI/2,0,0); });
  strich(r,[-.15,.6,0],[-.15,.95,0],.03,METALL); verschmelze(r);
  const bl=basis(0xffd23a); lampe(g,.09,bl,-.15,.99,0);
  const besen=gruppe(g,.55,.08,0); [0,1,2,3].forEach(i=>{ const b=box(besen,.52,.06,.08,ORANGE,0,0,0); b.rotation.y=i*Math.PI/4; b.castShadow=false; }); verschmelze(besen);
  k.anim.push(t=>{ besen.rotation.y=t*7; bl.color.setHex(Math.sin(t*5)>0?0xffd23a:0x7a5a10); });
  laeufer(k,g,weg,1.15,3,9);
}

function baue(k){
  const sc=k.scene;
  const h=UW.huelle(k,{ B:36, T:27, H:6, wand:[84,116,134], boden:[104,126,140], strebe:0x4a6474, leuchte:0xffe27a, staerke:.86, sonneStaerke:.4,
    pfosten:[-17,-5.9,8.6,15.2], streben:[-9.6,-4.8,2.2,9], bodenLoch:{x:0,z:-10.55,b:18.8,t:4.7} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const o=new THREE.Object3D();

  baueDock(k,sc);
  const tuer=baueBoot(k,sc);
  baueDoriFenster(k,hinten);

  /* ---------- Rückwand hinter dem Boot ---------- */
  rundFenster(k,hinten,-3.7,3.25,-13.5,0,.8,0);
  rundFenster(k,hinten,5.0,3.25,-13.5,0,.8,1);
  const rw=gruppe(hinten,0,0,0);
  [[-1.5,3.5,.42,.7],[.2,3.7,.55,-.5],[2.0,3.5,.42,1.4],[7.4,2.0,.36,-1],[16.3,2.9,.5,.2],[14.4,1.5,.3,1.1]].forEach(([x,y,r,w])=>uhr(rw,r,x,y,-13.42,w));
  strich(rw,[-6.4,1.7,-13.3],[8.2,1.7,-13.3],.11,TUERKIS); strich(rw,[-6.4,1.3,-13.38],[8.2,1.3,-13.38],.07,ORANGE);
  [-5.2,-2.4,3.4,6.6].forEach(x=>{ ring(rw,.3,.05,ROT,x,2.35,-13.2); [0,1].forEach(i=>{ box(rw,.58,.05,.05,ROT,x,2.35,-13.2).rotation.z=i*Math.PI/2+.4; }); strich(rw,[x,2.35,-13.45],[x,1.7,-13.3],.07,METALL); });
  [13.95,17.3].forEach(x=>{ strich(rw,[x,.2,-13.3],[x,5.1,-13.3],.1,x<15?ORANGE:TUERKIS); [1,2.4,4.2].forEach(y=>reif(rw,.14,.05,METALL,x,y,-13.3)); });
  verschmelze(rw);

  /* ---------- Warnlichter an den vorderen Ecken des Docks ---------- */
  [-1,1].forEach(v=>{ const x=v*9.05, z=-7.7, p=gruppe(sc,x,0,z);
    walze(p,.3,.14,NACHT,0,.07,0); walze(p,.1,1.7,GELB,0,.95,0); [.5,.95,1.4].forEach(y=>walze(p,.108,.2,0x232830,0,y,0)); walze(p,.24,.14,NACHT,0,1.86,0); verschmelze(p);
    const glas=durch(0xffc820,.65), kuppel=ball(p,.25,glas,0,2.1,0,1,1.15,1); kuppel.castShadow=false; lampe(p,.1,0xfff2a0,0,2.08,0); walze(p,.12,.06,NACHT,0,2.4,0);
    const dreher=gruppe(p,0,2.08,0), sm=durch(0xffd23a,.22,true);
    [-1,1].forEach(s=>{ const c=new THREE.Mesh(new THREE.ConeGeometry(.42,1.5,16,1,true),sm); c.rotation.z=s*Math.PI/2; c.position.x=s*.78; dreher.add(c); });
    const gl=schein(p,'rgba(255,205,40,.55)',0,2.1,0,1.3);
    k.anim.push(t=>{ dreher.rotation.y=t*3*v+v; gl.material.opacity=.6+Math.sin(t*6+v)*.35; });
    k.kreis(x,z,.3); });

  /* ---------- Blubbersäulen in den hinteren Ecken ---------- */
  [-16.9,16.9].forEach((x,n)=>{ const p=gruppe(sc,x,0,-12.2);
    walze(p,.78,.5,NACHT,0,.25,0); reif(p,.72,.07,MESSING,0,.52,0); walze(p,.76,.3,NACHT,0,4.2,0); reif(p,.7,.07,MESSING,0,4.03,0); verschmelze(p);
    const glas=new THREE.Mesh(new THREE.CylinderGeometry(.62,.62,3.55,24,1,true),durch(n?0x60ffd8:0x60d0ff,.26)); glas.position.y=2.28; p.add(glas);
    UW.blasen(k,p,-.15,.7,.05,9,3.1,.11); UW.blasen(k,p,.22,.7,-.1,7,3.1,.08);
    UW.schwimmer(k,x,2.2+n*.5,-12.2,.3,.3,n?-1.1:.9,n*2,n?0xffd23a:0xf08a2a,n?0x2f7fd0:0xffffff,.32);
    k.kreis(x,-12.2,.8); });

  /* ---------- Seitenwände: Fenster, Werkzeugbrett, Flossen, Anzeigen ---------- */
  rundFenster(k,links,-17.98,2.7,-7.2,Math.PI/2,1.05,2);
  rundFenster(k,links,-17.98,2.7,5.6,Math.PI/2,1.05,3);
  rundFenster(k,rechts,17.98,2.6,-.9,-Math.PI/2,1.05,1);
  rundFenster(k,rechts,17.98,2.6,-7.4,-Math.PI/2,.9,0);
  const lw=gruppe(links,0,0,0), rv=gruppe(rechts,0,0,0);
  /* Werkzeugbrett rechts */
  const wz=gruppe(rv,17.92,2.5,6.0); wz.rotation.y=-Math.PI/2;
  box(wz,3.8,2.0,.08,0xd89a52,0,0,0); [-1,1].forEach(v=>{ box(wz,3.95,.12,.14,HOLZ2,0,v*1.02,.02); box(wz,.12,2.1,.14,HOLZ2,v*1.92,0,.02); });
  [[-1.45,1.3,ROT],[-.9,1.1,METALL2],[-.4,.9,METALL2]].forEach(([x,l,c])=>{ box(wz,.13,l,.07,c,x,0,.1); [-1,1].forEach(v=>ring(wz,.15,.06,c,x,v*(l/2+.1),.1,Math.PI*1.5).rotation.z=v*Math.PI/2+.8); });
  [[.15,GELB],[.55,ORANGE],[.95,TUERKIS]].forEach(([x,c])=>{ walze(wz,.1,.5,c,x,.4,.13); walze(wz,.032,.8,METALL,x,-.2,.12); });
  zahnrad(wz,.34,STAHL,1.5,.35,.12); zahnrad(wz,.24,MESSING,1.45,-.45,.12);
  /* Taucherflossen und Brillen links */
  [10.4,12.0].forEach((z,i)=>{ const f=gruppe(lw,-17.85,2.5,z); f.rotation.y=Math.PI/2; const c=[GELB,ROSA][i];
    [-.3,.3].forEach(x=>{ ball(f,.28,NACHT,x,.55,.05,.8,1,.45); const b=kegel(f,.3,1.15,c,x,-.15,.05); b.scale.z=.07; [-.09,.09].forEach(d=>box(f,.03,.75,.04,NACHT,x+d,-.3,.1)); });
    [-1,1].forEach(v=>{ ring(f,.2,.055,c,v*.22,1.25,.07); ball(f,.18,0x9ae0f8,v*.22,1.25,.05,1,1,.25); }); box(f,1.5,.1,.12,METALL,0,.92,.04); });
  /* Uhren und Leitungen */
  [[lw,-1,[[-12,2.4,.45,.5],[-10.9,3.4,.35,-1],[1.0,3.3,.4,1.2]]],[rv,1,[[-11.8,2.6,.45,-.4],[10.6,2.5,.42,.9],[11.9,3.3,.34,-1.3]]]].forEach(([w,v,liste])=>{
    liste.forEach(([z,y,r,a])=>{ const q=gruppe(w,v*17.9,y,z); q.rotation.y=-v*Math.PI/2; uhr(q,r,0,0,0,a); });
    strich(w,[v*17.78,.75,-12.8],[v*17.78,.75,12.8],.1,v<0?GELB:ORANGE); for(let z=-12;z<13;z+=2.7) box(w,.3,.3,.14,METALL2,v*17.85,.75,z);
    strich(w,[v*17.85,4.5,-12.8],[v*17.85,4.5,12.8],.07,v<0?ORANGE:TUERKIS); });
  verschmelze(lw); verschmelze(rv);

  /* ---------- Blinkende Lämpchen an allen Wänden ---------- */
  const farben=[0x5ff0ff,0xffcf4a,0xff7a6a,0x7ae86a].map(f=>basis(f));
  [[hinten,(i)=>[-5.0+i*.62,4.45+(i%2)*.14,-13.42],20],[links,(i)=>[-17.9,3.9+(i%2)*.16,-12.2+i*1.07],24],[rechts,(i)=>[17.9,3.9+(i%2)*.16,-12.2+i*1.07],24]].forEach(([w,ort,n],s)=>{
    const paar=[gruppe(w,0,0,0),gruppe(w,0,0,0)];
    for(let i=0;i<n;i++){ const p=ort(i); lampe(paar[(i+(i>>2))%2],.08,farben[(i+s)%4],p[0],p[1],p[2]); }
    paar.forEach(verschmelze);
    k.anim.push(t=>{ paar[0].visible=Math.sin(t*1.9+s*2)>-.5; paar[1].visible=Math.sin(t*2.5+s+2)>-.4; }); });

  /* ---------- Gestelle und Maschinen an den Seitenwänden ---------- */
  const ls=gruppe(links,0,0,0), rs=gruppe(rechts,0,0,0);
  /* Pressluftflaschen */
  const fl=gruppe(ls,-17.05,0,8.8);
  box(fl,1.15,.18,2.4,NACHT,0,.09,0); [-.75,0,.75].forEach((z,i)=>{ const c=[GELB,TUERKIS,ORANGE][i]; walze(fl,.31,1.55,c,0,.95,z); ball(fl,.31,c,0,1.72,z,1,.7,1); walze(fl,.09,.22,METALL,0,1.98,z); ball(fl,.1,NACHT,0,2.12,z); reif(fl,.32,.04,WEISS,0,1.3,z); });
  box(fl,.1,.1,2.4,METALL2,.34,.75,0); [-1.17,1.17].forEach(z=>walze(fl,.06,.75,METALL2,.34,.45,z)); k.kasten(-17.05,8.8,1.25,2.45);
  /* Pumpe mit Rohrbögen */
  const pu=gruppe(ls,-16.9,0,-9.4);
  box(pu,1.5,.24,2.1,NACHT,0,.12,0); laengs(pu,.55,1.2,BLAU,0,.85,-.2); [-.8,.4].forEach(z=>laengs(pu,.62,.14,METALL,0,.85,z)); ball(pu,.45,MESSING,0,.85,.62,1,1,.6);
  ring(pu,.5,.12,ORANGE,-.1,1.35,-.2,Math.PI).rotation.y=Math.PI/2; uhr(pu,.22,.1,1.75,.3,.6); strich(pu,[.1,1.3,.3],[.1,1.6,.28],.05,METALL); k.kasten(-16.9,-9.4,1.6,2.15);
  /* Stromerzeuger rechts */
  const ge=gruppe(rs,17.0,0,1.9);
  box(ge,1.35,.2,2.4,NACHT,0,.1,0); box(ge,1.2,1.35,2.15,GRUEN,0,.87,0); box(ge,1.3,.12,2.25,METALL,0,1.6,0); for(let i=0;i<6;i++) box(ge,.05,.08,.85,NACHT,-.62,.45+i*.17,.55);
  ring(ge,.45,.06,METALL,-.64,.95,-.45).rotation.y=Math.PI/2; walze(ge,.14,.6,METALL2,0,1.9,.6); walze(ge,.2,.08,NACHT,0,2.22,.6); k.kasten(17.0,1.9,1.45,2.45);
  verschmelze(ls); verschmelze(rs);
  const rad=gruppe(rechts,16.34,.95,1.45); [0,1,2,3].forEach(i=>{ const b=box(rad,.04,.74,.14,GELB,0,0,0); b.rotation.x=i*Math.PI/4; }); ball(rad,.11,ROT,-.03,0,0); verschmelze(rad);
  k.anim.push(t=>{ rad.rotation.x=t*4; });

  /* ---------- Werkstatt-Ausstattung im Raum ---------- */
  const d=gruppe(sc,0,0,0);
  /* Werkbank mit Schraubstock */
  const wb=gruppe(d,-8.8,0,2.5);
  box(wb,3.0,.18,1.25,HOLZ,0,1.05,0); [-1.35,1.35].forEach(x=>[-.5,.5].forEach(z=>box(wb,.16,.96,.16,STAHL,x,.48,z))); box(wb,2.7,.1,.9,STAHL,0,.35,0);
  box(wb,.34,.16,.4,ROT,-1.0,1.22,.35); [-.1,.2].forEach(a=>box(wb,.3,.32,.12,ROT,-1.0,1.4,.35+a)); quer(wb,.035,.6,METALL,-1.0,1.34,.72);
  zahnrad(wb,.32,MESSING,.1,1.2,0).rotation.x=-Math.PI/2; zahnrad(wb,.2,STAHL,.6,1.18,.3).rotation.x=-Math.PI/2;
  box(wb,.85,.07,.13,METALL,.9,1.18,-.25).rotation.y=.5; ring(wb,.12,.05,METALL,1.32,1.2,-.48,Math.PI*1.5).rotation.x=Math.PI/2;
  quer(wb,.14,.8,TUERKIS,-.6,1.28,-.32); [-.95,-.25].forEach(x=>quer(wb,.17,.1,NACHT,x,1.28,-.32));
  [-.7,.1,.8].forEach((x,i)=>walze(wb,.2,.32,[ORANGE,BLAU,GELB][i],x,.56,0));
  k.kasten(-8.8,2.5,3.1,1.35);
  /* ausgebauter Motor auf einem Gestell */
  const mo=gruppe(d,-16.95,0,-6.1); mo.rotation.y=Math.PI/2; mo.scale.set(.55,.55,.55);
  [-.5,.5].forEach(z=>box(mo,2.3,.2,.2,GELB,0,.12,z)); [-.8,.8].forEach(x=>box(mo,.2,.34,1.2,NACHT,x,.35,0));
  quer(mo,.55,1.6,STAHL,0,.98,0); [-.55,-.25,.05,.35].forEach(x=>quer(mo,.62,.1,METALL,x,.98,0)); quer(mo,.4,.4,ORANGE,-1.0,.98,0); quer(mo,.14,.45,MESSING,1.0,.98,0); schraube(mo,.45,MESSING,1.25,.98,0).rotation.y=Math.PI/2;
  [-.3,.3].forEach(x=>{ walze(mo,.15,.4,ROT,x,1.62,0); ball(mo,.15,ROT,x,1.82,0,1,.6,1); }); strich(mo,[-.3,1.86,0],[.3,1.86,0],.05,NACHT);
  k.kasten(-16.95,-6.1,.75,1.55);
  /* Druckluftkessel vorn links */
  const kp=gruppe(d,-14.8,0,11.2);
  [-.7,.7].forEach(x=>box(kp,.26,.4,1.1,NACHT,x,.2,0)); quer(kp,.58,2.1,ROT,0,.92,0); [-1,1].forEach(v=>ball(kp,.58,ROT,v*1.05,.92,0,.4,1,1)); [-.55,.55].forEach(x=>quer(kp,.6,.09,METALL,x,.92,0));
  box(kp,.8,.4,.6,STAHL,-.3,1.65,0); uhr(kp,.26,.55,1.75,.1,-.8); strich(kp,[.55,1.4,.05],[.55,1.62,.05],.06,METALL); strich(kp,[.1,1.65,0],[.55,1.55,0],.06,MESSING);
  k.kasten(-14.8,11.2,2.65,1.35);
  /* Rohrverteiler mit Handrädern vorn */
  const rv2=gruppe(d,-3.2,0,11.7);
  box(rv2,2.9,.14,.8,NACHT,0,.07,0); quer(rv2,.2,2.7,TUERKIS,0,.45,0); [-1.35,1.35].forEach(x=>ball(rv2,.24,METALL,x,.45,0));
  [-.85,0,.85].forEach((x,i)=>{ walze(rv2,.11,.7,METALL,x,.78,0); const c=[ROT,GELB,ORANGE][i]; reif(rv2,.27,.055,c,x,1.18,0); [0,1].forEach(j=>{ box(rv2,.52,.05,.07,c,x,1.18,0).rotation.y=j*Math.PI/2+.5; }); ball(rv2,.08,METALL,x,1.22,0); });
  k.kasten(-3.2,11.7,2.95,.9);
  /* Rohrlager vorn rechts */
  const ro=gruppe(d,4.2,0,11.6);
  [-.85,.85].forEach(x=>{ box(ro,.2,.22,1.15,HOLZ2,x,.11,0); [-.55,.55].forEach(z=>box(ro,.2,.5,.1,HOLZ2,x,.4,z)); });
  [[-.28,.4,ORANGE],[.28,.4,TUERKIS],[0,.84,GELB]].forEach(([z,y,c])=>{ quer(ro,.24,2.6,c,0,y,z); [-1.3,1.3].forEach(x=>{ quer(ro,.27,.1,METALL,x,y,z); quer(ro,.15,.12,NACHT,x,y,z); }); });
  k.kasten(4.2,11.6,2.85,1.2);
  /* Fässer mit Schmieröl */
  [[15.1,11.5,BLAU],[16.5,11.0,GRUEN],[15.8,10.0,ORANGE]].forEach(([x,z,c])=>{ walze(d,.55,1.35,c,x,.68,z); [.1,.45,.95,1.34].forEach(y=>reif(d,.56,.04,METALL,x,y,z)); walze(d,.11,.07,NACHT,x+.22,1.39,z); k.kreis(x,z,.6); });
  /* Ersatz-Schraube auf einem Ständer */
  const es=gruppe(d,15.4,0,-9.6);
  walze(es,.75,.18,NACHT,0,.09,0); walze(es,.14,1.1,STAHL,0,.7,0); const ep=schraube(es,.9,MESSING,0,1.5,.1); ep.rotation.z=.15; k.kreis(15.4,-9.6,.9);
  /* Scheibenfilter mit Schlauchbögen rechts vorn */
  const fi=gruppe(d,14.6,0,5.2);
  box(fi,2.2,.2,1.1,NACHT,0,.1,0); [-.55,.55].forEach((x,i)=>{ walze(fi,.42,1.0,i?TUERKIS:LILA,x,.7,0); ball(fi,.42,METALL,x,1.2,0,1,.5,1); reif(fi,.43,.05,METALL,x,.5,0); }); ring(fi,.55,.09,METALL,0,1.3,0,Math.PI); lampe(fi,.09,0x7ae86a,-.55,.85,.43); lampe(fi,.09,0xffcf4a,.55,.85,.43);
  k.kasten(14.6,5.2,2.3,1.2);
  verschmelze(d);

  /* ---------- Bodenzier ---------- */
  const b=gruppe(sc,0,0,0);
  const flach=(r1,r2,c,x,y,z)=>{ const m=new THREE.Mesh(new THREE.RingGeometry(r1,r2,48),mat(c)); m.rotation.x=-Math.PI/2; m.position.set(x,y,z); m.receiveShadow=true; b.add(m); };
  /* Wendekreis in der Mitte */
  flach(4.1,4.35,GELB,-.2,.012,4.3); flach(3.65,3.75,0x2ac8c0,-.2,.021,4.3);
  for(let i=0;i<16;i++){ const a=i*Math.PI/8, t=box(b,.5,.016,.13,WEISS,-.2+Math.cos(a)*4.75,.012,4.3+Math.sin(a)*4.75); t.rotation.y=-a; }
  /* Pfeile zur Leiter */
  [-1.0,-2.4,-3.8,-5.2].forEach(z=>[-1,1].forEach(v=>{ const t=box(b,.8,.018,.18,GELB,TX+v*.28,.023+(v>0?.009:0),z); t.rotation.y=-v*.65; }));
  /* Leitlinien am Dock und Fahrspuren */
  [[-8.6,-1.5],[2.9,8.6]].forEach(([a,c])=>box(b,c-a,.016,.14,WEISS,(a+c)/2,.012,-6.95));
  [[-16,-.4,-12.2,-.4],[8.6,-1.6,15.8,-1.6],[-13.6,-11,-10,-11],[-12.6,12.7,-7,12.7],[6.8,12.8,13.2,12.8]].forEach(([x1,z1,x2],i)=>{ const l=x2-x1; box(b,l,.025,.34,NACHT,(x1+x2)/2,.014+i*.001,z1); [-.1,.1].forEach((a,j)=>box(b,l-.2,.012,.06,j?ORANGE:TUERKIS,(x1+x2)/2,.034,z1+a)); });
  /* Abflussgitter */
  [[-14.6,-1.6+3.4],[13.6,-.2],[-3.0,-3.9],[7.0,7.8],[-13.2,-9.0],[14.2,-6.9]].forEach(([x,z])=>{ box(b,1.7,.016,1.2,NACHT,x,.01,z); for(let i=0;i<5;i++) box(b,.11,.022,1.06,STAHL,x-.64+i*.32,.03,z); });
  verschmelze(b);
  /* Bodenleuchten, laufen zum Ausgang hin */
  const orte=[]; for(let z=11;z>-6;z-=1.35){ orte.push([-6.5+(z>0?-.4:0),z]); orte.push([5.6+(z>0?.2:0),z]); }
  const frei=orte.filter(p=>!((p[0]<0&&p[1]>-4.2&&p[1]<-1)||(p[0]>0&&p[1]>1&&p[1]<3.6)));
  const bl=[0,1,2].map(i=>{ const m=basis(0xffe27a), l=frei.filter((_,j)=>Math.floor(j/2)%3===i), im=new THREE.InstancedMesh(GEO.box,m,l.length);
    l.forEach((p,j)=>{ o.position.set(p[0],.035,p[1]); o.rotation.set(0,0,0); o.scale.set(.24,.05,.24); o.updateMatrix(); im.setMatrixAt(j,o.matrix); }); im.frustumCulled=false; sc.add(im); return m; });
  k.anim.push(t=>{ bl.forEach((m,i)=>m.color.setHex(Math.sin(t*3.2-i*2.09)>.3?0xfff6b0:0x9a7a20)); });
  const niet=new THREE.InstancedMesh(GEO.cyl,mat(0x4a6070),128);
  for(let i=0;i<128;i++){ o.position.set(-16.6+(i%16)*2.2+(Math.floor(i/16)%2)*.4,.004,-5.8+Math.floor(i/16)*2.6); o.rotation.set(0,0,0); o.scale.set(.07,.008,.07); o.updateMatrix(); niet.setMatrixAt(i,o.matrix); }
  niet.frustumCulled=false; sc.add(niet);

  /* ---------- Leben ---------- */
  putzroboter(k,[[-4.2,1.1],[3.8,1.1],[4.2,6.9],[-4.4,7.5]]);
  krabbe(k,[[3.2,-4.1],[7.8,-3.4],[8.0,-5.5],[3.4,-5.7]]);

  return { tuer, start:[-.2,6.2] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.2,-11.4],[-7.4,-6.6],[-13.2,-7.6],[-15.8,-4.2],[-15.6,2.6],[-8.8,.8],[-16.9,12.4],[-12,10.2],[-5.4,10.2],[1.2,11.6],
  [7.2,10.8],[13.2,11.6],[16,7.8],[13.8,2.8],[15.8,-.8],[13.2,-8.6],[15.4,-11.4],[2.9,-3.4],[-1.8,-5.2],[8.2,-1.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { wand:'hinten', x:11.9, z:-13.5, steh:[11.9,-11.4], kasten:[3.4,1.0], treffer:[3.4,3.4,.9], trefferY:.7, baue(g,k){ /* 1 Sonar-Bildschirm: runder grüner Schirm mit kreisendem Strahl */
      box(g,3.3,3.3,.34,0x3a4a5a,0,2.4,.17); box(g,3.45,.16,.44,ORANGE,0,4.07,.2); box(g,3.45,.16,.44,ORANGE,0,.74,.2);
      laengs(g,1.28,.1,0x06301c,0,2.62,.36); ring(g,1.32,.11,METALL,0,2.62,.42);
      const gm=basis(0x3ae07a); [.4,.78,1.14].forEach(r=>ring(g,r,.018,gm,0,2.62,.425)); feld(g,2.45,.028,.02,gm,0,2.62,.42); feld(g,.028,2.45,.02,gm,0,2.62,.421);
      const dreh=gruppe(g,0,2.62,.445);
      [[0,.45,.7],[.45,.45,.38],[.9,.5,.18]].forEach(([a,b,al])=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(1.2,12,a,b),durch(0x5aff9a,al)); dreh.add(m); });
      const punkte=[[.55,.5],[-.7,-.25],[.2,-.75]].map(([x,y])=>{ const m=durch(0xd8ffe0,1), p=ball(g,.085,m,x,2.62+y,.46,1,1,.4); p.castShadow=false; return {m,w:Math.atan2(y,x)}; });
      [[-1.2,ROT],[-.75,GELB],[-.3,GRUEN]].forEach(([x,c])=>{ laengs(g,.15,.14,METALL,x,1.05,.37); ball(g,.11,c,x,1.05,.46,1,1,.7); });
      [.55,1.15].forEach(x=>{ laengs(g,.18,.2,NACHT,x,1.05,.42); box(g,.05,.16,.03,WEISS,x,1.12,.535); });
      [-1,1].forEach(v=>[3.8,1.4].forEach(y=>ball(g,.1,MESSING,v*1.45,y,.36)));
      k.anim.push(t=>{ dreh.rotation.z=-t*1.8; punkte.forEach(p=>{ let d=(p.w+t*1.8)%(Math.PI*2); if(d<0) d+=Math.PI*2; p.m.opacity=Math.max(.15,1-d/5); }); }); } },
  { x:-10.2, z:-5.7, dreh:.18, steh:[-9.9,-3.6], kasten:[3.0,1.8], treffer:[3.0,2.8,1.8], baue(g,k){ /* 2 Steuerpult mit großem Hebel */
      box(g,2.8,.18,1.5,NACHT,0,.09,0); box(g,2.5,.95,1.2,0x8294a4,0,.65,0); [-1,1].forEach(v=>box(g,.2,1.15,1.35,ORANGE,v*1.32,.72,0)); feld(g,1.8,.1,.04,0x5ff0ff,0,.4,.62);
      for(let i=0;i<5;i++) box(g,1.4,.05,.05,NACHT,0,.6+i*.11,.61);
      const t=gruppe(g,0,1.25,.05); t.rotation.x=.42;
      box(t,2.5,.2,1.35,0xd2dee6,0,0,0); box(t,1.0,.05,.62,NACHT,-.55,.11,-.18);
      const sm=basis(0x3ae07a); feld(t,.86,.03,.48,0x0a3a24,-.55,.14,-.18); [.22,.38,.14,.3,.42,.2].forEach((l,i)=>feld(t,.07,.02,l,sm,-.88+i*.13,.165,.04-l/2));
      const knopf=[ROT,GELB,TUERKIS].map((c,i)=>{ const x=-.95+i*.42; walze(t,.15,.07,METALL2,x,.13,.4); const m=basis(c); ball(t,.12,m,x,.18,.4,1,.7,1); return {m,c,i}; });
      /* Hebel mit rotem Griff in einem Schlitz */
      box(t,.5,.06,1.1,METALL2,.68,.12,0); box(t,.13,.04,.9,NACHT,.68,.16,0);
      strich(g,[.68,1.38,0],[.82,2.42,-.28],.085,METALL); ball(g,.27,ROT,.84,2.54,-.31); ball(g,.07,0xff9a8a,.76,2.64,-.1); ball(g,.17,NACHT,.68,1.45,0,1,.7,1);
      [-.2,-.04].forEach(x=>{ const l=basis(0xffcf4a); ball(t,.08,l,x,.14,.42); knopf.push({m:l,c:0xffcf4a,i:3+x*9}); });
      k.anim.push(t2=>{ knopf.forEach(q=>q.m.color.setHex(Math.sin(t2*3+q.i*1.9)>-.2?q.c:0x4a4a40)); }); } },
  { x:-13.0, z:4.3, steh:[-10.9,5.1], r:1.3, treffer:[2.6,3.4,1.6], baue(g,k){ /* 3 Anker mit Kette: Ring, Querholz, runde Arme mit Schaufeln */
      walze(g,1.3,.2,0xd8c49a,0,.1,0); reif(g,1.22,.06,GELB,0,.22,0);
      const a=gruppe(g,0,0,0); a.rotation.y=.35;
      walze(a,.17,2.25,EISEN,0,1.58,0); ring(a,.3,.1,EISEN2,0,2.99,0); reif(a,.2,.06,MESSING,0,2.66,0);
      quer(a,.13,1.7,EISEN,0,2.3,0); [-1,1].forEach(v=>ball(a,.2,MESSING,v*.9,2.3,0));
      const arm=ring(a,.98,.17,EISEN,0,1.42,0,Math.PI*.78); arm.rotation.z=Math.PI*1.11;
      [-1,1].forEach(v=>{ const x=v*Math.cos(Math.PI*.11)*.98, y=1.42-Math.sin(Math.PI*.11)*.98; const s=ball(a,.38,EISEN2,x,y+.12,0,.72,1.1,.4); s.rotation.z=v*-.38; ball(a,.19,EISEN,x,y-.05,0); });
      ball(a,.25,MESSING,0,.45,0,1,.8,1);
      /* Kette vom Ring herunter zu einem Häufchen */
      const weg=[[.18,3.1,0],[.55,3.05,.08],[.85,2.75,.18],[1.0,2.3,.3],[1.05,1.8,.4],[1.08,1.3,.48],[1.05,.8,.52],[.9,.38,.62],[.55,.3,.82],[.12,.3,.92],[-.32,.3,.85],[-.62,.3,.55],[-.45,.32,.3]];
      let nr=0; for(let i=0;i<weg.length-1;i++){ const p=weg[i], q=weg[i+1], d=V(q[0]-p[0],q[1]-p[1],q[2]-p[2]), n=Math.max(1,Math.round(Math.hypot(q[0]-p[0],q[1]-p[1],q[2]-p[2])/.2));
        for(let j=0;j<n;j++){ const f=(j+.5)/n, gl=gruppe(a,p[0]+(q[0]-p[0])*f,p[1]+(q[1]-p[1])*f,p[2]+(q[2]-p[2])*f); gl.quaternion.setFromUnitVectors(V(1,0,0),V(q[0]-p[0],q[1]-p[1],q[2]-p[2]).normalize()); const l=ring(gl,.11,.038,METALL,0,0,0); l.scale.x=1.35; l.rotation.x=(nr++%2)*Math.PI/2; } }
      verschmelze(g); k.verdecker(g,-13.0,4.3,1.0); } },
  { x:-5.4, z:-2.6, steh:[-5.3,-.6], r:1.0, treffer:[2.1,2.9,1.8], baue(g,k){ /* 4 Scheinwerfer auf einem Stativ */
      [0,1,2].forEach(i=>{ const a=i*2.094-.5, x=Math.cos(a)*.85, z=Math.sin(a)*.85; strich(g,[x,.08,z],[0,1.05,0],.07,NACHT); ball(g,.12,GELB,x,.1,z); strich(g,[x*.55,.46,z*.55],[0,.55,0],.03,METALL); });
      walze(g,.09,.75,METALL,0,1.3,0); walze(g,.15,.14,GELB,0,1.12,0);
      const kopf=gruppe(g,0,2.1,0); kopf.rotation.y=.55;
      [-1,1].forEach(v=>{ strich(kopf,[v*.72,0,0],[v*.58,-.52,0],.06,NACHT); ball(kopf,.11,MESSING,v*.74,0,0); }); quer(kopf,.07,1.2,NACHT,0,-.52,0);
      laengs(kopf,.6,.75,ROT,0,0,-.05); ball(kopf,.6,ROT,0,0,-.42,1,1,.5); ring(kopf,.6,.09,METALL,0,0,.34); [-.3,-.12].forEach(z=>ring(kopf,.615,.025,NACHT,0,0,z));
      laengs(kopf,.52,.05,basis(0xfff6b8),0,0,.34); lampe(kopf,.17,0xffffff,0,0,.37).scale.z=.04;
      [-1,1].forEach(v=>{ const k2=box(kopf,1.0,.06,.42,NACHT,0,v*.72,.5); k2.rotation.x=-v*.45; });
      strich(g,[0,1.6,-.1],[-.35,.9,-.5],.03,NACHT); strich(g,[-.35,.9,-.5],[-.5,.05,-.7],.03,NACHT);
      const kg=new THREE.Mesh(new THREE.CylinderGeometry(.95,.5,1.5,24,1,true),durch(0xfff0a0,.15,true)); kg.rotation.x=Math.PI/2; kg.position.set(0,0,1.15); kopf.add(kg);
      const s=schein(kopf,'rgba(255,240,150,.75)',0,0,.48,1.5);
      const l=new THREE.PointLight(0xfff0b0,.55,7,1.5); l.position.set(.8,2.1,1.2); g.add(l);
      k.anim.push(t=>{ kg.material.opacity=.13+Math.sin(t*2.4)*.035; s.material.opacity=.8+Math.sin(t*5)*.15; }); } },
  { x:-9.7, z:9.0, steh:[-7.7,9.0], r:1.05, treffer:[2.1,3.0,2.1], baue(g,k){ /* 5 Boje: rot-weißer Schwimmkörper mit Korb und Blinklicht, auf einem Ring abgestellt */
      reif(g,.7,.14,NACHT,0,.16,0);
      ball(g,1.0,ROT,0,.86,0,1,.8,1);
      rohr(g,.93,1.025,.34,WEISS,0,1.1,0,32);
      rohr(g,.34,.8,.55,ROT,0,1.38,0,28); walze(g,.4,.14,METALL,0,1.68,0); reif(g,.99,.05,GELB,0,.86,0);
      [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.4; strich(g,[Math.cos(a)*.34,1.72,Math.sin(a)*.34],[Math.cos(a)*.24,2.42,Math.sin(a)*.24],.05,NACHT); });
      reif(g,.29,.05,NACHT,0,2.1,0); walze(g,.31,.09,NACHT,0,2.45,0); ring(g,.15,.045,MESSING,0,2.62,0);
      const m=basis(0xffd23a); lampe(g,.19,m,0,2.2,0);
      [-1,1].forEach(v=>ring(g,.14,.045,MESSING,v*1.03,.78,0).rotation.y=Math.PI/2);
      const s=schein(g,'rgba(255,215,60,.8)',0,2.2,0,1.5);
      k.anim.push(t=>{ const an=Math.sin(t*3.6)>0; m.color.setHex(an?0xfff08a:0x9a7410); s.material.opacity=an?.9:.08; }); } },
  { wand:'links', x:-18, z:-1.7, dreh:Math.PI/2, steh:[-16.1,-1.7], kasten:[.7,2.1], treffer:[2.0,2.9,.7], trefferY:.8, baue(g){ /* 6 Klemmbrett mit Startliste (nur Kästchen, Striche und Haken) */
      box(g,1.9,2.5,.14,HOLZ,0,2.15,.1); box(g,1.58,2.08,.04,0xfdfdf6,0,2.04,.195);
      [3.0,2.55,2.1,1.65,1.2].forEach((y,i)=>{ [[-.55,y+.11],[-.55,y-.11]].forEach(p=>box(g,.27,.04,.02,NACHT,p[0],p[1]-.07,.225)); [-.665,-.435].forEach(x=>box(g,.04,.24,.02,NACHT,x,y-.07,.226));
        box(g,.85-(i%2)*.2,.07,.02,0x6a8a9a,.13-(i%2)*.1,y,.225); box(g,.55+(i%3)*.12,.05,.02,0x9ab0bc,-.02+(i%3)*.06,y-.17,.225);
        if(i<3){ strich(g,[-.64,y-.05,.25],[-.56,y-.15,.25],.035,0x2aa84a); strich(g,[-.56,y-.15,.25],[-.36,y+.13,.25],.035,0x2aa84a); } });
      box(g,.9,.3,.16,METALL,0,3.26,.22); ring(g,.17,.05,METALL,0,3.45,.22,Math.PI); [-.28,.28].forEach(x=>ball(g,.07,NACHT,x,3.24,.31,1,1,.5));
      ball(g,.08,MESSING,0,3.62,.1); strich(g,[.8,3.2,.2],[1.08,2.7,.22],.018,NACHT); strich(g,[1.08,2.75,.24],[1.08,1.95,.24],.06,BLAU); kegel(g,.06,.16,0xf0d8a0,1.08,1.87,.24).rotation.z=Math.PI; ball(g,.065,ROT,1.08,2.78,.24); } },
  { x:16.9, z:-4.0, dreh:-Math.PI/2, steh:[15.1,-4.0], kasten:[1.35,3.4], treffer:[3.3,3.2,1.3], baue(g){ /* 7 Ersatzteil-Regal: Zahnräder, Schraube, Rohrstücke, Lampen */
      [-1.52,1.52].forEach(x=>[-.45,.45].forEach(z=>box(g,.13,2.95,.13,GELB,x,1.48,z)));
      [.3,1.28,2.26].forEach(y=>{ box(g,3.2,.1,1.05,METALL,0,y,0); box(g,3.2,.08,.06,STAHL,0,y-.07,.52); });
      strich(g,[-1.5,.35,-.47],[1.5,2.9,-.47],.035,STAHL); strich(g,[1.5,.35,-.47],[-1.5,2.9,-.47],.035,STAHL);
      /* unten: Rohrbögen und Walzen */
      [-1.05,-.5].forEach((x,i)=>{ ring(g,.24,.11,i?ORANGE:TUERKIS,x,.5,.05+i*.1,Math.PI); [-.24,.24].forEach(d=>walze(g,.14,.09,METALL2,x+d,.43,.05+i*.1)); });
      [.25,.75,1.2].forEach((x,i)=>{ walze(g,.2,.55,[ROT,BLAU,GRUEN][i],x,.63,0); walze(g,.12,.12,METALL2,x,.95,0); });
      /* Mitte: Zahnräder und Feder */
      zahnrad(g,.4,MESSING,-1.0,1.74,.05); zahnrad(g,.29,0xd8863a,-.3,1.64,.2); zahnrad(g,.21,STAHL,.2,1.56,.3);
      for(let i=0;i<7;i++) ring(g,.2,.04,METALL2,.62+i*.12,1.54,0).rotation.y=Math.PI/2+.2; quer(g,.07,1.05,NACHT,.98,1.54,0);
      /* oben: Schiffsschraube, Glühlampen, Dichtringe */
      schraube(g,.43,0xd8863a,-.95,2.76,.05); walze(g,.18,.08,NACHT,-.95,2.35,0);
      [-.05,.45].forEach(x=>{ walze(g,.12,.18,METALL2,x,2.4,.1); ball(g,.22,0xfff2a8,x,2.66,.1,1,1.15,1); });
      [0,1,2].forEach(i=>reif(g,.33-i*.04,.07,[NACHT,ROT,NACHT][i],1.07,2.38+i*.13,0)); } },
  { x:7.0, z:2.3, dreh:-.25, steh:[6.5,4.4], r:1.3, treffer:[2.4,2.5,1.8], baue(g){ /* 8 Holzkiste mit blauen, gerollten Bauplänen */
      box(g,2.0,.12,1.4,HOLZ2,0,.1,0);
      [-1,1].forEach(v=>{ box(g,2.0,1.0,.12,HOLZ,0,.62,v*.66); box(g,.12,1.0,1.2,HOLZ,v*.94,.62,0); [.2,1.08].forEach(y=>{ box(g,2.12,.15,.08,HOLZ2,0,y,v*.74); box(g,.08,.15,1.44,HOLZ2,v*1.03,y,0); }); [-1,1].forEach(s=>box(g,.17,1.07,.17,HOLZ2,v*.96,.61,s*.68)); });
      strich(g,[-.88,.22,.75],[.88,1.06,.75],.06,HOLZ2);
      const i0=x=>x>0?ROT:GELB;
      const rolle=(x,z,kx,kz,l,c)=>{ const r=gruppe(g,x,.35,z); r.rotation.set(kz,0,kx); walze(r,.18,l,c,0,l/2,0); [.0,.1].forEach((q,i)=>reif(r,.16-q,.02,WEISS,0,l+.012+i*.002,0)); ball(r,.035,WEISS,0,l+.02,0,1,.4,1); reif(r,.19,.025,WEISS,0,l-.16,0); reif(r,.192,.035,i0(x),0,l*.68,0); };
      rolle(-.55,-.15,.34,-.15,1.75,0x2f7fe0); rolle(-.15,.2,.1,.2,1.55,0x5aa8f8); rolle(.2,-.25,-.1,-.2,1.95,0x1f5ec0); rolle(.55,.18,-.35,.15,1.65,0x3f94ee); rolle(.02,-.05,-.02,.02,1.4,0x7ac0ff);
      /* ein halb entrollter Plan hängt über den vorderen Rand */
      const PB=0x2468cc;
      box(g,1.1,.035,.7,PB,-.08,1.2,.53); box(g,1.1,.9,.035,PB,-.08,.77,.87); quer(g,.1,1.16,PB,-.08,1.2,.17); quer(g,.11,1.16,0x5aa8f8,-.08,.3,.9); [-1,1].forEach(v=>quer(g,.045,.03,WEISS,-.08+v*.59,.3,.9));
      const li=(w,h,x,y)=>feld(g,w,h,.012,0xeaf6ff,-.08+x,y,.895);
      [-.49,.49].forEach(x=>li(.02,.74,x,.79)); [1.15,.43].forEach(y=>li(1.0,.02,0,y));
      li(.62,.025,-.02,.67); li(.025,.14,-.32,.73); li(.025,.14,.28,.73); li(.62,.025,-.02,.8); li(.24,.025,.02,.97); [-.09,.13].forEach(x=>li(.025,.17,x,.885)); [-.2,0,.2].forEach(x=>ring(g,.055,.012,basis(0xeaf6ff),-.08+x,.735,.9));
      [-.25,0,.25].forEach(x=>feld(g,.018,.012,.5,0xeaf6ff,-.08+x,1.224,.54)); feld(g,.9,.012,.018,0xeaf6ff,-.08,1.226,.62); } },
  { x:11.4, z:-5.9, dreh:-.55, steh:[10.9,-3.7], r:1.2, treffer:[2.2,2.6,1.9], baue(g){ /* 9 Schlauchtrommel: zwei rote Scheiben, gewickelter gelber Schlauch, Kurbel */
      [-.82,.82].forEach(x=>{ strich(g,[x,.08,.78],[x,1.25,0],.075,NACHT); strich(g,[x,.08,-.78],[x,1.25,0],.075,NACHT); box(g,.2,.12,1.9,NACHT,x,.07,0); });
      quer(g,.1,1.9,METALL,0,1.25,0);
      [-.62,.62].forEach(x=>{ ring(g,.88,.09,ROT,x,1.25,0).rotation.y=Math.PI/2; for(let i=0;i<3;i++){ const s=box(g,.07,1.7,.13,ROT,x,1.25,0); s.rotation.x=i*Math.PI/3; } quer(g,.24,.14,METALL2,x,1.25,0); });
      quer(g,.4,1.18,0x2a7a4a,0,1.25,0);
      for(let i=0;i<7;i++){ const x=-.48+i*.16; ring(g,.54,.095,i%2?0x3ac860:0x58e07a,x,1.25,0).rotation.y=Math.PI/2; }
      /* Kurbel */
      strich(g,[.9,1.25,0],[1.0,.82,.22],.05,METALL); strich(g,[1.0,.82,.22],[1.3,.82,.22],.065,GELB);
      /* loses Schlauchende mit Messingdüse */
      const w=[[-.32,.72,.1],[-.38,.35,.75],[-.55,.12,1.02],[.05,.11,1.15],[.5,.12,1.02]]; for(let i=0;i<w.length-1;i++){ strich(g,w[i],w[i+1],.095,0x3ac860); ball(g,.095,0x3ac860,w[i+1][0],w[i+1][1],w[i+1][2]); }
      quer(g,.13,.28,MESSING,.66,.14,.99); quer(g,.08,.22,MESSING,.88,.14,.96); quer(g,.1,.07,NACHT,1.0,.14,.945); } },
  { x:10.8, z:8.1, steh:[8.9,8.3], r:.95, treffer:[1.8,2.7,1.8], baue(g,k){ /* 10 Hocker mit großer Thermoskanne und Becher */
      [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78, x=Math.cos(a), z=Math.sin(a); strich(g,[x*.72,.05,z*.72],[x*.46,.98,z*.46],.09,HOLZ2); });
      reif(g,.6,.045,HOLZ2,0,.4,0); walze(g,.8,.18,HOLZ,0,1.07,0); reif(g,.79,.05,HOLZ2,0,1.07,0);
      const kx=-.18;
      walze(g,.33,.95,0xd8342a,kx,1.66,0); walze(g,.345,.12,METALL,kx,1.22,0); walze(g,.345,.1,METALL,kx,2.1,0); ball(g,.33,METALL,kx,2.15,0,1,.45,1); walze(g,.21,.27,NACHT,kx,2.4,0); walze(g,.23,.05,METALL,kx,2.54,0);
      ring(g,.3,.065,NACHT,kx-.34,1.68,0,Math.PI).rotation.z=Math.PI/2; [1.38,1.98].forEach(y=>strich(g,[kx-.28,y,0],[kx-.36,y,0],.065,NACHT));
      box(g,.09,.55,.04,0xff8a7a,kx+.1,1.68,.32);
      walze(g,.19,.34,WEISS,.42,1.33,.2); reif(g,.19,.025,BLAU,.42,1.5,.2); walze(g,.16,.02,0x8a5a30,.42,1.505,.2); ring(g,.11,.035,WEISS,.62,1.34,.2,Math.PI).rotation.z=-Math.PI/2;
      const dampf=[0,1,2].map(i=>{ const m=durch(0xffffff,.4), b=ball(g,.09,m,.42,1.65,.2); b.castShadow=false; return {b,m,i}; });
      k.anim.push(t=>{ dampf.forEach(q=>{ const a=(t*.4+q.i/3)%1; q.b.position.set(.42+Math.sin(t*2+q.i*2)*.09,1.6+a*.75,.2); const s=.06+a*.1; q.b.scale.set(s,s,s); q.m.opacity=.5*(1-a); }); }); } }
];

return { titel:'Die U-Boot-Garage', breite:36, tiefe:27, baue, gegenstaende, verstecke, oben:UW.OBEN };
})();

/* Schlussbild Unterwasserstation: sonniges Meer über Wasser. Erst steigen Blasen auf und es schimmert gelb, dann taucht das
   Mini-U-Boot mit Spritzern auf. Die Figur steht in der offenen Turmluke und winkt. Delfin Dori springt in Bögen, Krake Kiki winkt
   aus dem Wasser, Möwen fliegen, hinten schaukelt die Boje der Forschungsstation. Konfetti und Funken. */
FINALE3D.unterwasser = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  const HORIZONT=0xbfe4f8;
  sc.background=new THREE.Color(HORIZONT);
  sc.fog=new THREE.Fog(HORIZONT,32,92);
  sc.add(new THREE.HemisphereLight(0xeaf8ff,0x3a7890,.72));
  const licht=new THREE.DirectionalLight(0xfff2d0,.55); licht.position.set(8,18,12); licht.castShadow=true; licht.shadow.mapSize.set(1024,1024);
  const sk=licht.shadow.camera; sk.left=-12; sk.right=12; sk.top=12; sk.bottom=-10; sk.near=1; sk.far=50; licht.shadow.bias=-.001; sc.add(licht);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const GELB=UW.GELB, ORANGE=UW.ORANGE, ROT=UW.ROT, METALL=UW.METALL, METALL2=UW.METALL2, DUNKEL=UW.DUNKEL, MESSING=UW.MESSING, WEISS=UW.WEISS;

  /* ---------- Himmel: Kuppel mit Farbverlauf, wandert mit der Kamera ---------- */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#1f6cc8'); v.addColorStop(.36,'#3a92e0'); v.addColorStop(.43,'#6cbcf0'); v.addColorStop(.5,'#bfe4f8'); v.addColorStop(1,'#bfe4f8'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(95,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  /* Sonne mit Schein und Strahlen (Größe 1, wird passend zum Bild gesetzt) */
  const sonne=gruppe(sc,0,0,0); sonne.name='sonne';
  const sonnenKern=new THREE.Mesh(new THREE.CircleGeometry(1,32),basis(0xffe870,{fog:false})); sonne.add(sonnenKern);
  const strahlen=gruppe(sonne,0,0,-.05), strahlMat=basis(0xfff2a0,{fog:false,transparent:true,opacity:.75,depthWrite:false});
  for(let i=0;i<12;i++){ const a=i/12*6.2832, s=box(strahlen,.14,.55,.02,strahlMat,Math.cos(a)*1.5,Math.sin(a)*1.5,0); s.rotation.z=a-Math.PI/2; }
  ohneSchatten(sonne);
  const sonnenSchein=schein(sonne,'rgba(255,240,170,.8)',0,0,.1,5); sonnenSchein.material.fog=false;
  /* Wolken */
  const wolkeMat=basis(0xffffff,{fog:false}), wolkeUnten=basis(0xe2f1fc,{fog:false});
  const wolken=[[-.75,.7,66,1],[-.15,.86,72,.75],[.28,.55,70,.7],[.95,.78,64,.9],[-1.25,.5,74,.65]].map((p,i)=>{ const g=gruppe(sc,0,0,0);
    [[-1.1,0,.6],[-.4,.28,.85],[.45,.18,.75],[1.15,-.02,.52]].forEach(q=>ball(g,q[2],wolkeMat,q[0],q[1],0,1,.85,.5));
    ball(g,1,wolkeUnten,0,-.2,-.1,1.65,.36,.4);
    ohneSchatten(g); verschmelze(g); ohneSchatten(g); g.name='wolke';
    return { g, x:p[0], y:p[1], t:p[2], s:p[3], v:.012+(i%3)*.004 }; });

  /* ---------- Meer mit bewegten Wellen ---------- */
  const welle=(x,z,t)=>.15*Math.sin(x*.55+t*1.3)+.11*Math.sin(z*.8+t*1.7+x*.2)+.06*Math.sin((x+z)*1.4-t*2.2);
  const meerGeo=new THREE.PlaneGeometry(1,1,90,76), mp=meerGeo.attributes.position, NM=mp.count, grundX=new Float32Array(NM), grundZ=new Float32Array(NM), farben=new Float32Array(NM*3);
  /* Gitter in der Mitte fein, nach außen grob */
  for(let i=0;i<NM;i++){ const u=mp.getX(i)*2, s=-mp.getY(i)*2; grundX[i]=115*(.32*u+.68*u*u*u); grundZ[i]=s>0?45*(.5*s+.5*s*s*s):115*(.22*s+.78*s*s*s); }
  meerGeo.setAttribute('color',new THREE.BufferAttribute(farben,3));
  const meer=new THREE.Mesh(meerGeo,new THREE.MeshPhongMaterial({color:0xffffff,vertexColors:true,flatShading:true,shininess:70,specular:0x2a5a70,emissive:0x041c2a}));
  meer.frustumCulled=false; meer.name='meer'; sc.add(meer);
  const tief=new THREE.Color(0x0e5f96), hell=new THREE.Color(0x38b4d4);
  const wogen=t=>{ for(let i=0;i<NM;i++){ const x=grundX[i], z=grundZ[i], h=welle(x,z,t), u=Math.min(1,Math.max(0,(h+.26)/.54));
      mp.setXYZ(i,x,h,z); farben[i*3]=misch(tief.r,hell.r,u); farben[i*3+1]=misch(tief.g,hell.g,u); farben[i*3+2]=misch(tief.b,hell.b,u); }
    mp.needsUpdate=true; meerGeo.attributes.color.needsUpdate=true; };

  /* viele gleiche Kleinteile */
  const viele=(geo,m,n,fa)=>{ const t=new THREE.InstancedMesh(geo,m,n); if(fa) for(let i=0;i<n;i++) t.setColorAt(i,new THREE.Color(fa[i%fa.length])); t.frustumCulled=false; t.visible=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  /* Glitzern auf dem Wasser */
  const NG=70, glanz=viele(new THREE.OctahedronGeometry(1,0),basis(0xffffff),NG), gd=[];
  for(let i=0;i<NG;i++){ const z=-24+zufall()*27; gd.push({ x:(zufall()-.5)*38, z, p:zufall()*6.28, v:1.5+zufall()*2 }); }

  /* ---------- Boje der Forschungsstation mit Fischfahne ---------- */
  const boje=gruppe(sc,0,0,0), bt=gruppe(boje,0,0,0); boje.name='boje';
  walze(bt,.85,.5,ROT,0,.15,0); walze(bt,.87,.16,WEISS,0,.2,0); ball(bt,.6,ROT,0,.4,0,1,.8,1); walze(bt,.3,.4,WEISS,0,.95,0);
  strich(bt,[0,.9,0],[0,3.2,0],.07,METALL); ball(bt,.12,MESSING,0,3.22,0);
  const fahne=gruppe(boje,.06,2.65,0), ft=gruppe(fahne,0,0,0);
  box(ft,1.4,.85,.05,GELB,.72,0,0); ball(ft,.22,UW.BLAU,.68,0,.04,1.5,.9,.2); const fk=kegel(ft,.18,.28,UW.BLAU,1.1,0,.04); fk.rotation.z=Math.PI/2; fk.scale.z=.04; ball(ft,.045,WEISS,.5,.05,.1);
  verschmelze(bt); verschmelze(ft); ohneSchatten(boje);
  const bojenMat=basis(0xfff08a), bojenLampe=ball(boje,.16,bojenMat,0,1.25,.28); bojenLampe.castShadow=false;

  /* ---------- Mini-U-Boot (Bug nach +x) ---------- */
  const boot=gruppe(sc,0,-6,0); boot.name='uboot';
  const rumpf=gruppe(boot,0,0,0), RX=3.2, RY=1.3, RZ=1.35, MY=.75;
  ball(rumpf,1,GELB,0,MY,0,RX,RY,RZ);
  const quer=y=>Math.sqrt(1-y*y/(RY*RY));
  ball(rumpf,1,ORANGE,0,MY-.5,0,RX*quer(.5)+.06,.1,RZ*quer(.5)+.06);
  /* Bullaugen auf beiden Seiten, passend zur Rundung */
  [-1,1].forEach(seite=>[-1.55,-.35,.85].forEach(x=>{ const dy=.12, z=seite*RZ*Math.sqrt(1-x*x/(RX*RX)-dy*dy/(RY*RY));
    const n=V(x/(RX*RX),dy/(RY*RY),z/(RZ*RZ)).normalize(), f=gruppe(rumpf,x,MY+dy,z); f.quaternion.setFromUnitVectors(V(0,0,1),n);
    ball(f,.36,0x8adcff,0,0,0,1,1,.22); ring(f,.38,.085,METALL2,0,0,.05); ball(f,.09,basis(0xffffff),-.12,.13,.09,1.3,.8,.3); }));
  [-2.3,-.95,.25,1.6,2.35].forEach(x=>{ const dy=.55, z=RZ*Math.sqrt(Math.max(0,1-x*x/(RX*RX)-dy*dy/(RY*RY))); ball(rumpf,.06,MESSING,x,MY+dy,z); });
  /* Scheinwerfer am Bug, Heck mit Flossen */
  const lampe=walze(rumpf,.3,.3,METALL2,3.18,MY+.1,0); lampe.rotation.z=Math.PI/2; ball(rumpf,.23,basis(0xfff6c0),3.33,MY+.1,0,.6,1,1);
  box(rumpf,.75,1.15,.12,ORANGE,-2.85,MY+.7,0); box(rumpf,.75,.12,2.5,ORANGE,-2.75,MY+.05,0);
  const nabe=walze(rumpf,.22,.65,METALL2,-3.3,MY,0); nabe.rotation.z=Math.PI/2;
  /* offener Turm */
  const TOBEN=3.05;
  rohr(rumpf,.82,1.02,1.55,GELB,0,TOBEN-.775,0,28,true);
  const kragen=ring(rumpf,.83,.11,ORANGE,0,TOBEN,0); kragen.rotation.x=Math.PI/2;
  const band=ring(rumpf,.93,.06,METALL2,0,TOBEN-.65,0); band.rotation.x=Math.PI/2;
  walze(rumpf,.82,.05,DUNKEL,0,2.2,0);
  /* aufgeklappter Lukendeckel hinten links und Sehrohr */
  const deckel=gruppe(rumpf,-1.28,TOBEN+.5,-.15); deckel.rotation.z=.4;
  const platte=walze(deckel,.7,.13,ORANGE,0,0,0); platte.rotation.z=Math.PI/2; const dr=ring(deckel,.4,.06,METALL,-.1,0,0); dr.rotation.y=Math.PI/2;
  strich(rumpf,[-.85,TOBEN-.05,0],[-1.2,TOBEN+.2,-.12],.09,METALL2);
  strich(rumpf,[-.55,2.2,-.75],[-.55,4.45,-.75],.09,METALL2); strich(rumpf,[-.55,4.4,-.75],[-.1,4.4,-.75],.12,METALL2); ball(rumpf,.09,basis(0x8af0ff),-.02,4.4,-.75);
  verschmelze(rumpf);
  const schraube=gruppe(boot,-3.68,MY,0), st3=gruppe(schraube,0,0,0);
  ball(st3,.16,MESSING,0,0,0); for(let i=0;i<4;i++){ const f=gruppe(st3,0,0,0); f.rotation.x=i*Math.PI/2; const b=ball(f,.34,MESSING,0,.42,0,.16,1.2,.55); b.rotation.y=.5; }
  verschmelze(st3);

  /* Figur in der Luke (Beine und Bodenschatten ausgeblendet) */
  const u=figur.userData, FS=1.25;
  figur.children.forEach(c=>{ if(c!==u.koerper) c.visible=false; });
  u.beinL.visible=false; u.beinR.visible=false;
  figur.position.set(0,TOBEN-.74*FS,0); figur.scale.set(FS,FS,FS); boot.add(figur);

  /* gelber Schimmer unter Wasser und Schaum rund um das Boot */
  const schimmerMat=basis(0xffe050,{transparent:true,opacity:0,depthWrite:false});
  const schimmer=new THREE.Mesh(new THREE.CircleGeometry(1,40),schimmerMat); schimmer.rotation.x=-Math.PI/2; schimmer.position.y=.36; sc.add(schimmer);
  const schaumMat=basis(0xf2fcff,{transparent:true,opacity:0,depthWrite:false});
  const flachRing=(m,d)=>{ const r=new THREE.Mesh(new THREE.TorusGeometry(1,d,6,40),m); r.rotation.x=Math.PI/2; r.visible=false; sc.add(r); return r; };
  const saum=flachRing(schaumMat,.055); saum.scale.z=.8;
  const wellenRinge=[0,1,2].map(()=>{ const m=basis(0xe8faff,{transparent:true,opacity:0,depthWrite:false}); return { m, r:flachRing(m,.045) }; });

  /* ---------- Delfin Dori und Krake Kiki ---------- */
  const dori=UW.dori(sc,0,-5,0,1); dori.g.name='dori';
  const doriRinge=[0,1].map(()=>{ const m=basis(0xf2fcff,{transparent:true,opacity:0,depthWrite:false}); return { m, r:flachRing(m,.07) }; });
  const kikiPlatz=gruppe(sc,0,-5,0); kikiPlatz.name='kiki';
  UW.kiki(k,kikiPlatz,0,0,0,1);
  const kikiMat=basis(0xf2fcff,{transparent:true,opacity:0,depthWrite:false}), kikiRing=flachRing(kikiMat,.05);

  /* ---------- Möwen (Schnabel nach +x) ---------- */
  const moewen=[[0,.66,24,.34,.62,0],[1,.8,30,.27,.5,2.1],[2,.52,34,.22,.72,4.2],[3,.7,27,.3,.44,5.3]].map(p=>{
    const g=gruppe(sc,0,0,0), r=gruppe(g,0,0,0), lage=gruppe(r,0,0,0); g.name='moewe';
    ball(lage,.34,0xffffff,0,0,0,1.7,.8,.8); ball(lage,.22,0xffffff,.55,.13,0); const s=kegel(lage,.08,.3,ORANGE,.84,.1,0); s.rotation.z=-Math.PI/2;
    [-1,1].forEach(v=>ball(lage,.04,0x101418,.67,.19,v*.17)); const sw=kegel(lage,.18,.42,0xc4d2dc,-.66,.02,0); sw.rotation.z=Math.PI/2; sw.scale.z=.05;
    verschmelze(lage);
    const fluegel=[-1,1].map(v=>{ const f=gruppe(r,0,.08,v*.18), t=gruppe(f,0,0,0); ball(t,.5,0xffffff,0,0,v*.45,.55,.09,1); ball(t,.36,0xd0dce6,-.08,0,v*1.05,.45,.08,1); ball(t,.18,0x2a3440,-.14,0,v*1.38,.55,.12,1); verschmelze(t); return { f, v }; });
    ohneSchatten(g);
    return { g, r, fluegel, i:p[0], y:p[1], t:p[2], x:p[3], v:p[4], p:p[5] }; });

  /* ---------- Blasen, Spritzer, Funken, Konfetti ---------- */
  const NB=70, blasen=viele(GEO.sph,basis(0xeafcff,{transparent:true,opacity:.75,depthWrite:false}),NB), bd=[];
  for(let i=0;i<NB;i++){ const a=i*2.39996, r=Math.sqrt((i+.5)/NB); bd.push({ x:Math.cos(a)*r*3.6, z:Math.sin(a)*r*1.9, p:(i*.618)%1, g:.09+zufall()*.2 }); }
  const tropfenMat=basis(0xe4f8ff);
  const NS=170, spritz=viele(new THREE.OctahedronGeometry(1,0),tropfenMat,NS), sd=[];
  for(let i=0;i<NS;i++){ const a=i*2.39996; sd.push({ c:Math.cos(a), s:Math.sin(a), v:.5+zufall(), h:3.2+zufall()*5.2, p:zufall(), g:.07+zufall()*.11 }); }
  const ND=70, doriSpritz=viele(new THREE.OctahedronGeometry(1,0),tropfenMat,ND);
  const NK=24, kikiSpritz=viele(new THREE.OctahedronGeometry(1,0),tropfenMat,NK);
  const BUNT=[0xff4a5a,0x2f6fe8,0x28d060,0xffd22a,0xd06aff,0xff9a2a,0xff7ab8];
  const NF=46, funken=viele(new THREE.OctahedronGeometry(1,0),basis(0xffffff),NF,[0xffe45a,0xfff6b0,0xffb030,0xffffff]), fd=[];
  for(let i=0;i<NF;i++) fd.push({ a:i*2.39996, p:(i*.618)%1, r:.8+zufall()*.35, g:.07+zufall()*.08 });
  const NC=150, konf=viele(GEO.box,basis(0xffffff),NC,BUNT), kd=[];
  for(let i=0;i<NC;i++) kd.push({ x:zufall()*2-1, y:zufall()*2.4, z:-3+zufall()*5, v:.12+zufall()*.16, p:zufall()*6 });

  /* Blickrichtung der Kamera: leicht von oben */
  const NEIG=.14, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=1.9;
  /* Plätze je nach Bildformat: q=0 schmal (Dori und Kiki näher am Boot), q=1 breit */
  const plaetze=a=>{ const q=weich((a-1)/.8);
    return { q,
      kiki:{ x:misch(-2.7,-5.7,q), z:misch(3.5,1.5,q), s:misch(.85,1.15,q) },
      dori:{ x:misch(3,5.8,q), z:misch(-2.2,1.8,q), weit:misch(1.4,1.5,q), hoch:misch(4.5,2.9,q), s:misch(.75,.9,q) },
      boje:{ x:misch(-9.8,-10.5,q), z:misch(-15,-8,q) } }; };
  /* kleinster Kameraabstand, bei dem alle wichtigen Punkte im Bild sind */
  const abstand=(P,a,tn)=>{ const kx=P.kiki, d=P.dori, punkte=[
      [-4,.2,.9],[3.6,.3,1.2],[-3.6,3.7,-.4],[0,4.95,0],[.9,4.3,.2],[0,-.5,1.5],
      [kx.x-1.6*kx.s,0,kx.z],[kx.x+1.3*kx.s,0,kx.z+.8*kx.s],[kx.x,-.35,kx.z+1.1*kx.s],[kx.x,1.65*kx.s,kx.z],
      [d.x-d.weit-1.2*d.s,.2,d.z],[d.x+d.weit+1.2*d.s,.2,d.z],[d.x,d.hoch+.9*d.s,d.z]];
    return punkte.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hochB=Math.abs(Y*CN-p[2]*SN);
      return Math.max(m,Math.abs(p[0])/(.93*tn*a)+naeher,hochB/(.93*tn)+naeher); },8); };

  const AUF=1.6;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), P=plaetze(a), d=abstand(P,a,tn);
    const wippen=Math.sin(t*.23)*.25*weich((t-4)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);
    /* Punkt im Bild: x,y in Bildhälften, weg = Abstand von der Kamera */
    const imBild=(x,y,weg)=>[wippen*(1-weg/d)+x*weg*tn*a, ZIELY+d*SN-weg*SN+y*weg*tn*CN, d*CN-weg*CN-y*weg*tn*SN];

    /* Himmel */
    kuppel.position.copy(kamera.position);
    const sp=imBild(a<1.1?.62:.7,.72,60), sg=60*tn*Math.min(.13,a*.11); sonne.position.set(sp[0],sp[1],sp[2]); sonne.scale.set(sg,sg,sg); strahlen.rotation.z=t*.15;
    wolken.forEach(w=>{ let x=w.x+t*w.v; x=((x+1.4)%2.8+2.8)%2.8-1.4; const q=imBild(x,w.y,w.t), g=w.t*tn*.075*w.s*Math.min(1.25,Math.max(.7,a*.55)); w.g.position.set(q[0],q[1],q[2]); w.g.scale.set(g,g,g); });
    moewen.forEach(m=>{ const w=t*m.v+m.p, x=Math.sin(w)*(.32+m.i*.13)+(m.i-1.5)*.09, q=imBild(x,m.y+Math.sin(w*2.3)*.07,m.t), g=m.t*tn*.05*Math.min(1.2,Math.max(.75,a*.55));
      m.g.position.set(q[0],q[1],q[2]); m.g.scale.set(g,g,g); m.r.rotation.y=(Math.cos(w)>0?-.35:Math.PI+.35);
      const schlag=Math.sin(t*(6+m.i*.7)+m.p)*.5*(.55+.45*Math.sin(t*1.1+m.p)); m.fluegel.forEach(f=>f.f.rotation.x=-f.v*(schlag+.18)); });

    /* Meer */
    wogen(t);
    glanz.visible=true; gd.forEach((g,i)=>{ const s=Math.pow(Math.max(0,Math.sin(t*g.v+g.p)),6)*.14; setze(glanz,i,g.x,welle(g.x,g.z,t)+.06,g.z,s*1.8,s*.5,s); }); glanz.instanceMatrix.needsUpdate=true;
    boje.position.set(P.boje.x,welle(P.boje.x,P.boje.z,t)*.8,P.boje.z); boje.rotation.z=Math.sin(t*1.2)*.09; fahne.rotation.y=Math.sin(t*3)*.25; bojenMat.color.setHex((t*1.2)%1<.5?0xfff08a:0xff9a40);

    /* U-Boot: taucht auf, federt nach und schaukelt */
    const auf=Math.min(1,Math.max(0,(t-AUF)/1.2)), hub=1-Math.pow(1-auf,3), feder=t>AUF+1.2?Math.sin((t-AUF-1.2)*4.2)*.28*Math.exp(-(t-AUF-1.2)*1.5):0;
    boot.visible=t>AUF-.05;
    boot.position.y=-6*(1-hub)+feder+Math.sin(t*1.5)*.07*hub;
    boot.rotation.set(0,-.2,(1-hub)*.2+Math.sin(t*1.1)*.025*hub);
    schraube.rotation.x=t*5;
    schimmerMat.opacity=t<2.1?.45*weich(t/1.2)*(1-weich((t-1.7)/.4))*(.85+.15*Math.sin(t*9)):0; schimmer.visible=schimmerMat.opacity>.01; const sz=.5+weich(t/1.8); schimmer.scale.set(2.5*sz,1.3*sz,1);
    saum.visible=t>AUF+.3; schaumMat.opacity=.7*weich((t-AUF-.3)/.5); const at=1+Math.sin(t*2.4)*.035; saum.position.y=.14+Math.sin(t*1.9)*.06; saum.scale.set(3.35*at,1.6*at,1);
    wellenRinge.forEach((w,i)=>{ const alt=t-AUF-.35-i*.4, an=alt>0&&alt<2.2; w.r.visible=an; if(!an) return; const g=1+alt*1.8; w.r.position.y=.3-alt*.04; w.r.scale.set(3*g,1.5*g,1); w.m.opacity=.75*(1-alt/2.2); });

    /* Figur winkt, dann jubelt sie mit beiden Armen */
    const jubel=weich((Math.sin((t-5)*.9)-.2)/.5)*weich((t-5)/.5);
    figur.rotation.y=.2+Math.sin(t*.9)*.12;
    u.armR.rotation.x=0; u.armL.rotation.x=0;
    u.armR.rotation.z=2.4+Math.sin(t*7.5)*.38;
    u.armL.rotation.z=misch(-.3,-2.35+Math.sin(t*7.5+1.6)*.35,jubel);
    u.koerper.position.y=Math.abs(Math.sin(t*4))*.05; u.koerper.rotation.z=Math.sin(t*2.2)*.04;

    /* Blasen: erst viele über dem Boot, danach einige am Heck */
    blasen.visible=true;
    bd.forEach((b,i)=>{ const frueh=t<AUF+.9, u1=(t*(frueh?1.1:.6)+b.p)%1; let s, x=b.x, z=b.z, y;
      if(frueh){ s=b.g*weich(t/.5+.2-b.p*.4)*Math.sin(u1*Math.PI)*(1.2+weich(t/AUF)*.6)*(1-weich((t-AUF-.3)/.6)); y=welle(x,z,t)+.08+u1*(.25+b.g*2.2); }
      else { const an=i<22; s=an?b.g*.55*Math.sin(u1*Math.PI)*weich((t-AUF-1)/.8):0; x=-3.7-u1*1.5+b.x*.12; z=b.z*.4+.3; y=welle(x,z,t)+.07+u1*.2; }
      setze(blasen,i,x,y,z,s,s,s); });
    blasen.instanceMatrix.needsUpdate=true;

    /* großer Spritzer beim Auftauchen, danach tropft es vom Boot */
    spritz.visible=t>AUF+.2;
    if(spritz.visible){ sd.forEach((s,i)=>{ const alt=t-AUF-.25-s.p*.45; let x=0,y=-3,z=0,g=0;
        if(alt>0){ y=.2+s.h*alt-5.2*alt*alt; if(y>-.1){ x=s.c*(2.9+s.v*alt*2.2); z=s.s*(1.35+s.v*alt*1.1); g=s.g*(1+Math.max(0,.5-alt)); } }
        if(!g && i<26 && t>AUF+1.3){ const v=(t*.7+s.p)%1; x=s.c*2.7; z=Math.abs(s.s)*.5+.9; y=1.35-v*v*1.2; g=.045*(1-v*.5)*(1-weich((t-6)/3)*.6); }
        setze(spritz,i,x,y,z,g,g*1.5,g); });
      spritz.instanceMatrix.needsUpdate=true; }

    /* Dori springt in Bögen, abwechselnd nach links und rechts */
    const D=P.dori, TAKT=2.7, SPRUNG=2.2, ab=t-(AUF+1.1), nr=Math.floor(ab/TAKT), im=ab-nr*TAKT, richt=nr%2===0?1:-1, unten=.7*D.s;
    dori.g.visible=ab>=0&&im<SPRUNG;
    if(dori.g.visible){ const v=im/SPRUNG, y=-unten+(D.hoch+unten)*Math.sin(v*Math.PI), steig=Math.atan2((D.hoch+unten)*Math.PI*Math.cos(v*Math.PI),2*D.weit);
      dori.g.position.set(D.x+richt*D.weit*(2*v-1),y,D.z); dori.g.scale.set(D.s,D.s,D.s);
      dori.g.rotation.set(0,richt>0?-.15:Math.PI+.15,Math.max(-1.15,Math.min(1.15,steig))); dori.schwanz.rotation.z=Math.sin(t*10)*.3; }
    const eintritt=Math.asin(unten/(D.hoch+unten))/Math.PI;
    doriSpritz.visible=ab>=0;
    [eintritt,1-eintritt].forEach((v,j)=>{ const alt=ab<0?-1:im-v*SPRUNG, x0=D.x+richt*D.weit*(2*v-1), an=alt>0&&alt<.9, ri=doriRinge[j];
      ri.r.visible=an; if(an){ const g=.4+alt*1.7; ri.r.position.set(x0,welle(x0,D.z,t)+.08,D.z); ri.r.scale.set(g*D.s,g*D.s*.7,1); ri.m.opacity=.85*(1-alt/.9); }
      for(let i=0;i<ND/2;i++){ const s=sd[i*3+j], y=an?.15+s.h*.55*alt-4.6*alt*alt:-3, g=an&&y>0?s.g*.9:0; setze(doriSpritz,j*ND/2+i,x0+s.c*s.v*alt*1.3,y,D.z+s.s*s.v*alt*.8,g,g*1.4,g); } });
    doriSpritz.instanceMatrix.needsUpdate=true;

    /* Kiki taucht auf und winkt */
    const K=P.kiki, ka=Math.min(1,Math.max(0,(t-2.5)/.9)), kh=weich(ka), huepf=t>3.4?Math.sin((t-3.4)*5)*.2*Math.exp(-(t-3.4)*1.4):0;
    kikiPlatz.visible=t>2.45;
    kikiPlatz.position.set(K.x,misch(-3.4,-.6,kh)*K.s+huepf+welle(K.x,K.z,t)*.5,K.z); kikiPlatz.scale.set(K.s,K.s,K.s); kikiPlatz.rotation.set(0,.22+Math.sin(t*.8)*.14,Math.sin(t*1.4)*.05);
    kikiRing.visible=t>2.8; kikiRing.position.set(K.x,welle(K.x,K.z,t)*.6+.14,K.z); const kg=K.s*(1.05+Math.sin(t*2.7)*.07); kikiRing.scale.set(kg,kg*.85,1); kikiMat.opacity=.65*weich((t-2.8)/.5);
    const kalt=t-2.75; kikiSpritz.visible=kalt>0&&kalt<1.1;
    if(kikiSpritz.visible){ for(let i=0;i<NK;i++){ const s=sd[i*5], y=.2+s.h*.6*kalt-5*kalt*kalt, g=y>0?s.g:0; setze(kikiSpritz,i,K.x+s.c*(K.s*.8+kalt*s.v),y,K.z+s.s*(K.s*.6+kalt*s.v*.6),g,g*1.4,g); } kikiSpritz.instanceMatrix.needsUpdate=true; }

    /* Funken steigen rund um das Boot, Konfetti fällt */
    funken.visible=t>3;
    if(funken.visible){ fd.forEach((f,i)=>{ const v=(t*.3+f.p)%1, w=f.a+t*.25, s=f.g*Math.sin(v*Math.PI)*(.75+Math.sin(t*11+i)*.35)*weich((t-3)/.6);
        setze(funken,i,Math.cos(w)*4.1*f.r,.7+v*4.6,Math.sin(w)*1.9*f.r,s,s*1.6,s,0,t*3+i,0); }); funken.instanceMatrix.needsUpdate=true; }
    konf.visible=t>3.6;
    if(konf.visible){ const seit=t-3.6, gr=d*tn/4.6;
      kd.forEach((c,i)=>{ let y=1.15+c.y-seit*c.v*2.2; if(y<-1.2) y=1.15+((y+1.2)%2.4); const q=imBild(c.x+Math.sin(t*1.6+c.p)*.03,y,d-c.z); setze(konf,i,q[0],q[1],q[2],.11*gr,.022*gr,.075*gr,t*3+c.p,t*2+c.p,c.p); });
      konf.instanceMatrix.needsUpdate=true; }
  };
};

