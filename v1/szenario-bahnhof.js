document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-fahrkarte\" viewBox=\"-20 -20 40 40\"><path fill-rule=\"evenodd\" d=\"M-17 -10H17V-4Q13 0 17 4V10H-17V4Q-13 0 -17 -4ZM-10 -4H4V-1H-10ZM-10 2H0V5H-10Z\" fill=\"currentColor\"/><path d=\"M9 -8V8\" stroke=\"currentColor\" stroke-width=\"2\" stroke-dasharray=\"3 3\" fill=\"none\"/></symbol>\n<symbol id=\"sym-uhr\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"0\" cy=\"0\" r=\"16\"/><path d=\"M0 -10V0L8 5\"/><path d=\"M0 -16V-13M16 0H13M0 16V13M-16 0H-13\"/></g></symbol>\n<symbol id=\"sym-zug\" viewBox=\"-20 -20 40 40\"><path d=\"M-12 -16H12Q16 -16 16 -12V8Q16 12 12 12H-12Q-16 12 -16 8V-12Q-16 -16 -12 -16Z M-11 -10H11V0H-11Z\" fill=\"currentColor\" fill-rule=\"evenodd\"/><circle cx=\"-8\" cy=\"5\" r=\"2.4\" fill=\"currentColor\"/><circle cx=\"8\" cy=\"5\" r=\"2.4\" fill=\"currentColor\"/><path d=\"M-12 16L-8 12M12 16L8 12M-16 18H16\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" fill=\"none\"/></symbol>\n<symbol id=\"sym-signal\" viewBox=\"-20 -20 40 40\"><path d=\"M-9 -19H9V3H-9Z\" fill=\"currentColor\"/><path d=\"M0 3V19M-8 19H8\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\" fill=\"none\"/><circle cx=\"0\" cy=\"-12\" r=\"3.4\" fill=\"#fff\" opacity=\".55\"/><circle cx=\"0\" cy=\"-3\" r=\"3.4\" fill=\"#fff\" opacity=\".55\"/></symbol>\n<symbol id=\"sym-koffer\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-16 -8H16V14H-16Z\"/><path d=\"M-7 -8V-14H7V-8\"/><path d=\"M-6 -8V14M6 -8V14\"/></g></symbol>\n</defs>\n</svg>");
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
const zf=(r,c)=>[0,1,2,3,4,5,6,7,8,9,10,11].map(k=>{const a=k*Math.PI/6,s=Math.sin(a),o=-Math.cos(a);return L(`M${(s*r*.85).toFixed(1)} ${(o*r*.85).toFixed(1)}L${(s*r).toFixed(1)} ${(o*r).toFixed(1)}`,c,k%3?2:4);}).join('');
const hd=(a,l,w,c)=>L(`M0 0L${(Math.sin(a)*l).toFixed(1)} ${(-Math.cos(a)*l).toFixed(1)}`,c,w);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ab8ec"/><stop offset="1" stop-color="#fbeed0"/></linearGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==1){for(const y of[490,515,545,580,620,665,715,770])d+=`M0 ${y}H1600`;for(let x=0;x<1600;x+=160)d+=`M${x} 470V780`;return g+L(d,'rgba(0,0,0,.25)',3);}
if(m==2){for(const y of[510,560,620,690,770])d+=`M0 ${y}H1600`;return g+R(0,478,1600,10,'#f2c14e')+L(d,'rgba(0,0,0,.14)',3);}
for(let x=-1600;x<=3200;x+=140)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return g+L(d,'rgba(0,0,0,.2)',2);}
const uhrG=()=>`${R(-4,-230,8,170,'#555')}${C(0,0,64,'#fff','#2a2a30',8)}${zf(54,'#222')}${hd(5.3,32,5,'#222')}${hd(.84,46,3,'#222')}${C(0,0,4,'#c0392b')}`;
const automat=()=>`${sch(46)}${R(-40,-150,80,150,'#2e6cb0','#173a66',4)}${R(-30,-136,60,40,'#bfe8f0','#173a66',3)}${R(-22,-128,44,6,'#2e6cb0')}${R(-22,-116,30,5,'#2e6cb0')}${[0,1,2].map(i=>[0,1].map(j=>R(-28+i*20,-84+j*16,14,10,'#e8e8ee','#173a66',1.5)).join('')).join('')}${R(-26,-28,52,18,'#173a66')}${R(-12,-26,24,10,'#f6e8c0')}`;
const koffer=()=>`${sch(80)}${R(-70,-60,90,60,'#8a5a30','#4a2a10',3)}${R(-52,-60,6,60,'#4a2a10')}${R(-4,-60,6,60,'#4a2a10')}${R(-30,-68,36,8,'#555')}${R(-60,-116,70,56,'#c0392b','#6a1a10',3)}${R(-16,-124,26,8,'#555')}${R(30,-84,44,84,'#2f7a8a','#17434c',3)}${R(40,-96,24,12,'#555')}${C(52,-40,5,'#f2c14e')}`;
const kiosk=()=>`${sch(80)}${R(-72,-130,144,130,'#c8a060','#6a4a20',4)}${R(-62,-80,124,80,'#8a6a3a')}${[-62,-36,-10,16,42].map((x,k)=>R(x,-122,26,34,['#fff','#f4b8b8','#bfe0f0','#fff','#f2e08a'][k],'#666',1.5)).join('')}${P('M-84 -130L-72 -168H72L84 -130Z','#fff','#6a4a20',3)}${[-72,-16,40].map(x=>P(`M${x} -168h28l4 38h-32Z`,'#c0392b')).join('')}${R(-62,-88,124,8,'#6a4a20')}${R(-16,-56,32,6,'#d8b070')}`;
const gleisplan=()=>`${sch(60)}${L('M-40 0L-30 -110M40 0L30 -110','#6a4a2a',6)}${R(-66,-150,132,92,'#fff','#2a3a5a',4)}${L('M-56 -90H56M-56 -125H20Q40 -125 56 -105','#2a3a5a',3)}${L('M-56 -74H56','#c0392b',3)}${[-30,0,30].map(x=>R(x-6,-104,12,20,'#2e6cb0')).join('')}`;
const fahrplan=()=>`${L('M-90 -60V-250M90 -60V-250','#555',4)}${R(-100,-60,200,120,'#1c2a3a','#555',4)}${R(-92,-52,184,16,'#f2c14e')}${[0,1,2,3].map(k=>R(-88,-26+k*20,36,8,'#fff')+R(-40,-26+k*20,70,8,'#9ec8f0')+R(46,-26+k*20,40,8,k%2?'#8fe08f':'#f2c14e')).join('')}`;
const wartebank=()=>`${sch(66)}${R(-62,-96,124,28,'#a0703e','#5a3a1c',3)}${R(-62,-56,124,8,'#a0703e','#5a3a1c',2)}${R(-62,-44,124,8,'#a0703e','#5a3a1c',2)}${R(-56,-36,8,36,'#555')}${R(48,-36,8,36,'#555')}${L('M-56 -68V-48M56 -68V-48','#555',5)}${P('M-30 -56L-20 -80L-4 -56Z','#e67e22')}`;
const saeule=()=>`${sch(30)}${R(-20,-180,40,180,'#d8dce4','#6a7280',3)}${C(0,-140,22,'#2e6cb0','#fff',3)}${R(-3,-152,6,6,'#fff')}${R(-3,-142,6,16,'#fff')}${R(-14,-100,28,40,'#fff','#6a7280',2)}${L('M-8 -90H8M-8 -80H8M-8 -70H4','#999',2)}`;
const uhrB=()=>`${R(-4,-240,8,190,'#555')}${R(-34,-58,68,8,'#555')}${C(0,0,50,'#fffdf2','#2a5a3a',9)}${zf(42,'#2a2a30')}${hd(4.45,26,5,'#222')}${hd(3.14,38,3,'#222')}${C(0,0,4,'#222')}`;
const lichtsig=()=>`${sch(30)}${R(-6,-180,12,180,'#444')}${R(-24,-190,48,70,'#222','#000',2)}${P('M-28 -190H28L22 -200H-22Z','#555')}${C(0,-170,12,'#e74c3c')}${C(0,-146,12,'#555')}${R(-16,-100,32,20,'#f2f2f2','#c0392b',2)}`;
const weiche=()=>`${sch(60)}${R(-60,-6,120,6,'#8a8f98')}${R(-26,-30,52,26,'#3a5a8a','#1a2a4a',3)}${L('M0 -30L-20 -98','#c0392b',9)}${C(-22,-104,10,'#c0392b','#6a1a10',2)}${R(-8,-24,16,8,'#f2c14e')}${L('M-60 -14H-30','#8a8f98',4)}`;
const wagenstand=()=>`${sch(20)}${R(-5,-160,10,160,'#555')}${R(-80,-170,160,64,'#2e6cb0','#173a66',4)}${[0,1,2,3].map(k=>R(-72+k*36,-160,32,30,'#fff')+R(-66+k*36,-152,20,10,k%2?'#c0392b':'#2e6cb0')).join('')}${P('M-60 -118H60L72 -126V-110L60 -118','#fff')}`;
const radstaender=()=>`${sch(76)}${R(-70,-4,140,6,'#555')}${[-56,-20,16,52].map(x=>L(`M${x} 0V-34Q${x} -48 ${x+12} -34V0`,'#666',5)).join('')}${C(-34,-30,22,'none','#222',4)}${C(34,-30,22,'none','#222',4)}${L('M-34 -30L-8 -30L-20 -60H-38M-8 -30L18 -60H32M18 -60L34 -30','#e67e22',4)}${R(-46,-66,20,6,'#222')}`;
const streckenkarte=()=>`${R(-76,40,12,180,'#555')}${R(64,40,12,180,'#555')}${R(-90,-60,180,120,'#f6f0dc','#555',4)}${L('M-80 -30Q-40 -10 -20 -40T40 -20T80 -40','#5dade2',6)}${L('M-70 30Q-30 -30 0 10T70 -30','#c0392b',4)}${[[-70,30],[0,10],[70,-30]].map(([x,y])=>C(x,y,8,'#fff','#2a3a5a',3)).join('')}`;
const laterne=()=>`${sch(24)}${R(-4,-190,8,190,'#2a3a2a')}${P('M-16 -190H16L10 -164H-10Z','#2a3a2a')}${R(-12,-226,24,36,'#fff6c8','#2a3a2a',3)}${P('M-20 -226L0 -246L20 -226Z','#2a3a2a')}${C(0,-208,40,'url(#licht)')}`;
const plakat=()=>`${sch(70)}${L('M-60 0V-70M60 0V-70','#555',8)}${R(-76,-170,152,100,'#fff','#555',5)}${R(-68,-162,136,84,'#bfe4f8')}${P('M-68 -78L-30 -130L0 -100L30 -140L68 -78Z','#6a8a6a')}${C(40,-140,12,'#f2c14e')}${P('M-68 -78L68 -78L68 -86H-68Z','#4a7a4a')}`;
const speisekarte=()=>`${R(-60,-80,120,160,'#5a3410','#a07a40',5)}${R(-50,-70,100,140,'#f6e8c0')}${R(-40,-62,80,10,'#c0392b')}${[0,1,2,3,4].map(k=>L(`M-38 ${-36+k*20}H${k%2?10:30}`,'#6a4a2a',3)+C(38,-36+k*20,3,'#6a4a2a')).join('')}`;
const kaffee=()=>`${sch(70)}${R(-70,-60,140,60,'#6a4a2a','#3a2410',3)}${R(-30,-130,60,70,'#c8ccd4','#555',3)}${R(-8,-72,16,10,'#555')}${R(-12,-58,24,16,'#fff','#888',2)}${C(18,-110,5,'#e74c3c')}${R(-22,-122,30,14,'#333')}${L('M-4 -56Q-12 -70 -2 -78','rgba(255,255,255,.8)',3)}`;
const tablett=()=>`${sch(56)}${R(-5,-60,10,60,'#555')}${E(0,0,30,6,'#555')}${E(0,-62,56,10,'#8a5a30','#4a2a10',3)}${E(0,-70,46,7,'#c8ccd4','#6a7078',2)}${R(-28,-90,22,20,'#fff','#888',2)}${P('M8 -74Q20 -96 36 -76Z','#e8b050','#a07020',2)}${E(-17,-90,11,3,'#6a3a1a')}`;
const obstkorb=()=>`${sch(52)}${P('M-50 -50Q-44 0 0 0Q44 0 50 -50Z','#c8903a','#7a5420',3)}${L('M-44 -36H44M-38 -20H38','#7a5420',2)}${[[-26,-58,'#e74c3c'],[0,-64,'#f2c14e'],[26,-58,'#e74c3c'],[-12,-80,'#8cc040'],[14,-80,'#e67e22']].map(([x,y,c])=>C(x,y,15,c,'rgba(0,0,0,.25)',1.5)).join('')}`;
const tischlampe=()=>`${sch(56)}${R(-5,-70,10,70,'#555')}${E(0,0,28,6,'#555')}${E(0,-72,60,10,'#8a5a30','#4a2a10',3)}${L('M0 -80V-120','#c8a040',5)}${P('M-24 -112L-14 -146H14L24 -112Z','#e74c3c','#8a2a1a',2)}${C(0,-104,48,'url(#licht)')}`;
const getraenke=()=>`${sch(64)}${R(-56,-90,112,70,'#c8ccd4','#6a7078',3)}${R(-56,-52,112,5,'#6a7078')}${[[-40,'#2e86c1'],[-20,'#e67e22'],[0,'#2ecc71'],[20,'#e74c3c']].map(([x,c])=>R(x-6,-118,12,28,c,'#333',1.5)+R(x-3,-126,6,8,'#555')).join('')}${L('M56 -90L72 -120','#555',5)}${C(-38,-12,12,'#222')}${C(38,-12,12,'#222')}${R(30,-84,18,22,'#fff','#888',1.5)}`;
const rezepttafel=()=>`${R(-70,-70,140,140,'#2a4a3a','#8a6238',6)}${C(-30,-30,20,'#fff')}${P('M-50 -30H-10L-16 0H-44Z','#fff')}${L('M10 -44H56M10 -28H48M10 -12H56M-52 20H52M-52 40H30','#fff',3)}${C(-30,-48,3,'#fff')}`;
const zeitung=()=>`${sch(52)}${R(-46,-40,92,6,'#8a5a30','#4a2a10',2)}${R(-40,-34,6,34,'#555')}${R(34,-34,6,34,'#555')}${P('M-52 -42L-40 -90H40L52 -42Z','#f0eee4','#888',2)}${R(-34,-82,68,12,'#222')}${R(-34,-64,30,22,'#9ab0c0')}${L('M0 -62H32M0 -54H32M-34 -46H32','#888',2)}${R(30,-76,16,10,'#fff','#888',1.5)}`;
const paketregal=()=>`${L('M-70 80L-70 20M70 80L70 20','#6a4a2a',6)}${R(-84,-100,168,8,'#8a6238','#3a2410',2)}${R(-84,-30,168,8,'#8a6238','#3a2410',2)}${R(-84,40,168,8,'#8a6238','#3a2410',2)}${[[-70,-100,'#c8a060',50,40],[-14,-100,'#b08040',46,30],[40,-100,'#d8b878',36,46]].map(([x,y,c,w,h])=>R(x,y-h+8,w,h-8,c,'#6a4a22',2)+R(x+w/2-3,y-h+8,6,h-8,'#a0703e')).join('')}${[[-74,-30,'#b08040',44,34],[-22,-30,'#c8a060',56,26],[44,-30,'#d8b878',32,40]].map(([x,y,c,w,h])=>R(x,y-h+8,w,h-8,c,'#6a4a22',2)+L(`M${x} ${y-h+8}L${x+w} ${y}`,'#6a4a22',2)).join('')}`;
const waage=()=>`${sch(52)}${R(-50,-16,100,16,'#555','#222',2)}${R(-8,-100,16,84,'#8a8f98','#4a5058',2)}${C(0,-116,30,'#fff','#222',4)}${zf(24,'#222')}${hd(1.2,20,3,'#c0392b')}${R(-44,-30,88,14,'#c8ccd4','#6a7078',2)}${R(-18,-42,36,12,'#c8a060','#6a4a22',2)}`;
const postsack=()=>`${sch(52)}${P('M-44 0Q-56 -50 -22 -86L-14 -96Q0 -88 14 -96L22 -86Q56 -50 44 0Z','#c8b078','#7a6030',3)}${L('M-16 -92Q0 -84 16 -92','#6a4a22',5)}${C(0,-50,18,'#f2c14e','#7a6030',2)}${L('M-6 -56V-44M6 -56V-44M-6 -50H6','#7a6030',3)}${L('M-26 -20Q-20 -30 -26 -40','#a89050',2)}`;
const fahrrad=()=>`${sch(72)}${C(-44,-36,34,'none','#222',5)}${C(44,-36,34,'none','#222',5)}${L('M-44 -36L-8 -36L-24 -84H-40M-8 -36L28 -84M28 -84L44 -36M-24 -84H28','#2e86c1',6)}${R(-50,-92,28,8,'#222')}${L('M28 -84L36 -96H52','#222',5)}${R(-10,-78,16,10,'#f2c14e','#6a5a10',1.5)}`;
const holzkiste=()=>`${sch(56)}${R(-50,-100,100,100,'#b88a50','#5a3a1c',4)}${L('M-50 -66H50M-50 -34H50','#8a5a2a',3)}${L('M-48 -98L48 -2M48 -98L-48 -2','#8a5a2a',5)}${R(-24,-88,48,26,'#f6e8c0','#6a4a22',2)}${L('M-16 -80H16M-16 -70H8','#c0392b',3)}`;
const ladeplan=()=>`${R(-80,-60,160,120,'#e8dcb8','#6a4a22',5)}${[0,1,2,3].map(i=>[0,1,2].map(j=>R(-72+i*37,-52+j*36,32,30,['#e74c3c','#2e86c1','#f2c14e','#2ecc71','#c8a060','#9b59b6'][(i+j*2)%6],'#6a4a22',1.5)).join('')).join('')}${L('M-80 -60L-86 -70M80 -60L86 -70','#6a4a22',3)}`;
const frachtbrief=()=>`${sch(50)}${R(-40,-70,80,70,'#8a6a3a','#4a3018',3)}${R(-34,-70,6,70,'#6a4a22')}${P('M-36 -70L36 -70L28 -98L-28 -98Z','#fff','#888',2)}${L('M-20 -90H20M-22 -82H22M-24 -74H12','#6a6a7a',2)}${R(-10,-106,20,10,'#8a8f98')}${C(24,-84,5,'#c0392b')}`;
const karren=()=>`${sch(50)}${L('M-24 -130L-4 -12H40','#2e6cb0',8)}${L('M-30 -90L-14 -90','#2e6cb0',6)}${R(-24,-84,50,14,'#8a8f98','#555',2)}${R(-10,-130,40,40,'#c8a060','#6a4a22',3)}${C(20,-14,16,'#222','#555',3)}${C(20,-14,5,'#8a8f98')}`;
const tacho=()=>`${R(-80,-80,160,160,'#3a4a5a','#1a222c',5)}${C(0,0,62,'#1a2430','#8a8f98',7)}${L('M-44 24A50 50 0 0 1 -30 -36','#2ecc71',6)}${L('M-14 -48A50 50 0 0 1 40 -22','#f2c14e',6)}${L('M40 -22A50 50 0 0 1 48 16','#e74c3c',6)}${zf(54,'#fff')}${hd(2.2,44,5,'#e74c3c')}${C(0,0,6,'#ddd')}${R(-24,34,48,12,'#0a0f14','#6a7280',1.5)}`;
const schreiber=()=>`${sch(56)}${R(-50,-90,100,90,'#6a7480','#2a3440',4)}${R(-34,-76,68,52,'#fff','#2a3440',2)}${L('M-30 -40L-20 -60L-10 -34L2 -64L14 -36L26 -58L30 -50','#2e86c1',3)}${C(-34,-12,6,'#f2c14e')}${C(-12,-12,6,'#e74c3c')}${C(10,-12,6,'#2ecc71')}${R(26,-16,16,8,'#222')}`;
const funk=()=>`${sch(50)}${R(-34,-30,68,30,'#3a4a5a','#1a222c',3)}${R(-40,-70,80,40,'#566678','#1a222c',3)}${R(-32,-62,36,16,'#9ae0a0','#1a222c',2)}${C(22,-54,8,'#222')}${C(22,-54,3,'#e74c3c')}${L('M30 -70L44 -120','#555',4)}${R(-30,-40,16,8,'#c0392b')}${L('M-34 -22Q-60 -20 -52 -4','#222',3)}${R(-62,-8,16,10,'#222')}`;
const hebel=()=>`${sch(60)}${R(-56,-40,112,40,'#555','#222',3)}${[[-34,'#c0392b',-100],[0,'#f2c14e',-110],[34,'#2e7d32',-96]].map(([x,c,y])=>L(`M${x} -40L${x+(x<0?-6:6)} ${y}`,'#8a8f98',7)+C(x+(x<0?-6:6),y,10,c,'#222',2)).join('')}${R(-44,-30,88,8,'#f2f2f2')}`;
const pult=()=>`${sch(56)}${R(-40,-70,10,70,'#555')}${R(30,-70,10,70,'#555')}${P('M-56 -88L56 -88L48 -66H-48Z','#8a6a3a','#4a3018',3)}${P('M-44 -90L44 -90L38 -108H-38Z','#fff','#888',2)}${L('M-26 -100H26M-28 -95H24','#6a6a7a',2)}${R(-10,-66,20,24,'#6a4a22')}`;
const wetterkarte=()=>`${R(-76,-75,152,150,'#bfe0f0','#5a6a7a',5)}${P('M-70 -10Q-30 -40 0 -10T70 -20V70H-70Z','#8cc06a')}${C(-36,-44,16,'#f2c14e')}${E(20,-46,30,13,'#fff')}${E(40,-54,20,10,'#fff')}${E(-10,24,28,11,'#9aa8b4')}${L('M-26 40V54M-14 40V54M-2 40V54','#2e86c1',3)}${R(46,10,10,44,'#e74c3c')}`;
const taschenuhr=()=>`${sch(44)}${E(0,-6,40,10,'#8a2a3a','#4a1020',3)}${C(0,-50,38,'#f2d37a','#8a6a1a',5)}${C(0,-50,30,'#fffdf2')}${R(-6,-96,12,10,'#f2d37a','#8a6a1a',2)}${L('M0 -96Q-24 -112 -14 -90','#c8a040',3)}<g transform="translate(0 -50)">${zf(26,'#222')}${hd(1.8,16,4,'#222')}${hd(3.6,24,3,'#222')}</g>`;
const pfeife=()=>`${sch(36)}${R(-8,-70,16,70,'#c8a040','#7a5a10',2)}${R(-22,-100,44,34,'#d8b050','#7a5a10',3)}${R(-26,-110,52,10,'#c8a040','#7a5a10',2)}${R(-18,-170,36,60,'#d8b050','#7a5a10',3)}${R(-22,-178,44,10,'#c8a040','#7a5a10',2)}${[[-10,-196,12],[10,-208,15],[-4,-228,11]].map(([x,y,r])=>C(x,y,r,'rgba(255,255,255,.85)')).join('')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen #sb{transform:rotate(-78deg)}.tuer.offen .pl{opacity:0}.tuer.offen #zl{transform:scaleX(.14)}.tuer.offen #zr{transform:scaleX(.14)}.tuer #ts{transform:scaleY(.05)}.tuer.offen #ts{transform:none}.tuer.offen #bs{transform:translateX(-180px)}.tuer.offen #rt{transform:translateX(190px)}.tuer.offen #rd{opacity:0}.tuer #gn{opacity:0}.tuer.offen #gn{opacity:1}.tuer.offen #sr{transform:rotate(-78deg)}</style>`;
function tuerSchranke(n){
let s='';for(let k=0;k<5;k++)s+=R(412+k*40,320,40,20,k%2?'#fff':'#e74c3c','#8a2a1a',2);
return`${R(410,190,180,280,'#cfeaff')}${C(540,250,90,'url(#licht)')}${C(540,250,22,'#fff6c8')}${R(410,300,180,70,'#2e6cb0','#173a66',3)}${[0,1,2,3].map(k=>R(424+k*42,312,30,26,'#bfe8f0')).join('')}${P('M410 380H590V470H410Z','#d8d0bc')}${R(410,376,180,8,'#f2c14e')}${P('M430 470L470 400H530L570 470Z','#c8bea4')}${R(604,310,22,160,'#58606e','#2a3440',3)}${R(490,430,20,40,'#6b4a24','#3a2410',3)}${R(420,372,160,56,'#2a5a8a','#173a66',4)}${sPl(n,400)}
   <g id="sb" class="tb" style="transform-origin:412px 330px">${s}</g>
   ${R(380,290,50,180,'#58606e','#2a3440',4)}${C(405,310,10,'#e74c3c','#2a3440',2)}${R(398,350,14,40,'#2a3440')}`;
}
function tuerZug(n){
const fl=(x,id,o,hx)=>`<g id="${id}" class="tb" style="transform-origin:${o}px 330px">${R(x,190,90,280,'#dfe3ea','#6a7280',4)}${R(x+14,214,62,90,'#9ad0f0','#6a7280',3)}${R(hx,390,8,36,'#555')}${R(x,430,90,40,'#c0392b')}</g>`;
return`${R(360,150,280,320,'#dfe3ea','#6a7280',5)}${R(360,430,280,40,'#c0392b')}${R(360,160,280,14,'#6a7280')}${R(410,190,180,280,'#ffe9b8')}${R(424,300,44,70,'#2e6cb0','#173a66',2)}${R(532,300,44,70,'#2e6cb0','#173a66',2)}${R(476,344,48,8,'#8a5a30')}${C(500,260,70,'url(#licht)')}${R(410,190,180,10,'#fff6c8')}
   ${fl(410,'zl',410,486)}${fl(500,'zr',590,506)}
   <g id="ts" class="tb" style="transform-origin:500px 470px">${R(420,462,160,14,'#8a8f98','#4a5058',3)}${R(430,456,140,8,'#6a7280')}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerBalg(n){
let b='';for(let k=0;k<6;k++){const d=k*13;b+=R(410+d,190+d*.9,180-2*d,280-d*.9,'none',k%2?'#2a2a32':'#6a6a78',5);}
return`<defs><clipPath id="bclip"><rect x="300" y="170" width="290" height="300"/></clipPath></defs>${R(300,150,330,320,'#c9885a','#5a3410',5)}${R(410,190,180,280,'#3a3a44')}${R(466,240,68,230,'#fff4cc')}${b}${C(500,330,120,'url(#licht)')}
   <g clip-path="url(#bclip)"><g id="bs" class="tb">${R(410,190,180,280,'#9aa4b0','#4a5058',4)}${R(430,214,140,110,'#9ad0f0','#4a5058',4)}${L('M470 214V324','#fff',3)}${R(410,430,180,40,'#7a8490')}${R(420,340,10,50,'#555')}</g></g>
   ${R(300,170,110,300,'#c9885a','#5a3410',4)}${L('M322 190V460M352 190V460M382 190V460','#a8683a',3)}${R(590,170,40,300,'#c9885a','#5a3410',4)}${R(300,160,330,16,'#8a5a30','#5a3410',3)}
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerRoll(n){
let p='';for(let x=430;x<590;x+=24)p+=`M${x} 190V470`;
return`<defs><clipPath id="rclip"><rect x="380" y="170" width="270" height="300"/></clipPath></defs>${P('M376 470V170H650V470Z','#6a4a2a','#2a1a10',5)}${R(410,190,180,280,'#141c28')}${R(430,214,140,70,'url(#himmel)','#555',4)}${[[438,'#e74c3c'],[470,'#f2c14e'],[502,'#2ecc71'],[534,'#3498db'],[566,'#e67e22']].map(([x,c],k)=>C(x,330,8,c)+C(x,360+k%2*12,6,c)).join('')}${C(500,330,130,'url(#licht)')}${R(410,440,180,30,'#2a3440')}
   <g clip-path="url(#rclip)"><g id="rt" class="tb">${R(410,190,180,280,'#8a5a30','#3a2410',4)}${L(p,'#6a4220',3)}${L('M410 190L590 470M410 470L590 190','#6a4220',8)}${sPl(n,330)}</g></g>
   ${R(590,170,60,300,'#6a4a2a','#2a1a10',4)}${R(376,170,274,14,'#555566','#2a2a32',2)}${C(440,188,7,'#333')}${C(560,188,7,'#333')}`;
}
function tuerSignal(n){
let t='';for(let k=0;k<5;k++)t+=`M${474-k*8} ${470-k*26}H${526+k*8}`;
return`<defs><clipPath id="gclip"><rect x="410" y="190" width="180" height="280"/></clipPath></defs>${R(374,170,252,300,'#3a4a5c','#1a222c',5)}
   <g clip-path="url(#gclip)">${R(410,190,180,280,'#4a5a9a')}${R(410,250,180,60,'#e8a070')}${P('M410 330Q470 290 520 320T590 310V470H410Z','#2a4a3a')}${P('M410 470L486 330H514L590 470Z','#5a5a64')}${L('M470 470L490 330M530 470L510 330','#c8ccd4',3)}${L(t,'#3a3a44',4)}${C(500,300,120,'url(#licht)')}${R(494,296,12,174,'#8a8f98','#3a3a44',2)}${R(470,196,60,100,'#222','#000',3)}${C(500,246,24,'#333')}
   <g id="gn" class="tb">${C(500,246,46,'rgba(80,255,120,.35)')}${C(500,246,24,'#2ecc71')}</g>
   <g id="rd" class="tb">${C(500,246,46,'rgba(255,60,40,.35)')}${C(500,246,24,'#e74c3c')}</g></g>
   <g class="tb pl">${R(416,356,168,64,'#f2f2f2','#c0392b',4)}${sPl(n,388)}</g>
   ${R(396,426,28,44,'#6a7280','#2a3440',3)}
   <g id="sr" class="tb" style="transform-origin:412px 438px">${[0,1,2,3,4].map(k=>R(412+k*35,432,35,12,k%2?'#fff':'#e74c3c','#8a2a1a',2)).join('')}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'schranke';
const arten={schranke:[tuerSchranke,'Bahnsteigschranke mit Zahlenschloss'],zugtuer:[tuerZug,'Falttür am Zug mit Zahlenschloss'],balg:[tuerBalg,'Schiebetür am Wagenübergang mit Zahlenschloss'],rolltuer:[tuerRoll,'Rolltür mit Zahlenschloss'],signal:[tuerSignal,'Signal mit Zahlenschloss']};
const a=arten[art]||arten.schranke;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.bahnhof={
name:"Der Bahnhof",
symbole:["fahrkarte","uhr","zug","signal","koffer"],
symbolNamen:["Fahrkarte","Uhr","Zug","Signal","Koffer"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="60" cy="45" r="40" fill="#bfe4f8" stroke="#2a4a7a" stroke-width="3"/><use href="#sym-zug" x="30" y="14" width="46" height="46" color="#c0392b"/><use href="#sym-uhr" x="68" y="40" width="30" height="30" color="#2a4a7a"/><use href="#sym-fahrkarte" x="22" y="48" width="28" height="28" color="#e67e22"/></svg>`,
texte:{
einleitung:"Ihr wartet am Bahnhof auf den Zug in den Ferienort. Kurz vor der Abfahrt sind alle Durchgänge verriegelt! Die Zugführerin hat ein Rätselspiel für euch versteckt: Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände am Bahnhof und im Zug. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wenn ihr den Lokführerstand erreicht und das Signal auf Grün stellt, fährt der Zug los. Schafft ihr es?",
startKnopf:"Zum Bahnhof gehen",
hinweisGeber:"Die Zugbegleiterin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Zugbegleiterin schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen aufgedruckt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Der Zug fährt ab!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Lokführerstand trotzdem noch erreichen!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Zug in den Ferienort gestartet. Die Zugführerin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du wartest am Bahnhof auf den Zug in den Ferienort. Kurz vor der Abfahrt sind alle Durchgänge verriegelt! Die Zugführerin hat ein Rätselspiel für dich versteckt: Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände am Bahnhof und im Zug. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wenn du den Lokführerstand erreichst und das Signal auf Grün stellst, fährt der Zug los. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Zugbegleiterin schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen aufgedruckt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Lokführerstand trotzdem noch erreichen!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Zug in den Ferienort gestartet. Die Zugführerin ist stolz auf dich!"
},
einfach:{
name:"Der Bahnhof",
symbolNamen:["Fahrkarte","Uhr","Zug","Signal","Koffer"],
texte:{
einleitung:"Ihr wartet am Bahnhof auf den Zug. Er fährt in den Ferienort. Aber alle Durchgänge sind zu! Die Zugführerin hat ein Rätsel-Spiel versteckt. An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben. Für jede richtige Aufgabe bekommt ihr eine Zahl. Geht bis zum Lokführerstand. Stellt das Signal auf Grün. Dann fährt der Zug los!",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Der Zug fährt ab!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Der Zug fährt in den Ferienort!"
},
texteDu:{
einleitung:"Du wartest am Bahnhof auf den Zug. Er fährt in den Ferienort. Aber alle Durchgänge sind zu! Die Zugführerin hat ein Rätsel-Spiel versteckt. An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben. Für jede richtige Aufgabe bekommst du eine Zahl. Geh bis zum Lokführerstand. Stelle das Signal auf Grün. Dann fährt der Zug los!",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Der Zug fährt in den Ferienort!"
},
raeume:[
{titel:"Die Bahnhofshalle",intro:"Die Halle ist groß und hell. Der Zug wartet schon. Aber die Schranke ist zu. Findet die Zahlen für das Schloss!",introDu:"Die Halle ist groß und hell. Der Zug wartet schon. Aber die Schranke ist zu. Finde die Zahlen für das Schloss!",
objekte:[{name:"Große Uhr",fund:"An der Uhr klebt:"},{name:"Automat für Fahrkarten",fund:"Im Automaten liegt:"},{name:"Koffer",fund:"Im Koffer liegt:"},{name:"Kiosk mit Zeitungen",fund:"Im Kiosk liegt:"},{name:"Plan der Gleise",fund:"Am Plan klebt:"}],
infoObjekte:[{name:"Tafel mit Zügen",fund:"Hinter der Tafel klebt:"},{name:"Bank zum Warten",fund:"Auf der Bank liegt:"},{name:"Säule mit Auskunft",fund:"An der Säule klebt:"}]},
{titel:"Das Gleis",intro:"Die Morgensonne scheint. Der lange Zug steht bereit. Die Tür am Wagen ist noch zu.",
objekte:[{name:"Uhr am Gleis",fund:"An der Uhr klebt:"},{name:"Licht-Signal",fund:"Am Signal klebt:"},{name:"Hebel für die Weiche",fund:"Am Hebel klebt:"},{name:"Tafel mit Wagen",fund:"An der Tafel klebt:"},{name:"Ständer für Räder",fund:"Am Fahrrad klebt:"}],
infoObjekte:[{name:"Karte der Strecke",fund:"Hinter der Karte steckt:"},{name:"Lampe am Gleis",fund:"An der Lampe klebt:"},{name:"Wand mit Plakat",fund:"Hinter dem Plakat klebt:"}]},
{titel:"Der Speisewagen",intro:"Hier riecht es nach Kaffee. Das Licht ist warm. Die Tür zum nächsten Wagen ist zu. Findet die Zahlen dafür!",introDu:"Hier riecht es nach Kaffee. Das Licht ist warm. Die Tür zum nächsten Wagen ist zu. Finde die Zahlen dafür!",
objekte:[{name:"Karte mit Essen",fund:"Hinter der Karte klebt:"},{name:"Kaffee-Automat",fund:"Am Automaten klebt:"},{name:"Tablett mit Tasse",fund:"Auf dem Tablett liegt:"},{name:"Korb mit Obst",fund:"Zwischen dem Obst liegt:"},{name:"Lampe am Tisch",fund:"An der Lampe klebt:"}],
infoObjekte:[{name:"Tafel mit Rezept",fund:"An der Tafel klebt:"},{name:"Wagen mit Getränken",fund:"Im Wagen liegt:"},{name:"Zeitung von heute",fund:"In der Zeitung steckt:"}]},
{titel:"Der Gepäckwagen",intro:"Hier stehen Kisten, Säcke und Pakete. Das Licht ist schwach. Die große Tür ist zu. Löst die Aufgaben!",introDu:"Hier stehen Kisten, Säcke und Pakete. Das Licht ist schwach. Die große Tür ist zu. Löse die Aufgaben!",
objekte:[{name:"Regal mit Paketen",fund:"Zwischen den Paketen steckt:"},{name:"Waage für Gepäck",fund:"An der Waage klebt:"},{name:"Sack mit Post",fund:"Im Sack steckt:"},{name:"Rad im Wagen",fund:"Am Rad klebt:"},{name:"Kiste aus Holz",fund:"In der Kiste liegt:"}],
infoObjekte:[{name:"Plan für die Ladung",fund:"Am Plan klebt:"},{name:"Zettel für die Fracht",fund:"Auf dem Pult liegt:"},{name:"Karre zum Schieben",fund:"Auf der Karre liegt:"}]},
{titel:"Der Lokführerstand",intro:"Viele kleine Lichter blinken. Ihr seht die Gleise. Das Signal ist noch rot. Hier ist das letzte Schloss. Öffnet es!",introDu:"Viele kleine Lichter blinken. Du siehst die Gleise. Das Signal ist noch rot. Hier ist das letzte Schloss. Öffne es!",
objekte:[{name:"Anzeige für das Tempo",fund:"An der Anzeige klebt:"},{name:"Schreiber für die Fahrt",fund:"Am Schreiber klebt:"},{name:"Funk",fund:"Am Funk klebt:"},{name:"Hebel fürs Signal",fund:"Am Hebel klebt:"},{name:"Pult mit Plan",fund:"Auf dem Pult liegt:"}],
infoObjekte:[{name:"Karte vom Wetter",fund:"An der Karte klebt:"},{name:"Uhr in der Tasche",fund:"An der Uhr klebt:"},{name:"Pfeife vom Zug",fund:"An der Pfeife klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Bahnhofshalle",
intro:"In der hohen Bahnhofshalle ist es hell und still. Die große Uhr tickt, und der Zug wartet schon am Bahnsteig. Aber die Schranke ist verriegelt! Findet die Ziffern für das Zahlenschloss!",
introDu:"In der hohen Bahnhofshalle ist es hell und still. Die große Uhr tickt, und der Zug wartet schon am Bahnsteig. Aber die Schranke ist verriegelt! Finde die Ziffern für das Zahlenschloss!",
tuerX:1300,tuerArt:"schranke",
hintergrund:()=>`${defs('#b8aa90','#6a5e48','#fff2c0')}${R(0,0,1600,470,'#e9e1cf')}${R(0,0,1600,66,'#58606e')}${[0,1,2,3,4,5,6,7].map(k=>L(`M${k*230} 66Q${k*230+115} 0 ${k*230+230} 66`,'#3a424e',6)).join('')}${[100,420,740,1060,1380].map(x=>R(x,76,130,150,'#d8f0ff','#58606e',8)+L(`M${x+65} 76V226M${x} 151H${x+130}`,'#58606e',5)).join('')}${[100,740,1380].map(x=>P(`M${x+20} 226L${x+130} 226L${x+330} 470L${x+120} 470Z`,'rgba(255,248,200,.22)')).join('')}${R(0,380,1600,90,'#c8b894')}${L('M0 380H1600','#8a7a58',4)}${C(800,520,420,'url(#licht)')}${boden(0)}`,
objekte:[
{name:"Bahnhofsuhr",x:800,y:230,wand:true,by:-90,zeichne:uhrG,fund:"An der Bahnhofsuhr klebt:"},
{name:"Fahrkartenautomat",x:650,boden:590,fuss:4,by:-172,zeichne:automat,fund:"Im Fahrkartenautomaten liegt:"},
{name:"Koffer",x:1000,boden:700,fuss:4,by:-146,zeichne:koffer,fund:"Im Koffer liegt:"},
{name:"Zeitungskiosk",x:200,boden:600,fuss:4,by:-190,zeichne:kiosk,fund:"Im Zeitungskiosk liegt:"},
{name:"Gleisplan",x:1480,boden:740,fuss:4,by:-172,zeichne:gleisplan,fund:"Am Gleisplan klebt:"}
],
infoObjekte:[{name:"Fahrplantafel",x:450,y:250,wand:true,by:-80,zeichne:fahrplan,fund:"Hinter der Fahrplantafel klebt:"},{name:"Wartebank",x:330,boden:730,fuss:4,by:-118,zeichne:wartebank,fund:"Auf der Wartebank liegt:"},{name:"Infosäule",x:880,boden:650,fuss:4,by:-202,zeichne:saeule,fund:"An der Infosäule klebt:"}]},
{titel:"Das Gleis",
intro:"Auf dem Gleis scheint die Morgensonne unter das Bahnsteigdach. Der lange Zug steht bereit, aber die Wagentür ist noch zu. Irgendwo hier sind die Ziffern für das Schloss versteckt …",
tuerX:500,tuerArt:"zugtuer",
hintergrund:()=>`${defs('#a8a498','#5a5850','#fff0c0')}${R(0,0,1600,470,'url(#himmel)')}${C(1350,300,220,'url(#licht)')}${C(1350,300,46,'#fff6c8')}${P('M0 330Q300 250 600 320T1200 300T1600 320V470H0Z','#7aa08a')}${P('M0 380Q400 330 900 370T1600 350V470H0Z','#5a8a6a')}${[200,330,1100,1250].map((x,k)=>R(x,350-k%2*10,50,40,'#e8d8c0','#8a7a60',2)+P(`M${x-6} 350L${x+25} 326L${x+56} 350Z`,'#b0502a')).join('')}${R(0,420,1600,50,'#6a6458')}${L('M0 436H1600M0 456H1600','#c8ccd4',4)}${[...Array(40)].map((_,k)=>R(k*40,430,14,36,'rgba(60,40,20,.5)')).join('')}${R(0,0,1600,56,'#6a7a8a')}${P('M0 56H1600V80Q800 66 0 80Z','#4a5868')}${[160,690,1000,1500].map(x=>R(x,80,20,390,'#8a96a4','#4a5868',3)).join('')}${boden(2)}`,
objekte:[
{name:"Bahnsteig-Uhr",x:800,y:240,wand:true,by:-80,zeichne:uhrB,fund:"An der Bahnsteig-Uhr klebt:"},
{name:"Lichtsignal",x:1050,boden:600,fuss:4,by:-215,zeichne:lichtsig,fund:"Am Lichtsignal klebt:"},
{name:"Weichenschalter",x:1400,boden:700,fuss:4,by:-125,zeichne:weiche,fund:"Am Weichenschalter klebt:"},
{name:"Wagenstandsanzeiger",x:750,boden:590,fuss:4,by:-190,zeichne:wagenstand,fund:"Am Wagenstandsanzeiger klebt:"},
{name:"Fahrradständer",x:200,boden:720,fuss:4,by:-95,zeichne:radstaender,fund:"Am Fahrrad klebt:"}
],
infoObjekte:[{name:"Streckenkarte",x:1250,y:250,wand:true,by:-85,zeichne:streckenkarte,fund:"Hinter der Streckenkarte steckt:"},{name:"Bahnsteig-Laterne",x:900,boden:730,fuss:4,by:-268,zeichne:laterne,fund:"An der Laterne klebt:"},{name:"Plakatwand",x:1500,boden:590,fuss:4,by:-192,zeichne:plakat,fund:"Hinter dem Plakat klebt:"}]},
{titel:"Der Speisewagen",
intro:"Im Speisewagen duftet es nach Kaffee und Kuchen. Warmes Licht fällt auf die Tische. Die Tür zum nächsten Wagen ist verriegelt. Findet die Ziffern dafür!",
introDu:"Im Speisewagen duftet es nach Kaffee und Kuchen. Warmes Licht fällt auf die Tische. Die Tür zum nächsten Wagen ist verriegelt. Finde die Ziffern dafür!",
tuerX:1200,tuerArt:"balg",
hintergrund:()=>`${defs('#7a2a2a','#3a1414','#ffd890')}${R(0,0,1600,470,'#d6a874')}${R(0,0,1600,40,'#8a5a30')}${[0,1,2,3,4,5].map(k=>R(40+k*260,50,200,110,'#9ad0f0','#5a3410',8)+P(`M${48+k*260} 160Q${100+k*260} 110 ${150+k*260} 140T${240+k*260} 120V152H${48+k*260}Z`,'#6aa06a')+L(`M${140+k*260} 50V160`,'#5a3410',5)).join('')}${R(0,330,1600,140,'#8a5a30')}${L('M0 330H1600M0 360H1600','#5a3410',4)}${[200,560,900].map(x=>R(x,396,90,10,'#6a3a1c')+R(x+40,406,10,64,'#6a3a1c')+C(x+45,380,26,'url(#licht)')).join('')}${C(700,300,420,'url(#licht)')}${boden(0)}`,
objekte:[
{name:"Speisekarte",x:300,y:240,wand:true,by:-105,zeichne:speisekarte,fund:"Hinter der Speisekarte klebt:"},
{name:"Kaffeemaschine",x:700,boden:590,fuss:4,by:-152,zeichne:kaffee,fund:"An der Kaffeemaschine klebt:"},
{name:"Tablett",x:420,boden:700,fuss:4,by:-112,zeichne:tablett,fund:"Auf dem Tablett liegt:"},
{name:"Obstkorb",x:1020,boden:610,fuss:4,by:-112,zeichne:obstkorb,fund:"Zwischen dem Obst liegt:"},
{name:"Tischlampe",x:1460,boden:680,fuss:4,by:-160,zeichne:tischlampe,fund:"An der Tischlampe klebt:"}
],
infoObjekte:[{name:"Rezepttafel",x:700,y:250,wand:true,by:-95,zeichne:rezepttafel,fund:"An der Rezepttafel klebt:"},{name:"Getränkewagen",x:920,boden:740,fuss:4,by:-132,zeichne:getraenke,fund:"Im Getränkewagen liegt:"},{name:"Tageszeitung",x:200,boden:600,fuss:4,by:-112,zeichne:zeitung,fund:"In der Zeitung steckt:"}]},
{titel:"Der Gepäckwagen",
intro:"Im Gepäckwagen stehen Kisten, Säcke und Pakete. Das Licht ist gedämpft, und es riecht nach Holz. Die große Schiebetür ist abgeschlossen. Löst die Aufgaben, um sie zu öffnen!",
introDu:"Im Gepäckwagen stehen Kisten, Säcke und Pakete. Das Licht ist gedämpft, und es riecht nach Holz. Die große Schiebetür ist abgeschlossen. Löse die Aufgaben, um sie zu öffnen!",
tuerX:700,tuerArt:"rolltuer",
hintergrund:()=>`${defs('#8a6a3a','#3a2a14','#ffc870')}${[...Array(10)].map((_,k)=>R(0,k*47,1600,47,k%2?'#8a6a42':'#7a5c38','#4a3018',3)).join('')}${R(0,0,1600,30,'#4a3018')}${[60,860,1540].map(x=>R(x,30,24,440,'#5a3c1c','#3a2410',3)).join('')}${R(1340,300,220,170,'#a07a44','#4a3018',3)}${R(1380,230,150,70,'#b88a50','#4a3018',3)}${L('M800 30V110','#333',3)}${R(784,110,32,26,'#ffd890','#333',3)}${C(800,124,60,'url(#licht)')}${C(400,50,300,'url(#licht)')}${boden(1)}`,
objekte:[
{name:"Paketregal",x:300,y:250,wand:true,by:-125,zeichne:paketregal,fund:"Zwischen den Paketen steckt:"},
{name:"Gepäckwaage",x:1000,boden:620,fuss:4,by:-160,zeichne:waage,fund:"An der Gepäckwaage klebt:"},
{name:"Postsack",x:1420,boden:700,fuss:4,by:-122,zeichne:postsack,fund:"Im Postsack steckt:"},
{name:"Fahrrad",x:450,boden:700,fuss:4,by:-95,zeichne:fahrrad,fund:"Am Fahrrad klebt:"},
{name:"Holzkiste",x:1220,boden:600,fuss:4,by:-122,zeichne:holzkiste,fund:"In der Holzkiste liegt:"}
],
infoObjekte:[{name:"Ladeplan",x:1100,y:230,wand:true,by:-85,zeichne:ladeplan,fund:"Am Ladeplan klebt:"},{name:"Frachtbrief",x:120,boden:620,fuss:4,by:-112,zeichne:frachtbrief,fund:"Auf dem Frachtbrief liegt:"},{name:"Laufkarren",x:880,boden:740,fuss:4,by:-150,zeichne:karren,fund:"Auf dem Laufkarren liegt:"}]},
{titel:"Der Lokführerstand",
intro:"Im Lokführerstand blinken viele kleine Lämpchen im Dämmerlicht. Durch die Frontscheibe seht ihr die Gleise. Das Signal steht noch auf Rot. Hier ist das letzte Schloss – öffnet es!",
introDu:"Im Lokführerstand blinken viele kleine Lämpchen im Dämmerlicht. Durch die Frontscheibe siehst du die Gleise. Das Signal steht noch auf Rot. Hier ist das letzte Schloss – öffne es!",
tuerX:1000,tuerArt:"signal",
hintergrund:()=>`${defs('#3a4658','#1a222c','#7ab0e0')}<defs><linearGradient id="dawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6ac0"/><stop offset="1" stop-color="#f4a878"/></linearGradient></defs>${R(0,0,1600,470,'#2c3a4a')}${R(100,30,1400,150,'url(#dawn)','#1a222c',10)}${P('M100 150Q300 110 500 140T900 120T1300 140T1500 130V180H100Z','#3a5a4a')}${P('M720 180L790 128H810L880 180Z','#5a5a64')}${L('M776 180L796 128M824 180L804 128','#c8ccd4',3)}${R(420,30,16,150,'#1a222c')}${R(1160,30,16,150,'#1a222c')}${C(1300,120,26,'#ffe8b0')}${R(0,186,1600,284,'#33445a')}${L('M0 186H1600M0 220H1600','#1a222c',4)}${[...Array(26)].map((_,k)=>C(30+k*62,204,5,['#e74c3c','#f2c14e','#2ecc71','#3498db'][k%4])).join('')}${C(1000,330,300,'url(#licht)')}${boden(1)}`,
objekte:[
{name:"Geschwindigkeitsanzeige",x:400,y:250,wand:true,by:-105,zeichne:tacho,fund:"An der Geschwindigkeitsanzeige klebt:"},
{name:"Fahrtenschreiber",x:580,boden:620,fuss:4,by:-112,zeichne:schreiber,fund:"Am Fahrtenschreiber klebt:"},
{name:"Funkgerät",x:260,boden:690,fuss:4,by:-132,zeichne:funk,fund:"Am Funkgerät klebt:"},
{name:"Signalhebel",x:1400,boden:620,fuss:4,by:-132,zeichne:hebel,fund:"Am Signalhebel klebt:"},
{name:"Fahrplan-Pult",x:800,boden:720,fuss:4,by:-132,zeichne:pult,fund:"Auf dem Pult liegt:"}
],
infoObjekte:[{name:"Wetterkarte",x:700,y:250,wand:true,by:-100,zeichne:wetterkarte,fund:"An der Wetterkarte klebt:"},{name:"Taschenuhr",x:1230,boden:730,fuss:4,by:-112,zeichne:taschenuhr,fund:"An der Taschenuhr klebt:"},{name:"Zugpfeife",x:100,boden:740,fuss:4,by:-250,zeichne:pfeife,fund:"An der Zugpfeife klebt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmelA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a8ad0"/><stop offset=".55" stop-color="#f4a070"/><stop offset="1" stop-color="#ffe0a0"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmelA)"/><circle cx="640" cy="330" r="90" fill="#fff6c8" opacity=".4"/><circle cx="640" cy="330" r="42" fill="#fff0b0"/>
   <path d="M0 360Q160 300 330 350T700 340T1000 330V600H0Z" fill="#6a8a6a"/><path d="M0 420Q250 380 520 420T1000 400V600H0Z" fill="#4a7a4a"/>
   <rect x="0" y="440" width="1000" height="80" fill="#4a9ad0"/><path d="M0 470q40-8 80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0t80 0" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="3"/>
   <path d="M200 424Q280 470 360 424M360 424Q440 470 520 424M520 424Q600 470 680 424" fill="none" stroke="#7a7a84" stroke-width="8"/>${[200,360,520,680].map(x=>R(x-8,424,16,60,'#7a7a84')).join('')}${R(150,410,580,14,'#8a8a94','#4a4a54',2)}
   <g transform="translate(0 410)">${[0,1,2].map(k=>R(180+k*96,-40,90,34,'#e8e4da','#8a8a94',2)+R(180+k*96,-16,90,8,'#c0392b')+[0,1,2].map(j=>R(190+k*96+j*28,-34,20,14,'#9ad0f0')).join('')).join('')}${R(480,-44,100,38,'#c0392b','#6a1a10',2)}${R(480,-62,38,20,'#a0301f')}${R(552,-58,12,16,'#444')}${P('M580 -6V-44L606 -6Z','#a0301f')}${R(488,-34,20,12,'#9ad0f0')}${[196,276,370,452,520,572].map(x=>C(x,-4,6,'#333')).join('')}</g>
   <path d="M120 470H470L530 520H120Z" fill="#cfc8b4"/><rect x="120" y="470" width="350" height="6" fill="#f2c14e"/>${[[180,'#e74c3c'],[250,'#2e86c1'],[320,'#2ecc71'],[390,'#f2c14e']].map(([x,c],k)=>`<g transform="translate(${x} 516)">${R(-9,-40,18,40,c)}${C(0,-50,10,'#f0c8a0')}${P('M-10 -54Q0 -68 10 -54Z',k%2?'#4a2a10':'#2a2a2a')}${L(k%2?'M-9 -34L-20 -60M9 -34L20 -56':'M-9 -34L-18 -52M9 -34L22 -62','#f0c8a0',4)}</g>`).join('')}
   <path d="M0 0H1000V600H0Z M120 130H880V520H120Z" fill="#2a3440" fill-rule="evenodd"/><path d="M120 520V130H880V520" stroke="#1a222c" stroke-width="14" fill="none"/><path d="M500 130V80" stroke="#1a222c" stroke-width="10"/>${U('zug',470,40,60,'#f2c14e')}`
};
})();