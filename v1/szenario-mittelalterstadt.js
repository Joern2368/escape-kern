document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-msglocke\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><path d=\"M-14 12H14Q11 4 11 -4Q11 -15 0 -15Q-11 -15 -11 -4Q-11 4 -14 12Z\"/><circle cx=\"0\" cy=\"16\" r=\"3.5\"/><rect x=\"-2\" y=\"-19\" width=\"4\" height=\"5\"/></g></symbol>\n<symbol id=\"sym-msmuenze\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M0 -17A17 17 0 1 0 0 17A17 17 0 1 0 0 -17ZM0 -12A12 12 0 1 1 0 12A12 12 0 1 1 0 -12Z\"/><rect x=\"-2.5\" y=\"-8\" width=\"5\" height=\"16\"/><rect x=\"-6\" y=\"-8\" width=\"5\" height=\"4\"/></g></symbol>\n<symbol id=\"sym-mshufeisen2\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-12 15V-2Q-12 -15 0 -15Q12 -15 12 -2V15\"/></g><g fill=\"currentColor\"><circle cx=\"-12\" cy=\"2\" r=\"2\"/><circle cx=\"12\" cy=\"2\" r=\"2\"/><circle cx=\"-8\" cy=\"-10\" r=\"2\"/><circle cx=\"8\" cy=\"-10\" r=\"2\"/></g></symbol>\n<symbol id=\"sym-msfeder\" viewBox=\"-20 -20 40 40\"><path d=\"M16 -17Q-4 -15 -10 3L-14 16L-3 10Q11 6 16 -17Z\" fill=\"currentColor\"/><path d=\"M-14 17L8 -6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-mssiegel\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M0 -17A17 17 0 1 0 0 17A17 17 0 1 0 0 -17ZM0 -11A11 11 0 1 1 0 11A11 11 0 1 1 0 -11Z\"/><path d=\"M0 -7L2 -2L7 -2L3 1L5 6L0 3L-5 6L-3 1L-7 -2L-2 -2Z\"/></g></symbol>\n</defs>\n</svg>");
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
const holz='#8a5a30',dk='#3a2410',gold='#f2c14e';
const haus=(x,y,w,h,f,r)=>R(x,y,w,h,f,'#4a3a30',2)+P(`M${x-8} ${y}L${x+w/2} ${y-w*.5}L${x+w+8} ${y}Z`,r,'#3a2018',2)+L(`M${x} ${y+h*.45}H${x+w}M${x+w/3} ${y}V${y+h}M${x+w*2/3} ${y}V${y+h}M${x} ${y+h*.45}L${x+w/3} ${y}M${x+w} ${y+h*.45}L${x+w*2/3} ${y}`,'#6a4a30',3)+R(x+w*.08,y+h*.12,w*.18,h*.22,'#ffd890','#4a3a30',1.5)+R(x+w*.74,y+h*.12,w*.18,h*.22,'#ffd890','#4a3a30',1.5)+R(x+w*.4,y+h*.62,w*.2,h*.38,'#6a4a28');
const mauer=(y0,h,f)=>{let d='';for(let k=0;k*30<h;k++){d+=`M0 ${y0+k*30}H1600`;for(let j=0;j<27;j++)d+=`M${j*60+(k%2)*30} ${y0+k*30}v30`;}return R(0,y0,1600,h,f)+L(d,'rgba(50,40,30,.35)',2);};
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ac4ee"/><stop offset="1" stop-color="#fdeedd"/></linearGradient>
 <linearGradient id="abM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6ac0"/><stop offset=".6" stop-color="#f08a5a"/><stop offset="1" stop-color="#ffd890"/></linearGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<40;k++)d+=E((k*173+40)%1600,500+(k*61)%270,10+k%4*4,4,'rgba(60,50,40,.35)');return g+d+L('M0 560Q500 540 1000 570T1600 556M0 700Q500 690 1000 710T1600 696','rgba(60,40,20,.3)',5);}
if(m==1){for(let x=30;x<1600;x+=110)for(const y of[500,560,630,700,760])d+=`M${x+(y%5)*13} ${y}h8`;return g+L(d,'rgba(0,0,0,.28)',6);}
if(m==2){for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return g+L(d,'rgba(0,0,0,.2)',2);}
for(const y of[500,540,590,650,720]){d+=`M0 ${y}H1600`;for(let x=0;x<1600;x+=140+(y-470)/3)d+=`M${x+(y%3)*40} ${y}V${y+30}`;}return g+L(d,'rgba(0,0,0,.25)',3);}
const tafelw=()=>`${L('M-50 -50V-84M50 -50V-84','#4a4a52',4)}${R(-70,-50,140,100,'#7a5230','#2a1808',5)}${R(-58,-38,116,76,'#f4e8c4','#8a6a3a',2)}${L('M-42 -20H42M-42 -4H30M-42 12H42M-42 28H10','#6a5a40',3)}${C(40,26,9,gold,'#a07010',2)}`;
const wappen1=()=>`${P('M-44 -56H44V0Q44 40 0 62Q-44 40 -44 0Z','#f4e8c4',dk,4)}${P('M0 -56H44V0Q44 40 0 62Z','#c0303a')}${R(-30,-24,32,44,'#9a9080','#3a3630',2)}${[-30,-18,-6,6].map(x=>R(x,-32,8,10,'#9a9080','#3a3630',2)).join('')}${P('M-22 20V0Q-14 -12 -6 0V20Z',dk)}`;
const fass=()=>`${sch(44)}${P('M-34 0Q-44 -40 -34 -80H34Q44 -40 34 0Z','#a0703a',dk,3)}${E(0,-80,34,8,'#6ac0e8',dk,2)}${L('M-40 -20H40M-40 -60H40','#3a3a40',5)}${L('M-14 -78V-2M14 -78V-2','rgba(0,0,0,.2)',3)}`;
const rad=()=>`${sch(50)}${C(0,-60,56,'none','#8a5a30',9)}${C(0,-60,61,'none','#3a3a40',3)}${L('M-56 -60H56M0 -116V-4M-40 -100L40 -20M40 -100L-40 -20','#8a5a30',6)}${C(0,-60,12,'#a0703a',dk,3)}${C(0,-60,4,'#3a3a40')}`;
const bank=()=>`${sch(70)}${R(-64,-40,128,12,'#c89a60','#5a3a1c',3)}${R(-64,-76,128,10,'#c89a60','#5a3a1c',3)}${R(-56,-28,10,28,holz)}${R(46,-28,10,28,holz)}${R(-60,-76,6,40,holz)}${R(54,-76,6,40,holz)}${R(-20,-70,40,28,'#f4e8c4','#8a6a3a',2)}${L('M-12 -62H12M-12 -52H8','#6a5a40',2)}`;
const fackel=()=>`${sch(26)}${C(0,-190,70,'url(#licht)')}${R(-6,-170,12,170,'#6a4a28','#2a1808',2)}${R(-18,-150,36,6,'#3a3a40')}${P('M-12 -172H12L8 -190H-8Z','#3a3a40')}${P('M0 -228Q-16 -204 -8 -192H8Q16 -204 0 -228Z','#ff9a30')}${P('M0 -214Q-6 -200 0 -194Q6 -200 0 -214Z','#ffe070')}`;
const kette=()=>`${sch(84)}${R(-80,-60,14,60,'#8a8478','#3a3630',2)}${R(66,-60,14,60,'#8a8478','#3a3630',2)}${E(-73,-60,10,5,'#a8a498','#3a3630',2)}${E(73,-60,10,5,'#a8a498','#3a3630',2)}${L('M-70 -52Q0 -8 70 -52','#4a4a52',5)}${L('M-70 -52Q0 -8 70 -52','#a8a8b4',2)}`;
const plan=()=>`${R(-80,-56,160,112,'#f0dcb0','#7a5a2a',4)}${E(0,0,52,36,'#e8d4a0','#8a8478',5)}${L('M-52 0H52M0 -36V36M-30 -28L30 28','#a08a60',3)}${L('M-80 24Q-30 40 20 30T80 40','#6ab0e0',4)}${R(-12,-14,24,16,'#e8a090','#6a3a30',2)}${P('M-16 -14L0 -28L16 -14Z','#c0504a')}${C(34,-30,5,'#c0303a')}`;
const waage=()=>`${sch(40)}${R(-4,-130,8,130,'#a0703a')}${R(-30,-8,60,10,'#a0703a',dk,2)}${L('M-64 -126H64','#3a2410',6)}${L('M-62 -124L-78 -66M-62 -124L-40 -66M62 -124L40 -66M62 -124L78 -66','#4a4a52',2)}${E(-59,-64,26,6,'#d8b050','#7a5a20',2)}${E(59,-64,26,6,'#d8b050','#7a5a20',2)}${R(-68,-82,18,16,'#5a5a68','#2a2a38',2)}${R(-48,-76,14,10,'#8a8a98','#2a2a38',2)}${C(50,-72,8,'#e74c3c')}${C(68,-72,8,'#7ad06a')}${C(58,-82,7,'#e8a030')}`;
const korb=()=>`${sch(52)}${P('M-48 -44H48L38 0H-38Z','#c89a50','#6a4a1c',3)}${L('M-44 -30H44M-40 -16H40M-20 -44V0M0 -44V0M20 -44V0','#8a6a28',2)}${C(-28,-52,15,'#e74c3c')}${C(0,-58,15,'#e8a030')}${C(28,-52,15,'#7ad06a')}${C(-10,-66,12,'#f6d84a')}${C(16,-68,12,'#e74c3c')}`;
const tuch=()=>`${sch(60)}${[[-52,-28,'#c0303a','#e8707a'],[0,-28,'#2e6ac8','#6a9ae8'],[-26,-56,'#f2c14e','#f8e090']].map(([x,y,c,d])=>R(x,y,64,28,c,'#222',2)+E(x+64,y+14,8,14,d,'#222',2)+L(`M${x+10} ${y+4}V${y+24}M${x+30} ${y+4}V${y+24}`,d,3)).join('')}${R(-4,-62,12,6,'#fff')}`;
const preis=()=>`${L('M-40 -66V-48M40 -66V-48','#4a4a52',4)}${R(-60,-60,120,120,'#e8d098','#5a3a1c',4)}${[[-30,-34],[-30,0],[-30,34]].map(([x,y],k)=>[E(x,y,13,9,'#d8a050','#7a4a1c',2),C(x,y,8,'#e74c3c','#7a2a20',1.5),P(`M${x-14} ${y+8}L${x} ${y-10}L${x+14} ${y+8}Z`,'#f6d84a','#a08020',1.5)][k]+[1,2,3].map((_,j)=>j<=k?C(8+j*18,y,6,gold,'#a07010',1.5):'').join('')).join('')}`;
const brunnen=()=>`${sch(70)}${E(0,-18,66,18,'#a8aeb8','#4a5058',3)}${R(-66,-46,132,28,'#a8aeb8','#4a5058',3)}${E(0,-46,66,16,'#b8bec8','#4a5058',3)}${E(0,-46,52,10,'#6ac0e8')}${R(-62,-130,8,86,holz,dk,2)}${R(54,-130,8,86,holz,dk,2)}${R(-70,-138,140,10,'#a0703a',dk,2)}${P('M-76 -138L0 -176L76 -138Z','#c0504a','#6a2a20',3)}${L('M0 -128V-80','#6a4a2a',3)}${R(-10,-82,20,18,'#a0703e','#4a2a10',2)}`;
const truhe=()=>`${sch(64)}${R(-56,-46,112,46,'#a0603a','#4a2a10',4)}${P('M-56 -46L-48 -86H48L56 -46Z','#b8703a','#4a2a10',4)}${L('M-26 -86V0M26 -86V0','#5a5a68',6)}${R(-10,-50,20,18,gold,'#a07010',3)}${[[-34,-92],[-8,-100],[20,-96],[40,-90],[0,-110]].map(([x,y])=>E(x,y,12,5,gold,'#a07010',2)).join('')}`;
const brotstand=()=>`${sch(70)}${R(-60,-50,120,10,'#c89a60','#5a3a1c',3)}${R(-54,-40,8,40,holz)}${R(46,-40,8,40,holz)}${E(-30,-62,24,12,'#d8a050','#8a5a20',2)}${E(10,-64,22,12,'#e0b060','#8a5a20',2)}${E(40,-60,16,10,'#d8a050','#8a5a20',2)}${R(-56,-150,6,100,holz)}${R(50,-150,6,100,holz)}${[0,1,2,3].map(k=>P(`M${-60+k*30} -150H${-30+k*30}V-124Q${-45+k*30} -112 ${-60+k*30} -124Z`,k%2?'#fff':'#c0504a','#7a2a20',2)).join('')}`;
const markglocke=()=>`${L('M-60 -70H16','#3a3a40',7)}${L('M-30 -70L-4 -50','#3a3a40',4)}${P('M-30 -2H20Q16 -14 16 -30Q16 -50 -5 -50Q-26 -50 -26 -30Q-26 -14 -30 -2Z',gold,'#a07010',3)}${C(-5,6,5,'#6a4a20')}${L('M-5 -50V-70','#6a4a20',3)}${L('M24 -40Q40 -34 36 -22M30 -52Q52 -44 48 -26','#a08040',3)}`;
const amboss=()=>`${sch(60)}${R(-44,-44,88,44,holz,dk,3)}${P('M-72 -100H52V-86H34Q30 -70 38 -60V-44H-38V-60Q-30 -70 -34 -86H-50Q-68 -90 -72 -100Z','#5a5a68','#202028',3)}${L('M-60 -97H46','#a8a8b8',3)}${R(-14,-108,34,8,'#ff7030')}${R(-12,-112,22,5,'#ffb060')}`;
const balg=()=>`${sch(60)}${R(-50,-40,10,40,'#5a3a1c')}${R(40,-40,10,40,'#5a3a1c')}${R(-56,-50,112,12,holz,dk,3)}${P('M-46 -50L-30 -104H30L46 -50Z','#7a5230',dk,3)}${L('M-42 -62H42M-36 -78H36M-32 -92H32','#3a2410',3)}${P('M-30 -104L-24 -116H24L30 -104Z','#a0703a',dk,2)}${L('M-24 -116V-150M24 -116V-150M-24 -150H24','#5a3a1c',6)}${L('M46 -62L88 -44','#4a4a52',9)}${E(90,-43,6,4,'#ff9a30')}`;
const hufw=()=>`${R(-90,-60,180,120,'#5a3a1c','#2a1808',5)}${L('M-90 0H90','#3a2410',3)}${[-60,0,60].map(x=>[-34,26].map(y=>L(`M${x-10} ${y+14}V${y}Q${x-10} ${y-14} ${x} ${y-14}Q${x+10} ${y-14} ${x+10} ${y}V${y+14}`,'#b8b8c4',6)+C(x,y-18,3,'#3a3a40')).join('')).join('')}`;
const zuber=()=>`${sch(60)}${P('M-50 0L-56 -60H56L50 0Z','#a0703a',dk,3)}${E(0,-60,56,10,'#6ac0e8',dk,2)}${L('M-54 -18H54M-56 -42H56','#3a3a40',5)}${L('M-14 -70Q-22 -84 -12 -94T-14 -112M16 -70Q24 -84 14 -92','rgba(255,255,255,.7)',3)}`;
const werkz=()=>`${R(-80,-60,160,120,holz,dk,5)}${L('M-80 4H80','#6a4a28',3)}${L('M-52 -44V-4','#a0703e',7)}${R(-70,-50,36,14,'#8a9098','#4a5058',2)}${L('M-14 -48L-4 -4M-4 -48L6 -4','#8a9098',6)}${L('M-14 -48L-4 -48','#4a5058',3)}${L('M24 -50V-6','#a0703e',6)}${P('M14 -52H34V-40H14Z','#5a5a68','#2a2a38',2)}${P('M50 -50L62 -4L54 -4L46 -50Z','#8a9098','#4a5058',2)}${P('M-60 20H60V32H-60Z','#a0a0a8','#5a5a68',2)}${L('M-46 20V32M-26 20V32M-6 20V32M14 20V32M34 20V32M54 20V32','#3a3a48',2)}`;
const zunft=()=>`${L('M-70 -96H34','#3a3a40',7)}${L('M-70 -96V-70','#3a3a40',5)}${L('M-30 -94L-30 -56M30 -94L30 -56','#3a3a40',3)}${R(-48,-56,96,90,'#e8d098',dk,4)}${L('M-14 22V4Q-14 -14 0 -14Q14 -14 14 4V22','#6a6a78',8)}${L('M-30 -32L30 -32','#7a4a1c',7)}${R(-8,-44,16,26,'#5a3a1c')}${P('M-20 -46H20V-34H-20Z','#5a5a68','#2a2a38',2)}`;
const kohle=()=>`${sch(52)}${P('M-46 -50H46L36 0H-36Z','#8a6a3a','#4a2a10',3)}${L('M-42 -34H42M-38 -18H38','#5a3a1c',3)}${[[-30,-62],[0,-70],[28,-62],[-12,-56],[14,-54]].map(([x,y],k)=>P(`M${x-14} ${y+6}L${x-8} ${y-12}L${x+8} ${y-14}L${x+16} ${y+4}L${x} ${y+12}Z`,k%2?'#2a2a34':'#3a3a46','#16161c',2)).join('')}${L('M-18 -74l6 -4M10 -78l4 -6','#8a8a98',2)}`;
const schleif=()=>`${sch(56)}${L('M-40 0L-30 -70M40 0L30 -70','#7a5230',8)}${R(-46,-8,92,8,'#5a3a1c')}${C(0,-70,40,'#9a9aa8','#3a3a48',4)}${C(0,-70,12,'#6a6a78','#3a3a48',2)}${L('M0 -70H-30M0 -70L18 -48','#7a7a88',3)}${L('M0 -70H64','#4a4a52',4)}${C(66,-70,6,'#a0703e')}${L('M64 -70V-90','#a0703e',6)}${E(0,-4,30,7,'#6ac0e8')}`;
const banner=()=>`${R(-50,-82,100,8,'#8a6238',dk,2)}${C(-50,-78,5,gold)}${C(50,-78,5,gold)}${P('M-44 -74H44V74L0 52L-44 74Z','#c0303a','#6a1a20',3)}${U('msglocke',-20,-44,40,gold)}${L('M-36 -62H36','#f2c14e',3)}${L('M-30 40H30','#f2c14e',3)}${L('M-30 22l10 -8l10 8l10 -8l10 8','#f2c14e',3)}`;
const pult=()=>`${sch(60)}${R(-8,-60,16,60,'#7a5230',dk,2)}${R(-40,-8,80,10,'#7a5230',dk,2)}${P('M-56 -64L56 -64L48 -96L-48 -96Z','#a0703a',dk,3)}${P('M-40 -68L36 -68L30 -92L-34 -92Z','#f6ecc8','#7a5a2a',2)}${L('M-26 -80H18M-24 -74H12','#8a7a60',2)}${R(36,-84,16,16,'#2a2a34','#101018',2)}${P('M44 -86Q62 -120 80 -128Q74 -102 52 -86Z','#f6f0f0','#8a7a90',2)}`;
const stempel=()=>`${sch(60)}${R(-56,-50,112,10,'#a0703a',dk,3)}${R(-48,-40,8,40,'#7a5230')}${R(40,-40,8,40,'#7a5230')}${P('M-40 -52H4L8 -58H-36Z','#f6ecc8','#7a5a2a',2)}${C(-10,-60,6,'#c0303a','#6a1a20',2)}${R(26,-62,12,12,'#5a3a1c')}${R(24,-92,16,30,'#a0703a',dk,2)}${C(32,-96,12,'#c0303a','#6a1a20',3)}${C(-10,-62,10,'#c0303a','#6a1a20',2)}`;
const urne=()=>`${sch(50)}${R(-40,-76,80,76,'#a0703a',dk,4)}${R(-46,-86,92,14,'#8a5a30',dk,3)}${R(-20,-80,40,5,'#2a1808')}${P('M-12 -96L0 -110L12 -96Z','#f6ecc8','#7a5a2a',2)}${R(-40,-50,80,6,gold)}${U('mssiegel',-14,-36,28,'#c0303a')}`;
const leuchter=()=>`${C(0,-190,70,'url(#licht)')}${sch(40)}${R(-24,-8,48,10,'#a07a30','#5a4010',2)}${R(-5,-160,10,152,'#c89a40','#7a5a20',2)}${L('M0 -150Q-40 -150 -40 -176M0 -150Q40 -150 40 -176','#c89a40',5)}${[[-40,-176],[0,-190],[40,-176]].map(([x,y])=>R(x-6,y,12,36,'#fff6e0','#a89878',2)+P(`M${x} ${y-24}Q${x-9} ${y-8} ${x} ${y-2}Q${x+9} ${y-8} ${x} ${y-24}Z`,'#ffb030')).join('')}`;
const chronik=()=>`${sch(44)}${R(-6,-80,12,80,'#7a5230',dk,2)}${L('M-30 0L0 -20L30 0','#5a3a1c',6)}${P('M-54 -96H54L40 -128H-40Z','#7a5230',dk,3)}${P('M-48 -100L0 -100L0 -132L-38 -126Z','#fffbe8','#7a5a2a',2)}${P('M2 -100L48 -100L38 -126L2 -132Z','#fffbe8','#7a5a2a',2)}${L('M-38 -118H-8M-38 -110H-8M10 -118H34M10 -110H34','#8a7a60',2)}${R(-4,-100,8,6,'#c0303a')}`;
const standuhr=()=>`${sch(40)}${R(-34,-230,68,230,'#7a4a28',dk,4)}${R(-42,-240,84,14,'#5a3418',dk,3)}${R(-40,-14,80,14,'#5a3418',dk,3)}${C(0,-190,24,'#fffbe8','#5a4a3a',3)}${L('M0 -190V-206M0 -190L12 -184','#222',3)}${R(-20,-150,40,110,'#5a3418','#2a1808',2)}${L('M0 -146V-86','#c8a040',3)}${C(0,-80,12,gold,'#a07010',2)}`;
const urkunde=()=>`${R(-60,-62,120,124,holz,dk,5)}${P('M-46 -50H46V44Q30 52 14 44T-18 44T-46 44Z','#f6ecc8','#7a5a2a',3)}${L('M-32 -34H30M-32 -18H18M-32 -2H30','#6a5a40',3)}${C(14,28,12,'#c0303a','#6a1a20',2)}${P('M6 36L2 54L12 46L20 54L20 36Z','#c0303a')}${U('msfeder',20,-44,34,'#4a4a6a')}`;
const werk=()=>`${R(-70,-60,140,120,'#5a3a1c',dk,5)}${[[-26,-16,38,16],[34,22,26,13]].map(([x,y,r,n])=>C(x,y,r,'#a8a8b8','#3a3a48',3)+`<circle cx="${x}" cy="${y}" r="${r+6}" fill="none" stroke="#a8a8b8" stroke-width="8" stroke-dasharray="${n} ${n*.9}"/>`+L(`M${x-r} ${y}H${x+r}M${x} ${y-r}V${y+r}`,'#3a3a48',4)+C(x,y,6,gold,'#a07010',2)).join('')}${L('M-56 -48V-20','#c8a040',3)}${C(-56,-18,6,gold)}`;
const glocke=()=>`${sch(70)}${R(-84,-210,14,210,holz,dk,3)}${R(70,-210,14,210,holz,dk,3)}${R(-94,-224,188,18,'#7a4a28',dk,3)}${L('M-70 -190L-40 -206M70 -190L40 -206','#5a3418',6)}${P('M-46 -60H46Q40 -76 40 -100Q40 -150 0 -154Q-40 -150 -40 -100Q-40 -76 -46 -60Z',gold,'#a07010',4)}${L('M-40 -100H40','#c89a20',4)}${C(0,-52,8,'#6a4a20')}${L('M0 -154V-206','#6a4a20',6)}${L('M52 -104Q64 -90 56 -78','#fff6c8',3)}`;
const winde=()=>`${sch(70)}${R(-70,-100,12,100,holz,dk,2)}${R(58,-100,12,100,holz,dk,2)}${L('M-70 -92H70','#5a3418',4)}${R(-58,-84,116,40,'#a0703a',dk,3)}${L('M-40 -84V-44M-20 -84V-44M0 -84V-44M20 -84V-44M40 -84V-44','#6a4a28',3)}${L('M58 -64H90L96 -92','#4a4a52',5)}${C(96,-96,6,'#a0703e')}${L('M-20 -44V-14','#c8a868',5)}${R(-34,-14,28,16,'#a0703a',dk,2)}`;
const taubenhaus=()=>`${sch(24)}${R(-6,-100,12,100,'#7a5230',dk,2)}${R(-44,-180,88,84,'#e8d0a8','#5a3a1c',3)}${P('M-54 -180L0 -216L54 -180Z','#c0504a','#6a2a20',3)}${[[-22,-156],[22,-156],[-22,-122],[22,-122]].map(([x,y])=>C(x,y,9,'#3a2418')).join('')}${R(-34,-110,68,5,'#7a5230')}${E(-22,-122,9,6,'#fff','#9ab',1.5)}${E(30,-166,12,8,'#fff','#9ab',1.5)}${C(22,-160,6,'#fff','#9ab',1.5)}${P('M18 -160l-6 2l6 2Z',gold)}`;
const sonnenuhr=()=>`${sch(50)}${P('M-22 0L-14 -60H14L22 0Z','#a8a498','#4a4640',3)}${E(0,-64,56,16,'#c8c4b8','#4a4640',3)}${E(0,-64,44,11,'#e8e4d4','#6a665a',2)}${L('M0 -64V-50M-30 -64L-38 -58M30 -64L38 -58M-14 -72L-20 -78M14 -72L20 -78','#4a4640',2)}${P('M0 -64L-6 -64L0 -92Z','#3a3a40')}`;
const fernrohr=()=>`${sch(60)}${L('M0 -74L-34 0M0 -74L34 0M0 -74V0','#7a5230',6)}${C(0,-76,8,'#3a3a40')}${P('M-52 -92L-40 -106L42 -140L50 -124Z','#a0703a',dk,3)}${P('M38 -140L46 -158L60 -150L50 -124Z','#c89a40','#7a5a20',3)}${L('M-24 -102L-16 -116','#c89a40',5)}${C(-48,-100,7,'#4a4a52')}`;
const gemaelde=()=>`${R(-84,-58,168,116,'#7a4a28',dk,6)}${R(-74,-48,148,96,'url(#himmel)')}${P('M-74 30Q-30 6 0 20T74 10V48H-74Z','#8ab870')}${haus(-62,-6,26,36,'#e8d0b0','#c0504a')}${haus(-24,-12,30,40,'#f0d8a8','#4a7a9a')}${haus(20,-4,26,34,'#d8e0c0','#c0504a')}${R(52,-20,12,50,'#9a9080','#3a3630',1.5)}${P('M49 -20L58 -34L67 -20Z','#5a7ac8')}${C(-52,-32,8,'#fff6c8')}`;
const fahne=()=>`${sch(30)}${R(-5,-210,10,210,'#3a3a40')}${C(0,-214,7,gold)}${P('M0 -200L-6 -200L-6 -184L-52 -184L-68 -168L-52 -152L-6 -152L-6 -140L6 -140L6 -200Z','#4a4a52','#202028',2)}${P('M6 -180L58 -180L44 -166L58 -152L6 -152Z','#c0303a','#6a1a20',2)}${R(-24,-8,48,8,'#5a5a68','#3a3a48',2)}${L('M-18 -100l6 -4M16 -80l6 -4','#fff6c8',2)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #fl{transform:scaleX(.14)}.tuer.offen #fr{transform:scaleX(.14)}.tuer.offen #gi{transform:scaleY(.1);transition-delay:.8s}.tuer.offen #kl{transform:scaleY(.1)}.tuer.offen #ek{transform:scaleX(.14)}.tuer.offen #sl{transform:scaleX(.14);transition-delay:.8s}.tuer.offen #sr{transform:scaleX(.14);transition-delay:.8s}.tuer.offen #sg{transform:translateY(70px);opacity:0}.tuer.offen #lk{transform:scaleY(.1)}.tuer .ob{opacity:0}.tuer.offen .ob{opacity:1}</style>`;
function tuerTor(n){
let g='',h='';for(let k=0;k<6;k++)g+=`M${422+k*30} 190V470`;for(let k=0;k<5;k++)h+=`M410 ${222+k*50}H590`;
const fl=(x,o)=>R(x,190,90,280,holz,dk,4)+L(`M${x+30} 190V470M${x+60} 190V470`,'#5a3a18',3)+L(`M${x} 250H${x+90}M${x} 420H${x+90}`,'#3a3a40',9)+C(x+(o?78:12),330,7,'#3a3a40')+[0,1,2].map(k=>C(x+(o?12:78),250+k*85,3,'#9a9aa8')).join('');
return`${P('M366 470V230Q366 150 500 150Q634 150 634 230V470Z','#8a8478','#3a3630',5)}${L('M380 200Q500 130 620 200','#6a6458',4)}${R(410,190,180,280,'#ffd890')}${C(500,330,130,'url(#licht)')}${P('M410 410Q470 370 500 388T590 380V470H410Z','#b89868')}${haus(422,290,60,130,'#e8c898','#c0504a')}${haus(512,310,64,110,'#f0d8a8','#4a7a9a')}
   <g id="gi" class="tb" style="transform-origin:500px 190px">${L(g+h,'#3a3a40',6)}</g>
   <g id="fl" class="tb" style="transform-origin:410px 330px">${fl(410,0)}</g>
   <g id="fr" class="tb" style="transform-origin:590px 330px">${fl(500,1)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerStand(n){
let a='';for(let k=0;k<6;k++)a+=P(`M${372+k*43} 150H${415+k*43}V190Q${393.5+k*43} 208 ${372+k*43} 190Z`,k%2?'#fff':'#d8403a','#7a2a20',2);
return`${R(410,190,180,250,'#ffe8b0')}${C(500,320,130,'url(#licht)')}${P('M410 440L470 380H530L590 440Z','#d8b888')}${haus(418,290,74,150,'#e8d0b0','#8a4a3a')}${haus(512,320,68,120,'#d8e0c0','#5a6a8a')}
   <g id="kl" class="tb" style="transform-origin:500px 190px">${R(410,190,180,250,'#9a6a3a',dk,4)}${L('M410 250H590M410 310H590M410 370H590','#6a4a28',3)}${R(420,200,160,40,'#e8d098','#5a3a1c',2)}${C(450,220,9,gold,'#a07010',2)}${C(480,220,9,gold,'#a07010',2)}${C(510,220,9,gold,'#a07010',2)}</g>
   ${R(396,440,208,30,'#a0703a',dk,3)}${C(430,432,10,'#e74c3c')}${C(452,434,9,'#7ad06a')}${C(560,432,10,'#e8a030')}${R(376,190,22,280,holz,dk,3)}${R(602,190,22,280,holz,dk,3)}${a}${R(372,146,256,6,dk)}
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerEsse(n){
let b='';for(let k=0;k<8;k++){b+=`M360 ${170+k*38}H640`;for(let j=0;j<7;j++)b+=`M${372+j*38+(k%2)*19} ${170+k*38}v38`;}
return`${R(472,20,56,70,'#6a5a58','#2a2220',3)}${P('M348 162L500 80L652 162Z','#5a4a48','#2a2220',4)}${P('M360 470V230Q360 150 500 150Q640 150 640 230V470Z','#8a5a4a','#3a2018',5)}${L(b,'rgba(40,20,10,.35)',2)}${R(410,190,180,280,'#14100e')}${P('M410 190H590L550 240V420L590 470H410L450 420V240Z','#2a201c')}${R(450,240,100,180,'#ffb860')}${C(500,330,140,'url(#licht)')}${[432,562,470,532].map((x,k)=>C(x,452+k%2*6,5,'#ff6a20')).join('')}
   <g id="ek" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#3a3a40','#16161a',4)}${L('M410 250H590M410 410H590','#2a2a30',10)}${[0,1,2,3].map(k=>C(424,208+k*80,4,'#8a8a98')+C(576,208+k*80,4,'#8a8a98')).join('')}${L('M424 200V460M576 200V460','#c04a20',2)}${C(560,330,9,'none','#a8a8b8',4)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerRat(n){
const fl=(x,o)=>R(x,190,90,280,holz,dk,4)+R(x+8,200,74,110,'none','#5a3a18',4)+R(x+8,324,74,138,'none','#5a3a18',4)+C(x+(o?78:12),330,6,gold);
return`${P('M362 470V220Q362 136 500 136Q638 136 638 220V470Z','#a89a8a','#4a3a30',5)}${L('M376 220Q376 150 500 150Q624 150 624 220','#f2c14e',4)}${R(410,190,180,280,'#fff0c0')}${C(500,330,130,'url(#licht)')}${R(450,230,100,190,'#ffe8a0')}${P('M410 470L450 420H550L590 470Z','#c89a60')}${C(500,260,12,'#f2a030')}${L('M500 190V248','#5a3a1c',3)}
   <g id="sl" class="tb" style="transform-origin:410px 330px">${fl(410,0)}</g>
   <g id="sr" class="tb" style="transform-origin:590px 330px">${fl(500,1)}</g>
   <g id="sg" class="tb">${P('M500 300Q532 296 530 330Q534 366 500 360Q466 366 470 330Q468 296 500 300Z','#c0303a','#6a1a20',3)}${U('msglocke',486,314,28,'#f6c8c8')}${P('M488 358L480 392L496 380L500 396L504 380L520 392L512 358Z','#a0202a')}</g>
   <g class="tb pl">${sPl(n,430)}</g>`;
}
function tuerTurm(n){
let s='';for(let k=0;k<7;k++)s+=R(450-k*5,200+k*38,100+k*10,34,k%2?'#c89a60':'#b88a50','#5a3a1c',2)+L(`M${452-k*5} ${204+k*38}H${548+k*5}`,'#e8c890',2);
return`${R(370,150,260,320,'#5a3a1c','#2a1808',5)}${R(410,190,180,280,'#2a2a4a')}${R(410,190,180,70,'#ffd890')}${C(500,200,130,'url(#licht)')}${R(410,340,180,130,'#7a4a28',dk,3)}${L('M410 400H590M450 340V470M500 340V470M550 340V470','#5a3a18',3)}
   <g class="tb ob">${R(410,190,180,280,'#2a2a4a')}${R(410,190,180,60,'#ffd890')}${C(500,210,130,'url(#licht)')}${s}</g>
   <g id="lk" class="tb" style="transform-origin:500px 190px">${R(410,190,180,150,holz,dk,4)}${L('M440 190V340M470 190V340M500 190V340M530 190V340M560 190V340','#5a3a18',3)}${L('M410 215H590M410 315H590','#3a3a40',8)}${C(500,300,8,'none','#3a3a40',3)}</g>
   <g class="tb pl">${sPl(n,410)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'fallgitter';
const arten={fallgitter:[tuerTor,'Stadttor mit Fallgitter und Zahlenschloss'],klappe:[tuerStand,'Marktstand mit Klappe und Zahlenschloss'],esse:[tuerEsse,'Esse mit Rußklappe und Zahlenschloss'],siegel:[tuerRat,'Rathaustür mit Siegel und Zahlenschloss'],treppe:[tuerTurm,'Turmluke mit Treppe und Zahlenschloss']};
const a=arten[art]||arten.fallgitter;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.mittelalterstadt={
name:"Die Mittelalterliche Stadt",
symbole:["msglocke","msmuenze","mshufeisen2","msfeder","mssiegel"],
symbolNamen:["Glocke","Münze","Hufeisen","Feder","Siegel"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect x="8" y="48" width="104" height="34" fill="#a89e90" stroke="#4a4036" stroke-width="3"/>${[0,1,2,3,4].map(k=>`<rect x="${10+k*21}" y="40" width="12" height="10" fill="#a89e90" stroke="#4a4036" stroke-width="2"/>`).join('')}<rect x="44" y="14" width="32" height="68" fill="#b8ae9e" stroke="#4a4036" stroke-width="3"/><path d="M38 16L60 -2L82 16Z" fill="#c0504a" stroke="#6a2a20" stroke-width="3"/><path d="M52 82V62Q60 52 68 62V82Z" fill="#5a3a1c"/><use href="#sym-msglocke" x="48" y="24" width="24" height="24" color="#f2a81e"/></svg>`,
texte:{
einleitung:"Ihr besucht ein Stadtfest im Mittelalter. Überall duftet es nach Brot und Äpfeln. Da läutet die Abendglocke, und der freundliche Torwächter schließt alle Tore. Die Stadtschreiberin lächelt und ruft: Ich habe ein Rätselspiel für euch! Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände in der Stadt. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, kommt auf den Turm und läutet die Festglocke. Schafft ihr es?",
startKnopf:"In die Stadt gehen",
hinweisGeber:"Die Stadtschreiberin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Stadtschreiberin schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Nacht bricht an!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Festglocke trotzdem noch läuten!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und die Festglocke geläutet. Die Stadtschreiberin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du besuchst ein Stadtfest im Mittelalter. Überall duftet es nach Brot und Äpfeln. Da läutet die Abendglocke, und der freundliche Torwächter schließt alle Tore. Die Stadtschreiberin lächelt und ruft: Ich habe ein Rätselspiel für dich! Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände in der Stadt. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, kommt auf den Turm und läutet die Festglocke. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Stadtschreiberin schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Festglocke trotzdem noch läuten!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und die Festglocke geläutet. Die Stadtschreiberin ist stolz auf dich!"
},
einfach:{
name:"Die Mittelalterliche Stadt",
symbolNamen:["Glocke","Münze","Hufeisen","Feder","Siegel"],
texte:{
einleitung:"Ihr seid auf einem Stadtfest. Es ist früher als heute. Am Abend läutet die Glocke. Der Torwächter macht alle Tore zu. Die Stadtschreiberin sagt: Öffnet alle Zahlenschlösser. Dann dürft ihr auf den Turm. Dort läutet ihr die Festglocke. Für jede richtige Aufgabe bekommt ihr eine Zahl. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Nacht bricht an!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und die Festglocke geläutet. Die Stadtschreiberin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du bist auf einem Stadtfest. Es ist früher als heute. Am Abend läutet die Glocke. Der Torwächter macht alle Tore zu. Die Stadtschreiberin sagt: Öffne alle Zahlenschlösser. Dann darfst du auf den Turm. Dort läutest du die Festglocke. Für jede richtige Aufgabe bekommst du eine Zahl. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und die Festglocke geläutet. Die Stadtschreiberin ist stolz auf dich!"
},
raeume:[
{titel:"Das Stadttor",intro:"Ihr steht vor dem großen Stadttor. Es ist Abend. Findet die Zahlen für das Tor!",introDu:"Du stehst vor dem großen Stadttor. Es ist Abend. Finde die Zahlen für das Tor!",
objekte:[{name:"Tor-Tafel",fund:"An der Tafel klebt:"},{name:"Stadt-Wappen",fund:"Am Wappen klebt:"},{name:"Wasser-Fass",fund:"Im Fass liegt:"},{name:"Wagen-Rad",fund:"Am Rad klebt:"},{name:"Holz-Bank",fund:"Auf der Bank liegt:"}],
infoObjekte:[{name:"Stadt-Plan",fund:"Am Plan klebt:"},{name:"Fackel",fund:"An der Fackel klebt:"},{name:"Ketten-Pfosten",fund:"An der Kette hängt:"}]},
{titel:"Der Marktplatz",intro:"Auf dem Markt ist viel los. Es gibt Obst, Brot und Stoffe. Ein Marktstand versperrt den Weg.",
objekte:[{name:"Waage",fund:"Unter der Waage liegt:"},{name:"Obst-Korb",fund:"Im Korb liegt:"},{name:"Preis-Tafel",fund:"An der Tafel klebt:"},{name:"Brunnen",fund:"Im Brunnen liegt:"},{name:"Münz-Truhe",fund:"In der Truhe liegt:"}],
infoObjekte:[{name:"Markt-Glocke",fund:"An der Glocke klebt:"},{name:"Stoff-Rollen",fund:"Bei den Stoffen liegt:"},{name:"Brot-Stand",fund:"Beim Brot liegt:"}]},
{titel:"Die Schmiede",intro:"In der Schmiede ist es warm. Das Feuer glüht rot. Die Klappe an der Esse ist noch zu.",
objekte:[{name:"Amboss",fund:"Am Amboss klebt:"},{name:"Blase-Balg",fund:"Am Balg klebt:"},{name:"Hufeisen-Wand",fund:"Am Hufeisen klebt:"},{name:"Wasser-Zuber",fund:"Im Zuber liegt:"},{name:"Werkzeug-Brett",fund:"Am Brett klebt:"}],
infoObjekte:[{name:"Zunft-Schild",fund:"Am Schild klebt:"},{name:"Kohle-Korb",fund:"Bei der Kohle liegt:"},{name:"Schleif-Stein",fund:"Am Stein klebt:"}]},
{titel:"Das Rathaus",intro:"Im Rathaus ist es schön ruhig. Hier arbeiten die Ratsleute. Auf der Tür klebt ein rotes Siegel.",
objekte:[{name:"Rats-Fahne",fund:"An der Fahne klebt:"},{name:"Schreib-Pult",fund:"Am Pult liegt:"},{name:"Stempel-Tisch",fund:"Am Stempel klebt:"},{name:"Wahl-Kasten",fund:"Im Kasten liegt:"},{name:"Kerzen-Ständer",fund:"An der Kerze klebt:"}],
infoObjekte:[{name:"Schrift-Rolle",fund:"An der Rolle klebt:"},{name:"Stadt-Buch",fund:"Im Buch liegt:"},{name:"Stand-Uhr",fund:"An der Uhr klebt:"}]},
{titel:"Der Glockenturm",intro:"Ihr seid ganz oben im Turm. Ihr seht die ganze Stadt. Öffnet die Luke und läutet die Glocke!",introDu:"Du bist ganz oben im Turm. Du siehst die ganze Stadt. Öffne die Luke und läute die Glocke!",
objekte:[{name:"Uhr-Werk",fund:"Am Uhrwerk klebt:"},{name:"Große Glocke",fund:"An der Glocke klebt:"},{name:"Seil-Winde",fund:"An der Winde klebt:"},{name:"Tauben-Haus",fund:"Im Taubenhaus liegt:"},{name:"Sonnen-Uhr",fund:"An der Uhr klebt:"}],
infoObjekte:[{name:"Stadt-Bild",fund:"Hinter dem Bild klebt:"},{name:"Fern-Rohr",fund:"Am Fernrohr klebt:"},{name:"Wind-Fahne",fund:"An der Fahne klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Stadttor",
intro:"Die Abendsonne scheint auf die hohe Stadtmauer. Hinter den Zinnen schauen die Fachwerkhäuser hervor. Das große Holztor mit dem Fallgitter ist zu. Findet die Ziffern, um es zu öffnen!",
introDu:"Die Abendsonne scheint auf die hohe Stadtmauer. Hinter den Zinnen schauen die Fachwerkhäuser hervor. Das große Holztor mit dem Fallgitter ist zu. Finde die Ziffern, um es zu öffnen!",
tuerX:1300,tuerArt:"fallgitter",
hintergrund:()=>`${defs('#9a8a6e','#6a5a46','#ffb060')}${R(0,0,1600,470,'url(#abM)')}${C(280,250,44,'#fff0b0')}${C(280,250,150,'url(#licht)')}${[[60,70],[420,40],[980,60],[1450,90]].map(([x,y])=>E(x,y,70,16,'rgba(255,255,255,.55)')).join('')}${[[140,50,110,140,'#e8c898','#c0504a'],[420,70,90,130,'#f0d8a8','#4a7a9a'],[620,40,120,160,'#d8c8a8','#c0504a'],[880,60,100,140,'#e8d0b0','#8a4a3a'],[1120,50,100,150,'#f0d8a8','#c0504a'],[1440,70,110,130,'#e8c898','#4a7a9a']].map(([x,y,w,h,f,r])=>haus(x,y,w,h,f,r)).join('')}${mauer(170,300,'#a89e90')}${[...Array(20)].map((_,k)=>R(k*84+10,138,48,34,'#a89e90','#4a4036',2)).join('')}${R(0,166,1600,8,'#8a8070','#4a4036',2)}${R(20,30,120,440,'#9a9080','#4a4036',4)}${P('M6 34L80 -34L154 34Z','#c0504a','#6a2a20',4)}${R(62,120,36,60,'#ffd890','#4a4036',3)}${[1500].map(x=>R(x,10,100,460,'#9a9080','#4a4036',4)+P(`M${x-14} 14L${x+50} -50L${x+114} 14Z`,'#5a7ac8','#2a3a7a',4)+R(x+32,110,36,60,'#ffd890','#4a4036',3)).join('')}${boden(0)}`,
objekte:[
{name:"Torwächter-Tafel",x:300,y:240,wand:true,by:-105,zeichne:tafelw,fund:"An der Tafel klebt:"},
{name:"Stadtwappen",x:700,y:250,wand:true,by:-78,zeichne:wappen1,fund:"Am Wappen klebt:"},
{name:"Wasserfass",x:150,boden:690,fuss:4,by:-100,zeichne:fass,fund:"Im Fass liegt:"},
{name:"Wagenrad",x:520,boden:700,fuss:4,by:-135,zeichne:rad,fund:"Am Wagenrad klebt:"},
{name:"Holzbank",x:850,boden:730,fuss:4,by:-100,zeichne:bank,fund:"Auf der Bank liegt:"}
],
infoObjekte:[{name:"Stadtplan",x:1000,y:250,wand:true,by:-70,zeichne:plan,fund:"Am Stadtplan klebt:"},{name:"Fackelpfosten",x:1000,boden:620,fuss:4,by:-240,zeichne:fackel,fund:"Am Pfosten klebt:"},{name:"Pfostenkette",x:1450,boden:740,fuss:4,by:-80,zeichne:kette,fund:"An der Kette hängt:"}]},
{titel:"Der Marktplatz",
intro:"Auf dem Marktplatz duftet es nach frischem Brot. Bunte Planen schmücken die Stände, und ein Brunnen plätschert. Ein Marktstand versperrt die Gasse. Findet die Ziffern für sein Schloss!",
introDu:"Auf dem Marktplatz duftet es nach frischem Brot. Bunte Planen schmücken die Stände, und ein Brunnen plätschert. Ein Marktstand versperrt die Gasse. Finde die Ziffern für sein Schloss!",
tuerX:500,tuerArt:"klappe",
hintergrund:()=>`${defs('#b0a490','#7a6e5c','#fff0c0')}${R(0,0,1600,470,'url(#himmel)')}${[[200,60],[700,40],[1300,70]].map(([x,y])=>E(x,y,80,18,'#fff')).join('')}${[[60,120,300,350,'#f0e0c0','#c0504a'],[400,200,160,270,'#e8d0b0','#5a7aa8'],[620,150,200,320,'#f4e4c4','#8a4a3a'],[900,110,300,360,'#e8d8b8','#c0504a'],[1230,170,170,300,'#f0d8a8','#4a7a9a'],[1420,130,180,340,'#e8d0b0','#c0504a']].map(([x,y,w,h,f,r])=>haus(x,y,w,h,f,r)).join('')}${L('M0 60Q200 110 400 60T800 60T1200 60T1600 60','#5a3a24',3)}${[...Array(16)].map((_,k)=>P(`M${k*100+10} ${70+(k%2)*8}h30l-15 30Z`,['#d8403a','#f2c14e','#2e6ac8','#fff'][k%4],'#555',1)).join('')}${[[700,'#2e9ac8'],[1320,'#d8403a']].map(([x,c])=>R(x,340,150,130,'#e8d098','#5a3a1c',3)+[0,1,2,3,4].map(k=>P(`M${x+k*30} 330H${x+k*30+30}V350Q${x+k*30+15} 366 ${x+k*30} 350Z`,k%2?'#fff':c,'#444',2)).join('')+R(x-4,326,158,8,'#5a3a1c')).join('')}${boden(1)}`,
objekte:[
{name:"Marktwaage",x:750,boden:650,fuss:4,by:-160,zeichne:waage,fund:"Unter der Waage liegt:"},
{name:"Obstkorb",x:150,boden:740,fuss:4,by:-95,zeichne:korb,fund:"Im Obstkorb liegt:"},
{name:"Preisschild-Tafel",x:220,y:250,wand:true,by:-80,zeichne:preis,fund:"An der Tafel klebt:"},
{name:"Marktbrunnen",x:1250,boden:700,fuss:4,by:-190,zeichne:brunnen,fund:"Im Brunnen liegt:"},
{name:"Münztruhe",x:1450,boden:600,fuss:4,by:-125,zeichne:truhe,fund:"In der Truhe liegt:"}
],
infoObjekte:[{name:"Marktglocke",x:1050,y:250,wand:true,by:-85,zeichne:markglocke,fund:"An der Glocke klebt:"},{name:"Tuchballen",x:330,boden:640,fuss:4,by:-78,zeichne:tuch,fund:"Zwischen den Tüchern liegt:"},{name:"Brotstand",x:950,boden:740,fuss:4,by:-165,zeichne:brotstand,fund:"Beim Brot liegt:"}]},
{titel:"Die Schmiede",
intro:"In der Schmiede glüht das Feuer rot, und das dunkle Gebälk knarrt leise. Die Rußklappe an der großen Esse ist verschlossen. Findet die Ziffern, um sie zu öffnen!",
introDu:"In der Schmiede glüht das Feuer rot, und das dunkle Gebälk knarrt leise. Die Rußklappe an der großen Esse ist verschlossen. Finde die Ziffern, um sie zu öffnen!",
tuerX:900,tuerArt:"esse",
hintergrund:()=>`${defs('#5a4a40','#241a14','#ff7a30')}${R(0,0,1600,470,'#3a2e28')}${mauer(240,230,'#5e4c44')}${[...Array(11)].map((_,k)=>R(k*150,0,150,26,'#2a1a10','#14100a',2)).join('')}${[20,460,1130,1560].map(x=>R(x,0,34,470,'#2a1a10','#14100a',3)).join('')}${R(0,226,1600,16,'#2a1a10')}${[[300,120],[1250,130]].map(([x,y])=>R(x-34,y-28,68,56,'#14202a','#2a1a10',6)+C(x,y,8,'#ffe8a0')).join('')}${C(900,360,560,'url(#licht)')}${C(300,470,200,'url(#licht)')}${boden(3)}${E(900,740,300,40,'rgba(255,90,20,.18)')}`,
objekte:[
{name:"Amboss",x:700,boden:680,fuss:4,by:-135,zeichne:amboss,fund:"Am Amboss klebt:"},
{name:"Blasebalg",x:1100,boden:640,fuss:4,by:-165,zeichne:balg,fund:"Am Blasebalg klebt:"},
{name:"Hufeisenwand",x:250,y:250,wand:true,by:-75,zeichne:hufw,fund:"Am Hufeisen klebt:"},
{name:"Wasserzuber",x:150,boden:740,fuss:4,by:-125,zeichne:zuber,fund:"Im Zuber liegt:"},
{name:"Werkzeugbrett",x:600,y:250,wand:true,by:-75,zeichne:werkz,fund:"Am Brett klebt:"}
],
infoObjekte:[{name:"Zunftzeichen-Tafel",x:1300,y:240,wand:true,by:-105,zeichne:zunft,fund:"Am Schild klebt:"},{name:"Kohlekorb",x:1450,boden:720,fuss:4,by:-90,zeichne:kohle,fund:"Bei der Kohle liegt:"},{name:"Schleifstein",x:420,boden:730,fuss:4,by:-112,zeichne:schleif,fund:"Am Schleifstein klebt:"}]},
{titel:"Das Rathaus",
intro:"Im Rathaus ist es feierlich still. Warmes Kerzenlicht fällt auf die hohe Holzhalle, und an den Wänden hängen die Fahnen der Stadt. Auf der Doppeltür klebt ein großes rotes Siegel. Findet die Ziffern, um die Tür zu öffnen!",
introDu:"Im Rathaus ist es feierlich still. Warmes Kerzenlicht fällt auf die hohe Holzhalle, und an den Wänden hängen die Fahnen der Stadt. Auf der Doppeltür klebt ein großes rotes Siegel. Finde die Ziffern, um die Tür zu öffnen!",
tuerX:400,tuerArt:"siegel",
hintergrund:()=>`${defs('#9a6a3a','#4a2a14','#ffd890')}${R(0,0,1600,470,'#7a4a28')}${[...Array(16)].map((_,k)=>R(k*100,40,100,430,k%2?'#744426':'#7e4e2c','#5a3418',2)).join('')}${R(0,300,1600,170,'#5a3418')}${[...Array(14)].map((_,k)=>R(k*116+14,316,88,140,'none','#3a2410',4)).join('')}${R(0,296,1600,10,'#3a2410')}${R(0,0,1600,40,'#3a2410')}${[150,1300,1480].map(x=>P(`M${x-50} 280V120Q${x-50} 60 ${x} 60Q${x+50} 60 ${x+50} 120V280Z`,'#f0c070','#3a2410',6)+L(`M${x} 60V280M${x-50} 160H${x+50}`,'#3a2410',4)+R(x-44,124,42,34,'#c0303a')+R(x+2,160,42,34,'#2e6ac8')).join('')}${[700,1250].map(x=>L(`M${x} 0V70`,'#3a2410',3)+C(x,70,100,'url(#licht)')+E(x,76,50,10,'#a07a30','#5a4010',3)+[-36,0,36].map(d=>R(x+d-5,50,10,26,'#fff6e0','#a89878',1.5)+P(`M${x+d} 38Q${x+d-6} 48 ${x+d} 52Q${x+d+6} 48 ${x+d} 38Z`,'#ffb030')).join('')).join('')}${boden(2)}${P('M600 560H1500L1560 760H540Z','#8a2a2a','#5a1818',4)}${P('M640 580H1460L1500 740H590Z','none','#f2c14e',3)}`,
objekte:[
{name:"Ratsbanner",x:700,y:250,wand:true,by:-95,zeichne:banner,fund:"Am Banner klebt:"},
{name:"Schreibpult mit Feder",x:900,boden:700,fuss:4,by:-135,zeichne:pult,fund:"Auf dem Pult liegt:"},
{name:"Stempeltisch",x:1350,boden:700,fuss:4,by:-118,zeichne:stempel,fund:"Beim Stempel liegt:"},
{name:"Wahlurne",x:650,boden:740,fuss:4,by:-115,zeichne:urne,fund:"In der Urne liegt:"},
{name:"Kerzenleuchter",x:1480,boden:600,fuss:4,by:-240,zeichne:leuchter,fund:"Am Leuchter klebt:"}
],
infoObjekte:[{name:"Urkunde",x:1050,y:250,wand:true,by:-80,zeichne:urkunde,fund:"An der Urkunde klebt:"},{name:"Chronik auf dem Ständer",x:1150,boden:620,fuss:4,by:-160,zeichne:chronik,fund:"In der Chronik liegt:"},{name:"Standuhr",x:150,boden:740,fuss:4,by:-255,zeichne:standuhr,fund:"An der Standuhr klebt:"}]},
{titel:"Der Glockenturm",
intro:"Ihr seid ganz oben im Glockenturm! Der Abendhimmel glüht, und tief unten liegen die Dächer der Stadt. Eine Luke in der Decke führt zur Festglocke. Findet die Ziffern für das letzte Schloss!",
introDu:"Du bist ganz oben im Glockenturm! Der Abendhimmel glüht, und tief unten liegen die Dächer der Stadt. Eine Luke in der Decke führt zur Festglocke. Finde die Ziffern für das letzte Schloss!",
tuerX:1000,tuerArt:"treppe",
hintergrund:()=>`${defs('#8a6a44','#4a3220','#ffb870')}<linearGradient id="abN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a8a"/><stop offset=".55" stop-color="#e8707a"/><stop offset="1" stop-color="#ffc888"/></linearGradient>${R(0,0,1600,470,'url(#abN)')}${[[100,40],[300,90],[800,50],[1100,80],[1400,40]].map(([x,y])=>C(x,y,2,'#fff')).join('')}${C(600,300,64,'#ffe0a0')}${C(600,300,200,'url(#licht)')}${P('M0 380Q300 330 600 370T1200 340T1600 370V470H0Z','#7a5a8a')}${[[0,340,90,130,'#6a4a5a'],[100,370,70,100,'#5a3a4a'],[180,330,100,140,'#6a4a5a'],[300,360,80,110,'#5a3a4a'],[400,340,90,130,'#6a4a5a'],[500,380,70,90,'#5a3a4a'],[580,350,110,120,'#6a4a5a'],[700,370,80,100,'#5a3a4a'],[1160,350,100,120,'#6a4a5a'],[1270,330,90,140,'#5a3a4a'],[1370,360,80,110,'#6a4a5a'],[1460,340,100,130,'#5a3a4a']].map(([x,y,w,h,f])=>haus(x,y,w,h,f,'#8a3a3a')).join('')}<path d="M0 0H1600V470H0Z M490 470V190Q490 120 600 120Q710 120 710 190V470Z M1170 470V200Q1170 140 1250 140Q1330 140 1330 200V470Z" fill="#7a5230" fill-rule="evenodd" stroke="#3a2410" stroke-width="5"/>${[...Array(26)].map((_,k)=>L(`M${k*62+30} 0V470`,'rgba(0,0,0,.22)',2)).join('')}${R(0,0,1600,34,'#3a2410')}${R(0,0,34,470,'#3a2410')}${R(1566,0,34,470,'#3a2410')}${R(480,420,240,16,'#8a6238',dk,3)}${R(1160,420,180,16,'#8a6238',dk,3)}${[500,600,700,1180,1250,1320].map(x=>R(x-5,436,10,34,'#6a4a28')).join('')}${boden(2)}`,
objekte:[
{name:"Turmuhr-Mechanik",x:220,y:240,wand:true,by:-90,zeichne:werk,fund:"Am Uhrwerk klebt:"},
{name:"Festglocke",x:450,boden:690,fuss:4,by:-240,zeichne:glocke,fund:"An der Glocke klebt:"},
{name:"Seilwinde",x:1300,boden:700,fuss:4,by:-115,zeichne:winde,fund:"An der Winde klebt:"},
{name:"Taubenschlag",x:1180,boden:610,fuss:4,by:-230,zeichne:taubenhaus,fund:"Im Taubenschlag liegt:"},
{name:"Sonnenuhr",x:150,boden:740,fuss:4,by:-105,zeichne:sonnenuhr,fund:"An der Sonnenuhr klebt:"}
],
infoObjekte:[{name:"Gemälde der Stadt",x:1450,y:250,wand:true,by:-75,zeichne:gemaelde,fund:"Hinter dem Gemälde klebt:"},{name:"Fernrohr",x:850,boden:740,fuss:4,by:-165,zeichne:fernrohr,fund:"Am Fernrohr klebt:"},{name:"Wetterfahne",x:700,boden:680,fuss:4,by:-240,zeichne:fahne,fund:"An der Wetterfahne klebt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>{
const taube=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M0 0Q-14 -16 -28 -8Q-14 -2 0 4Q14 -2 28 -8Q14 -16 0 0Z','#fff','#9ab0c8',1.5)}${E(0,2,9,5,'#fff','#9ab0c8',1.5)}${C(10,-2,3.5,'#fff','#9ab0c8',1.5)}</g>`;
return`<defs><linearGradient id="himmelA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a6a"/><stop offset=".6" stop-color="#d86a8a"/><stop offset="1" stop-color="#ffc070"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmelA)"/>${[[120,60],[300,100],[430,40],[620,80],[780,40],[900,110]].map(([x,y])=>C(x,y,3,'#fff6c8')).join('')}
   ${[[0,330,110,150,'#8a6a8a','#c0504a'],[120,350,90,130,'#7a5a7a','#4a7a9a'],[230,320,100,160,'#8a6a8a','#c0504a'],[680,330,100,150,'#7a5a7a','#c0504a'],[790,350,90,130,'#8a6a8a','#4a7a9a'],[890,320,110,160,'#7a5a7a','#c0504a']].map(([x,y,w,h,f,r])=>haus(x,y,w,h,f,r)).join('')}
   <path d="M0 470H1000V600H0Z" fill="#6a5a6a"/><path d="M0 410Q250 470 500 420T1000 410" fill="none" stroke="#333" stroke-width="3"/>${[...Array(15)].map((_,k)=>C(k*70+20,422+Math.sin(k*1.3)*20,7,['#ffd060','#f08ac0','#7ab8f0','#7ad06a'][k%4])).join('')}
   <path d="M260 330V440M740 330V440" stroke="#5a3a1c" stroke-width="5"/>${[[260,330,'#c0303a'],[740,330,'#2e6ac8']].map(([x,y,c])=>P(`M${x} ${y}H${x+36}V${y+64}L${x+18} ${y+48}L${x} ${y+64}Z`,c,'#222',2)).join('')}
   <g transform="translate(300 520)">${R(-60,-30,120,20,'#a0703e','#4a2a10',3)}${R(-50,-10,10,30,'#7a5230')}${R(40,-10,10,30,'#7a5230')}${C(-30,-42,10,'#f6d84a')}${C(0,-42,10,'#e8507a')}${C(30,-42,10,'#7ad06a')}</g>
   <g transform="translate(700 520)">${C(0,-60,40,'url(#licht)')}${R(-3,-90,6,90,'#3a3a40')}${R(-14,-60,28,40,'rgba(255,220,130,.7)','#3a3a40',3)}${E(0,-40,5,9,'#ffd060')}</g>
   ${taube(380,200,1.2)}${taube(560,150,1)}${taube(660,240,.8)}${taube(250,260,.8)}
   <path d="M0 0H1000V600H0Z M200 600V230Q200 130 500 130Q800 130 800 230V600Z" fill="#7a6a5a" fill-rule="evenodd"/><path d="M200 600V230Q200 130 500 130Q800 130 800 230V600" stroke="#3a2a1a" stroke-width="18" fill="none"/>${U('msglocke',464,48,72,gold)}${L('M440 90Q420 80 424 62M560 90Q580 80 576 62','#f2c14e',5)}`;
}
};
})();