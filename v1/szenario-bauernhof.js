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