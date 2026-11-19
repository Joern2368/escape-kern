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
function gitter(x0,x1){let d='';for(let x=x0;x<=x1;x+=28)d+=`M${x} 70V470`;return`${R(x0-10,60,x1-x0+20,14,'#3a4046')}${P(d,0,'#2a3036',8)}${P(`M${x0} 180H${x1}M${x0} 340H${x1}`,0,'#3a4046',10)}`;}
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
const krone=()=>`${S(42)}${sockel(60,70,'#4a4f58','#1e2228')}${P('M-36 -82Q-40 -100 -20 -98H20Q40 -100 36 -82Z','#a32a4a','#5a1020',2)}${P('M-24 -98V-134L-12 -116L0 -140L12 -116L24 -134V-98Z','#e8c03a','#8a6420',2)}${C(0,-108,5,'#2a6aa0')}${C(-14,-106,4,'#c83a2a')}${C(14,-106,4,'#3f8a4a')}${C(0,-142,4,'#f0d060')}`;
const truhe=()=>`${S(72)}${P('M-60 -62L-56 -116Q0 -138 56 -116L60 -62Z','#6b3a1c','#3a2010',3)}${P('M-56 -62L-40 -80L-20 -72L0 -86L20 -74L44 -82L56 -62Z','#e8c03a','#8a6420',2)}${C(-30,-78,5,'#f0d060')}${C(22,-80,5,'#f0d060')}${C(-4,-90,4,'#c83a2a')}${R(-64,-64,128,62,'#7a4a24','#3a2010',3)}${P('M-40 -2V-64M40 -2V-64',0,'#b8862a',6)}${R(-10,-48,20,18,'#d8a73a','#6b4a1c',2)}`;
const barren=(x,y)=>P(`M${x-24} ${y}L${x-18} ${y-16}H${x+18}L${x+24} ${y}Z`,'#e8c03a','#8a6420',2);
const goldbarren=()=>`${S(60)}${R(-60,-12,120,10,'#5a3418')}${[-48,0,48].map(x=>barren(x,-12)).join('')}${[-24,24].map(x=>barren(x,-28)).join('')}${barren(0,-44)}${P('M-10 -40H6',0,'#fff6c0',3)}`;
const edelstein=()=>`${S(40)}${sockel(56,70,'#4a4f58','#1e2228')}${P('M-20 -112L-10 -124H10L20 -112L0 -86Z','#3ab0c8','#1a5a6a',2)}${P('M-20 -112H20M-10 -124L-4 -112L0 -86M10 -124L4 -112',0,'#1a5a6a',1.5)}${P('M-30 -82V-138Q-30 -166 0 -166Q30 -166 30 -138V-82Z','#cfe8ef','#8aa8b0',3)}`.split('#cfe8ef').join('rgba(207,232,239,.35)');
const muenzen=()=>`${R(-82,-58,164,116,'#2a2e36','#9aa2aa',5)}${R(-72,-48,144,96,'#3a2a3a')}${[0,1,2].map(r=>[0,1,2,3,4].map(c=>`${C(-56+c*28,-28+r*28,10,(r+c)%3?'#e8c03a':'#c9ccce','#6a5a3a',2)}${C(-56+c*28,-28+r*28,5,'none','#8a6420',1)}`).join('')).join('')}${P('M-70 40L-30 -46',0,'#fff',4)}`;
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
const liste=()=>`${R(-56,-70,112,140,'#c9ccce','#4a5258',4,4)}${[[-46,-60],[46,-60],[-46,60],[46,60]].map(([x,y])=>C(x,y,3,'#4a5258')).join('')}<use href="#sym-muenze" x="-16" y="-60" width="32" height="32" color="#8a6420"/>${P('M-40 -14H40M-40 0H34M-40 14H40M-40 28H30M-40 42H40',0,'#4a5258',3)}`;
const tresor=()=>`${S(50)}${R(-40,-8,14,8,'#22282e')}${R(26,-8,14,8,'#22282e')}${R(-46,-106,92,100,'#6a747c','#22282e',4,6)}${R(-36,-96,72,80,'#7a848c','#22282e',2,4)}${C(0,-56,18,'#a8b0b8','#22282e',3)}${P('M0 -56L10 -66M-26 -56H-18M18 -56H26',0,'#22282e',3)}`;
const kontrolle=()=>`${S(60)}${R(-56,-60,112,58,'#3a4046','#16191c',3)}${P('M-60 -60L-50 -76H50L60 -60Z','#5a646c','#16191c',2)}${[[-40,'#c83a2a'],[-26,'#3f8a4a'],[-12,'#e8b830']].map(([x,f])=>C(x,-68,4,f)).join('')}${R(-2,-128,58,46,'#22282e','#111',3,4)}${R(4,-122,46,32,'#3ab0c8')}${P('M27 -82V-76',0,'#111',5)}`;
const B=(name,x,boden,by,zeichne,fund)=>({name,x,boden,fuss:4,by,zeichne,fund});
const W=(name,x,y,by,zeichne,fund)=>({name,x,y,wand:true,by,zeichne,fund});
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500;
let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="330" r="8" fill="#14201c" stroke="#d8a73a" stroke-width="2"/>`;
const off='M410 470V182H590V470Z';
return`<defs><clipPath id="tuerclip"><path d="${off}"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#26403a"/><stop offset=".5" stop-color="#3f645a"/><stop offset="1" stop-color="#22382f"/></linearGradient></defs>
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Tür mit Zahlenschloss">
   <path d="M380 470V152H620V470Z" fill="#d8d0c0" stroke="#5a5248" stroke-width="5"/><path d="M364 154L500 96L636 154Z" fill="#ece6da" stroke="#5a5248" stroke-width="5"/>
   <path d="${off}" fill="#0a0806"/>
   <g clip-path="url(#tuerclip)"><g id="platte"><path d="${off}" fill="url(#platteG)"/><path d="M500 182V470" stroke="#14201c" stroke-width="4"/><rect x="424" y="376" width="62" height="80" rx="4" fill="none" stroke="#b8862a" stroke-width="3"/><rect x="514" y="376" width="62" height="80" rx="4" fill="none" stroke="#b8862a" stroke-width="3"/><circle cx="500" cy="248" r="34" fill="#22382f" stroke="#d8a73a" stroke-width="3"/><use href="#sym-rahmen" x="474" y="222" width="52" height="52" color="#d8a73a"/><rect x="${500-n*11-12}" y="312" width="${n*22+24}" height="36" rx="6" fill="#14201c" stroke="#d8a73a" stroke-width="2"/>${d}</g></g>
   <circle cx="500" cy="134" r="8" fill="#d8a73a" stroke="#6b4a1c" stroke-width="2"/>
  </g></g>`;
}
SZENARIEN.museum={
name:"Das Museum",
symbole:["knochen","pinsel","rahmen","muenze","lupe"],
symbolNamen:["Knochen","Pinsel","Bilderrahmen","Münze","Lupe"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M8 30L60 6L112 30Z" fill="#ece6da" stroke="#5a5248" stroke-width="3"/><rect x="12" y="30" width="96" height="8" fill="#d8d0c0" stroke="#5a5248" stroke-width="2"/>${[22,42,70,90].map(x=>`<rect x="${x}" y="38" width="8" height="38" fill="#ece6da" stroke="#5a5248" stroke-width="2"/>`).join('')}<rect x="6" y="76" width="108" height="8" fill="#d8d0c0" stroke="#5a5248" stroke-width="2"/><use href="#sym-knochen" x="46" y="42" width="28" height="28" color="#a33b22"/></svg>`,
texte:{
einleitung:"Ihr besucht das große Museum der Stadt – mit Dinosauriern, Gemälden und echten Schätzen. Ihr schaut euch so lange um, dass ihr die Durchsage überhört: Das Museum schließt! Alle Türen sind verriegelt. Doch die Museumsleiterin hat ein Rätselspiel für euch versteckt: Jede Tür hat ein Zahlenschloss. Untersucht die Ausstellungsstücke. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findet ihr den Weg hinaus?",
startKnopf:"Das Museum betreten",
hinweisGeber:"Der Museumswächter flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Der Museumswächter schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss des Museums",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Nacht ist vorbei!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Museum gefunden. Die Museumsleiterin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du besuchst das große Museum der Stadt – mit Dinosauriern, Gemälden und echten Schätzen. Du schaust dich so lange um, dass du die Durchsage überhörst: Das Museum schließt! Alle Türen sind verriegelt. Doch die Museumsleiterin hat ein Rätselspiel für dich versteckt: Jede Tür hat ein Zahlenschloss. Untersuche die Ausstellungsstücke. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findest du den Weg hinaus?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Der Museumswächter schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Museum gefunden. Die Museumsleiterin ist stolz auf dich!"
},
einfach:{
name:"Das Museum",
symbolNamen:["Knochen","Pinsel","Rahmen","Münze","Lupe"],
texte:{
einleitung:"Ihr seid in einem großen Museum. Dort gibt es Dinosaurier, Bilder und Schätze. Plötzlich macht das Museum zu! Die Türen sind verschlossen. An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
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
einleitung:"Du bist in einem großen Museum. Dort gibt es Dinosaurier, Bilder und Schätze. Plötzlich macht das Museum zu! Die Türen sind verschlossen. An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Die Eingangshalle",intro:"Ihr seid in der großen Halle. Hier gibt es hohe Säulen und eine breite Treppe. Sucht die Zahlen für das erste Schloss!",introDu:"Du bist in der großen Halle. Hier gibt es hohe Säulen und eine breite Treppe. Suche die Zahlen für das erste Schloss!",
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
{titel:"Die Schatzkammer",intro:"Hier liegen die Schätze vom Museum. Die Wände sind aus Stahl. Öffnet das letzte Schloss!",introDu:"Hier liegen die Schätze vom Museum. Die Wände sind aus Stahl. Öffne das letzte Schloss!",
objekte:[{name:"Krone",fund:"Unter der Krone liegt:"},{name:"Schatzkiste",fund:"Die Kiste geht auf! Darin liegt:"},{name:"Gold",fund:"Auf dem Gold steht:"},{name:"Großer Edelstein",fund:"Im Stein glitzert ein Zeichen:"},{name:"Münzen",fund:"Zwischen den Münzen liegt:"}],
infoObjekte:[{name:"Liste mit allen Schätzen",fund:"Hinter der Liste klebt:"},{name:"Schrank aus Stahl",fund:"Im Schrank liegt:"},{name:"Tisch mit Bildschirm",fund:"Neben dem Bildschirm liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Eingangshalle",
intro:"Ihr steht in der hohen Eingangshalle. Marmorsäulen tragen die Decke, eine breite Treppe führt nach oben. An der Kasse sitzt niemand mehr. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
introDu:"Du stehst in der hohen Eingangshalle. Marmorsäulen tragen die Decke, eine breite Treppe führt nach oben. An der Kasse sitzt niemand mehr. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
tuerX:800,
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
intro:"Im Dinosaurier-Saal ist es dämmrig. Das riesige Skelett eines Tyrannosaurus ragt über euch auf. Fossilien und Funde aus der Urzeit warten darauf, untersucht zu werden. Findet die Ziffern für das nächste Schloss!",
introDu:"Im Dinosaurier-Saal ist es dämmrig. Das riesige Skelett eines Tyrannosaurus ragt über dir auf. Fossilien und Funde aus der Urzeit warten darauf, untersucht zu werden. Finde die Ziffern für das nächste Schloss!",
tuerX:1350,
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
intro:"Rote Wände, goldene Rahmen und helle Scheinwerfer: In der Gemäldegalerie hängen berühmte Bilder. Eine Ritterrüstung bewacht den Saal. Schaut genau hin – Kunst steckt voller Geheimnisse!",
introDu:"Rote Wände, goldene Rahmen und helle Scheinwerfer: In der Gemäldegalerie hängen berühmte Bilder. Eine Ritterrüstung bewacht den Saal. Schau genau hin – Kunst steckt voller Geheimnisse!",
tuerX:220,
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
intro:"In der Restaurierungswerkstatt werden alte Kunstwerke und Fundstücke vorsichtig repariert. Auf den Arbeitstischen liegen Pinsel, Farben und Lupen. Die Lampen brennen noch – die Restauratorin ist wohl gerade erst gegangen.",
tuerX:500,
hintergrund:()=>`${defs('#c0c0b8','#6a6a64','#ffffff')}<rect width="1600" height="470" fill="#eef0ea"/>${R(0,370,1600,100,'#d8dcd4')}${steine(370,470,25,50,'rgba(0,0,0,.08)')}${decke('#a8aca4')}${[170,1200].map(x=>`${C(x,260,220,'url(#licht)')}${R(x-80,110,160,220,'#bfe0f0','#7a8a8a',8)}${P(`M${x} 110V330M${x-80} 220H${x+80}`,0,'#7a8a8a',5)}`).join('')}${R(650,170,130,8,'#8a5a2a')}${[0,1,2,3].map(k=>R(662+k*30,136,20,34,['#c83a2a','#e8b830','#2a6aa0','#3f8a4a'][k],'#555',1,3)).join('')}${boden('rgba(0,0,0,.12)')}${lampe(820,120,'#f4f4f0')}${lampe(1300,120,'#f4f4f0')}`,
objekte:[
B("Staffelei mit Bild",230,620,-220,staffelei,"Hinter der Leinwand klemmt:"),
B("Arbeitstisch mit Lupe",820,600,-190,werktisch,"Unter der großen Lupe liegt:"),
B("Farbpalette",700,730,-125,palette,"Zwischen den Farbklecksen steht:"),
B("Farbeimer",1420,620,-130,farbeimer,"Am Boden eines Eimers klebt:"),
W("Pinnwand mit Skizzen",900,240,-82,pinnwand,"Zwischen den Skizzen hängt:")
],
infoObjekte:[W("Arbeitsanleitung",1450,240,-92,anleitung,"Unter der Anleitung klemmt:"),B("Fachbuch-Regal",1150,730,-172,regal,"Zwischen den Fachbüchern steckt:"),B("Kiste mit Fundstücken",1000,560,-115,fundkiste,"Im Stroh der Kiste liegt:")]},
{titel:"Der Tresorraum",
intro:"Hinter dicken Stahlwänden liegt der Tresorraum. In den Vitrinen funkeln Kronen, Münzen und Edelsteine. Hier wartet das letzte Schloss – öffnet es, und ihr seid frei!",
introDu:"Hinter dicken Stahlwänden liegt der Tresorraum. In den Vitrinen funkeln Kronen, Münzen und Edelsteine. Hier wartet das letzte Schloss – öffne es, und du bist frei!",
tuerX:1150,
hintergrund:()=>`${defs('#4a5258','#16191c','#d0e8ff')}<rect width="1600" height="470" fill="#5a646c"/>${steine(40,470,108,200,'rgba(0,0,0,.28)')}${[...Array(16)].map((_,k)=>C(20+k*100,58,4,'#8a949c')).join('')}${decke('#22282e')}${gitter(70,220)}${gitter(1330,1570)}${C(560,300,360,'url(#licht)')}${boden('rgba(150,170,190,.18)')}${lampe(560,110,'#8a949c')}${lampe(900,100,'#8a949c')}`,
objekte:[
B("Königskrone",300,590,-165,krone,"Unter der Krone liegt:"),
B("Schatztruhe",700,700,-130,truhe,"Die Truhe springt auf! Darin liegt:"),
B("Goldbarren",1450,620,-80,goldbarren,"In einen Goldbarren ist eingeprägt:"),
B("Riesiger Edelstein",880,560,-190,edelstein,"Im Edelstein funkelt ein Zeichen:"),
W("Münzsammlung",400,240,-82,muenzen,"Zwischen den Münzen liegt:")
],
infoObjekte:[W("Bestandsliste",750,240,-92,liste,"Hinter der Bestandsliste klebt:"),B("Stahltresor",580,550,-128,tresor,"Im Stahltresor liegt:"),B("Kontrollpult",120,730,-150,kontrolle,"Neben dem Bildschirm liegt:")]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec8f0"/><stop offset=".6" stop-color="#ffd8a8"/><stop offset="1" stop-color="#ffeccc"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/><circle cx="640" cy="300" r="110" fill="#fff2c0" opacity=".45"/><circle cx="640" cy="300" r="60" fill="#fff6d0"/>
   ${[[230,250,90],[330,290,70],[410,230,80],[560,270,110],[680,240,70],[760,280,90]].map(([x,y,w],k)=>`<rect x="${x}" y="${y}" width="${w}" height="${420-y}" fill="${k%2?'#b8a8c8':'#a898b8'}"/>${[0,1,2].map(r=>`<rect x="${x+12}" y="${y+16+r*40}" width="${w-24}" height="14" fill="#ffe8b0" opacity=".55"/>`).join('')}`).join('')}<path d="M400 230L450 196L500 230Z" fill="#a898b8"/>
   <rect y="400" width="1000" height="200" fill="#d8c8b0"/><path d="M0 430H1000M0 470H1000M100 400L60 600M300 400L280 600M500 400V600M700 400L720 600M900 400L940 600" stroke="#c0ae94" stroke-width="3"/>
   <ellipse cx="500" cy="440" rx="70" ry="16" fill="#9ab8c8" stroke="#8a8270" stroke-width="5"/><path d="M500 440V404" stroke="#cfe8ef" stroke-width="6"/><circle cx="500" cy="400" r="9" fill="#cfe8ef"/>
   ${[[320,430],[700,440]].map(([x,y])=>`<rect x="${x-5}" y="${y-50}" width="10" height="50" fill="#6b4a24"/><circle cx="${x}" cy="${y-70}" r="30" fill="#4f9a5a"/>`).join('')}
   <path d="M290 150l10 6 10-6M330 130l8 5 8-5M800 120l9 5 9-5" stroke="#3a2a17" stroke-width="2.5" fill="none"/>
   <rect y="510" width="1000" height="30" fill="#e8e2d6"/><rect y="540" width="1000" height="30" fill="#d8d0c0"/><rect y="570" width="1000" height="30" fill="#c9c0ae"/>
   <path d="M0 0H1000V600H0Z M200 600V130H800V600Z" fill="#2a2420" fill-rule="evenodd"/><path d="M200 600V130H800V600" stroke="#cfc6b4" stroke-width="18" fill="none"/><path d="M180 112L500 40L820 112Z" fill="#3a322c" stroke="#cfc6b4" stroke-width="8"/>`
};
})();