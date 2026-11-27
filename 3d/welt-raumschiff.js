document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-planet\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"><circle r=\"9\"/><ellipse rx=\"18\" ry=\"6\" transform=\"rotate(-20)\"/></g></symbol>\n<symbol id=\"sym-rakete\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M0 -17Q9 -8 7 8H-7Q-9 -8 0 -17Z\"/><path d=\"M-7 1L-13 12H-7M7 1L13 12H7M-3 13L0 18L3 13\"/></g><circle cy=\"-4\" r=\"3\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-stern\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -15L4 -5L15 -5L6 2L9 14L0 7L-9 14L-6 2L-15 -5L-4 -5Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-komet\" viewBox=\"-20 -20 40 40\"><circle cx=\"8\" cy=\"-8\" r=\"7\" fill=\"currentColor\"/><path d=\"M2 -2L-15 15M7 2L-6 15M-2 -7L-15 6\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-mond\" viewBox=\"-20 -20 40 40\"><path d=\"M5 -15A15 15 0 1 0 15 5A12 12 0 0 1 5 -15Z\" fill=\"currentColor\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const L='stroke="#1e2a36" stroke-width="3"',L2='stroke="#1e2a36" stroke-width="2"';
const R=(x,y,w,h,r,f,e)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" ${r?`rx="${r}" `:''}fill="${f}"${e?' '+e:''}/>`,C=(x,y,r,f,e)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${e?' '+e:''}/>`;
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.32)"/>`;
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
function boden(){let d='';for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return`<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="${d}" stroke="rgba(0,0,0,.22)" stroke-width="2"/><path d="M0 472H1600" stroke="rgba(255,255,255,.25)" stroke-width="4"/>`;}
function wand(f,n,l){let d='';for(let x=100;x<1600;x+=200)d+=`M${x} 40V400`;return`<rect width="1600" height="470" fill="${f}"/><path d="${d}" stroke="rgba(0,0,0,.2)" stroke-width="4"/><rect y="400" width="1600" height="70" fill="${n}"/><path d="M0 400H1600M0 466H1600" stroke="rgba(255,255,255,.18)" stroke-width="3"/><rect width="1600" height="40" fill="#1a2028"/><rect y="40" width="1600" height="5" fill="${l}" opacity=".7"/>`;}
function gitter(y0,y1,s,f){let d='';for(let y=y0;y<=y1;y+=s)d+=`M0 ${y}H1600`;for(let x=0;x<1600;x+=s)d+=`M${x} ${y0}V${y1}`;return`<path d="${d}" stroke="${f}" stroke-width="2"/>`;}
function sterne(x,y,w,h,n){let s='';for(let k=0;k<n;k++)s+=`${C(x+(k*137)%w,y+(k*89)%h,1+k%3*.8,'#fff')}`;return s;}
const leuchte=x=>`${C(x,80,200,'url(#licht)')}${R(x-60,38,120,12,6,'#fffbe8')}`;
const schirm=(x,y,w,h,f)=>`${R(x,y,w,h,8,'#1e2a36')}${R(x+8,y+8,w-16,h-16,4,'#0a2a3a')}<path d="M${x+16} ${y+h*.6}l${w*.15} ${-h*.25}l${w*.15} ${h*.2}l${w*.15} ${-h*.3}l${w*.2} ${h*.25}" stroke="${f}" stroke-width="3" fill="none"/><path d="M${x+16} ${y+h-20}h${w*.5}" stroke="${f}" stroke-width="3" opacity=".5"/>`;
function pultreihe(x,w){let s=`<path d="M${x} 470V410L${x+20} 380H${x+w-20}L${x+w} 410V470Z" fill="#2a5a6a" ${L}/>`;for(let k=0;x+30+k*36<x+w-20;k++)s+=`${C(x+30+k*36,395,6,['#5ff0ff','#ffcf4a','#ff7a6a','#7ad06a'][k%4])}`;return s;}
function roehre(x){return`${R(x-34,90,68,350,34,'#c8f0d8','fill-opacity=".6" stroke="#8ab8a0" stroke-width="4"')}<path d="M${x} 430V200" stroke="#2f8a4a" stroke-width="5"/><path d="M${x} 380Q${x-30} 360 ${x-26} 330Q${x} 340 ${x} 380M${x} 320Q${x+30} 300 ${x+26} 270Q${x} 280 ${x} 320M${x} 260Q${x-26} 240 ${x-20} 214Q${x} 222 ${x} 260" stroke="#2f8a4a" stroke-width="3" fill="#5ab46a"/>${C(x,194,13,'#ff8ab0',L2)}${C(x,194,5,'#ffe680')}${R(x-40,80,80,16,5,'#8a96a4')}${R(x-40,430,80,22,5,'#8a96a4')}${R(x-20,110,8,280,4,'#fff','opacity=".5"')}`;}
function rohre(xs){let s=`<path d="M0 72H1600M0 104H1600${xs.map(x=>`M${x} 72V470`).join('')}" stroke="#c87a3a" stroke-width="18" fill="none"/>`;for(let x=60;x<1600;x+=220)s+=`${R(x,60,16,56,3,'#8a4a24')}`;for(const x of xs)s+=`${R(x-14,260,28,14,3,'#8a4a24')}`;return s;}
function kern(x){return`<defs><linearGradient id="kernG" x1="0" x2="1"><stop offset="0" stop-color="#ff7a20"/><stop offset=".5" stop-color="#fff0a0"/><stop offset="1" stop-color="#ff7a20"/></linearGradient></defs><circle cx="${x}" cy="260" r="280" fill="url(#licht)"><animate attributeName="opacity" values=".6;1;.6" dur="2.4s" repeatCount="indefinite"/></circle>${R(x-50,80,100,340,0,'url(#kernG)')}${[130,200,270,340].map(y=>`${R(x-58,y,116,12,4,'#3a3f48')}`).join('')}${R(x-30,90,12,320,6,'#fff','opacity=".45"')}${R(x-80,40,160,40,0,'#3a3f48',L)}${R(x-80,420,160,50,0,'#3a3f48',L)}`;}
const kapsel=()=>`<path d="M-60 0L-84 30M60 0L84 30" stroke="#8a96a4" stroke-width="6" stroke-linecap="round"/><path d="M-70 0L-46 -150Q0 -190 46 -150L70 0Z" fill="#eef1f5" ${L}/><path d="M-62 -50H62" stroke="#e8a030" stroke-width="10"/><circle cy="-100" r="22" fill="#2a4a8a" stroke="#8a96a4" stroke-width="6"/><path d="M-10 -110Q-4 -116 4 -114" stroke="#fff" stroke-width="4" stroke-linecap="round"/>${R(-14,-186,28,14,4,'#8a96a4',L)}${R(-76,-8,152,16,6,'#c0503a',L)}`;
const steuerpult=()=>`${schatten(62,4)}<path d="M-56 0V-62L-62 -92H62L56 -62V0Z" fill="#2f6a7a" ${L}/><path d="M-62 -92L-50 -112H50L62 -92Z" fill="#1e2a36" ${L}/>${R(-40,-56,80,34,5,'#0a2a3a')}<path d="M-32 -36l14 -10l12 8l14 -12l14 6" stroke="#5ff0ff" stroke-width="3" fill="none"/>${['#ff7a6a','#ffcf4a','#7ad06a'].map((c,k)=>`${C(-38+k*16,-101,5,c)}`).join('')}<path d="M24 -100V-124" stroke="#8a96a4" stroke-width="5"/>${C(24,-126,8,'#ff7a6a',L)}`;
const sessel=()=>`${schatten(56,4)}<path d="M-34 0H34M0 0V-40" stroke="#4a5866" stroke-width="10" stroke-linecap="round"/>${R(-26,-176,52,30,12,'#2f8aa0',L)}${R(-44,-150,88,96,20,'#2f8aa0',L)}<path d="M0 -142V-62" stroke="#5ff0ff" stroke-width="6"/>${R(-54,-62,108,26,10,'#3aa0b8',L)}${R(-62,-96,18,50,8,'#4a5866',L)}${R(44,-96,18,50,8,'#4a5866',L)}${C(53,-98,5,'#ffcf4a')}`;
const teleskop=()=>`${schatten(46,4)}<path d="M0 -84L-36 0M0 -84L36 0M0 -84V0" stroke="#4a5866" stroke-width="6" stroke-linecap="round"/><g transform="rotate(-28 0 -92)">${R(-50,-104,104,24,8,'#f2f4f8',L)}${R(44,-110,26,36,6,'#2f8aa0',L)}${R(-64,-98,16,12,3,'#4a5866')}</g>`;
const holo=()=>`${schatten(44,4)}<path d="M-30 -42L-44 -150H44L30 -42Z" fill="#5ff0ff" opacity=".15"/><path d="M-30 0L-20 -40H20L30 0Z" fill="#4a5866" ${L}/><ellipse cy="-42" rx="34" ry="8" fill="#5ff0ff" opacity=".8"/><circle cy="-104" r="38" fill="#5ff0ff" fill-opacity=".3" stroke="#5ff0ff" stroke-width="3"/><ellipse cy="-104" rx="38" ry="12" fill="none" stroke="#5ff0ff" stroke-width="2"/><ellipse cy="-104" rx="14" ry="38" fill="none" stroke="#5ff0ff" stroke-width="2"/>${C(16,-120,7,'#ffcf4a')}`;
const funk=()=>`<path d="M50 -50L70 -90" stroke="#4a5866" stroke-width="5" stroke-linecap="round"/>${C(70,-92,6,'#ff7a6a')}${R(-80,-50,160,100,12,'#3a6a7a',L)}${C(-40,2,30,'#1e2a36')}<path d="M-62 -8H-18M-66 2H-14M-62 12H-18" stroke="#5a7a8a" stroke-width="4"/>${R(0,-34,64,30,4,'#0a2a3a')}<path d="M6 -19q6 -10 12 0t12 0t12 0t12 0" stroke="#5ff0ff" stroke-width="2.5" fill="none"/>${C(14,22,10,'#ffcf4a',L)}${C(48,22,10,'#f2f4f8',L)}`;
const mikroskop=()=>`${schatten(60,4)}<path d="M-46 0V-60M46 0V-60" stroke="#8a96a4" stroke-width="7"/>${R(-60,-68,120,12,4,'#f2f4f8',L)}${R(-30,-80,56,12,4,'#4a5866')}<path d="M14 -80V-130Q14 -146 -2 -150" stroke="#2f8a4a" stroke-width="12" fill="none" stroke-linecap="round"/>${R(-26,-112,40,8,2,'#4a5866')}<g transform="rotate(-20 -14 -140)">${R(-24,-176,20,62,5,'#f2f4f8',L)}${R(-28,-184,28,12,3,'#4a5866')}</g>${C(-6,-88,4,'#ffe680')}`;
const reagenz=()=>`${schatten(44,4)}<path d="M-30 0L-24 -50M30 0L24 -50" stroke="#8a96a4" stroke-width="6"/>${R(-44,-56,88,10,4,'#f2f4f8',L)}${['#ff7a6a','#5ab46a','#5aa0ff','#ffcf4a'].map((c,k)=>`${R(-34+k*18,-108,14,52,7,'#e8f4f0',L2)}${R(-32+k*18,-90+k%2*8,10,30-k%2*8,5,c)}`).join('')}${R(-42,-86,84,8,3,'#8a96a4')}`;
const waage=()=>`${schatten(44,4)}${R(-44,-30,88,28,6,'#f2f4f8',L)}${R(-24,-24,48,16,3,'#0a2a3a')}<path d="M-16 -16H16" stroke="#7ad06a" stroke-width="5" stroke-dasharray="6 3"/><path d="M0 -30V-44" stroke="#8a96a4" stroke-width="6"/><ellipse cy="-46" rx="38" ry="6" fill="#c8d0da" ${L}/><circle cy="-68" r="18" fill="#ff7a6a" ${L}/><path d="M0 -86Q2 -94 8 -94" stroke="#2f8a4a" stroke-width="4" fill="none"/><ellipse cx="12" cy="-92" rx="7" ry="4" fill="#5ab46a"/>`;
const kuehl=()=>`${schatten(50,4)}${R(-46,-160,92,158,10,'#e8f4f0',L)}<path d="M-46 -104H46" ${L}/>${R(30,-150,6,34,3,'#8a96a4')}${R(30,-94,6,40,3,'#8a96a4')}${R(-34,-94,54,80,4,'#c8f0f8','stroke="#8ab8c8" stroke-width="2"')}<path d="M-30 -60H16M-30 -32H16" stroke="#8ab8c8" stroke-width="3"/>${[-24,-10,4].map(x=>`${R(x,-82,8,20,4,'#5ab46a')}`).join('')}${C(-24,-130,10,'#5aa0ff')}<path d="M-30 -130H-18M-24 -136V-124" stroke="#fff" stroke-width="2.5"/>`;
const tafel=()=>`${R(-92,-62,184,124,6,'#f8fbf8','stroke="#8a96a4" stroke-width="6"')}<path d="M-60 40V-6M-60 10Q-84 0 -80 -26Q-62 -18 -60 10M-60 -2Q-36 -16 -40 -40Q-60 -28 -60 -2" stroke="#2f8a4a" stroke-width="3" fill="#7ad06a"/><path d="M-10 -40Q10 -20 -10 0Q-30 20 -10 40M14 -40Q-6 -20 14 0Q34 20 14 40M-6 -30H10M-10 -10H14M-6 10H10M-10 30H14" stroke="#5aa0ff" stroke-width="3" fill="none"/><path d="M40 -34H80M40 -18H72M40 -2H80M40 14H64" stroke="#8a96a4" stroke-width="4"/>${R(-60,62,120,8,3,'#8a96a4')}`;
const ventil=()=>`${schatten(56,4)}<path d="M-46 -4V-60Q-46 -80 -26 -80H26Q46 -80 46 -60V-4" stroke="#c87a3a" stroke-width="22" fill="none"/>${R(-60,-14,28,14,3,'#8a4a24')}${R(32,-14,28,14,3,'#8a4a24')}<path d="M0 -80V-104" stroke="#4a5866" stroke-width="7"/><circle cy="-112" r="28" fill="none" stroke="#e03a2a" stroke-width="7"/><path d="M-28 -112H28M0 -140V-84" stroke="#e03a2a" stroke-width="5"/><circle cy="-112" r="7" fill="#8a1a10"/>`;
const wwagen=()=>`${schatten(56,4)}${C(-36,-8,8,'#1e2a36')}${C(36,-8,8,'#1e2a36')}<path d="M50 -96L66 -112" stroke="#4a5866" stroke-width="6" stroke-linecap="round"/>${R(-50,-100,100,86,6,'#e03a2a',L)}${[0,1,2].map(k=>`<path d="M-50 ${-72+k*28}H50" ${L}/>${R(-14,-91+k*28,28,6,3,'#f2f4f8')}`).join('')}<path d="M-34 -104L-8 -126" stroke="#8a96a4" stroke-width="7" stroke-linecap="round"/>${C(-38,-102,8,'none','stroke="#8a96a4" stroke-width="5"')}${R(6,-116,30,16,3,'#ffcf4a',L2)}`;
const tank=()=>`${schatten(52,4)}<path d="M-30 0V-20M30 0V-20" stroke="#4a5866" stroke-width="8"/>${R(-14,-172,28,16,4,'#4a5866',L2)}${R(-48,-160,96,144,40,'#ffcf4a',L)}${R(-47,-112,94,16,0,'url(#warn)')}<circle cy="-58" r="20" fill="#f2f4f8" ${L}/><path d="M-14 -58A14 14 0 0 1 14 -58" stroke="#7ad06a" stroke-width="3" fill="none"/><path d="M0 -58L10 -70" stroke="#e03a2a" stroke-width="3" stroke-linecap="round"/>${R(-34,-150,10,120,5,'#fff','opacity=".4"')}`;
const roboter=()=>`${schatten(40,4)}${R(-30,-14,60,12,6,'#4a5866')}${C(-20,-6,8,'#1e2a36')}${C(20,-6,8,'#1e2a36')}<path d="M-32 -54L-48 -40M32 -54L48 -66" stroke="#8a96a4" stroke-width="6" stroke-linecap="round"/>${R(-32,-76,64,62,10,'#c8d0da',L)}${R(-18,-64,36,24,4,'#0a2a3a')}<path d="M-12 -52h8l4 -6l4 10l4 -4h4" stroke="#7ad06a" stroke-width="2.5" fill="none"/><path d="M0 -118V-132" stroke="#4a5866" stroke-width="4"/><circle cy="-136" r="6" fill="#ff7a6a"/>${R(-26,-118,52,40,14,'#f2f4f8',L)}${C(-10,-98,7,'#5ff0ff',L2)}${C(10,-98,7,'#5ff0ff',L2)}`;
const schaltkasten=()=>`${R(-66,-66,132,132,8,'#8a96a4',L)}${R(-54,-54,108,108,4,'#3a3f48')}<path d="M-4 -50L-16 -26H-4L-10 -6L12 -34H0L8 -50Z" fill="#ffcf4a"/>${['#e03a2a','#7ad06a','#5ff0ff'].map((c,k)=>`${R(-40+k*32,0,16,44,4,'#1e2a36')}${R(-44+k*32,k==1?28:4,24,12,3,c)}`).join('')}${C(-36,-36,6,'#7ad06a')}${C(36,-36,6,'#e03a2a')}`;
const leiter=()=>`${schatten(40,4)}<path d="M-26 0V-200M26 0V-200M-26 -200Q-26 -218 -40 -216M26 -200Q26 -218 12 -216" stroke="#c8d0da" stroke-width="8" fill="none" stroke-linecap="round"/>${[...Array(7)].map((_,k)=>`<path d="M-26 ${-22-k*27}H26" stroke="#e8b830" stroke-width="7"/>`).join('')}`;
const stiefel1=x=>`<path d="M${x-18} -80H${x+14}V-30L${x+40} -24Q${x+48} -20 ${x+46} -10H${x-20}Z" fill="#f2f4f8" ${L}/>${R(x-22,-12,70,12,5,'#5ff0ff',L2)}<path d="M${x-18} -60H${x+14}" stroke="#e8b830" stroke-width="6"/>`;
const stiefel=()=>`${schatten(56,4)}<ellipse rx="60" ry="9" fill="#5ff0ff" opacity=".4"/>${stiefel1(-30)}${stiefel1(14)}`;
const fallschirm=()=>`${schatten(46,4)}${R(-42,-110,84,108,16,'#e8763a',L)}${R(-30,-62,60,40,8,'#c85a2a',L2)}<path d="M-30 -110V-2M30 -110V-2" stroke="#4a5866" stroke-width="7"/><path d="M-22 -92Q0 -118 22 -92Z" fill="#f2f4f8" ${L2}/><path d="M-22 -92L0 -76L22 -92M0 -76V-92" stroke="#1e2a36" stroke-width="1.5"/><circle cy="-42" r="8" fill="#e8b830"/>`;
const ampel=()=>`${schatten(30,4)}<path d="M0 0V-110" stroke="#4a5866" stroke-width="10"/>${R(-20,-6,40,8,3,'#4a5866')}${R(-24,-196,48,96,12,'#2a3038',L)}${['#ff5a4a','#ffcf4a','#5adf6a'].map((c,k)=>`<circle cy="${-178+k*30}" r="11" fill="${c}"${k==2?'':' opacity=".35"'}/>`).join('')}`;
const konsole=()=>`${R(-70,-56,140,112,12,'#c8d0da',L)}${R(-56,-44,112,44,4,'#0a2a3a')}<use href="#sym-rakete" x="-18" y="-40" width="36" height="36" color="#5adf6a"/>${C(-26,26,18,'#e03a2a',L)}${C(20,18,8,'#5adf6a',L2)}${C(44,18,8,'#ffcf4a',L2)}${R(10,34,44,10,4,'#4a5866')}`;
const navi=()=>`${R(-76,-50,152,100,10,'#1e2a36')}${R(-66,-40,132,80,4,'#06102a')}${sterne(-60,-34,120,68,8)}<path d="M-46 24Q-10 -30 40 -14" stroke="#ffcf4a" stroke-width="3" stroke-dasharray="6 5" fill="none"/>${C(-46,24,10,'#3fa0c8')}${C(44,-16,12,'#f0a860')}<use href="#sym-rakete" x="-18" y="-16" width="22" height="22" color="#5ff0ff"/>`;
const logbuch=()=>`${schatten(40,4)}<path d="M0 -2V-80" stroke="#4a5866" stroke-width="10"/>${R(-30,-6,60,8,3,'#4a5866')}<path d="M-50 -76H50L40 -96H-40Z" fill="#2f6a7a" ${L}/><path d="M0 -98Q-24 -112 -46 -104L-40 -86Q-20 -94 0 -84Q20 -94 40 -86L46 -104Q24 -112 0 -98V-84" fill="#f8f4e8" ${L2}/><path d="M-34 -98l24 -2M10 -100l24 2" stroke="#8a96a4" stroke-width="2"/>`;
const kartentisch=()=>`${schatten(60,4)}<path d="M-44 -2V-50M44 -2V-50" stroke="#4a5866" stroke-width="8"/><path d="M-66 -50H66L52 -78H-52Z" fill="#16224a" ${L}/><path d="M-36 -58L-10 -70L20 -60L40 -70" stroke="#8fb8ff" stroke-width="2" fill="none"/>${C(-36,-58,5,'#3fa0c8')}${C(20,-60,4,'#ffe680')}${C(40,-70,5,'#f0a860')}${R(-66,-52,132,8,0,'#2f6a7a')}`;
const plakat=()=>`${R(-90,-50,180,100,4,'#16224a','stroke="#f2f4f8" stroke-width="6"')}<circle cx="-64" r="20" fill="#ffcf4a"/>${[[-34,5,'#c8a080'],[-17,7,'#f0c080'],[2,8,'#3fa0c8'],[21,6,'#e0603a'],[46,14,'#f0a860'],[74,10,'#8fd8e8']].map(([x,r,c])=>`<circle cx="${x}" r="${r}" fill="${c}"/>`).join('')}<path d="M-70 34H70" stroke="#8fb8ff" stroke-width="4" stroke-dasharray="14 8"/>`;
const beet=()=>`${schatten(50,4)}<path d="M0 -40V-110M0 -60Q-30 -66 -34 -92Q-8 -86 0 -60M0 -78Q28 -86 30 -112Q6 -106 0 -78" stroke="#2f8a4a" stroke-width="3" fill="#7ad06a"/><circle cy="-116" r="10" fill="#ff8ab0" ${L2}/><circle cy="-116" r="4" fill="#ffe680"/><path d="M34 -40V-70" stroke="#8a96a4" stroke-width="3"/>${R(20,-86,30,20,3,'#fff',L2)}<path d="M-46 -40H46L38 -2H-38Z" fill="#c87a3a" ${L}/>`;
const proben=()=>`${schatten(50,4)}${[[-26,'#8a7a6a'],[0,'#c87a5a'],[24,'#6a7a8a']].map(([x,c])=>`<ellipse cx="${x}" cy="-52" rx="14" ry="10" fill="${c}" ${L2}/>`).join('')}${R(-46,-50,92,48,5,'#e8f4f0',L)}${R(-24,-38,48,22,3,'#5ab46a')}<path d="M-16 -27H16" stroke="#fff" stroke-width="3"/>`;
const anzeige=()=>`${R(-80,-50,160,100,8,'#3a3f48',L)}${[-46,0,46].map((x,k)=>`${C(x,-8,20,'#f2f4f8',L2)}<path d="M${x} -8l${[-10,4,12][k]} -12" stroke="#e03a2a" stroke-width="3" stroke-linecap="round"/>`).join('')}<path d="M-60 32H60" stroke="#7ad06a" stroke-width="8" stroke-dasharray="20 6"/>`;
const teile=()=>`${schatten(50,4)}${C(-18,-60,13,'#8a96a4','stroke="#8a96a4" stroke-width="8" stroke-dasharray="5 4"')}${C(-18,-60,5,'#3a3f48')}<path d="M20 -50V-80M11 -82H29" stroke="#c8d0da" stroke-width="6"/>${R(-48,-54,96,52,6,'#3a6aa0',L)}${R(-16,-36,32,18,3,'#ffcf4a')}`;
const batterie=()=>`${schatten(36,4)}${R(-12,-136,24,12,3,'#8a96a4',L2)}${R(-32,-126,64,124,10,'#4a5866',L)}${R(-22,-112,44,96,4,'#1e2a36')}${[0,1,2,3].map(k=>`<rect x="-16" y="${-38-k*22}" width="32" height="16" rx="2" fill="#7ad06a"${k>2?' opacity=".3"':''}/>`).join('')}`;
const bildschirm=()=>`${R(-6,-70,12,20,0,'#4a5866')}${R(-74,-52,148,100,10,'#1e2a36')}${R(-64,-42,128,80,4,'#0a2a3a')}${C(-34,-2,20,'#3fa0c8')}<path d="M-50 -8Q-40 -16 -30 -10Q-24 2 -38 6Z" fill="#7ad06a"/><path d="M-4 -24H50M-4 -8H40M-4 8H50M-4 24H30" stroke="#5ff0ff" stroke-width="4" stroke-linecap="round"/>`;
const anzug=()=>`${schatten(40,4)}<path d="M-26 0H26M0 0V-40" stroke="#4a5866" stroke-width="7" stroke-linecap="round"/>${R(-26,-92,22,56,8,'#f2f4f8',L)}${R(4,-92,22,56,8,'#f2f4f8',L)}${R(-28,-44,26,12,5,'#8a96a4')}${R(2,-44,26,12,5,'#8a96a4')}${R(-52,-146,18,58,9,'#f2f4f8',L)}${R(34,-146,18,58,9,'#f2f4f8',L)}${R(-34,-150,68,66,14,'#f2f4f8',L)}${R(-22,-136,20,14,3,'#e8763a')}${R(4,-134,20,18,3,'#5ff0ff')}<circle cy="-174" r="26" fill="#f2f4f8" ${L}/><path d="M-18 -178Q0 -194 18 -178Q18 -160 0 -158Q-18 -160 -18 -178Z" fill="#2a4a8a"/>`;
const kiste=()=>`${schatten(54,4)}${R(-50,-58,100,56,6,'#8a96a4',L)}${R(-54,-68,108,14,5,'#c8d0da',L)}<path d="M-30 -54V-2M30 -54V-2" stroke="#6a7684" stroke-width="5"/>${R(-18,-44,36,28,4,'#f2f4f8')}<circle cy="-28" r="8" fill="#ff7a6a"/><path d="M0 -36Q2 -42 6 -42" stroke="#2f8a4a" stroke-width="2.5" fill="none"/>`;
const mondgestein=()=>`${schatten(58,4)}<path d="M-52 0L-46 -30L-20 -44L10 -36L20 -14L52 0Z" fill="#a8a8b0" ${L}/><path d="M-20 -44L-14 -20L-46 -30M-14 -20L20 -14" stroke="#6a6a74" stroke-width="2" fill="none"/><path d="M26 -2L34 -30L46 -4Z" fill="#7ad0f0" ${L2}/>`;
const mondfahne=()=>`${schatten(40,4)}<path d="M-34 0Q0 -16 34 0Z" fill="#b8b8c0"/><path d="M0 -6V-190" stroke="#d8dce4" stroke-width="7" stroke-linecap="round"/>${R(2,-190,92,60,3,'#2a4a8a',L)}<use href="#sym-rakete" x="30" y="-186" width="36" height="52" color="#ffcf4a"/>`;
const mondauto=()=>`${schatten(76,4)}${C(-52,-14,16,'#3a3f48',L)}${C(52,-14,16,'#3a3f48',L)}${C(-52,-14,6,'#8a96a4')}${C(52,-14,6,'#8a96a4')}${R(-66,-62,132,38,8,'#e8eef8',L)}${R(-30,-86,56,28,8,'#5ff0ff',L)}<path d="M40 -62L56 -100" stroke="#4a5866" stroke-width="4"/>${C(58,-102,6,'#ff7a6a')}${R(-60,-50,32,14,3,'#e8763a')}`;
const antenne=()=>`${schatten(40,4)}<path d="M-26 0H26M0 0V-120" stroke="#8a96a4" stroke-width="8" stroke-linecap="round"/><path d="M-46 -150Q-10 -112 40 -140L30 -166Q-20 -150 -46 -150Z" fill="#f2f4f8" ${L}/><path d="M-4 -140L22 -190" stroke="#4a5866" stroke-width="5"/>${C(24,-194,7,'#ff7a6a')}`;
const messstation=()=>`<path d="M0 40V200M-22 200H22" stroke="#8a96a4" stroke-width="8" stroke-linecap="round"/>${R(-48,-44,96,84,8,'#e8eef8',L)}${R(-38,-34,76,40,4,'#0a2a3a')}<path d="M-30 -8l12 -10l10 8l12 -12l14 8" stroke="#7ad06a" stroke-width="3" fill="none"/>${C(-24,24,7,'#ff7a6a')}${C(0,24,7,'#ffcf4a')}${C(24,24,7,'#7ad06a')}`;
const kratertafel=()=>`<path d="M0 66V210M-24 210H24" stroke="#8a96a4" stroke-width="8" stroke-linecap="round"/>${R(-72,-62,144,128,6,'#2f3a48','stroke="#c8d0da" stroke-width="5"')}<ellipse cx="-14" cy="14" rx="44" ry="16" fill="none" stroke="#e8eef8" stroke-width="4"/><ellipse cx="34" cy="-18" rx="20" ry="8" fill="none" stroke="#e8eef8" stroke-width="3"/><path d="M-50 -40H10" stroke="#e8eef8" stroke-width="4" stroke-linecap="round"/>`;
const staubkiste=()=>`${schatten(56,4)}${R(-52,-58,104,56,6,'#8a96a4',L)}${R(-56,-68,112,14,5,'#c8d0da',L)}${[-30,0,30].map((x,k)=>`<rect x="${x-9}" y="-48" width="18" height="34" rx="6" fill="${['#a8a8b0','#c8b8a0','#8a98a8'][k]}" ${L2}/>`).join('')}`;
const mondfern=()=>`${schatten(44,4)}<path d="M0 -70L-36 0M0 -70L36 0M0 -70V0" stroke="#4a5866" stroke-width="6" stroke-linecap="round"/><g transform="rotate(-24 0 -76)">${R(-44,-88,88,20,8,'#f2f4f8',L)}${R(36,-94,20,32,5,'#2f8aa0',L)}</g>`;
const schlossPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=C(x0+k*22,y,8,'#0b1620','stroke="#5ff0ff" stroke-width="2"');return R(500-n*11-12,y-18,n*22+24,36,6,'#0b1620','stroke="#5ff0ff" stroke-width="2"')+d;};
const rakOben=(y,c)=>`<use href="#sym-rakete" x="476" y="${y}" width="48" height="48" color="${c||'#5ff0ff'}"/>`;
const TDEF=`<defs><pattern id="warn" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="24" height="24" fill="#f2c230"/><rect width="12" height="24" fill="#2a2a2a"/></pattern><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#8a96a4"/><stop offset=".5" stop-color="#c8d0da"/><stop offset="1" stop-color="#7a8694"/></linearGradient><radialGradient id="gangG"><stop offset="0" stop-color="#cfffff"/><stop offset="1" stop-color="#1a6a7a"/></radialGradient><linearGradient id="schG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfffff"/><stop offset="1" stop-color="#cfffff" stop-opacity="0"/></linearGradient><clipPath id="blclip"><circle cx="500" cy="340" r="118"/></clipPath><clipPath id="schclip"><rect x="384" y="216" width="232" height="254"/></clipPath></defs>`;
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out}.tuer .pb{transition:transform 1.5s ease-in-out}.tuer.offen .pb{transform:translate(var(--tx),var(--ty))}.tuer.offen #glL{transform:scaleX(.12)}.tuer.offen #glR{transform:scaleX(.12)}.tuer.offen #deck{transform:scaleY(.05)}.tuer.offen #sch{transform:translateX(250px)}.tuer .la{transition:fill 1s}.tuer.offen .la{fill:#7ad06a}.tuer.offen #luk{transform:scaleX(.12)}</style>`;
function tuerBlende(n){
const P=a=>`${(500+130*Math.sin(a*Math.PI/180)).toFixed(1)} ${(340-130*Math.cos(a*Math.PI/180)).toFixed(1)}`;let bl='';
for(let k=0;k<8;k++){const m=(k*45+22.5)*Math.PI/180;bl+=`<path class="pb" style="--tx:${(Math.sin(m)*150).toFixed(0)}px;--ty:${(-Math.cos(m)*150).toFixed(0)}px" d="M500 340L${P(k*45)}L${P(k*45+45)}Z" fill="${k%2?'#8a96a4':'#aab6c4'}" stroke="#1e2a36" stroke-width="3"/>`;}
return`${R(372,96,256,374,16,'url(#warn)','stroke="#1e2a36" stroke-width="5"')}${R(388,112,224,358,8,'#3a4450')}${C(500,340,128,'#2a3440','stroke="#1e2a36" stroke-width="4"')}${C(500,340,118,'url(#gangG)')}<g clip-path="url(#blclip)">${bl}${C(500,340,16,'#3a4450','stroke="#1e2a36" stroke-width="3"')}</g>${rakOben(118)}${schlossPl(n,192)}`;
}
function tuerGlas(n){
return`${R(396,126,208,36,8,'#8a96a4',L)}${R(404,160,192,300,22,'#e8ffe8','fill-opacity=".45" stroke="#8ab8a0" stroke-width="5"')}${R(396,448,208,26,6,'#8a96a4',L)}<path d="M440 440V380Q470 360 470 330Q440 340 440 380M560 440V390Q530 370 530 340Q560 350 560 390" fill="#7ad06a" stroke="#2f8a4a" stroke-width="3"/>
   <g id="glL" class="tb" style="transform-origin:404px 310px">${R(404,166,96,288,10,'#cfeaf4','fill-opacity=".55" stroke="#4a6a78" stroke-width="5"')}<path d="M404 250H500M404 360H500" stroke="#4a6a78" stroke-width="3"/>${R(486,290,8,60,4,'#8a96a4')}</g>
   <g id="glR" class="tb" style="transform-origin:596px 310px">${R(500,166,96,288,10,'#cfeaf4','fill-opacity=".55" stroke="#4a6a78" stroke-width="5"')}<path d="M500 250H596M500 360H596" stroke="#4a6a78" stroke-width="3"/>${R(506,290,8,60,4,'#8a96a4')}</g>
   ${rakOben(70)}${schlossPl(n,144)}`;
}
function tuerSchacht(n){
let st='';for(let y=64;y<470;y+=26)st+=`M470 ${y}H530`;
return`${R(424,36,152,434,14,'#8a96a4',L)}${R(436,48,128,422,0,'#0a1620')}${R(436,48,128,170,0,'url(#schG)','opacity=".7"')}<path d="M470 48V470M530 48V470" stroke="#c8d0da" stroke-width="6"/><path d="${st}" stroke="#c8d0da" stroke-width="5"/>
   <g id="deck" class="tb" style="transform-origin:500px 250px">${R(436,250,128,220,0,'url(#platteG)')}<path d="M436 330H564M436 410H564" stroke="#5a6674" stroke-width="3"/>${R(436,440,128,30,0,'url(#warn)')}${rakOben(258,'#2a4a8a')}${schlossPl(n,370)}</g>`;
}
function tuerSchleuse(n){
const lam=[475,500,525].map(x=>C(x,168,8,'#ff5a4a','class="la"')).join('');
let bo='';for(let k=0;k<12;k++){const a=k*Math.PI/6;bo+=C((500+Math.cos(a)*92).toFixed(0),(345+Math.sin(a)*92).toFixed(0),5,'#6a7684');}
return`${R(368,200,264,270,18,'url(#warn)','stroke="#1e2a36" stroke-width="5"')}${R(384,216,232,254,8,'#3a4450')}${C(500,345,112,'#05080c')}<path d="M400 392Q500 362 600 392V456H400Z" fill="#8a8a92"/>${sterne(420,250,160,100,7)}
   <g clip-path="url(#schclip)"><g id="sch" class="tb">${C(500,345,108,'url(#platteG)','stroke="#5a6674" stroke-width="8"')}${bo}${C(500,345,30,'none','stroke="#3a4450" stroke-width="8"')}<path d="M500 315V375M470 345H530M479 324L521 366M521 324L479 366" stroke="#3a4450" stroke-width="5"/>${rakOben(254,'#2a4a8a')}${schlossPl(n,412)}</g></g>
   ${R(446,148,108,40,8,'#0b1620','stroke="#5a6674" stroke-width="3"')}${lam}`;
}
function tuerKapsel(n){
return`<path d="M424 470L404 486M576 470L596 486" stroke="#8a96a4" stroke-width="8" stroke-linecap="round"/><ellipse cx="400" cy="488" rx="22" ry="6" fill="#6a7684"/><ellipse cx="600" cy="488" rx="22" ry="6" fill="#6a7684"/>
   <path d="M412 470L434 214Q500 120 566 214L588 470Z" fill="#eef1f5" ${L}/><path d="M418 430H582" stroke="#e8a030" stroke-width="14"/><path d="M436 230Q500 150 564 230" stroke="#c8d0da" stroke-width="6" fill="none"/>
   ${C(500,300,56,'#fff3b0','stroke="#1e2a36" stroke-width="4"')}<g id="luk" class="tb" style="transform-origin:444px 300px">${C(500,300,52,'#aab6c4','stroke="#1e2a36" stroke-width="4"')}<path d="M500 262V338M462 300H538" stroke="#6a7684" stroke-width="5"/>${C(500,300,12,'#6a7684')}</g>
   ${schlossPl(n,394)}`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'blende';
const arten={blende:[tuerBlende,'Blendenschott mit Zahlenschloss'],glas:[tuerGlas,'Glasschleuse mit Zahlenschloss'],schacht:[tuerSchacht,'Kletterröhre mit Zahlenschloss'],schleuse:[tuerSchleuse,'Luftschleuse mit Zahlenschloss'],kapsel:[tuerKapsel,'Kapsel-Luke mit Zahlenschloss']};
const a=arten[art]||arten.blende;
return`${TDEF}${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.raumschiff={
name:"Das Raumschiff",
symbole:["planet","rakete","stern","komet","mond"],
symbolNamen:["Planet","Rakete","Stern","Komet","Mond"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true">${C(60,45,42,'#16224a')}${sterne(28,14,64,62,12)}${C(88,64,12,'#3fa0c8')}<path d="M80 60Q86 56 92 60Q90 68 84 66Z" fill="#7ad06a"/><use href="#sym-rakete" x="30" y="12" width="60" height="64" color="#ffcf4a"/></svg>`,
texte:{
einleitung:"Ihr gehört zur Crew des Forschungsraumschiffs Polaris. Ihr wacht auf der Kommandobrücke auf – doch etwas stimmt nicht: Der Bordcomputer hat sich verrechnet und alle Schotts verriegelt! An jedem Schott hängt ein Zahlenschloss. Untersucht die Gegenstände an Bord. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zur Landekapsel?",
startKnopf:"Die Mission starten",
hinweisGeber:"Der Bordroboter piepst:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Der Bordroboter blinkt rot … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Schott",
schlossSymbol:"Über jedem Rad leuchtet ein Zeichen. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss piept – aber das Schott bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Der Countdown ist abgelaufen!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Landekapsel trotzdem noch erreichen!",
geschafft:"Kurs auf die Erde!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst, die Landekapsel auf dem Mond erreicht und fliegt nun nach Hause. Der Bordroboter piepst vor Freude!"
},
texteDu:{
einleitung:"Du gehörst zur Crew des Forschungsraumschiffs Polaris. Du wachst auf der Kommandobrücke auf – doch etwas stimmt nicht: Der Bordcomputer hat sich verrechnet und alle Schotts verriegelt! An jedem Schott hängt ein Zahlenschloss. Untersuche die Gegenstände an Bord. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zur Landekapsel?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Der Bordroboter blinkt rot … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad leuchtet ein Zeichen. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss piept – aber das Schott bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Landekapsel trotzdem noch erreichen!",
geschafft:"Kurs auf die Erde!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst, die Landekapsel auf dem Mond erreicht und fliegst nun nach Hause. Der Bordroboter piepst vor Freude!"
},
einfach:{
name:"Das Raumschiff",
symbolNamen:["Planet","Rakete","Stern","Sternschnuppe","Mond"],
texte:{
einleitung:"Ihr seid in einem Raumschiff. Das Raumschiff fliegt durch das Weltall. Plötzlich sind alle Wege zu! Der Computer hat sie zugesperrt. An jedem Weg hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende wartet eine Kapsel. Mit der Kapsel fliegt ihr nach Hause. Schafft ihr es bis zur Kapsel?",
hinweisGeber:"Der kleine Roboter piepst:",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
geschafft:"Ab nach Hause!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr fliegt mit der Kapsel nach Hause!"
},
texteDu:{
einleitung:"Du bist in einem Raumschiff. Das Raumschiff fliegt durch das Weltall. Plötzlich sind alle Wege zu! Der Computer hat sie zugesperrt. An jedem Weg hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende wartet eine Kapsel. Mit der Kapsel fliegst du nach Hause. Schaffst du es bis zur Kapsel?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Ab nach Hause!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du fliegst mit der Kapsel nach Hause!"
},
raeume:[
{titel:"Der Steuer-Raum",intro:"Von hier lenkt man das Raumschiff. Durch das große Fenster seht ihr einen Planeten. Findet die Zahlen für das runde Tor!",introDu:"Von hier lenkt man das Raumschiff. Durch das große Fenster siehst du einen Planeten. Finde die Zahlen für das runde Tor!",
objekte:[{name:"Tisch mit Knöpfen",fund:"Auf dem Tisch blinkt:"},{name:"Sessel",fund:"Im Sessel steckt:"},{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Leuchtende Kugel",fund:"In der Kugel leuchtet:"},{name:"Funkgerät",fund:"Aus dem Funkgerät kommt eine Nachricht:"}],
infoObjekte:[{name:"Bildschirm mit Weg",fund:"Auf dem Bildschirm steht:"},{name:"Dickes Buch",fund:"In dem Buch steht:"},{name:"Tisch mit Karte",fund:"Auf der Karte steht:"}]},
{titel:"Der Forscher-Raum",intro:"Hier forschen die Leute vom Raumschiff. In Röhren aus Glas wachsen Pflanzen. Alles ist hell und sauber.",
objekte:[{name:"Mikroskop",fund:"Unter dem Mikroskop liegt:"},{name:"Gläser mit Farbe",fund:"In einem Glas schwimmt:"},{name:"Waage",fund:"Auf der Waage liegt:"},{name:"Kühlschrank",fund:"Im Kühlschrank liegt:"},{name:"Tafel",fund:"Auf der Tafel steht:"}],
infoObjekte:[{name:"Bild mit Planeten",fund:"Unter dem Bild steht:"},{name:"Topf mit Blume",fund:"Am Schild im Topf steht:"},{name:"Kiste mit Steinen",fund:"In der Kiste liegt ein Zettel:"}]},
{titel:"Der Motor-Raum",intro:"Hier ist der Motor vom Raumschiff. Der Motor leuchtet hell. Er brummt laut. Überall sind Rohre.",
objekte:[{name:"Rad am Rohr",fund:"Am Rad hängt:"},{name:"Wagen mit Werkzeug",fund:"In einer Schublade liegt:"},{name:"Tank",fund:"Am Tank klebt:"},{name:"Kleiner Roboter",fund:"Der Roboter zeigt:"},{name:"Kasten mit Schaltern",fund:"Im Kasten blinkt:"}],
infoObjekte:[{name:"Tafel mit Zeigern",fund:"Auf der Tafel steht:"},{name:"Große Batterie",fund:"An der Batterie klebt ein Zettel:"},{name:"Kiste mit Schrauben",fund:"In der Kiste liegt ein Zettel:"}]},
{titel:"Die Schleuse",intro:"Hier ist die Schleuse. Sie führt nach draußen auf den Mond. Dort wartet die Kapsel. Findet die Zahlen für das Schloss!",introDu:"Hier ist die Schleuse. Sie führt nach draußen auf den Mond. Dort wartet die Kapsel. Finde die Zahlen für das Schloss!",
objekte:[{name:"Leiter",fund:"Oben auf der Leiter liegt:"},{name:"Stiefel",fund:"Im Stiefel steckt:"},{name:"Fallschirm",fund:"Im Fallschirm steckt:"},{name:"Ampel",fund:"Die Ampel leuchtet auf:"},{name:"Start-Knöpfe",fund:"Neben den Knöpfen leuchtet:"}],
infoObjekte:[{name:"Bildschirm",fund:"Auf dem Bildschirm steht:"},{name:"Raumanzug",fund:"In der Tasche steckt:"},{name:"Kiste mit Essen",fund:"In der Kiste liegt:"}]},
{titel:"Der Mond",intro:"Ihr seid auf dem Mond. Der Boden ist grau. Am Himmel seht ihr die Erde. Dort hinten steht die Kapsel. Findet die letzten Zahlen!",introDu:"Du bist auf dem Mond. Der Boden ist grau. Am Himmel siehst du die Erde. Dort hinten steht die Kapsel. Finde die letzten Zahlen!",
objekte:[{name:"Mond-Stein",fund:"Unter dem Stein liegt:"},{name:"Fahne mit Rakete",fund:"An der Stange hängt:"},{name:"Mond-Auto",fund:"Im Auto liegt:"},{name:"Antenne",fund:"An der Antenne klebt:"},{name:"Messgerät",fund:"Auf dem Gerät blinkt:"}],
infoObjekte:[{name:"Tafel mit Kratern",fund:"Auf der Tafel steht:"},{name:"Kiste mit Staub",fund:"In der Kiste liegt:"},{name:"Kleines Fernrohr",fund:"Im Fernrohr steckt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Kommandobrücke",
intro:"Auf der Kommandobrücke blinken Bildschirme und Pulte. Durch das große Panoramafenster seht ihr einen fremden Planeten. Von hier aus wird das Raumschiff gesteuert. Findet die Ziffern für das runde Blendenschott!",
introDu:"Auf der Kommandobrücke blinken Bildschirme und Pulte. Durch das große Panoramafenster siehst du einen fremden Planeten. Von hier aus wird das Raumschiff gesteuert. Finde die Ziffern für das runde Blendenschott!",
tuerX:800,tuerArt:"blende",
hintergrund:()=>`${defs('#2a4a5a','#0e1e28','#7ff0ff')}${wand('#1e4a5a','#163844','#5ff0ff')}<defs><clipPath id="pf"><rect x="76" y="86" width="528" height="238" rx="20"/></clipPath></defs>${R(60,70,560,270,30,'#2a3440',L)}${R(76,86,528,238,20,'#06102a')}<g clip-path="url(#pf)">${sterne(80,90,520,230,34)}${C(420,360,170,'#3fb0a0')}<path d="M290 290Q340 250 400 270Q430 300 380 320Q320 330 290 290ZM460 230Q520 220 560 260Q540 290 490 280Z" fill="#7ad06a"/><ellipse cx="420" cy="320" rx="260" ry="34" fill="none" stroke="#ffe0a0" stroke-width="8" opacity=".7" transform="rotate(-10 420 320)"/>${C(170,150,22,'#d8d0e8')}</g><path d="M250 86V324M430 86V324" stroke="#2a3440" stroke-width="10"/>${schirm(970,64,170,100,'#5ff0ff')}${schirm(1170,64,170,100,'#7ad06a')}${schirm(1370,64,160,100,'#ffcf4a')}${pultreihe(60,560)}${pultreihe(960,580)}${boden()}${leuchte(350)}${leuchte(1250)}`,
objekte:[
{name:"Steuerpult",x:420,boden:600,fuss:4,by:-150,zeichne:steuerpult,fund:"Auf dem Steuerpult blinkt:"},
{name:"Kommandosessel",x:1120,boden:610,fuss:4,by:-200,zeichne:sessel,fund:"In der Armlehne steckt:"},
{name:"Teleskop",x:1420,boden:700,fuss:4,by:-165,zeichne:teleskop,fund:"Im Teleskop steckt:"},
{name:"Hologramm-Globus",x:200,boden:720,fuss:4,by:-165,zeichne:holo,fund:"Im Hologramm leuchtet auf:"},
{name:"Funkgerät",x:1050,y:285,wand:true,by:-115,zeichne:funk,fund:"Aus dem Funkgerät kommt eine Nachricht:"}
],
infoObjekte:[{name:"Navigationsbildschirm",x:1350,y:285,wand:true,by:-75,zeichne:navi,fund:"Auf dem Navigationsbildschirm erscheint:"},{name:"Bordlogbuch",x:600,boden:740,fuss:4,by:-135,zeichne:logbuch,fund:"Im Bordlogbuch steht:"},{name:"Kartentisch",x:980,boden:740,fuss:4,by:-105,zeichne:kartentisch,fund:"Auf dem Kartentisch liegt:"}]},
{titel:"Das Labor",
intro:"Im Labor wachsen Pflanzen in leuchtenden Glasröhren. Ein Mikroskop und viele Reagenzgläser stehen bereit. Hier erforscht die Crew fremde Welten. Die Glasschleuse am Ausgang ist verriegelt.",
tuerX:220,tuerArt:"glas",
hintergrund:()=>`${defs('#c8d4cc','#7a8a80','#e8ffe0')}${wand('#eef4ee','#5ab46a','#c8ffd0')}${gitter(45,400,50,'rgba(0,80,40,.12)')}<rect y="330" width="1600" height="16" fill="#7ad06a"/>${roehre(1180)}${roehre(1300)}${roehre(1420)}${boden()}${leuchte(620)}${leuchte(1300)}`,
objekte:[
{name:"Mikroskop",x:480,boden:610,fuss:4,by:-200,zeichne:mikroskop,fund:"Unter dem Mikroskop liegt:"},
{name:"Reagenzglasständer",x:780,boden:720,fuss:4,by:-130,zeichne:reagenz,fund:"In einem Reagenzglas schwimmt:"},
{name:"Laborwaage",x:1000,boden:590,fuss:4,by:-115,zeichne:waage,fund:"Auf der Waage liegt:"},
{name:"Probenkühlschrank",x:1300,boden:700,fuss:4,by:-185,zeichne:kuehl,fund:"Im Kühlschrank liegt:"},
{name:"Forschungstafel",x:620,y:240,wand:true,by:-85,zeichne:tafel,fund:"Auf der Tafel steht:"}
],
infoObjekte:[{name:"Planetenplakat",x:900,y:240,wand:true,by:-75,zeichne:plakat,fund:"Unter dem Planetenplakat steht:"},{name:"Pflanzenbeet",x:1500,boden:600,fuss:4,by:-150,zeichne:beet,fund:"Auf dem Schild im Pflanzenbeet steht:"},{name:"Probenkiste",x:620,boden:745,fuss:4,by:-90,zeichne:proben,fund:"In der Probenkiste liegt:"}]},
{titel:"Der Maschinenraum",
intro:"Im Maschinenraum brummt der Reaktor. Sein Kern leuchtet in einer hohen Säule. Rohre zischen leise, und überall blinken Lämpchen. Eine Kletterröhre führt nach oben, doch eine Klappe versperrt sie.",
tuerX:1350,tuerArt:"schacht",
hintergrund:()=>`${defs('#5a3a2a','#24140c','#ffb060')}${wand('#8a3e22','#5a2414','#ffb060')}${rohre([480,1150])}${kern(700)}<rect y="452" width="1600" height="14" fill="url(#warn)" opacity=".8"/>${boden()}`,
objekte:[
{name:"Rohrventil",x:220,boden:690,fuss:4,by:-165,zeichne:ventil,fund:"Am Ventil hängt:"},
{name:"Werkzeugwagen",x:480,boden:610,fuss:4,by:-145,zeichne:wwagen,fund:"In einer Schublade liegt:"},
{name:"Treibstofftank",x:1020,boden:580,fuss:4,by:-195,zeichne:tank,fund:"Am Tank klebt:"},
{name:"Reparaturroboter",x:820,boden:720,fuss:4,by:-160,zeichne:roboter,fund:"Der Roboter zeigt auf seinem Bildschirm:"},
{name:"Schaltkasten",x:300,y:250,wand:true,by:-90,zeichne:schaltkasten,fund:"Im Schaltkasten blinkt:"}
],
infoObjekte:[{name:"Anzeigetafel",x:950,y:250,wand:true,by:-75,zeichne:anzeige,fund:"Auf der Anzeigetafel steht:"},{name:"Batterie",x:1530,boden:700,fuss:4,by:-160,zeichne:batterie,fund:"An der Batterie klebt:"},{name:"Ersatzteilkiste",x:1170,boden:745,fuss:4,by:-110,zeichne:teile,fund:"In der Ersatzteilkiste liegt:"}]},
{titel:"Die Andockbucht",
intro:"In der Andockbucht ist es still. Durch die große Luke seht ihr schon die Erde. Die Luftschleuse führt hinaus auf den Mond, wo die Landekapsel wartet. Findet die Ziffern für das Schleusen-Schloss!",
introDu:"In der Andockbucht ist es still. Durch die große Luke siehst du schon die Erde. Die Luftschleuse führt hinaus auf den Mond, wo die Landekapsel wartet. Finde die Ziffern für das Schleusen-Schloss!",
tuerX:800,tuerArt:"schleuse",
hintergrund:()=>`${defs('#7a8088','#30343a','#e8eef8')}${wand('#7a828c','#4a525c','#e8eef8')}${R(1130,70,400,200,20,'#06102a','stroke="#3a4450" stroke-width="14"')}${sterne(1150,85,360,170,22)}${C(1450,200,40,'#3f8fd8')}<path d="M1424 186Q1440 172 1456 184Q1452 204 1434 206ZM1462 214Q1476 206 1484 218Q1474 232 1462 226Z" fill="#7ad06a"/>${boden()}<path d="M0 560H1600" stroke="#e8b830" stroke-width="6" stroke-dasharray="40 30" opacity=".7"/>${leuchte(800)}${leuchte(1300)}`,
objekte:[
{name:"Wandleiter",x:560,boden:600,fuss:4,by:-240,zeichne:leiter,fund:"Auf der obersten Stufe liegt:"},
{name:"Gravitationsstiefel",x:1000,boden:700,fuss:4,by:-105,zeichne:stiefel,fund:"In einem Stiefel steckt:"},
{name:"Fallschirm-Paket",x:1250,boden:600,fuss:4,by:-135,zeichne:fallschirm,fund:"Im Fallschirm-Paket steckt:"},
{name:"Startampel",x:1500,boden:560,fuss:4,by:-215,zeichne:ampel,fund:"Die Startampel leuchtet auf:"},
{name:"Schleusenkonsole",x:1030,y:300,wand:true,by:-80,zeichne:konsole,fund:"Auf der Schleusenkonsole leuchtet:"}
],
infoObjekte:[{name:"Infobildschirm",x:560,y:250,wand:true,by:-95,zeichne:bildschirm,fund:"Auf dem Bildschirm erscheint:"},{name:"Raumanzug",x:120,boden:720,fuss:4,by:-225,zeichne:anzug,fund:"In der Tasche des Raumanzugs steckt:"},{name:"Vorratskiste",x:1300,boden:745,fuss:4,by:-90,zeichne:kiste,fund:"In der Vorratskiste liegt:"}]},
{titel:"Die Mondoberfläche",
intro:"Ihr steht auf der Mondoberfläche! Der Boden ist grau und staubig, am schwarzen Himmel leuchtet die Erde. Dort hinten wartet die Landekapsel. Findet die Ziffern für das letzte Schloss an der Luke!",
introDu:"Du stehst auf der Mondoberfläche! Der Boden ist grau und staubig, am schwarzen Himmel leuchtet die Erde. Dort hinten wartet die Landekapsel. Finde die Ziffern für das letzte Schloss an der Luke!",
tuerX:1300,tuerArt:"kapsel",
hintergrund:()=>`${defs('#9a9aa2','#3e3e46','#ffffff')}${R(0,0,1600,470,0,'#05060e')}${sterne(0,0,1600,380,90)}${C(260,170,120,'#3f8fd8','stroke="#8fd0ff" stroke-width="6" stroke-opacity=".5"')}<path d="M190 120Q230 90 270 110Q290 150 250 170Q210 170 190 120ZM250 200Q300 190 330 230Q310 270 270 250Z" fill="#7ad06a"/><path d="M180 200Q220 180 260 190" stroke="#fff" stroke-width="10" opacity=".5" stroke-linecap="round" fill="none"/><path d="M0 400Q200 340 420 390T800 380T1200 360T1600 395V470H0Z" fill="#6a6a72"/><polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>${[[250,560,110,24],[760,650,150,30],[1100,520,90,18],[1450,700,130,26],[520,740,100,20]].map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="rgba(0,0,0,.28)" stroke="rgba(255,255,255,.2)" stroke-width="4"/>`).join('')}`,
objekte:[
{name:"Mondgestein",x:300,boden:600,fuss:4,by:-50,zeichne:mondgestein,fund:"Unter dem Mondgestein liegt:"},
{name:"Fahne mit Rakete",x:600,boden:700,fuss:4,by:-200,zeichne:mondfahne,fund:"An der Fahnenstange hängt:"},
{name:"Mondauto",x:900,boden:640,fuss:4,by:-105,zeichne:mondauto,fund:"Im Mondauto liegt:"},
{name:"Funkantenne",x:150,boden:740,fuss:4,by:-200,zeichne:antenne,fund:"An der Funkantenne klebt:"},
{name:"Messstation",x:1000,y:230,wand:true,by:-55,zeichne:messstation,fund:"Auf der Messstation blinkt:"}
],
infoObjekte:[{name:"Krater-Tafel",x:440,y:240,wand:true,by:-70,zeichne:kratertafel,fund:"Auf der Krater-Tafel steht:"},{name:"Mondstaub-Kiste",x:1500,boden:600,fuss:4,by:-75,zeichne:staubkiste,fund:"In der Mondstaub-Kiste liegt:"},{name:"Mond-Fernrohr",x:780,boden:540,fuss:4,by:-110,zeichne:mondfern,fund:"Im Mond-Fernrohr steckt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><radialGradient id="erdeG" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#6ab8f0"/><stop offset="1" stop-color="#1a4a9a"/></radialGradient></defs>
   <rect width="1000" height="600" fill="#05060e"/>${sterne(0,0,1000,600,80)}
   ${C(640,330,170,'url(#erdeG)','stroke="#8fd0ff" stroke-width="8" stroke-opacity=".5"')}<path d="M560 250Q610 210 670 240Q700 290 650 320Q590 330 560 250ZM660 360Q720 340 770 390Q740 450 680 430Z" fill="#7ad06a"/><path d="M520 300Q580 280 640 290M600 380Q680 400 740 350" stroke="#fff" stroke-width="12" opacity=".6" stroke-linecap="round" fill="none"/>
   ${C(140,560,230,'#8a8a92')}${[[100,420,30],[200,480,22],[80,520,18]].map(([x,y,r])=>C(x,y,r,'rgba(0,0,0,.25)')).join('')}
   <g transform="translate(330 250) rotate(-35)"><path d="M-20 40Q0 130 20 40Z" fill="#ffb030"/><path d="M-10 40Q0 90 10 40Z" fill="#fff3b0"/><path d="M-26 40L-30 0Q0 -90 30 0L26 40Z" fill="#eef1f5" stroke="#1e2a36" stroke-width="3"/><path d="M-27 22H27" stroke="#e8a030" stroke-width="8"/><circle cy="-14" r="11" fill="#5ff0ff" stroke="#1e2a36" stroke-width="3"/></g>
   <path d="M0 0H1000V600H0Z M500 330 m-290 0 a290 290 0 1 0 580 0 a290 290 0 1 0 -580 0" fill="#2a3038" fill-rule="evenodd"/><circle cx="500" cy="330" r="290" fill="none" stroke="url(#warn)" stroke-width="22"/>${R(420,10,160,10,5,'#5ff0ff')}`
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
   RAUMSCHIFF in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei raumschiff-raum<n>.js, die sich in RAEUME3D.raumschiff[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, verschmelze, bild, schein, mat, basis, GEO, V,
   zufall, textSprite, laeufer, flacker, ausgang.
   =================================================================== */
RAEUME3D.raumschiff = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen */
const NEU=[
  [['Trinkautomat','Aus dem Trinkautomaten kommt:','Automat für Getränke','Im Automaten steckt:'],['Sternenlampe','An der Sternenlampe klebt:','Lampe mit Stern','An der Lampe klebt:']],
  [['Algenbecken','Im Algenbecken schwimmt:','Becken mit Wasserpflanzen','Im Becken schwimmt:'],['Forschercomputer','Auf dem Forschercomputer erscheint:','Rechner','Auf dem Rechner steht:']],
  [['Zahnrad','Hinter dem Zahnrad steckt:','Großes Rad mit Zacken','Hinter dem Rad steckt:'],['Feuerlöscher','Am Feuerlöscher hängt:','Rote Flasche zum Löschen','An der Flasche hängt:']],
  [['Sportrad','Am Sportrad klebt:','Rad zum Üben','Am Rad klebt:'],['Schlafsack','Im Schlafsack steckt:','Sack zum Schlafen','Im Sack steckt:']],
  [['Kuppelzelt','Im Kuppelzelt liegt:','Rundes Zelt','Im Zelt liegt:'],['Sonnenplatte','Unter der Sonnenplatte liegt:','Platte für Strom aus Sonne','Unter der Platte liegt:']]
];
const SZR=SZENARIEN.raumschiff;
/* Einfache Einleitungen: den Ausgang nennen */
if(SZR.einfach) [[1,'Der Ausgang ist die Tür aus Glas.'],[2,'Der Ausgang ist die Röhre mit der Leiter.'],[3,'Der Ausgang ist das große Tor.']].forEach(([i,satz])=>{ const r=SZR.einfach.raeume[i]; ['intro','introDu'].forEach(k=>{ if(r[k] && r[k].indexOf(satz)<0) r[k]=r[k]+' '+satz; }); });
/* Der Reparaturroboter ist in 3D der große stehende, daneben fahren kleine */
if(SZR.einfach) SZR.einfach.raeume[2].objekte.forEach(o=>{ if(o.name==='Kleiner Roboter') o.name='Großer Roboter'; });
/* Das Pflanzenbeet ist in 3D ein eckiger Kasten: passenderer einfacher Name */
if(SZR.einfach) SZR.einfach.raeume[1].infoObjekte.forEach(o=>{ if(o.name==='Topf mit Blume') { o.name='Beet mit Blumen'; o.fund='Am Schild im Beet steht:'; } });
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZR.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZR.einfach) SZR.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const WELTRAUM = (function(){
const METALL=0xb8c4d4, METALL2=0x6c7890, DUNKEL=0x2a3248, WEISS=0xf0f4fa, BLAU=0x3f8ce0, TUERKIS=0x38d0d0, ORANGE=0xf08a2a, ROT=0xe0443a, GELB=0xffd23a, GRUEN=0x58d868, GOLD=0xd8a73a, MOND=0xa8a8b0;

/* Wand-Bild aus Metallplatten mit Nieten (Kachel passt nahtlos). grund = [r,g,b] */
function plattenBild(grund){
  const G=grund||[96,110,138], f=h=>'rgb('+(G[0]+h)+','+(G[1]+h)+','+(G[2]+h)+')';
  return bild(512,512,(g)=>{
    g.fillStyle=f(-42); g.fillRect(0,0,512,512);
    for(let r=0;r<2;r++) for(let i=0;i<2;i++){ const x=i*256, y=r*256, h=Math.floor(zufall()*14)-7;
      g.fillStyle=f(h); g.fillRect(x+4,y+4,248,248); g.fillStyle='rgba(255,255,255,.13)'; g.fillRect(x+4,y+4,248,8); g.fillStyle='rgba(0,0,0,.18)'; g.fillRect(x+4,y+236,248,16);
      g.fillStyle=f(h-26); [[20,20],[232,20],[20,220],[232,220]].forEach(p=>{ g.beginPath(); g.arc(x+p[0],y+p[1],6,0,7); g.fill(); });
      if((r+i)%2){ g.fillStyle=f(h-14); for(let k=0;k<4;k++) g.fillRect(x+72,y+88+k*26,112,10); } }
  });
}
/* Wandstück mit gekacheltem Bild (Kachel 4,4 breit und hoch) */
function wandStueck(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const quer=Math.max(w,d); t.repeat.set(quer/4.4,h/4.4); t.offset.set(((w>d?x-w/2:z-d/2)/4.4)%1,((y-h/2)/4.4)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* Raumhülle für Räume IM Raumschiff: Licht, Metallboden, Wände (hinten, links, rechts), Streben, Leuchtleisten, niedriger Fußsockel.
   Passend dazu in der Raum-Datei: oben: WELTRAUM.OBEN (Farbverlauf über den Wänden).
   opt: B,T,H, himmel, grund, staerke (Grundlicht), sonne, sonneStaerke, wand [r,g,b], boden [r,g,b], strebe (Farbe), leuchte (Farbe der Leisten),
        streben [z-Werte an den Seitenwänden], pfosten [x-Werte an der Rückwand], oeffnung {x,b,h} (Loch in der Rückwand, optional) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6;
  sc.background=new THREE.Color(0x070a14);
  sc.add(new THREE.HemisphereLight(opt.himmel||0xe0ecff,opt.grund||0x48506a,opt.staerke||.85));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xdce8ff,opt.sonneStaerke||.4); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const bt=plattenBild(opt.boden||[104,114,134]); bt.wrapS=bt.wrapT=THREE.RepeatWrapping; bt.repeat.set(B/7,T/7);
  const bm=new THREE.Mesh(new THREE.PlaneGeometry(B,T,72,54),new THREE.MeshLambertMaterial({map:bt})); bm.rotation.x=-Math.PI/2; bm.receiveShadow=true; sc.add(bm);
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x0c1020)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);
  const tex=plattenBild(opt.wand||[96,110,138]), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    wandStueck(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); wandStueck(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); if(H-o.h>.01) wandStueck(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else wandStueck(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  wandStueck(links,tex,.5,H,T,-B/2-.25,H/2,0); wandStueck(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.strebe||METALL2, licht=basis(opt.leuchte||0x70e8ff), s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  box(s[0],B+1,.34,.7,f,0,H+.12,-T/2-.2);
  (opt.pfosten||[-13,-6.5,6.5,13]).forEach(x=>{ box(s[0],.6,H,.3,f,x,H/2,-T/2+.15); box(s[0],.9,.3,.5,f,x,H-.15,-T/2+.2); box(s[0],.9,.4,.5,f,x,.2,-T/2+.2); box(s[0],.1,H-1.4,.04,licht,x,H/2,-T/2+.32); });
  [-1,1].forEach((v,i)=>{ const w=s[i+1]; box(w,.2,.28,T,f,v*(B/2-.07),.14,0); box(w,.7,.34,T+1,f,v*(B/2+.2),H+.12,0); box(w,.06,.08,T-1,licht,v*(B/2-.03),H-.7,0);
    (opt.streben||[-9,-3,3,9]).forEach(z=>{ box(w,.34,H,.6,f,v*(B/2-.17),H/2,z); const a=box(w,.3,1.5,.55,f,v*(B/2-.55),H-.55,z); a.rotation.z=v*.7; }); });
  s.forEach(verschmelze);
  const fuss=gruppe(sc,0,0,0); [-1,1].forEach(v=>{ for(let z=-T/2+.6;z<T/2;z+=1.2) box(fuss,.42,.36+(Math.abs(Math.round(z*7))%3)*.03,1.12,f,v*(B/2+.27),.18,z); }); verschmelze(fuss);
  return { sc, B, T, H, hinten, links, rechts };
}
const OBEN=['7,10,20','22,30,54','52,64,96'];

/* Bewegter Bildschirm (Fläche mit Rahmen), Blick nach +z. art: 'kurve' | 'radar' | 'balken' | 'punkte'. Keine Schrift. */
function bildschirm(par,k,w,h,x,y,z,art,farbe){
  const g=gruppe(par,x,y,z), c=document.createElement('canvas'); c.width=128; c.height=Math.max(32,Math.round(128*h/w)); const p=c.getContext('2d'), t=new THREE.CanvasTexture(c); t.minFilter=THREE.LinearFilter;
  box(g,w+.18,h+.18,.08,DUNKEL,0,0,-.05);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t})); m.position.z=.002; g.add(m);
  const F=farbe||'#5ef0c0', H0=c.height; let letzt=-1;
  const mal=zt=>{ p.fillStyle='#0a1830'; p.fillRect(0,0,128,H0); p.strokeStyle=F; p.fillStyle=F; p.lineWidth=3;
    if(art==='radar'){ const r=H0*.42; p.lineWidth=1.5; [1,.66,.33].forEach(a=>{ p.beginPath(); p.arc(64,H0/2,r*a,0,7); p.stroke(); }); p.lineWidth=3; p.beginPath(); p.moveTo(64,H0/2); p.lineTo(64+Math.cos(zt*2)*r,H0/2+Math.sin(zt*2)*r); p.stroke(); p.beginPath(); p.arc(64+r*.5,H0/2-r*.3,3,0,7); p.fill(); }
    else if(art==='balken'){ for(let i=0;i<7;i++){ const a=(.35+.3*Math.sin(zt*1.7+i*1.3))*H0; p.fillRect(8+i*17,H0-6-a,11,a); } }
    else if(art==='punkte'){ for(let i=0;i<22;i++){ p.globalAlpha=.35+.65*Math.abs(Math.sin(zt*1.4+i)); p.beginPath(); p.arc((i*47)%118+5,(i*29)%(H0-10)+5,2+(i%3),0,7); p.fill(); } p.globalAlpha=1; }
    else { p.beginPath(); for(let i=0;i<=128;i+=4){ const yy=H0/2+Math.sin(i*.11+zt*3)*H0*.22+Math.sin(i*.31+zt*5)*H0*.1; i?p.lineTo(i,yy):p.moveTo(i,yy); } p.stroke(); }
    t.needsUpdate=true; };
  mal(0);
  k.anim.push(zt=>{ const n=Math.floor(zt*6); if(n!==letzt){ letzt=n; mal(zt+x); } });
  return g;
}
/* Sternenhimmel-Bild */
function sternBild(w,h,anzahl){
  return bild(w||512,h||256,(g,W,H)=>{ g.fillStyle='#050818'; g.fillRect(0,0,W,H);
    for(let i=0;i<(anzahl||220);i++){ const r=zufall()<.08?2.2:1; g.fillStyle=['#ffffff','#bcd8ff','#ffe8b0'][i%3]; g.beginPath(); g.arc(zufall()*W,zufall()*H,r,0,7); g.fill(); } });
}
/* Großes Fenster ins Weltall (Rahmen + Sterne). In eine Wandgruppe, Blick nach +z. Planet davor mit planet() */
function weltfenster(par,w,h,x,y,z){
  const g=gruppe(par,x,y,z);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:sternBild(1024,Math.round(1024*h/w),260)})); m.position.z=.02; g.add(m);
  [-1,1].forEach(s=>{ box(g,w+.4,.22,.2,METALL,0,s*(h/2+.08),.1); box(g,.22,h+.4,.2,METALL,s*(w/2+.08),0,.1); });
  return g;
}
/* Planet als Kugel mit gemaltem Muster. art: 'erde' | 'gas' | 'rot'. Dreht sich langsam. */
function planet(par,k,r,x,y,z,art){
  const t=bild(256,128,(g)=>{ const F={erde:['#2f78d0','#5ac060','#ffffff'],gas:['#e8a860','#c86840','#f8d8a0'],rot:['#c85038','#8a3428','#e89870']}[art||'erde'];
    g.fillStyle=F[0]; g.fillRect(0,0,256,128);
    if(art==='gas'){ for(let i=0;i<9;i++){ g.fillStyle=F[1+i%2]; g.fillRect(0,8+i*13,256,5+(i%3)*2); } }
    else { for(let i=0;i<26;i++){ g.fillStyle=F[1]; g.beginPath(); g.ellipse((i*67)%256,22+(i*41)%84,8+(i*13)%20,5+(i*7)%12,i,0,7); g.fill(); }
      g.fillStyle=F[2]; if(art!=='rot') for(let i=0;i<14;i++){ g.globalAlpha=.7; g.beginPath(); g.ellipse((i*97)%256,12+(i*53)%104,16,3,0,0,7); g.fill(); } g.globalAlpha=1; g.fillRect(0,0,256,6); g.fillRect(0,122,256,6); } });
  const m=new THREE.Mesh(new THREE.SphereGeometry(r,32,22),new THREE.MeshLambertMaterial({map:t,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.25})); m.position.set(x,y,z); par.add(m);
  k.anim.push(zt=>{ m.rotation.y=zt*.08; });
  return m;
}
/* Kleiner freundlicher Bordroboter auf Rädern, fährt einen Rundweg (Punkte wie bei laeufer; nicht durch feste Dinge legen) */
function roboter(k,punkte,tempo,start,farbe){
  const g=gruppe(k.scene,0,0,0), q=gruppe(g,0,0,0); q.rotation.y=Math.PI/2; const r=gruppe(q,0,0,0), F=farbe||WEISS;
  [-1,1].forEach(s=>{ const w=walze(r,.17,.14,DUNKEL,s*.3,.17,0); w.rotation.z=Math.PI/2; });
  rohr(r,.24,.34,.5,F,0,.55,0); ball(r,.3,F,0,.98,0,1,.85,.95); box(r,.4,.2,.08,DUNKEL,0,1,.25);
  [-1,1].forEach(s=>{ ball(r,.05,basis(0x70f0ff),s*.1,1.01,.3); strich(r,[s*.3,.66,0],[s*.46,.42,.1],.05,METALL2); ball(r,.08,ORANGE,s*.47,.4,.11); });
  strich(r,[0,1.2,0],[0,1.42,0],.02,METALL2); ball(r,.06,basis(0xff6a4a),0,1.45,0); ball(r,.08,TUERKIS,0,.6,.28);
  verschmelze(r);
  laeufer(k,g,punkte,tempo||1,start||0,4);
  return g;
}
/* Schwebende Messdrohne, fliegt Kreise */
function drohne(k,cx,cz,r,h,tempo,start){
  const g=gruppe(k.scene,cx,h,cz), q=gruppe(g,0,0,0);
  ball(q,.25,WEISS,0,0,0,1,.75,1); ball(q,.1,basis(0x70f0ff),.22,0,0); const rg=ring(q,.42,.035,ORANGE,0,0,0); rg.rotation.x=Math.PI/2; ball(q,.06,basis(0xffd23a),0,.22,0); [-1,1].forEach(s=>strich(q,[0,0,s*.2],[0,0,s*.42],.025,METALL2)); verschmelze(q);
  g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
  k.anim.push(t=>{ const a=t*(tempo||.5)+(start||0); g.position.set(cx+Math.cos(a)*r,h+Math.sin(t*2+(start||0))*.2,cz+Math.sin(a)*r); g.rotation.y=-a-Math.PI/2; });
  return g;
}
/* Zahlenschloss (golden, drei Felder), Blick nach +z */
function zahlenschloss(par,x,y,z){
  const g=gruppe(par,x,y,z); box(g,.85,.62,.22,GOLD,0,0,0); ring(g,.26,.075,0x9aa3ad,0,.31,0,Math.PI); [-.24,0,.24].forEach(v=>{ box(g,.19,.28,.04,0xfff3cf,v,-.02,.12); box(g,.045,.15,.02,0x2a1a08,v,-.02,.15); });
  return g;
}
return { METALL, METALL2, DUNKEL, WEISS, BLAU, TUERKIS, ORANGE, ROT, GELB, GRUEN, GOLD, MOND, OBEN, plattenBild, wandStueck, huelle, bildschirm, sternBild, weltfenster, planet, roboter, drohne, zahlenschloss };
})();

/* Raum 1: Die Kommandobrücke. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: rundes Blendenschott in der Rückwand, die Lamellen drehen sich auf wie eine Kamerablende. */
RAEUME3D.raumschiff[0] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, BLAU, TUERKIS, ORANGE, ROT, GELB, GRUEN, GOLD } = WELTRAUM;
const PETROL=0x2f7488, PETROL2=0x1e4a5c, DUNKEL2=0x151c2e, HELL=0xd8e2ee, LILA=0x8a6ad8;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* leuchtende Teile (ohne Schatten) */
const lampe=(p,r,c,x,y,z)=>{ const t=ball(p,r,basis(c),x,y,z); t.castShadow=false; return t; };
const feld=(p,w,h,d,c,x,y,z)=>{ const t=box(p,w,h,d,basis(c),x,y,z); t.castShadow=false; return t; };
/* flache Fläche mit gemaltem Bild */
const tafel=(p,tex,w,h,x,y,z)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex})); m.position.set(x,y,z); p.add(m); return m; };

/* ---------- Ausgang: Blendenschott ---------- */
const TX=2, TY=1.95, TR=1.9;
function baueSchott(k,sc,hinten){
  const Z=-13.5;
  /* heller Gang dahinter */
  const gang=gruppe(hinten,TX,0,0);
  box(gang,4.4,.1,3.9,0x8a9ab4,0,-.045,-15.45);
  [-1,1].forEach(s=>{ box(gang,.2,4.3,3.6,HELL,s*2.2,2.1,-15.6); [.5,2.0,3.4].forEach(y=>feld(gang,.06,.12,3.4,0x70e8ff,s*2.07,y,-15.6));
    feld(gang,.14,.03,3.6,0xffffff,s*1.2,.03,-15.5); [-14.5,-15.7,-16.9].forEach(z=>box(gang,.34,4.2,.18,METALL2,s*2.0,2.1,z)); });
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,140,6,128,128,180); v.addColorStop(0,'#ffffff'); v.addColorStop(.45,'#bff8ff'); v.addColorStop(1,'#2a8aa8'); g.fillStyle=v; g.fillRect(0,0,256,256);
    g.strokeStyle='rgba(255,255,255,.85)'; g.lineWidth=5; [40,72,108].forEach(r=>g.strokeRect(128-r,140-r,r*2,r*1.8)); });
  tafel(gang,ende,4.3,4.3,0,2.1,-17.45);
  verschmelze(gang); gang.visible=false;
  /* Wandplatte mit rundem Loch */
  const form=new THREE.Shape(); form.moveTo(-2.35,-.05); form.lineTo(2.35,-.05); form.lineTo(2.35,4.3); form.lineTo(-2.35,4.3); form.lineTo(-2.35,-.05);
  const loch=new THREE.Path(); loch.absarc(0,TY,TR,0,Math.PI*2,true); form.holes.push(loch);
  const platte=new THREE.Mesh(new THREE.ShapeGeometry(form,40),mat(0x3a4660)); platte.position.set(TX,0,Z+.012); platte.receiveShadow=true; hinten.add(platte);
  /* dicker Rahmen mit Warnstreifen und Bolzen */
  const rahmen=gruppe(hinten,TX,TY,Z+.25);
  ring(rahmen,2.12,.24,METALL,0,0,0);
  for(let i=0;i<28;i++){ const s=ring(rahmen,2.39,.065,i%2?0x232830:GELB,0,0,-.08,Math.PI*2/28+.01); s.rotation.z=i*Math.PI*2/28; }
  for(let i=0;i<12;i++){ const a=i*Math.PI/6+.26, y=Math.sin(a)*2.12; if(y>-1.8) ball(rahmen,.1,METALL2,Math.cos(a)*2.12,y,.22,1,1,.6); }
  verschmelze(rahmen);
  /* acht Lamellen: außen am Rahmen, innen wandert die Spitze gedreht nach außen */
  const lam=[], N=8, S=5, D=Math.PI*2/N;
  for(let i=0;i<N;i++){
    const geo=new THREE.BufferGeometry(), pos=new Float32Array((S+1)*2*3), nor=new Float32Array((S+1)*2*3), idx=[];
    for(let j=0;j<=S;j++){ nor[j*6+2]=1; nor[j*6+5]=1; if(j<S){ const a=j*2; idx.push(a,a+1,a+2, a+2,a+1,a+3); } }
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3)); geo.setAttribute('normal',new THREE.BufferAttribute(nor,3)); geo.setIndex(idx);
    const m=new THREE.Mesh(geo,mat(i%2?0x8796ae:0xb4c2d6,{side:THREE.DoubleSide})); m.position.set(TX,TY,Z+.14); m.frustumCulled=false; hinten.add(m);
    const kante=box(hinten,1,.06,.05,0x2a3248,TX,TY,Z+.17); kante.castShadow=false;
    lam.push({geo,m,kante});
  }
  const nabe=gruppe(hinten,TX,TY,Z+.18);
  const n1=walze(nabe,.36,.12,DUNKEL,0,0,.02); n1.rotation.x=Math.PI/2; ring(nabe,.36,.05,GOLD,0,0,.08); lampe(nabe,.15,0x70f0ff,0,0,.09);
  verschmelze(nabe);
  const stellen=(auf)=>{
    const r=TR*Math.min(1,auf*1.04), tw=auf*1.35;
    lam.forEach((l,i)=>{ const p=l.geo.attributes.position, a0=i*D;
      for(let j=0;j<=S;j++){ const a=a0+D*j/S, b=a+tw; p.setXYZ(j*2,Math.cos(a)*TR,Math.sin(a)*TR,0); p.setXYZ(j*2+1,Math.cos(b)*r,Math.sin(b)*r,0); }
      p.needsUpdate=true; l.geo.computeBoundingSphere();
      const ax=Math.cos(a0)*TR, ay=Math.sin(a0)*TR, bx=Math.cos(a0+tw)*r, by=Math.sin(a0+tw)*r, len=Math.hypot(bx-ax,by-ay);
      l.kante.position.x=TX+(ax+bx)/2; l.kante.position.y=TY+(ay+by)/2; l.kante.rotation.z=Math.atan2(by-ay,bx-ax); l.kante.scale.x=Math.max(.001,len);
      l.m.visible=l.kante.visible=auf<.96; });
    nabe.visible=auf<.06; const s=Math.max(.01,1-auf*14); nabe.scale.set(s,s,s);
  };
  stellen(0);
  /* drei Lampen über dem Rahmen: rot, bei offenem Ausgang grün */
  const lm=basis(0xff5a4a);
  const bruecke=gruppe(hinten,TX,0,Z+.5); box(bruecke,1.5,.34,.16,DUNKEL,0,4.18,0); verschmelze(bruecke);
  const ampeln=gruppe(hinten,0,0,0); [-.45,0,.45].forEach(x=>{ const t=ball(ampeln,.11,lm,TX+x,4.18,Z+.6); t.castShadow=false; }); verschmelze(ampeln);
  /* Zahlenschloss auf einem Sockel rechts neben dem Rahmen */
  const pult=gruppe(hinten,5.0,0,Z);
  box(pult,.34,1.7,.22,METALL2,0,.85,.12); box(pult,.7,.16,.42,DUNKEL,0,.08,.2); box(pult,1.02,.86,.1,DUNKEL,0,2.12,.08);
  [-1,1].forEach(s=>feld(pult,.06,.7,.04,0x70e8ff,s*.46,2.12,.15));
  verschmelze(pult);
  const schloss=WELTRAUM.zahlenschloss(hinten,5.0,2.08,Z+.24); verschmelze(schloss);
  /* Schwelle mit Leuchtstreifen */
  const schwelle=gruppe(sc,TX,0,-12.5);
  [-1,1].forEach(s=>{ feld(schwelle,.12,.02,1.5,0xffd23a,s*1.5,.018,.2); });
  [0,1,2].forEach(i=>{ [-1,1].forEach(s=>{ const a=feld(schwelle,.5,.018,.12,0x70e8ff,s*.2,.02,-.1+i*.45); a.rotation.y=s*.65; }); });
  verschmelze(schwelle);
  const licht=new THREE.PointLight(0xc8f8ff,0,13,1.5); licht.position.set(TX,2.6,-14.6); sc.add(licht);
  k.kasten(2.45,-13.2,6.2,.7);
  let alt=-1;
  return ausgang(k,{ name:'Blendenschott', einfach:'Rundes Tor', steh:[TX,-11.5], durch:[TX,-15.6],
    treffer:{x:TX+.45,y:2.2,z:-13,b:5.9,h:4.4,t:1}, schildOben:[TX,4.55,-12.6], glanz:[5.0,2.1,-12.75],
    bewege:(auf)=>{ if(Math.abs(auf-alt)>.002){ alt=auf; stellen(auf); } gang.visible=auf>.02; licht.intensity=1.5*auf; lm.color.setHex(auf>.15?0x5aff7a:0xff5a4a); schloss.visible=auf<.04; } });
}

/* ---------- Panoramafenster mit fremdem Planeten ---------- */
function baueFenster(k,hinten){
  const Z=-13.5;
  WELTRAUM.weltfenster(hinten,11.2,3.2,-8.6,2.86,Z+.02);
  /* Planet (flach gedrückt, damit er hinter der Scheibe bleibt) mit Ringen */
  const pg=gruppe(hinten,-7.4,2.8,Z+.09); pg.scale.z=.05;
  WELTRAUM.planet(pg,k,1.22,0,0,0,'gas').castShadow=false;
  const rg=gruppe(hinten,-7.4,2.8,Z+.06); rg.rotation.z=.17;
  const bogen=(r,d,c,unten,z)=>{ const t=ring(rg,r,d,c,0,0,z,Math.PI); t.rotation.z=unten?Math.PI:0; t.scale.y=.26; t.castShadow=false; };
  bogen(2.05,.055,0xffe0a0,false,0); bogen(2.05,.055,0xffe0a0,true,.12); bogen(1.78,.032,0xc8a8f0,false,0); bogen(1.78,.032,0xc8a8f0,true,.12);
  const mg=gruppe(hinten,-12.3,3.55,Z+.07); mg.scale.z=.08; WELTRAUM.planet(mg,k,.48,0,0,0,'rot').castShadow=false;
  /* kleiner Mond und ein Komet, der durchs Fenster zieht */
  const m2=ball(hinten,.2,0xcfd0e0,-4.3,2.0,Z+.07,1,1,.2); m2.castShadow=false;
  const komet=gruppe(hinten,-12,4,Z+.08);
  lampe(komet,.08,0xffffff,0,0,0); [1,2,3,4].forEach(i=>{ const t=lampe(komet,.07-i*.012,0x9ad8ff,-i*.13,i*.035,0); t.scale.z=.02; });
  verschmelze(komet);
  k.anim.push(t=>{ const f=(t*.07)%1; komet.position.x=-13.3+f*9.6; komet.position.y=4.15-f*1.1; });
  /* Streben und Sims */
  const r=gruppe(hinten,0,0,Z);
  [-10.5,-4.9].forEach(x=>box(r,.14,3.2,.1,METALL2,x,2.86,.24));
  box(r,11.8,.16,.5,METALL,-8.6,1.12,.25);
  [-1,1].forEach(s=>[-1,1].forEach(v=>ball(r,.13,GOLD,-8.6+s*5.7,2.86+v*1.68,.24,1,1,.5)));
  verschmelze(r);
}

function baue(k){
  const sc=k.scene;
  const h=WELTRAUM.huelle(k,{ B:36, T:27, H:6, wand:[72,102,128], boden:[96,108,132], strebe:0x5c6c88, leuchte:0x5ff0ff, staerke:.82, sonneStaerke:.38,
    pfosten:[-15.5,-1.55,6.35,16], streben:[-9.8,-4,3,10], oeffnung:{x:TX,b:TR*2,h:TY+TR} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;

  baueFenster(k,hinten);
  const tuer=baueSchott(k,sc,hinten);

  /* ---------- Blinklampen ---------- */
  const o=new THREE.Object3D(), FARBEN=[0x5ff0ff,0xffcf4a,0xff7a6a,0x7ae86a];

  /* an Wänden und Schränken: zwei Lampengruppen je Träger, die abwechselnd leuchten (bleiben beim Ausblenden am Träger) */
  const leuchtfarben=FARBEN.map(f=>basis(f)), wechsel=[];
  const lampenPaar=(par)=>{ const liste=[];
    return { dazu:(x,y,z,r)=>liste.push([x,y,z,r]),
      fertig:()=>{ const paar=[gruppe(par,0,0,0),gruppe(par,0,0,0)];
        liste.forEach((q,n)=>{ const g=(n*3+(n>>2))%2, t=ball(paar[g],q[3],leuchtfarben[(wechsel.length*2+g)%4],q[0],q[1],q[2]); t.castShadow=false; }); paar.forEach(verschmelze);
        const v=wechsel.length*1.7; wechsel.push(1); k.anim.push(t=>{ paar[0].visible=Math.sin(t*1.7+v)>-.55; paar[1].visible=Math.sin(t*2.3+v+2)>-.4; }); } }; };

  /* ---------- Wandverkleidung mit Lüftungsschlitzen unter dem Fenster (glatt, ohne Knöpfe) ---------- */
  const reihe=gruppe(sc,-8.6,0,-13.2);
  box(reihe,11.2,.96,.6,PETROL2,0,.48,0); box(reihe,11.3,.1,.68,METALL2,0,.05,0); box(reihe,11.3,.08,.66,METALL,0,.98,0);
  for(let i=0;i<6;i++){ const x=-4.65+i*1.86; box(reihe,1.55,.62,.05,DUNKEL2,x,.5,.31); for(let j=0;j<4;j++) box(reihe,1.35,.055,.05,METALL2,x,.31+j*.13,.35); }
  for(let i=0;i<7;i++) box(reihe,.12,.84,.08,METALL,-5.55+i*1.85,.52,.31);
  feld(reihe,11.0,.05,.04,0x5ff0ff,0,.9,.32);
  verschmelze(reihe); k.kasten(-8.6,-13.15,11.4,.75);

  /* Alles, was an einer Seitenwand steht, hängt an deren Wandgruppe und verschwindet mit ihr */
  const sg=[gruppe(links,0,0,0),gruppe(rechts,0,0,0)], sl=[lampenPaar(links),lampenPaar(rechts)], an=(s)=>s<0?0:1;

  /* ---------- Rechnerschränke an den Wänden ---------- */
  const schrank=(x,z,s,hh)=>{ const g=gruppe(sg[an(s)],x,0,z); /* s: Richtung zur Wand */
    const lp=sl[an(s)];
    box(g,1.15,hh,2.0,DUNKEL,0,hh/2,0); box(g,1.25,.18,2.1,METALL2,0,.09,0); box(g,1.25,.14,2.1,METALL,0,hh+.05,0);
    [-.5,.5].forEach(a=>{ box(g,.05,hh-.5,.86,0x3a4664,-s*.59,hh/2+.04,a);
      for(let i=0;i<6;i++){ const y=.55+i*(hh-.9)/5.4; box(g,.03,.05,.7,DUNKEL2,-s*.625,y,a); for(let j=0;j<3;j++) lp.dazu(x-s*.64,y+.13,z+a-.22+j*.22,.045); } });
    for(let i=0;i<7;i++) box(g,.06,hh-.7,.07,METALL2,-.4+i*.13,hh/2,1.02);
    feld(g,.05,.06,1.9,0x70e8ff,-s*.6,hh-.14,0);
    k.kasten(x,z,1.3,2.15); };
  schrank(-17.25,-1.7,-1,3.3); schrank(-17.25,.6,-1,2.8); schrank(-17.25,8.6,-1,3.1);
  schrank(17.25,-.4,1,3.0); schrank(17.25,1.9,1,3.4); schrank(17.25,9.4,1,3.0);

  /* ---------- hohe, flache Wandkonsolen mit Leuchtsäulen ---------- */
  const konsole=(z,s,l)=>{ const x=s*17.65, g=gruppe(sg[an(s)],x,0,z);
    box(g,.7,2.4,l,PETROL2,0,1.2,0); box(g,.78,.16,l+.1,METALL2,0,.08,0); box(g,.82,.14,l+.12,METALL,-s*.04,2.44,0);
    const n=Math.floor(l/.75);
    for(let i=0;i<n;i++){ const a=-l/2+(i+.5)*l/n; box(g,.05,1.7,l/n-.16,DUNKEL2,-s*.36,1.25,a);
      feld(g,.04,.7+((i*3)%4)*.22,.09,i%2?0x5ff0ff:0x8ab8ff,-s*.39,.5+(.7+((i*3)%4)*.22)/2,a);
      sl[an(s)].dazu(x-s*.4,2.24,z+a,.05); }
    k.kasten(x-s*.02,z,.78,l+.15); };
  konsole(4.4,-1,4.2); konsole(5.6,1,3.6); konsole(-5.6,-1,3.0);

  /* ---------- Rechnerblöcke in den hinteren Ecken ---------- */
  [-16.9,16.9].forEach((x,n)=>{ const s=x<0?-1:1, g=gruppe(sg[an(s)],x,0,-12.5);
    box(g,1.5,2.5,1.4,METALL2,0,1.25,0); box(g,1.62,.2,1.52,DUNKEL,0,.1,0); box(g,1.62,.16,1.52,METALL,0,2.56,0);
    for(let i=0;i<3;i++){ box(g,1.2,.5,.05,DUNKEL2,0,.62+i*.66,.72); for(let j=0;j<5;j++) sl[an(s)].dazu(x-.44+j*.22,.72+i*.66,-12.5+.76,.05); feld(g,.9,.05,.03,[0x5ff0ff,0xffcf4a,0x7ae86a][(i+n)%3],0,.48+i*.66,.76); }
    k.kasten(x,-12.5,1.65,1.55); });

  /* ---------- Rohre, Lüftungen, Leitungen und kleine Anzeigen an den Wänden ---------- */
  const wd=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  /* Rückwand oben */
  [[-15.1,-1.95],[6.8,15.6]].forEach(([a,b])=>{ strich(wd[0],[a,5.15,-13.3],[b,5.15,-13.3],.09,0x8a9ab8); strich(wd[0],[a,4.85,-13.38],[b,4.85,-13.38],.055,ORANGE);
    for(let x=a+.5;x<b;x+=2.2) box(wd[0],.14,.55,.22,METALL2,x,5.0,-13.38); });
  [-13,-9,-5,8.4,12.9].forEach(x=>{ box(wd[0],1.5,.14,.1,DUNKEL,x,5.55,-13.44); feld(wd[0],1.3,.06,.04,0xbdf6ff,x,5.55,-13.38); });
  /* Lüftungsgitter und Leitungen unter den Wandgegenständen */
  [7.5,10.6,14.8].forEach(x=>{ box(wd[0],1.3,.62,.1,DUNKEL,x,.52,-13.45); for(let i=0;i<4;i++) box(wd[0],1.1,.06,.05,METALL,x,.32+i*.13,-13.38); });
  [-1,1].forEach(v=>{ const w=wd[v<0?1:2], X=v*17.9;
    strich(w,[X,4.55,-13.2],[X,4.55,13.2],.09,0x8a9ab8); strich(w,[X,4.25,-13.2],[X,4.25,13.2],.055,v<0?TUERKIS:LILA);
    for(let z=-12;z<13;z+=2.4) box(w,.2,.55,.14,METALL2,X,4.4,z);
    [-7,-.5,6.5,11.8].forEach((z,i)=>{ box(w,.1,1.1,1.7,DUNKEL,v*17.96,1.9,z); for(let j=0;j<6;j++) box(w,.06,.07,1.5,METALL,v*17.9,1.5+j*.16,z); });
    const lp=lampenPaar(v<0?links:rechts); for(let z=-11.8;z<13;z+=.55){ if(Math.abs(Math.sin(z*1.7))>.45) lp.dazu(v*17.9,3.05+((Math.round(z*4))%2)*.18,z,.06); } lp.fertig();
    /* Haltestange */
    strich(w,[v*17.7,1.05,-11.5],[v*17.7,1.05,-9],.05,GOLD); [-11.5,-9].forEach(z=>strich(w,[v*18,1.05,z],[v*17.7,1.05,z],.04,METALL)); });
  wd.forEach(verschmelze);
  /* kleine Messanzeigen hoch an den Seitenwänden */
  [[links,-17.88,Math.PI/2,-7,'balken','#ffcf4a'],[links,-17.88,Math.PI/2,6.4,'kurve','#7ae86a'],[rechts,17.88,-Math.PI/2,-6.8,'kurve','#5ff0ff'],[rechts,17.88,-Math.PI/2,6.2,'balken','#ff9a8a']].forEach(([w,x,r,z,art,f])=>{
    const q=gruppe(w,x,3.65,z); q.rotation.y=r; WELTRAUM.bildschirm(q,k,1.15,.6,0,0,.04,art,f); });

  /* ---------- Sauerstoffrohre (Gestell mit Leitungen) ---------- */
  const luft=gruppe(sg[1],17.2,0,-2.9);
  box(luft,1.1,.2,1.7,DUNKEL,0,.1,0);
  [-.5,0,.5].forEach(z=>{ walze(luft,.22,1.7,TUERKIS,0,1.05,z); ball(luft,.22,TUERKIS,0,1.9,z,1,.6,1); reif(luft,.23,.035,WEISS,0,1.5,z); reif(luft,.23,.035,WEISS,0,.6,z); strich(luft,[0,2.0,z],[.82,2.35,z],.04,METALL); });
  box(luft,.12,.12,1.6,METALL2,-.24,1.15,0);
  k.kasten(17.2,-2.9,1.2,1.8);
  sg.forEach(verschmelze); sl.forEach(p=>p.fertig());

  /* ---------- Ladestation für den Bordroboter ---------- */
  const lade=gruppe(sc,-15.6,0,12.0);
  box(lade,2.0,.08,1.5,DUNKEL,0,.04,0); feld(lade,1.6,.02,.1,0x7ae86a,0,.095,.5);
  box(lade,1.8,1.5,.3,PETROL,0,.75,-.55); box(lade,1.9,.14,.42,METALL,0,1.55,-.55);
  [-.5,0,.5].forEach((x,i)=>{ feld(lade,.3,.7-i*.12,.04,0x7ae86a,x,.45+(.7-i*.12)/2,-.38); });
  ring(lade,.22,.05,GELB,0,1.28,-.37);
  verschmelze(lade); k.kasten(-15.6,11.75,2.1,1.2);

  /* ---------- Pflanzkübel ---------- */
  const gruen=gruppe(sc,0,0,0);
  const kuebel=(x,z,l)=>{ const g=gruppe(gruen,x,0,z);
    box(g,l,.55,.8,HELL,0,.3,0); box(g,l+.1,.1,.9,METALL2,0,.6,0); box(g,l+.06,.08,.86,DUNKEL,0,.04,0); box(g,l-.18,.03,.62,0x5a3a24,0,.662,0); feld(g,l-.4,.06,.03,0x70e8ff,0,.3,.42);
    for(let i=0;i<Math.round(l*4);i++){ const a=-l/2+.25+zufall()*(l-.5), b=(zufall()-.5)*.4, hh=.25+zufall()*.45; strich(g,[a,.66,b],[a,.66+hh,b],.025,0x2f8a4a);
      ball(g,.17,[0x4ab45a,0x6ad06a,0x2f9a5a][i%3],a,.66+hh,b,1,.55,1); if(i%3===0) ball(g,.08,[0xff8ab0,0xffd23a,0xb08aff][(i/3)%3|0],a,.78+hh,b); }
    k.kasten(x,z,l+.15,.95); };
  kuebel(-10.4,12.3,3.0); kuebel(6.4,12.3,3.2); kuebel(15.4,12.3,2.8); kuebel(-3.6,12.4,2.0);
  kuebel(9.0,8.4,2.6);
  verschmelze(gruen);

  /* ---------- Raumschiff-Modell auf einem niedrigen Sockel (vorn links) ---------- */
  const modell=gruppe(sc,-12.2,0,7.6);
  box(modell,2.8,.34,1.6,DUNKEL,0,.17,0); box(modell,2.9,.07,1.7,GOLD,0,.36,0); feld(modell,2.3,.06,.04,0x5ff0ff,0,.18,.82);
  [-.6,.6].forEach(x=>strich(modell,[x,.38,0],[x*.7,.86,0],.07,METALL2));
  ball(modell,.36,WEISS,0,1.05,0,3.1,.85,1); ball(modell,.22,BLAU,.62,1.24,0,1.5,.8,.9);
  [-1,1].forEach(v=>{ box(modell,.7,.08,.62,ORANGE,-.35,1.0,v*.48); const d=walze(modell,.13,.62,METALL,-.55,1.0,v*.82); d.rotation.z=Math.PI/2; lampe(modell,.1,0x70f0ff,-.9,1.0,v*.82); });
  box(modell,.5,.46,.07,ORANGE,-.82,1.38,0).rotation.z=.45;
  verschmelze(modell); k.kasten(-12.2,7.6,3.0,1.8);

  /* ---------- Energieverteiler mit Kühlrippen und Rohrbögen (rechts der Mitte) ---------- */
  const verteiler=gruppe(sc,7.5,0,.4);
  box(verteiler,2.3,.5,1.2,PETROL2,0,.25,0); box(verteiler,2.4,.09,1.3,DUNKEL,0,.045,0);
  for(let i=0;i<9;i++) box(verteiler,.09,.34,1.06,METALL,-.52+i*.13,.66,0);
  [-.88,.88].forEach(x=>{ const b=ring(verteiler,.34,.11,ORANGE,x,.5,0,Math.PI); b.rotation.y=Math.PI/2; [-.34,.34].forEach(z=>walze(verteiler,.15,.1,METALL2,x,.54,z)); });
  feld(verteiler,1.9,.08,.04,0x7ae86a,0,.28,.62);
  verschmelze(verteiler); k.kasten(7.5,.4,2.5,1.4);

  /* ---------- Frachtbehälter (vorn links und rechts) ---------- */
  const fracht=gruppe(sc,0,0,0);
  const behaelter=(x,z,y,b,hh,t,f)=>{ box(fracht,b,hh,t,f,x,y+hh/2,z); [-1,1].forEach(v=>{ box(fracht,.14,hh+.04,t+.06,DUNKEL,x+v*(b/2-.16),y+hh/2,z); }); box(fracht,b*.4,.09,.05,GELB,x,y+hh*.6,z+t/2+.03); };
  behaelter(-10.9,10.7,0,1.4,.75,1.0,0x5a7aa8); behaelter(-10.9,10.7,.76,.95,.5,.8,0xc8d4e4);
  behaelter(12.7,8.0,0,1.5,.8,1.1,0xc8d4e4); behaelter(12.7,8.0,.81,1.0,.5,.85,0x5a7aa8);
  verschmelze(fracht); k.kasten(-10.9,10.7,1.5,1.1); k.kasten(12.7,8.0,1.6,1.2);

  /* ---------- Geländer vor dem Fensterbereich (niedrig) ---------- */
  const gel=gruppe(sc,0,0,0);
  const zaunStueck=(x1,z1,x2,z2)=>{ const n=Math.max(1,Math.round(Math.hypot(x2-x1,z2-z1)/1.2));
    for(let i=0;i<=n;i++){ const x=x1+(x2-x1)*i/n, z=z1+(z2-z1)*i/n; walze(gel,.07,.86,METALL2,x,.43,z); ball(gel,.1,GOLD,x,.9,z); }
    strich(gel,[x1,.82,z1],[x2,.82,z2],.06,METALL); strich(gel,[x1,.45,z1],[x2,.45,z2],.035,TUERKIS);
    for(let i=0;i<=n*3;i++) k.kreis(x1+(x2-x1)*i/(n*3),z1+(z2-z1)*i/(n*3),.14); };
  zaunStueck(-1.9,-12.1,-1.9,-9.3); zaunStueck(5.9,-12.1,5.9,-9.3);
  verschmelze(gel);

  /* ---------- Bodenzier: Brückenkreis, Leitbahnen, Kabelkanäle ---------- */
  const boden=gruppe(sc,0,0,0);
  const flach=(r1,r2,c,x,y,z,leuchtet)=>{ const m=new THREE.Mesh(new THREE.RingGeometry(r1,r2,56),leuchtet?basis(c):mat(c)); m.rotation.x=-Math.PI/2; m.position.set(x,y,z); boden.add(m); };
  /* großer Kreis um den Sessel */
  flach(3.35,3.62,0x2f7488,1.4,.012,-2.8); flach(3.0,3.08,0x5ff0ff,1.4,.021,-2.8,true); flach(2.2,2.3,0x3a4a6a,1.4,.012,-2.8);
  /* Landekreise als Einlegearbeit vorn in der Mitte */
  flach(3.05,3.14,0x3f8ce0,.6,.011,6.6,true); flach(2.55,2.62,0xd8a73a,.6,.02,6.6);
  for(let i=0;i<24;i++){ const a=i*Math.PI/12, l=i%6?.22:.7, t=box(boden,l,.016,.08,i%6?0x8a9ab8:0x5ff0ff,.6+Math.cos(a)*(3.5+l/2),.012,6.6+Math.sin(a)*(3.5+l/2)); t.rotation.y=-a; }
  /* Kabelkanäle */
  [[-16.4,-.5,-12.9,-.5],[-16.4,-9.9,-8,-9.9],[8.8,-8.6,13,-8.6],[13.6,10.8,16.4,10.8]].forEach(([x1,z1,x2,z2],i)=>{ const l=x2-x1; box(boden,l,.025,.34,DUNKEL,(x1+x2)/2,.014+i*.001,z1);
    [-.1,.1].forEach((a,j)=>box(boden,l-.2,.012,.06,j?ORANGE:TUERKIS,(x1+x2)/2,.034,z1+a)); });
  /* Bodengitter */
  [[-14.4,7.2],[14.2,.6],[-4.5,1.2],[6.8,8.6]].forEach(([x,z])=>{ box(boden,1.9,.016,1.4,DUNKEL2,x,.01,z); for(let i=0;i<6;i++) box(boden,.1,.02,1.26,METALL2,x-.75+i*.3,.03,z); });
  verschmelze(boden);

  /* ---------- Bodenleuchten ---------- */
  const leuchtPlaetze=[];
  for(let z=-8.4;z<=10.8;z+=1.2){ if(z>1.8||z<-7){ leuchtPlaetze.push([-2.9,z]); leuchtPlaetze.push([4.1,z]); } }
  for(let x=-15.2;x<=15.3;x+=1.45){ if(x<-2.5||x>6.4) leuchtPlaetze.push([x,-10.7]); }
  for(let z=-8;z<=10;z+=1.5){ leuchtPlaetze.push([-15.7,z]); leuchtPlaetze.push([15.9,z]); }
  const bl=[0,1,2].map(i=>{ const m=basis(0x70e8ff), liste=leuchtPlaetze.filter((_,j)=>j%3===i), im=new THREE.InstancedMesh(GEO.box,m,liste.length);
    liste.forEach((p,j)=>{ o.position.set(p[0],.035,p[1]); o.rotation.set(0,0,0); o.scale.set(.26,.05,.26); o.updateMatrix(); im.setMatrixAt(j,o.matrix); }); im.frustumCulled=false; sc.add(im); return m; });
  k.anim.push(t=>{ bl.forEach((m,i)=>m.color.setHex(Math.sin(t*3-i*2.09)>.3?0xd8ffff:0x2c8aa8)); });

  /* Nieten im Boden */
  const niet=new THREE.InstancedMesh(GEO.cyl,mat(0x4a5876),160);
  for(let i=0;i<160;i++){ o.position.set(-16.6+(i%16)*2.2+(Math.floor(i/16)%2)*.4,.005,-11.6+Math.floor(i/16)*2.6); o.rotation.set(0,0,0); o.scale.set(.07,.008,.07); o.updateMatrix(); niet.setMatrixAt(i,o.matrix); }
  niet.frustumCulled=false; sc.add(niet);

  /* ---------- Licht ---------- */
  const l1=new THREE.PointLight(0x8ac8ff,.45,16,1.5); l1.position.set(-8.5,3.8,-10); sc.add(l1);
  const l2=new THREE.PointLight(0xffe08a,.55,9,1.5); l2.position.set(-6,2.9,7.3); sc.add(l2);
  const l3=new THREE.PointLight(0x60f0ff,.45,8,1.5); l3.position.set(-11.5,2.2,3.2); sc.add(l3);

  /* ---------- Leben: Bordroboter und Messdrohne ---------- */
  WELTRAUM.roboter(k,[[-8.7,-2.1],[-3.4,-1.6],[-2.8,1.9],[4.6,2.2],[5.2,8.8],[-1.4,10.3],[-8.4,9.4],[-9,5]],1.3,0);
  WELTRAUM.drohne(k,3,-1.5,7.2,3.7,.32,1.2);

  return { tuer, start:[1,8.6] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.4,-10.8],[-10.2,-11.4],[-3.4,-11.2],[7.2,-9.4],[15.2,-10.6],[15.6,-2.6],[15.4,3.8],[15.6,7.4],[13,11],[9.2,10.8],
  [-6.6,11.4],[-13.2,10.6],[-15.8,6.6],[-15.2,-3.6],[-9.4,-7.6],[-3.8,-6.6],[5,-5.4],[11,-2.2],[-13.6,.6],[3.2,10.8]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-6.6, z:-5.8, dreh:.12, steh:[-6.3,-3.9], kasten:[3.5,1.9], treffer:[3.5,2.3,1.9], baue(g,k){ /* 1 Steuerpult: schräge Platte mit Steuerhorn, Schubhebeln und großen Knöpfen */
      box(g,2.4,.16,1.3,DUNKEL,0,.08,0); box(g,2.0,.85,.95,PETROL,0,.57,-.05); [-1,1].forEach(s=>box(g,.34,1.0,1.15,PETROL2,s*1.2,.5,0));
      box(g,2.0,.3,.3,PETROL,0,1.04,-.35); feld(g,1.5,.1,.04,0x5ff0ff,0,.5,.44);
      const t=gruppe(g,0,1.12,.02); t.rotation.x=.38;
      box(t,3.2,.18,1.45,0xcfdae8,0,0,0); box(t,3.0,.03,1.27,DUNKEL,0,.1,0);
      /* Steuerhorn */
      strich(t,[0,.1,.25],[0,.5,.42],.1,METALL2);
      const horn=gruppe(t,0,.56,.45); horn.rotation.x=-.75;
      const b=ring(horn,.42,.08,ORANGE,0,.12,0,Math.PI); b.rotation.z=Math.PI; box(horn,.3,.2,.14,DUNKEL2,0,-.2,.02); strich(horn,[-.42,.12,0],[.42,.12,0],.05,METALL);
      [-1,1].forEach(s=>{ walze(horn,.1,.34,DUNKEL2,s*.42,.24,0); ball(horn,.09,ROT,s*.42,.44,0); });
      /* Schubhebel links */
      [[-1.25,ROT],[-.9,BLAU]].forEach(([x,f],i)=>{ box(t,.12,.04,.8,DUNKEL2,x,.13,.05); strich(t,[x,.12,.1],[x,.62,-.12+i*.34],.05,METALL); ball(t,.16,f,x,.66,-.14+i*.37); });
      /* große Knöpfe rechts */
      [ROT,GELB,GRUEN,TUERKIS,LILA,ORANGE].forEach((f,i)=>{ const x=.82+(i%3)*.32, z=.05+Math.floor(i/3)*.36; walze(t,.135,.05,METALL2,x,.13,z); ball(t,.1,f,x,.17,z,1,.7,1); });
      /* Sichtschirm hinten auf dem Pult */
      WELTRAUM.bildschirm(g,k,1.7,.55,0,1.72,-.56,'radar','#7ae86a');
      [-1,1].forEach(s=>{ strich(g,[s*1.25,1.0,-.55],[s*1.25,1.9,-.62],.045,METALL2); lampe(g,.1,s<0?0xff7a6a:0x7ae86a,s*1.25,1.96,-.62); }); } },
  { x:1.4, z:-3.0, dreh:-.38, steh:[.5,-1.1], r:1.25, treffer:[2.4,3.0,2.1], baue(g,k){ /* 2 Kommandosessel: hohe Lehne, Armlehnen mit Knöpfen, Drehfuß */
      const POL=0x2f8aa0, POL2=0x42acc0;
      walze(g,1.05,.14,DUNKEL,0,.07,0); reif(g,.98,.045,GOLD,0,.16,0); rohr(g,.24,.42,.55,METALL2,0,.4,0); walze(g,.5,.12,METALL,0,.7,0);
      box(g,1.35,.32,1.2,POL,0,.9,.05); box(g,1.0,.16,.95,POL2,0,1.11,.14);
      const l=gruppe(g,0,1.0,-.52); l.rotation.x=-.13;
      box(l,1.3,1.5,.3,POL,0,.75,0); box(l,.82,1.12,.14,POL2,0,.72,.2); box(l,.1,1.1,.05,basis(0x5ff0ff),0,.72,.29);
      box(l,.86,.42,.34,POL,0,1.72,.03); box(l,.6,.24,.12,WEISS,0,1.72,.22);
      [-1,1].forEach(s=>{ box(l,.2,1.2,.36,DUNKEL,s*.74,.62,.04); ball(l,.13,GOLD,s*.74,1.3,.06);
        box(g,.3,.2,1.2,DUNKEL,s*.86,1.38,.08); box(g,.2,.55,.3,METALL2,s*.86,1.05,-.15); ball(g,.15,DUNKEL,s*.86,1.38,.68,1,.7,1);
        [0,1,2].forEach(i=>lampe(g,.065,s>0?[0xffcf4a,0xff7a6a,0x7ae86a][i]:[0x5ff0ff,0xffffff,0xffcf4a][i],s*.86,1.5,.5-i*.22)); });
      box(g,.8,.1,.34,METALL2,0,.3,.95); strich(g,[0,.3,.4],[0,.3,.85],.07,METALL2);
      verschmelze(g); k.verdecker(g,1.4,-3.0,1.0); } },
  { x:-13.7, z:-8.4, steh:[-12.5,-6.8], r:1.05, treffer:[2.6,2.6,1.8], baue(g){ /* 3 Teleskop auf Dreibein, schräg zum Fenster gerichtet */
      [0,1,2].forEach(i=>{ const a=i*2.094+1.57, x=Math.cos(a)*.85, z=Math.sin(a)*.85; strich(g,[x,.04,z],[0,1.35,0],.065,0x8a5a34); ball(g,.1,GOLD,x,.07,z); strich(g,[x*.55,.5,z*.55],[0,.62,0],.025,GOLD); });
      walze(g,.08,.5,GOLD,0,1.45,0); ball(g,.17,DUNKEL,0,1.7,0);
      const t=gruppe(g,0,1.82,0); t.rotation.order='YZX'; t.rotation.y=.6; t.rotation.z=.48;
      const q=(r,l,c,x)=>{ const w=walze(t,r,l,c,x,0,0); w.rotation.z=Math.PI/2; return w; };
      q(.24,1.5,WEISS,.05); q(.31,.55,WEISS,1.0); q(.34,.12,GOLD,1.31); q(.33,.1,GOLD,.72); q(.265,.12,GOLD,-.2);
      q(.28,.02,0x2a6ab0,1.38); ball(t,.1,basis(0xbfeaff),1.395,.08,.06,.15,.8,.8);
      q(.17,.28,DUNKEL,-.83); q(.1,.3,METALL,-1.08); q(.14,.08,DUNKEL2,-1.25);
      const s=walze(t,.08,.7,PETROL,.15,.36,0); s.rotation.z=Math.PI/2; walze(t,.1,.06,GOLD,.5,.36,0).rotation.z=Math.PI/2; [-.1,.35].forEach(x=>strich(t,[x,.2,0],[x,.34,0],.03,GOLD));
      [-1,1].forEach(v=>ball(g,.09,GOLD,0,1.72,v*.26)); } },
  { x:-11.4, z:2.4, steh:[-11.2,4.4], r:1.15, treffer:[2.2,3.0,2.2], baue(g,k){ /* 4 Hologramm-Globus: leuchtende Gitterkugel über einem Sendesockel */
      walze(g,1.05,.18,DUNKEL,0,.09,0); rohr(g,.6,.85,.55,METALL2,0,.44,0,8); walze(g,.78,.14,METALL,0,.78,0); reif(g,.62,.05,basis(0x5ff0ff),0,.87,0); walze(g,.34,.05,basis(0xbffcff),0,.87,0);
      [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78; lampe(g,.08,0xffcf4a,Math.cos(a)*.82,.45,Math.sin(a)*.82); });
      const durch=(c,a)=>basis(c,{transparent:true,opacity:a,depthWrite:false});
      const kegelM=new THREE.Mesh(new THREE.CylinderGeometry(.78,.34,.75,24,1,true),basis(0x5ff0ff,{transparent:true,opacity:.17,depthWrite:false,side:THREE.DoubleSide})); kegelM.position.y=1.25; g.add(kegelM);
      const kugel=gruppe(g,0,1.95,0), dreh=gruppe(kugel,0,0,0); kugel.rotation.z=.3; const R=.86;
      const huelle=ball(dreh,R,durch(0x2ab8e0,.22),0,0,0); huelle.castShadow=false;
      const linie=durch(0x8affff,.9);
      const reifen=(r,y,rx,ry)=>{ const t=new THREE.Mesh(new THREE.TorusGeometry(r,.018,6,40),linie); t.position.y=y; t.rotation.set(rx,ry,0); dreh.add(t); };
      [0,1,2,3].forEach(i=>reifen(R,0,0,i*Math.PI/4)); [-.55,0,.55].forEach(y=>reifen(Math.sqrt(R*R-y*y),y,Math.PI/2,0));
      const land=durch(0x7affa0,.85);
      [[.4,.3,.3],[1.0,-.1,.22],[2.5,.42,.26],[3.1,.05,.32],[4.4,-.35,.28],[5.2,.2,.2]].forEach(([a,y,gr])=>{ const r=Math.sqrt(R*R-y*y), t=ball(dreh,gr,land,Math.sin(a)*r,y,Math.cos(a)*r,1,.75,.22); t.rotation.y=a; t.castShadow=false; });
      const bahn=new THREE.Mesh(new THREE.TorusGeometry(1.12,.014,6,48),durch(0xffcf4a,.8)); bahn.rotation.x=Math.PI/2-.12; kugel.add(bahn);
      const sat=gruppe(kugel,0,0,0); ball(sat,.09,durch(0xffe27a,1),1.12,0,0);
      const s=schein(g,'rgba(90,240,255,.45)',0,1.95,0,2.8);
      k.anim.push(t=>{ dreh.rotation.y=t*.5; sat.rotation.y=-t*1.4; sat.position.y=Math.sin(t*1.4)*.1; kegelM.rotation.y=t; s.material.opacity=.8+Math.sin(t*4)*.2; }); } },
  { wand:'hinten', x:9.0, z:-13.5, steh:[9.0,-11.3], kasten:[2.8,1.3], treffer:[3.0,2.8,1.2], trefferY:.9, baue(g,k){ /* 5 Funkgerät: Lautsprecher, Antenne, Drehknöpfe und Mikrofon am Kabel */
      box(g,2.7,1.7,.45,0x3f7a8a,0,2.2,.25); box(g,2.84,.14,.55,ORANGE,0,3.08,.27); box(g,2.84,.14,.55,ORANGE,0,1.32,.27);
      /* Lautsprecher */
      const sp=walze(g,.6,.08,DUNKEL2,-.66,2.2,.5); sp.rotation.x=Math.PI/2; ring(g,.6,.07,METALL,-.66,2.2,.54); ring(g,.36,.025,METALL2,-.66,2.2,.55); ball(g,.15,METALL2,-.66,2.2,.55,1,1,.5);
      for(let i=-3;i<=3;i++){ if(i) box(g,Math.sqrt(.3-i*i*.025)*2,.035,.04,0x8aa0b4,-.66,2.2+i*.14,.57); }
      /* Skala mit Zeiger und Drehknöpfe */
      box(g,1.06,.5,.05,0xfff0b8,.66,2.65,.49); for(let i=0;i<9;i++) box(g,.025,i%2?.1:.2,.02,DUNKEL2,.24+i*.105,2.74,.525);
      const zeiger=box(g,.05,.46,.03,basis(0xff3a2a,{transparent:true,opacity:1}),.6,2.65,.545);
      [.36,.96].forEach(x=>{ const w=walze(g,.2,.2,DUNKEL,x,1.95,.56); w.rotation.x=Math.PI/2; ring(g,.2,.035,GOLD,x,1.95,.66); box(g,.05,.18,.03,WEISS,x,2.02,.675); });
      [0,1,2,3].forEach(i=>feld(g,.18,.12,.05,[0xff7a6a,0xffcf4a,0x7ae86a,0x5ff0ff][i],.3+i*.25,1.55,.5));
      /* Antenne */
      strich(g,[.95,3.1,.28],[1.4,4.15,.28],.04,METALL); walze(g,.13,.16,DUNKEL,.95,3.18,.28); lampe(g,.11,0xff5a4a,1.4,4.17,.28);
      const welleM=[0,1].map(()=>basis(0x9affff,{transparent:true,opacity:.8,depthWrite:false}));
      welleM.forEach((m,i)=>[-1,1].forEach(s=>{ const w=new THREE.Mesh(new THREE.TorusGeometry(.24+i*.2,.025,6,14,1.5),m); w.position.set(1.4,4.17,.28); w.rotation.z=(s<0?Math.PI:0)-.75; g.add(w); }));
      /* Mikrofon an gedrehtem Kabel */
      let alt=[-1.35,1.75,.4]; for(let i=1;i<=14;i++){ const f=i/14, p=[-1.35-.55*Math.sin(f*3.14)-.25*f+(i%2?.07:-.07),1.75-f*1.15+(f>.8?(f-.8)*1.6:0),.5]; strich(g,alt,p,.04,ORANGE); ball(g,.04,ORANGE,p[0],p[1],p[2]); alt=p; }
      box(g,.14,.1,.46,METALL2,alt[0],alt[1]+.2,.27); /* Halter für das Mikrofon */
      ball(g,.2,METALL,alt[0],alt[1]+.2,.52,.85,1.25,.8); walze(g,.1,.2,DUNKEL,alt[0],alt[1]+.03,.52); reif(g,.17,.025,DUNKEL,alt[0],alt[1]+.2,.52);
      k.anim.push(t=>{ zeiger.position.x=.66+Math.sin(t*.8)*.36+Math.sin(t*3.7)*.04; welleM.forEach((m,i)=>m.opacity=.15+.75*Math.max(0,Math.sin(t*4-i*1.4))); }); } },
  { wand:'hinten', x:13.1, z:-13.5, steh:[13.0,-11.3], kasten:[3.9,1.0], treffer:[4.0,2.8,.9], trefferY:.95, baue(g,k){ /* 6 Navigationsbildschirm: Sternkarte mit Flugweg und kleiner Rakete, goldener Rahmen */
      box(g,3.8,2.5,.18,GOLD,0,2.4,.1); box(g,3.56,2.26,.06,DUNKEL2,0,2.4,.2);
      [-1,1].forEach(s=>[-1,1].forEach(v=>ball(g,.13,METALL,s*1.83,2.4+v*1.18,.22,1,1,.6)));
      strich(g,[-.7,1.15,.12],[-.9,.75,0],.07,METALL2); strich(g,[.7,1.15,.12],[.9,.75,0],.07,METALL2);
      const c=document.createElement('canvas'); c.width=384; c.height=240; const p=c.getContext('2d'), tx=new THREE.CanvasTexture(c); tx.minFilter=THREE.LinearFilter;
      const A=[56,186], B=[132,60], C=[232,190], D=[322,62];
      const ort=f=>{ const u=1-f; return [u*u*u*A[0]+3*u*u*f*B[0]+3*u*f*f*C[0]+f*f*f*D[0], u*u*u*A[1]+3*u*u*f*B[1]+3*u*f*f*C[1]+f*f*f*D[1]]; };
      const kreis=(x,y,r,f)=>{ p.fillStyle=f; p.beginPath(); p.arc(x,y,r,0,7); p.fill(); };
      const mal=t=>{ p.fillStyle='#0a1c4a'; p.fillRect(0,0,384,240); p.strokeStyle='rgba(120,180,255,.28)'; p.lineWidth=1.5; for(let x=32;x<384;x+=64){ p.beginPath(); p.moveTo(x,0); p.lineTo(x,240); p.stroke(); } for(let y=24;y<240;y+=48){ p.beginPath(); p.moveTo(0,y); p.lineTo(384,y); p.stroke(); }
        for(let i=0;i<34;i++) kreis((i*97)%376+4,(i*61)%232+4,1+(i%3)*.6,'#ffffff');
        for(let i=0;i<=26;i++){ const q=ort(i/26); if(i%2===0) kreis(q[0],q[1],5,'#ffd23a'); }
        kreis(A[0],A[1],30,'#3fa0e0'); kreis(A[0]-8,A[1]-6,11,'#6ad070'); kreis(A[0]+12,A[1]+10,8,'#6ad070');
        kreis(D[0],D[1],34,'#f0a050'); p.strokeStyle='#ffe0a0'; p.lineWidth=5; p.beginPath(); p.ellipse(D[0],D[1],52,12,-.3,0,7); p.stroke();
        p.strokeStyle='#ff6a5a'; p.lineWidth=4; p.beginPath(); p.arc(D[0],D[1],46+Math.sin(t*4)*5,0,7); p.stroke();
        const f=(t*.09)%1, q=ort(f), n=ort(Math.min(1,f+.02)), w=Math.atan2(n[1]-q[1],n[0]-q[0]);
        p.save(); p.translate(q[0],q[1]); p.rotate(w); p.fillStyle='#ffffff'; p.beginPath(); p.moveTo(24,0); p.quadraticCurveTo(8,-14,-14,-9); p.lineTo(-14,9); p.quadraticCurveTo(8,14,24,0); p.fill(); p.fillStyle='#ff6a4a'; [-1,1].forEach(s=>{ p.beginPath(); p.moveTo(-6,s*8); p.lineTo(-20,s*18); p.lineTo(-15,s*6); p.fill(); }); p.fillStyle='#ffb030'; p.beginPath(); p.moveTo(-15,-5); p.lineTo(-28,0); p.lineTo(-15,5); p.fill(); kreis(5,0,5,'#2a6ab0'); p.restore();
        tx.needsUpdate=true; };
      mal(0); tafel(g,tx,3.4,2.12,0,2.4,.245);
      let letzt=-1; k.anim.push(t=>{ const n=Math.floor(t*8); if(n!==letzt){ letzt=n; mal(t); } }); } },
  { x:7.6, z:-4.4, dreh:-.14, steh:[7.4,-2.6], r:1.05, treffer:[2.3,2.2,1.6], baue(g,k){ /* 7 Bordlogbuch: dickes elektronisches Buch, aufgeschlagen auf einem Stehpult */
      walze(g,.7,.14,DUNKEL,0,.07,0); rohr(g,.18,.28,1.2,METALL2,0,.72,0); reif(g,.24,.04,GOLD,0,.9,0);
      const t=gruppe(g,0,1.36,.04); t.rotation.x=.55;
      box(t,2.2,.12,1.4,PETROL,0,-.06,0); box(t,2.2,.18,.1,GOLD,0,.04,.72);
      /* dicker Einband, Seitenstapel, zwei leuchtende Seiten */
      [-1,1].forEach(s=>{ const h=gruppe(t,0,.1,-.02); h.rotation.z=s*.08;
        box(h,1.05,.12,1.3,0x8a2f3a,s*.54,0,0); box(h,.94,.2,1.16,0xf4ecd4,s*.49,.15,0);
        [.1,.15,.2].forEach(y=>box(h,.945,.012,1.165,0xc8bc98,s*.49,y,0));
        box(h,.84,.03,1.02,basis(0xcffcff),s*.48,.265,0);
        for(let i=0;i<6;i++){ const l=i===5?.34:.64-(i%2)*.1; box(h,l,.012,.055,basis(0x1a5a8a),s*.48-(.64-l)/2,.287,-.38+i*.14); }
        [-1,1].forEach(v=>box(h,.2,.15,.2,GOLD,s*.99,.005,v*.57));
        box(h,.1,.1,.34,METALL,s*1.08,.02,0); });
      box(t,.12,.3,1.32,0x6a2028,0,.18,-.02); strich(t,[.02,.36,-.55],[.06,.38,.66],.03,ORANGE); strich(t,[.06,.38,.66],[.14,-.05,.8],.03,ORANGE);
      const led=basis(0x7ae86a,{transparent:true,opacity:1}); const l=ball(t,.04,led,.9,.14,.72); l.castShadow=false;
      strich(t,[-.82,.16,.72],[-.32,.16,.72],.03,WEISS); ball(t,.035,TUERKIS,-.31,.16,.72);
      schein(g,'rgba(160,250,255,.3)',0,1.8,.1,1.7);
      k.anim.push(z=>{ led.opacity=.35+.65*Math.abs(Math.sin(z*2.4)); }); } },
  { x:11.6, z:3.4, dreh:-.1, steh:[11.4,5.9], kasten:[3.9,2.9], treffer:[3.8,1.7,2.8], baue(g){ /* 8 Kartentisch mit großer Sternkarte */
      [-1.35,1.35].forEach(x=>[-.8,.8].forEach(z=>{ strich(g,[x*1.08,0,z*1.1],[x,1.1-z*.17,z],.11,METALL2); ball(g,.15,GOLD,x*1.08,.08,z*1.1,1,.6,1); }));
      strich(g,[-1.35,.45,0],[1.35,.45,0],.06,METALL); [-1,1].forEach(s=>strich(g,[s*1.37,.45,-.82],[s*1.37,.45,.82],.06,METALL));
      const t=gruppe(g,0,1.18,0); t.rotation.x=.17;
      box(t,3.6,.24,2.4,0x7a4a2c,0,0,0); box(t,3.7,.1,2.5,GOLD,0,-.06,0);
      const karte=bild(512,340,(p)=>{ p.fillStyle='#17205c'; p.fillRect(0,0,512,340); p.strokeStyle='rgba(140,180,255,.35)'; p.lineWidth=2; [70,130,200].forEach(r=>{ p.beginPath(); p.arc(256,170,r,0,7); p.stroke(); }); for(let i=0;i<8;i++){ p.beginPath(); p.moveTo(256,170); p.lineTo(256+Math.cos(i*.785)*300,170+Math.sin(i*.785)*300); p.stroke(); }
        const pk=(x,y,r,f)=>{ p.fillStyle=f; p.beginPath(); p.arc(x,y,r,0,7); p.fill(); };
        for(let i=0;i<60;i++) pk((i*131)%500+6,(i*79)%326+7,1.5+(i%3),'#fff6d0');
        [[[46,70],[92,44],[128,86],[180,66],[196,118]],[[320,262],[372,230],[420,268],[470,238],[420,268],[404,310]],[[60,250],[104,214],[150,262],[96,292],[60,250]],[[330,60],[386,98],[452,56]]].forEach(z=>{ p.strokeStyle='#bcd4ff'; p.lineWidth=3; p.beginPath(); z.forEach((q,i)=>i?p.lineTo(q[0],q[1]):p.moveTo(q[0],q[1])); p.stroke(); z.forEach(q=>pk(q[0],q[1],7,'#ffe680')); });
        pk(256,170,26,'#ffc83a'); pk(326,170,11,'#58b0f0'); pk(188,282,15,'#f08a50'); pk(150,150,9,'#7ae090');
        p.strokeStyle='#f4e2b0'; p.lineWidth=8; p.strokeRect(5,5,502,330); });
      tafel(t,karte,3.3,2.14,0,.132,0).rotation.x=-Math.PI/2;
      [-1,1].forEach(s=>[-1,1].forEach(v=>ball(t,.1,GOLD,s*1.74,.13,v*1.14,1,.5,1)));
      /* Lineal, Spielrakete als Wegmarke und Kompass */
      const li=box(t,1.1,.05,.14,0xf0d890,-.65,.17,.62); li.rotation.y=.35;
      const r=gruppe(t,.85,.14,.35); walze(r,.1,.34,WEISS,0,.23,0); kegel(r,.1,.2,ROT,0,.5,0); [0,1,2].forEach(i=>{ const a=i*2.094; box(r,.05,.18,.16,ROT,Math.sin(a)*.12,.11,Math.cos(a)*.12).rotation.y=a; }); ball(r,.045,BLAU,0,.27,.095);
      walze(t,.2,.09,GOLD,-1.15,.18,-.55); walze(t,.16,.02,WEISS,-1.15,.235,-.55); box(t,.05,.02,.27,ROT,-1.15,.255,-.55).rotation.y=.7; } },
  { x:14.9, z:-6.4, dreh:-.52, steh:[13.5,-4.7], r:1.15, treffer:[2.1,3.55,1.6], baue(g,k){ /* 9 Trinkautomat: Sichtfenster mit Flaschen, Ausgabefach mit Becher, großer Tropfen oben */
      box(g,1.8,.16,1.2,DUNKEL,0,.08,0); box(g,1.7,2.35,1.05,0x3f8ce0,0,1.33,0); box(g,1.82,.18,1.16,WEISS,0,2.55,0);
      [-1,1].forEach(s=>box(g,.12,2.3,.12,WEISS,s*.82,1.33,.5));
      box(g,1.14,1.2,.04,0xdff6ff,-.2,1.74,.54);
      for(let r=0;r<3;r++){ box(g,1.14,.05,.18,METALL2,-.2,1.19+r*.4,.62); for(let i=0;i<4;i++){ const x=-.62+i*.28, y=1.22+r*.4, f=[0xff7a3a,0x58c850,0xe8409a,0xffd23a,0x8a5ae0][(r*2+i)%5];
          walze(g,.085,.2,f,x,y+.1,.63); kegel(g,.085,.08,f,x,y+.24,.63); walze(g,.033,.05,WEISS,x,y+.29,.63); walze(g,.09,.05,WEISS,x,y+.1,.63); } }
      [0,1,2,3].forEach(i=>{ const b=walze(g,.095,.08,[ROT,GELB,GRUEN,ORANGE][i],.62,2.15-i*.27,.56); b.rotation.x=Math.PI/2; });
      /* Ausgabefach */
      box(g,1.0,.62,.04,DUNKEL2,-.2,.68,.54); box(g,1.08,.08,.34,METALL,-.2,.35,.66); box(g,.3,.12,.22,METALL,-.2,.96,.62); walze(g,.04,.1,METALL2,-.2,.87,.66);
      rohr(g,.16,.11,.34,WEISS,-.2,.56,.7); walze(g,.145,.02,0xff9a3a,-.2,.735,.7); strich(g,[-.2,.7,.7],[-.05,1.0,.76],.022,ROT);
      reif(g,.15,.022,ORANGE,-.2,.56,.7);
      /* Tropfen als Zeichen oben */
      box(g,.9,.14,.4,DUNKEL,0,2.7,0); ball(g,.3,0x7ae0ff,0,3.04,0); kegel(g,.252,.42,0x7ae0ff,0,3.34,0); ball(g,.08,WEISS,-.12,3.08,.25,1,1.4,.5);
      schein(g,'rgba(140,230,255,.35)',0,3.1,.2,1.5); } },
  { x:-6.0, z:7.0, steh:[-4.5,7.7], r:.72, treffer:[1.7,3.5,1.2], baue(g,k){ /* 10 Sternenlampe: Stehlampe mit großem leuchtendem Stern */
      walze(g,.65,.12,DUNKEL,0,.06,0); walze(g,.45,.12,METALL,0,.18,0); reif(g,.45,.04,GOLD,0,.24,0);
      walze(g,.08,1.75,METALL,0,1.1,0); [.55,1.2,1.85].forEach(y=>reif(g,.1,.035,GOLD,0,y,0));
      const stern=(r,tief,m,y,z)=>{ const f=new THREE.Shape(); for(let i=0;i<=10;i++){ const a=Math.PI/2+i*Math.PI/5, d=i%2?r*.46:r, x=Math.cos(a)*d, yy=Math.sin(a)*d; i?f.lineTo(x,yy):f.moveTo(x,yy); }
        const t=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tief,bevelEnabled:false}),m); t.position.set(0,y,z-tief/2); t.castShadow=false; g.add(t); return t; };
      stern(.86,.2,basis(0xf0a418),2.65,0); stern(.68,.28,basis(0xffe058),2.65,0); stern(.34,.34,basis(0xfff8c8),2.65,0);
      walze(g,.13,.16,GOLD,0,2.0,0); strich(g,[0,2.0,0],[0,2.32,0],.06,GOLD);
      const s=schein(g,'rgba(255,225,110,.6)',0,2.65,0,2.7);
      k.anim.push(t=>{ const f=2.6+Math.sin(t*2.2)*.25; s.scale.set(f,f,1); }); } }
];

return { titel:'Die Kommandobrücke', breite:36, tiefe:27, oben:WELTRAUM.OBEN, baue, gegenstaende, verstecke };
})();

/* Raum 2: Das Labor (hell, weiß-grünlich). Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: Glasschleuse an der Rückwand, zwei Glasschiebetüren gleiten zur Seite, dahinter wird es hell. */
RAEUME3D.raumschiff[1] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, BLAU, TUERKIS, ORANGE, ROT, GELB, GRUEN, GOLD } = WELTRAUM;
const MINT=0xb8e6cc, TANNE=0x2f8a5a, BLATT=0x46b04e, BLATT2=0x8ad850, LILA=0x9a6ae0, PINK=0xf070a8, ERDE=0x6a4428, GRAU=0xd4dee0;
const EX=-7;                       /* Mitte der Glasschleuse */

/* ---------- kleine Helfer ---------- */
/* leuchtende Farbe, je Farbton nur ein Material (weniger Zeichenaufrufe) */
const LEUCHT={}; const leucht=c=>LEUCHT[c]||(LEUCHT[c]=basis(c));
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* durchsichtiges Material (wird nicht verschmolzen) */
const glas=(c,a)=>new THREE.MeshLambertMaterial({color:c,transparent:true,opacity:a,depthWrite:false,side:THREE.DoubleSide});
/* glatte Scheibe aus Glas, ohne Schatten */
const scheibe=(p,w,h,d,m,x,y,z)=>{ const t=box(p,w,h,d,m,x,y,z); t.castShadow=false; return t; };
/* viele gleiche kleine Teile, bewegt (ein Zeichenaufruf) */
function schwarm(par,geo,material,anzahl){ const m=new THREE.InstancedMesh(geo,material,anzahl); m.frustumCulled=false; par.add(m); return m; }
/* Blasen, die in einem Bereich aufsteigen. orte: [x, yUnten, z, Höhe, Streuung x, Streuung z] */
function blasen(par,k,orte,je,groesse){
  const n=orte.length*je, m=schwarm(par,GEO.sph,basis(0xeafffa,{transparent:true,opacity:.8,depthWrite:false}),n), o=new THREE.Object3D(), D=[];
  orte.forEach(q=>{ for(let i=0;i<je;i++) D.push({ x:q[0]+(zufall()-.5)*2*q[4], y:q[1], z:q[2]+(zufall()-.5)*2*q[5], h:q[3], p:zufall(), v:.12+zufall()*.18, r:groesse*(.6+zufall()*.8) }); });
  const setze=t=>{ D.forEach((b,i)=>{ const f=(b.p+t*b.v)%1; o.position.set(b.x+Math.sin(t*3+i)*.03,b.y+f*b.h,b.z); o.scale.set(b.r,b.r,b.r); o.updateMatrix(); m.setMatrixAt(i,o.matrix); }); m.instanceMatrix.needsUpdate=true; };
  setze(0); k.anim.push(setze); return m;
}

/* ---------- leuchtende Glasröhre mit Kletterpflanze ---------- */
function roehre(k,x,z,i,sammel,glaeser){ /* sammel: gemeinsame Gruppe für die hinteren Röhren (weniger Zeichenaufrufe) */
  const g=gruppe(sammel||k.scene,x,0,z), akz=[TANNE,TUERKIS,LILA][i%3], licht=[0x9affb0,0x8af4ff,0xe0b8ff][i%3];
  walze(g,.74,.34,METALL2,0,.17,0); walze(g,.66,.14,akz,0,.41,0); reif(g,.62,.045,leucht(licht),0,.5,0);
  walze(g,.5,.08,ERDE,0,.52,0);
  let alt=[0,.55,0];
  for(let j=1;j<=9;j++){ const a=j*1.9+i, p=[Math.cos(a)*.17,.55+j*.32,Math.sin(a)*.17]; strich(g,alt,p,.04,TANNE); alt=p;
    [0,1].forEach(s=>{ const w=a+s*3.14+.5, l=ball(g,.17-(j%3)*.02,(j+s)%2?BLATT:BLATT2,p[0]+Math.cos(w)*.2,p[1]+s*.09,p[2]+Math.sin(w)*.2,1.35,.32,.75); l.rotation.set(0,-w,.35); });
    if(j%3===0) ball(g,.075,[PINK,GELB,ORANGE][(i+j/3)%3],p[0]+Math.cos(a)*.3,p[1]+.12,p[2]+Math.sin(a)*.3); }
  if(glaeser){ const o=new THREE.Object3D(); o.position.set(x,2.15,z); o.scale.set(.6,3.35,.6); o.updateMatrix(); glaeser.setMatrixAt(i,o.matrix); }
  else walze(g,.6,3.35,glas(licht,.2),0,2.15,0).castShadow=false;
  [-.5,.5].forEach(a=>strich(g,[a,.5,.34],[a,3.82,.34],.012,0xffffff));
  walze(g,.7,.2,METALL2,0,3.92,0); walze(g,.5,.16,akz,0,4.08,0); ball(g,.26,leucht(licht),0,4.15,0,1,.55,1);
  if(!sammel) verschmelze(g);
  schein(g,['rgba(150,255,170,.3)','rgba(140,240,255,.3)','rgba(220,180,255,.3)'][i%3],0,2.2,0,2.7);
  k.kreis(x,z,.76); if(!sammel) k.verdecker(g,x,z,.75);
}

/* ---------- Labortisch an der Seitenwand (s: -1 links, 1 rechts) ---------- */
function labortisch(k,s,z,art){
  const x=s*16.75, g=gruppe(k.scene,x,0,z), front=-s*.7;
  box(g,1.2,.14,4.2,METALL2,s*.1,.07,0); box(g,1.34,.82,4.3,WEISS,0,.55,0); box(g,1.52,.14,4.5,[TANNE,0x3a7a9a,0x6a5aa8,TANNE][art],0,1.03,0);
  [-1.45,0,1.45].forEach(a=>{ box(g,.05,.62,1.28,MINT,front,.55,a); box(g,.07,.07,.5,METALL2,front-s*.04,.72,a); });
  if(art===0){ /* Waschbecken mit Wasserhahn und Seifenspender */
    box(g,.9,.03,1.3,METALL2,0,1.115,-.8); box(g,.7,.035,1.1,0x6ab8d8,0,1.125,-.8);
    walze(g,.07,.5,METALL,s*.55,1.35,-.8); const h=ring(g,.25,.05,METALL,s*.3,1.6,-.8,Math.PI); h.rotation.y=0; [-.3,.3].forEach(a=>walze(g,.08,.14,a<0?BLAU:ROT,s*.55,1.17,-.8+a));
    walze(g,.16,.42,PINK,s*.35,1.31,.3); walze(g,.04,.16,METALL2,s*.35,1.58,.3); box(g,.22,.05,.07,METALL2,s*.27,1.66,.3);
    [0xffd23a,0x58b8e8,0xe0443a].forEach((f,i)=>box(g,.65,.62-i*.07,.2,f,s*.15,1.41-i*.035,1.1+i*.24)); }
  if(art===1){ /* Gelenklampe und Schutzbrillen */
    walze(g,.28,.1,DUNKEL,s*.35,1.15,-1.35); strich(g,[s*.35,1.15,-1.35],[s*.45,2.0,-1.2],.045,METALL); strich(g,[s*.45,2.0,-1.2],[-s*.15,2.15,-.85],.045,METALL);
    const sch=kegel(g,.3,.34,ORANGE,-s*.2,2.04,-.8); sch.rotation.z=-s*.4; ball(g,.13,leucht(0xfff6c0),-s*.26,1.9,-.78); ball(g,.07,METALL2,s*.45,2.0,-1.2);
    [.1,.95].forEach((a,i)=>{ [-.2,.2].forEach(b=>{ const r=ring(g,.15,.04,i?ORANGE:BLAU,-s*.15,1.28,a+b); r.rotation.y=Math.PI/2; }); strich(g,[-s*.15,1.31,a-.06],[-s*.15,1.31,a+.06],.025,DUNKEL); strich(g,[-s*.15,1.3,a-.34],[s*.25,1.14,a-.34],.025,DUNKEL); strich(g,[-s*.15,1.3,a+.34],[s*.25,1.14,a+.34],.025,DUNKEL); });
    box(g,.55,.28,.8,TUERKIS,s*.2,1.24,1.6); box(g,.57,.06,.82,WEISS,s*.2,1.38,1.6); }
  if(art===2){ /* Schlauchspirale zwischen zwei Anschlüssen, Drehregler */
    [-1.4,.4].forEach(a=>{ box(g,.5,.34,.4,METALL2,s*.1,1.27,a); ball(g,.11,ORANGE,s*.1,1.5,a); });
    let alt=[s*.1,1.4,-1.4]; for(let i=0;i<=72;i++){ const a=i*Math.PI/6, q=[s*.1+Math.sin(a)*.24,1.4-Math.cos(a)*.23+(i<3||i>69?.2:0),-1.2+i*.0195]; strich(g,alt,q,.04,Math.floor(i/12)%2?ORANGE:GELB); alt=q; } strich(g,alt,[s*.1,1.4,.4],.04,GELB);
    box(g,.55,.16,1.35,GRAU,s*.1,1.18,1.35); [[-.42,ORANGE],[0,TUERKIS],[.42,LILA]].forEach(([a,f])=>{ walze(g,.11,.14,f,s*.1,1.33,1.35+a); box(g,.18,.025,.03,WEISS,s*.1,1.41,1.35+a); }); }
  if(art===3){ /* Bücher, Kolben und kleiner Greifer */
    [BLAU,ROT,GELB,TANNE,LILA,ORANGE].forEach((f,i)=>{ const h=.55+(i%3)*.08; box(g,.6,h,.2,f,s*.2,1.1+h/2,-1.7+i*.22); });
    /* zwei bauchige Kolben mit bunter Flüssigkeit */
    [[.05,0x3ac8f0,1],[.75,0xf070a8,.82]].forEach(([a,f,gr])=>{ const q=gruppe(g,-s*.1,1.1,a); q.scale.set(gr,gr,gr); rohr(q,.19,.27,.22,leucht(f),0,.12,0);
      rohr(q,.09,.3,.48,glas(0xdff8ff,.4),0,.24,0).castShadow=false; walze(q,.09,.24,glas(0xdff8ff,.5),0,.59,0).castShadow=false; reif(q,.1,.022,0xf4fcff,0,.71,0); });
    walze(g,.25,.14,DUNKEL,s*.2,1.17,1.6); strich(g,[s*.2,1.2,1.6],[0,1.75,1.55],.07,METALL); ball(g,.12,ORANGE,0,1.75,1.55); [-.13,.13].forEach(a=>strich(g,[0,1.75,1.55],[-s*.3,1.9,1.55+a],.035,METALL2)); }
  verschmelze(g); k.kasten(x,z,1.55,4.55);
}

/* ---------- offene Pflanzsäule mit Erdbeeren in drei Etagen ---------- */
function pflanzsaeule(k,x,z,start){
  const g=gruppe(k.scene,x,0,z);
  walze(g,.7,.18,METALL2,0,.09,0); walze(g,.48,.3,TUERKIS,0,.32,0); walze(g,.12,1.9,WEISS,0,1.35,0);
  [[.75,.62],[1.35,.52],[1.95,.42]].forEach(([y,r],e)=>{ rohr(g,r,r*.6,.2,WEISS,0,y,0); walze(g,r*.9,.04,ERDE,0,y+.1,0); reif(g,r,.035,TANNE,0,y+.1,0);
    for(let i=0;i<7;i++){ const a=i*.898+e+start, px=Math.cos(a), pz=Math.sin(a), b=ball(g,.19,(i+e)%2?BLATT:BLATT2,px*r*.85,y+.22,pz*r*.85,1.25,.4,.75); b.rotation.set(0,-a,.35);
      if(i%2===0){ strich(g,[px*r*.9,y+.17,pz*r*.9],[px*(r+.14),y+.04,pz*(r+.14)],.018,TANNE); ball(g,.085,0xe8302a,px*(r+.15),y-.02,pz*(r+.15),.9,1.15,.9); } } });
  ball(g,.2,BLATT2,0,2.38,0,1,.8,1); ball(g,.12,leucht(0xb8f4ff),0,2.55,0);
  verschmelze(g); k.kreis(x,z,.74); k.verdecker(g,x,z,.65);
}

/* ---------- drehbarer Hocker ---------- */
function hocker(g,k,x,z,f){
  walze(g,.38,.08,DUNKEL,x,.05,z); walze(g,.07,.6,METALL,x,.37,z); reif(g,.27,.035,METALL2,x,.28,z); strich(g,[x-.27,.28,z],[x+.27,.28,z],.022,METALL2); strich(g,[x,.28,z-.27],[x,.28,z+.27],.022,METALL2); walze(g,.38,.16,f,x,.74,z); reif(g,.36,.05,f,x,.81,z); k.kreis(x,z,.42);
}

function baue(k){
  const sc=k.scene;
  const h=WELTRAUM.huelle(k,{ B:36, T:27, H:6, wand:[190,214,202], boden:[162,184,176], strebe:0x8aa89c, leuchte:0x8affb0,
    himmel:0xf0fff6, grund:0x5a7468, staerke:.74, sonne:0xf4fff4, sonneStaerke:.32, pfosten:[-14.35,-11.25,5.35,8.75,13.4] });
  const B=h.B, T=h.T, hinten=h.hinten, links=h.links, rechts=h.rechts;

  /* ---------- Ausgang: Glasschleuse ---------- */
  const bau=gruppe(sc,EX,0,0);
  box(bau,7.1,.5,1.25,METALL2,0,3.85,-12.9); box(bau,7.2,.14,1.35,TANNE,0,4.17,-12.9); box(bau,6.6,.1,.08,leucht(0x9affc0),0,3.68,-12.26);
  [-1,1].forEach(s=>{ box(bau,.34,3.75,1.2,METALL2,s*3.38,1.87,-12.9); box(bau,.46,.3,1.32,TANNE,s*3.38,.15,-12.9);
    box(bau,.18,3.6,.2,TANNE,s*1.72,1.8,-12.38); box(bau,1.6,.16,.14,TANNE,s*2.5,1.2,-12.38); box(bau,1.6,.3,.16,METALL2,s*2.5,.15,-12.38);
    scheibe(bau,1.58,3.3,.05,glas(0x9ae8e0,.22),s*2.5,1.95,-12.4);
    [1.9,2.4].forEach(y=>strich(bau,[s*2.2,y,-12.35],[s*2.75,y+.7,-12.35],.018,0xffffff)); });
  box(bau,3.5,.07,1.2,METALL2,0,.036,-12.9); [-12.5,-12.85,-13.2].forEach(z=>box(bau,3.2,.02,.07,leucht(0x9affc0),0,.082,z));
  /* Pfosten für das Zahlenschloss, rechts neben der Schleuse */
  box(bau,.3,1.9,.3,METALL2,3.95,.95,-12.55); box(bau,.55,.16,.55,TANNE,3.95,.08,-12.55); box(bau,1.05,.85,.16,TANNE,3.95,2.3,-12.46);
  strich(bau,[3.4,3.1,-12.6],[3.95,2.75,-12.46],.05,DUNKEL);
  verschmelze(bau);
  k.kasten(EX+.3,-12.8,8.1,1.4);
  /* Gang hinter den Türen */
  const gang=bild(256,256,g=>{ g.fillStyle='#d8fff0'; g.fillRect(0,0,256,256);
    for(let i=0;i<6;i++){ const a=i*17; g.fillStyle=['#8ac8b8','#9ad8c6','#aae4d2','#bcf0de','#d0faea','#ecfff6'][i]; g.fillRect(a,a,256-2*a,256-a-a*.45); g.strokeStyle='#4a9a80'; g.lineWidth=3; g.strokeRect(a,a,256-2*a,256-a-a*.45); }
    const v=g.createRadialGradient(128,108,4,128,108,80); v.addColorStop(0,'#ffffff'); v.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=v; g.fillRect(40,20,176,180); });
  const gangM=new THREE.MeshBasicMaterial({map:gang,color:0x4a6a70});
  const gangF=new THREE.Mesh(new THREE.PlaneGeometry(3.4,3.55),gangM); gangF.position.set(EX,1.82,-13.38); sc.add(gangF);
  /* die zwei Schiebetüren */
  const tueren=[-1,1].map(s=>{ const t=gruppe(sc,EX+s*.81,0,-12.66);
    [-.76,.76].forEach(x=>box(t,.1,3.5,.1,WEISS,x,1.83,0)); [.14,3.52].forEach(y=>box(t,1.62,.14,.1,WEISS,0,y,0)); box(t,1.5,.1,.08,TUERKIS,0,1.15,0);
    box(t,.12,.9,.14,ORANGE,-s*.56,1.85,.08);
    scheibe(t,1.46,3.25,.04,glas(0xa8f0f0,.34),0,1.83,0);
    [[-.5,2.2],[-.3,2.0]].forEach(([x,y])=>strich(t,[x*s,y,.05],[(x+.55)*s,y+.8,.05],.02,0xffffff));
    verschmelze(t); return t; });
  /* Pfeil über der Tür und zwei Lampen: erst rot, beim Öffnen grün */
  const pfeil=gruppe(sc,EX,3.9,-12.22); const pm=leucht(0xffffff);
  box(pfeil,.18,.22,.05,pm,0,-.08,0); const sp=kegel(pfeil,.26,.24,pm,0,.13,0); sp.scale.z=.04; verschmelze(pfeil);
  const lampeM=basis(0xff5a4a);
  const lampen=gruppe(sc,EX,0,0); [-2.5,-1.7,1.7,2.5].forEach(x=>ball(lampen,.13,lampeM,x,3.88,-12.25,1,1,.6)); verschmelze(lampen);
  const schloss=WELTRAUM.zahlenschloss(sc,EX+3.95,2.3,-12.24); verschmelze(schloss);
  const frei=gruppe(sc,EX+3.95,2.3,-12.35); frei.visible=false; ring(frei,.27,.05,WEISS,0,0,.02); ball(frei,.23,leucht(0x4aff6a),0,0,0,1,1,.5); ball(frei,.06,leucht(0xe8ffe8),-.07,.08,.11); verschmelze(frei);
  const hell=new THREE.PointLight(0xe8fff0,0,13,1.5); hell.position.set(EX,2.8,-11.9); sc.add(hell);
  const fleckM=basis(0xd8ffe8,{transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  const fleck=new THREE.Mesh(new THREE.CircleGeometry(1.7,28),fleckM); fleck.rotation.x=-Math.PI/2; fleck.position.set(EX,.1,-11.3); fleck.visible=false; sc.add(fleck);
  const strahlen=schein(sc,'rgba(220,255,235,.8)',EX,2,-13.1,4.6); strahlen.visible=false;
  const tuer=ausgang(k,{ name:'Glasschleuse', einfach:'Tür aus Glas', steh:[EX,-10.9], durch:[EX,-12.95],
    treffer:{x:EX+.35,y:2.15,z:-12.55,b:8,h:4.3,t:1.3}, schildOben:[EX,4.5,-12], glanz:[EX+3.95,2.35,-11.95],
    bewege:(auf)=>{ tueren[0].position.x=EX-.81-auf*1.58; tueren[1].position.x=EX+.81+auf*1.58; schloss.visible=auf<.04; frei.visible=!schloss.visible;
      lampeM.color.setHex(auf>.1?0x5aff7a:0xff5a4a); gangM.color.setRGB(.29+.71*auf,.42+.58*auf,.44+.56*auf);
      hell.intensity=1.4*auf; fleckM.opacity=.4*auf; fleck.visible=auf>.02; strahlen.visible=auf>.1; strahlen.material.opacity=.7*auf; } });

  /* ---------- Glasröhren mit Pflanzen und Blubberblasen ---------- */
  const ROHRE=[[-15.9,-11.9],[-12.7,-12.1],[-1.35,-12.3],[7.2,-12.2],[16.3,-12.1],[-16.3,1.8],[16.4,.7],[-16.3,11.7],[16.3,11.7]];
  const hintere=gruppe(sc,0,0,0), glaeser=schwarm(sc,GEO.cyl,glas(0xb8ffe0,.2),5);
  ROHRE.forEach((p,i)=>roehre(k,p[0],p[1],i,i<5?hintere:null,i<5?glaeser:null));
  verschmelze(hintere);
  blasen(sc,k,ROHRE.map(p=>[p[0],.6,p[1],3.1,.36,.36]),9,.055);
  [[-13.6,-10.6,0x8affb0],[7.2,-10.8,0x8af4ff],[-14.6,2,0xd8b0ff]].forEach(([x,z,f])=>{ const l=new THREE.PointLight(f,.45,10,1.5); l.position.set(x,2.6,z); sc.add(l); });

  /* ---------- Labortische und Hocker ---------- */
  labortisch(k,-1,-6.8,0); labortisch(k,-1,7,1); labortisch(k,1,-3.8,2); labortisch(k,1,6.9,3);
  const sitze=gruppe(sc,0,0,0);
  hocker(sitze,k,-14.9,-5.8,ORANGE); hocker(sitze,k,-14.8,6.2,TUERKIS); hocker(sitze,k,14.8,-4.6,LILA); hocker(sitze,k,14.9,7.9,ORANGE);
  verschmelze(sitze);

  /* ---------- drehendes Erbgut-Modell (Doppelspirale) ---------- */
  const dna=gruppe(sc,.8,0,-.8);
  walze(dna,.92,.2,METALL2,0,.1,0); walze(dna,.72,.34,WEISS,0,.37,0); reif(dna,.74,.05,leucht(0x8affb0),0,.5,0); walze(dna,.1,.4,METALL,0,.72,0);
  verschmelze(dna);
  const spirale=gruppe(dna,0,.9,0);
  for(let i=0;i<14;i++){ const a=i*.52, y=i*.18, p=[Math.cos(a)*.55,y,Math.sin(a)*.55], q=[-p[0],y,-p[2]];
    ball(spirale,.13,BLAU,p[0],p[1],p[2]); ball(spirale,.13,PINK,q[0],q[1],q[2]); strich(spirale,p,[0,y,0],.035,i%2?GELB:GRUEN); strich(spirale,[0,y,0],q,.035,i%2?ORANGE:LILA);
    if(i){ const b=a-.52, v=[Math.cos(b)*.55,y-.18,Math.sin(b)*.55]; strich(spirale,v,p,.04,WEISS); strich(spirale,[-v[0],v[1],-v[2]],q,.04,WEISS); } }
  verschmelze(spirale);
  k.anim.push(t=>{ spirale.rotation.y=t*.45; });
  k.kreis(.8,-.8,.95); k.verdecker(dna,.8,-.8,.8);

  /* ---------- Molekül-Modell auf einem Ständer ---------- */
  const mol=gruppe(sc,-8.2,0,6.3);
  walze(mol,.75,.16,METALL2,0,.08,0); walze(mol,.55,.14,TANNE,0,.23,0); walze(mol,.09,1.2,METALL,0,.87,0);
  verschmelze(mol);
  const kugeln=gruppe(mol,0,1.75,0);
  ball(kugeln,.36,ROT,0,0,0);
  [[.75,.38,0,WEISS],[-.6,.5,.4,WEISS],[-.2,-.35,-.75,BLAU],[.15,-.3,.75,GELB],[-.15,.75,-.35,GRUEN]].forEach(([x,y,z,f])=>{ strich(kugeln,[0,0,0],[x,y,z],.06,METALL); ball(kugeln,.22,f,x,y,z); });
  verschmelze(kugeln);
  k.anim.push(t=>{ kugeln.rotation.y=-t*.35; kugeln.rotation.z=Math.sin(t*.6)*.15; });
  k.kreis(-8.2,6.3,.82); k.verdecker(mol,-8.2,6.3,.8);

  /* ---------- Greifarm-Roboter, sortiert einen Leuchtwürfel ---------- */
  const arm=gruppe(sc,-8.1,0,-2.4);
  walze(arm,.8,.24,METALL2,0,.12,0); walze(arm,.55,.4,ORANGE,0,.44,0); reif(arm,.57,.05,DUNKEL,0,.34,0);
  verschmelze(arm);
  const dreh=gruppe(arm,0,.7,0); ball(dreh,.28,DUNKEL,0,0,0); strich(dreh,[0,0,0],[-.35,1.25,0],.14,ORANGE); ball(dreh,.2,DUNKEL,-.35,1.25,0); verschmelze(dreh);
  const vorn=gruppe(dreh,-.35,1.25,0); strich(vorn,[0,0,0],[1.1,.15,0],.11,WEISS); ball(vorn,.14,ORANGE,1.1,.15,0);
  strich(vorn,[1.1,.15,0],[1.1,-.1,0],.06,METALL2); box(vorn,.12,.08,.46,METALL2,1.1,-.12,0); [-.2,.2].forEach(z=>box(vorn,.12,.3,.07,METALL2,1.1,-.28,z));
  box(vorn,.26,.26,.26,leucht(0x70f0ff),1.1,-.34,0); verschmelze(vorn);
  k.anim.push(t=>{ dreh.rotation.y=Math.sin(t*.45)*2.2; vorn.rotation.z=Math.sin(t*.9)*.22-.05; });
  k.kreis(-8.1,-2.4,.85); k.verdecker(arm,-8.1,-2.4,.8);

  /* ---------- vorn: Sitzbank, Ladestation, Pumpe mit Rohren, Ventilator, Kugellampen ---------- */
  const bank=gruppe(sc,-4.3,0,11.7);
  [-1.2,1.2].forEach(x=>{ box(bank,.2,.5,.65,METALL2,x,.25,0); }); box(bank,3,.14,.8,WEISS,0,.56,0); [-.99,0,.99].forEach(x=>box(bank,.92,.12,.7,TANNE,x,.68,0));
  verschmelze(bank); k.kasten(-4.3,11.7,3.05,.85);
  const lade=gruppe(sc,-8.9,0,11.95); lade.rotation.y=Math.PI; /* Vorderseite zeigt in den Raum */
  box(lade,1.7,.1,1.1,METALL2,0,.05,0); box(lade,1.4,.03,.16,leucht(0x70f0ff),0,.115,-.15); box(lade,1.4,1.1,.34,WEISS,0,.65,.35); box(lade,1.5,.14,.44,TUERKIS,0,1.27,.35);
  const blitz=leucht(GELB); strich(lade,[.12,1.05,.16],[-.14,.72,.16],.05,blitz); strich(lade,[-.14,.72,.16],[.14,.72,.16],.05,blitz); strich(lade,[.14,.72,.16],[-.12,.38,.16],.05,blitz);
  verschmelze(lade); k.kasten(-8.9,11.95,1.75,1.15);
  const pumpe=gruppe(sc,8.6,0,11.75);
  box(pumpe,3.5,.14,1.2,METALL2,0,.07,0);
  [-1.15,1.15].forEach((x,i)=>{ walze(pumpe,.38,.8,i?BLAU:TANNE,x,.54,0); ball(pumpe,.38,i?BLAU:TANNE,x,.94,0,1,.5,1); reif(pumpe,.39,.045,METALL,x,.4,0); });
  const quer=walze(pumpe,.13,1.7,METALL,0,.55,0); quer.rotation.z=Math.PI/2; [-.3,.3].forEach(x=>{ const r=ring(pumpe,.17,.05,ORANGE,x,.55,0); r.rotation.y=Math.PI/2; });
  strich(pumpe,[-1.15,1.1,0],[-1.15,1.45,0],.08,METALL); strich(pumpe,[-1.15,1.45,0],[1.15,1.45,0],.08,METALL); strich(pumpe,[1.15,1.45,0],[1.15,1.1,0],.08,METALL); [-1.15,1.15].forEach(x=>ball(pumpe,.12,ORANGE,x,1.45,0));
  verschmelze(pumpe); k.kasten(8.6,11.75,3.55,1.25);
  const lauf=[0,1,2].map(()=>{ const b=ball(sc,.11,leucht(0x8affd0),8.6,13.2,11.75); b.castShadow=false; return b; });
  k.anim.push(t=>{ lauf.forEach((b,i)=>b.position.set(8.6-1.05+((t*.6+i/3)%1)*2.1,1.45,11.75)); });
  const vent=gruppe(sc,13,0,11.8);
  walze(vent,.55,.14,METALL2,0,.07,0); walze(vent,.1,1.2,METALL,0,.7,0); ball(vent,.24,TUERKIS,0,1.4,-.12); ring(vent,.68,.05,METALL,0,1.4,.14); [0,1,2,3].forEach(i=>{ const a=i*Math.PI/4; strich(vent,[Math.cos(a)*.68,1.4+Math.sin(a)*.68,.2],[-Math.cos(a)*.68,1.4-Math.sin(a)*.68,.2],.012,METALL2); });
  verschmelze(vent);
  const fluegel=gruppe(vent,0,1.4,.1); [0,1,2].forEach(i=>{ const a=gruppe(fluegel,0,0,0); a.rotation.z=i*2.094; ball(a,.26,WEISS,0,.32,0,.75,1.15,.12); }); ball(fluegel,.12,ORANGE,0,0,.04); verschmelze(fluegel);
  k.anim.push(t=>{ fluegel.rotation.z=t*5; });
  k.kreis(13,11.8,.72);
  const kugel=gruppe(sc,0,0,0);
  [[-13.2,12.2],[-1.2,12.4],[4.4,12.3],[17,-8.2],[-17,-1.7]].forEach(([x,z],i)=>{ walze(kugel,.3,.12,METALL2,x,.06,z); walze(kugel,.07,.75,METALL,x,.45,z); walze(kugel,.17,.1,TANNE,x,.84,z); ball(kugel,.27,leucht([0xb8ffd0,0xc8f8ff,0xfff4b8][i%3]),x,1.1,z); k.kreis(x,z,.32); });
  verschmelze(kugel);

  /* ---------- Pflanzsäulen und Blitzkugel (füllen vorn und hinten die Mitte) ---------- */
  pflanzsaeule(k,1.5,-5.7,0); pflanzsaeule(k,6.1,9.3,1.3);
  const blitzer=gruppe(sc,-1.9,0,7.3);
  walze(blitzer,.72,.16,METALL2,0,.08,0); rohr(blitzer,.34,.52,.7,0x5a4a90,0,.5,0); reif(blitzer,.42,.04,leucht(0xd0a0ff),0,.62,0); walze(blitzer,.46,.16,METALL,0,.92,0);
  walze(blitzer,.06,.55,METALL2,0,1.25,0); verschmelze(blitzer);
  const funken=gruppe(blitzer,0,1.55,0); ball(funken,.15,leucht(0xf0d8ff),0,0,0);
  for(let i=0;i<7;i++){ const a=i*2.4, h=-.3+(i%4)*.28, w=Math.sqrt(1-h*h), e=[Math.cos(a)*w*.6,h*.6,Math.sin(a)*w*.6], m=[e[0]*.5+Math.sin(a*3)*.1,e[1]*.5+.09,e[2]*.5+Math.cos(a*3)*.1];
    strich(funken,[0,0,0],m,.022,leucht(0xc080ff)); strich(funken,m,e,.018,leucht(0x80d8ff)); ball(funken,.045,leucht(0xe8f8ff),e[0],e[1],e[2]); }
  verschmelze(funken);
  ball(blitzer,.64,glas(0xc8b8ff,.22),0,1.55,0).castShadow=false;
  schein(blitzer,'rgba(200,150,255,.35)',0,1.55,0,2);
  k.anim.push(t=>{ funken.rotation.y=t*1.3; funken.rotation.z=Math.sin(t*2.1)*.35; });
  k.kreis(-1.9,7.3,.75); k.verdecker(blitzer,-1.9,7.3,.65);

  /* ---------- Boden: Leuchtlinien, Sechsecke, Weg zur Schleuse ---------- */
  const linien=gruppe(sc,0,0,0);
  const sechseck=(x,z,r,f,y)=>{ const m=new THREE.Mesh(new THREE.RingGeometry(r-.09,r,6),leucht(f)); m.rotation.x=-Math.PI/2; m.position.set(x,y,z); linien.add(m); };
  [[.8,-.8,2.1,0x5ae08a],[.8,-.8,2.5,0xd8fff0],[-8.2,6.3,1.5,0x58c8d8],[-8.1,-2.4,1.65,0xf0a040],[-1.9,7.3,1.25,0x5ae08a],[6.1,9.3,1.15,0x58c8d8],[9.4,-8.4,1.1,0x5ae08a],[1.5,-5.7,1.15,0x58c8d8],[-14,12,.7,0x58c8d8]].forEach(([x,z,r,f],i)=>sechseck(x,z,r,f,.012+(i%2)*.01));
  [-1,1].forEach(s=>{ box(linien,.09,.012,2.2,leucht(0x5ae08a),EX+s*1.75,.012,-11.0); });
  [-9.4,-8.7,-8.0].forEach(z=>[-1,1].forEach(s=>{ const m=box(linien,.75,.012,.12,leucht(0x5ae08a),EX+s*.27,.016+(s>0?.009:0),z); m.rotation.y=s*.6; }));
  [[-15.2,-6.8,4.4],[-15.2,7,4.4],[15.2,-3.8,4.4],[15.2,6.9,4.4]].forEach(([x,z,l])=>box(linien,.08,.012,l,leucht(0x58c8d8),x+(x<0?-.35:.35),.014,z));
  linien.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
  verschmelze(linien);

  /* ---------- Wandschmuck: Bullaugen, Rohre, Messuhren, Lüftungsgitter, Schläuche ---------- */
  const wh=gruppe(hinten,0,0,0), wl=gruppe(links,0,0,0), wr=gruppe(rechts,0,0,0);
  const sterne=new THREE.MeshBasicMaterial({map:WELTRAUM.sternBild(256,256,90)});
  [[wl,-1],[wr,1]].forEach(([w,s])=>{
    const q=gruppe(w,s*(B/2-.04),0,0); q.rotation.y=-s*Math.PI/2; /* örtlich: x entlang der Wand, z in den Raum */
    const lz=z=>s*z;
    [-6.8,7].forEach(z=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(.85,32),sterne); m.position.set(lz(z),3.4,.03); q.add(m); ring(q,.92,.13,METALL,lz(z),3.4,.08); ring(q,1.1,.05,TANNE,lz(z),3.4,.06);
      for(let i=0;i<8;i++){ const a=i*.785+.39; ball(q,.06,DUNKEL,lz(z)+Math.cos(a)*.93,3.4+Math.sin(a)*.93,.2); } });
    [[4.75,TANNE],[5.15,0x3a8ac0]].forEach(([y,f])=>{ strich(q,[-13.2,y,.5],[13.2,y,.5],.11,f); [-11,-5,0,5,11].forEach(x=>{ const r=ring(q,.13,.05,METALL,x,y,.5); r.rotation.y=Math.PI/2; box(q,.1,.1,.5,METALL2,x+.3,y,.25); }); });
    [-1.1,0,1.1].forEach((a,i)=>{ const x=lz(-.6)+a, y=2.5+(i===1?.45:0); const r=walze(q,.42,.1,WEISS,x,y,.07); r.rotation.x=Math.PI/2; ring(q,.43,.06,METALL2,x,y,.13); const w2=i*1.7+s; strich(q,[x,y,.15],[x+Math.cos(w2)*.3,y+Math.sin(w2)*.3,.15],.022,ROT); ball(q,.05,DUNKEL,x,y,.16); strich(q,[x,y+.43,.1],[x,4.7,.35],.04,METALL); });
    [-11.2,11].forEach(z=>{ box(q,1.7,1.1,.08,METALL2,lz(z),1.5,.05); for(let i=0;i<5;i++) box(q,1.45,.09,.08,DUNKEL,lz(z),1.13+i*.19,.09); });
    [[-3.9,ORANGE],[4.6,TUERKIS]].forEach(([z,f])=>{ [0,1,2].forEach(i=>ring(q,.55-i*.07,.055,f,lz(z),2.3-i*.02,.12+i*.07)); box(q,.2,.34,.3,METALL2,lz(z),2.88,.16); strich(q,[lz(z)+.5,2.2,.14],[lz(z)+.62,1.5,.14],.055,f); ball(q,.09,METALL,lz(z)+.62,1.47,.14); });
  });
  [[-17.4,-10.75],[-3.2,-.4]].forEach(([a,b])=>{ strich(wh,[a,5.2,-T/2+.5],[b,5.2,-T/2+.5],.11,TANNE); });
  [-2.9,-.7].forEach(x=>{ box(wh,.14,.14,.55,METALL2,x,5.2,-T/2+.25); });
  strich(wh,[-17.4,5.55,-T/2+.5],[17.4,5.55,-T/2+.5],.1,0x3a8ac0);
  strich(wh,[4.9,5.2,-T/2+.5],[17.4,5.2,-T/2+.5],.11,TANNE);
  [-16,-12,-2,6,10,16].forEach(x=>{ const r=ring(wh,.15,.05,METALL,x,5.55,-T/2+.5); r.rotation.y=Math.PI/2; box(wh,.1,.1,.5,METALL2,x+.3,5.55,-T/2+.25); });
  [[6.6,3.9],[14.7,2.2]].forEach(([x,y])=>{ box(wh,1.1,.75,.1,METALL2,x,y,-T/2+.07); [-.28,0,.28].forEach((a,i)=>ball(wh,.1,leucht([0x70ff90,0xffd23a,0x70f0ff][i]),x+a,y,-T/2+.15,1,1,.6)); });
  [wh,wl,wr].forEach(verschmelze);

  /* ---------- Kleinteile am Boden: Bodenschrauben ---------- */
  const o=new THREE.Object3D(), schrauben=schwarm(sc,GEO.cyl,mat(0x5a746c),200);
  for(let i=0;i<200;i++){ o.position.set(-17+(i%20)*1.79,.006,-12.2+Math.floor(i/20)*2.7); o.scale.set(.065,.008,.065); o.updateMatrix(); schrauben.setMatrixAt(i,o.matrix); }

  /* ---------- Leben: zwei Messdrohnen und zwei Bordroboter ---------- */
  WELTRAUM.drohne(k,-5.2,1.2,2.6,3.4,.5,0);
  WELTRAUM.drohne(k,7.6,.6,2.4,3.7,-.42,2.5);
  WELTRAUM.roboter(k,[[-10.3,.6],[-10.2,-6.8],[-7,-8.6],[-.5,-8.4],[4.6,-7.4],[4.4,-2.6],[3.6,1.8],[-2,.2],[-6.2,.4]],1.15,0);
  WELTRAUM.roboter(k,[[7.6,.2],[8.6,2.6],[8.2,8.4],[11.6,9.4],[13.6,7.4],[14.4,5.1],[14.7,2.4],[14.3,-.2],[11,-1.6]],.95,7,MINT);

  return { tuer, start:[0,9.5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-14.4,-10.6],[-10.9,-10.4],[-.6,-10.6],[5.6,-12.4],[16.4,-10.1],[16.9,-6.6],[17,2.8],[14.6,11.9],[10.8,12.3],[3,11.4],
  [-6.6,12.4],[-14.8,12.3],[-17,4.2],[-17,-3.4],[-14.2,-7.9],[-9.6,-4.2],[-3.6,-8.4],[2.2,-2.9],[9.4,-6.8],[-10.4,5.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-12.4, z:-3.4, steh:[-12.4,-1.75], kasten:[2.5,1.6], treffer:[2.5,3.15,1.6], baue(g){ /* 1 Mikroskop auf einem Tisch */
      [-1,1].forEach(a=>[-.58,.58].forEach(z=>walze(g,.08,.86,METALL2,a*1.05,.43,z)));
      box(g,2.4,.14,1.45,0x3a7a9a,0,.92,0); box(g,2.25,.08,1.3,WEISS,0,1.02,0);
      const m=gruppe(g,0,1.06,0); m.rotation.y=-.95; m.scale.set(1.12,1.12,1.12); /* schräg gedreht, damit die Seitenansicht zu sehen ist */
      box(m,1.0,.14,.72,DUNKEL,0,.07,0); box(m,.5,.1,.52,TANNE,-.22,.19,0);
      /* gebogener Arm */
      [[[-.34,.18,0],[-.48,.5,0]],[[-.48,.5,0],[-.46,.86,0]],[[-.46,.86,0],[-.2,1.12,0]]].forEach(q=>{ strich(m,q[0],q[1],.12,TANNE); ball(m,.13,TANNE,q[1][0],q[1][1],q[1][2]); });
      /* Tisch zum Auflegen mit Glasplättchen, darunter das Lämpchen */
      box(m,.72,.07,.64,DUNKEL,.1,.52,0); strich(m,[-.45,.5,0],[-.2,.52,0],.07,DUNKEL); box(m,.34,.025,.16,0x9ae8f0,.15,.567,0); [-.16,.16].forEach(z=>box(m,.28,.025,.04,METALL,.2,.58,z));
      walze(m,.15,.14,METALL,.15,.21,0); ball(m,.1,leucht(0xffe880),.15,.3,0,1,.5,1);
      /* Objektive an der Drehscheibe */
      walze(m,.19,.1,METALL2,.13,.93,0); [[.13,0,0],[.26,.09,.42],[.01,-.1,-.42]].forEach(([x,z,n],i)=>{ const o=walze(m,.07,.26,i?METALL:GELB,x,.76,z*.9); o.rotation.z=n; walze(m,.045,.07,DUNKEL,x+n*.14,.63,z*.9).rotation.z=n; });
      /* schräger Tubus mit Okular */
      strich(m,[.13,.98,0],[.13,1.18,0],.15,WEISS); strich(m,[.13,1.1,0],[-.34,1.6,0],.14,WEISS); strich(m,[-.2,1.12,0],[.06,1.1,0],.1,TANNE);
      strich(m,[-.31,1.57,0],[-.46,1.73,0],.1,DUNKEL); strich(m,[-.45,1.72,0],[-.49,1.76,0],.14,DUNKEL); ball(m,.14,TANNE,.13,1.12,0);
      [-1,1].forEach(s=>{ const r=walze(m,.15,.12,METALL,-.44,.52,s*.19); r.rotation.x=Math.PI/2; const q=walze(m,.08,.08,DUNKEL,-.44,.52,s*.27); q.rotation.x=Math.PI/2; }); } },
  { x:-4.4, z:2.6, steh:[-4.4,4.25], r:1.02, treffer:[2.2,2.4,1.5], baue(g){ /* 2 Reagenzglasständer auf einem runden Tisch */
      walze(g,.55,.1,METALL2,0,.05,0); walze(g,.16,.72,METALL,0,.44,0); walze(g,1.0,.14,WEISS,0,.85,0); reif(g,.99,.05,TUERKIS,0,.85,0);
      const H=0xe8a850;
      box(g,1.85,.13,.6,H,0,.99,0); [-.9,.9].forEach(x=>box(g,.1,.78,.5,H,x,1.4,0));
      [-.2,.2].forEach(z=>box(g,1.85,.1,.1,H,0,1.62,z)); for(let i=0;i<6;i++) box(g,.07,.1,.36,H,-.875+i*.35,1.62,0);
      [[0xe84a3a,.6],[0x40c860,.85],[0x3a8cf0,.5],[0xffc820,.75],[0xb050e0,.65]].forEach(([f,hh],i)=>{ const x=-.7+i*.35;
        const fl=leucht(f); walze(g,.095,hh,fl,x,1.15+hh/2,0); ball(g,.095,fl,x,1.15,0);
        const gl=walze(g,.125,1.22,glas(0xdff8ff,.5),x,1.665,0); gl.castShadow=false; reif(g,.127,.015,0xf4fcff,x,2.275,0); }); } },
  { x:7.4, z:-4.8, steh:[7.4,-3.15], kasten:[2.5,1.5], treffer:[2.5,2.7,1.4], baue(g){ /* 3 Laborwaage: Balkenwaage mit zwei Schalen auf einem Steinsockel */
      box(g,2.0,.62,1.1,0x7a8a94,0,.31,0); box(g,2.35,.18,1.35,0x4a5a66,0,.71,0);
      box(g,1.25,.34,.75,WEISS,0,.97,0); box(g,.6,.2,.04,0x0a2a24,0,.97,.39); [-.18,0,.18].forEach(x=>box(g,.09,.13,.02,leucht(0x70ffa0),x,.97,.415)); [-.47,.47].forEach((x,i)=>ball(g,.07,i?ROT:GRUEN,x,.97,.38,1,1,.6));
      walze(g,.2,.1,GOLD,0,1.19,0); walze(g,.075,1.3,GOLD,0,1.82,0); ball(g,.13,GOLD,0,2.5,0);
      const N=.09, px=Math.cos(N)*1.02, py=Math.sin(N)*1.02;
      strich(g,[-px,2.38+py,0],[px,2.38-py,0],.055,GOLD); const z=kegel(g,.06,.36,ROT,0,2.15,.1); z.rotation.x=Math.PI;
      [[-1,2.38+py],[1,2.38-py]].forEach(([s,y])=>{ const x=s*px, u=y-.82; ball(g,.08,GOLD,x,y,0);
        [0,1,2].forEach(i=>{ const a=i*2.094+1.57; strich(g,[x,y,0],[x+Math.cos(a)*.38,u+.1,Math.sin(a)*.38],.014,METALL2); });
        rohr(g,.45,.24,.14,METALL,x,u+.05,0,20,true); walze(g,.25,.04,METALL,x,u,0); reif(g,.45,.03,GOLD,x,u+.12,0);
        if(s<0){ const kr=leucht(0xd860e0); [[0,.22,0,.16,.34],[.15,.14,.08,.1,.22],[-.15,.15,.04,.1,.24]].forEach(([a,b,c,r,hh])=>{ const q=kegel(g,r,hh,kr,x+a,u+b,c); q.rotation.z=-a; }); }
        else { [[-.14,.28],[.14,.2]].forEach(([a,hh])=>{ walze(g,.13,hh,0xb07828,x+a,u+.03+hh/2,0); ball(g,.06,0xb07828,x+a,u+.08+hh,0); }); } }); } },
  { x:14.2, z:-9.2, dreh:-.32, steh:[13.2,-7.55], kasten:[2,1.65], treffer:[1.8,2.8,1.35], baue(g){ /* 4 Probenkühlschrank: oben weiße Tür mit Schneeflocke, unten Glastür */
      [-.65,.65].forEach(x=>[-.38,.38].forEach(z=>box(g,.18,.12,.18,DUNKEL,x,.06,z)));
      const W=0xeaf6ff, R=0x3a8ac0;
      box(g,1.6,1.05,.95,W,0,2.05,0); box(g,1.6,.18,.95,W,0,.21,0); [-.74,.74].forEach(x=>box(g,.12,1.25,.95,W,x,.9,0)); box(g,1.4,1.25,.1,0xb8ecff,0,.9,-.42);
      box(g,1.7,.14,1.05,R,0,2.64,0); box(g,1.62,.09,.99,R,0,1.52,0);
      box(g,1.44,.9,.07,0xd0ecfc,0,2.07,.49); box(g,.09,.62,.12,METALL2,.56,2.0,.57);
      const F=leucht(0x2f8ae0); for(let i=0;i<3;i++){ const a=i*1.047+1.571, c=Math.cos(a)*.31, s=Math.sin(a)*.31; strich(g,[-.12-c,2.08-s,.54],[-.12+c,2.08+s,.54],.028,F); [-1,1].forEach(v=>ball(g,.055,F,-.12+v*c,2.08+v*s,.54)); }
      [.65,1.07].forEach(y=>box(g,1.38,.05,.72,METALL,0,y,-.02));
      [.29,.675,1.095].forEach((y,e)=>[-.45,-.15,.15,.45].forEach((x,i)=>{ const f=[GRUEN,ORANGE,BLAU,PINK][(i+e)%4]; walze(g,.1,.24,leucht(f),x,y+.13,.14); walze(g,.11,.07,WEISS,x,y+.28,.14); }));
      const t=box(g,1.38,1.2,.04,glas(0xbfeeff,.22),0,.9,.5); t.castShadow=false;
      [.31,1.47].forEach(y=>box(g,1.46,.07,.08,R,0,y,.5)); [-.7,.7].forEach(x=>box(g,.07,1.2,.08,R,x,.9,.5)); box(g,.09,.6,.12,METALL2,.56,.9,.58);
      ball(g,.05,leucht(0x70ff90),-.55,2.42,.54); } },
  { wand:'hinten', x:2.6, z:-13.5, steh:[2.6,-11.45], treffer:[4,2.6,.9], trefferY:1, baue(g,k){ /* 5 Forschungstafel: grüne Tafel mit Kreidezeichnungen */
      g=gruppe(g,0,0,-.22); /* dicht an die Wand */
      box(g,3.9,2.45,.12,0xc08a48,0,2.35,.28); box(g,3.62,2.17,.06,0x1f5a46,0,2.35,.35); box(g,3.7,.1,.34,0xa87030,0,1.14,.45);
      [-1,1].forEach(s=>box(g,.18,.3,.28,METALL2,s*1.5,3.5,.14));
      const W=leucht(0xf4fff8), G=leucht(0xffe870), R=leucht(0xff9a8a), Z=.395, L=(a,b,f)=>strich(g,[a[0],a[1],Z],[b[0],b[1],Z],.022,f||W);
      /* Sechseck-Molekül */
      const E=[0,1,2,3,4,5].map(i=>[-1.1+Math.cos(i*1.047)*.42,2.75+Math.sin(i*1.047)*.42]);
      E.forEach((p,i)=>{ L(p,E[(i+1)%6]); ball(g,.07,i%2?G:W,p[0],p[1],Z); }); L(E[0],[-.4,2.95]); ball(g,.1,R,-.4,2.95,Z); L(E[3],[-1.7,2.55]); ball(g,.08,R,-1.7,2.55,Z);
      /* Doppelwelle */
      for(let i=0;i<16;i++){ const x=-1.65+i*.1, a=i*.75; L([x,1.75+Math.sin(a)*.28],[x+.1,1.75+Math.sin(a+.75)*.28],W); L([x,1.75-Math.sin(a)*.28],[x+.1,1.75-Math.sin(a+.75)*.28],G); if(i%2) L([x,1.75+Math.sin(a)*.28],[x,1.75-Math.sin(a)*.28],R); }
      /* Säulen */
      L([.35,1.55],[1.65,1.55]); L([.35,1.55],[.35,2.5]); [.3,.52,.44,.78].forEach((hh,i)=>box(g,.17,hh,.02,[G,R,W,G][i],.6+i*.28,1.56+hh/2,Z));
      /* keimende Pflanze */
      L([1.1,2.7],[1.1,3.15],leucht(0x9affa0)); [-1,1].forEach(s=>ball(g,.14,leucht(0x9affa0),1.1+s*.15,3.13,Z,1.2,.55,.15)); L([.75,2.7],[1.45,2.7]); ring(g,.14,.022,G,1.6,3.22,Z); /* kleine gelbe Sonne */
      [-1.2,-.9,.9].forEach((x,i)=>{ const s=walze(g,.045,.3,[0xffffff,0xffe870,0xff9a8a][i],x,1.23,.52); s.rotation.z=Math.PI/2; }); box(g,.42,.14,.18,LILA,1.35,1.26,.52);
      k.kasten(2.6,-13.1,4,.8); } },
  { wand:'hinten', x:11, z:-13.5, steh:[11,-11.45], treffer:[3.7,2.6,.8], trefferY:1.05, baue(g,k){ /* 6 Planetenplakat: Sonne mit Planeten in goldenem Rahmen */
      g=gruppe(g,0,0,-.22); /* dicht an die Wand */
      box(g,3.5,2.4,.1,GOLD,0,2.35,.27);
      const t=bild(512,340,c=>{ c.fillStyle='#141c52'; c.fillRect(0,0,512,340);
        c.fillStyle='#ffffff'; for(let i=0;i<110;i++) c.fillRect((i*97)%508,(i*61)%336,2+(i%7?0:2),2+(i%7?0:2));
        const v=c.createRadialGradient(0,170,30,0,170,130); v.addColorStop(0,'#fff2a0'); v.addColorStop(.65,'#ffb020'); v.addColorStop(1,'rgba(255,120,20,0)'); c.fillStyle=v; c.beginPath(); c.arc(0,170,130,0,7); c.fill();
        c.strokeStyle='rgba(180,200,255,.55)'; c.lineWidth=2; [135,180,232,300,372,448].forEach(r=>{ c.beginPath(); c.arc(0,170,r,-1.15,1.15); c.stroke(); });
        [[135,-.35,12,'#c8c0b8'],[180,.42,19,'#f0a050'],[232,-.12,23,'#3a98f0'],[300,.3,17,'#e0503a'],[372,-.25,40,'#e8c080'],[448,.17,25,'#70e0d8']].forEach(([r,a,gr,f],i)=>{ const x=Math.cos(a)*r, y=170+Math.sin(a)*r;
          c.fillStyle=f; c.beginPath(); c.arc(x,y,gr,0,7); c.fill();
          if(i===2){ c.fillStyle='#4ac060'; c.beginPath(); c.ellipse(x-5,y-5,10,7,.5,0,7); c.fill(); c.beginPath(); c.ellipse(x+8,y+8,7,5,0,0,7); c.fill(); }
          if(i===4){ c.strokeStyle='#b87850'; c.lineWidth=7; [-14,6].forEach(d=>{ c.beginPath(); c.moveTo(x-34,y+d); c.lineTo(x+34,y+d); c.stroke(); }); c.strokeStyle='#ffe8b8'; c.lineWidth=7; c.beginPath(); c.ellipse(x,y,66,16,-.35,0,7); c.stroke(); } }); });
      const m=new THREE.Mesh(new THREE.PlaneGeometry(3.24,2.14),new THREE.MeshLambertMaterial({map:t,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.3})); m.position.set(0,2.35,.33); g.add(m);
      [-1,1].forEach(s=>{ [-1,1].forEach(v=>ball(g,.09,ROT,s*1.66,2.35+v*1.11,.36,1,1,.6)); strich(g,[s*.9,3.55,.25],[s*.9,3.85,.45],.04,METALL2); ball(g,.12,leucht(0xfff4c0),s*.9,3.83,.47,1.4,.7,1); });
      k.kasten(11,-13.1,3.6,.8); } },
  { x:12, z:2.6, steh:[12,4.35], kasten:[3.5,1.8], treffer:[3.5,2.4,1.7], baue(g){ /* 7 Pflanzenbeet mit Pflanzenlicht */
      const R=0xc8783a;
      box(g,3.2,.55,1.5,R,0,.4,0); box(g,3.4,.14,1.7,0xe8a05a,0,.72,0); box(g,3.06,.05,1.36,ERDE,0,.815,0); [-1.4,1.4].forEach(x=>[-.58,.58].forEach(z=>box(g,.2,.14,.2,DUNKEL,x,.07,z)));
      [-.8,0,.8].forEach(x=>box(g,.07,.4,.05,0xa85a24,x,.38,.76));
      /* große Blüten */
      [[-1.15,.25,1.55,ROT],[-.65,-.25,1.8,GELB],[-.2,.3,1.4,PINK]].forEach(([x,z,y,f])=>{ strich(g,[x,.82,z],[x,y,z],.04,TANNE);
        for(let i=0;i<6;i++){ const a=i*1.047; ball(g,.13,f,x+Math.cos(a)*.17,y+Math.sin(a)*.17,z+.02,1,1,.45); } ball(g,.1,f===GELB?ORANGE:GELB,x,y,z+.07);
        [-1,1].forEach(s=>{ const b=ball(g,.2,BLATT,x+s*.17,1.05,z,1.2,.3,.65); b.rotation.z=s*.5; }); });
      /* Tomatenstrauch */
      strich(g,[.55,.82,-.1],[.55,1.7,-.1],.05,TANNE); [[.3,1.2,0],[.82,1.3,-.1],[.55,1.6,.05],[.45,1.05,.25],[.75,1.0,-.3]].forEach((p,i)=>ball(g,.27,i%2?BLATT:BLATT2,p[0],p[1],p[2],1,.75,1));
      [[.27,1.05,.27],[.78,1.18,.22],[.52,1.42,.3],[.95,1.05,.05]].forEach(p=>ball(g,.12,0xe8302a,p[0],p[1],p[2]));
      /* Salat und Möhrenkraut */
      [[1.25,.3],[1.2,-.35]].forEach(([x,z])=>{ for(let i=0;i<7;i++){ const a=i*.9, b=ball(g,.17,BLATT2,x+Math.cos(a)*.14,.95,z+Math.sin(a)*.14,1,.8,.45); b.rotation.set(.3,-a+1.57,0); } ball(g,.12,0xb8f070,x,1,z); });
      [[-.65,.5],[0,-.42],[-1.3,-.35]].forEach(([x,z])=>{ for(let i=0;i<4;i++) strich(g,[x,.82,z],[x+Math.cos(i*1.57)*.17,1.17,z+Math.sin(i*1.57)*.17],.025,BLATT); });
      /* Lampenbügel */
      [-1.62,1.62].forEach(x=>walze(g,.05,1.5,METALL,x,1.5,-.55)); strich(g,[-1.62,2.22,-.55],[1.62,2.22,-.55],.05,METALL); box(g,2.5,.14,.42,LILA,0,2.2,-.4); box(g,2.3,.05,.3,leucht(0xffb8f0),0,2.11,-.4);
      schein(g,'rgba(255,170,240,.35)',0,1.9,-.2,2); } },
  { x:-12.3, z:8, dreh:.2, steh:[-12,9.75], kasten:[2.5,1.75], treffer:[2.4,2.1,1.6], baue(g){ /* 8 Probenkiste: offene orange Kiste mit bunten Gesteinsproben */
      const F=ORANGE, D=0x3a4458;
      box(g,2.1,.14,1.3,F,0,.17,0); [-.6,.6].forEach(z=>box(g,2.1,.66,.12,F,0,.55,z)); [-.99,.99].forEach(x=>box(g,.12,.66,1.1,F,x,.55,0));
      [-.99,.99].forEach(x=>[-.6,.6].forEach(z=>{ box(g,.22,.8,.22,D,x,.5,z); ball(g,.1,D,x,.08,z); }));
      [-.5,.5].forEach(x=>box(g,.18,.5,.04,D,x,.52,.675)); box(g,.34,.2,.07,GOLD,0,.74,.69);
      [-1,1].forEach(s=>{ const r=ring(g,.2,.05,D,s*1.09,.62,0,Math.PI); r.rotation.set(0,Math.PI/2,Math.PI); });
      box(g,1.88,.4,1.1,0x4a5260,0,.44,0); box(g,.06,.2,1.1,0x6a7484,-.32,.72,0); box(g,.06,.2,1.1,0x6a7484,.32,.72,0); box(g,1.88,.19,.06,0x6a7484,0,.715,0);
      const stein=new THREE.IcosahedronGeometry(1,0);
      [[-.65,.27,0xa8a0a0,.24],[0,.27,0xc86048,.22],[.65,.28,0x7a9a70,.23],[-.64,-.27,0xd8b860,.2],[.66,-.27,0x8a78b0,.22]].forEach(([x,z,f,r],i)=>{ const m=teil(g,stein,mat(f),x,.8,z,r*1.15,r*.85,r); m.rotation.set(i,i*2,i*.5); });
      const kr=leucht(0x60f0e8); [[0,.34,0,.12,.5],[.13,.24,.05,.08,.3],[-.13,.25,.02,.08,.32]].forEach(([a,b,c,r,hh])=>{ const q=kegel(g,r,hh,kr,a,.62+b,-.27+c); q.rotation.z=-a*1.6; });
      schein(g,'rgba(110,250,240,.5)',0,1.05,-.27,1);
      /* aufgeklappter Deckel, hinten angelehnt */
      const d=gruppe(g,0,.9,-.64); d.rotation.x=-.28;
      box(d,2.14,1.05,.12,F,0,.52,-.04); box(d,1.84,.78,.03,0x4a5260,0,.52,.035); [-.99,.99].forEach(x=>box(d,.22,1.1,.18,D,x,.52,-.04)); box(d,2.16,.12,.18,D,0,1.04,-.04);
      [-.6,.6].forEach(x=>{ const s=walze(g,.075,.3,METALL,x,.9,-.68); s.rotation.z=Math.PI/2; }); } },
  { x:4.6, z:5.4, steh:[4.6,7.2], kasten:[3.2,1.65], treffer:[3.2,2.6,1.6], baue(g,k){ /* 9 Algenbecken: großes Wasserbecken mit wogenden Algen */
      const R=0x1f6a72;
      box(g,2.85,.12,1.35,DUNKEL,0,.06,0); box(g,2.75,.62,1.25,R,0,.43,0); box(g,2.95,.14,1.42,METALL,0,.8,0);
      [-.8,0,.8].forEach((x,i)=>{ ball(g,.09,leucht([0x70ff90,0x70f0ff,0xffd23a][i]),x,.45,.63,1,1,.5); });
      box(g,2.7,.08,1.18,0xd8c888,0,.9,0); [[-1,.3],[-.3,-.2],[.5,.25],[1.05,-.15],[.1,.38]].forEach(([x,z],i)=>ball(g,.14,i%2?0x9a8a70:0x7a9aa0,x,.96,z,1.2,.7,1));
      const wasser=box(g,2.68,1.1,1.16,glas(0x30d890,.24),0,1.46,0); wasser.castShadow=false;
      const w2=box(g,2.7,.03,1.18,basis(0xb8ffe0,{transparent:true,opacity:.4,depthWrite:false}),0,2.02,0); w2.castShadow=false;
      [-1.37,1.37].forEach(x=>[-.6,.6].forEach(z=>box(g,.09,1.36,.09,METALL,x,1.52,z)));
      [-.6,.6].forEach(z=>box(g,2.83,.09,.09,METALL,0,2.18,z)); [-1.37,1.37].forEach(x=>box(g,.09,.09,1.2,METALL,x,2.18,0));
      /* Leuchtbalken und Rohr an der Seite */
      box(g,2.3,.14,.34,R,0,2.38,-.45); box(g,2.1,.04,.24,leucht(0xd8fff0),0,2.29,-.45); [-1,1].forEach(s=>walze(g,.04,.2,METALL2,s*1.1,2.26,-.55));
      strich(g,[1.42,.9,0],[1.56,.9,0],.08,TUERKIS); strich(g,[1.56,.9,0],[1.56,2.35,0],.08,TUERKIS); strich(g,[1.56,2.35,0],[1.15,2.35,-.2],.08,TUERKIS);
      /* wogende Algen: Ketten aus kleinen Blättchen */
      const n=11*8, a=schwarm(g,GEO.sph,mat(0x28a838,{emissive:0x0c4014}),n), o=new THREE.Object3D();
      const setze=t=>{ for(let i=0;i<11;i++){ const bx=-1.12+i*.224, bz=((i*5)%7-3)*.13, hoch=5+((i*3)%4);
          for(let j=0;j<8;j++){ const s=j<hoch?1:0, w=Math.sin(t*1.5+i*1.7+j*.55)*.016*j; o.position.set(bx+w,.99+j*.13,bz); o.rotation.set(0,i,Math.sin(t*1.5+i+j*1.3)*.35+(j%2?.45:-.45)); o.scale.set(.058*s,.13*s,.03*s); o.updateMatrix(); a.setMatrixAt(i*8+j,o.matrix); } }
        a.instanceMatrix.needsUpdate=true; };
      setze(0); k.anim.push(setze);
      blasen(g,k,[[-.8,.98,.25,.95,.18,.2],[.35,.98,-.2,.95,.2,.2],[1.0,.98,.2,.95,.15,.2]],8,.04);
      schein(g,'rgba(90,255,180,.28)',0,1.5,.2,3);
      const l=new THREE.PointLight(0x60ffb0,.4,7,1.5); l.position.set(4.6,2.6,6.4); k.scene.add(l); } },
  { x:-3.4, z:-5.8, steh:[-3.4,-4.1], kasten:[3.2,1.5], treffer:[3.2,2.5,1.4], baue(g,k){ /* 10 Forschercomputer: Schreibtisch mit zwei Bildschirmen und Tastatur */
      const R=0x3a5ab0;
      [-1.38,1.38].forEach(x=>{ box(g,.18,.9,1.15,R,x,.45,0); box(g,.3,.08,1.3,DUNKEL,x,.04,0); }); box(g,2.6,.4,.08,R,0,.6,-.5);
      box(g,3.05,.14,1.35,WEISS,0,.97,0); box(g,3.07,.05,.05,leucht(0x70f0ff),0,.94,.68);
      /* großer Bildschirm und kleiner, leicht eingedreht */
      walze(g,.28,.06,DUNKEL,-.35,1.07,-.32); box(g,.16,.4,.09,DUNKEL,-.35,1.28,-.38);
      WELTRAUM.bildschirm(g,k,1.55,.92,-.35,1.9,-.3,'kurve','#6affc0');
      walze(g,.2,.06,DUNKEL,.98,1.07,-.22); box(g,.12,.34,.08,DUNKEL,.98,1.24,-.26);
      WELTRAUM.bildschirm(g,k,.72,.7,.98,1.66,-.18,'punkte','#8ad0ff').rotation.y=-.4;
      /* Tastatur mit einzelnen Tasten und Maus */
      box(g,1.35,.07,.46,DUNKEL,-.35,1.075,.34); for(let i=0;i<10;i++) for(let j=0;j<3;j++) box(g,.095,.04,.095,(i+j*3)%7?0xe8eef8:ORANGE,-.935+i*.13,1.125,.21+j*.13);
      ball(g,.13,DUNKEL,.62,1.09,.38,.85,.55,1.25); ball(g,.03,leucht(0x70f0ff),.62,1.16,.36); strich(g,[.62,1.07,.24],[.45,1.06,0],.014,DUNKEL);
      /* Rechner unter dem Tisch mit Lämpchen */
      box(g,.5,.75,.85,DUNKEL,.9,.4,0); [0,1,2].forEach(i=>ball(g,.05,leucht([0x70ff90,0x70f0ff,0xffd23a][i]),.78+i*.12,.64,.44)); for(let i=0;i<4;i++) box(g,.36,.035,.02,METALL2,.9,.18+i*.09,.435); } }
];

return { titel:'Das Labor', breite:36, tiefe:27, oben:WELTRAUM.OBEN, baue, gegenstaende, verstecke };
})();

/* Raum 3: Der Maschinenraum. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: Kletterröhre an der Rückwand, unten eine zweiteilige Schiebeklappe mit Zahlenschloss. */
RAEUME3D.raumschiff[2] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, BLAU, TUERKIS, ORANGE, ROT, GELB, GRUEN, GOLD } = WELTRAUM;
const KUPFER=0xd07a3a, KUPFER2=0x94502a, SCHWARZ=0x161a24, STAHL=0x8a96aa, HELL=0xd4dce8, ROEHRE=0x3c4a6e;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* Scheibe oder kurze Walze mit Achse nach vorn (+z) */
const scheibe=(p,r,d,c,x,y,z)=>{ const w=walze(p,r,d,c,x,y,z); w.rotation.x=Math.PI/2; return w; };
/* Walze mit Achse quer (x) */
const quer=(p,r,l,c,x,y,z)=>{ const w=walze(p,r,l,c,x,y,z); w.rotation.z=Math.PI/2; return w; };
/* Rohrzug durch mehrere Punkte mit runden Knien */
function rohrzug(p,punkte,r,c){
  for(let i=1;i<punkte.length;i++) strich(p,punkte[i-1],punkte[i],r,c);
  punkte.forEach(q=>ball(p,r*1.08,c,q[0],q[1],q[2]));
}
/* Ventilator- bzw. Turbinenrad mit Blick nach +z; dreht sich */
function rotor(par,k,r,n,c,x,y,z,tempo){
  const g=gruppe(par,x,y,z);
  for(let i=0;i<n;i++){ const a=gruppe(g,0,0,0); a.rotation.z=i*Math.PI*2/n;
    const b=box(a,r*.36,r*.8,.05,c,r*.07,r*.52,0); b.rotation.y=.5; b.rotation.z=-.18; }
  const h=kegel(g,r*.24,r*.36,ORANGE,0,0,r*.12); h.rotation.x=Math.PI/2;
  verschmelze(g);
  k.anim.push(t=>{ g.rotation.z=t*tempo; });
  return g;
}

function baue(k){
  const sc=k.scene;
  const h=WELTRAUM.huelle(k,{ B:36, T:27, H:6, wand:[92,76,82], boden:[82,86,104], staerke:.76, sonne:0xffe6d0, sonneStaerke:.38,
    himmel:0xe4ecff, grund:0x503c3c, strebe:0x5a5470, leuchte:0xff9a3a, pfosten:[-16.6,-11.2,-4.6,4.6,16.6], streben:[-9.2,-1.6,3.4,9.2] });
  const B=h.B, T=h.T, hinten=h.hinten, links=h.links, rechts=h.rechts;

  /* =============== Ausgang: Kletterröhre mit Klappe und Zahlenschloss =============== */
  const RZ=-12.1, R=1.35, AUF=Math.PI*5/12;   /* AUF = halbe Öffnung (75 Grad) */
  const bogen=(par,r,h2,y,von,lang,m)=>{ const t=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h2,24,1,true,von,lang),m); t.position.y=y; t.receiveShadow=true; par.add(t); return t; };
  const roehre=gruppe(sc,0,0,RZ);
  bogen(roehre,R,7.1,3.55,AUF,Math.PI*2-AUF*2,mat(ROEHRE,{side:THREE.DoubleSide}));
  /* Leiter innen an der Rückseite */
  [-.52,.52].forEach(x=>strich(roehre,[x,0,-1.1],[x,6.9,-1.1],.07,GELB));
  for(let i=0;i<15;i++){ quer(roehre,.055,1.04,HELL,0,.38+i*.44,-1.1); }
  [1.2,3.4,5.6].forEach(y=>[-.52,.52].forEach(x=>strich(roehre,[x,y,-1.1],[x,y,-1.26],.05,STAHL)));
  /* Türpfosten, Ringe, oberer Deckel */
  [-1,1].forEach(s=>{ const x=Math.sin(s*AUF)*(R+.03), z=Math.cos(AUF)*(R+.03); walze(roehre,.11,7.1,ORANGE,x,3.55,z); walze(roehre,.19,.16,DUNKEL,x,.08,z); });
  [3.36,4.95,6.5].forEach(y=>reif(roehre,R+.03,.1,ORANGE,0,y,0));
  walze(roehre,R+.16,.22,METALL2,0,7.14,0); walze(roehre,R*.7,.2,DUNKEL,0,7.32,0);
  [-1,1].forEach(s=>strich(roehre,[s*1.2,5.95,-.6],[s*1.75,5.95,-1.38],.1,METALL2));
  /* Schwelle */
  box(roehre,2.5,.035,.34,GELB,0,.02,R+.02); for(let i=0;i<6;i++) box(roehre,.17,.012,.34,SCHWARZ,-1.05+i*.42,.045,R+.02);
  verschmelze(roehre);
  /* Glas oberhalb der Klappe: man sieht beim Klettern hindurch */
  const glas=bogen(roehre,R,3.05,4.93,-AUF,AUF*2,basis(0x8ae8ff,{transparent:true,opacity:.13,depthWrite:false,side:THREE.DoubleSide})); glas.renderOrder=3;
  /* Leuchtstreifen innen und Licht (erst sichtbar, wenn die Klappe offen ist) */
  const innen=gruppe(roehre,0,0,0);
  [-.9,.9].forEach(x=>box(innen,.1,6.6,.05,basis(0xfff0b0),x,3.4,-.93));
  verschmelze(innen); innen.visible=false;
  const lichtschein=schein(sc,'rgba(255,238,170,.6)',0,2.2,RZ-.5,3.4); lichtschein.visible=false;
  const obenschein=schein(sc,'rgba(190,245,255,.75)',0,5.9,RZ-.3,2.6); obenschein.visible=false;
  const fleckM=basis(0xffffff,{map:leuchtBild('rgba(255,233,160,1)'),transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(3.2,2.7),fleckM); fleck.rotation.x=-Math.PI/2; fleck.position.set(0,.07,-9.75); fleck.visible=false; sc.add(fleck);
  const innenlicht=new THREE.PointLight(0xfff0c0,0,10,1.5); innenlicht.position.set(0,3,RZ+.3); sc.add(innenlicht);
  /* Klappe: zwei gebogene Hälften, die zur Seite um die Röhre fahren */
  const klappen=[-1,1].map(s=>{ const g=gruppe(sc,0,0,RZ), von=s<0?-AUF+.035:.012, lang=AUF-.047, ds=THREE.DoubleSide;
    bogen(g,R+.15,3.12,1.66,von,lang,mat(0xaab6ca,{side:ds}));
    [.28,3.02].forEach(y=>bogen(g,R+.175,.28,y,von,lang,mat(ORANGE,{side:ds})));
    bogen(g,R+.175,.16,1.2,von,lang,mat(TUERKIS,{side:ds}));
    const um=(a,r2,y,w,h2,d,c)=>{ const b=box(g,w,h2,d,c,Math.sin(a)*r2,y,Math.cos(a)*r2); b.rotation.y=a; return b; };
    um(s*.15,R+.24,1.75,.1,.75,.1,DUNKEL); um(s*.62,R+.18,2.18,.7,.78,.04,DUNKEL);
    /* grüner Pfeil nach oben */
    const pa=gruppe(g,Math.sin(s*.62)*(R+.23),2.18,Math.cos(.62)*(R+.23)); pa.rotation.y=s*.62; const pk=kegel(pa,.25,.32,basis(0x6affc0),0,.14,0); pk.scale.z=.04; box(pa,.16,.34,.03,basis(0x6affc0),0,-.17,0);
    [.12,.45,.8,1.12].forEach(a=>[.6,2.7].forEach(y=>ball(g,.045,DUNKEL,Math.sin(s*a)*(R+.18),y,Math.cos(a)*(R+.18))));
    verschmelze(g); return g; });
  /* Pfosten mit goldenem Zahlenschloss rechts neben der Röhre */
  const pfosten=gruppe(sc,2.25,0,-11.4);
  box(pfosten,.4,2.6,.34,METALL2,0,1.3,-.1); box(pfosten,.8,.16,.6,DUNKEL,0,.08,-.05); box(pfosten,1.16,.98,.12,DUNKEL,0,2.34,.08); box(pfosten,.5,.12,.4,ORANGE,0,2.9,-.1);
  verschmelze(pfosten);
  const schloss=WELTRAUM.zahlenschloss(sc,2.25,2.3,-11.13); schloss.scale.set(1.15,1.15,1.15); verschmelze(schloss);
  const riegel=gruppe(sc,0,0,0); strich(riegel,[1.77,2.3,-11.16],[1.05,2.3,-10.98],.07,GOLD); ball(riegel,.12,GOLD,1.05,2.3,-10.98); verschmelze(riegel);
  const lampeRot=ball(sc,.13,basis(0xff5a4a),2.25,3.07,-11.5), lampeGruen=ball(sc,.14,basis(0x5aff8a),2.25,3.07,-11.5); lampeGruen.visible=false;
  const tuer=ausgang(k,{ name:'Kletterröhre', einfach:'Röhre mit Leiter', steh:[0,-9.8], durch:[0,-12.35], hoch:4,
    treffer:{x:.45,y:2.7,z:-11.35,b:4.5,h:5.4,t:1.8}, schildOben:[0,4.4,-10.4], glanz:[2.25,2.35,-10.85],
    bewege:(auf)=>{ klappen[0].rotation.y=-auf*1.34; klappen[1].rotation.y=auf*1.34; schloss.visible=riegel.visible=auf<.04; lampeRot.visible=auf<.04; lampeGruen.visible=auf>=.04;
      innen.visible=auf>.08; innenlicht.intensity=1.5*auf; lichtschein.visible=auf>.1; lichtschein.material.opacity=.55*auf; obenschein.visible=auf>.1; obenschein.material.opacity=auf;
      fleck.visible=auf>.04; fleckM.opacity=.65*auf; } });
  k.kasten(0,-12.05,3.1,3); k.kasten(2.25,-11.45,1.1,.75);
  k.kasten(-17.6,-5.5,.9,3.0); /* Schaltkasten mit offener Tür an der linken Wand */

  /* =============== Reaktor in hoher Säule (pulsiert) =============== */
  const RX=-5.6, RZR=-2.4;
  const reaktor=gruppe(sc,RX,0,RZR);
  rohr(reaktor,1.55,1.75,.4,0x4a4660,0,.2,0,8); rohr(reaktor,1.3,1.45,.36,METALL2,0,.56,0,8); reif(reaktor,1.34,.07,ORANGE,0,.76,0);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4+Math.PI/8; box(reaktor,.24,.14,.08,basis(0x60f0f0),Math.sin(a)*1.58,.22,Math.cos(a)*1.58).rotation.y=a; }
  for(let i=0;i<4;i++){ const a=i*Math.PI/2+Math.PI/4, x=Math.sin(a)*1.12, z=Math.cos(a)*1.12; walze(reaktor,.1,4.9,METALL,x,3.2,z); [1.1,3.2,5.3].forEach(y=>walze(reaktor,.16,.18,ORANGE,x,y,z)); }
  walze(reaktor,.7,.35,DUNKEL,0,.9,0); walze(reaktor,.7,.35,DUNKEL,0,5.45,0);
  rohr(reaktor,1.1,1.35,.4,METALL2,0,5.82,0,8); reif(reaktor,1.12,.08,ORANGE,0,6.04,0); rohr(reaktor,.55,.85,.7,0x4a4660,0,6.35,0,8); walze(reaktor,.42,1.3,METALL2,0,7.3,0);
  verschmelze(reaktor);
  const huelle=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,4.4,24,1,true),basis(0x90f4ff,{transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide})); huelle.position.y=3.18; huelle.renderOrder=3; reaktor.add(huelle);
  const kern=gruppe(reaktor,0,3.18,0);
  const stab=walze(kern,.28,4.2,basis(0x7affee),0,0,0); stab.castShadow=false;
  const herz=ball(kern,.52,basis(0xc8fff4),0,0,0,1,1.35,1); herz.castShadow=false;
  const ringe=[0,1,2].map(i=>{ const g=gruppe(reaktor,0,2,0); const r=reif(g,.68,.06,basis(i===1?0xffa840:0x40e0e8),0,0,0); r.castShadow=false; return g; });
  const glut=schein(reaktor,'rgba(90,255,230,.65)',0,3.18,0,3.8);
  k.anim.push(t=>{ const s=1+Math.sin(t*3)*.16; stab.scale.x=stab.scale.z=.28*s; herz.scale.set(.5*s,.68*s,.5*s); glut.scale.set(3.4*s,4.2*s,1);
    ringe.forEach((g,i)=>{ g.position.y=1.35+((t*.7+i*1.25)%3.75); const q=1+Math.sin(t*4+i*2)*.08; g.scale.set(q,1,q); }); });
  k.verdecker(reaktor,RX,RZR,1.4); k.kreis(RX,RZR,1.78);
  flacker(k,RX+1.6,3.2,RZR+1.2,0x50f0e0,.85,13);

  /* =============== Große Turbine (Mitte rechts) =============== */
  const turbine=gruppe(sc,5.5,0,-4.9);
  box(turbine,2.5,.22,2.4,0x4a4660,0,.11,0); [-.75,.75].forEach(z=>{ box(turbine,1.8,.55,.34,METALL2,0,.45,z); });
  const mantel=new THREE.Mesh(new THREE.CylinderGeometry(1.06,1.06,2.1,28,1,true),mat(0xc8d0de,{side:THREE.DoubleSide})); mantel.rotation.x=Math.PI/2; mantel.position.set(0,1.55,0); mantel.castShadow=true; turbine.add(mantel);
  [-.7,0,.7].forEach(z=>ring(turbine,1.09,.07,z?ORANGE:TUERKIS,0,1.55,z)); ring(turbine,1.05,.1,METALL2,0,1.55,1.06); ring(turbine,1.05,.1,METALL2,0,1.55,-1.06);
  scheibe(turbine,1.02,.08,SCHWARZ,0,1.55,.1);
  const hinterer=kegel(turbine,.7,.8,METALL2,0,1.55,-1.4); hinterer.rotation.x=-Math.PI/2;
  rohrzug(turbine,[[0,2.58,-.35],[0,3.05,-.35],[-1.28,3.05,-.35],[-1.28,.2,-.35]],.12,KUPFER);
  verschmelze(turbine);
  strich(turbine,[0,1.55,.1],[0,1.55,.62],.1,METALL2);
  rotor(turbine,k,.94,9,HELL,0,1.55,.62,2.6);
  k.kasten(5.5,-5,2.6,2.9); k.kreis(-3.3,-13,.2); k.kreis(3.3,-13,.2); k.kreis(-2.45,-13,.12); k.kreis(2.45,-13,.12);

  /* =============== Kolbenmaschine (vorn links der Mitte) =============== */
  const motor=gruppe(sc,-2.9,0,4.6);
  box(motor,2.8,.18,1.2,0x4a4660,0,.09,0); box(motor,2.6,.5,1,ORANGE,0,.43,0); box(motor,2.66,.08,1.06,DUNKEL,0,.72,0);
  [-.85,0,.85].forEach(x=>{ rohr(motor,.3,.3,.42,METALL2,x,.96,0); reif(motor,.31,.045,HELL,x,1.17,0); scheibe(motor,.1,.04,basis(0x60f0f0),x,.43,.51); });
  rohrzug(motor,[[-1.3,.5,-.45],[-1.3,1.0,-.58],[1.3,1.0,-.58],[1.3,.5,-.45]],.07,KUPFER);
  verschmelze(motor);
  [-.85,0,.85].forEach((x,i)=>{ const p=gruppe(motor,x,1.2,0); walze(p,.1,.5,HELL,0,0,0); walze(p,.24,.16,TUERKIS,0,.3,0); ball(p,.08,GELB,0,.42,0); verschmelze(p);
    k.anim.push(t=>{ p.position.y=1.17+Math.sin(t*3.6+i*2.1)*.17; }); });
  k.kasten(-2.9,4.55,2.9,1.35);

  /* =============== Dicke Steigrohre als Säulen =============== */
  [[-9.2,1.6,KUPFER,TUERKIS],[9.4,.2,0x3aa8b0,ORANGE]].forEach(([x,z,c,c2])=>{
    const g=gruppe(sc,x,0,z);
    walze(g,.62,.2,0x4a4660,0,.1,0); walze(g,.36,6.2,c,0,3.1,0); [.35,2.1,4.1,6.1].forEach(y=>{ walze(g,.48,.18,METALL2,0,y,0); for(let i=0;i<6;i++){ const a=i*1.047; ball(g,.05,HELL,Math.cos(a)*.48,y,Math.sin(a)*.48); } });
    [.9,3.1,5.1].forEach(y=>walze(g,.375,.22,c2,0,y,0));
    rohrzug(g,[[.42,.15,0],[.58,.6,0],[.58,3.6,0],[.3,3.9,0]],.09,STAHL);
    walze(g,.52,.14,DUNKEL,0,6.27,0); ball(g,.2,basis(0xffb050),0,6.48,0);
    verschmelze(g); k.verdecker(g,x,z,.65); k.kreis(x,z,.72);
  });

  /* =============== Pumpen mit Kühlrippen und Lüfter =============== */
  const pumpe=(x,z,dreh,c)=>{ const g=gruppe(sc,x,0,z); g.rotation.y=dreh;
    box(g,2,.16,1.5,0x4a4660,0,.08,0); box(g,1.1,.85,1.1,c,-.2,.58,0); for(let i=0;i<8;i++) box(g,.05,1.05,1.24,STAHL,-.68+i*.14,.66,0);
    scheibe(g,.42,.3,METALL2,-.2,.62,.7); ring(g,.43,.05,ORANGE,-.2,.62,.86);
    rohrzug(g,[[.35,.9,0],[.75,.9,0],[.75,.15,0]],.15,KUPFER); verschmelze(g);
    rotor(g,k,.36,5,HELL,-.2,.62,.9,5); };
  pumpe(-16.1,8.4,Math.PI/2,0x2f8a90); k.kasten(-16,8.4,2.1,2.15);
  pumpe(16.1,-9.4,-Math.PI/2,ORANGE); k.kasten(16,-9.4,2.1,2.15);
  pumpe(3.7,11.4,0,0x2f8a90); k.kasten(3.7,11.55,2.15,1.9);
  pumpe(16.2,10.3,-Math.PI/2,0x2f8a90); k.kasten(16.1,10.3,2.1,2.15);

  /* =============== Rohrbündel am vorderen Rand =============== */
  const buendel=gruppe(sc,0,0,0);
  [[-9.6,5.6],[10.3,5.8]].forEach(([x,l])=>{ [[12.25,.3,.24,KUPFER],[12.75,.27,.2,0x3aa8b0],[12.5,.68,.18,STAHL]].forEach(([z,y,r,c])=>{ quer(buendel,r,l,c,x,y,z); [-1,0,1].forEach(s=>quer(buendel,r+.06,.16,METALL2,x+s*(l/2-.1),y,z)); });
    [-1,1].forEach(s=>{ box(buendel,.22,.16,1.1,DUNKEL,x+s*(l/2-.8),.08,12.5); });
    k.kasten(x,12.5,l+.1,1.05); });
  /* Kabeltrommel mit Kabel */
  const trommel=gruppe(buendel,-15.6,0,11.3);
  [-.5,.5].forEach(x=>{ quer(trommel,.72,.12,0xb08050,x,.72,0); quer(trommel,.2,.15,DUNKEL,x,.72,0); });
  quer(trommel,.45,.9,SCHWARZ,0,.72,0); [-.28,0,.28].forEach(x=>{ const r=ring(trommel,.46,.05,0x3a4050,x,.72,0); r.rotation.y=Math.PI/2; });
  rohrzug(trommel,[[.1,.3,.3],[.5,.07,.85],[1.3,.07,.5],[1.9,.07,.95]],.055,SCHWARZ);
  k.kasten(-15.6,11.3,1.35,1.5);
  /* Warnhütchen */
  [[-4.6,11.9],[8.8,3.4],[-2.4,-8.6],[2.6,-7.8],[16.8,-6.3],[-14.6,-.9]].forEach(([x,z])=>{ box(buendel,.55,.07,.55,SCHWARZ,x,.04,z); kegel(buendel,.22,.72,ORANGE,x,.42,z); rohr(buendel,.095,.135,.14,WEISS,x,.43,z,14); k.kreis(x,z,.3); });
  verschmelze(buendel);

  /* =============== Boden: Leitungskanäle, Gitter, Warnstreifen =============== */
  const boden=gruppe(sc,0,0,0);
  const kanal=(x,z,b,t,y)=>{ box(boden,b,.016,t,0x20243a,x,y,z); const l=basis(0x2ad8d0); if(b>t) [-.2,.2].forEach(v=>box(boden,b,.008,.08,l,x,y+.016,z+v)); else [-.2,.2].forEach(v=>box(boden,.08,.008,t,l,x+v,y+.016,z)); };
  kanal(-12.55,-2.4,10.5,.72,.01); kanal(-5.6,-8.8,.72,9.2,.02); kanal(.45,-2.4,8.6,.72,.01); kanal(5.5,1.9,.72,7.9,.022);
  /* Gitterroste */
  [[0,.9,3,3.2],[-12.6,9.2,3,2.4],[12.6,-6.4,2.6,2.2],[0,-6.6,3.4,2.2]].forEach(([x,z,b,t])=>{ box(boden,b,.014,t,SCHWARZ,x,.034,z);
    for(let i=0;i<Math.round(b/.3);i++) box(boden,.09,.016,t-.2,STAHL,x-b/2+.2+i*.3,.048,z);
    [-1,1].forEach(s=>{ box(boden,b+.24,.03,.14,ORANGE,x,.05,z+s*t/2); box(boden,.14,.022,t-.1,ORANGE,x+s*b/2,.046,z); }); });
  /* Warnstreifen rund um den Reaktor (Achteck) und vor der Röhre */
  for(let i=0;i<8;i++){ const a=i*Math.PI/4; for(let j=-3;j<=3;j++){ const u=j*.25, b=box(boden,.25,.012,.24,j%2?SCHWARZ:GELB,RX+Math.sin(a)*2.25+Math.cos(a)*u,.058,RZR+Math.cos(a)*2.25-Math.sin(a)*u); b.rotation.y=a; } }
  for(let i=0;i<17;i++) box(boden,.24,.012,.22,i%2?SCHWARZ:GELB,-1.92+i*.24,.03,-8.55);
  [-1,1].forEach(s=>{ for(let i=0;i<7;i++) box(boden,.18,.012,.34,i%2?SCHWARZ:GELB,s*1.92,.03,-10.9+i*.34); });
  /* vorn Mitte: Pfeilmarken in Richtung Ausgang */
  [7.2,6.2].forEach(z=>[-1,1].forEach(s=>{ const b=box(boden,1.1,.014,.22,ORANGE,s*.4,.03,z); b.rotation.y=s*-.6; }));
  /* Schläuche auf dem Boden */
  [[[-17.5,.07,5.6],[-15.4,.07,6.4],[-15.9,.07,7.3]],[[17.5,.07,-7.4],[15.8,.07,-7.9],[16.2,.07,-8.3]],[[4.9,.07,11.6],[6.3,.07,11.3],[7.3,.07,12.2]]].forEach(p=>rohrzug(boden,p,.07,0x3a4050));
  verschmelze(boden);

  /* =============== Rückwand: große Lüfter, Rohre =============== */
  const rueck=gruppe(hinten,0,0,0), Z=-T/2;
  const luefter=[[-13.9,3.1,1.45,1.7],[13.6,3.1,1.45,-1.4]];
  luefter.forEach(([x,y,r])=>{ box(rueck,r*2+.5,r*2+.5,.16,METALL2,x,y,Z+.08); scheibe(rueck,r+.04,.06,SCHWARZ,x,y,Z+.17); ring(rueck,r+.05,.13,ORANGE,x,y,Z+.24);
    [-1,1].forEach(s=>[-1,1].forEach(v=>ball(rueck,.1,HELL,x+s*(r+.05),y+v*(r+.05),Z+.18))); });
  [-1,1].forEach(s=>{ [[5.0,.2,KUPFER],[5.5,.14,0x3aa8b0]].forEach(([y,r,c])=>{ strich(rueck,[s*1.45,y,Z+.5],[s*17.9,y,Z+.5],r,c); for(let x=2.6;x<17.5;x+=2.5) strich(rueck,[s*x,y,Z+.5],[s*(x+.18),y,Z+.5],r+.06,METALL2); });
    rohrzug(rueck,[[s*3.3,5.0,Z+.5],[s*3.3,.15,Z+.5]],.16,s<0?KUPFER:0x3aa8b0); walze(rueck,.27,.18,METALL2,s*3.3,.4,Z+.5); walze(rueck,.27,.18,METALL2,s*3.3,2.6,Z+.5);
    rohrzug(rueck,[[s*2.45,5.5,Z+.5],[s*2.45,1.1,Z+.5],[s*2.45,1.1,Z+.05]],.11,STAHL); });
  /* Lüftungsschlitze */
  [[-13.9,.85],[13.6,.85],[-8,4.25]].forEach(([x,y])=>{ box(rueck,2.4,y>3?.3:.8,.1,DUNKEL,x,y,Z+.06); for(let i=0;i<(y>3?2:4);i++) box(rueck,2.1,.07,.08,STAHL,x,y-(y>3?.06:.27)+i*(y>3?.13:.18),Z+.13); });
  /* Kühlschlangen hinter dem Reaktor */
  [-9.8,-6].forEach(x=>{ strich(rueck,[x,.2,Z+.22],[x,3.7,Z+.22],.16,METALL2); box(rueck,.5,.18,.4,DUNKEL,x,.09,Z+.22); });
  for(let i=0;i<7;i++){ const y=.65+i*.45; strich(rueck,[-9.8,y,Z+.25],[-6,y,Z+.25],.1,i%2?KUPFER:0x3aa8b0); [-8.9,-7.9,-6.9].forEach(x=>box(rueck,.1,.28,.26,STAHL,x,y,Z+.25)); }
  verschmelze(rueck);
  luefter.forEach(([x,y,r,v])=>{ rotor(hinten,k,r-.12,6,0x6ad0d8,x,y,Z+.27,v); const g=gruppe(hinten,x,y,Z+.72); strich(g,[-r,0,0],[r,0,0],.025,HELL); strich(g,[0,-r,0],[0,r,0],.025,HELL); verschmelze(g); });

  /* =============== Seitenwände: Rohrbündel, Steigrohre, Turbinen, Schläuche =============== */
  [[links,-1],[rechts,1]].forEach(([w,s])=>{
    const g=gruppe(w,0,0,0), X=s*(B/2);
    [[4.15,.2,KUPFER],[4.65,.14,STAHL],[5.05,.1,0x3aa8b0]].forEach(([y,r,c])=>{ strich(g,[X-s*.48,y,-13.1],[X-s*.48,y,13.2],r,c); for(let z=-11.6;z<12.5;z+=2.7) strich(g,[X-s*.48,y,z],[X-s*.48,y,z+.18],r+.055,METALL2); });
    (s<0?[-11.3,-8,.4,5.6,11.4]:[-12,-6.3,1.4,7.2,12]).forEach((z,i)=>{ const c=[KUPFER,0x3aa8b0,STAHL][i%3]; rohrzug(g,[[X-s*.48,4.15,z],[X-s*.3,3.8,z],[X-s*.3,.15,z]],.14,c); walze(g,.24,.16,METALL2,X-s*.3,.35,z); walze(g,.24,.16,METALL2,X-s*.3,2.4,z); });
    /* Lüftungsschlitze unten */
    (s<0?[-10.3,1.9,7]:[-.3,5.2,-7.8]).forEach(z=>{ box(g,.1,.9,1.6,DUNKEL,X-s*.06,1.25,z); for(let i=0;i<4;i++) box(g,.08,.08,1.35,STAHL,X-s*.13,.95+i*.2,z); });
    /* aufgehängte Schläuche */
    (s<0?[2.1]:[-4.2]).forEach(z=>{ box(g,.4,.18,.5,DUNKEL,X-s*.2,3.15,z); [.6,.5,.4].forEach((r,i)=>{ const t=ring(g,r,.075,i%2?0x2a3040:0x3a4458,X-s*(.2+i*.1),3.1-r,z); t.rotation.y=Math.PI/2; }); });
    verschmelze(g);
  });
  /* kleine Turbinenräder in den Seitenwänden */
  [[links,-1,7.4,2.9,2.2],[rechts,1,-10.8,2.8,-2],[rechts,1,4.9,2.9,1.8]].forEach(([w,s,z,y,v])=>{ const g=gruppe(w,s*(B/2-.04),y,z); g.rotation.y=-s*Math.PI/2;
    const f=gruppe(g,0,0,0); scheibe(f,.82,.08,SCHWARZ,0,0,.06); ring(f,.84,.11,TUERKIS,0,0,.14); verschmelze(f); rotor(g,k,.74,5,HELL,0,0,.17,v); });

  /* =============== Blinkende Lämpchen =============== */
  const stellen=[[],[],[]];
  for(let i=0;i<14;i++){ const x=2.9+i*1.05; stellen[i%3].push([x,5,Z+.72]); stellen[(i+1)%3].push([-x,5,Z+.72]); }
  const seiteL=[], seiteR=[];
  for(let i=0;i<20;i++){ const z=-12+i*1.25; seiteL.push([-B/2+.07,3.6,z,i%3]); seiteR.push([B/2-.07,3.6,z,(i+1)%3]); }
  const o=new THREE.Object3D();
  const lampen=(par,liste,farbe)=>{ const m=new THREE.InstancedMesh(GEO.sph,basis(farbe),liste.length); liste.forEach((p,i)=>{ o.position.set(p[0],p[1],p[2]); o.rotation.set(0,0,0); o.scale.set(.1,.1,.1); o.updateMatrix(); m.setMatrixAt(i,o.matrix); }); m.frustumCulled=false; par.add(m); return m; };
  const blink=[];
  [0xff9a30,0x40f0e0,0x80ff70].forEach((f,j)=>{ [[hinten,stellen[j]],[links,seiteL.filter(p=>p[3]===j)],[rechts,seiteR.filter(p=>p[3]===j)]].forEach(([w,l])=>blink.push({ m:lampen(w,l,f), j })); });
  k.anim.push(t=>{ blink.forEach(b=>{ b.m.visible=Math.sin(t*2.2+b.j*2.1)>-.55; }); });

  /* =============== Dampfwölkchen aus Standrohren =============== */
  const duesen=gruppe(sc,0,0,0);
  const quellen=[[-14.2,-12.3],[-3.4,-7.4],[14.4,-12.3],[16.7,6.2],[-16.7,-12.2],[-1.8,12.1]];
  quellen.forEach(([x,z])=>{ walze(duesen,.34,.14,0x4a4660,x,.07,z); walze(duesen,.18,1.1,KUPFER2,x,.62,z); walze(duesen,.25,.14,METALL2,x,.5,z); rohr(duesen,.29,.18,.24,METALL2,x,1.24,z,16); walze(duesen,.22,.02,SCHWARZ,x,1.37,z); k.kreis(x,z,.38); });
  verschmelze(duesen);
  const wolke=leuchtBild('rgba(235,245,255,.95)');
  quellen.forEach(([x,z],q)=>{ for(let i=0;i<4;i++){ const m=new THREE.SpriteMaterial({map:wolke,transparent:true,depthWrite:false,opacity:0}), s=new THREE.Sprite(m); sc.add(s);
    k.anim.push(t=>{ const f=(t*.32+i*.25+q*.17)%1; s.position.set(x+Math.sin(f*5+q)*.18*f,1.45+f*1.7,z); const g=.35+f*1.15; s.scale.set(g,g,1); m.opacity=.5*Math.sin(f*Math.PI); }); } });

  /* =============== Kleinteile: Nieten, Schrauben und Muttern (je ein Zeichenaufruf) =============== */
  const nieten=new THREE.InstancedMesh(GEO.cyl,mat(0x32364a),220);
  for(let i=0;i<220;i++){ o.position.set(-17+(i%20)*1.79+(Math.floor(i/20)%2)*.5,.006,-12.4+Math.floor(i/20)*2.45); o.rotation.set(0,0,0); o.scale.set(.05,.008,.05); o.updateMatrix(); nieten.setMatrixAt(i,o.matrix); }
  nieten.frustumCulled=false; sc.add(nieten);
  const ecken=[[-14.4,-10.4],[-8.4,5.2],[1.8,-1.6],[7.6,-2.2],[-12,11],[7.6,6.4],[13.2,11.6],[12.4,-8.6],[-2.4,-5.6],[-15,-8.4]];
  const muttern=new THREE.InstancedMesh(new THREE.CylinderGeometry(1,1,1,6),mat(0x7a8296),60);
  for(let i=0;i<60;i++){ const e=ecken[i%ecken.length], a=zufall()*6.28, r=Math.sqrt(zufall())*.9; o.position.set(e[0]+Math.cos(a)*r,.03,e[1]+Math.sin(a)*r*.7); o.rotation.set(0,zufall()*3.14,0); o.scale.set(.06,.045,.06); o.updateMatrix(); muttern.setMatrixAt(i,o.matrix); }
  muttern.receiveShadow=true; muttern.frustumCulled=false; sc.add(muttern);

  /* =============== Licht =============== */
  flacker(k,11,3.8,-5,0xff9a40,.6,14); flacker(k,-8,3.8,7,0xff9a40,.5,13);

  /* =============== Leben: zwei Messdrohnen (fliegen über den Dingen) =============== */
  WELTRAUM.drohne(k,-.6,1.2,2.6,3.9,.45,0);
  WELTRAUM.drohne(k,10.5,-4.8,2.4,4,-.4,2.5);

  return { tuer, start:[0,9.5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.8,-11],[-9.8,-9.6],[-4.6,-11.6],[4.6,-11.8],[8.9,-10.4],[16.6,-12],[15.8,-5.2],[5.4,-7.6],[-5.8,-5.4],[-14.8,-2.6],
  [-16.6,3.8],[-11.4,2.2],[-2.9,2.8],[11.2,.1],[16.6,.4],[14.2,7.8],[9.8,10.4],[.6,11.8],[-12.6,9.4],[-4.2,9.8]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-12.8, z:5, dreh:.15, steh:[-12.5,6.5], kasten:[2.7,1.2], treffer:[2.6,2.5,1.1], baue(g){ /* 1 Rohrventil: Kupferrohr mit großem rotem Handrad */
      [-.95,.95].forEach(x=>{ walze(g,.4,.14,DUNKEL,x,.07,0); walze(g,.32,.16,METALL2,x,.22,0); [-1,1].forEach(s=>ball(g,.05,HELL,x+s*.28,.16,.24)); });
      rohrzug(g,[[-.95,.1,0],[-.95,.95,0],[.95,.95,0],[.95,.1,0]],.24,KUPFER);
      [-.5,.5].forEach(x=>{ quer(g,.34,.14,METALL2,x,.95,0); });
      ball(g,.42,KUPFER2,0,.95,0,1.1,1,1); walze(g,.2,.16,METALL2,0,1.34,0); strich(g,[0,1.3,0],[0,1.75,.05],.08,HELL);
      strich(g,[0,1.72,0],[0,1.75,.3],.07,HELL);
      const rad=gruppe(g,0,1.75,.34); ring(rad,.62,.085,ROT,0,0,0);
      for(let i=0;i<3;i++){ const a=i*Math.PI/3+.5; strich(rad,[Math.cos(a)*.6,Math.sin(a)*.6,0],[-Math.cos(a)*.6,-Math.sin(a)*.6,0],.05,ROT); }
      scheibe(rad,.15,.14,0x8a1a14,0,0,0); ball(rad,.07,GELB,0,0,.1);
    } },
  { x:-8, z:8.4, dreh:.14, steh:[-7.7,10.1], kasten:[2.7,1.6], treffer:[2.5,2.2,1.4], baue(g){ /* 2 Werkzeugwagen: rot, Schubladen, Rollen, Griff, Werkzeug obenauf */
      [-.85,.85].forEach(x=>[-.42,.42].forEach(z=>{ scheibe(g,.2,.16,SCHWARZ,x,.2,z); scheibe(g,.08,.18,HELL,x,.2,z); box(g,.14,.18,.1,STAHL,x,.4,z); }));
      box(g,2.1,1.15,1.1,ROT,0,1.02,0); box(g,2.16,.08,1.16,0x8a1a14,0,.46,0); box(g,2.2,.1,1.2,SCHWARZ,0,1.65,0);
      [.7,1.05,1.4].forEach(y=>{ box(g,1.9,.28,.04,0xf2685a,0,y,.56); box(g,.8,.07,.09,HELL,0,y+.03,.61); });
      box(g,1.9,.28,.34,0xf2685a,0,1.05,.55); box(g,.8,.07,.09,HELL,0,1.08,.76);
      [-1,1].forEach(s=>box(g,2.18,.07,.07,HELL,0,1.74,s*.56)); [-1,1].forEach(s=>box(g,.07,.07,1.18,HELL,s*1.08,1.74,0));
      rohrzug(g,[[1.05,1.45,-.4],[1.35,1.55,-.4],[1.35,1.55,.4],[1.05,1.45,.4]],.055,HELL); quer(g,.08,.04,SCHWARZ,1.35,1.55,0);
      /* großer Schraubenschlüssel, Schraubendreher und gelbe Dose */
      const s=gruppe(g,-.45,1.78,.12); s.rotation.y=.35; box(s,.9,.08,.14,HELL,0,0,0);
      [-1,1].forEach(v=>{ const m=ring(s,.15,.065,HELL,v*.55,0,0,Math.PI*1.45); m.rotation.set(-Math.PI/2,0,v>0?.85:Math.PI+.85); });
      walze(g,.24,.34,GELB,.55,1.87,-.15); walze(g,.25,.05,SCHWARZ,.55,2.05,-.15);
      [[.49,BLAU,-.1],[.62,GRUEN,.12]].forEach(([x,c,n])=>{ strich(g,[x,2.0,-.15],[x+n,2.34,-.15],.03,HELL); strich(g,[x+n*.7,2.24,-.15],[x+n*1.25,2.44,-.15],.065,c); });
      quer(g,.09,.5,BLAU,.35,1.8,.35); quer(g,.04,.3,HELL,.74,1.8,.35);
    } },
  { x:11.4, z:-10, steh:[11.4,-8.2], r:1.15, treffer:[2.2,3.2,2], baue(g){ /* 3 Treibstofftank: gelb, auf Füßen, Warnstreifen, Tankdeckel */
      for(let i=0;i<4;i++){ const a=i*Math.PI/2+Math.PI/4; strich(g,[Math.sin(a)*.9,0,Math.cos(a)*.9],[Math.sin(a)*.62,.75,Math.cos(a)*.62],.1,METALL2); walze(g,.18,.08,DUNKEL,Math.sin(a)*.9,.04,Math.cos(a)*.9); }
      walze(g,.88,1.65,GELB,0,1.5,0); ball(g,.88,GELB,0,.7,0,1,.45,1); ball(g,.88,GELB,0,2.32,0,1,.5,1);
      [.76,2.26].forEach(y=>reif(g,.89,.055,METALL2,0,y,0));
      walze(g,.895,.38,SCHWARZ,0,1.15,0);
      for(let i=0;i<18;i++){ const a=i*Math.PI/9, b=box(g,.14,.5,.04,GELB,Math.sin(a)*.9,1.15,Math.cos(a)*.9); b.rotation.order='YXZ'; b.rotation.y=a; b.rotation.z=-.6; }
      [.93,1.37].forEach(y=>walze(g,.915,.08,GELB,0,y,0));
      /* Tropfen-Zeichen für Treibstoff */
      scheibe(g,.34,.05,WEISS,0,1.85,.89); ball(g,.14,ORANGE,0,1.8,.93,1,1,.25); const sp=kegel(g,.122,.22,ORANGE,0,1.97,.93); sp.scale.z=.035;
      walze(g,.3,.2,METALL2,0,2.83,0); walze(g,.36,.14,ROT,0,2.99,0); box(g,.16,.08,.5,ROT,0,3.08,0);
      rohrzug(g,[[.84,1.9,.2],[1.05,1.75,.35],[1.14,.8,.5],[.95,.48,.65]],.09,SCHWARZ);
      /* Düse steckt im Halter, der am Tankfuß befestigt ist */
      walze(g,.12,.36,DUNKEL,.95,.32,.65); walze(g,.2,.18,METALL2,.95,.09,.65); strich(g,[.64,.1,.64],[.95,.1,.65],.07,METALL2);
    } },
  { x:3.5, z:2.4, dreh:-.15, steh:[3.3,4.1], kasten:[2.3,1.4], treffer:[3,3,1.2], baue(g,k){ /* 4 Reparaturroboter: groß, stehend, mit Bildschirm auf dem Bauch */
      const K=0xf09030, k2=0xb45a18;
      [-.42,.42].forEach(x=>{ box(g,.52,.2,.82,DUNKEL,x,.1,.08); walze(g,.17,.55,STAHL,x,.46,0); ball(g,.2,DUNKEL,x,.52,0); walze(g,.22,.16,k2,x,.72,0); });
      box(g,1.1,.22,.7,DUNKEL,0,.87,0);
      box(g,1.45,1.15,.9,K,0,1.54,0); box(g,1.55,.12,1,k2,0,1.0,0); box(g,1.55,.12,1,k2,0,2.14,0);
      WELTRAUM.bildschirm(g,k,.98,.66,0,1.56,.53,'kurve','#6aff9a');
      [-.6,.6].forEach(x=>[1.16,1.98].forEach(y=>ball(g,.055,HELL,x,y,.47)));
      walze(g,.2,.18,DUNKEL,0,2.28,0);
      box(g,.94,.62,.72,HELL,0,2.66,0); box(g,.78,.34,.05,DUNKEL,0,2.68,.37);
      [-.2,.2].forEach(x=>{ scheibe(g,.12,.06,basis(0x70f0ff),x,2.7,.41); ball(g,.04,SCHWARZ,x,2.7,.45); });
      [-1,1].forEach(s=>quer(g,.15,.12,K,s*.52,2.66,0));
      walze(g,.34,.14,GELB,0,3.03,0); ball(g,.13,basis(0xffe080),0,3.12,0);
      /* linker Arm mit Greifzange, rechter Arm hält einen Schraubenschlüssel */
      [-1,1].forEach(s=>{ ball(g,.24,DUNKEL,s*.84,1.9,0); const hand=s<0?[-1.16,1.04,.28]:[1.18,1.62,.34], ell=s<0?[-1.08,1.45,.04]:[1.2,1.25,.04];
        strich(g,[s*.84,1.9,0],ell,.12,STAHL); ball(g,.15,K,ell[0],ell[1],ell[2]); strich(g,ell,hand,.11,STAHL); ball(g,.17,DUNKEL,hand[0],hand[1],hand[2]); });
      [-1,1].forEach(v=>{ strich(g,[-1.16,1.0,.3],[-1.16+v*.18,.82,.34],.05,GELB); strich(g,[-1.16+v*.18,.82,.34],[-1.16+v*.06,.66,.36],.05,GELB); });
      strich(g,[1.18,1.36,.36],[1.18,2.22,.4],.065,HELL); const m=ring(g,.17,.075,HELL,1.18,2.37,.4,Math.PI*1.45); m.rotation.z=Math.PI*.5+.86;
    } },
  { wand:'links', x:-18, z:-5, dreh:Math.PI/2, steh:[-16.4,-5], treffer:[2.9,2.5,1], trefferY:1, baue(g){ /* 5 Schaltkasten: offene Tür mit Blitz, drei große Hebel, Lämpchen */
      box(g,2,2.2,.3,HELL,0,2.25,.16); box(g,1.72,1.92,.05,0x2a3040,0,2.25,.33);
      [-.55,0,.55].forEach((x,i)=>{ const c=[ROT,GRUEN,0x50d8ff][i], hoch=i!==1; box(g,.14,.8,.06,SCHWARZ,x,2.05,.37); scheibe(g,.09,.12,METALL,x,2.05,.43);
        const y=hoch?2.42:1.68; strich(g,[x,2.05,.45],[x,y,.62],.05,HELL); quer(g,.1,.36,c,x,y,.63); });
      [[-.6,GRUEN],[-.2,GELB],[.2,ROT],[.6,0x50d8ff]].forEach(([x,c])=>{ scheibe(g,.13,.08,METALL2,x,2.92,.37); ball(g,.09,basis(c),x,2.92,.42); });
      [-.55,0,.55].forEach((x,i)=>rohrzug(g,[[x,1.55,.37],[x+.1,1.3,.42],[(i-1)*.25,1.2,.36]],.04,[ROT,GELB,BLAU][i]));
      /* aufgeklappte Tür rechts */
      const t=gruppe(g,1.02,2.25,.3); t.rotation.y=-.55; box(t,1,2.2,.09,METALL,.5,0,0); box(t,.84,2,.03,HELL,.5,0,.055);
      const D=new THREE.Shape(); [[.12,.55],[-.28,-.08],[-.03,-.08],[-.14,-.55],[.3,.12],[.04,.12],[.12,.55]].forEach((p,i)=>i?D.lineTo(p[0],p[1]):D.moveTo(p[0],p[1]));
      box(t,.76,1.28,.02,GELB,.5,.15,.08); const bl=new THREE.Mesh(new THREE.ShapeGeometry(D),mat(SCHWARZ)); bl.position.set(.5,.15,.1); t.add(bl);
      ball(t,.07,SCHWARZ,.82,-.72,.09);
      rohrzug(g,[[-.5,1.14,.15],[-.5,.15,.15]],.09,SCHWARZ); rohrzug(g,[[0,1.14,.15],[0,.15,.15]],.09,SCHWARZ);
    } },
  { wand:'hinten', x:8.2, z:-13.5, steh:[8.2,-11.7], treffer:[3.9,2.4,.8], trefferY:1.2, baue(g){ /* 6 Anzeigetafel: drei runde Zeigeruhren und eine Reihe grüner Balken */
      box(g,3.7,2.2,.2,TUERKIS,0,2.4,.12); box(g,3.46,1.96,.08,0x242a3a,0,2.4,.22);
      [-1.12,0,1.12].forEach((x,i)=>{ scheibe(g,.5,.06,METALL,x,2.68,.28); scheibe(g,.43,.04,WEISS,x,2.68,.32);
        for(let j=0;j<7;j++){ const a=Math.PI*(1.1-j*.2); box(g,.035,.1,.015,j>4?ROT:SCHWARZ,x+Math.cos(a)*.33,2.68+Math.sin(a)*.33,.35).rotation.z=a-Math.PI/2; }
        const a=[2.35,1.5,.75][i]; strich(g,[x,2.68,.37],[x+Math.cos(a)*.34,2.68+Math.sin(a)*.34,.37],.028,ROT); ball(g,.065,SCHWARZ,x,2.68,.37); });
      for(let i=0;i<10;i++){ const hh=.18+((i*7)%5)*.07; box(g,.2,hh,.04,basis(i>7?0xffc040:0x60ff80),-1.35+i*.3,1.56+hh/2,.28); }
      [-1,1].forEach(s=>[-1,1].forEach(v=>ball(g,.07,GELB,s*1.74,2.4+v*.99,.24)));
    } },
  { x:13.7, z:-3.4, dreh:-.25, steh:[13.2,-1.7], kasten:[1.9,1.55], treffer:[1.7,2.9,1.3], baue(g){ /* 7 Batterie: groß, grüne Ladebalken, Plus- und Minuspol */
      box(g,1.7,.18,1.25,SCHWARZ,0,.09,0);
      box(g,1.5,2.15,1.05,0x2a8a4a,0,1.25,0); [-1,1].forEach(a=>[-1,1].forEach(b=>walze(g,.09,2.15,0x1e6a38,a*.75,1.25,b*.52)));
      box(g,1.66,.18,1.2,HELL,0,2.38,0);
      box(g,1.06,1.68,.05,SCHWARZ,0,1.2,.54);
      for(let i=0;i<4;i++) box(g,.82,.3,.04,i<3?basis(0x7aff5a):0x3a5a40,0,.6+i*.39,.58);
      [-.45,.45].forEach((x,i)=>{ const c=i?BLAU:ROT; walze(g,.26,.14,c,x,2.54,0); walze(g,.15,.26,HELL,x,2.72,0); box(g,.3,.08,.04,WEISS,x,2.15,.54); if(!i) box(g,.08,.22,.045,WEISS,x,2.15,.54); });
      rohrzug(g,[[.45,2.82,0],[.7,2.98,-.2],[.95,2.4,-.4],[.92,.15,-.45]],.07,BLAU); rohrzug(g,[[-.45,2.82,0],[-.7,2.98,-.2],[-.95,2.4,-.4],[-.92,.15,-.45]],.07,ROT);
    } },
  { x:10.2, z:8.2, dreh:-.18, steh:[9.7,10], kasten:[2.8,1.8], treffer:[2.7,2,1.6], baue(g){ /* 8 Ersatzteilkiste: offene blaue Kiste voller Schrauben, Federn, Rohrstücke */
      const F=0x3a72c0, D=0x28508a;
      box(g,2.35,.14,1.4,D,0,.07,0);
      [-1,1].forEach(s=>{ box(g,2.35,.84,.12,F,0,.52,s*.66); box(g,.12,.84,1.22,F,s*1.12,.52,0); box(g,2.45,.1,.18,HELL,0,.96,s*.66); box(g,.18,.1,1.2,HELL,s*1.14,.96,0); [-1,1].forEach(v=>box(g,.16,.9,.16,D,s*1.12,.52,v*.66)); });
      box(g,.9,.38,.04,GELB,0,.52,.74); [-.24,0,.24].forEach(x=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,.04,6),mat(SCHWARZ)); m.rotation.x=Math.PI/2; m.position.set(x,.52,.77); g.add(m); ball(g,.04,GELB,x,.52,.8); });
      box(g,2.15,.5,1.18,0x4a5266,0,.38,0);
      for(let i=0;i<22;i++){ const x=-.9+(i%8)*.26+((i%3)-1)*.04, z=-.42+Math.floor(i/8)*.4, y=.68+((i*5)%4)*.05;
        if(i%4===0){ const m=ring(g,.14,.06,STAHL,x,y+.04,z); m.rotation.set(-1.1,i*.3,0); }
        else if(i%4===1){ strich(g,[x-.14,y,z],[x+.12,y+.14,z+.06],.04,HELL); ball(g,.085,HELL,x+.13,y+.15,z+.06,1,.7,1); }
        else if(i%4===2) ball(g,.12,[ORANGE,GRUEN,ROT,GELB][i%7%4],x,y,z,1,.8,1);
        else walze(g,.1,.24,KUPFER,x,y,z).rotation.set(.9,0,i*.4); }
      /* Feder, Rohrstück und Antenne ragen heraus */
      for(let i=0;i<6;i++){ const m=ring(g,.17,.035,HELL,-.72+i*.045,.86+i*.1,.1); m.rotation.set(Math.PI/2,.28,0); }
      rohrzug(g,[[.35,.7,.1],[.62,1.35,0],[1.0,1.5,-.05]],.13,KUPFER); quer(g,.17,.1,METALL2,1.0,1.5,-.05).rotation.z=1.2;
      strich(g,[.05,.7,-.3],[-.1,1.6,-.38],.035,STAHL); ball(g,.11,ROT,-.1,1.62,-.38);
      /* Deckel lehnt hinten */
      const d=gruppe(g,0,.98,-.76); d.rotation.x=-.32; box(d,2.35,.9,.1,F,0,.43,0); box(d,2.0,.62,.04,D,0,.43,.06);
    } },
  { x:-11.6, z:-7.4, dreh:.2, steh:[-11.2,-5.7], kasten:[2.7,1.4], treffer:[2.5,3,1.1], baue(g){ /* 9 Zahnrad: großes Rad mit Zacken auf einem Ständer */
      const N=12, RA=1.28, RI=1.0, S=new THREE.Shape(), Y=1.72;
      for(let i=0;i<N;i++){ const a=i*Math.PI*2/N, d=Math.PI*2/N;
        [[a,RI],[a+d*.14,RA],[a+d*.44,RA],[a+d*.58,RI],[a+d*.79,RI*.99]].forEach(([w,r],j)=>{ if(!i&&!j) S.moveTo(Math.cos(w)*r,Math.sin(w)*r); else S.lineTo(Math.cos(w)*r,Math.sin(w)*r); }); }
      for(let i=0;i<5;i++){ const a=i*Math.PI*2/5+.3, L=new THREE.Path(); L.absarc(Math.cos(a)*.6,Math.sin(a)*.6,.2,0,Math.PI*2,true); S.holes.push(L); }
      const m=new THREE.Mesh(new THREE.ExtrudeGeometry(S,{depth:.34,bevelEnabled:false,curveSegments:12}),mat(0x5ac8d0)); m.position.set(0,Y,-.12); m.castShadow=true; m.receiveShadow=true; g.add(m);
      ring(g,.88,.035,0x2a7a88,0,Y,.23); scheibe(g,.34,.14,ORANGE,0,Y,.27); scheibe(g,.14,.18,HELL,0,Y,.33);
      for(let i=0;i<5;i++){ const a=i*Math.PI*2/5+.93; ball(g,.055,DUNKEL,Math.cos(a)*.25,Y+Math.sin(a)*.25,.34); }
      /* Ständer: zwei Beine hinter dem Rad und breiter Fuß */
      box(g,2.5,.18,1.1,DUNKEL,0,.09,0);
      [-1,1].forEach(s=>{ strich(g,[s*.95,.15,-.32],[0,Y,-.32],.11,METALL2); box(g,.34,.4,.7,METALL2,s*.55,.34,0); });
      strich(g,[0,Y,-.34],[0,Y,.2],.11,HELL);
    } },
  { x:15, z:3.4, dreh:-.3, steh:[13.5,3.9], r:.75, treffer:[1.4,2.5,1.2], baue(g){ /* 10 Feuerlöscher: rote Flasche mit Griff und Schlauch in einem Halter */
      const F=0xe0281e;
      box(g,1.15,.12,.95,DUNKEL,0,.06,0); box(g,.5,1.7,.1,METALL2,0,.95,-.42);
      walze(g,.4,1.4,F,0,.85,0); ball(g,.4,F,0,1.55,0,1,.65,1); walze(g,.42,.12,SCHWARZ,0,.18,0);
      [.55,1.35].forEach(y=>reif(g,.42,.04,HELL,0,y,-.0));
      box(g,.46,.5,.05,WEISS,0,.96,.39); ball(g,.12,ORANGE,0,.9,.42,1,1,.2); const fl=kegel(g,.105,.26,ORANGE,0,1.07,.42); fl.scale.z=.025; ball(g,.055,GELB,0,.87,.45,1,1.3,.25);
      walze(g,.14,.24,HELL,0,1.9,0); box(g,.2,.18,.2,SCHWARZ,0,2.05,0);
      const o1=box(g,.62,.08,.16,SCHWARZ,.16,2.23,0); o1.rotation.z=.22; box(g,.5,.07,.14,SCHWARZ,.2,2.04,0);
      scheibe(g,.11,.06,WEISS,0,1.9,.16); strich(g,[0,1.9,.2],[.06,1.96,.2],.012,F);
      rohrzug(g,[[-.12,2.02,0],[-.46,1.96,.1],[-.58,1.5,.18],[-.52,.9,.34]],.06,SCHWARZ);
      const d=kegel(g,.14,.42,SCHWARZ,-.5,.68,.37); d.rotation.z=-.15;
    } }
];

return { titel:'Der Maschinenraum', breite:36, tiefe:27, oben:WELTRAUM.OBEN, baue, gegenstaende, verstecke };
})();

/* Raum 4: Die Andockbucht (große Halle im Raumschiff). Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: große Luftschleuse in der Mitte der Rückwand, zwei schwere Torhälften fahren zur Seite, dahinter der Mond. */
RAEUME3D.raumschiff[3] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, BLAU, TUERKIS, ORANGE, ROT, GELB, GRUEN, GOLD } = WELTRAUM;
const SCHWARZ=0x1e222c, HELL=0xd4dce8, GRAU=0x8a94a6, CYAN=0x6ff0ff;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* Scheibe mit Blick nach +z (Knopf, Linse, Nabe) */
const knopf=(p,r,h,c,x,y,z)=>{ const t=walze(p,r,h,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* Walze quer (Achse entlang x) */
const quer=(p,r,l,c,x,y,z)=>{ const t=walze(p,r,l,c,x,y,z); t.rotation.z=Math.PI/2; return t; };
/* Drehkörper aus Profilpunkten [Radius, Höhe] */
const dreh=(p,punkte,c,x,y,z)=>{ const geo=new THREE.LatheGeometry(punkte.map(q=>new THREE.Vector2(q[0],q[1])),26);
  const m=new THREE.Mesh(geo,mat(c,{side:THREE.DoubleSide})); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; p.add(m); return m; };
/* flacher Strich auf dem Boden */
const marke=(p,w,d,c,x,z,y)=>{ const m=box(p,w,.012,d,c,x,y||.014,z); m.castShadow=false; return m; };
/* gelb-schwarze Warnstreifen als Fläche mit Blick nach +z */
let warnBild=null;
function warn(p,w,h,x,y,z){
  if(!warnBild) warnBild=bild(128,128,(g)=>{ g.fillStyle='#ffc820'; g.fillRect(0,0,128,128); g.fillStyle='#20232c';
    for(let i=-2;i<4;i++){ g.beginPath(); g.moveTo(i*64,0); g.lineTo(i*64+32,0); g.lineTo(i*64+160,128); g.lineTo(i*64+128,128); g.fill(); } });
  const t=warnBild.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(w/.8,h/.8);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:t})); m.position.set(x,y,z); m.receiveShadow=true; p.add(m); return m;
}

/* ---------- Ausgang: Luftschleuse ---------- */
function schleuse(k,H){
  const sc=k.scene, w=H.hinten;
  /* Schleusenkammer und Mondlandschaft dahinter */
  const mond=bild(640,448,(g)=>{ g.fillStyle='#03050f'; g.fillRect(0,0,640,448);
    for(let i=0;i<190;i++){ g.fillStyle=['#ffffff','#bcd8ff','#ffe8b0'][i%3]; g.beginPath(); g.arc(zufall()*640,zufall()*310,zufall()<.1?2.6:1.2,0,7); g.fill(); }
    /* Erde am Himmel */
    g.fillStyle='#2f78d0'; g.beginPath(); g.arc(235,210,44,0,7); g.fill(); g.fillStyle='#5ac060'; [[218,194,20,13],[252,224,17,20],[222,236,9,6]].forEach(p=>{ g.beginPath(); g.ellipse(p[0],p[1],p[2],p[3],.5,0,7); g.fill(); });
    g.fillStyle='rgba(255,255,255,.75)'; [[225,184,25,5],[245,210,22,4],[215,220,16,4]].forEach(p=>{ g.beginPath(); g.ellipse(p[0],p[1],p[2],p[3],-.2,0,7); g.fill(); });
    /* Mondberge und Krater */
    g.fillStyle='#74747e'; g.beginPath(); g.moveTo(0,330); [[80,285],[170,318],[260,292],[360,330],[450,270],[540,312],[640,290]].forEach(p=>g.lineTo(p[0],p[1])); g.lineTo(640,448); g.lineTo(0,448); g.fill();
    g.fillStyle='#a8a8b0'; g.fillRect(0,342,640,106);
    [[150,372,44,10],[330,408,60,13],[500,366,34,8],[240,352,22,5]].forEach(p=>{ g.fillStyle='#d0d0d6'; g.beginPath(); g.ellipse(p[0],p[1]+3,p[2],p[3],0,0,7); g.fill(); g.fillStyle='#6c6c76'; g.beginPath(); g.ellipse(p[0],p[1],p[2]*.88,p[3]*.8,0,0,7); g.fill(); });
    /* Landekapsel in der Ferne */
    g.strokeStyle='#d8dce4'; g.lineWidth=5; [[392,340,376,362],[428,340,444,362]].forEach(p=>{ g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(p[2],p[3]); g.stroke(); });
    g.fillStyle='#f0f2f6'; g.beginPath(); g.moveTo(385,348); g.lineTo(397,296); g.quadraticCurveTo(410,278,423,296); g.lineTo(435,348); g.fill(); g.fillStyle='#e8a030'; g.fillRect(389,330,42,6); g.fillStyle='#2a4a8a'; g.beginPath(); g.arc(410,312,8,0,7); g.fill(); });
  const hm=new THREE.Mesh(new THREE.PlaneGeometry(11,7.7),new THREE.MeshBasicMaterial({map:mond})); hm.position.set(0,2.75,-16.4); w.add(hm);
  const nacht=new THREE.Mesh(new THREE.PlaneGeometry(22,8),basis(0x03050f)); nacht.position.set(0,2.75,-16.46); w.add(nacht);
  const kammer=gruppe(w,0,0,0);
  box(kammer,11,.06,2.9,0x9a9aa4,0,-.02,-14.95);
  [[-1.7,-15.3,.55],[1.5,-14.5,.4],[.6,-15.9,.35]].forEach(p=>{ const a=walze(kammer,p[2],.012,0x74747e,p[0],.018,p[1]); a.castShadow=false; reif(kammer,p[2],.05,0xc4c4cc,p[0],.025,p[1]).castShadow=false; });
  [[-2.35,-15.6,.34],[2.3,-15.4,.45],[2.55,-14.4,.22]].forEach(p=>ball(kammer,p[2],0x8a8a94,p[0],p[2]*.5,p[1],1.2,.8,1));
  [-1,1].forEach(s=>box(kammer,.3,4.6,.55,SCHWARZ,s*3.02,2.3,-14.2));
  verschmelze(kammer);
  /* zwei schwere Torhälften */
  const haelfte=s=>{ const g=gruppe(w,s*1.42,0,-13.38), fest=gruppe(g,0,0,0);
    box(fest,2.84,4.62,.18,0x929db2,0,2.28,0);
    [.95,2.3,3.65].forEach(y=>{ box(fest,2.4,1.05,.07,0xaab6ca,0,y,.1); [-1.08,1.08].forEach(x=>[-.38,.38].forEach(v=>knopf(fest,.075,.07,METALL2,x,y+v,.15))); });
    box(fest,.12,4.45,.1,DUNKEL,-s*1.36,2.22,.09);
    /* halbes Verriegelungsrad an der Mittelnaht */
    const r=ring(fest,.82,.1,ORANGE,-s*1.41,2.3,.19,Math.PI); r.rotation.z=-s*Math.PI/2;
    [-.6,0,.6].forEach(a=>strich(fest,[-s*1.41,2.3,.2],[-s*1.41+s*Math.cos(a)*.8,2.3+Math.sin(a)*.8,.2],.06,ORANGE));
    verschmelze(fest);
    warn(g,2.6,.42,0,.28,.15); warn(g,.28,3.9,-s*1.15,2.35,.145);
    return g; };
  const links=haelfte(-1), rechts=haelfte(1);
  /* Rahmen und Taschen, in die die Hälften fahren */
  const rahmen=gruppe(w,0,0,0);
  [-1,1].forEach(s=>{ box(rahmen,2.9,4.55,.2,0x56617a,s*4.62,2.27,-13.1); box(rahmen,.42,4.8,.34,DUNKEL,s*3.03,2.4,-13.04);
    [.75,3.85].forEach(y=>box(rahmen,2.1,.16,.06,METALL,s*4.85,y,-12.98)); box(rahmen,.5,.5,.5,METALL,s*3.03,.25,-12.98); });
  box(rahmen,12.3,.5,.55,DUNKEL,0,4.82,-13.12); box(rahmen,5.7,.08,.4,METALL,0,.04,-13.3);
  verschmelze(rahmen);
  [-1,1].forEach(s=>{ warn(w,.34,4.6,s*3.03,2.3,-12.86); warn(w,2.7,.3,s*4.65,.18,-12.99); });
  warn(w,6.4,.32,0,4.8,-12.835);
  /* Signallampen über dem Tor */
  const lampeM=basis(0xff4a3a);
  [-4.9,-4.2,4.2,4.9].forEach(x=>{ knopf(w,.24,.1,SCHWARZ,x,4.82,-12.82); const m=ball(w,.17,lampeM,x,4.82,-12.76,1,1,.7); m.castShadow=false; });
  /* Riegelstange und goldenes Zahlenschloss rechts neben dem Tor (die Figur verdeckt es nicht) */
  const riegel=gruppe(w,0,0,0);
  quer(riegel,.09,2.3,GOLD,2.55,2.3,-12.8); [1.5,3.1].forEach(x=>box(riegel,.24,.36,.4,METALL2,x,2.3,-12.93));
  verschmelze(riegel);
  const schloss=gruppe(w,4.05,2.28,-12.87); WELTRAUM.zahlenschloss(schloss,0,0,0); schloss.scale.set(1.35,1.35,1.2); verschmelze(schloss);
  const licht=new THREE.PointLight(0xe8f0ff,0,13,1.5); licht.position.set(0,3.4,-14); sc.add(licht);
  k.kasten(0,-13.25,12.4,.8);
  return ausgang(k,{ name:'Luftschleuse', einfach:'Großes Tor', steh:[0,-11.4], durch:[0,-14.7],
    treffer:{x:.35,y:2.45,z:-12.9,b:8.8,h:4.9,t:.9}, schildOben:[0,4.5,-11.9], glanz:[4.05,2.35,-12.35],
    bewege:(auf,t)=>{ links.position.x=-1.42-auf*2.95; rechts.position.x=1.42+auf*2.95; riegel.visible=schloss.visible=auf<.04;
      lampeM.color.setHex(auf>.5?0x5aff7a:(Math.sin((t||0)*3)>0?0xff4a3a:0xb02a20)); licht.intensity=1.3*auf; } });
}

/* ---------- rundes Fenster ins Weltall (in eine Gruppe, Blick nach +z) ---------- */
let sterne=null;
function rundfenster(par,k,x,y,z,r,inhalt){
  const g=gruppe(par,x,y,z);
  if(!sterne) sterne=WELTRAUM.sternBild(512,512,200);
  const s=new THREE.Mesh(new THREE.CircleGeometry(r,36),new THREE.MeshBasicMaterial({map:sterne})); s.position.z=.03; g.add(s);
  if(inhalt){ const p=gruppe(g,-r*.18,-r*.12,.06); p.scale.z=.08; WELTRAUM.planet(p,k,r*(inhalt==='erde'?.62:.4),0,0,0,inhalt); }
  const f=gruppe(g,0,0,0);
  ring(f,r+.1,.15,METALL,0,0,.12); ring(f,r+.32,.09,METALL2,0,0,.07);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4+.39; knopf(f,.075,.1,DUNKEL,Math.cos(a)*(r+.2),Math.sin(a)*(r+.2),.2); }
  verschmelze(f);
  return g;
}

/* ---------- Dekoration ---------- */
/* geparkte kleine Lastenfähre (geschlossen, ohne Licht aus dem Inneren) */
function faehre(k,x,z){
  const g=gruppe(k.scene,x,0,z), q=gruppe(g,0,0,0);
  [-.8,.8].forEach(v=>{ quer(q,.08,3.4,METALL2,0,.1,v); [-1.1,1.1].forEach(a=>strich(q,[a,.1,v],[a*.9,.75,v*.6],.07,METALL2)); });
  quer(q,.72,2.8,WEISS,-.1,1.15,0);
  ball(q,.72,WEISS,1.3,1.15,0,1.55,1,1);
  ball(q,.5,0x24508c,1.72,1.45,0,1.15,.7,1.02); ball(q,.1,0xcfeaff,1.9,1.76,.2,1.6,.5,1);
  [-.95,-.3,.35].forEach(a=>quer(q,.735,.14,a===-.3?ORANGE:0x3a6ab8,a,1.15,0));
  [-.65,.02,.68].forEach(a=>{ knopf(q,.17,.08,METALL2,a,1.28,.71); knopf(q,.11,.1,0x24508c,a,1.28,.73); });
  [-1,1].forEach(s=>{ const f=box(q,1.3,.11,.9,0x3a6ab8,-.65,.92,s*1.02); f.rotation.x=s*.16; box(q,.7,.14,.12,ORANGE,-.85,.84,s*1.48);
    quer(q,.27,.75,GRAU,-1.65,1.12,s*.45); quer(q,.19,.12,SCHWARZ,-2.05,1.12,s*.45); });
  const finne=box(q,.8,.7,.12,ORANGE,-1.15,2.02,0); finne.rotation.z=.35;
  verschmelze(q);
  const m=basis(0xff5a4a), b=ball(g,.09,m,-1.35,2.46,0); b.castShadow=false;
  k.anim.push(t=>b.material.color.setHex(Math.sin(t*2.4)>.3?0xff5a4a:0x602018)); /* der Verdecker tauscht das Material aus */
  k.verdecker(g,x,z,1.6); k.kasten(x-.1,z,4.8,3.2);
}
/* großer geriffelter Frachtbehälter */
function container(k,x,z,w,farbe,dunkel,zwei){
  const g=gruppe(k.scene,x,0,z); g.rotation.y=w; const q=gruppe(g,0,0,0);
  const stueck=(y,b,f,d)=>{ box(q,b,1.45,1.6,f,0,y+.75,0);
    for(let a=-b/2+.28;a<b/2-.2;a+=.34) [-.82,.82].forEach(v=>box(q,.13,1.15,.07,d,a,y+.75,v));
    [-b/2,b/2].forEach(a=>[-.8,.8].forEach(v=>box(q,.2,1.56,.2,METALL2,a,y+.78,v))); [-.8,.8].forEach(v=>{ box(q,b,.13,.17,METALL2,0,y+.09,v); box(q,b,.13,.17,METALL2,0,y+1.5,v); }); };
  stueck(0,2.7,farbe,dunkel); if(zwei) stueck(1.57,1.8,dunkel,farbe);
  verschmelze(q); k.verdecker(g,x,z,1.3);
  const quergedreht=Math.abs(Math.sin(w))>.7; k.kasten(x,z,quergedreht?1.9:3,quergedreht?3:1.9);
}
/* liegende Drucktanks auf Böcken */
function tanks(k,x,z,farbe){
  const g=gruppe(k.scene,x,0,z), q=gruppe(g,0,0,0);
  [-.75,.75].forEach(a=>{ box(q,.24,.34,1.25,DUNKEL,a,.17,0); [-1,1].forEach(v=>box(q,.26,.22,.18,DUNKEL,a,.42,v*.52)); });
  quer(q,.46,2,farbe,0,.72,0); [-1,1].forEach(s=>{ ball(q,.46,farbe,s*1,.72,0,.55,1,1); quer(q,.475,.12,METALL,s*.45,.72,0); });
  walze(q,.11,.22,METALL2,0,1.24,0); reif(q,.15,.035,ROT,0,1.37,0);
  verschmelze(q); k.kasten(x,z,2.7,1.35);
}
/* Roboterarm auf festem Sockel, schwenkt langsam */
function greifarm(k,x,z){
  const g=gruppe(k.scene,x,0,z), sockel=gruppe(g,0,0,0);
  walze(sockel,.85,.3,DUNKEL,0,.15,0); walze(sockel,.55,.5,ORANGE,0,.55,0); reif(sockel,.86,.06,GELB,0,.3,0); verschmelze(sockel);
  const dreht=gruppe(g,0,.85,0), a=gruppe(dreht,0,0,0), a1=gruppe(a,0,0,0);
  ball(a1,.3,METALL2,0,.05,0); strich(a1,[0,0,0],[.35,1.75,0],.17,ORANGE); ball(a1,.23,METALL2,.35,1.75,0); verschmelze(a1);
  const unter=gruppe(a,.35,1.75,0), u=gruppe(unter,0,0,0);
  strich(u,[0,0,0],[1.2,.5,0],.13,ORANGE); ball(u,.17,METALL2,1.2,.5,0); strich(u,[1.2,.5,0],[1.23,.22,0],.07,METALL);
  box(u,.5,.12,.2,METALL2,1.23,.18,0); [-1,1].forEach(s=>strich(u,[1.23+s*.2,.16,0],[1.23+s*.13,-.14,0],.05,METALL)); verschmelze(u);
  k.anim.push(t=>{ dreht.rotation.y=2.4+Math.sin(t*.45)*1.1; unter.rotation.z=Math.sin(t*.8)*.25; });
  k.verdecker(g,x,z,.9); k.kreis(x,z,.9);
}
/* Lagerroboter auf Ketten, trägt eine Frachtkapsel; fährt einen Rundweg */
function lagerroboter(k,weg,tempo,start){
  const g=gruppe(k.scene,0,0,0), q=gruppe(g,0,0,0); q.rotation.y=Math.PI/2; const r=gruppe(q,0,0,0);
  /* r blickt nach +z */
  [-1,1].forEach(s=>{ box(r,.22,.32,1.15,SCHWARZ,s*.48,.18,0); [-.57,.57].forEach(a=>quer(r,.16,.22,SCHWARZ,s*.48,.18,a)); [-.35,0,.35].forEach(a=>quer(r,.09,.26,METALL2,s*.48,.18,a)); });
  box(r,.76,.5,.95,GELB,0,.55,-.04); box(r,.78,.1,.97,DUNKEL,0,.45,-.04);
  box(r,.56,.45,.42,GELB,0,1.05,-.22); box(r,.46,.22,.06,SCHWARZ,0,1.1,.01);
  [-1,1].forEach(s=>{ ball(r,.065,basis(0x7aff9a),s*.12,1.11,.05); strich(r,[s*.42,.72,.1],[s*.42,.78,.88],.07,METALL2); });
  quer(r,.25,.8,TUERKIS,0,1.08,.7); [-.27,.27].forEach(a=>quer(r,.265,.09,METALL,a,1.08,.7));
  walze(r,.03,.3,METALL2,0,1.4,-.3);
  verschmelze(r);
  const m=basis(0xffa020), l=ball(g,.1,m,0,1.6,0); l.position.x=-.3; l.castShadow=false;
  k.anim.push(t=>m.color.setHex(Math.sin(t*7)>0?0xffb020:0x70440c));
  laeufer(k,g,weg,tempo,start,5);
}
/* Dinge, die schwerelos schweben und sich drehen */
function schwebend(k){
  const teil3=(x,y,z,t0,mal,tempo)=>{ const g=gruppe(k.scene,x,y,z), q=gruppe(g,0,0,0); mal(q); verschmelze(q); g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
    k.anim.push(t=>{ g.position.set(x+Math.sin(t*.37+t0)*.7,y+Math.sin(t*1.1+t0)*.35,z+Math.cos(t*.29+t0)*.5); q.rotation.set(t*tempo*.6+t0,t*tempo,Math.sin(t*.5+t0)*.7); }); };
  const schraube=q=>{ [[-.25,0,0],[.2,.22,.1],[.1,-.25,-.15]].forEach(p=>{ walze(q,.05,.34,METALL,p[0],p[1],p[2]); walze(q,.12,.08,METALL2,p[0],p[1]+.18,p[2]); }); ring(q,.1,.045,GOLD,.34,-.05,.12); };
  const schluessel=q=>{ strich(q,[-.36,0,0],[.3,0,0],.065,METALL); ring(q,.17,.07,METALL,.45,0,0,Math.PI*1.45).rotation.z=.85; ring(q,.12,.055,METALL,-.46,0,0); };
  const satellit=q=>{ box(q,.38,.38,.38,GOLD,0,0,0); [-1,1].forEach(s=>{ strich(q,[s*.19,0,0],[s*.34,0,0],.03,METALL2); box(q,.6,.34,.04,0x2f5ac0,s*.64,0,0); [-.15,.15].forEach(a=>box(q,.025,.34,.05,METALL,s*.64+a,0,0)); }); strich(q,[0,.19,0],[0,.46,0],.02,METALL); ball(q,.06,basis(0xff6a4a),0,.49,0); };
  const wuerfel=q=>{ box(q,.36,.36,.36,0x58d868,0,0,0); [-1,1].forEach(s=>{ ball(q,.07,WEISS,0,0,s*.19,1,1,.3); ball(q,.07,GELB,s*.19,0,0,.3,1,1); ball(q,.07,ROT,0,s*.19,0,1,.3,1); }); };
  const stift=q=>{ walze(q,.065,.65,0x3f8ce0,0,0,0); kegel(q,.065,.16,0xf0d0a0,0,.4,0); walze(q,.072,.1,ROT,0,-.36,0); };
  const ringkugel=q=>{ ball(q,.24,0xe86ab0,0,0,0); reif(q,.4,.035,GELB,0,0,0).rotation.x=1.2; };
  teil3(-2.5,4.8,5,0,satellit,.5); teil3(11.2,5.6,-2.6,1.4,schluessel,.8); teil3(-7.4,4.4,-10.4,2.6,schraube,.6);
  teil3(7.4,4,-8.6,3.9,wuerfel,.7); teil3(7.5,4.8,10,4.8,stift,.9); teil3(-4.8,3.9,2.2,5.5,ringkugel,.5); teil3(6.4,5.8,1.4,.8,schraube,.45);
  /* Wassertropfen, die wabbeln */
  const wm=new THREE.MeshLambertMaterial({color:0x6ad0ff,transparent:true,opacity:.7,emissive:0x1a5a80});
  [[-13.4,3.3,10.6,.3],[-12.7,3.8,11.1,.17],[-13.9,3.9,10.1,.12],[11.6,3.7,-10,.24],[12.2,3.2,-9.5,.13]].forEach((p,i)=>{ const m=ball(k.scene,p[3],wm,p[0],p[1],p[2]); m.castShadow=false;
    k.anim.push(t=>{ m.position.set(p[0]+Math.sin(t*.5+i)*.3,p[1]+Math.sin(t*1.3+i*2)*.28,p[2]); m.scale.set(p[3]*(1+.16*Math.sin(t*3+i)),p[3]*(1-.16*Math.sin(t*3+i)),p[3]); }); });
}
/* Schmuck der Seitenwände: runde Fenster, Rohre, Lüfter, Lampenreihen, Schlauchrolle */
function seitenwand(k,H,v){
  const par=v<0?H.links:H.rechts, g=gruppe(par,v*18,0,0); g.rotation.y=-v*Math.PI/2;
  /* in dieser Gruppe: x läuft die Wand entlang (Welt z = v*x), +z zeigt in den Raum */
  const P=z=>v*z;
  rundfenster(g,k,P(-1),2.9,0,1.2,v<0?'erde':null); rundfenster(g,k,P(7.2),2.9,0,1.05,v>0?'gas':null);
  const f=gruppe(g,0,0,0);
  quer(f,.13,26,ORANGE,0,5.05,.28); quer(f,.09,26,TUERKIS,0,4.65,.2);
  for(let z=-12;z<=12;z+=4) { box(f,.2,.75,.3,METALL2,P(z),4.85,.15); }
  [-11.2,3.1].forEach(z=>{ strich(f,[P(z),.4,.22],[P(z),4.65,.22],.11,METALL); [1.1,3.6].forEach(y=>walze(f,.17,.16,METALL2,P(z),y,.22)); reif(f,.27,.05,ROT,P(z),2.3,.36).rotation.x=0; strich(f,[P(z),2.3,.22],[P(z),2.3,.38],.05,ROT); });
  [-5.3,11].forEach(z=>{ box(f,1.7,.9,.1,DUNKEL,P(z),.95,.07); for(let i=0;i<5;i++) box(f,1.45,.07,.08,METALL,P(z),.65+i*.15,.15); });
  /* Schlauchrolle */
  [.55,.42,.29].forEach((r,i)=>ring(f,r,.075,i%2?0x2f6ac0:0x3f8ce0,P(-9.2),3.1,.2+i*.02)); knopf(f,.16,.2,GELB,P(-9.2),3.1,.24); box(f,.34,.34,.18,METALL2,P(-9.2),3.1,.09); strich(f,[P(-9.2)-.55,3.1,.17],[P(-9.2)+.55,3.1,.17],.045,METALL2); strich(f,[P(-9.2),2.55,.17],[P(-9.2),3.65,.17],.045,METALL2); strich(f,[P(-9.2)+.52,3,.2],[P(-9.2)+.68,1.9,.2],.075,0x3f8ce0);
  verschmelze(f);
  /* Lüfter, dreht sich */
  const l=gruppe(g,P(-5.3),2.85,.12); knopf(l,.85,.08,SCHWARZ,0,0,-.04); ring(l,.88,.1,METALL,0,0,.06);
  const fl=gruppe(l,0,0,.06); for(let i=0;i<5;i++){ const a=gruppe(fl,0,0,0); a.rotation.z=i*Math.PI*.4; const b=box(a,.62,.26,.04,GRAU,.42,0,0); b.rotation.x=.5; } knopf(fl,.18,.16,ORANGE,0,0,.03); verschmelze(fl);
  [-.35,.35].forEach(y=>quer(l,.025,1.7,METALL2,0,y,.2));
  k.anim.push(t=>{ fl.rotation.z=v*t*2.2; });
}
/* Bodenmarkierungen, Wegleuchten, Rundfeld */
function boden(k){
  const g=gruppe(k.scene,0,0,0);
  /* Pfeile zur Luftschleuse */
  [-8.6,-6.6,-4.6,.6,3.2,5.8].forEach(z=>[-1,1].forEach(s=>{ const m=marke(g,.95,.24,GELB,s*.33+.6*(z>-3?1:0),z,.016); m.rotation.y=-s*.65; }));
  [-1,1].forEach(s=>{ for(let z=-10.2;z<8;z+=1.5) marke(g,.14,.8,0xe8eef8,s*2.2+(z>-3?.6:0),z,.015); });
  /* Parkfeld der Fähre */
  [-1.85,1.85].forEach(v=>marke(g,5.6,.13,ORANGE,-4.2,-1.8+v,.017)); [-2.8,2.8].forEach(v=>marke(g,.13,3.55,ORANGE,-4.2+v,-1.8,.027));
  /* Ecken vor Frachtflächen */
  [[-13.2,10.4],[13.4,10.6],[-1,11],[12.8,-11]].forEach(([x,z])=>[-1,1].forEach(a=>{ marke(g,.9,.12,0xe8eef8,x+a*1.9,z-1.3,.018); marke(g,.12,.7,0xe8eef8,x+a*2.29,z-.95,.028); }));
  verschmelze(g);
  /* Warnstreifen vor dem Ausgang */
  const w=warn(k.scene,6.4,.55,0,.021,-12.2); w.rotation.x=-Math.PI/2;
  /* rundes Landefeld */
  const kreisf=(r1,r2,c,y)=>{ const m=new THREE.Mesh(new THREE.RingGeometry(r1,r2,48),mat(c)); m.rotation.x=-Math.PI/2; m.position.set(11.2,y,-1.6); m.receiveShadow=true; k.scene.add(m); };
  kreisf(2,2.22,GELB,.019); kreisf(1.15,1.27,0xe8eef8,.022);
  /* blinkende Bodenleuchten (zwei Gruppen im Wechsel) */
  const orte=[[],[]];
  for(let i=0;i<14;i++){ const a=i/14*Math.PI*2; orte[i%2].push([11.2+Math.cos(a)*2.55,-1.6+Math.sin(a)*2.55]); }
  for(let i=0;i<8;i++) [-1,1].forEach(s=>orte[i%2].push([s*3.1,-11.4+i*.95]));
  orte.forEach((liste,n)=>{ const m=basis(CYAN), I=new THREE.InstancedMesh(GEO.box,m,liste.length), M=new THREE.Matrix4();
    liste.forEach((p,i)=>{ M.makeScale(.24,.05,.24); M.setPosition(p[0],.03,p[1]); I.setMatrixAt(i,M); }); k.scene.add(I);
    k.anim.push(t=>m.color.setHex((Math.floor(t*2.2)+n)%2?0x7af4ff:0x2a6a86)); });
}

function baue(k){
  const H=WELTRAUM.huelle(k,{ wand:[102,114,140], boden:[108,116,132], pfosten:[-16.9,-7,7,16.9], streben:[-12.2,-3.9,2.2,9.6], leuchte:0x8ae8ff, oeffnung:{x:0,b:5.7,h:4.55} });
  const sc=k.scene;
  const tuer=schleuse(k,H);
  /* Fenster mit Erde an der Rückwand */
  rundfenster(H.hinten,k,-14.2,2.9,-13.48,1.35,'erde'); rundfenster(H.hinten,k,14.2,2.9,-13.48,1.35,'erde');
  seitenwand(k,H,-1); seitenwand(k,H,1);
  boden(k);
  faehre(k,-4.2,-1.8);
  greifarm(k,-5,-8.4);
  /* Frachtstücke */
  container(k,-16.3,-1.8,Math.PI/2,0x3a6ab8,0x2a4a86,false);
  container(k,16.3,-3.6,Math.PI/2,0xc87828,0x8a5018,false);
  container(k,-15.6,11.2,.12,0x2a8a80,0x1c625c,true);
  container(k,15.6,11.2,-.12,0x8a58b8,0x623a88,false);
  container(k,16.2,6,Math.PI/2,0x2a8a80,0x1c625c,false);
  container(k,16.4,-11.9,0,0x3a6ab8,0x2a4a86,false);
  tanks(k,-4.6,11.7,0x58b868); tanks(k,3.6,11.7,0xe0b030); tanks(k,-15.6,-11.8,0xe0604a);
  /* Ladeplatz für die Roboter */
  const l=gruppe(sc,4.9,0,-9.6), lq=gruppe(l,0,0,0);
  box(lq,1.7,.12,1.2,DUNKEL,0,.06,.2); box(lq,1.5,1,.35,METALL,0,.62,-.45); box(lq,1.58,.14,.45,ORANGE,0,1.17,-.45); [-.45,.45].forEach(x=>box(lq,.14,.1,.5,GELB,x,.18,.05));
  /* schlichtes Blitzzeichen */
  box(lq,.6,.72,.04,DUNKEL,0,.68,-.265); [[[.13,.97],[-.11,.66]],[[-.11,.66],[.11,.7]],[[.11,.7],[-.13,.39]]].forEach(([a,b])=>strich(lq,[a[0],a[1],-.22],[b[0],b[1],-.22],.045,GELB));
  verschmelze(lq);
  k.kasten(4.9,-9.5,1.8,1.4);
  /* Absperrpfosten vorn */
  [[-12.2,8.4],[12.4,8.2],[-2,5.2]].forEach(([x,z])=>{ const p=gruppe(sc,x,0,z); walze(p,.34,.1,DUNKEL,0,.05,0); walze(p,.12,.95,GELB,0,.55,0); walze(p,.13,.18,SCHWARZ,0,.55,0); ball(p,.16,basis(0xffb040),0,1.1,0); verschmelze(p); k.kreis(x,z,.36); });
  /* Wandschmuck wirft keine Schatten (spart Zeichenaufrufe) */
  [H.hinten,H.links,H.rechts].forEach(w=>w.traverse(m=>{ if(m.isMesh) m.castShadow=false; }));
  schwebend(k);
  /* Leben: Lagerroboter, Bordroboter und Drohnen */
  lagerroboter(k,[[1.7,-6.8],[10.4,-6.8],[8.9,-1],[1.7,-.4]],1.3,0);
  WELTRAUM.roboter(k,[[-5,2.8],[4.6,3.2],[5,9.2],[-4.6,9]],1.1,6);
  WELTRAUM.roboter(k,[[-12.4,-2.2],[-8,-.6],[-8.2,3.2],[-12,5.4]],.8,2,0x9ae0d0);
  WELTRAUM.drohne(k,5,-4,3.4,4,.5,0);
  WELTRAUM.drohne(k,-10,3,2.4,3.7,-.4,2);
  /* Licht */
  [[-9,4.4,-7,0x8ac8ff,.45],[10,4.2,5,0xffd8a0,.45],[-6,4.4,7,0xc8e0ff,.35]].forEach(p=>{ const li=new THREE.PointLight(p[3],p[4],15,1.5); li.position.set(p[0],p[1],p[2]); sc.add(li); });
  return { tuer, start:[0,7.6] };
}

const gegenstaende=[
  { x:-10.2, z:-5, steh:[-10.2,-2.9], kasten:[1.9,2.5], treffer:[1.9,3,2.4], baue(g,k){ /* 1 Wandleiter: fahrbare Stufenleiter mit Podest und Geländer */
      const q=gruppe(g,0,0,0);
      [-.72,.72].forEach(x=>{ strich(q,[x,.28,1.02],[x,1.9,-.35],.085,METALL); box(q,.14,.14,1.95,METALL2,x,.28,0);
        strich(q,[x,.28,-.92],[x,1.9,-.9],.085,METALL); strich(q,[x,.3,-.9],[x,1.5,-.05],.05,METALL2);
        [-.9,.95].forEach(z=>{ quer(q,.17,.14,SCHWARZ,x,.17,z); quer(q,.07,.17,ORANGE,x,.17,z); });
        /* Handlauf */
        strich(q,[x,1.15,.96],[x,2.78,-.4],.055,ROT); strich(q,[x,.4,.95],[x,1.15,.96],.055,ROT); strich(q,[x,2.78,-.4],[x,2.78,-.92],.055,ROT); strich(q,[x,1.9,-.9],[x,2.78,-.92],.055,ROT); strich(q,[x,1.9,-.38],[x,2.78,-.4],.045,ROT); });
      for(let i=0;i<5;i++){ const f=i/5, y=.45+f*1.45, z=.9-f*1.22; box(q,1.4,.11,.34,GELB,0,y,z); box(q,1.4,.035,.06,SCHWARZ,0,y+.065,z+.15); }
      box(q,1.55,.13,.72,GELB,0,1.92,-.62); quer(q,.055,1.44,ROT,0,2.78,-.92); quer(q,.04,1.44,METALL2,0,.55,-.91);
      /* kleines Fundstück oben auf dem Podest */
      box(q,.46,.24,.34,0x3f8ce0,.18,2.11,-.62); box(q,.48,.06,.36,WEISS,.18,2.18,-.62);
      verschmelze(q); schein(q,'rgba(140,230,255,.6)',.18,2.3,-.5,.9); k.verdecker(q,-10.2,-5,.8); } },
  { x:5.6, z:-3.8, steh:[5.6,-2.1], kasten:[2.5,1.8], treffer:[2.5,2,1.8], baue(g){ /* 2 Gravitationsstiefel: Paar auf einer leuchtenden Ladeplatte */
      box(g,2.35,.18,1.65,DUNKEL,0,.09,0); [-.78,.78].forEach(z=>box(g,2.2,.05,.07,basis(CYAN),0,.2,z)); [-1.12,1.12].forEach(x=>box(g,.07,.05,1.5,basis(CYAN),x,.2,0));
      [[-.62,-.12,.18],[.48,.1,1.15]].forEach(([x,z,w])=>{ const s=gruppe(g,x,.18,z); s.rotation.y=w; s.scale.set(1.08,1.08,1.08);
        box(s,.58,.08,.96,basis(CYAN),0,.07,.14); box(s,.62,.16,1,METALL2,0,.19,.14); quer(s,.08,.64,METALL2,0,.19,.64);
        ball(s,.29,WEISS,0,.39,.4,1,.82,1.35);
        box(s,.54,.34,.5,WEISS,0,.43,.06);
        rohr(s,.31,.27,.78,WEISS,0,.88,-.08,18);
        [.68,1].forEach(y=>{ rohr(s,.325,.31,.12,ORANGE,0,y,-.08,18); box(s,.18,.15,.07,GOLD,0,y,.25); });
        rohr(s,.37,.34,.2,METALL,0,1.34,-.08,18); walze(s,.31,.03,SCHWARZ,0,1.44,-.08); reif(s,.35,.035,BLAU,0,1.44,-.08);
        [-1,1].forEach(v=>knopf(s,.09,.05,basis(CYAN),v*.3,.4,.1).rotation.set(0,0,Math.PI/2)); });
      schein(g,'rgba(110,240,255,.45)',0,.25,.7,1.5); } },
  { x:13.6, z:-8, dreh:-.4, steh:[12.4,-6.4], r:1.05, treffer:[2,2.5,1.4], baue(g){ /* 3 Fallschirm-Paket: orangefarbener Rucksack am Haltegestell */
      const O=0xf0782a, D=0xc8561c;
      box(g,1.9,.14,1.2,DUNKEL,0,.07,0); [-.82,.82].forEach(x=>{ strich(g,[x,.1,-.38],[x,2.4,-.38],.08,METALL); ball(g,.12,GELB,x,2.45,-.38); }); quer(g,.07,1.7,METALL,0,2.3,-.38);
      box(g,1.3,1.45,.55,O,0,1.18,.02); quer(g,.28,1.3,O,0,1.9,.02); quer(g,.28,1.3,D,0,.48,.02); [-1,1].forEach(s=>{ walze(g,.28,1.42,O,s*.54,1.18,.02); ball(g,.28,O,s*.54,1.89,.02); ball(g,.28,D,s*.54,.48,.02); });
      box(g,1.06,1.1,.12,D,0,1.2,.31);
      /* Schirm-Zeichen: weiße Kuppel mit Leinen */
      const kup=new THREE.Mesh(new THREE.CircleGeometry(.42,24,0,Math.PI),mat(WEISS)); kup.position.set(0,1.42,.385); g.add(kup);
      [-.28,0,.28].forEach(x=>ball(g,.14,D,x,1.42,.375,1,.55,.12));
      [-.4,-.14,.14,.4].forEach(x=>strich(g,[x,1.43,.39],[0,.92,.39],.018,WEISS)); ball(g,.085,WEISS,0,.88,.39,1,1.2,.4);
      /* Gurte mit Schnallen */
      [-.64,.64].forEach(x=>{ box(g,.17,1.75,.09,SCHWARZ,x,1.2,.37); box(g,.27,.2,.07,METALL,x,.9,.44); box(g,.1,.07,.03,SCHWARZ,x,.9,.485); strich(g,[x,2.02,.33],[x*.75,2.32,-.34],.06,SCHWARZ); });
      box(g,1.45,.14,.08,SCHWARZ,0,.62,.4); box(g,.3,.24,.09,GELB,0,.62,.45);
      ring(g,.16,.05,ROT,.64,1.6,.45); strich(g,[.64,1.74,.45],[.64,1.94,.39],.03,SCHWARZ); } },
  { x:14.8, z:2.2, dreh:-.55, steh:[13.5,3.6], r:.75, treffer:[1.4,3.6,1.1], baue(g,k){ /* 4 Startampel: drei Lichter, die nacheinander leuchten */
      const q=gruppe(g,0,0,0);
      walze(q,.68,.18,DUNKEL,0,.09,0); walze(q,.4,.18,GELB,0,.26,0); walze(q,.14,1.35,METALL2,0,.95,0); [.7,1.1].forEach(y=>walze(q,.155,.18,GELB,0,y,0));
      box(q,.95,2,.5,SCHWARZ,0,2.55,0); quer(q,.25,.95,SCHWARZ,0,3.55,0); box(q,1.02,.1,.56,GELB,0,1.58,0);
      const L=[[3.2,0xff4030,0x501410],[2.57,0xffc820,0x503c0c],[1.94,0x40f060,0x10481c]].map(([y,an,aus])=>{ const m=basis(an);
        knopf(q,.29,.08,METALL2,0,y,.27); const linse=knopf(q,.23,.1,m,0,y,.3);
        const s=ring(q,.29,.055,SCHWARZ,0,y+.02,.38,Math.PI); s.scale.z=3; return {linse,an,aus}; });
      k.anim.push(t=>{ const n=Math.floor(t*.9)%3; L.forEach((l,i)=>l.linse.material.color.setHex(i===n?l.an:l.aus)); }); /* Material vom Teil lesen: der Verdecker tauscht es aus */
      verschmelze(q); k.verdecker(q,14.8,2.2,.6); } },
  { wand:'hinten', x:9.5, z:-13.5, steh:[9.5,-11.4], kasten:[3.6,1.9], treffer:[3.5,2.9,1.3], trefferY:.4, baue(g,k){ /* 5 Schleusenkonsole: Wandpult mit großen Knöpfen, Hebeln und Raketen-Anzeige */
      box(g,3.3,2.6,.24,HELL,0,2,.14); [-1.55,1.55].forEach(x=>[.85,3.15].forEach(y=>knopf(g,.08,.08,METALL2,x,y,.29)));
      /* Anzeige mit Rakete */
      box(g,1.9,1.2,.1,SCHWARZ,0,2.56,.3); box(g,1.7,1,.04,0x0c3448,0,2.56,.36);
      const gr=basis(0x6aff80); walze(g,.15,.4,gr,0,2.56,.4).scale.z=.04; kegel(g,.15,.26,gr,0,2.89,.4).scale.z=.04;
      [-1,1].forEach(s=>{ const f=kegel(g,.13,.28,gr,s*.18,2.34,.4); f.scale.z=.03; }); knopf(g,.065,.03,0x0c3448,0,2.64,.42); kegel(g,.09,.2,basis(0xffa030),0,2.2,.4).rotation.z=Math.PI;
      [-.62,.62].forEach(x=>[2.25,2.5,2.75].forEach((y,i)=>box(g,.24+(i%2)*.1,.07,.03,basis(CYAN),x,y,.39)));
      /* Lampen rechts und links */
      const M=[-1.28,1.28].map((x,i)=>{ const m=basis(0xffc030); knopf(g,.2,.1,METALL2,x,2.9,.3); ball(g,.14,m,x,2.9,.36,1,1,.7); return m; });
      k.anim.push(t=>M.forEach((m,i)=>m.color.setHex(Math.sin(t*3+i*Math.PI)>0?0xffd040:0x6a4a10)));
      /* schräges Pult */
      const p=gruppe(g,0,1.28,.62); p.rotation.x=.38; box(p,3.4,.2,1,0x56617a,0,0,0); box(p,3.44,.08,.08,GELB,0,.04,.52);
      walze(p,.34,.1,METALL,-.75,.13,0); walze(p,.26,.14,ROT,-.75,.2,0); ball(p,.26,ROT,-.75,.27,0,1,.5,1);
      [[.05,GRUEN],[.55,GELB]].forEach(([x,c])=>{ walze(p,.2,.08,METALL,x,.12,.1); ball(p,.16,c,x,.18,.1,1,.7,1); });
      [1.05,1.42].forEach((x,i)=>{ box(p,.1,.04,.65,SCHWARZ,x,.12,0); strich(p,[x,.1,0],[x,.55,i?.2:-.2],.045,METALL); ball(p,.11,i?BLAU:ORANGE,x,.57,i?.21:-.21); });
      for(let i=0;i<5;i++) box(p,.16,.07,.16,i%2?WEISS:TUERKIS,-.1+i*.19,.13,-.3);
      [-1.4,1.4].forEach(x=>strich(g,[x,.5,.2],[x,1.22,.85],.09,METALL2)); box(g,2.6,.5,.2,DUNKEL,0,.5,.2); } },
  { wand:'hinten', x:-9.7, z:-13.5, steh:[-9.7,-11.4], kasten:[3.8,1.5], treffer:[3.6,2.8,.9], trefferY:.9, baue(g,k){ /* 6 Infobildschirm: großer Bildschirm mit Erdbild und Textzeilen */
      box(g,3.45,2.35,.22,SCHWARZ,0,2.45,.28); [-1.78,1.78].forEach(x=>{ box(g,.14,2.45,.3,METALL,x,2.45,.27); }); [1.21,3.69].forEach(y=>box(g,3.7,.14,.3,METALL,0,y,.27));
      [-1,1].forEach(s=>strich(g,[s*1.1,.9,.06],[s*.6,1.5,.24],.09,METALL2)); box(g,1.6,.28,.2,DUNKEL,0,.93,.18); for(let i=0;i<7;i++) box(g,.08,.16,.04,METALL,-.54+i*.18,.93,.3);
      const c=document.createElement('canvas'); c.width=384; c.height=256; const p=c.getContext('2d'), t=new THREE.CanvasTexture(c); t.minFilter=THREE.LinearFilter;
      const mal=zt=>{ p.fillStyle='#0e4a6a'; p.fillRect(0,0,384,256); p.fillStyle='#1a7a9a'; p.fillRect(0,0,384,40); p.fillStyle='#ffd23a'; [24,52,80].forEach(x=>{ p.beginPath(); p.arc(x,20,9,0,7); p.fill(); });
        p.fillStyle='#3f9ae8'; p.beginPath(); p.arc(100,142,70,0,7); p.fill(); p.fillStyle='#5ad070'; [[76,112,30,20],[124,162,24,32],[78,176,16,10]].forEach(q=>{ p.beginPath(); p.ellipse(q[0],q[1],q[2],q[3],.6,0,7); p.fill(); });
        p.strokeStyle='#ffe080'; p.lineWidth=4; p.beginPath(); p.ellipse(100,142,86,30,-.4,0,7); p.stroke(); const a=zt*1.2; p.fillStyle='#ffffff'; const px=Math.cos(a)*86, py=Math.sin(a)*30; p.beginPath(); p.arc(100+px*.92+py*.39,142-px*.39+py*.92,9,0,7); p.fill();
        p.fillStyle='#d8f8ff'; const n=Math.floor(zt*2)%8; for(let i=0;i<7;i++){ if(i<=n) p.fillRect(210,68+i*25,[150,125,140,95,150,115,80][i],11); } t.needsUpdate=true; };
      mal(0); let letzt=-1; k.anim.push(zt=>{ const n=Math.floor(zt*5); if(n!==letzt){ letzt=n; mal(zt); } });
      const m=new THREE.Mesh(new THREE.PlaneGeometry(3.2,2.14),new THREE.MeshBasicMaterial({map:t})); m.position.set(0,2.45,.4); g.add(m); } },
  { x:-14.6, z:3.4, dreh:.5, steh:[-13.1,4.6], r:1, treffer:[1.9,3.1,1.3], baue(g,k){ /* 7 Raumanzug mit Helm auf einem Ständer */
      const q=gruppe(g,0,0,0), W=0xf6f8fc, S=0xc4ccd8;
      walze(q,.85,.14,DUNKEL,0,.07,0); reif(q,.83,.05,ORANGE,0,.14,0); strich(q,[0,.1,-.5],[0,2.1,-.5],.09,METALL2); strich(q,[0,1.7,-.5],[0,1.7,-.2],.08,METALL2);
      [-.27,.27].forEach(x=>{ box(q,.36,.22,.55,GRAU,x,.26,.08); ball(q,.19,GRAU,x,.27,.34,1,.7,1); rohr(q,.2,.18,.9,W,x,.78,0,16); reif(q,.2,.05,S,x,.78,0); reif(q,.19,.055,ORANGE,x,.42,0); });
      box(q,.8,.24,.45,S,0,1.22,0); box(q,.18,.14,.06,GOLD,0,1.22,.25);
      rohr(q,.52,.42,.85,W,0,1.72,0,20); ball(q,.52,W,0,2.1,0,1.08,.42,.9);
      box(q,.86,1,.36,S,0,1.75,-.45);
      /* Brustkasten mit Knöpfen */
      box(q,.54,.38,.14,METALL,0,1.76,.46); box(q,.2,.16,.04,basis(CYAN),-.13,1.82,.55); [[.1,ROT],[.2,GELB]].forEach(([x,c])=>ball(q,.05,c,x,1.85,.54)); box(q,.34,.07,.04,ORANGE,0,1.65,.55);
      [-1,1].forEach(s=>{ ball(q,.23,W,s*.58,2.02,0); strich(q,[s*.6,2,0],[s*.78,1.5,.04],.16,W); ball(q,.16,S,s*.78,1.5,.04); strich(q,[s*.78,1.5,.04],[s*.82,1.1,.16],.145,W); walze(q,.17,.12,ORANGE,s*.82,1.1,.16); ball(q,.17,GRAU,s*.83,.94,.18,.9,1.15,.9); ball(q,.08,GRAU,s*.72,.98,.28); });
      /* Beintasche */
      box(q,.28,.34,.1,ORANGE,.29,.93,.2); box(q,.3,.1,.12,0xc8561c,.29,1.08,.21); ball(q,.035,GOLD,.29,1.04,.28);
      reif(q,.33,.08,METALL2,0,2.28,0);
      ball(q,.45,W,0,2.66,0); ball(q,.35,0x1c3c80,0,2.67,.17,1.05,.88,.9); const gl=ball(q,.07,basis(0xd8f0ff),-.14,2.81,.43,1.6,.6,.4); gl.rotation.z=.4;
      [-1,1].forEach(s=>knopf(q,.13,.12,ORANGE,s*.44,2.66,0).rotation.set(0,0,Math.PI/2));
      verschmelze(q); k.verdecker(q,-14.6,3.4,.8); } },
  { x:9, z:6.8, dreh:-.2, steh:[8.6,8.7], kasten:[2.5,2], treffer:[2.4,1.9,1.8], baue(g){ /* 8 Vorratskiste: offen, gefüllt mit Obst, Brot, Flaschen und Tuben */
      const F=0x4a9a58, D=0x2f6a3c;
      box(g,2.1,.14,1.4,D,0,.14,0); [-.66,.66].forEach(z=>box(g,2.1,.78,.12,F,0,.58,z)); [-1,1].forEach(s=>box(g,.12,.78,1.4,F,s*.99,.58,0));
      [-1.02,1.02].forEach(x=>[-.69,.69].forEach(z=>box(g,.18,.96,.18,METALL,x,.5,z))); [-.74,.74].forEach(z=>box(g,2.1,.1,.06,METALL,0,.96,z*.97));
      [-1,1].forEach(s=>box(g,.1,.12,.55,SCHWARZ,s*1.1,.72,0));
      box(g,1.86,.5,1.2,D,0,.48,0);
      /* offener Deckel, lehnt hinten */
      const d=gruppe(g,0,.96,-.76); d.rotation.x=-.28; box(d,2.12,.88,.1,F,0,.46,0); box(d,2.16,.1,.14,METALL,0,.9,0); [-.7,.7].forEach(x=>box(d,.14,.9,.13,METALL,x,.46,0));
      /* Apfel-Zeichen vorn */
      box(g,.72,.58,.05,WEISS,0,.55,.74); ball(g,.18,ROT,-.07,.52,.78,1,1.05,.25); ball(g,.18,ROT,.09,.52,.78,1,1.05,.25); strich(g,[.01,.68,.8],[.05,.8,.8],.022,0x6a3a1a); ball(g,.08,GRUEN,.15,.77,.8,1.5,.7,.25);
      /* Inhalt */
      const apfel=(x,y,z,c)=>{ ball(g,.2,c,x,y,z,1,.95,1); strich(g,[x,y+.17,z],[x+.04,y+.29,z],.018,0x6a3a1a); ball(g,.06,GRUEN,x+.1,y+.27,z,1.5,.4,.8); };
      apfel(-.66,.95,.34,ROT); apfel(-.3,.92,.4,0x8ad040); apfel(-.5,1.08,.08,ROT);
      [0,.14,.28].forEach((v,i)=>{ const b=ring(g,.28,.07,0xffd830,.24+v*.5,1.2-i*.02,.4-v*.9,Math.PI*.75); b.rotation.z=3.5; });
      ball(g,.24,0xd89848,.62,.98,-.18,1.4,.85,.9); [-.16,0,.16].forEach(a=>box(g,.05,.04,.28,0xf0c880,.62+a,1.17,-.18));
      [[-.72,-.34,0x3f8ce0],[-.36,-.38,0x38d0d0],[0,-.34,0x3f8ce0]].forEach(([x,z,c])=>{ walze(g,.14,.6,c,x,1.02,z); walze(g,.145,.16,WEISS,x,1.06,z); kegel(g,.14,.18,c,x,1.4,z); walze(g,.065,.11,ROT,x,1.5,z); });
      [[.55,.3,ORANGE],[.76,.22,0xe86ab0]].forEach(([x,z,c])=>{ const t=gruppe(g,x,1.05,z); t.rotation.z=-.4; rohr(t,.05,.13,.5,c,0,.05,0,12); walze(t,.06,.1,WEISS,0,.34,0); }); } },
  { x:-8.8, z:7, dreh:.16, steh:[-8.4,8.8], kasten:[2.9,1.6], treffer:[2.8,2.3,1.3], baue(g){ /* 9 Sportrad: Trainingsfahrrad mit Schwungrad, Sattel, Pedalen und Lenker */
      const R=0xe0443a;
      [-1,1].forEach(s=>{ const z=walze(g,.1,1.1,DUNKEL,s*1.1,.12,0); z.rotation.x=Math.PI/2; [-.55,.55].forEach(v=>ball(g,.13,SCHWARZ,s*1.1,.12,v)); }); quer(g,.09,2.2,DUNKEL,0,.14,0);
      /* Schwungrad vorn (rechts) */
      knopf(g,.56,.2,SCHWARZ,.68,.76,0); knopf(g,.44,.24,METALL,.68,.76,0); [-.13,.13].forEach(z=>{ for(let i=0;i<3;i++){ const b=box(g,.08,.76,.03,R,.68,.76,z); b.rotation.z=i*1.047+.3; } knopf(g,.14,.05,GELB,.68,.76,z*1.15); });
      [-.19,.19].forEach(z=>strich(g,[1.1,.14,0],[.68,.76,z],.07,R));
      /* Rahmen */
      strich(g,[.68,.76,.2],[-.12,.58,.16],.09,R); strich(g,[-.12,.58,0],[-1.1,.14,0],.09,R); strich(g,[-.12,.58,0],[-.55,1.45,0],.09,R); strich(g,[-.5,1.34,0],[.5,1.45,0],.08,R); strich(g,[.68,.76,-.18],[.45,1.5,0],.09,R); strich(g,[.45,1.5,0],[.6,1.95,0],.075,METALL);
      /* Sattel */
      strich(g,[-.55,1.45,0],[-.62,1.62,0],.06,METALL); ball(g,.25,SCHWARZ,-.72,1.7,0,1.3,.42,.9); ball(g,.12,SCHWARZ,-.38,1.69,0,1.6,.55,.65);
      /* Lenker und Anzeige */
      const l=walze(g,.06,1,METALL,.6,1.95,0); l.rotation.x=Math.PI/2; [-1,1].forEach(s=>{ strich(g,[.6,1.95,s*.48],[.28,2.02,s*.52],.06,METALL); strich(g,[.44,1.985,s*.5],[.24,2.03,s*.525],.085,SCHWARZ); });
      const a=gruppe(g,.74,2.14,0); a.rotation.z=.35; box(a,.14,.34,.5,DUNKEL,0,0,0); box(a,.03,.24,.38,basis(0x7aff9a),-.08,0,0);
      /* Pedale */
      knopf(g,.2,.34,DUNKEL,-.1,.58,0); knopf(g,.07,.72,METALL,-.1,.58,0);
      [[1,.28,-.28],[-1,-.28,.28]].forEach(([s,dx,dy])=>{ const z=s*.34; strich(g,[-.1,.58,z],[-.1+dx,.58+dy,z],.055,METALL); box(g,.38,.09,.24,GELB,-.1+dx,.58+dy,z+s*.14); box(g,.4,.04,.06,SCHWARZ,-.1+dx,.63+dy,z+s*.14); });
      } },
  { x:-15, z:-7.2, dreh:.55, steh:[-13.5,-5.7], r:1.15, treffer:[2.2,3.1,1.2], baue(g,k){ /* 10 Schlafsack: aufrecht an einem Gestell festgeschnallt */
      const q=gruppe(g,0,0,0), F=0x2a9a8a, N=0x17655c;
      [-1.05,1.05].forEach(x=>{ strich(q,[x,.05,-.3],[x,2.95,-.3],.08,METALL); box(q,.24,.12,1.05,DUNKEL,x,.06,-.05); ball(q,.12,ORANGE,x,3,-.3); });
      [.55,2.8].forEach(y=>quer(q,.06,2.1,METALL2,0,y,-.34));
      /* Hülle in Mumienform, flach gedrückt */
      const P=[[0,.22],[.26,.26],[.38,.42],[.43,.75],[.52,1.2],[.64,1.7],[.69,2.05],[.62,2.35],[.54,2.55],[.45,2.74],[.28,2.88],[0,2.93]];
      dreh(q,P,F,0,0,0).scale.z=.5;
      [[.4,.55],[.47,.9],[.55,1.3],[.635,1.65]].forEach(([r,y])=>{ const t=reif(q,r,.04,N,0,y,0); t.scale.y=.52; });
      /* leere Kapuze mit flachem Kopfkissen */
      ball(q,.36,N,0,2.38,.22,1,1.08,.4); box(q,.48,.24,.07,WEISS,0,2.5,.37);
      const rand=ring(q,.38,.11,ORANGE,0,2.38,.31); rand.scale.set(1,1.1,.9);
      /* Reißverschluss */
      [[.32,.75,.17,.235],[.75,1.25,.235,.28],[1.25,1.9,.28,.36]].forEach(([a,b,z1,z2])=>strich(q,[0,a,z1],[0,b,z2],.028,GELB));
      for(let i=0;i<9;i++){ const y=.45+i*.17; box(q,.13,.035,.03,GELB,0,y,.205+Math.max(0,y-.4)*.1+.025); } box(q,.1,.2,.05,GOLD,.05,1.83,.4);
      /* Haltegurte mit Schnallen, am Gestell befestigt */
      [[.72,.46,.27],[1.52,.6,.34]].forEach(([y,r,z])=>{ quer(q,.075,r*1.7,SCHWARZ,0,y,z); [-1,1].forEach(s=>{ strich(q,[s*r*.82,y,z],[s*1.05,y,-.28],.07,SCHWARZ); box(q,.18,.22,.18,GELB,s*1.05,y,-.3); }); box(q,.27,.22,.1,METALL,-.28,y,z+.07); box(q,.11,.08,.04,SCHWARZ,-.28,y,z+.13); });
      strich(q,[0,2.9,0],[0,2.8,-.32],.045,SCHWARZ);
      verschmelze(q); k.verdecker(q,-15,-7.2,.7); } }
];

const verstecke=[[-12.6,-12],[-16.6,-9.7],[-13,-8.6],[-7.2,-6.8],[-4.6,-11.2],[6.6,-12],[12.6,-11.6],[16.8,-9],[11.6,-4.4],[16.8,-.8],
  [-4.4,-4.4],[2.6,-2.6],[-16.8,.8],[-16.6,6.6],[-11.6,11.8],[-9,5.2],[-.4,12.2],[7.4,11.8],[12.2,6],[16.8,8.2]];

return { titel:'Die Andockbucht', breite:36, tiefe:27, oben:WELTRAUM.OBEN, baue, gegenstaende, verstecke };
})();

/* Raum 5: Die Mondoberfläche unter offenem Himmel. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die Luke der Landekapsel hinten rechts; sie schwingt auf und warmes Licht fällt heraus. */
RAEUME3D.raumschiff[4] = (function(){
const { METALL, METALL2, DUNKEL, WEISS, BLAU, TUERKIS, ORANGE, ROT, GELB, GRUEN, GOLD, bildschirm, planet, roboter, zahlenschloss } = WELTRAUM;
const B=36, T=27;
const KX=9, KZ=-11.4;             /* Mitte der Landekapsel */
const FELS=0x72727e, FELS2=0x5c5c6a, FELS3=0x8a8a96, STAUB=0xa4a4ae, REIFEN=0x2c2e36, FOLIE=0xe0a832;
const doppel=c=>mat(c,{side:THREE.DoubleSide});
const Q=Math.PI/2;

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

/* ---------- Mondboden: ein großes Bild mit Kratern und Spuren (Welt-Koordinaten x -48..48, z -20..42) ---------- */
function bodenBild(){
  return bild(2048,1024,g=>{
    const px=x=>(x+48)/96*2048, pz=z=>(z+20)/62*1024, sx=2048/96, sz=1024/62;
    g.fillStyle='#9a9aa4'; g.fillRect(0,0,2048,1024);
    for(let i=0;i<310;i++){ const x=zufall()*2048, y=zufall()*1024, r=20+zufall()*70, v=g.createRadialGradient(x,y,0,x,y,r), c=i%2?'200,200,212':'96,96,110';
      v.addColorStop(0,'rgba('+c+',.22)'); v.addColorStop(1,'rgba('+c+',0)'); g.fillStyle=v; g.fillRect(x-r,y-r,r*2,r*2); }
    for(let i=0;i<11000;i++){ g.fillStyle=['rgba(60,60,72,.28)','rgba(225,225,236,.3)','rgba(110,100,110,.22)'][i%3]; g.fillRect(zufall()*2045,zufall()*1021,2+(i%2),2); }
    /* flache Krater: innen weicher Schatten hinten, heller Rand vorn, unregelmäßig */
    const krater=(x,z,r)=>{ const X=px(x), Y=pz(z), a=r*sx, b=r*sz*.82, N=26, P=[];
      for(let i=0;i<=N;i++){ const w=i/N*6.283, f=1+Math.sin(w*3+x)*.07+Math.sin(w*5+z)*.05; P.push([X+Math.cos(w)*a*f,Y+Math.sin(w)*b*f,w]); }
      g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));
      const v=g.createLinearGradient(0,Y-b,0,Y+b); v.addColorStop(0,'rgba(48,48,62,.5)'); v.addColorStop(.55,'rgba(92,92,108,.22)'); v.addColorStop(1,'rgba(226,226,238,.32)'); g.fillStyle=v; g.fill();
      g.lineCap='round';
      [[3.5,6.1,'rgba(232,232,244,.5)'],[.3,2.85,'rgba(232,232,244,.75)']].forEach(([von,bis,c],k)=>{ g.strokeStyle=c; g.lineWidth=2+r*(k?4:1.6); g.beginPath(); let an=false; P.forEach(p=>{ if(p[2]>=von && p[2]<=bis){ an?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]); an=true; } }); g.stroke(); });
      g.strokeStyle='rgba(50,50,64,.45)'; g.lineWidth=2+r*2.4; g.beginPath(); g.ellipse(X,Y+b*.09,a*.86,b*.82,0,3.55,5.9); g.stroke(); };
    [[-12,6.2,1.7],[-4.5,-1.8,1.2],[2.5,8.6,1],[10.5,.8,1.6],[-6,10.8,.8],[15.5,10.5,1.1],[-13,-7,1.3],[1,-5,.9],[4.5,-9.8,.7],[-17,2.5,1],[8,11.6,.6],[-1,5.6,.55],[13,-7.5,.8],[-10,-10.5,.8],[0,15.5,2.4],[-14,17,1.8],[13,18,2],[-23,-6,2],[23,5,2.2],[-4,-15.2,1.2],[-21,11,1.6],[21,-12,1.5],[6,-1.4,.45],[-8,1,.35],[12,4.8,.4],[-2,2.8,.3],[29,3,2],[38,14,2.6],[27,22,1.4],[34,32,2.2],[43,27,1.5],[16,28,1.8],[-29,2,1.7],[-37,12,2.5],[-27,24,1.5],[-35,31,2.2],[-43,24,1.6],[-15,29,2],[4,34,2.4]].forEach(a=>krater(a[0],a[1],a[2]));
    /* Reifenspuren des Mondautos */
    const spur=(P)=>{ [-.55,.55].forEach(d=>{ for(let k=0;k<P.length-1;k++){ const a=P[k], b=P[k+1], l=Math.hypot(b[0]-a[0],b[1]-a[1]), n=Math.ceil(l/.15), ux=(b[0]-a[0])/l, uz=(b[1]-a[1])/l;
          for(let i=0;i<n;i++){ const x=a[0]+(b[0]-a[0])*i/n-uz*d, z=a[1]+(b[1]-a[1])*i/n+ux*d; g.strokeStyle='rgba(58,58,72,.18)'; g.lineWidth=2.5; g.beginPath(); g.moveTo(px(x-uz*.09),pz(z+ux*.09)); g.lineTo(px(x+uz*.09),pz(z-ux*.09)); g.stroke(); } } }); };
    spur([[8,3.5],[11,3],[13.5,.4],[12,-2.6],[9.4,-3.8]]); spur([[-18,9.5],[-12.5,11.6],[-6,12.3],[0,11],[4,8],[5,4.5]]);
    /* Stiefelabdrücke zur Landekapsel */
    const W=[[-1,4.5],[2.2,.5],[4.5,-3.2],[7.4,-5.4],[8.9,-7]];
    for(let k=0;k<W.length-1;k++){ const a=W[k], b=W[k+1], l=Math.hypot(b[0]-a[0],b[1]-a[1]), n=Math.floor(l/.62), w=Math.atan2((b[1]-a[1])*sz,(b[0]-a[0])*sx);
      for(let i=0;i<n;i++){ const s=(i%2?1:-1)*.2, ux=(b[0]-a[0])/l, uz=(b[1]-a[1])/l, x=a[0]+(b[0]-a[0])*i/n-uz*s, z=a[1]+(b[1]-a[1])*i/n+ux*s;
        g.save(); g.translate(px(x),pz(z)); g.rotate(w); g.fillStyle='rgba(52,52,68,.2)'; g.beginPath(); g.ellipse(1.5,0,5,3.4,0,0,6.283); g.fill(); g.fillRect(-7,-2.8,3.6,5.6); g.restore(); } }
    /* gestrichelter Landeplatz */
    g.strokeStyle='rgba(240,160,50,.6)'; g.lineWidth=6;
    for(let i=0;i<26;i++){ const w=i/26*6.283; g.beginPath(); g.ellipse(px(KX),pz(KZ),4.9*sx,4.9*sz,0,w,w+.14); g.stroke(); }
  });
}
function boden(k){
  const sc=k.scene, t=bodenBild(); t.repeat.set(1/96,1/62); t.offset.set(.5,42/62);
  /* unregelmäßiger Rand: dahinter beginnt der Sternenhimmel */
  const P=[];
  for(let x=-23;x<=23;x+=1.15) P.push([x,-17.1+Math.sin(x*.9)*.25+Math.sin(x*2.3)*.14]);
  for(let z=-15.6;z<=-3.8;z+=1.9) P.push([23+Math.sin(z*.8)*.5+Math.sin(z*2.1)*.25,z]);
  /* vorn reicht der Boden weit nach außen, damit beim Drehen keine Lücken sichtbar werden */
  P.push([25.5,-2],[31,-2.7],[36,-1.4],[42,-2.3],[48,-1.6],[48,42],[-48,42],[-48,-1.8],[-42,-2.5],[-36,-1.3],[-31,-2.8],[-25.5,-2]);
  for(let z=-3.9;z>=-15.6;z-=1.9) P.push([-23+Math.sin(z*.7+1)*.5+Math.sin(z*1.9)*.25,z]);
  const s=new THREE.Shape(); P.forEach(([x,z],i)=>i?s.lineTo(x,-z):s.moveTo(x,-z));
  const m=new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshLambertMaterial({map:t})); m.rotation.x=-Math.PI/2; m.receiveShadow=true; sc.add(m);
  /* Felsbrocken entlang der hinteren Kante des erweiterten Bodens (außerhalb der begehbaren Fläche) */
  const rand=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ for(let i=0;i<13;i++){ const x=v*(25+i*1.9), gr=.8+((i*7)%5)*.22; teil(rand,felsGeo(31+i%4,1,.18),[0x8a8a94,0x76767f,0x9a9aa4][i%3],x,gr*.35,-2.2+Math.sin(i*1.7)*.5,gr*1.3,gr*.8,gr); } });
  verschmelze(rand);
}

/* ---------- Himmel: Sterne, Erde, Sternschnuppen ---------- */
function himmel(k){
  const sc=k.scene;
  [[0xffffff,1.6,520],[0xbcd8ff,2.8,150],[0xffe8b0,3.4,70]].forEach(([c,gr,n])=>{
    const P=[]; for(let i=0;i<n;i++){ const a=zufall()*6.283, y=-34+zufall()*68, r=52+zufall()*14, q=Math.sqrt(Math.max(0,r*r-y*y)); P.push(Math.cos(a)*q,y,Math.sin(a)*q); }
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
    sc.add(new THREE.Points(geo,new THREE.PointsMaterial({color:c,size:gr,sizeAttenuation:false}))); });
  /* zusätzliche Sterne genau im Blickfeld hinter der Mondkante */
  const P=[]; for(let i=0;i<260;i++) P.push(-34+zufall()*68,-16+zufall()*22,-45-zufall()*6);
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); sc.add(new THREE.Points(geo,new THREE.PointsMaterial({color:0xe8f0ff,size:2,sizeAttenuation:false})));
  /* die Erde, tief über der Mondkante hinten links */
  schein(sc,'rgba(90,170,255,.6)',-12,-3.4,-42.5,10.5);
  planet(sc,k,2.8,-12,-3.4,-40,'erde');
  /* Sternschnuppen */
  [[2,.6,-27,-9,-3.2,5.5,0],[23,2.2,-30,12,-2,8,2.7],[-14,12,-34,6,5,11,5.2]].forEach(([x1,y1,z,x2,y2,takt,start])=>{
    const g=gruppe(sc,x1,y1,z), s=gruppe(g,0,0,0); s.rotation.z=Math.atan2(y1-y2,x1-x2);
    const kopf=ball(s,.13,basis(0xffffff),0,0,0), a=box(s,1.3,.07,.03,basis(0xfff0b0),.7,0,0), b=box(s,1.2,.03,.02,basis(0x9ac8ff),1.9,0,0); [kopf,a,b].forEach(m=>{ m.castShadow=false; m.receiveShadow=false; });
    schein(g,'rgba(255,240,190,.9)',0,0,0,1.1); g.visible=false;
    k.anim.push(t=>{ const p=((t+start)%takt)/1.3; g.visible=p<1; if(p<1) g.position.set(x1+(x2-x1)*p,y1+(y2-y1)*p,z); }); });
}

/* ---------- Rand: Felsen und Hügel ringsum ---------- */
function rand(k,hinten){
  const links=k.wand('links'), rechts=k.wand('rechts');
  const G=[felsGeo(1),felsGeo(5),felsGeo(9),felsGeo(14,1,.4)], F=[FELS,FELS2,FELS3];
  const h=gruppe(hinten,0,0,0);
  const brocken=(par,x,z,sx,sy,sz,i)=>{ const m=form(par,G[i%4],F[i%3],x,sy*.42,z); m.scale.set(sx,sy,sz); m.rotation.y=(zufall()-.5)*.5; return m; };
  /* hinten: in der Mitte links bleibt es niedrig, damit man die Erde sieht */
  for(let i=0,x=-18.6;x<=19;i++,x+=1.65){
    const lueke=x>-12.2 && x<-.4, kapsel=x>4.8 && x<13.2;
    const sy=lueke?.3+zufall()*.22:kapsel?.55+zufall()*.35:.8+zufall()*.7, sx=lueke?.95:1+zufall()*.35, sz=lueke?.6:.75+zufall()*.25;
    brocken(h,x,(kapsel?-15.35:-13.4-sz*1.18)-zufall()*.12,sx,sy,sz,i);
    if(!lueke && !kapsel && i%2===0) brocken(h,x+.8,-15.9,1.2,1.3+zufall()*.7,.8,i+1);
  }
  [[-17.4,2.7,1.3],[-15.4,1.9,1],[16.6,2.8,1.4],[18.4,2,1.1],[3.8,2.1,.8],[14.2,1.8,.9]].forEach(([x,hh,br],i)=>{ const m=form(h,G[3],F[i%2],x,hh*.35,-15.9); m.scale.set(br,hh*.75,.75); });
  /* Kiesel am Fuß der Felsen */
  for(let i=0;i<46;i++){ const s=.1+zufall()*.14; const m=form(h,G[i%3],F[(i+1)%3],-18+i*.8+zufall()*.4,s*.5,-13.55-zufall()*.15); m.scale.set(s*1.2,s,s*.8); }
  verschmelze(h);
  [[links,-1],[rechts,1]].forEach(([w,v],n)=>{ const g=gruppe(w,0,0,0);
    for(let i=0,z=-13.2;z<=14;i++,z+=1.75){ const tief=Math.max(0,Math.min(1,(8-z)/18)), sy=.45+tief*1.1+zufall()*.4, sx=.8+zufall()*.35;
      brocken(g,v*(18.1+sx*1.2+zufall()*.2),z,sx,sy,1.05+zufall()*.3,i+n);
      if(i%3===1) brocken(g,v*(20.6+zufall()),z+.7,1.3,sy*1.35,1.2,i+2);
      const s=.18+zufall()*.2, m=form(g,G[i%3],F[(i+2)%3],v*(18.15+s*.6),s*.5,z+.9); m.scale.set(s,s*.8,s); }
    verschmelze(g); });
  /* flache Brocken vorn, außerhalb der Spielfläche */
  const vorn=gruppe(k.scene,0,0,0);
  for(let i=0,x=-19;x<=19;i++,x+=1.55){ const s=.25+zufall()*.35; const m=form(vorn,G[i%4],F[i%3],x+zufall()*.5,s*.25,14.4+zufall()*1.4); m.scale.set(s*1.4,s*.7,s); }
  verschmelze(vorn);
  /* ferne Hügel an den Seiten */
  const fern=gruppe(k.scene,0,0,0);
  [[-22,-15,3,1.7],[-21.5,-8,2,1.1],[22,-14.5,3.2,2],[21.8,-4,2,1.2],[-21.8,6,2.2,1],[21.8,13,2.4,1.1],[17,-16.2,2.2,1.5],[-18,-16.4,2,1.3]].forEach(([x,z,b,hh],i)=>{ const m=form(fern,G[i%4],F[i%2],x,0,z); m.scale.set(b*.8,hh,b*.5); m.castShadow=false; });
  [[27,1,1.6,.9],[33,9,2.4,1.1],[25,17,1,.5],[41,19,2.8,1.4],[30,27,1.4,.7],[-26,2,1.5,.8],[-34,10,2.6,1.2],[-25,16,1.1,.5],[-42,21,2.8,1.4],[-31,28,1.3,.7],[-12,24,.9,.45],[10,25,1.1,.5]].forEach(([x,z,b,hh],i)=>{ const m=form(fern,G[i%4],F[i%3],x,hh*.2,z); m.scale.set(b,hh*.8,b*.7); m.castShadow=false; });
  verschmelze(fern);
  k.kasten(0,-13.75,B+2,.8); k.kasten(-18.6,0,1,T); k.kasten(18.6,0,1,T);
}

/* ---------- Ausgang: die Landekapsel ---------- */
function kapsel(k){
  const sc=k.scene, g=gruppe(sc,KX,0,KZ), r=gruppe(g,0,0,0);
  const mantel=(ro,ru,h,y,farbe,luecke)=>form(r,new THREE.CylinderGeometry(ro,ru,h,28,1,true,luecke||0,Math.PI*2-2*(luecke||0)),doppel(farbe),0,y,0);
  /* unterer Teil mit Goldfolie, vorn offen für den Eingang */
  mantel(2,2.35,2.4,1.55,FOLIE,.5);
  [[2.34,.5],[2.17,1.55]].forEach(([rr,y])=>{ for(let i=0;i<14;i++){ const a=.75+i*(Math.PI*2-1.5)/13; const f=box(r,.5,.62,.05,i%2?0xf2c24a:0xc89024,Math.sin(a)*rr,y+.24,Math.cos(a)*rr); f.rotation.set(0,a,(i%3-1)*.12); } });
  walze(r,2.32,.12,METALL2,0,.32,0); kegel(r,.95,.5,DUNKEL,0,.2,-.45).rotation.x=Math.PI;
  /* oberer Teil weiß mit orangem Ring */
  mantel(1.15,2,1.25,3.37,WEISS); walze(r,2.05,.14,ORANGE,0,2.8,0);
  mantel(.4,1.15,.7,4.34,METALL); walze(r,1.2,.1,METALL2,0,4,0); ball(r,.42,ROT,0,4.66,0,1,.65,1);
  strich(r,[0,4.8,0],[0,5.35,0],.04,METALL2);
  /* runde Bullaugen */
  [-.95,.95,-1.85,1.85].forEach(a=>{ const f=gruppe(r,Math.sin(a)*1.66,3.3,Math.cos(a)*1.66); f.rotation.y=a; const q=gruppe(f,0,0,0); q.rotation.x=-.6; walze(q,.3,.1,basis(0x8ae8ff),0,0,.02).rotation.x=Q; ring(q,.32,.07,METALL2,0,0,.08); });
  /* vier Landebeine */
  [1.08,-1.08,2.3,-2.3].forEach(a=>{ const s=Math.sin(a), c=Math.cos(a), fuss=[s*3.5,.14,c*3.5];
    strich(r,[s*1.9,2.2,c*1.9],fuss,.13,METALL); strich(r,[Math.sin(a+.28)*2.2,.7,Math.cos(a+.28)*2.2],[s*3,.65,c*3],.07,METALL2); strich(r,[Math.sin(a-.28)*2.2,.7,Math.cos(a-.28)*2.2],[s*3,.65,c*3],.07,METALL2);
    rohr(r,.26,.5,.2,GOLD,fuss[0],.1,fuss[2],14); ball(r,.17,METALL2,fuss[0],.22,fuss[2]);
    k.kreis(KX+fuss[0],KZ+fuss[2],.5); k.kreis(KX+s*2.75,KZ+c*2.75,.35); });
  /* Eingangsrahmen */
  [-1,1].forEach(s=>{ box(r,.34,2.62,.9,METALL,s*1.13,1.31,1.99); box(r,.1,2.4,.05,ORANGE,s*1.13,1.32,2.46); box(r,.36,.14,1,METALL2,s*1.15,.07,2.02); });
  box(r,2.6,.2,.94,METALL,0,2.68,2.0); box(r,2.3,.9,.86,DUNKEL,0,3.18,1.98); [-1,1].forEach(s=>box(r,.14,1,.9,METALL,s*1.18,3.2,2.0)); box(r,2.5,.14,.9,METALL,0,3.7,2.0);
  /* Trittplatte vor der Luke */
  box(r,1.9,.02,2.9,METALL2,0,.018,1.75); [2.6,2.85,3.1].forEach(z=>box(r,1.7,.016,.07,GELB,0,.036,z));
  verschmelze(r);
  /* Innenraum mit warmem Licht */
  const t=bild(256,256,c=>{ c.fillStyle='#5a3410'; c.fillRect(0,0,256,256); const v=c.createRadialGradient(128,130,6,128,140,175); v.addColorStop(0,'#fffbe0'); v.addColorStop(.4,'#ffd870'); v.addColorStop(1,'#8a5216'); c.fillStyle=v; c.fillRect(0,0,256,256);
    c.strokeStyle='rgba(120,70,20,.55)'; c.lineWidth=6; [58,128,198].forEach(y=>{ c.beginPath(); c.moveTo(0,y); c.lineTo(52,y); c.moveTo(204,y); c.lineTo(256,y); c.stroke(); });
    ['#e0443a','#58d868','#3f8ce0'].forEach((f,i)=>{ c.fillStyle=f; c.beginPath(); c.arc(100+i*28,54,8,0,7); c.fill(); }); });
  const hg=new THREE.Mesh(new THREE.PlaneGeometry(1.94,2.58),basis(0x666666,{map:t})); hg.position.set(0,1.29,.25); g.add(hg);
  const wm=basis(0x5a3a18,{side:THREE.DoubleSide});
  [-1,1].forEach(s=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(2.1,2.58),wm); m.rotation.y=Q; m.position.set(s*.955,1.29,1.3); g.add(m); });
  const decke=new THREE.Mesh(new THREE.PlaneGeometry(1.92,2.1),wm); decke.rotation.x=Q; decke.position.set(0,2.57,1.3); g.add(decke);
  const licht=new THREE.PointLight(0xffc860,0,9,1.5); licht.position.set(KX,1.8,KZ+1.5); sc.add(licht);
  const glut=schein(g,'rgba(255,205,100,.85)',0,1.3,.5,3); glut.material.opacity=0; glut.visible=false;
  /* die Luke, links angeschlagen */
  const angel=gruppe(g,-.94,0,2.5), luke=gruppe(angel,0,0,0);
  box(luke,1.88,2.44,.12,WEISS,.94,1.32,0); box(luke,1.64,2.2,.04,0xd4dcea,.94,1.32,.07);
  [-1,1].forEach(s=>{ box(luke,1.64,.09,.05,ORANGE,.94,1.32+s*1.06,.1); box(luke,.09,2.2,.05,ORANGE,.94+s*.78,1.32,.104); });
  walze(luke,.34,.05,basis(0x8ae8ff),.94,1.85,.1).rotation.x=Q; ring(luke,.37,.08,METALL2,.94,1.85,.14);
  ring(luke,.28,.06,ROT,.94,.94,.18); [0,1,2].forEach(i=>{ const s=box(luke,.54,.06,.05,ROT,.94,.94,.17); s.rotation.z=i*1.047; }); ball(luke,.09,GELB,.94,.94,.22);
  [.6,2.05].forEach(y=>walze(luke,.09,.36,DUNKEL,.04,y,.05));
  verschmelze(luke);
  /* Zahlenschloss über der Luke, mit zwei Lampen */
  const schloss=zahlenschloss(g,0,3.05,2.56); schloss.scale.set(1.35,1.2,1.2); verschmelze(schloss);
  const lm=basis(0xff4a3a); [-1,1].forEach(s=>{ ball(g,.13,lm,s*.86,3.2,2.46); });
  const blink=basis(0xff6a4a), bl=ball(g,.12,blink,0,5.4,0);
  let tuer=null;
  tuer=ausgang(k,{ steh:[KX,KZ+4.8], durch:[KX,KZ+1.0], treffer:{x:KX,y:1.9,z:KZ+2.6,b:2.9,h:3.8,t:1}, name:'Landekapsel', einfach:'Kapsel', schildOben:[KX,4.45,KZ+2.8], glanz:[KX,2.2,KZ+3.0],
    bewege:(auf,z)=>{ angel.rotation.y=-auf*1.85; hg.material.color.setScalar(.4+auf*.6); licht.intensity=auf*(1.7+Math.sin((z||0)*5)*.12); glut.visible=auf>.02; glut.material.opacity=auf*.3;
      lm.color.setHex(tuer && (tuer.offen||tuer.bereit)?0x60f070:0xff4a3a); blink.color.setHex(Math.sin((z||0)*4)>0?0xff6a4a:0x5a2018); } });
  k.kreis(KX,KZ,2.4); k.kasten(KX,KZ+1.9,2.7,1.1);
  return tuer;
}

/* ---------- Ausstattung ---------- */
/* kleine Wegleuchte */
function wegleuchte(k,x,z,farbe){
  const g=gruppe(k.scene,x,0,z); rohr(g,.14,.2,.12,METALL2,0,.06,0,10); walze(g,.055,.8,METALL,0,.5,0); walze(g,.12,.06,DUNKEL,0,.92,0); ball(g,.14,basis(farbe),0,1.06,0); walze(g,.1,.05,DUNKEL,0,1.2,0); verschmelze(g);
  const s=schein(g,'rgba(255,220,140,.6)',0,1.06,0,1.1); k.anim.push(t=>{ const v=.9+Math.sin(t*2.5+x+z)*.2; s.scale.set(v,v,1); }); k.kreis(x,z,.22);
}
/* Bohrturm mit drehendem Bohrer */
function bohrturm(k,x,z){
  const g=gruppe(k.scene,x,0,z), r=gruppe(g,0,0,0), H=4.1;
  const ecken=[[-.95,-.8],[.95,-.8],[.95,.8],[-.95,.8]], oben=ecken.map(([a,b])=>[a*.28,b*.28]);
  ecken.forEach(([a,b],i)=>{ const o=oben[i]; strich(r,[a,0,b],[o[0],H,o[1]],.08,ORANGE); ball(r,.17,DUNKEL,a,.07,b,1,.5,1);
    const j=(i+1)%4, c=ecken[j], p=oben[j], auf=(e,f,s)=>[e[0]+(f[0]-e[0])*s,H*s,e[1]+(f[1]-e[1])*s];
    [.28,.58,.84].forEach(s=>strich(r,auf(ecken[i],o,s),auf(c,p,s),.04,METALL));
    strich(r,auf(ecken[i],o,0.04),auf(c,p,.28),.03,METALL2); strich(r,auf(ecken[i],o,.28),auf(c,p,.58),.03,METALL2); });
  box(r,.75,.18,.65,DUNKEL,0,H+.06,0); box(r,.55,.6,.5,GELB,0,2.85,0);
  kegel(r,.75,.3,FELS3,0,.15,0);
  verschmelze(r);
  const bohrer=gruppe(g,0,0,0); walze(bohrer,.09,2.4,METALL,0,1.35,0); for(let i=0;i<9;i++){ const a=i*1.1; const f=box(bohrer,.42,.07,.16,METALL2,Math.cos(a)*.13,.45+i*.2,-Math.sin(a)*.13); f.rotation.y=a; } verschmelze(bohrer);
  const l=ball(g,.12,basis(0x60f070),0,H+.27,0);
  k.anim.push(t=>{ bohrer.rotation.y=t*3; l.visible=Math.sin(t*3)>-.4; });
  k.kreis(x,z,1.35); k.verdecker(g,x,z,1.3);
}
function ausstattung(k){
  const sc=k.scene;
  [[6.3,-7.3,0xffd860],[11.9,-6.8,0xffd860],[5.2,-3.9,0xffd860],[12.1,-3.2,0xffd860],[-16.6,5.4,0x8ae8ff],[-16.4,-11.6,0x8ae8ff],[16.6,-6.4,0x8ae8ff],[16.7,12,0x8ae8ff],[-6.6,-11.9,0x8ae8ff],[-16.6,12,0xffd860]].forEach(a=>wegleuchte(k,a[0],a[1],a[2]));
  bohrturm(k,-15.4,-3.4);
  /* Gestell mit zwei liegenden Luftbehältern und Schlauch zur Kapsel */
  const tank=gruppe(sc,15,0,-10.8);
  [[.62,0xf0f4fa],[1.46,0xf0f4fa]].forEach(([y,c],i)=>{ walze(tank,.4,2.3,c,0,y,0).rotation.z=Q; [-1,1].forEach(s=>ball(tank,.4,c,s*1.15,y,0,.55,1,1)); [-.6,.6].forEach(x=>walze(tank,.42,.2,i?BLAU:TUERKIS,x,y,0).rotation.z=Q); ball(tank,.12,ROT,1.42,y,0); });
  [-.95,.95].forEach(x=>{ [-.46,.46].forEach(z=>box(tank,.12,2,.12,METALL2,x,1,z)); [.15,1.04,1.95].forEach(y=>box(tank,.14,.09,1,METALL2,x,y,0)); });
  verschmelze(tank); k.kasten(15,-10.8,3.1,1.2);
  const kabel=gruppe(sc,0,0,0);
  const leitung=(P,c)=>{ for(let i=0;i<P.length-1;i++){ strich(kabel,[P[i][0],.05,P[i][1]],[P[i+1][0],.05,P[i+1][1]],.05,c); ball(kabel,.05,c,P[i+1][0],.05,P[i+1][1]); } };
  leitung([[13.6,-10.4],[13,-9.5],[12.3,-9.9],[11.3,-10.9]],ORANGE);
  leitung([[-3.1,7.65],[-2.4,8.1],[-1,9.4],[1.4,10],[4,12.2],[8,12.4],[11,9.6],[11.6,8.6]],0x383c48);
  leitung([[-15.1,-2.3],[-14,-.4],[-15.4,2.2],[-14.6,5],[-14.2,7.9]],0xe8c030);
  verschmelze(kabel);
  /* Stapel aus Metallrohren */
  const rohre=gruppe(sc,16.2,0,2.6);
  [[-.38,.34],[.38,.34],[0,.98]].forEach(([x,y],i)=>{ walze(rohre,.34,2.5,i===2?METALL:0x98a4b8,x,y,0).rotation.x=Q; [-1,1].forEach(s=>{ walze(rohre,.25,.04,DUNKEL,x,y,s*1.26).rotation.x=Q; ring(rohre,.3,.045,ORANGE,x,y,s*1.25); }); });
  [-.75,.75].forEach(z=>box(rohre,1.7,.12,.2,DUNKEL,0,.06,z));
  verschmelze(rohre); k.kasten(16.2,2.6,1.6,2.7);
  /* Kabeltrommel */
  const trommel=gruppe(sc,-15.7,0,-8.4); trommel.rotation.y=.45;
  walze(trommel,.42,.9,0x383c48,0,.82,0).rotation.z=Q;
  [-1,1].forEach(s=>{ walze(trommel,.82,.12,ORANGE,s*.52,.82,0).rotation.z=Q; walze(trommel,.2,.18,METALL2,s*.55,.82,0).rotation.z=Q; [0,1,2].forEach(i=>{ const b=box(trommel,.05,1.4,.1,0xb85a14,s*.59,.82,0); b.rotation.x=i*1.047; }); });
  [-.26,0,.26].forEach(x=>{ const r=ring(trommel,.45,.045,0xe8c030,x,.82,0); r.rotation.y=Q; });
  verschmelze(trommel); k.kreis(-15.7,-8.4,.95); k.verdecker(trommel,-15.7,-8.4,.95);
  /* Handkarren mit zwei stehenden Atemluft-Flaschen */
  const karren=gruppe(sc,-9.2,0,10.4); karren.rotation.y=.3;
  box(karren,1.15,.1,.7,METALL2,0,.2,0);
  [-.28,.28].forEach((x,i)=>{ walze(karren,.23,1.15,i?0x58c8f0:0x7ae080,x,.84,0); ball(karren,.23,i?0x58c8f0:0x7ae080,x,1.4,0,1,.7,1); walze(karren,.08,.18,METALL,x,1.62,0); ring(karren,.1,.03,ROT,x,1.74,0).rotation.x=Q; walze(karren,.24,.1,WEISS,x,1.05,0); });
  [-.58,.58].forEach(x=>{ strich(karren,[x,.2,-.3],[x,1.5,-.34],.045,METALL); walze(karren,.18,.12,REIFEN,x,.18,.2).rotation.z=Q; }); strich(karren,[-.58,1.5,-.34],[.58,1.5,-.34],.045,METALL); strich(karren,[-.6,.95,.28],[.6,.95,.28],.03,ORANGE); [-.58,.58].forEach(x=>strich(karren,[x,.2,.28],[x,.95,.28],.03,ORANGE));
  verschmelze(karren); k.kreis(-9.2,10.4,.75);
  /* zwei Böcke mit waagerecht liegenden Bohrrohren und stumpfen Bohrkronen */
  const bock=gruppe(sc,-5.2,0,-12.15);
  [-.72,.72].forEach(x=>{ box(bock,.2,.14,1.05,ORANGE,x,.8,0); [-.4,.4].forEach(z=>{ box(bock,.13,.76,.13,METALL2,x,.38,z); box(bock,.26,.08,.26,DUNKEL,x,.04,z); }); box(bock,.08,.08,.8,METALL2,x,.3,0); });
  [-.3,0,.3].forEach((z,i)=>{ const x=(i-1)*.08, y=.99;
    walze(bock,.115,2,METALL,x,y,z).rotation.z=Q; [-.45,.45].forEach(d=>walze(bock,.125,.12,[GELB,WEISS,TUERKIS][i],x+d,y,z).rotation.z=Q);
    walze(bock,.14,.26,DUNKEL,x+1.1,y,z).rotation.z=Q; [0,1,2,3].forEach(j=>{ const w=j*Q+.785; box(bock,.07,.07,.07,GOLD,x+1.25,y+Math.sin(w)*.08,z+Math.cos(w)*.08); });
    walze(bock,.085,.04,DUNKEL,x-1.02,y,z).rotation.z=Q; });
  verschmelze(bock); k.kasten(-5.18,-12.15,2.55,1.05);
  /* Markierungsstäbe mit Streifen */
  const stab=gruppe(sc,0,0,0);
  [[-16.9,1.2],[-16.8,-6],[16.9,-1.2],[16.8,7],[-1.6,-12.4],[4.4,-12.3],[17,-12.3],[-11.2,-12.4],[5.6,12.3],[-6,12.4]].forEach(([x,z])=>{ for(let i=0;i<6;i++) walze(stab,.055,.26,i%2?WEISS:ORANGE,x,.13+i*.26,z); ball(stab,.11,basis(0xfff080),x,1.66,z); rohr(stab,.08,.18,.1,DUNKEL,x,.05,z,8); k.kreis(x,z,.18); });
  verschmelze(stab);
  /* kleine runde Mondbrocken */
  const G=[felsGeo(2,0,.35),felsGeo(7,0,.35),felsGeo(11,0,.35)], steine=gruppe(sc,0,0,0);
  [[-12.4,3.6,.42],[-4.4,-.5,.34],[3.4,-.9,.34],[-12,-9,.45],[-3,-9.6,.3],[3.8,-7.4,.36],[16.4,-.6,.42],[16.3,5.8,.38],[9.2,-2.2,.3],[-16.5,9.6,.45],[1,12.2,.34],[14.8,12.4,.4],[-12.6,11.9,.36],[-7.4,-3,.3],[9.8,5.2,.28],[-1.2,-2.6,.28]].forEach(([x,z,s],i)=>{
    const m=form(steine,G[i%3],i%2?FELS:FELS2,x,s*.45,z); m.scale.set(s*1.1,s*.75,s);
    const n=form(steine,G[(i+1)%3],FELS3,x+s*.75,s*.18,z+s*.45); n.scale.set(s*.4,s*.3,s*.38);
    k.kreis(x,z,s*1.2); });
  verschmelze(steine);
  /* Kiesel als Instanzen, manche entlang kleiner Kraterränder */
  const o=new THREE.Object3D();
  const streu=(farbe,liste)=>{ const m=new THREE.InstancedMesh(G[0],mat(farbe),liste.length); m.frustumCulled=false; liste.forEach((q,i)=>{ o.position.set(q[0],q[2]*.35,q[1]); o.rotation.set(0,q[3],0); o.scale.set(q[2]*1.2,q[2]*.7,q[2]); o.updateMatrix(); m.setMatrixAt(i,o.matrix); }); m.receiveShadow=true; sc.add(m); };
  [FELS,FELS3,0xb4b4c0].forEach((c,n)=>{ const L=[];
    for(let i=0;i<90;i++) L.push([(zufall()-.5)*35.5,(zufall()-.5)*27,.04+zufall()*.07,zufall()*6]);
    for(let i=0;i<30;i++) L.push([(zufall()-.5)*44,i%3?13.6+zufall()*9:-13.4-zufall()*3,.08+zufall()*.14,zufall()*6]);
    [[-12,6.2,1.7],[10.5,.8,1.6],[-13,-7,1.3],[2.5,8.6,1]].forEach(([x,z,r],j)=>{ if(j%3!==n) return; for(let i=0;i<22;i++){ const a=-.5+i*.21; L.push([x+Math.cos(a)*r*(1+zufall()*.1),z+Math.sin(a)*r*.82*(1+zufall()*.1),.05+zufall()*.07,i]); } });
    streu(c,L); });
}

/* ---------- Tiere und Helfer ---------- */
/* freundliches Mondwesen: hüpft auf seinem Rundweg, Gesicht zeigt in Laufrichtung (+x) */
function mondwesen(k,weg,tempo,start,gr,farbe,bauch){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), h=gruppe(g,0,0,0), r=gruppe(h,0,0,0);
  ball(r,.48,farbe,0,.62,0,.95,1,1); ball(r,.38,farbe,.04,1.08,0); ball(r,.34,bauch,.22,.5,0,.85,1,.95);
  [-1,1].forEach(s=>{ ball(r,.15,0xffffff,.33,1.17,s*.17,.8,1.1,1); ball(r,.075,0x181830,.45,1.17,s*.17,.7,1.1,1); ball(r,.024,basis(0xffffff),.505,1.21,s*.15);
    ball(r,.075,0xff8ab0,.37,.99,s*.27,.5,.6,1);
    strich(r,[0,1.38,s*.17],[-.04,1.72,s*.34],.025,farbe); ball(r,.1,basis(0xffe45a),-.04,1.76,s*.35);
    ball(r,.2,farbe,-.06,1.2,s*.43,.5,.75,1.1);
    strich(r,[.08,.72,s*.4],[.28,.52,s*.62],.07,farbe); ball(r,.1,bauch,.29,.5,s*.63);
    ball(r,.19,0x9a6ae0,.1,.12,s*.24,1.5,.65,1); });
  const mund=ring(r,.1,.022,0x4a2050,.425,1.02,0,Math.PI); mund.rotation.order='YXZ'; mund.rotation.set(0,Q,Math.PI);
  ball(r,.17,farbe,-.46,.5,0);
  verschmelze(r); r.scale.set(gr,gr,gr);
  laeufer(k,g,weg,tempo,start,3);
  k.anim.push(t=>{ const s=Math.abs(Math.sin(t*3.1+start)); h.position.y=s*.62; h.scale.y=.9+Math.min(1,s*2)*.12; });
}

/* Wege der bewegten Figuren (frei von festen Dingen) */
const WEG1=[[-5.8,.2],[-2.2,3.4],[-5.4,5.9],[-10.2,5.4],[-10.8,.2],[-7.8,-1]];
const WEG2=[[.6,-6.2],[2,-3.8],[6.4,-1.4],[10.2,-4.6],[7,-5.8],[3,-5.9]];
const WEG3=[[.6,6.4],[2.6,9.6],[7.8,10.2],[9,6.6],[4,5.8]];

function baue(k){
  const sc=k.scene;
  sc.add(new THREE.HemisphereLight(0xe4eaff,0x62606c,.74));
  const sonne=new THREE.DirectionalLight(0xfff4e0,.6); sonne.position.set(-12,22,12); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const hinten=k.wand('hinten');
  boden(k);
  himmel(k);
  rand(k,hinten);
  const tuer=kapsel(k);
  ausstattung(k);
  mondwesen(k,WEG1,1.15,0,1,0x66d8a8,0xd8fce8);
  mondwesen(k,WEG2,.9,2.2,.72,0xff9ac8,0xffe4f0);
  roboter(k,WEG3,1,0,0xffe2b0);
  return { tuer, start:[1.2,1.2] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-14.6,-10.9],[-16.6,-1],[-16,7.6],[-14,11.4],[-11.4,-4.6],[-10.8,8.2],[-8,-10.4],[-6.4,8.4],[-4,-10.2],[-3,.2],[-1,-10.4],[3.4,2.2],[4.6,-11.4],[6.8,7.8],[13.4,-8.6],[16.4,-8.6],[15.2,.2],[16.6,10],[12.2,4.4],[.4,11]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-8.4, z:2.6, steh:[-8.4,4.5], kasten:[2.5,1.8], treffer:[2.5,2.1,1.8], baue(g){ /* 1 Mondgestein: kantige Brocken mit leuchtenden Kristallen */
      const G=felsGeo(31,0,.42), G2=felsGeo(37,0,.5);
      const a=form(g,G,0x9890ac,-.2,.65,-.1); a.scale.set(.92,.86,.72); a.rotation.y=.5;
      const b=form(g,G2,0x7c7494,.72,.36,.22); b.scale.set(.52,.46,.48);
      const c=form(g,G2,0xaaa2bc,-.88,.24,.38); c.scale.set(.36,.32,.34); c.rotation.y=2;
      [[.15,.46,.36,.07],[-.5,.7,.52,.1],[-.7,.35,.48,.06],[.66,.42,.59,.07]].forEach(([x,y,z,r])=>ball(g,r,0x4e4864,x,y,z,1,.8,.4));
      const kr=mat(0x5ae0ff,{emissive:0x1a7aa0});
      const kristall=(x,y,z,r,h,rz,rx)=>{ const q=gruppe(g,x,y,z); q.rotation.set(rx,0,rz); rohr(q,r,r*.8,h,kr,0,h/2,0,6); rohr(q,0,r,r*1.7,kr,0,h+r*.85,0,6); };
      kristall(.05,1.15,.05,.17,.5,-.12,.1); kristall(-.35,1.1,.12,.12,.34,.42,.18); kristall(.26,.85,.10,.12,.34,-.65,.3); kristall(.78,.6,.35,.09,.26,-.3,.35); kristall(.1,.2,.42,.1,.3,-.35,.75);
      schein(g,'rgba(90,220,255,.4)',.1,1.4,.4,1.6); } },
  { x:-3.2, z:-5.6, steh:[-3.2,-3.7], r:.75, treffer:[2.2,3.5,.5], baue(g,k){ /* 2 Fahne mit Rakete */
      const X=-.5; ball(g,.55,STAUB,X,0,0,1.15,.38,1);
      [[-.35,.28,.12],[.38,.2,.1],[.05,.42,.09]].forEach(([a,b,r])=>ball(g,r,FELS3,X+a,r*.7,b));
      walze(g,.065,3.2,0xe4e8f0,X,1.65,0); ball(g,.14,GOLD,X,3.34,0); strich(g,[X,3.1,0],[X+1.78,3.1,0],.04,0xe4e8f0); ball(g,.07,GOLD,X+1.8,3.1,0);
      const t=bild(256,168,c=>{ c.fillStyle='#2250a8'; c.fillRect(0,0,256,168); c.strokeStyle='#ffd23a'; c.lineWidth=9; c.strokeRect(5,5,246,158);
        c.save(); c.translate(128,82); c.rotate(.62);
        c.fillStyle='#ff8a2a'; c.beginPath(); c.moveTo(-17,38); c.quadraticCurveTo(0,84,17,38); c.fill(); c.fillStyle='#fff0a0'; c.beginPath(); c.moveTo(-8,38); c.quadraticCurveTo(0,64,8,38); c.fill();
        c.fillStyle='#e0443a'; [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(s*18,4); c.lineTo(s*44,44); c.lineTo(s*17,36); c.fill(); });
        c.fillStyle='#ffffff'; c.beginPath(); c.moveTo(0,-66); c.quadraticCurveTo(38,-24,20,40); c.lineTo(-20,40); c.quadraticCurveTo(-38,-24,0,-66); c.fill();
        c.fillStyle='#e0443a'; c.beginPath(); c.moveTo(0,-66); c.quadraticCurveTo(15,-52,21,-39); c.lineTo(-21,-39); c.quadraticCurveTo(-15,-52,0,-66); c.fill();
        c.fillStyle='#ffd23a'; c.beginPath(); c.arc(0,-10,15,0,7); c.fill(); c.fillStyle='#58d8f0'; c.beginPath(); c.arc(0,-10,10,0,7); c.fill(); c.restore();
        c.fillStyle='#fff2b0'; [[32,34],[220,40],[44,128],[212,132],[74,66],[196,92]].forEach(([x,y],i)=>{ c.beginPath(); for(let j=0;j<10;j++){ const w=j*.628-1.571, r=(j%2?4:10)*(i>3?.7:1); j?c.lineTo(x+Math.cos(w)*r,y+Math.sin(w)*r):c.moveTo(x+Math.cos(w)*r,y+Math.sin(w)*r); } c.fill(); }); });
      const geo=new THREE.PlaneGeometry(1.7,1.12,16,4), p=geo.attributes.position; for(let i=0;i<p.count;i++){ const u=p.getX(i); p.setZ(i,Math.sin(u*7)*.07*(.55-p.getY(i)*.6)); } geo.computeVertexNormals();
      const f=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({map:t,side:THREE.DoubleSide,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.28})); f.position.set(X+.9,2.52,.01); f.castShadow=true; g.add(f);
      [.15,.65,1.15,1.65].forEach(x=>ring(g,.07,.022,METALL2,X+x,3.1,0).rotation.y=Q); } },
  { x:6.6, z:3.4, dreh:-.16, steh:[6.6,5.75], kasten:[3.4,2.3], treffer:[3.3,2.3,2.2], baue(g,k){ /* 3 Mondauto */
      box(g,2.7,.2,1.25,METALL,0,.62,0); box(g,2.5,.12,1.1,METALL2,0,.46,0);
      [-1,1].forEach(a=>[-1,1].forEach(b=>{ const x=a*1.05, z=b*.84;
        const w=walze(g,.46,.34,REIFEN,x,.47,z); w.rotation.x=Q; ring(g,.44,.075,0x484c58,x,.47,z+b*.17);
        walze(g,.24,.04,0xd8dee8,x,.47,z+b*.19).rotation.x=Q; ball(g,.09,ORANGE,x,.47,z+b*.22);
        [0,1,2,3].forEach(i=>{ const s=box(g,.44,.05,.03,METALL2,x,.47,z+b*.215); s.rotation.z=i*.785; });
        for(let i=0;i<10;i++){ const w2=i*.628; const s=box(g,.09,.07,.38,0x585c6a,x+Math.cos(w2)*.47,.47+Math.sin(w2)*.47,z); s.rotation.z=w2+Q; }
        box(g,.72,.08,.46,ORANGE,x,1.05,z); [-1,1].forEach(v=>{ const s=box(g,.34,.08,.46,ORANGE,x+v*.48,.94,z); s.rotation.z=-v*.6; });
        strich(g,[x,.62,b*.55],[x,.47,z],.07,DUNKEL); }));
      /* zwei Sitze, Lenkpult, Überrollbügel */
      [-.3,.3].forEach(z=>{ box(g,.52,.16,.48,0xf07a28,-.2,.82,z); const l=box(g,.14,.68,.48,0xf07a28,-.52,1.16,z); l.rotation.z=.16; box(g,.1,.2,.28,DUNKEL,-.59,1.55,z).rotation.z=.16; });
      box(g,.3,.5,1,WEISS,.62,.97,0); box(g,.36,.1,1.06,DUNKEL,.58,1.25,0); [-.28,0,.28].forEach((z,i)=>ball(g,.06,basis([0x60f070,0xffd23a,0xff5a4a][i]),.58,1.32,z));
      ring(g,.18,.04,DUNKEL,.35,1.28,-.28).rotation.set(0,Q,0);
      [-.58,.58].forEach(z=>strich(g,[-.95,.7,z],[-.95,1.78,z],.05,METALL)); strich(g,[-.95,1.78,-.58],[-.95,1.78,.58],.05,METALL);
      /* Ladefläche hinten und Scheinwerfer vorn */
      box(g,.36,.28,1,WEISS,-1.18,.86,0); box(g,.38,.07,1.02,BLAU,-1.18,.9,0);
      box(g,.18,.28,1.2,WEISS,1.38,.78,0); [-.38,.38].forEach(z=>{ walze(g,.13,.08,basis(0xfff4a0),1.49,.82,z).rotation.z=Q; ring(g,.14,.035,DUNKEL,1.52,.82,z).rotation.y=Q; });
      strich(g,[1.25,.9,.5],[1.4,1.85,.5],.025,DUNKEL); ball(g,.09,basis(0xff6a4a),1.4,1.9,.5); } },
  { x:-14, z:8.2, steh:[-14,10.15], r:.95, treffer:[2.3,3.2,1.8], baue(g,k){ /* 4 Funkantenne */
      for(let i=0;i<3;i++){ const a=i*2.094+.5; strich(g,[Math.cos(a)*.85,.08,Math.sin(a)*.85],[0,.95,0],.07,METALL2); ball(g,.14,DUNKEL,Math.cos(a)*.85,.06,Math.sin(a)*.85,1.2,.5,1.2); }
      walze(g,.11,1.25,METALL,0,1.3,0); box(g,.36,.32,.36,ORANGE,0,.95,0); ball(g,.17,DUNKEL,0,1.92,0);
      const s=gruppe(g,0,2.05,.04); s.rotation.set(.92,0,.12);
      const R=1.45, W=.82, yb=R*(1-Math.cos(W)), rr=R*Math.sin(W);
      const sch=new THREE.Mesh(new THREE.SphereGeometry(R,28,8,0,Math.PI*2,Math.PI-W,W),doppel(0xf6f8fc)); sch.position.y=R; sch.castShadow=true; s.add(sch);
      ring(s,rr,.055,ORANGE,0,yb,0).rotation.x=Q; ring(s,rr*.62,.022,METALL,0,yb*.4,0).rotation.x=Q;
      for(let i=0;i<3;i++){ const a=i*2.094; strich(s,[Math.cos(a)*rr*.95,yb,Math.sin(a)*rr*.95],[0,.88,0],.028,DUNKEL); }
      strich(s,[0,0,0],[0,.88,0],.04,DUNKEL); ball(s,.15,basis(0xff5a4a),0,.94,0);
      /* Funkwellen: kleine Bögen, die nacheinander aufleuchten */
      const wm=basis(0x70f0ff,{transparent:true}), wellen=[.3,.48,.66].map(r=>{ const w=gruppe(g,-.1,2.64,.8); const m=new THREE.Mesh(new THREE.TorusGeometry(r,.028,6,14,1.3),wm); m.rotation.z=.15; w.add(m); return w; });
      k.anim.push(t=>{ const n=Math.floor(t*3)%4; wellen.forEach((w,i)=>w.visible=i<n); }); } },
  { wand:'hinten', x:1.5, z:-12.75, steh:[1.5,-11.1], treffer:[2.5,3.2,.9], baue(g,k){ /* 5 Messstation auf einem Gestell */
      [-.85,.85].forEach(x=>{ box(g,.14,1.35,.14,METALL2,x,.68,-.05); box(g,.5,.12,.5,DUNKEL,x,.06,-.05); });
      strich(g,[-.85,.2,-.05],[.85,.95,-.05],.04,METALL2); strich(g,[.85,.2,-.05],[-.85,.95,-.05],.04,METALL2);
      box(g,2.3,1.5,.44,WEISS,0,1.98,-.05); box(g,2.4,.12,.5,ORANGE,0,2.77,-.05); box(g,2.4,.1,.5,METALL2,0,1.22,-.05);
      bildschirm(g,k,1.5,.66,-.24,2.3,.24,'kurve','#7ae870');
      const lampen=[0xff5a4a,0xffd23a,0x60f070].map((c,i)=>{ const m=basis(c); ball(g,.14,m,-.62+i*.42,1.58,.18,1,1,.7); ring(g,.16,.035,DUNKEL,-.62+i*.42,1.58,.19); return [m,c]; });
      /* Drehknopf und Zeigeruhr */
      walze(g,.24,.08,DUNKEL,.87,2.36,.18).rotation.x=Q; walze(g,.19,.09,0xfff3cf,.87,2.36,.19).rotation.x=Q;
      const zeiger=gruppe(g,.87,2.36,.26); box(zeiger,.04,.17,.02,basis(ROT,{transparent:true}),0,.07,0);   /* durchsichtig-fähig, damit der Zeiger beweglich bleibt */
      walze(g,.16,.14,ORANGE,.82,1.66,.22).rotation.x=Q; box(g,.05,.18,.03,DUNKEL,.82,1.7,.3);
      /* Fühler oben */
      strich(g,[-.8,2.8,-.05],[-.8,3.2,-.05],.04,METALL); ball(g,.14,BLAU,-.8,3.24,-.05); strich(g,[.55,2.8,-.05],[.75,3.1,-.05],.035,METALL); ball(g,.1,basis(0x70f0ff),.76,3.12,-.05);
      walze(g,.16,.36,METALL,0,2.98,-.1); [2.9,3.02,3.14].forEach(y=>walze(g,.24,.04,METALL2,0,y,-.1));
      k.anim.push(t=>{ lampen.forEach(([m,c],i)=>{ m.color.setHex(c); if(Math.floor(t*2.2)%3!==i) m.color.multiplyScalar(.4); }); zeiger.rotation.z=Math.sin(t*1.4)*1.1; });
      k.kasten(1.5,-12.85,2.5,.65); } },
  { wand:'hinten', x:-13.8, z:-12.75, steh:[-13.8,-11.1], treffer:[3.1,3.3,.8], baue(g,k){ /* 6 Krater-Tafel mit Bildern */
      [-1.05,1.05].forEach(x=>{ walze(g,.09,1.4,METALL2,x,.7,-.08); ball(g,.3,STAUB,x,0,-.04,1.2,.45,.9); });
      box(g,3,2.1,.18,METALL,0,2.15,-.08); [-1,1].forEach(a=>[-1,1].forEach(b=>ball(g,.07,DUNKEL,a*1.39,2.15+b*.94,.03)));
      const t=bild(512,352,c=>{ c.fillStyle='#26324e'; c.fillRect(0,0,512,352); c.lineCap='round';
        const krater=(x,y,a,b)=>{ c.fillStyle='#8a90a8'; c.beginPath(); c.ellipse(x,y,a,b,0,0,6.283); c.fill(); c.fillStyle='#4a5068'; c.beginPath(); c.ellipse(x,y+b*.1,a*.74,b*.68,0,0,6.283); c.fill(); c.strokeStyle='#ffffff'; c.lineWidth=6; c.beginPath(); c.ellipse(x,y,a,b,0,0,6.283); c.stroke(); };
        krater(150,258,115,55); krater(362,285,66,31); krater(420,205,38,18); krater(300,215,22,10);
        /* fallender Meteorit mit Schweif */
        [['#ff8a2a',26],['#ffd23a',12]].forEach(([f,w])=>{ c.strokeStyle=f; c.lineWidth=w; c.beginPath(); c.moveTo(42,38); c.lineTo(122,152); c.stroke(); });
        c.fillStyle='#c8a890'; c.beginPath(); c.arc(132,167,24,0,7); c.fill(); c.fillStyle='#8a6a5a'; c.beginPath(); c.arc(126,162,7,0,7); c.arc(142,176,5,0,7); c.fill();
        c.strokeStyle='#ffffff'; c.lineWidth=7; c.beginPath(); c.moveTo(160,185); c.lineTo(185,214); c.moveTo(188,192); c.lineTo(185,214); c.lineTo(163,210); c.stroke();
        /* Mondkugel mit Kratern */
        c.fillStyle='#d4d6e4'; c.beginPath(); c.arc(355,92,70,0,7); c.fill(); [[330,70,18],[380,100,22],[345,125,10],[385,55,9],[315,108,8]].forEach(([x,y,r])=>{ c.fillStyle='#8c90a6'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.strokeStyle='#ffffff'; c.lineWidth=3; c.beginPath(); c.arc(x,y,r,.3,2.8); c.stroke(); });
        c.fillStyle='#fff2b0'; [[230,40],[470,40],[250,120],[470,150],[40,170]].forEach(([x,y])=>{ c.beginPath(); c.arc(x,y,5,0,7); c.fill(); }); });
      bildFlaeche(g,2.66,1.82,t,0,2.15,.025);
      box(g,3.1,.12,.34,ORANGE,0,3.26,-.04); walze(g,.07,1,basis(0xfff4b0),0,3.15,.14).rotation.z=Q;
      k.kasten(-13.8,-12.85,3.1,.65); } },
  { x:13.8, z:-3, dreh:-.22, steh:[13.5,-1.1], kasten:[2.4,1.8], treffer:[2.4,2.2,1.7], baue(g){ /* 7 Mondstaub-Kiste mit drei großen Gläsern */
      box(g,2.1,.14,1.15,METALL2,0,.17,0); box(g,2.1,.66,.1,0x8c9cb8,0,.54,.55); box(g,2.1,.66,.1,0x8c9cb8,0,.54,-.55); [-1,1].forEach(s=>box(g,.1,.66,1.06,0x7888a4,s*1,.54,0));
      [-1,1].forEach(a=>{ [-1,1].forEach(b=>{ box(g,.2,.86,.2,DUNKEL,a*1.02,.46,b*.57); ball(g,.12,GELB,a*1.02,.92,b*.57,1,.6,1); }); ring(g,.2,.045,GELB,a*1.12,.62,0,Math.PI).rotation.set(0,Q,Math.PI); });
      box(g,2.14,.09,.13,WEISS,0,.88,.57);
      /* drei Farbfelder vorn, passend zum Staub */
      const F=[0x9a9aa8,0xe0c088,0x6890c8];
      [-.58,0,.58].forEach((x,i)=>{ box(g,.4,.36,.03,WEISS,x,.52,.612); ball(g,.13,F[i],x,.52,.63,1,1,.25); });
      /* offener Deckel */
      const d=gruppe(g,0,.9,-.6); d.rotation.x=-.28; box(d,2.15,.95,.1,0xa8b8d0,0,.46,-.03); box(d,1.85,.7,.03,0x56627c,0,.46,.035); box(d,.4,.1,.12,GELB,0,.98,-.03);
      const glas=new THREE.MeshLambertMaterial({color:0xd8f4ff,transparent:true,opacity:.34,depthWrite:false});
      [-.62,0,.62].forEach((x,i)=>{ const z=.08; walze(g,.25,.8+i%2*.12,F[i],x,.64+i%2*.06,z); ball(g,.24,F[i],x,1.04+i%2*.12,z,1,.4,1);
        for(let j=0;j<5;j++){ const a=j*1.3+i; ball(g,.04,0xf4f4f8,x+Math.cos(a)*.14,1.12+i%2*.12,z+Math.sin(a)*.14); }
        const h=rohr(g,.28,.28,1.28,glas,x,.9,z,16,false); h.castShadow=false;
        walze(g,.3,.14,[ORANGE,ROT,TUERKIS][i],x,1.6,z); ball(g,.08,METALL,x,1.72,z); box(g,.04,.5,.02,basis(0xffffff),x-.15,1.3,z+.245); });
      /* kleine Schaufel */
      strich(g,[.82,.5,.72],[1.12,1.12,.68],.045,ORANGE); box(g,.28,.34,.07,METALL,.74,.24,.76).rotation.z=-.5; ball(g,.35,0xc0c0cc,.55,0,.76,1.2,.2,.45); } },
  { x:-9.2, z:-5.4, steh:[-9.2,-3.5], r:.95, treffer:[2.6,2.7,1.7], baue(g){ /* 8 Mond-Fernrohr, schaut zur Erde */
      for(let i=0;i<3;i++){ const a=i*2.094+1.4, x=Math.cos(a)*.78, z=Math.sin(a)*.78; strich(g,[x,.06,z],[0,1.35,0],.065,DUNKEL); ball(g,.11,ORANGE,x,.07,z,1,.7,1); strich(g,[x*.5,.7,z*.5],[0,.72,0],.025,METALL2); }
      walze(g,.15,.22,METALL2,0,1.38,0); ball(g,.17,GOLD,0,1.55,0);
      const d=V(-.84,.42,-.34).normalize(), r=gruppe(g,0,1.74,0); r.quaternion.setFromUnitVectors(V(0,1,0),d);
      walze(r,.25,1.7,WEISS,0,.1,0); walze(r,.33,.5,0x2fa8c0,0,1.12,0); ring(r,.33,.05,GOLD,0,1.37,0).rotation.x=Q; walze(r,.27,.02,basis(0xaaf0ff),0,1.38,0);
      [-.35,.5].forEach(y=>walze(r,.27,.1,GOLD,0,y,0)); walze(r,.17,.2,METALL2,0,-.83,0); walze(r,.09,.32,DUNKEL,0,-1.05,0); ring(r,.1,.035,ORANGE,0,-1.2,0).rotation.x=Q;
      walze(r,.09,.75,0x2fa8c0,0,.15,0).position.z=.34; [-.1,.4].forEach(y=>box(r,.06,.06,.14,METALL2,0,y,.27));
      walze(g,.09,.2,ORANGE,.18,1.55,.12).rotation.z=Q; } },
  { x:12.8, z:7.5, steh:[12.8,10.25], r:1.65, treffer:[3.2,2.2,3.2], baue(g,k){ /* 9 Kuppelzelt */
      const R=1.5;
      for(let i=0;i<8;i++){ const m=new THREE.Mesh(new THREE.SphereGeometry(R,5,10,i*Math.PI/4,Math.PI/4,0,Math.PI/2),doppel(i%2?0xfff0dc:0xff8a2a)); m.scale.y=1.12; m.castShadow=true; m.receiveShadow=true; g.add(m); }
      for(let i=0;i<4;i++){ const b=ring(g,R+.012,.035,METALL2,0,0,0,Math.PI); b.rotation.y=i*Math.PI/4; b.scale.y=1.12; }
      ring(g,R+.03,.09,0x2a68b0,0,.08,0).rotation.x=Q; ball(g,.16,GELB,0,R*1.12+.04,0,1,.7,1);
      /* geschlossener Eingang mit Reißverschluss */
      const E=gruppe(g,0,0,1.02);
      walze(E,.74,.78,0x2a78d0,0,.62,.08).rotation.x=Q; box(E,1.48,.62,.78,0x2a78d0,0,.31,.08);
      walze(E,.58,.05,0x7ac0f8,0,.62,.49).rotation.x=Q; box(E,1.16,.58,.05,0x7ac0f8,0,.33,.49);
      ring(E,.64,.07,GELB,0,.62,.49,Math.PI); [-.64,.64].forEach(x=>box(E,.14,.62,.1,GELB,x,.31,.49));
      box(E,.07,1.12,.04,DUNKEL,0,.6,.53); for(let i=0;i<9;i++) box(E,.15,.035,.03,DUNKEL,0,.14+i*.12,.535); ball(E,.09,ROT,0,.45,.58); box(E,1.3,.07,.3,METALL2,0,.036,.62);
      /* runde Fenster */
      [-1,1].forEach(s=>{ const f=gruppe(g,Math.sin(s*.95)*1.37,.82,Math.cos(s*.95)*1.37); f.rotation.y=s*.95; const q=gruppe(f,0,0,0); q.rotation.x=-.45; walze(q,.28,.1,basis(0xffe890),0,0,.04).rotation.x=Q; ring(q,.29,.065,0x2a68b0,0,0,.1); box(q,.52,.035,.03,0x2a68b0,0,0,.11); box(q,.035,.52,.03,0x2a68b0,0,0,.114); });
      /* Spannseile mit Haken */
      [2.2,-2.2,.62,-.62].forEach((a,i)=>{ const s=Math.sin(a), c=Math.cos(a), l=i<2?1.95:1.85; strich(g,[s*1.15,1.15,c*1.15],[s*l,.08,c*l],.018,WEISS); walze(g,.06,.2,GELB,s*l,.1,c*l); });
      k.kreis(12.8,8.9,.75); } },
  { x:-3.6, z:7.7, steh:[-3.6,9.75], kasten:[3,1.5], treffer:[3.1,2.6,1.7], baue(g){ /* 10 Sonnenplatte auf einem Ständer */
      box(g,1.3,.12,.18,DUNKEL,0,.07,0); box(g,.18,.1,1.15,DUNKEL,0,.065,0); [[-.65,0],[.65,0],[0,-.56],[0,.56]].forEach(([x,z])=>ball(g,.13,METALL2,x,.09,z,1,.65,1));
      walze(g,.12,1.3,METALL,0,.72,-.05); box(g,.34,.36,.34,GOLD,0,.62,-.05); ball(g,.19,METALL2,0,1.4,-.05);
      const t=bild(384,224,c=>{ c.fillStyle='#d8e0ec'; c.fillRect(0,0,384,224); for(let j=0;j<3;j++) for(let i=0;i<6;i++){ const x=8+i*62, y=8+j*70, v=c.createLinearGradient(x,y,x+58,y+66); v.addColorStop(0,'#3a78e0'); v.addColorStop(.5,'#1a3a90'); v.addColorStop(1,'#2450b0'); c.fillStyle=v; c.fillRect(x,y,58,66); c.strokeStyle='rgba(170,210,255,.6)'; c.lineWidth=2; [19,39].forEach(d=>{ c.beginPath(); c.moveTo(x+d,y); c.lineTo(x+d,y+66); c.stroke(); }); }
        c.fillStyle='rgba(255,255,255,.2)'; c.beginPath(); c.moveTo(60,0); c.lineTo(140,0); c.lineTo(40,224); c.lineTo(-40,224); c.fill(); });
      const p=gruppe(g,0,1.55,0); p.rotation.x=-.82;
      box(p,2.9,1.72,.1,METALL,0,0,0); bildFlaeche(p,2.76,1.6,t,0,0,.062); box(p,2.4,.14,.1,METALL2,0,0,-.1); box(p,.14,1.4,.1,METALL2,0,0,-.104);
      [-1,1].forEach(s=>{ box(p,.1,1.8,.14,GOLD,s*1.46,0,0); strich(g,[s*.8,1.5,-.1],[0,.85,-.05],.035,METALL2); });
      strich(g,[.15,.5,0],[.7,.06,.5],.035,0x383c48); ball(g,.1,basis(0x60f070),0,.68,.14); } }
];

return { titel:'Die Mondoberfläche', himmel:0x05060e, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Schlussbild Raumschiff: Mondoberfläche mit Landekapsel. Erst zählen nur Lichter den Start herunter, die Figur winkt am großen
   Fenster. Dann zündet das Triebwerk, Staub wirbelt, die Kapsel fliegt in einem Bogen zur großen Erde. Bunte Funken, Konfetti und
   Sterne. Der Bordroboter blinkt und piepst vor Freude am kleinen Fenster, das Mondwesen winkt zum Abschied. */
FINALE3D.raumschiff = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  sc.background=new THREE.Color(0x070a1c);
  sc.add(new THREE.HemisphereLight(0xe8f0ff,0x4a4a66,.68));
  const sonne=new THREE.DirectionalLight(0xfff4e0,.5); sonne.position.set(-10,20,16); sonne.castShadow=true; sonne.shadow.mapSize.set(1024,1024);
  const sk=sonne.shadow.camera; sk.left=-16; sk.right=16; sk.top=16; sk.bottom=-12; sk.near=1; sk.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const leuchtend=(f,e)=>mat(f,{emissive:e});
  const o=new THREE.Object3D();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const METALL=0xb8c4d4, DUNKEL=0x2a3248, GRAUBLAU=0x6c7890, WEISS=0xdde3ee, ORANGE=0xf08a2a, ROT=0xe0443a, GOLD=0xd8a73a;

  /* ---------- Sternenhimmel ---------- */
  const NS=620, sterne=new THREE.InstancedMesh(new THREE.OctahedronGeometry(1,0),basis(0xffffff),NS);
  for(let i=0;i<NS;i++){ o.position.set((zufall()-.5)*340,-75+zufall()*190,-81-zufall()*12); const s=zufall()<.07?.55:.14+zufall()*.2; o.scale.set(s,s,s); o.rotation.set(0,0,zufall()*3); o.updateMatrix(); sterne.setMatrixAt(i,o.matrix); sterne.setColorAt(i,new THREE.Color([0xffffff,0xbcd8ff,0xffe8b0][i%3])); }
  sterne.frustumCulled=false; sc.add(sterne);
  const glitzer=[]; for(let i=0;i<16;i++) glitzer.push({ s:schein(sc,'rgba(230,240,255,1)',(zufall()-.5)*110,6+zufall()*52,-60,.8), p:i*1.7 });

  /* ---------- Mond (Oberkante bei y=0), sinkt beim Flug nach unten weg ---------- */
  const mond=gruppe(sc,0,0,0), boden=gruppe(mond,0,0,0);
  const grund=rohr(boden,40,37,1,0x9a9aa6,0,-.5,-2,64); grund.castShadow=false;
  /* flache Krater: dunkle Mulde mit niedrigem hellem Rand */
  [[-8.6,3.4,1.5],[7.8,4.6,1.2],[-2.8,6.6,.8],[10.8,-3.4,2],[-12.5,-4,2.4],[3.2,8.4,.6],[-6,-8,1.7],[6.4,-9.5,1.4],[15,2,1.6],[-16,5,1.5],[1,-14,2.6]].forEach((p,i)=>{
    const m=walze(boden,p[2],.01,0x77778a,p[0],.008+(i%3)*.002,p[1]); m.castShadow=false;
    const r=ring(boden,p[2],p[2]*.13,0xb6b6c2,p[0],.02,p[1]); r.rotation.x=Math.PI/2; r.scale.z=.45; });
  const brocken=new THREE.DodecahedronGeometry(1,0), STEIN=[0x84848f,0xa6a6b2,0x6e6e7c];
  const stein=(x,y,z,sx,sy,sz,f,d)=>{ const m=teil(boden,brocken,mat(STEIN[f]),x,y,z,sx,sy,sz); m.rotation.set(0,d||0,0); return m; };
  [[-10.4,1,.8],[-7.4,5.8,.4],[9.2,1.8,.55],[11.6,6,.8],[-11.8,7.4,.7],[5.6,7,.28],[-4.4,8.6,.3],[13.4,-1,.7],[-9,-3,.6],[8.4,-4,.5],[1.6,6.2,.18],[-1.4,9.6,.22]].forEach((p,i)=>stein(p[0],p[2]*.45,p[1],p[2]*1.2,p[2]*.75,p[2],i%3,i));
  for(let i=0;i<70;i++){ const x=(zufall()-.5)*36, z=-10+zufall()*22; if(Math.abs(x)<3.6 && Math.abs(z)<3.6) continue; const g=.06+zufall()*.12; stein(x,g*.4,z,g,g*.7,g,i%3,i); }
  /* Berge am Horizont */
  for(let i=0;i<22;i++){ const x=-37+i*3.5+zufall()*1.4, z=-24-zufall()*7-(Math.abs(x)>26?-6:0), h=1.2+zufall()*2.3;
    stein(x,h*.15,z,2.6+zufall()*1.6,h,2,i%2?2:0,i*.8); }
  /* Spuren von der Station zur Kapsel */
  for(let i=0;i<9;i++){ const x=-3.3-i*.75, z=2.4-i*.5+(i%2?.35:-.05); const f=ball(boden,.2,0x7c7c8c,x,.012,z,1.35,.05,.75); f.rotation.y=-.55; f.castShadow=false; }
  /* kleine Mondstation mit Kuppeln */
  [[-11.5,-11,2.4],[-7.8,-13,1.6],[13,-13,1.9]].forEach((p,i)=>{
    ball(boden,p[2],i%2?METALL:WEISS,p[0],.2,p[1],1,.85,1); walze(boden,p[2]*1.06,.3,ORANGE,p[0],.15,p[1]);
    [-.45,0,.45].forEach(v=>ball(boden,p[2]*.14,basis(0xffe8a0),p[0]+v*p[2]*1.2,p[2]*.42,p[1]+p[2]*(v?.8:.92),1,1,.5));
    strich(boden,[p[0],p[2],p[1]],[p[0],p[2]+1.2,p[1]],.05,GRAUBLAU); ball(boden,.14,basis(0xff6a4a),p[0],p[2]+1.25,p[1]); });
  strich(boden,[-10,.35,-11.4],[-8.6,.35,-12.6],.35,GRAUBLAU);
  /* Fahne mit Rakete */
  strich(boden,[6.6,0,-3],[6.6,4,-3],.07,METALL); ball(boden,.14,GOLD,6.6,4.05,-3);
  box(boden,2,1.2,.06,0x2f6fd8,7.64,3.3,-3); ball(boden,.2,WEISS,7.6,3.38,-2.94,.75,1.7,.2); const spitze=kegel(boden,.15,.28,ROT,7.6,3.78,-2.94); spitze.scale.z=.04;
  [-1,1].forEach(s=>box(boden,.14,.28,.03,ROT,7.6+s*.2,3.1,-2.94)); ball(boden,.09,ORANGE,7.6,2.93,-2.94,1,1.5,.3);
  /* Landefläche */
  const platte=walze(boden,3.7,.012,0x5e667c,0,.02,0); platte.castShadow=false;
  const kreisR=ring(boden,3.35,.07,GOLD,0,.035,0); kreisR.rotation.x=Math.PI/2; kreisR.scale.z=.4;
  verschmelze(boden);
  const randlichter=[]; for(let i=0;i<10;i++){ const a=i/10*6.283+.31; randlichter.push(ball(mond,.13,basis(0x70e8ff),Math.cos(a)*3.75,.12,Math.sin(a)*3.75)); }

  /* ---------- Mast mit den drei Countdown-Lampen ---------- */
  const mast=gruppe(mond,-4.4,0,.3), mastFest=gruppe(mast,0,0,0);
  walze(mastFest,.55,.25,GRAUBLAU,0,.12,0); walze(mastFest,.14,1.2,METALL,0,.7,0); box(mastFest,1.15,3.4,.5,DUNKEL,0,2.8,0); box(mastFest,1.3,.16,.62,ORANGE,0,4.56,0);
  [1.8,2.8,3.8].forEach(y=>ring(mastFest,.4,.06,METALL,0,y,.27));
  verschmelze(mastFest);
  const lampen=[[3.8,0xff4a3a,0x4a1c1a],[2.8,0xffd22a,0x4a3c14],[1.8,0x4cf06a,0x14401e]].map(p=>{ const m=basis(p[2]); ball(mast,.37,m,0,p[0],.24,1,1,.42); const s=schein(mast,'rgba(255,255,255,.55)',0,p[0],.55,1.4); s.material.color.setHex(p[1]); s.visible=false; return { m, s, an:p[1], aus:p[2] }; });

  /* ---------- Mondwesen wie im Raum "Mondoberfläche": türkis, freundlich, winkt (Gesicht nach +z) ---------- */
  function mondwesen(par){
    const g=gruppe(par,0,0,0), h=gruppe(g,0,0,0), r=gruppe(h,0,0,0), F=0x66d8a8, bauch=0xd8fce8;
    h.rotation.y=-Math.PI/2; h.scale.set(1.25,1.25,1.25);
    ball(r,.48,F,0,.62,0,.95,1,1); ball(r,.38,F,.04,1.08,0); ball(r,.34,bauch,.22,.5,0,.85,1,.95);
    [-1,1].forEach(s=>{ ball(r,.15,0xffffff,.33,1.17,s*.17,.8,1.1,1); ball(r,.075,0x181830,.45,1.17,s*.17,.7,1.1,1); ball(r,.024,basis(0xffffff),.505,1.21,s*.15);
      ball(r,.075,0xff8ab0,.37,.99,s*.27,.5,.6,1);
      strich(r,[0,1.38,s*.17],[-.04,1.72,s*.34],.025,F); ball(r,.1,basis(0xffe45a),-.04,1.76,s*.35);
      ball(r,.2,F,-.06,1.2,s*.43,.5,.75,1.1);
      ball(r,.19,0x9a6ae0,.1,.12,s*.24,1.5,.65,1); });
    strich(r,[.08,.72,.4],[.28,.52,.62],.07,F); ball(r,.1,bauch,.29,.5,.63);
    const mund=ring(r,.1,.022,0x4a2050,.425,1.02,0,Math.PI); mund.rotation.order='YXZ'; mund.rotation.set(0,Math.PI/2,Math.PI);
    ball(r,.17,F,-.46,.5,0);
    verschmelze(r);
    /* der rechte Arm winkt */
    const arm=gruppe(h,.08,.74,-.4); strich(arm,[0,0,0],[.1,.34,-.46],.08,F); ball(arm,.13,bauch,.11,.4,-.52);
    verschmelze(arm);
    return { g, arm };
  }
  const wesen=mondwesen(mond); wesen.g.position.set(4.7,0,1.2); wesen.g.rotation.y=-.2;

  /* ---------- Landekapsel (Drehpunkt in der Mitte, Fußpunkt bei y=-3.3) ---------- */
  const kapsel=gruppe(sc,0,3.3,0); kapsel.name='kapsel';
  const innen=gruppe(kapsel,0,-3.3,0), rumpf=gruppe(innen,0,0,0);
  const profil=[[0,.88],[1.5,.9],[2.15,1.12],[2.2,1.6],[2.05,3],[1.8,4.4],[1.4,5.3],[.85,5.88],[.35,6.12],[0,6.18]].map(p=>new THREE.Vector2(p[0],p[1]));
  const huelle=new THREE.Mesh(new THREE.LatheGeometry(profil,40),mat(WEISS,{emissive:0x080a10,side:THREE.DoubleSide})); huelle.castShadow=true; rumpf.add(huelle);
  const band=(r,y,d,f)=>{ const t=ring(rumpf,r,d,f,0,y,0); t.rotation.x=Math.PI/2; };
  band(2.17,1.3,.13,ORANGE); band(2.19,1.62,.05,GRAUBLAU); band(1.6,4.9,.07,ORANGE); band(.84,5.9,.07,GRAUBLAU);
  /* Düse */
  rohr(rumpf,.75,1.15,.55,DUNKEL,0,.66,0,28); const duesenRand=ring(rumpf,1.13,.07,GOLD,0,.4,0); duesenRand.rotation.x=Math.PI/2;
  /* Landebeine */
  [[-1,.55],[1,.55],[-1,-.8],[1,-.8]].forEach(p=>{ const s=p[0], z=p[1];
    strich(rumpf,[s*1.85,2.2,z*1.1],[s*2.95,.2,z*1.8],.11,METALL); strich(rumpf,[s*1.75,1.15,z*.9],[s*2.6,.8,z*1.55],.07,GRAUBLAU);
    walze(rumpf,.44,.15,GRAUBLAU,s*2.98,.11,z*1.82); ball(rumpf,.16,GOLD,s*2.95,.24,z*1.8); });
  /* seitliche Steuerdüsen und Antenne */
  [-1,1].forEach(s=>{ box(rumpf,.4,.75,.6,GRAUBLAU,s*2.1,3,0); kegel(rumpf,.2,.35,DUNKEL,s*2.2,2.5,0); ball(rumpf,.13,basis(s<0?0xff6a4a:0x6af08a),s*2.34,3.15,.16); });
  strich(rumpf,[0,6.1,0],[0,6.75,0],.05,METALL); const schuessel=ball(rumpf,.34,GOLD,.34,6.5,0,1,.25,1); schuessel.rotation.z=-.7; strich(rumpf,[0,6.3,0],[.34,6.5,0],.04,METALL);
  /* Nieten */
  for(let i=0;i<22;i++){ const a=i/22*6.283; ball(rumpf,.05,GRAUBLAU,Math.sin(a)*2.215,1.47,Math.cos(a)*2.215); }
  /* großes Fenster: Rohr nach vorn, goldener Hintergrund, Rahmen */
  const FY=3, FR=1.38;
  const tunnel=rohr(rumpf,FR,FR,1.55,GRAUBLAU,0,FY,2.27,40,true); tunnel.rotation.x=Math.PI/2;
  ring(rumpf,FR+.07,.17,METALL,0,FY,3.04); ring(rumpf,FR+.24,.05,ORANGE,0,FY,2.96);
  /* kleines Fenster für den Bordroboter */
  const rohrKlein=rohr(rumpf,.48,.48,1.37,GRAUBLAU,0,5.25,1.285,28,true); rohrKlein.rotation.x=Math.PI/2;
  ring(rumpf,.51,.08,GOLD,0,5.25,1.97);
  verschmelze(rumpf);
  const innenBild=bild(256,256,g=>{ const v=g.createRadialGradient(128,110,10,128,128,150); v.addColorStop(0,'#fffbe0'); v.addColorStop(.55,'#ffe08a'); v.addColorStop(1,'#d8782c'); g.fillStyle=v; g.fillRect(0,0,256,256); });
  const kabine=new THREE.Mesh(new THREE.CircleGeometry(FR,40),new THREE.MeshBasicMaterial({map:innenBild})); kabine.position.set(0,FY,2.24); innen.add(kabine);
  const klein=new THREE.Mesh(new THREE.CircleGeometry(.48,28),basis(0x123058)); klein.position.set(0,5.25,1.7); innen.add(klein);
  /* Glasglanz: zwei helle Bögen oben links */
  const glanzMat=basis(0xffffff,{transparent:true,opacity:.7,depthWrite:false});
  [[1.18,.028,2.05,.7],[1.04,.018,2.25,.35]].forEach(p=>{ const t=new THREE.Mesh(new THREE.TorusGeometry(p[0],p[1],6,24,p[3]),glanzMat); t.rotation.z=p[2]; t.position.set(0,FY,3.1); innen.add(t); });
  /* Pult am unteren Fensterrand */
  const pult=gruppe(innen,0,0,0);
  box(pult,1.7,.36,.16,DUNKEL,0,1.9,3.12); box(pult,1.82,.07,.2,METALL,0,2.1,3.12);
  [-.6,-.3,0,.3,.6].forEach((x,i)=>ball(pult,.075,basis([0xff6a4a,0xffd23a,0x70f0ff,0x6af08a,0xff8ad0][i]),x,1.9,3.2,1,1,.55));
  verschmelze(pult);
  /* Countdown-Lichter rund um das Fenster */
  const NL=12, fensterLichter=[];
  for(let i=0;i<NL;i++){ const a=Math.PI/2-i/NL*6.283, m=basis(0x34405a); ball(innen,.095,m,Math.cos(a)*(FR+.07),FY+Math.sin(a)*(FR+.07),3.22,1,1,.6); fensterLichter.push(m); }

  /* Bordroboter am kleinen Fenster: sieht aus wie der Bordroboter in den Räumen */
  const robo=gruppe(innen,0,5.2,1.93), rk=gruppe(robo,0,0,0), RF=0xffe2b0;
  robo.scale.set(1.07,1.07,.7);
  ball(rk,.3,RF,0,0,0,1,.85,.95); box(rk,.4,.2,.08,DUNKEL,0,.02,.25);
  rohr(rk,.2,.24,.16,RF,0,-.3,0); ball(rk,.07,0x38d0d0,0,-.31,.23);
  [-1,1].forEach(s=>{ ball(rk,.05,basis(0x70f0ff),s*.1,.03,.3); ball(rk,.08,ORANGE,s*.31,-.22,.14); });
  strich(rk,[0,.22,0],[0,.38,0],.02,GRAUBLAU);
  verschmelze(rk);
  const piepLampe=basis(0xff6a4a); ball(robo,.06,piepLampe,0,.41,0);
  const piepMat=basis(0x8af8ff,{transparent:true,opacity:0,depthWrite:false});
  const piepBogen=[]; [-1,1].forEach(s=>{ for(let i=0;i<2;i++){ const t=new THREE.Mesh(new THREE.TorusGeometry(.76+i*.26,.035,6,16,1.1),piepMat); t.position.set(0,5.25,1.9); t.rotation.z=(s>0?0:Math.PI)-.55; innen.add(t); piepBogen.push(t); } });

  /* Figur im großen Fenster (Beine und Bodenschatten ausgeblendet) */
  const u=figur.userData;
  figur.children.forEach(c=>{ if(c!==u.koerper) c.visible=false; });
  u.beinL.visible=false; u.beinR.visible=false;
  figur.position.set(0,.82,2.68); figur.scale.set(1.5,1.5,1); figur.rotation.y=0; innen.add(figur);
  const kabinenLicht=new THREE.PointLight(0xffe8c0,.35,4.5,1.5); kabinenLicht.position.set(-.6,4,3.6); innen.add(kabinenLicht);

  /* ---------- Triebwerk ---------- */
  const flamme=gruppe(innen,0,.4,0); flamme.name='flamme';
  const flMat=(f,d)=>basis(f,{transparent:true,opacity:d,depthWrite:false,blending:THREE.AdditiveBlending});
  [[.98,3,0xff5a18,.75],[.7,2.3,0xffb020,.85],[.42,1.5,0xfff2b0,.95]].forEach(p=>{ const t=new THREE.Mesh(new THREE.ConeGeometry(p[0],p[1],20,1,true),flMat(p[2],p[3])); t.rotation.x=Math.PI; t.position.y=-p[1]/2; flamme.add(t); });
  const flGlut=schein(innen,'rgba(255,160,50,.9)',0,0,.2,3);
  const flLicht=new THREE.PointLight(0xff9a30,0,14,1.5); flLicht.position.set(0,-.1,1.6); innen.add(flLicht);
  flamme.visible=false; flGlut.visible=false;

  /* Staub beim Start */
  const staubMat=basis(0xd4d0d8,{transparent:true,opacity:0,depthWrite:false});
  const staub=[]; for(let i=0;i<34;i++){ const m=new THREE.Mesh(GEO.sph,staubMat); m.visible=false; mond.add(m); staub.push({ m, a:i*2.39996, p:(i*.137)%1, v:.7+zufall()*.6 }); }

  /* ---------- Die große Erde (wird passend zum Bildausschnitt gesetzt) ---------- */
  const erdBild=bild(1024,512,g=>{ g.fillStyle='#2a72d4'; g.fillRect(0,0,1024,512);
    /* Fleck mit zerklüftetem Umriss (Buchten und Halbinseln), läuft rechts und links nahtlos weiter */
    const klecks=(x,y,rx,ry,farbe)=>{ const f1=zufall()*6.28, f2=zufall()*6.28, f3=zufall()*6.28, P=[];
      for(let i=0;i<56;i++){ const w=i/56*6.2832, r=1+Math.sin(w*2+f1)*.28+Math.sin(w*5+f2)*.2+Math.sin(w*11+f3)*.1+(zufall()-.5)*.24; P.push([x+Math.cos(w)*rx*r,y+Math.sin(w)*ry*r]); }
      g.fillStyle=farbe; [-1024,0,1024].forEach(v=>{ g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0]+v,p[1]):g.moveTo(p[0]+v,p[1])); g.closePath(); g.fill(); }); };
    for(let i=0;i<14;i++) klecks((i*173)%1024,60+(i*97)%390,60,28,'#2f7edc');
    /* sechs Erdteile aus mehreren überlappenden Stücken, mit Küstensaum, Wäldern, Wüste und Inseln */
    [[170,170],[250,330],[540,150],[610,300],[830,180],[960,360]].forEach((c,j)=>{
      const stuecke=[0,1,2,3].map(i=>[c[0]+(zufall()-.5)*120,c[1]+(i-1.5)*26+(zufall()-.5)*30,28+zufall()*46,18+zufall()*30]);
      stuecke.forEach(q=>klecks(q[0],q[1],q[2]*1.12,q[3]*1.14,'#5cb4e8'));
      stuecke.forEach(q=>klecks(q[0],q[1],q[2],q[3],j%2?'#55b650':'#4caa4e'));
      klecks(stuecke[1][0],stuecke[1][1],stuecke[1][2]*.5,stuecke[1][3]*.45,'#2f8a40');
      klecks(stuecke[2][0]+10,stuecke[2][1],stuecke[2][2]*.42,stuecke[2][3]*.4,j%3?'#cdb86c':'#7cc860');
      for(let i=0;i<5;i++) klecks(c[0]+(zufall()-.5)*230,c[1]+(zufall()-.5)*170,4+zufall()*9,3+zufall()*6,'#55b650'); });
    /* Wolkenbänder aus vielen kleinen, durchscheinenden Tupfen */
    g.fillStyle='rgba(255,255,255,.3)';
    for(let i=0;i<26;i++){ let x=(i*229)%1024, y=44+(i*139)%424; for(let j=0;j<16;j++){ const rr=4+Math.sin(j/15*3.14)*9+zufall()*4; [-1024,0,1024].forEach(v=>{ g.beginPath(); g.arc(x+v,y,rr,0,6.284); g.fill(); }); x+=7+zufall()*4; y+=Math.sin(j*.45+i)*3.2; } }
    /* Eiskappen */
    g.fillStyle='#f4faff'; g.fillRect(0,0,1024,22); g.fillRect(0,490,1024,22); for(let i=0;i<16;i++){ klecks(i*64,22,44,9,'#f4faff'); klecks(i*64+30,490,44,9,'#f4faff'); } });
  const erde=gruppe(sc,0,0,0); erde.name='erde';
  const kugel=new THREE.Mesh(new THREE.SphereGeometry(1,56,40),new THREE.MeshLambertMaterial({map:erdBild,emissive:0xffffff,emissiveMap:erdBild,emissiveIntensity:.1})); erde.add(kugel);
  const hofBild=bild(256,256,g=>{ const v=g.createRadialGradient(128,128,0,128,128,128); v.addColorStop(0,'rgba(90,180,255,.9)'); v.addColorStop(.7,'rgba(110,200,255,.8)'); v.addColorStop(.8,'rgba(90,170,255,.3)'); v.addColorStop(1,'rgba(60,120,255,0)'); g.fillStyle=v; g.fillRect(0,0,256,256); });
  const hof=new THREE.Sprite(new THREE.SpriteMaterial({map:hofBild,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); hof.scale.set(2.8,2.8,1); erde.add(hof);

  /* ---------- Abschiedskuppe: kommt am Ende unten links ins Bild ---------- */
  const abschied=gruppe(sc,0,-50,0); abschied.name='abschied'; abschied.visible=false;
  const kuppe=gruppe(abschied,0,0,0);
  ball(kuppe,2.3,0x9a9aa6,0,-1.2,-.2,1.25,.55,.8);
  [[-1.5,-.28,1.1,.34],[1.6,-.35,1,.28],[.5,-.65,1.5,.22]].forEach(p=>{ const r=ring(kuppe,p[3],p[3]*.2,0x77778a,p[0],p[1],p[2]); r.rotation.x=-1; r.scale.z=.4; });
  teil(kuppe,brocken,mat(0x84848f),-2,-.2,.2,.4,.32,.35); teil(kuppe,brocken,mat(0xa6a6b2),2.1,-.35,.3,.3,.25,.3);
  verschmelze(kuppe); ohneSchatten(kuppe);
  const wesen2=mondwesen(abschied); wesen2.g.position.set(0,-.02,.2); wesen2.g.rotation.y=.3; ohneSchatten(wesen2.g);

  /* ---------- Funken, Konfetti, Sterne ---------- */
  const BUNT=[0xff4a5a,0x4aa8ff,0x4cf07a,0xffd22a,0xd06aff,0x50f0f0,0xff9a2a];
  const viele=(geo,m,n,farben)=>{ const t=new THREE.InstancedMesh(geo,m,n); for(let i=0;i<n;i++) t.setColorAt(i,new THREE.Color(farben[i%farben.length])); t.frustumCulled=false; t.visible=false; sc.add(t); return t; };
  const NF=150, funken=viele(new THREE.OctahedronGeometry(1,0),basis(0xffffff),NF,BUNT), fd=[];
  for(let i=0;i<NF;i++) fd.push({ p:zufall(), x:zufall()-.5, y:zufall()-.5, z:zufall()-.5, g:.07+zufall()*.1 });
  const NK=170, konf=viele(GEO.box,basis(0xffffff),NK,BUNT), kd=[];
  for(let i=0;i<NK;i++) kd.push({ x:zufall()*2-1, y:zufall()*2.4, z:-3+zufall()*5.4, v:.14+zufall()*.18, p:zufall()*6 });
  const form=new THREE.Shape(); for(let i=0;i<10;i++){ const a=Math.PI/2+i*Math.PI/5, r=i%2?.45:1; i?form.lineTo(Math.cos(a)*r,Math.sin(a)*r):form.moveTo(Math.cos(a)*r,Math.sin(a)*r); }
  const NT=22, zacken=viele(new THREE.ShapeGeometry(form),basis(0xffffff,{side:THREE.DoubleSide}),NT,[0xffd83a,0xfff2a0,0xffb030,0xff8ad0,0x8af0ff]), td=[];
  /* Sterne bleiben seitlich, damit Fenster und Figur frei sind */
  for(let i=0;i<NT;i++){ const s=i%2?-1:1; td.push({ x:s*(.4+zufall()*.56), y:-.8+((i*.618)%1)*1.68, z:-2+zufall()*2.4, p:i*1.9, g:.2+zufall()*.2 }); }

  /* ---------- Flugbahn (Fußpunkt der Kapsel) ---------- */
  const flug=t=>weich((t-3.15)/3.9);
  const ort=t=>{ const v=flug(t), w=1-v, b=i=>[[0,0,0],[0,10,0],[5,18,-1],[13,17,-2]].reduce((s,p,j)=>s+p[i]*[w*w*w,3*w*w*v,3*w*v*v,v*v*v][j],0); return [b(0),b(1),b(2)]; };
  /* Blickrichtung der Kamera: leicht von oben */
  const NEIG=.1, CN=Math.cos(NEIG), SN=Math.sin(NEIG);

  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const v=flug(t), start=t>=3, ruhe=weich((t-6.4)/1.2);

    /* Kapsel: zittern beim Zünden, Bogenflug, am Ende sanft schweben */
    const p=ort(t), zittern=start&&t<3.9?Math.sin(t*61)*.05*(1-(t-3)/.9):0;
    const kx=p[0]+zittern+Math.sin(t*.8)*.12*ruhe, ky=p[1]+3.3+Math.sin(t*1.4)*.17*ruhe, kz=p[2];
    kapsel.position.set(kx,ky,kz);
    kapsel.rotation.set(0,Math.sin(t*.55)*.1*ruhe,-Math.sin(v*Math.PI)*.36-.07*v+Math.sin(t*.9)*.035*ruhe);

    /* Lichter-Countdown */
    lampen.forEach((l,i)=>{ const an=start?(i===2&&Math.floor(t*5)%2===0):t>=i&&t<3; const gruen=start&&i===2; l.m.color.setHex(an||gruen?l.an:l.aus); l.s.visible=an||gruen; const g=1.5+Math.sin(t*9)*.2; l.s.scale.set(g,g,1); });
    fensterLichter.forEach((m,i)=>{ if(!start) m.color.setHex(i<Math.floor(t/3*NL)+1?(t<1?0xff5a4a:t<2?0xffd22a:0x4cf06a):0x34405a); else m.color.setHex(BUNT[(i+Math.floor(t*6))%BUNT.length]); });
    randlichter.forEach((m,i)=>m.visible=start||((Math.floor(t*3)+i)%2===0));

    /* Figur winkt, ab dem Flug jubelt sie mit beiden Armen */
    const jubel=weich((t-5.3)/.6);
    u.armR.rotation.z=2.4+Math.sin(t*7.5)*.38;
    u.armL.rotation.z=misch(-.25,-2.35+Math.sin(t*7.5+1.6)*.35,jubel);
    u.armR.rotation.x=0; u.armL.rotation.x=0;
    u.koerper.position.y=Math.abs(Math.sin(t*4))*.05; u.koerper.rotation.z=Math.sin(t*2.2)*.04;

    /* Bordroboter hüpft und piepst */
    const piep=t>2.9 ? (t*1.6)%1 : (t%1);
    robo.position.y=5.2+(start?Math.abs(Math.sin(t*6))*.04:0); robo.rotation.z=Math.sin(t*3.2)*.13;
    piepLampe.color.setHex(piep<.4?0xfff08a:0xff6a4a);
    piepMat.opacity=t>5.5&&piep<.6?.9*(1-piep/.6):0; piepBogen.forEach(b=>b.visible=piepMat.opacity>.02);

    /* Triebwerk */
    flamme.visible=start; flGlut.visible=start;
    if(start){ const an=weich((t-3)/.4), kraft=misch(1,.5,ruhe), fl=1+Math.sin(t*41)*.1+Math.sin(t*27)*.08;
      flamme.scale.set(an*misch(1,.75,ruhe),an*kraft*fl*1.05,an*misch(1,.75,ruhe)); const g=(2.4+Math.sin(t*33)*.3)*an*misch(1,.7,ruhe); flGlut.scale.set(g,g,1); flLicht.intensity=an*kraft*1.1*fl; }

    /* Staub wirbelt nach allen Seiten */
    const st=t-3; staubMat.opacity=st<0?0:Math.min(1,st*3)*Math.max(0,1-(st-1.3)/1.9)*.7;
    staub.forEach(s=>{ s.m.visible=staubMat.opacity>.02; if(!s.m.visible) return; const a=Math.max(0,st-s.p*.8), r=1.2+Math.sqrt(a)*4.2*s.v, g=.2+Math.min(1.5,a)*.55*s.v; s.m.position.set(Math.cos(s.a)*r,.2+Math.min(1,a)*s.p*1.5,Math.sin(s.a)*r*.7); s.m.scale.set(g,g*.65,g); });
    mond.position.y=-60*weich((t-4.3)/2.6); mond.visible=t<6.9;

    /* ---------- Kamera: erst Landeplatz, dann der Kapsel folgen ---------- */
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180);
    const dA=Math.max(11.2,(a<1.1?7.9:6.6)/(tn*a)), dE=Math.max(4.9/tn,4/(tn*a));
    const nah=weich((t-3.4)/3.6), d=misch(dA,dE,nah)+Math.sin(v*Math.PI)*1.6, halbH=d*tn, halbB=halbH*a;
    /* gewünschte Lage der Kapsel im Bild (-1 bis 1) */
    const bogen=Math.sin(v*Math.PI), endX=a>2?-.1:(a>1.1?.02:.12), endY=a<1.1?.18:.07;
    const bx=endX*v-bogen*.2, by=misch(.02,endY,v)+bogen*.07;
    const folge=weich((t-3.2)/1.1), fx=kx-bx*halbB, fy=ky-by*halbH*CN;
    const zx=misch(0,fx,folge), zy=misch(3.45,fy,folge), zz=misch(0,kz,folge);
    const wippen=Math.sin(t*.25)*.35*ruhe;
    kamera.position.set(zx+wippen,zy+d*SN,zz+d*CN); kamera.lookAt(zx,zy,zz);

    /* Punkt im Bild: x,y in Bildhälften, tief = Abstand von der Kamera */
    const imBild=(x,y,tief)=>[zx+wippen*(1-tief/d)+x*tief*tn*a, zy+d*SN-tief*SN+y*tief*tn*CN, zz+d*CN-tief*CN-y*tief*tn*SN];

    /* Erde: erst klein am Himmel, dann riesig hinter der Kapsel */
    const TIEF=55, gross=weich((t-3.5)/3.6);
    const eR=misch(Math.min(.27,a*.22),Math.min(.98,a*.9),gross), ex=misch(a>2?.52:.55,a>2?.07:.24,gross), ey=misch(a<1.1?.66:.64,a<1.1?.12:-.04,gross);
    const e=imBild(ex,ey,TIEF); erde.position.set(e[0],e[1],e[2]); const er=eR*TIEF*tn; erde.scale.set(er,er,er);
    kugel.rotation.y=-1.2+t*.05; kugel.rotation.z=.18;

    /* Abschiedskuppe mit Mondwesen unten links */
    const da=weich((t-6.1)/1.3);
    abschied.visible=t>6.1;
    if(abschied.visible){ const gr=a>2?Math.min(halbH*.19,halbB*.15):Math.min(halbH*.14,halbB*.12), q=imBild(a>2?-.66:-.81,misch(-1.9,a>2?-.7:-.86,da),d-.5); abschied.position.set(q[0],q[1]+Math.sin(t*1.7)*.06,q[2]); const s=gr*(d-.5)/d; abschied.scale.set(s,s,s); }
    const wink=Math.sin(t*7)*.4;
    wesen.arm.rotation.x=wink; wesen2.arm.rotation.x=wink;
    wesen.g.position.y=t<6?Math.abs(Math.sin(t*3.4))*.22:0; wesen2.g.position.y=-.02+Math.abs(Math.sin(t*3.4))*.16;

    /* bunte Funken hinter der Düse */
    funken.visible=t>3.1;
    if(funken.visible){ fd.forEach((f,i)=>{ const alter=(t*.75+f.p)%1*1.5, wann=t-alter*.55, q=ort(wann), s=wann<3.1?0:f.g*(1-alter/1.6)*(1+Math.sin(t*19+i)*.35);
        o.position.set(q[0]+f.x*(1.2+alter*3.4),q[1]+.1-alter*misch(2.3,1.5,ruhe)+f.y*.8,q[2]+f.z*(1+alter*2)+.3); o.rotation.set(t*4+i,t*3,0); o.scale.set(s,s*1.5,s); o.updateMatrix(); funken.setMatrixAt(i,o.matrix); }); funken.instanceMatrix.needsUpdate=true; }
    /* Konfetti und goldene Sterne ab 5,5 s */
    konf.visible=t>5.5; zacken.visible=t>5.5;
    if(konf.visible){ const seit=t-5.5;
      kd.forEach((c,i)=>{ let y=1.15+c.y-seit*c.v*2.2; if(y<-1.2) y=1.15+((y+1.2)%2.4); const q=imBild(c.x+Math.sin(t*1.6+c.p)*.03,y,d-c.z); o.position.set(q[0],q[1],q[2]); o.rotation.set(t*3+c.p,t*2+c.p,c.p); const s=halbH/4.6; o.scale.set(.13*s,.025*s,.09*s); o.updateMatrix(); konf.setMatrixAt(i,o.matrix); });
      konf.instanceMatrix.needsUpdate=true;
      td.forEach((c,i)=>{ const q=imBild(c.x,c.y+Math.sin(t*.9+c.p)*.04,d-c.z), s=c.g*(halbH/4.6)*weich(seit/.8-(i%6)*.12)*(.8+Math.sin(t*3.3+c.p)*.28); o.position.set(q[0],q[1],q[2]); o.rotation.set(0,Math.sin(t*1.3+c.p)*.6,t*.7+c.p); o.scale.set(s,s,s); o.updateMatrix(); zacken.setMatrixAt(i,o.matrix); });
      zacken.instanceMatrix.needsUpdate=true; }
    glitzer.forEach(g=>{ const s=.35+Math.pow(Math.max(0,Math.sin(t*2.2+g.p)),4)*1.6; g.s.scale.set(s,s,1); });
  };
};

