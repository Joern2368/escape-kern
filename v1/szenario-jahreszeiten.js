document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-jzblume\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"0\" cy=\"-12\" r=\"5\"/><circle cx=\"11\" cy=\"-4\" r=\"5\"/><circle cx=\"7\" cy=\"8\" r=\"5\"/><circle cx=\"-7\" cy=\"8\" r=\"5\"/><circle cx=\"-11\" cy=\"-4\" r=\"5\"/><circle cx=\"0\" cy=\"0\" r=\"3\"/><path d=\"M0 14V19\"/></g></symbol>\n<symbol id=\"sym-jzsonne\" viewBox=\"-20 -20 40 40\"><circle r=\"8\" fill=\"currentColor\"/><path d=\"M0 -18V-13M0 13V18M-18 0H-13M13 0H18M-13 -13L-10 -10M13 -13L10 -10M-13 13L-10 10M13 13L10 10\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-jzblatt\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-14 13Q-17 -9 4 -15Q15 -17 17 -15Q15 7 -7 14Q-12 15 -14 13Z\"/><path d=\"M-14 14L6 -6M-4 4L-4 -4M4 -3L-3 -3\"/></g></symbol>\n<symbol id=\"sym-jzflocke\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M0 -17V17M-15 -8.5L15 8.5M-15 8.5L15 -8.5\"/><path d=\"M-4 -13L0 -9L4 -13M-4 13L0 9L4 13\"/></g></symbol>\n<symbol id=\"sym-jzuhr\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"0\" cy=\"2\" r=\"14\"/><path d=\"M0 -6V2L6 6M-8 -14L-12 -17M8 -14L12 -17\"/></g></symbol>\n</defs>\n</svg>");
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
const pf=(a,b)=>R(-6,a,12,b-a,'#8a6238','#4a2a10',2);
const stern=(x,y,r,f)=>P(`M${x} ${y-r}L${x+r*.28} ${y-r*.3}L${x+r} ${y-r*.3}L${x+r*.45} ${y+r*.15}L${x+r*.62} ${y+r}L${x} ${y+r*.5}L${x-r*.62} ${y+r}L${x-r*.45} ${y+r*.15}L${x-r} ${y-r*.3}L${x-r*.28} ${y-r*.3}Z`,f);
const krone=(x,y,r,f)=>C(x,y,r,f)+C(x-r*.7,y+r*.4,r*.7,f)+C(x+r*.7,y+r*.3,r*.75,f);
const defs=(b1,b2,l,h1,h2)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${h1}"/><stop offset="1" stop-color="${h2}"/></linearGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==1){for(let x=20;x<1600;x+=90)for(const y of[510,580,660,740])d+=`M${x+(y%7)*9} ${y}l6 -16l4 14l6 -12l2 14`;return g+L(d,'rgba(40,100,40,.5)',3)+[...Array(36)].map((_,k)=>C((k*131+40)%1600,500+(k*53)%270,4+k%3,['#f8a8c8','#fff','#f6d84a','#b8a0f0'][k%4])).join('');}
if(m==2){for(let x=30;x<1600;x+=110)for(const y of[500,560,630,700,760])d+=`M${x+(y%5)*13} ${y}h8`;return g+L(d,'rgba(150,110,40,.35)',5);}
if(m==3){for(const y of[500,540,590,650,720])d+=`M0 ${y}Q400 ${y-14} 800 ${y}T1600 ${y}`;return g+L(d,'rgba(60,30,10,.3)',6)+[...Array(30)].map((_,k)=>E((k*173+50)%1600,490+(k*67)%280,12,6,['#d8602a','#e8a020','#b8402a'][k%3])).join('');}
if(m==4){for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return g+L(d,'rgba(0,0,0,.2)',2);}
for(const r of[90,170,260,360])d+=E(800,640,r*2.2,r*.42,'none','rgba(184,160,255,.35)',3);return g+d+[...Array(28)].map((_,k)=>C((k*227)%1600,490+(k*59)%270,3,'rgba(255,246,200,.6)')).join('');}
const wetterfrosch=()=>`${pf(40,240)}${R(-62,-46,124,90,'#fff6e8','#8a6238',4)}${E(-22,10,22,14,'#5cc04a','#2a7a2a',2)}${C(-32,-6,8,'#5cc04a','#2a7a2a',2)}${C(-12,-6,8,'#5cc04a','#2a7a2a',2)}${C(-32,-6,3,'#222')}${C(-12,-6,3,'#222')}${L('M-34 8Q-22 18 -10 8','#2a7a2a',2)}${C(30,-20,12,'#f6d84a','#c89a20',2)}${L('M30 -38V-34M46 -20H50M14 -20H10','#f6d84a',3)}${E(36,16,18,8,'#c8d8e8')}${L('M26 28v8M36 28v8M46 28v8','#4a90c8',3)}`;
const krokus=()=>`${sch(70)}${E(0,-2,70,8,'#7a5a3a')}${[[-46,'#9a6ae0'],[-16,'#f6d84a'],[14,'#fff'],[44,'#b890f0']].map(([x,c])=>L(`M${x} 0L${x-16} -34M${x} 0L${x+16} -30`,'#4f9a4a',3)+P(`M${x-10} -14Q${x-13} -44 ${x} -54Q${x+13} -44 ${x+10} -14Z`,c,'#5a3a7a',1.5)+L(`M${x} -14V-40`,'rgba(90,50,120,.35)',2)).join('')}`;
const bienenkorb=()=>`${sch(52)}${R(-34,-14,68,14,'#c8a060','#6a4a20',3)}${P('M-44 -14Q-48 -84 0 -98Q48 -84 44 -14Z','#f2c14e','#a07a20',3)}${L('M-46 -34Q0 -24 46 -34M-42 -58Q0 -48 42 -58M-30 -80Q0 -72 30 -80','#a07a20',3)}${E(0,-26,11,9,'#3a2410')}${[[38,-92],[58,-70],[-50,-84]].map(([x,y])=>E(x-6,y-7,7,4,'rgba(200,232,248,.9)')+E(x+2,y-7,7,4,'rgba(200,232,248,.9)')+E(x,y,9,6,'#f6d84a','#3a2410',1.5)+L(`M${x-2} ${y-5}v10M${x+3} ${y-5}v10`,'#3a2410',2)).join('')}`;
const schirmst=()=>`${sch(40)}${P('M-24 -38H24L20 0H-20Z','#4a90c8','#1a4a8a',3)}${L('M0 -38V-130','#5a3a1c',5)}${P('M-62 -128Q-40 -176 0 -178Q40 -176 62 -128Q41 -138 20 -128Q0 -138 -20 -128Q-41 -138 -62 -128Z','#e8507a','#a02a50',3)}${C(-40,-110,3,'#7ab8f0')}${C(44,-100,3,'#7ab8f0')}${C(-6,-96,3,'#7ab8f0')}`;
const nestbusch=()=>`${sch(76)}${E(0,-40,74,42,'#3f8a44','#1f5a24',3)}${E(-36,-62,30,22,'#4f9a4a')}${E(38,-58,30,22,'#4f9a4a')}${E(0,-70,30,12,'#a07a40','#5a3a1c',2)}${C(-9,-76,6,'#a8d8f0','#4a7a9a',1)}${C(8,-77,6,'#a8d8f0','#4a7a9a',1)}${C(0,-82,6,'#a8d8f0','#4a7a9a',1)}${[[-44,-48],[40,-44],[-14,-30]].map(([x,y])=>C(x,y,6,'#f8c0d8')).join('')}${E(58,-98,12,9,'#e8a030','#7a4a10',1.5)}${C(66,-104,5,'#e8a030')}${P('M71 -105l8 2l-8 3Z','#e84a2a')}`;
const aprilkal=()=>`${pf(50,240)}${R(-50,-60,100,110,'#fff','#c0303a',4)}${R(-50,-60,100,26,'#7ac060')}${[0,1,2].map(i=>C(-30+i*30,-47,6,'#fff6c8')).join('')}${[...Array(15)].map((_,k)=>C(-34+k%5*17,-18+Math.floor(k/5)*20,k==8?7:4,k==8?'#e8507a':'#9ab0c0')).join('')}`;
const kanne=()=>`${sch(50)}${P('M-34 -56H22L28 0H-38Z','#4a90c8','#1a4a8a',3)}${L('M22 -44L54 -78','#4a90c8',8)}${P('M46 -88L66 -72L58 -66L44 -80Z','#1a4a8a')}${L('M-34 -50Q-62 -62 -34 -86H4','#1a4a8a',6)}${E(-6,-58,28,6,'#2a6aa8')}${[[58,-52],[66,-40],[54,-32]].map(([x,y])=>P(`M${x} ${y}q4 8 0 12q-4 -4 0 -12Z`,'#7ab8f0')).join('')}`;
const saat=()=>`${sch(50)}${R(-4,-136,8,136,'#8a6238')}${R(-56,-140,112,8,'#8a6238','#4a2a10',2)}${[[-50,'#e8507a'],[-14,'#f6d84a'],[22,'#7ab8f0']].map(([x,c])=>R(x,-128,34,50,'#fff6e8','#8a6238',2)+R(x,-128,34,14,c)+C(x+17,-92,8,c,'#fff',1.5)+L(`M${x+17} -84V-74`,'#4f9a4a',3)).join('')}${[[-38,'#e8507a'],[0,'#f6d84a'],[30,'#9a6ae0']].map(([x,c])=>C(x,-10,6,c)).join('')}`;
const schirmS=()=>`${sch(60)}${L('M0 0V-160','#7a5230',7)}${P('M-80 -150Q-60 -214 0 -218Q60 -214 80 -150Q54 -164 27 -150Q0 -164 -27 -150Q-54 -164 -80 -150Z','#e8507a','#a02a50',3)}${L('M0 -216L-27 -154M0 -216L27 -154M-48 -188L-58 -156M48 -188L58 -156','#fff',8)}${R(-56,-6,112,10,'#4ab0f0','#1a6aa8',2)}${L('M-56 -1H56','#fff',2)}`;
const eimer=()=>`${sch(50)}${L('M-26 -50Q0 -96 26 -50','#a02a50',3)}${P('M-30 -50H30L24 0H-24Z','#e8507a','#a02a50',3)}${R(-32,-54,64,8,'#f08aa8','#a02a50',2)}${[[-16,'#fff0e0'],[2,'#f8c8b8'],[18,'#f6e0a0']].map(([x,c],k)=>P(`M${x} -52L${x-13} ${-74-k*4}Q${x} -88 ${x+13} ${-74-k*4}Z`,c,'#c89a60',1.5)+L(`M${x} -54V-80`,'#c89a60',1)).join('')}${L('M44 0L68 -52','#a0703e',5)}${P('M58 -52L80 -52L76 -78L62 -78Z','#f6d84a','#a08020',2)}`;
const ring=()=>`${pf(50,240)}<circle r="40" fill="none" stroke="#fff" stroke-width="22"/><circle r="40" fill="none" stroke="#e74c3c" stroke-width="22" stroke-dasharray="31.4 31.4"/><circle r="51" fill="none" stroke="#9a2a2a" stroke-width="2"/><circle r="29" fill="none" stroke="#9a2a2a" stroke-width="2"/>${L('M0 -40V-52','#a08040',4)}`;
const eisstand=()=>`${sch(70)}${R(-60,-58,120,58,'#fff6e0','#5a3a1c',3)}${R(-60,-58,120,12,'#4ab0f0')}${P('M-70 -112H70L60 -126H-60Z','#fff','#e8507a',3)}${[-60,-36,-12,12,36].map(x=>P(`M${x} -112h24l-4 -14h-16Z`,'#e8507a')).join('')}${L('M-56 -112V-58M56 -112V-58','#5a3a1c',4)}${C(-30,-30,12,'#f8a8c8','#c86a8a',2)}${C(0,-30,12,'#f6e0a0','#c8a050',2)}${C(30,-30,12,'#8a5a3a','#4a2a14',2)}${P('M-10 -140L0 -126L10 -140Z','#e8c070')}${C(0,-146,9,'#f8a8c8')}${C(-44,2,10,'#3a3a44','#16161c',3)}${C(44,2,10,'#3a3a44','#16161c',3)}`;
const korb=()=>`${sch(70)}${P('M-62 -16V-96Q-62 -150 0 -154Q62 -150 62 -96V-16Z','#e8c070','#a08040',3)}${L('M-40 -20V-130M-20 -20V-146M0 -20V-152M20 -20V-146M40 -20V-130','#fff6d8',4)}${R(-62,-34,124,28,'#4a90c8','#1a4a8a',3)}${L('M-62 -20H62','#fff',3)}${R(-70,-60,12,50,'#c89a40','#a08040',2)}${R(58,-60,12,50,'#c89a40','#a08040',2)}${R(-56,-6,14,10,'#7a5230')}${R(42,-6,14,10,'#7a5230')}`;
const thermo=()=>`${pf(80,240)}${R(-26,-84,52,160,'#fff6e8','#8a6238',4)}${R(-6,-68,12,106,'#e8f0f4','#9ab0c0',2)}${R(-3,-20,6,60,'#e74c3c')}${C(0,48,13,'#e74c3c','#a02a20',2)}${[...Array(6)].map((_,k)=>L(`M12 ${-60+k*17}h10`,'#6a7a8a',2)).join('')}${[...Array(3)].map((_,k)=>L(`M-12 ${-52+k*34}h-10`,'#6a7a8a',2)).join('')}`;
const fernrohr=()=>`${sch(50)}${L('M0 -80L-34 0M0 -80L34 0M0 -80V0','#5a3a1c',5)}<g transform="translate(0 -84) rotate(-28)">${R(-54,-9,108,18,'#d8a830','#7a5a10',3)}${R(-62,-12,14,24,'#a07a20','#7a5a10',2)}${R(38,-13,20,26,'#7a5a10')}${R(-20,-9,6,18,'#7a5a10')}</g>${C(0,-84,8,'#5a3a1c')}`;
const sonnenschutz=()=>`${sch(50)}${L('M-26 -50V0M26 -50V0','#8a6238',5)}${R(-52,-124,104,76,'#fff6e8','#8a6238',4)}${C(-22,-92,15,'#f6d84a','#c89a20',2)}${L('M-22 -114V-118M-44 -92H-48M-22 -70V-66M0 -92H4M-38 -108L-42 -112M-6 -108L-2 -112','#f6d84a',3)}${R(10,-112,22,40,'#4ab0f0','#1a6aa8',2)}${R(15,-120,12,8,'#e8507a')}`;
const kb=(x,y,r,c)=>E(x,y,r*1.25,r,c,'#8a3a10',3)+L(`M${x-r*.5} ${y-r*.9}Q${x-r*.7} ${y} ${x-r*.5} ${y+r*.9}M${x+r*.5} ${y-r*.9}Q${x+r*.7} ${y} ${x+r*.5} ${y+r*.9}`,'rgba(110,40,10,.45)',2)+R(x-3,y-r-9,6,11,'#5a7a20')+P(`M${x+3} ${y-r-6}q14 -4 16 6q-10 0 -16 -2Z`,'#5aa040');
const kuerbisse=()=>`${sch(90)}${kb(-50,-30,30,'#f08a2a')}${kb(34,-26,26,'#e87a1a')}${kb(-4,-70,24,'#f6a030')}${kb(70,-14,14,'#8ab050')}`;
const scheuche=()=>`${sch(50)}${R(-5,-160,10,160,'#8a6238','#4a2a10',2)}${L('M-70 -112H70','#8a6238',9)}${P('M-26 -124H26L34 -50H-34Z','#4a6aa8','#2a3a6a',3)}${P('M-34 -112L-72 -100L-66 -92L-30 -100Z','#4a6aa8','#2a3a6a',2)}${P('M34 -112L72 -100L66 -92L30 -100Z','#4a6aa8','#2a3a6a',2)}${L('M-70 -104l-8 8M-70 -104l-8 -6M70 -104l8 8M70 -104l8 -6M-20 -50l-8 10M20 -50l8 10M0 -50v12','#e8c050',3)}${C(0,-146,17,'#f6d8a0','#8a6a40',2)}${R(-30,-154,60,7,'#c89a40','#7a5a20',2)}${P('M-16 -154Q0 -186 16 -154Z','#c89a40','#7a5a20',2)}${C(-6,-144,2,'#222')}${C(6,-144,2,'#222')}${L('M-8 -136Q0 -128 8 -136','#7a3a20',2)}${R(-8,-98,16,16,'#e8507a','#a02a50',1.5)}`;
const drache=()=>`${R(-90,100,180,10,'#a0703e','#4a2a10',2)}${R(-90,150,180,10,'#a0703e','#4a2a10',2)}${R(-80,90,12,150,'#8a6238','#4a2a10',2)}${R(68,90,12,150,'#8a6238','#4a2a10',2)}${P('M0 -90L44 -26L0 56L-44 -26Z','#e8507a','#a02a50',3)}${P('M0 -90L44 -26H0Z','#f6d84a')}${P('M0 56L-44 -26H0Z','#4ab0f0')}${L('M0 -90V56M-44 -26H44','#a02a50',2)}${L('M0 56Q-30 76 0 92T12 126','#8a6238',3)}${[[-14,78,'#f6d84a'],[10,108,'#4ab0f0']].map(([x,y,c])=>P(`M${x} ${y}l-9 -7v14ZM${x} ${y}l9 -7v14Z`,c)).join('')}`;
const laubh=()=>`${sch(90)}${P('M-92 0Q-84 -62 -10 -76Q70 -80 94 0Z','#d8702a','#7a3a14',3)}${[...Array(14)].map((_,k)=>E(-70+k*11,-14-(k*23)%46,10,5,['#e8a020','#c0402a','#d8702a','#b8802a'][k%4],'#7a3a14',1)).join('')}${L('M70 0L96 -112','#8a6238',5)}${L('M84 -86H108M84 -92H108M84 -98H108','#8a6238',3)}`;
const apfelkorb=()=>`${sch(60)}${P('M-46 -44H46L38 0H-38Z','#c89a60','#6a4a20',3)}${L('M-42 -30H42M-40 -16H40M-20 -44V0M0 -44V0M20 -44V0','#8a6a30',2)}${[[-26,-52,'#e8402a'],[0,-58,'#8ac040'],[26,-52,'#e8402a'],[-12,-70,'#e8402a'],[14,-72,'#f6c030']].map(([x,y,c])=>C(x,y,14,c,'rgba(0,0,0,.3)',1.5)+L(`M${x} ${y-14}v-5`,'#5a3a1c',2)).join('')}${L('M-44 -44Q0 -128 44 -44','#8a6a30',5)}`;
const zugv=()=>`${pf(40,240)}${R(-58,-50,116,90,'#f6e8c8','#8a6238',4)}${R(-58,-50,116,14,'#d8a030')}${L('M-44 24Q-4 -26 40 -30','#7ab8f0',3)}${[[-34,12],[-12,-6],[10,-18],[32,-28]].map(([x,y])=>L(`M${x-10} ${y-6}Q${x-5} ${y-12} ${x} ${y}Q${x+5} ${y-12} ${x+10} ${y-6}`,'#3a3a5a',3)).join('')}`;
const pilze=()=>`${sch(70)}${[[-34,-28,30,'#c85a3a'],[8,-44,38,'#f0e0b0'],[40,-24,24,'#a8784a']].map(([x,h,w,c])=>R(x-w/5,h,w*.4,-h,'#f4ecd8','#a89878',2)+P(`M${x-w} ${h+6}Q${x-w} ${h-w*.8} ${x} ${h-w*.8}Q${x+w} ${h-w*.8} ${x+w} ${h+6}Z`,c,'#5a2a1a',2)+C(x-w*.35,h-w*.35,w*.12,'#fff')).join('')}${L('M-50 0l-4 -12M60 0l4 -10M10 0l0 -8','#6aa04a',3)}`;
const kranz=()=>`${sch(40)}${R(-4,-160,8,160,'#8a6238')}${L('M-30 0H30','#5a3a1c',6)}<circle cx="0" cy="-114" r="44" fill="none" stroke="#c89a30" stroke-width="16"/>${[...Array(10)].map((_,k)=>C(44*Math.cos(k*.628),-114+44*Math.sin(k*.628),k%2?7:6,['#e8402a','#e8a020','#6a8a30','#c0402a'][k%4],'rgba(0,0,0,.25)',1)).join('')}${P('M-12 -66L0 -74L12 -66L8 -48L0 -56L-8 -48Z','#e8507a')}`;
const kamin=()=>`${sch(90)}${C(0,-50,120,'url(#licht)')}${R(-84,-156,168,156,'#9a8a80','#4a3a30',4)}${[...Array(6)].map((_,k)=>L(`M-84 ${-130+k*26}H84`,'rgba(60,40,30,.4)',2)).join('')}${R(-52,-104,104,104,'#1a1008','#4a3a30',3)}${P('M-38 0Q-44 -50 -14 -90Q-10 -50 6 -64Q34 -50 38 0Z','#f08a2a')}${P('M-18 0Q-18 -34 0 -58Q18 -34 18 0Z','#ffd060')}${R(-44,-8,88,12,'#6a4a28','#3a2410',2)}${R(-100,-168,200,16,'#7a5230','#3a2410',3)}${[[-60,'#c0303a'],[0,'#2e8a4a'],[60,'#c0303a']].map(([x,c])=>P(`M${x-10} -152h20l-3 22q-7 6 -14 0Z`,c,'#fff',1.5)).join('')}`;
const schlitten=()=>`${sch(80)}${R(-72,-44,144,14,'#c0303a','#6a1a20',3)}${L('M-50 -30V-8M0 -30V-8M50 -30V-8','#8a6238',5)}${L('M-92 -36Q-92 -4 -62 -2H72Q96 -2 90 -26','#5a5a68',6)}${R(-50,-62,100,18,'#2e8a4a','#1a5a2a',2)}${L('M-30 -62V-44M0 -62V-44M30 -62V-44','#f6d84a',3)}${L('M-92 -36Q-112 -44 -120 -24','#8a6238',3)}`;
const schneemann=()=>`${sch(48)}${C(0,-28,30,'#fff','#b8c8e0',3)}${C(0,-76,23,'#fff','#b8c8e0',3)}${C(0,-112,17,'#fff','#b8c8e0',3)}${R(-16,-146,32,22,'#2a2a34')}${R(-24,-126,48,6,'#2a2a34')}${C(-6,-114,2.5,'#222')}${C(6,-114,2.5,'#222')}${P('M0 -110L22 -106L0 -104Z','#f08a2a')}${P('M-22 -92Q0 -84 22 -92L22 -84Q0 -76 -22 -84Z','#c0303a')}${P('M18 -88v22h8v-22Z','#c0303a')}${C(0,-74,3,'#222')}${C(0,-60,3,'#222')}${L('M-22 -78L-50 -98M22 -78L50 -98','#6a4a28',4)}`;
const garderobe=()=>`${R(-90,-24,180,22,'#8a5a30','#3a2410',3)}${[-60,-20,20,60].map(x=>C(x,-13,4,'#f2c14e')).join('')}${P('M-76 -2Q-74 -50 -50 -52Q-30 -48 -34 -2Z','#c0303a','#6a1a20',2)}${C(-54,-58,7,'#fff')}${P('M-30 -2L-30 50L-14 50L-14 -2Z','#4a90e0','#1a4a8a',2)}${R(-34,-2,24,12,'#fff','#1a4a8a',1)}${P('M10 -2Q10 -40 36 -42Q56 -38 52 -2Z','#2e8a4a','#1a5a2a',2)}${R(8,-12,46,12,'#fff6c8','#8a7a40',1.5)}${P('M66 -2L66 60L82 60L82 -2Z','#f6d84a','#a08020',2)}`;
const futter=()=>`${sch(40)}${R(-4,-116,8,116,'#8a6238')}${L('M-26 0H26','#5a3a1c',6)}${R(-38,-160,76,44,'#c89a60','#6a4a20',3)}${P('M-48 -160L0 -196L48 -160Z','#c0303a','#6a1a20',3)}${R(-14,-148,28,24,'#3a2410')}${E(0,-114,36,6,'#8a6238','#4a2a10',2)}${[-20,-8,6,18].map(x=>C(x,-120,3,'#e8c050')).join('')}${E(-34,-132,10,7,'#e8a030','#7a4a10',1.5)}${P('M-44 -130l-8 -2l8 -4Z','#e84a2a')}`;
const eismesser=()=>`${R(-34,-92,68,20,'#8a5a30','#3a2410',3)}${[[-24,60],[-8,86],[8,48],[24,72]].map(([x,h])=>P(`M${x-7} -72H${x+7}L${x} ${-72+h}Z`,'rgba(200,236,250,.85)','#7ab8d8',1.5)).join('')}${R(-52,-72,16,150,'#fff6e8','#8a7a60',2)}${[...Array(8)].map((_,k)=>L(`M-52 ${-62+k*18}h${k%2?8:14}`,'#6a7a8a',2)).join('')}`;
const tannenz=()=>`${sch(50)}${P('M-26 -44H26L20 0H-20Z','#8a3a2a','#4a1a10',3)}${R(-28,-48,56,8,'#a0503a','#4a1a10',2)}${L('M0 -48L-40 -110M0 -48V-130M0 -48L40 -110','#6a4a28',3)}${P('M0 -50L-56 -96L-22 -92L-48 -124Q-16 -114 0 -140Q16 -114 48 -124L22 -92L56 -96Z','#2e7a3a','#1a4a22',2)}${C(-30,-100,4,'#e8402a')}${C(22,-110,4,'#e8402a')}${C(2,-84,4,'#e8402a')}`;
const advent=()=>`${sch(50)}${L('M-36 0L-44 -30M36 0L44 -30','#5a3a1c',6)}${R(-52,-196,104,170,'#c0303a','#6a1a20',4)}${[...Array(12)].map((_,k)=>R(-42+k%3*30,-184+Math.floor(k/3)*40,24,32,k%2?'#f6e0a0':'#2e8a4a','#6a4a20',2)+C(-30+k%3*30,-168+Math.floor(k/3)*40,3,'#c0303a')).join('')}${stern(0,-210,10,'#f2c14e')}`;
const sanduhr=()=>`${sch(60)}${R(-50,-196,100,12,'#7a5ac0','#2a1a5a',3)}${R(-50,-12,100,12,'#7a5ac0','#2a1a5a',3)}${P('M-40 -184H40Q40 -120 8 -104Q40 -88 40 -12H-40Q-40 -88 -8 -104Q-40 -120 -40 -184Z','rgba(200,220,255,.4)','#b8c8f0',3)}${P('M-30 -184H30Q26 -140 0 -126Q-26 -140 -30 -184Z','#f2d890')}${P('M-34 -12H34Q28 -50 0 -62Q-28 -50 -34 -12Z','#f2d890')}${L('M0 -112V-64','#f2d890',3)}${L('M-46 -190V-8M46 -190V-8','#7a5ac0',6)}`;
const uh=(x,a)=>C(x,0,26,'#fffbe8','#c8a040',4)+L(`M${x} 0V-17M${x} 0L${x+14*Math.sin(a)} ${-14*Math.cos(a)}`,'#2a2060',3)+C(x,0,3,'#e8507a');
const weltzeit=()=>`${R(-110,-62,220,106,'#3a2a7a','#c8a040',5)}${uh(-70,1)}${uh(0,2.6)}${uh(70,4.4)}${[[-70,'#e8507a'],[0,'#4ab0f0'],[70,'#f6d84a']].map(([x,c])=>R(x-20,32,40,6,c)).join('')}`;
const pendel=()=>`${sch(50)}${R(-34,-10,68,10,'#5a3a1c','#2a1a08',2)}${R(-6,-230,12,222,'#8a6238','#4a2a10',2)}${R(-6,-236,88,12,'#8a6238','#4a2a10',2)}${L('M72 -226L56 -100','#c8c8d8',3)}${C(54,-84,22,'#f2c14e','#a07010',3)}${C(54,-84,9,'#fff6c8')}${L('M14 -66Q54 -48 94 -66','rgba(255,255,255,.35)',3)}`;
const jahreskreis=()=>`<g transform="translate(0 -26) scale(1 .36)">${[['#8ccf6a','M0 0H96A96 96 0 0 0 0 -96Z'],['#f6d84a','M0 0V96A96 96 0 0 0 96 0Z'],['#e8802a','M0 0H-96A96 96 0 0 0 0 96Z'],['#9ad0f0','M0 0V-96A96 96 0 0 0 -96 0Z']].map(([c,d])=>P(d,c,'#fff',4)).join('')}${C(0,0,18,'#fff6c8','#7a5ac0',4)}</g>${U('jzblume',34,-60,24,'#e8507a')}${U('jzsonne',34,-26,24,'#c8780a')}${U('jzblatt',-60,-26,24,'#8a3a10')}${U('jzflocke',-60,-60,24,'#3a6aa8')}`;
const mond=()=>`${pf(60,250)}${R(-86,-50,172,100,'#1a1450','#c8a040',5)}${[-66,-33,0,33,66].map((x,k)=>C(x,0,13,'#f6f0c0')+(k==4?'':C(x+[0,8,14,22][k],0,13,'#1a1450'))+C(x,0,13,'none','#f6f0c0',1)).join('')}${stern(-60,-30,5,'#fff6c8')}${stern(50,32,4,'#fff6c8')}`;
const flieg=()=>`${[[-40,-20,-18],[10,10,12],[-6,-60,6]].map(([x,y,a])=>`<g transform="translate(${x} ${y}) rotate(${a})">${R(-30,-38,60,76,'#fff','#8a7a9a',3)}${R(-30,-38,60,18,'#e8507a')}${C(0,-29,4,'#fff')}${L('M-18 -8H18M-18 6H18M-18 20H8','#b8b0c8',3)}</g>`).join('')}${L('M50 -50Q70 -60 84 -48M54 -30Q76 -34 90 -22','rgba(255,255,255,.5)',3)}`;
const wasseruhr=()=>`${sch(60)}${L('M-40 -190V0M40 -190V0','#7a5ac0',4)}${R(-34,-196,68,10,'#7a5ac0','#2a1a5a',3)}${P('M-30 -170H30L22 -110H-22Z','rgba(200,230,255,.35)','#b8c8f0',3)}${P('M-27 -150H27L22 -110H-22Z','#6ac0f0')}${P('M-18 -100H18L16 -50H-16Z','rgba(200,230,255,.35)','#b8c8f0',3)}${P('M-16 -66H16L16 -50H-16Z','#6ac0f0')}${R(-34,-40,68,40,'rgba(200,230,255,.35)','#b8c8f0',3)}${R(-30,-18,60,18,'#6ac0f0')}${L('M0 -110V-100M0 -50V-40','#6ac0f0',3)}${L('M34 -34H44M34 -20H44M34 -8H44','#c8a040',2)}`;
const sternkarte=()=>`${sch(50)}${L('M-40 0L-20 -140M40 0L20 -140M0 0V-150','#8a6238',6)}${R(-62,-210,124,86,'#1a1450','#c8a040',4)}${[[-40,-190],[-14,-176],[10,-196],[34,-180],[44,-150],[-30,-150]].map(([x,y])=>stern(x,y,5,'#fff6c8')).join('')}${L('M-40 -190L-14 -176L10 -196L34 -180L44 -150M-14 -176L-30 -150','rgba(255,246,200,.6)',1.5)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer .ob{opacity:0}.tuer.offen .ob{opacity:1}.tuer.offen #bl{transform:scaleX(.12)}.tuer.offen #br{transform:scaleX(.12)}.tuer.offen .bud{transform:scale(1.8);opacity:0}.tuer.offen #sg{transform:translateX(190px);opacity:0}.tuer #st{transform:scaleX(.04)}.tuer.offen #st{transform:scaleX(1)}.tuer.offen #ll{transform:translateX(-140px)}.tuer.offen #lr{transform:translateX(140px)}.tuer.offen #sd{transform:scaleX(.14)}.tuer.offen #sh{transform:translateY(70px);opacity:0}.tuer.offen #zd{transform:scaleX(.1);opacity:0}.tuer.offen #zh{transform:rotate(720deg)}</style>`;
function tuerBlumen(n){
let a='',b='',kn='',bo='';
for(let i=0;i<5;i++){a+=E(432+i%2*30,226+i*48,34,26,i%2?'#6fb85a':'#8ccf6a','#3f8a3a',2);b+=E(568-i%2*30,250+i*48,34,26,i%2?'#8ccf6a':'#6fb85a','#3f8a3a',2);}
[[392,236,'#9a6ae0'],[392,340,'#f08ac0'],[392,430,'#f6d84a'],[608,236,'#f6d84a'],[608,340,'#e8507a'],[608,430,'#9a6ae0'],[430,166,'#f08ac0'],[500,150,'#9a6ae0'],[570,166,'#f6d84a']].forEach(([x,y,c])=>{
kn+=`<g class="tb bud" style="transform-origin:${x}px ${y}px">${E(x,y,8,14,c,'#5a3a7a',1.5)}</g>`;
bo+=[0,72,144,216,288].map(t=>E(x+10*Math.cos(t*.01745),y+10*Math.sin(t*.01745),8,8,c,'#5a3a7a',1)).join('')+C(x,y,5,'#fff6a0');
});
return`${P('M372 470V210Q372 150 500 150Q628 150 628 210V470Z','#6fb85a','#3f8a3a',5)}${R(410,190,180,280,'#fff0b0')}${C(500,300,140,'url(#licht)')}${C(500,270,38,'#fff6a0')}${P('M410 400Q470 370 520 390T590 380V470H410Z','#9ad870')}${C(450,430,6,'#f6d84a')}${C(540,440,6,'#f08ac0')}
   <g id="bl" class="tb" style="transform-origin:410px 330px">${R(410,190,92,280,'#6fb85a','#3f8a3a',3)}${a}</g>
   <g id="br" class="tb" style="transform-origin:590px 330px">${R(498,190,92,280,'#6fb85a','#3f8a3a',3)}${b}</g>
   ${kn}<g class="tb ob">${bo}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerSteg(n){
let s='',w='',q='';for(let k=0;k<4;k++)s+=R(410+k*48,168,36,24,'#e8cf8c','#a08040',2);
for(let k=0;k<7;k++)w+=L(`M${416+k*26} ${330+(k%3)*30}q8 -6 16 0t16 0`,'#bfe8ff',3);
for(let k=0;k<6;k++)q+=L(`M${434+k*28} 414V440`,'#5a3a1c',3);
return`${R(372,170,38,300,'#e8cf8c','#a08040',3)}${R(590,170,38,300,'#e8cf8c','#a08040',3)}${P('M372 190Q372 130 500 130Q628 130 628 190Z','#e8cf8c','#a08040',4)}${L('M500 130V92','#6a4a2a',3)}${P('M500 92L532 102L500 112Z','#e74c3c')}${C(398,220,5,'#fff0e0')}${C(604,300,6,'#f8c8b8')}
   ${R(410,190,180,120,'#9adcf8')}${R(410,310,180,160,'#3a9ad8')}${C(540,230,24,'#fff6a0')}${C(500,300,130,'url(#licht)')}${w}
   <g id="st" class="tb" style="transform-origin:410px 420px">${R(410,414,180,26,'#b8803a','#5a3a1c',3)}${q}</g>
   <g id="sg" class="tb">${R(410,190,180,280,'#e8cf8c','#a08040',4)}${s}${L('M430 250h14M520 270h14M450 380h14M540 400h14M470 440h14','#c8a860',4)}${C(436,300,7,'#fff0e0','#c89a60',1.5)}${C(560,350,7,'#f8c8b8','#c89a60',1.5)}${sPl(n,330)}</g>`;
}
function tuerLaub(n){
let t='',hl='',hr='';
[[424,'#6a4a28'],[470,'#7a5230'],[530,'#6a4a28'],[576,'#7a5230']].forEach(([x,c],k)=>{t+=R(x-6,200+k%2*20,12,270-k%2*20,c)+C(x,196+k%2*20,34,k%2?'#e8a020':'#d8702a');});
for(let k=0;k<8;k++){hl+=E(424+(k*13)%70,230+(k*37)%220,11,5,['#e8a020','#c0402a','#b8802a'][k%3],'#7a3a14',1);hr+=E(504+(k*13)%70,240+(k*41)%210,11,5,['#c0402a','#e8a020','#b8802a'][k%3],'#7a3a14',1);}
return`<defs><clipPath id="lbclip"><rect x="406" y="150" width="188" height="320"/></clipPath></defs>${R(366,150,268,28,'#8a6238','#3a2410',3)}${R(366,170,34,300,'#8a6238','#3a2410',3)}${R(600,170,34,300,'#8a6238','#3a2410',3)}${L('M376 178V470M390 178V470M610 178V470M624 178V470','#5a3a18',2)}
   ${R(410,190,180,280,'#ffd070')}${C(500,330,130,'url(#licht)')}${t}${P('M410 470L450 410H550L590 470Z','#e8a030')}
   <g clip-path="url(#lbclip)"><g id="ll" class="tb">${P('M410 470V240Q420 194 500 200V470Z','#d8702a','#7a3a14',3)}${hl}${R(410,300,90,14,'#8a6238','#3a2410',2)}${R(410,400,90,14,'#8a6238','#3a2410',2)}</g><g id="lr" class="tb">${P('M590 470V240Q580 194 500 200V470Z','#d8702a','#7a3a14',3)}${hr}${R(500,300,90,14,'#8a6238','#3a2410',2)}${R(500,400,90,14,'#8a6238','#3a2410',2)}</g></g>
   <g class="tb pl">${sPl(n,350)}</g>`;
}
function tuerSchnee(n){
let s='';for(let k=0;k<6;k++)s+=L(`M${420+k*30} 194V466`,'#5a3a18',3);
return`${P('M372 470V190Q372 150 500 150Q628 150 628 190V470Z','#7a5230','#3a2410',5)}${P('M360 470Q362 438 380 434Q400 438 402 470ZM598 470Q600 438 620 434Q638 438 640 470Z','#fff','#d8e4f4',2)}${R(410,190,180,280,'#16224a')}${[[430,220],[470,250],[570,270],[455,300],[580,225]].map(([x,y])=>stern(x,y,4,'#fff6c8')).join('')}${C(545,236,16,'#fff6c8')}${C(500,330,130,'url(#licht)')}${P('M410 420Q460 396 510 416T590 408V470H410Z','#eef4ff')}${P('M440 440L462 380L484 440ZM520 444L546 372L572 444Z','#1a4a30')}
   <g id="sd" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#8a5a30','#3a2410',4)}${s}${R(410,300,180,10,'#5a3a18')}${R(410,400,180,10,'#5a3a18')}<circle cx="500" cy="250" r="26" fill="none" stroke="#2e7a3a" stroke-width="9"/>${C(486,226,4,'#e8402a')}${C(514,228,4,'#e8402a')}${C(500,278,5,'#e8402a')}${C(568,340,7,'#f2c14e','#a07010',2)}${P('M410 470V446Q440 436 470 446T530 446T590 440V470Z','#fff')}</g>
   <g id="sh" class="tb">${P('M398 200Q392 160 436 168Q466 146 500 164Q536 146 566 168Q608 160 602 200Q580 190 560 200Q530 188 500 202Q470 188 440 200Q418 190 398 200Z','#fff','#b8c8e0',3)}${P('M430 200v16q4 6 8 0v-16ZM520 202v22q4 6 8 0v-22Z','#fff')}</g>
   <g class="tb pl">${sPl(n,350)}</g>`;
}
function tuerUhr(n){
const tk=[...Array(12)].map((_,i)=>`<rect x="-3" y="-108" width="6" height="${i%3?10:20}" fill="#2a2060" transform="translate(500 352) rotate(${i*30})"/>`).join('');
return`${P('M356 470V240Q356 130 500 130Q644 130 644 240V470Z','#5a4a8a','#1a1040',5)}${[...Array(7)].map((_,k)=>stern(380+k*40,150+(k*37)%30,4,'#f6e8a0')).join('')}${R(410,190,180,280,'#f4f0ff')}${C(500,330,130,'url(#licht)')}${P('M410 470L450 400H550L590 470Z','#c8c0f0')}${R(450,250,100,150,'#fffbe8')}
   <g id="zd" class="tb" style="transform-origin:500px 352px">${R(410,190,180,280,'#2a2060')}${C(500,352,118,'#fffbe8','#c8a040',6)}${tk}<g id="zh" class="tb" style="transform-origin:500px 352px">${L('M500 352V286','#2a2060',7)}${L('M500 352L544 374','#2a2060',6)}${C(500,352,8,'#e8507a')}</g></g>
   <g class="tb pl">${sPl(n,412)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'blumentor';
const arten={blumentor:[tuerBlumen,'Blütentor mit Zahlenschloss'],steg:[tuerSteg,'Sandburg-Tor am Steg mit Zahlenschloss'],laub:[tuerLaub,'Laubhaufen-Tor mit Zahlenschloss'],schnee:[tuerSchnee,'Verschneite Holztür mit Zahlenschloss'],uhr:[tuerUhr,'Zifferblatt-Tor mit Zahlenschloss']};
const a=arten[art]||arten.blumentor;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.jahreszeiten={
name:"Die Jahreszeiten-Reise",
symbole:["jzblume","jzsonne","jzblatt","jzflocke","jzuhr"],
symbolNamen:["Blume","Sonne","Blatt","Schneeflocke","Uhr"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="60" cy="45" r="40" fill="#fff6e0" stroke="#7a5ac0" stroke-width="3"/><path d="M60 45V9A36 36 0 0 1 96 45Z" fill="#8ccf6a"/><path d="M60 45H96A36 36 0 0 1 60 81Z" fill="#f6d84a"/><path d="M60 45V81A36 36 0 0 1 24 45Z" fill="#e8802a"/><path d="M60 45H24A36 36 0 0 1 60 9Z" fill="#9ad0f0"/><circle cx="60" cy="45" r="17" fill="#fffbe8" stroke="#7a5ac0" stroke-width="3"/><path d="M60 45V33M60 45L68 50" stroke="#2a2060" stroke-width="3" stroke-linecap="round"/><use href="#sym-jzblatt" x="70" y="56" width="22" height="22" color="#8a3a10"/></svg>`,
texte:{
einleitung:"Ihr schlagt ein altes Kalenderbuch auf – und plötzlich wirbelt euch ein bunter Wind mitten in die Jahreszeiten! Die Jahreszeiten-Fee hat alles durcheinandergebracht, und die große Jahresuhr steht still. Der kleine Kuckuck flattert herbei und ruft: Nur wer alle Zahlenschlösser öffnet, kann die Uhr wieder anstellen! Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände in jeder Jahreszeit. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es durch das ganze Jahr, vom Frühling bis zum Winter?",
startKnopf:"Auf Reise durchs Jahr",
hinweisGeber:"Der kleine Kuckuck ruft:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Der Kuckuck schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Zeit läuft davon!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Jahresuhr trotzdem noch anstellen!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und die Jahresuhr wieder angestellt. Die Jahreszeiten-Fee ist stolz auf euch!"
},
texteDu:{
einleitung:"Du schlägst ein altes Kalenderbuch auf – und plötzlich wirbelt dich ein bunter Wind mitten in die Jahreszeiten! Die Jahreszeiten-Fee hat alles durcheinandergebracht, und die große Jahresuhr steht still. Der kleine Kuckuck flattert herbei und ruft: Nur wer alle Zahlenschlösser öffnet, kann die Uhr wieder anstellen! Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände in jeder Jahreszeit. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es durch das ganze Jahr, vom Frühling bis zum Winter?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Der Kuckuck schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Jahresuhr trotzdem noch anstellen!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und die Jahresuhr wieder angestellt. Die Jahreszeiten-Fee ist stolz auf dich!"
},
einfach:{
name:"Die Jahreszeiten-Reise",
symbolNamen:["Blume","Sonne","Blatt","Schneeflocke","Uhr"],
texte:{
einleitung:"Ihr öffnet ein altes Kalender-Buch. Schwups! Ihr seid mitten im Jahr. Die Fee hat die Jahreszeiten vertauscht. Die große Uhr steht still. Der kleine Kuckuck sagt: Öffnet alle Zahlenschlösser. Dann geht die Uhr wieder. An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben. Für jede richtige Aufgabe bekommt ihr eine Zahl. Schafft ihr das ganze Jahr?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit läuft davon!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Die Jahresuhr geht wieder. Die Fee ist stolz auf euch!"
},
texteDu:{
einleitung:"Du öffnest ein altes Kalender-Buch. Schwups! Du bist mitten im Jahr. Die Fee hat die Jahreszeiten vertauscht. Die große Uhr steht still. Der kleine Kuckuck sagt: Öffne alle Zahlenschlösser. Dann geht die Uhr wieder. An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben. Für jede richtige Aufgabe bekommst du eine Zahl. Schaffst du das ganze Jahr?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Durchgang bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Die Jahresuhr geht wieder. Die Fee ist stolz auf dich!"
},
raeume:[
{titel:"Die Frühlingswiese",intro:"Hier blühen Blumen. Die Bienen summen. Findet die Zahlen für das Blüten-Tor!",introDu:"Hier blühen Blumen. Die Bienen summen. Finde die Zahlen für das Blüten-Tor!",
objekte:[{name:"Frosch-Tafel",fund:"An der Tafel klebt:"},{name:"Krokusse",fund:"Bei den Krokussen liegt:"},{name:"Bienenkorb",fund:"Am Bienenkorb klebt:"},{name:"Regenschirm",fund:"Am Schirm hängt:"},{name:"Vogelnest",fund:"Im Nest liegt:"}],
infoObjekte:[{name:"April-Kalender",fund:"Am Kalender klebt:"},{name:"Gießkanne",fund:"An der Kanne klebt:"},{name:"Samen-Tüten",fund:"Bei den Tüten liegt:"}]},
{titel:"Der Sommerstrand",intro:"Die Sonne scheint. Das Meer glitzert. Eine Sandburg ist das Tor.",
objekte:[{name:"Sonnenschirm",fund:"Am Schirm klebt:"},{name:"Muschel-Eimer",fund:"Im Eimer liegt:"},{name:"Rettungsring",fund:"Am Ring hängt:"},{name:"Eis-Wagen",fund:"Am Eis-Wagen klebt:"},{name:"Strandkorb",fund:"Im Strandkorb liegt:"}],
infoObjekte:[{name:"Thermometer",fund:"Am Thermometer klebt:"},{name:"Fernrohr",fund:"Am Fernrohr klebt:"},{name:"Sonnen-Tafel",fund:"An der Tafel klebt:"}]},
{titel:"Der Herbstacker",intro:"Bunte Blätter liegen am Boden. Ein Laub-Haufen ist das Tor.",
objekte:[{name:"Kürbisse",fund:"Unter den Kürbissen liegt:"},{name:"Vogelscheuche",fund:"An der Vogelscheuche hängt:"},{name:"Drachen",fund:"Am Drachen klebt:"},{name:"Laubhaufen",fund:"Im Laub liegt:"},{name:"Apfelkorb",fund:"Im Korb liegt:"}],
infoObjekte:[{name:"Vogel-Tafel",fund:"An der Tafel klebt:"},{name:"Pilze",fund:"Bei den Pilzen liegt:"},{name:"Erntekranz",fund:"Am Kranz hängt:"}]},
{titel:"Die Winterhütte",intro:"Im Kamin brennt ein Feuer. Draußen fällt Schnee. Die Tür ist noch zu.",
objekte:[{name:"Kamin",fund:"Am Kamin liegt:"},{name:"Schlitten",fund:"Auf dem Schlitten liegt:"},{name:"Schneemann",fund:"Beim Schneemann liegt:"},{name:"Mützen-Brett",fund:"An den Mützen hängt:"},{name:"Futterhaus",fund:"Im Futterhaus liegt:"}],
infoObjekte:[{name:"Eiszapfen-Maß",fund:"Am Maß klebt:"},{name:"Tannenzweige",fund:"Zwischen den Zweigen steckt:"},{name:"Advents-Kalender",fund:"Am Kalender klebt:"}]},
{titel:"Das Zeitportal",intro:"Hier tickt eine riesige Uhr. Das Tor ist ein Zifferblatt. Öffnet das letzte Schloss!",introDu:"Hier tickt eine riesige Uhr. Das Tor ist ein Zifferblatt. Öffne das letzte Schloss!",
objekte:[{name:"Sanduhr",fund:"An der Sanduhr klebt:"},{name:"Weltzeit-Uhren",fund:"An den Uhren klebt:"},{name:"Pendel",fund:"Am Pendel hängt:"},{name:"Jahres-Kreis",fund:"Auf dem Kreis liegt:"},{name:"Mond-Tafel",fund:"An der Tafel klebt:"}],
infoObjekte:[{name:"Kalender-Blätter",fund:"Zwischen den Blättern steckt:"},{name:"Wasseruhr",fund:"An der Wasseruhr klebt:"},{name:"Sternen-Karte",fund:"An der Karte klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Frühlingswiese",
intro:"Auf der Frühlingswiese blühen Krokusse und Tulpen, und die Bienen summen von Blume zu Blume. Ein Tor aus Blüten versperrt den Weg. Findet die Ziffern, um es zu öffnen!",
introDu:"Auf der Frühlingswiese blühen Krokusse und Tulpen, und die Bienen summen von Blume zu Blume. Ein Tor aus Blüten versperrt den Weg. Finde die Ziffern, um es zu öffnen!",
tuerX:1300,tuerArt:"blumentor",
hintergrund:()=>`${defs('#9be07a','#5fb450','#fff8c8','#bfe4fa','#fff6e8')}${R(0,0,1600,470,'url(#himmel)')}${C(260,100,200,'url(#licht)')}${C(260,100,40,'#fffbd0')}${E(700,90,90,22,'#fff')}${E(780,76,60,18,'#fff')}${E(1200,130,100,22,'#fff')}${P('M0 330Q300 250 600 320T1200 280T1600 320V470H0Z','#cdeab8')}${P('M0 400Q400 340 800 400T1600 380V470H0Z','#b4e09a')}${[120,560,1000,1500].map((x,k)=>R(x-12,250,24,220,'#8a6a4a')+krone(x,230,64+k%2*10,'#f8c0d8')+[...Array(7)].map((_,j)=>C(x-50+j*17,200+(j*29)%60,5,'#fff')).join('')).join('')}${[...Array(9)].map((_,k)=>E(300+k*130,200+(k*47)%120,9,5,'#f6d84a')).join('')}${boden(1)}`,
objekte:[
{name:"Wetterfrosch-Tafel",x:300,y:230,wand:true,by:-70,zeichne:wetterfrosch,fund:"An der Wetterfrosch-Tafel klebt:"},
{name:"Krokusgruppe",x:600,boden:620,fuss:4,by:-75,zeichne:krokus,fund:"Zwischen den Krokussen liegt:"},
{name:"Bienenstock",x:1000,boden:700,fuss:4,by:-110,zeichne:bienenkorb,fund:"Am Bienenstock klebt:"},
{name:"Regenschirm im Ständer",x:150,boden:690,fuss:4,by:-190,zeichne:schirmst,fund:"Am Regenschirm hängt:"},
{name:"Vogelnest im Busch",x:850,boden:740,fuss:4,by:-115,zeichne:nestbusch,fund:"Im Vogelnest liegt:"}
],
infoObjekte:[{name:"Aprilkalender",x:800,y:250,wand:true,by:-80,zeichne:aprilkal,fund:"Am Kalender klebt:"},{name:"Gießkanne",x:450,boden:730,fuss:4,by:-100,zeichne:kanne,fund:"An der Gießkanne klebt:"},{name:"Saattüten-Ständer",x:1450,boden:650,fuss:4,by:-150,zeichne:saat,fund:"Bei den Saattüten liegt:"}]},
{titel:"Der Sommerstrand",
intro:"Am Sommerstrand scheint die Sonne, und das Meer glitzert blau. Eine große Sandburg versperrt den Steg. Findet die Ziffern, um den Weg frei zu machen!",
introDu:"Am Sommerstrand scheint die Sonne, und das Meer glitzert blau. Eine große Sandburg versperrt den Steg. Finde die Ziffern, um den Weg frei zu machen!",
tuerX:500,tuerArt:"steg",
hintergrund:()=>`${defs('#f4dc9a','#e0be70','#fff2b0','#3aa8f0','#cdeeff')}${R(0,0,1600,470,'url(#himmel)')}${C(1250,120,240,'url(#licht)')}${C(1250,120,56,'#fff3a0')}${E(400,100,100,22,'#fff')}${E(480,86,60,18,'#fff')}${E(800,150,90,20,'#fff')}${R(0,300,1600,170,'#2a9ad8')}${R(0,300,1600,16,'#5ac0f0')}${[...Array(20)].map((_,k)=>L(`M${k*90} ${350+(k*37)%110}q20 -8 40 0t40 0`,'#bfe8ff',3)).join('')}${P('M900 300H1000L970 330H920Z','#e8507a')}${P('M950 296V230L1000 296Z','#fff','#c8d8e8',2)}${R(949,226,3,70,'#5a3a1c')}${P('M0 470Q200 430 400 460Q700 420 1000 462Q1300 430 1600 460V470Z','#e8cc88')}${[[120,1],[1480,-1]].map(([x,s])=>L(`M${x} 470Q${x+30*s} 340 ${x+10*s} 240`,'#8a6238',16)+L(`M${x+10*s} 240Q${x-30} 200 ${x-70} 230M${x+10*s} 240Q${x+10*s} 180 ${x+50} 170M${x+10*s} 240Q${x+60} 190 ${x+100} 225M${x+10*s} 240Q${x-20} 260 ${x-50} 300M${x+10*s} 240Q${x+50} 260 ${x+80} 300`,'#2e9a4a',9)+C(x+8*s,250,6,'#6a4a2a')+C(x+22*s,252,6,'#6a4a2a')).join('')}${boden(2)}`,
objekte:[
{name:"Sonnenschirm",x:850,boden:620,fuss:4,by:-235,zeichne:schirmS,fund:"Unter dem Sonnenschirm liegt:"},
{name:"Eimer mit Muscheln",x:1100,boden:740,fuss:4,by:-100,zeichne:eimer,fund:"Im Eimer liegt:"},
{name:"Rettungsring",x:1000,y:240,wand:true,by:-70,zeichne:ring,fund:"Am Rettungsring hängt:"},
{name:"Eisstand",x:200,boden:680,fuss:4,by:-170,zeichne:eisstand,fund:"Am Eisstand klebt:"},
{name:"Strandkorb",x:1400,boden:600,fuss:4,by:-165,zeichne:korb,fund:"Im Strandkorb liegt:"}
],
infoObjekte:[{name:"Thermometer",x:1250,y:230,wand:true,by:-100,zeichne:thermo,fund:"Am Thermometer klebt:"},{name:"Fernrohr",x:700,boden:700,fuss:4,by:-140,zeichne:fernrohr,fund:"Am Fernrohr klebt:"},{name:"Sonnenschutz-Tafel",x:330,boden:600,fuss:4,by:-135,zeichne:sonnenschutz,fund:"Hinter der Tafel klebt:"}]},
{titel:"Der Herbstacker",
intro:"Auf dem Herbstacker liegen bunte Blätter und dicke Kürbisse. Ein Laubhaufen mit Brettern bildet das Tor. Findet die Ziffern, um es zu öffnen!",
introDu:"Auf dem Herbstacker liegen bunte Blätter und dicke Kürbisse. Ein Laubhaufen mit Brettern bildet das Tor. Finde die Ziffern, um es zu öffnen!",
tuerX:1000,tuerArt:"laub",
hintergrund:()=>`${defs('#8a6a3a','#5a3a1c','#ffb860','#b8a898','#f6d8a0')}${R(0,0,1600,470,'url(#himmel)')}${C(1250,120,240,'url(#licht)')}${[[200,90,120],[620,60,150],[1000,110,110],[1400,80,130]].map(([x,y,w])=>E(x,y,w,26,'#a89888')+E(x+w*.4,y-14,w*.6,20,'#b8a898')).join('')}${P('M0 330Q300 270 700 320T1300 290T1600 320V470H0Z','#c89a50')}${P('M0 400Q400 350 900 400T1600 390V470H0Z','#a8782a')}${[100,300,700,860,1180,1420,1560].map((x,k)=>R(x-6,290-k%3*10,12,120,'#6a4a28')+C(x,270-k%3*10,50,['#d8602a','#e8a020','#c0402a'][k%3])+C(x-26,300-k%3*10,32,['#e8a020','#d8602a','#e8a020'][k%3])).join('')}${R(440,330,110,80,'#b04a30','#5a1a10',3)}${P('M428 332L495 288L562 332Z','#7a2a1a','#3a1008',3)}${R(480,362,30,48,'#5a2a10')}${boden(3)}`,
objekte:[
{name:"Kürbisgruppe",x:400,boden:690,fuss:4,by:-110,zeichne:kuerbisse,fund:"Unter dem Kürbis liegt:"},
{name:"Vogelscheuche",x:700,boden:620,fuss:4,by:-200,zeichne:scheuche,fund:"An der Vogelscheuche hängt:"},
{name:"Drachen am Zaun",x:1300,y:250,wand:true,by:-100,zeichne:drache,fund:"Am Drachen klebt:"},
{name:"Laubhaufen",x:250,boden:740,fuss:4,by:-125,zeichne:laubh,fund:"Im Laub liegt:"},
{name:"Apfelkorb",x:1450,boden:700,fuss:4,by:-125,zeichne:apfelkorb,fund:"Im Apfelkorb liegt:"}
],
infoObjekte:[{name:"Zugvögel-Tafel",x:550,y:240,wand:true,by:-70,zeichne:zugv,fund:"An der Zugvögel-Tafel klebt:"},{name:"Pilze",x:850,boden:735,fuss:4,by:-85,zeichne:pilze,fund:"Bei den Pilzen liegt:"},{name:"Erntekranz-Ständer",x:1180,boden:650,fuss:4,by:-185,zeichne:kranz,fund:"Am Erntekranz hängt:"}]},
{titel:"Die Winterhütte",
intro:"In der Winterhütte knistert das Feuer im Kamin, und draußen vor dem Fenster fällt Schnee. Die verschneite Tür ist noch zu. Findet die Ziffern, um sie zu öffnen!",
introDu:"In der Winterhütte knistert das Feuer im Kamin, und draußen vor dem Fenster fällt Schnee. Die verschneite Tür ist noch zu. Finde die Ziffern, um sie zu öffnen!",
tuerX:400,tuerArt:"schnee",
hintergrund:()=>`${defs('#8a5a30','#4a2a14','#ffb050','#5a3a1c','#3a2410')}${[...Array(16)].map((_,k)=>R(k*100,0,100,470,k%2?'#8a5a34':'#7a4c2a','#4a2a14',3)).join('')}${R(0,0,1600,34,'#3a2010')}${R(1130,100,250,230,'#16224a','#4a2a14',12)}${[...Array(26)].map((_,k)=>C(1146+(k*53)%220,114+(k*71)%200,2.5,'#fff')).join('')}${C(1190,150,20,'#fff6c8')}${P('M1130 330Q1250 290 1380 320V330Z','#eef4ff')}${L('M1255 100V330M1130 215H1380','#4a2a14',8)}${R(1112,330,286,16,'#6a4a28','#3a2410',3)}${C(900,300,430,'url(#licht)')}${boden(4)}${E(700,680,260,46,'#a02a2a','#5a1010',4)}${E(700,680,190,28,'none','#f6d890',3)}`,
objekte:[
{name:"Kamin",x:950,boden:600,fuss:4,by:-195,zeichne:kamin,fund:"Am Kamin liegt:"},
{name:"Schlitten",x:700,boden:700,fuss:4,by:-85,zeichne:schlitten,fund:"Auf dem Schlitten liegt:"},
{name:"Schneemann",x:1150,boden:740,fuss:4,by:-160,zeichne:schneemann,fund:"Beim Schneemann liegt:"},
{name:"Mütze-und-Schal-Brett",x:750,y:240,wand:true,by:-50,zeichne:garderobe,fund:"Am Brett hängt:"},
{name:"Futterhäuschen",x:1300,boden:640,fuss:4,by:-200,zeichne:futter,fund:"Im Futterhäuschen liegt:"}
],
infoObjekte:[{name:"Eiszapfen-Messer",x:1450,y:240,wand:true,by:-100,zeichne:eismesser,fund:"Am Eiszapfen-Messer klebt:"},{name:"Tannenzweige",x:550,boden:740,fuss:4,by:-145,zeichne:tannenz,fund:"Zwischen den Tannenzweigen steckt:"},{name:"Adventskalender-Ständer",x:1480,boden:620,fuss:4,by:-215,zeichne:advent,fund:"Am Adventskalender klebt:"}]},
{titel:"Das Zeitportal",
intro:"Im Zeitportal tickt eine riesige Uhr zwischen den Sternen. Das Tor ist ein großes Zifferblatt. Findet die letzten Ziffern – dann läuft die Jahresuhr wieder!",
introDu:"Im Zeitportal tickt eine riesige Uhr zwischen den Sternen. Das Tor ist ein großes Zifferblatt. Finde die letzten Ziffern – dann läuft die Jahresuhr wieder!",
tuerX:800,tuerArt:"uhr",
hintergrund:()=>`${defs('#3a2a7a','#1a1240','#b8a0ff','#1a1450','#4a2a8a')}${R(0,0,1600,470,'url(#himmel)')}${[...Array(40)].map((_,k)=>stern((k*197)%1600,(k*61)%440+10,3+k%3*2,'#fff6c8')).join('')}${C(1500,90,40,'#f6f0c0')}${C(250,230,170,'#2a2068','#b8a0f0',8)}${[...Array(12)].map((_,k)=>`<rect x="-3" y="-158" width="6" height="${k%3?10:20}" fill="#b8a0f0" transform="translate(250 230) rotate(${k*30})"/>`).join('')}${L('M250 230V120M250 230L320 270','#f2c14e',8)}${C(250,230,12,'#f2c14e')}${[700,870].map(x=>R(x,0,34,470,'#4a3a8a','#1a1040',3)).join('')}${C(800,300,420,'url(#licht)')}${boden(5)}`,
objekte:[
{name:"Sanduhr",x:450,boden:650,fuss:4,by:-215,zeichne:sanduhr,fund:"An der Sanduhr klebt:"},
{name:"Weltzeituhr",x:560,y:240,wand:true,by:-80,zeichne:weltzeit,fund:"An der Weltzeituhr klebt:"},
{name:"Pendel",x:1100,boden:600,fuss:4,by:-255,zeichne:pendel,fund:"Am Pendel hängt:"},
{name:"Jahreskreis",x:950,boden:740,fuss:4,by:-95,zeichne:jahreskreis,fund:"Auf dem Jahreskreis liegt:"},
{name:"Mondphasen-Tafel",x:1050,y:250,wand:true,by:-80,zeichne:mond,fund:"An der Mondphasen-Tafel klebt:"}
],
infoObjekte:[{name:"Kalenderblätter",x:1420,y:230,wand:true,by:-90,zeichne:flieg,fund:"Zwischen den Kalenderblättern steckt:"},{name:"Wasseruhr",x:250,boden:730,fuss:4,by:-210,zeichne:wasseruhr,fund:"An der Wasseruhr klebt:"},{name:"Sternenkarte-Ständer",x:1250,boden:660,fuss:4,by:-235,zeichne:sternkarte,fund:"An der Sternenkarte klebt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmelA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6ac0f0"/><stop offset="1" stop-color="#fff0d8"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmelA)"/>${P('M0 450Q250 410 500 440T1000 420V600H0Z','#7ac060')}${P('M0 520Q300 480 600 520T1000 500V600H0Z','#5fa84a')}
   ${R(470,250,60,210,'#8a6238','#4a2a10',4)}${L('M500 300L440 250M500 330L570 280','#8a6238',8)}
   ${P('M500 190H380A120 120 0 0 1 500 70Z','#f8c0d8')}${P('M500 190V70A120 120 0 0 1 620 190Z','#4fa84a')}${P('M500 190H620A120 120 0 0 1 500 310Z','#e8802a')}${P('M500 190V310A120 120 0 0 1 380 190Z','#eef4ff')}
   ${[[430,120],[470,100],[410,160]].map(([x,y])=>C(x,y,6,'#fff','#e8507a',1.5)).join('')}${[[560,120],[590,160],[530,100]].map(([x,y])=>C(x,y,5,'#2e8a3a')).join('')}${[[540,250],[580,220],[600,260]].map(([x,y])=>C(x,y,8,'#e8402a')).join('')}${[[420,220],[460,260],[400,250]].map(([x,y])=>C(x,y,6,'#9ad0f0','#fff',2)).join('')}
   ${C(290,380,56,'#fffbe8','#c8a040',7)}${[...Array(12)].map((_,k)=>`<rect x="-2" y="-48" width="4" height="${k%3?6:12}" fill="#2a2060" transform="translate(290 380) rotate(${k*30})"/>`).join('')}${L('M290 380V344M290 380L312 392','#2a2060',5)}${C(290,380,6,'#e8507a')}${R(284,436,12,40,'#7a5ac0')}
   <g transform="translate(700 150)">${E(0,0,22,12,'#8a6a4a')}${C(20,-8,9,'#a8825a')}${P('M28 -8L42 -5L28 -2Z','#f2a81e')}${P('M-8 -2Q-30 -34 -52 -26Q-34 -6 -8 4Z','#a8825a','#5a3a1c',2)}${P('M-8 2Q-26 28 -46 28Q-30 6 -4 6Z','#c8a070','#5a3a1c',2)}${P('M-20 2L-44 12L-18 8Z','#8a6a4a')}${C(22,-10,2,'#222')}${L('M-60 40Q-80 30 -96 40M-50 60Q-70 56 -84 64','rgba(255,255,255,.7)',3)}</g>
   <path d="M0 0H1000V600H0Z M200 600V180H800V600Z" fill="#4a3a8a" fill-rule="evenodd"/><path d="M200 600V180H800V600" stroke="#1a1040" stroke-width="18" fill="none"/>${C(500,110,72,'#fffbe8','#c8a040',8)}${[...Array(12)].map((_,k)=>`<rect x="-2.5" y="-58" width="5" height="${k%3?7:14}" fill="#2a2060" transform="translate(500 110) rotate(${k*30})"/>`).join('')}${L('M500 110V74M500 110L526 126','#2a2060',6)}${C(500,110,7,'#e8507a')}${[[130,80],[880,100],[110,300],[900,320]].map(([x,y])=>stern(x,y,9,'#f6e8a0')).join('')}`
};
})();