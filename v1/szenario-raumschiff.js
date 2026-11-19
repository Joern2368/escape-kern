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
function bullauge(x,y,r){let s=`${C(x,y,r+16,'#8a96a4',L)}${C(x,y,r,'#0d1838','stroke="#4a5866" stroke-width="5"')}${sterne(x-r*.6,y-r*.6,r*1.2,r*1.2,10)}${C(x+r*.35,y+r*.3,r*.22,'#f0a860')}`;for(let k=0;k<8;k++)s+=`${C(Math.round(x+Math.cos(k*.785)*(r+8)),Math.round(y+Math.sin(k*.785)*(r+8)),3,'#4a5866')}`;return s;}
function kojen(x){let s=`${R(x,120,300,340,16,'#1a2a48',L)}`;for(const y of[150,300])s+=`${R(x+14,y+70,272,40,8,'#e8eef8')}${R(x+90,y+60,196,40,10,'#5a8ad0')}${R(x+22,y+48,60,28,10,'#fff')}${C(x+260,y+18,8,'#ffe680')}${R(x,y+110,300,10,0,'#8a96a4')}`;return s;}
function pultreihe(x,w){let s=`<path d="M${x} 470V410L${x+20} 380H${x+w-20}L${x+w} 410V470Z" fill="#2a5a6a" ${L}/>`;for(let k=0;x+30+k*36<x+w-20;k++)s+=`${C(x+30+k*36,395,6,['#5ff0ff','#ffcf4a','#ff7a6a','#7ad06a'][k%4])}`;return s;}
function roehre(x){return`${R(x-34,90,68,350,34,'#c8f0d8','fill-opacity=".6" stroke="#8ab8a0" stroke-width="4"')}<path d="M${x} 430V200" stroke="#2f8a4a" stroke-width="5"/><path d="M${x} 380Q${x-30} 360 ${x-26} 330Q${x} 340 ${x} 380M${x} 320Q${x+30} 300 ${x+26} 270Q${x} 280 ${x} 320M${x} 260Q${x-26} 240 ${x-20} 214Q${x} 222 ${x} 260" stroke="#2f8a4a" stroke-width="3" fill="#5ab46a"/>${C(x,194,13,'#ff8ab0',L2)}${C(x,194,5,'#ffe680')}${R(x-40,80,80,16,5,'#8a96a4')}${R(x-40,430,80,22,5,'#8a96a4')}${R(x-20,110,8,280,4,'#fff','opacity=".5"')}`;}
function rohre(xs){let s=`<path d="M0 72H1600M0 104H1600${xs.map(x=>`M${x} 72V470`).join('')}" stroke="#c87a3a" stroke-width="18" fill="none"/>`;for(let x=60;x<1600;x+=220)s+=`${R(x,60,16,56,3,'#8a4a24')}`;for(const x of xs)s+=`${R(x-14,260,28,14,3,'#8a4a24')}`;return s;}
function kern(x){return`<defs><linearGradient id="kernG" x1="0" x2="1"><stop offset="0" stop-color="#ff7a20"/><stop offset=".5" stop-color="#fff0a0"/><stop offset="1" stop-color="#ff7a20"/></linearGradient></defs><circle cx="${x}" cy="260" r="280" fill="url(#licht)"><animate attributeName="opacity" values=".6;1;.6" dur="2.4s" repeatCount="indefinite"/></circle>${R(x-50,80,100,340,0,'url(#kernG)')}${[130,200,270,340].map(y=>`${R(x-58,y,116,12,4,'#3a3f48')}`).join('')}${R(x-30,90,12,320,6,'#fff','opacity=".45"')}${R(x-80,40,160,40,0,'#3a3f48',L)}${R(x-80,420,160,50,0,'#3a3f48',L)}`;}
const kapsel=()=>`<path d="M-60 0L-84 30M60 0L84 30" stroke="#8a96a4" stroke-width="6" stroke-linecap="round"/><path d="M-70 0L-46 -150Q0 -190 46 -150L70 0Z" fill="#eef1f5" ${L}/><path d="M-62 -50H62" stroke="#e8a030" stroke-width="10"/><circle cy="-100" r="22" fill="#2a4a8a" stroke="#8a96a4" stroke-width="6"/><path d="M-10 -110Q-4 -116 4 -114" stroke="#fff" stroke-width="4" stroke-linecap="round"/>${R(-14,-186,28,14,4,'#8a96a4',L)}${R(-76,-8,152,16,6,'#c0503a',L)}`;
const spind=()=>`${schatten(46,4)}${R(-42,-152,84,150,5,'#7a9cc8',L)}<path d="M0 -150V-4M-32 -134H-10M-32 -126H-10M-32 -118H-10M10 -134H32M10 -126H32M10 -118H32" stroke="#3a5070" stroke-width="3"/>${R(-12,-84,6,20,3,'#e8eef8')}${R(6,-84,6,20,3,'#e8eef8')}<use href="#sym-stern" x="-34" y="-60" width="22" height="22" color="#ffcf4a"/>${C(24,-48,9,'#ff8ab0')}`;
const helm=()=>`${schatten(44,4)}<path d="M32 -88L44 -108" stroke="#8a96a4" stroke-width="4"/>${C(44,-110,6,'#ff7a6a')}${R(-36,-16,72,16,6,'#8a96a4',L)}<circle cy="-56" r="42" fill="#f2f4f8" ${L}/><path d="M-30 -62Q0 -88 30 -62Q30 -34 0 -32Q-30 -34 -30 -62Z" fill="#2a4a8a" ${L}/><path d="M-18 -68Q-8 -76 4 -74" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>`;
const nachttisch=()=>`${schatten(42,4)}${R(-38,-62,76,60,6,'#5a7aa8',L)}<path d="M-38 -32H38" ${L}/><circle cy="-47" r="4" fill="#e8eef8"/><circle cy="-17" r="4" fill="#e8eef8"/><path d="M-14 -66L-18 -62M14 -66L18 -62" ${L}/>${C(-16,-102,9,'#ffcf4a',L)}${C(16,-102,9,'#ffcf4a',L)}<circle cy="-86" r="22" fill="#ff8a3a" ${L}/><circle cy="-86" r="15" fill="#fff"/><path d="M0 -86V-97M0 -86L8 -82" stroke="#1e2a36" stroke-width="3" stroke-linecap="round"/>`;
const alien=()=>`${schatten(36,4)}<path d="M-14 -68L-22 -96M14 -68L22 -96" ${L}/>${C(-22,-98,7,'#ffcf4a',L)}${C(22,-98,7,'#ffcf4a',L)}<ellipse cx="-32" cy="-30" rx="9" ry="14" fill="#7ad06a" ${L}/><ellipse cx="32" cy="-30" rx="9" ry="14" fill="#7ad06a" ${L}/><ellipse cx="-14" cy="-4" rx="12" ry="6" fill="#5ab46a" ${L}/><ellipse cx="14" cy="-4" rx="12" ry="6" fill="#5ab46a" ${L}/><ellipse cy="-38" rx="32" ry="36" fill="#7ad06a" ${L}/><ellipse cy="-22" rx="16" ry="12" fill="#b8f0a8"/>${[[-13,-48,9],[13,-48,9],[0,-62,7]].map(([x,y,r])=>`${C(x,y,r,'#fff',L2)}${C(x+1,y+1,r*.45,'#1e2a36')}`).join('')}<path d="M-10 -30Q0 -20 10 -30" stroke="#1e2a36" stroke-width="3" fill="none" stroke-linecap="round"/>`;
const SB=[[-50,-30],[-20,-38],[8,-18],[40,-30],[56,6],[20,22],[-30,20]];
const sternkarte=()=>`${R(-82,-62,164,124,6,'#16224a','stroke="#c8d4e8" stroke-width="5"')}${sterne(-70,-50,140,100,14)}<path d="M${SB.map(p=>p.join(' ')).join('L')}" stroke="#8fb8ff" stroke-width="2" fill="none"/>${SB.map(([x,y])=>`<use href="#sym-stern" x="${x-8}" y="${y-8}" width="16" height="16" color="#ffe680"/>`).join('')}${C(58,-40,10,'#f0a860')}${R(-40,40,80,12,4,'#c8d4e8')}`;
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
const pinnwand=()=>`${R(-80,-56,160,112,6,'#c89a5a','stroke="#7a5a30" stroke-width="6"')}${[[-48,-24,'#fff6a0'],[0,-20,'#a8e0ff'],[46,-26,'#ffc8d8'],[-26,22,'#c8f0b8'],[28,20,'#fff']].map(([x,y,c])=>`${R(x-20,y-16,40,32,0,c)}<path d="M${x-12} ${y}h24M${x-12} ${y+8}h16" stroke="#8a96a4" stroke-width="2"/>${C(x,y-11,4,'#e03a2a')}`).join('')}`;
const regal=()=>`${schatten(46,4)}${R(-44,-120,88,118,4,'#5a7aa8',L)}<path d="M-44 -62H44" ${L}/>${[0,58].map(r=>[0,1,2,3,4].map(k=>`${R(-38+k*15,-112+r+k%2*6,12,44-k%2*6,0,['#ff7a6a','#ffcf4a','#7ad06a','#5ff0ff','#f2f4f8'][(k+r)%5])}`).join('')).join('')}`;
const schlafsack=()=>`${schatten(56,4)}<rect x="30" y="-68" width="24" height="30" fill="#fff" ${L2} transform="rotate(14 42 -53)"/>${R(-54,-50,108,48,24,'#5ab46a',L)}<path d="M4 -50V-2M28 -50V-2" stroke="#ffcf4a" stroke-width="5"/>${C(-30,-26,22,'#7ad06a',L)}${C(-30,-26,11,'none','stroke="#2f8a4a" stroke-width="3"')}`;
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
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500;
let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`${C(x0+k*22,330,8,'#0b1620','stroke="#5ff0ff" stroke-width="2"')}`;
return`<defs><clipPath id="tuerclip"><rect x="410" y="180" width="180" height="290"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#8a96a4"/><stop offset=".5" stop-color="#c8d0da"/><stop offset="1" stop-color="#7a8694"/></linearGradient><pattern id="warn" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="24" height="24" fill="#f2c230"/><rect width="12" height="24" fill="#2a2a2a"/></pattern></defs>
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Schott mit Zahlenschloss">
   ${R(380,150,240,320,14,'url(#warn)','stroke="#1e2a36" stroke-width="5"')}
   ${R(398,168,204,302,6,'#3a4450')}
   ${R(410,180,180,290,0,'#05080c')}
   <g clip-path="url(#tuerclip)"><g id="platte">${R(410,180,180,290,0,'url(#platteG)')}<path d="M410 230H590M410 400H590M500 180V300M500 360V436" stroke="#5a6674" stroke-width="3"/>${R(410,436,180,34,0,'url(#warn)')}<use href="#sym-rakete" x="472" y="240" width="56" height="56" color="#2a4a8a"/>${R(500-n*11-12,312,n*22+24,36,6,'#0b1620','stroke="#5ff0ff" stroke-width="2"')}${d}</g></g>
   ${R(430,155,140,9,4,'#5ff0ff')}
  </g></g>`;
}
SZENARIEN.raumschiff={
name:"Das Raumschiff",
symbole:["planet","rakete","stern","komet","mond"],
symbolNamen:["Planet","Rakete","Stern","Komet","Mond"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true">${C(60,45,42,'#16224a')}${sterne(28,14,64,62,12)}${C(88,64,12,'#3fa0c8')}<path d="M80 60Q86 56 92 60Q90 68 84 66Z" fill="#7ad06a"/><use href="#sym-rakete" x="30" y="12" width="60" height="64" color="#ffcf4a"/></svg>`,
texte:{
einleitung:"Ihr gehört zur Crew des Forschungsraumschiffs Polaris. Ihr wacht in euren Schlafkabinen auf – doch etwas stimmt nicht: Der Bordcomputer hat sich verrechnet und alle Schotts verriegelt! An jedem Schott hängt ein Zahlenschloss. Untersucht die Gegenstände an Bord. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zur Landekapsel?",
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
geschafft:"Sicher gelandet!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst, die Landekapsel erreicht und seid sicher gelandet. Der Bordroboter piepst vor Freude!"
},
texteDu:{
einleitung:"Du gehörst zur Crew des Forschungsraumschiffs Polaris. Du wachst in deiner Schlafkabine auf – doch etwas stimmt nicht: Der Bordcomputer hat sich verrechnet und alle Schotts verriegelt! An jedem Schott hängt ein Zahlenschloss. Untersuche die Gegenstände an Bord. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zur Landekapsel?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Der Bordroboter blinkt rot … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad leuchtet ein Zeichen. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss piept – aber das Schott bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Landekapsel trotzdem noch erreichen!",
geschafft:"Sicher gelandet!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst, die Landekapsel erreicht und bist sicher gelandet. Der Bordroboter piepst vor Freude!"
},
einfach:{
name:"Das Raumschiff",
symbolNamen:["Planet","Rakete","Stern","Sternschnuppe","Mond"],
texte:{
einleitung:"Ihr seid in einem Raumschiff. Das Raumschiff fliegt durch das Weltall. Plötzlich gehen alle Türen zu! Der Computer hat sie zugesperrt. An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende wartet eine Kapsel. Mit der Kapsel fliegt ihr nach Hause. Schafft ihr es bis zur Kapsel?",
hinweisGeber:"Der kleine Roboter piepst:",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
geschafft:"Ihr seid zu Hause!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr seid mit der Kapsel gut gelandet!"
},
texteDu:{
einleitung:"Du bist in einem Raumschiff. Das Raumschiff fliegt durch das Weltall. Plötzlich gehen alle Türen zu! Der Computer hat sie zugesperrt. An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende wartet eine Kapsel. Mit der Kapsel fliegst du nach Hause. Schaffst du es bis zur Kapsel?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist zu Hause!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du bist mit der Kapsel gut gelandet!"
},
raeume:[
{titel:"Die Schlafräume",intro:"Hier schlaft ihr. Durch das runde Fenster seht ihr die Sterne. Hier sind die Zahlen für die erste Tür versteckt.",introDu:"Hier schläfst du. Durch das runde Fenster siehst du die Sterne. Hier sind die Zahlen für die erste Tür versteckt.",
objekte:[{name:"Schrank",fund:"Im Schrank liegt:"},{name:"Helm",fund:"Im Helm steckt:"},{name:"Tisch mit Wecker",fund:"Unter dem Wecker liegt:"},{name:"Kuscheltier",fund:"Das Kuscheltier hält etwas fest:"},{name:"Bild mit Sternen",fund:"Hinter dem Bild steckt:"}],
infoObjekte:[{name:"Pinnwand mit Zetteln",fund:"An der Pinnwand hängt ein Zettel:"},{name:"Schlafsack",fund:"Im Schlafsack steckt ein Zettel:"},{name:"Regal mit Büchern",fund:"In einem Buch steht:"}]},
{titel:"Der Steuer-Raum",intro:"Von hier lenkt man das Raumschiff. Durch das große Fenster seht ihr einen Planeten. Findet die Zahlen für die nächste Tür!",introDu:"Von hier lenkt man das Raumschiff. Durch das große Fenster siehst du einen Planeten. Finde die Zahlen für die nächste Tür!",
objekte:[{name:"Tisch mit Knöpfen",fund:"Auf dem Tisch blinkt:"},{name:"Sessel",fund:"Im Sessel steckt:"},{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Leuchtende Kugel",fund:"In der Kugel leuchtet:"},{name:"Funkgerät",fund:"Aus dem Funkgerät kommt eine Nachricht:"}],
infoObjekte:[{name:"Bildschirm mit Weg",fund:"Auf dem Bildschirm steht:"},{name:"Dickes Buch",fund:"In dem Buch steht:"},{name:"Tisch mit Karte",fund:"Auf der Karte steht:"}]},
{titel:"Der Forscher-Raum",intro:"Hier forschen die Leute vom Raumschiff. In Röhren aus Glas wachsen Pflanzen. Alles ist hell und sauber.",
objekte:[{name:"Mikroskop",fund:"Unter dem Mikroskop liegt:"},{name:"Gläser mit Farbe",fund:"In einem Glas schwimmt:"},{name:"Waage",fund:"Auf der Waage liegt:"},{name:"Kühlschrank",fund:"Im Kühlschrank liegt:"},{name:"Tafel",fund:"Auf der Tafel steht:"}],
infoObjekte:[{name:"Bild mit Planeten",fund:"Unter dem Bild steht:"},{name:"Topf mit Blume",fund:"Am Schild im Topf steht:"},{name:"Kiste mit Steinen",fund:"In der Kiste liegt ein Zettel:"}]},
{titel:"Der Motor-Raum",intro:"Hier ist der Motor vom Raumschiff. Der Motor leuchtet hell. Er brummt laut. Überall sind Rohre.",
objekte:[{name:"Rad am Rohr",fund:"Am Rad hängt:"},{name:"Wagen mit Werkzeug",fund:"In einer Schublade liegt:"},{name:"Tank",fund:"Am Tank klebt:"},{name:"Kleiner Roboter",fund:"Der Roboter zeigt:"},{name:"Kasten mit Schaltern",fund:"Im Kasten blinkt:"}],
infoObjekte:[{name:"Tafel mit Zeigern",fund:"Auf der Tafel steht:"},{name:"Große Batterie",fund:"An der Batterie klebt ein Zettel:"},{name:"Kiste mit Schrauben",fund:"In der Kiste liegt ein Zettel:"}]},
{titel:"Die Halle mit der Kapsel",intro:"Hier steht die Kapsel. Die Kapsel ist ein kleines Raumschiff. Damit fliegt ihr nach Hause. Öffnet das letzte Schloss!",introDu:"Hier steht die Kapsel. Die Kapsel ist ein kleines Raumschiff. Damit fliegst du nach Hause. Öffne das letzte Schloss!",
objekte:[{name:"Leiter",fund:"Oben auf der Leiter liegt:"},{name:"Stiefel",fund:"Im Stiefel steckt:"},{name:"Fallschirm",fund:"Im Fallschirm steckt:"},{name:"Ampel",fund:"Die Ampel leuchtet auf:"},{name:"Start-Knöpfe",fund:"Neben den Knöpfen leuchtet:"}],
infoObjekte:[{name:"Bildschirm",fund:"Auf dem Bildschirm steht:"},{name:"Raumanzug",fund:"In der Tasche steckt:"},{name:"Kiste mit Essen",fund:"In der Kiste liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Schlafkabinen",
intro:"Ihr wacht in den Schlafkabinen auf. Durch das kleine runde Fenster funkeln die Sterne. Das Schott ist verriegelt – irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
introDu:"Du wachst in deiner Schlafkabine auf. Durch das kleine runde Fenster funkeln die Sterne. Das Schott ist verriegelt – irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
tuerX:1350,
hintergrund:()=>`${defs('#3a4a6a','#161e30','#a8c8ff')}${wand('#3f5f8f','#2a4068','#a8c8ff')}${kojen(40)}${bullauge(560,200,70)}${boden()}${leuchte(800)}${leuchte(1350)}`,
objekte:[
{name:"Spind",x:450,boden:560,fuss:4,by:-175,zeichne:spind,fund:"Im Spind liegt:"},
{name:"Raumhelm",x:790,boden:680,fuss:4,by:-130,zeichne:helm,fund:"Im Helm steckt:"},
{name:"Nachttisch mit Wecker",x:1050,boden:590,fuss:4,by:-135,zeichne:nachttisch,fund:"Unter dem Wecker liegt:"},
{name:"Plüsch-Alien",x:250,boden:720,fuss:4,by:-125,zeichne:alien,fund:"Das Plüsch-Alien hält etwas fest:"},
{name:"Sternkarte",x:890,y:230,wand:true,by:-85,zeichne:sternkarte,fund:"Hinter der Sternkarte steckt:"}
],
infoObjekte:[{name:"Pinnwand",x:1110,y:240,wand:true,by:-80,zeichne:pinnwand,fund:"An der Pinnwand hängt ein Zettel:"},{name:"Schlafsack",x:1525,boden:600,fuss:4,by:-95,zeichne:schlafsack,fund:"Im Schlafsack steckt ein Zettel:"},{name:"Bücherregal",x:600,boden:745,fuss:4,by:-145,zeichne:regal,fund:"In einem Buch aus dem Regal steht:"}]},
{titel:"Die Kommandobrücke",
intro:"Auf der Kommandobrücke blinken Bildschirme und Pulte. Durch das große Panoramafenster seht ihr einen fremden Planeten. Von hier aus wird das Raumschiff gesteuert. Findet die Ziffern für das nächste Schott!",
introDu:"Auf der Kommandobrücke blinken Bildschirme und Pulte. Durch das große Panoramafenster siehst du einen fremden Planeten. Von hier aus wird das Raumschiff gesteuert. Finde die Ziffern für das nächste Schott!",
tuerX:800,
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
intro:"Im Labor wachsen Pflanzen in leuchtenden Glasröhren. Ein Mikroskop und viele Reagenzgläser stehen bereit. Hier erforscht die Crew fremde Welten.",
tuerX:220,
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
intro:"Im Maschinenraum brummt der Reaktor. Sein Kern leuchtet in einer hohen Säule. Rohre zischen leise, und überall blinken Lämpchen.",
tuerX:1350,
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
intro:"In der Andockbucht wartet die Landekapsel auf euch. Durch die große Luke seht ihr schon die Erde. Nur noch ein Schott trennt euch von der Heimreise – öffnet das letzte Schloss!",
introDu:"In der Andockbucht wartet die Landekapsel auf dich. Durch die große Luke siehst du schon die Erde. Nur noch ein Schott trennt dich von der Heimreise – öffne das letzte Schloss!",
tuerX:800,
hintergrund:()=>`${defs('#7a8088','#30343a','#e8eef8')}${wand('#7a828c','#4a525c','#e8eef8')}${R(1130,70,400,200,20,'#06102a','stroke="#3a4450" stroke-width="14"')}${sterne(1150,85,360,170,22)}${C(1450,200,40,'#3f8fd8')}<path d="M1424 186Q1440 172 1456 184Q1452 204 1434 206ZM1462 214Q1476 206 1484 218Q1474 232 1462 226Z" fill="#7ad06a"/><path d="M330 40V160" stroke="#4a525c" stroke-width="24"/>${R(290,150,80,22,6,'#e8b830',L)}<g transform="translate(330 470) scale(1.6)">${kapsel()}</g>${boden()}<path d="M0 560H1600" stroke="#e8b830" stroke-width="6" stroke-dasharray="40 30" opacity=".7"/>${leuchte(800)}${leuchte(1300)}`,
objekte:[
{name:"Kapselleiter",x:560,boden:600,fuss:4,by:-240,zeichne:leiter,fund:"Auf der obersten Stufe liegt:"},
{name:"Gravitationsstiefel",x:1000,boden:700,fuss:4,by:-105,zeichne:stiefel,fund:"In einem Stiefel steckt:"},
{name:"Fallschirm-Paket",x:1250,boden:600,fuss:4,by:-135,zeichne:fallschirm,fund:"Im Fallschirm-Paket steckt:"},
{name:"Startampel",x:1500,boden:560,fuss:4,by:-215,zeichne:ampel,fund:"Die Startampel leuchtet auf:"},
{name:"Kapselkonsole",x:1030,y:300,wand:true,by:-80,zeichne:konsole,fund:"Auf der Kapselkonsole leuchtet:"}
],
infoObjekte:[{name:"Infobildschirm",x:560,y:250,wand:true,by:-95,zeichne:bildschirm,fund:"Auf dem Bildschirm erscheint:"},{name:"Raumanzug",x:120,boden:720,fuss:4,by:-225,zeichne:anzug,fund:"In der Tasche des Raumanzugs steckt:"},{name:"Vorratskiste",x:1300,boden:745,fuss:4,by:-90,zeichne:kiste,fund:"In der Vorratskiste liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0e8"/><stop offset=".8" stop-color="#e8f4d8"/></linearGradient><pattern id="warn" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="24" height="24" fill="#f2c230"/><rect width="12" height="24" fill="#2a2a2a"/></pattern></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/>${C(300,150,80,'#fff6c8','opacity=".4"')}${C(300,150,50,'#fff6c8')}
   <g fill="#fff" opacity=".9"><ellipse cx="480" cy="120" rx="60" ry="18"/><ellipse cx="510" cy="106" rx="34" ry="18"/><ellipse cx="250" cy="260" rx="50" ry="14"/></g>
   <path d="M0 420Q200 360 420 400T1000 380V600H0Z" fill="#8cc06a"/><path d="M0 480Q300 440 600 490T1000 470V600H0Z" fill="#6aa04a"/>
   ${[[240,520,'#ff8ab0'],[330,550,'#ffcf4a'],[620,540,'#ff8ab0'],[420,500,'#fff']].map(([x,y,c])=>`<path d="M${x} ${y}V${y+20}" stroke="#2f8a4a" stroke-width="3"/>${C(x,y,7,c)}${C(x,y,3,'#e8a030')}`).join('')}
   <g transform="rotate(-8 700 330)"><path d="M590 220Q700 90 810 220Q783 206 755 220Q728 206 700 220Q673 206 645 220Q618 206 590 220Z" fill="#e8763a" stroke="#1e2a36" stroke-width="3"/><path d="M672 218Q680 160 700 156Q720 160 728 218Q714 208 700 220Q686 208 672 218Z" fill="#fff"/><path d="M590 220L690 345M645 220L695 345M755 220L705 345M810 220L710 345" stroke="#1e2a36" stroke-width="2" fill="none"/></g>
   <g transform="translate(700 470) rotate(-4) scale(.7)">${kapsel()}</g>
   <path d="M0 0H1000V600H0Z M180 600V110Q180 70 220 70H780Q820 70 820 110V600Z" fill="#2a3038" fill-rule="evenodd"/><path d="M180 600V110Q180 70 220 70H780Q820 70 820 110V600" stroke="url(#warn)" stroke-width="20" fill="none"/>${R(420,34,160,10,5,'#5ff0ff')}`
};
})();