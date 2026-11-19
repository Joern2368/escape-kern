document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-hufeisen\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\"><path d=\"M-10 15V0A10 10 0 0 1 10 0V15\" stroke-width=\"7\"/><path d=\"M-16 15H-5M5 15H16\" stroke-width=\"3\"/></g></symbol>\n<symbol id=\"sym-moehre\" viewBox=\"-20 -20 40 40\"><path d=\"M-5 -7Q3 -13 9 -4L-15 16Z\" fill=\"currentColor\"/><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M6 -8L7 -18M8 -6L16 -13M9 -6L18 -4\"/></g></symbol>\n<symbol id=\"sym-sattel\" viewBox=\"-20 -20 40 40\"><path d=\"M-17 1Q-15 -9 -7 -7Q0 -3 6 -7Q14 -12 17 -3Q15 6 0 6Q-13 6 -17 1Z\" fill=\"currentColor\"/><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M11 -9V-15M-2 6V13M-7 16H3\"/></g></symbol>\n<symbol id=\"sym-pferdekopf\" viewBox=\"-20 -20 40 40\"><path d=\"M-7 17L-9 2Q-11 -9 -4 -14L-2 -19L1 -13Q8 -12 14 -2Q17 3 13 6Q10 7 6 3Q2 2 4 17Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-strohballen\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"><rect x=\"-16\" y=\"-11\" width=\"32\" height=\"22\" rx=\"3\"/><path d=\"M-16 -3H16M-16 4H16\"/><path d=\"M-6 -11V11M6 -11V11\" stroke-width=\"4\"/></g></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${s?` stroke="${s}" stroke-width="${k}"`:''}/>`;
const P=(d,f,s,k)=>`<path d="${d}" fill="${f||'none'}"${s?` stroke="${s}" stroke-width="${k}"`:''}/>`;
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.3)"/>`;
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
</defs>`;
function boden(linien){let d='';if(linien){for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;}return`<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>${d?`<path d="${d}" stroke="rgba(0,0,0,.2)" stroke-width="2"/>`:''}`;}
function bretter(y0,y1,f,w){let d='';for(let x=w;x<1600;x+=w)d+=`M${x} ${y0}V${y1}`;return`${R(0,y0,1600,y1-y0,f)}<path d="${d}" stroke="rgba(0,0,0,.22)" stroke-width="3"/>`;}
function steine(y0,y1,h,w,f){let d='';for(let y=y0,r=0;y<y1;y+=h,r++){d+=`M0 ${y}H1600`;for(let x=(r%2)*w/2;x<1600;x+=w)d+=`M${x} ${y}V${Math.min(y+h,y1)}`;}return`<path d="${d}" stroke="${f}" stroke-width="2" fill="none"/>`;}
function laterne(x){return`<circle cx="${x}" cy="150" r="130" fill="url(#licht)"/><path d="M${x} 40V108" stroke="#222" stroke-width="3"/><path d="M${x-18} 112H${x+18}L${x} 96Z" fill="#333"/>${R(x-13,112,26,34,'#ffe9a0','#333',3)}`;}
function lampe(x,l,f){return`<circle cx="${x}" cy="${l+30}" r="110" fill="url(#licht)"/><path d="M${x} 0V${l}" stroke="#222" stroke-width="3"/><path d="M${x-30} ${l+26}Q${x} ${l-12} ${x+30} ${l+26}Z" fill="${f}" stroke="#222" stroke-width="2"/><ellipse cx="${x}" cy="${l+26}" rx="12" ry="5" fill="#fff3b0"/>`;}
function kopf(x,y,f){return`<g transform="translate(${x} ${y})">${P('M-14 0V-40Q-16 -60 0 -66Q18 -64 22 -40L30 -20Q32 -10 22 -8L14 -14V0Z',f,'#2a1608',2)}${P('M-6 -62L-2 -76L4 -64Z',f,'#2a1608',2)}<circle cx="8" cy="-44" r="3" fill="#111"/>${P('M-14 -58Q-22 -36 -14 -10','none','#2a1608',6)}</g>`;}
function pferd(f,m){return`${[-44,-30,30,44].map(x=>R(x-5,-72,10,66,f)+R(x-6,-8,12,8,'#222')).join('')}<ellipse cx="0" cy="-84" rx="60" ry="28" fill="${f}" stroke="#2a1608" stroke-width="2"/>${P('M30 -100L54 -150L74 -142L60 -92Z',f)}${P('M54 -152Q62 -166 74 -158L100 -124Q102 -114 92 -114L70 -126Z',f,'#2a1608',2)}${P('M60 -158L62 -174L68 -160Z',f,'#2a1608',2)}<circle cx="76" cy="-146" r="2.5" fill="#111"/>${P('M54 -154Q42 -124 30 -102','none',m,8)}${P('M-58 -92Q-82 -70 -70 -30','none',m,8)}`;}
function box(x,f){return`${R(x,190,200,280,'#2a1a10')}${f?kopf(x+100,300,f):''}${R(x,300,200,170,'#8a5a30','#4a2a14',4)}${P(`M${x} 300L${x+200} 470M${x+200} 300L${x} 470`,'none','#4a2a14',6)}${R(x-8,180,216,14,'#5a3a1c')}`;}
function fenster(x,y,w,h){return`<circle cx="${x+w/2}" cy="${y+h/2}" r="${w*1.6}" fill="url(#licht)"/>${R(x,y,w,h,'#bfe0f0','#5a3a1c',8)}${P(`M${x+w/2} ${y}V${y+h}M${x} ${y+h/2}H${x+w}`,'none','#5a3a1c',5)}`;}
function wandsattel(x,y,c){return`${P(`M${x-30} ${y}H${x+30}`,'none','#4a2a14',8)}${P(`M${x-36} ${y-4}Q${x-30} ${y-30} ${x-8} ${y-26}Q${x} ${y-20} ${x+10} ${y-28}Q${x+36} ${y-34} ${x+36} ${y-8}Q${x+20} ${y+4} ${x-36} ${y-4}Z`,c,'#2a1608',2)}${P(`M${x} ${y}V${y+40}M${x-8} ${y+44}H${x+8}`,'none','#aaa',3)}`;}
const krippe=()=>`${schatten(50,4)}${P('M-40 0V-40M40 0V-40','none','#5a3a1c',8)}${P('M-52 -70H52L42 -36H-42Z','#7a5230','#3a2210',3)}${P('M-48 -70Q-30 -90 -10 -74Q10 -94 30 -76Q44 -88 50 -70Z','#e8c860','#b8962a',2)}`;
const eimer=()=>`${schatten(30,4)}${P('M-24 -56L-18 0H18L24 -56Z','#4a7ab0','#24405e',3)}<ellipse cy="-56" rx="24" ry="7" fill="#9fd0f0" stroke="#24405e" stroke-width="2"/>${P('M-22 -56Q0 -96 22 -56','none','#555',3)}`;
const karre=()=>`${schatten(60,4)}<circle cx="-40" cy="-16" r="16" fill="#333" stroke="#111" stroke-width="3"/><circle cx="-40" cy="-16" r="5" fill="#888"/>${P('M-40 -16L50 -40M30 -36L36 0','none','#666',5)}${P('M-56 -70H34L20 -34H-44Z','#3f7a4a','#1f4a2a',3)}${P('M-52 -70Q-30 -92 -6 -76Q14 -96 32 -70Z','#e8c860')}${P('M30 -46L64 -56','none','#5a3a1c',6)}`;
const putzkiste=()=>`${schatten(46,4)}${R(-42,-40,84,40,'#c0392b','#6a1a12',3)}${P('M-20 -40V-60H20V-40','none','#6a1a12',5)}${R(-34,-54,18,14,'#8a5a2a')}${R(16,-52,20,12,'#e8c860')}<ellipse cx="-4" cy="-48" rx="10" ry="6" fill="#444"/>`;
const halfter=()=>`<circle cy="-50" r="6" fill="#555"/>${P('M0 -50V-36','none','#555',4)}${P('M-26 -30Q0 -44 26 -30L30 30Q0 50 -30 30Z','none','#2a6ab0',7)}${P('M-28 0H28','none','#2a6ab0',6)}<circle cy="40" r="7" fill="none" stroke="#c9a23a" stroke-width="4"/>${P('M0 47Q-10 70 6 90','none','#c9a23a',4)}`;
const stalltafel=()=>`${R(-80,-50,160,100,'#2a3a30','#6a4a24',6)}${P('M-64 -28H20M-64 -8H40M-64 12H10M-64 32H30','none','#e8e8d8',3)}<use href="#sym-hufeisen" x="34" y="-40" width="36" height="36" color="#e8e8d8"/>`;
const besen=()=>`${schatten(30,4)}${P('M0 -10L6 -170','none','#8a5a2a',6)}${P('M-28 0L-20 -20H22L30 0Z','#c9a23a','#8a6420',2)}${P('M-20 0V-18M-10 0V-18M0 0V-18M10 0V-18M20 0V-18','none','#8a6420',1)}`;
const tonne=()=>`${schatten(36,4)}${P('M-30 0Q-38 -45 -30 -90H30Q38 -45 30 0Z','#9a6a3a','#4a2a14',3)}${P('M-34 -20H34M-35 -70H35','none','#555',5)}<ellipse cy="-90" rx="30" ry="7" fill="#c9a86a" stroke="#4a2a14" stroke-width="2"/>`;
const sattelbock=()=>`${schatten(50,4)}${P('M-40 0L-20 -70M40 0L20 -70M-30 -30H30','none','#6a4a24',7)}${P('M-50 -66Q-44 -96 -16 -92Q0 -84 16 -94Q46 -104 50 -72Q40 -56 0 -58Q-40 -56 -50 -66Z','#7a3a1a','#3a1a0a',3)}${P('M-8 -60V-30','none','#3a1a0a',3)}${P('M-16 -30H0L-4 -20H-12Z','none','#aaa',3)}`;
const trensen=()=>`${R(-70,-56,140,12,'#5a3a1c')}${[-40,0,40].map(x=>`${P(`M${x} -44V-30M${x-14} -30Q${x} -40 ${x+14} -30L${x+12} 30Q${x} 40 ${x-12} 30Z`,'none','#7a4a20',4)}<circle cx="${x}" cy="40" r="6" fill="none" stroke="#bbb" stroke-width="3"/>`).join('')}`;
const spind=()=>`${schatten(56,4)}${R(-50,-170,100,168,'#5a7a6a','#2a3a30',3)}${P('M0 -168V-4','none','#2a3a30',3)}${[-150,-140,-130].map(y=>P(`M-40 ${y}H-10M10 ${y}H40`,'none','#2a3a30',2)).join('')}<circle cx="-8" cy="-80" r="3" fill="#ddd"/><circle cx="8" cy="-80" r="3" fill="#ddd"/>`;
const deckentruhe=()=>`${schatten(60,4)}${R(-56,-56,112,56,'#8a5a30','#3a2010',3)}${P('M-50 -58Q-30 -74 -10 -60Q10 -76 30 -60Q46 -70 52 -58Z','#c0392b')}${P('M-56 -58H56','none','#3a2010',6)}${R(-12,-44,24,14,'#c9a23a')}`;
const helmregal=()=>`${schatten(50,4)}${R(-46,-150,92,148,'none','#6a4a24',5)}${R(-46,-100,92,6,'#6a4a24')}${R(-46,-50,92,6,'#6a4a24')}${[[-20,-100,'#2a4a8a'],[20,-100,'#222'],[0,-50,'#b03a5a']].map(([x,y,c])=>`${P(`M${x-17} ${y}Q${x-17} ${y-30} ${x} ${y-30}Q${x+17} ${y-30} ${x+17} ${y}Z`,c)}${P(`M${x+6} ${y-2}H${x+22}`,'none',c,4)}`).join('')}`;
const schleifen=()=>`${R(-80,-46,160,92,'#e8dcc4','#6a4a24',5)}${[[-50,'#2a6ab0'],[-14,'#c0392b'],[22,'#e8c040'],[56,'#3f8a4a']].map(([x,c])=>`${P(`M${x-6} 0L${x-10} 34M${x+6} 0L${x+10} 34`,'none',c,7)}<circle cx="${x}" cy="-10" r="14" fill="${c}" stroke="#fff" stroke-width="3"/>`).join('')}`;
const stiefel=()=>`${schatten(40,4)}${[-18,18].map(x=>P(`M${x-10} -90H${x+8}V-16L${x+22} -10V0H${x-10}Z`,'#2a2018','#000',2)).join('')}`;
const schwaemme=()=>`${schatten(30,4)}${R(-20,-64,18,16,'#f0e060')}${R(2,-62,18,14,'#60a0e0')}${P('M-26 -50L-20 0H20L26 -50Z','#e8a030','#8a5a10',3)}${P('M-26 -50H26','none','#8a5a10',4)}`;
const heuballen=()=>`${schatten(80,4)}${[[-70,-44],[0,-44],[-36,-88]].map(([x,y])=>`${R(x,y,70,44,'#e0bc50','#a07a20',3)}${P(`M${x+20} ${y}V${y+44}M${x+50} ${y}V${y+44}`,'none','#a04a20',3)}`).join('')}`;
const seilrolle=()=>`${P('M-60 -60H60','none','#6a4a24',12)}<circle cy="-36" r="16" fill="#888" stroke="#444" stroke-width="4"/>${P('M0 -60V-52M-16 -36V60M16 -36V30','none','#c9a86a',4)}${P('M16 30Q16 46 28 46Q36 46 34 36','none','#666',5)}${R(-28,60,24,20,'#8a5a30')}`;
const katzenkorb=()=>`${schatten(46,4)}<ellipse cx="-6" cy="-40" rx="28" ry="12" fill="#e08a3a"/><circle cx="22" cy="-48" r="12" fill="#e08a3a"/>${P('M14 -56L16 -66L22 -58ZM26 -58L32 -66L32 -54Z','#e08a3a')}<circle cx="19" cy="-49" r="2" fill="#222"/><circle cx="27" cy="-49" r="2" fill="#222"/>${P('M-46 -34H46L38 0H-38Z','#b8865a','#6b4a24',3)}${P('M-44 -24H44M-42 -12H42','none','#6b4a24',2)}`;
const rechen=()=>`${schatten(30,4)}${P('M-6 0L10 -176','none','#8a5a2a',6)}${P('M-14 -176L34 -184','none','#6a4a24',7)}${[0,1,2,3,4,5].map(k=>P(`M${-10+k*8} ${-177-k*1.3}v14`,'none','#6a4a24',3)).join('')}`;
const saecke=()=>`${schatten(56,4)}${[[-24,'#d8c8a0'],[24,'#c8b088']].map(([x,c])=>`${P(`M${x-26} 0Q${x-32} -50 ${x-20} -76L${x-10} -84H${x+10}L${x+20} -76Q${x+32} -50 ${x+26} 0Z`,c,'#7a6a4a',3)}${P(`M${x-12} -78H${x+12}`,'none','#7a6a4a',3)}`).join('')}`;
const schwalbennest=()=>`${P('M-60 -30H60','none','#6a4a24',14)}${[-14,0,14].map(x=>`<circle cx="${x}" cy="-26" r="7" fill="#2a3a5a"/>${P(`M${x-4} -30L${x} -40L${x+4} -30Z`,'#f0c040')}`).join('')}${P('M-30 -22Q-30 20 0 22Q30 20 30 -22Z','#8a7050','#5a4030',3)}`;
const waage=()=>`${schatten(40,4)}${R(-40,-14,80,14,'#666','#333',2)}${P('M30 -14V-100','none','#555',6)}<circle cx="30" cy="-120" r="20" fill="#f4ecd8" stroke="#555" stroke-width="4"/>${P('M30 -120L40 -130','none','#c0392b',3)}${R(-34,-50,46,36,'#d8c8a0','#7a6a4a',2)}`;
const heuleiter=()=>`${schatten(36,4)}${P('M-24 0V-240M24 0V-240','none','#9a6a3a',8)}${[0,1,2,3,4,5,6].map(k=>P(`M-24 ${-26-k*32}H24`,'none','#9a6a3a',6)).join('')}`;
const sprung=()=>`${schatten(80,4)}${[-70,70].map(x=>R(x-6,-100,12,100,'#fff','#888',2)+R(x-14,-4,28,6,'#888')).join('')}${P('M-64 -70H64','none','#fff',8)}${P('M-64 -70H64','none','#c0392b',8).split('/>').join(' stroke-dasharray="16 16"/>')}${P('M-64 -36H64','none','#2a6ab0',7)}`;
const pony=()=>`${schatten(70,4)}<g transform="scale(.85)">${pferd('#d8d4cc','#8a8a8a')}${R(-24,-114,44,26,'#2a6ab0')}</g>`;
const tritt=()=>`${schatten(46,4)}${P('M-40 0V-30H-14V-60H12V-90H40V0Z','#3a6ab0','#1a3a6a',3)}`;
const huetchen=()=>`${schatten(50,4)}${[-30,0,30].map(x=>`${P(`M${x-14} 0L${x-3} -44H${x+3}L${x+14} 0Z`,'#f08030','#a04a10',2)}${P(`M${x-9} -18H${x+9}`,'none','#fff',5)}`).join('')}`;
const spiegel=()=>`${R(-70,-60,140,120,'#cfe0ea','#555',6)}${P('M-50 40L-10 -40M-20 50L30 -50','none','#fff',6)}`;
const bahntafel=()=>`${R(-80,-50,160,100,'#f4ecd8','#2a4a6a',5)}${R(-60,-34,120,68,'none','#8a6a3a',3)}${P('M-60 0Q-40 -34 -20 0T20 0T60 0','none','#c0392b',3)}<circle cx="-30" r="20" stroke="#2a6ab0" stroke-width="2" fill="none" stroke-dasharray="4 3"/>`;
const bahnschild=()=>`${schatten(24,4)}${R(-4,-70,8,70,'#fff','#888',1)}${R(-22,-108,44,40,'#fff','#2a4a6a',3)}<text x="0" y="-77" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" font-weight="bold" fill="#2a4a6a">E</text>`;
const bank=()=>`${schatten(70,4)}${P('M-56 0V-80M56 0V-80M-40 0V-36M40 0V-36','none','#4a2a14',6)}${R(-66,-46,132,10,'#8a5a30','#4a2a14',2)}${R(-66,-80,132,10,'#8a5a30','#4a2a14',2)}`;
const trog=()=>`${schatten(70,4)}${P('M-66 -50H66L56 0H-56Z','#8a9aa8','#3a4a58',3)}<ellipse cy="-50" rx="64" ry="8" fill="#6ab0e0"/>${P('M-50 -30H50','none','#6a7a88',2)}`;
const apfelkorb=()=>`${schatten(40,4)}${P('M-38 -40Q0 -100 38 -40','none','#6b4a24',5)}${[[-22,-46],[-4,-50],[14,-46],[28,-44],[-12,-58],[6,-60]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="#c83a2a" stroke="#7a1a10" stroke-width="1.5"/>`).join('')}${P('M-38 -40H38L30 0H-30Z','#b8865a','#6b4a24',3)}`;
const leckstein=()=>`${schatten(26,4)}${P('M0 0V-70','none','#6a4a24',8)}${R(-18,-100,36,30,'#e8e0f0','#8a8aa0',2)}${P('M-20 -70H20','none','#555',4)}`;
const stute=()=>`${schatten(100,4)}${pferd('#5a3a24','#1a1a1a')}<g transform="translate(-70 0) scale(.6)">${pferd('#c08a50','#6a4a24')}</g>`;
const vogelhaus=()=>`${P('M0 30V80','none','#6a4a24',8)}${R(-30,-16,60,50,'#e8c880','#7a5a2a',3)}${P('M-40 -14L0 -50L40 -14Z','#a0402a','#5a1a0a',3)}<circle cy="6" r="9" fill="#3a2a14"/><ellipse cx="26" cy="-40" rx="10" ry="7" fill="#3a6ab0"/><circle cx="34" cy="-46" r="5" fill="#3a6ab0"/>`;
const weideschild=()=>`${R(-70,-40,140,80,'#c9a86a','#6a4a24',5)}${P('M-50 -16H50M-50 4H40M-50 24H30','none','#5a3a1c',3)}`;
const heuraufe=()=>`${schatten(60,4)}${P('M-50 0V-100M50 0V-100','none','#6a4a24',8)}${P('M-54 -110Q-30 -132 0 -116Q30 -134 54 -110L46 -50H-46Z','#e0bc50','#a07a20',2)}${[0,1,2,3,4,5,6,7,8].map(k=>P(`M${-48+k*12} -110L${-40+k*10} -50`,'none','#6a4a24',3)).join('')}${P('M-56 -110H56M-46 -50H46','none','#6a4a24',6)}`;
const hufkiste=()=>`${schatten(46,4)}${R(-44,-40,88,40,'#4a4a50','#222',3)}${P('M-30 -40V-56H30V-40','none','#222',5)}<use href="#sym-hufeisen" x="-16" y="-34" width="32" height="28" color="#c9a23a"/>`;
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500;
let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="330" r="8" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>`;
const form='M410 470V190H590V470Z';
return`<defs><clipPath id="tuerclip"><path d="${form}"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#8a3a22"/><stop offset=".5" stop-color="#a84a2a"/><stop offset="1" stop-color="#7a301a"/></linearGradient></defs>
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Stalltür mit Zahlenschloss">
   <path d="M380 470V170H620V470Z" fill="#6a4a2a" stroke="#3a2410" stroke-width="5"/>
   <path d="M364 178L500 108L636 178Z" fill="#5a3a1c" stroke="#3a2410" stroke-width="4"/>
   <path d="${form}" fill="#120a04"/>
   <g clip-path="url(#tuerclip)"><g id="platte"><path d="${form}" fill="url(#platteG)"/><path d="M440 190V470M470 190V470M500 190V470M530 190V470M560 190V470" stroke="#5a2010" stroke-width="2"/><path d="M410 200H590V222H410ZM410 438H590V460H410Z" fill="#f4ecd8"/><path d="M418 222L582 438" stroke="#f4ecd8" stroke-width="20"/><use href="#sym-hufeisen" x="474" y="236" width="56" height="56" color="#d8a73a"/><rect x="${500-n*11-12}" y="312" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>${d}</g></g>
  </g></g>`;
}
SZENARIEN.pferdehof={
name:"Der Pferdehof",
symbole:["hufeisen","moehre","sattel","pferdekopf","strohballen"],
symbolNamen:["Hufeisen","Möhre","Sattel","Pferdekopf","Strohballen"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="60" cy="45" r="42" fill="#3f8a4a" stroke="#1f4a2a" stroke-width="3"/><use href="#sym-pferdekopf" x="26" y="8" width="66" height="66" color="#f4ecd8"/><use href="#sym-hufeisen" x="76" y="50" width="34" height="34" color="#d8a73a"/><use href="#sym-moehre" x="10" y="50" width="30" height="30" color="#f08030"/></svg>`,
texte:{
einleitung:"Ihr verbringt einen Ferientag auf dem Pferdehof Sonnenwiese. Kaum seid ihr in der Stallgasse, fällt die schwere Stalltür hinter euch zu! Die Reitlehrerin hat euch ein Rätselspiel vorbereitet: Jede Tür hat ein Zahlenschloss. Untersucht die Gegenstände in Stall, Sattelkammer und Reithalle. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis hinaus zu den Pferden?",
startKnopf:"Den Pferdehof betreten",
hinweisGeber:"Pony Flocke wiehert leise:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Pony Flocke schüttelt die Mähne … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Stalltür",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Stalltür bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Zeit zum Füttern!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Weg nach draußen trotzdem noch finden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg über den ganzen Pferdehof gefunden. Zur Belohnung bekommt Pony Flocke eine Möhre!"
},
texteDu:{
einleitung:"Du verbringst einen Ferientag auf dem Pferdehof Sonnenwiese. Kaum bist du in der Stallgasse, fällt die schwere Stalltür hinter dir zu! Die Reitlehrerin hat dir ein Rätselspiel vorbereitet: Jede Tür hat ein Zahlenschloss. Untersuche die Gegenstände in Stall, Sattelkammer und Reithalle. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis hinaus zu den Pferden?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Pony Flocke schüttelt die Mähne … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Stalltür bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Weg nach draußen trotzdem noch finden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg über den ganzen Pferdehof gefunden. Zur Belohnung bekommt Pony Flocke eine Möhre!"
},
einfach:{
name:"Der Pferdehof",
symbolNamen:["Hufeisen","Möhre","Sattel","Pferdekopf","Stroh"],
texte:{
einleitung:"Ihr seid auf einem Hof mit vielen Pferden. Plötzlich geht die Stalltür hinter euch zu! An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen zu den Pferden?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr seid draußen bei den Pferden! Das Pony bekommt eine Möhre."
},
texteDu:{
einleitung:"Du bist auf einem Hof mit vielen Pferden. Plötzlich geht die Stalltür hinter dir zu! An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen zu den Pferden?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du bist draußen bei den Pferden! Das Pony bekommt eine Möhre."
},
raeume:[
{titel:"Der Stall",intro:"Hier wohnen die Pferde. Jedes Pferd hat ein eigenes Zimmer. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[{name:"Futterkrippe",fund:"Im Heu liegt:"},{name:"Eimer mit Wasser",fund:"Am Eimer klebt:"},{name:"Schubkarre",fund:"Im Stroh liegt:"},{name:"Kiste mit Bürsten",fund:"Unter einer Bürste liegt:"},{name:"Halfter",fund:"Am Halfter hängt:"}],
infoObjekte:[{name:"Tafel im Stall",fund:"An der Tafel klebt:"},{name:"Besen",fund:"Am Besen hängt:"},{name:"Tonne mit Hafer",fund:"Im Hafer liegt:"}]},
{titel:"Der Raum für Sättel",intro:"Hier liegen die Sättel. Es riecht nach Leder. Findet die Zahlen für das nächste Schloss!",introDu:"Hier liegen die Sättel. Es riecht nach Leder. Finde die Zahlen für das nächste Schloss!",
objekte:[{name:"Sattel",fund:"Unter dem Sattel liegt:"},{name:"Zügel am Brett",fund:"Am Brett hängt:"},{name:"Schrank",fund:"Im Schrank liegt:"},{name:"Kiste mit Decken",fund:"Zwischen den Decken liegt:"},{name:"Regal mit Helmen",fund:"In einem Helm liegt:"}],
infoObjekte:[{name:"Brett mit Schleifen",fund:"Hinter einer Schleife steckt:"},{name:"Stiefel",fund:"Im Stiefel steckt:"},{name:"Eimer mit Schwämmen",fund:"Unter einem Schwamm liegt:"}]},
{titel:"Der Heuboden",intro:"Oben unter dem Dach liegt das Heu. Die Sonne scheint durch ein kleines Fenster. Eine Katze schläft im Korb.",
objekte:[{name:"Heuballen",fund:"Im Heu steckt:"},{name:"Seil am Balken",fund:"Am Seil hängt:"},{name:"Korb mit Katze",fund:"Neben der Katze liegt:"},{name:"Rechen",fund:"Am Rechen hängt:"},{name:"Säcke mit Futter",fund:"Zwischen den Säcken liegt:"}],
infoObjekte:[{name:"Vogelnest",fund:"Unter dem Nest klebt:"},{name:"Waage",fund:"Auf der Waage liegt:"},{name:"Leiter",fund:"Oben an der Leiter hängt:"}]},
{titel:"Die Reithalle",intro:"Das ist eine große Halle. Hier lernen Kinder reiten. Der Boden ist aus Sand.",
objekte:[{name:"Hindernis zum Springen",fund:"An der Stange hängt:"},{name:"Pony Flocke",fund:"Unter der Decke vom Pony steckt:"},{name:"Treppe zum Aufsteigen",fund:"Auf der Treppe liegt:"},{name:"Hütchen",fund:"Unter einem Hütchen liegt:"},{name:"Spiegel",fund:"Am Spiegel klebt:"}],
infoObjekte:[{name:"Tafel mit Wegen",fund:"An der Tafel klebt:"},{name:"Schild mit Buchstabe",fund:"Hinter dem Schild steckt:"},{name:"Bank",fund:"Unter der Bank liegt:"}]},
{titel:"Die Weide",intro:"Ihr seid draußen auf der Wiese. Die Pferde fressen Gras. Öffnet das letzte Schloss!",introDu:"Du bist draußen auf der Wiese. Die Pferde fressen Gras. Öffne das letzte Schloss!",
objekte:[{name:"Trog mit Wasser",fund:"Am Trog klebt:"},{name:"Korb mit Äpfeln",fund:"Unter den Äpfeln liegt:"},{name:"Stein zum Lecken",fund:"Am Stein klebt:"},{name:"Pferd mit Fohlen",fund:"Das Fohlen bringt dir etwas:"},{name:"Vogelhaus",fund:"Im Vogelhaus liegt:"}],
infoObjekte:[{name:"Schild an der Hütte",fund:"Hinter dem Schild steckt:"},{name:"Gestell mit Heu",fund:"Im Heu steckt:"},{name:"Kiste mit Werkzeug",fund:"In der Kiste liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Stallgasse",
intro:"Eine lange Stallgasse mit Pferdeboxen. Neugierige Pferde schauen über die Boxentüren. Laternen leuchten warm. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
tuerX:1300,
hintergrund:()=>`${defs('#8a8070','#3a342c','#ffd890')}<rect width="1600" height="470" fill="#e8dcc4"/>${steine(40,190,36,100,'rgba(120,90,60,.3)')}${R(0,0,1600,40,'#4a2a14')}${P('M0 70H1600','none','#5a3a1c',14)}${box(20,0)}${box(250,'#8a5a30')}${box(480,0)}${box(710,'#2a2018')}${box(940,'#e8e0d0')}${box(1450,'#c08a50')}${boden(1)}${laterne(240)}${laterne(1080)}`,
objekte:[
{name:"Futterkrippe",x:300,boden:600,fuss:4,by:-115,zeichne:krippe,fund:"Unter dem Heu in der Krippe liegt:"},
{name:"Wassereimer",x:650,boden:700,fuss:4,by:-120,zeichne:eimer,fund:"Am Henkel des Eimers hängt:"},
{name:"Schubkarre mit Stroh",x:1000,boden:620,fuss:4,by:-115,zeichne:karre,fund:"Im Stroh steckt:"},
{name:"Putzkiste",x:1450,boden:720,fuss:4,by:-85,zeichne:putzkiste,fund:"Zwischen Striegel und Bürste liegt:"},
{name:"Halfter am Haken",x:500,y:240,wand:true,by:-80,zeichne:halfter,fund:"Am Halfter baumelt:"}
],
infoObjekte:[{name:"Stalltafel",x:850,y:230,wand:true,by:-75,zeichne:stalltafel,fund:"An der Stalltafel klebt:"},{name:"Stallbesen",x:130,boden:740,fuss:4,by:-195,zeichne:besen,fund:"Am Besenstiel hängt:"},{name:"Hafertonne",x:1150,boden:730,fuss:4,by:-120,zeichne:tonne,fund:"Im Hafer liegt:"}]},
{titel:"Die Sattelkammer",
intro:"In der Sattelkammer hängen Sättel, Trensen und Decken ordentlich an der Wand. Es riecht nach Leder. Findet die Ziffern für das nächste Schloss!",
introDu:"In der Sattelkammer hängen Sättel, Trensen und Decken ordentlich an der Wand. Es riecht nach Leder. Finde die Ziffern für das nächste Schloss!",
tuerX:400,
hintergrund:()=>`${defs('#7a5a3a','#2e1e10','#ffe0a0')}${bretter(0,470,'#3a5a48',60)}${bretter(340,470,'#6b3f20',120)}${R(0,334,1600,10,'#2a1608')}${R(0,0,1600,36,'#2a1a10')}${fenster(845,150,110,130)}${wandsattel(170,260,'#7a3a1a')}${wandsattel(1300,280,'#4a2a14')}${wandsattel(1460,280,'#8a4a20')}${lampe(620,110,'#3f6a3a')}${lampe(1240,110,'#3f6a3a')}${boden(1)}`,
objekte:[
{name:"Sattel auf dem Sattelbock",x:900,boden:600,fuss:4,by:-128,zeichne:sattelbock,fund:"Unter dem Sattel liegt:"},
{name:"Trensen am Brett",x:700,y:230,wand:true,by:-80,zeichne:trensen,fund:"An einer Trense hängt:"},
{name:"Spind",x:1400,boden:570,fuss:4,by:-195,zeichne:spind,fund:"Im Spind liegt:"},
{name:"Truhe mit Satteldecken",x:1150,boden:720,fuss:4,by:-95,zeichne:deckentruhe,fund:"Zwischen den Satteldecken liegt:"},
{name:"Regal mit Reithelmen",x:180,boden:560,fuss:4,by:-175,zeichne:helmregal,fund:"In einem Reithelm liegt:"}
],
infoObjekte:[{name:"Brett mit Siegerschleifen",x:1100,y:230,wand:true,by:-72,zeichne:schleifen,fund:"Hinter einer Schleife steckt:"},{name:"Reitstiefel",x:620,boden:720,fuss:4,by:-115,zeichne:stiefel,fund:"Im Reitstiefel steckt:"},{name:"Eimer mit Schwämmen",x:420,boden:745,fuss:4,by:-90,zeichne:schwaemme,fund:"Unter einem Schwamm liegt:"}]},
{titel:"Der Heuboden",
intro:"Eine Leiter führt hinauf auf den Heuboden. Durch das runde Giebelfenster fällt ein Sonnenstrahl. Es duftet nach Heu, und die Stallkatze schläft in ihrem Korb.",
tuerX:1000,
hintergrund:()=>`${defs('#a07040','#4a2a14','#ffe8a0')}${bretter(0,470,'#c08a4a',80)}${P('M0 0H800L0 300ZM1600 0H800L1600 300Z','#4a2e18')}${P('M0 300L800 0L1600 300M200 225V470M1400 225V470','none','#3a2010',18)}<circle cx="800" cy="140" r="54" fill="#bfe0f0" stroke="#3a2010" stroke-width="10"/>${P('M800 86V194M746 140H854','none','#3a2010',5)}${P('M760 160H840L1100 470H520Z','#fff3c0').split('/>').join(' opacity=".18"/>')}${P('M0 470Q60 380 160 400Q240 360 330 470Z','#e0bc50','#b8962a',2)}${P('M1240 470Q1320 370 1420 390Q1520 350 1600 400V470Z','#e0bc50','#b8962a',2)}${boden(1)}`,
objekte:[
{name:"Heuballen",x:250,boden:580,fuss:4,by:-112,zeichne:heuballen,fund:"Zwischen den Heuballen steckt:"},
{name:"Seilrolle am Balken",x:500,y:200,wand:true,by:-90,zeichne:seilrolle,fund:"Am Seil hängt:"},
{name:"Katzenkorb",x:650,boden:720,fuss:4,by:-90,zeichne:katzenkorb,fund:"Neben der schlafenden Katze liegt:"},
{name:"Heurechen",x:1450,boden:600,fuss:4,by:-210,zeichne:rechen,fund:"Zwischen den Zinken hängt:"},
{name:"Futtersäcke",x:1200,boden:700,fuss:4,by:-108,zeichne:saecke,fund:"Zwischen den Futtersäcken liegt:"}
],
infoObjekte:[{name:"Schwalbennest",x:1300,y:210,wand:true,by:-62,zeichne:schwalbennest,fund:"Unter dem Schwalbennest klebt:"},{name:"Futterwaage",x:500,boden:600,fuss:4,by:-165,zeichne:waage,fund:"Auf der Futterwaage liegt:"},{name:"Leiter zum Heuboden",x:780,boden:560,fuss:4,by:-265,zeichne:heuleiter,fund:"An der obersten Sprosse hängt:"}]},
{titel:"Die Reithalle",
intro:"Die Reithalle ist riesig und hell. Der Boden ist aus weichem Sand. Hier üben Reiterinnen und Reiter mit ihren Pferden – heute wartet Pony Flocke auf euch.",
introDu:"Die Reithalle ist riesig und hell. Der Boden ist aus weichem Sand. Hier üben Reiterinnen und Reiter mit ihren Pferden – heute wartet Pony Flocke auf dich.",
tuerX:600,
hintergrund:()=>`${defs('#dcc08a','#a8884e','#fffbe8')}<rect width="1600" height="470" fill="#e8e0d0"/>${R(0,0,1600,60,'#7a5a3a')}${P('M0 60L200 0L400 60L600 0L800 60L1000 0L1200 60L1400 0L1600 60','none','#5a3a1c',8)}${[100,500,900,1300].map(x=>fenster(x,90,200,70)).join('')}${P('M0 360H1600V470H0Z','#9a6a3a')}${P([...Array(40)].map((_,k)=>`M${k*40} 360L${k*40+20} 470`).join(''),'none','rgba(0,0,0,.2)',3)}${R(0,352,1600,12,'#5a3a1c')}${boden(0)}<ellipse cx="800" cy="640" rx="700" ry="110" fill="none" stroke="rgba(120,80,40,.22)" stroke-width="34"/>${[...Array(40)].map((_,k)=>`<circle cx="${(k*397)%1600}" cy="${490+(k*131)%280}" r="3" fill="rgba(0,0,0,.12)"/>`).join('')}`,
objekte:[
{name:"Sprung mit Stangen",x:1000,boden:620,fuss:4,by:-125,zeichne:sprung,fund:"An der oberen Stange hängt:"},
{name:"Pony Flocke",x:1350,boden:650,fuss:4,by:-170,zeichne:pony,fund:"Unter der Satteldecke von Flocke steckt:"},
{name:"Aufstiegshilfe",x:820,boden:720,fuss:4,by:-115,zeichne:tritt,fund:"Auf der obersten Stufe liegt:"},
{name:"Hütchen",x:300,boden:700,fuss:4,by:-70,zeichne:huetchen,fund:"Unter einem Hütchen liegt:"},
{name:"Großer Spiegel",x:1050,y:230,wand:true,by:-85,zeichne:spiegel,fund:"Am Spiegelrahmen klebt:"}
],
infoObjekte:[{name:"Tafel mit Hufschlagfiguren",x:250,y:220,wand:true,by:-75,zeichne:bahntafel,fund:"An der Tafel klebt:"},{name:"Bahnschild mit Buchstabe",x:1520,boden:560,fuss:4,by:-132,zeichne:bahnschild,fund:"Hinter dem Bahnschild steckt:"},{name:"Zuschauerbank",x:150,boden:560,fuss:4,by:-105,zeichne:bank,fund:"Unter der Zuschauerbank liegt:"}]},
{titel:"Die Koppel",
intro:"Endlich draußen! Auf der Koppel grasen die Pferde in der Sonne. Ein Fohlen springt neben seiner Mutter umher. Öffnet das letzte Schloss, dann habt ihr es geschafft!",
introDu:"Endlich draußen! Auf der Koppel grasen die Pferde in der Sonne. Ein Fohlen springt neben seiner Mutter umher. Öffne das letzte Schloss, dann hast du es geschafft!",
tuerX:300,
hintergrund:()=>`${defs('#7ab84a','#3f7a2a','#fff8c0')}<linearGradient id="himmelK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ab4e8"/><stop offset="1" stop-color="#dff0f8"/></linearGradient><rect width="1600" height="470" fill="url(#himmelK)"/><circle cx="1480" cy="90" r="120" fill="url(#licht)"/><circle cx="1480" cy="90" r="46" fill="#fff3a0"/>${[[420,90],[1020,70]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="70" ry="22" fill="#fff"/><ellipse cx="${x+30}" cy="${y-14}" rx="40" ry="20" fill="#fff"/>`).join('')}${P('M0 400Q300 330 640 380T1200 360T1600 370V470H0Z','#8cc06a')}${R(100,170,400,300,'#a0402a')}${P('M120 170V470M180 170V470M240 170V470M360 170V470M420 170V470','none','rgba(0,0,0,.2)',3)}${P('M80 176L300 80L520 176Z','#5a3a2a')}${R(784,140,32,330,'#6a4a24')}${[[800,90,80],[740,130,50],[860,130,50]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#3f8a4a"/>`).join('')}${R(1120,200,360,270,'#7a5a3a')}${P('M1100 200L1300 130L1500 200Z','#5a3a2a')}${P('M1130 200V470M1470 200V470','none','#4a2a14',14)}${P('M500 410H1120M500 445H1120M1480 410H1600M1480 445H1600','none','#8a6a44',8)}${[540,640,740,860,960,1060,1540].map(x=>R(x-6,390,12,80,'#6a4a24')).join('')}${boden(0)}${[...Array(30)].map((_,k)=>{const x=(k*263)%1600,y=490+(k*97)%280;return P(`M${x-6} ${y}L${x-8} ${y-12}M${x} ${y}V${y-15}M${x+6} ${y}L${x+9} ${y-11}`,'none','#2f6a20',2);}).join('')}`,
objekte:[
{name:"Wassertrog",x:650,boden:640,fuss:4,by:-82,zeichne:trog,fund:"Am Rand des Wassertrogs klebt:"},
{name:"Apfelkorb",x:1000,boden:720,fuss:4,by:-95,zeichne:apfelkorb,fund:"Unter den Äpfeln liegt:"},
{name:"Leckstein",x:520,boden:740,fuss:4,by:-125,zeichne:leckstein,fund:"Am Halter des Lecksteins hängt:"},
{name:"Stute mit Fohlen",x:1100,boden:580,fuss:4,by:-198,zeichne:stute,fund:"Das Fohlen stupst dich an. Am Halfter hängt:"},
{name:"Vogelhäuschen",x:800,y:220,wand:true,by:-78,zeichne:vogelhaus,fund:"Im Vogelhäuschen liegt:"}
],
infoObjekte:[{name:"Weideschild",x:1250,y:280,wand:true,by:-65,zeichne:weideschild,fund:"Hinter dem Weideschild steckt:"},{name:"Heuraufe",x:1450,boden:620,fuss:4,by:-155,zeichne:heuraufe,fund:"Im Heu der Raufe steckt:"},{name:"Hufpflege-Kiste",x:150,boden:720,fuss:4,by:-82,zeichne:hufkiste,fund:"In der Hufpflege-Kiste liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a060"/><stop offset=".7" stop-color="#fbe0a0"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/><circle cx="700" cy="300" r="110" fill="#fff6c8" opacity=".4"/><circle cx="700" cy="300" r="60" fill="#fff6c8"/>
   <path d="M0 400Q200 340 420 380T1000 360V600H0Z" fill="#8cc06a"/><path d="M0 460Q300 420 600 470T1000 450V600H0Z" fill="#6aa04a"/>
   ${P('M200 420H800M200 445H800','none','#8a6a44',6)}${[240,360,480,600,720].map(x=>R(x-5,405,10,60,'#6a4a24')).join('')}
   <g transform="translate(380 520) scale(.9)">${pferd('#5a3a24','#1a1a1a')}</g><g transform="translate(600 540) scale(-.8 .8)">${pferd('#e8e0d0','#999')}</g><g transform="translate(500 545) scale(.5)">${pferd('#c08a50','#6a4a24')}</g>
   <path d="M0 0H1000V600H0Z M200 600V130H800V600Z" fill="#5a2a1a" fill-rule="evenodd"/><path d="M200 600V130H800V600" stroke="#f4ecd8" stroke-width="16" fill="none"/>`
};
})();