document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-buch\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-16 -12Q-8 -16 0 -10Q8 -16 16 -12V12Q8 8 0 14Q-8 8 -16 12Z\"/><path d=\"M0 -10V14M-10 -4Q-6 -6 -3 -4M3 -4Q6 -6 10 -4\"/></g></symbol>\n<symbol id=\"sym-stern\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -18L5 -6L18 -6L8 3L12 16L0 8L-12 16L-8 3L-18 -6L-5 -6Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-krone\" viewBox=\"-20 -20 40 40\"><path d=\"M-16 14V-8L-8 2L0 -14L8 2L16 -8V14Z\" fill=\"currentColor\"/><circle cx=\"-16\" cy=\"-10\" r=\"3\" fill=\"currentColor\"/><circle cx=\"0\" cy=\"-16\" r=\"3\" fill=\"currentColor\"/><circle cx=\"16\" cy=\"-10\" r=\"3\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-rose\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"0\" cy=\"-5\" r=\"11\"/><path d=\"M0 -5Q4 -8 0 -10Q-6 -9 -5 -3Q-3 3 4 1\"/><path d=\"M0 6V19M0 14L8 10\"/></g></symbol>\n<symbol id=\"sym-zauberstab\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-15 16L5 -4\"/><path d=\"M10 -18V-6M4 -12H16M6 -16L14 -8M14 -16L6 -8\" stroke-width=\"2.5\"/></g></symbol>\n</defs>\n</svg>");
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
const rs=(x,y,r)=>C(x,y,r,'#e8507a','#a02a50',1.5)+C(x,y,r*.6,'#f27a9a')+L(`M${x-r*.3} ${y}Q${x} ${y-r*.5} ${x+r*.3} ${y}`,'#a02a50',1.5);
const pil=(x,h,w,c)=>R(x-w/5,-h,w*.4,h,'#f4ecd8','#a89878',2)+P(`M${x-w} ${-h+6}Q${x-w} ${-h-w*.9} ${x} ${-h-w*.9}Q${x+w} ${-h-w*.9} ${x+w} ${-h+6}Z`,c,'#5a2a1a',2)+C(x-w*.4,-h-w*.4,w*.13,'#fff')+C(x+w*.3,-h-w*.55,w*.1,'#fff');
const stern=(x,y,r,f)=>P(`M${x} ${y-r}L${x+r*.28} ${y-r*.3}L${x+r} ${y-r*.3}L${x+r*.45} ${y+r*.15}L${x+r*.62} ${y+r}L${x} ${y+r*.5}L${x-r*.62} ${y+r}L${x-r*.45} ${y+r*.15}L${x-r} ${y-r*.3}L${x-r*.28} ${y-r*.3}Z`,f);
const stamm=(x,w,f)=>R(x-w/2,0,w,470,f,'#4a3018',3)+L(`M${x-w*.2} 0V470M${x+w*.15} 0V470`,'rgba(0,0,0,.2)',3);
const krone=(x,y,r,f)=>C(x,y,r,f)+C(x-r*.7,y+r*.4,r*.7,f)+C(x+r*.7,y+r*.3,r*.75,f);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ad0f0"/><stop offset="1" stop-color="#fdeedd"/></linearGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==1){for(let x=20;x<1600;x+=90)for(const y of[510,580,660,740])d+=`M${x+(y%7)*9} ${y}l6 -16l4 14l6 -12l2 14`;return g+L(d,'rgba(40,100,40,.5)',3)+[...Array(36)].map((_,k)=>C((k*131+40)%1600,500+(k*53)%270,4+k%3,['#f8a8c8','#fff','#f6d84a','#b8a0f0'][k%4])).join('');}
if(m==2){for(let x=30;x<1600;x+=110)for(const y of[500,560,630,700,760])d+=`M${x+(y%5)*13} ${y}h8`;return g+L(d,'rgba(0,0,0,.28)',6);}
for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return g+L(d,'rgba(0,0,0,.18)',2);}
const wegweiser=()=>`${P('M-70 -34H46L72 -18L46 -2H-70Z','#e8c888','#6a4a20',3)}${P('M70 6H-46L-72 22L-46 38H70Z','#e8c888','#6a4a20',3)}${rs(-46,-18,8)}${stern(40,22,9,'#f2c14e')}${L('M-34 -18H20M-20 22H30','#a08040',3)}`;
const buchstumpf=()=>`${sch(60)}${P('M-48 -50H48L56 0H-56Z','#8a6238','#3a2410',3)}${E(0,-50,48,14,'#d8b070','#3a2410',3)}${P('M-38 -56Q-18 -72 0 -58Q18 -72 38 -56V-84Q18 -98 0 -86Q-18 -98 -38 -84Z','#fffbe8','#7a4a8a',3)}${L('M0 -58V-86M-30 -78Q-18 -82 -8 -76M-30 -70Q-18 -74 -8 -68M8 -76Q18 -82 30 -78M8 -68Q18 -74 30 -70','#9a8a70',2)}${stern(0,-112,10,'#f2c14e')}${L('M-16 -104l-6 -6M16 -104l6 -6','#f2c14e',2)}`;
const wunschbrunnen=()=>`${sch(62)}${P('M-56 -24Q-56 2 0 2Q56 2 56 -24Z','#a8aeb8','#4a5058',3)}${E(0,-24,56,16,'#b8bec8','#4a5058',3)}${E(0,-24,44,10,'#6ac0e8')}${R(-52,-96,9,72,'#8a6238','#3a2410',2)}${R(43,-96,9,72,'#8a6238','#3a2410',2)}${P('M-64 -94L0 -128L64 -94Z','#c85a8a','#6a2a4a',3)}${L('M0 -112V-64','#6a4a2a',3)}${R(-9,-66,18,16,'#a0703e','#4a2a10',2)}${stern(0,-24,5,'#fff6c8')}`;
const rosenbusch=()=>`${sch(70)}${E(0,-42,70,44,'#3f8a44','#1f5a24',3)}${E(-34,-62,32,24,'#4f9a4a')}${E(34,-58,32,24,'#4f9a4a')}${rs(-36,-50,11)}${rs(-4,-76,12)}${rs(30,-48,11)}${rs(46,-72,9)}${rs(-52,-72,8)}${rs(8,-40,9)}${L('M-60 -20l-8 -6M62 -26l8 -6','#2a5a2a',3)}`;
const pilzring=()=>`${sch(80)}${E(0,-6,80,14,'#6ab05a')}${[[-64,-6,26,16,'#e74c3c'],[-30,6,34,20,'#c85a8a'],[24,8,30,18,'#e08a3a'],[62,-4,24,14,'#b070d0'],[0,-12,22,14,'#e74c3c']].map(([x,y,h,w,c])=>`<g transform="translate(${x} ${y})">${pil(0,h,w,c)}</g>`).join('')}${stern(-20,-60,6,'#fff6c8')}${stern(40,-52,5,'#fff6c8')}`;
const briefkasten=()=>`${R(-34,-30,68,60,'#f6a8c8','#a04a70',3)}${P('M-42 -28L0 -62L42 -28Z','#c85a8a','#6a2a4a',3)}${R(-16,-8,32,7,'#6a2a4a')}${C(0,14,9,'#fff6c8','#a04a70',2)}${stern(0,14,6,'#f2c14e')}${L('M34 -10H52','#8a6238',3)}${P('M52 -10L52 -26L68 -18Z','#f2c14e','#a07a20',2)}`;
const falterbank=()=>`${sch(70)}${R(-64,-34,128,12,'#c89a60','#5a3a1c',3)}${R(-64,-66,128,10,'#c89a60','#5a3a1c',3)}${R(-56,-22,10,22,'#8a6238')}${R(46,-22,10,22,'#8a6238')}${R(-60,-66,6,34,'#8a6238')}${R(54,-66,6,34,'#8a6238')}${[[-30,-100,'#f08ac0'],[24,-122,'#7ab8f0'],[0,-90,'#f6d84a']].map(([x,y,c])=>P(`M${x} ${y}Q${x-22} ${y-22} ${x-20} ${y+6}Q${x-8} ${y+8} ${x} ${y}Q${x+8} ${y+8} ${x+20} ${y+6}Q${x+22} ${y-22} ${x} ${y}Z`,c,'#6a4a8a',1.5)+L(`M${x} ${y-6}V${y+8}`,'#4a2a5a',2)).join('')}`;
const blumenschild=()=>`${sch(40)}${R(-5,-150,10,150,'#8a6238')}${R(-62,-196,124,58,'#fff6e8','#8a6238',4)}${[[-34,-166,'#f08ac0'],[0,-160,'#f6d84a'],[34,-166,'#7ab8f0']].map(([x,y,c])=>C(x,y,9,c,'#6a4a8a',1.5)+C(x,y,3,'#fff')+L(`M${x} ${y+9}V${y+22}`,'#4f9a4a',3)).join('')}${[[-24,'#f08ac0'],[0,'#f6d84a'],[26,'#b8a0f0']].map(([x,c])=>L(`M${x} 0V-22`,'#4f9a4a',3)+C(x,-26,8,c,'#6a4a8a',1.5)).join('')}`;
const kessel=()=>`${sch(60)}${L('M-30 -6L-40 -30M30 -6L40 -30','#3a2410',6)}${P('M-34 0Q-12 -12 4 -4Q20 -14 34 0Z','#ff9a30')}${P('M-52 -66Q-62 -12 -30 -10H30Q62 -12 52 -66Z','#3a3a44','#16161c',3)}${E(0,-66,52,11,'#2a2a30','#16161c',3)}${E(0,-66,44,8,'#7adc6a')}${C(-14,-76,6,'#b8f08a')}${C(14,-72,4,'#b8f08a')}${C(2,-86,5,'#b8f08a')}${L('M-12 -100Q-20 -112 -10 -122T-10 -140M14 -98Q22 -110 14 -120','rgba(200,255,200,.7)',3)}${R(-60,-60,12,8,'#16161c')}${R(48,-60,12,8,'#16161c')}`;
const spruchtafel=()=>`${R(-74,-56,148,112,'#2e4a3a','#8a6238',7)}${L('M-52 -30Q-40 -40 -30 -30T-8 -30T14 -30T36 -30M-52 -8Q-40 -18 -30 -8T-8 -8T14 -8T36 -8M-52 14Q-40 4 -30 14T-8 14','rgba(255,255,255,.8)',3)}${stern(46,26,13,'#f2c14e')}${C(-50,32,2,'#fff')}${C(-40,38,2,'#fff')}`;
const kraeuterregal=()=>`${sch(60)}${R(-54,-170,108,170,'#8a6238','#3a2410',4)}${R(-46,-162,92,154,'#5a3a1c')}${[-110,-58,-6].map(y=>R(-50,y,100,8,'#a0703e','#3a2410',2)).join('')}${[[-30,-124,'#4f9a4a'],[0,-124,'#b070d0'],[30,-124,'#e8b02a'],[-24,-72,'#e8507a'],[16,-72,'#4f9a4a']].map(([x,y,c])=>R(x-11,y-26,22,26,'#dfe8e4','#7a8a96',2)+R(x-11,y-30,22,6,'#8a5a2a')+C(x,y-13,7,c)).join('')}${[-30,0,30].map(x=>L(`M${x} -30V-10`,'#8a9a3a',3)+E(x,-8,10,5,'#6aa04a')).join('')}${L('M-54 -170Q0 -190 54 -170','#4f9a4a',5)}`;
const besen=()=>`${sch(36)}${L('M22 -190L-12 -36','#a0703e',8)}${P('M-34 -40L-6 -30L8 0H-40Z','#e8c060','#8a6a20',3)}${L('M-30 -30L-30 -4M-20 -26L-18 -2M-8 -20L-4 -2','#a08030',2)}${R(-18,-44,28,8,'#e8507a','#a02a50',2)}${stern(24,-196,8,'#f2c14e')}`;
const rezeptbuch=()=>`${sch(40)}${R(-8,-70,16,70,'#8a6238','#3a2410',3)}${R(-30,-8,60,10,'#8a6238','#3a2410',3)}${P('M-48 -76L48 -76L40 -108L-40 -108Z','#a0703e','#3a2410',3)}${P('M-42 -80L0 -80L0 -106L-36 -104Z','#fffbe8','#7a5a2a',2)}${P('M2 -80L42 -80L36 -104L2 -106Z','#fffbe8','#7a5a2a',2)}${L('M-34 -98H-8M-34 -90H-8M10 -98H32M10 -90H32','#8a7a60',2)}${C(24,-72,0,'none')}${P('M30 -106Q44 -134 62 -138Q56 -116 38 -104Z','#f6f0f0','#8a7a90',2)}`;
const katze=()=>`${sch(44)}${E(0,-30,30,32,'#2a2a34','#101018',2)}${E(0,-26,16,24,'#3a3a46')}${C(0,-76,22,'#2a2a34','#101018',2)}${P('M-20 -86L-24 -108L-6 -94Z','#2a2a34')}${P('M20 -86L24 -108L6 -94Z','#2a2a34')}${E(-8,-78,5,6,'#a8f08a')}${E(8,-78,5,6,'#a8f08a')}${E(-8,-78,1.5,5,'#101018')}${E(8,-78,1.5,5,'#101018')}${P('M-3 -70L3 -70L0 -66Z','#e8909a')}${L('M-26 -70L-12 -68M-26 -64L-12 -66M26 -70L12 -68M26 -64L12 -66','#ccc',1.5)}${L('M28 -6Q58 -10 54 -44Q50 -58 40 -52','#2a2a34',9)}${R(-16,-96,32,6,'#7a3a9a')}${P('M-12 -96L0 -128L12 -96Z','#7a3a9a','#4a1a6a',2)}${stern(0,-110,4,'#f2c14e')}`;
const teekanne=()=>`${sch(52)}${L('M-36 -50L-40 0M36 -50L40 0','#7a5230',7)}${R(-46,-58,92,8,'#a0703e','#4a2a10',3)}${P('M-26 -60Q-30 -92 0 -94Q30 -92 26 -60Z','#e8a8c8','#a04a70',3)}${R(-8,-102,16,8,'#a04a70')}${C(0,-106,5,'#a04a70')}${L('M26 -82Q50 -84 44 -66','#a04a70',6)}${P('M-26 -78Q-46 -86 -48 -100Q-30 -94 -24 -86Z','#e8a8c8','#a04a70',2)}${R(34,-78,20,18,'#7ab8f0','#3a6a9a',2)}${R(-62,-76,18,16,'#f6d84a','#a08020',2)}${L('M-6 -116Q-14 -126 -4 -136T-4 -152','rgba(255,255,255,.7)',3)}`;
const sanduhr=()=>`${R(-34,-64,68,10,'#8a6238','#3a2410',3)}${R(-34,54,68,10,'#8a6238','#3a2410',3)}${P('M-26 -54H26Q26 -12 6 0Q26 12 26 54H-26Q-26 12 -6 0Q-26 -12 -26 -54Z','rgba(200,232,240,.55)','#4a6a7a',3)}${P('M-20 -54H20Q18 -26 0 -14Q-18 -26 -20 -54Z','#f2d890')}${P('M-18 54H18Q12 28 0 18Q-12 28 -18 54Z','#f2d890')}${L('M0 -6V16','#f2d890',3)}${L('M-30 -54V54M30 -54V54','#8a6238',5)}`;
const laterne=()=>`${sch(30)}${C(0,-110,80,'url(#licht)')}${R(-5,-130,10,130,'#5a5a68')}${R(-28,-26,56,10,'#3a3a48')}${R(-24,-92,48,64,'rgba(255,220,130,.6)','#3a3a48',3)}${E(0,-60,9,14,'#ffd060')}${P('M-32 -92H32L18 -112H-18Z','#3a3a48')}${C(0,-116,6,'none','#3a3a48',3)}`;
const schubkarre=()=>`${sch(70)}${P('M-56 -62H44L28 -22H-38Z','#a0703e','#4a2a10',3)}${[[-34,-70,'#e8507a'],[-8,-80,'#4ab0f0'],[18,-72,'#7ad06a'],[34,-66,'#f6d84a']].map(([x,y,c])=>P(`M${x} ${y-12}L${x+11} ${y}L${x} ${y+12}L${x-11} ${y}Z`,c,'#fff',1.5)).join('')}${L('M-56 -62L-84 -78M-30 -22L-44 0','#5a3a1c',6)}${C(30,-14,18,'#3a3a44','#16161c',3)}${C(30,-14,6,'#8a8a98')}${L('M44 -50L74 -40L64 -10','#5a3a1c',5)}`;
const werkzeugbrett=()=>`${R(-82,-60,164,120,'#8a6238','#3a2410',5)}${L('M-82 0H82','#6a4a28',3)}${L('M-56 -44V0','#7a5230',5)}${P('M-72 -44Q-56 -66 -40 -44Q-56 -38 -72 -44Z','#8a9098','#4a5058',2)}${R(-30,-48,10,32,'#c8a060','#6a4a20',2)}${R(-34,-22,18,14,'#e8c870','#6a4a20',2)}${L('M10 -48V-6','#7a5230',6)}${P('M-2 -8H22L20 14H0Z','#e8507a','#a02a50',2)}${C(52,-26,16,'rgba(200,232,240,.6)','#5a5a68',4)}${L('M64 -14L76 -2','#5a5a68',5)}${R(-70,14,140,8,'#a0a0a8','#5a5a68',2)}${L('M-56 14V22M-36 14V22M-16 14V22M4 14V22M24 14V22M44 14V22M64 14V22','#3a3a48',2)}${C(-48,36,5,'#f6d84a')}${C(-30,36,5,'#4ab0f0')}${C(-12,36,5,'#e8507a')}`;
const lore=()=>`${sch(76)}${L('M-76 -4H76','#5a5a68',5)}${P('M-54 -76H54L44 -22H-44Z','#6a6a78','#2a2a38',3)}${R(-58,-82,116,10,'#8a8a98','#2a2a38',3)}${[[-32,-90,'#4ab0f0'],[-6,-98,'#e8507a'],[20,-92,'#7ad06a'],[40,-88,'#b070d0']].map(([x,y,c])=>P(`M${x} ${y-12}L${x+10} ${y}L${x} ${y+10}L${x-10} ${y}Z`,c,'#fff',1.5)).join('')}${C(-30,-12,14,'#3a3a44','#16161c',3)}${C(30,-12,14,'#3a3a44','#16161c',3)}${C(-30,-12,5,'#8a8a98')}${C(30,-12,5,'#8a8a98')}`;
const muetzen=()=>`${sch(44)}${R(-5,-190,10,190,'#8a6238','#3a2410',2)}${L('M-36 0L0 -20L36 0','#5a3a1c',6)}${L('M-5 -170H-44M5 -140H44M-5 -112H-38','#8a6238',7)}${P('M-44 -172L-76 -176L-58 -214L-44 -172Z','#e8507a','#a02a50',2)}${P('M44 -142L74 -146L58 -186L44 -142Z','#4a90e0','#1a4a8a',2)}${P('M-38 -114L-68 -118L-52 -154L-38 -114Z','#7ad06a','#2a7a2a',2)}${C(-58,-216,5,'#fff')}${C(58,-188,5,'#fff')}${C(-52,-156,5,'#fff')}${P('M-6 -190L0 -214L6 -190Z','#f6d84a')}`;
const wegtafel=()=>`${R(-70,-56,140,112,'#c8a060','#5a3a1c',5)}${P('M-54 -32H20L36 -20L20 -8H-54Z','#f6e8c0','#6a4a20',2)}${P('M54 8H-20L-36 20L-20 32H54Z','#f6e8c0','#6a4a20',2)}${stern(-34,-20,7,'#7a4aa0')}${P('M34 20l8 -10l8 10l-6 0v8h-4v-8Z','#4a90e0')}${C(-60,-46,3,'#555')}${C(60,46,3,'#555')}`;
const kristalle=()=>`${sch(70)}${C(0,-60,76,'url(#licht)')}${[[-44,-70,'#b070f0',14],[-12,-110,'#7ab8f0',18],[26,-84,'#f08ac0',16],[52,-50,'#7ad8c8',12]].map(([x,h,c,w])=>P(`M${x-w} 0L${x-w+3} ${h+20}L${x} ${h}L${x+w-3} ${h+20}L${x+w} 0Z`,c,'rgba(255,255,255,.7)',2)+L(`M${x-3} ${h+10}V-10`,'rgba(255,255,255,.5)',2)).join('')}`;
const erzstufen=()=>`${sch(64)}${P('M-60 0Q-56 -34 -24 -40Q0 -56 30 -38Q58 -30 60 0Z','#6a6a78','#2a2a38',3)}${[[-32,-22,'#f6d84a'],[-6,-36,'#e8a030'],[22,-26,'#f6d84a'],[40,-12,'#e8a030'],[-44,-8,'#e8a030']].map(([x,y,c])=>P(`M${x-7} ${y}L${x} ${y-8}L${x+8} ${y}L${x+2} ${y+7}L${x-5} ${y+6}Z`,c,'#fff6c8',1.5)).join('')}${stern(8,-60,7,'#fff6c8')}`;
const goldhaufen=()=>`${sch(80)}${C(0,-40,90,'url(#licht)')}${P('M-84 0Q-70 -40 -30 -56Q0 -76 34 -56Q76 -40 84 0Z','#e8b020','#a07010',3)}${[[-50,-14],[-20,-30],[10,-14],[40,-26],[-6,-52],[60,-8],[-70,-6],[22,-44]].map(([x,y])=>E(x,y,13,8,'#f6d84a','#a07010',2)+L(`M${x-6} ${y}h12`,'#c89a20',2)).join('')}${U('krone',-14,-100,34,'#f6d84a')}${stern(46,-70,6,'#fff6c8')}`;
const drachenei=()=>`${sch(44)}${E(0,-8,44,12,'#8a8a98','#3a3a48',3)}${P('M0 -142Q-44 -130 -42 -64Q-38 -14 0 -14Q38 -14 42 -64Q44 -130 0 -142Z','#8ad8a0','#2a7a4a',4)}${[[-16,-100,10],[14,-84,12],[-8,-56,9],[18,-38,7],[-24,-34,6]].map(([x,y,r])=>C(x,y,r,'#e8507a','#a02a50',1.5)).join('')}${L('M-30 -118Q0 -130 28 -116','rgba(255,255,255,.55)',4)}${stern(0,-160,8,'#f2c14e')}`;
const truhe=()=>`${sch(66)}${R(-60,-50,120,50,'#a0603a','#4a2a10',4)}${P('M-60 -50Q-60 -96 0 -96Q60 -96 60 -50Z','#b8703a','#4a2a10',4)}${L('M-30 -94V-2M30 -94V-2','#5a5a68',6)}${R(-12,-52,24,22,'#f6d84a','#a07010',3)}${C(0,-42,4,'#4a2a10')}${[[-40,-100,'#4ab0f0'],[-14,-114,'#e8507a'],[16,-108,'#7ad06a'],[42,-98,'#f6d84a']].map(([x,y,c])=>C(x,y,9,c,'#fff',1.5)).join('')}${stern(0,-130,7,'#fff6c8')}`;
const stabstaender=()=>`${sch(40)}${P('M-30 0L-22 -50H22L30 0Z','#8a8a98','#3a3a48',3)}${R(-26,-62,52,12,'#a8a8b8','#3a3a48',3)}${L('M0 -62L0 -176','#a0703e',8)}${C(0,-186,26,'url(#licht)')}${stern(0,-188,14,'#f6d84a')}${stern(0,-188,7,'#fff')}${L('M-26 -150l-8 -6M26 -160l8 -6M-20 -208l-6 -8M22 -206l6 -8','#f6d84a',3)}${C(0,-120,5,'#e8507a')}${C(0,-96,5,'#4ab0f0')}`;
const kerzenhalter=()=>`${C(0,-20,60,'url(#licht)')}${R(-24,-8,48,12,'#5a3a1c')}${P('M-30 -6Q-30 16 0 18Q30 16 30 -6Z','#c89a40','#7a5a20',3)}${R(-8,-52,16,48,'#fff6e0','#a89878',2)}${P('M0 -82Q-12 -62 0 -54Q12 -62 0 -82Z','#ffb030')}${P('M0 -74Q-5 -64 0 -60Q5 -64 0 -74Z','#fff6a0')}${L('M0 -54V-50','#333',2)}`;
const nest=()=>`${sch(76)}${E(0,-16,76,26,'#9a6a30','#5a3a1c',3)}${L('M-60 -14Q0 8 60 -14M-50 -26Q0 -8 50 -26','#6a4a20',3)}${E(0,-34,48,26,'#e8a0b8','#a04a60',3)}${C(-34,-44,18,'#e8a0b8','#a04a60',3)}${P('M-48 -58l6 -14l8 12Z','#e8a0b8','#a04a60',2)}${P('M-24 -58l6 -14l6 14Z','#e8a0b8','#a04a60',2)}${L('M-44 -44Q-38 -40 -32 -44','#6a2a3a',2.5)}${L('M44 -30Q74 -34 70 -52','#e8a0b8',8)}${stern(-20,-100,6,'#fff6c8')}${L('M-30 -84h14l-14 10h14','#fff',2)}`;
const edelkrone=()=>`${sch(44)}${L('M-24 -2V-38M24 -2V-38','#8a6238',7)}${E(0,-40,42,12,'#a0703e','#4a2a10',3)}${E(0,-48,34,10,'#c8386a','#7a1a40',2)}${P('M-30 -52V-82L-16 -66L0 -94L16 -66L30 -82V-52Z','#f6d84a','#a07010',3)}${C(-30,-84,5,'#4ab0f0')}${C(0,-96,6,'#e8507a')}${C(30,-84,5,'#7ad06a')}${C(0,-62,5,'#b070f0','#fff',1.5)}`;
const reimzettel=()=>`${R(-60,-62,120,124,'#8a6238','#3a2410',5)}${P('M-46 -50H46V44Q30 52 14 44T-18 44T-46 44Z','#f6ecc8','#7a5a2a',3)}${L('M-32 -30H30M-32 -14H18M-32 2H30M-32 18H14','#6a5a40',3)}${C(0,-54,6,'#e8507a','#a02a50',2)}${P('M26 50Q44 20 64 14Q58 40 38 52Z','#f6f0f0','#8a7a90',2)}`;
const wappen=()=>`${R(-46,-96,92,20,'#c0303a','#6a1a20',3)}${P('M-44 -76H44V-20Q44 20 0 44Q-44 20 -44 -20Z','#e8e0f8','#6a4a9a',5)}${P('M0 -76H44V-20Q44 20 0 44Z','#7a5ac8')}${U('krone',-34,-62,34,'#f2c14e')}${rs(-18,4,11)}${stern(22,-30,9,'#f2c14e')}${stern(22,6,6,'#f2c14e')}`;
const fahnen=()=>`${R(-90,-92,180,10,'#8a6238','#3a2410',3)}${P('M-76 -82H-30V10L-53 -10L-76 10Z','#c0303a','#6a1a20',3)}${P('M-18 -82H28V10L5 -10L-18 10Z','#7a5ac8','#3a2a6a',3)}${P('M40 -82H86V10L63 -10L40 10Z','#2e9ac8','#1a5a7a',3)}${stern(-53,-56,12,'#f2c14e')}${U('krone',-12,-70,34,'#f2c14e')}${rs(63,-52,12)}`;
const turmuhr=()=>`${sch(50)}${R(-36,-170,72,170,'#c8bca8','#5a4a3a',4)}${[-36,-12,12].map(x=>R(x,-184,24,16,'#c8bca8','#5a4a3a',3)).join('')}${P('M-46 -184L0 -250L46 -184Z','#5a7ac8','#2a3a7a',4)}${C(0,-120,26,'#fffbe8','#5a4a3a',4)}${L('M0 -120V-138M0 -120L12 -112','#222',3)}${[0,90,180,270].map(a=>`<rect x="-1.5" y="-144" width="3" height="6" fill="#5a4a3a" transform="translate(0 -120) rotate(${a})"/>`).join('')}${P('M-12 0V-36Q0 -50 12 -36V0Z','#7a5230','#3a2410',2)}${R(-6,-80,12,18,'#ffd060','#5a4a3a',2)}${stern(0,-206,9,'#f2c14e')}`;
const schlossbrunnen=()=>`${sch(70)}${E(0,-10,68,14,'#a8aeb8','#4a5058',3)}${R(-68,-30,136,22,'#a8aeb8','#4a5058',3)}${E(0,-30,68,14,'#b8bec8','#4a5058',3)}${E(0,-30,56,9,'#6ac0e8')}${R(-6,-30,12,70,'#a8aeb8','#4a5058',2)}${E(0,-96,32,10,'#b8bec8','#4a5058',3)}${E(0,-96,24,6,'#6ac0e8')}${R(-5,-132,10,40,'#a8aeb8')}${L('M0 -130Q-30 -140 -34 -100M0 -130Q30 -140 34 -100M0 -130V-150','#9ad8f8',4)}${C(-34,-98,3,'#bfe8ff')}${C(34,-98,3,'#bfe8ff')}${stern(0,-156,6,'#fff6c8')}`;
const waechterbank=()=>`${sch(72)}${R(-66,-46,132,16,'#8a8a98','#3a3a48',3)}${R(-60,-30,16,30,'#7a7a88','#3a3a48',2)}${R(44,-30,16,30,'#7a7a88','#3a3a48',2)}${E(0,-54,48,10,'#c8386a','#7a1a40',2)}${R(-62,-90,124,14,'#8a8a98','#3a3a48',3)}${R(-56,-76,10,30,'#7a7a88')}${R(46,-76,10,30,'#7a7a88')}${C(-80,-30,0,'none')}${R(76,-34,22,34,'rgba(255,220,130,.6)','#3a3a48',3)}${E(87,-17,5,8,'#ffd060')}${C(87,-40,0,'none')}`;
const karte=()=>`${R(-80,-58,160,116,'#f0dcb0','#7a5a2a',4)}${L('M-60 40Q-30 10 -10 24T30 0T62 -26','#e8507a',4)}${P('M-20 -20V-40L-12 -34L-4 -44L4 -34L12 -40V-20Z','#c8bce8','#5a4a8a',2)}${R(-20,-20,32,18,'#c8bce8','#5a4a8a',2)}${U('buch',-70,-50,24,'#7a4a8a')}${stern(56,-34,8,'#f2c14e')}${P('M30 30L38 22L46 30L38 38Z','#7ad06a','#2a7a2a',2)}${[[-76,-54],[76,-54],[-76,54],[76,54]].map(([x,y])=>C(x,y,3,'#555')).join('')}`;
const kutsche=()=>`${sch(84)}${E(0,-70,74,56,'#f08a2a','#a0501a',4)}${[-44,-22,0,22,44].map(x=>L(`M${x} -120Q${x+(x>0?12:-12)} -70 ${x} -22`,'#c8601a',3)).join('')}${R(-4,-130,8,14,'#4f9a4a')}${R(-26,-90,52,34,'rgba(200,232,240,.65)','#a0501a',3)}${C(-52,-14,26,'#8a5a2a','#4a2a10',4)}${C(52,-14,26,'#8a5a2a','#4a2a10',4)}${C(-52,-14,8,'#f6d84a')}${C(52,-14,8,'#f6d84a')}${L('M-52 -40V12M-78 -14H-26M52 -40V12M26 -14H78','#4a2a10',2)}${stern(0,-148,8,'#f2c14e')}`;
const laternen=()=>`${sch(36)}${R(-5,-240,10,240,'#3a3a48')}${L('M-5 -214H-52M5 -214H52','#3a3a48',6)}${[[-52,'#ffd060'],[52,'#ffd060']].map(([x,c])=>C(x,-176,50,'url(#licht)')+R(x-14,-212,28,40,'rgba(255,220,130,.65)','#3a3a48',3)+E(x,-192,6,10,c)+P(`M${x-18} -212H${x+18}L${x} -228Z`,'#3a3a48')).join('')}${R(-18,-14,36,14,'#5a5a68','#3a3a48',2)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #dl{transform:scaleX(.14)}.tuer.offen #dr{transform:scaleX(.14)}.tuer .ob{opacity:0}.tuer.offen .ob{opacity:1}.tuer.offen #zk{transform:scaleX(.14)}.tuer.offen #zt{transform:translateX(-200px);opacity:0}.tuer.offen #zg{transform:rotate(-300deg)}.tuer.offen #dk{transform:scaleY(.12)}.tuer.offen #br{transform:scaleY(.1)}.tuer.offen #tl{transform:scaleX(.14)}.tuer.offen #tr{transform:scaleX(.14)}.tuer .bp{opacity:0}.tuer.offen .bp{opacity:1}</style>`;
function tuerDornen(n){
let a='',b='';
for(let k=0;k<6;k++){a+=E(430+k%2*34,214+k*44,32,28,k%2?'#4f9a4a':'#3f8a44','#1f5a24',2);b+=E(570-k%2*34,236+k*44,32,28,k%2?'#3f8a44':'#4f9a4a','#1f5a24',2);}
a+=rs(432,250,11)+rs(470,330,11)+rs(440,420,11)+L('M420 280l-10 -5M480 380l10 -5M456 210l-4 -10','#6a4a2a',3);
b+=rs(568,262,11)+rs(530,350,11)+rs(560,430,11)+L('M580 300l10 -5M520 250l-10 -5M544 410l-6 8','#6a4a2a',3);
return`${P('M372 470V210Q372 150 500 150Q628 150 628 210V470Z','#2f7a34','#1f5a24',5)}${R(410,190,180,280,'#fff4d0')}${C(500,320,130,'url(#licht)')}${P('M410 360Q470 320 520 350T590 340V470H410Z','#b8e0a0')}${P('M470 470L492 350H508L530 470Z','#f0dca8')}${R(486,300,28,40,'#d8c8f0','#7a5aa0',2)}${P('M482 302L500 262L518 302Z','#e07aa0','#a04a70',2)}
   <g id="dl" class="tb" style="transform-origin:410px 330px">${R(410,190,92,280,'#3f8a44','#1f5a24',3)}${a}</g>
   <g id="dr" class="tb" style="transform-origin:590px 330px">${R(498,190,92,280,'#3f8a44','#1f5a24',3)}${b}</g>
   <g class="tb ob">${rs(398,210,15)}${rs(438,170,15)}${rs(500,158,16)}${rs(562,170,15)}${rs(602,210,15)}${rs(384,320,13)}${rs(616,330,13)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerZucker(n){
let p='',q='';for(let k=0;k<7;k++){p+=L(`M381 ${182+k*40}l24 14`,'#e74c3c',9);q+=L(`M595 ${182+k*40}l24 14`,'#e74c3c',9);}
return`${R(410,190,180,280,'#2a1a08')}${C(500,330,130,'url(#licht)')}${R(446,230,108,170,'#fff0b0')}${P('M410 470L446 400H554L590 470Z','#6a4a28')}${R(378,170,30,300,'#fff','#c0392b',2)}${R(592,170,30,300,'#fff','#c0392b',2)}${p}${q}${R(372,160,256,28,'#fff','#c0392b',2)}${P('M358 162L500 96L642 162Z','#a0603a','#5a2a14',4)}${L('M376 152Q500 96 624 152','#fffbe8',7)}${C(430,128,8,'#e74c3c')}${C(500,114,8,'#4ab0f0')}${C(570,128,8,'#7ad06a')}
   <g id="zk" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#b8783a','#6a3a14',4)}<path d="M422 202H578V458H422Z" fill="none" stroke="#fffbe8" stroke-width="6" stroke-dasharray="14 8" stroke-linecap="round"/>${C(452,236,12,'#e74c3c','#a02a20',2)}${C(548,236,12,'#7ad06a','#2a7a2a',2)}${C(452,424,12,'#f6d84a','#a08020',2)}${C(548,424,12,'#4ab0f0','#1a5a8a',2)}${L('M440 214Q460 232 480 214M520 214Q540 232 560 214','#fffbe8',4)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerZahnrad(n){
let s='';for(let k=0;k<6;k++)s+=L(`M${372+k*2} ${240+k*40}H${400+k%2*8}`,'#5a5a68',3)+L(`M${628-k*2} ${240+k*40}H${600-k%2*8}`,'#5a5a68',3);
return`${P('M372 470V240Q372 150 500 150Q628 150 628 240V470Z','#7a7a88','#2a2a38',5)}${s}${P('M486 160l14 -16l14 16Z','#b070f0','#fff',1.5)}${P('M430 176l10 -14l10 14Z','#7ab8f0','#fff',1.5)}${P('M550 176l10 -14l10 14Z','#f08ac0','#fff',1.5)}${R(410,190,180,280,'#f0f4ff')}${P('M410 190H590L556 250V420L590 470H410L444 420V250Z','#d8e0f8')}${C(500,330,130,'url(#licht)')}${R(444,250,112,170,'#fffbe8')}${P('M410 470L444 420H556L590 470Z','#b8c0e0')}
   <g id="zt" class="tb">${P('M410 470V250Q410 190 500 190Q590 190 590 250V470Z','#8a8a98','#2a2a38',4)}${L('M430 220Q500 190 570 220M420 440H580','#6a6a78',3)}
   <g id="zg" class="tb" style="transform-origin:500px 290px">${C(500,290,60,'#a8a8b8','#3a3a48',4)}<circle cx="500" cy="290" r="67" fill="none" stroke="#a8a8b8" stroke-width="12" stroke-dasharray="14 14.2"/>${L('M500 232V348M442 290H558M459 249L541 331M541 249L459 331','#3a3a48',5)}${C(500,290,14,'#6a6a78','#3a3a48',3)}${C(500,290,5,'#f2c14e')}</g></g>
   <g class="tb pl">${sPl(n,410)}</g>`;
}
function tuerDrachen(n){
let zo='',zu='';[432,472,528,568].forEach(x=>{zo+=E(x,298,15,17,'#fff8e8','#8a7a6a',2);zu+=E(x,330,13,15,'#fff8e8','#8a7a6a',2);});
return`${P('M366 470V200Q366 120 500 120Q634 120 634 200V470Z','#8a7a6a','#3a2a20',5)}${E(396,126,15,24,'#7a6a5a','#3a2a20',3)}${E(604,126,15,24,'#7a6a5a','#3a2a20',3)}${C(440,156,22,'#fff','#3a2a20',3)}${C(560,156,22,'#fff','#3a2a20',3)}${C(446,160,10,'#3a8a4a')}${C(566,160,10,'#3a8a4a')}${C(446,160,4,'#222')}${C(566,160,4,'#222')}${L('M418 128Q440 116 462 126M538 126Q560 116 582 128','#3a2a20',4)}${E(486,184,5,3,'#4a3a2e')}${E(514,184,5,3,'#4a3a2e')}
   ${R(410,190,180,280,'#ffb060')}${C(500,340,140,'url(#licht)')}${P('M410 430Q470 400 530 428T590 418V470H410Z','#e8b84a')}${C(450,420,5,'#fff6c8')}${C(540,432,4,'#fff6c8')}${stern(500,380,9,'#fff6c8')}
   ${P('M392 190H608V294Q500 318 392 294Z','#8a7a6a','#3a2a20',3)}${zo}
   <g id="dk" class="tb" style="transform-origin:500px 470px">${P('M392 330Q500 350 608 330V470H392Z','#7a6a5a','#3a2a20',3)}${zu}${E(500,420,64,28,'#e8707a','#a03a4a',3)}${L('M500 396V440','#a03a4a',3)}</g>
   <g class="tb pl">${sPl(n,404)}</g>`;
}
function tuerBruecke(n){
const ob='M340 470V210Q340 110 500 110Q660 110 660 210V470Z',ib='M385 470V228Q385 150 500 150Q615 150 615 228V470Z';
let pl='';for(let x=420;x<600;x+=26)pl+=`M${x} 190V440`;
return`<defs><clipPath id="tgclip"><path d="${ib}"/></clipPath><linearGradient id="abT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5ac0"/><stop offset=".6" stop-color="#f08a5a"/><stop offset="1" stop-color="#ffd890"/></linearGradient></defs>
   <path d="${ob}" fill="#a89a8e" stroke="#4a3a40" stroke-width="5"/><path d="M340 270H385M615 270H660M340 360H385M615 360H660M356 170L392 190M644 170L608 190" stroke="#6a5a5e" stroke-width="3"/>
   <g clip-path="url(#tgclip)"><rect x="380" y="140" width="240" height="340" fill="url(#abT)"/>${C(500,330,120,'url(#licht)')}${P('M380 380Q440 350 500 372T620 366V470H380Z','#6aa04a')}${R(440,300,40,80,'#d8c8f0','#7a5aa0',2)}${P('M434 302L460 250L486 302Z','#e07aa0','#a04a70',2)}${stern(560,210,8,'#fff6c8')}
   <g id="tl" class="tb" style="transform-origin:385px 330px;transition-delay:.9s">${R(385,150,115,320,'#8a5a30','#3a2410',4)}${L('M410 150V470M440 150V470M470 150V470','#5a3a18',3)}${C(488,330,6,'#f2c14e')}</g>
   <g id="tr" class="tb" style="transform-origin:615px 330px;transition-delay:.9s">${R(500,150,115,320,'#8a5a30','#3a2410',4)}${L('M530 150V470M560 150V470M590 150V470','#5a3a18',3)}${C(512,330,6,'#f2c14e')}</g></g>
   ${R(330,440,340,30,'#4a90c8')}${L('M346 452q10-4 20 0t20 0M560 458q10-4 20 0t20 0M450 462q10-4 20 0t20 0','#bfe0f0',3)}${L('M330 440H670','#3a6a9a',3)}
   <g class="tb bp">${R(420,440,160,30,'#a0703a','#5a3418',3)}${L('M446 440V470M472 440V470M498 440V470M524 440V470M550 440V470','#5a3418',2)}</g>
   <g id="br" class="tb" style="transform-origin:500px 440px">${R(405,190,190,250,'#a0703a')}${L(pl,'#5a3418',3)}${L('M405 250H595M405 340H595M405 420H595','#3a3a40',10)}${R(405,190,190,250,'none','#5a3418',8)}${L('M405 190L380 150M595 190L620 150','#3a3a40',5)}${P('M462 214H538V250Q538 276 500 288Q462 276 462 250Z','#e8e0f8','#6a4a9a',3)}${U('krone',484,222,32,'#f2c14e')}</g>
   <g class="tb pl">${sPl(n,350)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'dornen';
const arten={dornen:[tuerDornen,'Dornenhecke mit Zahlenschloss'],zucker:[tuerZucker,'Pfefferkuchen-Tür mit Zahlenschloss'],zahnrad:[tuerZahnrad,'Steintor mit Zahnrad und Zahlenschloss'],drachen:[tuerDrachen,'Drachenmaul-Tor mit Zahlenschloss'],bruecke:[tuerBruecke,'Zugbrücke mit Zahlenschloss']};
const a=arten[art]||arten.dornen;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.maerchenwald={
name:"Der Märchenwald",
symbole:["buch","stern","krone","rose","zauberstab"],
symbolNamen:["Buch","Stern","Krone","Rose","Zauberstab"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="60" cy="45" r="40" fill="#e0d0f4" stroke="#6a4a9a" stroke-width="3"/><use href="#sym-buch" x="30" y="40" width="40" height="40" color="#7a4a8a"/><use href="#sym-krone" x="40" y="8" width="34" height="34" color="#f2a81e"/><use href="#sym-rose" x="68" y="40" width="30" height="30" color="#e8507a"/><use href="#sym-stern" x="22" y="18" width="20" height="20" color="#f2c14e"/></svg>`,
texte:{
einleitung:"Ihr schlagt in der Bibliothek ein altes Märchenbuch auf – und plötzlich zieht es euch hinein! Ihr steht mitten im Märchenwald. Die kleine Märchenfee flattert herbei und ruft: Nur wer alle Zahlenschlösser öffnet, findet den Weg ins Schloss zum großen Fest! Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände im Märchenwald. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zum Schloss?",
startKnopf:"Ins Märchen eintauchen",
hinweisGeber:"Die Märchenfee flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Märchenfee schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Mitternacht kommt!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und das Schloss trotzdem noch finden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg ins Schloss gefunden. Die Märchenfee ist stolz auf euch!"
},
texteDu:{
einleitung:"Du schlägst in der Bibliothek ein altes Märchenbuch auf – und plötzlich zieht es dich hinein! Du stehst mitten im Märchenwald. Die kleine Märchenfee flattert herbei und ruft: Nur wer alle Zahlenschlösser öffnet, findet den Weg ins Schloss zum großen Fest! Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände im Märchenwald. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zum Schloss?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Märchenfee schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und das Schloss trotzdem noch finden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg ins Schloss gefunden. Die Märchenfee ist stolz auf dich!"
},
einfach:{
name:"Der Märchenwald",
symbolNamen:["Buch","Stern","Krone","Rose","Zauberstab"],
texte:{
einleitung:"Ihr öffnet ein altes Märchen-Buch. Schwups! Ihr seid im Märchenwald. Die kleine Fee sagt: Öffnet alle Zahlenschlösser. Dann findet ihr das Schloss zum Fest. An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr das Schloss?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Mitternacht kommt!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und das Schloss gefunden. Die Fee ist stolz auf euch!"
},
texteDu:{
einleitung:"Du öffnest ein altes Märchen-Buch. Schwups! Du bist im Märchenwald. Die kleine Fee sagt: Öffne alle Zahlenschlösser. Dann findest du das Schloss zum Fest. An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du das Schloss?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und das Schloss gefunden. Die Fee ist stolz auf dich!"
},
raeume:[
{titel:"Die Waldlichtung",intro:"Hier blühen viele Blumen. Das Licht glitzert. Findet die Zahlen für die Rosen-Hecke!",introDu:"Hier blühen viele Blumen. Das Licht glitzert. Finde die Zahlen für die Rosen-Hecke!",
objekte:[{name:"Wegweiser",fund:"Am Wegweiser klebt:"},{name:"Märchenbuch",fund:"Im Buch liegt:"},{name:"Wunsch-Brunnen",fund:"Im Brunnen liegt:"},{name:"Rosen",fund:"Zwischen den Rosen hängt:"},{name:"Pilze",fund:"Bei den Pilzen liegt:"}],
infoObjekte:[{name:"Briefkasten",fund:"Im Briefkasten liegt:"},{name:"Bank mit Faltern",fund:"Auf der Bank liegt:"},{name:"Blumen-Schild",fund:"Hinter dem Schild klebt:"}]},
{titel:"Das Hexenhaus",intro:"Die Kräuter-Hexe ist nett. Es riecht nach Tee und Kräutern. Eine Tür aus Pfefferkuchen versperrt den Weg.",
objekte:[{name:"Kessel",fund:"Im Kessel liegt:"},{name:"Zauber-Tafel",fund:"An der Tafel klebt:"},{name:"Kräuter-Regal",fund:"Im Regal steckt:"},{name:"Besen",fund:"Am Besen hängt:"},{name:"Rezept-Buch",fund:"Im Buch liegt:"}],
infoObjekte:[{name:"Katze",fund:"Bei der Katze liegt:"},{name:"Teekanne",fund:"Neben der Kanne liegt:"},{name:"Sanduhr",fund:"An der Sanduhr klebt:"}]},
{titel:"Die Zwergenmine",intro:"Hier unten glitzern Kristalle. Die Zwerge haben Laternen. Das Steintor mit dem Zahnrad ist noch zu.",
objekte:[{name:"Laterne",fund:"An der Laterne klebt:"},{name:"Schubkarre",fund:"In der Schubkarre liegt:"},{name:"Werkzeug-Brett",fund:"Am Brett klebt:"},{name:"Lore",fund:"In der Lore liegt:"},{name:"Mützen-Ständer",fund:"An den Mützen hängt:"}],
infoObjekte:[{name:"Zwergen-Tafel",fund:"Hinter der Tafel klebt:"},{name:"Kristalle",fund:"Zwischen den Kristallen liegt:"},{name:"Erz-Steine",fund:"Bei den Steinen liegt:"}]},
{titel:"Die Drachenhöhle",intro:"Der kleine Drache hütet hier den Schatz. Er ist freundlich. Das Drachen-Maul ist das nächste Tor.",
objekte:[{name:"Goldhaufen",fund:"Im Gold liegt:"},{name:"Drachen-Ei",fund:"Am Ei klebt:"},{name:"Truhe",fund:"In der Truhe liegt:"},{name:"Zauberstab",fund:"Am Stab klebt:"},{name:"Kerze",fund:"An der Kerze klebt:"}],
infoObjekte:[{name:"Drachen-Nest",fund:"Im Nest liegt:"},{name:"Krone",fund:"Bei der Krone liegt:"},{name:"Reim-Zettel",fund:"Am Zettel klebt:"}]},
{titel:"Das Schlosstor",intro:"Es ist Abend. Das Schloss ist ganz nah. Hier ist das letzte Schloss. Öffnet es!",introDu:"Es ist Abend. Das Schloss ist ganz nah. Hier ist das letzte Schloss. Öffne es!",
objekte:[{name:"Wappen",fund:"Am Wappen klebt:"},{name:"Fahnen",fund:"An den Fahnen hängt:"},{name:"Turm-Uhr",fund:"An der Uhr klebt:"},{name:"Schloss-Brunnen",fund:"Im Brunnen liegt:"},{name:"Wächter-Bank",fund:"Auf der Bank liegt:"}],
infoObjekte:[{name:"Karte",fund:"Hinter der Karte klebt:"},{name:"Kutsche",fund:"In der Kutsche liegt:"},{name:"Laternen",fund:"An der Laterne klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Waldlichtung",
intro:"Auf der Waldlichtung blühen unzählige Blumen, und das Märchenlicht glitzert zwischen den Bäumen. Eine Dornenhecke mit Rosen versperrt den Weg. Findet die Ziffern, um sie zu öffnen!",
introDu:"Auf der Waldlichtung blühen unzählige Blumen, und das Märchenlicht glitzert zwischen den Bäumen. Eine Dornenhecke mit Rosen versperrt den Weg. Finde die Ziffern, um sie zu öffnen!",
tuerX:1300,tuerArt:"dornen",
hintergrund:()=>`${defs('#8ccf7a','#52a050','#fff8c8')}${R(0,0,1600,470,'url(#himmel)')}${C(1000,110,220,'url(#licht)')}${C(1000,110,46,'#fffbe0')}${E(300,90,90,22,'#fff')}${E(380,76,64,20,'#fff')}${E(1350,150,100,22,'#fff')}${P('M0 300Q300 220 600 290T1200 250T1600 290V470H0Z','#b8e0b0')}${R(1180,230,60,70,'#e0d0f0','#8a6aa8',2)}${P('M1170 232L1210 190L1250 232Z','#e07aa0')}${R(1250,250,36,50,'#e0d0f0','#8a6aa8',2)}${P('M1244 252L1268 214L1292 252Z','#7a9ae0')}${[60,420,640,1000,1520].map((x,k)=>C(x,300,56+k%2*14,'#9fd89a')+R(x-8,300,16,60,'#8a6a4a')).join('')}${[300,800].map(x=>`${stamm(x,90,'#8a6a4a')}${krone(x,30,110,'#58b05a')}`).join('')}${boden(1)}${P('M1000 780L1240 470H1360L1700 780Z','#f0dca8','rgba(0,0,0,.12)',3)}`,
objekte:[
{name:"Wegweiser mit Herz",x:300,y:230,wand:true,by:-70,zeichne:wegweiser,fund:"Am Wegweiser klebt:"},
{name:"Märchenbuch auf dem Stumpf",x:600,boden:620,fuss:4,by:-135,zeichne:buchstumpf,fund:"Im Märchenbuch liegt:"},
{name:"Wunschbrunnen",x:1000,boden:690,fuss:4,by:-150,zeichne:wunschbrunnen,fund:"Im Brunnen liegt:"},
{name:"Rosenbusch",x:150,boden:690,fuss:4,by:-110,zeichne:rosenbusch,fund:"Zwischen den Rosen hängt:"},
{name:"Pilzring",x:850,boden:740,fuss:4,by:-90,zeichne:pilzring,fund:"Im Pilzring liegt:"}
],
infoObjekte:[{name:"Fee-Briefkasten",x:800,y:260,wand:true,by:-80,zeichne:briefkasten,fund:"Im Briefkasten liegt:"},{name:"Schmetterlingsbank",x:450,boden:730,fuss:4,by:-145,zeichne:falterbank,fund:"Auf der Bank liegt:"},{name:"Blumenschild",x:1450,boden:650,fuss:4,by:-210,zeichne:blumenschild,fund:"Hinter dem Schild klebt:"}]},
{titel:"Das Hexenhaus",
intro:"Im Hexenhaus brodelt es gemütlich im Kessel, und ein warmes grünes Licht erfüllt den Raum. Die Kräuterhexe ist freundlich und hat dir eine Tür aus Pfefferkuchen gebacken. Irgendwo hier sind die Ziffern dafür versteckt …",
introDu:"Im Hexenhaus brodelt es gemütlich im Kessel, und ein warmes grünes Licht erfüllt den Raum. Die Kräuterhexe ist freundlich und hat dir eine Tür aus Pfefferkuchen gebacken. Irgendwo hier sind die Ziffern dafür versteckt …",
tuerX:400,tuerArt:"zucker",
hintergrund:()=>`${defs('#6a4a2a','#2e2210','#b8e87a')}${[...Array(16)].map((_,k)=>R(k*100,0,100,470,k%2?'#6a5a34':'#5e4e2c','#3a2e18',3)).join('')}${R(0,0,1600,34,'#3a2410')}${R(1380,100,150,170,'#1a3a4a','#3a2410',10)}${C(1460,160,24,'#fff6c8')}${stern(1420,220,5,'#fff')}${stern(1500,200,4,'#fff')}${L('M1455 100V270M1380 185H1530','#3a2410',6)}${[200,640,1000,1280].map((x,k)=>L(`M${x} 34V${80+k*8}`,'#3a2410',3)+E(x,100+k*8,12,26,['#6aa04a','#b070d0','#8a9a3a','#e8b02a'][k],'#2a2a18',2)).join('')}${C(900,300,430,'url(#licht)')}${boden(0)}${E(900,660,300,50,'#4f8a4a','#2a5a2a',3)}${E(900,660,200,28,'none','#c8e8a0',3)}`,
objekte:[
{name:"Hexenkessel",x:900,boden:620,fuss:4,by:-150,zeichne:kessel,fund:"Im Kessel liegt:"},
{name:"Zauberspruch-Tafel",x:800,y:240,wand:true,by:-75,zeichne:spruchtafel,fund:"An der Tafel klebt:"},
{name:"Kräuterregal",x:1450,boden:600,fuss:4,by:-190,zeichne:kraeuterregal,fund:"Zwischen den Kräutern steckt:"},
{name:"Hexenbesen",x:1150,boden:740,fuss:4,by:-205,zeichne:besen,fund:"Am Besen hängt:"},
{name:"Rezeptbuch",x:650,boden:720,fuss:4,by:-150,zeichne:rezeptbuch,fund:"Im Rezeptbuch liegt:"}
],
infoObjekte:[{name:"Schwarze Katze",x:1300,boden:690,fuss:4,by:-135,zeichne:katze,fund:"Bei der Katze liegt:"},{name:"Teekanne mit Tassen",x:1000,boden:740,fuss:4,by:-125,zeichne:teekanne,fund:"Neben der Teekanne liegt:"},{name:"Sanduhr",x:1150,y:230,wand:true,by:-80,zeichne:sanduhr,fund:"An der Sanduhr klebt:"}]},
{titel:"Die Zwergenmine",
intro:"In der Zwergenmine glitzern Kristalle in der Felswand, und die Laternen werfen bläuliches Licht. Das große Steintor mit dem Zahnrad ist noch geschlossen. Findet die Ziffern, um es zu öffnen!",
introDu:"In der Zwergenmine glitzern Kristalle in der Felswand, und die Laternen werfen bläuliches Licht. Das große Steintor mit dem Zahnrad ist noch geschlossen. Finde die Ziffern, um es zu öffnen!",
tuerX:900,tuerArt:"zahnrad",
hintergrund:()=>`${defs('#5a5478','#2a2640','#a8b8ff')}${R(0,0,1600,470,'#4a4668')}${[...Array(30)].map((_,k)=>E((k*211)%1600,(k*83)%430+20,40+k%4*14,26+k%3*8,k%2?'#56527a':'#403c5e')).join('')}${[[150,300],[560,140],[1250,380],[1480,120],[700,400]].map(([x,y],k)=>P(`M${x} ${y}L${x+10} ${y-44}L${x+22} ${y}ZM${x+14} ${y}L${x+30} ${y-30}L${x+40} ${y}Z`,['#b070f0','#7ab8f0','#f08ac0'][k%3],'rgba(255,255,255,.6)',2)).join('')}${R(0,0,1600,40,'#4a3018')}${[620,1180].map(x=>R(x,0,26,470,'#6a4a28','#3a2410',3)).join('')}${[[640,60],[1200,60],[250,100]].map(([x,y])=>R(x-2,34,4,y-34,'#333')+C(x,y+10,70,'url(#licht)')+R(x-12,y,24,24,'rgba(255,220,130,.8)','#3a3a48',2)).join('')}${boden(2)}${L('M0 700H1600M0 740H1600','#6a6a78',5)}${[...Array(30)].map((_,k)=>R(k*56,692,10,56,'#4a3018')).join('')}`,
objekte:[
{name:"Grubenlaterne",x:250,boden:700,fuss:4,by:-135,zeichne:laterne,fund:"An der Laterne klebt:"},
{name:"Schubkarre mit Edelsteinen",x:600,boden:650,fuss:4,by:-105,zeichne:schubkarre,fund:"In der Schubkarre liegt:"},
{name:"Werkzeugbrett",x:400,y:240,wand:true,by:-80,zeichne:werkzeugbrett,fund:"Am Brett klebt:"},
{name:"Kristall-Lore",x:1350,boden:620,fuss:4,by:-115,zeichne:lore,fund:"In der Lore liegt:"},
{name:"Mützenständer",x:1130,boden:600,fuss:4,by:-230,zeichne:muetzen,fund:"Zwischen den Mützen hängt:"}
],
infoObjekte:[{name:"Wegtafel der Zwerge",x:1250,y:240,wand:true,by:-70,zeichne:wegtafel,fund:"Hinter der Tafel klebt:"},{name:"Kristallgruppe",x:740,boden:740,fuss:4,by:-125,zeichne:kristalle,fund:"Zwischen den Kristallen liegt:"},{name:"Erzstufen",x:1500,boden:740,fuss:4,by:-70,zeichne:erzstufen,fund:"Bei den Erzstufen liegt:"}]},
{titel:"Die Drachenhöhle",
intro:"In der Drachenhöhle funkelt der Goldschatz im warmen roten Licht. Der kleine Drache, der den Schatz hütet, ist freundlich. Sein steinernes Maul ist das Tor zum nächsten Weg. Findet die Ziffern dafür!",
introDu:"In der Drachenhöhle funkelt der Goldschatz im warmen roten Licht. Der kleine Drache, der den Schatz hütet, ist freundlich. Sein steinernes Maul ist das Tor zum nächsten Weg. Finde die Ziffern dafür!",
tuerX:600,tuerArt:"drachen",
hintergrund:()=>`${defs('#7a4a30','#3a1a10','#ffa040')}${R(0,0,1600,470,'#5a2a22')}${[...Array(26)].map((_,k)=>E((k*257)%1600,(k*97)%420+20,44+k%4*14,28+k%3*8,k%2?'#6a342a':'#4a2018')).join('')}${[100,360,760,1040,1300,1540].map((x,k)=>P(`M${x-30} 0H${x+30}L${x} ${60+k%3*30}Z`,'#4a2018','#2a100c',2)).join('')}${P('M900 470Q1100 380 1300 410T1600 400V470Z','#d8a020')}${C(1100,440,440,'url(#licht)')}${R(0,0,1600,6,'#2a100c')}${boden(2)}${[...Array(30)].map((_,k)=>C((k*149)%1600,490+(k*61)%280,5,'rgba(255,214,90,.7)')).join('')}`,
objekte:[
{name:"Goldhaufen",x:1100,boden:700,fuss:4,by:-125,zeichne:goldhaufen,fund:"Im Gold liegt:"},
{name:"Drachenei",x:900,boden:620,fuss:4,by:-180,zeichne:drachenei,fund:"Am Drachenei klebt:"},
{name:"Schatztruhe",x:1450,boden:740,fuss:4,by:-145,zeichne:truhe,fund:"In der Schatztruhe liegt:"},
{name:"Zauberstab im Ständer",x:300,boden:600,fuss:4,by:-230,zeichne:stabstaender,fund:"Am Zauberstab klebt:"},
{name:"Kerzenhalter",x:250,y:250,wand:true,by:-60,zeichne:kerzenhalter,fund:"Am Kerzenhalter klebt:"}
],
infoObjekte:[{name:"Reimzettel",x:1250,y:240,wand:true,by:-80,zeichne:reimzettel,fund:"Am Zettel klebt:"},{name:"Drachennest",x:800,boden:730,fuss:4,by:-115,zeichne:nest,fund:"Im Nest liegt:"},{name:"Edelsteinkrone",x:1350,boden:640,fuss:4,by:-120,zeichne:edelkrone,fund:"Bei der Krone liegt:"}]},
{titel:"Das Schlosstor",
intro:"Das Abendrot färbt den Himmel, und das Schloss ragt vor euch auf. Eine Zugbrücke über dem Graben führt zum großen Tor mit dem letzten Zahlenschloss. Findet die Ziffern – das Fest wartet schon!",
introDu:"Das Abendrot färbt den Himmel, und das Schloss ragt vor dir auf. Eine Zugbrücke über dem Graben führt zum großen Tor mit dem letzten Zahlenschloss. Finde die Ziffern – das Fest wartet schon!",
tuerX:1100,tuerArt:"bruecke",
hintergrund:()=>`${defs('#a89880','#5a4a40','#ffc890')}<defs><linearGradient id="abend" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6ac0"/><stop offset=".6" stop-color="#f08a5a"/><stop offset="1" stop-color="#ffd890"/></linearGradient></defs>${R(0,0,1600,470,'url(#abend)')}${C(1300,120,26,'#fff6c8')}${[[200,40],[500,70],[760,30],[1000,60],[1450,40]].map(([x,y])=>C(x,y,2,'#fff')).join('')}${R(0,150,1600,320,'#bcae9e')}${[...Array(10)].map((_,k)=>L(`M0 ${170+k*32}H1600`,'rgba(90,70,60,.3)',2)).join('')}${[...Array(10)].map((_,k)=>L([...Array(27)].map((_,j)=>`M${j*60+(k%2)*30} ${170+k*32}v32`).join(''),'rgba(90,70,60,.3)',2)).join('')}${R(0,130,1600,24,'#a89a8a','#5a4a40',2)}${[...Array(18)].map((_,k)=>R(k*90+6,104,50,28,'#a89a8a','#5a4a40',2)).join('')}${R(40,40,130,430,'#b0a090','#5a4a40',4)}${P('M24 44L105 -20L186 44Z','#c8386a','#7a1a40',4)}${R(88,120,34,56,'#ffd890','#5a4a40',3)}${R(1440,50,130,420,'#b0a090','#5a4a40',4)}${P('M1424 54L1505 -10L1586 54Z','#5a7ac8','#2a3a7a',4)}${R(1488,130,34,56,'#ffd890','#5a4a40',3)}${C(1100,300,420,'url(#licht)')}${boden(2)}${[...Array(16)].map((_,k)=>R(k*110,740,70,26,'rgba(255,255,255,.12)')).join('')}`,
objekte:[
{name:"Schlosswappen",x:520,y:240,wand:true,by:-80,zeichne:wappen,fund:"Am Wappen klebt:"},
{name:"Fahnen am Tor",x:820,y:240,wand:true,by:-80,zeichne:fahnen,fund:"An den Fahnen hängt:"},
{name:"Wachturm-Uhr",x:1400,boden:610,fuss:4,by:-260,zeichne:turmuhr,fund:"An der Turmuhr klebt:"},
{name:"Schlossbrunnen",x:650,boden:700,fuss:4,by:-165,zeichne:schlossbrunnen,fund:"Im Brunnen liegt:"},
{name:"Wächter-Bank",x:900,boden:735,fuss:4,by:-100,zeichne:waechterbank,fund:"Auf der Bank liegt:"}
],
infoObjekte:[{name:"Märchenkarte",x:220,y:250,wand:true,by:-75,zeichne:karte,fund:"Hinter der Karte klebt:"},{name:"Kürbis-Kutsche",x:300,boden:740,fuss:4,by:-160,zeichne:kutsche,fund:"In der Kutsche liegt:"},{name:"Laternen am Weg",x:1350,boden:740,fuss:4,by:-245,zeichne:laternen,fund:"An der Laterne klebt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmelA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a6a"/><stop offset=".6" stop-color="#7a5ac0"/><stop offset="1" stop-color="#f0a0a0"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmelA)"/>${[[120,60],[300,120],[430,50],[620,90],[780,40],[900,130],[700,160]].map(([x,y])=>stern(x,y,7,'#fff6c8')).join('')}
   <path d="M0 400H1000V600H0Z" fill="#8a7a8a"/><path d="M0 300H80V220L110 200L140 220V300H260V260H300V300H700V260H740V300H860V220L890 200L920 220V300H1000V420H0Z" fill="#c8bce8"/>
   <path d="M60 220L110 150L160 220Z" fill="#e07aa0"/><path d="M840 220L890 150L940 220Z" fill="#5a7ac8"/>${[[110,250],[890,250],[500,300]].map(([x,y])=>R(x-10,y-14,20,28,'#ffd890')).join('')}
   <path d="M0 330Q250 380 500 340T1000 330" fill="none" stroke="#333" stroke-width="3"/>${[...Array(14)].map((_,k)=>C(k*72+30,345+Math.sin(k)*18,7,['#ffd060','#f08ac0','#7ab8f0'][k%3])).join('')}
   <path d="M240 330V420M620 330V420M760 330V420" stroke="#5a3a1c" stroke-width="5"/>${[[240,330,'#c0303a'],[620,330,'#7a5ac8'],[760,330,'#2e9ac8']].map(([x,y,c])=>P(`M${x} ${y}H${x+34}V${y+60}L${x+17} ${y+44}L${x} ${y+60}Z`,c,'#222',2)).join('')}
   <g transform="translate(400 500)">${R(-60,-30,120,20,'#a0703e','#4a2a10',3)}${R(-50,-10,10,30,'#7a5230')}${R(40,-10,10,30,'#7a5230')}${C(-30,-42,10,'#f6d84a')}${C(0,-42,10,'#e8507a')}${C(30,-42,10,'#7ad06a')}</g>
   <g transform="translate(700 480)">${C(0,-10,14,'rgba(255,246,200,.8)')}${E(-22,-26,16,8,'rgba(255,255,255,.8)','#c8d8f8',1.5)}${E(20,-26,16,8,'rgba(255,255,255,.8)','#c8d8f8',1.5)}${P('M-6 -2L-12 22L0 12L12 22L6 -2Z','#f08ac0')}${C(0,-18,7,'#f6d8b8')}${L('M-30 40Q-60 70 -90 60M-50 50l-10 -10','#f6d84a',3)}${stern(-100,50,6,'#fff6c8')}${stern(-70,66,4,'#fff6c8')}</g>
   <path d="M0 0H1000V600H0Z M200 600V180H800V600Z" fill="#7a6a8a" fill-rule="evenodd"/><path d="M200 600V180H800V600" stroke="#3a2a4a" stroke-width="18" fill="none"/><path d="M150 186L500 40L850 186Z" fill="#7a4a9a" stroke="#3a1a5a" stroke-width="6"/>${U('krone',470,84,60,'#f2c14e')}`
};
})();