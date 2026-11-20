document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-fipalme\" viewBox=\"-20 -20 40 40\"><path d=\"M-2 18Q4 2 1 -9\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/><path fill=\"currentColor\" d=\"M1 -9Q-10 -19 -19 -10Q-9 -12 1 -9ZM1 -9Q12 -19 19 -9Q9 -12 1 -9ZM1 -9Q-13 -6 -15 4Q-6 -6 1 -9ZM1 -9Q14 -6 16 4Q7 -6 1 -9ZM1 -9Q0 -20 4 -19Q3 -14 1 -9Z\"/></symbol>\n<symbol id=\"sym-fimuschel\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 16L-18 -2Q-14 -17 0 -17Q14 -17 18 -2Z\"/><path d=\"M0 14L-11 -14M0 14L0 -16M0 14L11 -14\" stroke=\"#fff\" stroke-width=\"2\" opacity=\".6\"/></symbol>\n<symbol id=\"sym-fiblume\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><circle cx=\"0\" cy=\"-10\" r=\"8\"/><circle cx=\"9.5\" cy=\"-3\" r=\"8\"/><circle cx=\"6\" cy=\"8\" r=\"8\"/><circle cx=\"-6\" cy=\"8\" r=\"8\"/><circle cx=\"-9.5\" cy=\"-3\" r=\"8\"/></g><circle cx=\"0\" cy=\"0\" r=\"5\" fill=\"#fff\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-fikristall\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -19L10 -6L6 17H-6L-10 -6Z\"/><path d=\"M-10 -6H10M0 -19L-3 17M0 -19L3 17\" stroke=\"#fff\" stroke-width=\"1.5\" opacity=\".6\" fill=\"none\"/></symbol>\n<symbol id=\"sym-fistern\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -19L5 -6L19 -6L8 3L12 17L0 9L-12 17L-8 3L-19 -6L-5 -6Z\"/></symbol>\n</defs>\n</svg>");
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
const B=(x,y,a,s,c)=>`<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0Q25 -16 50 0Q25 16 0 0Z" fill="${c}"/>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.3)');
const holz='#a8743a',dk='#4a2a10',gr='#3a3a40',sand='#f2d896',meer='#2a9ad0',gruen='#3a9a4a',dgr='#1a5a2a',gelb='#f6c84a',rot='#e0503a',lila='#9a5ad8',tuerkis='#3ad8d0',rosa='#f07ab0',orange='#f29a3a';
const palme=(x,y,h)=>L(`M${x} ${y}Q${x+24} ${y-h/2} ${x+8} ${y-h}`,holz,14)+[[-74,-6],[-56,34],[64,-16],[74,28],[6,-54]].map(([a,b])=>P(`M${x+8} ${y-h}Q${x+8+a/2} ${y-h+b-34} ${x+8+a} ${y-h+b}Q${x+8+a/2} ${y-h+b-12} ${x+8} ${y-h}Z`,gruen,dgr,2)).join('')+C(x+3,y-h+9,7,'#7a4a20')+C(x+14,y-h+11,7,'#7a4a20');
const mu=(x,y,s,c)=>P(`M${x} ${y}L${x-s} ${y-s*.7}Q${x} ${y-s*2} ${x+s} ${y-s*.7}Z`,c,'#a0603a',1.5);
const K=(x,y,h,c)=>P(`M${x} ${y}L${x-h/4} ${y-h*.7}L${x} ${y-h}L${x+h/4} ${y-h*.7}Z`,c,'rgba(255,255,255,.6)',2);
const pz=(x,y,s,c)=>R(x-s/5,y-s,s/2.5,s,'#e8e0d0')+P(`M${x-s*.7} ${y-s}Q${x} ${y-s*1.9} ${x+s*.7} ${y-s}Z`,c)+C(x,y-s*1.2,s*1.3,'url(#licht)');
const vogel=(x,y,c,f)=>E(x,y,14,20,c)+C(x,y-22,11,c)+P(`M${x+8} ${y-24}l10 4l-10 4Z`,gelb)+C(x+3,y-25,2.5,'#111')+P(`M${x-4} ${y+14}l-6 26l10 -6Z`,f)+P(`M${x-12} ${y-8}Q${x-26} ${y+6} ${x-10} ${y+12}Z`,f);
const kiste=(x,y,w,h,c)=>R(x,y,w,h,c||holz,dk,3)+L(`M${x} ${y+h/2}H${x+w}`,dk,2)+R(x+w/2-6,y+h/2-6,12,12,gelb,'#8a6010',1.5);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".55"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const hg=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<9;k++)d+=`M${-40+k*30} ${500+k*32}Q400 ${490+k*34} 800 ${500+k*32}T1640 ${500+k*32}`;let f='';for(let k=0;k<70;k++)f+=C((k*137+20)%1600,486+(k*53)%280,2+k%3,'rgba(160,110,50,.35)');for(let k=0;k<6;k++)f+=mu((k*263+90)%1600,520+(k*79)%220,9,[rosa,'#fff0e0',orange][k%3]);return g+L(d,'rgba(255,255,255,.35)',3)+f;}
if(m==1){for(let k=0;k<60;k++)d+=B((k*131+10)%1600,484+(k*47)%290,(k*67)%360,.5+k%3*.2,['#2a6a2a','#4a8a2a','#6aa83a','#a8702a'][k%4]);let f='';for(let k=0;k<14;k++)f+=E((k*211+60)%1600,500+(k*71)%260,60,12,'rgba(20,50,20,.25)');return g+f+d;}
if(m==2){for(let r=0;r<6;r++)for(let k=0;k<17;k++){const x=k*100+(r%2)*50,y=490+r*50;d+=`M${x-40} ${y}L${x-20} ${y-18}H${x+20}L${x+40} ${y}L${x+20} ${y+18}H${x-20}Z`;}let f='';for(let k=0;k<8;k++)f+=L(`M${k*210+40} ${500+(k*61)%200}l40 18l-20 30l50 12`,'#ffa040',4)+C(k*210+80,530+(k*61)%200,40,'url(#licht)');return g+L(d,'rgba(20,10,10,.5)',3)+f;}
if(m==3){for(let k=0;k<14;k++)d+=E((k*211+60)%1600,500+(k*67)%250,50,8,'rgba(0,0,30,.3)');let f='';for(let k=0;k<40;k++)f+=C((k*97+30)%1600,480+(k*37)%290,2,['#8af8ff','#f8a8ff','#fff'][k%3]);return g+d+E(1450,620,140,30,'#2a6ab0','#5ab0e8',3)+E(1450,616,100,16,'rgba(160,230,255,.5)')+f;}
for(let y of[490,515,545,580,620,670,730])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=110)d+=`M${800+(x-800)*.45} 470L${x} 780`;return g+L(d,'rgba(70,40,20,.5)',3)+E(800,620,260,60,'#c8503a','#8a2a20',4)+E(800,620,200,40,'none',gelb,4);}
const wegweiser=()=>`${L('M0 -60V90',holz,10)}${P('M-80 -60H50L74 -44L50 -28H-80Z','#c89a5a',dk,3)}${P('M80 -10H-50L-74 6L-50 22H80Z','#c89a5a',dk,3)}${X(-12,-38,'N','20',dk)}${X(14,12,'O','20',dk)}${U('fistern',-60,-56,22,gelb)}${U('fipalme',40,-6,24,dgr)}`;
const muschelkette=()=>`${L('M-90 -30Q0 30 90 -30','#c8a46a',4)}${[-70,-42,-14,14,42,70].map((x,k)=>mu(x,Math.abs(x)*-.45+28,13,[rosa,'#fff0e0',orange,'#f8d0a0',tuerkis,rosa][k])).join('')}${C(-90,-30,6,holz)}${C(90,-30,6,holz)}`;
const sandburg=()=>`${sch(90)}${P('M-90 0L-80 -40H80L90 0Z','#e8c070','#a07a30',3)}${R(-60,-90,40,50,'#e8c070','#a07a30',3)}${R(20,-90,40,50,'#e8c070','#a07a30',3)}${R(-24,-120,48,80,'#f0cc80','#a07a30',3)}${P('M-10 -40V-60Q0 -70 10 -60V-40Z','#a07a30')}${L('M0 -120V-150',dk,3)}${P('M0 -150L22 -142L0 -134Z',rot)}${mu(-60,-92,8,rosa)}${mu(40,-92,8,tuerkis)}`;
const treibholz=()=>`${sch(100)}${[[-90,-14,180],[-70,-40,150],[-40,-64,110]].map(([x,y,w],k)=>R(x,y,w,24,['#b8a080','#a08a6a','#c8b090'][k],'#6a5a40',3)+E(x,y+12,8,12,'#8a7a5a')+L(`M${x+20} ${y+12}H${x+w-30}`,'#7a6a50',2)).join('')}${E(40,-74,20,10,'#6ab0e8','#2a6a9a',2)}${R(54,-84,10,14,'#d8c0a0')}`;
const muschelhaufen=()=>`${sch(80)}${E(0,-14,80,20,sand,'#c8a060',2)}${[[-54,-24,16,rosa],[-24,-30,18,'#fff0e0'],[8,-26,15,orange],[38,-30,17,tuerkis],[-36,-48,14,'#f8d0a0'],[0,-54,16,rosa],[30,-50,13,'#fff0e0']].map(([x,y,s,c])=>mu(x,y,s,c)).join('')}${U('fistern',48,-46,28,rot)}`;
const gezeitentafel=()=>`${R(-86,-64,172,128,'#e8f4fc','#2a6a9a',4)}${R(-86,-64,172,22,meer)}${X(0,-47,'EBBE UND FLUT','14','#fff')}${L('M-70 10Q-50 -30 -30 10T10 10T50 10T90 10',meer,5)}${C(-50,-20,8,gelb)}${C(-10,40,8,'#5a6a9a')}${C(30,-20,8,gelb)}${L('M-80 50H80','#8ab0c8',2)}`;
const kokoskorb=()=>`${sch(70)}${P('M-66 -56H66L52 0H-52Z','#c8963a','#6a4a10',3)}${L('M-60 -38H60M-56 -20H56','#6a4a10',2)}${[-40,-10,20,48,-24,8].map((x,k)=>C(x,k>3?-78:-62,17,'#7a4a20','#3a2010',2)+C(x-4,(k>3?-78:-62)-4,3,'#3a2010')).join('')}`;
const ruderboot=()=>`${sch(120)}${P('M-120 -50H120Q110 0 70 0H-70Q-110 0 -120 -50Z','#4aa0d8','#1a4a7a',4)}${R(-120,-56,240,10,'#fff')}${L('M-30 -50L-100 -110M40 -50L110 -100',holz,6)}${E(-100,-110,10,18,holz)}${E(110,-100,10,18,holz)}${U('fimuschel',-14,-40,28,'#fff')}`;
const riesenbluete=()=>`${[0,72,144,216,288].map(a=>`<ellipse transform="rotate(${a})" cx="0" cy="-44" rx="30" ry="46" fill="${rosa}" stroke="#a02a6a" stroke-width="3"/>`).join('')}${C(0,0,26,gelb,'#c88a10',3)}${[...Array(8)].map((_,k)=>C(Math.sin(k)*14,Math.cos(k)*14,3,'#c86a10')).join('')}`;
const vogelnest=()=>`${L('M-90 20H90','#5a3a20',12)}${B(60,16,-20,1,gruen)}${E(0,0,60,26,'#a07a40','#5a3a20',3)}${L('M-50 0Q0 20 50 0M-44 12Q0 26 44 12','#5a3a20',2)}${E(-18,-14,12,16,'#bfe4fa')}${E(12,-16,12,16,'#bfe4fa')}${vogel(60,-30,'#3ac0e8',lila)}`;
const farnbusch=()=>`${sch(80)}${[-70,-45,-20,5,30,55,75].map((a,k)=>`<g transform="rotate(${a})">${L('M0 0V-130',dgr,4)}${[...Array(7)].map((_,j)=>B(0,-20-j*16,-150,.5-j*.05,k%2?'#3a8a2a':'#5aa83a')+B(0,-20-j*16,-30,.5-j*.05,k%2?'#3a8a2a':'#5aa83a')).join('')}</g>`).join('')}`;
const baumstumpf=()=>`${sch(80)}${P('M-70 0Q-60 -40 -56 -110H56Q60 -40 70 0Z','#8a5a30',dk,4)}${E(0,-110,56,16,'#d8b080',dk,3)}${E(0,-110,34,9,'none','#a07a40',2)}${E(0,-110,14,4,'none','#a07a40',2)}${pz(-40,-6,24,orange)}${L('M30 -60Q50 -50 46 -20','#5aa83a',5)}`;
const bananenstaude=()=>`${sch(70)}${R(-14,-170,28,170,'#8aa040','#4a6a20',3)}${B(0,-160,-150,2.2,'#5aa83a')}${B(0,-160,-30,2.2,'#4a9a2a')}${B(0,-150,-100,1.8,'#3a8a2a')}${[...Array(6)].map((_,k)=>P(`M${-8+k%2*16} ${-124+Math.floor(k/2)*16}q${k%2?24:-24} 6 ${k%2?30:-30} -14`,'none',gelb,7)).join('')}${L('M-8 -124V-80M8 -124V-80',gelb,7)}`;
const pflanzentafel=()=>`${R(-86,-64,172,128,'#f0f8e0','#3a6a2a',4)}${R(-86,-64,172,20,gruen)}${L('M-50 50V-10',dgr,4)}${B(-50,-10,-120,.8,gruen)}${B(-50,10,-60,.8,gruen)}${L('M-50 50Q-60 60 -70 58M-50 50Q-40 62 -30 58','#8a5a30',3)}${C(30,-10,14,rosa)}${L('M30 4V50',dgr,4)}${B(30,30,-20,.6,gruen)}${L('M-20 -30H10M-20 20H10','#8a8a70',3)}`;
const orchidee=()=>`${sch(50)}${P('M-30 0L-36 -44H36L30 0Z','#e8e0f0','#8a6aa8',3)}${L('M0 -44Q-10 -100 10 -150',dgr,4)}${[[10,-150],[22,-120],[-8,-110]].map(([x,y])=>[0,90,180,270].map(a=>`<ellipse transform="translate(${x} ${y}) rotate(${a+45})" cx="0" cy="-11" rx="8" ry="12" fill="${lila}"/>`).join('')+C(x,y,5,gelb)).join('')}${B(0,-44,-160,1,gruen)}${B(0,-44,-20,1,gruen)}`;
const bambus=()=>`${sch(60)}${[-36,-12,12,36].map((x,k)=>R(x-9,-200+k%2*20,18,200-k%2*20,'#b8c84a','#6a7a20',2)+[1,2,3].map(j=>L(`M${x-9} ${-50*j}H${x+9}`,'#6a7a20',3)).join('')).join('')}${L('M-50 -80H50',orange,6)}${B(36,-180,-50,.8,gruen)}`;
const lavatafel=()=>`${R(-80,-62,160,124,'#4a3a3a','#2a1a1a',6)}${P('M-60 40L-10 -40L10 -30L60 40Z','#7a5a5a')}${L('M-12 -38Q0 -50 12 -32','#ffa040',4)}${C(0,-46,10,orange)}${[[-40,-50],[30,-52],[50,-30]].map(([x,y])=>C(x,y,6,'rgba(255,255,255,.7)')).join('')}${L('M-46 30H46',gelb,3)}`;
const kristallspiegel=()=>`${E(0,0,70,80,'#5a3a7a','#2a1a3a',6)}${E(0,0,58,68,'#c8e8ff')}${L('M-30 -40L-10 -50M-36 -20L0 -40','#fff',4)}${[[-70,10,40],[70,0,44],[-50,70,30],[50,70,34],[0,-80,36]].map(([x,y,h])=>K(x,y+h/2,h,[lila,tuerkis,rosa][(x+y+300)%3])).join('')}`;
const lavasteine=()=>`${sch(90)}${[[-50,-30,40,'#5a4a4a'],[20,-34,46,'#4a3a3a'],[-14,-72,34,'#6a5050'],[60,-22,26,'#5a4848']].map(([x,y,r,c])=>E(x,y,r,r*.8,c,'#2a1a1a',3)+C(x-r*.3,y-r*.2,4,'rgba(20,10,10,.6)')+C(x+r*.3,y+r*.1,3,'rgba(20,10,10,.6)')).join('')}${L('M-50 -20l14 -10l8 12M20 -24l12 -12',orange,3)}`;
const dampfquelle=()=>`${sch(100)}${E(0,-14,96,24,'#7a6a6a','#3a2a2a',4)}${E(0,-16,74,14,'#6ad0e8')}${[-30,0,30].map((x,k)=>`<g class="fidm" style="animation-delay:${k*.7}s">${C(x,-56,16,'rgba(255,255,255,.75)')}${C(x+10,-80,20,'rgba(255,255,255,.6)')}${C(x-6,-108,24,'rgba(255,255,255,.45)')}</g>`).join('')}`;
const kristallbrocken=()=>`${sch(80)}${P('M-80 0L-60 -40H60L80 0Z','#5a4a4a','#2a1a1a',3)}${[[-50,-36,70,lila],[-20,-36,110,'#b87af0'],[14,-36,90,tuerkis],[44,-36,60,rosa]].map(([x,y,h,c])=>K(x,y,h,c)).join('')}${C(0,-80,80,'url(#licht)')}`;
const vulkanbild=()=>`${R(-88,-64,176,128,'#fff4e8','#8a4a2a',4)}${P('M-80 56L-20 -20H20L80 56Z','#9a7a6a','#5a3a2a',2)}${P('M-20 -20L-6 20L0 -2L8 30L20 -20Z',orange)}${L('M0 -20V56','#e04020',5)}${E(0,48,60,8,'#e8a060')}${C(-10,-40,10,'#ddd')}${C(10,-52,12,'#eee')}${L('M40 -40H76M40 -20H76M40 0H70','#8a6a5a',3)}`;
const waermebank=()=>`${sch(100)}${R(-100,-50,200,26,'#6a5050','#2a1a1a',3)}${R(-90,-24,30,24,'#5a4040','#2a1a1a',3)}${R(60,-24,30,24,'#5a4040','#2a1a1a',3)}${L('M-80 -37H80',orange,3)}${C(0,-37,90,'url(#licht)')}${E(-40,-60,22,10,lila)}${E(40,-58,18,8,tuerkis)}`;
const bimskorb=()=>`${sch(70)}${P('M-62 -50H62L50 0H-50Z','#c8963a','#6a4a10',3)}${L('M-56 -32H56M-52 -16H52','#6a4a10',2)}${[-38,-10,18,44,-22,8].map((x,k)=>E(x,k>3?-74:-58,16,12,'#e0d8c8','#8a8070',2)+C(x-4,(k>3?-74:-58)-2,2,'#a09a8a')+C(x+5,(k>3?-74:-58)+3,2,'#a09a8a')).join('')}`;
const pilzwand=()=>`${R(-84,-56,168,112,'#2a2a4a','#1a1a2a',4)}${[[-56,40,40,tuerkis],[-20,30,30,'#a8f060'],[16,44,46,rosa],[52,30,30,tuerkis],[-40,-10,24,'#a8f060'],[30,-14,26,lila]].map(([x,y,s,c])=>pz(x,y,s,c)).join('')}`;
const hoehlenbild=()=>`${R(-92,-62,184,124,'#8a7a6a','#4a3a2a',4)}${[[-50,10],[10,20]].map(([x,y])=>E(x,y,24,12,'#c86a3a')+L(`M${x-14} ${y+10}v14M${x+14} ${y+10}v14M${x+20} ${y-6}l12 -10`,'#c86a3a',4)).join('')}${C(50,-30,14,gelb)}${L('M-70 -30Q-50 -50 -30 -30','#fff',3)}${P('M-80 50H80','none','#c86a3a',3)}${U('fipalme',56,4,40,'#5a3a20')}`;
const schatztruhe=()=>`${sch(90)}${kiste(-80,-70,160,70,'#8a4a20')}${P('M-80 -70Q-80 -120 0 -120Q80 -120 80 -70Z','#a05a28',dk,3)}${L('M-40 -118V-70M40 -118V-70',gelb,6)}${L('M-40 -70V0M40 -70V0',gelb,6)}${C(0,-90,40,'url(#licht)')}${K(-20,-120,30,tuerkis)}${C(10,-124,8,gelb,'#a07010',2)}`;
const kristallsaeule=()=>`${sch(60)}${K(0,0,220,'#7af0ff')}${K(-40,0,120,lila)}${K(40,0,140,rosa)}${K(-20,0,80,tuerkis)}${C(0,-110,90,'url(#licht)')}${L('M-10 -180L6 -60','#fff',3)}`;
const wasserbecken=()=>`${sch(120)}${E(0,-20,120,30,'#4a4a6a','#2a2a40',6)}${E(0,-22,100,20,'#2a7ad0')}${E(-30,-26,30,6,'rgba(200,240,255,.6)')}${E(40,-20,20,4,'rgba(200,240,255,.6)')}${[[-80,-40],[86,-36]].map(([x,y])=>K(x,y,40,tuerkis)).join('')}${C(0,-22,90,'url(#licht)')}`;
const mineralientafel=()=>`${R(-88,-64,176,128,'#f4f0fc','#5a3a8a',4)}${R(-88,-64,176,20,lila)}${[[-56,0,lila],[-18,0,tuerkis],[20,0,rosa],[58,0,gelb]].map(([x,y,c])=>K(x,y+20,44,c)+L(`M${x-14} 42H${x+14}`,'#8a7aa0',3)).join('')}`;
const gluehglas=()=>`${sch(50)}${R(-36,-110,72,110,'rgba(200,240,255,.35)','#8ab0c8',4)}${R(-40,-122,80,16,holz,dk,2)}${[[-14,-80],[12,-60],[-6,-36],[18,-92],[-20,-20]].map(([x,y],k)=>`<g class="figl" style="animation-delay:${k*.4}s">${C(x,y,18,'url(#licht)')}${C(x,y,5,'#f0ff80')}</g>`).join('')}`;
const edelsteinkiste=()=>`${sch(70)}${kiste(-60,-60,120,60,'#5a3a8a')}${[[-40,-64,rot],[-14,-70,tuerkis],[14,-64,gelb],[40,-70,lila]].map(([x,y,c])=>P(`M${x-12} ${y}L${x-7} ${y-12}H${x+7}L${x+12} ${y}L${x} ${y+12}Z`,c,'#fff',2)).join('')}`;
const seekarte=()=>`${R(-90,-62,180,124,'#f0e4c0','#8a6a30',4)}${R(-80,-52,160,104,'#bfe4fa')}${P('M-30 -20Q0 -40 30 -16Q40 10 10 24Q-30 30 -36 4Z',sand,'#a07a30',2)}${E(-26,-4,8,5,gruen)}${E(14,0,10,6,gruen)}${R(20,-22,6,16,rot)}${L('M-70 40Q-40 30 -36 10',rot,2)}${U('fistern',48,-48,24,gelb)}`;
const sternkarte=()=>`${R(-86,-64,172,128,'#1a2a5a','#c8a040',4)}${[[-60,-30],[-30,-40],[0,-20],[30,-36],[60,-10],[-40,20],[10,30],[50,40]].map(([x,y])=>C(x,y,4,'#fff6c0')).join('')}${L('M-60 -30L-30 -40L0 -20L30 -36L60 -10M0 -20L10 30L50 40M10 30L-40 20','rgba(255,246,192,.5)',2)}${C(50,-46,12,'#fff0a0')}${C(55,-50,10,'#1a2a5a')}`;
const fernrohr=()=>`${sch(60)}${L('M0 0L-30 -70M0 0L30 -70M0 0V-70',dk,5)}${`<g transform="translate(0 -80) rotate(-25)">${R(-90,-14,120,28,'#c8a040','#6a4a10',3)}${R(30,-18,40,36,'#a07a20','#6a4a10',3)}${R(-100,-10,14,20,'#6a4a10')}</g>`}${C(0,-80,6,gr)}`;
const logbuchpult=()=>`${sch(60)}${R(-14,-120,28,120,holz,dk,3)}${P('M-70 -120L70 -140V-160L-70 -140Z','#8a5a30',dk,3)}${P('M-60 -146L0 -160L60 -170L60 -158L0 -150L-60 -138Z','#fff8e8','#8a7a6a',2)}${L('M0 -160V-150','#8a7a6a',2)}${R(-50,-8,100,8,dk)}`;
const kompasstisch=()=>`${sch(90)}${L('M-60 0V-80M60 0V-80',dk,8)}${E(0,-84,90,22,holz,dk,3)}${C(0,-96,30,'#f0e4c0','#c8a040',4)}${P('M0 -120L6 -96L0 -72L-6 -96Z',rot)}${X(0,-126,'N','12',dk)}`;
const windrose=()=>`${C(0,0,70,'#f8f0d8','#8a6a30',5)}${P('M0 -62L10 -10L62 0L10 10L0 62L-10 10L-62 0L-10 -10Z','#2a5a9a','#1a2a5a',2)}${P('M0 -62L10 -10L0 0Z',rot)}${['N','O','S','W'].map((t,k)=>X([0,52,0,-52][k],[-40,6,50,6][k],t,'16',dk)).join('')}`;
const seilrolle=()=>`${sch(70)}${[0,1,2,3].map(k=>E(0,-20-k*22,70-k*8,18,'none','#c8a46a',10)).join('')}${E(0,-108,34,10,'#8a6a3a')}${L('M60 -20Q90 -10 80 4','#c8a46a',8)}`;
const sternglobus=()=>`${sch(60)}${R(-40,-12,80,12,dk)}${L('M0 -12V-40',dk,6)}${C(0,-110,70,'#1a2a6a','#c8a040',5)}${E(0,-110,70,22,'none','#c8a040',3)}${[[-30,-140],[20,-150],[40,-100],[-40,-90],[0,-120],[10,-70]].map(([x,y])=>U('fistern',x-6,y-6,12,'#fff6c0')).join('')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a3a4a" stroke="#f6c84a" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a3a4a" stroke="#f6c84a" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #fip1{transform:scaleX(.1)}.tuer.offen #fip2{transform:scaleX(.1)}.tuer.offen #fil{transform:scaleY(.06)}.tuer.offen #fiw{transform:translateY(240px);opacity:0}.tuer .fit{opacity:0;transform:translateY(90px)}.tuer.offen .fit{opacity:1;transform:none}.tuer.offen #fis1{transform:translateX(-96px) rotate(-8deg)}.tuer.offen #fis2{transform:translateX(96px) rotate(8deg)}.tuer.offen #fig1{transform:scaleX(.1)}.tuer.offen #fig2{transform:scaleX(.1)}@keyframes fid{50%{transform:translateY(-14px);opacity:.4}}.fidm{animation:fid 3s ease-in-out infinite}@keyframes fiq{50%{opacity:.25}}.figl{animation:fiq 1.6s ease-in-out infinite}</style>`;
function tuerPalm(n){
const vh=x=>{let s='';for(let k=0;k<6;k++)s+=B(x+k*20,150,90,6,k%2?'#3a9a4a':'#5ab04a');return`<g>${s}</g>`;};
return`${R(390,150,220,320,'#2a6a2a')}${[420,470,540,580].map((x,k)=>R(x,170+k*20,16,300,'#5a3a20')).join('')}${C(500,330,110,'url(#licht)')}${P('M440 470L480 330H520L560 470Z',sand)}${palme(370,470,330)}${palme(630,470,330)}${L('M380 150Q500 100 620 150','#c8a46a',10)}${L('M380 160Q500 112 620 160','#a07a40',5)}
   <g id="fip1" class="tb" style="transform-origin:390px 300px">${vh(390)}</g>
   <g id="fip2" class="tb" style="transform-origin:610px 300px">${vh(498)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerLiane(n){
let v='';for(let k=0;k<11;k++){const x=402+k*18;v+=L(`M${x} 160Q${x+(k%2?10:-10)} 300 ${x} 466`,k%2?'#3a7a2a':'#5a9a3a',8);for(let j=0;j<5;j++)v+=B(x,190+j*60+k%3*12,k%2?40:140,.45,'#6ab83a');}
return`${R(390,150,220,320,'#f2a070')}${P('M400 380L480 240H520L600 380Z','#7a5a5a')}${C(500,240,20,orange)}${C(500,240,80,'url(#licht)')}${R(390,380,220,90,'#5a4a4a')}${P('M340 470Q360 300 350 120H400Q390 300 400 470Z','#6a4a2a',dk,3)}${P('M600 470Q610 300 600 120H650Q640 300 660 470Z','#6a4a2a',dk,3)}${P('M340 160Q500 90 660 160L650 130Q500 70 350 130Z','#6a4a2a',dk,3)}${B(360,130,-30,1.6,gruen)}${B(640,130,-150,1.6,gruen)}
   <g id="fil" class="tb" style="transform-origin:500px 150px">${v}</g>
   <g class="tb pl">${sPl(n,380)}</g>`;
}
function tuerTreppe(n){
let t='';for(let k=0;k<5;k++)t+=R(420+k*8,440-k*40,160-k*16,40,'#7a5a5a','#3a2020',3)+L(`M${424+k*8} ${446-k*40}H${576-k*8}`,orange,3);
return`${P('M340 470Q330 200 500 120Q670 200 660 470Z','#4a3a3a','#2a1a1a',5)}${P('M400 470V260Q500 170 600 260V470Z','#1a1a3a')}${[[440,300,40,tuerkis],[560,290,46,lila],[500,250,30,rosa]].map(([x,y,h,c])=>K(x,y,h,c)).join('')}${C(500,300,90,'url(#licht)')}${L('M360 400l30 -20l10 26M640 380l-24 -16l-6 30',orange,4)}
   <g class="tb fit">${t}</g>
   <g id="fiw" class="tb">${P('M396 470V270Q500 160 604 270V470Z','#6a5050','#2a1a1a',4)}${L('M420 330l40 20l30 -16l40 26l50 -18M430 410l60 -10l40 20l50 -14','#3a2020',3)}${C(500,250,10,orange)}</g>
   <g class="tb pl">${sPl(n,360)}</g>`;
}
function tuerFels(n){
const h=(a)=>P(a?'M500 470V140Q560 140 600 180Q640 260 630 470Z':'M500 470V140Q440 140 400 180Q360 260 370 470Z','#5a5a7a','#2a2a40',4)+K(a?560:440,330,50,a?rosa:tuerkis)+L(a?'M520 220l40 30l-10 40':'M480 220l-40 30l10 40','#3a3a5a',3);
return`${R(380,150,240,320,'#1a2a5a')}${[[410,190],[460,170],[560,200],[590,240],[430,260]].map(([x,y])=>C(x,y,3,'#fff6c0')).join('')}${P('M380 470V380Q450 360 500 390Q560 360 620 380V470Z','#2a6ab0')}${R(540,250,26,140,'#fff','#c84a3a',2)}${R(540,290,26,20,rot)}${R(540,340,26,20,rot)}${P('M536 250H570L553 230Z',rot)}${C(553,262,30,'url(#licht)')}${P('M340 470Q330 140 500 110Q670 140 660 470H620V180Q500 130 380 180V470Z','#3a3a5a','#1a1a30',4)}
   <g id="fis1" class="tb">${h(0)}</g>
   <g id="fis2" class="tb">${h(1)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerGalerie(n){
const fl=x=>R(x,180,110,290,'#2a6a9a','#1a3a5a',4)+C(x+55,250,30,'#bfe4fa','#c8a040',5)+R(x+16,320,78,120,'none','#1a3a5a',3)+C(x+(x<500?96:14),370,6,gelb);
return`${P('M380 470V190Q500 90 620 190V470Z','#e8e0d0','#8a7a6a',5)}${P('M390 470V190Q500 110 610 190V470Z','#2a2a6a')}${[[420,200],[470,170],[560,190],[580,240],[450,260],[520,230]].map(([x,y])=>C(x,y,3,'#fff6c0')).join('')}${[rot,orange,gelb,gruen,meer,lila].map((c,k)=>L(`M${400+k*6} 420Q500 ${260+k*8} ${600-k*6} 420`,c,6)).join('')}${R(390,400,220,70,'#2a6ab0')}${R(380,440,240,30,'#e8e0d0','#8a7a6a',3)}
   <g id="fig1" class="tb" style="transform-origin:390px 300px">${fl(390)}</g>
   <g id="fig2" class="tb" style="transform-origin:610px 300px">${fl(500)}</g>
   <g class="tb pl">${sPl(n,260)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'palmen';
const arten={palmen:[tuerPalm,'Vorhang aus Palmblättern mit Zahlenschloss'],lianen:[tuerLiane,'Vorhang aus Lianen mit Zahlenschloss'],treppe:[tuerTreppe,'Felsblock vor der Steintreppe mit Zahlenschloss'],felsentor:[tuerFels,'Felsentor mit Zahlenschloss'],galerie:[tuerGalerie,'Tür zur Leuchtturm-Galerie mit Zahlenschloss']};
const a=arten[art]||arten.palmen;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const papagei=(x,y,c,f)=>`${E(x,y,16,24,c)}${C(x,y-26,13,c)}${P(`M${x+9} ${y-30}q12 2 8 14q-4 -6 -8 -6Z`,gelb)}${C(x+4,y-29,3,'#111')}${P(`M${x-4} ${y+18}l-8 34l14 -8Z`,f)}<g class="fiwk" style="transform-origin:${x-8}px ${y-10}px">${P(`M${x-8} ${y-10}Q${x-40} ${y-40} ${x-46} ${y-6}Q${x-26} ${y+2} ${x-8} ${y+6}Z`,f)}</g>`;
SZENARIEN.fantasieinsel={
name:"Die Fantasie-Insel",
symbole:["fipalme","fimuschel","fiblume","fikristall","fistern"],
symbolNamen:["Palme","Muschel","Blüte","Kristall","Stern"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect width="120" height="90" rx="10" fill="#bfe8fa"/><circle cx="92" cy="22" r="12" fill="#f6c84a"/><rect y="56" width="120" height="34" fill="#2a9ad0"/><ellipse cx="54" cy="62" rx="40" ry="12" fill="#f2d896"/><path d="M50 60Q58 40 54 24" fill="none" stroke="#a8743a" stroke-width="5" stroke-linecap="round"/><path d="M54 24Q40 14 30 24Q42 20 54 24ZM54 24Q68 14 78 24Q66 20 54 24ZM54 24Q42 28 38 38Q46 28 54 24ZM54 24Q66 28 70 38Q62 28 54 24Z" fill="#3a9a4a"/><path d="M8 74Q16 68 24 74T40 74M80 78Q88 72 96 78T112 78" fill="none" stroke="#fff" stroke-width="2"/></svg>`,
texte:{
einleitung:"Willkommen auf der Fantasie-Insel! Mitten im Meer liegt eine bunte Insel voller Wunder. Ihr kommt an den Strand, in den Dschungel, zum freundlichen Vulkan, in die Schatzhöhle und hinauf in den Leuchtturm. Die Inselhüterin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, bringt den Leuchtturm zum Strahlen. Schafft ihr es, ihr Entdeckerinnen und Entdecker?",
startKnopf:"Auf zur Insel",
hinweisGeber:"Die Inselhüterin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Inselhüterin schüttelt lächelnd den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Sonne geht unter!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Insel trotzdem noch ganz erkunden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Der Leuchtturm strahlt hell über das Meer, und ein Regenbogen spannt sich über die Insel. Ein buntes Segelschiff kommt, um euch abzuholen. Die Inselhüterin, die kleine Schildkröte und die Papageien winken euch fröhlich zu. Ihr seid jetzt echte Insel-Entdeckerinnen und Insel-Entdecker!"
},
texteDu:{
einleitung:"Willkommen auf der Fantasie-Insel! Mitten im Meer liegt eine bunte Insel voller Wunder. Du kommst an den Strand, in den Dschungel, zum freundlichen Vulkan, in die Schatzhöhle und hinauf in den Leuchtturm. Die Inselhüterin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, bringt den Leuchtturm zum Strahlen. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Inselhüterin schüttelt lächelnd den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Insel trotzdem noch ganz erkunden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Der Leuchtturm strahlt hell über das Meer, und ein Regenbogen spannt sich über die Insel. Ein buntes Segelschiff kommt, um dich abzuholen. Die Inselhüterin, die kleine Schildkröte und die Papageien winken dir fröhlich zu. Du bist jetzt eine echte Insel-Entdeckerin oder ein echter Insel-Entdecker!"
},
einfach:{
name:"Die Fantasie-Insel",
symbolNamen:["Palme","Muschel","Blüte","Kristall","Stern"],
texte:{
einleitung:"Ihr seid auf einer bunten Insel. Ihr seht fünf Orte: den Strand, den Dschungel, den Vulkan, die Höhle und den Leucht-Turm. Die Insel-Hüterin hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende leuchtet der Leucht-Turm. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Der Leucht-Turm leuchtet. Ein Schiff holt euch ab. Alle Tiere winken euch zu!"
},
texteDu:{
einleitung:"Du bist auf einer bunten Insel. Du siehst fünf Orte: den Strand, den Dschungel, den Vulkan, die Höhle und den Leucht-Turm. Die Insel-Hüterin hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende leuchtet der Leucht-Turm. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Der Leucht-Turm leuchtet. Ein Schiff holt dich ab. Alle Tiere winken dir zu!"
},
raeume:[
{titel:"Der Strand",intro:"Die Sonne scheint. Das Meer rauscht. Hinten hängt ein Vorhang aus Palm-Blättern. Findet die Zahlen!",introDu:"Die Sonne scheint. Das Meer rauscht. Hinten hängt ein Vorhang aus Palm-Blättern. Finde die Zahlen!",
objekte:[{name:"Weg-Schild",fund:"Am Schild klebt:"},{name:"Muschel-Kette",fund:"An der Kette hängt:"},{name:"Sand-Burg",fund:"In der Burg liegt:"},{name:"Holz-Stapel",fund:"Im Holz steckt:"},{name:"Muschel-Haufen",fund:"Bei den Muscheln liegt:"}],
infoObjekte:[{name:"Ebbe-Flut-Tafel",fund:"An der Tafel klebt:"},{name:"Kokos-Korb",fund:"Im Korb liegt:"},{name:"Ruder-Boot",fund:"Im Boot liegt:"}]},
{titel:"Der Dschungel",intro:"Hier ist es grün und warm. Bunte Vögel singen. Ein Vorhang aus Lianen versperrt den Weg.",
objekte:[{name:"Riesen-Blüte",fund:"In der Blüte liegt:"},{name:"Vogel-Nest",fund:"Im Nest liegt:"},{name:"Farn-Busch",fund:"Im Busch liegt:"},{name:"Baum-Stumpf",fund:"Auf dem Stumpf liegt:"},{name:"Bananen-Pflanze",fund:"An der Pflanze hängt:"}],
infoObjekte:[{name:"Pflanzen-Tafel",fund:"An der Tafel klebt:"},{name:"Blumen-Topf",fund:"Im Topf steckt:"},{name:"Bambus-Bündel",fund:"Am Bambus hängt:"}]},
{titel:"Der Vulkan",intro:"Der Vulkan schläft. Er glüht warm und freundlich. Ein großer Stein steht vor der Treppe.",
objekte:[{name:"Lava-Tafel",fund:"An der Tafel klebt:"},{name:"Kristall-Spiegel",fund:"Am Spiegel klebt:"},{name:"Lava-Steine",fund:"Unter den Steinen liegt:"},{name:"Dampf-Quelle",fund:"Am Rand liegt:"},{name:"Kristall-Brocken",fund:"Am Kristall klebt:"}],
infoObjekte:[{name:"Vulkan-Bild",fund:"Am Bild klebt:"},{name:"Stein-Bank",fund:"Auf der Bank liegt:"},{name:"Stein-Korb",fund:"Im Korb liegt:"}]},
{titel:"Die Schatz-Höhle",intro:"In der Höhle glitzern Kristalle. Pilze leuchten. Ein Tor aus Fels ist zu.",
objekte:[{name:"Pilz-Wand",fund:"An der Wand klebt:"},{name:"Höhlen-Bild",fund:"Am Bild klebt:"},{name:"Schatz-Truhe",fund:"In der Truhe liegt:"},{name:"Kristall-Säule",fund:"An der Säule klebt:"},{name:"Wasser-Becken",fund:"Im Becken liegt:"}],
infoObjekte:[{name:"Edelstein-Tafel",fund:"An der Tafel klebt:"},{name:"Leucht-Glas",fund:"Am Glas klebt:"},{name:"Schmuck-Kiste",fund:"In der Kiste liegt:"}]},
{titel:"Der Leucht-Turm",intro:"Ihr seid oben im Turm. Draußen kommen die Sterne. Öffnet die Tür zum Balkon!",introDu:"Du bist oben im Turm. Draußen kommen die Sterne. Öffne die Tür zum Balkon!",
objekte:[{name:"See-Karte",fund:"An der Karte klebt:"},{name:"Stern-Karte",fund:"An der Karte klebt:"},{name:"Fern-Rohr",fund:"Am Rohr klebt:"},{name:"Buch-Pult",fund:"Im Buch liegt:"},{name:"Kompass-Tisch",fund:"Auf dem Tisch liegt:"}],
infoObjekte:[{name:"Wind-Rose",fund:"An der Wind-Rose klebt:"},{name:"Seil-Rolle",fund:"Im Seil steckt:"},{name:"Stern-Kugel",fund:"An der Kugel klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Sonnenstrand",
intro:"Warmer Sand glitzert in der Sonne, und das Meer rauscht leise. Zwischen den Palmen liegen Muscheln und Treibholz. Hinten am Strand hängt ein dichter Vorhang aus Palmblättern mit einem Zahlenschloss. Dahinter beginnt der Dschungel. Findet die Ziffern, um ihn zu öffnen!",
introDu:"Warmer Sand glitzert in der Sonne, und das Meer rauscht leise. Zwischen den Palmen liegen Muscheln und Treibholz. Hinten am Strand hängt ein dichter Vorhang aus Palmblättern mit einem Zahlenschloss. Dahinter beginnt der Dschungel. Finde die Ziffern, um ihn zu öffnen!",
tuerX:1250,tuerArt:"palmen",
hintergrund:()=>`${defs('#f6e0a8','#e0b870','#fff4c0')}${hg('fiH','#4ab0f0','#a8e0fa','#e8f8ff')}${R(0,0,1600,470,'url(#fiH)')}${C(180,80,46,'#fff6b0')}${C(180,80,200,'url(#licht)')}${[[520,70],[980,110],[1420,60]].map(([x,y])=>E(x,y,70,20,'#fff')+E(x-30,y-12,34,18,'#fff')+E(x+24,y-14,36,22,'#fff')).join('')}${L('M700 160l14 -10l14 10M760 140l12 -8l12 8M380 190l12 -8l12 8','#4a5a6a',3)}${P('M820 340Q900 270 1000 300Q1060 280 1120 340Z','#5a9a7a')}${R(0,330,1600,110,meer)}${[350,380,410].map((y,k)=>L(`M${k*40} ${y}Q100 ${y-10} 200 ${y}T400 ${y}T600 ${y}T800 ${y}T1000 ${y}T1200 ${y}T1400 ${y}T1600 ${y}`,'rgba(255,255,255,.5)',3)).join('')}${P('M0 470V430Q400 410 800 432T1600 425V470Z','#f8e8b8')}${L('M0 432Q400 412 800 434T1600 427','#fff',5)}${palme(60,470,300)}${palme(520,470,260)}${palme(950,470,320)}${palme(1490,470,280)}${boden(0)}`,
objekte:[
{name:"Wegweiser aus Treibholz",x:250,y:220,wand:true,by:-80,zeichne:wegweiser,fund:"Am Wegweiser klebt:"},
{name:"Muschelkette",x:650,y:200,wand:true,by:-50,zeichne:muschelkette,fund:"An der Muschelkette hängt:"},
{name:"Sandburg",x:150,boden:700,fuss:4,by:-165,zeichne:sandburg,fund:"Im Turm der Sandburg steckt:"},
{name:"Treibholz-Stapel",x:450,boden:650,fuss:4,by:-105,zeichne:treibholz,fund:"Zwischen dem Treibholz steckt:"},
{name:"Muschelhaufen",x:850,boden:720,fuss:4,by:-85,zeichne:muschelhaufen,fund:"Unter den Muscheln liegt:"}
],
infoObjekte:[{name:"Tafel von Ebbe und Flut",x:1000,y:240,wand:true,by:-82,zeichne:gezeitentafel,fund:"An der Tafel von Ebbe und Flut klebt:"},{name:"Kokosnuss-Korb",x:1050,boden:600,fuss:4,by:-110,zeichne:kokoskorb,fund:"Im Kokosnuss-Korb liegt:"},{name:"Ruderboot",x:1450,boden:740,fuss:4,by:-130,zeichne:ruderboot,fund:"Im Ruderboot liegt:"}]},
{titel:"Der Blütendschungel",
intro:"Im Dschungel ist es feucht und warm. Grünes Licht fällt durch die Blätter. Riesige Blüten duften, bunte Vögel rufen, und ein Wasserfall plätschert. Ein Vorhang aus Lianen versperrt den Weg zum Vulkan. Findet die Ziffern, um ihn zu öffnen!",
introDu:"Im Dschungel ist es feucht und warm. Grünes Licht fällt durch die Blätter. Riesige Blüten duften, bunte Vögel rufen, und ein Wasserfall plätschert. Ein Vorhang aus Lianen versperrt den Weg zum Vulkan. Finde die Ziffern, um ihn zu öffnen!",
tuerX:450,tuerArt:"lianen",
hintergrund:()=>`${defs('#4a7a3a','#22401c','#d8ffb0')}${hg('fiJ','#1a4a2a','#2a6a3a','#3a7a3a')}${R(0,0,1600,470,'url(#fiJ)')}${[80,260,700,900,1320,1520].map((x,k)=>R(x-20-k%2*8,0,40+k%2*16,470,'#3a2a1a')).join('')}${[200,800,1250].map(x=>P(`M${x-60} 0L${x+60} 0L${x+180} 470L${x-20} 470Z`,'rgba(220,255,180,.12)')).join('')}${R(1040,60,120,380,'#8ad0f0')}${[1056,1080,1106,1130].map(x=>L(`M${x} 70V430`,'rgba(255,255,255,.7)',5)).join('')}${E(1100,450,120,24,'#5ab0e0')}${C(1100,440,60,'rgba(255,255,255,.5)')}${P('M1000 60Q1100 20 1200 60L1160 90H1040Z','#4a5a4a')}${[...Array(16)].map((_,k)=>L(`M${k*104+30} 0Q${k*104+50} ${120+k%3*40} ${k*104+20} ${200+k%4*50}`,'#2a6a1a',6)).join('')}${[...Array(22)].map((_,k)=>B((k*151)%1600,(k*67)%140,(k*53)%360,1.6,k%2?'#2a7a2a':'#4a9a2a')).join('')}${[[600,140,rot,'#2a6ad0'],[1400,180,'#3ac0e8',lila]].map(([x,y,c,f])=>vogel(x,y,c,f)).join('')}${[[350,330,rosa],[1250,360,orange],[1500,300,lila]].map(([x,y,c])=>U('fiblume',x-24,y-24,48,c)).join('')}${boden(1)}`,
objekte:[
{name:"Riesenblüte",x:800,y:230,wand:true,by:-100,zeichne:riesenbluete,fund:"In der Riesenblüte liegt:"},
{name:"Vogelnest",x:1250,y:220,wand:true,by:-80,zeichne:vogelnest,fund:"Im Vogelnest liegt:"},
{name:"Farnbusch",x:150,boden:740,fuss:4,by:-150,zeichne:farnbusch,fund:"Unter dem Farnbusch liegt:"},
{name:"Baumstumpf",x:700,boden:680,fuss:4,by:-140,zeichne:baumstumpf,fund:"Auf dem Baumstumpf liegt:"},
{name:"Bananenstaude",x:1000,boden:560,fuss:4,by:-200,zeichne:bananenstaude,fund:"An der Bananenstaude hängt:"}
],
infoObjekte:[{name:"Pflanzentafel",x:1480,y:240,wand:true,by:-82,zeichne:pflanzentafel,fund:"An der Pflanzentafel klebt:"},{name:"Orchideentopf",x:1350,boden:700,fuss:4,by:-175,zeichne:orchidee,fund:"Im Orchideentopf steckt:"},{name:"Bambusbündel",x:1500,boden:600,fuss:4,by:-215,zeichne:bambus,fund:"Am Bambusbündel hängt:"}]},
{titel:"Am Glühvulkan",
intro:"Der Vulkan der Insel schläft schon seit vielen Jahren. Nur ein warmes, freundliches Glühen leuchtet aus seinem Gipfel. Weiße Dampfwolken steigen auf, und überall funkeln Kristalle. Ein großer Felsblock steht vor der Steintreppe in den Berg. Findet die Ziffern, damit er zur Seite rollt!",
introDu:"Der Vulkan der Insel schläft schon seit vielen Jahren. Nur ein warmes, freundliches Glühen leuchtet aus seinem Gipfel. Weiße Dampfwolken steigen auf, und überall funkeln Kristalle. Ein großer Felsblock steht vor der Steintreppe in den Berg. Finde die Ziffern, damit er zur Seite rollt!",
tuerX:800,tuerArt:"treppe",
hintergrund:()=>`${defs('#5a4a4a','#2a2026','#ffb060')}${hg('fiV','#4a2a6a','#c86a6a','#ffb070')}${R(0,0,1600,470,'url(#fiV)')}${[[100,40],[400,80],[1200,50],[1500,90]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${P('M200 470L640 90H960L1400 470Z','#6a4a4a')}${P('M640 90Q800 60 960 90L900 130Q800 110 700 130Z','#ff9a40')}${C(800,90,220,'url(#licht)')}${[[740,40,40],[820,10,50],[900,40,36]].map(([x,y,r])=>C(x,y,r,'rgba(255,255,255,.55)')).join('')}${L('M700 130L620 300M900 130L1000 320',orange,5)}${P('M0 470L0 300L160 240L300 470Z','#5a3a4a')}${P('M1300 470L1460 260L1600 320V470Z','#5a3a4a')}${[[120,440,80,lila],[180,450,60,tuerkis],[1440,440,90,rosa],[1520,450,60,lila]].map(([x,y,h,c])=>K(x,y,h,c)).join('')}${boden(2)}`,
objekte:[
{name:"Lavastein-Tafel",x:250,y:200,wand:true,by:-80,zeichne:lavatafel,fund:"An der Lavastein-Tafel klebt:"},
{name:"Kristallspiegel",x:1150,y:230,wand:true,by:-110,zeichne:kristallspiegel,fund:"Am Kristallspiegel klebt:"},
{name:"Lavasteine",x:150,boden:700,fuss:4,by:-115,zeichne:lavasteine,fund:"Unter den Lavasteinen liegt:"},
{name:"Dampfquelle",x:450,boden:650,fuss:4,by:-150,zeichne:dampfquelle,fund:"Am Rand der Dampfquelle liegt:"},
{name:"Kristallbrocken",x:1100,boden:720,fuss:4,by:-145,zeichne:kristallbrocken,fund:"Am Kristallbrocken klebt:"}
],
infoObjekte:[{name:"Vulkan-Schaubild",x:1480,y:240,wand:true,by:-82,zeichne:vulkanbild,fund:"Am Vulkan-Schaubild klebt:"},{name:"Wärmestein-Bank",x:1300,boden:600,fuss:4,by:-90,zeichne:waermebank,fund:"Auf der Wärmestein-Bank liegt:"},{name:"Bimsstein-Korb",x:600,boden:740,fuss:4,by:-110,zeichne:bimskorb,fund:"Im Bimsstein-Korb liegt:"}]},
{titel:"Die Schatzhöhle",
intro:"Tief im Berg liegt eine geheimnisvolle Höhle. Kristalle funkeln in Blau und Lila, Leuchtpilze schimmern, und Glühwürmchen tanzen über dem Wasser. Am Ende der Höhle steht ein schweres Felsentor. Findet die Ziffern, damit es sich teilt!",
introDu:"Tief im Berg liegt eine geheimnisvolle Höhle. Kristalle funkeln in Blau und Lila, Leuchtpilze schimmern, und Glühwürmchen tanzen über dem Wasser. Am Ende der Höhle steht ein schweres Felsentor. Finde die Ziffern, damit es sich teilt!",
tuerX:1300,tuerArt:"felsentor",
hintergrund:()=>`${defs('#3a3a5a','#14142a','#9af0ff')}${hg('fiC','#0a0a1e','#1e1e40','#2a2a50')}${R(0,0,1600,470,'url(#fiC)')}${[...Array(20)].map((_,k)=>P(`M${k*80} 0L${k*80+40} 0L${k*80+20} ${60+(k*37)%90}Z`,'#2a2a48')).join('')}${[[150,300],[480,260],[860,320],[1560,280]].map(([x,y],k)=>K(x,470,y/2,[tuerkis,lila,rosa,tuerkis][k])+K(x-30,470,y/3,lila)+K(x+30,470,y/3.5,tuerkis)+C(x,400,120,'url(#licht)')).join('')}${[[300,440,30,'#a8f060'],[620,450,24,tuerkis],[1000,446,28,rosa]].map(([x,y,s,c])=>pz(x,y,s,c)).join('')}${[...Array(14)].map((_,k)=>`<g class="figl" style="animation-delay:${(k%5)*.3}s">${C((k*113+40)%1600,120+(k*71)%260,4,'#f0ff80')}</g>`).join('')}${boden(3)}`,
objekte:[
{name:"Leuchtpilz-Wand",x:300,y:230,wand:true,by:-100,zeichne:pilzwand,fund:"An der Leuchtpilz-Wand klebt:"},
{name:"Höhlenbild",x:700,y:220,wand:true,by:-80,zeichne:hoehlenbild,fund:"Am Höhlenbild klebt:"},
{name:"Schatztruhe",x:200,boden:700,fuss:4,by:-165,zeichne:schatztruhe,fund:"In der Schatztruhe liegt:"},
{name:"Kristallsäule",x:550,boden:640,fuss:4,by:-240,zeichne:kristallsaeule,fund:"An der Kristallsäule klebt:"},
{name:"Wasserbecken",x:900,boden:720,fuss:4,by:-95,zeichne:wasserbecken,fund:"Am Grund des Wasserbeckens liegt:"}
],
infoObjekte:[{name:"Tafel der Mineralien",x:1050,y:240,wand:true,by:-82,zeichne:mineralientafel,fund:"An der Tafel der Mineralien klebt:"},{name:"Glühwürmchen-Glas",x:1050,boden:600,fuss:4,by:-145,zeichne:gluehglas,fund:"Am Glühwürmchen-Glas klebt:"},{name:"Edelstein-Kiste",x:1500,boden:740,fuss:4,by:-110,zeichne:edelsteinkiste,fund:"In der Edelstein-Kiste liegt:"}]},
{titel:"Oben im Leuchtturm",
intro:"Eine lange Wendeltreppe führt hinauf ins Turmzimmer. Über euch hängt die große Lampe des Leuchtturms. Durch die Fenster seht ihr das weite Meer und die ersten Sterne. Die Tür zur Galerie hat das letzte Zahlenschloss. Findet die Ziffern, damit der Leuchtturm wieder strahlen kann!",
introDu:"Eine lange Wendeltreppe führt hinauf ins Turmzimmer. Über dir hängt die große Lampe des Leuchtturms. Durch die Fenster siehst du das weite Meer und die ersten Sterne. Die Tür zur Galerie hat das letzte Zahlenschloss. Finde die Ziffern, damit der Leuchtturm wieder strahlen kann!",
tuerX:600,tuerArt:"galerie",
hintergrund:()=>`${defs('#c88a5a','#7a4a2a','#fff0a0')}${hg('fiN','#1a1a5a','#6a4a9a','#f0a080')}${R(0,0,1600,470,'#f0e8d8')}${[...Array(8)].map((_,k)=>L(`M${k*200+100} 0V470`,'#d8ccb8',4)).join('')}${[40,820,1460].map(x=>R(x,170,100,230,'url(#fiN)','#8a6a40',8)+L(`M${x} 340Q${x+50} 330 ${x+100} 340`,'rgba(255,255,255,.4)',3)+C(x+30,200,2.5,'#fff')+C(x+70,230,2.5,'#fff')).join('')}${R(0,0,1600,30,'#c84a3a')}${R(0,440,1600,30,'#8a6a40')}${L('M1100 30V60M1260 30V60',gr,6)}${R(1110,60,140,90,'rgba(255,250,200,.9)','#c8a040',5)}${[1130,1160,1190,1220].map(x=>L(`M${x} 64V146`,'rgba(200,160,64,.6)',3)).join('')}${C(1180,105,30,'#fffbe0')}${C(1180,105,180,'url(#licht)')}${boden(4)}`,
objekte:[
{name:"Seekarte",x:200,y:220,wand:true,by:-80,zeichne:seekarte,fund:"An der Seekarte klebt:"},
{name:"Sternbild-Karte",x:1000,y:200,wand:true,by:-82,zeichne:sternkarte,fund:"An der Sternbild-Karte klebt:"},
{name:"Fernrohr",x:300,boden:700,fuss:4,by:-150,zeichne:fernrohr,fund:"Am Fernrohr klebt:"},
{name:"Logbuch-Pult",x:950,boden:640,fuss:4,by:-185,zeichne:logbuchpult,fund:"Im Logbuch liegt:"},
{name:"Kompass-Tisch",x:1250,boden:700,fuss:4,by:-145,zeichne:kompasstisch,fund:"Auf dem Kompass-Tisch liegt:"}
],
infoObjekte:[{name:"Windrose",x:1350,y:240,wand:true,by:-90,zeichne:windrose,fund:"An der Windrose klebt:"},{name:"Seilrolle",x:1450,boden:600,fuss:4,by:-135,zeichne:seilrolle,fund:"In der Seilrolle steckt:"},{name:"Sternenglobus",x:800,boden:740,fuss:4,by:-200,zeichne:sternglobus,fund:"Am Sternenglobus klebt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs>${hg('fiE','#2a2a7a','#f08a9a','#ffd880')}<radialGradient id="fiS"><stop offset="0" stop-color="#fff6c0" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/></radialGradient><linearGradient id="fiB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/></linearGradient></defs>
   <style>@keyframes fiz{0%,100%{transform:rotate(-14deg)}50%{transform:rotate(14deg)}}@keyframes fif{from{transform:translateX(-360px)}to{transform:translateX(0)}}@keyframes fiw{50%{transform:rotate(-35deg)}}.fistr{animation:fiz 4s ease-in-out infinite}.fischf{animation:fif 6s ease-out both}.fiwk{animation:fiw .8s ease-in-out infinite}</style>
   <rect width="1000" height="600" fill="url(#fiE)"/>${[[60,40],[200,90],[420,30],[620,70],[760,40]].map(([x,y])=>C(x,y,2.5,'#fff6c8')).join('')}
   ${[rot,orange,gelb,gruen,meer,lila].map((c,k)=>L(`M${120+k*12} 370A${330-k*12} ${260-k*12} 0 0 1 ${780-k*12} 370`,c,11)).join('')}
   ${R(0,360,1000,240,'#2a7ab8')}${[390,420,455].map(y=>L(`M0 ${y}Q60 ${y-8} 120 ${y}T240 ${y}T360 ${y}T480 ${y}T600 ${y}T720 ${y}T840 ${y}T960 ${y}T1080 ${y}`,'rgba(255,255,255,.4)',3)).join('')}
   <g class="fischf">${P('M300 360H460L440 392H320Z','#c86a3a',dk,3)}${L('M380 360V230',dk,5)}${P('M384 236L450 340H384Z','#fff','#c8a040',2)}${P('M376 246L320 340H376Z',rosa,'#a03a6a',2)}${P('M380 230L410 222L380 214Z',gelb)}${U('fistern',398,280,32,gelb)}</g>
   <g class="fistr" style="transform-origin:860px 150px">${P('M860 150L0 40V260Z','url(#fiB)')}</g>
   ${P('M820 470L838 170H882L900 470Z','#fff','#8a7a6a',3)}${[220,300,380].map(y=>R(838-(y-170)*.06,y,44+(y-170)*.12,34,rot)).join('')}${R(828,130,64,40,'#fff6b0','#3a3a40',4)}${P('M820 130L860 100L900 130Z',rot)}${C(860,150,70,'url(#fiS)')}
   ${P('M0 600V500Q250 460 500 490Q760 460 1000 500V600Z',sand)}${palme(70,520,240)}
   ${E(210,555,40,22,'#5aa040','#2a5a20',3)}${P('M180 548Q210 520 240 548Z','#3a7a2a')}${C(258,548,12,'#7ac060')}${C(262,545,2.5,'#111')}${L('M246 538q10 -26 22 -30','#7ac060',6)}
   ${papagei(110,330,rot,'#2a6ad0')}${papagei(270,470,'#3ac0e8',gelb)}${papagei(700,470,gelb,gruen)}
   ${C(800,540,30,lila,'#5a2a8a',3)}${C(790,532,4,'#fff')}${C(810,532,4,'#fff')}${C(790,532,2,'#111')}${C(810,532,2,'#111')}${L('M790 548Q800 556 810 548','#fff',2)}<g class="fiwk" style="transform-origin:826px 530px">${L('M826 530L850 500','#9a5ad8',8)}</g>${L('M774 530L758 556',lila,8)}
   ${U('fiblume',620,120,30,'#fff6c0')}${U('fikristall',460,80,26,'#fff6c0')}${U('fimuschel',260,150,28,'#fff6c0')}`
};
})();