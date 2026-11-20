document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-postern\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -19L5 -6L19 -6L8 3L12 17L0 9L-12 17L-8 3L-19 -6L-5 -6Z\"/></symbol>\n<symbol id=\"sym-poampel\" viewBox=\"-20 -20 40 40\"><rect x=\"-10\" y=\"-19\" width=\"20\" height=\"38\" rx=\"5\" fill=\"currentColor\"/><circle cx=\"0\" cy=\"-10\" r=\"5\" fill=\"#fff\"/><circle cx=\"0\" cy=\"0\" r=\"5\" fill=\"#fff\" opacity=\".6\"/><circle cx=\"0\" cy=\"10\" r=\"5\" fill=\"#fff\" opacity=\".3\"/></symbol>\n<symbol id=\"sym-pohelm\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-18 8Q-18 -16 0 -16Q18 -16 18 8Z\"/><path d=\"M-8 -13L-4 4M4 -15V4M12 -10L10 4\" stroke=\"#fff\" stroke-width=\"2.5\" opacity=\".7\"/><path d=\"M-17 9H19\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-poschild\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -16L17 14H-17Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\" stroke-linejoin=\"round\"/><path d=\"M0 -4V5\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"0\" cy=\"10\" r=\"2.5\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-poschluessel\" viewBox=\"-20 -20 40 40\"><circle cx=\"-9\" cy=\"0\" r=\"8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\"/><path d=\"M-1 0H18M12 0V8M17 0V6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\" stroke-linecap=\"round\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const st=(s,k)=>s?` stroke="${s}" stroke-width="${k}"`:'';
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${st(s,k)}/>`;
const C=(x,y,r,f,s,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${st(s,k)}/>`;
const E=(x,y,a,b,f,s,k)=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${f}"${st(s,k)}/>`;
const P=(d,f,s,k)=>`<path d="${d}" fill="${f}"${st(s,k)}/>`;
const L=(d,s,k)=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${k}" stroke-linecap="round"/>`;
const U=(id,x,y,w,c)=>`<use href="#sym-${id}" x="${x}" y="${y}" width="${w}" height="${w}" color="${c}"/>`;
const X=(x,y,t,g,f)=>`<text x="${x}" y="${y}" font-size="${g}" fill="${f}" font-family="Arial,Helvetica,sans-serif" font-weight="bold" text-anchor="middle">${t}</text>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.3)');
const bl='#1a4f9c',hb='#5a9ae0',nb='#0a2a5a',gr='#3a3a40',chrom='#c8ccd4',rot='#d83a2a',gruen='#2a9a4a',gelb='#f2c14e',orange='#f28a1a',holz='#b88850',dk='#5a3a1a',tk='#3a6a7a';
const rad=(x,y,r)=>C(x,y,r,'none','#1a1a1a',5)+C(x,y,4,chrom);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const hg=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(const y of[500,540,590,650,720])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=100)d+=`M${800+(x-800)*.55} 470L${x} 780`;return g+L(d,'rgba(90,110,140,.35)',2)+R(0,470,1600,8,bl);}
if(m==1){let z='';for(let k=0;k<6;k++)z+=R(1170-k*6,512+k*42,150+k*12,22,'#f4f4f0');for(let x=40;x<1600;x+=160)d+=`M${x} 625H${x+80}`;return g+R(0,470,1600,22,'#6ab04a')+L('M0 506H1600M0 752H1600','#f4f4f0',6)+L(d,'#f4f4f0',6)+z;}
if(m==2){for(let y=470;y<780;y+=26){d+=`M0 ${y}H1600`;for(let x=(y/26%2)*60;x<1600;x+=120)d+=`M${x} ${y}V${y+26}`;}return g+L(d,'rgba(90,60,30,.35)',2);}
if(m==3){for(const y of[505,550,610,680])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=130)d+=`M${800+(x-800)*.6} 470L${x} 780`;return g+L(d,'rgba(60,90,50,.3)',2)+E(560,640,330,70,'rgba(60,120,200,.25)');}
for(let k=0;k<170;k++)d+=R((k*97)%1600,474+(k*41)%296,38,16,['#5a5a66','#6a6a74','#4e4e58'][k%3]);return g+d+L('M150 560L120 770M450 560L470 770','#e8e8f0',5);}
const pinnwand=()=>`${R(-86,-64,172,128,'#d0a060','#8a6a40',6)}${[[-72,-52,52,42,'#fff8a0'],[-10,-56,44,52,'#fff'],[44,-48,32,36,'#a8e0ff'],[-66,4,58,44,'#fff'],[4,8,70,40,'#ffd0d8']].map(([x,y,w,h,c])=>R(x,y,w,h,c,'#bbb',1)+C(x+w/2,y+5,4,rot)+L(`M${x+8} ${y+h/2}H${x+w-8}M${x+8} ${y+h/2+9}H${x+w-14}`,'#8a8a90',2)).join('')}`;
const notruftafel=()=>`${R(-80,-70,160,140,bl,nb,5)}${R(-68,-58,136,36,'#fff')}${X(0,-31,'NOTRUF','24',bl)}${X(0,32,'110','54','#fff')}${P('M-56 38Q-62 22 -50 16L-44 26Q-48 30 -44 36Z','#fff')}${X(0,60,'Wer? Wo? Was?','14','#cfe0ff')}`;
const tresen=()=>`${sch(130)}${R(-130,-100,260,100,'#f4f6fa','#8a9ab0',4)}${R(-130,-62,260,14,bl)}${R(-140,-112,280,12,'#c8d4e4','#8a9ab0',2)}${R(60,-162,50,40,'#2a3440','#8a9ab0',3)}${R(66,-156,38,28,'#7ac8f0')}${L('M85 -122V-112','#8a9ab0',4)}${P('M-80 -112Q-80 -128 -66 -128Q-52 -128 -52 -112Z',gelb,'#8a6a10',2)}${C(-66,-130,3,'#8a6a10')}${X(0,-20,'EMPFANG','22',bl)}`;
const wachbuch=()=>`${sch(50)}${L('M0 -4V-112','#5a6a80',8)}${R(-40,-8,80,8,'#5a6a80')}${P('M-60 -112H60L52 -136H-52Z','#8a6a40',dk,3)}${P('M-50 -134L0 -128L50 -134L44 -152L0 -146L-44 -152Z','#fff','#8a8a90',2)}${R(-2,-148,4,20,bl)}${L('M-36 -142L-10 -139M10 -139L36 -142','#8a8a90',2)}`;
const stuehle=()=>`${sch(90)}${[-60,0,60].map(x=>R(x-24,-50,48,8,bl)+R(x-24,-96,48,46,hb,bl,3)+L(`M${x-20} -42V0M${x+20} -42V0`,gr,4)).join('')}`;
const stadtplan=()=>`${R(-90,-64,180,128,'#eef2e4','#3a5a8a',4)}${P('M-90 30Q-30 10 20 40T90 20V40Q40 50 20 60T-90 50Z','#8ac8f0')}${R(-60,-50,50,36,'#9ad070')}${L('M-90 -10H90M30 -64V64M-30 -64L-10 64','#fff',8)}${C(30,-10,9,rot,'#fff',3)}${R(48,-52,30,24,bl)}`;
const wasserspender=()=>`${sch(36)}${R(-28,-110,56,110,'#e8ecf2','#7a8aa0',3)}${R(-12,-76,24,6,gr)}${P('M-24 -110V-160Q-24 -176 0 -176Q24 -176 24 -160V-110Z','rgba(120,190,250,.7)','#3a7ab0',3)}${R(-12,-94,24,10,'#5a6a80')}${C(-8,-60,4,'#3a8ae0')}${C(8,-60,4,rot)}`;
const pflanze=()=>`${sch(40)}${[-50,-30,-10,10,30,50].map((a,k)=>P(`M0 -50Q${a} ${-100-k%2*30} ${a*1.4} ${-130-k%3*20}Q${a*.4} -90 0 -50Z`,'#3a9a4a','#1a6a2a',2)).join('')}${P('M-30 0L-36 -50H36L30 0Z','#e8e8f0','#8a9ab0',3)}${R(-36,-36,72,8,bl)}`;
const hinweistafel=()=>`${L('M-60 66V240M60 66V240','#6a6a70',8)}${R(-86,-66,172,136,'#fff','#2a5aa8',6)}${X(0,-38,'ÜBUNGSPLATZ','20',bl)}${[-12,16,44].map((y,k)=>C(-56,y,10,[rot,gruen,gelb][k])+L(`M-38 ${y}H${k==1?40:60}`,'#8a8a90',5)).join('')}`;
const vorfahrt=()=>`${L('M0 40V250','#8a8e98',8)}${P('M0 -52L52 0L0 52L-52 0Z','#fff','#2a2a30',3)}${P('M0 -36L36 0L0 36L-36 0Z',gelb)}`;
const fussampel=()=>`${sch(30)}${L('M0 0V-200','#4a4e58',8)}${R(-24,-252,48,94,'#2a2e38','#111',3)}${C(0,-228,15,rot)}${C(0,-182,15,'#1a4a2a')}${C(0,-237,3.5,'#fff')}${L('M0 -232V-222L-5 -214M0 -222L5 -214M-6 -228H6','#fff',3)}${R(-14,-130,28,36,gelb,'#8a6a10',2)}${C(0,-112,6,gr)}`;
const tretauto=()=>`${sch(70)}${P('M-70 -24V-56Q-60 -70 -30 -72L10 -100H40L60 -60H70V-24Z',bl,nb,3)}${R(-70,-52,140,8,'#fff')}${R(14,-108,14,8,'#5ab0ff')}${L('M10 -100L0 -122',gr,4)}${C(-2,-124,9,'none',gr,3)}${C(-44,-20,18,gr,'#111',3)}${C(46,-20,18,gr,'#111',3)}${C(-44,-20,6,chrom)}${C(46,-20,6,chrom)}`;
const leitkegel=()=>`${sch(70)}${[-44,0,44].map((x,k)=>P(`M${x-20} 0L${x-6} ${-60-k%2*16}H${x+6}L${x+20} 0Z`,orange,'#8a3a08',2)+R(x-24,-6,48,6,orange)+L(`M${x-13} -20H${x+13}M${x-9} -38H${x+9}`,'#fff',6)).join('')}`;
const schulweg=()=>`${R(-80,-66,160,132,'#fff','#2a5aa8',4)}${R(-70,-6,140,56,'#8a8e98')}${[-54,-30,-6,18,42].map(x=>R(x,-6,14,56,'#fff')).join('')}${C(-40,-46,10,'#f0c8a0')}${R(-48,-36,16,24,gelb)}${L('M-44 -12V0M-36 -12V0','#3a3a5a',4)}${X(28,-34,'SCHULWEG','16',bl)}`;
const radstaender=()=>`${sch(100)}${[-60,-20,20,60].map(x=>L(`M${x-14} 0V-50Q${x-14} -64 ${x} -64Q${x+14} -64 ${x+14} -50V0`,chrom,5)).join('')}${rad(-50,-36,30)}${rad(40,-36,30)}${L('M-50 -36L-14 -80L30 -80L40 -36M-14 -80L0 -36L30 -80M-16 -90H-4M30 -80L26 -96H38',gruen,5)}`;
const roller=()=>`${sch(46)}${L('M-40 -14H34L44 -124M32 -124H56','#3a3a5a',6)}${R(-34,-22,64,9,hb)}${C(-40,-10,10,gr)}${C(40,-10,10,gr)}`;
const etiketten=()=>`${R(-84,-62,168,124,'#fff',tk,4)}${[[-48,-30],[12,-34],[52,-12],[-38,24],[30,30]].map(([x,y],k)=>P(`M${x-24} ${y-12}H${x+14}L${x+24} ${y}L${x+14} ${y+12}H${x-24}Z`,['#fff8a0','#a8e0ff','#ffd0d8','#c8f0b8','#ffe0a0'][k],'#8a8a90',1.5)+C(x+14,y,3,'#fff','#555',1)+L(`M${x-16} ${y}H${x+4}`,'#6a6a70',2)).join('')}`;
const schluesselbrett=()=>`${R(-80,-50,160,100,holz,dk,4)}${[-56,-28,0,28,56].map((x,k)=>{const c=['#e0b030',chrom][k%2],y=k%2?10:2;return C(x,-30,4,chrom)+L(`M${x} -30V${y-9}`,gr,2)+C(x,y,8,'none',c,4)+R(x-3,y+8,6,18,c)+R(x+3,y+20,5,4,c);}).join('')}`;
const schirmstaender=()=>`${sch(46)}${[[-24,-170,rot],[0,-192,bl],[22,-160,gelb]].map(([x,y,c])=>L(`M${x} -40V${y}`,c,11)+L(`M${x} ${y}q0 -14 -10 -14`,gr,4)).join('')}${P('M-36 0L-40 -80H40L36 0Z',tk,'#1a3a4a',3)}${R(-40,-60,80,8,'#5a9aa8')}`;
const karteikasten=()=>`${sch(60)}${[-30,-18,-6,6,18,30].map(x=>R(x-5,-142,10,26,'#fff','#aaa',1)).join('')}${P('M-40 -100V-128H40V-100Z',tk,'#1a3a4a',2)}${R(-56,-100,112,100,holz,dk,3)}${[-90,-60,-30].map(y=>R(-48,y,96,24,'#c8a070',dk,2)+R(-8,y+9,16,6,chrom)).join('')}`;
const rucksackkiste=()=>`${sch(80)}${[[-40,'#e85a3a'],[10,'#3a9a5a'],[52,'#5a6ae0']].map(([x,c])=>P(`M${x-24} -40V-100Q${x-24} -124 ${x} -124Q${x+24} -124 ${x+24} -100V-40Z`,c,'rgba(0,0,0,.4)',2)+R(x-14,-82,28,22,'rgba(255,255,255,.3)')+L(`M${x-10} -124Q${x} -136 ${x+10} -124`,gr,3)).join('')}${R(-76,-56,152,56,'#8aa0b0','#3a4a5a',3)}${R(-76,-56,152,10,'#6a8090')}`;
const ordnungsplakat=()=>`${R(-80,-66,160,132,'#fff',tk,4)}${X(0,-40,'ORDNUNG','20',tk)}${[0,44].map(y=>R(-64,y,128,6,holz)).join('')}${[[-50,rot],[-14,bl],[22,gelb]].map(([x,c],k)=>R(x,-26,26,26,c)+X(x+13,-8,'ABC'[k],'14','#fff')+R(x+4,20,22,24,c,'#888',1)).join('')}${C(54,30,10,gruen)}`;
const fundrad=()=>`${sch(90)}${rad(-50,-36,34)}${rad(50,-36,34)}${L('M-50 -36L-12 -86L36 -86L50 -36M-12 -86L4 -36L36 -86M-18 -96H-2M36 -86L30 -104H48',tk,5)}${P('M46 -100L66 -92V-72L46 -80Z',gelb,'#8a6a10',2)}${L('M40 -104L50 -96',gr,2)}`;
const muetzenkorb=()=>`${sch(60)}${[[-34,rot],[0,'#3a8ae0'],[32,gruen]].map(([x,c])=>P(`M${x-22} -46Q${x-22} -80 ${x} -80Q${x+22} -80 ${x+22} -46Z`,c,'rgba(0,0,0,.3)',2)+C(x,-84,7,'#fff')).join('')}${P('M-60 -50H60L48 0H-48Z','#c8963a','#6a4a10',3)}${L('M-56 -34H56M-52 -18H52','#6a4a10',2)}`;
const wandtafel=()=>`${R(-110,-70,220,140,'#2a5a3a','#8a5a30',8)}${X(0,-34,'1 km = 1000 m','18','#f4f4e8')}${X(0,-4,'1 h = 60 min','18','#f4f4e8')}${L('M-70 30H60M48 20L60 30L48 40','#f4f4e8',3)}${R(-80,22,20,12,'#f4d070')}${R(-100,70,200,8,'#8a5a30')}`;
const schilderplakat=()=>`${R(-84,-64,168,128,'#fff','#c8781a',4)}${C(-42,-26,22,'#fff',rot,6)}${C(42,-26,22,'#2a6ae0')}${L('M42 -12V-38M32 -28L42 -40L52 -28','#fff',5)}${P('M-42 10L-18 50H-66Z','#fff',rot,5)}${R(20,10,44,44,'#2a6ae0')}${X(42,42,'P','30','#fff')}`;
const helmregal=()=>`${sch(80)}${R(-76,-124,152,124,'#e8e0d0','#8a7a5a',3)}${R(-76,-66,152,6,'#8a7a5a')}${[[-36,-66,rot],[34,-66,bl],[-36,-6,gelb],[34,-6,gruen]].map(([x,y,c])=>P(`M${x-26} ${y}Q${x-26} ${y-42} ${x} ${y-42}Q${x+26} ${y-42} ${x+26} ${y}Z`,c,'rgba(0,0,0,.35)',2)+L(`M${x-14} ${y-30}L${x-6} ${y-10}M${x+2} ${y-36}V${y-12}M${x+14} ${y-30}L${x+8} ${y-10}`,'rgba(255,255,255,.5)',3)).join('')}`;
const kreuzung=()=>`${sch(120)}${L('M-100 0V-62M100 0V-62',dk,7)}${R(-120,-76,240,16,holz,dk,3)}${P('M-110 -76L-80 -122H80L110 -76Z','#6ab04a','#3a7a2a',2)}${P('M-30 -76L-16 -122H16L30 -76Z','#7a7e88')}${P('M-100 -92L-95 -106H95L100 -92Z','#7a7e88')}${R(-64,-104,16,9,rot)}${R(4,-90,9,13,bl)}${L('M44 -104V-134','#333',3)}${C(44,-136,5,gruen)}${R(60,-120,14,14,'#e8d8c0')}`;
const pult=()=>`${sch(100)}${R(-90,-78,60,78,'#c89a60',dk,3)}${R(40,-78,50,78,'#c89a60',dk,3)}${R(-100,-92,200,14,holz,dk,3)}${R(-60,-112,50,20,bl)}${R(-56,-124,44,12,rot)}${L('M50 -98V-92',gr,4)}${C(50,-120,22,'#5ab0e8','#2a5aa8',3)}${P('M38 -132Q50 -138 60 -126Q54 -112 42 -116Z',gruen)}`;
const zeitplakat=()=>`${R(-84,-64,168,128,'#fff','#c8781a',4)}${R(-72,12,144,22,'#8a8e98')}${L('M-66 23H66','#fff',2)}${R(-66,-4,32,14,rot)}${C(-58,12,4,gr)}${C(-42,12,4,gr)}${L('M58 12V-34',gr,3)}${[0,1,2].map(k=>R(58+k*6,-34+(k%2)*6,6,6,gr)+R(58+k*6,-28-(k%2)*6,6,6,'#fff')).join('')}${C(-34,-36,18,'#fff',gr,3)}${L('M-34 -36V-48M-34 -36L-26 -32',gr,3)}${X(10,58,'Weg und Zeit','14','#c8781a')}`;
const westen=()=>`${sch(40)}${L('M0 0V-182',gr,6)}${L('M-30 0H30',gr,6)}${L('M-42 -172H42',gr,4)}${[-30,30].map(x=>P(`M${x-18} -172H${x+18}L${x+22} -90H${x-22}Z`,'#d8f03a','#7a8a10',2)+L(`M${x-20} -132H${x+20}M${x-21} -110H${x+21}`,'#e8e8ec',5)).join('')}`;
const buecherkiste=()=>`${sch(70)}${[-50,-30,-10,10,30,50].map((x,k)=>R(x-8,-80-k%3*8,16,60+k%3*8,['#d83a2a','#2a6ae0','#3a9a4a','#f2c14e','#8a4ac0','#f28a1a'][k],'rgba(0,0,0,.3)',1)).join('')}${R(-66,-52,132,52,holz,dk,3)}${L('M-66 -26H66',dk,2)}`;
const dienstplan=()=>`${L('M-60 60V240M60 60V240','#5a5e68',8)}${R(-86,-64,172,128,'#f4f6fa',bl,4)}${R(-86,-64,172,22,bl)}${X(0,-47,'DIENSTPLAN','15','#fff')}${[-20,6,32].map(y=>L(`M-76 ${y}H76`,'#b8c4d4',2)).join('')}${[-40,0,40].map(x=>L(`M${x} -42V56`,'#b8c4d4',2)).join('')}${[[-58,-8,hb],[-18,18,gelb],[22,-8,gruen],[58,44,hb],[-58,44,rot]].map(([x,y,c])=>R(x-14,y-8,28,14,c)).join('')}`;
const hofleuchte=()=>`${C(0,30,130,'url(#licht)')}${L('M-50 -30H0V-14',gr,5)}${R(-56,-50,10,40,gr)}${P('M-20 -14H20L26 14L0 40L-26 14Z','#fff6b0',gr,3)}${L('M-20 -14L0 40L20 -14',gr,2)}`;
const streifenwagen=()=>`${sch(130)}${P('M-130 -30V-70Q-130 -84 -110 -86L-70 -88L-40 -126H50L84 -88L118 -84Q130 -80 130 -66V-30Z','#f4f6fa','#2a3440',3)}${R(-130,-70,260,16,bl)}${P('M-36 -120L-64 -88H-2V-120Z','#9ad0f0')}${P('M6 -120V-88H74L46 -120Z','#9ad0f0')}${R(-12,-140,32,14,'#3a8ae0','#1a3a6a',2)}${X(0,-36,'POLIZEI','20',bl)}${C(-80,-28,22,'#2a2a30')}${C(80,-28,22,'#2a2a30')}${C(-80,-28,9,chrom)}${C(80,-28,9,chrom)}${C(124,-74,5,'#fff6b0')}`;
const staffel=()=>`${sch(110)}${[-50,56].map(x=>rad(x-34,-36,30)+rad(x+34,-36,30)+L(`M${x-34} -36L${x-4} -82L${x+26} -82L${x+34} -36M${x-4} -82L${x+6} -36L${x+26} -82M${x-10} -92H${x+2}M${x+26} -82L${x+22} -98H${x+36}`,bl,5)+R(x+20,-72,26,26,'#f4f6fa',bl,2)).join('')}`;
const fahnen=()=>`${sch(90)}${[-60,0,60].map((x,k)=>L(`M${x} 0V${-200+k%2*20}`,chrom,5)+C(x,-202+k%2*20,5,gelb)+P(`M${x+3} ${-196+k%2*20}Q${x+30} ${-206+k%2*20} ${x+54} ${-192+k%2*20}V${-152+k%2*20}Q${x+30} ${-166+k%2*20} ${x+3} ${-156+k%2*20}Z`,[bl,'#fff',hb][k],'rgba(0,0,0,.2)',1.5)).join('')}${R(-80,-10,160,10,'#8a8e98')}`;
const berufetafel=()=>`${R(-90,-64,180,128,'#fff8e8',bl,4)}${[[-56,'#f0c8a0'],[0,'#a8704a'],[56,'#e8b890']].map(([x,h],k)=>R(x-18,0,36,44,k==1?'#f4f6fa':bl,gr,1.5)+C(x,-16,15,h)+(k==0?R(x-16,-38,32,9,bl)+R(x-18,-30,36,4,nb):k==1?P(`M${x-18} -24Q${x} -48 ${x+18} -24Z`,'#fff',gr,2):P(`M${x-24} 56H${x+24}L${x+16} 44H${x-16}Z`,hb))).join('')}`;
const motorrad=()=>`${sch(90)}${rad(-60,-30,26)}${rad(60,-30,26)}${P('M-60 -30L-30 -70H30L60 -30Z','#f4f6fa',bl,3)}${R(-40,-82,56,14,'#2a2a30')}${L('M30 -70L44 -104M36 -104H56',gr,5)}${R(-70,-74,30,30,'#f4f6fa',bl,3)}${C(50,-90,6,'#3a8ae0')}`;
const kuebel=()=>`${sch(50)}${[[-24,'#e85a8a'],[0,gelb],[24,'#e85a8a'],[-12,'#fff'],[12,'#fff']].map(([x,c],k)=>L(`M${x} -60L${x} ${-90-k%2*16}`,gruen,3)+C(x,-92-k%2*16,9,c)).join('')}${P('M-44 0L-50 -64H50L44 0Z','#8a94a8','#4a5468',3)}${R(-50,-66,100,8,'#c8d4e4')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="${nb}" stroke="#fff" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="${nb}" stroke="#fff" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #pos1{transform:scaleX(.1)}.tuer.offen #pos2{transform:scaleX(.1)}.tuer.offen #posch{transform:rotate(-80deg)}.tuer.offen #pore{transform:translateX(-205px)}.tuer.offen #poam{transform:scaleX(.08)}.tuer.offen .por{opacity:.15}.tuer.offen .pog{opacity:1}.tuer.offen #pot1{transform:translateX(-96px)}.tuer.offen #pot2{transform:translateX(96px)}</style>`;
function tuerSchwing(n){
const fl=x=>R(x,190,100,280,'#e8eef6',bl,4)+C(x+50,260,22,'#bfe4fa',bl,4)+R(x+(x<500?86:6),320,8,50,'#8a9ab0')+R(x,420,100,14,bl);
return`${R(380,150,240,320,'#fff','#8a9ab0',5)}${R(400,190,200,280,'#cfe0f4')}${L('M400 300H600','#a8c0e0',3)}${C(500,250,90,'url(#licht)')}${[440,560].map(x=>R(x-14,200,28,6,'#fff')).join('')}${R(470,330,60,90,'#9ab4d8')}${R(380,150,240,30,bl)}${X(500,172,'FLUR','20','#fff')}
   <g id="pos1" class="tb" style="transform-origin:400px 300px">${fl(400)}</g>
   <g id="pos2" class="tb" style="transform-origin:600px 300px">${fl(500)}</g>
   <g class="tb pl">${sPl(n,340)}</g>`;
}
function tuerSchranke(n){
let s='';for(let k=0;k<6;k++)s+=R(430+k*30,372,30,16,k%2?'#fff':rot);
return`${R(380,160,240,310,'#bfe4fa')}${R(380,300,240,40,'#8ac860')}${P('M380 470L470 320H530L620 470Z','#9aa0a8')}${R(430,230,140,90,'#f4f0e0',tk,3)}${P('M420 232L500 190L580 232Z',tk)}${R(486,272,28,48,tk)}${X(500,260,'FUNDBÜRO','14',tk)}${R(360,180,30,290,'#e8ecf2','#5a6a80',3)}${R(610,180,30,290,'#e8ecf2','#5a6a80',3)}${R(352,166,46,18,bl)}${R(602,166,46,18,bl)}${R(370,360,40,50,'#f4f4f0',bl,3)}
   <g id="posch" class="tb" style="transform-origin:396px 380px">${R(396,370,214,20,'#fff','#2a2a30',2)}${s}${C(396,380,9,gr)}</g>
   <g class="tb pl">${sPl(n,440)}</g>`;
}
function tuerRegal(n){
return`${R(390,140,220,330,'#5a4a3a')}${R(410,160,180,310,'#fbeec0')}${C(500,280,100,'url(#licht)')}${R(430,190,140,90,'#2a5a3a','#8a5a30',4)}${R(410,400,180,70,'#c8a060')}
   <g id="pore" class="tb">${R(400,150,200,320,holz,dk,4)}${[230,310,390].map(y=>R(400,y,200,8,dk)).join('')}${C(440,214,14,rot)}${R(470,196,40,32,'#3a8ae0',gr,1.5)}${P('M530 230Q530 196 560 196Q590 196 590 230Z',gelb)}${C(440,290,18,'#fff',gr,2)}${P('M480 310V270Q500 256 520 270V310Z',gruen)}${R(540,278,40,32,'#c8945a',dk,2)}${E(450,382,24,10,'#6a4a3a')}${E(520,382,24,10,'#6a4a3a')}${L('M565 390V330','#5a3a8a',8)}${R(420,420,160,40,'#c8945a',dk,2)}</g>
   <g class="tb pl">${sPl(n,440)}</g>`;
}
function tuerAmpel(n){
return`${R(390,150,220,320,'#c89a60','#6a4a28',5)}${R(410,170,180,300,'#d8ecf8')}${R(410,380,180,90,'#7a7e88')}${L('M440 470L480 380M560 470L520 380','#fff',4)}${C(500,280,90,'url(#licht)')}
   <g id="poam" class="tb" style="transform-origin:410px 300px">${R(410,170,180,300,'#f4d070','#8a6a20',4)}${R(450,200,100,80,'#bfe4fa','#8a6a20',4)}${R(560,320,12,40,'#6a4a28')}${R(430,420,140,10,'#c8a040')}</g>
   ${R(614,190,36,92,'#2a2e38','#111',3)}<circle cx="632" cy="214" r="12" fill="#e83a2a" class="tb por"/><circle cx="632" cy="258" r="12" fill="#2ae05a" opacity=".15" class="tb pog"/>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerTor(n){
const g=x=>{let s='';for(let k=0;k<6;k++)s+=L(`M${x+8+k*17} 200V460`,'#e8ecf2',6);return s+L(`M${x} 210H${x+100}M${x} 330H${x+100}M${x} 450H${x+100}`,'#e8ecf2',8)+R(x+30,300,40,40,bl,'#fff',2);};
return`${R(400,170,200,300,'#3a2e5a')}${R(420,300,60,170,'#5a4a7a')}${R(432,320,14,14,'#ffe08a')}${R(520,280,60,190,'#5a4a7a')}${R(540,300,14,14,'#ffe08a')}${C(500,260,80,'url(#licht)')}${R(400,420,200,50,'#5a5a62')}${R(370,150,30,320,'#c8d4e4','#5a6a80',3)}${R(600,150,30,320,'#c8d4e4','#5a6a80',3)}${C(385,140,14,'#fff6b0')}${C(615,140,14,'#fff6b0')}
   <g id="pot1" class="tb">${g(400)}</g><g id="pot2" class="tb">${g(500)}</g>
   <g class="tb pl">${sPl(n,260)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'schwingtuer';
const arten={schwingtuer:[tuerSchwing,'Schwingtür zum Flur mit Zahlenschloss'],schranke:[tuerSchranke,'Schranke am Übungsplatz mit Zahlenschloss'],regal:[tuerRegal,'Schiebe-Regal im Fundbüro mit Zahlenschloss'],ampeltuer:[tuerAmpel,'Tür mit Ampel und Zahlenschloss'],hoftor:[tuerTor,'Hoftor mit Zahlenschloss']};
const a=arten[art]||arten.schwingtuer;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const mensch=(x,y,h,hut)=>`${L(`M${x-7} ${y}V${y-30}M${x+7} ${y}V${y-30}`,nb,9)}${R(x-15,y-70,30,42,'#3a6ab0')}${R(x-15,y-56,30,5,'#fff')}${C(x,y-82,12,h)}${hut}<g class="powk" style="transform-origin:${x+13}px ${y-64}px">${L(`M${x+13} ${y-64}L${x+28} ${y-100}`,'#3a6ab0',8)}</g>${L(`M${x-13} ${y-64}L${x-20} ${y-34}`,'#3a6ab0',8)}`;
const kappe=(x,y)=>R(x-13,y-100,26,10,bl)+R(x-16,y-92,30,4,nb);
SZENARIEN.polizei={
name:"Die Polizei",
symbole:["postern","poampel","pohelm","poschild","poschluessel"],
symbolNamen:["Stern","Ampel","Helm","Schild","Schlüssel"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect x="8" y="14" width="104" height="66" rx="10" fill="#1a4f9c"/><rect x="8" y="58" width="104" height="10" fill="#fff"/><path d="M42 20L48 34L63 34L51 43L55 57L42 49L29 57L33 43L21 34L36 34Z" fill="#f2c14e"/><rect x="78" y="22" width="20" height="40" rx="5" fill="#2a2e38" stroke="#fff" stroke-width="2"/><circle cx="88" cy="32" r="5" fill="#e83a2a"/><circle cx="88" cy="50" r="5" fill="#2ae05a"/></svg>`,
texte:{
einleitung:"Willkommen bei der Polizei! Heute dürft ihr einen Tag lang auf der Polizeiwache mithelfen. Ihr kommt in die Wache, auf den Verkehrsübungsplatz, ins Fundbüro, in die Verkehrsschule und auf den Polizeihof. Die Wachleiterin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, bekommt am Ende eine Urkunde. Schafft ihr es?",
startKnopf:"Los geht&rsquo;s",
hinweisGeber:"Die Wachleiterin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Wachleiterin schüttelt freundlich den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Feierabend auf der Wache!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Polizei trotzdem noch ganz erkunden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Auf dem Polizeihof warten schon die Polizistinnen und Polizisten. Sie winken euch freundlich zu und überreichen euch eine Urkunde. Ihr seid jetzt echte Verkehrs-Expertinnen und Verkehrs-Experten!"
},
texteDu:{
einleitung:"Willkommen bei der Polizei! Heute darfst du einen Tag lang auf der Polizeiwache mithelfen. Du kommst in die Wache, auf den Verkehrsübungsplatz, ins Fundbüro, in die Verkehrsschule und auf den Polizeihof. Die Wachleiterin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, bekommt am Ende eine Urkunde. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Wachleiterin schüttelt freundlich den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Polizei trotzdem noch ganz erkunden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Auf dem Polizeihof warten schon die Polizistinnen und Polizisten. Sie winken dir freundlich zu und überreichen dir eine Urkunde. Du bist jetzt Verkehrs-Expertin oder Verkehrs-Experte!"
},
einfach:{
name:"Die Polizei",
symbolNamen:["Stern","Ampel","Helm","Schild","Schlüssel"],
texte:{
einleitung:"Ihr seid bei der Polizei. Ihr seht fünf Orte: die Wache, den Übungs-Platz, das Fund-Büro, die Verkehrs-Schule und den Hof. Die Chefin der Wache hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende bekommt ihr eine Urkunde. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Die Polizei gibt euch eine Urkunde. Alle winken euch zu!"
},
texteDu:{
einleitung:"Du bist bei der Polizei. Du siehst fünf Orte: die Wache, den Übungs-Platz, das Fund-Büro, die Verkehrs-Schule und den Hof. Die Chefin der Wache hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende bekommst du eine Urkunde. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Die Polizei gibt dir eine Urkunde. Alle winken dir zu!"
},
raeume:[
{titel:"Die Polizei-Wache",intro:"Hier ist es hell und freundlich. Die Polizei hilft allen Menschen. Die Tür zum Flur ist zu. Findet die Zahlen!",introDu:"Hier ist es hell und freundlich. Die Polizei hilft allen Menschen. Die Tür zum Flur ist zu. Finde die Zahlen!",
objekte:[{name:"Pinn-Wand",fund:"An der Pinn-Wand klebt:"},{name:"Notruf-Tafel",fund:"An der Tafel klebt:"},{name:"Empfangs-Tisch",fund:"Auf dem Tisch liegt:"},{name:"Wach-Buch",fund:"Im Buch liegt:"},{name:"Warte-Stühle",fund:"Auf dem Stuhl liegt:"}],
infoObjekte:[{name:"Stadt-Plan",fund:"Am Plan klebt:"},{name:"Wasser-Spender",fund:"Am Spender klebt:"},{name:"Grün-Pflanze",fund:"Bei der Pflanze liegt:"}]},
{titel:"Der Übungs-Platz",intro:"Die Sonne scheint. Hier gibt es kleine Straßen und Ampeln. Die Schranke ist zu. Findet die Zahlen!",introDu:"Die Sonne scheint. Hier gibt es kleine Straßen und Ampeln. Die Schranke ist zu. Finde die Zahlen!",
objekte:[{name:"Tafel am Zaun",fund:"An der Tafel klebt:"},{name:"Vorfahrt-Schild",fund:"Am Schild klebt:"},{name:"Fußgänger-Ampel",fund:"An der Ampel klebt:"},{name:"Tret-Auto",fund:"Im Auto liegt:"},{name:"Warn-Kegel",fund:"Unter dem Kegel liegt:"}],
infoObjekte:[{name:"Schulweg-Bild",fund:"Am Bild klebt:"},{name:"Fahrrad-Ständer",fund:"Am Ständer hängt:"},{name:"Roller",fund:"Am Roller hängt:"}]},
{titel:"Das Fund-Büro",intro:"Hier liegen verlorene Sachen. Alles hat einen Zettel. Ein Regal steht vor der Tür. Findet die Zahlen!",introDu:"Hier liegen verlorene Sachen. Alles hat einen Zettel. Ein Regal steht vor der Tür. Finde die Zahlen!",
objekte:[{name:"Zettel-Tafel",fund:"An der Tafel klebt:"},{name:"Schlüssel-Brett",fund:"Am Brett hängt:"},{name:"Schirm-Ständer",fund:"Im Ständer steckt:"},{name:"Karten-Kasten",fund:"Im Kasten liegt:"},{name:"Rucksack-Kiste",fund:"Im Rucksack liegt:"}],
infoObjekte:[{name:"Ordnungs-Bild",fund:"Am Bild klebt:"},{name:"Fund-Fahrrad",fund:"Am Fahrrad hängt:"},{name:"Mützen-Korb",fund:"Im Korb liegt:"}]},
{titel:"Die Verkehrs-Schule",intro:"Hier lernen Kinder die Regeln. An der Tür ist eine Ampel. Sie ist rot. Findet die Zahlen!",introDu:"Hier lernen Kinder die Regeln. An der Tür ist eine Ampel. Sie ist rot. Finde die Zahlen!",
objekte:[{name:"Tafel",fund:"An der Tafel klebt:"},{name:"Schilder-Bild",fund:"Am Bild klebt:"},{name:"Helm-Regal",fund:"Im Helm liegt:"},{name:"Mini-Kreuzung",fund:"Auf der Kreuzung liegt:"},{name:"Pult",fund:"Auf dem Pult liegt:"}],
infoObjekte:[{name:"Zeit-Weg-Bild",fund:"Am Bild klebt:"},{name:"Westen-Ständer",fund:"In der Weste steckt:"},{name:"Bücher-Kiste",fund:"In der Kiste liegt:"}]},
{titel:"Der Polizei-Hof",intro:"Es ist Abend. Das Polizei-Auto steht hier. Das Tor ist zu. Öffnet das letzte Schloss!",introDu:"Es ist Abend. Das Polizei-Auto steht hier. Das Tor ist zu. Öffne das letzte Schloss!",
objekte:[{name:"Dienst-Plan",fund:"Am Plan klebt:"},{name:"Hof-Lampe",fund:"An der Lampe klebt:"},{name:"Polizei-Auto",fund:"Im Auto liegt:"},{name:"Polizei-Fahrräder",fund:"In der Tasche liegt:"},{name:"Fahnen",fund:"An der Fahne hängt:"}],
infoObjekte:[{name:"Berufe-Tafel",fund:"An der Tafel klebt:"},{name:"Motor-Rad",fund:"Im Koffer liegt:"},{name:"Blumen-Kübel",fund:"Bei den Blumen liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Polizeiwache",
intro:"In der Polizeiwache ist es hell und freundlich. Durch die großen Fenster scheint die Sonne. Am Empfangstresen helfen die Polizistinnen und Polizisten allen, die eine Frage haben. Die Schwingtür zum Flur ist noch verschlossen. Findet die Ziffern, um sie zu öffnen!",
introDu:"In der Polizeiwache ist es hell und freundlich. Durch die großen Fenster scheint die Sonne. Am Empfangstresen helfen die Polizistinnen und Polizisten allen, die eine Frage haben. Die Schwingtür zum Flur ist noch verschlossen. Finde die Ziffern, um sie zu öffnen!",
tuerX:1250,tuerArt:"schwingtuer",
hintergrund:()=>`${defs('#e8ecf2','#b8c2d0','#f4faff')}${R(0,0,1600,470,'#f6f8fc')}${R(0,0,1600,34,'#dfe6f0')}${R(0,300,1600,170,'#e2eaf6')}${R(0,292,1600,12,bl)}${R(0,306,1600,4,'#fff')}${[[380,520],[780,900]].map(([a,b])=>R(a,90,b-a,170,'#bfe4fa','#8a9ab0',6)+L(`M${(a+b)/2} 90V260M${a} 175H${b}`,'#8a9ab0',5)+P(`M${a+10} 250L${a+50} 100H${a+70}L${a+30} 250Z`,'rgba(255,255,255,.5)')+C((a+b)/2,180,130,'url(#licht)')).join('')}${[150,650,1050,1450].map(x=>R(x-60,34,120,8,'#fff','#b8c4d4',2)+C(x,60,120,'url(#licht)')).join('')}${X(1250,100,'WACHE','30',bl)}${boden(0)}`,
objekte:[
{name:"Pinnwand",x:250,y:220,wand:true,by:-80,zeichne:pinnwand,fund:"An der Pinnwand hängt:"},
{name:"Notruftafel 110",x:650,y:210,wand:true,by:-85,zeichne:notruftafel,fund:"An der Notruftafel klebt:"},
{name:"Wartestühle",x:150,boden:700,fuss:4,by:-110,zeichne:stuehle,fund:"Auf einem Wartestuhl liegt:"},
{name:"Empfangstresen",x:450,boden:650,fuss:4,by:-180,zeichne:tresen,fund:"Auf dem Empfangstresen liegt:"},
{name:"Wachbuch auf dem Pult",x:850,boden:720,fuss:4,by:-165,zeichne:wachbuch,fund:"Im Wachbuch liegt:"}
],
infoObjekte:[{name:"Stadtplan",x:1000,y:230,wand:true,by:-80,zeichne:stadtplan,fund:"Am Stadtplan klebt:"},{name:"Wasserspender",x:1050,boden:600,fuss:4,by:-190,zeichne:wasserspender,fund:"Am Wasserspender klebt:"},{name:"Grünpflanze",x:1450,boden:740,fuss:4,by:-165,zeichne:pflanze,fund:"Neben der Grünpflanze liegt:"}]},
{titel:"Der Verkehrsübungsplatz",
intro:"Draußen auf dem Verkehrsübungsplatz scheint die Sonne. Hier gibt es kleine Straßen, Ampeln, Schilder und einen Zebrastreifen. Kinder üben mit Tretautos und Rollern, wie man sicher fährt. Die Schranke am Ausgang ist noch unten. Findet die Ziffern, um sie zu öffnen!",
introDu:"Draußen auf dem Verkehrsübungsplatz scheint die Sonne. Hier gibt es kleine Straßen, Ampeln, Schilder und einen Zebrastreifen. Kinder üben mit Tretautos und Rollern, wie man sicher fährt. Die Schranke am Ausgang ist noch unten. Finde die Ziffern, um sie zu öffnen!",
tuerX:450,tuerArt:"schranke",
hintergrund:()=>`${defs('#8a8e96','#5a5e66','#fff8d0')}${hg('poH','#3a8ae0','#9ad0f4','#e0f4fc')}${R(0,0,1600,470,'url(#poH)')}${C(1450,80,44,'#fff6b0')}${C(1450,80,180,'url(#licht)')}${[[200,70],[800,100],[1150,60]].map(([x,y])=>E(x,y,70,20,'#fff')+E(x-30,y-12,34,18,'#fff')+E(x+24,y-14,36,22,'#fff')).join('')}${P('M0 380Q300 300 600 360T1200 340T1600 360V470H0Z','#8ac860')}${[120,640,980,1380,1560].map(x=>R(x-6,300,12,120,'#6a4a2a')+C(x,290,44,'#3a8a3a')+C(x-24,310,30,'#4a9a3a')).join('')}${R(0,400,1600,8,'#f4f4f0')}${R(0,436,1600,8,'#f4f4f0')}${[...Array(41)].map((_,k)=>R(k*40,384,6,86,'#f4f4f0')).join('')}${boden(1)}`,
objekte:[
{name:"Hinweistafel am Zaun",x:800,y:230,wand:true,by:-85,zeichne:hinweistafel,fund:"An der Hinweistafel klebt:"},
{name:"Vorfahrtsschild",x:1250,y:200,wand:true,by:-70,zeichne:vorfahrt,fund:"Am Vorfahrtsschild klebt:"},
{name:"Fußgängerampel",x:150,boden:740,fuss:4,by:-270,zeichne:fussampel,fund:"An der Fußgängerampel klebt:"},
{name:"Tretauto",x:700,boden:680,fuss:4,by:-150,zeichne:tretauto,fund:"Im Tretauto liegt:"},
{name:"Leitkegel",x:1000,boden:560,fuss:4,by:-100,zeichne:leitkegel,fund:"Unter einem Leitkegel liegt:"}
],
infoObjekte:[{name:"Schulweg-Plakat",x:1480,y:240,wand:true,by:-85,zeichne:schulweg,fund:"Am Schulweg-Plakat klebt:"},{name:"Fahrradständer",x:1350,boden:700,fuss:4,by:-120,zeichne:radstaender,fund:"Am Fahrradständer hängt:"},{name:"Kinderroller",x:1500,boden:600,fuss:4,by:-145,zeichne:roller,fund:"Am Kinderroller hängt:"}]},
{titel:"Das Fundbüro",
intro:"Im Fundbüro stehen hohe Holzregale voller Fundsachen: Schirme, Mützen, Rucksäcke und sogar ein Fahrrad. An jedem Stück hängt ein Etikett. So finden alle ihre verlorenen Sachen wieder. Ein schweres Regal versperrt den Durchgang. Findet die Ziffern, um es zur Seite zu schieben!",
introDu:"Im Fundbüro stehen hohe Holzregale voller Fundsachen: Schirme, Mützen, Rucksäcke und sogar ein Fahrrad. An jedem Stück hängt ein Etikett. So finden alle ihre verlorenen Sachen wieder. Ein schweres Regal versperrt den Durchgang. Finde die Ziffern, um es zur Seite zu schieben!",
tuerX:800,tuerArt:"regal",
hintergrund:()=>`${defs('#c8a070','#8a6a40','#fff0c8')}${R(0,0,1600,470,'#d4ecee')}${R(0,0,1600,30,'#b8d8dc')}${R(0,330,1600,140,'#a8ccd2')}${R(0,322,1600,10,tk)}${[200,600,1000,1400].map(x=>L(`M${x} 30V80`,gr,3)+P(`M${x-34} 104L${x-16} 80H${x+16}L${x+34} 104Z`,tk)+C(x,130,140,'url(#licht)')).join('')}${regalW(360,690)}${regalW(920,1060)}${X(800,118,'FUNDBÜRO','30',tk)}${boden(2)}`,
objekte:[
{name:"Etikettentafel",x:250,y:220,wand:true,by:-80,zeichne:etiketten,fund:"An der Etikettentafel klebt:"},
{name:"Schlüsselbrett",x:1150,y:210,wand:true,by:-70,zeichne:schluesselbrett,fund:"Am Schlüsselbrett hängt:"},
{name:"Schirmständer",x:150,boden:700,fuss:4,by:-220,zeichne:schirmstaender,fund:"Im Schirmständer steckt:"},
{name:"Karteikasten",x:450,boden:650,fuss:4,by:-160,zeichne:karteikasten,fund:"Im Karteikasten steckt:"},
{name:"Rucksackkiste",x:1100,boden:720,fuss:4,by:-150,zeichne:rucksackkiste,fund:"In einem Rucksack liegt:"}
],
infoObjekte:[{name:"Ordnungsplakat",x:1480,y:240,wand:true,by:-85,zeichne:ordnungsplakat,fund:"Am Ordnungsplakat klebt:"},{name:"Fundfahrrad",x:1300,boden:600,fuss:4,by:-125,zeichne:fundrad,fund:"Am Fundfahrrad hängt:"},{name:"Mützenkorb",x:600,boden:740,fuss:4,by:-110,zeichne:muetzenkorb,fund:"Im Mützenkorb liegt:"}]},
{titel:"Die Verkehrsschule",
intro:"Im Klassenraum der Verkehrsschule scheint warmes Licht durch die Fenster. Hier lernen Kinder die Verkehrsregeln und die Verkehrszeichen. Auf einem Tisch steht eine kleine Kreuzung mit Autos und Ampeln. Die Ampel an der Tür zeigt noch Rot. Findet die Ziffern, damit sie grün wird!",
introDu:"Im Klassenraum der Verkehrsschule scheint warmes Licht durch die Fenster. Hier lernen Kinder die Verkehrsregeln und die Verkehrszeichen. Auf einem Tisch steht eine kleine Kreuzung mit Autos und Ampeln. Die Ampel an der Tür zeigt noch Rot. Finde die Ziffern, damit sie grün wird!",
tuerX:1300,tuerArt:"ampeltuer",
hintergrund:()=>`${defs('#c8dcb0','#8aa878','#fff0c0')}${R(0,0,1600,470,'#fbeec0')}${R(0,0,1600,30,'#f0dca0')}${R(0,360,1600,110,'#c89a60')}${R(0,352,1600,10,'#8a5a30')}${[...Array(20)].map((_,k)=>L(`M${k*80+40} 362V470`,'#a87a40',2)).join('')}${[[440,580],[1450,1580]].map(([a,b])=>R(a,70,b-a,200,'#bfe4fa','#c89a60',8)+L(`M${(a+b)/2} 70V270M${a} 170H${b}`,'#c89a60',5)+C((a+b)/2,170,170,'url(#licht)')+P(`M${a} 270L${b} 270L${b+140} 470H${a+60}Z`,'rgba(255,250,210,.25)')).join('')}${C(880,90,34,'#fff','#8a5a30',5)}${L('M880 90V68M880 90L896 98',gr,4)}${boden(3)}`,
objekte:[
{name:"Wandtafel",x:300,y:210,wand:true,by:-85,zeichne:wandtafel,fund:"An der Wandtafel klebt:"},
{name:"Schilder-Plakat",x:700,y:220,wand:true,by:-80,zeichne:schilderplakat,fund:"Am Schilder-Plakat klebt:"},
{name:"Helmregal",x:200,boden:700,fuss:4,by:-140,zeichne:helmregal,fund:"In einem Fahrradhelm liegt:"},
{name:"Modellkreuzung",x:550,boden:640,fuss:4,by:-150,zeichne:kreuzung,fund:"Auf der Modellkreuzung liegt:"},
{name:"Pult mit Globus",x:900,boden:720,fuss:4,by:-160,zeichne:pult,fund:"Auf dem Pult liegt:"}
],
infoObjekte:[{name:"Plakat Weg und Zeit",x:1050,y:230,wand:true,by:-80,zeichne:zeitplakat,fund:"Am Plakat Weg und Zeit klebt:"},{name:"Warnwesten-Ständer",x:1050,boden:600,fuss:4,by:-200,zeichne:westen,fund:"In einer Warnweste steckt:"},{name:"Bücherkiste",x:1500,boden:740,fuss:4,by:-110,zeichne:buecherkiste,fund:"In der Bücherkiste liegt:"}]},
{titel:"Der Polizeihof",
intro:"Draußen auf dem Polizeihof wird es Abend. Der Himmel leuchtet orange, und die Hofleuchte geht an. Der Streifenwagen und die Fahrräder der Fahrradstaffel sind geputzt. Die Fahnen wehen im Wind. Das Hoftor hat das letzte Zahlenschloss. Findet die Ziffern, dann wartet eine Überraschung!",
introDu:"Draußen auf dem Polizeihof wird es Abend. Der Himmel leuchtet orange, und die Hofleuchte geht an. Der Streifenwagen und die Fahrräder der Fahrradstaffel sind geputzt. Die Fahnen wehen im Wind. Das Hoftor hat das letzte Zahlenschloss. Finde die Ziffern, dann wartet eine Überraschung!",
tuerX:600,tuerArt:"hoftor",
hintergrund:()=>`${defs('#6a6a74','#3a3a44','#ffd090')}${hg('poA','#3a3a8a','#e8806a','#ffd080')}${R(0,0,1600,470,'url(#poA)')}${[[140,40],[420,60],[760,30],[1300,36],[1520,70]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${C(300,300,60,'#ffe0a0')}${C(300,300,220,'url(#licht)')}${[...Array(9)].map((_,k)=>{const x=k*100,h=50+(k*37)%80;return R(x,300-h,90,h,'#5a4a7a')+R(x+30,316-h,14,14,'#ffe08a');}).join('')}${R(0,300,900,170,'#8a94a8','#4a5468',3)}${R(0,290,900,14,'#c8d4e4')}${R(880,110,720,360,'#e8eef6','#5a6a80',4)}${R(880,110,720,28,'#c8d4e4')}${R(880,262,720,16,bl)}${X(1240,132,'POLIZEI','22',bl)}${[[1150,160],[1520,160],[950,300],[1150,300],[1520,300]].map(([x,y])=>R(x-30,y,60,70,'#ffe08a','#5a6a80',4)+L(`M${x} ${y}V${y+70}`,'#5a6a80',3)).join('')}${boden(4)}`,
objekte:[
{name:"Dienstplan",x:200,y:230,wand:true,by:-80,zeichne:dienstplan,fund:"Am Dienstplan klebt:"},
{name:"Hofleuchte",x:1000,y:200,wand:true,by:-65,zeichne:hofleuchte,fund:"An der Hofleuchte klebt:"},
{name:"Streifenwagen",x:300,boden:700,fuss:4,by:-160,zeichne:streifenwagen,fund:"Im Streifenwagen liegt:"},
{name:"Räder der Fahrradstaffel",x:950,boden:640,fuss:4,by:-115,zeichne:staffel,fund:"In einer Fahrradtasche liegt:"},
{name:"Fahnenmasten",x:1250,boden:700,fuss:4,by:-220,zeichne:fahnen,fund:"An einem Fahnenmast hängt:"}
],
infoObjekte:[{name:"Tafel der Polizeiberufe",x:1350,y:240,wand:true,by:-82,zeichne:berufetafel,fund:"An der Tafel der Polizeiberufe klebt:"},{name:"Polizei-Motorrad",x:800,boden:740,fuss:4,by:-120,zeichne:motorrad,fund:"Im Koffer am Motorrad liegt:"},{name:"Blumenkübel",x:1450,boden:600,fuss:4,by:-125,zeichne:kuebel,fund:"Im Blumenkübel liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs>${hg('poE','#2a3a8a','#e8806a','#ffd870')}<radialGradient id="poS"><stop offset="0" stop-color="#fff0c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes pof{50%{transform:translateY(-10px)}}@keyframes pow{50%{transform:rotate(-30deg)}}.pofl{animation:pof 3s ease-in-out infinite}.powk{animation:pow .8s ease-in-out infinite}</style>
   <rect width="1000" height="600" fill="url(#poE)"/>${[[60,50],[240,30],[780,40],[940,90]].map(([x,y])=>C(x,y,3,'#fff6c8')).join('')}${C(500,160,240,'url(#poS)')}
   ${R(700,250,300,180,'#e8eef6','#5a6a80',3)}${R(700,330,300,14,bl)}${X(850,290,'POLIZEI','26',bl)}${[750,850,950].map(x=>R(x-20,360,40,50,'#ffe08a','#5a6a80',3)).join('')}${R(0,420,1000,180,'#4a4a56')}${R(0,420,1000,14,'#8a94a8')}
   ${[[590,bl],[630,'#fff'],[670,hb]].map(([x,c])=>L(`M${x} 420V250`,chrom,4)+P(`M${x+2} 254Q${x+16} 246 ${x+30} 258V290Q${x+16} 280 ${x+2} 286Z`,c,'rgba(0,0,0,.2)',1)).join('')}
   <g transform="translate(170 470) scale(.75)">${streifenwagen()}</g>
   <g class="pofl">${R(320,50,360,190,'#fffaf0','#c8a040',8)}${R(336,66,328,158,'none',bl,3)}${X(500,112,'URKUNDE','36',bl)}${X(500,156,'VERKEHRS-EXPERTEN','26','#2a2a30')}${U('postern',476,172,48,gelb)}${U('poampel',400,176,40,bl)}${U('pohelm',560,176,40,rot)}</g>
   ${mensch(70,570,'#f0c8a0',kappe(70,570))}${mensch(170,585,'#8a5a3a',E(170,488,16,8,'#fff','#aaa',2)+R(156,490,28,6,'#fff'))}${mensch(830,585,'#e8b890',kappe(830,585)+E(845,500,6,12,'#6a4a2a'))}${mensch(930,570,'#a8704a',kappe(930,570))}
   ${U('poschild',120,120,30,'#fff6c0')}${U('poschluessel',860,150,34,'#fff6c0')}${U('postern',260,70,26,'#fff6c0')}${U('postern',730,80,26,'#fff6c0')}`
};
const regalW=(a,b)=>{let s=R(a,120,b-a,350,'#9a6a3a',dk,4);for(const y of[200,280,360,440]){s+=R(a,y,b-a,8,dk);for(let j=0,x=a+14;x<b-40;j++,x+=46){const k=(j+y/40)%5;s+=k<2?R(x,y-40,34,40,['#e85a3a','#3a8ae0'][k],'rgba(0,0,0,.3)',1.5):k<4?P(`M${x} ${y}Q${x} ${y-34} ${x+17} ${y-34}Q${x+34} ${y-34} ${x+34} ${y}Z`,['#3a9a5a','#f2c14e'][k-2]):L(`M${x+8} ${y}V${y-60}M${x+24} ${y}V${y-56}`,'#5a3a8a',7);}s+=R(a+10,y-14,18,10,'#fff');}return s;};
})();