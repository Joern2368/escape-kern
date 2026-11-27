document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-pfote\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><ellipse cx=\"0\" cy=\"8\" rx=\"10\" ry=\"8\"/><circle cx=\"-12\" cy=\"-4\" r=\"4.5\"/><circle cx=\"-5\" cy=\"-12\" r=\"4.5\"/><circle cx=\"5\" cy=\"-12\" r=\"4.5\"/><circle cx=\"12\" cy=\"-4\" r=\"4.5\"/></g></symbol>\n<symbol id=\"sym-banane\" viewBox=\"-20 -20 40 40\"><path d=\"M-14 -8Q-12 14 12 12Q16 11 15 6Q-3 9 -8 -9Z\" fill=\"currentColor\"/><path d=\"M-11 -9L-13 -15\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-fisch\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"><path d=\"M-15 0Q-3 -12 9 0Q-3 12 -15 0Z\"/><path d=\"M9 0L17 -7V7Z\"/></g><circle cx=\"-8\" cy=\"-2\" r=\"2\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-giraffe\" viewBox=\"-20 -20 40 40\"><path d=\"M-9 18V-2L1 -12H6L11 -8L12 -5L7 -4L4 -6L1 -2V18Z\" fill=\"currentColor\"/><path d=\"M2 -12V-17M6 -12V-17\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-blatt\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-12 14Q-16 -10 14 -14Q14 12 -12 14Z\"/><path d=\"M-16 18L6 -4\"/></g></symbol>\n</defs>\n</svg>");
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
const FB=['#e74c3c','#f2c14e','#2e86c1','#2ecc71','#8e44ad'];
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ab8e8"/><stop offset="1" stop-color="#f8e8b0"/></linearGradient>
</defs>`;
function boden(gras){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(gras){for(let x=20;x<1600;x+=90)for(const y of[510,580,660,740])d+=`M${x+(y%7)*9} ${y}l6 -16l4 14l6 -12l2 14`;return g+L(d,'rgba(70,90,20,.6)',3);}
for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return g+L(d,'rgba(0,0,0,.18)',2);}
function gitter(y0,y1,s,f){let d='';for(let y=y0;y<y1;y+=s)d+=`M0 ${y}H1600`;for(let x=0;x<1600;x+=s)d+=`M${x} ${y0}V${y1}`;return L(d,f,2);}
function fenster(x,y,w,h,f){return`${R(x,y,w,h,'#9ad4f0',f,8)}${P(`M${x} ${y+h}Q${x+w/3} ${y+h-70} ${x+w} ${y+h-30}V${y+h}Z`,'#7fbf6a')}${C(x+w*.7,y+40,18,'#fff6c8')}${L(`M${x+w/2} ${y}V${y+h}M${x} ${y+h/2}H${x+w}`,f,5)}`;}
function lampe(x,l,f){return`${C(x,l+30,120,'url(#licht)')}${L(`M${x} 0V${l}`,'#222',3)}${P(`M${x-30} ${l+26}Q${x} ${l-12} ${x+30} ${l+26}Z`,f,'#222',2)}${E(x,l+26,12,5,'#fff3b0')}`;}
function busch(x,y,s,f){return`<g transform="translate(${x} ${y}) scale(${s})">${P('M0 0Q-90 -40 -120 -110Q-50 -90 0 0ZM0 0Q80 -60 110 -130Q30 -100 0 0ZM0 0Q-20 -110 10 -170Q30 -100 0 0ZM0 0Q-60 -10 -150 -30Q-80 -60 0 0ZM0 0Q70 -10 150 -40Q70 -60 0 0Z',f,'rgba(0,0,0,.25)',2)}</g>`;}
function wimpel(){let s=L('M0 52Q400 70 800 52T1600 52','#555',2);for(let x=0,k=0;x<1600;x+=64,k++)s+=P(`M${x+6} ${55+(k%2)*3}H${x+50}L${x+28} ${88}Z`,FB[k%5]);return s;}
const bananen=()=>`${sch(50)}${P('M-12 0L-8 -150H8L12 0Z','#7a8a3a','#4a5a1a',2)}${['M0 -150Q-70 -190 -110 -150Q-60 -150 0 -140','M0 -150Q70 -200 110 -160Q60 -150 0 -140','M0 -150Q-30 -230 -10 -250Q10 -200 0 -150','M0 -150Q40 -220 70 -230Q40 -180 0 -146'].map(d=>P(d,'#3f9a3a','#1f5a1f',2)).join('')}${U('banane',-30,-150,40,'#f2d23a')}${U('banane',-4,-140,36,'#e8c42a')}`;
const faultier=()=>`${sch(40)}${P('M-16 0L-12 -220H12L16 0Z','#7a5230','#4a3018',2)}${C(-14,-232,40,'#3f9a3a')}${C(28,-244,30,'#4fae4a')}${L('M0 -200L96 -222','#7a5230',12)}${L('M48 -210L50 -180M72 -216L70 -180','#8a6a4a',7)}${E(60,-166,22,28,'#9a7a5a')}${E(60,-158,14,11,'#e8d8b8')}${E(54,-160,4,3,'#4a3018')}${E(66,-160,4,3,'#4a3018')}${L('M56 -152Q60 -148 64 -152','#4a3018',2)}`;
const giesskanne=()=>`${sch(40)}${L('M26 -40L66 -76','#2e86c1',8)}${E(70,-80,8,5,'#1a4a6a')}${P('M-30 0L-26 -56H26L30 0Z','#2e86c1','#1a4a6a',3)}${L('M-26 -48Q-56 -48 -46 -18','#1a4a6a',6)}${E(0,-56,26,6,'#1a5a8a')}`;
const schmetterlinge=()=>`${sch(50)}${L('M-36 0V-60M36 0V-60','#6b4a24',6)}${R(-50,-150,100,90,'#6b4a24','#3a2010',3)}${R(-42,-142,84,74,'#d8f0e0')}${[[-20,-122],[14,-94],[18,-130]].map(([x,y],k)=>P(`M${x} ${y}l-12 -8v16zM${x} ${y}l12 -8v16z`,['#e67e22','#8e44ad','#2e86c1'][k])).join('')}${P('M-54 -150L0 -174L54 -150Z','#8a6a3a','#3a2010',2)}`;
const papagei=()=>`${L('M-30 -90V20M30 -90V20','#8a6a3a',3)}${L('M-36 20H36','#6b4a24',7)}${P('M0 18L-6 46L6 42Z','#2e86c1')}${P('M-6 18Q-20 -10 -4 -34Q14 -44 18 -24Q20 0 6 18Z','#e74c3c','#8a1a10',2)}${P('M-6 -8Q-24 4 -12 26Z','#2e86c1')}${P('M14 -30L26 -24L14 -20Z','#f2c14e')}${auge(6,-28)}`;
const froschglas=()=>`${R(-80,-50,160,100,'#bfe8d0','#4a5a5a',5)}${R(-78,30,156,18,'#8a6a3a')}${P('M-60 30Q-40 -30 -20 30M30 30Q50 -20 70 30','#3f9a3a')}${E(10,16,22,14,'#5cc04a','#2a7a1a',2)}${C(0,2,7,'#5cc04a')}${C(20,2,7,'#5cc04a')}${auge(0,2)}${auge(20,2)}${L('M2 18Q10 24 18 18','#2a7a1a',2)}${R(-80,-50,160,8,'#4a5a5a')}`;
const orchidee=()=>`${sch(30)}${L('M0 -40Q-4 -100 10 -130','#4a7a2a',3)}${[[8,-110],[14,-132],[-6,-88]].map(([x,y])=>`${C(x-6,y,7,'#e88ad0')}${C(x+6,y,7,'#e88ad0')}${C(x,y-6,7,'#f0a8e0')}${C(x,y+5,6,'#d06ab8')}${C(x,y,3,'#f2d23a')}`).join('')}${P('M-4 -40Q-40 -50 -34 -60Q-10 -60 -4 -40ZM4 -40Q40 -48 36 -58Q12 -60 4 -40Z','#3f8a3a')}${P('M-22 -40H22L16 0H-16Z','#e8e8e0','#8a8a80',3)}`;
const schildkroete=()=>`${sch(52)}${E(-30,-4,9,6,'#9ac05a')}${E(28,-4,9,6,'#9ac05a')}${E(56,-22,16,12,'#9ac05a','#4a6a2a',2)}${auge(60,-26)}${L('M58 -16Q64 -12 70 -16','#4a6a2a',2)}${P('M-44 -10Q-40 -60 0 -62Q40 -60 44 -10Z','#8a6a2a','#4a3a10',3)}${L('M-24 -12L-16 -40H16L24 -12M0 -62V-40M-16 -40L-34 -24M16 -40L34 -24','#4a3a10',2)}`;
const seestern=(x,y,c)=>P('M0 -12L4 -4L12 -4L5 2L8 11L0 6L-8 11L-5 2L-12 -4L-4 -4Z',c).split('/>').join(` transform="translate(${x} ${y})"/>`);
const streichelbecken=()=>`${sch(82)}${P('M-80 -50H80L70 0H-70Z','#5a6a7a','#2a3440',3)}${E(0,-50,80,14,'#3a9ad0','#2a3440',3)}${seestern(-30,-50,'#f28a3a')}${seestern(26,-48,'#e74c3c')}${E(0,-52,8,4,'#f8d0c0')}`;
const muschelkorb=()=>`${sch(46)}${[[-24,-40,'#f8d0c0'],[0,-48,'#fff0d8'],[22,-40,'#f0b8a0']].map(([x,y,c])=>`${P(`M${x-14} ${y+8}Q${x} ${y-22} ${x+14} ${y+8}Z`,c,'#a07060',2)}${L(`M${x} ${y+8}V${y-10}M${x-7} ${y+8}L${x-3} ${y-8}M${x+7} ${y+8}L${x+3} ${y-8}`,'#a07060',1.5)}`).join('')}${P('M-46 -36H46L38 0H-38Z','#c8a060','#7a5a20',3)}${L('M-44 -22H44M-42 -10H42','#7a5a20',2)}`;
const kescher=()=>`${sch(40)}${R(-36,-10,72,10,'#4a5258')}${L('M-20 -10L-10 -150M20 -10L30 -140','#c8a060',5)}${[[-10,-150],[30,-140]].map(([x,y])=>`${E(x,y-20,20,14,'rgba(200,230,240,.3)','#e8f0f0',3)}${L(`M${x-14} ${y-26}L${x+14} ${y-14}M${x-14} ${y-14}L${x+14} ${y-26}`,'#e8f0f0',1)}`).join('')}`;
const bullauge=()=>`${C(0,0,58,'#b8862a','#6b4a1c',4)}${C(0,0,46,'#1a6ab0')}${U('fisch',-34,-28,36,'#f2a03a')}${U('fisch',0,0,28,'#f2d23a')}${C(-18,26,4,'#bfe8ff')}${C(-10,16,3,'#bfe8ff')}${[...Array(8)].map((_,k)=>`<circle cx="0" cy="-52" r="3.5" fill="#6b4a1c" transform="rotate(${k*45})"/>`).join('')}`;
const fischtafel=()=>`${R(-80,-60,160,120,'#e8f4f8','#2a5a7a',5)}${R(-80,-60,160,22,'#2a5a7a')}${[[-40,-10],[30,-10],[-40,34],[30,34]].map(([x,y],k)=>`${E(x,y,20,10,FB[k])}${P(`M${x+18} ${y}l12 -8v16z`,FB[k])}${C(x-10,y-2,2,'#222')}`).join('')}`;
const koralle=()=>`${sch(50)}${L('M-20 -40V-80M-20 -64L-34 -76M-20 -70L-8 -84M20 -36V-90M20 -60L34 -74M20 -76L8 -88','#f2707a',6)}${P('M-48 0Q-50 -40 -20 -46Q10 -56 40 -36Q52 -18 48 0Z','#7a8090','#3a4050',2)}${C(36,-44,8,'#f2d23a')}${C(-36,-34,6,'#8e44ad')}`;
const kuehlschrank=()=>`${sch(56)}${R(-52,-210,104,206,'#e8eef2','#7a8a96',3)}${L('M-52 -140H52','#7a8a96',3)}${L('M38 -190V-160M38 -120V-70','#7a8a96',6)}${R(-38,-124,44,44,'#fffbe8')}${U('giraffe',-36,-122,40,'#e0a040')}${C(-30,-190,6,'#e74c3c')}${C(-10,-186,6,'#2e86c1')}`;
const waage=()=>`${sch(40)}${R(-34,-10,68,10,'#4a5258')}${R(-8,-80,16,72,'#8a969e')}${C(0,-50,18,'#fff','#4a5258',3)}${L('M0 -50L8 -60','#e74c3c',3)}${[-28,-10,8,26].map(x=>`${L(`M${x} -96l-6 -12M${x} -96l6 -12`,'#3f9a3a',3)}${R(x-5,-98,10,16,'#f28a1a')}`).join('')}${P('M-46 -88H46Q40 -74 0 -74Q-40 -74 -46 -88Z','#c9ccce','#4a5258',2)}`;
const obstkiste=()=>`${sch(54)}${[-30,-10,10,30].map((x,k)=>C(x,-58+(k%2)*-3,12,['#e74c3c','#c0392b','#2ecc71','#e74c3c'][k])).join('')}${U('banane',-34,-90,40,'#f2d23a')}${R(-54,-50,108,50,'#c8a060','#7a5a20',3)}${L('M-54 -34H54M-54 -18H54','#7a5a20',3)}`;
const futtereimer=()=>`${sch(36)}${U('fisch',-26,-92,34,'#2e86c1')}${U('fisch',-2,-88,30,'#e67e22')}${P('M-30 -64H30L24 0H-24Z','#2ecc71','#1a7a4a',3)}${L('M-26 -64Q0 -96 26 -64','#555',3)}`;
const futterplan=()=>`${R(-86,-62,172,124,'#fffbe8','#2e7d5a',5)}${R(-86,-62,172,22,'#2e7d5a')}${L('M-86 -12H86M-86 16H86M-86 40H86M-40 -40V62','#9ab0a0',2)}${U('pfote',-72,-38,24,'#6a3a10')}${U('banane',-72,-10,24,'#d6a01a')}${U('fisch',-72,16,24,'#2e86c1')}${U('blatt',-70,40,20,'#3f8a3a')}${L('M-24 -26H60M-24 2H40M-24 28H66M-24 52H30','#555',3)}`;
const dosenregal=()=>`${R(-80,-10,160,8,'#8a6a3a')}${R(-80,46,160,8,'#8a6a3a')}${[-62,-30,2,34,62].map((x,k)=>`${R(x-12,-46,24,36,FB[k],'#333',1.5)}${R(x-12,-36,24,10,'#fff')}`).join('')}${[-56,-16,24,60].map(x=>`${R(x-14,12,28,34,'#dfe8f0','#7a8a96',2)}${R(x-14,8,28,6,'#c0392b')}`).join('')}`;
const schubkarre=()=>`${sch(62)}${L('M30 -10V0M44 -40L86 -30','#555',5)}${P('M-56 -40Q-50 -76 -20 -70Q0 -92 24 -72Q50 -80 50 -40Z','#e8c45a','#a08020',2)}${L('M-40 -60l8 -10M-10 -74l4 -12M20 -66l10 -8','#a08020',2)}${P('M-62 -40H52L32 -10H-46Z','#c0392b','#6a1a10',3)}${C(-46,-16,14,'#333')}${C(-46,-16,5,'#bbb')}`;
const spuele=()=>`${sch(58)}${R(-56,-90,112,90,'#c9ccce','#6a747a',3)}${L('M0 -80V-6','#6a747a',2)}${C(-8,-46,4,'#6a747a')}${C(8,-46,4,'#6a747a')}${R(-60,-96,120,10,'#8a969e')}${L('M10 -96V-128Q10 -138 0 -138H-20V-128','#8a969e',6)}${E(-20,-112,4,7,'#8ac8e8')}`;
const zaun=(y0,f,s)=>{let d='';for(let x=12;x<1600;x+=s)d+=`M${x} ${y0}V470`;return L(d,f,5)+L(`M0 ${y0}H1600M0 ${(y0+470)/2}H1600`,f,8);};
const seeloewe=()=>`${sch(70)}${P('M-62 0Q-76 -40 -34 -58Q0 -66 16 -88Q18 -118 40 -124Q60 -122 58 -102Q52 -90 48 -78Q54 -40 42 0Z','#8a6a4a','#4a3220',3)}${P('M-62 0Q-88 -4 -96 -24Q-64 -16 -52 0Z','#7a5a3a')}${P('M14 -56Q42 -40 56 -16Q40 -22 26 -38Z','#7a5a3a')}${E(52,-110,11,8,'#8a6a4a')}${C(46,-116,2.6,'#222')}${C(60,-106,3,'#222')}${L('M58 -108L76 -112M58 -104L76 -100','#fff',1.6)}${C(56,-150,22,'#fff','#c0392b',3)}${P('M56 -172A22 22 0 0 1 78 -150H56Z','#2e86c1')}${P('M34 -150A22 22 0 0 1 56 -172V-150Z','#f2c14e')}`;
const rettungsring=()=>`${sch(40)}${L('M0 0V-176','#7a5230',8)}${L('M-30 0H30','#7a5230',9)}<circle cx="0" cy="-104" r="38" fill="none" stroke="#fff" stroke-width="22"/><circle cx="0" cy="-104" r="38" fill="none" stroke="#e74c3c" stroke-width="22" stroke-dasharray="30 30"/><circle cx="0" cy="-104" r="49" fill="none" stroke="#a0392b" stroke-width="2"/><circle cx="0" cy="-104" r="27" fill="none" stroke="#a0392b" stroke-width="2"/>`;
const elefant=()=>`${sch(116)}${R(-90,-60,36,60,'#7a8088')}${R(-36,-60,36,60,'#7a8088')}${R(36,-60,36,60,'#8a9098')}${R(84,-60,36,60,'#8a9098')}${E(0,-100,112,66,'#8a9098','#5a6068',3)}${L('M-108 -112Q-132 -92 -128 -56','#6a7078',5)}${E(106,-122,48,52,'#8a9098','#5a6068',3)}${L('M130 -104Q172 -90 158 -30Q156 -12 142 -14','#8a9098',26)}${E(72,-130,34,48,'#a4aab2','#5a6068',3)}${P('M120 -92Q144 -76 132 -64Q124 -76 112 -88Z','#fffbe8','#bbb',2)}${C(116,-136,4,'#222')}`;
const baumstamm=()=>`${sch(76)}${R(-70,-44,140,44,'#7a5230','#4a3018',3)}${E(-70,-22,12,22,'#c8a060','#4a3018',3)}${L('M-30 -34H50M-20 -10H60','#4a3018',2)}${P('M20 -44Q30 -70 50 -62Q40 -52 36 -44Z','#3f9a3a')}`;
const wassertrog=()=>`${sch(76)}${R(-70,-40,140,40,'#7a6a5a','#4a3a2a',3)}${E(0,-40,70,12,'#5dade2','#3a7aa0',3)}${E(-20,-42,24,4,'rgba(255,255,255,.5)')}${C(30,-46,3,'#fff')}${C(40,-44,2,'#fff')}`;
const pinguin=()=>`${sch(40)}${P('M-32 -70Q-52 -40 -40 -20Q-30 -40 -28 -56Z','#222')}${P('M32 -70Q52 -40 40 -20Q30 -40 28 -56Z','#222')}${E(0,-60,32,60,'#222')}${E(0,-52,22,48,'#fff')}${C(0,-124,22,'#222')}${P('M-8 -120H8L0 -104Z','#f2a03a')}${C(-8,-130,4,'#fff')}${C(8,-130,4,'#fff')}${C(-8,-130,2,'#222')}${C(8,-130,2,'#222')}${E(-14,0,14,6,'#f2a03a')}${E(14,0,14,6,'#f2a03a')}`;
const eisscholle=()=>`${sch(84)}${P('M-80 0L-60 -30L-20 -44L30 -36L74 -20L84 0Z','#dff2fb','#8ac8e8',3)}${P('M-60 -30L-20 -44L-10 -10Z','#fff')}${U('fisch',-10,-76,36,'#2e86c1')}`;
const thermometer=()=>`${R(-14,-80,28,160,'#fffbe8','#4a5258',4)}${R(-4,-60,8,100,'#e0e8f0')}${R(-4,-10,8,50,'#2e86c1')}${C(0,52,14,'#2e86c1')}${L('M-14 -50H-4M-14 -30H-4M-14 -10H-4M-14 10H-4','#4a5258',2)}`;
const schneehaufen=()=>`${sch(60)}${P('M-56 0Q-50 -50 -10 -54Q10 -70 30 -50Q58 -44 56 0Z','#fff','#a8d0e8',3)}${L('M40 -10L62 -80','#7a5230',6)}${P('M56 -80H74L70 -96H58Z','#e74c3c')}`;
const eistafel=()=>`${R(-70,-50,140,100,'#e8f4f8','#2a5a7a',5)}${R(-70,-50,140,20,'#2a5a7a')}${U('fisch',-56,-22,30,'#2e86c1')}${U('fisch',-12,6,26,'#8a969e')}${L('M-16 -14H56M20 8H58M-56 30H56','#2a5a7a',3)}`;
const giraffe=()=>`${sch(72)}${L('M70 0L60 -200M60 -200L20 -250M60 -200L110 -250','#7a5230',10)}${E(70,-262,90,22,'#6aa03a')}${E(40,-278,60,16,'#7ab84a')}${L('M-50 0V-100M-34 0V-100M0 0V-100M14 0V-100','#e0a040',8)}${L('M-64 -110L-72 -80','#e8b048',4)}${E(-18,-112,46,26,'#e8b048')}${P('M4 -126L30 -240L46 -236L26 -110Z','#e8b048')}${E(46,-246,18,11,'#e8b048')}${L('M40 -256V-268M48 -256V-268','#8a5a20',3)}${C(48,-250,3,'#222')}${[[-36,-116],[-12,-104],[6,-120],[16,-160],[24,-200],[-24,-100]].map(([x,y])=>C(x,y,6,'#a06020')).join('')}${L('M58 -242Q64 -240 62 -236','#8a5a20',2)}`;
const heuraufe=()=>`${sch(60)}${L('M-50 0V-120M50 0V-120','#7a5230',8)}${P('M-56 -130Q-40 -150 0 -140Q40 -150 56 -130L44 -60H-44Z','#e8c45a','#a08020',2)}${L('M-44 -60V-130M-22 -60V-134M0 -60V-136M22 -60V-134M44 -60V-130','#7a5230',4)}${P('M-62 -132L0 -160L62 -132Z','#8a5a30','#5a3418',2)}`;
const wasserstelle=()=>`${L('M-70 -16V-52M-62 -14V-44M-78 -14V-40','#6a8a3a',4)}${E(0,-10,80,22,'#5dade2','#3a7aa0',3)}${E(-20,-14,30,6,'rgba(255,255,255,.4)')}${E(30,-20,12,8,'#fff')}${C(40,-28,6,'#fff')}${P('M45 -29l7 2l-7 2z','#f2a03a')}${C(41,-29,1.5,'#222')}`;
const fernglas=()=>`${sch(40)}${R(-24,-10,48,10,'#4a5258')}${R(-7,-100,14,90,'#2e7d5a')}${R(-30,-130,60,32,'#2e7d5a','#1a4a34',3)}${C(-16,-114,10,'#1a2a30')}${C(16,-114,10,'#1a2a30')}${R(-30,-140,60,12,'#3a9a6a','#1a4a34',2)}`;
const wegweiser=()=>`${R(-6,-80,12,330,'#7a5230')}${P('M-80 -64H40L56 -50L40 -36H-80Z','#f2c14e','#8a5a10',2)}${P('M80 -24H-40L-56 -10L-40 4H80Z','#7fbf6a','#3f6a2a',2)}${P('M-80 16H40L56 30L40 44H-80Z','#5dade2','#2a5a7a',2)}${U('giraffe',-74,-62,24,'#8a5a10')}${U('banane',52,-22,24,'#3f6a2a')}${U('fisch',-76,18,24,'#1a4a6a')}`;
const tafel=()=>`${L('M-60 0V240M60 0V240','#7a5230',10)}${R(-90,-60,180,110,'#f6e8c0','#7a5230',6)}${P('M-96 -58L0 -92L96 -58Z','#a06a30','#5a3418',3)}${C(-56,-22,14,'#f2c14e')}${L('M-24 -28H62M-24 -10H50M-70 14H62M-70 32H40','#7a5230',3)}`;
const mk=(x,h)=>`${E(x,-h,10,26,'#c89a5a')}${E(x,-h-30,8,9,'#c89a5a')}${E(x,-h-14,6,9,'#ecd0a0')}${C(x-3,-h-32,2.4,'#222')}${C(x+3,-h-32,2.4,'#222')}${C(x,-h-27,2,'#4a3018')}`;
const erdmaennchen=()=>`${sch(56)}${mk(-22,48)}${mk(24,58)}${P('M-60 0Q-40 -40 0 -40Q40 -40 60 0Z','#d8b070','#a07a40',2)}${E(0,-24,14,7,'#4a3018')}`;
const zebra=()=>`${sch(58)}${L('M-36 -60V0M-20 -60V0M24 -60V0M38 -60V0','#f4f4f4',9)}${L('M-36 -8V0M-20 -8V0M24 -8V0M38 -8V0','#222',9)}${L('M-50 -86Q-62 -76 -58 -56','#222',3)}${E(0,-82,50,26,'#f4f4f4','#222',2)}${P('M30 -96L56 -144L76 -134L52 -84Z','#f4f4f4','#222',2)}${L('M50 -150L26 -104','#222',6)}${E(74,-138,18,11,'#f4f4f4','#222',2)}${E(88,-134,7,7,'#666')}${C(72,-142,2.5,'#222')}${L('M-30 -104q4 22 0 44M-14 -108q4 24 0 50M2 -108q4 24 0 50M18 -106q4 22 0 44M40 -108l10 12M46 -122l12 10M60 -150l4 -10M68 -148l4 -10','#222',4)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen #lvl{transform:scaleX(.14)}.tuer.offen #lvr{transform:scaleX(.14)}.tuer.offen .pl{opacity:0}.tuer.offen #wt{transform:translateY(-290px)}.tuer.offen #hl{transform:scaleX(.14)}.tuer.offen #hr{transform:scaleX(.14)}.tuer.offen .ei{transform:translateY(290px)}.tuer.offen #sb{transform:rotate(-78deg)}</style>`;
function tuerLiane(n){
const g=['#2f8a3a','#3f9a4a','#1f6a2a'];
let a='',b='';
for(let k=0;k<5;k++){const x=416+k*17,y=584-k*17;a+=L(`M${x} 190Q${x+10} 270 ${x-4} 340T${x+6} 470`,g[k%3],10);b+=L(`M${y} 190Q${y-10} 270 ${y+4} 340T${y-6} 470`,g[(k+1)%3],10);}
return`${R(410,190,180,280,'#1e3a22')}${C(500,330,110,'url(#licht)')}${P('M470 470L490 300H510L530 470Z','#c8b078')}
   ${R(384,170,26,300,'#6a4a24','#3a2810',3)}${R(590,170,26,300,'#6a4a24','#3a2810',3)}${P('M384 192Q500 120 616 192V208Q500 152 384 208Z','#6a4a24','#3a2810',3)}${E(404,182,24,12,'#2f8a3a')}${E(596,182,24,12,'#3f9a4a')}${E(500,150,26,12,'#2f8a3a')}
   <g id="lvl" class="tb" style="transform-origin:410px 330px">${a}${E(432,240,18,9,'#4aaa52')}${E(470,340,18,9,'#4aaa52')}${E(448,420,18,9,'#4aaa52')}</g>
   <g id="lvr" class="tb" style="transform-origin:590px 330px">${b}${E(568,240,18,9,'#3f9a4a')}${E(530,340,18,9,'#3f9a4a')}${E(552,420,18,9,'#3f9a4a')}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerWasser(n){
return`<defs><clipPath id="wclip"><rect x="410" y="190" width="180" height="280"/></clipPath></defs>
   <path d="M380 470V170H620V470Z" fill="#8a9aa4" stroke="#4a5a64" stroke-width="5"/>
   ${R(410,190,180,280,'#4aa8d8')}${R(410,330,180,140,'#2a78b0')}${L('M410 400Q430 392 450 400T490 400T530 400T570 400T590 400','#bfe8ff',3)}${L('M410 440Q430 432 450 440T490 440T530 440T570 440T590 440','#bfe8ff',3)}
   <g clip-path="url(#wclip)"><g id="wt" class="tb">${R(410,190,180,280,'#5a7a8a','#2a3a44',4)}${L('M410 240H590M410 300H590M410 400H590M410 440H590','#3a5260',6)}${[[424,204],[576,204],[424,456],[576,456]].map(([x,y])=>C(x,y,5,'#9ab0bc')).join('')}${sPl(n,330)}</g></g>
   ${R(370,160,260,26,'#7a8a94','#4a5a64',4)}${U('fisch',474,164,52,'#e8f4ff')}`;
}
function tuerHolz(n){
let a='',b='';
for(let k=0;k<5;k++){const f=k%2?'#a0703e':'#8a5a2c';a+=R(410+k*18,190,18,280,f,'#3a2410',2);b+=R(500+k*18,190,18,280,f,'#3a2410',2);}
return`${R(410,190,180,280,'#d8c08a')}${P('M410 400Q470 350 530 390T590 370V470H410Z','#8cc06a','',0)}${R(536,330,8,40,'#6b4a24')}${C(540,320,24,'#4f9a5a')}
   ${R(380,160,30,310,'#7a5230','#3a2410',3)}${R(590,160,30,310,'#7a5230','#3a2410',3)}${R(374,150,42,16,'#8a8a90','#4a4a52',3)}${R(584,150,42,16,'#8a8a90','#4a4a52',3)}${R(380,160,240,20,'#7a5230','#3a2410',3)}${L('M440 176Q420 130 462 120','#f4ecd8',9)}${L('M560 176Q580 130 538 120','#f4ecd8',9)}
   <g id="hl" class="tb" style="transform-origin:410px 330px">${a}${R(410,240,90,12,'#4a2a12')}${R(410,410,90,12,'#4a2a12')}</g>
   <g id="hr" class="tb" style="transform-origin:590px 330px">${b}${R(500,240,90,12,'#4a2a12')}${R(500,410,90,12,'#4a2a12')}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerEis(n){
const op='M410 470V240Q410 190 460 190H540Q590 190 590 240V470Z',fa=['#bfe8ff','#d8f4ff','#a8d8f0'];
const gr=(a,b)=>{let o='';for(let j=a;j<b;j++)for(let i=0;i<3;i++){const x=410+i*60,y=190+j*46.7;o+=R(x,y,60,46.7,fa[(i+j)%3],'#7ab8d8',2)+R(x+4,y+4,52,6,'rgba(255,255,255,.7)');}return o;};
return`<defs><clipPath id="eclip"><path d="${op}"/></clipPath></defs>
   <path d="M376 470V240Q376 160 500 160Q624 160 624 240V470Z" fill="#f4f8ff" stroke="#9ab8cc" stroke-width="5"/>${E(410,168,34,14,'#fff','#9ab8cc',2)}${E(590,168,34,14,'#fff','#9ab8cc',2)}
   <path d="${op}" fill="#12304a"/>${C(500,330,110,'url(#licht)')}${[[440,260],[540,300],[470,380],[560,430],[430,440]].map(([x,y])=>R(x,y,6,6,'#fff')).join('')}
   <g clip-path="url(#eclip)"><g class="tb ei" style="transition-delay:.7s">${gr(0,2)}</g><g class="tb ei" style="transition-delay:.35s">${gr(2,4)}${sPl(n,330)}</g><g class="tb ei">${gr(4,6)}</g></g>`;
}
function tuerSchranke(n){
let s='';for(let k=0;k<5;k++)s+=R(412+k*40,320,40,20,k%2?'#fff':'#e74c3c','#8a2a1a',2);
return`${P('M430 470L470 400H530L570 470Z','#d8c8a0','',0)}${R(604,310,22,160,'#5a6a7a','#2a3440',3)}${R(490,430,20,40,'#6b4a24','#3a2410',3)}${R(420,372,160,56,'#8a5a30','#3a2410',4)}${sPl(n,400)}
   <g id="sb" class="tb" style="transform-origin:412px 330px">${s}</g>
   ${R(380,290,50,180,'#5a6a7a','#2a3440',4)}${C(405,310,10,'#e74c3c','#2a3440',2)}${R(398,350,14,40,'#2a3440')}`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'liane';
const arten={liane:[tuerLiane,'Lianenvorhang mit Zahlenschloss'],wasser:[tuerWasser,'Schleusentor mit Zahlenschloss'],holz:[tuerHolz,'Holztor mit Zahlenschloss'],eis:[tuerEis,'Eistor mit Zahlenschloss'],schranke:[tuerSchranke,'Schranke mit Zahlenschloss']};
const a=arten[art]||arten.liane;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.zoo={
name:"Der Zoo",
symbole:["pfote","banane","fisch","giraffe","blatt"],
symbolNamen:["Pfote","Banane","Fisch","Giraffe","Blatt"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="60" cy="45" r="40" fill="#f2c14e" stroke="#8a5a10" stroke-width="3"/><use href="#sym-giraffe" x="24" y="8" width="64" height="72" color="#8a5a10"/><use href="#sym-pfote" x="70" y="44" width="30" height="30" color="#c0392b"/><use href="#sym-blatt" x="22" y="48" width="26" height="26" color="#3f8a3a"/></svg>`,
texte:{
einleitung:"Ihr seid bei einer Abendführung im Zoo. Die Tiere machen sich gerade bereit für die Nacht. Plötzlich fällt das Eingangstor hinter euch ins Schloss! Die Tierpflegerinnen und Tierpfleger haben ein Rätselspiel für euch vorbereitet: Ihr geht von Gehege zu Gehege, und jedes Tor hat ein Zahlenschloss. Untersucht die Gegenstände in den Gehegen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findet ihr den Weg zurück zum Ausgang?",
startKnopf:"Den Zoo betreten",
hinweisGeber:"Der kleine Papagei krächzt:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Der Papagei schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Tor",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber das Tor bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Der Zoo schließt!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Zoo gefunden. Die Tierpflegerinnen und Tierpfleger sind stolz auf euch – und die Giraffe winkt zum Abschied!"
},
texteDu:{
einleitung:"Du bist bei einer Abendführung im Zoo. Die Tiere machen sich gerade bereit für die Nacht. Plötzlich fällt das Eingangstor hinter dir ins Schloss! Die Tierpflegerinnen und Tierpfleger haben ein Rätselspiel für dich vorbereitet: Du gehst von Gehege zu Gehege, und jedes Tor hat ein Zahlenschloss. Untersuche die Gegenstände in den Gehegen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findest du den Weg zurück zum Ausgang?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Der Papagei schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber das Tor bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Zoo gefunden. Die Tierpflegerinnen und Tierpfleger sind stolz auf dich – und die Giraffe winkt zum Abschied!"
},
einfach:{
name:"Der Zoo",
symbolNamen:["Pfote","Banane","Fisch","Giraffe","Blatt"],
texte:{
einleitung:"Ihr seid am Abend im Zoo. Die Tiere gehen bald schlafen. Plötzlich geht das Tor hinter euch zu! Ihr geht von Gehege zu Gehege. An jedem Tor hängt ein Zahlenschloss. Löst die Aufgaben in den Gehegen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Tor",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Das Tor bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
texteDu:{
einleitung:"Du bist am Abend im Zoo. Die Tiere gehen bald schlafen. Plötzlich geht das Tor hinter dir zu! Du gehst von Gehege zu Gehege. An jedem Tor hängt ein Zahlenschloss. Löse die Aufgaben in den Gehegen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Das Tor bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Das Urwald-Gehege",intro:"Hier ist es warm und feucht. Überall wachsen große Pflanzen. Findet die Zahlen für den Lianenvorhang!",introDu:"Hier ist es warm und feucht. Überall wachsen große Pflanzen. Finde die Zahlen für den Lianenvorhang!",
objekte:[{name:"Bananen-Pflanze",fund:"Bei den Bananen hängt:"},{name:"Baum mit Faultier",fund:"Das Faultier hält etwas fest:"},{name:"Kanne mit Wasser",fund:"In der Kanne steckt:"},{name:"Kasten mit Schmetterlingen",fund:"Im Kasten liegt:"},{name:"Papagei",fund:"Der Papagei lässt etwas fallen:"}],
infoObjekte:[{name:"Glas mit Frosch",fund:"Hinter dem Glas klebt:"},{name:"Blume im Topf",fund:"Im Topf steckt:"},{name:"Schildkröte",fund:"Neben der Schildkröte liegt:"}]},
{titel:"Das Robben-Gehege",intro:"Hier ist ein großes Becken mit Wasser. Seelöwen und Robben schwimmen hier. Die Sonne scheint.",
objekte:[{name:"Seelöwe mit Ball",fund:"Auf dem Ball liegt:"},{name:"Rettungsring",fund:"Am Ring klebt:"},{name:"Korb mit Muscheln",fund:"Zwischen den Muscheln liegt:"},{name:"Netze",fund:"In einem Netz steckt:"},{name:"Rundes Fenster",fund:"Am Fenster klebt:"}],
infoObjekte:[{name:"Bild mit Fischen",fund:"Hinter dem Bild steckt:"},{name:"Becken mit Seesternen",fund:"Am Rand vom Becken liegt:"},{name:"Stein mit Korallen",fund:"Unter dem Stein liegt:"}]},
{titel:"Das Elefanten-Gehege",intro:"Hier wohnen die großen Elefanten. Es riecht nach Obst und Heu. Hier machen die Tierpflegerinnen und Tierpfleger das Futter.",
objekte:[{name:"Elefant",fund:"Der Elefant hält etwas fest:"},{name:"Kiste mit Obst",fund:"Zwischen dem Obst liegt:"},{name:"Baumstamm",fund:"Am Baumstamm klebt:"},{name:"Waage",fund:"Unter der Waage liegt:"},{name:"Plan für das Futter",fund:"Am Plan hängt:"}],
infoObjekte:[{name:"Regal mit Dosen",fund:"Hinter einer Dose steckt:"},{name:"Karre mit Heu",fund:"Im Heu liegt:"},{name:"Wasser-Trog",fund:"Neben dem Trog liegt:"}]},
{titel:"Das Pinguin-Gehege",intro:"Hier ist es kalt. Überall liegen Eis und Schnee. Die Pinguine watscheln umher.",
objekte:[{name:"Pinguin",fund:"Der Pinguin hält etwas fest:"},{name:"Eisscholle",fund:"Auf dem Eis liegt:"},{name:"Eimer mit Fischen",fund:"Am Eimer klebt:"},{name:"Thermometer",fund:"Am Thermometer klebt:"},{name:"Kühlschrank",fund:"Im Kühlschrank liegt:"}],
infoObjekte:[{name:"Tafel mit Fischen",fund:"Hinter der Tafel klebt:"},{name:"Schnee-Haufen",fund:"Im Schnee steckt:"},{name:"Spüle",fund:"Neben der Spüle liegt:"}]},
{titel:"Das Savannen-Gehege",intro:"Ihr seid draußen. Hier leben Giraffen und Zebras. Die Sonne geht unter. Öffnet das letzte Schloss!",introDu:"Du bist draußen. Hier leben Giraffen und Zebras. Die Sonne geht unter. Öffne das letzte Schloss!",
objekte:[{name:"Giraffe am Baum",fund:"Die Giraffe lässt etwas fallen:"},{name:"Futter-Platz mit Heu",fund:"Im Heu liegt:"},{name:"Kleiner See",fund:"Am Wasser liegt:"},{name:"Fernglas",fund:"Am Fernglas klebt:"},{name:"Schild mit Pfeilen",fund:"Am Schild klebt:"}],
infoObjekte:[{name:"Tafel am Weg",fund:"Hinter der Tafel klebt:"},{name:"Erdmännchen",fund:"Die Erdmännchen zeigen auf etwas:"},{name:"Zebra",fund:"Neben dem Zebra liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Urwald-Gehege",
intro:"Im Urwald-Gehege ist es warm und feucht wie im Regenwald. Riesige Blätter wachsen bis in den Himmel, ein Wasserfall plätschert. Findet die Ziffern für den Lianenvorhang!",
introDu:"Im Urwald-Gehege ist es warm und feucht wie im Regenwald. Riesige Blätter wachsen bis in den Himmel, ein Wasserfall plätschert. Finde die Ziffern für den Lianenvorhang!",
tuerX:1350,tuerArt:"liane",
hintergrund:()=>`${defs('#6a5a30','#2a2410','#f0ffd0')}${R(0,0,1600,470,'#a8d8b0')}${R(0,0,1600,200,'#7cc0a0')}${[230,700,1200,1500].map(x=>`${R(x-20,40,40,430,'#6b4a24','#3a2410',3)}${C(x,50,110,'#2f8a3a')}${C(x-70,90,80,'#3fa04a')}${C(x+70,80,85,'#2a7a34')}`).join('')}${L('M300 0Q320 120 290 240M700 0Q680 90 710 180M1100 0Q1120 100 1090 200','#3f8a3a',5)}${R(40,140,90,330,'#8ad0f0')}${L('M60 150V460M85 150V460M110 150V460','rgba(255,255,255,.6)',3)}${P('M20 150Q85 110 150 150Z','#5a6a6a')}${busch(140,470,1.1,'#2f8a3a')}${busch(760,470,1,'#3fa04a')}${busch(1580,470,1.2,'#2f8a3a')}${zaun(390,'#4a5258',30)}${boden(1)}${E(85,478,80,14,'#5dade2')}`,
objekte:[
{name:"Bananenstaude",x:250,boden:580,fuss:4,by:-260,zeichne:bananen,fund:"Zwischen den Bananen hängt:"},
{name:"Faultierbaum",x:620,boden:560,fuss:4,by:-280,zeichne:faultier,fund:"Das Faultier hält etwas fest:"},
{name:"Gießkanne",x:880,boden:720,fuss:4,by:-100,zeichne:giesskanne,fund:"In der Gießkanne steckt:"},
{name:"Schmetterlingskasten",x:1100,boden:620,fuss:4,by:-190,zeichne:schmetterlinge,fund:"Im Schmetterlingskasten liegt:"},
{name:"Papageienschaukel",x:900,y:220,wand:true,by:-110,zeichne:papagei,fund:"Der Papagei lässt etwas fallen:"}
],
infoObjekte:[{name:"Froschterrarium",x:400,y:260,wand:true,by:-70,zeichne:froschglas,fund:"Hinter dem Terrarium klebt:"},{name:"Orchideentopf",x:1530,boden:730,fuss:4,by:-155,zeichne:orchidee,fund:"Im Orchideentopf steckt:"},{name:"Landschildkröte",x:420,boden:735,fuss:4,by:-85,zeichne:schildkroete,fund:"Neben der Schildkröte liegt:"}]},
{titel:"Das Robben-Gehege",
intro:"Im Robben-Gehege glitzert ein großes Wasserbecken. Seelöwen flitzen durch das Wasser, die Sonne scheint auf die Felsen. Irgendwo hier sind die Ziffern für das Schleusentor versteckt …",
tuerX:220,tuerArt:"wasser",
hintergrund:()=>`${defs('#d0c098','#8a7a58','#e8f8ff')}${R(0,0,1600,470,'url(#himmel)')}${C(1300,130,130,'url(#licht)')}${C(1300,130,50,'#fff6c8')}${P('M0 470V210Q200 150 420 190T820 170T1240 200T1600 160V470Z','#8f8f96','#5a5a62',4)}${L('M120 260Q200 240 260 280M900 230Q980 210 1040 250M1250 300Q1320 280 1380 310','#6a6a72',4)}${R(0,300,1600,100,'#3aa0d8')}${L('M0 325q40-10 80 0'+'t80 0'.repeat(19),'rgba(255,255,255,.5)',3)}${L('M0 365q40-10 80 0'+'t80 0'.repeat(19),'rgba(255,255,255,.35)',3)}${R(0,400,1600,70,'#d0c098')}${zaun(400,'#e8eef2',34)}${boden()}`,
objekte:[
{name:"Seelöwe mit Ball",x:1000,boden:560,fuss:4,by:-215,zeichne:seeloewe,fund:"Auf dem Ball des Seelöwen liegt:"},
{name:"Rettungsring",x:820,boden:730,fuss:4,by:-185,zeichne:rettungsring,fund:"Am Rettungsring klebt:"},
{name:"Muschelkorb",x:1250,boden:720,fuss:4,by:-90,zeichne:muschelkorb,fund:"Zwischen den Muscheln liegt:"},
{name:"Kescherständer",x:1480,boden:600,fuss:4,by:-200,zeichne:kescher,fund:"In einem Kescher steckt:"},
{name:"Unterwasser-Fenster",x:480,y:230,wand:true,by:-80,zeichne:bullauge,fund:"Am Fenster klebt:"}
],
infoObjekte:[{name:"Fischtafel",x:1470,y:230,wand:true,by:-80,zeichne:fischtafel,fund:"Hinter der Fischtafel steckt:"},{name:"Seesternbecken",x:600,boden:660,fuss:4,by:-95,zeichne:streichelbecken,fund:"Am Rand des Beckens liegt:"},{name:"Korallenstein",x:380,boden:735,fuss:4,by:-110,zeichne:koralle,fund:"Unter dem Korallenstein liegt:"}]},
{titel:"Das Elefanten-Gehege",
intro:"Im Elefanten-Gehege liegt warmer Sand. Die Elefanten sind riesig und trotzdem ganz sanft. In den Futterställen riecht es nach Obst, Gemüse und frischem Heu. Das große Holztor hat ein Zahlenschloss.",
tuerX:1000,tuerArt:"holz",
hintergrund:()=>`${defs('#d8b878','#8a6a38','#fff0b0')}${R(0,0,1600,470,'#f6d79a')}${C(1050,120,150,'url(#licht)')}${C(1050,120,56,'#fff3c0')}${P('M0 380Q300 300 700 370T1600 350V470H0Z','#e0b870')}${[[900,380],[1150,365]].map(([x,y])=>`${L(`M${x} ${y}V${y-70}M${x} ${y-50}L${x-30} ${y-80}M${x} ${y-50}L${x+30} ${y-80}`,'#5a4a2a',6)}${E(x,y-86,70,14,'#7a8a3a')}`).join('')}${R(0,100,780,370,'#c89a5a','#7a5a2a',5)}${P('M-20 100L0 60H780L800 100Z','#a0522d','#5a2a14',3)}${[...Array(26)].map((_,k)=>R(k*30,104,2,366,'rgba(90,50,20,.35)')).join('')}${R(1260,140,340,330,'#c89a5a','#7a5a2a',5)}${P('M1240 140L1270 100H1600V140Z','#a0522d','#5a2a14',3)}${[...Array(11)].map((_,k)=>R(1262+k*30,144,2,326,'rgba(90,50,20,.35)')).join('')}${L('M0 400H1600M0 440H1600','#4a5258',10)}${[...Array(9)].map((_,k)=>R(k*200+20,380,16,90,'#4a5258')).join('')}${boden()}`,
objekte:[
{name:"Elefant",x:520,boden:600,fuss:4,by:-230,zeichne:elefant,fund:"Der Elefant hält etwas im Rüssel:"},
{name:"Obstkiste",x:1300,boden:700,fuss:4,by:-110,zeichne:obstkiste,fund:"Zwischen Äpfeln und Bananen liegt:"},
{name:"Baumstamm",x:1100,boden:730,fuss:4,by:-90,zeichne:baumstamm,fund:"Am Baumstamm klebt:"},
{name:"Futterwaage",x:220,boden:640,fuss:4,by:-130,zeichne:waage,fund:"Unter der Waage liegt:"},
{name:"Futterplan",x:650,y:240,wand:true,by:-85,zeichne:futterplan,fund:"Am Futterplan hängt:"}
],
infoObjekte:[{name:"Dosenregal",x:1420,y:230,wand:true,by:-70,zeichne:dosenregal,fund:"Hinter einer Dose steckt:"},{name:"Schubkarre mit Heu",x:1500,boden:730,fuss:4,by:-110,zeichne:schubkarre,fund:"Im Heu liegt:"},{name:"Wassertrog",x:800,boden:740,fuss:4,by:-60,zeichne:wassertrog,fund:"Neben dem Wassertrog liegt:"}]},
{titel:"Das Pinguin-Gehege",
intro:"Im Pinguin-Gehege ist es eisig kalt. Schnee und Eis glitzern, und die Pinguine watscheln über den Rand ihres Beckens. Neben dem Becken steht das kleine Futterhaus. Das Eistor hat ein Zahlenschloss.",
tuerX:760,tuerArt:"eis",
hintergrund:()=>`${defs('#eaf2f8','#9ab4c4','#ffffff')}${R(0,0,1600,470,'#cfe6f2')}${P('M0 300L200 120L360 260L560 80L780 280L980 140L1200 290L1400 110L1600 270V470H0Z','#e8f4fa','#a8c8dc',3)}${P('M200 120L260 190L220 200L180 170ZM560 80L630 170L580 190L530 150ZM1400 110L1460 180L1420 190Z','#fff')}${R(0,330,1600,70,'#6ab8e0')}${L('M0 355q40-10 80 0'+'t80 0'.repeat(19),'rgba(255,255,255,.5)',3)}${R(960,150,440,250,'#e8eef2','#7a8a96',5)}${P('M940 150L1000 100H1360L1420 150Z','#7a8a96')}${R(0,400,1600,70,'#e8f2f8')}${zaun(400,'#9ab0bc',30)}${boden()}`,
objekte:[
{name:"Pinguin",x:300,boden:640,fuss:4,by:-160,zeichne:pinguin,fund:"Der Pinguin hält etwas fest:"},
{name:"Eisscholle",x:560,boden:730,fuss:4,by:-110,zeichne:eisscholle,fund:"Auf der Eisscholle liegt:"},
{name:"Fischeimer",x:1100,boden:700,fuss:4,by:-110,zeichne:futtereimer,fund:"Am Fischeimer klebt:"},
{name:"Thermometer",x:1100,y:250,wand:true,by:-95,zeichne:thermometer,fund:"Am Thermometer klebt:"},
{name:"Kühlschrank",x:1380,boden:560,fuss:4,by:-240,zeichne:kuehlschrank,fund:"Im Kühlschrank liegt:"}
],
infoObjekte:[{name:"Eistafel",x:1290,y:240,wand:true,by:-75,zeichne:eistafel,fund:"Hinter der Eistafel klebt:"},{name:"Schneehaufen",x:120,boden:735,fuss:4,by:-110,zeichne:schneehaufen,fund:"Im Schnee steckt:"},{name:"Spülbecken",x:1500,boden:730,fuss:4,by:-160,zeichne:spuele,fund:"Neben dem Spülbecken liegt:"}]},
{titel:"Das Savannen-Gehege",
intro:"Draußen im Savannen-Gehege geht die Sonne unter. Giraffen knabbern an den Bäumen, Zebras grasen friedlich. Die Schranke zum Ausgang hat das letzte Schloss – öffnet es!",
introDu:"Draußen im Savannen-Gehege geht die Sonne unter. Giraffen knabbern an den Bäumen, Zebras grasen friedlich. Die Schranke zum Ausgang hat das letzte Schloss – öffne es!",
tuerX:500,tuerArt:"schranke",
hintergrund:()=>`${defs('#c8b45a','#7a6a28','#ffe0a0')}${R(0,0,1600,470,'url(#himmel)')}${C(1250,150,160,'url(#licht)')}${C(1250,150,60,'#fff0b0')}${P('M0 380Q300 300 700 370T1600 350V470H0Z','#d8c070')}${P('M0 430Q400 390 800 420T1600 410V470H0Z','#c0a850')}${[[200,380],[1000,360],[1450,370]].map(([x,y])=>`${L(`M${x} ${y}V${y-70}M${x} ${y-50}L${x-30} ${y-80}M${x} ${y-50}L${x+30} ${y-80}`,'#5a4a2a',6)}${E(x,y-86,70,14,'#7a8a3a')}`).join('')}${L('M300 120l10 6 10-6M340 100l8 5 8-5M700 90l9 5 9-5','#5a4a2a',2.5)}${[...Array(33)].map((_,k)=>R(k*50,400,10,70,'#8a5a30')).join('')}${L('M0 420H1600M0 450H1600','#8a5a30',7)}${boden(1)}`,
objekte:[
{name:"Giraffe an der Akazie",x:1000,boden:560,fuss:4,by:-300,zeichne:giraffe,fund:"Die Giraffe lässt etwas fallen:"},
{name:"Heuraufe",x:1300,boden:640,fuss:4,by:-175,zeichne:heuraufe,fund:"Im Heu der Raufe liegt:"},
{name:"Wasserstelle",x:760,boden:720,fuss:4,by:-70,zeichne:wasserstelle,fund:"Am Ufer der Wasserstelle liegt:"},
{name:"Münzfernglas",x:200,boden:620,fuss:4,by:-165,zeichne:fernglas,fund:"Am Fernglas klebt:"},
{name:"Wegweiser",x:1500,y:220,wand:true,by:-100,zeichne:wegweiser,fund:"Am Wegweiser klebt:"}
],
infoObjekte:[{name:"Tafel der Savanne",x:820,y:230,wand:true,by:-110,zeichne:tafel,fund:"Hinter der Tafel klebt:"},{name:"Erdmännchenhügel",x:1530,boden:720,fuss:4,by:-125,zeichne:erdmaennchen,fund:"Die Erdmännchen zeigen auf etwas:"},{name:"Zebra",x:360,boden:740,fuss:4,by:-170,zeichne:zebra,fund:"Neben dem Zebra liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmelA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7ad0"/><stop offset=".6" stop-color="#f08a5a"/><stop offset="1" stop-color="#ffd890"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmelA)"/><circle cx="560" cy="390" r="90" fill="#fff6c8" opacity=".4"/><circle cx="560" cy="390" r="48" fill="#fff0b0"/>
   <path d="M0 420Q200 360 420 400T1000 380V600H0Z" fill="#8cc06a"/><path d="M0 470Q300 430 600 480T1000 460V600H0Z" fill="#6aa04a"/>
   <path d="M420 600Q470 500 520 470Q560 500 600 600Z" fill="#d8c8a0"/>
   ${[[230,400],[330,420],[700,410],[820,430]].map(([x,y])=>`${R(x-6,y-60,12,60,'#6b4a24')}${C(x,y-80,40,'#3f8a4a')}${C(x-20,y-60,26,'#4f9a5a')}`).join('')}
   ${[[300,300,'#e74c3c'],[340,270,'#f2c14e'],[380,310,'#2e86c1'],[660,280,'#2ecc71']].map(([x,y,c])=>`${L(`M${x} ${y+30}Q${x+10} ${y+80} ${x} ${y+130}`,'#555',1.5)}${E(x,y,20,26,c)}`).join('')}
   ${L('M300 120l10 6 10-6M340 100l8 5 8-5M560 90l9 5 9-5','#3a2a17',2.5)}
   <path d="M420 470L470 330" stroke="#fff" stroke-width="16" fill="none"/><path d="M420 470L470 330" stroke="#e74c3c" stroke-width="16" stroke-dasharray="20 20" fill="none"/>${R(402,440,36,70,'#5a6a7a','#2a3440',3)}${[260,740].map(x=>`${L(`M${x} 470V350`,'#333',5)}${C(x,336,50,'rgba(255,226,138,.3)')}${C(x,336,16,'#ffe28a','#333',3)}`).join('')}${U('giraffe',610,300,110,'#8a5a10')}
   <path d="M0 0H1000V600H0Z M200 600V180H800V600Z" fill="#2f5a3a" fill-rule="evenodd"/><path d="M200 600V180H800V600" stroke="#8a5a30" stroke-width="18" fill="none"/><path d="M150 186L500 40L850 186Z" fill="#a0522d" stroke="#5a2a14" stroke-width="6"/>${U('pfote',470,84,60,'#f2c14e')}`
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
   ZOO in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei zoo-raum<n>.js, die sich in RAEUME3D.zoo[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, verschmelze, bild, schein, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.zoo = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen */
const NEU=[
  [['Gummistiefel','Im Gummistiefel steckt:','Stiefel aus Gummi','Im Stiefel steckt:'],['Tropenhut','Unter dem Tropenhut liegt:','Hut auf einem Pfosten','Unter dem Hut liegt:']],
  [['Sonnenschirm','Am Sonnenschirm hängt:','Schirm gegen die Sonne','Am Schirm hängt:'],['Gartenschlauch','Zwischen den Schlauchringen liegt:','Schlauch','Beim Schlauch liegt:']],
  [['Großer Reifen','Im Reifen liegt:','Reifen','Im Reifen liegt:'],['Riesenbürste','Zwischen den Borsten steckt:','Große Bürste','In der Bürste steckt:']],
  [['Schlitten','Auf dem Schlitten liegt:','Schlitten','Auf dem Schlitten liegt:'],['Schneeschaufel','An der Schneeschaufel klebt:','Schaufel für Schnee','An der Schaufel klebt:']],
  [['Geländewagen','Im Geländewagen liegt:','Auto für den Park','Im Auto liegt:'],['Rucksack','Im Rucksack steckt:','Rucksack','Im Rucksack steckt:']]
];
const SZZ=SZENARIEN.zoo;
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZZ.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZZ.einfach) SZZ.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const ZOO = (function(){
const GRAS=0x7cc05a, SAND=0xe2c88a, HOLZ=0x9a6a38, HOLZ2=0x6b421e, FELS=0x8e8a82, WASSER=0x3aa8d8, SCHNEE=0xeef6fc, EIS=0xaee0f4, BLATT=0x3f9a48, GOLD=0xd8a73a;

const QUADER=box;
/* ---------- Tiere aus der 3D-Zoo-Welt (mit kleinen Übersetzern auf die Bausteine hier) ---------- */
const TIERE=(function(){
const gSph=GEO.sph, gBox=GEO.box, gCone=GEO.cone, gCyl=GEO.cyl;
const grp=(x,y,z,par)=>gruppe(par,x,y,z);
const sph=(r,c,x,y,z,par,sx,sy,sz)=>ball(par,r,c,x,y,z,sx,sy,sz);
const box=(w,h,d,c,x,y,z,par)=>QUADER(par,w,h,d,c,x,y,z);
const cone=(r,h,c,x,y,z,par)=>kegel(par,r,h,c,x,y,z);
const cyl=(r,h,c,x,y,z,par)=>walze(par,r,h,c,x,y,z);
const vm=g=>g;
function elefant(par){const g=grp(0,0,0,par),k=0x9aa0a8,d=0x868c94;
  sph(1.5,k,0,2.2,0,g,1.25,.95,.85).castShadow=true;[[-1.1,.7],[-1.1,-.7],[1.1,.7],[1.1,-.7]].forEach(p=>cyl(.38,1.6,k,p[0],.8,p[1],g,true));[[-1.1,.7],[-1.1,-.7],[1.1,.7],[1.1,-.7]].forEach(p=>sph(.39,k,p[0],1.6,p[1],g));
  const kopf=grp(1.9,2.7,0,g);sph(.85,k,0,0,0,kopf,1,1.05,.95);sph(.1,0x111111,.55,.25,.55,kopf);sph(.1,0x111111,.55,.25,-.55,kopf);
  const ohrL=sph(.7,d,-.3,.1,.95,kopf,.18,1,1),ohrR=sph(.7,d,-.3,.1,-.95,kopf,.18,1,1);
  [-.45,.45].forEach(z=>{const z1=cone(.1,.9,0xfff4dc,.7,-.45,z,kopf);z1.rotation.z=-1.1});
  const r=grp(.72,-.15,0,kopf);cyl(.3,1.1,k,0,-.55,0,r);const r2=grp(0,-1.05,0,r);cyl(.25,1,k,0,-.5,0,r2);sph(.29,k,0,0,0,r2);sph(.26,k,0,-1,0,r2);r.rotation.z=.2;
  cyl(.06,.9,d,-2.0,1.9,0,g).rotation.z=-.4;sph(.13,0x4a4e56,-2.18,1.48,0,g);
  g.userData.anim=t=>{r.rotation.z=.2+Math.sin(t*1.3)*.2;r2.rotation.z=-.15+Math.sin(t*1.3+1)*.3;ohrL.rotation.y=Math.sin(t*1.8)*.18;ohrR.rotation.y=-Math.sin(t*1.8)*.18};return g}
function giraffe(par){const g=grp(0,0,0,par),f=0xe8b24a,fl=0x8b5a2b;
  sph(1.05,f,0,3.4,0,g,1.5,.85,.75).castShadow=true;
  [[-.95,.45],[-.95,-.45],[.95,.45],[.95,-.45]].forEach(p=>{cyl(.2,3,f,p[0],1.5,p[1],g,true);cyl(.22,.35,fl,p[0],.17,p[1],g)});
  [[-.6,3.9],[.2,3.95],[.8,3.6],[-.9,3.4],[-.2,3.35],[.5,3.15],[-.7,3.0]].forEach(q=>{const u=q[0]/1.575,v=(q[1]-3.4)/.8925,zz=.7875*Math.sqrt(Math.max(.05,1-u*u-v*v));[-1,1].forEach(sg=>sph(.3,fl,q[0],q[1],sg*zz,g,1,.8,.25))});
  const hals=grp(1.2,3.9,0,g);cyl(.38,2.8,f,.5,1.3,0,hals).rotation.z=-.35;box(.1,2.7,.14,fl,.22,1.4,0,hals).rotation.z=-.35;
  [-.9,-.3,.3,.9].forEach(t=>[-1,1].forEach(sg=>sph(.15,fl,.5+.342*1.4*t,1.3+.94*1.4*t,sg*.37,hals,1,1,.3)));
  const kopf=grp(1.0,2.65,0,hals);sph(.46,f,.28,0,0,kopf,1.35,.75,.75).castShadow=true;sph(.2,0xd89a3a,.7,-.07,0,kopf,1,.75,.85);sph(.04,0x3a2a1a,.88,-.02,.0,kopf);
  [-1,1].forEach(z=>{cyl(.05,.4,fl,.0,.33,z*.14,kopf);sph(.09,fl,0,.55,z*.14,kopf);sph(.1,f,-.08,.12,z*.3,kopf,1.6,.5,.8);sph(.065,0x111111,.45,.1,z*.27,kopf)});
  cyl(.05,1,fl,-1.5,3.3,0,g).rotation.z=-.3;sph(.14,fl,-1.65,2.8,0,g);
  g.userData.anim=t=>{hals.rotation.z=Math.sin(t*.7)*.08;kopf.rotation.z=Math.sin(t*1.1)*.12};return g}
function zebra(par){const g=grp(0,0,0,par),w=0xf6f6f6,s=0x1b1b1b;
  sph(1,w,0,1.6,0,g,1.3,.6,.55).castShadow=true;
  for(let i=-5;i<=5;i++){const x=i*.22,k=Math.sqrt(Math.max(0,1-(x/1.3)*(x/1.3)));if(k>.2)sph(1,s,x,1.6,0,g,.045,.6*k+.015,.55*k+.015)}
  [[-.9,.3],[-.9,-.3],[.9,.3],[.9,-.3]].forEach(p=>{cyl(.13,1.33,w,p[0],.665,p[1],g,true);sph(.15,w,p[0]*.95,1.38,p[1]*.8,g,1,1.3,.9);sph(.135,w,p[0],1.33,p[1],g);cyl(.14,.3,s,p[0],.15,p[1],g);[.55,.95,1.25].forEach(y=>cyl(.137,.07,s,p[0],y,p[1],g))});
  const hals=grp(1.1,1.9,0,g);cyl(.22,1.05,w,.21,.33,0,hals).rotation.z=-.5;box(.1,1.0,.1,s,.01,.44,0,hals).rotation.z=-.5;sph(.21,w,.45,.77,0,hals);
  [-.45,-.15,.15,.45].forEach(t=>{cyl(.235,.07,s,.21+.479*t*1.05,.33+.878*t*1.05,0,hals).rotation.z=-.5});
  const kopf=grp(1.62,2.7,0,g);sph(.3,w,.2,-.05,0,kopf,1.5,.8,.75).castShadow=true;sph(.17,0x2a2a2a,.58,-.12,0,kopf,1,.8,.9);
  [.0,.14].forEach(x=>sph(1,s,x,-.05,0,kopf,.03,.245,.23));
  [-1,1].forEach(z=>{sph(.06,0x111111,.3,.05,z*.2,kopf);cone(.08,.3,w,0,.25,z*.12,kopf);cone(.04,.2,0x2a2a2a,0,.24,z*.12,kopf)});
  const sw=grp(-1.24,1.75,0,g);cyl(.07,.9,s,0,-.4,0,sw);sph(.12,s,0,-.9,0,sw);
  g.userData.anim=t=>{sw.rotation.z=Math.sin(t*3)*.3;kopf.rotation.z=Math.sin(t*.9)*.1};return g}
function pinguin(par){const g=grp(0,0,0,par);
  sph(.5,0x20262e,0,.8,0,g,.85,1.4,.75,true).castShadow=true;sph(.42,0xffffff,.3,.72,0,g,.6,1.35,.7);sph(.32,0x20262e,0,1.55,0,g);sph(.055,0xffffff,.29,1.6,.13,g);sph(.055,0xffffff,.29,1.6,-.13,g);sph(.035,0x111111,.335,1.6,.13,g);sph(.035,0x111111,.335,1.6,-.13,g);cone(.17,.42,0x20262e,-.47,.28,0,g).rotation.z=1.9;
  cone(.1,.3,0xf59e3f,.36,1.5,0,g).rotation.z=-Math.PI/2;box(.3,.06,.18,0xf59e3f,.1,.03,.2,g);box(.3,.06,.18,0xf59e3f,.1,.03,-.2,g);
  const fa=sph(.3,0x20262e,0,.95,.43,g,.35,1.3,.6),fb=sph(.3,0x20262e,0,.95,-.43,g,.35,1.3,.6);
  g.userData.anim=t=>{g.rotation.x=Math.sin(t*3)*.08;fa.rotation.x=Math.sin(t*2)*.2;fb.rotation.x=-Math.sin(t*2)*.2};return g}
function affe(par){const g=grp(0,0,0,par),f=0x8a5a32;
  sph(.45,f,0,1.0,0,g,.85,1.15,.8).castShadow=true;sph(.27,f,.06,1.62,0,g);sph(.19,0xe8c9a0,.25,1.58,0,g,.7,.9,.9);sph(.04,0x111111,.42,1.68,.1,g);sph(.04,0x111111,.42,1.68,-.1,g);sph(.12,0xe8c9a0,0,1.7,.32,g);sph(.12,0xe8c9a0,0,1.7,-.32,g);
  const arm=s=>{const a=grp(.08,1.35,s*.34,g);strich(a,[0,0,0],[.06,-.42,s*.2],.12,f);strich(a,[.06,-.42,s*.2],[.2,-.8,s*.24],.1,f);sph(.13,0xe8c9a0,.22,-.86,s*.24,a);return a};const a1=arm(1),a2=arm(-1);[-1,1].forEach(s=>sph(.17,0xe8c9a0,.1,.08,s*.22,g,1.3,.55,1));cyl(.14,.75,f,-.05,.37,.22,g);cyl(.14,.75,f,-.05,.37,-.22,g);
  [[[-.3,.75,0],[-.75,.5,.15]],[[-.75,.5,.15],[-1.05,.75,.3]],[[-1.05,.75,.3],[-1.05,1.15,.4]],[[-1.05,1.15,.4],[-.82,1.3,.4]]].forEach(q=>{strich(g,q[0],q[1],.075,f);sph(.08,f,q[1][0],q[1][1],q[1][2],g)});
  g.userData.anim=t=>{a1.rotation.z=Math.sin(t*2.5)*.4;a2.rotation.z=-Math.sin(t*2.5)*.4;g.position.y=(g.userData.y0||0)+Math.max(0,Math.sin(t*1.6))*.25};return g}
function flamingo(par){const g=grp(0,0,0,par),p=0xf48fb1;
  sph(.5,p,0,1.9,0,g,1.2,.75,.7).castShadow=true;cyl(.04,1.7,0xe8799a,0,.85,.12,g);cyl(.04,1.1,0xe8799a,0,1.2,-.14,g).rotation.z=.5;
  const hals=grp(.5,2.1,0,g);cyl(.07,.9,p,.1,.4,0,hals).rotation.z=-.3;const kopf=grp(.35,.95,0,hals);sph(.17,p,0,0,0,kopf);cone(.07,.35,0x30262a,.25,-.04,0,kopf).rotation.z=-Math.PI/2;sph(.03,0x111111,.1,.05,.12,kopf);sph(.03,0x111111,.1,.05,-.12,kopf);
  sph(.3,0xf06a9c,-.4,1.95,0,g,1.3,.4,.8);
  g.userData.anim=t=>{hals.rotation.z=Math.sin(t*1.2)*.12;kopf.rotation.z=Math.sin(t*2.2)*.25};return g}
function papagei(par,c){const g=grp(0,0,0,par),a=c||0xe0302a,b=0x3b8fc4;
  sph(.28,a,0,.6,0,g,.8,1.25,.8);sph(.2,0xffe08a,.1,.55,0,g,.6,1.1,.75);const kopf=grp(.05,1.05,0,g);sph(.2,a,0,0,0,kopf);cone(.08,.2,0xffe08a,.2,-.03,0,kopf).rotation.z=-Math.PI/2;sph(.06,0xffffff,.12,.07,.14,kopf);sph(.06,0xffffff,.12,.07,-.14,kopf);sph(.03,0x111111,.16,.07,.16,kopf);sph(.03,0x111111,.16,.07,-.16,kopf);
  [-1,1].forEach(z=>sph(.2,b,-.1,.6,z*.22,g,.35,1.3,.5));cone(.1,.7,b,-.2,.22,0,g).rotation.z=.35;
  g.userData.anim=t=>{kopf.rotation.z=Math.sin(t*2.2)*.25};return g}
function seeloewe(par){const g=grp(0,0,0,par),f=0x6e4b33,d=0x55391f;
  sph(.8,f,0,.62,0,g,1.9,.52,.62).castShadow=true;sph(.5,f,-1.35,.4,0,g,1.1,.42,.5);sph(.4,f,.95,1.0,0,g,1.15,1.3,.8);
  const kopf=grp(1.4,1.55,0,g);sph(.38,f,0,0,0,kopf,1.05,1,.9);sph(.2,0x9a7656,.38,-.1,0,kopf,1.1,.75,1.05);sph(.07,0x111111,.6,-.02,0,kopf);
  [-1,1].forEach(s=>{sph(.06,0x111111,.26,.13,s*.2,kopf);sph(.035,0xffffff,.29,.16,s*.2,kopf);sph(.09,d,-.14,.26,s*.3,kopf,1.2,.7,1);[0,1,2].forEach(j=>strich(kopf,[.5,-.1-j*.04,s*.15],[.5-j*.03,-.04-j*.11,s*.45],.016,0xf0e4c8))});
  [-1,1].forEach(s=>{strich(g,[.72,.62,s*.32],[.55,.22,s*.62],.12,d);sph(.12,d,.72,.62,s*.32,g);sph(.12,d,.55,.22,s*.62,g);sph(.3,d,.55,.2,s*.66,g,1.5,.22,.55).rotation.y=s*.5;sph(.4,d,-1.9,.35,s*.2,g,1.3,.2,.55).rotation.y=-s*.3});
  g.userData.anim=t=>{kopf.rotation.z=.1+Math.sin(t*1.3)*.2};return vm(g,kopf)}
function schildkroete(par){const g=grp(0,0,0,par);
  sph(.6,0x6a8a3a,0,.35,0,g,1.2,.6,1).castShadow=true;for(let i=0;i<4;i++)sph(.16,0x4a6a2a,Math.cos(i*1.57)*.35,.7,Math.sin(i*1.57)*.3,g,1,.4,1);sph(.2,0x4a6a2a,0,.75,0,g,1.2,.4,1);
  const kopf=grp(.85,.35,0,g);sph(.2,0x9ab86a,0,0,0,kopf);sph(.04,0x111111,.14,.07,.1,kopf);sph(.04,0x111111,.14,.07,-.1,kopf);
  [[.5,.5],[.5,-.5],[-.5,.5],[-.5,-.5]].forEach(p=>sph(.2,0x9ab86a,p[0],.12,p[1],g,1.3,.6,1));
  g.userData.anim=t=>{kopf.position.x=.85+Math.sin(t*.8)*.12};return g}
return { elefant, giraffe, zebra, pinguin, affe, flamingo, papagei, seeloewe, schildkroete };
})();
/* Tier aufstellen und bewegen. art: elefant, giraffe, zebra, pinguin, affe, flamingo, papagei, seeloewe, schildkroete. Schaut nach +x (dreh dreht es). gr = Größe (1 = wie gebaut: Elefant etwa 4 hoch, Giraffe etwa 7, Pinguin 1,8, Seelöwe 2).
   Gibt die Gruppe zurück. Funktioniert auch innerhalb eines Gegenstands (bleibt beweglich). Hindernisse selbst setzen. */
function tier(k,art,par,x,z,dreh,gr,y){
  const huelleG=gruppe(par,x,y||0,z); huelleG.rotation.y=dreh||0; huelleG.scale.setScalar(gr||1); huelleG.userData.lebendig=true;
  const t=TIERE[art](huelleG), a=t.userData.anim, versatz=x*1.7+z;
  if(a) k.anim.push(zt=>a(zt+versatz));
  return huelleG;
}

/* Zahlenschloss (golden, drei Felder), Blick nach +z */
function zahlenschloss(par,x,y,z){
  const g=gruppe(par,x,y,z); box(g,.85,.62,.22,GOLD,0,0,0); ring(g,.26,.075,0x9aa3ad,0,.31,0,Math.PI); [-.24,0,.24].forEach(v=>{ box(g,.19,.28,.04,0xfff3cf,v,-.02,.12); box(g,.045,.15,.02,0x2a1a08,v,-.02,.15); });
  return g;
}
/* Boden-Bild: Grundfarbe mit Sprenkeln. grund = [r,g,b], streu = Helligkeitsschwankung */
function bodenBild(grund,streu){
  const G=grund, s=streu||22;
  return bild(512,512,(g)=>{ g.fillStyle='rgb('+G.join(',')+')'; g.fillRect(0,0,512,512);
    for(let i=0;i<1100;i++){ const h=Math.floor(zufall()*2*s)-s, x=zufall()*512, y=zufall()*512, r=2+zufall()*7; g.fillStyle='rgba('+(G[0]+h)+','+(G[1]+h)+','+(G[2]+h)+',.75)';
      [-512,0,512].forEach(dx=>[-512,0,512].forEach(dy=>{ g.beginPath(); g.ellipse(x+dx,y+dy,r,r*.6,i,0,7); g.fill(); })); } });
}
/* Gehege-Hülle (draußen): Licht, großer Boden weit über den Raum hinaus, hinten und seitlich eine niedrige Gehegemauer (in den Wandgruppen, blendet beim Drehen aus).
   Passend dazu in der Raum-Datei: himmel: <Farbzahl>.
   opt: B,T, boden [r,g,b], bodenStreu, himmelLicht, grund, staerke, sonne, sonneStaerke,
        mauer (Farbe oder null für keine), mauerHoehe (Standard 1.6), stein (Farbe der Deckplatten), oeffnung {x,b} (Lücke in der hinteren Mauer für den Ausgang) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.mauerHoehe||1.6;
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xeaf6ff,opt.grund||0x6a7a48,opt.staerke||.74));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xfff0d0,opt.sonneStaerke||.5); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const t=bodenBild(opt.boden||[112,176,82],opt.bodenStreu); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(160/9,160/9);
  const bm=new THREE.Mesh(new THREE.PlaneGeometry(160,160),new THREE.MeshLambertMaterial({map:t})); bm.rotation.x=-Math.PI/2; bm.position.y=-.012; bm.receiveShadow=true; sc.add(bm);
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), f=opt.mauer===undefined?0xb8a080:opt.mauer, d=opt.stein||0x8a7458, o=opt.oeffnung;
  if(f!==null){
    const s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
    const stueck=(g,x1,x2)=>{ if(x2-x1<.05) return; const w=x2-x1, n=Math.max(1,Math.round(w/1.5)); for(let i=0;i<n;i++){ const x=x1+(i+.5)*w/n; box(g,w/n-.07,H+(i%3)*.06,.55,f,x,(H+(i%3)*.06)/2,-T/2-.28); } box(g,w,.18,.7,d,(x1+x2)/2,H+.2,-T/2-.28); };
    if(o){ stueck(s[0],-B/2-.5,o.x-o.b/2); stueck(s[0],o.x+o.b/2,B/2+.5); } else stueck(s[0],-B/2-.5,B/2+.5);
    [-1,1].forEach((v,j)=>{ const n=Math.round(T/1.5); for(let i=0;i<n;i++){ const z=-T/2+(i+.5)*T/n; box(s[j+1],.55,H+(i%3)*.06,T/n-.07,f,v*(B/2+.28),(H+(i%3)*.06)/2,z); } box(s[j+1],.7,.18,T,d,v*(B/2+.28),H+.2,0); });
    s.forEach(verschmelze);
  }
  return { sc, B, T, hinten, links, rechts };
}
/* Viele Büschel, Blumen oder Steine als eine Instanz-Gruppe. liste: [[x,y,z,sx,sy,sz,farbe,dreh]], geo: GEO.sph / GEO.cone / GEO.box / GEO.cyl */
function viele(par,geo,liste){
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(e[8]||0,e[7]||0,e[9]||0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.receiveShadow=true; im.frustumCulled=false; par.add(im); return im;
}
return { GRAS, SAND, HOLZ, HOLZ2, FELS, WASSER, SCHNEE, EIS, BLATT, GOLD, TIERE, tier, zahlenschloss, bodenBild, huelle, viele };
})();

/* Raum 1: Das Urwald-Gehege unter freiem Himmel. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: der Lianenvorhang im Steinbogen hinten rechts; die Lianen schwingen zur Seite, dahinter führt ein Weg ins Helle. */
RAEUME3D.zoo[0] = (function(){
const B=36, T=27, Q=Math.PI/2;
const GX=8, GZ=-13.35;                 /* Mitte des Lianenvorhangs */
const HIMMEL=0xb4e2d2;
const BLATT=0x2f8a3a, BLATT2=0x4aa83e, BLATT3=0x1f6e34, BLATT4=0x7cc24a;
const STAMM=0x7a5230, STAMM2=0x5c3c20, HOLZ=0x9a6a38, HOLZ2=0x6b421e, HOLZ3=0xc08a4c;
const FELS=0x7e8a7a, FELS2=0x67736a, FELS3=0x99a290, MOOS=0x5a9a38;
const doppel=c=>mat(c,{side:THREE.DoubleSide});

/* ---------- Grundformen ---------- */
/* kantiger Fels: unregelmäßig verformter Vielflächner */
function felsGeo(saatF,stufe,rau){
  const geo=new THREE.IcosahedronGeometry(1,stufe===undefined?1:stufe), p=geo.attributes.position, r=rau||.28;
  for(let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i), h=Math.sin(Math.round(x*50)*1.29+Math.round(y*50)*7.82+Math.round(z*50)*3.77+saatF)*4375.8, f=1+(h-Math.floor(h)-.5)*r; p.setXYZ(i,x*f,y*f,z*f); }
  geo.computeVertexNormals(); return geo;
}
function form(par,geo,farbe,x,y,z){ const t=new THREE.Mesh(geo,typeof farbe==='number'?mat(farbe):farbe); t.position.set(x,y,z); t.castShadow=true; t.receiveShadow=true; par.add(t); return t; }
/* großes Blatt: zeigt nach +x, steigt um hoch, biegt sich um haengt nach unten, leicht gefaltet */
function blattGeo(L,breit,hoch,haengt){
  const N=9, P=[], pkt=i=>{ const s=i/N, w=breit*Math.pow(Math.max(0,Math.sin(Math.PI*(s*.93+.035))),.8), y=hoch*s-haengt*s*s; return [s*L,y,w]; };
  for(let i=0;i<N;i++){ const a=pkt(i), b=pkt(i+1);
    [-1,1].forEach(v=>{ P.push(a[0],a[1],0, b[0],b[1],0, b[0],b[1]+b[2]*.25,v*b[2]); P.push(a[0],a[1],0, b[0],b[1]+b[2]*.25,v*b[2], a[0],a[1]+a[2]*.25,v*a[2]); }); }
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.computeVertexNormals(); return geo;
}
/* Blatt mit heller Mittelrippe */
function blatt(par,L,breit,hoch,haengt,farbe,x,y,z,dreh,rippe){
  const m=form(par,blattGeo(L,breit,hoch,haengt),doppel(farbe),x,y,z); m.rotation.y=dreh||0;
  if(rippe!==false){ const c=Math.cos(dreh||0), s=Math.sin(dreh||0); let alt=[x,y+.015,z];
    for(let i=1;i<=4;i++){ const u=i/4.4, q=[x+c*u*L,y+hoch*u-haengt*u*u+.015,z-s*u*L]; strich(par,alt,q,.022,0x9ad060); alt=q; } }
  return m;
}
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* Schatten nur von den großen Teilen (Farben in der Liste), das spart Zeichenaufrufe */
function schattenNur(g,...farben){ const M=[]; farben.forEach(c=>M.push(mat(c),doppel(c))); g.traverse(m=>{ if(m.isMesh && M.indexOf(m.material)<0) m.castShadow=false; }); }
function instanzen(par,geo,m,liste){
  const t=new THREE.InstancedMesh(geo,m,liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.rotation.set(e[7]||0,e[8]||0,e[9]||0,'YXZ'); o.scale.set(e[3],e[4],e[5]); o.updateMatrix(); t.setMatrixAt(i,o.matrix); t.setColorAt(i,C.set(e[6])); });
  t.frustumCulled=false; t.castShadow=false; t.receiveShadow=true; par.add(t); return t;
}
/* kleiner Schmetterling: Körper entlang z, zwei schlagende Flügel */
function falter(par,farbe,farbe2,schlicht){
  const g=gruppe(par,0,0,0); g.userData.lebendig=true;
  const leib=gruppe(g,0,0,0); ball(leib,.045,0x2a1a10,0,0,0,1,1,3.6); ball(leib,.065,0x2a1a10,0,0,.17);
  [-1,1].forEach(s=>{ strich(leib,[0,.02,.2],[s*.1,.07,.34],.01,0x2a1a10); ball(leib,.022,0x2a1a10,s*.1,.07,.34); });
  verschmelze(leib); ohneSchatten(leib);
  const fl=[-1,1].map(s=>{ const f=gruppe(g,0,0,0); ball(f,.2,farbe,s*.21,0,.1,1.15,.08,.85).rotation.y=s*.45; ball(f,.14,farbe,s*.15,0,-.13,1,.09,.95).rotation.y=-s*.4;
    if(!schlicht){ ball(f,.07,farbe2,s*.28,.012,.12,1.1,.25,1); ball(f,.05,farbe2,s*.17,.012,-.15,1,.3,1); } verschmelze(f); ohneSchatten(f); return f; });
  return { g, schlag:w=>{ fl[0].rotation.z=-w; fl[1].rotation.z=w; } };
}

/* Banane: schlanke, spitz zulaufende Sichel in der x/y-Ebene, Stielende im Ursprung, Spitze bei (.62,.08) */
const BR=.34, bananenPunkt=u=>{ const w=(-150+135*u)*Math.PI/180; return [w,BR*Math.cos(w)+.294,BR*Math.sin(w)+.17]; };
function bananenGeo(){
  const N=14, M=8, P=[], No=[];
  const ecke=(i,j)=>{ const u=i/N, [w,x,y]=bananenPunkt(u), d=.072*Math.pow(Math.sin(Math.PI*(.07+.89*u)),.6), a=j/M*Math.PI*2, n=[Math.cos(w)*Math.cos(a),Math.sin(w)*Math.cos(a),Math.sin(a)];
    P.push(x+n[0]*d,y+n[1]*d,n[2]*d); No.push(n[0],n[1],n[2]); };
  for(let i=0;i<N;i++) for(let j=0;j<M;j++){ ecke(i,j); ecke(i+1,j); ecke(i+1,j+1); ecke(i,j); ecke(i+1,j+1); ecke(i,j+1); }
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute(No,3)); return geo;
}

/* ---------- Boden: Erdweg, Gras, Farne, Blümchen ---------- */
function bodenzier(k){
  const sc=k.scene;
  const t=bild(720,540,g=>{ g.clearRect(0,0,720,540);
    const px=x=>(x+18)*20, pz=z=>(z+13.5)*20;
    const weg=(P,br)=>{ [[br*1.35,'rgba(150,112,64,.22)'],[br,'rgba(166,126,74,.45)'],[br*.6,'rgba(188,150,94,.45)']].forEach(([w,c])=>{ g.strokeStyle=c; g.lineWidth=w*20; g.lineCap='round'; g.lineJoin='round'; g.beginPath(); P.forEach(([x,z],i)=>{ if(!i) g.moveTo(px(x),pz(z)); else { const a=P[i-1]; g.quadraticCurveTo(px(a[0]),pz((a[1]+z)/2),px(x),pz(z)); } }); g.stroke(); }); };
    weg([[8,-13.5],[8,-10],[5.2,-6],[4.6,-1],[1,2.4],[-3,6.5],[-9,9],[-12,9.4]],2.1);
    weg([[1,2.4],[7,2],[11.5,3.6],[13,8.6]],1.5);
    weg([[1,2.4],[-3,-.6],[-7,-4],[-12,-3.6]],1.4);
    for(let i=0;i<520;i++){ const x=zufall()*720, y=zufall()*540; g.fillStyle=['rgba(70,100,36,.3)','rgba(150,184,80,.25)','rgba(110,80,40,.2)'][i%3]; g.beginPath(); g.ellipse(x,y,2+zufall()*4,1.5+zufall()*3,i,0,7); g.fill(); } });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(B,T),new THREE.MeshLambertMaterial({map:t,transparent:true,depthWrite:false})); m.rotation.x=-Q; m.position.y=.004; m.receiveShadow=true; sc.add(m);
  /* Grasbüschel und Blümchen (nicht rosa, damit nur die Orchidee rosa blüht) */
  const gras=[], stiel=[], blume=[], mitte=[];
  for(let i=0;i<230;i++){ const x=(zufall()-.5)*35, z=(zufall()-.5)*26; if(Math.hypot(x-8,z+11)<2.5) continue;
    for(let j=0;j<3;j++) gras.push([x+(j-1)*.13,.14+(j===1?.05:0),z+(j%2)*.08,.07,.3+(j===1?.12:0),.07,[0x4a8a2a,0x6aaa38,0x3a7a2a][i%3],0,0,(j-1)*-.35]); }
  for(let i=0;i<70;i++){ const x=(zufall()-.5)*35, z=(zufall()-.5)*26, h=.2+zufall()*.14, f=[0xffd428,0xff6a2a,0xffffff,0xe8342a][i%4];
    stiel.push([x,h/2,z,.018,h,.018,0x3a7a2a]); for(let j=0;j<5;j++){ const a=j*1.257; blume.push([x+Math.cos(a)*.075,h,z+Math.sin(a)*.075,.062,.03,.062,f]); } mitte.push([x,h+.02,z,.045,.035,.045,i%4?0xffc81a:0x8a4a1a]); }
  instanzen(sc,GEO.cone,new THREE.MeshLambertMaterial({color:0xffffff}),gras);
  instanzen(sc,GEO.cyl,new THREE.MeshLambertMaterial({color:0xffffff}),stiel);
  instanzen(sc,GEO.sph,new THREE.MeshLambertMaterial({color:0xffffff}),blume.concat(mitte));
}

/* ---------- Urwaldpflanzen im Gehege (wiegen sich) ---------- */
function grossblatt(k,fest,x,z,s,i){
  /* nur jede dritte Pflanze wiegt sich, die anderen werden mit der festen Deko zusammengefasst */
  const wiegt=i%3===0||i>10, krone=wiegt?gruppe(k.scene,x,0,z):gruppe(fest,x,0,z), F=[BLATT,BLATT2,BLATT3];
  const n=7;
  for(let j=0;j<n;j++){ const a=j*6.283/n+i, innen=j%2, cx=Math.cos(a), cz=-Math.sin(a), hoch=(innen?1.15:.55)*s;
    /* Blätter zur Mauer hin kürzer halten */
    const platz=Math.min(cx>.05?(17.85-x)/cx:99, cx<-.05?(-17.85-x)/cx:99, cz<-.05?(-13.35-z)/cz:99), f=Math.max(.35,Math.min(1,platz/((innen?1.55:1.85)*s)));
    strich(krone,[0,0,0],[cx*.3*s*f,hoch,cz*.3*s*f],.06*s,BLATT3);
    blatt(krone,(innen?1.25:1.55)*s*f,(innen?.42:.5)*s*f,(innen?.9:.8)*s,(innen?.7:1)*s*f,F[(i+(innen?1:0))%3],cx*.3*s*f,hoch,cz*.3*s*f,a); }
  ball(krone,.35*s,BLATT3,0,.2*s,0,1.2,.8,1.2);
  k.kreis(x,z,1.1*s);
  if(wiegt){ verschmelze(krone); k.anim.push(t=>{ krone.rotation.z=Math.sin(t*1.1+i)*.03; krone.rotation.x=Math.sin(t*.83+i*2)*.025; }); }
}
function helikonie(g,x,z,s,i){
  for(let j=0;j<7;j++) blatt(g,1.2*s,.26*s,(1.2+(j%3)*.3)*s,.7*s,j%2?BLATT:BLATT2,x,.05,z,j*.9+i,false);
  [[-.25,1.5,.15],[.3,1.15,.3]].forEach(([a,h,c])=>{ strich(g,[x,0,z],[x+a*s,h*s,z+c*s],.035,0x4a7a28);
    /* Blütenstand aus kurzen, dicken, überlappenden Hochblättern */
    for(let j=0;j<5;j++){ const v=j%2?1:-1; kegel(g,.15*s,.28*s,j<4?0xe8321e:0xffa01a,x+a*s+v*.09*s,(h+j*.11)*s,z+c*s).rotation.z=-v*.95; } });
}
function farn(g,x,z,s,i){ for(let j=0;j<9;j++){ const a=j*.7+i; blatt(g,(.8+(j%3)*.15)*s,.16*s,.85*s,.75*s,j%2?BLATT2:BLATT4,x,.05,z,a,false); } }
function mooslog(g,x,z,l,dreh){
  const h=gruppe(g,x,0,z); h.rotation.y=dreh;
  walze(h,.34,l,STAMM,0,.32,0).rotation.z=Q;
  [-1,1].forEach(s=>{ walze(h,.28,.03,HOLZ3,s*(l/2+.008),.32,0).rotation.z=Q; ring(h,.15,.018,HOLZ,s*(l/2+.03),.32,0).rotation.y=Q; });
  for(let i=0;i<7;i++) ball(h,.2,i%2?MOOS:0x6aaa40,-l*.4+i*l*.13,.6,((i%3)-1)*.12,1.4,.4,.9);
  strich(h,[l*.18,.5,0],[l*.3,.95,.2],.07,STAMM2); blatt(h,.4,.13,.2,.2,BLATT4,l*.3,.95,.2,.5,false);
}
function ausstattung(k){
  const sc=k.scene, G=[felsGeo(2),felsGeo(7),felsGeo(11)], g=gruppe(sc,0,0,0);
  [[-16.7,-11.6,1.25],[16.5,-11.8,1.3],[-16.8,12,1.05],[16.8,11.9,.95],[-16.9,1.2,1.05],[17,-4.4,1.1],[-7,-12,.95],[1.9,-12.1,1],[14,-12.2,.9],[17,6.4,.85],[-17,-9,.9],[-1.2,10.2,.55],[8.8,10.9,.65]].forEach(([x,z,s],i)=>grossblatt(k,g,x,z,s,i));
  [[-16.9,-1.9,1],[-16.9,4.2,.95],[17,-1.1,.95],[-.9,-12.2,.85],[12.2,-12.3,.9],[-8.2,12.2,.6],[17,-7,.8]].forEach(([x,z,s],i)=>{ helikonie(g,x,z,s,i); k.kreis(x,z,.62*s); });
  [[-16.8,-4.5,.9],[-17,9,.9],[17,9.3,.85],[-5.6,-12.3,.9],[3.9,-12.4,.8],[11.6,12.3,.7],[-4,12.2,.7],[-15.2,-12.4,.8],[7.2,-5.8,.65],[-7.4,8.7,.65],[17,3.6,.6]].forEach(([x,z,s],i)=>{ farn(g,x,z,s,i); k.kreis(x,z,.75*s); });
  /* bemooste Felsen */
  [[-16.4,-7,.75],[16.6,-2.7,.6],[-15.6,3,.55],[5.6,12,.6],[-10.8,-9.4,.65],[13.4,-5.4,.7],[-1.9,.4,.45],[10.3,-8,.55],[15.6,10.2,.5],[-9.6,11.9,.55]].forEach(([x,z,s],i)=>{
    teil(g,G[i%3],[FELS,FELS2,FELS3][i%3],x,s*.45,z,s,s*.75,s*.9).rotation.y=i*1.3;
    teil(g,G[(i+1)%3],FELS3,x+(x>0?-.6:.6)*s,s*.18,z+.55*s,s*.4,s*.3,s*.38);
    ball(g,s*.55,MOOS,x-.1*s,s*.97,z,1.25,.3,1);
    k.kreis(x,z,s*1.02); });
  /* liegende bemooste Stämme */
  mooslog(g,7.2,4.6,2.6,.12); k.kasten(7.2,4.6,2.9,1);
  mooslog(g,-14.2,-.9,2,1.35); k.kasten(-14.2,-.9,1.1,2.4);
  schattenNur(g,BLATT,BLATT2,FELS,STAMM); verschmelze(g);
  /* Baumstumpf mit Äffchen in der Ecke */
  const st=gruppe(sc,15.4,0,-8.8);
  rohr(st,.6,.78,1.05,STAMM,0,.52,0,12); walze(st,.58,.04,HOLZ3,0,1.06,0); ring(st,.36,.02,HOLZ,0,1.085,0).rotation.x=Q; ring(st,.18,.018,HOLZ,0,1.088,0).rotation.x=Q;
  for(let i=0;i<5;i++){ const a=i*1.257; ball(st,.24,STAMM2,Math.cos(a)*.68,.1,Math.sin(a)*.68,1.3,.5,.8).rotation.y=-a; }
  schattenNur(st,STAMM); verschmelze(st); k.kreis(15.4,-8.8,.9);
  ohneSchatten(ZOO.tier(k,'affe',sc,15.4,-8.8,-2.05,.85,1.06));
}

/* ---------- Wasserfall mit Becken ---------- */
function wasserfall(k,hinten){
  const WX=-11.4;
  const t=bild(128,256,g=>{ g.fillStyle='#74cce4'; g.fillRect(0,0,128,256); for(let i=0;i<120;i++){ const x=zufall()*124, y=zufall()*256, l=20+zufall()*55; g.fillStyle=i%3?'rgba(255,255,255,.75)':'rgba(40,140,190,.5)'; g.fillRect(x,y,3+(i%3),l); g.fillRect(x,y-256,3+(i%3),l); } });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(1,1.3);
  const w=new THREE.Mesh(new THREE.PlaneGeometry(2,4.7),new THREE.MeshBasicMaterial({map:t})); w.position.set(WX,2.4,-13.02); hinten.add(w);
  const fels=gruppe(hinten,WX,0,0), G=[felsGeo(3),felsGeo(5),felsGeo(9)], F=[FELS,FELS2,FELS3];
  /* Rückwand des Felsens */
  box(fels,3,4.5,.5,FELS2,0,2.25,-13.6);
  [[-1.75,.7,.85,1],[-1.7,2.1,.75,.95],[-1.75,3.45,.8,.9],[-1.4,4.6,.7,.65],[1.75,.7,.9,1],[1.75,2.2,.75,.9],[1.65,3.55,.8,.95],[1.35,4.65,.75,.6],[-2.8,.7,.8,1],[-2.7,1.9,.6,.7],[2.9,.8,.75,1],[2.75,2,.55,.65],[-.8,5.05,.55,.45],[.7,5.1,.6,.4]].forEach(([x,y,sx,sy],i)=>{
    const m=teil(fels,G[i%3],F[i%3],x,y,-13.78,sx,sy,.55); m.rotation.y=(zufall()-.5)*.3; });
  walze(fels,1,.2,0xa8e4f0,0,4.76,-13.3).scale.set(1.05,.2,.4);
  [-2.7,-1.7,-.9,.75,1.7,2.6].forEach((x,i)=>{ const y=[2.5,5.15,5.35,5.4,5.1,2.5][i]; ball(fels,.42,i%2?MOOS:BLATT2,x,y,-13.6,1.3,.5,.9); for(let j=0;j<5;j++) blatt(fels,.85,.2,.6,.9,j%2?BLATT:BLATT2,x,y,-13.5,Math.PI+j*.78,false); });
  ohneSchatten(fels); verschmelze(fels);
  const becken=gruppe(k.scene,WX,0,-12.15);
  walze(becken,1,.05,0x3aa8cc,0,.03,-.1).scale.set(2.15,.05,.95);
  walze(becken,1,.056,0x82d4e8,0,.034,-.42).scale.set(1.25,.056,.55);
  for(let i=0;i<15;i++){ const a=-.3+i/14*(Math.PI+.6), s=.25+zufall()*.15; teil(becken,G[i%3],i%2?FELS:FELS3,Math.cos(a)*2.18,s*.4,Math.sin(a)*.98-.08,s*1.2,s*.85,s).rotation.y=i; }
  blatt(becken,.5,.3,.02,.01,0x3f9a3a,-1.1,.075,.2,.6,false); blatt(becken,.42,.25,.02,.01,0x55b040,1.15,.085,-.05,2.7,false);
  ohneSchatten(becken); verschmelze(becken);
  const gischt=new THREE.InstancedMesh(GEO.sph,basis(0xffffff),12), o=new THREE.Object3D(); gischt.frustumCulled=false; k.scene.add(gischt);
  const wellen=[0,1].map(i=>{ const m=new THREE.Mesh(new THREE.TorusGeometry(1,.025,5,30),basis(0xeaffff,{transparent:true,opacity:.6,depthWrite:false})); m.rotation.x=-Q; m.position.set(WX,.085,-12.4); k.scene.add(m); return m; });
  k.anim.push(z=>{ t.offset.y=z*.9; for(let i=0;i<12;i++){ const s=.07+Math.abs(Math.sin(z*4+i*1.7))*.11; o.position.set(WX-1+i*.18,.12+Math.sin(z*5+i)*.05,-12.82+(i%3)*.14); o.scale.set(s,s*.8,s); o.updateMatrix(); gischt.setMatrixAt(i,o.matrix); } gischt.instanceMatrix.needsUpdate=true;
    wellen.forEach((m,i)=>{ const p=(z*.45+i*.5)%1, r=.3+p*.85; m.scale.set(r*1.5,r*.62,1); m.material.opacity=.65*(1-p); }); });
  k.kasten(WX,-12.25,5,2);
  /* zwei Libellen über dem Becken */
  [0,2.8].forEach((s,i)=>{ const l=gruppe(k.scene,0,0,0), r=gruppe(l,0,0,0); strich(r,[-.28,0,0],[.12,0,0],.025,i?0xd8481a:0x1a8ac8); ball(r,.065,i?0xe8682a:0x2aa8e0,.17,0,0); verschmelze(r); ohneSchatten(r);
    /* vier Flügel */
    const fm=basis(0xdcf6ff,{transparent:true,opacity:.92,depthWrite:false});
    const fl=[[.1,-1],[.1,1],[-.11,-1],[-.11,1]].map(([x,v])=>{ const f=ball(l,.3,fm,x,.04,v*.3,x>0?.36:.3,.05,x>0?1:.86); f.rotation.y=(x>0?-.12:.22)*v; f.castShadow=false; return f; });
    k.anim.push(z=>{ const a=z*(.8+i*.25)+s, x=WX+Math.cos(a)*1.7, zz=-11.9+Math.sin(a*2)*.55; l.position.set(x,1.1+Math.sin(z*2.3+s)*.25+i*.4,zz); l.rotation.y=Math.atan2(-Math.cos(a*2)*1.1,-Math.sin(a)*1.7); fl.forEach((f,j)=>f.rotation.x=(j%2?-1:1)*Math.sin(z*30+(j>1?1.5:0))*.35); }); });
}

/* ---------- Ausgang: Lianenvorhang im Steinbogen ---------- */
function vorhang(k){
  const sc=k.scene, G=[felsGeo(31,1,.2),felsGeo(37,1,.2),felsGeo(41,1,.2)];
  const bogen=gruppe(sc,GX,0,GZ);
  [-1,1].forEach(s=>{ [0,1,2,3].forEach(i=>{ const m=teil(bogen,G[(i+(s>0?1:0))%3],i%2?0xb4ac94:0x9a947e,s*2.42,.42+i*.74,0,.55,.46,.55); m.rotation.y=i*.3; }); });
  for(let i=0;i<=10;i++){ const a=i/10*Math.PI; const m=teil(bogen,G[i%3],i%2?0xb4ac94:0xa29c86,Math.cos(a)*2.42,3.05+Math.sin(a)*2.28,0,.52,.48,.52); m.rotation.z=a; }
  ball(bogen,.3,0xe8c44a,0,5.45,.45,1,1,.5); /* Schlussstein mit Pfote aus Gold */
  ball(bogen,.1,0x7a4a14,0,5.4,.62,1.3,1,.4); [[-.15,5.53],[-.05,5.6],[.07,5.6],[.17,5.53]].forEach(([x,y])=>ball(bogen,.045,0x7a4a14,x,y,.6,1,1,.5));
  [[-2.7,3.9],[-1.7,5.25],[1.65,5.3],[2.75,3.75],[-.75,5.75],[.85,5.7]].forEach(([x,y],i)=>{ ball(bogen,.36,i%2?MOOS:BLATT2,x,y,.15,1.3,.65,1); for(let j=0;j<3;j++) blatt(bogen,.7,.2,.4,.6,j%2?BLATT:BLATT2,x,y+.1,.3,(x<0?Math.PI:0)+j*.7-.7,false); });
  [[-2.4,.1],[2.4,.1]].forEach(([x])=>{ ball(bogen,.4,MOOS,x,.1,.4,1.3,.5,1); });
  schattenNur(bogen,0xb4ac94,0x9a947e); verschmelze(bogen);
  /* zwei kleine warme Laternen zeigen den Weg */
  [-1,1].forEach(s=>{ const l=gruppe(sc,GX+s*2.35,2.55,GZ+.84); box(l,.34,.07,.34,HOLZ2,0,.28,0); kegel(l,.28,.2,HOLZ2,0,.4,0); box(l,.26,.42,.26,basis(0xffe48a),0,.04,0); [-1,1].forEach(a=>[-1,1].forEach(b=>box(l,.04,.48,.04,HOLZ2,a*.14,.04,b*.14))); box(l,.34,.07,.34,HOLZ2,0,-.22,0); ohneSchatten(l); verschmelze(l); schein(sc,'rgba(255,215,110,.55)',GX+s*2.35,2.6,GZ+1.05,1.2); });
  /* die Lianen: jede Strähne hängt oben am Bogen und wandert beim Öffnen zur Seite */
  const oben=x=>3.05+Math.sqrt(Math.max(0,4.2-x*x))*1.0;
  const straehnen=[];
  [-1,1].forEach(s=>{ for(let i=0;i<7;i++){
      const x0=s*(.14+i*.275), h=oben(x0), z0=(i%2)*.14-.02, g=gruppe(sc,GX+x0,h,GZ+z0), r=gruppe(g,0,0,0);
      const n=Math.ceil(h/.34); let a=[0,0,0];
      for(let j=1;j<=n;j++){ const b=[Math.sin(j*1.4+i*2+s)*.07,-(h-.06)*j/n,Math.sin(j*.9+i)*.04]; strich(r,a,b,.05,0x35701f);
        [-1,1].forEach(v=>{ const m=ball(r,.17,(i%2?[BLATT,BLATT4]:[BLATT2,BLATT3])[(j+(v>0?1:0))%2],b[0]+v*.11,b[1]+(v>0?.17:0),b[2]+.06+(v>0?.02:0),1.05,.72,.32); m.rotation.z=v*.65; });
        a=b; }
      if(i%3===1){ const y=-h*.34-i*.12; ball(r,.09,0xffe03a,.05,y,.18,1,1,.6); ball(r,.04,0xd8701a,.05,y,.24); }
      verschmelze(r); ohneSchatten(r);
      straehnen.push({g,x0,h,s,i,z0,x1:s*(1.98-(6-i)*.058)});
  } });
  /* goldenes Zahlenschloss an einer Kette, über Kopfhöhe */
  const schloss=gruppe(sc,GX,2.75,GZ+.55), sr=gruppe(schloss,0,0,0);
  [-1,1].forEach(s=>{ for(let i=0;i<6;i++){ const u=i/5, l=ring(sr,.12,.035,0x8a929c,s*(.65+u*1.35),.08+u*u*.45,-.04-u*.04); if(i%2) l.rotation.x=1.2; } });
  const z=ZOO.zahlenschloss(sr,0,0,0); z.scale.set(1.35,1.35,1.35);
  verschmelze(sr);
  /* Weg ins Helle hinter dem Bogen */
  const hin=gruppe(sc,GX,0,0);
  walze(hin,1,.03,0xecd69a,0,-.005,-15.2).scale.set(1.9,.03,2.1);
  walze(hin,1,.03,0xfaeab4,.35,.006,-17.8).scale.set(1.6,.03,2);
  walze(hin,1,.03,0xfff6d4,-.15,.017,-20.2).scale.set(1.25,.03,1.8);
  [-1,1].forEach(s=>{ for(let i=0;i<5;i++){ const x=s*(2.9+(i%2)*.5+i*.12), zz=-14.5-i*1.5; ball(hin,.75-(i%2)*.15,i%2?BLATT2:BLATT4,x,.45,zz,1,.85,1); for(let j=0;j<5;j++) blatt(hin,1.1,.3,.9,.9,j%2?BLATT2:BLATT4,x,.6,zz,(s>0?0:Math.PI)+j*.8-1.6,false); ball(hin,.12,i%2?0xffd83a:0xffffff,x-s*.65,.7,zz+.2); } });
  ohneSchatten(hin); verschmelze(hin);
  const lt=bild(256,256,g=>{ const v=g.createRadialGradient(128,170,6,128,160,128); v.addColorStop(0,'rgba(255,255,240,1)'); v.addColorStop(.4,'rgba(255,240,170,.95)'); v.addColorStop(.75,'rgba(255,214,110,.55)'); v.addColorStop(1,'rgba(255,200,90,0)'); g.fillStyle=v; g.fillRect(0,0,256,256); });
  const hell=new THREE.Mesh(new THREE.PlaneGeometry(7.6,7.4),new THREE.MeshBasicMaterial({map:lt,transparent:true,depthWrite:false,fog:false})); hell.position.set(GX,2.4,-19.6); hell.visible=false; sc.add(hell);
  const glut=schein(sc,'rgba(255,240,170,.9)',GX,1.9,-15.4,5); glut.visible=false;
  const licht=new THREE.PointLight(0xffe29a,0,10,1.5); licht.position.set(GX,2.6,-14.2); sc.add(licht);
  const funken=[0,1,2,3,4,5,6].map(i=>{ const f=schein(sc,'rgba(255,250,200,1)',GX,1,-15,.3); f.visible=false; return f; });
  let tuer=null;
  tuer=ausgang(k,{ steh:[GX,GZ+2.5], durch:[GX,GZ-2.5], treffer:{x:GX,y:2.5,z:GZ+.35,b:4.6,h:5,t:1}, name:'Lianenvorhang', einfach:'Lianenvorhang', schildOben:[GX,4.5,GZ+1], glanz:[GX,2.75,GZ+1.05],
    bewege:(auf,zeit)=>{ const t=zeit||0, schwung=Math.sin(Math.min(1,auf)*Math.PI);
      straehnen.forEach(q=>{ const x=q.x0+(q.x1-q.x0)*auf, h=oben(Math.min(Math.abs(x),1.9)); q.g.position.x=GX+x; q.g.position.y=h; q.g.position.z=GZ+q.z0+auf*(q.i%3)*.05; q.g.scale.y=h/q.h;
        q.g.rotation.z=q.s*schwung*.17+Math.sin(t*1.4+q.i*1.3+q.s)*.012*(1-auf*.5); });
      schloss.visible=!(tuer && tuer.offen);
      licht.intensity=auf*1.5; hell.visible=glut.visible=auf>.02; hell.material.opacity=auf; glut.material.opacity=auf;
      funken.forEach((f,i)=>{ f.visible=auf>.1; const p=(t*.3+i*.143)%1; f.position.set(GX+Math.sin(i*2.4+t)*1.2,.4+p*2.8,GZ-.8-(i%3)*.7); const s=.18+Math.sin(p*Math.PI)*.28; f.scale.set(s,s,1); }); } });
  k.kasten(GX,GZ+.1,4,.6); [-1,1].forEach(s=>k.kreis(GX+s*2.42,GZ+.05,.62));
  return tuer;
}

/* ---------- Mauerschmuck: Moos, Ranken, Blüten ---------- */
function mauerschmuck(h){
  [[h.hinten,0],[h.links,1],[h.rechts,2]].forEach(([w,n])=>{ const g=gruppe(w,0,0,0);
    const anz=n?17:21;
    for(let i=0;i<anz;i++){
      const u=(i+.3+zufall()*.4)/anz;
      if(!n){ const x=-17.6+u*35.2; if(Math.abs(x-GX)<3.4 || Math.abs(x+11.4)<3.6) continue; ranke(g,x,-13.46,0,i); }
      else { const z=-13+u*26.4, x=(n===1?-1:1)*17.96; ranke(g,x,z,n===1?1:-1,i); }
    }
    ohneSchatten(g); verschmelze(g); });
  function ranke(g,x,z,seite,i){
    const quer=seite===0, nx=quer?0:seite, nz=quer?1:0;
    ball(g,.34+zufall()*.18,i%2?MOOS:0x4a8a30,x,1.88,z-(quer?.22:0),quer?1.5:.7,.42,quer?.7:1.5);
    if(i%2===0){ const n=2+(i%3); for(let j=0;j<n;j++){ const o=Math.sin(j*2+i)*.14, y=1.65-j*.34; ball(g,.15,j%2?BLATT:BLATT2,x+(quer?o:nx*.02),y,z+(quer?nz*.02:o),quer?1.15:.4,.75,quer?.4:1.15); } }
    if(i%4===1) ball(g,.12,[0xffd83a,0xff7a2a,0xffffff][i%3],x+nx*.08,1.75,z+nz*.08);
  }
}

/* ---------- Urwald rund um das Gehege ---------- */
function urwald(k){
  const sc=k.scene, staemme=[], kronen=[], blaetter=[], lianen=[], bluet=[];
  const F=[BLATT,BLATT2,BLATT3,0x3a9a44,0x5ab048];
  const baum=(x,z,h,r,i)=>{ staemme.push([x,h/2,z,.3+r*.07,h,.3+r*.07,i%2?STAMM:STAMM2]);
    [[0,0,0,1],[-.75,-.25,.2,.7],[.78,-.18,-.2,.72],[.1,.48,.1,.66],[.2,-.35,.7,.55]].forEach(([a,b,c,s],j)=>kronen.push([x+a*r,h+b*r,z+c*r,r*s,r*s*.7,r*s,F[(i+j)%5]]));
    for(let j=0;j<7;j++){ const a=j*.9+i; blaetter.push([x+Math.cos(a)*r*.7,h-.2,z-Math.sin(a)*r*.7,r*1.25,r,r,F[(i+j+1)%5],0,a,0]); }
    if(i%2) { const l=h*.5; lianen.push([x+r*.65,h-l/2,z+r*.4,.045,l,.045,0x3a7a24]); for(let j=0;j<4;j++) kronen.push([x+r*.65,h-l+j*l/5,z+r*.4,.18,.13,.1,F[j%5]]); } };
  const busch=(x,z,s,i)=>{ kronen.push([x,s*.35,z,s*.8,s*.6,s*.8,F[i%5]]); for(let j=0;j<6;j++){ const a=j*1.05+i; blaetter.push([x,s*.35,z,s*1.5,s*1.25,s*1.4,F[(i+j)%5],0,a,0]); } if(i%3===0) bluet.push([x+s*.4,s*.95,z+s*.4,.17,.17,.17,[0xffd83a,0xff6a2a,0xffffff,0xe8342a][i%4]]); };
  /* hinten: zwei Baumreihen, vor dem hellen Weg bleibt es frei */
  let n=0;
  for(let x=-30;x<=31;x+=4.3){ n++; const zz=-18.4-(n%3)*1.2; if(Math.abs(x-GX)>5.2) baum(x+(zufall()-.5),zz,4.4+(n%4)*.8,2+(n%3)*.35,n); baum(x+2,-26-(n%2)*3,6.5+(n%3)*1.4,3+(n%2)*.5,n+3); baum(x-1+(zufall()*2),-36-(n%3)*2,8+(n%3)*1.5,4,n+1); }
  for(let x=-19;x<=19.5;x+=1.45){ n++; if(Math.abs(x-GX)<4.2) continue; busch(x,-15.6-(n%3)*.5,.8+(n%4)*.16,n); }
  /* Seiten: hinten hohe Bäume (weit außen), vorne niedriges Dickicht */
  [-1,1].forEach(v=>{ for(let z=-17;z<=4;z+=4.2){ n++; baum(v*(26.8+(n%3)*1.4),z,4.6+(n%4)*.7,2.2+(n%3)*.3,n); baum(v*(33+(n%2)*3),z+2,6+(n%3),3.2,n+2); }
    for(let z=-15;z<=17;z+=1.7){ n++; busch(v*(20.2+(n%3)*.5),z,.8+(n%4)*.14,n); busch(v*(22.8+(n%2)),z+.8,z>6?1:1.5,n+2); }
    for(let z=6;z<=30;z+=3.6){ n++; busch(v*(27+(n%3)*2.5),z,1.5+(n%3)*.3,n); } });
  for(let x=-20;x<=20.5;x+=1.8){ n++; busch(x,15.3+(n%3)*.6,.6+(n%4)*.1,n); if(n%2) busch(x+.7,19+(n%3),.9,n+1); }
  for(let x=-30;x<=30;x+=3.8){ n++; busch(x,24+(n%3)*2,1.4+(n%3)*.35,n); }
  const weiss=()=>new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide});
  instanzen(sc,GEO.cyl,weiss(),staemme.concat(lianen));
  instanzen(sc,GEO.sph,weiss(),kronen.concat(bluet));
  instanzen(sc,blattGeo(1,.3,.55,.65),weiss(),blaetter);
  /* Felsen im Dickicht */
  const g=gruppe(sc,0,0,0), G=felsGeo(19);
  [[-21,-13,1.3],[21.5,-10,1.5],[-1.5,-16.8,1.1],[-23,3,1.2],[22,8,.9],[-12,17.2,.7],[14,17,.6],[17.5,-16.5,1.4]].forEach(([x,z,s],i)=>{ teil(g,G,i%2?FELS:FELS2,x,s*.6,z,s*1.2,s,s).rotation.y=i; ball(g,s*.6,MOOS,x,s*1.4,z,1.3,.35,1); });
  ohneSchatten(g); verschmelze(g);
  /* Äffchen im Dickicht: auf Baumstümpfen hinter der Mauer */
  [[-20.4,-4.5,2,.15]].forEach(([x,z,h,d])=>{ const s=gruppe(sc,x,0,z); rohr(s,.42,.58,h,STAMM2,0,h/2,0,10); walze(s,.44,.08,HOLZ3,0,h+.02,0); for(let j=0;j<4;j++) blatt(s,.9,.25,.4,.7,j%2?BLATT:BLATT2,0,h*.7,0,j*1.6+.5,false); ohneSchatten(s); verschmelze(s);
    const a=ZOO.tier(k,'affe',sc,x,z,d,1.05,h+.04); ohneSchatten(a); });
}

/* ---------- freie Schmetterlinge (klein, über Kopfhöhe) ---------- */
function schwarm(k){
  [[-9,4,3.2,2.6,0xff8a1a,0x3a2010],[-15,2,1.8,2.4,0x3a9ae8,0xffffff],[5,2,3.4,2,0xffd82a,0xd8501a],[13,-6,2.2,2.8,0xf2f6ff,0x3a8ad8],[-2,-10.4,3,.9,0xe8482a,0xffd83a],[10,8.5,2.6,1.8,0x9a5ae0,0xffd83a]].forEach(([x,z,a,b,c,c2],i)=>{
    const f=falter(k.scene,c,c2,true); f.g.scale.set(.75,.75,.75);
    const ort=t=>{ const u=t*(.28+(i%3)*.06)+i*1.9; return [x+Math.cos(u)*a, z+Math.sin(u*1.7)*b]; };
    k.anim.push(t=>{ const p=ort(t), q=ort(t+.1); f.g.position.set(p[0],3.1+Math.sin(t*1.7+i)*.35,p[1]); f.g.rotation.y=Math.atan2(q[0]-p[0],q[1]-p[1]); f.schlag(.2+Math.sin(t*11+i)*.75); }); });
}

function baue(k){
  const h=ZOO.huelle(k,{ B, T, boden:[102,138,62], bodenStreu:24, himmelLicht:0xf0fff0, grund:0x5a6a38, staerke:.76, sonne:0xfff2cc, sonneStaerke:.5, mauer:0x95a084, stein:0x727c58, oeffnung:{x:GX,b:4.8} });
  k.scene.fog=new THREE.Fog(HIMMEL,38,88);
  bodenzier(k);
  urwald(k);
  mauerschmuck(h);
  wasserfall(k,h.hinten);
  const tuer=vorhang(k);
  ausstattung(k);
  schwarm(k);
  return { tuer, start:[1,2.6] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-16.2,6.4],[-14.6,11.2],[-11.8,3.2],[-6,11.2],[1.4,11.6],[7,8.4],[14.4,12],[16,4.8],[11.4,-1],[15.4,-6.1],[12.2,-9.8],[3.6,-9.8],[.6,-7.2],[-5.8,-10.4],[-9,-8],[-15.4,-9.4],[-12.2,-1.2],[-2.2,-2.6],[6,.8],[9.2,6.6]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-13.8, z:-5.8, steh:[-13.4,-3.4], r:1, treffer:[3,3.9,2], baue(g,k){ /* 1 Bananenstaude */
      const krone=gruppe(g,0,0,0); krone.userData.lebendig=true;
      rohr(g,.2,.34,2.8,0x8a9a3a,0,1.4,0,12); [.5,1.1,1.7,2.3].forEach((y,i)=>ring(g,.32-i*.032,.035,0x7a6a30,0,y,0).rotation.x=Q);
      const bl=gruppe(krone,0,0,0);
      [[.2,2,.62,.9,1.1],[2.9,2.1,.58,.7,1.2],[1.5,1.7,.55,1.1,.8],[2.2,1.5,.5,1.25,.7],[.85,1.6,.5,1.15,.8],[-.1,1.45,.5,.5,.8],[3.35,1.4,.48,.5,.8],[1.95,1.3,.4,.7,.9]].forEach(([a,l,br,ho,hg],i)=>blatt(bl,l,br,ho,hg,i%2?0x4aaa38:0x66bc3e,0,2.75+(i%3)*.08,0,a));
      ball(bl,.3,0x5a9a30,0,2.75,0,1,1.2,1); verschmelze(bl);
      k.anim.push(t=>{ krone.rotation.z=Math.sin(t*1.1)*.025; });
      /* große gelbe Bananen am Stiel nach vorn */
      strich(g,[0,2.65,.1],[.12,2.5,.62],.09,0x6a7a24); strich(g,[.12,2.5,.62],[.15,1.15,.78],.08,0x6a7a24);
      /* drei Büschel mit je vier Bananen: links und rechts vom Stiel, versetzt, damit man jede Sichel von der Seite sieht */
      const bg=bananenGeo(), spitze=bananenPunkt(1);
      [2.3,1.84,1.38].forEach((y,e)=>{ const z=.65+e*.05; ball(g,.1,0x7a8a24,.14,y-.06,z,1,1.6,1);
        [[.18,0],[-.5,-.2],[Math.PI-.18,-.02],[Math.PI+.5,-.22]].forEach(([dreh,tief])=>{ const h=gruppe(g,.14,y+tief,z); h.rotation.y=dreh+(e-1)*.07;
          form(h,bg,0xffe232,0,0,0); ball(h,.036,0x7a8a24,.005,.002,0); ball(h,.025,0x5a5214,spitze[1]+.012,spitze[2]+.012,0); }); });
      strich(g,[.15,1.15,.78],[.17,.9,.84],.04,0x6a7a24); const k2=kegel(g,.17,.42,0x8a2a58,.17,.68,.85); k2.rotation.x=Math.PI;
      [[-.5,.3],[.55,-.2],[-.1,-.55]].forEach(([x,z],i)=>blatt(g,.7,.22,.5,.4,BLATT,x,.04,z,i*2.2+2,false)); 
      schattenNur(g,0x8a9a3a,0x4aaa38,0xffe232); } },
  { x:-3.6, z:-8.8, steh:[-3,-6.8], kasten:[3.6,1.7], treffer:[4,3.9,1.8], baue(g,k){ /* 2 Faultierbaum */
      rohr(g,.28,.46,4.3,STAMM,-1.35,2.15,0,12); for(let i=0;i<5;i++){ const a=i*1.257; ball(g,.22,STAMM2,-1.35+Math.cos(a)*.4,.09,Math.sin(a)*.4,1.4,.5,.8).rotation.y=-a; }
      [[.9,.1],[2,-.12],[3,.08]].forEach(([y,x])=>ball(g,.12,STAMM2,-1.35+x,y,.34,.8,1.6,.5));
      strich(g,[-1.35,3.0,0],[.2,3.1,0],.19,STAMM2); strich(g,[.2,3.1,0],[1.95,3.2,0],.16,STAMM2); ball(g,.16,STAMM2,.2,3.1,0); ball(g,.17,HOLZ3,1.97,3.2,0,.5,1,1);
      [[2,3.45,.34],[2.15,3.22,.26],[-1.35,4.35,.55],[-.8,4.15,.4],[-1.75,3.9,.4]].forEach(([x,y,r],i)=>ball(g,r,i%2?BLATT2:BLATT,x,y,-.12,1.2,.8,1));
      const krone=gruppe(k.scene,-3.6-1.35,0,-8.8-.25);
      [[0,4.75,0,.95],[-.85,4.35,0,.65],[.8,4.55,-.15,.7],[.1,5.3,-.1,.6]].forEach(([x,y,z,r],i)=>{ ball(krone,r,[BLATT,BLATT2,BLATT3,BLATT][i],x,y,z,1.15,.7,1); });
      for(let i=0;i<7;i++){ const a=i*.9; blatt(krone,1.5,.36,.5,.9,i%2?BLATT:BLATT2,0,4.55,0,a,false); }
      verschmelze(krone); k.verdecker(krone,-4.95,-9.05,1.6);
      /* das Faultier hängt mit vier Beinen unter dem Ast */
      const f=gruppe(g,.35,3.12,0); f.userData.lebendig=true; const r=gruppe(f,0,0,0);
      const FE=0xa48a68, FD=0x806848, GE=0xf0ddb8, DU=0x4a3220;
      ball(r,.5,FE,.18,-.88,0,1.35,.88,.9); ball(r,.38,FD,.34,-1.05,.04,1.3,.68,.9);
      for(let i=0;i<14;i++){ const a=i*2.4; ball(r,.1,i%2?FD:0xb89e7a,.18+Math.cos(a)*.5,-.88+Math.sin(a)*.3,.34,1.2,.55,.5).rotation.z=a*.3; }
      /* Arme und Beine greifen um den Ast */
      [[-.25,-.62,.34,-.48],[.55,-.62,.34,.7],[-.1,-.65,-.32,-.2],[.75,-.65,-.32,1.0]].forEach(([x,y,z,x2])=>{ const ax=x2+.35, ay=(ax<.2?3+(ax+1.35)/1.55*.1:3.1+(ax-.2)/1.5*.08)-3.12; /* Höhe des Astes an dieser Stelle */
        const knie=[(x+x2)/2+(x2>x?.12:-.12),-.28,z*1.05], hand=[x2,ay+.08,z*.72];
        strich(r,[x,y,z],knie,.13,FE); ball(r,.13,FE,knie[0],knie[1],knie[2]); strich(r,knie,hand,.11,FE); ball(r,.13,FD,hand[0],hand[1],hand[2]);
        [-.09,0,.09].forEach(d=>{ ring(r,.215,.028,0xfff4dc,x2+d,ay+.015,0,Math.PI*.98).rotation.y=Q; }); });
      /* Kopf mit freundlichem Gesicht, blickt nach vorn */
      const kopf=gruppe(f,-.52,-1.02,.3); kopf.userData.lebendig=true; const kk=gruppe(kopf,0,0,0);
      ball(kk,.42,FE,0,0,0,1.05,1,.95); ball(kk,.34,GE,0,-.02,.17,1.05,.92,.8);
      [-1,1].forEach(s=>{ const m=ball(kk,.15,DU,s*.17,.03,.39,1.35,.65,.35); m.rotation.z=-s*.5; ball(kk,.065,0x120a04,s*.13,.06,.445); ball(kk,.022,basis(0xffffff),s*.13-.02,.085,.505); });
      ball(kk,.075,0x2a180c,0,-.09,.46,1.3,.85,.7); const mund=ring(kk,.11,.018,0x4a2a18,0,-.17,.42,Math.PI*.8); mund.rotation.z=Math.PI*1.1;
      for(let i=0;i<5;i++) ball(kk,.1,FD,-.2+i*.1,.36,.08,1,.7,1);
      verschmelze(kk); verschmelze(r);
      k.anim.push(t=>{ f.rotation.x=Math.sin(t*.7)*.07; kopf.rotation.z=Math.sin(t*.5)*.16; kopf.rotation.y=Math.sin(t*.31)*.25; }); 
      schattenNur(g,STAMM,STAMM2,0xa48a68); } },
  { x:-5.6, z:3, steh:[-5.5,5.1], kasten:[2.7,1.5], treffer:[3.4,2.1,1.6], dreh:-.15, baue(g,k){ /* 3 Gießkanne */
      const F=0x2a8ad8, D=0x175a98, H=0x6ab8f0;
      rohr(g,.6,.68,1.1,F,-.25,.58,0,24); walze(g,.71,.09,D,-.25,.08,0); ring(g,.61,.065,H,-.25,1.14,0).rotation.x=Q; ring(g,.65,.04,D,-.25,.66,0).rotation.x=Q;
      walze(g,.57,.03,0x0c3450,-.25,1.1,0); walze(g,.54,.012,0x5ac0e8,-.25,1.123,0);
      const deckel=form(g,new THREE.CylinderGeometry(.62,.62,.07,18,1,false,Math.PI,Math.PI),F,-.25,1.17,0); deckel.receiveShadow=true; box(g,.05,.07,1.22,D,-.25,1.175,0);
      /* Bügelgriff oben und Griff hinten */
      const o=ring(g,.52,.08,D,-.3,1.17,0,Math.PI); o.scale.y=1.05;
      const hi=ring(g,.38,.08,D,-.86,.66,0,Math.PI); hi.rotation.z=Q;
      /* langes Rohr mit Brause */
      strich(g,[.3,.32,0],[1.12,1.18,0],.125,F); ball(g,.17,D,.38,.4,0); strich(g,[.5,.98,0],[.85,.9,0],.04,D);
      const br=gruppe(g,1.2,1.27,0); br.rotation.z=-.8; rohr(br,.3,.13,.28,F,0,.07,0,18); walze(br,.31,.05,0xd8e4ec,0,.23,0); ring(br,.31,.03,D,0,.23,0).rotation.x=Q;
      ball(br,.03,0x24323c,0,.262,0); for(let i=0;i<6;i++){ ball(br,.028,0x24323c,Math.cos(i*1.047)*.11,.262,Math.sin(i*1.047)*.11); ball(br,.028,0x24323c,Math.cos(i*1.047+.5)*.22,.262,Math.sin(i*1.047+.5)*.22); }
      ball(g,.2,0xffffff,-.25,.62,.62,1,1.2,.2); ball(g,.12,H,-.25,.58,.655,1,1,.2); kegel(g,.105,.16,H,-.25,.7,.665).scale.z=.02;
      const w=basis(0x9ae0ff,{transparent:true,opacity:.85});
      const tr=[0,1,2].map(i=>{ const t=ball(g,.06,w,1.5,1.2,0,1,1.4,1); t.castShadow=false; return t; });
      k.anim.push(t=>tr.forEach((d,i)=>{ const p=(t*.8+i/3)%1; d.position.set(1.45+p*.18+(i-1)*.05,1.38-p*p*1.25,(i-1)*.1); })); 
      schattenNur(g,0x2a8ad8,0x175a98); } },
  { x:-9.2, z:-1.5, steh:[-9.2,.7], kasten:[2.5,1.7], treffer:[2.5,3.5,1.7], baue(g,k){ /* 4 Schmetterlingskasten */
      [-1,1].forEach(a=>[-1,1].forEach(b=>{ box(g,.16,.86,.16,HOLZ2,a*.9,.43,b*.55); box(g,.19,1.7,.19,HOLZ,a*.98,1.78,b*.62); }));
      box(g,1.7,.1,.1,HOLZ2,0,.34,.55);
      box(g,2.2,.2,1.5,HOLZ,0,.92,0); box(g,2.24,.14,1.54,HOLZ,0,2.6,0); box(g,1.9,.05,1.18,0x9ad06a,0,1.045,0);
      box(g,.07,1.55,.05,HOLZ,0,1.78,-.64); box(g,1.9,1.5,.03,0xe8f8e8,0,1.78,-.61);
      const pyr=new THREE.ConeGeometry(1,1,4,1,false,Math.PI/4).toNonIndexed(); pyr.computeVertexNormals(); form(g,pyr,0xc8862a,0,3.02,0).scale.set(1.72,.72,1.2); ball(g,.12,0xe8c04a,0,3.43,0);
      const gl=mat(0xd0f4ff,{transparent:true,opacity:.16,depthWrite:false});
      box(g,1.8,1.5,.02,gl,0,1.8,.63).castShadow=false; [-1,1].forEach(s=>box(g,.02,1.5,1.1,gl,s*.99,1.8,0).castShadow=false);
      [-.35,.4].forEach((y,i)=>strich(g,[-.55+i*.1,1.78+y,.67],[-.25+i*.1,2.08+y,.67],.012,0xffffff));
      /* Zweige mit Blättern und Blüten */
      [[-.65,1.55,-.3],[.7,1.75,-.25],[.1,1.35,-.4]].forEach(([x,y,z],i)=>{ strich(g,[x*.8,1.06,z],[x,y,z],.025,0x4a7a28); [-1,1].forEach(s=>ball(g,.14,BLATT2,x+s*.13,y-.18,z,1.2,.45,.7).rotation.z=s*.5); for(let j=0;j<5;j++) ball(g,.07,0xffd83a,x+Math.cos(j*1.257)*.09,y+Math.sin(j*1.257)*.09,z+.02,1,1,.5); ball(g,.05,0xe0601a,x,y,z+.06); });
      /* fünf Falter mit Abstand zueinander, sicher innerhalb von Glas und Pfosten */
      [[-.48,2.26,0xff8a14,0x3a1a08,.65],[.46,2.24,0x2a7ae8,0xaee8ff,.65],[0,1.78,0xe8402a,0xffe040,.7],[.52,1.32,0xffd21a,0x7a3a08,.6],[-.52,1.33,0x9a4ad8,0xffd8f0,.6]].forEach(([x,y,c,c2,s],i)=>{
        const halter=gruppe(g,x,y,.08); halter.userData.lebendig=true; halter.rotation.x=1.15; const f=falter(halter,c,c2); f.g.scale.set(s,s,s);
        k.anim.push(t=>{ halter.position.set(x+Math.sin(t*.9+i*2)*.05,y+Math.sin(t*1.6+i)*.04,.08); f.g.rotation.y=Math.PI+(i%2?.25:-.22)+Math.sin(t*.7+i)*.15; f.schlag(.15+Math.abs(Math.sin(t*(3+i%3)+i))*.55); }); });
      schattenNur(g,HOLZ,0xc8862a); } },
  { x:1, z:-3.9, steh:[1,-1.9], kasten:[3,1.3], treffer:[3,3.9,1.4], baue(g,k){ /* 5 Papageienschaukel */
      [-1,1].forEach(s=>{ box(g,.5,.16,1.15,HOLZ2,s*1.2,.08,0); walze(g,.11,3.6,HOLZ,s*1.2,1.85,0); ball(g,.17,0xe8c04a,s*1.2,3.7,0); strich(g,[s*1.2,.15,.5],[s*1.2,.8,0],.06,HOLZ2); strich(g,[s*1.2,.15,-.5],[s*1.2,.8,0],.06,HOLZ2); strich(g,[s*1.2,2.9,0],[s*.7,3.48,0],.06,HOLZ2); });
      walze(g,.11,2.7,HOLZ2,0,3.48,0).rotation.z=Q;
      const pendel=gruppe(g,0,3.45,0); pendel.userData.lebendig=true; const sw=gruppe(pendel,0,0,0);
      [-1,1].forEach(s=>{ strich(sw,[s*.72,0,0],[s*.72,-2.1,0],.032,0xe8cc8a); ring(sw,.12,.035,0xc8a860,s*.72,0,0).rotation.y=Q; ball(sw,.08,0xc8a860,s*.72,-2.1,0); });
      walze(sw,.08,1.68,HOLZ3,0,-2.1,0).rotation.z=Q;
      const vogel=gruppe(sw,0,-2.1,0), ROT=0xe8281e, BLAU=0x1e6ad8, GELB=0xffc81e;
      ball(vogel,.4,ROT,0,.5,-.02,.95,1.3,.85); ball(vogel,.27,0xff6a4a,0,.4,.19,.9,1.25,.7);
      [-1,1].forEach(s=>{ const f=gruppe(vogel,s*.35,.58,-.03); f.rotation.z=s*.24; ball(f,.24,ROT,0,.1,0,.6,1,1); ball(f,.24,GELB,s*.03,-.12,.01,.62,.95,.95); ball(f,.24,BLAU,s*.05,-.37,-.01,.55,1.25,.85);
        /* Füße greifen um die Stange */
        [-.07,.07].forEach(d=>{ const z=ring(vogel,.105,.035,0x6a6a70,s*.17+d,.02,0,Math.PI*1.25); z.rotation.y=Q; }); });
      [[0,BLAU,1.25,0],[-.13,ROT,1.0,-.2],[.13,ROT,1.0,.2]].forEach(([x,c,l,n])=>{ const f=gruppe(vogel,x,.1,-.2); f.rotation.z=n; f.rotation.x=.22; ball(f,.1,c,0,-l*.45,0,.9,l*5,.4); });
      const kopf=gruppe(vogel,0,1.13,.07); kopf.userData.lebendig=true; const kk=gruppe(kopf,0,0,0);
      ball(kk,.32,ROT,0,0,0);
      [-1,1].forEach(s=>{ ball(kk,.15,0xfffaf0,s*.17,.03,.22,.9,1,.6).rotation.y=s*.55; ball(kk,.062,0x120a04,s*.19,.07,.3); ball(kk,.022,basis(0xffffff),s*.19-.018,.092,.355); });
      ball(kk,.15,0xffe6a8,0,.0,.34,.85,.8,1); const sp=kegel(kk,.12,.3,0xffd878,0,-.08,.45); sp.rotation.x=Math.PI-.55; ball(kk,.08,0x3a3030,0,-.17,.35,.8,.7,1);
      [[0,.37,-.02,0],[-.1,.33,-.07,.4],[.1,.33,-.07,-.4]].forEach(([x,y,z,n])=>{ ball(kk,.06,GELB,x,y,z,.7,2,.7).rotation.z=n; });
      verschmelze(kk); verschmelze(vogel); verschmelze(sw);
      k.anim.push(t=>{ pendel.rotation.x=Math.sin(t*1.5)*.09; kopf.rotation.z=Math.sin(t*2.1)*.2; kopf.rotation.y=Math.sin(t*.8)*.45; }); 
      schattenNur(g,HOLZ,0xe8281e,0x1e6ad8); } },
  { x:9.6, z:-2.5, steh:[9.6,-.4], kasten:[2.8,1.7], treffer:[2.8,2.8,1.7], baue(g,k){ /* 6 Froschterrarium */
      const R=0x2a3238;
      box(g,2.15,.62,1.25,0x9a9488,0,.31,0); box(g,2.45,.18,1.5,0xbab4a4,0,.71,0); [-.55,.55].forEach(x=>box(g,.9,.36,.04,0x7e786c,x,.31,.635));
      box(g,2.3,.18,1.35,R,0,.89,0); box(g,2.14,.05,1.2,0x6a4a24,0,1.0,0);
      [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.1,1.45,.1,R,a*1.1,1.68,b*.62)));
      [-.62,.62].forEach(z=>box(g,2.3,.13,.11,R,0,2.43,z)); [-1.1,1.1,-.37,.37].forEach(x=>box(g,.08,.08,1.2,R,x,2.45,0)); box(g,.4,.1,.14,0xe8b820,0,2.53,.3);
      box(g,2.16,1.36,.03,0x6ac4a8,0,1.68,-.61);
      const gl=mat(0xc4fff0,{transparent:true,opacity:.14,depthWrite:false});
      box(g,2.14,1.38,.02,gl,0,1.69,.63).castShadow=false; [-1,1].forEach(s=>box(g,.02,1.38,1.18,gl,s*1.11,1.69,0).castShadow=false);
      walze(g,1,.05,0x3ab4e0,.62,1.05,.2).scale.set(.42,.05,.34);
      ball(g,.55,0x8a8e84,-.15,1.04,.08,1.25,.38,.85);
      [[-.88,-.35,0],[.85,-.4,2],[-.4,-.42,4]].forEach(([x,z,i])=>{ for(let j=0;j<5;j++) blatt(g,.45,.13,.55+(j%2)*.3,.3,j%2?0x2a7a30:0x3a9a3a,x,1.02,z,j*1.26+i,false); });
      /* großer grüner Frosch */
      const f=gruppe(g,-.15,1.22,.14), GR=0x52d42a, GD=0x2a9a1a, BA=0xe8f890;
      ball(f,.38,GR,0,.25,-.08,1.15,.85,1); ball(f,.33,GR,0,.5,.13,1.3,.82,.92); ball(f,.26,BA,0,.2,.2,1.2,.85,.7);
      [-1,1].forEach(s=>{ ball(f,.27,GD,s*.44,.13,-.08,.9,.65,1.35); ball(f,.1,GR,s*.57,.02,.22,1.5,.45,1.8); strich(f,[s*.26,.28,.2],[s*.34,.02,.42],.07,GR); [-.11,0,.11].forEach(d=>ball(f,.05,GR,s*.34+d,.015,.5));
        ball(f,.17,GR,s*.23,.74,.18); ball(f,.13,0xffffff,s*.23,.77,.28); ball(f,.065,0x10180a,s*.23,.77,.39); ball(f,.022,basis(0xffffff),s*.23-.022,.8,.45);
        ball(f,.07,0xff8a6a,s*.32,.47,.38,1.2,.7,.4); ball(f,.016,0x1a5a10,s*.06,.6,.43); });
      const mund=ring(f,.21,.022,0x1a5a10,0,.6,.43,Math.PI*.7); mund.rotation.z=Math.PI*1.15;
      [[-.22,.5,-.28],[.2,.55,-.2],[.02,.57,-.35]].forEach(p=>ball(f,.07,GD,p[0],p[1],p[2],1,.45,1));
      const kehle=gruppe(g,-.15,1.45,.46); kehle.userData.lebendig=true; ball(kehle,.14,0xf4ffb0,0,0,0,1.35,.75,.7); verschmelze(kehle);
      k.anim.push(t=>{ const s=1+Math.max(0,Math.sin(t*3.2))*.35*(Math.sin(t*.7)>0?1:.15); kehle.scale.set(s,s,s); }); 
      schattenNur(g,0x2a3238,0xbab4a4); } },
  { x:12.4, z:7.1, steh:[12.2,9.1], r:.95, treffer:[2.2,2.8,1.7], baue(g){ /* 7 Orchideentopf */
      const TO=0xc8602e, TD=0x9a4420;
      rohr(g,.72,.5,.95,TO,0,.48,0,22); walze(g,.8,.2,TO,0,1.0,0); ring(g,.76,.045,0xe0824a,0,1.1,0).rotation.x=Q; ring(g,.58,.03,TD,0,.45,0).rotation.x=Q; walze(g,.7,.03,0x4a2e18,0,1.105,0);
      [[.15,1.0,.75],[2.95,.95,.7],[-1.2,.8,.45],[1.9,.8,.5],[.9,.6,.6]].forEach(([a,l,h],i)=>blatt(g,l,.27,h,.6,i%2?0x1f7a34:0x2f8e3c,0,1.12,0,a));
      const bluete=(x,y,z,s,c,n)=>{ const b=gruppe(g,x,y,z); b.rotation.z=n; b.rotation.x=-.35; b.scale.set(s,s,s);
        [[0,.17,0,.85,1.35],[-.19,.04,.008,1.5,1.05],[.19,.04,.008,1.5,1.05],[-.12,-.14,-.008,.9,1.25],[.12,-.14,-.008,.9,1.25]].forEach(([a,bb,cc,sx,sy])=>ball(b,.13,c,a,bb,cc,sx,sy,.28));
        ball(b,.085,0xa8147a,0,-.07,.07,1,1.25,.7); ball(b,.055,0xffd822,0,.02,.1); ball(b,.025,0xffffff,0,.06,.14); };
      const stiel=P=>{ for(let i=1;i<P.length;i++){ strich(g,P[i-1],P[i],.035,0x5a8a2a); ball(g,.038,0x5a8a2a,P[i][0],P[i][1],P[i][2]); } };
      stiel([[-.1,1.1,0],[-.22,1.9,.02],[-.5,2.4,.1],[-.9,2.45,.15]]); stiel([[.12,1.1,-.05],[.2,2.1,-.05],[.5,2.6,.05],[.92,2.55,.15]]);
      bluete(-.28,1.95,.18,1.1,0xf45ab8,.15); bluete(-.6,2.38,.24,1.05,0xff86d0,-.1); bluete(-.98,2.28,.28,.85,0xf45ab8,.3);
      bluete(.18,1.7,.2,1,0xff86d0,-.15); bluete(.34,2.28,.16,1.15,0xf45ab8,.1); bluete(.72,2.62,.18,1,0xff86d0,-.2); bluete(1.02,2.4,.28,.8,0xf45ab8,-.35);
      ball(g,.08,0xe070b0,-1.1,2.12,.3,.8,1.1,.8); strich(g,[0,1.1,.12],[.05,2.6,.1],.022,HOLZ3); 
      schattenNur(g,0xc8602e,0x2f8e3c); } },
  { x:3.9, z:6.2, steh:[3.9,8.6], kasten:[3,2.4], treffer:[3.2,1.7,2.4], dreh:-.55, baue(g,k){ /* 8 Landschildkröte */
      const PA=0x7a5a24, PL=0xc89a3e, HA=0xa8b45a, HD=0x7e8a3e;
      const halb=new THREE.SphereGeometry(1,28,12,0,Math.PI*2,0,Math.PI/2);
      form(g,halb,PA,-.15,.45,0).scale.set(1.15,.92,.95);
      walze(g,1,.1,0xe0bc66,-.15,.42,0).scale.set(1.15,.1,.95);
      for(let i=0;i<16;i++){ const a=i*.3927; ball(g,.2,i%2?PL:0xb0822e,-.15+Math.cos(a)*1.14,.47,Math.sin(a)*.94,1,.55,1); }
      /* sechseckige Hornplatten auf dem Panzer */
      const sechs=new THREE.CylinderGeometry(.82,1,1,6);
      const platte=(w,phi,r)=>{ const nx=Math.sin(phi)*Math.cos(w), ny=Math.cos(phi), nz=Math.sin(phi)*Math.sin(w);
        const m=gruppe(g,-.15+nx*1.15,.45+ny*.92,nz*.95); m.quaternion.setFromUnitVectors(V(0,1,0),V(nx/1.15,ny/.92,nz/.95).normalize());
        form(m,sechs,PL,0,.005,0).scale.set(r,.09,r); form(m,sechs,0x94681e,0,.045,0).scale.set(r*.55,.05,r*.55); form(m,sechs,0xe4bc60,0,.068,0).scale.set(r*.24,.035,r*.24); };
      platte(0,.001,.34); for(let i=0;i<6;i++) platte(i*1.047,.6,.29); for(let i=0;i<11;i++) platte(i*.571+.25,1.12,.23);
      /* kräftige Beine mit hellen Krallen */
      [[.6,.66,.35],[.6,-.66,-.35],[-.85,.66,-.4],[-.85,-.66,.4]].forEach(([x,z,d])=>{ strich(g,[x,.5,z*.85],[x+d*.4,.14,z*1.2],.22,HA); ball(g,.25,HA,x+d*.4,.15,z*1.2,1.15,.65,1);
        [-.13,0,.13].forEach(v=>ball(g,.055,0xf4ecd0,x+d*.4+.27,.07,z*1.2+v)); ball(g,.07,HD,x+d*.2,.42,z*1.22,1,.7,.4); });
      kegel(g,.13,.42,HA,-1.45,.42,0).rotation.z=Q;
      const kopf=gruppe(g,.85,.55,0); kopf.userData.lebendig=true; const kk=gruppe(kopf,0,0,0);
      strich(kk,[0,0,0],[.55,.28,0],.2,HA); ball(kk,.21,HA,.3,.15,0); ball(kk,.34,HA,.68,.42,0,1.15,.95,1);
      [-1,1].forEach(s=>{ ball(kk,.12,0xffffff,.84,.54,s*.2); ball(kk,.065,0x14100a,.93,.55,s*.23); ball(kk,.022,basis(0xffffff),.975,.58,s*.22); ball(kk,.075,0xf09a70,.89,.34,s*.25,.7,.6,.7); ball(kk,.02,0x3a4a1a,1.06,.43,s*.06); /* lächelnder Mund auf der Kopffläche */ strich(kk,[1.028,.37,s*.15],[1.054,.337,s*.078],.018,0x4a3a14); strich(kk,[1.054,.337,s*.078],[1.064,.327,0],.018,0x4a3a14); });
      verschmelze(kk);
      k.anim.push(t=>{ kopf.position.x=.85+Math.sin(t*.6)*.1; kopf.rotation.y=Math.sin(t*.45)*.28; kopf.rotation.z=Math.sin(t*.9)*.06; }); 
      schattenNur(g,0x7a5a24,0xa8b45a); } },
  { x:-12.4, z:6.8, steh:[-12.4,8.8], r:1, treffer:[2.5,2,2], baue(g){ /* 9 Gummistiefel */
      const F=0xffc414, D=0xd8960a, S=0x3a3430;
      const stiefel=(x,z,dreh,neig)=>{ const s=gruppe(g,x,0,z); s.rotation.y=dreh; s.rotation.z=neig;
        walze(s,1,.08,S,.1,.05,0).scale.set(.59,.08,.31);
        ball(s,.3,F,.1,.3,0,1.9,.85,1);
        rohr(s,.32,.28,1.1,F,-.2,.92,0,20).scale.set(1.1,1,.9);
        const rand=ring(s,.32,.035,D,-.2,1.47,0); rand.rotation.x=Q; rand.scale.set(1.1,.9,1);
        walze(s,1,.03,0x4a2e08,-.2,1.462,0).scale.set(.33,.03,.27);
        [[.299,1.22],[.307,1.32]].forEach(([rr,y])=>{ const q=ring(s,rr,.022,0xe8402a,-.2,y,0); q.rotation.x=Q; q.scale.set(1.1,.9,1); });
        strich(s,[-.03,.7,.24],[-.03,1.1,.262],.022,0xffec8a); ball(s,.09,0xffec8a,.5,.43,.15,1.2,.4,.6); };
      stiefel(-.28,-.55,.28,0); stiefel(.28,.55,.12,-.03);
      [[-.95,.3],[.95,-.45],[-.35,.85]].forEach(([x,z],i)=>ball(g,.13-i*.02,0x6a4a28,x,.02,z,1.5,.25,1.1)); 
      schattenNur(g,0xffc414); } },
  { x:14, z:.9, steh:[13.7,2.9], r:.7, treffer:[2.3,3,2], baue(g){ /* 10 Tropenhut auf einem Pfosten */
      const H=0xead9a8, H2=0xd4bc80, BD=0x7a4a20;
      walze(g,.14,1.9,HOLZ,0,.95,0); [.5,1.2].forEach(y=>ring(g,.145,.022,HOLZ2,0,y,0).rotation.x=Q);
      for(let i=0;i<7;i++){ const a=i*.898; teil(g,felsGeo(51+i,0,.25),i%2?FELS:FELS3,Math.cos(a)*.34,.14,Math.sin(a)*.34,.22,.19,.22); }
      const hut=gruppe(g,0,1.98,0); hut.rotation.x=.17; hut.rotation.z=-.1;
      rohr(hut,.72,1.1,.17,H,0,0,0,28); walze(hut,1.1,.045,H2,0,-.105,0); ring(hut,1.1,.04,H2,0,-.09,0).rotation.x=Q;
      const kuppel=form(hut,new THREE.SphereGeometry(.7,26,14,0,Math.PI*2,0,Math.PI/2),H,0,.08,0); kuppel.scale.y=1.08;
      rohr(hut,.69,.73,.2,BD,0,.18,0,28); ring(hut,.725,.022,0xe8b84a,0,.14,0).rotation.x=Q;
      for(let i=0;i<6;i++){ const rippe=ring(hut,.704,.014,H2,0,.08,0,Math.PI/2); rippe.rotation.y=i*1.047; rippe.scale.y=1.08; }
      walze(hut,.13,.1,H2,0,.86,0); ball(hut,.09,BD,0,.93,0);
      box(hut,.2,.16,.06,0xe8b84a,0,.18,.725); ball(hut,.04,BD,0,.18,.765);
      [[-.5,.3],[.55,-.25],[.35,.5]].forEach(([x,z],i)=>blatt(g,.55,.17,.35,.3,i%2?BLATT:BLATT2,x,.04,z,i*2.1+.5,false)); 
      schattenNur(g,HOLZ,0xead9a8); } }
];

return { titel:'Das Urwald-Gehege', himmel:HIMMEL, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 2: Das Robben-Gehege. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das Schleusentor links in der hinteren Mauer; das Metalltor fährt nach oben, dahinter führt ein Steg über das Wasser. */
RAEUME3D.zoo[1] = (function(){
const { HOLZ, HOLZ2, GOLD, tier, viele, zahlenschloss, huelle } = ZOO;
const B=36, T=27, Q=Math.PI/2;
const AX=-9;                                     /* Mitte des Schleusentors */
const P={ l:-3, r:11.5, v:-4.6, h:-13.5 };       /* Außenkanten des großen Beckens */
const WY=.4;                                     /* Höhe der Wasserfläche im Becken */
const FELS=0x96969c, FELS2=0x7a7c86, FELS3=0xb0aca4, STEIN=0xc4beb0, STEIN2=0xaaa494;
const BLATT=0x2f9a48, BLATT2=0x58b848, STAMM=0xa8743c, STAMM2=0x86582a;
const WEISS=0xf8f8f4, ROT=0xe0382c, EISEN=0x3c464e, METALL=0x6c8a9c, METALL2=0x4e6878, MESSING=0xd8a640;
const doppel=c=>mat(c,{side:THREE.DoubleSide});

/* ---------- Grundformen ---------- */
/* kantiger Fels: unregelmäßig verformter Vielflächner */
function felsGeo(saatF,stufe,rau){
  const geo=new THREE.IcosahedronGeometry(1,stufe===undefined?1:stufe), p=geo.attributes.position, r=rau||.3;
  for(let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i), h=Math.sin(Math.round(x*50)*1.29+Math.round(y*50)*7.82+Math.round(z*50)*3.77+saatF)*4375.8, f=1+(h-Math.floor(h)-.5)*r; p.setXYZ(i,x*f,y*f,z*f); }
  geo.computeVertexNormals(); return geo;
}
function form(par,geo,m,x,y,z,sx,sy,sz){ const t=new THREE.Mesh(geo,typeof m==='number'?mat(m):m); t.position.set(x,y,z); if(sx!==undefined) t.scale.set(sx,sy,sz); t.castShadow=true; t.receiveShadow=true; par.add(t); return t; }
function ohneSchatten(g){ g.traverse(m=>{ m.castShadow=false; }); }
/* großes Blatt: zeigt nach +x, biegt sich nach unten, gezackter Rand */
function wedel(par,laenge,breite,hoch,haengt,farbe,x,y,z,dreh){
  const N=9, Pk=[], pkt=i=>{ const s=i/N, w=breite*Math.sin(Math.PI*Math.min(.96,s*.9+.06))*(i%2?1:.66); return [s*laenge, hoch*s-haengt*s*s, w]; };
  for(let i=0;i<N;i++){ const a=pkt(i), b=pkt(i+1), ya=a[1]-a[2]*.28, yb=b[1]-b[2]*.28;
    Pk.push(a[0],a[1],0, b[0],b[1],0, b[0]+.1,yb,-b[2]);  Pk.push(a[0],a[1],0, a[0]+.1,ya,-a[2], b[0]+.1,yb,-b[2]);
    Pk.push(a[0],a[1],0, b[0]+.1,yb,b[2], b[0],b[1],0);   Pk.push(a[0],a[1],0, a[0]+.1,ya,a[2], b[0]+.1,yb,b[2]); }
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(Pk,3)); geo.computeVertexNormals();
  const m=form(par,geo,doppel(farbe),x,y,z); m.rotation.y=dreh||0; return m;
}
/* fünfzackiger Seestern, liegt in der x/y-Ebene, Blick nach +z */
function seestern(par,r,farbe,hell,x,y,z,rx,ry,rz){
  const g=gruppe(par,x,y,z); g.rotation.set(rx,ry,rz);
  const f=new THREE.Shape(); for(let i=0;i<=10;i++){ const a=Math.PI/2+i*Math.PI/5, q=i%2?r*.4:r; if(i) f.lineTo(Math.cos(a)*q,Math.sin(a)*q); else f.moveTo(Math.cos(a)*q,Math.sin(a)*q); }
  form(g,new THREE.ExtrudeGeometry(f,{depth:r*.14,bevelEnabled:true,bevelThickness:r*.1,bevelSize:r*.07,bevelSegments:2}),farbe,0,0,0);
  ball(g,r*.22,farbe,0,0,r*.2,1,1,.55);
  for(let i=0;i<5;i++){ const a=Math.PI/2+i*Math.PI*.4; [.3,.52,.73].forEach((q,j)=>ball(g,r*(.075-j*.014),hell,Math.cos(a)*r*q,Math.sin(a)*r*q,r*(.3-j*.02))); }
  return g;
}
/* Fächermuschel mit Rippen, steht in der x/y-Ebene, Fuß bei y=0 */
function muschel(par,R,farbe,rippe,x,y,z,rx,ry,rz){
  const m=gruppe(par,x,y,z); m.rotation.set(rx,ry,rz); const N=12, Pk=[];
  const pkt=(i,s)=>{ const a=-1.3+i/N*2.6, r=R*s*(1-.1*(a/1.3)*(a/1.3))*(s===1&&i%2===0?1.06:1), tz=s===0?0:(s<1?.24*R:.05*R)+(i%2?.07*R:0)*s; return [Math.sin(a)*r,Math.cos(a)*r,tz]; };
  for(let i=0;i<N;i++){ const h=pkt(0,0), a=pkt(i,.58), b=pkt(i+1,.58), e=pkt(i,1), f=pkt(i+1,1); Pk.push(...h,...b,...a, ...a,...b,...f, ...a,...f,...e); }
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(Pk,3)); geo.computeVertexNormals();
  form(m,geo,doppel(farbe),0,0,0);
  for(let i=1;i<N;i+=2){ const a=pkt(i,.58), e=pkt(i,1); strich(m,[0,.02,.02],[a[0],a[1],a[2]+.012],.017,rippe); strich(m,[a[0],a[1],a[2]+.012],[e[0],e[1],e[2]+.012],.017,rippe); }
  box(m,R*.55,R*.17,R*.14,rippe,0,0,.01); return m;
}
/* Seelöwen-Körper zusammenfassen; gibt die Kopfgruppe zurück */
function seeloeweFest(huelleG){
  const t=huelleG.children[0], kopf=t.children.find(c=>c.isGroup);
  if(kopf){ verschmelze(kopf); kopf.userData.lebendig=true; }
  verschmelze(t); return kopf;
}

/* ---------- Texturen ---------- */
function wasserBild(){
  return bild(256,256,g=>{ g.fillStyle='#2ea6d8'; g.fillRect(0,0,256,256);
    for(let i=0;i<70;i++){ const x=zufall()*256, y=zufall()*256, r=10+zufall()*26; g.fillStyle=i%2?'rgba(20,110,180,.22)':'rgba(120,220,240,.2)';
      [-256,0,256].forEach(dx=>[-256,0,256].forEach(dy=>{ g.beginPath(); g.ellipse(x+dx,y+dy,r,r*.5,0,0,6.283); g.fill(); })); }
    g.lineCap='round'; g.lineWidth=3;
    for(let i=0;i<46;i++){ const x=zufall()*256, y=zufall()*256, l=16+zufall()*30; g.strokeStyle='rgba(235,252,255,'+(.3+zufall()*.4)+')';
      [-256,0,256].forEach(dx=>[-256,0,256].forEach(dy=>{ g.beginPath(); g.moveTo(x+dx,y+dy); g.quadraticCurveTo(x+dx+l/2,y+dy-7,x+dx+l,y+dy); g.stroke(); })); } });
}

/* ---------- großes Wasserbecken mit Felsen, Wasserfall und schwimmenden Seelöwen ---------- */
function becken(k){
  const sc=k.scene, g=gruppe(sc,0,0,0), mx=(P.l+P.r)/2, mz=(P.h+P.v)/2, w=P.r-P.l, t=P.v-P.h;
  const wt=wasserBild(); wt.wrapS=wt.wrapT=THREE.RepeatWrapping; wt.repeat.set(3,2);
  const was=new THREE.Mesh(new THREE.PlaneGeometry(w-.6,t-.3),new THREE.MeshLambertMaterial({map:wt,emissive:0x0a3048})); was.rotation.x=-Math.PI/2; was.position.set(mx,WY,mz-.1); was.receiveShadow=true; sc.add(was);
  /* Rand aus hellen Steinblöcken */
  const rand=[];
  const reihe=(x1,z1,x2,z2)=>{ const l=Math.hypot(x2-x1,z2-z1), n=Math.round(l/1.05), quer=Math.abs(x2-x1)>Math.abs(z2-z1);
    for(let i=0;i<n;i++){ const x=x1+(x2-x1)*(i+.5)/n, z=z1+(z2-z1)*(i+.5)/n, h=.55+(i%3)*.025; rand.push([x,h/2,z,quer?l/n-.05:.52,h,quer?.52:l/n-.05,i%2?STEIN:STEIN2]); rand.push([x,h+.05,z,quer?l/n-.12:.64,.1,quer?.64:l/n-.12,0xe0dac8]); } };
  reihe(P.l,P.v-.3,P.r,P.v-.3); reihe(P.l+.28,P.h,P.l+.28,P.v-.58); reihe(P.r-.28,P.h,P.r-.28,P.v-.58);
  viele(sc,GEO.box,rand).castShadow=true;
  /* blaue Kacheln vorn */
  const kachel=[]; for(let i=0;i<28;i++) kachel.push([P.l+.35+i*(w-.7)/27,.27,P.v-.025,.32,.2,.03,i%2?0x2a7ab8:0x58c0d8]);
  viele(sc,GEO.box,kachel);
  k.kasten(mx,(P.h+P.v)/2,w,t);
  /* Felsinseln im Wasser */
  const G=[felsGeo(2),felsGeo(7),felsGeo(11)];
  [[10,-11.8,1],[-1.35,-12.3,.85]].forEach(([x,z,s],i)=>{
    form(g,G[i],FELS,x,.45,z,1.1*s,.75*s,.95*s); form(g,G[(i+1)%3],FELS3,x-.4*s,.95*s,z-.2,.6*s,.55*s,.55*s); form(g,G[(i+2)%3],FELS2,x+.65*s,.42,z+.4*s,.45*s,.35*s,.45*s);
    for(let j=0;j<6;j++) wedel(g,.8*s,.16,.9,.8,j%2?BLATT:BLATT2,x-.4*s,1.35*s,z-.2,j*1.05+i); });
  /* Felsen mit Wasserfall hinten in der Mitte */
  const wx=4.2;
  [[-1.75,.9,.85,1.3],[1.75,.8,.9,1.2],[-1.15,2.05,.7,.75],[1.2,1.95,.65,.7],[0,1,.9,1.4],[-2.7,.55,.65,.65],[2.75,.5,.7,.6]].forEach(([x,y,sx,sy],i)=>form(g,G[i%3],[FELS,FELS2,FELS3][i%3],wx+x,y,-13.25+(i===4?-.35:0),sx,sy,.62));
  walze(g,1,.2,FELS3,wx,2.28,-13.2).scale.set(1.15,.2,.5); walze(g,1,.06,0x7ad4f0,wx,2.4,-13.1).scale.set(.75,.06,.38);
  [[-1.4,2.75],[1.5,2.55],[-2.6,1.2]].forEach(([x,y],i)=>{ for(let j=0;j<6;j++) wedel(g,.75,.15,.8,.75,j%2?BLATT:BLATT2,wx+x,y,-13.15,j*1.05+i); });
  verschmelze(g);
  const ft=bild(128,256,c=>{ c.fillStyle='#74cdee'; c.fillRect(0,0,128,256); for(let i=0;i<90;i++){ const x=zufall()*122, y=zufall()*256, l=22+zufall()*50; c.fillStyle=i%3?'rgba(255,255,255,.8)':'rgba(40,130,200,.5)'; c.fillRect(x,y,3+(i%3),l); c.fillRect(x,y-256,3+(i%3),l); } });
  ft.wrapS=ft.wrapT=THREE.RepeatWrapping;
  const fall=new THREE.Mesh(new THREE.PlaneGeometry(1.35,2.05),new THREE.MeshBasicMaterial({map:ft})); fall.position.set(wx,1.38,-12.55); fall.rotation.x=-.12; sc.add(fall);
  /* Wellen, Gischt und Spritzer */
  const N=46, wellen=new THREE.InstancedMesh(GEO.box,basis(0xe4f8ff),N), o=new THREE.Object3D(), W=[];
  for(let i=0;i<N;i++) W.push({ x:P.l+1+zufall()*(w-2.4), z:P.v-.9-zufall()*(t-2.4), p:zufall()*6, l:.35+zufall()*.6 });
  wellen.frustumCulled=false; sc.add(wellen);
  const gischt=new THREE.InstancedMesh(GEO.sph,basis(0xffffff),12); gischt.frustumCulled=false; sc.add(gischt);
  const tropf=new THREE.InstancedMesh(GEO.sph,basis(0xd8f6ff),20); tropf.frustumCulled=false; sc.add(tropf);
  /* zwei springende Fische */
  const fische=[[2.2,-8.9,0,0xf28a2a,0xffc21a],[5.2,-8.2,2.3,0xf2d23a,0xf28a2a]].map(([x,z,ph,c,c2])=>{
    const f=gruppe(sc,x,0,z), l=gruppe(f,0,0,0); ball(l,.22,c,0,0,0,1.7,.85,.55); const s=kegel(l,.2,.3,c2,-.46,0,0); s.rotation.z=-Q; s.scale.z=.06; ball(l,.07,c2,0,.18,0,1.6,.8,.3); [-1,1].forEach(v=>ball(l,.035,0x101018,.24,.05,v*.1)); verschmelze(l); ohneSchatten(l); return { f, l, x, z, ph }; });
  k.anim.push(zt=>{
    wt.offset.x=zt*.018; wt.offset.y=Math.sin(zt*.4)*.04; ft.offset.y=zt*.9;
    W.forEach((p,i)=>{ const s=Math.max(0,Math.sin(zt*1.5+p.p)); o.position.set(p.x+Math.sin(zt*.6+p.p)*.35,WY+.018,p.z); o.rotation.set(0,0,0); o.scale.set(p.l*s+.01,.012,.05); o.updateMatrix(); wellen.setMatrixAt(i,o.matrix); }); wellen.instanceMatrix.needsUpdate=true;
    for(let i=0;i<12;i++){ const s=.08+Math.abs(Math.sin(zt*4+i*1.7))*.13; o.position.set(wx-.8+i*.146,WY+.04+Math.sin(zt*5+i)*.04,-12.2+(i%3)*.16); o.scale.set(s,s*.75,s); o.updateMatrix(); gischt.setMatrixAt(i,o.matrix); } gischt.instanceMatrix.needsUpdate=true;
    fische.forEach((q,j)=>{ const p=((zt+q.ph)%4.6)/1.2, da=p<1; q.f.visible=da; if(da){ q.f.position.set(q.x+p*1.6-.8,WY-.15+Math.sin(p*Math.PI)*1.25,q.z); q.l.rotation.z=(.5-p)*2.1; }
      const r=((zt+q.ph)%4.6)-1.2, nass=r>0&&r<.7;
      for(let i=0;i<10;i++){ const a=i*.628, s=nass?.065*(1-r/.7)+.001:.001; o.position.set(q.x+.8+(nass?Math.cos(a)*r*.9:0),WY+(nass?Math.sin(r/.7*Math.PI)*.55:-.2),q.z+(nass?Math.sin(a)*r*.7:0)); o.scale.set(s,s*1.3,s); o.updateMatrix(); tropf.setMatrixAt(j*10+i,o.matrix); } });
    tropf.instanceMatrix.needsUpdate=true; });
  /* schwimmende Seelöwen auf einem Rundkurs */
  [0,Math.PI].forEach((ph,i)=>{
    const s=tier(k,'seeloewe',sc,4.5,-8.5,0,i?.58:.66,-.15); seeloeweFest(s); ohneSchatten(s);
    const kreisW=new THREE.Mesh(new THREE.RingGeometry(.82,1,28),basis(0xeafaff,{transparent:true,opacity:.6,depthWrite:false})); kreisW.rotation.x=-Math.PI/2; sc.add(kreisW);
    k.anim.push(zt=>{ const a=zt*.34+ph, x=4.5+Math.cos(a)*5, z=-8.5+Math.sin(a)*2.5, dx=-Math.sin(a)*5, dz=Math.cos(a)*2.5;
      s.position.set(x,-.17+Math.sin(zt*1.8+i*2)*.1,z); s.rotation.y=Math.atan2(-dz,dx);
      const p=(zt*.8+i*.5)%1, r=.55+p*.65; kreisW.position.set(x,WY+.03+i*.008,z); kreisW.scale.set(r*1.5,r*.8,1); kreisW.rotation.z=s.rotation.y; kreisW.material.opacity=.55*(1-p); }); });
}

/* ---------- Ausgang: Schleusentor mit Handrad ---------- */
function schleuse(k){
  const sc=k.scene, rahmen=gruppe(sc,AX,0,-13.35);
  [-1,1].forEach(s=>{ const x=s*2.48;
    box(rahmen,.72,.5,.9,FELS2,x,.25,.05); box(rahmen,.5,5.9,.55,STEIN,x,2.95,0); box(rahmen,.66,.22,.72,FELS2,x,6,0); ball(rahmen,.24,MESSING,x,6.3,0);
    [.95,2.55,3.1,4.7,5.4].forEach(y=>box(rahmen,.56,.09,.61,STEIN2,x,y,0));
    box(rahmen,.1,5.7,.12,EISEN,s*2.19,2.9,.16);
    k.kreis(AX+x,-13.15,.45); });
  box(rahmen,5.5,.5,.35,METALL2,0,3.72,.31); box(rahmen,5.6,.1,.45,EISEN,0,4.0,.31);
  [-2.3,-1.5,1.5,2.3].forEach(x=>ball(rahmen,.08,MESSING,x,3.72,.5));
  /* goldener Fisch als Zeichen über dem Tor */
  ball(rahmen,.28,GOLD,.1,3.74,.55,1.7,.75,.4); const fs=kegel(rahmen,.22,.34,GOLD,-.52,3.74,.55); fs.rotation.z=-Q; fs.scale.z=.1; ball(rahmen,.04,0x20140a,.36,3.8,.67);
  verschmelze(rahmen);
  /* das Torblatt, fährt nach oben */
  const tor=gruppe(sc,AX,0,-13.45), blatt=gruppe(tor,0,0,0);
  box(blatt,4.3,3.35,.2,METALL,0,1.73,0);
  [.2,1.1,2.9,3.3].forEach(y=>box(blatt,4.34,.18,.1,METALL2,0,y,.13));
  [-2.05,2.05].forEach(x=>box(blatt,.18,3.35,.09,METALL2,x,1.73,.125));
  [-1.9,-1.25,-.6,.05,.7,1.35,1.9].forEach(x=>[.2,1.1,2.9,3.3].forEach(y=>ball(blatt,.05,0xb8d0dc,x,y,.17)));
  /* blaue Wellen auf dem Tor */
  [.46,.76].forEach((y,j)=>{ for(let i=0;i<6;i++) ring(blatt,.26,.045,j?0x9ae4f4:0x3ac0e0,.0+i*.5-.62+(j?.25:0),y,.14,Math.PI); });
  verschmelze(blatt);
  const rad=gruppe(sc,AX-2.48,1.6,-12.86);
  ring(rad,.6,.095,ROT,0,0,0); for(let i=0;i<3;i++){ const a=i*Math.PI/3; strich(rad,[-Math.cos(a)*.6,-Math.sin(a)*.6,0],[Math.cos(a)*.6,Math.sin(a)*.6,0],.05,ROT); } for(let i=0;i<6;i++){ const a=i*Math.PI/3; ball(rad,.1,0xb82418,Math.cos(a)*.68,Math.sin(a)*.68,0); }
  ball(rad,.17,MESSING,0,0,.06,1,1,.7); walze(rad,.1,.24,EISEN,0,0,-.12).rotation.x=Q; verschmelze(rad);
  const schloss=zahlenschloss(tor,.75,2.2,.3); schloss.scale.setScalar(1.3); verschmelze(schloss);
  const halter=gruppe(tor,0,0,0); box(halter,1.5,.14,.1,EISEN,.75,2.2,.13); [.05,1.45].forEach(x=>ball(halter,.1,MESSING,x,2.2,.18,1,1,.6));
  let tuer=null;
  tuer=ausgang(k,{ steh:[AX,-11.2], durch:[AX,-15.8], treffer:{x:AX,y:2.1,z:-13,b:4.6,h:4.2,t:1}, name:'Schleusentor', einfach:'Tor am Wasser', schildOben:[AX,4.5,-12.7], glanz:[AX+.75,2.4,-12.7],
    bewege:auf=>{ tor.position.y=auf*3; rad.rotation.z=-auf*Math.PI*4; schloss.visible=!(tuer && tuer.offen); halter.visible=schloss.visible; } });
  k.kasten(AX,-13.35,4.6,.7);
  return tuer;
}

/* ---------- Landschaft hinter und neben der Mauer ---------- */
function landschaft(k){
  const sc=k.scene, G=felsGeo(5), g=gruppe(sc,0,0,0);
  /* Meer hinter der Mauer */
  const mt=wasserBild(); mt.wrapS=mt.wrapT=THREE.RepeatWrapping; mt.repeat.set(10,2.4);
  const meer=new THREE.Mesh(new THREE.PlaneGeometry(76,14),new THREE.MeshLambertMaterial({map:mt,emissive:0x0a3048})); meer.rotation.x=-Math.PI/2; meer.position.set(0,.004,-21.2); sc.add(meer);
  k.anim.push(t=>{ mt.offset.x=-t*.012; });
  /* Steg hinter dem Schleusentor */
  const steg=[]; for(let i=0;i<26;i++) steg.push([AX,-.03,-14.0-i*.55,4.1,.1,.47,i%2?0xb88a50:0xa0743e]);
  viele(sc,GEO.box,steg);
  [-1,1].forEach(s=>{ for(let i=0;i<6;i++){ walze(g,.12,1.1,HOLZ2,AX+s*2.15,.55,-14.6-i*2.6); ball(g,.15,MESSING,AX+s*2.15,1.15,-14.6-i*2.6); } strich(g,[AX+s*2.15,.95,-14.6],[AX+s*2.15,.95,-27.6],.06,HOLZ); });
  walze(g,1,.2,0x74b850,AX,-.03,-31).scale.set(9,.2,5);
  walze(g,1,.2,0xe4cc92,AX,-.012,-28.5).scale.set(3.6,.2,2);
  verschmelze(g); ohneSchatten(g);
  /* Gras seitlich außen und ganz hinten */
  const wiese=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(130,180),mat(0x78b852)); m.rotation.x=-Math.PI/2; m.position.set(s*85.5,-.006,61.8); m.receiveShadow=true; wiese.add(m); });
  const fern=new THREE.Mesh(new THREE.PlaneGeometry(320,130),mat(0x68aa4a)); fern.rotation.x=-Math.PI/2; fern.position.set(0,-.002,-93.2); wiese.add(fern);
  /* Felsen (instanziert) */
  const felsen=[];
  for(let i=0;i<46;i++){ const x=-33+i*1.5+zufall(), z=-29-zufall()*5, h=2+zufall()*3.2; if(Math.abs(x-AX)<5.5) continue; felsen.push([x,h*.35,z,1.4+zufall()*1.4,h,1.2+zufall(),[FELS,FELS2,FELS3][i%3],zufall()*6]); }
  for(let i=0;i<22;i++){ const x=-17+i*1.65+zufall(), s=.35+zufall()*.7; if(Math.abs(x-AX)<3.8) continue; felsen.push([x,s*.35,-15.2-zufall()*1.2,s*1.3,s,s,i%2?FELS:FELS3,i]); }
  [-1,1].forEach(v=>{ for(let i=0;i<20;i++){ const s=.35+zufall()*.8; felsen.push([v*(19.8+zufall()*3),s*.4,-18+i*1.7+zufall(),s*1.2,s,s,[FELS,FELS3,FELS2][i%3],i]); } });
  const f=viele(sc,G,felsen); f.receiveShadow=false;
  /* Bäume und Büsche (instanziert) */
  const staemme=[], kronen=[], blumen=[];
  const baum=(x,z,s)=>{ staemme.push([x,s*1.1,z,.22*s,2.2*s,.22*s,0x8a5a30]); [[0,2.8,0,1.35],[-.75,2.35,.25,.9],[.8,2.45,-.2,.95],[.1,3.6,.1,.9]].forEach(([a,b,c,r],j)=>kronen.push([x+a*s,b*s,z+c*s,r*s,r*s*.85,r*s,[0x3f9a48,0x2f8438,0x58b04a][j%3]])); };
  for(let i=0;i<22;i++){ const x=-34+i*3.2+zufall()*1.5, z=-35-zufall()*9; baum(x,z,1+zufall()*.7); }
  [-14.5,-3.2].forEach((x,i)=>baum(x,-30-i,1.2));
  [-1,1].forEach(v=>{ for(let i=0;i<13;i++){ baum(v*(23+(i%3)*3.6+zufall()*2),-22+i*3+zufall()*1.5,.75+zufall()*.55); }
    for(let i=0;i<26;i++){ const x=v*(19.3+zufall()*9), z=-17+zufall()*35, s=.3+zufall()*.55; kronen.push([x,s*.6,z,s*1.2,s*.85,s,i%2?0x48a040:0x2f8a3a]); if(i%2===0) blumen.push([x,s*1.4,z+s*.5,.14,.12,.14,[0xff6a9a,0xffd23a,0xffffff][i%3]]); } });
  for(let i=0;i<22;i++){ const x=-19+i*1.8+zufall(), z=16.5+zufall()*5, s=.25+zufall()*.35; kronen.push([x,s*.5,z,s*1.3,s*.8,s,i%2?0x48a040:0x2f8a3a]); blumen.push([x+.2,s*1.25,z,.12,.1,.12,[0xff6a9a,0xffd23a,0xffffff][i%3]]); }
  viele(sc,GEO.cyl,staemme); viele(sc,GEO.sph,kronen); viele(sc,GEO.sph,blumen);
  /* Wolken */
  const wolken=[[-34,9,-34],[-12,11,-46],[16,9.5,-40],[36,10,-24],[-40,8,-4]].map(([x,y,z],i)=>{ const w=gruppe(sc,x,y,z), m=basis(0xffffff);
    [[0,0,1.9],[1.9,-.35,1.4],[-2,-.4,1.35],[.7,.7,1.25]].forEach(([a,b,r])=>ball(w,r,m,a,b,0,1.2,.7,.8)); verschmelze(w); ohneSchatten(w); return [w,x,i]; });
  k.anim.push(t=>wolken.forEach(([w,x,i])=>{ w.position.x=x+Math.sin(t*.06+i*2)*5; }));
}

/* ---------- Palme ---------- */
function palme(k,x,z,h,nx,nz,start){
  const g=gruppe(k.scene,x,0,z), stamm=gruppe(g,0,0,0), N=8;
  const ort=i=>{ const s=i/N; return [nx*s*s, h*s, nz*s*s]; };
  for(let i=0;i<N;i++){ const a=ort(i), b=ort(i+1), r=.3-i*.018, d=V(b[0]-a[0],b[1]-a[1],b[2]-a[2]), l=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]);
    const t=rohr(stamm,r*.82,r,l*1.05,i%2?STAMM:STAMM2,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,9); t.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); }
  walze(stamm,.55,.22,STEIN2,0,.11,0);
  verschmelze(stamm);
  const krone=gruppe(g,nx,h,nz);
  for(let i=0;i<8;i++){ const a=i*.785+start; wedel(krone,2.1+(i%3)*.22,.44,1.35-(i%2)*.5,1.8,i%2?BLATT:BLATT2,0,.05+(i%2)*.08,0,a); }
  ball(krone,.3,0x6a8a28,0,0,0,1,.8,1); verschmelze(krone);
  k.kreis(x,z,.55); k.verdecker(g,x+nx,z+nz,2.2);
  k.anim.push(t=>{ krone.rotation.z=Math.sin(t*.9+start)*.045; krone.rotation.x=Math.sin(t*.67+start*2)*.035; });
}

/* flache Blüten mit zwei Blättchen, liegen im Sand */
function bluetenFlach(par,orte){
  const L=[];
  orte.forEach(([x,z],i)=>{ const c=[0xff7aa8,0xffd23a,0xb478e0][i%3];
    [-1,1].forEach(v=>L.push([x+v*.17,.014,z+.06,.15,.012,.065,0x4a9a38,v*.5+i]));
    for(let j=0;j<5;j++){ const a=j*1.2566+i; L.push([x+Math.cos(a)*.085,.032,z+Math.sin(a)*.085,.085,.016,.05,c,-a]); }
    L.push([x,.05,z,.045,.025,.045,i%3===1?0xe8701a:0xffe03a]); });
  viele(par,GEO.sph,L);
}
/* unregelmäßiger flacher Fleck auf dem Boden */
function fleck(par,x,z,rx,rz,y,material,start){
  const f=new THREE.Shape();
  for(let i=0;i<=28;i++){ const a=(i%28)/28*Math.PI*2, q=1+.24*Math.sin(3*a+start)+.13*Math.sin(5*a+start*2.3), px=Math.cos(a)*rx*q, py=Math.sin(a)*rz*q; if(i) f.lineTo(px,py); else f.moveTo(px,py); }
  const m=form(par,new THREE.ShapeGeometry(f),material,x,y,z); m.rotation.x=-Q; m.castShadow=false; return m;
}
/* Pfützen, Flossenspuren und Grasinseln auf der vorderen Sandfläche */
function vorplatz(sc){
  const g=gruppe(sc,0,0,0);
  [[-2.3,4.5,.95,.6,1],[4.7,7.5,1.2,.75,3.2],[-.4,10.3,.8,.5,5],[7.6,.9,.8,.5,2],[-6.8,.4,.65,.45,4.1],[10.2,9.2,.75,.5,.4]].forEach(([x,z,rx,rz,p])=>{
    fleck(g,x,z,rx*1.22,rz*1.25,.002,mat(0xc2a674),p); fleck(g,x,z,rx,rz,.014,mat(0x6cc0dc),p);
    [[-.25,-.12,.35],[.2,.18,.22]].forEach(([a,b,l])=>strich(g,[x+a*rx-l*rx*.5,.02,z+b*rz],[x+a*rx+l*rx*.5,.02,z+b*rz],.014,0xd8f4ff)); });
  /* Spuren von Flossen: abwechselnd links und rechts */
  const spur=new THREE.Shape(); spur.moveTo(-.22,-.04); spur.quadraticCurveTo(0,-.1,.12,-.2); spur.lineTo(.16,-.08); spur.lineTo(.28,-.05); spur.lineTo(.19,.03); spur.lineTo(.24,.15); spur.quadraticCurveTo(0,.09,-.22,.04); spur.lineTo(-.22,-.04);
  const spurGeo=new THREE.ShapeGeometry(spur);
  [[-1.4,4.1,-4.7,6.3],[3.6,7,.8,3.3],[5.8,8.2,9.2,10.4],[6.9,1.3,3.9,1]].forEach(([x1,z1,x2,z2])=>{
    const dx=x2-x1, dz=z2-z1, l=Math.hypot(dx,dz), n=Math.floor(l/.55), w=Math.atan2(-dz,dx);
    for(let i=1;i<=n;i++){ const v=i%2?1:-1, t=i/(n+1), m=form(g,spurGeo,mat(0xbc9e6a),x1+dx*t-dz/l*v*.27,.006+(i%2)*.001,z1+dz*t+dx/l*v*.27); m.rotation.set(-Q,0,w-v*.35); m.castShadow=false; } });
  /* Grasinseln */
  const halme=[], bl=[];
  [[-.9,6.6,.8],[4,5.5,.65],[8.9,11.3,.5],[-7.5,6.9,.75],[1.9,11.4,.7],[10.9,6.9,.65],[-5.6,11.3,.6],[6.5,10.9,.45],[-4.6,1,.55]].forEach(([x,z,s],i)=>{
    fleck(g,x,z,s,s*.7,.009+(i%2)*.001,mat(0x8abc50),i*1.7);
    for(let j=0;j<22;j++){ const a=j*2.4, q=Math.sqrt(j/22)*s*.85, h=.16+(j%4)*.07; halme.push([x+Math.cos(a)*q,h*.45,z+Math.sin(a)*q*.65,.04,h,.04,j%2?0x58a040:0x78b040]); }
    bl.push([x+s*.65,z+s*.35],[x-s*.5,z+s*.5]); });
  viele(sc,GEO.cone,halme); bluetenFlach(sc,bl);
  verschmelze(g); ohneSchatten(g);
}

/* ---------- Ausstattung im Gehege ---------- */
function bank(k,x,z,dreh){
  const g=gruppe(k.scene,x,0,z); g.rotation.y=dreh;
  [-.22,.04,.3].forEach(v=>box(g,2.1,.1,.22,0x2a9a8a,0,.66,v)); [1.0,1.3].forEach(y=>box(g,2.1,.2,.09,0x2a9a8a,0,y,-.38));
  [-.88,.88].forEach(a=>{ box(g,.14,.62,.7,EISEN,a,.31,.04); box(g,.1,.95,.1,EISEN,a,1.0,-.45); box(g,.18,.1,.75,EISEN,a,.92,.0); });
  verschmelze(g);
  const quer=Math.abs(Math.sin(dreh))>.7; k.kasten(x,z,quer?1:2.2,quer?2.2:1);
}
function laterne(k,x,z){
  const g=gruppe(k.scene,x,0,z);
  walze(g,.28,.18,EISEN,0,.09,0); walze(g,.08,2.7,0x2a5a6a,0,1.45,0); walze(g,.18,.1,MESSING,0,2.8,0);
  ball(g,.27,basis(0xfff2b0),0,3.1,0,1,1.1,1); kegel(g,.42,.28,0x2a5a6a,0,3.45,0); ball(g,.08,MESSING,0,3.64,0);
  verschmelze(g); k.kreis(x,z,.3); k.verdecker(g,x,z,.6);
}
function ausstattung(k,w){
  const sc=k.scene, g=gruppe(sc,0,0,0), G=felsGeo(9);
  /* Wellenmuster innen an der Mauer */
  const wellenband=(par,orte,quer)=>{ const im=new THREE.InstancedMesh(new THREE.TorusGeometry(.4,.075,6,10,Math.PI),mat(0x2a8ac8),orte.length), o=new THREE.Object3D();
    orte.forEach(([x,y,z],i)=>{ o.position.set(x,y,z); o.rotation.set(0,quer?Q:0,0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.frustumCulled=false; par.add(im); };
  const h=[], l=[], r=[];
  [.55,1.05].forEach((y,j)=>{
    for(let x=-17.4+j*.4;x<17.6;x+=.8){ if((x>AX-3.4 && x<AX+3.4) || (x>P.l-.4 && x<P.r+.4) || (x>13 && x<17)) continue; h.push([x,y,-13.47]); }
    for(let z=-12.9+j*.4;z<13.2;z+=.8){ if(!(z>-4.9 && z<.9)) l.push([-17.97,y,z]); r.push([17.97,y,z]); } });
  wellenband(w.hinten,h,false); wellenband(w.links,l,true); wellenband(w.rechts,r,true);
  /* Wimpelketten an den Seiten */
  const FB=[0xe8483a,0xffc21a,0x2a9ad8,0x48b858,0xb868d0];
  const kette=(par,x,z1,z2)=>{ const fahnen=[], mast=gruppe(par,0,0,0), n=Math.round((z2-z1)/.65);
    [z1,(z1+z2)/2,z2].forEach(z=>{ walze(mast,.07,3.2,HOLZ,x,1.6,z); ball(mast,.12,MESSING,x,3.24,z); });
    const ho=i=>3.1-Math.abs(Math.sin(i/n*Math.PI*2))*.45;
    for(let i=0;i<n;i++){ const z=z1+(z2-z1)*i/n, z3=z1+(z2-z1)*(i+1)/n; strich(mast,[x,ho(i),z],[x,ho(i+1),z3],.018,0x5a4a3a); fahnen.push([x,ho(i+.5)-.26,(z+z3)/2,.03,.46,.22,FB[i%5]]); }
    const im=viele(par,GEO.cone,fahnen), o=new THREE.Object3D(); fahnen.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.rotation.set(Math.PI,0,0); o.scale.set(e[3],e[4],e[5]); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); verschmelze(mast); };
  kette(w.links,-17.8,2.2,12.6); kette(w.rechts,17.8,-11.5,12.6);
  /* Büsche mit Blüten am Rand */
  const busch=[], bluete=[];
  [[-17.2,-12.2,.8],[-14.2,-12.4,.6],[-5.3,-12.5,.55],[-17.3,-7.5,.7],[-17.2,9.5,.55],[17.2,-12.3,.75],[12.5,-12.5,.55],[17.3,-4.5,.6],[17.2,6,.6],[17.2,11.8,.7],[-17.2,12.4,.75],[10.8,12.5,.55],[-8.5,12.6,.5]].forEach(([x,z,s],i)=>{
    [[0,.45,0,.75],[-.5,.3,.2,.5],[.5,.32,-.15,.52],[.05,.82,0,.45]].forEach(([a,b,c,rr],j)=>busch.push([x+a*s,b*s,z+c*s,rr*s,rr*s*.85,rr*s,j%2?0x2f8a3a:0x4aa844]));
    [[.2,1.15,.2],[-.5,.65,.5],[.55,.65,.25],[-.15,.9,.45],[.1,.5,.7]].forEach(([a,b,c])=>bluete.push([x+a*s,b*s,z+c*s,.11*s,.09*s,.11*s,[0xff5a8a,0xffd23a,0xffffff,0xff8a2a][i%4]]));
    k.kreis(x,z,.75*s); });
  viele(sc,GEO.sph,busch).castShadow=true; viele(sc,GEO.sph,bluete);
  /* Schilf an den Beckenecken und am Rand */
  const halm=[], kolben=[];
  [[-3.5,-4.9],[12,-4.9],[-3.7,-9.2],[12.1,-9.4],[-17.5,3.2],[17.5,9]].forEach(([x,z],i)=>{ for(let j=0;j<11;j++){ const a=j*2.4, rr=.08+(j%4)*.07, hh=.7+zufall()*.8, hx=x+Math.cos(a)*rr, hz=z+Math.sin(a)*rr; halm.push([hx,hh/2,hz,.035,hh,.035,j%2?0x5a9a38:0x82b848]); if(j%3===0) kolben.push([hx,hh-.04,hz,.065,.17,.065,0x7a4a24]); } k.kreis(x,z,.34); });
  viele(sc,GEO.cone,halm); viele(sc,GEO.sph,kolben);
  /* Grasbüschel, Blümchen und kleine Kiesel am Boden */
  const meiden=[[1.5,-.5,3],[-6.5,3.5,2],[8.5,6,2.2],[14.8,-1.5,2.2],[-9.5,-3,2.5],[-12.5,7.5,2.2],[14,5.5,2],[-3,9,2.2],[AX,-11.4,3]];
  const orte=(n,randig)=>{ const L=[]; let v=0; while(L.length<n && v++<3000){ const x=(zufall()-.5)*34.6, z=(zufall()-.5)*25.8; if(randig && Math.abs(x)<13.5 && z<10.5 && z>-10) continue; if(x>P.l-.8 && x<P.r+.8 && z<P.v+.8) continue; if(Math.abs(x-AX)<2 && z<-6.8) continue; if(meiden.some(m=>Math.hypot(x-m[0],z-m[1])<m[2])) continue; L.push([x,z]); } return L; };
  const gras=[]; orte(55,true).forEach(([x,z],i)=>{ for(let j=0;j<6;j++){ const a=j*1.05+i, hh=.22+zufall()*.24; gras.push([x+Math.cos(a)*.14,hh*.45,z+Math.sin(a)*.14,.045,hh,.045,i%2?0x58a040:0x8ab848]); } });
  viele(sc,GEO.cone,gras);
  bluetenFlach(sc,orte(30,true));
  viele(sc,felsGeo(4,0,.35),orte(80,false).map(([x,z],i)=>{ const s=.05+zufall()*.08; return [x,s*.4,z,s*1.2,s*.7,s,[0xa89880,0x8e8a82,0x9c8c6c][i%3],zufall()*6]; }));
  /* Holzbohlen als Weg zum Tor */
  const bohlen=[]; for(let i=0;i<10;i++) bohlen.push([AX,.012,-12.7+i*.62,3.4,.025,.5,i%2?0xb88c58:0xa87c48]);
  viele(sc,GEO.box,bohlen);
  /* niedrige Poller mit Seil vor dem Becken */
  const poller=gruppe(sc,0,0,0);
  [[3.8,6.6],[8.4,11.2]].forEach(([a,b])=>{ const n=4; for(let i=0;i<=n;i++){ const x=a+(b-a)*i/n, z=-3.5; walze(poller,.13,.8,HOLZ2,x,.4,z); ball(poller,.15,MESSING,x,.84,z,1,.7,1); if(i<n){ const x2=a+(b-a)*(i+1)/n; strich(poller,[x,.7,z],[(x+x2)/2,.5,z],.035,0xe8d8a8); strich(poller,[(x+x2)/2,.5,z],[x2,.7,z],.035,0xe8d8a8); } } k.kasten((a+b)/2,-3.5,b-a+.3,.3); });
  verschmelze(poller);
  /* Felsgruppen mit Pflanzen */
  [[-14.8,2.6,.7],[10.8,-1.2,.65],[16.2,12,.6],[-8.6,11.4,.5]].forEach(([x,z,s],i)=>{
    form(g,G,[FELS,FELS3][i%2],x,s*.55,z,s,s*.8,s*.9).rotation.y=i*1.3; form(g,G,FELS2,x+.6*s,s*.25,z+.5*s,s*.5,s*.4,s*.45).rotation.y=i;
    for(let j=0;j<6;j++) wedel(g,.6+s*.4,.15,.7,.7,j%2?BLATT:BLATT2,x-.25,.1,z-s*.75,j*1.05+i);
    k.kreis(x,z,s*1.1); });
  verschmelze(g);
  bank(k,5.4,12.1,Math.PI); bank(k,-16.6,7.7,Q); bank(k,16.5,-9,-Q);
  laterne(k,-4.2,-3.9); laterne(k,12.4,-3.8); laterne(k,2.2,12.3); laterne(k,-14.6,-6.6);
}

/* ---------- Tiere ---------- */
function ente(k,weg,gr,start,kueken){
  const g=gruppe(k.scene,0,0,0), l=gruppe(g,0,0,0); l.scale.setScalar(gr);
  const F=kueken?0xffdc3a:0xf8f6ee;
  ball(l,.36,F,0,.46,0,1.35,.85,.95); ball(l,.23,F,.38,.86,0); const s=kegel(l,.16,.34,F,-.5,.6,0); s.rotation.z=1.05;
  ball(l,.1,0xf59a1e,.62,.81,0,1.4,.5,1.1); [-1,1].forEach(v=>{ ball(l,.035,0x101010,.52,.93,v*.13); ball(l,.2,kueken?0xf2c820:0xdcd8cc,-.06,.52,v*.3,1.4,.7,.35); });
  verschmelze(l);
  const fuss=[-1,1].map(v=>{ const f=gruppe(l,0,.22,v*.14); walze(f,.035,.22,0xf59a1e,0,-.09,0); ball(f,.09,0xf59a1e,.07,-.19,0,1.4,.25,1); verschmelze(f); return f; });
  ohneSchatten(l);
  k.anim.push(t=>{ fuss.forEach((f,i)=>f.rotation.z=Math.sin(t*9+i*3.14)*.4); l.rotation.x=Math.sin(t*4.5+start)*.08; });
  laeufer(k,g,weg,.75,start,9);
}
function krabbe(k,weg,tempo,start){
  const g=gruppe(k.scene,0,0,0), l=gruppe(g,0,0,0); l.rotation.y=Q; const R=0xe8602a;
  const r=gruppe(l,0,0,0); ball(r,.24,R,0,.22,0,1,.6,1.35); [-1,1].forEach(s=>{ strich(r,[.14,.3,s*.1],[.2,.46,s*.12],.022,R); ball(r,.055,0xffffff,.2,.49,s*.12); ball(r,.027,0x101008,.24,.49,s*.12); strich(r,[.12,.22,s*.26],[.34,.28,s*.36],.04,R); ball(r,.11,R,.42,.3,s*.37,1.2,.8,.8); }); verschmelze(r);
  const beine=[-1,1].map(s=>{ const b=gruppe(l,0,0,0); [-.12,0,.12].forEach(x=>{ strich(b,[x,.2,s*.26],[x*1.7,.24,s*.44],.022,R); strich(b,[x*1.7,.24,s*.44],[x*2,.02,s*.54],.018,R); }); verschmelze(b); return b; });
  ohneSchatten(l);
  k.anim.push(t=>{ beine.forEach((b,i)=>b.position.y=Math.max(0,Math.sin(t*14+i*3.14))*.05); });
  laeufer(k,g,weg,tempo,start,10);
}
function moewe(k,cx,cz,r,h,tempo,start){
  const g=gruppe(k.scene,cx,h,cz), leib=gruppe(g,0,0,0); ball(leib,.2,0xf6f6f2,0,0,0,1.7,.85,.85); ball(leib,.13,0xf6f6f2,.32,.08,0); const s0=kegel(leib,.05,.18,0xf2a81a,.49,.06,0); s0.rotation.z=-Q; [-1,1].forEach(s=>ball(leib,.022,0x101010,.39,.12,s*.08)); box(leib,.22,.03,.18,0xb8bcc4,-.36,0,0); verschmelze(leib);
  const fl=[-1,1].map(s=>{ const a=gruppe(g,0,.04,s*.12); box(a,.28,.035,.55,0xe8eaee,0,0,s*.28); box(a,.2,.03,.3,0x4a4e58,-.03,0,s*.68); verschmelze(a); return a; });
  ohneSchatten(g);
  k.anim.push(t=>{ const a=t*tempo+start; g.position.set(cx+Math.cos(a)*r,h+Math.sin(t*1.7+start)*.4,cz+Math.sin(a)*r); g.rotation.y=Math.atan2(-Math.cos(a)*tempo,-Math.sin(a)*tempo); const s=Math.sin(t*6+start); fl[0].rotation.x=s*.55; fl[1].rotation.x=-s*.55; });
}
function schmetterling(k,x,z,farbe,start){
  const g=gruppe(k.scene,x,1.6,z); ball(g,.06,0x2a1a10,0,0,0,2,.7,.7);
  const fl=[-1,1].map(s=>{ const a=gruppe(g,0,.02,s*.03); ball(a,.15,farbe,.05,0,s*.14,.85,.07,1); ball(a,.1,farbe,-.11,0,s*.1,.9,.08,.9); verschmelze(a); return a; });
  ohneSchatten(g);
  k.anim.push(t=>{ const a=t*.5+start; g.position.set(x+Math.sin(a)*.9,1.6+Math.sin(t*2.1+start)*.4,z+Math.sin(a*2)*.7); g.rotation.y=Math.atan2(-Math.cos(a*2)*1.4,Math.cos(a)*.9); const s=Math.sin(t*13+start)*.9; fl[0].rotation.x=s; fl[1].rotation.x=-s; });
}

function baue(k){
  const w=huelle(k,{ B, T, boden:[220,200,150], bodenStreu:18, grund:0x8a8468, staerke:.72, sonneStaerke:.52, mauer:0xa4b0b4, stein:0x748890, oeffnung:{x:AX,b:4.7} });
  becken(k);
  const tuer=schleuse(k);
  landschaft(k);
  ausstattung(k,w);
  vorplatz(k.scene);
  palme(k,-15.9,-10.4,4.6,.9,.5,0); palme(k,-16.6,4,4.3,.8,-.5,1.7); palme(k,16.6,-6.6,4.8,-.8,.6,3.1); palme(k,16.6,2.8,4.2,-.7,-.4,4.4);

  const weg=[[3.4,3.4],[6.2,2.2],[10.4,2.6],[9.6,3.6],[5.2,4.4]];
  ente(k,weg,.9,20,false);
  [1,2,3].forEach(i=>ente(k,weg,.5,19.6-i*.7,true));
  krabbe(k,[[2.6,9],[5.8,10.2],[5,8.2]],.6,0);
  krabbe(k,[[-10.6,1],[-8.4,1.6],[-9,3.6],[-11.4,2.8]],.55,3);
  moewe(k,-22,-8,5,5.6,.45,0); moewe(k,23,2,4.5,5.2,-.5,2); moewe(k,3,-20,6.5,6,.35,4); moewe(k,-12,-24,5,7,-.4,1);
  schmetterling(k,-15.5,9.6,0xff8a1a,0); schmetterling(k,15.4,10.4,0x8a5ae0,2.4); schmetterling(k,-14,-8.6,0xffd020,4.1);

  return { tuer, start:[1.6,5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-16,-8.4],[-12.6,-11.8],[-4.6,-11.4],[-5,-6.4],[-13.8,-4.8],[-16.6,1],[-14.8,4.4],[-16,10.8],[-10,12],[-6.2,7.4],[.2,11.6],[6.8,9.6],[11.4,10.6],[16.2,9.4],[11.2,.6],[16,-3],[13.2,-6.8],[12.4,-10.6],[6.8,-2.2],[-6.4,-1.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:1.5, z:-.5, steh:[1.5,2.4], r:2.15, treffer:[3.9,3.4,2.8], baue(g,k){ /* 1 Seelöwe mit Ball auf einem Fels */
      const G=felsGeo(23,1,.2), f=gruppe(g,0,0,0); f.rotation.y=-.45;
      form(f,G,FELS,-.1,.12,0,1.95,.52,1.35); form(f,G,FELS3,.25,.34,-.05,1.35,.3,1.0).rotation.y=1.2;
      [[-1.55,.1,.9,.45],[1.5,.1,-.85,.5],[1.45,.08,.85,.32]].forEach(([x,y,z,s])=>form(f,G,FELS2,x,y,z,s,s*.7,s));
      form(f,G,FELS3,-1.35,.36,0,.55,.3,.6); /* Stein unter den Hinterflossen */
      const s=tier(k,'seeloewe',g,0,0,-.45,.88,.48), kopf=seeloeweFest(s);
      /* bunter Ball auf der Nase */
      const halter=gruppe(s,1.93,2.36,0), b=gruppe(halter,0,0,0); halter.userData.lebendig=true;
      [0xe8382c,0xffffff,0x2a7ad8,0xffd21a,0x38b858,0xffffff].forEach((c,i)=>form(b,new THREE.SphereGeometry(.47,6,14,i*Math.PI/3,Math.PI/3),c,0,0,0));
      [-1,1].forEach(v=>ball(b,.13,0xffffff,0,v*.455,0,1,.3,1)); verschmelze(b); b.rotation.x=.45;
      k.anim.push(t=>{ const a=.55+Math.sin(t*1.5)*.07, c=Math.cos(a), si=Math.sin(a);
        if(kopf) kopf.rotation.z=a;
        halter.position.set(1.4+.6*c+.02*si+Math.sin(t*2.6)*.025,1.55+.6*si-.02*c+.5,0); b.rotation.y=t*.9; }); } },
  { x:-6.5, z:3.5, steh:[-6.5,5.15], kasten:[2.1,.9], treffer:[2.2,3,1], baue(g){ /* 2 Rettungsring auf einem Pfosten */
      walze(g,.62,.2,STEIN2,0,.1,0); walze(g,.48,.14,STEIN,0,.27,0);
      walze(g,.14,2.75,HOLZ,0,1.55,-.2); ball(g,.2,MESSING,0,2.98,-.2); box(g,1.5,.16,.16,HOLZ2,0,2.66,-.2);
      const r=gruppe(g,0,1.78,.1);
      for(let i=0;i<8;i++){ const t=ring(r,.74,.25,i%2?WEISS:ROT,0,0,0,Math.PI/4+.01); t.rotation.z=i*Math.PI/4-Math.PI/8; }
      /* Halteleine mit vier Schlaufen */
      for(let i=0;i<4;i++){ const a=i*Q+Q/2, N=12; const p=j=>{ const t=j/N, w=a+t*Q, q=1.04+.27*Math.pow(Math.sin(t*Math.PI),.75); return [Math.cos(w)*q,Math.sin(w)*q,.14]; };
        for(let j=0;j<N;j++){ const e=p(j+1); strich(r,p(j),e,.035,0xf2dca0); ball(r,.035,0xf2dca0,e[0],e[1],e[2]); }
        const band=ring(r,.265,.055,0x2a5a9a,Math.cos(a)*.74,Math.sin(a)*.74,0); band.rotation.set(Q,0,a,'ZXY'); } } },
  { x:8.5, z:6, steh:[8.5,7.85], r:1.2, treffer:[2.4,2.2,2.2], baue(g){ /* 3 Muschelkorb */
      const K=0xc89a52, K2=0xa87a38;
      rohr(g,1.02,.76,.9,K,0,.45,0,18,true); walze(g,.76,.08,K2,0,.06,0);
      for(let i=0;i<4;i++){ const y=.12+i*.22, t=ring(g,.78+i*.065,.055,i%2?K:K2,0,y,0); t.rotation.x=Q; }
      for(let i=0;i<18;i++){ const a=i*Math.PI/9; strich(g,[Math.cos(a)*.78,.05,Math.sin(a)*.78],[Math.cos(a)*1.05,.9,Math.sin(a)*1.05],.04,0x8a5e28); }
      const o=ring(g,1.04,.1,K2,0,.92,0); o.rotation.x=Q;
      /* Henkel hinten */
      const h=ring(g,1.03,.075,K2,0,.92,-.25,Math.PI); h.rotation.x=-.3;
      ball(g,.92,0xe8d4a8,0,.78,0,1,.32,1);
      muschel(g,.82,0xffa8b8,0xc85a7a,-.2,.88,-.35,-.25,.1,.12);
      muschel(g,.62,0xfff0d8,0xc89a60,.48,.9,-.1,-.45,-.35,-.35);
      muschel(g,.55,0xffa468,0xc0602c,-.58,.92,.15,-.6,.45,.5);
      muschel(g,.46,0xbca0ee,0x7a58b8,.12,.98,.42,-.95,.1,-.1);
      muschel(g,.4,0xfff0d8,0xc89a60,-.32,.95,.58,-1.15,.3,.35);
      const sn=gruppe(g,.56,1.12,.36); sn.rotation.set(0,-.6,.35);
      [[0,0,.27],[.2,.06,.21],[.35,.12,.15],[.46,.18,.095],[.53,.23,.055]].forEach(([x,y,r],i)=>{ ball(sn,r,i%2?0xf2b890:0xfae0c0,x-.15,y,0); if(r>.1) ring(sn,r*.95,.02,0xc07048,x-.15,y,0).rotation.y=1.3; });
      ball(sn,.15,0xf06a88,-.34,-.04,.1,.8,.9,.55);
      /* zwei Muscheln neben dem Korb und eine Perle */
      muschel(g,.34,0xffa8b8,0xc85a7a,1.0,.08,.62,-1.3,0,-.5); muschel(g,.28,0xfff0d8,0xc89a60,-1.02,.07,.55,-1.35,0,.6); ball(g,.13,0xffffff,.1,1.12,.12); } },
  { x:14.8, z:-1.5, dreh:-.25, steh:[14.3,.35], kasten:[2.9,1.4], treffer:[3,3.4,1.3], baue(g){ /* 4 Kescherständer */
      [-1.3,1.3].forEach(x=>{ box(g,.18,.16,1.0,HOLZ2,x,.08,0); box(g,.16,1.55,.16,HOLZ,x,.8,-.1); ball(g,.12,MESSING,x,1.62,-.1); });
      box(g,2.75,.16,.18,HOLZ,0,.34,-.1); box(g,2.75,.14,.16,HOLZ,0,1.38,-.1);
      [[-.86,2.55,0x2a7ad8,.07],[0,2.92,0xe8483a,0],[.86,2.42,0xf2b81a,-.07]].forEach(([x,h,c,n])=>{
        const s=gruppe(g,x,0,.04); s.rotation.z=n;
        walze(s,.065,h-.4,0xd8aa68,0,(h-.4)/2+.1,0); walze(s,.09,.45,c,0,.7,0); box(s,.2,.12,.2,EISEN,0,1.38,-.06);
        const r=.42, m=gruppe(s,0,h+.1,-.07); m.rotation.x=-.28;
        ring(m,r,.06,c,0,0,0); walze(m,.08,.14,EISEN,0,-r,0);
        /* Netzbeutel: Maschen aus Längs- und Querfäden */
        const Z=[.12,-.62,.34], N=12, p=(i,f)=>{ const a=i/N*Math.PI*2, x1=Math.cos(a)*r, y1=Math.sin(a)*r; return [x1+(Z[0]-x1)*f, y1+(Z[1]-y1)*f, Z[2]*Math.sin(f*Math.PI*.5)]; };
        for(let i=0;i<N;i++){ [0,.34,.67].forEach((f,j)=>{ strich(m,p(i,f),p(i+1,f+.33),.013,0xf6fbff); strich(m,p(i+1,f),p(i,f+.33),.013,0xf6fbff); }); [.34,.67].forEach(f=>strich(m,p(i,f),p(i+1,f),.012,0xf6fbff)); }
        ball(m,.07,0xf6fbff,Z[0],Z[1],Z[2]); }); } },
  { wand:'links', x:-17.5, z:-2, dreh:Q, steh:[-15.75,-2], treffer:[4.4,3.6,1], baue(g,k){ /* 5 Unterwasser-Fenster in einer Beckenwand */
      box(g,4.5,3.15,.46,0x3a7a9a,0,1.575,-.27);
      [-1,1].forEach(s=>{ box(g,.4,3.4,.6,STEIN,s*2.15,1.7,-.2); box(g,.52,.2,.72,0xe0dac8,s*2.15,3.5,-.2); });
      box(g,3.9,.24,.62,0xe0dac8,0,3.2,-.2); box(g,3.9,.3,.56,STEIN2,0,.15,-.2);
      /* Wasser schwappt oben über den Rand */
      for(let i=0;i<9;i++) ball(g,.24,i%2?0x5ac8ec:0x3aa8d8,-1.72+i*.43,3.34,-.3,1.2,.55,.9);
      /* Kacheln */
      for(let i=0;i<9;i++) [.45,2.97].forEach((y,j)=>box(g,.32,.17,.03,(i+j)%2?0x58c0d8:0xd8f0f4,-1.68+i*.42,y,-.02));
      const t=bild(256,256,c=>{ const v=c.createLinearGradient(0,0,0,256); v.addColorStop(0,'#8ae4f8'); v.addColorStop(.45,'#2a9ad0'); v.addColorStop(1,'#0e4a86'); c.fillStyle=v; c.fillRect(0,0,256,256);
        c.fillStyle='rgba(255,255,255,.14)'; [40,110,180].forEach(x=>{ c.beginPath(); c.moveTo(x,0); c.lineTo(x+26,0); c.lineTo(x-14,256); c.lineTo(x-56,256); c.fill(); });
        c.fillStyle='#e8d090'; c.beginPath(); c.moveTo(0,222); c.quadraticCurveTo(80,198,150,220); c.quadraticCurveTo(210,236,256,214); c.lineTo(256,256); c.lineTo(0,256); c.fill();
        c.lineCap='round'; [[50,'#38b858'],[68,'#2a9a48'],[196,'#38b858'],[214,'#e8709a']].forEach(([x,f],i)=>{ c.strokeStyle=f; c.lineWidth=8; c.beginPath(); c.moveTo(x,226); c.quadraticCurveTo(x-18,196,x+4,172); c.quadraticCurveTo(x+18,150,x-2,132+(i%2)*22); c.stroke(); }); });
      const glas=new THREE.Mesh(new THREE.CircleGeometry(1.24,36),new THREE.MeshBasicMaterial({map:t})); glas.position.set(0,1.72,.0); g.add(glas);
      ring(g,1.28,.17,MESSING,0,1.72,.07); ring(g,1.12,.04,0xa87a24,0,1.72,.07);
      for(let i=0;i<10;i++){ const a=i*Math.PI/5; ball(g,.075,0x7a5418,Math.cos(a)*1.28,1.72+Math.sin(a)*1.28,.24); }
      /* Fische und Blasen hinter dem Rahmen */
      const innen=gruppe(g,0,1.72,.07); innen.userData.lebendig=true;
      const weiss=basis(0xffffff), schwarz=basis(0x101018);
      const fisch=(c,c2,gr)=>{ const f=gruppe(innen,0,0,0), l=gruppe(f,0,0,0); l.scale.set(gr,gr,gr*.25);
        ball(l,.3,basis(c),0,0,0,1.5,.95,1); const s=kegel(l,.25,.34,basis(c2),-.54,0,0); s.rotation.z=-Q; ball(l,.11,basis(c2),-.02,.26,0,1.7,.9,.6); box(l,.09,.46,.1,weiss,0,0,.28); ball(l,.08,weiss,.24,.07,.3); ball(l,.042,schwarz,.27,.07,.38); ohneSchatten(l); verschmelze(l); return f; };
      const a=fisch(0xff8a1a,0xffc23a,.9), b=fisch(0xffe23a,0xff9a1a,.62), c=fisch(0xf0609a,0xffa8c8,.48);
      const blasen=[0,1,2,3,4].map(i=>{ const m=ball(innen,.05+(i%3)*.02,basis(0xe8fbff,{transparent:true,opacity:.75}),0,0,.04); m.castShadow=false; return m; });
      const glanz=new THREE.Mesh(new THREE.RingGeometry(.86,.99,24,1,1.75,1.1),basis(0xffffff,{transparent:true,opacity:.45,depthWrite:false})); glanz.position.set(0,1.72,.19); g.add(glanz);
      k.anim.push(z=>{ const s=(f,tp,ph,y,w,tiefe)=>{ const q=z*tp+ph; f.position.set(Math.sin(q)*w,y+Math.sin(z*1.7+ph)*.07,tiefe); f.scale.x=Math.cos(q)>0?1:-1; };
        s(a,.7,0,.12,.55,.08); s(b,.95,2.2,-.48,.45,.06); s(c,.6,4,.6,.35,.05);
        blasen.forEach((m,i)=>{ const p=(z*.28+i*.2)%1; m.position.set(-.55+(i%2?.12:0)+Math.sin(z*3+i)*.04+(i>2?1.05:0),-.75+p*1.45,.05); }); });
      k.kasten(-17.7,-2,.9,4.8); } },
  { wand:'hinten', x:15, z:-12.9, steh:[15,-11.2], treffer:[3.2,3.7,.9], baue(g,k){ /* 6 Fischtafel mit Fischbildern */
      [-1.45,1.45].forEach(x=>{ box(g,.2,3.1,.2,HOLZ,x,1.55,-.12); ball(g,.28,STEIN2,x,.06,-.1,1.1,.6,1); });
      box(g,3.15,2.25,.14,HOLZ2,0,1.85,-.06);
      const t=bild(512,352,c=>{ const v=c.createLinearGradient(0,0,0,352); v.addColorStop(0,'#dff6fc'); v.addColorStop(1,'#a8dcf0'); c.fillStyle=v; c.fillRect(0,0,512,352);
        c.strokeStyle='#5ab4dc'; c.lineWidth=6; c.lineCap='round'; [176,334].forEach(y=>{ c.beginPath(); c.moveTo(14,y); for(let x=14;x<490;x+=40) c.quadraticCurveTo(x+10,y+(((x-14)/40)%2?10:-10),x+40,y); c.stroke(); });
        const e=(x,y,a,b,f)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,a,b,0,0,6.283); c.fill(); };
        const fisch=(x,y,a,b,f,f2,art)=>{ c.fillStyle=f2; c.beginPath(); c.moveTo(x-a*.8,y); c.lineTo(x-a*1.5,y-b*.85); c.lineTo(x-a*1.35,y); c.lineTo(x-a*1.5,y+b*.85); c.fill();
          c.beginPath(); c.moveTo(x-a*.4,y-b*.7); c.quadraticCurveTo(x,y-b*1.65,x+a*.4,y-b*.7); c.fill(); e(x,y,a,b,f);
          c.strokeStyle='#fff'; c.lineWidth=9; if(art===1){ [-.3,.2].forEach(q=>{ c.beginPath(); c.moveTo(x+a*q,y-b*.8); c.lineTo(x+a*q,y+b*.8); c.stroke(); }); } if(art===2){ [[-.45,-.2],[-.1,.35],[0,-.4],[-.55,.3],[.25,.15]].forEach(([p,q])=>e(x+a*p,y+b*q,6,6,'#1a3a6a')); }
          e(x+a*.55,y-b*.18,12,12,'#ffffff'); e(x+a*.58,y-b*.18,6,6,'#10101a'); c.strokeStyle='#40283a'; c.lineWidth=3; c.beginPath(); c.arc(x+a*.82,y+b*.12,9,.3,2); c.stroke(); };
        fisch(142,92,70,44,'#ff8a1a','#e0601a',1); fisch(386,98,76,32,'#3a7ae0','#2a50a8',0); fisch(134,256,62,50,'#ffd21a','#f2961a',2); fisch(380,250,74,38,'#e84a5a','#a82a48',1);
        e(256,150,9,9,'#ffffff'); e(274,126,6,6,'#ffffff'); e(250,296,8,8,'#ffffff'); });
      const f=new THREE.Mesh(new THREE.PlaneGeometry(2.85,1.96),new THREE.MeshLambertMaterial({map:t,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.22})); f.position.set(0,1.85,.025); g.add(f);
      /* kleines Dach */
      [-1,1].forEach(s=>{ const d=box(g,1.85,.14,.62,0x2a7a9a,s*.84,3.2,0); d.rotation.z=-s*.2; }); ball(g,.15,MESSING,0,3.42,.05);
      [[-1.42,.85],[1.42,.85],[-1.42,2.85],[1.42,2.85]].forEach(([x,y])=>ball(g,.07,MESSING,x,y,.05));
      k.kasten(15,-12.95,3.2,.6); } },
  { x:-9.5, z:-3, steh:[-9.5,-.85], r:1.65, treffer:[3.2,1.8,3.2], baue(g){ /* 7 Seesternbecken */
      for(let i=0;i<16;i++){ const a=i*Math.PI/8, m=box(g,.58,.62+(i%3)*.02,.34,i%2?STEIN:STEIN2,Math.cos(a)*1.4,.32,Math.sin(a)*1.4); m.rotation.y=-a+Q; }
      const o=ring(g,1.4,.17,0xe0dac8,0,.66,0); o.rotation.x=Q; o.scale.z=.6;
      walze(g,1.3,.3,0xe8d49a,0,.15,0);
      [[-.5,.3,.2],[.55,-.5,.16],[.75,.55,.12]].forEach(([x,z,s])=>ball(g,s,FELS3,x,.34,z,1.2,.8,1));
      seestern(g,.4,0x9a58d0,0xdcb8f8,-.55,.42,-.35,-Q,0,.5); seestern(g,.32,0xf2c21a,0xfff0a8,.6,.41,.35,-Q,0,2.1);
      [[-.15,.75],[.2,-.75],[.9,-.15]].forEach(([x,z],i)=>{ for(let j=0;j<4;j++) strich(g,[x,.28,z],[x+Math.sin(j*2+i)*.13,.58+(j%2)*.08,z+Math.cos(j*2+i)*.13],.025,0x38a858); });
      const w=new THREE.Mesh(new THREE.CircleGeometry(1.28,32),basis(0x4ac8e8,{transparent:true,opacity:.45,depthWrite:false})); w.rotation.x=-Q; w.position.y=.56; g.add(w);
      /* Stein in der Mitte mit großem Seestern */
      form(g,felsGeo(31),FELS,.05,.5,-.2,.55,.4,.5);
      seestern(g,.62,0xff7a1a,0xffd488,.05,1.0,-.1,-.85,0,.1);
      seestern(g,.46,0xe83a30,0xffb0a0,-.9,.8,1.08,-.95,-.55,.4);
      seestern(g,.34,0xff9ab8,0xffe0ec,1.35,.78,.4,-1.25,.4,-.6); } },
  { x:-12.5, z:7.5, steh:[-12.5,9.45], r:1.4, treffer:[2.8,2.7,2.4], baue(g){ /* 8 Stein mit Korallen */
      const G=felsGeo(41,1,.28);
      form(g,G,0x7c8698,0,.45,0,1.3,.75,1.05); form(g,G,0x98a0ae,-.5,.3,.45,.7,.45,.6).rotation.y=1.5; form(g,G,0x646e82,.75,.28,-.2,.65,.45,.65).rotation.y=2.4;
      const ast=(p,x,y,z,dx,dy,dz,r,c,tiefe)=>{ const q=[x+dx,y+dy,z+dz]; strich(p,[x,y,z],q,r,c); ball(p,r*1.25,c,q[0],q[1],q[2]); if(tiefe>0){ ast(p,x+dx*.55,y+dy*.55,z+dz*.55,-dy*.42-.12,dy*.55,dz*.4+.08,r*.75,c,tiefe-1); ast(p,x+dx*.75,y+dy*.75,z+dz*.75,dy*.4+.1,dy*.48,-dz*.4-.05,r*.7,c,tiefe-1); } };
      ast(g,-.15,.95,-.15,-.12,1.15,0,.12,0xf4567a,2);
      ast(g,.55,.8,-.3,.42,.85,-.1,.095,0xff9a2a,2);
      ast(g,-.75,.7,0,-.4,.65,.15,.085,0xa864e0,1);
      /* Hirnkoralle */
      ball(g,.4,0xf2cc3a,.55,.92,.42,1,.8,1); for(let i=0;i<5;i++){ const t=ring(g,.32-i*.015,.035,0xc8981a,.55,.94+i*.045,.42,Math.PI*1.6); t.rotation.set(Q+Math.sin(i*2)*.4,Math.cos(i*3)*.35,i*1.4); }
      /* Röhrenkorallen */
      [[-.55,.65,.6,.55],[-.32,.7,.72,.4],[-.75,.55,.5,.35]].forEach(([x,y,z,h])=>{ walze(g,.11,h,0x2ac8c0,x,y+h/2,z); const t=ring(g,.11,.04,0xa8f4ec,x,y+h,z); t.rotation.x=Q; walze(g,.08,.02,0x0e5a5a,x,y+h+.008,z); });
      /* Seeanemone */
      for(let i=0;i<12;i++){ const a=i*.524; strich(g,[.05+Math.cos(a)*.1,1.1,.42+Math.sin(a)*.1],[.05+Math.cos(a)*.3,1.38+(i%2)*.08,.42+Math.sin(a)*.3],.035,0xff8ac0); ball(g,.055,0xffe0ee,.05+Math.cos(a)*.3,1.38+(i%2)*.08,.42+Math.sin(a)*.3); }
      ball(g,.18,0xd8488a,.05,1.1,.42,1,.7,1);
      [[.82,.36,.76,0xf4567a],[-.82,.4,.88,0xff9a2a]].forEach(([x,y,z,c])=>{ for(let j=0;j<5;j++) ball(g,.11,c,x+Math.sin(j*2.1)*.1,y+(j%3)*.035,z+Math.cos(j*2.1)*.07,1,.6,.8); }); } },
  { x:14, z:5.8, steh:[13.5,7.5], r:.8, treffer:[3.4,3.8,3.2], baue(g,k){ /* 9 Sonnenschirm */
      walze(g,.7,.22,STEIN2,0,.11,0); walze(g,.36,.24,STEIN,0,.33,0);
      const s=gruppe(g,0,0,0); s.rotation.z=.07;
      walze(s,.09,3.35,0xf4f0e4,0,1.85,0); walze(s,.13,.22,MESSING,0,1.35,0);
      for(let i=0;i<10;i++){ const c=i%2?0xfff2c8:0xf2503a, a=i*Math.PI/5;
        const d=new THREE.Mesh(new THREE.ConeGeometry(1.85,.85,3,1,true,a,Math.PI/5),doppel(c)); d.position.y=3.15; d.castShadow=true; s.add(d);
        /* kleine hängende Zacken am Rand */
        const Z=[]; for(let j=0;j<3;j++){ const w=a+j*Math.PI/15, w2=w+Math.PI/15, x1=Math.sin(w)*1.85, z1=Math.cos(w)*1.85, x2=Math.sin(w2)*1.85, z2=Math.cos(w2)*1.85; Z.push(x1,2.728,z1, x2,2.728,z2, (x1+x2)/2,2.54,(z1+z2)/2); }
        const zg=new THREE.BufferGeometry(); zg.setAttribute('position',new THREE.Float32BufferAttribute(Z,3)); zg.computeVertexNormals(); form(s,zg,doppel(c),0,0,0);
        strich(s,[0,2.55,0],[Math.sin(a)*1.5,2.86,Math.cos(a)*1.5],.022,EISEN); }
      ball(s,.15,MESSING,0,3.66,0); kegel(s,.08,.22,MESSING,0,3.83,0);
      verschmelze(g); k.verdecker(g,14,5.8,1.4); } },
  { x:-3, z:9, steh:[-3,7.15], r:1.3, treffer:[2.7,1.9,2.4], baue(g,k){ /* 10 Gartenschlauch */
      const C=0x2fae48, C2=0x228a38;
      [[0,.13,0,.98],[.05,.33,.03,.9],[-.05,.53,-.02,.94],[.03,.72,.02,.82],[-.02,.9,0,.74]].forEach(([x,y,z,r],i)=>{ const t=ring(g,r,.12,i%2?C2:C,x,y,z); t.rotation.x=Q+(i%2?.04:-.03); });
      /* gelber Streifen auf dem obersten Ring */
      const st=ring(g,.74,.025,0xf2e03a,-.02,1.025,0); st.rotation.x=Q;
      /* Schlauchende mit Spritze */
      const weg=[[.72,.9,-.05],[.73,1.04,.22],[.6,1.12,.45],[.42,1.14,.6]];
      for(let i=0;i<weg.length-1;i++){ strich(g,weg[i],weg[i+1],.115,C); ball(g,.115,C,weg[i+1][0],weg[i+1][1],weg[i+1][2]); }
      /* gerade Gartendüse mit Messingkupplung und runder Brause */
      strich(g,[.42,1.14,.6],[.24,1.17,.66],.145,MESSING); strich(g,[.24,1.17,.66],[-.1,1.26,.68],.1,0x9aa8b0); strich(g,[-.1,1.26,.68],[-.18,1.29,.68],.15,MESSING); strich(g,[-.18,1.29,.68],[-.3,1.35,.68],.27,0xf2c21a);
      ball(g,.04,0x6a4a10,-.31,1.355,.68); for(let j=0;j<6;j++){ const w=j*Math.PI/3, u=Math.cos(w)*.14; ball(g,.032,0x6a4a10,-.31+u*.45,1.355+u*.89,.68+Math.sin(w)*.14); }
      /* Anschluss am anderen Ende */
      strich(g,[-.9,.13,.35],[-1.25,.12,.75],.12,C); strich(g,[-1.25,.12,.75],[-1.42,.12,.95],.17,MESSING);
      /* Wasserstrahl aus Tropfen */
      const wasser=basis(0xaee8ff,{transparent:true,opacity:.85,depthWrite:false});
      const tr=[0,1,2,3,4,5,6,7].map(()=>{ const m=ball(g,.06,wasser,-.35,1.37,.68); m.castShadow=false; return m; });
      k.anim.push(t=>tr.forEach((m,i)=>{ const p=(t*1.1+i/8)%1; m.position.set(-.35-p*.85,1.37+p*.55-p*p*1.8,.68+p*.3+Math.sin(i*5)*p*.1); const s=.05*(1-p*.5); m.scale.set(s,s,s); })); } }
];

return { titel:'Das Robben-Gehege', breite:B, tiefe:T, baue, gegenstaende, verstecke, himmel:0xa4dcf6 };
})();

/* Raum 3: Das Elefanten-Gehege (draußen, Sandboden, hinten links der offene Futterhaus-Unterstand).
   Gegenstände 1 bis 8 wie im 2D-Szenario (Elefant, Obstkiste, Baumstamm, Futterwaage, Futterplan, Dosenregal, Schubkarre, Wassertrog),
   9 und 10 sind neu (Großer Reifen, Riesenbürste). Ausgang: großes zweiflügeliges Holztor in der hinteren Mauer. */
RAEUME3D.zoo[2] = (function(){
const B=36, T=27;
const HX=3;                      /* Mitte des Holztors */
const TZ=-13.5;                  /* Ebene der Torflügel */
const HOLZ=0x9a6a38, HOLZ2=0x6b421e, HOLZ3=0xb8854a, EISEN=0x44474e, METALL=0xaab4bc;
const STEIN=0xa29a8c, STEIN2=0x857d70, BLATT=0x3f9a48, BLATT2=0x68b844, BLATT3=0x2f7c38, STROH=0xe8c44e, STROH2=0xcfa430, STROH3=0xf4dc7a;

/* gröbere Formen für viele kleine Teile (spart Dreiecke), je Raumaufbau neu */
let GROB=null, SPITZ=null;
const drehe=(m,x,y,z)=>{ m.rotation.set(x||0,y||0,z||0); return m; };
const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });
const form=(par,geo,farbe,x,y,z)=>teil(par,geo,farbe,x,y,z,1,1,1);

/* =============== die zehn Gegenstände =============== */

/* 1 Elefant */
function elefant(g,k){
  ZOO.tier(k,'elefant',g,-.35,0,0,.8);
  /* helle Zehennägel an den vier Füßen */
  [[-1.1,.7],[-1.1,-.7],[1.1,.7],[1.1,-.7]].forEach(([px,pz])=>[-.55,0,.55].forEach(w=>{
    ball(g,.085,0xf3ead4,-.35+px*.8+Math.cos(w)*.29,.1,pz*.8+Math.sin(w)*.29,.8,1,1); }));
  /* zusätzliche Hindernisse für Hinterteil und Kopf (Blickrichtung dreht mit: -.75) */
  k.kreis(-5.5-.73*1.1,-3.8-.68*1.1,1.0); k.kreis(-5.5+.73*1.6,-3.8+.68*1.6,.85);
}

/* 2 Obstkiste */
function banane(g,x,y,z,w){
  const b=gruppe(g,x,y,z); b.rotation.y=w;
  [-.13,0,.13].forEach((v,i)=>{ const p=[[-.38,.16],[-.22,.03],[0,-.02],[.22,.03],[.38,.17]];
    for(let j=0;j<4;j++) strich(b,[p[j][0],p[j][1]+i*.02,v*(.4+Math.abs(j-1.5)*.1)+v*.5],[p[j+1][0],p[j+1][1]+i*.02,v*(.4+Math.abs(j-.5)*.1)+v*.5],j===0||j===3?.055:.075,0xffd830);
    ball(b,.04,0x5a3a10,.39,.18+i*.02,v*.9); });
  ball(b,.09,0x7a8a20,-.4,.19,0);
}
function obstkiste(g){
  box(g,2.3,.14,1.5,HOLZ2,0,.12,0);
  [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.17,1.16,.17,HOLZ2,a*1.1,.58,b*.7)));
  [.28,.62,.96].forEach(y=>{ [-1,1].forEach(b=>box(g,2.32,.25,.09,HOLZ3,0,y,b*.76)); [-1,1].forEach(a=>box(g,.09,.25,1.42,HOLZ,a*1.16,y,0)); });
  [-1,1].forEach(a=>[.28,.62,.96].forEach(y=>ball(g,.035,EISEN,a*1.1,y,.82)));
  box(g,2.1,.6,1.32,0x4a2a12,0,.52,0);
  /* Wassermelone */
  ball(g,.5,0x2f8a34,-.58,1.28,-.12,1.15,.9,.95); [-.35,-.12,.12,.35].forEach(v=>ball(g,.5,0x1c5a22,-.58+v*.6,1.28,-.12,.12,.915,1-Math.abs(v)*.32));
  /* Ananas */
  const an=gruppe(g,.12,1.42,-.34); ball(an,.29,0xe8a020,0,0,0,1,1.35,1);
  for(let i=0;i<18;i++){ const a=i*1.4, h=-.25+(i%6)*.1, r=.29*Math.sqrt(Math.max(.1,1-(h/.39)*(h/.39))); ball(an,.045,0x9a6a10,Math.cos(a)*r,h,Math.sin(a)*r); }
  for(let i=0;i<7;i++){ const a=i*.9; const bl=kegel(an,.075,.5,i%2?BLATT3:BLATT,Math.cos(a)*.1,.55,Math.sin(a)*.1); drehe(bl,Math.sin(a)*.5,0,-Math.cos(a)*.5); }
  /* Äpfel und Orangen */
  [[.62,1.2,.38,0xe02a30],[.95,1.18,-.05,0x7ac830],[.58,1.22,-.45,0xe02a30],[.2,1.18,.46,0x7ac830],[-.22,1.16,.48,0xe02a30],[.88,1.17,-.5,0xe8383a],[.55,1.48,-.1,0xe02a30],[-.95,1.14,.45,0x7ac830]].forEach(([x,y,z,f])=>{
    ball(g,.23,f,x,y,z,1,.92,1); strich(g,[x,y+.18,z],[x+.04,y+.31,z],.022,0x5a3a10); ball(g,.07,BLATT2,x+.1,y+.27,z,1.3,.3,.8); });
  [[.25,1.22,.1],[-.12,1.2,.12],[.98,1.2,.42]].forEach(([x,y,z])=>{ ball(g,.22,0xff8c1a,x,y,z); ball(g,.04,BLATT3,x,y+.22,z,1.4,.5,1.4); });
  banane(g,-.5,1.42,.5,.15); banane(g,.38,1.5,.22,-.5);
}

/* 3 Baumstamm (liegend) */
function baumstamm(g){
  drehe(walze(g,.56,3.9,0x7a4e2a,0,.56,0),0,0,Math.PI/2);
  for(let i=0;i<13;i++){ const a=i*.483, x=((i*1.37)%2.6)-1.3; box(g,1.1+(i%3)*.35,.07,.07,i%2?0x5a3618:0x8e6036,x,.56+Math.sin(a)*.565,Math.cos(a)*.565); }
  [-1,1].forEach(s=>{ drehe(walze(g,.57,.14,0x5a3618,s*1.93,.56,0),0,0,Math.PI/2); drehe(walze(g,.49,.05,0xe0b878,s*2.01,.56,0),0,0,Math.PI/2);
    [.13,.27,.39].forEach(r=>{ ring(g,r,.018,0xa87840,s*2.045,.56,0).rotation.y=Math.PI/2; }); ball(g,.05,0x8a5a2a,s*2.045,.56,0,.4,1,1); });
  /* Aststümpfe mit jungen Blättern */
  [[.65,.35,-.5,.22,.55],[-.9,-.25,.2,.17,.4]].forEach(([x,zn,wz,r,l])=>{ const e=[x+wz*.5,1.05+l,zn]; strich(g,[x,.85,zn*.4],e,r,0x6e4624); ball(g,r*.86,0xd8ac6c,e[0],e[1],e[2],1,.35,1); });
  [[.2,1.2,.15],[.45,1.33,.05],[.05,1.38,-.1],[.35,1.5,-.05]].forEach(([x,y,z],i)=>drehe(ball(g,.2,i%2?BLATT:BLATT2,x,y,z,1.3,.22,.75),.3,i*1.4,.35));
  strich(g,[.35,1.05,0],[.25,1.38,0],.035,BLATT3);
  [[-1.5,1.07,.1],[-.2,1.1,-.1],[1.4,1.02,.3]].forEach(([x,y,z])=>ball(g,.28,0x6a9a30,x,y,z,1.4,.28,.9));
}

/* 4 Futterwaage */
function futterwaage(g,k){
  box(g,2.35,.22,1.75,EISEN,0,.11,.05); box(g,2.15,.16,1.55,METALL,0,.3,.05);
  for(let i=0;i<6;i++) box(g,1.85,.035,.09,0x727c86,0,.396,-.45+i*.2);
  [-1,1].forEach(a=>[-1,1].forEach(b=>ball(g,.07,EISEN,a*.98,.38,.05+b*.7,1,.6,1)));
  box(g,.34,2.0,.3,0xc8382e,0,1.2,-.66); box(g,.55,.3,.45,0x8a241e,0,.45,-.66);
  const y=2.35;
  drehe(walze(g,.86,.26,0xc8382e,0,y,-.62),Math.PI/2,0,0);
  const t=bild(256,256,c=>{ c.fillStyle='#fffaf0'; c.fillRect(0,0,256,256);
    c.lineWidth=20; [['#5ab848',2.5,3.9],['#f2c230',3.9,5.4],['#e8503a',5.4,6.95]].forEach(([f,a,b])=>{ c.strokeStyle=f; c.beginPath(); c.arc(128,128,100,a,b); c.stroke(); });
    c.strokeStyle='#222'; for(let i=0;i<=30;i++){ const a=2.5+i*(4.45/30), r=i%5?98:84; c.lineWidth=i%5?3:7; c.beginPath(); c.moveTo(128+Math.cos(a)*r,128+Math.sin(a)*r); c.lineTo(128+Math.cos(a)*113,128+Math.sin(a)*113); c.stroke(); }
    /* kleines Gewicht-Bild */
    c.fillStyle='#4a525a'; c.beginPath(); c.moveTo(105,205); c.lineTo(151,205); c.lineTo(142,172); c.lineTo(114,172); c.fill(); c.lineWidth=6; c.strokeStyle='#4a525a'; c.beginPath(); c.arc(128,167,9,0,6.283); c.stroke(); });
  const blatt=new THREE.Mesh(new THREE.CircleGeometry(.74,36),new THREE.MeshLambertMaterial({map:t})); blatt.position.set(0,y,-.48); g.add(blatt);
  ring(g,.77,.065,ZOO.GOLD,0,y,-.47);
  const z=gruppe(g,0,y,-.43); z.userData.lebendig=true;
  box(z,.075,.62,.03,0x20242a,0,.26,0); drehe(kegel(z,.09,.2,0x20242a,0,.62,0),0,0,0); box(z,.12,.2,.03,0x20242a,0,-.12,0);
  ball(g,.09,ZOO.GOLD,0,y,-.4,1,1,.6);
  k.anim.push(t=>{ z.rotation.z=.35+Math.sin(t*.8)*.22+Math.sin(t*3.1)*.04; });
}

/* 5 Futterplan (Wand): Tafel mit Futterbildern und Häkchen */
function futterplan(g){
  box(g,3.15,2.35,.12,0x2e7d5a,0,1.85,0);
  const t=bild(512,384,c=>{ c.fillStyle='#fffbe8'; c.fillRect(0,0,512,384); c.fillStyle='#2e7d5a'; c.fillRect(0,0,512,70);
    const oval=(x,y,a,b,f,d)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,a,b,d||0,0,6.283); c.fill(); };
    /* Kopfzeile: Elefantengesicht, Sonne und Mond */
    oval(38,34,19,22,'#c4cad2'); oval(88,34,19,22,'#c4cad2'); oval(63,32,22,23,'#dfe4ea'); c.strokeStyle='#dfe4ea'; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(63,40); c.quadraticCurveTo(62,66,80,60); c.stroke(); oval(54,27,3.5,3.5,'#222'); oval(72,27,3.5,3.5,'#222');
    oval(226,35,18,18,'#ffd02a'); oval(326,35,18,18,'#ffb02a'); oval(430,35,18,18,'#fff4b0'); oval(439,29,16,16,'#2e7d5a');
    c.strokeStyle='#9ab8a4'; c.lineWidth=4; [148,226,304].forEach(y=>{ c.beginPath(); c.moveTo(12,y); c.lineTo(500,y); c.stroke(); }); [150,276,378].forEach(x=>{ c.beginPath(); c.moveTo(x,82); c.lineTo(x,374); c.stroke(); });
    /* Banane */
    c.strokeStyle='#f0be10'; c.lineWidth=20; c.beginPath(); c.arc(74,82,44,.55,2.55); c.stroke(); oval(112,106,6,6,'#6a4a10');
    /* Apfel */
    oval(66,190,24,25,'#e03030'); oval(88,190,24,25,'#e03030'); c.strokeStyle='#5a3a10'; c.lineWidth=7; c.beginPath(); c.moveTo(77,170); c.lineTo(82,155); c.stroke(); oval(97,159,13,6,'#4aa838',-.5);
    /* Möhre */
    c.fillStyle='#f58218'; c.beginPath(); c.moveTo(34,284); c.lineTo(100,244); c.quadraticCurveTo(122,258,108,280); c.fill(); oval(116,246,18,7,'#3f9a3a',-.9); oval(126,258,18,7,'#58b848',-.2);
    /* Blatt */
    oval(76,340,44,21,'#3f8a3a',-.35); c.strokeStyle='#b8e098'; c.lineWidth=4; c.beginPath(); c.moveTo(34,356); c.lineTo(116,325); c.stroke();
    [[1,1,0],[1,0,1],[0,1,1],[1,1,0]].forEach((zeile,i)=>zeile.forEach((h,j)=>{ const x=[213,327,440][j], y=111+i*77;
      if(h){ c.strokeStyle='#1f9a46'; c.lineWidth=13; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); c.moveTo(x-24,y); c.lineTo(x-7,y+18); c.lineTo(x+27,y-22); c.stroke(); }
      else { c.strokeStyle='#a8a49a'; c.lineWidth=7; c.beginPath(); c.arc(x,y,19,0,6.283); c.stroke(); } })); });
  const tafel=new THREE.Mesh(new THREE.PlaneGeometry(2.92,2.12),new THREE.MeshLambertMaterial({map:t})); tafel.position.set(0,1.85,.068); g.add(tafel);
  box(g,3.35,.14,.24,HOLZ2,0,3.08,.03); box(g,3.35,.14,.24,HOLZ2,0,.62,.03);
  [[-1.4,2.84,0xe8403a],[1.4,2.84,0x2f7fe8]].forEach(([x,y,f])=>ball(g,.085,f,x,y,.12,1,1,.7));
}

/* 6 Dosenregal (Wand) */
function dosenregal(g,k){
  box(g,2.9,2.7,.08,0x5a3a1e,0,1.55,-.23);
  [-1,1].forEach(s=>box(g,.14,2.95,.58,HOLZ2,s*1.5,1.475,0));
  [.42,1.32,2.22].forEach(y=>box(g,3.0,.12,.58,HOLZ3,0,y,0));
  box(g,3.2,.14,.64,HOLZ2,0,3.02,0);
  const F=[0xe0352c,0x2f7fe8,0x2fa84a,0xf2b81a,0x9a50d0,0xf2761a];
  [.48,1.38,2.28].forEach((y,r)=>{ for(let i=0;i<5;i++){ const x=-1.12+i*.56, h=r===1&&i%2?.5:.64, f=F[(i+r*2)%6];
    walze(g,.215,h,f,x,y+h/2,.02); walze(g,.222,h*.34,0xfff8e8,x,y+h*.48,.02); walze(g,.226,.05,METALL,x,y+h-.012,.02); walze(g,.226,.05,METALL,x,y+.028,.02);
    ball(g,.075,F[(i+r*2+3)%6],x,y+h*.48,.235,1,1,.3); } });
  k.kasten(-9.2,-12.9,3.3,.75);
}

/* 7 Schubkarre mit Heu */
function schubkarre(g){
  const f=new THREE.Shape(); [[-1.2,1.35],[1.4,1.35],[.95,.62],[-.8,.62]].forEach(([a,b],i)=>i?f.lineTo(a,b):f.moveTo(a,b));
  form(g,new THREE.ExtrudeGeometry(f,{depth:1.3,bevelEnabled:false}),0xd83a2c,0,0,-.65);
  [-1,1].forEach(s=>strich(g,[-1.24,1.37,s*.66],[1.44,1.37,s*.66],.065,0x8a1e18)); strich(g,[1.43,1.37,-.66],[1.43,1.37,.66],.065,0x8a1e18); strich(g,[-1.23,1.37,-.66],[-1.23,1.37,.66],.065,0x8a1e18);
  /* Rad vorn */
  form(g,new THREE.TorusGeometry(.4,.15,10,24),0x24242a,1.32,.55,0); walze(g,.28,.16,METALL,1.32,.55,0).rotation.x=Math.PI/2; walze(g,.08,.9,EISEN,1.32,.55,0).rotation.x=Math.PI/2;
  [-1,1].forEach(s=>{ strich(g,[.55,.68,s*.45],[1.32,.55,s*.4],.065,EISEN);
    strich(g,[-.65,.62,s*.5],[-.85,.05,s*.55],.07,EISEN); box(g,.34,.08,.16,EISEN,-.85,.04,s*.55);
    strich(g,[.55,.68,s*.5],[-1.2,.9,s*.55],.065,EISEN); strich(g,[-1.2,.9,s*.55],[-1.95,1.18,s*.55],.06,HOLZ3); strich(g,[-1.9,1.16,s*.55],[-2.18,1.265,s*.55],.085,0x24242a); });
  /* großer Heuhaufen mit vielen Halmen */
  ball(g,.72,STROH,.1,1.42,0,1.7,.9,.85); ball(g,.45,STROH2,-.55,1.5,.12,1.2,.95,1); ball(g,.48,STROH,.62,1.52,-.08,1.1,.95,1);
  for(let i=0;i<90;i++){ const a=i*2.4, u=Math.sqrt((i+.5)/90), x=.1+Math.cos(a)*u*1.2, z=Math.sin(a)*u*.62, y=1.4+.66*Math.sqrt(Math.max(0,1-u*u*.9));
    const dx=(zufall()-.5)*.65, dz=(zufall()-.5)*.45, dy=(zufall()-.3)*.32; strich(g,[x-dx*.4,y-.05,z-dz*.4],[x+dx*.6,y+dy,z+dz*.6],.018,[STROH3,STROH2,STROH3][i%3]); }
  for(let i=0;i<14;i++){ const x=-.9+i*.15, s=i%2?1:-1; strich(g,[x,1.38,s*.62],[x+(zufall()-.5)*.3,1.0+zufall()*.2,s*.72],.018,STROH3); }
}

/* 8 Wassertrog */
function wassertrog(g,k){
  [-1.15,1.15].forEach(x=>box(g,.5,.28,1.2,STEIN2,x,.14,0));
  box(g,3.4,.18,1.35,STEIN2,0,.35,0);
  [-1,1].forEach(s=>{ box(g,3.4,.66,.2,STEIN,0,.74,s*.58); box(g,3.52,.13,.3,0xc2baaa,0,1.11,s*.58); });
  [-1,1].forEach(s=>{ box(g,.22,.65,.96,STEIN,s*1.59,.735,0); box(g,.32,.12,.87,0xc2baaa,s*1.6,1.105,0); });
  [[-1,.65],[-.25,.9],[.55,.62],[1.2,.88]].forEach(([x,y])=>box(g,.4,.04,.03,STEIN2,x,y,.69));
  const wm=new THREE.MeshLambertMaterial({color:0x36b4ea,emissive:0x0a4a6a,transparent:true,opacity:.92});
  const w=new THREE.Mesh(new THREE.BoxGeometry(3.0,.06,.97),wm); w.position.set(0,.97,0); g.add(w);
  /* Wasserrohr mit Hahn an der linken Seite */
  walze(g,.16,2.0,EISEN,-1.98,1.0,0); ball(g,.19,METALL,-1.98,2.0,0); strich(g,[-1.98,1.9,0],[-1.25,1.9,0],.1,METALL); strich(g,[-1.27,1.93,0],[-1.2,1.68,0],.095,METALL);
  ring(g,.16,.04,0xe0352c,-1.7,2.17,0).rotation.x=Math.PI/2; walze(g,.035,.2,METALL,-1.7,2.06,0); walze(g,.3,.14,STEIN2,-1.98,.07,0);
  const nass=new THREE.MeshBasicMaterial({color:0x8ad8ff,transparent:true,opacity:.9});
  const strahl=new THREE.Mesh(GEO.cyl,nass); strahl.position.set(-1.2,1.33,0); strahl.scale.set(.035,.66,.035); g.add(strahl);
  const tropfen=[0,1,2,3].map(i=>{ const m=new THREE.Mesh(GEO.sph,nass); m.scale.set(.065,.095,.065); g.add(m); return m; });
  const wellen=[0,1,2].map(()=>{ const m=new THREE.Mesh(new THREE.TorusGeometry(1,.06,5,24),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.6,depthWrite:false})); m.rotation.x=Math.PI/2; m.position.set(-1.1,1.012,0); g.add(m); return m; });
  k.anim.push(t=>{ w.position.y=.972+Math.sin(t*2.2)*.012; strahl.scale.x=strahl.scale.z=.035+Math.sin(t*17)*.006;
    tropfen.forEach((m,i)=>{ const p=(t*1.7+i*.25)%1; m.position.set(-1.2+Math.sin(i*2.1)*.09,1.66-p*p*.64,Math.cos(i*2.1)*.09); });
    wellen.forEach((m,i)=>{ const p=(t*.7+i/3)%1; m.scale.set(.08+p*.34,.08+p*.34,.12); m.material.opacity=.7*(1-p); }); });
}

/* 9 Großer Reifen (aufrecht im Sand, an zwei Steine gelehnt) */
function reifen(g){
  const r=gruppe(g,0,1.2,0); r.rotation.x=-.13;
  form(r,new THREE.TorusGeometry(.92,.4,14,36),0x2e2e36,0,0,0).scale.set(1,1,1.1);
  for(let i=0;i<30;i++){ const a=i*Math.PI/15;
    [-1,1].forEach(s=>{ const w=a+(s>0?.05:-.05); drehe(box(r,.12,.14,.34,0x15151a,Math.cos(w)*1.31,Math.sin(w)*1.31,s*.19),0,0,w+s*.0); });
    drehe(box(r,.09,.085,.14,0x15151a,Math.cos(a+.1)*1.22,Math.sin(a+.1)*1.22,.34),0,0,a+.1); }
  [-1,1].forEach(s=>{ ring(r,.72,.035,0x55555f,0,0,s*.4); ring(r,1.07,.03,0x55555f,0,0,s*.405); ring(r,.56,.05,0x1c1c22,0,0,s*.26); });
  ball(g,.75,0xd2b072,0,-.02,.05,1.5,.28,.95);
  [[-.75,-.6,.42],[.7,-.65,.5]].forEach(([x,z,s])=>ball(g,s,STEIN,x,s*.6,z,1.1,.85,.8));
}

/* 10 Riesenbürste: Borstenwalze an einem Pfosten */
function buerste(g){
  walze(g,.8,.24,STEIN2,0,.12,0); walze(g,.62,.12,STEIN,0,.29,0);
  walze(g,.2,3.1,HOLZ2,0,1.7,0); ball(g,.27,0xe0352c,0,3.28,0);
  walze(g,.36,1.86,0x2a5a9a,0,1.67,0);
  [.69,2.65].forEach(y=>{ walze(g,.58,.16,0x2f7fe8,0,y,0); ring(g,.58,.045,0xffd23a,0,y,0).rotation.x=Math.PI/2; });
  const L=[];
  for(let j=0;j<14;j++) for(let i=0;i<30;i++){ const a=i*Math.PI/15+(j%2)*.105, l=.56+((i*7+j*3)%5)*.025, m=.33+l/2;
    L.push([Math.cos(a)*m,.87+j*.123,Math.sin(a)*m,l,.04,.04,[0xffc21a,0xff9a1a,0xffd84a][(i+j)%3],-a]); }
  ZOO.viele(g,GEO.box,L);
}

/* =============== Holztor (Ausgang) =============== */
function holztor(k,hinten){
  const sc=k.scene;
  const pf=gruppe(hinten,HX,0,TZ);
  [-1,1].forEach(s=>{ box(pf,.72,.5,.9,STEIN2,s*2.65,.25,0); box(pf,.58,4.3,.68,HOLZ2,s*2.65,2.15,0); box(pf,.76,.22,.86,STEIN,s*2.65,4.4,0); ball(pf,.3,ZOO.GOLD,s*2.65,4.72,0);
    [1.0,2.1,3.2].forEach(y=>box(pf,.62,.12,.72,EISEN,s*2.65,y,0));
    /* Rankenpflanzen an den Pfosten */
    for(let i=0;i<13;i++){ const y=.55+i*.29; ball(pf,.19,i%2?BLATT:BLATT2,s*(2.9+Math.sin(i*2.3)*.15),y,.32+Math.cos(i*1.7)*.07,1,.7,.6); if(i%4===1) ball(pf,.09,0xff6a9a,s*(2.9+Math.sin(i*2.3)*.15),y+.1,.47); } });
  box(pf,5.9,.38,.5,HOLZ,0,4.2,-.04); box(pf,6.2,.14,.74,HOLZ2,0,4.45,-.04);
  for(let i=-4;i<=4;i++) ball(pf,.07,ZOO.GOLD,i*.5,4.2,.23);
  verschmelze(pf);
  const fluegel=[-1,1].map(s=>{
    /* s: Seite des Scharniers; der Flügel reicht von dort zur Mitte */
    const g=gruppe(sc,HX+s*2.24,0,TZ), r=-s;
    for(let i=0;i<5;i++){ const x=r*(.225+i*.443), h=3.45+i*.1; box(g,.42,h,.2,i%2?0xb07a40:0x93602e,x,.12+h/2,0); box(g,.3,.08,.16,i%2?0xb07a40:0x93602e,x,.15+h,0); }
    [.55,2.0,3.3].forEach(y=>{ box(g,2.18,.24,.09,HOLZ2,r*1.11,y,.14); box(g,.55,.13,.05,EISEN,r*.3,y,.205); [.12,.45,1.2,1.95].forEach(x=>ball(g,.05,METALL,r*x,y,.23)); });
    strich(g,[r*.2,.65,.13],[r*2.02,1.9,.13],.085,HOLZ2); strich(g,[r*.2,2.1,.13],[r*2.02,3.2,.13],.085,HOLZ2);
    ring(g,.17,.04,EISEN,r*1.85,1.55,.22);
    verschmelze(g); return [g,s]; });
  /* goldenes Zahlenschloss über Kopfhöhe, mit Riegel */
  const schloss=gruppe(sc,HX,2.65,TZ+.34);
  box(schloss,2.5,.18,.1,EISEN,0,0,-.08); [-1.15,1.15].forEach(x=>ball(schloss,.12,METALL,x,0,0,1,1,.6));
  ZOO.zahlenschloss(schloss,0,0,.05).scale.set(1.45,1.45,1.3);
  /* Weg und warmes Licht hinter dem Tor */
  const w=gruppe(sc,HX,0,0);
  box(w,4.2,.02,2.6,0xd8b478,0,0,-14.9);
  [[0,-17.4,4.4],[.7,-20.4,4],[2,-23,3.6]].forEach(([x,z,b],i)=>{ walze(w,1,.02,0xd8b478,x,.009+i*.009,z).scale.set(b/2,.02,2.2); });
  for(let i=0;i<9;i++) [-1,1].forEach(s=>{ const z=-14.6-i*.95, x=s*(3.2+(i%3)*.2+(i>4?(i-4)*.35:0)); ball(w,.34,i%2?BLATT:BLATT2,x,.22,z,1.2,.9,1.1); ball(w,.1,[0xff5a7a,0xffd23a,0xffffff][i%3],x-s*.1,.55,z+.1); });
  ohneSchatten(w); verschmelze(w);
  const glut=schein(sc,'rgba(255,230,150,.75)',HX,2.0,-18,6.5); glut.visible=false;
  let tuer=null;
  tuer=ausgang(k,{ steh:[HX,-11.4], durch:[HX,-15.9], treffer:{x:HX,y:2.1,z:-13.15,b:5.4,h:4.2,t:.9}, name:'Holztor', einfach:'Großes Tor aus Holz', schildOben:[HX,4.5,-12.7], glanz:[HX,2.65,-12.9],
    bewege:(auf)=>{ fluegel.forEach(([g,s])=>{ g.rotation.y=-s*auf*1.65; }); schloss.visible=!(tuer && tuer.offen); glut.visible=auf>.05; glut.material.opacity=auf*.85; } });
  k.kasten(HX,-13.4,5.2,.8); [-1,1].forEach(s=>k.kreis(HX+s*2.65,TZ+.1,.42));
  return tuer;
}

/* =============== Futterhaus (offener Unterstand hinten links) =============== */
function futterhaus(k,hinten){
  const w=gruppe(hinten,0,0,0);
  for(let i=0;i<23;i++){ const x=-16.85+i*.47; box(w,.45,3.55+(i%2)*.06,.14,i%2?0xc89458:0xb68048,x,(3.55+(i%2)*.06)/2,-13.34); }
  [.2,3.45].forEach(y=>box(w,10.9,.18,.08,HOLZ2,-11.68,y,-13.24));
  [-17.0,-6.35].forEach(x=>box(w,.26,4.72,.26,HOLZ2,x,2.36,-13.5));
  /* Strohdach */
  const d=gruppe(w,-11.68,4.62,-12.98); d.rotation.x=.22;
  box(d,11.4,.16,1.95,STROH2,0,0,0); box(d,11.5,.12,.7,STROH,0,.12,-.65); box(d,11.5,.12,.6,STROH,0,.11,.1);
  for(let i=0;i<48;i++){ const x=-5.58+i*.237; box(d,.17,.1,.34+(i%3)*.09,i%2?STROH:STROH3,x,-.02+(i%2)*.025,.98+(i%3)*.04); box(d,.07,.05,1.7,STROH3,x+.1,.2+(i%3)*.012,-.1); }
  /* Wimpelkette unter dem Dach, Laterne in der Mitte */
  for(let i=0;i<20;i++){ const x=-16.5+i*.51, y=4.3-Math.sin((i%10)/10*Math.PI)*.1; const f=kegel(w,.12,.26,[0xe8403a,0xffc21a,0x2f9ae8,0x3fb85a][i%4],x,y-.12,-12.15); f.rotation.x=Math.PI; f.scale.z=.02; }
  for(let i=0;i<10;i++){ const x=-16.75+i*1.02; strich(w,[x,4.34-Math.sin(((i*2)%10)/10*Math.PI)*.1,-12.15],[x+1.02,4.34-Math.sin(((i*2+2)%10)/10*Math.PI)*.1,-12.15],.015,EISEN); }
  box(w,.1,.1,.4,EISEN,-11.65,3.3,-13.1); strich(w,[-11.65,3.3,-12.95],[-11.65,3.17,-12.95],.02,EISEN); box(w,.46,.08,.4,EISEN,-11.65,3.13,-12.95); box(w,.34,.46,.3,0xffdc6a,-11.65,2.86,-12.95); box(w,.46,.08,.4,EISEN,-11.65,2.59,-12.95);
  verschmelze(w);
  schein(hinten,'rgba(255,215,100,.4)',-11.65,2.86,-12.7,1.2);
  [-16.9,-11.7,-6.5].forEach(x=>{ const g=gruppe(k.scene,x,0,-12.15); walze(g,.15,4.42,HOLZ2,0,2.21,0); walze(g,.25,.22,STEIN2,0,.11,0); strich(g,[0,3.75,0],[.45,4.36,0],.07,HOLZ2); strich(g,[0,3.75,0],[-.45,4.36,0],.07,HOLZ2); verschmelze(g); k.kreis(x,-12.15,.24); k.verdecker(g,x,-12.15,.2); });
}

/* =============== Bäume, Felsen, Büsche, Bodenzier im Gehege =============== */
function akazie(par,x,z,h,s){
  const g=gruppe(par,x,0,z);
  strich(g,[0,0,0],[.15*s,h*.55,0],.3*s,0x7a5230); strich(g,[.15*s,h*.52,0],[-.8*s,h*.9,.2*s],.18*s,0x7a5230); strich(g,[.15*s,h*.52,0],[.95*s,h*.88,-.15*s],.17*s,0x8a603a);
  [[-.9,0,.2,1.5,BLATT3],[1.0,-.06,-.2,1.4,BLATT],[.05,.35,.1,1.55,BLATT2],[.1,-.05,.9,.9,BLATT]].forEach(([a,b,c,r,f])=>ball(g,r*s,f,a*s,h+b*s,c*s,1,.36,.85));
  return g;
}
function gehege(k){
  const sc=k.scene;
  /* zwei Schirmakazien mit Steinen am Fuß */
  [[-16.1,1.2,4.7,1],[15.9,-10.7,4.9,1.05]].forEach(([x,z,h,s])=>{ const g=akazie(sc,x,z,h,s); [0,2.1,4.2].forEach(a=>ball(g,.3,STEIN,Math.cos(a)*.45,.14,Math.sin(a)*.45,1.2,.7,1)); verschmelze(g); k.kreis(x,z,.75); k.verdecker(g,x,z,.9); });
  /* Felsen */
  const f=gruppe(sc,0,0,0);
  [[-17,-6.6,.95],[17.1,-5.5,.9],[17,8.6,.85],[-3.4,-12.4,.7],[9.6,-12.4,.65],[17.1,12.4,.7],[-17.2,12.7,.6],[10.2,.2,.8],[1.2,-5.8,.75],[12.2,9.6,.7]].forEach(([x,z,s],i)=>{
    drehe(ball(f,s,i%2?STEIN:0xb0a490,x,s*.45,z,1.1,.75,.9),0,i*1.3,0); ball(f,s*.55,STEIN2,x+(x>0?-.5:.5)*s,s*.24,z+.45*s,1,.8,1); ball(f,s*.4,0xb0a490,x-.3*s,s*.95,z-.1,1.2,.55,1);
    k.kreis(x,z,s*1.08); });
  verschmelze(f);
  /* große Blattbüsche am Rand */
  const b=gruppe(sc,0,0,0);
  [[-17.2,-1.7,.9],[-17.2,6.9,.85],[17.2,-.6,.8],[17.2,5.6,.9],[12.9,-12.5,.8],[-1.7,-12.5,.7],[7.7,-12.5,.75],[-4.6,12.6,.6],[13.6,12.6,.65],[-17.2,-11,.7]].forEach(([x,z,s],i)=>{
    for(let j=0;j<10;j++){ const a=j*.628+i; drehe(ball(b,.55*s,[BLATT,BLATT2,BLATT3][j%3],x+Math.cos(a)*.38*s,(.45+(j%3)*.22)*s,z+Math.sin(a)*.38*s,1.15,.5,.62),0,-a,.55); }
    ball(b,.45*s,BLATT3,x,.35*s,z); for(let j=0;j<4;j++){ const a=j*1.7+i; ball(b,.11*s,[0xff6a8a,0xffd23a,0xffffff,0xff9a1a][(i)%4],x+Math.cos(a)*.45*s,(.8+(j%2)*.25)*s,z+Math.sin(a)*.45*s); }
    k.kreis(x,z,.75*s); });
  verschmelze(b);
  /* Schlammkuhle vorn links: dunkler, glänzender Schlamm, ein paar Steine, Spritzer und Fußabdrücke */
  const m=gruppe(sc,-13.9,0,10.4);
  walze(m,1,.03,0x8a6438,0,.006,0).scale.set(2.15,.03,1.7); walze(m,1,.03,0x543418,0,.018,0).scale.set(1.8,.03,1.4);
  [[1.5,.75,.7,.5],[-1.45,-.7,.75,.55],[-1.2,.95,.55,.42]].forEach(([x,z,a,b],i)=>walze(m,1,.03,0x644020,x,.029+i*.009,z).scale.set(a,.03,b));
  walze(m,1,.03,0x3e2610,.15,.058,.05).scale.set(1.2,.03,.85);
  [[-.65,-.45,.42],[.7,.4,.3],[-.2,.55,.2]].forEach(([x,z,a],i)=>drehe(ball(m,a,0x8a6238,x,.074+i*.009,z,1,.03,.28),0,.4-i*.5,0));
  [0,2,4,6,8,10,12].forEach((i,n)=>{ const a=i*.419+.25; ball(m,.2+(n%3)*.07,n%2?STEIN:STEIN2,Math.cos(a)*(2.05+(n%2)*.18),.09,Math.sin(a)*(1.6+(n%3)*.1),1.2,.6,.9); });
  /* Spritzer rund um die Kuhle */
  for(let i=0;i<34;i++){ const a=i*2.4, u=1.12+(i%5)*.09, h=.05+(i%4)*.025; ball(m,h,i%2?0x644020:0x543418,Math.cos(a)*2.1*u,.02+(i%3)*.004,Math.sin(a)*1.65*u,1.4,.22,.9); }
  /* nasse Fußabdrücke, die aus dem Schlamm hinausführen */
  [[2.55,-.55],[3.15,-.95],[3.85,-.75],[4.45,-1.2]].forEach(([x,z])=>{ walze(m,.23,.012,0x8a6030,x,.012,z); [-.15,0,.15].forEach(v=>ball(m,.06,0x8a6030,x+.27-Math.abs(v)*.3,.018,z+v,1,.18,1)); });
  ohneSchatten(m); verschmelze(m); k.kreis(-14.5,10.4,1.55); k.kreis(-13.2,10.4,1.55);
  const blasen=[[-.7,.3],[.4,-.4],[.8,.5],[-.1,-.1]].map(([x,z],i)=>{ const q=new THREE.Mesh(GROB,new THREE.MeshLambertMaterial({color:0x6e4a26,transparent:true,opacity:.95})); q.position.set(-13.9+x,.07,10.4+z); sc.add(q); return q; });
  k.anim.push(t=>blasen.forEach((q,i)=>{ const p=(t*.45+i*.27)%1, s=.04+p*.14; q.scale.set(s,s*.7,s); q.visible=p<.85; }));
  /* Grasbüschel, Blumen, Kiesel (nicht an den Gegenständen) */
  const sperr=[[-5.5,-3.5],[-4.3,-2.7],[-13.5,-4.5],[-11.5,5.5],[11,-6.5],[5.5,5],[-1.5,7.5],[14.5,2.5],[6,-6],[-14.5,10.4],[-13,10.4],[HX,-11.5]];
  const orte=(n,rand)=>{ const L=[]; let v=0; while(L.length<n && v++<4000){ const x=(zufall()-.5)*35.4, z=(zufall()-.5)*25.8+.2; if(rand && Math.abs(x)<11 && z<4 && z>-8) continue; if(sperr.some(s=>Math.hypot(x-s[0],z-s[1])<2.3) || (x<-6 && z<-10.5)) continue; L.push([x,z]); } return L; };
  const halme=[];
  orte(110,true).concat(orte(22,false)).forEach(([x,z],i)=>{ for(let j=0;j<6;j++){ const a=j*1.05+i, h=.2+zufall()*.3; halme.push([x+Math.cos(a)*.14,h*.42,z+Math.sin(a)*.14,.045,h,.045,[0x8aa83a,0xb0b048,0x6a9a34][i%3],0]); } });
  /* dichter Streifen vorn */
  for(let i=0;i<24;i++){ const x=-11+i*.98+(zufall()-.5)*.8, z=12.1+zufall()*.8; for(let j=0;j<5;j++){ const a=j*1.26+i, h=.2+zufall()*.24; halme.push([x+Math.cos(a)*.12,h*.42,z+Math.sin(a)*.1,.04,h,.04,j%2?0x7aa838:0xa8b448,0]); } }
  ZOO.viele(sc,SPITZ,halme);
  const bl=orte(40,true).concat([[-7,11.8],[-6.1,12.4],[.6,12.2],[1.5,11.4],[7.2,12],[8,12.6],[2.8,1.2],[-8.4,9.4],[9.4,3.4],[-2.4,-7.4]]);
  const koepfe=[]; bl.forEach(([x,z],i)=>{ const f=[0xfff09a,0xff7aa8,0xffffff,0xff9a2a][i%4]; [[0,0],[.28,.14],[-.18,.24]].forEach(([a,c])=>{ koepfe.push([x+a,.22,z+c,.1,.06,.1,f,0]); koepfe.push([x+a,.25,z+c,.038,.04,.038,0xf2b01a,0]); koepfe.push([x+a,.1,z+c,.02,.12,.02,0x4a8a30,0]); }); });
  ZOO.viele(sc,GROB,koepfe);
  const kies=[]; orte(110,false).forEach(([x,z],i)=>{ const s=.05+zufall()*.08; kies.push([x,s*.4,z,s*1.3,s*.7,s,[0xb09a74,0x988c78,0xc8ac80][i%3],i]); });
  ZOO.viele(sc,GROB,kies);
  /* flache Elefantenspuren im Sand (Sohle mit drei Zehen) */
  const spur=[];
  [[[-3.6,.4],[-2.6,4.4],[1.6,5.4],[2.4,10.6]],[[3.2,-9.6],[3.4,-3.4],[8,-1.8],[10.6,3.6]],[[-8.8,-5.6],[-8.4,2.4],[-6.4,7.6]]].forEach(w=>{
    for(let j=0;j+1<w.length;j++){ const a=w[j], b=w[j+1], dx=b[0]-a[0], dz=b[1]-a[1], l=Math.hypot(dx,dz), ux=dx/l, uz=dz/l, n=Math.floor(l/.95);
      for(let i=0;i<n;i++){ const v=i%2?.3:-.3, x=a[0]+ux*(i+.5)*l/n-uz*v, z=a[1]+uz*(i+.5)*l/n+ux*v;
        spur.push([x,-.002,z,.27,.012,.23,0xc6a066,Math.atan2(-uz,ux)]);
        [-.17,0,.17].forEach(q=>{ const vor=.31-Math.abs(q)*.35; spur.push([x+ux*vor-uz*q,.007,z+uz*vor+ux*q,.065,.012,.065,0xc09a60,0]); }); } } });
  ZOO.viele(sc,GEO.cyl,spur);
  /* einzelne Heuhalme, lose verstreut */
  const heu=[];
  [[-3.4,2.6],[.4,4.2],[2.6,8.8],[-5.2,8.2],[-.6,11.2],[4.4,10.4],[1.6,-3.2],[-3,-4.4],[8.2,3.6],[10.4,-2.2],[-8.2,6.4],[7,9.6],[-8.6,-2.4],[.2,.2]].forEach(([x,z],i)=>{
    for(let j=0;j<11;j++){ const a=j*2.4+i, u=.12+(j%5)*.16; heu.push([x+Math.cos(a)*u,.012+(j%4)*.006,z+Math.sin(a)*u*.7,.24+(j%3)*.1,.012,.022,[STROH,STROH2,STROH3][(i+j)%3],a*1.7+i]); } });
  ZOO.viele(sc,GEO.box,heu);
  /* Wimpelmasten hinter der Mauer rechts vom Tor */
  const mast=gruppe(k.wand('hinten'),0,0,0);
  [7,11.8,16.6].forEach(x=>{ walze(mast,.09,3.4,HOLZ2,x,1.7,-14.35); ball(mast,.15,ZOO.GOLD,x,3.48,-14.35); });
  for(let i=0;i<26;i++){ const x=7.2+i*.37, u=((x-7)%4.8)/4.8, y=3.3-Math.sin(u*Math.PI)*.45; const w=kegel(mast,.14,.34,[0xe8403a,0xffc21a,0x2f9ae8,0x3fb85a][i%4],x,y-.17,-14.35); w.rotation.x=Math.PI; w.scale.z=.02; }
  ohneSchatten(mast); verschmelze(mast);
}

/* =============== Landschaft außerhalb der Mauern =============== */
function landschaft(k){
  const sc=k.scene;
  const staemme=[], kronen=[], buesche=[], felsen=[], gras=[];
  const frei=(x,z)=> (Math.abs(x)>20.2 || z<-15.8 || z>15.2) && !(x>HX-4.2 && x<HX+5.5 && z<-13 && z>-30) && !(z<-19.5 && z>-26.5 && x>-15 && x<17) && !(x>19 && x<23.8 && z>-8 && z<9);
  const baeume=[[-23,-17],[-16,-18.5],[-9,-17.5],[-4,-29],[-19,-28],[11,-17.5],[17,-18.5],[23,-15],[14,-30],[22,-27],[-27,-8],[-24,3],[-28,12],[27,-12],[28,2],[26,13],[-10,-33],[6,-35],[-33,-22],[33,-23],[-23,19],[24,20],[-37,0],[37,-4],[0,-41],[-22,-38],[27,-37]];
  baeume.forEach(([x,z],i)=>{ const h=3.4+(i%4)*.55, s=.9+(i%3)*.22; staemme.push([x,h/2,z,.28*s,h,.28*s,0x7a5230,0]);
    kronen.push([x,h,z,2.2*s,.7*s,1.8*s,[BLATT,BLATT3,0x7aa83a][i%3],i]); kronen.push([x+.9*s,h+.45,z-.2,1.4*s,.5*s,1.2*s,BLATT2,i]); kronen.push([x-1.1*s,h+.15,z+.5,1.2*s,.45*s,1*s,BLATT,0]); });
  let v=0; while(buesche.length<150 && v++<3000){ const x=(zufall()-.5)*66, z=(zufall()-.5)*58-6; if(!frei(x,z) || (z>14 && Math.abs(x)<22 && z<17)) continue; const s=.35+zufall()*(z>14?.3:.75); buesche.push([x,s*.5,z,s*1.2,s*.8,s,[BLATT,BLATT3,0x8aa840,BLATT2][v%4],v]); }
  /* dichte Buschreihe direkt hinter den Mauern */
  for(let x=-17.8;x<18;x+=1.45){ if(Math.abs(x-HX)<4.4) continue; buesche.push([x,1.0,-14.9-((x*7)%1+1)%1*.5,.8,.75+((x*3)%1+1)%1*.5,.65,x%2>0?BLATT:BLATT3,x]); }
  for(let z=-12.5;z<13;z+=1.7) [-1,1].forEach(s=>{ if(s>0 && z>-10 && z<10) return; /* rechts freie Sicht auf die Besucher */ buesche.push([s*(19.2+((z*5)%1+1)%1*.4),.95,z,.7,.8+((z*3)%1+1)%1*.45,.75,(z*2)%2>0?BLATT3:BLATT2,z]); });
  v=0; while(felsen.length<34 && v++<2000){ const x=(zufall()-.5)*60, z=(zufall()-.5)*54-5; if(!frei(x,z)) continue; const s=.4+zufall()*.8; felsen.push([x,s*.35,z,s*1.3,s*.75,s,v%2?STEIN:0xb8a488,v]); }
  v=0; while(gras.length<660 && v++<4000){ const x=(zufall()-.5)*68, z=(zufall()-.5)*62-4; if(!frei(x,z)) continue; const h=.3+zufall()*.5; for(let j=0;j<3;j++){ const a=j*2.1+v, hh=h*(1-j*.18); gras.push([x+Math.cos(a)*.13,hh*.45,z+Math.sin(a)*.13,.055,hh,.055,[0xc0b050,0x8aa83a,0xd2bc60][v%3],0]); } }
  ZOO.viele(sc,GEO.cyl,staemme); ZOO.viele(sc,GROB,kronen.concat(buesche)); ZOO.viele(sc,GROB,felsen); ZOO.viele(sc,SPITZ,gras);
  /* ferne Hügel und Wolken */
  const h=gruppe(sc,0,0,0);
  [[-34,-48,18,7],[-8,-56,22,9],[22,-50,19,7.5],[48,-34,16,6],[-50,-24,15,6.5],[-54,10,14,5],[54,8,15,5.5]].forEach(([x,z,b,hh],i)=>ball(h,1,[0xa8a458,0x8a9a4c,0xc0a860][i%3],x,-.6,z,b,hh,b*.6));
  ohneSchatten(h); verschmelze(h);
  const wolken=[[-30,9,-30],[18,11,-38],[40,8,-6],[-42,10,4]].map(([x,y,z],i)=>{ const g=gruppe(sc,x,y,z), w=basis(0xfff8ee);
    [[0,0,1.8],[1.9,-.3,1.35],[-1.9,-.35,1.25],[.7,.7,1.2]].forEach(([a,b,r])=>{ ball(g,r,w,a,b,0,1.2,.7,.8); }); ohneSchatten(g); verschmelze(g); return [g,x,i]; });
  k.anim.push(t=>wolken.forEach(([g,x,i])=>{ g.position.x=x+Math.sin(t*.06+i)*5; }));
  /* Besucherinnen und Besucher auf einem Holzsteg rechts außerhalb (erhöht, damit man sie über die Mauer sieht), mit Luftballons */
  const weg=gruppe(sc,21.4,0,0); box(weg,2.8,.2,18,0x9a6a38,0,1.2,.5); box(weg,.12,.35,18,HOLZ2,-1.44,1.1,.5); for(let z=-8.1;z<9.2;z+=.9) box(weg,2.76,.02,.07,HOLZ2,0,1.305,z);
  [-8.4,-4.2,0,4.2,8.4].forEach(z=>{ [-1.2,1.2].forEach(x=>box(weg,.22,1.15,.22,HOLZ2,x,.57,z+.5)); box(weg,.12,.7,.12,HOLZ,-1.34,1.65,z+.5); }); box(weg,.1,.1,17,HOLZ3,-1.34,2.0,.5); ohneSchatten(weg); verschmelze(weg);
  [[-4.5,0x2f7fe8,0x6b421e,0xe8403a],[.6,0xe8503a,0x2a1a10,0xffc21a],[2.2,0x3fb85a,0xd89a3a,0x2f9ae8],[6.8,0x9a50d0,0x4a2a12,0xff6aa8]].forEach(([z,hemd,haar,ballon],i)=>{
    const s=i===2?.75:1, g=gruppe(sc,21.8,0,z); g.scale.setScalar(s);
    [-.16,.16].forEach(v2=>walze(g,.11,.7,0x3b4a6b,0,.35,v2)); rohr(g,.24,.36,.8,hemd,0,1.08,0); ball(g,.3,0xeab890,0,1.76,0); ball(g,.31,haar,.05,1.85,0,1,.8,1.05);
    [-.1,.1].forEach(v2=>ball(g,.04,0x20140e,-.28,1.78,v2));
    strich(g,[0,1.35,.25],[-.2,1.15,.62],.07,hemd); strich(g,[0,1.35,-.25],[0,.85,-.45],.07,hemd); ball(g,.085,0xeab890,-.2,1.15,.62); ball(g,.085,0xeab890,0,.85,-.45);
    strich(g,[-.2,1.15,.62],[-.25,2.55,.75],.012,0x555555); ball(g,.32,ballon,-.25,2.85,.75,1,1.2,1);
    ohneSchatten(g); verschmelze(g); k.anim.push(t=>{ g.position.y=1.3+Math.abs(Math.sin(t*2+i*1.7))*.09; g.rotation.y=Math.sin(t*.6+i)*.35; }); });
  /* ein kleiner Elefant spaziert weit hinter der Mauer */
  const kl=ZOO.tier(k,'elefant',sc,-12,-23,0,.36); ohneSchatten(kl);
  laeufer(k,kl,[[-13,-22],[-6,-21.4],[-4,-24.2],[-11,-24.8]],.55,2,5);
}

/* =============== Tiere und Bewegtes =============== */
function vogel(k,farbe,hell){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0);
  ball(r,.17,farbe,0,.24,0,1.35,1,.95); ball(r,.11,hell,.1,.2,0,1.1,.9,1); ball(r,.115,farbe,.21,.4,0); drehe(kegel(r,.045,.13,0xf29a1a,.36,.39,0),0,0,-Math.PI/2);
  [-1,1].forEach(s=>{ ball(r,.022,0x101008,.28,.44,s*.07); ball(r,.11,0x4a3a2a,-.05,.27,s*.14,1.3,.6,.3); strich(r,[.02,.13,s*.07],[.05,0,s*.07],.015,0xc87a2a); });
  drehe(box(r,.24,.04,.12,0x4a3a2a,-.28,.28,0),0,0,-.4);
  ohneSchatten(r); verschmelze(r); return g;
}
function flugvogel(k,farbe,mx,y,mz,rx,rz,tempo,start){
  const g=gruppe(k.scene,mx,y,mz), r=gruppe(g,0,0,0);
  ball(r,.22,farbe,0,0,0,1.8,.75,.75); ball(r,.13,farbe,.42,.07,0); drehe(kegel(r,.05,.18,0xffc21a,.6,.06,0),0,0,-Math.PI/2); drehe(box(r,.3,.05,.2,farbe,-.46,.02,0),0,0,.15); ohneSchatten(r); verschmelze(r);
  const fl=[-1,1].map(s=>{ const a=gruppe(g,0,.04,s*.1); ball(a,.26,farbe,-.02,0,s*.32,.75,.12,1.4); ball(a,.14,0xffffff,-.06,.012,s*.58,.8,.14,1); return a; });
  ohneSchatten(g);
  k.anim.push(t=>{ const a=t*tempo+start; g.position.set(mx+Math.cos(a)*rx,y+Math.sin(t*1.3+start)*.25,mz+Math.sin(a)*rz); g.rotation.y=Math.atan2(-Math.cos(a)*rz*Math.sign(tempo),-Math.sin(a)*rx*Math.sign(tempo)); const s=Math.sin(t*8+start)*.65; fl[0].rotation.x=s; fl[1].rotation.x=-s; });
}
function falter(k,x,z,farbe,start){
  const g=gruppe(k.scene,x,2.8,z); ball(g,.055,0x2a1a10,0,0,0,2.2,.8,.8);
  const fl=[-1,1].map(s=>{ const a=gruppe(g,0,.02,s*.03); ball(a,.13,farbe,.05,0,s*.12,.85,.08,1); ball(a,.085,farbe,-.09,0,s*.08,.9,.09,.85); return a; });
  ohneSchatten(g);
  k.anim.push(t=>{ const a=t*.5+start; g.position.set(x+Math.sin(a)*1.5,2.85+Math.sin(t*2.1+start)*.22,z+Math.sin(a*2)*.7); g.rotation.y=Math.atan2(-Math.cos(a*2)*1.4,Math.cos(a)*1.5); const s=Math.sin(t*13+start)*.9; fl[0].rotation.x=s; fl[1].rotation.x=-s; });
}
function erdmaennchen(k,x,y,z,dreh,start){
  const F=0xd0a466, D=0x4a2e18, g=gruppe(k.scene,x,y,z); g.rotation.y=dreh;
  const r=gruppe(g,0,0,0); ball(r,.17,F,0,.3,0,.95,1.8,.9); ball(r,.12,0xf0d8ac,.09,.28,0,.7,1.7,.85); [-1,1].forEach(s=>{ ball(r,.075,F,.03,.04,s*.1,1.5,.7,1); strich(r,[.08,.42,s*.13],[.2,.26,s*.06],.035,F); }); strich(r,[-.1,.1,0],[-.42,.04,.15],.04,0x9a7440);
  const kopf=gruppe(g,.02,.69,0); ball(kopf,.14,F,0,0,0,1.05,.95,1); ball(kopf,.07,0xf0d8ac,.12,-.04,0,1.4,.8,.9); ball(kopf,.025,D,.22,-.03,0);
  [-1,1].forEach(s=>{ ball(kopf,.05,D,.1,.025,s*.065,.8,1,1); ball(kopf,.018,0x000000,.145,.03,s*.07); ball(kopf,.045,D,-.03,.11,s*.11,.8,1,1); });
  ohneSchatten(r); ohneSchatten(kopf); verschmelze(r); verschmelze(kopf);
  k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.9+start)*.9+Math.sin(t*2.3+start)*.2; });
}
function tiere(k){
  const sc=k.scene;
  [[[[1,3.4],[3.2,2],[1.8,.2],[-.8,1.8]],.45,0,0xb87a40],[[[8.6,8.6],[10.4,7.4],[13.8,8],[14.4,10.8],[9.6,11.4]],.55,2.4,0x5a8ac8],[[[-3.4,-8],[-.8,-7.8],[-1.2,-10.2],[-3.8,-10]],.4,1.1,0xe07a38],[[[-8.6,10.6],[-5.4,9.6],[-4.6,11.4],[-7.8,11.9]],.5,4,0x8aa848]].forEach(([weg,tempo,start,farbe])=>laeufer(k,vogel(k,farbe,0xf4e4bc),weg,tempo,start,7));
  flugvogel(k,0xe8403a,-8,6.3,-17,8,2.6,.4,0); flugvogel(k,0x2f9ae8,12,6.5,-17,6,2.4,-.5,2); flugvogel(k,0xffffff,-22,6.8,-1,2.4,8,.33,4); flugvogel(k,0xffc21a,22.5,6.6,1,2.2,7,-.38,1);
  falter(k,1,2.5,0xff8a1a,0); falter(k,11,8,0x3a9af0,2.4); falter(k,-5,10,0xf0d020,4.1);
  /* zwei Erdmännchen auf Felsen */
  erdmaennchen(k,16.95,1.0,-5.5,Math.PI*1.12,0); erdmaennchen(k,17,.95,8.55,Math.PI*.9,2.2);
  /* fallende Blätter unter den Akazien */
  const n=26, im=new THREE.InstancedMesh(GROB,new THREE.MeshLambertMaterial({color:0x9ac040}),n), o=new THREE.Object3D(); im.frustumCulled=false; sc.add(im);
  k.anim.push(t=>{ for(let i=0;i<n;i++){ const b=[[-15.7,1.4],[15.4,-10.4]][i%2], p=(t*.11+i*.139)%1, a=i*2.4;
    o.position.set(b[0]+Math.cos(a)*1.4+Math.sin(t*1.4+i)*.35,4.3*(1-p)+.05,b[1]+Math.sin(a)*1.1+Math.cos(t*1.1+i)*.25); o.rotation.set(t*1.7+i,i,t+i*.5); o.scale.set(.11,.018,.065); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }
    im.instanceMatrix.needsUpdate=true; });
  /* Staubwölkchen im Sand */
  [[-7.6,-5.2,0],[-5.2,-5.4,.35],[8.5,2.6,.6],[-.5,-2.6,.15],[13,-1.8,.8]].forEach(([x,z,v])=>{ const s=schein(sc,'rgba(236,208,150,.9)',x,.3,z,1); s.material.blending=THREE.NormalBlending; s.material.opacity=0;
    k.anim.push(t=>{ const p=(t*.22+v)%1; s.position.set(x+p*.9,.18+p*.55,z); const g=.3+p*1.1; s.scale.set(g,g*.7,1); s.material.opacity=Math.sin(p*Math.PI)*.3; }); });
}

function baue(k){
  GROB=new THREE.SphereGeometry(1,8,6); SPITZ=new THREE.ConeGeometry(1,1,6);
  const H=ZOO.huelle(k,{ boden:[222,190,128], bodenStreu:16, himmelLicht:0xfff2dc, grund:0x8a7048, staerke:.72, sonne:0xffe8b8, sonneStaerke:.52, mauer:0xc49a66, stein:0x96724a, oeffnung:{x:HX,b:5.9} });
  const tuer=holztor(k,H.hinten);
  futterhaus(k,H.hinten);
  gehege(k);
  landschaft(k);
  tiere(k);
  return { tuer, start:[1,1.5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.4,-8.2],[-16.2,-3.6],[-15,4.4],[-16.4,9.1],[-10,11.8],[-6.6,4.6],[-9.4,1.2],[-10.6,-8],[-6.8,-8.8],[-1.4,-11],[1.2,-8.2],[-2.2,-.6],[2.8,11.2],[9,12.2],[15.6,11.4],[16,-2.4],[8.6,-10.8],[13.6,-8.4],[8.4,.8],[15,7]];

const gegenstaende=[
  { x:-5.5, z:-3.8, dreh:-.75, steh:[-5.8,-.9], r:1.35, treffer:[4.4,3.1,2.3], baue:elefant },            /* 1 */
  { x:-13.5, z:-4.5, steh:[-13.5,-2.6], kasten:[2.5,1.75], treffer:[2.5,2.1,1.75], baue:obstkiste },       /* 2 */
  { x:-11.5, z:5.5, steh:[-11.5,7.35], kasten:[4.3,1.35], treffer:[4.3,1.8,1.4], baue:baumstamm },        /* 3 */
  { x:11, z:-6.5, steh:[11,-4.35], kasten:[2.45,1.85], treffer:[2.4,3.3,1.8], baue:futterwaage },          /* 4 */
  { wand:'hinten', x:-14.2, z:-13.15, steh:[-14.2,-11.15], treffer:[3.35,3.15,.7], baue:futterplan },      /* 5 */
  { wand:'hinten', x:-9.2, z:-12.92, steh:[-9.2,-11.1], treffer:[3.2,3.1,.8], baue:dosenregal },           /* 6 */
  { x:5.5, z:5, steh:[5.5,7], kasten:[4.1,1.6], treffer:[4.1,2.2,1.6], baue:schubkarre },                  /* 7 */
  { x:-1.5, z:7.6, steh:[-1.5,9.5], kasten:[4.2,1.5], treffer:[4.2,2.2,1.5], baue:wassertrog },            /* 8 */
  { x:14.4, z:2.4, dreh:-.35, steh:[13.6,4.5], r:1.4, treffer:[2.8,2.7,1.4], baue:reifen },                /* 9 */
  { x:6, z:-6, steh:[6,-4.1], r:.95, treffer:[1.9,3.5,1.9], baue:buerste }                                 /* 10 */
];

return { titel:'Das Elefanten-Gehege', himmel:0xf8dca8, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 4: Das Pinguin-Gehege, draußen in Schnee und Eis. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das Eistor in der hinteren Mauer; die beiden Flügel aus Eisblöcken schieben sich zur Seite. */
RAEUME3D.zoo[3] = (function(){
const B=36, T=27, Q=Math.PI/2;
const GX=-3;                        /* Mitte des Eistors */
const BX=1.5, BZ=-3, BA=6, BB=3.4;  /* Wasserbecken: Mitte und Halbachsen */
const HIMMEL=0x8cc0e4;
const SCHNEE=0xeef6fc, SCHNEE2=0xdcebf6, EIS=0xaee0f4, EIS2=0x8accec, EIS3=0x6ab2de, EISD=0x4a8cbc;
const HOLZ=0x9a6a38, HOLZ2=0x6b421e, HOLZ3=0xc08a4c, METALL=0xb4c0c8, METALL2=0x72828e, DUNKEL=0x2c3a46;
const ROT=0xd83a30, ORANGE=0xf59a30, GELB=0xffc83a, GRUEN=0x2eaa5a, BLAU=0x2e7ac0, WEISS=0xf8fafc, TANNE=0x2e6e52, TANNE2=0x3c8462;
const doppel=c=>mat(c,{side:THREE.DoubleSide});

/* ---------- Grundformen ---------- */
/* kantiger Brocken: unregelmäßig verformter Vielflächner */
function felsGeo(saatF,stufe,rau){
  const geo=new THREE.IcosahedronGeometry(1,stufe===undefined?1:stufe), p=geo.attributes.position, r=rau||.3;
  for(let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i), h=Math.sin(Math.round(x*50)*1.29+Math.round(y*50)*7.82+Math.round(z*50)*3.77+saatF)*4375.8, f=1+(h-Math.floor(h)-.5)*r; p.setXYZ(i,x*f,y*f,z*f); }
  geo.computeVertexNormals(); return geo;
}
function form(par,geo,m,x,y,z){ const t=new THREE.Mesh(geo,typeof m==='number'?mat(m):m); t.position.set(x,y,z); t.castShadow=true; t.receiveShadow=true; par.add(t); return t; }
function bildFlaeche(par,w,h,tex,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex,transparent:true})); m.position.set(x,y,z); par.add(m); return m; }
function instanzen(par,geo,m,n){ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; t.castShadow=false; par.add(t); return t; }
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* ausgeschnittene liegende Platte: Umriss in x/z, Höhe nach oben */
function platte(par,punkte,hoehe,farbe,x,y,z){
  const f=new THREE.Shape(); punkte.forEach(([a,b],i)=>i?f.lineTo(a,-b):f.moveTo(a,-b));
  const m=form(par,new THREE.ExtrudeGeometry(f,{depth:hoehe,bevelEnabled:false}),farbe,x,y,z); m.rotation.x=-Q; return m;
}
/* gemalter Fisch auf einer Zeichenfläche, schaut nach r (1 rechts, -1 links) */
function fischBild(c,x,y,s,farbe,r){
  c.fillStyle=farbe; c.beginPath(); c.ellipse(x,y,46*s,24*s,0,0,7); c.fill();
  c.beginPath(); c.moveTo(x-38*s*r,y); c.lineTo(x-74*s*r,y-24*s); c.lineTo(x-64*s*r,y); c.lineTo(x-74*s*r,y+24*s); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(x-10*s,y-20*s); c.lineTo(x-2*s*r,y-38*s); c.lineTo(x+16*s*r,y-20*s); c.fill();
  c.fillStyle='#ffffff'; c.beginPath(); c.arc(x+24*s*r,y-5*s,8*s,0,7); c.fill(); c.fillStyle='#10202c'; c.beginPath(); c.arc(x+26*s*r,y-5*s,4*s,0,7); c.fill();
}
/* kleiner körperlicher Fisch, Kopf nach +y */
function fisch(par,farbe,bauch,x,y,z,s){
  const g=gruppe(par,x,y,z); g.scale.set(s,s,s);
  ball(g,.2,farbe,0,0,0,.85,2,.55); ball(g,.15,bauch,0,.02,.06,.6,2,.6);
  [-1,1].forEach(v=>{ const f=kegel(g,.12,.34,farbe,v*.1,-.48,0); f.rotation.z=-v*.55; f.scale.z=.04; });
  ball(g,.055,WEISS,.06,.24,.1); ball(g,.028,0x10202c,.06,.24,.15);
  return g;
}
/* Pinguinküken: grau und flauschig, Fuß bei y=0, schaut nach +x, etwa 1 hoch */
function kueken(par,x,y,z,gr,dreh){
  const o=gruppe(par,x,y,z); o.rotation.y=dreh||0; o.scale.setScalar(gr||1);
  const w=gruppe(o,0,0,0), GRAU=0x96a2ac, SCHW=0x252d36;
  ball(w,.3,GRAU,0,.38,0,1,1.18,.95); ball(w,.22,WEISS,.12,.34,0,.85,1.15,1);
  ball(w,.23,SCHW,.02,.82,0); [-1,1].forEach(s=>{ ball(w,.12,WEISS,.15,.8,s*.09,.75,1.05,.9); ball(w,.035,SCHW,.255,.84,s*.1); ball(w,.12,GRAU,-.02,.42,s*.29,.6,1.35,.35).rotation.x=-s*.35; ball(w,.09,ORANGE,.12,.035,s*.13,1.5,.4,.9); });
  const sn=kegel(w,.065,.18,ORANGE,.31,.76,0); sn.rotation.z=-Q;
  verschmelze(w); ohneSchatten(w); w.children.slice(0,1).forEach(m=>{ m.castShadow=true; });
  return { o, w };
}

/* ---------- Eisbrocken, Tannen, Kristalle ---------- */
const BROCKEN=[felsGeo(11,1,.32),felsGeo(17,1,.42),felsGeo(23,0,.4)];
function eisfels(g,x,z,sx,sy,sz,i){
  const f=[EIS2,EIS,EIS3][i%3], a=form(g,BROCKEN[i%3],f,x,sy*.55,z); a.scale.set(sx,sy,sz); a.rotation.y=i*1.3;
  const k=form(g,BROCKEN[(i+1)%3],SCHNEE,x+sx*.04,sy*1.38,z); k.scale.set(sx*.68,sy*.24,sz*.66); k.rotation.y=i;
}
function tanne(g,x,z,s){
  walze(g,.16*s,.7*s,HOLZ2,x,.35*s,z);
  [[1,1.2,1.05],[.78,1.05,1.75],[.54,.95,2.4]].forEach(([r,h,y],i)=>{ kegel(g,r*s,h*s,i%2?TANNE2:TANNE,x,y*s,z); kegel(g,r*s*.52,h*s*.45,SCHNEE,x,(y+h*.29)*s,z); });
}
function kristalle(g,x,z,s){
  [[0,0,.26,1.2,0],[.34,.1,.17,.75,-.35],[-.32,.14,.18,.65,.4],[.05,.34,.13,.45,.1]].forEach(([dx,dz,r,h,n],i)=>{
    const k=gruppe(g,x+dx*s,0,z+dz*s); k.rotation.z=n; k.rotation.x=dz*.5; k.scale.set(s,s,s);
    const f=i%2?EIS:EIS3; rohr(k,r,r*1.1,h,f,0,h/2,0,6); kegel(k,r,r*1.4,f,0,h+r*.7,0).rotation.y=Math.PI/6; });
  ball(g,.55*s,SCHNEE,x,0,z+.1*s,1.2,.22,1);
}

/* ---------- Rand: Eisfelsen innen an der Mauer, Eiszapfen ---------- */
function rand(k,h){
  const hg=gruppe(h.hinten,0,0,0);
  [[-17.3,1.4,1.9],[-15.3,1.1,1.1],[-13.4,1.2,1.5],[-11.5,.9,.8],[-9.9,1,1],[-8.4,.85,1],[-7,.42,.5],[1.1,.42,.5],[2.6,.75,1],[3.9,1.4,2],[5.9,1,1.2],[7.6,1.15,1.5],[9.1,.75,.8]].forEach(([x,s,sy],i)=>eisfels(hg,x,-13.2,s,sy,.62,i));
  verschmelze(hg);
  k.kasten((-18-6.2)/2,-13.15,11.8,1.3); k.kasten((.2+9.9)/2,-13.15,9.7,1.3);
  [[h.links,-1],[h.rechts,1]].forEach(([w,v],n)=>{ const g=gruppe(w,0,0,0);
    for(let i=0,z=-12.4;z<=13;i++,z+=1.9){ const sy=.6+((i*7+n*3)%5)*.24; eisfels(g,v*(17.95+(i%2)*.12),z,.72,sy,1.12,i+n); }
    verschmelze(g); k.kasten(v*17.9,0,1.5,T); });
  /* Eiszapfen unter den Deckplatten */
  const zapfen=new THREE.ConeGeometry(1,1,6); zapfen.rotateX(Math.PI);
  const lege=(par,liste)=>{ const L=liste.map(([x,z],i)=>{ const l=.2+((i*37)%11)*.034; return [x,1.71-l/2,z,.05+(i%3)*.012,l,.05+(i%3)*.012,i%2?0xd8f4ff:0xb0e0f8]; }); ZOO.viele(par,zapfen,L); };
  const hz=[]; for(let x=-17.6;x<=17.8;x+=.43) if(Math.abs(x-GX)>3.2) hz.push([x+zufall()*.18,-13.4]);
  lege(h.hinten,hz);
  [[h.links,-1],[h.rechts,1]].forEach(([w,v])=>{ const L=[]; for(let z=-13;z<=13.2;z+=.5) L.push([v*17.9,z+zufall()*.2]); lege(w,L); });
}

/* ---------- Ferne: Eisberge, Tannen, Schneewehen, Besucherbänke ---------- */
function ferne(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  const berg=(x,z,b,hoch,i)=>{ const h=hoch*.7, m=form(g,BROCKEN[i%3],[0x8ab8d8,0xa4cce6,0x78a8cc][i%3],x,h*.2,z); m.scale.set(b,h,b*.75); m.rotation.y=i;
    const s=kegel(g,b*.5,h*.55,SCHNEE,x,h*1.02,z); s.rotation.y=i; };
  for(let i=0;i<13;i++) berg(-48+i*8+(i%3),-34-(i%3)*5,4+(i%3),4+((i*5)%6)*.9,i);
  for(let i=0;i<7;i++){ const z=-22+i*10; [-1,1].forEach(v=>berg(v*(34+(i%3)*4),z,3.6+(i%3),2.6+((i*3)%4)*.8,i+(v>0?1:0))); }
  verschmelze(g); ohneSchatten(g);
  /* verschneite Tannen hinter der Mauer und an den Seiten */
  const stamm=[], gruen=[], weiss=[];
  const baum=(x,z,s)=>{ stamm.push([x,.35*s,z,.16*s,.7*s,.16*s,HOLZ2]);
    [[1,1.2,1.05],[.78,1.05,1.75],[.54,.95,2.4]].forEach(([r,h,y],i)=>{ gruen.push([x,y*s,z,r*s,h*s,r*s,i%2?TANNE2:TANNE]); weiss.push([x,(y+h*.29)*s,z,r*s*.52,h*s*.45,r*s*.52,SCHNEE]); }); };
  [[-20.5,-16],[-16.5,-16.8],[-12,-17.4],[-8.8,-16.2],[-7.8,-19.5],[1.8,-16.6],[6,-18],[9.5,-16],[13,-17.2],[17.5,-16.2],[21,-17],[-24,-20],[-15,-22],[-2,-27],[12,-23],[23,-22],[-20,-26],[18,-27]].forEach(([x,z],i)=>baum(x,z,1+(i%3)*.25));
  for(let i=0,z=-12;z<=24;i++,z+=3.4){ [-1,1].forEach(v=>{ baum(v*(21.5+((i*7)%4)*.8),z+(v>0?1.3:0),.85+(i%3)*.2); if(i%2) baum(v*(27+(i%3)),z+1,1.2); }); }
  for(let i=0;i<14;i++) baum(-22+i*3.4,20.5+((i*5)%4)*1.3,.5+(i%3)*.1);
  baum(GX-5,-18.5,1); baum(GX+4.8,-19.5,1.15); baum(GX-4.4,-23.5,1.2); baum(GX+4.2,-25,1);
  const b=gruppe(sc,0,0,0);
  ZOO.viele(b,GEO.cyl,stamm); ZOO.viele(b,GEO.cone,gruen); ZOO.viele(b,GEO.cone,weiss);
  /* Schneewehen und Brocken draußen */
  const wehen=[]; for(let i=0;i<70;i++){ let x,z; if(i%3===0){ x=-30+i*.87; z=-16.8-zufall()*7; if(Math.abs(x-GX)<5.5) x+=11; } else if(i%3===1){ x=(i%2?1:-1)*(19.6+zufall()*10); z=-14+zufall()*36; } else { x=-24+zufall()*48; z=15.8+zufall()*10; }
    const r=.6+zufall()*1.2; wehen.push([x,0,z,r*1.4,r*(.24+zufall()*.2),r,i%4?SCHNEE:SCHNEE2]); }
  ZOO.viele(b,GEO.sph,wehen);
  const vorn=gruppe(sc,0,0,0);
  for(let i=0,x=-18.6;x<=18.8;i++,x+=1.5){ const s=.25+((i*7)%5)*.07, m=form(vorn,BROCKEN[i%3],i%2?EIS:EIS2,x+zufall()*.4,s*.45,14+zufall()*.7); m.scale.set(s*1.5,s,s); m.rotation.y=i; }
  /* Bänke für Besucher draußen */
  [[-19.9,-4,1],[19.9,2,-1],[-19.9,7.5,1]].forEach(([x,z,v])=>{ const bk=gruppe(vorn,x,0,z); bk.rotation.y=v*Q; [-.8,.8].forEach(d=>box(bk,.12,.6,.6,DUNKEL,d,.3,0)); [-.18,.04,.26].forEach(d=>box(bk,2,.08,.18,HOLZ,0,.64,d)); [.95,1.2].forEach(y=>box(bk,2,.18,.08,HOLZ3,0,y,-.34)); [-.8,.8].forEach(d=>box(bk,.1,.75,.1,DUNKEL,d,.95,-.4)); });
  verschmelze(vorn); ohneSchatten(vorn);
}

/* ---------- Bodenzier: Fußspuren, blanke Eisflecken, Glitzer, Steinchen ---------- */
function bodenzier(k){
  const sc=k.scene;
  /* dreizehige Pinguinspuren */
  const zeh=new THREE.BufferGeometry(); zeh.setAttribute('position',new THREE.Float32BufferAttribute([-.5,0,0, .5,0,-.5, .12,0,-.08, -.5,0,0, .12,0,-.08, .55,0,0, -.5,0,0, .55,0,0, .12,0,.08, -.5,0,0, .12,0,.08, .5,0,.5],3)); zeh.computeVertexNormals();
  const spuren=[[[-5.4,4.2],[-1,2.2]],[[-1,2.2],[4.6,3.9]],[[4.6,3.9],[6.2,10]],[[-10.4,-3],[-9,-7.6]],[[10.6,-1.8],[13.2,4.2]],[[-9.4,10.6],[-3,11.6]]], L=[];
  spuren.forEach(([a,b])=>{ const d=Math.hypot(b[0]-a[0],b[1]-a[1]), n=Math.floor(d/.55), w=Math.atan2(-(b[1]-a[1]),b[0]-a[0]);
    for(let i=0;i<n;i++){ const u=(i+.5)/n, s=(i%2?1:-1)*.17; L.push([a[0]+(b[0]-a[0])*u+Math.sin(w)*s,.012,a[1]+(b[1]-a[1])*u+Math.cos(w)*s,.3,1,.28,0x9cbcd4,w]); } });
  ZOO.viele(sc,zeh,L).material.side=THREE.DoubleSide;
  /* trockene Grasbüschel im vorderen Teil */
  const halme=[], tupfen=gruppe(sc,0,0,0); [[-9.4,6.2],[-6.4,5.2],[-8,12.3],[-1,7.2],[.4,11.9],[4.2,6.6],[7,10.4],[11,3.4],[-14.6,3.6],[6.2,8.2],[-11,10.8],[16.1,6.9]].forEach(([x,z],i)=>{ for(let j=0;j<10;j++){ const a=j*.7+i, d=j?.13:0, h=.18+((i+j*3)%4)*.05, n=j?.45:.06; halme.push([x+Math.cos(a)*(d+Math.sin(n)*h/2),h/2*Math.cos(n),z+Math.sin(a)*(d+Math.sin(n)*h/2),.035,h,.035,j%2?0xdcca86:0xc2ae6c,0,Math.sin(a)*n,-Math.cos(a)*n]); } ball(tupfen,.14,SCHNEE,x+.32,0,z+.1,1.3,.3,1); });
  verschmelze(tupfen); ohneSchatten(tupfen);
  ZOO.viele(sc,GEO.cone,halme);
  /* unregelmäßige blanke Eisflächen */
  [[-8.8,-1.2,1.5],[6.8,2,1.2],[-1.2,10,1.7],[12.6,-4.8,1],[-14,-5.6,1.3]].forEach(([x,z,r],i)=>{ const s=new THREE.Shape(); for(let j=0;j<13;j++){ const a=j/13*6.283, rr=r*(.65+((j*5+i*3)%7)*.09); j?s.lineTo(Math.cos(a)*rr*1.35,Math.sin(a)*rr*.8):s.moveTo(Math.cos(a)*rr*1.35,Math.sin(a)*rr*.8); }
    const m=new THREE.Mesh(new THREE.ShapeGeometry(s),mat(0x9ed4f0,{transparent:true,opacity:.55,depthWrite:false})); m.rotation.x=-Q; m.rotation.z=i; m.position.set(x,.002+i*.0009,z); m.receiveShadow=true; sc.add(m); });
  const g=[]; for(let i=0;i<260;i++){ const x=-17+zufall()*34, z=-12.5+zufall()*25.5, r=.03+zufall()*.07; if(((x-BX)/(BA+.6))**2+((z-BZ)/(BB+.6))**2<1) continue; g.push([x,0,z,r*1.5,r*.8,r,[WEISS,0xc4dcec,0xffffff,0x9ab4c4][i%4]]); }
  ZOO.viele(sc,GEO.sph,g);
}

/* ---------- Wasserbecken mit Eisrand, schwimmenden Schollen, Küken und springendem Fisch ---------- */
function becken(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  const t=bild(256,256,c=>{ c.fillStyle='#2478b4'; c.fillRect(0,0,256,256); c.lineCap='round';
    for(let i=0;i<46;i++){ const x=zufall()*256, y=zufall()*256, l=18+zufall()*34; c.strokeStyle=i%3?'rgba(150,220,250,.55)':'rgba(14,70,130,.5)'; c.lineWidth=3+(i%2)*2;
      [-256,0,256].forEach(a=>[-256,0,256].forEach(b=>{ c.beginPath(); c.moveTo(x+a,y+b); c.quadraticCurveTo(x+a+l/2,y+b-8,x+a+l,y+b); c.stroke(); })); } });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(3,2);
  const w=new THREE.Mesh(new THREE.CircleGeometry(1,56),new THREE.MeshLambertMaterial({map:t})); w.rotation.x=-Q; w.scale.set(BA+.1,BB+.1,1); w.position.set(BX,.1,BZ); w.receiveShadow=true; sc.add(w);
  k.anim.push(z=>{ t.offset.x=z*.04; t.offset.y=Math.sin(z*.6)*.05; });
  const N=36;
  for(let i=0;i<N;i++){ const a=i/N*6.2832, x=BX+Math.cos(a)*(BA+.17), z=BZ+Math.sin(a)*(BB+.17), tx=-Math.sin(a)*(BA+.17), tz=Math.cos(a)*(BB+.17), l=Math.hypot(tx,tz)*6.2832/N, dreh=Math.atan2(-tz,tx);
    const h=.38+(i%3)*.025, s=box(g,l*1.02,h,.52,[EIS,EIS2,0xc4ecfc][i%3],x,h/2,z); s.rotation.y=dreh;
    const d=box(g,l*.9,.07,.4,SCHNEE,x,h+.03,z); d.rotation.y=dreh; }
  verschmelze(g);
  /* Hindernis in Streifen */
  const AB=BB+.45, AA=BA+.45;
  for(let i=0;i<10;i++){ const z0=-AB+i*AB/5, z1=z0+AB/5, nah=(z0<0&&z1>0)?0:Math.min(Math.abs(z0),Math.abs(z1)), mitte=(Math.abs(z0)+Math.abs(z1))/2, hw=AA*Math.sqrt(Math.max(0,1-((nah+mitte)/2/AB)**2));
    k.kasten(BX,BZ+(z0+z1)/2,hw*2,AB/5); }
  /* kleine schwimmende Schollen */
  [[-1.8,-3.2,.45,1],[.4,-5.2,.36,0],[5.7,-4.1,.42,1],[3.6,-5,.34,0],[5.9,-2.2,.28,0]].forEach(([x,z,r,mit],i)=>{ const s=gruppe(sc,x,.1,z);
    platte(s,[[-r,-.1],[-r*.4,-r*.8],[r*.7,-r*.6],[r,.15],[r*.3,r*.75],[-r*.7,r*.55]],.13,i%2?0xe4f6ff:0xcdeefc,0,0,0);
    if(mit && i===0) kueken(s,0,.13,0,.6,-Q+.5);
    ohneSchatten(s); verschmelze(s);
    k.anim.push(t=>{ s.position.set(x+Math.sin(t*.3+i*2)*.22,.07+Math.sin(t*1.3+i)*.035,z+Math.cos(t*.25+i)*.15); s.rotation.y=Math.sin(t*.2+i)*.5; }); });
  /* ein Küken schwimmt im Kreis */
  const sw=kueken(sc,0,0,0,.68,0), welle=ring(sc,.32,.035,0xc8ecff,0,.13,0); welle.rotation.x=-Q; welle.castShadow=false;
  k.anim.push(t=>{ const a=t*.35, x=BX-3.3+Math.cos(a)*1.85, z=BZ-.2+Math.sin(a)*1.5; sw.o.position.set(x,-.17+Math.sin(t*3)*.025,z); sw.o.rotation.y=Math.atan2(-Math.cos(a)*1.5,-Math.sin(a)*1.85); welle.position.set(x,.125,z); const s=1+Math.sin(t*4)*.12; welle.scale.set(s,s,1); });
  /* zwei Küken watscheln auf dem hinteren Beckenrand */
  [[1.08,1.38,0],[1.62,1.9,2.4]].forEach(([a0,a1,v])=>{ const c=kueken(sc,0,0,0,.78,0);
    k.anim.push(t=>{ const u=t*.22+v, f=.5-.5*Math.cos(u), a=(a0+(a1-a0)*f)*Math.PI, r=Math.sin(u)>=0?1:-1;
      c.o.position.set(BX+Math.cos(a)*(BA+.17),.46,BZ+Math.sin(a)*(BB+.17)); c.o.rotation.y=Math.atan2(-Math.cos(a)*BB*r,-Math.sin(a)*BA*r); c.w.rotation.x=Math.sin(t*7+v)*.16; }); });
  /* springender Fisch mit Spritzern */
  const f=gruppe(sc,0,-1,0), fi=fisch(f,ORANGE,0xffe0a0,0,0,0,.8); fi.rotation.z=-Q; verschmelze(f); ohneSchatten(f);
  const sp=instanzen(sc,GEO.sph,basis(0xd8f4ff),10), o=new THREE.Object3D();
  k.anim.push(t=>{ const p=(t%5)/1.3, an=p<1; f.visible=an; if(an){ f.position.set(.6+p*1.1,.05+Math.sin(p*Math.PI)*1.25,BZ-.4); f.rotation.z=Math.cos(p*Math.PI)*1.1; }
    const q=p<.3?p/.3:(p>=1&&p<1.3?(p-1)/.3:-1), mx=p<.5?.6:1.7;
    for(let i=0;i<10;i++){ const a=i*.628, s=q<0?.0001:.06*(1-q*.7); o.position.set(mx+Math.cos(a)*q*.55,.12+Math.sin(Math.max(0,q)*3.14)*.35,BZ-.4+Math.sin(a)*q*.55); o.scale.set(s,s,s); o.updateMatrix(); sp.setMatrixAt(i,o.matrix); }
    sp.instanceMatrix.needsUpdate=true; });
}

/* ---------- kleines Futterhaus ---------- */
function futterhaus(k){
  const sc=k.scene, g=gruppe(sc,13.6,0,-11.65), ROTH=0xb04434, ROTH2=0x983628;
  box(g,6.6,2.7,2.2,ROTH,0,1.35,0);
  for(let x=-3.05;x<=3.1;x+=.55) box(g,.05,2.6,.04,ROTH2,x,1.35,1.12);
  box(g,6.8,.22,2.36,METALL2,0,.11,0); box(g,6.7,.14,2.3,WEISS,0,2.68,0);
  [-3.32,3.32].forEach(x=>box(g,.18,2.7,.18,WEISS,x,1.35,1.1));
  /* Satteldach mit Schnee */
  [-1,1].forEach(s=>{ const d=box(g,7.2,.14,1.95,DUNKEL,0,3.41,s*.66); d.rotation.x=s*.82; const sn=box(g,7.1,.15,1.72,SCHNEE,0,3.56,s*.66); sn.rotation.x=s*.82; });
  const first=walze(g,.17,7.15,SCHNEE,0,4.17,0); first.rotation.z=Q;
  const gf=new THREE.Shape(); gf.moveTo(-1.12,0); gf.lineTo(1.12,0); gf.lineTo(0,1.3); gf.closePath();
  [-3.3,3.22].forEach(x=>{ const m=form(g,new THREE.ExtrudeGeometry(gf,{depth:.08,bevelEnabled:false}),ROTH2,x,2.72,0); m.rotation.y=Q; });
  /* Schornstein */
  box(g,.5,.9,.5,0x7a6a62,2.2,3.9,-.45); box(g,.64,.14,.64,SCHNEE,2.2,4.4,-.45);
  /* zwei Fenster mit warmem Licht */
  const licht=basis(0xffdf8a);
  [-.3,1.9].forEach(x=>{ box(g,1.15,1.05,.06,licht,x,1.6,1.13); [-1,1].forEach(s=>{ box(g,1.35,.11,.12,WEISS,x,1.6+s*.57,1.15); box(g,.11,1.25,.12,WEISS,x+s*.62,1.6,1.152); }); box(g,.07,1.05,.05,WEISS,x,1.6,1.18); box(g,1.15,.07,.05,WEISS,x,1.6,1.186);
    box(g,1.45,.14,.3,HOLZ2,x,.93,1.22); [-.45,0,.45].forEach((d,i)=>{ ball(g,.17,i%2?TANNE2:TANNE,x+d,1.07,1.26,1.1,.8,.8); ball(g,.05,ROT,x+d+.08,1.14,1.4); }); });
  /* kleine Holztür mit rundem Fensterchen und Stufe */
  box(g,.76,1.9,.05,WEISS,.8,1.17,1.14); box(g,.6,1.78,.06,HOLZ3,.8,1.11,1.17); [-.15,.15].forEach(d=>box(g,.03,1.7,.02,HOLZ2,.8+d,1.11,1.205));
  walze(g,.17,.04,WEISS,.8,1.6,1.215).rotation.x=Q; walze(g,.12,.04,licht,.8,1.6,1.235).rotation.x=Q; ball(g,.055,DUNKEL,1.0,1.05,1.23); box(g,.92,.14,.34,METALL2,.8,.17,1.3);
  /* Holzscheite an der Seite */
  [[0,0],[.48,0],[.24,.4]].forEach(([d,y])=>{ walze(g,.23,.7,HOLZ,2.78+d,.25+y,1.45).rotation.x=Q; walze(g,.17,.04,HOLZ3,2.78+d,.25+y,1.81).rotation.x=Q; });
  verschmelze(g);
  /* rundes Fischzeichen über der Tür */
  const z=bild(256,256,c=>{ c.fillStyle='#f4f8fa'; c.beginPath(); c.arc(128,128,122,0,7); c.fill(); c.strokeStyle='#2e6a9a'; c.lineWidth=14; c.stroke(); fischBild(c,138,128,1.55,'#2e86c1',1); });
  bildFlaeche(g,.52,.52,z,.8,2.43,1.2);
  /* Eiszapfen am Dach */
  const zg=new THREE.ConeGeometry(1,1,6); zg.rotateX(Math.PI); const L=[]; for(let i=0;i<22;i++){ const l=.18+((i*7)%5)*.08; L.push([-3.45+i*.33,2.74-l/2,1.34,.05,l,.05,0xd8f4ff]); } ZOO.viele(g,zg,L);
  flacker(k,15.4,1.9,-9.5,0xffc060,.7,6);
  const rauch=instanzen(sc,GEO.sph,basis(0xf4f6f8,{transparent:true,opacity:.55,depthWrite:false}),6), o=new THREE.Object3D();
  k.anim.push(t=>{ for(let i=0;i<6;i++){ const u=(t*.18+i/6)%1, s=.12+u*.35*(1-u*u*.8); o.position.set(15.8+u*1.1+Math.sin(t+i)*.1,4.5+u*2,-12.1); o.scale.set(s,s,s); o.updateMatrix(); rauch.setMatrixAt(i,o.matrix); } rauch.instanceMatrix.needsUpdate=true; });
  k.kasten(13.6,-11.65,6.9,2.4); k.kasten(16.65,-10,1.2,.9);
}

/* ---------- Ausgang: das Eistor ---------- */
function eistor(k){
  const sc=k.scene, g=gruppe(sc,GX,0,0), r=gruppe(g,0,0,0), F=[0x5aa6d8,0x438cc2,0x6cb6e0];
  /* zwei Pfeiler aus Eisblöcken */
  [-1,1].forEach(s=>{ for(let i=0;i<7;i++){ const b=1.12+(i%2)*.08; box(r,b,.5,1.1,[EIS2,EIS3,EIS][(i+(s>0?1:0))%3],s*2.57,.26+i*.53,-13.58); box(r,b-.2,.06,.02,0xe8faff,s*2.57,.44+i*.53,-13.01+(i%2)*.04+.004); }
    box(r,1.35,.22,1.3,SCHNEE,s*2.57,3.83,-13.58); rohr(r,.28,.34,.4,EISD,s*2.57,4.1,-13.55,6); });
  /* Bogen aus Keilsteinen mit Schneehaube */
  for(let i=0;i<=8;i++){ const a=i/8*Math.PI, x=Math.cos(a)*2.25, y=3.66+Math.sin(a)*.72, st=box(r,.9,.46,.9,i%2?EIS3:EIS2,x,y,-13.62); st.rotation.z=Math.atan2(.72*Math.cos(a),-2.25*Math.sin(a));
    ball(r,.38,SCHNEE,x*1.03,y+.27,-13.65,1.25,.4,1.1); }
  box(r,3.6,.55,.34,EIS,0,3.68,-14.02); box(r,4.3,.18,.5,HOLZ2,0,3.44,-13.95);
  /* goldene Schneeflocke im Schlussstein */
  [0,1,2].forEach(i=>{ box(r,.7,.09,.06,ZOO.GOLD,0,4.34,-13.12+i*.006).rotation.z=i*1.047; }); ball(r,.12,ZOO.GOLD,0,4.34,-13.08,1,1,.5);
  /* Schwelle und Holzsteg davor und dahinter */
  box(r,4.1,.07,.8,METALL2,0,.035,-13.9);
  for(let i=0;i<10;i++) box(r,2.6+(i%2)*.1,.07,.48,i%2?HOLZ:HOLZ3,0,.036+(i%2)*.004,-12.75+i*.55);
  for(let i=0;i<16;i++) box(r,2.6+(i%2)*.1,.07,.48,i%2?HOLZ:HOLZ3,0,.036+(i%2)*.004,-14.6-i*.55);
  /* hinter dem Tor: Laternen entlang des Wegs */
  const warm=basis(0xffd870);
  [-1,1].forEach(s=>[-16.2,-19.4,-22.6].forEach(z=>{ walze(r,.09,1.5,DUNKEL,s*1.9,.75,z); ball(r,.22,warm,s*1.9,1.65,z); kegel(r,.3,.22,DUNKEL,s*1.9,1.94,z); }));
  verschmelze(r);
  /* die beiden Torflügel */
  const fluegel=[-1,1].map(s=>{ const f=gruppe(g,0,0,-14.4), d=gruppe(f,0,0,0);
    for(let j=0;j<6;j++) for(let i=0;i<2;i++){ const x=s*(.52+i*1.03), y=.31+j*.55; box(d,1.0,.52,.3,F[(i+j*2+(s>0?1:0))%3],x,y,0); box(d,.6,.05,.02,0xbfe6fa,x-.08,y+.15,.165); }
    box(d,2.08,3.32,.16,EISD,s*1.03,1.67,-.03);
    /* kräftiger Holzrahmen */
    [.09,1.99].forEach(x=>box(d,.18,3.32,.1,HOLZ2,s*x,1.67,.17)); [.12,2.2,3.22].forEach((y,i)=>box(d,2.08,.2,.09,HOLZ,s*1.04,y,.172+i*.001));
    const gr=ring(d,.24,.05,METALL2,s*.45,1.55,.215); gr.castShadow=false;
    verschmelze(d); return f; });
  /* goldenes Zahlenschloss am rechten Pfeiler */
  const sl=ZOO.zahlenschloss(g,2.57,2.25,-12.86); sl.scale.set(1.3,1.3,1.3); verschmelze(sl);
  const glut=schein(g,'rgba(255,215,120,.85)',0,1.6,-15.6,4.5); glut.visible=false;
  const lampe=new THREE.PointLight(0xffc860,0,8,1.5); lampe.position.set(GX,2.2,-14.9); sc.add(lampe);
  let tuer=null;
  tuer=ausgang(k,{ steh:[GX,-11.1], durch:[GX,-16.2], treffer:{x:GX+.15,y:2.2,z:-13.2,b:6,h:4.4,t:1.2}, name:'Eistor', einfach:'Tor aus Eis', schildOben:[GX,4.5,-12.7], glanz:[GX,1.9,-12.8],
    bewege:(auf)=>{ fluegel.forEach((f,i)=>{ f.position.x=(i?1:-1)*auf*1.9; }); sl.visible=!(tuer && tuer.offen); lampe.intensity=auf*1.2; glut.visible=auf>.03; glut.material.opacity=auf*.45; } });
  k.kasten(GX,-13.6,6.4,1.5);
  return tuer;
}

/* ---------- Ausstattung im Gehege ---------- */
function ausstattung(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  /* Eiskristalle */
  [[-15.7,2.6,1],[5.6,-10.6,1.1],[4.6,11.4,.85],[-9.2,-11.4,.8],[15.8,5,.9],[-15.8,-10.8,.9]].forEach(([x,z,s])=>{ kristalle(g,x,z,s); k.kreis(x,z,.65*s); });
  /* flache Felsinseln mit Küken obendrauf */
  [[-8.3,10,0],[6.6,-9.4,1],[15.4,9,2]].forEach(([x,z,i])=>{ const f=form(g,BROCKEN[i],0x8a9aa8,x,.22,z); f.scale.set(.95,.42,.75); f.rotation.y=i; ball(g,.6,SCHNEE,x-.1,.55,z,1.1,.2,.9); k.kreis(x,z,.95);
    const c=kueken(sc,x,.62,z,.7,-Q+(i-1)*.6); k.anim.push(t=>{ c.w.rotation.x=Math.sin(t*2.3+i*2)*.12; c.w.position.y=Math.max(0,Math.sin(t*1.7+i*3))*.07; }); });
  /* Nester aus Kieseln mit Küken und Eiern */
  [[-14.8,10.2,0],[13.2,11.3,1]].forEach(([x,z,n])=>{ for(let i=0;i<14;i++){ const a=i*.4488; ball(g,.2+(i%3)*.035,[0x7a8894,0x98a6b0,0x66747e][i%3],x+Math.cos(a)*.7,.13,z+Math.sin(a)*.62,1.1,.75,1); }
    walze(g,.6,.06,0xb09a72,x,.04,z); ball(g,.17,0xf8f0dc,x+.28,.22,z+.18,.85,1.2,.85); ball(g,.17,0xf4ead2,x-.05,.22,z+.3,.85,1.2,.85).rotation.z=.4;
    const c=kueken(sc,x-.2,.06,z-.12,.72,-Q+(n?-.5:.5)); k.anim.push(t=>{ c.w.rotation.y=Math.sin(t*.9+n*2)*.5; }); k.kreis(x,z,.9); });
  /* Laternen mit Schneehaube */
  const warm=basis(0xffdc80);
  [[-15.9,-6.2],[-6.9,-9.2],[16,2.2],[1.9,-10.4],[-16,6]].forEach(([x,z])=>{ walze(g,.3,.16,DUNKEL,x,.08,z); walze(g,.08,2.3,DUNKEL,x,1.2,z); box(g,.42,.5,.42,warm,x,2.55,z); [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.07,.56,.07,DUNKEL,x+a*.22,2.55,z+b*.22))); kegel(g,.42,.34,DUNKEL,x,2.99,z); ball(g,.2,SCHNEE,x,3.14,z,1.2,.55,1.2); schein(sc,'rgba(255,215,120,.6)',x,2.55,z,1.5); k.kreis(x,z,.35); });
  verschmelze(g);
  /* Tannen in den vorderen Ecken */
  [[-16,11.8,1.15],[16,12,1.05],[-16.2,-3.9,.9],[15.9,-6.6,1]].forEach(([x,z,s])=>{ const t=gruppe(sc,x,0,z); tanne(t,0,0,s); ball(t,.9*s,SCHNEE,0,0,0,1.1,.18,1.1); verschmelze(t); k.kreis(x,z,.9*s); k.verdecker(t,x,z,s); });
}

/* ---------- Küken zu Fuß ---------- */
const WEGE=[
  [[-.6,2.6],[2.2,2.7],[3,4.3],[1,3.9],[-.9,4.4]],
  [[-8.4,-3.8],[-5.6,-6.9],[-8.2,-7.6],[-10.2,-5.2]],
  [[12.4,4.2],[14.4,6.4],[12.8,8.8],[11.8,6.6]],
  [[-.6,9],[3.2,8.2],[5,9.4],[2.2,10.4]]
];
function watschler(k){
  WEGE.forEach((weg,i)=>{ [0,1].slice(0,i===1||i===3?1:2).forEach(n=>{ const c=kueken(k.scene,0,0,0,n?.58:.76,0); laeufer(k,c.o,weg,.5+i*.05,n?-1.1+20:20,9); k.anim.push(t=>{ c.w.rotation.x=Math.sin(t*7+i+n)*.17; }); }); });
}

/* ---------- Schneeflocken und Schneevögel ---------- */
function wetter(k){
  const sc=k.scene, N=230, F=instanzen(sc,new THREE.OctahedronGeometry(1),basis(0xffffff),N), L=[], o=new THREE.Object3D();
  for(let i=0;i<N;i++) L.push([-24+zufall()*48,zufall()*9,-22+zufall()*38,.028+zufall()*.036,.35+zufall()*.45,zufall()*6.28]);
  k.anim.push(t=>{ L.forEach(([x,y,z,r,v,a],i)=>{ let h=(y-t*v)%9; if(h<0) h+=9; o.position.set(x+Math.sin(t*.7+a)*.45,h,z+Math.cos(t*.5+a)*.3); o.rotation.set(t+a,t*.7,0); o.scale.set(r,r,r); o.updateMatrix(); F.setMatrixAt(i,o.matrix); }); F.instanceMatrix.needsUpdate=true; });
  [[-12,4.6,-19,5,.4],[9,5.2,-21,6,-.3],[-1,6,-24,8,.25]].forEach(([x,y,z,r,v],i)=>{ const g=gruppe(sc,x,y,z), rumpf=gruppe(g,0,0,0);
    ball(rumpf,.2,WEISS,0,0,0,1.8,.8,.8); ball(rumpf,.13,WEISS,.36,.08,0); kegel(rumpf,.05,.16,ORANGE,.54,.07,0).rotation.z=-Q; [-1,1].forEach(s=>ball(rumpf,.028,0x10161c,.42,.12,s*.09));
    const fl=[-1,1].map(s=>{ const f=gruppe(g,0,.04,s*.1); ball(f,.34,0xd4e2ec,-.04,0,s*.3,.65,.12,1.2); return f; });
    verschmelze(rumpf); ohneSchatten(g);
    k.anim.push(t=>{ const a=t*v+i*2; g.position.set(x+Math.cos(a)*r,y+Math.sin(t*.9+i)*.3,z+Math.sin(a)*r*.35); g.rotation.y=Math.atan2(-Math.cos(a)*r*.35*v,-Math.sin(a)*r*v); fl.forEach((f,j)=>{ f.rotation.x=(j?-1:1)*Math.sin(t*6+i)*.55; }); }); });
}

function baue(k){
  const h=ZOO.huelle(k,{ B, T, boden:[208,225,238], bodenStreu:12, himmelLicht:0xdcecff, grund:0x70889c, staerke:.6, sonne:0xfff2dc, sonneStaerke:.42, mauer:0x9cc2da, stein:0xe8f3fa, oeffnung:{x:GX,b:4.6} });
  rand(k,h);
  ferne(k);
  bodenzier(k);
  becken(k);
  futterhaus(k);
  const tuer=eistor(k);
  ausstattung(k);
  watschler(k);
  wetter(k);
  return { tuer, start:[-2.5,3.5] };
}

/* ---------- die 10 Gegenstände ---------- */
const gegenstaende=[
  { x:-7, z:1.4, steh:[-7,3.5], r:1.05, treffer:[2.1,3.3,1.9], baue(g,k){ /* 1 großer Pinguin auf einem Eissockel */
      rohr(g,.98,1.12,.34,EIS3,0,.17,0,8); rohr(g,.84,.9,.24,EIS,0,.46,0,8); walze(g,.82,.06,SCHNEE,0,.6,0);
      [[-.95,.5,.16],[.9,.6,.2],[.6,-.85,.15]].forEach(([x,z,r])=>ball(g,r,SCHNEE,x,.08,z,1.2,.8,1));
      ZOO.tier(k,'pinguin',g,0,0,-Q+.38,1.4,.63); } },
  { x:2.8, z:-1.25, steh:[3,1.65], r:1, treffer:[2.8,1.7,2.1], baue(g,k){ /* 2 große Eisscholle im Becken */
      const P=[[-1.4,-.15],[-.95,-.85],[-.1,-1.02],[.8,-.8],[1.35,-.2],[1.12,.6],[.35,.98],[-.55,.88],[-1.18,.52]];
      platte(g,P,.48,EIS2,0,.08,0); platte(g,P.map(([x,z])=>[x*.92,z*.9]),.14,0xf2fbff,0,.56,0);
      [[-.7,-.5,.34,.85],[-.28,-.66,.24,.55],[-1,-.15,.2,.4]].forEach(([x,z,r,h],i)=>{ const s=kegel(g,r,h,i%2?EIS:0xd4f2ff,x,.69+h/2,z); s.rotation.y=i; });
      /* ein blauer Fisch liegt obendrauf */
      const f=fisch(g,BLAU,0x9ad4f4,.35,.82,.2,.82); f.rotation.set(-Q+.35,0,-Q+.3);
      const schaum=ring(g,1.34,.045,basis(0xe4f8ff,{transparent:true,opacity:.85}),0,.12,0); schaum.rotation.x=-Q; schaum.scale.y=.76; schaum.castShadow=false;
      k.anim.push(t=>{ schaum.material.opacity=.55+Math.sin(t*1.6)*.3; }); } },
  { x:9.4, z:-5.7, steh:[9.6,-3.6], r:.95, treffer:[1.6,1.9,1.5], baue(g){ /* 3 Eimer voller Fische */
      rohr(g,.82,.62,1.15,doppel(GRUEN),0,.6,0,24,true); walze(g,.62,.07,0x1e7a42,0,.06,0); walze(g,.76,.06,0x8ad4f0,0,1.04,0);
      ring(g,.83,.065,0x1e7a42,0,1.17,0).rotation.x=Q; ring(g,.68,.035,0x1e7a42,0,.35,0).rotation.x=Q;
      const h=ring(g,.84,.04,METALL2,0,1.16,-.05,Math.PI); h.rotation.x=-.5; const gr=walze(g,.075,.42,HOLZ2,0,1.9,-.51); gr.rotation.z=Q;
      [[-.38,1.38,.24,.45,BLAU,0x9ad4f4],[.34,1.45,.2,-.38,ORANGE,0xffe0a0],[0,1.52,-.12,.06,0x7a8e9e,0xd8e4ec],[-.12,1.28,.45,-.2,ORANGE,0xffe0a0],[.45,1.25,-.18,-.7,BLAU,0x9ad4f4]].forEach(([x,y,z,n,f,b],i)=>{ fisch(g,f,b,x,y,z,.9).rotation.z=(i%2?0:Math.PI)+n; });
      const t=bild(128,128,c=>{ c.fillStyle='#f4f8fa'; c.beginPath(); c.arc(64,64,60,0,7); c.fill(); fischBild(c,70,66,.72,'#2e86c1',1); });
      bildFlaeche(g,.62,.62,t,0,.62,.75).rotation.x=-.17; } },
  { x:-10.4, z:-8.6, steh:[-10.2,-6.5], r:.75, treffer:[1.6,4,1], baue(g){ /* 4 großes Thermometer am Pfosten */
      walze(g,.17,1.2,HOLZ2,0,.6,-.2); walze(g,.42,.2,METALL2,0,.1,-.15);
      box(g,1.3,3.1,.16,HOLZ,0,2.3,-.08); box(g,1.06,2.88,.06,0xfff6dc,0,2.3,.03); ball(g,.62,SCHNEE,0,3.88,-.06,1.15,.35,.5);
      walze(g,.16,2.2,0xc8dce8,0,2.46,.12); ball(g,.16,0xc8dce8,0,3.56,.12);
      walze(g,.09,1.2,0x1e62d0,0,1.96,.23); ball(g,.09,0x1e62d0,0,2.56,.23); ball(g,.3,0x1e62d0,0,1.3,.18);
      ball(g,.07,WEISS,-.11,1.41,.45);
      for(let i=0;i<11;i++){ const y=1.76+i*.17, lang=i%5===0; [-1,1].forEach(s=>box(g,lang?.27:.15,.045,.03,DUNKEL,s*(.24+(lang?.135:.075)),y,.08)); }
      /* kalt unten (Schneeflocke), warm oben (Sonne) */
      [0,1,2].forEach(i=>{ box(g,.28,.045,.03,0x2e8ad8,-.34,1.3,.08+i*.006).rotation.z=i*1.047; });
      ball(g,.11,GELB,.34,3.55,.07,1,1,.35); for(let i=0;i<8;i++){ const a=i*.785; box(g,.09,.035,.025,ORANGE,.34+Math.cos(a)*.18,3.55+Math.sin(a)*.18,.08).rotation.z=a; } } },
  { x:11.2, z:-9.5, steh:[11.4,-7.4], kasten:[2,1.4], treffer:[2,3.4,1.4], baue(g){ /* 5 Kühlschrank */
      const H=0xf4f6f8, R=0x8a9aa8;
      [-.7,.7].forEach(x=>[-.4,.4].forEach(z=>walze(g,.09,.16,DUNKEL,x,.08,z)));
      box(g,1.8,3.05,1.1,R,0,1.66,-.05);
      box(g,1.66,1.9,.14,H,0,1.14,.54); box(g,1.66,.94,.14,H,0,2.62,.54);
      box(g,1.7,.06,.04,DUNKEL,0,2.12,.52);
      [[1.5,.9],[2.55,.52]].forEach(([y,l])=>{ box(g,.1,l,.1,METALL2,.62,y,.73); [-1,1].forEach(s=>box(g,.1,.09,.14,METALL2,.62,y+s*(l/2-.05),.65)); });
      box(g,1.9,.1,1.24,METALL,0,3.23,-.02);
      const t=bild(200,200,c=>{ c.fillStyle='#fff6cc'; c.fillRect(0,0,200,200); c.strokeStyle='#c89a2a'; c.lineWidth=10; c.strokeRect(0,0,200,200); fischBild(c,108,70,.9,'#2e86c1',1); fischBild(c,92,140,.75,'#e67e22',-1); });
      bildFlaeche(g,.72,.72,t,-.28,1.35,.62).rotation.z=.08;
      [[-.55,2.8,ROT],[-.2,2.55,BLAU],[.1,2.82,GRUEN],[-.28,1.74,ROT]].forEach(([x,y,f])=>ball(g,.1,f,x,y,.63,1,1,.5));
      /* Gitter unten */
      [.32,.42].forEach(y=>box(g,1.2,.04,.03,METALL2,0,y,.62)); } },
  { x:-13.2, z:-1.6, dreh:.42, steh:[-12.2,.6], kasten:[3,1.5], treffer:[3,3.1,.9], baue(g){ /* 6 Eistafel mit Fischbildern */
      [-1.1,1.1].forEach(x=>{ rohr(g,.24,.32,1.1,EIS3,x,.55,-.05,6); ball(g,.45,SCHNEE,x,.04,0,1.15,.35,1); });
      box(g,3,2.05,.32,EIS2,0,1.9,-.06);
      [-1,1].forEach(s=>{ for(let i=0;i<6;i++) box(g,.48,.2,.42,i%2?EIS:0xc4ecfc,-1.25+i*.5,1.9+s*1.04,-.06); for(let i=0;i<4;i++) box(g,.2,.47,.425,i%2?0xc4ecfc:EIS,s*1.48,1.17+i*.49,-.06); });
      ball(g,.7,SCHNEE,-.7,3.03,-.06,1.2,.28,.45); ball(g,.65,SCHNEE,.75,3.0,-.06,1.2,.24,.45);
      [-1.2,-.7,-.25,.3,.65,1.15].forEach((x,i)=>{ const z=kegel(g,.07,.25+(i%3)*.12,0xd8f4ff,x,.74-(i%3)*.06,.02); z.rotation.x=Math.PI; });
      const t=bild(512,340,c=>{ const v=c.createLinearGradient(0,0,512,340); v.addColorStop(0,'#f4fdff'); v.addColorStop(.5,'#d4f0fc'); v.addColorStop(1,'#b4e0f6'); c.fillStyle=v; c.fillRect(0,0,512,340);
        c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=14; c.lineCap='round'; [[30,90,100,24],[40,130,70,86],[420,320,490,250]].forEach(([a,b,d,e])=>{ c.beginPath(); c.moveTo(a,b); c.lineTo(d,e); c.stroke(); });
        fischBild(c,150,88,1.35,'#1e6ab0',1); fischBild(c,372,176,1.2,'#e6701e',-1); fischBild(c,160,258,1.05,'#5a7488',1);
        c.strokeStyle='#4aa0d8'; c.lineWidth=6; [[390,70],[430,288]].forEach(([x,y])=>{ for(let i=0;i<3;i++){ const a=i*1.047; c.beginPath(); c.moveTo(x-Math.cos(a)*32,y-Math.sin(a)*32); c.lineTo(x+Math.cos(a)*32,y+Math.sin(a)*32); c.stroke(); } }); });
      bildFlaeche(g,2.7,1.8,t,0,1.9,.17); } },
  { x:-12.7, z:6.2, steh:[-11,8.4], r:1.7, treffer:[3.5,2.4,3.0], baue(g){ /* 7 großer Schneehaufen: weiche, runde Kuppen */
      const rund=new THREE.SphereGeometry(1,32,20);
      [[0,.12,0,1.65,.95,1.45,WEISS],[-.2,.82,-.1,1.12,.8,1.02,WEISS],[-.08,1.42,-.05,.68,.55,.64,WEISS],
       [1.05,.2,.7,.75,.55,.7,SCHNEE],[-1.1,.16,.75,.7,.48,.68,SCHNEE],[.15,.1,1.05,.8,.42,.55,SCHNEE]].forEach(([x,y,z,a,b,c,f])=>{ form(g,rund,f,x,y,z).scale.set(a,b,c); });
      [[1.6,1.25,.26],[1.25,1.55,.19],[-1.6,1.2,.22]].forEach(([x,z,r])=>ball(g,r,WEISS,x,r*.85,z));
      /* ein Tannenzweig schaut heraus */
      strich(g,[.3,1.6,.25],[1,2.22,.45],.045,HOLZ2); [.35,.65,.95].forEach((u,i)=>{ [-1,1].forEach(s=>ball(g,.17,i%2?TANNE2:TANNE,.3+.7*u+s*.12,1.6+.62*u-s*.06,.25+.2*u,1.3,.45,.6).rotation.z=.8+s*.7); }); ball(g,.07,ROT,.75,1.92,.52); ball(g,.07,ROT,.86,1.88,.5); } },
  { x:14.5, z:-2.4, dreh:-.55, steh:[12.9,-.4], kasten:[2.5,2.2], treffer:[2.6,2.9,1.5], baue(g,k){ /* 8 Spülbecken */
      const S=0xaab8c2, D=0x64747e;
      [-1,1].forEach(x=>[-1,1].forEach(z=>walze(g,.08,.2,DUNKEL,x*.95,.1,z*.45)));
      box(g,2.2,1,1.15,S,0,.7,0);
      [-.55,.55].forEach(x=>{ box(g,.96,.8,.05,0xc4d0d8,x,.68,.59); ball(g,.075,D,x-Math.sign(x)*.32,.8,.66); });
      /* offene Wanne mit Wasser */
      box(g,2.4,.22,.2,D,0,1.31,.55); box(g,2.4,.22,.2,D,0,1.31,-.55); [-1.08,1.08].forEach(x=>box(g,.24,.215,.9,D,x,1.307,0));
      box(g,1.92,.09,.9,0x2a90d0,0,1.24,0); [-.3,.4].forEach((x,i)=>ball(g,.17-i*.03,0xe8f8ff,x,1.3,.1+i*.1,1.3,.5,1));
      /* Fliesenwand und Wasserhahn */
      box(g,2.4,1.1,.14,0x3a9ac0,0,1.94,-.68); for(let i=0;i<5;i++) for(let j=0;j<2;j++) box(g,.43,.45,.03,(i+j)%2?0xf4fafc:0x9ad4e8,-.94+i*.47,1.7+j*.49,-.6);
      walze(g,.09,.9,METALL2,0,1.85,-.46); const bog=ring(g,.27,.085,METALL2,0,2.28,-.19,Math.PI); bog.rotation.y=Q; walze(g,.085,.22,METALL2,0,2.18,.08);
      [-1,1].forEach(s=>{ walze(g,.05,.2,METALL2,s*.36,1.55,-.48); ball(g,.11,s<0?ROT:BLAU,s*.36,1.68,-.48,1,.7,1); });
      /* Seifenflasche, Schwamm und Handtuch */
      walze(g,.14,.42,GRUEN,-.98,1.63,-.34); walze(g,.04,.18,WEISS,-.98,1.92,-.34); box(g,.16,.06,.08,WEISS,-.93,2.02,-.34);
      box(g,.36,.15,.24,GELB,.96,1.49,.42);
      box(g,.06,.06,.7,METALL2,1.2,1.15,.05); box(g,.07,.75,.55,ROT,1.2,.8,.05); box(g,.09,.1,.57,WEISS,1.2,.6,.05);
      const tr=ball(g,.065,basis(0xbfeaff,{transparent:true,opacity:.95}),0,2,.08,1,1.4,1);
      k.anim.push(t=>{ const u=(t*.8)%1; tr.position.y=2.04-u*u*.74; tr.visible=u<.92; }); } },
  { x:8.9, z:6.2, dreh:.3, steh:[8.6,8.5], kasten:[3.8,2.3], treffer:[3.7,1.7,1.9], baue(g){ /* 9 Schlitten */
      const L=0xc88a44;
      [-.62,.62].forEach(z=>{ box(g,2.5,.13,.14,METALL2,-.15,.075,z); box(g,2.5,.13,.18,ROT,-.15,.2,z);
        /* Kufe vorn weit hochgebogen */
        const b=ring(g,.62,.1,ROT,1.1,.82,z,Math.PI*1.12); b.rotation.z=-Q; ball(g,.16,ZOO.GOLD,1.1+Math.cos(Math.PI*.62)*.62,.82+Math.sin(Math.PI*.62)*.62,z);
        [-1.05,-.15,.75].forEach(x=>box(g,.14,.55,.13,HOLZ2,x,.52,z));
        box(g,2.45,.13,.16,HOLZ,-.18,.82,z); });
      [-1.05,-.15,.75].forEach(x=>box(g,.16,.12,1.36,HOLZ2,x,.76,0));
      [-.46,-.155,.155,.46].forEach((z,i)=>box(g,2.4,.1,.25,i%2?L:HOLZ3,-.18,.93,z));
      /* Zugschnur am vorderen Querholz */
      const bogen=[[1.72,.82,-.62],[2.02,.2,-.35],[2.18,.07,.15],[1.98,.1,.5],[1.72,.82,.62]]; for(let i=0;i<4;i++){ strich(g,bogen[i],bogen[i+1],.04,GELB); ball(g,.045,GELB,bogen[i+1][0],bogen[i+1][1],bogen[i+1][2]); }
      walze(g,.06,1.3,HOLZ2,1.72,.82,0).rotation.x=Q; } },
  { x:-3.9, z:7.4, dreh:.2, steh:[-3.5,9.7], kasten:[2.3,1.6], treffer:[2.2,3.1,1.5], baue(g){ /* 10 Schneeschaufel lehnt am Holzgeländer */
      [-.95,.95].forEach(x=>{ box(g,.24,1.55,.24,HOLZ2,x,.775,-.12); ball(g,.2,SCHNEE,x,1.57,-.12,1.05,.6,1.05); });
      box(g,2.15,.2,.18,HOLZ,0,1.34,.08); box(g,2.15,.18,.14,HOLZ,0,.7,-.12);
      const s=gruppe(g,.02,.04,.74); s.rotation.x=-.35;
      /* breites rotes Blatt mit Rand und Metallkante */
      box(s,1.2,.92,.07,ROT,0,.5,0); [-.6,.6].forEach(x=>box(s,.09,.94,.24,0xb02a22,x,.51,.07)); box(s,1.28,.1,.2,0xb02a22,0,.96,.05); box(s,1.24,.12,.09,METALL,0,.06,.012);
      [-.28,.28].forEach(x=>box(s,.07,.68,.04,0xf06050,x,.5,.05));
      kegel(s,.17,.45,METALL2,0,1.2,0); walze(s,.075,1.6,0xe0b070,0,1.85,0);
      /* Griff oben */
      box(s,.52,.1,.12,ROT,0,2.64,0); [-.22,.22].forEach(x=>strich(s,[0,2.62,0],[x,2.92,0],.05,ROT)); const q=walze(s,.07,.54,ROT,0,2.93,0); q.rotation.z=Q;
      /* ein wenig Schnee auf dem Blatt */
      ball(s,.26,WEISS,-.18,.2,.1,1.4,.7,.55); ball(s,.18,WEISS,.25,.16,.1,1.3,.7,.55); } }
];

const verstecke=[[-15.4,-8.2],[-12.2,-10.6],[-8,-10.4],[.9,-8.2],[4.2,-8.8],[8.2,-9.8],[15.6,-8.4],[11.4,-3],[15.5,.2],[10.8,2],
  [13.6,7.6],[11.2,10.6],[6.8,4.2],[1.8,12.2],[-5.6,11.6],[-12.4,11.4],[-15.8,8.4],[-15.2,.2],[-9.6,-4.4],[-10.4,3.6]];

return { titel:'Das Pinguin-Gehege', himmel:HIMMEL, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 5: Das Savannen-Gehege in der Abendsonne. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die rot-weiße Schranke in der Lücke der hinteren Mauer, sie hebt sich beim Öffnen. */
RAEUME3D.zoo[4] = (function(){
const B=36, T=27;
const EX=6;                         /* Mitte der Schranke */
const HOLZ=0x9a6a38, HOLZ2=0x6b421e, HOLZ3=0xbe8a50, FELS=0x9c8874, FELS2=0x7e6a58, FELS3=0xb8a088;
const LAUB=0x5f8a34, LAUB2=0x7ca23e, LAUB3=0x4e742c, ERDE=0xa8784a, SANDH=0xd9ae6c, SANDD=0xb88a50;
const HEU=0xf0cc52, HEU2=0xd8ac34, ROT=0xd83428, WEISS=0xf8f4ea, DUNKEL=0x2a1a10, METALL=0x5a6a76, SCHWARZ=0x1c1c1e;
const leuchte=()=>mat(0xffd870,{emissive:0xd89a30});   /* Lampenglas, für alle Laternen dasselbe Material */
const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });

/* ---------- Grundformen ---------- */
/* Walze oder Kugel mit eigener Streckung */
function scheibe(par,rx,h,rz,c,x,y,z){ const m=walze(par,1,h,c,x,y,z); m.scale.set(rx,h,rz); return m; }
/* ausgeschnittene Platte mit Dicke (Punkte in x/y, Dicke nach +z) */
function platte(par,punkte,tiefe,farbe,x,y,z){
  const f=new THREE.Shape(); punkte.forEach((p,i)=>{ if(i) f.lineTo(p[0],p[1]); else f.moveTo(p[0],p[1]); });
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tiefe,bevelEnabled:false}),mat(farbe)); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}
/* Fläche mit gemaltem Bild */
function bildFlaeche(par,w,h,textur,x,y,z,dreh){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:textur,transparent:true})); m.position.set(x,y,z); m.rotation.y=dreh||0; par.add(m); return m;
}
/* Schirmakazie: schräger Stamm, Äste und flache Kronen */
function akazie(par,x,z,h,r,neig){
  const n=neig||0, kx=x+n;
  strich(par,[x,0,z],[x+n*.35,h*.55,z],.2+r*.05,HOLZ2);
  strich(par,[x+n*.35,h*.55,z],[kx-r*.5,h-.2,z+.1],.13,HOLZ2);
  strich(par,[x+n*.35,h*.55,z],[kx+r*.45,h-.15,z-.1],.12,HOLZ2);
  strich(par,[x+n*.35,h*.55,z],[kx,h,z-r*.2],.1,HOLZ);
  ball(par,1,LAUB3,kx,h,z,r,r*.2,r*.7);
  ball(par,1,LAUB,kx-r*.4,h+r*.1,z+r*.12,r*.62,r*.17,r*.48);
  ball(par,1,LAUB2,kx+r*.35,h+r*.16,z-r*.1,r*.6,r*.17,r*.45);
  ball(par,1,LAUB2,kx,h+r*.26,z,r*.42,r*.13,r*.36);
}
/* runder Fels aus mehreren Brocken */
function fels(par,x,z,s,dreh){
  ball(par,s,FELS,x,s*.4,z,1,.72,.9).rotation.y=dreh||0;
  ball(par,s*.6,FELS3,x-s*.35,s*.62,z+s*.12,1,.7,.9);
  ball(par,s*.45,FELS2,x+s*.62,s*.18,z+s*.34,1.1,.65,.9);
}

/* Weniger Zeichenaufrufe: in jeder Gruppe eines Tiers die direkt daran hängenden Teile je Farbe zusammenfassen (die Gelenk-Gruppen bleiben beweglich) */
function buendeln(tierG){
  const G=[]; tierG.traverse(o=>{ if(o.isGroup) G.push(o); });
  G.forEach(g=>{ const fest=g.children.filter(c=>c.isMesh); if(fest.length<2) return; const s=gruppe(g,0,0,0); fest.forEach(m=>s.add(m)); verschmelze(s); });
  return tierG;
}

/* ---------- Boden: ausgetretene Wege und trockene Risse ---------- */
function wege(k){
  const t=bild(1024,768,g=>{
    const X=x=>(x+B/2)/B*1024, Z=z=>(z+T/2)/T*768;
    g.lineCap='round'; g.lineJoin='round';
    const spur=(P,w,f)=>{ g.strokeStyle=f; g.lineWidth=w; g.beginPath(); g.moveTo(X(P[0][0]),Z(P[0][1])); for(let i=1;i<P.length-1;i++){ g.quadraticCurveTo(X(P[i][0]),Z(P[i][1]),X((P[i][0]+P[i+1][0])/2),Z((P[i][1]+P[i+1][1])/2)); } const e=P[P.length-1]; g.lineTo(X(e[0]),Z(e[1])); g.stroke(); };
    [[[6,-13.5],[6,-9],[3,-4],[2,1],[1,5],[1.6,14]],[[2,1],[-3,2.6],[-8,2.4],[-12,2.2],[-15,-1]],[[2.6,-.5],[7,0],[11,1.6],[17,3.6]],[[4.5,-7],[-2,-7.6],[-8,-5.4],[-12,-5]]].forEach(P=>{ spur(P,66,'rgba(176,122,64,.28)'); spur(P,46,'rgba(190,138,78,.5)'); spur(P,24,'rgba(214,166,104,.45)'); });
    for(let i=0;i<150;i++){ let x=zufall()*1024, y=zufall()*768; g.strokeStyle='rgba(120,80,34,.3)'; g.lineWidth=2; g.beginPath(); g.moveTo(x,y); for(let j=0;j<3;j++){ x+=(zufall()-.5)*34; y+=(zufall()-.5)*26; g.lineTo(x,y); } g.stroke(); }
    for(let i=0;i<500;i++){ g.fillStyle=i%2?'rgba(130,92,50,.4)':'rgba(240,208,140,.45)'; g.fillRect(zufall()*1018,zufall()*762,3+(i%3),3); }
  });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(B,T),new THREE.MeshLambertMaterial({map:t,transparent:true,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.y=.006; m.receiveShadow=true; k.scene.add(m);
}

/* ---------- wehendes Gras ---------- */
function gras(k){
  const geo=new THREE.ConeGeometry(1,1,4); geo.translate(0,.5,0);
  const halme=[], farben=[0xd8b04c,0xc29436,0xe8c868,0xa89438];
  const frei=[[-11.5,-7.5,2.4],[7,-3.8,2],[-4.5,-2.5,2.8],[-14,.8,1.3],[14.2,1.2,1.4],[-2.5,-11.2,2.1],[8,6,2.2],[-3.2,3.4,2.2],[13,-9,2.8],[1,8.8,1.5],[6,-12,3.6],[11.4,10.4,1.8],[-13.8,11.8,1.2]];
  const steh=[[-11.5,-5.4],[7,-1.7],[-4.5,.2],[-12.2,1.7],[12.3,2.1],[-2.5,-9.3],[5.8,6.4],[-3.2,5.5],[13,-6.5],[1,6.9]];
  const buschel=(x,z,h)=>{ for(let j=0;j<5;j++){ const a=j*1.26+x; halme.push({ x:x+Math.cos(a)*.13, z:z+Math.sin(a)*.13, h:h*(.65+zufall()*.55), nx:Math.sin(a)*.3, nz:-Math.cos(a)*.3, f:farben[(j+Math.floor(zufall()*4))%4], p:x*.45+z*.3+j*.35 }); } };
  let n=0;
  for(let i=0;i<500 && n<75;i++){ const x=-17.6+zufall()*35.2, z=-13+zufall()*26.4;
    if(frei.some(f=>Math.hypot(x-f[0],z-f[1])<f[2]) || steh.some(s=>Math.hypot(x-s[0],z-s[1])<1.2)) continue; buschel(x,z,.28+zufall()*.22); n++; }
  for(let i=0;i<110;i++){ const s=i%4; let x, z;
    if(s===0){ x=-30+zufall()*60; z=-14.8-zufall()*13; } else if(s===3){ x=-24+zufall()*48; z=14.2+zufall()*9; } else { x=(s===1?-1:1)*(19.2+zufall()*10); z=-15+zufall()*30; }
    if(s===0 && (Math.abs(x-EX)<2.8 || Math.hypot((x+12.5)/2,z+18.6)<3.2)) continue; buschel(x,z,.55+zufall()*.55); }
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),halme.length), o=new THREE.Object3D(), C=new THREE.Color();
  const setze=t=>{ halme.forEach((e,i)=>{ const w=Math.sin(t*1.7+e.p)*.14+Math.sin(t*.63+e.p*.4)*.09; o.position.set(e.x,0,e.z); o.rotation.set(e.nx,0,e.nz+w); o.scale.set(.05,e.h,.05); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; };
  halme.forEach((e,i)=>im.setColorAt(i,C.set(e.f)));
  setze(0); im.frustumCulled=false; im.receiveShadow=true; k.scene.add(im); k.anim.push(setze);
}

/* ---------- Landschaft hinter und neben der Mauer ---------- */
function landschaft(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  [[-25,-19,4.2,2.8],[-17,-26,5,3.4],[-3,-24,4,2.6],[15,-21,4.6,3],[24,-27,5.4,3.6],[-27,-5,4.4,2.9],[-24,8,3.6,2.4],[-29,18,4.6,3],[26,2,4.2,2.7],[23.5,12,3.4,2.2],[29,-12,5,3.3],[27,20,4,2.6],[22,-17,3,1.9],[-22,-14,3,2],[-8,24,3.4,2.1],[13,23,3.6,2.3]]
    .forEach(([x,z,h,r],i)=>akazie(g,x*1.14,z*1.14,h,r,i%2?.8:-.7));
  [[-21,-16,1.2],[20.5,-6,1.4],[-21.5,3,1],[21,8,.9],[1,-19,.8],[18,-15.5,1.1],[-9,-28,1.6],[-20.5,12.5,.8],[3,19,.9],[-14,17.5,.7],[31,6,1.8],[-33,-14,2]].forEach(([x,z,s],i)=>fels(g,x,z,s,i));
  ohneSchatten(g); verschmelze(g);
  /* Büsche als Instanzen */
  const buesche=[], F=[0x6e8a34,0x8a9a3c,0x5a7a30,0xa89a48];
  for(let i=0;i<120;i++){ const s=i%4; let x, z;
    if(s===0){ x=-32+zufall()*64; z=-15.3-zufall()*18; } else if(s===3){ x=-28+zufall()*56; z=15.5+zufall()*12; } else { x=(s===1?-1:1)*(19.8+zufall()*14); z=-16+zufall()*32; }
    if(s===0 && x>2 && x<10) x+=9;
    if(s===0 && x<-7 && x>-18 && z>-23) z-=8;
    const r=.4+zufall()*.7; buesche.push([x,r*.35,z,r,r*.65,r*.85,F[i%4],i]); buesche.push([x+r*.7,r*.25,z+r*.3,r*.55,r*.45,r*.55,F[(i+1)%4],i]); }
  ZOO.viele(sc,GEO.sph,buesche);
  /* ferne Tafelberge */
  const berge=gruppe(sc,0,0,0);
  [[-44,-34,13,3.4],[-22,-48,16,2.6],[10,-46,14,3.8],[34,-40,13,3],[52,-14,11,4],[-52,-6,12,3.6],[50,20,12,3],[-50,24,11,3.2]].forEach(([x,z,r,h],i)=>{
    const m=rohr(berge,r*.55,r,h,i%2?0x9a5a58:0x84505e,x,h/2-.4,z,9); m.scale.z=.55; const d=rohr(berge,r*.4,r*.55,h*.22,i%2?0xb8705a:0xa0605e,x,h*1.08-.35,z,9); d.scale.z=.55; });
  ohneSchatten(berge); verschmelze(berge);
}

/* ---------- untergehende Sonne, Abendwolken und Vögel ---------- */
function himmelsleben(k){
  const sc=k.scene;
  const sonne=gruppe(sc,-12,3.4,-39);
  ball(sonne,3.1,basis(0xfff0a0),0,0,0,1,1,.3).castShadow=false;
  const hof=schein(sonne,'rgba(255,214,100,.95)',0,0,1.2,13);
  k.anim.push(t=>{ sonne.position.y=1.1+2.5*(.5+.5*Math.cos(t*.035)); const s=12.5+Math.sin(t*.8)*.7; hof.scale.set(s,s*.8,1); });
  const farben=[0xffd0a0,0xe8889a,0xc878a0];
  const wolken=[[-34,6,-40,1.5],[5,8.5,-44,1.9],[27,5.5,-38,1.3],[-48,9,-8,1.6],[47,8,-2,1.5],[-20,12,-46,1.2]].map(([x,y,z,s],i)=>{ const g=gruppe(sc,x,y,z), m=basis(farben[i%3]);
    [[0,0,2.2],[2.4,-.2,1.5],[-2.5,-.25,1.6],[.7,.45,1.3]].forEach(([a,b,r])=>{ ball(g,r*s,m,a*s,b*s,0,1.6,.34,.6).castShadow=false; }); verschmelze(g); return [g,x,i]; });
  k.anim.push(t=>wolken.forEach(([g,x,i])=>{ g.position.x=x+Math.sin(t*.04+i)*6; }));
  /* Vogelschwarm, hoch über der hinteren Mauer */
  for(let i=0;i<7;i++){ const g=gruppe(sc,0,8,-18), m=basis(0x3a2430,{side:THREE.DoubleSide});
    ball(g,.16,m,0,0,0,2,.7,.7).castShadow=false;
    const fl=[-1,1].map(s=>{ const f=gruppe(g,0,0,0); box(f,.28,.035,.7,m,-.03,0,s*.42).castShadow=false; return f; });
    const w0=i*.34+(i%2)*.1, r=9+(i%3)*1.3;
    k.anim.push(t=>{ const w=t*.22+w0; g.position.set(Math.cos(w)*r*1.5,6.4+(i%4)*.55+Math.sin(t*.9+i)*.25,-20+Math.sin(w)*r*.55); g.rotation.y=Math.atan2(-Math.cos(w)*r*.55,-Math.sin(w)*r*1.5);
      const s=Math.sin(t*6+i*1.3)*.6; fl[0].rotation.x=s; fl[1].rotation.x=-s; }); }
}

/* ---------- Tiere weit hinter der Mauer ---------- */
function gazelle(k,x,z,dreh,gr,phase){
  const g=gruppe(k.scene,x,0,z); g.rotation.y=dreh; g.scale.setScalar(gr);
  const r=gruppe(g,0,0,0), F=0xc8823c;
  ball(r,.7,F,0,1.35,0,1.4,.75,.65); ball(r,.55,WEISS,0,1.15,0,1.4,.55,.7); ball(r,.7,DUNKEL,0,1.27,0,1.15,.13,.67);
  [[-.65,.25],[-.65,-.25],[.65,.25],[.65,-.25]].forEach(p=>{ walze(r,.075,1.15,F,p[0],.58,p[1]); walze(r,.09,.14,DUNKEL,p[0],.07,p[1]); });
  ball(r,.22,WEISS,-.93,1.42,0,.35,1,1); ball(r,.045,DUNKEL,-1.03,1.66,0,1,1.7,1);
  const hals=gruppe(g,.8,1.55,0); strich(hals,[0,0,0],[.48,1.02,0],.13,F);
  ball(hals,.27,F,.66,1.15,0,1.35,.95,.85); ball(hals,.17,0xf0d8b0,.98,1.05,0,1.2,.75,.8); ball(hals,.08,DUNKEL,1.17,1.07,0);
  [-1,1].forEach(s=>{ strich(hals,[.58,1.34,s*.1],[.42,1.98,s*.2],.04,DUNKEL); ball(hals,.12,F,.42,1.35,s*.33,.6,.8,1.7); ball(hals,.055,DUNKEL,.82,1.22,s*.21); });
  ohneSchatten(g); verschmelze(r); verschmelze(hals);
  k.anim.push(t=>{ /* meist Kopf oben, ab und zu grasen */ const v=Math.max(0,Math.min(1,-.8+Math.sin(t*.45+phase)*2.2)); hals.rotation.z=-v*1.75+Math.sin(t*3+phase)*.04*v; });
}
function ferneTiere(k){
  const sc=k.scene;
  const teich=gruppe(sc,-12.5,0,-18.6);
  scheibe(teich,5.4,.03,2.9,SANDD,0,.012,0); scheibe(teich,4.9,.04,2.5,0x6a9ac8,0,.022,0); scheibe(teich,2.8,.046,1.2,0xf0b890,-.6,.028,-.5);
  ohneSchatten(teich); verschmelze(teich);
  [[[-15.8,-17.6],[-12.4,-17.3],[-12.8,-18.8],[-15.4,-19]],[[-11,-18],[-8.8,-18.3],[-9.5,-19.8],[-11.4,-19.4]],[[-14,-20],[-11.8,-19.9],[-12.5,-20.5],[-14.5,-20.6]]]
    .forEach((weg,i)=>{ const f=buendeln(ZOO.tier(k,'flamingo',sc,weg[0][0],weg[0][1],0,.8)); ohneSchatten(f); laeufer(k,f,weg,.35+i*.08,i*1.7,2.5); });
  gazelle(k,14,-18,2.7,1,0); gazelle(k,18,-19.5,.5,.85,2.2); gazelle(k,-22.5,-1,-1.2,1,4); gazelle(k,22.5,5.5,2,.9,1.3); gazelle(k,-2.5,-17.6,-.35,.8,3.1);
  const e=ZOO.tier(k,'elefant',sc,25,-15,3.5,.85); ohneSchatten(e);
}

/* ---------- Ausgang: Schranke ---------- */
function schranke(k){
  const sc=k.scene, px=3.35;
  /* Weg hinaus mit Laternen */
  const aus=gruppe(sc,0,0,0);
  box(aus,4.6,.02,19,0xc89458,EX,.006,-22.6); box(aus,2.2,.026,19,0xdcaa6c,EX,.012,-22.6);
  [-17.2,-22,-27].forEach(z=>[-1,1].forEach(s=>{ const x=EX+s*2.9; walze(aus,.09,2.1,HOLZ2,x,1.05,z); ball(aus,.24,leuchte(),x,2.28,z); kegel(aus,.34,.22,HOLZ2,x,2.6,z); }));
  [-1,1].forEach(s=>{ for(let i=0;i<7;i++){ ball(aus,.55+(i%3)*.15,[LAUB,LAUB2,LAUB3][i%3],EX+s*(4.4+(i%2)*.5),.35,-15.4-i*2.1,1,.75,1); ball(aus,.1,[0xf06a8a,0xffd23a,0xffffff][i%3],EX+s*(3.9+(i%2)*.4),.75,-15.2-i*2.1); } });
  ohneSchatten(aus); verschmelze(aus);
  [-2.9,2.9].forEach(d=>{ schein(sc,'rgba(255,214,110,.6)',EX+d,2.3,-17.1,1.6); });
  /* feste Pfosten: links mit Schloss, rechts die Auflage */
  const fest=gruppe(sc,0,0,0);
  box(fest,.95,.2,.6,0x8a8076,px,.1,-13.0);
  box(fest,.62,2.9,.4,METALL,px,1.45,-13.1); box(fest,.78,.16,.56,0x3a4650,px,2.98,-13.1);
  for(let i=0;i<3;i++) box(fest,.66,.16,.44,i%2?WEISS:ROT,px,.45+i*.18,-13.1);
  walze(fest,.14,.5,0x3a4650,px+.1,1.45,-13.35).rotation.x=Math.PI/2;
  box(fest,.3,1.15,.34,METALL,8.85,.575,-13.45); [-1,1].forEach(s=>box(fest,.34,.34,.08,0x3a4650,8.85,1.3,-13.45+s*.2));
  box(fest,.65,.18,.65,0x8a8076,8.85,.09,-13.45);
  /* Mauerpfeiler neben der Lücke */
  [2.75,9.45].forEach(x=>{ box(fest,.7,2.1,.6,0xc08a54,x,1.05,-14.05); box(fest,.88,.2,.76,0x8a5e38,x,2.2,-14.05); ball(fest,.24,0x8a5e38,x,2.48,-14.05); });
  verschmelze(fest);
  /* der bewegliche Schlagbaum, rot-weiß, mit Gegengewicht */
  const baum=gruppe(sc,px+.1,1.45,-13.48);
  for(let i=0;i<8;i++) box(baum,.665,.34,.2,i%2?WEISS:ROT,.35+i*.665,0,0);
  ball(baum,.2,ROT,5.45,0,0,.8,.9,.6);
  box(baum,.9,.2,.18,0x3a4650,-.45,0,0); box(baum,.6,.62,.34,0x3a4650,-.95,0,0);
  walze(baum,.2,.12,0xc4cad4,0,0,.14).rotation.x=Math.PI/2;
  [1.7,3.0,4.3].forEach(x=>{ walze(baum,.035,.62,ROT,x,-.46,0); ball(baum,.075,WEISS,x,-.78,0); });
  verschmelze(baum);
  /* goldenes Zahlenschloss am Pfosten, über Kopfhöhe */
  const schloss=ZOO.zahlenschloss(sc,px,2.28,-12.74); schloss.scale.setScalar(1.35); verschmelze(schloss);
  const rot=ball(sc,.17,basis(0xff3a2a),px,3.22,-13.1), gruen=ball(sc,.17,basis(0x4af05a),px,3.22,-13.1); gruen.visible=false;
  const tuer=ausgang(k,{ steh:[EX,-11.35], durch:[EX,-16.4], treffer:{x:EX-.1,y:1.75,z:-12.95,b:6.8,h:3.5,t:1}, name:'Schranke', einfach:'Schranke zum Ausgang', schildOben:[EX,4.2,-12.6], glanz:[px,2.3,-12.4],
    bewege:auf=>{ baum.rotation.z=auf*1.4; rot.visible=auf<.5; gruen.visible=auf>=.5; } });
  k.kasten(EX,-13.2,6.9,.7);
  return tuer;
}

/* ---------- Ausstattung im Gehege ---------- */
function laterne(k,g,x,z){
  walze(g,.2,.14,DUNKEL,x,.07,z); walze(g,.07,2.2,HOLZ2,x,1.1,z); box(g,.34,.38,.34,leuchte(),x,2.36,z);
  [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.05,.42,.05,DUNKEL,x+a*.18,2.36,z+b*.18))); kegel(g,.38,.28,DUNKEL,x,2.71,z); k.kreis(x,z,.22);
}
function aloe(k,g,x,z,s){
  for(let i=0;i<9;i++){ const a=i*.698, aus=i%2?.5:.3; const m=kegel(g,.13*s,(i%2?.8:1)*s,i%2?0x6a9a5a:0x84b068,x+Math.cos(a)*aus*s*.6,.36*s,z+Math.sin(a)*aus*s*.6); m.rotation.set(Math.sin(a)*aus*1.2,0,-Math.cos(a)*aus*1.2); }
  walze(g,.04*s,1.2*s,0x6a7a3a,x,.65*s,z); for(let j=0;j<4;j++) kegel(g,(.15-j*.025)*s,.2*s,j%2?0xf06a24:0xf89030,x,(1.15+j*.13)*s,z);
  k.kreis(x,z,.45*s);
}
function ausstattung(k){
  const sc=k.scene;
  /* Akazien in den Ecken */
  [[-16.4,-11.4,4.1,1.8,.3],[16.5,-2.6,3.8,1.5,-.3],[-16.7,10.2,3.6,1.4,.2]].forEach(([x,z,h,r,n])=>{ const g=gruppe(sc,0,0,0); akazie(g,x,z,h,r,n); verschmelze(g); k.verdecker(g,x,z,r*.8); k.kreis(x,z,.45); });
  const g=gruppe(sc,0,0,0);
  [[-15.7,-3.6,.95],[1.1,-12.2,.65],[15.8,11.2,.9],[-13.8,11.8,.65],[4.6,11.9,.5],[-.6,-6.4,.55],[16.8,-12.2,.8]].forEach(([x,z,s],i)=>{ fels(g,x,z,s,i*1.4); k.kreis(x,z,s*1.1); });
  aloe(k,g,-8,-12.2,1.1); aloe(k,g,16.4,7,1); aloe(k,g,-15.8,6.4,.95); aloe(k,g,9.6,-12.1,.8); aloe(k,g,-12.6,-1.9,.75); aloe(k,g,8.6,11.8,.8);
  laterne(k,g,-7.9,1.2); laterne(k,g,.3,-9.2); laterne(k,g,10.4,-12); laterne(k,g,-14.6,8.4); laterne(k,g,10.2,3.4);
  /* umgestürzter Baumstamm */
  const stamm=walze(g,.34,2.7,HOLZ,-3.8,.34,10.5); stamm.rotation.z=Math.PI/2;
  [-1,1].forEach(s=>{ scheibe(g,.28,.04,.28,HOLZ3,-3.8+s*1.37,.34,10.5).rotation.z=Math.PI/2; scheibe(g,.13,.046,.13,HOLZ,-3.8+s*1.375,.34,10.5).rotation.z=Math.PI/2; });
  strich(g,[-4.4,.5,10.5],[-4.8,1.05,10.3],.09,HOLZ2); ball(g,.22,LAUB2,-4.83,1.12,10.28,1.2,.7,1);
  k.kasten(-3.8,10.5,2.8,.75);
  /* Holzbank für Gäste */
  const bank=gruppe(g,11.4,0,10.4);
  [.18,-.18].forEach(z=>box(bank,2.4,.12,.3,HOLZ3,0,.66,z)); [1.0,1.35].forEach(y=>box(bank,2.4,.22,.1,HOLZ,0,y,.42));
  [-1.05,1.05].forEach(x=>{ box(bank,.14,.62,.62,HOLZ2,x,.31,0); box(bank,.12,.9,.12,HOLZ2,x,1.03,.42); });
  k.kasten(11.4,10.4,2.5,.95);
  verschmelze(g);
  /* niedrige Büsche entlang der Ränder */
  const L=[], P=[[-17.8,-7],[-17.8,1.4],[-17.8,3],[-17.8,12.6],[-9.6,-13.2],[-5.8,-13.2],[.2,-13.2],[11.6,-13.2],[17.8,-9],[17.8,.2],[17.8,9.4],[17.8,12.6],[-10.5,12.9],[-.5,13],[6.4,13],[13.6,13]];
  P.forEach(([x,z],i)=>{ L.push([x,.24,z,.55,.38,.45,i%2?LAUB:0x8a9a3c,i]); L.push([x+.42,.17,z+.12,.34,.26,.32,i%2?LAUB2:0xa89a48,i]); L.push([x-.25,.55,z+.1,.09,.09,.09,i%3?0xffd23a:0xf06a8a,0]); });
  ZOO.viele(sc,GEO.sph,L).castShadow=false;
  /* kleine Blumen und Kiesel */
  const blumen=[], stiele=[], kiesel=[];
  [[-14.5,-9.5],[-6.8,-5],[4,-10],[16,-4.6],[10,8.8],[-12,3.6],[-1.6,1.8],[5,2.8],[-8.4,9.4],[3.6,9.8],[14.8,5.6],[-3,-5.2]].forEach(([x,z],i)=>{
    for(let j=0;j<6;j++){ const a=j*2.4, r=.2+j*.09; const bx=x+Math.cos(a)*r, bz=z+Math.sin(a)*r, h=.28+(j%3)*.07; stiele.push([bx,h/2,bz,.018,h,.018,0x5a7a2a,0]); stiele.push([bx+.06,h*.4,bz,.08,.025,.04,LAUB2,a]);
      blumen.push([bx,h+.03,bz,.075,.07,.075,[0xffd23a,0xf47a30,0xffffff,0xe86a9a][i%4],0]); blumen.push([bx,h+.095,bz,.03,.025,.03,0x8a4a14,0]); }
    kiesel.push([x+.9,.05,z-.5,.14,.13,.1,FELS2,i]); kiesel.push([x+1.1,.03,z-.33,.07,.09,.08,FELS,i*2]); });
  ZOO.viele(sc,GEO.sph,blumen).castShadow=false; ZOO.viele(sc,GEO.box,stiele).castShadow=false; ZOO.viele(sc,GEO.sph,kiesel).castShadow=false;
}

/* ---------- kleine Tiere im Gehege (nicht fest) ---------- */
function perlhuhn(k,weg,start){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), r=gruppe(g,0,0,0);
  ball(r,.3,0x4a4a5c,0,.4,0,1.25,.95,.9);
  [[-.2,.55,.18],[0,.62,.12],[.15,.52,.22],[-.3,.45,-.18],[.05,.6,-.15],[.18,.45,-.23],[-.1,.4,.27]].forEach(p=>ball(r,.032,WEISS,p[0],p[1],p[2]));
  strich(r,[.25,.5,0],[.38,.78,0],.065,0x5a7ac0); ball(r,.12,0x6a90d0,.4,.82,0); kegel(r,.05,.17,0xf0a030,.55,.8,0).rotation.z=-Math.PI/2; ball(r,.06,ROT,.4,.95,0,1,.8,.6);
  [-1,1].forEach(s=>{ ball(r,.025,SCHWARZ,.48,.86,s*.08); walze(r,.025,.24,0xc88a30,0,.12,s*.12); box(r,.15,.03,.08,0xc88a30,.05,.02,s*.12); });
  verschmelze(r); laeufer(k,g,weg,.7,start,9);
}
function kleintiere(k){
  const weg=[[-8.6,7.4],[-5.8,7.9],[-6.6,10],[-9.8,9.2]];
  perlhuhn(k,weg,0); perlhuhn(k,weg,1.3); perlhuhn(k,weg,2.7);
  const s=buendeln(ZOO.tier(k,'schildkroete',k.scene,11.6,5.2,0,.65)); laeufer(k,s,[[11.6,5.2],[15,4.6],[15,8],[12,8.3]],.3,0,1.5);
}

/* ---------- Gegenstände ---------- */
function giraffeMitBaum(g,k){ buendeln(ZOO.tier(k,'giraffe',g,0,0,0,.56)); }
function heuraufe(g){
  [-1.15,1.15].forEach(x=>{ [-.5,.5].forEach(z=>box(g,.16,2.6,.16,HOLZ2,x,1.3,z)); box(g,.12,.12,1.1,HOLZ2,x,.5,0); });
  [.55,-.55].forEach(z=>{ box(g,2.4,.13,.13,HOLZ,0,1.7,z); });
  box(g,2.4,.14,.2,HOLZ,0,.82,0);
  for(let i=0;i<8;i++){ const x=-.98+i*.28; strich(g,[x,.84,0],[x,1.72,.57],.035,HOLZ3); strich(g,[x,.84,0],[x,1.72,-.57],.035,HOLZ3); }
  [[-.68,1.38,0,.34],[0,1.45,.04,.4],[.66,1.38,-.04,.35],[-.32,1.65,.08,.25],[.36,1.66,-.05,.26],[0,1.15,0,.27]].forEach(([x,y,z,r],i)=>ball(g,r,i%2?HEU2:HEU,x,y,z,1.2,.7,.95));
  /* Halme: oben und seitlich aus der Raufe quellend, einzelne lose am Boden */
  const H=[];
  for(let i=0;i<230;i++){ const x=-1.05+zufall()*2.1, y=1.3+zufall()*.7, z=(zufall()-.5)*(y-.7)*.95;
    H.push([x,y,z,.45+zufall()*.35,(zufall()-.5)*1.1,(zufall()-.5)*2.6,(zufall()-.5)*.9]); }
  for(let i=0;i<46;i++) H.push([-1.2+zufall()*2.4,.025+(i%4)*.009,-.1+zufall()*1.05,.25+zufall()*.25,0,zufall()*6.28,0]);
  const halme=new THREE.InstancedMesh(GEO.box,new THREE.MeshLambertMaterial({color:0xffffff}),H.length), o=new THREE.Object3D(), C=new THREE.Color(), F=[0xffe27a,0xfff0a8,0xf4cc50];
  H.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.rotation.set(e[4],e[5],e[6]); o.scale.set(e[3],.018,.022); o.updateMatrix(); halme.setMatrixAt(i,o.matrix); halme.setColorAt(i,C.set(F[i%3])); });
  halme.frustumCulled=false; g.add(halme);
  /* kleines Dach */
  [-1,1].forEach(s=>{ const d=box(g,2.85,.1,.72,0x9a4a28,0,2.7,s*.31); d.rotation.x=s*.5; }); box(g,2.95,.12,.14,HOLZ2,0,2.9,0);
}
function wasserstelle(g,k){
  scheibe(g,2.25,.036,1.55,0x8a5e36,0,.018,0); scheibe(g,1.88,.05,1.22,0x3a9ad0,0,.03,0); scheibe(g,1.1,.056,.62,0x6cc4ec,-.2,.034,.12);
  for(let i=0;i<19;i++){ const a=i/19*Math.PI*2, s=.18+((i*7)%5)*.035, hinten=Math.sin(a)<-.3; ball(g,s,[FELS,FELS3,FELS2][i%3],Math.cos(a)*2.03,s*(hinten?.65:.4),Math.sin(a)*1.37,1.15,hinten?.95:.7,1); }
  [[-1.55,-.8],[-1.2,-1.05],[-1.75,-.45],[1.35,-1.0],[1.65,-.7],[-.85,-1.15]].forEach(([x,z],i)=>{ const h=1+(i%3)*.28, n=(i%2?.12:-.12);
    strich(g,[x,0,z],[x+n,h,z],.028,0x6a8a2e); walze(g,.075,.34,0x7a4220,x+n*1.05,h+.1,z); strich(g,[x+n*1.1,h+.25,z],[x+n*1.2,h+.45,z],.014,0x6a8a2e); strich(g,[x+.12,0,z+.05],[x+.38,h*.7,z+.08],.022,0x8aa83a); });
  [[.9,-.35],[1.15,.1]].forEach(([x,z],i)=>{ scheibe(g,.26,.02,.2,0x4a9a3e,x,.066+i*.009,z); ball(g,.08,0xf88ab0,x+.05,.12,z,1,.8,1); });
  /* schwimmende Ente */
  const ente=gruppe(g,-.2,.1,.2); ente.userData.lebendig=true;
  ball(ente,.3,WEISS,0,.1,0,1.35,.75,.9); ball(ente,.16,WEISS,-.38,.2,0,1.2,.6,.8); ball(ente,.2,WEISS,.32,.45,0); kegel(ente,.09,.24,0xf29a24,.56,.42,0).rotation.z=-Math.PI/2; [-1,1].forEach(s=>{ ball(ente,.032,SCHWARZ,.44,.5,s*.15); ball(ente,.18,0xe4dccc,-.05,.18,s*.22,1.3,.55,.35); });
  const welle=ring(g,.55,.02,basis(0xdaf4ff,{transparent:true,opacity:.6,depthWrite:false}),0,.075,0); welle.rotation.x=Math.PI/2; welle.castShadow=false;
  k.anim.push(t=>{ const w=t*.35, x=-.2+Math.cos(w)*.65, z=.15+Math.sin(w)*.45; ente.position.set(x,.08+Math.sin(t*2.4)*.018,z); ente.rotation.y=Math.atan2(-Math.cos(w)*.45,-Math.sin(w)*.65); const s=.6+(t*.5%1)*.35; welle.position.set(x,.075,z); welle.scale.set(s,s,1); });
}
function fernglas(g){
  const GRUEN=0x2e8a62, DGRUEN=0x1c5a40;
  walze(g,.55,.14,0x4a5258,0,.07,0); walze(g,.36,.12,0x6a747c,0,.19,0);
  walze(g,.14,1.35,GRUEN,0,.88,0); walze(g,.2,.12,DGRUEN,0,1.52,0);
  /* Münzkasten */
  box(g,.44,.52,.34,DGRUEN,0,.98,.17); box(g,.05,.2,.03,SCHWARZ,0,1.07,.35); box(g,.17,.28,.02,0xc4cad4,0,1.07,.33); walze(g,.09,.04,ZOO.GOLD,0,.82,.35).rotation.x=Math.PI/2;
  /* Gabel und Doppelrohr, Objektive nach hinten (-z) */
  box(g,.3,.28,.3,DGRUEN,0,1.68,0);
  const kopf=gruppe(g,0,2.0,0); kopf.rotation.x=.06;
  box(kopf,.5,.4,.75,DGRUEN,0,0,0); box(kopf,.9,.1,.2,GRUEN,0,.25,0);
  [-1,1].forEach(s=>{ const x=s*.37;
    walze(kopf,.3,1.0,GRUEN,x,0,-.08).rotation.x=Math.PI/2;
    walze(kopf,.37,.32,GRUEN,x,0,-.68).rotation.x=Math.PI/2; ring(kopf,.34,.05,0xc4cad4,x,0,-.85); walze(kopf,.3,.03,0x14283a,x,0,-.85).rotation.x=Math.PI/2; ball(kopf,.07,basis(0xbfeaff),x-.1,.1,-.87,1,1,.3);
    ring(kopf,.3,.035,0xc4cad4,x,0,-.2);
    walze(kopf,.17,.3,0x4a5258,x,0,.55).rotation.x=Math.PI/2; walze(kopf,.2,.12,SCHWARZ,x,0,.74).rotation.x=Math.PI/2; walze(kopf,.11,.02,0x4a7a9a,x,0,.81).rotation.x=Math.PI/2;
    strich(kopf,[s*.6,0,.1],[s*.85,-.12,.35],.04,0x4a5258); ball(kopf,.09,ROT,s*.85,-.12,.35); });
}
/* Tierbilder als Schattenriss auf eine Zeichenfläche (Mitte x,y, Größe s) */
function tierBild(g,art,x,y,s,f,hell){
  g.save(); g.translate(x,y); g.scale(s/100,s/100); g.fillStyle=f; g.strokeStyle=f; g.lineCap='round';
  const e=(a,b,c,d,w)=>{ g.beginPath(); g.ellipse(a,b,c,d,w||0,0,6.283); g.fill(); };
  const l=(a,b,c,d,w)=>{ g.lineWidth=w; g.beginPath(); g.moveTo(a,b); g.lineTo(c,d); g.stroke(); };
  if(art==='giraffe'){ e(-8,12,26,15); [-28,-14,4,14].forEach(a=>l(a,16,a,48,6)); l(12,6,30,-34,12); e(37,-37,13,8,.3); l(28,-42,26,-50,4); l(35,-44,35,-52,4); l(-32,8,-42,28,3); g.fillStyle=hell; [[-20,8],[-4,16],[8,6],[18,-10],[24,-22]].forEach(p=>e(p[0],p[1],4,4)); }
  else if(art==='elefant'){ e(-8,0,32,23); [-28,-12,6,18].forEach(a=>l(a,10,a,40,11)); e(26,-8,19,19); l(40,-4,45,24,10); l(45,24,52,28,7); l(-40,-4,-48,16,3); g.fillStyle=hell; e(19,-8,9,14,-.3); g.fillStyle=f; e(19,-8,6,11,-.3); }
  else if(art==='fisch'){ e(6,0,32,20); g.beginPath(); g.moveTo(-20,0); g.lineTo(-46,-22); g.lineTo(-46,22); g.fill(); g.beginPath(); g.moveTo(-4,-16); g.lineTo(10,-32); g.lineTo(18,-17); g.fill(); g.fillStyle=hell; e(24,-5,5,5); g.fillStyle=f; e(25,-5,2.4,2.4); }
  else { e(0,14,21,17); [[-27,-8],[-10,-24],[10,-24],[27,-8]].forEach(p=>e(p[0],p[1],8.5,11,p[0]*.015)); }
  g.restore();
}
function wegweiser(g){
  walze(g,.17,3.3,HOLZ2,0,1.65,0); kegel(g,.28,.34,0x9a4a28,0,3.46,0);
  [[2.82,1,0xf2c14e,'giraffe','#6a3a08','#f2c14e',.12],[2.1,-1,0x7fbf5a,'elefant','#1f4a1a','#7fbf5a',-.18],[1.38,1,0x58aee4,'fisch','#0c3450','#58aee4',-.08]].forEach(([y,s,farbe,art,f,hell,dreh])=>{
    const a=gruppe(g,0,y,0); a.rotation.y=dreh;
    platte(a,[[-.5*s,-.31],[1.15*s,-.31],[1.6*s,0],[1.15*s,.31],[-.5*s,.31]],.12,farbe,0,0,.1);
    const tx=bild(256,128,c=>{ tierBild(c,art,78,64,116,f,hell); tierBild(c,'pfote',188,66,76,f,hell); });
    bildFlaeche(a,1.24,.6,tx,.55*s,0,.228);
    bildFlaeche(a,1.24,.6,tx,.55*s,0,.092,Math.PI);
    ball(a,.05,DUNKEL,0,0,.23);
  });
  [[.4,.25],[-.35,.3],[.1,-.42],[-.3,-.25]].forEach(([x,z],i)=>ball(g,.2+(i%2)*.06,i%2?FELS:FELS3,x,.1,z,1,.7,1));
}
function tafel(g){
  [-1.62,1.62].forEach(x=>{ box(g,.2,3.32,.2,HOLZ2,x,1.66,0); ball(g,.17,0x5a8a3a,x,.1,.12,1.6,.8,1.2); });
  box(g,3.2,2.05,.12,HOLZ,0,1.86,-.02);
  const t=bild(512,320,c=>{
    const v=c.createLinearGradient(0,0,0,220); v.addColorStop(0,'#7a78c8'); v.addColorStop(.55,'#f49060'); v.addColorStop(1,'#ffdc90'); c.fillStyle=v; c.fillRect(0,0,512,320);
    const e=(x,y,a,b,f)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,a,b,0,0,6.283); c.fill(); };
    e(300,185,48,48,'#fff2a8'); e(120,232,230,50,'#b8884a'); e(420,240,220,46,'#a87840');
    c.fillStyle='#d8aa48'; c.fillRect(0,228,512,92); e(380,282,92,20,'#58a8d8'); e(356,277,40,6,'#bfe4f8');
    const baum=(x,y,s)=>{ c.fillStyle='#5a3418'; c.fillRect(x-5*s,y-84*s,10*s,86*s); e(x,y-92*s,70*s,19*s,'#3f6a28'); e(x+14*s,y-106*s,46*s,14*s,'#5a8a30'); };
    baum(84,258,1.25); baum(446,228,.7); baum(230,222,.4);
    tierBild(c,'giraffe',180,236,116,'#c8801c','#7a4a10'); tierBild(c,'elefant',288,252,72,'#6a6a78','#9a9aa8');
    c.strokeStyle='#3a2430'; c.lineWidth=4; [[190,60],[228,44],[262,72],[360,50]].forEach(([x,y])=>{ c.beginPath(); c.moveTo(x-13,y-6); c.lineTo(x,y); c.lineTo(x+13,y-6); c.stroke(); });
    c.strokeStyle='#a07828'; for(let i=0;i<90;i++){ const x=(i*53)%512, y=270+(i*29)%46; c.beginPath(); c.moveTo(x,y); c.lineTo(x+4,y-15); c.stroke(); }
  });
  bildFlaeche(g,2.9,1.8,t,0,1.86,.062);
  [[0,2.84,3.2,.14],[0,.89,3.2,.14],[-1.53,1.86,.14,1.9],[1.53,1.86,.14,1.9]].forEach(([x,y,w,h])=>box(g,w,h,.2,HOLZ3,x,y,.03));
  [-1,1].forEach(s=>{ const d=box(g,3.9,.1,.5,0x9a4a28,0,3.24,s*.2); d.rotation.x=s*.5; }); box(g,4,.1,.12,HOLZ2,0,3.37,0);
}
function erdmaennchen(g,x,y,z,gr,dreh,k,phase){
  const m=gruppe(g,x,y,z); m.scale.setScalar(gr); m.rotation.y=dreh;
  const F=0xc89456, D=0x4a2e16, H=0xf0d6a8;
  ball(m,.25,F,0,.52,0,1,1.9,.95); ball(m,.19,H,0,.48,.13,.9,1.85,.7);
  [-1,1].forEach(s=>{ ball(m,.14,F,s*.17,.14,0,1,1,1.2); ball(m,.075,D,s*.17,.04,.17,1,.6,1.7); strich(m,[s*.2,.76,.04],[s*.1,.52,.27],.055,F); ball(m,.065,D,s*.09,.5,.28); });
  strich(m,[0,.14,-.18],[.22,.04,-.55],.06,F); ball(m,.075,D,.24,.05,-.58);
  const kopf=gruppe(m,0,1.08,.02); kopf.userData.lebendig=true;
  ball(kopf,.21,F,0,0,0,1,.95,.95); ball(kopf,.13,H,0,-.06,.15,1,.75,1.3); ball(kopf,.048,SCHWARZ,0,-.025,.34);
  [-1,1].forEach(s=>{ ball(kopf,.085,D,s*.1,.045,.155,1.05,.9,.7); ball(kopf,.043,SCHWARZ,s*.095,.05,.21); ball(kopf,.014,mat(0xffffff,{emissive:0x999999}),s*.085,.068,.249); ball(kopf,.07,D,s*.2,.1,-.04,.6,1,.8); });
  verschmelze(kopf);
  k.anim.push(t=>{ const w=Math.sin(t*.7+phase); kopf.rotation.y=Math.max(-1,Math.min(1,w*1.8))*.75; kopf.rotation.x=Math.sin(t*1.9+phase*2)*.07; });
}
function huegel(g,k){
  ball(g,1,SANDH,0,0,0,1.55,.8,1.15); ball(g,1,SANDD,-.8,-.05,.25,.85,.5,.75); ball(g,1,0xe6bc7a,.55,.05,-.2,.95,.62,.8);
  /* Höhleneingänge */
  [[.3,.34,1.02,.3],[-.95,.2,.9,.22],[1.3,.2,.56,.18]].forEach(([x,y,z,r])=>{ ring(g,r,.032,SANDD,x,y,z+.015).scale.z=.4; ball(g,r,0x3a2010,x,y,z,1,.9,.4); });
  [[-1.5,.75],[1.35,.95],[.9,1.15],[-.4,1.28]].forEach(([x,z],i)=>ball(g,.14+(i%2)*.05,i%2?FELS3:ERDE,x,.08,z,1,.7,1));
  erdmaennchen(g,-.1,.72,-.05,1.15,0,k,0);
  erdmaennchen(g,-.88,.57,.15,1,-.4,k,2.1);
  erdmaennchen(g,.82,.6,.12,.95,.45,k,4.2);
  erdmaennchen(g,-.25,.04,1.42,.72,-.2,k,1.1);
}
function zebra(g,k){ buendeln(ZOO.tier(k,'zebra',g,-.25,0,0,.78)); }
function wagen(g){
  const GRUEN=0x4a7a38, BEIGE=0xdcc48c, SITZ=0x7a4a28;
  /* Rahmen und Karosserie (Front nach -x) */
  box(g,3.5,.24,1.5,0x3a3c34,0,.62,0);
  box(g,1.15,.5,1.62,BEIGE,-1.2,.96,0); box(g,1.1,.08,1.3,GRUEN,-1.2,1.25,0);
  [-1,1].forEach(s=>{ box(g,1.35,.55,.14,GRUEN,.05,1.0,s*.8); box(g,1.35,.1,.18,BEIGE,.05,1.31,s*.8); box(g,1.05,.6,.14,BEIGE,1.23,1.03,s*.8); });
  box(g,.14,.62,1.74,BEIGE,1.75,1.02,0); box(g,.14,.62,1.6,GRUEN,-.62,1.02,0);
  /* Kühler, Lichter, Stoßstangen */
  box(g,.08,.4,.85,0x3a3c34,-1.8,.96,0); [-.27,-.09,.09,.27].forEach(z=>box(g,.04,.34,.07,0xc4cad4,-1.86,.96,z));
  [-1,1].forEach(s=>{ walze(g,.17,.1,0xc4cad4,-1.8,1.02,s*.6).rotation.z=Math.PI/2; walze(g,.12,.04,basis(0xfff2b0),-1.87,1.02,s*.6).rotation.z=Math.PI/2; box(g,.08,.2,.22,ROT,1.84,1.0,s*.62); });
  box(g,.22,.2,1.8,0x4a5258,-1.92,.62,0); box(g,.2,.2,1.8,0x4a5258,1.9,.62,0);
  /* Windschutzscheibe, Lenkrad, Sitze, Überrollbügel */
  [-1,1].forEach(s=>strich(g,[-.62,1.25,s*.74],[-.45,2.05,s*.74],.055,GRUEN)); strich(g,[-.45,2.05,-.76],[-.45,2.05,.76],.055,GRUEN);
  const glas=box(g,.03,.68,1.4,mat(0xbfe4f8,{transparent:true,opacity:.35,depthWrite:false}),-.535,1.66,0); glas.rotation.z=-.21; glas.castShadow=false;
  const lenk=ring(g,.24,.04,SCHWARZ,-.25,1.46,.35); lenk.rotation.y=Math.PI/2; strich(g,[-.58,1.2,.35],[-.25,1.46,.35],.035,SCHWARZ);
  [[.18,.38],[.18,-.38]].forEach(([x,z])=>{ box(g,.52,.28,.58,SITZ,x,.9,z); box(g,.16,.74,.58,SITZ,x+.34,1.25,z); });
  box(g,.52,.28,1.35,SITZ,1.2,.9,0); box(g,.14,.55,1.35,SITZ,1.55,1.18,0);
  [-1,1].forEach(s=>strich(g,[.78,.9,s*.72],[.78,2.15,s*.66],.07,0x3a3c34)); strich(g,[.78,2.15,-.66],[.78,2.15,.66],.07,0x3a3c34);
  /* Räder mit Kotflügeln */
  [-1.18,1.15].forEach(x=>[-1,1].forEach(s=>{ walze(g,.5,.36,SCHWARZ,x,.5,s*.93).rotation.x=Math.PI/2; ring(g,.4,.09,0x2c2c30,x,.5,s*1.09); walze(g,.24,.04,BEIGE,x,.5,s*1.13).rotation.x=Math.PI/2; ball(g,.09,0xc4cad4,x,.5,s*1.15,1,1,.6);
    box(g,.7,.1,.46,GRUEN,x,1.07,s*.95); [-1,1].forEach(v=>{ const f=box(g,.36,.09,.46,GRUEN,x+v*.47,.93,s*.95); f.rotation.z=-v*.75; }); }));
  /* Ersatzrad hinten, Pfote auf der Tür */
  walze(g,.46,.24,SCHWARZ,2.1,1.2,0).rotation.z=Math.PI/2; walze(g,.22,.04,BEIGE,2.24,1.2,0).rotation.z=Math.PI/2;
  const pf=bild(128,128,c=>{ c.fillStyle='#f4e6c0'; c.beginPath(); c.arc(64,64,60,0,6.283); c.fill(); tierBild(c,'pfote',64,66,100,'#3a5a28','#f4e6c0'); });
  [-1,1].forEach(s=>bildFlaeche(g,.46,.46,pf,.05,1.01,s*.878,s>0?0:Math.PI));
}
function rucksack(g){
  const R1=0xd8402c, R2=0xa82a1c, GURT=0x3a2a20, BLAU=0x2a6ab0;
  /* großer flacher Stein */
  scheibe(g,1.05,.5,.82,FELS,0,.25,0); ball(g,1,FELS3,0,.48,0,1.02,.2,.8); ball(g,.42,FELS2,-.85,.18,.42,1.1,.75,1); ball(g,.32,FELS3,.9,.14,.45,1.1,.75,1);
  const r=gruppe(g,0,.66,0); r.rotation.x=-.06;
  box(r,.92,1.0,.56,R1,0,.52,0); [-1,1].forEach(s=>walze(r,.28,1.0,R1,s*.44,.52,0));
  scheibe(r,.72,.2,.28,R1,0,1.0,0); ball(r,1,R1,0,1.08,0,.7,.2,.3);
  /* Deckelklappe mit Schnallen */
  box(r,1.2,.3,.66,R2,0,1.1,.03); ball(r,1,R2,0,1.24,0,.6,.14,.33);
  [-.32,.32].forEach(x=>{ box(r,.12,.68,.05,GURT,x,.76,.38); box(r,.2,.17,.06,ZOO.GOLD,x,.5,.4); box(r,.09,.07,.03,GURT,x,.5,.44); });
  /* Vordertasche und Seitentaschen */
  box(r,.74,.4,.22,R2,0,.22,.36); box(r,.78,.09,.24,GURT,0,.42,.37); ball(r,.055,ZOO.GOLD,0,.37,.49);
  [-1,1].forEach(s=>{ box(r,.18,.46,.36,R2,s*.74,.3,0); box(r,.2,.08,.38,GURT,s*.74,.54,0); const gurt=ring(r,.36,.055,GURT,s*.34,.58,-.3,Math.PI); gurt.rotation.set(0,Math.PI/2,-Math.PI/2); });
  /* Trinkflasche und aufgeschnallte Decke */
  walze(r,.12,.52,BLAU,.93,.45,0); walze(r,.07,.12,0xc4cad4,.93,.77,0);
  const decke=walze(r,.22,1.15,0x3a8a58,0,1.52,-.04); decke.rotation.z=Math.PI/2;
  [-1,1].forEach(s=>{ ring(r,.13,.025,0x8ac89a,s*.585,1.52,-.04).rotation.y=Math.PI/2; ring(r,.235,.035,GURT,s*.32,1.52,-.04).rotation.y=Math.PI/2; });
  const griff=ring(r,.17,.04,GURT,0,1.7,-.04,Math.PI); griff.scale.y=.9;
}

function baue(k){
  const h=ZOO.huelle(k,{ B, T, boden:[208,170,92], bodenStreu:24, himmelLicht:0xffe4c4, grund:0x8a6440, staerke:.74, sonne:0xffb466, sonneStaerke:.55, mauer:0xc08a54, stein:0x8a5e38, mauerHoehe:1.35, oeffnung:{ x:EX, b:6.2 } });
  wege(k);
  const tuer=schranke(k);
  landschaft(k);
  ferneTiere(k);
  himmelsleben(k);
  ausstattung(k);
  gras(k);
  kleintiere(k);
  /* die Akazie der Giraffe (eigene Gruppe, damit sie vor der Figur durchsichtig wird) */
  const baum=gruppe(k.scene,0,0,0); akazie(baum,-8.4,-8.2,4.75,2.2,-.55);
  ball(baum,.3,FELS,-8.0,.12,-8.0,1.2,.6,1); verschmelze(baum); k.verdecker(baum,-8.8,-8.2,1.5); k.kreis(-8.4,-8.2,.55);
  /* warmes Licht an der Schranke und an zwei Laternen */
  [[EX,3.2,-12.2,.5,9],[-7.9,2.4,1.2,.4,7],[10.2,2.4,3.4,.4,7]].forEach(([x,y,z,s,w])=>flacker(k,x,y,z,0xffc060,s,w));
  return { tuer, start:[-6.4,3.4] };
}
const verstecke=[[-15.8,-7.6],[-7,-10.6],[.2,-10.4],[15,-11.8],[16.4,-6],[10,-8.8],[3,-4.6],[-8.6,-3.2],[-16.2,4.6],[-10.6,3.8],[-1.2,.2],[10.4,-1.4],[16.4,3],[13.4,12.2],[6.4,9.8],[-1.6,11.8],[-7.4,11.2],[-12.4,9.4],[-15.6,12.4],[4.8,1.6]];
const gegenstaende=[
  { x:-11.5, z:-7.5, steh:[-11.5,-5.4], kasten:[2.2,1.2], treffer:[3.8,4.2,1.8], baue:giraffeMitBaum },
  { x:7, z:-3.8, steh:[7,-1.7], kasten:[2.8,1.5], treffer:[2.9,3,1.6], baue:heuraufe },
  { x:-4.5, z:-2.5, steh:[-4.5,.2], kasten:[4.3,2.9], treffer:[4.4,1.5,3], baue:wasserstelle },
  { x:-14, z:.8, dreh:.9, steh:[-12.2,1.7], r:.65, treffer:[1.8,2.55,1.8], baue:fernglas },
  { x:14.2, z:1.2, steh:[12.3,2.1], kasten:[3.2,.6], treffer:[3.2,3.6,.9], baue:wegweiser },
  { x:-2.5, z:-11.2, steh:[-2.5,-9.3], kasten:[3.6,.7], treffer:[3.9,3.4,.8], baue:tafel },
  { x:8, z:6, steh:[5.6,6.4], r:1.5, treffer:[3.1,2.2,2.6], baue:huegel },
  { x:-3.2, z:3.4, steh:[-3.2,5.5], kasten:[3.2,1.2], treffer:[3.5,2.6,1.4], baue:zebra },
  { x:13, z:-9, dreh:.22, steh:[12.6,-6.4], kasten:[4.6,3], treffer:[4.6,2.3,2.8], baue:wagen },
  { x:1, z:8.8, dreh:-.12, steh:[1,6.9], r:1.05, treffer:[2.3,2.6,1.7], baue:rucksack }
];
return { titel:'Das Savannen-Gehege', himmel:0xf3a262, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Schlussbild Zoo: Zooeingang bei Sonnenuntergang. Die Laternen gehen nacheinander an, die rot-weiße Schranke hebt sich,
   die Spielfigur läuft durch den Torbogen nach vorn und winkt. Die Giraffe senkt freundlich den Kopf, Elefant, Pinguine und
   Seelöwe winken, Papageien sitzen auf den Torsäulen, bunte Ballons steigen auf und Konfetti fällt. Ohne Schrift. */
FINALE3D.zoo = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  const HORIZONT=0xffd09a;
  sc.background=new THREE.Color(HORIZONT);
  sc.fog=new THREE.Fog(HORIZONT,34,100);
  sc.add(new THREE.HemisphereLight(0xe4dcff,0x6a6a3a,.68));
  const licht=new THREE.DirectionalLight(0xffc890,.55); licht.position.set(-9,13,12); licht.castShadow=true; licht.shadow.mapSize.set(1024,1024);
  const sk=licht.shadow.camera; sk.left=-14; sk.right=14; sk.top=13; sk.bottom=-11; sk.near=1; sk.far=48; licht.shadow.bias=-.001; sc.add(licht);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const STEIN=0xcdb088, STEIN2=0x9a7a58, HOLZ=ZOO.HOLZ, HOLZ2=ZOO.HOLZ2, BLATT=ZOO.BLATT, GOLD=ZOO.GOLD, DUNKEL=0x2c3440, ROT=0xd8302a, WEISS=0xfdf8ee;

  /* ---------- Abendhimmel mit Sonne und Wolken ---------- */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#3c4a98'); v.addColorStop(.28,'#6a7ad0'); v.addColorStop(.4,'#c88ab4'); v.addColorStop(.445,'#f08a5a'); v.addColorStop(.495,'#ffd09a'); v.addColorStop(1,'#ffd09a'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(95,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(4.2,32),basis(0xfff0b0,{fog:false})); sonne.position.set(5.5,5.5,-70); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,214,130,.8)',5.5,5.5,-69,24); sonnenSchein.material.fog=false;
  const wolkeMat=basis(0xf6b0a0,{fog:false}), wolkeHell=basis(0xffd6c0,{fog:false});
  const wolken=[[-30,17,1.2],[-9,21,.85],[21,16,1.05],[40,22,.9]].map(p=>{ const g=gruppe(sc,p[0],p[1],-62);
    [[-2.2,0,1.3],[-.8,.5,1.7],[.9,.35,1.5],[2.3,0,1.1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1,.7,.4));
    ball(g,1,wolkeMat,0,-.4,.1,3.6,.65,.4); g.scale.setScalar(p[2]); ohneSchatten(g); verschmelze(g); ohneSchatten(g); return { g, x:p[0] }; });

  /* ---------- Boden, Weg, Hügel, Zaun und Grün ---------- */
  const gras=ZOO.bodenBild([112,164,74],20); gras.wrapS=gras.wrapT=THREE.RepeatWrapping; gras.repeat.set(20,20);
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(180,180),new THREE.MeshLambertMaterial({map:gras})); boden.rotation.x=-Math.PI/2; boden.receiveShadow=true; sc.add(boden);
  const fest=gruppe(sc,0,0,0);
  box(fest,5.4,.04,46,0xe2c490,0,.02,-8);
  const platz=walze(fest,1,.03,0xe2c490,0,.018,2.6); platz.scale.set(4.6,.03,3.2);
  [-2.75,2.75].forEach(x=>box(fest,.16,.1,46,STEIN2,x,.04,-8));
  const huegel=gruppe(sc,0,0,0);
  [[-34,-48,19,6,0x6f9a52],[-9,-58,22,5,0x5f8a52],[18,-52,20,6.5,0x6f9a52],[42,-46,17,7,0x5f8a52],[-56,-34,16,8,0x5f8a52],[60,-30,18,8,0x6f9a52]].forEach(h=>ball(huegel,1,h[4],h[0],-.8,h[1],h[2],h[3],8));
  ohneSchatten(huegel); verschmelze(huegel); ohneSchatten(huegel);
  /* niedriger Holzzaun hinter den Tieren */
  const pf=[], lat=[];
  [-1,1].forEach(v=>{ for(let x=4.2;x<26;x+=1.15) pf.push([v*x,.6,-4.2,.1,1.2,.1,HOLZ2]);
    [.45,.95].forEach(y=>lat.push([v*15,y,-4.2,22,.12,.08,HOLZ])); });
  ZOO.viele(sc,GEO.cyl,pf); ZOO.viele(sc,GEO.box,lat);
  const staemme=[], kronen=[], busch=[], blumen=[], halme=[], GRUEN=[BLATT,0x55a04e,0x2f7a42,0x6aa83e];
  [[-6.5,-9,1],[-11,-7,1.15],[-16,-10,1.3],[-21,-6,1],[-27,-12,1.4],[-8,-17,1.2],[-14,-21,1.5],[5.5,-11,1],[11,-8,1.2],[16.5,-11,1.35],[22,-6,1.05],[28,-13,1.4],[9,-19,1.3],[17,-23,1.5],[-5,-27,1.4],[6,-30,1.5],[-23,-24,1.6],[26,-25,1.6],[-13,-1,.9],[14.5,-1.5,.95],[-19,1,1],[20,.5,1]].forEach((b,i)=>{
    const [x,z,s]=b; staemme.push([x,1.1*s,z,.24*s,2.2*s,.24*s,HOLZ2]);
    kronen.push([x,3*s,z,1.45*s,1.3*s,1.35*s,GRUEN[i%4]],[x-.7*s,2.4*s,z+.35*s,.9*s,.8*s,.85*s,GRUEN[(i+1)%4]],[x+.75*s,2.55*s,z+.2*s,.95*s,.85*s,.9*s,GRUEN[(i+2)%4]]); });
  for(let i=0;i<46;i++){ const v=i%2?1:-1, x=v*(4.3+zufall()*18), z=-3.3-zufall()*.6-(i%3?0:2.2), s=.3+zufall()*.38; busch.push([x,s*.6,z,s*1.25,s,s,GRUEN[i%4]]); }
  const BLUETE=[0xff5a7a,0xffd22a,0xffffff,0xc070ff,0xff8a2a];
  for(let i=0;i<190;i++){ const v=i%2?1:-1, x=v*(3.15+zufall()*13), z=-2.8+zufall()*9, g=.05+zufall()*.05;
    halme.push([x,.11,z,.07,.26,.07,GRUEN[i%4],zufall()*3]); if(i%3) blumen.push([x+.08,.2,z,g,g*.8,g,BLUETE[i%5]]); }
  ZOO.viele(sc,GEO.cyl,staemme); ZOO.viele(sc,GEO.sph,kronen); ZOO.viele(sc,GEO.sph,busch); ZOO.viele(sc,GEO.cone,halme); ZOO.viele(sc,GEO.sph,blumen);

  /* ---------- Torbogen mit Tierfiguren ---------- */
  const tor=gruppe(sc,0,0,0); tor.name='tor';
  const SX=3.4, SH=4.1;
  [-1,1].forEach(v=>{ box(tor,1.25,.4,1.25,STEIN2,v*SX,.2,0); box(tor,.92,SH-.4,.92,STEIN,v*SX,.4+(SH-.4)/2,0); box(tor,1.18,.26,1.18,STEIN2,v*SX,SH+.1,0);
    [1.1,2.2,3.3].forEach(y=>box(tor,.96,.07,.96,STEIN2,v*SX,y,0));
    /* Pfotenabdruck auf jeder Säule */
    ball(tor,.17,HOLZ2,v*SX,1.55,.46,1.15,.95,.25); [[-.2,.2],[-.07,.31],[.08,.31],[.21,.2]].forEach(q=>ball(tor,.065,HOLZ2,v*SX+q[0],1.55+q[1],.46,1,1.15,.4)); });
  const bogen=(r,d,c,z)=>{ const b=ring(tor,r,d,c,0,SH+.15,z,Math.PI); b.scale.y=.44; return b; };
  bogen(SX,.24,HOLZ,0); bogen(SX-.55,.13,HOLZ2,0);
  for(let i=1;i<10;i++){ const a=i/10*Math.PI; strich(tor,[Math.cos(a)*(SX-.55),SH+.15+Math.sin(a)*(SX-.55)*.44,0],[Math.cos(a)*SX,SH+.15+Math.sin(a)*SX*.44,0],.06,HOLZ2); }
  const laub=[];
  for(let i=0;i<64;i++){ const a=(i+.5)/64*Math.PI, r=SX+.13+(i%3)*.06; laub.push([Math.cos(a)*r,SH+.15+Math.sin(a)*r*.44+(i%2)*.1,(i%2?-.12:.1),.23,.17,.2,GRUEN[i%4]]);
    if(i%5===2) laub.push([Math.cos(a)*r,SH+.2+Math.sin(a)*r*.44,.31,.1,.1,.08,BLUETE[i%5]]); }
  ZOO.viele(tor,GEO.sph,laub);
  /* Löwenkopf in der Mitte */
  const loewe=gruppe(tor,0,SH+.15+SX*.44-.05,.35); loewe.name='loewe';
  for(let i=0;i<14;i++){ const a=i/14*6.2832; ball(loewe,.28,i%2?0xb8641e:0xd07c26,Math.cos(a)*.5,Math.sin(a)*.5,-.05,1,1,.6); }
  ball(loewe,.52,0xf2b848,0,0,.05,1,1,.65);
  [-1,1].forEach(v=>{ ball(loewe,.15,0xf2b848,v*.36,.42,.18,1,1,.6); ball(loewe,.08,0xb8641e,v*.36,.42,.27,1,1,.4); ball(loewe,.065,0x1a1208,v*.19,.12,.37); ball(loewe,.022,basis(0xffffff),v*.19+.025,.15,.43); ball(loewe,.17,0xfbe6b8,v*.13,-.15,.34,1,.85,.6);
    [-.02,.07].forEach(h=>strich(loewe,[v*.2,-.15+h*.4,.45],[v*.52,-.17+h,.4],.008,0xfdf8ee)); });
  ball(loewe,.09,0x5a2a14,0,-.06,.46,1.25,.85,.8); const mund=ring(loewe,.1,.022,0x5a2a14,0,-.22,.42,Math.PI); mund.rotation.z=Math.PI;
  verschmelze(tor);
  /* zwei Papageien auf den Säulen */
  const buendel=(g,frei)=>{ const kinder=g.children.slice(), f=gruppe(g,0,0,0);
    kinder.forEach(c=>{ if(c.isMesh){ if(!frei || frei.indexOf(c)<0) f.add(c); } else if(c.isGroup) buendel(c,frei); }); verschmelze(f); };
  [-1,1].forEach((v,i)=>{ const p=ZOO.tier(k,'papagei',sc,v*SX,.38,v<0?-1.05:-2.1,1,SH+.2); p.name='papagei'; buendel(p.children[0]); });

  /* ---------- Schranke ---------- */
  const SCHRX=-2.72, SCHRZ=1.15;
  const pfosten=gruppe(sc,0,0,0);
  box(pfosten,.42,1.25,.42,DUNKEL,SCHRX,.62,SCHRZ-.32); box(pfosten,.5,.1,.5,GOLD,SCHRX,1.3,SCHRZ-.32);
  box(pfosten,.22,.82,.22,DUNKEL,2.05,.41,SCHRZ-.05); [-.15,.15].forEach(v=>box(pfosten,.2,.34,.07,GOLD,2.05,.98,SCHRZ+v));
  verschmelze(pfosten);
  const schranke=gruppe(sc,SCHRX,1.05,SCHRZ), stange=gruppe(schranke,0,0,0); schranke.name='schranke';
  for(let i=0;i<7;i++){ const s=walze(stange,.11,.68,i%2?WEISS:ROT,.34+i*.68,0,0); s.rotation.z=Math.PI/2; }
  ball(stange,.14,GOLD,4.82,0,0); const achse=walze(stange,.17,.22,GOLD,0,0,.04); achse.rotation.x=Math.PI/2;
  box(stange,.55,.4,.2,ROT,-.42,0,0);
  verschmelze(stange);

  /* ---------- Laternen: gehen nacheinander an ---------- */
  const laternen=[];
  const laterne=(x,y,z,h,an,stark)=>{ const g=gruppe(sc,x,y,z), f=gruppe(g,0,0,0); g.name='laterne';
    walze(f,.2,.18,DUNKEL,0,.09,0); walze(f,.07,h,DUNKEL,0,h/2,0); box(f,.46,.07,.46,DUNKEL,0,h,0); const dach=kegel(f,.38,.26,DUNKEL,0,h+.62,0); dach.rotation.y=Math.PI/4; ball(f,.07,GOLD,0,h+.79,0);
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(q=>box(f,.045,.46,.045,DUNKEL,q[0]*.17,h+.27,q[1]*.17));
    verschmelze(f);
    const glas=basis(0x6a6258), kern=box(g,.31,.43,.31,glas,0,h+.27,0); kern.castShadow=false;
    const s=schein(g,'rgba(255,210,110,.85)',0,h+.27,.1,.1); s.visible=false;
    let l=null; if(stark){ l=new THREE.PointLight(0xffb850,0,7.5,1.6); l.position.set(x,y+h+.3,z+.5); sc.add(l); }
    laternen.push({ glas,s,l,an,stark }); };
  laterne(-3.75,0,2.25,2.2,.5,.85); laterne(3.75,0,2.25,2.2,.8,.85);
  [-1,1].forEach((v,i)=>laterne(v*(SX+.95),0,-3.1,2.9,1.15+i*.3,.6));
  [[-3.4,-5.5],[3.4,-5.5],[-3.4,-11],[3.4,-11],[-3.4,-17],[3.4,-17]].forEach((p,i)=>laterne(p[0],0,p[1],2.4,1.6+i*.22,0));
  const aus=new THREE.Color(0x6a6258), hell=new THREE.Color(0xfff0a8);

  /* ---------- Tiere ---------- */
  /* Elefant (links) hebt den Rüssel zum Winken */
  const ele=ZOO.tier(k,'elefant',sc,-8.05,-2.3,-.85,.76,.28); ele.name='elefant';
  const podest=gruppe(sc,0,0,-2.3), pg=gruppe(podest,0,0,0); rohr(pg,2.3,2.6,.28,ZOO.SAND,0,.14,0,22); verschmelze(pg);
  const eg=ele.children[0], eKopf=eg.children.find(c=>c.isGroup), ruessel=eKopf.children.find(c=>c.isGroup), spitze=ruessel.children.find(c=>c.isGroup);
  const ohren=eKopf.children.filter(c=>c.isMesh && Math.abs(c.position.z)>.9);
  buendel(eg,ohren);
  /* Giraffe (rechts) senkt freundlich den Kopf */
  const gir=ZOO.tier(k,'giraffe',sc,6.9,-.9,-2.6,.82); gir.name='giraffe';
  const gg=gir.children[0], hals=gg.children.find(c=>c.isGroup), gKopf=hals.children.find(c=>c.isGroup);
  buendel(gg);
  /* Eisscholle mit drei Pinguinen (vorn links) */
  const scholle=gruppe(sc,0,0,0), eis=gruppe(scholle,0,0,0);
  rohr(eis,1.85,2,.24,ZOO.EIS,0,.12,0,9); rohr(eis,1.72,1.8,.08,ZOO.SCHNEE,0,.27,0,9); [[-1.5,-.8,.42],[-1.05,-1.1,.28],[1.55,-.75,.3]].forEach(q=>ball(eis,q[2],ZOO.SCHNEE,q[0],.35,q[1],1.1,.85,1));
  eis.scale.z=.72; verschmelze(eis); scholle.scale.setScalar(.9);
  const pinguine=[[-1,0,.88,-1.25],[0,.45,1.02,-1.57],[1.02,-.1,.8,-1.9]].map((p,i)=>{
    const h=ZOO.tier(k,'pinguin',scholle,p[0],p[1],p[3],p[2],.29); h.name='pinguin';
    const t=h.children[0], fl=t.children.filter(c=>c.isMesh && Math.abs(Math.abs(c.position.z)-.43)<.01);
    const arme=fl.map(m=>{ const s=Math.sign(m.position.z), a=gruppe(t,0,1.15,s*.3); a.add(m); m.position.set(0,-.34,s*.08); m.scale.y*=1.2; m.scale.z*=1.1; return { a,s }; });
    arme.forEach(a=>{ a.a.userData.lebendig=true; });
    const rest=t.children.filter(c=>c.isMesh), f=gruppe(t,0,0,0); rest.forEach(m=>f.add(m)); verschmelze(f);
    return { h,t,arme,i }; });
  /* Seelöwe auf einem Stein im Wasserbecken (vorn rechts) */
  const becken=gruppe(sc,0,0,0), bf=gruppe(becken,0,0,0);
  const wasser=walze(bf,1,.1,ZOO.WASSER,0,.06,0); wasser.scale.set(2,.1,1.45);
  const rand=ring(bf,1,.1,STEIN,0,.1,0); rand.rotation.x=Math.PI/2; rand.scale.set(2,1.45,1.4);
  ball(bf,1,ZOO.FELS,0,.12,0,1.35,.42,.95); ball(bf,.4,ZOO.FELS,-1.1,.15,.4,1.1,.7,1);
  verschmelze(bf);
  const robbe=ZOO.tier(k,'seeloewe',becken,.15,-.05,-1.95,.82,.36); robbe.name='seeloewe';
  const rt=robbe.children[0], rKopf=rt.children.find(c=>c.isGroup);
  /* Winkflosse: das Vorderbein links wird durch eine lange, spitze Flosse mit rundem Ansatz an der Schulter ersetzt */
  rt.children.filter(c=>c.isMesh && c.position.x>.4 && c.position.x<.85 && c.position.y<.5 && c.position.z>.4).forEach(m=>rt.remove(m));
  const flosse=gruppe(rt,.72,.66,.36), ff=gruppe(flosse,0,0,0), FD=0x55391f;
  ball(ff,.2,0x6e4b33,0,0,.04,.9,.9,1);
  ball(ff,.18,FD,0,0,.4,.75,.5,1.9);
  ball(ff,.13,FD,0,0,.82,1.25,.35,2.2);
  verschmelze(ff); ff.rotation.z=1.2;
  { const rest=rt.children.filter(c=>c.isMesh), f=gruppe(rt,0,0,0); rest.forEach(m=>f.add(m)); verschmelze(f); buendel(rKopf); }

  /* ---------- Spielfigur ---------- */
  const u=figur.userData, FS=1.3;
  figur.position.set(0,0,-2.4); figur.scale.set(FS,FS,FS); sc.add(figur);

  /* ---------- Ballons, Vögel, Glühwürmchen, Konfetti ---------- */
  const viele=(geo,m,n,fa)=>{ const t=new THREE.InstancedMesh(geo,m,n); if(fa) for(let i=0;i<n;i++) t.setColorAt(i,new THREE.Color(fa[i%fa.length])); t.frustumCulled=false; t.visible=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  const BUNT=[0xff4a5a,0x2f6fe8,0x28d060,0xffd22a,0xd06aff,0xff9a2a,0xff7ab8];
  const NB=24, ballons=viele(GEO.sph,new THREE.MeshPhongMaterial({color:0xffffff,shininess:80,specular:0x555555,emissive:0x1a0c08}),NB,BUNT), knoten=viele(GEO.cone,mat(0xffffff),NB,BUNT), schnur=viele(GEO.box,basis(0x5a4a50),NB), bd=[];
  for(let i=0;i<NB;i++){ const v=i%2?1:-1; bd.push({ x:v*(1.2+((i*.618)%1)*11), z:-5.5-((i*.414)%1)*4, start:2.4+(i%12)*.22+(i>11?1.4:0), v:1+((i*.73)%1)*.7, g:.34+((i*.37)%1)*.14, p:i*1.7 }); }
  const NV=10, voegel=viele(GEO.box,basis(0x3a2a44,{fog:false}),NV);
  const NG=40, funken=viele(new THREE.OctahedronGeometry(1,0),basis(0xfff29a),NG), gd=[];
  for(let i=0;i<NG;i++) gd.push({ x:(i%2?1:-1)*(3+zufall()*9), y:.5+zufall()*3, z:-3.5+zufall()*6.5, p:zufall()*6.28 });
  const NC=160, konf=viele(GEO.box,basis(0xffffff),NC,BUNT), kd=[];
  for(let i=0;i<NC;i++) kd.push({ x:zufall()*2-1, y:zufall()*2.4, z:-3+zufall()*5, v:.12+zufall()*.16, p:zufall()*6 });

  /* Blickrichtung der Kamera: leicht von oben */
  const NEIG=.13, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=2.85;
  /* Plätze je nach Bildformat: q=0 schmal (Tiere näher am Tor), q=1 breit */
  const plaetze=a=>{ const q=weich((a-1.5)/1.3);
    return { ele:misch(-8.5,-10.3,q), gir:misch(7.45,8.5,q), ping:misch(-4.4,-7.2,q), robbe:misch(4.8,7.4,q) }; };
  /* kleinster Kameraabstand, bei dem alle wichtigen Punkte im Bild sind */
  const abstand=(P,a,tn)=>{ const punkte=[
      [0,6.8,.4],[-4.1,4.4,.6],[4.1,5.6,.2],[-2.3,6.05,SCHRZ],[0,-.05,3.8],[0,2.9,3.3],
      [P.ele-2.1,0,-3.2],[P.ele-1.6,4.2,-2.7],[P.ele+2.2,4.2,-.2],
      [P.gir+1.8,0,-1.6],[P.gir+1.4,3.8,-1.4],[P.gir-1.5,6.3,.2],
      [P.ping-2,0,4.45],[P.ping+1.8,0,4.75],[P.robbe+2.1,0,4.55],[P.robbe-2.1,0,4.55],[P.robbe,2.3,4.55]];
    return punkte.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hochB=Math.abs(Y*CN-p[2]*SN);
      return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hochB/(.95*tn)+naeher); },8); };

  const LOS=2, DA=4.6;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), P=plaetze(a), d=abstand(P,a,tn);
    const wippen=Math.sin(t*.22)*.25*weich((t-5)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);
    /* Punkt im Bild: x,y in Bildhälften, weg = Abstand von der Kamera */
    const imBild=(x,y,weg)=>[wippen*(1-weg/d)+x*weg*tn*a, ZIELY+d*SN-weg*SN+y*weg*tn*CN, d*CN-weg*CN-y*weg*tn*SN];
    kuppel.position.copy(kamera.position);
    wolken.forEach((w,i)=>{ w.g.position.x=w.x+Math.sin(t*.06+i)*3; });

    /* Laternen */
    laternen.forEach((l,i)=>{ const w=weich((t-l.an)/.45), flimmer=1+Math.sin(t*9+i*2)*.05; l.glas.color.copy(aus).lerp(hell,w); l.s.visible=w>.02; const g=(l.stark?1.7:1.5)*w*flimmer; l.s.scale.set(g,g,1); if(l.l) l.l.intensity=l.stark*w*flimmer; });

    /* Schranke hebt sich und federt nach */
    const hub=weich((t-.8)/1.2), nach=t>2?Math.sin((t-2)*11)*.05*Math.exp(-(t-2)*3):0;
    schranke.rotation.z=1.5*hub+nach*.6;

    /* Figur läuft durch das Tor nach vorn, dann winkt sie und jubelt */
    const lauf=Math.min(1,Math.max(0,(t-LOS)/(DA-LOS))), geht=lauf>0&&lauf<1, s=Math.sin(t*10);
    figur.position.z=misch(-2.4,3.1,lauf);
    figur.rotation.y=geht?0:Math.sin(t*.9)*.14*weich(t-DA);
    u.beinL.rotation.x=geht?s*.65:0; u.beinR.rotation.x=geht?-s*.65:0;
    const winkt=weich((t-DA)/.4), jubel=weich((Math.sin((t-7)*.9)-.2)/.5)*weich((t-7)/.5);
    u.armR.rotation.x=geht?s*.55:0; u.armL.rotation.x=geht?-s*.55:0;
    u.armR.rotation.z=misch(.18,2.4+Math.sin(t*7.5)*.38,winkt);
    u.armL.rotation.z=misch(-.18,-2.35+Math.sin(t*7.5+1.6)*.35,jubel);
    u.koerper.position.y=geht?Math.abs(Math.cos(t*10))*.07:Math.abs(Math.sin(t*4))*.05*winkt; u.koerper.rotation.z=Math.sin(t*2.2)*.035*winkt;

    /* Elefant winkt mit dem Rüssel */
    ele.position.x=podest.position.x=P.ele;
    const ew=weich((t-2.6)/.8)*(.75+.25*weich(Math.sin(t*.8)*2+1));
    ruessel.rotation.z=misch(.2,1.95,ew)+Math.sin(t*4.6)*.24*ew;
    spitze.rotation.z=.55*ew+Math.sin(t*4.6+1.1)*.4*ew;
    eKopf.rotation.z=Math.sin(t*1.4)*.06+.08*ew;

    /* Giraffe senkt freundlich den Kopf, hebt ihn wieder und wippt */
    gir.position.x=P.gir;
    const gt=t-3.4, nick=gt<0?0:weich((.5-.5*Math.cos(gt*1.15))*1.25);
    hals.rotation.z=-.62*nick+Math.sin(t*.9)*.035;
    gKopf.rotation.z=.3*nick+Math.sin(t*5)*.11*weich((nick-.7)/.3);
    gir.position.y=Math.abs(Math.sin(t*2.1))*.05;

    /* Pinguine winken und hüpfen nacheinander */
    scholle.position.set(P.ping,0,3.85);
    pinguine.forEach(p=>{ const w=weich((t-3-p.i*.35)/.5);
      p.h.position.y=.29+Math.max(0,Math.sin(t*3.2+p.i*2.1))*.16*w;
      p.arme.forEach(f=>{ const hoch=(f.s>0)===(p.i!==2)||p.i===1; f.a.rotation.x=-f.s*(hoch?(2.2+Math.sin(t*8+p.i)*.45)*w:.25+Math.sin(t*3+p.i)*.12); }); });

    /* Seelöwe winkt mit einer Vorderflosse und nickt */
    becken.position.set(P.robbe,0,3.85);
    const rw=weich((t-3.8)/.6);
    flosse.rotation.x=misch(.5,-.85-Math.sin(t*7)*.4,rw);
    rKopf.rotation.z=.12+Math.sin(t*2.3)*.18;

    /* Ballons steigen hinter dem Tor auf */
    ballons.visible=knoten.visible=schnur.visible=true;
    bd.forEach((b,i)=>{ const alt=t-b.start; let g=0,y=-3; if(alt>0){ y=.4+(alt*b.v)%12.5; g=b.g*weich((y-.4)/1.2)*weich((12.9-y)/1); }
      const x=b.x+Math.sin(t*1.1+b.p)*.35, neig=Math.sin(t*1.4+b.p)*.12;
      setze(ballons,i,x,y,b.z,g,g*1.22,g,0,0,neig); setze(knoten,i,x+Math.sin(neig)*g*1.28,y-g*1.28,b.z,g*.22,g*.24,g*.22,0,0,neig); setze(schnur,i,x+Math.sin(neig)*g*2.3,y-g*2.35,b.z,g?.025:0,g*2.1,g?.025:0,0,0,neig*1.5); });
    ballons.instanceMatrix.needsUpdate=knoten.instanceMatrix.needsUpdate=schnur.instanceMatrix.needsUpdate=true;

    /* Vögel ziehen heim */
    voegel.visible=true;
    for(let i=0;i<NV/2;i++){ const x=((t*(.9+i*.12)+i*13+22)%64)-32, y=11+i*1.5+Math.sin(t*.8+i)*.5, z=-45, schlag=Math.sin(t*6+i*1.9)*.45+.15;
      [-1,1].forEach((v,j)=>setze(voegel,i*2+j,x+v*.38*Math.cos(schlag),y+.38*Math.sin(schlag),z,.85,.12,.12,0,0,v*schlag)); }
    voegel.instanceMatrix.needsUpdate=true;

    /* Glühwürmchen und Konfetti */
    funken.visible=t>2;
    if(funken.visible){ gd.forEach((f,i)=>{ const g=.055*Math.pow(Math.max(0,Math.sin(t*2.2+f.p)),2)*weich(t-2); setze(funken,i,f.x+Math.sin(t*.7+f.p)*.4,f.y+Math.sin(t*1.1+f.p*2)*.3,f.z,g,g,g); }); funken.instanceMatrix.needsUpdate=true; }
    konf.visible=t>DA-.4;
    if(konf.visible){ const seit=t-DA+.4, gr=d*tn/4.6;
      kd.forEach((c,i)=>{ let y=1.15+c.y-seit*c.v*2.2; if(y<-1.2) y=1.15+((y+1.2)%2.4); const q=imBild(c.x+Math.sin(t*1.6+c.p)*.03,y,d-c.z); setze(konf,i,q[0],q[1],q[2],.1*gr,.022*gr,.07*gr,t*3+c.p,t*2+c.p,c.p); });
      konf.instanceMatrix.needsUpdate=true; }
  };
};

