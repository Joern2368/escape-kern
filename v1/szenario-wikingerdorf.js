document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-wkschiff\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><path d=\"M-19 3Q-10 16 0 16Q10 16 19 3Q10 8 0 8Q-10 8 -19 3ZM-19 3Q-23 -7 -16 -11L-13 -7Q-17 -3 -15 3Z\"/><rect x=\"-1.5\" y=\"-18\" width=\"3\" height=\"25\"/><path d=\"M-12 -15H12L14 3H-14Z\"/></g></symbol>\n<symbol id=\"sym-wkrune\" viewBox=\"-20 -20 40 40\"><path d=\"M-6 -18V18M-6 -18L10 -8M-6 -5L10 5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"sym-wkwelle\" viewBox=\"-20 -20 40 40\"><path d=\"M-18 -5Q-12 -13 -6 -5T6 -5T18 -5M-18 8Q-12 0 -6 8T6 8T18 8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-wkmoewe\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-19 -3Q-10 -15 0 1Q10 -15 19 -3Q10 -7 0 11Q-10 -7 -19 -3Z\"/></symbol>\n<symbol id=\"sym-wksonne\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-18 8A18 18 0 0 1 18 8Z\"/><path d=\"M0 -6V-18M-12 -1L-18 -10M12 -1L18 -10M-18 14H18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></symbol>\n</defs>\n</svg>");
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
const holz='#8a5a30',dk='#3a2410',gold='#f2c14e',ei='#6a6e78',ed='#2a2c32',rot='#b8402a',stein='#8a8a84',sd='#3a3a36',fell='#c8a070',ws='#f4f0e6';
const RU=['M0 -10V10M0 -10l7 5M0 -3l7 5','M-4 10V-10l8 5V10','M-3 -10V10M-3 -5l6 5l-6 5','M-4 10V-10l7 4l-7 4l7 8','M0 10V-10M0 -2l-6 -7M0 -2l6 -7','M0 10V-10M-6 -4L0 -10L6 -4','M-5 -10V10M5 -10V10M-5 -6L5 6','M0 -10V10M-5 -4L5 4'];
const rn=(x,y,k,s,c,w)=>`<path d="${RU[k%8]}" transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const mw=(x,y,s,c)=>L(`M${x-14*s} ${y}q${7*s} ${-9*s} ${14*s} 0q${7*s} ${-9*s} ${14*s} 0`,c||'#3a3a48',2.5);
const dboot=(x,y,s)=>{let sg='';for(let i=1;i<6;i+=2){const a=-90+i*30,b=-100+i*33.3;sg+=P(`M${a} -210H${a+30}L${b+33.3} -70H${b}Z`,rot);}let o='';for(let i=-4;i<5;i++)o+=`M${i*38} -26l-16 52`;return`<g transform="translate(${x} ${y}) scale(${s} ${Math.abs(s)})">${L(o,fell,5)}${L('M0 -30V-226',dk,8)}${P('M-90 -210H90L100 -70H-100Z',ws,'#8a6a3a',3)}${sg}${L('M-104 -212H104',dk,6)}${P('M-214 -80Q-150 30 0 30Q150 30 214 -80Q120 -30 0 -30Q-120 -30 -214 -80Z',holz,dk,4)}${L('M-190 -50Q0 22 190 -50M-160 -30Q0 26 160 -30','#6a4020',3)}${L('M-212 -78Q-246 -130 -222 -160Q-206 -176 -188 -160',holz,12)}${C(-210,-158,3,gold)}${L('M212 -78Q246 -120 226 -150Q210 -164 198 -146',holz,12)}</g>`;};
const birke=(x,h)=>E(x,470-h,46,70,'#14302a')+R(x-6,470-h,12,h,'#e8e4dc')+L(`M${x-6} ${490-h}h6M${x} ${530-h}h6M${x-6} ${570-h}h5`,'#2a2a2a',3);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const verl=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/>${c?`<stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>`:`<stop offset="1" stop-color="${b}"/>`}</linearGradient>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){const r=[470,500,535,575,620,670,725,780];for(let k=1;k<7;k++)d+=`M0 ${r[k]}H1600`;for(let k=0;k<7;k++)for(let x=(k%2)*70;x<1600;x+=150+k*15)d+=`M${x} ${r[k]}V${r[k+1]}`;return g+L(d,'rgba(40,20,5,.45)',3)+R(0,466,1600,8,'#5a3a1c');}
if(m==1){for(let k=0;k<80;k++){const x=(k*137+20)%1600,y=490+(k*53)%280;d+=`M${x} ${y}l${14+k%3*6} ${-3+k%5}`;}let f='';for(let k=0;k<10;k++)f+=E((k*233+120)%1600,520+(k*61)%220,70,10,'rgba(30,15,5,.25)');return g+f+L(d,'#c8a050',2);}
if(m==2){for(let k=0;k<70;k++)d+=C((k*149+30)%1600,490+(k*47)%285,2+k%3,k%9?'#141010':'#ff8a3a');return g+d;}
if(m==3){for(let k=0;k<70;k++){const x=(k*137+20)%1600,y=490+(k*53)%280;d+=`M${x} ${y}l-5 -12M${x} ${y}l2 -14M${x} ${y}l7 -10`;}let f='';for(let k=0;k<30;k++)f+=C((k*211+60)%1600,500+(k*79)%260,2.5,'rgba(180,255,220,.6)');return g+L(d,'#2a5a3a',3)+f;}
for(let k=0;k<50;k++)d+=E((k*181+50)%1600,500+(k*59)%270,4+k%3*2,3+k%2,['#e8d0b0','#fff4e8','#b8a080'][k%3]);return g+R(0,470,1600,14,'#e8f4f8')+L('M0 486Q100 478 200 486T400 486T600 486T800 486T1000 486T1200 486T1400 486T1600 486','#fff',4)+d;}
const netz=()=>{let d='';for(let i=0;i<7;i++)d+=`M${-66+i*22} -44V52`;for(let j=0;j<5;j++)d+=`M-76 ${-34+j*22}Q0 ${-22+j*22} 76 ${-34+j*22}`;return`${L('M-80 -64V64M80 -64V64',holz,8)}${L('M-82 -46Q0 -30 82 -46',dk,4)}${L(d,'#d8c8a0',2)}${[-60,-20,20,60].map((x,k)=>E(x,-40,8,6,k%2?'#e8503a':gold,dk,1.5)).join('')}${P('M-20 20Q0 6 20 20Q0 34 -20 20ZM20 20L32 10V30Z','#8ab0c8','#3a5a7a',2)}`;};
const moewe=()=>`${R(-10,0,20,90,'#6a4020',dk,3)}${E(0,0,16,5,'#5a3418')}${L('M-6 -6V2M6 -6V2',gold,3)}${P('M-30 -14L-48 -24L-44 -10Z','#9aa2ac')}${E(-2,-18,30,15,ws,'#6a6a70',2)}${P('M-26 -22Q-4 -36 22 -20Q0 -12 -26 -22Z','#9aa2ac','#6a6a70',1.5)}${C(22,-34,11,ws,'#6a6a70',2)}${P('M32 -35L46 -31L32 -27Z',gold)}${C(25,-37,2,'#222')}`;
const boot=()=>`${sch(120)}${L('M0 -44V-190',dk,6)}${P('M4 -184L64 -148L4 -84Z',ws,'#8a8070',2)}${L('M4 -150L50 -144',rot,6)}${P('M-124 -66Q-100 0 0 0Q100 0 124 -66Q60 -44 0 -44Q-60 -44 -124 -66Z',holz,dk,4)}${L('M-110 -40Q0 -8 110 -40M-96 -22Q0 6 96 -22','#6a4020',3)}${L('M-80 -50L-130 -6',fell,5)}${R(-70,-74,40,24,'#7a5a3a',dk,2)}${P('M-64 -78Q-50 -88 -40 -78Q-50 -70 -64 -78Z','#8ab0c8')}${C(118,-70,5,gold)}`;
const fass=()=>`${sch(44)}${P('M-40 0Q-48 -55 -40 -110H40Q48 -55 40 0Z','#9a6a3a',dk,4)}${L('M-44 -24H44M-46 -86H46',ei,5)}${L('M-16 -108V-2M16 -108V-2','#6a4020',2)}${E(0,-110,40,8,'#b88a50',dk,3)}${[-20,0,20].map(x=>P(`M${x-6} -112L${x} -132L${x+6} -112Z`,'#a8c0d0','#4a6a80',1.5)+P(`M${x-7} -134L${x} -128L${x+7} -134Z`,'#a8c0d0')).join('')}`;
const reuse=()=>`${sch(72)}${P('M-70 -40Q-70 -82 -40 -86L70 -62Q84 -40 70 -18L-40 0Q-70 -2 -70 -40Z','#c8a060','#6a4a20',3)}${L('M-40 -86Q-30 -42 -40 0M0 -78Q10 -40 0 -8M40 -70Q48 -40 40 -14M-60 -40H76','#8a6a30',3)}${E(-70,-42,12,38,'#5a3a18','#6a4a20',3)}${L('M70 -62L92 -76M70 -18L92 -6',fell,3)}`;
const htafel=()=>`${L('M-60 -60L0 -84L60 -60',dk,3)}${R(-86,-60,172,120,'#c89a60',dk,4)}${L('M0 -54V54M-80 0H80','#6a4020',3)}${P('M-66 -40Q-56 -50 -40 -44Q-24 -50 -16 -38L-22 -12Q-40 -6 -60 -12Z','#8a5a38','#4a2a10',2)}${C(40,-26,15,'#e8902a','#8a4a10',2)}${C(36,-30,5,'#ffd080')}${C(-40,28,18,'#d8dce4','#6a6e78',3)}${C(-40,28,8,'none','#6a6e78',2)}${P('M28 46L22 14Q40 4 58 14L52 46Z','#b8683a','#5a2a10',2)}${R(30,8,20,6,'#b8683a')}`;
const taurolle=()=>`${sch(54)}${E(0,-12,54,16,'#c8a060','#6a4a20',4)}${E(0,-26,44,13,'#d0aa68','#6a4a20',4)}${E(0,-38,32,10,'#c8a060','#6a4a20',4)}${E(0,-46,14,5,'#6a4a20')}${L('M50 -8Q84 0 74 14',fell,6)}`;
const hkiste=()=>`${sch(70)}${R(-60,-70,120,70,'#7a4a24',dk,4)}${P('M-64 -70Q0 -104 64 -70Z',holz,dk,4)}${L('M-30 -88V0M30 -88V0',ei,6)}${R(-9,-60,18,16,gold,'#8a6a10',2)}${E(74,-14,14,14,'#3a6ab0','#1a3a6a',2)}${L('M60 -24H88',gold,3)}`;
const schilde=()=>[[-60,'#3a6ab0',0],[0,rot,1],[60,'#e8c050',2]].map(([x,c,k])=>C(x,0,32,c,dk,4)+[L(`M${x-32} 0H${x+32}M${x} -32V32`,ws,5),L(`M${x} 0m-22 0a22 22 0 1 1 22 22a12 12 0 1 1 -12 -12`,ws,4),C(x,0,22,'none',ws,4)+C(x,0,13,'none',dk,3)][k]+C(x,0,8,gold,dk,2)).join('');
const teppich=()=>`${L('M-82 -72H82',holz,7)}${R(-70,-70,140,140,'#a83a2a','#5a1a10',3)}${R(-62,-62,124,124,'none',gold,3)}${C(30,-28,14,gold)}${P('M-46 12Q-20 30 20 30Q40 30 50 12Q20 20 -46 12Z',holz)}${L('M-6 22V-30',dk,3)}${P('M-24 -26H12L14 6H-26Z',ws)}${L('M-56 46Q-44 38 -32 46T-8 46T16 46T40 46T56 46','#7ab8e0',4)}${L('M-60 70v12M-40 70v12M-20 70v12M0 70v12M20 70v12M40 70v12M60 70v12',gold,3)}`;
const webstuhl=()=>{let w='';for(let i=0;i<9;i++)w+=`M${-40+i*10} -146V-42`;return`${sch(70)}${L('M-62 0L-50 -224M62 0L50 -224',holz,8)}${L('M-64 -216H64',dk,8)}${[0,1,2,3,4].map(k=>R(-46,-208+k*12,92,12,['#c83a2a','#e8c050','#3a6ab0','#e8c050','#c83a2a'][k])).join('')}${L(w,'#e8dcc0',2)}${L('M-52 -86H52',dk,4)}${[...Array(9)].map((_,i)=>E(-40+i*10,-34,5,7,stein,sd,1.5)).join('')}`;};
const fellbank=()=>`${sch(90)}${L('M-76 0V-40M76 0V-40',dk,8)}${R(-90,-50,180,14,holz,dk,3)}${P('M-72 -50Q-62 -80 -20 -74Q20 -84 62 -72Q78 -62 72 -48Z',fell,'#7a5a30',3)}${L('M-50 -64l6 -6M-20 -70l6 -6M14 -72l6 -6M44 -66l6 -6','#7a5a30',3)}${P('M60 -50Q80 -40 76 -20L64 -22Q66 -36 52 -44Z',fell,'#7a5a30',2)}`;
const feuer=()=>`${C(0,-40,120,'url(#licht)')}${L('M-60 0L0 -156L60 0',dk,5)}${L('M0 -156V-98',ei,3)}${P('M-30 -98Q-34 -62 0 -58Q34 -62 30 -98Z','#3a3a40','#111',3)}${L('M-12 -110q-8 -14 0 -26M12 -110q-8 -14 0 -26','rgba(255,255,255,.6)',3)}${P('M-40 -8Q-30 -40 -14 -46Q-10 -30 0 -54Q10 -34 16 -46Q34 -36 40 -8Z','#ff7a20')}${P('M-22 -8Q-14 -26 0 -34Q14 -26 22 -8Z','#ffd060')}${[-70,-42,-14,14,42,70].map((x,k)=>E(x,-4+(k%2)*3,16,10,k%2?stein:'#7a7a74',sd,2)).join('')}`;
const jahreskreis=()=>`${L('M0 -62V-80',dk,4)}${C(0,0,62,'#c89a60',dk,5)}${L('M0 -58V58M-58 0H58','#6a4020',3)}${C(0,0,16,gold,dk,2)}${C(-30,-30,9,gold)}${L('M-30 -44V-16M-44 -30H-16',gold,2)}${L('M30 -42V-18M20 -36L40 -24M20 -24L40 -36','#5aa0d8',3)}${P('M-42 36Q-30 14 -18 26Q-26 42 -42 36Z','#6a9a3a')}${[0,72,144,216,288].map(a=>C(30+9*Math.sin(a*Math.PI/180),30-9*Math.cos(a*Math.PI/180),5,'#e85a8a')).join('')}${C(30,30,4,gold)}`;
const kruege=()=>`${sch(80)}${[[-46,1,'#b8683a'],[4,1.25,'#a8582a'],[52,.9,'#c07848']].map(([x,s,c])=>P(`M${x-16*s} 0Q${x-34*s} ${-40*s} ${x-14*s} ${-70*s}H${x+14*s}Q${x+34*s} ${-40*s} ${x+16*s} 0Z`,c,'#5a2a10',3)+E(x,-70*s,16*s,5*s,'#e8dcc0','#5a2a10',2)+L(`M${x-18*s} ${-40*s}H${x+18*s}`,'#5a2a10',2)).join('')}`;
const muehle=()=>`${sch(70)}${R(-50,-40,100,40,holz,dk,3)}${R(-42,-64,84,22,stein,sd,3)}${E(0,-64,42,9,'#9a9a94',sd,3)}${C(0,-64,6,sd)}${L('M24 -66L28 -100',dk,6)}${P('M58 0Q50 -36 66 -46Q80 -40 84 -46Q96 -30 88 0Z','#e8dcc0','#8a7a60',2)}${L('M64 -40l8 6l8 -6','#8a7a60',2)}`;
const werkbrett=()=>`${R(-86,-58,172,116,'#7a5030',dk,4)}${L('M-62 -40L-40 34M-40 -40L-62 34',ei,6)}${C(-51,-4,4,ed)}${R(-6,-36,8,70,holz)}${R(-20,-46,36,18,ei,ed,2)}${R(46,-40,10,56,'#a8aeb8',ed,1.5)}${R(46,16,10,22,holz)}${C(-51,-50,3,dk)}${C(-2,-52,3,dk)}${C(51,-48,3,dk)}`;
const schmuck=()=>`${R(-80,-56,160,112,'#2a3a5a','#141c30',4)}${[-48,-8].map(x=>E(x,-14,18,24,gold,'#8a6a10',3)+E(x,-14,9,13,'none','#8a6a10',2)+C(x,-14,3,'#c8402a')).join('')}${C(44,-24,14,'none','#d8dce4',5)}${L('M-60 30Q0 56 60 30','#8a6a10',2)}${[-48,-30,-12,6,24,42].map((x,k)=>C(x,36+Math.abs(x)*-.1+(k%2?6:0)*0,6,['#e8902a','#3a8ad0','#40a060'][k%3])).join('')}`;
const esse=()=>`${C(0,-110,130,'url(#licht)')}${sch(100)}${P('M-70 -150L-30 -250H30L70 -150Z','#5a4a40',sd,4)}${R(-90,-100,180,100,stein,sd,4)}${L('M-90 -66H90M-90 -34H90M-40 -100V-66M30 -100V-66M-10 -66V-34M60 -66V-34M-60 -34V0M20 -34V0','#5a5a56',3)}${R(-80,-112,160,14,'#3a2a20',sd,3)}${E(0,-114,68,10,'#ff7a20')}${E(0,-116,38,6,'#ffd060')}${P('M90 -70L150 -96Q160 -70 150 -44Z','#8a5a30',dk,3)}${L('M98 -66L148 -92M98 -60L150 -60M98 -54L148 -48','#5a3418',2)}${L('M150 -70H170',dk,6)}`;
const amboss=()=>`${sch(52)}${R(-40,-70,80,70,'#7a5030',dk,4)}${E(0,-70,40,7,'#a07040',dk,2)}${L('M-24 -50V-10M10 -56V-16','#5a3418',2)}${P('M-26 -72L-20 -86H-50Q-62 -96 -42 -104H52V-86H22L28 -72Z',ei,ed,3)}${R(-8,-112,30,7,'#ff8a3a')}${C(7,-108,14,'url(#licht)')}`;
const trog=()=>`${sch(84)}${P('M-80 -60L-70 0H70L80 -60Z',holz,dk,4)}${L('M-76 -30H76',dk,3)}${E(0,-60,76,8,'#5a9ac8','#2a5a7a',2)}${L('M-30 -72q-10 -14 0 -28M0 -72q-10 -14 0 -28M30 -72q-10 -14 0 -28','rgba(255,255,255,.55)',4)}`;
const mtafel=()=>`${R(-82,-60,164,120,'#c8a878','#5a3a1c',4)}${R(-64,-46,52,40,'#8a8e98',ed,2)}${R(12,-46,52,40,'#c87a3a','#6a3a10',2)}${R(-64,8,52,40,'#d8dce4','#6a6e78',2)}${R(12,8,52,40,gold,'#8a6a10',2)}${L('M-56 -38l14 0M20 -38l14 0M-56 16l14 0M20 16l14 0','rgba(255,255,255,.7)',3)}`;
const kohle=()=>`${sch(56)}${P('M-50 0L-58 -60H58L50 0Z','#a07a40','#5a3a1c',3)}${L('M-56 -40H56M-53 -20H53M-30 -60L-26 0M0 -60V0M30 -60L26 0','#7a5a28',2)}${[...Array(14)].map((_,k)=>C(-46+(k%7)*15,-64-(k>6?12:0)+(k%3)*2,8,k%4?'#1a1a1a':'#3a3434')).join('')}`;
const waage=()=>`${sch(40)}${R(-30,-8,60,8,dk)}${L('M0 -4V-124',dk,5)}${L('M-62 -118H62',gold,4)}${C(0,-122,5,gold)}${L('M-62 -118L-80 -64M-62 -118L-44 -64M62 -118L44 -70M62 -118L80 -70','#8a6a10',1.5)}${P('M-84 -64Q-62 -48 -40 -64Z',gold,'#8a6a10',2)}${P('M40 -70Q62 -54 84 -70Z',gold,'#8a6a10',2)}${R(-70,-74,10,10,ei)}${R(-56,-72,8,8,ei)}${C(62,-76,7,'#d8dce4','#6a6e78',2)}`;
const eule=()=>`${L('M-80 40H80',dk,8)}${P('M-22 -36L-26 -54L-10 -40ZM22 -36L26 -54L10 -40Z','#6a4a30')}${E(0,0,30,40,'#8a6a4a','#3a2a1a',3)}${E(0,12,18,22,'#c8a878')}${L('M-8 4l4 4l4 -4l4 4M-8 16l4 4l4 -4l4 4','#8a6a4a',2)}${C(-12,-16,11,'#f4e8c8','#3a2a1a',2)}${C(12,-16,11,'#f4e8c8','#3a2a1a',2)}${C(-12,-16,5,'#1a1a1a')}${C(12,-16,5,'#1a1a1a')}${P('M-4 -6L0 2L4 -6Z',gold)}${L('M-8 38v6M8 38v6',gold,3)}`;
const mond=()=>`${C(0,0,90,'url(#licht)')}${C(0,0,46,'#f4f0d0')}${C(-14,-12,9,'#e2dcb0')}${C(16,8,12,'#e2dcb0')}${C(-6,22,6,'#e2dcb0')}`;
const runenstein=()=>`${sch(90)}${P('M-70 0L-82 -150Q-72 -250 0 -262Q68 -250 78 -150L70 0Z',stein,sd,5)}${P('M-60 -20Q-40 -60 -64 -120','none','#9a9a94',6)}${L('M-46 -14Q-62 -150 0 -224Q58 -150 44 -14',rot,12)}${[[0,-196,0],[-14,-160,3],[14,-130,5],[-12,-100,2],[10,-70,7],[-6,-40,1]].map(([x,y,k])=>rn(x,y,k,1.3,'#2a2a28',3)).join('')}${E(-50,-6,24,8,'#3a6a3a')}${E(54,-4,20,7,'#3a6a3a')}`;
const rentier=()=>`${sch(70)}${L('M-40 -60V0M-20 -60V-2M30 -60V0M48 -60V-2','#6a4a30',7)}${E(0,-80,62,28,'#8a6a4a','#3a2a1a',3)}${E(-30,-74,22,16,'#e8dcc0')}${P('M-46 -96L-70 -140L-54 -146L-34 -100Z','#8a6a4a','#3a2a1a',3)}${E(-74,-146,20,11,'#8a6a4a','#3a2a1a',3)}${C(-92,-146,4,'#2a1a1a')}${C(-74,-150,2.5,'#111')}${L('M-66 -156L-56 -196M-60 -176L-44 -184M-58 -192L-40 -204M-76 -156L-92 -192M-86 -176L-104 -180M-90 -190L-104 -206','#d8c8a0',4)}${L('M60 -88l10 -6','#e8dcc0',6)}`;
const beutel=()=>`${sch(60)}${P('M-30 0Q-48 -40 -20 -60H20Q48 -40 30 0Z','#8a5a30',dk,3)}${L('M-22 -58Q0 -48 22 -58',gold,4)}${P('M-20 -60L-28 -76M20 -60L28 -76','none',dk,3)}${[[44,-8,0],[64,-4,2],[-50,-6,4]].map(([x,y,k])=>E(x,y,13,9,'#c8c4ba',sd,2)+rn(x,y,k,.6,rot,3)).join('')}`;
const rtafel=()=>`${L('M-110 -78H110','#2a3a2a',8)}${L('M-60 -78V-50M60 -78V-50','#c8a060',3)}${R(-90,-50,180,100,'#a07a4a',dk,4)}${[0,1,2,3,4,5,6,7].map(k=>rn(-70+k*20,-22,k,1.1,'#2a1a0a',3)+rn(-70+k*20,22,7-k,1.1,'#2a1a0a',3)).join('')}${L('M-80 0H80','#6a4a2a',2)}`;
const sternplatte=()=>`${sch(84)}${P('M-80 0L-70 -32H70L80 0Z','#5a5a62',sd,3)}${R(-80,-2,160,8,'#44444a')}${L('M-50 -14L-30 -22L-6 -18L14 -24L30 -12L56 -16L48 -26','#d8e8ff',1.5)}${[[-50,-14],[-30,-22],[-6,-18],[14,-24],[30,-12],[56,-16],[48,-26]].map(([x,y])=>C(x,y,3,'#fff6c0')).join('')}`;
const steinkreis=()=>`${sch(90)}${[5,6,7,4,0,3,1,2].map(k=>{const a=k*Math.PI/4;return P(`M${Math.cos(a)*70-10} ${Math.sin(a)*16-2}V${Math.sin(a)*16-30-k%3*8}Q${Math.cos(a)*70} ${Math.sin(a)*16-40-k%3*8} ${Math.cos(a)*70+10} ${Math.sin(a)*16-30-k%3*8}V${Math.sin(a)*16-2}Z`,k%2?stein:'#9a9a90',sd,2);}).join('')}${L('M-20 -2l-4 -10M0 0l2 -12M20 -2l6 -10','#3a7a4a',3)}`;
const fahne=()=>`${L('M0 -76V90',dk,6)}${P('M4 -70H66Q66 -30 4 -20Z',gold,'#8a6a10',3)}${C(24,-52,4,'#8a6a10')}${C(44,-52,4,'#8a6a10')}${L('M20 -26l-2 12M36 -32l-2 12M52 -42l-2 12','#8a6a10',3)}${L('M6 -70Q10 -94 30 -90Q40 -84 34 -76',gold,5)}`;
const schwarm=()=>[[-60,-20,2.4],[0,-44,2.8],[58,-10,2.2],[22,26,2],[-38,32,1.8]].map(([x,y,s])=>L(`M${x-14*s} ${y}q${7*s} ${-9*s} ${14*s} 0q${7*s} ${-9*s} ${14*s} 0`,'#fff',8)+mw(x,y,s)).join('');
const ruder=()=>`${sch(100)}${R(-70,-14,20,14,'#6a4020')}${R(50,-14,20,14,'#6a4020')}${[0,1,2,3].map(k=>L(`M-100 ${-18-k*14}L70 ${-24-k*14}`,fell,7)+P(`M68 ${-32-k*14}L106 ${-34-k*14}Q112 ${-24-k*14} 106 ${-16-k*14}L68 ${-18-k*14}Z`,'#a07040',dk,2)).join('')}`;
const proviant=()=>`${sch(64)}${P('M-60 -50Q-56 0 0 0Q56 0 60 -50Z','#c8a060','#6a4a20',3)}${L('M-56 -30Q0 -14 56 -30M-40 -50V-6M0 -50V0M40 -50V-6','#8a6a30',2)}${E(-26,-56,26,12,'#c8884a','#7a4a20',2)}${L('M-40 -60l6 -4M-26 -62l6 -4M-12 -60l6 -4','#7a4a20',2)}${C(18,-56,10,'#d0302a')}${C(38,-54,9,'#e04a2a')}${P('M46 -70Q72 -78 82 -60Q70 -44 46 -50Z','#a8c0d0','#4a6a80',2)}`;
const sonnenstein=()=>`${sch(50)}${C(0,-56,46,'url(#licht)')}${R(-40,-40,80,40,'#7a4a24',dk,3)}${P('M-40 -40L-34 -70H34L40 -40Z','#5a3418',dk,2)}${R(-30,-40,60,8,'#c83a2a')}${P('M-14 -50L0 -76L14 -50L0 -40Z','rgba(220,240,255,.9)','#6a8ab8',2)}${L('M0 -88V-96M-18 -78l-6 -6M18 -78l6 -6','#fff6c0',3)}`;
const seekarte=()=>`${R(-88,-62,176,124,'#f0e0b8','#8a6a3a',4)}${R(-78,-52,156,104,'#a8d0e8')}${P('M30 52L24 10L40 -20L50 -52H78V52Z','#7aa860','#4a6a30',2)}${E(-50,-22,22,12,'#7aa860','#4a6a30',2)}${C(-6,-36,5,'#7aa860')}<path d="M30 14Q0 0 -6 -30Q-20 -30 -40 -16" fill="none" stroke="#c8402a" stroke-width="3" stroke-dasharray="6 6"/>${U('wkschiff',-24,16,30,'#5a3418')}${L('M-62 36V14M-73 25H-51','#5a3418',2)}`;
const anker=()=>`${sch(54)}${L('M0 -138V-10',ei,8)}${L('M-44 -36Q0 12 44 -36',ei,8)}${P('M-52 -44L-40 -30L-56 -26Z',ei)}${P('M52 -44L40 -30L56 -26Z',ei)}${C(0,-150,12,'none',ei,6)}${L('M-26 -118H26',holz,9)}${L('M10 -150Q40 -120 30 -80Q24 -40 60 -10',fell,4)}`;
const muscheln=()=>`${sch(70)}${E(0,-10,66,14,'#e8d4a8')}${[[-40,-16,'#f4d8c8'],[-6,-24,'#fff0e0'],[30,-14,'#f0c0a8']].map(([x,y,c])=>P(`M${x-18} ${y}Q${x} ${y-34} ${x+18} ${y}Z`,c,'#a07a5a',2)+L(`M${x} ${y}V${y-22}M${x} ${y}L${x-10} ${y-18}M${x} ${y}L${x+10} ${y-18}`,'#a07a5a',1.5)).join('')}${C(56,-16,10,'#c8a87a','#7a5a3a',2)}${L('M56 -16m-5 0a5 5 0 1 1 5 5','#7a5a3a',2)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#1a2a3a" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#1a2a3a" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #wkh1,.tuer.offen #wkh2,.tuer.offen #wkd{transform:scaleX(.14)}.tuer.offen #wks{transform:translateX(184px)}.tuer.offen #wkt1{transform:translateX(-94px)}.tuer.offen #wkt2{transform:translateX(94px)}.tuer.offen #wkg{opacity:1}.tuer.offen #wkp{transform:scaleY(.07)}.tuer.offen #wkr{opacity:0}</style>`;
function tuerHafen(n){
const fl=x=>{let s='';for(let k=0;k<5;k++)s+=P(`M${x+k*18} 470V206L${x+k*18+9} 190L${x+k*18+18} 206V470Z`,k%2?'#9a6a3a':holz,dk,2);return s+L(`M${x+4} 250H${x+86}M${x+4} 420H${x+86}`,dk,8);};
return`${R(410,170,180,300,'#cfe2ee')}${P('M410 330Q470 300 590 320V470H410Z','#7aa860')}${P('M486 470L500 340L514 470Z','#c8b088')}${R(430,286,56,44,holz,dk,2)}${P('M420 290L458 252L496 290Z','#5a8a3a')}${R(522,294,52,36,'#9a6a3a',dk,2)}${P('M514 298L548 266L582 298Z','#6a9a40')}${R(370,150,40,320,'#7a4a24',dk,4)}${R(590,150,40,320,'#7a4a24',dk,4)}${P('M370 150L390 124L410 150Z','#7a4a24',dk,3)}${P('M590 150L610 124L630 150Z','#7a4a24',dk,3)}${R(360,150,280,26,'#6a4020',dk,4)}${C(500,116,28,'#6a4020',dk,3)}${U('wkschiff',478,94,44,gold)}
   <g id="wkh1" class="tb" style="transform-origin:410px 330px">${fl(410)}</g>
   <g id="wkh2" class="tb" style="transform-origin:590px 330px">${fl(500)}</g>
   <g class="tb pl">${sPl(n,340)}</g>`;
}
function tuerDrache(n){
let b='';for(let k=1;k<6;k++)b+=`M${410+k*30} 190V470`;
return`${R(380,160,240,310,'#5a3418',dk,5)}${R(410,190,180,280,'#2a140a')}${C(500,400,150,'url(#licht)')}${E(500,440,60,16,'#ff8a3a')}${E(500,440,30,8,'#ffd060')}${R(366,150,268,30,'#7a4a24',dk,4)}${L('M384 165Q404 155 424 165T464 165T504 165T544 165T584 165T616 165',gold,3)}${L('M378 160Q350 120 384 96Q414 80 424 104Q426 118 410 120',holz,12)}${L('M622 160Q650 120 616 96Q586 80 576 104Q574 118 590 120',holz,12)}${C(398,102,4,gold)}${C(602,102,4,gold)}${P('M424 104L442 98L428 112Z',holz)}${P('M576 104L558 98L572 112Z',holz)}
   <g id="wkd" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#8a5a2c',dk,4)}${L(b,'#5a3418',3)}${L('M410 300H520Q540 300 540 286M410 430H520Q540 430 540 444',ed,7)}${L('M468 272Q474 222 508 222Q530 224 528 246Q520 240 512 246',gold,5)}${C(506,234,3,gold)}${C(566,370,14,'none',ed,5)}${C(566,356,4,ed)}</g>
   <g class="tb pl">${sPl(n,350)}</g>`;
}
function tuerTor(n){
return`${R(380,160,240,310,'#5a4a40',sd,5)}${R(410,190,180,280,'#0e1830')}${[[430,210],[470,240],[560,220],[530,262],[450,282]].map(([x,y])=>C(x,y,2.5,'#fff6c8')).join('')}${L('M410 250Q470 220 520 250T590 240','rgba(90,255,170,.5)',14)}${P('M410 470V380Q500 330 590 380V470Z','#16302a')}${P('M486 400L490 344Q500 334 510 344L514 400Z',stein,sd,2)}${R(392,172,216,14,ei,ed,2)}${R(600,160,12,310,'#4a3e34')}
   <g id="wks" class="tb">${R(410,190,180,280,'#6a4426',dk,4)}${L('M440 190V470M470 190V470M500 190V470M530 190V470M560 190V470','#4a2c14',3)}${L('M410 240H590M410 420H590',ed,8)}${L('M420 410L580 250',ed,7)}${C(430,186,7,ed)}${C(570,186,7,ed)}${R(420,310,10,40,ed)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerStein(n){
const h=s=>P(s<0?'M410 470L404 222L420 196H500V470Z':'M500 470V196H580L596 222L590 470Z',stein,sd,4)+L(s<0?'M500 262A68 68 0 0 0 500 398':'M500 262A68 68 0 0 1 500 398',rot,8)+rn(s<0?452:548,330,s<0?0:3,1.8,'#2a2a28',3)+rn(s<0?440:560,236,s<0?5:4,1.3,'#2a2a28',3)+rn(s<0?440:560,432,s<0?6:2,1.3,'#2a2a28',3);
return`${P('M350 470Q350 120 500 110Q650 120 650 470Z','#2a4a3a','#10201a',4)}${R(410,196,180,274,'#ffc8a0')}${C(500,350,30,'#fff0a0')}${R(410,360,180,110,'#4a6a9a')}${R(410,444,180,26,'#e8d0a0')}${R(370,150,260,46,'#7a7a74',sd,4)}${[440,500,560].map((x,k)=>rn(x,173,k+1,1.3,'#9affd0',3)).join('')}
   <g id="wkg" class="tb" opacity="0">${C(500,330,170,'url(#licht)')}</g>
   <g id="wkt1" class="tb">${h(-1)}</g><g id="wkt2" class="tb">${h(1)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerPlanke(n){
let s='';for(let k=1;k<4;k++)s+=`M420 ${200+k*68}H580`;
return`${L('M500 380V170',dk,6)}${R(440,180,120,110,ws,'#8a6a3a',2)}${R(464,180,24,110,rot)}${R(512,180,24,110,rot)}${L('M430 180H570',dk,5)}${P('M350 420Q500 470 650 420L660 356Q500 400 340 356Z',holz,dk,4)}${L('M350 390Q500 432 650 390',dk,3)}${L('M344 358Q326 300 350 276Q366 266 374 282',holz,11)}${C(352,282,3,gold)}${R(372,250,24,220,'#6a4020',dk,3)}${R(604,250,24,220,'#6a4020',dk,3)}
   <g id="wkr" class="tb">${L('M384 262Q500 304 616 262',fell,6)}</g>
   <g id="wkp" class="tb" style="transform-origin:500px 470px">${R(420,200,160,270,'#a0703e',dk,4)}${L(s,'#6a4020',5)}${L('M450 200V470M550 200V470','#7a4a24',2)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'hafentor';
const arten={hafentor:[tuerHafen,'Hafentor zum Dorf mit Zahlenschloss'],drachentuer:[tuerDrache,'Holztür mit Drachenkopf und Zahlenschloss'],schiebetor:[tuerTor,'Schiebetor der Schmiede mit Zahlenschloss'],steintor:[tuerStein,'Steintor mit Runen und Zahlenschloss'],planke:[tuerPlanke,'Laufplanke zum Drachenboot mit Zahlenschloss']};
const a=arten[art]||arten.hafentor;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const kind=(x,y,c,h,hc)=>`${L(`M${x-6} ${y}V${y-24}M${x+6} ${y}V${y-24}`,'#5a3a1c',7)}${P(`M${x-16} ${y-20}L${x-12} ${y-62}H${x+12}L${x+16} ${y-20}Z`,c)}${L(`M${x-14} ${y-40}H${x+14}`,gold,3)}${L(`M${x-12} ${y-56}L${x-20} ${y-30}`,c,7)}<g class="wkwi" style="transform-origin:${x+11}px ${y-56}px">${L(`M${x+11} ${y-56}L${x+26} ${y-90}`,c,7)}${C(x+27,y-92,5,h)}</g>${C(x,y-74,12,h)}${P(`M${x-13} ${y-74}Q${x-12} ${y-94} ${x} ${y-90}Q${x+12} ${y-94} ${x+13} ${y-74}Q${x} ${y-84} ${x-13} ${y-74}Z`,hc)}`;
SZENARIEN.wikingerdorf={
name:"Das Wikingerdorf",
symbole:["wkschiff","wkrune","wkwelle","wkmoewe","wksonne"],
symbolNamen:["Schiff","Rune","Welle","Möwe","Sonne"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="98" cy="20" r="11" fill="#f6c84a"/><path d="M58 64V12" stroke="#3a2410" stroke-width="3"/><path d="M38 16H78L82 58H34Z" fill="#f4f0e6" stroke="#5a1a10" stroke-width="2"/><path d="M46 16H54V58H44ZM62 16H70L74 58H64Z" fill="#b8402a"/><path d="M6 56Q30 80 60 80Q90 80 114 56Q90 66 60 66Q30 66 6 56Z" fill="#8a5a30" stroke="#3a2410" stroke-width="3"/><path d="M8 58Q0 40 10 30Q18 24 22 32" fill="none" stroke="#8a5a30" stroke-width="5" stroke-linecap="round"/><path d="M112 58Q120 44 112 36" fill="none" stroke="#8a5a30" stroke-width="5" stroke-linecap="round"/><path d="M0 86Q15 80 30 86T60 86T90 86T120 86" fill="none" stroke="#4a8ac8" stroke-width="4"/></svg>`,
texte:{
einleitung:"Willkommen im Wikingerdorf am Fjord! Hier leben Wikingerfrauen und Wikinger als Händlerinnen und Händler, als Handwerkerinnen und Handwerker und als Seefahrerinnen und Seefahrer. Ihr dürft den Hafen, das Langhaus, die Schmiede, den Runenstein und das Drachenboot erkunden. Die Dorfälteste hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, darf am Ende mit dem Drachenboot in See stechen. Schafft ihr es?",
startKnopf:"Los geht&rsquo;s",
hinweisGeber:"Die Dorfälteste flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Dorfälteste schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeritzt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Flut kommt!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und das Wikingerdorf trotzdem noch ganz erkunden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Bei Sonnenaufgang sticht das Drachenboot in See, und die Kinder des Dorfes winken vom Ufer. Die Dorfälteste ist stolz auf euch – ihr seid echte Entdeckerinnen und Entdecker!"
},
texteDu:{
einleitung:"Willkommen im Wikingerdorf am Fjord! Hier leben Wikingerfrauen und Wikinger als Händlerinnen und Händler, als Handwerkerinnen und Handwerker und als Seefahrerinnen und Seefahrer. Du darfst den Hafen, das Langhaus, die Schmiede, den Runenstein und das Drachenboot erkunden. Die Dorfälteste hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, darf am Ende mit dem Drachenboot in See stechen. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Dorfälteste schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeritzt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und das Wikingerdorf trotzdem noch ganz erkunden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Bei Sonnenaufgang sticht das Drachenboot in See, und die Kinder des Dorfes winken vom Ufer. Die Dorfälteste ist stolz auf dich – du bist eine echte Entdeckerin oder ein echter Entdecker!"
},
einfach:{
name:"Das Wikingerdorf",
symbolNamen:["Schiff","Rune","Welle","Möwe","Sonne"],
texte:{
einleitung:"Ihr besucht ein Dorf der Wikinger. Ihr seht fünf Orte: den Hafen, das lange Haus, die Schmiede, den Stein mit Zeichen und das große Boot. Die älteste Frau im Dorf hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende fahrt ihr mit dem Boot auf das Meer. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Boot fährt auf das Meer. Die Kinder winken euch zu!"
},
texteDu:{
einleitung:"Du besuchst ein Dorf der Wikinger. Du siehst fünf Orte: den Hafen, das lange Haus, die Schmiede, den Stein mit Zeichen und das große Boot. Die älteste Frau im Dorf hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende fährst du mit dem Boot auf das Meer. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Boot fährt auf das Meer. Die Kinder winken dir zu!"
},
raeume:[
{titel:"Der Hafen",intro:"Es ist früh am Morgen. Am Steg liegen Boote. Möwen fliegen über dem Wasser. Das Tor zum Dorf ist zu. Findet die Zahlen!",introDu:"Es ist früh am Morgen. Am Steg liegen Boote. Möwen fliegen über dem Wasser. Das Tor zum Dorf ist zu. Finde die Zahlen!",
objekte:[{name:"Fischer-Netz",fund:"Am Netz hängt:"},{name:"Möwe",fund:"Bei der Möwe liegt:"},{name:"Fischer-Boot",fund:"Im Boot liegt:"},{name:"Fisch-Fass",fund:"Am Fass klebt:"},{name:"Fisch-Korb",fund:"Im Korb liegt:"}],
infoObjekte:[{name:"Waren-Tafel",fund:"An der Tafel klebt:"},{name:"Seil-Rolle",fund:"Im Seil liegt:"},{name:"Waren-Kiste",fund:"In der Kiste liegt:"}]},
{titel:"Das Langhaus",intro:"Das Haus ist aus Holz. In der Mitte brennt ein Feuer. Viele Menschen wohnen hier zusammen. Die Tür ist zu.",
objekte:[{name:"Zier-Schilde",fund:"Am Schild klebt:"},{name:"Wand-Teppich",fund:"Am Teppich klebt:"},{name:"Web-Stuhl",fund:"Am Web-Stuhl hängt:"},{name:"Fell-Bank",fund:"Unter dem Fell liegt:"},{name:"Feuer-Stelle",fund:"Am Kessel klebt:"}],
infoObjekte:[{name:"Jahres-Scheibe",fund:"An der Scheibe klebt:"},{name:"Ton-Krüge",fund:"Im Krug liegt:"},{name:"Mühl-Stein",fund:"Am Stein klebt:"}]},
{titel:"Die Schmiede",intro:"Hier ist es warm. Das Feuer glüht hell. Hier macht die Schmiedin Schmuck und Werkzeug. Das Tor ist zu.",
objekte:[{name:"Werkzeug-Brett",fund:"Am Brett hängt:"},{name:"Schmuck-Brett",fund:"Am Brett klebt:"},{name:"Esse",fund:"An der Esse klebt:"},{name:"Amboss",fund:"Am Amboss liegt:"},{name:"Wasser-Trog",fund:"Am Trog klebt:"}],
infoObjekte:[{name:"Metall-Tafel",fund:"An der Tafel klebt:"},{name:"Kohlen-Korb",fund:"Im Korb liegt:"},{name:"Waage",fund:"Auf der Waage liegt:"}]},
{titel:"Der Runenstein",intro:"Es ist Nacht. Am Himmel leuchten Sterne und grüne Lichter. Hier steht ein großer Stein mit Zeichen. Das Stein-Tor ist zu.",
objekte:[{name:"Eule",fund:"Bei der Eule liegt:"},{name:"Mond",fund:"Am Mond klebt:"},{name:"Runen-Stein",fund:"Am Stein klebt:"},{name:"Rentier",fund:"Beim Rentier liegt:"},{name:"Runen-Beutel",fund:"Im Beutel liegt:"}],
infoObjekte:[{name:"Runen-Tafel",fund:"An der Tafel klebt:"},{name:"Stern-Platte",fund:"Auf der Platte liegt:"},{name:"Stein-Kreis",fund:"Im Kreis liegt:"}]},
{titel:"Das Drachenboot",intro:"Die Sonne geht auf. Das große Boot liegt am Strand. Das Brett zum Boot ist oben. Öffnet das letzte Schloss!",introDu:"Die Sonne geht auf. Das große Boot liegt am Strand. Das Brett zum Boot ist oben. Öffne das letzte Schloss!",
objekte:[{name:"Wetter-Fahne",fund:"An der Fahne klebt:"},{name:"Möwen-Schwarm",fund:"Bei den Möwen liegt:"},{name:"Ruder",fund:"Unter den Rudern liegt:"},{name:"Essens-Korb",fund:"Im Korb liegt:"},{name:"Sonnen-Stein",fund:"Im Kästchen liegt:"}],
infoObjekte:[{name:"See-Karte",fund:"An der Karte klebt:"},{name:"Anker",fund:"Am Anker klebt:"},{name:"Muscheln",fund:"Bei den Muscheln liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Hafen am Fjord",
intro:"Morgennebel liegt über dem Fjord. Am Holzsteg schaukeln die Fischerboote, und Möwen kreischen über den Netzen. Händlerinnen und Händler bringen Waren aus fernen Ländern. Das Hafentor zum Dorf ist noch verschlossen. Findet die Ziffern, um es zu öffnen!",
introDu:"Morgennebel liegt über dem Fjord. Am Holzsteg schaukeln die Fischerboote, und Möwen kreischen über den Netzen. Händlerinnen und Händler bringen Waren aus fernen Ländern. Das Hafentor zum Dorf ist noch verschlossen. Finde die Ziffern, um es zu öffnen!",
tuerX:1250,tuerArt:"hafentor",
hintergrund:()=>`${defs('#a0703e','#6a4420','#fff4e0')}${verl('wkH','#b8cede','#f6e8d6')}${R(0,0,1600,470,'url(#wkH)')}${C(300,140,44,'#fff8e0')}${C(300,140,180,'url(#licht)')}${P('M0 330L120 150L260 240L420 110L600 300L700 330Z','#6a7e94')}${P('M380 150L420 110L460 150L430 140Z','#fff')}${P('M880 330L1060 160L1200 240L1380 100L1600 210V330Z','#5a6e86')}${P('M1340 140L1380 100L1420 140L1384 128Z','#fff')}${R(0,320,1600,150,'#4a6a84')}${L('M40 360q20 -8 40 0M300 390q20 -8 40 0M620 350q20 -8 40 0M820 400q20 -8 40 0M140 430q20 -8 40 0M960 440q20 -8 40 0','#8ab0c8',3)}${[[640,380],[880,350]].map(([x,y])=>P(`M${x-50} ${y}Q${x} ${y+30} ${x+50} ${y}Z`,'#6a4020')+L(`M${x} ${y}V${y-60}`,dk,3)+P(`M${x+2} ${y-58}L${x+30} ${y-30}L${x+2} ${y-12}Z`,ws)).join('')}${E(400,320,320,22,'rgba(255,255,255,.55)')}${E(1000,300,380,20,'rgba(255,255,255,.5)')}${E(700,360,260,14,'rgba(255,255,255,.45)')}${[[1080,190],[1180,170],[1420,190]].map(([x,y])=>P(`M${x-60} 260L${x} ${y}L${x+60} 260Z`,'#5a8a3a','#3a5a2a',3)).join('')}${[...Array(21)].map((_,k)=>P(`M${1000+k*24} 470V262L${1012+k*24} 244L${1024+k*24} 262V470Z`,k%2?'#9a6a3a':holz,dk,2)).join('')}${L('M1000 300H1504M1000 420H1504',dk,6)}${[80,200,520,760].map(x=>R(x,400,14,70,'#5a3a1c')).join('')}${mw(560,90,1.6)}${mw(640,130,1.2)}${mw(980,80,1.4)}${boden(0)}`,
objekte:[
{name:"Fischernetz",x:250,y:230,wand:true,by:-85,zeichne:netz,fund:"Im Fischernetz hängt:"},
{name:"Möwe auf dem Pfahl",x:650,y:240,wand:true,by:-60,zeichne:moewe,fund:"Bei der Möwe liegt:"},
{name:"Fischreuse",x:150,boden:700,fuss:4,by:-110,zeichne:reuse,fund:"In der Fischreuse liegt:"},
{name:"Fischerboot",x:450,boden:650,fuss:4,by:-210,zeichne:boot,fund:"Im Fischerboot liegt:"},
{name:"Heringsfass",x:850,boden:720,fuss:4,by:-150,zeichne:fass,fund:"Am Heringsfass klebt:"}
],
infoObjekte:[{name:"Handelstafel",x:1000,y:250,wand:true,by:-100,zeichne:htafel,fund:"An der Handelstafel klebt:"},{name:"Taurolle",x:1050,boden:600,fuss:4,by:-80,zeichne:taurolle,fund:"In der Taurolle steckt:"},{name:"Handelskiste",x:1450,boden:740,fuss:4,by:-115,zeichne:hkiste,fund:"In der Handelskiste liegt:"}]},
{titel:"Das Langhaus",
intro:"Im Langhaus knistert das Feuer in der Mitte. Rauch steigt durch die Öffnung im Dach, und auf den Bänken liegen warme Felle. Hier wohnen viele Familien zusammen. Die Holztür mit dem geschnitzten Drachenkopf ist verschlossen. Findet die Ziffern, um sie zu öffnen!",
introDu:"Im Langhaus knistert das Feuer in der Mitte. Rauch steigt durch die Öffnung im Dach, und auf den Bänken liegen warme Felle. Hier wohnen viele Familien zusammen. Die Holztür mit dem geschnitzten Drachenkopf ist verschlossen. Finde die Ziffern, um sie zu öffnen!",
tuerX:450,tuerArt:"drachentuer",
hintergrund:()=>`${defs('#6a4a2a','#3a2614','#ffa040')}${R(0,0,1600,470,'#4a2e16')}${L([...Array(40)].map((_,k)=>`M${k*40+20} 60V470`).join(''),'rgba(0,0,0,.25)',3)}${R(0,0,1600,60,'#2a1a0c')}${L('M0 60L200 0M300 60L500 0M700 60L900 0M1100 60L1300 0M1500 60L1600 30','#5a3418',14)}${R(0,52,1600,16,'#6a4020',dk,3)}${P('M940 0H1060L1140 470H860Z','rgba(255,240,200,.07)')}${L('M990 40q-14 -20 0 -40M1010 50q-14 -20 0 -40','rgba(200,200,200,.4)',6)}${C(1000,420,340,'url(#licht)')}${[220,660,1380].map(x=>R(x-18,60,36,410,'#6a4020',dk,3)+L(`M${x-10} 120q10 -10 20 0M${x-10} 140q10 -10 20 0`,gold,2)).join('')}${R(0,400,1600,34,'#6a4020',dk,3)}${R(0,434,1600,36,'#3a2410')}${[[60,'#6a9a3a'],[1520,'#9a7a3a']].map(([x,c])=>L(`M${x} 70V130M${x-12} 130l12 -40l12 40`,c,4)).join('')}${boden(1)}`,
objekte:[
{name:"Zierschilde",x:800,y:230,wand:true,by:-60,zeichne:schilde,fund:"Hinter den Zierschilden steckt:"},
{name:"Wandteppich",x:1250,y:220,wand:true,by:-100,zeichne:teppich,fund:"Am Wandteppich klebt:"},
{name:"Webstuhl",x:150,boden:700,fuss:4,by:-260,zeichne:webstuhl,fund:"Am Webstuhl hängt:"},
{name:"Fellbank",x:700,boden:720,fuss:4,by:-110,zeichne:fellbank,fund:"Unter dem Fell liegt:"},
{name:"Feuerstelle mit Kessel",x:1000,boden:600,fuss:4,by:-190,zeichne:feuer,fund:"Am Kessel klebt:"}
],
infoObjekte:[{name:"Jahreskreis-Scheibe",x:1480,y:240,wand:true,by:-100,zeichne:jahreskreis,fund:"An der Jahreskreis-Scheibe klebt:"},{name:"Vorratskrüge",x:1300,boden:720,fuss:4,by:-120,zeichne:kruege,fund:"In einem Vorratskrug liegt:"},{name:"Handmühle",x:1500,boden:600,fuss:4,by:-120,zeichne:muehle,fund:"An der Handmühle klebt:"}]},
{titel:"Die Schmiede",
intro:"In der Schmiede glüht die Esse, und der Blasebalg pustet Luft hinein. Hier fertigen die Schmiedin und der Schmied Spangen, Nadeln und Werkzeuge. Es riecht nach Holzkohle. Das schwere Schiebetor nach draußen ist noch zu. Findet die Ziffern, um es aufzuschieben!",
introDu:"In der Schmiede glüht die Esse, und der Blasebalg pustet Luft hinein. Hier fertigen die Schmiedin und der Schmied Spangen, Nadeln und Werkzeuge. Es riecht nach Holzkohle. Das schwere Schiebetor nach draußen ist noch zu. Finde die Ziffern, um es aufzuschieben!",
tuerX:800,tuerArt:"schiebetor",
hintergrund:()=>`${defs('#4a3a30','#1e1610','#ff8a3a')}${R(0,0,1600,470,'#3e322a')}${[...Array(180)].map((_,k)=>E((k%18)*90+(Math.floor(k/18)%2)*45,64+Math.floor(k/18)*40,42,18,['#4a3e34','#54463a','#463a30'][k%3],'#2a201a',2)).join('')}${R(0,0,1600,44,'#2a1e14')}${[100,500,900,1300].map(x=>L(`M${x} 44L${x+200} 0`,'#4a3424',12)).join('')}${R(1240,90,100,80,'#7ab0d8',dk,6)}${L('M1290 90V170M1240 130H1340',dk,4)}${P('M1240 170L1180 470H1400L1340 170Z','rgba(160,210,255,.06)')}${C(150,380,340,'url(#licht)')}${C(450,420,200,'url(#licht)')}${R(0,440,1600,30,'#2a201a')}${boden(2)}`,
objekte:[
{name:"Werkzeugbrett",x:250,y:230,wand:true,by:-78,zeichne:werkbrett,fund:"Am Werkzeugbrett hängt:"},
{name:"Schmuckbrett",x:1100,y:240,wand:true,by:-76,zeichne:schmuck,fund:"Am Schmuckbrett klebt:"},
{name:"Esse mit Blasebalg",x:150,boden:680,fuss:4,by:-275,zeichne:esse,fund:"Am Blasebalg klebt:"},
{name:"Amboss-Werkbank",x:450,boden:650,fuss:4,by:-135,zeichne:amboss,fund:"Neben dem Amboss liegt:"},
{name:"Wassertrog",x:1100,boden:720,fuss:4,by:-115,zeichne:trog,fund:"Am Wassertrog klebt:"}
],
infoObjekte:[{name:"Metalltafel",x:1480,y:250,wand:true,by:-80,zeichne:mtafel,fund:"An der Metalltafel klebt:"},{name:"Kohlenkorb",x:1300,boden:600,fuss:4,by:-100,zeichne:kohle,fund:"Im Kohlenkorb liegt:"},{name:"Händlerwaage",x:600,boden:740,fuss:4,by:-145,zeichne:waage,fund:"Auf der Händlerwaage liegt:"}]},
{titel:"Der Runenstein",
intro:"Auf dem Hügel ist es still. Über euch funkeln die Sterne, und grüne Nordlichter tanzen am Himmel. Der große Runenstein erzählt Geschichten aus alter Zeit. Das Steintor zum Strand ist fest verschlossen. Findet die Ziffern, damit es sich teilt!",
introDu:"Auf dem Hügel ist es still. Über dir funkeln die Sterne, und grüne Nordlichter tanzen am Himmel. Der große Runenstein erzählt Geschichten aus alter Zeit. Das Steintor zum Strand ist fest verschlossen. Finde die Ziffern, damit es sich teilt!",
tuerX:1300,tuerArt:"steintor",
hintergrund:()=>`${defs('#2a4a3a','#10201a','#9affd0')}${verl('wkN','#060a24','#1a3a5a')}${R(0,0,1600,470,'url(#wkN)')}${[...Array(60)].map((_,k)=>C((k*173+40)%1600,20+(k*67)%280,1+k%3,'#fff6d8')).join('')}${L('M0 120Q200 60 400 130T800 110T1200 140T1600 90','rgba(90,255,170,.32)',40)}${L('M0 170Q260 110 520 180T1000 150T1600 170','rgba(120,200,255,.22)',30)}${L('M100 90Q400 30 700 90T1400 60','rgba(180,120,255,.15)',20)}${P('M0 400Q300 300 700 360T1600 320V470H0Z','#16302a')}${P('M0 440Q500 380 900 420T1600 400V470H0Z','#1e3a30')}${[60,560,860,1520].map((x,k)=>birke(x,150+k%2*60)).join('')}${boden(3)}`,
objekte:[
{name:"Eule",x:300,y:200,wand:true,by:-70,zeichne:eule,fund:"Bei der Eule liegt:"},
{name:"Vollmond",x:750,y:170,wand:true,by:-65,zeichne:mond,fund:"Im Mondlicht schimmert:"},
{name:"Rentier",x:150,boden:700,fuss:4,by:-225,zeichne:rentier,fund:"Beim Rentier liegt:"},
{name:"Runenbeutel",x:550,boden:680,fuss:4,by:-100,zeichne:beutel,fund:"Im Runenbeutel liegt:"},
{name:"Großer Runenstein",x:1000,boden:600,fuss:4,by:-290,zeichne:runenstein,fund:"Am großen Runenstein klebt:"}
],
infoObjekte:[{name:"Runentafel",x:1050,y:260,wand:true,by:-100,zeichne:rtafel,fund:"An der Runentafel klebt:"},{name:"Sternenplatte",x:350,boden:600,fuss:4,by:-70,zeichne:sternplatte,fund:"Auf der Sternenplatte liegt:"},{name:"Steinkreis",x:1500,boden:740,fuss:4,by:-90,zeichne:steinkreis,fund:"Im Steinkreis liegt:"}]},
{titel:"Das Drachenboot",
intro:"Am Strand geht die Sonne auf. Das Drachenboot liegt bereit, das gestreifte Segel ist schon gesetzt. Die Seefahrerinnen und Seefahrer warten auf euch. Nur die Laufplanke ist noch hochgeklappt. Findet die Ziffern für das letzte Schloss!",
introDu:"Am Strand geht die Sonne auf. Das Drachenboot liegt bereit, das gestreifte Segel ist schon gesetzt. Die Seefahrerinnen und Seefahrer warten auf dich. Nur die Laufplanke ist noch hochgeklappt. Finde die Ziffern für das letzte Schloss!",
tuerX:600,tuerArt:"planke",
hintergrund:()=>`${defs('#f0d8a0','#c8a870','#ffd890')}${verl('wkS','#5a4a9a','#f49a80','#ffe0a0')}${R(0,0,1600,470,'url(#wkS)')}${C(1150,380,70,'#fff0a0')}${C(1150,380,320,'url(#licht)')}${[[300,90],[800,60],[1400,120]].map(([x,y])=>E(x,y,90,16,'rgba(255,220,230,.7)')+E(x+30,y-10,46,14,'rgba(255,230,240,.7)')).join('')}${P('M0 380L160 250L300 320L460 220L640 380Z','#7a6a9a')}${P('M1300 380L1440 270L1600 330V380Z','#6a5a8a')}${R(0,380,1600,90,'#4a6a9a')}${L('M1060 400H1240M1090 420H1210M1110 440H1190M1130 458H1170','#ffe8a0',4)}${L('M100 420q20 -8 40 0M400 450q20 -8 40 0M700 410q20 -8 40 0M1400 440q20 -8 40 0','#8ab0d8',3)}${dboot(260,410,.24)}${mw(900,150,1.6)}${mw(980,190,1.2)}${mw(420,120,1.3)}${boden(4)}`,
objekte:[
{name:"Wetterfahne",x:200,y:220,wand:true,by:-90,zeichne:fahne,fund:"An der Wetterfahne klebt:"},
{name:"Möwenschwarm",x:1000,y:180,wand:true,by:-75,zeichne:schwarm,fund:"Eine Möwe lässt fallen:"},
{name:"Ruderstapel",x:300,boden:700,fuss:4,by:-100,zeichne:ruder,fund:"Unter dem Ruderstapel liegt:"},
{name:"Proviantkorb",x:950,boden:640,fuss:4,by:-100,zeichne:proviant,fund:"Im Proviantkorb liegt:"},
{name:"Sonnenstein-Kästchen",x:1250,boden:700,fuss:4,by:-110,zeichne:sonnenstein,fund:"Im Kästchen beim Sonnenstein liegt:"}
],
infoObjekte:[{name:"Seekarte",x:1350,y:240,wand:true,by:-85,zeichne:seekarte,fund:"An der Seekarte klebt:"},{name:"Anker",x:1450,boden:600,fuss:4,by:-175,zeichne:anker,fund:"Am Anker klebt:"},{name:"Muschelhaufen",x:800,boden:740,fuss:4,by:-70,zeichne:muscheln,fund:"Zwischen den Muscheln liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs>${verl('wkE','#4a4a9a','#f8a080','#ffe0a0')}<radialGradient id="wkL"><stop offset="0" stop-color="#fff0c0" stop-opacity=".9"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes wkf{from{transform:translateX(-140px)}to{transform:translateX(250px)}}@keyframes wkw{50%{transform:rotate(-35deg)}}@keyframes wkm{50%{transform:translateY(-12px)}}.wkfa{animation:wkf 9s ease-in-out both}.wkwi{animation:wkw .8s ease-in-out infinite}.wkmo{animation:wkm 2s ease-in-out infinite}</style>
   <rect width="1000" height="600" fill="url(#wkE)"/>${[[90,50],[260,90],[760,60],[920,110]].map(([x,y])=>C(x,y,3,'#fff6c8')).join('')}${C(620,390,260,'url(#wkL)')}${C(620,390,70,'#fff0a0')}
   ${P('M0 390L120 290L230 340L340 270L470 390Z','#7a6a9a')}${P('M760 390L880 300L1000 350V390Z','#6a5a8a')}${R(0,390,1000,120,'#4a6aa0')}${L('M560 408H680M580 426H660M600 444H640','#ffe8a0',4)}${L('M60 430q20 -8 40 0M260 470q20 -8 40 0M800 450q20 -8 40 0M900 490q20 -8 40 0','#8ab0d8',3)}
   <g class="wkfa">${dboot(330,440,-.8)}</g>
   ${P('M0 500Q500 474 1000 500V600H0Z','#f0d8a0')}${L('M0 500Q250 486 500 487T1000 500','#fff',5)}
   ${kind(130,575,'#3a7ab0','#f0c8a0','#e8c050')}${kind(230,585,'#c8402a','#a8704a','#3a2410')}${kind(790,585,'#40a060','#e8b890','#8a4a20')}${kind(890,575,'#e8902a','#f0c8a0','#d8a040')}
   <g class="wkmo">${mw(200,170,2)}${mw(270,140,1.5)}${mw(780,190,1.8)}</g>`
};
})();