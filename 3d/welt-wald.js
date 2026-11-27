document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-pilz\" viewBox=\"-20 -20 40 40\"><path d=\"M-17 3Q-17 -16 0 -16Q17 -16 17 3Z\" fill=\"currentColor\"/><path d=\"M-6 6H6L7 18H-7Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-eichel\" viewBox=\"-20 -20 40 40\"><path d=\"M-9 -2H9Q9 14 0 19Q-9 14 -9 -2Z\" fill=\"currentColor\"/><path d=\"M-13 -5Q-13 -15 0 -15Q13 -15 13 -5Z\" fill=\"currentColor\"/><path d=\"M0 -15V-20\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-blatt\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -18L4 -8L12 -12L9 -2L17 0L8 6L10 14L1 10V18H-1V10L-10 14L-8 6L-17 0L-9 -2L-12 -12L-4 -8Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-zapfen\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M0 -18Q-12 -10 -12 4Q-10 14 0 18Q10 14 12 4Q12 -10 0 -18Z\"/><path d=\"M-10 -2L0 6L10 -2M-11 6L0 13L11 6M-6 -10L0 -4L6 -10\"/></g></symbol>\n<symbol id=\"sym-feder\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-10 18Q-16 -4 -2 -14Q6 -20 12 -16Q16 -4 6 6Q0 14 -10 18Z\"/><path d=\"M-12 18L8 -12\"/><path d=\"M-6 8L-10 2M-1 3L-5 -4M3 -2L0 -9\"/></g></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const st=(s,k)=>s?` stroke="${s}" stroke-width="${k}"`:'';
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${st(s,k)}/>`;
const C=(x,y,r,f,s,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${st(s,k)}/>`;
const E=(x,y,a,b,f,s,k)=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${f}"${st(s,k)}/>`;
const P=(d,f,s,k)=>`<path d="${d}" fill="${f}"${st(s,k)}/>`;
const L=(d,s,k)=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${k}" stroke-linecap="round"/>`;
const U=(id,x,y,w,c)=>`<use href="#sym-${id}" x="${x}" y="${y}" width="${w}" height="${w}" color="${c}"/>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.3)');
const auge=(x,y)=>C(x,y,4,'#fff')+C(x,y,2.2,'#222');
const ei=(x,y,k)=>E(x,y,5*k,7*k,'#b8843a','#6a4a22',1.5)+P(`M${x-6*k} ${y-3*k}Q${x} ${y-12*k} ${x+6*k} ${y-3*k}Z`,'#6a4a22');
const pil=(x,h,w,c)=>R(x-w/5,-h,w*.4,h,'#f4ecd8','#a89878',2)+P(`M${x-w} ${-h+6}Q${x-w} ${-h-w*.9} ${x} ${-h-w*.9}Q${x+w} ${-h-w*.9} ${x+w} ${-h+6}Z`,c,'#5a2a1a',2)+C(x-w*.4,-h-w*.4,w*.13,'#fff')+C(x+w*.3,-h-w*.55,w*.1,'#fff');
const lg=(x,y)=>C(x,y,17,'#c8a060','#5a3a1c',3)+C(x,y,10,'none','#a07a40',2)+C(x,y,4,'none','#a07a40',2);
const tanne=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})">${R(-8,-20,16,30,'#5a3a1c')}${P('M-62 -10L0 -110L62 -10Z',c,'rgba(0,0,0,.2)',2)}${P('M-48 -60L0 -150L48 -60Z',c,'rgba(0,0,0,.2)',2)}${P('M-34 -110L0 -190L34 -110Z',c,'rgba(0,0,0,.2)',2)}</g>`;
const stamm=(x,w,f)=>R(x-w/2,0,w,470,f,'#3a2410',3)+L(`M${x-w*.2} 0V470M${x+w*.15} 0V470`,'rgba(0,0,0,.25)',3);
const krone=(x,y,r,f)=>C(x,y,r,f)+C(x-r*.7,y+r*.4,r*.7,f)+C(x+r*.7,y+r*.3,r*.75,f);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ab8e8"/><stop offset="1" stop-color="#f8f0d0"/></linearGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==1){for(let x=20;x<1600;x+=90)for(const y of[510,580,660,740])d+=`M${x+(y%7)*9} ${y}l6 -16l4 14l6 -12l2 14`;return g+L(d,'rgba(40,80,20,.6)',3);}
if(m==2){for(let x=30;x<1600;x+=110)for(const y of[500,560,630,700,760])d+=`M${x+(y%5)*13} ${y}h8`;return g+L(d,'rgba(0,0,0,.28)',6);}
for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return g+L(d,'rgba(0,0,0,.18)',2);}
const wegweiser=()=>`${R(-76,-38,152,76,'#c8a060','#6a4a20',4)}${L('M-76 -12H76M-76 12H76','#a08040',2)}${[[-62,-24],[62,-24],[-62,24],[62,24]].map(([x,y])=>C(x,y,3,'#555')).join('')}${L('M-12 -16Q-12 -28 0 -28Q12 -28 12 -16Q12 -8 0 -2V6','#6a4a20',7)}${C(0,20,4,'#6a4a20')}`;
const pilzgruppe=()=>`${sch(70)}${E(0,0,70,8,'#4a7a2a')}${pil(-40,40,26,'#e74c3c')}${pil(14,62,34,'#c0392b')}${pil(54,30,20,'#e08a3a')}`;
const stumpf=()=>`${sch(64)}${P('M-56 -64H56L64 0H-64Z','#7a5230','#3a2410',3)}${L('M-30 -60V-4M0 -62V-2M30 -60V-4','#5a3a1c',3)}${E(0,-64,56,18,'#d8b070','#3a2410',3)}${E(0,-64,40,12,'none','#a07a40',2)}${E(0,-64,24,7,'none','#a07a40',2)}${E(0,-64,9,3,'none','#a07a40',2)}${E(-52,-6,18,7,'#4f9a4a')}`;
const moosstein=()=>`${sch(70)}${P('M-70 0Q-74 -50 -30 -70Q10 -86 50 -64Q80 -40 72 0Z','#8a8f94','#4a5258',3)}${P('M-62 -30Q-40 -62 -10 -64Q10 -76 30 -58Q0 -56 -20 -40Q-40 -30 -62 -30Z','#5a9a3a')}${P('M30 -50Q60 -40 62 -20Q44 -30 30 -50Z','#5a9a3a')}${C(-30,-76,3,'#fff')}${C(-22,-82,3,'#fff')}${L('M-34 -70V-76M-26 -76V-82','#4f9a4a',2)}`;
const brombeere=()=>`${sch(70)}${L('M-60 -20Q-70 -60 -50 -90M50 -20Q70 -60 52 -86','#5a3a1c',4)}${E(0,-50,72,48,'#2f7a34','#1f5a24',3)}${E(-34,-70,34,26,'#3f9a44')}${E(34,-64,34,26,'#3f9a44')}${[[-36,-50],[-10,-72],[16,-40],[40,-62],[0,-44],[-50,-74]].map(([x,y],k)=>C(x,y,8,k%3?'#4a1a5a':'#c0392b','#2a0a3a',1.5)).join('')}`;
const vogelhaus=()=>`${R(-34,-24,68,56,'#c8903a','#5a3a1c',3)}${C(0,0,13,'#2a1a08')}${R(-10,30,20,6,'#8a6a3a')}${P('M-46 -22L0 -62L46 -22Z','#a0392b','#5a1a10',3)}${L('M0 -62V-72','#555',3)}${C(0,-74,4,'#555')}`;
const spurschild=()=>`${sch(30)}${R(-5,-130,10,130,'#7a5230')}${R(-70,-210,140,86,'#f6e8c0','#7a5230',4)}${[[-44,-170],[-14,-150],[16,-170],[46,-150]].map(([x,y])=>E(x-4,y,4,8,'#6a4a2a')+E(x+4,y,4,8,'#6a4a2a')).join('')}${L('M-50 -194l10 6l10 -6M20 -194l10 6l10 -6','#6a4a2a',2)}`;
const bank=()=>`${sch(66)}${R(-60,-36,120,12,'#a0703e','#5a3a1c',3)}${R(-60,-60,120,10,'#a0703e','#5a3a1c',3)}${R(-60,-78,120,10,'#a0703e','#5a3a1c',3)}${R(-52,-24,10,24,'#7a5230')}${R(42,-24,10,24,'#7a5230')}${[[-24,-104,'#e67e22'],[26,-116,'#8e44ad'],[0,-136,'#2e86c1']].map(([x,y,c])=>P(`M${x} ${y}l-14 -10v20zM${x} ${y}l14 -10v20z`,c)+L(`M${x} ${y-6}V${y+6}`,'#222',2)).join('')}`;
const vorrat=()=>`${sch(60)}${P('M-54 0V-80Q-54 -122 0 -122Q54 -122 54 -80V0Z','#2a1808','#6a4a28',6)}${R(-46,-70,92,7,'#8a6a3a')}${ei(-28,-80,1.2)}${ei(0,-80,1.2)}${ei(26,-80,1.2)}${R(-46,-26,92,7,'#8a6a3a')}${[-30,-10,10,30].map(x=>C(x,-34,8,'#c8903a')).join('')}${P('M-40 0Q-20 -14 0 -8Q20 -14 40 0Z','#c8903a')}`;
const schlafnest=()=>`${sch(76)}${E(0,-18,76,28,'#c8a050','#7a5a20',3)}${E(0,-26,56,16,'#e8d090')}${P('M-40 -30Q-30 -66 6 -62Q40 -60 44 -30Q10 -22 -40 -30Z','#e67e22','#a0501a',3)}${P('M44 -34Q70 -50 60 -20Q40 -10 20 -28Z','#e67e22','#a0501a',3)}${P('M54 -26Q64 -30 62 -20Z','#fff')}${P('M-30 -56L-26 -78L-12 -60Z','#e67e22')}${P('M-10 -64L0 -82L8 -62Z','#e67e22')}${L('M-26 -44Q-20 -40 -14 -44','#4a2a10',2)}${L('M-10 -92h12l-12 10h12M10 -104h10l-10 8h10','#fff',2)}`;
const wurzelregal=()=>`${L('M-70 -34V30M70 -34V30','#7a5230',10)}${R(-84,-14,168,10,'#8a6238','#3a2410',3)}${R(-84,34,168,10,'#8a6238','#3a2410',3)}${[[-60,'#c0392b'],[-14,'#8e44ad'],[34,'#e8b02a']].map(([x,c])=>R(x-16,-52,32,38,'#dfe8e4','#7a8a96',2)+R(x-16,-52,32,8,'#8a5a2a')+C(x,-30,9,c)).join('')}${[-50,10,50].map(x=>ei(x,30,1.1)).join('')}${L('M-84 44Q-96 60 -90 76M84 44Q96 60 90 76','#7a5230',5)}`;
const eichelhaufen=()=>`${sch(60)}${P('M-60 0Q-50 -34 -20 -38Q0 -50 24 -38Q54 -34 60 0Z','#a8782e','#6a4a22',3)}${[[-34,-14],[-8,-24],[20,-14],[34,-30],[-20,-38],[8,-44],[-48,-6]].map(([x,y])=>ei(x,y,1.5)).join('')}`;
const schale=()=>`${sch(52)}${P('M-50 -34Q-46 0 0 0Q46 0 50 -34Z','#7a8088','#4a5058',3)}${E(0,-34,50,12,'#5dade2','#3a7aa0',2)}${E(-12,-35,18,4,'rgba(255,255,255,.6)')}${P('M12 -30Q26 -50 38 -36Q28 -26 12 -30Z','#4f9a4a')}${L('M-4 -80V-70','#7aa0c0',3)}${C(-4,-62,4,'#bfe8ff')}`;
const erdkarte=()=>`${R(-76,-56,152,112,'#e8d4a0','#7a5a2a',4)}${L('M-56 -30Q-20 -40 0 -20T56 -34M-40 -10Q-10 10 -30 30M0 -20Q20 10 50 20M-30 30Q10 40 40 44','#7a4a22',5)}${[[-56,-30],[0,-20],[56,-34],[-30,30],[50,20]].map(([x,y])=>C(x,y,9,'#c89a5a','#7a4a22',3)).join('')}${P('M-30 22L-26 30L-18 30L-24 36L-22 44L-30 39L-38 44L-36 36L-42 30L-34 30Z','#e74c3c')}${[[-70,-50],[70,-50],[-70,50],[70,50]].map(([x,y])=>C(x,y,3,'#555')).join('')}`;
const kaeferglas=()=>`${sch(32)}${R(-30,-66,60,66,'rgba(200,232,240,.45)','#6a8a96',3)}${R(-34,-76,68,12,'#8a6a3a','#3a2410',2)}${L('M-20 -2Q0 -30 20 -4','#7a5230',3)}${[[-14,-12],[12,-20],[-2,-36]].map(([x,y],k)=>E(x,y,10,7,['#2a3a1a','#c0392b','#3a6a9a'][k])+L(`M${x-8} ${y-6}l-6 -8M${x+8} ${y-6}l6 -8`,'#222',1.5)).join('')}`;
const maulwurf=()=>`${sch(60)}${P('M-60 0Q-50 -44 0 -48Q50 -44 60 0Z','#5a3a24','#3a2410',3)}${C(-14,-52,18,'#3a3a44')}${E(-14,-42,6,5,'#f0a0a0')}${C(-22,-58,2,'#fff')}${C(-6,-58,2,'#fff')}${E(-34,-44,8,5,'#f0b0a0')}${E(6,-44,8,5,'#f0b0a0')}${L('M24 -4Q32 -28 44 -16T58 -4','#e89a9a',6)}`;
const fischtafel=()=>`${R(-6,-60,12,300,'#7a5230')}${R(-76,-60,152,110,'#e8f4f8','#2a5a7a',5)}${R(-76,-60,152,20,'#2a5a7a')}${[[-34,-6,'#e67e22'],[30,-6,'#2e86c1'],[-34,30,'#8a969e'],[30,30,'#2ecc71']].map(([x,y,c])=>E(x,y,22,10,c)+P(`M${x+20} ${y}l14 -9v18z`,c)+C(x-12,y-2,2,'#222')).join('')}`;
const libelle=()=>`${sch(60)}${[[-30,150],[-6,176],[18,160],[42,140]].map(([x,h],k)=>L(`M${x} 0Q${x+(k%2?10:-10)} -${h/2} ${x+(k%2?6:-6)} -${h}`,'#6a8a3a',4)).join('')}${E(-24,-164,6,18,'#7a4a22')}${E(36,-134,6,18,'#7a4a22')}${L('M-4 -182h46','#2e86c1',5)}${E(10,-192,16,5,'rgba(255,255,255,.7)','#8ac8e8',1.5)}${E(28,-192,16,5,'rgba(255,255,255,.7)','#8ac8e8',1.5)}${C(46,-182,5,'#1a6aa0')}`;
const rutsche=()=>`${sch(80)}${P('M-70 -110L-30 -110L50 -20Q70 -6 80 0H-70Z','#8a6a3a','#4a3018',3)}${P('M-50 -110L-20 -110L56 -22Q40 -30 -50 -104Z','#a0824a')}${E(70,-4,34,6,'#5dade2')}${L('M-66 -122Q-90 -116 -92 -100','#6a4a2a',8)}${E(-34,-126,34,16,'#6a4a2a','#3a2410',2)}${C(-4,-140,14,'#7a5a3a','#3a2410',2)}${C(6,-138,4,'#222')}${C(-2,-146,2,'#222')}${L('M8 -134L22 -136M8 -132L22 -128','#fff',1.5)}${E(-12,-120,6,4,'#5a3a1c')}${C(86,-14,3,'#bfe8ff')}${C(94,-24,2.5,'#bfe8ff')}`;
const frosch=()=>`${E(0,-2,60,12,'#5dade2','#3a7aa0',2)}${E(0,-14,44,12,'#4f9a4a','#2a6a2a',2)}${P('M0 -14L44 -22L40 -8Z','#5dade2')}${E(0,-44,22,18,'#5cc04a','#2a7a1a',2)}${C(-12,-62,9,'#5cc04a','#2a7a1a',2)}${C(12,-62,9,'#5cc04a','#2a7a1a',2)}${auge(-12,-62)}${auge(12,-62)}${L('M-10 -42Q0 -36 10 -42','#2a7a1a',2)}${E(-24,-24,10,5,'#5cc04a')}${E(24,-24,10,5,'#5cc04a')}`;
const steg=()=>`${sch(84)}${R(-70,-50,14,50,'#6a4a28')}${R(56,-50,14,50,'#6a4a28')}${R(-84,-60,168,12,'#a0703e','#4a2a10',3)}${R(-84,-48,168,10,'#8a5a2c','#4a2a10',3)}${L('M-70 -110V-60M70 -110V-60M-70 -104Q0 -84 70 -104','#c8a060',5)}${C(-70,-112,5,'#7a5230')}${C(70,-112,5,'#7a5230')}`;
const pflanzentafel=()=>`${R(-6,-60,12,290,'#7a5230')}${R(-80,-60,160,112,'#f6f0d8','#7a5230',5)}${R(-80,-60,160,20,'#3a7a4a')}${L('M-52 40V-14M-44 40V-8M-36 40V-18','#4f9a4a',4)}${E(0,24,22,8,'#4f9a4a')}${C(0,16,8,'#f08ac0')}${L('M44 42V-14','#6a8a3a',4)}${E(44,-14,6,16,'#7a4a22')}`;
const seerosen=()=>`${E(0,-4,90,16,'#3a9ad0','#2a6a9a',3)}${[[-50,-6,28],[10,-2,34],[56,-8,24]].map(([x,y,r])=>E(x,y,r,r*.3,'#4f9a4a','#2a6a2a',2)).join('')}${[[0,-14],[-48,-14],[54,-16]].map(([x,y])=>C(x,y-6,7,'#f08ac0','#a04a80',1.5)+C(x,y-8,3,'#f2d23a')).join('')}`;
const kuecken=()=>`${E(0,2,80,8,'rgba(60,150,200,.5)')}${[[-44,-6,.9],[0,-10,1],[44,-6,.9]].map(([x,y,s])=>`<g transform="translate(${x} ${y}) scale(${s})">${E(0,-14,16,12,'#f6d84a','#c8a020',2)}${C(14,-30,10,'#f6d84a','#c8a020',2)}${P('M22 -30l12 3l-12 4z','#f28a1a')}${C(17,-33,2,'#222')}${P('M-14 -16Q-24 -26 -16 -30Z','#f6d84a')}</g>`).join('')}`;
const fernglas=()=>`${sch(40)}${L('M0 -90L-40 0M0 -90L40 0M0 -90V0','#4a3a2a',6)}${R(-30,-134,26,64,'#2e5a3a','#1a2a20',3)}${R(4,-134,26,64,'#2e5a3a','#1a2a20',3)}${R(-8,-114,16,10,'#555')}${C(-17,-138,10,'#8ac8e8','#1a2a20',3)}${C(17,-138,10,'#8ac8e8','#1a2a20',3)}`;
const nestregal=()=>`${R(-70,10,140,10,'#8a6238','#3a2410',3)}${P('M-50 20V44L-30 20Z','#6a4a28')}${P('M50 20V44L30 20Z','#6a4a28')}${E(0,-2,50,22,'#a07a40','#5a3a1c',3)}${L('M-40 -2Q0 14 40 -2M-30 -12Q0 4 30 -12','#6a4a22',2)}${[[-16,-14],[4,-18],[22,-12]].map(([x,y])=>E(x,y,10,13,'#a8d8e8','#5a8aa0',2)+C(x-3,y-3,1.5,'#5a8aa0')+C(x+3,y+3,1.5,'#5a8aa0')).join('')}`;
const winde=()=>`${sch(64)}${R(-60,-120,12,120,'#7a5230','#3a2410',2)}${R(48,-120,12,120,'#7a5230','#3a2410',2)}${R(-70,-132,140,14,'#8a6238','#3a2410',3)}${R(-40,-100,80,22,'#c8a060','#6a4a20',3)}${L('M-24 -100V-78M-8 -100V-78M8 -100V-78M24 -100V-78','#a08040',2)}${L('M60 -90H90V-60','#555',5)}${C(90,-58,5,'#7a5230')}${L('M0 -78V-22','#c8a060',3)}${P('M-18 -22H18L14 0H-14Z','#8a6a3a','#4a3018',2)}`;
const vorratkorb=()=>`${sch(60)}${P('M-40 -40H40L32 0H-32Z','#c8a060','#7a5a20',3)}${L('M-38 -26H38','#7a5a20',2)}${[-24,-6,12,28].map((x,k)=>ei(x,-44-(k%2)*4,1.4)).join('')}${P('M60 -30Q96 -50 78 -92Q64 -60 44 -52Z','#d0703a')}${E(52,-42,14,22,'#c0602a')}${C(48,-70,12,'#c0602a')}${P('M42 -78L40 -92L52 -80Z','#c0602a')}${C(52,-72,2,'#222')}${E(48,-30,6,8,'#f2d8b0')}`;
const windfahne=()=>`${sch(30)}${R(-4,-210,8,210,'#7a5230')}${L('M-30 -170H30M0 -170V-150','#555',4)}${C(-30,-170,4,'#e74c3c')}${C(30,-170,4,'#2e86c1')}${P('M-50 -196H26L52 -184L26 -172H-50L-38 -184Z','#c0392b','#6a1a10',2)}${C(0,-212,5,'#555')}`;
const wetter=()=>`${R(-60,-70,120,140,'#c8a060','#6a4a20',4)}${R(-44,-56,16,88,'#fffbe8','#555',2)}${R(-40,-6,8,38,'#e74c3c')}${C(-36,38,10,'#e74c3c')}${R(0,-30,34,64,'rgba(200,232,240,.5)','#4a6a7a',2)}${R(2,10,30,22,'#5dade2')}${L('M0 -14h8M0 0h8M0 14h8','#4a6a7a',2)}${C(18,-52,12,'#f2c14e')}${E(30,-46,18,8,'#fff','#9ab',1.5)}`;
const logbuch=()=>`${sch(50)}${P('M-44 -34H44L40 0H-40Z','#7a5230','#3a2410',3)}${E(0,-34,44,10,'#a0703e','#3a2410',2)}${P('M-34 -40L0 -34L34 -40L34 -58L0 -52L-34 -58Z','#f6f0d8','#7a5a2a',2)}${L('M-28 -50L-6 -46M-28 -44L-6 -40M6 -46L28 -50M6 -40L28 -44','#8a7a60',1.5)}${P('M26 -48Q46 -94 78 -100Q70 -70 40 -52Z','#e8e0d0','#8a7a60',2)}${L('M26 -48Q50 -76 78 -100','#8a7a60',2)}`;
const laterne=()=>`${sch(32)}${C(0,-60,70,'url(#licht)')}${R(-24,-12,48,10,'#3a3a40')}${R(-22,-86,44,76,'rgba(255,210,120,.6)','#3a3a40',3)}${L('M-11 -86V-12M11 -86V-12','#3a3a40',2)}${E(0,-48,9,13,'#ffd060')}${P('M-30 -86H30L16 -104H-16Z','#3a3a40')}${C(0,-110,8,'none','#3a3a40',3)}`;
const kamin=()=>`${sch(60)}${R(-8,-340,16,150,'#3a3a40')}${R(-40,-200,80,16,'#3a3a40')}${R(-50,-190,100,170,'#4a4a52','#222',4)}${R(-34,-160,68,80,'#2a1a10','#222',3)}${R(-28,-154,56,68,'#ff9a30')}${R(-24,-100,48,10,'#7a5230')}${R(-20,-112,40,10,'#8a6238')}${R(-56,-20,112,20,'#3a3a40','#222',3)}${C(0,-60,6,'#2a2a30')}`;
const tisch=()=>`${sch(66)}${L('M-52 -58V0M52 -58V0','#7a5230',10)}${R(-52,-40,104,6,'#7a5230')}${R(-64,-70,128,12,'#a0703e','#4a2a10',3)}${P('M-40 -76L0 -70L40 -76L40 -96L0 -90L-40 -96Z','#f6f0d8','#7a5a2a',2)}${L('M-32 -88L-6 -84M-32 -80L-6 -77M6 -84L32 -88M6 -77L32 -80','#8a7a60',1.5)}${R(46,-94,16,22,'#2e86c1','#1a4a6a',2)}${L('M62 -88Q72 -84 62 -78','#1a4a6a',3)}`;
const holzstapel=()=>`${sch(70)}${[-50,-17,16,49].map(x=>lg(x,-18)).join('')}${[-34,0,34].map(x=>lg(x,-50)).join('')}${[-17,17].map(x=>lg(x,-82)).join('')}`;
const schaukel=()=>`${sch(70)}${L('M-60 -20Q0 6 60 -20','#7a5230',8)}${L('M-40 -22L-48 -130M40 -22L36 -130','#8a6238',7)}${L('M-44 -60V-88M44 -60V-88','#8a6238',6)}${[-130,-110,-90].map(y=>R(-46,y,92,10,'#a0703e','#4a2a10',2)).join('')}${R(-50,-64,100,12,'#a0703e','#4a2a10',3)}${P('M-30 -52Q0 -30 40 -52L40 -66H-30Z','#c0392b','#6a1a10',2)}`;
const waldkarte=()=>`${R(-84,-60,168,120,'#e8d4a0','#7a5a2a',4)}${[[-50,-24],[-26,-34],[30,-30],[54,-10],[-40,16],[10,30]].map(([x,y])=>P(`M${x} ${y-16}L${x+12} ${y+4}H${x-12}Z`,'#3f7a4a')).join('')}${L('M-70 44Q-20 4 20 24T80 -34','#5dade2',7)}${C(-8,-8,3,'#a0522d')}${C(10,2,3,'#a0522d')}${C(30,10,3,'#a0522d')}${R(40,34,16,12,'#a0522d')}${P('M36 34L48 24L60 34Z','#7a2a1a')}${C(-76,-52,4,'#c0392b')}${C(76,-52,4,'#c0392b')}`;
const uhr=()=>`${P('M-40 -30L0 -76L40 -30Z','#6a4a24','#3a2410',3)}${R(-36,-30,72,80,'#8a5a2c','#3a2410',3)}${C(0,6,28,'#fffbe8','#3a2410',3)}${[0,1,2,3,4,5,6,7,8,9,10,11].map(k=>`<rect x="-1.5" y="-24" width="3" height="${k%3?5:8}" fill="#3a2410" transform="translate(0 6) rotate(${k*30})"/>`).join('')}${L('M0 6V-14M0 6L12 12','#222',3)}${L('M-24 50V84M24 50V70','#888',2)}${U('zapfen',-36,78,24,'#7a5230')}${U('zapfen',12,64,24,'#7a5230')}`;
const kraeuter=()=>`${sch(60)}${L('M-56 0L-46 -150M56 0L46 -150','#7a5230',8)}${R(-56,-154,112,8,'#8a6238','#3a2410',2)}${[[-34,'#4f9a4a'],[-8,'#8a9a3a'],[20,'#6aa04a'],[40,'#3f8a5a']].map(([x,c])=>L(`M${x} -146V-122`,'#a08050',2)+P(`M${x-8} -122H${x+8}L${x+12} -78Q${x} -66 ${x-12} -78Z`,c,'#2a5a2a',1.5)).join('')}`;
const kanne=()=>`${sch(44)}${L('M-24 -42L-28 0M24 -42L28 0','#7a5230',7)}${R(-30,-50,60,8,'#a0703e','#4a2a10',3)}${P('M-26 -52Q-30 -86 0 -88Q30 -86 26 -52Z','#c0603a','#6a2a14',3)}${R(-8,-96,16,8,'#6a2a14')}${C(0,-100,5,'#6a2a14')}${L('M26 -76Q50 -78 44 -60','#6a2a14',6)}${P('M-26 -72Q-46 -80 -48 -94Q-30 -88 -24 -80Z','#c0603a','#6a2a14',2)}${L('M-6 -110Q-14 -120 -4 -130T-4 -148M8 -110Q16 -120 8 -130','rgba(255,255,255,.7)',3)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen #sk{transform:scaleX(.14)}.tuer.offen .pl{opacity:0}.tuer.offen #wl{transform:scaleX(.14)}.tuer.offen #wr{transform:scaleX(.14)}.tuer .st{transform:translateY(46px);opacity:0}.tuer.offen .st{transform:none;opacity:1}.tuer.offen .rc{opacity:0;transform:translateY(50px)}.tuer #ld{transform:scaleY(.05)}.tuer.offen #ld{transform:none}.tuer.offen #kl{transform:scaleX(.14)}.tuer.offen #hd{transform:scaleX(.14)}</style>`;
function tuerStamm(n){
let r='';for(let k=0;k<6;k++)r+=L(`M${392+k*43} 160V470`,'#4a2e18',3);
return`<path d="M360 470Q385 340 395 210Q500 120 605 210Q615 340 640 470Z" fill="#6b4a28" stroke="#3a2410" stroke-width="5"/>${r}${E(372,462,40,14,'#6b4a28','#3a2410',3)}${E(628,462,40,14,'#6b4a28','#3a2410',3)}${R(410,190,180,280,'#1a1208')}${R(446,230,108,170,'#f2f8cc')}${C(500,320,130,'url(#licht)')}${P('M410 470L446 400H554L590 470Z','#4a3418')}
   <g id="sk" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#7a5a34','#3a2410',4)}${L('M440 200V460M480 196V464M520 196V464M560 200V460','#4a2e18',4)}${C(448,262,10,'#4a6a2a')}${E(556,430,22,9,'#4f9a4a')}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerWurzel(n){
const w=['#7a5230','#5a3a1c','#8a6238'];let a='',b='';
for(let k=0;k<5;k++){a+=L(`M${416+k*17} 190Q${430+k*17} 280 ${414+k*17} 340T${424+k*17} 470`,w[k%3],9);b+=L(`M${584-k*17} 190Q${570-k*17} 280 ${586-k*17} 340T${576-k*17} 470`,w[(k+1)%3],9);}
return`${P('M372 470V200Q372 150 500 150Q628 150 628 200V470Z','#5a3a1c','#2a1808',5)}${R(410,190,180,280,'#bfe8f0')}${C(540,230,30,'#fff6c8')}${P('M410 330Q470 300 520 330T590 320V470H410Z','#7fbf6a')}${E(500,430,80,22,'#4aa8d8')}${E(480,428,30,6,'rgba(255,255,255,.5)')}${L('M430 400V360M440 404V366','#4f7a2a',3)}${C(500,330,120,'url(#licht)')}${L('M380 190Q400 230 392 270M620 190Q600 230 608 270','#7a5230',7)}
   <g id="wl" class="tb" style="transform-origin:410px 330px">${a}${L('M410 240Q460 262 506 244M410 410Q460 390 504 412','#7a5230',9)}</g>
   <g id="wr" class="tb" style="transform-origin:590px 330px">${b}${L('M590 280Q540 300 494 282M590 440Q540 420 496 442','#5a3a1c',9)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerSteine(n){
let s='',h='';[[500,448,46],[528,392,38],[486,342,31],[512,298,25]].forEach(([x,y,r],k)=>{s+=`<g class="tb st" style="transition-delay:${(k*.45).toFixed(2)}s">${E(x,y,r,r*.32,'#8a9098','#4a5058',3)}${E(x,y-3,r*.8,r*.2,'#b0b8c0')}</g>`;});
for(let k=0;k<9;k++)h+=L(`M${416+k*21} 470Q${420+k*21} 330 ${414+k*21} 200`,k%2?'#a8b84a':'#7a9a3a',9);
return`<defs><clipPath id="sclip"><rect x="410" y="190" width="180" height="280"/></clipPath></defs>${R(380,170,30,300,'#7a5a34','#3a2410',3)}${R(590,170,30,300,'#7a5a34','#3a2410',3)}${R(370,160,260,24,'#7a5a34','#3a2410',3)}${U('blatt',476,162,48,'#4f9a4a')}
   <g clip-path="url(#sclip)">${R(410,190,180,110,'#dff2ff')}${P('M410 290Q460 250 500 280T590 270V310H410Z','#5a9a5a')}${tanne(470,290,.45,'#3f7a4a')}${R(410,300,180,170,'#3a9ad0')}${L('M410 340q20-8 40 0t40 0t40 0t40 0M410 420q20-8 40 0t40 0t40 0t40 0','rgba(255,255,255,.5)',3)}${C(500,320,120,'url(#licht)')}${s}
   <g class="tb rc">${R(410,190,180,280,'#8aa84a')}${h}${sPl(n,330)}</g></g>`;
}
function tuerLeiter(n){
let r='';for(let y=206;y<470;y+=36)r+=R(446,y,108,8,'#c8a060','#6a4a20',2);
return`<defs><clipPath id="lclip"><rect x="410" y="190" width="180" height="280"/></clipPath></defs>${R(380,170,30,300,'#6a4524','#3a2410',3)}${R(590,170,30,300,'#6a4524','#3a2410',3)}${R(380,160,240,24,'#6a4524','#3a2410',3)}
   <g clip-path="url(#lclip)">${R(410,190,180,280,'#ee8a4a')}${R(410,300,180,170,'#ffcf86')}${P('M410 360Q450 300 500 340T590 320V470H410Z','#3a6a3a')}${C(500,330,120,'url(#licht)')}${C(480,260,26,'#ffe9b0')}
   <g id="ld" class="tb" style="transform-origin:500px 190px;transition-delay:.7s">${L('M446 190V470M554 190V470','#8a6a3a',6)}${r}</g></g>
   <g id="kl" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#9a6a38','#3a2410',4)}${L('M410 260H590M410 330H590M410 400H590','#5a3a18',3)}${R(410,196,24,18,'#555')}${R(410,446,24,18,'#555')}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerHuette(n){
return`${R(410,190,180,280,'#ffd9a0')}${C(500,330,130,'url(#licht)')}${P('M410 400Q470 360 530 392T590 380V470H410Z','#8cc06a')}${tanne(450,410,.5,'#3f7a4a')}${tanne(552,404,.4,'#4f8a54')}${C(520,250,28,'#ffe9b0')}
   ${R(374,160,32,310,'#7a5230','#3a2410',3)}${R(594,160,32,310,'#7a5230','#3a2410',3)}${R(366,150,268,28,'#7a5230','#3a2410',3)}${P('M360 152L500 90L640 152Z','#a0522d','#5a2a14',4)}
   <g id="hd" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#9a6a38','#3a2410',4)}${[0,1,2,3].map(k=>L(`M${410+k*45} 192V468`,'#6a4a22',2)).join('')}${R(440,220,60,60,'#ffd9a0','#3a2410',5)}${L('M470 222V278M442 250H498','#3a2410',4)}${R(410,300,36,8,'#555')}${R(410,440,36,8,'#555')}${C(574,300,7,'#3a2410')}</g>
   <g class="tb pl">${sPl(n,380)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'stamm';
const arten={stamm:[tuerStamm,'Hohler Baumstamm mit Zahlenschloss'],wurzel:[tuerWurzel,'Wurzelvorhang mit Zahlenschloss'],steine:[tuerSteine,'Schilfwand am Teich mit Zahlenschloss'],leiter:[tuerLeiter,'Klappe mit Strickleiter und Zahlenschloss'],huette:[tuerHuette,'Hüttentür mit Zahlenschloss']};
const a=arten[art]||arten.stamm;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.wald={
name:"Der Wald",
symbole:["pilz","eichel","blatt","zapfen","feder"],
symbolNamen:["Pilz","Eichel","Blatt","Tannenzapfen","Feder"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="60" cy="45" r="40" fill="#b8e0a0" stroke="#3a6a2a" stroke-width="3"/><use href="#sym-pilz" x="30" y="14" width="46" height="46" color="#c0392b"/><use href="#sym-eichel" x="68" y="40" width="30" height="30" color="#8a5a20"/><use href="#sym-blatt" x="22" y="48" width="28" height="28" color="#2f7a34"/></svg>`,
texte:{
einleitung:"Ihr macht eine Waldwanderung. Plötzlich kommt dichter Nebel auf, und alle Wegweiser sind verschwunden! Die Försterin hat in der Waldhütte ein Rätselspiel für euch versteckt: Ihr geht von Ort zu Ort, und jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände im Wald. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zur Waldhütte?",
startKnopf:"In den Wald gehen",
hinweisGeber:"Das Eichhörnchen flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Das Eichhörnchen schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Es wird dunkel!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Waldhütte trotzdem noch finden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg zur Waldhütte gefunden. Die Försterin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du machst eine Waldwanderung. Plötzlich kommt dichter Nebel auf, und alle Wegweiser sind verschwunden! Die Försterin hat in der Waldhütte ein Rätselspiel für dich versteckt: Du gehst von Ort zu Ort, und jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände im Wald. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zur Waldhütte?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Das Eichhörnchen schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Waldhütte trotzdem noch finden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg zur Waldhütte gefunden. Die Försterin ist stolz auf dich!"
},
einfach:{
name:"Der Wald",
symbolNamen:["Pilz","Eichel","Blatt","Tannenzapfen","Feder"],
texte:{
einleitung:"Ihr geht im Wald wandern. Plötzlich kommt Nebel. Alle Wegweiser sind weg! Die Försterin hat in der Hütte ein Rätsel-Spiel versteckt. Ihr geht von Ort zu Ort. An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben im Wald. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr die Waldhütte?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Es wird dunkel!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und die Waldhütte gefunden!"
},
texteDu:{
einleitung:"Du gehst im Wald wandern. Plötzlich kommt Nebel. Alle Wegweiser sind weg! Die Försterin hat in der Hütte ein Rätsel-Spiel versteckt. Du gehst von Ort zu Ort. An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben im Wald. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du die Waldhütte?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und die Waldhütte gefunden!"
},
raeume:[
{titel:"Der Waldweg",intro:"Auf dem Weg liegt noch Nebel. Die Vögel singen. Findet die Zahlen für den hohlen Baumstamm!",introDu:"Auf dem Weg liegt noch Nebel. Die Vögel singen. Finde die Zahlen für den hohlen Baumstamm!",
objekte:[{name:"Wegweiser",fund:"Am Wegweiser klebt:"},{name:"Pilze",fund:"Unter den Pilzen liegt:"},{name:"Baumstumpf",fund:"Auf dem Baumstumpf liegt:"},{name:"Moos-Stein",fund:"Im Moos klebt:"},{name:"Brombeeren",fund:"Zwischen den Beeren hängt:"}],
infoObjekte:[{name:"Vogelhaus",fund:"Im Vogelhaus liegt:"},{name:"Schild mit Spuren",fund:"Hinter dem Schild klebt:"},{name:"Bank mit Faltern",fund:"Auf der Bank liegt:"}]},
{titel:"Der Fuchsbau",intro:"Hier unter der Erde ist es warm. Überall sind Wurzeln. Ein Wurzel-Vorhang versperrt den Weg.",
objekte:[{name:"Vorrats-Nische",fund:"In der Nische liegt:"},{name:"Bett vom Fuchs",fund:"Im Bett liegt:"},{name:"Wurzel-Regal",fund:"Im Regal steckt:"},{name:"Haufen mit Eicheln",fund:"Zwischen den Eicheln liegt:"},{name:"Schale mit Wasser",fund:"Neben der Schale liegt:"}],
infoObjekte:[{name:"Karte an der Wand",fund:"Hinter der Karte klebt:"},{name:"Glas mit Käfern",fund:"Am Glas klebt:"},{name:"Maulwurf-Hügel",fund:"Im Hügel steckt:"}]},
{titel:"Der Teich",intro:"Das Wasser glitzert in der Sonne. Libellen fliegen über dem Schilf. Das Schilf versperrt noch den Weg.",
objekte:[{name:"Tafel mit Fischen",fund:"Hinter der Tafel klebt:"},{name:"Libelle",fund:"Am Schilf klebt:"},{name:"Otter-Rutsche",fund:"Auf der Rutsche liegt:"},{name:"Frosch",fund:"Auf dem Blatt liegt:"},{name:"Holz-Steg",fund:"Auf dem Steg liegt:"}],
infoObjekte:[{name:"Tafel mit Pflanzen",fund:"Hinter der Tafel steckt:"},{name:"Seerosen-Blätter",fund:"Zwischen den Blättern liegt:"},{name:"Entenbabys",fund:"Bei den Entenbabys liegt:"}]},
{titel:"Das Baumhaus",intro:"Ihr seid hoch oben im Baum. Die Abendsonne scheint orange. Findet die Zahlen für die Klappe!",introDu:"Du bist hoch oben im Baum. Die Abendsonne scheint orange. Finde die Zahlen für die Klappe!",
objekte:[{name:"Fernrohr",fund:"Am Fernrohr klebt:"},{name:"Nest mit Eiern",fund:"Im Nest liegt:"},{name:"Seil-Winde",fund:"Im Eimer liegt:"},{name:"Korb mit Nüssen",fund:"Zwischen den Nüssen liegt:"},{name:"Wind-Fahne",fund:"An der Fahne klebt:"}],
infoObjekte:[{name:"Wetter-Tafel",fund:"An der Tafel klebt:"},{name:"Buch mit Notizen",fund:"Im Buch steckt:"},{name:"Lampe",fund:"An der Lampe klebt:"}]},
{titel:"Die Waldhütte",intro:"In der Hütte ist es gemütlich. Draußen wird es Abend. Hier ist das letzte Schloss. Öffnet es!",introDu:"In der Hütte ist es gemütlich. Draußen wird es Abend. Hier ist das letzte Schloss. Öffne es!",
objekte:[{name:"Ofen",fund:"Am Ofen klebt:"},{name:"Tisch mit Tagebuch",fund:"Im Tagebuch liegt:"},{name:"Stapel mit Holz",fund:"Zwischen den Stämmen steckt:"},{name:"Stuhl zum Schaukeln",fund:"Auf dem Stuhl liegt:"},{name:"Karte vom Wald",fund:"An der Karte hängt:"}],
infoObjekte:[{name:"Uhr",fund:"Hinter der Uhr klebt:"},{name:"Kräuter zum Trocknen",fund:"Zwischen den Kräutern steckt:"},{name:"Kanne mit Tee",fund:"Neben der Kanne liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Waldweg",
intro:"Auf dem Waldweg liegt noch dichter Morgennebel. Die Vögel singen, und es duftet nach Moos und Pilzen. Findet die Ziffern für den hohlen Baumstamm!",
introDu:"Auf dem Waldweg liegt noch dichter Morgennebel. Die Vögel singen, und es duftet nach Moos und Pilzen. Finde die Ziffern für den hohlen Baumstamm!",
tuerX:1300,tuerArt:"stamm",
hintergrund:()=>`${defs('#7a9a4a','#3a5a22','#f4ffd0')}${R(0,0,1600,470,'#d6ebd2')}${R(0,0,1600,200,'#e4f2dc')}${[150,520,700,1000,1480].map((x,k)=>tanne(x,420,1.6+k%2*.5,'#a8c8a4')).join('')}${P('M900 0L1000 0L700 470L560 470Z','rgba(255,255,220,.3)')}${[300,800].map((x,k)=>`${stamm(x,76+k*4,'#6b4a28')}${krone(x,20,100,'#3f8a44')}`).join('')}${R(0,360,1600,120,'rgba(255,255,255,.45)')}${E(400,420,300,40,'rgba(255,255,255,.4)')}${E(1100,400,360,40,'rgba(255,255,255,.4)')}${boden(1)}${P('M560 780L740 470H900L1260 780Z','#c8ac78','rgba(0,0,0,.15)',3)}`,
objekte:[
{name:"Wegweiser ohne Pfeile",x:300,y:230,wand:true,by:-90,zeichne:wegweiser,fund:"Am Wegweiser klebt:"},
{name:"Pilzgruppe",x:560,boden:600,fuss:4,by:-130,zeichne:pilzgruppe,fund:"Unter dem Pilz liegt:"},
{name:"Baumstumpf mit Ringen",x:1000,boden:700,fuss:4,by:-100,zeichne:stumpf,fund:"Auf dem Baumstumpf liegt:"},
{name:"Moosstein",x:870,boden:740,fuss:4,by:-110,zeichne:moosstein,fund:"Im Moos klebt:"},
{name:"Brombeerstrauch",x:1530,boden:600,fuss:4,by:-130,zeichne:brombeere,fund:"Zwischen den Beeren hängt:"}
],
infoObjekte:[{name:"Vogelhäuschen",x:800,y:250,wand:true,by:-90,zeichne:vogelhaus,fund:"Im Vogelhäuschen liegt:"},{name:"Spuren-Schild",x:420,boden:690,fuss:4,by:-225,zeichne:spurschild,fund:"Hinter dem Schild klebt:"},{name:"Schmetterlingsbank",x:150,boden:730,fuss:4,by:-150,zeichne:bank,fund:"Auf der Bank liegt:"}]},
{titel:"Der Fuchsbau",
intro:"Im Fuchsbau ist es warm und gemütlich. Durch ein Loch in der Decke fällt Licht, und überall winden sich Wurzeln. Ein Wurzelvorhang versperrt den Weg. Irgendwo hier sind die Ziffern dafür versteckt …",
tuerX:300,tuerArt:"wurzel",
hintergrund:()=>`${defs('#7a5a38','#3a2814','#ffd890')}${R(0,0,1600,470,'#7a4e28')}${[...Array(40)].map((_,k)=>C((k*173)%1600,(k*97)%440+10,5+k%4*3,'rgba(0,0,0,.14)')).join('')}${P('M0 0H1600V90Q1400 130 1200 100T800 120T400 100T0 110Z','#4a2e16')}${P('M1100 100L1300 100L1500 470L900 470Z','rgba(255,240,170,.28)')}${E(1200,100,100,20,'#cfe9ff')}${L('M100 100Q110 180 90 240M500 110Q480 170 520 220M700 120Q720 190 700 250M1000 110Q1020 160 990 210M1450 100Q1430 160 1470 230','#8a6238',8)}${C(900,300,360,'url(#licht)')}${boden(2)}`,
objekte:[
{name:"Vorratskammer",x:700,boden:580,fuss:4,by:-135,zeichne:vorrat,fund:"In der Vorratskammer liegt:"},
{name:"Fuchs-Schlafnest",x:1300,boden:640,fuss:4,by:-105,zeichne:schlafnest,fund:"Im Schlafnest liegt:"},
{name:"Wurzelregal",x:1000,y:260,wand:true,by:-80,zeichne:wurzelregal,fund:"Im Regal steckt:"},
{name:"Eichelhaufen",x:480,boden:700,fuss:4,by:-75,zeichne:eichelhaufen,fund:"Zwischen den Eicheln liegt:"},
{name:"Wasserschale",x:1500,boden:730,fuss:4,by:-95,zeichne:schale,fund:"Neben der Wasserschale liegt:"}
],
infoObjekte:[{name:"Erdkarte",x:600,y:240,wand:true,by:-70,zeichne:erdkarte,fund:"Hinter der Karte klebt:"},{name:"Käferglas",x:1150,boden:735,fuss:4,by:-90,zeichne:kaeferglas,fund:"Am Käferglas klebt:"},{name:"Maulwurfshügel",x:900,boden:700,fuss:4,by:-75,zeichne:maulwurf,fund:"Im Hügel steckt:"}]},
{titel:"Der Teich",
intro:"Am Teich glitzert das Wasser in der Mittagssonne. Libellen schwirren über dem Schilf, und Frösche quaken. Der Weg führt über Trittsteine, aber eine Schilfwand versperrt ihn noch. Das Zahlenschloss wartet!",
tuerX:800,tuerArt:"steine",
hintergrund:()=>`${defs('#8aba5a','#4a7a2a','#fff6c8')}${R(0,0,1600,470,'url(#himmel)')}${C(260,120,140,'url(#licht)')}${C(260,120,50,'#fff6c8')}${E(700,90,80,22,'#fff')}${E(780,80,60,20,'#fff')}${E(1300,120,90,22,'#fff')}${P('M0 330Q200 250 420 310T820 290T1240 310T1600 270V470H0Z','#6aa06a')}${[100,500,1000,1500].map(x=>tanne(x,330,1.1,'#3f7a4a')).join('')}${R(0,320,1600,150,'#4aa8d8')}${L('M0 360q40-10 80 0'+'t80 0'.repeat(19),'rgba(255,255,255,.5)',3)}${L('M0 410q40-10 80 0'+'t80 0'.repeat(19),'rgba(255,255,255,.35)',3)}${E(1100,330,60,10,'#3a8a3a')}${L('M1080 330V280M1100 330V270M1120 330V285','#6a8a3a',4)}${boden(1)}`,
objekte:[
{name:"Fischtafel am Pfahl",x:330,y:240,wand:true,by:-90,zeichne:fischtafel,fund:"Hinter der Fischtafel klebt:"},
{name:"Libelle auf Schilf",x:1150,boden:590,fuss:4,by:-205,zeichne:libelle,fund:"Am Schilf klebt:"},
{name:"Fischotter-Rutsche",x:1450,boden:620,fuss:4,by:-160,zeichne:rutsche,fund:"Auf der Rutsche liegt:"},
{name:"Frosch auf Seerosenblatt",x:560,boden:700,fuss:4,by:-80,zeichne:frosch,fund:"Auf dem Blatt liegt:"},
{name:"Holzsteg",x:160,boden:740,fuss:4,by:-120,zeichne:steg,fund:"Auf dem Steg liegt:"}
],
infoObjekte:[{name:"Pflanzentafel",x:1250,y:250,wand:true,by:-80,zeichne:pflanzentafel,fund:"Hinter der Tafel steckt:"},{name:"Seerosen",x:800,boden:730,fuss:4,by:-35,zeichne:seerosen,fund:"Zwischen den Seerosen liegt:"},{name:"Entenküken",x:1000,boden:740,fuss:4,by:-55,zeichne:kuecken,fund:"Bei den Küken liegt:"}]},
{titel:"Das Baumhaus",
intro:"Hoch oben im Baumhaus weht eine frische Brise. Die Abendsonne taucht alles in oranges Licht. Die Strickleiter ist noch hochgezogen. Findet die Ziffern, um die Klappe zu öffnen!",
introDu:"Hoch oben im Baumhaus weht eine frische Brise. Die Abendsonne taucht alles in oranges Licht. Die Strickleiter ist noch hochgezogen. Finde die Ziffern, um die Klappe zu öffnen!",
tuerX:1350,tuerArt:"leiter",
hintergrund:()=>`${defs('#9a6a38','#4a2c12','#ffb060')}<defs><linearGradient id="abendB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8704a"/><stop offset="1" stop-color="#ffd890"/></linearGradient></defs>${R(0,0,1600,470,'#b07a40')}${[...Array(27)].map((_,k)=>R(k*60,0,3,470,'rgba(60,30,10,.4)')).join('')}${R(60,90,300,260,'url(#abendB)','#5a3410',12)}${C(220,230,40,'#ffe0a0')}${P('M64 346Q100 290 150 310T250 280T356 300V346Z','#4a5a34')}${[100,170,260,330].map(x=>C(x,330,26,'#3a5a34')).join('')}${L('M210 90V350M64 220H356','#5a3410',8)}${R(0,0,1600,40,'#5a3410')}${L('M0 60Q400 110 800 60T1600 60','#333',2)}${[...Array(15)].map((_,k)=>C(k*110+20,78+(k%2)*10,7,'#ffd060')).join('')}${C(210,230,320,'url(#licht)')}${boden(0)}`,
objekte:[
{name:"Fernglas auf Stativ",x:300,boden:600,fuss:4,by:-155,zeichne:fernglas,fund:"Am Fernglas klebt:"},
{name:"Vogelnest-Regal",x:700,y:250,wand:true,by:-45,zeichne:nestregal,fund:"Im Nest liegt:"},
{name:"Seilwinde",x:1000,boden:600,fuss:4,by:-150,zeichne:winde,fund:"Im Eimer der Seilwinde liegt:"},
{name:"Eichhörnchen-Vorrat",x:640,boden:740,fuss:4,by:-105,zeichne:vorratkorb,fund:"Zwischen den Nüssen liegt:"},
{name:"Windfahne",x:130,boden:720,fuss:4,by:-225,zeichne:windfahne,fund:"An der Windfahne klebt:"}
],
infoObjekte:[{name:"Wetterstation",x:1000,y:240,wand:true,by:-85,zeichne:wetter,fund:"An der Wetterstation klebt:"},{name:"Logbuch",x:900,boden:735,fuss:4,by:-115,zeichne:logbuch,fund:"Im Logbuch steckt:"},{name:"Laterne",x:400,boden:720,fuss:4,by:-125,zeichne:laterne,fund:"An der Laterne klebt:"}]},
{titel:"Die Waldhütte",
intro:"In der Waldhütte knistert es gemütlich im Ofen, und das Kaminlicht tanzt an den Holzwänden. Draußen wird es Abend. Hier ist das letzte Schloss – öffnet es!",
introDu:"In der Waldhütte knistert es gemütlich im Ofen, und das Kaminlicht tanzt an den Holzwänden. Draußen wird es Abend. Hier ist das letzte Schloss – öffne es!",
tuerX:500,tuerArt:"huette",
hintergrund:()=>`${defs('#8a5a30','#3a2410','#ffb050')}${[...Array(10)].map((_,k)=>R(0,k*47,1600,47,k%2?'#8a5a2c':'#7a4e24','#4a2a10',3)).join('')}${R(1360,110,150,170,'#1a2a4a','#4a2a10',10)}${C(1440,160,22,'#fff6c8')}${C(1400,230,2,'#fff')}${C(1480,200,2,'#fff')}${L('M1435 110V280M1360 195H1510','#4a2a10',6)}${R(0,0,1600,34,'#4a2a10')}${C(1300,380,520,'url(#licht)')}${boden(0)}${E(800,650,260,50,'#b0463a','#6a2418',3)}${E(800,650,170,28,'none','#e8b050',3)}`,
objekte:[
{name:"Kaminofen",x:1300,boden:580,fuss:4,by:-250,zeichne:kamin,fund:"Am Kaminofen klebt:"},
{name:"Förster-Tagebuch",x:900,boden:700,fuss:4,by:-110,zeichne:tisch,fund:"Im Tagebuch liegt:"},
{name:"Holzstapel",x:1500,boden:735,fuss:4,by:-100,zeichne:holzstapel,fund:"Zwischen den Stämmen steckt:"},
{name:"Schaukelstuhl",x:800,boden:600,fuss:4,by:-145,zeichne:schaukel,fund:"Auf dem Schaukelstuhl liegt:"},
{name:"Karte vom Wald",x:1050,y:240,wand:true,by:-80,zeichne:waldkarte,fund:"An der Karte hängt:"}
],
infoObjekte:[{name:"Wanduhr",x:750,y:230,wand:true,by:-90,zeichne:uhr,fund:"Hinter der Uhr klebt:"},{name:"Kräuterständer",x:640,boden:700,fuss:4,by:-165,zeichne:kraeuter,fund:"Zwischen den Kräutern steckt:"},{name:"Teekanne",x:1150,boden:735,fuss:4,by:-155,zeichne:kanne,fund:"Neben der Teekanne liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmelA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6ac0"/><stop offset=".6" stop-color="#f08a5a"/><stop offset="1" stop-color="#ffd890"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmelA)"/><circle cx="560" cy="400" r="90" fill="#fff6c8" opacity=".4"/><circle cx="560" cy="400" r="48" fill="#fff0b0"/>
   <path d="M0 400Q200 340 420 380T1000 360V600H0Z" fill="#4a7a4a"/><path d="M0 460Q300 420 600 470T1000 450V600H0Z" fill="#8cc06a"/>
   ${[[130,420,1.4],[260,400,1.1],[760,410,1.2],[880,430,1.5],[360,380,.8]].map(([x,y,s])=>tanne(x,y,s,'#2f6a3a')).join('')}
   <path d="M420 600Q470 520 500 470Q540 520 600 600Z" fill="#d8c8a0"/>
   <g transform="translate(330 520)">${E(0,-50,38,20,'#b07a40')}${L('M-26 -40V-6M-12 -36V-4M16 -36V-4M30 -40V-8','#8a5a2a',5)}${L('M30 -58L48 -92','#b07a40',10)}${E(52,-98,13,9,'#b07a40')}${P('M46 -104L42 -122L54 -108Z','#b07a40')}${P('M56 -106L62 -122L64 -104Z','#b07a40')}${C(55,-100,2,'#222')}${E(-36,-54,6,9,'#fff')}</g>
   <g transform="translate(730 548)">${E(0,-24,14,20,'#c0602a')}${C(4,-52,11,'#c0602a')}${P('M10 -60L14 -72L18 -58Z','#c0602a')}${P('M-12 -24Q-40 -30 -30 -70Q-14 -80 -4 -62Q-14 -48 -8 -34Z','#d0703a')}${C(8,-54,2,'#222')}${E(-4,-14,6,8,'#f2d8b0')}</g>
   <g transform="translate(620 540)">${L('M-10 -50V-4M10 -50V-4','#3a3a40',9)}${L('M-20 -104L-44 -146','#3f7a4a',9)}${L('M20 -104L32 -66','#3f7a4a',9)}${P('M-24 -50L-18 -112Q0 -122 18 -112L24 -50Z','#3f7a4a','#1f4a2a',3)}${C(-46,-152,6,'#f0c8a0')}${C(0,-136,15,'#f0c8a0')}${P('M-18 -140Q-4 -166 18 -140Z','#2a5a34')}${R(-22,-142,44,6,'#2a5a34')}${P('M-14 -128Q-18 -108 -8 -116Z','#8a5a2a')}${C(-5,-136,2,'#222')}${C(6,-136,2,'#222')}${L('M-4 -128Q0 -125 5 -128','#a04a3a',2)}</g>
   <path d="M0 0H1000V600H0Z M200 600V180H800V600Z" fill="#5a3a1c" fill-rule="evenodd"/><path d="M200 600V180H800V600" stroke="#3a2410" stroke-width="18" fill="none"/><path d="M150 186L500 40L850 186Z" fill="#a0522d" stroke="#5a2a14" stroke-width="6"/>${U('eichel',470,84,60,'#f2c14e')}`
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
   WALD in 3D: gemeinsame Bausteine für alle fünf Räume und das Schlussbild.
   Je Raum eine Datei wald-raum<n>.js, die sich in RAEUME3D.wald[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.wald = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Ameisenhaufen','Beim Ameisenhaufen liegt:','Haufen mit Ameisen','Beim Haufen liegt:'],['Insektenhotel','Im Insektenhotel steckt:','Haus für Insekten','Im Haus steckt:']],
  [['Junge Füchse','Bei den jungen Füchsen liegt:','Fuchs-Kinder','Bei den Fuchs-Kindern liegt:'],['Schneckenhaus','Im Schneckenhaus steckt:','Haus der Schnecke','Beim Haus der Schnecke liegt:']],
  [['Ruderboot','Im Ruderboot liegt:','Boot','Im Boot liegt:'],['Reiher','Neben dem Reiher steckt:','Vogel mit langen Beinen','Beim Vogel liegt:']],
  [['Hängematte','In der Hängematte liegt:','Netz zum Liegen','Im Netz liegt:'],['Eule in der Baumhöhle','Bei der Eule steckt:','Eule','Bei der Eule liegt:']],
  [['Stiefel mit Rucksack','Im Rucksack steckt:','Stiefel und Rucksack','Im Rucksack liegt:'],['Igel im Karton','Neben dem Igel liegt:','Kiste mit Igel','Beim Igel liegt:']]
];
const SZW=SZENARIEN.wald;
/* Bis Klasse 6: Die Einleitung nennt den Ausgang, wo das 2D-Szenario ihn nicht erwähnt */
if(SZW.einfach){ const r=SZW.einfach.raeume[4]; if(r) ['intro','introDu'].forEach(k=>{ if(r[k]) r[k]=r[k]+' Der Ausgang ist die Tür der Hütte.'; }); }
/* In 3D steht im ersten Raum ein Wegweiser: Die Geschichte sagt darum nicht, dass alle Wegweiser weg sind */
[SZW.texte,SZW.texteDu,SZW.einfach&&SZW.einfach.texte,SZW.einfach&&SZW.einfach.texteDu].forEach(t=>{ if(t) Object.keys(t).forEach(n=>{ if(typeof t[n]==='string') t[n]=t[n].split('alle Wegweiser sind verschwunden').join('der Weg ist nicht mehr zu sehen').split('Alle Wegweiser sind weg').join('Der Weg ist nicht mehr zu sehen'); }); });
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZW.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZW.einfach) SZW.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const WA = (function(){
const HOLZ=0x8e5c30, HOLZ2=0x63401f, HOLZ3=0x3e2712, HELLHOLZ=0xc89a62, RINDE=0x6e4a2a, RINDE2=0x523419, ERDE=0x9a6c44, ERDE2=0x74502e, MOOS=0x6a9a34, MOOS2=0x8cba48,
  LAUB=0x4f9038, LAUB2=0x6cae42, LAUB3=0x367030, TANNE=0x2f6a3a, TANNE2=0x3f8248, STEIN=0xa8a296, STEIN2=0x7e786c, ROT=0xc8362a, BLAU=0x3a6aa8, GELB=0xffd23a, ORANGE=0xe07a28,
  CREME=0xf4ecd6, WEISS=0xfaf6ee, SCHWARZ=0x1c140c, GOLD=0xe8b830, METALL=0x98a2aa, METALL2=0x50585e, EISEN=0x2c3034, WASSER=0x3a9ac0, SCHILF=0x88a840;
const LEDER2=0x5a2e14;

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
let KUGEL_KLEIN=null;
function viele(par,geo,liste){
  if(geo===GEO.sph){ const g8=KUGEL_KLEIN||(KUGEL_KLEIN=new THREE.SphereGeometry(1,8,6)); geo=g8; } /* viele Kugeln: wenige Dreiecke */
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(e[8]||0,e[7]||0,e[9]||0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.receiveShadow=true; im.frustumCulled=false; par.add(im); return im;
}
/* ---------- Rinde (kachelbar) ---------- */
function rindenBild(grund){
  const G=grund||[110,76,44];
  return bild(512,512,(g)=>{ g.fillStyle='rgb('+G.join(',')+')'; g.fillRect(0,0,512,512);
    for(let i=0;i<420;i++){ const x=zufall()*508, y=zufall()*500; g.fillStyle=i%2?'rgba(40,22,8,.45)':'rgba(190,140,90,.28)'; g.fillRect(x,y,3+zufall()*5,18+zufall()*60); } });
}
/* ---------- Waldpflanzen (Deko; Hindernis immer selbst setzen) ---------- */
let KUGEL_MITTEL=null;
/* Deko-Kugeln mit weniger Dreiecken, dann verschmelzen */
function sparsam(g){ const k=KUGEL_MITTEL||(KUGEL_MITTEL=new THREE.SphereGeometry(1,10,7)); g.traverse(m=>{ if(m.isMesh && m.geometry===GEO.sph) m.geometry=k; }); verschmelze(g); return g; }
/* Tanne, Fuß bei y=0, Höhe etwa h */
function tanne(par,x,z,h,farbe){
  const g=gruppe(par,x,0,z), c=farbe||TANNE; walze(g,h*.06,h*.3,RINDE,0,h*.15,0);
  [[.34,.38,.38],[.27,.34,.58],[.2,.3,.76],[.12,.24,.9]].forEach((e,i)=>kegel(g,h*e[0],h*e[1],i%2?TANNE2:c,0,h*e[2],0));
  verschmelze(g); return g;
}
/* Laubbaum, Fuß bei y=0, Höhe etwa h */
function laubbaum(par,x,z,h,farbe){
  const g=gruppe(par,x,0,z), c=farbe||LAUB; rohr(g,h*.055,h*.085,h*.58,RINDE,0,h*.29,0,10);
  [-1,1].forEach(s=>strich(g,[0,h*.42,0],[s*h*.2,h*.62,s*h*.05],h*.03,RINDE));
  [[0,.8,0,.25,0],[-.2,.68,.04,.18,1],[.21,.69,-.03,.19,2],[.04,.66,.18,.17,1],[-.05,.9,-.05,.15,2]].forEach(e=>ball(g,h*e[3],[c,LAUB2,LAUB3][e[4]],h*e[0],h*e[1],h*e[2],1,.88,1));
  return sparsam(g);
}
function busch(par,x,z,r,farbe){
  const g=gruppe(par,x,0,z), c=farbe||LAUB;
  ball(g,r,c,0,r*.6,0,1.1,.8,1); ball(g,r*.7,LAUB2,-r*.75,r*.42,r*.2,1,.8,1); ball(g,r*.65,LAUB3,r*.78,r*.4,-r*.1,1,.8,1);
  return sparsam(g);
}
/* Pilz mit Fuß, Hut und (bei rotem Hut) weißen Punkten; gr = Größe (1 = etwa 0,6 hoch) */
function pilz(par,x,y,z,gr,hut){
  const g=gruppe(par,x,y,z), c=hut===undefined?ROT:hut; g.scale.setScalar(gr||1);
  rohr(g,.09,.13,.34,CREME,0,.17,0,10); ball(g,.28,c,0,.36,0,1,.62,1); walze(g,.25,.04,0xe8d8b8,0,.32,0);
  if(c===ROT) [[0,.54,0],[.17,.47,.08],[-.15,.48,.1],[.02,.47,-.18],[-.08,.48,-.12],[.1,.46,.19]].forEach(p=>ball(g,.045,WEISS,p[0],p[1],p[2],1,.55,1));
  verschmelze(g); return g;
}
/* Farn: Büschel gefiederter Wedel */
function farn(par,x,z,gr){
  const g=gruppe(par,x,0,z); g.scale.setScalar(gr||1);
  for(let i=0;i<7;i++){ const w=gruppe(g,0,0,0); w.rotation.y=i*.9+zufall()*.3;
    strich(w,[0,.04,0],[.4,.5,0],.022,LAUB3); strich(w,[.4,.5,0],[.82,.42,0],.016,LAUB3);
    for(let j=0;j<5;j++){ const u=.18+j*.15, px=u*.95, py=u<.45?.06+u*1.05:.53-(u-.45)*.25; ball(w,.14*(1-j*.13),i%2?LAUB2:LAUB,px,py,0,.55,.12,1.25); } }
  return sparsam(g);
}
/* runder Fels mit Moosflecken */
function stein(par,x,z,r,moos){
  const g=gruppe(par,x,0,z); ball(g,r,STEIN,0,r*.4,0,1.15,.7,1); ball(g,r*.6,STEIN2,r*.7,r*.22,r*.35,1,.65,1);
  if(moos!==false) { ball(g,r*.62,MOOS,-r*.15,r*.9,0,1.15,.28,.95); ball(g,r*.3,MOOS2,r*.35,r*.82,r*.3,1,.35,1); }
  return sparsam(g);
}
/* viele Grashalme und Blümchen im Rechteck, frei(x,z) darf Stellen ausschließen */
function wiesenschmuck(par,x1,x2,z1,z2,nGras,nBlumen,frei){
  const G=[], B=[];
  for(let i=0;i<nGras;i++){ const x=x1+zufall()*(x2-x1), z=z1+zufall()*(z2-z1); if(frei&&!frei(x,z)) continue; G.push([x,.09,z,.04,.18+zufall()*.1,.04,[LAUB,LAUB2,LAUB3,MOOS2][i%4],0,(zufall()-.5)*.5,(zufall()-.5)*.5]); }
  for(let i=0;i<(nBlumen||0);i++){ const x=x1+zufall()*(x2-x1), z=z1+zufall()*(z2-z1); if(frei&&!frei(x,z)) continue; B.push([x,.15,z,.065,.045,.065,[WEISS,GELB,0xf07a9a,0xb08ae0][i%4]]); G.push([x,.07,z,.015,.14,.015,LAUB3]); }
  if(G.length) viele(par,GEO.cone,G); if(B.length) viele(par,GEO.sph,B);
}
/* ---------- Waldtiere (nicht fest; Blick nach +x, Füße bei y=0, userData.lebendig) ---------- */
/* Fuchs. o: { gr, sitzt (true), ruhig, phase }. Rückgabe { g, kopf, schwanz } */
function fuchs(k,par,x,z,dreh,o){
  o=o||{}; const F=0xd8681e, D=0x8a3a10, g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(o.gr||1); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0), s=!!o.sitzt;
  if(s){ ball(r,.36,F,-.2,.36,0,1.05,.95,.95); strich(r,[-.15,.4,0],[.2,.82,0],.24,F); ball(r,.2,WEISS,.27,.66,0,.7,1.4,.85);
    [-1,1].forEach(v=>{ strich(r,[.28,.62,v*.14],[.34,.06,v*.15],.07,D); ball(r,.09,SCHWARZ,.39,.06,v*.15,1.3,.7,1); ball(r,.17,F,-.12,.17,v*.3,1.4,.9,.7); ball(r,.075,SCHWARZ,.1,.06,v*.33,1.4,.7,1); }); }
  else { ball(r,.32,F,0,.62,0,1.7,.9,.85); ball(r,.19,WEISS,.36,.52,0,1,1,1.05);
    [[.36,.16],[.36,-.16],[-.36,.16],[-.36,-.16]].forEach(p=>{ strich(r,[p[0],.55,p[1]],[p[0],.08,p[1]],.075,F); strich(r,[p[0],.28,p[1]],[p[0],.05,p[1]],.078,SCHWARZ); ball(r,.085,SCHWARZ,p[0]+.05,.06,p[1],1.2,.7,1); }); }
  verschmelze(r);
  const kopf=gruppe(g,s?.3:.62,s?1.02:.94,0), k2=gruppe(kopf,0,0,0);
  ball(k2,.25,F,0,0,0,1,.95,1.08); const schn=kegel(k2,.14,.34,F,.3,-.06,0); schn.rotation.z=-Math.PI/2; ball(k2,.13,WEISS,.19,-.12,0,1.5,.65,1.25); ball(k2,.05,SCHWARZ,.47,-.055,0);
  [-1,1].forEach(v=>{ kegel(k2,.11,.28,F,-.03,.27,v*.15).rotation.x=v*.2; kegel(k2,.06,.18,SCHWARZ,.015,.27,v*.15).rotation.x=v*.2; ball(k2,.042,SCHWARZ,.215,.055,v*.115); ball(k2,.014,WEISS,.248,.07,v*.125); ball(k2,.09,WEISS,.1,-.09,v*.19,1,.8,.8); });
  verschmelze(k2);
  const schwanz=gruppe(g,s?-.45:-.55,s?.18:.66,0);
  if(s){ strich(schwanz,[0,0,0],[-.2,-.02,.35],.13,F); ball(schwanz,.19,F,-.05,0,.46,1.5,.85,.9); ball(schwanz,.14,WEISS,.27,0,.5,1.3,.85,.85); }
  else { strich(schwanz,[0,0,0],[-.28,.05,0],.11,F); ball(schwanz,.22,F,-.45,.1,0,1.5,.9,.9); ball(schwanz,.14,WEISS,-.77,.15,0,1.35,.85,.85); }
  verschmelze(schwanz);
  if(!o.ruhig&&k){ const ph=o.phase||0; k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.8+ph)*.35; kopf.rotation.z=Math.sin(t*1.7+ph)*.07; schwanz.rotation.y=Math.sin(t*2.2+ph)*.22; }); }
  return { g, kopf, schwanz };
}
/* Eichhörnchen, aufrecht sitzend mit Nuss. Rückgabe { g, schwanz } */
function eichhorn(k,par,x,y,z,dreh,gr,phase){
  const F=0xb4521c, H=0xe8b880, g=gruppe(par,x,y,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0);
  ball(r,.2,F,0,.24,0,.95,1.2,.9); ball(r,.13,H,.11,.22,0,.7,1.2,.85); ball(r,.15,F,.09,.55,0,1.05,.95,.95); ball(r,.075,H,.2,.51,0,1,.75,1.1); ball(r,.025,SCHWARZ,.27,.54,0);
  [-1,1].forEach(v=>{ kegel(r,.045,.17,F,.04,.74,v*.08); ball(r,.028,SCHWARZ,.2,.59,v*.085); ball(r,.09,F,-.02,.09,v*.14,1.5,.8,.7); ball(r,.05,F,.18,.04,v*.13,1.8,.6,.8); strich(r,[.1,.38,v*.13],[.24,.34,v*.05],.035,F); });
  ball(r,.065,HELLHOLZ,.27,.34,0,.9,1.2,.9); ball(r,.07,HOLZ2,.27,.4,0,1,.45,1);
  verschmelze(r);
  const schwanz=gruppe(g,-.17,.1,0); ball(schwanz,.14,F,-.1,.1,0,1.2,1,.7); ball(schwanz,.19,F,-.23,.36,0,.9,1.35,.7); ball(schwanz,.17,0xc8662a,-.2,.66,0,1,1.15,.7); ball(schwanz,.11,0xd87a34,-.04,.82,0,1.2,.85,.65); verschmelze(schwanz);
  if(k){ const p=phase||0; k.anim.push(t=>{ schwanz.rotation.z=Math.sin(t*3+p)*.13; r.position.y=Math.max(0,Math.sin(t*5+p))*.012; g.position.y=y+Math.max(0,Math.sin(t*.9+p)-.9)*1.2; }); }
  return { g, schwanz };
}
/* kleiner Singvogel, Füße bei y. Rückgabe { g, fluegel } */
function vogel(par,x,y,z,dreh,farbe,bauch){
  const g=gruppe(par,x,y,z), c=farbe||0x4a78b8; g.rotation.y=dreh||0; g.userData.lebendig=true;
  ball(g,.14,c,0,.17,0,1.2,1,.95); ball(g,.1,bauch||0xf4b860,.06,.13,0,1.1,.9,1); ball(g,.1,c,.13,.3,0); kegel(g,.035,.11,ORANGE,.26,.29,0).rotation.z=-Math.PI/2;
  [-1,1].forEach(v=>{ ball(g,.022,SCHWARZ,.19,.33,v*.065); strich(g,[0,.07,v*.05],[.01,0,v*.05],.012,SCHWARZ); });
  const sw=box(g,.2,.03,.09,c,-.22,.2,0); sw.rotation.z=-.35;
  const fluegel=[-1,1].map(v=>{ const f=gruppe(g,-.01,.21,v*.12); ball(f,.095,c,-.04,0,v*.02,1.3,.65,.28); return f; });
  return { g, fluegel };
}
/* Schmetterling, flattert um (x,y,z) */
function falter(k,x,y,z,farbe,phase,weit){
  const g=gruppe(k.scene,x,y,z); g.userData.lebendig=true; walze(g,.025,.24,SCHWARZ,0,0,0).rotation.z=Math.PI/2;
  const F=[-1,1].map(v=>{ const f=gruppe(g,0,0,0); ball(f,.14,farbe,.05,0,v*.14,1,.12,1.1); ball(f,.1,farbe,-.1,0,v*.11,1,.12,1.1); ball(f,.04,WEISS,.07,.02,v*.19,1,.2,1); return f; });
  const p=phase||0, w=weit||1.6;
  k.anim.push(t=>{ const u=t*.5+p; g.position.set(x+Math.sin(u)*w,y+Math.sin(u*2.7)*.35,z+Math.sin(u*1.6+p)*w*.6); g.rotation.y=Math.atan2(-Math.cos(u*1.6+p)*w*.96,Math.cos(u)*w); F.forEach((f,i)=>f.rotation.x=(i?-1:1)*(.25+Math.abs(Math.sin(t*11+p))*.9)); });
  return g;
}
/* Außenraum im Wald: Licht, Himmel-Boden (Raster 280), Rückgabe der Szene. opt: bodenFarbe, punkte, himmelLicht, grund, staerke, sonne, sonneStaerke */
function freiluft(k,opt){
  opt=opt||{}; const sc=k.scene;
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xeaf6ff,opt.grund||0x5a6a40,opt.staerke||.76));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xfff0cc,opt.sonneStaerke===undefined?.5:opt.sonneStaerke); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  if(opt.boden!==false){ const t=kornBild(opt.bodenFarbe||'#6c9c42',opt.punkte||['rgba(176,214,96,.5)','rgba(50,90,28,.42)','rgba(130,90,50,.28)'],true); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(280/9,280/9);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(280,280),new THREE.MeshLambertMaterial({map:t})); m.rotation.x=-Math.PI/2; m.position.y=-.012; m.receiveShadow=true; sc.add(m); }
  return sc;
}
return { HOLZ, HOLZ2, HOLZ3, HELLHOLZ, RINDE, RINDE2, ERDE, ERDE2, MOOS, MOOS2, LAUB, LAUB2, LAUB3, TANNE, TANNE2, STEIN, STEIN2, ROT, BLAU, GELB, ORANGE, CREME, WEISS, SCHWARZ, GOLD, METALL, METALL2, EISEN, WASSER, SCHILF,
  dielenBild, bretterBild, pflasterBild, kornBild, rindenBild, tafel, mauer, huelle, zahlenschloss, viele, tanne, laubbaum, busch, pilz, farn, stein, wiesenschmuck, fuchs, eichhorn, vogel, falter, freiluft };
})();

/* Raum 1: Der Waldweg an einem hellen Morgen mit zartem Nebel. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: ein riesiger hohler Baumstamm hinten rechts. Das Wurzelgitter schwingt auf, dahinter führt der Weg weiter in den Wald. */
RAEUME3D.wald[0] = (function(){
const B=36, T=27;
const EX=11;                 /* Mitte des hohlen Baumstamms */
const ZF=-10.9, LANG=5.4;    /* vordere Öffnung und Länge des Stamms */
const CY=1.55, RA=2.5, RI=1.92;
const WURZEL=0xb9854e, WURZEL2=0x946432, HIMMEL=0xd6ece6;
const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });
const KUGEL=()=>new THREE.SphereGeometry(1,7,5);
/* Gegenstände mit vielen kleinen Kugeln: sparsamere Form */
function leicht(g){ const k=new THREE.SphereGeometry(1,10,7); g.traverse(m=>{ if(m.isMesh && m.geometry===GEO.sph) m.geometry=k; }); }

/* ---------- Licht, Waldboden und Weg ---------- */
function grund(k){
  const sc=WA.freiluft(k,{ himmelLicht:0xf2faff, grund:0x66784a, staerke:.78, sonne:0xffe9bc, sonneStaerke:.52, bodenFarbe:'#6f9c48' });
  const w=bild(1024,768,g=>{
    const X=x=>(x+B/2)/B*1024, Z=z=>(z+T/2)/T*768;
    g.lineCap='round'; g.lineJoin='round';
    const spur=(P,b,f)=>{ g.strokeStyle=f; g.lineWidth=b; g.beginPath(); g.moveTo(X(P[0][0]),Z(P[0][1])); for(let i=1;i<P.length-1;i++) g.quadraticCurveTo(X(P[i][0]),Z(P[i][1]),X((P[i][0]+P[i+1][0])/2),Z((P[i][1]+P[i+1][1])/2)); const e=P[P.length-1]; g.lineTo(X(e[0]),Z(e[1])); g.stroke(); };
    const P=[[EX,-13.5],[EX,-10],[9,-7],[4,-4.5],[1.5,-1],[2,3],[.8,7],[2.6,10.5],[2,13.5]];
    spur(P,104,'rgba(176,138,86,.25)'); spur(P,80,'rgba(188,150,96,.6)'); spur(P,52,'rgba(204,170,114,.65)'); spur(P,22,'rgba(222,194,140,.5)');
    /* vorn weich auslaufen lassen */
    g.globalCompositeOperation='destination-out'; const aus=g.createLinearGradient(0,Z(7.5),0,Z(13.2)); aus.addColorStop(0,'rgba(0,0,0,0)'); aus.addColorStop(1,'rgba(0,0,0,1)'); g.fillStyle=aus; g.fillRect(0,Z(7.5),1024,768-Z(7.5)); g.globalCompositeOperation='source-over';
    for(let i=0;i<420;i++){ g.fillStyle=['rgba(70,110,34,.35)','rgba(180,214,100,.35)','rgba(190,128,52,.4)'][i%3]; g.beginPath(); g.ellipse(zufall()*1020,zufall()*764,3+(i%4),2+(i%3),i,0,7); g.fill(); }
  });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(B,T),new THREE.MeshLambertMaterial({map:w,transparent:true,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.y=.006; m.receiveShadow=true; sc.add(m);
}

/* ---------- Ausgang: der hohle Baumstamm ---------- */
function baumstamm(k){
  const sc=k.scene, ZM=ZF-LANG/2;
  const rinde=WA.rindenBild([112,76,44]); rinde.wrapS=rinde.wrapT=THREE.RepeatWrapping; rinde.repeat.set(5,1.6);
  const aussen=new THREE.Mesh(new THREE.CylinderGeometry(RA,RA,LANG,28,1,true),new THREE.MeshLambertMaterial({map:rinde,side:THREE.DoubleSide}));
  aussen.rotation.x=Math.PI/2; aussen.position.set(EX,CY,ZM); aussen.castShadow=true; aussen.receiveShadow=true; sc.add(aussen);
  const innen=new THREE.Mesh(new THREE.CylinderGeometry(RI,RI,LANG,28,1,true),mat(0x5a3a20,{side:THREE.DoubleSide,emissive:0x1c1006}));
  innen.rotation.x=Math.PI/2; innen.position.set(EX,CY,ZM); sc.add(innen);
  const fest=gruppe(sc,0,0,0);
  /* Stirnseiten mit Jahresringen */
  [ZF,ZF-LANG].forEach(z=>{ const r=new THREE.Mesh(new THREE.RingGeometry(RI,RA,32),mat(0xdcb878,{side:THREE.DoubleSide})); r.position.set(EX,CY,z); fest.add(r);
    ring(fest,2.08,.025,0xa87c44,EX,CY,z+.02); ring(fest,2.27,.025,0xa87c44,EX,CY,z+.02); ring(fest,RA,.12,WA.RINDE2,EX,CY,z); ring(fest,RI,.06,WA.HOLZ2,EX,CY,z); });
  /* Rindenleisten, Astlöcher, abgebrochene Äste, Moos obenauf */
  for(let i=0;i<13;i++){ const a=-.35+i*(Math.PI+.7)/12, x=EX+Math.cos(a)*(RA+.02), y=CY+Math.sin(a)*(RA+.02); strich(fest,[x,y,ZF-.25-(i%3)*.3],[x,y,ZF-LANG+.3+(i%4)*.35],.09,i%2?WA.RINDE:WA.RINDE2); }
  strich(fest,[EX-1.9,CY+1.6,ZM],[EX-2.9,CY+2.7,ZM+.4],.26,WA.RINDE); ball(fest,.24,0xdcb878,EX-2.9,CY+2.7,ZM+.4,1,.7,1);
  strich(fest,[EX+2.1,CY+1.2,ZM-1],[EX+3.2,CY+1.8,ZM-1.3],.2,WA.RINDE2);
  [[-.9,2.32,-.5,.85],[.3,2.52,-1.4,1.05],[1.3,2.14,-.7,.7],[-.2,2.5,-3.2,1],[.9,2.34,-4.2,.8],[-1.5,2.04,-2.2,.75]].forEach(([x,y,z,r],i)=>ball(fest,r,i%2?WA.MOOS2:WA.MOOS,EX+x,CY+y,ZF+z,1,.28,1));
  [-1.35,-.7,.85,1.4].forEach((x,i)=>strich(fest,[EX+x,CY+RA*Math.cos(Math.asin(x/RA))-.02,ZF+.12],[EX+x+.05,CY+RA*Math.cos(Math.asin(x/RA))-.5-(i%2)*.2,ZF+.15],.045,WA.MOOS));
  /* dicke Wurzeln am Fuß */
  [-1,1].forEach(s=>{ [[0,1.2],[-1.8,1.5],[-3.8,1.2]].forEach(([z,l],i)=>{ strich(fest,[EX+s*2.05,.75,ZF+z-.4],[EX+s*(2.2+l),.06,ZF+z+(i?0:.35)],.2,WA.RINDE); ball(fest,.2,WA.RINDE2,EX+s*(2.2+l),.07,ZF+z+(i?0:.35),1.3,.6,1); }); });
  /* Mulchboden im Stamm */
  box(fest,2.5,.04,LANG+.3,0xa07a4a,EX,.012,ZM);
  leicht(fest); verschmelze(fest);
  [-1,1].forEach(s=>{ WA.farn(sc,EX+s*3.5,ZF-.7,1.25); WA.farn(sc,EX+s*3.3,ZF-3.4,1.5); });
  /* der Weg dahinter und warmes Licht */
  const weg=gruppe(sc,0,0,0), P=[[EX,-16.2],[EX,-21],[EX+1.4,-27],[EX+.4,-34],[EX-2.2,-42],[EX-1,-52]];
  for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], l=Math.hypot(b[0]-a[0],b[1]-a[1]), d=Math.atan2(b[0]-a[0],b[1]-a[1]);
    const m=box(weg,2.6,.02,l+.5,0xc4a06a,(a[0]+b[0])/2,.006+i*.0015,(a[1]+b[1])/2); m.rotation.y=d; }
  for(let i=0;i<24;i++){ const s=i%2?1:-1, z=-17-i*.8, x=EX+s*(1.9+(i%3)*.2)+Math.max(0,-z-22)*.12*(z>-32?1:0); ball(weg,.28,i%4<2?WA.LAUB2:WA.LAUB,x,.14,z,1,.75,1); ball(weg,.09,[0xfaf6ee,WA.GELB,0xb08ae0][i%3],x,.4,z); }
  ohneSchatten(weg); leicht(weg); verschmelze(weg);
  schein(sc,'rgba(255,244,190,.55)',EX,1.6,-20.5,5.5);
  /* Wurzelgitter in zwei Flügeln, außen angeschlagen */
  const Z=ZF+.2, fluegel=[-1,1].map(s=>{
    const f=gruppe(sc,EX+s*1.92,0,Z), r=-s;
    const hoch=x=>CY+Math.sqrt(Math.max(.05,RI*RI-x*x));
    [.17,.55,.93,1.31,1.69].forEach((ab,i)=>{ const x=1.92-ab, o=hoch(x), tief=Math.max(.02,CY-Math.sqrt(Math.max(0,RI*RI-x*x))), n=4; let a=[r*ab,tief,0];
      for(let j=1;j<=n;j++){ const b=[r*ab+(j<n?(j%2?.13:-.13)*(i%2?1:-1):0),tief+(o-tief)*j/n,(j%2)*.04]; strich(f,a,b,.095-j*.006,(i+j)%3?WURZEL:WURZEL2); ball(f,.1-j*.006,WURZEL2,b[0],b[1],b[2]); a=b; } });
    [[.55,.2],[1.55,-.18],[2.75,.14]].forEach(([y,sch],i)=>{ const x0=i===2?.45:.05; strich(f,[r*x0,y,.08],[r*1.0,y+sch,.12],.085,WURZEL2); strich(f,[r*1.0,y+sch,.12],[r*1.9,y-sch*.3,.08],.075,WURZEL); });
    [[.4,1.05],[1.2,2.35],[1.6,.95]].forEach(([x,y],i)=>{ ball(f,.13,WA.LAUB2,r*x,y,.17,1.3,.7,.35); ball(f,.09,WA.MOOS2,r*(x+.16),y+.1,.18,1,.7,.35); });
    verschmelze(f); return f; });
  /* großes Zahlenschloss am rechten Flügel */
  const s=gruppe(fluegel[1],-1.38,2.12,.28); box(s,1.4,1.35,.1,WA.EISEN,0,.1,-.06); const schloss=WA.zahlenschloss(s,0,0,.14); schloss.scale.setScalar(1.35); verschmelze(schloss);
  const tuer=ausgang(k,{ steh:[EX-.9,-9.1], durch:[EX,-17.6], treffer:{x:EX,y:2,z:ZF+.45,b:5.2,h:4.2,t:1}, name:'Hohler Baumstamm', einfach:'Hohler Baumstamm', schildOben:[EX,4.9,-10.4], glanz:[EX+.55,2.2,ZF+1.1],
    blick:{ pitch:.36, zoom:.85 }, losNach:1.2, warte:.3,
    bewege:auf=>{ fluegel[0].rotation.y=-auf*1.75; fluegel[1].rotation.y=auf*1.75; } });
  k.kasten(EX,-12.3,5.4,3);
  [-1,1].forEach(v=>k.kreis(EX+v*3,-11.4,.75));
  return tuer;
}

/* ---------- Wald rings um die Lichtung (Instanzen) ---------- */
function wald(k){
  const sc=k.scene, links=k.wand('links'), rechts=k.wand('rechts');
  const toepfe=[0,1,2].map(()=>({ stamm:[], kegel:[], kugel:[] }));
  const C=new THREE.Color(), D=new THREE.Color(0xbcd8cc);
  const misch=(f,a)=>{ C.set(f); C.lerp(D,a); return C.getHex(); };
  for(let gz=-62; gz<46; gz+=3.5) for(let gx=-62; gx<63; gx+=3.5){
    const x=gx+(zufall()-.5)*2.4, z=gz+(zufall()-.5)*2.4;
    if(Math.abs(x)<20.4 && z>-15.4 && z<14.5) continue;
    if(Math.abs(x)<24 && z>=14 && z<36) continue;
    if(Math.abs(x-EX)<3.6+Math.max(0,-z-24)*.12 && z<-9) continue;
    const t=toepfe[(z>-15.4 && x<-20 && x>-34)?1:(z>-15.4 && x>20 && x<34)?2:0];
    const fern=Math.max(0,Math.min(.6,(Math.hypot(x*.8,z)-22)/55)), h=(z>14?3.6:4.6)+zufall()*3.4, art=zufall();
    t.stamm.push([x,h*.22,z,h*.05,h*.44,h*.05,misch(WA.RINDE,fern),0]);
    if(art<.58){ [[.3,.42,.4],[.23,.36,.63],[.15,.3,.85]].forEach((e,i)=>t.kegel.push([x,h*e[2],z,h*e[0],h*e[1],h*e[0],misch(i%2?WA.TANNE2:WA.TANNE,fern),zufall()*6])); }
    else { const f=[WA.LAUB,WA.LAUB2,WA.LAUB3,0x86b848][Math.floor(zufall()*4)];
      [[0,.7,0,.27],[-.19,.57,.05,.19],[.2,.6,-.04,.2],[.02,.87,.02,.18]].forEach(e=>t.kugel.push([x+e[0]*h,h*e[1],z+e[2]*h,h*e[3],h*e[3]*.9,h*e[3],misch(f,fern),zufall()*6])); }
  }
  const stammGeo=new THREE.CylinderGeometry(1,1.25,1,7), kegelGeo=new THREE.ConeGeometry(1,1,9), kugelGeo=KUGEL();
  [sc,links,rechts].forEach((par,i)=>{ const t=toepfe[i]; if(t.stamm.length) WA.viele(par,stammGeo,t.stamm); if(t.kegel.length) WA.viele(par,kegelGeo,t.kegel); if(t.kugel.length) WA.viele(par,kugelGeo,t.kugel); });
  /* Unterholz rund um die Lichtung, vorn bleibt alles niedrig */
  const busch=[[],[],[]], F=[0x4a8a34,0x5e9e3a,0x3c742c,0x80b248];
  for(let i=0;i<460;i++){ const s=i%5; let x,z,t=0,r=.35+zufall()*.55;
    if(s===0){ x=-30+zufall()*60; z=-14.4-zufall()*4; if(Math.abs(x-EX)<3.7 || (Math.abs(x+3.2)<2.4 && z>-16.4)) continue; }
    else if(s===1){ x=-18.6-zufall()*5; z=-14+zufall()*30; t=1; }
    else if(s===2){ x=18.6+zufall()*5; z=-14+zufall()*30; t=2; }
    else { x=-32+zufall()*64; z=14.8+zufall()*20; r=.25+zufall()*.4; if(x<-19) t=1; else if(x>19) t=2; }
    busch[t].push([x,r*.38,z,r,r*.7,r*.9,F[i%4],i]); busch[t].push([x+r*.75,r*.26,z+r*.3,r*.6,r*.48,r*.6,F[(i+1)%4],i]);
    if(i%6===0) busch[t].push([x,r*1.05,z+r*.4,.1,.08,.1,[0xfaf6ee,WA.GELB,0xf07a9a][i%3],0]); }
  [sc,links,rechts].forEach((par,i)=>{ if(busch[i].length) WA.viele(par,kugelGeo,busch[i]); });
  /* große Stämme gleich am Rand */
  const hinten=gruppe(sc,0,0,0);
  [[-17,-16.5,7.4,0],[-12,-17.5,6.4,1],[-6.5,-16,7,0],[-1,-18,6.2,1],[4,-16.4,6.8,0],[5.8,-20,5.6,1],[17,-16,7.2,1],[23,-18,6.4,0]].forEach(([x,z,h,a])=>a?WA.laubbaum(hinten,x,z,h):WA.tanne(hinten,x,z,h));
  ohneSchatten(hinten); verschmelze(hinten);
  [[links,-1],[rechts,1]].forEach(([w,s])=>{ const g=gruppe(w,0,0,0);
    [[20.6,-11,6.6,0],[21.4,-4.5,5.8,1],[20.4,2,7,0],[21.8,8,5.4,1]].forEach(([x,z,h,a])=>a?WA.laubbaum(g,s*x,z+s*.8,h):WA.tanne(g,s*x,z+s*.8,h));
    for(let i=0;i<9;i++) WA.farn(g,s*(18.7+(i%2)*.5),-11.5+i*3.1+(s>0?1:0),.9+(i%3)*.2);
    ohneSchatten(g); verschmelze(g); });
  /* Hügel in der Ferne */
  const berge=gruppe(sc,0,0,0);
  [[-52,-62,30,9,0x94bca0],[-12,-76,34,11,0xa6c8b4],[30,-72,30,8,0x9cc2a8],[66,-40,26,9,0x94bca0],[-70,-18,24,8,0x9cc2a8],[68,10,22,7,0xa6c8b4],[-68,24,22,7,0x94bca0]].forEach(([x,z,r,h,f])=>ball(berge,1,f,x,-.4,z,r,h,r*.55));
  ohneSchatten(berge); verschmelze(berge);
}

/* ---------- Morgennebel: zarte, langsam ziehende Schwaden ---------- */
function nebel(k){
  const t=bild(256,128,g=>{ for(let i=0;i<9;i++){ const x=52+(i*47)%150, y=52+(i*23)%28, v=g.createRadialGradient(x,y,0,x,y,50); v.addColorStop(0,'rgba(255,255,255,.4)'); v.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=v; g.fillRect(0,0,256,128); } });
  [[-20,1.6,-19,17,4,.55],[-3,1.3,-21,20,3.6,.5],[22,1.7,-22,18,4.2,.55],[8,2.4,-32,26,5,.6],[-22,2.2,-36,28,5,.6],[28,2,-40,26,5,.55],[-24,1,-6,10,2,.4],[24,1,3,10,2,.4],[-12,.55,-9.5,9,1.2,.2],[1,.45,-5,8,1,.15],[-6,.45,4.5,8,1,.13],[7,.5,1,7,1,.13],[-16,.8,9,8,1.5,.22],[17,.7,-3,7,1.4,.2]].forEach(([x,y,z,w,h,a],i)=>{
    const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,opacity:a,depthWrite:false})); s.position.set(x,y,z); s.scale.set(w,h,1); k.scene.add(s);
    k.anim.push(u=>{ s.position.x=x+Math.sin(u*.09+i*1.9)*3; s.material.opacity=a*(.85+Math.sin(u*.23+i)*.15); }); });
  /* Nebel über dem Weg: flache Schleier dicht über dem Boden, dazu wenige niedrige Schwaden; Gegenstände bleiben frei */
  [[10.2,-8.8,6,3.6,.7],[6.4,-6.2,6.5,3.6,.65],[2.8,-3.2,7,4,.75],[1.4,.8,7.5,4,.65],[1.6,5,6.5,3.6,.65],[2.8,9.4,7,4,.55]].forEach(([x,z,w,h,a],i)=>{
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),basis(0xffffff,{map:t,transparent:true,opacity:a,depthWrite:false})); m.rotation.x=-Math.PI/2; m.rotation.z=(i%2?.4:-.5); m.position.set(x,.24+(i%3)*.05,z); k.scene.add(m);
    k.anim.push(u=>{ m.position.x=x+Math.sin(u*.14+i*2.3)*1.1; m.material.opacity=a*(.85+Math.sin(u*.3+i)*.15); }); });
  [[7.8,.7,-8,5,1.3,.34],[3.6,.5,-2.4,5.5,1,.26],[.6,.45,2.8,5,.9,.2]].forEach(([x,y,z,w,h,a],i)=>{
    const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,opacity:a,depthWrite:false})); s.position.set(x,y,z); s.scale.set(w,h,1); k.scene.add(s);
    k.anim.push(u=>{ s.position.x=x+Math.sin(u*.17+i*2.7)*1.3; }); });
}

/* ---------- Tiere ---------- */
function hase(k,weg,start){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), r=gruppe(g,0,0,0), F=0xb08c68;
  ball(r,.26,F,0,.3,0,1.35,.95,.95); ball(r,.18,F,.33,.54,0); ball(r,.11,WA.WEISS,-.36,.37,0);
  [-1,1].forEach(s=>{ ball(r,.065,F,.26,.82,s*.08,.7,2.7,.8); ball(r,.032,0xe8a8a0,.3,.82,s*.08,.4,3.5,.8); ball(r,.03,WA.SCHWARZ,.47,.59,s*.1); ball(r,.095,F,.22,.09,s*.14,1.3,.7,.8); ball(r,.15,F,-.13,.15,s*.19,1.3,.9,.7); });
  ball(r,.032,0xe8808a,.51,.52,0);
  verschmelze(r); laeufer(k,g,weg,.9,start,7);
}
function reh(k,x,z,dreh,gr){
  const g=gruppe(k.scene,x,0,z), F=0xb4743c; g.rotation.y=dreh; g.scale.setScalar(gr);
  const r=gruppe(g,0,0,0);
  ball(r,.48,F,0,1.05,0,1.6,.85,.75); ball(r,.2,0xf0dcc0,-.74,1.12,0,.6,1,1);
  [[.5,.24],[.5,-.24],[-.5,.24],[-.5,-.24]].forEach(p=>{ strich(r,[p[0],.95,p[1]],[p[0]+.03,.06,p[1]],.065,F); ball(r,.075,WA.SCHWARZ,p[0]+.05,.05,p[1],1.1,.7,1); });
  [[-.3,.25],[.05,.31],[.35,.27],[-.05,.15]].forEach(([a,b])=>[-1,1].forEach(s=>ball(r,.04,WA.CREME,a,1.2+b*.4,s*(.31-b*.15))));
  verschmelze(r);
  const hals=gruppe(g,.58,1.2,0), h=gruppe(hals,0,0,0);
  strich(h,[0,0,0],[.36,.62,0],.14,F); ball(h,.2,F,.46,.72,0,1.15,.95,.9); ball(h,.11,F,.68,.66,0,1.4,.8,.85); ball(h,.05,WA.SCHWARZ,.83,.68,0);
  [-1,1].forEach(s=>{ const o=kegel(h,.09,.32,F,.38,1.0,s*.17); o.rotation.x=s*.5; ball(h,.035,WA.SCHWARZ,.58,.79,s*.15); });
  verschmelze(h);
  k.anim.push(t=>{ const u=Math.max(0,Math.min(1,Math.sin(t*.45+x)*1.8)); hals.rotation.z=-u*1.55; });
}
function tiere(k){
  const sc=k.scene;
  hase(k,[[-7.2,1.6],[-4,2.8],[-4.4,5.2],[-8.6,4.2]],0);
  reh(k,-3.5,-13.8,-.12,1.1); reh(k,19.9,-13.6,2.5,.85);
  WA.fuchs(k,sc,-15.6,-2.2,.35,{ sitzt:true, gr:1.1 }); k.kreis(-15.6,-2.2,.7);
  WA.eichhorn(k,sc,15.1,0,10.2,-2.4,1.15,1);
  /* Singvögel auf dem Boden */
  [[-6.2,11.4,.4,0x4a78b8],[7.4,-6.6,2.6,0xb8543a],[15.2,5,3.4,0xc8a030]].forEach(([x,z,d,f],i)=>{ const v=WA.vogel(k.scene,x,0,z,d,f); k.anim.push(t=>{ v.g.position.y=Math.max(0,Math.sin(t*4+i*2)-.6)*.35; v.g.rotation.z=-Math.max(0,Math.sin(t*2.3+i))*.4; }); });
  /* fliegende Vögel hinten über dem Waldrand */
  for(let i=0;i<5;i++){ const g=gruppe(sc,0,4,-17), m=basis(i%2?0x35507a:0x5a3a2a);
    ball(g,.14,m,0,0,0,2,.75,.75).castShadow=false; ball(g,.1,m,.28,.07,0).castShadow=false;
    const fl=[-1,1].map(s=>{ const f=gruppe(g,0,0,0); box(f,.22,.03,.55,m,-.02,0,s*.33).castShadow=false; return f; });
    const w0=i*1.35, r=7+(i%3)*2.2;
    k.anim.push(t=>{ const w=t*.28+w0; g.position.set(-2+Math.cos(w)*r*1.5,3.7+(i%3)*.55+Math.sin(t*1.3+i)*.25,-15.5+Math.sin(w)*r*.45); g.rotation.y=Math.atan2(-Math.cos(w)*r*.45,-Math.sin(w)*r*1.5); const s=Math.sin(t*8+i)*.65; fl[0].rotation.x=s; fl[1].rotation.x=-s; }); }
  [[-6,1.3,-8,0xff9a2a],[6.5,1.5,2,0x5aa8f0],[-12,1.4,10,WA.GELB],[14,1.3,-3.5,0xf06ab0]].forEach(([x,y,z,f],i)=>WA.falter(k,x,y,z,f,i*1.7,1.4));
}

/* ---------- Ausstattung auf der Lichtung ---------- */
function ausstattung(k){
  const sc=k.scene;
  /* Bäume am Rand der Lichtung, werden vor der Figur durchsichtig */
  [[-16.6,-11.7,6.4,0],[-7.6,-12.1,5.6,1],[-.9,-12.3,5,0],[-16.6,.6,5.4,1],[-16.4,11.2,4.6,0],[16.5,-6.8,5.8,0],[16.6,11.3,4.4,1],[16.9,-12.2,6,1]].forEach(([x,z,h,a])=>{
    const g=gruppe(sc,0,0,0); if(a) WA.laubbaum(g,x,z,h); else WA.tanne(g,x,z,h); verschmelze(g); k.verdecker(g,x,z,h*.22); k.kreis(x,z,a?.5:h*.2); });
  /* Büsche, Farne, kleine Steine (alle fest) */
  const g=gruppe(sc,0,0,0);
  [[-17,-7.6,.6],[-17,5.6,.55],[17,-2,.6],[17,6.2,.5],[-11.4,-12.4,.65],[6.2,-12.4,.6],[-13,12.6,.45],[13,12.5,.45],[-5.8,-12.4,.5]].forEach(([x,z,r])=>{ WA.busch(g,x,z,r); k.kreis(x,z,r*1.35); });
  [[-14.6,-12.2,1.1],[-9.4,-11.2,.8],[-16.8,-3.8,1],[-16.8,8.4,.9],[16.9,-10,1],[16.8,.4,.85],[16.6,8.6,.9],[.7,-12.6,.9],[-9.8,12.4,.7],[6,12.6,.7],[-5.4,-9.4,.7],[7.4,-10.8,.75]].forEach(([x,z,s])=>{ WA.farn(g,x,z,s); k.kreis(x,z,s*.45); });
  [[-6,-2.4,.27],[8,.4,.25],[-12.4,1.6,.3],[5,11.6,.24],[14.6,-8.8,.32],[-14.8,9.4,.28],[4.8,5.2,.2]].forEach(([x,z,r])=>{ WA.stein(g,x,z,r,false); k.kreis(x,z,r*1.25); });
  verschmelze(g);
  /* Gras, Blumen, Herbstblätter, Zapfen und Zweige (flach, ohne Hindernis) */
  const frei=(x,z)=>!gegenstaende.some(d=>Math.hypot(d.x-x,d.z-z)<2) && !(Math.abs(x-1.8)<1.5 && z>-1) && !(Math.abs(x-EX)<2.8 && z<-8);
  WA.wiesenschmuck(sc,-17.8,17.8,-13.2,13.3,620,0,frei);
  WA.wiesenschmuck(sc,-26,26,14,26,360,0);
  const blueten=[], stiele=[];
  for(let i=0;i<240;i++){ const vorn=i>=150, x=vorn?-26+zufall()*52:-17.8+zufall()*35.6, z=vorn?14+zufall()*12:-13.2+zufall()*26.5; if(!vorn && !frei(x,z)) continue; blueten.push([x,.15,z,.07,.048,.07,[WA.WEISS,WA.GELB,0xf07a9a,0xb08ae0][i%4]]); stiele.push([x,.07,z,.018,.14,.018,WA.LAUB3]); }
  WA.viele(sc,KUGEL(),blueten); WA.viele(sc,GEO.box,stiele);
  const blaetter=[], zweige=[], buschel=[];
  for(let i=0;i<230;i++){ const x=-17.6+zufall()*35.2, z=-13+zufall()*26; blaetter.push([x,.025+(i%3)*.006,z,.13,.012,.08,[0xd8902c,0xb8642a,0xc8b43c,0x8aa83a][i%4],zufall()*6.28]); }
  for(let i=0;i<46;i++){ const x=-17+zufall()*34, z=-12.6+zufall()*25; if(!frei(x,z)) continue; zweige.push([x,.04,z,.4+zufall()*.35,.035,.04,i%2?WA.RINDE:WA.HOLZ,zufall()*6.28]); }
  for(let i=0;i<90;i++){ const x=-17.6+zufall()*35.2, z=-13.1+zufall()*26.2; if(!frei(x,z)) continue; for(let j=0;j<6;j++){ const a=j*1.05+i, h=.22+zufall()*.2; buschel.push([x+Math.cos(a)*.13,h/2,z+Math.sin(a)*.13,.045,h,.045,[0x4a8a2a,0x5e9e34,0x8ac24a][(i+j)%3],0,Math.sin(a)*.38,-Math.cos(a)*.38]); } }
  WA.viele(sc,new THREE.OctahedronGeometry(1),blaetter).castShadow=false; WA.viele(sc,GEO.box,zweige); WA.viele(sc,new THREE.ConeGeometry(1,1,6),buschel);
}

/* ---------- Gegenstände ---------- */
/* 1 Wegweiser mit leeren Brettern (keine Pfeile, keine Schrift) */
function wegweiser(g){
  walze(g,.15,3,WA.HOLZ2,0,1.5,-.12); kegel(g,.23,.3,WA.HOLZ3,0,3.14,-.12);
  [[2.6,-.22,.05],[2.04,.24,-.04],[1.48,-.12,.03]].forEach(([y,x,d])=>{ const b=gruppe(g,x,y,.08); b.rotation.z=d;
    box(b,1.9,.44,.12,0xd2a668,0,0,0); [-.21,.21].forEach(v=>box(b,1.96,.05,.15,WA.HOLZ,0,v,0)); [-.96,.96].forEach(v=>box(b,.08,.47,.15,WA.HOLZ,v,0,0));
    [-.78,.78].forEach(v=>ball(b,.045,WA.EISEN,v,0,.08,1,1,.6)); box(b,.7,.016,.01,0xb0844c,.1,.08,.062); box(b,.5,.016,.01,0xb0844c,-.25,-.09,.062); });
  [[.32,.1],[-.3,.16],[.04,-.4]].forEach(([x,z],i)=>ball(g,.2-i*.02,WA.STEIN2,x,.09,z,1.1,.7,1));
}
/* 2 Pilzgruppe */
function pilzgruppe(g){
  ball(g,1.05,WA.MOOS,0,0,0,1.1,.13,.9);
  WA.pilz(g,0,0,-.2,3.1); WA.pilz(g,.85,0,.25,2.1); WA.pilz(g,-.82,0,.2,1.8,0xa8682e); WA.pilz(g,.15,0,.68,1.15); WA.pilz(g,-.35,0,.62,.8,0xa8682e); WA.pilz(g,.65,0,-.55,1.3,0xe08a2a);
}
/* 3 Baumstumpf mit Ringen */
function baumstumpf(g){
  rohr(g,.88,1.02,.9,WA.RINDE,0,.45,0,22,true);
  for(let i=0;i<16;i++){ const a=i/16*Math.PI*2; strich(g,[Math.cos(a)*1.02,.05,Math.sin(a)*1.02],[Math.cos(a)*.9,.87,Math.sin(a)*.9],.05,i%2?WA.RINDE2:WA.RINDE); }
  [0,1.3,2.5,3.7,5].forEach(a=>{ strich(g,[Math.cos(a)*.7,.42,Math.sin(a)*.7],[Math.cos(a)*1.4,.05,Math.sin(a)*1.4],.15,WA.RINDE); ball(g,.15,WA.RINDE2,Math.cos(a)*1.4,.06,Math.sin(a)*1.4,1,.6,1); });
  const t=bild(256,256,c=>{ c.fillStyle='#ecc888'; c.fillRect(0,0,256,256); c.strokeStyle='#8a5a28';
    for(let i=1;i<=7;i++){ c.lineWidth=i===7?9:4.5; c.beginPath(); c.ellipse(128+(7-i)*2.5,128-(7-i)*1.5,i*17,i*17-(i%2)*3,0,0,6.283); c.stroke(); }
    c.fillStyle='#7a4c20'; c.beginPath(); c.arc(143,119,6,0,6.283); c.fill(); c.lineWidth=3; c.beginPath(); c.moveTo(146,122); c.lineTo(236,168); c.stroke(); });
  const m=new THREE.Mesh(new THREE.CircleGeometry(.9,32),new THREE.MeshLambertMaterial({map:t})); m.rotation.x=-Math.PI/2; m.position.y=.905; m.receiveShadow=true; g.add(m);
  ring(g,.89,.05,WA.RINDE2,0,.9,0).rotation.x=Math.PI/2;
  ball(g,.3,WA.MOOS,-.85,.2,.55,1.2,.7,1); strich(g,[.9,.3,.45],[1.1,.65,.55],.025,WA.LAUB3); ball(g,.13,WA.LAUB2,1.15,.7,.56,1.2,.3,.8); ball(g,.1,WA.LAUB2,.98,.6,.62,1.2,.3,.8);
}
/* 4 großer Moosstein */
function moosstein(g){
  ball(g,1.15,WA.STEIN,0,.7,0,1.2,.98,.95); ball(g,.7,WA.STEIN2,.95,.35,.3,1,.8,.9); ball(g,.5,WA.STEIN2,-1.1,.25,.35,1,.7,1);
  ball(g,1.0,WA.MOOS,-.08,1.45,-.02,1.2,.48,1); ball(g,.55,WA.MOOS2,-.55,1.5,.38,1,.55,.9); ball(g,.45,WA.MOOS2,.55,1.55,.1,1.1,.45,1); ball(g,.38,WA.MOOS,1.05,.72,.55,1,.4,.8);
  [[-.85,1.05,.75,.26],[-.3,1.22,.93,.2],[.35,1.33,.82,.17]].forEach(([x,y,z,r])=>ball(g,r,WA.MOOS,x,y,z,1,1.15,.45));
  [[-.5,1.86,.3],[-.2,1.97,.12],[.12,1.93,.35],[.5,1.82,.4],[-.75,1.72,.52]].forEach(([x,y,z],i)=>{ strich(g,[x,y-.2,z],[x,y,z],.014,WA.LAUB3); ball(g,.07,WA.WEISS,x,y+.02,z,1,.55,1); ball(g,.03,WA.GELB,x,y+.06,z); });
}
/* 5 Brombeerstrauch mit Beeren und gebogenen Ranken */
function brombeere(g){
  const blatt=0x2f6e30, blatt2=0x44883a, blatt3=0x57983e;
  const einBlatt=(x,y,z,gr,i)=>{ const b=ball(g,gr,[blatt2,blatt3,blatt][i%3],x,y,z,1.25,.32,.8); b.rotation.set(.5+(i%3)*.2,i*1.7,(i%2?.4:-.4)); };
  [[0,.75,0,.8],[-.72,.58,.08,.58],[.75,.6,0,.6],[-.2,1.22,-.15,.5],[.35,1.15,.05,.48],[0,.48,.5,.5]].forEach(([x,y,z,r],i)=>ball(g,r,i%2?blatt2:blatt,x,y,z,1.05,.88,.95));
  for(let i=0;i<110;i++){ const a=zufall()*6.283, h=zufall(), r=1.28*Math.sqrt(1-h*h*.72); einBlatt(Math.cos(a)*r,.18+h*1.5,Math.sin(a)*r*.72,.1+zufall()*.05,i); }
  /* Ranken: weich gebogen, aus dem Strauch heraus und wieder nach unten */
  [[[-.4,.9,.15],[-1.1,2.35,.3],[-1.75,.55,.55]],[[.4,.9,-.1],[1.2,2.4,0],[1.8,.7,.4]],[[-.2,1.1,0],[-.5,2.6,.1],[.55,1.85,.9]],[[.2,1,-.2],[.35,2.45,-.4],[1.35,2,-.15]],[[0,.8,.3],[-.55,1.75,1.25],[-1.2,.3,1.05]]].forEach(([A,M,E],n)=>{
    let alt=A;
    for(let i=1;i<=9;i++){ const u=i/9, q=[0,1,2].map(j=>(1-u)*(1-u)*A[j]+2*(1-u)*u*M[j]+u*u*E[j]); strich(g,alt,q,.028-u*.014,0x7a3a2a);
      if(i>2){ kegel(g,.018,.085,0x5a2a1a,q[0],q[1]+.05,q[2]); const s=i%2?1:-1; einBlatt(q[0]+s*.1,q[1]-.02,q[2]+s*.05,.12-u*.03,i+n); }
      alt=q; }
    einBlatt(E[0],E[1],E[2],.11,n); });
  [[-.7,.95,.72,0],[-.2,1.2,.88,0],[.42,.82,.94,0],[.9,.98,.62,1],[.05,.55,1.12,0],[-.95,.55,.72,1],[.15,1.55,.55,1],[.68,1.42,.52,0],[-.55,1.45,.48,0],[1.28,.55,.56,0],[-.42,.62,1.02,0],[-1.3,.85,.52,0],[-.05,1.75,.3,0]].forEach(([x,y,z,f],i)=>{
    const c=f?0xb81e30:0x24102e; [[0,0,0],[.09,-.02,.02],[-.085,-.025,.01],[.04,-.1,.03],[-.045,-.095,.025],[.005,-.05,.08],[0,.07,.01]].forEach(p=>ball(g,.072,c,x+p[0],y+p[1],z+p[2])); ball(g,.022,0xd8c8f0,x-.025,y+.01,z+.15); ball(g,.07,0x6aa040,x,y+.13,z,1.3,.35,1); });
  [[-.45,.9,.95],[.62,1.18,.8],[.95,.5,.84]].forEach(([x,y,z])=>{ for(let i=0;i<5;i++) ball(g,.055,WA.WEISS,x+Math.cos(i*1.257)*.07,y+Math.sin(i*1.257)*.07,z,1,1,.4); ball(g,.035,WA.GELB,x,y,z+.03); });
  leicht(g);
}
/* 6 Vogelhäuschen auf einem Pfosten */
function vogelhaus(g,k){
  walze(g,.11,1.55,WA.HOLZ2,0,.775,0); [-1,1].forEach(s=>strich(g,[0,1.1,0],[s*.45,1.52,0],.05,WA.HOLZ2));
  box(g,1.4,.1,1.15,WA.HOLZ,0,1.58,0);
  box(g,.9,.78,.72,0xd8a45a,0,2.02,-.08);
  [.42,.2].forEach((b,i)=>box(g,b*2,.2,.7,0xd8a45a,0,2.49+i*.19,-.08));
  [-1,1].forEach(s=>{ const d=box(g,.82,.1,1.04,0xb0402c,s*.31,2.67,-.05); d.rotation.z=-s*.72; }); box(g,.13,.12,1.08,0x782418,0,2.94,-.05);
  walze(g,.21,.05,WA.HOLZ2,0,2.1,.29).rotation.x=Math.PI/2; walze(g,.16,.06,0x1a0e06,0,2.1,.305).rotation.x=Math.PI/2; walze(g,.03,.3,WA.HOLZ3,0,1.83,.4).rotation.x=Math.PI/2;
  for(let i=0;i<11;i++) ball(g,.028,i%2?0xe8c456:0x8a6a2a,-.55+(i%6)*.21,1.65,.4+(i%2)*.09);
  const a=WA.vogel(g,0,2.98,.2,-.8,0x3a78c0,WA.GELB), b=WA.vogel(g,.48,1.63,.36,-2.4,0xa8603a,0xf08a50); a.g.scale.setScalar(1.2);
  k.anim.push(t=>{ a.g.position.y=2.98+Math.max(0,Math.sin(t*1.7)-.7)*.5; a.g.rotation.y=-.8+Math.sin(t*.8)*.8; b.g.rotation.z=-Math.max(0,Math.sin(t*2.9))*.4; a.fluegel.forEach((f,i)=>f.rotation.x=(i?-1:1)*Math.max(0,Math.sin(t*1.7)-.7)*3*Math.abs(Math.sin(t*14))); });
}
/* 7 Schild mit Tierspuren */
function spurenschild(g){
  [-.9,.9].forEach(x=>box(g,.18,1.5,.16,WA.HOLZ2,x,.75,-.06));
  box(g,2.25,1.4,.12,WA.HOLZ,0,1.65,0);
  const t=bild(512,308,c=>{
    c.fillStyle='#f6e8c0'; c.fillRect(0,0,512,308); c.fillStyle='#5a3a1c'; c.strokeStyle='#5a3a1c'; c.lineCap='round';
    const oval=(x,y,a,b,d)=>{ c.beginPath(); c.ellipse(x,y,a,b,d||0,0,6.283); c.fill(); };
    /* Pfoten */
    [[76,236],[118,160],[72,84]].forEach(([x,y])=>{ oval(x,y+9,19,15); [[-23,-12],[-9,-26],[10,-26],[24,-12]].forEach(([a,b])=>oval(x+a,y+b,8,10)); });
    /* Rehhufe */
    [[234,222],[278,146],[232,72]].forEach(([x,y])=>{ [-1,1].forEach(s=>{ c.beginPath(); c.moveTo(x+s*4,y-30); c.quadraticCurveTo(x+s*30,y,x+s*18,y+24); c.quadraticCurveTo(x+s*5,y+30,x+s*4,y+12); c.closePath(); c.fill(); }); });
    /* Vogelfüße */
    c.lineWidth=7; [[396,234],[444,160],[392,84]].forEach(([x,y])=>{ c.beginPath(); c.moveTo(x,y+26); c.lineTo(x,y-28); c.moveTo(x,y); c.lineTo(x-24,y-22); c.moveTo(x,y); c.lineTo(x+24,y-22); c.stroke(); });
  });
  WA.tafel(g,t,2.02,1.2,0,1.65,.07);
  [[0,2.3,2.35,.13],[0,1.0,2.35,.13],[-1.08,1.65,.13,1.38],[1.08,1.65,.13,1.38]].forEach(([x,y,w,h])=>box(g,w,h,.2,WA.HOLZ3,x,y,.02));
  [-1,1].forEach(s=>{ const d=box(g,1.35,.1,.5,0x3f6a3a,s*.62,2.52,0); d.rotation.z=-s*.2; ball(g,.18,WA.LAUB2,s*.9,.09,.12,1.3,.8,1); });
}
/* ein Schmetterling: weit = 0 sitzt mit hochgestellten Flügeln, sonst flattert er umher */
function schmetterling(g,k,x,y,z,farbe,phase,weit){
  const s=gruppe(g,x,y,z); s.userData.lebendig=true; s.scale.setScalar(weit?.75:.65); s.rotation.y=weit?0:1.15;
  walze(s,.022,.26,WA.SCHWARZ,0,0,0).rotation.x=Math.PI/2;
  [-1,1].forEach(v=>{ strich(s,[0,0,.11],[v*.08,.12,.21],.007,WA.SCHWARZ); ball(s,.018,WA.SCHWARZ,v*.08,.12,.21); });
  const fl=[-1,1].map(v=>{ const f=gruppe(s,0,.01,0); ball(f,.16,farbe,v*.16,0,.07,1.1,.07,.85); ball(f,.1,farbe,v*.11,0,-.11,1,.07,.95); ball(f,.04,WA.WEISS,v*.24,0,.09,1,.3,1); verschmelze(f); return f; });
  k.anim.push(t=>{ const a=weit?.15+Math.abs(Math.sin(t*9+phase)):1.2+Math.sin(t*1.8+phase)*.22; fl[0].rotation.z=-a; fl[1].rotation.z=a;
    if(weit){ s.position.set(x+Math.sin(t*.7+phase)*weit,y+Math.sin(t*1.8+phase)*.22,z+Math.cos(t*1.1+phase)*weit*.5); s.rotation.y=Math.sin(t*.7+phase)*1.2; } });
}
/* 8 Bank mit Schmetterlingen */
function bank(g,k){
  [-1.15,1.15].forEach(x=>{ box(g,.18,.62,.18,WA.HOLZ3,x,.31,.3); box(g,.18,1.55,.18,WA.HOLZ3,x,.775,-.35); box(g,.16,.14,.82,WA.HOLZ2,x,.56,-.02); box(g,.2,.1,.8,WA.HOLZ2,x,.95,0); box(g,.12,.34,.12,WA.HOLZ3,x,.77,.32); });
  [-.2,.06,.32].forEach(z=>box(g,2.65,.11,.23,0xc08a4e,0,.67,z));
  [1.08,1.4].forEach(y=>box(g,2.65,.24,.1,0xc08a4e,0,y,-.28));
  schmetterling(g,k,-.75,1.57,-.26,0xf08a24,.3);
  schmetterling(g,k,.5,.77,.2,0x3a8ae0,2.1);
  schmetterling(g,k,-.35,2.0,.2,0x9a4ac8,1,.55);
  schmetterling(g,k,.85,2.25,0,WA.GELB,3.3,.45);
}
/* 9 Ameisenhaufen mit krabbelnden Ameisen */
const AR=1.45, AH=1.35;
const haufenHoehe=r=>AH*(1-Math.pow(Math.min(1,r/AR),1.5));
function ameisenhaufen(g,k){
  const profil=[[1.45,0],[1.28,.22],[1.05,.52],[.8,.79],[.55,1.04],[.3,1.22],[.12,1.31],[0,1.33]].map(p=>new THREE.Vector2(p[0],p[1]));
  teil(g,new THREE.LatheGeometry(profil,24),mat(0xb07c40,{side:THREE.DoubleSide}),0,0,0,1,1,1);
  const nadeln=[];
  for(let i=0;i<300;i++){ const a=zufall()*6.283, r=.08+Math.sqrt(zufall())*1.5; nadeln.push([Math.cos(a)*r,haufenHoehe(r)+.015,Math.sin(a)*r,.2+zufall()*.14,.022,.025,[0x7a5026,0xd0a05c,0x8e6230,0xe0bc7c][i%4],zufall()*6.283,0,(zufall()-.5)*.5]); }
  WA.viele(g,GEO.box,nadeln);
  /* Eingänge */
  [[.4,.6],[2.2,.9],[1.3,.35]].forEach(([a,r])=>ball(g,.09,0x2a1606,Math.cos(a)*r,haufenHoehe(r)+.01,Math.sin(a)*r,1,.45,1));
  const N=20, weiss=mat(0xffffff), kugel=new THREE.SphereGeometry(1,8,6), leib=new THREE.InstancedMesh(kugel,weiss,N*3), beine=new THREE.InstancedMesh(GEO.box,weiss,N*3), farbe=new THREE.Color();
  for(let i=0;i<N*3;i++){ leib.setColorAt(i,farbe.set(i%3===1?0x5a140a:0x160a06)); beine.setColorAt(i,farbe.set(0x160a06)); }
  leib.frustumCulled=false; beine.frustumCulled=false; g.add(leib); g.add(beine);
  const o=new THREE.Object3D(), t0=new THREE.Object3D(), M=new THREE.Matrix4(); o.rotation.order='YXZ';
  /* Ringe auf dem Haufen: gleiches Tempo je Ring, so bleibt immer Abstand. [Radius, Anzahl, Richtung] */
  const bahnen=[]; [[.45,2,1],[.75,3,-1],[1.05,4,1],[1.3,5,-1]].forEach(([r,n,d],j)=>{ for(let i=0;i<n;i++) bahnen.push([r,i/n*6.283+j*.8,d]); });
  k.anim.push(t=>{
    for(let i=0;i<N;i++){ let x,y,z;
      if(i<bahnen.length){ const [r,a0,dir]=bahnen[i], a=a0+dir*t*.26/r, neig=Math.atan(1.5*AH/AR*Math.sqrt(r/AR)); x=Math.cos(a)*r; z=Math.sin(a)*r; y=haufenHoehe(r)+.075;
        o.rotation.set(0,dir>0?-a:Math.PI-a,dir>0?-neig:neig); }
      else { /* Ameisenstraße nach vorn rechts: zwei Spuren, je drei Tiere */ const j=i-bahnen.length, hin=j%2, u=(t*.1+Math.floor(j/2)/3+hin*.17)%1, v=hin?u:1-u, q=hin?.17:-.17; x=1.0+v*1.15+q*.65; z=.8+v*.95-q*.76; y=.06+haufenHoehe(Math.hypot(x,z));
        o.rotation.set(0,Math.atan2(hin?1.15:-1.15,hin?.95:-.95),0); }
      o.position.set(x,y,z); o.updateMatrix();
      [[.13,.036,.032,.045],[.005,.022,.022,.058],[-.15,.038,.034,.072]].forEach((e,j)=>{ t0.position.set(0,j===2?.012:0,e[0]); t0.scale.set(e[1],e[2],e[3]); t0.rotation.set(0,0,0); t0.updateMatrix(); leib.setMatrixAt(i*3+j,M.multiplyMatrices(o.matrix,t0.matrix)); });
      [-1,0,1].forEach((v,j)=>{ t0.position.set(0,-.025,v*.05); t0.scale.set(.22,.008,.009); t0.rotation.set(0,v*.55+Math.sin(t*14+i+j*2)*.25,0); t0.updateMatrix(); beine.setMatrixAt(i*3+j,M.multiplyMatrices(o.matrix,t0.matrix)); });
    }
    leib.instanceMatrix.needsUpdate=true; beine.instanceMatrix.needsUpdate=true;
  });
}
/* 10 Insektenhotel */
function insektenhotel(g,k){
  const R=0xa0703c, D=0x1e1006;
  [-1,1].forEach(s=>box(g,.18,.75,.4,WA.HOLZ3,s*.9,.37,0));
  box(g,2.15,1.75,.14,WA.HOLZ3,0,1.57,-.24);
  [[0,.72,2.2,.12],[0,2.42,2.2,.12],[0,1.57,2.2,.09],[-1.05,1.57,.12,1.8],[1.05,1.57,.12,1.8],[-.35,1.14,.09,.85],[.35,2,.09,.85]].forEach(([x,y,w,h])=>box(g,w,h,.58,R,x,y,.02));
  [-1,1].forEach(s=>{ const d=box(g,1.45,.12,.85,0x3f6a3a,s*.65,2.74,.02); d.rotation.z=-s*.4; });
  box(g,1.3,.18,.14,R,0,2.54,.1);
  /* Bambusröhrchen */
  const rohre=(x0,y0,nx,ny)=>{ for(let j=0;j<ny;j++) for(let i=0;i<nx-(j%2);i++){ const x=x0+i*.19+(j%2)*.095, y=y0+j*.17; walze(g,.092,.46,(i+j)%2?0xe0bc6c:0xc89c50,x,y,.05).rotation.x=Math.PI/2; walze(g,.048,.03,D,x,y,.29).rotation.x=Math.PI/2; } };
  rohre(-.9,.88,3,4); rohre(.52,1.72,3,4);
  /* Holzklotz mit Löchern */
  box(g,1.2,.68,.44,0xe4bc84,.37,1.16,.02);
  for(let j=0;j<3;j++) for(let i=0;i<5;i++) walze(g,i%2?.05:.065,.03,D,-.08+i*.22+(j%2)*.05,.97+j*.2,.245).rotation.x=Math.PI/2;
  /* Zapfen */
  for(let i=0;i<9;i++){ const x=-.86+(i%3)*.22, y=1.76+Math.floor(i/3)*.22; ball(g,.1,i%2?0x7a4a22:0x96602c,x,y,.1,1,1.15,1); for(let j=0;j<4;j++) ball(g,.035,0xc0884c,x+Math.cos(j*1.57+i)*.06,y+Math.sin(j*1.57+i)*.07,.2); }
  /* Stroh */
  for(let i=0;i<46;i++){ const x=-.24+zufall()*.48, y=1.68+zufall()*.64; strich(g,[x-.05,y-.04,.05+zufall()*.18],[x+.05,y+.05,.08+zufall()*.18],.016,i%2?0xf0d070:0xd0a840); }
  /* Bienen */
  [0,1,2].forEach(i=>{ const b=gruppe(g,0,1.8,.7); b.userData.lebendig=true; ball(b,.085,WA.GELB,0,0,0,1.35,1,1); [-.035,.05].forEach(x=>ball(b,.086,WA.SCHWARZ,x,0,0,.22,1.02,1.02)); ball(b,.058,WA.SCHWARZ,.13,.01,0);
    const fl=[-1,1].map(s=>{ const f=gruppe(b,0,.06,0); ball(f,.07,basis(0xeaf6ff,{transparent:true,opacity:.8,depthWrite:false}),-.01,.03,s*.07,1,.15,1.1); return f; });
    k.anim.push(t=>{ const w=t*(1.1+i*.23)+i*2.1; b.position.set(Math.cos(w)*(1.05+i*.12),1.55+i*.35+Math.sin(w*2.3)*.18,.65+Math.sin(w)*.3); b.rotation.y=Math.atan2(-Math.cos(w)*.3,-Math.sin(w)*1.1); const a=Math.sin(t*38+i)*.6; fl[0].rotation.x=a; fl[1].rotation.x=-a; }); });
  leicht(g);
}

const verstecke=[[-16.3,-9.2],[-10.6,-8.4],[-6.4,-5],[-.4,-9.6],[6.2,-8.6],[13.6,-8.4],[14.6,-2.2],[9.4,-1.2],[15,6.4],[12.6,10.4],[5.6,8.8],[3.8,3.8],[-4.6,11.8],[-11,11],[-14.8,.2],[-10.2,.8],[-2.4,-.6],[1.6,-5.6],[-12.6,-1.2],[11,-5]];
const gegenstaende=[
  { x:-1.7, z:-6.4, steh:[-1.6,-4.6], r:.5, treffer:[2.5,3.3,.8], baue:wegweiser },
  { x:-9.4, z:-3.4, steh:[-8.8,-1.3], r:1.25, treffer:[2.8,2,2.1], baue:pilzgruppe },
  { x:6, z:-3.6, steh:[5.4,-1.5], r:1.25, treffer:[2.6,1.4,2.3], baue:baumstumpf },
  { x:-13, z:5.4, steh:[-10.8,6.4], r:1.55, treffer:[3.3,2.2,2.4], baue:moosstein },
  { x:13, z:2.6, steh:[10.8,3.4], r:1.5, treffer:[3.3,2.3,2.2], baue:brombeere },
  { x:-13.4, z:-6.6, dreh:.3, steh:[-12.4,-4.9], r:.55, treffer:[1.7,3.3,1.3], baue:vogelhaus },
  { x:-7.2, z:7.6, dreh:.15, steh:[-6.9,9.5], kasten:[2.4,.9], treffer:[2.5,2.7,.8], baue:spurenschild },
  { x:9, z:6.4, dreh:-.15, steh:[8.6,8.4], kasten:[2.9,1.4], treffer:[2.9,2.2,1.3], baue:bank },
  { x:-1.8, z:7.8, steh:[-1.6,10.5], r:1.55, treffer:[3.2,1.7,2.9], baue:ameisenhaufen },
  { x:3.2, z:-9.6, steh:[3,-7.6], kasten:[2.4,.9], treffer:[2.5,3,.9], baue:insektenhotel }
];

function baue(k){
  grund(k);
  const tuer=baumstamm(k);
  wald(k);
  ausstattung(k);
  tiere(k);
  nebel(k);
  return { tuer, start:[5,.6] };
}
return { titel:'Der Waldweg', himmel:HIMMEL, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 2: Der Fuchsbau. Warm und gemütlich unter der Erde: Erdwände mit Steinen, dicke Wurzeln, Lichtloch mit Lichtstrahl,
   Glühwürmchen-Laternen, Pilzhocker, Mäuschen und ein Regenwurm.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Junge Füchse) und 10 (Schneckenhaus) sind neu.
   Ausgang: der Wurzelvorhang in der Rückwand links, er öffnet sich zur Seite, dahinter führt ein heller Gang nach oben ins Freie. */
RAEUME3D.wald[1] = (function(){
const { HOLZ, HOLZ2, HOLZ3, HELLHOLZ, MOOS, MOOS2, LAUB, LAUB2, LAUB3, STEIN, STEIN2, ROT, BLAU, GELB, ORANGE, CREME, WEISS, SCHWARZ, GOLD } = WA;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=-11;                          /* Mitte des Wurzelvorhangs */
const LX=.3;                           /* Mitte des Lichtlochs */
const W1=0xb98a52, W2=0x8e6234, W3=0x5e3e20;      /* Wurzelfarben hell, mittel, dunkel */
const ERDE=0x7a4e2a, ERDE2=0x5c381c, ERDE3=0x96683a;

/* ---------- kleine Helfer ---------- */
const hell=m=>{ m.castShadow=false; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };
/* gebogene Wurzel durch mehrere Punkte, von r1 nach r2 dünner werdend */
function wurzel(par,P,r1,r2,farbe){
  const n=P.length-1;
  for(let i=0;i<n;i++){ const r=r1+(r2-r1)*(n>1?i/(n-1):0); strich(par,P[i],P[i+1],r,farbe); ball(par,r,farbe,P[i][0],P[i][1],P[i][2]); }
  ball(par,r2,farbe,P[n][0],P[n][1],P[n][2]);
}
/* Erdbrocken (kantig) */
function brocken(par,x,y,z,r,farbe){ const m=teil(par,new THREE.IcosahedronGeometry(1,0),farbe,x,y,z,r,r*.75,r); m.rotation.set(zufall()*3,zufall()*3,0); return m; }
/* Eicheln als drei Instanz-Gruppen. liste: [[x,y,z,größe,drehY,kippX,kippZ]] */
function eicheln(par,liste){
  const N=[], K=[], S=[], O=new THREE.Object3D();
  liste.forEach((e,i)=>{ const [x,y,z,g]=e, kx=e[5]||0, kz=e[6]||0, ox=-Math.sin(kz), oy=Math.cos(kz)*Math.cos(kx), oz=Math.sin(kx);
    N.push([x,y,z,.14*g,.2*g,.14*g,[0xd09a48,0xb8813a,0xe0ac58][i%3],e[4]||0,kx,kz]);
    K.push([x+ox*.13*g,y+oy*.13*g,z+oz*.13*g,.17*g,.1*g,.17*g,i%2?0x6a4220:0x7e5228,e[4]||0,kx,kz]);
    S.push([x+ox*.26*g,y+oy*.26*g,z+oz*.26*g,.025*g,.1*g,.025*g,0x4a2c12,0,kx,kz]); });
  WA.viele(par,GEO.sph,N); WA.viele(par,GEO.sph,K); WA.viele(par,GEO.cyl,S);
}

/* ---------- Bilder ---------- */
function erdBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#94643a'; g.fillRect(0,0,512,512);
    const fleck=(x,y,rx,ry,f)=>{ g.fillStyle=f; [-512,0,512].forEach(a=>[-512,0,512].forEach(b=>{ g.beginPath(); g.ellipse(x+a,y+b,rx,ry,0,0,7); g.fill(); })); };
    for(let i=0;i<150;i++) fleck(zufall()*512,zufall()*512,10+zufall()*30,6+zufall()*16,['rgba(70,40,18,.22)','rgba(190,140,84,.2)','rgba(120,70,36,.25)'][i%3]);
    for(let i=0;i<700;i++){ g.fillStyle=i%3?'rgba(60,34,14,.35)':'rgba(230,190,130,.3)'; g.fillRect(zufall()*508,zufall()*508,2+zufall()*5,2+zufall()*4); }
    for(let i=0;i<22;i++){ const x=zufall()*512, y=zufall()*512, r=4+zufall()*8; fleck(x,y+2,r,r*.7,'rgba(50,28,12,.5)'); fleck(x,y,r,r*.68,i%2?'#a89478':'#c0a880'); } });
}
/* Himmel mit Wald: Blick am Ende des Gangs */
function draussenBild(){
  return bild(512,512,(g)=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#8ad0ff'); v.addColorStop(.55,'#e8f8ff'); v.addColorStop(1,'#fff6c0'); g.fillStyle=v; g.fillRect(0,0,512,512);
    const l=g.createRadialGradient(300,150,10,300,150,190); l.addColorStop(0,'rgba(255,255,220,1)'); l.addColorStop(1,'rgba(255,240,160,0)'); g.fillStyle=l; g.fillRect(0,0,512,512);
    const kreis=(x,y,r,f)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    [[60,250,80],[150,290,60],[420,260,90],[480,200,60],[350,310,55]].forEach(([x,y,r])=>{ g.fillStyle='#6a4a2a'; g.fillRect(x-8,y,16,150); kreis(x,y,r,'#5aa83c'); kreis(x-r*.4,y+r*.2,r*.6,'#7cc450'); });
    g.fillStyle='#86c448'; g.fillRect(0,370,512,142);
    for(let i=0;i<90;i++) kreis(zufall()*512,385+zufall()*120,3+zufall()*3,['#fff','#ffd23a','#f07a9a'][i%3]); });
}
function lochBild(){
  return bild(256,256,(g)=>{ const v=g.createLinearGradient(0,0,0,256); v.addColorStop(0,'#78c0f8'); v.addColorStop(1,'#eefaff'); g.fillStyle=v; g.fillRect(0,0,256,256);
    const kreis=(x,y,r,f)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    [[80,100,24],[112,90,32],[144,106,22]].forEach(([x,y,r])=>kreis(x,y,r,'#ffffff')); [[20,20,50],[240,40,44],[200,6,38]].forEach(([x,y,r])=>kreis(x,y,r,'#68b040')); });
}
/* Karte mit Gängen des Fuchsbaus */
function kartenBild(){
  return bild(512,384,(g)=>{ g.fillStyle='#f0dca8'; g.fillRect(0,0,512,384);
    for(let i=0;i<260;i++){ g.fillStyle='rgba(150,105,50,.18)'; g.fillRect(zufall()*505,zufall()*378,3+zufall()*6,3); }
    g.strokeStyle='#8a5a28'; g.lineWidth=15; g.lineCap='round';
    const weg=(a,b,c,d,e,f)=>{ g.beginPath(); g.moveTo(a,b); g.quadraticCurveTo(c,d,e,f); g.stroke(); };
    weg(70,80,170,40,250,130); weg(250,130,340,210,440,70); weg(250,130,150,180,130,290); weg(250,130,290,260,400,300); weg(130,290,240,340,320,330);
    [[70,80,34],[440,70,40],[130,290,38],[400,300,34],[250,130,28]].forEach(([x,y,r])=>{ g.fillStyle='#d8b070'; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); g.lineWidth=7; g.stroke(); });
    g.strokeStyle='#d03020'; g.lineWidth=12; g.beginPath(); g.moveTo(380,280); g.lineTo(420,320); g.moveTo(420,280); g.lineTo(380,320); g.stroke();
    g.fillStyle='#5a9a34'; [[56,205],[470,200],[220,52]].forEach(([x,y])=>{ g.beginPath(); g.moveTo(x,y-30); g.lineTo(x+22,y+12); g.lineTo(x-22,y+12); g.fill(); g.fillRect(x-4,y+12,8,14); });
    g.fillStyle='#d8681e'; g.beginPath(); g.moveTo(52,58); g.lineTo(88,58); g.lineTo(96,76); g.lineTo(70,102); g.lineTo(44,76); g.fill(); g.beginPath(); g.moveTo(46,62); g.lineTo(50,38); g.lineTo(66,58); g.moveTo(94,62); g.lineTo(90,38); g.lineTo(74,58); g.fill(); });
}

/* ---------- Ausgang: der Wurzelvorhang ---------- */
function baueVorhang(k,sc,hinten){
  /* Gang nach oben ins Freie */
  const blick=new THREE.Mesh(new THREE.PlaneGeometry(7,6.6),basis(0xffffff,{map:draussenBild()})); blick.position.set(AX,3.2,HINTEN-3.4); hinten.add(blick);
  const gang=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ box(gang,.5,4.8,2.9,ERDE2,s*2.15,2.4,-1.95); for(let i=0;i<9;i++) brocken(gang,s*(1.85+zufall()*.15),.4+i*.5,-.7-zufall()*2.4,.22+zufall()*.18,i%2?ERDE:ERDE3); });
  for(let i=0;i<5;i++){ const z=-.95-i*.46, y=.22*(i+1); box(gang,3.7,y,.46,i%2?0xd8a860:0xc09048,0,y/2,z); box(gang,3.7,.07,.12,W2,0,y+.02,z+.17); }
  for(let i=0;i<22;i++){ const s=i%2?1:-1; hell(kegel(gang,.07,.4+zufall()*.3,i%3?LAUB2:MOOS2,s*(1.25+zufall()*.55),1.35+zufall()*.2,-2.7-zufall()*.4)); }
  verschmelze(gang); ohneSchatten(gang);
  /* dicker Wurzelrahmen rund um den Durchgang */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{
    wurzel(r,[[s*2.65,0,.45],[s*2.2,.7,.3],[s*2.05,1.9,.2],[s*2.25,3.1,.22],[s*2.0,4.35,.25],[s*1.1,4.85,.3],[0,4.7,.35]],.36,.24,W3);
    wurzel(r,[[s*2.95,0,.15],[s*2.45,1.3,.12],[s*2.35,2.7,.18],[s*1.85,4.0,.28],[s*.7,4.5,.42],[-s*.5,4.95,.3]],.17,.07,W2);
    wurzel(r,[[s*2.35,.5,.4],[s*2.9,.14,.8],[s*3.5,.08,.65]],.2,.05,W3);
    WA.pilz(r,s*3.05,0,.55,.8,GELB); WA.pilz(r,s*3.4,0,.35,.55,ORANGE);
  });
  verschmelze(r);
  /* zwei Hälften aus herabhängenden Wurzeln, Drehpunkt außen */
  const haelften=[-1,1].map(s=>{
    const g=gruppe(hinten,AX+s*1.92,0,HINTEN+.14); g.userData.lebendig=true;
    for(let i=0;i<7;i++){ const x=-s*(.1+i*.28), f=[W1,W2,W1][i%3], unten=.08+(i%3)*.14, P=[];
      for(let j=0;j<=6;j++){ const u=j/6; P.push([x+Math.sin(j*1.9+i*2.3+s)*.12,4.5-u*(4.5-unten),(i%2)*.12+Math.sin(j*1.3+i)*.05]); }
      wurzel(g,P,.15-(i%2)*.02,.06,f);
      strich(g,[P[2][0],P[2][1],P[2][2]],[P[2][0]-s*.28,P[2][1]-.65,.1],.035,W2); strich(g,[P[4][0],P[4][1],P[4][2]],[P[4][0]+s*.25,P[4][1]-.55,.06],.028,W1); }
    wurzel(g,[[0,3.55,.16],[-s*.65,3.3,.26],[-s*1.3,3.5,.2],[-s*1.9,3.25,.22]],.09,.06,W3);
    wurzel(g,[[0,1.05,.2],[-s*.7,1.3,.28],[-s*1.4,.95,.22],[-s*1.9,1.15,.2]],.09,.06,W3);
    [[.4,2.8],[1.15,1.75],[.8,3.9],[1.55,2.55]].forEach(([a,y],i)=>ball(g,.13,i%2?LAUB2:MOOS2,-s*a,y,.3,1.3,.7,.5));
    verschmelze(g); return g; });
  /* Zahlenschloss an zwei Ranken in der Mitte */
  const schloss=gruppe(hinten,AX,2.25,HINTEN+.55); schloss.userData.lebendig=true;
  box(schloss,1.5,1.18,.1,W3,0,.05,-.1); const z=WA.zahlenschloss(schloss,0,-.04,.04); z.scale.setScalar(1.35); verschmelze(schloss);
  const ranken=gruppe(hinten,AX,2.25,HINTEN+.5); ranken.userData.lebendig=true;
  [-1,1].forEach(s=>{ wurzel(ranken,[[s*.7,.35,0],[s*1.25,.55,-.06],[s*1.85,.35,-.12]],.08,.06,W3); wurzel(ranken,[[s*.7,-.35,0],[s*1.3,-.55,-.06],[s*1.85,-.3,-.12]],.08,.06,W3); });
  verschmelze(ranken);
  const glanz=schein(hinten,'rgba(255,230,130,.45)',AX,2.4,HINTEN+.8,1.2);
  const licht=new THREE.PointLight(0xfff0b0,.35,10,1.5); licht.position.set(AX,3.2,-12.2); sc.add(licht);
  k.kasten(AX,-13.0,6.4,1.1);
  return ausgang(k,{ name:'Wurzelvorhang', einfach:'Wurzel-Vorhang', steh:[AX,-11.2], durch:[AX,-14.45], hoch:.22, warte:.2,
    treffer:{x:AX,y:2.3,z:-12.95,b:3.9,h:4.6,t:.9}, schildOben:[AX,4.9,-12.4], glanz:[AX,2.3,-12.6],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)), e=a*a*(3-2*a);
      haelften.forEach(g=>g.scale.x=1-.74*e); ranken.visible=schloss.visible=a<.03;   /* offenes Schloss und Ranken verschwinden */
      glanz.visible=a<.05; licht.intensity=.35+1.1*e; } });
}

/* ---------- Lichtloch mit Strahl ---------- */
function baueLicht(k,sc,hinten){
  const Y=4.5;
  const himmel=new THREE.Mesh(new THREE.CircleGeometry(.95,28),basis(0xffffff,{map:lochBild()})); himmel.position.set(LX,Y,HINTEN+.05); himmel.scale.set(1.25,.95,1); hinten.add(himmel);
  const g=gruppe(hinten,LX,Y,HINTEN);
  for(let i=0;i<20;i++){ const a=i*Math.PI/10; brocken(g,Math.cos(a)*1.35,Math.sin(a)*1.05,.12,.28+(i%3)*.07,i%2?ERDE2:ERDE); }
  for(let i=0;i<26;i++){ const x=-1.05+i*.084, y=.9*Math.sqrt(Math.max(0,1-x*x/1.45)); const m=hell(kegel(g,.06,.3+(i%4)*.12,i%3?LAUB2:MOOS2,x,y-.1-(i%4)*.05,.22)); m.rotation.x=Math.PI; }
  wurzel(g,[[-1.5,.9,.15],[-.9,.5,.28],[-1.05,-.3,.25]],.08,.03,W2); wurzel(g,[[1.5,1.2,.15],[1.15,.35,.3],[1.3,-.5,.2],[1.05,-1.1,.15]],.09,.03,W1);
  verschmelze(g); ohneSchatten(g);
  /* Lichtstrahl schräg auf den Boden */
  const a=V(LX,Y,HINTEN+.2), b=V(1.0,0,-8.4), d=a.clone().sub(b), l=d.length();
  const strahl=new THREE.Mesh(new THREE.CylinderGeometry(.75,1.7,1,24,1,true),basis(0xfff0a8,{transparent:true,opacity:.12,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));
  strahl.position.copy(b).addScaledVector(d,.5); strahl.scale.set(1,l,1); strahl.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); sc.add(strahl);
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(4.6,3.6),basis(0xffffff,{map:leuchtBild('rgba(255,232,150,.55)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  fleck.rotation.x=-Math.PI/2; fleck.position.set(1.0,.04,-8.4); sc.add(fleck);
  /* Staubkörnchen tanzen im Licht */
  const m=basis(0xfff8c8);
  const staub=[]; for(let i=0;i<12;i++) staub.push(hell(ball(sc,.035,m,0,1,0)));
  k.anim.push(t=>{ staub.forEach((s,i)=>{ const u=1-((t*.05+i/12)%1); s.position.set(1.0+(LX-1.0)*u+Math.sin(t*.7+i*2.1)*.7, .3+u*4.0, -8.4+(HINTEN+.5+8.4)*u+Math.cos(t*.5+i*1.3)*.45); }); });
  const p=new THREE.PointLight(0xfff0c0,.45,12,1.5); p.position.set(.8,3.8,-9.6); sc.add(p);
}

/* ---------- Wände: Wurzeln, Steine, Erdkante ---------- */
/* Wandschmuck an einer Wandgruppe. ort(u,y,vor) rechnet in Raum-Koordinaten um, u läuft entlang der Wand */
function wandschmuck(g,ort,von,bis,frei){
  const w=gruppe(g,0,0,0);
  /* unregelmäßige Erdkante oben */
  for(let u=von;u<=bis;u+=.9){ const p=ort(u,H+.1+zufall()*.2,-.1); brocken(w,p[0],p[1],p[2],.48+zufall()*.25,[ERDE2,ERDE,ERDE3][Math.floor(zufall()*3)]); }
  /* Brocken am Fuß */
  for(let u=von+.4;u<=bis;u+=1.1){ if(!frei(u,0)) continue; const p=ort(u,.12,.12); brocken(w,p[0],p[1],p[2],.24+zufall()*.2,zufall()<.5?ERDE2:ERDE); }
  /* eingebettete Steine */
  for(let i=0;i<(bis-von)*.6;i++){ const u=von+zufall()*(bis-von), y=.7+zufall()*4.8; if(!frei(u,y)) continue; const p=ort(u,y,.02); brocken(w,p[0],p[1],p[2],.14+zufall()*.2,i%2?0xb09c80:0x94826a); }
  /* Wurzeln von oben herab */
  for(let u=von+.7;u<bis;u+=1.75){ const lang=1.2+zufall()*3.2, P=[], f=[W1,W2,W3][Math.floor(zufall()*3)];
    for(let j=0;j<=5;j++){ const y=H+.05-lang*j/5, v=u+Math.sin(j*1.6+u*2)*.3; if(j>0&&!frei(v,y)) break; P.push(ort(v,y,.14+Math.sin(j+u)*.06)); }
    if(P.length<2) continue; wurzel(w,P,.14,.035,f);
    if(P.length>3){ const q=P[2], e=ort(u+(zufall()<.5?-.7:.7),q[1]-.6,.1); if(frei(u-.7,e[1])&&frei(u+.7,e[1])) strich(w,q,e,.035,f); } }
  verschmelze(w); ohneSchatten(w);
}
/* Glühwürmchen-Laterne an einem Wurzelhaken, Blick nach +z */
function laterne(k,par,x,y,z,dreh,phase){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  wurzel(g,[[0,.75,0],[0,.95,.35],[0,.62,.7]],.09,.045,W3);
  walze(g,.22,.1,HOLZ3,0,.38,.7); walze(g,.26,.12,HOLZ3,0,-.34,.7); ring(g,.1,.025,HOLZ3,0,.52,.7);
  [[-.2,0],[.2,0],[0,-.2],[0,.2]].forEach(([a,b])=>strich(g,[a,-.32,.7+b],[a,.34,.7+b],.022,HOLZ3));
  const glas=new THREE.Mesh(GEO.cyl,basis(0xffe890,{transparent:true,opacity:.45,depthWrite:false})); glas.scale.set(.19,.66,.19); glas.position.set(0,.02,.7); g.add(glas);
  schein(g,'rgba(255,210,100,.55)',0,0,.85,2.0);
  const punkt=hell(ball(g,.07,basis(0xfffbc0),0,0,.92)); punkt.userData.lebendig=true;
  k.anim.push(t=>{ punkt.position.set(Math.sin(t*2.3+phase)*.1,Math.sin(t*3.1+phase*2)*.2,.92); });
}
/* niedriger Pilzhocker */
function hocker(par,x,z,farbe){
  const g=gruppe(par,x,0,z);
  rohr(g,.22,.34,.55,CREME,0,.27,0,12); ball(g,.62,farbe,0,.6,0,1,.34,1); walze(g,.56,.07,0xe8d0a8,0,.54,0);
  [[.2,.15],[-.25,-.1],[.05,-.3]].forEach(([a,b])=>ball(g,.09,0xf0d8a0,a,.78,b,1,.3,1));
}
function pilzgruppe(par,x,z,farbe,gr){
  WA.pilz(par,x,0,z,gr*1.3,farbe); WA.pilz(par,x+.45*gr,0,z+.25*gr,gr*.8,farbe); WA.pilz(par,x-.4*gr,0,z+.3*gr,gr*.6,farbe);
}
/* dicker Wurzelfuß, der aus der Seitenwand in den Boden wächst. s = -1 links, 1 rechts */
function wurzelfuss(par,s,z){
  const x=s*B/2;
  wurzel(par,[[x,5.6,z],[x-s*.45,3.8,z+.25],[x-s*.55,2.0,z-.2],[x-s*.95,.7,z+.1],[x-s*1.75,.1,z+.6]],.42,.1,W2);
  wurzel(par,[[x-s*.55,2.0,z-.2],[x-s*.8,.9,z-.8],[x-s*1.4,.08,z-1.05]],.22,.06,W3);
  wurzel(par,[[x,3.4,z-1.0],[x-s*.3,2.6,z-.4],[x-s*.55,2.0,z-.2]],.12,.16,W1);
}
/* Wurzeltisch: Baumscheibe auf Wurzelbeinen */
function tisch(par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,1.0,.2,HELLHOLZ,0,.95,0); flach(ring(g,1.0,.07,HOLZ2,0,.95,0)); [.65,.35].forEach(r=>flach(ring(g,r,.015,HOLZ,0,1.056,0)));
  [0,1,2].forEach(i=>{ const a=i*2.094+.4; wurzel(g,[[Math.cos(a)*.3,.88,Math.sin(a)*.3],[Math.cos(a)*.45,.45,Math.sin(a)*.45],[Math.cos(a)*.9,.07,Math.sin(a)*.9]],.18,.07,W3); });
  /* Becher aus Eichenhüten und ein Zweig mit Blüten */
  [[-.4,.25],[.35,.4]].forEach(([a,b])=>{ rohr(g,.17,.11,.24,W1,a,1.17,b); walze(g,.14,.02,0x7a3a20,a,1.285,b); });
  strich(g,[.1,1.1,-.35],[.4,1.8,-.45],.025,LAUB3); [[.4,1.82,-.45,0xf07a9a],[.22,1.55,-.35,GELB],[.52,1.5,-.4,WEISS]].forEach(p=>ball(g,.11,p[3],p[0],p[1],p[2],1,.7,1));
  rohr(g,.14,.18,.3,0xa0603a,.1,1.2,-.35);
}
/* Regenwurm schaut aus einem Erdkrümel */
function wurm(k,x,z,phase){
  const g=gruppe(k.scene,x,0,z); ball(g,.34,ERDE2,0,.03,0,1.2,.35,1);
  const w=gruppe(g,0,0,0); w.userData.lebendig=true; const R=0xe8908a;
  const teile=[0,1,2,3,4,5].map(i=>ball(w,.12-i*.004,i===3?0xf4b0a0:R,0,i*.13,0));
  const augen=[-1,1].map(s=>ball(w,.027,SCHWARZ,s*.05,.7,.1));
  k.anim.push(t=>{ teile.forEach((m,i)=>m.position.x=Math.sin(t*2+phase+i*.7)*.05*i*.6); augen.forEach((a,i)=>a.position.x=teile[5].position.x+(i?.05:-.05)); w.position.y=-.22+Math.sin(t*.7+phase)*.18; });
}

function baue(k){
  const sc=k.scene, wandTex=erdBild();
  const h=WA.huelle(k,{ B,T,H, himmelLicht:0xfff0d4, grund:0x7a5434, staerke:.82, sonne:0xffe4b4, sonneStaerke:.4,
    wandBild:wandTex, bodenBild:WA.kornBild('#b8864e',['rgba(250,220,160,.4)','rgba(100,64,30,.3)','rgba(150,100,56,.35)']), bodenWdh:[B/7,T/7],
    leiste:ERDE2, sockel:0, oeffnung:{x:AX,b:3.9,h:4.55} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  /* über und hinter den Wänden dunkelbraune Erde statt Schwarz (gleiche Farbe wie oben der Verlauf) */
  sc.background=new THREE.Color(0x462e1a);
  const grund=new THREE.Mesh(new THREE.PlaneGeometry(300,300),basis(0x462e1a)); grund.rotation.x=-Math.PI/2; grund.position.y=-.045; sc.add(grund);
  const tuer=baueVorhang(k,sc,hinten);
  baueLicht(k,sc,hinten);

  /* Wandschmuck: frei(u,y) hält Gegenstände, Ausgang und Lichtloch frei */
  const belegt=[[AX,3.4,0,6.5],[-4.8,2.2,0,4.3],[LX,1.9,2.8,6.5],[5.4,2.3,0,4.5],[12,1.85,.9,4.4]];
  wandschmuck(hinten,(u,y,v)=>[u,y,HINTEN+v],-17.6,17.6,(u,y)=>!belegt.some(([x,b,y1,y2])=>Math.abs(u-x)<b && y>=y1 && y<y2));
  wandschmuck(links,(u,y,v)=>[-B/2+v,y,u],-13.2,13.2,()=>true);
  wandschmuck(rechts,(u,y,v)=>[B/2-v,y,u],-13.2,13.2,()=>true);
  laterne(k,hinten,-7.55,2.9,HINTEN,0,0); laterne(k,hinten,8.7,3.0,HINTEN,0,2); laterne(k,hinten,15.9,2.9,HINTEN,0,4);
  [-8.5,.5,9.0].forEach((z,i)=>{ laterne(k,links,-B/2,3.0,z,Math.PI/2,i*1.7); laterne(k,rechts,B/2,3.0,z,-Math.PI/2,i*1.3+1); });

  /* Wurzelfüße an den Seiten (je Wand eine Gruppe, blendet mit der Wand aus) */
  [[links,-1],[rechts,1]].forEach(([w,s])=>{ const g=gruppe(w,0,0,0); [-4.2,4.6].forEach(z=>{ wurzelfuss(g,s,z); k.kasten(s*17.0,z,2.0,2.3); }); verschmelze(g); });

  /* ---------- Deko am Boden (nichts davon ist ein Gegenstand) ---------- */
  const v=gruppe(sc,0,0,0);
  const ROTBRAUN=0xa85a30, OCKER=0xd8a038;
  /* hinten */
  pilzgruppe(v,-16.4,-12.2,OCKER,1.25); k.kasten(-16.4,-12.15,2.0,1.4);
  WA.stein(v,-8.0,-12.65,.55,true); k.kreis(-8.0,-12.65,.75);
  WA.stein(v,2.2,-12.7,.5,true); k.kreis(2.2,-12.7,.7);
  pilzgruppe(v,8.7,-12.5,ROTBRAUN,.85); k.kasten(8.7,-12.4,1.4,1.0);
  pilzgruppe(v,15.9,-12.2,ROT,1.3); k.kasten(15.9,-12.15,2.1,1.4);
  /* links */
  pilzgruppe(v,-16.9,-10.0,ROTBRAUN,1.1); k.kreis(-16.9,-9.85,.9);
  WA.stein(v,-17.0,-.6,.75,true); WA.stein(v,-17.15,1.0,.45,true); k.kasten(-16.9,.0,1.8,3.0);
  pilzgruppe(v,-16.9,8.4,OCKER,1.05); k.kreis(-16.9,8.55,.9);
  /* rechts */
  tisch(v,15.9,-8.3); k.kreis(15.9,-8.3,1.1);
  hocker(v,14.2,-9.6,ROTBRAUN); k.kreis(14.2,-9.6,.62); hocker(v,15.4,-6.2,OCKER); k.kreis(15.4,-6.2,.62);
  pilzgruppe(v,16.8,.3,ROT,1.1); k.kreis(16.8,.45,.95);
  WA.stein(v,17.0,8.6,.75,true); k.kreis(17.0,8.6,1.1);
  /* vorn (niedrig) */
  [[-15.8,12.3,ROT,.9],[-5.2,12.5,OCKER,.75],[8.0,12.4,ROTBRAUN,.85],[16.0,12.2,OCKER,1.0]].forEach(([x,z,f,g])=>{ pilzgruppe(v,x,z,f,g); k.kasten(x,z+.1,1.7*g,1.0*g); });
  [[-10.2,12.4,.65],[2.8,12.55,.5],[12.6,12.45,.6]].forEach(([x,z,r])=>{ WA.stein(v,x,z,r,true); k.kreis(x+.15,z,r*1.35); });
  /* Wurzeln, die flach am Rand aus dem Boden kommen */
  [[-13.5,12.9,2.4],[-1.8,13.0,2.8],[5.4,12.9,2.0]].forEach(([x,z,l])=>{ wurzel(v,[[x-l/2,-.05,z],[x-l/5,.28,z-.15],[x+l/5,.18,z+.1],[x+l/2,-.05,z-.1]],.16,.1,W2); k.kasten(x,z,l,.5); });
  verschmelze(v);

  /* trockene Blätter und kleine Kiesel am Boden (flach, ohne Hindernis), vor allem am Rand */
  const blatt=[], kies=[];
  for(let i=0;i<260;i++){ let x=-17.5+zufall()*35, z=-12.8+zufall()*25.8; if(i%3) { if(i%2) x=(x<0?-1:1)*(13+zufall()*4.4); else z=zufall()<.5?-12.9+zufall()*1.8:11+zufall()*2.2; }
    blatt.push([x,.025,z,.17,.012,.085,[0xc8662a,0xe0a030,0x8a9a38,0xa84a24][i%4],zufall()*6.3]); }
  for(let i=0;i<110;i++){ const x=-17.4+zufall()*34.8, z=-12.9+zufall()*25.8; kies.push([x,.025,z,.09+zufall()*.07,.04,.08+zufall()*.06,i%2?0x9a8468:0x7a6248,zufall()*6.3]); }
  WA.viele(sc,GEO.sph,blatt); WA.viele(sc,GEO.sph,kies);

  /* ---------- warmes Licht ---------- */
  flacker(k,-8.0,3.6,-9.0,0xffbc60,.42,13); flacker(k,9.0,3.6,-8.5,0xffbc60,.42,13);
  flacker(k,-12.0,3.8,4.0,0xffc874,.35,13); flacker(k,12.0,3.8,4.0,0xffc874,.35,13);

  /* ---------- Tiere ---------- */
  maeuschen(k,[[-15.0,-8.0],[-9.6,-8.8],[-7.6,-6.6],[-14.0,-6.8]],1.5,0);
  maeuschen(k,[[-2.0,8.4],[5.6,7.6],[6.4,10.2],[-1.0,10.6]],1.7,4);
  wurm(k,-14.6,1.8,0); wurm(k,14.4,2.4,2.5); wurm(k,-2.4,-5.4,4);
  WA.falter(k,.9,2.6,-8.6,0xffd23a,1,1.2);

  return { tuer, start:[-6,-3] };   /* Wurzelvorhang ist im Startbild zu sehen */
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.6,-10.4],[-8.0,-8.2],[-14.4,-6.6],[-6.4,-2.8],[-1.6,-9.4],[2.4,-10.4],[8.6,-9.0],[13.8,-10.6],[14.6,-1.4],[7.6,-1.2],
  [0,4.4],[-7.2,.8],[-14.2,-.8],[-14.4,10.2],[-6.2,8.2],[-2.0,10.8],[3.2,7.0],[7.2,4.4],[14.6,9.8],[13.8,1.0]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-4.8, z:HINTEN, wand:'hinten', steh:[-4.8,-11.3], kasten:[3.9,1.3], treffer:[3.8,3.5,1.1], trefferY:.55, baue(g,k){ /* 1 Vorratskammer: Nische in der Wand, über dem Boden */
      box(g,3.1,2.4,.08,0x3a2010,0,2.15,.06); const o=flach(walze(g,1.55,.08,0x3a2010,0,3.3,.06)); o.scale.set(1.55,.08,.65);
      /* Rahmen aus Wurzeln: Bogen oben, dicke Fensterbank unten */
      wurzel(g,[[-1.7,.85,.4],[-1.75,2.2,.35],[-1.6,3.45,.35],[-.9,4.1,.4],[0,4.3,.42],[.9,4.1,.4],[1.6,3.45,.35],[1.75,2.2,.35],[1.7,.85,.4]],.2,.2,W1);
      box(g,3.7,.22,1.0,HOLZ,0,.88,.5); box(g,3.3,.14,.8,HELLHOLZ,0,2.15,.42); box(g,2.3,.12,.62,HELLHOLZ,0,3.2,.34);
      [-1.3,1.3].forEach(x=>wurzel(g,[[x,0,.1],[x*1.06,.45,.35],[x,.8,.6]],.1,.15,W2));
      /* oben: Beerenbündel und Pilze */
      [-.7,.05,.75].forEach((x,i)=>{ strich(g,[x,3.95,.4],[x,3.7,.45],.02,LAUB3); for(let j=0;j<7;j++) ball(g,.11,i===1?0x4a4aa0:0xd0283c,x+((j%3)-1)*.13,3.62-Math.floor(j/3)*.12,.48+(j%2)*.06); ball(g,.13,LAUB2,x+.17,3.74,.45,1.4,.35,.8); });
      /* Mitte: Pilze und Nüsse */
      [-1.2,-.7,-.25].forEach((x,i)=>WA.pilz(g,x,2.22,.5,.9-(i%2)*.2,i===1?GELB:ROT));
      for(let i=0;i<9;i++){ const x=.35+(i%5)*.25+(i>4?.12:0), y=2.36+(i>4?.22:0); ball(g,.15,i%2?0xb0702c:0x93561e,x,y,.5); ball(g,.07,CREME,x,y-.09,.58,1,.6,.8); }
      /* unten: Korb mit Äpfeln, Honigtopf, Eicheln */
      rohr(g,.5,.38,.42,0xc89a52,-1.05,1.2,.6,16,true); walze(g,.4,.05,W2,-1.05,1.02,.6); flach(ring(g,.51,.05,W2,-1.05,1.41,.6));
      [[-1.3,.55],[-.95,.45],[-.8,.72],[-1.12,.75],[-1.05,.6]].forEach(([x,z],i)=>ball(g,.19,i%2?0x8ac038:0xe04028,x,i===4?1.58:1.38,z));
      rohr(g,.26,.32,.55,0xd87830,-.2,1.27,.55); walze(g,.3,.1,CREME,-.2,1.59,.55); flach(ring(g,.28,.03,ROT,-.2,1.54,.55)); box(g,.28,.2,.03,GELB,-.2,1.27,.86);
      const L=[]; for(let i=0;i<14;i++) L.push([.4+(i%6)*.22+(i>5?.12:0)+(i>10?.1:0),1.13+(i>5?.2:0)+(i>10?.18:0),.62-(i>5?.08:0),.95,i,(zufall()-.5)*.7,(zufall()-.5)*.9]); eicheln(g,L); } },
  { x:-10.4, z:-3.6, steh:[-9.4,-1.15], r:2.0, treffer:[4.0,2.2,3.4], baue(g,k){ /* 2 Schlafnest mit schlafendem Fuchs */
      /* Nest aus Zweigen, Gras und Moos */
      walze(g,1.75,.12,0xd8b058,0,.06,0);
      [[1.72,.25,0x5e3e20],[1.62,.46,0x8a5e2c],[1.5,.62,0xc09848]].forEach(([r,y,f])=>flach(ring(g,r,.2,f,0,y,0)));
      for(let i=0;i<70;i++){ const a=i*.0898*Math.PI*1.1, r=1.45+zufall()*.4, y=.15+zufall()*.55, b=a+.55+zufall()*.3; strich(g,[Math.cos(a)*r,y,Math.sin(a)*r],[Math.cos(b)*(r+(zufall()-.5)*.35),y+(zufall()-.4)*.28,Math.sin(b)*r],.028,[W2,0xd8b058,W3,MOOS][i%4]); }
      /* dunkle Zweige stehen ringsum ab, mit kleinen Gabeln */
      for(let i=0;i<46;i++){ const a=i*.1366+(zufall()-.5)*.1, b=a+(zufall()-.5)*.55, y=.2+zufall()*.45, y2=y+(zufall()-.25)*.7, r2=1.95+zufall()*.3, A=[Math.cos(a)*1.5,y,Math.sin(a)*1.5], E=[Math.cos(b)*r2,Math.max(.06,y2),Math.sin(b)*r2], M=A.map((q,j)=>q+(E[j]-q)*.6), f=i%2?W3:0x3e2812;
        strich(g,A,E,.04,f); strich(g,M,[Math.cos(b+.22)*(r2-.15),M[1]+.28,Math.sin(b+.22)*(r2-.15)],.025,f); }
      ball(g,1.4,0xf0d888,0,.16,0,1,.14,1);
      /* eingerollter Fuchs, atmet ruhig */
      const F=0xd8681e, D=0x8a3a10, f=gruppe(g,0,.35,0); f.userData.lebendig=true;
      const leib=gruppe(f,0,0,0);
      ball(leib,.75,F,-.15,.35,-.2,1.35,.75,1.0); ball(leib,.55,F,-.7,.32,.15,1,.85,1); ball(leib,.45,0xe07828,.5,.32,-.2,1,.85,1);
      wurzel(leib,[[-.95,.28,.25],[-.65,.2,.8],[-.1,.18,1.0],[.45,.18,.9]],.3,.24,F); ball(leib,.27,WEISS,.72,.19,.82,1.35,.8,.85);
      verschmelze(leib);
      const kopf=gruppe(f,.65,.42,.32); kopf.rotation.y=-.55; kopf.rotation.z=-.12;
      ball(kopf,.4,F,0,.05,0,1,.9,1.05); const s=kegel(kopf,.22,.52,F,.46,-.05,0); s.rotation.z=-Math.PI/2; ball(kopf,.2,WEISS,.3,-.15,0,1.5,.65,1.25); ball(kopf,.085,SCHWARZ,.73,-.04,0);
      [-1,1].forEach(v=>{ kegel(kopf,.17,.42,F,-.08,.45,v*.24).rotation.x=v*.25; kegel(kopf,.09,.28,SCHWARZ,-.01,.45,v*.24).rotation.x=v*.25;
        /* geschlossene Augen als Bögen */
        const au=ring(kopf,.08,.022,SCHWARZ,.32,.17,v*.2,Math.PI); au.rotation.set(0,Math.PI/2,Math.PI); ball(kopf,.15,WEISS,.14,-.1,v*.3,1,.75,.7); });
      [-.15,.2].forEach(z=>ball(f,.15,D,1.0,.08,z+.2,1.7,.6,.85));
      verschmelze(kopf);
      /* Schlaf-Zeichen steigen auf */
      const zz=[0,1,2].map(()=>{ const q=gruppe(g,0,0,0); q.userData.lebendig=true; const m=basis(0xfff8e0); strich(q,[-.16,.18,0],[.16,.18,0],.035,m); strich(q,[.16,.18,0],[-.16,-.18,0],.035,m); strich(q,[-.16,-.18,0],[.16,-.18,0],.035,m); return q; });
      k.anim.push(t=>{ const a=Math.sin(t*1.6); leib.scale.y=1+a*.05; kopf.position.y=.42+a*.025; zz.forEach((q,i)=>{ const u=(t*.22+i/3)%1; q.position.set(1.0+u*.9+Math.sin(u*6)*.12,1.35+u*1.2,.2); q.scale.setScalar(.45+u*.6); q.visible=u<.9; }); }); } },
  { x:5.4, z:HINTEN, wand:'hinten', steh:[5.4,-11.2], kasten:[3.9,1.5], treffer:[3.8,3.8,1.2], trefferY:.1, baue(g,k){ /* 3 Wurzelregal */
      [-1,1].forEach(s=>{ wurzel(g,[[s*2.0,0,.85],[s*1.65,.6,.55],[s*1.8,1.7,.4],[s*1.6,2.7,.45],[s*1.8,3.7,.3],[s*1.55,4.25,.1]],.22,.1,W2); wurzel(g,[[s*1.65,.6,.55],[s*1.15,.1,.9]],.12,.05,W3); });
      [.75,1.95,3.15].forEach((y,i)=>{ box(g,3.5-i*.15,.16,.92,HELLHOLZ,0,y,.5); box(g,3.52-i*.15,.07,.05,HOLZ,0,y-.03,.97); wurzel(g,[[-1.7,y-.14,.8],[0,y-.3,.65],[1.7,y-.12,.8]],.07,.07,W3); });
      /* oben: Federsammlung in zwei Tonbechern */
      [[-.9,[ROT,WEISS,BLAU]],[.9,[GELB,0x38a878,0x9a58c0]]].forEach(([x,F])=>{
        rohr(g,.27,.18,.42,0xc0663a,x,3.44,.55); flach(ring(g,.27,.035,CREME,x,3.65,.55));
        F.forEach((f,i)=>{ const q=gruppe(g,x+(i-1)*.1,3.58,.55+(i===1?-.05:.05)); q.rotation.z=(1-i)*.5; strich(q,[0,0,0],[0,.9,0],.018,CREME); ball(q,.3,f,0,.6,0,.42,1.35,.12); ball(q,.1,SCHWARZ,0,.94,.012,.6,.8,.4); }); });
      /* eine einzelne große Feder liegt in der Mitte */
      strich(g,[-.35,3.34,.75],[.4,3.34,.65],.016,CREME); ball(g,.28,0x48a0d8,.1,3.35,.68,1.3,.12,.45);
      /* Mitte: Steinsammlung auf kleinen Holzklötzen: matte Steine und glatte Kiesel */
      [[-1.2,0x9a8f80],[-.4,0xb8a890],[.4,0x7a746a],[1.2,0xa89078]].forEach(([x,f])=>{ box(g,.5,.1,.45,HOLZ3,x,2.08,.58);
        ball(g,.2,f,x-.04,2.25,.6,1.2,.8,.9); ball(g,.12,f,x+.17,2.19,.7,1.1,.75,1); });
      [[-.8,0x8aa0b8,.13],[0,0xe8e0d0,.15],[.8,0x586870,.12]].forEach(([x,f,r])=>{ ball(g,r,f,x,2.03+r*.65,.72,1.3,.75,1); flach(ring(g,r*.75,.018,WEISS,x,2.03+r*.65,.72+r*.7)); });
      /* unten: helle und rötliche Wurzelknollen mit Spitzen und grünen Trieben */
      [[-1.2,0xf0e0b8,.27],[-.55,0xd86078,.25],[.1,0xf4e8c8,.22],[.7,0xe08850,.26],[1.3,0xc85070,.2]].forEach(([x,f,r],i)=>{ const y=.83+r*1.05;
        ball(g,r,f,x,y,.6,1.05,.9,1); ball(g,r*.55,f,x+(i%2?.16:-.16),y-.04,.72,1,.85,1);
        const sp=kegel(g,.05,.3,CREME,x+r*1.2,.89,.7); sp.rotation.z=-1.45;
        strich(g,[x,y+r*.7,.6],[x-.1,y+r+.25,.6],.02,LAUB3); strich(g,[x,y+r*.7,.6],[x+.12,y+r+.2,.62],.02,LAUB3); ball(g,.09,LAUB2,x-.13,y+r+.28,.6,1.2,.5,.6); ball(g,.08,MOOS2,x+.15,y+r+.23,.62,1.2,.5,.6); }); } },
  { x:5.0, z:-4.8, steh:[4.4,-2.7], r:1.4, treffer:[2.8,1.8,2.6], baue(g,k){ /* 4 Eichelhaufen */
      ball(g,1.0,0x7a5428,0,.1,0,1.15,.75,1.1);
      const L=[];
      for(let i=0;i<85;i++){ const az=i*2.39996, el=Math.asin(Math.min(.98,(i+.5)/85)), r=1+zufall()*.07;
        L.push([Math.cos(el)*Math.cos(az)*1.22*r, .16+Math.sin(el)*.95*r, Math.cos(el)*Math.sin(az)*1.15*r, 1.25, zufall()*6, (zufall()-.5)*1.3+Math.sin(az)*.5, (zufall()-.5)*1.3-Math.cos(az)*.5]); }
      L.push([0,1.36,0,1.7,0,.1,.15]);
      [[1.55,.4],[1.35,-.85],[-1.5,.55],[.45,1.45],[-.9,1.25]].forEach(([x,z],i)=>L.push([x,.17,z,1.25,i,1.35,i*.4]));
      eicheln(g,L);
      /* zwei Eichenblätter */
      [[-1.35,-.5,.6],[1.05,1.0,-.7]].forEach(([x,z,d])=>{ const b=gruppe(g,x,.08,z); b.rotation.y=d; [[0,0,.3],[.3,.18,.18],[.3,-.18,.18],[-.28,.15,.16],[-.28,-.15,.16],[.55,0,.16]].forEach(([a,c,r])=>ball(b,r,LAUB2,a,0,c,1,.14,1)); strich(b,[-.6,.05,0],[.6,.05,0],.018,LAUB3); }); } },
  { x:-4.4, z:2.2, steh:[-3.8,4.15], r:1.25, treffer:[2.5,1.4,2.4], baue(g,k){ /* 5 Wasserschale */
      const S=0xb8b0a4, D=0x847c70;
      walze(g,.8,.16,D,0,.08,0);
      rohr(g,1.18,.75,.52,S,0,.4,0,26,true); walze(g,.76,.08,S,0,.17,0); flach(ring(g,1.18,.11,0xd0c8ba,0,.67,0)); flach(ring(g,.98,.04,D,0,.42,0));
      walze(g,1.1,.04,0x48b4e8,0,.58,0);
      /* schwimmendes Blatt mit Blüte */
      const b=gruppe(g,.35,.62,.2); b.userData.lebendig=true; ball(b,.34,LAUB2,0,0,0,1.2,.08,.85); strich(b,[-.4,.03,0],[.4,.03,0],.016,LAUB3); for(let i=0;i<5;i++){ const a=i*1.257; ball(b,.09,0xffc0d8,Math.cos(a)*.1,.08,Math.sin(a)*.1,1,.5,1); } ball(b,.06,GELB,0,.11,0);
      /* Tropfen fällt, Wellenringe laufen */
      const wm=basis(0xe8fbff,{transparent:true,opacity:.7,depthWrite:false});
      const wellen=[0,1].map(()=>{ const w=hell(ring(g,1,.022,wm,-.3,.612,-.15)); w.rotation.x=Math.PI/2; return w; });
      const tr=gruppe(g,-.3,2,-.15); tr.userData.lebendig=true; hell(ball(tr,.08,basis(0x80d8ff),0,0,0,1,1.5,1));
      /* kleine Steine am Fuß */
      [[1.05,.55,.17],[-1.0,.7,.13],[.7,.95,.1]].forEach(([x,z,r])=>ball(g,r,D,x,r*.6,z,1.2,.7,1));
      k.anim.push(t=>{ const u=(t*.55)%1; tr.position.y=u<.5?3.0-u*u*9.6:.6; tr.visible=u<.5; wellen.forEach((w,i)=>{ const q=Math.max(0,u-.5-i*.14)*2.2; w.visible=q>0&&q<.9; const r=.1+q*.65; w.scale.set(r,r,1); }); b.rotation.y=t*.25; b.position.y=.62+Math.sin(t*2)*.012; }); } },
  { x:12.0, z:HINTEN, wand:'hinten', steh:[12.0,-11.3], kasten:[3.8,.9], treffer:[3.6,2.9,.8], trefferY:1.15, baue(g,k){ /* 6 Erdkarte */
      box(g,3.3,2.55,.1,0xc8a868,0,2.6,.2);
      WA.tafel(g,kartenBild(),3.1,2.32,0,2.6,.265);
      /* Rahmen aus Ästen, an den Ecken mit Schnur gebunden */
      [1.33,3.87].forEach(y=>{ strich(g,[-1.95,y,.32],[1.95,y+.03,.32],.11,W3); });
      [-1.67,1.67].forEach(x=>strich(g,[x,1.05,.36],[x,4.15,.36],.1,W2));
      [-1.67,1.67].forEach(x=>[1.34,3.88].forEach(y=>{ ball(g,.17,CREME,x,y,.38,1,1,.8); ball(g,.07,ROT,x,y,.52); }));
      strich(g,[-1.4,4.0,.3],[0,4.5,.15],.03,CREME); strich(g,[1.4,4.0,.3],[0,4.5,.15],.03,CREME); ball(g,.13,W3,0,4.52,.18); } },
  { x:4.6, z:2.1, steh:[4.1,3.9], r:1.05, treffer:[2.0,2.7,1.9], baue(g,k){ /* 7 Käferglas auf einem Baumstumpf */
      rohr(g,.82,.98,.75,0x7e522c,0,.38,0,16); walze(g,.8,.05,HELLHOLZ,0,.77,0); [.55,.3].forEach(r=>flach(ring(g,r,.018,HOLZ,0,.805,0)));
      [0,1,2,3,4].forEach(i=>{ const a=i*1.257+.3; wurzel(g,[[Math.cos(a)*.8,.35,Math.sin(a)*.8],[Math.cos(a)*1.05,.07,Math.sin(a)*1.05]],.17,.07,0x6a4222); });
      const gm=new THREE.MeshLambertMaterial({color:0xc8ecff,transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide});
      const glas=new THREE.Mesh(new THREE.CylinderGeometry(.72,.72,1.35,22,1,true),gm); glas.position.set(0,1.5,0); g.add(glas);
      [.86,2.17].forEach(y=>flach(ring(g,.72,.025,0x9ac8d8,0,y,0)));
      /* Stoffdeckel mit Schnur und Luftlöchern */
      walze(g,.8,.18,ROT,0,2.28,0); walze(g,.64,.08,ROT,0,2.4,0); flach(ring(g,.76,.045,CREME,0,2.19,0)); [[0,0],[.28,.12],[-.25,.18],[.05,-.3],[-.28,-.18],[.25,-.2]].forEach(([x,z])=>walze(g,.05,.02,SCHWARZ,x,2.445,z));
      /* Erde, Zweig, Blätter */
      walze(g,.68,.16,ERDE2,0,.9,0); wurzel(g,[[-.4,.95,.1],[-.05,1.35,0],[.3,1.7,-.15]],.06,.035,W2); strich(g,[-.05,1.35,0],[.3,1.35,.25],.03,W2);
      [[.32,1.74,-.15],[.33,1.37,.27],[-.25,1.04,-.25],[.2,1.03,.28]].forEach(p=>ball(g,.17,LAUB2,p[0],p[1],p[2],1.3,.25,.8));
      /* Käfer krabbeln */
      const kaefer=(farbe,punkte)=>{ const q=gruppe(g,0,0,0); q.userData.lebendig=true; ball(q,.17,farbe,0,.07,0,1.15,.65,.95); ball(q,.085,SCHWARZ,.2,.07,0); strich(q,[-.18,.18,0],[.14,.18,0],.012,SCHWARZ);
        [[-.05,.1],[-.06,-.1]].forEach(([a,b])=>ball(q,.032,punkte,a,.165,b,1,.5,1));
        [-1,1].forEach(s=>{ [-.1,.02,.13].forEach(x=>strich(q,[x,.05,s*.12],[x+.03,-.03,s*.23],.014,SCHWARZ)); strich(q,[.24,.1,s*.04],[.34,.2,s*.11],.01,SCHWARZ); }); verschmelze(q); return q; };
      const A=kaefer(0xe03020,SCHWARZ), B1=kaefer(0x28a060,0xb0f0c0), C=kaefer(0x3060d0,0xb0d0ff);
      A.scale.setScalar(1.35); B1.scale.setScalar(1.25); C.scale.setScalar(1.2);
      k.anim.push(t=>{ const a=t*.5; A.position.set(Math.cos(a)*.36,1.03,Math.sin(a)*.36); A.rotation.y=-a-Math.PI/2;
        const u=Math.sin(t*.45)*.5+.5; B1.position.set(-.3+u*.55,1.05+u*.7,.14-u*.26); B1.rotation.set(0,Math.cos(t*.45)>0?0:Math.PI,Math.cos(t*.45)>0?.75:-.75);
        const b=-t*.35+2; C.position.set(Math.cos(b)*.43,1.55+Math.sin(t*.3)*.28,Math.sin(b)*.43); C.rotation.set(0,Math.PI/2-b,0); C.rotation.x=0; }); } },
  { x:11.0, z:-3.2, steh:[10.3,-.95], r:1.65, treffer:[3.2,2.4,3.0], baue(g,k){ /* 8 Maulwurfshügel */
      const E1=0x5a3418, E2=0x47280f, E3=0x70461f;
      rohr(g,.68,1.55,.95,E1,0,.47,0,16); flach(ring(g,.62,.19,E3,0,.95,0)); walze(g,.55,.03,0x1e1006,0,.97,0);
      for(let i=0;i<46;i++){ const a=i*2.4, u=(i%11)/11, r=1.6-u*.9; brocken(g,Math.cos(a)*r,.1+u*.82,Math.sin(a)*r,.16+zufall()*.14,[E1,E2,E3][i%3]); }
      const m=gruppe(g,0,1,0); m.userData.lebendig=true;
      const F=0x4a4a58, P=0xf4a4a8;
      ball(m,.44,F,0,.02,0,1,1.35,1); ball(m,.37,F,0,.55,.04); ball(m,.2,0x6a6a7a,0,.45,.28,1.1,.8,1); const s=flach(kegel(m,.14,.36,P,0,.47,.5)); s.scale.z=.12; ball(m,.09,0xe8707c,0,.47,.68);
      [-1,1].forEach(v=>{ ball(m,.065,SCHWARZ,v*.15,.67,.34); ball(m,.022,WEISS,v*.14,.69,.395); ball(m,.1,F,v*.28,.82,0);
        /* große Grabschaufeln auf dem Rand */
        ball(m,.2,P,v*.5,.08,.34,1.15,.4,1); [-.11,0,.11].forEach(a=>ball(m,.055,P,v*.5+a*1.2,.07,.54,1,.7,1.6)); [-1,1].forEach(w=>strich(m,[v*.07,.44,.52],[v*.34,.45+w*.07,.55],.008,CREME)); });
      verschmelze(m);
      k.anim.push(t=>{ const u=t%7; const a=u<.7?u/.7:u<4.6?1:u<5.3?1-(u-4.6)/.7:0; m.position.y=.28+a*.78; m.rotation.y=u>1.2&&u<4.4?Math.sin((u-1.2)*2.2)*.55:0; }); } },
  { x:-10.4, z:5.4, steh:[-9.3,7.95], r:2.0, treffer:[4.0,1.7,3.6], baue(g,k){ /* 9 Junge Füchse spielen */
      const jung=(x,z,dreh,o)=>{ const f=WA.fuchs(k,g,x,z,dreh,o); f.kopf.scale.setScalar(1.22); return f; };
      jung(-1.0,-.55,-.35,{gr:.7,sitzt:true,phase:1});   /* schaut zu */
      const b=jung(.9,-.3,Math.PI+.35,{gr:.66,sitzt:false,ruhig:true});
      const c=jung(0,.9,0,{gr:.62,sitzt:false,ruhig:true});
      /* Spielball aus Moos mit roter Schnur */
      const ba=gruppe(g,-.05,.26,-.2); ba.userData.lebendig=true; ball(ba,.26,MOOS2,0,0,0); ring(ba,.265,.028,ROT,0,0,0); const q=ring(ba,.265,.028,GELB,0,0,0); q.rotation.y=Math.PI/2;
      k.anim.push(t=>{ /* b hüpft auf den Ball zu */
        const h=Math.max(0,Math.sin(t*3.2)); b.g.position.set(.95-h*.25,h*.45,-.3); b.g.rotation.z=h*.25; b.schwanz.rotation.y=Math.sin(t*7)*.4; b.kopf.rotation.z=-h*.2;
        ba.position.set(-.05+Math.sin(t*1.6)*.28,.26,-.2); ba.rotation.z=-Math.sin(t*1.6)*1.1;
        /* c flitzt im Halbkreis hin und her */
        const w=Math.PI/2+Math.sin(t*.9)*1.25, r=1.25; c.g.position.set(Math.cos(w)*r*1.15,Math.abs(Math.sin(t*8))*.1,Math.sin(w)*r*.9-.1);
        const richt=Math.cos(t*.9)>0?1:-1; c.g.rotation.y=Math.atan2(-Math.cos(w)*.9*richt,-Math.sin(w)*1.15*richt); c.schwanz.rotation.y=Math.sin(t*9)*.3; });
      } },
  { x:11.0, z:4.7, dreh:-.22, steh:[10.3,6.75], kasten:[3.1,1.9], treffer:[3.0,2.1,1.8], baue(g,k){ /* 10 große Schnecke mit Haus */
      const w=gruppe(g,0,0,0); w.scale.setScalar(.8);
      const K=0xd8d888, K2=0xb4b860, H1=0xd87830, H2=0x6e3410, H3=0xf4b860;
      /* weicher Fuß */
      ball(w,.5,K,-.1,.2,0,3.1,.42,.85); ball(w,.3,K2,-1.6,.12,0,1.5,.4,.8);
      wurzel(w,[[.8,.28,0],[1.2,.55,0],[1.38,.98,0]],.34,.3,K); ball(w,.38,K,1.45,1.08,0,1.05,1,1);
      const mund=ring(w,.13,.025,H2,1.8,1.0,0,Math.PI); mund.rotation.set(0,Math.PI/2,Math.PI);
      [-1,1].forEach(s=>{ ball(w,.09,0xf0a098,1.72,1.12,s*.23,.6,.8,1); strich(w,[1.65,.82,s*.18],[1.98,.75,s*.3],.04,K); ball(w,.06,K2,1.98,.75,s*.3); });
      /* Haus mit Spirale auf beiden Seiten */
      const cx=-.42, cy=1.28;
      ball(w,1.08,H1,cx,cy,0,1.05,1,.55);
      [-1,1].forEach(s=>{ let alt=null;
        for(let i=0;i<=46;i++){ const a=i*.29-1.3, r=.98*(1-i/50), z=s*(.55*1.08*Math.sqrt(Math.max(.04,1-(r/1.1)*(r/1.1)))+.04), p=[cx+Math.cos(a)*r*1.05*s,cy+Math.sin(a)*r,z];
          if(alt){ strich(w,alt,p,.075-i*.0008,H2); ball(w,.075-i*.0008,H2,p[0],p[1],p[2]); } alt=p; }
        ball(w,.13,H3,cx,cy,s*.64,1,1,.5); });
      ring(w,1.09,.07,H3,cx,cy,0);
      /* Augen auf langen Stielen wippen */
      const augen=[-1,1].map(s=>{ const q=gruppe(w,1.5,1.35,s*.17); q.userData.lebendig=true; strich(q,[0,0,0],[.22,.72,s*.14],.065,K); ball(q,.17,WEISS,.23,.8,s*.15); ball(q,.085,SCHWARZ,.36,.82,s*.19); ball(q,.028,WEISS,.43,.86,s*.18); return q; });
      /* Salatblatt vor der Schnecke */
      ball(w,.4,LAUB2,1.65,.07,.55,1,.12,.75); strich(w,[1.3,.12,.55],[2.0,.12,.55],.016,LAUB3);
      k.anim.push(t=>{ augen.forEach((q,i)=>{ q.rotation.z=Math.sin(t*1.2+i*1.9)*.2; q.rotation.x=Math.sin(t*.8+i*2.7)*.14; }); }); } }
];

return { titel:'Der Fuchsbau', breite:36, tiefe:27, oben:['40,24,12','54,34,18','70,46,26'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Der Teich in der Mittagssonne. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu (Ruderboot, Reiher).
   Ausgang: die dichte Schilfwand hinten in der Mitte, sie teilt sich; dahinter führen Trittsteine über den Bach zum Waldweg. */
RAEUME3D.wald[2] = (function(){
const B=36, T=27;
const CX=0, CZ=-.8, RA=9.6, RB=5.6;      /* Teich: Mitte und halbe Achsen */
const SZ=-12.7;                           /* Ebene der Schilfwand */
const SAND=0xcbaa72, SAND2=0xb8945e, W1=0x4aaed0, W2=0x3592bc, W3=0x2a7ca8;
const BLATT=0x4f9a3c, BLATT2=0x3a7e30, HALM=0x6e9a30, HALM2=0x8cb440, HALM3=0xa8b84a, KOLBEN=0x7a4620;
const OTTER=0x7a5232, OTTER2=0xd8b88a, GRAU=0x8e9cac, GRAU2=0x647282, SCHW=0x16120e, WEISS=0xfaf6ee, GELB=0xf8d63a, ORANGE=0xf0861a;

const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });
/* Rand des Teichs: Faktor je Richtung */
const welle=a=>1+.05*Math.sin(3*a+1)+.03*Math.cos(5*a);
function imWasser(x,z,rand){ const u=(x-CX)/RA, v=(z-CZ)/RB; return Math.hypot(u,v)<welle(Math.atan2(v,u))*(rand||1); }
const randPunkt=(a,f)=>[CX+Math.cos(a)*RA*welle(a)*f, CZ+Math.sin(a)*RB*welle(a)*f];

/* =============== Bausteine =============== */
/* ausgeschnittene flache Fläche am Boden, Punkte [x,z] */
function flaeche(par,punkte,y,material){
  const f=new THREE.Shape(); punkte.forEach((p,i)=>{ if(i) f.lineTo(p[0],-p[1]); else f.moveTo(p[0],-p[1]); });
  const m=new THREE.Mesh(new THREE.ShapeGeometry(f),material); m.rotation.x=-Math.PI/2; m.position.y=y; m.receiveShadow=true; par.add(m); return m;
}
/* Büschel Schilf mit Rohrkolben in Instanzlisten: L={halm:[],kolben:[]} */
function schilfListe(L,x,z,n,streu,h,kolbenJeder){
  for(let i=0;i<n;i++){ const px=x+(zufall()-.5)*streu, pz=z+(zufall()-.5)*streu*.7, hh=h*(.65+zufall()*.45), nz=(zufall()-.5)*.14, nx=(zufall()-.5)*.1;
    L.halm.push([px,hh/2,pz,.035,hh,.035,[HALM,HALM2,HALM3][i%3],0,nx,nz]);
    if(i%(kolbenJeder||4)===0) L.kolben.push([px-Math.sin(nz)*hh*.42,hh*.92,pz+Math.sin(nx)*hh*.42,.085,.4,.085,KOLBEN,0,nx,nz]);
    else if(i%2) L.halm.push([px+.14,hh*.3,pz,.03,hh*.62,.03,HALM2,0,0,-.45]); }
}
function schilfSetzen(par,L){ if(L.halm.length) WA.viele(par,GEO.cyl,L.halm); if(L.kolben.length) WA.viele(par,GEO.cyl,L.kolben); }
/* Seerosenblatt (flach, mit Kerbe) */
function blatt(g,x,y,z,r,farbe,dreh){
  const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.05,24,1,false,.35,Math.PI*2-.7),mat(farbe)); m.position.set(x,y,z); m.rotation.y=dreh||0; m.receiveShadow=true; g.add(m);
  [1.2,2.4,3.6,4.8].forEach(a=>{ const w=a+(dreh||0); strich(g,[x,y+.028,z],[x+Math.sin(w)*r*.82,y+.028,z+Math.cos(w)*r*.82],.014,0x86c458); });
  return m;
}
function schildAmPfahl(g,kopf,male){
  [-1.05,1.05].forEach(x=>{ walze(g,.12,2.3,WA.HOLZ2,x,1.15,-.12); kegel(g,.17,.2,WA.HOLZ3,x,2.4,-.12); });
  box(g,2.75,1.95,.14,WA.HOLZ,0,1.95,0);
  const t=bild(512,352,c=>{ c.fillStyle='#fffbea'; c.fillRect(0,0,512,352); c.fillStyle=kopf; c.fillRect(0,0,512,66); male(c); });
  WA.tafel(g,t,2.52,1.73,0,1.95,.08);
  box(g,3.05,.16,.4,WA.HOLZ2,0,3.02,.02);
}
const oval=(c,x,y,a,b,f,d)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,a,b,d||0,0,6.283); c.fill(); };
const zug=(c,P,f,d)=>{ c.strokeStyle=f; c.lineWidth=d; c.lineCap='round'; c.beginPath(); c.moveTo(P[0],P[1]); c.quadraticCurveTo(P[2],P[3],P[4],P[5]); c.stroke(); };

/* =============== die zehn Gegenstände =============== */
/* 1 Fischtafel */
function fischtafel(g){
  schildAmPfahl(g,'#2a5a8a',c=>{
    const fisch=(x,y,f,s)=>{ oval(c,x,y,66*s,32*s,f); c.fillStyle=f; c.beginPath(); c.moveTo(x+55*s,y); c.lineTo(x+98*s,y-30*s); c.lineTo(x+98*s,y+30*s); c.fill();
      c.beginPath(); c.moveTo(x-18*s,y-28*s); c.lineTo(x+8*s,y-52*s); c.lineTo(x+28*s,y-26*s); c.fill(); oval(c,x-38*s,y-8*s,9*s,9*s,'#fff'); oval(c,x-40*s,y-8*s,5*s,5*s,'#111'); zug(c,[x-15*s,y-20*s,x,y,x-15*s,y+20*s],'rgba(0,0,0,.3)',4); };
    fisch(236,33,'#ffffff',.45);
    fisch(120,135,'#ee7a1a',1); fisch(375,135,'#2e86c1',1); fisch(120,262,'#8a949e',1); fisch(375,262,'#3aae5a',1);
    [[230,100],[236,215],[480,205],[40,205]].forEach(([x,y])=>{ c.strokeStyle='#7ac0e0'; c.lineWidth=5; c.beginPath(); c.arc(x,y,9,0,6.283); c.stroke(); });
  });
}
/* 2 Libelle auf Schilf: große Libelle auf einem hohen Halm, flirrende Flügel */
function libelle(g,k){
  k.kasten(-8.1,-.8,2.9,1.7);
  const L={halm:[],kolben:[]};
  [[-1.0,-.35],[-.75,.4],[.95,-.45],[1.05,.3],[0,-.6]].forEach(([x,z])=>schilfListe(L,x,z,8,.55,1.7,3));
  schilfSetzen(g,L);
  strich(g,[.35,0,.1],[.2,1.9,.12],.065,HALM); strich(g,[-.5,0,.25],[-.38,1.7,.15],.05,HALM2); strich(g,[-.5,1.6,.15],[.7,1.88,.12],.045,0x7a9a30);
  const li=gruppe(g,.05,2.14,.15); li.userData.lebendig=true; li.rotation.y=-.35; li.rotation.z=.12;
  const r=gruppe(li,0,0,0), BLAU=0x1668d8, TUERKIS=0x28d0e8;
  ball(r,.24,BLAU,.12,0,0,1.35,.95,.95);
  for(let i=0;i<8;i++) ball(r,.135-i*.007,i%2?SCHW:TUERKIS,-.24-i*.17,-.01-i*.012,0,1.35,.8,.8);
  ball(r,.19,0x2a9a4a,.49,.04,0); [-1,1].forEach(s=>{ ball(r,.135,0x8a2ad0,.57,.1,s*.13); ball(r,.035,WEISS,.66,.17,s*.17); });
  [-1,1].forEach(s=>[.28,.1,-.08].forEach((x,i)=>strich(r,[x,-.1,s*.1],[x+(1-i)*.14,-.3,s*.3],.022,SCHW)));
  verschmelze(r);
  const fm=new THREE.MeshLambertMaterial({color:0xe4f8ff,emissive:0x4a7a90,transparent:true,opacity:.82,depthWrite:false});
  const fl=[-1,1].map(s=>{ const f=gruppe(li,.1,.15,s*.1); [[.14,.95,.28],[-.2,.82,-.28]].forEach(([x,l,w])=>{ const a=gruppe(f,x,0,0); a.rotation.y=w*s;
      const m=new THREE.Mesh(GEO.sph,fm); m.position.set(0,0,s*l*.5); m.scale.set(.15,.018,l*.52); a.add(m); strich(a,[.1,.01,0],[.02,.02,s*l*.94],.012,0x2a6a90); }); return f; });
  k.anim.push(t=>{ fl.forEach((f,i)=>f.rotation.x=(i?-1:1)*(.18+Math.sin(t*14)*.14)); li.position.y=2.14+Math.sin(t*2.3)*.04; });
}
/* 3 Otter-Rutsche: Lehmhang von links oben nach rechts ins Wasser, oben der Fischotter */
function otterrutsche(g,k){
  const seite=(punkte,tiefe,farbe,z)=>{ const f=new THREE.Shape(); punkte.forEach((p,i)=>{ if(i) f.lineTo(p[0],p[1]); else f.moveTo(p[0],p[1]); });
    const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tiefe,bevelEnabled:false}),mat(farbe)); m.position.z=z; m.castShadow=true; m.receiveShadow=true; g.add(m); };
  seite([[-2.1,0],[-2,1.05],[-1.55,1.45],[-.65,1.45],[.1,.95],[.9,.5],[1.65,.18],[2.1,0]],1.5,0x8a5e36,-.75);
  /* nasse, glatte Rinne */
  [[-.65,1.47,.1,.97],[.1,.97,.9,.52],[.9,.52,1.65,.2],[1.65,.2,2.35,.04]].forEach(([a,b,c,d])=>{ const m=box(g,Math.hypot(c-a,d-b)+.06,.07,.9,0xc89462,(a+c)/2,(b+d)/2,0); m.rotation.z=Math.atan2(d-b,c-a);
    [-1,1].forEach(s=>strich(g,[a,b+.07,s*.5],[c,d+.07,s*.5],.085,0x5e3c1e)); strich(g,[a+.08,b+.04,.18],[c-.08,d+.09,.18],.022,0xf0d4a8); });
  ball(g,.55,BLATT,-1.8,.55,-.7,1.1,.9,.8); ball(g,.35,BLATT2,-2,.4,.65,1,.9,1); ball(g,.28,WA.STEIN,1.0,.15,-.85,1.2,.7,1); ball(g,.22,WA.STEIN2,-.6,.12,.9,1.2,.7,1);
  /* Fischotter */
  const o=gruppe(g,-1.12,1.45,0); o.userData.lebendig=true; const r=gruppe(o,0,0,0);
  ball(r,.34,OTTER,0,.32,0,1.8,.9,.95); ball(r,.22,OTTER2,.22,.24,0,1.7,.75,1.05);
  [-1,1].forEach(s=>{ ball(r,.11,OTTER,.45,.08,s*.28,1.5,.7,.9); ball(r,.11,OTTER,-.35,.08,s*.29,1.5,.7,.9); });
  [[[-.45,.28,0],[-.8,.2,.45],.2],[[-.8,.2,.45],[-.65,.12,.88],.16],[[-.65,.12,.88],[-.2,-.12,1.08],.11]].forEach(([a,b,d])=>{ strich(r,a,b,d,OTTER); ball(r,d,OTTER,b[0],b[1],b[2]); });
  strich(r,[.35,.42,0],[.62,.72,0],.2,OTTER);
  verschmelze(r);
  const kopf=gruppe(o,.7,.82,0), h=gruppe(kopf,0,0,0);
  ball(h,.27,OTTER,0,0,0,1.15,.7,1.2); ball(h,.17,OTTER2,.2,-.06,0,1.1,.55,1.4); ball(h,.065,SCHW,.38,-.01,0,1,.85,1.2);
  [-1,1].forEach(s=>{ ball(h,.05,OTTER,-.1,.14,s*.25); ball(h,.025,OTTER2,-.07,.15,s*.26); ball(h,.042,SCHW,.26,.07,s*.13); ball(h,.014,WEISS,.295,.088,s*.14);
    [-.03,.05].forEach(v=>strich(h,[.3,-.08,s*.1],[.38,-.1+v,s*.45],.007,WEISS)); });
  verschmelze(h);
  k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.9)*.45; kopf.rotation.z=Math.sin(t*1.9)*.08; });
  /* Spritzer am unteren Ende */
  const nass=basis(0xd8f4ff,{transparent:true,opacity:.9});
  const tr=[0,1,2,3,4,5].map(i=>{ const m=new THREE.Mesh(GEO.sph,nass); m.scale.set(.06,.08,.06); g.add(m); return m; });
  k.anim.push(t=>tr.forEach((m,i)=>{ const p=(t*.9+i/6)%1; m.position.set(2.3+p*(.35+i%3*.2),.1+Math.sin(p*Math.PI)*(.4+(i%2)*.25),(i-2.5)*.17*(.4+p)); }));
}
/* 4 Frosch auf einem Seerosenblatt */
function frosch(g,k){
  blatt(g,0,.09,0,1.15,0x3f9a3a,2.5);
  const F=0x5cd030, F2=0x3a9a1c, f=gruppe(g,0,.12,.05); f.userData.lebendig=true; const r=gruppe(f,0,0,0);
  ball(r,.46,F,0,.4,-.05,1.05,.85,1); ball(r,.32,0xd8f490,0,.33,.22,1,.82,.8);
  ball(r,.37,F,0,.74,.14,1.2,.78,.95);
  [-1,1].forEach(s=>{ ball(r,.18,F,s*.24,1.01,.17); ball(r,.13,WEISS,s*.24,1.04,.29); ball(r,.07,SCHW,s*.24,1.04,.4);  ball(r,.022,WEISS,s*.21,1.08,.46);
    ball(r,.27,F2,s*.5,.22,-.12,.85,.72,1.3); strich(r,[s*.55,.18,.05],[s*.72,.05,.35],.08,F); [-.1,.03,.16].forEach(v=>ball(r,.065,F,s*.72+v,.05,.43,1,.55,1.4));
    strich(r,[s*.27,.4,.28],[s*.34,.05,.48],.075,F); [-.09,.02,.13].forEach(v=>ball(r,.05,F,s*.34+v,.04,.55,1,.55,1.3)); ball(r,.06,0xf09a9a,s*.34,.72,.4,1,.7,.5); });
  strich(r,[-.2,.7,.5],[0,.66,.52],.02,0x1c4a10); strich(r,[0,.66,.52],[.2,.7,.5],.02,0x1c4a10);
  verschmelze(r);
  const kehle=ball(f,.17,0xf0ffb0,0,.55,.42);
  k.anim.push(t=>{ const q=Math.max(0,Math.sin(t*1.3))*Math.abs(Math.sin(t*7)); kehle.scale.set(.15+q*.09,.12+q*.1,.12+q*.07); f.position.y=.12+Math.max(0,Math.sin(t*.8)-.93)*3; });
}
/* 5 Holzsteg: ragt vom Ufer (+z) ins Wasser (-z) */
function holzsteg(g,k){
  k.kasten(-1,5.1,2.5,1.2);
  for(let i=0;i<10;i++){ const z=1.85-i*.4; box(g,2.1+(i%3)*.05,.14,.35,i%2?0xb98250:0xa06a3a,(i%2)*.03,.42,z); [-.85,.85].forEach(x=>ball(g,.035,WA.EISEN,x,.5,z,1,.5,1)); }
  [-.82,.82].forEach(x=>box(g,.16,.14,4,WA.HOLZ3,x,.29,.05));
  [-1.12,1.12].forEach(x=>{ [1.5,-.15,-1.75].forEach((z,i)=>{ const h=i===1?1.25:1.35; walze(g,.14,h,WA.HOLZ2,x,h/2,z); walze(g,.16,.09,WA.HELLHOLZ,x,h+.02,z); ring(g,.15,.035,0xe8d098,x,h-.18,z).rotation.x=Math.PI/2; });
    [[1.5,-.15],[-.15,-1.75]].forEach(([a,b])=>{ const m=(a+b)/2; strich(g,[x,1.08,a],[x,.86,m],.035,0xe8d098); strich(g,[x,.86,m],[x,1.08,b],.035,0xe8d098); }); });
  /* Leiter am Stegende */
  [-.35,.35].forEach(x=>strich(g,[x,.95,-2.15],[x,-.02,-2.2],.05,WA.HOLZ3)); [.15,.4].forEach(y=>strich(g,[-.35,y,-2.18],[.35,y,-2.18],.04,WA.HOLZ3));
}
/* 6 Pflanzentafel */
function pflanzentafel(g){
  schildAmPfahl(g,'#2f7a44',c=>{
    oval(c,236,33,26,12,'#c8f0a0',-.5); oval(c,278,33,26,12,'#ffffff',.5);
    /* Schilf */
    zug(c,[75,320,60,210,45,105],'#5a8a2a',11); zug(c,[95,320,95,210,105,120],'#6e9a30',11); zug(c,[115,320,135,230,160,150],'#8cb440',10);
    /* Seerose */
    oval(c,262,270,78,30,'#3f8a3a'); for(let i=0;i<7;i++){ const a=-1.4+i*.47; oval(c,262+Math.sin(a)*34,230-Math.cos(a)*28,15,38,i%2?'#f08ac0':'#f8aad4',a); } oval(c,262,238,18,13,'#ffd23a');
    /* Rohrkolben */
    zug(c,[420,320,415,220,420,100],'#6e9a30',9); oval(c,420,150,19,52,'#7a4620'); zug(c,[438,320,450,250,490,190],'#8cb440',10); zug(c,[400,320,385,260,355,215],'#5a8a2a',10);
    c.strokeStyle='#7ac0e0'; c.lineWidth=6; [30,180,340].forEach(x=>{ c.beginPath(); c.moveTo(x,336); c.quadraticCurveTo(x+35,320,x+70,336); c.stroke(); });
  });
}
/* 7 Seerosen: große Gruppe mit rosa und weißen Blüten */
function seerosen(g,k){
  [[0,0,.85,0x4a9c3a,.4],[-1.15,.55,.6,0x3c8a34,2],[.95,.75,.55,0x58aa40,4],[.85,-.85,.65,0x3c8a34,1],[-.8,-.9,.55,0x58aa40,5.2]].forEach(([x,z,r,f,d],i)=>blatt(g,x,.09+i*.004,z,r,f,d));
  [[0,.05,1.15,0xf47ab8],[-1.1,.55,.8,0xfaf4f6],[.9,-.8,.9,0xf89ac8]].forEach(([x,z,s,f],i)=>{
    const b=gruppe(g,x,.14,z); b.userData.lebendig=true; b.scale.setScalar(s);
    for(let ringNr=0;ringNr<3;ringNr++){ const n=[10,8,6][ringNr], nei=[1.15,.72,.34][ringNr];
      for(let j=0;j<n;j++){ const p=gruppe(b,0,ringNr*.05,0); p.rotation.y=j*6.283/n+ringNr*.35; const q=gruppe(p,0,0,0); q.rotation.x=nei; ball(q,.14,ringNr===1&&f!==0xfaf4f6?0xfcc4de:f,0,.28,0,.85,2.1,.4); } }
    ball(b,.17,GELB,0,.24,0,1,.75,1); for(let j=0;j<7;j++) ball(b,.045,ORANGE,Math.cos(j)*.13,.37,Math.sin(j)*.13);
    verschmelze(b); k.anim.push(t=>{ b.position.y=.14+Math.sin(t*1.4+i*2)*.025; b.rotation.y=Math.sin(t*.35+i)*.2; }); });
}
/* 8 Entenmutter mit drei Küken */
function ente(par,x,z,gr,kueken){
  const g=gruppe(par,x,.1,z); g.scale.setScalar(gr); g.userData.lebendig=true; const r=gruppe(g,0,0,0);
  const F=kueken?0xffdc42:0x9a6c40, F2=kueken?0xf0b828:0x6e4626, H=kueken?0xffe870:0xa87c50;
  ball(r,.45,F,0,.24,0,1.45,.82,1); ball(r,.2,F2,-.62,.38,0,1.3,.65,.85); strich(r,[.38,.35,0],[.52,.75,0],.15,H);
  ball(r,.27,H,.57,.85,0); box(r,.28,.07,.21,ORANGE,.88,.8,0); ball(r,.1,ORANGE,1.0,.8,0,.9,.45,1.05);
  [-1,1].forEach(s=>{ ball(r,.05,SCHW,.74,.93,s*.17); ball(r,.017,WEISS,.77,.95,s*.2); ball(r,.28,F2,-.08,.36,s*.34,1.35,.65,.35);
    if(!kueken){ strich(r,[.48,.96,s*.2],[.82,.92,s*.15],.025,0x3e2814); ball(r,.1,0x3a6ac8,-.28,.38,s*.43,1.3,.4,.2); } });
  verschmelze(r); return g;
}
function enten(g,k){
  const mama=ente(g,-.55,-.2,1.05,false);
  const kinder=[[.9,.2],[.15,.75],[1.25,-.65]].map(([x,z])=>ente(g,x,z,.55,true));
  const wm=basis(0xdaf4ff,{transparent:true,opacity:.55,depthWrite:false});
  const wellen=[0,1].map(()=>{ const m=new THREE.Mesh(new THREE.TorusGeometry(1,.025,5,32),wm); m.rotation.x=Math.PI/2; m.position.y=.08; g.add(m); return m; });
  k.anim.push(t=>{ mama.position.set(-.55+Math.sin(t*.55)*.2,.1+Math.sin(t*2)*.025,-.2+Math.cos(t*.55)*.15); mama.rotation.y=-.25+Math.sin(t*.4)*.25;
    kinder.forEach((q,i)=>{ const b=[[.9,.2],[.15,.75],[1.25,-.65]][i]; q.position.set(b[0]+Math.sin(t*.8+i*2)*.2,.09+Math.sin(t*2.8+i)*.03,b[1]+Math.cos(t*.8+i*2)*.15); q.rotation.y=-.5+Math.sin(t*.9+i*1.9)*.55; });
    wellen.forEach((m,i)=>{ const p=(t*.28+i*.5)%1; const s=.7+p*1.1; m.scale.set(s,s*.7,.4); }); wm.opacity=.4; });
}
/* 9 Ruderboot (der Bug liegt am Ufer auf) */
function ruderboot(g,k){
  k.kreis(7.35,-5.1,.8);
  const boot=gruppe(g,0,0,0); boot.userData.lebendig=true; const r=gruppe(boot,0,0,0);
  const umriss=(f)=>[[-1.9*f,-.7*f],[-1.9*f,.7*f],[-.9*f,.95*f],[.5*f,.9*f],[1.45*f,.55*f],[2.15*f,0],[1.45*f,-.55*f],[.5*f,-.9*f],[-.9*f,-.95*f]];
  const pfad=(P,f)=>{ P.forEach((p,i)=>{ if(i) f.lineTo(p[0],p[1]); else f.moveTo(p[0],p[1]); }); return f; };
  const schicht=(aussen,innen,h,y,farbe)=>{ const s=pfad(umriss(aussen),new THREE.Shape()); if(innen) s.holes.push(pfad(umriss(innen),new THREE.Path()));
    const m=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:h,bevelEnabled:false}),mat(farbe)); m.rotation.x=-Math.PI/2; m.position.y=y; m.castShadow=true; m.receiveShadow=true; r.add(m); };
  schicht(.84,0,.14,.08,0x7a4a24);
  schicht(.9,.78,.22,.18,0xc8362a);
  schicht(.97,.82,.22,.38,WEISS);
  schicht(1.03,.87,.13,.58,0x9a2418);
  [-1.05,.05,.95].forEach(x=>box(r,.38,.09,x>.5?1.35:1.65,0xd8a866,x,.55,0));
  [-1,1].forEach(s=>{ ring(r,.1,.035,WA.EISEN,-.2,.82,s*.9);
    strich(r,[.75,.66,-s*.42],[-1.15,.98,s*1.45],.055,0xe0b472); const bl=box(r,.7,.07,.3,0x2a6aa8,-1.4,1.02,s*1.69); bl.rotation.y=s*.78; bl.rotation.z=-.1; });
  verschmelze(r);
  k.anim.push(t=>{ boot.position.y=Math.sin(t*1.5)*.035; boot.rotation.z=Math.sin(t*1.1)*.015; boot.rotation.x=Math.sin(t*1.7)*.02; });
}
/* 10 Graureiher */
function reiher(g,k){
  const BEIN=0xd8a032;
  [[-.1,.24,.14],[.2,-.24,-.04]].forEach(([x,z,kn])=>{ strich(g,[x,1.85,z*.8],[x-.2-kn*.3,1.0,z],.06,BEIN); strich(g,[x-.2-kn*.3,1.0,z],[x+kn*.3,.06,z],.052,BEIN); ball(g,.09,BEIN,x-.2-kn*.3,1.0,z);
    [-.18,0,.18].forEach(v=>strich(g,[x+kn*.3,.07,z],[x+kn*.3+.34,.03,z+v],.032,BEIN)); strich(g,[x+kn*.3,.07,z],[x+kn*.3-.17,.03,z],.03,BEIN); });
  ball(g,.47,GRAU,-.05,2.12,0,1.5,.92,.88).rotation.z=.18; ball(g,.3,0xd4dce4,.38,2.1,0,1,1.1,.95);
  [-1,1].forEach(s=>{ ball(g,.35,GRAU2,-.28,2.17,s*.33,1.65,.68,.3).rotation.z=.28; ball(g,.15,0x2c3440,-.92,1.9,s*.2,2,.5,.45).rotation.z=.45; });
  strich(g,[-.65,1.98,0],[-1.15,1.72,0],.11,GRAU2);
  /* langer S-förmiger Hals */
  const hals=new THREE.CatmullRomCurve3([V(.42,2.25,0),V(.8,2.55,0),V(.84,2.9,0),V(.66,3.2,0),V(.62,3.48,0),V(.78,3.68,0)]);
  const hm=new THREE.Mesh(new THREE.TubeGeometry(hals,40,.115,12,false),mat(0xdfe5ec)); hm.castShadow=true; g.add(hm);
  ball(g,.17,0xdfe5ec,.46,2.28,0);
  [[.88,2.62],[.89,2.82],[.8,3.0]].forEach(([x,y])=>ball(g,.03,0x2c3440,x+.045,y,.07));
  const kopf=gruppe(g,.77,3.72,0); kopf.userData.lebendig=true; const h=gruppe(kopf,0,0,0);
  ball(h,.2,WEISS,.04,0,0,1.25,.95,.9);
  const sn=kegel(h,.095,.95,0xf2b21c,.68,-.07,0); sn.rotation.z=-Math.PI/2-.12;
  [-1,1].forEach(s=>{ strich(h,[.09,.07,s*.165],[-.2,.14,s*.1],.022,SCHW); ball(h,.052,0xffd83a,.18,.02,s*.155); ball(h,.028,SCHW,.2,.02,s*.19); });
  strich(h,[-.15,.15,0],[-.55,.06,0],.025,SCHW);
  verschmelze(h);
  ball(g,.26,WA.STEIN,-.55,.1,-.45,1.3,.6,1);
  k.anim.push(t=>{ kopf.rotation.z=Math.sin(t*.7)*.12-Math.max(0,Math.sin(t*.45)-.85)*1.8; kopf.rotation.y=Math.sin(t*.5)*.3; });
}

/* =============== Teich =============== */
function teich(k){
  const sc=k.scene, N=96, ring2=f=>{ const P=[]; for(let i=0;i<N;i++) P.push(randPunkt(i*6.283/N,f)); return P; };
  flaeche(sc,ring2(1.11),.004,mat(SAND));
  flaeche(sc,ring2(1.035),.008,mat(SAND2));
  flaeche(sc,ring2(1),.014,new THREE.MeshLambertMaterial({color:W1,emissive:0x0c3a4a}));
  flaeche(sc,ring2(.78),.019,new THREE.MeshLambertMaterial({color:W2,emissive:0x08283a}));
  flaeche(sc,ring2(.47),.024,new THREE.MeshLambertMaterial({color:W3,emissive:0x06202e}));
  /* Wasser sperren: schmale Streifen quer über den Teich */
  const D=.4;
  for(let z=CZ-RB*1.1;z<CZ+RB*1.1;z+=D){ let a=null,b=null; for(let x=-11.5;x<=11.5;x+=.1){ if(imWasser(x,z+D/2)){ if(a===null) a=x; b=x; } } if(a!==null) k.kasten((a+b)/2,z+D/2,b-a,D); }
  /* Glitzern in der Mittagssonne */
  const n=70, im=new THREE.InstancedMesh(new THREE.OctahedronGeometry(1),basis(0xffffff,{transparent:true,opacity:.9,depthWrite:false}),n), o=new THREE.Object3D(), P=[];
  while(P.length<n){ const x=-9.5+zufall()*19, z=CZ-5.5+zufall()*11; if(imWasser(x,z,.92)) P.push([x,z,zufall()*6.3,.8+zufall()*1.6]); }
  im.frustumCulled=false; sc.add(im);
  k.anim.push(t=>{ P.forEach((p,i)=>{ const s=Math.pow(Math.max(0,Math.sin(t*p[3]+p[2])),6); o.position.set(p[0],.045,p[1]); o.scale.set(.02+s*.24,.012,.008+s*.035); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; });
  /* ruhige Wellenringe */
  const wm=basis(0xc8ecfa,{transparent:true,opacity:.45,depthWrite:false});
  [[-2.5,-2.6,0],[2.4,-.4,.33],[-3.6,.6,.66],[1.2,-4,.5]].forEach(([x,z,v])=>{ const m=new THREE.Mesh(new THREE.TorusGeometry(1,.025,5,32),wm.clone()); m.rotation.x=Math.PI/2; m.position.set(x,.04,z); sc.add(m);
    k.anim.push(t=>{ const p=(t*.2+v)%1; m.scale.set(.15+p*1.2,.15+p*1.2,.3); m.material.opacity=.55*(1-p); }); });
  /* Schilf am Ufer (im flachen Wasser), nicht vor den Gegenständen */
  const L={halm:[],kolben:[]};
  [[1.96,.95],[2.1,.96],[2.9,.95],[3.7,.95],[4.4,.96],[4.55,.94],[4.7,.97],[4.85,.95],[5.0,.96],[5.15,.93],[3.0,.9]].forEach(([a,f],i)=>{ const p=randPunkt(a,f); schilfListe(L,p[0],p[1],i%2?12:9,.9,a>3.4&&a<5.6?1.7:1.15,4); });
  schilfSetzen(sc,L);
  /* Ufersteine */
  const S=[]; for(let i=0;i<110;i++){ const a=i*6.283/110+zufall()*.03, p=randPunkt(a,1.015+zufall()*.04), r=.1+zufall()*.15;
    if(Math.abs(p[0]+1)<1.7 && p[1]>0) continue; S.push([p[0],r*.3,p[1],r*1.2,r*.65,r,[WA.STEIN,WA.STEIN2,0xbcb4a4][i%3],zufall()*3]); }
  WA.viele(sc,new THREE.SphereGeometry(1,8,6),S);
}

/* =============== Ausgang: die Schilfwand =============== */
function schilfwand(k){
  const sc=k.scene;
  const fluegel=[-1,1].map(s=>{
    const g=gruppe(sc,0,0,SZ), L={halm:[],kolben:[]};
    for(let reihe=0;reihe<3;reihe++) for(let i=0;i<30;i++){ const x=s*(.06+i*.108+(reihe%2)*.04), z=(reihe-1)*.24+(zufall()-.5)*.12, h=2.35+reihe*(-.22)+.35+zufall()*.55, nz=(zufall()-.5)*.09;
      L.halm.push([x,h/2,z,.055,h,.055,[HALM,HALM2,HALM3,0x5e8a28][(i+reihe)%4],0,0,nz]);
      if((i+reihe*2)%4===0) L.kolben.push([x-Math.sin(nz)*h*.45,h*.95,z+.05,.1,.48,.1,KOLBEN,0,0,nz]);
      if(i%2===0) L.halm.push([x,h*.28,z+.1,.05,h*.6,.04,HALM2,0,0,(i%4?1:-1)*.32]); }
    schilfSetzen(g,L); return [g,s]; });
  /* Pfosten aus Holz mit Seil als Rahmen */
  const fest=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ const x=s*3.55; walze(fest,.24,3.7,WA.HOLZ,x,1.85,SZ+.15); walze(fest,.29,.18,WA.HELLHOLZ,x,3.75,SZ+.15); [2.6,2.85].forEach(y=>ring(fest,.26,.05,0xe8d098,x,y,SZ+.15).rotation.x=Math.PI/2); ball(fest,.5,WA.STEIN,x+s*.25,.18,SZ+.3,1.1,.65,.9); });
  verschmelze(fest);
  /* Seil mit Brett und Zahlenschloss, verschwindet beim Öffnen */
  const sperre=gruppe(sc,0,0,SZ+.55);
  [-1,1].forEach(s=>{ strich(sperre,[s*3.5,2.75,-.35],[s*1.8,2.35,0],.07,0xe8d098); strich(sperre,[s*1.8,2.35,0],[s*.7,2.3,0],.07,0xe8d098); });
  box(sperre,1.75,1.25,.14,WA.HOLZ3,0,2.22,0);
  WA.zahlenschloss(sperre,0,2.12,.2).scale.set(1.5,1.5,1.3);
  /* dahinter: Bach mit Trittsteinen und der Weg in den Wald */
  const w=gruppe(sc,0,0,0);
  box(w,110,.02,.4,SAND2,0,.002,-14.0); box(w,110,.02,.4,SAND2,0,.002,-17.0);
  box(w,110,.02,2.7,W1,0,.006,-15.5); box(w,110,.02,1.4,W2,0,.012,-15.5);
  [[0,-14.4,.58],[.35,-15.35,.55],[-.15,-16.3,.56]].forEach(([x,z,r])=>{ walze(w,r,.14,WA.STEIN2,x,.04,z).scale.set(r,.12,r*.72); walze(w,r,.04,0xcac2b0,x,.11,z).scale.set(r*.85,.03,r*.6); });
  const fleck=(x,z,r,i)=>{ walze(w,1,1,SAND,x,.014+(i%7)*.0011,z).scale.set(r,.012,r*.85); };
  [[0,-13.4,1.35],[.5,-13.7,.9]].forEach(([x,z,r],i)=>fleck(x,z,r,i+4));
  for(let i=0;i<22;i++){ const z=-17.5-i*.5, mitte=Math.max(0,-z-18.5)*.27; fleck(mitte+Math.sin(i*2.3)*.4,z,1.25+(i%3)*.22,i); }
  for(let i=0;i<10;i++) [-1,1].forEach(s=>{ const z=-17.6-i*1.05, x=s*(2.5+(i%3)*.25)+Math.max(0,i-3)*.35; ball(w,.34,i%2?BLATT:BLATT2,x,.2,z,1.2,.85,1.1); ball(w,.1,[0xf47ab8,GELB,WEISS][i%3],x-s*.1,.52,z+.1); });
  ohneSchatten(w); verschmelze(w);
  const glut=schein(sc,'rgba(255,236,150,.8)',.3,1.8,-19,6); glut.visible=false;
  let tuer=null;
  tuer=ausgang(k,{ steh:[0,-11.2], durch:[0,-17.4], treffer:{x:0,y:1.8,z:SZ+.5,b:7.4,h:3.6,t:1}, name:'Schilfwand', einfach:'Schilf', schildOben:[0,4.3,-12.2], glanz:[0,2.2,SZ+1.1],
    bewege:auf=>{ fluegel.forEach(([g,s])=>{ g.position.x=s*auf*2.5; g.scale.x=1-auf*.62; }); sperre.visible=!(tuer && tuer.offen); glut.visible=auf>.05; glut.material.opacity=auf*.8; } });
  k.kasten(0,SZ+.1,7.6,1.1);
  return tuer;
}

/* =============== Landschaft =============== */
function landschaft(k){
  const sc=k.scene;
  /* Schilfgürtel am Bach links und rechts vom Ausgang */
  const L={halm:[],kolben:[]};
  for(let x=4.4;x<30;x+=.85) [-1,1].forEach(s=>{ schilfListe(L,s*x,-13.95-zufall()*.35,6,.9,1.5,3); if(x%2<1) schilfListe(L,s*(x+.3),-17.1,4,.8,1.2,3); });
  /* dichter Gürtel links und rechts der Schilfwand: hier kommt man nicht durch */
  const sperr=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ for(let x=4.1;x<18.6;x+=.8) schilfListe(L,s*x,-12.55-zufall()*.2,10,.85,1.6,4);
    for(let i=0;i<9;i++) WA.busch(sperr,s*(4.2+i*1.75),-12.75,.48+(i%3)*.08,[WA.LAUB,WA.LAUB3,WA.LAUB2][i%3]);
    k.kasten(s*11.2,-12.65,14.8,.9); });
  verschmelze(sperr);
  schilfSetzen(sc,L);
  /* Bäume und Felsen im Raum (am Rand), mit Hindernis */
  [[-16.4,-9.4,5.2,'l'],[16.3,-11,5.6,'t'],[-16.6,.6,4.8,'t'],[16.5,-1.4,4.6,'l'],[-16.5,10.6,3.2,'l'],[16.4,10.4,3.2,'t'],[-5.4,-11.4,3.8,'t'],[6.2,-11.5,3.8,'l']].forEach(([x,z,h,a])=>{
    const g=a==='t'?WA.tanne(sc,x,z,h):WA.laubbaum(sc,x,z,h); k.kreis(x,z,a==='t'?h*.2:.5); k.verdecker(g,x,z,h*.3); });
  const rand=gruppe(sc,0,0,0);
  [[-14.6,-11,1.1],[-17,-4.4,.9],[-16.6,5.8,.7],[17,4.6,.8],[15.2,-4.8,.7],[-9,-11.6,.7],[10,-11.8,.75],[-8.6,11.8,.55],[8,12,.6]].forEach(([x,z,r],i)=>{ if(i%2){ WA.stein(rand,x,z,r); k.kreis(x+r*.2,z+r*.1,r*1.15); } else { WA.busch(rand,x,z,r); k.kreis(x,z,r*1.15); } });
  [[-15,-1.8,1],[-14.8,8.4,.9],[15,8,1],[14.6,1.6,.9],[-12.4,-10.4,.9],[3.8,-9.8,.7],[-3.6,12.4,.7],[4.6,12.5,.7],[16.8,-7,1.1],[-17,-7,1]].forEach(([x,z,g])=>WA.farn(rand,x,z,g));
  [[-13.4,-9.2,1.3],[-13,-8.7,.9],[13.8,9.6,1.1],[-15.6,3.4,1]].forEach(([x,z,g])=>WA.pilz(rand,x,0,z,g));
  verschmelze(rand);
  const wiese=(x,z)=>!imWasser(x,z,1.14) && !(z<-13.3) && !(Math.abs(x)<2.6 && z<-9);
  WA.wiesenschmuck(sc,-17.8,17.8,-13.2,13.4,520,90,wiese);
  WA.wiesenschmuck(sc,-34,-18,-13,24,260,50); WA.wiesenschmuck(sc,18,34,-13,24,260,50); WA.wiesenschmuck(sc,-18,18,13.8,26,300,60);
  /* Büsche rundherum */
  const BU=[], F=[0x4f9038,0x6cae42,0x367030,0x82b848];
  for(let i=0;i<190;i++){ const s=i%3; let x,z; if(s===0){ x=-19.4-zufall()*14; z=-12.8+zufall()*38; } else if(s===1){ x=19.4+zufall()*14; z=-12.8+zufall()*38; } else { x=-24+zufall()*48; z=15.6+zufall()*14; }
    const r=.3+zufall()*.55; BU.push([x,r*.45,z,r,r*.75,r*.9,F[i%4],i]); BU.push([x+r*.8,r*.3,z+r*.2,r*.65,r*.55,r*.65,F[(i+1)%4],i]); if(i%4===0) BU.push([x-r*.2,r*1.12,z+r*.4,.12,.12,.12,[0xf47ab8,GELB,WEISS][i%3],0]); }
  WA.viele(sc,new THREE.SphereGeometry(1,9,7),BU);
  /* Wald in der Ferne (Instanzen): Stämme, Tannen, runde Kronen */
  const st=[], ta=[], kr=[];
  const baum=(x,z,h,i)=>{ st.push([x,h*.22,z,h*.055,h*.44,h*.055,i%2?WA.RINDE:WA.RINDE2,0]);
    if(i%3){ [[.36,.4,.45],[.27,.36,.68],[.18,.3,.9]].forEach((e,j)=>ta.push([x,h*e[2],z,h*e[0],h*e[1],h*e[0],[WA.TANNE,WA.TANNE2,0x37763e][(i+j)%3],0])); }
    else { kr.push([x,h*.68,z,h*.29,h*.27,h*.29,F[i%4],i]); kr.push([x-h*.18,h*.54,z+h*.04,h*.18,h*.17,h*.18,F[(i+1)%4],i]); kr.push([x+h*.19,h*.56,z-h*.03,h*.17,h*.16,h*.17,F[(i+2)%4],i]); } };
  let n=0;
  for(let z=-19.5;z>-52;z-=3.6) for(let x=-48;x<=48;x+=3.7){ const px=x+(zufall()-.5)*2.4, pz=z+(zufall()-.5)*2; const mitte=Math.max(0,-pz-19)*.1; if(Math.abs(px-mitte)<4.2 && pz>-30) continue; baum(px,pz,3+zufall()*2.8,n++); }
  for(let z=-12;z<34;z+=3.8) [-1,1].forEach(s=>{ for(let r=0;r<4;r++) baum(s*(22.5+r*4.4+zufall()*2),z+(zufall()-.5)*2.4,3.2+zufall()*2.6+r*.4,n++); });
  for(let x=-18;x<=18;x+=4) baum(x+(zufall()-.5)*2,31+zufall()*5,2.6+zufall()*1.6,n++);
  WA.viele(sc,new THREE.CylinderGeometry(1,1,1,7),st); WA.viele(sc,new THREE.ConeGeometry(1,1,9),ta); WA.viele(sc,new THREE.SphereGeometry(1,9,7),kr);
  /* Hügel, Sonne, Wolken */
  const h=gruppe(sc,0,0,0);
  [[-50,-62,28,10,0x5c9058],[-14,-74,32,12,0x6aa062],[22,-68,26,9,0x78ae62],[56,-52,28,11,0x619a54],[72,-6,24,9,0x72a85e],[-72,-4,24,9,0x649a54],[62,38,22,7,0x6aa04a],[-62,38,22,7,0x78ae52],[0,66,40,5,0x72a84e]].forEach(([x,z,r,hh,f])=>ball(h,1,f,x,-.6,z,r,hh,r*.55));
  ohneSchatten(h); verschmelze(h);
  const sonne=gruppe(sc,14,17,-60); ball(sonne,2.6,basis(0xfff6b0),0,0,0,1,1,.3).castShadow=false; schein(sonne,'rgba(255,240,150,.9)',0,0,1.2,11);
  [[-32,13,-50],[-10,15,-58],[34,12,-46],[-50,12,-18],[50,13,-14],[2,12,-64]].forEach(([x,y,z],i)=>{ const g=gruppe(sc,x,y,z), m=basis(0xffffff), s=.7+(i%3)*.2;
    [[0,0,1.7],[2,-.15,1.15],[-2.1,-.2,1.25],[.6,.55,1.05]].forEach(([a,b,r])=>{ ball(g,r*s,m,a*s,b*s,0,1.35,.55,.7); }); ohneSchatten(g); verschmelze(g); k.anim.push(t=>{ g.position.x=x+Math.sin(t*.045+i*1.7)*6; }); });
}

/* =============== Bewegtes =============== */
function kleineLibelle(k,x,y,z,farbe,start){
  const g=gruppe(k.scene,x,y,z), r=gruppe(g,0,0,0); strich(r,[-.34,0,0],[.06,0,0],.025,farbe); ball(r,.07,farbe,.1,0,0); ball(r,.055,SCHW,.19,.01,0); ohneSchatten(r); verschmelze(r);
  const m=basis(0xeefaff,{transparent:true,opacity:.75,depthWrite:false});
  const fl=[-1,1].map(s=>{ const f=gruppe(g,.04,.03,0); [.07,-.08].forEach(v=>{ const q=new THREE.Mesh(GEO.sph,m); q.position.set(v,0,s*.19); q.scale.set(.045,.008,.19); f.add(q); }); return f; });
  k.anim.push(t=>{ const a=t*.7+start; g.position.set(x+Math.sin(a)*1.7,y+Math.sin(t*2.6+start)*.2,z+Math.sin(a*1.8)*.8); g.rotation.y=Math.atan2(-Math.cos(a*1.8)*1.44,Math.cos(a)*1.7); const s=Math.sin(t*19+start)*.5; fl[0].rotation.x=-s; fl[1].rotation.x=s; });
}
function huepfFrosch(k,punkte,start){
  const g=gruppe(k.scene,punkte[0][0],0,punkte[0][1]), r=gruppe(g,0,0,0), F=0x62b838;
  ball(r,.17,F,0,.14,0,1.25,.85,1); ball(r,.12,F,.17,.22,0,1,.85,1.1); [-1,1].forEach(s=>{ ball(r,.055,WEISS,.2,.32,s*.07); ball(r,.026,SCHW,.245,.325,s*.075); ball(r,.09,0x3f8a22,-.1,.07,s*.17,1.4,.6,.8); ball(r,.045,F,.19,.04,s*.12,1.4,.6,1); });
  verschmelze(r);
  k.anim.push(t=>{ const u=t*.55+start, i=Math.floor(u)%punkte.length, a=punkte[i], b=punkte[(i+1)%punkte.length], p=Math.max(0,Math.min(1,((u%1)-.6)/.4));
    g.position.set(a[0]+(b[0]-a[0])*p,Math.sin(p*Math.PI)*.7,a[1]+(b[1]-a[1])*p); g.rotation.y=Math.atan2(-(b[1]-a[1]),b[0]-a[0]); });
}
function leben(k){
  kleineLibelle(k,3.6,2.1,-5,0xd83a7a,2.2); kleineLibelle(k,13,2.3,-10.6,0x3ab84a,4);
  huepfFrosch(k,[[-3.2,-8.4],[-2.2,-9.1],[-1.2,-8.5],[-2.2,-7.9]],0);
  WA.falter(k,-12,2.4,9,0xff8a1a,0,1.8); WA.falter(k,12,2.6,-1,0x3a9af0,2.3,1.6); WA.falter(k,4,2.2,10,0xf0d020,4.1,1.9); WA.falter(k,-12,2.8,-8,0xb06ae0,1.2,1.5);
  /* zwei kleine Vögel fliegen über dem Wald */
  [[0x4a78b8,-8,6.6,-19,9,3,.35,0],[0xc8563a,10,7.2,-21,7,3,-.42,2.5]].forEach(([f,mx,y,mz,rx,rz,tempo,start])=>{ const v=WA.vogel(k.scene,0,0,0,0,f), g=v.g; g.scale.setScalar(1.3);
    k.anim.push(t=>{ const a=t*tempo+start; g.position.set(mx+Math.cos(a)*rx,y+Math.sin(t*1.3+start)*.3,mz+Math.sin(a)*rz); g.rotation.y=Math.atan2(-Math.cos(a)*rz*Math.sign(tempo),-Math.sin(a)*rx*Math.sign(tempo)); const s=Math.sin(t*10+start)*.8; v.fluegel[0].rotation.x=s; v.fluegel[1].rotation.x=-s; }); });
}

function baue(k){
  WA.freiluft(k,{ bodenFarbe:'#74aa46', himmelLicht:0xf2faff, grund:0x687a44, staerke:.8, sonne:0xfff4d4, sonneStaerke:.55 });
  teich(k);
  const tuer=schilfwand(k);
  landschaft(k);
  leben(k);
  return { tuer, start:[.6,10.2] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-7,-10.4],[-11,-11.2],[-3,-10.6],[2.4,-8.6],[8.4,-9.4],[15,-8.4],[14,-2.8],[13.2,3],[15.6,6.4],[11.4,10.4],[6,10],[1,12.4],[-6,9.4],[-11,11.6],[-15.2,6.8],[-14.4,2.6],[-14.2,-4.6],[-3,-7.4],[9.2,-10.2],[-6.4,12.6]];

const gegenstaende=[
  { x:-7.4, z:7.8, dreh:.12, steh:[-7.3,9.8], kasten:[2.8,.8], treffer:[3,3.15,.7], baue:fischtafel },          /* 1 */
  { x:-8.1, z:-.8, steh:[-10.4,-.5], treffer:[2.7,2.9,1.8], baue:libelle },                                   /* 2 */
  { x:-7.3, z:-6.4, dreh:-.4, steh:[-10.2,-6.4], kasten:[4.2,2.2], treffer:[4.4,2.8,1.9], baue:otterrutsche },           /* 3 */
  { x:3.6, z:2.9, steh:[3.7,5.8], treffer:[2.2,1.6,1.8], baue:frosch },                                        /* 4 */
  { x:-1, z:3.7, steh:[-1,6.6], treffer:[2.5,1.5,4], baue:holzsteg },                                          /* 5 */
  { x:12.4, z:-7.6, dreh:-.2, steh:[12,-5.6], kasten:[2.8,.8], treffer:[3,3.15,.7], baue:pflanzentafel },      /* 6 */
  { x:7.7, z:.7, steh:[10.6,.8], treffer:[3.2,1.1,2.8], baue:seerosen },                                       /* 7 */
  { x:-5.6, z:1.9, steh:[-6.5,4.7], treffer:[3.2,1.4,2.1], baue:enten },                                       /* 8 */
  { x:6.6, z:-3.5, dreh:1.15, steh:[9.4,-4], treffer:[3,1.4,3.8], baue:ruderboot },                            /* 9 */
  { x:12.4, z:4.6, dreh:Math.PI+.35, steh:[13.6,6.2], r:.75, treffer:[2.2,4,1.2], baue:reiher }                 /* 10 */
];

return { titel:'Der Teich', himmel:0xbde4fa, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 4: Das Baumhaus. Große Holzplattform hoch in den Baumkronen im orangen Abendlicht: Hüttenwand hinten,
   Geländer, dicke Stämme, Kronen rundherum, tief unten der Waldboden. Eichhörnchen, wehende Blätter und Vögel.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Hängematte) und 10 (Eule in der Baumhöhle) sind neu.
   Ausgang: die Klappe im Boden öffnet sich, die Figur steigt die Strickleiter hinunter. */
RAEUME3D.wald[3] = (function(){
const W=WA, B=36, T=27, HINTEN=-13.5, UNTEN=-16;
const HX=11, HZ=-7.5; /* Mitte der Bodenklappe, Loch 3 x 3 */
const HL=-11.1, HR=6.8, ZL=-11.2, ZR=-11; /* Hütte von HL bis HR; hintere Kante der Plattform links und rechts davon */
const HOLZ=W.HOLZ, HOLZ2=W.HOLZ2, HOLZ3=W.HOLZ3, HELL=W.HELLHOLZ, RINDE=W.RINDE, RINDE2=W.RINDE2, SEIL=0xd8b878, SEIL2=0xa8884c,
  SCHWARZ=W.SCHWARZ, WEISS=W.WEISS, GOLD=W.GOLD, METALL=W.METALL, EISEN=W.EISEN, ROT=W.ROT, BLAU=W.BLAU, GELB=W.GELB;
const KRONE=[0x4f8a34,0x6c9c36,0x3a6e2c,0x8a9a30,0xb8862a,0xc86a24,0x588c30,0x447a30];
const lebt=g=>{ g.userData.lebendig=true; return g; };
/* spart Zeichenaufrufe: kleine oder weit hinten liegende Teile werfen keinen Schatten */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* Vogel: Körper und Flügel je zu wenigen Teilen zusammenfassen */
const kompakt=v=>{ v.fluegel.forEach(f=>{ lebt(f); verschmelze(f); }); verschmelze(v.g); ohneSchatten(v.g); return v; };

/* ---------- Himmel, Waldboden tief unten, Baumkronen ringsum ---------- */
function umgebung(sc){
  const himmelTex=bild(8,512,(g)=>{ const v=g.createLinearGradient(0,0,0,512);
    [[0,'#6a78b8'],[.28,'#c08aa8'],[.42,'#f4966a'],[.5,'#ffc070'],[.56,'#ffd890'],[1,'#c89050']].forEach(s=>v.addColorStop(s[0],s[1])); g.fillStyle=v; g.fillRect(0,0,8,512); });
  const kugel=new THREE.Mesh(new THREE.SphereGeometry(90,32,24),new THREE.MeshBasicMaterial({map:himmelTex,side:THREE.BackSide})); sc.add(kugel);
  ball(sc,3.4,basis(0xfff0b0),-17,-3.6,-70); schein(sc,'rgba(255,200,100,.85)',-17,-3.6,-66,24);
  const t=W.kornBild('#5c7430',['rgba(190,170,70,.45)','rgba(40,64,22,.5)','rgba(190,100,40,.4)'],true); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(20,20);
  const boden=new THREE.Mesh(new THREE.CircleGeometry(86,48),new THREE.MeshLambertMaterial({map:t})); boden.rotation.x=-Math.PI/2; boden.position.y=UNTEN; boden.receiveShadow=true; sc.add(boden);
  const stamm=[], laub=[], busch=[];
  const krone=(x,y,z,r,i)=>{ [[0,0,0,1],[-.75,-.25,.2,.72],[.7,-.18,-.25,.76],[.1,.55,.1,.66]].forEach((e,j)=>laub.push([x+e[0]*r,y+e[1]*r,z+e[2]*r,r*e[3],r*e[3]*.78,r*e[3],KRONE[(i+(j>2?3:j%2))%KRONE.length]])); };
  let i=0;
  for(let gx=-60;gx<=60;gx+=6.4) for(let gz=-60;gz<=50;gz+=6.4){
    const x=gx+(zufall()-.5)*3.6, z=gz+(zufall()-.5)*3.6; if(Math.hypot(x,z)>70) continue; i++;
    const r=2+zufall()*1.6;
    if(Math.abs(x-HX)<7.5 && z<0 && z>-36) continue; /* unter und hinter der Luke freier Blick in die Tiefe */
    let y;
    if(Math.abs(x)<22 && z>-17 && z<17) y=UNTEN+3+zufall()*3.5;
    else if(z<-24) y=-12+zufall()*5.5; /* weit hinten niedrig, damit darüber der Abendhimmel bleibt */
    else y=-9+zufall()*(Math.abs(x)>34?7:4);
    krone(x,y,z,r,i); stamm.push([x,(UNTEN+y)/2,z,.42,y-UNTEN,.42,i%2?RINDE:RINDE2]);
  }
  /* Büsche und Blumen unten auf dem Waldboden */
  for(let j=0;j<230;j++){ const x=(zufall()-.5)*70, z=(zufall()-.5)*64, luke=Math.abs(x-HX)<8 && z<0, r=(.35+zufall()*.7)*(luke?.7:1); busch.push([x,UNTEN+r*.4,z,r,r*.65,r,luke?[0x3a6e2c,0x4f8a34,0x6c9c36][j%3]:j%9===0?0xf0d060:KRONE[j%KRONE.length]]); }
  /* kleine grüne Wipfel in verschiedener Tiefe unter der Luke */
  [[-4,-11.5,-14,1.3],[3,-13,-19,1.1],[.6,-14,-11,.7],[-2,-13.5,-26,1.4],[4.5,-11,-28,1.2]].forEach((e,j)=>{ krone(HX+e[0],e[1],e[2],e[3],[0,2,6][j%3]); stamm.push([HX+e[0],(UNTEN+e[1])/2,e[2],.18,e[1]-UNTEN,.18,RINDE2]); });
  /* große Kronen gleich hinter dem Geländer, auf Augenhöhe, mit Lücken zum Himmel */
  [[-12.8,-.6,-18.5,3.0,0],[-21,1.4,-17,3.4,4],[-29,-.5,-24,3.8,2],[-17.5,-4.5,-27,3.2,5],[9.6,-4.6,-26,2.6,1],[20,.6,-17,3.4,5],[28,-1,-22,3.8,0],[23.5,2,-13,2.6,3],[-23.5,1,-13.5,2.7,6]].forEach(e=>{
    krone(e[0],e[1],e[2],e[3],e[4]); stamm.push([e[0],(UNTEN+e[1])/2,e[2],.55,e[1]-UNTEN,.55,RINDE]); });
  /* hohe dicke Stämme hinter der Hütte und seitlich */
  [[-23,-22,1.5,13],[-11,-19.5,1.2,12],[1,-23,1.6,14],[19.5,-24,1.25,12.5],[25,-23,1.5,13],[-24,-9,1.2,11],[23.5,-7,1.35,11],[-23.5,7,1.25,5],[24,9,1.2,5]].forEach((s,j)=>{
    stamm.push([s[0],(UNTEN+s[3])/2,s[1],s[2],s[3]-UNTEN,s[2],j%2?RINDE:RINDE2]);
    for(let n=0;n<5;n++) stamm.push([s[0]+(n%2?.97:-.97)*s[2]*Math.cos(n*1.7),-12+n*4.4,s[1]+s[2]*.9*Math.abs(Math.sin(n*1.3+.4)),.12,1.6,.08,0x3e2712]);
    if(s[1]<-15){ krone(s[0],s[3],s[1]-1,4.2,j); krone(s[0]+4.5,s[3]-2.8,s[1]-2.5,3,j+2); krone(s[0]-4,s[3]-4.4,s[1]-1.5,2.6,j+5); }
    else { const v=s[0]<0?-1:1; krone(s[0],s[3]+.6,s[1],2.8,j+1); krone(s[0]+v*4,s[3]-1,s[1],2.7,j); krone(s[0]+v*3,s[3]-6,s[1]+2,2.4,j+3); }
    if(s[1]<-15) krone(s[0],s[3]+.5,s[1],3,j+4);
  });
  W.viele(sc,GEO.cyl,stamm); W.viele(sc,GEO.sph,laub); W.viele(sc,GEO.sph,busch);
}

/* ---------- Plattform mit Loch, Balken darunter, Geländer ---------- */
function plattform(sc){
  /* gedecktes, dunkleres Holz, damit Edelsteine und Gegenstände sich abheben */
  const t=W.dielenBild([126,100,82],'#261a12'); t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const m=new THREE.MeshLambertMaterial({map:t});
  const flaeche=(x1,x2,z1,z2)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/.6)),Math.max(1,Math.round((z2-z1)/.6))), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,((x1+B/2)+uv.getX(i)*(x2-x1))/B*4.5,((T/2-z2)+uv.getY(i)*(z2-z1))/T*3.4);
    const p=new THREE.Mesh(geo,m); p.rotation.x=-Math.PI/2; p.position.set((x1+x2)/2,0,(z1+z2)/2); p.receiveShadow=true; sc.add(p); };
  /* hinten nur unter der Hütte bis ganz nach hinten, links und rechts davon schmaler */
  flaeche(-18,HL,ZL,13.5); flaeche(HL,HR,-13.5,13.5); flaeche(HR,HX-1.5,ZR,13.5); flaeche(HX+1.5,18,ZR,13.5); flaeche(HX-1.5,HX+1.5,ZR,HZ-1.5); flaeche(HX-1.5,HX+1.5,HZ+1.5,13.5);
  const g=gruppe(sc,0,0,0);
  /* Kantenbalken */
  const kante=(x1,z1,x2,z2)=>box(g,Math.abs(x2-x1)+.3,.55,Math.abs(z2-z1)+.3,HOLZ3,(x1+x2)/2,-.3,(z1+z2)/2);
  kante(-18,13.62,18,13.62); kante(-18.1,ZL,-18.1,13.5); kante(18.1,ZR,18.1,13.5);
  kante(-18,ZL-.18,HL-.2,ZL-.18); kante(HL-.18,-13.6,HL-.18,ZL); kante(HL,-13.68,HR,-13.68); kante(HR+.18,-13.6,HR+.18,ZR); kante(HR+.2,ZR-.18,18,ZR-.18);
  /* Tragbalken und Streben unter der Plattform (nicht unter dem Loch) */
  [[-15,ZL],[-9,-13.5],[-3,-13.5],[3,-13.5],[15.5,ZR]].forEach(e=>box(g,.4,.4,13.4-e[1],HOLZ2,e[0],-.45,(13.4+e[1])/2));
  [-1,1].forEach(v=>[-9,0,10].forEach(z=>strich(g,[v*18,-.6,z],[v*22,-6.5,z*.75],.22,HOLZ2)));
  [-12,-4,4,12].forEach(x=>strich(g,[x,-.6,13.5],[x*1.1,-7,10],.22,HOLZ2));
  /* Geländer rundherum, offen nur dort, wo die Hütte steht */
  const gelaender=(x1,z1,x2,z2)=>{ const l=Math.hypot(x2-x1,z2-z1), n=Math.max(1,Math.round(l/2.3)), P=u=>[x1+(x2-x1)*u,z1+(z2-z1)*u];
    for(let i=0;i<=n;i++){ const p=P(i/n); walze(g,.11,1.25,HOLZ2,p[0],.62,p[1]); ball(g,.15,HELL,p[0],1.3,p[1]); }
    [.62,1.08].forEach(y=>strich(g,[x1,y,z1],[x2,y,z2],.065,y>1?HELL:HOLZ));
    const m2=Math.max(1,Math.round(l/1.1)); for(let i=0;i<m2;i++){ const a=P(i/m2), b=P((i+1)/m2); strich(g,[a[0],.62,a[1]],[b[0],1.08,b[1]],.025,SEIL2); } };
  gelaender(-17.9,13.35,17.9,13.35); gelaender(-17.9,ZL+.1,-17.9,13.35); gelaender(17.9,ZR+.1,17.9,13.35);
  gelaender(-17.9,ZL+.1,HL-.05,ZL+.1); gelaender(HR+.05,ZR+.1,17.9,ZR+.1); gelaender(HL-.05,-13.35,HL-.05,ZL+.1); gelaender(HR+.05,-13.35,HR+.05,ZR+.1);
  /* Äste außen neben dem Geländer, darauf laufen die Eichhörnchen */
  [[-19.1,-8.8,7],[19.1,-2,10]].forEach(e=>{ const v=e[0]<0?-1:1; strich(g,[e[0],1.0,e[1]],[e[0],1.0,e[2]],.17,RINDE);
    [e[1]+.8,e[2]-.8].forEach(z=>strich(g,[v*18.1,-.5,z],[e[0],.95,z],.13,RINDE2));
    [e[1],e[2]].forEach((z,j)=>ball(g,.55,j?0x6c9c36:0x8a9a30,e[0]+v*.2,1.0,z+(j?.5:-.5),1,.7,1.1)); });
  verschmelze(g);
}

/* ---------- Hüttenwand hinten ---------- */
function huette(k){
  const hinten=k.wand('hinten'), tex=W.bretterBild([166,108,62],'#3a2210');
  const mitte=(HL+HR)/2, breit=HR-HL;
  W.mauer(hinten,tex,breit,5.8,.4,mitte,2.9,HINTEN-.22);
  const g=gruppe(hinten,0,0,HINTEN);
  const PFOSTEN=[HL+.1,-4.6,4.12,HR-.1];
  PFOSTEN.forEach(x=>box(g,.36,6,.24,HOLZ2,x,3,.04));
  box(g,breit+.5,.3,.34,HOLZ2,mitte,5.85,.05); box(g,breit,.22,.16,HOLZ3,mitte,.11,.06);
  /* Dach mit Schindeln, nach hinten geneigt */
  const dach=gruppe(g,mitte,6.05,.55); dach.rotation.x=.62;
  for(let r=0;r<5;r++){ box(dach,breit+1.2,.14,.62,r%2?0x8a3e22:0xa04c28,0,r*.05,-.2-r*.52); for(let i=0;i<15;i++) box(dach,.08,.16,.64,0x6a2c18,-breit/2-.1+i*1.27+(r%2)*.6,r*.05+.01,-.2-r*.52); }
  [[-7,2],[-1,0],[4,3],[7.5,1]].forEach(e=>{ ball(dach,.6,W.MOOS,e[0],e[1]*.06+.12,-.3-e[1]*.5,1.9,.28,.8); ball(dach,.4,W.MOOS2,e[0]+.8,e[1]*.06+.14,-.5-e[1]*.5,1.5,.25,.8); });
  /* kleine Fenster mit warmem Licht (hoch an der Wand): x, Breite (1 = groß mit Läden) */
  const fenster=[basis(0xffc050),basis(0xffd068)], birnen=[0xffe070,0xff9a50,0xfff0c0].map(c=>basis(c));
  [[-9.95,.8],[-2.3,1],[5.45,.8]].forEach((f,i)=>{ const x=f[0], s=f[1];
    box(g,2.0*s,1.7,.1,HOLZ3,x,2.95,.06); box(g,1.72*s,1.42,.06,fenster[i%2],x,2.95,.12);
    box(g,.1,1.45,.06,HOLZ3,x,2.95,.17); box(g,1.75*s,.1,.06,HOLZ3,x,2.95,.17);
    if(s===1) [-1,1].forEach(v=>{ box(g,.62,1.75,.09,0x3f7a4a,x+v*1.34,2.95,.09); [-.5,0,.5].forEach(y=>box(g,.5,.07,.04,HELL,x+v*1.34,2.95+y,.15)); });
    box(g,2.1*s,.34,.42,HOLZ,x,1.9,.25);
    for(let j=0;j<7;j++){ ball(g,.15*s,j%2?W.LAUB2:W.LAUB,x+(-.9+j*.3)*s,2.13,.3); ball(g,.09*s,[ROT,GELB,0xf07a9a][(i+j)%3],x+(-.86+j*.29)*s,2.27+(j%3)*.04,.42); }
  });
  /* Lichterkette unter dem Dach */
  const lampen=[];
  for(let i=0;i<22;i++){ const x=HL+.2+i*.795, y=5.45-Math.abs(Math.sin(i*Math.PI/7))*.38; strich(g,[x,y,.45],[x+.795,5.45-Math.abs(Math.sin((i+1)*Math.PI/7))*.38,.45],.018,HOLZ3);
    ball(g,.085,birnen[i%3],x,y-.11,.45); if(i%5===2) lampen.push([x,y-.11]); }
  verschmelze(g); ohneSchatten(g);
  lampen.forEach((p,i)=>{ const s=schein(hinten,'rgba(255,200,90,.55)',p[0],p[1],HINTEN+.55,.8); k.anim.push(t=>{ const a=.75+Math.sin(t*2.4+i)*.14; s.scale.set(a,a,1); }); });
  /* Farnbüschel und Ranken an den Pfosten */
  const r=gruppe(hinten,0,0,HINTEN);
  PFOSTEN.forEach((x,i)=>{ for(let j=0;j<11;j++) ball(r,.15,[W.LAUB,W.LAUB2,0xc8782a][(i+j)%3],x+Math.sin(j*1.9+i)*.24,5.6-j*.34,.24,1,1,.5); });
  verschmelze(r); ohneSchatten(r);
}

/* ---------- Ausgang: Bodenklappe mit Strickleiter ---------- */
function baueAusgang(k,sc){
  const fest=gruppe(sc,HX,0,HZ);
  /* Lochrand: Bretterkanten nach unten */
  [-1,1].forEach(v=>{ box(fest,.12,.45,3.0,HOLZ3,v*1.56,-.235,0); box(fest,3.24,.45,.12,HOLZ3,0,-.235,v*1.56); });
  [-1,1].forEach(v=>{ box(fest,.24,.09,3.48,GOLD,v*1.62,.045,0); }); box(fest,3.0,.09,.24,GOLD,0,.045,1.62); box(fest,3.0,.09,.18,HOLZ3,0,.045,-1.6);
  /* zwei Pfosten hinten, daran hängt die Leiter */
  [-1,1].forEach(v=>{ walze(fest,.15,1.35,HOLZ2,v*1.9,.67,-1.45); ball(fest,.19,HELL,v*1.9,1.4,-1.45); ring(fest,.18,.05,SEIL,v*1.9,1.05,-1.45).rotation.x=Math.PI/2; ring(fest,.18,.05,SEIL,v*1.9,.93,-1.45).rotation.x=Math.PI/2; });
  verschmelze(fest);
  /* hochgezogene Strickleiter: liegt rechts neben der Klappe flach auf dem Boden, am Ende übereinandergelegt */
  const rolle=lebt(gruppe(sc,HX+2.45,0,HZ)), ri=gruppe(rolle,0,0,0);
  const sprosse=(y,z,x,c)=>{ strich(ri,[x-.52,y,z],[x+.52,y,z],.075,c); [-.4,.4].forEach(d=>ball(ri,.105,SEIL2,x+d,y,z)); };
  for(let i=0;i<5;i++) sprosse(.09,-1.35+i*.48,0,i%2?HELL:0xe0b070);
  [[.09,1.2,.04],[.23,1.34,-.07],[.37,1.18,.05]].forEach((e,i)=>sprosse(e[0],e[1],e[2],i%2?0xe0b070:HELL));
  [-.4,.4].forEach(x=>{ strich(ri,[x,.08,-1.55],[x,.08,.8],.05,SEIL); strich(ri,[x,.08,.8],[x,.4,1.25],.05,SEIL); strich(ri,[x,.08,-1.55],[-.55,1.0,-1.45],.05,SEIL); });
  verschmelze(ri);
  /* hängende Leitern, anfangs unsichtbar: hinten und an der vorderen Lochkante (dort steigt die Figur hinab) */
  const leiter=lebt(gruppe(sc,HX,0,HZ)), li=gruppe(leiter,0,0,0);
  [-.62,.62].forEach(x=>{ strich(li,[x,.14,-1.45],[x,.14,-1.1],.06,SEIL); strich(li,[x,.14,-1.1],[x,-12.5,-.95],.06,SEIL); strich(li,[x,.14,-1.45],[x<0?-1.9:1.9,1.0,-1.45],.05,SEIL); });
  for(let i=0;i<24;i++){ const y=-.2-i*.5; strich(li,[-.74,y,-1.08],[.74,y,-1.08],.085,i%2?HELL:0xe0b070); [-.62,.62].forEach(x=>ball(li,.1,SEIL2,x,y,-1.07)); }
  [-.72,.72].forEach(x=>{ walze(li,.09,.7,HOLZ2,x,.35,1.62); ball(li,.12,GOLD,x,.74,1.62); strich(li,[x,.62,1.6],[x,.16,1.2],.065,SEIL); strich(li,[x,.16,1.2],[x,-3.6,1.15],.065,SEIL); });
  for(let i=0;i<8;i++){ const y=.02-i*.45; strich(li,[-.82,y,1.17],[.82,y,1.17],.08,i%2?0xe0b070:HELL); }
  verschmelze(li); leiter.visible=false;
  /* Deckel, hinten angeschlagen */
  const deckel=lebt(gruppe(sc,HX,.13,HZ-1.5)), di=gruppe(deckel,0,0,0);
  for(let i=0;i<5;i++) box(di,.57,.14,2.98,i%2?0x7a4a22:0x92602e,-1.19+i*.595,-.04,1.5);
  [.5,2.5].forEach(z=>{ box(di,3.0,.07,.24,EISEN,0,.05,z); [-1.25,-.65,.65,1.25].forEach(x=>ball(di,.07,METALL,x,.1,z)); box(di,2.7,.08,.2,HOLZ3,0,-.15,z); });
  ring(di,.24,.06,GOLD,0,.1,2.55).rotation.x=Math.PI/2;
  verschmelze(di);
  const schloss=gruppe(deckel,0,1.22,1.1); [-.4,.4].forEach(x=>strich(schloss,[x,-1.15,.1],[x,-.35,0],.07,EISEN));
  const tafel=gruppe(schloss,0,0,0); tafel.rotation.x=-.6; W.zahlenschloss(tafel,0,0,0).scale.setScalar(1.35); verschmelze(schloss);
  const schimmer=schein(sc,'rgba(255,220,120,.45)',HX,.75,HZ+.1,2.2);
  k.kasten(HX+.65,HZ,4.6,3.5);
  const tuer=ausgang(k,{ name:'Klappe mit Strickleiter', einfach:'Klappe', steh:[HX,-4.3], durch:[HX,HZ+.72], tief:true, blick:{ pitch:.92, zoom:.82 }, warte:.5,
    treffer:{x:HX,y:.5,z:HZ,b:3.3,h:1,t:3.2}, schildOben:[HX,2.8,HZ-.4], glanz:[HX,.8,HZ+.5],
    bewege:(auf,t)=>{ deckel.rotation.x=-auf*1.82; schloss.visible=auf<.04; rolle.visible=auf<.12; leiter.visible=auf>.12; schimmer.visible=auf<.04; const g=2+Math.sin((t||0)*2.2)*.25; schimmer.scale.set(g,g,1); } });
  /* Kletterbewegung beim Hinuntersteigen */
  k.anim.push(t=>{ const f=k.figur&&k.figur(); if(!tuer.offen || !f || !(f.position.y<-.05)) return; f.rotation.y=0; /* Blick zur vorderen Leiter */
    if(!(f.position.y>-2.15)) return; const u=f.userData, s=Math.sin(t*11);
    u.armL.rotation.x=-2.2+s*.5; u.armR.rotation.x=-2.2-s*.5; u.beinL.rotation.x=-.4-s*.45; u.beinR.rotation.x=-.4+s*.45; });
  return tuer;
}

/* ---------- Deko auf der Plattform ---------- */
/* dicker Stamm, der durch die Plattform wächst */
function stamm(k,x,z,r){
  const g=gruppe(k.scene,x,0,z);
  rohr(g,r*.82,r,7.4,RINDE,0,3.7,0,14); rohr(g,r,r*1.1,16,RINDE2,0,-8,0,10);
  for(let i=0;i<9;i++){ const a=i*.7+x; strich(g,[Math.cos(a)*r*.99,.3+(i%3)*1.6,Math.sin(a)*r*.99],[Math.cos(a)*r*.86,2+(i%3)*1.7,Math.sin(a)*r*.86],.07,RINDE2); }
  ring(g,r*1.04,.13,HOLZ3,0,.06,0).rotation.x=Math.PI/2;
  for(let i=0;i<4;i++){ const a=.5+i*.55; ball(g,.34-i*.04,[0xe0a050,0xc87a30][i%2],Math.cos(a)*r*.98,1+i*.42,Math.sin(a)*r*.98,1,.28,1); }
  [-1,1].forEach(v=>{ strich(g,[0,5.8,0],[v*(r+1.3),7.5,-.6],r*.24,RINDE); ball(g,.9,v<0?0x5c9434:0xb07a28,v*(r+1.5),7.8,-.7,1.2,.75,1); });
  ball(g,r*1.25,0x4f8a34,0,7.9,-.2,1.2,.7,1.1);
  verschmelze(g); k.kreis(x,z,r*1.08); k.verdecker(g,x,z,r+.4);
}
function kiste(g,x,y,z,s,dreh){
  const q=gruppe(g,x,y,z); q.rotation.y=dreh||0; box(q,s,s*.8,s,HOLZ,0,s*.4,0);
  [.06,.74].forEach(h=>box(q,s+.06,s*.12,s+.06,HELL,0,s*h,0)); [-1,1].forEach(v=>[-1,1].forEach(w=>box(q,s*.12,s*.8,s*.12,HOLZ2,v*s*.47,s*.4,w*s*.47)));
  strich(q,[-s*.4,s*.14,s*.52],[s*.4,s*.66,s*.52],.035,HELL);
}
function fass(g,x,z){
  rohr(g,.55,.55,.5,HOLZ,x,.25,z); rohr(g,.66,.55,.35,HOLZ,x,.66,z); rohr(g,.55,.66,.35,HOLZ,x,1.0,z); rohr(g,.55,.55,.2,HOLZ,x,1.27,z);
  [.2,.62,1.05].forEach(y=>ring(g,y===.62?.67:.59,.045,EISEN,x,y,z).rotation.x=Math.PI/2); walze(g,.48,.05,0x4a9ac0,x,1.38,z);
}
function topf(g,x,z,farbe,bluete){
  rohr(g,.42,.28,.6,farbe,x,.3,z,14); ring(g,.42,.06,0x8a3a1c,x,.6,z).rotation.x=Math.PI/2;
  for(let i=0;i<7;i++){ const a=i*.9, px=x+Math.cos(a)*.38, pz=z+Math.sin(a)*.38; strich(g,[x,.55,z],[px,1.0+(i%3)*.14,pz],.03,W.LAUB3); ball(g,.17,i%2?W.LAUB2:W.LAUB,px,.95+(i%3)*.12,pz,1,.6,1); ball(g,.09,bluete,px,1.12+(i%3)*.14,pz); }
}
function deko(k,sc){
  stamm(k,-2.6,-5.6,.95); stamm(k,-16.5,-3.6,.85); stamm(k,16.7,-9.8,.72); stamm(k,16.4,11.3,.8); stamm(k,-9.6,11.6,.65);
  const g=gruppe(sc,0,0,0);
  /* Fass, Kisten */
  fass(g,-10.15,-12.5); k.kreis(-10.15,-12.5,.75);
  kiste(g,15.9,0,-5.4,1.4,.15); kiste(g,15.9,1.12,-5.4,1.0,-.2); kiste(g,16.2,0,-3.7,1.1,-.1); k.kasten(16.05,-4.65,1.9,3.1);
  kiste(g,-16.6,0,-6.8,1.2,.1); kiste(g,-16.6,.97,-6.8,.8,.4); k.kreis(-16.6,-6.8,.9);
  /* hinten links und rechts neben der Hütte geht es in die Tiefe */
  k.kasten((-18+HL)/2,(-13.5+ZL)/2,HL+18,ZL+13.5); k.kasten((HR+18)/2,(-13.5+ZR)/2,18-HR,ZR+13.5);
  /* Sitzbank an der Hütte */
  const bank=(x,z)=>{ box(g,3.2,.16,.8,HELL,x,.72,z); box(g,3.2,.5,.12,HOLZ,x,1.25,z-.38); [-1.4,1.4].forEach(v=>{ box(g,.18,.72,.7,HOLZ2,x+v,.36,z); box(g,.14,.8,.12,HOLZ2,x+v,1.1,z-.38); }); box(g,.9,.22,.6,ROT,x-.8,.9,z+.02); box(g,.9,.22,.6,0x3f7a4a,x+.8,.9,z+.02); k.kasten(x,z,3.4,1.0); };
  bank(-1.9,-12.6);
  /* runder Tisch mit Bechern und Hockern */
  walze(g,1.15,.16,HELL,-1.4,1.0,9.2); walze(g,.28,.95,HOLZ2,-1.4,.48,9.2); walze(g,.65,.1,HOLZ3,-1.4,.05,9.2);
  [[-.45,.2,ROT],[.4,-.3,BLAU],[.3,.5,GELB]].forEach(e=>{ rohr(g,.15,.13,.3,e[2],-1.4+e[0],1.23,9.2+e[1],12); ring(g,.09,.03,e[2],-1.4+e[0]+.18,1.23,9.2+e[1]); });
  ball(g,.28,0xc88a40,-1.45,1.15,9.15,1.3,.55,1);
  k.kreis(-1.4,9.2,1.2);
  [[-3.4,9.6],[.6,9.7]].forEach(p=>{ rohr(g,.45,.5,.62,RINDE,p[0],.31,p[1],12); walze(g,.44,.05,HELL,p[0],.64,p[1]); ring(g,.24,.025,HOLZ,p[0],.67,p[1]).rotation.x=Math.PI/2; k.kreis(p[0],p[1],.52); });
  /* Blumentöpfe und Pflanzen */
  [[-17,5.4],[17,-1],[17,7],[3.8,12.4],[-3.9,12.4],[10.5,12.4]].forEach((p,i)=>{ topf(g,p[0],p[1],i%2?0xc0603a:0xb04a2a,[ROT,GELB,0xf07a9a,0xb08ae0][i%4]); k.kreis(p[0],p[1],.5); });
  /* zwei kleine Flickenteppiche: schmale gedeckte Streifen und Fransen */
  [[-10.2,-4.6],[-1.4,9.2]].forEach((p,n)=>{ const br=3.0/15;
    for(let i=0;i<15;i++) box(g,br+.004,.02,1.9,[0x74564c,0x8c8270,0x56606a,0x8c8270,0x66704e][(i+n*2)%5],p[0]-1.5+(i+.5)*br,.014,p[1]);
    [-1,1].forEach(v=>{ for(let i=0;i<13;i++) box(g,.22,.012,.04,0xc8bca0,p[0]+v*1.6,.012,p[1]-.9+i*.15); }); });
  /* Wimpelketten an den Seiten, an Stangen mit runden Knöpfen */
  [-1,1].forEach(v=>{ [-9,0,9].forEach(z=>{ walze(g,.07,2.9,HOLZ2,v*17.9,1.45,z); ball(g,.14,GOLD,v*17.9,2.95,z); });
    [-9,0].forEach(z=>{ for(let i=0;i<10;i++){ const u=i/10, w=(i+1)/10, y=p=>2.85-Math.sin(p*Math.PI)*.5; strich(g,[v*17.9,y(u),z+u*9],[v*17.9,y(w),z+w*9],.02,SEIL);
      const f=kegel(g,.22,.42,[ROT,GELB,BLAU,0x5aa040][i%4],v*17.9,y(u+.05)-.24,z+(u+.05)*9); f.rotation.x=Math.PI; f.scale.x=.04; } }); });
  verschmelze(g);
  /* Laub auf dem Boden (nicht im Loch) */
  const blaetter=[];
  for(let i=0;i<140;i++){ const x=-17.4+zufall()*34.8, z=-12.9+zufall()*25.9; if((Math.abs(x-HX)<2 && Math.abs(z-HZ)<2) || (z<ZL+.2 && (x<HL || x>HR))) continue; blaetter.push([x,.03,z,.1,.01,.05,[0x8a4a24,0x6a7430,0x7a3a20,0x56682c][i%4],zufall()*6]); }
  W.viele(sc,GEO.sph,blaetter);
}

/* ---------- Bewegung: wehende Blätter, Eichhörnchen, Vögel ---------- */
function leben(k,sc){
  const N=80, im=new THREE.InstancedMesh(GEO.sph,new THREE.MeshLambertMaterial({color:0xffffff}),N), o=new THREE.Object3D(), C=new THREE.Color(), L=[];
  for(let i=0;i<N;i++){ L.push([zufall()*44,zufall()*7,-14+zufall()*29,.5+zufall()*.9,zufall()*6]); im.setColorAt(i,C.set([0xc8601c,0x8a9a30,0xa8401c,0x6c9c36][i%4])); }
  im.frustumCulled=false; sc.add(im);
  const wehe=t=>{ L.forEach((e,i)=>{ const x=((e[0]+t*e[3])%44)-22, y=7-((e[1]+t*e[3]*.55)%7)+.1;
    o.position.set(x,y,e[2]+Math.sin(t*1.3+e[4])*.8); o.rotation.set(t*2*e[3]+e[4],t+e[4],Math.sin(t*3+e[4])); o.scale.set(.085,.01,.04); o.updateMatrix(); im.setMatrixAt(i,o.matrix); });
    im.instanceMatrix.needsUpdate=true; };
  wehe(0); k.anim.push(wehe);
  /* zwei Eichhörnchen laufen auf den Ästen neben dem Geländer hin und her (außerhalb von Pfosten und Wimpelstangen) */
  [[-19.1,-8,6,0],[19.1,-1.2,9,2.4]].forEach(e=>{ const q=gruppe(sc,e[0],1.17,e[1]); ohneSchatten(W.eichhorn(null,q,0,0,0,0,.8).g);
    k.anim.push(t=>{ const u=t*.32+e[3], z=e[1]+(e[2]-e[1])*(Math.sin(u)+1)/2; q.position.z=z; q.position.y=1.17+Math.abs(Math.sin(t*7+e[3]))*.12*Math.min(1,Math.abs(Math.cos(u))*3); q.rotation.y=Math.cos(u)>0?-Math.PI/2:Math.PI/2; }); });
  /* Vögel: zwei auf dem Geländer, vier fliegen */
  [[-5.6,13.35,-1.2,0x4a78b8],[12.4,13.35,-2,0xc84a30]].forEach((e,i)=>{ const v=kompakt(W.vogel(sc,e[0],1.14,e[1],e[2],e[3])); k.anim.push(t=>{ v.g.rotation.y=e[2]+Math.sin(t*1.3+i*2)*.6; v.g.position.y=1.14+Math.max(0,Math.sin(t*2.3+i*3)-.85)*.8; }); });
  [[-13,3.6,-15.5,4,.5,0,0x4a78b8],[15,4.0,-15,4,-.42,2,0xc84a30],[-20.5,3.4,0,3,.6,4,0xe0b030],[20.5,3.8,2,3,-.55,1,0x5a8a50]].forEach(e=>{
    const v=kompakt(W.vogel(sc,e[0],e[1],e[2],0,e[6])); v.g.scale.setScalar(1.5);
    k.anim.push(t=>{ const u=t*e[4]+e[5], rz=e[3]*(Math.abs(e[0])>18?2:.35), rx=e[3]*(Math.abs(e[0])>18?.5:1);
      v.g.position.set(e[0]+Math.cos(u)*rx,e[1]+Math.sin(u*2)*.4,e[2]+Math.sin(u)*rz);
      const s=Math.sign(e[4]); v.g.rotation.y=Math.atan2(-Math.cos(u)*rz*s,-Math.sin(u)*rx*s); v.fluegel.forEach((f,i)=>f.rotation.x=(i?1:-1)*Math.sin(t*13+e[5])*.9); }); });
}

function baue(k){
  const sc=W.freiluft(k,{ boden:false, himmelLicht:0xffe4c4, grund:0x84603c, staerke:.76, sonne:0xffbc70, sonneStaerke:.52 });
  umgebung(sc); plattform(sc); huette(k);
  const tuer=baueAusgang(k,sc);
  deko(k,sc); leben(k,sc);
  return { tuer, start:[3.2,3.6] };
}

/* ---------- Gegenstände ---------- */
/* 1 Fernglas auf Stativ */
function fernglas(g){
  [[-.75,.45],[.75,.45],[0,-.8]].forEach(p=>{ strich(g,[0,1.5,0],[p[0],.04,p[1]],.07,HOLZ2); ball(g,.11,EISEN,p[0],.07,p[1]); });
  walze(g,.17,.2,GOLD,0,1.55,0); walze(g,.08,.35,EISEN,0,1.75,0);
  const f=gruppe(g,0,2.15,0); f.rotation.y=.95; f.rotation.x=-.08;
  [-.34,.34].forEach(x=>{ const q=(r1,r2,h,c,z)=>{ rohr(f,r1,r2,h,c,x,0,z,18).rotation.x=Math.PI/2; };
    q(.25,.25,.7,0x2e6a48,.06); q(.33,.26,.5,0x2e6a48,.65); q(.35,.35,.12,GOLD,.94); q(.28,.28,.04,0x9adcf4,1.01); ball(f,.07,WEISS,x-.08,.09,1.03,1,1,.2);
    q(.18,.2,.34,EISEN,-.44); q(.2,.2,.1,SCHWARZ,-.65); q(.265,.265,.1,GOLD,-.08); });
  box(f,.4,.14,.34,EISEN,0,.04,.28); box(f,.4,.14,.2,EISEN,0,.04,-.25); walze(f,.11,.16,GOLD,0,.17,.02); box(f,.2,.22,.3,EISEN,0,-.16,.05);
}
/* 2 Vogelnest-Regal */
function nestregal(g){
  box(g,3.0,2.7,.1,HOLZ3,0,1.9,.1);
  [-1.45,1.45].forEach(x=>box(g,.18,2.85,.55,HOLZ2,x,1.9,.35));
  [.8,1.75,3.25].forEach(y=>box(g,3.1,.14,.85,HELL,0,y,.5));
  /* großes Nest */
  rohr(g,.72,.48,.32,0x8a6230,0,1.98,.55,18); walze(g,.62,.06,0x6a4a22,0,2.14,.55);
  for(let i=0;i<3;i++){ const r=ring(g,.68-i*.07,.085,[0xa87c3c,0x8a6230,0xc09850][i],0,2.07+i*.08,.55); r.rotation.x=Math.PI/2+(i-1)*.05; }
  for(let i=0;i<20;i++){ const a=i*.314, r=.72; strich(g,[Math.cos(a)*r,2.02+(i%3)*.07,.55+Math.sin(a)*r*.65],[Math.cos(a+.6)*r*.95,2.14+(i%4)*.04,.55+Math.sin(a+.6)*r*.65],.022,i%2?SEIL:0x6a4a22); }
  [[-.28,.58,-.2],[.04,.72,.05],[.31,.55,.22]].forEach(e=>{ const a=ball(g,.19,0x9ae0ec,e[0],2.36,e[1],1,1.35,1); a.rotation.z=e[2]; ball(g,.025,0x4a8aa0,e[0]-.06,2.42,e[1]+.17); ball(g,.02,0x4a8aa0,e[0]+.07,2.32,e[1]+.18); });
  /* Federn in einem Tonkrug und kleine Zapfen unten */
  rohr(g,.18,.22,.4,0xc0603a,-.8,1.07,.55,12); [[-.95,0x4a78b8],[-.8,0xe0a030],[-.65,0xc84a30]].forEach((e,i)=>{ const f=ball(g,.1,e[1],e[0],1.5+(i%2)*.08,.55,.55,2.4,.2); f.rotation.z=(1-i)*.35; });
  [.2,.65,1.05].forEach((x,i)=>{ kegel(g,.18,.4,i%2?RINDE:RINDE2,x,1.07,.55); ball(g,.16,i%2?RINDE:RINDE2,x,.99,.55,1,.7,1); });
  ball(g,.3,W.MOOS,1.1,3.42,.5,1.3,.5,1); ball(g,.22,W.MOOS2,-1.15,3.4,.55,1.3,.5,1);
}
/* 3 Seilwinde mit Eimer */
function winde(g,k){
  box(g,3.0,.14,1.5,HOLZ3,0,.07,0);
  [-1.2,.2].forEach(x=>{ box(g,.22,2.0,.3,HOLZ2,x,1.1,-.35); strich(g,[x,.15,.55],[x,1.2,-.3],.09,HOLZ2); });
  rohr(g,.3,.3,1.4,HOLZ,-.5,1.35,-.35).rotation.z=Math.PI/2;
  for(let i=0;i<9;i++){ const r=ring(g,.36,.065,i%2?SEIL:SEIL2,-.98+i*.12,1.35,-.35); r.rotation.y=Math.PI/2; }
  /* Kurbel */
  strich(g,[-1.2,1.35,-.35],[-1.5,1.35,-.35],.07,EISEN); strich(g,[-1.5,1.35,-.35],[-1.5,.85,0],.065,EISEN); strich(g,[-1.5,.85,0],[-1.85,.85,0],.09,ROT);
  /* Ausleger mit Rolle */
  box(g,.26,3.3,.26,HOLZ2,.7,1.7,-.4); box(g,.9,.22,.24,HOLZ2,1.0,3.3,-.4); box(g,.24,.22,1.1,HOLZ2,1.35,3.3,.05); strich(g,[.75,2.5,-.4],[1.3,3.25,-.38],.08,HOLZ2);
  const r=ring(g,.24,.08,METALL,1.35,3.0,.45); r.rotation.y=Math.PI/2; ball(g,.08,GOLD,1.35,3.0,.45); box(g,.08,.34,.08,EISEN,1.35,3.16,.45);
  strich(g,[.0,1.68,-.3],[1.35,3.24,.4],.045,SEIL);
  const e=lebt(gruppe(g,1.35,3.0,.7)), i=gruppe(e,0,0,0);
  strich(i,[0,.05,0],[0,-1.35,0],.045,SEIL);
  ring(i,.46,.04,EISEN,0,-1.92,0,Math.PI);
  rohr(i,.48,.36,.75,0xa8703a,0,-2.28,0,16,true); walze(i,.36,.06,HOLZ2,0,-2.63,0); walze(i,.43,.04,HOLZ3,0,-2.12,0);
  [[-2.5,.4],[-2.0,.47]].forEach(p=>ring(i,p[1],.04,METALL,0,p[0],0).rotation.x=Math.PI/2); ring(i,.49,.045,EISEN,0,-1.9,0).rotation.x=Math.PI/2;
  verschmelze(i);
  k.anim.push(t=>{ e.rotation.z=Math.sin(t*1.5)*.05; e.rotation.x=Math.sin(t*1.1+1)*.03; });
}
/* 4 Eichhörnchen-Vorrat: Korb mit Nüssen */
function vorrat(g,k){
  rohr(g,.9,.68,.85,0xc89048,-.25,.43,0,22);
  for(let i=0;i<5;i++) ring(g,.71+i*.05,.055,i%2?0xa8702c:0xe0b068,-.25,.1+i*.18,0).rotation.x=Math.PI/2;
  for(let i=0;i<16;i++){ const a=i*Math.PI/8; strich(g,[-.25+Math.cos(a)*.7,.04,Math.sin(a)*.7],[-.25+Math.cos(a)*.93,.84,Math.sin(a)*.93],.035,0x8a5a20); }
  ring(g,.92,.09,0xa8702c,-.25,.87,0).rotation.x=Math.PI/2; ring(g,.88,.06,0xa8702c,-.25,.87,0,Math.PI);
  walze(g,.84,.06,0x6a4420,-.25,.8,0);
  const nuss=(x,y,z,i)=>{ ball(g,.18,i%3?0xb4702c:0x8a4a1c,x,y,z,1,1.1,1); ball(g,.17,i%2?0x6a8a30:0xc8a060,x,y+.12,z,1.02,.48,1.02); ball(g,.035,HOLZ3,x,y+.23,z); };
  [[0,0],[.34,0],[.34,1.05],[.34,2.1],[.34,3.14],[.34,4.2],[.34,5.25],[.65,.5],[.65,1.55],[.65,2.6],[.65,3.7],[.65,4.7],[.65,5.8]].forEach((p,i)=>nuss(-.25+Math.cos(p[1])*p[0],1.2-p[0]*.42,Math.sin(p[1])*p[0],i));
  [[-1.35,.65],[-.9,1.0],[.2,1.05],[1.35,.8]].forEach((p,i)=>nuss(p[0],.18,p[1],i+1));
  W.eichhorn(k,g,1.15,0,.15,-2.1,1.35,.7);
}
/* 5 Windfahne */
function windfahne(g,k){
  box(g,1.2,.16,.24,HOLZ3,0,.08,0); box(g,.24,.16,1.2,HOLZ3,0,.08,0); [[-.4,0],[.4,0]].forEach(p=>strich(g,[p[0],.14,p[1]],[0,.75,0],.06,HOLZ2));
  walze(g,.11,3.0,HOLZ,0,1.55,0);
  strich(g,[-.75,2.45,0],[.75,2.45,0],.04,EISEN); strich(g,[0,2.45,-.75],[0,2.45,.75],.04,EISEN);
  [[-.82,0,ROT],[.82,0,BLAU],[0,-.82,GELB],[0,.82,0x4aa050]].forEach(p=>ball(g,.14,p[2],p[0],2.45,p[1]));
  ball(g,.13,GOLD,0,3.1,0);
  const f=lebt(gruppe(g,0,3.42,0)), i=gruppe(f,0,0,0);
  walze(i,.05,.55,EISEN,0,-.12,0);
  strich(i,[-1.0,0,0],[.85,0,0],.06,GOLD); const sp=kegel(i,.22,.45,GOLD,1.05,0,0); sp.rotation.z=-Math.PI/2; sp.scale.z=.1;
  box(i,.75,.62,.06,ROT,-.85,0,0); box(i,.34,.28,.07,WEISS,-.82,0,0); [-1,1].forEach(v=>{ const q=box(i,.42,.2,.06,ROT,-1.3,v*.21,0); q.rotation.z=-v*.3; });
  ball(i,.12,GOLD,0,.14,0);
  verschmelze(i);
  k.anim.push(t=>{ f.rotation.y=.25+Math.sin(t*.7)*.6+Math.sin(t*1.9)*.15; });
}
/* 6 Wetterstation */
function wetter(g,k){
  box(g,2.7,2.5,.14,HELL,0,2.0,.12); [.7,3.3].forEach(y=>box(g,2.9,.16,.24,HOLZ2,0,y,.14)); [-1.4,1.4].forEach(x=>box(g,.16,2.7,.22,HOLZ2,x,2.0,.14));
  /* Thermometer */
  box(g,.55,2.0,.08,WEISS,-.82,2.0,.23); walze(g,.1,1.5,0xcfe4ec,-.82,2.15,.29); walze(g,.07,.9,ROT,-.82,1.85,.36); ball(g,.19,ROT,-.82,1.33,.34);
  for(let i=0;i<8;i++) box(g,i%2?.1:.15,.03,.03,SCHWARZ,-.62,1.65+i*.18,.29);
  /* Sonne und Wolke */
  walze(g,.3,.07,GELB,.1,2.65,.25).rotation.x=Math.PI/2; for(let i=0;i<8;i++){ const a=i*Math.PI/4; strich(g,[.1+Math.cos(a)*.37,2.65+Math.sin(a)*.37,.25],[.1+Math.cos(a)*.52,2.65+Math.sin(a)*.52,.25],.035,0xe8a020); }
  [[.18,2.38,.2],[.4,2.46,.25],[.6,2.36,.18]].forEach(e=>ball(g,e[2],WEISS,e[0],e[1],.37,1,.85,.5));
  /* Regenmesser */
  const glas=rohr(g,.27,.27,1.2,new THREE.MeshLambertMaterial({color:0xd8f0f8,transparent:true,opacity:.42,depthWrite:false}),.82,1.6,.46,16);
  glas.castShadow=false;
  walze(g,.23,.5,0x3a8ad8,.82,1.28,.46); walze(g,.3,.09,METALL,.82,.96,.46); ring(g,.29,.04,METALL,.82,2.2,.46).rotation.x=Math.PI/2; box(g,.12,.1,.34,EISEN,.82,1.5,.27);
  for(let i=0;i<5;i++) box(g,.16,.03,.03,SCHWARZ,.82,1.15+i*.2,.74);
  /* Zeiger-Uhr für den Luftdruck */
  walze(g,.38,.08,GOLD,0,1.35,.23).rotation.x=Math.PI/2; walze(g,.31,.04,WEISS,0,1.35,.29).rotation.x=Math.PI/2; strich(g,[0,1.35,.33],[.16,1.53,.33],.028,SCHWARZ); ball(g,.05,SCHWARZ,0,1.35,.33);
  /* Windrad oben */
  walze(g,.06,.8,EISEN,.6,3.75,.4); box(g,.14,.14,.4,HOLZ2,.6,3.38,.25);
  const r=lebt(gruppe(g,.6,4.15,.4)), i=gruppe(r,0,0,0);
  ball(i,.11,EISEN,0,0,0);
  for(let n=0;n<4;n++){ const a=n*Math.PI/2, x=Math.cos(a)*.55, z=Math.sin(a)*.55; strich(i,[0,0,0],[x,0,z],.03,METALL); const m=ball(i,.18,[ROT,BLAU,GELB,0x4aa050][n],x,0,z,1,1,.7); m.rotation.y=-a; }
  verschmelze(i);
  k.anim.push(t=>{ r.rotation.y=t*3.2; });
}
/* 7 Logbuch auf einem Pult */
function logbuch(g){
  box(g,1.3,.16,1.0,HOLZ3,0,.08,0); walze(g,.18,1.1,HOLZ2,0,.65,0); [-1,1].forEach(v=>strich(g,[v*.55,.15,0],[0,.7,0],.07,HOLZ2));
  const p=gruppe(g,0,1.35,0); p.rotation.x=.5;
  box(p,2.1,.14,1.35,HOLZ,0,0,0); box(p,2.1,.14,.12,HOLZ2,0,.11,.68);
  box(p,1.86,.1,1.15,0x8a2a1c,0,.12,0);
  const seite=bild(256,320,(c)=>{ c.fillStyle='#fbf4dc'; c.fillRect(0,0,256,320); c.strokeStyle='#5a4a34'; c.lineWidth=5; for(let i=0;i<9;i++){ c.beginPath(); c.moveTo(24,40+i*30); for(let x=24;x<232-((i*47)%80);x+=16) c.lineTo(x+16,40+i*30+((x/16)%2?4:-3)); c.stroke(); }
    c.fillStyle='#4a8a3a'; c.beginPath(); c.moveTo(196,244); c.lineTo(222,292); c.lineTo(170,292); c.fill(); });
  [-1,1].forEach(v=>{ const s=gruppe(p,v*.44,.24,0); s.rotation.z=v*.09; box(s,.84,.1,1.04,0xe8dcb8,0,-.02,0);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(.82,1.02),new THREE.MeshLambertMaterial({map:seite})); m.rotation.x=-Math.PI/2; m.position.y=.036; s.add(m); });
  box(p,.05,.04,1.1,0x8a2a1c,0,.22,0); box(p,.1,.02,.45,ROT,.12,.31,.62);
  /* Tintenfass mit Feder */
  walze(g,.24,.1,HOLZ2,1.0,.98,0); strich(g,[0,.8,0],[1.0,.95,0],.06,HOLZ2); rohr(g,.13,.18,.28,0x24407a,1.0,1.17,0,12); walze(g,.09,.08,GOLD,1.0,1.34,0);
  strich(g,[1.0,1.3,0],[1.38,2.15,-.1],.022,0x8a7a60); const f=ball(g,.16,WEISS,1.3,1.95,-.08,.75,2.5,.22); f.rotation.z=-.42; const f2=ball(g,.09,BLAU,1.42,2.22,-.1,.7,1.7,.25); f2.rotation.z=-.42;
}
/* 8 Laterne auf einem Baumstumpf */
function laterne(g,k){
  rohr(g,.55,.66,.75,RINDE,0,.38,0,14); walze(g,.54,.05,HELL,0,.77,0); ring(g,.34,.022,HOLZ,0,.8,0).rotation.x=Math.PI/2; ring(g,.17,.022,HOLZ,0,.8,0).rotation.x=Math.PI/2;
  for(let i=0;i<5;i++){ const a=i*1.26; strich(g,[Math.cos(a)*.55,.3,Math.sin(a)*.55],[Math.cos(a)*.78,.05,Math.sin(a)*.78],.11,RINDE2); }
  box(g,.9,.16,.9,EISEN,0,.88,0);
  [-1,1].forEach(v=>[-1,1].forEach(w=>box(g,.08,1.15,.08,EISEN,v*.37,1.53,w*.37)));
  [-1,1].forEach(v=>{ box(g,.04,1.1,.04,EISEN,0,1.53,v*.39); box(g,.04,1.1,.04,EISEN,v*.39,1.53,0); });
  const glas=box(g,.7,1.1,.7,new THREE.MeshLambertMaterial({color:0xffe0a0,emissive:0xa87020,transparent:true,opacity:.5,depthWrite:false}),0,1.53,0); glas.castShadow=false;
  walze(g,.17,.4,0xf4ecd6,0,1.16,0);
  const fl=lebt(gruppe(g,0,1.38,0)); ball(fl,.15,basis(0xffa828),0,.17,0,1,1.7,1); ball(fl,.08,basis(0xfff4b0),0,.12,.1,1,1.6,1);
  box(g,.98,.14,.98,EISEN,0,2.14,0); const d=kegel(g,.74,.46,0x3a4048,0,2.44,0); d.rotation.y=Math.PI/4; walze(g,.13,.18,EISEN,0,2.72,0); ring(g,.25,.05,GOLD,0,3.0,0);
  schein(g,'rgba(255,190,80,.75)',0,1.55,.5,2.4);
  const l=new THREE.PointLight(0xffa840,.8,8,1.5); l.position.set(0,1.7,.7); g.add(l);
  k.anim.push(t=>{ fl.scale.set(1,1+Math.sin(t*11)*.12+Math.sin(t*6.3)*.08,1); l.intensity=.8+Math.sin(t*10)*.07; });
}
/* 9 Hängematte */
function haengematte(g,k){
  [-1,1].forEach(v=>{ const x=v*2.15; walze(g,.17,2.5,RINDE,x,1.25,0); ball(g,.22,HELL,x,2.55,0); box(g,.8,.14,1.1,HOLZ3,x,.07,0); strich(g,[x,.12,.5],[x,.7,0],.07,HOLZ2); strich(g,[x,.12,-.5],[x,.7,0],.07,HOLZ2);
    ring(g,.2,.05,SEIL,x,2.05,0).rotation.x=Math.PI/2; });
  const m=lebt(gruppe(g,0,2.05,0)), i=gruppe(m,0,0,0);
  const N=16, X=u=>-1.5+3*u, Y=u=>-.5-Math.sin(u*Math.PI)*.72, F=[ROT,0xf4ecd6,0x2e8a8a,GELB];
  for(let a=0;a<N;a++){ const u=a/N, w=(a+1)/N, dx=X(w)-X(u), dy=Y(w)-Y(u), l=Math.hypot(dx,dy), br=.75+Math.sin((u+w)/2*Math.PI)*.4;
    for(let s=0;s<5;s++){ const q=box(i,l+.03,.07,br/5+.005,F[[0,1,2,1,0][s]],(X(u)+X(w))/2,(Y(u)+Y(w))/2+Math.pow((s-2)/2,2)*.2,(s-2)*br/5); q.rotation.z=Math.atan2(dy,dx); } }
  [0,1].forEach(e=>{ const x=X(e), s=e?1:-1; strich(i,[x,Y(e)+.1,-.42],[x,Y(e)+.1,.42],.07,HOLZ); [-.36,-.18,0,.18,.36].forEach(z=>strich(i,[x,Y(e)+.12,z],[s*2.02,0,0],.025,SEIL)); });
  const kissen=ball(i,.34,0x5aa040,-.95,-.86,0,.95,.55,1.35); kissen.rotation.z=-.45;
  verschmelze(i);
  k.anim.push(t=>{ m.rotation.x=Math.sin(t*1.2)*.09; });
}
/* 10 Eule in der Baumhöhle */
function eule(g,k){
  const baum=gruppe(g,0,0,0);
  rohr(baum,1.05,1.3,5.0,RINDE,0,2.5,0,18);
  for(let i=0;i<7;i++){ const a=i*.9; if(Math.abs(Math.atan2(Math.cos(a),Math.sin(a)))<.9) continue; strich(baum,[Math.cos(a)*1.28,.2,Math.sin(a)*1.28],[Math.cos(a)*1.1,3.6,Math.sin(a)*1.1],.08,RINDE2); }
  [-2.4,-1.3,.2,1.4,2.7].forEach(a=>{ strich(baum,[Math.sin(a)*1.1,.5,Math.cos(a)*1.1],[Math.sin(a)*1.55,.04,Math.cos(a)*1.55],.18,RINDE2); });
  [-1,1].forEach(v=>{ strich(baum,[0,4.5,0],[v*1.9,6.1,-.3],.3,RINDE); ball(baum,.85,v<0?0x5c9434:0x8a9a30,v*2.0,6.4,-.3,1.2,.75,1); }); ball(baum,1.2,0x4f8a34,0,5.7,-.1,1.15,.75,1);
  ball(baum,.4,W.MOOS,-.9,1.0,.7,.9,.5,.7);
  verschmelze(baum); k.verdecker(baum,-14.2,-9.2,1.2);
  /* Höhle: dunkle Öffnung mit Rindenrand und Ast davor */
  const h=gruppe(g,0,2.35,1.13);
  ball(h,.82,basis(0x1c0e06),0,0,0,1,1.25,.2);
  ball(h,1.0,RINDE2,0,0,-.35,.98,1.28,.45);
  const rand=ring(h,.85,.14,HOLZ3,0,0,.08); rand.scale.y=1.24;
  const r2=ring(h,.97,.07,HELL,0,0,.04); r2.scale.y=1.22;
  strich(h,[-.95,-.82,.3],[1.05,-.78,.55],.13,RINDE2); [[.95,-.62],[1.15,-.7]].forEach(p=>ball(h,.14,W.LAUB2,p[0],p[1],.55,1,.45,.8));
  /* Eule */
  const e=lebt(gruppe(h,0,-.15,.36)), r=gruppe(e,0,0,0), F=0xb08050, D=0x6a4426, H=0xf0dcb4;
  ball(r,.46,F,0,-.1,0,1,1.18,.72); ball(r,.33,H,0,-.18,.18,.95,1.15,.62);
  for(let i=0;i<7;i++) ball(r,.045,D,-.18+(i%4)*.12,-.05-Math.floor(i/4)*.2,.39,1.2,.7,.4);
  [-1,1].forEach(v=>{ const f=ball(r,.2,D,v*.42,-.14,.05,.65,1.65,.8); f.rotation.z=v*.18; [-.07,0,.07].forEach(d=>ball(r,.05,0xe8a028,v*.17+d,-.62,.27,.8,.7,1.5)); });
  verschmelze(r);
  const kopf=gruppe(e,0,.46,.04), ko=gruppe(kopf,0,0,0);
  ball(ko,.45,F,0,0,0,1.12,.92,.85);
  [-1,1].forEach(v=>{ const o=kegel(ko,.13,.38,D,v*.34,.38,0); o.rotation.z=-v*.45; ball(ko,.23,H,v*.2,.02,.28,1,1,.55); ball(ko,.155,0xffc820,v*.2,.03,.4,1,1,.45); ball(ko,.075,SCHWARZ,v*.2,.03,.47,1,1,.45); ball(ko,.028,basis(0xffffff),v*.2+.04,.075,.515); });
  const sn=kegel(ko,.08,.22,0xe89020,0,-.13,.46); sn.rotation.x=Math.PI-.3;
  verschmelze(ko);
  const lid=lebt(gruppe(kopf,0,0,0)); [-1,1].forEach(v=>{ ball(lid,.17,D,v*.2,.03,.455,1,1,.45); strich(lid,[v*.2-.12,0,.54],[v*.2+.12,0,.54],.018,SCHWARZ); }); lid.visible=false;
  e.scale.setScalar(1.05);
  k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.7)*.38; kopf.rotation.z=Math.sin(t*.43+1)*.1; lid.visible=(t%4.3)<.18; });
}

const gegenstaende=[
  { x:-8.6, z:-2.4, steh:[-8.6,-.2], r:1.0, treffer:[2.4,2.9,2.0], baue:fernglas },
  { x:-7.4, z:HINTEN, wand:'hinten', steh:[-7.4,-11.0], kasten:[3.3,2.0], treffer:[3.2,3.0,1.2], trefferY:.6, baue:nestregal },
  { x:-13.8, z:2.2, steh:[-13.8,4.4], kasten:[3.8,1.8], treffer:[3.8,3.6,1.8], baue:winde },
  { x:-6.4, z:6.6, steh:[-6.2,8.8], kasten:[3.2,2.2], treffer:[3.2,1.7,2.2], baue:vorrat },
  { x:-14.2, z:8.6, steh:[-13.9,10.7], r:.75, treffer:[2.2,3.9,1.2], baue:windfahne },
  { x:2.4, z:HINTEN, wand:'hinten', steh:[2.4,-11.0], kasten:[3.1,2.0], treffer:[3.0,4.0,1.1], trefferY:.6, baue:wetter },
  { x:4.6, z:-3.0, steh:[4.6,-1.0], r:1.05, treffer:[2.6,2.3,1.6], baue:logbuch },
  { x:8.4, z:5.6, steh:[8.4,7.4], r:.8, treffer:[1.6,3.2,1.5], baue:laterne },
  { x:13.6, z:1.6, steh:[13.4,3.6], kasten:[5.0,1.5], treffer:[4.9,2.6,1.4], baue:haengematte },
  { x:-14.2, z:-9.2, dreh:.22, steh:[-13.4,-6.6], r:1.5, treffer:[2.7,4.6,2.7], baue:eule }
];
const verstecke=[[-12.0,-3.6],[-5.4,-9.6],[-.2,-9.0],[5.6,-9.4],[15.2,-7.8],[8.2,-2.4],[14.6,-1.2],[1.4,-2.6],[-5.2,-1.6],[-11.4,.0],
  [-9.8,8.4],[-15.8,12.0],[-6.4,10.8],[3.0,8.8],[6.0,10.8],[12.6,9.4],[14.6,6.0],[-3.4,4.4],[7.8,1.6],[-16.0,-1.0]];

return { titel:'Das Baumhaus', breite:B, tiefe:T, himmel:0xf4a870, baue, gegenstaende, verstecke };
})();

/* Raum 5: Die Waldhütte. Blockbohlenwände, Ofenfeuer, Abendfenster, Laternen, Bett, Küchenschrank, Flickenteppiche, Katze und Mäuschen.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die grüne Hüttentür in der Rückwand links, sie schwingt nach draußen auf, dahinter liegt der Abendwald. */
RAEUME3D.wald[4] = (function(){
const { HOLZ, HOLZ2, HOLZ3, HELLHOLZ, ERDE, MOOS, LAUB, LAUB2, LAUB3, STEIN, STEIN2, ROT, BLAU, GELB, ORANGE, CREME, WEISS, SCHWARZ, GOLD, METALL, METALL2, EISEN } = WA;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=-6;                      /* Mitte der Hüttentür */
const TUERGRUEN=0x2f7a4a, TUERGRUEN2=0x3a8c56, EISENOFEN=0x34343c, STROHF=0xe8c458;

const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze/Ring nach vorn bzw. flach legen */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

/* ---------- Bilder ---------- */
/* Blockbohlen: acht runde Stämme übereinander (kachelbar) */
function bohlenBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#2a180a'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ const y=r*64, d=Math.floor(zufall()*18)-9, v=g.createLinearGradient(0,y,0,y+64), f=(a,b,c)=>'rgb('+(a+d)+','+(b+d)+','+(c+d)+')';
      v.addColorStop(0,f(90,56,28)); v.addColorStop(.3,f(178,122,70)); v.addColorStop(.62,f(146,94,50)); v.addColorStop(1,f(70,42,20)); g.fillStyle=v; g.fillRect(0,y+3,512,58);
      g.fillStyle='rgba(60,32,10,.28)'; for(let j=0;j<12;j++) g.fillRect(zufall()*430,y+12+zufall()*40,25+zufall()*60,2);
      g.fillStyle='rgba(50,26,8,.5)'; const x=30+zufall()*440; g.beginPath(); g.ellipse(x,y+22+zufall()*20,9,5,0,0,7); g.fill(); } });
}
/* Abendfenster: Himmel von Blau bis Orange, Mond, Sterne, dunkle Tannen */
function abendFensterBild(mondX){
  return bild(384,288,(g)=>{ const v=g.createLinearGradient(0,0,0,240); v.addColorStop(0,'#2a3678'); v.addColorStop(.55,'#8a5a94'); v.addColorStop(1,'#f8a458'); g.fillStyle=v; g.fillRect(0,0,384,288);
    g.fillStyle='#ffffff'; for(let i=0;i<22;i++) g.fillRect(zufall()*380,zufall()*100,3,3);
    g.fillStyle='#fff2b8'; g.beginPath(); g.arc(mondX,66,24,0,7); g.fill();
    g.fillStyle='#1c3a2a'; for(let i=0;i<11;i++){ const x=i*40+zufall()*18-8, h=70+zufall()*80; for(let s=0;s<3;s++){ const y=262-h+s*h*.25, w=14+s*11; g.beginPath(); g.moveTo(x,y); g.lineTo(x+w,y+h*.38); g.lineTo(x-w,y+h*.38); g.fill(); } }
    g.fillRect(0,252,384,36); });
}
/* Blick durch die offene Tür: Abendwald mit Weg */
function abendWaldBild(){
  return bild(512,384,(g)=>{ const v=g.createLinearGradient(0,0,0,300); v.addColorStop(0,'#3a4a90'); v.addColorStop(.5,'#c0708a'); v.addColorStop(1,'#ffcc78'); g.fillStyle=v; g.fillRect(0,0,512,384);
    const l=g.createRadialGradient(256,262,8,256,262,150); l.addColorStop(0,'rgba(255,248,200,1)'); l.addColorStop(1,'rgba(255,200,110,0)'); g.fillStyle=l; g.fillRect(0,90,512,294);
    g.fillStyle='#fff2b0'; g.beginPath(); g.arc(256,252,30,0,7); g.fill();
    const tanne=(x,y,h,f)=>{ g.fillStyle=f; for(let s=0;s<3;s++){ const o=y-h+s*h*.26, w=h*(.14+s*.08); g.beginPath(); g.moveTo(x,o); g.lineTo(x+w,o+h*.42); g.lineTo(x-w,o+h*.42); g.fill(); } g.fillStyle='#3a2410'; g.fillRect(x-4,y-h*.08,8,h*.1); };
    [30,80,135,180,335,385,440,490].forEach((x,i)=>tanne(x,305,110+(i%3)*30,'#3a6a52'));
    g.fillStyle='#4a7a3a'; g.fillRect(0,298,512,86);
    g.fillStyle='#e0c488'; g.beginPath(); g.moveTo(244,298); g.lineTo(268,298); g.lineTo(340,384); g.lineTo(172,384); g.fill();
    [[60,350,160],[455,350,175],[125,325,120],[390,325,130]].forEach(([x,y,h])=>tanne(x,y,h,'#24503a')); });
}
/* Tagebuch: zwei Seiten mit Schrift und Blattzeichnung */
function buchBild(){
  return bild(384,256,(g)=>{ g.fillStyle='#fbf3d8'; g.fillRect(0,0,384,256);
    const v=g.createLinearGradient(160,0,224,0); v.addColorStop(0,'rgba(120,90,40,0)'); v.addColorStop(.5,'rgba(120,90,40,.5)'); v.addColorStop(1,'rgba(120,90,40,0)'); g.fillStyle=v; g.fillRect(160,0,64,256);
    g.strokeStyle='#6a5438'; g.lineWidth=4; for(let i=0;i<8;i++){ const y=34+i*27; g.beginPath(); g.moveTo(22,y); for(let x=22;x<165;x+=14) g.lineTo(x+7,y+(x%28?3:-3)); g.stroke(); }
    for(let i=0;i<3;i++){ const y=168+i*27; g.beginPath(); g.moveTo(216,y); for(let x=216;x<355;x+=14) g.lineTo(x+7,y+(x%28?3:-3)); g.stroke(); }
    g.fillStyle='#5a9a40'; g.beginPath(); g.moveTo(288,24); g.quadraticCurveTo(358,70,288,138); g.quadraticCurveTo(218,70,288,24); g.fill();
    g.strokeStyle='#2e5a20'; g.beginPath(); g.moveTo(288,36); g.lineTo(288,152); g.moveTo(288,70); g.lineTo(316,54); g.moveTo(288,94); g.lineTo(256,74); g.stroke(); });
}
/* Waldkarte: Tannen, Bach, Wege, Hütte, See */
function kartenBild(){
  return bild(512,352,(g)=>{ g.fillStyle='#f0dca4'; g.fillRect(0,0,512,352); g.strokeStyle='#a8844a'; g.lineWidth=8; g.strokeRect(12,12,488,328);
    g.fillStyle='#b8d488'; [[110,100,90,60],[390,110,95,66],[140,262,100,55]].forEach(([x,y,a,b])=>{ g.beginPath(); g.ellipse(x,y,a,b,0,0,7); g.fill(); });
    g.strokeStyle='#3a98d0'; g.lineWidth=16; g.lineCap='round'; g.beginPath(); g.moveTo(30,230); g.bezierCurveTo(160,150,230,270,330,200); g.bezierCurveTo(390,160,430,190,485,120); g.stroke();
    g.fillStyle='#3a98d0'; g.beginPath(); g.ellipse(400,270,52,30,-.2,0,7); g.fill();
    g.strokeStyle='#8a4a20'; g.lineWidth=6; g.setLineDash([13,11]); g.beginPath(); g.moveTo(60,60); g.quadraticCurveTo(250,40,250,150); g.quadraticCurveTo(250,300,350,320); g.stroke(); g.setLineDash([]);
    g.fillStyle='#2f6a3a'; [[80,80],[120,115],[155,75],[360,80],[410,110],[450,75],[385,140],[90,270],[140,290],[190,262],[205,95]].forEach(([x,y])=>{ g.beginPath(); g.moveTo(x,y-28); g.lineTo(x+18,y+12); g.lineTo(x-18,y+12); g.fill(); g.fillRect(x-3,y+12,6,8); });
    g.fillStyle='#a0522d'; g.fillRect(268,92,46,32); g.fillStyle='#7a2a1a'; g.beginPath(); g.moveTo(260,94); g.lineTo(291,66); g.lineTo(322,94); g.fill(); g.fillStyle='#ffd860'; g.fillRect(284,104,13,20);
    g.fillStyle='#fff8e0'; g.beginPath(); g.arc(456,300,24,0,7); g.fill(); g.fillStyle='#c0392b'; g.beginPath(); g.moveTo(456,278); g.lineTo(464,300); g.lineTo(448,300); g.fill(); g.fillStyle='#3a2a1a'; g.beginPath(); g.moveTo(456,322); g.lineTo(464,300); g.lineTo(448,300); g.fill(); });
}
/* Zifferblatt */
function zifferBild(){
  return bild(256,256,(g)=>{ g.fillStyle='#fffbe8'; g.fillRect(0,0,256,256); g.fillStyle='#2a1a08'; g.font='700 30px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle';
    for(let i=1;i<=12;i++){ const a=i*Math.PI/6; g.fillText(i,128+Math.sin(a)*98,128-Math.cos(a)*98); } });
}

/* ---------- Ausgang: die Hüttentür ---------- */
function baueTuer(k,sc,hinten){
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(11,6.4),basis(0xffffff,{map:abendWaldBild()})); aus.position.set(AX,3.2,HINTEN-4.4); hinten.add(aus);
  const wiese=hell(box(hinten,9,.04,4.4,0x568a3e,AX,-.012,HINTEN-2.2)); wiese.receiveShadow=true;
  const weg=gruppe(hinten,0,0,0);
  box(weg,1.9,.03,3.9,0xd8bc84,AX+.2,.015,HINTEN-2.1);
  WA.tanne(weg,AX-3.7,HINTEN-2.6,3.4); WA.tanne(weg,AX+2.7,HINTEN-2.0,3.0); WA.tanne(weg,AX+2.1,HINTEN-3.6,2.4,WA.TANNE2);
  /* Glühwürmchen draußen */
  const gm=basis(0xfff48a), wuermer=[0,1,2,3,4,5].map(i=>hell(ball(hinten,.045,gm,AX,1.5,HINTEN-2)));
  k.anim.push(t=>wuermer.forEach((w,i)=>w.position.set(AX+Math.sin(t*.7+i*2.1)*1.25, 1.1+i*.28+Math.sin(t*1.3+i)*.25, HINTEN-1.7-(i%3)*.7)));
  /* Türrahmen */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.34,4.6,.42,HELLHOLZ,s*1.57,2.3,.08); box(r,.46,.3,.52,HOLZ3,s*1.57,.15,.1); });
  box(r,3.9,.36,.5,HELLHOLZ,0,4.58,.1); box(r,2.8,.07,.7,STEIN,0,.025,.06);
  /* kleines Vordach aus Brettern mit Moos über der Tür */
  [-1,1].forEach(s=>{ const d=box(r,2.35,.2,.7,HOLZ3,s*1.02,5.2,.28); d.rotation.z=-s*.28; });
  ball(r,.14,GOLD,0,5.5,.64); [-1.5,-.9,.8,1.55].forEach(x=>ball(r,.18,MOOS,x,5.42-Math.abs(x)*.28,.4,1.5,.4,1));
  verschmelze(r);
  /* Türblatt: Drehpunkt links, schwingt nach draußen */
  const bl=gruppe(hinten,AX-1.39,0,HINTEN+.06); bl.userData.lebendig=true;
  for(let i=0;i<5;i++) box(bl,.54,4.34,.16,i%2?TUERGRUEN2:TUERGRUEN,.28+i*.555,2.22,0);
  [.75,3.65].forEach(y=>{ box(bl,2.3,.17,.07,EISEN,1.17,y,.11); [.25,.9,1.55,2.15].forEach(x=>ball(bl,.055,METALL,x,y,.16)); });
  /* Herzfenster */
  [-1,1].forEach(s=>ball(bl,.17,basis(0xffd27a),1.39+s*.12,3.18,.09,1,1,.2)); const sp=kegel(bl,.26,.34,basis(0xffd27a),1.39,2.94,.09); sp.rotation.x=Math.PI; sp.scale.z=.03;
  ring(bl,.17,.04,GOLD,2.4,1.75,.17); ball(bl,.07,GOLD,2.4,1.92,.14);
  box(bl,1.38,1.04,.07,HOLZ3,1.39,2.14,.1);
  const schloss=WA.zahlenschloss(bl,1.39,2.02,.24); schloss.scale.setScalar(1.3);
  verschmelze(bl);
  const glanz=schein(hinten,'rgba(255,225,110,.45)',AX,2.3,HINTEN+.7,1.2);
  const licht=new THREE.PointLight(0xffb870,.15,9,1.5); licht.position.set(AX,3.2,HINTEN-1.4); sc.add(licht);
  k.kasten(AX,-13.15,3.7,.8); /* geschlossene Tür: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Hüttentür', einfach:'Tür der Hütte', steh:[AX+.2,-11.15], durch:[AX+.3,-15.3],
    treffer:{x:AX,y:2.4,z:-12.95,b:3.5,h:4.8,t:.9}, schildOben:[AX,5.25,-12.4], glanz:[AX,2.3,-12.8],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.05)/.88)); bl.rotation.y=1.8*a*a*(3-2*a); glanz.visible=auf<.05; licht.intensity=.15+1.0*auf; } });
}

/* ---------- Wandschmuck ---------- */
function fenster(par,x,mondX){
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.8),basis(0xffffff,{map:abendFensterBild(mondX)})); aus.position.set(x,3.15,HINTEN+.04); par.add(aus);
  const f=gruppe(par,x,0,HINTEN);
  [-1,1].forEach(s=>box(f,.18,2.1,.24,HELLHOLZ,s*1.28,3.15,.11));
  box(f,2.74,.18,.24,HELLHOLZ,0,4.14,.11); box(f,3.0,.16,.5,HELLHOLZ,0,2.16,.25);
  box(f,.08,1.8,.08,HELLHOLZ,0,3.15,.1); box(f,2.4,.08,.08,HELLHOLZ,0,3.3,.1);
  [-1,1].forEach(s=>{ for(let i=0;i<3;i++){ const v=box(f,.19,1.72-i*.1,.07,i%2?CREME:ROT,s*(1.3-i*.17),3.22+i*.05,.27+(i%2)*.04); v.rotation.z=s*i*.03; } box(f,.58,.09,.14,GOLD,s*1.14,2.84,.3); });
  strich(f,[-1.6,4.28,.3],[1.6,4.28,.3],.045,HOLZ3); [-1.62,1.62].forEach(a=>ball(f,.09,GOLD,a,4.28,.3));
  /* Kerze auf dem Brett */
  walze(f,.07,.3,CREME,.62,2.39,.34); ball(f,.055,basis(0xffc840),.62,2.62,.34,1,1.7,1);
  verschmelze(f);
}
function laterne(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,.3,.5,.08,EISEN,0,.35,.06); strich(g,[0,.45,.08],[0,.65,.55],.04,EISEN); strich(g,[0,.65,.55],[0,.44,.55],.025,EISEN);
  kegel(g,.34,.24,EISEN,0,.36,.55); box(g,.34,.46,.34,basis(0xffd870),0,0,.55); [-.18,.18].forEach(a=>[-.18,.18].forEach(c=>box(g,.05,.5,.05,EISEN,a,0,.55+c))); box(g,.46,.08,.46,EISEN,0,-.27,.55);
  schein(g,'rgba(255,200,110,.55)',0,0,.7,1.7);
}
/* Girlande aus Zapfen und kleinen Lichtern */
function girlande(par,x1,x2,y,z){
  const n=Math.round((x2-x1)/.5), licht=basis(0xffe080); let alt=null;
  for(let i=0;i<=n;i++){ const u=i/n, x=x1+(x2-x1)*u, h=y-Math.sin(u*Math.PI)*.35, p=[x,h,z]; if(alt) strich(par,alt,p,.025,LAUB3); alt=p;
    if(i%2) { ball(par,.085,HOLZ2,x,h-.2,z,1,1.6,1); strich(par,p,[x,h-.1,z],.012,LAUB3); } else ball(par,.065,licht,x,h-.08,z+.04); }
}
/* Brett mit Marmeladengläsern und Bechern */
function vorratsbrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,2.6,.12,.5,HELLHOLZ,0,0,.27); [-1.05,1.05].forEach(a=>strich(g,[a,-.55,.06],[a,-.05,.42],.05,HOLZ3));
  [[-.95,0xb02848],[-.4,ORANGE],[.15,0x6a2a6a]].forEach(([a,f])=>{ walze(g,.2,.42,f,a,.27,.27); walze(g,.22,.09,CREME,a,.52,.27); box(g,.2,.14,.02,CREME,a,.25,.47); });
  [[.72,BLAU],[1.08,TUERGRUEN2]].forEach(([a,f])=>{ walze(g,.13,.27,f,a,.2,.3); ring(g,.08,.025,f,a+.15,.2,.3); });
}
/* Haken mit Jacke und Wanderhut */
function garderobe(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,3.0,.28,.1,HOLZ3,0,0,.06); [-1.1,0,1.1].forEach(a=>{ flach(walze(g,.06,.34,HELLHOLZ,a,0,.22)); ball(g,.09,GOLD,a,0,.4); });
  [[-1.1,ROT],[1.1,BLAU]].forEach(([a,f])=>{ rohr(g,.2,.5,1.5,f,a,-.82,.32,12).scale.z=.45; [-1,1].forEach(s=>strich(g,[a+s*.24,-.3,.34],[a+s*.52,-1.25,.36],.1,f)); [-.5,-.85,-1.2].forEach(h=>ball(g,.045,GOLD,a,h,.55)); });
  walze(g,.5,.07,0x6a8a3a,0,-.04,.42).rotation.x=1.25; ball(g,.28,0x6a8a3a,0,-.05,.5,1,1,.75); flach(ring(g,.27,.045,ORANGE,0,-.06,.52)).rotation.x=-.3;
}
/* geschnitzte Vögel auf einem Brett */
function schnitzbrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,2.4,.12,.45,HOLZ3,0,0,.24); [-.95,.95].forEach(a=>strich(g,[a,-.5,.06],[a,-.05,.38],.05,HOLZ2));
  [[-.75,ROT],[0,GELB],[.75,BLAU]].forEach(([a,f])=>{ ball(g,.17,f,a,.23,.26,1.3,1,.9); ball(g,.11,f,a+.17,.43,.26); kegel(g,.035,.11,ORANGE,a+.31,.42,.26).rotation.z=-Math.PI/2; ball(g,.022,SCHWARZ,a+.22,.46,.355); box(g,.22,.04,.1,f,a-.28,.28,.26).rotation.z=-.5; });
}

/* ---------- Deko am Boden (nichts davon ist ein Gegenstand) ---------- */
function bett(par,x,z){
  const g=gruppe(par,x,0,z);
  [-1,1].forEach(s=>[-2.05,2.05].forEach(c=>{ walze(g,.13,c<0?1.9:1.2,HOLZ2,s*1.1,c<0?.95:.6,c); ball(g,.17,GOLD,s*1.1,c<0?1.96:1.26,c); }));
  box(g,2.3,.34,4.1,HOLZ,0,.55,0); box(g,2.14,.32,3.96,CREME,0,.84,0);
  box(g,2.2,1.0,.14,HOLZ,0,1.25,-2.05); box(g,2.2,.55,.14,HOLZ,0,.8,2.05);
  ball(g,.55,WEISS,0,1.14,-1.45,1.5,.4,.8);
  box(g,2.22,.22,2.7,ROT,0,1.07,.55);
  [-.5,.2,.9,1.6].forEach((c,i)=>box(g,2.24,.235,.18,i%2?GELB:CREME,0,1.07,c)); [-.55,.55].forEach(a=>box(g,.15,.24,2.72,CREME,a,1.07,.55));
}
function schrank(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  box(g,3.0,1.5,1.0,0x3a7088,0,.8,0); box(g,3.14,.12,1.12,HELLHOLZ,0,1.6,0); box(g,3.1,.12,1.05,HOLZ3,0,.08,0);
  [-.73,.73].forEach(a=>{ box(g,1.28,1.16,.06,0x4c8aa4,a,.78,.52); ball(g,.08,GOLD,a-Math.sign(a)*.45,.82,.58); ball(g,.15,CREME,a,.8,.55,1,1,.2); });
  box(g,3.0,2.2,.12,0x3a7088,0,2.75,-.42); [-1.44,1.44].forEach(a=>box(g,.14,2.2,.55,0x3a7088,a,2.75,-.22));
  [2.45,3.2,3.88].forEach(y=>box(g,3.14,.1,.62,HELLHOLZ,0,y,-.19));
  [-.9,-.15,.6].forEach((a,i)=>{ flach(walze(g,.33,.06,CREME,a,2.84,-.3)); flach(ring(g,.25,.025,i%2?ROT:BLAU,a,2.84,-.26)).rotation.x=0; });
  [-1.0,-.5,0,.5,1.0].forEach((a,i)=>{ walze(g,.14,.3,[ROT,CREME,GELB,CREME,BLAU][i],a,3.41,-.15); });
  [[-.85,ORANGE],[.1,CREME]].forEach(([a,f])=>{ rohr(g,.22,.3,.38,f,a,1.86,0); walze(g,.24,.06,HOLZ2,a,2.08,0); });
  ball(g,.34,0xc88a40,.85,1.84,.05,1.4,.65,.9); [-.2,0,.2].forEach(a=>box(g,.06,.04,.42,0xe8bc78,.85+a,2.05,.05));
}
function truhe(par,x,z,dreh,farbe){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,2.4,.85,1.15,farbe,0,.48,0); quer(walze(g,.56,2.4,farbe,0,.9,0)).scale.x=.6;
  [-.85,.85].forEach(a=>{ box(g,.18,.9,1.2,EISEN,a,.48,0); quer(walze(g,.585,.18,EISEN,a,.9,0)).scale.x=.62; });
  box(g,.34,.36,.08,GOLD,0,.85,.59); [-.35,.35].forEach(a=>{ ball(g,.13,CREME,a,.45,.58,1,1,.2); ball(g,.055,ROT,a,.45,.61,1,1,.4); });
}
function fass(par,x,z){
  const g=gruppe(par,x,0,z);
  rohr(g,.62,.52,.7,HOLZ,0,.35,0); rohr(g,.52,.62,.7,HOLZ,0,1.05,0); walze(g,.47,.06,0x4a9ac0,0,1.41,0);
  [.14,.55,.85,1.28].forEach(y=>flach(ring(g,y>.4&&y<1?.61:.55,.04,EISEN,0,y,0)));
}
/* Bäumchen im Holzkübel */
function topftanne(par,x,z,h){
  const g=gruppe(par,x,0,z);
  rohr(g,.55,.42,.7,0xb05a30,0,.35,0); flach(ring(g,.55,.06,0x8a3a1c,0,.7,0)); walze(g,.5,.05,0x4a2c14,0,.68,0);
  walze(g,.09,.5,HOLZ2,0,.9,0); [[.62,.9,1.35],[.48,.8,1.85],[.32,.7,2.32]].forEach(([r,hh,y],i)=>kegel(g,r*h,hh,i%2?WA.TANNE2:WA.TANNE,0,y,0));
}
function blumentopf(par,x,z){
  const g=gruppe(par,x,0,z);
  rohr(g,.42,.28,.55,0xc8683a,0,.28,0); flach(ring(g,.42,.05,0xa04a24,0,.55,0));
  [[-.22,.95,0,ROT],[.18,1.1,-.1,GELB],[.08,.88,.24,0xf07a9a],[-.05,1.2,-.18,WEISS]].forEach(([a,y,c,f])=>{ strich(g,[0,.5,0],[a,y,c],.028,LAUB3); for(let i=0;i<5;i++) ball(g,.09,f,a+Math.cos(i*1.257)*.12,y,c+Math.sin(i*1.257)*.12,1,.5,1); ball(g,.07,ORANGE,a,y+.04,c); ball(g,.15,LAUB,a*.6,.66,c*.6,1.2,.4,.8); });
}
function bank(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-.3,0,.3].forEach((c,i)=>box(g,3.2,.12,.28,i%2?HOLZ:HELLHOLZ,0,.7,c));
  [-1.35,1.35].forEach(a=>box(g,.18,.66,.85,HOLZ2,a,.33,0)); box(g,2.6,.1,.12,HOLZ3,0,.28,0);
  ball(g,.4,0x3a8c56,.85,.84,0,1,.34,1);
}
/* ovaler Flickenteppich */
function teppich(par,x,z,rx,rz,farben){
  const g=gruppe(par,x,0,z);
  farben.forEach((f,i)=>{ const u=1-i*.17, m=hell(walze(g,1,.012,f,0,.008+i*.006,0)); m.scale.set(rx*u,.012,rz*u); });
}
/* Eckpfosten: Stammenden übereinander */
function ecke(par,x,z){
  const g=gruppe(par,x,0,z);
  for(let i=0;i<8;i++){ const y=.4+i*.8; if(i%2){ quer(walze(g,.34,.75,HOLZ,0,y,0)); quer(walze(g,.24,.77,HELLHOLZ,0,y,0)); } else { flach(walze(g,.34,.75,HOLZ,0,y,0)); flach(walze(g,.24,.77,HELLHOLZ,0,y,0)); flach(walze(g,.09,.79,HOLZ,0,y,0)); } }
}

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  const h=WA.huelle(k,{ B,T,H, himmelLicht:0xffe6c4, grund:0x4a3220, staerke:.72, sonne:0xffc890, sonneStaerke:.34,
    wandBild:bohlenBild(), bodenBild:WA.dielenBild([150,100,60],'#33190a'), leiste:HOLZ3, sockel:0, oeffnung:{x:AX,b:2.8,h:4.4} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueTuer(k,sc,hinten);

  /* ---------- Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  fenster(dh,-15.2,110); fenster(dh,-2.4,270); fenster(dh,14.4,120);
  girlande(dh,-17.5,-8.2,5.9,HINTEN+.2); girlande(dh,-3.8,5.2,5.95,HINTEN+.2); girlande(dh,5.2,17.5,5.9,HINTEN+.2);
  laterne(dh,-8.6,3.4,HINTEN); laterne(dh,12.35,3.5,HINTEN);
  vorratsbrett(dh,5.5,4.0,HINTEN,0);
  [-17.75,17.75].forEach(x=>ecke(dh,x,HINTEN+.2));
  box(dh,B,.3,.28,HOLZ3,0,6.2,HINTEN+.14);
  /* ---------- links ---------- */
  const dl=gruppe(links,0,0,0), LX=-B/2, LD=Math.PI/2;
  garderobe(dl,LX,3.7,4.4,LD); schnitzbrett(dl,LX,3.4,-8.2,LD); vorratsbrett(dl,LX,3.9,10.0,LD);
  laterne(dl,LX,3.6,-4.2,LD); laterne(dl,LX,3.6,7.6,LD);
  girlande(gruppeDreh(dl,LX+.2,LD),-12.5,12.5,5.9,0);
  box(dl,.28,.3,T,HOLZ3,LX+.14,6.2,0);
  /* ---------- rechts ---------- */
  const dr=gruppe(rechts,0,0,0), RX=B/2, RD=-Math.PI/2;
  schnitzbrett(dr,RX,3.8,5.2,RD); garderobe(dr,RX,3.7,-7.0,RD); vorratsbrett(dr,RX,3.6,10.4,RD);
  laterne(dr,RX,3.6,-10.4,RD); laterne(dr,RX,3.6,1.6,RD); laterne(dr,RX,3.6,8.0,RD);
  girlande(gruppeDreh(dr,RX-.2,RD),-12.5,12.5,5.9,0);
  box(dr,.28,.3,T,HOLZ3,RX-.14,6.2,0);
  [dh,dl,dr].forEach(g=>{ verschmelze(g); ohneSchatten(g); });

  /* ---------- Möbel und Deko am Boden ---------- */
  const v=gruppe(sc,0,0,0);
  topftanne(v,-15.1,-12.45,1.05); k.kreis(-15.1,-12.45,.7);
  truhe(v,15.0,-12.5,0,0x3a7a5a); k.kasten(15.0,-12.5,2.55,1.35);
  fass(v,-3.0,-12.7); k.kreis(-3.0,-12.7,.66);
  /* links */
  bett(v,-16.6,-8.0); k.kasten(-16.6,-8.0,2.65,4.55);
  schrank(v,-17.15,-.8,LD); k.kasten(-17.15,-.8,1.35,3.25);
  truhe(v,-17.1,4.4,LD,0x9a3a2a); k.kasten(-17.1,4.4,1.35,2.55);
  fass(v,-17.05,7.4); k.kreis(-17.05,7.4,.66);
  topftanne(v,-16.8,11.4,1.15); k.kreis(-16.8,11.4,.75);
  /* rechts */
  fass(v,17.05,-10.4); k.kreis(17.05,-10.4,.66);
  truhe(v,17.1,-7.0,RD,0x35608a); k.kasten(17.1,-7.0,1.35,2.55);
  schrank(v,17.15,-1.2,RD); k.kasten(17.15,-1.2,1.35,3.25);
  bank(v,17.0,4.6,RD); k.kasten(17.0,4.6,1.1,3.35);
  blumentopf(v,17.0,8.2); k.kreis(17.0,8.2,.55);
  topftanne(v,16.8,11.4,1.15); k.kreis(16.8,11.4,.75);
  /* vorn (niedrig) */
  bank(v,-12.0,12.35,0); k.kasten(-12.0,12.35,3.35,1.1);
  truhe(v,-6.4,12.3,.06,0x35608a); k.kasten(-6.4,12.3,2.6,1.4);
  blumentopf(v,-2.6,12.4); k.kreis(-2.6,12.4,.5);
  fass(v,2.4,12.25); k.kreis(2.4,12.25,.66);
  bank(v,7.2,12.35,0); k.kasten(7.2,12.35,3.35,1.1);
  truhe(v,12.6,12.3,-.08,0x9a3a2a); k.kasten(12.6,12.3,2.6,1.4);
  blumentopf(v,-13.6,6.2); k.kreis(-13.6,6.2,.55);
  blumentopf(v,13.6,6.4); k.kreis(13.6,6.4,.55);
  topftanne(v,13.4,-6.4,1.0); k.kreis(13.4,-6.4,.7);
  verschmelze(v);

  /* Teppiche (flach, nicht fest) */
  const tp=gruppe(sc,0,0,0);
  teppich(tp,0,1.0,5.2,3.2,[0xa83a2e,0xe8b050,0x8a2a24,0x3a7a5a,0xc8603a]);
  teppich(tp,1.4,-8.9,2.6,1.4,[0x56606c,0xb8a888,0x606a74,0x7e8480]);
  teppich(tp,-11.4,6.6,2.8,2.0,[0x3a7a5a,0xe8d0a0,0x9a3a2a,0xe8b050]);
  teppich(tp,10.4,7.0,2.8,2.0,[0x6a4a8a,0xe8d0a0,0x35608a,0xc8603a]);
  verschmelze(tp); ohneSchatten(tp);

  /* ---------- Licht: Ofen, vier Laternen (mit der Türlampe sechs Punktlichter) ---------- */
  flacker(k,1.4,1.7,-9.8,0xff8a30,.9,13);
  flacker(k,-9.0,4.0,-11.6,0xffc468,.35,12); flacker(k,11.8,4.0,-11.4,0xffc468,.4,13);
  flacker(k,-14.8,3.8,3.0,0xffca78,.35,14); flacker(k,14.8,3.8,3.0,0xffca78,.35,14);

  /* ---------- Tiere ---------- */
  katze(k,[[-7.8,-1.2],[-2.2,-1.7],[1.4,-2.9],[2.1,.8],[1.4,5.8],[-1.6,7.6],[-8.0,6.2],[-8.4,2.0]],1.3);
  maeuschen(k,[[8.4,-8.4],[12.0,-9.4],[11.2,-7.0],[8.8,-6.4]],1.5,0);

  return { tuer, start:[0,-.6] };
}
/* Gruppe an einer Seitenwand: x der Gruppe wird zur Wandfläche, ihre x-Achse läuft entlang der Wand */
function gruppeDreh(par,x,dreh){ const g=gruppe(par,x,0,0); g.rotation.y=dreh; return g; }

/* Verstecke für die Edelsteine */
const verstecke=[[-14.2,-10.4],[-9.0,-9.2],[-2.6,-9.6],[4.0,-7.4],[8.4,-9.0],[14.2,-9.6],[-13.8,-5.2],[-7.2,-6.2],[0,-6.0],[8.2,-4.8],
  [14.2,-3.6],[-14.4,2.0],[-8.2,3.8],[1.6,3.2],[9.0,2.4],[14.2,2.2],[-14.2,9.4],[-4.6,8.8],[2.8,9.4],[13.8,9.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:1.4, z:-11.7, steh:[1.4,-9.35], kasten:[3.1,2.2], treffer:[2.9,3.4,2.0], baue(g,k){ /* 1 Kaminofen */
      box(g,3.0,.12,2.1,STEIN2,0,.06,0); [-1,0,1].forEach(a=>[-.5,.5].forEach(c=>box(g,.92,.04,.92,STEIN,a*.97,.13,c)));
      [-.82,.82].forEach(a=>[-.45,.5].forEach(c=>{ strich(g,[a*1.1,.1,c*1.15],[a,.55,c],.11,EISENOFEN); ball(g,.13,EISENOFEN,a*1.1,.18,c*1.15); }));
      box(g,2.1,1.9,1.3,EISENOFEN,0,1.45,0); box(g,2.36,.16,1.54,0x22222a,0,.54,0); box(g,2.4,.18,1.58,0x22222a,0,2.46,0);
      /* Feuertür mit Glut */
      box(g,1.62,1.34,.08,0x585862,0,1.42,.68); box(g,1.36,1.08,.04,basis(0x4a1804),0,1.42,.72);
      hell(box(g,1.3,.2,.05,basis(0xd8481c),0,.99,.75));
      [-.32,.28].forEach((a,i)=>quer(walze(g,.11,.85,HOLZ3,a,1.1,.8+i*.05)).rotation.z=Math.PI/2+(i?-.2:.2));
      const flammen=[[-.4,.55,0xff7a18],[0,.82,0xff9a20],[.4,.6,0xff6a10],[-.18,.46,0xffe060],[.2,.5,0xffd040]].map(([a,hh,f],i)=>{ const q=gruppe(g,a,1.1,i>2?.9:.82); q.userData.lebendig=true; const m=hell(kegel(q,i>2?.12:.19,hh,basis(f),0,hh/2,0)); m.scale.z=.07; return q; });
      k.anim.push(t=>flammen.forEach((q,i)=>{ q.scale.y=.82+Math.sin(t*(9+i*1.7)+i*2)*.2+Math.sin(t*17+i)*.07; q.rotation.z=Math.sin(t*(5+i)+i*1.3)*.13; }));
      [-.45,0,.45].forEach(a=>box(g,.045,1.1,.04,0x22222a,a*1.1,1.42,.96));
      box(g,1.4,.07,.07,0x585862,0,1.97,.95); box(g,1.4,.07,.07,0x585862,0,.87,.95);
      [-.72,.72].forEach(a=>box(g,.08,1.18,.3,0x585862,a,1.42,.82));
      quer(walze(g,.05,.4,GOLD,.82,1.45,1.0)).rotation.z=0; ball(g,.08,GOLD,.82,1.67,1.0);
      quer(walze(g,.05,2.3,METALL,0,2.22,.88)); [-1.05,1.05].forEach(a=>strich(g,[a,2.22,.65],[a,2.22,.88],.035,METALL));
      /* Ofenrohr */
      walze(g,.3,2.5,EISENOFEN,-.45,3.8,-.25); [2.65,3.9,5.0].forEach(y=>flach(ring(g,.31,.05,METALL2,-.45,y,-.25))); ball(g,.34,EISENOFEN,-.45,5.08,-.25); strich(g,[-.45,5.1,-.25],[-.45,5.15,-1.8],.3,EISENOFEN);
      schein(g,'rgba(255,140,40,.45)',0,1.4,1.15,2.4); } },
  { x:4.7, z:-3.7, dreh:-.14, steh:[4.35,-1.45], kasten:[3.0,2.2], treffer:[2.7,2.2,1.8], baue(g,k){ /* 2 Förster-Tagebuch auf dem Tisch */
      [-1.1,1.1].forEach(a=>[-.65,.65].forEach(c=>{ walze(g,.12,1.15,HOLZ2,a,.58,c); ball(g,.15,HOLZ3,a,.1,c,1,.7,1); }));
      box(g,2.8,.16,1.85,HOLZ,0,1.23,0); box(g,2.4,.2,1.45,HOLZ2,0,1.07,0);
      /* großes aufgeschlagenes Buch, leicht zum Betrachter geneigt */
      const b=gruppe(g,-.25,1.52,.12); b.rotation.x=.3;
      box(b,1.9,.1,1.34,0x7a2a1c,0,-.04,0); [-.45,.45].forEach(a=>box(b,.86,.09,1.22,CREME,a,.04,0));
      const s=new THREE.Mesh(new THREE.PlaneGeometry(1.74,1.18),new THREE.MeshLambertMaterial({map:buchBild()})); s.rotation.x=-Math.PI/2; s.position.y=.092; b.add(s);
      box(b,.1,.025,1.05,ROT,.03,.105,.3); box(b,.1,.34,.025,ROT,.03,-.05,.69);
      box(g,1.5,.2,.2,HOLZ3,-.25,1.38,-.2);
      /* Kerze, Bleistift, Lupe */
      walze(g,.2,.08,GOLD,1.05,1.35,-.45); walze(g,.09,.5,CREME,1.05,1.62,-.45); const fl=gruppe(g,1.05,1.98,-.45); fl.userData.lebendig=true; hell(ball(fl,.08,basis(0xffc840),0,0,0,1,1.8,1)); schein(fl,'rgba(255,200,90,.6)',0,0,0,.8);
      k.anim.push(t=>{ fl.scale.y=1+Math.sin(t*13)*.12+Math.sin(t*7.3)*.08; });
      quer(walze(g,.04,.8,GELB,.95,1.35,.62)).rotation.y=.5;
      flach(ring(g,.22,.045,GOLD,1.0,1.36,.12)); strich(g,[1.15,1.36,.27],[1.36,1.36,.47],.055,HOLZ3); } },
  { x:6.3, z:-12.35, steh:[6.2,-10.2], kasten:[3.3,1.5], treffer:[3.1,2.6,1.4], baue(g,k){ /* 3 Holzstapel */
      [-1.5,1.5].forEach(a=>{ box(g,.18,2.1,.2,HOLZ3,a,1.05,.35); box(g,.3,.14,1.3,HOLZ3,a,.07,0); ball(g,.14,GOLD,a,2.16,.35); });
      let n=0; [[5,.34],[4,.84],[3,1.34],[2,1.84]].forEach(([zahl,y])=>{ for(let i=0;i<zahl;i++){ const x=(i-(zahl-1)/2)*.56, z=(n%3)*.07; n++;
        flach(walze(g,.28,1.1,n%2?WA.RINDE:WA.RINDE2,x,y,z)); flach(walze(g,.22,.04,0xe8c088,x,y,z+.56)); flach(walze(g,.13,.045,0xc89658,x,y,z+.565)); flach(walze(g,.05,.05,0xe8c088,x,y,z+.57)); } });
      /* Späne und ein Zweig davor */
      [[-.9,.8],[.3,.86],[1.0,.74]].forEach(([a,c],i)=>{ const s=box(g,.3,.05,.11,0xe8c088,a,.04,c); s.rotation.y=i*1.1; }); } },
  { x:-2.8, z:-5.0, dreh:.5, steh:[-1.75,-2.95], r:1.35, treffer:[2.3,3.1,2.2], baue(g,k){ /* 4 Schaukelstuhl */
      const w=gruppe(g,0,0,0); w.userData.lebendig=true;
      [-.75,.75].forEach(a=>{ const q=gruppe(w,a,2.5,0); q.rotation.y=Math.PI/2; const r=ring(q,2.42,.085,HOLZ3,0,0,0,1.15); r.rotation.z=-Math.PI/2-.575;
        [-.55,.6].forEach(c=>strich(w,[a,.17,c],[a,1.05,c*.9],.08,HOLZ)); strich(w,[a,1.0,-.62],[a*.95,3.0,-1.05],.095,HOLZ); ball(w,.14,GOLD,a*.95,3.06,-1.06);
        strich(w,[a,1.65,.7],[a,1.7,-.75],.09,HELLHOLZ); strich(w,[a,1.0,.5],[a,1.65,.55],.065,HOLZ); ball(w,.12,HELLHOLZ,a,1.66,.75); });
      box(w,1.65,.14,1.45,HOLZ,0,1.08,0); box(w,1.4,.2,1.2,ROT,0,1.22,.05); [-.35,.35].forEach(a=>box(w,.09,.21,1.22,CREME,a,1.222,.05));
      [-.48,-.16,.16,.48].forEach(a=>strich(w,[a,1.15,-.66],[a*.95,2.85,-1.01],.065,HELLHOLZ));
      strich(w,[-.78,2.85,-1.02],[.78,2.85,-1.02],.13,HOLZ); strich(w,[-.72,2.1,-.87],[.72,2.1,-.87],.07,HOLZ);
      const kissen=ball(w,.5,0x3a7a5a,0,2.45,-.85,1.15,.7,.28); kissen.rotation.x=-.2; ball(w,.09,GELB,0,2.45,-.69);
      strich(w,[-.72,.45,.58],[.72,.45,.58],.06,HOLZ2);
      verschmelze(w);
      k.anim.push(t=>{ w.rotation.x=Math.sin(t*1.5)*.065; }); } },
  { x:9.15, z:HINTEN, wand:'hinten', steh:[9.5,-11.35], kasten:[4.0,.8], treffer:[3.9,3.0,.8], trefferY:1.45, baue(g,k){ /* 5 Karte vom Wald */
      box(g,3.7,2.7,.08,HOLZ3,0,2.95,.1); WA.tafel(g,kartenBild(),3.4,2.34,0,2.95,.16);
      [-1,1].forEach(s=>{ box(g,.18,2.86,.18,HELLHOLZ,s*1.83,2.95,.17); }); [1.6,4.3].forEach(y=>box(g,3.84,.18,.18,HELLHOLZ,0,y,.17));
      [-1.55,1.55].forEach(x=>[1.95,3.95].forEach(y=>ball(g,.09,ROT,x,y,.24)));
      strich(g,[-1.4,4.36,.18],[0,4.8,.14],.025,HOLZ3); strich(g,[1.4,4.36,.18],[0,4.8,.14],.025,HOLZ3); ball(g,.1,GOLD,0,4.8,.18); } },
  { x:-11.7, z:HINTEN, wand:'hinten', steh:[-11.6,-11.35], kasten:[2.4,.8], treffer:[2.3,4.0,.8], trefferY:.8, baue(g,k){ /* 6 Wanduhr */
      box(g,1.9,2.0,.34,0x9a3a2a,0,3.3,.2);
      [-1,1].forEach(s=>{ const d=box(g,1.45,.2,.55,HOLZ3,s*.57,4.62,.3); d.rotation.z=-s*.6; box(g,.12,2.0,.4,HELLHOLZ,s*.95,3.3,.22); });
      box(g,1.5,.5,.3,0x9a3a2a,0,4.4,.2); ball(g,.16,GOLD,0,5.05,.35); box(g,2.14,.16,.5,HELLHOLZ,0,2.25,.26);
      flach(walze(g,.82,.08,GOLD,0,3.35,.39)); const z=new THREE.Mesh(new THREE.CircleGeometry(.74,32),new THREE.MeshLambertMaterial({map:zifferBild()})); z.position.set(0,3.35,.44); g.add(z);
      const zeiger=(l,d,zz)=>{ const q=gruppe(g,0,3.35,zz); q.userData.lebendig=true; box(q,d,l,.025,SCHWARZ,0,l/2-.07,0); verschmelze(q); return q; };
      const std=zeiger(.45,.1,.47), min=zeiger(.66,.065,.5); ball(g,.08,GOLD,0,3.35,.53);
      const pendel=gruppe(g,0,2.2,.2); pendel.userData.lebendig=true; box(pendel,.08,.9,.05,GOLD,0,-.45,0); flach(walze(pendel,.26,.09,GOLD,0,-.95,0)); flach(walze(pendel,.14,.11,HELLHOLZ,0,-.95,0)); verschmelze(pendel);
      [[-.65,1.1],[.65,1.45]].forEach(([x,y])=>{ strich(g,[x,2.2,.3],[x,y+.25,.3],.02,METALL); ball(g,.18,0x6a3e18,x,y,.3,.85,1.6,.85); [-.12,.04,.2].forEach(a=>flach(ring(g,.145,.025,0x8e5c30,x,y+a,.3))); });
      k.anim.push(t=>{ pendel.rotation.z=Math.sin(t*3)*.32; min.rotation.z=-1.05-t*.1; std.rotation.z=1.05-t*.008; }); } },
  { x:-10.9, z:-3.9, dreh:.24, steh:[-10.35,-1.75], kasten:[3.2,1.7], treffer:[2.9,3.2,1.3], baue(g,k){ /* 7 Kräuterständer */
      [-1.35,1.35].forEach(a=>{ [-.6,.6].forEach(c=>strich(g,[a,0,c],[a,3.0,0],.085,HELLHOLZ)); strich(g,[a,.55,-.5],[a,.55,.5],.06,HOLZ); ball(g,.15,GOLD,a,3.05,0); });
      quer(walze(g,.09,3.0,HOLZ,0,2.95,0)); box(g,2.75,.1,.85,HOLZ,0,.55,0); quer(walze(g,.06,2.7,HOLZ,0,1.7,.27));
      /* Kräuterbüschel: oben schmal gebunden, Stängel sichtbar, unten breiter, flache spitze Blätter */
      const bund=(x,y,z,f,bluete)=>{ const zz=z+.04, kn=y-.28, BAST=0xd8bc80;
        strich(g,[x,y,z],[x,kn,zz],.016,BAST);
        /* gespitzte flache Form von a nach b */
        const spitz=(a,b,br,farbe)=>{ const A=V(a[0],a[1],a[2]), d=V(b[0],b[1],b[2]).sub(A), l=d.length(), m=hell(kegel(g,br,l,farbe,0,0,0)); m.scale.z=.014; m.position.copy(A).addScaledVector(d,.5); m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); };
        for(let i=0;i<7;i++){ const u=(i-3)/3, c=zz+(i%2?.07:-.03), l=.66-Math.abs(u)*.08+(i%2)*.06, ex=x+u*.27, ey=kn-l;
          strich(g,[x-u*.05,kn+.17,zz],[x+u*.03,kn,zz],.012,0x8a9a4a); strich(g,[x+u*.03,kn,zz],[ex,ey,c],.012,0x8a9a4a);
          [.5,.78].forEach(q=>{ const px=x+u*.03+(ex-x-u*.03)*q, py=kn+(ey-kn)*q, pz=zz+(c-zz)*q; [-1,1].forEach(v=>spitz([px,py,pz],[px+v*.1+u*.05,py-.2,pz+.02],.04,f)); });
          spitz([ex,ey+.04,c],[ex+u*.06,ey-.2,c],.045,bluete&&i%2===0?bluete:f); }
        flach(ring(g,.055,.024,BAST,x,kn,zz)); flach(ring(g,.055,.02,BAST,x,kn+.045,zz));
        [-1,1].forEach(v=>strich(g,[x,kn,zz+.08],[x+v*.09,kn-.17,zz+.11],.012,BAST)); };
      bund(-.95,2.92,0,0x4f9a3a); bund(-.32,2.92,0,0x7a9a58,0x9a6ad0); bund(.32,2.92,0,0x98b848,0xf0d030); bund(.95,2.92,0,0x2e7a4a);
      bund(-.62,1.66,.27,0x88a870,0xf4f0e0); bund(.64,1.66,.27,0x5aaa48,0xe87aa0);
      /* Mörser und Säckchen */
      rohr(g,.3,.2,.34,STEIN,-.7,.78,.1); strich(g,[-.72,.82,.1],[-.45,1.15,.2],.06,STEIN2); [[.3,CREME],[.85,0xc8a468]].forEach(([x,f])=>{ ball(g,.27,f,x,.83,.05,1,1,.9); kegel(g,.13,.2,f,x,1.14,.05); flach(ring(g,.1,.025,ROT,x,1.07,.05)); }); } },
  { x:-4.7, z:2.3, steh:[-4.3,4.4], r:1.2, treffer:[2.3,2.6,2.0], baue(g,k){ /* 8 Teekanne auf eigenem Tischchen */
      walze(g,.16,.95,HOLZ2,0,.55,0); [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.785; strich(g,[0,.3,0],[Math.cos(a)*.7,.05,Math.sin(a)*.7],.08,HOLZ2); });
      walze(g,1.05,.12,HELLHOLZ,0,1.05,0); walze(g,.98,.04,CREME,0,1.13,0); flach(ring(g,.82,.035,ROT,0,1.15,0)); flach(ring(g,.66,.02,ROT,0,1.15,0));
      const K=0x2a68b8, KD=0x1c4a88;
      const t=gruppe(g,-.1,1.15,-.05); t.rotation.y=.12;
      walze(t,.34,.1,KD,0,.05,0); ball(t,.55,K,0,.52,0,1.08,.9,1); flach(ring(t,.57,.04,GOLD,0,.72,0)).scale.set(.97,.97,1);
      walze(t,.3,.1,KD,0,1.0,0); ball(t,.28,K,0,1.04,0,1,.5,1); ball(t,.11,GOLD,0,1.23,0);
      strich(t,[.45,.4,0],[.82,.62,0],.12,K); strich(t,[.82,.62,0],[1.0,.98,0],.08,K); ball(t,.1,K,.82,.62,0); flach(ring(t,.08,.025,GOLD,1.0,.98,0)).rotation.y=.5;
      ring(t,.33,.08,KD,-.62,.55,0,4.4).rotation.z=.95;
      [[0,.5,.55],[-.32,.36,.44],[.32,.36,.44],[-.28,.68,.42],[.28,.68,.42]].forEach(([a,y,c])=>ball(t,.07,WEISS,a,y,c,1,1,.5));
      [[-.55,.55,GELB],[.52,.56,ROT]].forEach(([x,z,f])=>{ walze(g,.27,.03,WEISS,x,1.17,z); rohr(g,.18,.13,.26,f,x,1.31,z); walze(g,.15,.02,0xa86020,x,1.44,z); ring(g,.08,.025,f,x+Math.sign(x)*.21,1.31,z); });
      /* Dampf steigt aus Tülle und Deckel */
      const dampf=[0,1,2,3,4,5].map(i=>{ const m=basis(0xffffff,{transparent:true,opacity:.5,depthWrite:false}); return hell(ball(g,.1,m,0,2.2,0)); });
      k.anim.push(tt=>dampf.forEach((d,i)=>{ const u=(tt*.35+i/6)%1; d.position.set(.9+Math.sin(u*7+i)*.16*u+u*.15, 2.2+u*1.1, -.17+Math.cos(u*5+i)*.1*u); d.scale.setScalar(.06+u*.19); d.material.opacity=.6*(1-u); })); } },
  { x:11.0, z:-2.4, dreh:-.26, steh:[10.35,-.2], kasten:[3.1,2.2], treffer:[2.8,2.6,1.8], baue(g,k){ /* 9 Stiefel mit Rucksack */
      box(g,2.8,.07,1.9,0xb89458,0,.035,0); [-.8,.8].forEach(c=>box(g,2.82,.075,.12,TUERGRUEN,0,.037,c));
      /* Rucksack */
      const F=0xd8502a, D=0xa83418, r=gruppe(g,.4,.07,-.35);
      box(r,1.3,1.25,.72,F,0,.68,0); ball(r,.65,F,0,1.3,0,1,.65,.56); [-.66,.66].forEach(a=>{ ball(r,.3,D,a,.55,0,.75,1.35,1.1); });
      ball(r,.69,D,0,1.5,.06,1,.4,.65); [-.32,.32].forEach(a=>{ box(r,.13,.62,.06,HOLZ3,a,1.22,.45); box(r,.22,.16,.08,GOLD,a,.98,.47); });
      box(r,.86,.55,.2,D,0,.45,.43); box(r,.9,.1,.22,F,0,.72,.44); box(r,.1,.2,.05,GOLD,0,.6,.57);
      ring(r,.25,.055,HOLZ3,0,1.72,-.05,Math.PI);
      /* gerollte Decke oben */
      quer(walze(r,.24,1.55,0x3a78b8,0,1.98,-.2)); [-.8,.8].forEach(a=>{ quer(walze(r,.15,.04,CREME,a,1.98,-.2)); quer(walze(r,.07,.05,0x3a78b8,a,1.98,-.2)); }); [-.4,.4].forEach(a=>quer(walze(r,.255,.09,HOLZ3,a,1.98,-.2)));
      /* zwei Wanderstiefel */
      [[-.95,.25,.38],[-.3,.5,-.15]].forEach(([x,z,d])=>{ const s=gruppe(g,x,.07,z); s.rotation.y=d;
        box(s,.52,.14,.9,SCHWARZ,0,.08,.12); ball(s,.27,0x7a4a22,0,.28,.35,1,.75,1.35); box(s,.48,.36,.46,0x7a4a22,0,.32,-.05);
        rohr(s,.27,.25,.6,0x7a4a22,0,.7,-.1); flach(ring(s,.27,.065,0xc89458,0,1.0,-.1)); walze(s,.22,.02,SCHWARZ,0,1.01,-.1);
        [.52,.68,.84].forEach(y=>{ strich(s,[-.15,y,.15],[.15,y+.12,.15],.025,GELB); strich(s,[.15,y,.15],[-.15,y+.12,.15],.025,GELB); });
        ball(s,.09,GELB,0,1.0,.19,1.8,.5,.6); }); } },
  { x:5.4, z:3.1, dreh:-.2, steh:[4.75,5.3], kasten:[2.9,2.4], treffer:[2.6,1.7,2.1], baue(g,k){ /* 10 Igel im Karton */
      const P=0xc89458, PD=0xa87438;
      box(g,2.1,.08,1.7,PD,0,.05,0);
      [-.85,.85].forEach(c=>box(g,2.1,.62,.08,P,0,.36,c)); [-1.05,1.05].forEach(a=>box(g,.08,.62,1.7,PD,a,.36,0));
      /* aufgeklappte Laschen */
      [-1,1].forEach(s=>{ const q=gruppe(g,s*1.07,.66,0); q.rotation.z=-s*.5; box(q,.55,.06,1.66,P,s*.27,0,0); });
      const vorn=gruppe(g,0,.66,.87); vorn.rotation.x=.9; box(vorn,2.0,.06,.42,P,0,0,.21);
      const hint=gruppe(g,0,.66,-.87); hint.rotation.x=.55; box(hint,2.0,.06,.55,P,0,0,-.27);
      box(g,.3,.5,.02,CREME,-.7,.34,.9); [.22,.4].forEach(y=>box(g,.2,.045,.02,ROT,-.7,y,.915));
      box(g,1.95,.24,1.6,0xc89a38,0,.2,0);
      for(let i=0;i<70;i++){ const m=hell(box(g,.28+zufall()*.3,.025,.025,i%3?STROHF:0xf8e088,(zufall()-.5)*1.55,.33+zufall()*.1,(zufall()-.5)*1.3)); m.rotation.y=zufall()*3.14; m.rotation.z=(zufall()-.5)*.4; }
      /* Igel: runder Stachelrücken, helles Gesicht, Blick nach vorn rechts */
      const ig=gruppe(g,-.08,.4,0); ig.rotation.y=-.5; ig.userData.lebendig=true;
      const leib=gruppe(ig,0,0,0); ball(leib,.5,0x5a3a20,-.1,.3,0,1.15,.85,1);
      const farben=[0x7a5430,0x4a2e18,0xd8b888], achse=V(0,1,0);
      for(let i=0;i<150;i++){ const hy=1-(i+.5)/150*1.15, ra=Math.sqrt(Math.max(0,1-hy*hy)), w=i*2.39996, n=V(Math.cos(w)*ra,hy,Math.sin(w)*ra); if(n.x>.62&&n.y<.62) continue;
        const m=hell(kegel(leib,.045,.24,farben[i%3],-.1+n.x*.62,.3+n.y*.47,n.z*.54)); m.quaternion.setFromUnitVectors(achse,V(n.x-.38,n.y+.06,n.z).normalize()); }
      verschmelze(leib);
      const kopf=gruppe(ig,.45,.27,0);
      ball(kopf,.25,0xe8c89a,0,0,0,1.05,.95,1.1); const s=kegel(kopf,.15,.34,0xe8c89a,.3,-.04,0); s.rotation.z=-Math.PI/2; ball(kopf,.07,SCHWARZ,.48,-.035,0);
      [-1,1].forEach(v=>{ ball(kopf,.048,SCHWARZ,.19,.09,v*.15); ball(kopf,.016,WEISS,.23,.11,v*.16); ball(kopf,.085,0xb88458,-.02,.22,v*.2,.6,1,1); });
      verschmelze(kopf);
      [-.3,.3].forEach(c=>ball(ig,.09,0x8a5a34,.4,.02,c*.7,1.5,.6,.8));
      k.anim.push(t=>{ leib.scale.y=1+Math.sin(t*2.6)*.035; kopf.rotation.y=Math.sin(t*.8)*.4; kopf.rotation.z=Math.max(0,Math.sin(t*1.9))*.14+Math.sin(t*13)*.015; }); } }
];

return { titel:'Die Waldhütte', breite:36, tiefe:27, oben:['20,12,6','44,28,16','80,52,30'], baue, gegenstaende, verstecke };
})();

/* Schlussbild Wald: die Waldwiese im Abendrot vor der Waldhütte. Der Nebel zieht ab, die Spielfigur kommt auf dem
   Waldweg an, die Försterin winkt, Reh, Fuchs und Eichhörnchen kommen dazu. Die Figur jubelt, Glühwürmchen steigen
   auf, bunte Blätter und Konfetti wirbeln. Ohne Schrift. */
FINALE3D.wald = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  const HORIZONT=0xffbe88, DUNST=0xc9c2d0;
  sc.background=new THREE.Color(DUNST);
  sc.fog=new THREE.Fog(DUNST,8,34);
  WA.freiluft(k,{ himmelLicht:0xffeee4, grund:0x56683c, staerke:.72, sonne:0xffc486, sonneStaerke:.5, bodenFarbe:'#689440' });
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D(), FARBE=new THREE.Color(), F0=new THREE.Color(DUNST), F1=new THREE.Color(HORIZONT);
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const BUNT=[0xff4f6e,0xffc21a,0x2fb4ff,0x3fd07a,0xb264ec,0xff8a30];
  const BLATT=[0xe0561e,0xf0a020,0xd8341c,0xf4cc30,0x8cba48];
  const schattenFleck=(par,r,x,z,sx)=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(r,20),basis(0x000000,{transparent:true,opacity:.24,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.set(x,.03,z); m.scale.x=sx||1; par.add(m); return m; };

  /* ---------- Abendhimmel: Verlauf, tiefe Sonne, Wolken ---------- */
  const KUPPEL=116; /* kleiner als die Sichtweite der Kamera (120), Sonne und Wolken liegen darin */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#44508e'); v.addColorStop(.29,'#6e72b4'); v.addColorStop(.38,'#cc8cac'); v.addColorStop(.435,'#fa8668'); v.addColorStop(.475,'#ffa66c'); v.addColorStop(.5,'#ffbe88'); v.addColorStop(1,'#ffbe88'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(KUPPEL,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  /* Dunstschleier vor dem Himmel, löst sich mit dem Nebel auf */
  const schleierM=basis(DUNST,{side:THREE.BackSide,fog:false,transparent:true,opacity:.9,depthWrite:false});
  const schleier=new THREE.Mesh(new THREE.SphereGeometry(48,20,14),schleierM); schleier.frustumCulled=false; sc.add(schleier);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(1,32),basis(0xffe08a,{fog:false})); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,150,70,.85)',0,0,0,18); sonnenSchein.material.fog=false;
  const wolkeHell=basis(0xffd4c0,{fog:false}), wolkeRosa=basis(0xe07c90,{fog:false});
  /* [Bildplatz x, Bildplatz y, Größe] */
  const wolken=[[-.76,.84,.9],[-.2,.72,.6],[.34,.9,.7],[.9,.74,.55]].map(p=>{ const g=gruppe(sc,0,0,0);
    [[-2.4,0,1.2],[-.9,.35,1.6],[.9,.2,1.4],[2.4,-.05,1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1.3,.5,.4));
    ball(g,1,wolkeRosa,0,-.38,.15,4.1,.42,.4); verschmelze(g); ohneSchatten(g); return { g, p }; });

  /* Plätze der Figuren */
  const FX=-1.05, FZ=2.3, START=-10;
  const OX=1.4, OZ=1.5;          /* Försterin */
  const RX=-4.15, RZ=.5;         /* Reh */
  const UX=3.55, UZ=2.5;         /* Fuchs */
  const EX=-3.85, EZ=3.55, EH=.42; /* Baumstumpf für das Eichhörnchen */
  const HX=5.6, HZ=-6.8;         /* Waldhütte */

  /* ---------- Hügel, Waldweg ---------- */
  const huegel=gruppe(sc,0,0,0);
  /* [x, z, Breite, Höhe, Farbe] */
  [[-44,-56,25,6.5,0x4e6e44],[-15,-66,23,4.4,0x6a7a50],[13,-62,20,5,0x5a7648],[38,-54,21,4.4,0x6c7e4a],[62,-58,24,7,0x50704a],[-70,-44,21,5,0x607a48],[78,-42,18,5,0x607a48],[-30,-88,32,12,0x7a7284],[28,-90,36,10,0x887a88]]
    .forEach(p=>ball(huegel,1,p[4],p[0],-.4,p[1],p[2],p[3],p[2]*.4));
  ohneSchatten(huegel); verschmelze(huegel);
  const wegM=mat(0xbc9060);
  const weg=new THREE.Mesh(new THREE.PlaneGeometry(1.9,34),wegM); weg.rotation.x=-Math.PI/2; weg.position.set(FX,.012,-9); weg.receiveShadow=true; sc.add(weg);
  [-16,-11,-7,-3.5,0,2.6,5.2,8].forEach((z,i)=>{ const f=new THREE.Mesh(new THREE.CircleGeometry(1.06+(i%3)*.12,18),wegM); f.rotation.x=-Math.PI/2; f.position.set(FX,.014+i*.0006,z); f.receiveShadow=true; sc.add(f); });
  /* Seitenweg zur Hüttentür */
  const zurTuer=new THREE.Mesh(new THREE.PlaneGeometry(6.4,1.1),wegM); zurTuer.rotation.x=-Math.PI/2; zurTuer.position.set(2.2,.011,-3.6); zurTuer.rotation.z=.12; zurTuer.receiveShadow=true; sc.add(zurTuer);

  /* ---------- Waldrand: hinten dicht, seitlich Rahmen; der Weg bleibt frei ---------- */
  const wald=gruppe(sc,0,0,0);
  for(let i=0;i<46;i++){ const x=-36+i*1.6+(zufall()-.5)*1.4, z=-17-(i%3)*5-zufall()*3; if(Math.abs(x-FX)<2.2) continue;
    if(i%4===1) WA.laubbaum(wald,x,z,3.6+zufall()*2,[WA.LAUB,0xc88a2a,WA.LAUB3][i%3]); else WA.tanne(wald,x,z,3.8+zufall()*2.8); }
  /* [x, z, Höhe, Laubbaum] */
  [[-9.4,-4.2,5.2,0],[-12.8,-8,6,1],[-7,-9.6,4.8,0],[-12,6.4,4.4,0],[-15,-2.8,5.4,0],[-5.2,-13,4.6,1],[2.3,-13.4,5,0],[11.2,-5.4,5.6,0],[13.6,-9.6,6.2,1],[9.6,-11.8,5,0],[15,-1,4.8,1],[12.4,6,4.2,0],[-18,-11,6,0],[19,-12,6.4,0]]
    .forEach(p=>{ if(p[3]) WA.laubbaum(wald,p[0],p[1],p[2],0xd8782a); else WA.tanne(wald,p[0],p[1],p[2]); });
  ohneSchatten(wald); verschmelze(wald);

  /* ---------- Büsche, Farne, Pilze, Steine: außerhalb der Laufwege der Tiere ---------- */
  const klein=gruppe(sc,0,0,0);
  [[-7.2,-2.4,.55],[-5.4,-5.6,.7],[-9.8,-1.2,.5],[1.4,-9.4,.6],[10,-1.8,.6],[8.9,.5,.45],[-3.6,-9,.5],[-8.4,5,.5],[8,5.4,.55]].forEach(p=>WA.busch(klein,p[0],p[1],p[2]));
  [[-6.1,-1.4,.9],[-4.4,-3.2,.75],[7.4,-1.2,.85],[-6.4,5.2,.8],[5.8,4.5,.7],[.9,-6.4,.7]].forEach(p=>WA.farn(klein,p[0],p[1],p[2]));
  [[-4.7,4.6,.9],[-5.1,4.4,.55],[4.7,3.9,.8],[5.1,4.2,.5],[-2.9,-1.7,.7],[6.6,-.2,.9]].forEach(p=>WA.pilz(klein,p[0],0,p[1],p[2]));
  [[-5.6,-.9,.35],[4.9,.3,.3],[.5,-2.4,.22],[-3,-5.6,.4]].forEach(p=>WA.stein(klein,p[0],p[1],p[2]));
  verschmelze(klein);
  const imWeg=(x,z)=>Math.abs(x-FX)<1.25 || (x>1.8&&x<9.2&&z<-3.4&&z>-10) || (x>-1&&x<5.6&&Math.abs(z+3.6)<.9);
  WA.wiesenschmuck(sc,-20,20,-15,7,850,170,(x,z)=>!imWeg(x,z));

  /* Baumstumpf */
  const stumpf=gruppe(sc,EX,0,EZ);
  rohr(stumpf,.4,.5,EH,WA.RINDE,0,EH/2,0,14); walze(stumpf,.37,.03,WA.HELLHOLZ,0,EH+.005,0);
  [.24,.12].forEach(r=>ring(stumpf,r,.01,WA.HOLZ,0,EH+.022,0).rotation.x=Math.PI/2);
  [0,2.2,4.3].forEach(a=>ball(stumpf,.18,WA.RINDE,Math.cos(a)*.46,.05,Math.sin(a)*.46,1.4,.5,.8).rotation.y=-a);
  verschmelze(stumpf);

  /* ---------- Waldhütte ---------- */
  const huette=gruppe(sc,HX,0,HZ); huette.rotation.y=-.28;
  const hb=gruppe(huette,0,0,0), DACH=0x8a3e26, DACH2=0x6a2c1a;
  box(hb,5,2.6,3.8,WA.HOLZ,0,1.3,0);
  for(let i=0;i<8;i++){ const y=.18+i*.33, c=i%2?WA.HOLZ:WA.HOLZ2;
    [1.9,-1.9].forEach(z=>{ walze(hb,.17,5.5,c,0,y,z).rotation.z=Math.PI/2; [-2.76,2.76].forEach(x=>walze(hb,.13,.03,WA.HELLHOLZ,x,y,z).rotation.z=Math.PI/2); });
    [2.5,-2.5].forEach(x=>walze(hb,.16,4.2,c,x,y,0).rotation.x=Math.PI/2); }
  const giebel=new THREE.Shape(); giebel.moveTo(-2.75,0); giebel.lineTo(2.75,0); giebel.lineTo(2.75,.2); giebel.lineTo(0,1.95); giebel.lineTo(-2.75,.2); giebel.lineTo(-2.75,0);
  [1.98,-1.98].forEach(z=>{ const m=new THREE.Mesh(new THREE.ShapeGeometry(giebel),mat(WA.HELLHOLZ,{side:THREE.DoubleSide})); m.position.set(0,2.6,z); hb.add(m); });
  const neig=Math.atan2(1.85,2.9);
  [-1,1].forEach(v=>{ box(hb,3.65,.2,4.7,DACH,v*1.5,3.68,0).rotation.z=-v*neig;
    for(let i=1;i<5;i++){ const u=i/5; box(hb,.08,.07,4.74,DACH2,v*3*(1-u),2.78+1.9*u+.06,0).rotation.z=-v*neig; }
    strich(hb,[v*3.05,2.74,2.38],[0,4.66,2.38],.09,WA.HOLZ3); });
  box(hb,.26,.18,4.8,DACH2,0,4.66,0);
  /* offene Tür mit warmem Licht */
  box(hb,1.2,2.1,.08,0x3a2008,-.9,1.05,2.1); box(hb,.96,1.95,.04,basis(0xffc460),-.9,.99,2.15);
  [-1.56,-.24].forEach(x=>box(hb,.15,2.25,.2,WA.HELLHOLZ,x,1.12,2.14)); box(hb,1.5,.16,.22,WA.HELLHOLZ,-.9,2.22,2.14);
  const blatt=gruppe(hb,-1.52,0,2.22); blatt.rotation.y=-2.05; box(blatt,.98,1.96,.08,0x8a4a22,.5,1,0); [.45,1.55].forEach(y=>box(blatt,.9,.1,.12,WA.EISEN,.48,y,0)); ball(blatt,.06,WA.GOLD,.86,1,.08);
  box(hb,1.8,.14,.8,WA.STEIN,-.9,.07,2.5);
  /* Fenster */
  [[1.15,1.35,1]].forEach(([x,y])=>{ box(hb,1.15,.95,.1,basis(0xffd878),x,y,2.1); [-.52,.52].forEach(d=>box(hb,.14,.12+.95,.14,WA.CREME,x+d*1.15,y,2.16));
    box(hb,1.34,.12,.18,WA.CREME,x,y+.52,2.16); box(hb,1.45,.14,.34,WA.HOLZ3,x,y-.54,2.22); box(hb,.07,.95,.14,WA.CREME,x,y,2.17); box(hb,1.15,.07,.14,WA.CREME,x,y,2.17);
    [-1,1].forEach(v=>{ box(hb,.42,1,.07,0x3f7a4a,x+v*.84,y,2.14); box(hb,.34,.07,.1,0x2a5a34,x+v*.84,y+.22,2.14); box(hb,.34,.07,.1,0x2a5a34,x+v*.84,y-.22,2.14); });
    for(let i=0;i<6;i++){ ball(hb,.09,WA.LAUB2,x-.55+i*.22,y-.43,2.33); ball(hb,.055,[WA.ROT,WA.GELB,0xf07a9a][i%3],x-.55+i*.22,y-.34,2.37); } });
  /* rundes Giebelfenster mit Eichel darüber */
  walze(hb,.36,.08,basis(0xffd878),0,3.35,2.03).rotation.x=Math.PI/2; ring(hb,.38,.07,WA.HOLZ3,0,3.35,2.08); box(hb,.06,.72,.06,WA.HOLZ3,0,3.35,2.09); box(hb,.72,.06,.06,WA.HOLZ3,0,3.35,2.09);
  ball(hb,.15,0xe8b040,0,3.96,2.1,1,1.25,.6); ball(hb,.17,WA.HOLZ2,0,4.11,2.1,1,.55,.7); strich(hb,[0,4.17,2.1],[.04,4.3,2.1],.025,WA.HOLZ3);
  /* Schornstein */
  box(hb,.55,1.5,.55,WA.STEIN2,1.45,4.1,-.7); box(hb,.72,.16,.72,WA.STEIN,1.45,4.9,-.7);
  /* Holzstapel an der rechten Wand */
  for(let r=0;r<3;r++) for(let i=0;i<5-r;i++){ const x=3.02+i*.36+r*.18, y=.19+r*.31; walze(hb,.18,.7,WA.RINDE,x,y,2.5).rotation.x=Math.PI/2; walze(hb,.13,.03,WA.HELLHOLZ,x,y,2.86).rotation.x=Math.PI/2; }
  ohneSchatten(hb); verschmelze(hb);
  /* Laterne hängt an einem Haken neben der Tür */
  const lat=gruppe(huette,.05,0,2.12); strich(lat,[0,2.15,0],[0,2.15,.34],.025,WA.EISEN); strich(lat,[0,2.15,.32],[0,1.94,.32],.012,WA.EISEN); box(lat,.22,.28,.22,basis(0xffe080),0,1.78,.32); box(lat,.28,.07,.28,WA.EISEN,0,1.95,.32); box(lat,.26,.05,.26,WA.EISEN,0,1.62,.32); verschmelze(lat);
  const latSchein=schein(huette,'rgba(255,190,80,.7)',.05,1.78,2.55,1.4);
  const tuerSchein=schein(huette,'rgba(255,180,70,.45)',-.9,1.1,2.4,2.6);
  /* Vögel sitzen auf dem Dachfirst */
  const voegel=[[1.75,0x4a78b8,0xf4b860],[.7,0xc8503a,0xf4d8b0],[-.5,0x7a9a3a,0xf4e070]].map((p,i)=>WA.vogel(huette,0,4.74,p[0],-Math.PI/2+(i-1)*.5,p[1],p[2]));
  /* Rauch */
  huette.updateMatrixWorld(true);
  const kamin=huette.localToWorld(V(1.45,5.05,-.7));

  /* ---------- Försterin ---------- */
  const OGR=1.45, frau=gruppe(sc,OX,0,OZ); frau.scale.setScalar(OGR); frau.rotation.y=-.2;
  const HAUT=0xf2c49c, JACKE=0x3f7f48, JACKE2=0x2a5c34, HAAR=0x8a4a22, HOSE=0x6a5030;
  const fk=gruppe(frau,0,0,0), leib=gruppe(fk,0,0,0);
  [-1,1].forEach(v=>{ walze(leib,.11,.54,HOSE,v*.14,.38,0); walze(leib,.125,.22,0x3a2410,v*.14,.16,0); ball(leib,.13,0x3a2410,v*.14,.08,.07,1,.62,1.5); });
  rohr(leib,.24,.33,.7,JACKE,0,.95,0); walze(leib,.31,.08,0x4a2c14,0,.76,0); box(leib,.12,.1,.04,WA.GOLD,0,.76,.31);
  [1.08,.94].forEach(y=>ball(leib,.025,WA.GOLD,0,y,.3-(y-.95)*.12)); [-1,1].forEach(v=>{ box(leib,.13,.05,.05,JACKE2,v*.15,.93,.27); strich(leib,[v*.03,1.2,.24],[v*.17,1.32,.17],.04,JACKE2); });
  /* Fernglas am Band */
  [-1,1].forEach(v=>{ strich(leib,[v*.15,1.31,.19],[v*.08,1.12,.29],.012,0x2a1a10); walze(leib,.055,.16,0x38302a,v*.065,1.07,.31); walze(leib,.06,.025,0x14100c,v*.065,.99,.31); }); box(leib,.08,.05,.05,0x38302a,0,1.09,.31);
  verschmelze(leib);
  const kopf=gruppe(fk,0,1.62,0), kt=gruppe(kopf,0,0,0);
  ball(kt,.31,HAUT,0,0,0); [-1,1].forEach(v=>{ ball(kt,.04,0x20140e,v*.11,.01,.29); ball(kt,.012,0xffffff,v*.11+.012,.025,.325); ball(kt,.05,0xee9a80,v*.18,-.08,.245,1,.7,.5); ball(kt,.13,HAAR,v*.27,-.04,-.03,.7,1.3,1); });
  const mund=ring(kt,.09,.017,0x9a3a30,0,-.08,.29,Math.PI); mund.rotation.z=Math.PI; ball(kt,.035,0xe8b08c,0,-.04,.31);
  ball(kt,.31,HAAR,0,.04,-.09,1.04,1,.9);
  for(let i=0;i<4;i++) ball(kt,.11-i*.012,HAAR,-.24-i*.025,-.2-i*.13,-.1);
  walze(kt,.48,.05,JACKE2,0,.23,-.02); rohr(kt,.22,.3,.27,JACKE,0,.39,-.02); walze(kt,.295,.07,0x6a4420,0,.29,-.02);
  const feder=ball(kt,.05,0xe8782a,.28,.45,.03,.7,2.8,1); feder.rotation.z=-.35;
  verschmelze(kt);
  const arm=v=>{ const a=gruppe(fk,v*.37,1.22,0); walze(a,.08,.5,JACKE,0,-.25,0); ball(a,.085,JACKE,0,0,0); walze(a,.087,.07,JACKE2,0,-.47,0); ball(a,.09,HAUT,0,-.56,0); verschmelze(a); return a; };
  const fArmL=arm(-1), fArmR=arm(1); fArmL.rotation.z=-.2; fArmR.rotation.z=2.15;
  schattenFleck(sc,.55,OX,OZ);

  /* ---------- Reh: vier Beine, helles Hinterteil, große Ohren ---------- */
  const reh=gruppe(sc,RX,0,RZ); reh.scale.setScalar(1.05);
  const FELL=0xb0713c, FELL2=0x8a5428, HELL=0xf6ead0;
  const rr=gruppe(reh,0,0,0);
  ball(rr,.36,FELL,0,.98,0,1.75,.98,.85); ball(rr,.29,FELL,.35,1.02,0,1.1,1.1,.95); ball(rr,.24,0xd8a874,.05,.82,0,1.7,.65,.9);
  ball(rr,.27,HELL,-.5,1.03,0,.7,1.05,.98); ball(rr,.08,FELL,-.67,1.18,0,1.1,1.2,.9); ball(rr,.055,HELL,-.73,1.12,0,.8,1.3,.9);
  verschmelze(rr);
  const rbeine=[[.42,.17],[.42,-.17],[-.4,.17],[-.4,-.17]].map(p=>{ const b=gruppe(reh,p[0],.9,p[1]);
    ball(b,.13,FELL,0,-.02,0,1,1.5,.7); strich(b,[0,0,0],[.03,-.45,0],.065,FELL); strich(b,[.03,-.45,0],[0,-.84,0],.045,FELL2); ball(b,.06,0x2a1a10,.02,-.85,0,1.25,.8,1); verschmelze(b); return b; });
  const hals=gruppe(reh,.5,1.12,0), ht=gruppe(hals,0,0,0);
  strich(ht,[0,0,0],[.28,.5,0],.14,FELL); ball(ht,.15,FELL,0,0,0); ball(ht,.09,HELL,.24,.22,0,.8,1.5,.9); verschmelze(ht);
  const rkopf=gruppe(hals,.32,.58,0), rk=gruppe(rkopf,0,0,0);
  ball(rk,.21,FELL,0,0,0,1.1,1,.98); ball(rk,.13,FELL,.21,-.06,0,1.45,.85,.85); ball(rk,.09,HELL,.27,-.1,0,1.2,.7,1); ball(rk,.062,0x1c120c,.39,-.04,0,.9,.85,1.15);
  [-1,1].forEach(v=>{ ball(rk,.043,0x1c120c,.13,.055,v*.17); ball(rk,.014,0xffffff,.16,.075,v*.2);
    const ohr=gruppe(rk,-.06,.15,v*.14); ohr.rotation.x=v*.6; ball(ohr,.1,FELL,0,.17,0,.55,2,1); ball(ohr,.065,0xe8b898,.035,.17,0,.4,2.1,.9); });
  verschmelze(rk);
  const rfleck=schattenFleck(sc,.5,RX,RZ,2);

  /* ---------- Fuchs: läuft von rechts heran und setzt sich ---------- */
  const fuchsLauf=WA.fuchs(k,sc,UX,UZ,Math.PI,{ gr:.95, ruhig:true });
  const fuchsSitz=WA.fuchs(k,sc,UX,UZ,-Math.PI*.72,{ gr:1, sitzt:true, phase:1 });
  fuchsSitz.g.visible=false;
  const ufleck=schattenFleck(sc,.5,UX,UZ,1.6);

  /* ---------- Eichhörnchen: hüpft heran und springt auf den Baumstumpf ---------- */
  const nager=gruppe(sc,EX,EH+.02,EZ); nager.rotation.y=-.9;
  WA.eichhorn(k,nager,0,0,0,0,1.05,2);

  /* ---------- Spielfigur ---------- */
  const u=figur.userData, FS=1.3;
  figur.position.set(FX,0,START); figur.scale.set(FS,FS,FS); sc.add(figur);

  /* ---------- Schmetterlinge (Nachtfalter in warmen Farben) ---------- */
  WA.falter(k,-3.2,3.2,-.6,0xffd23a,0,1.2);
  WA.falter(k,3,3.4,.2,0xf07a9a,2.4,1);

  /* ---------- Nebelschwaden, die zur Seite ziehen ---------- */
  const nebelM=new THREE.SpriteMaterial({map:leuchtBild('rgba(226,220,234,.95)'),transparent:true,opacity:.75,depthWrite:false});
  const schwaden=[[-6,.9,-1],[-2.8,1.3,-5],[1.2,.8,-3],[5,1.2,-1.6],[-8,1.6,-8],[7.5,1.5,-6],[-1,2,-12],[3.5,1.8,-10],[-5,.5,3],[5.6,.5,3.6],[-11,1.4,-3],[11,1.3,-3]].map((p,i)=>{
    const s=new THREE.Sprite(nebelM); s.position.set(p[0],p[1],p[2]); sc.add(s); return { s, p, v:p[0]<0?-1:1, g:5+(i%4) }; });

  /* ---------- Rauch, Glühwürmchen, Blätter, Konfetti ---------- */
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  const NR=9, rauch=menge(GEO.sph,basis(0xe8dce0,{transparent:true,opacity:.42,depthWrite:false}),NR);
  const NG=44, kerne=menge(GEO.sph,basis(0xfcff9a,{fog:false}),NG), hoefe=menge(GEO.sph,basis(0xd8f050,{transparent:true,opacity:.26,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}),NG), gd=[];
  for(let i=0;i<NG;i++){ const v=i%2?1:-1; gd.push({ x:v*(.3+zufall()*7.5), y:.7+zufall()*3.6, z:-5+zufall()*8.6, p:zufall()*6.28, ab:2.6+zufall()*3 }); }
  /* Blätter und Konfetti seitlich dichter, damit die Gesichter frei bleiben */
  const NB=60, NK=70, blaetter=menge(GEO.sph,basis(0xffffff),NB), konfetti=menge(GEO.box,basis(0xffffff),NK);
  const wirbel=n=>{ const d=[]; for(let i=0;i<n;i++){ const v=i%2?1:-1; d.push({ x:v*(2.4+zufall()*(i%5?3.4:6.5)), y:zufall()*5.6, z:-1+zufall()*4.4, v:.4+zufall()*.5, p:zufall()*6.28, g:.8+zufall()*.5 });
      if(i%4===0){ d[i].x=(zufall()*2-1)*3.4; d[i].z=-2+zufall()*1.4; } } return d; };
  const bd=wirbel(NB), kd=wirbel(NK);
  for(let i=0;i<NB;i++) blaetter.setColorAt(i,FARBE.set(BLATT[i%5]));
  for(let i=0;i<NK;i++) konfetti.setColorAt(i,FARBE.set(BUNT[i%6]));
  blaetter.visible=konfetti.visible=kerne.visible=hoefe.visible=false;

  /* ---------- Kamera ---------- */
  const NEIG=.12, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=2.1;
  /* q: 0 schmal (bis 4:3), 1 sehr breit */
  const form=a=>weich((a-1.4)/1.4);
  /* kleinster Kameraabstand, bei dem Reh, Eichhörnchen, Figur, Försterin, Fuchs und die Hütte im Bild sind */
  const abstand=(a,tn)=>[[RX-1.05,0,RZ],[RX-.9,2.3,RZ],[EX-.55,0,EZ+.2],[FX,3.4,FZ],[0,-.1,4],[OX,3.6,OZ],[UX+.9,0,UZ],[UX+.9,1.5,UZ],[HX+.4,5.1,HZ+1.4],[HX+1.9,1.5,HZ+1.6]]
    .reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
      return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },9);

  /* Zeitplan in Sekunden: nach etwa 6 s ist alles Wichtige geschehen */
  const LOS=.7, DA=3.9, REHAB=1.4, REHDA=4.6, FUAB=2.2, FUDA=4.8, EIAB=2.8, EIDA=5, JUBEL=4.2, FEST=4.4;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), q=form(a), d=abstand(a,tn);
    const wippen=Math.sin(t*.22)*.18*weich((t-5)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);
    const c=kamera.position;
    kuppel.position.copy(c); schleier.position.copy(c);
    /* Weltpunkt zu einem Bildplatz (x,y von -1 bis 1) in der Entfernung weit */
    const ort=(bx,by,weit)=>{ const hoch=by*weit*tn; return [c.x+bx*weit*tn*a, c.y-SN*weit+CN*hoch, c.z-CN*weit-SN*hoch]; };

    /* Nebel zieht ab */
    const klar=weich((t-.3)/4.6);
    sc.fog.near=misch(d-2,34,klar); sc.fog.far=misch(d+24,124,klar);
    sc.fog.color.copy(F0).lerp(F1,klar); if(sc.background&&sc.background.copy) sc.background.copy(sc.fog.color);
    schleierM.opacity=.9*(1-klar); schleier.visible=klar<.995;
    nebelM.opacity=.75*(1-weich((t-.6)/4));
    schwaden.forEach((w,i)=>{ w.s.visible=nebelM.opacity>.01; const zieh=t*(.35+(i%3)*.15)+t*t*.22;
      w.s.position.set(w.p[0]+w.v*zieh,w.p[1]+Math.sin(t*.7+i)*.15+t*.08,w.p[2]); w.s.scale.set(w.g*1.5,w.g*.6,1); });

    /* Sonne steht tief links und sinkt ganz langsam */
    const sg=.11*60*tn, sp=ort(-Math.min(.95-.12/a,.52),misch(.52,.42,weich(t/12)),60);
    sonne.position.set(sp[0],sp[1],sp[2]); sonne.scale.setScalar(sg); sonne.lookAt(c.x,c.y,c.z);
    sonnenSchein.position.set(sp[0],sp[1],sp[2]+.5); const sw=sg*(6+Math.sin(t*1.4)*.3)*(.4+.6*klar); sonnenSchein.scale.set(sw,sw,1);
    wolken.forEach((w,i)=>{ const p=ort(w.p[0]+Math.sin(t*.07+i*2)*.05,w.p[1],55); w.g.position.set(p[0],p[1],p[2]); w.g.scale.setScalar(w.p[2]*55*tn/22); });
    huette.position.x=misch(HX,HX+.9,q);

    /* Figur kommt auf dem Weg an und jubelt */
    const lauf=Math.min(1,Math.max(0,(t-LOS)/(DA-LOS))), geht=lauf>0&&lauf<1, s=Math.sin(t*11), jubel=weich((t-JUBEL)/.5);
    figur.position.set(FX,0,misch(START,FZ,lauf));
    figur.rotation.y=Math.sin(t*1.1)*.14*jubel;
    u.beinL.rotation.x=geht?s*.65:0; u.beinR.rotation.x=geht?-s*.65:0;
    u.armR.rotation.x=geht?s*.55:0; u.armL.rotation.x=geht?-s*.55:0;
    u.armR.rotation.z=misch(.18,2.45+Math.sin(t*8)*.25,jubel);
    u.armL.rotation.z=misch(-.18,-2.45+Math.sin(t*8+1.5)*.3,jubel);
    u.koerper.position.y=geht?Math.abs(Math.cos(t*11))*.07:Math.abs(Math.sin(t*4.6))*.2*jubel;
    u.koerper.rotation.z=Math.sin(t*2.3)*.03*jubel;

    /* Försterin winkt und nickt */
    fArmR.rotation.z=2.15+Math.sin(t*6)*.3;
    fArmL.rotation.z=-.2-Math.sin(t*2)*.04;
    kopf.rotation.z=Math.sin(t*1.5)*.07; kopf.rotation.y=-.25*weich((t-2)/1)*(1-.6*weich((t-6)/1));
    fk.position.y=Math.max(0,Math.sin(t*3))*.015;

    /* Reh schreitet von links heran, dann nickt es */
    const rl=Math.min(1,Math.max(0,(t-REHAB)/(REHDA-REHAB))), rgeht=rl>0&&rl<1, da=weich((t-REHDA+.4)/.8);
    const rx=misch(RX-9,RX,1-(1-rl)*(1-rl));
    reh.position.set(rx,rgeht?Math.abs(Math.sin(t*7))*.05:0,RZ); reh.rotation.y=-.45*da; rfleck.position.set(rx,.03,RZ); rfleck.rotation.z=reh.rotation.y;
    const schritt=Math.min(1,(1-rl)*3);
    rbeine.forEach((b,j)=>{ b.rotation.z=rgeht?Math.sin(t*7+(j===0||j===3?0:Math.PI))*.4*schritt:0; });
    hals.rotation.z=Math.sin(t*1.3)*.05-da*Math.pow(Math.max(0,Math.sin((t-REHDA)*1.1)),4)*.3;
    rkopf.rotation.y=Math.sin(t*.9+1)*.22*da;

    /* Fuchs trabt von rechts heran und setzt sich */
    const ul=Math.min(1,Math.max(0,(t-FUAB)/(FUDA-FUAB))), ux=misch(UX+10,UX,ul);
    fuchsLauf.g.visible=ul<1; fuchsSitz.g.visible=ul>=1;
    fuchsLauf.g.position.set(ux,Math.abs(Math.sin(t*10))*.14,UZ); fuchsLauf.schwanz.rotation.y=Math.sin(t*7)*.2;
    ufleck.position.x=ux;

    /* Eichhörnchen hüpft von links vorn heran, der letzte Sprung geht auf den Stumpf */
    const el=Math.min(1,Math.max(0,(t-EIAB)/(EIDA-EIAB))), SPRUNG=.82, boden=Math.min(1,el/SPRUNG), hoch=Math.min(1,Math.max(0,(el-SPRUNG)/(1-SPRUNG)));
    const ex=el<SPRUNG?misch(EX-8,EX-1,boden):misch(EX-1,EX,hoch);
    const ey=el<SPRUNG?Math.abs(Math.sin(boden*Math.PI*8))*.4:misch(0,EH+.02,hoch)+Math.sin(hoch*Math.PI)*.55;
    nager.position.set(ex,ey,EZ); nager.rotation.y=-.9*weich((t-EIDA)/.5);

    /* Vögel flattern ab und zu */
    voegel.forEach((v,i)=>{ const f=t>FEST?Math.max(0,Math.sin(t*2.1+i*2)):0; v.g.position.y=4.74+f*f*.22; v.fluegel.forEach((fl,j)=>{ fl.rotation.x=(j?-1:1)*f*Math.sin(t*22+i)*.9; }); });

    /* Licht der Hütte und Rauch */
    const flack=1+Math.sin(t*9)*.05+Math.sin(t*5.3)*.04;
    latSchein.scale.set(1.4*flack,1.4*flack,1); tuerSchein.scale.set(2.6*flack,2.6*flack,1);
    for(let i=0;i<NR;i++){ const h=((t*.22+i/NR)%1), g=(.14+h*.42)*weich((1-h)/.25);
      setze(rauch,i,kamin.x+huette.position.x-HX+h*h*1.4+Math.sin(t+i*2)*.1,kamin.y+h*2.6,kamin.z,g,g*.85,g); }
    rauch.instanceMatrix.needsUpdate=true;

    /* Glühwürmchen steigen auf */
    kerne.visible=hoefe.visible=t>2.6;
    if(kerne.visible){
      gd.forEach((f,i)=>{ const auf=weich((t-f.ab)/2.4), blink=.7+.3*Math.sin(t*3+f.p), g=auf>0?blink:0;
        const x=f.x+Math.sin(t*.6+f.p)*.5, y=misch(.15,f.y,auf)+Math.sin(t*1.1+f.p*2)*.22, z=f.z+Math.cos(t*.5+f.p)*.4;
        setze(kerne,i,x,y,z,.035*g,.035*g,.035*g); setze(hoefe,i,x,y,z,.13*g,.13*g,.13*g); });
      kerne.instanceMatrix.needsUpdate=true; hoefe.instanceMatrix.needsUpdate=true; }

    /* Blätter und Konfetti, sobald alle da sind */
    blaetter.visible=konfetti.visible=t>FEST;
    if(konfetti.visible){
      const los=weich((t-FEST)/1.6);
      const falle=(menge_,daten,sx,sy,sz)=>{ daten.forEach((f,i)=>{ const hy=.1+((f.y-t*f.v)%5.6+5.6)%5.6, g=f.g*weich((t-FEST)/.5)*weich((5.7-hy)/.6)*weich(hy/.25);
          setze(menge_,i,f.x*los+Math.sin(t*1.5+f.p)*.3,misch(3.6,hy,los),f.z*los,sx*g,sy*g,sz*g,t*2.2+f.p,t*1.5+f.p*2,Math.sin(t*2+f.p)); });
        menge_.instanceMatrix.needsUpdate=true; };
      falle(blaetter,bd,.11,.065,.012); falle(konfetti,kd,.1,.14,.012); }
  };
};

