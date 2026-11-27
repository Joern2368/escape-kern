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
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer #leit{transform:scaleY(.02)}.tuer.offen #bl{transform:scaleX(.16)}.tuer.offen #lukd{transform:scaleY(.12)}.tuer.offen #leit{transform:scaleY(1)}.tuer.offen #hl{transform:scaleX(.14)}.tuer.offen #hr{transform:scaleX(.14)}.tuer.offen #hp{opacity:0}.tuer.offen #stor{transform:translateX(190px)}.tuer.offen #gat{transform:scaleX(.14)}</style>`;
function tuerBox(n){
return`<defs><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#8a3a22"/><stop offset=".5" stop-color="#a84a2a"/><stop offset="1" stop-color="#7a301a"/></linearGradient></defs>
   <path d="M380 470V170H620V470Z" fill="#6a4a2a" stroke="#3a2410" stroke-width="5"/>
   <path d="M364 178L500 108L636 178Z" fill="#5a3a1c" stroke="#3a2410" stroke-width="4"/>
   <rect x="410" y="190" width="180" height="280" fill="#120a04"/><circle cx="500" cy="330" r="90" fill="url(#licht)"/>${kopf(550,400,'#8a5a34')}
   <g id="bl" class="tb" style="transform-origin:410px 330px"><rect x="410" y="190" width="180" height="280" fill="url(#platteG)"/><path d="M440 190V470M470 190V470M500 190V470M530 190V470M560 190V470" stroke="#5a2010" stroke-width="2"/><path d="M410 200H590V222H410ZM410 438H590V460H410Z" fill="#f4ecd8"/><path d="M418 222L582 438" stroke="#f4ecd8" stroke-width="20"/><use href="#sym-hufeisen" x="474" y="236" width="56" height="56" color="#d8a73a"/><rect x="410" y="392" width="180" height="12" fill="#3a3a40"/>${sPl(n,330)}</g>`;
}
function tuerLuke(n){
const op='M400 150H600L630 215H370Z';
let r='';for(let y=215;y<470;y+=36)r+=`M455 ${y}H545`;
return`<path d="M350 128H650L690 238H310Z" fill="#6b4a24" stroke="#3a2410" stroke-width="4"/>
   <path d="${op}" fill="#0c0a14"/>
   <g id="leit" class="tb" style="transform-origin:500px 190px"><path d="M455 190V470M545 190V470" stroke="#a06a34" stroke-width="9"/><path d="${r}" stroke="#c08a50" stroke-width="7"/></g>
   <g id="lukd" class="tb" style="transform-origin:500px 150px"><path d="${op}" fill="#8a5a2c" stroke="#3a2010" stroke-width="4"/><path d="M440 150L420 215M480 150L470 215M520 150L530 215M560 150L580 215" stroke="#4a2a12" stroke-width="3"/><circle cx="500" cy="160" r="6" fill="none" stroke="#3a3a40" stroke-width="3"/>${sPl(n,190)}</g>`;
}
function tuerHeu(n){
let p='';for(let x=420;x<500;x+=20)p+=`M${x} 206V470`;
let q='';for(let x=520;x<598;x+=20)q+=`M${x} 206V470`;
return`<defs><linearGradient id="himmelH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec8f0"/><stop offset="1" stop-color="#f8ecc0"/></linearGradient></defs>
   <path d="M380 470V190H620V470Z" fill="#6a4a2a" stroke="#3a2410" stroke-width="5"/>
   <rect x="402" y="206" width="196" height="264" fill="url(#himmelH)"/><circle cx="460" cy="262" r="20" fill="#ffe066"/><path d="M402 400Q450 366 500 390T598 378V470H402Z" fill="#8cc06a"/><path d="M402 440H598M402 420H598" stroke="#8a6a44" stroke-width="4" fill="none"/>
   <rect x="370" y="150" width="260" height="20" fill="#6a4a24" stroke="#3a2410" stroke-width="3"/><path d="M500 170V198" stroke="#333" stroke-width="4"/><circle cx="500" cy="204" r="7" fill="none" stroke="#333" stroke-width="3"/>
   <g id="hl" class="tb" style="transform-origin:402px 330px"><rect x="402" y="206" width="98" height="264" fill="#b87a40" stroke="#4a2a12" stroke-width="3"/><path d="${p}" stroke="#7a4a20" stroke-width="3"/><path d="M402 206L500 470M402 470L500 206" stroke="#7a4a20" stroke-width="8"/></g>
   <g id="hr" class="tb" style="transform-origin:598px 330px"><rect x="500" y="206" width="98" height="264" fill="#b87a40" stroke="#4a2a12" stroke-width="3"/><path d="${q}" stroke="#7a4a20" stroke-width="3"/><path d="M500 206L598 470M500 470L598 206" stroke="#7a4a20" stroke-width="8"/></g>
   <g id="hp" class="tb">${sPl(n,330)}</g>`;
}
function tuerSchieb(n){
let p='';for(let x=430;x<590;x+=20)p+=`M${x} 190V470`;
return`<defs><linearGradient id="himmelS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0f0"/><stop offset="1" stop-color="#e8f4d8"/></linearGradient></defs>
   <path d="M376 470V170H624V470Z" fill="#5a4a3a" stroke="#2a1a10" stroke-width="5"/>
   <rect x="410" y="190" width="180" height="280" fill="url(#himmelS)"/><circle cx="540" cy="250" r="18" fill="#fff6c8"/><path d="M410 380Q470 340 530 372T590 360V470H410Z" fill="#8cc06a"/><path d="M410 430H590M410 408H590" stroke="#8a6a44" stroke-width="4" fill="none"/>
   <rect x="376" y="170" width="460" height="14" fill="#555566" stroke="#2a2a32" stroke-width="2"/>
   <g id="stor" class="tb"><circle cx="440" cy="188" r="7" fill="#333"/><circle cx="560" cy="188" r="7" fill="#333"/><rect x="410" y="190" width="180" height="280" fill="#3a7a60" stroke="#1a3a2a" stroke-width="4"/><path d="${p}" stroke="#2a5a46" stroke-width="3"/><path d="M410 190L590 470M410 470L590 190" stroke="#2a5a46" stroke-width="8"/>${sPl(n,330)}</g>`;
}
function tuerWeide(n){
const h='#b07a42';
return`<path d="M440 470L470 400H530L560 470Z" fill="#c8a870"/>
   <path d="M326 350H396M326 410H396M604 350H674M604 410H674" stroke="#8a6a44" stroke-width="8" fill="none"/>
   <rect x="326" y="334" width="14" height="136" fill="#7a5230" stroke="#3a2410" stroke-width="2"/><rect x="660" y="334" width="14" height="136" fill="#7a5230" stroke="#3a2410" stroke-width="2"/>
   <rect x="396" y="290" width="22" height="180" fill="#7a5230" stroke="#3a2410" stroke-width="3"/><rect x="582" y="290" width="22" height="180" fill="#7a5230" stroke="#3a2410" stroke-width="3"/><rect x="396" y="290" width="208" height="20" fill="#7a5230" stroke="#3a2410" stroke-width="3"/><use href="#sym-hufeisen" x="474" y="236" width="52" height="52" color="#d8a73a"/>
   <g id="gat" class="tb" style="transform-origin:418px 390px"><rect x="418" y="310" width="164" height="160" fill="none"/><path d="M418 324H582M418 364H582M418 404H582M418 444H582" stroke="${h}" stroke-width="14"/><path d="M418 450L582 322" stroke="${h}" stroke-width="12"/><rect x="418" y="310" width="14" height="160" fill="${h}"/><rect x="568" y="310" width="14" height="160" fill="${h}"/>${sPl(n,388)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'box';
const arten={box:[tuerBox,'Boxentür mit Zahlenschloss'],luke:[tuerLuke,'Deckenluke mit Zahlenschloss'],heu:[tuerHeu,'Heuklappe mit Zahlenschloss'],schieb:[tuerSchieb,'Schiebetor mit Zahlenschloss'],weide:[tuerWeide,'Weidetor mit Zahlenschloss']};
const a=arten[art]||arten.box;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.pferdehof={
name:"Der Pferdehof",
symbole:["hufeisen","moehre","sattel","pferdekopf","strohballen"],
symbolNamen:["Hufeisen","Möhre","Sattel","Pferdekopf","Strohballen"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="60" cy="45" r="42" fill="#3f8a4a" stroke="#1f4a2a" stroke-width="3"/><use href="#sym-pferdekopf" x="26" y="8" width="66" height="66" color="#f4ecd8"/><use href="#sym-hufeisen" x="76" y="50" width="34" height="34" color="#d8a73a"/><use href="#sym-moehre" x="10" y="50" width="30" height="30" color="#f08030"/></svg>`,
texte:{
einleitung:"Ihr verbringt einen Ferientag auf dem Pferdehof Sonnenwiese. Kaum seid ihr in der Stallgasse, fällt die schwere Stalltür hinter euch zu! Die Reitlehrerin hat euch ein Rätselspiel vorbereitet: Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände in Stall, Sattelkammer und Reithalle. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis hinaus zu den Pferden?",
startKnopf:"Den Pferdehof betreten",
hinweisGeber:"Pony Flocke wiehert leise:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Pony Flocke schüttelt die Mähne … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Zeit zum Füttern!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Weg nach draußen trotzdem noch finden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg über den ganzen Pferdehof gefunden. Zur Belohnung bekommt Pony Flocke eine Möhre!"
},
texteDu:{
einleitung:"Du verbringst einen Ferientag auf dem Pferdehof Sonnenwiese. Kaum bist du in der Stallgasse, fällt die schwere Stalltür hinter dir zu! Die Reitlehrerin hat dir ein Rätselspiel vorbereitet: Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände in Stall, Sattelkammer und Reithalle. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis hinaus zu den Pferden?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Pony Flocke schüttelt die Mähne … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Weg nach draußen trotzdem noch finden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg über den ganzen Pferdehof gefunden. Zur Belohnung bekommt Pony Flocke eine Möhre!"
},
einfach:{
name:"Der Pferdehof",
symbolNamen:["Hufeisen","Möhre","Sattel","Pferdekopf","Stroh"],
texte:{
einleitung:"Ihr seid auf einem Hof mit vielen Pferden. Plötzlich geht die Stalltür hinter euch zu! An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen zu den Pferden?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr seid draußen bei den Pferden! Das Pony bekommt eine Möhre."
},
texteDu:{
einleitung:"Du bist auf einem Hof mit vielen Pferden. Plötzlich geht die Stalltür hinter dir zu! An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen zu den Pferden?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du bist draußen bei den Pferden! Das Pony bekommt eine Möhre."
},
raeume:[
{titel:"Der Stall",intro:"Hier wohnen die Pferde. Jedes Pferd hat ein eigenes Zimmer. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[{name:"Futterkrippe",fund:"Im Heu liegt:"},{name:"Eimer mit Wasser",fund:"Am Eimer klebt:"},{name:"Schubkarre",fund:"Im Stroh liegt:"},{name:"Kiste mit Bürsten",fund:"Unter einer Bürste liegt:"},{name:"Halfter",fund:"Am Halfter hängt:"}],
infoObjekte:[{name:"Tafel im Stall",fund:"An der Tafel klebt:"},{name:"Besen",fund:"Am Besen hängt:"},{name:"Tonne mit Hafer",fund:"Im Hafer liegt:"}]},
{titel:"Der Raum für Sättel",intro:"Hier liegen die Sättel. Es riecht nach Leder. Findet die Zahlen für das Schloss an der Deckenluke!",introDu:"Hier liegen die Sättel. Es riecht nach Leder. Finde die Zahlen für das Schloss an der Deckenluke!",
objekte:[{name:"Sattel",fund:"Unter dem Sattel liegt:"},{name:"Zügel am Brett",fund:"Am Brett hängt:"},{name:"Schrank",fund:"Im Schrank liegt:"},{name:"Kiste mit Decken",fund:"Zwischen den Decken liegt:"},{name:"Regal mit Helmen",fund:"In einem Helm liegt:"}],
infoObjekte:[{name:"Brett mit Schleifen",fund:"Hinter einer Schleife steckt:"},{name:"Stiefel",fund:"Im Stiefel steckt:"},{name:"Eimer mit Schwämmen",fund:"Unter einem Schwamm liegt:"}]},
{titel:"Der Heuboden",intro:"Oben unter dem Dach liegt das Heu. Die Sonne scheint durch ein kleines Fenster. Eine Katze schläft im Korb.",
objekte:[{name:"Heuballen",fund:"Im Heu steckt:"},{name:"Seil am Balken",fund:"Am Seil hängt:"},{name:"Korb mit Katze",fund:"Neben der Katze liegt:"},{name:"Rechen",fund:"Am Rechen hängt:"},{name:"Säcke mit Futter",fund:"Zwischen den Säcken liegt:"}],
infoObjekte:[{name:"Vogelnest",fund:"Unter dem Nest klebt:"},{name:"Waage",fund:"Auf der Waage liegt:"},{name:"Leiter",fund:"Oben an der Leiter hängt:"}]},
{titel:"Die Reithalle",intro:"Das ist eine große Halle. Hier lernen Kinder reiten. Der Boden ist aus Sand.",
objekte:[{name:"Hindernis zum Springen",fund:"An der Stange hängt:"},{name:"Pony Flocke",fund:"Unter der Decke vom Pony steckt:"},{name:"Treppe zum Aufsteigen",fund:"Auf der Treppe liegt:"},{name:"Hütchen",fund:"Unter einem Hütchen liegt:"},{name:"Spiegel",fund:"Am Spiegel klebt:"}],
infoObjekte:[{name:"Tafel mit Wegen",fund:"An der Tafel klebt:"},{name:"Schild mit Buchstabe",fund:"Hinter dem Schild steckt:"},{name:"Bank",fund:"Unter der Bank liegt:"}]},
{titel:"Die Weide",intro:"Ihr seid draußen auf der Wiese. Die Pferde fressen Gras. Öffnet das Weidetor mit dem letzten Schloss!",introDu:"Du bist draußen auf der Wiese. Die Pferde fressen Gras. Öffne das Weidetor mit dem letzten Schloss!",
objekte:[{name:"Trog mit Wasser",fund:"Am Trog klebt:"},{name:"Korb mit Äpfeln",fund:"Unter den Äpfeln liegt:"},{name:"Stein zum Lecken",fund:"Am Stein klebt:"},{name:"Pferd mit Fohlen",fund:"Das Fohlen bringt dir etwas:"},{name:"Vogelhaus",fund:"Im Vogelhaus liegt:"}],
infoObjekte:[{name:"Schild an der Hütte",fund:"Hinter dem Schild steckt:"},{name:"Gestell mit Heu",fund:"Im Heu steckt:"},{name:"Kiste mit Werkzeug",fund:"In der Kiste liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Stallgasse",
intro:"Eine lange Stallgasse mit Pferdeboxen. Neugierige Pferde schauen über die Boxentüren. Laternen leuchten warm. Irgendwo hier sind die Ziffern für das Schloss an der Boxentür versteckt …",
tuerX:1300,tuerArt:"box",
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
intro:"In der Sattelkammer hängen Sättel, Trensen und Decken ordentlich an der Wand. Es riecht nach Leder. Findet die Ziffern für das Schloss an der Deckenluke!",
introDu:"In der Sattelkammer hängen Sättel, Trensen und Decken ordentlich an der Wand. Es riecht nach Leder. Finde die Ziffern für das Schloss an der Deckenluke!",
tuerX:400,tuerArt:"luke",
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
intro:"Eine Leiter führt hinauf auf den Heuboden. Durch das runde Giebelfenster fällt ein Sonnenstrahl. Es duftet nach Heu, und die Stallkatze schläft in ihrem Korb. Am großen Heutor hängt das nächste Schloss.",
tuerX:1000,tuerArt:"heu",
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
intro:"Die Reithalle ist riesig und hell. Der Boden ist aus weichem Sand. Hier üben Reiterinnen und Reiter mit ihren Pferden – heute wartet Pony Flocke auf euch. Das Schiebetor zur Weide hat ein Zahlenschloss.",
introDu:"Die Reithalle ist riesig und hell. Der Boden ist aus weichem Sand. Hier üben Reiterinnen und Reiter mit ihren Pferden – heute wartet Pony Flocke auf dich. Das Schiebetor zur Weide hat ein Zahlenschloss.",
tuerX:600,tuerArt:"schieb",
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
intro:"Endlich draußen! Auf der Koppel grasen die Pferde in der Sonne. Ein Fohlen springt neben seiner Mutter umher. Öffnet das Weidetor mit dem letzten Schloss, dann habt ihr es geschafft!",
introDu:"Endlich draußen! Auf der Koppel grasen die Pferde in der Sonne. Ein Fohlen springt neben seiner Mutter umher. Öffne das Weidetor mit dem letzten Schloss, dann hast du es geschafft!",
tuerX:300,tuerArt:"weide",
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
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f08a5a"/><stop offset=".6" stop-color="#fbd890"/><stop offset="1" stop-color="#fff0c0"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/><circle cx="700" cy="390" r="120" fill="#fff6c8" opacity=".35"/><circle cx="700" cy="390" r="64" fill="#ffe8a0"/>
   <path d="M0 400Q200 340 420 380T1000 360V600H0Z" fill="#8cc06a"/><path d="M0 460Q300 420 600 470T1000 450V600H0Z" fill="#6aa04a"/>
   ${P('M200 420H445M200 445H445M555 420H800M555 445H800','none','#8a6a44',6)}${[240,360,640,760].map(x=>R(x-5,405,10,60,'#6a4a24')).join('')}
   ${R(441,365,14,105,'#7a5230','#3a2410',3)}${R(545,365,14,105,'#7a5230','#3a2410',3)}${R(441,365,118,16,'#7a5230','#3a2410',3)}${P('M441 392L410 402V466L441 462Z','#b07a42','#6a4a24',3)}
   <g transform="translate(380 520) scale(.9)">${pferd('#5a3a24','#1a1a1a')}</g><g transform="translate(640 540) scale(-.8 .8)">${pferd('#e8e0d0','#999')}</g><g transform="translate(500 545) scale(.5)">${pferd('#c08a50','#6a4a24')}</g>
   <path d="M0 0H1000V600H0Z M200 600V130H800V600Z" fill="#5a2a1a" fill-rule="evenodd"/><path d="M200 600V130H800V600" stroke="#f4ecd8" stroke-width="16" fill="none"/>`
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
   PFERDEHOF in 3D: gemeinsame Bausteine für alle fünf Räume und das Schlussbild.
   Je Raum eine Datei pferdehof-raum<n>.js, die sich in RAEUME3D.pferdehof[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.pferdehof = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Stalluhr','An der Stalluhr klemmt:','Uhr','An der Uhr klemmt:'],['Schlauchrolle','Hinter der Schlauchrolle steckt:','Wasserschlauch','Beim Schlauch liegt:']],
  [['Waschbecken','Unter dem Waschbecken liegt:','Waschbecken','Beim Waschbecken liegt:'],['Werktisch mit Leder','Zwischen den Lederstücken liegt:','Tisch mit Leder','Auf dem Tisch liegt:']],
  [['Schaukelpferd','Am Schaukelpferd hängt:','Schaukelpferd','Am Schaukelpferd hängt:'],['Alter Schlitten','Auf dem Schlitten liegt:','Schlitten','Auf dem Schlitten liegt:']],
  [['Richtertisch mit Glocke','Unter der Glocke liegt:','Tisch mit Glocke','Unter der Glocke liegt:'],['Musikbox','Hinter der Musikbox klemmt:','Gerät für Musik','Beim Gerät liegt:']],
  [['Kleiner Traktor','Auf dem Sitz vom Traktor liegt:','Traktor','Auf dem Sitz liegt:'],['Vogelscheuche','Die Vogelscheuche hält etwas fest:','Vogelscheuche','Bei der Vogelscheuche liegt:']]
];
const SZP=SZENARIEN.pferdehof;
/* Bis Klasse 6: Die Einleitung nennt den Ausgang, wo das 2D-Szenario ihn nicht erwähnt */
if(SZP.einfach){ [[0,' Der Ausgang ist die Boxentür.'],[2,' Der Ausgang ist das große Heutor.'],[3,' Der Ausgang ist das große Schiebetor.']].forEach(([i,satz])=>{ const r=SZP.einfach.raeume[i]; if(r) ['intro','introDu'].forEach(k=>{ if(r[k]) r[k]=r[k]+satz; }); }); }
/* In 3D steht das Schild am Zaun, nicht an der Hütte */
if(SZP.einfach){ const r=SZP.einfach.raeume[4]; if(r && r.infoObjekte[0]) r.infoObjekte[0].name='Schild mit Hufeisen'; }
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZP.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZP.einfach) SZP.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const PH = (function(){
const HOLZ=0x9a6636, HOLZ2=0x6a3f1c, HOLZ3=0x442612, HELLHOLZ=0xc89a62, LEDER=0x8a4a20, LEDER2=0x5a2e14, STROH=0xe8c456, STROH2=0xc89c30, HEU=0xc8b84a,
  METALL=0x98a2aa, METALL2=0x50585e, EISEN=0x2c3034, GOLD=0xe8b830, MESSING=0xd0a040, ROT=0xb83a30, BLAU=0x3a6aa8, GRUEN=0x3f7a42, CREME=0xf4ecd6, SCHWARZ=0x1c140c, WEISS=0xfaf6ee, STEIN=0xa8a294, STEIN2=0x7a7466;
/* Fellfarben: [Fell, Mähne und Schweif] */
const FELL={ braun:[0x8a4e28,0x24160c], fuchs:[0xb4622a,0xd8924a], schimmel:[0xe8e2d6,0xa8a29a], rappe:[0x3a3230,0x141010], falbe:[0xd0a05a,0x5a3a20], palomino:[0xdca850,0xf6ecd0] };

/* ---------- Bilder (kachelbar) ---------- */
/* Dielenboden. grund = [r,g,b] */
function dielenBild(grund,fuge){
  const G=grund||[158,112,68];
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#3a2210'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ let x=-((r*97)%256); while(x<512){ const w=256, v=Math.floor(zufall()*26)-13;
      const mal=xx=>{ g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(xx+1,r*64+1,w-3,62);
        g.fillStyle='rgba(50,25,8,.16)'; for(let k=0;k<5;k++) g.fillRect(xx+6+((k*53)%90),r*64+10+k*11,110+((k*31)%90),2); };
      mal(x); if(x<0) mal(x+512); x+=w; } } });
}
/* senkrechte Bretterwand. grund = [r,g,b] */
function bretterBild(grund,fuge){
  const G=grund||[166,118,72];
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#3e2814'; g.fillRect(0,0,512,512);
    for(let i=0;i<10;i++){ const x=i*51.2, v=Math.floor(zufall()*22)-11; g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(x+2,0,48,512);
      g.fillStyle='rgba(60,34,12,.2)'; for(let j=0;j<7;j++) g.fillRect(x+8+zufall()*32,zufall()*420,2,50+zufall()*90);
      g.fillStyle='rgba(60,34,12,.35)'; g.beginPath(); g.ellipse(x+14+zufall()*24,40+zufall()*430,4,9,0,0,7); g.fill(); } });
}
/* Pflaster aus Steinen (Stallgasse). grund = [r,g,b] */
function pflasterBild(grund,fuge){
  const G=grund||[162,142,122];
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#5a4a3a'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ for(let s=-1;s<8;s++){ const x=s*73.14+(r%2)*36, v=Math.floor(zufall()*24)-12;
      const mal=xx=>{ g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(xx+3,r*64+3,67,58); g.fillStyle='rgba(255,245,225,.12)'; g.fillRect(xx+5,r*64+5,63,6); };
      mal(x); if(x<0) mal(x+512); if(x+73>512) mal(x-512); } }
    for(let i=0;i<120;i++){ g.fillStyle='rgba(224,186,80,.7)'; g.fillRect(zufall()*500,zufall()*500,2+zufall()*10,2); } });
}
/* Körniger Boden: Sand, Erde, Wiese. grund = CSS-Farbe, punkte = Liste von CSS-Farben, halme = true malt Grashalme */
function kornBild(grund,punkte,halme){
  const P=punkte||['rgba(255,240,200,.35)','rgba(120,80,30,.25)'];
  return bild(512,512,(g)=>{ g.fillStyle=grund||'#d8b878'; g.fillRect(0,0,512,512);
    for(let i=0;i<1400;i++){ g.fillStyle=P[i%P.length]; const x=zufall()*505, y=zufall()*495; if(halme) g.fillRect(x,y,2,5+zufall()*10); else g.fillRect(x,y,2+zufall()*4,2+zufall()*3); } });
}
/* flache Bildtafel (z. B. Plan, Poster), Blick nach +z */
function tafel(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
function mauer(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const quer=Math.max(w,d); t.repeat.set(quer/6,h/6); t.offset.set(((w>d?x-w/2:z-d/2)/6)%1,((y-h/2)/6)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* ---------- Innenraum: Licht, Boden, Wände (hinten, links, rechts, in den Wandgruppen, blenden beim Drehen aus), Holzsockel, Balken oben ----------
   opt: B,T,H, himmelLicht, grund, staerke, sonne, sonneStaerke, wandBild, bodenBild, bodenWdh [x,z], leiste (Farbe),
        sockel (Höhe der Holzvertäfelung, 0 = keine; Standard 1.3), sockelFarbe, oeffnung {x,b,h} (Loch in der Rückwand für den Ausgang) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6.4;
  sc.background=new THREE.Color(0x160e08);
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xfff0d6,opt.grund||0x54402a,opt.staerke||.76));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xffe8c0,opt.sonneStaerke||.42); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const platten=opt.bodenBild||dielenBild(); platten.wrapS=platten.wrapT=THREE.RepeatWrapping; const w=opt.bodenWdh||[B/8,T/8];
  const bodenM=new THREE.MeshLambertMaterial({map:platten});
  const flaeche=(x1,x2,z1,z2)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/.5)),Math.max(1,Math.round((z2-z1)/.5))), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,((x1+B/2)+uv.getX(i)*(x2-x1))/B*w[0],((T/2-z2)+uv.getY(i)*(z2-z1))/T*w[1]);
    const m=new THREE.Mesh(geo,bodenM); m.rotation.x=-Math.PI/2; m.position.set((x1+x2)/2,0,(z1+z2)/2); m.receiveShadow=true; sc.add(m); };
  flaeche(-B/2,B/2,-T/2,T/2);
  flaeche(-B/2-18,B/2+18,T/2,T/2+26); /* Boden läuft vorn weit weiter, damit beim Drehen keine dunkle Fläche entsteht */
  flaeche(-B/2-18,-B/2,-T/2,T/2); flaeche(B/2,B/2+18,-T/2,T/2);
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x261a0e)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);
  const tex=opt.wandBild||bretterBild(), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    mauer(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); mauer(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); if(H-o.h>.05) mauer(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else mauer(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  mauer(links,tex,.5,H,T,-B/2-.25,H/2,0); mauer(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.leiste||HOLZ2, sh=opt.sockel===undefined?1.3:opt.sockel, sf=opt.sockelFarbe||HOLZ, s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  box(s[0],B+1,.3,.72,f,0,H+.13,-T/2-.25);
  [-1,1].forEach((v,i)=>box(s[i+1],.72,.3,T+1,f,v*(B/2+.25),H+.13,0));
  if(sh>0){
    const stueck=(x1,x2)=>{ const br=x2-x1; if(br<.1) return; box(s[0],br,sh,.08,sf,(x1+x2)/2,sh/2,-T/2+.02); box(s[0],br,.14,.16,f,(x1+x2)/2,sh+.05,-T/2+.05);
      const n=Math.max(1,Math.round(br/2)); for(let i=0;i<n;i++) box(s[0],br/n-.4,sh-.45,.05,f,x1+(i+.5)*br/n,sh/2,-T/2+.07); };
    if(o){ stueck(-B/2,o.x-o.b/2); stueck(o.x+o.b/2,B/2); } else stueck(-B/2,B/2);
    [-1,1].forEach((v,i)=>{ box(s[i+1],.08,sh,T,sf,v*(B/2-.02),sh/2,0); box(s[i+1],.16,.14,T,f,v*(B/2-.05),sh+.05,0); const n=Math.round(T/2); for(let j=0;j<n;j++) box(s[i+1],.05,sh-.45,T/n-.4,f,v*(B/2-.07),sh/2,-T/2+(j+.5)*T/n); });
  }
  s.forEach(verschmelze);
  return { sc, B, T, H, hinten, links, rechts };
}
/* Zahlenschloss (golden, drei Felder), Blick nach +z */
function zahlenschloss(par,x,y,z){
  const g=gruppe(par,x,y,z); box(g,.9,.66,.22,GOLD,0,0,0); ring(g,.27,.075,0x9aa3ad,0,.33,0,Math.PI); [-.25,0,.25].forEach(v=>{ box(g,.2,.3,.04,0xfff3cf,v,-.02,.12); box(g,.045,.16,.02,0x2a1a08,v,-.02,.15); });
  return g;
}
/* Viele Halme, Steine, Blumen als eine Instanz-Gruppe. liste: [[x,y,z,sx,sy,sz,farbe,drehY,drehX,drehZ]], geo: GEO.sph / GEO.cone / GEO.box / GEO.cyl */
function viele(par,geo,liste){
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(e[8]||0,e[7]||0,e[9]||0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.receiveShadow=true; im.frustumCulled=false; par.add(im); return im;
}
/* lose Strohhalme flach auf dem Boden (Deko, kein Hindernis): Fleck um (x,z), Radius r, n Halme */
function halme(par,x,z,r,n){
  const L=[]; for(let i=0;i<n;i++){ const a=zufall()*6.28, d=Math.sqrt(zufall())*r; L.push([x+Math.cos(a)*d,.02+zufall()*.025,z+Math.sin(a)*d,.28+zufall()*.3,.012,.028,i%3?STROH:STROH2,zufall()*3.14]); }
  return viele(par,GEO.box,L);
}
/* rechteckiger Stroh- oder Heuballen mit zwei Schnüren, Fuß bei y, Breite b, Höhe h, Tiefe t. Hindernis selbst setzen */
function ballen(par,x,y,z,b,h,t,dreh,farbe){
  const g=gruppe(par,x,y,z), c=farbe||STROH, c2=c===STROH?STROH2:0x9c8e34; g.rotation.y=dreh||0;
  box(g,b,h,t,c,0,h/2,0);
  [-.27,.27].forEach(v=>box(g,.07,h+.03,t+.03,LEDER2,v*b,h/2,0));
  for(let i=0;i<22;i++){ const vorn=i%2?1:-1, m=box(g,.2+zufall()*.3,.025,.025,i%3?c2:0xf8dc80,(zufall()-.5)*(b-.4),zufall()*h*.9+.05,vorn*(t/2+.012)); m.rotation.z=(zufall()-.5)*.8; m.castShadow=false; }
  for(let i=0;i<14;i++){ const m=box(g,.2+zufall()*.3,.025,.03,i%3?c2:0xf8dc80,(zufall()-.5)*(b-.4),h+.012,(zufall()-.5)*(t-.2)); m.rotation.y=(zufall()-.5)*1.4; m.castShadow=false; }
  verschmelze(g); return g;
}
/* warme Stalllaterne, Mitte bei (x,y,z). Echtes Licht dafür sparsam mit flacker(...) */
function laterne(par,x,y,z){
  const g=gruppe(par,x,y,z); ring(g,.17,.03,EISEN,0,.52,0); kegel(g,.36,.26,EISEN,0,.33,0); walze(g,.28,.08,EISEN,0,-.26,0);
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>strich(g,[a*.19,-.24,b*.19],[a*.19,.22,b*.19],.022,EISEN));
  box(g,.3,.42,.3,basis(0xffe48a),0,-.01,0).castShadow=false; schein(g,'rgba(255,205,110,.55)',0,0,0,1.8); return g;
}
/* ---------- Pferd ---------- */
/* Hals mit Kopf. Drehpunkt = Halsansatz (0,0,0), Blick nach +x. Hals reicht etwa bis (0.7,1.0), das Maul bis etwa (1.45,0.75).
   o: { fell, maehne, blesse (true), halfter (Farbe) }. Rückgabe: { g, kopf, ohren } */
function halsKopf(par,x,y,z,o){
  o=o||{}; const F=o.fell===undefined?FELL.braun[0]:o.fell, M=o.maehne===undefined?FELL.braun[1]:o.maehne;
  const g=gruppe(par,x,y,z), teile=gruppe(g,0,0,0);
  const hals=rohr(teile,.2,.38,1.15,F,.3,.45,0,14); hals.rotation.z=-.6;
  ball(teile,.38,F,0,0,0,1,1,.8);
  /* Mähne entlang des Nackens */
  for(let i=0;i<7;i++){ const u=i/6; const m=ball(teile,.17,M,-.3+u*.76,.2+u*1.0,0,.75,1.15,.42); m.rotation.z=-.6+(i%2?.2:-.1); }
  verschmelze(teile);
  const kopf=gruppe(g,.7,1.02,0), k2=gruppe(kopf,0,0,0);
  ball(k2,.27,F,.02,.0,0,1.15,1,.9);
  strich(k2,[.05,-.02,0],[.55,-.28,0],.19,F);
  ball(k2,.2,o.blesse?0xe8b8a0:(F===FELL.schimmel[0]?0x8a807a:0x4a342a),.62,-.32,0,1.05,.95,1);
  if(o.blesse){ strich(k2,[.16,.215,0],[.58,-.12,0],.07,WEISS); }
  [-1,1].forEach(s=>{ ball(k2,.06,SCHWARZ,.19,.07,s*.215); ball(k2,.019,WEISS,.215,.095,s*.262); ball(k2,.038,SCHWARZ,.73,-.3,s*.13); });
  strich(k2,[.55,-.45,-.12],[.55,-.45,.12],.012,SCHWARZ);
  /* Schopf */
  ball(k2,.13,M,.07,.24,0,1.5,.55,.75); ball(k2,.09,M,.24,.19,0,1.3,.5,.6);
  if(o.halfter!==undefined){ const c=o.halfter;
    const r1=ring(k2,.215,.028,c,.45,-.23,0); r1.rotation.y=Math.PI/2; r1.rotation.x=-.45;
    [-1,1].forEach(s=>{ strich(k2,[.45,-.2,s*.215],[-.02,.12,s*.255],.026,c); ball(k2,.045,GOLD,.45,-.23,s*.225); });
  }
  verschmelze(k2);
  const ohren=[-1,1].map(s=>{ const q=gruppe(kopf,-.1,.23,s*.15); q.rotation.x=s*.22; const a=kegel(q,.095,.3,F,0,.13,0); a.scale.z=.06; const i=kegel(q,.05,.19,0xc8907a,.04,.11,0); i.scale.z=.035; return q; });
  return { g, kopf, ohren };
}
/* Ganzes Pferd, Blick nach +x, Füße bei y=0. Rücken etwa 2.0 hoch, Länge etwa 3, Kopf bis etwa 2.9. gr skaliert (Pony .75, Fohlen .55).
   o: { fell, maehne, blesse, halfter (Farbe), socken (true = weiße Fesseln), decke (Farbe, Satteldecke), sattel (true), grasen (true = Kopf am Boden),
        laeuft (true = Beine bewegen sich), ruhig (true = keine eigene Bewegung, z. B. fürs Schlussbild), phase }
   Rückgabe: { g, hals, kopf, beine[4], schweif, ohren }. Bleibt beweglich (userData.lebendig). Hindernis selbst setzen oder mit laeufer(k,p.g,...) laufen lassen */
function pferd(k,par,x,z,dreh,gr,o){
  o=o||{}; const F=o.fell===undefined?FELL.braun[0]:o.fell, M=o.maehne===undefined?FELL.braun[1]:o.maehne, ph=o.phase||0;
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0);
  ball(r,.56,F,0,1.52,0,1.55,.95,.86);
  ball(r,.5,F,.55,1.55,0,1,1.05,.9); ball(r,.56,F,-.58,1.58,0,1.02,1,.94);
  if(o.decke!==undefined){ ball(r,.575,o.decke,-.02,1.57,0,.82,.95,.89); box(r,.7,.1,1.03,o.decke,-.02,1.3,0); box(r,.74,.05,1.05,GOLD,-.02,1.25,0); }
  if(o.sattel){ ball(r,.3,LEDER,-.03,2.07,0,1.45,.36,1.1); ball(r,.11,LEDER,.32,2.12,0,.9,.85,1.15); ball(r,.14,LEDER,-.38,2.11,0,.75,.7,1.7); box(r,.07,.04,.5,GOLD,-.47,2.15,0);
    [-1,1].forEach(s=>{ box(r,.34,.46,.06,LEDER,-.02,1.76,s*.52); strich(r,[.05,1.65,s*.56],[.08,1.12,s*.57],.025,LEDER2); ring(r,.1,.025,METALL,.08,1.03,s*.57); }); }
  verschmelze(r);
  const beine=[[.66,.27],[.66,-.27],[-.68,.29],[-.68,-.29]].map(([a,c])=>{ const q=gruppe(g,a,1.3,c);
    strich(q,[0,.05,0],[.03,-.58,0],.14,F); ball(q,.115,F,.03,-.6,0); strich(q,[.03,-.6,0],[.02,-1.12,0],.085,F);
    if(o.socken) walze(q,.098,.3,WEISS,.022,-1.0,0);
    rohr(q,.1,.135,.17,0x2a2018,.04,-1.215,0,12); verschmelze(q); return q; });
  const hk=halsKopf(g,.78,1.68,0,{fell:F,maehne:M,blesse:o.blesse,halfter:o.halfter}), hals=hk.g;
  const grund=o.grasen?-1.9:0; hals.rotation.z=grund;
  const schweif=gruppe(g,-1.05,1.82,0);
  /* buschiger Schweif: Wurzel, drei auseinanderlaufende Strähnen mit spitzen Enden */
  ball(schweif,.13,M,-.06,-.02,0,1.2,1,.8); strich(schweif,[-.08,-.04,0],[-.32,-.42,0],.1,M); ball(schweif,.2,M,-.35,-.68,0,.75,1.7,.85);
  [-1,0,1].forEach(s=>{ strich(schweif,[-.28,-.36,s*.05],[-.4,-.95-(s?0:.1),s*.15],.07,M); const e=kegel(schweif,.085,.42,M,-.42,-1.14-(s?0:.1),s*.17); e.rotation.x=Math.PI+s*.12; });
  verschmelze(schweif);
  if(!o.ruhig) k.anim.push(t=>{ const u=t+ph;
    schweif.rotation.x=Math.sin(u*2.3)*.28*(.6+.4*Math.sin(u*.7));
    hals.rotation.z=grund+Math.sin(u*(o.grasen?2.2:.9))*(o.grasen?.07:.08);
    hk.ohren.forEach((e,i)=>e.rotation.z=Math.sin(u*3.1+i*2)>.85?.3:0);
    if(o.laeuft) beine.forEach((b,i)=>b.rotation.z=Math.sin(u*5+[0,3.14,3.14,0][i])*.4);
  });
  return { g, hals, kopf:hk.kopf, beine, schweif, ohren:hk.ohren };
}
return { HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER, LEDER2, STROH, STROH2, HEU, METALL, METALL2, EISEN, GOLD, MESSING, ROT, BLAU, GRUEN, CREME, SCHWARZ, WEISS, STEIN, STEIN2, FELL,
  dielenBild, bretterBild, pflasterBild, kornBild, tafel, mauer, huelle, zahlenschloss, viele, halme, ballen, laterne, halsKopf, pferd };
})();

/* Raum 1: Die Stallgasse. Warme, lange Stallgasse mit Pflasterboden: Pferdeboxen an der Rückwand und an beiden Seiten,
   nickende Pferde über den Halbtüren, Laternen, Balken, Heu auf den Brettern, Strohballen, Hühner, Katze und Mäuse.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Stalluhr) und 10 (Schlauchrolle) sind neu.
   Ausgang: die hohe rote Boxentür mit Zahlenschloss in der Rückwand schwingt nach hinten auf, dahinter ist es hell. */
RAEUME3D.pferdehof[0] = (function(){
const { HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER, LEDER2, STROH, STROH2, METALL, METALL2, EISEN, GOLD, MESSING, ROT, BLAU, GRUEN, CREME, SCHWARZ, WEISS, STEIN, STEIN2, FELL } = PH;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=6.4; /* Mitte des Ausgangs */
const ROT2=0x8a2a22, DUNKEL=0x24140a, BOX=0x7e5028, BOX2=0x5c3616;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const hell=m=>{ m.castShadow=false; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
function flaeche(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex})); m.position.set(x,y,z); par.add(m); return m; }

/* Heu: kantiger, dunkler Kern und viele Halme außen darauf. teile = [[x,y,z,Radius x,Höhe,Radius z,Anzahl]], Mitte y = Unterkante der Haube.
   Die Halme werden zu einer Instanz-Gruppe in par zusammengefasst. */
function heu(par,teile,ohneKern){
  const L=[], farben=[0xf8dc80,STROH,0xd8ac38,0xfce8a0,STROH2];
  teile.forEach(([x,y,z,a,h,c,n])=>{
    if(!ohneKern){ const kern=teil(par,new THREE.IcosahedronGeometry(1,0),0x9a741e,x,y,z,a*.9,h*.88,c*.9); kern.rotation.y=x*1.7; }
    for(let i=0;i<n;i++){ const az=i*2.39996+zufall()*.4, el=Math.asin(Math.min(.99,(i+.5)/n))+(zufall()-.5)*.12, r=1+zufall()*.1;
      const l=(.24+zufall()*.3)*Math.min(1,.45+a*.5);
      L.push([x+Math.cos(el)*Math.cos(az)*a*r, y+Math.max(.02,Math.sin(el))*h*r, z+Math.cos(el)*Math.sin(az)*c*r, l,.022,.028, farben[i%5],
        -az+(zufall()-.5)*1.5, 0, -(1.45-el)*.6+(zufall()-.5)*.8]); }
  });
  return PH.viele(par,GEO.box,L);
}

/* ---------- Bilder ---------- */
function draussenBild(){
  return bild(256,300,(g)=>{ const v=g.createLinearGradient(0,0,0,190); v.addColorStop(0,'#a8dcff'); v.addColorStop(1,'#fff8d8'); g.fillStyle=v; g.fillRect(0,0,256,300);
    g.fillStyle='#fffbe0'; g.beginPath(); g.arc(186,66,34,0,7); g.fill();
    g.fillStyle='#8ac860'; g.beginPath(); g.ellipse(60,214,150,52,0,0,7); g.fill(); g.fillStyle='#6cb04a'; g.beginPath(); g.ellipse(220,232,140,46,0,0,7); g.fill(); g.fillStyle='#7ec056'; g.fillRect(0,226,256,74);
    g.fillStyle='#f6ecd8'; for(let x=8;x<256;x+=34) g.fillRect(x,200,7,34); g.fillRect(0,208,256,5); g.fillRect(0,221,256,5);
    g.fillStyle='#e8d090'; g.beginPath(); g.moveTo(104,232); g.lineTo(152,232); g.lineTo(204,300); g.lineTo(52,300); g.fill(); });
}
function fensterBild(){
  return bild(128,112,(g)=>{ const v=g.createLinearGradient(0,0,0,112); v.addColorStop(0,'#8ac4f0'); v.addColorStop(1,'#ffe8b8'); g.fillStyle=v; g.fillRect(0,0,128,112);
    g.fillStyle='#fff'; [[34,30,16],[52,26,20],[70,32,14]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); });
    g.fillStyle='#6a9a48'; g.beginPath(); g.ellipse(40,120,76,34,0,0,7); g.fill(); g.fillStyle='#548438'; g.beginPath(); g.ellipse(112,122,56,28,0,0,7); g.fill(); });
}
function tafelBild(){
  return bild(384,256,(g)=>{ g.fillStyle='#24463a'; g.fillRect(0,0,384,256); g.fillStyle='rgba(255,255,255,.05)'; for(let i=0;i<30;i++) g.fillRect((i*71)%340,(i*47)%240,50,6);
    g.strokeStyle='#f2f2e4'; g.lineCap='round'; g.lineWidth=7;
    [[34,56,190],[34,100,226],[34,144,160],[34,188,206]].forEach(([x,y,l])=>{ g.beginPath(); g.arc(x,y,5,0,7); g.stroke(); g.beginPath(); g.moveTo(x+24,y); for(let a=24;a<l;a+=18) g.quadraticCurveTo(x+a+5,y-8,x+a+18,y); g.stroke(); });
    g.strokeStyle='#ffe27a'; g.lineWidth=16; g.beginPath(); g.arc(312,92,40,Math.PI*.75,Math.PI*2.25); g.stroke();
    g.fillStyle='#24463a'; [[284,118],[276,86],[292,62],[332,62],[348,86],[340,118]].forEach(([x,y])=>{ g.beginPath(); g.arc(x,y,4,0,7); g.fill(); });
    g.strokeStyle='#ff9a8a'; g.lineWidth=7; g.beginPath(); g.moveTo(282,190); g.lineTo(300,210); g.lineTo(344,166); g.stroke(); });
}
/* blasse Pferdekopf-Silhouette (Blick nach links), 200 Bildpunkte je Einheit */
function kopfBild(){
  return bild(480,580,(g)=>{ g.fillStyle='#f4e4bc'; g.fillRect(0,0,480,580);
    g.fillStyle='#d6b284'; g.beginPath(); g.moveTo(285,125); g.lineTo(272,42); g.lineTo(318,108); g.lineTo(352,40); g.lineTo(366,135);
    g.quadraticCurveTo(450,260,458,580); g.lineTo(285,580); g.quadraticCurveTo(335,440,300,355); g.quadraticCurveTo(270,410,200,396); g.lineTo(152,442);
    g.quadraticCurveTo(100,470,76,420); g.quadraticCurveTo(58,385,90,345); g.quadraticCurveTo(160,265,214,168); g.quadraticCurveTo(240,130,285,125); g.fill();
    /* Mähne */
    g.strokeStyle='#b08a5c'; g.lineCap='round'; g.lineWidth=17; [[356,128,408,168],[378,170,436,226],[398,222,456,296],[414,286,468,372],[424,360,472,452],[432,436,474,530]].forEach(([a,b,c,d])=>{ g.beginPath(); g.moveTo(a,b); g.quadraticCurveTo(c,b+10,c,d); g.stroke(); });
    g.fillStyle='#6a4a2c'; g.beginPath(); g.ellipse(258,200,13,9,-.7,0,7); g.fill(); g.beginPath(); g.ellipse(104,396,11,15,.7,0,7); g.fill();
    g.strokeStyle='#8a6844'; g.lineWidth=5; g.beginPath(); g.moveTo(92,428); g.quadraticCurveTo(120,436,142,420); g.stroke(); });
}
function zifferBild(){
  return bild(256,256,(g)=>{ g.fillStyle='#fdf7e6'; g.beginPath(); g.arc(128,128,127,0,7); g.fill(); g.fillStyle='#2a1a08'; g.textAlign='center'; g.textBaseline='middle'; g.font='700 31px Andika, Arial, sans-serif';
    for(let i=1;i<=12;i++){ const a=i*Math.PI/6; g.fillText(String(i),128+Math.sin(a)*94,128-Math.cos(a)*94); }
    for(let i=0;i<60;i++){ const a=i*Math.PI/30, s=i%5?3:6; g.fillRect(128+Math.sin(a)*117-s/2,128-Math.cos(a)*117-s/2,s,s); } });
}

/* ---------- Ausgang: die hohe Boxentür ---------- */
function baueAusgang(k,sc,hinten){
  /* Weg nach draußen hinter der Wand */
  const gang=gruppe(hinten,0,0,0);
  box(gang,3.7,.1,4.2,0xe0c078,AX,-.045,-15.6);
  [-1,1].forEach(s=>box(gang,.16,4.3,3.7,0xd8b880,AX+s*1.94,2.15,-15.85));
  flaeche(gang,draussenBild(),4.05,4.4,AX,2.2,-17.68);
  verschmelze(gang); ohneSchatten(gang); gang.visible=false;
  PH.halme(gang,AX,-15.4,1.5,40);

  /* fester Rahmen mit Gold, großem Hufeisen und zwei Laternen */
  const r=gruppe(hinten,0,0,0);
  [-1,1].forEach(s=>{ const x=AX+s*2.04; box(r,.46,4.42,.34,HELLHOLZ,x,2.21,-13.33); box(r,.58,.36,.42,STEIN,x,.18,-13.31); box(r,.1,3.9,.04,GOLD,x,2.25,-13.15); });
  box(r,4.86,.36,.42,HELLHOLZ,AX,4.5,-13.3); box(r,5.0,.1,.5,GOLD,AX,4.73,-13.28);
  ring(r,.4,.1,GOLD,AX,5.28,-13.36,Math.PI*1.5).rotation.z=-Math.PI*.25;
  [-1,1].forEach(s=>{ const x=AX+s*2.55; box(r,.18,.5,.08,EISEN,x,3.6,-13.44); strich(r,[x,3.82,-13.44],[x,3.85,-12.95],.04,EISEN); PH.laterne(r,x,3.2,-12.95); });
  verschmelze(r);

  /* Türflügel: Drehpunkt links, schwingt nach hinten */
  const tuerG=gruppe(hinten,AX-1.78,0,-13.32); tuerG.userData.lebendig=true;
  const f=gruppe(tuerG,1.78,0,0);
  box(f,3.54,4.24,.16,ROT,0,2.14,0);
  [-1.2,-.6,0,.6,1.2].forEach(x=>box(f,.04,4.1,.02,ROT2,x,2.14,.09));
  [.18,1.45,3.15,4.14].forEach(y=>box(f,3.5,.18,.08,CREME,0,y,.11));
  [-1.66,1.66].forEach(x=>box(f,.18,4.14,.08,CREME,x,2.16,.115));
  [[.2,1.43],[3.17,4.12]].forEach(([a,b])=>{ strich(f,[-1.6,a,.11],[1.6,b,.11],.065,CREME); strich(f,[-1.6,b,.11],[1.6,a,.11],.065,CREME); });
  /* Eisenbänder */
  [.8,3.65].forEach(y=>{ box(f,1.1,.12,.05,EISEN,-1.15,y,.17); ball(f,.09,EISEN,-.6,y,.17,1,1,.5); });
  /* Schlossplatte mit großem Zahlenschloss */
  box(f,1.75,1.45,.08,DUNKEL,0,2.3,.13); [-.9,.9].forEach(x=>box(f,.1,1.55,.1,GOLD,x,2.3,.15)); [-.74,.74].forEach(y=>box(f,1.9,.1,.1,GOLD,0,2.3+y,.15));
  const schloss=PH.zahlenschloss(f,0,2.15,.28); schloss.scale.setScalar(1.45);
  verschmelze(tuerG);
  const schimmer=schein(f,'rgba(255,225,120,.5)',0,2.3,.55,1.7);

  const licht=new THREE.PointLight(0xfff0c0,0,12,1.5); licht.position.set(AX,3,-14.9); sc.add(licht);
  k.kasten(AX,-13.2,4.7,.7);
  return ausgang(k,{ name:'Boxentür', einfach:'Boxentür', steh:[AX+1.25,-11.4], durch:[AX+.55,-15.6],
    treffer:{x:AX,y:2.35,z:-12.95,b:4.3,h:4.7,t:.8}, schildOben:[AX,4.6,-12.1], glanz:[AX,2.3,-12.5],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)), w=a*a*(3-2*a);
      tuerG.rotation.y=w*Math.PI*.5; gang.visible=auf>.02; licht.intensity=1.8*auf;
      schimmer.visible=auf<.3; const g=1.65+Math.sin(t*2.2)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Pferdebox. Eigene Richtung: Wand bei z=0, Front bei z=1.35 ----------
   g = feste Teile (wird später verschmolzen), leben = Gruppe für die Pferde, (x,z,dreh) = Lage an der Wand */
function pferdebox(k,g,leben,x,z,dreh,w,o){
  const q=gruppe(g,x,0,z); q.rotation.y=dreh;
  /* dunkles Inneres */
  box(q,w,3.7,.06,0x3a2412,0,1.85,.12);
  [-.3,.3].forEach(v=>box(q,.08,3.6,.02,DUNKEL,v*w,1.85,.16));
  /* Trennwände, Pfosten, Sturz */
  [-1,1].forEach(s=>{ box(q,.12,1.8,1.2,BOX2,s*w/2,.9,.75); box(q,.18,.12,1.25,HOLZ3,s*w/2,1.85,.75);
    box(q,.24,4.55,.26,HOLZ2,s*w/2,2.27,1.38); box(q,.34,.3,.36,STEIN2,s*w/2,.15,1.38); ball(q,.15,MESSING,s*w/2,1.98,1.5,1,1,.6);
    strich(q,[s*w/2,3.15,1.38],[s*(w/2-.55),3.72,1.38],.08,HOLZ2); });
  box(q,w+.2,.26,.3,HOLZ2,0,3.8,1.38);
  box(q,w+.3,.14,1.55,HOLZ,0,4.5,.8);
  /* feste Seitenteile und Halbtür mit X-Brettern */
  const tb=2.3, sb=(w-tb)/2;
  [-1,1].forEach(s=>{ const m=s*(tb/2+sb/2); box(q,sb,1.7,.14,BOX2,m,.85,1.3); box(q,.06,1.55,.02,HOLZ3,m,.82,1.38); });
  box(q,tb-.06,1.62,.16,BOX,0,.84,1.36);
  [.14,1.62].forEach(y=>box(q,tb-.06,.16,.07,HELLHOLZ,0,y,1.47));
  [-1,1].forEach(s=>box(q,.14,1.62,.07,HELLHOLZ,s*(tb/2-.1),.88,1.472));
  strich(q,[-tb/2+.17,.2,1.47],[tb/2-.17,1.56,1.47],.055,HELLHOLZ); strich(q,[-tb/2+.17,1.56,1.47],[tb/2-.17,.2,1.47],.055,HELLHOLZ);
  box(q,w,.1,.3,HOLZ3,0,1.74,1.34);
  box(q,.34,.09,.05,EISEN,tb/2-.22,1.1,1.53); ball(q,.06,METALL,tb/2-.08,1.1,1.55);
  /* Hufeisen über der Box */
  ring(q,.24,.065,METALL,0,4.12,1.5,Math.PI*1.5).rotation.z=-Math.PI*.25;
  if(o.decke!==undefined){ /* Pferdedecke, über die Halbtür gehängt, mit Streifen und Fransen */
    const dx=-.42, b=1.36;
    const vorn=box(q,b,.96,.06,o.decke,dx,1.34,1.575); vorn.rotation.x=-.04;
    box(q,b,.07,.4,o.decke,dx,1.83,1.38); box(q,b,.34,.05,o.decke,dx,1.66,1.17);
    const falz=walze(q,.075,b,o.decke,dx,1.805,1.54); falz.rotation.z=Math.PI/2;
    [1.02,1.16].forEach((y,i)=>box(q,b+.02,i?.05:.09,.03,CREME,dx,y,1.615-(y-1.34)*.04));
    for(let i=0;i<15;i++){ const m=box(q,.045,.2+(i%2)*.04,.025,i%3?CREME:o.decke,dx-b/2+.05+i*(b-.1)/14,.77-(i%2)*.02,1.59); m.rotation.z=((i%3)-1)*.09; } }
  if(o.fell){
    const F=FELL[o.fell], p=gruppe(leben,x,0,z); p.rotation.y=dreh;
    const dreher=gruppe(p,o.versatz||0,1.45,.62); dreher.rotation.y=-Math.PI/2+(o.blick||0); dreher.userData.lebendig=true;
    const hk=PH.halsKopf(dreher,0,0,0,{ fell:F[0], maehne:F[1], blesse:o.blesse, halfter:o.halfter });
    ball(hk.g,.52,F[0],-.22,-.42,0,.85,1.05,.9);
    /* alles außer den Ohren zu wenigen Körpern zusammenfassen (weniger Zeichenaufrufe) */
    hk.ohren.forEach(e=>{ e.userData.lebendig=true; });
    verschmelze(hk.g); ohneSchatten(dreher);
    const ph=o.phase||0;
    k.anim.push(t=>{ const u=t+ph;
      hk.g.rotation.z=Math.sin(u*1.1)*.05+(Math.sin(u*.37)>.6?Math.sin(u*4.2)*.07:0);
      dreher.rotation.y=-Math.PI/2+(o.blick||0)+Math.sin(u*.45)*.12;
      hk.ohren.forEach((e,i)=>e.rotation.z=Math.sin(u*2.7+i*2)>.85?.3:0); });
  }
}
function boxen(k,sc,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  const lh=gruppe(hinten,0,0,0), lL=gruppe(links,0,0,0), lR=gruppe(rechts,0,0,0);
  /* Rückwand: [x, Breite, Pferd] */
  [[-15.8,3.8,{ fell:'fuchs', blesse:true, halfter:GRUEN, blick:.55, phase:.4 }],
   [-8.1,3.6,{ fell:'schimmel', halfter:ROT, blick:-.5, phase:2.1 }],
   [.55,3.8,{ fell:'braun', blesse:true, halfter:BLAU, blick:.5, phase:3.7, decke:0x3f7a42 }],
   [14.8,3.8,{ fell:'palomino', blesse:true, halfter:ROT, blick:-.55, phase:5.2, decke:BLAU }]].forEach(([x,w,o])=>{
    pferdebox(k,h,lh,x,HINTEN,0,w,o); k.kasten(x,HINTEN+1.0,w+.2,2.0); });
  /* Heu auf den Brettern über den Boxen */
  [[-16.4,1.5],[-14.8,1.3],[-8.6,1.5],[-7.2,1.1],[-.2,1.6],[1.5,1.2],[14.1,1.3],[15.8,1.5]].forEach(([x,b],i)=>PH.ballen(h,x,4.57,-12.75,b,.66+(i%2)*.1,1.0,(i%3-1)*.08,i%3===1?PH.HEU:STROH));
  /* Seitenwände */
  const seite=(g,l,v,liste)=>liste.forEach(([z,o])=>{
    pferdebox(k,g,l,v*18,z,-v*Math.PI/2,3.6,o); k.kasten(v*17,z,2.0,3.8);
    PH.ballen(g,v*17.25,4.57,z+(v<0?.4:-.3),1.0,.7,1.8,0,STROH); });
  seite(L,lL,-1,[[-8.1,{ fell:'falbe', halfter:BLAU, blick:.4, phase:1.2 }],[-1.9,{ decke:ROT }],[4.3,{ fell:'rappe', blesse:true, halfter:ROT, blick:.5, phase:4.4 }]]);
  seite(R,lR,1,[[-8.1,{ decke:0xd8a23a }],[-1.9,{ fell:'schimmel', halfter:GRUEN, blick:-.4, phase:6.0 }],[4.3,{ fell:'braun', blesse:true, halfter:0xd8a23a, blick:-.5, phase:2.9 }]]);
  /* Fenster zwischen den Boxen */
  const glas=fensterBild();
  [[L,-1],[R,1]].forEach(([g,v])=>[-5.0,1.2,8.6,11.6].forEach(z=>{ const q=gruppe(g,v*17.96,0,z); q.rotation.y=-v*Math.PI/2;
    flaeche(q,glas,1.6,1.4,0,3.15,.03);
    [-.84,0,.84].forEach(x=>box(q,x?.14:.08,1.55,.1,HOLZ3,x,3.15,.07)); [2.4,3.15,3.9].forEach((y,i)=>box(q,1.82,i===1?.08:.14,.1,HOLZ3,0,y,.075)); box(q,2.0,.12,.34,HOLZ,0,2.3,.16);
    box(q,1.5,.26,.28,ROT2,0,2.47,.22); for(let i=0;i<6;i++){ ball(q,.12,0x4a8a38,-.6+i*.24,2.64,.22); ball(q,.085,[0xff6a7a,0xffd23a,0xfaf0ff][i%3],-.6+i*.24,2.74,.28); } }));
  /* Laternen an den Pfosten */
  [-13.9,-6.3,-1.35,12.9].forEach(x=>{ strich(h,[x,3.45,-12.0],[x,3.5,-11.6],.035,EISEN); PH.laterne(h,x,2.85,-11.6); });
  [[L,-1],[R,1]].forEach(([g,v])=>[-5.0,1.2].forEach(z=>{ box(g,.1,.5,.2,EISEN,v*17.93,4.9,z); strich(g,[v*17.9,5.1,z],[v*17.3,5.1,z],.04,EISEN); PH.laterne(g,v*17.3,4.5,z); }));
  /* bunte Wimpel unter dem Dach */
  const wf=[ROT,0xffd23a,BLAU,GRUEN,0xf08030];
  strich(h,[-17.97,6.12,-13.38],[3.4,6.12,-13.38],.02,CREME); strich(h,[9.4,6.12,-13.38],[17.97,6.12,-13.38],.02,CREME);
  [-1,1].forEach(v=>ball(h,.09,GOLD,v*17.93,6.12,-13.38));
  [[3.4,3.95],[9.4,8.85]].forEach(([a,b])=>{ strich(h,[a,6.12,-13.38],[b,4.76,-13.28],.02,CREME); ball(h,.09,GOLD,b,4.79,-13.2); });
  for(let i=0,x=-17.2;x<17.4;x+=.8){ if(x>3.2&&x<9.6) continue; const m=kegel(h,.2,.42,wf[i++%5],x,5.9,-13.38); m.rotation.x=Math.PI; m.scale.z=.04; }
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Deko ---------- */
function stapelBallen(k,g,x,z,dreh,art){
  const quer=Math.abs(Math.sin(dreh))>.5;
  const q=gruppe(g,x,0,z); q.rotation.y=dreh;
  PH.ballen(q,-.82,0,0,1.55,.8,1.05,.03); PH.ballen(q,.82,0,0,1.55,.8,1.05,-.04,art?PH.HEU:STROH);
  PH.ballen(q,art?-.45:.3,.82,0,1.5,.78,1.0,.12);
  k.kasten(x,z,quer?1.2:3.3,quer?3.3:1.2);
}
function sack(g,x,z,dreh,c){
  const q=gruppe(g,x,0,z); q.rotation.y=dreh;
  ball(q,.52,c,0,.48,0,1,1.05,.82); rohr(q,.2,.42,.45,c,0,.98,0,14); liegend(ring(q,.2,.05,LEDER2,0,1.17,0)); rohr(q,.3,.18,.24,c,0,1.31,0,12);
  box(q,.34,.3,.03,0x8a6a3a,0,.55,.43); ball(q,.07,STROH,0,.55,.455,1,1.4,.3);
}
function bank(k,g,x,z){
  [-1.25,1.25].forEach(a=>{ box(g,.18,.62,.7,HOLZ3,x+a,.31,z); box(g,.16,1.3,.14,HOLZ3,x+a,.95,z+.36); });
  box(g,3.0,.14,.85,HOLZ,x,.69,z); [1.12,1.45].forEach(y=>box(g,3.0,.22,.1,HOLZ,x,y,z+.36));
  box(g,1.0,.1,.7,BLAU,x-.6,.81,z-.03); [-.25,.25].forEach(a=>box(g,.09,.11,.72,CREME,x-.6+a,.815,z-.03));
  k.kasten(x,z+.05,3.2,1.1);
}
function blumenkasten(k,g,x,z,b){
  box(g,b,.55,.8,HOLZ2,x,.28,z); box(g,b+.1,.1,.9,HOLZ3,x,.56,z); box(g,b-.2,.06,.6,0x4a2e1a,x,.62,z);
  for(let i=0;i<Math.round(b*5);i++){ const a=x-b/2+.22+i*(b-.44)/(Math.round(b*5)-1), v=(i%2?.16:-.16); ball(g,.17,i%2?0x4a8a38:0x5aa244,a,.74,z+v*.6); ball(g,.12,[0xff6a7a,0xffd23a,0xfaf0ff,0xb080e0][i%4],a,.95+(i%3)*.06,z+v); ball(g,.045,0xffb020,a,1.06+(i%3)*.06,z+v); }
  k.kasten(x,z,b+.1,.9);
}
function kuerbis(k,g,x,z,gr){
  const q=gruppe(g,x,0,z); q.scale.setScalar(gr);
  for(let i=0;i<6;i++){ const a=i*Math.PI/3; ball(q,.34,i%2?0xf08a24:0xe07818,Math.cos(a)*.18,.32,Math.sin(a)*.18,1,.95,1); }
  strich(q,[0,.55,0],[.08,.8,0],.06,0x4a7a30); ball(q,.18,0x4a8a38,.24,.62,.08,1.2,.2,.8);
  k.kreis(x,z,.55*gr);
}
function heuhaufen(k,g,x,z){
  heu(g,[[x,0,z,.95,.85,.8,230],[x-.35,.38,z+.1,.55,.7,.5,90],[x+.45,.2,z-.15,.55,.6,.5,70]]);
  k.kreis(x,z,1.15);
}
/* Laternenpfahl auf Steinsockel (bekommt einen Verdecker) */
function pfahl(k,sc,x,z){
  const g=gruppe(sc,x,0,z);
  walze(g,.4,.35,STEIN,0,.17,0); box(g,.26,3.6,.26,HOLZ2,0,2.1,0); box(g,.36,.16,.36,HOLZ3,0,3.95,0);
  strich(g,[0,3.7,0],[0,3.75,.55],.045,EISEN); strich(g,[0,3.2,0],[0,3.7,.45],.03,EISEN);
  ring(g,.2,.055,METALL,0,2.3,.17,Math.PI*1.5).rotation.z=-Math.PI*.25;
  verschmelze(g); PH.laterne(g,0,3.1,.55);
  k.kreis(x,z,.45); k.verdecker(g,x,z,.4);
}
/* Huhn, Blick nach +x, läuft einen Rundweg und pickt */
function huhn(k,punkte,tempo,start,c){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0);
  ball(r,.27,c,0,.4,0,1.25,.95,.9); [-1,1].forEach(s=>{ ball(r,.17,c===WEISS?0xe4dccc:0x8a4a22,-.04,.43,s*.2,1.3,.8,.45); strich(r,[.02,.22,s*.1],[.02,.02,s*.1],.025,0xf0a020); box(r,.16,.03,.1,0xf0a020,.07,.02,s*.1); });
  [-.12,0,.12].forEach((v,i)=>strich(r,[-.26,.46,v*.4],[-.5,.7+(i===1?.08:0),v],.05,c));
  const kopf=gruppe(g,.24,.52,0); kopf.userData.lebendig=true;
  strich(kopf,[0,0,0],[.12,.2,0],.09,c); ball(kopf,.13,c,.14,.26,0); const s=kegel(kopf,.05,.13,0xf0a020,.31,.24,0); s.rotation.z=-Math.PI/2;
  [0,1,2].forEach(i=>ball(kopf,.05,0xd8342a,.08+i*.06,.39+(i===1?.025:0),0,1,1,.5)); ball(kopf,.035,0xd8342a,.24,.17,0,.8,1.3,.6);
  [-1,1].forEach(v=>ball(kopf,.022,SCHWARZ,.2,.29,v*.11));
  verschmelze(r); verschmelze(kopf); ohneSchatten(g);
  k.anim.push(t=>{ kopf.rotation.z=Math.sin(t*1.3+start)>.2?-Math.abs(Math.sin(t*7+start))*.9:0; });
  laeufer(k,g,punkte,tempo,start,11);
}

/* ---------- Gegenstände (Reihenfolge = ort 1 bis 10) ---------- */
const gegenstaende=[
  { x:-9.4, z:-6.2, steh:[-9.2,-4.4], kasten:[3.4,1.7], treffer:[3.3,2.2,1.7], baue(g){ /* 1 Futterkrippe voller Heu */
      [-1.25,1.25].forEach(x=>{ strich(g,[x,.05,-.6],[x,1.0,.45],.09,HOLZ3); strich(g,[x,.05,.6],[x,1.0,-.45],.09,HOLZ3); });
      strich(g,[-1.25,.52,0],[1.25,.52,0],.07,HOLZ3);
      box(g,2.9,.12,.75,HOLZ2,0,.82,0);
      [-1,1].forEach(s=>{ const w=gruppe(g,0,1.15,s*.52); w.rotation.x=s*.32; box(w,3.0,.72,.12,HOLZ,0,0,0); [-.18,.12].forEach(y=>box(w,3.02,.035,.02,HOLZ3,0,y,s*.065)); box(w,3.14,.12,.18,HELLHOLZ,0,.38,0); [-1.35,0,1.35].forEach(x=>box(w,.12,.74,.04,HOLZ3,x,0,s*.075)); });
      [-1,1].forEach(s=>{ box(g,.14,.74,1.0,HOLZ2,s*1.45,1.15,0); box(g,.16,.14,1.35,HELLHOLZ,s*1.46,1.52,0); });
      /* Heu */
      heu(g,[[-.72,1.36,.02,.66,.48,.52,120],[.05,1.38,-.03,.62,.56,.52,110],[.76,1.36,.03,.62,.42,.5,100]]);
      for(let i=0;i<46;i++){ const x=-1.3+(i*.618%1)*2.6, z=-.45+(i*.37%1)*.9, y=1.55+(i%5)*.07; strich(g,[x,y,z],[x+((i%7)-3)*.11,y+.2+(i%3)*.08,z+((i%4)-1.5)*.14],.018,i%3?STROH:0x9cac44); }
      [[-1.0,.9],[.2,1.0],[1.2,.85],[-.3,-.9]].forEach(([x,z],i)=>{ const m=box(g,.5,.025,.04,i%2?STROH:STROH2,x,.03,z*.78); m.rotation.y=i*1.1; }); } },
  { x:-3.7, z:-6.0, steh:[-3.5,-4.2], r:.85, treffer:[1.6,2.0,1.6], baue(g){ /* 2 Wassereimer */
      const A=0x3a7ac8, D=0x24507e;
      rohr(g,.7,.52,1.05,A,0,.56,0,22,true); walze(g,.52,.08,D,0,.07,0);
      [[.12,.53],[.4,.585],[.82,.66]].forEach(([y,r])=>liegend(ring(g,r+.015,.028,D,0,y,0)));
      liegend(ring(g,.7,.06,0xd8e0e8,0,1.09,0));
      walze(g,.655,.04,0x8ad0f4,0,.96,0); [.22,.42].forEach(r=>liegend(ring(g,r,.012,0xe4f8ff,.08,.99,-.05)));
      const henkel=ring(g,.7,.035,METALL,0,1.09,0,Math.PI); henkel.scale.y=1.05;
      const griff=walze(g,.075,.46,HOLZ,0,1.82,0); griff.rotation.z=Math.PI/2;
      [-1,1].forEach(s=>ball(g,.1,METALL2,s*.71,1.08,0));
      /* kleine Tropfen außen */
      [[-.35,.75,.55],[.4,.5,.46],[.18,.9,.62]].forEach(([x,y,z])=>ball(g,.05,0xbfeaff,x,y,z,.8,1.3,.6)); } },
  { x:11.0, z:-5.6, steh:[10.6,-3.8], kasten:[3.5,1.8], treffer:[3.5,2.2,1.7], baue(g){ /* 3 Schubkarre mit Stroh */
      const A=0x3f9a4a, D=0x286a32;
      /* Rad vorn links */
      const rad=gruppe(g,-1.3,.46,0);
      ring(rad,.34,.13,SCHWARZ,0,0,0); liegend(walze(rad,.24,.14,METALL,0,0,0)); liegend(walze(rad,.08,.34,ROT,0,0,0));
      [-1,1].forEach(s=>{ strich(g,[-1.3,.46,s*.2],[-.55,.82,s*.5],.05,METALL2); strich(g,[-.55,.82,s*.5],[1.0,.82,s*.55],.06,METALL2);
        strich(g,[1.0,.82,s*.55],[1.62,1.14,s*.62],.055,METALL2); strich(g,[1.45,1.05,s*.6],[1.74,1.2,s*.63],.085,SCHWARZ);
        strich(g,[.72,.8,s*.52],[.82,.07,s*.6],.06,METALL2); box(g,.34,.08,.18,METALL2,.82,.05,s*.6); });
      strich(g,[.8,.36,-.57],[.8,.36,.57],.035,METALL2);
      /* Mulde */
      const m=gruppe(g,-.05,1.12,0); m.scale.set(1.42,1,.94);
      const w=rohr(m,.9,.6,.66,mat(A,{side:THREE.DoubleSide}),0,0,0,4,true); w.rotation.y=Math.PI/4;
      box(g,1.25,.08,.8,D,-.05,.82,0);
      [-1,1].forEach(s=>{ box(g,1.88,.09,.09,D,-.05,1.46,s*.6); box(g,.09,.09,1.25,D,-.05+s*.91,1.46,0); });
      /* Stroh */
      heu(g,[[-.36,1.38,0,.6,.52,.56,130],[.38,1.36,.03,.5,.4,.52,100]]);
      for(let i=0;i<40;i++){ const x=-.85+(i*.618%1)*1.6, z=-.45+(i*.29%1)*.9, y=1.58+(1-Math.abs(x)/1.1)*.22; strich(g,[x,y,z],[x+((i%5)-2)*.16,y+.1+(i%4)*.07,z+((i%3)-1)*.18],.016,i%3?0xf8dc80:STROH2); } } },
  { x:3.9, z:-1.3, steh:[3.7,.4], kasten:[2.4,1.5], treffer:[2.4,1.9,1.5], baue(g){ /* 4 Putzkiste mit Bürsten und Striegel */
      const A=0xd23a2e, D=0x8a1e16;
      box(g,2.2,.12,1.3,D,0,.06,0);
      [-1,1].forEach(s=>{ box(g,2.2,.66,.1,A,0,.46,s*.62); box(g,.1,.66,1.2,A,s*1.06,.46,0); box(g,2.26,.08,.14,CREME,0,.8,s*.62); box(g,.14,.08,1.3,CREME,s*1.06,.8,0);
        box(g,.14,1.45,.16,HOLZ,s*1.06,.95,0); });
      const griff=walze(g,.085,2.35,HOLZ2,0,1.68,0); griff.rotation.z=Math.PI/2; [-1,1].forEach(s=>ball(g,.11,GOLD,s*1.18,1.68,0));
      ring(g,.17,.05,GOLD,0,.46,.69,Math.PI*1.5).rotation.z=-Math.PI*.25;
      box(g,2.0,.64,1.1,0x6a2a1c,0,.45,0);
      /* Wurzelbürste, hochkant gelehnt */
      const b=gruppe(g,-.55,.96,.2); b.rotation.set(-.45,.15,.06);
      box(b,.82,.4,.18,HELLHOLZ,0,0,0); ball(b,.2,HELLHOLZ,-.41,0,0,.8,1,.45); ball(b,.2,HELLHOLZ,.41,0,0,.8,1,.45);
      for(let i=0;i<8;i++) for(let j=0;j<3;j++) box(b,.065,.07,.2,j===1?0x3a2a18:0x54402a,-.37+i*.105,-.12+j*.12,.17);
      box(b,.6,.09,.07,LEDER,0,0,-.12);
      /* Striegel: ovale Gummiplatte mit vielen kurzen Zähnen und Handschlaufe */
      const s=gruppe(g,.55,1.02,.24); s.rotation.x=-.55;
      const sch=liegend(walze(s,.42,.12,0x30323c,0,0,0)); sch.scale.z=.3;
      /* ovale Zahnringe ineinander */
      [[.36,.25,22],[.23,.15,14],[.1,.06,6]].forEach(([rx,ry,n])=>{ const r=ring(s,rx,.016,METALL,0,0,.07); r.scale.y=ry/rx;
        for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, t=kegel(s,.032,.1,0xdce4ec,Math.cos(a)*rx,Math.sin(a)*ry,.11); t.rotation.x=Math.PI/2; } });
      /* flache Handschlaufe quer darüber */
      box(s,.86,.12,.04,0x3fae6a,0,0,.2); [-1,1].forEach(v=>{ box(s,.06,.12,.2,0x3fae6a,v*.43,0,.11); ball(s,.04,GOLD,v*.37,0,.225,1,1,.5); });
      /* Mähnenbürste und Schwamm hinten */
      box(g,.55,.22,.2,BLAU,-.4,.8,-.3); for(let i=0;i<7;i++) box(g,.04,.26,.1,CREME,-.61+i*.07,1.03,-.3);
      box(g,.46,.3,.34,0xf4d840,.45,.72,-.28); [[.35,.88,-.2],[.55,.88,-.33],[.45,.88,-.28]].forEach(([x,y,z])=>ball(g,.05,0xc8a820,x,y,z,1,.4,1)); } },
  { x:-11.9, z:HINTEN, wand:'hinten', steh:[-11.7,-11.5], kasten:[2.6,.9], treffer:[2.6,3.35,.9], trefferY:1.0, baue(g){ /* 5 Halfter am Haken */
      /* helles Brett als Hintergrund */
      box(g,2.5,3.0,.1,0xf0dcae,0,2.7,.1); [-1,1].forEach(s=>{ box(g,.14,3.14,.14,HOLZ2,s*1.28,2.7,.13); box(g,2.7,.14,.14,HOLZ2,0,2.7+s*1.54,.13); });
      /* blasser Pferdekopf als Hintergrund */
      const bk=new THREE.Mesh(new THREE.PlaneGeometry(2.42,2.9),new THREE.MeshLambertMaterial({map:kopfBild(),emissive:0x181208})); bk.position.set(0,2.7,.158); g.add(bk);
      const C=0x1c5cc0, z=.27;
      /* Haken, an dem das Genickstück hängt */
      liegend(walze(g,.14,.08,EISEN,.38,3.66,.19)); strich(g,[.38,3.66,.2],[.38,3.56,.44],.055,EISEN); ball(g,.09,GOLD,.38,3.58,.46);
      /* Genickstück mit Kehlriemen: große Schlaufe hinter den Ohren */
      const gn=ring(g,.57,.065,C,.35,2.97,z); gn.rotation.z=-1.66; gn.scale.y=.34;
      /* Nasenriemen: Schlaufe um das Maul */
      const n=ring(g,.325,.065,C,-.43,2.375,z+.01); n.rotation.z=-1.173; n.scale.y=.38;
      /* Backenriemen und Stirnriemen */
      strich(g,[-.32,2.42,z+.03],[.22,3.26,z+.03],.062,C); strich(g,[.36,3.46,z+.02],[-.04,3.33,z+.02],.055,C);
      [[-.32,2.42],[.22,3.26],[.38,2.43]].forEach(([x,y])=>ring(g,.095,.034,GOLD,x,y,z+.1));
      /* Kinnriemen zum Ring, daran hängt der Strick gerade herab */
      strich(g,[.38,2.43,z],[-.29,2.08,z+.04],.05,C); ring(g,.1,.038,GOLD,-.3,2.04,z+.08);
      walze(g,.055,.16,MESSING,-.3,1.88,z+.09);
      walze(g,.06,.48,ROT,-.3,1.57,z+.09); [1.72,1.61,1.5,1.39].forEach(y=>{ const w=liegend(ring(g,.062,.016,CREME,-.3,y,z+.09)); w.rotation.y=.35; });
      ball(g,.095,ROT,-.3,1.33,z+.09); [-1,0,1].forEach(v=>strich(g,[-.3,1.33,z+.09],[-.3+v*.07,1.19,z+.12],.022,CREME)); } },
  { x:-3.8, z:HINTEN, wand:'hinten', steh:[-3.8,-11.5], kasten:[3.2,.9], treffer:[3.2,2.9,.9], trefferY:1.7, baue(g){ /* 6 Stalltafel mit Kreide */
      const y=2.95;
      box(g,3.1,2.2,.12,HOLZ3,0,y,.08);
      const q=new THREE.Mesh(new THREE.PlaneGeometry(2.76,1.84),new THREE.MeshLambertMaterial({map:tafelBild(),emissive:0x101814})); q.position.set(0,y,.16); g.add(q);
      [-1,1].forEach(s=>{ box(g,3.18,.18,.2,HELLHOLZ,0,y+s*1.02,.14); box(g,.18,2.2,.2,HELLHOLZ,s*1.49,y,.14); [-1,1].forEach(v=>ball(g,.07,MESSING,s*1.49,y+v*1.02,.26)); });
      /* Ablage mit Kreide und Lappen */
      box(g,2.9,.1,.36,HOLZ,0,1.82,.28);
      [[-.9,WEISS],[-.45,0xffe27a],[0,0xff9a8a]].forEach(([x,c])=>{ const m=walze(g,.05,.34,c,x,1.92,.32); m.rotation.z=Math.PI/2; });
      box(g,.45,.14,.24,0x7a8aa0,.9,1.94,.3);
      /* Aufhängung */
      [-1,1].forEach(s=>{ strich(g,[s*1.1,y+1.1,.12],[0,y+1.55,.1],.025,LEDER2); }); ball(g,.08,EISEN,0,y+1.55,.12); } },
  { x:-12.6, z:.9, steh:[-12.3,2.7], r:.85, treffer:[1.8,3.6,1.4], baue(g){ /* 7 Stallbesen, an einen Halter gelehnt */
      /* Halter: Pfosten mit Gabel aus zwei Holzklötzen */
      box(g,.9,.14,.7,HOLZ3,0,.07,-.45); box(g,.18,1.9,.18,HOLZ2,0,.98,-.55);
      box(g,.54,.14,.2,HOLZ,0,1.9,-.5); [-.2,.2].forEach(x=>box(g,.12,.18,.34,HOLZ,x,1.9,-.26));
      /* Stiel */
      strich(g,[0,.55,.28],[0,3.35,-.5],.08,HELLHOLZ); ball(g,.11,ROT,0,3.38,-.51);
      strich(g,[0,2.85,-.36],[0,3.1,-.43],.095,ROT);
      /* breiter Kopf mit Borsten */
      box(g,1.5,.24,.44,ROT,0,.56,.3); box(g,.3,.14,.3,METALL2,0,.72,.28);
      box(g,1.46,.12,.46,STROH2,0,.4,.31);
      for(let i=0;i<15;i++) for(let j=0;j<4;j++){ const x=-.68+i*.097, z=.14+j*.115; strich(g,[x,.42,z],[x*1.14,.02,.3+(z-.3)*1.5],.028,(i+j)%3?STROH:0xb8862a); } } },
  { x:8.4, z:4.6, steh:[8.1,6.5], r:.92, treffer:[1.8,2.1,1.8], baue(g){ /* 8 Hafertonne */
      rohr(g,.72,.62,.7,HOLZ,0,.36,0,18); rohr(g,.62,.72,.7,HOLZ,0,1.06,0,18,true);
      for(let i=0;i<14;i++){ const a=i*Math.PI/7+.1, u=Math.cos(a), v=Math.sin(a); strich(g,[u*.625,.04,v*.625],[u*.73,.71,v*.73],.014,HOLZ3); strich(g,[u*.73,.71,v*.73],[u*.63,1.4,v*.63],.014,HOLZ3); }
      [[.12,.645],[.48,.7],[.96,.695],[1.32,.65]].forEach(([y,r])=>liegend(ring(g,r,.04,METALL2,0,y,0)));
      liegend(ring(g,.62,.055,HELLHOLZ,0,1.42,0));
      /* Hafer als Haufen */
      walze(g,.63,.1,0xe0bc6a,0,1.34,0); ball(g,.55,0xe8c878,0,1.34,0,1,.45,1);
      for(let i=0;i<46;i++){ const a=i*2.4, r=Math.sqrt((i+.5)/46)*.5; const m=ball(g,.045,i%2?0xf6dc98:0xc89a48,Math.cos(a)*r,1.6-r*r*.62,Math.sin(a)*r,1.5,.6,.7); m.rotation.y=a; }
      /* Holzschaufel steckt im Hafer */
      strich(g,[.14,1.52,0],[.55,1.98,-.12],.06,HOLZ2); ball(g,.09,HOLZ2,.56,1.99,-.12); const s=box(g,.34,.07,.28,METALL,.08,1.52,.02); s.rotation.z=.8;
      /* Zeichen: Ähre vorn */
      box(g,.62,.6,.04,CREME,0,.72,.735); strich(g,[0,.48,.765],[0,.96,.765],.016,0xa87820); [0,1,2].forEach(i=>[-1,1].forEach(v=>{ const m=ball(g,.07,0xd8a428,v*.09,.66+i*.13,.765,.65,1.25,.3); m.rotation.z=-v*.55; })); ball(g,.065,0xd8a428,0,.99,.765,.65,1.3,.3);
      /* verschüttete Körner */
      [[-.7,.45],[-.55,.62],[.62,.55],[.78,.3],[.45,.75]].forEach(([x,z])=>ball(g,.05,0xe8c878,x,.03,z,1.4,.5,.8)); } },
  { x:10.8, z:HINTEN, wand:'hinten', steh:[10.8,-11.5], kasten:[2.4,.9], treffer:[2.4,3.6,.9], trefferY:1.3, baue(g,k){ /* 9 große Stalluhr */
      const y=3.1;
      liegend(walze(g,1.08,.3,HOLZ2,0,y,.18)); ring(g,1.06,.11,HOLZ,0,y,.34); ring(g,.89,.055,GOLD,0,y,.37);
      const z=new THREE.Mesh(new THREE.CircleGeometry(.89,36),new THREE.MeshLambertMaterial({map:zifferBild(),emissive:0x2a2418})); z.position.set(0,y,.35); g.add(z);
      /* kleines rotes Dach und Hufeisen darunter */
      [-1,1].forEach(s=>{ const d=box(g,1.2,.16,.6,ROT,s*.48,y+1.18,.3); d.rotation.z=-s*.42; });
      ball(g,.12,GOLD,0,y+1.5,.32);
      box(g,.7,.5,.2,HOLZ2,0,y-1.28,.14); ring(g,.17,.05,GOLD,0,y-1.3,.28,Math.PI*1.5).rotation.z=-Math.PI*.25;
      const zeiger=[[.5,.095],[.72,.06],[.77,.025]].map(([l,d],i)=>{ const q=gruppe(g,0,y,.39+i*.025); q.userData.lebendig=true; box(q,d,l,.02,i===2?0xc0281e:SCHWARZ,0,l/2-.1,0); verschmelze(q); return q; });
      liegend(walze(g,.085,.07,GOLD,0,y,.47));
      k.anim.push(t=>{ zeiger[0].rotation.z=-5.2-t*.004; zeiger[1].rotation.z=-1.05-t*.05; zeiger[2].rotation.z=-Math.floor(t)*Math.PI/30; }); } },
  { x:-7.6, z:4.6, steh:[-7.4,6.4], kasten:[2.5,1.6], treffer:[2.5,2.6,1.6], baue(g){ /* 10 Schlauchrolle mit runder Brause */
      const R2=0xe0602a, S=0x2ea84a, S2=0x1f8436, y=1.35;
      [-1,1].forEach(s=>{ const z=s*.52; strich(g,[-.85,.06,z],[0,y,z],.075,R2); strich(g,[.85,.06,z],[0,y,z],.075,R2); box(g,.4,.1,.22,EISEN,-.88,.05,z); box(g,.4,.1,.22,EISEN,.88,.05,z); });
      strich(g,[-.5,.55,-.52],[.5,.55,-.52],.045,R2);
      /* Trommel mit aufgewickeltem Schlauch */
      liegend(walze(g,.3,.9,METALL2,0,y,0));
      [-.3,-.1,.1,.3].forEach((z,i)=>ring(g,.62,.11,i%2?S2:S,0,y,z));
      ring(g,.4,.1,S,0,y,.22);
      [-1,1].forEach(s=>{ const z=s*.45; ring(g,.82,.05,R2,0,y,z); for(let i=0;i<3;i++){ const a=i*Math.PI/3+.3; strich(g,[Math.cos(a)*.82,y+Math.sin(a)*.82,z],[-Math.cos(a)*.82,y-Math.sin(a)*.82,z],.035,R2); } liegend(walze(g,.15,.12,GOLD,0,y,s*.55)); });
      /* Kurbel */
      strich(g,[0,y,.62],[.34,y+.3,.62],.045,METALL); strich(g,[.34,y+.3,.6],[.34,y+.3,.86],.07,SCHWARZ);
      /* Schlauchende hängt herab, daran die runde Brause */
      const P=[[-.55,1.04,.3],[-.88,.7,.42],[-.96,.35,.56],[-.72,.13,.68],[-.3,.11,.72],[.12,.11,.7],[.4,.16,.7],[.48,.36,.7]];
      P.forEach((p,i)=>{ if(i) strich(g,P[i-1],p,.09,S); ball(g,.092,S,p[0],p[1],p[2]); });
      walze(g,.115,.14,MESSING,.5,.46,.7);
      strich(g,[.59,.46,.52],[.5,.46,.7],.035,EISEN);
      const br=gruppe(g,.52,.62,.76); br.rotation.x=.9;
      rohr(br,.32,.13,.24,MESSING,0,-.06,0,18); walze(br,.33,.07,GOLD,0,.08,0); walze(br,.26,.02,METALL,0,.125,0);
      for(let i=0;i<7;i++){ const a=i*Math.PI/3, r=i===6?0:.16; walze(br,.032,.015,SCHWARZ,Math.cos(a)*r,.14,Math.sin(a)*r); } } }
];

function baue(k){
  const sc=k.scene;
  const h=PH.huelle(k,{ B,T,H, himmelLicht:0xffecd0, grund:0x5a4028, staerke:.74, sonne:0xffe4b8, sonneStaerke:.4,
    wandBild:PH.bretterBild([188,140,90]), bodenBild:PH.pflasterBild([170,146,122]), bodenWdh:[B/7,T/7], leiste:HOLZ2, sockel:1.3, sockelFarbe:0x74492a, oeffnung:{x:AX,b:3.62,h:4.32} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc,hinten);
  boxen(k,sc,hinten,links,rechts);

  /* ---------- Ausstattung am Boden ---------- */
  const m=gruppe(sc,0,0,0);
  stapelBallen(k,m,-15.7,11.6,0,false); stapelBallen(k,m,15.7,11.6,0,true);
  stapelBallen(k,m,-16.9,9.0,Math.PI/2,true); stapelBallen(k,m,16.9,9.0,Math.PI/2,false);
  stapelBallen(k,m,-3.0,11.9,0,false); stapelBallen(k,m,4.4,11.9,0,true);
  PH.ballen(m,-16.6,0,-11.0+.0,1.5,.8,1.0,.7); k.kreis(-16.6,-11.0,.85);
  PH.ballen(m,17.0,0,-11.2,1.4,.8,1.0,-.6); k.kreis(17.0,-11.2,.8);
  heuhaufen(k,m,-13.2,8.2); heuhaufen(k,m,14.6,-.2);
  sack(m,-10.6,11.5,.3,0xd8c498); sack(m,-9.5,11.8,-.2,0xc4aa7a); sack(m,-10.0,10.6,.6,0xe4d4ae); k.kreis(-10.1,11.3,1.35);
  bank(k,m,10.6,11.2);
  blumenkasten(k,m,.7,12.4,2.8); blumenkasten(k,m,-7.0,12.3,2.4); blumenkasten(k,m,7.6,12.5,1.8);
  kuerbis(k,m,13.2,11.8,1.15); kuerbis(k,m,12.9,10.7,.75); kuerbis(k,m,-13.1,11.9,.95); kuerbis(k,m,-13.8,5.7,.7);
  PH.ballen(m,1.2,0,6.0,1.8,.75,1.05,0); k.kasten(1.2,6.0,2.0,1.2);
  PH.ballen(m,13.2,0,7.4,1.6,.75,1.0,0,PH.HEU); k.kasten(13.2,7.4,1.8,1.15);
  verschmelze(m);
  pfahl(k,sc,-14.0,-4.9); pfahl(k,sc,14.0,-5.0);

  /* Abflussrinne mit Eisengitter quer durch den vorderen Gang (flach, kein Hindernis) */
  const flach=gruppe(sc,0,0,0);
  box(flach,18.4,.012,.5,0x3a322c,-2.2,.008,3.4);
  [-.31,.31].forEach(v=>box(flach,18.6,.026,.13,STEIN,-2.2,.013,3.4+v));
  for(let x=-11.2;x<6.9;x+=.34) box(flach,.09,.022,.46,METALL2,x,.014,3.4);
  /* Hufspuren, die zur Boxentür führen */
  [[2.6,8.9],[2.95,7.9],[2.7,6.9],[3.2,5.9],[3.0,4.7],[4.9,-3.2],[5.4,-4.2],[5.25,-5.3],[5.85,-6.3],[5.75,-7.4],[6.3,-8.4],[6.15,-9.5]].forEach(([x,z],i)=>{
    const u=ring(flach,.15,.045,0x6e5844,x,.012,z,Math.PI*1.45); u.rotation.set(-Math.PI/2,0,-Math.PI*.22+(i%2?-.2:-.45)); u.scale.z=.25; });
  verschmelze(flach); ohneSchatten(flach);
  /* niedrige Strohnester (nur lose Halme, man läuft darüber) */
  heu(sc,[[-5.9,0,.9,.8,.13,.6,70],[-1.8,0,5.2,.9,.12,.65,75],[5.4,0,6.2,.75,.13,.6,65],[-5.2,0,6.9,.6,.11,.5,45],[6.8,0,2.0,.65,.11,.5,50],[.2,0,9.0,.8,.12,.55,60],[-9.6,0,-1.6,.7,.12,.55,50]],true);

  /* Stroh auf dem Pflaster */
  [[-15.6,-10.2,1.2,50],[-8.0,-10.6,1.3,40],[.6,-10.7,1.4,45],[14.6,-10.6,1.3,45],[-15.4,-1.8,1.3,50],[-15.2,4.6,1.2,40],[15.3,-8.0,1.3,45],[15.2,4.4,1.3,45],
   [-9.4,-5.4,1.8,35],[11.0,-4.9,1.8,35],[-13.2,8.2,2.1,70],[14.6,-.2,2.0,60],[-3.0,10.8,2.2,50],[1.2,5.9,1.6,35],[13.2,7.2,1.5,30],[-2.0,2.0,1.2,28],
   [-5.9,.9,1.5,40],[-1.8,5.2,1.7,45],[5.4,6.2,1.4,35],[-5.2,6.9,1.2,25],[6.8,2.0,1.3,30],[.2,9.0,1.6,35],[2.0,1.8,1.4,24],[-9.6,-1.6,1.3,28],[7.6,-1.6,1.2,24],[-4.0,-3.4,1.0,18]].forEach(([x,z,r,n])=>PH.halme(sc,x,z,r,n));

  /* ---------- Leben ---------- */
  katze(k,[[-4.8,1.8],[.8,2.6],[5.6,1.6],[4.6,8.4],[-3.8,8.2]],1.4);
  maeuschen(k,[[-11.2,3.6],[-10.2,6.6],[-6.0,9.0],[-8.6,9.2],[-11.2,6.4]],1.6,0);
  maeuschen(k,[[11.2,.6],[11.8,4.0],[10.6,8.6],[6.2,9.4],[10.2,5.6]],1.9,4);
  huhn(k,[[-.8,-8.8],[2.6,-7.2],[2.2,-5.2],[-1.2,-6.6]],.65,0,WEISS);
  huhn(k,[[1.6,-8.6],[3.6,-9.0],[5.0,-6.6],[3.2,-6.0]],.55,3,0xc0702c);
  huhn(k,[[13.0,2.6],[12.0,3.8],[13.4,5.4],[14.2,3.6]],.45,1.5,WEISS);

  /* ---------- Licht (zusammen mit dem Ausgang 5 Punktlichter) ---------- */
  flacker(k,-11.5,3.4,-10.0,0xffc468,.5,10);
  flacker(k,1.8,3.8,-10.2,0xffcc78,.45,10);
  flacker(k,12.6,3.4,-9.6,0xffc468,.5,10);
  flacker(k,-1.0,4.6,4.0,0xffd090,.35,14);

  return { tuer, start:[0,-2.4] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.8,-9.4],[-11.6,-9.0],[-6.2,-9.4],[-1.8,-10.6],[3.4,-10.6],[13.4,-8.6],[15.2,-3.6],[7.6,-6.4],[-14.4,-1.4],[-14.4,2.8],[-10.2,1.6],[-1.4,-.2],[7.6,.4],[-14.6,6.4],[-4.4,5.0],[4.2,4.6],[15.4,5.6],[-7.6,9.4],[1.6,9.4],[8.6,9.2]];

return { titel:'Die Stallgasse', breite:36, tiefe:27, oben:['30,18,8','70,44,22','116,80,44'], baue, gegenstaende, verstecke };
})();

/* Raum 2: Die Sattelkammer. Grüne Wände über brauner Holzvertäfelung, zwei Fenster zur Wiese, grüne Wandlampen,
   Sattelhalter mit Sätteln hoch an der Wand, Pferdedecken, Pferdebilder, Hufeisen, Strohhaufen, Katze und Mäuschen.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die Deckenluke oben in der Rückwand, eine Leiter führt hinauf, die Klappe schwingt auf, dahinter liegt der Heuboden. */
RAEUME3D.pferdehof[1] = (function(){
const { HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER, LEDER2, STROH, STROH2, METALL, METALL2, EISEN, GOLD, MESSING, ROT, BLAU, GRUEN, CREME, SCHWARZ, WEISS } = PH;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=0;                       /* Mitte der Deckenluke */
const ORANGE=0xe8862a, GELB=0xf0c828, LILA=0x7a4a9a, PINK=0xd8607a, LAMPGRUEN=0x2e8a58, TUERKIS=0x2f8a8a;

/* ---------- kleine Helfer ---------- */
const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze/Ring nach vorn bzw. flach legen */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* obere Hälfte einer Kugel (Helme, Lampenschirme) */
function kuppel(par,r,c,x,y,z,sx,sy,sz){ const m=new THREE.Mesh(new THREE.SphereGeometry(r,20,10,0,Math.PI*2,0,Math.PI*.5),mat(c,{side:THREE.DoubleSide})); m.position.set(x,y,z); m.scale.set(sx||1,sy||1,sz||1); m.castShadow=true; par.add(m); return m; }

/* ---------- Bilder ---------- */
/* Blick in den Heuboden hinter der Luke */
function heubodenBild(){
  return bild(512,384,(g)=>{ const v=g.createLinearGradient(0,0,0,384); v.addColorStop(0,'#6a4418'); v.addColorStop(.55,'#c8922e'); v.addColorStop(1,'#f0cc60'); g.fillStyle=v; g.fillRect(0,0,512,384);
    const l=g.createRadialGradient(256,130,10,256,130,170); l.addColorStop(0,'rgba(255,248,200,.95)'); l.addColorStop(1,'rgba(255,220,120,0)'); g.fillStyle=l; g.fillRect(0,0,512,384);
    g.strokeStyle='#4a2c10'; g.lineWidth=18; [[0,150,256,40],[256,40,512,150]].forEach(([a,b,c,d])=>{ g.beginPath(); g.moveTo(a,b); g.lineTo(c,d); g.stroke(); });
    for(let i=0;i<1100;i++){ const x=zufall()*512, y=190+zufall()*190, w=zufall()*3.14; g.strokeStyle=i%3?'#f8d868':(i%2?'#b88420':'#fff0a8'); g.lineWidth=3; g.beginPath(); g.moveTo(x,y); g.lineTo(x+Math.cos(w)*22,y+Math.sin(w)*9); g.stroke(); } });
}
/* Aussicht aus dem Fenster: Himmel, Wiese, Zaun und ein kleines Pferd */
function wiesenBild(pferdX){
  return bild(384,288,(g)=>{ const v=g.createLinearGradient(0,0,0,180); v.addColorStop(0,'#6ab8f0'); v.addColorStop(1,'#d8f0ff'); g.fillStyle=v; g.fillRect(0,0,384,288);
    g.fillStyle='#ffffff'; [[80,60,26],[112,54,34],[146,64,22],[290,40,20],[318,46,26]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); });
    g.fillStyle='#5a9a48'; g.beginPath(); g.ellipse(80,210,190,60,0,0,7); g.fill(); g.beginPath(); g.ellipse(330,205,170,48,0,0,7); g.fill();
    g.fillStyle='#84c058'; g.fillRect(0,196,384,92);
    /* Pferd ganz in einer Fensterhälfte (frei von Sprossen und Vorhängen): Rumpf, Hals, Kopf mit zwei Ohren */
    const x=pferdX, form=(P,f)=>{ g.fillStyle=f; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(x+p[0],p[1]):g.moveTo(x+p[0],p[1])); g.closePath(); g.fill(); };
    const oval=(a,b,rx,ry,w,f)=>{ g.fillStyle=f; g.beginPath(); g.ellipse(x+a,b,rx,ry,w,0,7); g.fill(); };
    [-36,-24,0,11].forEach(a=>{ g.fillStyle='#8a4e28'; g.fillRect(x+a-4,198,8,38); g.fillStyle='#24160c'; g.fillRect(x+a-4,231,8,7); });
    g.strokeStyle='#24160c'; g.lineWidth=9; g.lineCap='round'; g.beginPath(); g.moveTo(x-40,184); g.quadraticCurveTo(x-56,194,x-50,222); g.stroke();
    oval(-13,192,33,18,0,'#8a4e28');
    form([[-2,180],[19,140],[37,146],[34,160],[18,198]],'#8a4e28');
    form([[22,142],[21,121],[31,139]],'#8a4e28'); form([[32,140],[39,122],[41,146]],'#8a4e28');
    oval(39,153,19,11,.5,'#8a4e28'); oval(51,160,8,7,.5,'#4a2a1a');
    g.strokeStyle='#24160c'; g.lineWidth=7; g.beginPath(); g.moveTo(x+21,140); g.quadraticCurveTo(x+6,156,x-5,180); g.stroke();
    oval(34,148,3,3,0,'#100a06');
    g.fillStyle='#f6efe0'; g.fillRect(0,243,384,8); g.fillRect(0,262,384,8); for(let i=10;i<384;i+=62) g.fillRect(i,234,11,50); });
}
/* gemaltes Pferdeporträt */
function portraetBild(fell,maehne,grund){
  return bild(256,256,(g)=>{ g.fillStyle=grund; g.fillRect(0,0,256,256);
    g.fillStyle=fell; g.beginPath(); g.moveTo(40,256); g.quadraticCurveTo(60,150,112,86); g.quadraticCurveTo(140,62,166,78); g.lineTo(222,150); g.quadraticCurveTo(226,182,196,184); g.quadraticCurveTo(168,170,150,160); g.quadraticCurveTo(146,210,172,256); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(112,92); g.lineTo(112,36); g.lineTo(142,76); g.fill(); g.beginPath(); g.moveTo(140,76); g.lineTo(160,34); g.lineTo(166,82); g.fill();
    g.strokeStyle=maehne; g.lineWidth=24; g.lineCap='round'; g.beginPath(); g.moveTo(126,76); g.quadraticCurveTo(62,130,48,244); g.stroke();
    g.fillStyle='#14100c'; g.beginPath(); g.arc(156,108,8,0,7); g.fill(); g.beginPath(); g.arc(206,160,6,0,7); g.fill();
    g.fillStyle='#ffffff'; g.beginPath(); g.arc(159,105,3,0,7); g.fill(); });
}

/* ---------- Sattel: Sitzfläche über y=0, Länge entlang x (vorn = +x) ---------- */
function sattelForm(g,leder,dunkel,decke,buegel){
  /* Satteldecke: flaches eckiges Tuch, oben aufgelegt, an beiden Seiten gerade herunterhängend, mit Borte */
  box(g,1.76,.06,.84,decke,0,-.01,0);
  [-1,1].forEach(s=>{
    const q=gruppe(g,0,0,s*.4); q.rotation.x=-s*.28;
    box(q,1.76,.74,.05,decke,0,-.37,0); box(q,1.78,.07,.065,GOLD,0,-.71,0); [-.85,.85].forEach(x=>box(q,.07,.74,.065,GOLD,x,-.37,0));
    /* langes flaches Sattelblatt, unten abgerundet, mit dunklem Rand dahinter */
    box(q,.9,.58,.04,HOLZ3,.1,-.24,s*.045); ball(q,.45,HOLZ3,.1,-.52,s*.045,1,.52,.045);
    box(q,.8,.56,.05,leder,.1,-.24,s*.07); ball(q,.4,leder,.1,-.51,s*.07,1,.5,.065);
    box(q,.16,.46,.05,dunkel,.4,-.28,s*.1); ball(q,.08,dunkel,.4,-.51,s*.1,1,1,.32);
  });
  /* flache Sitzfläche */
  ball(g,.42,leder,-.02,.15,0,1.8,.36,1.15);
  ball(g,.34,dunkel,-.03,.25,0,1.65,.27,.92);
  /* Vorderzwiesel: hoch und schmal mit Knauf */
  const v=rohr(g,.1,.2,.52,dunkel,.66,.44,0,14); v.rotation.z=-.18; ball(g,.15,leder,.71,.72,0,1,.85,1.2); ball(g,.06,GOLD,.73,.86,0);
  /* Hinterzwiesel: breite, hohe, geschwungene Lehne */
  const h=gruppe(g,-.74,.22,0); h.rotation.z=.2; ball(h,.38,dunkel,0,.16,0,.36,1.1,1.45); strich(h,[0,.55,-.2],[0,.55,.2],.075,leder); [-1,1].forEach(s=>{ ball(h,.075,leder,0,.55,s*.2); strich(h,[0,.55,s*.2],[0,.26,s*.52],.065,leder); });
  if(buegel) [-1,1].forEach(s=>{ strich(g,[.02,.2,s*.5],[.05,-.2,s*.64],.05,HOLZ3); strich(g,[.05,-.2,s*.64],[.07,-.88,s*.82],.05,HOLZ3); box(g,.16,.13,.05,GOLD,.06,-.55,s*.77);
    ring(g,.21,.05,0xd0d8e0,.07,-1.07,s*.82); box(g,.46,.09,.17,METALL,.07,-1.28,s*.82); });
}

/* ---------- Ausgang: die Deckenluke mit Leiter ---------- */
function baueLuke(k,sc,hinten,wandTex){
  /* unter der Luke bleibt die Wand mit Holzvertäfelung, dahinter liegt der Heuboden */
  PH.mauer(hinten,wandTex,2.5,2.2,.5,AX,1.1,HINTEN-.25);
  const blick=new THREE.Mesh(new THREE.PlaneGeometry(9,6.4),basis(0xffffff,{map:heubodenBild()})); blick.position.set(AX,3.2,HINTEN-1.5); hinten.add(blick);
  const r=gruppe(hinten,AX,0,HINTEN);
  box(r,2.5,1.5,.08,HOLZ,0,.75,.02);
  [-1,1].forEach(s=>{ box(r,.32,2.75,.36,HELLHOLZ,s*1.46,3.3,.1); box(r,.07,2.5,.06,GOLD,s*1.66,3.3,.28); });
  box(r,3.34,.28,.36,HELLHOLZ,0,4.58,.1); box(r,3.34,.24,.36,HELLHOLZ,0,2.08,.12);
  /* Deckenbretter über der Luke: so ist klar, dass es nach oben auf den Boden geht */
  box(r,5.4,.26,.62,HOLZ3,0,4.9,.28); for(let i=0;i<9;i++) box(r,.5,.12,.66,i%2?HOLZ2:HOLZ,-2.4+i*.6,5.09,.28);
  [-2.3,2.3].forEach(x=>strich(r,[x,3.9,.06],[x*.86,4.82,.46],.09,HOLZ3));
  /* Stroh quillt oben über die Decke */
  for(let i=0;i<46;i++){ const m=hell(box(r,.34+zufall()*.35,.025,.025,i%3?STROH:STROH2,-2.4+zufall()*4.8,5.17+zufall()*.16,.4+zufall()*.2)); m.rotation.z=(zufall()-.5)*.9; m.rotation.y=(zufall()-.5)*1.2; }
  for(let i=0;i<14;i++){ const m=hell(box(r,.022,.24+zufall()*.26,.022,i%3?STROH:STROH2,-1.2+zufall()*2.4,2.28,.18+zufall()*.2)); m.rotation.z=(zufall()-.5)*1.6; }
  /* Leiter */
  [-.82,.82].forEach(x=>{ strich(r,[x,0,.5],[x,2.72,.42],.09,HELLHOLZ); ball(r,.14,GOLD,x,2.76,.42); });
  for(let i=1;i<=5;i++){ const y=i*.44, z=.5-y*.03; box(r,1.66,.1,.2,i%2?HELLHOLZ:0xdcae74,0,y,z); }
  verschmelze(r);
  /* Klappe: Drehpunkt oben */
  const kl=gruppe(hinten,AX,4.44,HINTEN+.26); kl.userData.lebendig=true;
  [-1.04,-.52,0,.52,1.04].forEach((x,i)=>box(kl,.5,2.24,.13,i%2?0xa86228:0xc07a38,x,-1.13,0));
  [-.28,-1.98].forEach(y=>{ box(kl,2.62,.18,.07,EISEN,0,y,.09); [-1.1,-.55,.55,1.1].forEach(x=>ball(kl,.05,METALL,x,y,.14)); });
  [-.85,.85].forEach(x=>quer(walze(kl,.09,.4,EISEN,x,-.03,.08)));
  [-1,1].forEach(s=>box(kl,.06,2.24,.04,GOLD,s*1.3,-1.13,.08));
  box(kl,1.38,1.1,.07,HOLZ3,0,-1.17,.09);
  const schloss=PH.zahlenschloss(kl,0,-1.3,.24); schloss.scale.setScalar(1.3);
  verschmelze(kl);
  const glanz=schein(hinten,'rgba(255,225,110,.5)',AX,3.15,HINTEN+.7,1.2);
  const licht=new THREE.PointLight(0xffd878,.25,9,1.5); licht.position.set(AX,3.6,-12.3); sc.add(licht);
  k.kasten(AX,-13.0,3.4,1.7); /* geschlossene Luke und Leiter: beim Öffnen läuft die Figur ohne Wegsuche hin */
  return ausgang(k,{ name:'Deckenluke', steh:[AX,-10.8], durch:[AX,-12.42], hoch:2.25,
    treffer:{x:AX,y:2.5,z:-12.9,b:3.4,h:5.0,t:1.0}, schildOben:[AX,5.1,-12.2], glanz:[AX,3.15,-12.6],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.05)/.88)); kl.rotation.x=-2.25*a*a*(3-2*a); glanz.visible=auf<.05; licht.intensity=.25+1.1*auf; } });
}

/* ---------- Wandschmuck ---------- */
/* Fenster zur Wiese, Mitte (x, y=3.2), Blick nach +z */
function fenster(par,x,pferdX){
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(2.6,1.9),basis(0xffffff,{map:wiesenBild(pferdX)})); aus.position.set(x,3.2,HINTEN+.04); par.add(aus);
  const f=gruppe(par,x,0,HINTEN);
  [-1,1].forEach(s=>{ box(f,.18,2.2,.24,HELLHOLZ,s*1.38,3.2,.11); });
  box(f,2.94,.18,.24,HELLHOLZ,0,4.24,.11); box(f,3.16,.16,.52,HELLHOLZ,0,2.16,.26);
  box(f,.08,1.9,.08,HELLHOLZ,0,3.2,.1); box(f,2.6,.08,.08,HELLHOLZ,0,3.42,.1);
  /* karierte Vorhänge */
  [-1,1].forEach(s=>{ for(let i=0;i<3;i++){ const v=box(f,.2,1.75-i*.1,.07,i%2?CREME:ROT,s*(1.34-i*.18),3.28+i*.05,.27+(i%2)*.04); v.rotation.z=s*i*.03; } box(f,.62,.09,.14,GOLD,s*1.18,2.86,.3); });
  strich(f,[-1.7,4.34,.3],[1.7,4.34,.3],.045,HOLZ3); [-1.72,1.72].forEach(a=>ball(f,.09,GOLD,a,4.34,.3));
  verschmelze(f);
}
/* Spatz auf dem Fensterbrett, hüpft und pickt */
function spatz(k,par,x,y,z){
  const g=gruppe(par,x,y,z); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0);
  ball(r,.17,0x9a6434,0,.2,0,1.35,1,.95); ball(r,.12,0xe8d4b0,.07,.16,.05,1.1,.9,.95); ball(r,.11,0x6a4020,-.06,.25,.1,1.5,.55,.5);
  strich(r,[-.18,.22,0],[-.4,.33,0],.045,0x5a3418); [-.06,.06].forEach(a=>strich(r,[.0,.12,a],[.02,0,a],.015,ORANGE));
  verschmelze(r);
  const kopf=gruppe(g,.18,.36,0);
  ball(kopf,.115,0x8a5228,0,0,0); ball(kopf,.075,0xf0e0c0,.05,-.035,.04); [-1,1].forEach(s=>ball(kopf,.024,SCHWARZ,.06,.025,s*.095)); const s=kegel(kopf,.04,.11,GELB,.14,-.01,0); s.rotation.z=-Math.PI/2;
  verschmelze(kopf);
  k.anim.push(t=>{ const u=t%5; g.position.y=y+(u<1?Math.abs(Math.sin(u*Math.PI*3))*.13:0); kopf.rotation.z=(u>2.6&&u<3.8)?-Math.abs(Math.sin(u*9))*.6:0; kopf.rotation.y=Math.sin(t*1.7)*.5; });
}
/* grüne Wandlampe: Arm, Schirm, Birne. Blick nach +z */
function lampe(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  flach(walze(g,.2,.08,EISEN,0,.5,.06)); strich(g,[0,.5,.06],[0,.72,.4],.04,EISEN); strich(g,[0,.72,.4],[0,.4,.72],.04,EISEN);
  kuppel(g,.5,LAMPGRUEN,0,.02,.72,1,.85,1); flach(ring(g,.5,.04,GOLD,0,.02,.72)); ball(g,.1,GOLD,0,.45,.72);
  hell(ball(g,.17,basis(0xffeaa0),0,-.04,.72)); schein(g,'rgba(255,214,130,.6)',0,-.12,.82,1.7);
}
/* Sattelhalter hoch an der Wand mit Sattel (Deko). Blick nach +z */
function sattelhalter(par,x,y,z,dreh,leder,dunkel,decke){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,.5,.9,.12,HOLZ3,0,-.35,.08);
  box(g,.34,.16,1.0,HOLZ2,0,-.14,.55); strich(g,[0,-.75,.12],[0,-.2,.85],.07,HOLZ2);
  box(g,1.1,.14,.5,HOLZ,0,-.07,.62);
  const s=gruppe(g,0,.12,.62); s.scale.set(.88,.88,.74); sattelForm(s,leder,dunkel,decke,false);
}
/* Pferdedecke über einer Stange. Blick nach +z */
function deckenStange(par,x,y,z,dreh,farbe,streif){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  [-1.15,1.15].forEach(a=>{ strich(g,[a,0,0],[a,0,.42],.06,HOLZ3); ball(g,.1,GOLD,a*1.08,0,.42); });
  quer(walze(g,.07,2.5,HOLZ2,0,0,.42));
  quer(walze(g,.13,1.9,farbe,0,.02,.42));
  box(g,1.9,1.35,.09,farbe,0,-.67,.53); box(g,1.9,.9,.07,farbe,0,-.45,.31);
  [-.5,-1.05].forEach(v=>box(g,1.92,.12,.11,streif,0,v,.535)); box(g,1.92,.05,.115,CREME,0,-.72,.535);
  for(let i=0;i<13;i++) box(g,.05,.17,.04,CREME,-.9+i*.15,-1.42,.53);
}
/* aufgerollter Führstrick an einem Holzzapfen. Blick nach +z */
function strickHaken(par,x,y,z,dreh,farbe){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,.46,.46,.08,HOLZ3,0,.05,.05); flach(walze(g,.08,.36,HELLHOLZ,0,.05,.22)); ball(g,.1,GOLD,0,.05,.42);
  [[0,.4,.2],[.04,.35,.27],[-.03,.45,.33]].forEach(([a,r,t])=>ring(g,r,.045,farbe,a,.08-r,t).scale.x=.8);
  box(g,.16,.12,.14,CREME,0,.05,.31); strich(g,[.16,-.72,.28],[.2,-1.05,.28],.04,farbe); box(g,.1,.16,.08,METALL,.21,-1.11,.28);
}
/* gerahmtes Pferdebild. Blick nach +z */
function bildRahmen(par,x,y,z,dreh,fell,maehne,grund){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,1.9,1.9,.1,GOLD,0,0,.07); box(g,1.66,1.66,.06,HOLZ3,0,0,.11); PH.tafel(g,portraetBild(fell,maehne,grund),1.5,1.5,0,0,.15);
}
/* Reihe Hufeisen an einem Brett */
function hufeisen(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,2.6,.8,.08,HOLZ3,0,0,.06);
  [-.82,0,.82].forEach((a,i)=>{ const h=ring(g,.25,.065,i===1?GOLD:METALL,a,0,.15,4.7); h.rotation.z=-.78; [[-.17,.17],[.17,.17],[0,.25]].forEach(([c,d])=>ball(g,.025,EISEN,a+c,d,.2)); });
}
/* Wandbrett mit Holzkästen und Bürsten */
function buerstenBrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,3.0,.12,.55,HELLHOLZ,0,0,.28); [-1.2,1.2].forEach(a=>strich(g,[a,-.6,.05],[a,-.05,.45],.055,HOLZ3));
  [[-1.0,ROT],[-.35,BLAU]].forEach(([a,f])=>{ box(g,.52,.48,.4,f,a,.3,.27); box(g,.56,.09,.44,CREME,a,.57,.27); box(g,.22,.14,.02,GOLD,a,.28,.48); });
  [.4,1.1].forEach((a,i)=>{ ball(g,.27,i?HOLZ:HOLZ2,a,.28,.28,1.15,.45,.65); for(let j=0;j<7;j++) box(g,.04,.17,.3,i?CREME:GELB,a-.24+j*.08,.14,.28); box(g,.4,.06,.08,LEDER2,a,.42,.28); });
}
/* Balken auf den Wänden */
function gebaelk(hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0), zi=HINTEN+.12;
  [-17.78,-9.15,-2.55,2.55,7.9,12.55,17.78].forEach(x=>{ box(h,.3,H,.2,HOLZ2,x,H/2,zi); });
  box(h,B,.28,.24,HOLZ3,0,6.15,zi+.02);
  [-9.15,7.9,12.55].forEach(x=>[-1,1].forEach(v=>strich(h,[x+v*.1,5.2,zi+.06],[x+v*.9,6.05,zi+.06],.08,HOLZ2)));
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.12);
    [-13.2,-7,-3,1,5,9,13].forEach(z=>box(w,.2,H,.28,HOLZ2,x,H/2,z));
    box(w,.24,.28,T,HOLZ3,x,6.15,0); });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Deko am Boden (nichts davon ist ein Gegenstand) ---------- */
function kanne(par,x,z,gr){
  const g=gruppe(par,x,0,z); g.scale.setScalar(gr||1);
  walze(g,.42,1.05,METALL,0,.53,0); rohr(g,.24,.42,.34,METALL,0,1.22,0); walze(g,.24,.24,METALL,0,1.5,0); walze(g,.32,.1,METALL2,0,1.66,0); ball(g,.08,METALL2,0,1.76,0);
  [.14,.98].forEach(y=>flach(ring(g,.43,.035,METALL2,0,y,0))); [-1,1].forEach(s=>ring(g,.15,.035,METALL2,s*.42,1.18,0));
}
function fass(par,x,z){
  const g=gruppe(par,x,0,z);
  rohr(g,.62,.52,.7,HOLZ,0,.35,0); rohr(g,.52,.62,.7,HOLZ,0,1.05,0); walze(g,.47,.06,HOLZ2,0,1.41,0);
  [.14,.55,.85,1.28].forEach(y=>flach(ring(g,y>.4&&y<1?.61:.55,.04,EISEN,0,y,0)));
}
function kiste(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,1.7,.1,1.1,HOLZ2,0,.1,0);
  [.34,.66].forEach(y=>{ [-.55,.55].forEach(c=>box(g,1.7,.24,.08,HELLHOLZ,0,y,c)); [-.82,.82].forEach(s=>box(g,.08,.24,1.1,HELLHOLZ,s,y,0)); });
  [-.84,.84].forEach(s=>[-.55,.55].forEach(c=>box(g,.13,.84,.13,HOLZ,s,.42,c)));
  box(g,1.55,.34,.95,HOLZ2,0,.4,0);
  /* Möhren mit Grün */
  for(let i=0;i<11;i++){ const x2=-.6+(i%6)*.24+(i>5?.12:0), z2=(i>5?.22:-.18)+(i%3)*.05, m=kegel(g,.11,.55,ORANGE,x2,.7+(i%2)*.07,z2); m.rotation.x=Math.PI/2+.25; m.rotation.z=(i%3-1)*.2;
    [-.07,0,.07].forEach(a=>strich(g,[x2,.76+(i%2)*.07,z2-.24],[x2+a,.99+(i%2)*.07,z2-.42],.022,GRUEN)); }
}
function bank(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-.3,0,.3].forEach((c,i)=>box(g,3.2,.12,.28,i%2?HOLZ:HELLHOLZ,0,.75,c));
  [-1.35,1.35].forEach(a=>{ box(g,.18,.7,.85,HOLZ2,a,.35,0); }); box(g,2.6,.1,.12,HOLZ3,0,.3,0);
  box(g,.9,.1,.82,ROT,-.9,.86,0); [-1.15,-.9,-.65].forEach(a=>box(g,.07,.11,.84,CREME,a,.862,0));
}
function karre(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,1.5,.1,1.0,GRUEN,0,.62,0); [-.52,.52].forEach(c=>{ const w=box(g,1.7,.55,.08,GRUEN,0,.9,c); w.rotation.x=c>0?.18:-.18; }); [-.82,.82].forEach(a=>{ const w=box(g,.08,.55,1.05,GRUEN,a,.9,0); w.rotation.z=a>0?-.22:.22; });
  const rad=gruppe(g,.85,.38,0); ring(rad,.28,.1,SCHWARZ,0,0,0); flach(walze(rad,.13,.18,METALL,0,0,0));
  [-.38,.38].forEach(c=>{ strich(g,[.85,.38,c*.4],[.2,.62,c],.04,EISEN); strich(g,[-.5,0,c],[-.5,.6,c],.05,EISEN); strich(g,[-.6,.62,c],[-1.45,.85,c],.045,EISEN); strich(g,[-1.3,.81,c],[-1.55,.88,c],.075,ROT); });
  for(let i=0;i<40;i++){ const m=box(g,.3+zufall()*.3,.035,.035,i%3?STROH:STROH2,(zufall()-.5)*1.15,1.0+zufall()*.22,(zufall()-.5)*.7); m.rotation.y=zufall()*3.1; m.rotation.z=(zufall()-.5)*.6; }
  ball(g,.55,STROH2,0,.82,0,1.25,.5,.75);
}
function besen(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  strich(g,[0,.3,.1],[0,2.5,-.35],.055,HOLZ); box(g,.8,.18,.28,ROT,0,.34,.1); for(let i=0;i<11;i++) box(g,.055,.28,.22,i%2?STROH2:GELB,-.35+i*.07,.14,.1);
}
/* Korb mit Äpfeln */
function apfelkorb(par,x,z){
  const g=gruppe(par,x,0,z);
  rohr(g,.6,.45,.45,0xb88a50,0,.23,0,18,true); walze(g,.46,.06,0x8a6030,0,.04,0); [.14,.3].forEach(y=>flach(ring(g,.5+y*.22,.025,0x8a6030,0,y,0))); flach(ring(g,.61,.05,0x8a6030,0,.46,0));
  walze(g,.52,.06,0x8a6030,0,.32,0);
  [[-.28,-.12],[.05,-.28],[.3,-.05],[-.12,.2],[.2,.24],[0,0]].forEach(([a,c],i)=>{ const y=i===5?.62:.48; ball(g,.17,i%3===1?0x7ab838:0xd03828,a,y,c,1,.92,1); strich(g,[a,y+.13,c],[a+.04,y+.23,c],.014,HOLZ3); });
}
/* kleiner Schemel mit drei Beinen */
function schemel(par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,.48,.14,HELLHOLZ,0,.6,0); flach(ring(g,.48,.03,HOLZ,0,.6,0));
  [0,1,2].forEach(i=>{ const a=i*2.094+.5; strich(g,[Math.cos(a)*.46,0,Math.sin(a)*.46],[Math.cos(a)*.24,.56,Math.sin(a)*.24],.07,HOLZ2); });
}
/* Strohhaufen: dunkler kantiger Kern, ringsum außen viele helle Halme. liste sammelt die Halme für eine gemeinsame Instanz-Gruppe */
function haufen(par,liste,x,z){
  const farben=[0xf8dc80,STROH,0xd8ac38,0xfce8a0,STROH2];
  [[0,0,0,.72,.92,.6,120],[.38,0,.16,.45,.55,.42,50]].forEach(([dx,y,dz,a,h,c,n])=>{
    const kern=teil(par,new THREE.IcosahedronGeometry(1,0),0x8a661a,x+dx,y,z+dz,a*.86,h*.84,c*.86); kern.rotation.y=x*1.7+dx;
    for(let i=0;i<n;i++){ const az=i*2.39996+zufall()*.4, el=Math.asin(Math.min(.99,(i+.5)/n))+(zufall()-.5)*.12, r=1+zufall()*.1, l=.24+zufall()*.26;
      liste.push([x+dx+Math.cos(el)*Math.cos(az)*a*r, y+Math.max(.04,Math.sin(el))*h*r, z+dz+Math.cos(el)*Math.sin(az)*c*r, l,.024,.03, farben[i%5],
        -az+(zufall()-.5)*1.5, 0, -(1.45-el)*.6+(zufall()-.5)*.8]); }
  });
}

function baue(k){
  const sc=k.scene, wandTex=PH.bretterBild([70,108,84],'#1c3024');
  const h=PH.huelle(k,{ B,T,H, himmelLicht:0xfff2d8, grund:0x5a4630, staerke:.8, sonne:0xffeac4, sonneStaerke:.4,
    wandBild:wandTex, bodenBild:PH.dielenBild([156,108,66],'#38200e'), leiste:HOLZ3, sockel:1.5, sockelFarbe:0x8a542a, oeffnung:{x:AX,b:2.5,h:4.45} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueLuke(k,sc,hinten,wandTex);
  gebaelk(hinten,links,rechts);

  /* v = alles, was am Boden steht (eine Gruppe, damit gleiche Farben zusammengefasst werden) */
  const v=gruppe(sc,0,0,0);

  /* ---------- Deko an der Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  fenster(dh,-14.2,122); fenster(dh,14.5,256);
  spatz(k,hinten,-13.75,2.25,HINTEN+.38);
  bildRahmen(dh,-10.9,3.35,HINTEN,0,'#d0a05a','#5a3a20','#7ac0d8');
  strickHaken(dh,16.95,3.7,HINTEN,0,ROT);
  lampe(dh,-4.0,3.55,HINTEN-.01); lampe(dh,3.5,3.55,HINTEN-.01); lampe(dh,7.9,4.1,HINTEN+.2);
  hufeisen(dh,5.5,4.75,HINTEN,0);
  hufeisen(dh,-6.9,4.85,HINTEN,0);
  PH.ballen(v,-16.7,0,-12.55,1.9,.8,1.1,0); PH.ballen(v,-16.8,.8,-12.6,1.6,.75,.95,.06); k.kasten(-16.7,-12.55,2.0,1.2);
  kanne(v,-14.5,-12.65); kanne(v,-13.4,-12.55,.8); k.kasten(-14.0,-12.6,2.0,1.0);
  fass(v,-11.0,-12.65); k.kreis(-11.0,-12.65,.66);
  karre(v,14.1,-12.45,0); k.kasten(14.1,-12.45,3.2,1.3);
  PH.ballen(v,16.95,0,-12.5,1.6,.8,1.15,-.05); k.kasten(16.95,-12.5,1.75,1.25);
  besen(v,2.35,-12.85,0); k.kasten(2.35,-12.9,.85,.7);

  /* ---------- Deko links ---------- */
  const dl=gruppe(links,0,0,0), LX=-B/2, LD=Math.PI/2;
  buerstenBrett(dl,LX,3.45,-9.0,LD);
  strickHaken(dl,LX,3.75,-1.6,LD,BLAU); strickHaken(dl,LX,3.75,-.2,LD,GELB); hufeisen(dl,LX,2.35,-1.0,LD);
  sattelhalter(dl,LX,3.6,7.0,LD,0xa86428,0x6a3a14,TUERKIS);
  deckenStange(dl,LX,3.3,-5.0,LD,ROT,GELB); deckenStange(dl,LX,3.3,3.0,LD,BLAU,CREME);
  bildRahmen(dl,LX,3.5,11.0,LD,'#e8e2d6','#8a847c','#8a5a9a');
  hufeisen(dl,LX,2.35,-9.0,LD); buerstenBrett(dl,LX,2.15,7.0,LD);
  lampe(dl,LX,4.2,-11.8,LD); lampe(dl,LX,4.2,-3.0,LD); lampe(dl,LX,4.2,5.0,LD);
  PH.ballen(v,-17.05,0,-9.0,2.4,.8,1.2,LD); PH.ballen(v,-17.1,.8,-9.3,1.6,.7,1.0,LD+.07); k.kasten(-17.05,-9.0,1.35,2.6);
  fass(v,-17.05,-5.0); kanne(v,-17.1,-3.5,.9); k.kasten(-17.05,-4.4,1.4,2.7);
  bank(v,-17.0,1.0,LD); k.kasten(-17.0,1.0,1.1,3.4);
  kiste(v,-17.0,6.8,LD); k.kasten(-17.0,6.8,1.3,1.9);
  PH.ballen(v,-17.0,0,10.9,2.2,.8,1.2,LD); k.kasten(-17.0,10.9,1.35,2.35);

  /* ---------- Deko rechts ---------- */
  const dr=gruppe(rechts,0,0,0), RX=B/2, RD=-Math.PI/2;
  sattelhalter(dr,RX,3.6,-5.0,RD,0xa86428,0x6a3a14,LILA);
  strickHaken(dr,RX,3.75,2.3,RD,GRUEN); strickHaken(dr,RX,3.75,3.7,RD,ORANGE);
  sattelhalter(dr,RX,3.6,11.0,RD,0x4a2a16,0x2c180c,BLAU);
  deckenStange(dr,RX,3.3,-9.0,RD,TUERKIS,CREME); deckenStange(dr,RX,3.3,7.0,RD,ORANGE,HOLZ3);
  bildRahmen(dr,RX,3.5,-1.0,RD,'#8a4e28','#24160c','#9ac870');
  buerstenBrett(dr,RX,2.15,-5.0,RD); hufeisen(dr,RX,2.35,3.0,RD);
  lampe(dr,RX,4.2,-11.0,RD); lampe(dr,RX,4.2,1.0,RD); lampe(dr,RX,4.2,9.0,RD);
  kiste(v,17.0,-9.0,RD); k.kasten(17.0,-9.0,1.3,1.9);
  PH.ballen(v,17.05,0,-5.2,2.3,.8,1.2,RD); PH.ballen(v,17.1,.8,-4.9,1.5,.7,1.0,RD-.08); k.kasten(17.05,-5.2,1.35,2.45);
  fass(v,17.05,-1.2); k.kreis(17.05,-1.2,.66);
  bank(v,17.0,3.0,RD); k.kasten(17.0,3.0,1.1,3.4);
  fass(v,17.05,7.0); kanne(v,17.1,8.5,.9); k.kasten(17.05,7.6,1.4,2.7);
  karre(v,16.9,11.2,RD); k.kasten(16.9,11.2,1.35,3.2);
  [dh,dl,dr].forEach(g=>{ verschmelze(g); ohneSchatten(g); });

  /* ---------- Deko vorn (niedrig) ---------- */
  PH.ballen(v,-13.6,0,12.2,2.4,.85,1.25,.05); PH.ballen(v,-11.4,0,12.35,1.5,.7,1.0,-.12); k.kasten(-12.8,12.25,4.3,1.4);
  bank(v,-6.2,12.3,0); k.kasten(-6.2,12.3,3.4,1.1);
  kiste(v,4.8,12.25,.08); k.kasten(4.8,12.25,1.95,1.35);
  fass(v,7.8,12.2); k.kreis(7.8,12.2,.66);
  karre(v,11.0,12.2,Math.PI); k.kasten(11.0,12.2,3.2,1.3);
  PH.ballen(v,14.4,0,12.2,2.0,.85,1.2,-.06); k.kasten(14.4,12.2,2.15,1.35);
  kanne(v,2.5,12.35,.85); k.kreis(2.5,12.35,.42);

  /* niedrige Kleinigkeiten an den Seiten */
  [[-14.6,-.9],[13.9,-1.0],[-13.6,8.2]].forEach(([x,z])=>{ apfelkorb(v,x,z); k.kreis(x,z,.62); });
  [[-13.9,1.2],[13.2,5.4],[-8.8,10.6]].forEach(([x,z])=>{ schemel(v,x,z); k.kreis(x,z,.48); });
  const stroh=[];
  [[13.4,-4.1],[-13.7,5.9],[12.9,8.2],[-9.2,-11.0]].forEach(([x,z])=>{ haufen(v,stroh,x,z); k.kreis(x,z,.88); });
  PH.viele(sc,GEO.box,stroh);
  verschmelze(v);

  /* loses Stroh bei den Ballen */
  PH.halme(sc,-15.4,-11.4,1.0,40); PH.halme(sc,-15.8,-8.6,.9,35); PH.halme(sc,15.8,-5.6,.9,35); PH.halme(sc,-12.6,11.0,1.1,40); PH.halme(sc,13.8,11.0,1.0,35);

  /* ---------- warmes Licht ---------- */
  flacker(k,-8.5,4.0,-9.6,0xffc468,.45,13); flacker(k,8.5,4.0,-9.6,0xffc468,.45,13);
  flacker(k,-11.5,4.2,3.0,0xffca78,.35,13); flacker(k,11.5,4.2,3.0,0xffca78,.35,13);

  /* ---------- Tiere ---------- */
  katze(k,[[-7.6,6.6],[-2.6,8.4],[7.0,7.8],[8.0,9.8],[-7.4,9.9]],1.4);
  maeuschen(k,[[-14.6,-8.2],[-10.2,-9.8],[-8.4,-7.4],[-12.4,-6.6]],1.5,0);
  maeuschen(k,[[8.0,-8.6],[14.2,-8.8],[13.4,-7.0],[9.0,-6.8]],1.7,4);

  return { tuer, start:[0,-.6] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.2,-10.2],[-8.8,-8.6],[-15.0,-6.4],[-6.8,-2.4],[-2.0,-7.2],[2.6,-8.8],[8.2,-9.6],[13.6,-10.2],[14.6,-2.2],[7.6,-2.4],
  [0,3.4],[-8.0,1.2],[-14.8,2.8],[-12.0,7.8],[-7.2,6.4],[-2.6,9.4],[2.4,7.2],[8.2,5.8],[14.6,7.8],[12.4,.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-4.1, z:-4.9, dreh:.18, steh:[-3.7,-2.7], kasten:[2.9,1.9], treffer:[2.8,2.8,1.8], baue(g,k){ /* 1 Sattel auf dem Sattelbock */
      [-.98,.98].forEach(x=>{ [-1,1].forEach(s=>{ strich(g,[x*1.12,0,s*.72],[x,1.4,s*.06],.1,HELLHOLZ); ball(g,.12,HOLZ3,x*1.12,.08,s*.72,1,.7,1); }); strich(g,[x*1.06,.5,-.47],[x*1.06,.5,.47],.07,HOLZ); });
      strich(g,[-1.04,.5,0],[1.04,.5,0],.08,HOLZ);
      [-1,1].forEach(s=>{ const b=box(g,2.35,.12,.56,HOLZ,0,1.3,s*.22); b.rotation.x=s*.55; });
      quer(walze(g,.14,2.4,HOLZ2,0,1.45,0));
      const s=gruppe(g,0,1.66,0); s.scale.set(1.12,1.12,1.05); sattelForm(s,0xa85420,0x6e2e10,0x2a62b0,true); } },
  { x:-6.95, z:HINTEN, wand:'hinten', steh:[-6.95,-11.4], kasten:[3.6,.8], treffer:[3.5,3.4,.8], trefferY:.95, baue(g,k){ /* 2 Trensen am Brett */
      box(g,3.4,3.1,.08,0xeed8a8,0,2.65,.12);
      [-1,1].forEach(s=>box(g,.14,3.26,.14,HOLZ2,s*1.74,2.65,.16)); [1.06,4.24].forEach(y=>box(g,3.62,.14,.14,HOLZ2,0,y,.16));
      box(g,3.3,.24,.14,HOLZ,0,3.94,.22);
      [[-1.08,0x7a3c14],[0,0x2e1a10],[1.08,0x9a4a1c]].forEach(([x,L])=>{
        flach(walze(g,.09,.3,HOLZ3,x,3.9,.4)); ball(g,.1,GOLD,x,3.9,.56);
        const t=gruppe(g,x,0,.36);
        /* Genickstück oben breit, Backenstücke laufen nach unten schmal zusammen */
        ring(t,.34,.048,L,0,3.52,0,Math.PI);
        [-1,1].forEach(s=>{ strich(t,[s*.34,3.52,0],[s*.31,3.12,.02],.042,L); strich(t,[s*.31,3.12,.02],[s*.14,2.24,.04],.042,L); ball(t,.045,L,s*.31,3.12,.02); box(t,.1,.09,.04,GOLD,s*.33,3.4,.05);
          /* Stirnriemen, leicht nach unten geschwungen */
          strich(t,[s*.33,3.46,.04],[0,3.34,.05],.036,L);
          /* Gebissring ganz unten, daran der Zügel */
          ring(t,.095,.028,METALL,s*.22,2.18,.06);
          strich(t,[s*.28,2.11,.08],[s*.42,1.68,.09],.034,L); });
        ball(t,.05,GOLD,0,3.34,.07);
        /* Kehlriemen als Bogen, Nasenriemen als geschlossene Schlaufe */
        const kehl=ring(t,.31,.028,L,0,3.12,.01,Math.PI); kehl.rotation.z=Math.PI; kehl.scale.y=.62;
        ring(t,.21,.05,L,0,2.58,.06).scale.y=.34;
        /* Gebiss: eine waagerechte Stange */
        strich(t,[-.13,2.18,.06],[.13,2.18,.06],.036,METALL);
        const z=ring(t,.42,.034,L,0,1.68,.09,Math.PI); z.rotation.z=Math.PI; z.scale.y=1.1; box(t,.14,.1,.07,GOLD,0,1.22,.09);
      }); } },
  { x:5.55, z:-12.7, steh:[5.55,-10.9], kasten:[2.5,1.1], treffer:[2.4,3.5,1.1], baue(g,k){ /* 3 Spind */
      const F=0x3f86c8, D=0x245a90;
      [-.9,.9].forEach(x=>[-.3,.3].forEach(z=>box(g,.22,.2,.2,EISEN,x,.1,z)));
      box(g,2.25,3.05,.85,D,0,1.72,0); box(g,2.36,.14,.95,METALL,0,3.31,0);
      [-1,1].forEach(s=>{ box(g,1.04,2.86,.08,F,s*.545,1.72,.45);
        [2.82,2.68,2.54].forEach(y=>box(g,.62,.055,.03,EISEN,s*.55,y,.5)); [.84,.7,.56].forEach(y=>box(g,.62,.055,.03,EISEN,s*.55,y,.5));
        box(g,.09,.4,.08,METALL,s*.16,1.72,.53); ball(g,.06,EISEN,s*.16,1.62,.58);
        box(g,.46,.22,.02,CREME,s*.58,2.22,.5); box(g,.3,.04,.02,HOLZ3,s*.58,2.22,.515);
        [.4,1.7,2.95].forEach(y=>walze(g,.05,.22,METALL2,s*1.08,y,.47)); });
      /* Aufkleber: Hufeisen und Herz */
      const hu=ring(g,.17,.05,GOLD,-.62,1.35,.51,4.6); hu.rotation.z=-.73;
      [-1,1].forEach(s=>ball(g,.09,0xe8404a,.6+s*.06,1.4,.5,1,1,.25)); const sp=kegel(g,.135,.18,0xe8404a,.6,1.3,.5); sp.rotation.x=Math.PI; sp.scale.z=.03; } },
  { x:4.3, z:-4.9, dreh:-.16, steh:[4.0,-2.7], kasten:[3.1,2.1], treffer:[2.9,2.3,1.8], baue(g,k){ /* 4 Truhe mit Satteldecken */
      const K=0x8a4a22, BAND=EISEN;
      box(g,2.6,.14,1.45,HOLZ3,0,.2,0); [-1.15,1.15].forEach(x=>[-.55,.55].forEach(z=>box(g,.3,.18,.3,BAND,x,.09,z)));
      [-.66,.66].forEach(z=>box(g,2.6,.88,.13,K,0,.7,z)); [-1.24,1.24].forEach(x=>box(g,.13,.88,1.42,K,x,.7,0));
      [.52,.86].forEach(y=>box(g,2.62,.035,.02,HOLZ3,0,y,.73));
      [-1.25,1.25].forEach(x=>box(g,.18,.94,1.5,GOLD,x,.7,0)); box(g,.4,.36,.07,GOLD,0,.92,.75); ball(g,.06,SCHWARZ,0,.92,.8);
      /* offener Deckel lehnt hinten */
      const d=gruppe(g,0,1.14,-.7); d.rotation.x=-.3; box(d,2.66,1.0,.13,K,0,.5,0); [-1.25,1.25].forEach(x=>box(d,.18,1.04,.17,GOLD,x,.5,0)); box(d,2.66,.12,.17,BAND,0,1.0,0);
      /* weich gefaltete Decken */
      box(g,2.32,.5,1.18,HOLZ2,0,.75,0);
      const decke=(x,y,z,b,f,s,dreh)=>{ const q=gruppe(g,x,y,z); q.rotation.y=dreh;
        box(q,b,.2,.92,f,0,0,0); [-.46,.46].forEach(c=>quer(walze(q,.1,b,f,0,0,c))); [-b*.28,b*.28].forEach(a=>{ box(q,.12,.215,.94,s,a,0,0); [-.46,.46].forEach(c=>quer(walze(q,.108,.12,s,a,0,c))); }); };
      decke(-.62,1.12,-.02,.98,0xd0342c,CREME,.12); decke(.58,1.1,.02,1.02,0x2a6ac0,GELB,-.1);
      decke(-.5,1.34,-.06,.86,GELB,ROT,-.14); decke(.5,1.31,-.04,.84,0x2f9a5a,CREME,.16); decke(.02,1.52,-.1,.9,LILA,GELB,.04);
      /* eine Decke hängt vorn heraus */
      box(g,.92,.1,.4,0xd0342c,.42,1.22,.62); box(g,.92,.72,.1,0xd0342c,.42,.9,.82); quer(walze(g,.09,.92,0xd0342c,.42,1.21,.8));
      [.72,1.02].forEach(y=>box(g,.94,.09,.12,CREME,.42,y,.825)); for(let i=0;i<7;i++) box(g,.06,.18,.05,CREME,.04+i*.127,.46,.82); } },
  { x:-11.2, z:-3.7, dreh:.22, steh:[-10.7,-1.55], kasten:[3.5,1.8], treffer:[3.1,3.3,1.3], baue(g,k){ /* 5 Regal mit Reithelmen */
      [-1.45,1.45].forEach(x=>{ [-.45,.45].forEach(z=>box(g,.16,2.95,.16,HELLHOLZ,x,1.48,z)); ball(g,.13,GOLD,x,3.02,.45); ball(g,.13,GOLD,x,3.02,-.45); });
      [.22,1.25,2.28].forEach(y=>box(g,3.06,.12,1.1,HOLZ,0,y,0));
      strich(g,[-1.4,.3,-.5],[1.4,2.8,-.5],.045,HOLZ2); strich(g,[1.4,.3,-.5],[-1.4,2.8,-.5],.045,HOLZ2);
      const helm=(x,y,f,dreh)=>{ const q=gruppe(g,x,y,.04); q.rotation.y=dreh;
        kuppel(q,.46,f,0,.07,0,1,1.18,1.05); walze(q,.47,.09,SCHWARZ,0,.05,0).scale.z=.5;
        ball(q,.28,f,0,.13,.5,1.15,.17,.85);  /* Schirm */
        [-.15,0,.15].forEach(a=>{ const s=box(q,.05,.04,.34,SCHWARZ,a,.6-Math.abs(a)*.28,.02); s.rotation.z=-a*1.4; });
        ball(q,.055,CREME,0,.62,0);
        /* Kinnriemen hängt vorn über die Brettkante */
        [-1,1].forEach(s=>strich(q,[s*.3,.1,.36],[s*.07,-.22,.6],.025,CREME)); box(q,.2,.08,.07,GOLD,0,-.23,.6); };
      helm(-.78,2.34,0x2a5ac0,.35); helm(.74,2.34,0xd0342c,-.25);
      helm(-.7,1.31,LILA,-.2); helm(.8,1.31,0xf0b820,.4);
      helm(-.68,.28,0x2a9a68,.2); helm(.76,.28,PINK,-.35); } },
  { x:10.25, z:HINTEN, wand:'hinten', steh:[10.25,-11.4], kasten:[3.6,.8], treffer:[3.5,2.8,.8], trefferY:1.55, baue(g,k){ /* 6 Brett mit Siegerschleifen */
      box(g,3.4,2.4,.08,0xf4e6c4,0,2.95,.12);
      [-1,1].forEach(s=>box(g,.16,2.58,.16,HOLZ2,s*1.74,2.95,.16)); [1.72,4.18].forEach(y=>box(g,3.64,.16,.16,HOLZ2,0,y,.16));
      [[-1.14,3.35,0x2a62c0],[-.38,3.05,0xd0342c],[.38,3.35,0xf0b414],[1.14,3.05,0x2f9a4a]].forEach(([x,y,f])=>{
        [-1,1].forEach(s=>{ const b=box(g,.2,.98,.04,f,x+s*.17,y-.62,.2+(s+1)*.008); b.rotation.z=s*.24; const q=box(g,.05,.9,.015,CREME,x+s*.16,y-.6,.235); q.rotation.z=s*.24; });
        for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(g,.12,f,x+Math.cos(a)*.27,y+Math.sin(a)*.27,.24,1,1,.35); }
        flach(walze(g,.28,.08,f,x,y,.25)); flach(walze(g,.19,.04,CREME,x,y,.3)); flach(walze(g,.12,.04,GOLD,x,y,.32));
        ball(g,.055,GOLD,x,y+.47,.2); });
      } },
  { x:-4.5, z:1.4, dreh:.12, steh:[-4.0,3.35], kasten:[2.3,1.6], treffer:[2.2,2.3,1.5], baue(g,k){ /* 7 Reitstiefel */
      const F=0x241612, G=0x4a2a1c;
      box(g,2.15,.1,1.45,0xd8b878,0,.05,0); [-.9,.9].forEach(x=>box(g,.12,.112,1.47,ROT,x,.053,0));
      [[-.45,-.12,.5],[.42,.14,.66]].forEach(([x,z,d],i)=>{ const s=gruppe(g,x,.1,z); s.rotation.y=d;
        /* Fuß zeigt nach +z */
        box(s,.5,.1,.98,0x8a6a48,0,.07,.2); box(s,.5,.13,.28,0x8a6a48,0,.1,-.18);
        ball(s,.27,F,0,.29,.4,1,.72,1.55); box(s,.46,.34,.5,F,0,.3,-.02);
        rohr(s,.28,.23,1.35,F,0,1.0,-.08); ball(s,.25,F,0,.38,-.08,1,1,1.1);
        flach(ring(s,.28,.05,G,0,1.68,-.08)); walze(s,.23,.02,0x7a5434,0,1.665,-.08);
        flach(ring(s,.272,.032,G,0,1.46,-.08)); box(s,.13,.11,.05,GOLD,(i?-1:1)*.1,1.46,.19);
        box(s,.035,.95,.02,0x7a5a48,-.09,1.02,.19);  /* Glanz */
        ring(s,.07,.025,G,0,1.76,-.34); }); } },
  { x:4.5, z:1.3, steh:[4.1,3.25], r:1.15, treffer:[2.2,1.9,2.0], baue(g,k){ /* 8 Eimer mit Schwämmen */
      const E=0xf08a20;
      rohr(g,.82,.6,1.02,E,-.1,.52,0,24,true); walze(g,.6,.08,E,-.1,.05,0); walze(g,.75,.05,0x5ac0e8,-.1,.9,0);
      flach(ring(g,.83,.055,0xb85a10,-.1,1.03,0)); flach(ring(g,.68,.035,0xb85a10,-.1,.4,0));
      [-1,1].forEach(s=>ball(g,.1,METALL2,-.1+s*.82,.9,0));
      const buegel=ring(g,.83,.03,METALL,-.1,.9,-.02,Math.PI); buegel.rotation.x=-1.15;
      /* rundliche, unregelmäßige Schwämme aus drei gestauchten Kugeln, Poren rundum */
      const schwamm=(x,y,z,f,d,dreh,kipp)=>{ const q=gruppe(g,x,y,z); q.rotation.set(kipp,dreh,kipp*.6);
        /* [x,y,z, Halbachsen] */
        const K=[[-.13,0,.01,.25,.17,.21],[.15,.025,.05,.22,.18,.18],[.03,.03,-.09,.23,.15,.17]];
        K.forEach(([a,b,c,rx,ry,rz])=>ball(q,1,f,a,b,c,rx,ry,rz));
        K.forEach((e,n)=>{ [[0,1,0],[.6,.75,.28],[-.55,.8,-.2],[-.1,.65,.75],[-.35,.1,.93],[.5,-.05,.86],[-.95,.1,.3],[.96,.2,.18],[.2,.55,-.8]].forEach((r,i)=>{
          const p=[0,1,2].map(j=>e[j]+r[j]*e[j+3]*.99);
          if(K.some((o,m)=>m!==n && Math.hypot((p[0]-o[0])/o[3],(p[1]-o[1])/o[4],(p[2]-o[2])/o[5])<1.04)) return;
          const w=.028+((i+n)%3)*.009, m=hell(ball(q,w,d,p[0],p[1],p[2],1,.22,1));
          m.quaternion.setFromUnitVectors(V(0,1,0),V(r[0]/e[3],r[1]/e[4],r[2]/e[5]).normalize()); }); }); };
      schwamm(-.46,1.1,.12,0xffe040,0xd8ac18,.4,.18); schwamm(.22,1.13,-.2,0x50acf4,0x2a76c0,-.5,-.14); schwamm(-.04,1.04,.36,0xe87890,0xb84c66,.1,.1);
      schwamm(.76,.17,.46,0x64d064,0x3a9c3a,.7,0);
      /* Seifenblasen steigen auf */
      const m=basis(0xe8faff,{transparent:true,opacity:.5,depthWrite:false});
      const blasen=[0,1,2,3,4].map(i=>hell(ball(g,.06+(i%3)*.025,m,0,1.2,0)));
      k.anim.push(t=>{ blasen.forEach((b,i)=>{ const u=(t*.3+i*.2)%1; b.position.set(-.1+Math.sin(i*2.1+u*4)*.45, 1.15+u*.9, Math.cos(i*1.7+u*3)*.3); b.visible=u<.92; }); }); } },
  { x:-11.2, z:4.7, dreh:.2, steh:[-10.7,6.85], kasten:[3.3,1.9], treffer:[3.0,3.0,1.6], baue(g,k){ /* 9 Waschbecken */
      const W=0xf4f8fa, FU=0x9ac8dc;
      /* gefliester Spritzschutz auf Holzfüßen */
      box(g,2.8,1.6,.18,W,0,1.9,-.52); [1.5,1.9,2.3].forEach(y=>box(g,2.8,.03,.02,FU,0,y,-.425)); for(let i=1;i<7;i++) box(g,.03,1.6,.02,FU,-1.4+i*.4,1.9,-.425);
      for(let i=0;i<7;i++) box(g,.37,.37,.02,i%2?0x2a7ab0:0x5ab0d0,-1.2+i*.4,2.5,-.42);
      box(g,2.98,.13,.3,HOLZ2,0,2.76,-.52); [-1.42,1.42].forEach(x=>{ box(g,.16,2.75,.28,HOLZ2,x,1.38,-.52); box(g,.3,.12,.9,HOLZ3,x,.06,-.42); });
      /* Becken */
      const becken=gruppe(g,0,0,.12); becken.scale.set(1.35,1,.85);
      rohr(becken,.72,.44,.46,W,0,1.12,0,24,true); walze(becken,.44,.07,W,0,.9,0); flach(ring(becken,.72,.07,W,0,1.35,0)); walze(becken,.62,.04,0x6ac8ee,0,1.22,0);
      rohr(g,.2,.32,.88,W,0,.44,.08); walze(g,.42,.08,W,0,.04,.08);
      /* Wasserhahn mit zwei Drehgriffen */
      flach(walze(g,.12,.1,METALL,0,1.72,-.4)); strich(g,[0,1.72,-.42],[0,1.96,-.16],.075,METALL); ball(g,.085,METALL,0,1.96,-.16); strich(g,[0,1.96,-.16],[0,1.86,.12],.07,METALL); walze(g,.085,.1,METALL2,0,1.81,.13);
      [[-.45,0xd0342c],[.45,0x2a6ac0]].forEach(([x,f])=>{ flach(walze(g,.06,.22,METALL,x,1.64,-.34)); quer(walze(g,.035,.32,METALL,x,1.64,-.22)); walze(g,.035,.32,METALL,x,1.64,-.22); ball(g,.08,f,x,1.64,-.19); });
      /* Seife und Handtuch */
      ball(g,.15,0xf0a0c0,-.76,1.43,.12,1.4,.6,.9);
      strich(g,[1.42,2.05,-.4],[1.42,2.05,.1],.045,METALL); box(g,.12,1.0,.46,0xf0c030,1.52,1.56,-.08); [1.2,1.34].forEach(y=>box(g,.13,.07,.47,ROT,1.52,y,-.08));
      const tropfen=gruppe(g,0,1.7,.13); tropfen.userData.lebendig=true; hell(ball(tropfen,.055,basis(0x7ad4ff),0,0,0,1,1.5,1));
      k.anim.push(t=>{ const u=(t*.8)%1; tropfen.position.y=1.74-u*u*.5; tropfen.visible=u<.97; }); } },
  { x:11.0, z:3.7, dreh:-.24, steh:[10.4,5.95], kasten:[3.8,2.4], treffer:[3.3,2.2,1.8], baue(g,k){ /* 10 Werktisch mit Leder */
      [-1.4,1.4].forEach(x=>[-.62,.62].forEach(z=>box(g,.2,1.12,.2,HOLZ2,x,.56,z)));
      box(g,3.2,.18,1.65,HELLHOLZ,0,1.2,0); box(g,2.9,.18,.08,HOLZ,0,1.02,.7); box(g,2.8,.1,1.2,HOLZ,0,.36,0);
      /* Lederrollen unten im Fach */
      [[-.8,0x9a5424,.16],[.0,0x6a3418,.02],[.75,0xb87838,-.1]].forEach(([x,f,z])=>{ flach(walze(g,.2,1.0,f,x,.61,z)); flach(walze(g,.11,.03,HELLHOLZ,x,.61,z+.51)); flach(walze(g,.06,.035,f,x,.61,z+.52)); });
      /* Lederstücke mit weißer Naht */
      const stueck=(x,y,z,b,t,f,dreh)=>{ const q=gruppe(g,x,y,z); q.rotation.y=dreh; box(q,b,.045,t,f,0,0,0); [-1,1].forEach(s=>ball(q,t*.5,f,s*b*.5,0,0,.55,.045,1));
        for(let i=0;i<Math.floor(b/.14);i++) [-1,1].forEach(s=>hell(box(q,.07,.012,.025,CREME,-b/2+.08+i*.14,.028,s*(t/2-.07)))); };
      stueck(-.65,1.32,.05,1.1,.85,0xa85a24,.25); stueck(-.35,1.37,.2,.75,.55,0x74381a,-.35);
      /* Riemen mit Löchern, hängt vorn über die Kante */
      box(g,.2,.04,.75,0x8a4018,.3,1.32,.5); box(g,.2,.72,.05,0x8a4018,.3,.98,.87); [.75,.9,1.05].forEach(y=>flach(walze(g,.035,.02,CREME,.3,y,.9))); ring(g,.14,.035,GOLD,.3,.58,.88);
      /* eine große Lederrolle auf dem Tisch */
      quer(walze(g,.22,1.0,0xc88440,-.75,1.52,-.52)); [-1,1].forEach(s=>{ quer(walze(g,.12,.03,0x8a5428,-.75+s*.51,1.52,-.52)); quer(walze(g,.06,.04,0xc88440,-.75+s*.52,1.52,-.52)); });
      /* Garnrollen */
      [[.55,-.45,0xd0342c],[.88,-.5,0x2a6ac0],[1.22,-.4,GELB]].forEach(([x,z,f])=>{ walze(g,.12,.3,f,x,1.47,z); [1.31,1.63].forEach(y=>walze(g,.16,.04,CREME,x,y,z)); });
      strich(g,[.55,1.32,-.3],[.15,1.32,-.12],.012,0xd0342c);
      /* kleiner Holzhammer */
      const ham=gruppe(g,.95,1.42,.32); ham.rotation.y=-.5; quer(walze(ham,.045,.62,HOLZ2,-.15,0,0)); flach(walze(ham,.14,.42,0xe0b070,.24,0,0)); [-.19,.19].forEach(z=>flach(walze(ham,.146,.05,HOLZ,.24,0,z))); } }
];

return { titel:'Die Sattelkammer', breite:36, tiefe:27, oben:['14,16,10','28,40,28','52,80,62'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Der Heuboden. Unter dem Dach: warme Bretterwände, Dachbalken an den Wänden, rundes Giebelfenster mit
   Sonnenstrahl und Staub, große lose Heuhaufen am Rand, fliegende Schwalben, Mäuschen und Hühner.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das große zweiflügelige Heutor in der Rückwand. Es schwingt nach außen auf, dahinter Himmel und Hof,
   die Figur steigt außen an der Leiter hinunter. */
RAEUME3D.pferdehof[2] = (function(){
const { HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER2, STROH, STROH2, HEU, METALL, METALL2, EISEN, GOLD, MESSING, ROT, GRUEN, CREME, SCHWARZ, WEISS } = PH;
const B=36, T=27, H=6.4, HINTEN=-13.5, Q=Math.PI/2;
const BALKEN=0x6a4020, SEIL=0xf0dca4, TORROT=0xa23c28, TORROT2=0xb84a30, ORANGE=0xe08030;
const FX=-6.4, FY=3.3;             /* Mitte des runden Giebelfensters */

/* ---------- sparsame Formen: je kleiner das Teil, desto weniger Dreiecke (gilt nur in diesem Raum) ---------- */
const KUGEL1=new THREE.SphereGeometry(1,8,6), KUGEL2=new THREE.SphereGeometry(1,12,8), KUGEL3=new THREE.SphereGeometry(1,15,11);
const WALZE1=new THREE.CylinderGeometry(1,1,1,7), WALZE2=new THREE.CylinderGeometry(1,1,1,10), WALZE3=new THREE.CylinderGeometry(1,1,1,15);
const KEGEL1=new THREE.ConeGeometry(1,1,8);
const ball=(p,r,c,x,y,z,sx,sy,sz)=>{ const a=r*(sx||1), b=r*(sy||1), d=r*(sz||1), m=Math.max(a,b,d); return teil(p,m<.12?KUGEL1:m<.3?KUGEL2:m<.65?KUGEL3:GEO.sph,c,x,y,z,a,b,d); };
const walze=(p,r,h,c,x,y,z)=>teil(p,r<.09?WALZE1:r<.25?WALZE2:r<.6?WALZE3:GEO.cyl,c,x,y,z,r,h,r);
const kegel=(p,r,h,c,x,y,z)=>teil(p,r<.2?KEGEL1:GEO.cone,c,x,y,z,r,h,r);
function strich(p,a,b,r,c){ const A=V(a[0],a[1],a[2]), E=V(b[0],b[1],b[2]), d=E.clone().sub(A), l=d.length(); const t=walze(p,r,l,c,0,0,0); t.position.copy(A).addScaledVector(d,.5); t.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); return t; }
function ring(p,r,d,c,x,y,z,bogen){ const w=bogen||Math.PI*2, n=Math.max(10,Math.round((r<.2?14:r<.7?20:28)*Math.min(1,w/Math.PI/1.2))); const t=new THREE.Mesh(new THREE.TorusGeometry(r,d,d<.03?4:6,n,w),typeof c==='number'?mat(c):c); t.position.set(x,y,z); t.castShadow=true; p.add(t); return t; }
/* ---------- kleine Helfer ---------- */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const flach=m=>{ m.rotation.x=Q; return m; };
const quer=m=>{ m.rotation.z=Q; return m; };
const lebt=g=>{ g.userData.lebendig=true; return g; };
const zweiseitig=c=>mat(c,{side:THREE.DoubleSide});

/* ---------- Ausgang: das Heutor ---------- */
/* Blick hinaus: blauer Himmel, Hügel, Hofgebäude, Bäume, Koppel und Pflaster. Welt-Höhe 7 (oben) bis -5 (unten) */
function hofBild(){
  return bild(1024,512,(g)=>{
    const Y=y=>(7-y)/12*512;
    const v=g.createLinearGradient(0,0,0,Y(.9)); v.addColorStop(0,'#3a8ae0'); v.addColorStop(1,'#bfe6ff'); g.fillStyle=v; g.fillRect(0,0,1024,512);
    const kreis=(x,y,r,f)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    [[420,2.75,1],[585,3.15,.8],[250,3.4,.9],[790,2.7,1.1],[505,4.2,.7]].forEach(([x,y,s])=>[[0,0,20],[22,-8,24],[48,0,18],[24,6,22]].forEach(([a,b,r])=>kreis(x+a*s,Y(y)+b*s,r*s,'#ffffff')));
    kreis(645,Y(2.5),17,'#fff0a0');
    /* Hügel */
    g.fillStyle='#8cc46a'; g.beginPath(); g.moveTo(0,Y(1.0)); for(let x=0;x<=1024;x+=32) g.lineTo(x,Y(1.15)+Math.sin(x*.017)*14); g.lineTo(1024,512); g.lineTo(0,512); g.fill();
    g.fillStyle='#68a84c'; g.fillRect(0,Y(.35),1024,512);
    /* Hofhaus mit rotem Dach */
    g.fillStyle='#f2e4c4'; g.fillRect(540,Y(.8),100,58); g.fillStyle='#c0482e'; g.beginPath(); g.moveTo(526,Y(.8)); g.lineTo(590,Y(1.65)); g.lineTo(654,Y(.8)); g.fill();
    g.fillStyle='#5a86b0'; [552,612].forEach(x=>g.fillRect(x,Y(.55),16,16)); g.fillStyle='#6a4020'; g.fillRect(579,Y(-.02),22,26);
    [[345,.6,26],[392,.1,18],[690,.7,30],[730,.4,22],[250,.5,24],[820,.55,28]].forEach(([x,y,r])=>{ g.fillStyle='#6a4a24'; g.fillRect(x-4,Y(y),8,34); kreis(x,Y(y),r,'#3c8038'); kreis(x-8,Y(y)-8,r*.55,'#58a048'); });
    /* Hof aus Pflaster */
    g.fillStyle='#b8a68c'; g.fillRect(0,Y(-.95),1024,512);
    for(let r=0;r<9;r++) for(let s=0;s<38;s++){ g.fillStyle=(r+s)%3?'#a8947a':'#c8b89c'; g.fillRect(s*28+(r%2)*14,Y(-.95)+r*22+3,24,17); }
    /* Zaun der Koppel */
    g.fillStyle='#f4ead4'; for(let x=0;x<1024;x+=34) g.fillRect(x,Y(-.35),7,34); g.fillRect(0,Y(-.45),1024,6); g.fillRect(0,Y(-.72),1024,6);
    /* braunes Pony auf der Wiese: höher als die Leiter und zwischen den offenen Torflügeln */
    g.save(); g.translate(466,Y(.62)); g.scale(.75,.75);
    /* Schweif: beginnt hinten am Rumpf und hängt herunter */
    g.strokeStyle='#24160c'; g.lineCap='round'; g.lineWidth=10; g.beginPath(); g.moveTo(-28,-7); g.quadraticCurveTo(-47,-6,-44,27); g.stroke();
    g.fillStyle='#8a4e28'; [-27,-14,12,25].forEach(x=>g.fillRect(x,6,8,30)); g.beginPath(); g.ellipse(0,0,34,19,0,0,7); g.fill();
    g.beginPath(); g.moveTo(14,-8); g.lineTo(34,-40); g.lineTo(52,-34); g.lineTo(33,6); g.fill(); g.beginPath(); g.ellipse(49,-34,18,11,.5,0,7); g.fill();
    g.beginPath(); g.moveTo(36,-42); g.lineTo(39,-56); g.lineTo(47,-42); g.fill();
    g.strokeStyle='#24160c'; g.lineWidth=8; g.beginPath(); g.moveTo(37,-40); g.lineTo(18,-12); g.stroke();
    g.fillStyle='#24160c'; [-27,-14,12,25].forEach(x=>g.fillRect(x,32,8,6)); g.beginPath(); g.arc(50,-37,2.6,0,7); g.fill();
    g.restore();
  });
}
function baueTor(k,sc,hinten){
  /* Blick nach draußen */
  const himmel=new THREE.Mesh(new THREE.PlaneGeometry(24,12),basis(0xffffff,{map:hofBild()})); himmel.position.set(0,1,-18.5); hinten.add(himmel);
  const hofTex=PH.pflasterBild(); const hof=new THREE.Mesh(new THREE.PlaneGeometry(24,4.5),new THREE.MeshLambertMaterial({map:hofTex})); hof.rotation.x=-Q; hof.position.set(0,-5,-16.25); hinten.add(hof);
  const fest=gruppe(hinten,0,0,HINTEN);
  /* Schwelle in der Maueröffnung und heller Rahmen */
  box(fest,4.4,.12,.54,HOLZ2,0,-.065,-.25);
  [-1,1].forEach(s=>{ box(fest,.32,4.4,.3,HELLHOLZ,s*2.37,2.2,.1); [.5,2.2,3.9].forEach(y=>ball(fest,.07,EISEN,s*2.37,y,.27)); });
  box(fest,5.3,.34,.34,HELLHOLZ,0,4.4,.12);
  /* kleines Vordach-Gebälk über dem Tor */
  [-1,1].forEach(s=>strich(fest,[s*2.6,4.55,.14],[0,5.55,.14],.12,HOLZ2));
  ring(fest,.26,.06,EISEN,0,4.9,.2,Math.PI*1.45).rotation.z=-Math.PI*.22;
  verschmelze(fest);
  /* die beiden Flügel: Drehpunkt außen in der Maueröffnung, schwingen nach draußen */
  const fluegel=[-1,1].map(s=>{ const q=lebt(gruppe(hinten,s*2.2,0,HINTEN-.45)), i=gruppe(q,-s*1.1,0,0);
    [-.815,-.272,.272,.815].forEach((x,j)=>box(i,.535,4.14,.12,j%2?TORROT:TORROT2,x,2.09,0));
    [.22,2.08,3.94].forEach(y=>box(i,2.14,.2,.06,CREME,0,y,.09));
    [-.98,.98].forEach(x=>box(i,.18,3.9,.06,CREME,x,2.08,.095));
    [[.32,1.98],[2.18,3.84]].forEach(([a,b])=>{ strich(i,[-.9,a,.09],[.9,b,.09],.065,CREME); strich(i,[-.9,b,.09],[.9,a,.09],.065,CREME); });
    [.55,3.6].forEach(y=>{ box(i,.85,.13,.05,EISEN,s*.68,y,.13); ball(i,.07,METALL,s*.35,y,.16); });
    verschmelze(q); return q; });
  /* Riegel und goldenes Zahlenschloss über beide Flügel */
  const sperre=lebt(gruppe(hinten,0,0,HINTEN-.24));
  box(sperre,2.1,.18,.1,EISEN,0,1.95,0); [-1,1].forEach(v=>{ box(sperre,.2,.36,.12,EISEN,v*1.02,1.95,0); ball(sperre,.06,METALL,v*1.02,1.95,.09); });
  const schloss=PH.zahlenschloss(sperre,0,1.9,.14); schloss.scale.setScalar(1.55); verschmelze(sperre);
  const glimmen=schein(hinten,'rgba(255,220,110,.45)',0,1.95,HINTEN+.2,1.6);
  /* Leiter außen am Haus, erst bei offenem Tor zu sehen */
  const leiter=lebt(gruppe(hinten,0,0,-14.98));
  [-.66,.66].forEach(x=>{ strich(leiter,[x,-5,0],[x,1.15,0],.085,HELLHOLZ); ball(leiter,.12,GOLD,x,1.18,0); });
  for(let i=0;i<14;i++) quer(walze(leiter,.062,1.32,i%2?HELLHOLZ:0xdcae74,0,-4.85+i*.42,0));
  /* ein paar Heuhalme auf der Schwelle */
  [-1,1].forEach(s=>{ for(let i=0;i<9;i++){ const x=s*1.5-.42+i*.1, z=1.06+(i%3)*.07; strich(leiter,[x,.012+(i%2)*.012,z],[x+(i%2?.3:-.24)+(i%3)*.04,.03+(i%4)*.018,z+.16-(i%4)*.09],.012,i%3?STROH:STROH2); } });
  verschmelze(leiter); leiter.visible=false;
  const tuer=ausgang(k,{ name:'Heutor', steh:[0,-11.2], durch:[0,-14.45], tief:true,
    treffer:{x:0,y:2.15,z:-13.2,b:4.7,h:4.3,t:.7}, schildOben:[0,4.95,-12.8], glanz:[0,1.95,-13.0],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)), w=1.45*a*a*(3-2*a); fluegel[0].rotation.y=w; fluegel[1].rotation.y=-w;
      sperre.visible=auf<.04; glimmen.visible=sperre.visible; leiter.visible=auf>.06; glimmen.material.opacity=.55+Math.sin((t||0)*2.4)*.25; } });
  /* Kletterbewegung der Figur, während sie außen hinuntersteigt */
  k.anim.push(t=>{ const f=k.figur&&k.figur(); if(!tuer.offen || !f || !(f.position.y<-.05) || !(f.position.y>-2.15)) return; const u=f.userData, s=Math.sin(t*11);
    u.armL.rotation.x=-2.2+s*.5; u.armR.rotation.x=-2.2-s*.5; u.beinL.rotation.x=-.4-s*.45; u.beinR.rotation.x=-.4+s*.45; });
  return tuer;
}

/* ---------- rundes Giebelfenster mit Sonnenstrahl und Staub ---------- */
function fensterBild(){
  return bild(256,256,(g)=>{ const v=g.createLinearGradient(0,0,0,256); v.addColorStop(0,'#66b4f4'); v.addColorStop(1,'#e4f6ff'); g.fillStyle=v; g.fillRect(0,0,256,256);
    const kreis=(x,y,r,f)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    kreis(180,72,48,'rgba(255,240,160,.55)'); kreis(180,72,28,'#fff6b0');
    [[60,130,24],[88,118,30],[118,132,22]].forEach(([x,y,r])=>kreis(x,y,r,'#ffffff'));
    [[40,240,52],[110,256,46],[200,244,60]].forEach(([x,y,r])=>kreis(x,y,r,'#5a9a44')); });
}
function baueFenster(k,sc,hinten){
  const glas=new THREE.Mesh(new THREE.CircleGeometry(1.12,36),basis(0xffffff,{map:fensterBild()})); glas.position.set(FX,FY,HINTEN+.04); hinten.add(glas);
  const f=gruppe(hinten,FX,FY,HINTEN+.1);
  ring(f,1.18,.15,HELLHOLZ,0,0,0); ring(f,1.38,.07,HOLZ2,0,0,-.02);
  box(f,2.3,.09,.08,HELLHOLZ,0,0,0); box(f,.09,2.3,.08,HELLHOLZ,0,0,.005);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4+Math.PI/8; ball(f,.08,GOLD,Math.cos(a)*1.18,Math.sin(a)*1.18,.14); }
  box(f,2.2,.14,.42,HELLHOLZ,0,-1.46,.1);
  verschmelze(f);
  schein(hinten,'rgba(255,240,170,.5)',FX,FY,HINTEN+.45,3.4);
  /* Sonnenstrahl: vom Fenster schräg auf den Boden */
  const W=[[FX-.75,FY+.75,-13.25],[FX+.75,FY+.75,-13.25],[FX+.75,FY-.75,-13.25],[FX-.75,FY-.75,-13.25]], Fl=[[-5.4,.04,-7.2],[-2.2,.04,-7.2],[-2.4,.04,-10.4],[-5.6,.04,-10.4]], P=[];
  for(let i=0;i<4;i++){ const j=(i+1)%4; [W[i],W[j],Fl[j],W[i],Fl[j],Fl[i]].forEach(p=>P.push(p[0],p[1],p[2])); }
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
  sc.add(new THREE.Mesh(geo,basis(0xffe9a0,{transparent:true,opacity:.07,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending})));
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(6,5.4),basis(0xffffff,{map:leuchtBild('rgba(255,226,130,.5)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  fleck.rotation.x=-Q; fleck.position.set(-3.9,.05,-8.8); sc.add(fleck);
  const licht=new THREE.PointLight(0xffe8a8,.55,11,1.5); licht.position.set(-5.2,3.0,-11.0); sc.add(licht);
  /* Staub im Sonnenstrahl */
  const n=80, im=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,0),basis(0xfff4c0,{transparent:true,opacity:.8,depthWrite:false}),n), o=new THREE.Object3D(), D=[];
  for(let i=0;i<n;i++) D.push([zufall(),zufall(),zufall(),zufall()*6.28,.35+zufall()*.6,.016+zufall()*.02]);
  im.frustumCulled=false; sc.add(im);
  const misch=(a,b,u)=>a+(b-a)*u;
  k.anim.push(t=>{ D.forEach((d,i)=>{ const u=(d[0]+t*.012*d[4])%1, a=t*d[4]+d[3];
      const x=misch(FX-.7+d[1]*1.4,-5.4+d[1]*3.1,u)+Math.sin(a)*.18, y=misch(FY-.7+d[2]*1.4,.18,u)+Math.sin(a*1.7)*.12, z=misch(-13.0,-10.4+d[2]*3,u)+Math.cos(a*.8)*.15;
      const g=d[5]*(1+.35*Math.sin(t*2.2+d[3]*3)); o.position.set(x,y,z); o.scale.set(g,g,g); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; });
}

/* ---------- Dachbalken an den Wänden ---------- */
function gebaelk(hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0), zi=HINTEN+.14;
  const POSTEN=[-17.75,-13.8,-9.0,-3.15,3.15,8.4,13.8,17.75];
  POSTEN.forEach(x=>box(h,.34,H,.26,BALKEN,x,H/2,zi));
  [-1,1].forEach(s=>box(h,15.2,.32,.3,BALKEN,s*10.4,6.2,zi+.02)); box(h,5.7,.24,.28,BALKEN,0,6.24,zi+.02);
  [-1,1].forEach(s=>{ strich(h,[s*17.8,3.6,zi+.08],[s*12.2,6.15,zi+.08],.2,HOLZ2); strich(h,[s*17.8,4.7,zi+.05],[s*14.9,6.05,zi+.05],.11,HOLZ2);
    [3.15,8.4,13.8].forEach(x=>[-1,1].forEach(v=>strich(h,[s*x+v*.1,5.3,zi+.05],[s*x+v*.75,6.1,zi+.05],.09,HOLZ2))); });
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.14);
    [-13.2,-6.6,0,6.6,13].forEach(z=>{ box(w,.26,3.6,.34,BALKEN,x,1.8,z); strich(w,[x,3.5,z],[s*16.35,6.3,z],.19,BALKEN); strich(w,[x,4.9,z],[s*17.2,4.9,z],.09,HOLZ2); });
    box(w,.3,.3,T,BALKEN,s*16.35,6.3,0); box(w,.24,.24,T,HOLZ2,x,3.55,0);
    for(let i=0;i<4;i++){ const z=-9.9+i*6.6; strich(w,[x,3.6,z-3],[s*16.4,6.25,z+3],.07,HOLZ2); } });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
  const spinn=basis(0xd8ccb4);
  [-1,1].forEach(s=>{ const g=gruppe(hinten,s*17.55,6.0,HINTEN+.34), P=[0,1,2,3,4].map(i=>{ const a=i*Math.PI/8; return [-s*Math.cos(a),-Math.sin(a)]; });
    P.forEach(p=>strich(g,[0,0,0],[p[0]*1.3,p[1]*1.3,0],.006,spinn));
    [.45,.8,1.15].forEach(r=>{ for(let i=0;i<4;i++) strich(g,[P[i][0]*r,P[i][1]*r,0],[P[i+1][0]*r,P[i+1][1]*r,0],.005,spinn); }); verschmelze(g); ohneSchatten(g); });
}

/* ---------- Schwalben ---------- */
const SCHWALBE=0x24365e, SCHWALBE2=0x3a5488, KEHLE=0xc8502a, BAUCH=0xf6ecd8;
/* Kopf mit Blick nach +z; offen = Schnabel weit auf */
function schwalbenKopf(g,offen){
  ball(g,.22,SCHWALBE,0,0,0); ball(g,.15,KEHLE,0,-.08,.12,1.05,.85,.8); ball(g,.1,BAUCH,0,-.18,.09,1.2,.8,.8);
  [-1,1].forEach(s=>{ ball(g,.05,WEISS,s*.11,.05,.17); ball(g,.032,SCHWARZ,s*.115,.05,.213); });
  const o=kegel(g,.09,.24,0xf2c030,0,offen?.01:-.03,.29); o.rotation.x=Q-(offen?.35:0); o.scale.z=.04;
  if(offen){ const u=kegel(g,.08,.18,0xe8a820,0,-.11,.26); u.rotation.x=Q+.45; u.scale.z=.035; }
}
/* fliegende Schwalbe auf einer ovalen Bahn */
function flugSchwalbe(k,cx,cy,cz,rx,rz,tempo,phase){
  const g=lebt(gruppe(k.scene,cx,cy,cz)), r=gruppe(g,0,0,0);
  ball(r,.2,SCHWALBE,0,0,0,1.7,.8,.8); ball(r,.15,BAUCH,.05,-.07,0,1.7,.6,.75); ball(r,.14,SCHWALBE,.34,.05,0); ball(r,.08,KEHLE,.4,-.02,0,1,.8,1.1);
  const s=kegel(r,.04,.13,0xf2c030,.52,.04,0); s.rotation.z=-Q;
  [-1,1].forEach(v=>strich(r,[-.28,0,v*.03],[-.72,.02,v*.2],.028,SCHWALBE));
  verschmelze(r);
  const fl=[-1,1].map(v=>{ const q=gruppe(g,.04,.03,v*.1); ball(q,.16,SCHWALBE2,-.02,0,v*.24,1.1,.18,1.7); ball(q,.1,SCHWALBE,-.16,0,v*.55,1.2,.18,1.6); verschmelze(q); return q; });
  k.anim.push(t=>{ const a=t*tempo+phase, x=cx+Math.cos(a)*rx, z=cz+Math.sin(a)*rz; g.position.set(x,cy+Math.sin(a*2.3)*.35,z);
    const dx=-Math.sin(a)*rx*Math.sign(tempo), dz=Math.cos(a)*rz*Math.sign(tempo); g.rotation.y=Math.atan2(-dz,dx);
    const w=Math.sin(t*13+phase*3)*.7; fl[0].rotation.x=w; fl[1].rotation.x=-w; });
}

/* ---------- Huhn (läuft herum und pickt) ---------- */
function huhn(k,weg,tempo,start,farbe){
  const g=lebt(gruppe(k.scene,0,0,0)), r=gruppe(g,0,0,0);
  ball(r,.34,farbe,0,.5,0,1.2,.95,.85); [-1,1].forEach(s=>ball(r,.2,farbe,-.05,.52,s*.24,1.35,.75,.45));
  [0,1,2].forEach(i=>{ const q=ball(r,.12,farbe,-.42-i*.03,.66+i*.11,0,.7,1.5,.45); q.rotation.z=.6+i*.15; });
  [-1,1].forEach(s=>{ strich(r,[.02,.3,s*.13],[.02,.02,s*.13],.025,0xe8a030); strich(r,[.02,.025,s*.13],[.18,.025,s*.13],.02,0xe8a030); });
  verschmelze(r);
  const kopf=gruppe(g,.3,.66,0); strich(kopf,[0,-.05,0],[.14,.24,0],.11,farbe); ball(kopf,.16,farbe,.17,.3,0);
  [0,1,2].forEach(i=>ball(kopf,.055,0xd83028,.1+i*.07,.46-Math.abs(i-1)*.03,0)); ball(kopf,.045,0xd83028,.3,.2,0,.8,1.5,.8);
  const s=kegel(kopf,.06,.15,0xf0b020,.37,.28,0); s.rotation.z=-Q; [-1,1].forEach(v=>ball(kopf,.028,SCHWARZ,.25,.35,v*.13));
  verschmelze(kopf);
  k.anim.push(t=>{ const p=Math.max(0,Math.sin(t*.9+start)); kopf.rotation.z=p>.7?-1.1*Math.abs(Math.sin(t*7)):Math.sin(t*8)*.08; });
  laeufer(k,g,weg,tempo,start,9);
}

/* ---------- lose Heuhaufen: runde Hügel mit vielen Halmen ---------- */
/* liste: [x,z,halbe Breite,Höhe,halbe Tiefe] */
function heuhaufen(par,liste){
  const g=gruppe(par,0,0,0), L=[], F=[0xfce080,0xc8981c,0xf0c844,0xfff0a8,0xa87c18];
  liste.forEach(([x,z,rx,h,rz])=>{
    [[0,0,1,1,1],[-.38,.28,.62,.72,.62],[.4,-.2,.6,.8,.6]].forEach(([a,c,fx,fy,fz],j)=>{
      const px=x+a*rx, pz=z+c*rz, ax=rx*fx*.9, ay=h*fy, az=rz*fz*.9;
      const kern=teil(g,new THREE.IcosahedronGeometry(1,0),0xa87e22,px,0,pz,ax*.9,ay*.9,az*.9); kern.rotation.y=px*1.7+j;
      for(let i=0;i<150;i++){ const w=i*2.39996+zufall()*.4, hoch=Math.asin(Math.min(.99,(i+.5)/150))+(zufall()-.5)*.14, r=.95+zufall()*.13, q=Math.cos(hoch)*r;
        L.push([Math.max(-17.65,Math.min(17.65,px+Math.cos(w)*q*ax)),Math.max(.04,Math.sin(hoch)*ay*r),Math.max(-13.15,pz+Math.sin(w)*q*az),.3+zufall()*.38,.036,.042,F[i%5],
          -w+(zufall()-.5)*1.5,0,-(1.45-hoch)*.6+(zufall()-.5)*.9]); }
    });
  });
  verschmelze(g); ohneSchatten(g); PH.viele(par,GEO.box,L);
}

/* ---------- weitere Deko (nichts davon sieht wie ein Gegenstand aus) ---------- */
function fass(par,x,z,deckel){
  const g=gruppe(par,x,0,z);
  rohr(g,.55,.68,.7,HOLZ,0,.35,0); rohr(g,.68,.55,.7,HOLZ,0,1.05,0);
  [[.1,.58],[.5,.66],[.9,.66],[1.34,.58]].forEach(([y,r])=>flach(ring(g,r,.045,METALL2,0,y,0)));
  walze(g,.5,.08,HELLHOLZ,0,1.42,0);
  if(deckel) [[-.18,.1],[.2,-.05],[0,-.24],[.05,.24]].forEach(([a,c])=>{ ball(g,.17,deckel,a,1.58,c); strich(g,[a,1.72,c],[a+.03,1.82,c],.015,HOLZ3); });
}
function milchkannen(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [[-.5,0,1],[.45,.25,.85],[.15,-.6,.92]].forEach(([a,c,s])=>{ const q=gruppe(g,a,0,c); q.scale.setScalar(s);
    walze(q,.38,1.0,0xc4ccd4,0,.5,0); rohr(q,.2,.38,.3,0xc4ccd4,0,1.15,0); walze(q,.2,.18,0xc4ccd4,0,1.38,0); walze(q,.27,.09,METALL2,0,1.5,0); ball(q,.07,METALL2,0,1.6,0);
    [.08,.95].forEach(y=>flach(ring(q,.39,.035,METALL2,0,y,0))); [-1,1].forEach(v=>ring(q,.13,.035,METALL2,v*.38,.98,0)); });
}
function wagenrad(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  const r=gruppe(g,0,1.18,0); r.rotation.x=-.16;
  ring(r,1.05,.12,HOLZ2,0,0,0); ring(r,1.17,.04,METALL2,0,0,0); flach(walze(r,.24,.34,HOLZ3,0,0,0)); ball(r,.11,METALL2,0,0,.2);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4+.2; strich(r,[0,0,0],[Math.cos(a)*1.0,Math.sin(a)*1.0,0],.065,HELLHOLZ); }
}
/* flache offene Obstkiste mit Äpfeln */
function apfelkiste(par,x,z,dreh,farbe){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  box(g,1.7,.22,1.2,HOLZ2,0,.24,0);
  [-1,1].forEach(s=>{ [.28,.52].forEach(y=>box(g,1.7,.16,.08,HELLHOLZ,0,y,s*.6)); [.28,.52].forEach(y=>box(g,.08,.16,1.2,HELLHOLZ,s*.85,y,0)); [-1,1].forEach(c=>box(g,.14,.68,.14,HOLZ,s*.84,.34,c*.59)); });
  for(let i=0;i<4;i++) for(let j=0;j<3;j++){ const a=-.58+i*.39, c=-.34+j*.34; ball(g,.2,(i+j)%3?farbe:0xe8c030,a,.5+((i*j)%2)*.07,c); strich(g,[a,.68,c],[a+.02,.78,c],.014,HOLZ3); }
}
function kuerbisse(par,x,z){
  const g=gruppe(par,x,0,z);
  [[0,0,.62],[.9,.5,.42],[-.35,.9,.34],[.55,-.75,.38]].forEach(([a,c,r],i)=>{ const f=i%2?0xf09828:0xe0761c;
    for(let j=0;j<7;j++){ const w=j*.898; ball(g,r*.62,f,a+Math.cos(w)*r*.42,r*.72,c+Math.sin(w)*r*.42,1,1.18,1); }
    strich(g,[a,r*1.35,c],[a+.1,r*1.7,c],.065,GRUEN); });
}
/* Kräuter- und Blumenbündel, hängen an einer Stange. Blick nach +z */
function buendelStange(par,x,y,z,dreh,n){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  const br=n*.55; quer(walze(g,.06,br+.3,HOLZ3,0,0,0));
  [-1,1].forEach(s=>strich(g,[s*br/2,0,0],[s*br/2,.1,-.45],.045,HOLZ3));
  for(let i=0;i<n;i++){ const u=-br/2+(i+.5)*br/n, art=i%4, l=.55+(i%3)*.12;
    /* Kraut (grün), Lavendel, Strohblumen, Salbei */
    const blatt=[0x5c8c3c,0x7c9460,0x6c8438,0x8ca888][art], bluete=[0,0x9060b8,0xf0a828,0][art];
    strich(g,[u,0,.03],[u,-.2,.03],.016,SEIL); strich(g,[u,-.14,.03],[u,-.3,.03],.04,0x8a7438); walze(g,.06,.06,ROT,u,-.25,.03);
    for(let j=0;j<7;j++){ const v=(j-3)/3, ex=u+v*.22+((j*i)%3-1)*.02, ey=-.28-l*(1-Math.abs(v)*.22)-(j%2)*.08, ez=.03+((j%3)-1)*.08;
      strich(g,[u+v*.03,-.26,.03],[ex,ey,ez],.012,0x7a6a2c);
      [.45,.68,.9].forEach((q,m)=>{ const b=ball(g,.05,blatt,u+(ex-u)*q+((m+j)%2?.035:-.035),-.26+(ey+.26)*q,.03+(ez-.03)*q+.015,.55,1.35,.45); b.rotation.z=((m+j)%2?.7:-.7); });
      if(art===1) [0,1,2].forEach(m=>ball(g,.036,bluete,ex+(ex-u)*m*.07,ey-m*.055,ez));
      else if(art===2){ ball(g,.062,bluete,ex,ey-.03,ez); ball(g,.028,0xa86018,ex,ey-.03,ez+.055); }
      else ball(g,.055,blatt,ex,ey-.03,ez,.55,1.5,.45); } }
}
/* Hufeisen an der Wand */
function hufeisen(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh;
  [-.75,0,.75].forEach((u,i)=>{ const r=ring(g,.24,.07,METALL,u,(i%2)*.18,.1,Math.PI*1.45); r.rotation.z=-Math.PI*.22; ball(g,.04,EISEN,u,(i%2)*.18+.34,.1); });
}
/* Wandbrett mit Gläsern Honig und Äpfeln */
function wandbrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh;
  box(g,3.2,.12,.55,HELLHOLZ,0,0,.28); [-1.3,1.3].forEach(a=>strich(g,[a,-.65,.05],[a,-.05,.48],.06,BALKEN));
  [-1.2,-.65].forEach(a=>{ walze(g,.22,.44,0xe8a020,a,.28,.28); walze(g,.24,.1,ROT,a,.55,.28); walze(g,.225,.14,CREME,a,.26,.28); });
  [.1,.46,.82,1.18].forEach((a,i)=>ball(g,.17,i%2?0xd84030:0x90b838,a,.22,.28));
}
/* Laterne an einem kurzen Arm vor der Wand (Wandgruppe, Arm zeigt in den Raum) */
function wandlaterne(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh;
  box(g,.1,.1,.68,HOLZ3,0,.66,.33); PH.laterne(g,0,0,.62);
}
/* Taube sitzt auf einem Balken, nickt. Blick nach +z */
function taube(k,par,x,y,z,dreh,phase){
  const g=lebt(gruppe(par,x,y,z)); g.rotation.y=dreh;
  const r=gruppe(g,0,0,0); ball(r,.22,0xa8b0c4,0,.22,0,.9,.95,1.35); [-1,1].forEach(s=>ball(r,.14,0x7a84a0,s*.17,.24,-.06,.45,.8,1.5)); ball(r,.09,0x7a84a0,0,.18,-.34,1,.4,1.8); verschmelze(r);
  const kopf=gruppe(g,0,.42,.2); ball(kopf,.13,0x8890ac,0,.04,0); ball(kopf,.1,0x5a9a8a,0,-.07,-.02); const s=kegel(kopf,.035,.1,0xe8a830,0,.02,.16); s.rotation.x=Q; [-1,1].forEach(v=>ball(kopf,.025,SCHWARZ,v*.09,.07,.08)); verschmelze(kopf);
  k.anim.push(t=>{ kopf.position.z=.2+Math.max(0,Math.sin(t*1.7+phase))*.09; kopf.rotation.y=Math.sin(t*.6+phase)*.6; });
}

function baue(k){
  const sc=k.scene, wandTex=PH.bretterBild([188,136,82],'#4a2c14');
  const h=PH.huelle(k,{ B,T,H, himmelLicht:0xfff0d0, grund:0x6a4a2c, staerke:.8, sonne:0xffe4ac, sonneStaerke:.42,
    wandBild:wandTex, bodenBild:PH.dielenBild([172,122,72],'#432a14'), leiste:HOLZ3, sockel:0, oeffnung:{x:0,b:4.4,h:4.2} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  /* Der dunkle Außenboden liegt tiefer, damit man durch das Heutor in den Hof hinunterschauen kann */
  const aussen=sc.children.find(o=>Math.abs(o.position.y+.06)<.001); if(aussen) aussen.position.y=-5.4;
  const tuer=baueTor(k,sc,hinten);
  baueFenster(k,sc,hinten);
  gebaelk(hinten,links,rechts);

  /* ---------- an der Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  wandlaterne(dh,-3.15,3.0,HINTEN+.2,0); wandlaterne(dh,3.15,3.0,HINTEN+.2,0);
  buendelStange(dh,-11.4,4.5,HINTEN+.42,0,6);
  hufeisen(dh,-11.4,2.5,HINTEN,0);
  buendelStange(dh,15.4,3.55,HINTEN+.45,0,4);
  milchkannen(dh,-11.3,-12.3,.2); k.kasten(-11.25,-12.5,2.0,1.7);

  /* ---------- links ---------- */
  const dl=gruppe(links,0,0,0);
  buendelStange(dl,-17.55,4.6,-3.3,Q,7);
  wandbrett(dl,-17.98,2.85,-3.3,Q);
  hufeisen(dl,-18,2.7,3.3,Q);
  buendelStange(dl,-17.55,4.6,9.8,Q,6);
  wandlaterne(dl,-17.98,3.0,-9.9,Q); wandlaterne(dl,-17.98,3.0,6.6,Q);
  /* ---------- rechts ---------- */
  const dr=gruppe(rechts,0,0,0);
  buendelStange(dr,17.55,4.6,-9.9,-Q,6);
  wandbrett(dr,17.98,2.2,3.3,-Q);
  buendelStange(dr,17.55,4.6,3.3,-Q,7);
  hufeisen(dr,18,2.6,-3.3,-Q);
  wandlaterne(dr,17.98,3.0,-6.6,-Q); wandlaterne(dr,17.98,3.0,9.9,-Q);
  [dh,dl,dr].forEach(verschmelze);
  /* Tauben auf den Wandbalken */
  taube(k,links,-17.78,3.67,-8.2,Q,0); taube(k,links,-17.78,3.67,1.4,Q+.5,2.2); taube(k,rechts,17.78,3.67,-1.2,-Q,4.1);
  /* warmes Licht der Laternen */
  flacker(k,5.0,3.4,-11.2,0xffb858,.45,11); flacker(k,-13.0,3.6,3.0,0xffb864,.4,12); flacker(k,13.0,3.6,-3.0,0xffb864,.4,12);

  /* ---------- lose Heuhaufen am Rand ---------- */
  heuhaufen(sc,[[-15.6,-11.5,2.2,2.2,1.7],[15.6,-11.4,2.2,2.4,1.75],[-16.2,-7.6,1.6,1.5,2.2],[16.2,.4,1.6,1.6,2.1],[-15.2,11.2,2.4,1.5,1.9],[15.2,11.2,2.4,1.5,1.9],[-4.8,12.3,1.9,.8,1.0],[-16.4,.0,1.35,1.0,1.4]]);
  k.kasten(-15.6,-11.5,4.5,3.6); k.kasten(15.6,-11.4,4.5,3.6); k.kasten(-16.3,-7.6,3.2,4.5); k.kasten(16.3,.4,3.2,4.4);
  k.kasten(-15.2,11.2,4.9,3.9); k.kasten(15.2,11.2,4.9,3.9); k.kasten(-4.8,12.3,3.9,2.0); k.kasten(-16.5,0,2.8,2.9);

  /* ---------- Deko am Boden (an den Rändern) ---------- */
  const v=gruppe(sc,0,0,0);
  fass(v,-17.0,4.3,0xd84030); k.kreis(-17.0,4.3,.75);
  fass(v,-16.7,5.8); k.kreis(-16.7,5.8,.75);
  apfelkiste(v,-16.6,8.0,Q+.1,0xd84030); k.kasten(-16.6,8.0,1.4,1.9);
  milchkannen(v,16.7,-5.6,-Q); k.kasten(16.8,-5.6,1.9,2.0);
  kuerbisse(v,16.3,5.2); k.kasten(16.45,5.25,2.4,2.6);
  fass(v,17.0,7.9); k.kreis(17.0,7.9,.75);
  apfelkiste(v,3.0,12.3,.12,0x90b838); k.kasten(3.0,12.3,1.9,1.4);
  apfelkiste(v,4.95,12.5,-.18,0xd84030); k.kasten(4.95,12.5,1.9,1.5);
  kuerbisse(v,9.2,12.0); k.kasten(9.35,12.05,2.4,2.5);
  fass(v,-10.2,12.5,0x90b838); k.kreis(-10.2,12.5,.75);
  fass(v,-.5,12.4,0x90b838); k.kreis(-.5,12.4,.75);
  wagenrad(v,-17.3,-3.4,Q); k.kasten(-17.3,-3.4,1.1,2.6);
  verschmelze(v);

  /* ---------- Strohhalme auf dem Boden ---------- */
  [[-13.2,-9.2,1.7,60],[13.0,-9.4,1.7,60],[-4.6,-6.2,2.6,45],[-3.6,-7.9,1.5,22],[-13.6,2.2,2.0,40],[13.8,-1.2,1.6,40],[-10.4,-2.0,2.2,30],[4.8,4.4,2.4,35],[-11.6,10.0,1.8,40],[11.6,9.4,1.8,40],[.8,7.6,2.4,25],[0,-12.0,1.6,22],[7.2,-9.0,1.8,22]].forEach(([x,z,r,n])=>PH.halme(sc,x,z,r,n));

  /* ---------- Leben ---------- */
  flugSchwalbe(k,-9.5,4.4,-8.2,4.2,2.6,.85,0);
  flugSchwalbe(k,9.0,4.7,-8.6,3.8,2.4,-.95,2.1);
  flugSchwalbe(k,-12.4,4.1,1.5,2.8,4.6,.7,4.0);
  flugSchwalbe(k,12.8,4.3,-1.0,2.4,4.4,-.75,1.2);
  maeuschen(k,[[-13.0,-9.2],[-7.6,-9.8],[-7.8,-5.0],[-13.4,-5.4]],1.5,0);
  maeuschen(k,[[7.4,-9.4],[13.0,-8.4],[12.8,-3.8],[12.8,-7.4]],1.3,5);
  maeuschen(k,[[-7.4,8.4],[-2.0,9.6],[1.6,6.8],[-4.6,5.6]],1.1,9);
  huhn(k,[[-14.2,1.6],[-14.2,8.4],[-13.8,3.2],[-8.0,.6]],.8,2,0xf6f0e4);
  huhn(k,[[7.8,7.4],[13.4,6.4],[13.2,8.4],[7.4,10.2]],.65,6,0xb8682e);

  return { tuer, start:[0,-.6] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-12.8,-9.2],[-8.4,-10.4],[-8.0,-4.6],[-13.4,-3.6],[-1.4,-8.4],[7.6,-9.4],[13.2,-8.2],[13.8,-3.8],[7.2,-1.8],[-6.4,-1.6],
  [-13.8,2.2],[-14.2,8.4],[-6.6,6.4],[-2.2,9.6],[1.4,5.6],[8.6,8.2],[13.4,6.2],[14.0,-6.4],[-8.2,9.8],[.8,2.8]];

/* ---------- Bilder für die Gegenstände ---------- */
function skalaBild(){
  return bild(256,256,(g)=>{ g.fillStyle='#fbf4de'; g.fillRect(0,0,256,256); g.strokeStyle='#2a1a08'; g.lineCap='round';
    for(let i=0;i<=20;i++){ const a=Math.PI*.75+i*Math.PI*1.5/20, gross=i%5===0; g.lineWidth=gross?9:4; g.beginPath(); g.moveTo(128+Math.cos(a)*(gross?82:94),128+Math.sin(a)*(gross?82:94)); g.lineTo(128+Math.cos(a)*112,128+Math.sin(a)*112); g.stroke(); }
    g.fillStyle='#2a1a08'; g.font='700 34px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('kg',128,188); });
}
function haferBild(){
  return bild(192,192,(g)=>{ g.fillStyle='#f4e8c8'; g.fillRect(0,0,192,192); g.strokeStyle='#8a5a20'; g.lineWidth=9; g.strokeRect(6,6,180,180);
    g.lineWidth=7; g.beginPath(); g.moveTo(96,166); g.lineTo(96,40); g.stroke();
    g.fillStyle='#c8941c'; [[96,38,0],[70,62,-.6],[122,62,.6],[68,98,-.6],[124,98,.6],[70,132,-.6],[122,132,.6]].forEach(([x,y,a])=>{ g.beginPath(); g.ellipse(x,y,12,22,a,0,7); g.fill(); if(x!==96){ g.beginPath(); g.moveTo(96,y+30); g.lineTo(x,y+8); g.stroke(); } }); });
}

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-4.9, z:-5.4, dreh:.1, steh:[-4.8,-3.2], kasten:[4.0,1.8], treffer:[3.8,2.3,1.6], baue(g,k){ /* 1 Heuballen */
      PH.ballen(g,-.95,0,0,1.75,.95,1.25,.03,HEU); PH.ballen(g,.92,0,-.04,1.75,.95,1.25,-.05,HEU); PH.ballen(g,-.05,.96,0,1.75,.95,1.2,.12,HEU);
      for(let i=0;i<12;i++){ const x=-1.7+i*.31; strich(g,[x,.03,.72+(i%3)*.08],[x+.26,.05,.86-(i%2)*.18],.018,i%2?HEU:STROH2); } } },
  { x:5.75, y:0, z:HINTEN, wand:'hinten', steh:[5.75,-11.0], kasten:[2.6,2.4], treffer:[2.6,3.9,1.3], trefferY:.7, baue(g,k){ /* 2 Seilrolle am Balken */
      box(g,2.5,.34,.4,BALKEN,0,4.4,.35); [-1.05,1.05].forEach(x=>{ box(g,.16,.5,.12,EISEN,x,4.4,.58); ball(g,.06,METALL,x,4.55,.66); });
      box(g,.32,.3,.95,BALKEN,0,4.35,.8); strich(g,[0,3.55,.45],[0,4.25,1.0],.1,HOLZ2);
      /* Rolle */
      const Z=1.05, MY=3.35;
      [-.16,.16].forEach(d=>box(g,.14,.8,.05,EISEN,0,MY+.35,Z+d)); box(g,.2,.16,.38,EISEN,0,4.15,Z);
      flach(walze(g,.42,.18,HOLZ,0,MY,Z)); ring(g,.46,.07,METALL2,0,MY,Z-.08); ring(g,.46,.07,METALL2,0,MY,Z+.08);
      [0,1,2].forEach(i=>{ const a=i*1.047+.3; strich(g,[-Math.cos(a)*.38,MY-Math.sin(a)*.38,Z+.11],[Math.cos(a)*.38,MY+Math.sin(a)*.38,Z+.11],.04,HELLHOLZ); }); ball(g,.1,GOLD,0,MY,Z+.2);
      ring(g,.46,.075,SEIL,0,MY,Z,Math.PI);
      /* Strang zum Wandhaken, dort ein dickes aufgewickeltes Seil */
      strich(g,[.46,MY,Z],[.78,1.95,.38],.065,SEIL);
      box(g,.5,.14,.14,HOLZ3,.8,1.95,.14); strich(g,[.8,1.95,.1],[.8,1.97,.48],.08,HOLZ3);
      /* aufgewickeltes Seil: viele Schlingen nebeneinander, oben zusammengebunden, ein loses Ende */
      [[.48,0,0,.20],[.43,.03,.01,.27],[.38,-.02,-.01,.34],[.46,-.03,.01,.38],[.33,.01,.02,.42],[.41,.02,-.02,.48]].forEach(([rad,dx,kipp,z],i)=>{ const q=ring(g,rad,.045,i%2?0xcca868:SEIL,.8+dx,1.95-rad*1.3,z); q.scale.y=1.3; q.rotation.z=kipp*3; });
      [-.07,0,.07].forEach(d=>{ const q=ring(g,.19,.035,0xb88c48,.8+d,1.93,.34); q.rotation.y=Q; });
      strich(g,[.87,1.88,.55],[1.08,1.25,.58],.045,SEIL); strich(g,[1.08,1.25,.58],[1.02,.9,.56],.045,SEIL); ball(g,.07,0xb88c48,1.02,.88,.56);
      /* Strang mit Haken, pendelt leicht */
      const p=lebt(gruppe(g,-.46,MY,Z)); strich(p,[0,0,0],[0,-1.85,0],.065,SEIL); ball(p,.14,0xd8bc80,0,-1.85,0,1,1.2,1); walze(p,.05,.24,METALL2,0,-2.05,0); ring(p,.2,.055,METALL,0,-2.32,0,Math.PI*1.5).rotation.z=Math.PI*.9; verschmelze(p);
      k.anim.push(t=>{ p.rotation.z=Math.sin(t*1.5)*.07; }); } },
  { x:3.9, z:-3.5, steh:[3.9,-1.35], r:1.25, treffer:[2.5,1.7,2.3], baue(g,k){ /* 3 Katzenkorb */
      const W=0xb47c40, W2=0x8a5828;
      walze(g,1.0,.1,W2,0,.06,0); rohr(g,1.18,.98,.58,W,0,.36,0,28,true);
      for(let i=0;i<22;i++){ const a=i*Math.PI/11; strich(g,[Math.cos(a)*1.0,.08,Math.sin(a)*1.0],[Math.cos(a)*1.19,.62,Math.sin(a)*1.19],.045,i%2?W2:0xd09a58); }
      [[.24,1.07],[.45,1.14]].forEach(([y,r])=>flach(ring(g,r,.04,W2,0,y,0))); flach(ring(g,1.19,.12,0xc89050,0,.66,0));
      walze(g,1.02,.2,0xb03838,0,.34,0); ball(g,1.0,0xc84848,0,.4,0,1,.16,1);
      /* schlafende Katze, eingerollt */
      const F=0xe8923a, D=0xa85c1c, HELL=0xfaead0;
      const rumpf=lebt(gruppe(g,0,.52,-.1));
      ball(rumpf,.6,F,0,.18,-.06,1.28,.72,.98);
      [-.42,-.14,.14,.42].forEach((x,i)=>ball(rumpf,.6,D,x*1.05,.2,-.07,.12,.76-Math.abs(x)*.2,1.02-Math.abs(x)*.25));
      ball(rumpf,.34,F,-.5,.12,.08,1.1,.8,1.1); verschmelze(rumpf);
      const kopf=lebt(gruppe(g,.46,.78,.52)); kopf.rotation.set(.05,-.12,-.14);
      ball(kopf,.37,F,0,0,0,1.08,.92,.95);
      [-1,1].forEach(s=>{ const o=kegel(kopf,.14,.3,F,s*.24,.36,-.02); o.rotation.z=-s*.35; o.scale.z=.08; const i=kegel(kopf,.075,.18,0xf0a8a0,s*.235,.33,.04); i.rotation.z=-s*.35; i.scale.z=.035;
        /* geschlossene Augen: kleine Bögen nach unten */
        const a=ring(kopf,.082,.017,SCHWARZ,s*.15,.07,.35,Math.PI); a.rotation.z=Math.PI;
        ball(kopf,.12,HELL,s*.085,-.12,.3,1,.8,.7);
        [-.03,.04].forEach(y=>strich(kopf,[s*.16,-.11,.37],[s*.5,-.11+y,.33],.007,WEISS)); });
      ball(kopf,.05,0xe0707a,0,-.055,.39,1.2,.9,.8); [-.12,0,.12].forEach(x=>strich(kopf,[x,.32,.17],[x*1.2,.2,.31],.025,D));
      verschmelze(kopf);
      /* Pfoten und Schwanz vorn herum */
      [.12,.46].forEach(x=>ball(g,.14,HELL,x,.57,.82,1,.7,1.25));
      const S=[[-.82,.66,-.12],[-.84,.62,.34],[-.58,.6,.68],[-.2,.6,.82]];
      for(let i=0;i<3;i++){ strich(g,S[i],S[i+1],.14-i*.012,i===1?D:F); ball(g,.14-i*.012,F,S[i+1][0],S[i+1][1],S[i+1][2]); } ball(g,.13,HELL,-.14,.6,.83,1.3,1,1);
      k.anim.push(t=>{ const a=Math.sin(t*1.9); rumpf.scale.set(1+a*.015,1+a*.075,1+a*.025); kopf.position.y=.78+a*.018; }); } },
  { x:10.2, z:-5.2, dreh:-.12, steh:[10.0,-2.8], kasten:[3.7,2.0], treffer:[2.8,3.0,1.4], baue(g,k){ /* 4 Heurechen */
      const C=0xf0cc90, C2=0xe4b878, K=[-.5,.66,.45], E=[1.05,2.75,-.38];
      const auf=u=>[K[0]+(E[0]-K[0])*u,K[1]+(E[1]-K[1])*u,K[2]+(E[2]-K[2])*u];
      /* unauffällige schmale Stütze unter dem Stiel */
      const a=auf(.8); strich(g,[a[0],.03,a[2]-.2],[a[0],a[1]-.12,a[2]],.055,HOLZ3); strich(g,[a[0]-.2,a[1]-.1,a[2]],[a[0]+.2,a[1]-.14,a[2]],.045,HOLZ3);
      /* langer Stiel und zwei Bügel zum Querholz */
      strich(g,K,E,.09,C); ball(g,.1,C,E[0],E[1],E[2]);
      const b=auf(.3); [-1,1].forEach(s=>strich(g,b,[K[0]+s*.68,K[1]+.08,K[2]],.05,C2));
      box(g,2.2,.2,.24,C,K[0],K[1],K[2]);
      /* stumpfe Holzzinken, nach unten auf den Boden */
      for(let i=0;i<8;i++){ const x=K[0]-.98+i*.28; walze(g,.07,.48,C,x,.34,K[2]); ball(g,.07,C,x,.1,K[2]); ball(g,.05,HOLZ,x,.77,K[2],1,.6,1); }
      /* ein paar lose Halme davor */
      for(let i=0;i<14;i++){ const x=-1.55+i*.13, z=.68+(i%3)*.08; strich(g,[x,.02,z],[x+(i%2?.28:-.18),.035+(i%3)*.012,z+.16-(i%4)*.09],.012,i%2?STROH2:0xf8dc80); } } },
  { x:-10.4, z:-1.8, dreh:.2, steh:[-9.8,.4], kasten:[3.4,2.0], treffer:[3.2,2.2,1.8], baue(g,k){ /* 5 Futtersäcke */
      const sack=(x,z,s,f,f2,offen,schraeg)=>{ const q=gruppe(g,x,0,z); q.scale.setScalar(s); q.rotation.z=schraeg||0;
        ball(q,.62,f,0,.52,0,1,.9,.82); rohr(q,.42,.6,.8,f,0,.9,0,18).scale.z=.82;
        if(offen){ flach(ring(q,.45,.11,f2,0,1.34,0)).scale.y=.82; ball(q,.42,0xe8b83c,0,1.32,0,1,.42,.82); for(let i=0;i<22;i++){ const a=i*2.4, d=.33*Math.sqrt((i+1)/22); ball(q,.045,i%2?0xf8d468:0xb8861c,Math.cos(a)*d,1.5-d*d*.9,Math.sin(a)*d*.82,1.7,.8,1); } }
        else {
          /* mit Schnur zugebunden, darüber ein kurzer, knittriger Stoffkragen */
          ball(q,.43,f,0,1.24,0,1,.56,.82);
          rohr(q,.17,.25,.18,f,0,1.5,0,12);
          flach(ring(q,.18,.05,0x6a3c18,0,1.59,0));
          rohr(q,.15,.15,.08,f2,0,1.63,0,10);
          for(let i=0;i<9;i++){ const a=i*.698+schraeg*4, hoch=.17+((i*5)%4)*.025, t=gruppe(q,Math.cos(a)*.15,1.61,Math.sin(a)*.15); t.rotation.y=-a; t.rotation.z=-.5-(i%3)*.12;
            box(t,.05,hoch,.13,i%2?f:f2,0,hoch/2,0); }
          strich(q,[.08,1.58,.2],[.17,1.36,.36],.018,0x6a3c18); strich(q,[.05,1.58,.2],[.02,1.38,.37],.018,0x6a3c18);
          /* gerade braune Naht unten */
          strich(q,[-.3,.27,.47],[.3,.27,.47],.012,0x7a5428); }
        return q; };
      sack(-.85,-.12,1.12,0xd0ae74,0xa8844c,false,.04);
      const m=sack(.55,-.25,1.0,0xbe9a64,0x92703e,false,-.07);
      const o=sack(.0,.45,.9,0xe0c48c,0xb4925c,true,0);
      const s=new THREE.Mesh(new THREE.PlaneGeometry(.62,.62),new THREE.MeshLambertMaterial({map:haferBild()})); s.position.set(0,.74,.52); s.rotation.x=-.12; o.add(s);
      /* Holzschaufel mit Körnern */
      box(g,.5,.07,.42,HELLHOLZ,1.25,.07,.5).rotation.y=-.5; strich(g,[1.38,.12,.4],[1.75,.3,.14],.06,HELLHOLZ); for(let i=0;i<16;i++){ const a=i*2.4, d=.19*Math.sqrt((i+1)/16); ball(g,.04,i%2?0xf8d468:0xb8861c,1.22+Math.cos(a)*d,.16-d*d*1.2,.52+Math.sin(a)*d*.8,1.6,.9,1); } } },
  { x:11.1, y:0, z:HINTEN-.08, wand:'hinten', steh:[10.4,-10.9], kasten:[2.8,.8], treffer:[2.8,2.5,1.2], trefferY:2.0, baue(g,k){ /* 6 Schwalbennest */
      const LEHM=0x9a7650, LEHM2=0x74543a, Y=3.45;
      box(g,2.7,.24,.5,BALKEN,0,4.45,.27); [-1.15,1.15].forEach(x=>strich(g,[x,3.9,.06],[x,4.35,.4],.07,BALKEN));
      const napf=new THREE.Mesh(new THREE.SphereGeometry(1,28,14,0,Math.PI,Math.PI/2,Math.PI/2),zweiseitig(LEHM)); napf.position.set(0,Y,.1); napf.scale.set(1.02,.82,.82); napf.castShadow=true; g.add(napf);
      /* Lehmklümpchen und Rand */
      for(let r=0;r<4;r++){ const u=.18+r*.3, q=Math.cos(u), n=11-r*2; for(let i=0;i<=n;i++){ const a=i/n*Math.PI+(r%2)*.1; if(a>Math.PI) continue; ball(g,.085,(i+r)%3?LEHM2:0xb08c60,Math.cos(a)*q*1.03,Y-Math.sin(u)*.83,.1+Math.sin(a)*q*.83); } }
      for(let i=0;i<=16;i++){ const a=i/16*Math.PI; ball(g,.11,i%2?LEHM:0xb08c60,Math.cos(a)*1.02,Y,.1+Math.sin(a)*.82); }
      const erde=new THREE.Mesh(new THREE.CircleGeometry(1,24,0,Math.PI),zweiseitig(0x4a3422)); erde.rotation.x=Q; erde.position.set(0,Y-.06,.1); erde.scale.set(.98,.78,1); g.add(erde);
      [[-.8,.5,-1.25,.2],[.72,.58,1.2,.34],[-.4,.86,-.7,.75],[.5,.8,.95,.62],[-.9,.3,-1.3,-.15]].forEach(([x,z,x2,y2])=>strich(g,[x,Y+.04,z],[x2,Y+y2-.2,z+.1],.014,STROH));
      /* drei junge Schwalben recken die Köpfe */
      const kinder=[[-.52,.56],[0,.72],[.52,.56]].map(([x,z],i)=>{ const q=lebt(gruppe(g,x,Y+.2,z)); ball(q,.2,SCHWALBE,0,-.17,-.04,1,1,1); schwalbenKopf(q,i!==2); q.rotation.y=-x*.45; verschmelze(q); return q; });
      /* eine große Schwalbe sitzt oben auf dem Balken */
      const gross=gruppe(g,-.75,4.78,.34); ball(gross,.24,SCHWALBE,0,0,0,1.5,.95,.85); ball(gross,.18,BAUCH,.12,-.08,.07,1.4,.75,.8);
      [-1,1].forEach(s=>strich(gross,[-.3,-.03,s*.05],[-.85,-.13,s*.18],.035,SCHWALBE)); ball(gross,.19,SCHWALBE2,-.14,.07,.14,1.7,.45,.5);
      const gk=gruppe(gross,.37,.17,.02); gk.rotation.y=.75; schwalbenKopf(gk,false); gk.scale.setScalar(.9);
      k.anim.push(t=>{ kinder.forEach((q,i)=>{ q.position.y=Y+.2+Math.max(0,Math.sin(t*3.2+i*2.1))*.14; q.rotation.x=-Math.max(0,Math.sin(t*3.2+i*2.1))*.22; }); }); } },
  { x:-4.8, z:2.4, dreh:.14, steh:[-4.5,4.6], kasten:[2.8,2.0], treffer:[2.6,3.0,1.8], baue(g,k){ /* 7 Futterwaage */
      const LACK=0x2f7a5a, LACK2=0x1e5a40;
      /* Wiegefläche */
      box(g,2.2,.2,1.5,EISEN,-.15,.22,.1); [-1.05,.75].forEach(x=>[-.45,.65].forEach(z=>walze(g,.15,.12,METALL2,x,.06,z)));
      [-.5,-.17,.16,.49].forEach((z,i)=>box(g,2.0,.07,.3,i%2?HELLHOLZ:0xdcae74,-.15,.355,z+.1));
      [-1,1].forEach(s=>box(g,.08,.1,1.5,METALL,-.15+s*1.08,.36,.1));
      /* Säule mit großer runder Anzeige */
      box(g,.5,.34,.5,LACK2,.35,.4,-.72); strich(g,[.35,.3,-.72],[.35,1.9,-.72],.15,LACK); [.62,1.75].forEach(y=>walze(g,.2,.1,GOLD,.35,y,-.72));
      flach(walze(g,.74,.34,LACK,.35,2.45,-.72)); ring(g,.72,.08,GOLD,.35,2.45,-.54);
      const s=new THREE.Mesh(new THREE.CircleGeometry(.66,32),new THREE.MeshLambertMaterial({map:skalaBild(),emissive:0x302818})); s.position.set(.35,2.45,-.535); g.add(s);
      const zeiger=lebt(gruppe(g,.35,2.45,-.5)); strich(zeiger,[0,-.12,0],[0,.52,0],.032,0xd02818); ball(zeiger,.08,GOLD,0,0,.02); verschmelze(zeiger);
      ball(g,.14,GOLD,.35,3.22,-.72);
      /* Möhren auf der Wiegefläche */
      [[-.75,.47,.1,.2],[-.35,.47,.32,-.15],[-.55,.66,.18,.05],[-.6,.47,-.22,.35],[-.15,.47,-.05,.1]].forEach(([x,y,z,w])=>{ const q=gruppe(g,x,y,z); q.rotation.y=w; const m=kegel(q,.13,.72,0xf07c1c,0,0,0); m.rotation.z=-Q; [-.1,.02,.12].forEach((d,i)=>strich(q,[-.34,0,0],[-.6,.12-Math.abs(d),d*1.6],.025,GRUEN)); });
      k.anim.push(t=>{ zeiger.rotation.z=.9+Math.sin(t*2.1)*.09*(1+Math.sin(t*.4)); }); } },
  { x:-3.8, z:-9.4, dreh:.12, steh:[-3.2,-7.3], kasten:[2.6,2.5], treffer:[2.4,3.6,2.4], baue(o,k){ /* 8 Leiter zum Heuboden: kommt aus einer Bodenluke */
      const g=gruppe(o,0,0,-.22);
      box(g,1.8,.03,1.2,basis(0x140a04),0,.03,.6).castShadow=false;
      [-1,1].forEach(s=>box(g,.22,.2,1.6,HOLZ2,s*1.0,.1,.6)); [-.1,1.3].forEach(z=>box(g,2.22,.2,.22,HOLZ2,0,.1,z));
      [-1,1].forEach(s=>[-.1,1.3].forEach(z=>box(g,.3,.24,.3,EISEN,s*1.0,.12,z)));
      /* Gestell mit Querholz, an dem die Leiter oben anliegt */
      [-1,1].forEach(s=>{ walze(g,.14,3.0,HOLZ3,s*1.0,1.5,-.55); box(g,.4,.14,.6,HOLZ3,s*1.0,.07,-.65); strich(g,[s*1.0,.1,-1.0],[s*1.0,1.2,-.6],.08,HOLZ3); });
      box(g,2.35,.22,.24,HOLZ2,0,2.93,-.56);
      const C=0xdca860;
      [-.66,.66].forEach(x=>{ strich(g,[x,.04,.75],[x*.9,3.35,-.55],.11,C); ball(g,.13,HOLZ2,x*.9,3.37,-.56); });
      for(let i=1;i<=7;i++){ const u=i/7.7, y=.04+u*3.31, z=.75-u*1.3; quer(walze(g,.08,1.36-u*.1,i%2?0xf0c47c:C,0,y,z)); }
      /* ein paar Halme am Lukenrand */
      for(let i=0;i<10;i++){ const x=-1.0+i*.21; strich(g,[x,.22,1.3],[x+.2,.24,1.42-(i%3)*.12],.015,i%2?STROH2:STROH); } } },
  { x:-11.0, z:5.4, dreh:.28, steh:[-9.8,7.9], kasten:[4.1,2.6], treffer:[3.6,3.3,1.8], baue(g,k){ /* 9 Schaukelpferd */
      const wippe=lebt(gruppe(g,0,2.75,0)), s=gruppe(wippe,0,-2.75,0);
      const F=0xf4ead6, M=0x7a3418, KUFE=0x2f6aa8;
      [-.55,.55].forEach(z=>{ const bogen=1.3, r=ring(s,2.65,.12,KUFE,0,2.77,z,bogen); r.rotation.z=-Q-bogen/2; [-1,1].forEach(v=>ball(s,.17,GOLD,v*1.62,.67,z)); });
      [-.9,.9].forEach(x=>box(s,.22,.1,1.2,HOLZ,x,.28,0));
      [[-.85,-.5],[.85,.5]].forEach(([x,v])=>[-.55,.55].forEach(z=>{ strich(s,[x+v*.3,.3,z],[x-v*.1,1.45,z*.55],.13,F); ball(s,.16,HOLZ3,x+v*.3,.37,z,1.1,.9,1); }));
      ball(s,.62,F,0,1.55,0,1.8,.95,.85); [[-.55,1.4,.48],[.5,1.38,.48],[-.85,1.65,.36],[.05,1.25,.47]].forEach(([x,y,z],i)=>[-1,1].forEach(v=>ball(s,.1+(i%2)*.03,0xb4703c,x,y,z*v,1.2,1,.5)));
      strich(s,[.7,1.7,0],[1.22,2.5,0],.3,F); ball(s,.34,F,1.32,2.58,0,1.15,1,.85); strich(s,[1.35,2.55,0],[1.8,2.36,0],.22,F); ball(s,.19,0xe8b0a0,1.88,2.33,0,.9,1,1.05);
      [-1,1].forEach(v=>{ const o=kegel(s,.12,.36,F,1.18,2.99,v*.17); o.rotation.x=v*.25; ball(s,.075,SCHWARZ,1.52,2.66,v*.27); ball(s,.025,WEISS,1.55,2.69,v*.33); ball(s,.035,HOLZ3,2.0,2.36,v*.11); });
      for(let i=0;i<7;i++){ const u=i/6; ball(s,.19,M,1.14-u*.68,2.9-u*.95,0,.9,1.1,.8); }
      ball(s,.14,M,1.4,2.89,0,1.3,.7,1);
      ring(s,.25,.035,ROT,1.64,2.42,0).rotation.y=Q; [-1,1].forEach(v=>strich(s,[1.66,2.3,v*.23],[.2,2.12,v*.45],.025,ROT));
      box(s,.95,.14,1.02,ROT,-.1,2.1,0); [-1,1].forEach(v=>{ box(s,.75,.55,.07,ROT,-.1,1.82,v*.55); box(s,.77,.08,.08,GOLD,-.1,1.55,v*.55); ring(s,.13,.03,METALL,.05,1.22,v*.62); strich(s,[0,1.8,v*.59],[.05,1.34,v*.62],.025,LEDER2); });
      ball(s,.15,ROT,.34,2.2,0,.8,1.2,2.2); ball(s,.15,ROT,-.55,2.2,0,.8,1.1,2.4); flach(walze(s,.06,.7,HOLZ3,1.08,2.4,0));
      strich(s,[-1.05,1.75,0],[-1.45,1.55,0],.15,M); strich(s,[-1.45,1.55,0],[-1.62,.95,0],.13,M); ball(s,.17,M,-1.63,.92,0,.8,1.4,.8);
      verschmelze(s);
      k.anim.push(t=>{ wippe.rotation.z=Math.sin(t*1.6)*.055; }); } },
  { x:4.9, z:3.6, dreh:-.38, steh:[3.7,5.9], kasten:[3.8,2.8], treffer:[3.6,1.8,1.9], baue(g,k){ /* 10 Alter Schlitten */
      const C=0xc07c3c, D=0x84501f;
      [-.68,.68].forEach(z=>{
        /* Kufe mit Eisenband und hochgebogener Spitze vorn (+x) */
        box(g,2.7,.16,.16,D,-.2,.17,z); box(g,2.7,.05,.18,METALL,-.2,.065,z);
        const b=ring(g,.55,.085,D,1.15,.72,z,Math.PI*.95); b.rotation.z=-Q; const e=ring(g,.64,.028,METALL,1.15,.72,z,Math.PI*.95); e.rotation.z=-Q;
        ball(g,.13,GOLD,1.2,1.28,z); ball(g,.1,D,-1.56,.17,z);
        [-1.2,-.2,.8].forEach(x=>strich(g,[x,.2,z],[x+.04,.86,z*.88],.085,D));
        box(g,2.5,.15,.14,D,-.22,.9,z*.88); });
      /* Sitzlatten mit Lücken */
      [-.42,-.14,.14,.42].forEach((z,i)=>box(g,2.6,.09,.21,i%2?C:0xd8985a,-.22,1.02,z));
      [-1.4,.95].forEach(x=>box(g,.18,.07,1.3,D,x,1.09,0));
      flach(walze(g,.07,1.5,D,1.2,1.2,0));
      /* Zugschnur nach vorn auf den Boden */
      const S=[[1.22,1.2,-.5],[1.75,.5,-.3],[1.95,.07,0],[1.75,.5,.3],[1.22,1.2,.5]];
      for(let i=0;i<4;i++) strich(g,S[i],S[i+1],.032,0xd83830);
      /* Glöckchen */
      [-1,1].forEach(s=>{ ball(g,.1,GOLD,1.45,.9,s*.43); strich(g,[1.22,1.2,s*.45],[1.45,.96,s*.43],.018,LEDER2); }); } }
];

return { titel:'Der Heuboden', breite:B, tiefe:T, oben:['22,14,8','54,34,18','100,66,36'], baue, gegenstaende, verstecke };
})();

/* Raum 4: Die Reithalle. Helle große Halle mit Sandboden, Hufschlag-Oval, Holzbande, hohen Fenstern, Dachbindern und Wimpelketten.
   Ein braunes Pferd mit Reitkind läuft im Kreis, Schwalben fliegen unter dem Dach.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Richtertisch mit Glocke) und 10 (Musikbox) sind neu.
   Ausgang: das Schiebetor zur Weide in der Rückwand, es rollt nach links zur Seite. */
RAEUME3D.pferdehof[3] = (function(){
const { HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER, LEDER2, STROH, STROH2, METALL, METALL2, EISEN, GOLD, MESSING, ROT, BLAU, GRUEN, CREME, SCHWARZ, WEISS, FELL } = PH;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const TORX=-3.5, TORB=4.4, TORH=4.0;
const TORGRUEN=0x3f7a52, TORGRUEN2=0x2a5a3a, GELB=0xf0c030, ORANGE=0xf07820, LILA=0x6a3a8a, HAUT=0xe8b890;
/* Hufschlag des laufenden Pferds: Mitte und Halbachsen */
const OX=1.2, OZ=2.2, ORX=4.2, ORZ=3.3;
const OVAL=[]; for(let i=0;i<28;i++){ const a=-i/28*Math.PI*2; OVAL.push([+(OX+Math.cos(a)*ORX).toFixed(2),+(OZ+Math.sin(a)*ORZ).toFixed(2)]); }

const PFERDSTART=19;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
const quer=(p,r,l,c,x,y,z)=>{ const m=walze(p,r,l,c,x,y,z); m.rotation.z=Math.PI/2; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* Gruppe an einer Seitenwand: Blick vom Raum aus ist +z, links gilt x = -z, rechts x = z */
function anWand(w,seite){ const g=gruppe(w,seite==='links'?-B/2:B/2,0,0); g.rotation.y=seite==='links'?Math.PI/2:-Math.PI/2; return g; }

/* ---------- Bilder ---------- */
function fensterBild(){
  return bild(256,192,(g)=>{ const v=g.createLinearGradient(0,0,0,192); v.addColorStop(0,'#8accf4'); v.addColorStop(1,'#e8f6ff'); g.fillStyle=v; g.fillRect(0,0,256,192);
    g.fillStyle='#ffffff'; [[60,50,30],[92,44,22],[190,70,26],[214,74,18]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); });
    g.fillStyle='#6aae52'; [[20,176,46],[84,186,38],[160,178,50],[232,184,40]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }); });
}
function weideBild(){
  return bild(1024,256,(g)=>{ const v=g.createLinearGradient(0,0,0,190); v.addColorStop(0,'#5ab0ee'); v.addColorStop(1,'#d8f0fc'); g.fillStyle=v; g.fillRect(0,0,1024,256);
    g.fillStyle='#fff6b0'; g.beginPath(); g.arc(430,60,30,0,7); g.fill();
    g.fillStyle='#ffffff'; [[160,60],[620,44],[860,80]].forEach(([x,y])=>{ [[0,0,26],[30,-10,22],[56,2,18]].forEach(([a,b,r])=>{ g.beginPath(); g.arc(x+a,y+b,r,0,7); g.fill(); }); });
    g.fillStyle='#8ac868'; g.beginPath(); g.moveTo(0,190); for(let x=0;x<=1024;x+=64) g.quadraticCurveTo(x+32,132+(x%192)/4,x+64,180); g.lineTo(1024,256); g.lineTo(0,256); g.fill();
    g.fillStyle='#5a9e44'; g.fillRect(0,206,1024,50);
    g.fillStyle='#3a7a3a'; [90,300,540,700,940].forEach((x,i)=>{ g.beginPath(); g.arc(x,176-(i%2)*8,24,0,7); g.fill(); }); });
}
/* großer Spiegel: einheitlich silberblaue Fläche mit blassem Spiegelbild (Hufschlag, Sprung, Pferd mit Reitkind) und schrägem Glanz */
function spiegelBild(){
  return bild(512,212,(g)=>{ g.fillStyle='#b6cedc'; g.fillRect(0,0,512,212);
    g.lineCap='round'; g.lineJoin='round';
    /* Hufschlag als blasses Oval am Boden */
    g.strokeStyle='rgba(78,104,128,.28)'; g.lineWidth=13; g.beginPath(); g.ellipse(256,168,215,30,0,0,7); g.stroke();
    /* Sprung mit Stangen */
    g.strokeStyle='rgba(62,90,118,.42)'; g.lineWidth=8; g.beginPath(); [62,168].forEach(x=>{ g.moveTo(x,176); g.lineTo(x,98); }); [112,136,160].forEach(y=>{ g.moveTo(62,y); g.lineTo(168,y); }); g.stroke();
    /* Pferd mit Reitkind */
    const F='rgba(62,86,114,.5)'; g.fillStyle=F; g.strokeStyle=F;
    g.beginPath(); g.ellipse(330,122,56,27,0,0,7); g.fill();
    g.lineWidth=26; g.beginPath(); g.moveTo(366,114); g.lineTo(396,76); g.stroke();
    g.beginPath(); g.ellipse(410,74,27,14,.45,0,7); g.fill();
    g.beginPath(); g.moveTo(388,66); g.lineTo(392,44); g.lineTo(402,62); g.fill();
    g.lineWidth=10; g.beginPath(); [[300,282],[316,322],[350,340],[372,392]].forEach(([x,u])=>{ g.moveTo(x,134); g.lineTo(u,178); }); g.stroke();
    g.lineWidth=16; g.beginPath(); g.moveTo(280,112); g.quadraticCurveTo(250,120,252,160); g.stroke();
    g.lineWidth=19; g.beginPath(); g.moveTo(326,96); g.lineTo(328,66); g.stroke();
    g.lineWidth=9; g.beginPath(); g.moveTo(326,98); g.lineTo(348,114); g.lineTo(340,142); g.moveTo(330,74); g.lineTo(358,90); g.stroke();
    g.beginPath(); g.arc(330,46,15,0,7); g.fill();
    /* schräger Glanz */
    g.fillStyle='rgba(255,255,255,.42)'; [[70,60],[148,18],[396,34]].forEach(([x,br])=>{ g.beginPath(); g.moveTo(x,212); g.lineTo(x+br,212); g.lineTo(x+br+120,0); g.lineTo(x+120,0); g.fill(); }); });
}
/* Tafel mit vier Hufschlagfiguren (ohne Buchstaben) */
function figurenBild(){
  return bild(512,368,(g)=>{ g.fillStyle='#fbf5e4'; g.fillRect(0,0,512,368);
    const feld=(x,y)=>{ g.fillStyle='#ecd8a8'; g.fillRect(x,y,216,150); g.strokeStyle='#6a4a24'; g.lineWidth=7; g.strokeRect(x,y,216,150); g.strokeStyle='#c8302a'; g.lineWidth=8; g.setLineDash([]); };
    feld(24,22); g.beginPath(); g.ellipse(132,97,88,56,0,0,7); g.stroke();
    feld(272,22); g.strokeStyle='#2a6ab0'; g.beginPath(); g.arc(326,97,46,0,7); g.stroke(); g.beginPath(); g.arc(434,97,46,0,7); g.stroke();
    feld(24,196); g.strokeStyle='#2f8a48'; g.beginPath(); g.moveTo(46,330); g.bezierCurveTo(260,330,260,270,132,271); g.bezierCurveTo(0,272,10,212,218,214); g.stroke();
    feld(272,196); g.strokeStyle='#8a3aa0'; g.beginPath(); g.moveTo(292,326); g.lineTo(468,216); g.stroke(); g.beginPath(); g.moveTo(436,216); g.lineTo(470,215); g.lineTo(457,246); g.stroke(); });
}
function buchstabeBild(){
  return bild(256,256,(g)=>{ g.fillStyle='#ffffff'; g.fillRect(0,0,256,256); g.fillStyle='#16243c'; g.font='700 210px Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('A',128,140); });
}

/* ---------- Ausgang: das Schiebetor ---------- */
function baueAusgang(k,sc,hinten){
  /* Weide dahinter: erst beim Öffnen sichtbar */
  const aussen=gruppe(hinten,TORX,0,HINTEN);
  const gras=PH.kornBild('#6cb04a',['rgba(210,240,130,.5)','rgba(30,100,30,.45)'],true); gras.wrapS=gras.wrapT=THREE.RepeatWrapping; gras.repeat.set(6,6);
  const wiese=new THREE.Mesh(new THREE.CircleGeometry(12,32,0,Math.PI),new THREE.MeshLambertMaterial({map:gras})); wiese.rotation.x=-Math.PI/2; wiese.position.set(0,.004,0); aussen.add(wiese);
  const himmel=new THREE.Mesh(new THREE.CylinderGeometry(11.9,11.9,6.4,40,1,true,Math.PI/2,Math.PI),new THREE.MeshBasicMaterial({map:weideBild(),side:THREE.DoubleSide})); himmel.position.set(0,3.15,0); aussen.add(himmel);
  const zg=gruppe(aussen,0,0,0);
  for(let x=-8;x<=8;x+=2) box(zg,.2,1.2,.2,HOLZ,x,.6,-7.4);
  [.55,1.0].forEach(y=>box(zg,16.2,.14,.1,HELLHOLZ,0,y,-7.4));
  walze(zg,.35,2.4,HOLZ2,3.6,1.2,-9.2); [[0,3.2,0,1.3],[-.8,2.6,.2,.85],[.9,2.7,.1,.9]].forEach(([x,y,z,r])=>ball(zg,r,0x3f8a46,3.6+x,y,-9.2+z));
  box(zg,2.0,.02,6.5,0xd8b878,0,.012,-3.2);
  const blumen=[]; for(let i=0;i<70;i++){ const x=((i*37)%140)/10-7, z=-.9-((i*53)%62)/10; if(Math.abs(x)<1.2) continue; blumen.push([x,.14,z,.09,.07,.09,[0xffffff,0xffd830,0xf070a0][i%3]]); }
  PH.viele(aussen,GEO.sph,blumen);
  const tufts=[]; for(let i=0;i<90;i++){ const x=((i*71)%150)/10-7.5, z=-.7-((i*29)%66)/10; if(Math.abs(x)<1.15) continue; tufts.push([x,.12,z,.08,.26,.08,i%2?0x4a9a34:0x84c458]); }
  PH.viele(aussen,GEO.cone,tufts);
  verschmelze(zg); ohneSchatten(zg); aussen.visible=false;
  /* fester Rahmen: Pfosten, Sturz und lange Laufschiene */
  const f=gruppe(hinten,TORX,0,HINTEN);
  [-1,1].forEach(s=>box(f,.3,TORH+.1,.34,HOLZ3,s*(TORB/2+.14),(TORH+.1)/2,.17));
  box(f,TORB+.8,.32,.4,HOLZ3,0,TORH+.2,.2);
  box(f,9.9,.14,.18,EISEN,-2.3,4.5,.66);
  [-7.1,-4.8,-2.4,0,2.45].forEach(x=>box(f,.16,.16,.7,EISEN,x,4.5,.34));
  [-7.28,2.7].forEach(x=>ball(f,.14,METALL2,x,4.5,.66));
  verschmelze(f); ohneSchatten(f);
  /* das Tor */
  const tor=gruppe(hinten,TORX,0,HINTEN+.58); tor.userData.lebendig=true;
  const W=TORB+.34;
  box(tor,W,TORH,.14,TORGRUEN,0,TORH/2+.04,0);
  for(let x=-W/2+.4;x<W/2-.2;x+=.4) box(tor,.03,TORH-.3,.02,TORGRUEN2,x,TORH/2+.04,.075);
  [.2,1.9,TORH-.09].forEach(y=>box(tor,W,.22,.08,WEISS,0,y,.1));
  [-1,1].forEach(s=>box(tor,.22,TORH,.085,WEISS,s*(W/2-.11),TORH/2+.04,.1));
  /* weiße Streben in beiden unteren Feldern */
  [-1,1].forEach(s=>{ const l=Math.hypot(W-.4,1.5), a=Math.atan2(1.5,W-.4); const m=box(tor,l,.16,.05,WEISS,0,1.05,.09+(s>0?.004:0)); m.rotation.z=s*a; });
  /* Laufrollen oben */
  [-1.55,1.55].forEach(x=>{ box(tor,.16,.82,.08,EISEN,x,4.33,.25); scheibe(tor,.2,.13,METALL,x,4.76,.165); scheibe(tor,.07,.2,EISEN,x,4.76,.22); });
  /* Griff und Zahlenschloss */
  box(tor,.1,.8,.1,EISEN,1.9,1.9,.2); [-.34,.34].forEach(v=>box(tor,.1,.1,.14,EISEN,1.9,1.9+v,.15));
  box(tor,1.55,1.2,.07,HOLZ3,0,2.82,.14); box(tor,1.4,1.06,.08,CREME,0,2.82,.15);
  const schloss=PH.zahlenschloss(tor,0,2.7,.31); schloss.scale.setScalar(1.15);
  verschmelze(tor); ohneSchatten(tor);
  const schimmer=schein(hinten,'rgba(255,220,110,.45)',TORX,2.75,HINTEN+1.2,1.5);
  const licht=new THREE.PointLight(0xfff4c8,0,12,1.5); licht.position.set(TORX,2.8,HINTEN-1.2); sc.add(licht);
  /* festgetretener Weg vor dem Tor, flach im Sand */
  const sw=gruppe(sc,TORX,0,-11.9); box(sw,3.4,.012,2.2,0x9c7442,0,.008,0); for(let i=0;i<4;i++) box(sw,3.1,.016,.07,0x7e5a30,0,.012,-.8+i*.53); ohneSchatten(sw); verschmelze(sw);
  k.kasten(TORX,-12.9,5.0,.9); /* geschlossenes Tor: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  const weich=a=>{ a=Math.max(0,Math.min(1,a)); return a*a*(3-2*a); };
  return ausgang(k,{ name:'Schiebetor', einfach:'Großes Schiebetor', steh:[TORX,-10.4], durch:[TORX,-15.8],
    treffer:{x:TORX,y:2.2,z:-12.7,b:5.0,h:4.4,t:.8}, schildOben:[TORX,4.55,-12.0], glanz:[TORX,2.75,-12.2],
    bewege:(auf,tz)=>{ const u=weich(auf/.85); tor.position.x=TORX-u*4.75; aussen.visible=auf>.02;
      schimmer.visible=auf<.05; licht.intensity=1.6*auf; const g=1.4+Math.sin(tz*2.4)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Wände: Bande, Fenster, Dachbinder, Wimpel ---------- */
/* Holzbande von x1 bis x2 (in Wand-Koordinaten, z = 0 ist die Wandfläche) */
function bande(g,x1,x2){
  const b=x2-x1, m=(x1+x2)/2;
  box(g,b,1.24,.1,HOLZ,m,.62,.3); box(g,b,.14,.46,HOLZ3,m,1.3,.23); box(g,b,.2,.14,HOLZ3,m,.1,.34);
  const n=Math.max(1,Math.round(b/1.1)); for(let i=0;i<=n;i++) box(g,.08,1.14,.05,HOLZ2,x1+.05+(b-.1)*i/n,.66,.36);
}
function fenster(g,x,tex,b){
  box(g,b+.3,2.35,.1,WEISS,x,3.95,.05); PH.tafel(g,tex,b,2.1,x,3.95,.11);
  const n=Math.round(b); for(let i=1;i<n;i++) box(g,.07,2.1,.05,WEISS,x-b/2+i*b/n,3.95,.13);
  box(g,b,.07,.05,WEISS,x,4.3,.135); box(g,b+.5,.14,.34,HOLZ,x,2.74,.17);
}
/* Pfosten mit zwei schrägen Streben bis zum oberen Balken */
function binder(g,x){
  box(g,.34,H,.2,HOLZ2,x,H/2,.1);
  [-1,1].forEach(s=>{ const m=box(g,.2,1.75,.16,HOLZ2,x+s*.6,5.65,.12); m.rotation.z=-s*.82; });
  box(g,.48,.22,.3,HOLZ3,x,4.95,.15);
}
function wimpel(g,x1,x2){
  const F=[ROT,GELB,BLAU,0x48a060,WEISS], n=Math.max(2,Math.round((x2-x1)/.55)), P=[];
  for(let i=0;i<=n;i++){ const u=i/n; P.push([x1+(x2-x1)*u, 5.95-Math.sin(u*Math.PI)*.34]); }
  for(let i=0;i<n;i++){ const a=P[i], b=P[i+1];
    strich(g,[a[0],a[1],.42],[b[0],b[1],.42],.012,HOLZ3);
    const m=kegel(g,.19,.42,F[(i+Math.round(x1+40))%5],(a[0]+b[0])/2,(a[1]+b[1])/2-.21,.42); m.rotation.z=Math.PI; m.scale.z=.02; }
}
function wandLaterne(g,x){ box(g,.1,.1,.5,EISEN,x,3.85,.4); PH.laterne(g,x,3.2,.62); }
function hufeisen(g,x,y){ const r=ring(g,.24,.06,MESSING,x,y,.08,Math.PI*1.45); r.rotation.z=-Math.PI*.225; [-1,1].forEach(s=>ball(g,.07,MESSING,x+s*.18,y-.17,.08)); ball(g,.05,EISEN,x,y+.31,.08); }
function schleife(g,x,y,c){
  [-1,1].forEach(s=>{ const m=box(g,.12,.46,.03,c,x+s*.09,y-.3,.05); m.rotation.z=s*.24; });
  scheibe(g,.23,.05,c,x,y,.08); for(let i=0;i<10;i++){ const a=i*.628; ball(g,.07,c,x+Math.cos(a)*.22,y+Math.sin(a)*.22,.08,1,1,.4); } scheibe(g,.11,.06,GOLD,x,y,.1);
}
function wandSchmuck(hinten,links,rechts){
  const h=gruppe(hinten,0,0,HINTEN), L=anWand(links,'links'), R=anWand(rechts,'rechts'), F=fensterBild();
  /* Rückwand: Bande mit Lücke am Tor */
  bande(h,-B/2,TORX-TORB/2-.28); bande(h,TORX+TORB/2+.28,B/2);
  fenster(h,-14.2,F,3.0); fenster(h,2.7,F,3.0); fenster(h,15.4,F,2.6);
  [-17.6,-11.7,-.35,5.4,13.3,17.6].forEach(x=>binder(h,x));
  [[-17.4,-11.7],[-.35,5.4],[5.4,13.3],[13.3,17.4]].forEach(([a,b])=>wimpel(h,a,b));
  wimpel(h,-11.7,-6.1); wimpel(h,-6.1,-.35);
  wandLaterne(h,-11.7); wandLaterne(h,5.4); wandLaterne(h,13.3);
  hufeisen(h,TORX-1.1,5.1); hufeisen(h,TORX,5.15); hufeisen(h,TORX+1.1,5.1);
  /* Seitenwände */
  [L,R].forEach(g=>{ bande(g,-T/2+.45,T/2-.45); [-12.9,-6.6,.8,7.0,12.9].forEach(x=>binder(g,x));
    [[-12.9,-6.6],[-6.6,.8],[.8,7.0],[7.0,12.9]].forEach(([a,b])=>wimpel(g,a,b)); });
  /* links: x = -z */
  [-9.9,-3.4,3.9,9.8].forEach(x=>fenster(L,x,F,3.0)); [-6.6,7.0].forEach(x=>wandLaterne(L,x));
  hufeisen(L,-.8,3.3); [[8.9,ROT],[9.8,BLAU],[10.7,GELB]].forEach(([x,c])=>schleife(L,x,2.3,c));
  /* rechts: x = z */
  [-9.7,3.9,9.9].forEach(x=>fenster(R,x,F,3.0)); [-6.6,7.0].forEach(x=>wandLaterne(R,x));
  [[-4.6,ROT],[-3.7,BLAU],[-2.8,GELB],[-1.9,0x48a060],[-1.0,LILA]].forEach(([x,c])=>schleife(R,x,3.7,c));
  /* Brett mit Reithelmen */
  box(R,4.6,.12,.56,HOLZ3,-2.8,2.25,.28); [-4.8,-.8].forEach(x=>box(R,.1,.5,.4,HOLZ3,x,1.98,.2));
  [[-4.4,BLAU],[-3.3,SCHWARZ],[-2.2,ROT],[-1.1,LILA]].forEach(([x,c])=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(.34,16,10,0,Math.PI*2,0,Math.PI/2),mat(c)); m.position.set(x,2.33,.3); R.add(m); box(R,.42,.06,.22,c,x,2.35,.58); ball(R,.05,WEISS,x,2.67,.3); });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Ausstattung an den Rändern ---------- */
function blumenkuebel(k,g,x,z,c){
  rohr(g,.52,.4,.62,HOLZ,x,.31,z,14); [.14,.5].forEach(y=>{ const r=ring(g,y<.3?.45:.51,.035,EISEN,x,y,z); r.rotation.x=Math.PI/2; });
  walze(g,.47,.06,0x4a2e18,x,.63,z);
  for(let i=0;i<9;i++){ const a=i*2.4, d=i?.12+(i%3)*.12:0; ball(g,.2,i%2?0x3f8a48:0x62a856,x+Math.cos(a)*d,.76+(i%3)*.07,z+Math.sin(a)*d,1,.8,1); if(i%2===0) ball(g,.1,c,x+Math.cos(a)*d*1.2,.98+(i%3)*.06,z+Math.sin(a)*d*1.2); }
  k.kreis(x,z,.58);
}
function eimer(g,x,z,c){ rohr(g,.33,.25,.52,c,x,.26,z,14,true); walze(g,.27,.05,c,x,.04,z); walze(g,.29,.03,0x6ab8e0,x,.44,z); const r=ring(g,.31,.022,METALL,x,.52,z,Math.PI); r.rotation.y=.4; }
/* Sattelbock mit abgelegtem Sattel, Länge längs der x-Achse der Gruppe */
function sattelbock(k,par,x,z,dreh,decke){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  [-.65,.65].forEach(a=>[-1,1].forEach(s=>strich(g,[a,0,s*.45],[a,1.05,0],.07,HOLZ2)));
  quer(g,.17,1.7,HOLZ,0,1.08,0);
  box(g,1.1,.08,.78,decke,0,1.27,0); [-1,1].forEach(s=>box(g,1.1,.42,.07,decke,0,1.08,s*.39));
  ball(g,.3,LEDER,0,1.42,0,1.7,.55,1.15); ball(g,.15,LEDER2,.45,1.55,0,.9,1.1,1.5); ball(g,.17,LEDER2,-.45,1.55,0,.8,1,1.8);
  [-1,1].forEach(s=>{ box(g,.46,.56,.07,LEDER,0,1.08,s*.45); const r=ring(g,.12,.03,METALL,.05,.62,s*.49); r.castShadow=false; box(g,.05,.3,.03,LEDER2,.05,.85,s*.49); });
}
/* Paar Reitstiefel im Profil: hoher Schaft, langer Fuß nach +x, helle Sohle mit Absatz */
function stiefel(g,x,z,c){
  [[-.45,-.12],[.25,.14]].forEach(([a,v])=>{ const u=x+a, w=z+v;
    box(g,.62,.07,.32,0xecd6a4,u+.13,.085,w); box(g,.2,.06,.3,0xecd6a4,u-.08,.03,w);
    ball(g,.15,c,u+.17,.2,w,1.75,.8,.98); ball(g,.15,c,u-.02,.24,w,1,1.1,.98);
    rohr(g,.155,.12,.7,c,u-.04,.58,w,12); walze(g,.172,.08,LEDER2,u-.04,.94,w); });
}
function fass(k,g,x,z){ rohr(g,.55,.55,1.1,0x3a6a8a,x,.55,z,16); [.16,.55,.94].forEach(y=>{ const r=ring(g,.56,.035,METALL,x,y,z); r.rotation.x=Math.PI/2; }); walze(g,.46,.04,0x7ac4e8,x,1.11,z); k.kreis(x,z,.6); }
/* Halmhaufen: dunkler kantiger Kern, außen viele einzelne Halme. teile: [x,y,z,halbeBreite,Höhe,halbeTiefe,Anzahl] */
function heu(par,teile){
  const L=[], farben=[0xf8dc80,STROH,0xd8ac38,0xfce8a0,STROH2];
  teile.forEach(([x,y,z,a,h,c,n])=>{
    const kern=teil(par,new THREE.IcosahedronGeometry(1,0),0x9a741e,x,y,z,a*.9,h*.88,c*.9); kern.rotation.y=x*1.7;
    for(let i=0;i<n;i++){ const az=i*2.39996+zufall()*.4, el=Math.asin(Math.min(.99,(i+.5)/n))+(zufall()-.5)*.12, r=1+zufall()*.1, l=(.24+zufall()*.3)*Math.min(1,.45+a*.5);
      L.push([x+Math.cos(el)*Math.cos(az)*a*r, y+Math.max(.02,Math.sin(el))*h*r, z+Math.cos(el)*Math.sin(az)*c*r, l,.022,.028, farben[i%5],
        -az+(zufall()-.5)*1.5, 0, -(1.45-el)*.6+(zufall()-.5)*.8]); }
  });
  return PH.viele(par,GEO.box,L);
}
function schubkarre(k,par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  box(g,1.5,.1,1.0,0x2f7a4a,0,.55,0); [-1,1].forEach(s=>{ box(g,1.6,.48,.09,0x3f9a5a,0,.8,s*.52); box(g,.09,.48,1.0,0x3f9a5a,s*.78,.8,0); });
  [-1,1].forEach(s=>{ strich(g,[-1.45,.92,s*.4],[.9,.36,s*.3],.055,HOLZ2); strich(g,[-.6,.55,s*.4],[-.75,0,s*.45],.06,EISEN); });
  scheibe(g,.34,.18,EISEN,.9,.34,0); scheibe(g,.13,.22,METALL,.9,.34,0);
  heu(g,[[-.22,.9,0,.55,.46,.44,120],[.36,.88,.03,.4,.34,.38,70]]);
  k.kasten(x-.1,z,3.0,1.6);
}
/* schlafende Katze, zusammengerollt; atmet leise */
function schlafkatze(k,par,x,y,z){
  const g=gruppe(par,x,y,z); g.userData.lebendig=true;
  const F=0x8a8a92, D=0x5a5a64;
  ball(g,.36,F,0,.2,0,1.25,.62,1); ball(g,.2,F,.33,.28,.17); [-1,1].forEach(s=>{ const o=kegel(g,.07,.15,D,.34+s*.11,.47,.17); o.rotation.z=-s*.2; strich(g,[.34+s*.08-.04,.29,.36],[.34+s*.08+.04,.29,.36],.012,SCHWARZ); });
  ball(g,.035,0xe0808a,.34,.23,.37); const s=ring(g,.38,.07,D,-.02,.1,.04,Math.PI*1.1); s.rotation.x=Math.PI/2;
  [-.22,0].forEach(a=>ball(g,.2,D,a,.31,-.02,.22,.75,1.2));
  verschmelze(g); ohneSchatten(g); k.anim.push(t=>{ g.scale.y=1+Math.sin(t*1.8)*.045; });
}
function ausstattung(k,sc){
  const d=gruppe(sc,0,0,0);
  /* Strohstapel in den Ecken */
  const stapel=(x,z,dreh)=>{ PH.ballen(d,x-.82,0,z,1.55,.8,1.0,dreh); PH.ballen(d,x+.82,0,z,1.55,.8,1.0,-dreh); PH.ballen(d,x,.8,z,1.55,.75,.95,dreh*2); k.kasten(x,z,3.35,1.25); };
  stapel(-15.7,-12.1,.03); stapel(15.6,-12.0,-.03); stapel(-13.6,12.2,.04);
  schlafkatze(k,sc,-15.7,1.55,-12.05);
  /* linke Wand */
  PH.ballen(d,-16.9,0,1.9,1.9,.85,1.0,Math.PI/2); PH.ballen(d,-16.9,0,-.1,1.7,.85,1.0,Math.PI/2+.05); PH.ballen(d,-16.9,.85,.9,1.7,.75,.95,Math.PI/2-.06); k.kasten(-16.9,.9,1.15,3.9);
  sattelbock(k,d,-16.8,6.4,Math.PI/2,BLAU); k.kasten(-16.8,6.4,1.15,1.9);
  blumenkuebel(k,d,-16.9,-7.2,0xf070a0); blumenkuebel(k,d,-16.9,10.0,0xffd830);
  stiefel(d,-17.0,-5.5,SCHWARZ); k.kreis(-17.0,-5.5,.75);
  /* rechte Wand */
  sattelbock(k,d,16.8,-7.4,Math.PI/2,ROT); k.kasten(16.8,-7.4,1.15,1.9);
  sattelbock(k,d,16.8,-4.8,Math.PI/2,GRUEN); k.kasten(16.8,-4.8,1.15,1.9);
  fass(k,d,16.9,-.4); eimer(d,16.9,.85,ROT); eimer(d,16.35,1.35,GELB); k.kasten(16.65,1.1,1.3,1.1);
  PH.ballen(d,16.9,0,8.2,1.9,.85,1.0,Math.PI/2); k.kasten(16.9,8.2,1.15,2.0);
  blumenkuebel(k,d,16.9,-9.8,0xffffff); blumenkuebel(k,d,16.9,11.0,0xf07030);
  /* an der Rückwand */
  blumenkuebel(k,d,.1,-12.25,0xffd830); blumenkuebel(k,d,4.4,-12.25,0xf070a0);
  stiefel(d,-11.35,-12.3,0x6a3a1c); k.kreis(-11.35,-12.3,.7);
  /* vorderer Rand, alles niedrig */
  blumenkuebel(k,d,-9.7,12.3,0xffffff); blumenkuebel(k,d,-8.3,12.4,0xf070a0);
  schubkarre(k,d,-4.5,12.0,.12);
  stiefel(d,-1.8,12.3,SCHWARZ); stiefel(d,-.35,12.35,0x6a3a1c); stiefel(d,1.1,12.25,BLAU); k.kasten(-.35,12.3,4.3,.85);
  fass(k,d,3.6,12.2); eimer(d,4.8,12.0,BLAU); eimer(d,5.45,12.45,ROT); k.kasten(5.1,12.25,1.3,1.1);
  sattelbock(k,d,8.9,12.1,.06,LILA); k.kasten(8.9,12.1,1.9,1.15);
  PH.ballen(d,12.6,0,12.2,1.8,.8,1.0,-.08); PH.ballen(d,14.6,0,12.1,1.7,.8,1.0,.1); k.kasten(13.6,12.15,3.9,1.3);
  blumenkuebel(k,d,16.7,12.5,0xffd830); blumenkuebel(k,d,-16.8,12.4,0xf07030);
  PH.ballen(d,-15.1,0,8.6,1.5,.75,1.0,.35); k.kreis(-15.1,8.6,.95);
  verschmelze(d); ohneSchatten(d);
  /* lose Halme an den Rändern */
  [[-14.2,-11,1.1],[14,-10.8,1.1],[-15.6,3.2,1.0],[15.6,7.6,.9],[-11.6,11,1.1],[11.4,11,1.0],[-3,11,1.0]].forEach(([x,z,r])=>PH.halme(sc,x,z,r,26));
}
/* Hufschlag: dunklere, festgetretene Bahn mit kleinen Hufabdrücken */
function hufspur(sc){
  const bahn=(rx,rz,breite,farbe,y,n)=>{ const L=[]; for(let i=0;i<n;i++){ const a=i/n*Math.PI*2, x=Math.cos(a)*rx, z=Math.sin(a)*rz, tx=-Math.sin(a)*rx, tz=Math.cos(a)*rz, l=Math.hypot(tx,tz)*Math.PI*2/n;
      L.push([OX+x,y+(i%2)*.0015,OZ+z,l*1.12,.008,breite,farbe,Math.atan2(-tz,tx)]); } PH.viele(sc,GEO.box,L); };
  bahn(ORX,ORZ,1.0,0xa47a46,.004,72);
  const U=[]; for(let i=0;i<150;i++){ const a=i/150*Math.PI*2, v=(i%2?.2:-.2), x=Math.cos(a)*(ORX+v), z=Math.sin(a)*(ORZ+v), dr=Math.atan2(-Math.cos(a)*ORZ,-Math.sin(a)*ORX);
    [-1,1].forEach(s=>U.push([OX+x+Math.sin(dr)*s*.065,.016,OZ+z+Math.cos(dr)*s*.065,.15,.008,.04,0x6e4e28,dr])); U.push([OX+x+Math.cos(dr)*.085,.016,OZ+z-Math.sin(dr)*.085,.045,.008,.17,0x6e4e28,dr]); }
  PH.viele(sc,GEO.box,U);
  /* Körner im Sand */
  const S=[]; for(let i=0;i<260;i++){ S.push([(zufall()-.5)*34,.012,(zufall()-.5)*25,.05+zufall()*.07,.018,.05+zufall()*.05,i%2?0x916a3a:0xd8b47c,zufall()*3]); }
  PH.viele(sc,GEO.box,S);
}
/* Reitkind im Sattel (in den Maßen des Pferds, Blick nach +x) */
function reitkind(par){
  const g=gruppe(par,0,0,0), JACKE=0xf0b020, HOSE=0x34507a;
  [-1,1].forEach(s=>{ strich(g,[-.08,2.3,s*.24],[.3,2.02,s*.6],.14,HOSE); ball(g,.14,HOSE,.3,2.02,s*.6); strich(g,[.3,2.02,s*.6],[.12,1.35,s*.63],.11,HOSE);
    walze(g,.12,.34,SCHWARZ,.12,1.31,s*.63); ball(g,.13,SCHWARZ,.2,1.13,s*.63,1.6,.75,1); });
  ball(g,.24,HOSE,-.08,2.3,0,1.1,.8,1.2);
  rohr(g,.2,.27,.68,JACKE,-.05,2.62,0,14); ball(g,.2,JACKE,-.05,2.94,0);
  [-1,1].forEach(s=>{ strich(g,[-.05,2.9,s*.22],[.16,2.62,s*.34],.075,JACKE); strich(g,[.16,2.62,s*.34],[.45,2.52,s*.15],.065,JACKE); ball(g,.08,HAUT,.48,2.52,s*.15);
    strich(g,[.48,2.52,s*.15],[1.9,2.44,s*.22],.014,LEDER2); });
  ball(g,.27,HAUT,-.02,3.28,0); [-1,1].forEach(s=>ball(g,.035,SCHWARZ,.23,3.3,s*.09));
  const m=ring(g,.08,.014,0x8a3a30,.245,3.21,0,Math.PI); m.rotation.set(0,Math.PI/2,Math.PI);
  /* Zopf */
  [0,1,2].forEach(i=>ball(g,.11-i*.02,0x7a4a20,-.27-i*.07,3.18-i*.13,0));
  const h=new THREE.Mesh(new THREE.SphereGeometry(.3,18,10,0,Math.PI*2,0,Math.PI/2),mat(ROT)); h.position.set(-.04,3.36,0); h.castShadow=true; g.add(h);
  box(g,.2,.05,.36,ROT,.26,3.38,0); ball(g,.05,WEISS,-.04,3.66,0);
  verschmelze(g); return g;
}
/* zwei Schwalben unter dem Dach vor der Rückwand */
function schwalben(k){
  [[0,-9.6,5.0,7.5,1.8,.42],[3.4,7.4,5.3,6.0,2.2,.5]].forEach(([phase,mx,y,rx,rz,tempo])=>{
    const g=gruppe(k.scene,0,y,0), C=0x24345a;
    g.userData.lebendig=true; ball(g,.13,C,0,0,0,1.8,.8,.8); ball(g,.09,WEISS,.04,-.05,0,1.4,.6,.75); ball(g,.09,C,.24,.03,0); ball(g,.04,ORANGE,.31,-.01,0); const sp=kegel(g,.04,.09,GELB,.36,.04,0); sp.rotation.z=-Math.PI/2;
    [-1,1].forEach(s=>strich(g,[-.18,0,0],[-.45,.02,s*.14],.025,C));
    const fl=[-1,1].map(s=>{ const q=gruppe(g,0,.03,s*.06); q.userData.lebendig=true; box(q,.2,.03,.4,C,-.03,0,s*.2); box(q,.1,.025,.22,C,-.12,0,s*.48); return q; });
    fl.forEach(verschmelze); verschmelze(g); ohneSchatten(g);
    k.anim.push(t=>{ const a=t*tempo+phase; g.position.set(mx+Math.cos(a)*rx,y+Math.sin(a*2.3)*.25,-9.6+Math.sin(a)*rz);
      g.rotation.y=Math.atan2(-Math.cos(a)*rz,-Math.sin(a)*rx); fl.forEach((q,i)=>q.rotation.x=(i?-1:1)*Math.sin(t*11+phase)*.6); });
  });
}

/* Spatzen picken und hüpfen im Sand (klein, nicht fest). liste: [x,z,Drehung] */
function spatzen(k,liste){
  liste.forEach(([x,z,d],i)=>{ const g=gruppe(k.scene,x,0,z); g.rotation.y=d; g.userData.lebendig=true;
    const r=gruppe(g,0,.2,0), C=0x8a5a30, D=0x3a2414;
    ball(r,.14,C,0,0,0,1.35,.95,1); ball(r,.1,CREME,.05,-.045,0,1.2,.75,1.02); ball(r,.095,C,.17,.1,0);
    const sn=kegel(r,.035,.09,D,.29,.09,0); sn.rotation.z=-Math.PI/2; [-1,1].forEach(s=>{ ball(r,.018,D,.22,.13,s*.078); ball(r,.09,D,-.04,.03,s*.115,1.35,.6,.35); strich(r,[0,-.08,s*.05],[.02,-.2,s*.05],.014,D); });
    strich(r,[-.15,.02,0],[-.34,.1,0],.035,D);
    verschmelze(r); ohneSchatten(r);
    k.anim.push(t=>{ const u=t*.8+i*1.7, hops=Math.sin(u)>.55?Math.abs(Math.sin(t*9+i))*.16:0, pickt=Math.sin(u)<-.2?Math.max(0,Math.sin(t*7+i*2))*.6:0;
      r.position.y=.2+hops; r.rotation.z=-pickt; g.rotation.y=d+Math.sin(t*.45+i*2.1)*.9; }); });
}
function schmetterlinge(k,liste){
  liste.forEach(([x,z,c],i)=>{ const g=gruppe(k.scene,x,2.4,z); g.userData.lebendig=true;
    const m=basis(c); strich(g,[-.12,0,0],[.12,0,0],.025,SCHWARZ);
    const fl=[-1,1].map(s=>{ const q=gruppe(g,0,0,0); q.userData.lebendig=true; ball(q,.13,m,.04,0,s*.14,1,.08,1.1); ball(q,.09,m,-.08,0,s*.1,1,.08,1); return q; });
    fl.forEach(verschmelze); ohneSchatten(g);
    k.anim.push(t=>{ const a=t*.5+i*2.5; g.position.set(x+Math.sin(a)*1.1,2.4+Math.sin(a*3.1)*.3,z+Math.sin(a*2)*.5); g.rotation.y=-a; fl.forEach((q,j)=>q.rotation.x=(j?1:-1)*(.2+Math.abs(Math.sin(t*9+i))*.9)); }); });
}

function baue(k){
  const sc=k.scene;
  const sand=PH.kornBild('#bc8e54',['rgba(240,210,160,.35)','rgba(100,62,24,.25)']);
  const h=PH.huelle(k,{ B,T,H, himmelLicht:0xfff8e8, grund:0x8a6a44, staerke:.7, sonne:0xffe6c0, sonneStaerke:.34,
    wandBild:PH.bretterBild([226,208,172],'#b09870'), bodenBild:sand, bodenWdh:[5,4], sockel:0, oeffnung:{x:TORX,b:TORB,h:TORH} });
  sc.background=new THREE.Color(0x2a1e10);
  const tuer=baueAusgang(k,sc,h.hinten);
  wandSchmuck(h.hinten,h.links,h.rechts);
  hufspur(sc);
  ausstattung(k,sc);
  [[-9,5,-4,.35],[9,5,-3,.35],[0,5.5,7,.28]].forEach(([x,y,z,s])=>{ const l=new THREE.PointLight(0xffe4b0,s,17,1.5); l.position.set(x,y,z); sc.add(l); });
  /* ---------- Leben: großes braunes Pferd mit Reitkind im Kreis ---------- */
  const p=PH.pferd(k,sc,OVAL[PFERDSTART][0],OVAL[PFERDSTART][1],0,1.08,{ fell:FELL.braun[0], maehne:FELL.braun[1], blesse:true, socken:true, sattel:true, decke:GRUEN, halfter:BLAU, laeuft:true });
  ohneSchatten(reitkind(p.g)); ohneSchatten(p.kopf); ohneSchatten(p.schweif);
  /* Das Pferd beginnt vorn (beim Start außerhalb des Bildes) und läuft erst los, wenn das Startfenster geschlossen ist */
  let weit=0; for(let i=0;i<PFERDSTART;i++){ const a=OVAL[i], b=OVAL[i+1]; weit+=Math.hypot(b[0]-a[0],b[1]-a[1]); }
  const lauf={ anim:[] }; laeufer(lauf,p.g,OVAL,1.5,weit,5);
  let zeit=0; k.anim.push((t,dt)=>{ if(zeit>0 || !document.querySelector('.modal-bg')) zeit+=dt||0; lauf.anim[0](zeit); });
  schwalben(k);
  spatzen(k,[[-3.7,-1.5,.4],[-2.9,-.7,2.6],[1.9,.5,-2.2],[.5,1.4,.9],[-2.1,9.7,-.5],[1.7,10.1,3.4]]);
  schmetterlinge(k,[[-2.0,.2,0x3a8ae8],[2.2,10.4,0xe860b0]]);
  return { tuer, start:[-.6,-4.6] };
}

/* Verstecke für den Edelstein */
const verstecke=[[-15,-9.4],[-13,-5.6],[-8.4,-6.6],[-1,-8.4],[2.2,-10.4],[7.4,-9.4],[13.4,-9],[14.8,-3],[7,-3],[-3.2,-.6],
  [-14.8,-1],[-13.4,2],[1.2,2.2],[15,2],[11.6,8.8],[5.2,9.4],[-.8,9.2],[-8,9.8],[-13,7.4],[-7.4,2.6]];

/* ---------- Gegenstände: Reihenfolge = ort 1 bis 10 ---------- */
const gegenstaende=[
  { x:-7.4, z:-2.4, dreh:.12, steh:[-7.1,-.2], kasten:[5.6,1.9], treffer:[5.3,2.3,1.2], baue(g){ /* 1 Sprung mit Stangen */
      [-1.95,1.95].forEach(x=>{ const s=Math.sign(x);
        box(g,.22,1.75,.22,WEISS,x,.88,0); ball(g,.17,ROT,x,1.86,0); box(g,.42,.12,1.2,WEISS,x,.06,0);
        /* seitlicher Fang mit Brettern */
        box(g,.14,1.15,.16,WEISS,x+s*.62,.58,0); [.35,.72,1.06].forEach((y,i)=>box(g,.62,.14,.08,i%2?WEISS:BLAU,x+s*.32,y,0)); box(g,.34,.1,1.0,WEISS,x+s*.62,.05,0); });
      [[1.38,ROT],[.88,BLAU],[.4,GELB]].forEach(([y,c])=>{ for(let i=0;i<7;i++) quer(g,.1,3.7/7,i%2?WEISS:c,-1.85+(i+.5)*3.7/7,y,.14);
        [-1.82,1.82].forEach(x=>box(g,.14,.08,.26,EISEN,x,y-.13,.1)); });
    } },
  { x:3.4, z:-5.9, dreh:Math.PI+.4, steh:[3.1,-3.45], r:1.6, treffer:[2.9,2.4,1.6], baue(g,k){ /* 2 Pony Flocke: klein, hell, mit Satteldecke und Sattel */
      const p=PH.pferd(k,g,0,0,0,.76,{ fell:FELL.schimmel[0], maehne:FELL.schimmel[1], decke:BLAU, sattel:true, halfter:ROT, phase:1.3 });
      /* lustige Zotteln als Schopf und eine Blume am Halfter */
      ball(p.kopf,.15,FELL.schimmel[1],.2,.22,0,1.2,.55,1.1);
      [-1,1].forEach(s=>{ for(let i=0;i<5;i++){ const a=i*1.256; ball(p.kopf,.05,0xf070a0,.02+Math.cos(a)*.075,.1+Math.sin(a)*.075,s*.245,1,1,.6); } ball(p.kopf,.045,GELB,.02,.1,s*.265,1,1,.7); });
      k.anim.push(t=>{ p.ohren.forEach((e,i)=>{ e.rotation.z=Math.sin(t*5+i*2.2)*.14+(Math.sin(t*1.7+i)>.8?.22:0); }); });
    } },
  { x:10.0, z:-2.6, dreh:-.2, steh:[9.6,-.4], kasten:[2.5,1.8], treffer:[2.3,1.7,1.5], baue(g){ /* 3 Aufstiegshilfe: Tritt mit drei Stufen */
      [[-.7,.42],[0,.84],[.7,1.26]].forEach(([x,h])=>{ box(g,.7,h,1.3,0x3a6ab8,x,h/2,0); box(g,.74,.09,1.38,0xf0c030,x,h+.04,0);
        for(let i=-1;i<=1;i++) box(g,.5,.012,.08,0x8a6a20,x,h+.092,i*.36); box(g,.7,.1,.04,0x24467a,x,.07,.66); });
      /* Hufeisen als Zeichen an der Seite */
      const r=ring(g,.17,.045,WEISS,.7,.66,.68,Math.PI*1.45); r.rotation.z=-Math.PI*.225;
    } },
  { x:-10.8, z:3.9, steh:[-10.5,6.2], r:1.5, treffer:[2.8,1.6,2.4], baue(g){ /* 4 Hütchen: bunte Kegel */
      const huetchen=(x,z,c,gr)=>{ const q=gruppe(g,x,0,z); q.scale.setScalar(gr); box(q,.78,.09,.78,c,0,.045,0); rohr(q,.07,.31,.95,c,0,.55,0,18); rohr(q,.155,.215,.18,WEISS,0,.6,0,18); rohr(q,.172,.232,.14,WEISS,0,.56,0,18); ball(q,.075,c,0,1.02,0); };
      huetchen(-.85,-.45,ORANGE,1.15); huetchen(.2,-.75,GELB,1.0); huetchen(.95,.05,0x2a78d0,1.15); huetchen(-.45,.55,0x3aa050,1.0); huetchen(.4,.65,ROT,1.1);
    } },
  { x:9.35, z:HINTEN, wand:'hinten', steh:[9.35,-11.4], kasten:[5.9,.9], treffer:[5.8,2.8,.9], trefferY:1.5, baue(g){ /* 5 Großer Spiegel: breit, hoch über der Bande */
      box(g,5.8,2.7,.12,HOLZ3,0,2.98,.08); box(g,5.62,2.52,.14,GOLD,0,2.98,.09);
      const m=new THREE.Mesh(new THREE.PlaneGeometry(5.3,2.2),new THREE.MeshBasicMaterial({map:spiegelBild()})); m.position.set(0,2.98,.17); g.add(m);
      [-1,1].forEach(s=>[-1,1].forEach(v=>{ scheibe(g,.2,.1,GOLD,s*2.78,2.98+v*1.23,.18); ball(g,.08,HOLZ3,s*2.78,2.98+v*1.23,.25); }));
      /* Verzierung oben in der Mitte */
      ball(g,.34,GOLD,0,4.36,.1,1.5,.8,.4); [-1,1].forEach(s=>ball(g,.17,GOLD,s*.65,4.34,.1,1.4,.8,.5));
      ohneSchatten(g);
    } },
  { x:-13.5, z:-3.0, dreh:.5, steh:[-11.1,-1.4], kasten:[3.8,2.6], treffer:[3.8,3.3,.9], baue(g){ /* 6 Tafel mit Hufschlagfiguren auf zwei Pfosten */
      [-1.74,1.74].forEach(x=>{ box(g,.18,3.25,.18,HOLZ3,x,1.62,0); ball(g,.15,MESSING,x,3.34,0); box(g,.3,.12,1.0,HOLZ3,x,.06,0); });
      box(g,3.36,2.5,.12,HOLZ2,0,1.92,0); box(g,3.24,2.38,.14,HOLZ,0,1.92,0);
      PH.tafel(g,figurenBild(),3.06,2.2,0,1.92,.08);
      box(g,3.5,.14,.3,HOLZ3,0,3.2,0); box(g,3.3,.16,.1,HOLZ2,0,.42,0);
    } },
  { x:13.5, z:3.6, dreh:-.28, steh:[12.9,5.6], kasten:[1.9,1.3], treffer:[1.7,2.3,1.0], baue(g){ /* 7 Bahnschild mit Buchstabe */
      [-.52,.52].forEach(x=>{ box(g,.14,.95,.14,WEISS,x,.48,0); box(g,.24,.1,1.0,ROT,x,.05,0); });
      box(g,1.52,1.52,.14,0x2a4a8a,0,1.5,0); box(g,1.34,1.34,.16,WEISS,0,1.5,0);
      PH.tafel(g,buchstabeBild(),1.28,1.28,0,1.5,.095);
      [-.52,.52].forEach(x=>ball(g,.12,ROT,x,2.36,0));
    } },
  { x:-11.4, z:-9.2, dreh:.08, steh:[-11.1,-6.8], kasten:[4.6,2.2], treffer:[4.4,2.4,1.9], baue(g){ /* 8 Zuschauerbank mit zwei Sitzreihen */
      [-1.95,0,1.95].forEach(x=>{ box(g,.18,.62,.18,HOLZ3,x,.31,.55); box(g,.18,1.15,.18,HOLZ3,x,.58,-.35); box(g,.18,2.05,.18,HOLZ3,x,1.02,-.82); box(g,.14,.14,1.55,HOLZ3,x,.2,-.12); });
      [.36,.74].forEach(z=>box(g,4.3,.13,.34,HELLHOLZ,0,.66,z));
      [-.52,-.16].forEach(z=>box(g,4.3,.13,.34,HELLHOLZ,0,1.2,z));
      [1.68,2.0].forEach(y=>box(g,4.3,.22,.1,HOLZ,0,y,-.8));
      /* Kissen, karierte Decke und Thermoskanne */
      [[-1.25,ROT],[.1,BLAU]].forEach(([x,c])=>ball(g,.5,c,x,.79,.55,1,.18,.75));
      box(g,1.0,.09,.78,0xd84a3a,1.35,.77,.55); box(g,1.0,.55,.07,0xd84a3a,1.35,.52,.95); [-.25,.25].forEach(a=>{ box(g,.1,.095,.8,CREME,1.35+a,.775,.55); box(g,.1,.56,.08,CREME,1.35+a,.52,.955); });
      walze(g,.16,.55,0x2f8a60,-.6,1.54,-.34); walze(g,.11,.16,METALL,-.6,1.89,-.34); ring(g,.12,.03,METALL,-.42,1.55,-.34);
    } },
  { x:8.6, z:5.6, dreh:-.15, steh:[8.3,8.2], kasten:[3.5,2.7], treffer:[3.2,2.3,2.2], baue(g){ /* 9 Richtertisch mit Glocke */
      /* Tisch mit blauer Decke */
      box(g,2.8,.12,1.35,HELLHOLZ,0,1.1,.25); box(g,2.88,.74,1.43,0x2a5aa0,0,.7,.25); box(g,2.9,.1,1.45,GOLD,0,.36,.25); [-1.2,1.2].forEach(x=>[-.3,.8].forEach(z=>box(g,.16,.34,.16,HOLZ3,x,.17,z)));
      box(g,2.2,.05,1.0,CREME,0,1.18,.25);
      /* große Messingglocke mit Holzgriff */
      const q=gruppe(g,-.35,1.21,.4); q.scale.setScalar(1.15);
      rohr(q,.24,.44,.46,0xe8b830,0,.27,0,20); ball(q,.24,0xe8b830,0,.5,0,1,.8,1); const r=ring(q,.45,.05,0xf8d860,0,.06,0); r.rotation.x=Math.PI/2; const r2=ring(q,.3,.025,MESSING,0,.34,0); r2.rotation.x=Math.PI/2;
      walze(q,.07,.3,HOLZ2,0,.82,0); ball(q,.13,HOLZ,0,1.02,0);
      /* Siegerschleife und Pokal */
      walze(g,.2,.06,GOLD,.75,1.23,.15); walze(g,.06,.26,GOLD,.75,1.37,.15); rohr(g,.26,.1,.36,GOLD,.75,1.66,.15,16); [-1,1].forEach(s=>ring(g,.13,.028,GOLD,.75+s*.26,1.68,.15));
      schleife(gruppe(g,0,0,.92),1.0,.82,ROT);
      /* Stuhl dahinter */
      [-.35,.35].forEach(x=>{ box(g,.1,.72,.1,HOLZ2,x,.36,-.65); box(g,.1,1.9,.1,HOLZ2,x,.95,-1.15); }); box(g,.9,.1,.68,HOLZ,0,.76,-.9); [1.5,1.8].forEach(y=>box(g,.8,.18,.08,HOLZ,0,y,-1.15));
    } },
  { x:-4.9, z:7.0, dreh:.18, steh:[-4.5,9.2], kasten:[2.3,1.6], treffer:[2.1,3.0,1.4], baue(g,k){ /* 10 Musikbox: Lautsprecher mit aufsteigenden Noten */
      box(g,1.9,.14,1.2,HOLZ3,0,.2,0); [-.75,.75].forEach(x=>[-.45,.45].forEach(z=>scheibe(g,.13,.1,EISEN,x,.13,z).rotation.set(0,0,Math.PI/2)));
      box(g,1.6,1.9,.9,LILA,0,1.22,0); box(g,1.68,.12,.98,GOLD,0,2.2,0); box(g,1.68,.1,.98,GOLD,0,.32,0);
      [[.78,.46],[1.67,.3]].forEach(([y,r])=>{ scheibe(g,r,.06,METALL,0,y,.47); scheibe(g,r*.82,.08,0x222228,0,y,.48); ring(g,r*.5,.035,0x55555e,0,y,.52); ball(g,r*.28,METALL2,0,y,.52,1,1,.5); });
      [-.58,.58].forEach(x=>[1.62,1.82].forEach((y,i)=>ball(g,.07,i?0x50d0c0:GELB,x,y,.47)));
      /* Tragegriff oben */
      [-.45,.45].forEach(x=>box(g,.1,.24,.14,METALL,x,2.36,0)); quer(g,.07,1.0,METALL,0,2.5,0);
      /* Noten steigen auf */
      [GELB,0x30c0d0,0xf05090,0x50c050].forEach((c,i)=>{ const q=gruppe(g,0,3,0); q.userData.lebendig=true;
        const m=basis(c), kopf=(x,y)=>{ const b=ball(q,.14,m,x,y,0,1.25,.9,.7); b.rotation.z=.4; box(q,.045,.5,.045,m,x+.15,y+.27,0); };
        if(i%2){ kopf(-.24,0); kopf(.2,.08); const b=box(q,.49,.11,.05,m,.17,.57,0); b.rotation.z=.18; }
        else { kopf(0,0); const f=box(q,.22,.08,.045,m,.23,.44,0); f.rotation.z=-.7; }
        verschmelze(q); ohneSchatten(q);
        k.anim.push(t=>{ const u=(t*.32+i/4)%1; q.position.set((i%2?1:-1)*(.2+u*.75)+Math.sin(t*3+i*2)*.12,2.5+u*1.9,(i-1.5)*.12); q.scale.setScalar(Math.max(.01,Math.min(1,u*5,(1-u)*4))*.9); q.rotation.z=Math.sin(t*2.4+i)*.25; }); });
    } }
];

return { titel:'Die Reithalle', breite:B, tiefe:T, oben:['44,30,16','88,64,38','140,108,70'], baue, gegenstaende, verstecke };
})();

/* Raum 5: Die Koppel an einem sonnigen Tag. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das Weidetor im hinteren Zaun, beide Flügel schwingen nach außen auf, dahinter führt ein Weg in die Ferne. */
RAEUME3D.pferdehof[4] = (function(){
const B=36, T=27;
const EX=-6;                          /* Mitte des Weidetors */
const ZH=-13.75, ZS=18.3, ZV=13.8;    /* Zaun hinten, seitlich, vorn */
const ZAUN=0x9a7248, ZAUN2=0x6e4c2c, TORH=0xe0a75c, TORH2=0xb87c3a, STAMM=0x6a4626;
const LAUB=0x4f9a3c, LAUB2=0x6cb448, LAUB3=0x3c7c34, ROT=0xc8362a, ROT2=0x94261c, WEISS=0xfaf6ee, SCHWARZ=0x1c1a18;
const FELS=0xa8a296, FELS2=0x8a8478, ERDE=0xc29a66, DACH=0x5a4438, GELB=0xffd23a;
const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });
const KUGEL=()=>new THREE.SphereGeometry(1,7,5);     /* sparsame Kugel für die vielen Blüten */

/* ausgeschnittene Platte mit Dicke (Punkte in x/y, Dicke nach +z) */
function platte(par,punkte,tiefe,farbe,x,y,z){
  const f=new THREE.Shape(); punkte.forEach((p,i)=>{ if(i) f.lineTo(p[0],p[1]); else f.moveTo(p[0],p[1]); });
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tiefe,bevelEnabled:false}),mat(farbe)); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}
/* Hufeisen, Öffnung unten, Blick nach +z */
function hufeisen(par,x,y,z,r){
  const h=ring(par,r,r*.24,PH.GOLD,x,y,z,Math.PI*1.5); h.rotation.z=-Math.PI*.25;
  [-1,1].forEach(s=>ball(par,r*.27,PH.GOLD,x+s*r*.707,y-r*.707,z));
  [20,90,160].forEach(w=>{ const a=w*Math.PI/180; ball(par,r*.08,0x4a3208,x+Math.cos(a)*r,y+Math.sin(a)*r,z+r*.23); });
}

/* ---------- Licht, Wiese und Weg ---------- */
function grund(k){
  const sc=k.scene;
  sc.add(new THREE.HemisphereLight(0xeaf6ff,0x6a7a48,.76));
  const sonne=new THREE.DirectionalLight(0xfff0cc,.52); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const t=PH.kornBild('#78b64a',['rgba(176,220,96,.55)','rgba(62,116,34,.4)','rgba(140,196,70,.5)'],true); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(280/9,280/9);
  const bm=new THREE.Mesh(new THREE.PlaneGeometry(280,280),new THREE.MeshLambertMaterial({map:t})); bm.rotation.x=-Math.PI/2; bm.position.y=-.012; bm.receiveShadow=true; sc.add(bm);
  /* ausgetretene Pfade auf der Koppel */
  const w=bild(1024,768,g=>{
    const X=x=>(x+B/2)/B*1024, Z=z=>(z+T/2)/T*768;
    g.lineCap='round'; g.lineJoin='round';
    const spur=(P,b,f)=>{ g.strokeStyle=f; g.lineWidth=b; g.beginPath(); g.moveTo(X(P[0][0]),Z(P[0][1])); for(let i=1;i<P.length-1;i++) g.quadraticCurveTo(X(P[i][0]),Z(P[i][1]),X((P[i][0]+P[i+1][0])/2),Z((P[i][1]+P[i+1][1])/2)); const e=P[P.length-1]; g.lineTo(X(e[0]),Z(e[1])); g.stroke(); };
    [[[EX,-13.5],[EX,-9],[-4,-4],[-2,2],[-1,8],[0,13]],[[-2,2],[-7,0],[-11,-2],[-13,-1.8]],[[-2,2],[3,2.5],[8,4.5],[12,5.5],[16,4.5]]].forEach(P=>{ spur(P,64,'rgba(186,146,90,.22)'); spur(P,42,'rgba(196,156,98,.45)'); spur(P,20,'rgba(220,184,124,.4)'); });
    for(let i=0;i<260;i++){ g.fillStyle=i%2?'rgba(60,112,30,.35)':'rgba(190,226,110,.4)'; g.fillRect(zufall()*1018,zufall()*762,3+(i%3),3+(i%4)); }
  });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(B,T),new THREE.MeshLambertMaterial({map:w,transparent:true,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.y=.006; m.receiveShadow=true; sc.add(m);
}

/* ---------- Weidezaun ---------- */
function zaunStueck(g,x1,z1,x2,z2,h){
  const dx=x2-x1, dz=z2-z1, l=Math.hypot(dx,dz), n=Math.max(1,Math.round(l/2.3)), dreh=Math.atan2(-dz,dx);
  for(let i=0;i<=n;i++){ const x=x1+dx*i/n, z=z1+dz*i/n; box(g,.22,h,.22,ZAUN2,x,h/2,z); kegel(g,.18,.16,ZAUN2,x,h+.08,z); }
  [.4,.66,.9].forEach(a=>{ const m=box(g,l,h*.12,.09,ZAUN,(x1+x2)/2,h*a,(z1+z2)/2); m.rotation.y=dreh; });
}
function zaeune(k){
  const hinten=gruppe(k.wand('hinten'),0,0,0), links=gruppe(k.wand('links'),0,0,0), rechts=gruppe(k.wand('rechts'),0,0,0), vorn=gruppe(k.scene,0,0,0);
  zaunStueck(hinten,-ZS,ZH,EX-2.45,ZH,1.5); zaunStueck(hinten,EX+2.45,ZH,ZS,ZH,1.5);
  zaunStueck(links,-ZS,ZH,-ZS,ZV,1.4); zaunStueck(rechts,ZS,ZH,ZS,ZV,1.4);
  zaunStueck(vorn,-ZS,ZV,ZS,ZV,.9);
  [hinten,links,rechts,vorn].forEach(verschmelze);
}

/* ---------- Ausgang: das Weidetor ---------- */
function weidetor(k){
  const sc=k.scene;
  /* der Weg dahinter bis in die Ferne */
  const weg=gruppe(sc,0,0,0);
  const P=[[EX,-13],[EX,-19],[EX-.6,-26],[EX-2.4,-33],[EX-3,-40],[EX-1.5,-48],[EX+1,-56]];
  for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], l=Math.hypot(b[0]-a[0],b[1]-a[1]), d=Math.atan2(b[0]-a[0],b[1]-a[1]);
    const m=box(weg,3.4,.02,l+.5,ERDE,(a[0]+b[0])/2,.008+i*.0015,(a[1]+b[1])/2); m.rotation.y=d;
    const n=box(weg,1.7,.02,l+.3,0xd8b680,(a[0]+b[0])/2,.02+i*.0015,(a[1]+b[1])/2); n.rotation.y=d; }
  for(let i=1;i<5;i++){ const a=P[i], b=P[i+1]; [-2.6,2.6].forEach(s=>zaunStueck(weg,a[0]+s,a[1],b[0]+s,b[1],1.1)); }
  for(let i=0;i<22;i++){ const s=i%2?1:-1, z=-15.2-i*.72, x=EX+s*(2.25+(i%3)*.18)-Math.max(0,-z-19)*.09;
    ball(weg,.2,LAUB2,x,.12,z,1,.8,1); ball(weg,.1,[0xf06a8a,GELB,WEISS][i%3],x,.34,z); }
  ohneSchatten(weg); verschmelze(weg);
  /* hohe Torpfosten mit Querbalken und Hufeisen */
  const fest=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ const x=EX+s*2.45; box(fest,.48,3.5,.48,STAMM,x,1.75,ZH); box(fest,.66,.2,.66,ZAUN2,x,3.55,ZH); ball(fest,.24,TORH,x,3.85,ZH);
    box(fest,.72,.24,.72,FELS,x,.12,ZH);
    [.55,1.45].forEach(y=>box(fest,.56,.1,.56,PH.EISEN,x,y,ZH));
    strich(fest,[x,2.55,ZH],[x-s*.65,3.2,ZH],.09,STAMM); });
  box(fest,5.5,.32,.36,STAMM,EX,3.28,ZH);
  platte(fest,[[-.75,0],[.75,0],[.75,.5],[0,.95],[-.75,.5]],.16,TORH2,EX,3.34,ZH-.08);
  hufeisen(fest,EX,3.76,ZH+.13,.26);
  verschmelze(fest);
  /* zwei Torflügel aus hellem Holz, Angeln an den Pfosten */
  const fluegel=[-1,1].map(s=>{
    const f=gruppe(sc,EX+s*2.2,0,ZH+.05), r=-s;
    [.4,.85,1.3,1.75].forEach(y=>box(f,2.14,.2,.12,TORH,r*1.08,y,0));
    [.1,2.1].forEach(x=>box(f,.18,1.85,.18,TORH2,r*x,1.1,0));
    strich(f,[r*.14,.42,.09],[r*2.06,1.74,.09],.075,TORH2);
    [.4,1.75].forEach(y=>{ box(f,.65,.09,.04,PH.EISEN,r*.34,y,.09); ball(f,.06,PH.EISEN,r*.1,y,.13); });
    ring(f,.11,.03,PH.EISEN,r*1.98,1.3,.14);
    verschmelze(f); return f; });
  /* Zahlenschloss groß am rechten Pfosten, dazu eine kleine Lampe: rot = zu, grün = offen */
  const tafel=gruppe(sc,0,0,0);
  box(tafel,1.35,1.3,.14,PH.EISEN,EX+2.75,2.15,ZH+.32); verschmelze(tafel);
  const schloss=PH.zahlenschloss(sc,EX+2.75,2.02,ZH+.54); schloss.scale.setScalar(1.35); verschmelze(schloss);
  const rot=ball(sc,.14,basis(0xff3a2a),EX+2.75,2.95,ZH+.34), gruen=ball(sc,.14,basis(0x4af05a),EX+2.75,2.95,ZH+.34); gruen.visible=false;
  const tuer=ausgang(k,{ steh:[EX,-11.6], durch:[EX,-17.6], treffer:{x:EX+.15,y:1.9,z:ZH+.35,b:6.2,h:3.8,t:1}, name:'Weidetor', einfach:'Weidetor', schildOben:[EX,4.8,-13.2], glanz:[EX+2.75,2.1,ZH+1],
    bewege:auf=>{ fluegel[0].rotation.y=auf*1.3; fluegel[1].rotation.y=-auf*1.3; rot.visible=auf<.5; gruen.visible=auf>=.5; } });
  k.kasten(EX,ZH+.1,6.4,.9);
  return tuer;
}

/* ---------- Scheune, Hütte, Windrad ---------- */
function fensterRahmen(g,x,y,z,w,h){
  box(g,w+.24,h+.24,.1,WEISS,x,y,z); box(g,w,h,.06,0x7ab0cc,x,y,z+.05);
  box(g,.08,h,.04,WEISS,x,y,z+.1); box(g,w,.08,.04,WEISS,x,y,z+.1);
}
function scheune(k){
  const g=gruppe(k.scene,8,0,-21.5);
  box(g,11,4.6,6,ROT,0,2.3,0);
  for(let i=0;i<=14;i++) box(g,.07,4.6,.04,ROT2,-5.4+i*.771,2.3,3.01);
  [-5.5,5.5].forEach(x=>box(g,.26,4.7,.26,WEISS,x,2.35,3.02)); box(g,11.2,.22,.2,WEISS,0,4.62,3.06);
  /* Giebel und Satteldach */
  platte(g,[[-5.5,0],[5.5,0],[0,2.7]],6,ROT,0,4.6,-3);
  [-1,1].forEach(s=>{ const d=box(g,6.5,.26,6.8,DACH,s*2.86,6.04,0); d.rotation.z=-s*.456; const l=box(g,6.4,.2,.14,WEISS,s*2.82,5.98,3.42); l.rotation.z=-s*.456; });
  box(g,.4,.22,6.9,0x3a2c24,0,7.5,0);
  /* Fenster und runde Heuluke oben, keine große Tür auf dieser Seite */
  [-3.9,-1.3,1.3,3.9].forEach((x,i)=>{ fensterRahmen(g,x,2.5,3.05,1.15,.95); box(g,1.4,.18,.36,STAMM,x,1.86,3.18); for(let j=0;j<4;j++) ball(g,.14,[0xf06a8a,GELB,WEISS,0xff8a30][(i+j)%4],x-.48+j*.32,2.04,3.24); });
  walze(g,.62,.1,WEISS,0,5.4,3.04).rotation.x=Math.PI/2; walze(g,.46,.12,0x3a2418,0,5.4,3.06).rotation.x=Math.PI/2; box(g,.08,.92,.04,WEISS,0,5.4,3.15); box(g,.92,.08,.04,WEISS,0,5.4,3.15);
  hufeisen(g,0,3.95,3.14,.34);
  /* Wetterfahne */
  walze(g,.05,1,PH.EISEN,0,8.1,1.6);
  ohneSchatten(g); verschmelze(g);
  const fahne=gruppe(k.scene,8,8.55,-19.9); box(fahne,1.1,.07,.07,PH.EISEN,0,0,0); kegel(fahne,.14,.32,PH.GOLD,.68,0,0).rotation.z=-Math.PI/2; box(fahne,.32,.32,.04,PH.GOLD,-.55,0,0); ohneSchatten(fahne); verschmelze(fahne);
  k.anim.push(t=>{ fahne.rotation.y=Math.sin(t*.35)*.9; });
}
function huette(k){
  const g=gruppe(k.scene,-14.2,0,-18.6);
  box(g,5,2.7,3.6,0xb07c44,0,1.35,0);
  [.5,1.1,1.7,2.3].forEach(y=>box(g,5.04,.06,.04,STAMM,0,y,1.81));
  [-2.5,2.5].forEach(x=>box(g,.24,2.8,.24,STAMM,x,1.4,1.82));
  platte(g,[[-2.5,0],[2.5,0],[0,1.3]],3.6,0xb07c44,0,2.7,-1.8);
  [-1,1].forEach(s=>{ const d=box(g,3.1,.2,4.3,0x3f7a52,s*1.32,3.42,0); d.rotation.z=-s*.48; });
  box(g,.3,.18,4.4,0x2c5a3a,0,4.1,0);
  [-1.2,1.2].forEach(x=>{ fensterRahmen(g,x,1.55,1.85,1,.85); [-1,1].forEach(s=>box(g,.3,1.05,.08,0x3f7a52,x+s*.8,1.55,1.86)); box(g,1.3,.18,.34,STAMM,x,.98,1.98); for(let j=0;j<4;j++) ball(g,.13,[ROT,GELB,WEISS,0xf06a8a][j],x-.45+j*.3,1.16,2.02); });
  box(g,.45,1.1,.45,0x9a6a58,1.4,3.9,-.6); box(g,.6,.14,.6,0x6a4a40,1.4,4.48,-.6);
  ohneSchatten(g); verschmelze(g);
  for(let i=0;i<3;i++){ const r=ball(k.scene,.26,basis(0xf4f4f4,{transparent:true,opacity:.75,depthWrite:false}),-12.8,4.8,-19.2); r.castShadow=false;
    k.anim.push(t=>{ const u=(t*.22+i/3)%1; r.position.set(-12.8+u*1.3,4.75+u*2,-19.2); const s=.15+u*.4; r.scale.set(s,s*.85,s); }); }
}
function windrad(k){
  const g=gruppe(k.scene,23,0,-27);
  rohr(g,.7,1.4,6,0xe8dcc4,0,3,0,10); kegel(g,1.05,1.1,ROT2,0,6.5,0); fensterRahmen(g,0,3.2,1.08,.5,.6); ohneSchatten(g); verschmelze(g);
  const rad=gruppe(g,0,5.7,1.15);
  for(let i=0;i<4;i++){ const a=gruppe(rad,0,0,0); a.rotation.z=i*Math.PI/2; box(a,.12,3.4,.08,STAMM,0,1.7,0); box(a,.7,2.5,.04,WEISS,.38,2.0,0); }
  ball(rad,.28,STAMM,0,0,.1); rad.children.forEach(a=>{ if(a.isGroup) verschmelze(a); }); ohneSchatten(rad);
  k.anim.push(t=>{ rad.rotation.z=t*.5; });
}

/* ---------- Bäume, Büsche, Hügel ---------- */
function baum(g,x,z,s){
  walze(g,.28*s,2.2*s,STAMM,x,1.1*s,z); strich(g,[x,1.5*s,z],[x-.8*s,2.5*s,z],.12*s,STAMM); strich(g,[x,1.6*s,z],[x+.75*s,2.6*s,z],.11*s,STAMM);
  [[0,3.2,0,1.45,LAUB],[-1,2.75,.25,1,LAUB3],[1.05,2.85,.1,.95,LAUB2],[.15,4.1,-.1,.95,LAUB2],[-.1,2.8,.75,.8,LAUB]].forEach(([a,b,c,r,f])=>ball(g,r*s,f,x+a*s,b*s,z+c*s,1,.85,1));
}
function landschaft(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  [[-23,-18,1.3],[-30,-21,1.6],[-20,-26,1.1],[-12,-27,1.2],[-1,-29,1.4],[1,-21,.9],[17,-19.5,1.15],[31,-22,1.5],[14,-31,1.4],[-35,-8,1.5],[-37,6,1.3],[-26,16,1.2],[-21,22,1],[35,-6,1.6],[34,10,1.3],[24,19,1.1],[-15,-38,1.3],[5,-42,1.5],[-30,-38,1.7],[20,-44,1.4],[43,-24,1.8],[-47,-22,1.7],[22.5,-13,.85],[-23,-12.5,.9]]
    .forEach(([x,z,s])=>baum(g,x,z,s));
  /* Zäune der Nachbarweiden */
  zaunStueck(g,-34,-13.5,-20,-13.5,1.1); zaunStueck(g,-34,13,-34,-13.5,1.1); zaunStueck(g,33,-12,33,8,1.1);
  ohneSchatten(g); verschmelze(g);
  /* Büsche als Instanzen rund um die Koppel (nicht auf dem Weg, nicht in den Laufrunden) */
  const L=[], F=[0x4a8a34,0x5e9e3a,0x3c742c,0x76ac44];
  for(let i=0;i<150;i++){ const s=i%4; let x, z;
    if(s===0){ x=-34+zufall()*68; z=-15.3-zufall()*1.1; } else if(s===3){ x=-26+zufall()*52; z=15.2+zufall()*10; }
    else if(s===2){ x=19.2+zufall()*1.2; z=-14+zufall()*28; } else { x=-19.3-zufall()*1; z=-12+zufall()*26; }
    if(i%5===4){ x=-36+zufall()*72; z=-28-zufall()*16; }
    if(Math.abs(x-EX)<4.2 && z<-13) continue;
    const r=.3+zufall()*.45; L.push([x,r*.4,z,r,r*.75,r*.9,F[i%4],i]); L.push([x+r*.75,r*.28,z+r*.25,r*.6,r*.5,r*.6,F[(i+1)%4],i]);
    if(i%3===0) L.push([x-r*.2,r*1.05,z+r*.55,.11,.11,.11,[0xf06a8a,GELB,WEISS][i%9/3|0],0]); }
  PH.viele(sc,new THREE.SphereGeometry(1,10,7),L);
  /* Sonnenblumen hinter dem Zaun */
  const st=[], bl=[], mi=[];
  for(let i=0;i<26;i++){ const x=(i<13?6.1+(i%7)*.4+(i>6?.2:0):14.6+((i-13)%7)*.5), z=-14.7-(i%13>6?.7:0), h=1.3+(i%3)*.22;
    st.push([x,h/2,z,.04,h,.04,0x4a7a2a,0]); st.push([x+.14,h*.5,z,.18,.04,.1,0x5a9a34,i]); bl.push([x,h+.05,z,.27,.27,.07,GELB,0]); mi.push([x,h+.05,z+.07,.13,.13,.05,0x6a3a14,0]); }
  PH.viele(sc,GEO.box,st); PH.viele(sc,KUGEL(),bl); PH.viele(sc,KUGEL(),mi);
  /* Hügel in der Ferne */
  const berge=gruppe(sc,0,0,0);
  [[-52,-40,26,6,0x6aa04a],[-24,-62,28,7,0x5c9058],[10,-58,24,5,0x78ae52],[40,-52,27,7.5,0x619a4c],[62,-24,22,6,0x72a84e],[-66,-8,24,6.5,0x649a4a],[60,12,20,5,0x6aa04a],[-60,24,20,5,0x78ae52],[-4,-80,34,9,0x84a888],[34,-76,28,8.5,0x8cae94],[-44,-74,30,8,0x8cae94]]
    .forEach(([x,z,r,h,f])=>ball(berge,1,f,x,-.4,z,r,h,r*.55));
  ohneSchatten(berge); verschmelze(berge);
}

/* ---------- Himmel: Sonne, Wolken, Vögel ---------- */
function himmelsleben(k){
  const sc=k.scene;
  const sonne=gruppe(sc,26,15,-62); ball(sonne,2.6,basis(0xfff3a0),0,0,0,1,1,.3).castShadow=false; schein(sonne,'rgba(255,236,140,.9)',0,0,1.2,11);
  const wolken=[[-34,10,-46],[-12,12.5,-52],[9,9.8,-44],[30,11,-50],[-52,11,-22],[52,10,-18],[-2,14,-60]].map(([x,y,z],i)=>{ const g=gruppe(sc,x,y,z), m=basis(0xffffff), s=.65+(i%3)*.18;
    [[0,0,1.7],[2,-.15,1.15],[-2.1,-.2,1.25],[.6,.55,1.05]].forEach(([a,b,r])=>{ ball(g,r*s,m,a*s,b*s,0,1.35,.55,.7).castShadow=false; }); verschmelze(g); return [g,x,i]; });
  k.anim.push(t=>wolken.forEach(([g,x,i])=>{ g.position.x=x+Math.sin(t*.045+i*1.7)*7; }));
  for(let i=0;i<5;i++){ const g=gruppe(sc,0,9.6,-27), m=basis(0x2a3a5a);
    ball(g,.13,m,0,0,0,2,.7,.7).castShadow=false;
    const fl=[-1,1].map(s=>{ const f=gruppe(g,0,0,0); box(f,.22,.03,.55,m,-.03,0,s*.32).castShadow=false; return f; });
    const w0=i*.45, r=9+(i%3)*1.4;
    k.anim.push(t=>{ const w=t*.25+w0; g.position.set(3+Math.cos(w)*r*1.6,9.6+(i%3)*.5+Math.sin(t+i)*.25,-27+Math.sin(w)*r*.5); g.rotation.y=Math.atan2(-Math.cos(w)*r*.5,-Math.sin(w)*r*1.6);
      const s=Math.sin(t*7+i*1.3)*.6; fl[0].rotation.x=s; fl[1].rotation.x=-s; }); }
}
function schmetterlinge(k){
  [[-7.5,4,0xff9a2a],[1.5,-5,0x5aa8f0],[9,-2,GELB],[-9.6,-1.4,0xf06ab0],[14,7.5,0xffffff],[3,10.5,0xff9a2a],[-14,1,0x5aa8f0]].forEach(([x,z,f],i)=>{
    const g=gruppe(k.scene,x,1.3,z), m=basis(f);
    box(g,.24,.05,.05,basis(SCHWARZ),0,0,0).castShadow=false;
    const fl=[-1,1].map(s=>{ const q=gruppe(g,0,0,0); ball(q,.13,m,.04,0,s*.14,.9,.09,1.1).castShadow=false; ball(q,.09,m,-.1,0,s*.1,.9,.1,1).castShadow=false; verschmelze(q); return q; });
    k.anim.push(t=>{ const w=t*.45+i*2, a=Math.cos(w)*1.5, b=Math.sin(w*1.3)*1.1; g.position.set(x+a,1.25+Math.sin(t*1.7+i)*.4,z+b); g.rotation.y=Math.atan2(-Math.cos(w*1.3)*1.43,-Math.sin(w)*1.5);
      const s=Math.abs(Math.sin(t*9+i))*1.1; fl[0].rotation.x=s; fl[1].rotation.x=-s; });
  });
}

/* ---------- weitere Pferde (nur einzelne erwachsene, in anderen Farben als die Stute) ---------- */
function herde(k){
  const sc=k.scene, F=PH.FELL;
  /* zwei grasen auf der Koppel (fest) */
  PH.pferd(k,sc,-7.8,-4.2,.22,.82,{ fell:F.schimmel[0], maehne:F.schimmel[1], grasen:true, phase:1.3 }); k.kasten(-7.7,-4.2,3.3,1.7);
  PH.pferd(k,sc,15,10.3,Math.PI-.2,.82,{ fell:F.rappe[0], maehne:F.rappe[1], blesse:true, grasen:true, phase:4.1 }); k.kasten(14.9,10.3,3.3,1.6);
  /* auf den Nachbarweiden: laufend und grasend */
  const lauf=(weg,fell,tempo,start,gr)=>{ const p=PH.pferd(k,sc,weg[0][0],weg[0][1],0,gr,{ fell:fell[0], maehne:fell[1], laeuft:true, socken:true, phase:start }); laeufer(k,p.g,weg,tempo,start,9); };
  const links=[[-22.5,-8],[-30,-7],[-31,5],[-27,9],[-22.5,6]];
  lauf(links,F.fuchs,2.6,0,.95); lauf(links,F.palomino,2.6,19,.8);
  lauf([[22.5,-7],[29.5,-8],[30,4],[23,5]],F.schimmel,2.2,7,.9);
  PH.pferd(k,sc,3.5,-17.4,2.9,.9,{ fell:F.falbe[0], maehne:F.falbe[1], phase:2.2 });
  PH.pferd(k,sc,-26,.5,.7,.9,{ fell:F.rappe[0], maehne:F.rappe[1], grasen:true, socken:true, phase:5 });
  PH.pferd(k,sc,23.5,13,2.4,.9,{ fell:F.fuchs[0], maehne:F.fuchs[1], blesse:true, grasen:true, phase:3 });
}

/* ---------- kleine Tiere auf der Koppel (nicht fest) ---------- */
function huhn(k,weg,start,farbe){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), r=gruppe(g,0,0,0);
  ball(r,.26,farbe,0,.38,0,1.25,.95,.9); ball(r,.14,farbe,-.3,.55,0,.8,1.3,.6);
  ball(r,.15,farbe,.28,.68,0); kegel(r,.05,.15,0xf0a030,.46,.66,0).rotation.z=-Math.PI/2; ball(r,.07,ROT,.28,.84,0,1.1,.8,.5); ball(r,.035,ROT,.4,.57,0,.7,1.3,.7);
  [-1,1].forEach(s=>{ ball(r,.025,SCHWARZ,.37,.72,s*.1); ball(r,.16,farbe,-.02,.42,s*.2,1.2,.7,.4); walze(r,.022,.22,0xe8a030,0,.11,s*.1); box(r,.14,.025,.07,0xe8a030,.05,.015,s*.1); });
  verschmelze(r); laeufer(k,g,weg,.65,start,9);
}
function hase(k,weg,start){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), r=gruppe(g,0,0,0), F=0xb89878;
  ball(r,.24,F,0,.28,0,1.35,.95,.95); ball(r,.17,F,.3,.5,0); ball(r,.1,WEISS,-.33,.34,0);
  [-1,1].forEach(s=>{ ball(r,.06,F,.24,.76,s*.07,.7,2.6,.8); ball(r,.03,0xe8a8a0,.275,.76,s*.07,.4,3.4,.8); ball(r,.028,SCHWARZ,.43,.54,s*.09); ball(r,.09,F,.2,.08,s*.13,1.3,.7,.8); ball(r,.14,F,-.12,.14,s*.18,1.3,.9,.7); });
  ball(r,.03,0xe8808a,.47,.48,0);
  verschmelze(r); laeufer(k,g,weg,.9,start,7);
}
function kleintiere(k){
  const h=[[.5,10.4],[3.2,10.8],[2.8,12.5],[-.4,12.2]];
  huhn(k,h,0,WEISS); huhn(k,h,3.1,0xc87a30); huhn(k,h,6.4,0x8a4a28);
  hase(k,[[-4.6,-5],[-3.4,-7.4],[-3.8,-10.2],[-6.4,-8.8]],1);
}

/* ---------- Ausstattung auf der Koppel ---------- */
function ausstattung(k){
  const sc=k.scene;
  /* Schattenbäume am Rand */
  [[16.4,-11.3,1],[-16.6,.6,.95],[-16.2,11.4,.85]].forEach(([x,z,s])=>{ const g=gruppe(sc,0,0,0); baum(g,x,z,s); verschmelze(g); k.verdecker(g,x,z,1.7*s); k.kreis(x,z,.5); });
  const g=gruppe(sc,0,0,0);
  [[-16.8,-6.2,.65],[16.8,-.8,.6],[1.6,-12.2,.55],[-12.4,12.2,.5],[16.9,6.6,.5],[-16.2,-11.6,.55]].forEach(([x,z,s],i)=>{ ball(g,s,i%2?FELS:FELS2,x,s*.4,z,1.1,.75,.9); ball(g,s*.55,i%2?FELS2:FELS,x+s*.75,s*.2,z+s*.35,1,.7,1); k.kreis(x+s*.2,z+.05,s*1.15); });
  /* Strohballen hinten am Zaun */
  PH.ballen(g,3.9,0,-12.2,1.7,.75,.95,0); PH.ballen(g,5.75,0,-12.25,1.7,.75,.95,.06); PH.ballen(g,4.8,.76,-12.25,1.6,.7,.9,-.05); k.kasten(4.85,-12.22,3.7,1.1);
  /* Baumstamm zum Hinsetzen */
  walze(g,.38,2.8,STAMM,12.6,.38,-7.2).rotation.z=Math.PI/2;
  [-1,1].forEach(s=>{ walze(g,.31,.05,0xd8ac74,12.6+s*1.42,.38,-7.2).rotation.z=Math.PI/2; walze(g,.14,.06,0xa87844,12.6+s*1.425,.38,-7.2).rotation.z=Math.PI/2; });
  strich(g,[11.9,.6,-7.2],[11.6,1.15,-7.35],.09,STAMM); ball(g,.22,LAUB2,11.58,1.22,-7.36,1.2,.7,1); k.kasten(12.6,-7.2,2.9,.8);
  /* Baumstumpf mit Pilzen */
  walze(g,.5,.6,STAMM,-8,.3,-6.6); walze(g,.43,.04,0xd8ac74,-8,.62,-6.6); ring(g,.22,.02,0xa87844,-8,.645,-6.6).rotation.x=Math.PI/2;
  [[-7.35,-6.25,.2],[-7.55,-5.95,.13],[-8.55,-6.2,.15]].forEach(([x,z,h])=>{ walze(g,h*.3,h,0xf4ead8,x,h/2,z); ball(g,h*.75,ROT,x,h,z,1,.6,1); ball(g,h*.14,WEISS,x+h*.25,h*1.4,z+h*.2); });
  k.kreis(-8,-6.6,.62);
  verschmelze(g);
  /* niedrige Grasbüschel und Blumen (instanziert, ohne Hindernis) */
  const halme=[], blumen=[], stiele=[];
  const nah=(x,z,r)=>gegenstaende.some(d=>Math.hypot(d.x-x,d.z-z)<r+1.4 || Math.hypot(d.steh[0]-x,d.steh[1]-z)<r) || verstecke.some(v=>Math.hypot(v[0]-x,v[1]-z)<r*.8);
  let n=0;
  for(let i=0;i<500 && n<110;i++){ const x=-17.8+zufall()*35.6, z=-13.2+zufall()*26.6; if(nah(x,z,1)) continue; n++;
    for(let j=0;j<5;j++){ const a=j*1.26+i, h=.2+zufall()*.22; halme.push([x+Math.cos(a)*.12,h/2,z+Math.sin(a)*.12,.045,h,.045,[0x4a8a2a,0x5e9e34,0x8ac24a][(i+j)%3],0,Math.sin(a)*.35,-Math.cos(a)*.35]); } }
  for(let i=0;i<44;i++){ let x,z;
    if(i<24){ const s=i%4; x=s<2?(s?17.5:-17.5)+(zufall()-.5)*.6:-17+zufall()*34; z=s<2?-12+zufall()*24:(s===2?-13:13)+(zufall()-.5)*.5; if(s===2 && Math.abs(x-EX)<3.6) continue; }
    else { x=-16+zufall()*32; z=-11+zufall()*23; if(nah(x,z,1.3)) continue; }
    const farbe=[0xffffff,GELB,0xf06a8a,0x9a7ae0,0xff8a30][i%5];
    for(let j=0;j<5;j++){ const a=j*2.4, r=.1+j*.1, bx=x+Math.cos(a)*r, bz=z+Math.sin(a)*r, h=.18+(j%3)*.06;
      stiele.push([bx,h/2,bz,.018,h,.018,0x3f7a24,0]); blumen.push([bx,h+.02,bz,.085,.045,.085,farbe,0]); blumen.push([bx,h+.06,bz,.032,.028,.032,farbe===GELB?0x9a5a14:GELB,0]); } }
  /* Blümchen auf den Nachbarweiden und vor dem vorderen Zaun */
  for(let i=0;i<200;i++){ const s=i%4; const x=s===0?-33+zufall()*13:s===1?20+zufall()*12:-26+zufall()*52, z=s<2?-12+zufall()*26:14.6+zufall()*11;
    blumen.push([x,.12,z,.1,.07,.1,[0xffffff,GELB,0xf06a8a,0x9a7ae0][i%4===3?3:(i>>2)%3],0]); halme.push([x+.15,.16,z,.05,.32,.05,0x4a8a2a,0]); }
  /* vordere Mitte: zusätzliche Blumen, Grasbüschel und kleine Kiesel (flach, ohne Hindernis) */
  const kiesel=[];
  [[-2.4,4.6],[1.6,4.4],[-.4,8.6],[2.4,9.2],[-2.6,10.8],[.8,5.8],[-3.4,12.6],[4.6,4.2],[-6.6,3.8],[1.4,11.6],[-1.8,.4],[4,12.4]].forEach(([x,z],i)=>{
    if(i%3===2){ [[0,0,.2],[.34,.12,.13],[.1,.34,.1],[-.24,.2,.08]].forEach(([a,b,r],j)=>kiesel.push([x+a,r*.4,z+b,r,r*.6,r*.8,j%2?FELS2:FELS,i+j])); }
    else { const farbe=[0xffffff,GELB,0xf06a8a,0x9a7ae0,0xff8a30][(i*2)%5];
      for(let j=0;j<6;j++){ const a=j*2.4, r=.08+j*.09, bx=x+Math.cos(a)*r, bz=z+Math.sin(a)*r, h=.16+(j%3)*.05;
        stiele.push([bx,h/2,bz,.018,h,.018,0x3f7a24,0]); blumen.push([bx,h+.02,bz,.085,.045,.085,farbe,0]); blumen.push([bx,h+.06,bz,.032,.028,.032,farbe===GELB?0x9a5a14:GELB,0]); } }
    for(let j=0;j<5;j++){ const a=j*1.26+i, h=.18+zufall()*.16; halme.push([x+.55+Math.cos(a)*.1,h/2,z-.3+Math.sin(a)*.1,.04,h,.04,[0x4a8a2a,0x5e9e34,0x8ac24a][(i+j)%3],0,Math.sin(a)*.35,-Math.cos(a)*.35]); }
  });
  PH.viele(sc,KUGEL(),kiesel).castShadow=false;
  PH.viele(sc,GEO.cone,halme).castShadow=false; PH.viele(sc,GEO.box,stiele).castShadow=false; PH.viele(sc,KUGEL(),blumen).castShadow=false;
}

/* ---------- Gegenstände ---------- */
/* 1 Wassertrog aus Metall auf zwei Balken, mit Wasserhahn */
function wassertrog(g,k){
  const M=0x9fb0be, M2=0x5e7080;
  [-1,1].forEach(s=>box(g,.34,.26,1.35,PH.HOLZ2,s*.95,.13,0));
  box(g,2.7,.12,.9,M2,0,.32,0);
  [-1,1].forEach(s=>{ const w=box(g,2.82,.74,.1,M,0,.68,s*.52); w.rotation.x=s*.18; box(g,3.0,.11,.15,M2,0,1.05,s*.6);
    const e=box(g,.1,.74,1.1,M,s*1.42,.68,0); e.rotation.z=-s*.1; box(g,.15,.11,1.35,M2,s*1.47,1.05,0); });
  [-.75,.75].forEach(x=>{ const r=box(g,.1,.7,.04,M2,x,.68,.59); r.rotation.x=.18; });
  box(g,2.8,.06,1.08,mat(0x3aa0e0,{emissive:0x0c3450}),0,.97,0);
  /* Standrohr mit rundem Hahn */
  walze(g,.09,1.75,M2,-1.75,.875,-.15); strich(g,[-1.75,1.7,-.15],[-1.15,1.7,-.05],.075,M2); walze(g,.095,.16,M2,-1.13,1.64,-.05); ring(g,.15,.035,ROT,-1.75,1.9,-.15).rotation.x=Math.PI/2; walze(g,.03,.16,M2,-1.75,1.82,-.15);
  const tropfen=ball(g,.06,basis(0x9fe0ff),-1.13,1.45,-.05,.8,1.3,.8); tropfen.userData.lebendig=true; tropfen.castShadow=false;
  const welle=ring(g,.3,.016,basis(0xd8f4ff,{transparent:true,opacity:.75,depthWrite:false}),-1.0,1.01,-.03); welle.rotation.x=Math.PI/2; welle.castShadow=false;
  k.anim.push(t=>{ const u=(t*1.1)%1; tropfen.position.y=1.52-u*.5; const s=.3+u*.9; welle.scale.set(s,s,1); });
}
/* 2 Apfelkorb aus Weide */
function apfelkorb(g){
  const K=0xc08a50, K2=0x82542a;
  rohr(g,.72,.54,.7,K,0,.36,0,20,true); walze(g,.55,.08,K2,0,.04,0);
  [[.14,.57],[.34,.63],[.54,.675]].forEach(([y,r])=>ring(g,r,.04,K2,0,y,0).rotation.x=Math.PI/2);
  for(let i=0;i<18;i++){ const a=i/18*Math.PI*2; strich(g,[Math.cos(a)*.555,.05,Math.sin(a)*.555],[Math.cos(a)*.725,.7,Math.sin(a)*.725],.025,K2); }
  ring(g,.72,.08,K2,0,.72,0).rotation.x=Math.PI/2;
  const bogen=ring(g,.72,.065,K2,0,.72,0,Math.PI); bogen.scale.y=1.2;
  walze(g,.66,.08,0x7a2418,0,.58,0);
  [[0,.84,.02,0],[-.4,.74,.12,1],[.39,.75,.1,0],[-.18,.76,.4,2],[.2,.75,.42,1],[-.3,.73,-.3,0],[.14,.75,-.38,2],[.45,.72,-.22,1],[-.47,.71,-.1,2],[-.12,1.01,.2,1],[.22,1.0,-.04,0],[-.2,.99,-.18,2]].forEach(([x,y,z,f],i)=>{
    ball(g,.21,[0xe02c24,0xc81c20,0x9ac838][f],x,y,z,1,.92,1); walze(g,.018,.12,0x5a3418,x,y+.22,z); if(i%3===0) ball(g,.07,0x4a9a30,x+.09,y+.23,z,1.4,.35,.8); });
  [[.95,.35,0],[-.98,.15,1]].forEach(([x,z,f])=>{ ball(g,.19,f?0xc81c20:0xe02c24,x,.18,z,1,.92,1); walze(g,.018,.11,0x5a3418,x,.38,z); });
}
/* 3 Leckstein am Pfosten mit Halter */
function leckstein(g){
  const E=PH.EISEN;
  walze(g,.15,1.85,PH.HOLZ2,0,.925,-.2); kegel(g,.2,.18,PH.HOLZ3,0,1.94,-.2); walze(g,.3,.12,FELS2,0,.06,-.2);
  /* schlichter Halter: runde Eisenschale mit Stütze und Ring */
  walze(g,.43,.07,E,0,.98,.24); ring(g,.43,.035,E,0,1.04,.24).rotation.x=Math.PI/2;
  box(g,.14,.07,.3,E,0,.97,-.1); strich(g,[0,.96,.36],[0,.62,-.1],.032,E);
  ring(g,.09,.022,E,0,.84,.62);
  /* der Salzstein: ein einziger heller, unregelmäßig gerundeter Brocken mit Kristallflächen */
  const salz=teil(g,salzForm(),0xffc2ba,0,1.44,.24,.38,.46,.33); salz.rotation.y=.35;
}
/* Kugel, leicht eckig gedrückt und verbeult, mit flachen Flächen */
function salzForm(){
  const geo=new THREE.SphereGeometry(1,9,7).toNonIndexed(), p=geo.attributes.position, k=v=>Math.sign(v)*Math.pow(Math.abs(v),.72);
  for(let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i), f=1+.08*Math.sin(x*4.1+y*2.3)*Math.cos(z*3.7-y*3.1)+.04*Math.sin(y*6.3+x*2.9);
    p.setXYZ(i,k(x)*f,k(y)*f,k(z)*f); }
  geo.computeVertexNormals(); return geo;
}
/* 4 Stute mit Fohlen */
function stuteFohlen(g,k){
  const F=PH.FELL;
  PH.pferd(k,g,-.3,-.55,0,1,{ fell:F.braun[0], maehne:F.braun[1], blesse:true, halfter:PH.BLAU, phase:.4 });
  const f=PH.pferd(k,g,.55,.72,Math.PI-.18,.55,{ fell:F.falbe[0], maehne:F.falbe[1], halfter:ROT, socken:true, blesse:true, phase:2.6 });
  /* das Fohlen macht ab und zu einen kleinen Hüpfer */
  k.anim.push(t=>{ f.g.position.y=Math.max(0,Math.sin(t*1.15)-.75)*Math.abs(Math.sin(t*9))*.9; });
}
/* 5 Vogelhäuschen auf einem Pfosten */
function vogel(par,x,y,z,farbe,bauch){
  const v=gruppe(par,x,y,z); v.userData.lebendig=true;
  ball(v,.17,farbe,0,.2,0,1.25,.95,.95); ball(v,.12,bauch,.08,.15,0,1.1,.85,1.02); ball(v,.12,farbe,.17,.38,0); kegel(v,.045,.13,0xf0a030,.32,.37,0).rotation.z=-Math.PI/2;
  [-1,1].forEach(s=>{ ball(v,.025,SCHWARZ,.23,.42,s*.092); ball(v,.1,0x27528a,-.05,.23,s*.14,1.4,.6,.35); walze(v,.014,.12,0x5a3a1a,.02,.05,s*.06); });
  const s=box(v,.28,.04,.12,farbe,-.28,.26,0); s.rotation.z=-.45;
  verschmelze(v); return v;
}
function vogelhaus(g,k){
  walze(g,.12,1.45,PH.HOLZ2,0,.725,0); walze(g,.26,.12,FELS2,0,.06,0);
  [-1,1].forEach(s=>strich(g,[0,1.0,0],[s*.42,1.42,0],.05,PH.HOLZ2));
  box(g,1.3,.1,1.1,PH.HOLZ,0,1.48,0);
  box(g,.92,.76,.72,0xf2d08a,0,1.9,-.04);
  platte(g,[[-.46,0],[.46,0],[0,.4]],.72,0xf2d08a,0,2.28,-.4);
  [-1,1].forEach(s=>{ const d=box(g,.75,.09,1.02,ROT,s*.31,2.51,-.03); d.rotation.z=-s*.715; });
  box(g,.12,.1,1.06,ROT2,0,2.75,-.03);
  walze(g,.2,.05,PH.HOLZ2,0,1.98,.33).rotation.x=Math.PI/2; walze(g,.15,.06,0x1a0e06,0,1.98,.345).rotation.x=Math.PI/2;
  walze(g,.028,.28,PH.HOLZ3,0,1.72,.46).rotation.x=Math.PI/2;
  for(let i=0;i<9;i++) ball(g,.025,i%2?0xe8c456:0x8a6a2a,-.5+(i%5)*.2,1.55,.4+(i%2)*.08);
  const a=vogel(g,0,2.78,.15,0x3a78c0,0xf6d84a), b=vogel(g,.42,1.52,.4,0xa86a3a,0xf08a50);
  a.rotation.y=-.6; b.rotation.y=-2.6; b.scale.setScalar(.9);
  k.anim.push(t=>{ a.position.y=2.78+Math.max(0,Math.sin(t*1.6)-.7)*.5; a.rotation.y=-.6+Math.sin(t*.8)*.7; b.rotation.z=-Math.max(0,Math.sin(t*2.7))*.35; });
}
/* 6 Weideschild mit gemaltem Hufeisen */
function weideschild(g){
  [-1.15,1.15].forEach(x=>{ box(g,.2,2.5,.2,PH.HOLZ2,x,1.25,-.06); ball(g,.2,LAUB2,x,.1,.12,1.5,.8,1.1); });
  box(g,2.55,1.5,.12,PH.HOLZ,0,1.6,0);
  const t=bild(512,296,c=>{
    c.fillStyle='#e8c88a'; c.fillRect(0,0,512,296);
    for(let i=0;i<4;i++){ c.fillStyle='rgba(120,80,34,.35)'; c.fillRect(0,i*74,512,3); c.fillStyle='rgba(120,80,34,.12)'; for(let j=0;j<9;j++) c.fillRect((j*137+i*61)%470,i*74+14+(j%4)*14,46,3); }
    c.lineCap='round'; c.strokeStyle='#5a3208'; c.lineWidth=52; const bogen=()=>{ c.beginPath(); c.arc(256,136,86,Math.PI*.7,Math.PI*2.3); c.stroke(); }; bogen();
    c.strokeStyle='#d89a1c'; c.lineWidth=38; bogen();
    c.fillStyle='#3a2006'; [150,200,245,295,340,390].forEach(w=>{ const a=w*Math.PI/180; c.beginPath(); c.arc(256+Math.cos(a)*86,136+Math.sin(a)*86,7,0,6.283); c.fill(); });
    [[70,236,'#d8402c'],[116,258,'#f4f0e8'],[442,240,'#4a78c0'],[398,262,'#d8402c']].forEach(([x,y,f])=>{ c.strokeStyle='#3f7a24'; c.lineWidth=6; c.beginPath(); c.moveTo(x,y); c.lineTo(x+4,292); c.stroke(); c.fillStyle=f; for(let i=0;i<5;i++){ c.beginPath(); c.arc(x+Math.cos(i*1.257)*13,y+Math.sin(i*1.257)*13,10,0,6.283); c.fill(); } c.fillStyle='#f0c020'; c.beginPath(); c.arc(x,y,8,0,6.283); c.fill(); });
  });
  PH.tafel(g,t,2.3,1.33,0,1.6,.07);
  [[0,2.33,2.65,.13],[0,.87,2.65,.13],[-1.24,1.6,.13,1.55],[1.24,1.6,.13,1.55]].forEach(([x,y,w,h])=>box(g,w,h,.2,PH.HOLZ3,x,y,.02));
  [-1,1].forEach(s=>{ const d=box(g,1.55,.1,.5,0x3f7a52,s*.71,2.67,0); d.rotation.z=-s*.2; });
}
/* 7 Heuraufe */
function heuraufe(g){
  [-1.2,1.2].forEach(x=>{ [-.58,.58].forEach(z=>box(g,.16,1.9,.16,PH.HOLZ2,x,.95,z)); box(g,.13,.13,1.2,PH.HOLZ2,x,.45,0); box(g,.13,.13,1.3,PH.HOLZ2,x,1.82,0); });
  [.62,-.62].forEach(z=>box(g,2.55,.15,.14,PH.HOLZ,0,1.75,z));
  box(g,2.55,.16,.24,PH.HOLZ,0,.82,0);
  for(let i=0;i<8;i++){ const x=-1.02+i*.292; [-1,1].forEach(s=>strich(g,[x,.84,s*.04],[x,1.74,s*.63],.045,PH.HOLZ)); }
  [[-.7,1.46,0,.38],[0,1.55,.04,.46],[.7,1.46,-.04,.39],[-.35,1.78,.08,.3],[.4,1.8,-.06,.3],[0,1.18,0,.28]].forEach(([x,y,z,r],i)=>ball(g,r,i%2?PH.STROH2:PH.STROH,x,y,z,1.2,.72,.95));
  const H=[], F=[0xffe27a,0xf4cc50,0xc8c850];
  for(let i=0;i<200;i++){ const x=-1.08+zufall()*2.16, y=1.4+zufall()*.75, z=(zufall()-.5)*(y-.75)*.95; H.push([x,y,z,.4+zufall()*.35,.018,.024,F[i%3],(zufall()-.5)*2.4,(zufall()-.5),(zufall()-.5)*1.1]); }
  for(let i=0;i<40;i++) H.push([-1.2+zufall()*2.4,.025+(i%4)*.008,-.4+zufall()*1.3,.26+zufall()*.22,.015,.026,F[i%2],zufall()*6.28]);
  PH.viele(g,GEO.box,H).castShadow=false;
}
/* 8 Hufpflege-Kiste mit Bürste, Huffett, Hufkratzer und Hufeisen */
function hufkiste(g){
  const K=0x35609a, K2=0x223f68;
  box(g,1.7,.12,1.0,K2,0,.1,0); [-1,1].forEach(s=>{ box(g,1.7,.56,.1,K,0,.42,s*.47); box(g,.1,.56,.86,K,s*.8,.42,0); box(g,1.76,.08,.14,K2,0,.72,s*.47); box(g,.14,.08,.86,K2,s*.8,.72,0);
    box(g,.12,.92,.12,PH.HOLZ,s*.82,.98,0); });
  [-1,1].forEach(s=>[-1,1].forEach(v=>box(g,.18,.1,.18,PH.EISEN,s*.72,.04,v*.4)));
  walze(g,.09,1.76,PH.HOLZ3,0,1.43,0).rotation.z=Math.PI/2;
  hufeisen(g,0,.42,.55,.2);
  /* Wurzelbürste */
  const b=gruppe(g,-.42,.76,.18); b.rotation.set(.35,.3,0);
  box(b,.56,.14,.28,0xc89a62,0,.1,0); ball(b,.15,0xc89a62,0,.15,0,1.9,.55,.95); for(let i=0;i<7;i++) for(let j=0;j<3;j++) box(b,.045,.17,.045,0x3a2a1a,-.23+i*.077,-.04,-.09+j*.09);
  /* Dose mit Huffett und Pinsel */
  walze(g,.24,.46,0xe8b830,.34,.66,-.08); walze(g,.25,.07,ROT,.34,.9,-.08); walze(g,.246,.16,WEISS,.34,.64,-.08);
  strich(g,[.55,.62,.12],[.72,1.2,.2],.035,PH.HOLZ2); ball(g,.08,SCHWARZ,.73,1.24,.205,.9,1.3,.9);
  /* Hufkratzer mit rotem Griff, stumpf */
  strich(g,[-.05,.7,.22],[.08,1.02,.3],.075,ROT); strich(g,[.08,1.02,.3],[.12,1.14,.32],.032,PH.METALL); ring(g,.07,.03,PH.METALL,.05,1.14,.32,Math.PI);
  /* gelber Schwamm und ein Lappen */
  box(g,.34,.16,.26,GELB,-.15,.72,-.22); ball(g,.22,0xd85a50,-.55,.65,-.2,1.2,.5,.9);
}
/* 9 Kleiner roter Traktor (vorn = -x) */
function traktor(g){
  const D=0x2a2a2c, S=0xe8d890;
  box(g,2.5,.3,.8,D,-.05,.72,0);
  /* Motorhaube mit Kühlergitter und Scheinwerfern */
  box(g,1.25,.66,.82,ROT,-.82,1.18,0); walze(g,.41,1.25,ROT,-.82,1.48,0).rotation.z=Math.PI/2;
  box(g,.1,.72,.72,D,-1.47,1.22,0); [-.2,0,.2].forEach(z=>box(g,.05,.6,.07,PH.METALL,-1.53,1.2,z));
  [-1,1].forEach(s=>{ walze(g,.16,.18,PH.METALL,-1.42,1.55,s*.47).rotation.z=Math.PI/2; walze(g,.13,.05,basis(0xfff6b0),-1.53,1.55,s*.47).rotation.z=Math.PI/2; });
  /* Auspuff */
  walze(g,.08,1.0,PH.METALL2,-.95,2.2,.22); walze(g,.11,.14,D,-.95,2.74,.22);
  /* Armaturen und Lenkrad */
  box(g,.3,.55,.78,ROT2,-.14,1.48,0); strich(g,[-.08,1.7,0],[.16,2.34,0],.04,D);
  const l=ring(g,.27,.045,D,.18,2.38,0); l.rotation.set(0,Math.PI/2,0); l.rotateX(-.85);
  strich(g,[.18,2.38,-.25],[.18,2.38,.25],.025,D);
  /* Trittbrett und schwarzer Sitz mit Lehne */
  box(g,1.5,.14,1.3,D,.55,.9,0);
  walze(g,.12,.92,PH.METALL2,.72,1.42,0); box(g,.62,.18,.68,0x2c3a4a,.72,1.94,0); box(g,.18,.66,.68,0x2c3a4a,1.06,2.32,0); box(g,.04,.12,.7,S,1.16,2.53,0);
  /* große Hinterräder und kleine Vorderräder mit gelben Felgen */
  const rad=(x,r,b,z,s)=>{ walze(g,r,b,SCHWARZ,x,r,z).rotation.x=Math.PI/2; ring(g,r*.83,r*.12,0x38383a,x,r,z+s*b*.5);
    walze(g,r*.52,.06,S,x,r,z+s*(b/2+.02)).rotation.x=Math.PI/2; walze(g,r*.2,.09,ROT,x,r,z+s*(b/2+.06)).rotation.x=Math.PI/2;
    for(let i=0;i<14;i++){ const a=i/14*Math.PI*2, p=box(g,r*.16,r*.1,b+.05,0x38383a,x+Math.cos(a)*r*.99,r+Math.sin(a)*r*.99,z); p.rotation.z=a+Math.PI/2; p.position.y=Math.max(r*.05,p.position.y); } };
  [-1,1].forEach(s=>{ rad(.82,.82,.42,s*.84,s); rad(-1.08,.47,.3,s*.65,s);
    /* Kotflügel über den Hinterrädern */
    box(g,.95,.12,.52,ROT,.82,1.76,s*.84); [-1,1].forEach(v=>{ const f=box(g,.5,.12,.52,ROT,.82+v*.65,1.6,s*.84); f.rotation.z=-v*.7; });
    box(g,.12,.18,.18,0xff7a20,1.5,1.5,s*.84); });
  walze(g,.07,1.2,PH.METALL2,-1.08,.47,0).rotation.x=Math.PI/2;
  box(g,.18,.2,.9,D,-1.62,.76,0); box(g,.4,.1,.2,PH.METALL2,1.42,.66,0);
}
/* 10 freundliche Vogelscheuche mit Strohhut */
function vogelscheuche(g,k){
  const HEMD=0x3a6ac0, HOSE=0x8a5a34, SACK=0xe8cc98, STR=0xf0cc52;
  walze(g,.1,1.5,PH.HOLZ2,0,.75,-.05); walze(g,.34,.14,0x7a5a38,0,.07,0);
  [-1,1].forEach(s=>{ strich(g,[s*.18,1.4,0],[s*.28,.72,.06],.15,HOSE); for(let i=-1;i<=1;i++) strich(g,[s*.28,.76,.06],[s*.29+i*.1,.45,.08+(i%2)*.06],.03,STR); });
  box(g,.22,.24,.06,GELB,-.24,1.0,.2);
  const o=gruppe(g,0,1.3,0); o.userData.lebendig=true;
  rohr(o,.34,.42,.85,HEMD,0,.45,0); walze(o,.43,.1,0x4a2a14,0,.08,0); box(o,.2,.22,.06,ROT,.15,.35,.38);
  [.28,.48,.68].forEach((y,i)=>ball(o,.045,WEISS,-.04,y,.41-i*.03));
  walze(o,.065,2.1,PH.HOLZ2,0,.74,-.04).rotation.z=Math.PI/2;
  [-1,1].forEach(s=>{ strich(o,[s*.25,.76,0],[s*.9,.72,0],.15,HEMD); for(let i=-2;i<=2;i++) strich(o,[s*.88,.72,0],[s*1.2,.72+i*.09,(i%2)*.09],.028,STR); });
  ring(o,.22,.09,ROT,0,.9,0).rotation.x=Math.PI/2; const tuch=box(o,.18,.42,.07,ROT,.16,.68,.34); tuch.rotation.z=.25;
  /* Kopf aus Sackleinen mit Knopfaugen und Lächeln */
  ball(o,.38,SACK,0,1.27,0,1,1.02,.95);
  [-1,1].forEach(s=>{ ball(o,.065,SCHWARZ,s*.14,1.34,.34,1,1,.5); ball(o,.02,WEISS,s*.125,1.36,.38); ball(o,.07,0xf08a80,s*.24,1.18,.29,1,.7,.4); for(let i=0;i<3;i++) strich(o,[s*.3,1.45-i*.05,.05],[s*(.5+i*.03),1.32-i*.14,.12],.025,STR); });
  ball(o,.075,0xf07a28,0,1.23,.38);
  const m=ring(o,.15,.022,0x7a2a1a,0,1.17,.36,Math.PI); m.rotation.z=Math.PI;
  /* breiter Strohhut */
  const hut=gruppe(o,0,1.57,-.02); hut.rotation.set(-.2,0,.08);
  walze(hut,.68,.07,STR,0,0,0); ring(hut,.66,.035,PH.STROH2,0,0,0).rotation.x=Math.PI/2; rohr(hut,.27,.35,.36,STR,0,.2,0); walze(hut,.345,.1,ROT,0,.1,0); ball(hut,.08,WEISS,.24,.12,.26); ball(hut,.035,GELB,.26,.12,.33);
  verschmelze(o);
  /* ein kleiner Vogel besucht sie */
  const v=vogel(o,-.72,.86,0,0x3a3a48,0x6a6a78); v.scale.setScalar(.85); v.rotation.y=-.9;
  k.anim.push(t=>{ o.rotation.z=Math.sin(t*1.1)*.035; o.rotation.y=Math.sin(t*.6)*.07; v.position.y=.86+Math.max(0,Math.sin(t*2.2)-.8)*.6; tuch.rotation.z=.25+Math.sin(t*3)*.12; });
}

const verstecke=[[-16,-7.8],[-12.6,-8.2],[-2.4,-11.8],[2,-9.4],[8.4,-6.6],[16,-8.6],[16.2,-2.6],[9.4,-1.2],[15.8,5.4],[11,12],[4.2,7],[-1.4,6.4],[-6.6,12.2],[-15.2,8.4],[-13.6,2.2],[-8.4,2.6],[-4.4,-2.2],[.4,-5],[-14,-12.6],[8.6,.9]];
const gegenstaende=[
  { x:-12, z:-3.6, steh:[-11.6,-1.7], kasten:[3.7,1.5], treffer:[3.8,2.1,1.5], baue:wassertrog },
  { x:-5.2, z:6.4, steh:[-5.2,8.4], r:.95, treffer:[2.2,1.8,1.7], baue:apfelkorb },
  { x:-12.6, z:5.6, dreh:.3, steh:[-11.6,7], r:.45, treffer:[1.4,2.4,1.2], baue:leckstein },
  { x:2, z:-2.6, steh:[1.8,-.3], kasten:[4.2,2.7], treffer:[4.3,3,2.7], baue:stuteFohlen },
  { x:14, z:-4.6, dreh:-.25, steh:[12.9,-3.2], r:.55, treffer:[1.6,3.3,1.3], baue:vogelhaus },
  { x:11, z:-11.4, steh:[10.4,-9.8], kasten:[2.8,.6], treffer:[3,2.9,.8], baue:weideschild },
  { x:12.2, z:2.8, dreh:-.15, steh:[11.8,4.8], kasten:[2.9,1.7], treffer:[2.9,2.3,1.6], baue:heuraufe },
  { x:-9.2, z:9, dreh:.12, steh:[-8.9,10.8], kasten:[1.9,1.2], treffer:[2,1.7,1.3], baue:hufkiste },
  { x:7.4, z:7.6, dreh:.3, steh:[6.6,10.2], kasten:[3.5,2.6], treffer:[3.6,2.8,2.2], baue:traktor },
  { x:-1.4, z:-8.4, steh:[-1.4,-6.7], r:.6, treffer:[2.6,3.5,1], baue:vogelscheuche }
];

function baue(k){
  grund(k);
  zaeune(k);
  const tuer=weidetor(k);
  scheune(k);
  huette(k);
  windrad(k);
  landschaft(k);
  himmelsleben(k);
  herde(k);
  ausstattung(k);
  kleintiere(k);
  schmetterlinge(k);
  return { tuer, start:[-2.6,2.6] };
}
return { titel:'Die Koppel', himmel:0x8ecaf2, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Schlussbild Pferdehof: die Koppel im Abendlicht mit tiefer Sonne, Hügeln und Scheune. Das Weidetor schwingt auf,
   die Spielfigur kommt mit einer großen Möhre heraus, drei Pferde traben über die Wiese. Das Pony Flocke nimmt die
   Möhre und nickt, die Figur jubelt, dazu Schmetterlinge, Vögel und buntes Konfetti. Ohne Schrift. */
FINALE3D.pferdehof = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  const HORIZONT=0xffcf94;
  sc.background=new THREE.Color(HORIZONT);
  sc.fog=new THREE.Fog(HORIZONT,34,120);
  const himmelsLicht=new THREE.HemisphereLight(0xfff0e4,0x6a7a48,.68); sc.add(himmelsLicht);
  const licht=new THREE.DirectionalLight(0xffc888,.56); licht.position.set(11,9,10); licht.castShadow=true; licht.shadow.mapSize.set(1024,1024);
  const sk=licht.shadow.camera; sk.left=-13; sk.right=13; sk.top=12; sk.bottom=-10; sk.near=1; sk.far=46; licht.shadow.bias=-.001; sc.add(licht);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D(), FARBE=new THREE.Color();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const HOLZ=PH.HOLZ, HOLZ2=PH.HOLZ2, HELL=PH.HELLHOLZ, CREME=PH.CREME;
  const GRUEN=[0x4f8a34,0x69a63e,0x3d7a3a,0x86b446];
  const BUNT=[0xff4f6e,0xffc21a,0x2fb4ff,0x3fd07a,0xb264ec,0xff8a30];
  const schattenFleck=(par,r,x,z,sx)=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(r,20),basis(0x000000,{transparent:true,opacity:.24,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.set(x,.03,z); m.scale.x=sx||1; par.add(m); return m; };

  /* ---------- Abendhimmel: Verlauf, tiefe Sonne, Wolken ---------- */
  const KUPPEL=116; /* kleiner als die Sichtweite der Kamera (120), Sonne und Wolken liegen darin */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#4a5aa0'); v.addColorStop(.29,'#7a86c4'); v.addColorStop(.38,'#d89ab4'); v.addColorStop(.435,'#ff9a72'); v.addColorStop(.475,'#ffb870'); v.addColorStop(.5,'#ffcf94'); v.addColorStop(1,'#ffcf94'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(KUPPEL,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(1,32),basis(0xffe890,{fog:false})); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,170,80,.85)',0,0,0,18); sonnenSchein.material.fog=false;
  const wolkeHell=basis(0xffdcc4,{fog:false}), wolkeRosa=basis(0xe89098,{fog:false});
  /* [Bildplatz x, Bildplatz y, Größe] */
  const wolken=[[-.7,.76,1],[-.14,.9,.6],[.28,.78,.7],[.92,.88,.55]].map(p=>{ const g=gruppe(sc,0,0,0);
    [[-2.4,0,1.2],[-.9,.35,1.6],[.9,.2,1.4],[2.4,-.05,1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1.3,.5,.4));
    ball(g,1,wolkeRosa,0,-.38,.15,4.1,.42,.4); verschmelze(g); ohneSchatten(g); return { g, p }; });

  /* ---------- Wiese, Hügel, Sandweg ---------- */
  const wiesenBild=PH.kornBild('#74a444',['rgba(210,230,120,.4)','rgba(40,90,20,.35)','rgba(150,190,70,.4)'],true); wiesenBild.wrapS=wiesenBild.wrapT=THREE.RepeatWrapping; wiesenBild.repeat.set(40,40);
  const wiese=new THREE.Mesh(new THREE.PlaneGeometry(280,280),new THREE.MeshLambertMaterial({map:wiesenBild})); wiese.rotation.x=-Math.PI/2; wiese.receiveShadow=true; sc.add(wiese);
  const huegel=gruppe(sc,0,0,0);
  /* [x, z, Breite, Höhe, Farbe] */
  [[-44,-52,24,6.5,0x6c8c48],[-17,-60,22,4.6,0x84984c],[9,-56,19,5.4,0x728e4a],[33,-50,20,4.2,0x8a9a4e],[58,-58,24,7,0x66864a],[-66,-44,20,5,0x7a924a],[75,-42,18,5,0x7a924a],[-30,-82,32,11,0x8a8478],[26,-86,36,9,0x96887a]]
    .forEach(p=>ball(huegel,1,p[4],p[0],-.4,p[1],p[2],p[3],p[2]*.4));
  ohneSchatten(huegel); verschmelze(huegel);

  /* Plätze von Figur und Tor */
  const FX=-1.6, FZ=2.4, TORZ=-1.2, START=-3.2;
  const weg=new THREE.Mesh(new THREE.PlaneGeometry(2.1,22),mat(0xd0aa6c)); weg.rotation.x=-Math.PI/2; weg.position.set(FX,.012,6); weg.receiveShadow=true; sc.add(weg);
  [-4,TORZ,.8,2.6,4.6].forEach((z,i)=>{ const f=new THREE.Mesh(new THREE.CircleGeometry(1.18+(i%2)*.14,18),weg.material); f.rotation.x=-Math.PI/2; f.position.set(FX,.014+i*.0006,z); f.receiveShadow=true; sc.add(f); });

  /* ---------- Gras, Blumen, Büsche ---------- */
  const gras=[], bluete=[];
  const amWeg=(x,z)=>Math.abs(x-FX)<1.4&&z>-5;
  for(let i=0;i<900;i++){ const x=(zufall()*2-1)*22, z=-22+zufall()*30; if(amWeg(x,z)) continue; gras.push([x,.09,z,.045,.18+zufall()*.1,.045,GRUEN[i%4],0,(zufall()-.5)*.5,(zufall()-.5)*.5]); }
  for(let i=0;i<220;i++){ const x=(zufall()*2-1)*18, z=-14+zufall()*21; if(amWeg(x,z)) continue; const c=[0xfff6e8,0xffd630,0xff7aa0,0xb484e8][i%4];
    bluete.push([x,.14,z,.065,.045,.065,c]); gras.push([x,.07,z,.016,.14,.016,0x3d7a3a]); }
  PH.viele(sc,GEO.cone,gras); PH.viele(sc,GEO.sph,bluete);

  /* ---------- Koppelzaun mit Lücke für das Weidetor ---------- */
  const zaun=gruppe(sc,0,0,TORZ), links=-3.4, rechts=-.35, TM=(links+rechts)/2; /* TM: Mitte des Tors */
  [[links,-1],[rechts,1]].forEach(([x0,v])=>{
    for(let i=1;i<=11;i++){ const x=x0+v*i*1.8; walze(zaun,.09,1.2,HOLZ2,x,.6,0); ball(zaun,.11,HOLZ,x,1.2,0,1,.5,1); }
    [.5,.95].forEach(y=>box(zaun,19.8,.13,.07,HELL,x0+v*9.9,y,0)); });
  verschmelze(zaun);
  /* ---------- Torgerüst wie auf der Koppel in Raum 5: hohe Pfosten, Querbalken, Giebelbrett mit Hufeisen ----------
     Es steht hinter Figur und Pony und kann sie deshalb nicht verdecken; der Balken liegt über dem Kopf der Figur */
  const STAMM=0x6a4626, STAMM2=0x6e4c2c, TORH=0xe0a75c, TORH2=0xb87c3a, FELS=0xa8a296;
  const geruest=gruppe(sc,0,0,TORZ);
  [[links,1],[rechts,-1]].forEach(([x,v])=>{ box(geruest,.48,3.72,.48,STAMM,x,1.86,0); box(geruest,.66,.2,.66,STAMM2,x,3.78,0); ball(geruest,.24,TORH,x,4.08,0);
    box(geruest,.72,.24,.72,FELS,x,.12,0);
    [.55,1.45].forEach(y=>box(geruest,.56,.1,.56,PH.EISEN,x,y,0));
    strich(geruest,[x,2.9,0],[x+v*.58,3.45,0],.09,STAMM); });
  box(geruest,rechts-links+.6,.32,.36,STAMM,TM,3.5,0);
  const brett=new THREE.Shape(); [[-.75,0],[.75,0],[.75,.5],[0,.95],[-.75,.5]].forEach((p,i)=>{ if(i) brett.lineTo(p[0],p[1]); else brett.moveTo(p[0],p[1]); });
  const giebelBrett=new THREE.Mesh(new THREE.ExtrudeGeometry(brett,{depth:.16,bevelEnabled:false}),mat(TORH2)); giebelBrett.position.set(TM,3.58,-.08); giebelBrett.castShadow=true; geruest.add(giebelBrett);
  const eisen=ring(geruest,.27,.065,PH.GOLD,TM,4.02,.14,Math.PI*1.5); eisen.rotation.z=-Math.PI*.25;
  [-1,1].forEach(v=>ball(geruest,.073,PH.GOLD,TM+v*.19,3.83,.14));
  [20,90,160].forEach(w=>{ const a=w*Math.PI/180; ball(geruest,.022,0x4a3208,TM+Math.cos(a)*.27,4.02+Math.sin(a)*.27,.2); });
  verschmelze(geruest);
  /* Torflügel aus hellem Holz: Angel vorn am linken Pfosten, schwingt weit nach vorn links auf */
  const angel=gruppe(sc,links+.24,0,TORZ+.32), fluegel=gruppe(angel,0,0,0), FB=rechts-links-.5;
  [.4,.85,1.3,1.75].forEach(y=>box(fluegel,FB,.2,.12,TORH,FB/2,y,0));
  [.09,FB-.09].forEach(x=>box(fluegel,.18,1.85,.16,TORH2,x,1.1,0));
  [-1,1].forEach(v=>{ strich(fluegel,[.14,.42,v*.09],[FB-.14,1.74,v*.09],.07,TORH2);
    [.4,1.75].forEach(y=>box(fluegel,.62,.09,.04,PH.EISEN,.32,y,v*.09)); });
  ring(fluegel,.11,.03,PH.EISEN,FB-.2,1.3,-.14);
  verschmelze(fluegel);

  /* ---------- Scheune ---------- */
  const scheune=gruppe(sc,-10,0,-18), sb=gruppe(scheune,0,0,0), ROT=0xb0442e, ROT2=0x7e2e20, DACH=0x5a3a34;
  box(sb,7.4,4,4.4,ROT,0,2,0);
  for(let x=-3.3;x<=3.31;x+=.66) box(sb,.05,4,.04,ROT2,x,2,2.22);
  const giebel=new THREE.Shape(); giebel.moveTo(-3.7,0); giebel.lineTo(3.7,0); giebel.lineTo(0,2.5); giebel.lineTo(-3.7,0);
  [2.2,-2.2].forEach(z=>{ const m=new THREE.Mesh(new THREE.ShapeGeometry(giebel),mat(ROT,{side:THREE.DoubleSide})); m.position.set(0,4,z); sb.add(m); });
  const schraeg=Math.atan2(2.5,3.7);
  [-1,1].forEach(v=>{ box(sb,4.9,.22,5.1,DACH,v*1.97,5.3,0).rotation.z=-v*schraeg; strich(sb,[v*4,4,2.58],[0,6.7,2.58],.09,CREME); });
  box(sb,2.8,2.7,.1,ROT2,0,1.35,2.26);
  [-1.4,0,1.4].forEach(x=>box(sb,.13,2.8,.1,CREME,x,1.4,2.34)); box(sb,2.95,.14,.1,CREME,0,2.76,2.34);
  [-.7,.7].forEach(x=>[-1,1].forEach(v=>strich(sb,[x-v*.65,.1,2.36],[x+v*.65,2.65,2.36],.05,CREME)));
  const luke=walze(sb,.62,.1,0x3a2214,0,4.75,2.28); luke.rotation.x=Math.PI/2; ring(sb,.66,.09,CREME,0,4.75,2.34);
  for(let i=0;i<9;i++) strich(sb,[-.4+i*.1,4.3,2.38],[-.5+i*.125,4.75+(i%3)*.12,2.4],.025,PH.STROH);
  [-2.55,2.55].forEach(x=>{ box(sb,1,.95,.08,0xffe49a,x,2.2,2.25); box(sb,1.16,.1,.14,CREME,x,2.72,2.28); box(sb,1.16,.1,.14,CREME,x,1.68,2.28); [-.54,0,.54].forEach(d=>box(sb,.08,1.05,.12,CREME,x+d,2.2,2.28)); });
  ohneSchatten(sb); verschmelze(sb);
  PH.ballen(scheune,4.6,0,1.6,1.5,.8,.9,.15); PH.ballen(scheune,4.7,.8,1.55,1.3,.7,.85,-.1); PH.ballen(scheune,6.1,0,2,1.4,.8,.9,-.35);

  /* ---------- Bäume ---------- */
  const baeume=gruppe(sc,0,0,0);
  [[-21,-16,1.2],[-27,-24,1.4],[-17,-27,1],[3,-24,1],[7.5,-27,1.25],[16,-17,1.15],[21,-23,1.35],[29,-19,1],[-34,-14,1.1],[36,-28,1.3]].forEach(([x,z,s],j)=>{
    walze(baeume,.28*s,2*s,HOLZ2,x,s,z);
    [[0,3,0,1.45],[-.9,2.5,.2,1],[.95,2.6,.1,1.05],[.1,4,0,.95]].forEach((q,i)=>ball(baeume,q[3]*s,GRUEN[(i+j)%4],x+q[0]*s,q[1]*s,z+q[2]));
    if(j%3===1) for(let i=0;i<7;i++){ const a=i*2.4; ball(baeume,.13*s,0xd8402a,x+Math.cos(a)*s*1.1,(2.5+(i%4)*.4)*s,z+1.25*s); } });
  ohneSchatten(baeume); verschmelze(baeume);

  /* ---------- Drei Pferde traben auf einem Oval hinter dem Zaun (gleicher Abstand, sie begegnen sich nie) ---------- */
  const F=PH.FELL;
  const herde=[F.braun,F.fuchs,F.rappe].map((f,i)=>{ const p=PH.pferd(k,sc,0,-7.5,0,[.84,.78,.8][i],{ fell:f[0], maehne:f[1], blesse:i!==1, socken:i!==2, ruhig:true });
    p.fleck=schattenFleck(sc,.55,0,-7.5,2.1); return p; });

  /* ---------- Spielfigur ---------- */
  const u=figur.userData, FS=1.3;
  figur.position.set(FX,0,FZ); figur.scale.set(FS,FS,FS); sc.add(figur);

  /* ---------- Möhre: dickes Ende bei x=0, Spitze bei x=LANG, Grün nach hinten oben ---------- */
  const LANG=.8, GRIFF=.18;
  const moehre=()=>{ const g=new THREE.Group(), t=gruppe(g,0,0,0);
    const leib=rohr(t,.045,.145,LANG-.08,0xff7a14,(LANG-.08)/2+.02,0,0,16); leib.rotation.z=-Math.PI/2;
    ball(t,.145,0xff7a14,.03,0,0,.45,1,1); ball(t,.047,0xff7a14,LANG-.05,0,0,1.5,1,1);
    [[.17,.128],[.34,.104],[.5,.082]].forEach(([x,r])=>{ const q=ring(t,r,.01,0xd85a08,x,0,0); q.rotation.y=Math.PI/2; });
    [[-.2,.26,0],[-.3,.13,.1],[-.27,.2,-.11],[-.08,.31,.05],[-.32,.02,-.03]].forEach((p,i)=>{ strich(t,[0,0,0],p,.022,0x4a9a2a); ball(t,.075,i%2?0x69b63e:0x3d8a2a,p[0],p[1],p[2],1,1.25,.7); ball(t,.05,0x86c446,p[0]*.6,p[1]*.6+.03,p[2]*.6); });
    verschmelze(g); return g; };

  /* Pose beim Überreichen. Daraus werden Handplatz, Richtung, Standplatz des Ponys und Halsneigung berechnet,
     damit die Spitze der Möhre genau im Maul ankommt. */
  const DREH_F=.25, ARM_Z=1.45, ARM_X=-.3;
  figur.rotation.y=DREH_F; u.armR.rotation.set(ARM_X,0,ARM_Z);
  figur.updateMatrixWorld(true);
  const hand=u.armR.localToWorld(V(0,-.55,0));
  const GR=.75, DREH_P=Math.PI+.25;
  const richtung=V(-Math.cos(DREH_P),0,Math.sin(DREH_P)); /* von der Hand zum Pony */
  /* Maulpunkt: im Kopf (0.72, -0.42), der Kopf sitzt am Hals bei (0.7, 1.02), also am Hals (1.42, 0.60) */
  const MX=1.42, MY=.6, ML=Math.hypot(MX,MY), MW=Math.atan2(MY,MX);
  const NIMM=Math.asin((hand.y/GR-1.68)/ML)-MW; /* Halsneigung, bei der das Maul auf Handhöhe ist */
  const maulWeit=(.78+ML*Math.cos(NIMM+MW))*GR; /* Abstand Maul von der Pony-Mitte, waagerecht */
  const maul=hand.clone().addScaledVector(richtung,LANG-GRIFF-.05);
  const standP=maul.clone().addScaledVector(richtung,maulWeit); standP.y=0;
  const flocke=PH.pferd(k,sc,standP.x,standP.z,DREH_P,GR,{ fell:F.schimmel[0], maehne:F.schimmel[1], halfter:PH.ROT, decke:PH.BLAU, ruhig:true });
  const mitte=standP.clone(); schattenFleck(sc,.5,mitte.x,mitte.z,2.1).rotation.z=DREH_P;
  const inHand=moehre(); inHand.position.copy(hand).addScaledVector(richtung,-GRIFF); inHand.rotation.y=Math.atan2(-richtung.z,richtung.x); sc.add(inHand);
  const imMaul=moehre(); imMaul.position.copy(inHand.position); imMaul.rotation.copy(inHand.rotation); sc.add(imMaul);
  flocke.hals.rotation.z=NIMM; sc.updateMatrixWorld(true);
  u.armR.attach(inHand); flocke.kopf.attach(imMaul); imMaul.visible=false;
  /* Nach der Übergabe zieht Flocke die Möhre tiefer ins Maul, das dicke Ende hängt leicht nach unten */
  const HAENG=-.5, TIEF=V(.52,-.34,0), LANGK=LANG/GR;
  const platz0=imMaul.position.clone(), lage0=imMaul.quaternion.clone();
  const platz1=V(TIEF.x+Math.cos(HAENG)*LANGK,TIEF.y+Math.sin(HAENG)*LANGK,0);
  const lage1=new THREE.Quaternion().setFromAxisAngle(V(0,0,1),HAENG+Math.PI).multiply(new THREE.Quaternion().setFromAxisAngle(V(1,0,0),Math.PI));
  figur.rotation.y=0; u.armR.rotation.set(0,0,.18);

  /* ---------- Schmetterlinge ---------- */
  /* [x, y, z]: seitlich und über den Köpfen */
  const falter=[[-4.4,2.5,1.4],[3.9,1.5,2.6],[-.1,3.5,.9],[2.7,3.3,.4],[-3.8,1,3.3],[4.2,3,-.1]].map((p,i)=>{ const g=gruppe(sc,p[0],p[1],p[2]), c=BUNT[(i*5+1)%6];
    const leib=gruppe(g,0,0,0); ball(leib,.035,PH.SCHWARZ,0,0,0,1,1,3.2); [-1,1].forEach(v=>{ strich(leib,[0,.02,.09],[v*.07,.11,.18],.006,PH.SCHWARZ); ball(leib,.014,PH.SCHWARZ,v*.07,.11,.18); }); verschmelze(leib);
    const fl=[-1,1].map(v=>{ const a=gruppe(g,v*.025,0,0), m=basis(c); ball(a,.13,m,v*.12,0,.05,1,.08,.85); ball(a,.09,m,v*.09,0,-.09,1,.08,.9); ball(a,.045,basis(0xfff6e0),v*.15,.012,.06,1,.15,1); verschmelze(a); ohneSchatten(a); return a; });
    return { g, fl, p }; });

  /* ---------- Vögel: sitzen auf den Zaunpfosten, fliegen auf und kreisen am Himmel ---------- */
  /* [Pfosten x, Abflug in Sekunden; null: bleibt sitzen] */
  const VOEGEL=[[rechts+3.6,1.1],[links-1.8,1.4],[rechts+5.4,1.8],[links-3.6,2.2],[rechts+7.2,4.4],[links-5.4,4.7],[rechts+1.8,null]];
  const voegel=VOEGEL.map((p,i)=>{ const y=1.25, g=gruppe(sc,p[0],y,TORZ), hell=[0xf4f2ee,0x6aa8e0,0xe8a050][i%3], dunkel=[0x8a90a8,0x2a60a0,0x8a4a24][i%3];
    const leib=gruppe(g,0,0,0);
    ball(leib,.15,hell,0,.19,0,.85,.85,1.35); box(leib,.15,.035,.2,dunkel,0,.2,-.24).rotation.x=.25;
    [-1,1].forEach(v=>strich(leib,[v*.05,.12,0],[v*.05,.01,.02],.013,0xe8806a));
    verschmelze(leib);
    const kopf=gruppe(g,0,.28,.15), kt=gruppe(kopf,0,0,0);
    ball(kt,.085,hell,0,.03,.02); kegel(kt,.025,.08,0xf0a030,0,.02,.13).rotation.x=Math.PI/2; [-1,1].forEach(v=>ball(kt,.016,0x181014,v*.068,.05,.055));
    verschmelze(kt);
    const fl=[-1,1].map(v=>{ const a=gruppe(g,v*.1,.24,0); ball(a,.16,dunkel,v*.13,0,-.02,1,.16,.62); ball(a,.07,hell,v*.27,0,-.05,1.2,.2,.7); verschmelze(a); return a; });
    return { g, kopf, fl, x:p[0], y, ab:p[1], dreh:Math.sin(i*2.3)*1.1 }; });

  /* ---------- Konfetti und Funkeln ---------- */
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; t.visible=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  /* seitlich dichter, damit Figur und Pony frei bleiben */
  const NK=130, konfetti=menge(GEO.box,basis(0xffffff),NK), kd=[];
  for(let i=0;i<NK;i++){ const v=i%2?1:-1; kd.push({ x:v*(2.6+zufall()*(i%5?3.2:6)), y:zufall()*5.6, z:-.6+zufall()*3.8, v:.45+zufall()*.55, p:zufall()*6.28, g:.8+zufall()*.5 });
    if(i%4===0){ kd[i].x=(zufall()*2-1)*3.5; kd[i].z=-.8+zufall()*1.2; }
    konfetti.setColorAt(i,FARBE.set(BUNT[i%6])); }
  const NF=26, funkeln=menge(new THREE.OctahedronGeometry(1,0),basis(0xfff2a0),NF), fd=[];
  for(let i=0;i<NF;i++) fd.push({ x:(zufall()*2-1)*4.6, y:2.6+zufall()*2.2, z:-.8+zufall()*2.4, p:zufall()*6.28 });

  /* ---------- Kamera ---------- */
  const NEIG=.12, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=2.1;
  /* q: 0 schmal (bis 4:3), 1 sehr breit */
  const form=a=>weich((a-1.4)/1.4);
  /* kleinster Kameraabstand, bei dem Figur (links), Pony (rechts) und Tor im Bild sind */
  const abstand=(a,tn)=>[[-3.65,0,FZ],[-3.4,3.4,FZ],[standP.x+1.25,0,standP.z],[standP.x+1.25,2.3,standP.z],[0,-.1,3.5],[FX,3.5,FZ],[links-.4,4.3,TORZ],[TM,4.6,TORZ],[links-1.85,2,.65]]
    .reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
      return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },9);

  /* Zeitplan in Sekunden: nach etwa 6 s ist alles Wichtige geschehen */
  const TOR=.25, LOS=1.2, DA=2.85, REICHT=2.95, BEUGT=3.35, NIMMT=4.1, JUBEL=4.4;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), q=form(a), d=abstand(a,tn);
    const wippen=Math.sin(t*.22)*.18*weich((t-5)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);
    const c=kamera.position;
    kuppel.position.copy(c);
    /* Weltpunkt zu einem Bildplatz (x,y von -1 bis 1) in der Entfernung weit */
    const ort=(bx,by,weit)=>{ const hoch=by*weit*tn; return [c.x+bx*weit*tn*a, c.y-SN*weit+CN*hoch, c.z-CN*weit-SN*hoch]; };

    /* Sonne steht tief rechts und sinkt ganz langsam */
    const sg=.12*78*tn, sx=Math.min(.95-.12/a,.6);
    const sp=ort(sx,misch(.52,.43,weich(t/10)),78);
    sonne.position.set(sp[0],sp[1],sp[2]); sonne.scale.setScalar(sg); sonne.lookAt(c.x,c.y,c.z);
    sonnenSchein.position.set(sp[0],sp[1],sp[2]+.5); const sw=sg*(6+Math.sin(t*1.4)*.3); sonnenSchein.scale.set(sw,sw,1);
    wolken.forEach((w,i)=>{ const p=ort(w.p[0]+Math.sin(t*.07+i*2)*.05,w.p[1],55); w.g.position.set(p[0],p[1],p[2]); w.g.scale.setScalar(w.p[2]*55*tn/22); });
    scheune.position.x=misch(-9,-13,q);

    /* Weidetor schwingt weit auf */
    angel.rotation.y=-2.5*weich((t-TOR)/.9)+(t>TOR+.9?Math.sin((t-TOR-.9)*7)*.05*Math.exp(-(t-TOR-.9)*2.5):0);

    /* Herde trabt auf dem Oval */
    const rx=misch(5.4,8,q), rz=2;
    herde.forEach((p,i)=>{ const w=t*.62+i*Math.PI*2/3+.5, x=Math.cos(w)*rx, z=-7.5+Math.sin(w)*rz, s=t*9+i*2;
      p.g.position.set(x,Math.abs(Math.sin(s))*.13,z); p.g.rotation.y=Math.atan2(-Math.cos(w)*rz,-Math.sin(w)*rx);
      p.fleck.position.set(x,.03,z); p.fleck.rotation.z=p.g.rotation.y;
      p.beine.forEach((b,j)=>{ b.rotation.z=Math.sin(s+(j===0||j===3?0:Math.PI))*.5; });
      p.hals.rotation.z=Math.sin(s*2+.5)*.06; p.schweif.rotation.z=-.35+Math.sin(s*2)*.12; p.schweif.rotation.x=Math.sin(s*.5)*.2; });

    /* Figur läuft durch das Tor, reicht die Möhre, jubelt */
    const lauf=Math.min(1,Math.max(0,(t-LOS)/(DA-LOS))), geht=lauf>0&&lauf<1, s=Math.sin(t*11);
    const reicht=weich((t-REICHT)/.6), jubel=weich((t-JUBEL)/.5);
    /* beim Jubeln ein Schritt zur Seite, damit die Arme das Pony nicht berühren */
    figur.position.set(FX-.65*weich((t-NIMMT-.15)/.5),0,misch(START,FZ,lauf));
    figur.rotation.y=DREH_F*reicht*(1-jubel)+Math.sin(t*1.1)*.1*jubel;
    u.beinL.rotation.x=geht?s*.65:0; u.beinR.rotation.x=geht?-s*.65:0;
    u.armR.rotation.x=misch(geht?s*.25:0,ARM_X,reicht)*(1-jubel);
    u.armR.rotation.z=misch(misch(.18,ARM_Z,reicht),2.45+Math.sin(t*8)*.25,jubel);
    u.armL.rotation.x=geht?-s*.55:0;
    u.armL.rotation.z=misch(-.18,-2.45+Math.sin(t*8+1.5)*.3,jubel);
    u.koerper.position.y=geht?Math.abs(Math.cos(t*11))*.07:Math.abs(Math.sin(t*4.6))*.2*jubel;
    u.koerper.rotation.z=Math.sin(t*2.3)*.03*jubel;

    /* Pony Flocke: schaut, beugt sich zur Möhre, nimmt sie, hebt den Kopf und nickt */
    const beugt=weich((t-BEUGT)/(NIMMT-BEUGT-.05)), hebt=weich((t-NIMMT-.1)/.5);
    const nick=weich((t-NIMMT-.55)/.4), takt=Math.pow(Math.sin((t-NIMMT-.55)*4.2),2);
    flocke.hals.rotation.z=NIMM+(.46+Math.sin(t*1.7)*.04)*(1-beugt)+hebt*.3-nick*takt*.24;
    flocke.kopf.rotation.z=-nick*takt*.16;
    flocke.schweif.rotation.x=Math.sin(t*3)*.25*(.5+.5*hebt);
    flocke.ohren.forEach((e,i)=>{ e.rotation.z=Math.sin(t*3.3+i*2)>.85?.25:0; });
    inHand.visible=t<NIMMT; imMaul.visible=t>=NIMMT;
    const zieht=weich((t-NIMMT)/.4);
    imMaul.position.lerpVectors(platz0,platz1,zieht); imMaul.quaternion.copy(lage0).slerp(lage1,zieht);

    /* Schmetterlinge flattern in kleinen Bögen */
    falter.forEach((f,i)=>{ const w=t*(.9+i*.07)+i*2.1;
      f.g.position.set(f.p[0]+Math.sin(w)*.42,f.p[1]+Math.sin(w*2.3)*.2,f.p[2]+Math.cos(w*1.3)*.25);
      f.g.rotation.set(.75,Math.sin(w*.8)*.7,0);
      f.fl.forEach((fl,j)=>{ fl.rotation.z=(j?1:-1)*(.25+Math.sin(t*13+i)*.75); }); });

    /* Vögel: picken, auffliegen, im Kreis über der Koppel flattern */
    const weite=Math.min(7,.75*d*tn*a);
    voegel.forEach((v,i)=>{ const flug=v.ab===null?0:weich((t-v.ab)/2.4);
      if(v.ab===null||t<=v.ab){ v.g.position.set(v.x,v.y+Math.max(0,Math.sin(t*3+i*2))*.015,TORZ); v.g.rotation.set(0,v.dreh+Math.sin(t*.8+i)*.35,0,'YXZ');
        v.kopf.rotation.x=Math.pow(Math.max(0,Math.sin(t*3.4+i*1.7)),3)*.8; v.fl.forEach((f,j)=>{ f.rotation.z=(j?-1:1)*.12; }); return; }
      const bahn=tt=>{ const e=weich((tt-v.ab)/2.4), w=i*1.05+tt*.55, ox=Math.cos(w)*weite*(.74+(i%3)*.13), oy=4.2+(i%3)*.45+Math.sin(w*2+i)*.3, oz=-4+Math.sin(w)*1.6;
        return [misch(v.x,ox,e),misch(v.y,oy,Math.min(1,e*1.35))+Math.sin(e*Math.PI)*.5,misch(TORZ,oz,e)]; };
      const p=bahn(t), n=bahn(t+.08);
      v.g.position.set(p[0],p[1],p[2]); v.g.rotation.set(-.3*(1-flug),Math.atan2(n[0]-p[0],n[2]-p[2]),0,'YXZ');
      v.kopf.rotation.x=0; v.fl.forEach((f,j)=>{ f.rotation.z=(j?1:-1)*Math.sin(t*(15-5*flug)+i*1.9)*.85; }); });

    /* Konfetti sprudelt los, sobald Flocke die Möhre hat, dazu Funkeln */
    const AB=NIMMT+.25;
    konfetti.visible=funkeln.visible=t>AB;
    if(konfetti.visible){
      const los=weich((t-AB)/1.6);
      kd.forEach((f,i)=>{ const hy=.1+((f.y-t*f.v)%5.6+5.6)%5.6, g=f.g*weich((t-AB)/.5)*weich((5.7-hy)/.6)*weich(hy/.25);
        setze(konfetti,i,f.x*los+Math.sin(t*1.6+f.p)*.25,misch(3.4,hy,los),f.z*los,.11*g,.15*g,.012*g,t*2.6+f.p,t*1.7+f.p*2,Math.sin(t*2+f.p)); });
      konfetti.instanceMatrix.needsUpdate=true;
      fd.forEach((f,i)=>{ const g=.012+.055*Math.pow(Math.max(0,Math.sin(t*2.6+f.p)),4)*los;
        setze(funkeln,i,f.x+Math.sin(t*.5+f.p)*.2,f.y+Math.sin(t*.8+f.p*2)*.25,f.z,g,g*1.5,g,0,t+f.p,0); });
      funkeln.instanceMatrix.needsUpdate=true; }
  };
};

