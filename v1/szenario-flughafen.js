document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-flugzeug\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -18Q3 -18 3 -12V-4L17 4V9L3 5V12L8 15V18L0 16L-8 18V15L-3 12V5L-17 9V4L-3 -4V-12Q-3 -18 0 -18Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-koffer\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-13 -9H13V13H-13Z\"/><path d=\"M-5 -9V-15H5V-9\"/><path d=\"M-13 3H13\"/><path d=\"M-9 13V17M9 13V17\"/></g></symbol>\n<symbol id=\"sym-weltkugel\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><circle cx=\"0\" cy=\"0\" r=\"16\"/><ellipse cx=\"0\" cy=\"0\" rx=\"7\" ry=\"16\"/><path d=\"M-16 0H16M-13 -8H13M-13 8H13\"/></g></symbol>\n<symbol id=\"sym-ticket\" viewBox=\"-20 -20 40 40\"><path fill-rule=\"evenodd\" d=\"M-18 -11H18V11H-18ZM-13 -6H-1V-3H-13ZM-13 1H-5V4H-13Z\" fill=\"currentColor\"/><path d=\"M6 -7V7M10 -7V7M14 -7V7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/></symbol>\n<symbol id=\"sym-kompass\" viewBox=\"-20 -20 40 40\"><circle cx=\"0\" cy=\"0\" r=\"16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M0 -11L5 0H-5Z\" fill=\"currentColor\"/><path d=\"M0 11L5 0H-5Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M0 -16V-13M16 0H13M0 16V13M-16 0H-13\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const st=(s,k)=>s?` stroke="${s}" stroke-width="${k}"`:'';
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${st(s,k)}/>`;
const C=(x,y,r,f,s,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${st(s,k)}/>`;
const E=(x,y,a,b,f,s,k)=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${f}"${st(s,k)}/>`;
const P=(d,f,s,k)=>`<path d="${d}" fill="${f}"${st(s,k)}/>`;
const L=(d,s,k)=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${k}" stroke-linecap="round"/>`;
const U=(id,x,y,w,c)=>`<use href="#sym-${id}" x="${x}" y="${y}" width="${w}" height="${w}" color="${c}"/>`;
const T=(x,y,s,c,t)=>`<text x="${x}" y="${y}" font-size="${s}" font-weight="bold" fill="${c}" text-anchor="middle" font-family="Arial,sans-serif">${t}</text>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.3)');
const zf=(r,c)=>[0,1,2,3,4,5,6,7,8,9,10,11].map(k=>{const a=k*Math.PI/6,s=Math.sin(a),o=-Math.cos(a);return L(`M${(s*r*.85).toFixed(1)} ${(o*r*.85).toFixed(1)}L${(s*r).toFixed(1)} ${(o*r).toFixed(1)}`,c,k%3?2:4);}).join('');
const hd=(a,l,w,c)=>L(`M0 0L${(Math.sin(a)*l).toFixed(1)} ${(-Math.cos(a)*l).toFixed(1)}`,c,w);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ab0ec"/><stop offset="1" stop-color="#fbeed0"/></linearGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==1){for(const y of[490,515,545,580,620,665,715,770])d+=`M0 ${y}H1600`;for(let x=0;x<1600;x+=160)d+=`M${x} 470V780`;return g+L(d,'rgba(0,0,0,.25)',3);}
if(m==2){for(const y of[510,560,620,690,770])d+=`M0 ${y}H1600`;return g+R(0,478,1600,10,'#f2c14e')+L(d,'rgba(0,0,0,.14)',3);}
for(let x=-1600;x<=3200;x+=140)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return g+L(d,'rgba(0,0,0,.2)',2);}
const abflug=()=>`${R(-90,-62,180,124,'#10182a','#6a7280',5)}${R(-82,-54,164,14,'#f2c14e')}${[0,1,2,3].map(k=>R(-78,-30+k*21,34,9,'#fff')+R(-34,-30+k*21,56,9,'#9ec8f0')+R(32,-30+k*21,44,9,k%2?'#8fe08f':'#f2c14e')).join('')}${L('M-60 -62V-80M60 -62V-80','#555',4)}`;
const waage=()=>`${sch(70)}${R(-64,-22,128,22,'#8a8f98','#3a4048',3)}${R(-54,-30,108,10,'#c8ccd4','#6a7078',2)}${R(-14,-120,28,98,'#6a7280','#2a3440',3)}${R(-36,-170,72,52,'#111','#555',3)}${R(-28,-162,56,30,'#9ae0a0')}${L('M-18 -150H18','#1a4a2a',4)}${R(-46,-70,56,40,'#c0392b','#6a1a10',3)}${L('M-28 -70V-78H-8V-70','#6a1a10',3)}`;
const stempel=()=>`${sch(60)}${R(-56,-70,112,70,'#8a6a3a','#4a3018',3)}${R(-62,-78,124,10,'#a07a44','#4a3018',2)}${R(-30,-110,24,34,'#c0392b','#6a1a10',2)}${R(-34,-118,32,10,'#333')}${R(14,-98,34,20,'#2e6cb0','#173a66',2)}${C(31,-88,6,'#f2c14e')}`;
const kofferA=()=>`${sch(60)}${R(-48,-110,96,110,'#2e6cb0','#173a66',4)}${R(-18,-126,36,16,'none','#173a66',5)}${R(-48,-70,96,6,'#173a66')}${C(-24,-92,11,'#f2c14e')}${P('M10 -100L24 -80L38 -100Z','#e74c3c')}${R(-34,-54,24,18,'#fff')}${C(20,-44,10,'#2ecc71')}${C(-32,4,6,'#222')}${C(32,4,6,'#222')}`;
const schalter=()=>`${sch(100)}${R(-92,-80,184,80,'#c8ccd4','#6a7280',4)}${R(-92,-88,184,12,'#2e6cb0')}${R(-84,-66,168,4,'#fff')}${R(-80,-170,60,50,'#222','#000',3)}${R(-74,-164,48,36,'#9ad0f0')}${R(-52,-120,4,32,'#555')}${R(30,-150,56,30,'#fff','#2e6cb0',3)}${L('M38 -140H78M38 -130H64','#2e6cb0',3)}${R(-20,-96,40,8,'#555')}`;
const weltuhr=()=>`${R(-96,-50,192,100,'#1c2a3a','#8a96a4',5)}${[-60,0,60].map((x,k)=>C(x,-6,24,'#fff','#555',3)+L(`M${x} -6V-22M${x} -6L${x+10+k*3} 2`,'#222',3)+R(x-22,26,44,10,'#f2c14e')).join('')}${L('M-60 -50V-70M60 -50V-70','#555',4)}`;
const infosaeule=()=>`${sch(30)}${R(-18,-170,36,170,'#2e6cb0','#173a66',3)}${C(0,-136,22,'#fff')}${R(-3,-152,6,12,'#2e6cb0')}${C(0,-122,3,'#2e6cb0')}${R(-14,-96,28,52,'#9ad0f0','#173a66',2)}${L('M-8 -84H8M-8 -74H8M-8 -64H2','#fff',3)}`;
const fahnen=()=>`${sch(50)}${R(-40,-8,80,8,'#555')}${[[-34,'#c0392b','#fff'],[0,'#2e6cb0','#f2c14e'],[34,'#2e7d32','#fff']].map(([x,a,b],k)=>R(x-2,-150+k*10,4,150-k*10,'#8a8f98')+R(x+2,-150+k*10,30,22,a)+R(x+2,-139+k*10,30,6,b)).join('')}`;
const bandschild=()=>`${R(-80,-34,160,68,'#f2c14e','#6a5a10',4)}${L('M-70 -34V-60M70 -34V-60','#555',4)}${R(-70,-22,140,12,'#222')}${P('M-40 14H20V4L40 18L20 32V22H-40Z','#222')}`;
const bandnr=()=>`${R(-50,-44,100,88,'#111','#555',4)}${R(-42,-36,84,60,'#1a2a4a')}${T(0,12,50,'#f2c14e','3')}${R(-42,28,84,8,'#2ecc71')}${L('M-30 -44V-62M30 -44V-62','#555',4)}`;
const kofferB=()=>`${sch(56)}${R(-50,-76,100,76,'#2f7a8a','#17434c',4)}${R(-18,-92,36,16,'none','#17434c',5)}${R(-50,-44,100,5,'#17434c')}${L('M30 -76Q50 -60 46 -40','#222',2)}${R(36,-40,24,32,'#fff','#888',2)}${L('M40 -32H56M40 -24H52','#c0392b',2)}${C(-34,4,6,'#222')}${C(34,4,6,'#222')}`;
const fundkiste=()=>`${sch(60)}${R(-54,-70,108,70,'#b88a50','#5a3a1c',4)}${L('M-54 -40H54','#8a5a2a',3)}${R(-36,-88,18,20,'#e74c3c')}${P('M-8 -70L4 -104L16 -70Z','#2e86c1')}${C(34,-80,10,'#f2c14e','#7a5a10',2)}${R(-30,-58,60,22,'#f6e8c0','#6a4a22',2)}${L('M-22 -48H22','#6a4a22',3)}`;
const rollwagen=()=>`${sch(70)}${L('M-60 -100V-20H60','#8a8f98',6)}${R(-64,-24,128,10,'#555')}${R(-50,-60,56,36,'#c0392b','#6a1a10',3)}${R(-40,-96,44,36,'#2f7a8a','#17434c',3)}${R(10,-50,44,26,'#f2c14e','#7a5a10',3)}${C(-40,-6,9,'#222')}${C(40,-6,9,'#222')}`;
const wetterkarte=()=>`${R(-84,-60,168,120,'#bfe0f0','#5a6a7a',5)}${P('M-70 -20Q-50 -50 -20 -34T20 -30Q40 -10 20 10T-30 30Q-60 20 -70 -20Z','#8cc06a')}${P('M30 -40L50 -48L64 -20L44 -10Z','#8cc06a')}${C(-36,-14,10,'#f2c14e')}${E(34,20,16,8,'#fff','#888',1.5)}${L('M-6 30V42M2 30V42M10 30V42','#2e86c1',3)}${R(-84,36,168,24,'#fff','#5a6a7a',3)}${L('M-70 48H70','#999',3)}`;
const reisetasche=()=>`${sch(56)}${P('M-52 0Q-60 -56 -30 -60H30Q60 -56 52 0Z','#e67e22','#8a4a10',4)}${L('M-24 -60Q0 -96 24 -60','#6a3a10',6)}${R(-52,-26,104,5,'#8a4a10')}${C(0,-20,6,'#f2c14e')}${R(-30,-44,60,8,'#8a4a10')}`;
const regelaufst=()=>`${sch(50)}${L('M-40 0L-24 -70M40 0L24 -70','#555',6)}${R(-54,-166,108,100,'#fff','#c0392b',5)}${R(-44,-156,88,16,'#c0392b')}${L('M-38 -126H38M-38 -112H30M-38 -98H38M-38 -84H20','#6a6a7a',3)}${C(36,-80,6,'#c0392b')}`;
const handgep=()=>`${R(-80,-60,160,120,'#fff','#2e6cb0',5)}${R(-80,-60,160,14,'#2e6cb0')}${R(-34,-34,68,52,'#2e6cb0')}${R(-14,-46,28,12,'none','#2e6cb0',4)}${L('M-52 30H52M-52 24V36M52 24V36M-50 -34V18M-56 -34H-44M-56 18H-44','#c0392b',3)}${L('M-60 -60V-76M60 -60V-76','#555',4)}`;
const scanner=()=>`${sch(90)}${R(-86,-26,172,26,'#6a7280','#2a3440',3)}${R(-52,-120,104,100,'#e8eef4','#8a96a4',4)}${R(-38,-106,76,76,'#2a3a50','#1a222c',3)}${R(-60,-34,120,8,'#333')}${R(-78,-48,30,16,'#c0392b','#6a1a10',2)}${C(0,-136,5,'#2ecc71')}`;
const koerbe=()=>`${sch(70)}${R(-60,-50,120,50,'#8a96a4','#4a5560',3)}${[[-44,-80,'#2e86c1'],[4,-80,'#2e86c1'],[-20,-110,'#2ecc71']].map(([x,y,c])=>P(`M${x} ${y}h44l-6 30h-32Z`,c,'#173a66',2)+L(`M${x+6} ${y+10}h32`,'#fff',2)).join('')}`;
const sprachen=()=>`${R(-84,-40,168,80,'#fff','#2e6cb0',4)}${[[-52,'#c0392b'],[0,'#2e6cb0'],[52,'#2e7d32']].map(([x,c])=>P(`M${x-22} -28h44v26h-26l-8 10v-10h-10Z`,c)+L(`M${x-14} -20h28M${x-14} -12h18`,'#fff',3)).join('')}${R(-84,16,168,8,'#2e6cb0')}${L('M-60 -40V-60M60 -40V-60','#555',4)}`;
const fluessig=()=>`${sch(40)}${L('M-30 0L-18 -90M30 0L18 -90','#555',6)}${R(-48,-170,96,90,'#fff','#2e86c1',5)}${R(-38,-136,76,50,'#e6f4fb','#2e86c1',3)}${R(-28,-124,16,34,'#e74c3c')}${R(-26,-130,12,8,'#555')}${R(2,-120,16,30,'#2ecc71')}${R(5,-126,10,8,'#555')}${R(-38,-164,76,16,'#2e86c1')}`;
const weltkarte=()=>`${R(-100,-64,200,128,'#bfe4f8','#5a6a7a',5)}${P('M-80 -30Q-70 -50 -40 -44L-20 -20L-34 10Q-50 20 -64 0Z','#8cc06a')}${P('M-6 -46Q20 -56 40 -40Q70 -46 84 -20Q70 6 50 0L36 30L16 36L10 0L-4 -20Z','#8cc06a')}${P('M-30 24L-10 24L-14 50L-28 46Z','#8cc06a')}${C(-52,-18,5,'#c0392b')}${C(32,-18,5,'#c0392b')}${L('M-52 -18Q-10 -50 32 -18','#c0392b',2)}`;
const wartebank=()=>`${sch(80)}${R(-74,-106,148,34,'#3a7ac0','#173a66',3)}${R(-74,-60,148,18,'#2e6cb0','#173a66',3)}${R(-68,-42,6,42,'#555')}${R(62,-42,6,42,'#555')}${P('M-40 -60L-34 -84H-10L-4 -60Z','#e67e22','#8a4a10',2)}`;
const standuhr=()=>`${sch(40)}${R(-34,-190,68,190,'#6a4a2a','#3a2410',4)}${R(-22,-110,44,90,'#4a2a10')}${C(0,-60,12,'#f2c14e')}<g transform="translate(0 -150)">${C(0,0,24,'#fffdf2','#3a2410',3)}${zf(20,'#222')}${hd(.8,14,3,'#222')}${hd(3.9,18,2,'#222')}</g>`;
const flugplan=()=>`${R(-86,-56,172,112,'#f6f0dc','#6a4a22',5)}${R(-86,-56,172,18,'#2e6cb0')}${[0,1,2,3].map(k=>R(-76,-28+k*20,30,8,'#6a6a7a')+R(-36,-28+k*20,60,8,'#9ec8f0')+C(52,-24+k*20,6,k%2?'#2ecc71':'#f2c14e')).join('')}`;
const windanz=()=>`${R(-60,-60,120,120,'#10182a','#8a96a4',5)}${C(0,0,46,'#1a2a4a','#8a96a4',3)}${zf(40,'#9ec8f0')}${L('M0 0L22 -30','#f2c14e',5)}${P('M18 -34L30 -38L26 -26Z','#f2c14e')}${C(0,0,4,'#fff')}${L('M-30 52H30','#2ecc71',4)}`;
const radar=()=>`${sch(60)}${R(-56,-50,112,50,'#2a3040','#12161e',3)}${R(-6,-60,12,12,'#555')}${C(0,-110,52,'#0a1a10','#6a7280',6)}${C(0,-110,36,'none','#2ecc71',1.5)}${C(0,-110,18,'none','#2ecc71',1.5)}${L('M0 -110L30 -130','#7aff9a',3)}${C(-14,-92,3,'#7aff9a')}${C(22,-96,3,'#7aff9a')}${C(-20,-22,5,'#e74c3c')}${C(0,-22,5,'#f2c14e')}${C(20,-22,5,'#2ecc71')}`;
const funk=()=>`${sch(50)}${R(-44,-60,88,60,'#3a4a5a','#1a222c',3)}${R(-34,-50,40,22,'#9ae0a0')}${C(22,-38,10,'#222')}${C(22,-38,4,'#e74c3c')}${R(-34,-20,30,10,'#222')}${L('M34 -60L48 -130','#555',4)}${C(48,-132,4,'#e74c3c')}${R(-24,-96,6,36,'#555')}${E(-21,-100,12,9,'#222')}`;
const fernglas=()=>`${sch(40)}${L('M0 0V-80M-30 0L0 -50L30 0','#555',5)}${R(-34,-120,26,50,'#222','#000',2)}${R(8,-120,26,50,'#222','#000',2)}${R(-10,-106,20,12,'#555')}${C(-21,-120,10,'#9ad0f0','#000',2)}${C(21,-120,10,'#9ad0f0','#000',2)}`;
const lotsentafel=()=>`${R(-70,-58,140,116,'#2a4a3a','#8a6238',6)}${U('flugzeug',-44,-46,50,'#fff')}${L('M20 -30H58M20 -16H50M-56 24H56M-56 40H30','#fff',3)}`;
const wetterstation=()=>`${sch(40)}${R(-4,-150,8,150,'#8a8f98')}${R(-40,-30,80,30,'#c8ccd4','#6a7078',3)}${L('M-30 -156H30','#555',4)}${C(-32,-156,9,'#e74c3c')}${C(32,-156,9,'#2e86c1')}${R(-16,-120,8,60,'#fff','#555',2)}${R(-15,-90,6,30,'#e74c3c')}${R(8,-110,26,40,'#fff','#888',2)}${L('M12 -96H30M12 -86H26','#888',2)}`;
const kompass=()=>`${sch(44)}${R(-5,-70,10,70,'#555')}${E(0,-70,40,8,'#8a5a30','#4a2a10',3)}${C(0,-96,34,'#fffdf2','#8a6a1a',5)}${zf(30,'#222')}${P('M0 -124L8 -96L0 -96Z','#c0392b')}${P('M0 -68L-8 -96L0 -96Z','#2a3a5a')}${C(0,-96,3,'#222')}`;
const gate=()=>`${R(-60,-44,120,88,'#f2c14e','#6a5a10',5)}${T(0,24,56,'#222','B7')}${P('M-40 -34H20V-40L36 -30L20 -20V-26H-40Z','#222')}`;
const windsack=()=>`${sch(30)}${R(-5,-200,10,200,'#8a8f98')}${R(-18,-8,36,8,'#6a7280')}${[0,1,2,3,4].map(k=>P(`M${5+k*22} ${-190+k*3}h22v${30-k*5}h-22Z`,k%2?'#fff':'#e67e22')).join('')}${C(0,-198,7,'#555')}`;
const gepwagen=()=>`${sch(110)}${R(-100,-52,70,40,'#e67e22','#8a4a10',3)}${R(-90,-72,40,22,'#9ad0f0','#555',2)}${R(-24,-34,150,8,'#555')}${R(-10,-76,50,42,'#c0392b','#6a1a10',3)}${R(46,-66,50,32,'#2f7a8a','#17434c',3)}${R(60,-90,34,24,'#f2c14e','#7a5a10',2)}${C(-80,-8,13,'#222')}${C(-24,-8,13,'#222')}${C(30,-8,10,'#222')}${C(100,-8,10,'#222')}`;
const tankwagen=()=>`${sch(100)}${E(10,-76,92,40,'#dfe3ea','#6a7280',4)}${R(-96,-60,52,50,'#c0392b','#6a1a10',3)}${R(-90,-54,34,22,'#9ad0f0')}${R(-60,-26,160,16,'#555')}${L('M-30 -76H50','#c0392b',6)}${L('M96 -50Q112 -30 104 -8','#222',4)}${C(-70,-8,12,'#222')}${C(0,-8,12,'#222')}${C(70,-8,12,'#222')}`;
const kelle=()=>`${sch(34)}${R(-4,-90,8,90,'#555')}${R(-26,-6,52,6,'#555')}${R(-16,-100,32,12,'#6a7280')}${L('M-6 -96L-30 -146M6 -96L30 -146','#6a4a2a',6)}${C(-34,-154,15,'#e67e22','#8a4a10',3)}${C(34,-154,15,'#e67e22','#8a4a10',3)}${C(-34,-154,6,'#f2c14e')}${C(34,-154,6,'#f2c14e')}`;
const staedte=()=>`${R(-70,-60,140,120,'#2e6cb0','#173a66',5)}${[0,1,2].map(k=>R(-58,-48+k*34,116,24,'#fff')+P(`M-50 ${-44+k*34}L-34 ${-36+k*34}L-50 ${-28+k*34}Z`,'#2e6cb0')+L(`M-22 ${-36+k*34}H${30+k*8}`,'#2e6cb0',5)).join('')}${C(-64,-54,3,'#fff')}${C(64,-54,3,'#fff')}`;
const rad=()=>`${sch(60)}${R(-8,-170,16,110,'#8a8f98','#4a5058',2)}${C(0,-50,50,'#222','#000',3)}${C(0,-50,24,'#c8ccd4','#6a7078',4)}${C(0,-50,6,'#6a7280')}${L('M-4 -130L-26 -100','#555',5)}`;
const kegel=()=>`${sch(34)}${R(-34,-8,68,8,'#e67e22','#8a4a10',2)}${P('M-26 -8L-10 -90H10L26 -8Z','#e67e22','#8a4a10',3)}${R(-20,-50,40,10,'#fff')}${R(-14,-72,28,8,'#fff')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #dka{transform:rotate(120deg)}.tuer.offen #dkf{transform:rotate(-85deg)}.tuer.offen #kla{transform:scaleX(.12)}.tuer.offen #klb{transform:scaleX(.12)}.tuer.offen #gla{transform:translateX(-92px)}.tuer.offen #glb{transform:translateX(92px)}.tuer #lgr{opacity:0}.tuer.offen #lgr{opacity:1}.tuer.offen #lro{opacity:0}.tuer #az2{opacity:0}.tuer.offen #az2{opacity:1}.tuer.offen #az1{opacity:0}.tuer.offen #aza{transform:translateX(-90px)}.tuer.offen #azb{transform:translateX(90px)}.tuer.offen #gtu{transform:scaleX(.1)}.tuer #gtr{transform:translateX(-240px)}.tuer.offen #gtr{transform:none}</style>`;
function tuerDreh(n){
const arm=a=>L(`M500 380L${(500+Math.sin(a)*58).toFixed(1)} ${(380-Math.cos(a)*58).toFixed(1)}`,'#8a8f98',9)+C((500+Math.sin(a)*58).toFixed(1),(380-Math.cos(a)*58).toFixed(1),7,'#c0392b');
return`${R(410,190,180,280,'#eaf4ff')}${C(500,320,120,'url(#licht)')}${R(410,420,180,50,'#d8d0bc')}${R(412,330,70,140,'rgba(200,225,245,.6)','#6a7280',3)}${R(488,280,24,190,'#6a7280','#2a3440',3)}${C(500,280,12,'#8a96a4','#2a3440',2)}
   <g id="dka" class="tb" style="transform-origin:500px 380px">${arm(0)}${arm(2.094)}${arm(4.189)}${C(500,380,12,'#58606e','#2a3440',3)}</g>
   <g id="dkf" class="tb" style="transform-origin:522px 378px">${R(522,372,66,12,'#e74c3c','#8a2a1a',2)}${R(540,372,12,12,'#fff')}${R(566,372,12,12,'#fff')}</g>
   ${R(580,330,14,140,'#8a96a4','#3a424e',3)}${R(380,170,40,300,'#8a96a4','#3a424e',4)}${R(596,170,24,300,'#8a96a4','#3a424e',4)}${R(380,170,240,26,'#58606e','#2a3440',3)}
   <g class="tb pl">${sPl(n,246)}</g>`;
}
function tuerKlappe(n){
const ls=(x)=>[0,1,2,3,4,5].map(k=>R(x+k*15,190,15,280,k%2?'#3a3e48':'#4a505c','#222',1)).join('');
return`${R(372,170,256,300,'#58606e','#2a3440',5)}${[0,1,2,3,4,5,6,7].map(k=>R(380+k*30,176,15,14,'#f2c14e')).join('')}${R(410,190,180,280,'#fff8e0')}${C(500,330,110,'url(#licht)')}${R(410,430,180,40,'#c8ccd4')}${L('M410 440H590','#aab',3)}
   <g id="kla" class="tb" style="transform-origin:410px 330px">${ls(410)}</g>
   <g id="klb" class="tb" style="transform-origin:590px 330px">${ls(500)}</g>
   ${R(410,190,180,12,'#2a2e36')}
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerGlas(n){
const g=(id,x)=>`<g id="${id}" class="tb">${R(x,190,90,280,'rgba(150,200,240,.55)','#6a7280',4)}${R(x+(id=='gla'?60:20),300,10,60,'#fff')}${L(`M${x+10} 400L${x+80} 220`,'rgba(255,255,255,.6)',6)}</g>`;
return`<defs><clipPath id="glc"><rect x="410" y="190" width="180" height="280"/></clipPath></defs>${R(380,170,240,300,'#e8eef4','#8a96a4',4)}${R(410,190,180,280,'#e6f4ff')}${C(500,320,120,'url(#licht)')}${R(410,440,180,30,'#c8d4e0')}
   <g clip-path="url(#glc)">${g('gla',410)}${g('glb',500)}</g>
   ${R(440,172,120,22,'#2a3440')}${C(500,183,8,'#555')}<g id="lro" class="tb">${C(500,183,8,'#e74c3c')}</g><g id="lgr" class="tb">${C(500,183,8,'#2ecc71')}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerAufzug(n){
const h=(id,x)=>`<g id="${id}" class="tb">${R(x,200,90,270,'#c8ccd4','#6a7280',3)}${L(`M${x+(id=='aza'?70:20)} 214V456`,'#aab4c0',3)}</g>`;
return`<defs><clipPath id="azc"><rect x="410" y="200" width="180" height="270"/></clipPath></defs>${R(374,150,252,320,'#aab4c0','#58606e',5)}${R(440,158,120,34,'#10182a','#222',3)}
   <g id="az1" class="tb">${T(500,184,26,'#f2c14e','4')}${P('M530 168H550L540 184Z','#f2c14e')}</g>
   <g id="az2" class="tb">${T(500,184,26,'#2ecc71','0')}${C(540,176,6,'#2ecc71')}</g>
   ${R(410,200,180,270,'#f4e8c8')}${C(500,330,110,'url(#licht)')}${L('M420 360H580','#8a8f98',5)}${R(410,440,180,30,'#9a8a6a')}
   <g clip-path="url(#azc)">${h('aza',410)}${h('azb',500)}</g>
   <g class="tb pl">${sPl(n,340)}</g>`;
}
function tuerGang(n){
const tr=[0,1,2,3,4].map(k=>R(330+k*26,470-(k+1)*14,26,(k+1)*14,'#b8c0cc','#6a7280',2)).join('');
return`<defs><clipPath id="gwc"><rect x="340" y="150" width="300" height="330"/></clipPath></defs>${R(410,190,180,220,'#aab4c0','#6a7280',5)}${R(420,200,160,200,'#ffe4a8')}${C(500,300,110,'url(#licht)')}${R(430,330,30,70,'#2e6cb0')}${R(540,330,30,70,'#2e6cb0')}${C(445,326,10,'#2e6cb0')}${C(555,326,10,'#2e6cb0')}
   <g id="gtu" class="tb" style="transform-origin:420px 300px">${R(420,200,160,200,'#f4f6fa','#8a96a4',4)}${C(500,262,26,'#9ad0f0','#8a96a4',4)}${R(556,300,14,8,'#555')}</g>
   ${R(410,396,180,8,'#6a7280')}<g class="tb pl">${sPl(n,440)}</g>
   <g clip-path="url(#gwc)"><g id="gtr" class="tb">${tr}${R(452,396,70,8,'#8a96a4','#4a5058',2)}${L('M334 404L452 332V396','#e67e22',4)}${R(520,396,5,74,'#6a7280')}</g></g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'drehkreuz';
const arten={drehkreuz:[tuerDreh,'Drehkreuz mit Zahlenschloss'],klappe:[tuerKlappe,'Gepäckklappe mit Zahlenschloss'],glas:[tuerGlas,'Glasschleuse mit Zahlenschloss'],aufzug:[tuerAufzug,'Aufzug mit Zahlenschloss'],gangway:[tuerGang,'Flugzeugtür mit Zahlenschloss']};
const a=arten[art]||arten.drehkreuz;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.flughafen={
name:"Der Flughafen",
symbole:["flugzeug","koffer","weltkugel","ticket","kompass"],
symbolNamen:["Flugzeug","Koffer","Weltkugel","Flugticket","Kompass"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="60" cy="45" r="40" fill="#bfe4f8" stroke="#2a4a7a" stroke-width="3"/><use href="#sym-flugzeug" x="34" y="12" width="48" height="48" color="#2e6cb0"/><use href="#sym-weltkugel" x="68" y="42" width="30" height="30" color="#2e7d32"/><use href="#sym-koffer" x="22" y="48" width="28" height="28" color="#e67e22"/></svg>`,
texte:{
einleitung:"Ihr wollt mit eurer Klasse in den Urlaub fliegen. Kurz vor dem Abflug sind alle Durchgänge gesperrt! Die Flughafen-Lotsin hat ein Rätselspiel für euch hinterlassen: Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände am Flughafen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wenn ihr das Rollfeld erreicht und die Flugzeugtür öffnet, dürft ihr an Bord. Schafft ihr es?",
startKnopf:"Zum Flughafen gehen",
hinweisGeber:"Die Lotsin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Lotsin schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen aufgedruckt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Das Flugzeug wartet nicht!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und das Flugzeug trotzdem noch erreichen!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und das Flugzeug erreicht. Die Lotsin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du willst mit deiner Klasse in den Urlaub fliegen. Kurz vor dem Abflug sind alle Durchgänge gesperrt! Die Flughafen-Lotsin hat ein Rätselspiel für dich hinterlassen: Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände am Flughafen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wenn du das Rollfeld erreichst und die Flugzeugtür öffnest, darfst du an Bord. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Lotsin schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen aufgedruckt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und das Flugzeug trotzdem noch erreichen!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und das Flugzeug erreicht. Die Lotsin ist stolz auf dich!"
},
einfach:{
name:"Der Flughafen",
symbolNamen:["Flugzeug","Koffer","Weltkugel","Flugticket","Kompass"],
texte:{
einleitung:"Ihr wollt mit der Klasse in den Urlaub fliegen. Aber alle Durchgänge sind zu! Die Lotsin hat ein Rätsel-Spiel versteckt. An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben. Für jede richtige Aufgabe bekommt ihr eine Zahl. Geht bis zum Flugzeug. Dann dürft ihr an Bord!",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Das Flugzeug wartet nicht!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Flugzeug fliegt in den Urlaub!"
},
texteDu:{
einleitung:"Du willst mit der Klasse in den Urlaub fliegen. Aber alle Durchgänge sind zu! Die Lotsin hat ein Rätsel-Spiel versteckt. An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben. Für jede richtige Aufgabe bekommst du eine Zahl. Geh bis zum Flugzeug. Dann darfst du an Bord!",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Flugzeug fliegt in den Urlaub!"
},
raeume:[
{titel:"Die Check-in-Halle",intro:"Die Halle ist groß und hell. An der Tafel stehen viele Städte. Aber das Drehkreuz ist zu. Findet die Zahlen für das Schloss!",introDu:"Die Halle ist groß und hell. An der Tafel stehen viele Städte. Aber das Drehkreuz ist zu. Finde die Zahlen für das Schloss!",
objekte:[{name:"Tafel mit Flügen",fund:"Hinter der Tafel klebt:"},{name:"Waage für Koffer",fund:"An der Waage klebt:"},{name:"Pult mit Stempel",fund:"Auf dem Pult liegt:"},{name:"Koffer mit Bildern",fund:"Im Koffer liegt:"},{name:"Schalter zum Einchecken",fund:"Am Schalter liegt:"}],
infoObjekte:[{name:"Uhren der Welt",fund:"An den Uhren klebt:"},{name:"Säule mit Auskunft",fund:"An der Säule klebt:"},{name:"Ständer mit Fahnen",fund:"An den Fahnen klebt:"}]},
{titel:"Das Gepäckband",intro:"Viele Koffer fahren im Kreis. Das Licht ist kühl. Die Klappe zum Tunnel ist zu. Suche die Zahlen!",
objekte:[{name:"Schild am Band",fund:"Am Schild klebt:"},{name:"Nummer vom Band",fund:"An der Nummer klebt:"},{name:"Koffer mit Zettel",fund:"Im Koffer liegt:"},{name:"Kiste für Verlorenes",fund:"In der Kiste liegt:"},{name:"Wagen für Koffer",fund:"Auf dem Wagen liegt:"}],
infoObjekte:[{name:"Karte vom Wetter",fund:"An der Karte klebt:"},{name:"Tasche zum Reisen",fund:"In der Tasche liegt:"},{name:"Schild mit Regeln",fund:"Am Schild klebt:"}]},
{titel:"Die Sicherheitskontrolle",intro:"Hier ist alles weiß und blau. Die Glastüren sind zu. Löst die Aufgaben, dann gehen sie auf. Findet die Zahlen!",introDu:"Hier ist alles weiß und blau. Die Glastüren sind zu. Löse die Aufgaben, dann gehen sie auf. Finde die Zahlen!",
objekte:[{name:"Tafel für Taschen",fund:"An der Tafel klebt:"},{name:"Gerät zum Durchleuchten",fund:"Am Gerät klebt:"},{name:"Körbe zum Ablegen",fund:"In den Körben liegt:"},{name:"Schilder in Sprachen",fund:"An den Schildern klebt:"},{name:"Schild für Flaschen",fund:"Am Schild klebt:"}],
infoObjekte:[{name:"Karte der Welt",fund:"An der Karte klebt:"},{name:"Bank zum Warten",fund:"Auf der Bank liegt:"},{name:"Uhr zum Stehen",fund:"An der Uhr klebt:"}]},
{titel:"Der Tower",intro:"Von hier oben seht ihr den ganzen Flughafen. Auf den Pulten blinken kleine Lichter. Der Aufzug ist zu. Löst die Aufgaben!",introDu:"Von hier oben siehst du den ganzen Flughafen. Auf den Pulten blinken kleine Lichter. Der Aufzug ist zu. Löse die Aufgaben!",
objekte:[{name:"Plan der Flüge",fund:"Am Plan klebt:"},{name:"Anzeige für Wind",fund:"An der Anzeige klebt:"},{name:"Gerät mit Radar",fund:"Am Radar klebt:"},{name:"Funk",fund:"Am Funk klebt:"},{name:"Fernrohr",fund:"Am Fernrohr klebt:"}],
infoObjekte:[{name:"Tafel der Lotsen",fund:"An der Tafel klebt:"},{name:"Gerät für das Wetter",fund:"Am Gerät klebt:"},{name:"Kompass zum Stellen",fund:"Am Kompass klebt:"}]},
{titel:"Das Rollfeld",intro:"Die Morgensonne scheint. Euer Flugzeug steht bereit. Hier ist das letzte Schloss. Öffnet es!",introDu:"Die Morgensonne scheint. Dein Flugzeug steht bereit. Hier ist das letzte Schloss. Öffne es!",
objekte:[{name:"Schild vom Gate",fund:"Am Schild klebt:"},{name:"Wind-Sack",fund:"Am Sack klebt:"},{name:"Wagen mit Koffern",fund:"Im Wagen liegt:"},{name:"Wagen mit Benzin",fund:"Am Wagen klebt:"},{name:"Kelle zum Winken",fund:"An der Kelle klebt:"}],
infoObjekte:[{name:"Schild mit Städten",fund:"Am Schild klebt:"},{name:"Rad vom Flugzeug",fund:"Am Rad klebt:"},{name:"Hütchen",fund:"Am Hütchen klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Check-in-Halle",
intro:"In der hellen Check-in-Halle summt es leise. Auf der großen Tafel stehen viele Städte. Aber das Drehkreuz zum nächsten Bereich ist gesperrt! Findet die Ziffern für das Zahlenschloss!",
introDu:"In der hellen Check-in-Halle summt es leise. Auf der großen Tafel stehen viele Städte. Aber das Drehkreuz zum nächsten Bereich ist gesperrt! Finde die Ziffern für das Zahlenschloss!",
tuerX:1300,tuerArt:"drehkreuz",
hintergrund:()=>`${defs('#d4d0c6','#9a968a','#fff4d0')}${R(0,0,1600,470,'#eef1f4')}${R(0,0,1600,46,'#2e4a7a')}${[150,500,850,1200].map(x=>R(x,46,120,8,'#fff6c8')).join('')}${[0,1,2,3,4,5,6,7].map(k=>R(30+k*200,66,160,74,'#cfe8ff','#8a96a4',5)+L(`M${110+k*200} 66V140`,'#8a96a4',3)).join('')}${R(0,396,1600,74,'#b8c0cc')}${R(0,396,1600,8,'#2e6cb0')}${[90,330,570,810,1050].map(x=>R(x,360,120,36,'#dfe4ea','#8a96a4',2)+R(x+40,336,40,24,'#222')).join('')}${C(800,520,430,'url(#licht)')}${boden(0)}`,
objekte:[
{name:"Abflugtafel",x:700,y:230,wand:true,by:-80,zeichne:abflug,fund:"Hinter der Abflugtafel klebt:"},
{name:"Gepäckwaage",x:700,boden:620,fuss:4,by:-190,zeichne:waage,fund:"An der Gepäckwaage klebt:"},
{name:"Stempel-Pult",x:940,boden:730,fuss:4,by:-132,zeichne:stempel,fund:"Auf dem Stempel-Pult liegt:"},
{name:"Koffer mit Aufklebern",x:450,boden:730,fuss:4,by:-150,zeichne:kofferA,fund:"Im Koffer liegt:"},
{name:"Check-in-Schalter",x:220,boden:590,fuss:4,by:-190,zeichne:schalter,fund:"Am Check-in-Schalter liegt:"}
],
infoObjekte:[{name:"Weltuhr",x:1050,y:250,wand:true,by:-80,zeichne:weltuhr,fund:"An der Weltuhr klebt:"},{name:"Infosäule",x:1020,boden:600,fuss:4,by:-200,zeichne:infosaeule,fund:"An der Infosäule klebt:"},{name:"Fahnenständer",x:1450,boden:740,fuss:4,by:-170,zeichne:fahnen,fund:"An den Fahnen klebt:"}]},
{titel:"Das Gepäckband",
intro:"Am Gepäckband fahren viele Koffer im Kreis. Das Licht ist kühl und grau. Die Gummiklappe zum Tunnel bleibt zu. Irgendwo hier sind die Ziffern für das Schloss versteckt …",
tuerX:400,tuerArt:"klappe",
hintergrund:()=>`${defs('#6a7482','#3a4252','#cfe8ff')}${R(0,0,1600,470,'#7e92a6')}${R(0,0,1600,40,'#4a5668')}${[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(k=>L(`M${k*110} 40V400`,'#6a7e92',3)).join('')}${[120,520,920,1320].map(x=>L(`M${x} 40V80`,'#333',3)+P(`M${x-50} 80H${x+50}L${x+36} 104H${x-36}Z`,'#e8eef4','#333',2)+C(x,110,60,'url(#licht)')).join('')}${R(0,404,1600,50,'#2a2e36')}${R(0,400,1600,6,'#f2c14e')}${R(0,454,1600,16,'#586070')}${[...Array(40)].map((_,k)=>R(k*40,420,24,18,'#3a3e48')).join('')}${[[70,'#c0392b'],[230,'#2e6cb0'],[640,'#2f7a8a'],[780,'#e67e22'],[1150,'#8e44ad'],[1500,'#2e7d32']].map(([x,c])=>R(x,372,64,32,c,'#222',2)+L(`M${x+22} 372V364H${x+42}V372`,'#222',3)).join('')}${boden(1)}`,
objekte:[
{name:"Förderband-Schild",x:800,y:230,wand:true,by:-60,zeichne:bandschild,fund:"Am Förderband-Schild klebt:"},
{name:"Bandnummer-Anzeige",x:1100,y:240,wand:true,by:-70,zeichne:bandnr,fund:"An der Bandnummer-Anzeige klebt:"},
{name:"Koffer mit Anhänger",x:700,boden:620,fuss:4,by:-110,zeichne:kofferB,fund:"Im Koffer liegt:"},
{name:"Fundbüro-Kiste",x:1000,boden:720,fuss:4,by:-125,zeichne:fundkiste,fund:"In der Fundbüro-Kiste liegt:"},
{name:"Rollwagen",x:200,boden:700,fuss:4,by:-125,zeichne:rollwagen,fund:"Auf dem Rollwagen liegt:"}
],
infoObjekte:[{name:"Wetterkarte",x:1380,y:250,wand:true,by:-80,zeichne:wetterkarte,fund:"An der Wetterkarte klebt:"},{name:"Reisetasche",x:440,boden:740,fuss:4,by:-110,zeichne:reisetasche,fund:"In der Reisetasche liegt:"},{name:"Gepäckregel-Aufsteller",x:1200,boden:600,fuss:4,by:-190,zeichne:regelaufst,fund:"Am Aufsteller klebt:"}]},
{titel:"Die Sicherheitskontrolle",
intro:"In der Sicherheitskontrolle ist alles ruhig und weiß-blau. Die gläsernen Türen sind noch zu. Sie gehen auf, wenn ihr die Rätsel löst. Findet die Ziffern!",
introDu:"In der Sicherheitskontrolle ist alles ruhig und weiß-blau. Die gläsernen Türen sind noch zu. Sie gehen auf, wenn du die Rätsel löst. Finde die Ziffern!",
tuerX:900,tuerArt:"glas",
hintergrund:()=>`${defs('#c4d0de','#8696aa','#e8f4ff')}${R(0,0,1600,470,'#f2f6fa')}${R(0,0,1600,40,'#d4dee8')}${[0,1,2,3,4,5,6,7].map(k=>R(40+k*200,12,120,16,'#fff','#9ab',2)).join('')}${[0,1,2,3,4,5,6,7,8].map(k=>L(`M${k*200} 40V400`,'#d4dee8',4)).join('')}${R(0,300,1600,6,'#2e6cb0')}${R(0,396,1600,74,'#dbe6f2')}${R(0,396,1600,8,'#2e6cb0')}${C(900,500,430,'url(#licht)')}${boden(0)}`,
objekte:[
{name:"Handgepäck-Tafel",x:330,y:240,wand:true,by:-90,zeichne:handgep,fund:"An der Handgepäck-Tafel klebt:"},
{name:"Scanner",x:560,boden:610,fuss:4,by:-150,zeichne:scanner,fund:"Am Scanner klebt:"},
{name:"Kontrollkörbe",x:150,boden:720,fuss:4,by:-140,zeichne:koerbe,fund:"In den Kontrollkörben liegt:"},
{name:"Sprachen-Schilder",x:1250,y:240,wand:true,by:-75,zeichne:sprachen,fund:"An den Sprachen-Schildern klebt:"},
{name:"Flüssigkeits-Aufsteller",x:1400,boden:700,fuss:4,by:-190,zeichne:fluessig,fund:"Am Flüssigkeits-Aufsteller klebt:"}
],
infoObjekte:[{name:"Weltkarte",x:620,y:250,wand:true,by:-90,zeichne:weltkarte,fund:"An der Weltkarte klebt:"},{name:"Wartebank",x:1050,boden:700,fuss:4,by:-135,zeichne:wartebank,fund:"Auf der Wartebank liegt:"},{name:"Standuhr",x:400,boden:640,fuss:4,by:-222,zeichne:standuhr,fund:"An der Standuhr klebt:"}]},
{titel:"Der Tower",
intro:"Im Tower seht ihr über den ganzen Flughafen. Auf den Pulten blinken kleine Lämpchen. Der Aufzug zum Rollfeld ist gesperrt. Löst die Aufgaben, um ihn zu öffnen!",
introDu:"Im Tower siehst du über den ganzen Flughafen. Auf den Pulten blinken kleine Lämpchen. Der Aufzug zum Rollfeld ist gesperrt. Löse die Aufgaben, um ihn zu öffnen!",
tuerX:600,tuerArt:"aufzug",
hintergrund:()=>`${defs('#2a3040','#12161e','#7ab0e0')}${R(0,0,1600,470,'#232a3a')}${R(40,20,1520,195,'url(#himmel)')}${P('M40 160Q400 140 800 156T1560 150V215H40Z','#6a8a6a')}${P('M300 215L700 160H900L1300 215Z','#4a4e58')}${L('M800 212V164M780 212L836 164','#fff',3)}${U('flugzeug',1100,70,34,'#fff')}${U('flugzeug',360,110,26,'#fff')}${[0,1,2,3,4,5,6,7,8].map(k=>R(34+k*190,16,16,204,'#12161e')).join('')}${R(0,214,1600,14,'#12161e')}${[...Array(40)].map((_,k)=>C(20+k*40,234,3,['#2ecc71','#f2c14e','#e74c3c','#3498db'][k%4])).join('')}${C(600,420,420,'url(#licht)')}${boden(1)}`,
objekte:[
{name:"Flugplan",x:1000,y:290,wand:true,by:-80,zeichne:flugplan,fund:"Am Flugplan klebt:"},
{name:"Windsack-Anzeige",x:250,y:290,wand:true,by:-80,zeichne:windanz,fund:"An der Windsack-Anzeige klebt:"},
{name:"Radar",x:850,boden:600,fuss:4,by:-180,zeichne:radar,fund:"Am Radar klebt:"},
{name:"Funkgerät",x:1150,boden:700,fuss:4,by:-150,zeichne:funk,fund:"Am Funkgerät klebt:"},
{name:"Fernglas",x:150,boden:700,fuss:4,by:-150,zeichne:fernglas,fund:"Am Fernglas klebt:"}
],
infoObjekte:[{name:"Lotsen-Tafel",x:1300,y:290,wand:true,by:-85,zeichne:lotsentafel,fund:"An der Lotsen-Tafel klebt:"},{name:"Wetterstation",x:1450,boden:620,fuss:4,by:-190,zeichne:wetterstation,fund:"An der Wetterstation klebt:"},{name:"Kompass",x:380,boden:620,fuss:4,by:-150,zeichne:kompass,fund:"Am Kompass klebt:"}]},
{titel:"Das Rollfeld",
intro:"Auf dem Rollfeld scheint die Morgensonne. Euer Flugzeug steht bereit, aber die Treppe ist noch nicht da. Hier ist das letzte Schloss – öffnet es!",
introDu:"Auf dem Rollfeld scheint die Morgensonne. Dein Flugzeug steht bereit, aber die Treppe ist noch nicht da. Hier ist das letzte Schloss – öffne es!",
tuerX:1100,tuerArt:"gangway",
hintergrund:()=>`${defs('#6a6e76','#3a3e46','#fff0c0')}${R(0,0,1600,470,'url(#himmel)')}${C(250,230,200,'url(#licht)')}${C(250,230,40,'#fff6c8')}${E(1000,100,140,24,'#fff')}${E(1150,84,90,18,'#fff')}${E(420,80,110,20,'#fff')}${R(0,420,1600,50,'#8a9a8a')}${R(600,40,60,92,'#cfd6de','#8a96a4',3)}${R(590,20,80,30,'#9ad0f0','#58606e',3)}${R(0,150,720,320,'#cfd6de','#8a96a4',4)}${R(0,130,740,26,'#58606e')}${R(0,176,720,12,'#2e6cb0')}${[0,1,2,3,4,5,6].map(k=>R(20+k*100,360,80,60,'#9ad0f0','#58606e',3)).join('')}${P('M780 200L800 60L880 60L900 190Z','#2e6cb0')}${P('M1180 400L1520 440L1500 456L1160 440Z','#cfd6de','#8a96a4',3)}${E(1400,450,44,26,'#aab4c0','#6a7280',3)}<rect x="740" y="170" width="870" height="290" rx="130" fill="#f4f6fa" stroke="#aab4c0" stroke-width="4"/>${R(800,296,800,10,'#2e6cb0')}${[0,1,2,3,4,5,6,7,8,9,10,11].map(k=>800+k*64).filter(x=>x<980||x>1220).map(x=>C(x,236,16,'#9ad0f0','#8a96a4',3)).join('')}${boden(2)}`,
objekte:[
{name:"Gate-Schild",x:250,y:250,wand:true,by:-66,zeichne:gate,fund:"Am Gate-Schild klebt:"},
{name:"Windsack",x:750,boden:600,fuss:4,by:-220,zeichne:windsack,fund:"Am Windsack klebt:"},
{name:"Gepäckwagen",x:150,boden:700,fuss:4,by:-110,zeichne:gepwagen,fund:"Im Gepäckwagen liegt:"},
{name:"Tankwagen",x:1480,boden:600,fuss:4,by:-125,zeichne:tankwagen,fund:"Am Tankwagen klebt:"},
{name:"Lotsen-Kelle",x:980,boden:740,fuss:4,by:-180,zeichne:kelle,fund:"An der Lotsen-Kelle klebt:"}
],
infoObjekte:[{name:"Städte-Tafel",x:520,y:250,wand:true,by:-80,zeichne:staedte,fund:"An der Städte-Tafel klebt:"},{name:"Flugzeug-Rad",x:1250,boden:700,fuss:4,by:-175,zeichne:rad,fund:"Am Flugzeug-Rad klebt:"},{name:"Leitkegel",x:600,boden:740,fuss:4,by:-110,zeichne:kegel,fund:"Am Leitkegel klebt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmelA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e6cc0"/><stop offset=".6" stop-color="#8cc4f0"/><stop offset="1" stop-color="#e8f4ff"/></linearGradient></defs>
   <rect width="1000" height="600" fill="#e8e4da"/><rect x="0" y="0" width="1000" height="70" fill="#d4d0c6"/>
   <g clip-path="url(#fenster)"><clipPath id="fenster"><path d="M260 100H740Q880 100 880 240V360Q880 500 740 500H260Q120 500 120 360V240Q120 100 260 100Z"/></clipPath>
   <rect width="1000" height="600" fill="url(#himmelA)"/><circle cx="700" cy="230" r="90" fill="#fff6c8" opacity=".45"/><circle cx="700" cy="230" r="42" fill="#fff6c8"/>
   ${[[200,440,110,34],[360,470,130,36],[540,450,120,34],[720,480,140,38],[860,440,100,32],[120,490,100,30]].map(([x,y,a,b])=>E(x,y,a,b,'#fff')).join('')}
   <path d="M120 430L520 360L560 372L120 500Z" fill="#cfd6de" stroke="#8a96a4" stroke-width="3"/><path d="M500 363L560 372L520 360Z" fill="#c0392b"/></g>
   <path d="M0 0H1000V600H0Z M260 100H740Q880 100 880 240V360Q880 500 740 500H260Q120 500 120 360V240Q120 100 260 100Z" fill="#e8e4da" fill-rule="evenodd"/><path d="M260 100H740Q880 100 880 240V360Q880 500 740 500H260Q120 500 120 360V240Q120 100 260 100Z" stroke="#9a968a" stroke-width="14" fill="none"/>
   <rect x="0" y="540" width="1000" height="60" fill="#2e4a7a"/>
   ${[[240,'#e74c3c'],[400,'#2e86c1'],[580,'#2ecc71'],[740,'#f2c14e']].map(([x,c],k)=>`<g transform="translate(${x} 600)">${R(-9,-40,18,40,c)}${C(0,-50,10,'#f0c8a0')}${P('M-10 -54Q0 -68 10 -54Z',k%2?'#4a2a10':'#2a2a2a')}${L(k%2?'M-9 -34L-20 -60M9 -34L20 -56':'M-9 -34L-18 -52M9 -34L22 -62','#f0c8a0',4)}</g>`).join('')}${U('flugzeug',470,20,60,'#2e6cb0')}`
};
})();