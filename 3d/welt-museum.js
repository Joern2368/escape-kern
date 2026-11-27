document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-knochen\" viewBox=\"-20 -20 40 40\"><g transform=\"rotate(-35)\" fill=\"currentColor\"><rect x=\"-12\" y=\"-3.5\" width=\"24\" height=\"7\"/><circle cx=\"-13\" cy=\"-5\" r=\"5\"/><circle cx=\"-13\" cy=\"5\" r=\"5\"/><circle cx=\"13\" cy=\"-5\" r=\"5\"/><circle cx=\"13\" cy=\"5\" r=\"5\"/></g></symbol>\n<symbol id=\"sym-pinsel\" viewBox=\"-20 -20 40 40\"><g transform=\"rotate(40)\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M0 -18V0\" stroke-width=\"4.5\" fill=\"none\"/><path d=\"M-4 1H4V6H-4Z\" stroke-width=\"2\" fill=\"none\"/><path d=\"M-4 7H4Q5 15 0 19Q-5 15 -4 7Z\" fill=\"currentColor\" stroke-width=\"1.5\"/></g></symbol>\n<symbol id=\"sym-rahmen\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><rect x=\"-15\" y=\"-13\" width=\"30\" height=\"26\" stroke-width=\"3.5\"/><rect x=\"-9\" y=\"-7\" width=\"18\" height=\"14\" stroke-width=\"2\"/><path d=\"M-8 6L-2 -1L2 3L8 -4\" stroke-width=\"2\"/></g></symbol>\n<symbol id=\"sym-muenze\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\"><circle r=\"15\" stroke-width=\"3.5\"/><circle r=\"10\" stroke-width=\"1.5\"/></g><path d=\"M0 -7L2 -2L7 -2L3 1L4.5 6.5L0 3L-4.5 6.5L-3 1L-7 -2L-2 -2Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-lupe\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\"><circle cx=\"-4\" cy=\"-4\" r=\"10\" stroke-width=\"3.5\"/><path d=\"M4 4L15 15\" stroke-width=\"6\"/></g></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.32)"/>`;
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l||'#ffe2a0'}" stop-opacity=".5"/><stop offset="1" stop-color="${l||'#ffe2a0'}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const R=(x,y,w,h,f,s,sw,rx)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${s?` stroke="${s}" stroke-width="${sw||2}"`:''}${rx?` rx="${rx}"`:''}/>`;
const P=(d,f,s,sw)=>`<path d="${d}" fill="${f||'none'}"${s?` stroke="${s}" stroke-width="${sw||2}"`:''} stroke-linecap="round" stroke-linejoin="round"/>`;
const C=(x,y,r,f,s,sw)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${s?` stroke="${s}" stroke-width="${sw||2}"`:''}/>`;
const S=r=>schatten(r,4);
function steine(y0,y1,h,w,f){let d='';for(let y=y0,r=0;y<y1;y+=h,r++){d+=`M0 ${y}H1600`;for(let x=(r%2)*w/2;x<1600;x+=w)d+=`M${x} ${y}V${Math.min(y+h,y1)}`;}return`<path d="${d}" stroke="${f}" stroke-width="2" fill="none"/>`;}
function boden(f){let d='';for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return`<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="${d}" stroke="${f||'rgba(0,0,0,.22)'}" stroke-width="2"/>`;}
function decke(f,h){return R(0,0,1600,h||40,f);}
function saeule(x){return`${R(x-30,436,60,34,'#d8d0c0','#8a8270',3)}${R(x-22,92,44,344,'#ece6da','#8a8270',3)}${P(`M${x-10} 100V430M${x} 100V430M${x+10} 100V430`,0,'#c8c0ae',2)}${R(x-34,70,68,24,'#d8d0c0','#8a8270',3)}`;}
function lampe(x,l,f){return`${C(x,l+30,110,'url(#licht)')}${P(`M${x} 0V${l}`,0,'#222',3)}${P(`M${x-30} ${l+26}Q${x} ${l-12} ${x+30} ${l+26}Z`,f,'#222',2)}<ellipse cx="${x}" cy="${l+26}" rx="12" ry="5" fill="#fff3b0"/>`;}
function spot(x,y){return`<path d="M${x-8} 52L${x-90} ${y}H${x+90}L${x+8} 52Z" fill="#fff4cc" opacity=".13"/>${R(x-10,36,20,18,'#222',0,0,4)}`;}
function bild(w,h,innen){return`${R(-w/2-14,-h/2-14,w+28,h+28,'#d8a73a','#8a6420',4)}${R(-w/2-5,-h/2-5,w+10,h+10,'none','#f0cc6a',3)}<svg x="${-w/2}" y="${-h/2}" width="${w}" height="${h}" viewBox="0 0 100 100" preserveAspectRatio="none">${innen}</svg>`;}
const LAND=`${R(0,0,100,100,'#9fd0ec')}${C(76,24,10,'#fff0a0')}${P('M0 70Q30 40 60 62T100 54V100H0Z','#6aa04a')}${P('M0 84Q40 66 100 80V100H0Z','#3f7a3a')}${R(22,52,4,20,'#6b4a24')}${C(24,48,10,'#2f6a3a')}`;
const OBST=`${R(0,0,100,100,'#3a2a3a')}${R(0,70,100,30,'#6b4a24')}${P('M20 72Q50 90 80 72Z','#c9b07a')}${C(40,64,10,'#c83a2a')}${C(58,62,10,'#e8b830')}${C(50,52,9,'#6aa04a')}`;
const KOPF=`${R(0,0,100,100,'#2f4a5a')}${P('M15 100Q15 64 50 60Q85 64 85 100Z','#6a3a2a')}${C(50,40,18,'#e8c0a0')}${P('M32 38Q32 16 50 16Q68 16 68 38Q60 24 50 26Q40 24 32 38Z','#4a2a14')}`;
function vitrinenglas(x,y,w,h){return`${R(x,y,w,h,'#cfe8ef','#8aa8b0',3)}<path d="M${x+8} ${y+h-10}L${x+w/2} ${y+8}" stroke="#fff" stroke-width="4" opacity=".6"/>`;}
const kasse=()=>`${S(66)}${R(-62,-74,124,72,'#8a5a32','#3a2010',3)}${R(-68,-82,136,10,'#5a3418','#3a2010',2)}${R(-50,-60,100,24,'#a0703e')}<text x="0" y="-42" font-size="15" font-weight="bold" text-anchor="middle" fill="#f4ecd8" font-family="Arial,sans-serif">KASSE</text>${R(-34,-118,54,36,'#4a5a6a','#222',2,4)}${R(-28,-112,32,10,'#9fe0a0')}${[0,1,2].map(k=>C(-24+k*10,-94,3,'#ddd')).join('')}${R(8,-130,10,14,'#fff','#999',1)}${P('M30 -82L42 -96L54 -82Z','#d8a73a','#8a6420',2)}`;
const garderobe=()=>`${S(40)}${P('M-28 0L0 -12L28 0',0,'#5a3418',6)}${P('M0 -8V-172',0,'#5a3418',7)}${C(0,-176,7,'#5a3418')}${P('M0 -162L-24 -150M0 -162L24 -150',0,'#5a3418',5)}${P('M-24 -152Q-40 -110 -36 -66H-8Q-6 -110 -16 -152Z','#3f6aa0','#1f3a60',2)}${P('M-30 -120L-14 -118',0,'#1f3a60',2)}<ellipse cx="25" cy="-146" rx="17" ry="4" fill="#a33b22"/>${P('M14 -146Q14 -164 25 -164Q36 -164 36 -146Z','#a33b22','#6a1a1a',2)}${P('M18 -140Q14 -110 22 -92',0,'#e8c45a',6)}`;
const kordel=()=>`${S(72)}${[-54,54].map(x=>`<ellipse cx="${x}" cy="-2" rx="15" ry="5" fill="#b8862a"/>${P(`M${x} 0V-74`,0,'#c9a03a',7)}${C(x,-78,8,'#e0b84a','#8a6420',2)}`).join('')}${P('M-50 -68Q0 -22 50 -68',0,'#a32a2a',8)}`;
const schirme=()=>`${S(30)}${P('M-8 -58L-16 -118',0,'#222',3)}${P('M-16 -120Q-28 -96 -20 -64H-6Q-4 -96 -16 -120Z','#d8a73a','#8a6420',2)}${P('M8 -58V-124Q8 -134 17 -134Q26 -134 26 -124',0,'#6b3a1c',4)}${P('M2 -64Q-2 -94 8 -112Q18 -94 14 -64Z','#2a6aa0','#143a5a',2)}${R(-22,-62,44,60,'#4a6a5a','#1f3a2a',3,4)}<ellipse cx="0" cy="-62" rx="22" ry="5" fill="#2a3a30"/>`;
const plan=()=>`${R(-82,-62,164,124,'#f4ecd8','#3a4a5a',5)}<text x="0" y="-42" font-size="13" font-weight="bold" text-anchor="middle" fill="#3a4a5a" font-family="Arial,sans-serif">MUSEUMSPLAN</text>${[['#e8d8a8',-66,-30,44,40],['#8aa87a',-18,-30,44,40],['#c85a5a',30,-30,38,40],['#e8e4d8',-66,14,66,32],['#9aa2aa',4,14,64,32]].map(([f,x,y,w,h])=>R(x,y,w,h,f,'#3a4a5a',2)).join('')}${P('M-44 40V-8H48V36',0,'#a33b22',2)}${C(-44,40,5,'#a33b22')}`;
const BEIN='#ece4cc';
const skelett=()=>{let r='';for(let x=540;x<=680;x+=22){const y=290-(x-520)*.32,l=96-(x-540)*.35;r+=P(`M${x} ${y}Q${x+18} ${y+l/2} ${x-4} ${y+l}`,0,BEIN,7);}return`${C(560,300,380,'url(#licht)')}${P('M520 290V444M690 236V444',0,'#555',3)}${P('M500 296Q468 350 480 392L462 444H430',0,'#c8bea4',14)}${P('M270 400Q400 300 520 290Q620 282 690 236',0,BEIN,24)}<path d="M282 392Q400 300 520 290Q620 282 688 238" stroke="#8a8270" stroke-width="22" stroke-dasharray="3 11" fill="none"/>${r}${P('M690 236L740 206',0,BEIN,14)}${P('M650 270Q668 294 688 288',0,BEIN,6)}${P('M520 292Q566 340 524 384L550 444H590',0,BEIN,16)}${P('M726 188L800 180Q832 184 830 204L792 214L802 228L742 232Q720 214 726 188Z',BEIN,'#8a8270',4)}${C(752,198,7,'#2f3a34')}${P('M752 214l6 6l6 -6l6 6l6 -6l6 6',0,'#8a8270',2)}${R(240,444,620,26,'#26302c','#111',3)}${R(500,450,120,14,'#c9a03a')}`;};
const dinoei=()=>`${S(56)}<ellipse cx="0" cy="-72" rx="30" ry="40" fill="#e8e0c8" stroke="#8a7a5a" stroke-width="3"/>${[[-12,-90,6],[10,-78,8],[-8,-58,5],[14,-100,4]].map(([x,y,r])=>C(x,y,r,'#a8b890')).join('')}${P('M-8 -110L-2 -100L-10 -92L0 -84',0,'#6b5a3a',2)}${P('M-52 -6Q-56 -36 -36 -42Q0 -26 36 -42Q56 -36 52 -6Q0 8 -52 -6Z','#a8864a','#5a4220',3)}${P('M-44 -20l16 -10M-26 -12l18 -14M10 -24l20 8M28 -12l16 -14',0,'#5a4220',2)}`;
const stosszahn=()=>`${S(68)}${R(-62,-14,124,12,'#5a3418','#3a2010',2)}${P('M-36 -14V-46M36 -14V-62',0,'#5a3418',6)}${P('M-62 -40Q-24 -104 50 -98Q72 -96 68 -80Q18 -84 -50 -26Z','#f0e6c8','#8a7a5a',3)}${P('M-30 -60l8 10M0 -78l4 12M30 -86l2 12',0,'#c8bea4',2)}`;
const grabung=()=>`${S(72)}${R(-68,-42,136,40,'#8a6a3e','#3a2010',3)}${P('M-62 -42Q-30 -56 0 -48Q30 -58 62 -42Z','#e0c080','#a8864a',2)}<use href="#sym-knochen" x="-46" y="-66" width="40" height="40" color="#fafafa"/>${P('M30 -50L54 -100',0,'#6b3a1c',5)}${P('M20 -52L34 -44L30 -28L16 -36Z','#8a969e','#4a5258',2)}${P('M-60 -24H60',0,'#3a2010',2)}`;
const meteorit=()=>`${S(42)}${R(-34,-46,68,44,'#c8c0b0','#6a6458',3)}${R(-40,-54,80,10,'#b0a898','#6a6458',2)}${P('M-30 -54Q-36 -84 -10 -96Q18 -104 32 -82Q40 -62 28 -54Z','#4a4440','#222',3)}${C(-10,-76,5,'#2a2420')}${C(12,-68,4,'#2a2420')}${C(6,-88,3,'#2a2420')}${P('M-20 -88Q-14 -94 -4 -94',0,'#8a8078',3)}`;
const ammonit=()=>`${R(-72,-62,144,124,'#b8ad90','#6b5a3a',4,12)}${C(0,-4,43,'#d8cca8','#8a7a5a',2)}${P('M-40 -4A40 40 0 0 1 40 -4A35 35 0 0 1 -30 -4A27 27 0 0 1 24 -4A21 21 0 0 1 -18 -4A15 15 0 0 1 12 -4A9 9 0 0 1 -6 -4',0,'#6b5a3a',4)}${R(-24,46,48,10,'#e8e0c8','#6b5a3a',1)}`;
const sockel=(w,h,f,s)=>`${R(-w/2,-h-2,w,h,f,s,3)}${R(-w/2-6,-h-10,w+12,10,f,s,2)}`;
const skulptur=()=>`${S(42)}${sockel(64,48,'#e8e2d2','#8a8270')}${P('M10 -126Q30 -150 24 -174',0,'#9a9280',12)}${P('M10 -126Q30 -150 24 -174',0,'#f4f0e6',7)}${P('M-18 -60L-12 -130Q0 -136 12 -130L18 -60Z','#f4f0e6','#9a9280',2)}${P('M-6 -126L-10 -64M4 -120L6 -64',0,'#c8c0ae',2)}${C(0,-146,13,'#f4f0e6','#9a9280',2)}`;
const ruestung=()=>`${S(42)}${R(-36,-10,72,8,'#5a3418')}${R(-18,-84,14,76,'#b8c0c8','#4a5258',2)}${R(4,-84,14,76,'#b8c0c8','#4a5258',2)}${R(-38,-148,12,56,'#b8c0c8','#4a5258',2,6)}${R(26,-148,12,56,'#b8c0c8','#4a5258',2,6)}${P('M-28 -152H28L20 -84H-20Z','#c9d0d6','#4a5258',3)}${P('M-20 -100H20',0,'#6b3a1c',6)}${P('M-18 -154V-186Q-18 -202 0 -202Q18 -202 18 -186V-154Z','#c9d0d6','#4a5258',3)}${P('M-12 -180H12M-12 -172H12',0,'#222',3)}${P('M0 -202Q20 -224 32 -208Q16 -212 4 -200Z','#a32a2a')}`;
const vase=()=>`${S(36)}${R(-28,-24,56,22,'#3a2a20','#1a120a',2)}${P('M-14 -24Q-38 -52 -27 -92Q-19 -110 -13 -120H13Q19 -110 27 -92Q38 -52 14 -24Z','#2a5a9a','#142a4a',3)}${P('M-31 -72H31M-29 -62H29',0,'#f4ecd8',3)}${[-16,0,16].map(x=>C(x,-88,4,'#f4ecd8')).join('')}<ellipse cx="0" cy="-120" rx="16" ry="5" fill="#1a3a6a" stroke="#142a4a" stroke-width="2"/>`;
const goldrahmen=()=>`${S(58)}<g transform="rotate(-6 0 -4)">${R(-52,-144,104,140,'#d8a73a','#8a6420',4)}${R(-38,-130,76,112,'#5a1620','#8a6420',3)}${[[-45,-137],[45,-137],[-45,-11],[45,-11]].map(([x,y])=>C(x,y,6,'#f0cc6a','#8a6420',1)).join('')}</g>`;
const gemaelde=()=>bild(190,120,LAND);
const staffelei=()=>`${S(52)}${P('M-36 0L-6 -196M36 0L6 -196M0 -196V-10',0,'#8a5a2a',6)}${R(-48,-82,96,8,'#6b3a1c')}${R(-44,-170,88,90,'#f8f4ea','#8a7a5a',2)}${P('M-40 -166H40V-126Q10 -120 -40 -134Z','#9fd0ec')}${C(22,-148,9,'#fff0a0')}${P('M-40 -110Q-10 -132 20 -112',0,'#6aa04a',6)}${P('M-30 -98H10M-30 -90H-4',0,'#c8c0ae',2)}`;
const werktisch=()=>`${S(72)}${P('M-58 0V-62M58 0V-62',0,'#6b4a24',8)}${R(-72,-72,144,12,'#a0703e','#4a2a12',2)}${R(-56,-84,40,12,'#f4ecd8','#8a7a5a',1)}${P('M-10 -74L4 -86L16 -76L28 -84',0,'#a0522d',4)}${P('M44 -72V-124L14 -142',0,'#555',5)}${C(44,-72,6,'#333')}${C(0,-150,21,'#cfe8ef','#333',5)}${P('M-8 -160Q-2 -164 6 -162',0,'#fff',3)}`;
const palette=()=>`${S(42)}${P('M-28 0L-22 -50M28 0L22 -50',0,'#6b4a24',6)}${R(-34,-58,68,8,'#8a5a2a',0,0,3)}${P('M-42 -64Q-46 -90 -10 -94Q36 -98 42 -76Q44 -64 28 -64Q16 -64 14 -72Q10 -78 2 -72Q-4 -62 -42 -64Z','#d8b47a','#6b4a24',2)}${[[-28,-78,'#c83a2a'],[-12,-84,'#e8b830'],[6,-86,'#2a6aa0'],[24,-80,'#3f8a4a']].map(([x,y,f])=>C(x,y,6,f)).join('')}${P('M-6 -66L30 -108',0,'#8a5a2a',4)}${P('M30 -108L36 -116',0,'#222',5)}`;
const eimer=(x,y,f)=>`${P(`M${x-24} ${y-46}L${x-20} ${y}H${x+20}L${x+24} ${y-46}Z`,'#c9ccce','#5a646c',2)}${P(`M${x-24} ${y-46}H${x+24}V${y-38}Q${x+12} ${y-30} ${x+6} ${y-38}Q${x-6} ${y-24} ${x-12} ${y-38}H${x-24}Z`,f)}${P(`M${x-22} ${y-44}Q${x} ${y-74} ${x+22} ${y-44}`,0,'#5a646c',2)}`;
const farbeimer=()=>`${S(54)}${eimer(-24,0,'#2a6aa0')}${eimer(28,0,'#c83a2a')}${eimer(2,-48,'#e8b830')}`;
const pinnwand=()=>`${R(-82,-58,164,116,'#c9955a','#6b4a1c',5)}${[[-48,-18,-6,'#f8f4ea'],[0,-16,5,'#fff6c0'],[48,-14,-3,'#f8f4ea'],[-20,26,4,'#e8f0f8'],[34,28,-5,'#f8f4ea']].map(([x,y,w,f],k)=>`<g transform="rotate(${w} ${x} ${y})">${R(x-22,y-24,44,46,f,'#b8a888',1)}${k%2?C(x,y,10,'none','#8a7a5a',2):P(`M${x-14} ${y+10}Q${x} ${y-20} ${x+14} ${y+10}`,0,'#8a7a5a',2)}${C(x,y-22,4,'#c83a2a')}</g>`).join('')}`;
const schornstein=()=>`${S(46)}${R(-34,-170,68,168,'#a8553a','#5a2a1a',3)}${P('M-34 -130H34M-34 -90H34M-34 -50H34M-12 -170V-130M12 -130V-90M-12 -90V-50M12 -50V-8',0,'#5a2a1a',2)}${R(-42,-190,84,22,'#8a8a90','#4a4a52',3)}${R(-24,-210,16,22,'#c0704a','#5a2a1a',2)}${R(8,-210,16,22,'#c0704a','#5a2a1a',2)}`;
const wetterfahne=()=>`${S(22)}${R(-12,-10,24,10,'#4a4a52','#22222a',2)}${P('M0 -10V-230',0,'#3a3a42',6)}${P('M-26 -150H26M0 -170V-130',0,'#3a3a42',4)}${C(0,-232,7,'#d8a73a','#8a6420',2)}${P('M-50 -200H22V-212L50 -196L22 -180V-192H-50Z','#c9a03a','#6a4a1a',2)}`;
const regentonne=()=>`${S(54)}${R(-44,-92,88,92,'#7a5230','#3a2410',3,10)}${P('M-14 -92V0M14 -92V0',0,'#3a2410',3)}${P('M-44 -66H44M-44 -26H44',0,'#3a3a40',5)}<ellipse cx="0" cy="-92" rx="42" ry="10" fill="#7fc0e0" stroke="#3a2410" stroke-width="3"/>`;
const taubenschlag=()=>`${S(36)}${R(-6,-96,12,96,'#6a4a24','#3a2410',2)}${R(-48,-176,96,84,'#e8d8b8','#7a5a2a',3)}${P('M-58 -174L0 -222L58 -174Z','#a0402a','#5a1a0a',3)}${C(-16,-136,10,'#2a1a10')}${C(16,-136,10,'#2a1a10')}${R(-24,-122,16,4,'#7a5a2a')}${R(8,-122,16,4,'#7a5a2a')}<ellipse cx="-34" cy="-186" rx="13" ry="8" fill="#b8bcc8" stroke="#6a6a72" stroke-width="2"/>${C(-24,-194,5,'#b8bcc8','#6a6a72',2)}`;
const turmuhr=()=>`${C(0,0,52,'#f4ecd8','#5a3a1c',7)}${P('M0 -42V-34M0 42V34M-42 0H-34M42 0H34',0,'#333',3)}${P('M0 0V-30',0,'#222',4)}${P('M0 0L22 14',0,'#222',4)}${C(0,0,4,'#222')}`;
const bronzetafel=()=>`${R(-54,-68,108,136,'#b8864a','#6a4a1a',5,6)}${C(0,-38,16,'#d8a860','#6a4a1a',3)}${P('M0 -48V-28M-10 -38H10',0,'#6a4a1a',3)}${P('M-40 -8H40M-40 6H34M-40 20H40M-40 34H28M-40 48H38',0,'#6a4a1a',3)}${[[-46,-60],[46,-60],[-46,60],[46,60]].map(([x,y])=>C(x,y,3,'#6a4a1a')).join('')}`;
const stadtfernrohr=()=>`${S(46)}${P('M0 -84L-34 0M0 -84L34 0M0 -84V-4',0,'#5a5a62',6)}${P('M-44 -126L38 -104',0,'#3a4a8a',24)}${P('M-44 -126L38 -104',0,'#5a6ab0',16)}${C(42,-103,13,'#9fd8ff','#222',3)}${R(-22,-96,10,16,'#8a8a92','#333',2)}`;
const dachbeet=()=>`${S(70)}${R(-70,-40,140,40,'#8a5a32','#3a2010',3)}${R(-64,-52,128,14,'#4a3220','#2a1a10',2)}${[[-48,'#e0566b'],[-20,'#ffd34a'],[8,'#e87ab0'],[36,'#a07cf0']].map(([x,f],k)=>P(`M${x} -52V${-84-k*6}`,0,'#3f8a4a',4)+C(x,-88-k*6,11,f,'#6a3a3a',2)+C(x,-88-k*6,4,'#fff3b0')).join('')}`;
function ziegel(x0,x1,y0,y1,h,w,f){let d='';for(let y=y0,r=0;y<y1;y+=h,r++){d+=`M${x0} ${y}H${x1}`;for(let x=x0+(r%2)*w/2;x<x1;x+=w)d+=`M${x} ${y}V${Math.min(y+h,y1)}`;}return P(d,0,f,2);}
const infotafel=()=>`${R(-58,-72,116,144,'#f4f0e6','#3a4a5a',4,6)}${C(-30,-44,14,'#2a6aa0')}${R(-32,-42,4,13,'#fff')}${C(-30,-50,2.6,'#fff')}${P('M-8 -48H40M-8 -38H30M-42 -14H42M-42 -2H38M-42 10H42M-42 22H24',0,'#8a8a8a',3)}${R(-42,34,84,26,'#c8d8c0','#8a8a8a',1)}`;
const vitrine=()=>`${S(46)}${R(-40,-70,80,68,'#5a3418','#2a1608',3)}${R(-44,-78,88,10,'#6b4a24','#2a1608',2)}${P('M-10 -80Q-20 -100 -8 -118H8Q20 -100 10 -80Z','#c86a3a','#6a2a14',2)}${P('M-14 -100H14',0,'#2a1a10',2)}${vitrinenglas(-40,-150,80,72)}`.split('#cfe8ef').join('rgba(207,232,239,.3)');
const bank=()=>`${S(68)}${P('M-56 0V-32M56 0V-32',0,'#333',6)}${R(-68,-44,136,16,'#3a5a8a','#1a2a4a',3,6)}${P('M-58 -36H58',0,'#5a7aaa',2)}`;
const zeitleiste=()=>`${R(-80,-50,160,100,'#e8e0c8','#6b5a3a',4)}${P('M-66 22H66',0,'#6b5a3a',4)}${[-52,-18,18,52].map((x,k)=>R(x-14,-34,28,44,['#8aa87a','#c8a060','#7a9aa8','#b87a5a'][k])+P(`M${x} 12V22`,0,'#6b5a3a',2)).join('')}${P('M42 -10Q50 -26 62 -16L58 -8Z','#3f6a3a')}${P('M-60 36H-20M20 36H60',0,'#8a8a8a',3)}`;
const pult=()=>`${S(36)}${P('M0 -2V-66M-24 -2H24',0,'#5a3418',6)}${P('M-40 -62L40 -80L44 -70L-36 -52Z','#8a5a32','#3a2010',2)}${P('M-32 -64L0 -82L2 -72L-30 -56ZM2 -82L34 -86L36 -78L4 -72Z','#f4ecd8','#8a7a5a',2)}`;
const gestein=()=>`${S(54)}${R(-50,-104,100,102,'#6b4a24','#3a2010',3)}${P('M-46 -54H46',0,'#3a2010',4)}${[[-26,-64,'#8a8078'],[0,-63,'#c86a3a'],[26,-64,'#5a7a8a'],[-24,-13,'#d8c8a0'],[2,-14,'#6a6458'],[26,-13,'#a8b890']].map(([x,y,f])=>`<ellipse cx="${x}" cy="${y}" rx="11" ry="9" fill="${f}" stroke="#222" stroke-width="1.5"/>`).join('')}`;
const steckbrief=()=>`${R(-55,-65,110,130,'#f8f4ea','#d8a73a',4)}${R(-42,-52,40,48,'#2f4a5a')}${C(-22,-34,10,'#e8c0a0')}${P('M-36 -4Q-22 -26 -8 -4Z','#a32a4a')}${P('M6 -46H42M6 -34H36M6 -22H42M-42 10H42M-42 22H36M-42 34H42M-42 46H28',0,'#8a8a8a',3)}`;
const hoeren=()=>`${S(30)}${R(-20,-6,40,6,'#333')}${P('M0 -6V-112',0,'#555',6)}${R(-28,-150,56,40,'#2a2e36','#111',3,6)}${R(-22,-144,44,26,'#6ab0d8')}${P('M-14 -84Q-14 -104 0 -104Q14 -104 14 -84',0,'#222',4)}${R(-19,-90,9,14,'#c83a2a',0,0,3)}${R(10,-90,9,14,'#c83a2a',0,0,3)}`;
const katalog=()=>`${S(44)}${P('M-34 -2V-42M34 -2V-42',0,'#3a2010',5)}${R(-44,-50,88,10,'#5a1620','#2a0a10',2)}${R(-30,-64,60,14,'#d8a73a','#8a6420',2)}${R(-26,-78,52,14,'#2a5a9a','#142a4a',2)}${P('M-18 -71H18',0,'#f4ecd8',2)}`;
const anleitung=()=>`${R(-50,-66,100,132,'#a0703e','#4a2a12',3,6)}${R(-40,-54,80,112,'#fff','#b8a888',1)}${R(-18,-72,36,14,'#8a969e','#4a5258',2,3)}${[-34,-12,10,32].map(y=>C(-28,y,5,'none','#3f8a4a',2)+P(`M-16 ${y}H32`,0,'#8a8a8a',3)).join('')}`;
const regal=()=>`${S(56)}${R(-52,-150,104,148,'#8a5a2a','#3a2010',3)}${P('M-48 -78H48',0,'#3a2010',4)}${[-80,-6].map(b=>[0,1,2,3,4,5].map(k=>{const h=40-(k%3)*5;return R(-44+k*15,b-h,12,h,['#c83a2a','#2a6aa0','#e8b830','#3f8a4a','#8a4a8a','#d86a3a'][k],'#222',1);}).join('')).join('')}`;
const fundkiste=()=>`${S(56)}${P('M-20 -60L-14 -92H8L14 -60Z','#c86a3a','#6a2a14',2)}${C(28,-64,10,'#d8a73a','#8a6420',2)}${P('M-48 -54Q-30 -70 -12 -58Q2 -68 18 -58Q34 -70 48 -54Z','#e8d080','#a8864a',2)}${R(-52,-56,104,54,'#b8864a','#5a3418',3)}${P('M-52 -38H52M-52 -20H52',0,'#5a3418',2)}`;
const B=(name,x,boden,by,zeichne,fund)=>({name,x,boden,fuss:4,by,zeichne,fund});
const W=(name,x,y,by,zeichne,fund)=>({name,x,y,wand:true,by,zeichne,fund});
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#14201c" stroke="#d8a73a" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#14201c" stroke="#d8a73a" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen #rg{transform:scaleY(.1)}.tuer.offen #sg{transform:scaleX(.12)}.tuer.offen #gm{transform:scaleX(.16)}.tuer.offen #et{transform:scaleX(.14)}.tuer.offen #ku{transform:rotate(-80deg)}</style>`;
function tuerGitter(n){
let s='';for(let k=0;k<20;k++)s+=R(410,196+k*14,180,10,k%2?'#8a949c':'#a8b0b8','#4a5258',1);
return`<path d="M380 470V152H620V470Z" fill="#d8d0c0" stroke="#5a5248" stroke-width="5"/><path d="M364 154L500 96L636 154Z" fill="#ece6da" stroke="#5a5248" stroke-width="5"/>
   <rect x="410" y="182" width="180" height="288" fill="#1e2a24"/><circle cx="500" cy="400" r="110" fill="url(#licht)"/>${P('M430 470Q440 380 500 360Q560 380 570 470',0,'#9a9684',10)}
   <g id="rg" class="tb" style="transform-origin:500px 196px">${s}${sPl(n,330)}</g>
   <rect x="396" y="168" width="208" height="28" rx="4" fill="#5a646c" stroke="#22282e" stroke-width="3"/>`;
}
function tuerLift(n){
let g='';for(let k=0;k<6;k++){const y=190+k*46.7,z=y+46.7;g+=`M410 ${y}L455 ${z}L500 ${y}L545 ${z}L590 ${y}M410 ${z}L455 ${y}L500 ${z}L545 ${y}L590 ${z}`;}
return`<path d="M388 470V160H612V470Z" fill="#5a5a62" stroke="#22222a" stroke-width="5"/>
   <rect x="410" y="190" width="180" height="280" fill="#d8b070"/><path d="M410 330H590M410 400H590" stroke="#a8803c" stroke-width="3"/><rect x="410" y="300" width="180" height="8" fill="#8a5a2a"/><circle cx="500" cy="300" r="120" fill="url(#licht)"/><rect x="410" y="462" width="180" height="8" fill="#6a4a24"/>
   <g id="sg" class="tb" style="transform-origin:410px 330px"><path d="${g}" fill="none" stroke="#3a3a42" stroke-width="5"/>${sPl(n,330)}</g>
   <rect x="396" y="160" width="208" height="30" fill="#44444c" stroke="#22222a" stroke-width="3"/><circle cx="500" cy="175" r="6" fill="#e8c03a"/>`;
}
function tuerBild(n){
return`<rect x="411" y="201" width="178" height="258" fill="#0e0a10"/><circle cx="500" cy="330" r="110" fill="url(#licht)"/><path d="M420 459L470 380H530L580 459M470 380V240M530 380V240" stroke="#3a2a3a" stroke-width="3" fill="none"/>
   <g id="gm" class="tb" style="transform-origin:411px 330px"><g transform="translate(500 330)">${bild(150,230,KOPF)}</g>${sPl(n,425)}</g>`;
}
function tuerEisen(n){
const op='M410 470V230Q410 190 450 190H550Q590 190 590 230V470Z';
let st='';for(let k=0;k<7;k++)st+=R(424+k*18,440-k*34,84,12,'#8a8a92','#4a4a52',2);
return`<path d="M376 470V230Q376 146 500 146Q624 146 624 230V470Z" fill="#9a9a94" stroke="#3a3a36" stroke-width="5"/><path d="M376 330H410M590 330H624M420 150L430 190M580 150L570 190" stroke="#6a6a64" stroke-width="3" fill="none"/>
   <path d="${op}" fill="#14181c"/><circle cx="540" cy="240" r="80" fill="url(#licht)"/>${st}
   <g id="et" class="tb" style="transform-origin:410px 330px"><path d="${op}" fill="#3a4650" stroke="#1a2228" stroke-width="4"/><path d="M440 190V470M470 190V470M500 190V470M530 190V470M560 190V470" stroke="#2a343c" stroke-width="3"/><rect x="410" y="250" width="180" height="12" fill="#22282e"/><rect x="410" y="420" width="180" height="12" fill="#22282e"/>${[0,1,2,3].map(k=>C(424+k*50,256,3,'#8a949c')+C(424+k*50,426,3,'#8a949c')).join('')}${sPl(n,330)}</g>`;
}
function tuerKuppel(n){
return`<ellipse cx="500" cy="520" rx="116" ry="30" fill="#8a8a92" stroke="#4a4a52" stroke-width="4"/>
   <ellipse cx="500" cy="520" rx="98" ry="24" fill="#0e1218"/><path d="M458 522V548M542 522V548M458 530H542M458 538H542M458 546H542" stroke="#c0904a" stroke-width="6"/>
   <g id="ku" class="tb" style="transform-origin:392px 520px"><path d="M388 520A112 104 0 0 1 612 520Z" fill="rgba(170,215,240,.55)" stroke="#5a7a8a" stroke-width="5"/><path d="M500 416V520M444 436Q448 480 440 520M556 436Q552 480 560 520" stroke="#5a7a8a" stroke-width="4" fill="none"/><path d="M420 450Q450 430 478 428" stroke="#fff" stroke-width="5" opacity=".6" fill="none"/>${sPl(n,478)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'gitter';
const arten={gitter:[tuerGitter,'Rollgitter mit Zahlenschloss'],lift:[tuerLift,'Lastenaufzug mit Zahlenschloss'],bild:[tuerBild,'Geheimtür hinter dem Bild mit Zahlenschloss'],eisen:[tuerEisen,'Eisentür mit Zahlenschloss'],kuppel:[tuerKuppel,'Glaskuppel mit Zahlenschloss']};
const a=arten[art]||arten.gitter;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.museum={
name:"Das Museum",
symbole:["knochen","pinsel","rahmen","muenze","lupe"],
symbolNamen:["Knochen","Pinsel","Bilderrahmen","Münze","Lupe"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M8 30L60 6L112 30Z" fill="#ece6da" stroke="#5a5248" stroke-width="3"/><rect x="12" y="30" width="96" height="8" fill="#d8d0c0" stroke="#5a5248" stroke-width="2"/>${[22,42,70,90].map(x=>`<rect x="${x}" y="38" width="8" height="38" fill="#ece6da" stroke="#5a5248" stroke-width="2"/>`).join('')}<rect x="6" y="76" width="108" height="8" fill="#d8d0c0" stroke="#5a5248" stroke-width="2"/><use href="#sym-knochen" x="46" y="42" width="28" height="28" color="#a33b22"/></svg>`,
texte:{
einleitung:"Ihr besucht das große Museum der Stadt – mit Dinosauriern, Gemälden und alten Funden. Ihr schaut euch so lange um, dass ihr die Durchsage überhört: Das Museum schließt! Alle Ausgänge sind verriegelt. Doch die Museumsleiterin hat ein Rätselspiel für euch versteckt: Jeder Durchgang hat ein Zahlenschloss. Untersucht die Ausstellungsstücke. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findet ihr den Weg hinaus?",
startKnopf:"Das Museum betreten",
hinweisGeber:"Der Museumswächter flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Der Museumswächter schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss des Museums",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Nacht ist vorbei!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Museum gefunden. Die Museumsleiterin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du besuchst das große Museum der Stadt – mit Dinosauriern, Gemälden und alten Funden. Du schaust dich so lange um, dass du die Durchsage überhörst: Das Museum schließt! Alle Ausgänge sind verriegelt. Doch die Museumsleiterin hat ein Rätselspiel für dich versteckt: Jeder Durchgang hat ein Zahlenschloss. Untersuche die Ausstellungsstücke. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findest du den Weg hinaus?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Der Museumswächter schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Museum gefunden. Die Museumsleiterin ist stolz auf dich!"
},
einfach:{
name:"Das Museum",
symbolNamen:["Knochen","Pinsel","Rahmen","Münze","Lupe"],
texte:{
einleitung:"Ihr seid in einem großen Museum. Dort gibt es Dinosaurier, Bilder und alte Funde. Plötzlich macht das Museum zu! Alle Wege sind verschlossen. An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
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
einleitung:"Du bist in einem großen Museum. Dort gibt es Dinosaurier, Bilder und alte Funde. Plötzlich macht das Museum zu! Alle Wege sind verschlossen. An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Die Eingangshalle",intro:"Ihr seid in der großen Halle. Hier gibt es hohe Säulen und eine breite Treppe. Sucht die Zahlen für das Schloss am Rollgitter!",introDu:"Du bist in der großen Halle. Hier gibt es hohe Säulen und eine breite Treppe. Suche die Zahlen für das Schloss am Rollgitter!",
objekte:[{name:"Kasse",fund:"In der Kasse liegt:"},{name:"Kleiderständer",fund:"In der Jacke steckt:"},{name:"Rotes Seil",fund:"Am Seil hängt:"},{name:"Schirmständer",fund:"Zwischen den Schirmen steckt:"},{name:"Plan vom Museum",fund:"Hinter dem Plan klebt:"}],
infoObjekte:[{name:"Schild an der Wand",fund:"Hinter dem Schild klebt:"},{name:"Glaskasten",fund:"Im Glaskasten liegt:"},{name:"Bank",fund:"Unter der Bank liegt:"}]},
{titel:"Der Saal der Dinosaurier",intro:"Hier steht ein riesiges Skelett. Es ist von einem Dinosaurier. Dinosaurier lebten vor sehr langer Zeit.",
objekte:[{name:"Dino-Ei",fund:"Neben dem Ei liegt:"},{name:"Großer Zahn",fund:"Unter dem Zahn liegt:"},{name:"Kiste mit Sand",fund:"Im Sand liegt:"},{name:"Stein aus dem All",fund:"In einem Loch im Stein steckt:"},{name:"Schnecke aus Stein",fund:"In den Stein ist etwas geritzt:"}],
infoObjekte:[{name:"Tafel mit Dino-Zeiten",fund:"Hinter der Tafel klebt:"},{name:"Pult mit Buch",fund:"Im Buch liegt:"},{name:"Regal mit Steinen",fund:"Zwischen den Steinen liegt:"}]},
{titel:"Der Saal mit Bildern",intro:"An den roten Wänden hängen viele Bilder. Die Bilder haben goldene Rahmen. Helle Lampen leuchten auf die Bilder.",
objekte:[{name:"Figur aus Stein",fund:"Am Sockel klebt:"},{name:"Rüstung",fund:"Im Helm steckt:"},{name:"Vase",fund:"In der Vase liegt:"},{name:"Goldener Rahmen",fund:"Hinten am Rahmen klebt:"},{name:"Bild mit Landschaft",fund:"Hinter dem Bild steckt:"}],
infoObjekte:[{name:"Zettel über die Malerin",fund:"Hinter dem Zettel steckt:"},{name:"Ständer mit Kopfhörern",fund:"An den Kopfhörern hängt:"},{name:"Dickes Buch über Bilder",fund:"Im Buch liegt:"}]},
{titel:"Die Werkstatt",intro:"Hier reparieren Menschen alte Bilder und Funde. Auf den Tischen liegen Pinsel und Farben.",
objekte:[{name:"Holzständer mit Bild",fund:"Hinter dem Bild klemmt:"},{name:"Tisch mit Lupe",fund:"Unter der Lupe liegt:"},{name:"Brett mit Farben",fund:"Zwischen den Farben steht:"},{name:"Eimer mit Farbe",fund:"Unter dem Eimer klebt:"},{name:"Pinnwand mit Bildern",fund:"Zwischen den Zetteln hängt:"}],
infoObjekte:[{name:"Zettel mit Anleitung",fund:"Unter dem Zettel klemmt:"},{name:"Regal mit Büchern",fund:"Zwischen den Büchern steckt:"},{name:"Kiste mit alten Sachen",fund:"In der Kiste liegt:"}]},
{titel:"Das Dach",intro:"Ihr seid auf dem Dach vom Museum. Die Sonne geht auf. Öffnet das letzte Schloss!",introDu:"Du bist auf dem Dach vom Museum. Die Sonne geht auf. Öffne das letzte Schloss!",
objekte:[{name:"Schornstein",fund:"Hinter dem Schornstein klemmt:"},{name:"Wetterfahne",fund:"Unter der Wetterfahne liegt:"},{name:"Regentonne",fund:"In der Tonne schwimmt:"},{name:"Taubenhaus",fund:"Im Taubenhaus liegt:"},{name:"Uhr an der Wand",fund:"Hinter der Uhr klebt:"}],
infoObjekte:[{name:"Tafel aus Metall",fund:"Hinter der Tafel klebt:"},{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Beet mit Blumen",fund:"Zwischen den Blumen steckt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Eingangshalle",
intro:"Ihr steht in der hohen Eingangshalle. Marmorsäulen tragen die Decke, eine breite Treppe führt nach oben. An der Kasse sitzt niemand mehr. Irgendwo hier sind die Ziffern für das Schloss am Rollgitter versteckt …",
introDu:"Du stehst in der hohen Eingangshalle. Marmorsäulen tragen die Decke, eine breite Treppe führt nach oben. An der Kasse sitzt niemand mehr. Irgendwo hier sind die Ziffern für das Schloss am Rollgitter versteckt …",
tuerX:800,tuerArt:"gitter",
hintergrund:()=>`${defs('#e8dcc8','#8a7a64')}<rect width="1600" height="470" fill="#ece6da"/>${steine(50,470,84,220,'rgba(140,120,90,.2)')}${decke('#c9bea8',50)}<text x="800" y="37" font-size="30" font-weight="bold" letter-spacing="14" text-anchor="middle" fill="#6a6050" font-family="Arial,sans-serif">MUSEUM</text>${saeule(100)}${saeule(600)}${saeule(1000)}${[...Array(8)].map((_,k)=>R(1290+k*40,444-k*26,310-k*40,26,k%2?'#e0d8c8':'#d0c8b6','#9a907c',2)).join('')}${P('M1290 420L1600 218',0,'#8a5a32',8)}${[0,2,4,6].map(k=>P(`M${1300+k*40} ${444-k*26}V${414-k*26}`,0,'#8a5a32',4)).join('')}${boden('rgba(90,70,40,.18)')}${lampe(380,100,'#d8a73a')}${lampe(1420,90,'#d8a73a')}`,
objekte:[
B("Kasse",300,590,-150,kasse,"In der Kassenschublade liegt:"),
B("Garderobe",1130,570,-200,garderobe,"In einer Manteltasche steckt:"),
B("Absperrkordel",560,700,-105,kordel,"An der roten Kordel hängt:"),
B("Schirmständer",1400,690,-155,schirme,"Zwischen den Schirmen steckt:"),
W("Museumsplan",380,250,-85,plan,"Hinter dem Museumsplan klebt:")
],
infoObjekte:[W("Infotafel",1180,240,-95,infotafel,"Hinter der Infotafel klebt:"),B("Ausstellungsvitrine",1010,720,-175,vitrine,"Neben dem Ausstellungsstück liegt:"),B("Sitzbank",130,720,-75,bank,"Unter der Sitzbank liegt:")]},
{titel:"Der Dinosaurier-Saal",
intro:"Im Dinosaurier-Saal ist es dämmrig. Das riesige Skelett eines Tyrannosaurus ragt über euch auf. Fossilien und Funde aus der Urzeit warten darauf, untersucht zu werden. Findet die Ziffern für das Schloss am Lastenaufzug!",
introDu:"Im Dinosaurier-Saal ist es dämmrig. Das riesige Skelett eines Tyrannosaurus ragt über dir auf. Fossilien und Funde aus der Urzeit warten darauf, untersucht zu werden. Finde die Ziffern für das Schloss am Lastenaufzug!",
tuerX:1350,tuerArt:"lift",
hintergrund:()=>`${defs('#5a625a','#1e2420','#e8f0d8')}<rect width="1600" height="470" fill="#34483e"/>${steine(40,400,60,240,'rgba(0,0,0,.18)')}${R(0,400,1600,70,'#4a524e')}${R(0,400,1600,8,'rgba(0,0,0,.3)')}${decke('#1e2a24')}${P('M0 40L200 90H1400L1600 40',0,'#26332c',10)}${skelett()}${boden()}${lampe(1180,70,'#5a6a5a')}`,
objekte:[
B("Dino-Ei im Nest",280,610,-135,dinoei,"Neben dem Dino-Ei liegt:"),
B("Mammut-Stoßzahn",640,700,-125,stosszahn,"Unter dem Stoßzahn liegt:"),
B("Ausgrabungskiste",1000,600,-120,grabung,"Im Sand ist etwas vergraben:"),
B("Meteorit",860,560,-125,meteorit,"In einem Loch des Meteoriten steckt:"),
W("Ammoniten-Fossil",1030,230,-85,ammonit,"In die Steinplatte ist etwas eingeritzt:")
],
infoObjekte:[W("Zeitleiste der Urzeit",130,240,-72,zeitleiste,"Hinter der Zeitleiste klebt:"),B("Forscherpult mit Buch",1130,540,-110,pult,"Im Buch auf dem Pult liegt:"),B("Gesteinssammlung",120,740,-125,gestein,"Zwischen den Gesteinen liegt:")]},
{titel:"Die Gemäldegalerie",
intro:"Rote Wände, goldene Rahmen und helle Scheinwerfer: In der Gemäldegalerie hängen berühmte Bilder. Eine Ritterrüstung bewacht den Saal. Schaut genau hin – Kunst steckt voller Geheimnisse! Das große Porträt trägt ein Zahlenschloss.",
introDu:"Rote Wände, goldene Rahmen und helle Scheinwerfer: In der Gemäldegalerie hängen berühmte Bilder. Eine Ritterrüstung bewacht den Saal. Schau genau hin – Kunst steckt voller Geheimnisse! Das große Porträt trägt ein Zahlenschloss.",
tuerX:220,tuerArt:"bild",
hintergrund:()=>`${defs('#7a5234','#2a1a10','#fff0c0')}<rect width="1600" height="470" fill="#8a2430"/>${R(0,380,1600,90,'#5a1620')}${R(0,380,1600,8,'#d8a73a')}${decke('#2a1014')}${R(0,34,1600,6,'#555')}<g transform="translate(450 210)">${bild(64,84,KOPF)}</g><g transform="translate(1040 220)">${bild(150,100,OBST)}</g><g transform="translate(1220 210)">${bild(44,60,LAND)}</g><g transform="translate(1520 220)">${bild(40,56,KOPF)}</g>${[450,680,1040,1220,1380,1520].map(x=>spot(x,330)).join('')}${boden()}`,
objekte:[
B("Marmorskulptur",560,580,-200,skulptur,"Am Sockel der Skulptur klebt:"),
B("Ritterrüstung",1180,560,-230,ruestung,"Im Helm der Rüstung steckt:"),
B("Bemalte Vase",850,710,-145,vase,"In der Vase klappert etwas:"),
B("Leerer Goldrahmen",1450,640,-170,goldrahmen,"Hinten am Rahmen klebt:"),
W("Landschaftsgemälde",680,230,-90,gemaelde,"Hinter dem Gemälde steckt:")
],
infoObjekte:[W("Steckbrief der Malerin",1380,250,-88,steckbrief,"Hinter dem Steckbrief steckt:"),B("Hörstation",420,740,-170,hoeren,"An den Kopfhörern hängt:"),B("Ausstellungskatalog",1000,600,-100,katalog,"Im Katalog liegt:")]},
{titel:"Die Restaurierungswerkstatt",
intro:"In der Restaurierungswerkstatt werden alte Kunstwerke und Fundstücke vorsichtig repariert. Auf den Arbeitstischen liegen Pinsel, Farben und Lupen. Die Lampen brennen noch – die Restauratorin ist wohl gerade erst gegangen. Eine schwere Eisentür führt zu einer Treppe.",
tuerX:500,tuerArt:"eisen",
hintergrund:()=>`${defs('#c0c0b8','#6a6a64','#ffffff')}<rect width="1600" height="470" fill="#eef0ea"/>${R(0,370,1600,100,'#d8dcd4')}${steine(370,470,25,50,'rgba(0,0,0,.08)')}${decke('#a8aca4')}${[170,1200].map(x=>`${C(x,260,220,'url(#licht)')}${R(x-80,110,160,220,'#bfe0f0','#7a8a8a',8)}${P(`M${x} 110V330M${x-80} 220H${x+80}`,0,'#7a8a8a',5)}`).join('')}${R(650,170,130,8,'#8a5a2a')}${[0,1,2,3].map(k=>R(662+k*30,136,20,34,['#c83a2a','#e8b830','#2a6aa0','#3f8a4a'][k],'#555',1,3)).join('')}${boden('rgba(0,0,0,.12)')}${lampe(820,120,'#f4f4f0')}${lampe(1300,120,'#f4f4f0')}`,
objekte:[
B("Staffelei mit Bild",230,620,-220,staffelei,"Hinter der Leinwand klemmt:"),
B("Arbeitstisch mit Lupe",820,600,-190,werktisch,"Unter der großen Lupe liegt:"),
B("Farbpalette",700,730,-125,palette,"Zwischen den Farbklecksen steht:"),
B("Farbeimer",1420,620,-130,farbeimer,"Am Boden eines Eimers klebt:"),
W("Pinnwand mit Skizzen",900,240,-82,pinnwand,"Zwischen den Skizzen hängt:")
],
infoObjekte:[W("Arbeitsanleitung",1450,240,-92,anleitung,"Unter der Anleitung klemmt:"),B("Fachbuch-Regal",1150,730,-172,regal,"Zwischen den Fachbüchern steckt:"),B("Kiste mit Fundstücken",1000,560,-115,fundkiste,"Im Stroh der Kiste liegt:")]},
{titel:"Das Dach",
intro:"Endlich frische Luft! Auf dem Dach des Museums geht gerade die Sonne auf. Schornsteine, Tauben und eine Wetterfahne warten auf euch. Die Glaskuppel hat das letzte Schloss – öffnet es, dann führt eine Feuerleiter nach unten!",
introDu:"Endlich frische Luft! Auf dem Dach des Museums geht gerade die Sonne auf. Schornsteine, Tauben und eine Wetterfahne warten auf dich. Die Glaskuppel hat das letzte Schloss – öffne es, dann führt eine Feuerleiter nach unten!",
tuerX:1150,tuerArt:"kuppel",
hintergrund:()=>`${defs('#9aa0a8','#5a626c','#ffe8b0')}<defs><linearGradient id="himmelD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8fe0"/><stop offset=".7" stop-color="#ffc890"/><stop offset="1" stop-color="#ffe8c0"/></linearGradient></defs><rect width="1600" height="470" fill="url(#himmelD)"/>${C(1280,350,170,'url(#licht)')}${C(1280,356,54,'#fff4c8')}<ellipse cx="1000" cy="120" rx="90" ry="22" fill="#fff" opacity=".7"/><ellipse cx="1400" cy="200" rx="110" ry="24" fill="#fff" opacity=".6"/><ellipse cx="860" cy="250" rx="70" ry="16" fill="#fff" opacity=".6"/>${[[760,300,90],[860,250,70],[930,320,110],[1060,280,80],[1150,330,90],[1330,290,100],[1450,320,90],[1540,270,60]].map(([x,y,w],k)=>`${R(x,y,w,400-y,k%2?'#8a7aa8':'#7a6a98')}${[0,1,2].map(r=>R(x+12,y+16+r*36,w-24,12,'#ffe0a0')).join('')}`).join('')}${R(0,392,1600,78,'#c0b8a6')}${R(0,384,1600,14,'#d8d0c0','#8a8270',2)}${[...Array(16)].map((_,k)=>P(`M${k*100+50} 398V470`,0,'rgba(90,70,40,.25)',2)).join('')}${R(40,110,700,360,'#c9b08a','#6a5a40',4)}${ziegel(40,740,110,470,60,120,'rgba(90,60,30,.3)')}${R(20,86,740,26,'#8a4a3a','#4a2418',4)}${R(340,180,90,120,'#bfe0f0','#6a5a40',6)}${P('M385 180V300M340 240H430',0,'#6a5a40',4)}${R(640,290,70,180,'#5a3a22','#2a1a10',4)}${C(696,380,5,'#d8a73a')}${boden('rgba(0,0,0,.16)')}`,
objekte:[
B("Schornstein",400,600,-110,schornstein,"Hinter dem Schornstein klemmt:"),
B("Wetterfahne",860,560,-140,wetterfahne,"Unter der Wetterfahne liegt:"),
B("Regentonne",650,730,-60,regentonne,"In der Regentonne schwimmt:"),
B("Taubenschlag",1450,620,-130,taubenschlag,"Im Taubenschlag liegt:"),
W("Turmuhr",520,230,-60,turmuhr,"Hinter der Uhr klebt:")
],
infoObjekte:[W("Bronzetafel",250,250,-80,bronzetafel,"Hinter der Bronzetafel klebt:"),B("Stadtfernrohr",1010,700,-90,stadtfernrohr,"Im Fernrohr steckt:"),B("Dachbeet",1480,740,-60,dachbeet,"Zwischen den Blumen steckt:")]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aa0e0"/><stop offset=".6" stop-color="#ffc890"/><stop offset="1" stop-color="#ffe8c0"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/><circle cx="525" cy="380" r="120" fill="#fff2c0" opacity=".45"/><circle cx="525" cy="380" r="60" fill="#fff6d0"/>
   ${[[230,250,90],[330,290,70],[410,230,80],[560,270,110],[680,240,70],[760,280,90]].map(([x,y,w],k)=>`<rect x="${x}" y="${y}" width="${w}" height="${420-y}" fill="${k%2?'#b8a8c8':'#a898b8'}"/>${[0,1,2].map(r=>`<rect x="${x+12}" y="${y+16+r*40}" width="${w-24}" height="14" fill="#ffe8b0" opacity=".55"/>`).join('')}`).join('')}<path d="M400 230L450 196L500 230Z" fill="#a898b8"/>
   <rect y="400" width="1000" height="200" fill="#d8c8b0"/><path d="M0 430H1000M0 470H1000M100 400L60 600M300 400L280 600M500 400V600M700 400L720 600M900 400L940 600" stroke="#c0ae94" stroke-width="3"/>
   <ellipse cx="500" cy="440" rx="70" ry="16" fill="#9ab8c8" stroke="#8a8270" stroke-width="5"/><path d="M500 440V404" stroke="#cfe8ef" stroke-width="6"/><circle cx="500" cy="400" r="9" fill="#cfe8ef"/>
   ${[[320,430],[700,440]].map(([x,y])=>`<rect x="${x-5}" y="${y-50}" width="10" height="50" fill="#6b4a24"/><circle cx="${x}" cy="${y-70}" r="30" fill="#4f9a5a"/>`).join('')}
   <path d="M290 150l10 6 10-6M330 130l8 5 8-5M800 120l9 5 9-5" stroke="#3a2a17" stroke-width="2.5" fill="none"/>
   <rect y="520" width="1000" height="80" fill="#c0b8a6"/><rect y="508" width="1000" height="16" fill="#d8d0c0"/><path d="M380 524V600M470 524V600M380 544H470M380 564H470M380 584H470" stroke="#6a747c" stroke-width="8" fill="none"/>
   <path d="M0 0H1000V600H0Z M200 600V130H800V600Z" fill="#2a2420" fill-rule="evenodd"/><path d="M200 600V130H800V600" stroke="#cfc6b4" stroke-width="18" fill="none"/><path d="M180 112L500 40L820 112Z" fill="#3a322c" stroke="#cfc6b4" stroke-width="8"/>`
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
   treffer {x,y,z,b,h,t} (Tippfläche), name (Schild), schildOben [x,y,z], glanz [x,y,z], bewege(auf) (auf läuft von 0 bis 1) */
function ausgang(k,opt){
  const sc=k.scene, a=opt.treffer;
  const treffer=new THREE.Mesh(GEO.box,basis(0,{visible:false})); treffer.scale.set(a.b,a.h,a.t); treffer.position.set(a.x,a.y,a.z); sc.add(treffer);
  /* Bis Klasse 6 (einfache Sprache) darf der Ausgang einen leichteren Namen haben */
  const leicht=typeof CONFIG!=='undefined' && (typeof CONFIG.einfacheSprache==='boolean' ? CONFIG.einfacheSprache : parseInt(CONFIG.klasse,10)<=6);
  const schild=textSprite(leicht && opt.einfach ? opt.einfach : opt.name); schild.position.set(opt.schildOben[0],opt.schildOben[1],opt.schildOben[2]); schild.visible=false; sc.add(schild);
  const tuer={ steh:opt.steh, durch:opt.durch, tief:!!opt.tief, hoch:opt.hoch||0, treffer, schild, bereit:false, offen:false };
  const g=schein(sc,'rgba(255,225,120,.9)',opt.glanz[0],opt.glanz[1],opt.glanz[2],2.2); g.visible=false;
  let auf=0;
  k.anim.push((t,dt)=>{ g.visible=tuer.bereit; if(tuer.bereit){ const s=1.8+Math.sin(t*5)*.5; g.scale.set(s,s,1); } auf+=((tuer.offen?1:0)-auf)*Math.min(1,dt*2.5); opt.bewege(auf,t); });
  return tuer;
}

/* ===================================================================
   MUSEUM in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei museum-raum<n>.js, die sich in RAEUME3D.museum[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.museum = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Zimmerpalme','In der Erde der Palme steckt:','Palme im Topf','Bei der Palme steckt:'],['Prospektständer','Zwischen den Heften steckt:','Ständer mit Heften','Bei den Heften steckt:']],
  [['Dino-Fußabdruck','Im Fußabdruck liegt:','Fußspur vom Dino','In der Fußspur liegt:'],['Schubkarre','In der Schubkarre liegt:','Schubkarre','In der Schubkarre liegt:']],
  [['Klavier','Auf den Tasten liegt:','Klavier','Beim Klavier liegt:'],['Standuhr','Hinter dem Pendel klemmt:','Große Uhr','Bei der Uhr klemmt:']],
  [['Mikroskop','Unter dem Mikroskop liegt:','Mikroskop','Beim Mikroskop liegt:'],['Rollwagen mit Fläschchen','Zwischen den Fläschchen steht:','Wagen mit Flaschen','Bei den Flaschen steht:']],
  [['Gießkanne','Unter der Gießkanne liegt:','Gießkanne','Bei der Gießkanne liegt:'],['Drachen','Am Drachen hängt:','Drachen zum Fliegen','Am Drachen hängt:']]
];
const SZM=SZENARIEN.museum;
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZM.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZM.einfach) SZM.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const MUS = (function(){
const HOLZ=0x8a5a30, HOLZ2=0x5a3418, HOLZ3=0x3a2010, MESSING=0xd8a73a, MESSING2=0xa87c22, PAPIER=0xf4ecd8, MARMOR=0xece6da, MARMOR2=0xcfc6b4, MARMOR3=0xa89e8c,
  ROT=0x8a2430, BLAU=0x2a4a7a, GRUEN=0x3f7a4a, TUERKIS=0x2f7a7a, METALL=0x8a949c, METALL2=0x5a646c, GOLD=0xe8b830, SCHWARZ=0x1c160e, WEISS=0xfaf6ea;
/* Dielenboden (kachelbar). grund = [r,g,b] */
function dielenBild(grund,fuge){
  const G=grund||[150,104,62];
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#3a2010'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ let x=-((r*97)%256); while(x<512){ const w=256, v=Math.floor(zufall()*26)-13;
      const mal=xx=>{ g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(xx+1,r*64+1,w-3,62);
        g.fillStyle='rgba(50,25,8,.16)'; for(let k=0;k<5;k++) g.fillRect(xx+6+((k*53)%90),r*64+10+k*11,110+((k*31)%90),2); };
      mal(x); if(x<0) mal(x+512); x+=w; } } });
}
/* Tapete mit feinen Streifen. grund, streifen = CSS-Farben */
function tapeteBild(grund,streifen){
  return bild(512,512,(g)=>{ g.fillStyle=grund||'#d8c8a0'; g.fillRect(0,0,512,512);
    g.fillStyle=streifen||'rgba(140,100,50,.18)'; for(let x=0;x<512;x+=64){ g.fillRect(x+8,0,14,512); g.fillRect(x+30,0,3,512); }
    for(let i=0;i<300;i++){ g.fillStyle=i%2?'rgba(255,255,255,.07)':'rgba(60,30,10,.06)'; g.fillRect(zufall()*510,zufall()*510,3,3); } });
}
/* Mauerwerk aus Quadern (Turmzimmer, Tor). grund = [r,g,b] */
function quaderBild(grund,fuge,reihen){
  const G=grund||[150,140,124], n=reihen||8, h=512/n;
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#3c362c'; g.fillRect(0,0,512,512);
    for(let r=0;r<n;r++){ let x=(r%2)*-64; while(x<512){ const w=128, v=Math.floor(zufall()*24)-12;
      const mal=xx=>{ g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(xx+2,r*h+2,w-4,h-4);
        g.fillStyle='rgba(255,250,230,.12)'; g.fillRect(xx+2,r*h+2,w-4,4); g.fillStyle='rgba(20,15,8,.2)'; g.fillRect(xx+2,r*h+h-8,w-4,6); };
      mal(x); if(x<0) mal(x+512); x+=w; } } });
}
/* flache Bildtafel (z. B. Gemälde, Karte), Blick nach +z */
function tafel(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
function mauer(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const quer=Math.max(w,d); t.repeat.set(quer/6,h/6); t.offset.set(((w>d?x-w/2:z-d/2)/6)%1,((y-h/2)/6)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* ---------- Innenraum: Licht, Boden, Wände (hinten, links, rechts, in den Wandgruppen, blenden beim Drehen aus), Holzsockel, Zierleiste ----------
   opt: B,T,H, himmelLicht, grund, staerke, sonne, sonneStaerke, wandBild (tapeteBild/quaderBild), bodenBild, bodenWdh [x,z], leiste (Farbe),
        sockel (Höhe der Holzvertäfelung, 0 = keine; Standard 1.3), sockelFarbe, oeffnung {x,b,h} (Loch in der Rückwand für den Ausgang) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6.4;
  sc.background=new THREE.Color(0x140d08);
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xffeacc,opt.grund||0x4a3420,opt.staerke||.76));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xffe4bc,opt.sonneStaerke||.4); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const platten=opt.bodenBild||dielenBild(); platten.wrapS=platten.wrapT=THREE.RepeatWrapping; const w=opt.bodenWdh||[B/8,T/8];
  const bodenM=new THREE.MeshLambertMaterial({map:platten});
  const flaeche=(x1,x2,z1,z2)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/.5)),Math.max(1,Math.round((z2-z1)/.5))), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,((x1+B/2)+uv.getX(i)*(x2-x1))/B*w[0],((T/2-z2)+uv.getY(i)*(z2-z1))/T*w[1]);
    const m=new THREE.Mesh(geo,bodenM); m.rotation.x=-Math.PI/2; m.position.set((x1+x2)/2,0,(z1+z2)/2); m.receiveShadow=true; sc.add(m); };
  flaeche(-B/2,B/2,-T/2,T/2);
  flaeche(-B/2-18,B/2+18,T/2,T/2+26); /* Boden läuft vorn weit weiter, damit auch beim Drehen mit vollem Zoom keine dunkle Fläche entsteht */
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x24180e)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);
  const tex=opt.wandBild||tapeteBild(), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
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
/* Teppich flach auf dem Boden (Deko, kein Hindernis) */
function teppich(par,x,z,b,t,farbe,rand){
  const g=gruppe(par,x,0,z); box(g,b,.012,t,rand||MESSING2,0,.008,0); box(g,b-.5,.012,t-.5,farbe||ROT,0,.013,0); box(g,b-1.3,.012,t-1.3,rand||MESSING2,0,.017,0); box(g,b-1.55,.012,t-1.55,farbe||ROT,0,.021,0);
  g.traverse(m=>{ if(m.isMesh) m.castShadow=false; }); verschmelze(g); return g;
}
/* Viele Bücher, Blätter oder Steine als eine Instanz-Gruppe. liste: [[x,y,z,sx,sy,sz,farbe,drehY,drehX,drehZ]], geo: GEO.sph / GEO.cone / GEO.box / GEO.cyl */
function viele(par,geo,liste){
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(e[8]||0,e[7]||0,e[9]||0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.receiveShadow=true; im.frustumCulled=false; par.add(im); return im;
}
/* Steinplatten-Boden (kachelbar, reihen x reihen Platten). grund, grund2 = [r,g,b] für Schachbrettmuster */
function fliesenBild(grund,grund2,fuge,reihen){
  const A=grund||[222,214,198], B=grund2||A, n=reihen||4, h=512/n;
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#9a907c'; g.fillRect(0,0,512,512);
    for(let r=0;r<n;r++) for(let s=0;s<n;s++){ const C=(r+s)%2?B:A, v=Math.floor(zufall()*12)-6; g.fillStyle='rgb('+(C[0]+v)+','+(C[1]+v)+','+(C[2]+v)+')'; g.fillRect(s*h+1.5,r*h+1.5,h-3,h-3);
      g.strokeStyle='rgba(120,105,80,.18)'; g.lineWidth=2; g.beginPath(); g.moveTo(s*h+zufall()*h,r*h+3); g.quadraticCurveTo(s*h+zufall()*h,r*h+h/2,s*h+zufall()*h,r*h+h-3); g.stroke(); } });
}
/* Marmorsäule, Fuß bei y=0, Höhe h. Hindernis (k.kreis) und k.verdecker setzt die Funktion selbst */
function saeule(par,k,x,z,h,farbe){
  const g=gruppe(par,x,0,z), c=farbe||MARMOR;
  box(g,1.25,.28,1.25,MARMOR3,0,.14,0); walze(g,.56,.2,MARMOR2,0,.38,0); rohr(g,.4,.47,h-.9,c,0,.48+(h-.9)/2,0);
  for(let i=0;i<10;i++){ const a=i*Math.PI/5; strich(g,[Math.cos(a)*.46,.55,Math.sin(a)*.46],[Math.cos(a)*.4,h-.5,Math.sin(a)*.4],.03,MARMOR2); }
  walze(g,.54,.18,MARMOR2,0,h-.33,0); box(g,1.3,.26,1.3,MARMOR3,0,h-.11,0); verschmelze(g); k.kreis(x,z,.72); k.verdecker(g,x,z,.75); return g;
}
/* Sockel für ein Ausstellungsstück (nur Deko oder Teil eines Gegenstands), Fuß bei y=0 */
function sockel(par,x,z,b,h,farbe){ const g=gruppe(par,x,0,z); box(g,b+.24,.18,b+.24,MARMOR3,0,.09,0); box(g,b,h-.3,b,farbe||MARMOR,0,.18+(h-.3)/2,0); box(g,b+.18,.14,b+.18,MARMOR2,0,h-.05,0); return g; }
/* Gemälde im goldenen Rahmen, Blick nach +z, Mitte bei (x,y,z). mal(g,w,h) zeichnet auf 256 x (256*h/b) */
function gemaelde(par,x,y,z,b,h,mal){
  const g=gruppe(par,x,y,z); box(g,b+.34,h+.34,.14,MESSING2,0,0,0); box(g,b+.16,h+.16,.16,MESSING,0,0,.01);
  tafel(g,bild(256,Math.max(16,Math.round(256*h/b)),mal),b,h,0,0,.1); return g;
}
return { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, MARMOR, MARMOR2, MARMOR3, ROT, BLAU, GRUEN, TUERKIS, METALL, METALL2, GOLD, SCHWARZ, WEISS,
  dielenBild, tapeteBild, quaderBild, fliesenBild, tafel, mauer, huelle, saeule, sockel, gemaelde, zahlenschloss, teppich, viele };
})();

/* Raum 1: Die Eingangshalle. Hohe, helle Marmorhalle mit Säulen, breiter Treppe (nur Deko), Bannern, Gemälden und Kugelbäumchen in Steinkübeln.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Zimmerpalme, die einzige Palme im Raum) und 10 (Prospektständer) sind neu.
   Ausgang: das Rollgitter in der Mitte der Rückwand, es fährt nach oben, dahinter der beleuchtete Durchgang. Leben: ein kleiner Putzroboter. */
RAEUME3D.museum[0] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, MARMOR, MARMOR2, MARMOR3, ROT, BLAU, GRUEN, TUERKIS, METALL, METALL2, GOLD, SCHWARZ, WEISS } = MUS;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const GELB=0xe8b526, VIOLETT=0x7a4a8a, ORANGE=0xd87a30, TON=0xb8643a, LAUB=0x3f7a42, LAUB2=0x5a9a50;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const hell=m=>{ m.castShadow=false; return m; };
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const quer=(p,r,l,c,x,y,z)=>{ const m=walze(p,r,l,c,x,y,z); m.rotation.z=Math.PI/2; return m; };

/* ---------- Ausgang: das Rollgitter ---------- */
function baueAusgang(k,sc,hinten){
  /* beleuchteter Durchgang dahinter (durch das Gitter schon zu ahnen) */
  const gang=gruppe(hinten,0,0,0);
  box(gang,4.4,.1,4.1,0xd8c8a4,0,-.045,-15.5);
  box(gang,4.7,.2,4,0xb8ac90,0,4.4,-15.6);
  [-1,1].forEach(s=>{ box(gang,.2,4.4,3.7,0xf0e4c4,s*2.3,2.2,-15.65);
    [-14.6,-15.7,-16.8].forEach(z=>box(gang,.16,4.2,.28,MARMOR2,s*2.15,2.15,z));
    [-15.15,-16.25].forEach(z=>{ hell(ball(gang,.15,basis(0xfffbe0),s*2.1,3.1,z)); box(gang,.1,.1,.2,MESSING2,s*2.16,2.9,z); }); });
  box(gang,1.9,.02,3.9,ROT,0,.015,-15.5); [-.85,.85].forEach(x=>box(gang,.1,.025,3.9,MESSING,x,.018,-15.5));
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,150,6,128,150,185); v.addColorStop(0,'#ffffff'); v.addColorStop(.42,'#fff0b8'); v.addColorStop(1,'#d0964a'); g.fillStyle=v; g.fillRect(0,0,256,256);
    g.strokeStyle='rgba(150,100,40,.45)'; g.lineWidth=5; for(let i=0;i<5;i++){ g.beginPath(); g.moveTo(70-i*14,256-i*3); g.lineTo(186+i*14,256-i*3); g.stroke(); } });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4.5,4.4),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,2.2,-17.45); gang.add(e);
  verschmelze(gang); ohneSchatten(gang);
  /* das Gitter: Querstäbe fahren einzeln nach oben, die Längsstäbe werden dabei kürzer */
  const roll=gruppe(hinten,0,0,HINTEN+.14); roll.userData.lebendig=true;
  const laengs=gruppe(roll,0,4.3,0);
  for(let i=0;i<11;i++) walze(laengs,.045,4.26,METALL2,-2.05+i*.41,-2.13,0);
  verschmelze(laengs); ohneSchatten(laengs);
  const quers=[];
  for(let i=0;i<10;i++){ const y=.1+i*.43, q=gruppe(roll,0,y,.03);
    box(q,4.36,i?.09:.2,.09,i?METALL:MESSING,0,0,0); if(i&&i%3===0) [-1.23,-.41,.41,1.23].forEach(x=>ball(q,.085,MESSING,x,0,.05));
    verschmelze(q); ohneSchatten(q); quers.push({ q, y }); }
  /* Rahmen aus Marmor mit Giebel, Führungsschienen und Rollkasten */
  const r=gruppe(hinten,0,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.18,4.35,.34,METALL2,s*2.27,2.17,.17); box(r,.52,4.5,.5,MARMOR3,s*2.62,2.25,.25); box(r,.72,.34,.66,0x8a7e6a,s*2.62,.17,.33); box(r,.74,.24,.68,MESSING2,s*2.62,4.45,.34); });
  box(r,5.0,.5,.6,METALL2,0,4.55,.3); [-1.9,-.95,0,.95,1.9].forEach(x=>ball(r,.06,GOLD,x,4.55,.62));
  box(r,5.9,.26,.74,MARMOR3,0,4.93,.37); box(r,5.5,.08,.78,MESSING,0,5.1,.39);
  const giebel=kegel(r,1,1,MARMOR2,0,5.6,.2); giebel.scale.set(2.8,.95,.28);
  scheibe(r,.26,.12,GOLD,0,5.5,.48); scheibe(r,.14,.14,TUERKIS,0,5.5,.5);
  verschmelze(r); ohneSchatten(r);
  /* Schwelle mit Pfeil nach hinten, flach am Boden */
  const schwelle=gruppe(sc,0,0,-12.7);
  box(schwelle,4.4,.02,.9,0x6a5e4c,0,.026,0); [-1,1].forEach(s=>{ const q=box(schwelle,.6,.02,.12,GOLD,s*.2,.04,0); q.rotation.y=-s*.65; });
  verschmelze(schwelle); ohneSchatten(schwelle);
  /* goldenes Zahlenschloss auf heller Platte */
  const sperre=gruppe(hinten,0,2.25,HINTEN+.34);
  box(sperre,1.8,1.5,.08,0x6a1e28,0,.04,0); box(sperre,1.62,1.32,.1,0xfbf0cc,0,.04,.01);
  const schloss=MUS.zahlenschloss(sperre,0,-.1,.2); schloss.scale.setScalar(1.45);
  verschmelze(sperre); ohneSchatten(sperre);
  const schimmer=schein(hinten,'rgba(255,215,100,.5)',0,2.3,HINTEN+.9,1.7);
  const licht=new THREE.PointLight(0xffdf90,.25,12,1.5); licht.position.set(0,3,-14.6); sc.add(licht);
  [-1,1].forEach(s=>k.kasten(s*2.62,-13.1,.75,.8));
  k.kasten(0,-13.15,4.6,.75); /* geschlossenes Gitter: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Rollgitter', einfach:'Gitter zum Hochfahren', steh:[0,-11.3], durch:[0,-15.4],
    treffer:{x:0,y:2.4,z:-12.9,b:5.0,h:4.8,t:.8}, schildOben:[0,3.8,-12.2], glanz:[0,2.25,-12.5],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)), h=a*4.25;
      quers.forEach(o=>{ const y=o.y+h; o.q.position.y=Math.min(4.3,y); o.q.visible=y<4.34; });
      laengs.scale.y=Math.max(.001,1-a); laengs.visible=a<.985;
      sperre.visible=auf<.05; schimmer.visible=auf<.05; licht.intensity=.25+1.6*auf; const g=1.6+Math.sin(t*2.4)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- breite Treppe (nur Deko) mit Geländer, Läufer und großem Gemälde darüber ---------- */
function treppe(k,hinten){
  const g=gruppe(hinten,-8,0,0), n=8, vorn=-8.7, tief=.48, hoch=.3;
  for(let i=0;i<n;i++){ const z=vorn-i*tief, h=(i+1)*hoch, ende=HINTEN;
    box(g,6.3,hoch,z-ende,i%2?MARMOR:0xe0d8c8,0,h-hoch/2,(z+ende)/2);
    box(g,6.36,.07,.14,MARMOR3,0,h-.035,z-.03);
    box(g,2.6,.025,tief,ROT,0,h+.012,z-tief/2); box(g,2.6,hoch,.025,0x6a1a26,0,h-hoch/2,z+.045);
    [-1.22,1.22].forEach(x=>box(g,.1,.03,tief,MESSING,x,h+.025,z-tief/2));
    [-1,1].forEach(s=>{ walze(g,.07,.95,MARMOR2,s*3.28,h+.47,z-tief/2); ball(g,.11,MARMOR2,s*3.28,h+.4,z-tief/2,1,1.5,1); }); }
  const oben=n*hoch;
  [-1,1].forEach(s=>{ for(let i=0;i<n;i++){ const z=vorn-i*tief; box(g,.34,(i+1)*hoch,tief,MARMOR2,s*3.28,(i+1)*hoch/2,z-tief/2); }
    strich(g,[s*3.28,1.3,vorn],[s*3.28,oben+1.25,vorn-tief*n],.11,HOLZ2);
    strich(g,[s*3.28,oben+1.25,vorn-tief*n],[s*3.28,oben+1.25,HINTEN+.1],.11,HOLZ2);
    box(g,.48,1.35,.48,MARMOR3,s*3.28,.68,vorn+.05); box(g,.6,.12,.6,MARMOR2,s*3.28,1.4,vorn+.05); ball(g,.24,MESSING,s*3.28,1.65,vorn+.05);
    walze(g,.1,1.0,MARMOR2,s*3.28,oben+.65,HINTEN+.2); });
  verschmelze(g); ohneSchatten(g);
  /* großes Landschaftsbild über dem Treppenabsatz */
  MUS.gemaelde(hinten,-8,4.35,HINTEN+.1,3.8,1.7,(c,w,h)=>{ c.fillStyle='#a8d4ee'; c.fillRect(0,0,w,h); c.fillStyle='#fff0a0'; c.beginPath(); c.arc(w*.78,h*.25,h*.13,0,7); c.fill();
    c.fillStyle='#8ab068'; c.beginPath(); c.moveTo(0,h*.7); c.quadraticCurveTo(w*.3,h*.25,w*.6,h*.7); c.quadraticCurveTo(w*.8,h*.45,w,h*.65); c.lineTo(w,h); c.lineTo(0,h); c.fill();
    c.fillStyle='#5a8a48'; c.fillRect(0,h*.75,w,h*.25); c.strokeStyle='#6ac0e0'; c.lineWidth=7; c.beginPath(); c.moveTo(w*.45,h*.74); c.quadraticCurveTo(w*.62,h*.86,w*.4,h); c.stroke(); });
  k.kasten(-8,-10.9,7.2,5.2);
}

/* ---------- Banner mit Museumsmotiv: runde Knöpfe an der Stange, keine Spitzen ---------- */
function bannerBild(art){
  return bild(128,320,(g)=>{ const F=['#8a2430','#2a4a7a','#2f6a52'][art%3]; g.fillStyle=F; g.fillRect(0,0,128,320); g.strokeStyle='#e8b830'; g.lineWidth=7; g.strokeRect(10,10,108,300);
    g.fillStyle='#f4e4b0'; g.strokeStyle='#f4e4b0'; g.lineWidth=8; g.beginPath();
    if(art%3===0){ g.moveTo(52,90); g.lineTo(76,90); g.lineTo(72,112); g.quadraticCurveTo(104,140,78,196); g.lineTo(50,196); g.quadraticCurveTo(24,140,56,112); g.closePath(); g.fill(); }
    else if(art%3===1){ for(let a=0;a<17;a+=.25){ const r=5+a*2.4; g[a?'lineTo':'moveTo'](64+Math.cos(a)*r,140+Math.sin(a)*r); } g.stroke(); }
    else { g.moveTo(24,116); g.lineTo(64,82); g.lineTo(104,116); g.closePath(); g.fill(); [34,57,80].forEach(x=>g.fillRect(x,126,14,60)); g.fillRect(26,192,76,12); }
    g.fillStyle='#e8b830'; [240,262,284].forEach((y,i)=>g.fillRect(34+i*12,y,60-i*24,7)); });
}
function banner(par,seite,pos,y,b,h,tex){
  const x=seite==='hinten'?pos:(seite==='links'?-B/2+.12:B/2-.12), z=seite==='hinten'?HINTEN+.12:pos;
  const g=gruppe(par,x,y,z); g.rotation.y=seite==='links'?Math.PI/2:seite==='rechts'?-Math.PI/2:0;
  quer(g,.05,b+.34,MESSING2,0,h/2+.04,.04); [-1,1].forEach(s=>ball(g,.1,GOLD,s*(b/2+.2),h/2+.04,.04));
  MUS.tafel(g,tex,b,h,0,0,.03);
  for(let i=0;i<5;i++) ball(g,.07,GOLD,-b/2+(i+.5)*b/5,-h/2-.05,.04,1,1.2,.6);
}

/* ---------- Wanddeko: Banner, Gemälde, Lampen, Zahnfries, Uhr ---------- */
function wandSchmuck(hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  const BN=[0,1,2].map(bannerBild);
  [[-15.8,0],[-12.9,1],[9.7,2],[15.9,0]].forEach(([x,a])=>banner(h,'hinten',x,3.75,1.35,3.1,BN[a]));
  [[L,'links',[[-10.8,1],[-1.6,2],[7.0,0]]],[R,'rechts',[[-10.8,2],[-1.6,0],[7.0,1]]]].forEach(([w,s,l])=>l.forEach(([z,a])=>banner(w,s,z,3.75,1.5,3.2,BN[a])));
  /* Fries mit kleinen Klötzen unter der Decke */
  for(let x=-17.4;x<=17.5;x+=.9) box(h,.4,.26,.2,MARMOR2,x,6.12,HINTEN+.1);
  box(h,36,.1,.26,MESSING2,0,5.93,HINTEN+.1);
  [[L,-1],[R,1]].forEach(([w,s])=>{ for(let z=-12.9;z<=13;z+=.9) box(w,.2,.26,.4,MARMOR2,s*(B/2-.1),6.12,z); box(w,.26,.1,27,MESSING2,s*(B/2-.1),5.93,0); });
  /* Gemälde an den Seitenwänden */
  const motive=[
    (c,w,h)=>{ c.fillStyle='#2a5a7a'; c.fillRect(0,0,w,h); c.fillStyle='#e8e0c8'; c.beginPath(); c.moveTo(w*.5,h*.2); c.lineTo(w*.72,h*.62); c.lineTo(w*.5,h*.62); c.fill(); c.fillStyle='#a8522a'; c.fillRect(w*.3,h*.66,w*.45,h*.1); c.fillStyle='#7ab0cc'; for(let i=0;i<6;i++) c.fillRect(i*46,h*.82+(i%2)*8,34,5); },
    (c,w,h)=>{ c.fillStyle='#f0e4c0'; c.fillRect(0,0,w,h); [['#c83a2a',.1,.12,.34,.5],['#2a6aa0',.5,.32,.38,.54],['#e8b830',.18,.66,.28,.24],['#3f8a4a',.62,.08,.24,.18]].forEach(([f,x,y,a,b])=>{ c.fillStyle=f; c.fillRect(x*w,y*h,a*w,b*h); }); },
    (c,w,h)=>{ c.fillStyle='#bce0f0'; c.fillRect(0,0,w,h); c.fillStyle='#6a9a50'; c.fillRect(0,h*.68,w,h*.32); [[.25,.45],[.62,.38],[.82,.55]].forEach(([x,y])=>{ c.fillStyle='#6a4a2a'; c.fillRect(x*w-5,y*h,10,h*.32); c.fillStyle='#3a7a3a'; c.beginPath(); c.arc(x*w,y*h,h*.15,0,7); c.fill(); }); }];
  [[L,-1,[-6.2,2.8,11.2]],[R,1,[-6.2,2.8,11.2]]].forEach(([w,s,zs])=>zs.forEach((z,i)=>{ const g=MUS.gemaelde(w,s*(B/2-.12),3.1,z,2.3,1.6,motive[(i+(s>0?1:0))%3]); g.rotation.y=-s*Math.PI/2;
    /* Bilderleuchte darüber */
    box(w,.34,.1,.9,MESSING,s*(B/2-.22),4.28,z); hell(box(w,.2,.04,.72,basis(0xfff0c0),s*(B/2-.24),4.21,z)); }));
  /* Wandlampen */
  [[L,-1],[R,1]].forEach(([w,s])=>[-8.6,.6,9.2].forEach(z=>{ box(w,.1,.5,.3,MESSING2,s*(B/2-.05),3.4,z); box(w,.4,.08,.08,MESSING2,s*(B/2-.25),3.4,z); ball(w,.22,basis(0xfff2c4),s*(B/2-.46),3.62,z); schein(w,'rgba(255,225,150,.5)',s*(B/2-.55),3.62,z,1.5); }));
  [-5.0,4.6,14.7,-17.2].forEach(x=>{ box(h,.3,.5,.1,MESSING2,x,3.35,HINTEN+.06); ball(h,.2,basis(0xfff2c4),x,3.65,HINTEN+.3); schein(h,'rgba(255,225,150,.45)',x,3.65,HINTEN+.45,1.3); });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Kugelbäumchen im Steinkübel (bewusst keine Palme) ---------- */
function kuebel(k,par,x,z,gr){
  const g=gruppe(par,x,0,z); g.scale.setScalar(gr||1);
  box(g,.9,.14,.9,MARMOR3,0,.07,0); rohr(g,.58,.4,.75,MARMOR2,0,.5,0); walze(g,.64,.12,MARMOR3,0,.9,0); walze(g,.5,.04,0x4a3220,0,.97,0);
  walze(g,.07,.7,HOLZ2,0,1.3,0); ball(g,.58,LAUB,0,2.0,0); ball(g,.38,LAUB,0,2.68,0);
  for(let i=0;i<26;i++){ const a=i*2.4, v=-.8+(i%9)*.2, r=Math.sqrt(1-v*v)*.55; ball(g,.13,i%2?LAUB2:LAUB,Math.cos(a)*r,2.0+v*.55,Math.sin(a)*r); }
  k.kreis(x,z,.68*(gr||1));
}
/* Blumenkasten am vorderen Rand */
function blumenkasten(k,par,x,z,b){
  const g=gruppe(par,x,0,z); box(g,b,.5,.75,MARMOR2,0,.25,0); box(g,b+.14,.1,.89,MARMOR3,0,.52,0); box(g,b-.2,.04,.6,0x4a3220,0,.58,0);
  const n=Math.floor(b/.32);
  for(let i=0;i<n;i++){ const a=-b/2+.25+i*(b-.5)/(n-1); ball(g,.2,i%2?LAUB:LAUB2,a,.68,(i%3-1)*.14,1,.8,1); ball(g,.085,[0xe85a6a,WEISS,GELB,0x8a6ad0][i%4],a+.05,.87,(i%3-1)*.17); }
  k.kasten(x,z,b+.15,.9);
}
/* Kunstwerk auf Sockel an der Seitenwand: bewusst klein und in gedeckten Steinfarben, damit es nicht antippbar wirkt */
function kunstwerk(par,x,z,art){
  const g=gruppe(par,x,0,z); g.scale.setScalar(.75);
  MUS.sockel(g,0,0,.85,1.15,MARMOR2);
  if(art===0){ const a=ring(g,.5,.11,MARMOR3,0,1.75,0); a.rotation.y=.9; ball(g,.17,0x8a7e6a,0,1.75,0); }
  else if(art===1){ [[.42,1.5,MARMOR3],[.3,2.1,0x8a7e6a],[.19,2.55,MARMOR3]].forEach(([r,y,c])=>ball(g,r,c,0,y,0)); }
  else { [0,1,2,3].forEach(i=>{ const q=box(g,.65-i*.1,.28,.65-i*.1,i%2?MARMOR3:0x8a7e6a,0,1.29+i*.29,0); q.rotation.y=i*.5; }); }
}

/* ---------- flache Deko am Boden ---------- */
function bodenSchmuck(sc){
  const g=gruppe(sc,0,0,0);
  /* große Steineinlage mit Sternmuster */
  const m=gruppe(g,0,0,2.4);
  walze(m,3.5,.01,0x8a7a62,0,.006,0); walze(m,3.25,.012,0xe8dcc0,0,.008,0); walze(m,2.45,.014,0x4a6a6a,0,.01,0); walze(m,2.28,.016,0xded2b8,0,.012,0);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4, l=i%2?1.5:2.15, c=Math.cos(a), s=Math.sin(a); [0,1,2,3,4].forEach(j=>{ const d=.25+j*l/5, q=box(m,l/5+.02,.018,.6-j*.12,i%2?0xb89048:0x8a3a3a,c*d,.016+i%2*.002,s*d); q.rotation.y=-a; }); }
  walze(m,.45,.026,MESSING,0,.016,0);
  ohneSchatten(g); verschmelze(g); ohneSchatten(g);
  MUS.teppich(sc,0,-8.3,3.4,7.2,ROT,MESSING2);
  MUS.teppich(sc,0,10.1,4.6,6.2,ROT,MESSING2);
}

/* ---------- Putzroboter: freundlich, mit Augen und drehenden Bürsten (Blick nach +x) ---------- */
function putzroboter(k){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0); g.scale.setScalar(.8);
  walze(r,.46,.3,0x4ab0c0,0,.29,0); walze(r,.48,.07,METALL2,0,.17,0); walze(r,.47,.05,WEISS,0,.42,0); ball(r,.36,WEISS,0,.44,0,1,.75,1);
  ball(r,.2,0x1e3038,.25,.58,0,.8,.75,1.35);
  [-1,1].forEach(s=>{ ball(r,.055,basis(0x8affe0),.41,.62,s*.1); ball(r,.06,0xf09098,.4,.4,s*.24,.5,.7,1); });
  const mund=ring(r,.07,.014,basis(0x8affe0),.415,.55,0,Math.PI); mund.rotation.set(0,Math.PI/2,Math.PI);
  walze(r,.018,.26,METALL2,-.1,.82,0); ball(r,.075,basis(0xffd040),-.1,.97,0);
  verschmelze(r);
  [-1,1].forEach(s=>{ const b=gruppe(g,.34,.07,s*.36); walze(b,.07,.08,METALL2,0,.02,0); for(let i=0;i<6;i++){ const q=box(b,.24,.025,.04,GELB,0,0,0), a=i*Math.PI/3; q.position.set(Math.cos(a)*.13,-.02,Math.sin(a)*.13); q.rotation.y=-a; }
    verschmelze(b); ohneSchatten(b); k.anim.push(t=>{ b.rotation.y=-s*t*8; }); });
  laeufer(k,g,ROBOWEG,1.15,3,9);
}
const ROBOWEG=[[-2.4,-8.6],[2.3,-8.6],[2.7,-2.2],[2.5,6.4],[0,8.4],[-2.4,7.2],[-2.5,1.4],[-2.6,-3]];

function baue(k){
  const sc=k.scene;
  const h=MUS.huelle(k,{ B,T,H, himmelLicht:0xfff6e4, grund:0x6a5a46, staerke:.74, sonne:0xfff0d8, sonneStaerke:.34,
    wandBild:MUS.quaderBild([218,208,188],'#b4a890',7), bodenBild:MUS.fliesenBild([214,204,184],[184,172,152],'#8c8270',4), bodenWdh:[B/9,T/9],
    leiste:0x9a8c74, sockelFarbe:0xbcae94, oeffnung:{x:0,b:4.5,h:4.35} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  sc.background=new THREE.Color(0x2a2218);
  const tuer=baueAusgang(k,sc,hinten);
  treppe(k,hinten);
  wandSchmuck(hinten,links,rechts);
  bodenSchmuck(sc);

  /* ---------- Säulen: zwei rahmen den Ausgang, sechs stehen an den Seiten ---------- */
  [[-3.85,-11.5],[3.85,-11.5],[-15.2,-7.8],[15.2,-7.8],[-15.2,1.6],[15.2,1.6],[-15.2,8.4],[15.2,8.4]].forEach(([x,z])=>MUS.saeule(sc,k,x,z,6.3));

  /* ---------- Pflanzkübel, Blumenkästen und Kunstwerke an den Rändern ---------- */
  const deko=gruppe(sc,0,0,0);
  [[-16.5,-11.9],[16.5,-11.9],[-16.4,11.7],[16.4,11.7]].forEach(([x,z])=>kuebel(k,deko,x,z,1.15));
  [[-4.0,12.1],[4.0,12.1]].forEach(([x,z])=>kuebel(k,deko,x,z,.8));
  [[-10.0,12.2,4.6],[10.0,12.2,4.6]].forEach(([x,z,b])=>blumenkasten(k,deko,x,z,b));
  verschmelze(deko);
  [[links,-1],[rechts,1]].forEach(([w,s])=>{ const g=gruppe(w,0,0,0); [[-3.2,s<0?0:2],[5.0,1]].forEach(([z,a])=>{ kunstwerk(g,s*17.15,z,a); k.kasten(s*17.15,z,.9,.9); }); verschmelze(g); });

  /* ---------- Licht ---------- */
  [[-9,4.8,-7,0xffe8c0,.34],[9,4.8,-7,0xffe8c0,.34],[0,5,6,0xfff4e0,.22]].forEach(([x,y,z,c,s])=>{ const l=new THREE.PointLight(c,s,15,1.5); l.position.set(x,y,z); sc.add(l); });

  /* ---------- Leben ---------- */
  putzroboter(k);

  return { tuer, start:[0,0] };
}

/* Verstecke für die Edelsteine (20 Stück) */
const verstecke=[[-13.6,-11.4],[-14.6,-1.4],[-12.8,-8.8],[3.6,-8.6],[9.8,-11.2],[15.2,-10.2],[9.2,-6.4],[13.4,-4.8],[16.4,-1.2],[-9.2,-1.0],
  [-16.2,3.4],[-12.4,8.4],[-7.4,7.4],[-6.4,10.4],[7.0,9.2],[13.4,9.8],[16.2,3.6],[8.6,2.2],[-2.2,-5.4],[-13.2,.8]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:5.2, z:-5.8, dreh:-.12, steh:[5.0,-3.7], kasten:[3.8,2.1], treffer:[3.6,3.0,1.8], baue(g){ /* 1 Kasse: Theke mit Registrierkasse und Schild */
      box(g,3.4,.14,1.5,HOLZ3,0,.07,0); box(g,3.3,1.15,1.4,HOLZ,0,.69,0); box(g,3.6,.14,1.65,MARMOR2,0,1.33,0);
      [-1.08,0,1.08].forEach(x=>{ box(g,.9,.82,.05,HOLZ2,x,.7,.72); box(g,.72,.64,.06,0xa8723e,x,.7,.725); });
      const schild=bild(256,80,(c)=>{ c.fillStyle='#f4ecd8'; c.fillRect(0,0,256,80); c.strokeStyle='#8a6420'; c.lineWidth=8; c.strokeRect(4,4,248,72); c.fillStyle='#2a1a08'; c.font='700 52px Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('KASSE',128,43); });
      MUS.tafel(g,schild,1.7,.53,0,.78,.77);
      /* Registrierkasse */
      const K=gruppe(g,-.55,1.4,-.05);
      box(K,1.3,.34,1.0,0x3a5a7a,0,.17,0); box(K,1.2,.14,.06,MESSING,0,.15,.52); ball(K,.06,GOLD,0,.15,.57);
      box(K,1.1,.5,.5,0x4a6a8a,0,.56,-.22); const tf=box(K,1.0,.08,.55,0x2a3a4a,0,.42,.22); tf.rotation.x=.35;
      for(let r=0;r<3;r++) for(let c=0;c<5;c++) walze(K,.065,.07,[WEISS,WEISS,GELB][r],-.36+c*.18,.55-r*.065,.05+r*.16);
      box(K,.8,.3,.04,0x1e3028,0,.66,.045); box(K,.68,.18,.05,basis(0x9ff0a0),0,.66,.05);
      box(K,.28,.4,.03,WEISS,.38,1.0,-.35); [1.1,1.0,.9].forEach(y=>box(K,.18,.025,.035,METALL2,.38,y,-.348)); quer(K,.07,.38,MESSING2,.38,.84,-.33);
      quer(K,.04,.22,MESSING,.66,.55,-.15); ball(K,.09,ROT,.78,.55,-.15);
      /* Klingel und Eintrittskarten */
      walze(g,.2,.04,HOLZ3,.65,1.42,.35); ball(g,.17,GOLD,.65,1.46,.35,1,.7,1); ball(g,.045,MESSING2,.65,1.6,.35);
      [0,1,2,3].forEach(i=>{ const q=box(g,.5,.035,.28,[0xf08a50,0x6ac0e0,0xf0d050,0x90d070][i],1.25,1.42+i*.037,-.05); q.rotation.y=(i-1.5)*.16; }); } },
  { x:-12.0, z:-3.8, dreh:.45, steh:[-10.9,-1.6], kasten:[3.4,2.4], treffer:[3.1,3.0,1.3], baue(g){ /* 2 Garderobe: Stange mit Jacken, Hutablage */
      [-1.45,1.45].forEach(x=>{ box(g,.16,.12,1.0,HOLZ3,x,.06,0); walze(g,.08,2.75,HOLZ2,x,1.43,0); ball(g,.13,MESSING,x,2.85,0); });
      quer(g,.05,2.9,MESSING,0,2.25,0); box(g,3.05,.1,.6,HOLZ,0,2.62,0); box(g,3.0,.08,.8,HOLZ2,0,.28,0);
      [[-.95,0x3f6aa0,0x2a4a74],[-.32,0xc84a38,0x8a2a22],[.32,0xe8b030,0xa87c18],[.95,0x4a8a52,0x2f5c36]].forEach(([x,c,d],i)=>{ const q=gruppe(g,x,2.23,(i%2)*.08-.04);
        ring(q,.08,.018,METALL,0,.03,0,Math.PI); strich(q,[0,-.03,0],[-.28,-.2,0],.03,HOLZ); strich(q,[0,-.03,0],[.28,-.2,0],.03,HOLZ);
        rohr(q,.2,.34,1.15,c,0,-.74,0).scale.z=.62; [-1,1].forEach(s=>{ const a=walze(q,.085,.9,c,s*.29,-.62,0); a.rotation.z=s*.13; ball(q,.09,d,s*.35,-1.08,0); });
        box(q,.18,.13,.07,d,-.08,-.18,.16).rotation.z=.6; box(q,.18,.13,.07,d,.08,-.18,.16).rotation.z=-.6;
        [-.45,-.68,-.91].forEach(y=>ball(q,.04,WEISS,0,y,.2)); box(q,.16,.1,.05,d,-.14,-1.0,.19); });
      /* Hüte und Schal */
      [[-.9,VIOLETT],[.05,TUERKIS],[.95,0xa8723e]].forEach(([x,c])=>{ walze(g,.34,.05,c,x,2.7,0); rohr(g,.18,.23,.26,c,x,2.85,0); walze(g,.235,.07,PAPIER,x,2.76,0); });
      box(g,.18,1.1,.06,0xe06a90,1.38,1.75,.12).rotation.z=.06; [1.45,1.7,1.95].forEach(y=>box(g,.19,.08,.07,WEISS,1.38+(1.75-y)*.06,y,.12));
      /* Gummistiefel unten */
      [-.7,-.38,.5,.82].forEach((x,i)=>{ const c=i<2?GELB:ROT; walze(g,.11,.38,c,x,.52,0); ball(g,.12,c,x,.39,.14,1,.65,1.5); }); } },
  { x:-6.3, z:-4.3, steh:[-6.3,-2.5], kasten:[4.1,.85], treffer:[3.9,2.0,.9], baue(g){ /* 3 Absperrkordel: goldene Pfosten mit rotem Seil */
      const P=[-1.7,0,1.7];
      P.forEach(x=>{ walze(g,.38,.1,MESSING2,x,.05,0); walze(g,.25,.1,MESSING,x,.14,0); walze(g,.08,1.35,GOLD,x,.85,0); walze(g,.13,.08,MESSING2,x,1.38,0); ball(g,.17,GOLD,x,1.68,0); walze(g,.07,.12,MESSING,x,1.54,0); });
      [[-1.7,0],[0,1.7]].forEach(([a,b])=>{ const n=10; let alt=null; for(let i=0;i<=n;i++){ const u=i/n, p=[a+(b-a)*u,1.42-Math.sin(u*Math.PI)*.55,0]; if(alt) strich(g,alt,p,.095,0xb0222e); ball(g,.098,0xb0222e,p[0],p[1],p[2]); alt=p; }
        [a+.14,b-.14].forEach(x=>ball(g,.125,MESSING,x,1.34,0,1,1,1)); }); } },
  { x:11.2, z:-1.6, steh:[10.0,.2], r:1.05, treffer:[1.9,2.9,1.9], baue(g){ /* 4 Schirmständer mit bunten Schirmen */
      walze(g,.78,.12,HOLZ3,0,.06,0); rohr(g,.66,.58,.95,0x3f6a5a,0,.58,0,20,true); liegend(ring(g,.67,.065,MESSING,0,1.06,0)); liegend(ring(g,.6,.055,MESSING,0,.16,0)); liegend(ring(g,.64,.035,MESSING2,0,.62,0)); walze(g,.55,.05,0x1e2a24,0,.14,0);
      [[-.33,-.12,ROT,.2,.1],[.3,-.22,0x2a6ac0,-.18,.16],[0,.26,GELB,.04,-.2],[.36,.2,VIOLETT,-.24,-.1],[-.22,.28,GRUEN,.22,-.18]].forEach(([x,z,c,kz,kx],i)=>{ const q=gruppe(g,x,.2,z); q.rotation.set(kx,0,kz);
        walze(q,.035,2.2,METALL2,0,1.1,0); const s=rohr(q,.17,.05,1.15,c,0,.95,0,8); ball(q,.17,c,0,1.52,0,1,.55,1); walze(q,.19,.07,WEISS,0,1.2,0); s.castShadow=true;
        const griff=i%2?HOLZ:0x3a2418; const b=ring(q,.15,.05,griff,.15,2.2,0,Math.PI); b.rotation.y=0; ball(q,.065,griff,.3,2.17,0); }); } },
  { x:7.0, z:HINTEN, wand:'hinten', steh:[7.0,-11.4], kasten:[3.4,.7], treffer:[3.3,2.4,.8], trefferY:1.15, baue(g){ /* 5 Museumsplan: bunter Grundriss an der Wand */
      box(g,3.3,2.35,.14,HOLZ2,0,2.35,.08); box(g,3.12,2.17,.16,MESSING,0,2.35,.09);
      MUS.tafel(g,bild(512,352,(c)=>{ c.fillStyle='#f6eed8'; c.fillRect(0,0,512,352); c.fillStyle='#2a3a4a'; c.font='700 40px Arial, sans-serif'; c.textAlign='center'; c.fillText('MUSEUMSPLAN',256,50);
        c.lineWidth=6; c.strokeStyle='#3a4a5a'; [['#e8c860',34,76,142,118],['#8ac070',184,76,142,118],['#e07060',334,76,144,118],['#90c8e0',34,204,214,112],['#c0a0d8',256,204,222,112]].forEach(([f,x,y,w,h])=>{ c.fillStyle=f; c.fillRect(x,y,w,h); c.strokeRect(x,y,w,h); });
        c.fillStyle='#2a3a4a'; c.font='700 44px Arial, sans-serif'; [['1',105,150],['2',255,150],['3',406,150],['4',141,280],['5',367,280]].forEach(([s,x,y])=>c.fillText(s,x,y));
        c.strokeStyle='#b02a20'; c.setLineDash([14,10]); c.lineWidth=7; c.beginPath(); c.moveTo(70,300); c.lineTo(70,176); c.lineTo(440,176); c.lineTo(440,270); c.stroke(); c.setLineDash([]); c.fillStyle='#b02a20'; c.beginPath(); c.arc(70,304,15,0,7); c.fill(); }),2.95,2.03,0,2.35,.18);
      [-1.5,1.5].forEach(x=>[1.32,3.38].forEach(y=>ball(g,.08,GOLD,x,y,.18))); } },
  { x:12.7, z:HINTEN, wand:'hinten', steh:[12.6,-11.4], kasten:[3.2,.7], treffer:[3.0,2.6,.8], trefferY:1.0, baue(g){ /* 6 Infotafel: weiße Tafel mit blauem i */
      box(g,2.9,2.4,.14,0x2a4a6a,0,2.28,.08);
      MUS.tafel(g,bild(320,264,(c)=>{ c.fillStyle='#f8f6f0'; c.fillRect(0,0,320,264); c.fillStyle='#2a6ab0'; c.fillRect(0,0,320,84); c.fillStyle='#fff'; c.beginPath(); c.arc(50,42,32,0,7); c.fill();
        c.fillStyle='#2a6ab0'; c.fillRect(44,36,12,28); c.beginPath(); c.arc(50,24,7,0,7); c.fill(); c.fillStyle='#fff'; c.font='700 44px Arial, sans-serif'; c.fillText('INFO',108,58);
        c.fillStyle='#6a6a72'; [108,132,156,180].forEach((y,i)=>c.fillRect(24,y,272-(i*41)%90,9)); c.fillStyle='#b8d8b0'; c.fillRect(24,202,126,46); c.fillStyle='#f0d890'; c.fillRect(170,202,126,46); }),2.7,2.22,0,2.28,.16);
      box(g,2.9,.12,.3,MESSING,0,1.05,.15); [-1.2,1.2].forEach(x=>ball(g,.09,GOLD,x,3.5,.12)); } },
  { x:-10.4, z:3.4, dreh:.28, steh:[-9.7,5.6], kasten:[2.9,2.2], treffer:[2.6,3.0,1.7], baue(g){ /* 7 Ausstellungsvitrine mit bemalter Vase unter Glas */
      box(g,2.4,.16,1.55,HOLZ3,0,.08,0); box(g,2.2,1.0,1.35,HOLZ2,0,.66,0); box(g,2.4,.14,1.55,MESSING2,0,1.22,0); box(g,2.14,.05,1.3,0x5a2a4a,0,1.31,0);
      box(g,.9,.28,.03,MESSING,0,.7,.69); box(g,.68,.06,.035,SCHWARZ,0,.7,.695);
      /* Vase */
      walze(g,.2,.12,0x8a3a1c,0,1.4,0); ball(g,.42,0xd87038,0,1.82,0,1,1.05,1); rohr(g,.15,.24,.34,0xd87038,0,2.3,0); walze(g,.21,.07,0x8a3a1c,0,2.49,0); walze(g,.425,.09,SCHWARZ,0,1.84,0); walze(g,.39,.06,PAPIER,0,2.0,0);
      [-1,1].forEach(s=>{ const h=ring(g,.17,.04,0x8a3a1c,s*.32,2.18,0,Math.PI); h.rotation.z=-s*1.25; });
      /* zwei alte Münzen */
      [[-.7,.3],[.72,-.2]].forEach(([x,z])=>{ walze(g,.17,.05,GOLD,x,1.36,z); walze(g,.09,.06,MESSING2,x,1.365,z); });
      /* Glaskasten mit Messingkanten */
      const glas=hell(box(g,2.14,1.5,1.3,mat(0xcfe8ef,{transparent:true,opacity:.2,depthWrite:false}),0,2.05,0)); glas.receiveShadow=false;
      [-1.07,1.07].forEach(x=>[-.65,.65].forEach(z=>box(g,.07,1.5,.07,MESSING,x,2.05,z)));
      [-.65,.65].forEach(z=>box(g,2.2,.07,.07,MESSING,0,2.82,z)); [-1.07,1.07].forEach(x=>box(g,.07,.07,1.36,MESSING,x,2.82,0));
      [-.2,.12].forEach((v,i)=>{ const q=hell(box(g,.06,1.1-i*.4,.01,basis(0xffffff,{transparent:true,opacity:.5,depthWrite:false}),-.75+v,2.1,.66)); q.rotation.z=-.4; }); } },
  { x:11.4, z:5.4, dreh:-.28, steh:[10.5,7.5], kasten:[3.6,2.1], treffer:[3.4,1.7,1.4], baue(g){ /* 8 Sitzbank mit blauem Polster */
      [-1.4,1.4].forEach(x=>[-.42,.42].forEach(z=>{ walze(g,.09,.62,MESSING,x,.34,z); ball(g,.12,MESSING2,x,.08,z,1,.65,1); }));
      box(g,3.2,.18,1.15,HOLZ2,0,.73,0); quer(g,.05,2.8,MESSING2,0,.25,0);
      box(g,3.1,.28,1.08,0x3a5a9a,0,.95,0); [-.78,0,.78].forEach(x=>ball(g,.4,0x4a6cb0,x,1.05,0,.98,.3,1.3)); [-.39,.39].forEach(x=>[-.22,.22].forEach(z=>ball(g,.06,GOLD,x,1.1,z)));
      /* Rollen als Armstützen */
      [-1.5,1.5].forEach(x=>{ const q=walze(g,.22,1.12,0x2a4276,x,1.26,0); q.rotation.x=Math.PI/2; [-.58,.58].forEach(z=>ball(g,.11,GOLD,x,1.26,z,1,1,.4)); }); } },
  { x:-5.6, z:4.4, steh:[-5.0,6.6], r:1.2, treffer:[2.4,3.6,2.4], baue(g){ /* 9 Zimmerpalme im Tontopf */
      rohr(g,.66,.46,.9,TON,0,.45,0); walze(g,.72,.16,0x9a4e2a,0,.92,0); walze(g,.62,.06,0x4a3220,0,1.0,0); walze(g,.61,.08,0xf0d090,0,.55,0);
      for(let i=0;i<7;i++){ rohr(g,.12-i*.006,.16-i*.006,.28,i%2?0x8a6a38:0x72542a,(i*i)*.004,1.14+i*.26,0); }
      const kx=.16, ky=2.82;
      for(let i=0;i<9;i++){ const a=i*Math.PI*2/9, c=Math.cos(a), s=Math.sin(a), hoch=i%2?.55:.28, F=i%2?0x4aa84a:0x2f8a40;
        const A=[kx,ky,0], M=[kx+c*.55,ky+hoch,s*.55], E=[kx+c*1.12,ky+hoch-.5,s*1.12];
        strich(g,A,M,.035,0x2f6a30); strich(g,M,E,.025,0x2f6a30);
        [[A,M,.55],[A,M,1],[M,E,.45],[M,E,.85]].forEach(([p,q,u],j)=>{ const x=p[0]+(q[0]-p[0])*u, y=p[1]+(q[1]-p[1])*u, z=p[2]+(q[2]-p[2])*u, l=[.3,.38,.36,.24][j];
          [-1,1].forEach(v=>{ const b=ball(g,l,F,x-s*v*l*.45+c*.08,y-.05,z+c*v*l*.45+s*.08,.28,.07,1); b.rotation.y=-a+v*.85; }); }); }
      ball(g,.2,0x4aa84a,kx,ky+.1,0,.7,1.5,.7); [[.2,.1],[-.04,-.16],[-.02,.17]].forEach(([x,z])=>ball(g,.13,0x8a5a28,kx+x*.9,ky-.14,z)); } },
  { x:5.6, z:4.2, dreh:-.22, steh:[5.2,6.4], kasten:[2.7,2.0], treffer:[2.4,3.1,1.5], baue(g){ /* 10 Prospektständer mit bunten Heften */
      [-1.05,1.05].forEach(x=>{ box(g,.16,.12,1.35,METALL2,x,.06,0); strich(g,[x,.1,.5],[x,2.75,-.3],.075,METALL2); strich(g,[x,.1,-.5],[x,2.75,-.3],.065,METALL2); ball(g,.12,MESSING,x,2.8,-.3); });
      const F=[ROT,0x2a6ac0,GELB,GRUEN,VIOLETT,ORANGE,TUERKIS,0xe06a90];
      [[.62,.4],[1.38,.17],[2.14,-.06]].forEach(([y,z],r)=>{
        box(g,2.2,.08,.38,METALL,0,y,z); quer(g,.035,2.2,MESSING,0,y+.22,z+.2);
        for(let i=0;i<4;i++){ const q=gruppe(g,-.75+i*.5,y+.05,z-.02); q.rotation.x=-.28;
          const c=F[(r*3+i*5)%F.length]; box(q,.43,.66,.07,c,0,.33,0); box(q,.33,.1,.02,WEISS,0,.55,.045); box(q,.24,.2,.02,(i+r)%2?PAPIER:0xf8e080,0,.31,.045); ball(q,.065,F[(r+i*3+2)%F.length],0,.31,.055,1,1,.3); } });
      box(g,1.5,.34,.08,0x2a4a6a,0,3.0,-.32); [-.45,0,.45].forEach((x,i)=>box(g,.3,.18,.03,[GELB,WEISS,ORANGE][i],x,3.0,-.265)); } }
];

return { titel:'Die Eingangshalle', breite:36, tiefe:27, oben:['40,32,24','96,82,62','160,142,112'], baue, gegenstaende, verstecke, roboweg:ROBOWEG };
})();

/* Raum 2: Der Dinosaurier-Saal. Dämmriges Grün, links hinten das freundliche Tyrannosaurus-Skelett auf seinem Podest,
   dazu Urzeit-Wandbilder, Farne, Felsen und ein Flugsaurier-Modell an Seilen.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Dino-Fußabdruck) und 10 (Schubkarre) sind neu.
   Ausgang: der Lastenaufzug rechts neben dem Skelett, zwei Türen gleiten auf, die Figur steigt in die beleuchtete Kabine. */
RAEUME3D.museum[1] = (function(){
/* grobe Kugel für die vielen Blätter und Moospolster (weniger Dreiecke fürs iPad) */
const GROB=new THREE.SphereGeometry(1,6,4);
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, ROT, METALL, METALL2, GOLD, SCHWARZ, WEISS } = MUS;
const KNOCHEN=0xf0e6c8, KNOCHEN2=0xd6c8a0, HOEHLE=0x3a3024, STEIN=0x7e8678, STEIN2=0x5c665a, STEIN3=0x434c44, SAND=0xd8b878, SAND2=0xb89458,
  ERDE=0x6a4428, ERDE2=0x4e3018, MOOS=0x5a8a44, FARN=0x3f8a46, FARN2=0x5aaa52, FARN3=0x2c6a3a, GELB=0xe8b526;
const B=36, T=27, H=6.4, HINTEN=-13.5, AX=4;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const hell=m=>{ m.castShadow=false; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const quer=(p,r,l,c,x,y,z)=>{ const m=walze(p,r,l,c,x,y,z); m.rotation.z=Math.PI/2; return m; };
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
/* weicher Verlauf durch die Punkte (Catmull-Rom), u von 0 bis 1 */
function aufKurve(P,u){
  const n=P.length-1, i=Math.min(n-1,Math.floor(u*n)), t=u*n-i, a=P[Math.max(0,i-1)], b=P[i], c=P[i+1], d=P[Math.min(n,i+2)];
  return [0,1,2].map(j=>.5*(2*b[j]+(c[j]-a[j])*t+(2*a[j]-5*b[j]+4*c[j]-d[j])*t*t+(3*b[j]-a[j]-3*c[j]+d[j])*t*t*t));
}
/* gebogener, sich verjüngender Strang (Knochen, Stoßzahn, Zweig) */
function strang(p,P,r1,r2,c,n){
  let alt=P[0]; ball(p,r1,c,alt[0],alt[1],alt[2]);
  for(let i=1;i<=n;i++){ const u=i/n, q=aufKurve(P,u), r=r1+(r2-r1)*u; strich(p,alt,q,r,c); ball(p,r,c,q[0],q[1],q[2]); alt=q; }
}

/* glatter Schlauch entlang der Kurve von u0 bis u1, Dicke radius(u); deckel: gerade abgeschnittenes Anfangsstück */
function schlauch(p,P,radius,c,n,u0,u1,deckel){
  const S=16, pos=[], nor=[], ringe=[];
  for(let i=0;i<=n;i++){ const u=u0+(u1-u0)*i/n, m=aufKurve(P,u), a=aufKurve(P,Math.max(0,u-.004)), b=aufKurve(P,Math.min(1,u+.004));
    const t=[b[0]-a[0],b[1]-a[1],b[2]-a[2]], l=Math.hypot(t[0],t[1],t[2]); t.forEach((v,j)=>t[j]=v/l);
    const q=Math.hypot(t[0],t[1]), e=[t[1]/q,-t[0]/q,0], f=[t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0]], R=[];
    for(let j=0;j<=S;j++){ const w=j*Math.PI*2/S, nv=[0,1,2].map(x=>Math.cos(w)*e[x]+Math.sin(w)*f[x]); R.push({ p:nv.map((v,x)=>m[x]+v*radius(u)), n:nv }); }
    ringe.push({ R, m, t }); }
  const ecke=v=>{ pos.push(v.p[0],v.p[1],v.p[2]); nor.push(v.n[0],v.n[1],v.n[2]); };
  for(let i=0;i<n;i++) for(let j=0;j<S;j++){ const A=ringe[i].R[j], B=ringe[i+1].R[j], C=ringe[i+1].R[j+1], D=ringe[i].R[j+1]; [A,D,C,A,C,B].forEach(ecke); }
  if(deckel){ const o=ringe[0], nv=o.t.map(v=>-v), M={ p:o.m, n:nv }; for(let j=0;j<S;j++) [M,{p:o.R[j+1].p,n:nv},{p:o.R[j].p,n:nv}].forEach(ecke); }
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));
  return teil(p,geo,c,0,0,0,1,1,1);
}

/* ---------- Farne und Felsen (alle Blätter und Steine zusammen als Instanzen) ---------- */
function farn(blaetter,x,y,z,gr,n,start){
  n=n||9;
  for(let i=0;i<n;i++){ const a=(start||0)+i*Math.PI*2/n+(i%2)*.2, laenge=gr*(.85+(i*7%5)*.07), hoch=gr*(.55+(i%3)*.2), f=[FARN,FARN2,FARN3][i%3];
    for(let j=1;j<=6;j++){ const u=j/6, r=laenge*u*.9, yy=y+hoch*Math.sin(u*2.3)*.95, br=gr*.2*(1.12-u);
      /* Blattrippe mit zwei Fiedern */
      [-1,1].forEach(s=>blaetter.push([x+Math.cos(a)*r-Math.sin(a)*s*br*.8,yy,z+Math.sin(a)*r+Math.cos(a)*s*br*.8,br,gr*.025,gr*.075,f,-a-s*1.0,0,0]));
      blaetter.push([x+Math.cos(a)*r,yy,z+Math.sin(a)*r,gr*.12,gr*.03,gr*.035,FARN3,-a,0,Math.cos(u*2.3)*.7]); } }
}
function fels(steine,moos,x,z,gr,dreh){
  [[0,0,1,.72],[.95,.25,.62,.7],[-.8,.35,.5,.66],[.2,.8,.36,.7]].forEach(([a,b,r,h],i)=>{ const c=Math.cos(dreh), s=Math.sin(dreh), px=x+(a*c+b*s)*gr, pz=z+(-a*s+b*c)*gr;
    steine.push([px,r*h*gr*.7,pz,r*gr,r*h*gr,r*gr*.85,[STEIN,STEIN2,0x6e7462,STEIN2][i],dreh+i*1.3,i*.2,0]);
    if(i<2) moos.push([px-.1*gr,r*h*gr*1.5,pz,r*gr*.55,r*gr*.14,r*gr*.45,MOOS,i,0,0]); });
}

/* ---------- Das Prunkstück: freundlicher Tyrannosaurus auf seinem Podest, Kopf nach rechts ---------- */
function skelett(sc){
  const g=gruppe(sc,-6.3,0,-10.2);
  /* Podest aus dunklem Stein mit heller Kante und goldener Tafel */
  box(g,12.0,.22,3.4,STEIN3,0,.11,0); box(g,11.6,.34,3.0,0x2f4a3e,0,.39,0); box(g,11.8,.1,3.2,0x9aa492,0,.58,0);
  box(g,2.2,.28,.04,GOLD,.2,.39,1.52); [.45,.34].forEach((y,i)=>box(g,1.6-i*.6,.04,.03,HOEHLE,.2,y,1.55));
  /* Wirbelsäule: Schwanz, Rücken, Hals */
  const wirbel=[[-5.8,1.35,.25],[-4.7,1.75,.15],[-3.4,2.55,0],[-1.8,3.15,0],[-.9,3.3,0],[.5,3.42,0],[1.7,3.35,0],[2.7,3.7,0],[3.35,4.15,0]];
  strang(g,wirbel,.07,.17,KNOCHEN2,24);
  for(let i=1;i<=34;i++){ const u=i/35, q=aufKurve(wirbel,u), r=.1+Math.min(.17,u*.4);
    ball(g,r,KNOCHEN,q[0],q[1],q[2],.8,1,1.05); if(i%2===0 && u<.9) strich(g,[q[0],q[1],q[2]],[q[0]-.1,q[1]+r+.2,q[2]],r*.28,KNOCHEN); }
  /* Rippen: gebogen, auf beiden Seiten */
  [[-.55,1.35],[0,1.65],[.55,1.75],[1.1,1.6],[1.65,1.3],[2.15,.95]].forEach(([x,l])=>{ const y=3.34+(x>1.7?.08:0);
    [-1,1].forEach(s=>strang(g,[[x,y,s*.1],[x+.2,y-l*.3,s*.78],[x+.18,y-l*.75,s*.8],[x-.14,y-l,s*.42]],.1,.045,KNOCHEN,10)); });
  /* Becken */
  [-1,1].forEach(s=>{ ball(g,.55,KNOCHEN,-1.15,3.05,s*.42,1.25,.8,.32); ball(g,.2,HOEHLE,-1.25,3.03,s*.57,1.2,.8,.2); strang(g,[[-1.0,2.8,s*.35],[-.45,2.15,s*.25],[-.15,1.95,0]],.14,.09,KNOCHEN2,6); });
  /* zwei kräftige Beine mit drei Zehen */
  [[1,[-.9,2.9,.62],[.3,2.15,.85],[-.5,1.3,.95],[.05,.78,1.0]],[-1,[-1.45,2.9,-.62],[-1.75,1.85,-.85],[-3.1,1.4,-.9],[-2.8,.78,-.9]]].forEach(([s,hu,knie,fers,fuss])=>{
    const c=s>0?KNOCHEN:KNOCHEN2;
    strich(g,hu,knie,.2,c); strich(g,knie,fers,.15,c); strich(g,fers,fuss,.13,c);
    [[hu,.3],[knie,.27],[fers,.2],[fuss,.2]].forEach(([q,r])=>ball(g,r,c,q[0],q[1],q[2]));
    [-.34,0,.34].forEach(z=>{ const e=[fuss[0]+.8-Math.abs(z)*.4,.7,fuss[2]+z]; strich(g,fuss,e,.1,c); ball(g,.11,c,e[0],e[1],e[2],1.4,.75,1); }); });
  /* Brustgürtel und die kleinen Arme (winken freundlich) */
  [-1,1].forEach(s=>{ strang(g,[[2.35,3.2,s*.35],[2.3,2.5,s*.6],[2.55,2.15,s*.6]],.13,.1,KNOCHEN2,5);
    strich(g,[2.55,2.15,s*.6],[3.15,1.85,s*.65],.09,KNOCHEN); strich(g,[3.15,1.85,s*.65],[3.55,2.25,s*.65],.075,KNOCHEN); ball(g,.12,KNOCHEN,3.15,1.85,s*.65);
    [-.12,.12].forEach(v=>strich(g,[3.55,2.25,s*.65],[3.78,2.38+v,s*.65+v*.3],.045,KNOCHEN)); });
  /* Schädel: rund, große Augenhöhle, lächelndes Maul mit kleinen stumpfen Zähnen */
  const k=gruppe(g,3.55,4.25,0); k.userData.lebendig=true; const s0=gruppe(k,0,0,0);
  ball(s0,.78,KNOCHEN,.5,.18,0,1,.92,.82);
  ball(s0,.55,KNOCHEN,1.38,.02,0,1.7,.8,.9); ball(s0,.42,KNOCHEN,2.05,0,0,1.1,.9,1);
  box(s0,1.7,.2,.78,KNOCHEN,1.45,-.27,0);
  [-1,1].forEach(s=>{ scheibe(s0,.31,.08,HOEHLE,.62,.4,s*.62); ring(s0,.34,.085,KNOCHEN2,.62,.4,s*.66); ball(s0,.09,WEISS,.71,.5,s*.69,1,1,.4);
    strang(s0,[[.2,.74,s*.55],[.62,.92,s*.56],[1.05,.68,s*.5]],.1,.09,KNOCHEN,6);
    ball(s0,.15,HOEHLE,.12,-.07,s*.65,.8,1.15,.25); ball(s0,.2,KNOCHEN2,1.32,.17,s*.47,1.5,.65,.25); ball(s0,.085,HOEHLE,2.14,.18,s*.37,1.3,.85,.5);
    for(let i=0;i<8;i++){ const z=kegel(s0,.075,.2,WEISS,.75+i*.22,-.45,s*.35); z.rotation.x=Math.PI; ball(s0,.045,WEISS,.75+i*.22,-.54,s*.35); } });
  /* Unterkiefer, leicht geöffnet und vorn nach oben gebogen */
  [-1,1].forEach(s=>{ strang(s0,[[.15,-.2,s*.55],[.45,-.82,s*.47],[1.25,-1.04,s*.37],[2.15,-.82,s*.18]],.17,.12,KNOCHEN2,14);
    [[.75,-.78],[1.0,-.84],[1.25,-.87],[1.5,-.85],[1.75,-.79],[1.97,-.7]].forEach(([x,y])=>kegel(s0,.06,.16,WEISS,x,y,s*(.42-x*.08))); });
  ball(s0,.14,KNOCHEN2,2.16,-.82,0,1,1,1.6);
  verschmelze(s0);
  /* Haltestangen aus Metall */
  [[-.9,3.1,0],[1.7,3.15,0],[-4.1,1.95,.07]].forEach(([x,y,z])=>{ walze(g,.055,y-.63,0x39424a,x,(y+.63)/2,z); walze(g,.22,.08,0x39424a,x,.66,z); quer(g,.05,.36,0x39424a,x,y-.12,z); });
  verschmelze(g);
  return k;
}
/* Absperrseil vor dem Podest: Messingpfosten mit runden Knöpfen */
function absperrung(p){
  const xs=[-12.1,-9.8,-7.5,-5.2,-2.9,-.6];
  xs.forEach((x,i)=>{ walze(p,.2,.08,MESSING2,x,.04,-8.1); walze(p,.055,.9,MESSING,x,.5,-8.1); ball(p,.12,GOLD,x,1.0,-8.1);
    if(i) strang(p,[[xs[i-1],.92,-8.1],[(x+xs[i-1])/2,.66,-8.1],[x,.92,-8.1]],.045,.045,0x8a2430,8); });
}

/* ---------- Ausgang: der Lastenaufzug ---------- */
function baueAusgang(k,sc,hinten){
  /* beleuchtete Kabine hinter der Wand */
  const kab=gruppe(hinten,AX,0,0);
  box(kab,3.9,.1,3.4,0x8a6a44,0,-.045,-15.05); for(let i=0;i<5;i++) box(kab,.08,.02,3.3,0x5e4630,-1.5+i*.75,.012,-15.05);
  box(kab,4.2,.2,3.3,0x9a8a60,0,4.1,-15.15);
  box(kab,4.2,4.2,.2,0xe8cc8c,0,2.0,-16.85);
  [-1,1].forEach(s=>{ box(kab,.2,4.2,3.2,0xd8b878,s*2.0,2.0,-15.2); box(kab,.12,.14,3.0,MESSING,s*1.86,1.15,-15.2); [-14.4,-15.4,-16.4].forEach(z=>box(kab,.08,3.9,.1,0xa87c42,s*1.87,2,z)); });
  quer(kab,.07,3.6,MESSING,0,1.15,-16.65); [-1.2,0,1.2].forEach(x=>box(kab,.1,3.9,.06,0xa87c42,x,2,-16.72));
  hell(box(kab,1.7,.1,.9,basis(0xfffbe0),0,3.97,-15.4));
  verschmelze(kab); ohneSchatten(kab);
  schein(kab,'rgba(255,240,180,.75)',0,3.7,-15.3,2.6);
  kab.visible=false;
  /* zwei Türen mit Streben, sie gleiten zur Seite */
  const tueren=[-1,1].map(s=>{ const t=gruppe(hinten,AX+s*.95,0,HINTEN+.24); t.userData.lebendig=true; const i=gruppe(t,0,0,0);
    box(i,1.9,3.98,.16,METALL,0,1.99,0);
    [.1,1.32,2.65,3.9].forEach(y=>box(i,1.84,.14,.08,METALL2,0,y,.1)); [-.87,.87].forEach(x=>box(i,.12,3.9,.08,METALL2,x,1.98,.1));
    [[.14,1.28],[1.36,2.61],[2.69,3.86]].forEach(([a,b])=>{ strich(i,[-.82,a,.1],[.82,b,.1],.04,0xb8c2ca); strich(i,[.82,a,.1],[-.82,b,.1],.04,0xb8c2ca); });
    box(i,.07,3.98,.2,0x2a3036,-s*.93,1.99,.02); box(i,.12,.7,.12,MESSING,-s*.74,1.55,.17);
    verschmelze(i); ohneSchatten(i); return { t, s }; });
  /* fester Rahmen: gelb-dunkle Pfosten, Sturz mit Stockwerksanzeige und Pfeil nach oben */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.46,4.1,.7,0x2c3434,s*2.14,2.05,.36); for(let i=0;i<8;i++){ const q=box(r,.47,.22,.04,i%2?0x2c3434:GELB,s*2.14,.3+i*.5,.72); q.rotation.z=s*.35; } box(r,.66,.2,.9,STEIN3,s*2.14,.1,.45); });
  box(r,4.9,.66,.72,0x2c3434,0,4.36,.36); box(r,5.1,.12,.82,MESSING,0,4.74,.4); box(r,4.7,.07,.05,GOLD,0,4.05,.74);
  box(r,2.3,.46,.08,0x14201c,0,4.38,.72);
  [-.75,-.25].forEach((x,i)=>scheibe(r,.13,.06,i?0x4a5a4a:basis(0xffd860),x,4.38,.77));
  const pf=kegel(r,.19,.27,basis(0x8affa0),.55,4.4,.77); pf.scale.z=.05;
  box(r,.14,.14,.02,basis(0x8affa0),.55,4.23,.77);
  /* Seilrad obendrauf */
  ring(r,.3,.065,METALL2,0,5.15,.35); ball(r,.09,GOLD,0,5.15,.35); [0,1,2].forEach(i=>{ const q=box(r,.56,.05,.05,METALL2,0,5.15,.35); q.rotation.z=i*Math.PI/3; }); [-.3,.3].forEach(x=>strich(r,[x,4.75,.35],[x,5.15,.35],.022,SCHWARZ));
  verschmelze(r);
  /* Schwelle mit Riffelblech, flach am Boden */
  const schwelle=gruppe(sc,AX,0,-12.35);
  box(schwelle,3.8,.02,1.4,0x39423e,0,.012,0); [-1,1].forEach(v=>box(schwelle,3.8,.026,.16,GELB,0,.015,v*.62)); for(let i=0;i<9;i++){ const q=box(schwelle,.3,.028,.07,METALL,-1.4+i*.35,.018,(i%2)*.4-.2); q.rotation.y=i%2?.7:-.7; }
  verschmelze(schwelle); ohneSchatten(schwelle);
  /* Riegel mit goldenem Zahlenschloss */
  const sperre=gruppe(hinten,AX,2.4,HINTEN+.55);
  box(sperre,3.7,.18,.1,MESSING2,0,0,0); [-1.75,1.75].forEach(x=>box(sperre,.22,.42,.2,MESSING,x,0,0)); box(sperre,1.6,1.32,.08,0x2c3434,0,.03,.07); box(sperre,1.44,1.16,.09,0xfbf0cc,0,.03,.08);
  const schloss=MUS.zahlenschloss(sperre,0,-.1,.27); schloss.scale.setScalar(1.3);
  verschmelze(sperre); ohneSchatten(sperre);
  const schimmer=schein(hinten,'rgba(255,220,110,.55)',AX,2.45,HINTEN+1.1,1.6);
  const licht=new THREE.PointLight(0xffdf90,0,11,1.5); licht.position.set(AX,3.2,-14.6); sc.add(licht);
  [-1,1].forEach(s=>k.kasten(AX+s*2.15,-13.05,.65,.9));
  k.kasten(AX,-13.05,3.9,.9); /* geschlossene Türen: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Lastenaufzug', einfach:'Großer Aufzug', steh:[AX,-11.2], durch:[AX,-15.1],
    treffer:{x:AX,y:2.4,z:-12.9,b:4.8,h:4.8,t:.8}, schildOben:[AX,3.8,-12.1], glanz:[AX,2.45,-12.4],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.8)), w=a*a*(3-2*a);
      /* jede Tür schiebt sich schmal zusammen in ihren Pfosten */
      tueren.forEach(o=>{ o.t.scale.x=1-.88*w; o.t.position.x=AX+o.s*(.95+.95*w*.9); });
      sperre.visible=auf<.05; schimmer.visible=auf<.05; kab.visible=auf>.02; licht.intensity=1.5*auf; const g=1.5+Math.sin(t*2.4)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Urzeit-Wandbilder ---------- */
function urzeitBild(art,b,h){
  const W=Math.round(b*80), Hh=Math.round(h*80);
  return bild(W,Hh,(g)=>{
    const v=g.createLinearGradient(0,0,0,Hh); v.addColorStop(0,['#274a52','#35506a','#1f4436'][art]); v.addColorStop(.75,['#5a7a62','#a89a6a','#4a7a52'][art]); v.addColorStop(1,'#33503a'); g.fillStyle=v; g.fillRect(0,0,W,Hh);
    const huegel=(f,y,a,p)=>{ g.fillStyle=f; g.beginPath(); g.moveTo(0,Hh); for(let x=0;x<=W+8;x+=8) g.lineTo(x,Hh*y+Math.sin(x/W*p+art)*Hh*a); g.lineTo(W,Hh); g.fill(); };
    const wedel=(x,y,r,f)=>{ g.strokeStyle=f; g.lineWidth=Math.max(3,r*.09); g.lineCap='round'; for(let i=0;i<7;i++){ const a=-Math.PI*(.05+i*.15); g.beginPath(); g.moveTo(x,y); g.quadraticCurveTo(x+Math.cos(a)*r*.6,y+Math.sin(a)*r,x+Math.cos(a)*r,y+Math.sin(a)*r*.55); g.stroke(); } };
    if(art===0){ /* Vulkan in der Ferne mit weicher Wolke */
      g.fillStyle='#3c5450'; g.beginPath(); g.moveTo(W*.56,Hh*.72); g.lineTo(W*.72,Hh*.28); g.lineTo(W*.77,Hh*.28); g.lineTo(W*.95,Hh*.72); g.fill();
      g.fillStyle='rgba(210,215,200,.5)'; [[.74,.22,.05],[.77,.14,.065],[.82,.09,.05]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(W*x,Hh*y,W*r*.7,0,7); g.fill(); }); }
    huegel('#37594a',.66,.07,9); huegel('#284638',.8,.05,14);
    if(art===1){ /* Dreihorn auf der Wiese */
      g.fillStyle='#1c2e26'; const X=W*.5, Y=Hh*.66, u=W/260;
      g.beginPath(); g.ellipse(X,Y,52*u,30*u,0,0,7); g.fill(); [-32,-12,18,36].forEach(a=>g.fillRect(X+a*u,Y+14*u,13*u,30*u));
      g.beginPath(); g.moveTo(X-45*u,Y-8*u); g.lineTo(X-98*u,Y+22*u); g.lineTo(X-40*u,Y+16*u); g.fill();
      g.beginPath(); g.arc(X+50*u,Y-18*u,24*u,0,7); g.fill(); g.beginPath(); g.ellipse(X+70*u,Y-4*u,24*u,15*u,.4,0,7); g.fill();
      [[66,-20,94,-48],[56,-26,72,-60],[86,-6,100,-16]].forEach(([a,c,d,e])=>{ g.beginPath(); g.moveTo(X+(a-6)*u,Y+c*u); g.lineTo(X+d*u,Y+e*u); g.lineTo(X+(a+6)*u,Y+(c+7)*u); g.fill(); }); }
    else if(art===0){ /* Langhals */
      g.fillStyle='#1c302a'; g.strokeStyle='#1c302a'; g.lineCap='round'; const X=W*.28, Y=Hh*.7, u=Hh/340;
      g.beginPath(); g.ellipse(X,Y,70*u,38*u,0,0,7); g.fill(); [-45,-18,22,45].forEach(a=>g.fillRect(X+a*u-8*u,Y+15*u,17*u,52*u));
      g.lineWidth=22*u; g.beginPath(); g.moveTo(X+50*u,Y-10*u); g.quadraticCurveTo(X+120*u,Y-40*u,X+118*u,Y-135*u); g.stroke(); g.beginPath(); g.ellipse(X+132*u,Y-142*u,26*u,15*u,0,0,7); g.fill();
      g.lineWidth=14*u; g.beginPath(); g.moveTo(X-55*u,Y); g.quadraticCurveTo(X-120*u,Y+10*u,X-155*u,Y+40*u); g.stroke(); }
    else { /* Farnwald mit Flugsauriern */
      g.strokeStyle='#4a3a24'; [[.22,.34],[.55,.5],[.8,.28]].forEach(([x,y])=>{ g.lineWidth=W*.025; g.beginPath(); g.moveTo(W*x,Hh*.86); g.quadraticCurveTo(W*x+W*.04,Hh*.6,W*x,Hh*y); g.stroke(); wedel(W*x,Hh*y,W*.17,'#6aa85a'); g.strokeStyle='#4a3a24'; });
      g.fillStyle='#18281e'; [[.4,.18,1],[.68,.1,.7]].forEach(([x,y,s])=>{ const u=W/300*s, X=W*x, Y=Hh*y; g.beginPath(); g.moveTo(X-55*u,Y-18*u); g.quadraticCurveTo(X-20*u,Y-6*u,X,Y); g.quadraticCurveTo(X+20*u,Y-6*u,X+55*u,Y-18*u); g.quadraticCurveTo(X+20*u,Y+14*u,X,Y+12*u); g.quadraticCurveTo(X-20*u,Y+14*u,X-55*u,Y-18*u); g.fill(); }); }
    for(let i=0;i<9;i++) wedel(W*(i+.3)/9+((i*37)%20)-10,Hh*(.97-(i%3)*.04),Hh*(.14+(i%4)*.025),['#5a9a4a','#3f7a42','#7aaa58'][i%3]);
  });
}
function wandSchmuck(k,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  /* großes Wandbild hinter dem Skelett (dunkel, damit die Knochen leuchten) */
  box(h,12.5,4.55,.1,HOLZ3,-6.4,3.7,HINTEN+.11); MUS.tafel(h,urzeitBild(0,12.2,4.3),12.2,4.3,-6.4,3.7,HINTEN+.18);
  [[L,-1,-7.6,5.4,1],[L,-1,2.2,5.8,2],[L,-1,10.2,4.2,0],[R,1,-8.2,5.6,2],[R,1,-1.7,4.4,0],[R,1,4.4,5.4,1],[R,1,10.6,4.0,0]].forEach(([w,s,z,b,art])=>{
    box(w,.1,3.15,b+.3,HOLZ3,s*(B/2-.09),3.55,z); const m=MUS.tafel(w,urzeitBild(art,b,2.9),b,2.9,s*(B/2-.16),3.55,z); m.rotation.y=-s*Math.PI/2;
    box(w,.34,.12,1.0,MESSING2,s*(B/2-.22),5.36,z); hell(box(w,.2,.05,.8,basis(0xfff0b8),s*(B/2-.3),5.28,z)); });
  /* hängende Ranken oben an den Wänden */
  const ranken=[];
  const ranke=(x,z,n,dx,dz)=>{ for(let i=0;i<n;i++){ const y=6.25-i*.2; ranken.push([x+Math.sin(i*1.7)*.14*dx,y,z+Math.sin(i*1.7)*.14*dz,.17-i*.006,.09,.12,i%2?FARN:FARN3,i*1.9,0,(i%3-1)*.5]); } };
  [-17.5,-13.2,.4,7.4,15.6].forEach((x,i)=>ranke(x,HINTEN+.2,6+(i*3)%5,1,0));
  MUS.viele(h,GROB,ranken.slice());
  [[L,-1],[R,1]].forEach(([w,s])=>{ ranken.length=0; [-12.4,-3.6,-1.2,7.2,13].forEach((z,i)=>ranke(s*(B/2-.2),z,5+(i*3+s+1)%6,0,1)); MUS.viele(w,GROB,ranken.slice()); });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Baumfarn in Ecken (hoch, wird durchsichtig, wenn er die Figur verdeckt) ---------- */
function baumfarn(k,sc,x,z,hoehe){
  const g=gruppe(sc,x,0,z), blaetter=[];
  rohr(g,.62,.46,.6,0x8a5236,0,.3,0); walze(g,.66,.12,0x6a3a24,0,.62,0);
  rohr(g,.16,.26,hoehe,0x5e4228,0,.6+hoehe/2,0); for(let y=1.0;y<hoehe;y+=.42) walze(g,.26-(y/hoehe)*.07,.1,0x46301c,0,y,0);
  farn(blaetter,0,hoehe+.55,0,1.45,9,x); MUS.viele(g,GROB,blaetter);
  verschmelze(g); k.kreis(x,z,.75); k.verdecker(g,x,z,.9);
}

/* ---------- Flugsaurier-Modell an Seilen ---------- */
function flugsaurier(k,sc){
  const p=gruppe(sc,-15.9,9.9,-2.8); p.userData.lebendig=true; const m=gruppe(p,0,-4.3,0); m.rotation.y=.35;
  const HAUT=0xd08a4a, HAUT2=0xa8603a, FLUEGEL=0xe8b070;
  const rumpf=gruppe(m,0,0,0);
  ball(rumpf,.4,HAUT,0,0,0,1.5,.85,.85); strang(rumpf,[[.4,.1,0],[.75,.35,.05],[1.0,.45,.12]],.17,.14,HAUT,5);
  ball(rumpf,.27,HAUT,1.12,.5,.14); const sn=kegel(rumpf,.13,.85,0xf0d070,1.65,.42,.22); sn.rotation.set(0,-.15,-Math.PI/2-.1);
  const ka=kegel(rumpf,.12,.6,HAUT2,.82,.76,.1); ka.rotation.z=.95;
  [-.05,.33].forEach(z=>{ ball(rumpf,.075,WEISS,1.24,.58,z); ball(rumpf,.04,SCHWARZ,1.29,.58,z+(z>0?.05:-.05)); });
  [-.18,.18].forEach(z=>strich(rumpf,[-.45,-.1,z],[-.95,-.35,z*1.4],.05,HAUT2));
  verschmelze(rumpf);
  const fluegel=[-1,1].map(s=>{ const f=gruppe(m,0,.1,s*.2);
    /* spitz zulaufende Flughaut */
    const haut=kegel(f,1,1,FLUEGEL,-.05,.09,s*1.12); haut.rotation.x=s*Math.PI/2; haut.scale.set(.68,2.05,.04);
    strang(f,[[.3,.02,0],[.55,.12,s*.75],[.2,.18,s*1.4],[-.35,.19,s*2.15]],.09,.035,HAUT2,8); verschmelze(f); return f; });
  [[.3,0],[-.4,0],[.2,1.5],[.2,-1.5]].forEach(([x,z])=>{ const c=Math.cos(.35), si=Math.sin(.35); strich(p,[0,0,0],[x*c+z*si,-4.15,-x*si+z*c],.012,0xd8ccb0); });
  ohneSchatten(p);
  k.anim.push(t=>{ p.rotation.z=Math.sin(t*.75)*.09; p.rotation.x=Math.sin(t*.53+1)*.05; fluegel.forEach((f,i)=>f.rotation.x=(i?-1:1)*(Math.sin(t*1.5)*.14+.05)); });
}

/* ---------- Boden-Deko: Läufer, Farne, Felsen, Bänke ---------- */
function bodenDeko(k,sc){
  const blaetter=[], steine=[], moos=[], deko=gruppe(sc,0,0,0);
  MUS.teppich(sc,0,3.4,5.0,10.0,0x2f5a44,0x9a8a52);
  MUS.teppich(sc,AX,-8.6,2.8,5.2,0x6a3a30,0xa89458);
  /* Felsen mit Farnen an den Wänden und Ecken: [x, z, Größe, Drehung, Radius] */
  [[-16.4,-7.6,1.0,1.5],[16.4,-8.8,1.0,-1.5],[-16.5,.6,.9,1.7],[16.6,1.9,.85,-1.4],[-15.9,11.6,1.1,.5],[15.9,11.5,1.15,-.6],[9.3,-11.9,.75,.1]].forEach(([x,z,gr,d])=>{
    fels(steine,moos,x,z,gr,d); k.kreis(x,z,1.35*gr); });
  [[-16.3,-5.7,1.2],[16.3,-10.9,1.1],[-16.4,2.7,1.0],[16.5,-.2,.95],[-14,12,1.0],[13.8,12,1.05],[7.5,-12.4,.85],[14.9,-12.2,1.0],[-17,-10.6,.7]].forEach(([x,z,gr],i)=>{
    farn(blaetter,x,.12,z,gr,9,i); k.kreis(x,z,.6*gr); });
  /* niedrige Pflanzkübel mit Farnen und Steinen am vorderen Rand */
  [[-8.6,11.7,4.2],[-.4,12.2,5.0],[8.2,11.7,4.2]].forEach(([x,z,b],n)=>{
    box(deko,b,.46,1.0,STEIN2,x,.23,z); box(deko,b+.16,.1,1.14,0x9aa492,x,.49,z); box(deko,b-.3,.06,.74,ERDE2,x,.54,z);
    for(let i=0;i<3;i++) farn(blaetter,x+(i-1)*b*.31,.56,z,.62+(i%2)*.1,8,i+n);
    k.kasten(x,z,b+.16,1.14); });
  /* Museumsbänke */
  [[-5.8,8.4,.12],[11.4,10.0,-.2]].forEach(([x,z,d])=>{ const b=gruppe(deko,x,0,z); b.rotation.y=d; box(b,2.7,.18,.85,0x2f6a52,0,.62,0); box(b,2.8,.1,.95,HOLZ,0,.5,0); [-1.15,1.15].forEach(a=>{ box(b,.16,.5,.75,HOLZ2,a,.25,0); }); box(b,2.2,.08,.1,HOLZ2,0,.2,0); k.kasten(x,z,2.9,1.4); });
  absperrung(deko);
  verschmelze(deko);
  MUS.viele(sc,GROB,blaetter);
  const dode=new THREE.DodecahedronGeometry(1);
  MUS.viele(sc,dode,steine).castShadow=true; MUS.viele(sc,GROB,moos);
}

/* ---------- Leben: wippende Farnwedel, Libellen, Glühpünktchen ---------- */
function libelle(k,sc,x,y,z,start,farbe){
  const g=gruppe(sc,x,y,z); g.userData.lebendig=true; g.scale.setScalar(.65); const r=gruppe(g,0,0,0);
  strich(r,[-.55,0,0],[.12,0,0],.05,farbe); ball(r,.13,farbe,.18,0,0); [-.08,.08].forEach(v=>ball(r,.07,SCHWARZ,.3,.04,v));
  verschmelze(r); ohneSchatten(r);
  const glas=new THREE.MeshBasicMaterial({color:0xdffcff,transparent:true,opacity:.65,depthWrite:false});
  const f=[-1,1].map(s=>{ const q=gruppe(g,0,.05,0); [0,-.2].forEach(a=>hell(ball(q,.3,glas,a,0,s*.3,.35,.05,1))); return q; });
  k.anim.push(t=>{ const a=t*.5+start; g.position.set(x+Math.sin(a)*1.7,y+Math.sin(t*2.1+start)*.25,z+Math.sin(a*2)*.7); g.rotation.y=Math.cos(a)>0?0:Math.PI; f.forEach((q,i)=>q.rotation.x=(i?-1:1)*Math.sin(t*28)*.45); });
}

function baue(k){
  const sc=k.scene;
  const h=MUS.huelle(k,{ B,T,H, himmelLicht:0xe4f6dc, grund:0x3c4e38, staerke:.74, sonne:0xfff0cc, sonneStaerke:.4,
    wandBild:MUS.quaderBild([76,108,88],'#334c3e',8), bodenBild:MUS.fliesenBild([128,136,114],[112,122,102],'#566050',4), bodenWdh:[B/9,T/9],
    leiste:0x2c4034, sockelFarbe:0x44604c, oeffnung:{x:AX,b:3.8,h:4.0} });
  sc.background=new THREE.Color(0x0e1812);
  const tuer=baueAusgang(k,sc,h.hinten);
  wandSchmuck(k,h.hinten,h.links,h.rechts);

  const schaedel=skelett(sc);
  k.kasten(-6.3,-11.0,12.1,5.2); /* Podest bis zur Wand, vorn mit Absperrung */
  k.anim.push(t=>{ schaedel.rotation.z=Math.sin(t*.8)*.025; });

  baumfarn(k,sc,16.4,8.6,3.2); baumfarn(k,sc,-16.3,8.4,3.0);
  flugsaurier(k,sc);
  bodenDeko(k,sc);

  /* ---------- Licht ---------- */
  const licht=(x,y,z,c,s,w)=>{ const l=new THREE.PointLight(c,s,w,1.5); l.position.set(x,y,z); sc.add(l); };
  licht(-4.5,5.0,-6.6,0xffe8b8,.7,14);
  licht(-11,4.6,4.5,0xd8ffd0,.32,13);
  licht(10.5,4.6,2.5,0xffe0a8,.4,14);

  /* ---------- Libellen und schwebende Glühpünktchen ---------- */
  libelle(k,sc,-14.6,2.9,9.4,0,0x3ac0b0); libelle(k,sc,13.4,2.9,10.4,2.7,0xe08a30);
  const n=46, funken=new THREE.InstancedMesh(GEO.box,basis(0xeaffb0,{transparent:true,opacity:.8,depthWrite:false}),n), o=new THREE.Object3D(), D=[];
  for(let i=0;i<n;i++) D.push([[-14.5,14.8,-14,13.5,-1][i%5],[-8,-9,8,8.5,11.6][i%5],zufall()*6.283,.3+zufall()*1.7,zufall(),.025+zufall()*.03]);
  funken.frustumCulled=false; sc.add(funken);
  k.anim.push(t=>{ D.forEach((d,i)=>{ const u=(d[4]+t*.025)%1, a=d[2]+t*.2; o.position.set(d[0]+Math.cos(a)*d[3],.6+u*3.4,d[1]+Math.sin(a)*d[3]); o.rotation.set(t+i,t*.6,0); o.scale.setScalar(d[5]*Math.sin(u*Math.PI)); o.updateMatrix(); funken.setMatrixAt(i,o.matrix); }); funken.instanceMatrix.needsUpdate=true; });

  /* eine Museumsmaus */
  maeuschen(k,[[2.6,-6.4],[2.9,-2.4],[8.6,-4.4],[7.4,-7.6]],1.5,2);

  return { tuer, start:[-.4,-3.2] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.6,-8.4],[-10,-6.4],[-4.5,-6.6],[.8,-7.2],[9,-9.6],[13,-10],[-14.8,-.6],[-8.6,.4],[-3,1.2],[3,2],
  [15,-3.8],[9.2,-5.6],[15,2.2],[-15,8.8],[-9.6,9.6],[-2.8,9.8],[3.2,9.4],[13.8,9.2],[-13.2,2],[10.6,3.4]];

/* Zeitleiste der Urzeit: vier Zeitalter als farbige Felder mit Zeitpfeil */
function zeitBild(){
  return bild(768,352,(g)=>{ g.fillStyle='#f2e8cc'; g.fillRect(0,0,768,352);
    g.fillStyle='#4a3a1c'; g.font='700 40px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('Zeitleiste der Urzeit',384,34);
    ['#7ab8d0','#9ac070','#e0b050','#d08060'].forEach((f,i)=>{ const x=20+i*184; g.fillStyle=f; g.fillRect(x,66,176,188); g.strokeStyle='#4a3a1c'; g.lineWidth=4; g.strokeRect(x,66,176,188);
      g.fillStyle='#1e2a1c'; g.strokeStyle='#1e2a1c'; const X=x+88, Y=172; g.lineWidth=12; g.lineCap='round';
      if(i===0){ g.beginPath(); g.ellipse(X-10,Y,48,28,0,0,7); g.fill(); g.beginPath(); g.moveTo(X+30,Y); g.lineTo(X+66,Y-28); g.lineTo(X+66,Y+28); g.fill(); g.fillStyle='#fff'; g.beginPath(); g.arc(X-34,Y-7,7,0,7); g.fill(); }
      else if(i===1){ g.beginPath(); g.moveTo(X,Y+66); g.quadraticCurveTo(X-8,Y,X+10,Y-60); g.stroke(); for(let j=0;j<5;j++) [-1,1].forEach(s=>{ g.beginPath(); g.moveTo(X-2+j,Y+42-j*24); g.quadraticCurveTo(X+s*30,Y+30-j*24,X+s*(58-j*8),Y+6-j*22); g.stroke(); }); }
      else if(i===2){ g.beginPath(); g.ellipse(X-8,Y+12,44,26,0,0,7); g.fill(); [-30,12].forEach(a=>g.fillRect(X+a,Y+24,14,40)); g.lineWidth=16; g.beginPath(); g.moveTo(X+22,Y+6); g.quadraticCurveTo(X+56,Y-10,X+50,Y-56); g.stroke(); g.beginPath(); g.ellipse(X+60,Y-60,18,11,0,0,7); g.fill(); g.beginPath(); g.moveTo(X-40,Y+10); g.lineTo(X-80,Y+44); g.stroke(); }
      else { g.beginPath(); g.ellipse(X-6,Y,50,42,0,0,7); g.fill(); [-40,16].forEach(a=>g.fillRect(X+a,Y+22,20,44)); g.beginPath(); g.arc(X+36,Y-20,28,0,7); g.fill(); g.lineWidth=13; g.beginPath(); g.moveTo(X+54,Y-8); g.quadraticCurveTo(X+72,Y+30,X+58,Y+60); g.stroke(); g.strokeStyle='#fff8e0'; g.lineWidth=8; g.beginPath(); g.moveTo(X+42,Y); g.quadraticCurveTo(X+46,Y+44,X+80,Y+24); g.stroke(); } });
    g.fillStyle='#4a3a1c'; g.fillRect(24,288,690,12); g.beginPath(); g.moveTo(710,270); g.lineTo(752,294); g.lineTo(710,318); g.fill();
    for(let i=0;i<4;i++){ g.beginPath(); g.arc(108+i*184,294,15,0,7); g.fill(); g.fillRect(105+i*184,254,6,34); }
    g.font='700 26px Andika, Arial, sans-serif'; g.fillText('früher',66,332); g.fillText('später',690,332); });
}

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-11.6, z:-2.8, steh:[-11.4,-.4], r:1.45, treffer:[2.9,3.0,2.8], baue(g,k){ /* 1 Dino-Ei im Nest */
      rohr(g,1.35,1.5,.5,STEIN,0,.25,0); walze(g,1.42,.1,0x9aa492,0,.55,0); walze(g,1.1,.14,ERDE,0,.65,0);
      /* Nest aus geflochtenen Zweigen */
      [[1.08,.76,0],[1.16,.94,.9],[1.02,1.1,2.1]].forEach(([r,y,d],i)=>liegend(ring(g,r,.15,[0x9a7438,0xb89048,0x7a5828][i],0,y,0)));
      for(let i=0;i<22;i++){ const a=i*Math.PI*2/22, b=a+.7; strich(g,[Math.cos(a)*1.2,.7+(i%3)*.1,Math.sin(a)*1.2],[Math.cos(b)*1.0,1.1+(i%2)*.16,Math.sin(b)*1.0],.045,i%2?0xc8a458:0x8a6430); }
      const EI=0xf2ead0;
      ball(g,.72,EI,0,1.62,0,1,1.34,1);
      /* grüne Tupfen und ein Riss */
      [[.2,.35,.16],[1.35,-.15,.2],[-.75,-.3,.15],[-1.5,.4,.17],[2.5,.15,.18],[.65,-.5,.11],[-.2,-.05,.09],[3.5,-.2,.16]].forEach(([a,v,r])=>{ const c=Math.sqrt(1-v*v); const q=ball(g,r,0x7aa860,Math.sin(a)*c*.7,1.62+v*.95,Math.cos(a)*c*.7,1,1.15,.28); q.rotation.y=a; });
      const R=[[-.34,2.28],[-.18,2.14],[-.28,2.0],[-.06,1.9],[-.14,1.72]].map(([x,y])=>{ const w=(y-1.62)/.97; return [x,y,Math.sqrt(Math.max(0,.52*(1-w*w)-x*x))+.02]; });
      for(let i=1;i<R.length;i++) strich(g,R[i-1],R[i],.022,HOEHLE);
      const gl=schein(g,'rgba(255,240,180,.45)',.35,2.35,.75,.7); k.anim.push(t=>{ gl.material.opacity=Math.max(0,Math.sin(t*1.7)); }); } },
  { x:-7.4, z:4.6, dreh:.18, steh:[-7.0,6.5], kasten:[4.3,1.6], treffer:[4.4,3.4,1.5], baue(g){ /* 2 Mammut-Stoßzahn auf einem Holzgestell */
      box(g,3.9,.34,1.3,HOLZ2,0,.17,0); box(g,3.6,.08,1.05,ROT,0,.37,0); box(g,1.2,.2,.03,MESSING,0,.17,.66);
      [[-1.25,.85],[1.1,1.5]].forEach(([x,h])=>{ walze(g,.13,h,HOLZ,x,.38+h/2,0); box(g,.5,.14,.7,HOLZ,x,.4+h,0); [-.28,.28].forEach(z=>box(g,.46,.28,.12,HOLZ3,x,.54+h,z)); });
      /* der lange, gebogene Zahn: dickes Ende links gerade abgeschnitten, dünne Spitze steil nach oben */
      const Z=[[-1.78,1.12,0],[-1.15,1.55,.04],[0,1.72,.1],[1.05,2.1,.08],[1.65,2.75,0],[1.72,3.55,-.08]], dick=u=>.03+.33*Math.pow(1-u,.85);
      schlauch(g,Z,dick,0xf2e4bc,60,0,1,false); ball(g,.03,0xf2e4bc,1.72,3.55,-.08);
      schlauch(g,Z,u=>dick(u)+.05,MESSING,5,0,.075,false);
      schlauch(g,Z,u=>dick(u)+.075,GOLD,2,0,.012,false); schlauch(g,Z,u=>dick(u)+.075,GOLD,2,.068,.082,false);
      schlauch(g,Z,u=>dick(u)+.04,0xa88458,1,0,.004,true); } },
  { x:7.8, z:-1.4, dreh:-.2, steh:[7.4,.8], kasten:[3.2,2.4], treffer:[3.1,2.2,2.2], baue(g){ /* 3 Ausgrabungskiste: Holzkiste voller Sand mit Knochen und Pinsel */
      box(g,2.9,.12,2.0,HOLZ3,0,.06,0);
      [-1,1].forEach(s=>{ [0,1,2].forEach(i=>{ box(g,2.9,.3,.14,i%2?HOLZ:0xa87040,0,.26+i*.33,s*.95); box(g,.14,.3,1.9,i%2?0xa87040:HOLZ,s*1.38,.26+i*.33,0); }); });
      [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.24,1.1,.24,HOLZ2,a*1.4,.57,b*.97)));
      box(g,2.64,.2,1.78,SAND,0,.9,0); ball(g,.7,SAND,-.4,.95,-.1,1.4,.42,1); ball(g,.5,SAND2,.65,.96,.25,1.2,.35,1);
      /* Knochen schauen aus dem Sand */
      const knochen=(a,b,r)=>{ strich(g,a,b,r,WEISS); [a,b].forEach(p=>[-1,1].forEach(s=>ball(g,r*1.5,WEISS,p[0],p[1],p[2]+s*r*1.1))); };
      knochen([-1.0,1.12,.2],[.05,1.62,-.15],.11); knochen([.4,1.12,.45],[1.05,1.2,.1],.07);
      [0,1,2].forEach(i=>strang(g,[[-.2+i*.28,1.05,-.65],[-.05+i*.28,1.42,-.5],[.2+i*.28,1.38,-.25]],.055,.03,KNOCHEN,6));
      /* Pinsel lehnt an der Kiste, Schild vorn */
      strich(g,[1.12,1.1,.5],[1.5,1.75,.95],.07,0xc0503a); box(g,.34,.22,.14,METALL,1.07,1.04,.44).rotation.z=.55; ball(g,.2,0x4a3020,.97,.98,.36,1,.75,.7);
      box(g,1.1,.42,.03,PAPIER,-.2,.62,1.04); [.7,.56].forEach((y,i)=>box(g,.8-i*.26,.05,.03,HOLZ3,-.2,y,1.06)); } },
  { x:12.2, z:-5.8, steh:[11.6,-3.5], r:1.35, treffer:[2.7,3.5,2.5], baue(g,k){ /* 4 Meteorit auf einem Sockel, mit glühenden Spalten */
      rohr(g,1.25,1.4,.22,STEIN3,0,.11,0); rohr(g,.85,1.0,.9,0x2a2e3c,0,.67,0); walze(g,1.1,.14,MESSING,0,1.18,0); walze(g,.95,.1,0x6a2430,0,1.29,0);
      /* kantiger Brocken aus mehreren Vielflächnern: [x,y,z,Radius,Farbe] */
      const dode=new THREE.DodecahedronGeometry(1), S=0x4a4038, S2=0x5c5046;
      const brocken=[[0,2.15,0,.95,S],[-.55,2.42,.15,.52,S2],[.62,2.38,.05,.55,S],[.48,1.78,.3,.5,S2],[-.62,1.82,.15,.5,S],[.05,2.78,-.1,.46,S2],[0,1.9,-.55,.6,S]];
      const formen=brocken.map(([x,y,z,r,c],i)=>{ const q=teil(g,dode,c,x,y,z,r*(i?1:1.1),r*(i?.92:.95),r), d=[i*.7,i*1.3,i*.4]; q.rotation.set(d[0],d[1],d[2]);
        return { m:[x,y,z], s:[r*(i?1:1.1),r*(i?.92:.95),r], d }; });
      /* vorderste Oberfläche an der Stelle (x,y): Schnitt mit den zwölf Flächen jedes Brockens */
      const F=1.618, normalen=[]; [-1,1].forEach(a=>[-1,1].forEach(b=>normalen.push([0,a*F,b],[a,0,b*F],[a*F,b,0])));
      const dreh=(v,[a,b,c])=>{ let [x,y,z]=v; [x,y]=[x*Math.cos(c)-y*Math.sin(c),x*Math.sin(c)+y*Math.cos(c)]; [x,z]=[x*Math.cos(b)+z*Math.sin(b),-x*Math.sin(b)+z*Math.cos(b)]; [y,z]=[y*Math.cos(a)-z*Math.sin(a),y*Math.sin(a)+z*Math.cos(a)]; return [x,y,z]; };
      const flaechen=formen.map(o=>normalen.map(n=>dreh(n.map((v,j)=>v/Math.hypot(1,F)/o.s[j]),o.d)));
      const vorn=(x,y)=>formen.reduce((best,o,i)=>{ let lo=-9, hi=9; flaechen[i].forEach(n=>{ const rest=.7947-n[0]*(x-o.m[0])-n[1]*(y-o.m[1]); if(Math.abs(n[2])<1e-6){ if(rest<0) hi=-99; } else if(n[2]>0) hi=Math.min(hi,rest/n[2]); else lo=Math.max(lo,rest/n[2]); });
        return hi>=lo ? Math.max(best,o.m[2]+hi) : best; },.35);
      /* flache dunkle Mulden, unregelmäßig verteilt: [x,y,Breite,Höhe,Drehung] */
      [[-.55,1.98,.24,.13,.5],[.3,2.74,.16,.09,-.4],[.66,2.2,.1,.17,.2],[.3,1.66,.13,.08,.9]].forEach(([x,y,b,h,d])=>{ const q=teil(g,dode,0x2c241e,x,y,vorn(x,y)-.02,b,h,.07); q.rotation.z=d; });
      /* kleine metallisch glänzende Sprenkel */
      const metall=new THREE.MeshPhongMaterial({color:0x9a9488,emissive:0x2a2620,specular:0xffffff,shininess:80,flatShading:true});
      [[-.68,2.5],[-.4,2.2],[-.3,2.62],[.1,2.9],[.5,2.55],[.82,2.42],[.4,2.12],[.62,1.7],[.1,1.55],[-.3,1.75],[-.72,1.7],[-.15,2.35],[.22,2.05],[-.5,2.7]].forEach(([x,y],i)=>{ const q=teil(g,dode,metall,x,y,vorn(x,y)+.01,.045+(i%3)*.014,.035+(i%2)*.015,.03); q.rotation.z=i; });
      const glut=basis(0xff9a30);
      [[[-.05,2.65],[.12,2.42],[-.04,2.18],[.16,1.94],[.04,1.7]],[[-.04,2.18],[-.28,2.04],[-.36,1.78]],[[.12,2.42],[.38,2.4],[.48,2.62]]].forEach(L=>{ for(let i=1;i<L.length;i++){ const a=L[i-1], b=L[i], m=[(a[0]+b[0])/2,(a[1]+b[1])/2]; [[a,m],[m,b]].forEach(([u,v])=>strich(g,[u[0],u[1],vorn(u[0],u[1])+.025],[v[0],v[1],vorn(v[0],v[1])+.025],.042,glut)); } });
      const gl=schein(g,'rgba(255,150,60,.55)',0,2.15,.6,2.6);
      const l=new THREE.PointLight(0xff9a40,.55,6,1.5); l.position.set(12.2,2.4,-4.2); k.scene.add(l);
      const st=[0,1,2].map(i=>schein(g,'rgba(255,230,160,.9)',0,3,0,.32));
      k.anim.push(t=>{ gl.material.opacity=.7+Math.sin(t*2.2)*.3; l.intensity=.5+Math.sin(t*2.2)*.12; st.forEach((s,i)=>{ const a=t*.8+i*2.1; s.position.set(Math.cos(a)*1.25,2.2+Math.sin(a*1.7+i)*.7,Math.sin(a)*1.1); }); }); } },
  { x:-15.3, z:HINTEN, wand:'hinten', steh:[-14.9,-10.9], kasten:[3.6,1.0], treffer:[3.4,2.7,.9], trefferY:1.0, baue(g){ /* 5 Ammoniten-Fossil in einer Steinplatte an der Wand */
      box(g,3.3,3.2,.16,HOLZ2,0,2.7,.09); box(g,3.0,2.9,.3,0xc8b890,0,2.7,.17); box(g,2.8,2.7,.08,0xb4a276,0,2.7,.33);
      scheibe(g,1.24,.08,0xe4d4a8,0,2.72,.38);
      /* Schneckenhaus: Spirale wird nach innen schmaler, mit Rippen */
      const P=u=>{ const a=-.5+u*Math.PI*5.4, r=1.0*Math.pow(1-u,1.25)+.06; return [Math.cos(a)*r,2.72+Math.sin(a)*r,.48]; };
      let alt=P(0);
      for(let i=1;i<=70;i++){ const u=i/70, q=P(u), d=.2*(1-u)+.045; strich(g,alt,q,d,0xa86a38); ball(g,d,0xa86a38,q[0],q[1],q[2]); alt=q;
        if(i%2===0 && u<.8){ const l=Math.hypot(q[0],q[1]-2.72), x=q[0]/l, y=(q[1]-2.72)/l; strich(g,[q[0]-x*d*.9,q[1]-y*d*.9,.64-u*.1],[q[0]+x*d*.95,q[1]+y*d*.95,.6-u*.1],d*.24,0xf0d8a0); } }
      ball(g,.1,0xf0d8a0,0,2.72,.5);
      [-1,1].forEach(a=>[-1,1].forEach(b=>ball(g,.09,MESSING,a*1.38,2.7+b*1.33,.36)));
      box(g,1.2,.3,.1,PAPIER,0,.92,.12); [.98,.86].forEach((y,i)=>box(g,.9-i*.3,.04,.03,HOLZ3,0,y,.18)); } },
  { x:11.9, z:HINTEN, wand:'hinten', steh:[11.6,-10.6], kasten:[5.6,1.0], treffer:[5.5,3.0,.9], trefferY:1.1, baue(g){ /* 6 Zeitleiste der Urzeit */
      box(g,5.4,2.8,.2,HOLZ2,0,2.6,.11); box(g,5.15,2.55,.2,MESSING,0,2.6,.14);
      MUS.tafel(g,zeitBild(),4.96,2.36,0,2.6,.26);
      [-2.62,2.62].forEach(x=>[1.3,3.9].forEach(y=>ball(g,.12,GOLD,x,y,.26)));
      box(g,5.0,.14,.45,HOLZ,0,1.12,.25); [-2.0,2.0].forEach(x=>box(g,.18,.36,.3,HOLZ2,x,.9,.18));
      [0,1,2,3].forEach(i=>ball(g,.12,[0x4a90c0,0x5a9a40,0xd89020,0xc05838][i],-1.65+i*1.1,1.3,.34)); } },
  { x:-13.2, z:5.2, dreh:.45, steh:[-11.6,7.0], r:1.25, treffer:[2.8,3.4,1.9], baue(g,k){ /* 7 Forscherpult mit aufgeschlagenem Buch, Lampe und Lupe */
      box(g,1.7,.16,1.2,HOLZ3,0,.08,0); box(g,.5,1.5,.42,HOLZ2,0,.9,0); box(g,.72,.14,.62,MESSING2,0,1.62,0); box(g,.66,.1,.56,HOLZ,0,.24,0);
      const p=gruppe(g,0,1.95,.05); p.rotation.x=.5;
      box(p,2.3,.14,1.5,HOLZ,0,0,0); box(p,2.34,.14,.12,HOLZ2,0,.07,.74);
      box(p,2.04,.1,1.24,0x7a2430,0,.11,-.02);
      [-1,1].forEach(s=>{ const q=gruppe(p,s*.48,.2,-.02); q.rotation.z=s*.06; box(q,.94,.07,1.14,WEISS,0,0,0); for(let i=0;i<6;i++){ if(s>0&&i<3) continue; box(q,.7-(i%3)*.08,.015,.05,0x6a6258,0,.045,-.42+i*.17); } });
      /* gezeichneter Dino auf der rechten Seite */
      ball(p,.17,0x4a8a48,.45,.26,-.22,1.5,.12,.9); strich(p,[.6,.27,-.24],[.74,.27,-.45],.035,0x4a8a48); ball(p,.07,0x4a8a48,.77,.27,-.47,1.2,.3,1); strich(p,[.28,.27,-.2],[.12,.27,-.07],.03,0x4a8a48);
      box(p,.07,.04,1.32,ROT,.02,.27,.05);
      /* grüne Leselampe */
      strich(g,[-1.0,1.9,-.35],[-1.05,2.85,-.5],.05,MESSING); strich(g,[-1.05,2.85,-.5],[-.65,3.05,-.25],.05,MESSING);
      const s=gruppe(g,-.55,3.0,-.15); s.rotation.set(.35,0,.25); ball(s,.34,0x2f7a50,0,0,0,1.3,.6,.9); ball(s,.18,basis(0xfff4b8),0,-.12,0,1.4,.5,1);
      schein(g,'rgba(255,232,150,.45)',-.45,2.8,.05,1.2);
      /* Lupe lehnt am Pult */
      const lu=ring(g,.26,.05,MESSING,1.0,1.18,.55); lu.rotation.y=-.2; scheibe(g,.23,.02,0xbfe8f0,1.0,1.18,.55); strich(g,[1.06,.92,.55],[1.2,.18,.62],.06,HOLZ3); } },
  { x:13.7, z:5.7, dreh:-.5, steh:[11.9,7.5], kasten:[3.1,2.4], treffer:[3.5,4.0,1.7], baue(g){ /* 8 Gesteinssammlung: offenes Regal mit bunten Steinen und Kristallen */
      box(g,3.2,3.2,.12,HOLZ3,0,1.7,-.52); [-1,1].forEach(s=>box(g,.16,3.3,1.14,HOLZ2,s*1.6,1.65,0)); box(g,3.5,.16,1.3,HOLZ,0,3.36,0); box(g,3.36,.2,1.2,HOLZ2,0,.1,0);
      [.34,1.32,2.32].forEach(y=>{ box(g,3.1,.1,1.1,HOLZ,0,y,0); box(g,3.1,.07,.05,MESSING,0,y,.56); });
      const brocken=(x,y,c,gr,i)=>{ ball(g,gr,c,x,y+gr*.7,.05,1.15,.82,.95); ball(g,gr*.62,c,x+gr*.55,y+gr*.55,.18,1,.85,1); ball(g,gr*.5,c,x-gr*.5,y+gr*.95,0); };
      const kristall=(x,y,c)=>{ [[0,.62,0],[-.2,.44,.35],[.2,.4,-.38],[.05,.3,.05]].forEach(([a,h,d],i)=>{ const q=gruppe(g,x+a,y,i===3?.28:0); q.rotation.z=d; rohr(q,.1,.12,h,c,0,h/2,0,6); kegel(q,.1,.18,c,0,h+.09,0); }); };
      [[.39,[0x9a9088,0xd0783a,0x4a7aa0]],[1.37,[0xa8b878,'k',0xc04840]],[2.37,['m',0xe8d8a8,'t']]].forEach(([y,L],r)=>L.forEach((c,i)=>{ const x=-1.02+i*1.02;
        if(c==='k') kristall(x,y,0xb078e0); else if(c==='t') kristall(x,y,0x50c8d8); else if(c==='m') brocken(x,y,0x3a9a68,.28,i); else brocken(x,y,c,.27+((r+i)%3)*.025,i);
        box(g,.44,.14,.03,PAPIER,x,y-.1,.59); box(g,.28,.03,.03,HOLZ3,x,y-.1,.6); }));
      [[-1.0,0xe8c040],[.9,0x6a6460]].forEach(([x,c])=>brocken(x,3.44,c,.24,0)); } },
  { x:-3.9, z:-1.6, dreh:.12, steh:[-3.7,.9], kasten:[3.4,2.2], treffer:[3.1,3.2,2.2], baue(g){ /* 9 Dino-Fußabdruck in einer schräg aufgestellten Steinplatte */
      box(g,3.1,.22,2.0,STEIN3,0,.11,0); box(g,2.6,.8,.5,STEIN2,0,.6,-.55); box(g,2.8,.3,.4,STEIN2,0,.37,.62);
      const p=gruppe(g,0,1.55,.02); p.rotation.x=-.72;
      const S=0xd0b078;
      box(p,2.8,2.7,.34,S,0,0,0); box(p,2.5,.2,.32,0xb89660,.06,1.4,0); box(p,.2,2.2,.3,0xb89660,-1.45,-.1,0); box(p,.18,1.9,.3,0xb89660,1.45,.15,0);
      [[-1.1,.9],[1.1,-.8],[-1.0,-1.0],[1.05,.95],[.8,-1.1]].forEach(([x,y])=>ball(p,.12,0xa88858,x,y,.17,1.3,.8,.2));
      /* heller Rand und dunkle Vertiefung: Ballen mit drei Zehen */
      const D=0x5a3c22, RAND=0xecd4a0;
      const form=(c,z,plus)=>{ ball(p,.42+plus,c,0,-.55,z,1,1.1,.14);
        [[0,0,1.05,.0],[-.56,-.12,.72,.72],[.56,-.12,.72,-.72]].forEach(([x,y,l,d])=>{ const q=gruppe(p,x*.9,y+.12,z); q.rotation.z=d; ball(q,.2+plus,c,0,.1,0,1,l*2.3,.28);
          const s=kegel(q,.13+plus,.32+plus,c,0,.1+(.2*l*2.3)+.08,0); s.scale.z=(.13+plus)*.35; }); };
      form(RAND,.155,.09); form(D,.19,0);
      box(g,.9,.26,.06,PAPIER,.85,.38,.86); [.43,.33].forEach((y,i)=>box(g,.66-i*.24,.035,.02,HOLZ3,.85,y,.9)); } },
  { x:5.6, z:6.0, dreh:.28, steh:[5.0,8.2], kasten:[4.3,2.4], treffer:[4.4,2.4,2.0], baue(g){ /* 10 Schubkarre: ein Rad, zwei Griffe, voll Erde */
      const F=0xe0602a, F2=0xb0441c;
      /* Rad vorn (links) */
      const rz=-1.35; ring(g,.5,.17,0x24201c,rz,.67,0); scheibe(g,.4,.12,METALL,rz,.67,0); scheibe(g,.13,.5,GELB,rz,.67,0);
      [-.34,.34].forEach(z=>strich(g,[rz,.67,z*.8],[-.35,.95,z],.07,METALL2));
      /* Wanne */
      box(g,1.75,.14,1.0,F2,.05,.95,0);
      [-1,1].forEach(s=>{ const w=box(g,2.0,.72,.1,F,.05,1.28,s*.62); w.rotation.x=s*.28; });
      const v=box(g,.1,.82,1.28,F,-1.0,1.3,0); v.rotation.z=.4; const hi=box(g,.1,.76,1.28,F,1.0,1.28,0); hi.rotation.z=-.2;
      [-1,1].forEach(s=>quer(g,.065,2.35,F2,.02,1.63,s*.73)); [[-1.17,.0],[1.1,0]].forEach(([x])=>liegend(walze(g,.065,1.5,F2,x,1.63,0)));
      /* Erde als Haufen */
      box(g,1.9,.2,1.15,ERDE,.03,1.45,0); ball(g,.6,ERDE,-.1,1.52,0,1.45,.68,1); ball(g,.4,ERDE2,.55,1.58,.18,1.2,.7,1); ball(g,.36,ERDE,-.65,1.56,-.15);
      for(let i=0;i<16;i++){ const a=i*2.4, r=.2+(i%4)*.19; ball(g,.07+(i%3)*.025,i%2?ERDE2:0x8a603a,Math.cos(a)*r*1.1,1.9-r*.42,Math.sin(a)*r*.65); }
      /* zwei Griffe nach hinten und zwei Beine */
      [-1,1].forEach(s=>{ strich(g,[-.35,.95,s*.34],[1.0,.95,s*.52],.08,METALL2); strich(g,[1.0,.95,s*.52],[1.85,1.24,s*.62],.08,METALL2); strich(g,[1.72,1.2,s*.61],[2.18,1.36,s*.65],.115,0x24201c); ball(g,.12,0x24201c,2.18,1.36,s*.65);
        strich(g,[.75,.95,s*.48],[.95,.08,s*.6],.08,METALL2); box(g,.34,.1,.2,METALL2,.98,.05,s*.6); }); } }
];

return { titel:'Der Dinosaurier-Saal', breite:36, tiefe:27, oben:['12,24,16','26,44,32','52,76,56'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Die Gemäldegalerie. Rote Wände, goldene Rahmen, Würfelparkett und Scheinwerfer an Messingschienen.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Klavier) und 10 (Standuhr) sind neu.
   Ausgang: das große Porträt in der Mitte der Rückwand trägt ein goldenes Zahlenschloss und schwingt wie eine Tür
   nach hinten in einen beleuchteten Gang (so fährt es weder durch die Figur noch durch Möbel). */
RAEUME3D.museum[2] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, MARMOR, MARMOR2, MARMOR3, GOLD, SCHWARZ, WEISS, METALL, METALL2 } = MUS;
const B=36, T=27, H=6.8, HINTEN=-13.5;
const ROT=0x9a2430, ROT2=0x741a24, SAMT=0xb03038, LACK=0x16141a, LACK2=0x2c2a34, STAHL=0xc2cad2, STAHL2=0x848e98;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const hell=m=>{ m.castShadow=false; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* gemeinsame Leucht-Materialien (damit verschmelze sie zusammenfassen kann) */
let GLUEH=null, LICHTFLECK=null;

/* ---------- Malen auf der Leinwand ---------- */
const oval=(g,x,y,rx,ry,c,w)=>{ g.fillStyle=c; g.beginPath(); g.ellipse(x,y,rx,ry,w||0,0,Math.PI*2); g.fill(); };
const flaeche=(g,c,p)=>{ g.fillStyle=c; g.beginPath(); p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y)); g.closePath(); g.fill(); };
const linie=(g,c,d,p)=>{ g.strokeStyle=c; g.lineWidth=d; g.lineCap='round'; g.beginPath(); p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y)); g.stroke(); };
const lachen=(g,x,y,r,c,d)=>{ g.strokeStyle=c||'#7a2a20'; g.lineWidth=d||3; g.lineCap='round'; g.beginPath(); g.arc(x,y,r,.4,Math.PI-.4); g.stroke(); };
/* Alle Deko-Motive zeichnen auf eine Fläche 100 x 100 (wird auf das Format gestreckt) */
const motiv=fn=>(g,w,h)=>{ g.save(); g.scale(w/100,h/100); fn(g); g.restore(); };
const OBST=motiv(g=>{ g.fillStyle='#2f3a52'; g.fillRect(0,0,100,100); g.fillStyle='#8a5a30'; g.fillRect(0,72,100,28);
  flaeche(g,'#d8b878',[[14,68],[86,68],[72,86],[28,86]]); oval(g,34,60,13,13,'#d8362a'); oval(g,66,60,13,12,'#f09a20'); oval(g,50,50,11,14,'#a8c840');
  [[46,66],[53,68],[50,74],[57,62],[60,72]].forEach(([x,y])=>oval(g,x,y,5,5,'#7a3a8a')); linie(g,'#4a2a10',2,[[34,48],[37,42]]); linie(g,'#4a2a10',2,[[50,36],[52,30]]); oval(g,57,31,7,3,'#4a9a40',-.4);
  [[30,55],[62,55],[47,43]].forEach(([x,y])=>oval(g,x,y,2.5,3.5,'rgba(255,255,255,.55)')); });
const HUND=motiv(g=>{ g.fillStyle='#8ac4d8'; g.fillRect(0,0,100,100); g.fillStyle='#5a9a48'; g.fillRect(0,82,100,18);
  oval(g,50,84,26,22,'#c8883e'); oval(g,50,48,24,23,'#d89a4a'); [-1,1].forEach(s=>oval(g,50+s*24,48,8,19,'#7a4a20',-s*.35)); oval(g,50,58,14,11,'#f6e6c8');
  [-1,1].forEach(s=>{ oval(g,50+s*9,42,3.5,4,'#20140a'); oval(g,50+s*9+1,40.5,1.2,1.2,'#fff'); }); oval(g,50,53,5,4,'#20140a'); oval(g,50,66,4,5,'#e86a78'); lachen(g,50,56,8); g.fillStyle='#c8302a'; g.fillRect(32,70,36,5); oval(g,50,77,4,4,'#f0c030'); });
const ENTEN=motiv(g=>{ g.fillStyle='#b8dcf0'; g.fillRect(0,0,100,40); g.fillStyle='#3a8ab0'; g.fillRect(0,40,100,60);
  const e=(x,y,s,c)=>{ oval(g,x,y,18*s,11*s,c); oval(g,x+14*s,y-13*s,9*s,9*s,c); flaeche(g,'#f08020',[[x+21*s,y-14*s],[x+32*s,y-11*s],[x+21*s,y-8*s]]); oval(g,x+16*s,y-15*s,1.8*s,1.8*s,'#20140a'); oval(g,x-4*s,y-1*s,10*s,6*s,'rgba(0,0,0,.14)'); linie(g,'#a8d8ec',2,[[x-22*s,y+12*s],[x+20*s,y+12*s]]); };
  e(30,62,1.25,'#fafaf0'); e(68,76,.7,'#f8d840'); e(40,86,.55,'#f8d840'); [[70,46],[18,44],[84,58]].forEach(([x,y])=>{ oval(g,x,y,9,4,'#4a9a48'); oval(g,x+2,y-3,3,3,'#f090b0'); }); });
const BLUMEN=motiv(g=>{ g.fillStyle='#e8d4a0'; g.fillRect(0,0,100,100); g.fillStyle='#7a4a2a'; g.fillRect(0,80,100,20);
  [[26,30,'#e84a4a'],[50,18,'#f0b020'],[74,32,'#8a5ad0'],[36,48,'#f078a8'],[64,50,'#3a78c8']].forEach(([x,y,c])=>{ linie(g,'#3a7a32',2.5,[[50,74],[x,y]]); for(let i=0;i<6;i++){ const a=i*1.047; oval(g,x+Math.cos(a)*7,y+Math.sin(a)*7,5.5,5.5,c); } oval(g,x,y,4.5,4.5,'#fff2a0'); });
  flaeche(g,'#3a8a7a',[[34,62],[66,62],[60,86],[40,86]]); g.fillStyle='#f4ecd8'; g.fillRect(36,70,28,4); });
/* freundliches Brustbild. o: grund, kleid, haut, haar, hut */
const kopfBild=o=>motiv(g=>{ g.fillStyle=o.grund; g.fillRect(0,0,100,100); flaeche(g,o.kleid,[[10,100],[22,74],[38,66],[62,66],[78,74],[90,100]]);
  oval(g,50,42,24,26,o.haar); g.fillStyle=o.haut; g.fillRect(44,56,12,14); oval(g,50,45,18,21,o.haut); oval(g,50,28,19,9,o.haar);
  if(o.hut){ oval(g,50,26,32,6,o.hut); oval(g,50,18,18,12,o.hut); g.fillStyle='#f4ecd8'; g.fillRect(32,21,36,4); }
  [-1,1].forEach(s=>{ oval(g,50+s*7,43,2.2,2.8,'#20140a'); oval(g,50+s*11,52,3.5,2.2,'rgba(220,90,80,.45)'); }); lachen(g,50,50,8,'#8a2a22',1.8); flaeche(g,'#f4ecd8',[[40,67],[50,77],[60,67]]); });
const KOPF1=kopfBild({grund:'#2f5a4a',kleid:'#3a3a78',haut:'#f0c8a4',haar:'#8a4a1c'});
const KOPF2=kopfBild({grund:'#5a4a6a',kleid:'#a8622a',haut:'#b87a50',haar:'#1e1410',hut:'#2a6a78'});
const KOPF3=kopfBild({grund:'#7a6a3a',kleid:'#2a5a3a',haut:'#e8bc98',haar:'#c8c4bc'});
/* das einzige Landschaftsbild im Raum (Gegenstand 5): Berge, See, Haus und Baum */
const landschaft=motiv(g=>{ const v=g.createLinearGradient(0,0,0,60); v.addColorStop(0,'#5aa8e8'); v.addColorStop(1,'#fde8c0'); g.fillStyle=v; g.fillRect(0,0,100,100); oval(g,80,17,7,10,'#ffe860');
  [[18,16],[24,13],[30,17],[55,22],[61,20]].forEach(([x,y])=>oval(g,x,y,7,5,'#fff'));
  flaeche(g,'#6a7a9a',[[0,62],[26,24],[52,62]]); flaeche(g,'#8a96b0',[[30,62],[58,30],[88,62]]); flaeche(g,'#fff',[[19,34],[26,24],[33,34],[29,32],[25,36],[22,32]]); flaeche(g,'#fff',[[52,37],[58,30],[65,37],[60,35],[56,39]]);
  flaeche(g,'#5aa048',[[0,56],[30,60],[60,55],[100,58],[100,100],[0,100]]); oval(g,62,74,32,11,'#4a9ad0'); linie(g,'#c8ecff',1,[[46,72],[62,72]]); linie(g,'#c8ecff',1,[[66,78],[80,78]]);
  g.fillStyle='#f4e4c0'; g.fillRect(12,66,16,14); flaeche(g,'#c83a2a',[[9,67],[20,54],[31,67]]); g.fillStyle='#6a3a1c'; g.fillRect(18,72,5,8);
  g.fillStyle='#6a4420'; g.fillRect(89,62,4,24); oval(g,91,56,9,15,'#2f7a3a'); oval(g,85,64,6,9,'#3f8a42');
  flaeche(g,'#e8d090',[[20,80],[26,80],[44,100],[30,100]]); [[8,90],[16,95],[56,92],[70,94],[78,89]].forEach(([x,y])=>oval(g,x,y,1.4,2,'#ffd830')); });
/* das große Porträt am Ausgang: eine fröhliche Frau mit Sonnenhut und ihrer Katze */
function grossesPortraet(){
  return bild(384,512,(g)=>{ const v=g.createRadialGradient(192,170,30,192,240,360); v.addColorStop(0,'#8ac4c0'); v.addColorStop(1,'#1c4450'); g.fillStyle=v; g.fillRect(0,0,384,512);
    flaeche(g,'#e0a028',[[40,512],[70,350],[140,290],[244,290],[314,350],[344,512]]); flaeche(g,'#f8f0dc',[[150,290],[192,340],[234,290]]);
    oval(g,192,180,92,104,'#6a2e14'); g.fillStyle='#e8b490'; g.fillRect(170,240,44,56); oval(g,192,188,66,78,'#f4c8a4'); oval(g,192,122,70,30,'#6a2e14');
    oval(g,192,108,150,26,'#e8cc78'); oval(g,192,76,82,52,'#f0d888'); g.fillStyle='#c83a3a'; g.fillRect(114,84,156,20);
    [[130,92],[150,82]].forEach(([x,y])=>{ for(let i=0;i<6;i++) oval(g,x+Math.cos(i*1.047)*10,y+Math.sin(i*1.047)*10,8,8,'#fff'); oval(g,x,y,7,7,'#f0b020'); });
    [-1,1].forEach(s=>{ oval(g,192+s*26,178,8,10,'#2a1a10'); oval(g,195+s*26,174,3,3,'#fff'); linie(g,'#5a2a14',4,[[192+s*38,158],[192+s*16,155]]); oval(g,192+s*40,208,14,9,'rgba(220,90,80,.4)'); });
    linie(g,'#c89070',3,[[192,186],[187,208],[195,210]]); lachen(g,192,206,28,'#a0302a',6);
    /* Katze auf dem Arm */
    oval(g,244,436,58,48,'#e08a30'); oval(g,240,376,38,34,'#e89a40'); [-1,1].forEach(s=>flaeche(g,'#e89a40',[[240+s*34,362],[240+s*30,326],[240+s*8,346]]));
    [-1,1].forEach(s=>{ oval(g,240+s*14,370,6,8,'#4ab040'); oval(g,240+s*14,370,2.5,6,'#101008'); [-4,6].forEach(a=>linie(g,'#fff',2,[[240+s*10,388],[240+s*48,388+a]])); }); oval(g,240,386,5,4,'#d86070'); lachen(g,240,386,9,'#7a3a18',3);
    oval(g,180,452,22,16,'#f4c8a4'); oval(g,300,462,22,16,'#f4c8a4'); });
}

/* Würfelparkett (kachelbar) */
function parkettBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#4a2a12'; g.fillRect(0,0,512,512);
    for(let r=0;r<4;r++) for(let s=0;s<4;s++) for(let i=0;i<4;i++){ const v=Math.floor(zufall()*26)-13, quer=(r+s)%2, x=s*128+(quer?0:i*32), y=r*128+(quer?i*32:0), w=quer?128:32, h=quer?32:128;
      g.fillStyle='rgb('+((quer?170:148)+v)+','+((quer?112:94)+v)+','+((quer?62:50)+v)+')'; g.fillRect(x+1,y+1,w-2,h-2);
      g.fillStyle='rgba(70,35,10,.2)'; for(let k=0;k<3;k++){ if(quer) g.fillRect(x+8+k*17,y+8+k*8,80,1.5); else g.fillRect(x+7+k*8,y+8+k*17,1.5,80); } } });
}

/* ---------- Ausgang: das große Porträt ---------- */
function baueAusgang(k,sc,hinten){
  /* Gang hinter der Wand */
  const gang=gruppe(hinten,0,0,0);
  box(gang,4.1,.1,4.4,0xa87a4a,0,-.045,-15.8);
  [-1,1].forEach(s=>{ box(gang,.2,4.5,4.0,0xe8cc98,s*2.0,2.25,-16.0); box(gang,.12,1.1,4.0,HOLZ,s*1.86,.55,-16.0);
    [-14.9,-16.4].forEach(z=>{ box(gang,.1,.4,.1,MESSING2,s*1.86,2.7,z); hell(ball(gang,.13,GLUEH,s*1.78,3.0,z,.8,1.3,.8)); }); });
  box(gang,1.6,.02,4.2,SAMT,0,.015,-15.75); [-.7,.7].forEach(x=>box(gang,.1,.025,4.2,MESSING,x,.018,-15.75));
  box(gang,4.1,.2,4.0,0x8a6a48,0,4.6,-16.0);
  const ende=bild(256,288,(g)=>{ const v=g.createRadialGradient(128,150,8,128,160,200); v.addColorStop(0,'#fffce8'); v.addColorStop(.45,'#ffe098'); v.addColorStop(1,'#8a5420'); g.fillStyle=v; g.fillRect(0,0,256,288);
    for(let i=0;i<7;i++){ const w=210-i*22, y=270-i*18; g.fillStyle=i%2?'#c08a50':'#dca868'; g.fillRect(128-w/2,y,w,18); g.fillStyle='rgba(255,248,210,.75)'; g.fillRect(128-w/2,y,w,3); }
    g.strokeStyle='#8a5a24'; g.lineWidth=10; g.beginPath(); g.moveTo(78,162); g.lineTo(78,96); g.arc(128,96,50,Math.PI,0); g.lineTo(178,162); g.stroke(); });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4.1,4.5),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,2.25,-17.9); gang.add(e);
  verschmelze(gang); gang.visible=false;

  /* feststehender Prunkrahmen mit Pfeilern, Gesims und Wappen aus Farbpalette */
  const r=gruppe(hinten,0,0,0);
  [-1,1].forEach(s=>{ const x=s*1.99; box(r,.5,4.5,.3,GOLD,x,2.25,-13.36); box(r,.16,4.3,.08,MESSING2,x,2.25,-13.19);
    box(r,.72,.44,.42,MARMOR,x,.22,-13.31); box(r,.7,.2,.4,MARMOR2,x,4.5,-13.31);
    for(let i=0;i<7;i++) ball(r,.13,MESSING,x,.75+i*.58,-13.14,1,1.3,.6); });
  box(r,4.8,.36,.34,GOLD,0,4.76,-13.34); box(r,5.1,.14,.46,MESSING2,0,5.0,-13.28);
  for(let i=0;i<9;i++) ball(r,.1,MESSING,-1.8+i*.45,4.76,-13.15,1.2,1,.6);
  liegend(walze(r,.62,.12,GOLD,0,5.52,-13.42)); liegend(walze(r,.5,.16,ROT2,0,5.52,-13.41));
  ball(r,.34,0xe0b878,0,5.5,-13.3,1.15,.85,.18); [[-.2,5.58,0xd8362a],[.02,5.66,0xf0c030],[.22,5.56,0x2a6ab0],[.12,5.36,0x3a9a48]].forEach(([x,y,c])=>ball(r,.07,c,x,y,-13.22,1,1,.5));
  box(r,3.5,.05,.5,MESSING2,0,.03,-13.3);
  verschmelze(r);

  /* das Gemälde selbst: Drehpunkt links, schwingt nach hinten in den Gang */
  const dreh=gruppe(hinten,-1.62,0,-13.5); dreh.userData.lebendig=true;
  const t=gruppe(dreh,1.62,0,0);
  box(t,3.28,4.34,.14,HOLZ2,0,2.22,0);
  MUS.tafel(t,grossesPortraet(),3.0,4.0,0,2.24,.09);
  [-1,1].forEach(s=>{ box(t,.14,4.34,.1,MESSING,s*1.55,2.22,.1); box(t,3.24,.14,.1,MESSING,0,2.22+s*2.09,.1); });
  [-1,1].forEach(s=>[-1,1].forEach(v=>ball(t,.14,GOLD,s*1.52,2.22+v*2.05,.14,1,1,.6)));
  /* Schlossplatte über der Katzenhöhe, gut sichtbar */
  box(t,1.42,1.12,.08,GOLD,0,1.78,.13); box(t,1.26,.96,.09,ROT2,0,1.78,.14);
  const schloss=MUS.zahlenschloss(t,0,1.68,.28); schloss.scale.setScalar(1.15);
  ball(t,.12,GOLD,1.22,2.2,.22);
  verschmelze(dreh);
  const schimmer=schein(t,'rgba(255,225,120,.6)',0,1.85,.55,1.5);

  const licht=new THREE.PointLight(0xffd890,0,12,1.5); licht.position.set(0,3.0,-14.8); sc.add(licht);
  k.kasten(0,-13.05,4.8,.9);
  return ausgang(k,{ name:'Großes Porträt', einfach:'Tür mit dem großen Bild', steh:[0,-11.3], durch:[0,-15.4],
    treffer:{x:0,y:2.5,z:-13.0,b:4.5,h:5.0,t:.8}, schildOben:[0,3.9,-11.9], glanz:[0,1.9,-12.8],
    bewege:(auf,tt)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.92)), w=a*a*(3-2*a);
      dreh.rotation.y=1.62*w; gang.visible=auf>.02; licht.intensity=1.6*auf;
      schimmer.visible=auf<.4; const g=1.45+Math.sin(tt*2.2)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Wände: Deko-Gemälde, Scheinwerfer, Absperrseile ---------- */
/* Messingschiene mit Strahler über einem Bild (in einer an die Wand gedrehten Gruppe, Wand bei z=0) */
function strahler(g,x,oben){
  strich(g,[x,H-.45,.05],[x,H-.62,.6],.035,MESSING2);
  const l=rohr(g,.11,.2,.34,SCHWARZ,x,H-.7,.66); l.rotation.x=.55;
  hell(ball(g,.1,GLUEH,x,H-.84,.57,1,.5,1));
}
function lichtfleck(g,x,y,b,h){ const m=new THREE.Mesh(new THREE.PlaneGeometry(b,h),LICHTFLECK); m.position.set(x,y,.03); g.add(m); }
function wandDeko(k,hinten,links,rechts){
  const gruppen=[];
  /* je Wand eine gedrehte Gruppe: x läuft an der Wand entlang, z zeigt in den Raum */
  const wand=(par,x,z,dreh)=>{ const g=gruppe(par,x,0,z); g.rotation.y=dreh; gruppen.push(g); return g; };
  const h=wand(hinten,0,HINTEN,0), L=wand(links,-B/2,0,Math.PI/2), R=wand(rechts,B/2,0,-Math.PI/2);
  const haenge=(g,x,y,b,hh,mal)=>{ lichtfleck(g,x,y+.25,b+2.0,hh+2.2); MUS.gemaelde(g,x,y,.1,b,hh,mal);
    box(g,.7,.17,.05,MESSING,x,y-hh/2-.4,.05); strahler(g,x); };
  /* Rückwand */
  haenge(h,-15.2,3.35,2.0,2.4,KOPF1);
  haenge(h,-5.0,4.05,1.7,1.4,HUND);
  haenge(h,4.9,4.05,1.9,1.4,OBST);
  haenge(h,11.9,3.35,2.2,1.7,BLUMEN);
  haenge(h,15.7,3.4,1.5,1.9,KOPF2);
  /* Seitenwände (links: x = -z der Welt, rechts: x = z der Welt) */
  [[-9.8,2.2,1.7,ENTEN],[-5.4,1.5,2.0,KOPF3],[-.8,2.4,1.8,BLUMEN],[4.2,1.6,2.1,KOPF2],[9.4,2.3,1.7,OBST]].forEach(([z,b,hh,m])=>haenge(L,-z,3.35,b,hh,m));
  [[-9.6,1.6,2.0,BLUMEN],[-4.8,2.4,1.7,HUND],[.2,1.5,1.9,KOPF1],[8.8,2.3,1.8,OBST],[12.0,1.4,1.7,KOPF3]].forEach(([z,b,hh,m])=>haenge(R,z,3.35,b,hh,m));
  /* Strahler auch über den beiden Wand-Gegenständen */
  lichtfleck(h,-9.5,3.2,5.4,4.6); strahler(h,-10.4); strahler(h,-8.6); lichtfleck(h,8.0,3.0,4.0,4.4); strahler(h,8.0);
  /* durchgehende Schienen oben */
  [h,L,R].forEach((g,i)=>box(g,(i?T:B)-.4,.08,.08,MESSING,0,H-.42,.06));
  gruppen.forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}
/* kurzes Absperrseil vor einer Seitenwand (läuft in z-Richtung) */
function seil(k,g,x,z1,z2){
  [z1,z2].forEach(z=>{ walze(g,.26,.08,MESSING2,x,.04,z); walze(g,.055,1.0,MESSING,x,.55,z); ball(g,.11,GOLD,x,1.1,z); });
  const m=(z1+z2)/2; strich(g,[x,.98,z1],[x,.72,(z1+m)/2],.06,SAMT); strich(g,[x,.72,(z1+m)/2],[x,.64,m],.06,SAMT); strich(g,[x,.64,m],[x,.72,(z2+m)/2],.06,SAMT); strich(g,[x,.72,(z2+m)/2],[x,.98,z2],.06,SAMT);
  k.kasten(x,m,.55,Math.abs(z2-z1)+.5);
}
/* rote Samtbank mit sichtbaren Beinen und offener Lehne (Lehne hinten, zur Rückwand hin) */
function polsterbank(k,g,x,z){
  [-1.2,1.2].forEach(a=>{ strich(g,[x+a*1.05,0,z+.34],[x+a,.62,z+.24],.07,HOLZ); strich(g,[x+a*1.05,0,z-.4],[x+a,.62,z-.28],.07,HOLZ); strich(g,[x+a,.6,z-.28],[x+a,1.45,z-.42],.065,HOLZ);
    ball(g,.1,GOLD,x+a,1.5,z-.43); strich(g,[x+a,.95,z-.34],[x+a,.95,z+.24],.05,HOLZ); strich(g,[x+a,.62,z+.24],[x+a,.95,z+.24],.05,HOLZ); ball(g,.08,GOLD,x+a,.97,z+.25); });
  box(g,2.5,.1,.7,HOLZ2,x,.6,z); box(g,2.3,.13,.6,SAMT,x,.71,z+.02);
  box(g,2.4,.13,.08,HOLZ,x,1.38,z-.41); box(g,2.4,.09,.07,HOLZ,x,1.0,z-.35); [-.8,-.4,0,.4,.8].forEach(a=>strich(g,[x+a,1.0,z-.35],[x+a,1.36,z-.41],.035,MESSING));
  k.kasten(x,z,2.75,.95);
}
/* kleiner runder Busch in einem eckigen Holzkübel */
function busch(k,g,x,z,bluete){
  box(g,.9,.62,.9,HOLZ,x,.33,z); box(g,1.0,.1,1.0,HOLZ2,x,.67,z); [-.42,.42].forEach(a=>[-.42,.42].forEach(b=>{ box(g,.12,.7,.12,HOLZ3,x+a,.35,z+b); ball(g,.07,GOLD,x+a,.76,z+b); }));
  box(g,.5,.28,.03,MESSING2,x,.34,z+.46);
  [[0,1.12,0,.46],[-.28,.94,.14,.3],[.3,.96,.1,.31],[.06,.95,-.28,.3],[-.1,.93,.3,.28],[.1,1.45,.04,.29],[-.2,1.32,-.1,.27]].forEach(([a,y,b,r],i)=>ball(g,r,i%2?0x4a9a44:0x35803a,x+a,y,z+b));
  if(bluete) [[-.3,1.25,.28],[.28,1.18,.32],[.05,1.55,.26],[.4,1.1,-.1],[-.44,1.02,.08],[-.05,1.22,.45],[.12,1.7,0]].forEach(([a,y,b])=>{ ball(g,.075,bluete,x+a,y,z+b); ball(g,.03,0xfff2a0,x+a,y+.02,z+b+.065); });
  k.kasten(x,z,1.0,1.0);
}
/* Zeichenhocker mit schrägem Skizzenbrett auf den Knien eines kleinen Bocks */
function zeichenplatz(k,sc,x,z,dreh){
  const g=gruppe(sc,x,0,z); g.rotation.y=dreh;
  /* Hocker */
  [0,1,2].forEach(i=>{ const a=i*2.094; strich(g,[-.45+Math.cos(a)*.34,0,Math.sin(a)*.34],[-.45+Math.cos(a)*.18,.55,Math.sin(a)*.18],.05,HOLZ); });
  walze(g,.34,.12,0x2f6a78,-.45,.6,0);
  /* Brett */
  [-.32,.32].forEach(v=>{ strich(g,[.22,0,v],[.34,.7,v],.04,HOLZ2); strich(g,[.7,0,v],[.5,.62,v],.04,HOLZ2); });
  const b=gruppe(g,.42,.74,0); b.rotation.z=.32;
  box(b,.8,.07,.95,0xc89458,0,0,0); box(b,.06,.1,.95,HOLZ2,-.4,.03,0);
  const t=bild(200,240,(c)=>{ c.fillStyle='#fffdf4'; c.fillRect(0,0,200,240); c.strokeStyle='#4a4a58'; c.lineWidth=4; c.beginPath(); c.arc(100,140,52,0,7); c.stroke(); linie(c,'#4a4a58',5,[[100,90],[108,52]]); oval(c,130,62,24,11,'#5aaa48',-.4); oval(c,82,128,20,28,'#f07a60'); [196,210].forEach(y=>linie(c,'#9a9aa8',3,[[40,y],[160,y+3]])); });
  const p=MUS.tafel(b,t,.7,.68,0,.042,0); p.rotation.set(-Math.PI/2,0,-Math.PI/2);
  [[-.1,0xd8362a],[.06,0x2a6ac0],[.22,0xf0b020]].forEach(([v,c])=>{ strich(g,[-.2,.03,.45+v],[.2,.03,.6+v],.025,c); });
  verschmelze(g); k.kasten(x,z,1.7,1.5);
}
/* Besucher, der sich am Rand die Bilder ansieht (wiegt sich leicht) */
function besucher(k,sc,x,z,dreh,jacke,haar,tasche){
  const g=gruppe(sc,x,0,z); g.rotation.y=dreh; const o=gruppe(g,0,0,0); o.userData.lebendig=true;
  const HAUT=0xe8b48c;
  [-.17,.17].forEach(a=>{ walze(g,.12,.82,0x3a4258,a,.47,0); ball(g,.15,0x2a1a10,a,.08,.07,1,.6,1.5); });
  rohr(o,.28,.4,.9,jacke,0,1.3,0); ball(o,.29,jacke,0,1.72,0,1.1,.6,.9);
  [-1,1].forEach(s=>{ strich(o,[s*.32,1.7,0],[s*.45,1.05,.04],.09,jacke); ball(o,.095,HAUT,s*.46,.99,.04); });
  const kopf=gruppe(o,0,2.12,0); kopf.userData.lebendig=true; ball(kopf,.3,HAUT,0,0,0); ball(kopf,.32,haar,0,.1,-.07,1.02,.88,.98); [-.1,.1].forEach(a=>ball(kopf,.035,0x20140e,a,0,.28)); ring(kopf,.08,.016,0x8a3a30,0,-.08,.28,Math.PI).rotation.z=Math.PI;
  strich(o,[-.28,1.78,.2],[.36,1.15,.34],.03,HOLZ3); box(o,.34,.34,.18,tasche,.46,1.02,.18);
  verschmelze(kopf); verschmelze(o); verschmelze(g);
  k.anim.push(t=>{ o.rotation.z=Math.sin(t*.8+x)*.018; kopf.rotation.y=Math.sin(t*.45+z)*.45; });
  k.kreis(x,z,.62);
}

function baue(k){
  const sc=k.scene;
  GLUEH=basis(0xfff2b8);
  LICHTFLECK=new THREE.MeshBasicMaterial({map:leuchtBild('rgba(255,220,160,.34)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const h=MUS.huelle(k,{ B,T,H, himmelLicht:0xffeede, grund:0x57302a, staerke:.78, sonne:0xffe4c0, sonneStaerke:.38,
    wandBild:MUS.tapeteBild('#9c2632','rgba(255,170,130,.09)'), bodenBild:parkettBild(), bodenWdh:[B/6,T/6], leiste:MESSING2, sockel:1.15, sockelFarbe:0x4a2616, oeffnung:{x:0,b:3.4,h:4.45} });
  const tuer=baueAusgang(k,sc,h.hinten);
  wandDeko(k,h.hinten,h.links,h.rechts);

  /* Teppiche und Einlegestreifen (flach, kein Hindernis) */
  MUS.teppich(sc,0,-8.2,3.2,7.4,ROT2,GOLD);
  MUS.teppich(sc,0,2.2,6.4,5.4,ROT,MESSING2);
  MUS.teppich(sc,-8.2,7.0,5.0,5.4,0x2a4a6a,0xd8b878);
  const einlage=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ box(einlage,.18,.01,24.6,HOLZ3,v*16.2,.006,.3); box(einlage,.07,.01,24.6,GOLD,v*15.95,.006,.3); });
  box(einlage,32.4,.01,.18,HOLZ3,0,.007,12.65); box(einlage,31.9,.01,.07,GOLD,0,.007,12.4);
  ohneSchatten(einlage); verschmelze(einlage);

  /* niedrige Randdeko */
  const m=gruppe(sc,0,0,0);
  seil(k,m,-16.5,-11.0,-8.2); seil(k,m,-16.5,-6.4,-3.6); seil(k,m,-16.5,6.8,10.0);
  seil(k,m,16.5,-11.0,-8.0); seil(k,m,16.5,-3.4,-.6); seil(k,m,16.5,7.4,10.4);
  /* Absperrpfosten mit Kordel vorn (quer zum Raum) */
  [[-13.6,-11.0],[6.5,9.0]].forEach(([a,b])=>{ const q=gruppe(m,0,0,12.55); q.rotation.y=Math.PI/2; seil({kasten:()=>{}},q,0,a,b); k.kasten((a+b)/2,12.55,Math.abs(b-a)+.5,.55); });
  /* Büsche in Kübeln */
  [[-3.35,-12.35,0],[3.35,-12.35,0],[-13.0,-11.9,0xf078a8],[13.4,-11.9,0xf0e040],[-5.7,-1.5,0xf078a8],[6.2,-2.6,0],[5.7,2.5,0xffffff],[2.4,6.2,0xf0e040],[-12.6,9.9,0],[-.8,12.2,0xf078a8],[1.9,12.2,0],[13.1,11.4,0xffffff]].forEach(([x,z,f])=>busch(k,m,x,z,f));
  polsterbank(k,m,-2.8,11.5); polsterbank(k,m,4.6,11.2); polsterbank(k,m,10.8,9.6);
  verschmelze(m);
  zeichenplatz(k,sc,-1.3,5.4,-.5);
  zeichenplatz(k,sc,12.2,.4,.35);
  besucher(k,sc,-15.1,-1.2,-1.15,0x3a7a5a,0x5a3418,0xd8a73a);
  besucher(k,sc,14.7,8.5,1.1,0x3a5a9a,0xc89040,0x8a4a8a);

  flacker(k,-9.2,5.0,-10.0,0xffdca0,.42,10);
  flacker(k,8.6,5.0,-10.0,0xffdca0,.42,10);
  flacker(k,-12.0,5.0,3.5,0xffd8a0,.32,11);
  flacker(k,11.5,5.0,3.0,0xffd8a0,.32,11);

  /* Leben: die Museumskatze dreht ihre Runde auf freien Wegen */
  katze(k,[[-2.8,-3.6],[2.2,-4.0],[3.6,-1.0],[3.4,3.6],[5.2,7.2],[1.6,8.8],[-3.2,8.4],[-4.4,3.2],[-8.8,2.4],[-9.4,-2.6],[-6.2,-3.8]],.95);

  return { tuer, start:[0,.4] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.6,-11.6],[-15.2,-3.0],[-8.4,-9.6],[-2.8,-11.4],[2.8,-9.8],[11.6,-10.6],[15.0,-7.4],[14.8,-1.8],[8.2,-3.4],[1.8,-5.8],[-8.6,-.8],[-15.4,5.2],[-15.0,11.6],[-8.2,11.2],[-4.6,6.6],[.6,11.8],[7.8,8.2],[15.0,11.8],[15.2,1.8],[5.6,4.6]];

/* ---------- Gegenstände (Reihenfolge = ort 1 bis 10) ---------- */
const gegenstaende=[
  { x:-12.0, z:-6.6, dreh:.3, steh:[-11.4,-4.55], r:.95, treffer:[2.2,4.2,1.8], baue(g){ /* 1 Marmorskulptur: Tänzerin mit goldenem Ball */
      const W=0xf2eee4, G=0xd2cabc;
      box(g,1.45,.2,1.45,MARMOR3,0,.1,0); box(g,1.15,.85,1.15,MARMOR2,0,.62,0); box(g,1.35,.16,1.35,MARMOR,0,1.12,0); box(g,.6,.3,.05,GOLD,0,.65,.6);
      rohr(g,.24,.58,1.15,W,0,1.77,0); for(let i=0;i<9;i++){ const a=i*.698; strich(g,[Math.cos(a)*.55,1.24,Math.sin(a)*.55],[Math.cos(a)*.24,2.22,Math.sin(a)*.24],.04,G); }
      ball(g,.3,W,0,2.52,0,.95,1.35,.75); ring(g,.25,.05,G,0,2.32,0).rotation.x=Math.PI/2;
      walze(g,.1,.24,W,0,2.95,0); ball(g,.27,W,0,3.22,.02); ball(g,.29,G,0,3.32,-.07,1.02,.85,.95); ball(g,.15,G,0,3.55,-.17);
      [-1,1].forEach(s=>ball(g,.032,MARMOR3,s*.09,3.24,.27)); ring(g,.08,.014,MARMOR3,0,3.16,.27,Math.PI).rotation.z=Math.PI;
      strich(g,[.24,2.72,0],[.66,3.05,.05],.085,W); strich(g,[.66,3.05,.05],[.5,3.62,.08],.075,W); ball(g,.1,W,.5,3.64,.08); ball(g,.22,GOLD,.5,3.9,.08);
      strich(g,[-.24,2.72,0],[-.68,2.42,.15],.085,W); strich(g,[-.68,2.42,.15],[-.98,2.55,.3],.072,W); ball(g,.095,W,-.99,2.56,.31); } },
  { x:-4.8, z:-6.8, dreh:.2, steh:[-4.35,-4.8], r:.95, treffer:[2.1,4.3,1.6], baue(g){ /* 2 Ritterrüstung: winkt und hält eine Sonnenblume */
      box(g,1.7,.22,1.3,HOLZ2,0,.11,0); box(g,1.5,.08,1.12,SAMT,0,.25,0); box(g,.6,.14,.05,GOLD,0,.11,.67);
      [-1,1].forEach(s=>{ const x=s*.29; ball(g,.23,STAHL2,x,.42,.12,1,.65,1.5); rohr(g,.17,.15,.6,STAHL,x,.76,0); ball(g,.19,GOLD,x,1.1,.02); rohr(g,.21,.18,.55,STAHL,x,1.42,0); });
      rohr(g,.48,.58,.38,STAHL2,0,1.86,0); walze(g,.5,.14,HOLZ,0,2.06,0); box(g,.22,.18,.08,GOLD,0,2.06,.5);
      rohr(g,.6,.45,.82,STAHL,0,2.52,0); ball(g,.58,STAHL,0,2.88,0,1.03,.4,.9);
      /* Herz auf der Brust */
      [-1,1].forEach(s=>ball(g,.11,0xd8343c,s*.09,2.65,.55,1,1,.45)); const hz=box(g,.17,.17,.06,0xd8343c,0,2.57,.55); hz.rotation.z=Math.PI/4;
      [-1,1].forEach(s=>ball(g,.27,STAHL2,s*.68,2.82,0,1.1,.85,1));
      /* rechter Arm winkt */
      strich(g,[.72,2.75,0],[1.0,2.5,.05],.13,STAHL); ball(g,.15,GOLD,1.0,2.5,.05); strich(g,[1.0,2.5,.05],[1.05,3.05,.15],.12,STAHL); ball(g,.16,STAHL2,1.06,3.15,.17,1,1.2,.75);
      /* linker Arm hält die Blume */
      strich(g,[-.72,2.75,0],[-.9,2.2,.12],.13,STAHL); ball(g,.15,GOLD,-.9,2.2,.12); strich(g,[-.9,2.2,.12],[-.6,2.15,.55],.12,STAHL); ball(g,.15,STAHL2,-.57,2.15,.6);
      strich(g,[-.57,1.85,.64],[-.72,2.78,.72],.03,0x3a8a38); ball(g,.12,0x4aa044,-.54,2.4,.7,1.3,.4,.7);
      for(let i=0;i<9;i++){ const a=i*.698; ball(g,.1,0xffd028,-.72+Math.cos(a)*.17,2.84+Math.sin(a)*.17,.74,1,1,.4); } ball(g,.11,0x6a3a14,-.72,2.84,.78,1,1,.6);
      /* Helm mit freundlichem Gesicht und Federbusch */
      walze(g,.2,.14,STAHL2,0,3.03,0); ball(g,.42,STAHL,0,3.38,0,1,1.1,1);
      const HAUT=0xf2c29c;
      ball(g,.33,HAUT,0,3.35,.2,1,.9,.8); [-1,1].forEach(s=>{ ball(g,.045,0x3a2418,s*.11,3.41,.46,1,1.2,.6); ball(g,.06,0xec8a7a,s*.18,3.31,.43,1.1,.7,.4); });
      ball(g,.045,0xe4a886,0,3.35,.47); ring(g,.1,.02,0x9a3028,0,3.29,.455,Math.PI*.8).rotation.z=Math.PI*1.1;
      const visier=ring(g,.38,.055,GOLD,0,3.5,.16,Math.PI); visier.scale.z=1.4;
      [-1,1].forEach(s=>ball(g,.08,GOLD,s*.4,3.4,.12));
      [[0,3.92,0,.17],[0,4.05,-.16,.16],[0,4.04,-.36,.13],[0,3.92,-.5,.1]].forEach(([x,y,z,r])=>ball(g,r,0xd8343c,x,y,z,.8,1,1.1)); } },
  { x:5.0, z:-7.0, steh:[4.7,-5.0], r:.95, treffer:[2.0,3.6,1.8], baue(g){ /* 3 Bemalte Vase auf einem Holzsockel */
      box(g,1.35,.18,1.35,HOLZ3,0,.09,0); box(g,1.05,.75,1.05,HOLZ,0,.55,0); box(g,1.3,.14,1.3,HOLZ2,0,.99,0); box(g,.7,.4,.05,HOLZ2,0,.55,.54);
      const tex=bild(512,256,(c)=>{ c.fillStyle='#f6f0e0'; c.fillRect(0,0,512,256); c.fillStyle='#1f4a9a'; c.fillRect(0,0,512,34); c.fillRect(0,214,512,42); c.fillStyle='#e8b830'; c.fillRect(0,40,512,9); c.fillRect(0,200,512,9);
        for(let i=0;i<32;i++){ oval(c,i*16+8,17,5,8,'#f6f0e0'); oval(c,i*16+8,235,5,10,'#f6f0e0'); }
        for(let i=0;i<4;i++){ const x=i*128+40; linie(c,'#2f8a4a',5,[[x,196],[x+4,120]]); oval(c,x+20,160,18,8,'#3a9a52',-.6); oval(c,x-16,176,16,7,'#3a9a52',.6);
          for(let j=0;j<6;j++) oval(c,x+4+Math.cos(j*1.047)*22,108+Math.sin(j*1.047)*22,15,15,i%2?'#2a6ac0':'#d8402e'); oval(c,x+4,108,13,13,'#f0c030');
          const v=x+68; oval(c,v,100,18,11,'#2a6ac0'); oval(c,v+15,89,9,9,'#2a6ac0'); flaeche(c,'#f09020',[[v+22,86],[v+34,90],[v+22,94]]); flaeche(c,'#1f4a9a',[[v-12,98],[v-34,84],[v-30,108]]); oval(c,v+17,87,2.5,2.5,'#fff'); } });
      const profil=[[0,0],[.42,0],[.36,.16],[.55,.42],[.76,.82],[.74,1.12],[.52,1.42],[.28,1.62],[.27,1.82],[.44,2.02]].map(([x,y])=>new THREE.Vector2(x,y));
      const v=new THREE.Mesh(new THREE.LatheGeometry(profil,32),new THREE.MeshLambertMaterial({map:tex,side:THREE.DoubleSide})); v.position.y=1.06; v.castShadow=true; g.add(v);
      const rand=ring(g,.44,.05,GOLD,0,3.08,0); rand.rotation.x=Math.PI/2; const fuss=ring(g,.41,.05,GOLD,0,1.1,0); fuss.rotation.x=Math.PI/2;
      [-1,1].forEach(s=>{ const q=ring(g,.3,.055,0x1f4a9a,s*.5,2.62,0,Math.PI*1.25); q.rotation.z=s>0?-Math.PI*.55:Math.PI*.3; }); } },
  { x:11.8, z:-6.6, dreh:-.3, steh:[11.2,-4.45], kasten:[2.9,1.9], treffer:[2.8,4.2,1.4], baue(g){ /* 4 Leerer Goldrahmen auf einer Staffelei */
      [-1,1].forEach(s=>{ strich(g,[s*1.1,0,.45],[s*.2,4.0,-.05],.075,HOLZ); ball(g,.1,HOLZ3,s*1.1,.07,.45); });
      strich(g,[0,3.85,-.1],[0,0,-.7],.07,HOLZ2); ball(g,.14,GOLD,0,4.1,-.05);
      box(g,2.3,.13,.34,HOLZ2,0,1.05,.35);
      const r=gruppe(g,0,2.42,.32); r.rotation.x=-.12;
      [-1,1].forEach(s=>{ box(r,2.45,.3,.16,GOLD,0,s*1.13,0); box(r,.3,1.96,.16,GOLD,s*1.075,0,0); box(r,1.98,.08,.2,MESSING2,0,s*.95,.01); box(r,.08,1.96,.2,MESSING2,s*.89,0,.01);
        box(r,2.3,.05,.2,MESSING,0,s*1.22,.01); box(r,.05,2.3,.2,MESSING,s*1.17,0,.01); });
      [-1,1].forEach(s=>[-1,1].forEach(v=>{ ball(r,.23,GOLD,s*1.12,v*1.17,.04,1,1,.55); ball(r,.09,MESSING2,s*1.12,v*1.17,.16); }));
      [-1,1].forEach(s=>{ ball(r,.2,MESSING,0,s*1.17,.07,1.9,.7,.5); ball(r,.2,MESSING,s*1.12,0,.07,.7,1.9,.5); }); } },
  { x:-9.5, z:HINTEN, wand:'hinten', steh:[-9.2,-11.45], kasten:[4.0,1.0], treffer:[4.0,3.4,.9], trefferY:1.35, baue(g){ /* 5 Landschaftsgemälde */
      MUS.gemaelde(g,0,3.15,.12,3.3,2.3,landschaft);
      [-1,1].forEach(s=>[-1,1].forEach(v=>ball(g,.2,GOLD,s*1.76,3.15+v*1.26,.18,1,1,.55)));
      [-1,1].forEach(v=>ball(g,.2,GOLD,0,3.15+v*1.34,.18,2,.7,.5));
      box(g,1.2,.3,.08,MESSING,0,1.5,.08); box(g,.8,.05,.02,HOLZ3,0,1.5,.13); } },
  { x:8.0, z:HINTEN, wand:'hinten', steh:[7.8,-11.45], kasten:[2.6,1.0], treffer:[2.5,3.4,.9], trefferY:1.2, baue(g){ /* 6 Steckbrief der Malerin */
      box(g,2.2,2.85,.12,MESSING,0,2.9,.08); box(g,2.36,.2,.18,GOLD,0,4.36,.1); box(g,2.36,.14,.18,GOLD,0,1.44,.1);
      const tex=bild(384,512,(c)=>{ c.fillStyle='#fbf5e2'; c.fillRect(0,0,384,512); c.fillStyle='#1f4a6a'; c.fillRect(0,0,384,86); c.fillStyle='#fff3cf'; c.font='700 50px Andika, Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('STECKBRIEF',192,45);
        c.save(); c.translate(22,106); c.scale(1.7,2.0); c.fillStyle='#e8b830'; c.fillRect(-3,-3,106,106);
        c.fillStyle='#9ac8b8'; c.fillRect(0,0,100,100); flaeche(c,'#c83a5a',[[14,100],[28,70],[72,70],[86,100]]); oval(c,50,44,25,28,'#3a2010'); oval(c,50,48,18,21,'#e8b890'); oval(c,50,29,19,9,'#3a2010'); oval(c,50,17,10,9,'#3a2010');
        [-1,1].forEach(s=>{ c.strokeStyle='#2a2a3a'; c.lineWidth=1.8; c.beginPath(); c.arc(50+s*8,46,6,0,7); c.stroke(); oval(c,50+s*8,46,1.8,2.2,'#20140a'); }); lachen(c,50,54,7,'#8a2a22',1.8); linie(c,'#8a5a2a',3,[[72,94],[88,64]]); oval(c,89,61,3,6,'#d8402e',.5); c.restore();
        [124,156,188,220,252,284].forEach((y,i)=>{ c.fillStyle='#6a6458'; c.fillRect(216,y,i%2?110:144,9); });
        [346,382,418,454].forEach((y,i)=>{ oval(c,36,y+5,8,8,['#d8402e','#f0b020','#3a9a48','#2a6ac0'][i]); c.fillStyle='#6a6458'; c.fillRect(60,y,i%2?240:292,10); }); });
      MUS.tafel(g,tex,1.9,2.53,0,2.9,.15);
      [-1,1].forEach(s=>[-1,1].forEach(v=>ball(g,.08,GOLD,s*1.0,2.9+v*1.32,.17))); } },
  { x:-13.6, z:1.2, dreh:.45, steh:[-11.65,2.2], r:1.35, treffer:[2.7,3.9,1.6], baue(g,k){ /* 7 Hörstation mit zwei Kopfhörern */
      const BLAU=0x2a5a8a, BLAU2=0x1c3c60;
      walze(g,.75,.12,METALL2,0,.06,0); walze(g,.16,1.5,METALL,0,.85,0);
      box(g,1.3,1.55,.5,BLAU,0,2.25,0); box(g,1.42,.14,.62,GOLD,0,3.08,0); box(g,1.42,.1,.62,MESSING2,0,1.47,0);
      box(g,1.0,.62,.05,0x14202c,0,2.62,.26);
      [-.34,-.17,0,.17,.34].forEach((x,i)=>box(g,.09,[.2,.38,.5,.3,.16][i],.02,basis(0x7ae0f0),x,2.62,.29).castShadow=false);
      [[-.32,0xd8402e],[0,0xf0c030],[.32,0x3aaa50]].forEach(([x,c])=>{ liegend(walze(g,.12,.08,WEISS,x,2.05,.27)); liegend(walze(g,.09,.12,c,x,2.05,.29)); });
      [-.2,-.1,0,.1,.2].forEach(y=>box(g,.7,.04,.03,BLAU2,0,1.72+y*.7,.26));
      [-1,1].forEach(s=>{ const c=s<0?0xd8402e:0xf0a020; strich(g,[s*.62,2.7,.05],[s*.98,2.7,.12],.045,MESSING);
        const kh=gruppe(g,s*.93,2.38,.16); ring(kh,.31,.06,SCHWARZ,0,0,0,Math.PI);
        [-1,1].forEach(v=>{ ball(kh,.19,c,v*.31,-.07,0,.65,1.1,1); ball(kh,.13,SCHWARZ,v*.23,-.07,0,.5,1,.9); });
        strich(g,[s*.93,2.1,.18],[s*.75,1.35,.28],.022,SCHWARZ); strich(g,[s*.75,1.35,.28],[s*.4,1.5,.2],.022,SCHWARZ); });
      walze(g,.05,.3,METALL,0,3.28,0);
      /* schwebende Noten */
      const noten=[-.5,.05,.55].map((x,i)=>{ const n=gruppe(g,x,3.6,0); n.userData.lebendig=true; const c=[0xffd030,0x7ae0f0,0xff8aa0][i]; ball(n,.1,c,0,0,0,1.25,.9,.8); box(n,.035,.38,.035,c,.1,.19,0); box(n,.18,.07,.035,c,.18,.35,0); verschmelze(n); return n; });
      k.anim.push(t=>{ noten.forEach((n,i)=>{ n.position.y=3.55+Math.sin(t*1.8+i*2.1)*.16; n.rotation.z=Math.sin(t*1.3+i)*.2; }); }); } },
  { x:8.2, z:.4, dreh:-.2, steh:[7.8,2.45], r:1.2, treffer:[2.3,2.7,1.8], baue(g){ /* 8 Ausstellungskatalog: dickes Buch auf einem Pult */
      box(g,1.35,.16,1.05,HOLZ3,0,.08,0); walze(g,.18,1.15,HOLZ,0,.72,0); ball(g,.26,HOLZ2,0,.65,0,1,.6,1);
      const p=gruppe(g,0,1.58,0); p.rotation.x=.52;
      box(p,2.1,.13,1.45,HOLZ,0,0,0); box(p,2.1,.18,.12,HOLZ2,0,.1,.72);
      box(p,1.98,.1,1.3,0x1f4a7a,0,.12,0);
      [-1,1].forEach(s=>{ box(p,.9,.26,1.2,PAPIER,s*.47,.3,0); [.23,.3,.37].forEach(y=>box(p,.915,.012,1.215,0xc8b890,s*.47,y,0)); });
      const seiten=bild(512,320,(c)=>{ c.fillStyle='#fbf6e6'; c.fillRect(0,0,512,320); c.fillStyle='#b8a880'; c.fillRect(251,0,10,320);
        c.fillStyle='#1f3a5a'; c.font='700 38px Andika, Arial, sans-serif'; c.textAlign='center'; c.fillText('KATALOG',128,48);
        [[26,70,OBST],[140,70,HUND],[282,28,BLUMEN],[396,28,KOPF2]].forEach(([x,y,m])=>{ c.fillStyle='#d8a73a'; c.fillRect(x-5,y-5,100,110); c.save(); c.translate(x,y); m(c,90,100); c.restore(); });
        c.fillStyle='#6a6458'; [200,226,252,278].forEach(y=>c.fillRect(30,y,196,8)); [160,190,220,250,280].forEach(y=>c.fillRect(286,y,196,8)); });
      const b=MUS.tafel(p,seiten,1.82,1.17,0,.442,0); b.rotation.x=-Math.PI/2;
      box(p,.1,.04,1.3,0xd8362a,.03,.47,.04); box(p,.1,.42,.04,0xd8362a,.03,.26,.8);
      [-1,1].forEach(s=>[-1,1].forEach(v=>box(p,.16,.05,.16,GOLD,s*.93,.18,v*.6))); } },
  { x:-8.2, z:6.8, steh:[-5.55,8.0], kasten:[3.7,5.0], treffer:[3.4,3.6,4.2], baue(g){ /* 9 Klavier: schwarzer Flügel mit Hocker */
      /* geschwungener Korpus (Umriss: x nach rechts, zweiter Wert nach hinten) */
      const koerper=(h,y,c,mass)=>{ const s=new THREE.Shape(); s.moveTo(-1.5,-.7); s.lineTo(1.5,-.7); s.lineTo(1.5,.15); s.bezierCurveTo(1.45,.95,.45,.8,.35,1.45); s.bezierCurveTo(.28,2.35,-1.5,2.45,-1.5,1.45); s.lineTo(-1.5,-.7);
        const m=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:h,bevelEnabled:false,curveSegments:14}),typeof c==='number'?mat(c):c); m.rotation.x=-Math.PI/2; m.scale.set(mass||1,mass||1,1); m.position.y=y; m.castShadow=true; m.receiveShadow=true; g.add(m); return m; };
      koerper(.5,1.0,LACK); koerper(.04,1.5,0xc89a50,.93); koerper(.05,.97,GOLD,1.005);
      [-1.2,-.9,-.6,-.3,0,.3].forEach((x,i)=>box(g,.025,.02,2.2-i*.22,GOLD,x,1.55,-.45+i*.1));
      [[-1.25,.45],[1.25,.45],[-.7,-1.65]].forEach(([x,z])=>{ rohr(g,.15,.09,.92,LACK,x,.54,z); ball(g,.1,GOLD,x,.09,z); });
      /* Deckel: links angeschlagen, mit Stütze hochgestellt */
      const d=gruppe(g,-1.5,1.58,-.7); d.rotation.z=.55;
      box(d,2.2,.07,1.5,LACK2,1.1,0,-.35); box(d,1.5,.065,.7,LACK2,.75,-.002,-1.4); box(d,2.2,.03,.05,GOLD,1.1,0,.41);
      strich(g,[.55,1.52,-.2],[.1,2.54,-.2],.03,GOLD);
      /* Tastatur */
      box(g,3.1,.2,.62,LACK,0,1.07,.99); [-1,1].forEach(s=>box(g,.16,.42,.66,LACK,s*1.5,1.22,.98)); box(g,3.0,.34,.08,LACK,0,1.34,.68);
      const weiss=[], schwarz=[]; for(let i=0;i<22;i++){ const x=-1.35+i*.1286; weiss.push([x,1.2,1.05,.116,.07,.5,0xfffcf2]); if([0,1,3,4,5].indexOf(i%7)>=0 && i<21) schwarz.push([x+.064,1.265,.93,.07,.08,.28,0x101014]); }
      MUS.viele(g,GEO.box,weiss); MUS.viele(g,GEO.box,schwarz);
      box(g,3.1,.05,.05,GOLD,0,1.09,1.32);
      /* Notenpult mit Noten */
      const n=bild(256,128,(c)=>{ c.fillStyle='#fbf6e6'; c.fillRect(0,0,256,128); c.fillStyle='#b8a880'; c.fillRect(126,0,4,128); c.fillStyle='#222';
        [18,58,98].forEach((y,z)=>{ for(let i=0;i<5;i++){ c.fillRect(10,y+i*5,108,1); c.fillRect(138,y+i*5,108,1); } for(let i=0;i<4;i++){ [20,148].forEach(x0=>{ const x=x0+i*25, yy=y+((i*7+z*3)%5)*4+3; oval(c,x,yy,5,3.5,'#222'); c.fillRect(x+3,yy-17,2,17); }); } }); });
      const pult=gruppe(g,0,1.92,.42); pult.rotation.x=-.25; box(pult,1.35,.7,.05,LACK,0,0,-.03); MUS.tafel(pult,n,1.15,.56,0,.01,.01);
      /* Fußpedale und Hocker */
      box(g,.1,.7,.1,LACK,0,.62,.3); box(g,.55,.1,.2,LACK,0,.24,.35); [-.15,0,.15].forEach(x=>box(g,.07,.04,.22,GOLD,x,.2,.5));
      [-.55,.55].forEach(x=>[-.2,.2].forEach(z=>walze(g,.065,.52,LACK,x,.26,1.75+z))); box(g,1.35,.12,.6,LACK,0,.56,1.75); box(g,1.25,.14,.52,SAMT,0,.68,1.75); } },
  { x:13.4, z:4.4, dreh:-.35, steh:[12.35,6.35], kasten:[1.95,1.6], treffer:[1.9,5.1,1.3], baue(g,k){ /* 10 Standuhr mit schwingendem Pendel */
      const K=0x7a3a1c, K2=0x4e220e;
      box(g,1.55,.34,.95,K2,0,.17,0); box(g,1.38,.5,.82,K,0,.58,0); box(g,.9,.28,.04,K2,0,.58,.42); box(g,1.5,.12,.92,K2,0,.89,0);
      /* offener Pendelkasten: Rückwand, Seiten, Goldrand */
      box(g,1.1,1.7,.1,K2,0,1.8,-.3); [-1,1].forEach(s=>{ box(g,.16,1.7,.7,K,s*.52,1.8,0); box(g,.07,1.64,.06,GOLD,s*.43,1.8,.36); });
      box(g,.88,.07,.06,GOLD,0,1.0,.36); box(g,.88,.07,.06,GOLD,0,2.6,.36);
      box(g,1.5,.14,.92,K2,0,2.72,0); box(g,1.42,1.35,.84,K,0,3.46,0); box(g,1.64,.16,1.0,K2,0,4.2,0);
      const bogen=walze(g,.55,.8,K,0,4.24,0); bogen.rotation.x=Math.PI/2; const br=ring(g,.57,.06,GOLD,0,4.26,.42,Math.PI); br.scale.y=.95;
      ball(g,.14,GOLD,0,4.92,0); [-.68,.68].forEach(x=>{ ball(g,.11,GOLD,x,4.38,.35); walze(g,.06,1.22,GOLD,x,3.46,.43); });
      const blatt=bild(256,256,(c)=>{ c.fillStyle='#d8a73a'; c.fillRect(0,0,256,256); oval(c,128,128,116,116,'#fbf5e2'); c.fillStyle='#2a1a08'; c.font='700 30px Andika, Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle';
        for(let i=1;i<=12;i++){ const a=i*Math.PI/6; c.fillText(String(i),128+Math.sin(a)*90,128-Math.cos(a)*90); } });
      const z=new THREE.Mesh(new THREE.CircleGeometry(.55,32),new THREE.MeshLambertMaterial({map:blatt})); z.position.set(0,3.46,.432); g.add(z); ring(g,.57,.055,GOLD,0,3.46,.44);
      const zeiger=[[.3,.065],[.43,.04]].map(([l,d],i)=>{ const q=gruppe(g,0,3.46,.46+i*.025); q.userData.lebendig=true; box(q,d,l,.025,SCHWARZ,0,l/2-.05,0); return q; });
      ball(g,.065,SCHWARZ,0,3.46,.51);
      const pendel=gruppe(g,0,2.62,.08); pendel.userData.lebendig=true; box(pendel,.06,1.15,.04,MESSING,0,-.56,0); liegend(walze(pendel,.24,.09,GOLD,0,-1.2,0)); liegend(walze(pendel,.12,.11,MESSING2,0,-1.2,.005)); verschmelze(pendel);
      k.anim.push(t=>{ pendel.rotation.z=Math.sin(t*2.6)*.22; zeiger[0].rotation.z=-2.2-t*.012; zeiger[1].rotation.z=-t*.14; }); } }
];

return { titel:'Die Gemäldegalerie', breite:B, tiefe:T, oben:['24,8,10','60,22,26','104,46,48'], baue, gegenstaende, verstecke };
})();

/* Raum 4: Die Restaurierungswerkstatt. Helle, saubere Werkstatt in Weiß und Grau: große Fenster, Arbeitslampen,
   Regale mit Archivschachteln und halb reparierten Fundstücken,
   am Rand Trockengestelle, Rahmenständer, Spülbecken, Schubladenschränke, Gipsform-Tische und Leinwandrollen.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Mikroskop) und 10 (Rollwagen mit Fläschchen) sind neu.
   Ausgang: Eisentür mit goldenem Zahlenschloss in der Mitte der Rückwand, sie schwingt auf, dahinter führt eine Treppe nach oben.
   Leben: eine Maus huscht zwischen den Möbeln. */
RAEUME3D.museum[3] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, MARMOR, MARMOR2, MARMOR3, ROT, GOLD, SCHWARZ, WEISS } = MUS;
const B=36, T=27, H=6.6, HINTEN=-13.5;
const GRAU=0xbcc5ca, GRAU2=0x8a969e, GRAU3=0x5c6870, HELL=0xeef1f2, EISEN=0x46545f, EISEN2=0x2c363e, CHROM=0xc8d4da,
  TON=0xc8764a, TON2=0xa0562e, BUCHE=0xc99a62, BUCHE2=0xa87a46, GLASBLAU=0xaee4f8, PETROL=0x1f7c84, NACHT=0x233a66;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* flache runde Scheibe mit Blick nach +z */
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
/* heller Werkstatt-Tisch mit grauen Beinen, Platte oben bei Höhe h */
function tisch(g,b,t,h,platte){
  box(g,b,.18,t,platte||BUCHE,0,h-.09,0); box(g,b-.25,.14,t-.25,GRAU3,0,h-.25,0);
  [-1,1].forEach(s=>[-1,1].forEach(v=>box(g,.18,h-.18,.18,GRAU3,s*(b/2-.2),(h-.18)/2,v*(t/2-.2))));
  box(g,b-.4,.09,.1,GRAU3,0,.34,-(t/2-.2));
}
/* weicher, runder Pinsel; Fuß bei (x,y,z) */
function pinsel(p,x,y,z,farbe,neig,kipp){
  const g=gruppe(p,x,y,z); g.rotation.set(kipp||0,0,neig||0);
  walze(g,.045,.75,BUCHE2,0,.37,0); walze(g,.07,.16,CHROM,0,.8,0); ball(g,.1,farbe,0,.97,0,.85,1.5,.7);
  return g;
}
/* bauchige Vase; fehlt: true zeigt eine Lücke mit Klebestreifen (halb repariert) */
function vase(p,x,y,z,s,farbe,fehlt){
  const g=gruppe(p,x,y,z); g.scale.setScalar(s);
  walze(g,.2,.08,TON2,0,.04,0); rohr(g,.4,.22,.38,farbe,0,.27,0); rohr(g,.18,.4,.34,farbe,0,.63,0); walze(g,.15,.2,farbe,0,.88,0); liegend(ring(g,.18,.05,TON2,0,.98,0)); liegend(ring(g,.405,.03,0xf0dcb0,0,.46,0));
  [-1,1].forEach(v=>{ const h=ring(g,.14,.035,farbe,v*.24,.76,0); h.scale.x=.8; });
  if(fehlt){ box(g,.26,.22,.06,0x3a2014,.08,.3,.33).rotation.z=.5; box(g,.08,.5,.03,0xf6e6a0,-.16,.46,.4).rotation.z=-.45; box(g,.34,.07,.03,0xf6e6a0,.1,.52,.39).rotation.z=.2; }
}

/* ---------- Bilder ---------- */
function landschaft(g,x,y,w,h){
  g.fillStyle='#8cccf0'; g.fillRect(x,y,w,h); g.fillStyle='#ffe870'; g.beginPath(); g.arc(x+w*.76,y+h*.24,h*.11,0,7); g.fill();
  g.fillStyle='#8aa0c0'; g.beginPath(); g.moveTo(x,y+h*.65); g.lineTo(x+w*.3,y+h*.28); g.lineTo(x+w*.62,y+h*.65); g.fill();
  g.fillStyle='#62a848'; g.beginPath(); g.moveTo(x,y+h*.6); g.quadraticCurveTo(x+w*.4,y+h*.45,x+w,y+h*.66); g.lineTo(x+w,y+h); g.lineTo(x,y+h); g.fill();
  g.fillStyle='#c84a30'; g.fillRect(x+w*.62,y+h*.6,w*.16,h*.16); g.fillStyle='#7a2a1a'; g.beginPath(); g.moveTo(x+w*.6,y+h*.61); g.lineTo(x+w*.7,y+h*.49); g.lineTo(x+w*.8,y+h*.61); g.fill();
}
/* Bild auf der Staffelei: linke Hälfte noch vergilbt, rechte schon gereinigt */
function gemaeldeBild(){
  return bild(384,288,(g)=>{ landschaft(g,0,0,384,288); g.fillStyle='rgba(120,86,30,.55)'; g.beginPath(); g.moveTo(0,0); g.lineTo(190,0); g.lineTo(150,288); g.lineTo(0,288); g.fill();
    g.strokeStyle='rgba(60,40,15,.6)'; g.lineWidth=2; [[30,40],[80,150],[50,230],[120,70]].forEach(p=>{ g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(p[0]+18,p[1]+14); g.lineTo(p[0]+12,p[1]+34); g.stroke(); }); });
}
function skizzenBild(art){
  return bild(160,192,(g)=>{ g.fillStyle=['#fffdf6','#fff4bc','#e4f0fc'][art%3]; g.fillRect(0,0,160,192); g.strokeStyle='#4a4038'; g.lineWidth=5; g.lineCap='round'; g.lineJoin='round'; g.beginPath();
    if(art===0){ /* Vase */ g.moveTo(62,35); g.lineTo(98,35); g.moveTo(68,38); g.quadraticCurveTo(68,62,45,90); g.quadraticCurveTo(35,130,65,158); g.lineTo(95,158); g.quadraticCurveTo(125,130,115,90); g.quadraticCurveTo(92,62,92,38); g.moveTo(45,100); g.lineTo(115,100); }
    else if(art===1){ /* Dinoschädel */ g.moveTo(30,110); g.quadraticCurveTo(30,45,90,55); g.quadraticCurveTo(140,80,138,105); g.lineTo(80,108); g.lineTo(130,130); g.quadraticCurveTo(70,160,30,110); g.moveTo(80,82); g.arc(70,82,10,0,7); }
    else if(art===2){ /* Säule */ g.rect(45,35,70,16); g.moveTo(58,52); g.lineTo(58,145); g.moveTo(80,52); g.lineTo(80,145); g.moveTo(102,52); g.lineTo(102,145); g.rect(45,146,70,16); }
    else if(art===3){ /* Münze */ g.arc(80,96,52,0,7); g.moveTo(115,96); g.arc(80,96,35,0,7); g.moveTo(66,110); g.lineTo(80,72); g.lineTo(94,110); }
    else { /* Figur */ g.arc(80,52,20,0,7); g.moveTo(80,74); g.lineTo(80,120); g.moveTo(45,92); g.lineTo(115,92); g.moveTo(80,120); g.lineTo(55,162); g.moveTo(80,120); g.lineTo(105,162); }
    g.stroke(); g.strokeStyle='#9a8c7c'; g.lineWidth=3; g.beginPath(); g.moveTo(25,176); g.lineTo(135,176); g.stroke(); });
}
function anleitungBild(){
  return bild(384,480,(g)=>{ g.fillStyle='#fffefa'; g.fillRect(0,0,384,480); g.fillStyle='#1f7c84'; g.fillRect(0,0,384,84);
    g.fillStyle='#ffffff'; g.font='700 40px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('Anleitung',192,55);
    [['#3f8a4a',0],['#e89020',1],['#2a6aa0',2],['#c83a2a',3]].forEach(([c,i])=>{ const y=140+i*92; g.fillStyle=c; g.beginPath(); g.arc(55,y,30,0,7); g.fill(); g.fillStyle='#fff'; g.fillText(String(i+1),55,y+2);
      g.fillStyle='#8a9096'; g.fillRect(105,y-20,235-(i%2)*45,11); g.fillRect(105,y+9,185+(i%2)*40,11); }); });
}
function fensterBild(){
  return bild(256,256,(c)=>{ const v=c.createLinearGradient(0,0,0,256); v.addColorStop(0,'#84ccf6'); v.addColorStop(1,'#eefaff'); c.fillStyle=v; c.fillRect(0,0,256,256);
    c.fillStyle='#ffffff'; [[62,62],[180,108]].forEach(p=>[[-24,5,19],[0,-7,28],[26,5,19]].forEach(q=>{ c.beginPath(); c.arc(p[0]+q[0],p[1]+q[1],q[2],0,7); c.fill(); }));
    c.fillStyle='#86b870'; [[30,262,52],[100,274,58],[185,262,54],[250,272,46]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],p[2],0,7); c.fill(); }); });
}

/* großes Sprossenfenster, Blick nach +z */
function fenster(par,glas,x,y,z,b,h){
  const g=gruppe(par,x,y,z); const m=new THREE.Mesh(new THREE.PlaneGeometry(b,h),glas); m.position.set(0,h/2,.03); g.add(m);
  [-1,1].forEach(s=>box(g,.18,h+.18,.18,WEISS,s*b/2,h/2,.08)); [0,h].forEach(v=>box(g,b+.18,.18,.18,WEISS,0,v,.08));
  [-1,1].forEach(s=>box(g,.08,h,.08,WEISS,s*b/6,h/2,.08)); box(g,b,.09,.08,WEISS,0,h*.62,.085);
  box(g,b+.5,.16,.42,GRAU,0,-.12,.2); [-1,1].forEach(s=>box(g,.12,h+.4,.1,GRAU2,s*(b/2+.2),h/2,.05)); box(g,b+.52,.14,.12,GRAU2,0,h+.2,.06);
  return g;
}

/* ---------- Ausgang: Eisentür mit Treppe nach oben ---------- */
const STUFE_AB=-14.05, HOCHBIS=1.55;
function baueEisentuer(k,sc,hinten){
  /* Treppenhaus hinter der Rückwand (erst beim Öffnen sichtbar) */
  const raum=gruppe(hinten,0,0,0);
  box(raum,4,.08,5.6,GRAU3,0,-.045,-16.5);
  [-1,1].forEach(s=>box(raum,.2,5.4,5.4,0xd8cfc0,s*2.1,2.7,-16.65));
  for(let i=0;i<9;i++){ const z=STUFE_AB-.25-i*.5, h=(i+1)*.3; box(raum,3.4,h,.5,i%2?0xb4a890:0xc6bba4,.22,h/2,z); box(raum,3.42,.07,.12,0xf2e8d0,.22,h,z+.22); }
  /* Handlauf */
  strich(raum,[1.82,1.35,-14.1],[1.82,4.05,-18.6],.07,MESSING); [0,3,6].forEach(i=>{ const z=STUFE_AB-.25-i*.5, h=(i+1)*.3; strich(raum,[1.82,h,z],[1.82,1.35+(-14.1-z)*.6,z],.045,MESSING2); });
  const ende=bild(128,128,(g)=>{ const v=g.createRadialGradient(64,50,5,64,50,100); v.addColorStop(0,'#ffffff'); v.addColorStop(.45,'#fff2bc'); v.addColorStop(1,'#e8b868'); g.fillStyle=v; g.fillRect(0,0,128,128); });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4.4,6),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,3,-19.3); raum.add(e);
  verschmelze(raum); ohneSchatten(raum); raum.visible=false;
  /* steinerne Einfassung */
  const r=gruppe(hinten,0,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.55,4.2,.42,MARMOR3,s*2.08,2.1,.1); for(let i=0;i<5;i++) box(r,.62,.05,.46,GRAU3,s*2.08,.8*i+.55,.1); box(r,.72,.3,.55,GRAU3,s*2.08,.15,.12); });
  box(r,4.9,.46,.46,MARMOR3,0,4.28,.1); box(r,.62,.56,.52,GRAU3,0,4.3,.12); box(r,3.7,.06,.7,GRAU3,0,.03,.2);
  verschmelze(r);
  /* Türflügel, Drehpunkt links, schwingt nach hinten ins Treppenhaus */
  const tuerG=gruppe(hinten,-1.75,0,HINTEN-.1); tuerG.userData.lebendig=true; const d=gruppe(tuerG,0,0,0);
  box(d,3.5,3.96,.2,EISEN,1.75,2.04,0);
  [.35,1.25,3.87].forEach(y=>{ box(d,3.44,.2,.07,EISEN2,1.75,y,.12); for(let i=0;i<8;i++) ball(d,.065,CHROM,.25+i*.43,y,.17); });
  [.12,3.38].forEach(x=>box(d,.12,3.9,.05,EISEN2,x,2.04,.11)); [.35,3.87].forEach(y=>box(d,.5,.1,.08,SCHWARZ,.3,y,.16));
  /* kleines Gitterfenster oben */
  box(d,1.2,.46,.05,0x14181c,1.75,3.5,.1); [-.35,0,.35].forEach(x=>walze(d,.035,.46,CHROM,1.75+x,3.5,.15));
  /* Ringgriff */
  ball(d,.12,CHROM,3.0,1.8,.16); ring(d,.2,.05,CHROM,3.0,1.62,.22);
  /* Schild mit Zahlenschloss */
  box(d,1.74,1.42,.06,GOLD,1.75,2.4,.13); box(d,1.58,1.26,.07,0xfff4d4,1.75,2.4,.14);
  const s=gruppe(d,1.75,2.3,.28); s.scale.setScalar(1.4); MUS.zahlenschloss(s,0,0,0);
  verschmelze(d);
  const glanz=schein(hinten,'rgba(255,215,100,.5)',0,2.4,HINTEN+.7,1.3);
  const licht=new THREE.PointLight(0xffdc98,0,12,1.5); licht.position.set(.3,3.8,-15.6); sc.add(licht);
  k.kasten(0,-13.1,4.9,.8);
  const tuer=ausgang(k,{ name:'Eisentür', einfach:'Tür aus Eisen', steh:[0,-11], durch:[.25,-16.5], hoch:HOCHBIS,
    treffer:{x:0,y:2.2,z:-13.1,b:4.5,h:4.4,t:.8}, schildOben:[0,4.75,-12.7], glanz:[0,2.3,-12.8],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.85)); tuerG.rotation.y=1.55*a*a*(3-2*a); raum.visible=auf>.01; licht.intensity=1.5*auf; glanz.visible=auf<.05; glanz.material.opacity=.4+Math.sin(t*2.2)*.25; } });
  /* Die Figur geht Stufe für Stufe mit nach oben */
  k.anim.push(()=>{ const f=k.figur&&k.figur(); if(tuer.offen && f && f.position.z<STUFE_AB) f.position.y=Math.max(0,Math.min(HOCHBIS,(STUFE_AB-f.position.z)*.6+.15)); });
  return tuer;
}

/* ---------- Wände: Fenster, Uhr, Regale mit Archivschachteln und halb reparierten Fundstücken ---------- */
function wandRegal(k,par,s,z){
  const g=gruppe(par,s*17.52,0,z); g.rotation.y=-s*Math.PI/2;
  [-1.55,1.55].forEach(x=>box(g,.12,3.7,.8,GRAU3,x,1.85,0)); [.25,1.35,2.45,3.65].forEach(y=>box(g,3.2,.1,.82,HELL,0,y,0));
  /* Archivschachteln unten */
  [.3,1.4].forEach((y,e)=>[-1,0,1].forEach(i=>{ const h=.72-((i+e+3)%2)*.14; box(g,.86,h,.64,[0xa8b4bc,0xc8b494,0x7c99a8][(i+e+4)%3],i*.98,y+h/2,0); box(g,.4,.18,.03,WEISS,i*.98,y+h*.55,.33); }));
  /* halb reparierte Fundstücke oben */
  vase(g,-1.0,2.5,0,.9,TON,true);
  const kopf=gruppe(g,.05,2.5,0); walze(kopf,.3,.14,MARMOR3,0,.07,0); walze(kopf,.12,.2,MARMOR,0,.22,0); ball(kopf,.3,MARMOR,0,.56,0,.9,1.1,.9); ball(kopf,.07,MARMOR2,0,.52,.28); box(kopf,.5,.07,.03,0xf6e6a0,-.03,.7,.26).rotation.z=.35;
  vase(g,1.0,2.5,0,.75,0xe8d8b4,s<0);
  vase(g,-.6,3.7,0,.65,0x6a94a8,false); box(g,.9,.3,.55,0xc8b494,.65,3.85,0);
  k.kasten(s*17.45,z,.9,3.35);
}
function wanduhr(k,hinten,x){
  const g=gruppe(hinten,0,0,0); scheibe(g,.62,.14,GRAU3,x,4.6,HINTEN+.1); scheibe(g,.52,.16,WEISS,x,4.6,HINTEN+.11);
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(g,.032,SCHWARZ,x+Math.cos(a)*.42,4.6+Math.sin(a)*.42,HINTEN+.2); }
  box(g,.3,.05,.03,SCHWARZ,x+.12,4.6,HINTEN+.21); ball(g,.065,ROT,x,4.6,HINTEN+.25); verschmelze(g); ohneSchatten(g);
  const z=gruppe(hinten,x,4.6,HINTEN+.23); box(z,.05,.38,.03,SCHWARZ,0,.16,0); k.anim.push(t=>{ z.rotation.z=-t*.2; });
}
/* stehende Arbeitslampe neben den Arbeitsplätzen (wird durchsichtig, wenn sie vor der Figur steht) */
function stehlampe(k,sc,x,z,farbe){
  const g=gruppe(sc,x,0,z), s=x<0?1:-1; /* der Schirm zeigt zur Raummitte */
  walze(g,.45,.12,GRAU3,0,.06,0); walze(g,.055,3.0,GRAU3,0,1.55,0); ball(g,.1,CHROM,0,3.05,0); strich(g,[0,3.05,0],[s*.45,3.3,0],.045,GRAU3);
  const l=gruppe(g,s*.6,3.2,0); l.rotation.z=s*.35; rohr(l,.14,.42,.4,farbe,0,0,0,20,true); walze(l,.15,.1,farbe,0,.22,0); ball(l,.15,basis(0xfff6d0),0,-.16,0);
  verschmelze(g); schein(g,'rgba(255,244,200,.45)',s*.65,3.02,0,1.1); k.verdecker(g,x,z,.55); k.kreis(x,z,.45);
}

/* ---------- niedrige Randausstattung ---------- */
/* Gruppe mit Hindernis; dreh nur in Viertelschritten, b und t gelten vor dem Drehen */
function moebel(k,sc,x,z,dreh,b,t){
  const g=gruppe(sc,x,0,z); g.rotation.y=dreh; const seitlich=Math.abs(Math.sin(dreh))>.5; k.kasten(x,z,seitlich?t:b,seitlich?b:t); return g;
}
/* Trockengestell mit leeren, weißen Leinwänden */
function trockengestell(k,sc,x,z,dreh){
  const g=moebel(k,sc,x,z,dreh,3.1,1.3);
  [-1.45,1.45].forEach(a=>{ box(g,.14,.14,1.25,HOLZ,a,.07,0); box(g,.12,1.5,.12,HOLZ,a,.8,-.5); box(g,.12,.55,.12,HOLZ,a,.4,.52); });
  box(g,3.0,.1,.1,HOLZ2,0,1.45,-.5); box(g,3.0,.12,1.1,BUCHE2,0,.2,0);
  [[-.45,-.32,2.0,1.45],[.5,0,1.65,1.15],[-.3,.33,1.3,.8]].forEach(([a,c,w,h])=>{ const l=gruppe(g,a,.26,c); l.rotation.x=-.12; box(l,w,h,.08,BUCHE,0,h/2,0); box(l,w-.16,h-.16,.03,0xfffcf2,0,h/2,.045); [-1,1].forEach(v=>box(l,.07,.07,.03,CHROM,v*(w/2-.08),h-.08,.065)); });
}
/* Ständer mit leeren Bilderrahmen und stumpfen Rahmenleisten */
function rahmenstaender(k,sc,x,z,dreh){
  const g=moebel(k,sc,x,z,dreh,3.0,1.3);
  box(g,2.9,.18,1.2,GRAU3,0,.09,0); [-1.38,1.38].forEach(a=>box(g,.12,.55,1.2,GRAU2,a,.45,0)); box(g,2.8,.14,.1,GRAU2,0,.55,.55);
  const rahmen=(a,c,w,h,f)=>{ const l=gruppe(g,a,.18,c); l.rotation.x=-.14; [.07,h-.07].forEach(y=>box(l,w,.14,.1,f,0,y,0)); [-1,1].forEach(v=>box(l,.14,h,.1,f,v*(w/2-.07),h/2,0)); };
  rahmen(-.55,-.3,1.5,1.5,GOLD); rahmen(-.25,.08,1.25,1.15,HOLZ2); rahmen(-.6,.38,.95,.8,MESSING2);
  [[.55,1.75,BUCHE],[.8,1.45,HOLZ],[1.05,1.9,GOLD],[.68,1.2,HOLZ2]].forEach(([a,h,f],i)=>box(g,.14,h,.14,f,a,.18+h/2,-.3+i*.2));
}
/* Spülbecken mit Wasserhahn */
function spuelbecken(k,sc,x,z,dreh){
  const g=moebel(k,sc,x,z,dreh,2.8,1.3);
  box(g,2.6,1.1,1.05,GRAU,0,.58,0); box(g,2.5,.1,.95,GRAU3,0,.05,0); [-.64,.64].forEach(a=>{ box(g,1.15,.82,.05,HELL,a,.6,.54); box(g,.3,.07,.07,GRAU3,a,.88,.59); });
  box(g,2.75,.12,1.2,CHROM,0,1.18,0); [-.5,.5].forEach(c=>box(g,1.7,.2,.1,WEISS,-.3,1.32,c)); [-1.15,.55].forEach(a=>box(g,.1,.2,1.0,WEISS,a,1.32,0)); box(g,1.6,.03,.9,0x7cc4e0,-.3,1.25,0);
  walze(g,.09,.7,CHROM,-.3,1.6,-.52); strich(g,[-.3,1.95,-.52],[-.3,1.95,-.1],.07,CHROM); strich(g,[-.3,1.95,-.1],[-.3,1.75,-.08],.065,CHROM); [-.62,.02].forEach((a,i)=>ball(g,.09,i?0xd83a30:0x2a70d0,a,1.38,-.52));
  box(g,.6,.08,.8,0xf0ece0,.98,1.28,0); box(g,.62,.09,.14,0xe86048,.98,1.285,.2);
}
/* flacher Schubladenschrank mit zwei Papprollen obenauf */
function schubladen(k,sc,x,z,dreh){
  const g=moebel(k,sc,x,z,dreh,3.2,1.6);
  box(g,3.05,1.35,1.45,0x6e8c9a,0,.75,0); box(g,2.9,.1,1.3,GRAU3,0,.05,0); box(g,3.18,.12,1.58,BUCHE,0,1.48,0);
  [.3,.57,.84,1.11,1.34].forEach(y=>[-.74,.74].forEach(a=>{ box(g,1.38,.21,.05,0x9cb6c0,a,y,.74); box(g,.34,.05,.05,MESSING,a,y,.79); }));
  [[-.2,0xe8dcc0],[.3,0xc8a878]].forEach(([c,f],i)=>{ quer(walze(g,.17,2.2-i*.4,f,-.2+i*.3,1.71,c)); });
}
/* Tisch mit eckigen Gipsformen (mit Vertiefung) und Gipsbrocken */
function gipstisch(k,sc,x,z,dreh){
  const g=moebel(k,sc,x,z,dreh,3.0,1.7);
  tisch(g,2.85,1.55,1.1,HELL);
  [[-.8,-.1,.2],[.2,.15,-.15]].forEach(([a,c,w])=>{ const f=gruppe(g,a,1.1,c); f.rotation.y=w; box(f,.85,.3,.7,0xf4f0e4,0,.15,0); box(f,.55,.02,.4,0xb8b0a0,0,.31,0); box(f,.3,.025,.18,0x968c7c,0,.315,0); [-.34,.34].forEach(v=>ball(f,.05,GRAU3,v,.31,.27)); });
  box(g,.5,.5,.5,0xf4f0e4,1.02,1.35,-.3); box(g,.52,.09,.52,PETROL,1.02,1.35,-.3);
  [[.9,.35],[1.15,.5],[-.2,-.5]].forEach(([a,c],i)=>box(g,.2,.12,.17,0xe8e2d4,a,1.17,c).rotation.y=i);
  box(g,2.2,.28,.9,0xd8d0c0,-.1,.52,0);
}
/* Bock mit großen Leinwandrollen */
function rollenbock(k,sc,x,z,dreh){
  const g=moebel(k,sc,x,z,dreh,3.2,1.4);
  [-1.25,1.25].forEach(a=>{ box(g,.18,.14,1.3,GRAU3,a,.07,0); box(g,.16,1.5,.16,GRAU3,a,.8,-.15); [.55,1.35].forEach(y=>box(g,.16,.1,.75,GRAU3,a,y,.1)); });
  [[.88,.18,0xf2e8d0],[1.65,.14,0xd8c49c]].forEach(([y,c,f])=>{ quer(walze(g,.27,2.95,f,0,y,c)); [-1.5,1.5].forEach(a=>quer(walze(g,.1,.08,HOLZ2,a,y,c))); });
  box(g,2.2,.5,.04,0xf2e8d0,0,.6,.46);
}
/* eckiger Werkhocker */
function hocker(k,sc,x,z,farbe){
  const g=gruppe(sc,x,0,z); box(g,.8,.14,.8,farbe,0,.82,0); [-1,1].forEach(a=>[-1,1].forEach(b=>strich(g,[a*.27,.78,b*.27],[a*.36,0,b*.36],.06,GRAU3))); [-.32,.32].forEach(a=>box(g,.05,.05,.66,GRAU3,a,.3,0)); k.kreis(x,z,.5);
}
/* Tritthocker mit zwei Stufen */
function tritt(k,sc,x,z){
  const g=moebel(k,sc,x,z,0,1.2,1.1); box(g,1.1,.14,.5,BUCHE,0,.35,.25); box(g,1.1,.14,.5,BUCHE,0,.72,-.22); [-.5,.5].forEach(a=>{ box(g,.1,.3,.45,GRAU3,a,.15,.25); box(g,.1,.66,.45,GRAU3,a,.33,-.22); });
}
/* viele kleine Farbtupfen am Boden */
function spritzer(g,x,z,wx,wz,n,y){
  const F=[0x2468d8,0xe03828,0xf8c020,0x30a048,0x9040b8];
  for(let i=0;i<n;i++){ const a=x+(zufall()-.5)*2*wx, c=z+(zufall()-.5)*2*wz, r=.025+zufall()*zufall()*.09; walze(g,r,.006,F[i%5],a,y,c).scale.z=r*(.5+zufall()); }
}
/* flaches Abdecktuch mit Falten und Farbspritzern (kein Hindernis) */
function abdecktuch(sc,x,z,b,t,dreh){
  const g=gruppe(sc,x,0,z); g.rotation.y=dreh; box(g,b,.012,t,0xd6ccb4,0,.012,0); box(g,b*.5,.012,t*.35,0xd6ccb4,b*.32,.016,t*.4).rotation.y=.35;
  [[-.28,-.2,.5],[.12,.15,-.3],[.3,-.25,.9]].forEach(([a,c,w])=>box(g,b*.42,.008,.07,0xbcb094,a*b,.022,c*t).rotation.y=w);
  spritzer(g,0,0,b*.42,t*.4,26,.026);
  ohneSchatten(g); verschmelze(g);
}

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  const h=MUS.huelle(k,{ B,T,H, himmelLicht:0xf6faff, grund:0x868c92, staerke:.62, sonne:0xfff6e6, sonneStaerke:.34,
    wandBild:MUS.tapeteBild('#dfe4e6','rgba(130,145,155,.1)'), bodenBild:MUS.fliesenBild([180,182,180],[158,166,170],'#6c747a',4),
    leiste:GRAU2, sockel:1.3, sockelFarbe:GRAU, oeffnung:{x:0,b:3.7,h:4.1} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  /* grauer Grund rund um den Raum, falls beim Drehen eine Wand ausgeblendet ist */
  const um=new THREE.Mesh(new THREE.PlaneGeometry(90,70),basis(0x5a6268)); um.rotation.x=-Math.PI/2; um.position.y=-.055; sc.add(um);
  const tuer=baueEisentuer(k,sc,hinten);

  /* große Fenster */
  const glas=basis(0xffffff,{map:fensterBild()});
  const rueck=gruppe(hinten,0,0,0);
  [[-15.7,2.8],[-6.1,3.6],[13.7,3.8]].forEach(([x,b])=>fenster(rueck,glas,x,2.0,HINTEN,b,3.5));
  verschmelze(rueck); ohneSchatten(rueck);
  wanduhr(k,hinten,16.9);
  /* Arbeitslampe an der Rückwand neben der Tür */
  { const g=gruppe(hinten,3.15,0,HINTEN); scheibe(g,.2,.1,GRAU3,0,5.55,.08); strich(g,[0,5.55,.1],[0,5.7,.65],.05,GRAU3); rohr(g,.14,.45,.42,PETROL,0,5.45,.7,20,true); walze(g,.15,.1,PETROL,0,5.69,.7); ball(g,.16,basis(0xfff6d0),0,5.28,.7); verschmelze(g); ohneSchatten(g); schein(g,'rgba(255,244,200,.45)',0,5.2,.8,1.2); }

  const wl=gruppe(links,0,0,0), wr=gruppe(rechts,0,0,0);
  [[wl,-1,[-8.9,3,10.9]],[wr,1,[-8.2,.8,10.2]]].forEach(([w,s,zs])=>zs.forEach(z=>{ const f=fenster(w,glas,s*(B/2),1.9,z,3.6,3.6); f.rotation.y=-s*Math.PI/2; }));
  wandRegal(k,wl,-1,-4.6); wandRegal(k,wl,-1,7.0); wandRegal(k,wr,1,-4.2); wandRegal(k,wr,1,-12.0);
  [wl,wr].forEach(verschmelze);

  /* Ausstattung am Rand und seitlich der Mitte */
  const deko=gruppe(sc,0,0,0);
  spuelbecken(k,deko,-16.9,-9.2,Math.PI/2);
  gipstisch(k,deko,-15,-5.6,Math.PI/2);
  trockengestell(k,deko,-14.6,-.6,Math.PI/2);
  rahmenstaender(k,deko,-14.3,10.7,0);
  trockengestell(k,deko,-6.6,11.3,0);
  rahmenstaender(k,deko,6.2,11.3,0);
  rollenbock(k,deko,14.1,11.2,0);
  rollenbock(k,deko,12.3,6.6,-Math.PI/2);
  schubladen(k,deko,16.6,5.6,-Math.PI/2);
  gipstisch(k,deko,14.9,2.4,-Math.PI/2);
  schubladen(k,deko,14.4,-7.4,0);
  hocker(k,deko,-3.4,1.7,PETROL); hocker(k,deko,-10.4,1.6,0xc8703a);
  tritt(k,deko,3.8,1.4);
  verschmelze(deko);

  /* flache Läufer, Abdecktücher, Farbspritzer und Klebestreifen (keine Hindernisse) */
  MUS.teppich(sc,0,-7.4,2.9,8.6,0x4a7488,0xd8dee0);
  MUS.teppich(sc,.2,10.2,6.4,3.0,0x3f7074,0xd8d2c0);
  abdecktuch(sc,1.3,4.9,3.8,2.7,.2);
  abdecktuch(sc,-9.3,8.9,3.4,2.4,-.3);
  abdecktuch(sc,9.0,-7.8,3.0,2.2,.15);
  const boden=gruppe(sc,0,0,0);
  [[2.1,.1,1.1,.9],[-2.2,3.6,1.4,.9],[-8.2,-7.4,1.1,.8],[10,.8,1.2,.9],[-3,9,1.3,.8],[9.8,9.4,1.2,.9]].forEach(([x,z,a,b])=>spritzer(boden,x,z,a,b,14,.012));
  /* gelbe Klebestreifen markieren die Arbeitsbereiche */
  [[-1.9,2.9,1],[-12.9,2.4,1],[8.9,-5.2,0],[2.2,8.4,0]].forEach(([x,z,laengs])=>{ for(let i=0;i<5;i++) box(boden,laengs?.14:.55,.008,laengs?.55:.14,0xe8b820,x+(laengs?0:i*.85),.011,z+(laengs?i*.85:0)); });
  ohneSchatten(boden); verschmelze(boden);

  /* Arbeitslampen und Licht */
  [[-8,-2.4],[8.2,-4.7]].forEach(([x,z])=>{ stehlampe(k,sc,x,z,PETROL); const l=new THREE.PointLight(0xfff0cc,.3,10,1.5); l.position.set(x*.92,3.2,z); sc.add(l); });
  const tag=new THREE.PointLight(0xf0f8ff,.25,16,1.5); tag.position.set(0,5,6); sc.add(tag);

  /* Leben: eine Maus huscht zwischen den Möbeln */
  maeuschen(k,[[-8.4,-1.2],[-1.6,.6],[1.8,-1.4],[8.2,.8],[9.8,3.4],[2.6,3.2],[1.0,7.4],[-1.8,2.8],[-8.2,3.0]],2.4,3);

  return { tuer, start:[0,-2] };
}

/* Verstecke für den Edelstein */
const verstecke=[[-14.6,-10.4],[-8.6,-10.8],[-3.2,-10.4],[3.2,-9.8],[9.4,-10.4],[14.8,-9.8],[-12.6,-5.8],[-9,-4.4],[9.9,-5.6],[15,-.8],[-15.2,2.2],[-8.4,1.4],[-1.2,1.6],[9.4,1.8],[13.4,8.8],[-14.4,9.2],[-8.2,9.8],[-1.4,7.6],[3.2,11.6],[11.2,3.4]];

/* ---------- Gegenstände: Reihenfolge = ort 1 bis 10 ---------- */
const gegenstaende=[
  { x:-5.1, z:-8.8, steh:[-5.1,-6.6], kasten:[3.0,1.9], treffer:[2.9,3.9,1.8], baue(g){ /* 1 Staffelei mit Bild */
      [-1,1].forEach(s=>{ strich(g,[s*1.3,0,.5],[s*.28,3.75,-.05],.09,HOLZ); }); strich(g,[0,0,-.8],[0,3.65,-.1],.085,HOLZ2); box(g,.8,.14,.18,HOLZ2,0,3.62,-.02); ball(g,.13,MESSING,0,3.82,-.02);
      box(g,2.7,.14,.42,HOLZ,0,1.12,.38); box(g,2.7,.1,.06,HOLZ2,0,1.22,.58);
      const b=gruppe(g,0,2.2,.3); b.rotation.x=-.12; box(b,2.62,2.06,.12,HOLZ3,0,0,0); box(b,2.5,1.94,.13,GOLD,0,0,.01); MUS.tafel(b,gemaeldeBild(),2.26,1.7,0,0,.085);
      box(g,.5,.12,.2,HOLZ2,0,3.28,.19);
      /* Pinsel auf der Ablage */
      const p=gruppe(g,-.2,1.25,.42); p.rotation.z=-Math.PI/2; pinsel(p,0,0,0,0x2a6aa0,0); } },
  { x:-4.1, z:-3.4, steh:[-4.1,-1.2], kasten:[3.8,2.0], treffer:[3.8,3.5,2.0], baue(g,k){ /* 2 Arbeitstisch mit Lupe */
      tisch(g,3.7,1.9,1.35,0xd8b484); box(g,2.3,.04,1.35,0x3f7a6a,.2,1.38,.05);
      /* Fundstück: Teller aus Ton, zur Hälfte geklebt */
      walze(g,.52,.08,TON,.35,1.44,.15); liegend(ring(g,.39,.035,0xf0dcb0,.35,1.49,.15)); box(g,.05,.02,.9,0xfff0a0,.38,1.5,.15).rotation.y=.5; box(g,.32,.09,.25,TON2,1.05,1.45,.5).rotation.y=.7;
      /* Standlupe am Gelenkarm, niedrig, damit die Staffelei dahinter frei bleibt */
      walze(g,.3,.14,EISEN2,1.45,1.43,-.4); strich(g,[1.45,1.45,-.4],[1.35,2.1,-.35],.08,EISEN); ball(g,.12,MESSING,1.35,2.1,-.35); strich(g,[1.35,2.1,-.35],[.92,1.95,0],.07,EISEN);
      const l=gruppe(g,.4,1.9,.3); l.rotation.x=-.75; ring(l,.55,.095,EISEN2,0,0,0); ring(l,.47,.03,GOLD,0,0,.05);
      const gm=new THREE.Mesh(new THREE.CircleGeometry(.49,28),new THREE.MeshBasicMaterial({color:GLASBLAU,transparent:true,opacity:.5,side:THREE.DoubleSide,depthWrite:false})); l.add(gm);
      strich(l,[-.22,.1,.03],[-.04,.3,.03],.035,WEISS); ball(l,.04,WEISS,-.28,-.02,.03);
      /* Becher mit Pinseln */
      rohr(g,.26,.22,.42,0x2a6aa0,-1.35,1.56,-.1); walze(g,.22,.03,SCHWARZ,-1.35,1.76,-.1);
      [[-.12,0xc83a2a,.3],[0,0xe8b830,0],[.12,0x3f8a4a,-.32]].forEach(([a,c,n])=>pinsel(g,-1.35+a,1.58,-.1,c,n).scale.setScalar(.75));
      /* liegender Pinsel und Tuch */
      const p=gruppe(g,-1.5,1.43,.55); p.rotation.z=-Math.PI/2; pinsel(p,0,0,0,0xc83a2a,0); box(g,.55,.09,.45,0xf0ece0,-1.2,1.43,.1).rotation.y=.3; } },
  { x:4.7, z:-4.2, steh:[4.7,-2.1], r:1.2, treffer:[2.5,3.4,1.8], baue(g){ /* 3 Farbpalette mit Farbklecksen auf kleinem Tisch */
      walze(g,1.05,.14,HELL,0,1.05,0); liegend(ring(g,1.05,.05,GRAU3,0,1.05,0)); walze(g,.13,.95,GRAU3,0,.52,0); walze(g,.65,.1,GRAU3,0,.05,0);
      /* Palette schräg nach vorn auf einem kleinen Ständer */
      strich(g,[0,1.1,-.65],[0,2.0,-.45],.07,HOLZ2); box(g,1.5,.12,.2,HOLZ2,0,1.2,.38);
      const p=gruppe(g,0,1.98,0); p.rotation.x=-.5;
      const platte=scheibe(p,1,.12,0xd8a666,0,0,0); platte.scale.set(1.28,.12,.92); const rand=scheibe(p,1,.09,HOLZ,0,0,-.03); rand.scale.set(1.34,.09,.97);
      scheibe(p,.17,.15,HOLZ3,.62,-.38,0);
      [[-.88,.05,0xe02820,.22],[-.62,.47,0xf88a10,.2],[-.12,.63,0xf8d820,.21],[.42,.52,0x30a848,.2],[.86,.18,0x2468d8,.22],[-.62,-.4,0x9040b8,.19],[-.08,-.55,0xf8f8f4,.18]].forEach(([x,y,c,r],i)=>{ ball(p,r,c,x,y,.09,1,.85,.4); ball(p,r*.5,c,x+(i%2?.14:-.12),y-.12,.08,1,.8,.4); });
      ball(p,.24,0x58a0a0,0,0,.065,1.3,.8,.15);
      const q=gruppe(p,-.35,-.28,.22); q.rotation.z=-1.0; pinsel(q,0,0,0,0x2468d8,0); q.scale.setScalar(1.35);
      /* zwei Farbtuben */
      [[-.55,0xe02820],[.55,0x30a848]].forEach(([x,c])=>{ const t=gruppe(g,x,1.2,.72); t.rotation.y=x*.6; quer(walze(t,.09,.4,CHROM,0,0,0)); quer(walze(t,.095,.16,c,0,0,0)); quer(walze(t,.055,.12,c,.25,0,0)); }); } },
  { x:11.8, z:-2.4, steh:[9.4,-2.4], kasten:[3.3,2.5], treffer:[3.3,2.7,2.4], baue(g){ /* 4 Farbeimer */
      const eimer=(x,y,z,c,s)=>{ const e=gruppe(g,x,y,z); e.scale.setScalar(s); rohr(e,.62,.5,1.05,CHROM,0,.53,0,24); liegend(ring(e,.62,.05,GRAU3,0,1.06,0)); liegend(ring(e,.545,.025,GRAU3,0,.35,0)); walze(e,.57,.04,c,0,1.07,0);
        walze(e,.595,.34,c,0,.62,0);
        [[-.45,.42],[.05,.62],[.45,.3]].forEach(([w,l])=>{ const px=Math.sin(w*1.7)*.61, pz=Math.cos(w*1.7)*.61; strich(e,[px,1.08,pz],[px*.97,1.08-l,pz*.97],.075,c); ball(e,.095,c,px*.97,1.08-l,pz*.97); });
        const hg=ring(e,.63,.03,EISEN2,0,1.0,0,Math.PI); hg.rotation.x=-.75; [-1,1].forEach(v=>ball(e,.07,EISEN2,v*.63,1.0,0)); };
      eimer(-.85,0,.25,0x2468d8,1); eimer(.75,0,.42,0xe03828,1.05); eimer(.05,0,-.62,0x30a048,1);
      eimer(-.02,1.14,-.55,0xf8c820,.82);
      /* kleine Farbspritzer am Boden */
      [[-1.35,1.0,0x2468d8,.14],[1.35,1.05,0xe03828,.12],[-.1,1.1,0xf8c820,.1]].forEach(([x,z,c,r])=>{ walze(g,r,.02,c,x,.02,z); walze(g,r*.45,.02,c,x+.2,.02,z-.07); }); } },
  { x:4.35, z:HINTEN, wand:'hinten', steh:[4.35,-11.6], kasten:[3.55,.8], treffer:[3.5,2.55,.8], trefferY:1.15, baue(o){ /* 5 Pinnwand mit Skizzen */
      const g=gruppe(o,0,0,0); g.scale.setScalar(.85); /* verkleinert, damit sie im Startbild frei bleibt */
      box(g,4.1,2.8,.14,HOLZ,0,2.9,.1); box(g,3.84,2.54,.16,0xc89458,0,2.9,.12);
      for(let i=0;i<60;i++) box(g,.05,.04,.01,0xa87840,-1.82+zufall()*3.64,1.72+zufall()*2.36,.205);
      [[-1.28,3.45,0,-.1],[0,3.5,1,.07],[1.28,3.4,2,-.05],[-.68,2.3,3,.08],[.75,2.32,4,-.09]].forEach(([x,y,a,w],i)=>{ const z=gruppe(g,x,y,.22+i*.004); z.rotation.z=w; MUS.tafel(z,skizzenBild(a),.9,1.05,0,0,0); ball(z,.09,[0xd82828,0x2468d8,0x30a048,0xf8a010,0x9040b8][i],0,.44,.07); });
      box(g,3.2,.1,.22,HOLZ2,0,1.43,.18); [[-1,0xd82828],[-.6,0x2468d8],[.9,0x30a048]].forEach(([x,c])=>quer(walze(g,.045,.32,c,x,1.52,.2))); } },
  { x:7.25, y:-.17, z:HINTEN, wand:'hinten', steh:[7.25,-11.6], kasten:[2.2,.8], treffer:[2.15,2.85,.8], trefferY:1.02, baue(o){ /* 6 Arbeitsanleitung: großes Klemmbrett an der Wand */
      const g=gruppe(o,0,0,0); g.scale.setScalar(.85);
      box(g,2.4,3.0,.14,BUCHE2,0,2.75,.12); box(g,2.46,3.06,.08,HOLZ2,0,2.75,.08);
      MUS.tafel(g,anleitungBild(),2.04,2.55,0,2.65,.2);
      box(g,1.0,.3,.14,CHROM,0,4.12,.27); box(g,.8,.1,.18,GRAU3,0,4.02,.27); ring(g,.19,.05,GRAU3,0,4.3,.24,Math.PI);
      [-.82,.82].forEach(x=>ball(g,.06,MESSING,x,1.37,.21)); } },
  { x:-11.2, z:-12.9, wand:'hinten', steh:[-11.2,-10.9], kasten:[3.7,1.1], treffer:[3.7,3.9,1.1], baue(g){ /* 7 Fachbuch-Regal */
      box(g,3.5,3.7,.12,HOLZ3,0,1.85,-.4); [-1.72,1.72].forEach(x=>box(g,.16,3.75,.95,HOLZ,x,1.88,0)); [.12,1.3,2.48,3.7].forEach(y=>box(g,3.6,.14,.97,HOLZ,0,y,0)); box(g,3.75,.14,1.05,HOLZ2,0,3.82,0);
      const F=[0xc83a2a,0x2a6aa0,0xe8b830,0x3f8a4a,0x8a4a8a,0xd86a3a,0x2f8a8a];
      [.19,1.37,2.55].forEach((y,e)=>{ let x=-1.57, i=0; while(x<1.2){ const w=.24+((i*3+e)%4)*.045, hh=.76+((i*5+e*2)%4)*.08, c=F[(i+e*2)%F.length];
          box(g,w-.025,hh,.64,c,x+w/2,y+hh/2,.06); [.18,hh-.16].forEach(v=>box(g,w-.02,.055,.655,GOLD,x+w/2,y+v,.062)); box(g,w*.55,.16,.02,PAPIER,x+w/2,y+hh*.5,.39); x+=w; i++; }
        const s=box(g,.22,.8,.62,F[(e+4)%7],x+.28,y+.38,.06); s.rotation.z=.32; });
      /* ein großes Buch steht mit dem Deckel nach vorn */
      box(g,.7,.9,.12,0x2a4a7a,.9,1.82,.44); box(g,.5,.3,.02,PAPIER,.9,1.96,.51); box(g,.35,.06,.02,GOLD,.9,1.62,.51); } },
  { x:-11.8, z:5.4, steh:[-9.4,5.4], kasten:[3.2,2.2], treffer:[3.2,2.8,2.2], baue(g){ /* 8 Kiste mit Fundstücken im Stroh */
      box(g,2.9,.14,1.9,HOLZ2,0,.15,0); [-.9,.9].forEach(z=>[.4,.75,1.1].forEach(y=>box(g,2.9,.31,.12,y===.75?BUCHE2:BUCHE,0,y,z))); [-1.42,1.42].forEach(x=>{ [.4,.75,1.1].forEach(y=>box(g,.12,.31,1.76,y===.75?BUCHE2:BUCHE,x,y,0)); [-.9,.9].forEach(z=>box(g,.2,1.3,.2,HOLZ,x,.66,z)); });
      box(g,2.7,.1,1.7,0xe0bc50,0,1.0,0);
      for(let i=0;i<80;i++){ const x=-1.3+zufall()*2.6, z=-.78+zufall()*1.56, a=zufall()*6.3; strich(g,[x,1.05+zufall()*.12,z],[x+Math.cos(a)*.34,1.08+zufall()*.22,z+Math.sin(a)*.34],.022,i%3?0xf0d468:0xc89c38); }
      const v=gruppe(g,-.72,1.0,-.15); v.rotation.z=.22; vase(v,0,0,0,1.35,TON,false);
      /* Ammonit: versteinerte Schnecke aus Sandstein mit Spirale und Rippen */
      scheibe(g,.47,.2,0xd6b478,.5,1.52,.15); ball(g,.23,0xd6b478,.8,1.28,.15,1.15,.9,.55);
      const sp=i=>{ const a=-.7+i*.36, r=.45*Math.pow(.935,i); return [.5+Math.cos(a)*r,1.52+Math.sin(a)*r,.27]; };
      for(let i=0;i<36;i++) strich(g,sp(i),sp(i+1),.032,0x8a6a40);
      for(let i=0;i<22;i+=2){ const p=sp(i), q=sp(i+17.5); strich(g,p,[(p[0]+q[0])/2+(p[1]-1.52)*.12,(p[1]+q[1])/2-(p[0]-.5)*.12,.27],.018,0xa88450); }
      /* Knochen und Goldscheibe */
      const kn=gruppe(g,.45,1.35,.62); kn.rotation.z=-.15; quer(walze(kn,.09,.9,0xf6eedc,0,0,0)); [-.46,.46].forEach(x=>[-.09,.09].forEach(y=>ball(kn,.13,0xf6eedc,x,y,0)));
      scheibe(g,.24,.09,GOLD,1.05,1.4,-.3).rotation.z=.4; scheibe(g,.14,.11,MESSING2,1.05,1.4,-.29);
      /* Schild an der Vorderseite */
      box(g,.8,.42,.04,PAPIER,0,.72,.99); [-.07,.07].forEach(y=>box(g,.55,.05,.02,GRAU3,0,.72+y,1.02)); } },
  { x:7.4, z:5.4, steh:[7.4,7.6], kasten:[2.7,2.0], treffer:[2.7,4.0,2.0], baue(g){ /* 9 Mikroskop auf einem Tischchen */
      tisch(g,2.5,1.8,1.05,HELL);
      /* Fuß und gebogener Arm, von der Seite gesehen */
      box(g,1.55,.24,.95,NACHT,0,1.17,0); box(g,1.4,.1,.8,0x3a5a94,0,1.34,0);
      box(g,.36,.75,.45,NACHT,.52,1.72,0); const bogen=ring(g,.68,.17,NACHT,.5,2.6,0,Math.PI); bogen.rotation.z=-Math.PI/2; box(g,.7,.28,.36,NACHT,.2,3.26,0);
      /* Objekttisch mit Glasplättchen und Lämpchen */
      box(g,1.15,.12,.85,EISEN2,-.18,2.06,0); box(g,.55,.2,.34,NACHT,.42,2.0,0); box(g,.55,.035,.26,GLASBLAU,-.32,2.14,0); ball(g,.07,0xe0486a,-.32,2.16,0,1,.4,1);
      walze(g,.24,.18,CHROM,-.32,1.48,0); ball(g,.17,basis(0xfff0a0),-.32,1.58,0,1,.6,1);
      /* Tubus schräg mit Okular, Revolver mit drei Objektiven */
      strich(g,[-.32,2.85,0],[-.32,3.35,0],.23,CHROM); strich(g,[-.32,3.3,0],[-.75,3.85,0],.17,NACHT); strich(g,[-.73,3.82,0],[-.92,4.06,0],.22,SCHWARZ); strich(g,[-.9,4.04,0],[-.94,4.09,0],.17,GLASBLAU);
      ball(g,.27,NACHT,-.26,3.3,0); walze(g,.3,.12,GRAU3,-.32,2.79,0);
      strich(g,[-.32,2.74,0],[-.32,2.33,0],.1,CHROM); walze(g,.11,.09,0xe8b830,-.32,2.46,0);
      strich(g,[-.46,2.76,0],[-.7,2.46,0],.08,CHROM); strich(g,[-.2,2.76,-.12],[-.02,2.5,-.28],.08,CHROM);
      /* Drehknöpfe zum Scharfstellen */
      [-1,1].forEach(s=>{ scheibe(g,.28,.14,CHROM,.55,2.0,s*.32); scheibe(g,.13,.18,SCHWARZ,.55,2.0,s*.36); });
      /* Schachtel mit Glasplättchen */
      box(g,.5,.14,.36,0xc8503a,.82,1.12,.62); box(g,.34,.03,.22,WEISS,.82,1.2,.62); } },
  { x:-4.9, z:5.6, steh:[-4.9,7.7], kasten:[3.2,1.8], treffer:[3.2,3.1,1.8], baue(g){ /* 10 Rollwagen mit Fläschchen */
      [-1.4,1.4].forEach(x=>[-.7,.7].forEach(z=>{ walze(g,.07,1.85,PETROL,x,1.2,z); const r=gruppe(g,x,.22,z); quer(walze(r,.22,.14,SCHWARZ,0,0,0)); quer(walze(r,.09,.17,CHROM,0,0,0)); ball(g,.11,CHROM,x,2.15,z); }));
      [.62,1.55].forEach(y=>{ box(g,2.9,.1,1.5,CHROM,0,y,0); [-.74,.74].forEach(z=>box(g,2.9,.12,.07,PETROL,0,y+.09,z)); [-1.45,1.45].forEach(x=>box(g,.07,.12,1.5,PETROL,x,y+.09,0)); });
      [-.7,.7].forEach(z=>strich(g,[1.4,1.95,z],[1.75,2.2,z],.05,PETROL)); liegend(walze(g,.07,1.4,SCHWARZ,1.75,2.2,0));
      const flasche=(x,y,z,c,s,form)=>{ const f=gruppe(g,x,y,z); f.scale.setScalar(s);
        if(form===0){ walze(f,.23,.55,c,0,.28,0); ball(f,.23,c,0,.55,0,1,.55,1); walze(f,.09,.22,c,0,.72,0); walze(f,.12,.14,SCHWARZ,0,.88,0); }
        else if(form===1){ box(f,.4,.62,.36,c,0,.31,0); walze(f,.1,.16,c,0,.69,0); walze(f,.13,.14,WEISS,0,.82,0); }
        else { ball(f,.29,c,0,.29,0); walze(f,.08,.38,c,0,.66,0); ball(f,.11,0xc89860,0,.9,0,1,.9,1); }
        box(f,.24,.2,.03,WEISS,0,.28,form===0?.23:form===1?.19:.28); ball(f,.035,WEISS,-.11,.45,form===1?.19:.23,.8,2,.5); };
      [[-1.05,.3,0x2468d8,1.05,0],[-.48,-.3,0xe03828,1.15,2],[.05,.3,0x30a048,1.0,1],[.55,-.28,0xf8a820,1.1,0],[1.05,.28,0x9040b8,1.0,2]].forEach(([x,z,c,s,f])=>flasche(x,1.6,z,c,s,f));
      [[-.95,0xc87020,1],[-.32,0x20a0a8,0],[.34,0xe04888,2],[.98,0x70b830,1]].forEach(([x,c,f])=>flasche(x,.67,.2,c,.85,f)); } }
];

return { titel:'Die Restaurierungswerkstatt', breite:B, tiefe:T, oben:['74,84,94','150,160,168','214,220,224'], baue, gegenstaende, verstecke };
})();

/* Raum 5: Das Dach des Museums bei Sonnenaufgang. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Gießkanne) und 10 (Drachen) sind neu.
   Ausgang: die Glaskuppel; die Glasklappe und die Bodenluke klappen auf, die Figur steigt in den Schacht zur Feuerleiter. */
RAEUME3D.museum[4] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, GOLD, METALL, METALL2, WEISS, SCHWARZ, ROT, quaderBild, mauer, zahlenschloss, viele } = MUS;
const B=36, T=27;
const KX=0, KZ=-6.2, LOCH=.85;                    /* Glaskuppel, halbe Breite der Bodenöffnung */
const STRASSE=-10;                                 /* Höhe der Stadt unter dem Dach */
const ZIEGEL=0xb0604a, ZIEGEL2=0x8a4636, STEIN=0xd8ccb8, STEIN2=0xa89c8a, ZINK=0xb8c0c8, ZINK2=0x6a747e;
const Q=Math.PI/2;
const doppel=c=>mat(c,{side:THREE.DoubleSide});
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

/* ---------- Himmel, Sonne, Wolken ---------- */
function himmel(k){
  const sc=k.scene;
  /* große Himmelskugel: unten morgendlicher Dunst, darüber Orange, oben Blau */
  const t=bild(16,512,g=>{ const v=g.createLinearGradient(0,0,0,512);
    [[0,'#4f74bc'],[.28,'#86a6da'],[.4,'#d8c4d8'],[.47,'#ffc8a4'],[.52,'#ffb274'],[.56,'#ffd698'],[.62,'#f2b698'],[.72,'#c99a98'],[1,'#9a7c84']].forEach(([s,c])=>v.addColorStop(s,c));
    g.fillStyle=v; g.fillRect(0,0,16,512); });
  const kugel=new THREE.Mesh(new THREE.SphereGeometry(78,32,24),new THREE.MeshBasicMaterial({map:t,side:THREE.BackSide,depthWrite:false}));
  sc.add(kugel);
  /* die aufgehende Sonne hinter der Stadt, genau über der Glaskuppel */
  const sonne=new THREE.Mesh(new THREE.SphereGeometry(1.7,24,18),basis(0xfff2b0)); sonne.position.set(.3,-.9,-40); sc.add(sonne);
  const hof=schein(sc,'rgba(255,196,90,.85)',.3,-.9,-39,12);
  const kern=schein(sc,'rgba(255,240,180,.9)',.3,-.9,-37.8,6);
  k.anim.push(t2=>{ const v=12+Math.sin(t2*.8)*.7; hof.scale.set(v,v,1); kern.scale.set(6+Math.sin(t2*1.3)*.2,6+Math.sin(t2*1.3)*.2,1); });
  /* Wolken ziehen langsam von links nach rechts */
  const hell=basis(0xfff0e4), rosa=basis(0xf6bcae);
  /* nur weit hinter dem Dach (z unter -39) und hoch (y ab 9), damit keine Wolke je über das Dach oder vor die Kamera zieht */
  [[-34,10,-45,1.2,.5],[-12,13,-48,1.6,.35],[10,9.5,-44,1,.6],[28,12,-42,1.4,.45],[-24,17,-46,1.7,.4],[18,16,-49,1.8,.3],[40,10.5,-40,1.2,.5],[-2,19,-43,1.5,.25],[-42,13.5,-41,1.3,.4]].forEach(([x,y,z,s,v])=>{
    const g=gruppe(sc,x,y,z);
    [[0,0,0,1.5],[1.6,-.15,.2,1.1],[-1.7,-.2,0,1.05],[.7,.55,-.2,1],[-.6,.45,.1,.85],[3,-.35,0,.6],[-3.1,-.4,0,.55]].forEach(([a,b,c,r],i)=>{ const m=ball(g,r*s,i%3===2?rosa:hell,a*s,b*s,c*s,1.25,.52,.8); m.castShadow=false; m.receiveShadow=false; });
    ball(g,1.2*s,rosa,0,-.42*s,.25*s,2.3,.22,.7).castShadow=false;
    verschmelze(g); ohneSchatten(g);
    k.anim.push(t2=>{ g.position.x=((x+44+t2*v)%88)-44; }); });
}

/* ---------- Die Stadt, tiefer gelegen ---------- */
function stadt(k){
  const sc=k.scene;
  const boden=bild(1024,1024,g=>{ g.fillStyle='#8a7478'; g.fillRect(0,0,1024,1024);
    for(let i=0;i<500;i++){ g.fillStyle=['#7a8a6a','#9a8080','#6e6470','#a8908a'][i%4]; g.fillRect(zufall()*1000,zufall()*1000,14+zufall()*40,14+zufall()*40); }
    g.strokeStyle='#b8a4a0'; g.lineWidth=14; for(let i=40;i<1024;i+=118){ g.beginPath(); g.moveTo(i,0); g.lineTo(i+30,1024); g.stroke(); g.beginPath(); g.moveTo(0,i); g.lineTo(1024,i-24); g.stroke(); }
    g.globalCompositeOperation='destination-in'; const v=g.createRadialGradient(512,512,300,512,512,512); v.addColorStop(0,'rgba(0,0,0,1)'); v.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=v; g.fillRect(0,0,1024,1024); });
  const b=new THREE.Mesh(new THREE.CircleGeometry(70,48),basis(0xffffff,{map:boden,transparent:true,depthWrite:false})); b.rotation.x=-Math.PI/2; b.position.y=STRASSE; sc.add(b);
  /* Häuser als Instanzen: Wände, Dächer, Fenster, Schornsteine auf den Nachbardächern */
  const haus=[], spitz=[], fenster=[], kamin=[];
  const W=[0xd8a888,0xc08878,0xe0c8a0,0xa8909c,0xcc9a70,0xb8a8a8,0x9a8494], D=[0x9a4a3a,0x6a5060,0xb0603a,0x5a5a74];
  let n=0;
  const baueHaus=(x,z,br,ti,top,i)=>{
    const h=top-STRASSE; haus.push([x,STRASSE+h/2,z,br,h,ti,W[i%W.length],0]);
    if(i%3){ spitz.push([x,top+.5,z,br*.74,1,ti*.74,D[i%D.length],0]); } else haus.push([x,top+.12,z,br+.3,.24,ti+.3,D[(i+1)%D.length],0]);
    if(i%2===0) kamin.push([x+br*.24,top+.65,z+ti*.18,.45,1.1,.45,0x8a4a3c,0],[x+br*.24,top+1.25,z+ti*.18,.58,.14,.58,0x5a4a50,0]);
    /* Fenster auf der Vorderseite und auf der dem Museum zugewandten Seite */
    for(let r=0;r<3;r++){ const y=top-.8-r*1.25; const m=Math.max(1,Math.floor(br/1.15));
      for(let s=0;s<m;s++) fenster.push([x-br/2+(s+.5)*br/m,y,z+ti/2+.03,.4,.55,.04,(s+r+i)%4?0x5a5470:0xffd878,0]);
      if(Math.abs(x)>16){ const v=x>0?-1:1, q=Math.max(1,Math.floor(ti/1.2)); for(let s=0;s<q;s++) fenster.push([x+v*(br/2+.03),y,z-ti/2+(s+.5)*ti/q,.04,.55,.4,(s+r+i)%5?0x5a5470:0xffd878,0]); } }
  };
  /* drei Reihen hinten; in der Mitte bleibt die Sicht zur Sonne frei */
  [[-19,-3.6,3.2],[-25.5,-3.2,4],[-33,-3.4,4]].forEach(([z,top,br],r)=>{
    for(let x=-44+r*1.7;x<=44;x+=br+1.1){ n++; const mitte=Math.abs(x)<7; baueHaus(x+(zufall()-.5),z+(zufall()-.5)*2,br+zufall(),2.6+zufall()*1.6,(mitte?top-2.2:top)+zufall()*(mitte?1.4:2.4),n); } });
  /* Häuser seitlich und weit vorn */
  [-1,1].forEach(v=>{ [23,29.5,37,45].forEach((x,r)=>{ for(let z=-13+r*1.3;z<=34;z+=5.4){ n++; baueHaus(v*(x+(zufall()-.5)*1.6),z+(zufall()-.5),3+zufall()*1.4,3+zufall()*1.4,-5.4+zufall()*(r?3.4:2),n); } }); });
  for(let x=-18;x<=18;x+=5.2){ n++; baueHaus(x,31+zufall()*3,3.4,3,-6+zufall()*2,n); n++; baueHaus(x+2,40+zufall()*3,3.6,3,-6+zufall()*2,n); }
  /* zwei hohe Türme in der Ferne (Rathaus und Wasserturm) */
  haus.push([-24,-5,-30,2.2,10,2.2,0xc89880,0],[-24,.2,-30,2.7,.35,2.7,0x6a5060,0]); spitz.push([-24,1.8,-30,1.9,2.9,1.9,0x4a7a74,0]);
  haus.push([27,-5.5,-27,1.4,9,1.4,0xa89098,0],[27,-.2,-27,3.4,1.9,3.4,0xd0a890,0]); spitz.push([27,1.4,-27,2.6,1.3,2.6,0x7a4a4a,0]);
  viele(sc,GEO.box,haus); viele(sc,new THREE.ConeGeometry(1,1,4,1,false,Math.PI/4),spitz); viele(sc,GEO.box,kamin);
  const fm=viele(sc,GEO.box,fenster); fm.material.emissive=new THREE.Color(0x2a1c18);
  /* Baumkronen zwischen den Häusern */
  const laub=[]; for(let i=0;i<110;i++){ const hinten=i<50, x=hinten?-40+zufall()*80:(i%2?1:-1)*(20+zufall()*22), z=hinten?-16-zufall()*24:-12+zufall()*44, s=.7+zufall()*.9; laub.push([x,STRASSE+1+s*.5,z,s,s*1.1,s,[0x6a8a52,0x87a05a,0x557a56][i%3],0]); }
  viele(sc,new THREE.IcosahedronGeometry(1,1),laub);
}

/* ---------- Dachfläche, Hauswände, Brüstung ---------- */
function dach(k){
  const sc=k.scene;
  const t=bild(512,512,g=>{ g.fillStyle='#a2968e'; g.fillRect(0,0,512,512);
    for(let r=0;r<4;r++) for(let s=0;s<4;s++){ const v=Math.floor(zufall()*14)-7; g.fillStyle='rgb('+(166+v)+','+(152+v)+','+(142+v)+')'; g.fillRect(s*128+2,r*128+2,124,124); }
    for(let i=0;i<5000;i++){ g.fillStyle=['rgba(70,55,50,.3)','rgba(235,222,205,.35)','rgba(140,100,80,.25)'][i%3]; g.fillRect(zufall()*509,zufall()*509,2+i%2,2); } });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(1/10,1/10);
  /* Dachfläche mit rechteckiger Öffnung unter der Kuppel (Form in x und -z) */
  const form=new THREE.Shape(); form.moveTo(-18.3,13.8); form.lineTo(18.3,13.8); form.lineTo(18.3,-24); form.lineTo(-18.3,-24); form.lineTo(-18.3,13.8);
  const loch=new THREE.Path(); loch.moveTo(KX-LOCH,-KZ-LOCH); loch.lineTo(KX-LOCH,-KZ+LOCH); loch.lineTo(KX+LOCH,-KZ+LOCH); loch.lineTo(KX+LOCH,-KZ-LOCH); loch.lineTo(KX-LOCH,-KZ-LOCH); form.holes.push(loch);
  const f=new THREE.Mesh(new THREE.ShapeGeometry(form),new THREE.MeshLambertMaterial({map:t})); f.rotation.x=-Math.PI/2; f.receiveShadow=true; sc.add(f);
  /* Außenwände des Museums bis zur Straße (ohne Deckel) */
  const wt=bild(512,256,g=>{ g.fillStyle='#d4b496'; g.fillRect(0,0,512,256); g.fillStyle='#b89478'; g.fillRect(0,0,512,18); g.fillRect(0,120,512,10);
    for(let r=0;r<2;r++) for(let i=0;i<8;i++){ const x=i*64+14, y=36+r*112; g.fillStyle='#f0e0c8'; g.fillRect(x-5,y-5,46,76); g.fillStyle=(i+r)%3?'#4a4a68':'#ffd070'; g.fillRect(x,y,36,66); g.fillStyle='#f0e0c8'; g.fillRect(x+16,y,4,66); g.fillRect(x,y+30,36,4); } });
  const wm=new THREE.MeshLambertMaterial({map:wt,side:THREE.DoubleSide});
  const wandfl=(br,x,z,dreh)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(br,10),wm); m.position.set(x,-5.02,z); m.rotation.y=dreh; sc.add(m); };
  wandfl(36.6,0,-13.82,Math.PI); wandfl(36.6,0,23.98,0); wandfl(37.8,-18.32,5.1,-Q); wandfl(37.8,18.32,5.1,Q);
  /* Brüstung: Ziegelmauer mit Steinabdeckung und Pfeilern */
  const zt=quaderBild([176,104,82],'#d8c4a8',12), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts');
  const h=gruppe(hinten,0,0,0);
  mauer(hinten,zt,36.6,.9,.5,0,.45,-13.55); box(h,36.8,.18,.7,STEIN,0,.99,-13.55);
  [-17.9,-13.9,-5.9,-2,2,5.9,13.9,17.9].forEach(x=>{ box(h,.7,1.35,.7,STEIN2,x,.675,-13.55); box(h,.86,.16,.86,STEIN,x,1.42,-13.55); ball(h,.2,STEIN2,x,1.66,-13.55); });
  verschmelze(h);
  [[links,-1],[rechts,1]].forEach(([w,v])=>{ const g=gruppe(w,0,0,0);
    mauer(w,zt,.5,.9,37.6,v*18.05,.45,5.1); box(g,.7,.18,37.8,STEIN,v*18.05,.99,5.1);
    [-9,-3.5,9,13.4,18.5,23.6].forEach(z=>{ box(g,.7,1.35,.7,STEIN2,v*18.05,.675,z); box(g,.86,.16,.86,STEIN,v*18.05,1.42,z); ball(g,.2,STEIN2,v*18.05,1.66,z); });
    verschmelze(g); });
  const vorn=gruppe(sc,0,0,0); box(vorn,36.6,.9,.5,ZIEGEL,0,.45,23.75); box(vorn,36.8,.18,.7,STEIN,0,.99,23.75); verschmelze(vorn);
  /* kleine Laternen auf den Pfeilern */
  const laterne=(par,x,z)=>{ const g=gruppe(par,x,1.8,z); walze(g,.06,.35,SCHWARZ,0,.1,0); box(g,.32,.36,.32,basis(0xffe4a0),0,.44,0); kegel(g,.3,.22,SCHWARZ,0,.73,0); verschmelze(g); schein(g,'rgba(255,200,100,.55)',0,.44,0,1.3); };
  laterne(hinten,-5.9,-13.55); laterne(hinten,5.9,-13.55); laterne(links,-18.05,-9); laterne(links,-18.05,9); laterne(rechts,18.05,-9); laterne(rechts,18.05,9);
  turmbau(k,hinten); tafelmauer(k,rechts);
}
/* Turmaufbau in der hinteren Brüstung: trägt die Turmuhr */
function turmbau(k,hinten){
  const x=-10, zt=quaderBild([196,150,118],'#e4d2b8',10);
  mauer(hinten,zt,3.8,4.8,1.2,x,2.4,-13.3);
  const g=gruppe(hinten,x,0,-13.3);
  box(g,4.1,.28,1.5,STEIN2,0,.14,0); box(g,4.15,.2,1.5,STEIN,0,1.35,0); box(g,4.3,.26,1.65,STEIN,0,4.9,0);
  [-1.78,1.78].forEach(a=>{ box(g,.3,4.8,.18,STEIN,a,2.4,.62); });
  teil(g,new THREE.ConeGeometry(1,1,4,1,false,Math.PI/4),0x3f7a74,0,5.88,0,2.9,1.7,1.5);
  ball(g,.22,GOLD,0,6.85,0);
  verschmelze(g); k.kasten(x,-13.1,4.1,1);
}
/* Mauerzunge, die von der rechten Brüstung ins Dach ragt: trägt auf ihrer Vorderseite die Bronzetafel */
function tafelmauer(k,rechts){
  const zt=quaderBild([150,140,130],'#d8ccb8',9);
  mauer(rechts,zt,3.6,2.9,.7,16.4,1.45,3);
  const g=gruppe(rechts,16.4,0,3);
  box(g,3.9,.24,.95,STEIN,0,3,0); box(g,3.75,.2,.85,STEIN2,0,.1,0); [-1.6,1.6].forEach(x=>ball(g,.22,STEIN2,x,3.3,0));
  verschmelze(g); k.kasten(16.4,3,3.8,.85);
}

/* ---------- Ausgang: die Glaskuppel mit Klappe, darunter der Schacht zur Feuerleiter ---------- */
function kuppel(k){
  const sc=k.scene, g=gruppe(sc,KX,0,KZ), r=gruppe(g,0,0,0), R=2.2, H=1.7, LUECKE=.52;
  const glas=new THREE.MeshLambertMaterial({color:0xbfe8f4,emissive:0x1c3a48,transparent:true,opacity:.24,side:THREE.DoubleSide,depthWrite:false});
  const rahmen=0x2f6a66, rahmen2=0x24504e;
  /* Glaswand ringsum (vorn offen), darüber die Glashaube */
  const wand=new THREE.Mesh(new THREE.CylinderGeometry(R,R,H-.35,24,1,true,LUECKE,Math.PI*2-2*LUECKE),glas); wand.position.y=.35+(H-.35)/2; g.add(wand);
  const haube=new THREE.Mesh(new THREE.SphereGeometry(R,28,10,0,Math.PI*2,0,Math.PI/2),glas); haube.position.y=H; haube.scale.y=.9; g.add(haube);
  /* Sockelmauer und Ringe */
  const bogen=Math.PI*2-2*LUECKE, N=20;
  for(let i=0;i<N;i++){ const a=LUECKE+(i+.5)*bogen/N, br=bogen/N*R+.03;
    [[.18,.36,.34,STEIN],[.4,.1,.42,STEIN2],[H,.14,.16,rahmen]].forEach(([y,h,t,c])=>{ box(r,br,h,t,c,Math.sin(a)*R,y,Math.cos(a)*R).rotation.y=a; }); }
  for(let i=0;i<=8;i++){ const a=LUECKE+i*bogen/8; walze(r,.065,H-.3,rahmen,Math.sin(a)*R,.35+(H-.35)/2,Math.cos(a)*R); }
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; for(let j=i?0:3;j<7;j++){ const u=j*Q/7, v=(j+1)*Q/7; strich(r,[Math.sin(a)*Math.cos(u)*R,H+Math.sin(u)*R*.9,Math.cos(a)*Math.cos(u)*R],[Math.sin(a)*Math.cos(v)*R,H+Math.sin(v)*R*.9,Math.cos(a)*Math.cos(v)*R],.045,rahmen); } }
  const mittel=ring(r,R*Math.cos(.78),.045,rahmen,0,H+Math.sin(.78)*R*.9,0); mittel.rotation.x=Q;
  walze(r,.32,.22,MESSING2,0,H+R*.9+.05,0); ball(r,.24,GOLD,0,H+R*.9+.32,0);
  /* Eingangsrahmen vorn mit Dächlein und Schild für das Zahlenschloss */
  [-1,1].forEach(s=>{ box(r,.24,2.5,.34,rahmen2,s*1.14,1.25,2.12); box(r,.36,.14,.48,STEIN2,s*1.14,.07,2.12); box(r,.14,.14,.8,rahmen,s*1.14,2.4,1.72); });
  box(r,2.66,.22,.44,rahmen2,0,2.55,2.14); box(r,1.7,.86,.2,rahmen,0,3.08,2.18); box(r,1.9,.12,.4,MESSING,0,3.56,2.18);
  /* Rand der Bodenöffnung */
  [-1,1].forEach(s=>{ box(r,.14,.09,LOCH*2+.28,ZINK2,s*(LOCH+.07),.045,0); box(r,LOCH*2,.09,.14,ZINK2,0,.045,s*(LOCH+.07)); });
  verschmelze(r);
  /* Schacht unter der Öffnung: vier Wände, Boden, unten warmes Licht */
  const st=bild(256,512,c=>{ const v=c.createLinearGradient(0,0,0,512); v.addColorStop(0,'#8a6a58'); v.addColorStop(.55,'#5a3c32'); v.addColorStop(1,'#c8883c'); c.fillStyle=v; c.fillRect(0,0,256,512);
    c.strokeStyle='rgba(40,20,14,.45)'; c.lineWidth=4; for(let y=0,i=0;y<512;y+=40,i++){ c.beginPath(); c.moveTo(0,y); c.lineTo(256,y); c.stroke(); for(let x=(i%2)*42;x<256;x+=85){ c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+40); c.stroke(); } } });
  const sm=basis(0xffffff,{map:st,side:THREE.DoubleSide});
  [[0,-LOCH,0],[0,LOCH,Math.PI],[-LOCH,0,Q],[LOCH,0,-Q]].forEach(([x,z,a])=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(LOCH*2,4.4),sm); m.position.set(x,-2.2,z); m.rotation.y=a; g.add(m); });
  const grund=new THREE.Mesh(new THREE.PlaneGeometry(LOCH*2,LOCH*2),basis(0xe8a850)); grund.rotation.x=-Q; grund.position.y=-4.4; g.add(grund);
  /* rote Feuerleiter an der hinteren Schachtwand */
  const unten=gruppe(g,0,0,0); [-.4,.4].forEach(x=>walze(unten,.055,4.3,0xe0443a,x,-2.2,-LOCH+.1)); for(let y=-4;y<-.1;y+=.36) walze(unten,.04,.8,0xff7a5a,0,y,-LOCH+.1).rotation.z=Q; verschmelze(unten); ohneSchatten(unten);
  /* Handläufe fahren beim Öffnen nach oben */
  const griffe=gruppe(g,0,-1.3,0); [-.4,.4].forEach(x=>{ walze(griffe,.055,1.2,0xe0443a,x,.55,-LOCH+.06); ball(griffe,.09,GOLD,x,1.18,-LOCH+.06); }); verschmelze(griffe); griffe.visible=false;
  /* Bodenluke (rechts angeschlagen) */
  const lid=gruppe(g,LOCH,.1,0), l2=gruppe(lid,0,0,0);
  box(l2,LOCH*2,.08,LOCH*2,ZINK,-LOCH,0,0); [-.55,0,.55].forEach(z=>box(l2,LOCH*2-.25,.025,.12,ZINK2,-LOCH,.05,z)); ring(l2,.17,.035,GOLD,-LOCH*1.65,.08,0).rotation.x=Q;
  verschmelze(l2);
  /* Glasklappe im Eingang (links angeschlagen) */
  const angel=gruppe(g,-1.02,0,2.28), tf=gruppe(angel,0,0,0);
  [.1,1.2,2.34].forEach(y=>box(tf,2.04,.14,.12,rahmen,1.02,y,0)); [.07,1.02,1.97].forEach(x=>box(tf,.12,2.36,.12,rahmen,x,1.22,0));
  box(tf,2.04,.62,.07,rahmen2,1.02,.42,0); [-1,1].forEach(s=>walze(tf,.05,.5,GOLD,1.02+s*.22,1.22,.12));
  verschmelze(tf);
  const scheibe=new THREE.Mesh(new THREE.PlaneGeometry(1.9,1.65),glas); scheibe.position.set(1.02,1.52,0); angel.add(scheibe);
  /* Zahlenschloss über der Klappe, mit zwei Lämpchen */
  const schloss=zahlenschloss(g,0,3.0,2.38); schloss.scale.set(1.15,1,1); verschmelze(schloss);
  const lm=basis(0xff4a3a); [-1,1].forEach(s=>{ ball(g,.11,lm,s*.69,3.12,2.34); });
  const licht=new THREE.PointLight(0xffc870,.35,8,1.5); licht.position.set(KX,1.5,KZ); sc.add(licht);
  const glut=schein(g,'rgba(255,205,110,.85)',0,.25,0,2.4); glut.material.opacity=0; glut.visible=false;
  let tuer=null;
  tuer=ausgang(k,{ steh:[KX,KZ+3.8], durch:[KX,KZ], tief:true, treffer:{x:KX,y:2.2,z:KZ+1.9,b:3.8,h:4.4,t:1.4}, name:'Glaskuppel', einfach:'Dach aus Glas', schildOben:[KX,5.1,KZ+1.6], glanz:[KX,3.0,KZ+2.8],
    bewege:(auf,t)=>{ angel.rotation.y=-auf*1.95; lid.rotation.z=-auf*1.75; griffe.visible=auf>.5; griffe.position.y=-1.3*(1-Math.max(0,auf-.5)*2); licht.intensity=.35+auf*.6+Math.sin((t||0)*3)*.03; glut.visible=auf>.02; glut.material.opacity=auf*.2;
      lm.color.setHex(tuer && (tuer.offen||tuer.bereit)?0x60f070:0xff4a3a); } });
  k.kreis(KX,KZ,2.35); k.kasten(KX,KZ+2.15,2.65,.5);
  return tuer;
}

/* ---------- Dachausstattung: flach oder am Rand ---------- */
function ausstattung(k){
  const sc=k.scene;
  /* Holzstege (flach) */
  const steg=gruppe(sc,0,0,0);
  const weg=(x1,z1,x2,z2)=>{ const dx=x2-x1, dz=z2-z1, l=Math.hypot(dx,dz), n=Math.floor(l/.5), a=Math.atan2(dx,dz);
    for(let i=0;i<=n;i++) box(steg,1.6,.025,.38,i%3?0xa87448:0x946238,x1+dx*i/n,.016,z1+dz*i/n).rotation.y=a; };
  weg(0,-2.2,0,12.4); weg(-1.1,4.8,-9,6.2); weg(1.1,4.8,9,3.2);
  ohneSchatten(steg); verschmelze(steg);
  /* flache Lüftungsgitter und Abflussrinne im vorderen Dachteil */
  const flach=gruppe(sc,0,0,0);
  [[-4.6,10.2],[5.2,9.6],[13.6,11.2]].forEach(([x,z])=>{ box(flach,1.7,.03,1.2,ZINK2,x,.018,z); for(let i=0;i<5;i++) box(flach,1.45,.02,.09,0x3a424c,x,.04,z-.42+i*.21); });
  box(flach,35,.02,.28,0x6a6466,0,.012,12.75); for(let x=-17;x<=17;x+=.75) box(flach,.09,.022,.28,0x3a3438,x,.022,12.75);
  ohneSchatten(flach); verschmelze(flach);
  /* Kies in Streifen am Rand und Moosbüschel */
  const kies=[], moos=[];
  for(let i=0;i<520;i++){ const s=.05+zufall()*.08, seite=i%4; let x,z;
    if(seite===0){ x=-17.7+zufall()*1.1; z=-13+zufall()*34; } else if(seite===1){ x=17.7-zufall()*1.1; z=-13+zufall()*34; } else if(seite===2){ x=-17.5+zufall()*35; z=-13.2+zufall()*.8; } else { x=-17.5+zufall()*35; z=13+zufall()*1.6; }
    kies.push([x,s*.3,z,s*1.2,s*.6,s,[0xd0c4b4,0x8a7e78,0xb89c88][i%3],i]); }
  [[-17.2,-12.6],[-6.8,-12.9],[17.1,-12.5],[-17.3,.6],[17.3,9],[-17.1,12.4],[7.2,12.9],[-8,12.8],[2.8,-12.9],[16.9,12.6]].forEach(([x,z])=>{ for(let i=0;i<7;i++) moos.push([x+(zufall()-.5)*.8,.05,z+(zufall()-.5)*.4,.18,.1,.15,[0x6a8a3a,0x87a44a][i%2],i]); });
  viele(sc,new THREE.IcosahedronGeometry(1,0),kies); viele(sc,GEO.sph,moos);
  /* Solarmodule hinten rechts */
  const solar=gruppe(sc,0,0,0);
  [13,15.7].forEach(x=>{ const p=gruppe(solar,x,.7,-11.7); p.rotation.x=.5; box(p,2.4,.1,1.5,ZINK,0,0,0); for(let i=0;i<4;i++) for(let j=0;j<3;j++) box(p,.52,.04,.42,(i+j)%2?0x24487a:0x2c548c,-.84+i*.56,.06,-.46+j*.46);
    [-1,1].forEach(s=>{ box(solar,.1,1.05,.1,ZINK2,x+s,.52,-12.2); box(solar,.1,.35,.1,ZINK2,x+s,.17,-11.15); }); });
  verschmelze(solar); k.kasten(14.35,-11.75,5.3,1.7);
  /* niedrige Lüftungskästen mit drehendem Windrad im Gitter */
  [[-15.9,-.8],[15.8,-6.4],[16,10.6]].forEach(([x,z],i)=>{ const g=gruppe(sc,x,0,z), r=gruppe(g,0,0,0);
    box(r,1.8,.7,1.6,ZINK,0,.4,0); box(r,2,.12,1.8,ZINK2,0,.06,0); box(r,1.9,.08,1.7,ZINK2,0,.78,0); walze(r,.62,.04,0x343c46,0,.84,0); [-.3,0,.3].forEach(y=>box(r,1.55,.07,.03,ZINK2,0,.42+y*.6,.81));
    verschmelze(r);
    const rad=gruppe(g,0,.89,0); [0,1,2].forEach(j=>box(rad,1.08,.035,.15,0xe4e8ee,0,0,0).rotation.y=j*Math.PI/3); walze(rad,.13,.07,ROT,0,.02,0); verschmelze(rad);
    ring(g,.64,.045,ZINK,0,.93,0).rotation.x=Q;
    k.anim.push(t=>{ rad.rotation.y=t*(1.4+i*.3); }); k.kasten(x,z,2,1.8); });
  /* Rohrleitungen am linken Rand */
  const rohre=gruppe(sc,0,0,0);
  [[-17.15,0x9aa4ac],[-16.75,0xc87a4a]].forEach(([x,c])=>{ walze(rohre,.13,5.6,c,x,.3,5).rotation.x=Q; [2.4,4.1,5.9,7.6].forEach(z=>box(rohre,.34,.3,.14,ZINK2,x,.15,z)); [2.2,7.8].forEach(z=>{ ball(rohre,.17,c,x,.3,z); walze(rohre,.13,.3,c,x,.15,z); }); });
  verschmelze(rohre); k.kasten(-16.95,5,.75,5.9);
  /* Liegestühle in der vorderen linken Ecke */
  [[-14.8,11.2,.35,0x2f8a9a],[-12.1,11.6,-.15,0xe0803a]].forEach(([x,z,a,c])=>{ const g=gruppe(sc,x,0,z); g.rotation.y=a;
    [-.55,.55].forEach(s=>{ strich(g,[s,0,.7],[s,.75,-.75],.06,HOLZ); strich(g,[s,0,-.6],[s,.5,.35],.06,HOLZ2); });
    for(let i=0;i<5;i++){ const m=box(g,.19,.045,1.5,i%2?WEISS:c,-.4+i*.2,.45,-.05); m.rotation.x=.47; }
    verschmelze(g); k.kreis(x,z,.85); });
}

/* ---------- Tauben ---------- */
const GRAU=0x9ea6b8, GRAU2=0x6a7288, HALS=0x4a8a7a, FUSS=0xe0606a;
function taubenKopf(h,c){
  ball(h,.1,HALS,.03,.04,0,.95,1.25,.95); ball(h,.12,c,.09,.16,0); const s=kegel(h,.04,.13,0xf0a040,.23,.14,0); s.rotation.z=-Q; ball(h,.03,WEISS,.19,.18,0,.9,.7,1);
  [-1,1].forEach(v=>{ ball(h,.034,0xf8a020,.14,.19,v*.095); ball(h,.018,SCHWARZ,.158,.19,v*.118); });
}
function taubenRumpf(r,c){
  ball(r,.23,c,0,.31,0,1.35,.95,.95); ball(r,.17,0xc8ccd8,.12,.28,0,1,.95,1);
  [-1,1].forEach(s=>{ ball(r,.17,GRAU2,-.07,.35,s*.17,1.45,.7,.38); box(r,.2,.025,.03,0x38404e,-.2,.35,s*.235); });
  box(r,.3,.05,.2,GRAU2,-.39,.34,0).rotation.z=.2; box(r,.06,.055,.21,0x38404e,-.52,.36,0).rotation.z=.2;
}
/* pickende Taube auf einem Rundweg: bleibt immer wieder stehen und pickt */
function pickTaube(k,weg,tempo,start,c){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), wipp=gruppe(g,0,0,0), r=gruppe(wipp,0,0,0), kopf=gruppe(wipp,.22,.38,0);
  taubenRumpf(r,c); taubenKopf(kopf,c); verschmelze(r); verschmelze(kopf);
  const beine=gruppe(g,0,0,0); [-1,1].forEach(s=>{ walze(beine,.022,.16,FUSS,0,.08,s*.09); box(beine,.14,.025,.05,FUSS,.04,.014,s*.09); }); verschmelze(beine);
  const P=weg.map(p=>V(p[0],0,p[1])), L=P.map((p,i)=>p.distanceTo(P[(i+1)%P.length])), ges=L.reduce((a,b)=>a+b,0)||1;
  k.anim.push(t=>{ const u=t+start, takt=1.3; let s=((u+Math.sin(u*takt)/takt)*tempo+start)%ges, i=0; while(i<L.length-1 && s>L[i]){ s-=L[i]; i++; }
    const a=P[i], b=P[(i+1)%P.length]; g.position.lerpVectors(a,b,L[i]?s/L[i]:0); g.rotation.y=Math.atan2(-(b.z-a.z),b.x-a.x);
    const pick=Math.max(0,(-Math.cos(u*takt)-.45)/.55), nick=pick*Math.abs(Math.sin(u*9));
    wipp.rotation.z=-nick*.38; kopf.rotation.z=-nick*1.35; kopf.position.x=.22+(pick?0:Math.sin(u*11)*.035); });
  const sch=new THREE.Mesh(new THREE.CircleGeometry(.3,14),basis(0x000000,{transparent:true,opacity:.2,depthWrite:false})); sch.rotation.x=-Q; sch.position.y=.04; g.add(sch);
}
/* fliegende Taube auf einer Kreisbahn */
function flugTaube(k,mx,my,mz,rx,rz,tempo,start){
  const g=gruppe(k.scene,mx,my,mz), r=gruppe(g,0,-.3,0); taubenRumpf(r,GRAU); const kopf=gruppe(r,.24,.36,0); taubenKopf(kopf,GRAU); verschmelze(r);
  const fl=[-1,1].map(s=>{ const f=gruppe(g,0,.07,s*.14); ball(f,.25,GRAU,0,0,s*.24,.75,.12,1.1); ball(f,.18,GRAU2,-.04,0,s*.55,.65,.1,1.15); ball(f,.1,0x38404e,-.08,0,s*.74,.8,.14,1); verschmelze(f); return f; });
  k.anim.push(t=>{ const a=t*tempo+start, v=Math.sign(tempo); g.position.set(mx+Math.cos(a)*rx,my+Math.sin(a*2.3)*.45,mz+Math.sin(a)*rz);
    g.rotation.y=Math.atan2(-Math.cos(a)*rz*v,-Math.sin(a)*rx*v); const f=Math.sin(t*11+start)*.75; fl[0].rotation.x=-f; fl[1].rotation.x=f; });
}
function tauben(k){
  pickTaube(k,[[-3.6,.3],[-1.8,-.7],[-1.4,1.2],[-3.2,1.9]],.5,0,GRAU);
  pickTaube(k,[[-2.6,2.5],[-4.4,1.5],[-5,3.4],[-3.4,4]],.42,2.1,0xc8c0c8);
  pickTaube(k,[[2.1,.2],[3.9,.5],[3.6,2.4],[1.9,1.9]],.46,4.4,GRAU);
  pickTaube(k,[[1.6,6.8],[3.4,7.8],[2,8.9],[.6,7.9]],.38,1.2,0xe4e0e4);
  pickTaube(k,[[12.2,-8.6],[14.2,-8.8],[13.6,-7.2]],.4,3.3,GRAU);
  flugTaube(k,-2,4.6,-10,6.5,3,.55,0); flugTaube(k,-1,5.2,-10.5,6,2.6,.55,.7);
  flugTaube(k,13,3.4,-19,7,3.5,-.45,2); flugTaube(k,-23,2.6,-6,3.5,8,.4,4);
}

function baue(k){
  const sc=k.scene;
  sc.background=new THREE.Color(0xffc090);
  sc.add(new THREE.HemisphereLight(0xffe4d4,0x6a5468,.74));
  const licht=new THREE.DirectionalLight(0xffd6a0,.55); licht.position.set(-13,20,9); licht.castShadow=true; licht.shadow.mapSize.set(2048,2048);
  const c=licht.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; licht.shadow.bias=-.001; sc.add(licht);
  himmel(k); stadt(k); dach(k);
  const tuer=kuppel(k);
  ausstattung(k); tauben(k);
  flacker(k,-10,2.2,-10.8,0xffb860,.45,8); flacker(k,15.5,2.4,3,0xffb860,.4,7);
  return { tuer, start:[0,3.4] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-16,-11.4],[-13,-9],[-7,-11.8],[-3.6,-10.6],[3.8,-11.4],[6.6,-7.2],[16,-9],[13.8,-1],[7.6,.4],[15.4,8],[10,10.6],[7,6.4],[-1.8,10.8],[-7,11],[-14,7],[-15.6,2],[-13,-1.6],[-8.4,.8],[-7.8,-6],[2.8,-9.2]];

/* ---------- Gegenstände: Reihenfolge = ort 1 bis 10 ---------- */
const gegenstaende=[
  { x:-5.2, z:-2.6, steh:[-5.2,-.6], kasten:[2.1,1.7], treffer:[2.1,3.9,1.7], baue(g,k){ /* 1 Schornstein: Ziegel mit zwei Tonrohren und Rauch */
      const zt=quaderBild([186,92,68],'#e0ccb0',14);
      mauer(g,zt,1.6,2.35,1.15,0,1.4,0);
      box(g,1.95,.26,1.5,ZINK2,0,.13,0); box(g,1.9,.2,1.45,STEIN2,0,2.65,0); box(g,1.7,.14,1.25,STEIN,0,2.82,0);
      [-.42,.42].forEach(x=>{ rohr(g,.23,.28,.62,0xd0754a,x,3.18,0,16); ring(g,.24,.06,0xa8542f,x,3.49,0).rotation.x=Q; walze(g,.17,.03,SCHWARZ,x,3.5,0); });
      const rauch=[0,1,2,3,4,5].map(i=>{ const p=ball(g,.2,new THREE.MeshLambertMaterial({color:0xf4eef0,emissive:0x4a4248,transparent:true,opacity:.6,depthWrite:false}),0,3.7,0); p.castShadow=false; return p; });
      k.anim.push(t=>{ rauch.forEach((p,i)=>{ const u=(t*.28+i/6)%1, x=i%2?.42:-.42; p.position.set(x+u*.9+Math.sin(u*6+i)*.15,3.65+u*1.9,0); const s=.14+u*.3; p.scale.set(s,s,s); p.material.opacity=.6*(1-u); }); });
      verschmelze(g); k.verdecker(g,-5.2,-2.6,1); } },
  { x:5.1, z:-3.2, steh:[5.1,-1.4], r:.8, treffer:[2,4.5,1.2], baue(g,k){ /* 2 Wetterfahne: Mast, Himmelsrichtungen, goldener Hahn auf dem Pfeil */
      box(g,1.1,.3,1.1,STEIN2,0,.15,0); box(g,.8,.24,.8,STEIN,0,.42,0);
      walze(g,.085,3.2,0x38404e,0,2.1,0); [-1,1].forEach(s=>{ strich(g,[s*.38,.5,0],[0,1.35,0],.04,0x38404e); strich(g,[0,.5,s*.38],[0,1.35,0],.04,0x38404e); });
      /* Richtungskreuz leicht gedreht, damit der Mast das O nicht verdeckt */
      const kr=gruppe(g,0,0,0); kr.rotation.y=.5;
      strich(kr,[-.7,2.55,0],[.7,2.55,0],.04,0x38404e); strich(kr,[0,2.55,-.7],[0,2.55,.7],.04,0x38404e);
      [['O',0,-.8],['S',.8,0],['W',0,.8],['N',-.8,0]].forEach(([b,x,z])=>{ const tx=bild(64,64,c=>{ c.fillStyle='#e8b830'; c.beginPath(); c.arc(32,32,30,0,7); c.fill(); c.fillStyle='#2a1a08'; c.font='700 42px Andika, Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(b,32,35); });
        const m=new THREE.Mesh(new THREE.CircleGeometry(.23,20),basis(0xffffff,{map:tx,side:THREE.DoubleSide})); m.position.set(x,2.55,z); m.rotation.y=-.85; /* zur Blickrichtung drehen */ kr.add(m); });
      const f=gruppe(g,0,3.55,0); f.userData.lebendig=true; const gm=mat(0xf0bc34,{emissive:0x5a3c08});
      walze(f,.05,1.9,gm,0,0,0).rotation.z=Q; const sp=kegel(f,.2,.36,gm,1.02,0,0); sp.rotation.z=-Q;
      /* Heck: einfarbiger Schwalbenschwanz */
      const heck=new THREE.Shape(); heck.moveTo(-.6,.05); heck.lineTo(-1.2,.3); heck.lineTo(-1.0,0); heck.lineTo(-1.2,-.3); heck.lineTo(-.6,-.05); heck.lineTo(-.6,.05);
      teil(f,new THREE.ShapeGeometry(heck),mat(0xf0bc34,{emissive:0x5a3c08,side:THREE.DoubleSide}),0,0,0,1,1,1);
      walze(f,.035,.3,gm,0,.15,0); ball(f,.25,gm,0,.46,0,1.3,.95,.35); ball(f,.14,gm,.3,.72,0,1,1.1,.5); strich(f,[.14,.52,0],[.28,.68,0],.08,gm);
      kegel(f,.05,.16,0xe07a24,.49,.71,0).rotation.z=-Q; [0,1,2].forEach(i=>ball(f,.055,0xd83a2a,.22+i*.08,i===1?.9:.87,0,1,1,.6)); ball(f,.04,SCHWARZ,.35,.75,.07); ball(f,.04,SCHWARZ,.35,.75,-.07);
      [0,1,2].forEach(i=>{ const s=box(f,.46-i*.05,.1,.07,gm,-.4+i*.02,.55+i*.12,0); s.rotation.z=-.45-i*.35; });
      verschmelze(f); k.anim.push(t=>{ f.rotation.y=Math.sin(t*.45)*.55+Math.sin(t*1.7)*.08; });
      verschmelze(g); k.verdecker(g,5.1,-3.2,.5); } },
  { x:-11.6, z:2.8, steh:[-11.6,4.75], r:1, treffer:[1.9,2,1.9], baue(g,k){ /* 3 Regentonne mit Wasser */
      /* bauchiger Fassmantel: [Höhe unten, Höhe oben, Radius unten, Radius oben] */
      [[.05,.35,.69,.82],[.35,.66,.82,.89],[.66,.98,.89,.85],[.98,1.38,.85,.74]].forEach(([u,o,ru,ro],i)=>rohr(g,ro,ru,o-u,i%2?0x8a5a30:0x94643a,0,(u+o)/2,0,20,true));
      for(let i=0;i<16;i++){ const a=i*Math.PI/8; strich(g,[Math.cos(a)*.69,.05,Math.sin(a)*.69],[Math.cos(a)*.885,.65,Math.sin(a)*.885],.018,HOLZ3); strich(g,[Math.cos(a)*.885,.65,Math.sin(a)*.885],[Math.cos(a)*.75,1.37,Math.sin(a)*.75],.018,HOLZ3); }
      walze(g,.68,.06,HOLZ2,0,.05,0);
      [[.8,.28],[.89,.66],[.8,1.18]].forEach(([r,y])=>ring(g,r,.045,0x4a525c,0,y,0).rotation.x=Q);
      ring(g,.74,.06,HOLZ2,0,1.38,0).rotation.x=Q;
      walze(g,.72,.05,mat(0x5ab4e0,{emissive:0x123a58}),0,1.31,0);
      const w=gruppe(g,.1,1.345,.05); w.userData.lebendig=true; const wm=basis(0xd4f2ff,{transparent:true,opacity:.8,depthWrite:false});
      const wellen=[0,1].map(()=>{ const r=ring(w,.3,.014,wm.clone(),0,0,0); r.rotation.x=Q; r.castShadow=false; return r; });
      ball(g,.14,0x6a9a3a,-.3,1.35,.2,1.3,.14,.75);
      /* hölzerne Schöpfkelle am Rand und Wasserhahn */
      walze(g,.07,.2,MESSING,0,.45,.92).rotation.x=Q; ball(g,.09,MESSING,0,.45,1.0); walze(g,.03,.14,MESSING,0,.56,.98); box(g,.18,.04,.06,ROT,0,.64,.98);
      k.anim.push(t=>{ wellen.forEach((r,i)=>{ const u=(t*.45+i*.5)%1, s=.25+u*1.7; r.scale.set(s,s,1); r.material.opacity=.8*(1-u); }); }); } },
  { x:12.4, z:-4.6, steh:[12.4,-2.5], kasten:[2.5,1.8], treffer:[2.5,4.5,1.8], baue(g,k){ /* 4 Taubenschlag auf Pfosten */
      [-.7,.7].forEach(x=>{ box(g,.2,1.5,.2,HOLZ2,x,.75,-.3); box(g,.2,1.5,.2,HOLZ2,x,.75,.35); box(g,.4,.1,.4,STEIN2,x,.05,-.3); box(g,.4,.1,.4,STEIN2,x,.05,.35); });
      strich(g,[-.7,.3,.35],[.7,1.3,.35],.05,HOLZ); strich(g,[-.7,1.3,.35],[.7,.3,.35],.05,HOLZ);
      box(g,2.1,.16,1.4,HOLZ,0,1.55,0); box(g,1.9,1.45,1.05,0xf0e0c0,0,2.35,-.05);
      [-.9,-.45,0,.45,.9].forEach(x=>box(g,.025,1.45,.02,0xb89a70,x,2.35,.485));
      [[-.45,2.05],[.45,2.05],[0,2.65]].forEach(([x,y])=>{ walze(g,.22,.04,SCHWARZ,x,y+.06,.49).rotation.x=Q; box(g,.44,.24,.04,SCHWARZ,x,y-.06,.49); ring(g,.23,.045,0xa0402a,x,y+.06,.52,Math.PI); box(g,.58,.07,.28,HOLZ,x,y-.22,.62); });
      /* Giebel und Satteldach */
      teil(g,new THREE.ConeGeometry(1,1,4,1,false,Math.PI/4),0xf0e0c0,0,3.38,-.05,1.35,.62,.74);
      [-1,1].forEach(s=>{ const d=box(g,1.42,.14,1.5,0xb04a34,s*.58,3.46,0); d.rotation.z=-s*.6; [0,1,2].forEach(i=>{ const l=box(g,.06,.05,1.52,0x8a3424,s*(.22+i*.38),3.8-i*.26,0); l.rotation.z=-s*.6; }); });
      walze(g,.09,1.55,0x8a3424,0,3.9,0).rotation.x=Q;
      /* zwei Tauben auf den Brettchen */
      [[-.15,3.97,.45,1],[.55,1.63,.6,-1]].forEach(([x,y,z,v],i)=>{ const t=gruppe(g,x,y,z); t.userData.lebendig=true; t.scale.set(.85,.85,.85); t.rotation.y=v<0?Math.PI-.25:.25;
        const r=gruppe(t,0,-.1,0), h=gruppe(t,.22,.28,0); taubenRumpf(r,i?0xc8c0c8:GRAU); taubenKopf(h,i?0xc8c0c8:GRAU); verschmelze(r); verschmelze(h);
        k.anim.push(tt=>{ h.rotation.y=Math.sin(tt*1.6+i*2)*.6; h.rotation.z=-Math.max(0,Math.sin(tt*.9+i*3)-.7)*2; }); });
      verschmelze(g); k.verdecker(g,12.4,-4.6,1.1); } },
  { x:-10, z:-12.66, y:3.05, wand:'hinten', steh:[-10,-10.9], treffer:[2.9,2.9,.6], trefferY:-1.45, baue(g,k){ /* 5 Turmuhr am Turmaufbau */
      const tx=bild(256,256,c=>{ c.fillStyle='#fbf2da'; c.beginPath(); c.arc(128,128,127,0,7); c.fill(); c.strokeStyle='#8a6a3a'; c.lineWidth=5; c.beginPath(); c.arc(128,128,112,0,7); c.stroke();
        c.fillStyle='#2a1a10'; c.font='700 30px Andika, Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle';
        for(let i=1;i<=12;i++){ const a=i*Math.PI/6; c.fillText(String(i),128+Math.sin(a)*88,130-Math.cos(a)*88); }
        for(let i=0;i<60;i++){ const a=i*Math.PI/30; c.fillRect(128+Math.sin(a)*112-2,128-Math.cos(a)*112-2,4,4); } });
      const z=new THREE.Mesh(new THREE.CircleGeometry(1.15,40),new THREE.MeshLambertMaterial({map:tx,emissive:0xffffff,emissiveMap:tx,emissiveIntensity:.25})); z.position.z=.08; g.add(z);
      walze(g,1.28,.08,HOLZ2,0,0,0).rotation.x=Q; ring(g,1.22,.12,MESSING,0,0,.09); ring(g,1.38,.05,MESSING2,0,0,.03);
      const zeiger=(l,b,z2,w)=>{ const p=gruppe(g,0,0,z2); p.userData.lebendig=true; box(p,b,l,.04,SCHWARZ,0,l/2-.14,0); const s=kegel(p,b*1.25,.2,SCHWARZ,0,l-.1,0); s.scale.z=.03; p.rotation.z=w; return p; };
      zeiger(.65,.13,.13,1.05); const m=zeiger(.98,.08,.18,-1.05);
      ball(g,.11,MESSING,0,0,.22,1,1,.6);
      k.anim.push(t=>{ m.rotation.z=-1.05-t*.1047; }); } },
  { x:15.7, z:3.42, y:1.7, wand:'rechts', steh:[15.8,5.4], treffer:[2.2,2.4,.5], trefferY:-1.2, baue(g){ /* 6 Bronzetafel */
      const tx=bild(256,320,c=>{ const v=c.createLinearGradient(0,0,256,320); v.addColorStop(0,'#d89c58'); v.addColorStop(.5,'#b87e40'); v.addColorStop(1,'#8a5a2c'); c.fillStyle=v; c.fillRect(0,0,256,320);
        c.strokeStyle='#5a3814'; c.lineWidth=8; c.strokeRect(14,14,228,292);
        c.fillStyle='#e8bc78'; c.beginPath(); c.arc(128,84,44,0,7); c.fill(); c.lineWidth=5; c.stroke();
        c.fillStyle='#6a4418'; c.beginPath(); c.moveTo(94,84); c.lineTo(128,58); c.lineTo(162,84); c.closePath(); c.fill(); [104,124,144].forEach(x=>c.fillRect(x,87,9,24)); c.fillRect(96,112,66,8);
        c.lineWidth=9; c.lineCap='round'; [[40,160,216],[48,188,208],[40,216,216],[60,244,196],[52,272,204]].forEach(([a,y,b])=>{ c.strokeStyle='rgba(255,220,160,.55)'; c.beginPath(); c.moveTo(a,y+3); c.lineTo(b,y+3); c.stroke(); c.strokeStyle='#5a3814'; c.beginPath(); c.moveTo(a,y); c.lineTo(b,y); c.stroke(); }); });
      box(g,1.9,2.3,.1,0x6a4418,0,0,-.02);
      const m=new THREE.Mesh(new THREE.PlaneGeometry(1.7,2.1),new THREE.MeshLambertMaterial({map:tx,emissive:0xffffff,emissiveMap:tx,emissiveIntensity:.2})); m.position.z=.05; g.add(m);
      [-.84,.84].forEach(x=>[-1.04,1.04].forEach(y=>ball(g,.085,MESSING,x,y,.07,1,1,.6))); } },
  { x:9.4, z:-10.4, steh:[9.4,-8.5], r:1.05, treffer:[2.6,2.9,1.5], baue(g){ /* 7 Stadtfernrohr auf Dreibein */
      [[0,.75],[-.68,-.4],[.68,-.4]].forEach(([x,z])=>{ strich(g,[x,.04,z],[0,1.55,0],.07,HOLZ); ball(g,.11,MESSING2,x,.07,z,1,.7,1); });
      walze(g,.16,.2,MESSING2,0,1.58,0); walze(g,.07,.28,METALL2,0,1.78,0); ball(g,.15,MESSING,0,1.9,0);
      const r=gruppe(g,0,2.05,0); r.rotation.set(0,.28,.24);
      const stueck=(radius,l,c,x)=>{ walze(r,radius,l,c,x,0,0).rotation.z=Q; };
      stueck(.25,1.2,0x2a5a9a,.12); stueck(.32,.42,0x2a5a9a,.9); stueck(.17,.45,MESSING,-.68); stueck(.1,.22,SCHWARZ,-1.0);
      [[.27,-.45],[.27,.25],[.34,.7],[.35,1.11],[.19,-.9]].forEach(([rr,x])=>stueck(rr,.09,MESSING,x));
      stueck(.28,.03,mat(0x9ad8ff,{emissive:0x1a4a6a}),1.16);
      walze(r,.07,.6,MESSING2,0,.36,0).rotation.z=Q; [-.2,.2].forEach(x=>box(r,.06,.14,.06,METALL2,x,.28,0));
      ring(g,.09,.03,MESSING,.18,1.78,.14); } },
  { x:11.4, z:5.8, steh:[11.4,7.8], kasten:[3.5,1.9], treffer:[3.5,1.8,1.9], baue(g,k){ /* 8 Dachbeet: Hochbeet voller Blumen */
      box(g,3.2,.62,1.6,0x9a6436,0,.42,0); [.24,.46,.68].forEach(y=>[-1,1].forEach(s=>{ box(g,3.24,.025,.02,HOLZ3,0,y-.1,s*.81); box(g,.02,.025,1.62,HOLZ3,s*1.61,y-.1,0); }));
      [-1.6,1.6].forEach(x=>[-.8,.8].forEach(z=>box(g,.18,.86,.18,HOLZ2,x,.43,z)));
      [-1,1].forEach(s=>{ box(g,3.4,.1,.2,HOLZ,0,.78,s*.8); box(g,.2,.1,1.5,HOLZ,s*1.6,.78,0); });
      box(g,3.05,.1,1.45,0x4a3020,0,.72,0);
      const F=[0xe0566b,0xffd34a,0xe87ab0,0xa07cf0,0xff8a3a,0xffffff];
      for(let i=0;i<15;i++){ const x=-1.3+(i%5)*.65+((i/5|0)%2)*.12, z=-.48+(i/5|0)*.47, h=.3+((i*7)%5)*.09+(i<5?.18:0), c=F[(i*5+2)%6];
        walze(g,.03,h,0x3f8a4a,x,.76+h/2,z); [-1,1].forEach(s=>{ ball(g,.13,0x5aa24a,x+s*.12,.86,z,1.1,.28,.55).rotation.z=s*.5; });
        const y=.8+h; if(i%3===1){ ball(g,.13,c,x,y,z,1,1.15,1); [-1,0,1].forEach(a=>kegel(g,.06,.16,c,x+a*.08,y+.15,z)); }
        else { for(let j=0;j<6;j++){ const a=j*1.047; ball(g,.085,c,x+Math.cos(a)*.11,y+Math.sin(a)*.1,z+.02-Math.sin(a)*.04,1,1,.5); } ball(g,.075,c===0xffd34a?0xc86a1a:0xffe070,x,y,z+.06); } }
      for(let i=0;i<24;i++) ball(g,.17,i%2?0x4a8a3a:0x6aaa4a,-1.35+(i%8)*.39,.84,-.55+(i/8|0)*.55,1,.7,.9);
      const biene=gruppe(g,0,1.7,0); biene.userData.lebendig=true; ball(biene,.09,0xffd23a,0,0,0,1.4,1,1); box(biene,.05,.18,.18,SCHWARZ,0,0,0); ball(biene,.06,SCHWARZ,.13,.01,0); [-1,1].forEach(s=>ball(biene,.08,0xf0faff,-.02,.09,s*.07,.8,.2,1));
      k.anim.push(t=>{ biene.position.set(Math.sin(t*.9)*1.15,1.65+Math.sin(t*3.2)*.12,Math.sin(t*1.8)*.45); biene.rotation.y=Math.cos(t*.9)>0?0:Math.PI; }); } },
  { x:-9.4, z:8.4, steh:[-9.4,10.4], kasten:[3.3,1.7], treffer:[3.3,2.3,1.7], baue(g){ /* 9 große Gießkanne mit Brause und Henkel */
      const C=0x1f9a86, D=0x146a5c, X=-.46;
      rohr(g,.64,.72,1.15,C,X,.62,0,24); walze(g,.75,.1,D,X,.08,0); ring(g,.65,.06,D,X,1.2,0).rotation.x=Q; ring(g,.7,.035,MESSING,X,.42,0).rotation.x=Q;
      walze(g,.59,.04,D,X,1.2,0); walze(g,.34,.05,SCHWARZ,X+.18,1.23,0);
      /* Henkel oben und hinten */
      ring(g,.48,.075,D,X-.1,1.2,0,Math.PI);
      const h=ring(g,.4,.075,D,X-.66,.7,0,Math.PI); h.rotation.z=Q;
      /* langes Rohr mit runder Brause */
      strich(g,[X+.6,.32,0],[X+1.62,1.38,0],.13,C); strich(g,[X+.55,1.0,0],[X+1.15,.92,0],.045,D);
      const br=gruppe(g,X+1.72,1.48,0); br.rotation.z=-.76; walze(br,.15,.14,D,0,-.04,0); rohr(br,.36,.14,.26,C,0,.14,0,20); walze(br,.37,.07,MESSING,0,.29,0);
      for(let i=0;i<13;i++){ const a=i*2.4, r=i?.08+.019*i:0; walze(br,.028,.02,SCHWARZ,Math.cos(a)*r,.33,Math.sin(a)*r); }
      /* gemalte Blume auf dem Bauch */
      for(let j=0;j<6;j++){ const a=j*1.047; ball(g,.1,0xffe070,X+Math.cos(a)*.16,.74+Math.sin(a)*.16,.68,1,1,.35); } ball(g,.1,0xe0566b,X,.74,.7,1,1,.4); } },
  { x:-13.4, z:-5.6, steh:[-13.4,-3.5], kasten:[3.4,1.4], treffer:[3.4,3.2,1.4], baue(g,k){ /* 10 Drachen an kurzer Schnur */
      /* Pfosten mit Schnurrolle */
      box(g,.7,.22,.7,STEIN2,-1.25,.11,0); walze(g,.1,1.5,HOLZ,-1.25,.9,0); ball(g,.15,ROT,-1.25,1.72,0); walze(g,.17,.3,0xe8d8b0,-1.25,1.25,.12).rotation.x=Q; [-.16,.16].forEach(d=>walze(g,.23,.05,HOLZ2,-1.25,1.25,.12+d).rotation.x=Q);
      const f=gruppe(g,-1.25,1.62,0); f.userData.lebendig=true;
      const d=gruppe(f,1.65,.65,0);
      const dreieck=(a,b,c,farbe)=>{ const s=new THREE.Shape(); s.moveTo(a[0],a[1]); s.lineTo(b[0],b[1]); s.lineTo(c[0],c[1]); s.lineTo(a[0],a[1]); const m=new THREE.Mesh(new THREE.ShapeGeometry(s),mat(farbe,{side:THREE.DoubleSide,emissive:farbe,emissiveIntensity:.22})); m.castShadow=true; d.add(m); };
      const O=[0,1.05], U=[0,-.95], L=[-.82,.3], R=[.82,.3], M=[0,.3];
      dreieck(O,L,M,0xe83a3a); dreieck(O,M,R,0xffc820); dreieck(L,U,M,0x2f8ae0); dreieck(M,U,R,0x3cb45a);
      [[O,U],[L,R],[O,L],[L,U],[U,R],[R,O]].forEach(([a,b],i)=>strich(d,[a[0],a[1],.02],[b[0],b[1],.02],i<2?.028:.022,HOLZ2));
      [-1,1].forEach(s=>{ ball(d,.09,WEISS,s*.24,.5,.04,1,1.2,.3); ball(d,.045,SCHWARZ,s*.23,.48,.07,1,1,.5); });
      ring(d,.2,.028,SCHWARZ,0,.2,.04,Math.PI).rotation.z=Math.PI;
      strich(f,[0,.08,0],[1.65,.6,.03],.012,0xfaf6ea);
      /* Schwanz mit Schleifen */
      const schleifen=[0,1,2,3].map(i=>{ const s=gruppe(f,0,0,0); [-1,1].forEach(v=>{ const m=kegel(s,.13,.24,[0xffc820,0xe83a3a,0x3cb45a,0xb04ae0][i],v*.12,0,0); m.rotation.z=v*Q; m.scale.z=.05; }); ball(s,.045,WEISS,0,0,0); return s; });
      const faden=[0,1,2,3].map(()=>{ const s=gruppe(f,0,0,0); box(s,1,.02,.02,0xfaf6ea,.5,0,0); return s; });
      const bewege=t=>{ f.rotation.z=Math.sin(t*1.3)*.07; f.rotation.y=Math.sin(t*.8)*.12; d.rotation.z=-.28+Math.sin(t*2.6)*.09; d.rotation.y=Math.sin(t*3.4)*.16;
        const w=d.rotation.z; let ax=1.65+Math.sin(w)*.95, ay=.65-Math.cos(w)*.95;
        schleifen.forEach((s,i)=>{ const x=1.4-i*.26+Math.sin(t*4-i*1.2)*.14, y=-.45-i*.25+Math.sin(t*3+i)*.04, l=Math.hypot(x-ax,y-ay); s.position.set(x,y,0); s.rotation.z=Math.sin(t*5-i)*.35; faden[i].position.set(ax,ay,0); faden[i].scale.x=l; faden[i].rotation.z=Math.atan2(y-ay,x-ax); ax=x; ay=y; }); };
      bewege(0); k.anim.push(bewege); } }
];
return { titel:'Das Dach', breite:B, tiefe:T, himmel:0xffc090, baue, gegenstaende, verstecke };
})();

/* Schlussbild Museum: Sonnenaufgang vor dem Museum. Die zwei Flügel der großen Eingangstür schwingen auf, aus der warm
   leuchtenden Ausstellungshalle tritt die Spielfigur, steigt die Stufen hinab, läuft nach vorn, winkt und jubelt. Die
   Museumsleiterin mit Brille und Schlüsselbund winkt, der Brunnen sprudelt, Tauben fliegen auf, dahinter geht über der
   Stadt die Sonne auf, dazu Bäume und buntes Konfetti. Säulenfront mit Dreiecksgiebel und Bannern, ohne Schrift. */
FINALE3D.museum = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  const HORIZONT=0xffd8b0;
  sc.background=new THREE.Color(HORIZONT);
  sc.fog=new THREE.Fog(HORIZONT,42,130);
  const himmelsLicht=new THREE.HemisphereLight(0xdfe8ff,0x8a7a58,.62); sc.add(himmelsLicht);
  const licht=new THREE.DirectionalLight(0xffdaa4,.55); licht.position.set(9,11,13); licht.castShadow=true; licht.shadow.mapSize.set(1024,1024);
  const sk=licht.shadow.camera; sk.left=-15; sk.right=15; sk.top=13; sk.bottom=-11; sk.near=1; sk.far=48; licht.shadow.bias=-.001; sc.add(licht);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const M1=MUS.MARMOR, M2=MUS.MARMOR2, M3=MUS.MARMOR3, HOLZ=MUS.HOLZ, HOLZ2=MUS.HOLZ2, HOLZ3=MUS.HOLZ3, GOLD=MUS.GOLD, MESSING=MUS.MESSING, ROT=0xa82c3a;
  const GRUEN=[0x4f8a34,0x69a63e,0x3d7a3a,0x86b446];
  const BUNT=[0xff4f6e,0xffc21a,0x2fb4ff,0x3fd07a,0xb264ec,0xff8a30];

  /* ---------- Morgenhimmel: Verlauf, Sonne, Wolken ---------- */
  const KUPPEL=118; /* groß genug für Sonne und Wolken in sehr breiten Bildern, kleiner als die Sichtweite der Kamera (120) */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#4f78c4'); v.addColorStop(.3,'#6aa0e0'); v.addColorStop(.39,'#a8c6ec'); v.addColorStop(.44,'#f4c4bc'); v.addColorStop(.475,'#ffc890'); v.addColorStop(.5,'#ffd8b0'); v.addColorStop(1,'#ffd8b0'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(KUPPEL,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(1,32),basis(0xfff2b0,{fog:false})); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,205,120,.85)',0,0,0,18); sonnenSchein.material.fog=false;
  const strahlen=gruppe(sc,0,0,0), strahlM=basis(0xffeaa8,{fog:false,transparent:true,opacity:.5,depthWrite:false});
  for(let i=0;i<12;i++){ const a=i*Math.PI/6, s=box(strahlen,.14,i%2?.55:.85,.02,strahlM,Math.cos(a)*1.75,Math.sin(a)*1.75,0); s.rotation.z=a-Math.PI/2; }
  ohneSchatten(strahlen);
  const wolkeHell=basis(0xfff2e6,{fog:false}), wolkeRosa=basis(0xf6bcb8,{fog:false});
  /* [Bildplatz x, Bildplatz y, Größe] */
  const wolken=[[-.74,.74,1],[-.28,.9,.65],[.32,.89,.75],[.92,.46,.6]].map(p=>{ const g=gruppe(sc,0,0,0);
    [[-2.4,0,1.2],[-.9,.35,1.6],[.9,.2,1.4],[2.4,-.05,1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1.3,.5,.4));
    ball(g,1,wolkeRosa,0,-.38,.15,4.1,.42,.4); verschmelze(g); ohneSchatten(g); return { g, p }; });

  /* ---------- Wiese und Vorplatz aus Steinplatten ---------- */
  const grasBild=bild(256,256,g=>{ g.fillStyle='#74ac48'; g.fillRect(0,0,256,256); const F=['#84be52','#679c3e','#8ec45a','#5e943a'];
    for(let i=0;i<700;i++){ g.fillStyle=F[i%4]; g.fillRect(zufall()*252,zufall()*250,3,3+zufall()*5); } });
  grasBild.wrapS=grasBild.wrapT=THREE.RepeatWrapping; grasBild.repeat.set(48,48);
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshLambertMaterial({map:grasBild})); boden.rotation.x=-Math.PI/2; boden.receiveShadow=true; sc.add(boden);
  const platzBild=MUS.fliesenBild([226,208,180],[212,192,164],'#a8947a',4);
  platzBild.wrapS=platzBild.wrapT=THREE.RepeatWrapping; platzBild.repeat.set(3.5,3.5);
  const vorplatz=new THREE.Mesh(new THREE.PlaneGeometry(15,15),new THREE.MeshLambertMaterial({map:platzBild})); vorplatz.rotation.x=-Math.PI/2; vorplatz.position.set(0,.006,5.4); vorplatz.receiveShadow=true; sc.add(vorplatz);

  /* ---------- Stadt hinter dem Museum (nur flache und spitze Wohnhausdächer) ---------- */
  const STADT=[0xb8a8c8,0xa898b8,0xd8b4a8,0xa4b0c8,0xc8b8a0,0xb89cac];
  const haeuser=[], daecher=[], stadtFenster=[];
  /* [x, z, Breite, Höhe] */
  const STADTPLAN=[[-9.8,-15,3.4,5.4],[-6,-21,3.6,8.2],[-2,-24,4,9.4],[2.6,-22,3.4,7.6],[6.4,-19,3.2,8.8],[10.2,-14,3.2,4.8],[-13.6,-20,4,7.4],[14,-21,4.2,6.6],
    [-18,-16,3.6,5],[18.4,-16,3.8,5.6],[-23,-24,4.6,9],[23,-25,4.4,8.4],[-29,-18,4.2,6],[29.5,-19,4.4,6.8],[-36,-26,5.6,9.6],[36,-27,5.4,9],[-45,-24,6,7.6],[45,-23,6,8],[-56,-28,7,9],[56,-28,7,8.6]];
  STADTPLAN.forEach((p,i)=>{ const [x,z,b,h]=p, f=STADT[i%6];
    haeuser.push([x,h/2,z,b,h,2.4,f]);
    if(i%3===1) daecher.push([x,h+.55,z,b*.58,1.1,1.7,0xa85a4c,0]); else { haeuser.push([x,h+.12,z,b+.3,.24,2.7,0x8a7a90]); haeuser.push([x+b*.24,h+.5,z,.45,.6,.45,0x9a7a74]); }
    const spalten=Math.max(2,Math.floor(b/1.05));
    for(let r=0;r<Math.floor((h-1)/1.25);r++) for(let s=0;s<spalten;s++) stadtFenster.push([x-b/2+(s+.5)*b/spalten,.9+r*1.25,z+1.23,.46,.62,.04,(r*3+s+i)%4?0xffeab4:0x6c74a0]); });
  MUS.viele(sc,GEO.box,haeuser); MUS.viele(sc,GEO.cone,daecher);
  const stadtLicht=new THREE.InstancedMesh(GEO.box,basis(0xffffff),stadtFenster.length), FARBE=new THREE.Color();
  stadtFenster.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(0,0,0); o.updateMatrix(); stadtLicht.setMatrixAt(i,o.matrix); stadtLicht.setColorAt(i,FARBE.set(e[6])); });
  stadtLicht.frustumCulled=false; sc.add(stadtLicht);

  /* ---------- Museum: Unterbau mit Stufen, Wand, Säulen, Gebälk, Dreiecksgiebel ---------- */
  const PH=.72, OB=1.3, DH=3.15, GB=5.45, SH=4.42, GU=4.97, GS=6.5, VORN=-3.5, SZ=-2.4;
  const bau=gruppe(sc,0,0,0);
  box(bau,12.2,PH,4.5,M2,0,PH/2,-4.15);
  for(let i=0;i<3;i++){ const h=PH-(i+1)*.18; box(bau,12.2,h,.35,i%2?M2:M1,0,h/2,-1.725+i*.35); }
  /* roter Läufer von der Tür bis auf den Platz */
  box(bau,1.9,.012,1.6,ROT,0,PH+.008,-2.69);
  for(let i=0;i<3;i++){ const h=PH-(i+1)*.18; box(bau,1.9,.012,.35,ROT,0,h+.008,-1.725+i*.35); box(bau,1.9,.18,.012,0x86202c,0,h+.09,-1.894+i*.35); }
  box(bau,1.9,.18,.012,0x86202c,0,.09,-.844);
  const laeuferB=box(bau,1.9,.012,4.9,ROT,0,.016,1.6); laeuferB.castShadow=false;
  [-1,1].forEach(v=>{ box(bau,.09,.014,4.9,MESSING,v*.84,.019,1.6).castShadow=false; });
  /* Giebelfeld-Unterbau und Dach */
  box(bau,GB*2+.5,.36,1.6,M1,0,SH+.18,-2.75); box(bau,GB*2+.7,.19,1.75,M3,0,SH+.455,-2.72);
  for(let i=0;i<27;i++) box(bau,.16,.2,.08,M2,-5.2+i*.4,SH+.2,-1.93);
  box(bau,GB*2,.4,3,M2,0,SH+.2,-4.9);
  verschmelze(bau);
  const quader=MUS.quaderBild([222,202,168],'#a08c6c',8);
  [-1,1].forEach(v=>MUS.mauer(sc,quader,GB-OB,SH-PH,.4,v*(OB+GB)/2,(SH+PH)/2,VORN-.2));
  MUS.mauer(sc,quader,OB*2,SH-PH-DH,.4,0,(SH+PH+DH)/2,VORN-.2);
  /* Seitenflügel, etwas zurückgesetzt */
  const fluegelbau=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ MUS.mauer(sc,quader,2.9,3.7,2.2,v*(GB+1.4),1.85,-5.3);
    box(fluegelbau,3.2,.24,2.5,M1,v*(GB+1.45),3.82,-5.3); box(fluegelbau,3,.4,2.3,M3,v*(GB+1.42),.2,-5.28);
    [0,1].forEach(i=>{ const x=v*(GB+.8+i*1.35);
      box(fluegelbau,.92,1.9,.1,M3,x,1.95,-4.17); box(fluegelbau,.72,1.7,.1,0xffd27a,x,1.95,-4.14); box(fluegelbau,.06,1.7,.04,HOLZ2,x,1.95,-4.08); box(fluegelbau,.72,.06,.04,HOLZ2,x,2.2,-4.08);
      box(fluegelbau,1.08,.14,.3,M1,x,.96,-4.08); box(fluegelbau,1.08,.18,.24,M1,x,2.98,-4.1); }); });
  verschmelze(fluegelbau);
  /* sechs Säulen */
  const saeulen=gruppe(sc,0,0,0);
  [-4.95,-3.55,-2.15,2.15,3.55,4.95].forEach(x=>{
    box(saeulen,.84,.18,.84,M3,x,PH+.09,SZ); walze(saeulen,.37,.14,M2,x,PH+.25,SZ);
    const h=SH-PH-.62; rohr(saeulen,.25,.31,h,M1,x,PH+.32+h/2,SZ);
    for(let i=0;i<10;i++){ const a=i*Math.PI/5; strich(saeulen,[x+Math.cos(a)*.305,PH+.38,SZ+Math.sin(a)*.305],[x+Math.cos(a)*.25,SH-.34,SZ+Math.sin(a)*.25],.022,M2); }
    walze(saeulen,.34,.12,M2,x,SH-.24,SZ); box(saeulen,.82,.18,.82,M3,x,SH-.09,SZ);
    [-1,1].forEach(v=>{ const r=ring(saeulen,.09,.04,M2,x+v*.28,SH-.26,SZ+.3); r.scale.z=1.4; }); });
  verschmelze(saeulen);
  /* Dreiecksgiebel mit Lorbeerkranz und Amphore */
  const gf=new THREE.Shape(); gf.moveTo(-GB-.3,0); gf.lineTo(GB+.3,0); gf.lineTo(0,GS-GU); gf.lineTo(-GB-.3,0);
  const giebel=new THREE.Mesh(new THREE.ExtrudeGeometry(gf,{depth:1.45,bevelEnabled:false}),mat(0xe0d2b8)); giebel.position.set(0,GU,-3.5); giebel.castShadow=true; giebel.receiveShadow=true; sc.add(giebel);
  const zier=gruppe(sc,0,0,0), schraeg=Math.atan2(GS-GU,GB+.3), lang=Math.hypot(GS-GU,GB+.3);
  [-1,1].forEach(v=>{ const s=box(zier,lang+.15,.2,1.75,M1,v*(GB+.3)/2,(GU+GS)/2+.06,-2.72); s.rotation.z=-v*schraeg;
    const l=box(zier,lang-.9,.07,.08,MUS.TUERKIS,v*(GB-.35)/2,(GU+GS)/2-.17,-2.02); l.rotation.z=-v*schraeg;
    /* Schnörkel links und rechts im Giebelfeld */
    ring(zier,.2,.05,MESSING,v*1.25,GU+.38,-2.02,Math.PI*1.6); ring(zier,.12,.04,MESSING,v*1.8,GU+.28,-2.02,Math.PI*1.6); strich(zier,[v*.75,GU+.18,-2.02],[v*2.7,GU+.18,-2.02],.035,MESSING);
    ball(zier,.17,MESSING,v*(GB+.35),GU+.24,-2.3); ball(zier,.09,GOLD,v*(GB+.35),GU+.45,-2.3); });
  for(let i=0;i<18;i++){ const a=-Math.PI/2+.35+i*(Math.PI*2-.7)/17, b=ball(zier,.075,i%2?0x5c9a3c:0x4a8434,Math.cos(a)*.46,GU+.64+Math.sin(a)*.46,-2.01,1.5,.8,.6); b.rotation.z=a+Math.PI/2; }
  const AY=GU+.62;
  ball(zier,.2,0xc8643c,0,AY-.04,-1.99,1,1.25,.6); walze(zier,.07,.2,0xc8643c,0,AY+.27,-1.99); box(zier,.24,.05,.12,0x3a2416,0,AY+.38,-1.99); box(zier,.2,.07,.12,0x3a2416,0,AY-.31,-1.99); box(zier,.34,.05,.04,0x3a2416,0,AY,-1.86);
  [-1,1].forEach(v=>ring(zier,.1,.024,0xc8643c,v*.17,AY+.17,-1.99));
  ball(zier,.2,GOLD,0,GS+.2,-2.4);
  verschmelze(zier);

  /* Banner zwischen den Säulen: Dino-Skelett, Vase, Schneckenstein, Gemälde (Bilder, keine Schrift) */
  const bannerBild=(art,farbe)=>bild(128,384,g=>{ g.fillStyle=farbe; g.fillRect(0,0,128,384); g.strokeStyle='#f0c850'; g.lineWidth=6; g.strokeRect(8,8,112,368);
    g.fillStyle='#fff0cc'; g.strokeStyle='#fff0cc'; g.lineCap='round';
    const strichB=(w,p)=>{ g.lineWidth=w; g.beginPath(); p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); g.stroke(); };
    const kreisB=(x,y,r)=>{ g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); };
    if(art===0){ strichB(9,[[112,232],[86,214],[62,210],[46,180],[44,150]]); g.beginPath(); g.moveTo(22,128); g.lineTo(66,120); g.lineTo(76,148); g.lineTo(52,156); g.lineTo(22,146); g.fill();
      g.fillStyle=farbe; kreisB(58,134,5); [[56,180],[64,190],[74,194]].forEach((q,i)=>strichB(5,[q,[q[0]-14+i*3,q[1]+34]])); strichB(8,[[78,214],[66,250],[78,276],[62,278]]); strichB(8,[[92,220],[98,252],[90,278],[104,278]]); }
    else if(art===1){ g.beginPath(); g.ellipse(64,214,34,52,0,0,Math.PI*2); g.fill(); g.fillRect(52,130,24,40); g.fillRect(40,122,48,12); g.fillRect(44,262,40,12);
      strichB(6,[[52,140],[28,160],[34,186]]); strichB(6,[[76,140],[100,160],[94,186]]); g.fillStyle=farbe; g.fillRect(32,204,64,8); g.fillRect(34,222,60,5); }
    else if(art===2){ g.lineWidth=9; g.beginPath(); for(let i=0;i<=120;i++){ const a=i*.145, r=3+i*.34; if(i) g.lineTo(64+Math.cos(a)*r,196+Math.sin(a)*r); else g.moveTo(64+r,196); } g.stroke();
      for(let i=0;i<12;i++){ const a=i*Math.PI/6; strichB(3,[[64+Math.cos(a)*30,196+Math.sin(a)*30],[64+Math.cos(a)*43,196+Math.sin(a)*43]]); } }
    else { g.fillRect(22,140,84,110); g.fillStyle='#6ab0e8'; g.fillRect(28,146,72,98); g.fillStyle='#ffd040'; kreisB(80,170,13); g.fillStyle='#5a9a44'; g.beginPath(); g.moveTo(28,244); g.lineTo(28,214); g.lineTo(54,188); g.lineTo(78,220); g.lineTo(100,200); g.lineTo(100,244); g.fill(); g.fillStyle='#fff0cc'; }
    g.fillStyle='#f0c850'; [70,314].forEach(y=>{ [-1,0,1].forEach(i=>kreisB(64+i*24,y,i?5:8)); }); });
  const banner=[[-4.25,2,'#7a3a7c'],[-2.85,0,'#2a5a8a'],[2.85,1,'#a8343c'],[4.25,3,'#2f7a5a']].map(([x,art,f])=>{
    const g=gruppe(sc,x,SH-.06,-2.95);
    const tuch=new THREE.Mesh(new THREE.PlaneGeometry(.78,2.34),new THREE.MeshLambertMaterial({map:bannerBild(art,f),side:THREE.DoubleSide})); tuch.position.y=-1.27; tuch.castShadow=true; g.add(tuch);
    strich(g,[-.45,-.08,0],[.45,-.08,0],.035,MESSING); [-1,1].forEach(v=>{ ball(g,.06,GOLD,v*.46,-.08,0); ball(g,.05,GOLD,v*.34,-2.48,0); });
    return g; });

  /* Leuchtende Ausstellungshalle hinter der Tür */
  const hallenBild=bild(320,320,g=>{ g.fillStyle='#a86830'; g.fillRect(0,0,320,320);
    [[78,60,'#305c9c'],[196,48,'#44803c'],[142,96,'#a83030']].forEach(([x,y,f])=>{ g.fillStyle='#e8b830'; g.fillRect(x-4,y-4,52,44); g.fillStyle=f; g.fillRect(x,y,44,36); g.fillStyle='#ffe08a'; g.beginPath(); g.arc(x+30,y+12,6,0,Math.PI*2); g.fill(); });
    g.fillStyle='#6a3c1a'; [96,224].forEach(x=>{ g.fillRect(x-16,210,32,60); g.fillRect(x-22,204,44,8); g.beginPath(); g.ellipse(x,182,13,22,0,0,Math.PI*2); g.fill(); g.fillRect(x-6,152,12,14); });
    const v=g.createRadialGradient(160,200,6,160,190,200); v.addColorStop(0,'rgba(255,248,205,.95)'); v.addColorStop(.35,'rgba(255,208,110,.6)'); v.addColorStop(1,'rgba(255,150,40,0)'); g.fillStyle=v; g.fillRect(0,0,320,320); });
  const halle=new THREE.Mesh(new THREE.PlaneGeometry(5,DH+.5),new THREE.MeshBasicMaterial({map:hallenBild,fog:false})); halle.position.set(0,PH+(DH+.5)/2,-5.55); sc.add(halle);
  const hallenBoden=box(sc,OB*2,.012,2.1,0xd09450,0,PH+.006,-4.5); hallenBoden.castShadow=false;
  const drinnen=new THREE.PointLight(0xffbc5c,1.1,8,1.5); drinnen.position.set(0,PH+2.5,-4.4); sc.add(drinnen);
  const lichtfleck=new THREE.Mesh(new THREE.PlaneGeometry(3.6,2.4),new THREE.MeshBasicMaterial({map:leuchtBild('rgba(255,205,110,.5)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); lichtfleck.rotation.x=-Math.PI/2; lichtfleck.position.set(0,PH+.03,-2.9); sc.add(lichtfleck);

  /* Türrahmen mit geradem Sturz */
  const rahmen=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ box(rahmen,.24,DH,.26,M1,v*(OB+.12),PH+DH/2,VORN+.04); });
  box(rahmen,OB*2+.8,.22,.34,M1,0,PH+DH+.11,VORN+.06); box(rahmen,OB*2+1,.09,.44,M3,0,PH+DH+.26,VORN+.08); ball(rahmen,.13,GOLD,0,PH+DH+.12,VORN+.26,1.3,.8,.5);
  verschmelze(rahmen);

  /* ---------- zwei große Türflügel, die nach außen aufschwingen ---------- */
  const TZ=-3.4;
  const tueren=[-1,1].map(v=>{ const angel=gruppe(sc,v*OB,PH+.025,TZ), g=gruppe(angel,0,0,0), r=-v; /* r: Richtung zur Türmitte */
    box(g,OB-.012,DH-.04,.12,HOLZ,r*OB/2,DH/2-.02,0);
    [-.07,.07].forEach(z=>{ [[.55,.65],[1.5,.85],[2.5,.75]].forEach(([y,h])=>{ box(g,OB-.34,h,.03,HOLZ2,r*OB/2,y,z); box(g,OB-.52,h-.18,.045,HOLZ,r*OB/2,y,z); });
      ring(g,.12,.028,GOLD,r*(OB-.17),1.45,z*1.65); ball(g,.065,GOLD,r*(OB-.17),1.59,z*1.5); });
    [.5,1.6,2.7].forEach(y=>walze(g,.055,.24,HOLZ3,r*.04,y,0));
    verschmelze(g); return { angel, v }; });

  /* ---------- Amphoren auf Sockeln, Laternen, Blumenkübel ---------- */
  const deko=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ const x=v*5.55, z=-.55;
    MUS.sockel(deko,x,z,.7,.9);
    ball(deko,.36,0xc8643c,x,1.35,z,1,1.15,1); walze(deko,.13,.3,0xc8643c,x,1.83,z); walze(deko,.2,.07,0x3a2416,x,1.99,z); walze(deko,.2,.1,0x3a2416,x,.95,z);
    const band=ring(deko,.35,.035,0x3a2416,x,1.38,z); band.rotation.x=Math.PI/2;
    [-1,1].forEach(s=>ring(deko,.15,.035,0xc8643c,x+s*.28,1.7,z));
    /* Laterne am Rand des Platzes */
    const lx=v*7.3, lz=1.4; walze(deko,.2,.2,0x2e3a3a,lx,.1,lz); walze(deko,.07,2.5,0x2e3a3a,lx,1.35,lz); box(deko,.34,.42,.34,0xffe6a0,lx,2.8,lz); kegel(deko,.32,.24,0x2e3a3a,lx,3.12,lz); box(deko,.44,.06,.44,0x2e3a3a,lx,2.57,lz);
    /* Blumenkübel */
    [[6.75,-1.35],[6.95,.15]].forEach(([px,pz],j)=>{ rohr(deko,.42,.32,.46,0xb8704c,v*px,.23,pz);
      for(let i=0;i<9;i++){ const a=i*2.4, r=i?.27:0; ball(deko,.17,GRUEN[(i+j)%4],v*px+Math.cos(a)*r,.5,pz+Math.sin(a)*r); ball(deko,.075,BUNT[(i+j*2+(v>0?1:0))%6],v*px+Math.cos(a)*r*1.1,.66+(i%2)*.05,pz+Math.sin(a)*r*1.1+.04); } }); });
  verschmelze(deko);

  /* ---------- Bäume, Büsche, Blumen ---------- */
  const staemme=[], kronen=[], fruechte=[];
  const baum=(x,z,s,i)=>{ staemme.push([x,s*.8,z,s*.2,s*1.6,s*.2,0x7a4e28]);
    [[0,2.3,0,1],[-.65,1.9,.15,.7],[.68,1.95,.05,.72],[.1,3,-.05,.65]].forEach((q,j)=>kronen.push([x+q[0]*s,q[1]*s,z+q[2]*s,q[3]*s,q[3]*s*.9,q[3]*s*.85,GRUEN[(i+j)%4]]));
    if(i%3===0) [[-.5,2.5,.85],[.4,2.1,.95],[.15,2.9,.62],[-.95,1.8,.75]].forEach(q=>fruechte.push([x+q[0]*s,q[1]*s,z+q[2]*s,.11*s,.11*s,.11*s,0xffb0c0])); };
  [[-9.6,-3.4,1.15],[9.8,-3.8,1.2],[-12.6,-6.5,1.35],[12.8,-7,1.25],[-14.5,-1.5,1.05],[14.8,-.8,1.1],[-19,-6,1.4],[19.5,-5,1.35],[-24,-1.5,1.2],[24.5,-3,1.25],[-31,-8,1.5],[31,-7.5,1.45],
   [-39,-4,1.4],[39.5,-5,1.35],[-9,-10,1],[9.4,-9.5,1.05],[-49,-13,1.7],[49,-12,1.7]].forEach((p,i)=>baum(p[0],p[1],p[2],i));
  MUS.viele(sc,GEO.cyl,staemme); MUS.viele(sc,GEO.sph,kronen); MUS.viele(sc,GEO.sph,fruechte);
  const busch=[], halme=[], stiele=[], blueten=[];
  [-1,1].forEach(v=>{ [[8.4,-3.4,.65],[9.2,-2.4,.45],[8.1,-1.9,.36],[11,-.2,.55],[17,1.5,.6]].forEach((p,i)=>busch.push([v*p[0],p[2]*.6,p[1],p[2]*1.15,p[2]*.9,p[2],GRUEN[(i+(v>0?2:0))%4]])); });
  for(let i=0;i<240;i++){ const v=i%2?1:-1, x=v*(7.8+zufall()*zufall()*20), z=-1.4+zufall()*11;
    for(let j=-1;j<2;j++) halme.push([x+j*.06,.11,z,.035,.24,.035,GRUEN[(i+j+1)%4],0,0,-j*.4]);
    if(i%3===0){ const bx=x+.2, h=.2+zufall()*.14; stiele.push([bx,h/2,z,.025,h,.025,0x4f8a34]); blueten.push([bx,h,z,.11,.06,.11,[0xfff6ee,0xff8ab0,0xffd84a,0xb89cff][(i/3)%4|0]]); } }
  MUS.viele(sc,GEO.sph,busch); MUS.viele(sc,GEO.cone,halme); MUS.viele(sc,GEO.box,stiele); MUS.viele(sc,GEO.sph,blueten);

  /* ---------- Brunnen mit sprudelndem Wasser ---------- */
  const brunnen=gruppe(sc,3.5,0,1.1), becken=gruppe(brunnen,0,0,0);
  rohr(becken,1.05,1.12,.48,M2,0,.24,0,24,true);
  const rand=ring(becken,1.05,.09,M1,0,.48,0); rand.rotation.x=Math.PI/2;
  const fuss=ring(becken,1.12,.07,M3,0,.07,0); fuss.rotation.x=Math.PI/2;
  walze(becken,1.03,.06,0x58b4dc,0,.36,0);
  walze(becken,.26,.2,M3,0,.46,0); rohr(becken,.11,.18,.5,M1,0,.78,0); rohr(becken,.56,.18,.2,M1,0,1.08,0,22);
  const schale=ring(becken,.54,.045,M2,0,1.18,0); schale.rotation.x=Math.PI/2;
  walze(becken,.5,.03,0x6cc4e8,0,1.18,0); walze(becken,.08,.16,M3,0,1.26,0); ball(becken,.09,GOLD,0,1.36,0);
  verschmelze(becken);
  const wellen=[0,1,2].map(()=>{ const w=ring(brunnen,.5,.012,basis(0xdcf4ff,{transparent:true,opacity:.7,depthWrite:false}),0,.4,0); w.rotation.x=Math.PI/2; w.castShadow=false; return w; });
  const NT=100, tropfen=new THREE.InstancedMesh(GEO.sph,basis(0xd4f2ff),NT); tropfen.frustumCulled=false; brunnen.add(tropfen);

  /* ---------- Museumsleiterin: Dutt, Brille, Schlüsselbund ---------- */
  const leiterin=gruppe(sc,-3,0,1.5); leiterin.scale.setScalar(1.35);
  const HAUT=0xe8b48c, HAAR=0x8a8490, JACKE=0x2f7a7a, ROCK=0x4a3462;
  const lk=gruppe(leiterin,0,0,0), lRumpf=gruppe(lk,0,0,0);
  [-1,1].forEach(v=>{ walze(lRumpf,.075,.36,HAUT,v*.13,.22,0); ball(lRumpf,.11,0x3a2018,v*.13,.06,.05,1,.6,1.5); });
  rohr(lRumpf,.22,.39,.52,ROCK,0,.6,0); rohr(lRumpf,.21,.25,.5,JACKE,0,1.08,0); ball(lRumpf,.22,JACKE,0,1.32,0,1.15,.5,.9);
  [-1,1].forEach(v=>{ const kr=box(lRumpf,.15,.07,.04,0xfaf6ea,v*.08,1.35,.2); kr.rotation.z=v*.5; });
  [1.2,1.06,.92].forEach(y=>ball(lRumpf,.026,GOLD,0,y,.245));
  ball(lRumpf,.045,GOLD,.12,1.18,.215,1,1,.5);
  verschmelze(lRumpf);
  const lKopf=gruppe(lk,0,1.68,0), lk2=gruppe(lKopf,0,0,0);
  ball(lk2,.29,HAUT,0,0,0);
  const schopf=new THREE.Mesh(new THREE.SphereGeometry(.315,18,12,0,Math.PI*2,0,Math.PI*.5),mat(HAAR)); schopf.position.set(0,.02,-.02); schopf.rotation.x=-.42; lk2.add(schopf);
  ball(lk2,.26,HAAR,0,-.01,-.1,1.08,1,.85); ball(lk2,.15,HAAR,0,.34,-.1);
  [-1,1].forEach(v=>{ ball(lk2,.038,0x20140e,v*.1,.02,.272); ring(lk2,.085,.015,0x7a2430,v*.105,.02,.305); ball(lk2,.045,0xf09088,v*.17,-.08,.225,1,.7,.4); ball(lk2,.035,GOLD,v*.29,-.08,.02); });
  box(lk2,.05,.018,.018,0x7a2430,0,.035,.31);
  const lMund=ring(lk2,.09,.017,0x9a3830,0,-.085,.27,Math.PI); lMund.rotation.z=Math.PI;
  verschmelze(lk2);
  const lArm=v=>{ const a=gruppe(lk,v*.29,1.28,0); walze(a,.072,.46,JACKE,0,-.23,0); ball(a,.08,HAUT,0,-.5,0); verschmelze(a); return a; };
  const lArmL=lArm(-1), lArmR=lArm(1);
  /* Schlüsselbund in der rechten Hand, hängt immer nach unten und klimpert */
  const bund=gruppe(lArmR,0,-.52,.08), bundTeile=gruppe(bund,0,0,0);
  ring(bundTeile,.12,.022,GOLD,0,-.1,0);
  [-.55,0,.55].forEach((a,i)=>{ const s=gruppe(bundTeile,Math.sin(a)*.12,-.1-Math.cos(a)*.12,i*.012); s.rotation.z=a;
    const c=i===1?0xd0d8e0:GOLD; ring(s,.045,.016,c,0,-.04,0); box(s,.03,.2,.025,c,0,-.18,0); box(s,.07,.03,.025,c,.045,-.23,0); box(s,.055,.03,.025,c,.037,-.275,0); });
  verschmelze(bundTeile);
  const lSchatten=new THREE.Mesh(new THREE.CircleGeometry(.45,20),basis(0x000000,{transparent:true,opacity:.28,depthWrite:false})); lSchatten.rotation.x=-Math.PI/2; lSchatten.position.y=.03; leiterin.add(lSchatten);

  /* ---------- Spielfigur ---------- */
  const u=figur.userData, FS=1.3, VON=-4.55, BIS=2.7;
  /* Höhe des Bodens: Halle und Podest oben, an jeder Stufenkante mit weichem Übergang um eine Stufe hinab */
  const bodenHoehe=z=>[-1.9,-1.55,-1.2,-.85].reduce((h,kante)=>h-.18*weich((z-kante+.06)/.16),PH);
  figur.position.set(0,PH,VON); figur.scale.set(FS,FS,FS); sc.add(figur);

  /* ---------- Tauben: picken auf dem Platz, fliegen auf und kreisen ---------- */
  /* [x, z, Abflug in Sekunden; null: bleibt sitzen] */
  const TAUBEN=[[-.7,.4,3],[.8,.9,3.15],[-1.5,1.4,3.35],[1.5,1.9,3.5],[-.45,2.3,3.65],[.5,2.8,3.75],[-1.8,3,3.9],[1.9,.1,3.25],[-5.1,2.6,null],[5.6,3,null]];
  const tauben=TAUBEN.map((p,i)=>{ const g=gruppe(sc,p[0],0,p[1]), hell=i%3===1?0xb4bccc:0xf4f2ee, dunkel=i%3===1?0x7a849c:0xc4c6d2;
    const leib=gruppe(g,0,0,0);
    ball(leib,.15,hell,0,.19,0,.85,.85,1.35); const sz_=box(leib,.15,.035,.2,dunkel,0,.2,-.24); sz_.rotation.x=.25;
    [-1,1].forEach(v=>strich(leib,[v*.05,.12,0],[v*.05,.01,.02],.013,0xe8707a));
    verschmelze(leib);
    const kopf=gruppe(g,0,.28,.15), kt=gruppe(kopf,0,0,0);
    ball(kt,.085,hell,0,.03,.02); const schnabel=kegel(kt,.025,.08,0xf0a030,0,.02,.13); schnabel.rotation.x=Math.PI/2; [-1,1].forEach(v=>ball(kt,.016,0x181014,v*.068,.05,.055));
    verschmelze(kt);
    const flgl=[-1,1].map(v=>{ const a=gruppe(g,v*.1,.24,0); ball(a,.16,dunkel,v*.13,0,-.02,1,.16,.62); ball(a,.07,hell,v*.27,0,-.05,1.2,.2,.7); verschmelze(a); return a; });
    g.rotation.y=(i*2.3)%6.28;
    return { g, kopf, flgl, p, dreh:g.rotation.y }; });

  /* ---------- Konfetti und Funkeln ---------- */
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; t.visible=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  /* seitlich vom Weg dichter, damit die Figur frei bleibt */
  const NK=120, konfetti=menge(GEO.box,basis(0xffffff),NK), kd=[];
  for(let i=0;i<NK;i++){ const v=i%2?1:-1; kd.push({ x:v*(.6+zufall()*(i%5?3.8:6.4)), y:zufall()*5.6, z:-1.4+zufall()*3.8, v:.45+zufall()*.55, p:zufall()*6.28, g:.8+zufall()*.5 });
    konfetti.setColorAt(i,FARBE.set(BUNT[i%6])); }
  const FUNKE=new THREE.OctahedronGeometry(1,0);
  const NF=36, funkeln=menge(FUNKE,basis(0xfff2a0),NF), fd=[];
  for(let i=0;i<NF;i++) fd.push({ x:(zufall()*2-1)*4.6, y:.8+zufall()*4.4, z:-1.6+zufall()*3, p:zufall()*6.28 });

  /* ---------- Kamera ---------- */
  const NEIG=.12, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=3.05;
  /* q: 0 schmal (bis 4:3), 1 sehr breit */
  const plaetze=a=>{ const q=weich((a-1.4)/1.4); return { q, leiter:misch(-3.05,-3.9,q), brunnen:misch(3.5,4.5,q) }; };
  /* kleinster Kameraabstand, bei dem alle wichtigen Punkte im Bild sind */
  const abstand=(P,a,tn)=>{ const punkte=[
      [-GB-.55,GU+.2,-1.9],[GB+.55,GU+.2,-1.9],[0,GS+.45,-2.1],
      [0,-.05,3.9],[-1.3,3.3,BIS],[1.3,3.3,BIS],[P.leiter-1.1,0,1.9],[P.leiter-1.1,2.8,1.5],[P.brunnen+1.2,0,1.9],[P.brunnen+1.2,.6,1.1]];
    return punkte.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
      return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },9); };

  const LOS=1.9, DA=5.5;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), P=plaetze(a), d=abstand(P,a,tn);
    const wippen=Math.sin(t*.22)*.22*weich((t-6)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);
    const c=kamera.position;
    kuppel.position.copy(c);
    /* Weltpunkt zu einem Bildplatz (x,y von -1 bis 1) in der Entfernung weit */
    const ort=(bx,by,weit)=>{ const hoch=by*weit*tn; return [c.x+bx*weit*tn*a, c.y-SN*weit+CN*hoch, c.z-CN*weit-SN*hoch]; };

    /* Sonne geht rechts neben dem Museum über der Stadt auf */
    const auf=weich(t/11);
    const kante=(GB+.4)/((d-((GU-ZIELY)*SN-2*CN))*tn*a); /* rechte Giebelecke im Bild */
    const sg=.095*78*tn; /* Sonnenradius: fester Anteil der Bildhöhe */
    const sx=Math.min(.97-.095/a,Math.max(.6,kante+.14)); /* auch im schmalen Bild ganz sichtbar */
    const sp=ort(sx,misch(.28,.7,auf),78);
    sonne.position.set(sp[0],sp[1],sp[2]); sonne.scale.setScalar(sg);
    sonnenSchein.position.set(sp[0],sp[1],sp[2]+.5); sonnenSchein.scale.set(sg*6,sg*6,1);
    strahlen.position.set(sp[0],sp[1],sp[2]+.2); strahlen.scale.setScalar(sg*(.86+Math.sin(t*1.8)*.04)); strahlen.rotation.z=t*.12;
    himmelsLicht.intensity=.55+.14*auf; licht.intensity=.4+.22*auf;
    wolken.forEach((w,i)=>{ const q=ort(w.p[0]+Math.sin(t*.07+i*2)*.05,w.p[1],55); w.g.position.set(q[0],q[1],q[2]); w.g.scale.setScalar(w.p[2]*55*tn/22); });

    /* Türflügel schwingen auf, Banner wehen leicht */
    const offen=weich((t-.5)/1.7);
    tueren.forEach(f=>{ f.angel.rotation.y=f.v*1.8*offen; });
    drinnen.intensity=1.1+Math.sin(t*4)*.07;
    banner.forEach((b,i)=>{ b.rotation.x=Math.sin(t*1.4+i*1.7)*.025; });

    /* Figur tritt heraus, steigt die Stufen hinab, läuft nach vorn, winkt und jubelt */
    const lauf=Math.min(1,Math.max(0,(t-LOS)/(DA-LOS))), geht=lauf>0&&lauf<1, s=Math.sin(t*10), z=misch(VON,BIS,lauf);
    figur.position.set(0,bodenHoehe(z),z);
    figur.rotation.y=geht?0:Math.sin(t*.9)*.14*weich(t-DA);
    u.beinL.rotation.x=geht?s*.65:0; u.beinR.rotation.x=geht?-s*.65:0;
    const winkt=weich((t-DA)/.4), jubel=weich((Math.sin((t-7.6)*.9)-.2)/.5)*weich((t-7.6)/.5);
    u.armR.rotation.x=geht?s*.55:0; u.armL.rotation.x=geht?-s*.55:0;
    u.armR.rotation.z=misch(.18,2.4+Math.sin(t*7.5)*.38,winkt);
    u.armL.rotation.z=misch(-.18,-2.35+Math.sin(t*7.5+1.6)*.35,jubel);
    u.koerper.position.y=geht?Math.abs(Math.cos(t*10))*.07:Math.abs(Math.sin(t*4))*.05*winkt+Math.abs(Math.sin(t*5))*.22*jubel; u.koerper.rotation.z=Math.sin(t*2.2)*.035*winkt;

    /* Museumsleiterin: winkt mit dem äußeren Arm, hält den Schlüsselbund, schaut zur Figur */
    leiterin.position.x=P.leiter; leiterin.rotation.y=.28;
    const gruss=weich((t-2.4)/.6);
    lArmL.rotation.z=misch(-.18,-2.5+Math.sin(t*6)*.34,gruss);
    lArmR.rotation.z=.55+Math.sin(t*1.6)*.05;
    bund.rotation.z=-lArmR.rotation.z+Math.sin(t*5.5)*.16;
    lk.position.y=Math.abs(Math.sin(t*3))*.025*gruss;
    lKopf.rotation.y=.25*weich((Math.sin(t*.7-1)+.4)/.6); lKopf.rotation.z=Math.sin(t*1.3)*.07;

    /* Brunnen: Strahl in der Mitte, acht Bögen von der Schale ins Becken, Wellenringe */
    brunnen.position.x=P.brunnen;
    for(let i=0;i<NT;i++){
      if(i<28){ const f=(t*.85+i/28)%1, w=i*2.4, r=.3*f; setze(tropfen,i,Math.cos(w)*r,1.38+3.2*f*(1-f)-.2*f*f,Math.sin(w)*r,.05,.075,.05); }
      else { const j=i-28, w=(j%8)*Math.PI/4+.2, f=(t*.95+Math.floor(j/8)/9+(j%8)*.037)%1, r=.52+.38*f; setze(tropfen,i,Math.cos(w)*r,1.18+.8*f-1.6*f*f,Math.sin(w)*r,.042,.062,.042); }
    }
    tropfen.instanceMatrix.needsUpdate=true;
    wellen.forEach((w,i)=>{ const f=(t*.5+i/3)%1; w.scale.setScalar(.9+f*1.05); w.material.opacity=.7*(1-f); });

    /* Tauben: picken, auffliegen, im Kreis über dem Platz flattern */
    const weite=Math.min(5.4,.78*d*tn*a);
    tauben.forEach((v,i)=>{ const [x,pz,ab]=v.p, flug=ab===null?0:weich((t-ab)/2.6);
      if(ab===null||t<=ab){ v.g.position.set(x,Math.max(0,Math.sin(t*3+i*2))*.015,pz); v.g.rotation.set(0,v.dreh+Math.sin(t*.8+i)*.35,0,'YXZ');
        v.kopf.rotation.x=Math.pow(Math.max(0,Math.sin(t*3.4+i*1.7)),3)*1.05; v.flgl.forEach((f,j)=>{ f.rotation.z=(j?-1:1)*.12; }); return; }
      const bahn=tt=>{ const e=weich((tt-ab)/2.6), w=i*.9+tt*.55, ox=Math.cos(w)*weite*(.78+(i%3)*.11), oy=6.1+(i%3)*.4+Math.sin(w*2+i)*.35, oz=-.2+Math.sin(w)*1.4;
        return [misch(x,ox,e),misch(0,oy,Math.min(1,e*1.25))+Math.sin(e*Math.PI)*.5,misch(pz,oz,e)]; };
      const p=bahn(t), n=bahn(t+.08);
      v.g.position.set(p[0],p[1],p[2]); v.g.rotation.set(-.3*(1-flug),Math.atan2(n[0]-p[0],n[2]-p[2]),0,'YXZ');
      v.kopf.rotation.x=0; v.flgl.forEach((f,j)=>{ f.rotation.z=(j?1:-1)*Math.sin(t*(15-5*flug)+i*1.9)*.85; }); });

    /* Konfetti flattert aus der Tür auf und sinkt wirbelnd, dazu Funkeln */
    konfetti.visible=funkeln.visible=t>1.4;
    if(konfetti.visible){
      const los=weich((t-1.4)/2.2);
      kd.forEach((f,i)=>{ const y=.1+((f.y-t*f.v)%5.6+5.6)%5.6, g=f.g*weich((t-1.4)/.5)*weich((5.7-y)/.6)*weich(y/.25);
        setze(konfetti,i,f.x*los+Math.sin(t*1.6+f.p)*.28,misch(PH+1.8,y,los),misch(-3.2,f.z,los),.11*g,.15*g,.012*g,t*2.6+f.p,t*1.7+f.p*2,Math.sin(t*2+f.p)); });
      konfetti.instanceMatrix.needsUpdate=true;
      fd.forEach((f,i)=>{ const g=.012+.06*Math.pow(Math.max(0,Math.sin(t*2.6+f.p)),4)*los;
        setze(funkeln,i,f.x+Math.sin(t*.5+f.p)*.2,f.y+Math.sin(t*.8+f.p*2)*.25,f.z,g,g*1.5,g,0,t+f.p,0); });
      funkeln.instanceMatrix.needsUpdate=true; }
  };
};

