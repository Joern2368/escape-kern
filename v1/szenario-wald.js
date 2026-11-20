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