document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-bhhuhn\" viewBox=\"-20 -20 40 40\"><ellipse cx=\"-3\" cy=\"4\" rx=\"14\" ry=\"10\" fill=\"currentColor\"/><circle cx=\"8\" cy=\"-8\" r=\"7\" fill=\"currentColor\"/><path fill=\"currentColor\" d=\"M13 -9L20 -6L13 -4ZM3 -14Q5 -20 7 -15Q9 -20 12 -14ZM-14 0L-20 -12L-10 -4Z\"/><path d=\"M-6 13V19M1 13V19\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-bhei\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -18Q14 -18 14 4Q14 18 0 18Q-14 18 -14 4Q-14 -18 0 -18Z\"/><path d=\"M-6 -8Q-8 -2 -7 4\" stroke=\"#fff\" stroke-width=\"2.5\" opacity=\".6\" fill=\"none\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-bhtraktor\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-18 -2V-18H0V-6H16V8H6Q4 -4 -8 -4Q-14 -4 -18 -2Z\"/><path d=\"M-14 -15H-4V-7H-14Z\" fill=\"#fff\" opacity=\".6\"/><circle cx=\"-8\" cy=\"8\" r=\"9\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\"/><circle cx=\"12\" cy=\"13\" r=\"5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\"/></symbol>\n<symbol id=\"sym-bhaehre\" viewBox=\"-20 -20 40 40\"><path d=\"M0 19V-17\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><g fill=\"currentColor\"><ellipse cx=\"-5\" cy=\"-11\" rx=\"4\" ry=\"7\" transform=\"rotate(-30 -5 -11)\"/><ellipse cx=\"5\" cy=\"-11\" rx=\"4\" ry=\"7\" transform=\"rotate(30 5 -11)\"/><ellipse cx=\"-5\" cy=\"-1\" rx=\"4\" ry=\"7\" transform=\"rotate(-30 -5 -1)\"/><ellipse cx=\"5\" cy=\"-1\" rx=\"4\" ry=\"7\" transform=\"rotate(30 5 -1)\"/><ellipse cx=\"-5\" cy=\"9\" rx=\"4\" ry=\"7\" transform=\"rotate(-30 -5 9)\"/><ellipse cx=\"5\" cy=\"9\" rx=\"4\" ry=\"7\" transform=\"rotate(30 5 9)\"/><ellipse cx=\"0\" cy=\"-17\" rx=\"3\" ry=\"5\"/></g></symbol>\n<symbol id=\"sym-bhkuerbis\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -8Q-6 -12 -12 -9Q-20 -4 -18 6Q-16 16 -6 16Q-2 17 0 15Q2 17 6 16Q16 16 18 6Q20 -4 12 -9Q6 -12 0 -8Z\"/><path d=\"M0 -8Q1 -14 5 -17\" stroke=\"currentColor\" stroke-width=\"3.5\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M-6 -6Q-9 4 -6 14M6 -6Q9 4 6 14\" stroke=\"#fff\" stroke-width=\"1.5\" opacity=\".5\" fill=\"none\"/></symbol>\n</defs>\n</svg>");
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
const G=(x,y,s,i)=>`<g transform="translate(${x} ${y}) scale(${s})">${i}</g>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.3)');
const holz='#a8743a',dk='#4a2a10',gr='#3a3a40',rot='#d83a2a',gruen='#3a9a3a',gelb='#f2c14e',orange='#e8801a',stroh='#e8c860',chrom='#c8ccd4',weiss='#fff8ec',braun='#c86a2a';
const kb=(x,y,r)=>E(x,y,r,r*.75,orange,'#a04a10',2)+L(`M${x-r*.4} ${y-r*.6}Q${x-r*.55} ${y} ${x-r*.4} ${y+r*.6}M${x+r*.4} ${y-r*.6}Q${x+r*.55} ${y} ${x+r*.4} ${y+r*.6}`,'#c8601a',2)+L(`M${x} ${y-r*.7}l3 -9`,'#3a6a2a',5);
const ei=(x,y,c)=>E(x,y,8,10,c||'#fff4e0','#b89060',1.5);
const huhn=(x,y,c,s)=>G(x,y,s,E(0,0,22,16,c,'#5a3a20',2)+P('M-18 -4L-32 -24L-12 -12Z',c,'#5a3a20',2)+P('M-8 -4Q4 -8 10 2Q0 10 -8 -4Z','rgba(0,0,0,.15)')+C(16,-16,10,c,'#5a3a20',2)+P('M10 -25q3 -8 6 -2q3 -7 6 2Z',rot)+P('M25 -17l9 3l-9 3Z',gelb)+C(18,-18,2,'#111')+P('M20 -8q3 6 0 9q-3 -3 0 -9Z',rot)+L('M-4 15v9M6 15v9','#d89020',3));
const kat=(x,y,c,s)=>G(x,y,s,E(0,0,26,14,c,'#6a3a10',2)+L('M-24 0Q-44 -6 -38 -26',c,6)+C(24,-10,13,c,'#6a3a10',2)+P('M14 -18l3 -12l7 8ZM26 -22l6 -10l4 11Z',c,'#6a3a10',1.5)+C(20,-12,1.8,'#222')+C(29,-12,1.8,'#222')+P('M23 -7l2 2l2 -2Z','#e08080'));
const ballen=(x,y,w,h)=>R(x,y,w,h,stroh,'#a08030',3)+L(`M${x+6} ${y+h*.33}H${x+w-6}M${x+6} ${y+h*.66}H${x+w-6}`,'#c8a040',2)+L(`M${x+w*.3} ${y}V${y+h}M${x+w*.7} ${y}V${y+h}`,'#8a6a20',3);
const kiste=(x,y,w,h)=>R(x,y,w,h,holz,dk,3)+L(`M${x} ${y+h/2}H${x+w}`,dk,2);
const pfeile=y=>L(`M-38 ${y}h14l-4 -4M-24 ${y}l-4 4M24 ${y}h14l-4 -4M38 ${y}l-4 4`,gr,3);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".55"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const hg=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const linien=(n,f)=>[...Array(n)].map((_,k)=>f(k)).join('');
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<90;k++){const x=(k*173+30)%1600,y=490+(k*61)%280;d+=`M${x} ${y}l-5 -12M${x} ${y}l1 -14M${x} ${y}l6 -11`;}return g+P('M1180 470Q1150 620 1000 780H1320Q1340 620 1320 470Z','#c8a878')+L(d,'#3a7a2a',3);}
if(m==1){for(const y of[500,535,580,640,720])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=130)d+=`M${800+(x-800)*.5} 470L${x} 780`;let s='';for(let k=0;k<60;k++){const x=(k*131+40)%1600,y=490+(k*47)%280;s+=`M${x} ${y}l${k%7*4-12} ${-(k%3)*3-3}`;}return g+L(d,'rgba(60,30,10,.4)',3)+L(s,stroh,3);}
if(m==2){for(let k=0;k<170;k++){const x=(k*97+11)%1600,y=480+(k*53)%295;d+=`M${x} ${y}l${k%5*7-14} ${-(k%3)*4-2}`;}return g+L(d,'#c8a040',3)+E(500,600,200,30,'rgba(255,240,180,.3)')+E(1200,680,240,34,'rgba(255,240,180,.3)');}
if(m==3){for(let k=0;k<14;k++)d+=E((k*211+60)%1600,500+(k*67)%250,46,9,'rgba(50,50,50,.13)');return g+d+L('M0 620Q400 590 800 630T1600 610M0 690Q400 660 800 700T1600 680','rgba(40,40,40,.22)',24)+L('M0 486H1600','#5a646c',8);}
for(const y of[500,540,590,650,720])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=110)d+=`M${800+(x-800)*.6} 470L${x} 780`;return g+L(d,'rgba(110,50,20,.45)',3)+E(800,620,300,40,'rgba(255,220,160,.25)');}
const beetplan=()=>`${R(-84,-62,168,124,'#f4ead0',holz,6)}${[gruen,orange,rot].map((c,i)=>R(-70,-48+i*36,140,26,'#8a5a30')+linien(6,k=>C(-58+k*23,-35+i*36,8,c))).join('')}`;
const regenmesser=()=>`${R(-30,-80,60,160,'#e8d8b8',holz,4)}${R(-12,-66,24,124,'rgba(210,238,255,.9)','#5a8ab0',2)}${R(-11,14,22,43,'#5ab0e8')}${[-50,-30,-10,10,30,50].map(y=>L(`M12 ${y}H22`,'#5a8ab0',2)).join('')}${E(52,-68,22,10,'#fff','#a8c0d0',2)}${P('M52 -50Q64 -32 52 -26Q40 -32 52 -50Z','#5ab0e8')}`;
const wachstumstafel=()=>`${R(-88,-60,176,120,'#fffaf0','#3a7a2a',5)}${R(-88,30,176,30,'#8a5a30')}${[-60,-20,20,60].map((x,k)=>E(x,36,8,5,'#d8b070')+(k?L(`M${x} 32V${32-k*20}`,gruen,4):'')+(k>1?E(x-9,26-k*10,9,5,'#5ab03a')+E(x+9,22-k*10,9,5,'#5ab03a'):'')+(k>2?C(x,-34,9,gelb,'#c89020',2):'')).join('')}${L('M-46 -44h12l-4 -4M-6 -44h12l-4 -4M34 -44h12l-4 -4',gr,3)}`;
const vogelscheuche=()=>`${sch(60)}${L('M0 0V-200',dk,8)}${L('M-70 -140H70',dk,7)}${P('M-40 -150H40L50 -70H-50Z','#3a7ac0','#1a3a6a',3)}${R(-10,-130,20,50,'#e05a3a')}${L('M-70 -140l-12 -8M-70 -140l-14 4M-70 -140l-10 10M70 -140l12 -8M70 -140l14 4M70 -140l10 10',stroh,3)}${C(0,-176,26,'#f0dcb0','#a08060',3)}${C(-9,-180,3,'#333')}${C(9,-180,3,'#333')}${L('M-10 -168Q0 -160 10 -168','#a04a2a',3)}${C(-16,-170,5,'rgba(240,120,120,.5)')}${C(16,-170,5,'rgba(240,120,120,.5)')}${E(0,-198,46,9,stroh,'#a08030',3)}${P('M-24 -200Q-22 -228 0 -228Q22 -228 24 -200Z',stroh,'#a08030',3)}${R(-24,-210,48,8,rot)}${E(52,-150,10,7,'#8a5a3a')}${C(60,-156,5,'#8a5a3a')}${P('M64 -157l6 2l-6 2Z',gelb)}`;
const giesskanne=()=>`${sch(60)}${L('M38 -24L86 -84','#3a9a5a',10)}${P('M80 -92L104 -96L96 -76Z','#2a7a4a','#1a5a2a',2)}${P('M-40 0V-70Q-40 -80 -30 -80H30Q40 -80 40 -70V0Z','#3a9a5a','#1a5a2a',3)}${L('M-30 -80Q0 -118 30 -80','#1a5a2a',6)}${E(0,-80,30,5,'#2a7a4a')}${[[106,-70],[114,-56],[102,-52]].map(([x,y])=>P(`M${x} ${y-6}Q${x+4} ${y} ${x} ${y+2}Q${x-4} ${y} ${x} ${y-6}Z`,'#7ac8f0')).join('')}`;
const kuerbisse=()=>`${sch(90)}${E(-10,-16,70,14,'#3a7a2a')}${L('M-80 -10Q-90 -40 -70 -50M80 -14Q96 -40 80 -56','#3a7a2a',4)}${E(-74,-52,14,9,'#5aa83a')}${E(84,-58,14,9,'#5aa83a')}${kb(-44,-34,34)}${kb(32,-40,42)}${kb(-6,-22,22)}`;
const salatbeet=()=>`${sch(90)}${R(-90,-40,180,40,holz,dk,3)}${R(-84,-48,168,10,'#5a3a20')}${[-62,-22,18,58].map(x=>C(x,-58,20,'#8ad050','#4a8a2a',2)+C(x,-58,11,'#b8e878')+L(`M${x-10} -58Q${x} -70 ${x+10} -58`,'#4a8a2a',2)).join('')}`;
const erntekorb=()=>`${sch(70)}${[-18,22].map(x=>P(`M${x-6} -50L${x+4} -96L${x+10} -50Z`,orange)+L(`M${x+4} -96l-6 -12M${x+4} -96l6 -12`,gruen,3)).join('')}${[-36,4,40].map(x=>C(x,-54,12,rot,'#8a1a10',2)).join('')}${L('M-50 -50Q0 -126 50 -50','#8a5a20',6)}${P('M-64 -50H64L50 0H-50Z','#c8963a','#6a4a10',3)}${L('M-58 -34H58M-54 -18H54','#6a4a10',2)}`;
const laterne=()=>`${C(0,0,110,'url(#licht)')}${L('M0 -80V-46',gr,3)}${P('M-20 -46H20L14 -36H-14Z',gr)}${R(-22,-36,44,62,'rgba(255,230,150,.6)',gr,4)}${E(0,-4,10,16,'#ffd060')}${L('M-22 -10H22',gr,2)}${R(-26,26,52,8,gr)}`;
const erntekranz=()=>`${L('M0 -52V-84',dk,3)}${C(0,0,52,'none','#d8a840',18)}${linien(16,k=>{const a=k*Math.PI/8;return E((Math.sin(a)*56).toFixed(0),(Math.cos(a)*56).toFixed(0),7,7,'#f0c860','#a07820',1.5);})}${P('M-10 48L-24 92L-6 80L0 96L10 80L24 92L10 48Z',rot)}${C(0,50,10,rot,'#8a1a10',2)}`;
const korntafel=()=>`${R(-90,-60,180,120,'#fdf3d8','#8a5a20',5)}${L('M-62 44V-36','#b08a30',3)}${linien(5,j=>E(-67,-30+j*12,5,6,'#e0b040')+E(-57,-26+j*12,5,6,'#e0b040'))}${pfeile(4)}${P('M-16 36Q-20 -10 -10 -20H10Q20 -10 16 36Z','#f4f0e8','#a09880',3)}${L('M-8 -20Q0 -14 8 -20','#a09880',3)}${E(64,14,22,15,'#c8843a','#7a4a10',3)}${L('M54 8l6 8M66 6l6 8','#f0d0a0',2)}`;
const strohballen=()=>`${sch(90)}${ballen(-90,-60,88,60)}${ballen(2,-60,88,60)}${ballen(-44,-120,88,60)}`;
const holzleiter=()=>`${sch(50)}${L('M-40 0L-10 -260M40 0L50 -260',holz,9)}${linien(8,k=>{const t=(k+.6)/8.6;return L(`M${(-40+30*t).toFixed(0)} ${(-260*t).toFixed(0)}H${(40+10*t).toFixed(0)}`,dk,6);})}`;
const rundballen=()=>`${sch(80)}${R(-50,-120,110,120,'#e0bc50','#a08030',3)}${L('M-40 -100H56M-40 -60H58M-40 -20H56','#c8a040',2)}${C(-50,-60,60,stroh,'#a08030',3)}${[44,28,12].map(r=>C(-50,-60,r,'none','#b89030',3)).join('')}`;
const kornsaecke=()=>`${sch(80)}${[[-40,0],[40,0],[0,-66]].map(([x,y])=>P(`M${x-36} ${y}Q${x-42} ${y-48} ${x-28} ${y-66}H${x+28}Q${x+42} ${y-48} ${x+36} ${y}Z`,'#d8c090','#7a6030',3)+L(`M${x-20} ${y-66}Q${x} ${y-58} ${x+20} ${y-66}`,'#7a6030',3)+U('bhaehre',x-12,y-50,24,'#8a6a20')).join('')}`;
const katzenkorb=()=>`${sch(70)}${E(0,-36,70,10,stroh)}${kat(-6,-46,orange,1)}${kat(-50,-40,'#8a8a8a',.5)}${kat(48,-40,'#f4ead8',.5)}${P('M-70 -36H70L58 0H-58Z','#c8963a','#6a4a10',3)}${L('M-64 -20H64','#6a4a10',2)}`;
const legenester=()=>`${R(-92,-50,184,100,holz,dk,4)}${[-60,0,60].map((x,k)=>R(x-26,-40,52,60,'#5a3a18')+E(x,14,24,8,stroh)+(k==1?huhn(x-2,2,braun,.75):ei(x-8,8)+ei(x+8,10,'#e8c8a0'))).join('')}${R(-96,50,192,10,dk)}`;
const strichliste=()=>`${R(-80,-64,160,128,'#2a3a30',holz,7)}${[-40,-10,20,48].map((y,k)=>ei(-58,y,'#fff4e0')+L(linien(k>2?4:k+2,j=>`M${-36+j*12} ${y-10}V${y+10}`)+(k>2?`M-42 ${y+6}L8 ${y-6}`:''),'#fff',3)).join('')}`;
const kuekentafel=()=>`${R(-88,-60,176,120,'#fff8e0','#c89040',5)}${E(-60,6,16,21,'#fff4e0','#b89060',2)}${pfeile(6)}${C(0,-8,12,'#ffe040','#c8a020',2)}${P('M-18 6Q-18 28 0 28Q18 28 18 6L10 0L4 8L-4 0L-10 8Z','#fff4e0','#b89060',2)}${C(60,14,18,'#ffe040','#c8a020',2)}${C(66,-10,11,'#ffe040','#c8a020',2)}${P('M76 -11l7 2l-7 3Z',orange)}${C(69,-13,1.8,'#111')}${C(4,-10,1.8,'#111')}`;
const futtertrog=()=>`${sch(100)}${huhn(-50,-62,weiss,.9)}${huhn(46,-60,braun,.9)}${P('M-90 -40H90L76 0H-76Z',holz,dk,3)}${E(0,-40,88,8,'#e8c070')}${linien(12,k=>C(-80+k*15,-42+(k%2)*3,2.5,'#a87020'))}`;
const eierkorb=()=>`${sch(60)}${[-38,-18,2,22,40,-28,-8,12,32].map((x,k)=>ei(x,k>4?-70:-58,k%3?'#fff4e0':'#e8c8a0')).join('')}${P('M-56 -60H56L46 0H-46Z','rgba(160,160,170,.25)','#6a6e78',3)}${L('M-50 -40H50M-48 -20H48M-30 -60V0M0 -60V0M30 -60V0','#6a6e78',2)}${L('M-40 -60Q0 -124 40 -60','#4a4e58',5)}`;
const sitzstangen=()=>`${sch(90)}${L('M-80 0L-40 -160M80 0L40 -160',holz,8)}${[-40,-80,-120].map((y,k)=>L(`M${-70+k*10} ${y}H${70-k*10}`,dk,7)).join('')}${huhn(-20,-142,'#3a3a3a',.8)}${huhn(30,-102,weiss,.8)}`;
const kueken=()=>`${sch(70)}${huhn(0,-40,braun,1.3)}${[[-50,-8],[46,-6],[68,-12]].map(([x,y])=>C(x,y,9,'#ffe040','#c8a020',1.5)+C(x+7,y-8,6,'#ffe040','#c8a020',1.5)+P(`M${x+12} ${y-9}l5 2l-5 2Z`,orange)).join('')}`;
const traenke=()=>`${sch(50)}${E(0,-6,48,8,'#7a8a9a','#3a4a5a',2)}${E(0,-8,40,5,'#8ac8f0')}${P('M-26 -12Q-30 -80 -12 -96H12Q30 -80 26 -12Z','rgba(180,220,245,.8)','#3a6a9a',3)}${R(-26,-60,52,46,'rgba(90,170,230,.6)')}${E(0,-100,14,6,'#3a6a9a')}${R(-4,-112,8,12,'#3a6a9a')}`;
const werkzeugwand=()=>`${R(-92,-62,184,124,'#d8b888','#6a4a20',4)}${linien(40,k=>C(-80+(k%10)*18,-50+Math.floor(k/10)*30,2,'#8a6a40'))}${L('M-66 -36V40','#8a5a20',6)}${R(-80,-50,28,14,gr)}${L('M-30 -34V40',chrom,6)}${C(-30,-42,9,'none',chrom,5)}${R(4,-46,10,30,rot)}${L('M9 -16V36',chrom,4)}${L('M60 -50V10',holz,6)}${P('M48 10H72V40Q60 52 48 40Z',chrom,gr,2)}`;
const pruefliste=()=>`${R(-62,-80,124,160,'#3a7ac0','#1a3a6a',4)}${R(-52,-66,104,136,'#fff')}${R(-20,-88,40,18,chrom,gr,2)}${U('bhtraktor',-24,-62,48,gruen)}${[-2,22,46].map((y,k)=>R(-40,y-7,14,14,'#fff',gr,2)+L(`M-18 ${y}H38`,'#8a8a90',4)+(k<2?L(`M-38 ${y}l4 5l8 -11`,gruen,3):'')).join('')}`;
const maschinentafel=()=>`${R(-90,-60,180,120,'#eef4e8','#3a6a3a',5)}${R(-90,-60,180,22,gruen)}${U('bhtraktor',-84,-28,56,rot)}${R(18,-20,44,30,gelb,'#8a6a10',2)}${R(48,-34,18,18,'#bfe4fa','#8a6a10',2)}${C(26,18,9,gr)}${C(56,18,7,gr)}${L('M18 -8L4 4','#8a6a10',4)}${C(2,8,10,'none','#8a6a10',3)}${L('M-80 46H80','#8a6a40',3)}`;
const traktor=()=>`${sch(130)}${P('M-110 -60V-190H-20V-110H110Q120 -110 120 -96V-60Z',rot,'#7a1a10',4)}${R(-98,-178,66,62,'#bfe4fa','#7a1a10',3)}${L('M-90 -130L-58 -170','#fff',4)}${L('M90 -110V-150',gr,7)}${R(-114,-196,100,12,'#2a2a2a')}${L('M30 -100V-68M50 -100V-68M70 -100V-68','#8a1a10',3)}${C(118,-86,7,'#fff6b0')}${C(-62,-50,52,'#2a2a2a','#111',4)}${C(-62,-50,24,gelb,'#8a6a10',3)}${C(-62,-50,6,gr)}${C(84,-30,32,'#2a2a2a','#111',4)}${C(84,-30,14,gelb,'#8a6a10',3)}`;
const anhaenger=()=>`${sch(110)}${kiste(-100,-120,80,50)}${kiste(-12,-120,80,50)}${[-80,-60,-40].map(x=>E(x,-124,12,9,'#d8b070','#8a6030',2)).join('')}${kb(28,-130,18)}${R(-110,-70,200,46,'#3a8a3a','#1a4a1a',3)}${L('M90 -40L140 -30',gr,6)}${C(-60,-16,18,'#2a2a2a','#111',3)}${C(-60,-16,7,chrom)}${C(40,-16,18,'#2a2a2a','#111',3)}${C(40,-16,7,chrom)}`;
const faesser=()=>`${sch(80)}${[[-38,0],[38,0],[0,-92]].map(([x,y])=>R(x-34,y-90,68,90,'#2a6ab0','#1a3a6a',3)+L(`M${x-34} ${y-62}H${x+34}M${x-34} ${y-28}H${x+34}`,'#1a3a6a',4)+E(x,y-90,34,6,'#3a7ac0','#1a3a6a',2)).join('')}${P('M-38 -54Q-30 -42 -38 -38Q-46 -42 -38 -54Z','#8ac8f0')}`;
const werkbank=()=>`${sch(100)}${L('M-90 -74V0M90 -74V0',dk,8)}${R(-84,-60,90,40,'#c8945a',dk,2)}${C(-40,-40,4,gr)}${R(-100,-90,200,16,holz,dk,3)}${R(30,-110,40,20,'#5a6a7a',gr,2)}${L('M50 -110V-124M40 -124H60',gr,4)}${R(-80,-106,50,16,rot,'#7a1a10',2)}${L('M-26 -100H10','#8a5a20',5)}`;
const reifen=()=>`${sch(70)}${[0,-26,-52,-78].map((y,k)=>E(k==3?6:0,y-14,60,16,'#2a2a2a','#111',3)+E(k==3?6:0,y-18,32,7,'#555')).join('')}`;
const marmeladenregal=()=>`${R(-92,-64,184,128,holz,dk,4)}${[-6,58].map(y=>R(-92,y,184,6,dk)).join('')}${[-70,-42,-14,14,42,70].map((x,k)=>R(x-11,-40,22,34,['#c8283a','#e87a1a','#7a2a6a',gelb][k%4],gr,1.5)+R(x-13,-46,26,8,'#f4ead8')+R(x-9,-28,18,10,'#fff')).join('')}${R(-80,40,160,18,'#b8a070')}${[-66,-34,-2,30,62].map((x,k)=>ei(x,40,k%2?'#e8c8a0':'#fff4e0')).join('')}`;
const kreidetafel=()=>`${R(-84,-64,168,128,'#2a3a30',holz,8)}${X(0,-36,'HEUTE','20','#fff')}${[-6,22,48].map((y,k)=>U(['bhei','bhkuerbis','bhaehre'][k],-70,y-12,24,['#fff4e0',orange,gelb][k])+L(`M-38 ${y}H20`,'#fff',3)+X(48,y+7,'€','20','#fff')).join('')}`;
const hoftafel=()=>`${R(-90,-60,180,120,'#fff8e8','#6a4a28',5)}${R(-80,-10,46,36,'#8a5a30')}${[-70,-56,-42].map(x=>L(`M${x} -10V-26`,gruen,4)+E(x,-28,5,7,'#5ab03a')).join('')}${pfeile(8)}${kiste(-16,-6,32,30)}${C(-6,-12,7,rot)}${C(8,-12,7,orange)}${E(64,14,20,7,'#fff','#8a8a90',2)}${C(58,8,6,rot)}${P('M66 10l10 -12l3 3l-10 11Z',orange)}${R(44,24,40,5,holz)}`;
const gemuesekisten=()=>`${sch(90)}${kiste(-90,-56,86,56)}${kiste(4,-56,86,56)}${[-80,-62].map(x=>C(x,-62,10,rot)).join('')}${[58,76].map(x=>P(`M${x-6} -56L${x+2} -88L${x+8} -56Z`,orange)+L(`M${x+2} -88l-5 -10M${x+2} -88l5 -10`,gruen,3)).join('')}${kiste(-44,-112,86,56)}${[-24,0,24].map(x=>C(x,-122,13,'#8ad050','#4a8a2a',2)).join('')}`;
const ladentheke=()=>`${sch(130)}${R(-130,-96,260,96,'#c8945a','#5a3a20',4)}${[-90,-30,30,90].map(x=>R(x-24,-80,48,66,'#b8844a','#5a3a20',2)).join('')}${R(-136,-104,272,12,'#8a5a30')}${R(40,-150,70,46,'#4a7a5a','#1a3a2a',3)}${R(48,-144,54,14,'#c8f0d0')}${[0,1,2].map(k=>R(50+k*18,-126,14,10,'#f4ead8')).join('')}${R(52,-166,46,16,'#3a6a4a','#1a3a2a',2)}${P('M-100 -104Q-78 -150 -56 -104Z','#d8b888','#8a6a40',2)}${kb(-30,-118,16)}`;
const ladenwaage=()=>`${sch(60)}${R(-50,-20,100,20,'#c83a2a','#6a1a10',3)}${R(-40,-90,80,70,rot,'#6a1a10',3)}${C(0,-56,24,'#fff8ec','#6a1a10',3)}${L('M-18 -56h6M12 -56h6M0 -74v6',gr,2)}${L('M0 -56L12 -70',gr,3)}${L('M0 -90V-96',gr,4)}${E(0,-98,52,8,chrom,'#6a6e78',2)}${[-24,0,24].map(x=>C(x,-114,13,x?rot:'#8ac040','#5a1a10',2)).join('')}`;
const eierschrank=()=>`${sch(60)}${R(-56,-180,112,180,'#f4f4f0','#5a6a7a',4)}${R(-46,-168,92,140,'#d8eef8','#8a9aa8',3)}${[-140,-100,-60].map(y=>R(-46,y,92,4,'#8a9aa8')+R(-38,y-16,76,16,'#c8a070','#6a4a20',1.5)+[-28,-10,8,26].map(x=>ei(x+2,y-18,'#fff4e0')).join('')).join('')}${U('bhei',-12,-26,24,'#e8c8a0')}${R(-62,-196,124,18,gelb,'#8a6a10',2)}`;
const blumeneimer=()=>`${sch(80)}${[[-46,gelb],[0,'#e84a7a'],[46,'#f4f0ff']].map(([x,c],k)=>linien(4,j=>{const fx=x-18+j*12,fy=-90-(j%2)*22;return L(`M${x} -50L${fx} ${fy}`,'#3a7a2a',3)+C(fx,fy,k?9:13,c,'rgba(0,0,0,.3)',1.5)+(k?'':C(fx,fy,5,'#6a3a10'));})+P(`M${x-22} 0L${x-26} -56H${x+26}L${x+22} 0Z`,'#a8b0b8','#5a6068',2)).join('')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#3a2a1a" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#3a2a1a" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer .lt{opacity:0}.tuer.offen .lt{opacity:1}.tuer.offen .pl{opacity:0}.tuer.offen #bhg1{transform:scaleX(.1)}.tuer.offen #bhg2{transform:scaleX(.1)}.tuer.offen #bhs{transform:translateX(-250px)}.tuer.offen #bhk{transform:scaleY(.07)}.tuer.offen #bhr{transform:scaleY(.06)}.tuer.offen #bhl1{transform:scaleX(.1)}.tuer.offen #bhl2{transform:scaleX(.1)}#bhl2{transition-delay:.6s!important}</style>`;
function tuerGarten(n){
const fl=x=>linien(5,k=>P(`M${x+4+k*21} 470V290l8 -12l8 12V470Z`,'#f4ead8','#8a7a60',2))+R(x,330,110,10,'#d8c8a8','#8a7a60',2)+R(x,420,110,10,'#d8c8a8','#8a7a60',2);
return`${R(390,200,220,270,'#bfe4fa')}${P('M390 380Q500 340 610 380V470H390Z','#8ac860')}${R(450,320,100,70,'#b8382a')}${P('M440 322L500 286L560 322Z','#6a2a1a')}${R(486,350,28,40,'#fff4e0')}${P('M470 470L490 390H510L530 470Z','#c8a878')}${R(372,250,20,220,holz,dk,3)}${R(608,250,20,220,holz,dk,3)}${L('M382 250V230Q500 110 618 230V250','#3a7a2a',16)}${[[388,220],[420,170],[460,140],[500,130],[540,140],[580,170],[612,220]].map(([x,y],k)=>C(x,y,9,k%2?'#e84a7a':rot)).join('')}
   <g id="bhg1" class="tb" style="transform-origin:390px 380px">${fl(390)}</g>
   <g id="bhg2" class="tb" style="transform-origin:610px 380px">${fl(500)}</g>
   <g class="tb pl">${sPl(n,380)}</g>`;
}
function tuerScheune(n){
return`${R(370,150,260,320,'#8a2a1a',dk,5)}${R(390,170,220,300,'#fdecc0')}${R(420,300,160,110,'#f4ecd8','#8a5a2a',3)}${P('M410 304L500 250L590 304Z','#8a3a2a')}${R(486,350,28,60,'#8a5a2a')}${P('M390 410H610V470H390Z','#e8c860')}${huhn(450,440,weiss,.6)}${R(140,140,500,12,gr)}
   <g id="bhs" class="tb">${R(390,170,220,300,'#c03a2a','#5a1a10',4)}${L('M396 176L604 464M604 176L396 464M392 172H608V468H392Z','#fff4e0',10)}${C(420,150,10,gr)}${C(580,150,10,gr)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerKlappe(n){
return`${R(380,150,240,320,'#e8dcc0','#6a4a28',5)}${R(400,170,200,300,'#7e8e9a')}${L(linien(13,k=>`M${408+k*16} 170V470`),'rgba(40,50,60,.3)',4)}${C(450,430,40,'#2a2a2a')}${C(450,430,18,gelb)}${R(470,360,120,60,rot)}${R(360,110,280,34,'#c89a5a','#5a3a18',3)}${U('bhhuhn',420,108,36,'#5a3a18')}${U('bhei',490,110,32,'#fff4e0')}${U('bhhuhn',548,108,36,'#5a3a18')}
   <g class="tb lt">${L('M440 470L470 240M560 470L530 240',holz,9)}${linien(5,k=>L(`M${444+k*6} ${440-k*44}H${556-k*6}`,dk,7))}</g>
   <g id="bhk" class="tb" style="transform-origin:500px 470px">${R(400,170,200,300,'#c89a5a','#5a3a18',4)}${L(linien(4,k=>`M${440+k*40} 172V468`),'#8a6030',3)}${L('M404 240H596M404 400H596',dk,8)}${P('M470 470V430Q500 400 530 430V470Z','#3a2a1a')}</g>
   <g class="tb pl">${sPl(n,310)}</g>`;
}
function tuerRolltor(n){
return`${R(360,130,280,340,'#3a5a3a','#1a2a1a',5)}${R(390,170,220,300,'#f0c890')}${[260,340,420].map(y=>R(390,y,220,6,'#8a5a30')+linien(6,k=>R(400+k*36,y-28,24,28,['#c8283a','#e87a1a',gelb,'#8ac040'][k%4]))).join('')}${C(500,300,90,'url(#licht)')}${R(380,150,240,26,'#2a4a2a')}
   <g id="bhr" class="tb" style="transform-origin:500px 172px">${R(390,172,220,298,'#5a8a5a','#2a4a2a',4)}${L(linien(16,k=>`M392 ${190+k*18}H608`),'#3a6a3a',4)}${R(470,440,60,12,'#2a4a2a')}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerKloen(n){
return`${R(380,150,240,320,'#f4ead8','#6a4a28',5)}${R(400,170,200,300,'#f6a868')}${C(500,300,30,'#ffe080')}${C(500,300,90,'url(#licht)')}${R(400,320,200,150,'#c8a040')}${L('M400 360H600M400 410H600','#a88030',3)}${R(400,118,200,30,'#3a7a4a','#1a3a2a',3)}${X(500,141,'ZUM HOF','20','#fff')}
   <g id="bhl1" class="tb" style="transform-origin:400px 245px">${R(400,170,200,150,'#3a7a4a','#1a3a2a',4)}${R(430,190,140,90,'#bfe4fa','#f4ead8',6)}${L('M500 190V280M430 235H570','#f4ead8',5)}</g>
   <g id="bhl2" class="tb" style="transform-origin:400px 395px">${R(400,320,200,150,'#3a7a4a','#1a3a2a',4)}${L('M412 332L588 458M588 332L412 458','#2a5a3a',8)}${C(580,360,6,gelb)}</g>
   <g class="tb pl">${sPl(n,390)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'gartentor';
const arten={gartentor:[tuerGarten,'Gartentor mit Zahlenschloss'],scheunentor:[tuerScheune,'Scheunentor zum Schieben mit Zahlenschloss'],klappe:[tuerKlappe,'Hühnerklappe mit Zahlenschloss'],rolltor:[tuerRolltor,'Rolltor vom Traktorschuppen mit Zahlenschloss'],kloentuer:[tuerKloen,'Klöntür vom Hofladen mit Zahlenschloss']};
const a=arten[art]||arten.gartentor;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const mensch=(x,y,h,k,hut)=>`${L(`M${x-7} ${y}V${y-30}M${x+7} ${y}V${y-30}`,'#3a4a6a',9)}${R(x-15,y-70,30,42,k)}${C(x,y-82,12,h)}${hut}<g class="bhwk" style="transform-origin:${x+13}px ${y-64}px">${L(`M${x+13} ${y-64}L${x+28} ${y-100}`,k,8)}</g>${L(`M${x-13} ${y-64}L${x-20} ${y-34}`,k,8)}`;
SZENARIEN.bauernhof={
name:"Der Bauernhof",
symbole:["bhhuhn","bhei","bhtraktor","bhaehre","bhkuerbis"],
symbolNamen:["Huhn","Ei","Traktor","Ähre","Kürbis"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect x="26" y="34" width="68" height="50" fill="#c03a2a" stroke="#5a1a10" stroke-width="3"/><path d="M18 38L60 8L102 38Z" fill="#6a2a1a"/><rect x="46" y="52" width="28" height="32" fill="#fff4e0"/><path d="M48 54L72 82M72 54L48 82" stroke="#c03a2a" stroke-width="4"/><rect x="52" y="22" width="16" height="12" fill="#e8c860"/><path d="M0 84H120V90H0Z" fill="#7ab850"/><circle cx="104" cy="74" r="10" fill="#e8801a"/><ellipse cx="14" cy="76" rx="10" ry="7" fill="#fff8ec" stroke="#5a3a20" stroke-width="1.5"/></svg>`,
texte:{
einleitung:"Willkommen auf dem Bauernhof! Heute helft ihr der Bäuerin und dem Bauern bei der Arbeit. Ihr kommt in den Gemüsegarten, in die Scheune, in den Hühnerstall, in den Traktorschuppen und in den Hofladen. Die Hofbäuerin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, bringt die ganze Ernte in den Hofladen. Schafft ihr es?",
startKnopf:"Los geht&rsquo;s",
hinweisGeber:"Die Hofbäuerin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Hofbäuerin schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Tor",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber das Tor bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Feierabend auf dem Hof!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Hof trotzdem noch ganz erkunden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Die Ernte ist eingebracht, und im Hofladen ist alles verkauft. Die Bäuerin, der Bauer und die Kinder winken euch zu. Auch das Huhn, die Katze und der Hund freuen sich mit. Ihr seid jetzt echte Hof-Profis!"
},
texteDu:{
einleitung:"Willkommen auf dem Bauernhof! Heute hilfst du der Bäuerin und dem Bauern bei der Arbeit. Du kommst in den Gemüsegarten, in die Scheune, in den Hühnerstall, in den Traktorschuppen und in den Hofladen. Die Hofbäuerin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, bringt die ganze Ernte in den Hofladen. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Hofbäuerin schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingebrannt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber das Tor bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Hof trotzdem noch ganz erkunden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Die Ernte ist eingebracht, und im Hofladen ist alles verkauft. Die Bäuerin, der Bauer und die Kinder winken dir zu. Auch das Huhn, die Katze und der Hund freuen sich mit. Du bist jetzt ein echter Hof-Profi!"
},
einfach:{
name:"Der Bauernhof",
symbolNamen:["Huhn","Ei","Traktor","Ähre","Kürbis"],
texte:{
einleitung:"Ihr seid auf dem Bauernhof. Ihr seht fünf Orte: den Garten, die Scheune, den Hühner-Stall, den Traktor-Schuppen und den Hof-Laden. Die Bäuerin hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende ist alles geerntet. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Tor",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Das Tor bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Alles ist geerntet. Alle auf dem Hof winken euch zu!"
},
texteDu:{
einleitung:"Du bist auf dem Bauernhof. Du siehst fünf Orte: den Garten, die Scheune, den Hühner-Stall, den Traktor-Schuppen und den Hof-Laden. Die Bäuerin hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende ist alles geerntet. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Das Tor bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Alles ist geerntet. Alle auf dem Hof winken dir zu!"
},
raeume:[
{titel:"Der Garten",intro:"Die Sonne scheint. Im Garten wächst Gemüse. Das Garten-Tor ist zu. Findet die Zahlen!",introDu:"Die Sonne scheint. Im Garten wächst Gemüse. Das Garten-Tor ist zu. Finde die Zahlen!",
objekte:[{name:"Beet-Plan",fund:"Am Plan klebt:"},{name:"Regen-Messer",fund:"Am Regen-Messer klebt:"},{name:"Vogel-Scheuche",fund:"An der Vogel-Scheuche hängt:"},{name:"Gieß-Kanne",fund:"An der Kanne klebt:"},{name:"Kürbisse",fund:"Beim Kürbis liegt:"}],
infoObjekte:[{name:"Pflanzen-Tafel",fund:"An der Tafel klebt:"},{name:"Salat-Beet",fund:"Im Beet liegt:"},{name:"Ernte-Korb",fund:"Im Korb liegt:"}]},
{titel:"Die Scheune",intro:"Hier liegt viel Heu und Stroh. Die Sonne scheint durch die Holz-Wand. Das große Tor ist zu.",
objekte:[{name:"Stall-Lampe",fund:"An der Lampe hängt:"},{name:"Ernte-Kranz",fund:"Am Kranz hängt:"},{name:"Stroh-Ballen",fund:"Im Stroh liegt:"},{name:"Holz-Leiter",fund:"An der Leiter klebt:"},{name:"Heu-Rolle",fund:"Im Heu liegt:"}],
infoObjekte:[{name:"Korn-Tafel",fund:"An der Tafel klebt:"},{name:"Korn-Säcke",fund:"Am Sack klebt:"},{name:"Katzen-Familie",fund:"Im Katzen-Korb liegt:"}]},
{titel:"Der Hühner-Stall",intro:"Es ist Morgen. Die Hühner legen Eier. Die große Klappe ist zu.",
objekte:[{name:"Nester",fund:"Im Nest liegt:"},{name:"Strich-Liste",fund:"An der Liste klebt:"},{name:"Futter-Trog",fund:"Im Trog liegt:"},{name:"Eier-Korb",fund:"Im Korb liegt:"},{name:"Sitz-Stangen",fund:"An der Stange hängt:"}],
infoObjekte:[{name:"Küken-Tafel",fund:"An der Tafel klebt:"},{name:"Hühner-Familie",fund:"Bei den Küken liegt:"},{name:"Wasser-Spender",fund:"Am Wasser-Spender klebt:"}]},
{titel:"Der Traktor-Schuppen",intro:"Hier steht der rote Traktor. Es gibt viel Werkzeug. Das Roll-Tor ist zu.",
objekte:[{name:"Werkzeug-Wand",fund:"An der Wand hängt:"},{name:"Traktor-Liste",fund:"An der Liste klebt:"},{name:"Anhänger",fund:"Im Anhänger liegt:"},{name:"Traktor",fund:"Im Traktor liegt:"},{name:"Blaue Fässer",fund:"Am Fass klebt:"}],
infoObjekte:[{name:"Maschinen-Tafel",fund:"An der Tafel klebt:"},{name:"Werk-Bank",fund:"Auf der Werk-Bank liegt:"},{name:"Reifen-Turm",fund:"Im Reifen liegt:"}]},
{titel:"Der Hof-Laden",intro:"Hier kauft man Gemüse und Eier. Es ist Abend. Öffnet die Tür zum Hof!",introDu:"Hier kauft man Gemüse und Eier. Es ist Abend. Öffne die Tür zum Hof!",
objekte:[{name:"Marmeladen-Regal",fund:"Im Regal steht:"},{name:"Preis-Tafel",fund:"An der Tafel klebt:"},{name:"Gemüse-Kisten",fund:"In der Kiste liegt:"},{name:"Laden-Theke",fund:"Auf der Theke liegt:"},{name:"Waage",fund:"Auf der Waage liegt:"}],
infoObjekte:[{name:"Hof-Tafel",fund:"An der Tafel klebt:"},{name:"Eier-Schrank",fund:"Im Schrank liegt:"},{name:"Blumen-Eimer",fund:"Im Eimer steckt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Gemüsegarten",
intro:"Die Sonne scheint warm auf den Gemüsegarten. In den Beeten wachsen Salat, Möhren und dicke Kürbisse. Eine freundliche Vogelscheuche passt auf die Beete auf. Das Gartentor zum Hof hat ein Zahlenschloss. Findet die Ziffern, um es zu öffnen!",
introDu:"Die Sonne scheint warm auf den Gemüsegarten. In den Beeten wachsen Salat, Möhren und dicke Kürbisse. Eine freundliche Vogelscheuche passt auf die Beete auf. Das Gartentor zum Hof hat ein Zahlenschloss. Finde die Ziffern, um es zu öffnen!",
tuerX:1250,tuerArt:"gartentor",
hintergrund:()=>`${defs('#7ab84a','#4a7a2a','#fff6b0')}${hg('bhH1','#4aa8ec','#a8dcf8','#d8f2fc')}${R(0,0,1600,470,'url(#bhH1)')}${C(140,80,46,'#fff4a0')}${C(140,80,190,'url(#licht)')}${[[480,70],[1050,110],[1450,60]].map(([x,y])=>E(x,y,64,18,'#fff')+E(x-26,y-12,30,16,'#fff')+E(x+22,y-14,34,20,'#fff')).join('')}${P('M0 330Q260 250 560 310T1100 290T1600 300V470H0Z','#9ad070')}${P('M0 380Q400 330 800 370T1600 360V470H0Z','#7ab850')}${[[560,380],[880,370]].map(([x,y])=>R(x-8,y-60,16,70,'#7a4a24')+C(x,y-90,46,'#4a9a3a')+C(x-28,y-70,30,'#5aaa44')+C(x+26,y-72,32,'#3a8a30')+C(x+14,y-96,6,rot)+C(x-18,y-80,6,rot)+C(x+30,y-66,6,rot)).join('')}${R(1420,250,170,220,'#c8704a','#5a2a1a',3)}${P('M1404 254L1505 180L1606 254Z','#6a3a2a')}${R(1450,320,50,150,'#8a4a2a','#4a2a10',3)}${R(1520,296,50,44,'#bfe4fa','#fff',4)}${R(1516,340,58,12,'#6a3a1a')}${C(1528,336,7,'#e84a7a')}${C(1546,334,7,gelb)}${C(1564,336,7,'#e84a7a')}${linien(45,k=>P(`M${k*36+6} 470V392l12 -14l12 14V470Z`,'#f4ead8','#a89880',2))}${R(0,410,1600,10,'#e0d4bc','#a89880',2)}${R(0,446,1600,10,'#e0d4bc','#a89880',2)}${[760,830].map((x,k)=>L(`M${x} 470V${300+k*24}`,'#3a7a2a',5)+E(x-12,410,14,6,'#4a9a3a')+E(x+12,380,14,6,'#4a9a3a')+C(x,300+k*24,22,gelb,'#c88a10',2)+C(x,300+k*24,10,'#6a3a10')).join('')}${boden(0)}`,
objekte:[
{name:"Beetplan",x:250,y:220,wand:true,by:-80,zeichne:beetplan,fund:"Am Beetplan klebt:"},
{name:"Regenmesser",x:650,y:210,wand:true,by:-100,zeichne:regenmesser,fund:"Am Regenmesser klebt:"},
{name:"Vogelscheuche",x:150,boden:700,fuss:4,by:-240,zeichne:vogelscheuche,fund:"In der Tasche der Vogelscheuche steckt:"},
{name:"Gießkanne",x:450,boden:650,fuss:4,by:-125,zeichne:giesskanne,fund:"An der Gießkanne klebt:"},
{name:"Kürbisbeet",x:850,boden:720,fuss:4,by:-105,zeichne:kuerbisse,fund:"Unter dem größten Kürbis liegt:"}
],
infoObjekte:[{name:"Wachstumstafel",x:1000,y:240,wand:true,by:-80,zeichne:wachstumstafel,fund:"An der Wachstumstafel klebt:"},{name:"Salatbeet",x:1050,boden:600,fuss:4,by:-100,zeichne:salatbeet,fund:"Zwischen den Salatköpfen liegt:"},{name:"Erntekorb",x:1450,boden:740,fuss:4,by:-130,zeichne:erntekorb,fund:"Im Erntekorb liegt:"}]},
{titel:"Die Scheune",
intro:"In der großen Scheune riecht es nach Heu und Stroh. Durch die Ritzen in den Holzwänden fallen goldene Sonnenstrahlen. Oben auf dem Heuboden liegt das Futter für den Winter. Das schwere Scheunentor ist noch verschlossen. Findet die Ziffern, damit ihr es zur Seite schieben könnt!",
introDu:"In der großen Scheune riecht es nach Heu und Stroh. Durch die Ritzen in den Holzwänden fallen goldene Sonnenstrahlen. Oben auf dem Heuboden liegt das Futter für den Winter. Das schwere Scheunentor ist noch verschlossen. Finde die Ziffern, damit du es zur Seite schieben kannst!",
tuerX:400,tuerArt:"scheunentor",
hintergrund:()=>`${defs('#b8844a','#7a4a24','#ffe0a0')}${R(0,0,1600,470,'#7a4624')}${L(linien(27,k=>`M${k*60} 0V470`),'rgba(40,18,6,.55)',3)}${[180,640,1020,1440].map(x=>P(`M${x} 140L${x+8} 140L${x+250} 470L${x+140} 470Z`,'rgba(255,224,130,.17)')+R(x,140,8,70,'#ffe8a0')).join('')}${R(0,0,1600,110,'#5a3418')}${P('M0 110V60Q100 30 200 58T420 50T700 60T1000 46T1300 58T1600 52V110Z',stroh)}${L('M40 70l20 -14M300 60l14 -16M720 66l18 -14M1100 56l16 -14M1450 66l20 -12','#c8a040',3)}${R(0,104,1600,22,'#4a2a10')}${[860,1290].map(x=>R(x,126,26,344,'#5a3418','#2a1408',2)+L(`M${x-60} 126L${x+13} 200L${x+86} 126`,'#5a3418',10)).join('')}${linien(30,k=>C((k*97)%1600,150+(k*61)%300,2,'rgba(255,240,180,.7)'))}${boden(1)}`,
objekte:[
{name:"Stalllaterne",x:700,y:210,wand:true,by:-95,zeichne:laterne,fund:"An der Stalllaterne hängt:"},
{name:"Erntekranz",x:1100,y:220,wand:true,by:-100,zeichne:erntekranz,fund:"Im Erntekranz steckt:"},
{name:"Strohballen-Stapel",x:150,boden:740,fuss:4,by:-140,zeichne:strohballen,fund:"Zwischen den Strohballen steckt:"},
{name:"Holzleiter",x:650,boden:680,fuss:4,by:-280,zeichne:holzleiter,fund:"An der Holzleiter klebt:"},
{name:"Rundballen",x:950,boden:560,fuss:4,by:-140,zeichne:rundballen,fund:"Im Rundballen steckt:"}
],
infoObjekte:[{name:"Tafel Vom Korn zum Brot",x:1480,y:240,wand:true,by:-80,zeichne:korntafel,fund:"An der Korn-Tafel klebt:"},{name:"Kornsäcke",x:1250,boden:700,fuss:4,by:-150,zeichne:kornsaecke,fund:"Am Kornsack klebt:"},{name:"Katze mit Kätzchen",x:1500,boden:600,fuss:4,by:-95,zeichne:katzenkorb,fund:"Im Katzenkorb liegt:"}]},
{titel:"Der Hühnerstall",
intro:"Im Hühnerstall ist es früh am Morgen. Die Hühner gackern fröhlich und legen Eier in ihre Nester. Durch die kleinen Fenster scheint das rosa Morgenlicht. Die große Klappe zum Traktorschuppen ist noch zu. Findet die Ziffern, damit sie herunterklappt!",
introDu:"Im Hühnerstall ist es früh am Morgen. Die Hühner gackern fröhlich und legen Eier in ihre Nester. Durch die kleinen Fenster scheint das rosa Morgenlicht. Die große Klappe zum Traktorschuppen ist noch zu. Finde die Ziffern, damit sie herunterklappt!",
tuerX:800,tuerArt:"klappe",
hintergrund:()=>`${defs('#d8b868','#a88a40','#ffd8c0')}${R(0,0,1600,470,'#f4ecd8')}${R(0,330,1600,140,'#b8864a')}${L(linien(27,k=>`M${k*60} 330V470`),'rgba(80,50,20,.4)',2)}${R(0,322,1600,10,'#8a5a2a')}${linien(5,k=>L(`M${k*400-100} 0L${k*400+100} 70`,'#a87a4a',14))}${R(0,60,1600,16,'#a87a4a')}${[560,1000].map(x=>P(`M${x-50} 200L${x+50} 200L${x+160} 470L${x-100} 470Z`,'rgba(255,200,180,.18)')+R(x-50,110,100,90,'#ffc8a8','#8a5a2a',6)+C(x+14,196,22,'#fff0a0')+L(`M${x} 110V200M${x-50} 155H${x+50}`,'#8a5a2a',5)+L(`M${x-46} 120l30 30M${x-16} 120l30 30M${x+14} 120l30 30`,'rgba(255,255,255,.4)',1.5)).join('')}${C(560,250,150,'url(#licht)')}${C(1000,250,150,'url(#licht)')}${L('M1320 76V120',gr,3)}${P('M1300 120H1340L1350 140H1290Z',gr)}${E(1320,144,12,6,'#fff6b0')}${boden(2)}`,
objekte:[
{name:"Legenester",x:250,y:230,wand:true,by:-75,zeichne:legenester,fund:"Im mittleren Legenest liegt:"},
{name:"Eier-Strichliste",x:1150,y:220,wand:true,by:-82,zeichne:strichliste,fund:"An der Eier-Strichliste klebt:"},
{name:"Futtertrog",x:150,boden:700,fuss:4,by:-110,zeichne:futtertrog,fund:"Im Futtertrog liegt:"},
{name:"Eierkorb",x:450,boden:650,fuss:4,by:-130,zeichne:eierkorb,fund:"Unter den Eiern liegt:"},
{name:"Sitzstangen",x:1100,boden:720,fuss:4,by:-190,zeichne:sitzstangen,fund:"An der obersten Sitzstange hängt:"}
],
infoObjekte:[{name:"Tafel Vom Ei zum Küken",x:1480,y:240,wand:true,by:-82,zeichne:kuekentafel,fund:"An der Küken-Tafel klebt:"},{name:"Henne mit Küken",x:1300,boden:600,fuss:4,by:-90,zeichne:kueken,fund:"Neben den Küken liegt:"},{name:"Wassertränke",x:600,boden:740,fuss:4,by:-125,zeichne:traenke,fund:"An der Wassertränke klebt:"}]},
{titel:"Der Traktorschuppen",
intro:"Im Traktorschuppen ist es kühl. Das Blech an den Wänden glänzt im Licht der Lampen. Hier stehen der rote Traktor, der Anhänger und viel Werkzeug. Das Rolltor zum Hofladen ist noch unten. Findet die Ziffern, um es hochzufahren!",
introDu:"Im Traktorschuppen ist es kühl. Das Blech an den Wänden glänzt im Licht der Lampen. Hier stehen der rote Traktor, der Anhänger und viel Werkzeug. Das Rolltor zum Hofladen ist noch unten. Finde die Ziffern, um es hochzufahren!",
tuerX:1300,tuerArt:"rolltor",
hintergrund:()=>`${defs('#9a9a94','#6a6a66','#e8f4ff')}${R(0,0,1600,470,'#7e8e9a')}${L(linien(100,k=>`M${k*16+8} 0V470`),'rgba(40,50,60,.25)',4)}${R(0,0,1600,40,'#4a5a66')}${linien(8,k=>L(`M${k*200} 40L${k*200+100} 120L${k*200+200} 40`,'#3a4650',8))}${R(0,40,1600,10,'#3a4650')}${[420,850,1500].map(x=>R(x-70,56,140,8,'#fff')+C(x,90,160,'url(#licht)')).join('')}${R(440,170,150,100,'#9ad0f0','#3a4650',6)}${L('M515 170V270M440 220H590','#3a4650',4)}${C(1530,200,40,'none',gelb,8)}${C(1530,200,26,'none',gelb,8)}${R(0,440,1600,30,'#5a646c')}${boden(3)}`,
objekte:[
{name:"Werkzeugwand",x:300,y:230,wand:true,by:-80,zeichne:werkzeugwand,fund:"An der Werkzeugwand hängt:"},
{name:"Prüfliste vom Traktor",x:700,y:220,wand:true,by:-100,zeichne:pruefliste,fund:"An der Prüfliste klebt:"},
{name:"Anhänger",x:200,boden:700,fuss:4,by:-150,zeichne:anhaenger,fund:"Im Anhänger liegt:"},
{name:"Roter Traktor",x:600,boden:640,fuss:4,by:-215,zeichne:traktor,fund:"Auf dem Sitz vom Traktor liegt:"},
{name:"Blaue Wasserfässer",x:900,boden:720,fuss:4,by:-195,zeichne:faesser,fund:"Am Wasserfass klebt:"}
],
infoObjekte:[{name:"Tafel der Landmaschinen",x:1050,y:240,wand:true,by:-80,zeichne:maschinentafel,fund:"An der Maschinentafel klebt:"},{name:"Werkbank",x:1050,boden:600,fuss:4,by:-140,zeichne:werkbank,fund:"Auf der Werkbank liegt:"},{name:"Reifenstapel",x:1500,boden:740,fuss:4,by:-120,zeichne:reifen,fund:"Im obersten Reifen liegt:"}]},
{titel:"Der Hofladen",
intro:"Im Hofladen duftet es nach frischem Gemüse und Blumen. In den Regalen stehen Marmelade, Eier und Honig. Draußen färbt die Abendsonne den Himmel orange. Die Tür zum Hof hat das letzte Zahlenschloss. Findet die Ziffern, damit alle Feierabend machen können!",
introDu:"Im Hofladen duftet es nach frischem Gemüse und Blumen. In den Regalen stehen Marmelade, Eier und Honig. Draußen färbt die Abendsonne den Himmel orange. Die Tür zum Hof hat das letzte Zahlenschloss. Finde die Ziffern, damit alle Feierabend machen können!",
tuerX:550,tuerArt:"kloentuer",
hintergrund:()=>`${defs('#c8683a','#8a4020','#ffd090')}${hg('bhH5','#7a5aa0','#f0906a','#ffd080')}${R(0,0,1600,470,'#e8c08a')}${L(linien(12,k=>`M0 ${k*40+20}H1600`),'rgba(120,70,30,.3)',2)}${R(0,0,1600,34,'#8a5a30')}${L('M0 40Q100 80 200 40T400 40T600 40T800 40T1000 40T1200 40T1400 40T1600 40','#4a3a2a',2)}${linien(16,k=>C(k*100+50,60,6,['#ffe08a','#ff9a7a','#a8e0ff'][k%3]))}${R(640,50,320,60,'#f4ead8','#8a5a30',4)}${X(800,94,'HOFLADEN','40','#5a3a18')}${R(1080,120,140,150,'url(#bhH5)','#8a5a30',8)}${C(1150,230,26,'#ffe080')}${C(1150,230,150,'url(#licht)')}${L('M1150 120V270M1080 195H1220','#8a5a30',5)}${R(1074,270,152,14,'#6a3a1a')}${[1094,1122,1150,1178,1206].map((x,k)=>C(x,266,8,['#e84a7a',gelb,'#fff','#e84a7a',gelb][k])).join('')}${[300,1500].map(x=>L(`M${x} 34V70`,dk,3)+linien(5,k=>L(`M${x} 70L${x-16+k*8} 130`,['#c8a040','#e84a7a','#a8c060'][k%3],4))).join('')}${R(0,380,1600,90,'#a8743a')}${L('M0 380H1600','#6a3a1a',5)}${boden(4)}`,
objekte:[
{name:"Marmeladenregal",x:200,y:230,wand:true,by:-82,zeichne:marmeladenregal,fund:"Hinter einem Marmeladenglas steckt:"},
{name:"Kreidetafel mit Preisen",x:950,y:230,wand:true,by:-82,zeichne:kreidetafel,fund:"An der Kreidetafel klebt:"},
{name:"Gemüsekisten",x:150,boden:700,fuss:4,by:-150,zeichne:gemuesekisten,fund:"In der Gemüsekiste liegt:"},
{name:"Ladentheke mit Kasse",x:800,boden:650,fuss:4,by:-190,zeichne:ladentheke,fund:"Neben der Kasse liegt:"},
{name:"Ladenwaage",x:1050,boden:740,fuss:4,by:-140,zeichne:ladenwaage,fund:"Auf der Ladenwaage liegt:"}
],
infoObjekte:[{name:"Tafel Vom Hof auf den Tisch",x:1350,y:240,wand:true,by:-82,zeichne:hoftafel,fund:"An der Hof-Tafel klebt:"},{name:"Eierschrank",x:1250,boden:580,fuss:4,by:-215,zeichne:eierschrank,fund:"Im Eierschrank liegt:"},{name:"Blumeneimer",x:1480,boden:700,fuss:4,by:-130,zeichne:blumeneimer,fund:"Zwischen den Blumen steckt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs>${hg('bhE','#4a3a8a','#f08a6a','#ffd880')}<radialGradient id="bhS"><stop offset="0" stop-color="#fff0c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes bhw{50%{transform:rotate(-30deg)}}@keyframes bhz{50%{transform:rotate(28deg)}}.bhwk{animation:bhw .8s ease-in-out infinite}.bhsw{animation:bhz .45s ease-in-out infinite}</style>
   <rect width="1000" height="600" fill="url(#bhE)"/>${[[90,50],[300,80],[700,40],[930,100]].map(([x,y])=>C(x,y,3,'#fff6c8')).join('')}${C(180,330,200,'url(#bhS)')}${C(180,330,56,'#fff0a0')}
   ${P('M0 380Q250 320 500 360T1000 340V600H0Z','#d8b048')}${L(linien(12,k=>`M${k*90} 400l20 -10M${k*90+40} 420l20 -10`),'#a88030',3)}${R(380,290,170,120,'#f4ead8','#8a5a30',3)}${P('M366 294L465 236L564 294Z','#8a3a2a')}${[400,450,500].map(x=>R(x,320,30,30,'#ffe08a','#8a5a30',2)).join('')}${R(600,230,220,180,'#b8382a','#5a1a10',3)}${P('M586 236L710 160L834 236Z','#6a2a1a')}${R(670,300,80,110,'#fff4e0')}${L('M674 304L746 406M746 304L674 406','#b8382a',6)}${R(690,250,40,30,stroh)}${U('bhtraktor',850,345,100,rot)}
   ${R(0,430,1000,170,'#7aa04a')}${P('M430 600Q470 500 470 430H520Q530 500 600 600Z','#c8a878')}
   ${R(30,350,170,90,'#c8945a',dk,3)}${R(20,330,190,24,'#3a7a4a')}${X(115,348,'ALLES VERKAUFT','15','#fff')}${kiste(40,400,60,36)}${kiste(110,400,60,36)}${kiste(75,366,60,34)}
   ${mensch(270,570,'#f0c8a0','#3a7a4a',E(270,486,24,6,stroh)+P('M256 486Q256 470 270 470Q284 470 284 486Z',stroh))}${mensch(360,585,'#a8704a','#3a6ab0',R(346,469,28,8,rot)+R(352,463,18,8,rot))}${mensch(450,575,'#e8b890',gelb,'')}
   ${huhn(600,540,weiss,1.3)}<g class="bhwk" style="transform-origin:596px 534px">${P('M596 534Q570 500 550 510Q564 530 596 534Z','#f4ead8','#5a3a20',2)}</g>
   <g class="bhsw" style="transform-origin:722px 524px">${L('M722 524Q700 500 706 484','#c8843a',8)}</g>${L('M736 546V574M752 548V574M780 546V574','#c8843a',9)}${E(760,530,40,20,'#c8843a','#6a3a10',2)}<g class="bhwk" style="transform-origin:790px 540px">${L('M790 540L812 512','#c8843a',9)}</g>${C(800,500,18,'#c8843a','#6a3a10',2)}${P('M786 488Q780 506 790 510L794 490Z','#8a5a20')}${E(816,506,9,6,'#e8b070')}${C(823,503,3,'#222')}${C(804,496,2.5,'#222')}
   ${kat(890,560,orange,1.2)}<g class="bhwk" style="transform-origin:912px 556px">${L('M912 556L930 530',orange,7)}</g>
   ${U('bhei',560,140,30,'#fff6c0')}${U('bhaehre',340,110,30,'#fff6c0')}${U('bhkuerbis',820,120,34,'#fff6c0')}`
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
   BAUERNHOF in 3D: gemeinsame Bausteine für alle fünf Räume und das Schlussbild.
   Je Raum eine Datei bauernhof-raum<n>.js, die sich in RAEUME3D.bauernhof[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.bauernhof = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Gewächshaus mit Tomaten','Im Gewächshaus liegt:','Glas-Haus','Im Glas-Haus liegt:'],['Schubkarre mit Erde','In der Schubkarre steckt:','Schubkarre','In der Schubkarre liegt:']],
  [['Eule auf dem Balken','Bei der Eule liegt:','Eule','Bei der Eule liegt:'],['Kornmühle','An der Kornmühle hängt:','Korn-Mühle','Bei der Mühle liegt:']],
  [['Hahn auf dem Holzklotz','Beim Hahn liegt:','Hahn','Beim Hahn liegt:'],['Sandbad mit Huhn','Im Sandbad steckt:','Sand-Kiste','In der Kiste liegt:']],
  [['Pflug','Am Pflug klemmt:','Pflug','Beim Pflug liegt:'],['Fahrrad mit Korb','Im Fahrradkorb liegt:','Fahrrad','Beim Fahrrad liegt:']],
  [['Milchkannen','Zwischen den Milchkannen steckt:','Milch-Kannen','Bei den Kannen liegt:'],['Brotregal','Im Brotregal liegt:','Brot-Regal','Im Regal liegt:']]
];
const SZB=SZENARIEN.bauernhof;
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZB.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZB.einfach) SZB.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const BH = (function(){
const ROT=0xc8362a, ROT2=0x922018, WEISS=0xfaf6ee, CREME=0xf4ead0, GELB=0xffd23a, ORANGE=0xee7c22, BLAU=0x3a74c0, GRUEN=0x3a9448,
  SCHWARZ=0x1a1410, GUMMI=0x2a2a2e, METALL=0xaab2ba, METALL2=0x626a74, EISEN=0x34363a, GOLD=0xe8b830, HOLZ=0xa8743e, HOLZ2=0x74502a, HOLZ3=0x4a3018, HELLHOLZ=0xd0a468,
  ERDE=0x8a5c38, ERDE2=0x64401f, STROH=0xe6c050, STROH2=0xc89c34, STEIN=0xa8a296, STEIN2=0x7e786c, LAUB=0x4f9038, LAUB2=0x6cae42, LAUB3=0x367030, RINDE=0x6e4a2a, GLAS=0xbfe6f4,
  HAUT=[0xf0c8a0,0xa8704a,0xe8b890,0x7a4a30];
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
    for(let i=0;i<120;i++){ g.fillStyle='rgba(60,50,40,.25)'; g.fillRect(zufall()*500,zufall()*500,2+zufall()*10,2); } });
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
  sc.background=new THREE.Color(opt.dunkel||0x14161c);
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xfff0d6,opt.grund||0x585660,opt.staerke||.76));
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
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(opt.dunkel||0x22242a)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);
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
let KUGEL_MITTEL=null;
/* Deko-Kugeln mit weniger Dreiecken, dann verschmelzen */
function sparsam(g){ const k=KUGEL_MITTEL||(KUGEL_MITTEL=new THREE.SphereGeometry(1,10,7)); g.traverse(m=>{ if(m.isMesh && m.geometry===GEO.sph) m.geometry=k; }); verschmelze(g); return g; }
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
/* viele Grashalme und Blümchen im Rechteck, frei(x,z) darf Stellen ausschließen */
function wiesenschmuck(par,x1,x2,z1,z2,nGras,nBlumen,frei){
  const G=[], B=[];
  for(let i=0;i<nGras;i++){ const x=x1+zufall()*(x2-x1), z=z1+zufall()*(z2-z1); if(frei&&!frei(x,z)) continue; G.push([x,.09,z,.04,.18+zufall()*.1,.04,[LAUB,LAUB2,LAUB3,0x8cba48][i%4],0,(zufall()-.5)*.5,(zufall()-.5)*.5]); }
  for(let i=0;i<(nBlumen||0);i++){ const x=x1+zufall()*(x2-x1), z=z1+zufall()*(z2-z1); if(frei&&!frei(x,z)) continue; B.push([x,.15,z,.065,.045,.065,[WEISS,GELB,0xf07a9a,0xb08ae0][i%4]]); G.push([x,.07,z,.015,.14,.015,LAUB3]); }
  if(G.length) viele(par,GEO.cone,G); if(B.length) viele(par,GEO.sph,B);
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
/* Außenraum (Garten, Hof): Licht, Himmel-Boden (Raster 280), Rückgabe der Szene. opt: bodenFarbe, punkte, himmelLicht, grund, staerke, sonne, sonneStaerke */
function freiluft(k,opt){
  opt=opt||{}; const sc=k.scene;
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xeaf6ff,opt.grund||0x5a6a40,opt.staerke||.76));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xfff0cc,opt.sonneStaerke===undefined?.5:opt.sonneStaerke); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  if(opt.boden!==false){ const t=kornBild(opt.bodenFarbe||'#6c9c42',opt.punkte||['rgba(176,214,96,.5)','rgba(50,90,28,.42)','rgba(130,90,50,.28)'],true); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(280/9,280/9);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(280,280),new THREE.MeshLambertMaterial({map:t})); m.rotation.x=-Math.PI/2; m.position.y=-.012; m.receiveShadow=true; sc.add(m); }
  return sc;
}

/* Ziegelwand. grund = [r,g,b] */
function ziegelBild(grund,fuge){
  const G=grund||[178,84,60];
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#d8ccb8'; g.fillRect(0,0,512,512);
    for(let r=0;r<16;r++){ for(let s=-1;s<8;s++){ const x=s*73.14+(r%2)*36.5, v=Math.floor(zufall()*30)-15, f='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')';
      const mal=xx=>{ g.fillStyle=f; g.fillRect(xx+2,r*32+2,69,28); };
      mal(x); if(x<0) mal(x+512); if(x+73>512) mal(x-512); } } });
}
/* Fliesen im Schachbrett. a, b = CSS-Farben */
function fliesenBild(a,b,fuge){
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#6a665e'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++) for(let s=0;s<8;s++){ g.fillStyle=(r+s)%2?(a||'#c8c0b0'):(b||'#b4ac9c'); g.fillRect(s*64+1,r*64+1,62,62); g.fillStyle='rgba(255,255,255,.1)'; g.fillRect(s*64+3,r*64+3,58,5); } });
}
/* glatter Putz / Beton mit leichten Flecken. grund = CSS-Farbe */
function putzBild(grund){
  return bild(512,512,(g)=>{ g.fillStyle=grund||'#e8dcc4'; g.fillRect(0,0,512,512);
    for(let i=0;i<900;i++){ g.fillStyle=i%2?'rgba(255,255,255,.14)':'rgba(90,70,40,.1)'; g.fillRect(zufall()*505,zufall()*505,2+zufall()*6,2+zufall()*5); } });
}
/* ---------- Dinge vom Bauernhof ---------- */
/* Mensch (Bäuerin, Bauer, Kind), steht bei y=0, Blick nach +z. o: { haut (0-3), hemd, hose (Latzhose), hut (Strohhut, Standard true), haar, gr (1.15; Kind .85), phase, winkt (true) }.
   Rückgabe { g, armL, armR, kopf }. userData.lebendig gesetzt, nicht fest. */
function mensch(k,par,x,z,dreh,o){
  o=o||{}; const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(o.gr||1.15); g.userData.lebendig=true;
  const H=HAUT[(o.haut||0)%4], HE=o.hemd===undefined?ROT:o.hemd, HO=o.hose===undefined?BLAU:o.hose, haar=o.haar===undefined?[0x7a4a1e,0x1c120c,0xd89a3a,0xa8401a][(o.haut||0)%4]:o.haar, r=gruppe(g,0,0,0);
  [-1,1].forEach(v=>{ walze(r,.11,.6,HO,v*.14,.36,0); ball(r,.13,HOLZ3,v*.14,.08,.06,1,.65,1.5); });
  rohr(r,.23,.3,.66,HE,0,.97,0,14); box(r,.36,.34,.06,HO,0,.86,.25); [-.13,.13].forEach(v=>{ strich(r,[v,1.0,.27],[v*1.3,1.3,.19],.03,HO); ball(r,.035,GOLD,v,1.0,.29); });
  const kopf=gruppe(g,0,1.62,0), k2=gruppe(kopf,0,0,0); ball(k2,.28,H,0,0,0); [-.1,.1].forEach(v=>ball(k2,.036,0x20140e,v,.02,.265));
  const mund=ring(k2,.08,.015,0x8a3a30,0,-.08,.26,Math.PI); mund.rotation.z=Math.PI; ball(k2,.285,haar,0,.08,-.07,1,.92,.95);
  if(o.hut!==false){ walze(k2,.46,.04,STROH,0,.2,0); rohr(k2,.2,.26,.2,STROH,0,.31,0,16); walze(k2,.265,.06,ROT2,0,.25,0); }
  verschmelze(k2);
  const arm=v=>{ const a=gruppe(g,v*.33,1.24,0); walze(a,.085,.52,HE,0,-.25,0); ball(a,.09,H,0,-.56,0); a.rotation.z=v*.18; verschmelze(a); return a; };
  const armL=arm(-1), armR=arm(1); verschmelze(r);
  if(k&&k.anim){ const p=o.phase||0; k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.7+p)*.3; if(o.winkt!==false) armR.rotation.z=2.4+Math.sin(t*5+p)*.35; }); }
  return { g, armL, armR, kopf };
}
/* Huhn, Füße bei y=0, Blick nach +x. o: { farbe, gr, hahn (bunter Schwanz, großer Kamm), phase, pickt (true) }. Rückgabe { g, kopf }. Zum Herumlaufen: laeufer(k,h.g,punkte,tempo,start,10) */
function huhn(k,par,x,y,z,dreh,o){
  o=o||{}; const hahn=!!o.hahn, F=o.farbe===undefined?(hahn?0xc8601e:WEISS):o.farbe, g=gruppe(par,x,y,z); g.rotation.y=dreh||0; g.scale.setScalar(o.gr||1); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0); ball(r,.3,F,0,.46,0,1.25,.95,.95); [-1,1].forEach(v=>{ ball(r,.18,F,-.04,.5,v*.24,1.35,.75,.45); strich(r,[.02,.24,v*.11],[.02,.03,v*.11],.028,ORANGE); [-.05,.02,.09].forEach(s=>strich(r,[.02,.03,v*.11],[.14,.02,v*.11+s],.018,ORANGE)); });
  if(hahn) [[0x1f6a4a,1.12,-.9],[0x24468a,1.06,-.82],[0x2a7a56,.98,-.96],[0x1c3a70,.9,-.86],[0x7a2a1a,.82,-.74],[0x1f6a4a,.9,-.7]].forEach(([c,h,ende],i)=>{ /* dichte Sichelfedern: viele überlappende flache Ovale entlang eines Bogens */
    const P=[[-.26,.52],[(-.26+ende)/2-.08,h+.22],[ende,h-.42]], zz=(i-2.5)*.055;
    for(let j=0;j<9;j++){ const u=j/8, a=1-u, x=a*a*P[0][0]+2*a*u*P[1][0]+u*u*P[2][0], y=a*a*P[0][1]+2*a*u*P[1][1]+u*u*P[2][1], dx=2*a*(P[1][0]-P[0][0])+2*u*(P[2][0]-P[1][0]), dy=2*a*(P[1][1]-P[0][1])+2*u*(P[2][1]-P[1][1]), br=.075*(1-u*.72);
      const f=ball(r,1,c,x,y,zz*(1+u*.8)); f.scale.set(.13*(1-u*.35),br,br*.6); f.rotation.z=Math.atan2(dy,dx); } });
  else { const s=kegel(r,.17,.34,F,-.36,.62,0); s.rotation.z=.85; }
  verschmelze(r);
  const kopf=gruppe(g,.28,.66,0), k2=gruppe(kopf,0,0,0); strich(k2,[0,-.04,0],[.1,.18,0],.11,F); ball(k2,.15,F,.12,.2,0); kegel(k2,.055,.16,GELB,.31,.19,0).rotation.z=-Math.PI/2;
  (hahn?[[.06,.37,.075],[.14,.39,.085],[.22,.35,.065]]:[[.08,.35,.05],[.15,.36,.055]]).forEach(([a,b,c])=>ball(k2,c,ROT,a,b,0,1,1,.5)); ball(k2,hahn?.065:.04,ROT,.24,.09,0,.8,1.3,.8);
  [-1,1].forEach(v=>ball(k2,.025,SCHWARZ,.2,.24,v*.115)); verschmelze(k2);
  if(k&&k.anim&&o.pickt!==false){ const p=o.phase||0; k.anim.push(t=>{ kopf.rotation.z=-Math.max(0,Math.sin(t*2.2+p))*.9*(Math.sin(t*.7+p)>-.3?1:0); }); }
  return { g, kopf };
}
/* Küken, Füße bei y=0, Blick nach +x */
function kueken(par,x,y,z,dreh,gr){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1); ball(g,.14,GELB,0,.17,0,1.2,1,1); ball(g,.1,GELB,.12,.32,0); kegel(g,.035,.09,ORANGE,.24,.31,0).rotation.z=-Math.PI/2;
  [-1,1].forEach(v=>{ ball(g,.018,SCHWARZ,.18,.35,v*.065); strich(g,[0,.07,v*.05],[.03,0,v*.05],.014,ORANGE); }); return g;
}
/* Strohballen (eckig), Unterkante bei y */
function ballen(par,x,y,z,dreh,br){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0; const b=br||1.8; box(g,b,.8,1.0,STROH,0,.4,0); [-.3,.3].forEach(a=>box(g,.07,.83,1.03,HOLZ2,a*b,.4,0));
  for(let i=0;i<14;i++){ const h=box(g,.34,.025,.025,i%2?STROH2:0xf6dc80,(zufall()-.5)*b*.85,.81+zufall()*.03,(zufall()-.5)*.9); h.rotation.y=zufall()*3; } return g;
}
/* roter Traktor, etwa 4,6 lang (Blick und Motorhaube nach +x), 2,6 breit, 3,1 hoch; Räder auf y=0. o: { farbe, ohneDach }.
   Rückgabe { g, raeder: [vier Rad-Gruppen, drehen mit raeder[i].rotation.z], sitz: Vector3 (lokaler Sitzpunkt für eine Figur) }. Hindernis setzt der Aufrufer. */
function traktor(par,x,z,dreh,o){
  o=o||{}; const C=o.farbe===undefined?ROT:o.farbe, g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.userData.lebendig=true; const r=gruppe(g,0,0,0);
  box(r,3.6,.4,1.1,EISEN,.1,.85,0); box(r,1.9,.85,1.1,C,1.15,1.45,0); box(r,1.96,.12,1.16,ROT2,1.15,1.92,0); box(r,.1,.7,.9,METALL2,2.13,1.42,0); [-.2,0,.2].forEach(h=>box(r,.05,.07,.8,METALL,2.2,1.42+h,0));
  [-.38,.38].forEach(v=>ball(r,.14,basis(0xfff6b0),2.14,1.72,v,.5,1,1));
  walze(r,.09,1.1,EISEN,1.5,2.4,.35); walze(r,.12,.1,EISEN,1.5,2.98,.35);
  box(r,1.5,.2,1.5,C,-.65,1.2,0); box(r,.55,.18,.6,SCHWARZ,-.85,1.52,0); box(r,.14,.55,.6,SCHWARZ,-1.12,1.8,0);
  strich(r,[.18,1.4,0],[-.1,2.0,0],.04,EISEN); const lr=ring(r,.27,.045,EISEN,-.12,2.03,0); lr.rotation.set(Math.PI/2,.45,0,'YXZ');
  [-1,1].forEach(v=>{ box(r,1.5,.14,.55,C,-.95,2.02,v*1.02); box(r,.14,.5,.55,C,-1.66,1.78,v*1.02); box(r,.14,.5,.55,C,-.24,1.78,v*1.02);
    if(!o.ohneDach){ strich(r,[-1.45,1.3,v*.68],[-1.45,3.0,v*.68],.055,EISEN); strich(r,[.15,1.3,v*.68],[.05,3.0,v*.68],.055,EISEN); } });
  if(!o.ohneDach){ box(r,2.0,.16,1.75,C,-.7,3.07,0); box(r,2.05,.06,1.8,CREME,-.7,3.17,0); }
  verschmelze(r);
  const raeder=[[-1.0,.98,1.02,.5],[1.55,.58,.82,.36]].reduce((l,[a,rr,seite,br])=>l.concat([-1,1].map(v=>{ const w=gruppe(g,a,rr,v*seite), s=gruppe(w,0,0,0);
    const reifen=walze(s,rr,br,GUMMI,0,0,0); reifen.rotation.x=Math.PI/2; const felge=walze(s,rr*.55,br+.03,GELB,0,0,0); felge.rotation.x=Math.PI/2; const n=walze(s,rr*.18,br+.08,EISEN,0,0,0); n.rotation.x=Math.PI/2;
    for(let i=0;i<6;i++){ const q=i*Math.PI/3; ball(s,rr*.07,EISEN,Math.cos(q)*rr*.36,Math.sin(q)*rr*.36,v*(br/2+.03)); }
    for(let i=0;i<14;i++){ const q=i*Math.PI/7, st=box(s,rr*.13,rr*.1,br*1.04,SCHWARZ,Math.cos(q)*rr,Math.sin(q)*rr,0); st.rotation.z=q+Math.PI/2; }
    verschmelze(s); return w; })),[]);
  return { g, raeder, sitz:V(-.85,.95,0) };
}
return { ROT, ROT2, WEISS, CREME, GELB, ORANGE, BLAU, GRUEN, SCHWARZ, GUMMI, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, ERDE, ERDE2, STROH, STROH2, STEIN, STEIN2, LAUB, LAUB2, LAUB3, RINDE, GLAS, HAUT,
  dielenBild, bretterBild, pflasterBild, kornBild, ziegelBild, fliesenBild, putzBild, tafel, mauer, huelle, zahlenschloss, viele, sparsam, laubbaum, busch, wiesenschmuck, vogel, freiluft, mensch, huhn, kueken, ballen, traktor };
})();

/* Raum 1: Der Gemüsegarten an einem sonnigen Tag. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das Gartentor zum Hof hinten rechts. Beide Flügel schwingen auf, dahinter liegt der Hof mit der Scheune. */
RAEUME3D.bauernhof[0] = (function(){
const B=36, T=27;
const EX=10;                 /* Mitte des Gartentors */
const ZZ=-13.3;              /* Zaun hinten */
const HIMMEL=0xbfe4fa;
const LATTE=0xf4ead8, LATTE2=0xd8c8a8, TOMATE=0xdc3222, KUERBIS=0xee7c18, KUERBIS2=0xd4600c, MOEHRE=0xf27a14;
const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });
/* Gruppen mit vielen Kugeln: sparsamere Form */
function leicht(g){ const k=new THREE.SphereGeometry(1,10,7); g.traverse(m=>{ if(m.isMesh && m.geometry===GEO.sph) m.geometry=k; }); }

/* ---------- Licht, Wiese, Gartenwege ---------- */
function grund(k){
  const sc=BH.freiluft(k,{ himmelLicht:0xf0f8ff, grund:0x6a7a44, staerke:.78, sonne:0xfff0c4, sonneStaerke:.54 });
  const w=bild(1024,768,g=>{
    const X=x=>(x+B/2)/B*1024, Z=z=>(z+T/2)/T*768;
    g.lineCap='round'; g.lineJoin='round';
    const spur=(P,b,f)=>{ g.strokeStyle=f; g.lineWidth=b; g.beginPath(); g.moveTo(X(P[0][0]),Z(P[0][1])); for(let i=1;i<P.length-1;i++) g.quadraticCurveTo(X(P[i][0]),Z(P[i][1]),X((P[i][0]+P[i+1][0])/2),Z((P[i][1]+P[i+1][1])/2)); const e=P[P.length-1]; g.lineTo(X(e[0]),Z(e[1])); g.stroke(); };
    [[[EX,-13.5],[EX,-11],[9,-7],[7,-3],[6.2,1],[6.4,5],[5.2,9],[5.4,13.5]],[[-15,-10.6],[-8,-10.9],[0,-10.4],[6,-10.6],[9.6,-9.6]],[[6.2,3],[1,4.4],[-5,2.6],[-9,3.2],[-12.6,3]]].forEach((P,i)=>{ spur(P,i?54:78,'rgba(196,160,106,.45)'); spur(P,i?36:54,'rgba(212,180,124,.8)'); spur(P,i?16:24,'rgba(226,200,148,.55)'); });
    for(let i=0;i<380;i++){ g.fillStyle=['rgba(60,104,30,.3)','rgba(186,220,100,.3)','rgba(150,112,70,.35)'][i%3]; g.beginPath(); g.ellipse(zufall()*1020,zufall()*764,3+(i%4),2+(i%3),i,0,7); g.fill(); }
    g.globalCompositeOperation='destination-out'; const aus=g.createLinearGradient(0,Z(9),0,Z(13.4)); aus.addColorStop(0,'rgba(0,0,0,0)'); aus.addColorStop(1,'rgba(0,0,0,1)'); g.fillStyle=aus; g.fillRect(0,Z(9),1024,768-Z(9)); g.globalCompositeOperation='source-over';
  });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(B,T),new THREE.MeshLambertMaterial({map:w,transparent:true,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.y=.006; m.receiveShadow=true; sc.add(m);
}

/* ---------- Zaun, Bretterwände, Sonnenblumen ---------- */
/* Lattenzaun von a nach b (nur x oder z ändert sich), Latten mit runden Köpfen */
function zaunStueck(g,x1,z1,x2,z2){
  const l=Math.hypot(x2-x1,z2-z1), n=Math.max(1,Math.round(l/.55)), quer=Math.abs(x2-x1)>Math.abs(z2-z1);
  for(let i=0;i<=n;i++){ const x=x1+(x2-x1)*i/n, z=z1+(z2-z1)*i/n;
    box(g,quer?.28:.08,1.2,quer?.08:.28,i%2?LATTE:0xfaf4e6,x,.62,z); const kopf=walze(g,.14,.08,i%2?LATTE:0xfaf4e6,x,1.22,z); if(quer) kopf.rotation.x=Math.PI/2; else kopf.rotation.z=Math.PI/2; }
  [.42,.95].forEach(y=>box(g,quer?l:.07,.13,quer?.07:l,LATTE2,(x1+x2)/2-(quer?0:Math.sign(x1)*.07),y,(z1+z2)/2-(quer?.07:0)));
}
function zaun(k){
  const g=gruppe(k.scene,0,0,0);
  /* hinten mit Lücken für die drei Bretterwände */
  [[-17.7,-14.85],[-10.35,-8.65],[-4.15,-2.35],[2.35,EX-2.4]].forEach(([a,b])=>zaunStueck(g,a,ZZ,b,ZZ)); zaunStueck(g,EX+2.4,ZZ,17.7,ZZ);
  zaunStueck(g,-17.75,ZZ+.4,-17.75,13.3); zaunStueck(g,17.75,ZZ+.4,17.75,13.3);
  verschmelze(g);
  k.kasten((-18+EX-2.2)/2,-13.4,EX-2.2+18,.45); k.kasten((EX+2.2+18)/2,-13.4,18-EX-2.2,.45);
  k.kasten(-17.8,0,.4,27); k.kasten(17.8,0,.4,27);
}
/* Bretterwände mit kleinem Dach für den Beetplan, den Regenmesser und die Wachstumstafel (liegende Bretter, damit sie nicht wie Türen wirken) */
const WAENDE=[-12.6,-6.4,0];
function bretterwaende(k){
  const w=k.wand('hinten'), g=gruppe(w,0,0,0);
  WAENDE.forEach((x,n)=>{
    for(let i=0;i<8;i++) box(g,4.1,.4,.14,[0xb8844c,0xc49058,0xac7842][(i+n)%3],x,.24+i*.42,-13.42);
    [-2.1,2.1].forEach(v=>{ box(g,.22,4,.24,BH.HOLZ2,x+v,2,-13.38); ball(g,.17,BH.HOLZ3,x+v,4.08,-13.38); });
    const d=box(g,4.7,.12,.7,n===1?0x3f7a4a:0xb0402c,x,3.98,-13.3); d.rotation.x=.3;
    k.kasten(x,-13.35,4.5,.45);
  });
  leicht(g); verschmelze(g);
}
function sonnenblumen(k){
  const g=gruppe(k.scene,0,0,0);
  [[-16.4,2.5],[-15.4,2],[-10,2.3],[-9.2,2.9],[-4,1.9],[3,2.1],[3.9,2.6],[6.8,2.4],[7.4,1.8],[13.3,2.6],[14.4,2.1],[15.8,2.7]].forEach(([x,h],i)=>{
    const z=-13.75-(i%2)*.35;
    strich(g,[x,0,z],[x,h,z],.05,BH.LAUB3); [-1,1].forEach(s=>ball(g,.24,BH.LAUB2,x+s*.24,h*(.45+s*.12),z,1.2,.35,.8));
    for(let j=0;j<10;j++){ const a=j*.628; const p=ball(g,.14,BH.GELB,x+Math.cos(a)*.3,h+Math.sin(a)*.3,z+.05,1.35,.65,.3); p.rotation.z=a; }
    ball(g,.22,0x6a3c14,x,h,z+.1,1,1,.45);
  });
  leicht(g); ohneSchatten(g); verschmelze(g);
}

/* ---------- Häuser ---------- */
/* Dreieck für Giebel, Grundlinie unten, Blick nach +z */
function giebel(g,w,h,farbe,x,y,z){
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute([-w/2,0,0, w/2,0,0, 0,h,0],3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute([0,0,1, 0,0,1, 0,0,1],3));
  const m=new THREE.Mesh(geo,mat(farbe,{side:THREE.DoubleSide})); m.position.set(x,y,z); g.add(m); return m;
}
function fenster(g,x,y,z,w,h){
  box(g,w+.2,h+.2,.08,BH.WEISS,x,y,z); box(g,w,h,.04,0x8ccbee,x,y,z+.05); box(g,.07,h,.04,BH.WEISS,x,y,z+.08); box(g,w,.07,.04,BH.WEISS,x,y,z+.08);
}
function bauernhaus(k){
  const sc=k.scene, g=gruppe(sc,2.9,0,-19.4), W=7, H=2.7, D=3.6;
  box(g,W,H,D,0xd2764c,0,H/2,0); box(g,W+.1,.4,D+.1,BH.STEIN2,0,.2,0);
  /* Dach mit First von links nach rechts */
  const hd=1.7, l=Math.hypot(D/2+.35,hd), a=Math.atan2(hd,D/2+.35);
  [-1,1].forEach(s=>{ const d=box(g,W+.6,.16,l,0x8a3024,0,H+hd/2,s*(D/2+.35)/2); d.rotation.x=s*a;
    for(let i=1;i<5;i++){ const u=i/5, r=box(g,W+.62,.05,.07,0x6a2018,0,H+hd*(1-u)+.1,s*(D/2+.35)*u); r.rotation.x=s*a; } });
  box(g,W+.65,.14,.2,0x5a1c12,0,H+hd+.04,0);
  [-1,1].forEach(s=>{ const d=giebel(g,D,hd,0xd2764c,s*W/2,H,0); d.rotation.y=Math.PI/2; });
  box(g,.55,1.3,.55,0x9a4a34,2,H+1.5,-.4); box(g,.7,.14,.7,0x5a2a1a,2,H+2.2,-.4);
  const z=D/2+.02;
  box(g,1.1,1.8,.08,BH.WEISS,-.3,.9,z); box(g,.9,1.65,.08,0x8a4a24,-.3,.83,z+.04); ball(g,.07,BH.GOLD,0,.85,z+.12);
  [-2.5,1.6,2.8].forEach(x=>{ fenster(g,x,1.45,z,.75,.85); box(g,1.05,.2,.25,0x6a3a1c,x,.88,z+.12); [-.32,0,.32].forEach((v,i)=>ball(g,.12,[0xe84a7a,BH.GELB,BH.ROT][i],x+v,1.05,z+.15)); });
  [-1.4,.8].forEach(x=>{ const gx=gruppe(g,x,H+.75,1.25); box(gx,.75,.65,.5,0xd2764c,0,0,0); fenster(gx,0,0,.27,.45,.38); const d=box(gx,.95,.12,.75,0x6a2018,0,.42,.05); d.rotation.x=.2; });
  leicht(g); verschmelze(g);
  /* Rauch aus dem Schornstein */
  const m=basis(0xf4f6f8,{transparent:true,opacity:.75,depthWrite:false});
  for(let i=0;i<4;i++){ const r=ball(sc,.25,m,4.9,5,-19.8); r.castShadow=false; k.anim.push(t=>{ const u=(t*.22+i/4)%1; r.position.set(4.9+u*1.3,5+u*1.8,-19.8); r.scale.setScalar(.18+u*.35); }); }
}
/* Der Hof hinter dem Gartentor: Weg, Scheune, Strohballen, Hühner */
function hof(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  box(g,3,.03,4.6,0xd2b47e,EX,.012,-15.6); box(g,13,.026,9.4,0xcbb084,EX+.8,.009,-22.2);
  for(let i=0;i<40;i++) ball(g,.12+zufall()*.1,i%2?BH.STEIN:0xb8a888,EX-5+zufall()*11.5,.02,-25+zufall()*7,1.2,.25,1);
  const s=gruppe(sc,EX+2.4,0,-23.4), W=6.2, H=2.8, hd=1.9;
  box(s,W,H,3.6,0xbc3426,0,H/2,0); giebel(s,W,hd,0xbc3426,0,H,1.8); giebel(s,W,hd,0x8a241a,0,H,-1.8);
  const l=Math.hypot(W/2+.35,hd), a=Math.atan2(hd,W/2+.35);
  [-1,1].forEach(v=>{ const d=box(s,l,.16,4.1,0x5a3a30,v*(W/2+.35)/2,H+hd/2,0); d.rotation.z=-v*a; const r=box(s,l,.14,.14,BH.WEISS,v*(W/2+.35)/2,H+hd/2-.05,2.05); r.rotation.z=-v*a; });
  [-1,1].forEach(v=>box(s,.18,H,.1,BH.WEISS,v*(W/2-.05),H/2,1.82));
  box(s,2.9,2.3,.06,BH.WEISS,0,1.15,1.82); [-.7,.7].forEach(x=>{ box(s,1.25,2.05,.06,0x9a2a1e,x,1.1,1.86); [-1,1].forEach(v=>{ const q=box(s,.12,2.3,.04,BH.WEISS,x,1.1,1.9); q.rotation.z=v*.55; }); });
  walze(s,.55,.08,BH.WEISS,0,H+.75,1.84).rotation.x=Math.PI/2; walze(s,.42,.1,BH.STROH,0,H+.75,1.86).rotation.x=Math.PI/2;
  leicht(s); verschmelze(s);
  BH.ballen(g,EX+6.6,0,-20.4,.35,1.5); BH.ballen(g,EX+6.4,.8,-20.5,.2,1.2); BH.ballen(g,EX-4.6,0,-24.6,-.2,1.6);
  leicht(g); verschmelze(g);
  BH.huhn(k,sc,EX-2.6,0,-18.2,.4,{ phase:1 }); BH.huhn(k,sc,EX+3.6,0,-17.2,2.6,{ farbe:0xc86a2a, phase:3 }); BH.kueken(sc,EX-1.9,0,-17.7,.8,.9);
}
/* Die Bäuerin winkt hinter dem Zaun */
function baeuerin(k){ BH.mensch(k,k.scene,5.3,-15.2,.15,{ hut:false, haut:2, hemd:0xd84a6a, hose:0x3a6a9a, gr:1.15, phase:1 }); }

/* ---------- Apfelbäume ---------- */
function apfelbaum(par,x,z,h){
  const g=gruppe(par,x,0,z); BH.laubbaum(g,0,0,h);
  const a=gruppe(g,0,0,0);
  for(let i=0;i<22;i++){ const w=i*2.4, y=.58+((i*7)%11)/11*.3, r=h*(.27-Math.abs(y-.74)*.35); ball(a,.13,i%4?TOMATE:0xe8b020,Math.cos(w)*r*1.15,h*y,Math.sin(w)*r+h*.03); }
  BH.sparsam(a); return g;
}
function obstbaeume(k){
  [[-16.4,-10.8,4.2],[15.9,-10.4,4.4],[-16.2,10.4,3.8],[16,10.2,4],[16.1,-2.8,4.1],[-16.4,-6,3.6]].forEach(([x,z,h])=>{
    const g=apfelbaum(k.scene,x,z,h); verschmelze(g); k.verdecker(g,x,z,h*.28); k.kreis(x,z,.55); });
}

/* ---------- Landschaft rings um den Garten ---------- */
function landschaft(k){
  const sc=k.scene, f=gruppe(sc,0,0,0);
  /* Felder: [x, z, Breite, Tiefe, Bodenfarbe, Pflanzenfarbe, Höhe] */
  const felder=[[-24,-26,20,10,0xd8b84a,0xf0d060,.55],[-6,-31,13,12,0x8a5a34,0x6aa838,.25],[23,-31,16,12,0xd8c030,0xf8e038,.45],[8,-37,12,12,0xc89c34,0xe6c050,.5],[-26,-42,24,16,0x6a9a3a,0x8cc048,.3],[-2,-49,26,14,0xe0c050,0xf4d868,.5],[30,-49,24,14,0x8a5a34,0x7ab040,.25],
    [-30,-2,15,20,0xd8b84a,0xf0d060,.5],[31,-4,16,22,0x8a5a34,0x6aa838,.28]];
  const halme=[];
  felder.forEach(([x,z,w,t,boden,pf,h],n)=>{
    box(f,w,.03,t,boden,x,.006+n*.0008,z);
    for(let r=-t/2+.5;r<t/2;r+=1) for(let s=-w/2+.4;s<w/2;s+=.75) halme.push([x+s+(zufall()-.5)*.25,h/2,z+r,.16,h*(.8+zufall()*.4),.16,pf,zufall()*6]);
  });
  verschmelze(f);
  BH.viele(sc,new THREE.ConeGeometry(1,1,5),halme);
  /* Bäume und Hecken in der Ferne */
  const stamm=[], krone=[];
  const baum=(x,z,h,i)=>{ const c=[BH.LAUB,BH.LAUB2,BH.LAUB3,0x7ab048][i%4]; stamm.push([x,h*.25,z,h*.06,h*.5,h*.06,BH.RINDE]); krone.push([x,h*.68,z,h*.3,h*.28,h*.3,c],[x-h*.17,h*.55,z+.1,h*.2,h*.18,h*.2,c],[x+h*.18,h*.57,z,h*.21,h*.19,h*.2,c]); };
  for(let i=0;i<34;i++) baum(-62+i*3.8+zufall()*2,-58-zufall()*9,3+zufall()*3,i);
  [[-16,-19,4.2],[-11,-21,3.4],[-6.4,-23,3.8],[-2.6,-25,3],[19,-18,4],[23,-21,3.4],[-21,-17,3.6],[28,-17,4.4],[-34,-24,4],[38,-28,4.2]].forEach(([x,z,h],i)=>baum(x,z,h,i+1));
  for(let i=0;i<46;i++){ const s=i%2?1:-1, z=-16+(i>>1)*2.2; baum(s*(21+zufall()*2),z,2.6+zufall()*2,i); baum(s*(40+zufall()*14),z-6+zufall()*5,3+zufall()*3,i+2); }
  BH.viele(sc,new THREE.CylinderGeometry(1,1.2,1,7),stamm); BH.viele(sc,GEO.sph,krone);
  const busch=[];
  for(let i=0;i<150;i++){ const s=i%3; let x,z; if(s===0){ x=-30+zufall()*60; z=-14.9-zufall()*2.2; if(Math.abs(x-EX)<5.6 || (x>-1.4 && x<7.2) || Math.abs(x+3.3)<1.2) continue; } else { x=(s===1?-1:1)*(18.7+zufall()*1.6); z=-14+zufall()*28; }
    const r=.35+zufall()*.4; busch.push([x,r*.45,z,r,r*.75,r,[0x4a8a34,0x5e9e3a,0x3c742c,0x80b248][i%4]]); if(i%4===0) busch.push([x,r*1.12,z+r*.35,.11,.09,.11,[BH.WEISS,BH.GELB,0xf07a9a][i%3]]); }
  BH.viele(sc,GEO.sph,busch);
  BH.wiesenschmuck(sc,-30,30,14,30,620,170);
  BH.wiesenschmuck(sc,-20,-18.2,-13,14,90,20); BH.wiesenschmuck(sc,18.2,20,-13,14,90,20);
  /* Hügel */
  const berge=gruppe(sc,0,0,0);
  [[-55,-76,30,8,0x8cbc60],[-14,-86,34,10,0xa4cc80],[30,-80,30,7,0x96c470],[70,-52,26,8,0x8cbc60],[-74,-24,24,7,0x96c470],[74,6,22,6,0xa4cc80],[-74,24,22,6,0x8cbc60]].forEach(([x,z,r,h,c])=>ball(berge,1,c,x,-.5,z,r,h,r*.5));
  ohneSchatten(berge); verschmelze(berge);
  /* Wolken ziehen langsam */
  [[-24,5.4,-34,1],[-4,7,-40,1.3],[17,5.8,-32,.9],[30,7.6,-44,1.2]].forEach(([x,y,z,s],i)=>{
    const w=gruppe(sc,x,y,z), m=basis(0xffffff);
    [[0,0,0,1.1],[-1.1,-.2,.1,.75],[1.15,-.18,0,.8],[.35,.4,-.2,.7]].forEach(([a,b,c,r])=>ball(w,r*s,m,a*s,b*s,c,1.3,.6,.8)); ohneSchatten(w); leicht(w); verschmelze(w);
    k.anim.push(t=>{ w.position.x=x+Math.sin(t*.05+i*1.7)*6; }); });
}

/* ---------- Ausgang: Gartentor zum Hof ---------- */
function gartentor(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ box(g,.46,3.3,.46,BH.HOLZ,EX+s*2.1,1.65,ZZ); box(g,.62,.14,.62,BH.HOLZ3,EX+s*2.1,3.34,ZZ); ball(g,.2,BH.HOLZ2,EX+s*2.1,3.56,ZZ); box(g,.6,.3,.6,BH.STEIN2,EX+s*2.1,.15,ZZ); });
  /* Rosenbogen */
  let alt=null;
  for(let i=0;i<=16;i++){ const a=Math.PI*i/16, p=[EX-Math.cos(a)*2.1,3.2+Math.sin(a)*1.15,ZZ];
    if(alt){ [-.18,.18].forEach(v=>strich(g,[alt[0],alt[1],ZZ+v],[p[0],p[1],ZZ+v],.065,BH.HOLZ2)); }
    ball(g,.27,i%2?BH.LAUB:BH.LAUB3,p[0],p[1]+.04,ZZ,1.15,.9,1); ball(g,.16,BH.LAUB2,p[0]+.12,p[1]+.16,ZZ+.14);
    if(i%2===0){ const c=i%4?0xf06a9a:BH.ROT; ball(g,.15,c,p[0],p[1]+.02,ZZ+.31,1,1,.6); ball(g,.07,0xf8b0c0,p[0],p[1]+.02,ZZ+.4,1,1,.5); }
    alt=p; }
  [-1,1].forEach(s=>{ for(let i=0;i<5;i++){ const y=.6+i*.55, x=EX+s*(2.1+(i%2?.2:-.04)); ball(g,.2,i%2?BH.LAUB:BH.LAUB3,x,y,ZZ+.24,1,1,.55); if(i%2) ball(g,.11,0xf06a9a,x+s*.08,y+.12,ZZ+.37); } });
  leicht(g); verschmelze(g);
  /* zwei Flügel, außen angeschlagen */
  const fluegel=[-1,1].map(s=>{
    const f=gruppe(sc,EX+s*1.84,0,ZZ+.04), r=-s;
    for(let i=0;i<6;i++){ const x=r*(.18+i*.3), h=1.95+Math.sin((i+.5)/6*Math.PI/2)*.45; box(f,.23,h-.15,.09,0x3a8a4a,x,h/2+.07,0); walze(f,.115,.09,0x3a8a4a,x,h,0).rotation.x=Math.PI/2; }
    [.5,1.6].forEach(y=>box(f,1.82,.18,.08,0x2a6a38,r*.92,y,.09));
    strich(f,[r*.12,.55,.1],[r*1.7,1.55,.1],.06,0x2a6a38);
    [.5,1.6].forEach(y=>box(f,.5,.09,.04,BH.EISEN,r*.22,y,.15));
    verschmelze(f); return f; });
  /* großes Zahlenschloss am rechten Flügel */
  const s=gruppe(fluegel[1],-1.42,1.32,.2); box(s,1.35,1.3,.08,BH.EISEN,0,.1,-.02); const schloss=BH.zahlenschloss(s,0,0,.14); schloss.scale.setScalar(1.3); verschmelze(schloss);
  const tuer=ausgang(k,{ steh:[EX-1.5,-11.4], durch:[EX,-17.4], treffer:{x:EX,y:1.8,z:ZZ+.35,b:4.4,h:3.6,t:.9}, name:'Gartentor', einfach:'Garten-Tor', schildOben:[EX,5,-12.8], glanz:[EX+.42,1.45,ZZ+.9],
    blick:{ pitch:.45, zoom:.9 }, losNach:1.2, warte:.3,
    bewege:auf=>{ fluegel[0].rotation.y=auf*1.3; fluegel[1].rotation.y=-auf*1.3; } });
  k.kasten(EX,-13.25,4,.5);
  [-1,1].forEach(v=>k.kreis(EX+v*2.1,ZZ+.05,.42));
  return tuer;
}

/* ---------- Deko-Beete und Ausstattung im Garten ---------- */
/* Beetrahmen mit dunkler Erde */
function beet(g,x,z,w,t,rand){
  box(g,w,.12,t,BH.ERDE2,x,.06,z);
  [-1,1].forEach(s=>{ box(g,w+.2,.22,.12,rand||BH.HOLZ2,x,.11,z+s*(t/2+.04)); box(g,.12,.22,t,rand||BH.HOLZ2,x+s*(w/2+.04),.11,z); });
}
function dekoBeete(k){
  const sc=k.scene, g=gruppe(sc,0,0,0), nadel=[], kugeln=[];
  const fest=(x,z,w,t)=>k.kasten(x,z,w+.3,t+.3);
  /* Möhren: drei Erddämme, federiges Grün, orange Köpfe */
  beet(g,7,-7.6,3,2.2); fest(7,-7.6,3,2.2);
  [-.7,0,.7].forEach(dz=>{ box(g,2.8,.12,.4,BH.ERDE,7,.14,-7.6+dz);
    for(let i=0;i<6;i++){ const x=5.8+i*.48, z=-7.6+dz; kugeln.push([x,.23,z,.11,.12,.11,MOEHRE]); for(let j=0;j<6;j++){ const a=j*1.05+i, h=.4+zufall()*.18; nadel.push([x+Math.cos(a)*.1,.27+h/2,z+Math.sin(a)*.1,.035,h,.035,j%2?0x4aa832:0x6cc040,0,Math.sin(a)*.45,-Math.cos(a)*.45]); } } });
  /* Erdbeeren */
  beet(g,-3.4,-8.5,3,1.6); fest(-3.4,-8.5,3,1.6);
  for(let i=0;i<14;i++){ const x=-4.6+(i%7)*.4, z=-8.95+Math.floor(i/7)*.8+(i%2)*.1; for(let j=0;j<4;j++){ const a=j*1.57+i; kugeln.push([x+Math.cos(a)*.14,.22,z+Math.sin(a)*.14,.15,.05,.11,0x3a8a34,-a]); } kugeln.push([x+.16,.2,z+.2,.065,.085,.065,TOMATE],[x-.18,.18,z+.12,.055,.07,.055,TOMATE],[x,.29,z,.06,.03,.06,BH.WEISS]); }
  /* Lauch */
  beet(g,14,-6.6,2.4,2); fest(14,-6.6,2.4,2);
  for(let i=0;i<15;i++){ const x=13.1+(i%5)*.45, z=-7.25+Math.floor(i/5)*.65; walze(g,.07,.36,0xeef4d8,x,.3,z); for(let j=0;j<4;j++){ const s=j%2?1:-1; nadel.push([x+s*(.07+j*.04),.7,z+(j>1?.05:-.05),.045,.6,.025,j%2?0x4a8a6a:0x5a9a70,0,0,-s*(.18+j*.12)]); } }
  /* Zwiebeln */
  beet(g,-11.4,8.4,3,1.8); fest(-11.4,8.4,3,1.8);
  for(let i=0;i<14;i++){ const x=-12.6+(i%7)*.4, z=7.95+Math.floor(i/7)*.85; kugeln.push([x,.22,z,.15,.14,.15,i%3?0xd89a3a:0x9a3a6a]); [-1,0,1].forEach(v=>nadel.push([x+v*.07,.55,z,.028,.52,.028,0x5a9a3a,0,0,-v*.3])); }
  /* Erbsen am Rankgitter, oben runde Querstange */
  beet(g,-9.4,-7.6,2.8,.8); fest(-9.4,-7.6,2.8,.9);
  [-1.25,0,1.25].forEach(x=>walze(g,.06,1.75,BH.HOLZ,-9.4+x,.95,-7.6));
  [.6,1.15,1.78].forEach(y=>strich(g,[-10.75,y,-7.6],[-8.05,y,-7.6],.045,BH.HELLHOLZ));
  [-10.65,-8.15].forEach(x=>ball(g,.09,BH.HELLHOLZ,x,1.84,-7.6));
  for(let i=0;i<70;i++){ const x=-10.6+zufall()*2.4, y=.25+zufall()*1.4; kugeln.push([x,y,-7.55+zufall()*.14,.14,.1,.08,i%3?0x4a9a3a:0x6ab848,zufall()*3]); if(i%7===0) kugeln.push([x+.08,y-.08,-7.42,.04,.18,.04,0x9ad048,0]); if(i%11===0) kugeln.push([x,y+.1,-7.42,.07,.06,.05,BH.WEISS]); }
  /* Kräuterbeet vorn rechts */
  beet(g,14.4,11.2,2.2,1.4,BH.HOLZ); fest(14.4,11.2,2.2,1.4);
  for(let i=0;i<8;i++){ const x=13.65+(i%4)*.5, z=10.85+Math.floor(i/4)*.7; kugeln.push([x,.28,z,.2,.18,.2,[0x6a9a6a,0x3a8a34,0x8ab870,0x4a7a4a][i%4]]); if(i%3===0) for(let j=0;j<5;j++) kugeln.push([x+Math.cos(j*1.26)*.12,.46,z+Math.sin(j*1.26)*.12,.045,.08,.045,0x9a6ac8]); }
  leicht(g); verschmelze(g);
  BH.viele(sc,new THREE.ConeGeometry(1,1,5),nadel); BH.viele(sc,GEO.sph,kugeln);
}
function ausstattung(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  /* Bienenkästen rechts */
  [[16.6,1.2,0x5a9ad8],[16.6,2.9,BH.GELB]].forEach(([x,z,c])=>{ [-.35,.35].forEach(v=>box(g,.8,.3,.14,BH.HOLZ3,x,.15,z+v)); [0,1].forEach(i=>{ box(g,.95,.46,1.05,i?c:BH.WEISS,x,.55+i*.5,z); box(g,.99,.05,1.09,BH.HOLZ2,x,.8+i*.5,z); }); box(g,1.15,.14,1.25,BH.HOLZ2,x,1.37,z); box(g,.04,.07,.45,0x2a1a08,x-.49,.4,z); k.kasten(x,z,1.2,1.3); });
  /* Kompostkiste aus Latten links */
  { const x=-16.4, z=6.2; [-1,1].forEach(s=>{ for(let i=0;i<4;i++){ box(g,1.7,.18,.1,BH.HOLZ,x,.15+i*.27,z+s*.8); box(g,.1,.18,1.6,BH.HOLZ2,x+s*.8,.15+i*.27,z); } [-1,1].forEach(v=>box(g,.18,1.15,.18,BH.HOLZ3,x+s*.8,.57,z+v*.8)); });
    ball(g,.75,0x5a4a24,x,.55,z,1,.55,1); for(let i=0;i<26;i++) ball(g,.12,[0x7a9a3a,0xb8a040,0x8a6a30,0x5a7a2a][i%4],x+(zufall()-.5)*1.2,.9+zufall()*.12,z+(zufall()-.5)*1.2,1.2,.35,.8); k.kasten(x,z,1.8,1.8); }
  /* Gartenbank rechts vorn */
  { const b=gruppe(g,16.5,0,6.4); [-1,1].forEach(v=>{ box(b,.7,.55,.14,BH.HOLZ3,0,.28,v*.9); box(b,.14,.9,.14,BH.HOLZ3,.34,1,v*.9); box(b,.75,.1,.14,BH.HOLZ2,0,.9,v*.98); });
    [-.22,.03,.28].forEach(x=>box(b,.22,.1,2.1,0x4a8ac0,x,.6,0)); [1.05,1.32].forEach(y=>box(b,.1,.2,2.1,0x4a8ac0,.38,y,0)); k.kasten(16.5,6.4,1.1,2.2); }
  /* Tontöpfe mit Blumen */
  [[-16.7,2.4],[-16.8,-2.6],[16.7,-6.4],[3.2,-12.1],[-16.7,12],[-9.5,-12.2]].forEach(([x,z],i)=>{ [[0,0,1],[.5,.3,.72]].forEach(([a,b,s],j)=>{ rohr(g,.3*s,.2*s,.46*s,0xc8643a,x+a,.23*s,z+b,12); ring(g,.3*s,.04*s,0xa84a24,x+a,.45*s,z+b).rotation.x=Math.PI/2; ball(g,.25*s,BH.LAUB,x+a,.55*s,z+b,1,.7,1); for(let q=0;q<5;q++) ball(g,.09*s,[0xf06a9a,BH.GELB,BH.ROT,0xb08ae0,BH.WEISS][(i+j)%5],x+a+Math.cos(q*1.26)*.18*s,.68*s+(q%2)*.06,z+b+Math.sin(q*1.26)*.18*s); }); k.kreis(x+.2,z+.12,.55); });
  /* Regentonne, Blumenrabatte und niedriger Zaun vorn */
  walze(g,.62,1.2,0x7a4a24,-15.4,.6,10.2); [.2,.65,1.1].forEach(y=>ring(g,.63,.04,BH.EISEN,-15.4,y,10.2).rotation.x=Math.PI/2); walze(g,.54,.04,0x2a5a78,-15.4,1.22,10.2); k.kreis(-15.4,10.2,.68);
  box(g,2.8,.14,.8,BH.ERDE2,2.6,.07,11.2); for(let i=0;i<22;i++){ const x=1.4+(i%11)*.24, z=11.0+Math.floor(i/11)*.42; walze(g,.02,.3,BH.LAUB3,x,.28,z); ball(g,.12,[0xf06a9a,BH.GELB,BH.ROT,0xb08ae0,BH.WEISS][i%5],x,.46+(i%3)*.05,z,1,.75,1); ball(g,.1,BH.LAUB,x+.08,.2,z,1.2,.5,1); } k.kasten(2.6,11.2,3,.9);
  [[-17.6,3.4],[7.6,17.4]].forEach(([a,b])=>{ for(let x=a;x<=b+.01;x+=.7) box(g,.14,.75,.1,BH.WEISS,x,.38,13.25); [.28,.56].forEach(y=>box(g,b-a,.09,.07,BH.WEISS,(a+b)/2,y,13.22)); k.kasten((a+b)/2,13.25,b-a+.2,.3); });
  /* kleine Büsche an den Rändern */
  [[-17,-12.4,.6],[17,-12.6,.55],[17,-7.8,.5],[-17,.2,.5],[17,12.4,.5],[-14,12.6,.45],[10.8,12.7,.4],[-17,8.8,.45],[13.2,-12.4,.5]].forEach(([x,z,r])=>{ BH.busch(g,x,z,r); k.kreis(x,z,r*1.2); });
  leicht(g); verschmelze(g);
  /* Gras und Blumen */
  const BEREICHE=[[7,-7.6,2.2,1.7],[-3.4,-8.5,2.2,1.4],[14,-6.6,1.8,1.6],[-11.4,8.4,2.1,1.5],[-9.4,-7.6,2,1],[14.4,11.2,1.7,1.3]];
  const frei=(x,z)=>!gegenstaende.some(d=>Math.abs(d.x-x)<2.5 && Math.abs(d.z-z)<2) && !BEREICHE.some(([a,b,w,t])=>Math.abs(x-a)<w && Math.abs(z-b)<t) && !(x>4.4 && x<10.4 && z>-6) && !(Math.abs(x-EX)<2.4 && z<-6) && !(z<-9.8 && z>-11.4);
  BH.wiesenschmuck(sc,-17.4,17.4,-12.8,13.3,520,0,frei);
  const blueten=[], stiele=[];
  const blume=(x,z,i)=>{ const h=.18+zufall()*.2; blueten.push([x,h,z,.09,.065,.09,[BH.WEISS,BH.GELB,0xf07a9a,0xb08ae0,0xee5a30][i%5]]); stiele.push([x,h/2,z,.02,h,.02,BH.LAUB3]); };
  for(let i=0;i<260;i++){ const s=i%2?1:-1; blume(s*(17.15+zufall()*.35),-12.8+zufall()*26,i); }
  WAENDE.forEach(x=>{ for(let i=0;i<30;i++){ const v=i%2?1:-1; blume(x+v*(1.25+zufall()*.9),-12.95+zufall()*.35,i); } });
  for(let i=0;i<70;i++){ const x=-17+zufall()*34, z=-12.4+zufall()*25; if(frei(x,z)) blume(x,z,i); }
  BH.viele(sc,GEO.sph,blueten); BH.viele(sc,GEO.box,stiele);
}

/* ---------- Tiere ---------- */
function hase(k,weg){
  const g=gruppe(k.scene,weg[0][0],0,weg[0][1]), r=gruppe(g,0,0,0), F=0xb08a64; g.userData.lebendig=true; g.scale.setScalar(1.15);
  ball(r,.27,F,-.02,.32,0,1.35,.98,.95); ball(r,.21,F,.33,.58,0); ball(r,.13,BH.WEISS,-.4,.38,0); ball(r,.12,0xf0e0cc,.18,.28,0,1,1,1.2);
  [-1,1].forEach(s=>{ const o=ball(r,.07,F,.24,.9,s*.1,.75,2.9,.85); o.rotation.x=s*.18; ball(r,.035,0xf0a8a0,.28,.9,s*.105,.45,3.6,.8); ball(r,.037,BH.SCHWARZ,.49,.65,s*.11); ball(r,.012,BH.WEISS,.52,.67,s*.12); ball(r,.085,0xf0e0cc,.46,.52,s*.07); ball(r,.095,F,.24,.09,s*.15,1.4,.7,.8); ball(r,.17,F,-.14,.18,s*.19,1.35,.9,.7);
    [0,.05].forEach(h=>strich(r,[.52,.53,s*.08],[.55,.5+h,s*.34],.005,BH.WEISS)); });
  ball(r,.035,0xe8707a,.55,.58,0);
  verschmelze(r);
  const P=weg.map(p=>V(p[0],0,p[1])), L=P.map((p,i)=>p.distanceTo(P[(i+1)%P.length])), ges=L.reduce((a,b)=>a+b,0);
  k.anim.push(t=>{ const u=t*1.25, n=Math.floor(u), q=Math.min(1,(u-n)/.65); let s=((n+q*q*(3-2*q))*.95)%ges, i=0; while(i<L.length-1 && s>L[i]){ s-=L[i]; i++; }
    const a=P[i], b=P[(i+1)%P.length]; g.position.lerpVectors(a,b,Math.min(1,s/L[i])); g.position.y=Math.sin(q*Math.PI)*.42; g.rotation.y=Math.atan2(-(b.z-a.z),b.x-a.x); r.rotation.z=Math.sin(q*Math.PI*2)*.22; });
}
/* Schmetterling flattert in einem kleinen Kreis */
function schmetterling(k,x,y,z,farbe,phase,weit){
  const s=gruppe(k.scene,x,y,z); s.userData.lebendig=true;
  walze(s,.022,.28,BH.SCHWARZ,0,0,0).rotation.x=Math.PI/2;
  [-1,1].forEach(v=>{ strich(s,[0,0,.12],[v*.08,.12,.22],.007,BH.SCHWARZ); ball(s,.018,BH.SCHWARZ,v*.08,.12,.22); });
  const fl=[-1,1].map(v=>{ const f=gruppe(s,0,.01,0); ball(f,.17,farbe,v*.17,0,.07,1.1,.07,.85); ball(f,.11,farbe,v*.12,0,-.11,1,.07,.95); ball(f,.045,BH.WEISS,v*.25,.008,.09,1,.3,1); leicht(f); verschmelze(f); return f; });
  k.anim.push(t=>{ const a=.15+Math.abs(Math.sin(t*9+phase)); fl[0].rotation.z=-a; fl[1].rotation.z=a;
    s.position.set(x+Math.sin(t*.55+phase)*weit,y+Math.sin(t*1.8+phase)*.25,z+Math.cos(t*.85+phase)*weit*.6); s.rotation.y=Math.atan2(Math.cos(t*.55+phase)*.55,-Math.sin(t*.85+phase)*.51); });
}
function tiere(k){
  const sc=k.scene;
  hase(k,[[2.6,4],[5,4.6],[7.8,4.2],[8.2,7],[4.4,7.8],[2.2,6]]);
  [[-1,1.4,5,0xf08a24,2.2],[5.8,2.2,-3.4,0x3a8ae0,1.5],[-8,1.7,-3.6,BH.GELB,1.8],[9.4,1.8,3.4,0xe85aa0,1.4],[-3.4,2.5,-10,0x9a4ac8,1.6],[12.6,2.1,-8.6,BH.WEISS,1.3],[-13,1.6,6,BH.ROT,1.5]].forEach(([x,y,z,f,w],i)=>schmetterling(k,x,y,z,f,i*1.7,w));
  /* Singvögel auf dem Zaun */
  [[-15,1.3,ZZ,-1.4,0x4a78b8],[5.6,1.3,ZZ,-1.9,0xb8543a],[17.75,1.3,4,3,0xc8a030],[-17.75,1.3,-7.4,.2,0x4a8a5a]].forEach(([x,y,z,d,f],i)=>{ const v=BH.vogel(sc,x,y,z,d,f); k.anim.push(t=>{ v.g.rotation.y=d+Math.sin(t*.9+i*2)*.5; v.g.position.y=y+Math.max(0,Math.sin(t*3+i*2.1)-.75)*.5; }); });
  /* fliegende Vögel hinter dem Garten */
  for(let i=0;i<3;i++){ const g=gruppe(sc,0,4,-20), m=basis(i%2?0x35507a:0x3a2a2a); ball(g,.15,m,0,0,0,2,.75,.75).castShadow=false; ball(g,.1,m,.3,.07,0).castShadow=false;
    const fl=[-1,1].map(s=>{ const f=gruppe(g,0,0,0); box(f,.22,.03,.55,m,-.02,0,s*.33).castShadow=false; return f; }); const w0=i*2.1, r=8+i*3;
    k.anim.push(t=>{ const w=t*.25+w0; g.position.set(Math.cos(w)*r*1.4,4.2+i*.5+Math.sin(t*1.3+i)*.25,-21+Math.sin(w)*r*.4); g.rotation.y=Math.atan2(-Math.cos(w)*r*.4,-Math.sin(w)*r*1.4); const s=Math.sin(t*8+i)*.65; fl[0].rotation.x=s; fl[1].rotation.x=-s; }); }
}

/* ---------- Gegenstände ---------- */
/* flache Rundung für gemalte Bilder */
const kreis2=(c,x,y,r,f)=>{ c.fillStyle=f; c.beginPath(); c.arc(x,y,r,0,6.283); c.fill(); };
const oval2=(c,x,y,a,b,f,d)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,a,b,d||0,0,6.283); c.fill(); };
/* 1 Beetplan: drei Beete von oben gemalt */
function beetplan(g){
  const t=bild(512,368,c=>{
    c.fillStyle='#f6ecd0'; c.fillRect(0,0,512,368);
    [0,1,2].forEach(r=>{ const y=22+r*114; c.fillStyle='#8a5a30'; c.fillRect(28,y,456,96); c.strokeStyle='#5a3818'; c.lineWidth=6; c.strokeRect(28,y,456,96);
      for(let i=0;i<6;i++){ const x=68+i*75, m=y+48;
        if(r===0){ for(let j=0;j<7;j++) kreis2(c,x+Math.cos(j*.9)*18,m+Math.sin(j*.9)*18,15,j%2?'#62b83a':'#7ccc48'); kreis2(c,x,m,16,'#b8ec78'); }
        else if(r===1){ c.fillStyle='#f27a14'; c.beginPath(); c.moveTo(x-17,m-6); c.lineTo(x+17,m-6); c.lineTo(x,m+40); c.closePath(); c.fill(); [-1,0,1].forEach(v=>oval2(c,x+v*13,m-23,6,18,'#58b838',v*.6)); }
        else { oval2(c,x,m+3,31,26,'#ee7c18'); oval2(c,x-12,m+3,10,25,'#f89830'); oval2(c,x+12,m+3,10,25,'#f89830'); c.fillStyle='#3a7a2a'; c.fillRect(x-4,m-34,9,13); } } });
  });
  BH.tafel(g,t,3.1,2.22,0,2.1,.14);
  box(g,3.2,2.32,.1,BH.HOLZ2,0,2.1,.06);
  [[0,3.31,3.46,.2],[0,.89,3.46,.2],[-1.63,2.1,.2,2.5],[1.63,2.1,.2,2.5]].forEach(([x,y,w,h])=>box(g,w,h,.28,BH.HELLHOLZ,x,y,.14));
  [[-1.63,3.31],[1.63,3.31],[-1.63,.89],[1.63,.89]].forEach(([x,y])=>ball(g,.07,BH.EISEN,x,y,.29,1,1,.6));
}
/* 2 Regenmesser: großes Messglas mit Trichter und Wasser, darüber eine Regenwolke */
function regenmesser(g,k){
  box(g,2.1,3,.12,0xe8d4a8,0,1.95,.04); [[0,3.48,2.26,.14],[0,.42,2.26,.14]].forEach(([x,y,w,h])=>box(g,w,h,.2,0x3a6a9a,x,y,.08)); [-1.08,1.08].forEach(x=>box(g,.14,3.14,.2,0x3a6a9a,x,1.95,.08));
  const X=-.18, Z=.36;
  const glas=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,1.9,20,1,true),new THREE.MeshLambertMaterial({color:0xcfefff,transparent:true,opacity:.35,side:THREE.DoubleSide,depthWrite:false})); glas.position.set(X,1.65,Z); g.add(glas);
  walze(g,.31,.92,0x2f94e4,X,1.18,Z); walze(g,.315,.04,0x9ad8ff,X,1.65,Z);
  walze(g,.4,.12,0x4a6a8a,X,.67,Z); box(g,.5,.14,.4,0x4a6a8a,X,.56,.22);
  [.95,1.7,2.35].forEach(y=>{ ring(g,.35,.025,0x4a6a8a,X,y,Z).rotation.x=Math.PI/2; });
  ring(g,.35,.045,0x4a6a8a,X,2.6,Z).rotation.x=Math.PI/2; rohr(g,.56,.34,.3,0xb8c4d0,X,2.76,Z,20,true); ring(g,.56,.035,0x4a6a8a,X,2.91,Z).rotation.x=Math.PI/2;
  /* Messleiste mit Strichen */
  box(g,.38,1.95,.06,BH.WEISS,.55,1.65,.13); for(let i=0;i<10;i++) box(g,i%3===0?.3:.18,.045,.03,BH.SCHWARZ,.43+(i%3===0?.1:.04),.82+i*.18,.17);
  /* Wolke */
  [[0,3.38,.26],[-.34,3.28,.2],[.34,3.28,.21],[.14,3.52,.17]].forEach(([x,y,r])=>ball(g,r,BH.WEISS,X+x,y,.28,1.2,.9,.7));
  const tropfen=[-.24,0,.24].map((v,i)=>{ const q=gruppe(g,X+v,3,Z); q.userData.lebendig=true; ball(q,.065,0x3aa4f0,0,0,0); kegel(q,.056,.13,0x3aa4f0,0,.09,0);
    k.anim.push(t=>{ const u=(t*.9+i*.37)%1; q.position.y=3.12-u*.42; q.visible=u<.85; }); return q; });
  ball(g,.17,0x2f94e4,.62,3,.2,1,1,.5); kegel(g,.145,.28,0x2f94e4,.62,3.19,.18).scale.z=.07;
}
/* 3 freundliche Vogelscheuche */
function vogelscheuche(g,k){
  ball(g,.7,BH.ERDE,0,0,0,1.2,.22,.85);
  walze(g,.11,1.5,BH.HOLZ2,0,.75,-.08);
  const o=gruppe(g,0,0,0); o.userData.lebendig=true; const r=gruppe(o,0,0,0);
  [-1,1].forEach(s=>{ rohr(r,.16,.2,.75,0x8a6a3a,s*.2,.95,0,10); for(let i=0;i<7;i++) strich(r,[s*.2+(i-3)*.045,.62,(i%2)*.06],[s*.2+(i-3)*.09,.28,(i%3-1)*.12],.022,i%2?BH.STROH:BH.STROH2); box(r,.2,.18,.04,s>0?0xc84a3a:BH.GRUEN,s*.2,.98,.19); });
  rohr(r,.36,.5,.95,BH.BLAU,0,1.75,0,14); walze(r,.51,.1,0x8a5a2a,0,1.33,0); box(r,.16,.14,.06,BH.GOLD,0,1.33,.5);
  const f1=box(r,.28,.3,.05,0xee7c22,-.15,1.68,.43); f1.rotation.z=.2; [1.92,1.68].forEach(y=>ball(r,.05,BH.GELB,.14,y,.43));
  [-1,1].forEach(s=>{ strich(r,[s*.25,2.05,0],[s*1.22,2.0,0],.17,BH.BLAU); walze(r,.19,.09,0x2a5a9a,s*1.2,2,0).rotation.z=Math.PI/2; for(let i=0;i<9;i++) strich(r,[s*1.2,2,0],[s*(1.55+(i%3)*.06),2+(i-4)*.085,(i%2?.1:-.08)],.024,i%2?BH.STROH:0xf6dc80); });
  box(r,.2,.2,.05,BH.ROT,-.72,2.04,.17);
  /* Halstuch, Kopf und Hut */
  ring(r,.27,.09,BH.ROT,0,2.22,0).rotation.x=Math.PI/2; const z1=box(r,.18,.42,.07,BH.ROT,.12,2.0,.4); z1.rotation.z=.25;
  ball(r,.45,0xf4e0b4,0,2.62,0);
  [-.16,.16].forEach(x=>{ ball(r,.075,BH.SCHWARZ,x,2.7,.41,1,1.15,.6); ball(r,.024,BH.WEISS,x+.025,2.73,.465); ball(r,.085,0xf49a8a,x*1.7,2.52,.37,1,.75,.45); });
  ball(r,.07,0xee7c22,0,2.57,.45); const m=ring(r,.17,.028,0xa83a22,0,2.52,.42,Math.PI*.8); m.rotation.z=Math.PI*1.1; m.rotation.x=.2;
  for(let i=0;i<10;i++){ const a=-1.3+i*.29; strich(r,[Math.sin(a)*.35,2.9,Math.cos(a)*.25],[Math.sin(a)*.62,2.72-(i%2)*.08,Math.cos(a)*.34],.022,BH.STROH); }
  const h=gruppe(r,0,3,-.04); h.rotation.x=-.14; walze(h,.72,.07,BH.STROH,0,0,0); rohr(h,.3,.4,.42,BH.STROH,0,.23,0,16); walze(h,.4,.1,BH.ROT,0,.1,0); ball(h,.1,BH.WEISS,.34,.13,.23); ball(h,.045,BH.GELB,.35,.13,.32);
  leicht(r); verschmelze(r);
  const v=BH.vogel(o,.95,2.17,.02,-2.1,0xb8543a); v.g.scale.setScalar(1.1);
  k.anim.push(t=>{ o.rotation.z=Math.sin(t*1.1)*.025; v.g.position.y=2.17+Math.max(0,Math.sin(t*2.3)-.7)*.4; v.g.rotation.y=-2.1+Math.sin(t*.8)*.6; });
}
/* 4 große grüne Gießkanne mit runder Brause */
function giesskanne(wurzel,k){
  const g=gruppe(wurzel,-.4,0,0), C=0x2fa050, C2=0x1c7036;
  rohr(g,.62,.7,1.25,C,-.15,.7,0,24); [.14,.7,1.3].forEach(y=>ring(g,y<.2?.7:y<1?.66:.63,.05,C2,-.15,y,0).rotation.x=Math.PI/2);
  walze(g,.5,.06,0x0e3a1c,-.15,1.33,0); box(g,.5,.07,1.22,C,-.38,1.37,0);
  strich(g,[.35,.5,0],[1.35,1.45,0],.14,C); strich(g,[.55,1.15,0],[1.05,1.17,0],.05,C2);
  const kopf=gruppe(g,1.47,1.57,0); kopf.rotation.z=-.82; rohr(kopf,.36,.14,.32,C,0,0,0,18); walze(kopf,.37,.07,BH.GOLD,0,.19,0);
  [[0,0],[.19,0],[-.19,0],[.095,.17],[-.095,.17],[.095,-.17],[-.095,-.17]].forEach(([x,z])=>walze(kopf,.035,.03,0x5a4010,x,.235,z));
  ring(g,.55,.085,C2,-.2,1.35,0,Math.PI).scale.y=1.15;
  ring(g,.45,.085,C2,-.78,.8,0,Math.PI).rotation.z=Math.PI/2;
  /* gemalte Blume vorn */
  for(let i=0;i<6;i++){ const a=i*1.047; ball(g,.1,BH.WEISS,-.15+Math.cos(a)*.15,.7+Math.sin(a)*.15,.67,1,1,.35); } ball(g,.09,BH.GELB,-.15,.7,.69,1,1,.5);
  /* Tropfen aus der Brause */
  for(let i=0;i<6;i++){ const q=gruppe(g,1.7,1.7,0); q.userData.lebendig=true; ball(q,.06,0x4ab0f4,0,0,0,.8,1.2,.8);
    k.anim.push(t=>{ const u=(t*.8+i/6)%1; q.position.set(1.68+u*(.38+(i%3)*.1),1.72+u*.22-u*u*1.75,((i%3)-1)*.2*u); }); }
  { const pf=mat(0x3a8ac8,{transparent:true,opacity:.6}); [[1.9,0,.26],[2.15,.16,.15],[1.72,-.18,.13]].forEach(([x,z,r])=>ball(g,r,pf,x,.02,z,1.3,.07,.85)); }
}
/* 5 Kürbisbeet mit dicken Kürbissen */
function ein_kuerbis(g,x,y,z,r){
  for(let i=0;i<8;i++){ const a=i*.785; const q=ball(g,r*.62,i%2?KUERBIS:KUERBIS2,x+Math.cos(a)*r*.46,y+r*.7,z+Math.sin(a)*r*.46,1,1.12,.85); q.rotation.y=-a; }
  ball(g,r*.7,KUERBIS,x,y+r*.72,z,1,1.05,1);
  strich(g,[x,y+r*1.33,z],[x+r*.12,y+r*1.68,z],r*.12,0x4a6a20); strich(g,[x+r*.12,y+r*1.68,z],[x+r*.32,y+r*1.76,z],r*.09,0x4a6a20);
}
function kuerbisbeet(g){
  ball(g,1,BH.ERDE2,0,0,0,1.85,.2,1.25);
  ein_kuerbis(g,.35,.05,-.25,.82); ein_kuerbis(g,-1.02,.08,.25,.6); ein_kuerbis(g,1.38,.08,.5,.46); ein_kuerbis(g,-.12,.1,.78,.36); ein_kuerbis(g,-1.15,.08,-.65,.4);
  /* Ranken und große Blätter */
  [[[-1.75,.15,.8],[-.9,.3,1.05],[.5,.15,1.15]],[[1.75,.15,-.4],[1.5,.5,-.8],[.7,.3,-1.05]],[[-1.8,.2,-.2],[-1.7,.5,-.8],[-.4,.25,-1.1]]].forEach(P=>{ strich(g,P[0],P[1],.045,0x3a7a2a); strich(g,P[1],P[2],.04,0x3a7a2a); });
  [[-1.75,.4,.75],[-.75,.32,1.15],[.65,.28,1.18],[1.78,.35,-.1],[1.45,.75,-.8],[.55,.35,-1.12],[-1.78,.42,-.25],[-1.55,.7,-.8],[-.45,.9,-.95],[1.7,.28,1]].forEach(([x,y,z],i)=>{
    const b=gruppe(g,x,y,z); b.rotation.set(.35,i*1.3,(i%2?.25:-.2)); const c=i%2?0x4a9a34:0x37822a;
    ball(b,.3,c,0,0,0,1.1,.16,1); [-1,1].forEach(s=>ball(b,.2,c,s*.2,0,-.18,1,.2,1)); strich(b,[0,.05,-.2],[0,.05,.24],.015,0x9ac860); strich(g,[x,0,z],[x,y,z],.025,0x3a7a2a); });
  [[-.55,.45,1.05],[1.05,.3,1.05]].forEach(([x,y,z])=>{ for(let i=0;i<5;i++){ const a=i*1.257; ball(g,.09,BH.GELB,x+Math.cos(a)*.1,y+Math.sin(a)*.1,z,1,1,.5); } ball(g,.06,0xee9a10,x,y,z+.05); });
  leicht(g);
}
/* 6 Wachstumstafel: vom Samen zur Blüte, nur Bilder */
function wachstumstafel(g){
  const t=bild(640,384,c=>{
    c.fillStyle='#d8f0fc'; c.fillRect(0,0,640,384); c.fillStyle='#8a5a30'; c.fillRect(0,268,640,116); c.fillStyle='#74c040'; c.fillRect(0,258,640,12);
    for(let i=0;i<90;i++) kreis2(c,(i*97)%640,282+(i*41)%96,2+i%3,'rgba(60,34,12,.45)');
    kreis2(c,584,52,32,'#ffd220'); c.strokeStyle='#ffd220'; c.lineWidth=7; c.lineCap='round'; for(let i=0;i<10;i++){ const a=i*.628; c.beginPath(); c.moveTo(584+Math.cos(a)*40,52+Math.sin(a)*40); c.lineTo(584+Math.cos(a)*50,52+Math.sin(a)*50); c.stroke(); }
    const stiel=(x,y)=>{ c.strokeStyle='#2e8a30'; c.lineWidth=10; c.beginPath(); c.moveTo(x,292); c.lineTo(x,y); c.stroke(); }, blatt=(x,y,s,gr)=>oval2(c,x+s*gr,y,gr,gr*.48,'#48ae38',-s*.45);
    /* Samen mit erster Wurzel */
    oval2(c,70,316,26,19,'#e8c078',-.4); c.strokeStyle='#fff0d0'; c.lineWidth=6; c.beginPath(); c.moveTo(80,330); c.quadraticCurveTo(92,346,82,364); c.stroke();
    /* Keimling */
    stiel(230,220); blatt(230,218,-1,22); blatt(230,218,1,22); c.strokeStyle='#fff0d0'; c.lineWidth=5; [[-22,340],[3,358],[24,336]].forEach(([a,b])=>{ c.beginPath(); c.moveTo(230,290); c.lineTo(230+a,b); c.stroke(); });
    /* junge Pflanze */
    stiel(390,152); [[238,-1,33],[210,1,33],[180,-1,27],[158,1,22]].forEach(([y,s,gr])=>blatt(390,y,s,gr));
    /* blühende Pflanze */
    stiel(550,128); [[240,-1,36],[214,1,36],[178,-1,29]].forEach(([y,s,gr])=>blatt(550,y,s,gr)); for(let i=0;i<9;i++){ const a=i*.698; oval2(c,550+Math.cos(a)*31,124+Math.sin(a)*31,23,12,'#f08418',a); } kreis2(c,550,124,19,'#7a3c10');
    /* Pfeile */
    c.fillStyle='#d83a2a'; [130,290,450].forEach(x=>{ c.fillRect(x-26,46,32,16); c.beginPath(); c.moveTo(x+4,30); c.lineTo(x+34,54); c.lineTo(x+4,78); c.closePath(); c.fill(); });
  });
  BH.tafel(g,t,3.35,2.01,0,2.05,.14);
  box(g,3.45,2.11,.1,BH.HOLZ2,0,2.05,.06);
  [[0,3.17,3.73,.22],[0,.93,3.73,.22],[-1.76,2.05,.22,2.02],[1.76,2.05,.22,2.02]].forEach(([x,y,w,h])=>box(g,w,h,.28,0x3a8a3a,x,y,.14));
  [-1,1].forEach(s=>{ ball(g,.2,BH.LAUB2,s*1.45,3.4,.15,1.3,.55,.5); ball(g,.17,BH.LAUB,s*1.2,3.35,.18,1.2,.55,.5); });
}
/* 7 Salatbeet: Hochbeet aus Holz mit hellgrünen Salatköpfen */
function salatbeet(g){
  box(g,3,.55,1.8,BH.HELLHOLZ,0,.3,0); [-1,1].forEach(s=>{ [.18,.42].forEach(y=>box(g,3.04,.04,.05,BH.HOLZ2,0,y,s*.9)); [-1,1].forEach(v=>box(g,.2,.72,.2,BH.HOLZ2,s*1.48,.36,v*.88)); });
  box(g,2.82,.08,1.62,BH.ERDE2,0,.6,0);
  [-.98,-.33,.33,.98].forEach((x,i)=>[-.4,.4].forEach((z,j)=>{ const c=(i+j)%2?[0x6cbc34,0x92d848,0xc4f080]:[0x7ec83c,0xa4e258,0xd4f696];
    [[7,.27,.68,.2,0,.5],[6,.17,.77,.17,1,.85],[4,.07,.86,.13,2,1.15]].forEach(([n,r,y,gr,f,neig])=>{ for(let q=0;q<n;q++){ const a=q/n*6.283+i+r*5, b=gruppe(g,x+Math.cos(a)*r,y,z+Math.sin(a)*r); b.rotation.y=-a; const l=ball(b,gr,c[f],0,0,0,.9,.22,1.15); l.rotation.z=neig; ball(b,gr*.38,c[f],Math.cos(neig)*gr*.7,Math.sin(neig)*gr*.7,gr*.5); ball(b,gr*.38,c[f],Math.cos(neig)*gr*.7,Math.sin(neig)*gr*.7,-gr*.5); } });
    ball(g,.12,c[2],x,.9,z,1,.85,1); }));
  leicht(g);
}
/* 8 geflochtener Erntekorb voll Gemüse */
function erntekorb(g){
  const W=0xc8923a, W2=0x9a6a22;
  const korb=gruppe(g,0,0,0); korb.scale.z=.82;
  const profil=[[0,0],[.78,0],[.92,.2],[1.04,.5],[1.12,.82]].map(p=>new THREE.Vector2(p[0],p[1]));
  teil(korb,new THREE.LatheGeometry(profil,28),mat(0xb07c2c,{side:THREE.DoubleSide}),0,.04,0,1,1,1);
  [[.82,.09],[.9,.22],[.97,.36],[1.03,.5],[1.08,.66]].forEach(([r,y],i)=>ring(korb,r+.02,.05,i%2?W:W2,0,y,0).rotation.x=Math.PI/2);
  ring(korb,1.12,.11,W,0,.87,0).rotation.x=Math.PI/2;
  for(let i=0;i<20;i++){ const a=i/20*6.283; strich(korb,[Math.cos(a)*.82,.05,Math.sin(a)*.82],[Math.cos(a)*1.14,.83,Math.sin(a)*1.14],.032,0xe4b45c); }
  /* Henkel */
  ring(g,1.1,.085,W2,0,.87,-.05,Math.PI).scale.y=1.1; for(let i=1;i<12;i++){ const a=i/12*Math.PI; ball(g,.105,W,Math.cos(a)*1.1,.87+Math.sin(a)*1.21,-.05,.8,.8,1); }
  walze(g,.98,.1,0x6a4a1c,0,.78,0).scale.z=.8;
  /* Möhren */
  [[-.72,-.3,.5],[-.45,-.45,.22],[-.18,-.5,-.05]].forEach(([x,z,n])=>{ const m=gruppe(g,x,1.2,z); m.rotation.z=n; kegel(m,.15,.72,MOEHRE,0,0,0).rotation.x=Math.PI; walze(m,.15,.05,MOEHRE,0,.37,0); [-1,0,1].forEach(v=>{ strich(m,[0,.38,0],[v*.18,.68,v*.04],.028,0x3a9a2a); ball(m,.07,0x4ab034,v*.2,.72,v*.05,.8,1.5,.7); }); });
  /* Tomaten */
  [[.42,1.02,.3],[.72,.98,-.05],[.15,.98,.52],[.5,1.2,.02]].forEach(([x,y,z])=>{ ball(g,.22,TOMATE,x,y,z,1,.9,1); for(let i=0;i<5;i++){ const a=i*1.257; strich(g,[x,y+.19,z],[x+Math.cos(a)*.12,y+.19,z+Math.sin(a)*.12],.02,0x2e8a2a); } ball(g,.045,0xff9a80,x-.07,y+.09,z+.18); });
  /* Gurken und Radieschen */
  [[-.5,.96,.38,.35],[-.28,1.05,.14,-.15]].forEach(([x,y,z,d])=>{ const q=ball(g,.14,0x2e7a2a,x,y,z,3,1,1); q.rotation.y=d; ball(g,.075,0x8ac850,x+Math.cos(d)*.4,y,z-Math.sin(d)*.4); });
  [[.58,.98,.45],[.8,.97,.27],[.52,1.0,-.42],[.28,1.02,-.46]].forEach(([x,y,z])=>{ ball(g,.12,0xd82a6a,x,y,z); kegel(g,.04,.12,BH.WEISS,x+.07,y-.04,z+.1).rotation.x=2.2; ball(g,.08,0x4ab034,x-.03,y+.14,z,1,.8,.6); });
  leicht(g);
}
/* 9 Gewächshaus mit Tomaten */
function gewaechshaus(g){
  const R=0xf4f8f4, W=4.6, D=3, H=2.3, F=3.45;
  box(g,W+.2,.2,D+.2,BH.STEIN,0,.1,0); box(g,W-.1,.06,D-.1,BH.ERDE,0,.23,0);
  /* Gerüst */
  [-1,1].forEach(s=>{ [-W/2,-.75,.75,W/2].forEach(x=>{ box(g,.1,H,.1,R,x,H/2+.15,s*D/2); strich(g,[x,H+.15,s*D/2],[x,F,0],.05,R); });
    box(g,W+.1,.1,.1,R,0,H+.15,s*D/2); box(g,W+.1,.09,.09,R,0,.28,s*D/2); box(g,.1,.1,D,R,s*W/2,H+.15,0); box(g,.09,.09,D,R,s*W/2,.28,0); box(g,.09,H,.09,R,s*W/2,H/2+.15,0); box(g,.07,F-H-.1,.07,R,s*W/2,(F+H)/2+.12,0); });
  box(g,W+.2,.13,.13,R,0,F,0);
  [-1,1].forEach(s=>{ box(g,W/2-.75,.07,.07,R,s*(W/2+.75)/2,1.25,D/2); });
  box(g,1.5,.1,.1,R,0,2.05,D/2);
  /* Glas (durchsichtig) */
  const glas=new THREE.MeshLambertMaterial({color:0xc4ecff,transparent:true,opacity:.2,side:THREE.DoubleSide,depthWrite:false});
  const scheibe=(w,h,x,y,z,rx,ry)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),glas); m.position.set(x,y,z); m.rotation.set(rx||0,ry||0,0); g.add(m); };
  scheibe(W,H,0,H/2+.15,-D/2); [-1,1].forEach(s=>{ scheibe(D,H,s*W/2,H/2+.15,0,0,Math.PI/2); scheibe(W/2-.75,H,s*(W/2+.75)/2,H/2+.15,D/2); });
  const l=Math.hypot(D/2,F-H-.15), a=Math.atan2(F-H-.15,D/2);
  [-1,1].forEach(s=>scheibe(W,l,0,(F+H+.15)/2,s*D/4,s*(a-Math.PI/2)));
  /* glänzende Streifen auf dem Glas */
  /* offene Tür, nach außen aufgeklappt */
  const t=gruppe(g,-.75,0,D/2+.05); t.rotation.y=-2.9; [0,1.36].forEach(x=>box(t,.08,1.8,.07,R,x,1.13,0)); [.25,1.15,2.03].forEach(y=>box(t,1.4,.08,.07,R,.68,y,0)); ball(t,.06,BH.EISEN,1.2,1.15,.08);
  /* Tomatenpflanzen */
  [[-1.75,.55,1.9],[-1.2,-.5,2.3],[-.35,-.75,2],[.45,-.65,2.35],[1.25,.5,1.95],[1.8,-.4,2.2],[-1.7,-.75,1.7],[.1,.15,1.35]].forEach(([x,z,h],n)=>{
    rohr(g,.24,.18,.34,0xc8643a,x,.4,z,10); walze(g,.035,h,BH.HOLZ,x,h/2+.4,z-.05);
    for(let i=0;i<9;i++){ const a=i*2.3+n, y=.7+i/9*(h-.3); ball(g,.2,i%2?0x2e8a2e:0x46a838,x+Math.cos(a)*.2,y,z+Math.sin(a)*.18,1.2,.45,.85); }
    for(let i=0;i<5;i++){ const y=.75+i*(h-.45)/5, s=(i+n)%2?1:-1; ball(g,.13,i===4?0xf09a20:TOMATE,x+s*.19,y,z+.24); ball(g,.09,TOMATE,x+s*.3,y-.14,z+.18); ball(g,.045,0x2e8a2e,x+s*.19,y+.13,z+.24); } });
  leicht(g);
}
/* 10 Schubkarre voll Erde */
function schubkarre(g){
  const C=0x2f74c8, C2=0x1c4c8c;
  /* Rad vorn links */
  walze(g,.46,.22,BH.GUMMI,-1.2,.46,0).rotation.x=Math.PI/2; walze(g,.27,.25,0xd8dce0,-1.2,.46,0).rotation.x=Math.PI/2; walze(g,.08,.5,BH.EISEN,-1.2,.46,0).rotation.x=Math.PI/2;
  [-1,1].forEach(s=>{ strich(g,[-1.2,.46,s*.22],[-.4,.78,s*.48],.06,BH.EISEN); strich(g,[-.7,.68,s*.4],[1.15,.92,s*.62],.065,BH.EISEN); strich(g,[1.12,.92,s*.62],[1.72,1.04,s*.66],.095,0x20262c); strich(g,[.55,.84,s*.54],[.72,.04,s*.6],.065,BH.EISEN); box(g,.34,.07,.18,BH.EISEN,.74,.035,s*.6); });
  strich(g,[.68,.32,-.58],[.68,.32,.58],.045,BH.EISEN);
  /* Wanne: oben weit, unten schmal */
  const wanne=gruppe(g,-.08,1.14,0); wanne.scale.set(1.22,1,.82);
  const w=rohr(wanne,1,.64,.68,new THREE.MeshPhongMaterial({color:C,side:THREE.DoubleSide,flatShading:true,shininess:15}),0,0,0,4,true); w.rotation.y=Math.PI/4;
  box(wanne,.92,.08,.92,C2,0,-.32,0);
  [[0,.707],[0,-.707],[.707,0],[-.707,0]].forEach(([x,z])=>box(wanne,x?.1:1.5,.1,x?1.5:.1,C2,x,.34,z));
  box(wanne,1.12,.2,1.12,BH.ERDE2,0,.2,0);
  /* Erdhaufen mit Krümeln */
  ball(g,.7,BH.ERDE2,-.18,1.38,0,1.15,.62,.75); ball(g,.42,BH.ERDE,.28,1.5,.08,1.1,.7,.9);
  for(let i=0;i<46;i++){ const a=zufall()*6.283, r=Math.sqrt(zufall())*.68, y=1.4+.42*(1-r*r/.55); ball(g,.07+zufall()*.06,i%2?0x4a2c12:BH.ERDE,-.15+Math.cos(a)*r*1.05,Math.min(1.84,y),Math.sin(a)*r*.68); }
  /* Setzling und kleine Pflanzschaufel */
  strich(g,[-.45,1.7,.12],[-.45,2.08,.12],.028,BH.LAUB3); [-1,1].forEach(s=>ball(g,.13,0x6ac840,-.45+s*.14,2.08,.12,1.2,.35,.8));
  strich(g,[.42,1.7,.1],[.64,2.06,.1],.045,0xb8bec6); strich(g,[.64,2.06,.1],[.84,2.38,.1],.075,BH.ROT); { const bl=box(g,.34,.42,.07,0xc8ced6,.42,1.74,.1); bl.rotation.z=-.55; } ball(g,.09,BH.ROT,.85,2.4,.1);
  /* Erde am Boden */
  for(let i=0;i<22;i++) ball(g,.05+zufall()*.08,i%2?0x4a2c12:BH.ERDE,-.1+(zufall()-.5)*1.1,.04+zufall()*.05,.75+(zufall()-.5)*.55,1,.7,1);
  leicht(g);
}

const verstecke=[[-14.6,-9.6],[-9.6,-9.4],[-6.4,-4.8],[-.8,-7.8],[5,-11.8],[12.4,-10.6],[13.4,-4.4],[8,-4],[14.2,2.6],[14.4,8.2],[8.4,10.4],[1.4,5],[-2.6,12.2],[-8.4,11],[-14.2,11.2],[-14.6,4],[-9,.8],[-1.2,-1.4],[-9.4,-4.4],[9.2,6.8]];
const gegenstaende=[
  { x:-12.6, z:-13.28, wand:'hinten', steh:[-12.4,-11.4], treffer:[3.5,2.7,.5], trefferY:.75, baue:beetplan },
  { x:-6.4, z:-13.28, wand:'hinten', steh:[-6.4,-11.4], treffer:[2.4,3.3,.9], trefferY:.45, baue:regenmesser },
  { x:3.9, z:-5.2, steh:[3.8,-3.1], kasten:[3,.9], treffer:[3.1,3.4,1.1], baue:vogelscheuche },
  { x:-4.4, z:-2.6, steh:[-4.1,-.5], kasten:[3.3,1.5], treffer:[3.3,2.1,1.6], baue:giesskanne },
  { x:11.2, z:-1.8, steh:[10.4,.8], kasten:[3.9,2.6], treffer:[3.9,1.7,2.6], baue:kuerbisbeet },
  { x:0, z:-13.28, wand:'hinten', steh:[-.2,-11.4], treffer:[3.8,2.5,.5], trefferY:.85, baue:wachstumstafel },
  { x:2.2, z:.2, steh:[2,2.4], kasten:[3.3,2.1], treffer:[3.2,1.2,2], baue:salatbeet },
  { x:-6.4, z:5.4, steh:[-6.1,7.5], kasten:[2.4,2], treffer:[2.4,2.2,1.9], baue:erntekorb },
  { x:-12.8, z:-.6, steh:[-12.3,2], kasten:[5,3.4], treffer:[4.8,3.6,3.2], baue:gewaechshaus },
  { x:11.8, z:5.6, dreh:-.2, steh:[11.4,7.8], kasten:[3.2,1.7], treffer:[3.2,2.4,1.6], baue:schubkarre }
];

function baue(k){
  grund(k);
  bretterwaende(k);
  zaun(k);
  const tuer=gartentor(k);
  sonnenblumen(k);
  bauernhaus(k);
  hof(k);
  baeuerin(k);
  landschaft(k);
  obstbaeume(k);
  dekoBeete(k);
  ausstattung(k);
  tiere(k);
  return { tuer, start:[6,.8] };
}
return { titel:'Der Gemüsegarten', himmel:HIMMEL, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 2: Die Scheune. Warme Bretterwände, goldene Sonnenstrahlen durch Ritzen, Heuboden voll Heu, Schafe, Mäuschen und Staub im Licht.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Eule auf dem Balken) und 10 (Kornmühle) sind neu.
   Ausgang: das rote Scheunentor in der Rückwand links (x = -9), es schiebt sich nach links auf, dahinter der Hof bei Tageslicht. */
RAEUME3D.bauernhof[1] = (function(){
const { ROT, ROT2, WEISS, CREME, GELB, ORANGE, SCHWARZ, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, STROH, STROH2, LAUB, LAUB3 } = BH;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=-9;                       /* Mitte des Scheunentors */
const BODEN_OBEN=3.96;             /* Oberkante des Heubodens */
const HEU=0xd8b448, HEU2=0xc09a34, HEU3=0xf0d474, TORROT=0xb4301f, TORROT2=0xc23c28, SACK=0xd2b27c, SACK2=0xbc9a64, KORN=0xeab83c;

const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze nach vorn, Ring flach legen */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const gedreht=(par,x,z,dreh)=>{ const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; return g; };
/* Drehkörper aus Profilpunkten [[radius,hoehe],...] */
function dreher(par,profil,farbe,x,y,z){
  const m=new THREE.Mesh(new THREE.LatheGeometry(profil.map(p=>new THREE.Vector2(p[0],p[1])),18),mat(farbe,{side:THREE.DoubleSide}));
  m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}

/* ---------- Bilder ---------- */
/* Blick durch das offene Tor: Hof bei Tageslicht */
function hofBild(){
  return bild(640,384,(g)=>{ const v=g.createLinearGradient(0,0,0,250); v.addColorStop(0,'#4aa8ec'); v.addColorStop(1,'#d8f2fc'); g.fillStyle=v; g.fillRect(0,0,640,384);
    g.fillStyle='#fff4a0'; g.beginPath(); g.arc(250,62,30,0,7); g.fill();
    g.fillStyle='#ffffff'; [[120,70],[420,50],[540,100]].forEach(([x,y])=>{ [[0,0,26],[28,6,19],[-28,7,18]].forEach(([a,b,r])=>{ g.beginPath(); g.arc(x+a,y+b,r,0,7); g.fill(); }); });
    g.fillStyle='#9ad070'; g.beginPath(); g.moveTo(0,230); g.quadraticCurveTo(160,170,330,222); g.quadraticCurveTo(500,180,640,215); g.lineTo(640,384); g.lineTo(0,384); g.fill();
    g.fillStyle='#e8c860'; g.beginPath(); g.moveTo(0,250); g.quadraticCurveTo(300,222,640,258); g.lineTo(640,384); g.lineTo(0,384); g.fill();
    g.fillStyle='#78b448'; g.fillRect(0,276,640,108);
    /* Bauernhaus */
    g.fillStyle='#f4e4c0'; g.fillRect(390,180,120,100); g.fillStyle='#a83a26'; g.beginPath(); g.moveTo(374,184); g.lineTo(450,122); g.lineTo(526,184); g.fill();
    g.fillStyle='#8a5028'; g.fillRect(436,230,28,50); g.fillStyle='#bfe4fa'; g.fillRect(402,200,24,24); g.fillRect(474,200,24,24);
    /* Apfelbaum */
    g.fillStyle='#7a4a24'; g.fillRect(168,196,18,90); g.fillStyle='#4a9a3a'; [[177,168,48],[142,196,32],[214,194,34]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); });
    g.fillStyle='#d8342a'; [[160,160],[198,178],[146,200],[210,204],[178,190]].forEach(([x,y])=>{ g.beginPath(); g.arc(x,y,6,0,7); g.fill(); });
    /* Weg und Zaun */
    g.fillStyle='#d8b880'; g.beginPath(); g.moveTo(290,276); g.lineTo(340,276); g.lineTo(450,384); g.lineTo(190,384); g.fill();
    g.fillStyle='#fff8e8'; [[0,240],[470,640]].forEach(([a,b])=>{ g.fillRect(a,286,b-a,7); g.fillRect(a,308,b-a,7); for(let x=a+6;x<b;x+=30) g.fillRect(x,270,9,56); }); });
}
/* Lehrtafel ohne Wörter: Ähre, Körner, Mehlsack, Brot */
function kornTafelBild(){
  return bild(1024,448,(g)=>{ g.fillStyle='#fdf3d8'; g.fillRect(0,0,1024,448);
    const kreis=(x,y,r,f)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    const oval=(x,y,a,b,d,f,rand)=>{ g.fillStyle=f; g.beginPath(); g.ellipse(x,y,a,b,d,0,7); g.fill(); if(rand){ g.strokeStyle=rand; g.lineWidth=4; g.stroke(); } };
    [128,384,640,896].forEach(x=>kreis(x,224,108,'#d4ecf8'));
    /* 1 Ähren */
    [[-44,-.2],[0,0],[44,.2]].forEach(([a,d])=>{ g.save(); g.translate(128+a*.5,300); g.rotate(d); g.strokeStyle='#a8801c'; g.lineWidth=8; g.beginPath(); g.moveTo(0,20); g.lineTo(0,-90); g.stroke();
      for(let i=0;i<5;i++){ oval(-13,-90-i*22+20,11,18,-.5,'#eab02c','#8a6410'); oval(13,-90-i*22+20,11,18,.5,'#eab02c','#8a6410'); } oval(0,-182,10,19,0,'#eab02c','#8a6410'); g.restore(); });
    /* 2 Körner */
    [[-60,60],[-20,66],[22,60],[62,66],[-40,30],[2,34],[42,30],[-20,2],[22,4],[0,-28]].forEach(([a,b],i)=>{ oval(384+a,224+b,19,27,(i%3-1)*.6,'#e8a828','#7a5208'); g.strokeStyle='#7a5208'; g.lineWidth=3; g.beginPath(); g.moveTo(384+a,224+b-18); g.lineTo(384+a,224+b+18); g.stroke(); });
    /* 3 Mehlsack */
    g.fillStyle='#fffaf0'; g.strokeStyle='#7a6a48'; g.lineWidth=7; g.beginPath(); g.moveTo(574,306); g.quadraticCurveTo(560,200,608,176); g.lineTo(594,132); g.quadraticCurveTo(640,152,686,132); g.lineTo(672,176); g.quadraticCurveTo(720,200,706,306); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle='#a83a26'; g.lineWidth=10; g.beginPath(); g.moveTo(606,178); g.lineTo(674,178); g.stroke();
    oval(640,244,12,34,0,'#eab02c','#8a6410'); oval(616,252,9,22,-.6,'#eab02c','#8a6410'); oval(664,252,9,22,.6,'#eab02c','#8a6410');
    /* 4 Brot */
    oval(896,246,94,62,0,'#b8742c','#6a3e10'); oval(896,230,78,36,0,'#d4953f');
    g.strokeStyle='#f4d49a'; g.lineWidth=11; g.lineCap='round'; [-42,0,42].forEach(a=>{ g.beginPath(); g.moveTo(896+a-14,206); g.lineTo(896+a+14,246); g.stroke(); });
    /* Pfeile */
    g.fillStyle='#c0392b'; [256,512,768].forEach(x=>{ g.beginPath(); g.moveTo(x-24,212); g.lineTo(x+2,212); g.lineTo(x+2,192); g.lineTo(x+30,224); g.lineTo(x+2,256); g.lineTo(x+2,236); g.lineTo(x-24,236); g.fill(); });
    /* Zierleiste aus Punkten */
    for(let x=24;x<1024;x+=44){ kreis(x,40,8,'#c89030'); kreis(x,408,8,'#c89030'); } });
}
/* weicher Verlauf für die Sonnenstrahlen (oben hell, unten und an den Seiten weich) */
function strahlBild(){
  return bild(64,256,(g)=>{ for(let x=0;x<64;x++){ const s=Math.sin((x+.5)/64*Math.PI), v=g.createLinearGradient(0,0,0,256);
    v.addColorStop(0,'rgba(255,214,110,'+(s*.95)+')'); v.addColorStop(.65,'rgba(255,200,90,'+(s*.5)+')'); v.addColorStop(1,'rgba(255,190,80,0)'); g.fillStyle=v; g.fillRect(x,0,1,256); } });
}

/* ---------- Ausgang: das Scheunentor ---------- */
function baueTor(k,sc,hinten){
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(11,6.4),basis(0xffffff,{map:hofBild()})); aus.position.set(AX,3.0,HINTEN-4.4); hinten.add(aus);
  hell(box(hinten,9,.04,4.4,0x74ac46,AX,-.012,HINTEN-2.2));
  const weg=gruppe(hinten,0,0,0); box(weg,2.2,.03,4.2,0xd8b880,AX,.016,HINTEN-2.15);
  [-1,1].forEach(s=>{ [0,1,2].forEach(i=>box(weg,.16,.9,.16,CREME,AX+s*2.5,.45,HINTEN-1-i*1.3)); [.4,.75].forEach(y=>box(weg,.08,.1,3.0,CREME,AX+s*2.5,y,HINTEN-2.3)); });
  /* Rahmen aus dicken Balken */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>box(r,.3,4.45,.2,HOLZ3,s*2.36,2.22,.06));
  box(r,5.0,.3,.2,HOLZ3,0,4.46,.06); box(r,4.5,.08,.7,0x9a948a,0,.03,.05);
  /* Laufschiene, reicht nach links so weit, wie das Tor fährt */
  box(r,9.9,.14,.14,EISEN,-2.4,4.92,.45);
  [-7.2,-5.0,-2.4,0,2.35].forEach(x=>box(r,.14,.14,.5,EISEN,x,4.92,.22));
  [-7.38,2.52].forEach(x=>ball(r,.14,EISEN,x,4.92,.45));
  verschmelze(r);
  /* Torblatt: rot mit weißen Streben */
  const bl=gruppe(hinten,AX,0,HINTEN+.34); bl.userData.lebendig=true;
  for(let i=0;i<8;i++) box(bl,.58,4.4,.16,i%2?TORROT2:TORROT,-2.03+i*.58,2.23,0);
  [.2,2.28,4.33].forEach(y=>box(bl,4.66,.2,.07,CREME,0,y,.11));
  [-2.23,2.23].forEach(x=>box(bl,.2,4.35,.065,CREME,x,2.26,.108));
  [[1.24,1],[3.3,-1]].forEach(([y,v])=>[-1,1].forEach(s=>{ const l=Math.hypot(4.3,1.9), q=box(bl,l,.15,.05,CREME,0,y,.095+s*.004); q.rotation.z=s*Math.atan2(1.9,4.3); }));
  [-1.6,1.6].forEach(x=>{ box(bl,.14,.55,.08,EISEN,x,4.62,.1); flach(walze(bl,.2,.1,METALL2,x,4.93,.19)); flach(walze(bl,.06,.14,GOLD,x,4.93,.2)); });
  /* Griff */
  box(bl,.12,.9,.1,EISEN,1.82,2.0,.24); [1.6,2.4].forEach(y=>box(bl,.12,.1,.18,EISEN,1.82,y,.16));
  box(bl,1.55,1.18,.07,HOLZ3,0,2.06,.17);
  const schloss=BH.zahlenschloss(bl,0,1.94,.31); schloss.scale.setScalar(1.4);
  verschmelze(bl);
  const glanz=schein(hinten,'rgba(255,225,110,.4)',AX,2.2,HINTEN+1.0,1.2);
  const licht=new THREE.PointLight(0xfff2c0,.1,10,1.5); licht.position.set(AX,3.0,HINTEN-1.3); sc.add(licht);
  k.kasten(AX,-13.1,4.7,.8); /* geschlossenes Tor: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Scheunentor', einfach:'Großes Tor', steh:[AX,-10.9], durch:[AX,-15.4],
    treffer:{x:AX,y:2.3,z:-12.85,b:4.5,h:4.6,t:.9}, schildOben:[AX,5.4,-12.4], glanz:[AX,2.3,-12.5],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)); bl.position.x=AX-4.65*a*a*(3-2*a); glanz.visible=auf<.05; licht.intensity=.1+1.1*auf; } });
}

/* ---------- Heu ---------- */
/* lockerer Heuhaufen mit vielen Halmen, Unterkante bei y. halme sammelt die Instanzen */
function heuhaufen(par,halme,x,y,z,rx,h,rz){
  ball(par,1,HEU2,x,y+h*.22,z,rx*.92,h*.55,rz*.92);
  ball(par,1,HEU,x-rx*.28,y+h*.45,z+rz*.1,rx*.62,h*.5,rz*.65);
  ball(par,1,HEU,x+rx*.35,y+h*.36,z-rz*.08,rx*.55,h*.45,rz*.62);
  const n=Math.round(60+rx*rz*55);
  for(let i=0;i<n;i++){ const a=zufall()*6.28, u=Math.sqrt(zufall()), hh=h*(.22+.74*Math.sqrt(Math.max(0,1-u*u*.88)))+zufall()*.14;
    halme.push([x+Math.cos(a)*u*rx*1.06,y+hh,z+Math.sin(a)*u*rz*1.06,.3+zufall()*.46,.022,.022,[HEU3,0xf8e290,HEU,STROH2][i%4],zufall()*6.28,0,(zufall()-.5)*1.9]); }
  for(let i=0;i<11;i++){ const a=zufall()*6.28, u=.25+zufall()*.7, t=kegel(par,.07+zufall()*.07,.3+zufall()*.25,i%2?HEU3:HEU,x+Math.cos(a)*u*rx,y+h*(.24+.7*Math.sqrt(Math.max(0,1-u*u*.88))),z+Math.sin(a)*u*rz); t.rotation.set(Math.sin(a)*u*.9,0,-Math.cos(a)*u*.9); }
}
function heuboden(k,sc,hinten,halme){
  const g=gruppe(hinten,0,0,0), x1=-3.85, x2=12.25, mx=(x1+x2)/2, br=x2-x1;
  box(g,br,.14,2.0,HOLZ,mx,3.83,-12.5);
  for(let x=x1+.5;x<x2;x+=1.0) box(g,.05,.145,2.02,HOLZ3,x,3.832,-12.5);
  box(g,br+.1,.34,.22,HOLZ2,mx,3.73,-11.55);
  for(let x=x1+.35;x<x2;x+=.9) flach(walze(g,.07,.06,HELLHOLZ,x,3.73,-11.43));
  /* Heu für den Winter */
  [[-2.5,1.25,1.25],[-.4,1.45,1.55],[1.7,1.2,1.15],[3.7,1.35,1.4],[5.3,.75,.8],[9.2,1.2,1.35],[11.0,1.15,1.1]].forEach(([x,rx,h],i)=>heuhaufen(g,halme,x,3.9,-12.65+(i%2)*.2,rx,h,.75));
  /* Halme hängen über die Kante */
  for(let i=0;i<110;i++){ const x=x1+.2+zufall()*(br-.4); if(x>6.2&&x<8.2) continue; halme.push([x,3.84-zufall()*.3,-11.4+zufall()*.04,.022,.25+zufall()*.4,.022,i%2?HEU3:HEU,0,0,(zufall()-.5)*1.0]); }
  verschmelze(g);
  /* Stützbalken (fest, werden durchsichtig, wenn sie die Figur verdecken) */
  [-3.65,4.2,12.05].forEach(x=>{ const p=gruppe(sc,0,0,0);
    box(p,.34,3.6,.34,HOLZ2,x,1.8,-11.65); box(p,.52,.24,.52,0x9a948a,x,.12,-11.65);
    [-1,1].forEach(s=>{ const q=box(p,.14,.95,.14,HOLZ3,x+s*.4,3.25,-11.65); q.rotation.z=-s*.75; });
    verschmelze(p); k.kreis(x,-11.65,.28); k.verdecker(p,x,-11.65,.4); });
}

/* ---------- Wandschmuck ---------- */
/* Ritze in der Bretterwand: schmaler heller Spalt */
function ritze(par,x,y,z,h,dreh){
  const g=gedreht(par,x,z,dreh), m=basis(0xffdc82);
  hell(box(g,.025,h,.03,m,0,y,.02));
}
/* Sonnenstrahl: oben an der Ritze (a, Breite bo), unten am Boden (b, Breite bu); quer = Richtung der Breite */
function strahl(par,material,a,b,quer,bo,bu){
  const p=(c,w,s)=>[c[0]+quer[0]*w*s*.5,c[1]+quer[1]*w*s*.5,c[2]+quer[2]*w*s*.5];
  const A=p(a,bo,-1), Bp=p(a,bo,1), C=p(b,bu,1), D=p(b,bu,-1), geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.Float32BufferAttribute([].concat(A,Bp,C,A,C,D),3));
  geo.setAttribute('uv',new THREE.Float32BufferAttribute([0,1,1,1,1,0,0,1,1,0,0,0],2));
  geo.computeVertexNormals();
  const m=new THREE.Mesh(geo,material); m.renderOrder=5; par.add(m); return m;
}
/* Staubkörnchen, die im Strahl schweben */
function staub(k,par,a,b,n,phase){
  const P=[]; for(let i=0;i<n;i++){ const u=.15+zufall()*.75; P.push(a[0]+(b[0]-a[0])*u+(zufall()-.5)*.9, a[1]+(b[1]-a[1])*u+(zufall()-.5)*.5, a[2]+(b[2]-a[2])*u+(zufall()-.5)*.7); }
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
  const m=new THREE.Points(geo,new THREE.PointsMaterial({color:0xfff0b8,size:.04,transparent:true,opacity:.55,depthWrite:false})); m.userData.lebendig=true; par.add(m);
  k.anim.push(t=>{ m.position.set(Math.sin(t*.31+phase)*.25, Math.sin(t*.47+phase*2)*.2, Math.cos(t*.26+phase)*.18); });
}
/* Balkenwerk an einer Wand; Gruppe liegt auf der Wandfläche, x läuft entlang der Wand */
function fachwerk(par,stellen){
  stellen.forEach((x,i)=>{ box(par,.3,H,.14,HOLZ3,x,H/2,.07); [-1,1].forEach(s=>{ const q=box(par,.16,1.3,.1,HOLZ3,x+s*.5,5.6,.07); q.rotation.z=-s*.75; }); });
}
function fenster(par,x,y){
  const g=gruppe(par,x,y,0);
  hell(box(g,1.5,1.15,.04,basis(0xbfe6fa),0,0,.04)); hell(box(g,1.5,.3,.045,basis(0x9ad070),0,-.42,.045));
  [-1,1].forEach(s=>{ box(g,.16,1.4,.16,HELLHOLZ,s*.82,0,.1); box(g,1.8,.16,.16,HELLHOLZ,0,s*.65,.1); });
  box(g,.08,1.2,.08,HELLHOLZ,0,0,.09); box(g,1.5,.08,.08,HELLHOLZ,0,.02,.09);
}
function hutbrett(par,x,y){
  const g=gruppe(par,x,y,0);
  box(g,2.6,.22,.1,HOLZ2,0,0,.19);
  [-.8,.8].forEach((a,i)=>{ flach(walze(g,.5,.06,STROH,a,-.2,.29)); ball(g,.27,STROH,a,-.2,.34,1,1,.7); flach(walze(g,.285,.07,i?0x3a74c0:ROT2,a,-.2,.33)); });
  /* Schürze */
  box(g,.55,.9,.06,0x5a86b8,0,-.65,.29); box(g,.36,.28,.04,0x44709c,0,-.75,.34); box(g,.06,.35,.04,0x44709c,0,-.08,.29);
}
function regal(par,x,y){
  const g=gruppe(par,x,y,0);
  box(g,2.8,.12,.5,HELLHOLZ,0,0,.27); [-1.15,1.15].forEach(a=>strich(g,[a,-.6,.1],[a,-.05,.45],.05,HOLZ3));
  /* Blecheimer und Weidenkörbe */
  [[-.9,0x9aa6b0],[.95,0x7a8894]].forEach(([a,f])=>{ rohr(g,.28,.21,.46,f,a,.29,.28,14); flach(ring(g,.28,.025,METALL,a,.52,.28)); });
  rohr(g,.42,.3,.4,0xb07c38,0,.26,.28,14); [.16,.32,.46].forEach((yy,i)=>flach(ring(g,.34+i*.04,.03,0x805420,0,yy,.28))); [[-.18,GELB],[.04,ORANGE],[.2,GELB]].forEach(([a,f])=>ball(g,.13,f,a,.5,.28));
}
function besen(par,x){
  const g=gruppe(par,x,0,0);
  box(g,1.5,.14,.12,HOLZ2,0,3.0,.18);
  [-.45,.4].forEach((a,i)=>{ strich(g,[a,3.15,.3],[a,1.45,.3],.05,HELLHOLZ); box(g,.55,.2,.24,i?0x8a4a20:HOLZ3,a,1.38,.3); for(let j=0;j<7;j++){ const q=box(g,.06,.5,.18,i?STROH2:HEU,a-.24+j*.08,1.05,.3); q.rotation.z=(j-3)*.05; } });
}
/* altes Wagenrad an der Wand */
function schlitten(par,x,y){
  const g=gruppe(par,x,y,0);
  ring(g,.8,.09,HOLZ2,0,0,.18); ring(g,.9,.03,EISEN,0,0,.18); [0,1,2,3].forEach(i=>{ const sp=box(g,1.56,.09,.08,HELLHOLZ,0,0,.18); sp.rotation.z=i*Math.PI/4; });
  const n=walze(g,.17,.22,HOLZ3,0,0,.2); n.rotation.x=Math.PI/2; ball(g,.07,EISEN,0,0,.33); ball(g,.07,EISEN,0,.95,.16);
}

/* ---------- Deko am Boden (nichts davon ist ein Gegenstand) ---------- */
function fass(par,x,z,deckel){
  const g=gruppe(par,x,0,z);
  rohr(g,.62,.52,.7,HOLZ,0,.35,0,16); rohr(g,.52,.62,.7,HOLZ,0,1.05,0,16); walze(g,.47,.06,deckel||HOLZ2,0,1.41,0);
  [.14,.55,.85,1.28].forEach(y=>flach(ring(g,y>.4&&y<1?.61:.55,.04,EISEN,0,y,0)));
}
function kiste(par,x,y,z,dreh,inhalt){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,1.3,.1,.95,HOLZ2,0,.06,0);
  [.22,.52].forEach(h=>{ [-.46,.46].forEach(c=>box(g,1.3,.22,.07,HELLHOLZ,0,h,c)); [-.63,.63].forEach(a=>box(g,.07,.22,.9,HOLZ,a,h,0)); });
  [-.62,.62].forEach(a=>[-.46,.46].forEach(c=>box(g,.1,.7,.1,HOLZ2,a,.35,c)));
  if(inhalt) for(let r=0;r<3;r++) for(let s=0;s<4;s++) ball(g,.17,inhalt[(r+s)%inhalt.length],-.44+s*.29,.6+((r+s)%2)*.05,-.27+r*.27);
}
function kuerbis(par,x,z,r){
  const g=gruppe(par,x,0,z);
  ball(g,r,ORANGE,0,r*.72,0,.75,.75,1); [-1,1].forEach(s=>ball(g,r,0xd8641a,s*r*.45,r*.7,0,.68,.72,.9)); strich(g,[0,r*1.35,0],[r*.18,r*1.75,0],r*.11,LAUB3);
}
/* flacher Schaf-Pferch an der rechten Wand mit zwei Schafen */
function pferch(k,sc,halme){
  const g=gruppe(sc,0,0,0), x1=14.5, z1=-9.4, z2=-4.2;
  for(let z=z1;z<=z2+.01;z+=1.3) box(g,.18,1.15,.18,HOLZ2,x1,.58,z);
  [.45,.9].forEach(y=>{ box(g,.1,.14,z2-z1,HELLHOLZ,x1,y,(z1+z2)/2); [z1,z2].forEach(z=>box(g,18-x1,.14,.1,HELLHOLZ,(18+x1)/2,y,z)); });
  [z1,z2].forEach(z=>[15.7,16.9].forEach(x=>box(g,.18,1.15,.18,HOLZ2,x,.58,z)));
  for(let i=0;i<150;i++) halme.push([14.75+zufall()*3,.03+zufall()*.06,z1+.2+zufall()*(z2-z1-.4),.3+zufall()*.3,.02,.025,i%2?HEU:HEU3,zufall()*6.28]);
  verschmelze(g); k.kasten(16.35,(z1+z2)/2,3.9,z2-z1+.3);
  [[15.8,-8.0,2.9,1],[16.0,-5.6,3.5,.78]].forEach(([x,z,d,gr],i)=>{
    const s=gruppe(sc,x,0,z); s.rotation.y=d; s.scale.setScalar(gr); s.userData.lebendig=true; const r=gruppe(s,0,0,0), W=0xf6f0e4, H2=0xdcb89c;
    [[-.4,-.25],[-.4,.25],[.4,-.25],[.4,.25]].forEach(([a,c])=>{ walze(r,.08,.55,0x6a4c38,a,.28,c); });
    ball(r,.55,W,0,.82,0,1.25,.9,.95); [[-.45,1.05,.18],[-.1,1.2,-.15],[.28,1.14,.14],[-.62,.85,-.1],[.05,.95,.4],[.05,.95,-.4],[.5,.9,-.25]].forEach(([a,y,c])=>ball(r,.27,W,a,y,c));
    ball(r,.16,W,-.76,.98,0);
    const kopf=gruppe(s,.68,1.1,0), k2=gruppe(kopf,0,0,0);
    ball(k2,.27,H2,.14,.08,0,1.15,1,.95); ball(k2,.2,W,.04,.34,0); [-1,1].forEach(v=>{ ball(k2,.15,H2,.02,.18,v*.32,.65,.4,1.25); ball(k2,.062,WEISS,.38,.17,v*.13); ball(k2,.036,SCHWARZ,.43,.17,v*.13); }); ball(k2,.045,0xc8787a,.45,0,0);
    verschmelze(r); verschmelze(k2);
    k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.8+i*2)*.45; kopf.rotation.z=Math.min(0,Math.sin(t*.55+i*3))*.35; }); });
}

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  const boden=BH.kornBild('#a87e4c',['rgba(232,196,124,.4)','rgba(86,56,24,.26)','rgba(240,208,110,.3)'],false);
  const h=BH.huelle(k,{ B,T,H, himmelLicht:0xffe8c0, grund:0x6a4a2a, staerke:.76, sonne:0xffd48a, sonneStaerke:.4, dunkel:0x1c120a,
    wandBild:BH.bretterBild([170,112,62],'#2e1a0a'), bodenBild:boden, bodenWdh:[5,4], leiste:HOLZ3, sockel:0, dunkel:0x2e1c10, oeffnung:{x:AX,b:4.4,h:4.35} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueTor(k,sc,hinten);
  const halmeHinten=[], halmeBoden=[];
  heuboden(k,sc,hinten,halmeHinten);

  /* ---------- Rückwand ---------- */
  const dh=gruppe(hinten,0,0,HINTEN);
  [-17.8,-4.0,12.6,17.8].forEach(x=>box(dh,.3,H,.14,HOLZ3,x,H/2,.07));
  box(dh,B,.26,.16,HOLZ3,0,6.15,.08);
  fenster(dh,14.95,5.38);
  verschmelze(dh); ohneSchatten(dh);
  const ritzen=gruppe(hinten,0,0,0);
  [[-17.0,2.6,1.6],[-13.1,3.2,1.9],[-3.0,2.5,1.5],[3.2,2.2,1.3],[9.4,2.6,1.7],[13.0,2.4,1.8],[17.0,3.4,1.4],[-6.1,5.4,.8],[1.2,5.6,.9],[7.4,5.5,1.0]].forEach(([x,y,hh])=>ritze(ritzen,x,y,HINTEN,hh,0));
  verschmelze(ritzen); ohneSchatten(ritzen);
  /* ---------- Seitenwände ---------- */
  const seite=(wand,x,dreh)=>{ const g=gedreht(wand,x,0,dreh); return g; };
  const dl=seite(links,-B/2,Math.PI/2), dr=seite(rechts,B/2,-Math.PI/2);
  /* links: lokale x-Achse läuft nach -z; rechts: lokale x-Achse läuft nach +z */
  fachwerk(dl,[-12.6,-6.5,0,6.5,12.6]); fachwerk(dr,[-12.6,-6.5,0,6.5,12.6]);
  [dl,dr].forEach(g=>{ box(g,T,.26,.16,HOLZ3,0,6.15,.08); box(g,T,.2,.1,HOLZ2,0,4.3,.05); });
  fenster(dl,9.6,5.2); fenster(dl,-3.2,5.2); fenster(dr,-9.6,5.2); fenster(dr,3.2,5.2);
  schlitten(dl,8.8,2.7); hutbrett(dl,-3.2,3.2); regal(dl,-9.6,2.7); besen(dl,3.2);
  regal(dr,-3.4,3.0); hutbrett(dr,3.2,3.2); besen(dr,9.4); schlitten(dr,-9.5,2.7);
  [dl,dr].forEach(g=>{ [[-10.8,2.2,1.5],[-5.0,2.0,1.3],[1.4,3.0,1.8],[5.2,1.9,1.4],[11.2,2.8,1.7]].forEach(([x,y,hh])=>ritze(g,x,y,0,hh,0)); verschmelze(g); ohneSchatten(g); });

  /* ---------- Sonnenstrahlen und Staub ---------- */
  const sm=new THREE.MeshBasicMaterial({map:strahlBild(),transparent:true,opacity:.3,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
  const licht=(wand,a,b,quer,bo,bu,phase)=>{ strahl(wand,sm,a,b,quer,bo,bu); staub(k,wand,a,b,34,phase); };
  const quZ=[0,.35,.94], quX=[1,0,0];
  [[-1.4,3.0],[-6.8,2.7],[5.0,3.4]].forEach(([z,y],i)=>licht(links,[-17.9,y+.6,z],[-12.6,.05,z+1.8],quZ,.7,2.0,i));
  [[-1.4,3.5],[6.8,3.2]].forEach(([z,y],i)=>licht(rechts,[17.9,y+.4,z],[13.2,.05,z+1.6],quZ,.7,1.9,i+3));
  licht(hinten,[-3.0,3.2,-13.4],[-1.5,.05,-8.4],quX,.45,1.5,5);
  licht(hinten,[13.0,3.3,-13.4],[11.2,.05,-8.2],quX,.45,1.6,6);
  licht(hinten,[1.2,6.0,-13.35],[2.6,4.2,-11.6],quX,.4,1.5,7);
  k.anim.push(t=>{ sm.opacity=.28+Math.sin(t*.6)*.04; });

  /* ---------- Deko am Boden ---------- */
  const v=gruppe(sc,0,0,0);
  /* hinten unter dem Heuboden und in den Ecken */
  fass(v,-2.55,-12.65); k.kreis(-2.55,-12.65,.66);
  kiste(v,3.3,0,-12.7,0,[0xd8342a,0xe86a2a]); k.kasten(3.3,-12.7,1.45,1.1);
  kiste(v,5.2,0,-12.75,.06); kiste(v,5.25,.72,-12.75,-.12,[0x9ac83a,0xd8c83a]); k.kasten(5.2,-12.75,1.5,1.1);
  heuhaufen(v,halmeBoden,10.0,0,-12.5,1.35,1.4,.8); k.kasten(10.0,-12.5,2.7,1.6);
  heuhaufen(v,halmeBoden,17.0,0,-12.35,.95,1.2,.95); k.kreis(17.0,-12.35,1.0);
  fass(v,-17.1,-11.8); k.kreis(-17.1,-11.8,.66);
  /* links */
  kiste(v,-17.1,0,-9.4,Math.PI/2,[0xd8342a,0xc8281e]); k.kasten(-17.1,-9.4,1.1,1.45);
  fass(v,-17.1,-7.4,0x4a9ac0); k.kreis(-17.1,-7.4,.66);
  heuhaufen(v,halmeBoden,-16.9,0,-.4,1.0,1.35,1.5); k.kasten(-16.9,-.4,2.1,3.0);
  kiste(v,-17.1,0,7.0,Math.PI/2); kiste(v,-17.1,.72,7.05,1.45,[0x9ac83a,0xb8d84a]); k.kasten(-17.1,7.0,1.15,1.5);
  heuhaufen(v,halmeBoden,-16.5,0,10.8,1.4,1.3,1.4); k.kreis(-16.5,10.8,1.4);
  /* rechts */
  fass(v,17.1,-1.2); k.kreis(17.1,-1.2,.66);
  kiste(v,17.1,0,1.1,Math.PI/2,[0xd8342a,0xe86a2a]); k.kasten(17.1,1.1,1.1,1.45);
  fass(v,17.1,6.8,0x4a9ac0); k.kreis(17.1,6.8,.66);
  heuhaufen(v,halmeBoden,16.5,0,10.8,1.4,1.3,1.4); k.kreis(16.5,10.8,1.4);
  /* vorn (niedrig) */
  [[-12.4,12.3,.05,[0xd8342a,0xc8281e]],[-5.6,12.4,-.08,null],[4.4,12.35,.06,[0x9ac83a,0xd8c83a]],[11.4,12.3,-.05,null]].forEach(([x,z,d,f])=>{ kiste(v,x,0,z,d,f); k.kasten(x,z,1.5,1.15); });
  [[-10.8,12.2,.55],[-9.7,12.5,.38],[6.2,12.3,.5],[12.9,12.4,.42]].forEach(([x,z,r])=>{ kuerbis(v,x,z,r); k.kreis(x,z,r*1.1); });
  fass(v,-1.2,12.35); k.kreis(-1.2,12.35,.66);
  heuhaufen(v,halmeBoden,8.7,0,12.4,1.3,.8,.7); k.kasten(8.7,12.4,2.6,1.4);
  heuhaufen(v,halmeBoden,-14.4,0,12.35,.9,.9,.8); k.kreis(-14.4,12.35,.9);
  verschmelze(v);
  pferch(k,sc,halmeBoden);

  /* einzelne Halme auf dem Boden (flach, dezent) und alle Heuhalme */
  for(let i=0;i<650;i++){ const x=-17.6+zufall()*35.2, z=-12.9+zufall()*26; halmeBoden.push([x,.012,z,.18+zufall()*.26,.01,.018,[0xe2bc58,0xc8a044,0xf0d27c][i%3],zufall()*6.28]); }

  /* Futtertrog mit Hühnern, Handwagen und Eimer vorn */
  { const d=gruppe(sc,0,0,0);
    box(d,2.0,.12,.5,HOLZ3,1.8,.34,5.0); [-.28,.28].forEach(c=>box(d,2.1,.28,.08,HOLZ,1.8,.5,5.0+c)); [.8,2.8].forEach(x=>box(d,.12,.62,.62,HOLZ2,x,.31,5.0)); ball(d,.9,KORN,1.8,.46,5.0,1,.14,.22); for(let i=0;i<70;i++) ball(d,.045,i%2?0xf6d268:0xc8922a,1.0+zufall()*1.6,.57+zufall()*.04,4.83+zufall()*.34);
    k.kasten(1.8,5.0,2.3,.8);
    box(d,2.2,.12,1.15,HOLZ,-.5,.72,10.2); [-.54,.54].forEach(c=>box(d,2.3,.42,.09,HOLZ2,-.5,.98,10.2+c)); [-1.62,.62].forEach(x=>box(d,.09,.42,1.1,HOLZ2,x,.98,10.2));
    [-1.15,.15].forEach(x=>[-.68,.68].forEach(c=>{ ring(d,.38,.07,HOLZ3,x,.45,10.2+c); [0,.78,1.57,2.35].forEach(w=>{ const sp=box(d,.7,.05,.05,HOLZ,x,.45,10.2+c); sp.rotation.z=w; }); ball(d,.08,EISEN,x,.45,10.2+c); }));
    strich(d,[.65,.66,10.2],[1.55,.3,10.2],.05,HOLZ3); strich(d,[1.55,.3,9.95],[1.55,.3,10.45],.04,HOLZ3);
    heuhaufen(d,halmeBoden,-.5,.78,10.2,.85,.55,.45);
    k.kasten(-.1,10.2,3.4,1.6);
    verschmelze(d); }
  BH.huhn(k,sc,.5,0,5.9,.9,{ gr:1.05, phase:.5 }); BH.huhn(k,sc,3.2,0,5.8,2.3,{ farbe:0xc86a2a, gr:1.05, phase:2.4 });
  k.kreis(.5,5.9,.45); k.kreis(3.2,5.8,.45);
  /* flache Heuflecken auf dem Boden */
  [[-6.5,4.2],[-1.5,2.8],[5.5,2.0],[4.8,8.4],[-9.2,8.6],[8.8,4.8]].forEach(([x,z])=>{ for(let i=0;i<70;i++){ const a=zufall()*6.28, u=Math.sqrt(zufall()); halmeBoden.push([x+Math.cos(a)*u*1.3,.016,z+Math.sin(a)*u*.8,.2+zufall()*.3,.012,.022,[HEU3,HEU,0xf8e290][i%3],zufall()*6.28]); } });

  BH.viele(sc,GEO.box,halmeBoden); BH.viele(hinten,GEO.box,halmeHinten);

  /* ---------- Licht (mit Laterne und Torlicht fünf Punktlichter) ---------- */
  flacker(k,-5.15,2.7,-12.2,0xffbc50,.55,9);
  flacker(k,-12.0,5.0,1.0,0xffc878,.3,18); flacker(k,10.0,5.0,-1.0,0xffc878,.3,18);
  flacker(k,2.0,3.0,-9.4,0xffd090,.25,10);

  /* ---------- Tiere ---------- */
  maeuschen(k,[[-8.6,6.0],[-3.4,6.8],[-2.8,9.4],[-7.6,10.2]],1.5,0);
  maeuschen(k,[[3.0,-8.8],[5.2,-6.2],[8.4,-6.0],[4.8,-8.6]],1.3,4);
  maeuschen(k,[[-8.0,-6.6],[-5.2,-8.4],[-4.0,-6.0]],1.1,2);

  return { tuer, start:[-5.2,-1.6] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-15.0,-9.6],[-12.2,-7.6],[-6.6,-9.0],[-1.6,-9.2],[2.2,-10.2],[10.0,-9.6],[13.2,-11.0],[13.4,-6.8],[-9.0,-3.8],[4.2,-3.8],
  [15.0,-1.6],[-15.0,2.4],[-8.2,1.4],[1.4,1.2],[13.8,1.2],[-14.2,8.8],[-5.2,8.2],[1.8,8.0],[8.0,8.8],[14.2,9.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-5.15, z:HINTEN, wand:'hinten', steh:[-5.1,-11.5], kasten:[1.4,.8], treffer:[1.5,2.5,1.2], trefferY:1.45, baue(g,k){ /* 1 Stalllaterne */
      const R=0x2c6a52, Z=.7;
      box(g,.5,.9,.1,HOLZ3,0,3.35,.08); strich(g,[0,3.1,.12],[0,3.82,Z],.055,EISEN); strich(g,[0,3.75,.12],[0,3.82,Z],.055,EISEN); ball(g,.09,EISEN,0,3.82,Z);
      ring(g,.2,.035,METALL,0,3.6,Z);
      kegel(g,.46,.3,R,0,3.3,Z); walze(g,.16,.14,R,0,3.45,Z); flach(ring(g,.43,.04,GOLD,0,3.16,Z)); walze(g,.3,.12,R,0,3.1,Z);
      const m=new THREE.MeshBasicMaterial({color:0xffdc80,transparent:true,opacity:.55,depthWrite:false});
      hell(ball(g,.36,m,0,2.62,Z,1,1.32,1));
      /* Drahtkorb */
      [[-1,0],[1,0],[0,1]].forEach(([a,c])=>{ strich(g,[a*.27,3.08,Z+c*.27],[a*.44,2.62,Z+c*.44],.028,EISEN); strich(g,[a*.44,2.62,Z+c*.44],[a*.27,2.14,Z+c*.27],.028,EISEN); });
      flach(ring(g,.44,.025,EISEN,0,2.62,Z));
      /* seitliche Bügel */
      [-1,1].forEach(s=>{ strich(g,[s*.54,3.18,Z],[s*.54,2.05,Z],.05,R); strich(g,[s*.54,3.18,Z],[s*.28,3.28,Z],.05,R); strich(g,[s*.54,2.05,Z],[s*.3,1.98,Z],.05,R); });
      walze(g,.3,.12,GOLD,0,2.12,Z); rohr(g,.34,.46,.4,R,0,1.88,Z); walze(g,.5,.1,R,0,1.66,Z); flach(ring(g,.47,.035,GOLD,0,1.72,Z));
      flach(walze(g,.08,.1,GOLD,.34,1.9,Z+.3));
      const fl=gruppe(g,0,2.45,Z); fl.userData.lebendig=true; hell(ball(fl,.12,basis(0xff9a18),0,.06,0,1,1.9,1)); hell(ball(fl,.065,basis(0xfff6b0),0,.02,.08,1,1.7,1));
      schein(g,'rgba(255,200,90,.6)',0,2.62,Z+.2,2.3);
      k.anim.push(t=>{ fl.scale.set(1+Math.sin(t*9)*.08,1+Math.sin(t*13)*.14+Math.sin(t*7.3)*.08,1); }); } },
  { x:14.95, z:HINTEN, wand:'hinten', steh:[14.7,-11.3], kasten:[2.6,.8], treffer:[2.7,3.2,.9], trefferY:1.2, baue(g,k){ /* 2 Erntekranz */
      const Y=3.05, Z=.28;
      ring(g,.86,.2,0xc8982c,0,Y,Z);
      strich(g,[-.35,Y+.95,Z],[0,Y+1.55,.1],.03,ROT); strich(g,[.35,Y+.95,Z],[0,Y+1.55,.1],.03,ROT); ball(g,.1,EISEN,0,Y+1.55,.14);
      /* Ähren rundum, schräg nach außen */
      for(let i=0;i<26;i++){ const a=i*Math.PI*2/26;
        [[.97,.5],[.76,.38]].forEach(([r,d],j)=>{ const b=a+j*.12, e=ball(g,.1,(i+j)%2?0xf6d464:0xe8b438,Math.cos(b)*(r+.1),Y+Math.sin(b)*(r+.1),Z+.14+j*.05,.7,2.1,.7); e.rotation.z=b-Math.PI/2+(j?-.8:.8); });
        strich(g,[Math.cos(a)*1.05,Y+Math.sin(a)*1.05,Z+.1],[Math.cos(a+.2)*1.38,Y+Math.sin(a+.2)*1.38,Z+.1],.012,0xd8b050); }
      [[.5,ROT,GELB],[1.57,GELB,0x8a4a14],[2.65,0x3a74c0,WEISS],[3.75,ORANGE,GELB],[5.65,WEISS,GELB]].forEach(([a,f,m])=>{ const x=Math.cos(a)*.88, y=Y+Math.sin(a)*.88;
        for(let i=0;i<6;i++) ball(g,.105,f,x+Math.cos(i*1.047)*.13,y+Math.sin(i*1.047)*.13,Z+.28,1,1,.5); ball(g,.08,m,x,y,Z+.34);
        [-1,1].forEach(s=>{ const bl=ball(g,.14,LAUB,x+Math.cos(a+s*1.57)*.3,y+Math.sin(a+s*1.57)*.3,Z+.2,1.3,.55,.35); bl.rotation.z=a+s*1.57; }); });
      /* große rote Schleife unten */
      [-1,1].forEach(s=>{ const o=ball(g,.3,ROT,s*.32,Y-.9,Z+.36,1.15,.65,.3); o.rotation.z=s*.35;
        const b=box(g,.24,.95,.06,ROT,s*.28,Y-1.46,Z+.3); b.rotation.z=s*.28; const c=box(g,.07,.9,.065,GELB,s*.28,Y-1.46,Z+.305); c.rotation.z=s*.28; });
      ball(g,.16,ROT2,0,Y-.9,Z+.42); } },
  { x:-13.3, z:-4.5, dreh:.1, steh:[-12.5,-2.4], kasten:[5.0,1.7], treffer:[4.8,2.7,1.5], baue(g,k){ /* 3 Strohballen-Stapel */
      [-1.58,0,1.58].forEach((x,i)=>BH.ballen(g,x,0,(i%2)*.08,(i-1)*.03,1.5));
      [-.8,.8].forEach((x,i)=>BH.ballen(g,x,.82,0,i?-.06:.05,1.5));
      BH.ballen(g,.02,1.65,.03,.1,1.5);
      /* Stirnseiten mit Halmpunkten, Büschel an den Kanten */
      for(let i=0;i<70;i++){ const reihe=i%3, br=[2.3,1.5,.72][reihe]; const m=hell(box(g,.025,.26+zufall()*.16,.025,i%2?0xf8e488:STROH2,(zufall()-.5)*br*2,reihe*.82+.16+zufall()*.5,.56)); m.rotation.z=(zufall()-.5)*1.6; } } },
  { x:7.2, z:-10.8, steh:[7.2,-8.6], kasten:[1.8,2.2], treffer:[1.8,5.0,2.1], baue(g,k){ /* 4 Holzleiter, lehnt am Heuboden */
      const unten=1.05, oben=-1.1, hoch=5.0;
      [-1,1].forEach(s=>{ strich(g,[s*.68,.05,unten],[s*.5,hoch,oben],.1,HELLHOLZ); ball(g,.11,HELLHOLZ,s*.5,hoch,oben); box(g,.3,.14,.4,HOLZ3,s*.68,.07,unten-.02);
        /* Haken an der Bodenkante */
        box(g,.1,.1,.34,EISEN,s*.62,4.02,-.72); });
      for(let i=1;i<=9;i++){ const u=i/10, y=.05+(hoch-.05)*u, z=unten+(oben-unten)*u, b=.68-.18*u; quer(walze(g,.075,b*2+.14,HOLZ,0,y,z)); [-1,1].forEach(s=>ball(g,.055,HOLZ3,s*b,y,z+.1)); } } },
  { x:11.7, z:-3.9, dreh:-.38, steh:[11.0,-1.6], kasten:[2.9,2.3], treffer:[2.7,2.6,2.0], baue(g,k){ /* 5 Rundballen */
      const R=1.24, Y=1.24;
      flach(rohr(g,R,R,1.6,STROH,0,Y,0,28));
      [-.52,0,.52].forEach(z=>ring(g,R+.005,.035,0xa87c24,0,Y,z));
      [-1,1].forEach(s=>{ flach(walze(g,R*.96,.04,0xf2d46c,0,Y,s*.81));
        /* Spirale auf den runden Seiten */
        let alt=null; for(let i=0;i<=110;i++){ const a=i*.24, r=.08+i/110*1.05, p=[Math.cos(a)*r,Y+Math.sin(a)*r,s*.85]; if(alt) strich(g,alt,p,.032,0xa87a1e); alt=p; }
        ring(g,R-.03,.07,STROH2,0,Y,s*.8); });
      for(let i=0;i<110;i++){ const a=zufall()*6.28, m=hell(box(g,.025,.025,.3+zufall()*.35,i%2?0xf8e488:STROH2,Math.cos(a)*(R+.02),Y+Math.sin(a)*(R+.02),(zufall()-.5)*1.4)); m.rotation.y=(zufall()-.5)*.8; }
      [-1.05,1.05].forEach(x=>{ const q=box(g,.5,.28,1.4,HOLZ3,x,.14,0); q.rotation.z=x>0?.5:-.5; }); } },
  { x:.3, z:HINTEN, wand:'hinten', steh:[.3,-11.2], kasten:[4.5,.8], treffer:[4.5,2.5,.8], trefferY:.7, baue(g,k){ /* 6 Tafel Vom Korn zum Brot */
      box(g,4.3,2.1,.1,HOLZ3,0,1.95,.1);
      const b=new THREE.Mesh(new THREE.PlaneGeometry(4.0,1.75),basis(0xf4ecdc,{map:kornTafelBild()})); b.position.set(0,1.95,.17); g.add(b);
      [-1,1].forEach(s=>{ box(g,.2,2.16,.18,HELLHOLZ,s*2.1,1.95,.17); box(g,4.4,.18,.185,HELLHOLZ,0,1.95+s*.97,.17); });
      [-2.1,2.1].forEach(x=>[.98,2.92].forEach(y=>ball(g,.11,ROT,x,y,.28))); } },
  { x:-12.8, z:3.4, dreh:.18, steh:[-11.9,5.5], kasten:[3.4,2.2], treffer:[3.2,2.4,1.9], baue(g,k){ /* 7 Kornsäcke */
      /* zugebundener Sack: bauchig, enger Hals mit Strick, oben gerüscht */
      const zu=(x,z,gr,f)=>{ const s=gruppe(g,x,0,z); s.scale.setScalar(gr);
        dreher(s,[[0,0],[.52,.02],[.68,.22],[.7,.62],[.62,1.05],[.42,1.35],[.2,1.52],[.17,1.62],[.25,1.78],[.42,1.98],[.3,1.94],[0,1.82]],f,0,0,0);
        flach(ring(s,.2,.055,ROT2,0,1.58,0)); strich(s,[.1,1.58,.2],[.27,1.25,.52],.03,ROT2); strich(s,[0,1.58,.21],[.02,1.2,.56],.03,ROT2);
        /* aufgemalte Ähre */
        strich(s,[0,.34,.72],[0,.98,.67],.025,0x7a5210); [.62,.77,.92].forEach(y=>[-1,1].forEach(v=>{ const e=ball(s,.065,0x9a6a14,v*.09,y,.71-(y-.6)*.1,.75,1.5,.35); e.rotation.z=-v*.6; })); ball(s,.065,0x9a6a14,0,1.07,.64,.75,1.5,.35); };
      zu(-.9,-.15,1.1,SACK); zu(.55,-.42,1.0,SACK2);
      /* offener Sack mit umgekrempeltem Rand voller Körner */
      const o=gruppe(g,.55,0,.52);
      dreher(o,[[0,0],[.5,.02],[.64,.22],[.64,.6],[.56,.95],[.56,1.08]],SACK,0,0,0); flach(ring(o,.58,.1,0xe4c896,0,1.1,0));
      ball(o,.54,KORN,0,1.06,0,1,.52,1);
      const K=[]; for(let i=0;i<110;i++){ const a=zufall()*6.28, u=Math.sqrt(zufall())*.47; K.push([Math.cos(a)*u,1.08+.28*(1-u*u*3.2)+.02,Math.sin(a)*u,.04,.03,.065,i%3?0xf8d458:0xc88a1c,zufall()*6.28]); }
      /* verstreute Körner und Holzschaufel */
      for(let i=0;i<60;i++) K.push([.7+(zufall()-.3)*1.2,.03,.9+zufall()*.4,.04,.025,.065,i%2?0xf8d458:0xd89a24,zufall()*6.28]);
      BH.viele(o,GEO.sph,K.map(e=>[e[0]-(e[1]<.1?.55:0),e[1],e[2]-(e[1]<.1?.52:0),e[3],e[4],e[5],e[6],e[7]]));
      /* Ähren neben den Säcken */
      [[-.28,.1],[-.12,.28],[-.4,.34]].forEach(([x,z],i)=>{ strich(g,[x-.2,0,z+.3],[x+(i-1)*.18,1.25,z],.022,0xd8b050); for(let j=0;j<4;j++) ball(g,.065,j%2?0xf6d464:0xe8b438,x+(i-1)*.18+(j%2?.04:-.04),1.25+j*.09,z-j*.02,.8,1.5,.8); }); } },
  { x:.4, z:-5.4, steh:[.8,-3.1], r:1.5, treffer:[2.9,2.0,2.4], baue(g,k){ /* 8 Katze mit Kätzchen */
      /* rundes Strohnest */
      walze(g,1.3,.1,0xc89c34,0,.05,0); flach(ring(g,1.22,.19,STROH,0,.18,0));
      for(let i=0;i<90;i++){ const a=zufall()*6.28, r=.95+zufall()*.45, m=hell(box(g,.36+zufall()*.25,.025,.025,i%2?0xf8e488:STROH2,Math.cos(a)*r,.2+zufall()*.2,Math.sin(a)*r)); m.rotation.y=-a+1.57+(zufall()-.5)*.7; m.rotation.z=(zufall()-.5)*.4; }
      const tier=(x,y,z,d,gr,F,D,phase,wedel)=>{ const t=gruppe(g,x,y,z); t.rotation.y=d; t.scale.setScalar(gr); t.userData.lebendig=true; const r=gruppe(t,0,0,0), W=0xfff4e4;
        ball(r,.4,F,0,.4,-.1,1,1,1.05); ball(r,.31,F,0,.68,.08,1,1.15,.95); ball(r,.2,W,0,.62,.27,1,1.3,.6);
        [-.55,-.3].forEach(c=>ball(r,.3,D,0,.5,c+.1,1.1,1.0,.18));
        [-1,1].forEach(s=>{ strich(r,[s*.16,.6,.28],[s*.17,.08,.42],.085,F); ball(r,.11,W,s*.17,.08,.46,1,.7,1.25); ball(r,.2,F,s*.32,.22,.05,.85,.9,1.3); });
        const kopf=gruppe(t,0,1.14,.2), k2=gruppe(kopf,0,0,0);
        ball(k2,.34,F,0,0,0,1.08,.95,.95); [-1,1].forEach(s=>{ const o=kegel(k2,.14,.27,F,s*.22,.32,-.02); o.rotation.z=-s*.35; const i=kegel(k2,.075,.16,0xf0a0a8,s*.215,.31,.07); i.rotation.z=-s*.35;
          ball(k2,.082,0x8cd860,s*.135,.05,.29,1,1.1,.55); ball(k2,.05,SCHWARZ,s*.13,.05,.325,.8,1.15,.55); ball(k2,.02,basis(0xffffff),s*.115,.085,.355); ball(k2,.1,W,s*.075,-.12,.28,1.1,.8,.8);
          [-.03,.05].forEach(h2=>strich(k2,[s*.14,-.11,.34],[s*.5,-.11+h2,.32],.006,0xffffff)); strich(k2,[0,.19,.32],[s*.13,.25,.27],.018,D); });
        strich(k2,[0,.2,.32],[0,.31,.22],.02,D); ball(k2,.042,0xe86880,0,-.055,.355,1.2,.9,.8);
        verschmelze(r); verschmelze(k2);
        const sw=gruppe(t,.1,.2,-.45); strich(sw,[0,0,0],[.5,-.02,.05],.095,F); strich(sw,[.5,-.02,.05],[.62,.02,.5],.085,F); ball(sw,.1,D,.63,.02,.52); verschmelze(sw);
        k.anim.push(tt=>{ kopf.rotation.y=Math.sin(tt*.9+phase)*.3; kopf.rotation.z=Math.sin(tt*.6+phase*2)*.12; sw.rotation.y=Math.sin(tt*wedel+phase)*.3; r.scale.y=1+Math.sin(tt*2.2+phase)*.015; }); };
      tier(-.15,.12,-.28,.1,1.12,0xe8902c,0xb05c14,0,1.4);
      tier(-.82,.14,.45,.5,.5,0x9aa0a8,0x686e78,2,3.2);
      tier(.2,.14,.78,-.1,.46,0xf6ead4,0xc89860,4,2.6);
      tier(.9,.14,.28,-.55,.5,0xe8902c,0xb05c14,1,3.6); } },
  { x:11.3, z:4.1, dreh:-.12, steh:[9.7,6.0], kasten:[3.2,1.4], treffer:[3.0,3.2,1.2], baue(g,k){ /* 9 Eule auf dem Balken */
      [-1.2,1.2].forEach(x=>{ box(g,.26,1.2,.26,HOLZ2,x,.6,0); box(g,.5,.16,1.05,HOLZ3,x,.08,0); [-1,1].forEach(s=>strich(g,[x,.2,s*.45],[x,.7,s*.08],.065,HOLZ3)); strich(g,[x,.65,0],[x*.55,1.15,0],.07,HOLZ3); });
      quer(walze(g,.24,3.0,0x8a5a2e,0,1.32,0)); [-1.52,1.52].forEach(x=>{ quer(walze(g,.19,.03,HELLHOLZ,x,1.32,0)); quer(walze(g,.09,.045,0xa8743e,x,1.32,0)); });
      const E1=0x8a5c32, E2=0x5e3a1c, E3=0xf0dcb4;
      const eule=gruppe(g,0,1.5,0); eule.userData.lebendig=true; const r=gruppe(eule,0,0,0);
      ball(r,.5,E1,0,.6,0,1,1.18,.9); ball(r,.38,E3,0,.52,.19,.95,1.12,.75);
      for(let i=0;i<4;i++) for(let j=0;j<=i;j++){ const x=(j-i/2)*.17, y=.82-i*.17; ball(r,.045,0xa8784a,x,y,.19+.285*Math.sqrt(Math.max(0,1-(x/.36)**2-((y-.52)/.43)**2)),1.3,.7,.5); }
      [-1,1].forEach(s=>{ const f=ball(r,.3,E2,s*.45,.58,-.02,.45,1.45,.85); f.rotation.z=s*.2; [-.07,.07].forEach(a=>strich(r,[s*.17+a,.12,.12],[s*.17+a*1.5,-.04,.3],.035,ORANGE)); ball(r,.09,ORANGE,s*.17,.1,.12); });
      const sw=box(r,.42,.4,.1,E2,0,.12,-.38); sw.rotation.x=.45;
      verschmelze(r);
      const kopf=gruppe(eule,0,1.34,.02), k2=gruppe(kopf,0,0,0);
      ball(k2,.46,E1,0,0,0,1.08,.92,.92);
      [-1,1].forEach(s=>{ const o=kegel(k2,.13,.34,E2,s*.34,.42,-.02); o.rotation.z=-s*.5;
        ball(k2,.24,E3,s*.19,.0,.31,1,1.08,.55); flach(ring(k2,.17,.03,0xc88a40,s*.19,.02,.43)).rotation.x=0;
        ball(k2,.14,GELB,s*.19,.02,.42,1,1,.5); ball(k2,.082,SCHWARZ,s*.18,.02,.49,1,1,.5); ball(k2,.03,basis(0xffffff),s*.155,.06,.535); });
      const sn=kegel(k2,.085,.22,ORANGE,0,-.15,.45); sn.rotation.x=Math.PI-.35;
      verschmelze(k2);
      const lider=[-1,1].map(s=>{ const l=hell(ball(kopf,.15,E1,s*.19,.02,.49,1.05,1.05,.45)); l.visible=false; return l; });
      k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.7)*.5; kopf.rotation.z=Math.sin(t*.43)*.14; const zu=(t%4.3)<.18; lider.forEach(l=>l.visible=zu); eule.scale.y=1+Math.sin(t*1.8)*.012; }); } },
  { x:5.7, z:1.5, dreh:-.18, steh:[4.9,3.8], kasten:[4.4,2.3], treffer:[4.0,3.4,2.0], baue(g,k){ /* 10 Kornmühle */
      /* Gestell und Mahlkasten */
      [-1.15,.45].forEach(x=>[-.55,.55].forEach(z=>box(g,.2,.75,.2,HOLZ3,x,.38,z)));
      box(g,1.85,.16,1.35,HOLZ3,-.35,.74,0); box(g,1.75,1.05,1.25,HOLZ,-.35,1.34,0); box(g,1.9,.14,1.4,HOLZ3,-.35,1.93,0);
      [-1.2,.5].forEach(x=>box(g,.12,1.05,1.3,HELLHOLZ,x,1.34,0)); box(g,1.58,.12,.05,HELLHOLZ,-.35,1.62,.65);
      /* großer Trichter (viereckig, oben weit) voller Körner */
      const tr=rohr(g,.98,.32,.95,0xd0a468,-.35,2.47,0,4,true); tr.rotation.y=Math.PI/4;
      const rand=.7; [-1,1].forEach(s=>{ box(g,rand*2+.14,.13,.13,HOLZ3,-.35,2.96,s*rand); box(g,.13,.13,rand*2+.14,HOLZ3,-.35+s*rand,2.96,0);
        [-1,1].forEach(c=>strich(g,[-.35+s*.25,2.0,c*.25],[-.35+s*rand,2.95,c*rand],.05,HOLZ3)); });
      box(g,1.05,.08,1.05,KORN,-.35,2.76,0); ball(g,.5,KORN,-.35,2.79,0,1,.42,1);
      const K=[]; for(let i=0;i<90;i++){ const x=(zufall()-.5)*1.0, z=(zufall()-.5)*1.0, u=Math.min(1,(x*x+z*z)/.25); K.push([-.35+x,2.83+.18*(1-u),z,.04,.03,.065,i%3?0xf8d458:0xc88a1c,zufall()*6.28]); }
      BH.viele(g,GEO.sph,K);
      /* Rutsche vorn mit Mehlkiste */
      const ru=gruppe(g,-.55,1.1,.82); ru.rotation.x=.55; box(ru,.46,.06,.6,HELLHOLZ,0,0,0); [-.24,.24].forEach(x=>box(ru,.06,.18,.6,HOLZ2,x,.07,0));
      box(g,.95,.08,.65,HOLZ2,-.55,.06,1.0); [-.3,.3].forEach(z=>box(g,.95,.42,.07,HELLHOLZ,-.55,.28,1.0+z)); [-.46,.46].forEach(x=>box(g,.07,.42,.6,HOLZ,-.55+x,.28,1.0));
      ball(g,.4,WEISS,-.55,.34,1.0,1,.55,.65);
      const mehl=[0,1,2,3,4,5,6,7].map(i=>{ const m=hell(ball(g,.04,basis(0xfffaf0),-.55,1,1.1)); m.userData.lebendig=true; return m; });
      /* großes Holzrad rechts mit Kurbel */
      quer(walze(g,.1,.95,EISEN,.95,1.5,0));
      box(g,.18,1.45,.2,HOLZ3,1.38,.73,-.08); box(g,.4,.14,.8,HOLZ3,1.38,.08,-.08);
      flach(walze(g,.07,.85,EISEN,1.38,1.5,.35));
      const rad=gruppe(g,1.38,1.5,.78); rad.userData.lebendig=true; const rr=gruppe(rad,0,0,0);
      ring(rr,.9,.1,0x8a4a1c,0,0,0); ring(rr,.76,.035,EISEN,0,0,.04);
      for(let i=0;i<6;i++){ const a=i*Math.PI/3; strich(rr,[0,0,0],[Math.cos(a)*.86,Math.sin(a)*.86,0],.06,HELLHOLZ); ball(rr,.05,GOLD,Math.cos(a)*.9,Math.sin(a)*.9,.1); }
      flach(walze(rr,.2,.24,HOLZ3,0,0,0)); flach(walze(rr,.08,.3,GOLD,0,0,.03));
      flach(walze(rr,.07,.4,HOLZ3,.62,0,.22)); ball(rr,.1,ROT,.62,0,.43);
      verschmelze(rr);
      k.anim.push(t=>{ rad.rotation.z=-t*1.2; mehl.forEach((m,i)=>{ const u=(t*1.3+i/8)%1; m.position.set(-.55+Math.sin(i*2.4)*.1, .92-u*.45, 1.1+u*.06+Math.cos(i*1.7)*.05); m.scale.setScalar(.035+Math.sin(u*3.14)*.02); }); }); } }
];

return { titel:'Die Scheune', breite:36, tiefe:27, oben:['26,15,6','60,38,18','108,74,36'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Der Hühnerstall. Cremefarbener Putz über Holzvertäfelung, Strohboden, kleine Fenster mit rosa Morgenlicht,
   Balken, Strohballen, Heuraufe, Futterkisten und laufende Hühner.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die große Hühnerklappe in der Rückwand Mitte, sie klappt nach außen herunter wie eine Rampe; dahinter Hof und Traktorschuppen. */
RAEUME3D.bauernhof[2] = (function(){
const { ROT, ROT2, WEISS, CREME, GELB, ORANGE, BLAU, GRUEN, SCHWARZ, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, STROH, STROH2, LAUB, LAUB2, LAUB3 } = BH;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=0;                      /* Mitte der Hühnerklappe */
const BRAUN=0xa8622c, DUNKELHUHN=0x4a3a34, GOLDHUHN=0xd89a40, EIBRAUN=0xe0ac78, EIWEISS=0xfff6e6, ROSTROT=0x9a3a2a, TUERHOLZ=0xb06a34, TUERHOLZ2=0xc47c40;

const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze/Ring nach vorn bzw. flach legen */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const gedreht=(par,x,y,z,dreh)=>{ const g=gruppe(par,x,y,z); g.rotation.y=dreh||0; return g; };
const ei=(par,x,y,z,r,f,neig)=>{ const m=ball(par,r,f,x,y,z,1,1.32,1); m.rotation.z=neig||0; return m; };

/* ---------- Bilder ---------- */
/* Boden: gestampfte Erde mit kreuz und quer liegendem Stroh (kachelbar genug) */
function strohBodenBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#c49a5c'; g.fillRect(0,0,512,512);
    for(let i=0;i<500;i++){ g.fillStyle=i%2?'rgba(120,80,35,.2)':'rgba(250,220,150,.22)'; g.fillRect(zufall()*505,zufall()*505,3+zufall()*5,2+zufall()*4); }
    g.lineCap='round'; g.lineWidth=2.5;
    for(let i=0;i<650;i++){ g.strokeStyle=['rgba(244,214,128,.75)','rgba(214,172,88,.7)','rgba(255,232,160,.6)','rgba(150,112,50,.45)'][i%4];
      const x=12+zufall()*488, y=12+zufall()*488, a=zufall()*3.14, l=5+zufall()*9; g.beginPath(); g.moveTo(x-Math.cos(a)*l,y-Math.sin(a)*l); g.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l); g.stroke(); } });
}
/* kleines Fenster: rosa Morgenhimmel, aufgehende Sonne, Hügel */
function morgenBild(sonneX){
  return bild(256,224,(g)=>{ const v=g.createLinearGradient(0,0,0,180); v.addColorStop(0,'#a8b4ec'); v.addColorStop(.45,'#f6a8c0'); v.addColorStop(1,'#ffd8a8'); g.fillStyle=v; g.fillRect(0,0,256,224);
    const l=g.createRadialGradient(sonneX,160,6,sonneX,160,100); l.addColorStop(0,'rgba(255,250,200,1)'); l.addColorStop(1,'rgba(255,190,150,0)'); g.fillStyle=l; g.fillRect(0,40,256,184);
    g.fillStyle='#fff2a0'; g.beginPath(); g.arc(sonneX,160,30,0,7); g.fill();
    g.fillStyle='rgba(255,236,240,.85)'; [[60,48,34],[88,44,24],[188,76,28],[212,80,20]].forEach(([x,y,r])=>{ g.beginPath(); g.ellipse(x,y,r,r*.4,0,0,7); g.fill(); });
    g.fillStyle='#8cb468'; g.beginPath(); g.moveTo(0,176); g.quadraticCurveTo(70,140,140,176); g.quadraticCurveTo(200,146,256,168); g.lineTo(256,224); g.lineTo(0,224); g.fill();
    g.fillStyle='#5e9448'; g.beginPath(); g.moveTo(0,200); g.quadraticCurveTo(128,172,256,204); g.lineTo(256,224); g.lineTo(0,224); g.fill(); });
}
/* Blick durch die offene Klappe: Morgenhimmel über Hügeln, Feldern und Bäumen */
function hofBild(){
  return bild(1024,320,(g)=>{ const v=g.createLinearGradient(0,0,0,240); v.addColorStop(0,'#98b4f0'); v.addColorStop(.55,'#f8b0c4'); v.addColorStop(1,'#ffe0b0'); g.fillStyle=v; g.fillRect(0,0,1024,320);
    g.fillStyle='#fff2a8'; g.beginPath(); g.arc(640,200,44,0,7); g.fill();
    g.fillStyle='#8cb860'; g.beginPath(); g.moveTo(0,230); g.quadraticCurveTo(220,150,470,225); g.quadraticCurveTo(740,160,1024,215); g.lineTo(1024,320); g.lineTo(0,320); g.fill();
    g.fillStyle='#e8c868'; g.beginPath(); g.moveTo(0,266); g.quadraticCurveTo(300,215,620,266); g.lineTo(620,320); g.lineTo(0,320); g.fill();
    g.fillStyle='#5a9a44'; g.fillRect(0,282,1024,38);
    for(let i=0;i<14;i++){ const x=30+i*76+zufall()*20, y=250+zufall()*20; g.fillStyle='#6a4a28'; g.fillRect(x-4,y,8,34); g.fillStyle=i%2?'#3a7a34':'#4c8e3c'; g.beginPath(); g.arc(x,y-6,22+zufall()*12,0,7); g.fill(); } });
}
/* Strichliste: Tafel mit Eibildern und Zählstrichen, ohne Wörter */
function strichBild(){
  return bild(512,400,(g)=>{ g.fillStyle='#2c3e34'; g.fillRect(0,0,512,400);
    for(let i=0;i<120;i++){ g.fillStyle='rgba(255,255,255,.04)'; g.fillRect(zufall()*480,zufall()*390,10+zufall()*40,3+zufall()*8); }
    g.strokeStyle='rgba(255,255,255,.35)'; g.lineWidth=3; [108,204,300].forEach(y=>{ g.beginPath(); g.moveTo(24,y); g.lineTo(488,y); g.stroke(); }); g.beginPath(); g.moveTo(130,22); g.lineTo(130,378); g.stroke();
    const eiBild=(x,y,f)=>{ g.fillStyle=f; g.beginPath(); g.moveTo(x,y-34); g.bezierCurveTo(x+24,y-34,x+34,y+30,x,y+30); g.bezierCurveTo(x-34,y+30,x-24,y-34,x,y-34); g.fill(); g.fillStyle='rgba(255,255,255,.6)'; g.beginPath(); g.ellipse(x-10,y-12,5,10,.5,0,7); g.fill(); };
    [[60,'#fff2de',3],[156,'#e8b07a',5],[252,'#fff2de',7],[348,'#e8b07a',9]].forEach(([y,f,n])=>{ eiBild(76,y+1,f); g.strokeStyle='#f8fcf8'; g.lineWidth=8; g.lineCap='round';
      let x=166; for(let i=1;i<=n;i++){ if(i%5===0){ g.beginPath(); g.moveTo(x-102,y+18); g.lineTo(x-4,y-20); g.stroke(); x+=36; } else { g.beginPath(); g.moveTo(x+zufall()*4,y-30); g.lineTo(x-3+zufall()*4,y+30); g.stroke(); x+=24; } } }); });
}
/* Tafel Vom Ei zum Küken: vier Bilder mit Pfeilen, ohne Wörter */
function kuekenBild(){
  return bild(768,384,(g)=>{ g.fillStyle='#fff6dc'; g.fillRect(0,0,768,384);
    const feld=[['#ffe4ec',104],['#e0f0ff',292],['#e8f8d8',480],['#fff0c0',664]];
    feld.forEach(([f,x],i)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,192,i===3?96:82,0,7); g.fill(); g.fillStyle='#d8b058'; g.beginPath(); g.ellipse(x,264,64,13,0,0,7); g.fill(); });
    const pfeil=x=>{ g.fillStyle='#e8721c'; g.fillRect(x-14,184,18,16); g.beginPath(); g.moveTo(x+2,170); g.lineTo(x+22,192); g.lineTo(x+2,214); g.fill(); };
    [194,382,572].forEach(pfeil);
    const eiForm=(x,y,r,f)=>{ g.fillStyle=f; g.strokeStyle='#9a6a34'; g.lineWidth=5; g.beginPath(); g.moveTo(x,y-r*1.3); g.bezierCurveTo(x+r*.9,y-r*1.3,x+r*1.3,y+r,x,y+r); g.bezierCurveTo(x-r*1.3,y+r,x-r*.9,y-r*1.3,x,y-r*1.3); g.fill(); g.stroke(); };
    eiForm(104,214,46,'#f0c898');
    /* Ei mit Riss und Schnabel */
    eiForm(292,214,46,'#f0c898'); g.strokeStyle='#5a3414'; g.lineWidth=6; g.beginPath(); g.moveTo(252,200); [[266,184],[280,206],[294,182],[308,204],[322,184],[334,198]].forEach(p=>g.lineTo(p[0],p[1])); g.stroke(); g.fillStyle='#ee7c22'; g.beginPath(); g.moveTo(296,170); g.lineTo(330,160); g.lineTo(306,188); g.fill();
    const kreis=(x,y,r,f)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    const auge=(x,y,r)=>{ kreis(x,y,r,'#14100c'); kreis(x-r*.3,y-r*.3,r*.35,'#ffffff'); };
    /* Küken schlüpft aus der Schale */
    kreis(480,188,36,'#ffd830'); auge(468,180,6); auge(496,180,6); g.fillStyle='#ee7c22'; g.beginPath(); g.moveTo(472,194); g.lineTo(492,194); g.lineTo(482,208); g.fill();
    g.fillStyle='#fffaf0'; g.strokeStyle='#9a6a34'; g.lineWidth=5; g.beginPath(); g.moveTo(434,214); [[448,230],[462,210],[480,232],[496,210],[512,230],[526,214]].forEach(p=>g.lineTo(p[0],p[1])); g.quadraticCurveTo(522,266,480,266); g.quadraticCurveTo(438,266,434,214); g.fill(); g.stroke();
    /* fertiges Küken */
    g.strokeStyle='#ee7c22'; g.lineWidth=6; [-18,18].forEach(a=>{ g.beginPath(); g.moveTo(656+a,240); g.lineTo(656+a,262); g.lineTo(670+a,264); g.stroke(); });
    kreis(650,214,46,'#ffd830'); kreis(686,160,32,'#ffe048'); kreis(634,216,22,'#f2bc1c'); auge(696,152,7); g.fillStyle='#ee7c22'; g.beginPath(); g.moveTo(712,158); g.lineTo(742,168); g.lineTo(712,178); g.fill();
    g.fillStyle='#f2a0b4'; [[70,78],[330,74],[560,330],[200,326]].forEach(([x,y])=>{ for(let i=0;i<5;i++) kreis(x+Math.cos(i*1.257)*13,y+Math.sin(i*1.257)*13,9,'#f2a0b4'); kreis(x,y,8,'#ffd030'); });
  });
}

/* ---------- Ausgang: die große Hühnerklappe ---------- */
function baueKlappe(k,sc,hinten){
  /* Hof und Traktorschuppen dahinter */
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(20,5.4),basis(0xffffff,{map:hofBild()})); aus.position.set(AX,2.7,HINTEN-11.5); hinten.add(aus);
  const hof=gruppe(hinten,0,0,0);
  hell(box(hof,20,.04,11.2,0x6ea446,AX,-.035,HINTEN-6.0)); hell(box(hof,3.8,.02,9.4,0xdcc08c,AX,-.012,HINTEN-5.0));
  /* offener Schuppen mit Wellblechdach */
  const s=gruppe(hof,AX+.1,0,HINTEN-9.2);
  box(s,5.4,2.5,.2,0x8a5a34,0,1.25,-1.1); for(let i=0;i<10;i++) box(s,.08,2.5,.06,0x6a4020,-2.45+i*.55,1.25,-.97);
  [-2.7,2.7].forEach(a=>{ box(s,.24,2.6,.24,ROSTROT,a,1.3,.9); box(s,.2,2.5,2.0,0x9a6a3c,a,1.25,-.1); });
  const dach=gruppe(s,0,2.85,0); dach.rotation.x=.2; box(dach,6.2,.14,2.7,0x7c90a4,0,0,0); for(let i=0;i<16;i++) box(dach,.09,.08,2.72,0xa8bccc,-2.9+i*.387,.09,0);
  const tr=BH.traktor(hof,AX+.15,HINTEN-6.9,-.35); tr.g.scale.setScalar(.56);
  [-3.4,-2.7,2.8,3.5,4.2,-4.1].forEach((a,i)=>{ box(hof,.14,.85,.14,HELLHOLZ,AX+a,.42,HINTEN-3.6); if(i===1||i===5) box(hof,.7,.09,.07,HELLHOLZ,AX+a-.35,.62,HINTEN-3.6); if(i===2||i===3) box(hof,.7,.09,.07,HELLHOLZ,AX+a+.35,.62,HINTEN-3.6); });
  [[-2.5,-2.0],[2.4,-2.6],[-3.0,-5.4],[3.2,-5.8]].forEach(([a,c],i)=>{ ball(hof,.28,i%2?LAUB:LAUB2,AX+a,.18,HINTEN+c,1.2,.8,1); ball(hof,.08,i%2?GELB:0xf07a9a,AX+a+.1,.45,HINTEN+c+.15); });
  verschmelze(hof);
  /* Rahmen */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(v=>{ box(r,.36,4.0,.42,ROSTROT,v*1.78,2.0,.08); box(r,.48,.26,.5,HOLZ3,v*1.78,.13,.1); ball(r,.13,GOLD,v*1.78,3.6,.34); ball(r,.13,GOLD,v*1.78,.55,.34); });
  box(r,4.2,.38,.5,ROSTROT,0,4.0,.1);
  [-1,1].forEach(v=>{ const d=box(r,2.3,.17,.62,HOLZ3,v*1.02,4.52,.22); d.rotation.z=-v*.2; });
  /* rundes Schild mit gemaltem Huhn über der Klappe */
  flach(walze(r,.54,.1,CREME,0,4.9,.3)); ring(r,.54,.07,ROSTROT,0,4.9,.36);
  ball(r,.25,BRAUN,-.06,4.84,.38,1.25,.95,.25); ball(r,.14,BRAUN,.2,5.05,.39,1,1,.3); ball(r,.07,ROT,.2,5.2,.4,1.1,.9,.3); const schn=kegel(r,.055,.15,GELB,.38,5.04,.4); schn.rotation.z=-Math.PI/2; ball(r,.025,SCHWARZ,.23,5.08,.45); const schw=kegel(r,.13,.3,BRAUN,-.34,5.0,.38); schw.rotation.z=.8; schw.scale.z=.04; [-.12,.05].forEach(a=>box(r,.035,.17,.03,ORANGE,a,4.54,.39));
  verschmelze(r);
  /* Klappe: Drehpunkt unten, klappt nach außen herunter */
  const bl=gruppe(hinten,AX,.04,HINTEN-.06); bl.userData.lebendig=true;
  for(let i=0;i<7;i++) box(bl,3.12,.52,.08,i%2?TUERHOLZ2:TUERHOLZ,0,.29+i*.537,0);        /* quer liegende Bretter */
  [.62,1.16,2.95,3.5].forEach(y=>box(bl,2.5,.11,.05,HELLHOLZ,0,y,.05));                       /* Trittleisten wie bei einer Hühnerleiter */
  [-1,1].forEach(v=>{ box(bl,.17,3.76,.1,HOLZ3,v*1.47,1.9,.11); box(bl,.3,.62,.08,EISEN,v*.95,.34,.2); quer(walze(bl,.12,.62,EISEN,v*.95,.08,.18)); [.26,.52].forEach(y=>ball(bl,.055,METALL,v*.95,y,.26));
    ball(bl,.1,METALL,v*1.43,3.0,.2); });
  box(bl,.8,.13,.08,EISEN,0,3.68,.16);
  box(bl,1.5,1.1,.08,HOLZ3,0,2.05,.13);
  const schloss=BH.zahlenschloss(bl,0,1.96,.27); schloss.scale.setScalar(1.35); schloss.userData.lebendig=true; verschmelze(schloss);
  verschmelze(bl);
  /* zwei Ketten vom Rahmen zur Klappe: sie werden beim Herunterklappen länger */
  const ketten=[-1,1].map(v=>{ const q=gruppe(hinten,0,0,0); q.userData.lebendig=true; const glieder=[]; for(let i=0;i<10;i++){ const m=hell(ring(q,.095,.03,METALL,0,0,0)); glieder.push(m); }
    ball(hinten,.12,EISEN,AX+v*1.68,3.75,HINTEN+.34); const stange=hell(walze(q,.022,1,METALL,0,0,0)); return { v, glieder, stange }; });
  const spanne=(winkel)=>ketten.forEach(({v,glieder,stange})=>{ const A=[AX+v*1.68,3.75,HINTEN+.36], y=.04+3.0*Math.cos(winkel)-.2*Math.sin(winkel), z=HINTEN-.06+3.0*Math.sin(winkel)+.2*Math.cos(winkel), E=[AX+v*1.43,y,z];
    { const d=V(E[0]-A[0],E[1]-A[1],E[2]-A[2]), l=d.length()||1; stange.position.set((A[0]+E[0])/2,(A[1]+E[1])/2,(A[2]+E[2])/2); stange.scale.set(.022,l,.022); if(stange.quaternion.setFromUnitVectors) stange.quaternion.setFromUnitVectors(V(0,1,0),d.multiplyScalar(1/l)); }
    glieder.forEach((m,i)=>{ const u=(i+.5)/glieder.length; m.position.set(A[0]+(E[0]-A[0])*u, A[1]+(E[1]-A[1])*u, A[2]+(E[2]-A[2])*u); m.rotation.y=i%2?1.35:.2; }); });
  spanne(0);
  const glanz=schein(hinten,'rgba(255,225,110,.4)',AX,2.1,HINTEN+.75,1.2);
  k.kasten(AX,-13.15,3.9,.8); /* geschlossene Klappe: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Große Hühnerklappe', einfach:'Große Klappe', steh:[AX,-11.2], durch:[AX,-15.8],
    treffer:{x:AX,y:2.1,z:-12.95,b:3.7,h:4.2,t:.9}, schildOben:[AX,5.0,-12.2], glanz:[AX,2.1,-12.7], losNach:1.5,
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.05)/.88)), w=-1.555*a*a*(3-2*a); bl.rotation.x=w; spanne(w); schloss.visible=a<.6; /* offenes Schloss fällt weg, die Rampe bleibt frei */ glanz.visible=auf<.05; } });
}

/* ---------- Wandschmuck ---------- */
function fenster(par,x,y,z,dreh,sonneX){
  const f=gedreht(par,x,y,z,dreh);
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.3),basis(0xffffff,{map:morgenBild(sonneX)})); aus.position.set(0,0,.05); f.add(aus);
  [-1,1].forEach(s=>box(f,.17,1.6,.22,HOLZ,s*.82,0,.11));
  box(f,1.82,.17,.22,HOLZ,0,.73,.11); box(f,2.04,.15,.44,HOLZ,0,-.73,.22);
  box(f,.07,1.3,.08,HOLZ,0,0,.1); box(f,1.5,.07,.08,HOLZ,0,.08,.1);
  /* rosa Vorhang oben */
  strich(f,[-1.05,.92,.26],[1.05,.92,.26],.04,HOLZ3);
  for(let i=0;i<8;i++){ const a=-.84+i*.24; box(f,.22,.24,.06,i%2?0xf27a98:WEISS,a,.8,.28); ball(f,.11,i%2?0xf27a98:WEISS,a,.68,.28,1,.8,.3); }
  rohr(f,.14,.1,.2,0xc0643a,-.55,-.55,.3,10); ball(f,.14,LAUB2,-.55,-.4,.3); [[-.62,-.3],[-.48,-.34],[-.55,-.24]].forEach(([a,b])=>ball(f,.055,0xf05a7a,a,b,.38));
  schein(f,'rgba(255,150,160,.3)',0,0,.35,3.1);
  verschmelze(f);
}
function laterne(par,x,y,z,dreh){
  const g=gedreht(par,x,y,z,dreh);
  box(g,.28,.44,.07,EISEN,0,.3,.05); strich(g,[0,.4,.06],[0,.6,.44],.035,EISEN); strich(g,[0,.6,.44],[0,.4,.44],.022,EISEN);
  kegel(g,.3,.2,ROSTROT,0,.32,.44); box(g,.28,.38,.28,basis(0xffdc88),0,.04,.44); [-.15,.15].forEach(a=>[-.15,.15].forEach(c=>box(g,.045,.42,.045,EISEN,a,.04,.44+c))); box(g,.38,.07,.38,EISEN,0,-.19,.44);
  schein(g,'rgba(255,205,130,.45)',0,.05,.58,1.4);
  verschmelze(g);
}
/* Bund aus Zwiebeln bzw. Maiskolben zum Trocknen */
function bund(par,x,y,z,dreh,mais){
  const g=gedreht(par,x,y,z,dreh);
  box(g,1.5,.14,.14,HOLZ3,0,.55,.08);
  [-.45,0,.45].forEach((a,i)=>{ strich(g,[a,.55,.18],[a,.2,.22],.025,STROH2);
    if(mais){ ball(g,.13,GELB,a,-.12,.24,1,2.3,1); [-1,1].forEach(v=>{ const bl=ball(g,.1,STROH,a+v*.1,.06,.24,.6,2.2,.5); bl.rotation.z=v*.45; }); }
    else for(let j=0;j<4;j++){ const q=.12-j*.22-(i%2)*.06, u=a+(j%2?.1:-.1); ball(g,.15,j%2?0xd8903a:0xc06a30,u,q,.24); kegel(g,.05,.12,STROH,u,q+.18,.24); } });
  verschmelze(g);
}
/* Hängebrett mit Gießkanne, Töpfen und Bürste */
function wandbrett(par,x,y,z,dreh){
  const g=gedreht(par,x,y,z,dreh);
  box(g,2.6,.12,.5,HELLHOLZ,0,0,.27); [-1.05,1.05].forEach(a=>strich(g,[a,-.55,.06],[a,-.05,.42],.05,HOLZ3));
  rohr(g,.26,.28,.44,0x3a8a6a,-.8,.28,.28); strich(g,[-.58,.2,.28],[-.28,.5,.28],.05,0x3a8a6a); ball(g,.08,0x2a6a50,-.27,.52,.28); ring(g,.2,.035,0x2a6a50,-.8,.52,.28,Math.PI);
  [[.25,0xc0643a],[.85,0xd8804a]].forEach(([a,f])=>{ rohr(g,.2,.14,.3,f,a,.21,.28,12); flach(ring(g,.2,.035,f,a,.36,.28)); ball(g,.17,LAUB2,a,.46,.28,1,.7,1); [-.09,.08].forEach(v=>ball(g,.06,a>.5?GELB:0xf07a9a,a+v,.58,.32)); });
  verschmelze(g);
}

/* ---------- Deko am Boden (nichts davon ist ein Gegenstand) ---------- */
function strohstapel(par,x,z,dreh,hoch){
  const g=gedreht(par,x,0,z,dreh);
  BH.ballen(g,0,0,0,0,2.0); if(hoch>1) BH.ballen(g,.15,.82,-.02,.1,1.7); if(hoch>2) BH.ballen(g,-.05,1.64,0,-.12,1.2);
}
function futterkiste(par,x,z,dreh,farbe){
  const g=gedreht(par,x,0,z,dreh);
  box(g,2.0,1.0,1.0,farbe,0,.58,0); [-.85,.85].forEach(a=>box(g,.2,.16,1.02,HOLZ3,a,.08,0));
  const d=box(g,2.14,.16,1.14,HOLZ2,0,1.18,-.02); d.rotation.x=.07;
  [-.66,.66].forEach(a=>box(g,.14,1.02,1.04,HOLZ3,a,.6,0)); box(g,.26,.3,.07,GOLD,0,.98,.54);
}
function fass(par,x,z,farbe){
  const g=gruppe(par,x,0,z), f=farbe||HOLZ;
  rohr(g,.56,.46,.65,f,0,.33,0); rohr(g,.46,.56,.65,f,0,.98,0); walze(g,.5,.1,HOLZ2,0,1.34,0); box(g,.5,.08,.12,HOLZ3,0,1.43,0);
  [.14,.55,.76,1.18].forEach(y=>flach(ring(g,y>.4&&y<1?.55:.5,.035,EISEN,0,y,0)));
}
/* zugebundener Getreidesack: bauchig, schmaler Hals mit Schnur, abstehender Zipfel */
function sack(par,x,z,dreh){
  const g=gedreht(par,x,0,z,dreh), J=0xcaa86c, J2=0xb08c52;
  ball(g,.52,J,0,.4,0,1.05,.8,.92); rohr(g,.34,.52,.55,J,0,.68,0,12); rohr(g,.13,.34,.34,J,0,1.1,0,12);
  rohr(g,.3,.12,.3,J2,0,1.4,0,7); [[-.2,.5],[.18,-.6],[.02,.15]].forEach(([a,n])=>{ const o=kegel(g,.11,.28,J,a,1.56,0); o.rotation.z=n; o.scale.z=.05; });
  flach(ring(g,.15,.045,ROT,0,1.27,0)); [-1,1].forEach(v=>strich(g,[0,1.26,.17],[v*.17,1.0,.34],.022,ROT));
  [-1,1].forEach(v=>ball(g,.17,J,v*.45,.13,.2,1.1,.75,1));
  strich(g,[0,.28,.49],[0,.8,.45],.022,0x5a7a2a); [.5,.62,.74].forEach(y=>[-1,1].forEach(v=>ball(g,.055,0x5a7a2a,v*.08,y,.485-(y-.5)*.1,1.4,.8,.4)));
}
function eimerstapel(par,x,z){
  const g=gruppe(par,x,0,z);
  [[-.22,.0,0x8a9aaa],[.3,.28,0x5a90c0]].forEach(([a,c,f])=>{ rohr(g,.34,.25,.55,f,a,.28,c,14); flach(ring(g,.34,.035,METALL2,a,.56,c)); walze(g,.31,.02,0x4a5058,a,.55,c); ring(g,.33,.02,METALL2,a,.56,c,Math.PI); });
}
function besen(par,x,z,dreh){
  const g=gedreht(par,x,0,z,dreh);
  [[-.25,0],[.3,.14]].forEach(([a,c],i)=>{ strich(g,[a,.55,c],[a*1.2,2.6,-.25],.05,i?HELLHOLZ:HOLZ); ball(g,.07,HOLZ3,a*1.2,2.62,-.25);
    rohr(g,.1,.3,.55,i?STROH:STROH2,a,.3,c,10); [.46,.56].forEach(y=>flach(ring(g,.14+(.56-y)*.4,.025,ROSTROT,a,y,c))); });
}
function kistenturm(par,x,z,dreh){
  const g=gedreht(par,x,0,z,dreh);
  const kiste=(a,y,c,d)=>{ const q=gedreht(g,a,y,c,d); box(q,1.2,.8,1.0,HELLHOLZ,0,.4,0); [.1,.7].forEach(h=>box(q,1.24,.12,1.04,HOLZ2,0,h,0)); [-.56,.56].forEach(v=>[-.46,.46].forEach(w=>box(q,.14,.82,.14,HOLZ,v,.41,w))); strich(q,[-.45,.18,.53],[.45,.62,.53],.045,HOLZ2); };
  kiste(-.65,0,0,.05); kiste(.65,0,.05,-.08); kiste(-.05,.82,0,.15);
}
function blumentopf(par,x,z){
  const g=gruppe(par,x,0,z);
  rohr(g,.4,.27,.52,0xc8683a,0,.26,0); flach(ring(g,.4,.05,0xa04a24,0,.52,0));
  [[-.2,.92,0,0xf05a7a],[.17,1.07,-.1,GELB],[.07,.85,.23,0xf8a0c0],[-.05,1.16,-.17,WEISS]].forEach(([a,y,c,f])=>{ strich(g,[0,.46,0],[a,y,c],.028,LAUB3); for(let i=0;i<5;i++) ball(g,.085,f,a+Math.cos(i*1.257)*.11,y,c+Math.sin(i*1.257)*.11,1,.5,1); ball(g,.065,ORANGE,a,y+.04,c); ball(g,.14,LAUB,a*.6,.62,c*.6,1.2,.4,.8); });
}
/* Heuraufe an der Wand (Blick nach +z) */
function heuraufe(par,x,z,dreh){
  const g=gedreht(par,x,0,z,dreh);
  [-1.35,1.35].forEach(a=>box(g,.16,2.5,.16,HOLZ3,a,1.25,-.35));
  box(g,2.9,.14,.14,HOLZ,0,2.1,.42); box(g,2.9,.14,.14,HOLZ,0,1.0,-.2); [-1.35,1.35].forEach(a=>strich(g,[a,2.1,-.35],[a,2.1,.42],.06,HOLZ));
  for(let i=0;i<8;i++){ const a=-1.19+i*.34; strich(g,[a,1.0,-.2],[a,2.1,.42],.04,HELLHOLZ); }
  for(let i=0;i<16;i++) ball(g,.24+zufall()*.1,i%2?0xc8b850:0xe0c864,-1.1+(i%8)*.31,1.55+(i>7?.45:0)+zufall()*.12,-.12+(i>7?.1:0),1.2,.9,.9);
  for(let i=0;i<40;i++){ const h=box(g,.03,.35+zufall()*.25,.03,i%2?STROH:0xc8b850,(zufall()-.5)*2.5,2.15+zufall()*.2,-.1+(zufall()-.5)*.5); h.rotation.z=(zufall()-.5)*1.6; }
  BH.ballen(g,0,0,-.05,0,1.7);
}
/* Holzpfosten mit Fuß und Streben */
function pfosten(k,x,z){
  const g=gruppe(k.scene,x,0,z);
  box(g,.44,6.3,.44,HOLZ,0,3.15,0); box(g,.7,.3,.7,0x9a9288,0,.15,0); box(g,.6,.18,.6,HOLZ3,0,6.24,0);
  [-1,1].forEach(s=>{ strich(g,[0,4.9,0],[s*.85,6.1,0],.1,HOLZ2); });
  box(g,.5,.12,.5,ROSTROT,0,1.5,0);
  verschmelze(g); k.kreis(x,z,.38); k.verdecker(g,x,z,.5);
}

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  const h=BH.huelle(k,{ B,T,H, dunkel:0x2a1a1c, himmelLicht:0xffe4e0, grund:0x6a4c38, staerke:.76, sonne:0xffc0b0, sonneStaerke:.36,
    wandBild:BH.putzBild('#f4e6d2'), bodenBild:strohBodenBild(), bodenWdh:[B/7,T/7], leiste:0x8a5a2a, sockel:1.7, sockelFarbe:0xb8864a, oeffnung:{x:AX,b:3.2,h:3.84} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueKlappe(k,sc,hinten);

  /* ---------- Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  [[-12.2,90],[-3.15,170],[3.15,80],[15.2,150]].forEach(([x,s])=>fenster(dh,x,4.0,HINTEN,0,s));
  laterne(dh,-9.4,3.5,HINTEN); laterne(dh,8.35,3.5,HINTEN);
  bund(dh,-15.3,3.0,HINTEN,0,true);
  /* Fachwerkbalken */
  const bk=gruppe(dh,0,0,0);
  [[-9.9,0],[-17.7,0],[8.35,4.3],[13.9,0],[17.7,0]].forEach(([x,ab])=>box(bk,.28,H-ab,.2,0xa87a4a,x,ab+(H-ab)/2,HINTEN+.09));
  box(bk,B,.3,.26,0xa87a4a,0,5.75,HINTEN+.12);
  [-17.7,-9.9,13.9,17.7].forEach(x=>[-1,1].forEach(s=>{ if(Math.abs(x+s)<17.8) strich(bk,[x,4.9,HINTEN+.16],[x+s*.85,5.65,HINTEN+.16],.085,0x8a5a2a); }));
  /* ---------- Seitenwände ---------- */
  const seite=(wand,v)=>{ const g=gruppe(wand,0,0,0), X=v*B/2, D=-v*Math.PI/2;
    fenster(g,X,4.0,v<0?-7.6:-2.6,D,110); fenster(g,X,4.0,v<0?5.6:7.4,D,160);
    laterne(g,X,3.5,v<0?-11.2:-8.2,D); laterne(g,X,3.5,v<0?9.6:2.4,D);
    if(v<0){ bund(g,X,3.2,.2,D,false); wandbrett(g,X,3.3,11.9,D); bund(g,X,3.2,2.4,D,true); }
    else { wandbrett(g,X,3.0,-5.4,D); bund(g,X,3.2,.4,D,false); wandbrett(g,X,3.2,11.0,D); bund(g,X,3.2,-11.2,D,true); }
    const b=gruppe(g,0,0,0); [-13.2,-4.6,4.0,13.2].forEach(z=>box(b,.2,H,.28,0xa87a4a,X-v*.09,H/2,z)); box(b,.26,.3,T,0xa87a4a,X-v*.12,5.75,0);
    [-4.6,4.0].forEach(z=>[-1,1].forEach(s=>strich(b,[X-v*.16,4.9,z],[X-v*.16,5.65,z+s*.85],.085,0x8a5a2a))); verschmelze(b); ohneSchatten(g); };
  seite(links,-1); seite(rechts,1);
  verschmelze(bk); ohneSchatten(dh);

  /* ---------- Möbel und Deko am Boden ---------- */
  const v=gruppe(sc,0,0,0), LD=Math.PI/2, RD=-Math.PI/2;
  /* hinten */
  strohstapel(v,-16.4,-12.65,0,3); k.kasten(-16.4,-12.65,2.2,1.2);
  strohstapel(v,-14.1,-12.7,0,1); k.kasten(-14.1,-12.7,2.1,1.1);
  futterkiste(v,-11.2,-12.75,0,0x4a8a6a); k.kasten(-11.2,-12.75,2.2,1.2);
  fass(v,-3.15,-12.75); k.kreis(-3.15,-12.75,.6);
  eimerstapel(v,3.1,-12.8); k.kasten(3.15,-12.65,1.3,1.0);
  sack(v,8.35,-12.75,0); k.kreis(8.35,-12.75,.55);
  strohstapel(v,14.7,-12.7,0,2); k.kasten(14.7,-12.7,2.2,1.1);
  fass(v,16.95,-12.5,0x9a5a34); k.kreis(16.95,-12.5,.6);
  /* links */
  strohstapel(v,-17.15,-9.4,LD,2); k.kasten(-17.15,-9.4,1.2,2.2);
  heuraufe(v,-17.3,-4.2,LD); k.kasten(-17.2,-4.2,1.3,3.1);
  sack(v,-17.2,-.9,LD); sack(v,-17.25,.35,LD+.3); k.kasten(-17.22,-.27,1.2,2.4);
  futterkiste(v,-17.2,3.9,LD,0xa8503a); k.kasten(-17.2,3.9,1.2,2.2);
  fass(v,-17.2,6.6); fass(v,-17.2,7.9,0x9a5a34); k.kasten(-17.2,7.25,1.2,2.5);
  strohstapel(v,-17.1,10.8,LD,3); k.kasten(-17.1,10.8,1.2,2.3);
  /* rechts */
  fass(v,17.2,-9.7); sack(v,17.2,-8.4,RD); k.kasten(17.2,-9.05,1.2,2.4);
  futterkiste(v,17.2,-5.3,RD,0x35608a); k.kasten(17.2,-5.3,1.2,2.2);
  kistenturm(v,17.2,-.7,RD); k.kasten(17.15,-.7,1.4,2.7);
  besen(v,17.15,3.2,RD); k.kasten(17.1,3.2,1.0,1.3);
  eimerstapel(v,17.0,5.1); k.kasten(17.05,5.25,1.3,1.1);
  strohstapel(v,17.1,8.9,RD,2); k.kasten(17.1,8.9,1.2,2.2);
  blumentopf(v,17.1,11.6); k.kreis(17.1,11.6,.5);
  /* vorn (niedrig) */
  strohstapel(v,-12.6,12.4,.05,1); k.kasten(-12.6,12.4,2.3,1.2);
  blumentopf(v,-9.6,12.4); k.kreis(-9.6,12.4,.5);
  futterkiste(v,-5.8,12.4,Math.PI,0x4a8a6a); k.kasten(-5.8,12.4,2.2,1.2);
  fass(v,-1.6,12.4); k.kreis(-1.6,12.4,.6);
  strohstapel(v,2.6,12.4,-.06,1); k.kasten(2.6,12.4,2.3,1.2);
  kistenturm(v,7.6,12.3,0); k.kasten(7.6,12.3,2.7,1.3);
  blumentopf(v,10.8,12.4); k.kreis(10.8,12.4,.5);
  strohstapel(v,13.8,12.4,.08,1); k.kasten(13.8,12.4,2.3,1.2);
  verschmelze(v);
  pfosten(k,-13.5,-1.4); pfosten(k,14.7,-8.6);

  /* flaches Stroh auf dem Boden (nicht fest, dezent) */
  const halme=[];
  for(let i=0;i<460;i++){ const rand=i%3===0, x=(zufall()-.5)*34.6, z=rand?(zufall()<.5?-1:1)*(10.4+zufall()*2.6):(zufall()-.5)*25.6; halme.push([x,.015+zufall()*.012,z,.16+zufall()*.2,.012,.022,[0xdcb45c,0xcca24c,0xe4c470][i%3],zufall()*3.14]); }
  BH.viele(sc,GEO.box,halme);

  /* ---------- Licht ---------- */
  flacker(k,-8.0,3.9,-10.6,0xffb4a0,.32,13); flacker(k,8.0,3.9,-10.6,0xffb4a0,.32,13);
  flacker(k,0,4.4,-9.4,0xffd8a8,.18,10); flacker(k,-14.6,3.8,3.0,0xffc080,.28,13); flacker(k,14.6,3.8,3.0,0xffc080,.28,13);

  /* ---------- laufende, pickende Hühner ---------- */
  [ [[[-3.4,-9.6],[-2.2,-6.8],[-3.4,-5.4],[-7.0,-8.2],[-6.6,-9.8]], WEISS, .8, 0],
    [[[2.4,-9.5],[6.2,-9.8],[6.4,-6.6],[2.6,-5.6]], BRAUN, .7, 5],
    [[[-14.9,1.4],[-10.8,3.4],[-11.0,7.2],[-14.8,6.2]], DUNKELHUHN, .75, 3],
    [[[10.2,4.2],[14.6,3.4],[14.8,7.0],[10.6,8.6]], GOLDHUHN, .65, 8]
  ].forEach(([weg,farbe,tempo,start],i)=>{ const hu=BH.huhn(k,sc,weg[0][0],0,weg[0][1],0,{ farbe, gr:.95, phase:i*1.9 }); laeufer(k,hu.g,weg,tempo,start,10); });

  return { tuer, start:[-1.0,.6] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.8,-10.4],[-8.4,-10.0],[-4.2,-7.4],[3.8,-7.6],[8.0,-9.6],[14.8,-10.0],[-14.8,-6.4],[-7.4,-5.0],[1.8,-3.8],[7.4,-3.6],
  [15.2,-2.4],[-15.2,2.8],[-10.4,.2],[-3.4,3.8],[2.4,5.2],[8.4,3.2],[15.2,1.2],[-13.8,9.6],[-4.2,9.4],[8.6,9.8]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-6.35, z:HINTEN, wand:'hinten', steh:[-6.35,-11.2], kasten:[4.3,1.6], treffer:[4.2,2.8,1.1], trefferY:1.05, baue(g,k){ /* 1 Legenester */
      box(g,3.9,2.0,.12,0x8a5c30,0,2.35,.08);
      box(g,4.1,.18,.95,HOLZ,0,1.36,.5); box(g,4.1,.16,.9,HOLZ,0,3.38,.48);
      [-1.95,-.65,.65,1.95].forEach(a=>box(g,.16,2.0,.86,HELLHOLZ,a,2.37,.46));
      [-1,1].forEach(s=>{ const d=box(g,2.2,.14,1.05,ROSTROT,s*1.03,3.71,.5); d.rotation.z=-s*.22; });
      [-1.7,1.7].forEach(a=>strich(g,[a,.7,.06],[a,1.3,.75],.07,HOLZ3));
      /* Sitzleiste davor */
      quer(walze(g,.07,4.0,HOLZ2,0,1.2,1.08)); [-1.8,0,1.8].forEach(a=>strich(g,[a,1.3,.9],[a,1.2,1.08],.045,HOLZ2));
      [-1.3,0,1.3].forEach((a,i)=>{
        box(g,1.14,.2,.1,HOLZ2,a,1.54,.9);
        ball(g,.52,STROH2,a,1.55,.5,1.05,.35,.75);
        for(let j=0;j<22;j++){ const s=box(g,.34+zufall()*.2,.025,.025,j%2?STROH:0xf6dc80,a+(zufall()-.5)*.65,1.62+zufall()*.1,.45+zufall()*.45); s.rotation.set(0,(zufall()-.5)*1.4,(zufall()-.5)*.8); }
        if(i!==1){ [[-.24,.65,EIWEISS,.35],[.06,.76,EIBRAUN,-.2],[.27,.55,i?EIBRAUN:EIWEISS,-.4]].forEach(([u,c,f,n])=>ei(g,a+u,1.86,c,.19,f,n)); } });
      const henne=BH.huhn(k,g,-.1,1.43,.6,-.8,{ farbe:0xc0522a, gr:1.38, pickt:false });
      k.anim.push(t=>{ henne.kopf.rotation.y=Math.sin(t*.9)*.45; henne.kopf.rotation.z=Math.max(0,Math.sin(t*2.7))*.1; });
      /* kleine Herzen am Dach */
      [-1.3,1.3].forEach(a=>{ [-.07,.07].forEach(u=>ball(g,.09,ROT,a+u,3.4,.96,1,1,.35)); const s=kegel(g,.14,.18,ROT,a,3.28,.96); s.rotation.x=Math.PI; s.scale.z=.03; }); } },
  { x:5.9, z:HINTEN, wand:'hinten', steh:[5.9,-11.2], kasten:[3.3,.8], treffer:[3.2,3.0,.8], trefferY:1.25, baue(g,k){ /* 2 Eier-Strichliste */
      box(g,3.0,2.46,.08,HOLZ3,0,2.85,.1); BH.tafel(g,strichBild(),2.76,2.16,0,2.85,.16);
      [-1,1].forEach(s=>box(g,.17,2.6,.2,HELLHOLZ,s*1.47,2.85,.17)); [1.6,4.1].forEach(y=>box(g,3.12,.17,.2,HELLHOLZ,0,y,.17));
      box(g,3.0,.1,.4,HOLZ,0,1.5,.28);
      [[-.9,WEISS],[-.55,GELB],[-.2,0xf8a0b8]].forEach(([a,f])=>quer(walze(g,.05,.28,f,a,1.6,.34)));
      box(g,.55,.2,.24,ROSTROT,.85,1.66,.32); box(g,.57,.09,.26,0xe8e0d0,.85,1.58,.32);
      strich(g,[-1.0,4.15,.18],[0,4.62,.12],.025,HOLZ3); strich(g,[1.0,4.15,.18],[0,4.62,.12],.025,HOLZ3); ball(g,.1,GOLD,0,4.62,.17); } },
  { x:-5.6, z:-2.9, steh:[-5.4,-.7], kasten:[3.7,2.5], treffer:[3.6,1.9,2.4], baue(g,k){ /* 3 Futtertrog */
      /* gekreuzte Füße an beiden Enden */
      [-1.5,1.5].forEach(a=>{ [-1,1].forEach(s=>strich(g,[a,.06,.35+s*.6],[a,.8,.35-s*.45],.09,HOLZ3)); });
      box(g,3.2,.12,.5,HOLZ2,0,.45,.35);
      [-1,1].forEach(s=>{ const w=gruppe(g,0,.68,.35+s*.4); w.rotation.x=s*.55; box(w,3.4,.55,.11,s>0?HOLZ:HELLHOLZ,0,0,0); box(w,3.46,.09,.15,HOLZ2,0,.29,0); });
      [-1.68,1.68].forEach(a=>{ box(g,.14,.5,.8,HOLZ2,a,.7,.35); box(g,.2,.1,1.1,HOLZ3,a,.96,.35); });
      box(g,3.2,.16,.82,0xd89830,0,.78,.35);
      for(let i=0;i<130;i++){ const u=(zufall()-.5)*3.05, w=(zufall()-.5)*.74; ball(g,.055+zufall()*.025,[GELB,0xf0b838,0xf8dc70,0xc88428][i%4],u,.87+(1-Math.abs(w)*2)*.1+zufall()*.04,.35+w,1.3,.8,1); }
      for(let i=0;i<26;i++) ball(g,.045,i%2?GELB:0xf0b838,(zufall()-.5)*3.2,.03,1.05+zufall()*.25,1.3,.6,1);
      BH.huhn(k,g,-.9,0,-.75,-1.15,{ farbe:WEISS, gr:1.25, phase:.4 });
      BH.huhn(k,g,.85,0,-.75,-1.95,{ farbe:BRAUN, gr:1.2, phase:2.9 }); } },
  { x:4.5, z:-2.9, steh:[4.2,-.8], r:1.2, treffer:[2.4,2.9,2.2], baue(g,k){ /* 4 Eierkorb */
      /* runder Schemel */
      walze(g,1.0,.16,HOLZ,0,.5,0); [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.785; strich(g,[Math.cos(a)*.75,.45,Math.sin(a)*.75],[Math.cos(a)*.95,.03,Math.sin(a)*.95],.11,HOLZ2); });
      const WEIDE=0xb8782c, WEIDE2=0x8a521c, WEIDE3=0xd89a48;
      rohr(g,.95,.68,.78,WEIDE2,0,.98,0,24,true);
      [0,1,2,3,4].forEach(i=>flach(ring(g,.7+i*.064,.065,i%2?WEIDE:WEIDE3,0,.64+i*.17,0)));
      for(let i=0;i<18;i++){ const a=i*Math.PI/9; strich(g,[Math.cos(a)*.72,.6,Math.sin(a)*.72],[Math.cos(a)*1.0,1.37,Math.sin(a)*1.0],.035,WEIDE); }
      flach(ring(g,1.0,.11,WEIDE,0,1.38,0)); walze(g,.68,.06,WEIDE2,0,.62,0);
      walze(g,.88,.1,STROH,0,1.22,0);
      /* gehäufte Eier */
      [[8,.66,1.42],[5,.36,1.64],[1,0,1.86]].forEach(([n,r,y],s)=>{ for(let i=0;i<n;i++){ const a=i*Math.PI*2/n+s*.5; ei(g,Math.cos(a)*r,y,Math.sin(a)*r,.23,(i+s)%3?EIWEISS:EIBRAUN,(i%2?.5:-.45)); } });
      /* Bügel quer über den Korb */
      const b=ring(g,1.02,.08,WEIDE2,0,1.38,-.06,Math.PI); b.scale.y=1.28;
      /* rot-weißes Tuch am Rand */
      [-.3,-.1,.1,.3].forEach((a,i)=>{ box(g,.2,.52,.05,i%2?ROT:WEISS,a,1.18,1.03).rotation.x=-.28; }); box(g,.82,.07,.2,ROT,0,1.46,.97); } },
  { x:11.8, z:-4.4, steh:[11.3,-2.68], kasten:[3.8,2.2], treffer:[3.6,3.3,2.0], baue(g,k){ /* 5 Sitzstangen */
      [-1.65,1.65].forEach(a=>{ strich(g,[a,.08,.95],[a,2.95,-.7],.12,HOLZ); strich(g,[a,.08,-.8],[a,2.6,-.58],.1,HOLZ2); box(g,.34,.14,.5,HOLZ3,a,.07,.95); box(g,.34,.14,.5,HOLZ3,a,.07,-.8); ball(g,.14,HOLZ,a,2.96,-.71); });
      const stange=u=>[.08+2.87*u,.95-1.65*u];
      [.24,.52,.78,1.0].forEach(u=>{ const [y,z]=stange(u); quer(walze(g,.085,3.6,HELLHOLZ,0,y,z+.06)); [-1.8,1.8].forEach(a=>ball(g,.11,HOLZ2,a,y,z+.06)); });
      [[-.85,.52,WEISS,-1.2],[.75,.78,DUNKELHUHN,-1.9],[-.2,1.0,GOLDHUHN,-.5]].forEach(([x,u,f,d],i)=>{ const [y,z]=stange(u); const hu=BH.huhn(k,g,x,y+.07,z+.06,d,{ farbe:f, gr:.98, pickt:false });
        k.anim.push(t=>{ hu.kopf.rotation.y=Math.sin(t*(.7+i*.2)+i*2)*.5; hu.g.rotation.z=Math.sin(t*1.4+i)*.035; }); });
      /* Brett mit Stroh darunter */
      box(g,3.2,.07,1.3,HOLZ2,0,.05,.05); for(let i=0;i<30;i++){ const s=box(g,.34,.025,.03,i%2?STROH:0xf6dc80,(zufall()-.5)*3.0,.11+zufall()*.03,(zufall()-.5)*1.2); s.rotation.y=zufall()*3; } } },
  { x:11.4, z:HINTEN, wand:'hinten', steh:[11.3,-11.2], kasten:[4.5,.8], treffer:[4.4,2.8,.8], trefferY:1.55, baue(g,k){ /* 6 Tafel Vom Ei zum Küken */
      box(g,4.3,2.32,.08,ORANGE,0,3.0,.1); BH.tafel(g,kuekenBild(),4.0,2.0,0,3.0,.16);
      [-1,1].forEach(s=>box(g,.18,2.46,.18,GELB,s*2.11,3.0,.17)); [1.84,4.16].forEach(y=>box(g,4.4,.18,.18,GELB,0,y,.17));
      [-2.11,2.11].forEach(x=>[1.84,4.16].forEach(y=>ball(g,.15,ROT,x,y,.27)));
      /* kleines Ei als Schmuck oben */
      ball(g,.2,GELB,0,4.45,.2); ball(g,.13,GELB,.14,4.68,.22); const s=kegel(g,.045,.12,ORANGE,.31,4.67,.22); s.rotation.z=-Math.PI/2; ball(g,.028,SCHWARZ,.18,4.72,.34); } },
  { x:-10.5, z:-5.8, steh:[-9.8,-3.5], r:1.5, treffer:[3.0,2.0,2.6], baue(g,k){ /* 7 Henne mit Küken */
      walze(g,1.42,.09,0xa87e28,0,.05,0);
      const kr=flach(ring(g,1.22,.2,STROH,0,.18,-.05)); kr.scale.set(1,.9,.9);
      for(let i=0;i<110;i++){ const a=zufall()*6.28, r=1.0+zufall()*.4, s=box(g,.38+zufall()*.2,.025,.025,[STROH,0xf6dc80,STROH2][i%3],Math.cos(a)*r,.2+zufall()*.18,Math.sin(a)*r*.9-.05); s.rotation.set(0,-a+Math.PI/2+(zufall()-.5),(zufall()-.5)*.5); }
      const mama=BH.huhn(k,g,-.2,.02,-.35,-.55,{ farbe:BRAUN, gr:1.7, pickt:false });
      k.anim.push(t=>{ mama.kopf.rotation.z=-Math.max(0,Math.sin(t*1.1))*.45; mama.kopf.rotation.y=Math.sin(t*.6)*.25; });
      [[.95,.5,.3,0],[.35,.85,-1.2,1],[-.5,.8,-2.1,2],[-1.05,.3,-2.8,3],[1.05,-.35,-.1,4]].forEach(([x,z,d,i])=>{ const q=BH.kueken(g,x,.09,z,d,1.35); q.userData.lebendig=true; verschmelze(q);
        k.anim.push(t=>{ q.position.y=.09+Math.max(0,Math.sin(t*3.2+i*1.9))*.14*(Math.sin(t*.8+i*2.3)>0?1:0); q.rotation.y=d+Math.sin(t*1.3+i)*.4; }); });
      /* zwei Eierschalen */
      [[.1,.35,.4],[-.75,-.05,-.5]].forEach(([x,z,n])=>{ const s=gruppe(g,x,.24,z); s.rotation.z=n; rohr(s,.17,.1,.17,EIWEISS,0,0,0,9,true); walze(s,.1,.03,EIWEISS,0,-.08,0); for(let i=0;i<7;i++){ const a=i*.9; kegel(s,.05,.1,EIWEISS,Math.cos(a)*.15,.12,Math.sin(a)*.15); } }); } },
  { x:-6.5, z:1.8, steh:[-5.8,3.8], r:1.2, treffer:[2.4,2.5,2.3], baue(g,k){ /* 8 Wassertränke */
      const B1=0x2a6cc0, B2=0x1c4c90;
      [-.62,.62].forEach(a=>box(g,.5,.2,1.7,0xb05a40,a,.1,0));
      /* Wanne mit Wasser */
      rohr(g,1.12,1.0,.36,B1,0,.38,0,28,true); walze(g,1.0,.08,B2,0,.23,0); flach(ring(g,1.12,.08,B2,0,.56,0));
      walze(g,1.05,.04,0x6ac4f4,0,.47,0);
      /* Vorratsbehälter: blauer Sockel, durchsichtiger Zylinder mit Wasser, rote Haube */
      walze(g,.62,.22,B2,0,.6,0);
      hell(walze(g,.54,.72,mat(0x3aa8ee,{transparent:true,opacity:.85}),0,1.07,0));
      hell(rohr(g,.6,.6,1.1,mat(0xdcf4ff,{transparent:true,opacity:.32,side:THREE.DoubleSide,depthWrite:false}),0,1.25,0,24,true));
      [-.52,.52].forEach(a=>box(g,.07,1.1,.07,B1,a,1.25,.32));
      walze(g,.66,.14,B1,0,1.84,0); ball(g,.64,ROT,0,1.9,0,1,.55,1); walze(g,.1,.16,ROT2,0,2.3,0); ring(g,.2,.055,ROT2,0,2.42,0,Math.PI);
      /* Wellen und Luftblasen */
      const wellen=[0,1].map(i=>{ const m=hell(flach(ring(g,.85,.018,mat(0xffffff,{transparent:true,opacity:.6}),0,.5,0))); m.material=m.material.clone(); return m; });
      const blasen=[0,1,2].map(i=>hell(ball(g,.055,mat(0xffffff,{transparent:true,opacity:.75}),0,.8,.4)));
      k.anim.push(t=>{ wellen.forEach((w,i)=>{ const u=(t*.45+i*.5)%1, s=.8+u*.45; w.scale.set(s,s,1); w.material.opacity=.7*(1-u); }); blasen.forEach((b,i)=>{ const u=(t*.4+i*.37)%1; b.position.set((i-1)*.22+Math.sin(u*9+i)*.05,.75+u*.65,.38); }); });
      for(let i=0;i<6;i++){ const a=.4+i*.45; ball(g,.07,0x7ad0f8,Math.cos(a)*(1.3+(i%2)*.15),.02,Math.sin(a)*(1.3+(i%2)*.15),1.2,.2,1); } } },
  { x:5.7, z:1.1, steh:[5.2,3.1], r:1.05, treffer:[2.5,3.4,1.9], baue(g,k){ /* 9 Hahn auf dem Holzklotz */
      rohr(g,.78,.92,1.0,0x6e4a2a,0,.5,0,16); walze(g,.76,.04,0xe0bc84,0,1.02,0); [.56,.34,.14].forEach(r=>flach(ring(g,r,.022,0xa87a44,0,1.045,0)));
      for(let i=0;i<14;i++){ const a=i*Math.PI/7; strich(g,[Math.cos(a)*.9,.08,Math.sin(a)*.9],[Math.cos(a)*.8,.94,Math.sin(a)*.8],.045,i%2?0x543418:0x84603a); }
      [[.85,.4],[-.7,.75]].forEach(([x,z])=>strich(g,[x*.8,.25,z*.8],[x*1.1,.03,z*1.1],.12,0x6e4a2a));
      [[-.75,.62],[-.62,.74],[.4,.9]].forEach(([x,z],i)=>{ ball(g,.13,i%2?LAUB:LAUB2,x,.12,z,1.3,.7,1); ball(g,.055,i%2?GELB:WEISS,x,.24,z); });
      const hahn=BH.huhn(k,g,.05,1.04,0,-.45,{ hahn:true, gr:1.85, pickt:false });
      /* Halsfedern und Flügelschmuck */
      for(let i=0;i<7;i++){ const a=(i-3)*.45, f=ball(hahn.g,.07,i%2?GOLD:ORANGE,.27+Math.cos(a)*.1,.6-(i%2)*.04,Math.sin(a)*.17,.7,1.9,.7); f.rotation.z=-.45; }
      [-1,1].forEach(v=>ball(hahn.g,.14,0x24604a,-.1,.44,v*.31,1.5,.6,.35));
      k.anim.push(t=>{ const u=t%6, kraeht=u<1.7?Math.sin(Math.min(1,u/.35)*Math.PI/2)*Math.min(1,(1.7-u)/.35):0; hahn.kopf.rotation.z=kraeht*.55; hahn.kopf.rotation.y=kraeht?0:Math.sin(t*.9)*.35; }); } },
  { x:10.8, z:-.7, steh:[10.3,1.55], kasten:[3.5,2.7], treffer:[3.3,2.0,2.5], baue(g,k){ /* 10 Sandbad mit Huhn */
      box(g,3.1,.1,2.3,HOLZ3,0,.05,0);
      [-1.15,1.15].forEach(c=>box(g,3.3,.42,.18,HOLZ,0,.23,c)); [-1.56,1.56].forEach(a=>box(g,.18,.42,2.3,HOLZ2,a,.23,0));
      [-1.56,1.56].forEach(a=>[-1.15,1.15].forEach(c=>{ box(g,.28,.56,.28,HOLZ3,a,.28,c); ball(g,.13,HELLHOLZ,a,.58,c); }));
      const sand=BH.kornBild('#ecd49c',['rgba(255,246,210,.6)','rgba(170,120,60,.35)']);
      const fl=new THREE.Mesh(new THREE.PlaneGeometry(2.95,2.13),new THREE.MeshLambertMaterial({map:sand})); fl.rotation.x=-Math.PI/2; fl.position.y=.32; fl.receiveShadow=true; g.add(fl);
      box(g,2.9,.2,2.1,0xdcc084,0,.2,0);
      const wall=flach(ring(g,.66,.1,0xc8a464,-.05,.29,0)); wall.scale.set(1.15,1,.5); for(let i=0;i<40;i++){ const a=i*.157+zufall()*.1, rr=.62+zufall()*.2; ball(g,.05+zufall()*.05,i%2?0xd8b878:0xc09a5c,-.05+Math.cos(a)*rr*1.15,.34,Math.sin(a)*rr,1,.6,1); }
      [[-1.1,.6,.22],[1.05,-.55,.28],[1.1,.65,.17],[-1.05,-.65,.2]].forEach(([x,z,r])=>ball(g,r*.6,0xd8b878,x,.32,z,1.4,.5,1));
      [[-.9,.2],[.95,.15],[.5,.8],[-.4,-.85]].forEach(([x,z])=>ball(g,.07,0xa8a296,x,.35,z,1.3,.7,1));
      const gr=1.35, hu=BH.huhn(k,g,-.05,.3-.24*gr,0,-.6,{ farbe:GOLDHUHN, gr, pickt:false });
      const fluegel=[-1,1].map(v=>{ const f=gruppe(hu.g,-.02,.56,v*.24); ball(f,.24,0xb87428,-.05,0,v*.2,1.2,.2,1.05); [-.18,.0,.16].forEach(a=>ball(f,.1,0xe8b458,a,.0,v*.42,.8,.25,1.2)); verschmelze(f); return f; });
      const staub=[]; for(let i=0;i<12;i++){ const m=mat(0xf4deae,{transparent:true,opacity:.5,depthWrite:false}).clone(); staub.push(hell(ball(g,.1,m,0,.5,0))); }
      k.anim.push(t=>{ const s=Math.sin(t*9)*(Math.sin(t*1.1)>-.4?1:.12); fluegel.forEach((f,i)=>f.rotation.x=(i?-1:1)*(.15+s*.5)); hu.g.rotation.x=s*.09; hu.kopf.rotation.y=Math.sin(t*1.7)*.4;
        staub.forEach((d,i)=>{ const u=(t*.55+i/12)%1, a=i*2.4; d.position.set(-.05+Math.cos(a)*(.5+u*.75),.42+Math.sin(u*Math.PI*.8)*(.5+(i%3)*.2),Math.sin(a)*(.35+u*.55)); d.scale.setScalar(.06+u*.16); d.material.opacity=.65*(1-u); }); }); } }
];

return { titel:'Der Hühnerstall', breite:36, tiefe:27, oben:['36,18,22','86,48,50','150,96,86'], baue, gegenstaende, verstecke };
})();

/* Raum 4: Der Traktorschuppen. Glänzende Wellblechwände, Industrielampen, Betonboden, Fenster,
   Schwalben mit Nest und der Hofhund.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Pflug) und 10 (Fahrrad mit Korb) sind neu.
   Ausgang: das grüne Rolltor in der Rückwand rechts (x = 11), es fährt hoch, dahinter steht der Hofladen. */
RAEUME3D.bauernhof[3] = (function(){
const { ROT, ROT2, WEISS, CREME, GELB, ORANGE, BLAU, GRUEN, SCHWARZ, GUMMI, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, ERDE, ERDE2, STROH, STROH2, LAUB, LAUB2, LAUB3 } = BH;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=11;                       /* Mitte des Rolltors */
const TORB=4.6, TORH=4.4;
const TORGRUEN=0x3f8a4c, TORGRUEN2=0x56a462, TEAL=0x14a08c, STAHL=0x4a5864, WASSER=0x2468c0, WASSER2=0x17488c, SILBER=0xd4dce4;

const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze nach vorn, Ring flach auf den Boden */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

/* ---------- Bilder ---------- */
/* Wellblech: senkrechte, glänzende Rippen mit Nietenreihen (kachelbar) */
function blechBild(){
  return bild(512,512,(g)=>{
    for(let i=0;i<16;i++){ const x=i*32, v=g.createLinearGradient(x,0,x+32,0);
      v.addColorStop(0,'#5c7080'); v.addColorStop(.28,'#9fb4c2'); v.addColorStop(.46,'#e2eef4'); v.addColorStop(.62,'#a4b8c6'); v.addColorStop(1,'#5c7080'); g.fillStyle=v; g.fillRect(x,0,32,512); }
    const s=g.createLinearGradient(0,0,512,512); s.addColorStop(0,'rgba(255,255,255,0)'); s.addColorStop(.5,'rgba(255,255,255,.14)'); s.addColorStop(1,'rgba(255,255,255,0)'); g.fillStyle=s; g.fillRect(0,0,512,512);
    [6,262].forEach(y=>{ g.fillStyle='rgba(40,56,68,.45)'; g.fillRect(0,y,512,4); for(let i=0;i<16;i++){ g.fillStyle='#dce6ec'; g.beginPath(); g.arc(i*32+15,y+14,3.5,0,7); g.fill(); } });
  });
}
/* Betonboden mit Fugen */
function betonBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#a8a49a'; g.fillRect(0,0,512,512);
    for(let i=0;i<1100;i++){ g.fillStyle=i%2?'rgba(255,255,250,.16)':'rgba(60,54,44,.13)'; g.fillRect(zufall()*505,zufall()*505,2+zufall()*7,2+zufall()*5); }
    g.fillStyle='rgba(60,56,50,.55)'; g.fillRect(0,0,512,4); g.fillRect(0,0,4,512); g.fillStyle='rgba(255,255,255,.2)'; g.fillRect(0,4,512,2); g.fillRect(4,0,2,512); });
}
/* Fenster mit Himmel, Wolke und Baum */
function fensterBild(){
  return bild(256,192,(g)=>{ const v=g.createLinearGradient(0,0,0,192); v.addColorStop(0,'#6cb8ee'); v.addColorStop(1,'#dcf2fc'); g.fillStyle=v; g.fillRect(0,0,256,192);
    g.fillStyle='#ffffff'; [[60,50,24],[88,44,30],[116,54,22]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); });
    g.fillStyle='#4f9a3c'; [[200,140,34],[226,152,28],[176,158,26]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }); g.fillStyle='#86c050'; g.fillRect(0,164,256,28); });
}
/* Lochbrett der Werkzeugwand */
function lochBild(){
  return bild(512,320,(g)=>{ g.fillStyle='#e8c890'; g.fillRect(0,0,512,320); g.fillStyle='#8a6636';
    for(let r=0;r<10;r++) for(let s=0;s<16;s++){ g.beginPath(); g.arc(16+s*32,16+r*32,4,0,7); g.fill(); } });
}
/* kleiner Traktor als Zeichnung, Mitte unten bei (x,y) */
function malTraktor(g,x,y,s,farbe){
  g.fillStyle=farbe; g.fillRect(x-42*s,y-52*s,40*s,34*s); g.fillRect(x-42*s,y-34*s,84*s,18*s);
  g.fillStyle='#bfe4fa'; g.fillRect(x-36*s,y-46*s,27*s,20*s); g.fillStyle='#2a2a2a'; g.fillRect(x+20*s,y-52*s,5*s,20*s);
  [[-26,-14,19],[28,-9,13]].forEach(([a,b,r])=>{ g.fillStyle='#26262a'; g.beginPath(); g.arc(x+a*s,y+b*s,r*s,0,7); g.fill(); g.fillStyle='#ffd23a'; g.beginPath(); g.arc(x+a*s,y+b*s,r*.46*s,0,7); g.fill(); });
}
/* Prüfliste: Traktor und Kästchen mit Haken */
function listenBild(){
  return bild(320,440,(g)=>{ g.fillStyle='#fffdf4'; g.fillRect(0,0,320,440);
    malTraktor(g,160,128,1.7,'#c8362a');
    for(let i=0;i<5;i++){ const y=172+i*52;
      g.strokeStyle='#333a44'; g.lineWidth=5; g.strokeRect(30,y,36,36);
      /* kleines Bild je Zeile: Rad, Lampe, Tropfen, Schlüssel, Sitz */
      const px=108, py=y+18;
      if(i===0){ g.fillStyle='#26262a'; g.beginPath(); g.arc(px,py,17,0,7); g.fill(); g.fillStyle='#ffd23a'; g.beginPath(); g.arc(px,py,7,0,7); g.fill(); }
      if(i===1){ g.fillStyle='#f2b81c'; g.beginPath(); g.arc(px,py,12,0,7); g.fill(); g.strokeStyle='#f2b81c'; g.lineWidth=4; for(let a=0;a<8;a++){ g.beginPath(); g.moveTo(px+Math.cos(a*.785)*15,py+Math.sin(a*.785)*15); g.lineTo(px+Math.cos(a*.785)*21,py+Math.sin(a*.785)*21); g.stroke(); } }
      if(i===2){ g.fillStyle='#2468c0'; g.beginPath(); g.moveTo(px,py-19); g.quadraticCurveTo(px+19,py+7,px,py+17); g.quadraticCurveTo(px-19,py+7,px,py-19); g.fill(); }
      if(i===3){ g.strokeStyle='#5a6672'; g.lineWidth=8; g.beginPath(); g.moveTo(px-14,py+13); g.lineTo(px+7,py-7); g.stroke(); g.beginPath(); g.arc(px+11,py-10,9,-.2,4.9); g.stroke(); }
      if(i===4){ g.fillStyle='#4a3018'; g.fillRect(px-15,py+3,30,10); g.fillRect(px-15,py-16,9,22); }
      g.fillStyle='#9aa0aa'; g.fillRect(146,y+10,136-(i%3)*22,6); g.fillRect(146,y+24,100+(i%2)*30,6);
      if(i<3){ g.strokeStyle='#2a9a3c'; g.lineWidth=10; g.lineCap='round'; g.beginPath(); g.moveTo(35,y+18); g.lineTo(47,y+31); g.lineTo(72,y-3); g.stroke(); } } });
}
/* Tafel der Landmaschinen: Traktor, Mähdrescher, Anhänger, Sämaschine */
function maschinenBild(){
  return bild(576,368,(g)=>{ g.fillStyle='#2e6a36'; g.fillRect(0,0,576,368);
    const feld=(x,y)=>{ g.fillStyle='#fdf8e4'; g.fillRect(x,y,268,164); g.fillStyle='#d8b878'; g.fillRect(x,y+136,268,28); };
    const rad=(x,y,r)=>{ g.fillStyle='#26262a'; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); g.fillStyle='#ffd23a'; g.beginPath(); g.arc(x,y,r*.45,0,7); g.fill(); };
    feld(14,14); feld(294,14); feld(14,190); feld(294,190);
    malTraktor(g,148,156,2.2,'#c8362a');
    /* Mähdrescher */
    g.fillStyle='#3a9448'; g.fillRect(352,62,140,72); g.fillRect(480,84,48,50); g.fillStyle='#bfe4fa'; g.fillRect(366,36,50,40); g.strokeStyle='#2a6a32'; g.lineWidth=6; g.strokeRect(366,36,50,40);
    g.strokeStyle='#3a9448'; g.lineWidth=12; g.beginPath(); g.moveTo(450,66); g.lineTo(520,34); g.stroke();
    g.strokeStyle='#c8362a'; g.lineWidth=6; g.beginPath(); g.arc(332,118,28,0,7); g.stroke(); for(let a=0;a<6;a++){ g.beginPath(); g.moveTo(332,118); g.lineTo(332+Math.cos(a*1.047)*28,118+Math.sin(a*1.047)*28); g.stroke(); }
    rad(388,138,26); rad(494,144,19);
    /* Anhänger */
    g.fillStyle='#e8b830'; [[70,236],[106,226],[144,232],[180,238]].forEach(([x,y])=>{ g.beginPath(); g.arc(x,y+18,26,0,7); g.fill(); });
    g.fillStyle='#3a74c0'; g.fillRect(40,252,180,56); g.fillStyle='#24508a'; [80,128,176].forEach(x=>g.fillRect(x,252,6,56)); g.fillStyle='#333'; g.fillRect(220,290,46,8); rad(80,316,22); rad(176,316,22);
    /* Sämaschine */
    g.fillStyle='#ee7c22'; g.beginPath(); g.moveTo(346,222); g.lineTo(510,222); g.lineTo(486,278); g.lineTo(370,278); g.fill(); g.fillStyle='#a85010'; g.fillRect(338,214,180,10);
    g.strokeStyle='#4a4e56'; g.lineWidth=6; for(let i=0;i<6;i++){ const x=374+i*22; g.beginPath(); g.moveTo(x,278); g.lineTo(x-8,322); g.stroke(); g.fillStyle='#a87020'; g.beginPath(); g.arc(x-10,332,4,0,7); g.fill(); }
    g.beginPath(); g.moveTo(510,240); g.lineTo(546,262); g.stroke(); rad(344,316,20); rad(516,316,20); });
}
/* Warnstreifen gelb-schwarz */
function streifenBild(){
  return bild(64,512,(g)=>{ g.fillStyle='#ffd23a'; g.fillRect(0,0,64,512); g.fillStyle='#1e1a16'; for(let y=-64;y<512;y+=80){ g.beginPath(); g.moveTo(0,y); g.lineTo(64,y+48); g.lineTo(64,y+88); g.lineTo(0,y+40); g.fill(); } });
}
/* Himmel hinter dem Rolltor mit Hügeln */
function himmelBild(){
  return bild(512,256,(g)=>{ const v=g.createLinearGradient(0,0,0,200); v.addColorStop(0,'#74bcf0'); v.addColorStop(1,'#ffe4b0'); g.fillStyle=v; g.fillRect(0,0,512,256);
    g.fillStyle='#ffffff'; [[90,50,26],[122,42,32],[154,54,24],[380,66,22],[408,60,28]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); });
    g.fillStyle='#7ab850'; g.beginPath(); g.moveTo(0,170); g.quadraticCurveTo(130,110,270,172); g.quadraticCurveTo(400,124,512,160); g.lineTo(512,256); g.lineTo(0,256); g.fill(); });
}

/* ---------- Ausgang: das Rolltor, dahinter der Hofladen ---------- */
function hofladen(par){
  const g=gruppe(par,AX,0,HINTEN);
  box(g,10,.04,6.2,0xc4a878,0,-.012,-3.1);
  for(let i=0;i<44;i++){ hell(ball(g,.06+zufall()*.07,i%2?0xb89c70:0xa88c62,(zufall()-.5)*6,.012,-.4-zufall()*2.9,1,.3,1)); }
  /* Haus */
  const Z=-3.9;
  box(g,6.6,3.8,.3,0xf4e6c8,0,1.9,Z); [-3.2,-1.05,3.2].forEach(x=>box(g,.18,3.8,.1,HOLZ2,x,1.9,Z+.18)); box(g,6.8,.3,.7,0x8a2a1c,0,3.95,Z+.1);
  for(let i=0;i<14;i++) ball(g,.27,i%2?0xa83a28:0x923022,-3.2+i*.49,4.1,Z+.4,1,.6,.6);
  /* Ladentür */
  box(g,1.25,2.5,.1,0x2e6a3e,-2.05,1.25,Z+.19); box(g,.85,.8,.04,0xffe6a0,-2.05,1.8,Z+.26); box(g,.05,.8,.05,0x2e6a3e,-2.05,1.8,Z+.28); box(g,.85,.05,.05,0x2e6a3e,-2.05,1.8,Z+.28); ball(g,.08,GOLD,-1.62,1.15,Z+.3);
  /* Schaufenster mit Gläsern */
  box(g,3.5,1.7,.08,0xffe9b0,1.05,1.75,Z+.17);
  [1.15,1.95].forEach(y=>{ box(g,3.4,.08,.24,HOLZ,1.05,y,Z+.28); for(let i=0;i<7;i++){ const x=-.36+i*.47; walze(g,.14,.36,[0xc8283a,ORANGE,0x7a2a6a,GELB][i%4],x,y+.24,Z+.3); walze(g,.155,.07,CREME,x,y+.46,Z+.3); } });
  [-.75,1.05,2.85].forEach(x=>box(g,.12,1.85,.12,HOLZ2,x,1.75,Z+.3)); box(g,3.72,.14,.2,HOLZ2,1.05,2.65,Z+.3); box(g,3.72,.18,.5,HOLZ2,1.05,.84,Z+.4);
  /* Markise rot-weiß */
  for(let i=0;i<10;i++){ const x=-.85+i*.42, f=i%2?WEISS:ROT, m=box(g,.42,.08,1.15,f,x,2.98,Z+.68); m.rotation.x=.38; ball(g,.21,f,x,2.74,Z+1.2,1,.9,.25); }
  /* Gemüse- und Obstkisten */
  [[-.4,0xc8362a],[.75,ORANGE],[1.9,0x7ac040],[3.0,GELB]].forEach(([x,f],i)=>{ box(g,.95,.5,.6,HELLHOLZ,x,.27,Z+.9); box(g,.99,.08,.64,HOLZ,x,.36,Z+.9); for(let j=0;j<6;j++) ball(g,.17,f,x-.28+(j%3)*.28,.58,Z+.75+Math.floor(j/3)*.3); });
  [[-2.95,.3],[-1.0,.22]].forEach(([x,r])=>{ ball(g,r*1.3,ORANGE,x,r,Z+1.3,1.15,.85,1); strich(g,[x,r*1.9,Z+1.3],[x+.08,r*2.5,Z+1.3],.05,LAUB3); });
  /* Blumeneimer */
  rohr(g,.3,.22,.55,METALL,2.9,.28,Z+1.8); [[-.2,1.0,GELB],[.05,1.18,0xe84a7a],[.24,.94,WEISS]].forEach(([a,y,f])=>{ strich(g,[2.9,.5,Z+1.8],[2.9+a,y,Z+1.8],.03,LAUB3); ball(g,.15,f,2.9+a,y,Z+1.8); });
  BH.busch(g,-3.9,-2.4,.75); BH.busch(g,4.0,-2.6,.8);
  verschmelze(g); ohneSchatten(g);
  return g;
}
function baueTor(k,sc,hinten){
  const himmel=new THREE.Mesh(new THREE.PlaneGeometry(12,6.2),basis(0xffffff,{map:himmelBild()})); himmel.position.set(AX,3.0,HINTEN-5.4); hinten.add(himmel);
  const laden=hofladen(hinten); laden.visible=false; /* erst zeigen, wenn das Tor aufgeht */
  /* Rahmen mit Warnstreifen, Rollkasten, Schwelle */
  const r=gruppe(hinten,AX,0,HINTEN);
  const st=streifenBild();
  [-1,1].forEach(s=>{ box(r,.46,TORH+.1,.4,EISEN,s*(TORB/2+.25),TORH/2,.05); BH.tafel(r,st,.34,TORH-.1,s*(TORB/2+.25),TORH/2,.27); box(r,.62,.34,.55,GELB,s*(TORB/2+.27),.17,.14); });
  box(r,TORB+1.1,.62,.5,STAHL,0,TORH+.3,.1); quer(walze(r,.26,TORB+.9,METALL2,0,TORH+.3,.3));
  [-1,1].forEach(s=>box(r,.16,.72,.66,EISEN,s*(TORB/2+.52),TORH+.3,.18));
  box(r,TORB,.05,.7,0x6a6258,0,.027,.05);
  box(r,.9,.34,.2,EISEN,0,5.02,.2);
  verschmelze(r);
  const rotL=hell(ball(r,.12,basis(0xff4030),-.22,5.02,.32)), gruenL=hell(ball(r,.12,basis(0x1e4a24),.22,5.02,.32));
  const gruenAn=hell(ball(r,.13,basis(0x58ff68),.22,5.02,.33)); gruenAn.visible=false;
  /* Torblatt aus Lamellen */
  const tor=gruppe(hinten,AX,0,HINTEN+.05); tor.userData.lebendig=true;
  const N=14, LH=TORH/N, lamellen=[];
  for(let i=0;i<N;i++){ const q=gruppe(tor,0,LH*(i+.5),0); const f=i%2?TORGRUEN2:TORGRUEN; box(q,TORB,LH-.012,.1,f,0,0,0); box(q,TORB,.07,.07,f,0,-LH*.32,.07); verschmelze(q); lamellen.push(q); }
  box(lamellen[0],TORB,.12,.2,EISEN,0,-LH*.4,.06);
  const schloss=gruppe(tor,0,2.15,.28);
  box(schloss,1.75,1.45,.08,EISEN,0,.1,-.08); BH.zahlenschloss(schloss,0,0,.05).scale.setScalar(1.45);
  verschmelze(schloss); ohneSchatten(tor);
  const licht=new THREE.PointLight(0xffd8a0,.15,9,1.5); licht.position.set(AX,3.2,HINTEN-1.6); sc.add(licht);
  k.kasten(AX,-13.15,TORB+1.2,.8); /* geschlossenes Tor: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Rolltor', einfach:'Roll-Tor', steh:[AX,-11.2], durch:[AX,-15.2], losNach:1.4,
    treffer:{x:AX,y:2.3,z:-12.95,b:TORB+.8,h:4.6,t:.9}, schildOben:[AX,5.55,-12.5], glanz:[AX,2.25,-12.75],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)), hub=a*a*(3-2*a)*(TORH-.08);
      lamellen.forEach((q,i)=>{ const y=LH*(i+.5)+hub; q.position.y=y; q.visible=y<TORH; });
      laden.visible=auf>.02;
      schloss.position.y=2.15+hub; schloss.visible=schloss.position.y<3.7;
      rotL.visible=a<.05; gruenL.visible=a<.05; gruenAn.visible=a>=.05; licht.intensity=.15+.8*a; } });
}

/* ---------- Wandschmuck ---------- */
function fenster(par,tex,x,y,z,br,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(br,1.5),basis(0xffffff,{map:tex})); m.position.z=.05; g.add(m);
  [-1,1].forEach(s=>{ box(g,.16,1.76,.18,STAHL,s*(br/2+.06),0,.09); box(g,br+.28,.16,.18,STAHL,0,s*.82,.09); });
  box(g,.07,1.5,.08,STAHL,0,0,.1); box(g,br,.07,.08,STAHL,0,0,.1); box(g,br+.4,.1,.34,METALL,0,-.93,.17);
}
/* Industrielampe an einem Wandarm, mit Lichtfleck auf dem Blech */
function lampe(par,x,y,z,dreh,glanzTex){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,.3,.4,.08,EISEN,0,.42,.05); strich(g,[0,.5,.06],[0,.68,.62],.05,EISEN); strich(g,[0,.68,.62],[0,.42,.62],.05,EISEN);
  rohr(g,.13,.52,.4,0xb8402c,0,.24,.62,16); walze(g,.15,.1,EISEN,0,.46,.62);
  walze(g,.44,.04,basis(0xfff4c4),0,.04,.62); hell(ball(g,.17,basis(0xffffff),0,-.04,.62,1,.8,1));
  schein(g,'rgba(255,236,170,.7)',0,-.08,.74,1.5);
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(3.4,3.6),new THREE.MeshBasicMaterial({map:glanzTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); fl.position.set(0,-1.0,.035); g.add(fl);
}
/* Fachwerk-Träger aus Stahl oben an der Wand, entlang x */
function traeger(g,x1,x2,y,z){
  box(g,x2-x1,.12,.14,STAHL,(x1+x2)/2,y,z); const n=Math.round((x2-x1)/1.5), w=(x2-x1)/n;
  for(let i=0;i<n;i++){ strich(g,[x1+i*w,y,z],[x1+(i+.5)*w,y+.5,z],.04,STAHL); strich(g,[x1+(i+.5)*w,y+.5,z],[x1+(i+1)*w,y,z],.04,STAHL); }
}
function stuetze(g,x,z){ box(g,.34,H,.1,STAHL,x,H/2,z); box(g,.5,.12,.3,EISEN,x,.06,z); [1,2.6,4.2,5.6].forEach(y=>ball(g,.06,METALL,x,y,z+.07)); }

/* Regal mit Kisten, Kanistern und Dosen, Blick nach +z */
function regal(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-1.55,1.55].forEach(a=>[-.38,.38].forEach(c=>box(g,.09,2.9,.09,STAHL,a,1.45,c)));
  [.35,1.35,2.35].forEach(y=>box(g,3.2,.09,.85,METALL,0,y,0));
  [[-1.0,BLAU],[0,GELB],[1.0,GRUEN]].forEach(([a,f])=>{ box(g,.85,.55,.68,f,a,.67,0); box(g,.9,.08,.72,EISEN,a,.96,0); box(g,.34,.16,.02,CREME,a,.68,.35); });
  [[-1.1,ROT],[-.55,0x3a7a44]].forEach(([a,f])=>{ box(g,.45,.62,.4,f,a,1.72,0); box(g,.24,.1,.14,f,a-.05,2.09,0); walze(g,.07,.12,EISEN,a+.15,2.08,0); box(g,.28,.05,.02,CREME,a,1.72,.21); });
  [.1,.5,.9,1.3].forEach((a,i)=>{ walze(g,.16,.4,[METALL2,ORANGE,METALL2,BLAU][i],a,1.6,.08); walze(g,.17,.05,SILBER,a,1.82,.08); });
  box(g,1.3,.42,.6,HELLHOLZ,-.8,2.6,0); for(let i=0;i<8;i++) ball(g,.12,0xc89a5a,-1.3+i*.14,2.84,(i%2?.12:-.12),1.15,.85,1);
  [.4,1.15].forEach((a,i)=>{ box(g,.62,.46,.6,i?ROT:METALL2,a,2.62,0); box(g,.28,.07,.1,EISEN,a,2.88,0); });
}
/* Spinde aus Blech (nur an der Seitenwand) */
function spinde(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-1.1,0,1.1].forEach((a,i)=>{ box(g,1.06,2.8,.8,[0x2f6a9a,0xd88a28,0x3a8a52][i],a,1.5,0); box(g,.88,2.5,.05,[0x3c80b4,0xe8a040,0x4aa266][i],a,1.52,.42);
    [2.5,2.35,2.2].forEach(y=>box(g,.5,.05,.03,EISEN,a,y,.46)); box(g,.07,.28,.06,SILBER,a+.3,1.5,.47); });
  box(g,3.36,.1,.86,EISEN,0,.07,0);
  ball(g,.34,GELB,-.7,2.98,.05,1,.7,1); walze(g,.42,.05,GELB,-.7,2.95,.05); box(g,.9,.34,.5,HELLHOLZ,.7,3.08,0);
}
/* Haken mit Latzhose, Jacke und Mütze */
function garderobe(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,3.0,.24,.1,HOLZ2,0,0,.06); [-1.05,0,1.05].forEach(a=>{ flach(walze(g,.055,.3,METALL,a,0,.2)); ball(g,.08,GOLD,a,0,.36); });
  /* Latzhose */
  [-1,1].forEach(s=>{ strich(g,[-1.05,-.05,.32],[-1.05+s*.22,-.5,.32],.04,0x24508a); box(g,.26,.95,.16,BLAU,-1.05+s*.17,-1.5,.3); }); box(g,.62,.55,.17,BLAU,-1.05,-.8,.3); box(g,.3,.22,.03,0x24508a,-1.05,-.74,.4); [-.2,.2].forEach(a=>ball(g,.05,GOLD,-1.05+a,-.56,.4));
  /* gelbe Regenjacke */
  rohr(g,.18,.46,1.35,GELB,1.05,-.75,.32,12).scale.z=.45; [-1,1].forEach(s=>strich(g,[1.05+s*.22,-.25,.34],[1.05+s*.5,-1.15,.36],.1,GELB)); [-.45,-.75,-1.05].forEach(h=>ball(g,.045,EISEN,1.05,h,.54));
  ball(g,.28,ROT,0,-.1,.36,1,.75,.8); box(g,.36,.05,.28,ROT2,0,-.2,.6);
}
function uhr(par,x,y,z,dreh,k){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  flach(walze(g,.7,.12,EISEN,0,0,.07)); flach(walze(g,.6,.04,WEISS,0,0,.14)); for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(g,.035,SCHWARZ,Math.sin(a)*.48,Math.cos(a)*.48,.17); }
  const zeiger=(l,d,zz)=>{ const q=gruppe(g,0,0,zz); q.userData.lebendig=true; box(q,d,l,.02,SCHWARZ,0,l/2-.06,0); return q; };
  const s=zeiger(.34,.08,.18), m=zeiger(.5,.05,.2); ball(g,.06,ROT,0,0,.22);
  k.anim.push(t=>{ m.rotation.z=-.9-t*.12; s.rotation.z=1.1-t*.01; });
}
/* Lüfter in der Wand, dreht sich */
function luefter(par,x,y,z,dreh,k){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,1.5,1.5,.1,EISEN,0,0,.05); flach(walze(g,.66,.04,0xbfe4fa,0,0,.11));
  const fl=gruppe(g,0,0,.17); fl.userData.lebendig=true; for(let i=0;i<4;i++){ const a=gruppe(fl,0,0,0); a.rotation.z=i*Math.PI/2; ball(a,.3,METALL,0,.31,0,.55,1,.1); }
  verschmelze(fl); ball(g,.13,STAHL,0,0,.22);
  [-.36,0,.36].forEach(v=>{ box(g,1.4,.035,.03,STAHL,0,v,.27); });
  k.anim.push(t=>{ fl.rotation.z=t*3; });
}
function besen(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [[-.4,ROT],[.4,BLAU]].forEach(([a,f])=>{ strich(g,[a,.35,.25],[a,2.5,-.2],.05,HELLHOLZ); box(g,.7,.18,.28,f,a,.36,.26); for(let i=0;i<9;i++) box(g,.05,.3,.2,STROH2,a-.28+i*.07,.15,.27); });
}
/* Kanister am Boden */
function kanister(par,x,z,dreh,f){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,.7,.85,.4,f,0,.43,0); box(g,.38,.08,.18,f,-.08,1.0,0); [-.24,.08].forEach(a=>box(g,.07,.14,.16,f,a,.91,0)); walze(g,.09,.18,EISEN,.24,.94,0);
  [-1,1].forEach(s=>{ const m=box(g,.62,.06,.02,SCHWARZ,0,.45,.21); m.rotation.z=s*.7; });
}
/* Holzkiste mit Kartoffeln, Äpfeln oder Rüben */
function kiste(par,x,y,z,dreh,f){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,1.1,.1,.8,HOLZ2,0,.05,0); [-.38,.38].forEach(c=>{ [.2,.46].forEach(h=>box(g,1.12,.2,.06,HELLHOLZ,0,h,c)); }); [-.53,.53].forEach(a=>{ box(g,.06,.5,.78,HOLZ,a,.3,0); });
  if(f) for(let i=0;i<12;i++) ball(g,.15,f,-.36+(i%4)*.24,.5+(i%3)*.04,-.22+Math.floor(i/4)*.22,1.1,.85,1);
}
function paletten(par,x,z,dreh,n){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  for(let i=0;i<n;i++){ const y=i*.3; [-.75,0,.75].forEach(a=>box(g,.18,.16,1.3,HOLZ2,a,y+.09,0)); [-.52,-.18,.18,.52].forEach(c=>box(g,1.8,.08,.26,i%2?HELLHOLZ:HOLZ,0,y+.22,c)); }
}
function hundehuette(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,1.7,1.2,1.6,HOLZ,0,.6,0); [-.42,0,.42].forEach(a=>box(g,.05,1.18,.02,HOLZ2,a*1.6,.6,.81));
  [-1,1].forEach(s=>{ const d=box(g,1.2,.14,1.9,ROT,s*.5,1.5,0); d.rotation.z=-s*.6; }); box(g,.8,.34,1.55,HOLZ,0,1.34,0);
  box(g,.76,.6,.04,0x2a1a0c,0,.32,.82); flach(walze(g,.38,.04,0x2a1a0c,0,.62,.82));
  /* Knochen über dem Eingang */
  quer(walze(g,.05,.4,CREME,0,1.22,.86)); [-.22,.22].forEach(a=>[-.06,.06].forEach(h=>ball(g,.07,CREME,a,1.22+h,.86)));
}
function napf(par,x,z){ const g=gruppe(par,x,0,z); rohr(g,.32,.42,.2,BLAU,0,.1,0); walze(g,.27,.02,0x8ad0f4,0,.21,0); }

/* ---------- Bewegtes: Schwalben, Nest, Hofhund ---------- */
function schwalbe(par,gr){
  const g=gruppe(par,0,0,0); g.scale.setScalar(gr||1); g.userData.lebendig=true; const F=0x16264e;
  const r=gruppe(g,0,0,0); ball(r,.17,F,0,0,0,1.6,.85,.85); ball(r,.13,WEISS,.02,-.06,0,1.5,.6,.8); ball(r,.11,F,.27,.05,0); ball(r,.065,0xc8482a,.32,-.02,0,1,.8,1);
  kegel(r,.035,.09,SCHWARZ,.41,.04,0).rotation.z=-Math.PI/2; [-1,1].forEach(v=>{ ball(r,.022,WEISS,.33,.09,v*.075); ball(r,.012,SCHWARZ,.35,.09,v*.088); strich(r,[-.2,0,v*.04],[-.62,.02,v*.2],.028,F); });
  verschmelze(r);
  const fluegel=[-1,1].map(v=>{ const f=gruppe(g,0,.04,v*.1); const m=kegel(f,.15,.62,F,-.08,0,v*.3); m.rotation.x=v*Math.PI/2; m.rotation.y=v*.4; m.scale.z=.03; return f; });
  ohneSchatten(g);
  return { g, fluegel };
}
function fliegen(k,s,cx,cz,rx,rz,y,w,p){
  k.anim.push(t=>{ const a=t*w+p, x=cx+Math.cos(a)*rx, z=cz+Math.sin(a)*rz; s.g.position.set(x,y+Math.sin(t*1.7+p)*.3,z);
    const dx=-Math.sin(a)*rx*w, dz=Math.cos(a)*rz*w; s.g.rotation.y=Math.atan2(-dz,dx);
    const f=Math.sin(t*11+p)*.6; s.fluegel[0].rotation.x=f; s.fluegel[1].rotation.x=-f; });
}
function nest(par,k,x,y,z){
  const g=gruppe(par,x,y,z);
  box(g,.9,.08,.5,HOLZ2,0,-.34,.25); strich(g,[0,-.75,.04],[0,-.36,.4],.04,HOLZ3);
  ball(g,.4,0x8a6a48,0,-.13,.28,1.15,.62,.82); const R=ring(g,.38,.08,0x6e5034,0,.04,.28); R.rotation.x=Math.PI/2; R.scale.y=.75;
  for(let i=0;i<22;i++){ const a=i*.29; ball(g,.055,i%2?0xa8845a:0x6e5034,Math.cos(a)*.42,-.2+(i%3)*.08,.28+Math.abs(Math.sin(a))*.3); }
  const junge=[-.22,.02,.25].map((a,i)=>{ const q=gruppe(g,a,.12,.32+(i%2)*.05); q.userData.lebendig=true; ball(q,.13,0x24345c,0,0,0); ball(q,.08,CREME,0,-.04,.08,1,.7,.7); [-.05,.05].forEach(v=>ball(q,.022,SCHWARZ,v,.05,.115));
    const s=kegel(q,.05,.1,ORANGE,0,-.01,.17); s.rotation.x=Math.PI/2; verschmelze(q); return q; });
  k.anim.push(t=>junge.forEach((q,i)=>{ q.position.y=.12+Math.max(0,Math.sin(t*3+i*2.1))*.1; }));
}
function hofhund(k){
  const g=gruppe(k.scene,0,0,0); g.userData.lebendig=true; const F=0xa8642c, D=0x5a3418;
  const r=gruppe(g,0,0,0); ball(r,.38,F,0,.64,0,1.55,.92,.9); ball(r,.27,WEISS,.38,.56,0,.95,1.05,1.05); ball(r,.28,D,-.15,.8,0,1.4,.55,1);
  ring(r,.2,.05,ROT,.52,.82,0).rotation.set(0,Math.PI/2,.8,'ZYX'); ball(r,.07,GOLD,.7,.66,0);
  verschmelze(r);
  const kopf=gruppe(g,.68,1.04,0), k2=gruppe(kopf,0,0,0); ball(k2,.3,F,0,0,0); ball(k2,.17,WEISS,.24,-.08,0,1.25,.85,1); ball(k2,.07,SCHWARZ,.45,-.04,0);
  [-1,1].forEach(v=>{ ball(k2,.045,SCHWARZ,.25,.1,v*.13); ball(k2,.015,WEISS,.285,.12,v*.14); ball(k2,.15,D,-.04,.02,v*.3,.75,1.5,.45); });
  ball(k2,.06,0xf07a8a,.36,-.22,0,1,1.2,.9); ball(k2,.1,WEISS,.17,.16,0,.6,1.2,.45);
  verschmelze(k2);
  const schwanz=gruppe(g,-.55,.76,0); strich(schwanz,[0,0,0],[-.28,.3,0],.075,F); strich(schwanz,[-.28,.3,0],[-.32,.52,0],.06,F); ball(schwanz,.085,WEISS,-.32,.54,0); verschmelze(schwanz);
  const beine=[[.34,.2],[.34,-.2],[-.34,.2],[-.34,-.2]].map(([a,c])=>{ const b=gruppe(g,a,.52,c); walze(b,.085,.48,F,0,-.24,0); ball(b,.11,WEISS,.04,-.47,0,1.25,.6,1); verschmelze(b); return b; });
  k.anim.push(t=>{ beine.forEach((b,i)=>b.rotation.z=Math.sin(t*5+(i%3?3.14:0))*.4); schwanz.rotation.x=Math.sin(t*9)*.55; kopf.rotation.y=Math.sin(t*.9)*.3; });
  laeufer(k,g,[[13.7,.4],[15.7,1.6],[15.7,7.6],[13.7,8.6]],1.15,0,6);
}

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  const h=BH.huelle(k,{ B,T,H, himmelLicht:0xe8f4ff, grund:0x767064, staerke:.78, sonne:0xf4f6ff, sonneStaerke:.36,
    wandBild:blechBild(), bodenBild:betonBild(), bodenWdh:[8,6], leiste:STAHL, sockel:0, oeffnung:{x:AX,b:TORB,h:TORH} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueTor(k,sc,hinten);
  const glanz=leuchtBild('rgba(255,240,196,.34)'), ftex=fensterBild();

  /* ---------- Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  /* gemauerter Sockel, am Tor unterbrochen */
  [[-B/2,AX-TORB/2-.55],[AX+TORB/2+.55,B/2]].forEach(([a,b])=>{ box(dh,b-a,.7,.12,0x8a867c,(a+b)/2,.35,HINTEN+.06); box(dh,b-a,.1,.2,STAHL,(a+b)/2,.74,HINTEN+.1); });
  fenster(dh,ftex,-13.4,3.6,HINTEN,2.4); fenster(dh,ftex,-3.6,3.75,HINTEN,1.8); fenster(dh,ftex,16.0,3.7,HINTEN,2.0);
  lampe(dh,-10.7,4.5,HINTEN,0,glanz); lampe(dh,-1.85,4.75,HINTEN,0,glanz); lampe(dh,7.55,4.5,HINTEN,0,glanz); lampe(dh,15.3,4.9,HINTEN,0,glanz);
  traeger(dh,-17.8,8.2,5.65,HINTEN+.14); traeger(dh,13.9,17.8,5.65,HINTEN+.14);
  [-17.7,-11.9,17.7].forEach(x=>stuetze(dh,x,HINTEN+.07));
  nest(dh,k,4.1,4.65,HINTEN);
  /* Feuerlöscher */
  walze(dh,.2,.8,ROT,7.5,1.7,HINTEN+.25); ball(dh,.2,ROT,7.5,2.1,HINTEN+.25,1,.6,1); box(dh,.14,.16,.14,EISEN,7.5,2.28,HINTEN+.25); box(dh,.3,.06,.08,EISEN,7.56,2.38,HINTEN+.25); strich(dh,[7.6,2.28,HINTEN+.3],[7.78,1.5,HINTEN+.35],.04,SCHWARZ); box(dh,.22,.2,.02,CREME,7.5,1.75,HINTEN+.46);
  k.kasten(7.5,-13.2,.6,.7);

  /* ---------- Seitenwände (Gruppe gedreht: x läuft entlang der Wand) ---------- */
  const seite=(wand,v)=>{ const g=gruppe(wand,v*B/2,0,0); g.rotation.y=-v*Math.PI/2;
    box(g,T,.7,.12,0x8a867c,0,.35,.06); box(g,T,.1,.2,STAHL,0,.74,.1);
    traeger(g,-13.2,13.2,5.65,.14); [-12.4,-4.4,4.4,12.4].forEach(x=>stuetze(g,x,.07));
    return g; };
  const dl=seite(links,-1), dr=seite(rechts,1);
  /* links: x der Gruppe = -z im Raum */
  fenster(dl,ftex,1.2,3.7,0,2.4); fenster(dl,ftex,10.4,3.7,0,2.2);
  lampe(dl,-6.6,4.4,0,0,glanz); lampe(dl,-2.9,4.5,0,0,glanz);
  garderobe(dl,-9.8,3.6,0,0); luefter(dl,-10.6,4.8,0,0,k); uhr(dl,6.2,4.4,0,0,k);
  /* rechts: x der Gruppe = z im Raum */
  fenster(dr,ftex,-1.8,3.7,0,2.4); fenster(dr,ftex,2.2,3.7,0,2.4);
  lampe(dr,-6.8,4.4,0,0,glanz); lampe(dr,6.6,4.4,0,0,glanz);
  uhr(dr,-11.0,4.0,0,0,k); garderobe(dr,9.6,3.4,0,0);
  [dh,dl,dr].forEach(g=>{ verschmelze(g); ohneSchatten(g); });

  /* ---------- Deko am Boden (am Rand) ---------- */
  const v=gruppe(sc,0,0,0);
  /* hinten links: Strohballen */
  BH.ballen(v,-16.3,0,-12.3,0,1.9); BH.ballen(v,-16.3,.82,-12.35,.08,1.7); BH.ballen(v,-14.3,0,-12.35,-.05,1.7); k.kasten(-15.35,-12.35,3.95,1.35);
  besen(v,-12.7,-12.9,0); k.kasten(-12.7,-12.9,1.7,.8);
  kanister(v,-5.2,-12.85,.1,ROT); kanister(v,-4.35,-12.8,-.15,0x3a7a44); k.kasten(-4.8,-12.85,1.7,.7);
  paletten(v,16.2,-12.5,0,3); kiste(v,16.0,.94,-12.5,.1,0xc89a5a); k.kasten(16.2,-12.5,2.0,1.45);
  /* links */
  spinde(v,-17.35,-7.0,Math.PI/2); k.kasten(-17.35,-7.0,1.0,3.5);
  regal(v,-17.35,2.9,Math.PI/2); k.kasten(-17.35,2.9,1.0,3.35);
  kiste(v,-17.1,0,6.6,Math.PI/2,0xc89a5a); kiste(v,-17.15,.53,6.6,1.65,0xc8362a); k.kasten(-17.1,6.6,1.0,1.35);
  BH.ballen(v,-16.9,0,10.4,Math.PI/2,2.2); BH.ballen(v,-16.95,.82,10.5,1.5,1.8); k.kasten(-16.9,10.4,1.25,2.4);
  /* rechts */
  regal(v,17.35,-8.6,-Math.PI/2); k.kasten(17.35,-8.6,1.0,3.35);
  paletten(v,17.0,-1.8,Math.PI/2,2); kiste(v,17.0,.62,-1.8,1.6,0xee7c22); k.kasten(17.0,-1.8,1.45,2.0);
  hundehuette(v,16.8,10.6,-Math.PI/2-.35); k.kasten(16.8,10.6,2.0,2.0);
  napf(v,14.9,10.3); k.kreis(14.9,10.3,.45);
  /* vorn (niedrig) */
  BH.ballen(v,-13.2,0,12.4,0,2.2); BH.ballen(v,-10.8,0,12.45,.1,1.9); k.kasten(-12.0,12.42,4.6,1.25);
  kiste(v,-5.4,0,12.4,0,0xc89a5a); kiste(v,-4.1,0,12.45,-.12,0x7ac040); k.kasten(-4.75,12.42,2.5,1.05);
  paletten(v,1.4,12.35,0,2); k.kasten(1.4,12.35,1.9,1.45);
  kiste(v,7.0,0,12.4,.08,0xc8362a); kiste(v,8.3,0,12.4,-.05,0xee7c22); k.kasten(7.65,12.4,2.5,1.05);
  BH.ballen(v,12.4,0,12.4,-.08,2.2); k.kasten(12.4,12.4,2.4,1.25);
  verschmelze(v);

  /* Strohhalme am Rand (flach) */
  const halme=[];
  [[-15,-10.9],[-15.6,8.4],[-12,10.9],[12.2,10.8],[15,-11],[-5,11.3]].forEach(([x,z])=>{ for(let i=0;i<26;i++) halme.push([x+(zufall()-.5)*2.6,.012,z+(zufall()-.5)*1.3,.3,.012,.028,i%2?STROH:STROH2,zufall()*3.14]); });
  BH.viele(sc,GEO.box,halme);
  /* flache Spuren und Markierungen auf dem Beton (nicht fest) */
  { const sp=[]; const weg=[[11,-12],[10.4,-8],[8,-4.2],[4.4,-2.6],[1,-3.4]];
    for(let a=0;a<weg.length-1;a++){ const [x1,z1]=weg[a],[x2,z2]=weg[a+1], l=Math.hypot(x2-x1,z2-z1), w=Math.atan2(-(z2-z1),x2-x1), nx=-(z2-z1)/l, nz=(x2-x1)/l;
      for(let s=0;s<l;s+=.34) [-.75,.75].forEach(v=>sp.push([x1+(x2-x1)*s/l+nx*v,.008,z1+(z2-z1)*s/l+nz*v,.13,.006,.5,0x76706a,w+.5])); }
    for(let i=0;i<36;i++){ sp.push([-3.5+i*.28,.007,8.4,.16,.006,.14,0xd8b020,0]); }
    for(let i=0;i<150;i++){ sp.push([-4+zufall()*11,.012,-1+zufall()*11,.14+zufall()*.18,.008,.02,i%2?0xd8b050:0xc09840,zufall()*3.14]); }
    for(let i=0;i<7;i++) sp.push([-.9+i*.24,.012,5.6,.09,.01,1.1,0x3a3c40,0]); [-.6,.6].forEach(d=>sp.push([-.18,.013,5.6+d,1.8,.012,.1,0x55585e,0])); [-.9,.9].forEach(d=>sp.push([-.18+d,.013,5.6,.1,.012,1.3,0x55585e,0]));
    BH.viele(sc,GEO.box,sp); }

  /* ---------- Licht: vier Lampen im Raum (mit dem Licht am Tor fünf Punktlichter) ---------- */
  [[-10.0,-10.2],[2.0,-9.6],[-12.5,3.5],[12.5,1.0]].forEach(([x,z])=>{ const l=new THREE.PointLight(0xffe4b0,.34,15,1.5); l.position.set(x,4.3,z); sc.add(l); });

  /* ---------- Tiere ---------- */
  fliegen(k,schwalbe(sc,1),-3.0,-4.5,8.5,4.2,5.0,.55,0);
  fliegen(k,schwalbe(sc,.9),5.5,-6.0,5.5,3.6,4.6,-.7,2.2);
  fliegen(k,schwalbe(sc,.85),-8.0,2.0,5.0,5.0,5.3,.62,4.1);
  const sitzt=schwalbe(dh,.95); sitzt.g.position.set(14.25,5.86,HINTEN+.18); sitzt.g.rotation.y=-.5;
  k.anim.push(t=>{ sitzt.g.rotation.y=-.5+Math.sin(t*.8)*.5; });
  hofhund(k);
  ohneSchatten(hinten);

  return { tuer, start:[7.0,-.6] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.6,-9.8],[-12.6,-6.4],[-6.4,-10.4],[-1.0,-9.9],[7.4,-9.4],[14.8,-10.4],[-14.8,-4.4],[-7.4,-3.2],[-2.4,-1.8],[8.2,-4.6],
  [15.2,-2.4],[-14.6,3.6],[-9.6,1.8],[-1.6,3.2],[5.4,1.4],[14.4,4.6],[-13.4,9.2],[-4.6,8.8],[3.6,8.2],[10.6,9.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:.9, z:HINTEN, wand:'hinten', steh:[.2,-11.3], kasten:[4.4,.8], treffer:[4.4,2.8,.8], trefferY:1.6, baue(g,k){ /* 1 Werkzeugwand */
      box(g,4.3,2.65,.08,HOLZ3,0,3.0,.08); BH.tafel(g,lochBild(),4.05,2.4,0,3.0,.13);
      [-1,1].forEach(s=>{ box(g,.14,2.72,.18,HOLZ2,s*2.1,3.0,.13); box(g,4.34,.14,.18,HOLZ2,0,3.0+s*1.29,.13); });
      const Z=.24, haken=(x,y)=>ball(g,.055,EISEN,x,y,Z);
      /* Hammer */
      box(g,.15,1.15,.13,0xb0622a,-1.65,3.1,Z); box(g,.2,.42,.16,ROT,-1.65,2.65,Z+.02); box(g,.6,.27,.22,STAHL,-1.65,3.76,Z+.03); box(g,.1,.31,.24,SILBER,-1.34,3.76,Z+.03); haken(-1.84,3.55); haken(-1.46,3.55);
      /* drei Schraubenschlüssel */
      [[-1.0,1.35],[-.6,1.1],[-.22,.86]].forEach(([x,l])=>{ const y=3.75-l/2; box(g,.11,l,.08,STAHL,x,y,Z); ring(g,.13,.055,STAHL,x,y-l/2-.08,Z); const m=ring(g,.14,.065,STAHL,x,y+l/2+.1,Z,4.5); m.rotation.z=Math.PI/2+.89; haken(x,y+l/2-.1); });
      /* drei Schraubendreher */
      [[.2,ROT],[.52,GELB],[.84,BLAU]].forEach(([x,f])=>{ walze(g,.11,.5,f,x,3.62,Z); ball(g,.11,f,x,3.87,Z,1,.6,1); walze(g,.12,.07,EISEN,x,3.34,Z); walze(g,.04,.66,STAHL,x,2.98,Z); box(g,.12,.12,.05,STAHL,x,2.62,Z); });
      box(g,1.05,.1,.16,HOLZ2,.52,3.42,.2);
      /* Zange mit roten Griffen */
      [-1,1].forEach(s=>{ strich(g,[1.55-s*.07,3.45,Z],[1.55+s*.16,3.8,Z],.055,STAHL); strich(g,[1.55,3.4,Z],[1.55+s*.24,2.75,Z],.075,ROT); }); flach(walze(g,.1,.14,EISEN,1.55,3.43,Z+.03));
      /* Maßband und Wasserwaage */
      flach(walze(g,.32,.2,GELB,1.55,2.22,Z)); flach(walze(g,.13,.23,EISEN,1.55,2.22,Z)); box(g,.4,.1,.1,SILBER,1.22,1.93,Z); haken(1.55,2.6);
      box(g,2.1,.28,.14,ORANGE,-.45,2.05,Z); [-.9,0,.9].forEach(a=>{ box(g,.28,.16,.03,CREME,-.45+a,2.05,Z+.08); ball(g,.065,0x7ae050,-.45+a,2.05,Z+.1,1.4,.8,.5); }); haken(-1.35,2.24); haken(.45,2.24);
    } },
  { x:5.8, z:HINTEN, wand:'hinten', steh:[5.8,-11.3], kasten:[2.2,.8], treffer:[2.2,3.1,.8], trefferY:1.45, baue(g,k){ /* 2 Prüfliste vom Traktor */
      box(g,2.1,2.8,.1,0x1e4a8a,0,2.92,.09); box(g,1.96,2.66,.05,0x2f6ab8,0,2.92,.15); BH.tafel(g,listenBild(),1.72,2.36,0,2.85,.19);
      /* Klammer */
      box(g,.9,.28,.12,SILBER,0,4.22,.24); box(g,.55,.2,.1,METALL2,0,4.42,.22); ring(g,.14,.045,METALL2,0,4.55,.22,Math.PI);
      [-.3,.3].forEach(a=>ball(g,.055,EISEN,a,4.22,.32));
      /* Bleistift an der Schnur */
      strich(g,[.94,4.1,.22],[1.04,2.5,.28],.014,EISEN); walze(g,.065,.8,GELB,1.04,2.1,.28); kegel(g,.065,.18,0xe8c088,1.04,1.61,.28).rotation.x=Math.PI; ball(g,.028,SCHWARZ,1.04,1.53,.28); walze(g,.07,.12,0xf07a8a,1.04,2.56,.28);
    } },
  { x:-2.5, z:-7.2, steh:[-3.3,-5.1], kasten:[5.0,2.6], treffer:[4.6,2.7,2.4], baue(g,k){ /* 3 Anhänger */
      const M=-.65, F=0x2f8a44, D=0x1e5a2c;
      box(g,3.3,.16,1.7,D,M,.86,0);
      [-.86,.86].forEach(c=>{ [1.12,1.43,1.74].forEach(y=>box(g,3.34,.26,.1,F,M,y,c)); [-1.65,-.55,.55,1.65].forEach(a=>box(g,.14,1.02,.16,D,M+a,1.38,c)); box(g,3.4,.08,.17,EISEN,M,1.91,c); });
      [-1.65,1.65].forEach(a=>{ [1.12,1.43,1.74].forEach(y=>box(g,.1,.26,1.68,F,M+a,y,0)); box(g,.17,.08,1.8,EISEN,M+a,1.91,0); });
      /* Räder und Kotbleche */
      flach(walze(g,.07,2.0,EISEN,M,.56,0));
      [-1,1].forEach(s=>{ const z=s*1.04; flach(walze(g,.56,.32,GUMMI,M,.56,z)); flach(walze(g,.31,.35,GELB,M,.56,z)); flach(walze(g,.1,.4,EISEN,M,.56,z)); ring(g,.46,.05,SCHWARZ,M,.56,z+s*.17);
        for(let i=0;i<6;i++){ const q=i*Math.PI/3; ball(g,.035,EISEN,M+Math.cos(q)*.21,.56+Math.sin(q)*.21,z+s*.19); }
        ring(g,.68,.07,D,M,.56,z,Math.PI); });
      /* Deichsel mit Zugöse und Stützfuß */
      [-1,1].forEach(s=>strich(g,[M+1.65,.84,s*.5],[2.15,.8,0],.08,EISEN)); box(g,.35,.14,.16,EISEN,2.2,.8,0); flach(ring(g,.14,.055,EISEN,2.42,.8,0)); walze(g,.06,.72,EISEN,1.75,.4,0); walze(g,.2,.08,EISEN,1.75,.04,0);
      [-.55,.55].forEach(c=>ball(g,.1,basis(0xff5030),M-1.72,.98,c,.4,1,1));
      /* Ladung: Heu, Kürbisse, Kartoffelkiste */
      box(g,3.15,.66,1.6,STROH2,M,1.27,0);
      BH.ballen(g,M-.9,1.52,0,Math.PI/2,1.35);
      [[.05,-.35,.34],[.2,.4,.28]].forEach(([a,c,r])=>{ [-.14,0,.14].forEach(v=>ball(g,r,ORANGE,M+a+v,1.95,c,.7,.95,1.05)); strich(g,[M+a,2.2,c],[M+a+.1,2.38,c],.05,LAUB3); });
      kiste(g,M+1.0,1.58,0,Math.PI/2,0xc8a060);
    } },
  { x:2.9, z:-7.4, dreh:-.16, steh:[2.3,-4.6], kasten:[5.1,3.7], treffer:[4.8,3.5,3.0], baue(g,k){ /* 4 Roter Traktor */
      const t=BH.traktor(g,-.15,0,0,{}); t.g.scale.setScalar(1.1);
      /* Glanzstreifen und funkelnde Lichtpunkte */
      const gl=basis(0xffffff,{transparent:true,opacity:.55,depthWrite:false});
      [[1.1,1.72,.562,1.5,.07],[.7,1.55,.563,.5,.04],[-.95,2.095,1.2,1.1,.05],[-.7,3.08,.885,1.5,.04]].forEach(([x,y,z,w,hh])=>hell(box(t.g,w,hh,.01,gl,x,y,z)));
      const funken=[[1.9,1.95,.65],[-1.3,2.2,1.32],[-.2,3.22,.95]].map(([x,y,z])=>{ const s=gruppe(t.g,x,y,z); s.userData.lebendig=true; const m=basis(0xffffff); hell(box(s,.34,.025,.012,m,0,0,0)); hell(box(s,.025,.34,.012,m,0,0,0)); return s; });
      k.anim.push(tt=>funken.forEach((s,i)=>{ const u=Math.max(0,Math.sin(tt*1.6+i*2.1)); s.scale.setScalar(Math.max(.01,Math.pow(u,6))); }));
    } },
  { x:-9.4, z:-9.3, steh:[-9.1,-7.0], kasten:[3.4,2.2], treffer:[3.2,2.4,2.1], baue(g,k){ /* 5 Blaue Wasserfässer */
      const fass=(x,z,s)=>{ const f=gruppe(g,x,0,z); f.scale.setScalar(s);
        rohr(f,.6,.53,.55,WASSER,0,.28,0,20); rohr(f,.6,.6,.7,WASSER,0,.9,0,20); rohr(f,.5,.6,.45,WASSER,0,1.47,0,20);
        [.55,1.25].forEach(y=>flach(ring(f,.62,.055,WASSER2,0,y,0))); flach(ring(f,.49,.05,WASSER2,0,1.7,0)); walze(f,.46,.06,0x3a80d4,0,1.71,0); [-.2,.2].forEach(a=>walze(f,.1,.09,EISEN,a,1.76,0));
        /* weißer Wassertropfen */
        ball(f,.2,WEISS,0,.82,.6,1,1,.18); const sp=kegel(f,.17,.3,WEISS,0,1.07,.6); sp.scale.z=.035; ball(f,.05,0x8ad0f4,-.06,.8,.645,1,1.4,.3); };
      fass(-.9,.2,1.0); fass(.62,.3,1.05); fass(-.12,-.6,1.18);
      /* Wasserhahn mit Tropfen */
      flach(walze(g,.07,.26,SILBER,.62,.42,1.0)); walze(g,.055,.16,SILBER,.62,.34,1.12); walze(g,.035,.12,SILBER,.62,.52,1.06); box(g,.22,.05,.07,ROT,.62,.6,1.06);
      const pf=hell(walze(g,.36,.012,0x8ac8ec,.62,.008,1.12)); pf.scale.z=.2;
      const tropfen=gruppe(g,.62,.2,1.12); tropfen.userData.lebendig=true; hell(ball(tropfen,.05,0x58b8f4,0,0,0,1,1.4,1));
      k.anim.push(t=>{ const u=(t*.8)%1; tropfen.position.y=.25-u*u*.22; });
    } },
  { x:-7.5, z:HINTEN, wand:'hinten', steh:[-7.3,-11.3], kasten:[3.9,.8], treffer:[3.9,2.9,.8], trefferY:1.5, baue(g,k){ /* 6 Tafel der Landmaschinen */
      box(g,3.8,2.6,.1,HOLZ3,0,2.95,.09); BH.tafel(g,maschinenBild(),3.55,2.27,0,2.95,.16);
      [-1,1].forEach(s=>{ box(g,.16,2.68,.18,HOLZ,s*1.84,2.95,.14); box(g,3.84,.16,.18,HOLZ,0,2.95+s*1.27,.14); });
      [-1.84,1.84].forEach(x=>[-1.27,1.27].forEach(y=>ball(g,.09,GOLD,x,2.95+y,.25)));
      box(g,3.2,.1,.32,HOLZ2,0,1.55,.2); [[-.5,ROT],[0,GRUEN],[.5,BLAU]].forEach(([x,f])=>quer(walze(g,.05,.34,f,x,1.65,.24)));
    } },
  { x:-11.4, z:-2.4, dreh:.28, steh:[-10.9,-.1], kasten:[3.7,2.35], treffer:[3.4,2.4,1.7], baue(g,k){ /* 7 Werkbank */
      box(g,3.3,.22,1.35,HELLHOLZ,0,1.18,0); [-.34,0,.34].forEach(c=>box(g,3.31,.012,.025,HOLZ,0,1.295,c));
      [-1.45,1.45].forEach(a=>[-.5,.5].forEach(c=>box(g,.18,1.07,.18,STAHL,a,.54,c)));
      box(g,3.0,.1,1.05,STAHL,0,.32,0); box(g,3.0,.55,.08,STAHL,0,.8,-.55);
      /* Schublade */
      box(g,1.2,.38,1.0,ROT,-.65,.86,.1); quer(walze(g,.04,.42,SILBER,-.65,.88,.65));
      /* Schraubstock mit eingespanntem Holz */
      const s=gruppe(g,1.0,1.29,.35); box(s,.55,.12,.5,EISEN,0,.06,0); [-.2,.2].forEach(a=>{ box(s,.16,.42,.5,0x2f6ab0,a,.32,0); box(s,.05,.14,.52,SILBER,a-Math.sign(a)*.09,.48,0); }); box(s,.26,.2,.7,HOLZ,0,.55,0);
      quer(walze(s,.06,.5,SILBER,.5,.24,0)); walze(s,.03,.5,EISEN,.72,.24,0).rotation.x=Math.PI/2; [-.27,.27].forEach(c=>ball(s,.065,EISEN,.72,.24,c));
      /* offener Werkzeugkasten */
      const w=gruppe(g,-.95,1.29,-.15); box(w,1.0,.34,.5,0xd83a28,0,.17,0); box(w,1.04,.05,.54,ROT2,0,.35,0); [-.5,.5].forEach(a=>box(w,.05,.48,.1,SILBER,a,.55,0)); quer(walze(w,.045,1.05,SILBER,0,.8,0));
      [[-.28,GELB],[0,BLAU],[.28,GRUEN]].forEach(([a,f])=>{ walze(w,.065,.26,f,a,.5,.06).rotation.z=a*.6; });
      box(g,.5,.1,.14,HOLZ2,.1,1.34,.35); box(g,.16,.18,.4,STAHL,.36,1.38,.35);
      [[-.1,-.25],[.12,-.35],[.3,-.2]].forEach(([a,c])=>{ walze(g,.13,.22,METALL,a,1.4,c); walze(g,.14,.04,EISEN,a,1.52,c); });
    } },
  { x:13.7, z:-5.4, steh:[12.2,-3.1], r:1.45, treffer:[2.6,2.3,2.4], baue(g,k){ /* 8 Reifenstapel */
      const profil=[];
      for(let i=0;i<4;i++){ const y=.24+i*.45, x=(i%2?.09:-.06), z=(i===2?.08:0);
        flach(ring(g,.72,.25,GUMMI,x,y,z)); flach(ring(g,.46,.06,0x45454c,x,y+.17,z)); flach(ring(g,.82,.025,0x4c4c54,x,y+.225,z));
        for(let j=0;j<22;j++){ const q=j*Math.PI/11; profil.push([x+Math.cos(q)*.955,y,z+Math.sin(q)*.955,.08,.34,.13,0x141418,-q]); } }
      BH.viele(g,GEO.box,profil);
      walze(g,.4,.04,0x17171a,.09,1.5,0);
    } },
  { x:-6.4, z:3.7, steh:[-6.0,6.15], kasten:[4.9,2.8], treffer:[4.3,2.2,2.5], baue(g,k){ /* 9 Pflug */
      const R=0xd8362a, BL=0x2f62c0;
      /* Erde mit Furchen darunter */
      { const kr=[], co=Math.cos(-.34), si=Math.sin(-.34); [-.7,0,.7].forEach(c=>{ for(let i=0;i<46;i++){ const a=(zufall()-.5)*3.5, b=(zufall()-.5)*.34, r=.05+zufall()*.08; kr.push([-.1+a*co+b*si,.03,c*1.25+.1-a*si+b*co,r,r*.6,r,i%2?ERDE:ERDE2]); } }); BH.viele(g,GEO.sph,kr); }
      /* schräger Hauptbalken */
      const A=[-1.95,1.38,-.75], E=[1.55,1.38,.55], L=Math.hypot(3.5,1.3), balken=box(g,L,.26,.26,R,-.2,1.38,-.1); balken.rotation.y=-Math.atan2(1.3,3.5);
      /* gewölbte blaue Streichbleche mit silberner Pflugschar */
      const blech=new THREE.MeshLambertMaterial({color:BL,side:THREE.DoubleSide}), schar=new THREE.MeshLambertMaterial({color:SILBER,side:THREE.DoubleSide});
      const woelbe=(m,fn)=>{ const geo=new THREE.PlaneGeometry(1,1,10,6), p=geo.attributes.position;
        for(let i=0;i<p.count;i++){ const q=fn(p.getX(i)+.5,p.getY(i)+.5); p.setXYZ(i,q[0],q[1],q[2]); } geo.computeVertexNormals();
        const t=new THREE.Mesh(geo,m); t.castShadow=true; return t; };
      [.14,.5,.86].forEach(u=>{ const x=A[0]+(E[0]-A[0])*u, z=A[2]+(E[2]-A[2])*u;
        strich(g,[x,1.3,z],[x-.12,.62,z+.05],.095,R); ball(g,.1,GELB,x,1.38,z+.17,1,1,.5);
        const f=gruppe(g,x-.15,.08,z+.02); f.rotation.y=-.55;
        f.add(woelbe(blech,(a,b)=>[(a-.62)*1.15-b*.18, .18+b*(.82-a*.3), .06+(1-a)*(1-a)*.5+b*b*(1-a)*.42]));
        f.add(woelbe(schar,(a,b)=>[(a-.62)*1.15+b*(a<.5?-.01:-.03)+(a*a*a)*.3*(1-b), .02+b*.18+(1-a)*.03*(1-b), .06+(1-a)*(1-a)*.5]));
        for(let j=0;j<3;j++) ball(f,.035,EISEN,-.45+j*.34,.22,.08+Math.pow(1-(.2+j*.28),2)*.5); });
      /* Dreipunkt-Anbaubock vorn */
      const vx=E[0], vz=E[2];
      [-1,1].forEach(s=>{ strich(g,[vx-.1,1.4,vz+s*.5-.05],[vx+.15,2.05,vz],.085,R); strich(g,[vx-.1,1.35,vz+s*.5-.05],[vx+.5,1.0,vz+s*.62],.085,R); ball(g,.13,GELB,vx+.5,1.0,vz+s*.62); });
      box(g,.2,.2,1.1,R,vx-.1,1.38,vz-.05); ball(g,.15,GELB,vx+.15,2.08,vz); strich(g,[vx+.15,2.05,vz],[-.3,1.45,-.15],.055,R);
      /* Stützrad am Ende und Stützfuß vorn */
      strich(g,[A[0],1.35,A[2]],[A[0]-.2,.5,A[2]-.1],.08,R); flach(walze(g,.4,.2,GUMMI,A[0]-.2,.42,A[2]-.1)); flach(walze(g,.18,.24,GELB,A[0]-.2,.42,A[2]-.1)); flach(walze(g,.06,.28,EISEN,A[0]-.2,.42,A[2]-.1));
      strich(g,[vx-.1,1.3,vz-.45],[vx+.1,.06,vz-.55],.065,EISEN); walze(g,.2,.07,EISEN,vx+.1,.05,vz-.55);
    } },
  { x:9.6, z:2.0, dreh:-.18, steh:[9.4,4.15], kasten:[4.1,1.9], treffer:[3.9,2.5,1.3], baue(g,k){ /* 10 Fahrrad mit Korb */
      const F=TEAL, HX=-1.2, VX=1.2, RY=.8, TL=[-.18,.62,0];
      [HX,VX].forEach(x=>{ ring(g,.72,.085,GUMMI,x,RY,0); ring(g,.62,.028,SILBER,x,RY,0);
        for(let i=0;i<8;i++){ const q=i*Math.PI/8, c=Math.cos(q)*.62, s=Math.sin(q)*.62; strich(g,[x-c,RY-s,0],[x+c,RY+s,0],.011,SILBER); }
        flach(walze(g,.09,.2,EISEN,x,RY,0)); ring(g,.87,.045,F,x,RY,0,2.1).rotation.z=.55; });
      /* Rahmen */
      const SA=[-.45,1.5,0], LK=[.78,1.55,0];
      strich(g,TL,SA,.06,F); strich(g,SA,LK,.06,F); strich(g,TL,[.84,1.32,0],.065,F); strich(g,[LK[0]-.03,1.7,0],[.88,1.22,0],.075,F);
      [-.1,.1].forEach(c=>{ strich(g,[HX,RY,c],[TL[0],TL[1],0],.042,F); strich(g,[HX,RY,c],[SA[0],SA[1],0],.042,F); strich(g,[.88,1.25,0],[VX,RY,c],.045,F); });
      /* Sattel */
      strich(g,SA,[-.53,1.74,0],.045,SILBER); ball(g,.17,HOLZ3,-.62,1.8,0,1.45,.55,1.1); ball(g,.1,HOLZ3,-.34,1.8,0,1.7,.6,.7);
      /* Lenker */
      strich(g,[.75,1.68,0],[.7,2.02,0],.045,SILBER); strich(g,[.7,2.02,-.5],[.7,2.02,.5],.04,SILBER); [-1,1].forEach(s=>{ strich(g,[.7,2.02,s*.5],[.42,2.0,s*.56],.065,HOLZ3); }); ball(g,.1,GOLD,.7,2.09,.28,1,.7,1);
      /* Kette, Tretlager, Pedale */
      ring(g,.23,.04,EISEN,TL[0],TL[1],.13); flach(walze(g,.07,.34,SILBER,TL[0],TL[1],0)); strich(g,[HX,RY+.11,.13],[TL[0],TL[1]+.23,.13],.018,EISEN); strich(g,[HX,RY-.11,.13],[TL[0],TL[1]-.23,.13],.018,EISEN); flach(ring(g,.1,.03,EISEN,HX,RY,.13)).rotation.x=0;
      [-1,1].forEach(s=>{ strich(g,[TL[0],TL[1],s*.2],[TL[0]+s*.26,TL[1]-s*.22,s*.22],.035,SILBER); box(g,.26,.07,.18,SCHWARZ,TL[0]+s*.26,TL[1]-s*.22,s*.34); });
      /* Rücklicht, Lampe, Ständer */
      ball(g,.08,basis(0xff4030),HX-.78,1.18,0); ball(g,.12,GELB,1.02,1.45,0,1,1,1); ball(g,.075,basis(0xfff6c0),1.13,1.45,0,.5,1,1);
      strich(g,[-.4,.7,.1],[-.7,.04,.5],.04,EISEN);
      /* Korb vor dem Lenker: offen, geflochten, mit Äpfeln und Blumen */
      strich(g,[.74,1.75,0],[1.2,1.72,0],.04,SILBER); strich(g,[VX,RY,.12],[1.35,1.68,.12],.025,SILBER); strich(g,[VX,RY,-.12],[1.35,1.68,-.12],.025,SILBER);
      const korb=gruppe(g,1.36,1.72,0);
      walze(korb,.34,.06,0x9a6a30,0,.03,0); rohr(korb,.5,.35,.55,0xc89048,0,.3,0,18,true);
      [[.1,.375],[.24,.41],[.38,.445]].forEach(([y,r])=>flach(ring(korb,r,.026,0x8a5a24,0,y,0))); flach(ring(korb,.5,.055,0xe0b068,0,.58,0));
      for(let i=0;i<14;i++){ const q=i*Math.PI/7; strich(korb,[Math.cos(q)*.36,.03,Math.sin(q)*.36],[Math.cos(q)*.51,.57,Math.sin(q)*.51],.022,0xe0b068); }
      [[-.17,.5,.1,ROT],[.16,.52,.16,ROT],[.1,.5,-.18,0x8ac040]].forEach(([x,y,z,f])=>{ ball(korb,.18,f,x,y,z); strich(korb,[x,y+.15,z],[x+.04,y+.25,z],.018,HOLZ3); });
      [[-.2,.92,-.18,GELB],[.12,1.02,-.05,0xf07a9a],[.3,.86,-.12,WEISS]].forEach(([x,y,z,f])=>{ strich(korb,[x*.4,.5,z],[x,y,z],.022,LAUB3); for(let i=0;i<5;i++) ball(korb,.07,f,x+Math.cos(i*1.257)*.09,y+Math.sin(i*1.257)*.09,z,1,1,.5); ball(korb,.06,ORANGE,x,y,z+.04); });
    } }
];

return { titel:'Der Traktorschuppen', breite:36, tiefe:27, oben:['16,20,26','34,42,50','70,82,94'], baue, gegenstaende, verstecke };
})();

/* Raum 5: Der Hofladen. Helle Bretterwände, warmer Dielenboden, Abendsonne durch die Fenster, Laternen, Wimpel, Verkäuferin und Katze.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die grüne Klöntür in der Rückwand links (x = -5,5). Erst schwingt die obere, dann die untere Hälfte nach draußen, dahinter der Hof im Abendrot. */
RAEUME3D.bauernhof[4] = (function(){
const { ROT, ROT2, WEISS, CREME, GELB, ORANGE, BLAU, GRUEN, SCHWARZ, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, STROH, STROH2, LAUB, LAUB2, LAUB3 } = BH;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=-5.5;                    /* Mitte der Klöntür */
const TUERGRUEN=0x2f7a48, TUERGRUEN2=0x3c9058, EIFARBE=0xfff2da, EIBRAUN=0xe2b684, BROT=0xc47c34, BROT2=0x9c5a22, KRUME=0xf0d08c;

const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze nach vorn / Ring flach legen */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const klemm=v=>Math.max(0,Math.min(1,v));

/* ---------- Bilder ---------- */
/* Fenster in der Abendsonne: oranger Himmel, Sonne, Wolken, Felder, Baum */
function abendFensterBild(sonneX){
  return bild(384,288,(g)=>{ const v=g.createLinearGradient(0,0,0,220); v.addColorStop(0,'#8a62a8'); v.addColorStop(.5,'#f48a62'); v.addColorStop(1,'#ffd678'); g.fillStyle=v; g.fillRect(0,0,384,288);
    const l=g.createRadialGradient(sonneX,160,10,sonneX,160,130); l.addColorStop(0,'rgba(255,250,200,1)'); l.addColorStop(1,'rgba(255,220,120,0)'); g.fillStyle=l; g.fillRect(0,0,384,288);
    g.fillStyle='#fff4b0'; g.beginPath(); g.arc(sonneX,160,34,0,7); g.fill();
    g.fillStyle='rgba(255,200,170,.8)'; [[70,60],[250,40],[320,95]].forEach(([x,y])=>{ g.beginPath(); g.ellipse(x,y,46,10,0,0,7); g.ellipse(x+22,y-8,28,9,0,0,7); g.fill(); });
    g.fillStyle='#8a9a46'; g.beginPath(); g.moveTo(0,200); g.quadraticCurveTo(110,165,220,196); g.quadraticCurveTo(310,215,384,182); g.lineTo(384,288); g.lineTo(0,288); g.fill();
    g.fillStyle='#d8a83c'; g.beginPath(); g.moveTo(0,232); g.quadraticCurveTo(180,205,384,238); g.lineTo(384,288); g.lineTo(0,288); g.fill();
    g.fillStyle='#4a6a2c'; const bx=sonneX>192?66:316; g.fillRect(bx-5,160,10,48); [[0,148,30],[-22,164,20],[22,164,20]].forEach(([a,y,r])=>{ g.beginPath(); g.arc(bx+a,y,r,0,7); g.fill(); }); });
}
/* Blick durch die offene Tür: Hof im Abendrot mit Wohnhaus und Scheune */
function hofBild(){
  return bild(768,384,(g)=>{ const v=g.createLinearGradient(0,0,0,270); v.addColorStop(0,'#5a4a98'); v.addColorStop(.5,'#ee8466'); v.addColorStop(1,'#ffd878'); g.fillStyle=v; g.fillRect(0,0,768,384);
    const l=g.createRadialGradient(384,225,8,384,225,190); l.addColorStop(0,'rgba(255,248,200,1)'); l.addColorStop(1,'rgba(255,200,110,0)'); g.fillStyle=l; g.fillRect(0,0,768,384);
    g.fillStyle='#fff2a8'; g.beginPath(); g.arc(384,222,36,0,7); g.fill();
    g.fillStyle='#b89a44'; g.beginPath(); g.moveTo(0,250); g.quadraticCurveTo(200,215,400,248); g.quadraticCurveTo(600,270,768,232); g.lineTo(768,384); g.lineTo(0,384); g.fill();
    const haus=(x,y,w,h,wand,dach)=>{ g.fillStyle=wand; g.fillRect(x,y-h,w,h); g.fillStyle=dach; g.beginPath(); g.moveTo(x-12,y-h); g.lineTo(x+w/2,y-h-w*.42); g.lineTo(x+w+12,y-h); g.fill(); };
    haus(210,285,100,70,'#f4e4c4','#8a3a2a'); g.fillStyle='#ffe070'; [225,272].forEach(x=>g.fillRect(x,236,22,22));
    haus(455,288,120,86,'#b8382a','#5e2418'); g.fillStyle='#fff4e0'; g.fillRect(494,238,42,50); g.strokeStyle='#b8382a'; g.lineWidth=5; g.beginPath(); g.moveTo(494,238); g.lineTo(536,288); g.moveTo(536,238); g.lineTo(494,288); g.stroke();
    g.fillStyle='#6a8a38'; g.fillRect(0,296,768,88);
    g.fillStyle='#d8b880'; g.beginPath(); g.moveTo(368,296); g.lineTo(402,296); g.lineTo(480,384); g.lineTo(290,384); g.fill(); });
}
/* Etikett eines Glases: Frucht oder Wabe, ohne Wörter */
function etikettBild(art){
  return bild(128,96,(g)=>{ g.fillStyle='#fff8e6'; g.fillRect(0,0,128,96); g.strokeStyle='#8a5a28'; g.lineWidth=7; g.strokeRect(4,4,120,88);
    const kreis=(x,y,r,f)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    if(art===0){ g.fillStyle='#d8283a'; g.beginPath(); g.moveTo(64,84); g.bezierCurveTo(24,56,26,22,64,32); g.bezierCurveTo(102,22,104,56,64,84); g.fill(); g.fillStyle='#3a8a30'; g.beginPath(); g.moveTo(40,30); g.lineTo(64,14); g.lineTo(88,30); g.lineTo(64,38); g.fill(); [[52,48],[74,46],[64,62]].forEach(([x,y])=>kreis(x,y,3,'#ffe070')); }
    else if(art===1){ kreis(64,52,28,'#f08a14'); kreis(54,42,7,'#ffc060'); g.fillStyle='#3a8a30'; g.beginPath(); g.ellipse(82,22,17,8,-.5,0,7); g.fill(); }
    else if(art===2){ kreis(48,56,22,'#6a2a80'); kreis(82,56,22,'#7e3896'); kreis(42,48,5,'#b078c8'); g.strokeStyle='#4a6a20'; g.lineWidth=5; g.beginPath(); g.moveTo(48,36); g.lineTo(66,14); g.lineTo(82,36); g.stroke(); }
    else if(art===3){ [[44,36],[84,36],[64,62]].forEach(([x,y])=>{ g.beginPath(); for(let i=0;i<6;i++){ const a=i*Math.PI/3; g[i?'lineTo':'moveTo'](x+Math.cos(a)*22,y+Math.sin(a)*22); } g.closePath(); g.fillStyle='#ffc428'; g.fill(); g.strokeStyle='#a86a08'; g.lineWidth=5; g.stroke(); }); }
    else { [[42,58],[86,58],[64,38]].forEach(([x,y])=>{ kreis(x,y,17,'#c81c34'); kreis(x-5,y-5,4,'#ff8890'); }); g.strokeStyle='#3a6a20'; g.lineWidth=4; g.beginPath(); g.moveTo(42,42); g.lineTo(64,14); g.lineTo(86,42); g.stroke(); } });
}
/* Kreidetafel: Bilder mit Preisen, keine Wörter */
function kreideBild(){
  return bild(512,384,(g)=>{ g.fillStyle='#24463a'; g.fillRect(0,0,512,384);
    g.fillStyle='rgba(255,255,255,.05)'; for(let i=0;i<60;i++) g.fillRect(zufall()*480,zufall()*370,20+zufall()*60,3);
    const kreis=(x,y,a,b,f)=>{ g.fillStyle=f; g.beginPath(); g.ellipse(x,y,a,b,0,0,7); g.fill(); };
    const strichW=(l,f,w)=>{ g.strokeStyle=f; g.lineWidth=w||6; g.lineCap='round'; g.beginPath(); l.forEach(([x,y],i)=>g[i?'lineTo':'moveTo'](x,y)); g.stroke(); };
    const bilder=[
      (x,y)=>{ kreis(x,y,25,33,'#fff4de'); strichW([[x-12,y-12],[x-15,y+4]],'#c8a878',5); },
      (x,y)=>{ kreis(x-18,y+4,24,28,'#f08a20'); kreis(x+18,y+4,24,28,'#f08a20'); kreis(x,y+4,22,31,'#ffa438'); strichW([[x,y-26],[x+10,y-40]],'#8ad060',9); },
      (x,y)=>{ kreis(x-12,y+6,25,28,'#e84848'); kreis(x+12,y+6,25,28,'#e84848'); strichW([[x,y-20],[x+5,y-36]],'#e8c890'); kreis(x+20,y-30,14,7,'#8ad060'); },
      (x,y)=>{ g.fillStyle='#ff8ab0'; g.fillRect(x-24,y-18,48,50); g.fillStyle='#fff4de'; g.fillRect(x-30,y-32,60,16); g.fillRect(x-15,y-5,30,22); kreis(x,y+6,8,8,'#d8283a'); } ];
    bilder.forEach((mal,i)=>{ const y=56+i*90; mal(100,y);
      g.setLineDash([4,18]); strichW([[165,y+14],[305,y+14]],'#d8e8e0',6); g.setLineDash([]);
      g.fillStyle=['#fff6c0','#ffffff','#bfe8ff','#ffd0dc'][i]; g.font='700 66px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(['1 €','3 €','2 €','4 €'][i],400,y+4); }); });
}
/* Tafel "Vom Hof auf den Tisch": Acker, Gemüsekorb, Teller; nur Bilder */
function hofTafelBild(){
  return bild(576,320,(g)=>{ g.fillStyle='#fff6e0'; g.fillRect(0,0,576,320);
    const kreis=(x,y,a,b,f)=>{ g.fillStyle=f; g.beginPath(); g.ellipse(x,y,a,b,0,0,7); g.fill(); };
    const kasten=(x,y,w,h,f)=>{ g.fillStyle=f; g.fillRect(x,y,w,h); };
    const pfeil=x=>{ g.fillStyle='#3a3a44'; g.beginPath(); g.moveTo(x,148); g.lineTo(x+22,148); g.lineTo(x+22,132); g.lineTo(x+50,160); g.lineTo(x+22,188); g.lineTo(x+22,172); g.lineTo(x,172); g.fill(); };
    [22,218,414].forEach(x=>kasten(x,60,140,200,'#d8eefa'));
    /* 1 Acker mit Sonne und Möhren */
    kreis(56,96,22,22,'#ffc828'); kasten(22,180,140,80,'#8a5a30'); [52,92,132].forEach(x=>{ g.fillStyle='#f07a18'; g.beginPath(); g.moveTo(x-13,182); g.lineTo(x+13,182); g.lineTo(x,236); g.fill(); [-16,0,16].forEach(a=>kreis(x+a*.8,160+Math.abs(a)*.5,7,20,'#4aa038')); });
    pfeil(166);
    /* 2 Kiste mit Gemüse */
    [[250,160,'#d83020'],[290,150,'#6ab838'],[330,162,'#f08a18'],[270,182,'#f4c828'],[312,180,'#d83020']].forEach(([x,y,f])=>kreis(x,y,24,24,f)); kasten(228,186,120,64,'#b07838'); [200,222].forEach(y=>kasten(228,y,120,7,'#6a4018')); [228,338].forEach(x=>kasten(x,186,10,64,'#6a4018'));
    pfeil(362);
    /* 3 gedeckter Teller mit Gabel und Löffel */
    kasten(414,200,140,60,'#c8863c'); kreis(484,180,56,56,'#8ab0c8'); kreis(484,180,50,50,'#ffffff'); kreis(484,180,34,34,'#e8f0f4'); kreis(470,168,16,16,'#d83020'); kreis(498,170,17,15,'#6ab838'); g.fillStyle='#f08a18'; g.beginPath(); g.moveTo(462,194); g.lineTo(506,188); g.lineTo(466,204); g.fill();
    kasten(421,176,6,62,'#6a6e78'); [416,423,430].forEach(x=>kasten(x,150,4,30,'#6a6e78')); kasten(416,176,18,6,'#6a6e78'); kasten(541,170,6,68,'#6a6e78'); kreis(544,164,11,18,'#6a6e78');
    /* Schmuckrand aus Blättern */
    for(let x=26;x<560;x+=42){ kreis(x,28,16,7,'#5aa838'); kreis(x+20,296,16,7,'#e0a828'); } });
}
function kassenBild(){
  return bild(192,64,(g)=>{ g.fillStyle='#d4f8da'; g.fillRect(0,0,192,64); g.fillStyle='#143a24'; g.font='700 46px Andika, Arial, sans-serif'; g.textAlign='right'; g.textBaseline='middle'; g.fillText('6,50 €',182,34); });
}
function waagenBild(){
  return bild(256,256,(g)=>{ g.fillStyle='#fffaea'; g.fillRect(0,0,256,256); g.strokeStyle='#2a1a08'; for(let i=0;i<=20;i++){ const a=Math.PI*(.8+i*.07), r=i%5?98:86; g.lineWidth=i%5?4:8; g.beginPath(); g.moveTo(128+Math.cos(a)*r,128+Math.sin(a)*r); g.lineTo(128+Math.cos(a)*114,128+Math.sin(a)*114); g.stroke(); }
    g.fillStyle='#2a1a08'; g.font='700 34px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; [0,1,2,3,4].forEach(i=>{ const a=Math.PI*(.8+i*.35); g.fillText(i,128+Math.cos(a)*62,128+Math.sin(a)*62); }); });
}
/* flaches Bild ohne Schatten-Empfang auf einer Fläche */
const schild=(par,tex,w,h,x,y,z)=>BH.tafel(par,tex,w,h,x,y,z);

/* ---------- Kleinteile ---------- */
/* Glas mit Stoffdeckel und Etikett, steht auf y */
function glas(par,x,y,z,farbe,deckel,etikett){
  walze(par,.2,.42,farbe,x,y+.21,z); walze(par,.15,.07,farbe,x,y+.45,z);
  rohr(par,.17,.25,.13,deckel,x,y+.54,z,12); walze(par,.172,.035,CREME,x,y+.505,z);
  schild(par,etikett,.27,.2,x,y+.22,z+.206);
}
function ei(par,x,y,z,f){ ball(par,.1,f,x,y+.12,z,1,1.3,1); }
function apfel(par,x,y,z,f,r){ const s=r||.17; ball(par,s,f,x,y+s,z,1.05,.95,1.05); walze(par,.014,.12,HOLZ3,x,y+s*2,z); ball(par,.06,LAUB2,x+.08,y+s*2+.02,z,1.4,.35,.8); }
function tomate(par,x,y,z){ ball(par,.17,0xd82c1c,x,y,z,1,.9,1); for(let i=0;i<5;i++){ const a=i*1.257; const b=box(par,.12,.025,.04,LAUB3,x+Math.cos(a)*.05,y+.155,z+Math.sin(a)*.05); b.rotation.y=-a; } walze(par,.016,.08,LAUB3,x,y+.19,z); }
function moehre(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  const m=kegel(g,.13,.75,ORANGE,0,0,.12); m.rotation.x=Math.PI/2; [-.1,.08].forEach((c,i)=>{ const r=ring(g,.1-i*.032,.01,0xc05a10,0,0,c+.03); r.castShadow=false; });
  [[-.09,.12],[0,.2],[.09,.1]].forEach(([a,h])=>{ strich(g,[0,0,-.25],[a,h,-.46],.022,LAUB); ball(g,.065,LAUB2,a*1.15,h+.03,-.49,.9,1.1,1.3); });
}
function kohl(par,x,y,z){
  ball(par,.24,0xa8d868,x,y,z,1,.95,1);
  for(let i=0;i<5;i++){ const a=i*1.257+x, b=ball(par,.2,i%2?0x6ab040:0x88c850,x+Math.cos(a)*.17,y-.07,z+Math.sin(a)*.17,1,.75,.4); b.rotation.y=-a+Math.PI/2; }
}
/* offene Lattenkiste, Boden bei y */
function kiste(par,x,y,z,w,h,d){
  box(par,w,.08,d,HOLZ2,x,y+.04,z);
  [-1,1].forEach(s=>[-1,1].forEach(v=>box(par,.12,h,.12,HOLZ2,x+s*(w/2-.06),y+h/2,z+v*(d/2-.06))));
  [.22,.74].forEach(a=>{ [-1,1].forEach(v=>box(par,w,h*.3,.06,HELLHOLZ,x,y+h*a,z+v*(d/2))); [-1,1].forEach(s=>box(par,.06,h*.3,d,HELLHOLZ,x+s*(w/2),y+h*a,z)); });
}
/* Milchkanne, steht auf y=0 */
function milchkanne(par,x,z,s){
  const g=gruppe(par,x,0,z); g.scale.setScalar(s);
  rohr(g,.48,.48,1.15,METALL,0,.64,0); rohr(g,.25,.48,.38,METALL,0,1.4,0); rohr(g,.25,.25,.26,METALL,0,1.71,0);
  walze(g,.34,.12,0xc6ced6,0,1.89,0); walze(g,.2,.1,METALL,0,1.99,0); ball(g,.09,METALL2,0,2.09,0);
  [.1,.45,1.2].forEach(y=>flach(ring(g,.49,.04,METALL2,0,y,0))); flach(ring(g,.27,.03,METALL2,0,1.82,0));
  [-1,1].forEach(v=>{ const r=ring(g,.2,.045,METALL2,v*.38,1.5,0,Math.PI); r.rotation.z=-v*Math.PI/2+v*.35; });
  box(g,.09,.8,.03,0xe4eaf0,-.2,.75,.45).rotation.y=-.42;
}
/* Eimer mit Blumen */
function eimer(par,x,y,z,farbe){
  rohr(par,.45,.33,.8,farbe,x,y+.4,z,16); flach(ring(par,.45,.04,WEISS,x,y+.8,z)); flach(ring(par,.35,.03,WEISS,x,y+.06,z)); walze(par,.41,.04,LAUB3,x,y+.74,z);
  const h=ring(par,.45,.025,METALL2,x,y+.78,z+.04,Math.PI); h.rotation.x=Math.PI*.72;
}
function stiele(par,x,y,z,kopf,n,hoehe){
  for(let i=0;i<n;i++){ const a=i*2.4, r=i?(.16+(i%3)*.11):0, px=x+Math.cos(a)*r, pz=z+Math.sin(a)*r*.7, py=y+hoehe-(i%3)*.17+(i?0:.16);
    strich(par,[x+Math.cos(a)*r*.3,y,z+Math.sin(a)*r*.2],[px,py,pz],.022,LAUB3); ball(par,.1,LAUB,x+Math.cos(a)*.34,y+.12+(i%2)*.12,z+Math.sin(a)*.24,1.5,.45,.8); kopf(px,py,pz); }
}
/* Brotlaib (lang) mit hellen Einschnitten */
function laib(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0; ball(g,.23,BROT,0,.17,0,.82,.8,1.75);
  [-.18,0,.18].forEach(c=>{ const s=box(g,.25,.035,.055,KRUME,0,.348-Math.abs(c)*.16,c); s.rotation.y=.55; });
}
function rundbrot(par,x,y,z){
  ball(par,.33,BROT2,x,y+.19,z,1,.68,1); [-.13,0,.13].forEach(a=>{ const s=box(par,.05,.03,.3-Math.abs(a)*.6,KRUME,x+a,y+.41-Math.abs(a)*.12,z); s.rotation.y=.55; });
}
function brezel(par,x,y,z){
  const g=gruppe(par,x,y,z); [-1,1].forEach(s=>ring(g,.14,.05,BROT,s*.13,.06,0)); ring(g,.26,.055,BROT,0,.07,0,Math.PI).rotation.z=Math.PI;
  strich(g,[-.13,.2,.03],[.1,-.1,.03],.045,BROT); strich(g,[.13,.2,.03],[-.1,-.1,.03],.045,BROT);
}

/* ---------- Ausgang: die Klöntür ---------- */
function baueTuer(k,sc,hinten){
  /* Hof im Abendrot hinter der Öffnung */
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(10,5),basis(0xffffff,{map:hofBild()})); aus.position.set(AX,2.5,HINTEN-4.5); hinten.add(aus);
  const o=gruppe(hinten,0,0,0);
  box(o,9,.04,4.5,0x779c44,AX,-.014,HINTEN-2.3); box(o,2.1,.03,4.1,0xdcbc84,AX+.2,.012,HINTEN-2.2);
  [-1,1].forEach(s=>{ const x0=AX+s*1.55; for(let i=0;i<3;i++){ const x=x0+s*i*.65; box(o,.12,.9,.12,CREME,x,.45,HINTEN-2.7); } box(o,1.5,.1,.08,CREME,x0+s*.65,.72,HINTEN-2.68); box(o,1.5,.1,.08,CREME,x0+s*.65,.38,HINTEN-2.68); });
  BH.ballen(o,AX-1.7,0,HINTEN-1.7,.4,1.2);
  verschmelze(o); ohneSchatten(o);
  BH.huhn(k,hinten,AX+1.25,0,HINTEN-1.9,Math.PI+.5,{ gr:1.1, phase:2 });
  /* Türrahmen mit kleinem Vordach */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.34,4.6,.42,WEISS,s*1.57,2.3,.08); box(r,.46,.34,.52,HOLZ3,s*1.57,.17,.1); });
  box(r,3.9,.36,.5,WEISS,0,4.58,.1); box(r,2.8,.06,.7,0xa8a296,0,.02,.06);
  [-1,1].forEach(s=>{ const d=box(r,2.3,.2,.75,ROT2,s*1.0,5.12,.3); d.rotation.z=-s*.27; });
  ball(r,.15,GOLD,0,5.47,.66);
  verschmelze(r);
  /* zwei Türhälften, Drehpunkt links, schwingen nach draußen */
  const haelfte=(y0)=>{ const g=gruppe(hinten,AX-1.39,y0,HINTEN+.06); g.userData.lebendig=true; for(let i=0;i<5;i++) box(g,.545,2.14,.16,i%2?TUERGRUEN2:TUERGRUEN,.28+i*.555,1.09,0); return g; };
  const unten=haelfte(.03), oben=haelfte(2.2);
  /* unten: Rahmenleisten und Kreuz */
  [.18,2.0].forEach(y=>box(unten,2.6,.2,.08,CREME,1.39,y,.11)); [.19,2.59].forEach(x=>box(unten,.2,1.9,.08,CREME,x,1.09,.11));
  [-1,1].forEach(s=>{ const d=box(unten,2.9,.17,.06,CREME,1.39,1.09,.115+s*.004); d.rotation.z=s*.65; });
  ring(unten,.13,.035,GOLD,2.3,1.82,.2); ball(unten,.07,GOLD,2.3,1.95,.17);
  /* oben: Fenster mit Abendhimmel, darunter das Zahlenschloss */
  const glasT=new THREE.Mesh(new THREE.PlaneGeometry(1.9,.9),basis(0xffffff,{map:abendFensterBild(192)})); glasT.position.set(1.39,1.5,.095); oben.add(glasT);
  [.99,2.01].forEach(y=>box(oben,2.14,.14,.1,CREME,1.39,y,.11)); [.37,1.39,2.41].forEach(x=>box(oben,.12,1.1,.1,CREME,x,1.5,.115));
  box(oben,1.4,.88,.07,HOLZ3,1.39,.5,.1);
  BH.zahlenschloss(oben,1.39,.36,.22).scale.setScalar(1.15);
  [unten,oben].forEach((g,i)=>{ [.35,i?2.08:1.65].forEach(y=>{ box(g,.55,.13,.05,EISEN,.3,y,.17); ball(g,.05,METALL,.12,y,.2); ball(g,.05,METALL,.46,y,.2); }); verschmelze(g); });
  const glanz=schein(hinten,'rgba(255,225,110,.4)',AX,2.5,HINTEN+.75,1.2);
  const licht=new THREE.PointLight(0xffa860,.15,10,1.5); licht.position.set(AX,3.0,HINTEN-1.4); sc.add(licht);
  k.kasten(AX,-13.15,3.7,.8); /* geschlossene Tür: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  let beginn=null;
  return ausgang(k,{ name:'Klöntür zum Hof', einfach:'Tür zum Hof', steh:[AX+.2,-11.15], durch:[AX+.3,-15.3], losNach:1.8,
    treffer:{x:AX,y:2.4,z:-12.95,b:3.5,h:4.8,t:.9}, schildOben:[AX,5.3,-12.4], glanz:[AX,2.5,-12.7],
    bewege:(auf,t)=>{ if(auf<.001) beginn=null; else if(beginn===null) beginn=t;
      const s=beginn===null?0:t-beginn, weich=a=>a*a*(3-2*a);
      oben.rotation.y=1.5*weich(klemm(s/.75)); unten.rotation.y=1.4*weich(klemm((s-.8)/.75));
      glanz.visible=auf<.05; licht.intensity=.15+1.1*auf; } });
}

/* ---------- Wandschmuck ---------- */
/* Fenster mit Abendsonne, an der Wand: Blick nach +z der Gruppe */
function fenster(par,x,z,dreh,br,sonneX){
  const f=gruppe(par,x,0,z); f.rotation.y=dreh||0;
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(br,2.0),basis(0xffffff,{map:abendFensterBild(sonneX)})); aus.position.set(0,3.2,.05); f.add(aus);
  [-1,1].forEach(s=>box(f,.18,2.3,.22,WEISS,s*(br/2+.07),3.2,.1));
  box(f,br+.34,.18,.22,WEISS,0,4.29,.1); box(f,br+.5,.16,.4,WEISS,0,2.12,.18);
  box(f,.08,2.0,.08,WEISS,0,3.2,.1); box(f,br,.08,.08,WEISS,0,3.35,.1);
  /* rot-weiße Vorhänge */
  [-1,1].forEach(s=>{ for(let i=0;i<3;i++) box(f,.18,1.9-i*.12,.07,i%2?CREME:ROT,s*(br/2+.1-i*.16),3.32+i*.06,.2+(i%2)*.035); box(f,.55,.09,.12,GOLD,s*(br/2-.06),2.85,.24); });
  strich(f,[-br/2-.4,4.43,.24],[br/2+.4,4.43,.24],.045,HOLZ3); [-1,1].forEach(s=>ball(f,.09,GOLD,s*(br/2+.42),4.43,.24));
  verschmelze(f); ohneSchatten(f);
  schein(f,'rgba(255,170,80,.28)',0,3.1,.5,br+1.2);
}
function laterne(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,.3,.5,.08,EISEN,0,.35,.06); strich(g,[0,.45,.08],[0,.65,.4],.04,EISEN); strich(g,[0,.65,.4],[0,.44,.4],.025,EISEN);
  kegel(g,.32,.24,EISEN,0,.36,.4); box(g,.32,.44,.32,basis(0xffd870),0,0,.4); [-.17,.17].forEach(a=>[-.17,.17].forEach(c=>box(g,.05,.48,.05,EISEN,a,0,.4+c))); box(g,.42,.08,.42,EISEN,0,-.26,.4);
  schein(g,'rgba(255,200,110,.5)',0,0,.55,1.6);
}
/* Wimpelkette entlang der x-Achse der Gruppe */
function wimpel(par,x1,x2,y,z){
  const n=Math.max(2,Math.round((x2-x1)/.55)); let alt=null;
  for(let i=0;i<=n;i++){ const u=i/n, x=x1+(x2-x1)*u, h=y-Math.sin(u*Math.PI)*.3, p=[x,h,z]; if(alt) strich(par,alt,p,.018,HOLZ3); alt=p;
    if(i>0&&i<n){ const w=kegel(par,.19,.42,[ROT,GELB,TUERGRUEN2,CREME,BLAU][i%5],x,h-.22,z+.02); w.rotation.x=Math.PI; w.scale.z=.015; } }
}
/* Zwiebelzopf und getrocknete Kräuter, hoch an der Wand */
function zopf(par,x,y,z,dreh,zwiebel){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0; ball(g,.07,HOLZ3,0,.25,.06);
  strich(g,[0,.25,.1],[0,-.95,.14],.04,STROH2);
  if(zwiebel){ for(let i=0;i<7;i++){ const s=i%2?1:-1; ball(g,.15,i%3?0xd89448:0xa84a68,s*.12,-.05-i*.15,.17,1,1,.9); } ball(g,.14,0xd89448,0,-1.15,.17); }
  else for(let i=0;i<7;i++){ const a=(i-3)*.12; strich(g,[0,-.2,.14],[a,-1.05+Math.abs(a)*.5,.17],.016,0x8a8a48); ball(g,.09,i%2?0xa088c8:0x8c9a58,a*1.15,-1.1+Math.abs(a)*.5,.18,.7,1.7,.5); }
}
/* Haken mit Schürze und Strohhut */
function garderobe(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,2.8,.26,.1,HOLZ3,0,0,.06); [-1,0,1].forEach(a=>{ flach(walze(g,.05,.26,HELLHOLZ,a,0,.18)); ball(g,.08,GOLD,a,0,.32); });
  [[-1,TUERGRUEN2],[1,BLAU]].forEach(([a,f])=>{ ring(g,.19,.025,f,a,-.2,.2); box(g,.46,.4,.06,f,a,-.56,.2); box(g,.84,.82,.06,f,a,-1.16,.2); box(g,.46,.3,.04,CREME,a,-1.12,.25); [-1,1].forEach(s=>strich(g,[a+s*.4,-.78,.2],[a+s*.62,-1.1,.18],.025,f)); });
  const hut=gruppe(g,0,-.08,.28); hut.rotation.x=Math.PI/2-.15; walze(hut,.55,.05,STROH,0,0,0); rohr(hut,.22,.3,.24,STROH,0,.13,0,14); walze(hut,.31,.07,ROT,0,.06,0);
}
/* altes Wagenrad als Wandschmuck */
function wagenrad(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  ring(g,1.0,.09,HOLZ2,0,0,.14); ring(g,1.09,.035,EISEN,0,0,.14);
  for(let i=0;i<10;i++){ const a=i*Math.PI/5; strich(g,[0,0,.14],[Math.cos(a)*.97,Math.sin(a)*.97,.14],.05,HOLZ); }
  flach(walze(g,.22,.22,HOLZ3,0,0,.15)); ball(g,.1,GOLD,0,0,.28);
}

/* ---------- Deko am Boden (nichts davon ist ein Gegenstand) ---------- */
function sack(par,x,z,s,farbe){
  const g=gruppe(par,x,0,z); g.scale.setScalar(s||1); const c=farbe||0xd4bc8a;
  rohr(g,.5,.58,.5,c,0,.26,0,14); rohr(g,.4,.5,.55,c,0,.78,0,14); rohr(g,.14,.4,.25,c,0,1.18,0,14);
  flach(ring(g,.15,.05,ROT2,0,1.31,0)); rohr(g,.27,.12,.26,c,0,1.44,0,9); [-.12,.12].forEach(a=>strich(g,[0,1.3,.17],[a,1.0,.44],.025,ROT2));
  box(g,.42,.34,.03,0xb89a64,0,.55,.54).rotation.x=-.12;
}
function fass(par,x,z){
  const g=gruppe(par,x,0,z);
  rohr(g,.66,.54,.75,HOLZ,0,.38,0); rohr(g,.54,.66,.75,HOLZ,0,1.13,0); walze(g,.5,.05,HOLZ2,0,1.52,0);
  [.14,.58,.94,1.38].forEach(y=>flach(ring(g,y>.4&&y<1.1?.65:.58,.04,EISEN,0,y,0)));
}
/* liegendes Saftfass auf einem Bock mit Hahn */
function saftfass(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-.5,.5].forEach(c=>{ box(g,1.5,.5,.2,HOLZ3,0,.25,c); });
  const f=gruppe(g,0,1.1,0); f.rotation.x=Math.PI/2; rohr(f,.72,.6,.7,HOLZ,0,.35,0); rohr(f,.6,.72,.7,HOLZ,0,-.35,0); [-.66,-.25,.25,.66].forEach(y=>flach(ring(f,Math.abs(y)>.5?.64:.71,.04,EISEN,0,y,0)));
  walze(f,.5,.04,HELLHOLZ,0,.72,0); flach(walze(g,.07,.28,GOLD,0,.82,.82)); box(g,.22,.07,.07,GOLD,0,.95,.9);
}
function tisch(par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,.16,1.1,HOLZ2,0,.55,0); walze(g,.55,.1,HOLZ3,0,.05,0); walze(g,1.15,.1,HOLZ,0,1.15,0);
  walze(g,1.18,.04,CREME,0,1.22,0); [-.5,0,.5].forEach(a=>{ box(g,.18,.012,2.0,ROT,a,1.246,0); box(g,2.0,.012,.18,ROT,0,1.248,a); });
  [[-.5,.3],[.45,-.35]].forEach(([a,c])=>{ walze(g,.15,.28,WEISS,a,1.4,c); ring(g,.09,.025,WEISS,a+.17,1.4,c); walze(g,.13,.02,0x8a4a20,a,1.55,c); });
}
function stuhl(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-.42,.42].forEach(a=>{ walze(g,.07,.75,HOLZ2,a,.38,.42); walze(g,.075,1.75,HOLZ2,a,.88,-.42); });
  box(g,1.05,.12,1.05,HELLHOLZ,0,.78,0); box(g,.9,.12,.9,TUERGRUEN2,0,.88,0); [1.35,1.65].forEach(y=>box(g,.92,.18,.09,HELLHOLZ,0,y,-.43));
}
function bank(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-.3,0,.3].forEach((c,i)=>box(g,3.2,.12,.28,i%2?HOLZ:HELLHOLZ,0,.7,c));
  [-1.35,1.35].forEach(a=>box(g,.18,.66,.85,HOLZ2,a,.33,0)); box(g,2.6,.1,.12,HOLZ3,0,.28,0);
  ball(g,.4,ROT,.85,.84,0,1,.34,1); ball(g,.4,TUERGRUEN2,-.9,.84,0,1,.34,1);
}
/* hölzerne Standuhr */
function standuhr(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,1.15,.35,.75,HOLZ3,0,.18,0); box(g,.9,2.4,.6,HOLZ,0,1.55,0); box(g,.5,1.5,.04,HOLZ3,0,1.5,.31);
  box(g,1.2,1.15,.75,HOLZ,0,3.3,0); box(g,1.35,.18,.85,HOLZ3,0,3.96,0); ball(g,.15,GOLD,0,4.15,0);
  flach(walze(g,.44,.06,GOLD,0,3.3,.39)); flach(walze(g,.38,.07,WEISS,0,3.3,.4)); box(g,.05,.28,.02,SCHWARZ,0,3.42,.45); box(g,.2,.06,.02,SCHWARZ,.09,3.3,.45);
  const p=gruppe(g,0,2.25,.37); p.userData.lebendig=true; box(p,.06,.9,.03,GOLD,0,-.45,0); flach(walze(p,.18,.05,GOLD,0,-.95,0)); verschmelze(p); return p;
}
function ecke(par,x,z){ const g=gruppe(par,x,0,z); box(g,.5,H,.5,HOLZ2,0,H/2,0); [.3,3,5.8].forEach(y=>box(g,.62,.18,.62,HOLZ3,0,y,0)); }
function gruppeDreh(par,x,dreh){ const g=gruppe(par,x,0,0); g.rotation.y=dreh; return g; }

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  const h=BH.huelle(k,{ B,T,H, himmelLicht:0xffe4c4, grund:0x5a3e2c, staerke:.74, sonne:0xffb472, sonneStaerke:.42,
    wandBild:BH.bretterBild([226,186,130],'#8a5c34'), bodenBild:BH.dielenBild([170,108,64],'#3c1e0c'), leiste:HOLZ3, sockel:1.25, sockelFarbe:HOLZ, oeffnung:{x:AX,b:2.8,h:4.4} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueTuer(k,sc,hinten);

  /* ---------- Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  fenster(dh,-15.0,HINTEN,0,2.4,250); fenster(dh,7.6,HINTEN,0,2.8,150); fenster(dh,15.9,HINTEN,0,1.9,110);
  laterne(dh,-7.8,3.5,HINTEN); laterne(dh,-3.1,3.5,HINTEN); laterne(dh,2.1,4.1,HINTEN);
  zopf(dh,-12.75,4.4,HINTEN,0,true); zopf(dh,5.45,4.5,HINTEN,0,false); zopf(dh,9.75,4.5,HINTEN,0,true);
  wimpel(dh,-17.4,-8.0,5.9,HINTEN+.2); wimpel(dh,-3.2,5.4,5.95,HINTEN+.2); wimpel(dh,5.4,17.4,5.9,HINTEN+.2);
  [-17.75,17.75].forEach(x=>ecke(dh,x,HINTEN+.15));
  box(dh,B,.26,.24,HOLZ3,0,6.22,HINTEN+.12);
  /* ---------- links ---------- */
  const dl=gruppe(links,0,0,0), LX=-B/2, LD=Math.PI/2;
  fenster(dl,LX,-5.4,LD,2.8,120); fenster(dl,LX,5.4,LD,2.8,270);
  laterne(dl,LX,3.5,-9.2,LD); laterne(dl,LX,3.5,0,LD); laterne(dl,LX,3.5,9.4,LD);
  garderobe(dl,LX,3.9,-1.9,LD); wagenrad(dl,LX,3.4,11.5,LD); zopf(dl,LX,4.5,8.0,LD,true); zopf(dl,LX,4.5,-11.4,LD,false);
  wimpel(gruppeDreh(dl,LX+.2,LD),-12.8,12.8,5.9,0);
  box(dl,.24,.26,T,HOLZ3,LX+.12,6.22,0);
  /* ---------- rechts ---------- */
  const dr=gruppe(rechts,0,0,0), RX=B/2, RD=-Math.PI/2;
  fenster(dr,RX,-5.6,RD,2.8,260); fenster(dr,RX,5.0,RD,2.8,120);
  laterne(dr,RX,3.5,-9.6,RD); laterne(dr,RX,3.5,-.4,RD); laterne(dr,RX,3.5,9.2,RD);
  wagenrad(dr,RX,3.4,-2.5,RD); garderobe(dr,RX,3.9,1.8,RD); zopf(dr,RX,4.5,-11.4,RD,true); zopf(dr,RX,4.5,11.4,RD,false);
  wimpel(gruppeDreh(dr,RX-.2,RD),-12.8,12.8,5.9,0);
  box(dr,.24,.26,T,HOLZ3,RX-.12,6.22,0);
  [dh,dl,dr].forEach(g=>{ verschmelze(g); ohneSchatten(g); });

  /* ---------- Möbel und Deko am Boden ---------- */
  const v=gruppe(sc,0,0,0);
  /* hinten links: Säcke und Fass in der Ecke */
  sack(v,-16.5,-12.3,1.15); sack(v,-15.1,-12.45,.9,0xc4a874); k.kasten(-15.85,-12.35,2.8,1.45);
  fass(v,-13.2,-12.45); k.kreis(-13.2,-12.45,.7);
  /* hinten rechts */
  fass(v,16.8,-12.3); k.kreis(16.8,-12.3,.7); sack(v,15.3,-12.5,.95); k.kreis(15.3,-12.5,.62);
  sack(v,9.2,-12.45,.9,0xc4a874); sack(v,7.9,-12.5,.75); k.kasten(8.55,-12.45,2.5,1.15);
  /* links: Kaffee-Ecke, Saftfässer, Standuhr */
  tisch(v,-14.6,-7.6); k.kreis(-14.6,-7.6,1.2);
  stuhl(v,-16.55,-7.5,Math.PI/2); k.kreis(-16.55,-7.5,.7);
  stuhl(v,-12.5,-7.7,-Math.PI/2); k.kreis(-12.5,-7.7,.7);
  saftfass(v,-16.7,-2.6,Math.PI/2); k.kasten(-16.6,-2.6,2.0,1.55);
  saftfass(v,-16.7,-.7,Math.PI/2); k.kasten(-16.6,-.7,2.0,1.55);
  const pendel=standuhr(v,-17.2,2.6,Math.PI/2); k.kasten(-17.2,2.6,.95,1.4);
  k.anim.push(t=>{ pendel.rotation.z=Math.sin(t*2.8)*.2; });
  BH.ballen(v,-16.8,0,8.0,Math.PI/2,2.0); k.kasten(-16.8,8.0,1.2,2.15);
  sack(v,-16.7,10.5,1.1); k.kreis(-16.7,10.5,.7);
  /* rechts */
  bank(v,16.9,-1.8,RD); k.kasten(16.9,-1.8,1.1,3.35);
  tisch(v,14.7,6.8); k.kreis(14.7,6.8,1.2);
  stuhl(v,16.7,6.8,RD); k.kreis(16.7,6.8,.7);
  stuhl(v,12.6,6.7,Math.PI/2); k.kreis(12.6,6.7,.7);
  fass(v,16.9,2.2); k.kreis(16.9,2.2,.7);
  BH.ballen(v,16.8,0,10.2,RD,2.0); k.kasten(16.8,10.2,1.2,2.15);
  sack(v,16.8,-9.6,1.1,0xc4a874); sack(v,16.9,-10.9,.9); k.kasten(16.85,-10.2,1.35,2.5);
  /* vorn (niedrig) */
  bank(v,-12.0,12.3,0); k.kasten(-12.0,12.3,3.35,1.1);
  BH.ballen(v,-7.2,0,12.3,.06,2.1); k.kasten(-7.2,12.3,2.3,1.2);
  sack(v,-4.7,12.35,.9); k.kreis(-4.7,12.35,.58);
  fass(v,2.8,12.25); k.kreis(2.8,12.25,.7);
  sack(v,4.4,12.35,.95,0xc4a874); k.kreis(4.4,12.35,.6);
  bank(v,8.2,12.3,0); k.kasten(8.2,12.3,3.35,1.1);
  BH.ballen(v,12.8,0,12.3,-.05,2.1); k.kasten(12.8,12.3,2.3,1.2);
  BH.sparsam(v);
  /* flacher Läufer in der Mitte */
  { const l=gruppe(sc,0,0,0); [[5.6,3.0,0x8a6a48],[5.2,2.6,0xd8bc90],[4.8,2.2,0x9a7a56]].forEach(([w,d,f],i)=>{ const m=box(l,w,.012,d,f,-.5,.006+i*.005,2.6); m.castShadow=false; }); verschmelze(l); }

  /* warmes Abendlicht auf dem Boden vor den Seitenfenstern (flach, durchsichtig) */
  const lm=new THREE.MeshBasicMaterial({map:leuchtBild('rgba(255,180,90,.5)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  [[-13.6,-4.6],[-13.4,6.0],[13.6,-4.8],[7.6,-10.6]].forEach(([x,z])=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(6,3.6),lm); m.rotation.x=-Math.PI/2; m.position.set(x,.02,z); sc.add(m); });

  /* ---------- Licht: vier Laternen (mit der Türlampe fünf Punktlichter) ---------- */
  flacker(k,-9.5,4.0,-10.8,0xffb860,.38,13); flacker(k,6.0,4.2,-10.4,0xffb060,.42,14);
  flacker(k,-14.6,3.8,3.0,0xffc274,.34,14); flacker(k,14.4,3.8,2.0,0xffa860,.38,14);

  /* ---------- Verkäuferin hinter der Theke und Katze ---------- */
  BH.mensch(k,sc,6.8,-6.6,-.1,{ haut:2, hemd:ROT, hose:0x3a8c56, hut:false, haar:0x8a4a1c, gr:1.38, phase:1 }); k.kreis(6.8,-6.6,.5);
  katze(k,[[-7.4,1.6],[-4.2,3.9],[1.2,4.8],[7.0,3.6],[9.4,6.8],[3.0,8.4],[-4.6,8.0],[-7.8,5.6]],1.3);

  return { tuer, start:[0,.6] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.4,-10.4],[-8.2,-8.8],[-2.6,-8.6],[1.8,-7.2],[6.0,-9.8],[14.6,-10.4],[-13.6,-4.4],[-7.6,-5.8],[-.8,-5.0],[3.2,-4.0],
  [14.2,-3.8],[-14.0,1.0],[-8.0,-.4],[8.4,.4],[14.4,1.0],[-13.8,9.2],[-6.0,5.6],[.4,9.6],[6.4,7.6],[11.4,10.0]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-.5, z:HINTEN, wand:'hinten', steh:[-.5,-11.3], kasten:[3.9,.9], treffer:[3.8,3.6,.9], trefferY:1.35, baue(g,k){ /* 1 Marmeladenregal */
      box(g,3.7,3.3,.08,HOLZ3,0,3.15,.07);
      [-1,1].forEach(s=>{ box(g,.18,3.46,.56,HOLZ2,s*1.84,3.15,.3); ball(g,.13,GOLD,s*1.84,4.98,.34); });
      [1.55,2.62,3.69,4.8].forEach(y=>box(g,3.86,.13,.62,HELLHOLZ,0,y,.32));
      const et=[0,1,2,3,4].map(etikettBild);
      /* oben und Mitte Marmelade, unten goldener Honig */
      [[3.755,[[0,0xc01c30],[1,0xe87a10],[2,0x6a2070],[4,0x98102c],[0,0xc01c30],[1,0xe87a10]]],[2.685,[[2,0x6a2070],[4,0x98102c],[1,0xe87a10],[0,0xc01c30],[2,0x6a2070],[4,0x98102c]]]].forEach(([y,l],r)=>l.forEach(([a,f],i)=>glas(g,-1.4+i*.56,y,.34,f,(i+r)%2?ROT:TUERGRUEN2,et[a])));
      [-1.35,-.72,-.09,.54].forEach(x=>{ walze(g,.24,.4,0xf2a612,x,1.82,.34); walze(g,.18,.08,0xffc438,x,2.05,.34); walze(g,.21,.12,GOLD,x,2.14,.34); schild(g,et[3],.32,.24,x,1.82,.585); });
      /* Honiglöffel im Schälchen */
      rohr(g,.28,.18,.2,CREME,1.32,1.72,.36,14); walze(g,.25,.03,0xf2a612,1.32,1.81,.36); strich(g,[1.32,1.8,.36],[1.6,2.42,.42],.035,HELLHOLZ); [0,.07,.14].forEach(a=>{ const r=ring(g,.1,.028,HELLHOLZ,1.34+a*.45,1.84+a,.37+a*.07); r.rotation.x=Math.PI/2; r.rotation.y=-.42; });
      /* Stoffkante oben */
      for(let i=0;i<12;i++){ const w=kegel(g,.17,.28,i%2?CREME:ROT,-1.69+i*.307,4.62,.66); w.rotation.x=Math.PI; w.scale.z=.03; }
      BH.sparsam(g); } },
  { x:-10.3, z:HINTEN, wand:'hinten', steh:[-10.2,-11.3], kasten:[3.8,.8], treffer:[3.7,3.5,.8], trefferY:1.35, baue(g,k){ /* 2 Kreidetafel mit Preisen */
      box(g,3.55,2.85,.08,HOLZ3,0,3.15,.09); schild(g,kreideBild(),3.2,2.5,0,3.15,.14);
      [-1,1].forEach(s=>box(g,.24,2.96,.2,HOLZ,s*1.7,3.15,.16)); [1.74,4.56].forEach(y=>box(g,3.64,.24,.2,HOLZ,0,y,.16));
      [-1.7,1.7].forEach(x=>[1.74,4.56].forEach(y=>ball(g,.09,GOLD,x,y,.28)));
      box(g,3.2,.08,.4,HELLHOLZ,0,1.6,.3);
      [[-.95,WEISS],[-.55,GELB],[-.15,0xffa0b8]].forEach(([x,f])=>quer(walze(g,.045,.3,f,x,1.69,.36))); box(g,.5,.15,.22,0xe8b030,.9,1.72,.34); box(g,.5,.07,.23,0x4a6a8a,.9,1.83,.34);
      strich(g,[-1.2,4.68,.14],[0,5.15,.1],.025,HOLZ3); strich(g,[1.2,4.68,.14],[0,5.15,.1],.025,HOLZ3); ball(g,.1,GOLD,0,5.15,.14); } },
  { x:-4.9, z:-3.5, dreh:.14, steh:[-4.55,-1.45], kasten:[3.7,2.0], treffer:[3.5,2.2,1.8], baue(g,k){ /* 3 Gemüsekisten */
      kiste(g,-.86,0,0,1.6,.7,1.35); kiste(g,.86,0,0,1.6,.7,1.35);
      /* vorn in den unteren Kisten: Tomaten links, Möhren rechts */
      box(g,1.45,.46,1.2,0x7a1c10,-.86,.36,0); box(g,1.45,.46,1.2,0x9a5214,.86,.36,0);
      for(let r=0;r<2;r++) for(let i=0;i<4;i++) tomate(g,-1.38+i*.35+r*.05,.76+r*.05,.48-r*.31);
      [[.36,.76,.34,.08],[.66,.78,.42,-.1],[.98,.76,.32,.12],[1.32,.78,.41,-.06],[.52,.94,.3,.2],[.86,.96,.34,0],[1.2,.94,.29,-.18]].forEach(([x,y,z,d])=>moehre(g,x,y,z,d));
      /* obere Kiste, nach hinten versetzt: Kohlköpfe und Salat */
      const o=gruppe(g,0,.72,-.58); kiste(o,0,0,0,1.65,.65,.88); box(o,1.5,.4,.74,0x4a7a28,0,.3,0);
      [-.5,.04,.55].forEach((x,i)=>kohl(o,x,.74+(i===1?.08:0),.02));
      /* ein Kürbis lehnt an der Seite */
      [-.17,0,.17].forEach(a=>ball(g,.3,a?0xe8761a:0xf48a28,1.78+a*.7,.27,.62,.75,.9,1)); strich(g,[1.78,.5,.62],[1.86,.68,.62],.045,LAUB3);
      BH.sparsam(g); } },
  { x:7.3, z:-5.1, steh:[6.4,-3.1], kasten:[5.1,1.65], treffer:[5.0,2.9,1.6], baue(g,k){ /* 4 Ladentheke mit Kasse */
      box(g,4.7,1.2,1.25,0xcc9452,0,.68,0); box(g,4.76,.14,1.32,HOLZ3,0,.07,0); box(g,5.05,.14,1.55,HOLZ2,0,1.36,0);
      [-1.74,-.58,.58,1.74].forEach(x=>{ box(g,.95,.82,.05,HOLZ,x,.72,.65); box(g,.7,.58,.05,0xdcaa68,x,.72,.67); ball(g,.09,TUERGRUEN2,x,.72,.7,1.6,1.6,.35); });
      /* Kasse */
      const ka=gruppe(g,.95,1.43,0);
      box(ka,1.45,.3,1.0,0x1f6a68,0,.15,0); box(ka,1.3,.14,.04,0x2c8884,0,.15,.52); ball(ka,.07,GOLD,0,.15,.57);
      box(ka,1.3,.5,.6,0x2c8884,0,.55,-.16);
      const tasten=gruppe(ka,0,.56,.26); tasten.rotation.x=-.65; box(tasten,1.24,.62,.08,0x17504e,0,0,0);
      for(let r=0;r<3;r++) for(let i=0;i<5;i++) flach(walze(tasten,.085,.1,r===2&&i===4?ROT:CREME,-.46+i*.23,.18-r*.18,.07));
      box(ka,1.05,.5,.32,GOLD,0,1.05,-.28); schild(ka,kassenBild(),.9,.32,0,1.07,-.115); box(ka,1.15,.09,.4,0x1f6a68,0,1.34,-.28);
      quer(walze(ka,.045,.3,GOLD,.86,.5,-.1)); strich(ka,[.98,.5,-.1],[.98,.78,.08],.04,GOLD); ball(ka,.09,ROT2,.98,.8,.1);
      /* Papiertüte mit Möhrengrün, Kürbis, Tischklingel */
      const t=gruppe(g,-1.6,1.43,-.05); rohr(t,.38,.32,.8,0xcaa470,0,.4,0,4).rotation.y=Math.PI/4; box(t,.55,.08,.04,0xa8844e,0,.76,.28);
      [-.17,0,.17].forEach((a,i)=>{ const m=kegel(t,.09,.46,ORANGE,a,.98+(i%2)*.05,0); m.rotation.x=Math.PI; m.rotation.z=-a*.7; [-.07,0,.07].forEach(b=>strich(t,[a*1.15,1.2+(i%2)*.05,0],[a*1.3+b,1.38+(i%2)*.05,.03],.012,LAUB2)); });
      [-.12,0,.12].forEach(a=>ball(g,.22,a?0xe8761a:0xf48a28,-.65+a*.8,1.62,.2,.75,.9,1)); walze(g,.035,.14,LAUB3,-.65,1.86,.2);
      walze(g,.18,.05,HOLZ3,2.18,1.46,.4); ball(g,.15,GOLD,2.18,1.48,.4,1,.75,1); ball(g,.04,METALL2,2.18,1.62,.4);
      BH.sparsam(g); } },
  { x:-11.2, z:-3.7, dreh:.2, steh:[-10.75,-1.65], kasten:[2.8,1.8], treffer:[2.6,3.15,1.5], baue(g,k){ /* 5 Ladenwaage */
      /* niedriger Tisch */
      box(g,2.5,.14,1.45,HOLZ,0,.88,0); [-1.08,1.08].forEach(a=>[-.56,.56].forEach(c=>box(g,.16,.82,.16,HOLZ2,a,.41,c))); box(g,2.1,.08,1.1,HOLZ2,0,.3,0);
      const w=gruppe(g,-.25,.95,0); w.scale.setScalar(.86);
      box(w,1.45,.2,.9,ROT2,0,.1,0); rohr(w,.55,.75,1.05,ROT,0,.72,0,4).rotation.y=Math.PI/4; box(w,.94,.14,.66,ROT,0,1.28,0);
      flach(walze(w,.45,.08,GOLD,0,.72,.5)); const z=new THREE.Mesh(new THREE.CircleGeometry(.39,28),new THREE.MeshLambertMaterial({map:waagenBild()})); z.position.set(0,.72,.545); w.add(z);
      const zeiger=gruppe(w,0,.72,.57); zeiger.userData.lebendig=true; box(zeiger,.04,.34,.015,SCHWARZ,0,.13,0); ball(zeiger,.045,ROT2,0,0,.01); k.anim.push(t=>{ zeiger.rotation.z=-.45+Math.sin(t*1.7)*.09; });
      /* große Schale mit Äpfeln */
      walze(w,.11,.24,METALL2,0,1.46,0); rohr(w,.95,.55,.2,0xd4dce2,0,1.66,0,24); flach(ring(w,.95,.04,METALL,0,1.76,0)); walze(w,.9,.02,0xaab4bc,0,1.755,0);
      [[-.42,.15,0xd8281c],[-.05,.28,0x8cc83a],[.36,.12,0xd8281c],[-.2,-.22,0xe8b828],[.22,-.24,0x8cc83a]].forEach(([x,z2,f])=>apfel(w,x,1.76,z2,f,.19)); apfel(w,0,2.0,0,0xd8281c,.19);
      /* Gewichte daneben */
      [[.82,.17,.34,.1],[1.05,.12,.25,.45],[.78,.09,.18,.5]].forEach(([x,r,hh,z2])=>{ walze(g,r,hh,GOLD,x,.95+hh/2,z2); walze(g,r*.35,.08,GOLD,x,.98+hh,z2); ball(g,r*.45,GOLD,x,1.05+hh,z2); });
      BH.sparsam(g); } },
  { x:12.0, z:HINTEN, wand:'hinten', steh:[11.8,-11.3], kasten:[3.9,.8], treffer:[3.8,3.5,.8], trefferY:1.4, baue(g,k){ /* 6 Tafel Vom Hof auf den Tisch */
      box(g,3.7,2.25,.08,HELLHOLZ,0,3.05,.09); schild(g,hofTafelBild(),3.4,1.9,0,3.05,.14);
      [-1,1].forEach(s=>box(g,.2,2.36,.18,HOLZ2,s*1.78,3.05,.15)); [1.97,4.13].forEach(y=>box(g,3.76,.18,.18,HOLZ2,0,y,.15));
      /* kleines rotes Dach und Halme */
      [-1,1].forEach(s=>{ const d=box(g,2.15,.17,.4,ROT,s*.95,4.52,.24); d.rotation.z=-s*.22; }); ball(g,.12,GOLD,0,4.82,.4);
      [-1,1].forEach(s=>[0,1,2].forEach(i=>{ const x=s*(1.45+i*.18); strich(g,[s*1.6,1.45,.26],[x,1.98,.3],.025,STROH2); ball(g,.07,STROH,x,2.04,.31,.75,1.9,.75); })); [-1.6,1.6].forEach(x=>box(g,.28,.1,.1,ROT,x,1.62,.3));
      BH.sparsam(g); } },
  { x:3.7, z:-12.65, steh:[3.7,-10.7], kasten:[2.65,1.35], treffer:[2.5,4.0,1.3], baue(g,k){ /* 7 Eierschrank */
      [-1,1].forEach(s=>[-.4,.4].forEach(c=>walze(g,.1,.35,0x5a7488,s*1.0,.18,c)));
      box(g,2.3,2.9,.1,0xbcdcea,0,1.8,-.46); [-1,1].forEach(s=>box(g,.14,2.9,1.0,WEISS,s*1.15,1.8,0));
      box(g,2.44,.2,1.1,WEISS,0,.42,0); box(g,2.44,.16,1.1,WEISS,0,3.3,0);
      [.5,1.45,2.35].forEach((y,r)=>{ box(g,2.2,.07,.9,0x8aaabc,0,y,-.02);
        [-.55,.55].forEach((x,i)=>{ box(g,.94,.17,.5,0xa8844c,x,y+.12,.12); [-.3,0,.3].forEach((a,j)=>{ ei(g,x+a,y+.17,.22,(r+i+j)%3?EIFARBE:EIBRAUN); ei(g,x+a,y+.17,-.02,(r+i)%2?EIFARBE:EIBRAUN); }); }); });
      /* Glastüren */
      const gm=mat(0xd8f4ff,{transparent:true,opacity:.14,depthWrite:false});
      [-.55,.55].forEach(x=>{ hell(box(g,1.06,2.7,.02,gm,x,1.86,.52)); [-.52,.52].forEach(a=>box(g,.07,2.76,.06,0x5a7488,x+a,1.86,.53)); [.52,3.2].forEach(y=>box(g,1.1,.07,.06,0x5a7488,x,y,.53)); });
      [-.1,.1].forEach(x=>box(g,.06,.42,.1,GOLD,x,1.8,.58));
      /* gelber Aufsatz mit großem Ei */
      box(g,2.55,.34,1.15,GELB,0,3.53,0); rohr(g,.3,.18,.22,ROT,0,3.8,.2,16); ball(g,.29,EIFARBE,0,4.14,.2,1,1.3,1); [-.8,.8].forEach(x=>ei(g,x,3.7,.3,EIBRAUN));
      BH.sparsam(g); } },
  { x:4.4, z:-.7, steh:[3.55,1.35], r:1.4, treffer:[2.6,2.4,2.0], baue(g,k){ /* 8 Blumeneimer */
      /* hinten ein Hocker mit Sonnenblumen */
      box(g,.9,.1,.8,HELLHOLZ,0,.6,-.5); [-.34,.34].forEach(a=>[-.29,.29].forEach(c=>box(g,.1,.56,.1,HOLZ2,a,.28,-.5+c)));
      eimer(g,0,.65,-.5,0x3a74c0);
      stiele(g,0,1.4,-.5,(x,y,z)=>{ const b=gruppe(g,x,y,z+.06); b.rotation.x=-.4; for(let i=0;i<10;i++){ const a=i*Math.PI/5; const p=ball(b,.11,GELB,Math.cos(a)*.17,Math.sin(a)*.17,0,1.5,.65,.3); p.rotation.z=a; } ball(b,.12,0x6a3a10,0,0,.03,1,1,.55); },5,.85);
      eimer(g,-.82,0,.25,0xc8362a);
      stiele(g,-.82,.72,.25,(x,y,z)=>{ ball(g,.13,0xf0487a,x,y,z,.95,1.15,.95); [-.07,0,.07].forEach((a,i)=>kegel(g,.05,.15,0xf0487a,x+a,y+.14+(i===1?.02:0),z)); },7,.82);
      eimer(g,.82,0,.3,0x3a9448);
      stiele(g,.82,.72,.3,(x,y,z)=>{ for(let i=0;i<6;i++){ const a=i*1.047; ball(g,.07,WEISS,x+Math.cos(a)*.1,y,z+Math.sin(a)*.1,1.3,.45,1); } ball(g,.065,ORANGE,x,y+.03,z); },7,.68);
      BH.sparsam(g); } },
  { x:-11.6, z:4.0, dreh:.2, steh:[-9.7,4.9], r:1.35, treffer:[2.5,2.5,1.8], baue(g,k){ /* 9 Milchkannen */
      milchkanne(g,-.5,-.35,1.12); milchkanne(g,.58,-.05,.98); milchkanne(g,-.28,.65,.72);
      BH.sparsam(g); } },
  { x:15.0, z:-6.5, steh:[14.4,-4.55], kasten:[3.45,1.45], treffer:[3.3,3.7,1.4], baue(g,k){ /* 10 Brotregal */
      [-1.55,1.55].forEach(s=>{ box(g,.16,3.2,.2,HOLZ2,s,1.6,-.5); box(g,.16,1.5,.2,HOLZ2,s,.75,.5); strich(g,[s,1.45,.5],[s,3.1,-.45],.075,HOLZ2); ball(g,.14,GOLD,s,3.26,-.5); });
      box(g,3.0,2.55,.06,HOLZ3,0,1.75,-.55); box(g,3.2,.18,.24,HELLHOLZ,0,3.1,-.5);
      /* drei schräge Böden mit Leiste vorn */
      [[.55,.12],[1.55,-.02],[2.45,-.16]].forEach(([y,z],r)=>{ const b=gruppe(g,0,y,z); b.rotation.x=.2; box(b,3.1,.09,.82,HELLHOLZ,0,0,0); box(b,3.14,.16,.08,HOLZ,0,.07,.44);
        if(r===0) [-1.05,-.35,.35,1.05].forEach((x,i)=>laib(b,x,.05,0,(i%2?.18:-.18)));
        else if(r===1) [-1.0,0,1.0].forEach(x=>rundbrot(b,x,.05,0));
        else { [-1.05,-.45].forEach(x=>laib(b,x,.05,0,.35)); [.4,1.1].forEach(x=>{ const bz=gruppe(b,x,.3,.08); bz.rotation.x=-.45; brezel(bz,0,0,0); }); } });
      /* Ährenbund oben */
      [-.3,-.2,-.1,0,.1,.2,.3].forEach(a=>{ strich(g,[a*.3,3.18,-.42],[a*1.6,3.58,-.42],.016,STROH2); for(let j=0;j<4;j++) [-1,1].forEach(v=>ball(g,.032,STROH,a*(1.6+j*.17)+v*.028,3.58+j*.055,-.42,.8,1.5,.8)); }); box(g,.34,.13,.16,ROT,0,3.28,-.42);
      BH.sparsam(g); } }
];

return { titel:'Der Hofladen', breite:B, tiefe:T, baue, gegenstaende, verstecke, oben:['34,20,14','58,36,24','92,60,38'] };
})();

/* Schlussbild Bauernhof: Hoffest im Abendrot. Die Spielfigur fährt auf dem roten Traktor mit dem vollen Erntewagen
   (Kürbisse, Salat, Möhren, Strohballen) durch das offene Hoftor und hält mitten auf dem Hof. Bäuerin, Bauer und
   Kinder winken, Huhn, Küken, Katze und Hund freuen sich, Lichterketten gehen an, Konfetti, Glühwürmchen und erste
   Sterne. Der Hofladen ist ausverkauft (leere Kisten), die Felder sind abgeerntet. Ohne Schrift. */
FINALE3D.bauernhof = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  const DUNST=0xf2a67a;
  sc.background=new THREE.Color(DUNST);
  sc.fog=new THREE.Fog(DUNST,34,110);
  BH.freiluft(k,{ himmelLicht:0xffe6d2, grund:0x56563a, staerke:.74, sonne:0xffbc7a, sonneStaerke:.48, bodenFarbe:'#678c3c' });
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D(), FARBE=new THREE.Color();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const BUNT=[0xff4f6e,0xffd21e,0x2fb4ff,0x3fd07a,0xb264ec,0xff8a30];
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  const werfer=[];
  const fleckM=basis(0x000000,{transparent:true,opacity:.24,depthWrite:false});
  const fleck=(par,r,x,z,sx,y)=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(r,18),fleckM); m.rotation.x=-Math.PI/2; m.position.set(x,y||.035,z); m.scale.x=sx||1; par.add(m); return m; };
  /* Giebelstück: Vieleck in der x-y-Ebene, nach hinten und vorn gleich tief */
  const giebel=(par,punkte,tiefe,farbe,x,y,z)=>{ const f=new THREE.Shape(); punkte.forEach((p,i)=>i?f.lineTo(p[0],p[1]):f.moveTo(p[0],p[1]));
    const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tiefe,bevelEnabled:false}),mat(farbe)); m.position.set(x,y,z-tiefe/2); m.castShadow=true; m.receiveShadow=true; par.add(m); return m; };
  /* schräge Dachplatte von a nach b (jeweils [x,y]) */
  const platte=(par,a,b,tiefe,dick,farbe,z)=>{ const dx=b[0]-a[0], dy=b[1]-a[1]; const m=box(par,Math.hypot(dx,dy)+.18,dick,tiefe,farbe,(a[0]+b[0])/2,(a[1]+b[1])/2,z||0); m.rotation.z=Math.atan2(dy,dx); return m; };

  /* ---------- Abendhimmel: Verlauf, tiefe Sonne, Wolken, erste Sterne ---------- */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#1e2258'); v.addColorStop(.35,'#3a3a7e'); v.addColorStop(.42,'#6e5694'); v.addColorStop(.448,'#d4708a'); v.addColorStop(.474,'#ff9466'); v.addColorStop(.5,'#ffc474'); v.addColorStop(.53,'#f2a67a'); v.addColorStop(1,'#f2a67a'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(116,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(1,32),basis(0xffe48a,{fog:false})); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,160,70,.8)',0,0,0,18); sonnenSchein.material.fog=false;
  const wolkeHell=basis(0xffbca0,{fog:false}), wolkeLila=basis(0xb26a96,{fog:false});
  /* [Bildplatz x, Bildplatz y, Größe] */
  const wolken=[[-.8,.84,.65],[.06,.9,.4],[.78,.8,.6]].map(p=>{ const g=gruppe(sc,0,0,0);
    [[-2.4,0,1.2],[-.9,.35,1.6],[.9,.2,1.4],[2.4,-.05,1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1.3,.4,.4));
    ball(g,1,wolkeLila,0,-.34,.15,4.1,.36,.4); verschmelze(g); ohneSchatten(g); return { g, p }; });
  const NS=60, sterne=menge(new THREE.OctahedronGeometry(1,0),basis(0xfff6d0,{fog:false}),NS), sd=[];
  for(let i=0;i<NS;i++) sd.push({ x:-1+2*((i*.618034)%1), y:.76+zufall()*.23, g:i%8?.0035+zufall()*.003:.012, p:zufall()*6.28, ab:3+zufall()*6.5 });
  sterne.visible=false;

  /* ---------- Hügel, Hofweg, abgeerntete Felder ---------- */
  const huegel=gruppe(sc,0,0,0);
  /* [x, z, Breite, Höhe, Farbe] */
  [[-52,-56,24,6,0x5c7a44],[-22,-66,26,5,0x7a7a52],[8,-60,20,4.2,0x68804a],[36,-58,22,6,0x7a7c48],[64,-54,22,7,0x5c7646],[-34,-86,30,10,0x8a7282],[22,-90,36,9,0x96788a]]
    .forEach(p=>ball(huegel,1,p[4],p[0],-.4,p[1],p[2],p[3],p[2]*.4));
  verschmelze(huegel); ohneSchatten(huegel);
  /* Start der Fahrt und Halteplatz: gerade Linie, Fahrtrichtung leicht nach vorn */
  const DREH=-.35, DX=Math.cos(DREH), DZ=-Math.sin(DREH), HX=1.9, HZ=2.0, WEIT=21;
  const boden=gruppe(sc,0,0,0);
  const weg=box(boden,42,.02,3.5,0xc09464,HX-DX*17,.002,HZ-DZ*17); weg.rotation.y=DREH;
  [-.95,.95].forEach(v=>{ const s=box(boden,42,.02,.45,0xa87c50,HX-DX*17-DZ*v,.008,HZ-DZ*17+DX*v); s.rotation.y=DREH; });
  /* gepflasterter Festplatz */
  [[0,1.6,7.2,4.4],[-.4,-3,5.4,3]].forEach((p,i)=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(1,40),mat(i?0xc49a6c:0xbc9466)); m.rotation.x=-Math.PI/2; m.position.set(p[0],-.004+i*.002,p[1]); m.scale.set(p[2],p[3],1); m.receiveShadow=true; boden.add(m); });
  const stoppeln=[];
  /* Felder: [x, z, Breite, Tiefe, Erde] */
  [[-19,-21,20,11,0xc8a04a],[3,-22,20,12,0x94683c],[25,-20,20,10,0xd0aa50],[20.5,-3,15,13,0x9a6c40],[-22.5,6,15,12,0xd0aa50]].forEach((f,n)=>{
    box(boden,f[2],.02,f[3],f[4],f[0],-.002,f[1]);
    for(let z=-f[3]/2+.5;z<f[3]/2;z+=1.05){ box(boden,f[2]-.5,.07,.34,n%2?0x7c522c:0xb08838,f[0],.02,f[1]+z);
      if(n%2===0) for(let x=-f[2]/2+.5;x<f[2]/2;x+=.75) stoppeln.push([f[0]+x+zufall()*.3,.18,f[1]+z+.5,.07,.3,.07,[0xf0cc62,0xdcb044][stoppeln.length%2],0,(zufall()-.5)*.4,(zufall()-.5)*.4]); } });
  verschmelze(boden); ohneSchatten(boden); boden.traverse(m=>{ if(m.isMesh) m.receiveShadow=true; });
  BH.viele(sc,GEO.cone,stoppeln);
  /* runde Strohrollen auf den Stoppelfeldern */
  const rollen=gruppe(sc,0,0,0);
  [[-17,-18,.3],[-24,-23,-.5],[-12.5,-23,1],[20,-19,.4],[29,-22,-.3],[-20,5,.5]].forEach(p=>{ const g=gruppe(rollen,p[0],0,p[1]); g.rotation.y=p[2];
    walze(g,.85,1.3,BH.STROH,0,.85,0).rotation.x=Math.PI/2; [.62,.4,.18].forEach((r,i)=>ring(g,r,.05,i%2?BH.STROH:BH.STROH2,0,.85,.67)); });
  verschmelze(rollen); ohneSchatten(rollen);

  /* ---------- Zaun mit offenem Hoftor ---------- */
  const zaunTeile=[];
  const zaun=(x1,z1,x2,z2)=>{ const l=Math.hypot(x2-x1,z2-z1), n=Math.max(1,Math.round(l/1.5)), d=-Math.atan2(z2-z1,x2-x1);
    for(let i=0;i<=n;i++) zaunTeile.push([misch(x1,x2,i/n),.55,misch(z1,z2,i/n),.18,1.1,.18,0x8a5e34,d]);
    [.45,.85].forEach(y=>zaunTeile.push([(x1+x2)/2,y,(z1+z2)/2,l,.12,.08,0xc09258,d])); };
  zaun(-32,-13.6,32,-13.6); zaun(-12.6,-13.6,-12.6,-6.4); zaun(-12.6,.4,-12.6,7.5); zaun(11.6,-13.6,11.6,4.6); zaun(11.6,4.6,22,5.4);
  BH.viele(sc,GEO.box,zaunTeile);
  const tor=gruppe(sc,0,0,0);
  [-6.4,.4].forEach((z,i)=>{ box(tor,.34,2,.34,0x74502a,-12.6,1,z); ball(tor,.24,0xe8b830,-12.6,2.14,z);
    /* Torflügel stehen weit offen, zum Hof hin vom Weg weggedreht */
    const f=gruppe(tor,-12.6,0,z); f.rotation.y=i?-.45:.45;
    [.4,.75,1.1].forEach(y=>box(f,1.9,.12,.08,0xd0a468,1.05,y,0)); [.15,1.95].forEach(x=>box(f,.12,1.1,.1,0xa8743e,x,.75,0)); strich(f,[.15,.4,0],[1.95,1.1,0],.05,0xa8743e); });
  verschmelze(tor); werfer.push(tor);

  /* ---------- Scheune ---------- */
  const scheune=gruppe(sc,-7.4,0,-9.6), sg=gruppe(scheune,0,0,0); werfer.push(scheune);
  box(sg,6.2,3.3,3.6,BH.ROT,0,1.65,0);
  for(let x=-2.8;x<=2.9;x+=.5) box(sg,.05,3.2,.04,BH.ROT2,x,1.65,1.81);
  giebel(sg,[[-3.1,0],[3.1,0],[2.3,1.45],[0,2.3],[-2.3,1.45]],3.6,BH.ROT,0,3.3,0);
  [[[-3.4,3.2],[-2.35,4.82]],[[-2.35,4.82],[0,5.72]],[[0,5.72],[2.35,4.82]],[[2.35,4.82],[3.4,3.2]]].forEach(p=>platte(sg,p[0],p[1],4.1,.2,0x5a3a34,0));
  [-3.1,3.1].forEach(x=>box(sg,.18,3.3,.18,BH.WEISS,x,1.65,1.8));
  /* offenes Tor mit Heu und warmem Licht */
  box(sg,2.8,2.75,.1,BH.WEISS,0,1.37,1.81); box(sg,2.5,2.55,.06,basis(0xffc468),0,1.3,1.87);
  [[-.7,.34,0],[.5,.34,0],[-.1,.98,0]].forEach(p=>BH.ballen(sg,p[0],p[1]-.34,2.0,0,1.05).scale.set(1,.8,.35));
  [-1,1].forEach(v=>{ const f=gruppe(sg,v*2.15,0,1.92); box(f,1.35,2.6,.1,BH.ROT2,0,1.3,0); [.1,2.5].forEach(y=>box(f,1.35,.12,.05,BH.WEISS,0,y,.07)); [-.62,.62].forEach(x=>box(f,.1,2.5,.05,BH.WEISS,x,1.3,.07)); strich(f,[-.6,.15,.08],[.6,2.45,.08],.05,BH.WEISS); strich(f,[.6,.15,.08],[-.6,2.45,.08],.05,BH.WEISS); });
  /* Heuluke und Wetterfahne */
  walze(sg,.62,.12,BH.WEISS,0,4.3,1.82).rotation.x=Math.PI/2; walze(sg,.48,.14,basis(0xffd070),0,4.3,1.85).rotation.x=Math.PI/2; box(sg,.07,.96,.05,BH.WEISS,0,4.3,1.93); box(sg,.96,.07,.05,BH.WEISS,0,4.3,1.93);
  strich(sg,[0,5.7,0],[0,6.5,0],.04,BH.EISEN);
  verschmelze(sg);
  const fahne=gruppe(scheune,0,6.5,0); box(fahne,.9,.06,.06,BH.GOLD,0,0,0); kegel(fahne,.14,.3,BH.GOLD,.55,0,0).rotation.z=-Math.PI/2; box(fahne,.3,.34,.05,BH.GOLD,-.45,.1,0); ball(fahne,.09,BH.GOLD,0,.08,0); verschmelze(fahne);

  /* ---------- Bauernhaus ---------- */
  const haus=gruppe(sc,7.3,0,-9), hg=gruppe(haus,0,0,0); werfer.push(haus);
  box(hg,5.6,3.2,3.4,BH.CREME,0,1.6,0); box(hg,5.7,.4,3.5,BH.STEIN,0,.2,0);
  giebel(hg,[[-2.8,0],[2.8,0],[0,2.2]],3.4,BH.CREME,0,3.2,0);
  platte(hg,[-3.2,3.05],[0,5.55],3.9,.22,0xb8402c,0); platte(hg,[0,5.55],[3.2,3.05],3.9,.22,0xb8402c,0); box(hg,.3,.22,3.95,BH.ROT2,0,5.62,0);
  [-2.75,2.75].forEach(x=>box(hg,.16,3.2,.12,BH.HOLZ2,x,1.6,1.72)); box(hg,5.6,.16,.12,BH.HOLZ2,0,3.15,1.72); box(hg,5.6,.12,.12,BH.HOLZ2,0,1.95,1.72);
  const fensterBau=(x,y,w,h,kasten)=>{ box(hg,w+.2,h+.2,.08,BH.HOLZ2,x,y,1.73); box(hg,w,h,.06,basis(0xffd870),x,y,1.78); box(hg,.07,h,.04,BH.WEISS,x,y,1.82); box(hg,w,.07,.04,BH.WEISS,x,y,1.82);
    [-1,1].forEach(v=>box(hg,.28,h+.1,.07,BH.GRUEN,x+v*(w/2+.26),y,1.76));
    if(kasten){ box(hg,w+.2,.2,.26,BH.HOLZ,x,y-h/2-.2,1.86); for(let i=0;i<6;i++){ ball(hg,.1,[0xe83a3a,0xff8ab0,BH.WEISS][i%3],x-w/2+i*w/5,y-h/2-.02,1.92); ball(hg,.09,BH.LAUB2,x-w/2+i*w/5+.06,y-h/2-.1,1.96); } } };
  fensterBau(-1.55,1.15,.9,.85,true); fensterBau(1.55,1.15,.9,.85,true); fensterBau(-1.2,2.58,.75,.72,false); fensterBau(1.2,2.58,.75,.72,false); fensterBau(0,4.1,.6,.6,false);
  box(hg,1.15,1.9,.1,BH.HOLZ2,0,.95,1.74); box(hg,.92,1.75,.08,0x2f7a4a,0,.9,1.8); ball(hg,.07,BH.GOLD,.28,.9,1.88); platte(hg,[-.85,2.02],[0,2.35],.6,.1,BH.ROT2,1.95); platte(hg,[0,2.35],[.85,2.02],.6,.1,BH.ROT2,1.95);
  box(hg,1.5,.18,.6,BH.STEIN2,0,.09,2.0);
  box(hg,.55,1.5,.55,0xa8503a,1.7,4.8,-.4); box(hg,.7,.16,.7,BH.STEIN2,1.7,5.6,-.4);
  verschmelze(hg);
  const rauchM=basis(0xf4dcd4,{transparent:true,opacity:.6,depthWrite:false});
  const rauch=[0,1,2,3,4].map(()=>{ const m=ball(sc,1,rauchM,0,0,0); m.castShadow=false; return m; });

  /* ---------- Hofladen: ausverkauft, nur noch leere Kisten und Körbe ---------- */
  const laden=gruppe(sc,-.2,0,-8), lg=gruppe(laden,0,0,0); werfer.push(laden);
  box(lg,4,2.6,.2,BH.HELLHOLZ,0,1.3,-1); for(let x=-1.75;x<=1.8;x+=.5) box(lg,.04,2.5,.03,BH.HOLZ2,x,1.3,-.88);
  [-2,2].forEach(x=>[-1,.7].forEach(z=>box(lg,.18,z>0?2.5:2.9,.18,BH.HOLZ2,x,z>0?1.25:1.45,z)));
  for(let i=0;i<10;i++){ const x=-2.07+i*.46, c=i%2?BH.WEISS:BH.GRUEN; const d=box(lg,.46,.1,2.2,c,x,2.75,-.1); d.rotation.x=.24; walze(lg,.23,.08,c,x,2.4,.98).rotation.x=Math.PI/2; }
  box(lg,3.9,.95,.5,BH.HOLZ,0,.48,.55); box(lg,4.1,.12,.75,BH.HOLZ2,0,1.0,.55);
  const kiste=(par,x,y,z,b)=>{ const g=gruppe(par,x,y,z); box(g,b,.06,.5,BH.HOLZ3,0,.03,0); [.12,.3].forEach(h=>{ box(g,b,.12,.05,BH.HELLHOLZ,0,h,.25); box(g,b,.12,.05,BH.HELLHOLZ,0,h,-.25); [-1,1].forEach(v=>box(g,.05,.12,.5,BH.HELLHOLZ,v*b/2,h,0)); }); [-1,1].forEach(v=>box(g,.07,.4,.07,BH.HOLZ,v*b/2,.2,.25)); };
  [-1.3,0,1.3].forEach(x=>kiste(lg,x,1.06,.58,.95)); [-1,.6].forEach((x,i)=>kiste(lg,x,1.5+i*.12,-.62,1.1)); box(lg,3.8,.08,.4,BH.HOLZ2,0,1.46,-.72);
  verschmelze(lg);

  /* ---------- Apfelbäume ---------- */
  const aepfel=[];
  [[-16,-9.6,4.4],[-10.4,5.2,3.4],[2.2,-12.4,4.2],[-2.8,-12.7,3.4],[13.6,-8,4.8],[13.4,.2,4],[-17,2.8,4.2],[12.9,7.2,3.2],[-24,-12,5],[22,-12,5]].forEach((p,i)=>{
    werfer.push(BH.laubbaum(sc,p[0],p[1],p[2],i%2?BH.LAUB:0x62983a));
    const h=p[2]; for(let j=0;j<16;j++){ const a=-1.35+(j*.618034%1)*2.7, e=-.45+((j*.7548)%1)*1.2, r=h*.262;
      aepfel.push([p[0]+Math.sin(a)*Math.cos(e)*r,h*.8+Math.sin(e)*r*.9,p[1]+Math.cos(a)*Math.cos(e)*r,h*.03,h*.03,h*.03,j%5?0xe22a20:0xf8a020]); } });
  BH.viele(sc,GEO.sph,aepfel);
  /* Büsche, Gras, Blumen: nicht auf dem Weg und nicht auf dem Festplatz */
  [[-11.2,-9,.6],[-3.4,-8.6,.5],[3.2,-8.4,.6],[10.8,-6.6,.6],[10.6,-1.6,.5],[-10.8,2.6,.55],[9.6,3.4,.5],[-9,7,.45],[8.8,6.8,.5],[-14.6,-12,.8],[14.8,-12,.8]].forEach(p=>BH.busch(sc,p[0],p[1],p[2]));
  const frei=(x,z)=>{ const rx=x-HX, rz=z-HZ; return Math.abs(-rx*DZ+rz*DX)>2 && (x/7.4)*(x/7.4)+((z-1.6)/4.6)*((z-1.6)/4.6)>1 && !(x<-12.5&&z>0&&x>-30) && !(x>13&&z<4&&z>-10) && !(Math.abs(x+.4)<5.2&&Math.abs(z+3)<2.8); };
  BH.wiesenschmuck(sc,-19,19,-7,12,750,150,frei);

  /* ---------- Lichterketten (keine quer über den Fahrweg) ---------- */
  const mast=gruppe(sc,0,0,0), MAST=[[-10.6,-6.6,4.4],[-3.9,-5.2,4.7],[3.5,-5.2,4.7],[10.6,-5.6,4.4],[10.4,3.2,3.9]];
  MAST.forEach(p=>{ walze(mast,.09,p[2],BH.HOLZ2,p[0],p[2]/2,p[1]); ball(mast,.15,BH.GOLD,p[0],p[2]+.08,p[1]); });
  const birnen=[], glanz=[];
  [[0,1],[1,2],[2,3],[3,4]].forEach((q,n)=>{ const a=MAST[q[0]], b=MAST[q[1]], N=14; let vor=null;
    for(let i=0;i<=N;i++){ const u=i/N, p=[misch(a[0],b[0],u),misch(a[2],b[2],u)-Math.sin(u*Math.PI)*.8,misch(a[1],b[1],u)];
      if(vor) strich(mast,vor,p,.018,BH.EISEN); vor=p;
      if(i>0&&i<N){ birnen.push({ p, c:[0xffe27a,0xff7a6a,0x8ae08a,0xffb040,0x8ac8ff][(i+n)%5], ab:1.2+n*.5+u*2.2 }); if(i%5===2) glanz.push({ p, ab:1.2+n*.5+u*2.2 }); } } });
  verschmelze(mast);
  const lampen=menge(new THREE.SphereGeometry(1,8,6),basis(0xffffff),birnen.length);
  birnen.forEach((b,i)=>lampen.setColorAt(i,FARBE.set(b.c)));
  const scheine=glanz.map(q=>schein(sc,'rgba(255,205,110,.65)',q.p[0],q.p[1]-.14,q.p[2]+.1,1.3));
  const warm=[[-7.4,1.5,-7.4,3.4],[-.2,1.9,-6.7,2.8]].map(p=>({ s:schein(sc,'rgba(255,185,90,.42)',p[0],p[1],p[2],p[3]), g:p[3] }));

  /* ---------- Gespann: Traktor mit Erntewagen ---------- */
  const gespann=gruppe(sc,HX,0,HZ); gespann.rotation.y=DREH; werfer.push(gespann);
  const zug=gruppe(gespann,0,0,0);
  const tr=BH.traktor(zug,0,0,0,{ ohneDach:true });
  const wg=gruppe(zug,0,0,0), wm=-4.35;
  box(wg,3.7,.18,2.1,BH.HOLZ2,wm,.98,0);
  [-1,1].forEach(v=>{ [1.2,1.48].forEach(y=>box(wg,3.7,.22,.12,y>1.3?0x3a9a50:0x2f8442,wm,y,v*1.05)); [-1.85,-.62,.62,1.85].forEach(x=>box(wg,.14,.7,.17,BH.HOLZ3,wm+x,1.31,v*1.06));
    [1.2,1.48].forEach(y=>box(wg,.12,.22,2.1,y>1.3?0x3a9a50:0x2f8442,wm+v*1.85,y,0));
    box(wg,2.9,.18,.14,BH.EISEN,wm,.75,v*.6); });
  [-1.0,1.0].forEach(x=>walze(wg,.09,2.4,BH.EISEN,wm+x,.56,0).rotation.x=Math.PI/2);
  [-.5,.5].forEach(v=>strich(wg,[-2.5,.9,v],[-1.75,.9,0],.07,BH.EISEN)); walze(wg,.12,.3,BH.EISEN,-1.75,.9,0);
  box(wg,3.5,.24,1.9,BH.STROH2,wm,1.19,0);
  /* Strohballen hinten, gestapelt */
  BH.ballen(wg,-5.55,1.28,-.42,Math.PI/2,1.15).scale.set(.95,.85,1); BH.ballen(wg,-5.55,1.28,.52,0,1.15).scale.set(.95,.7,.8); BH.ballen(wg,-5.6,1.96,-.28,.35,1.1).scale.set(.85,.75,.8);
  const kuerbis=(x,y,z,r,c)=>{ [0,1,2,3].forEach(i=>{ const m=ball(wg,r,i%2?c:0xf48c28,x,y,z,1,.76,.56); m.rotation.y=i*Math.PI/4; }); strich(wg,[x,y+r*.65,z],[x+r*.22,y+r*1.12,z],r*.12,0x4a7a28); };
  [[-4.5,1.7,.58,.46],[-3.84,1.66,.68,.4],[-4.1,1.68,-.15,.45],[-3.8,1.62,-.58,.36],[-4.5,1.62,-.6,.4],[-4.12,2.22,.2,.38]].forEach((p,i)=>kuerbis(p[0],p[1],p[2],p[3],i%3===2?0xe05a18:0xee7c22));
  /* Salatköpfe auf einem kleinen Strohpolster */
  box(wg,.85,.55,1.25,BH.STROH,-2.98,1.48,-.28);
  [[-2.82,1.98,.02],[-3.25,2.0,-.3],[-2.85,1.9,-.62],[-4.95,1.56,.86]].forEach((p,i)=>{ ball(wg,.25,0x86c840,p[0],p[1],p[2],1,.82,1); ball(wg,.15,0xc8ec7a,p[0],p[1]+.14,p[2]);
    for(let j=0;j<6;j++){ const a=j*Math.PI/3+i; const bl=ball(wg,.17,j%2?0x4e9a30:0x66b038,p[0]+Math.cos(a)*.2,p[1]+.02,p[2]+Math.sin(a)*.2,.55,.9,1); bl.rotation.y=-a; bl.rotation.z=-.4; } });
  /* Möhren als Haufen vorn, Spitzen zur Bordwand, Grün nach oben */
  for(let i=0;i<11;i++){ const x=-3.34+(i%6)*.15+(i>5?.07:0), y=1.66+(i>5?.17:0), z=.52-(i%3)*.06-(i>5?.1:0);
    const a=[x,y+.14,z-.12], b=[x+.03,y,z+.42]; const dx=b[0]-a[0], dy=b[1]-a[1], dz=b[2]-a[2], l=Math.hypot(dx,dy,dz);
    const m=kegel(wg,.09,l,0xf6761a,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2); m.quaternion.setFromUnitVectors(V(0,1,0),V(dx/l,dy/l,dz/l));
    [-1,0,1].forEach(v=>strich(wg,a,[x+v*.1,y+.52+(v?0:.07),z-.3],.024,v?0x4a9a2c:0x6cbc3a)); }
  /* Blumengirlande an der Seitenwand */
  for(let i=0;i<15;i++){ const x=wm-1.75+i*.25, y=1.44-Math.abs(Math.sin(i*Math.PI/4.65))*.2; [-1,1].forEach(v=>{ ball(wg,.08,[BH.GELB,BH.WEISS,0xf07a9a][i%3],x,y,v*1.15); ball(wg,.07,BH.LAUB2,x+.12,y-.03,v*1.13); }); }
  verschmelze(wg);
  const wraeder=[-1,1].reduce((l,x)=>l.concat([-1,1].map(v=>{ const w=gruppe(zug,wm+x,.56,v*1.24), s=gruppe(w,0,0,0);
    walze(s,.56,.28,BH.GUMMI,0,0,0).rotation.x=Math.PI/2; walze(s,.34,.31,BH.ROT,0,0,0).rotation.x=Math.PI/2; walze(s,.1,.36,BH.GELB,0,0,0).rotation.x=Math.PI/2;
    [0,1,2].forEach(i=>{ box(s,.6,.08,.33,BH.GELB,0,0,0).rotation.z=i*Math.PI/3; }); verschmelze(s); return w; })),[]);
  const schattenZug=[fleck(zug,1.5,.1,0,1.75,.03),fleck(zug,1.35,wm,0,1.6,.031)];
  const puffM=basis(0xd8ccc8,{transparent:true,opacity:.55,depthWrite:false});
  const puffs=[0,1,2,3,4].map(()=>ball(zug,1,puffM,1.5,3.1,.35));

  /* ---------- Spielfigur sitzt auf dem Traktor ---------- */
  const u=figur.userData, FS=1.38, SITZX=tr.sitz.x-.04;
  figur.children.forEach(m=>{ if(m!==u.koerper) m.visible=false; }); /* runder Bodenschatten passt nicht auf den Sitz */
  figur.scale.set(FS,FS,FS); figur.position.set(SITZX,1.69-.17*FS,0); figur.rotation.set(0,Math.PI/2,0); tr.g.add(figur);
  u.koerper.position.y=-.45; u.beinL.rotation.x=u.beinR.rotation.x=-1.42;

  /* ---------- Bäuerin, Bauer und Kinder winken ---------- */
  /* [x, z, Drehung, Haut, Hemd, Hose, Hut, Haar, Größe, Takt] */
  const leute=[[6.0,.9,-.4,0,0x3a74c0,0x7a3a6a,true,0x7a4a1e,1.2,0],[-6.15,2.0,.42,1,0x3a9448,0x6a4a2a,true,0x1c120c,1.24,2.1],
    [-4.35,3.9,.3,2,0xffc21a,0x3a74c0,false,0xa8401a,.86,4],[5.4,3.1,-.38,3,0xe0568a,0x2f8a8a,false,0x1c120c,.84,1.1]]
    .map(p=>{ const m=BH.mensch(k,sc,p[0],p[1],p[2],{ haut:p[3], hemd:p[4], hose:p[5], hut:p[6], haar:p[7], gr:p[8], phase:p[9] }); fleck(sc,.46,p[0],p[1]); return { m, p }; });
  /* Zöpfe für die Bäuerin und das Kind rechts */
  [0,3].forEach(i=>{ const kopf=leute[i].m.kopf; [-1,1].forEach(v=>{ [0,1,2].forEach(j=>ball(kopf,.1-j*.015,leute[i].p[7],v*(.27+j*.025),-.1-j*.14,-.02)); ball(kopf,.055,BH.ROT,v*.34,-.5,-.02); }); });

  /* ---------- Huhn und Küken ---------- */
  const huhn=BH.huhn(k,sc,-1.15,0,4.75,.1,{ gr:1.15, phase:1 }); fleck(sc,.42,-1.15,4.75,1.2);
  /* [x, z, Drehung] */
  const kuek=[[-.2,5.0,-.5],[.45,4.45,-1.2],[1.15,5.15,-1.9],[-.35,4.05,-.2]].map((p,i)=>{ const g=BH.kueken(sc,p[0],0,p[1],p[2],1.25); verschmelze(g); fleck(sc,.17,p[0],p[1]); return { g, i }; });

  /* ---------- Katze auf einem Strohballen ---------- */
  const KX=-2.9, KZ=4.5;
  const ballenG=BH.ballen(sc,KX,0,KZ,.2,1.35); ballenG.scale.set(1,.8,.9); verschmelze(ballenG); werfer.push(ballenG);
  const mieze=gruppe(sc,KX,.65,KZ); mieze.rotation.y=.25;
  const mr=gruppe(mieze,0,0,0), FELL=0xe08a30, DUNKEL=0xa85a18, HELL=0xf8ecd8;
  ball(mr,.3,FELL,0,.3,-.04,1,1.15,.95); ball(mr,.2,HELL,0,.3,.17,.85,1.15,.7); [-1,1].forEach(v=>{ ball(mr,.17,FELL,v*.22,.16,-.06,.9,1,1.2); walze(mr,.07,.36,FELL,v*.11,.2,.24); ball(mr,.085,HELL,v*.11,.05,.29,1,.65,1.2); });
  [.34,.46].forEach(y=>ball(mr,.2,DUNKEL,0,y,-.2,1.3,.18,.9)); verschmelze(mr);
  const mkopf=gruppe(mieze,0,.76,.08), mk=gruppe(mkopf,0,0,0);
  ball(mk,.27,FELL,0,0,0,1.08,.95,.95); ball(mk,.12,HELL,0,-.08,.2,1.3,.8,.8); ball(mk,.035,0xe0707a,0,-.04,.31);
  [-1,1].forEach(v=>{ kegel(mk,.11,.23,FELL,v*.17,.27,0).rotation.z=-v*.3; kegel(mk,.06,.14,0xf0a0a8,v*.165,.25,.06).rotation.z=-v*.3; ball(mk,.055,0x7ad85a,v*.1,.05,.23,1,1.15,.6); ball(mk,.028,0x101008,v*.1,.05,.265,.7,1.3,.6); [-.03,.03].forEach(h=>strich(mk,[v*.08,-.09,.29],[v*.4,-.09+h*2,.24],.006,0xffffff)); });
  box(mk,.05,.14,.04,DUNKEL,0,.2,.22); verschmelze(mk);
  const mschwanz=gruppe(mieze,.18,.12,-.22); strich(mschwanz,[0,0,0],[.36,.06,0],.07,FELL); strich(mschwanz,[.36,.06,0],[.52,.4,0],.065,FELL); strich(mschwanz,[.52,.4,0],[.42,.66,0],.06,FELL); ball(mschwanz,.075,HELL,.42,.66,0); verschmelze(mschwanz);
  fleck(sc,.75,KX,KZ,1.25);

  /* ---------- Hund ---------- */
  const WX=3.75, WZ=5.0;
  const hund=gruppe(sc,WX,0,WZ); hund.rotation.y=-2.15; /* Blick (+x) schräg zur Kamera und zum Traktor */
  const hr=gruppe(hund,0,0,0), HF=0xb87438, HD=0x6e3e1c;
  ball(hr,.34,HF,0,.55,0,1.5,.92,.9); ball(hr,.23,HELL,.34,.5,0,1,1.1,1); ball(hr,.25,HD,-.12,.72,0,1.25,.55,.92);
  [[.34,.19],[.34,-.19],[-.34,.19],[-.34,-.19]].forEach(p=>{ walze(hr,.08,.45,HF,p[0],.28,p[1]); ball(hr,.1,HELL,p[0]+.04,.07,p[1],1.25,.7,1); });
  walze(hr,.2,.09,BH.ROT,.47,.78,0).rotation.z=-.6; ball(hr,.06,BH.GOLD,.66,.7,0); verschmelze(hr);
  const hkopf=gruppe(hund,.55,.98,0), hk=gruppe(hkopf,0,0,0);
  ball(hk,.29,HF,0,0,0); ball(hk,.16,HELL,.25,-.07,0,1.35,.85,1); ball(hk,.065,BH.SCHWARZ,.47,-.03,0);
  box(hk,.16,.03,.12,0xf06a80,.34,-.22,0).rotation.z=-.5;
  [-1,1].forEach(v=>{ ball(hk,.045,BH.SCHWARZ,.25,.08,v*.12); ball(hk,.014,BH.WEISS,.29,.1,v*.125); const ohr=ball(hk,.15,HD,-.06,.02,v*.29,.75,1.55,.38); ohr.rotation.x=-v*.3; });
  verschmelze(hk);
  const hschwanz=gruppe(hund,-.46,.66,0); strich(hschwanz,[0,0,0],[-.22,.34,0],.07,HF); ball(hschwanz,.085,HELL,-.23,.37,0);
  const hFleck=fleck(sc,.55,WX,WZ,1.1);
  hkopf.rotation.y=-.35;

  /* Schatten werfen nur die großen Dinge (weniger Zeichenaufrufe); Leute und Tiere haben runde Bodenschatten */
  const mitSchatten=new Set();
  werfer.forEach(g=>g.traverse(m=>mitSchatten.add(m)));
  sc.traverse(m=>{ if(m.isMesh && !mitSchatten.has(m)) m.castShadow=false; });
  puffs.concat(schattenZug).forEach(m=>{ m.castShadow=false; m.receiveShadow=false; });

  /* ---------- Glühwürmchen ---------- */
  const NG=44, gluehen=menge(new THREE.SphereGeometry(1,6,4),basis(0xf4ff7a),NG), gd=[];
  for(let i=0;i<NG;i++){ const v=i%2?1:-1; gd.push({ x:i%3===0?(zufall()*2-1)*9:v*(3.6+zufall()*6), y:i%3===0?.4+zufall()*.8:.6+zufall()*3.4, z:i%3===0?-4+zufall()*3:-2+zufall()*7, p:zufall()*6.28, v:.4+zufall()*.5, ab:4.5+zufall()*5 }); }
  const gluehSchein=[0,1,3,4,7,9,12,15].map(i=>({ i, s:schein(sc,'rgba(225,255,110,.7)',0,0,0,.6) }));

  /* ---------- Konfetti: seitlich und hinten, damit die Figur frei bleibt ---------- */
  const NK=130, konfetti=menge(GEO.box,basis(0xffffff),NK), kd=[];
  for(let i=0;i<NK;i++){ const v=i%2?1:-1, hinten=i%4===0;
    kd.push({ x:hinten?(zufall()*2-1)*9:v*(3.4+zufall()*6), z:hinten?-4+zufall()*2.5:-1+zufall()*4.5, y:zufall()*9, v:.55+zufall()*.55, p:zufall()*6.28, g:.8+zufall()*.5 });
    konfetti.setColorAt(i,FARBE.set(BUNT[i%6])); }
  konfetti.visible=false;

  /* ---------- Kamera: weit genug für Gespann, Leute, Tiere und die Gebäude ---------- */
  const NEIG=.25, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=2.35;
  /* Punkte, die immer im Bild sein müssen */
  const WICHTIG=[[-6.75,.0,2.2],[-6.75,2.9,2.0],[6.65,2.8,.9],[6.0,0,3.6],[-4.8,0,4.0],[4.6,0,5.4],[-3.5,0,5.1],[1.2,0,5.5],[1.0,3.9,1.7],[-4.8,3.0,-1],[-7.4,5.9,-8],[7.3,5.7,-9]];
  const abstand=(a,tn)=>WICHTIG.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
    return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },10);

  /* Zeitplan in Sekunden: nach etwa 8 s hält der Traktor, nach etwa 11 s ist alles ruhig */
  const LOS=.3, HALT=8.2, FEST=7.8;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));

    /* Gespann fährt heran und bremst sanft, die Räder drehen sich passend zum Weg */
    const f=Math.min(1,Math.max(0,(t-LOS)/(HALT-LOS))), rest=Math.pow(1-f,2.1), weg_=WEIT*(1-rest), fahrt=Math.min(1,rest*3);
    zug.position.x=-WEIT*rest;
    tr.raeder.forEach((r,i)=>r.rotation.z=-weg_/(i<2?.98:.58));
    wraeder.forEach(r=>r.rotation.z=-weg_/.56);
    const ruck=Math.abs(Math.sin(t*11))*.035*fahrt;
    tr.g.position.y=ruck+Math.sin(t*14)*.004*(1-.7*weich((t-HALT-1)/2)); wg.position.y=Math.abs(Math.sin(t*11+1.4))*.03*fahrt;
    puffs.forEach((m,i)=>{ const q=(t*(.55+.5*fahrt)+i/5)%1, g=(.07+q*.3)*Math.min(1,(1-q)*2.5)*(.55+.45*fahrt); m.position.set(1.5-q*(.3+1.4*fahrt),3.15+q*1.1,.35+Math.sin(i*2+t)*.08); m.scale.set(g,g,g); });

    /* Spielfigur lenkt, dreht sich beim Halten zur Kamera, winkt und jubelt */
    const da=weich((t-HALT+1.2)/1.4), jubel=weich((t-HALT)/.7), ruhe=1-.65*weich((t-11)/1.8);
    figur.rotation.y=Math.PI/2-.82*da+Math.sin(t*.9)*.08*da;
    u.koerper.position.y=-.45+Math.abs(Math.sin(t*4.2))*.05*jubel*ruhe;
    u.beinL.rotation.x=u.beinR.rotation.x=-1.42;
    u.armR.rotation.x=misch(-1.25,0,da); u.armR.rotation.z=misch(.1,2.5+Math.sin(t*7)*.28*ruhe,da);
    u.armL.rotation.x=misch(-1.25,0,jubel); u.armL.rotation.z=misch(-.1,-2.5+Math.sin(t*7+1.5)*.28*ruhe,jubel);

    /* Leute winken; die Kinder hüpfen, wenn der Traktor da ist */
    leute.forEach((l,i)=>{ const kind=l.p[8]<1, h=kind?Math.abs(Math.sin(t*4.6+i))*.28*jubel*ruhe:0;
      l.m.g.position.y=h; l.m.armL.rotation.z=kind?misch(-.18,-2.4-Math.sin(t*5+i)*.3,jubel):-.18; });

    /* Huhn flattert hoch, Küken hüpfen */
    huhn.g.position.y=Math.pow(Math.max(0,Math.sin(t*2.3)),4)*.22*jubel;
    kuek.forEach(q=>{ q.g.position.y=Math.pow(Math.abs(Math.sin(t*(3.4+q.i*.4)+q.i*1.7)),2)*(.07+.14*jubel); });
    /* Katze schaut, Schwanz schwingt */
    mkopf.rotation.y=Math.sin(t*.8)*.25-.2*(1-jubel); mkopf.rotation.z=Math.sin(t*1.7)*.12*jubel;
    mschwanz.rotation.z=Math.sin(t*2.2)*.22; mschwanz.rotation.y=Math.sin(t*1.4)*.2;
    /* Hund hüpft und wedelt */
    const hh=Math.pow(Math.abs(Math.sin(t*3.6)),1.5)*(.08+.28*jubel*ruhe);
    hund.position.y=hh; hschwanz.rotation.x=Math.sin(t*11)*.7; hkopf.rotation.z=Math.sin(t*3.6)*.1; const hs=1-hh*.6; hFleck.scale.set(1.1*hs,hs,1);

    /* Kamera fährt sanft von links nach vorn */
    const asp=kamera.aspect||1.5, tn=Math.tan((asp<1.1?30:25)*Math.PI/180), d=abstand(asp,tn), z=weich(t/(HALT+.8));
    const zx=misch(-3.2,0,z), weit=d*misch(1.14,1,z), wippen=Math.sin(t*.2)*.25*weich((t-9.5)/3);
    kamera.position.set(zx+wippen,ZIELY+weit*SN,weit*CN); kamera.lookAt(zx,ZIELY,0);
    const c=kamera.position;
    kuppel.position.copy(c);
    /* Weltpunkt zu einem Bildplatz (x,y von -1 bis 1) in der Entfernung fern */
    const ort=(x,y,fern)=>{ const h=y*fern*tn; return [c.x+x*fern*tn*asp, c.y-SN*fern+CN*h, c.z-CN*fern-SN*h]; };

    /* Sonne sinkt langsam, Wolken ziehen, Sterne kommen */
    const sp=ort(-.24,misch(.72,.64,weich(t/14)),80), sr=.08*80*tn;
    sonne.position.set(sp[0],sp[1],sp[2]); sonne.scale.setScalar(sr); sonne.lookAt(c.x,c.y,c.z);
    sonnenSchein.position.set(sp[0],sp[1],sp[2]+.5); const sw=sr*(5.5+Math.sin(t*1.2)*.2); sonnenSchein.scale.set(sw,sw,1);
    wolken.forEach((w,i)=>{ const q=ort(w.p[0]+Math.sin(t*.07+i*2)*.05,w.p[1],70); w.g.position.set(q[0],q[1],q[2]); w.g.scale.setScalar(w.p[2]*70*tn/22); });
    sterne.visible=t>3;
    if(sterne.visible){ sd.forEach((s,i)=>{ const q=ort(s.x,s.y,65), g=s.g*65*tn*weich((t-s.ab)/1.5)*(.82+.18*Math.sin(t*1.7+s.p)); setze(sterne,i,q[0],q[1],q[2],g,g*1.4,g,0,0,0); }); sterne.instanceMatrix.needsUpdate=true; }

    /* Lichterketten gehen nacheinander an */
    birnen.forEach((b,i)=>{ const an=weich((t-b.ab)/.4), g=.07+.055*an+.006*Math.sin(t*3+i)*an; setze(lampen,i,b.p[0],b.p[1]-.14,b.p[2],g,g*1.25,g,0,0,0); });
    lampen.instanceMatrix.needsUpdate=true;
    scheine.forEach((s,i)=>{ const g=1.3*weich((t-glanz[i].ab)/.8)*(1+.06*Math.sin(t*2.4+i))+.001; s.scale.set(g,g,1); });
    warm.forEach((w,i)=>{ const g=w.g*(1+.03*Math.sin(t*1.3+i*2)); w.s.scale.set(g,g*.85,1); });

    fahne.rotation.y=.2+Math.sin(t*.6)*.35;
    rauch.forEach((m,i)=>{ const q=(t*.16+i/5)%1, g=(.16+q*.45)*Math.min(1,(1-q)*3)*Math.min(1,q*8); m.position.set(9+q*1.5+Math.sin(t+i)*.1,5.75+q*2.2,-9.4); m.scale.set(g,g*.85,g); });

    /* Glühwürmchen schweben */
    gd.forEach((q,i)=>{ const g=.045*weich((t-q.ab)/1.2)*(.65+.35*Math.sin(t*2.5*q.v+q.p*3));
      setze(gluehen,i,q.x+Math.sin(t*q.v+q.p)*.6,q.y+Math.sin(t*q.v*1.4+q.p*2)*.35,q.z+Math.cos(t*q.v*.8+q.p)*.4,g,g,g,0,0,0); });
    gluehen.instanceMatrix.needsUpdate=true;
    gluehSchein.forEach(e=>{ const q=gd[e.i], g=.6*weich((t-q.ab)/1.2)*(.7+.3*Math.sin(t*2.5*q.v+q.p*3))+.001;
      e.s.position.set(q.x+Math.sin(t*q.v+q.p)*.6,q.y+Math.sin(t*q.v*1.4+q.p*2)*.35,q.z+Math.cos(t*q.v*.8+q.p)*.4); e.s.scale.set(g,g,1); });

    /* Konfetti, sobald der Traktor fast steht */
    konfetti.visible=t>FEST;
    if(konfetti.visible){
      const tempo=t-FEST;
      kd.forEach((q,i)=>{ const w=8+q.y*.3-tempo*q.v*1.7;
        /* erst von oben herein, danach gleichmäßig verteilt weiterfallen */
        const hy=w>.2?w:.2+((((w-.2)%8)+8)%8);
        const g=q.g*weich((t-FEST)/.6)*weich(hy/.5)*(w>.2?1:weich((8.2-hy)/.8));
        setze(konfetti,i,q.x+Math.sin(t*1.2+q.p)*.3,hy+.3,q.z,.09*g,.13*g,.012*g,t*1.7+q.p,t*1.2+q.p*2,Math.sin(t*1.6+q.p)); });
      konfetti.instanceMatrix.needsUpdate=true; }
  };
};

