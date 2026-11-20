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