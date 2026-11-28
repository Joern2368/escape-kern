document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-fwhelm\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-17 8Q-17 -16 0 -17Q17 -16 17 8ZM-20 8H20V13H-20Z\"/><path d=\"M-12 -2H12\" stroke=\"#fff\" stroke-width=\"2.5\" opacity=\".6\"/></symbol>\n<symbol id=\"sym-fwleiter\" viewBox=\"-20 -20 40 40\"><path d=\"M-11 -18V18M11 -18V18M-11 -11H11M-11 -2H11M-11 7H11M-11 15H11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-fwtropfen\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -18Q14 0 14 6Q14 18 0 18Q-14 18 -14 6Q-14 0 0 -18Z\"/></symbol>\n<symbol id=\"sym-fwblau\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><path d=\"M-10 10V-4Q-10 -14 0 -14Q10 -14 10 -4V10Z\"/><rect x=\"-15\" y=\"10\" width=\"30\" height=\"7\"/></g><path d=\"M-17 -12L-13 -9M17 -12L13 -9M0 -19V-16\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-fwstern\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -18L5 -6L18 -6L8 2L12 15L0 7L-12 15L-8 2L-18 -6L-5 -6Z\"/></symbol>\n</defs>\n</svg>");
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
const rot='#d0282a',rd='#5a1010',chrom='#c8ccd4',gr='#3a3a40',gelb='#e0f040',holz='#8a5a30',dk='#3a2410',gold='#f2c14e',blau='#2a3a5a';
const helm=(x,y,s,c)=>P(`M${x-22*s} ${y}Q${x-22*s} ${y-28*s} ${x} ${y-30*s}Q${x+22*s} ${y-28*s} ${x+22*s} ${y}Z`,c,'#2a2a30',2)+R(x-26*s,y-3*s,52*s,6*s,c,'#2a2a30',1.5)+L(`M${x-16*s} ${y-12*s}H${x+16*s}`,gelb,3*s);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(const y of[500,540,590,650,720])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=110)d+=`M${800+(x-800)*.55} 470L${x} 780`;return g+L(d,'rgba(90,70,40,.35)',3);}
if(m==1){for(let k=0;k<5;k++)d+=`M${k*360+60} 520L${k*360+20} 760`;let f='';for(let k=0;k<8;k++)f+=E((k*233+120)%1600,540+(k*61)%200,60,8,'rgba(60,60,70,.15)');return g+L(d,gold,10)+f;}
if(m==2){for(let x=0;x<1600;x+=160)d+=`M${x} 620H${x+90}`;let f='';for(let k=0;k<26;k++){const x=(k*173+40)%1600;f+=`M${x} 780l-6 -14M${x} 780l2 -16M${x} 780l8 -12`;}return g+L(d,'#fff',6)+L('M0 500H1600','#fff',4)+L(f,'#4a9a3a',3);}
if(m==3){for(let k=0;k<50;k++)d+=C((k*149+30)%1600,490+(k*47)%285,2,'rgba(120,180,255,.35)');return g+d+L('M0 480H1600','#3a7af0',3);}
for(let k=0;k<60;k++)d+=C((k*137+20)%1600,490+(k*53)%280,3+k%3,['#8a8680','#a09a90','#6a6660'][k%3]);return g+d+R(0,470,1600,14,'#7a7470');}
const dienstplan=()=>`${R(-84,-58,168,116,'#fff',gr,4)}${R(-84,-58,168,22,rot,gr,4)}${L('M-56 -47H56','#fff',4)}${L('M-42 -36V58M0 -36V58M42 -36V58M-84 -8H84M-84 20H84','#b0b4bc',2)}${[[-63,-22,'#3a7af0'],[-21,6,rot],[21,-22,'#2a9a3a'],[63,34,gold],[-63,34,rot],[21,34,'#3a7af0']].map(([x,y,c])=>C(x,y,7,c,gr,1.5)).join('')}`;
const wachuhr=()=>`${C(0,0,48,'#fff',rot,9)}${[...Array(12)].map((_,k)=>{const a=k*Math.PI/6,s=Math.sin(a),c=Math.cos(a);return L(`M${s*32} ${c*32}L${s*38} ${c*38}`,gr,k%3?2:4);}).join('')}${L('M0 0V-28M0 0L20 -12','#2a2a30',5)}${L('M0 0L-14 24',rot,2)}${C(0,0,4,rot)}`;
const spind=()=>`${sch(50)}${R(-50,-200,100,200,'#8a98a8','#2a3440',4)}${L('M0 -200V0','#2a3440',3)}${L('M-36 -184H-14M-36 -176H-14M-36 -168H-14M14 -184H36M14 -176H36M14 -168H36','#2a3440',2)}${R(-12,-110,6,22,chrom)}${R(6,-110,6,22,chrom)}${R(-40,-60,28,16,'#fff','#2a3440',1.5)}${helm(0,-200,1.1,'#f4f4f0')}`;
const esstisch=()=>`${sch(80)}${L('M-66 0V-62M66 0V-62','#6a4020',8)}${R(-82,-72,164,12,holz,dk,3)}${R(-54,-104,44,32,rot,rd,3)}${E(-32,-104,24,5,'#e85050',rd,2)}${L('M-40 -114q-6 -10 0 -20M-26 -114q-6 -10 0 -20','rgba(255,255,255,.85)',3)}${R(12,-92,18,20,'#fff','#555',2)}${R(44,-92,18,20,'#5aa0d8','#555',2)}${L('M30 -86q8 0 8 8t-8 8M62 -86q8 0 8 8t-8 8','#555',2)}`;
const stiefel=()=>`${sch(52)}${L('M-56 -152H56','#6a4020',6)}${L('M-30 -152V-112M30 -152V-112',rot,5)}${P('M-40 -114H40L36 -40H6L0 -80L-6 -40H-36Z',blau,'#101a2a',3)}${L('M-38 -62H-7M7 -62H38',gelb,5)}${L('M-37 -52H-7M7 -52H37',chrom,3)}${P('M-36 -40H-6V0H-48Q-48 -12 -36 -14Z','#1a1a1a')}${P('M6 -40H36V-14Q48 -12 48 0H6Z','#1a1a1a')}`;
const berufe=()=>`${R(-82,-62,164,124,'#fff8e0','#6a4a28',4)}${R(-82,-62,164,22,'#f26a1a','#6a4a28',4)}${L('M-50 -51H50','#fff',4)}${[[-48,'#f4f4f0','#f0c8a0'],[0,gelb,'#a8704a'],[48,rot,'#e8b890']].map(([x,c,h])=>C(x,-4,12,h)+helm(x,-10,.6,c)+R(x-15,10,30,38,blau)+L(`M${x-15} 30H${x+15}`,gelb,4)).join('')}`;
const koffer=()=>`${sch(52)}${R(-52,-72,104,72,'#2a9a5a','#0a4a2a',4)}${L('M-20 -72Q-20 -92 0 -92Q20 -92 20 -72','#0a4a2a',6)}${R(-8,-56,16,40,'#fff')}${R(-20,-44,40,16,'#fff')}`;
const loescher=()=>`${sch(30)}${P('M-22 0V-110Q-22 -132 0 -132Q22 -132 22 -110V0Z',rot,rd,4)}${R(-8,-150,16,18,gr)}${L('M8 -144H30Q42 -144 40 -120V-60','#1a1a1a',5)}${R(-16,-92,32,36,'#fff','#888',2)}${L('M-10 -82H10M-10 -72H6','#888',2)}`;
const schlauchhalter=()=>`${L('M-92 -52H92','#5a5a68',6)}${[-58,0,58].map(x=>L(`M${x} -52V-30`,gr,4)+C(x,2,30,'#e8e4d8','#8a8070',4)+C(x,2,18,'none','#8a8070',3)+C(x,2,7,chrom,gr,2)).join('')}`;
const werkzeugwand=()=>`${R(-86,-60,172,120,'#c8a878','#6a4a28',4)}${L('M-64 -30L-34 34','#8a8ea0',9)}${C(-66,-34,11,'none','#8a8ea0',6)}${R(-10,-38,20,58,gold,'#6a5010',2)}${R(-14,-48,28,12,gr)}${E(52,0,26,34,'none','#d8a040',6)}${E(52,0,15,22,'none','#d8a040',4)}`;
const lf=()=>`${sch(150)}${R(-150,-180,212,150,rot,rd,4)}${L('M-114 -170V-60M-62 -170V-60M-10 -170V-60','#a01818',3)}${R(-150,-196,190,10,chrom,'#555',2)}${L('M-140 -196V-186M-110 -196V-186M-80 -196V-186M-50 -196V-186M-20 -196V-186M10 -196V-186','#555',2)}${P('M62 -30V-150H112L150 -98V-30Z',rot,rd,4)}${P('M72 -140H108L138 -100H72Z','#9ad0f0',rd,3)}${R(72,-162,40,12,'#3a7af0','#1a2a6a',2)}${R(-150,-70,300,12,'#fff')}${R(-150,-38,300,20,gr)}${[-100,100].map(x=>C(x,-16,22,'#2a2a30','#111',3)+C(x,-16,9,chrom)).join('')}${C(140,-50,7,'#fff6b0')}`;
const haspel=()=>`${sch(60)}${L('M0 -62L-50 0M0 -62L50 0','#3a3a40',5)}${C(0,-62,54,'#4a4a52','#1a1a1a',6)}${C(0,-62,40,'#e8e4d8','#8a8070',3)}${C(0,-62,26,'none','#8a8070',2)}${C(0,-62,10,chrom,'#333',2)}${L('M36 -104L86 -136','#3a3a40',6)}`;
const kegel=()=>`${sch(80)}${[[-52,.8],[0,1],[52,.8]].map(([x,s])=>P(`M${x-26*s} 0L${x-6*s} ${-84*s}H${x+6*s}L${x+26*s} 0Z`,'#f26a1a','#8a3008',2)+P(`M${x-17*s} ${-30*s}L${x-12*s} ${-52*s}H${x+12*s}L${x+17*s} ${-30*s}Z`,'#fff')+R(x-30*s,-6,60*s,6,'#3a3a40')).join('')}`;
const fztafel=()=>`${R(-86,-60,172,120,'#eef2f6','#3a4a5a',4)}${R(-62,-34,84,46,rot)}${P('M22 12V-24H44L58 -6V12Z',rot)}${C(-40,16,9,gr)}${C(36,16,9,gr)}${L('M-62 40H58M-74 -34V12',gr,2)}${P('M-62 34V46L-70 40Z',gr)}${P('M58 34V46L66 40Z',gr)}${P('M-80 -34H-68L-74 -42Z',gr)}${P('M-80 12H-68L-74 20Z',gr)}`;
const hydrant=()=>`${sch(40)}${R(-30,-10,60,10,'#5a5a68')}${P('M-22 -8V-100Q-22 -124 0 -126Q22 -124 22 -100V-8Z',rot,rd,4)}${R(-42,-82,20,18,chrom,gr,2)}${R(22,-82,20,18,chrom,gr,2)}${R(-10,-138,20,14,gr)}${R(-22,-112,44,8,'#fff')}`;
const eimer=()=>`${sch(60)}${[[-34,0],[34,0],[0,-56]].map(([x,y])=>P(`M${x-26} ${y}L${x-32} ${y-54}H${x+32}L${x+26} ${y}Z`,rot,rd,3)+L(`M${x-28} ${y-54}Q${x} ${y-80} ${x+28} ${y-54}`,gr,3)+R(x-30,y-40,60,7,'#fff')).join('')}`;
const zeitanzeige=()=>`${L('M-70 40V84M70 40V84','#5a5a68',7)}${R(-92,-46,184,90,'#1a1a1a','#5a5a68',5)}${[-62,-30,22,54].map(x=>R(x-11,-26,22,50,'none','#40e060',4)).join('')}${C(-4,-10,4,'#40e060')}${C(-4,10,4,'#40e060')}`;
const spritzwand=()=>`${L('M-50 70V100M50 70V100','#5a5a68',7)}${R(-72,-72,144,144,'#fff',gr,4)}${C(0,0,56,rot)}${C(0,0,40,'#fff')}${C(0,0,24,rot)}${C(0,0,9,'#fff')}${U('fwtropfen',30,-70,26,'#3a8ae0')}`;
const tunnel=()=>`${sch(90)}${P('M-60 -84H70Q92 -42 70 0H-60Z','#3a8ae0','#1a3a6a',4)}${L('M-20 -84V0M20 -84V0M50 -84V0','#1a3a6a',3)}${E(-60,-42,24,42,'#5aa0f0','#1a3a6a',4)}${E(-60,-42,15,32,'#1a1a2a')}`;
const balken=()=>`${sch(90)}${L('M-74 0L-62 -44M-50 0L-62 -44M74 0L62 -44M50 0L62 -44','#6a4020',7)}${R(-92,-56,184,14,'#e8c060','#8a6a10',3)}${L('M-60 -49H-30M0 -49H30M60 -49H80',rot,5)}`;
const kuebelspritze=()=>`${sch(50)}${R(-52,-6,24,6,'#5a5a68')}${P('M-34 0L-40 -72H40L34 0Z',rot,rd,3)}${E(0,-72,40,7,'#9ad0f0',rd,2)}${L('M0 -72V-132','#5a5a68',6)}${L('M-22 -132H22',gr,8)}${L('M34 -60Q72 -60 72 -24Q72 6 94 -2','#2a2a30',5)}`;
const uebungsplan=()=>`${R(-72,-64,144,128,'#f4f0e0','#4a4a52',4)}${R(-26,-72,52,16,'#5a5a68')}${[-30,-4,22,46].map((y,k)=>R(-58,y-8,16,16,'#fff','#4a4a52',2)+L(`M-34 ${y}H52`,'#8a8a90',4)+(k<2?L(`M-55 ${y}l5 5l9 -12`,'#2a9a3a',3):'')).join('')}`;
const treppchen=()=>`${sch(90)}${R(-30,-84,60,84,gold,'#8a6a10',3)}${R(-90,-54,60,54,chrom,'#5a5a68',3)}${R(30,-38,60,38,'#c88a50','#6a4020',3)}${P('M-18 -128H18Q18 -100 0 -98Q-18 -100 -18 -128Z',gold,'#8a6a10',2)}${R(-4,-98,8,8,gold)}${R(-14,-92,28,8,gold,'#8a6a10',2)}${U('fwstern',-10,-74,20,'#fff')}`;
const flaschen=()=>`${sch(54)}${[-32,-11,10,31].map(x=>R(x-8,-94,16,48,'rgba(200,236,255,.85)','#4a8ab8',2)+R(x-5,-102,10,9,'#2a6ac8')).join('')}${R(-52,-52,104,52,'#3a8ae0','#1a3a6a',3)}${R(-30,-38,60,14,'#1a3a6a')}`;
const stadtplan=()=>`${R(-92,-64,184,128,'#e8ecd8','#6a7a8a',4)}${R(46,-52,34,32,'#9ac090')}${L('M-92 50Q-40 38 0 56T92 44','#7ab8e0',7)}${L('M-92 -10H92M-30 -64V64M40 -64V64M-92 28L92 16','#fff',7)}${C(-30,-10,7,rot,'#fff',2)}${C(40,22,7,'#3a7af0','#fff',2)}${C(-64,40,7,gold,'#fff',2)}`;
const bildschirme=()=>`${C(0,0,110,'url(#licht)')}${[-64,0,64].map((x,k)=>R(x-29,-38,58,42,'#0a1a2a','#5a6a7a',4)+L(`M${x-20} -26H${x+10}M${x-20} -16H${x+18}M${x-20} -6H${x+4}`,['#40e0e0','#40e060',gold][k],3)+L(`M${x} 4V20`,'#5a6a7a',4)).join('')}${R(-90,20,180,8,'#5a6a7a')}`;
const notruftisch=()=>`${sch(90)}${L('M-80 0V-76M80 0V-76','#3a4a5a',7)}${R(-92,-84,184,12,'#5a6a7a','#2a3440',3)}${R(-66,-104,54,20,rot,rd,2)}${P('M-70 -110Q-40 -124 -8 -110L-12 -102Q-40 -112 -66 -102Z','#2a2a30')}${R(4,-94,74,10,'#2a2a30')}${R(14,-140,48,34,'#0a1a2a','#5a6a7a',3)}${L('M38 -106V-94','#5a6a7a',4)}`;
const ladestation=()=>`${sch(54)}${R(-52,-72,104,72,'#4a5a6a','#1a2a3a',3)}${[-30,0,30].map(x=>R(x-9,-114,18,42,'#2a2a30','#111',2)+L(`M${x+5} -114V-134`,'#2a2a30',3)+C(x,-80,3,'#40e060')+R(x-5,-106,10,12,'#5aa0d8')).join('')}`;
const drehstuhl=()=>`${sch(44)}${L('M-36 -4H36M0 -14L-32 -2M0 -14L32 -2','#3a3a40',5)}${C(-36,-2,5,'#1a1a1a')}${C(36,-2,5,'#1a1a1a')}${L('M0 -54V-14','#5a5a68',6)}${E(0,-60,42,10,'#2a4a8a','#101a3a',3)}${P('M-30 -66V-130Q0 -146 30 -130V-66Z','#2a4a8a','#101a3a',3)}`;
const notruftafel=()=>`${R(-82,-64,164,128,rot,rd,5)}${L('M-56 -22L-44 -34V34M-14 -22L-2 -34V34M24 -24Q30 -36 42 -36Q58 -36 58 -20Q58 -6 24 34H60','#fff',10)}${R(-82,46,164,18,'#fff',rd,3)}`;
const aktenschrank=()=>`${sch(50)}${R(-46,-152,92,152,chrom,'#4a5058',4)}${[-114,-76,-38].map(y=>L(`M-46 ${y}H46`,'#4a5058',3)).join('')}${[-133,-95,-57,-19].map(y=>R(-16,y-4,32,8,'#4a5058')+R(-10,y-14,20,7,'#fff')).join('')}`;
const lagetisch=()=>`${sch(90)}${L('M-76 0V-70M76 0V-70','#3a4a5a',7)}${R(-90,-78,180,12,'#3a4a5a')}${P('M-82 -78L-70 -100H70L82 -78Z','#e8ecd8','#2a3a4a',2)}${L('M-60 -88H60M-10 -98L-20 -80','#fff',4)}${[[-40,rot],[20,rot],[46,'#3a7af0']].map(([x,c])=>R(x-8,-100,16,10,c,'#111',1)).join('')}`;
const windsack=()=>`${L('M-62 -64V84',chrom,5)}${P('M-62 -62L62 -46V-18L-62 -2Z','#f26a1a','#8a3008',2)}${P('M-20 -56.6L20 -51.4V-23.4L-20 -7.4Z','#fff')}`;
const funkmast=()=>`${C(0,-76,22,'url(#licht)')}${L('M0 -70V76','#8a8ea0',5)}${L('M-40 -50H40M-30 -16H30M-20 18H20','#8a8ea0',4)}${C(0,-76,7,rot)}`;
const steuerpult=()=>`${sch(60)}${R(-60,-6,120,6,'#5a5a68')}${L('M0 -2V-70',gr,8)}${P('M-52 -70H52L42 -112H-42Z','#5a6a7a','#1a2a3a',3)}${L('M-24 -98V-122M0 -98V-128M24 -98V-120',gr,4)}${C(-24,-122,6,rot)}${C(0,-128,6,'#40c060')}${C(24,-120,6,gold)}`;
const seilsack=()=>`${sch(40)}${P('M-36 0V-70Q-36 -82 0 -84Q36 -82 36 -70V0Z',rot,rd,3)}${L('M0 -84Q-12 -112 20 -118Q42 -120 30 -94','#f2c14e',5)}${R(-36,-40,72,8,gelb)}`;
const luefter=()=>`${sch(54)}${R(-52,-62,104,62,'#9aa0a8','#4a5058',3)}${L('M-52 -40H52M-52 -20H52','#4a5058',2)}${P('M-44 -62Q0 -122 44 -62Z',chrom,'#4a5058',3)}${L('M-26 -72V-90M0 -74V-100M26 -72V-90','#4a5058',3)}`;
const hoehentafel=()=>`${R(-72,-72,144,144,'#fff','#2a3a4a',4)}${L('M-46 60L26 -56M-30 64L42 -52',rot,4)}${[0,1,2,3,4,5].map(k=>L(`M${-42+k*12} ${53-k*19}L${-27+k*12} ${55-k*19}`,rot,3)).join('')}${L('M54 -54V60M54 -54H64M54 -16H64M54 22H64M54 60H64','#2a3a4a',3)}`;
const solarplatte=()=>`${sch(80)}${L('M-50 -10V0M50 -10V0','#5a5a68',5)}${P('M-82 -10L-62 -80H82L62 -10Z','#1a3a7a','#8a9ab8',3)}${L('M-72 -45H72M-26 -80L-36 -10M22 -80L14 -10','#8a9ab8',2)}`;
const dachbeet=()=>`${sch(72)}${[[-48,-74,rot],[-20,-90,gold],[10,-80,'#fff'],[40,-94,'#e85a8a']].map(([x,y,c])=>L(`M${x} -40V${y}`,'#3a8a2a',4)+C(x,y,10,c,'#555',1.5)+C(x,y,3,'#f2a030')).join('')}${R(-72,-42,144,42,holz,dk,3)}${L('M-72 -20H72','#6a4020',3)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#1a2a3a" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#1a2a3a" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #fwa{transform:translateX(178px)}.tuer.offen #fwr{transform:scaleY(.06)}.tuer.offen #fwh1{transform:scaleX(.14)}.tuer.offen #fwh2{transform:scaleX(.14)}.tuer.offen #fws1{transform:translateX(-86px)}.tuer.offen #fws2{transform:translateX(86px)}.tuer.offen #fwg{opacity:1}.tuer.offen #fwrt{opacity:0}.tuer.offen #fwk{transform:rotate(-82deg)}</style>`;
const hallenblick=()=>`${R(410,190,180,280,'#9a9ca4')}${R(410,190,180,40,'#dce0e6')}${R(440,300,150,150,rot,rd,3)}${R(450,312,60,40,'#9ad0f0')}${R(440,410,150,12,'#fff')}${C(480,450,18,'#2a2a30')}${R(470,288,40,12,'#3a7af0')}`;
function tuerSchiebe(n){
return`${R(380,160,240,310,'#c83a30','#5a1818',5)}${hallenblick()}${R(392,174,216,16,'#5a5a68')}${R(600,146,10,324,gold,'#8a6a10',2)}${E(605,470,24,6,'#8a6a10')}${C(605,146,12,'#5a5a68')}
   <g id="fwa" class="tb">${R(410,190,180,280,'#e8e4dc','#5a5048',4)}${R(430,214,140,90,'#bfe4fa','#5a5048',3)}${L('M444 230L476 214M444 262L500 222','#fff',4)}${R(568,330,10,50,'#5a5048')}${U('fwhelm',476,320,48,rot)}</g>
   <g class="tb pl">${sPl(n,400)}</g>`;
}
function tuerRoll(n){
let b='';for(let k=0;k<14;k++)b+=`M410 ${206+k*20}H590`;
return`${R(370,130,260,340,'#8a8c94','#3a3c44',5)}${R(410,170,180,300,'#bfe4fa')}${R(410,380,180,90,'#7a7a80')}${L('M500 400V470','#fff',6)}${P('M410 380L460 300L500 340L540 280L590 380Z','#9ab8d8')}${R(400,150,200,24,'#5a5c64')}
   <g id="fwr" class="tb" style="transform-origin:500px 172px">${R(410,172,180,298,'#c8ccd4','#5a5c64',4)}${L(b,'#8a8e98',4)}${R(470,440,60,12,'#5a5c64')}</g>
   <g class="tb pl">${sPl(n,320)}</g>`;
}
function tuerHof(n){
const fl=x=>{let s='';for(let k=1;k<5;k++)s+=`M${x+k*18} 250V462`;return R(x,250,90,214,'rgba(0,0,0,0)')+L(`M${x} 250H${x+90}M${x} 356H${x+90}M${x} 462H${x+90}`+s,rot,7);};
return`${R(410,200,180,270,'#9ad0f0')}${R(420,260,60,90,'#e8c090','#8a6a40',2)}${P('M410 260L450 220L490 260Z','#c04a20')}${R(510,240,70,110,'#f0e0c0','#8a6a40',2)}${R(410,350,180,120,'#8a8a90')}${L('M410 410H590','#fff',4)}${R(380,200,30,270,'#a0a4ac','#4a4c54',4)}${R(590,200,30,270,'#a0a4ac','#4a4c54',4)}${C(395,196,18,rot,rd,3)}${C(605,196,18,rot,rd,3)}
   <g id="fwh1" class="tb" style="transform-origin:410px 356px">${fl(410)}</g>
   <g id="fwh2" class="tb" style="transform-origin:590px 356px">${fl(500)}</g>
   <g class="tb pl">${sPl(n,300)}</g>`;
}
function tuerSignal(n){
const pa=x=>R(x,190,90,280,'#4a5a6e','#1a2434',4)+R(x+20,220,50,120,'rgba(120,180,255,.35)','#1a2434',3)+L(`M${x+(x<500?82:8)} 220V440`,'#3a7af0',4);
return`${R(380,160,240,310,'#2a3444','#0a1220',5)}${R(410,190,180,280,'#f0e8c8')}${R(410,190,180,30,'#fff')}${C(500,330,160,'url(#licht)')}${R(440,120,120,36,'#1a1a1a',gr,3)}
   <g id="fwrt" class="tb">${C(470,138,12,'#ff3a3a')}${C(470,138,26,'url(#licht)')}</g>${C(530,138,12,'#1a3a1a')}
   <g id="fwg" class="tb" opacity="0">${C(530,138,12,'#40ff60')}${C(530,138,26,'url(#licht)')}</g>
   <g id="fws1" class="tb">${pa(410)}</g>
   <g id="fws2" class="tb">${pa(500)}</g>
   <g class="tb pl">${sPl(n,350)}</g>`;
}
function tuerKorb(n){
let s='';for(let k=1;k<7;k++)s+=`M${404+k*28} 360V440`;
return`${C(500,220,150,'url(#licht)')}${L('M820 470L530 300M850 470L560 300',chrom,10)}${L('M560 330L590 312M620 366L650 348M680 400L710 384M740 436L770 418',chrom,6)}${R(390,300,220,150,'rgba(255,255,255,.08)')}${R(390,440,220,20,'#5a5a68','#2a2a30',3)}${L('M390 300H610M390 300V460M610 300V460','#e8e8ec',8)}${R(390,320,220,10,rot)}
   <g id="fwk" class="tb" style="transform-origin:404px 360px">${L('M404 360H596M404 440H596'+s,rot,6)}${R(404,392,192,10,gelb)}</g>
   <g class="tb pl">${sPl(n,240)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'schiebetuer';
const arten={schiebetuer:[tuerSchiebe,'Schiebetür zur Fahrzeughalle mit Zahlenschloss'],rolltor:[tuerRoll,'Rolltor nach draußen mit Zahlenschloss'],hoftor:[tuerHof,'Hoftor mit Zahlenschloss'],signaltuer:[tuerSignal,'Schiebetür mit Signallicht und Zahlenschloss'],korb:[tuerKorb,'Korb der Drehleiter mit Zahlenschloss']};
const a=arten[art]||arten.schiebetuer;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const stadt=(y,f,lw)=>{let d='';for(let k=0;k<20;k++){const x=k*82,h=60+(k*53)%110;d+=R(x,y-h,70,h,f);if(lw)for(let j=0;j<3;j++)d+=R(x+12+j*18,y-h+16+(k%3)*12,10,12,lw);}return d;};
const fwmensch=(x,y,c,arm)=>`${L(`M${x-7} ${y}V${y-30}M${x+7} ${y}V${y-30}`,blau,9)}${R(x-15,y-70,30,42,blau)}${L(`M${x-15} ${y-44}H${x+15}`,gelb,4)}${C(x,y-82,12,c)}${helm(x,y-88,.6,'#f4f4f0')}<g class="fwwk" style="transform-origin:${x+13}px ${y-64}px">${L(`M${x+13} ${y-64}L${x+28} ${y-100}`,blau,8)}</g>${L(`M${x-13} ${y-64}L${x-20} ${y-34}`,blau,8)}`;
SZENARIEN.feuerwache={
name:"Die Feuerwache",
symbole:["fwhelm","fwleiter","fwtropfen","fwblau","fwstern"],
symbolNamen:["Helm","Leiter","Tropfen","Blaulicht","Stern"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect x="10" y="30" width="70" height="44" fill="#d0282a" stroke="#5a1010" stroke-width="3"/><path d="M80 74V40H98L112 56V74Z" fill="#d0282a" stroke="#5a1010" stroke-width="3"/><path d="M84 44H96L106 56H84Z" fill="#9ad0f0"/><rect x="86" y="32" width="14" height="8" fill="#3a7af0"/><path d="M14 22H74M20 16V28M32 16V28M44 16V28M56 16V28M68 16V28" stroke="#c8ccd4" stroke-width="3"/><rect x="10" y="58" width="102" height="5" fill="#fff"/><circle cx="30" cy="76" r="9" fill="#2a2a30"/><circle cx="94" cy="76" r="9" fill="#2a2a30"/></svg>`,
texte:{
einleitung:"Willkommen in der Feuerwache! Heute seid ihr bei den Einsatzkräften zu Gast. Ihr dürft die Wachhalle, die Fahrzeughalle, den Übungshof, die Leitstelle und das Dach mit der Drehleiter erkunden. Die Wachleiterin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, darf am Ende mit der Drehleiter hoch über die Stadt fahren. Schafft ihr es?",
startKnopf:"Los geht&rsquo;s",
hinweisGeber:"Die Wachleiterin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Wachleiterin schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Schicht ist vorbei!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Feuerwache trotzdem noch ganz erkunden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Das Löschfahrzeug kehrt mit Blaulicht zurück – der Einsatz ist erfolgreich beendet. Die Feuerwehrfrauen und Feuerwehrmänner winken euch zu. Ihr seid jetzt echte Feuerwehr-Profis!"
},
texteDu:{
einleitung:"Willkommen in der Feuerwache! Heute bist du bei den Einsatzkräften zu Gast. Du darfst die Wachhalle, die Fahrzeughalle, den Übungshof, die Leitstelle und das Dach mit der Drehleiter erkunden. Die Wachleiterin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, darf am Ende mit der Drehleiter hoch über die Stadt fahren. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Wachleiterin schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Feuerwache trotzdem noch ganz erkunden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Das Löschfahrzeug kehrt mit Blaulicht zurück – der Einsatz ist erfolgreich beendet. Die Feuerwehrfrauen und Feuerwehrmänner winken dir zu. Du bist jetzt ein echter Feuerwehr-Profi!"
},
einfach:{
name:"Die Feuerwache",
symbolNamen:["Helm","Leiter","Tropfen","Blaulicht","Stern"],
texte:{
einleitung:"Ihr besucht die Feuerwehr. Ihr seht fünf Orte: die Wache, die Halle mit dem Auto, den Hof, die Leitstelle und das Dach. Die Chefin der Wache hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende fahrt ihr mit der langen Leiter nach oben. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Feuerwehr-Auto fährt zurück. Alle winken euch zu!"
},
texteDu:{
einleitung:"Du besuchst die Feuerwehr. Du siehst fünf Orte: die Wache, die Halle mit dem Auto, den Hof, die Leitstelle und das Dach. Die Chefin der Wache hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende fährst du mit der langen Leiter nach oben. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Feuerwehr-Auto fährt zurück. Alle winken dir zu!"
},
raeume:[
{titel:"Die Wachhalle",intro:"Hier ruhen sich die Einsatzkräfte aus. Es gibt einen Tisch und Schränke. Die Tür zur Halle ist zu. Findet die Zahlen!",introDu:"Hier ruhen sich die Einsatzkräfte aus. Es gibt einen Tisch und Schränke. Die Tür zur Halle ist zu. Finde die Zahlen!",
objekte:[{name:"Dienst-Plan",fund:"Am Plan klebt:"},{name:"Wach-Uhr",fund:"An der Uhr klebt:"},{name:"Spind",fund:"Im Spind liegt:"},{name:"Ess-Tisch",fund:"Auf dem Tisch liegt:"},{name:"Stiefel und Hose",fund:"Im Stiefel liegt:"}],
infoObjekte:[{name:"Berufe-Plakat",fund:"Am Plakat klebt:"},{name:"Erste-Hilfe-Koffer",fund:"Im Koffer liegt:"},{name:"Feuer-Löscher",fund:"Am Löscher klebt:"}]},
{titel:"Die Fahrzeughalle",intro:"Hier steht das rote Feuerwehr-Auto. Es gibt viele Schläuche. Das große Tor ist zu.",
objekte:[{name:"Schlauch-Haken",fund:"Am Schlauch klebt:"},{name:"Werkzeug-Wand",fund:"An der Wand hängt:"},{name:"Lösch-Fahrzeug",fund:"Im Auto liegt:"},{name:"Schlauch-Wagen",fund:"Am Wagen klebt:"},{name:"Pylonen",fund:"Unter den Pylonen liegt:"}],
infoObjekte:[{name:"Fahrzeug-Tafel",fund:"An der Tafel klebt:"},{name:"Hydrant",fund:"Am Hydranten klebt:"},{name:"Lösch-Eimer",fund:"Im Eimer liegt:"}]},
{titel:"Der Übungshof",intro:"Die Sonne scheint. Hier üben die Einsatzkräfte. Es gibt einen hohen Turm. Das Hoftor ist zu.",
objekte:[{name:"Zeit-Anzeige",fund:"An der Anzeige klebt:"},{name:"Spritz-Wand",fund:"An der Wand klebt:"},{name:"Kriech-Tunnel",fund:"Im Tunnel liegt:"},{name:"Balken",fund:"Unter dem Balken liegt:"},{name:"Eimer-Spritze",fund:"Am Eimer klebt:"}],
infoObjekte:[{name:"Übungs-Plan",fund:"Am Plan klebt:"},{name:"Sieger-Treppchen",fund:"Auf dem Treppchen liegt:"},{name:"Flaschen-Kiste",fund:"In der Kiste liegt:"}]},
{titel:"Die Leitstelle",intro:"Hier ist es dunkel. Viele Bildschirme leuchten. Hier kommt der Notruf 112 an. Die Tür ist zu.",
objekte:[{name:"Stadt-Karte",fund:"An der Karte klebt:"},{name:"Bild-Schirme",fund:"Am Bildschirm klebt:"},{name:"Schreib-Tisch",fund:"Auf dem Tisch liegt:"},{name:"Funk-Geräte",fund:"Bei den Geräten liegt:"},{name:"Dreh-Stuhl",fund:"Auf dem Stuhl liegt:"}],
infoObjekte:[{name:"Notruf-Tafel",fund:"An der Tafel klebt:"},{name:"Akten-Schrank",fund:"Im Schrank liegt:"},{name:"Lage-Tisch",fund:"Auf dem Tisch liegt:"}]},
{titel:"Das Dach",intro:"Ihr seid oben auf dem Dach. Die Sonne geht unter. Die lange Leiter wartet. Öffnet den Korb!",introDu:"Du bist oben auf dem Dach. Die Sonne geht unter. Die lange Leiter wartet. Öffne den Korb!",
objekte:[{name:"Wind-Sack",fund:"Am Wind-Sack klebt:"},{name:"Funk-Mast",fund:"Am Mast klebt:"},{name:"Steuer-Pult",fund:"Am Pult klebt:"},{name:"Seil-Sack",fund:"Im Sack liegt:"},{name:"Lüfter",fund:"Am Lüfter klebt:"}],
infoObjekte:[{name:"Höhen-Tafel",fund:"An der Tafel klebt:"},{name:"Solar-Platte",fund:"An der Platte klebt:"},{name:"Blumen-Beet",fund:"Bei den Blumen liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Wachhalle",
intro:"In der gemütlichen Wachhalle duftet es nach Tee und Suppe. Hier ruhen sich die Einsatzkräfte zwischen den Übungen aus. Neben der Schiebetür glänzt die Rutschstange. Die Tür zur Fahrzeughalle ist noch verschlossen. Findet die Ziffern, um sie zu öffnen!",
introDu:"In der gemütlichen Wachhalle duftet es nach Tee und Suppe. Hier ruhen sich die Einsatzkräfte zwischen den Übungen aus. Neben der Schiebetür glänzt die Rutschstange. Die Tür zur Fahrzeughalle ist noch verschlossen. Finde die Ziffern, um sie zu öffnen!",
tuerX:1250,tuerArt:"schiebetuer",
hintergrund:()=>`${defs('#e8dcc0','#b8a888','#fff4c0')}${R(0,0,1600,470,'#f2e6cc')}${R(0,0,1600,24,'#c8b898')}${[200,600,1000,1400].map(x=>R(x-40,24,80,8,'#fff')+C(x,40,120,'url(#licht)')).join('')}${[400,800].map(x=>R(x-60,90,120,150,'#bfe4fa','#8a7a5a',6)+L(`M${x} 90V240M${x-60} 165H${x+60}`,'#8a7a5a',5)+P(`M${x-60} 210L${x-20} 170L${x+10} 200L${x+60} 160V240H${x-60}Z`,'#9ac090')).join('')}${R(0,360,1600,110,'#c83a30')}${R(0,350,1600,10,'#fff')}${R(1430,380,150,60,'#5a7aa8','#2a3a5a',3)}${R(1420,350,170,40,'#6a8ab8','#2a3a5a',3)}${R(1420,420,170,30,'#4a6a98','#2a3a5a',3)}${R(1210,0,90,40,'#5a5a68')}${boden(0)}`,
objekte:[
{name:"Dienstplan",x:250,y:240,wand:true,by:-75,zeichne:dienstplan,fund:"Am Dienstplan klebt:"},
{name:"Wachuhr",x:620,y:220,wand:true,by:-65,zeichne:wachuhr,fund:"An der Wachuhr klebt:"},
{name:"Spind",x:150,boden:700,fuss:4,by:-245,zeichne:spind,fund:"Im Spind liegt:"},
{name:"Esstisch",x:450,boden:650,fuss:4,by:-140,zeichne:esstisch,fund:"Auf dem Esstisch liegt:"},
{name:"Einsatzstiefel mit Hose",x:850,boden:720,fuss:4,by:-170,zeichne:stiefel,fund:"Im Einsatzstiefel steckt:"}
],
infoObjekte:[{name:"Berufe-Plakat",x:1000,y:250,wand:true,by:-80,zeichne:berufe,fund:"Am Berufe-Plakat klebt:"},{name:"Erste-Hilfe-Koffer",x:1050,boden:600,fuss:4,by:-110,zeichne:koffer,fund:"Im Erste-Hilfe-Koffer liegt:"},{name:"Feuerlöscher",x:1450,boden:740,fuss:4,by:-170,zeichne:loescher,fund:"Am Feuerlöscher klebt:"}]},
{titel:"Die Fahrzeughalle",
intro:"In der großen Fahrzeughalle summen die Neonröhren. Das rote Löschfahrzeug glänzt frisch geputzt, und an den Wänden hängen lange Schläuche. Das Rolltor nach draußen ist noch unten. Findet die Ziffern, um es hochzufahren!",
introDu:"In der großen Fahrzeughalle summen die Neonröhren. Das rote Löschfahrzeug glänzt frisch geputzt, und an den Wänden hängen lange Schläuche. Das Rolltor nach draußen ist noch unten. Finde die Ziffern, um es hochzufahren!",
tuerX:450,tuerArt:"rolltor",
hintergrund:()=>`${defs('#a8aab0','#6a6c74','#eaf6ff')}${R(0,0,1600,470,'#b8bcc4')}${[...Array(12)].map((_,k)=>L(`M0 ${k*40+20}H1600`,'rgba(60,64,74,.18)',2)).join('')}${R(0,40,1600,50,'#dce8f4','#7a7e88',3)}${[...Array(16)].map((_,k)=>L(`M${k*100} 40V90`,'#7a7e88',4)).join('')}${[200,700,1100,1500].map(x=>R(x-70,110,140,8,'#fff')+C(x,130,140,'url(#licht)')).join('')}${R(860,150,280,320,'#9a9ea8','#5a5c64',5)}${[...Array(14)].map((_,k)=>L(`M864 ${172+k*21}H1136`,'#7a7e88',3)).join('')}${R(0,440,1600,30,'#7a7e88')}${boden(1)}`,
objekte:[
{name:"Schlauchhalter",x:750,y:230,wand:true,by:-90,zeichne:schlauchhalter,fund:"Am Schlauchhalter klebt:"},
{name:"Werkzeugwand",x:1250,y:240,wand:true,by:-75,zeichne:werkzeugwand,fund:"An der Werkzeugwand hängt:"},
{name:"Löschfahrzeug",x:1000,boden:560,fuss:4,by:-215,zeichne:lf,fund:"Im Führerhaus liegt:"},
{name:"Schlauchhaspel",x:150,boden:740,fuss:4,by:-135,zeichne:haspel,fund:"An der Schlauchhaspel klebt:"},
{name:"Leitkegel",x:700,boden:680,fuss:4,by:-100,zeichne:kegel,fund:"Unter dem Leitkegel liegt:"}
],
infoObjekte:[{name:"Fahrzeugtafel",x:1480,y:250,wand:true,by:-78,zeichne:fztafel,fund:"An der Fahrzeugtafel klebt:"},{name:"Hydrant",x:1350,boden:700,fuss:4,by:-155,zeichne:hydrant,fund:"Am Hydranten klebt:"},{name:"Löscheimer",x:1500,boden:600,fuss:4,by:-150,zeichne:eimer,fund:"Im Löscheimer liegt:"}]},
{titel:"Der Übungshof",
intro:"Die Sonne scheint auf den Übungshof. Hier trainieren die Einsatzkräfte jeden Tag. Am hohen Schlauchturm trocknen die Schläuche im Wind. Das Hoftor zur Straße ist noch verschlossen. Findet die Ziffern, um es zu öffnen!",
introDu:"Die Sonne scheint auf den Übungshof. Hier trainieren die Einsatzkräfte jeden Tag. Am hohen Schlauchturm trocknen die Schläuche im Wind. Das Hoftor zur Straße ist noch verschlossen. Finde die Ziffern, um es zu öffnen!",
tuerX:800,tuerArt:"hoftor",
hintergrund:()=>`${defs('#8a8a90','#5a5a62','#fff4b0')}<linearGradient id="fwH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a9ae8"/><stop offset="1" stop-color="#d8f0fc"/></linearGradient>${R(0,0,1600,470,'url(#fwH)')}${C(1500,70,40,'#fff6b0')}${C(1500,70,160,'url(#licht)')}${[[300,60],[900,90]].map(([x,y])=>E(x,y,70,20,'#fff')+E(x-30,y-12,34,18,'#fff')+E(x+24,y-14,36,22,'#fff')).join('')}${stadt(400,'#c8d4e0')}${R(0,330,1600,140,'#a8483a')}${[...Array(10)].map((_,k)=>L(`M0 ${340+k*14}H1600`,'rgba(255,255,255,.25)',2)).join('')}${R(1240,40,120,430,'#c83a30','#5a1818',5)}${P('M1230 44L1300 0L1370 44Z','#5a5a68')}${[90,170,250,330].map(y=>R(1270,y,60,40,'#bfe4fa','#5a1818',3)).join('')}${L('M1380 60V300M1400 60V280','#e8e4d8',8)}${boden(2)}`,
objekte:[
{name:"Zeitanzeige",x:250,y:200,wand:true,by:-75,zeichne:zeitanzeige,fund:"An der Zeitanzeige klebt:"},
{name:"Spritzwand",x:1100,y:250,wand:true,by:-95,zeichne:spritzwand,fund:"An der Spritzwand klebt:"},
{name:"Kriechtunnel",x:150,boden:700,fuss:4,by:-110,zeichne:tunnel,fund:"Im Kriechtunnel liegt:"},
{name:"Balancierbalken",x:450,boden:650,fuss:4,by:-80,zeichne:balken,fund:"Unter dem Balancierbalken liegt:"},
{name:"Kübelspritze",x:1100,boden:720,fuss:4,by:-155,zeichne:kuebelspritze,fund:"An der Kübelspritze klebt:"}
],
infoObjekte:[{name:"Übungsplan",x:1480,y:250,wand:true,by:-90,zeichne:uebungsplan,fund:"Am Übungsplan klebt:"},{name:"Siegertreppchen",x:1300,boden:600,fuss:4,by:-150,zeichne:treppchen,fund:"Auf dem Siegertreppchen liegt:"},{name:"Trinkflaschenkiste",x:600,boden:740,fuss:4,by:-125,zeichne:flaschen,fund:"In der Trinkflaschenkiste liegt:"}]},
{titel:"Die Leitstelle",
intro:"In der Leitstelle ist es ruhig und abgedunkelt. Bildschirme leuchten blau und grün, und kleine Lichter blinken. Hier kommen alle Notrufe unter 112 an. Die Schiebetür zeigt noch rotes Licht. Findet die Ziffern, damit das Signal grün wird!",
introDu:"In der Leitstelle ist es ruhig und abgedunkelt. Bildschirme leuchten blau und grün, und kleine Lichter blinken. Hier kommen alle Notrufe unter 112 an. Die Schiebetür zeigt noch rotes Licht. Finde die Ziffern, damit das Signal grün wird!",
tuerX:1300,tuerArt:"signaltuer",
hintergrund:()=>`${defs('#1a2840','#0a1220','#5aa0ff')}${R(0,0,1600,470,'#121e34')}${[...Array(8)].map((_,k)=>L(`M0 ${k*56+30}H1600`,'rgba(90,140,220,.12)',3)).join('')}${[150,550,950,1450].map(x=>R(x-80,10,160,6,'#5aa0ff')+C(x,20,160,'url(#licht)')).join('')}${[...Array(30)].map((_,k)=>C((k*173+40)%1600,60+(k*67)%360,3,['#40e060','#5aa0ff','#ff5a5a',gold][k%4])).join('')}${R(470,330,560,90,'#1e2c46','#0a1220',3)}${[540,680,820,960].map(x=>R(x-50,280,100,56,'#0a1a2a','#3a4a6a',3)+R(x-40,290,80,36,'rgba(64,224,224,.35)')).join('')}${R(0,440,1600,30,'#0a1220')}${boden(3)}`,
objekte:[
{name:"Stadtplan",x:300,y:230,wand:true,by:-82,zeichne:stadtplan,fund:"Am Stadtplan klebt:"},
{name:"Bildschirmwand",x:750,y:200,wand:true,by:-55,zeichne:bildschirme,fund:"Am Bildschirm klebt:"},
{name:"Notruftisch mit Telefon",x:200,boden:700,fuss:4,by:-160,zeichne:notruftisch,fund:"Neben dem Telefon liegt:"},
{name:"Funkgeräte-Ladestation",x:550,boden:640,fuss:4,by:-150,zeichne:ladestation,fund:"Bei den Funkgeräten liegt:"},
{name:"Drehstuhl",x:900,boden:720,fuss:4,by:-160,zeichne:drehstuhl,fund:"Auf dem Drehstuhl liegt:"}
],
infoObjekte:[{name:"Notruf-Tafel",x:1050,y:240,wand:true,by:-82,zeichne:notruftafel,fund:"An der Notruf-Tafel klebt:"},{name:"Aktenschrank",x:1050,boden:600,fuss:4,by:-170,zeichne:aktenschrank,fund:"Im Aktenschrank liegt:"},{name:"Lagetisch",x:1500,boden:740,fuss:4,by:-120,zeichne:lagetisch,fund:"Auf dem Lagetisch liegt:"}]},
{titel:"Das Dach mit der Drehleiter",
intro:"Ihr steht oben auf dem Dach der Feuerwache! Die Abendsonne färbt den Himmel orange, und unter euch leuchten die ersten Lichter der Stadt. Die Drehleiter ist ausgefahren, ihr Korb wartet am Dachrand. Findet die Ziffern für das letzte Schloss!",
introDu:"Du stehst oben auf dem Dach der Feuerwache! Die Abendsonne färbt den Himmel orange, und unter dir leuchten die ersten Lichter der Stadt. Die Drehleiter ist ausgefahren, ihr Korb wartet am Dachrand. Finde die Ziffern für das letzte Schloss!",
tuerX:600,tuerArt:"korb",
hintergrund:()=>`${defs('#8a8680','#5a5650','#ffc890')}<linearGradient id="fwA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a8a"/><stop offset=".55" stop-color="#e8805a"/><stop offset="1" stop-color="#ffd080"/></linearGradient>${R(0,0,1600,470,'url(#fwA)')}${[[120,40],[420,70],[1300,30],[1500,80]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${C(1250,330,60,'#fff0a0')}${C(1250,330,260,'url(#licht)')}${stadt(440,'#5a4a7a','#ffe08a')}${stadt(470,'#3a2e5a','#ffd060')}${R(0,420,1600,50,'#6a6660','#3a3632',3)}${R(0,412,1600,12,'#8a8680')}${boden(4)}`,
objekte:[
{name:"Windsack",x:200,y:220,wand:true,by:-80,zeichne:windsack,fund:"Am Windsack klebt:"},
{name:"Funkmast",x:1000,y:230,wand:true,by:-105,zeichne:funkmast,fund:"Am Funkmast klebt:"},
{name:"Leiter-Steuerpult",x:950,boden:640,fuss:4,by:-150,zeichne:steuerpult,fund:"Am Steuerpult klebt:"},
{name:"Seilsack",x:300,boden:700,fuss:4,by:-135,zeichne:seilsack,fund:"Im Seilsack liegt:"},
{name:"Dachlüfter",x:1250,boden:700,fuss:4,by:-120,zeichne:luefter,fund:"Am Dachlüfter klebt:"}
],
infoObjekte:[{name:"Höhentafel",x:1350,y:240,wand:true,by:-95,zeichne:hoehentafel,fund:"An der Höhentafel klebt:"},{name:"Solarplatte",x:1450,boden:600,fuss:4,by:-100,zeichne:solarplatte,fund:"An der Solarplatte klebt:"},{name:"Dachbeet",x:800,boden:740,fuss:4,by:-120,zeichne:dachbeet,fund:"Zwischen den Blumen liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="fwE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a7a"/><stop offset=".55" stop-color="#f0806a"/><stop offset="1" stop-color="#ffd870"/></linearGradient><radialGradient id="fwL"><stop offset="0" stop-color="#5a9aff" stop-opacity=".9"/><stop offset="1" stop-color="#5a9aff" stop-opacity="0"/></radialGradient><radialGradient id="fwS"><stop offset="0" stop-color="#fff0c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes fwb{50%{opacity:.15}}@keyframes fwf{from{transform:translateX(-520px)}to{transform:translateX(0)}}@keyframes fww{50%{transform:rotate(-30deg)}}.fwbl{animation:fwb .5s infinite}.fwfz{animation:fwf 4s ease-out both}.fwwk{animation:fww .8s ease-in-out infinite}</style>
   <rect width="1000" height="600" fill="url(#fwE)"/>${[[90,50],[260,90],[760,60],[920,110]].map(([x,y])=>C(x,y,3,'#fff6c8')).join('')}${C(820,330,200,'url(#fwS)')}${C(820,330,56,'#fff0a0')}
   ${stadt(420,'#5a4a7a','#ffe08a')}${R(0,420,1000,180,'#4a4a52')}${R(0,420,1000,24,'#8a8a90')}${L('M0 520H120M200 520H320M400 520H520M600 520H720M800 520H920','#fff',6)}
   <g class="fwfz">${R(80,380,190,120,rot,rd,4)}${P('M270 500V400H318L352 446V500Z',rot,rd,4)}${P('M280 410H314L340 444H280Z','#9ad0f0')}${R(80,368,170,10,chrom)}${R(80,456,272,10,'#fff')}${C(130,504,20,'#2a2a30')}${C(300,504,20,'#2a2a30')}${C(130,504,8,chrom)}${C(300,504,8,chrom)}<g class="fwbl">${R(282,388,32,12,'#3a7af0')}${C(298,394,46,'url(#fwL)')}</g>${C(348,470,7,'#fff6b0')}</g>
   ${fwmensch(640,560,'#f0c8a0')}${fwmensch(760,570,'#a8704a')}${fwmensch(880,560,'#e8b890')}
   ${U('fwstern',600,150,30,'#fff6c0')}${U('fwstern',380,110,22,'#fff6c0')}${U('fwhelm',880,140,40,'#f4f4f0')}`
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
   FEUERWACHE in 3D: gemeinsame Bausteine für alle fünf Räume und das Schlussbild.
   Je Raum eine Datei feuerwache-raum<n>.js, die sich in RAEUME3D.feuerwache[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.feuerwache = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Küchenherd mit Suppentopf','Beim Suppentopf liegt:','Herd mit Topf','Beim Topf liegt:'],['Sofa mit Wachkatze','Auf dem Sofa liegt:','Sofa mit Katze','Auf dem Sofa liegt:']],
  [['Helmregal','Im Helmregal steckt:','Regal mit Helmen','Im Regal liegt:'],['Atemluft-Flaschen','Bei den Atemluft-Flaschen liegt:','Luft-Flaschen','Bei den Flaschen liegt:']],
  [['Übungspuppe','Bei der Übungspuppe liegt:','Puppe zum Üben','Bei der Puppe liegt:'],['Leitergestell','Am Leitergestell steckt:','Gestell mit Leitern','Bei den Leitern liegt:']],
  [['Großer Drucker','Im Drucker steckt:','Drucker','Im Drucker liegt:'],['Wasserspender','Beim Wasserspender liegt:','Wasser-Spender','Beim Wasser liegt:']],
  [['Sirene','Unter der Sirene klemmt:','Sirene','Bei der Sirene liegt:'],['Fernrohr','Am Fernrohr hängt:','Fern-Rohr','Am Fern-Rohr liegt:']]
];
const SZF=SZENARIEN.feuerwache;
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZF.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZF.einfach) SZF.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const FW = (function(){
const ROT=0xd0261c, ROT2=0x9c1a14, WEISS=0xf8f6f0, CREME=0xf2e8d0, GELB=0xffd21e, ORANGE=0xf07a1e, BLAU=0x2f68c0, GRUEN=0x2f9a54,
  SCHWARZ=0x16161a, GUMMI=0x2a2a30, METALL=0xaab2ba, METALL2=0x626a74, EISEN=0x34383e, GOLD=0xe8b830, HOLZ=0xa8743e, HOLZ2=0x74502a, HOLZ3=0x4a3018,
  BETON=0xb4b0a8, STEIN=0xa8a296, STEIN2=0x7e786c, LAUB=0x4f9038, LAUB2=0x6cae42, LAUB3=0x367030, RINDE=0x6e4a2a, GLAS=0x9ad0f0,
  ANZUG=0x2c2e3a, STREIF=0xe8f04a, HAUT=[0xf0c8a0,0xa8704a,0xe8b890,0x7a4a30];
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
  const platten=opt.bodenBild||fliesenBild(); platten.wrapS=platten.wrapT=THREE.RepeatWrapping; const w=opt.bodenWdh||[B/8,T/8];
  const bodenM=new THREE.MeshLambertMaterial({map:platten});
  const flaeche=(x1,x2,z1,z2)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/.5)),Math.max(1,Math.round((z2-z1)/.5))), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,((x1+B/2)+uv.getX(i)*(x2-x1))/B*w[0],((T/2-z2)+uv.getY(i)*(z2-z1))/T*w[1]);
    const m=new THREE.Mesh(geo,bodenM); m.rotation.x=-Math.PI/2; m.position.set((x1+x2)/2,0,(z1+z2)/2); m.receiveShadow=true; sc.add(m); };
  flaeche(-B/2,B/2,-T/2,T/2);
  flaeche(-B/2-18,B/2+18,T/2,T/2+26); /* Boden läuft vorn weit weiter, damit beim Drehen keine dunkle Fläche entsteht */
  flaeche(-B/2-18,-B/2,-T/2,T/2); flaeche(B/2,B/2+18,-T/2,T/2);
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(opt.dunkel||0x22242a)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);
  const tex=opt.wandBild||ziegelBild(), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    mauer(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); mauer(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); if(H-o.h>.05) mauer(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else mauer(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  mauer(links,tex,.5,H,T,-B/2-.25,H/2,0); mauer(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.leiste||METALL2, sh=opt.sockel===undefined?1.3:opt.sockel, sf=opt.sockelFarbe||ROT2, s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
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
/* Außenraum (Hof, Dach): Licht, Himmel-Boden (Raster 280), Rückgabe der Szene. opt: bodenFarbe, punkte, himmelLicht, grund, staerke, sonne, sonneStaerke */
function freiluft(k,opt){
  opt=opt||{}; const sc=k.scene;
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xeaf6ff,opt.grund||0x5a6a40,opt.staerke||.76));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xfff0cc,opt.sonneStaerke===undefined?.5:opt.sonneStaerke); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  if(opt.boden!==false){ const t=kornBild(opt.bodenFarbe||'#6c9c42',opt.punkte||['rgba(176,214,96,.5)','rgba(50,90,28,.42)','rgba(130,90,50,.28)'],true); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(280/9,280/9);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(280,280),new THREE.MeshLambertMaterial({map:t})); m.rotation.x=-Math.PI/2; m.position.y=-.012; m.receiveShadow=true; sc.add(m); }
  return sc;
}

/* ---------- Bilder Feuerwache ---------- */
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
/* ---------- Dinge der Feuerwehr ---------- */
/* Helm, Unterkante bei y */
function helm(par,x,y,z,farbe,gr,dreh){
  const g=gruppe(par,x,y,z); g.scale.setScalar(gr||1); g.rotation.y=dreh||0; const c=farbe===undefined?ROT:farbe;
  const m=new THREE.Mesh(new THREE.SphereGeometry(.3,14,8,0,Math.PI*2,0,Math.PI*.5),mat(c)); m.castShadow=true; g.add(m);
  walze(g,.34,.05,c,0,.02,0); box(g,.07,.05,.56,GELB,0,.29,0); box(g,.2,.12,.04,GELB,0,.13,.28); return g;
}
/* aufgerollter Schlauch: flache Ringe. Liegt in der xy-Ebene (Blick nach +z) */
function schlauchrolle(par,x,y,z,r,farbe){
  const g=gruppe(par,x,y,z), c=farbe===undefined?0xe8dcc0:farbe;
  for(let i=0;i<4;i++) ring(g,r*(1-i*.21),r*.1,i%2?c:0xd0c4a4,0,0,0);
  const k=walze(g,r*.14,r*.24,GOLD,0,0,0); k.rotation.x=Math.PI/2; return g;
}
/* Einsatzkraft, steht bei y=0, Blick nach +z. o: { haut (0-3), helm (Farbe oder false), anzug, gr, phase, winkt (true) }.
   Rückgabe { g, armL, armR, kopf }. userData.lebendig gesetzt, nicht fest. */
function mensch(k,par,x,z,dreh,o){
  o=o||{}; const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(o.gr||1.15); g.userData.lebendig=true;
  const H=HAUT[(o.haut||0)%4], A=o.anzug===undefined?ANZUG:o.anzug, r=gruppe(g,0,0,0);
  [-1,1].forEach(v=>{ walze(r,.11,.6,A,v*.15,.36,0); walze(r,.118,.07,STREIF,v*.15,.24,0); ball(r,.13,SCHWARZ,v*.15,.08,.06,1,.65,1.5); });
  rohr(r,.24,.31,.7,A,0,.97,0,14); walze(r,.295,.08,STREIF,0,.8,0); walze(r,.262,.06,STREIF,0,1.17,0);
  const kopf=gruppe(g,0,1.62,0), k2=gruppe(kopf,0,0,0); ball(k2,.28,H,0,0,0); [-.1,.1].forEach(v=>ball(k2,.036,0x20140e,v,.02,.265));
  const mund=ring(k2,.08,.015,0x8a3a30,0,-.08,.26,Math.PI); mund.rotation.z=Math.PI;
  if(o.helm===false) ball(k2,.285,[0x3a2414,0x14100c,0xb8782a,0x8a3a1a][(o.haut||0)%4],0,.08,-.06,1,.92,.95); else helm(k2,0,.1,0,o.helm===undefined?GELB:o.helm,.94);
  verschmelze(k2);
  const arm=v=>{ const a=gruppe(g,v*.34,1.24,0); walze(a,.085,.52,A,0,-.25,0); walze(a,.092,.06,STREIF,0,-.42,0); ball(a,.09,H,0,-.56,0); a.rotation.z=v*.18; verschmelze(a); return a; };
  const armL=arm(-1), armR=arm(1); verschmelze(r);
  if(k&&k.anim){ const p=o.phase||0; k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.7+p)*.3; if(o.winkt!==false) armR.rotation.z=2.4+Math.sin(t*5+p)*.35; }); }
  return { g, armL, armR, kopf };
}
/* Löschfahrzeug, etwa 6,6 lang (x), 2,4 breit (z), 3 hoch; Fahrerhaus bei +x, Räder auf y=0. o: { ohneLeiter }.
   Rückgabe { g, blau: [zwei Blaulicht-Meshes] } (Blinken selbst: blau[i].visible). Hindernis setzt der Aufrufer. */
function loeschwagen(par,x,z,dreh,o){
  o=o||{}; const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.userData.lebendig=true; const r=gruppe(g,0,0,0);
  box(r,6.4,.34,2.2,EISEN,0,.72,0);
  box(r,4.0,1.75,2.4,ROT,-1.15,1.75,0); box(r,1.9,2.05,2.4,ROT,2.15,1.9,0); box(r,1.96,.2,2.44,WEISS,2.15,3.0,0);
  box(r,4.06,.16,2.44,WEISS,-1.15,1.5,0); box(r,1.94,.16,2.44,WEISS,2.15,1.5,0);
  box(r,.06,.8,2.1,GLAS,3.13,2.35,0); [-1,1].forEach(v=>{ box(r,1.2,.75,.05,GLAS,2.3,2.35,v*1.22); box(r,.22,.06,.06,METALL,1.6,1.75,v*1.23);
    [-2.5,-1.15,.2].forEach(a=>{ box(r,1.18,.72,.05,METALL,a,2.12,v*1.22); [-.2,0,.2].forEach(h=>box(r,1.1,.025,.02,METALL2,a,2.12+h,v*1.255)); box(r,.3,.07,.05,EISEN,a,1.82,v*1.25); });
    ball(r,.16,basis(0xfff6b0),3.12,1.05,v*.78,.4,1,1);
    [-2.2,2.1].forEach(a=>{ const rad=walze(r,.62,.45,GUMMI,a,.62,v*1.08); rad.rotation.x=Math.PI/2; const n=walze(r,.28,.47,METALL,a,.62,v*1.09); n.rotation.x=Math.PI/2; });
  });
  box(r,.24,.34,2.46,METALL,3.15,.74,0); box(r,.2,.3,2.4,METALL,-3.2,.72,0);
  if(!o.ohneLeiter){ [-.45,.45].forEach(v=>box(r,4.6,.1,.1,METALL,-.9,2.95,v)); for(let i=0;i<12;i++) box(r,.07,.07,.9,METALL,-3.05+i*.39,2.95,0); [-2.6,.5].forEach(a=>box(r,.16,.3,1.0,EISEN,a,2.75,0)); }
  verschmelze(r);
  const bm=basis(0x3a8aff), blau=[-.7,.7].map(v=>{ const b=box(g,.5,.24,.4,bm,2.5,3.22,v); b.castShadow=false; return b; });
  return { g, blau };
}
/* Taube, Füße bei y. Rückgabe { g, kopf } */
function taube(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0; g.userData.lebendig=true; const F=0x8e97a8;
  ball(g,.17,F,0,.2,0,1.4,.95,1); ball(g,.1,0x6a7488,-.04,.24,.12,1.5,.7,.5); ball(g,.1,0x6a7488,-.04,.24,-.12,1.5,.7,.5); box(g,.24,.04,.14,0x5a6478,-.28,.2,0);
  [-1,1].forEach(v=>strich(g,[.02,.1,v*.06],[.03,0,v*.06],.015,0xe0707a));
  const kopf=gruppe(g,.18,.34,0); ball(kopf,.1,F,0,.03,0); ball(kopf,.095,0x4a8a78,-.03,-.05,0); kegel(kopf,.028,.09,ORANGE,.13,.02,0).rotation.z=-Math.PI/2; [-1,1].forEach(v=>ball(kopf,.018,SCHWARZ,.06,.06,v*.075));
  return { g, kopf };
}
/* Häuser-Reihe als Kulisse: von x1 bis x2 bei z, Höhen zwischen h1 und h2, Fuß bei y0. Fenster leuchten.
   Rückgabe: Liste der Fenster-InstancedMeshes */
function stadt(par,x1,x2,z,h1,h2,y0){
  const g=gruppe(par,0,y0||0,0), hell=[], dunkel=[], F=[0x8a6a9a,0x6a5a8a,0xa87280,0x5a6490,0x9a7a70];
  let x=x1, i=0;
  while(x<x2){ const b=2.6+zufall()*2.6, h=h1+zufall()*(h2-h1), zz=z-zufall()*2;
    box(g,b,h,2.4,F[i%F.length],x+b/2,h/2,zz); if(i%3===1) kegel(g,b*.72,1.4,0x7a3a3a,x+b/2,h+.7,zz).rotation.y=Math.PI/4; else box(g,b+.2,.2,2.6,0x3a3450,x+b/2,h+.1,zz);
    for(let yy=h-.8;yy>.6;yy-=1.15) for(let xx=x+.6;xx<x+b-.4;xx+=.85) (zufall()<.55?hell:dunkel).push([xx,yy,zz+1.22,.36,.5,.04,0xffffff]);
    x+=b+.3+zufall()*.5; i++; }
  verschmelze(g); g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; } });
  const bauen=(l,f)=>{ if(!l.length) return null; const im=new THREE.InstancedMesh(GEO.box,basis(f),l.length), o=new THREE.Object3D(); l.forEach((e,n)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.updateMatrix(); im.setMatrixAt(n,o.matrix); }); im.frustumCulled=false; g.add(im); return im; };
  return [bauen(hell,0xffe08a),bauen(dunkel,0x39406a)];
}
return { ROT, ROT2, WEISS, CREME, GELB, ORANGE, BLAU, GRUEN, SCHWARZ, GUMMI, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, HOLZ3, BETON, STEIN, STEIN2, LAUB, LAUB2, LAUB3, RINDE, GLAS, ANZUG, STREIF, HAUT,
  dielenBild, bretterBild, pflasterBild, kornBild, ziegelBild, fliesenBild, putzBild, tafel, mauer, huelle, zahlenschloss, viele, sparsam, laubbaum, busch, wiesenschmuck, vogel, freiluft, helm, schlauchrolle, mensch, loeschwagen, taube, stadt };
})();

/* Raum 1: Die Wachhalle. Gemütlicher Aufenthaltsraum der Feuerwache: helle Putzwände mit rotem Sockelband, Küche, Esstisch,
   Sofa mit Wachkatze, Stockbett, Tischkicker, Fenster zur Stadt und die goldene Rutschstange.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die rote Schiebetür rechts in der Rückwand, sie schiebt sich nach rechts auf, dahinter steht das Löschfahrzeug in der Halle. */
RAEUME3D.feuerwache[0] = (function(){
const { ROT, ROT2, WEISS, CREME, GELB, ORANGE, BLAU, GRUEN, SCHWARZ, GUMMI, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, HOLZ3, ANZUG, STREIF, LAUB, LAUB2, LAUB3, GLAS } = FW;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=10.2;                    /* Mitte der Schiebetür */
const SX=7.0, SZ_=-12.0;          /* Rutschstange */
const SOFABLAU=0x4a74b0, SOFABLAU2=0x365a8e, HELLHOLZ=0xcc9a5c;

const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze nach vorn, Ring flach */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

/* ---------- Bilder ---------- */
/* Fenster: Himmel, Wolken, Häuser und Baum */
function fensterBild(n){
  return bild(384,320,(g)=>{ const v=g.createLinearGradient(0,0,0,260); v.addColorStop(0,'#6ab4ee'); v.addColorStop(1,'#e2f4fc'); g.fillStyle=v; g.fillRect(0,0,384,320);
    g.fillStyle='#ffffff'; [[70+n*40,60],[270-n*30,90]].forEach(([x,y])=>{ [[0,0,26],[28,6,20],[-28,8,18]].forEach(([a,b,r])=>{ g.beginPath(); g.arc(x+a,y+b,r,0,7); g.fill(); }); });
    ['#e8b878','#d87860','#f0dca8','#a8c0d8'].forEach((f,i)=>{ const x=i*98+(n%2)*14-8, h=80+((i*47+n*31)%70); g.fillStyle=f; g.fillRect(x,270-h,86,h);
      g.fillStyle='#8a3a30'; g.beginPath(); g.moveTo(x-6,270-h); g.lineTo(x+43,232-h); g.lineTo(x+92,270-h); g.fill();
      g.fillStyle='#5a7090'; for(let a=0;a<3;a++) for(let b=0;b<2;b++) g.fillRect(x+10+a*25,286-h+b*30,15,18); });
    g.fillStyle='#5a9a42'; g.fillRect(0,268,384,52); g.fillStyle='#3e7e34'; [[40+n*90,248,34],[75+n*90,262,26]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x%384,y,r,0,7); g.fill(); }); });
}
/* Dienstplan: Tabelle mit Tagen, kleinen Helmen und bunten Schichtfeldern */
function planBild(){
  return bild(512,352,(g)=>{ g.fillStyle='#ffffff'; g.fillRect(0,0,512,352); g.fillStyle='#d0261c'; g.fillRect(0,0,512,62);
    g.fillStyle='#ffffff'; for(let s=0;s<5;s++){ g.fillRect(124+s*78,24,50,14); }
    g.beginPath(); g.arc(52,40,24,Math.PI,0); g.fill(); g.fillRect(20,38,64,9);
    g.strokeStyle='#8a929c'; g.lineWidth=3; for(let r=0;r<=5;r++){ g.beginPath(); g.moveTo(8,70+r*55); g.lineTo(504,70+r*55); g.stroke(); }
    [8,112,190,268,346,424,504].forEach(x=>{ g.beginPath(); g.moveTo(x,70); g.lineTo(x,345); g.stroke(); });
    const F=['#3a7af0','#e0342a','#2a9a4a','#f2b020'];
    for(let r=0;r<5;r++){ const y=97+r*55; g.fillStyle=F[r%4]; g.beginPath(); g.arc(42,y+5,17,Math.PI,0); g.fill(); g.fillRect(20,y+3,44,7); g.fillStyle='#4a4a52'; g.fillRect(72,y-4,32,7);
      for(let s=0;s<5;s++){ if((r*3+s*2)%4===0) continue; g.fillStyle=F[(r+s*3)%4]; g.globalAlpha=.35; g.fillRect(118+s*78,76+r*55,66,43); g.globalAlpha=1; g.fillRect(126+s*78,90+r*55,50,8); } } });
}
/* Berufe-Plakat: drei Leute mit verschiedener Kleidung und Gerät */
function berufeBild(){
  return bild(512,384,(g)=>{ g.fillStyle='#fff4d4'; g.fillRect(0,0,512,384); g.fillStyle='#f0701a'; g.fillRect(0,0,512,70);
    g.fillStyle='#ffffff'; g.font='700 50px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('112',256,38); [[70,170],[342,442]].forEach(([a,b])=>g.fillRect(a,31,b-a,12));
    const rund=(x,y,r,f)=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    const eck=(x,y,w,h,f)=>{ g.fillStyle=f; g.fillRect(x,y,w,h); };
    [['#a8d4f0',90,'#f0c8a0','#2c2e3a','#d0261c'],['#c8e8b0',256,'#a8704a','#f07a1e','#ffffff'],['#f8c8c0',422,'#e8b890','#2a4a8a','#ffd21e']].forEach(([hg,x,haut,anzug,helm],i)=>{
      eck(x-72,88,144,276,hg);
      eck(x-34,196,68,92,anzug); eck(x-30,288,24,56,anzug); eck(x+6,288,24,56,anzug); eck(x-36,340,34,16,'#16161a'); eck(x+2,340,34,16,'#16161a');
      eck(x-54,200,20,70,anzug); eck(x+34,200,20,70,anzug); rund(x-44,276,11,haut); rund(x+44,276,11,haut);
      eck(x-34,238,68,10,'#e8f04a'); eck(x-30,316,24,8,'#e8f04a'); eck(x+6,316,24,8,'#e8f04a');
      rund(x,162,34,haut); rund(x-12,164,4,'#20140e'); rund(x+12,164,4,'#20140e'); g.strokeStyle='#8a3a30'; g.lineWidth=4; g.beginPath(); g.arc(x,172,13,.4,2.74); g.stroke();
      g.fillStyle=helm; g.beginPath(); g.arc(x,148,38,Math.PI,0); g.fill(); eck(x-46,144,92,10,helm); eck(x-26,128,52,6,'#8a929c');
      if(i===0){ g.strokeStyle='#e8dcc0'; g.lineWidth=11; [24,12].forEach(r=>{ g.beginPath(); g.arc(x+46,300,r,0,7); g.stroke(); }); }
      if(i===1){ eck(x+22,276,48,40,'#2a9a5a'); eck(x+42,282,9,28,'#ffffff'); eck(x+32,292,28,9,'#ffffff'); }
      if(i===2){ g.strokeStyle='#16161a'; g.lineWidth=8; g.beginPath(); g.arc(x,160,44,3.3,6.1); g.stroke(); rund(x-41,166,11,'#16161a'); rund(x+41,166,11,'#16161a'); eck(x+34,250,26,46,'#16161a'); eck(x+50,226,6,26,'#16161a'); } });
    g.strokeStyle='#6a4a28'; g.lineWidth=8; g.strokeRect(4,4,504,376); });
}
/* Bild an der Wand: Löschfahrzeug von der Seite */
function autoBild(himmel){
  return bild(384,256,(g)=>{ g.fillStyle=himmel||'#bfe4fa'; g.fillRect(0,0,384,256); g.fillStyle='#6a6a72'; g.fillRect(0,196,384,60);
    g.fillStyle='#d0261c'; g.fillRect(50,92,196,92); g.fillRect(250,76,82,108); g.fillStyle='#bfe4fa'; g.fillRect(268,90,52,38); g.fillStyle='#ffffff'; g.fillRect(50,146,282,10);
    g.fillStyle='#8a929c'; g.fillRect(52,70,190,8); g.fillRect(52,84,190,8); for(let x=60;x<240;x+=22) g.fillRect(x,70,6,22);
    g.fillStyle='#3a8aff'; g.fillRect(278,60,32,17);
    [102,282].forEach(x=>{ g.fillStyle='#16161a'; g.beginPath(); g.arc(x,188,28,0,7); g.fill(); g.fillStyle='#c8ccd4'; g.beginPath(); g.arc(x,188,12,0,7); g.fill(); }); });
}
/* Zeichen über der Tür: kleines Löschfahrzeug */
function torZeichen(){
  return bild(256,128,(g)=>{ g.fillStyle='#ffffff'; g.fillRect(0,0,256,128); g.strokeStyle='#d0261c'; g.lineWidth=10; g.strokeRect(5,5,246,118);
    g.fillStyle='#d0261c'; g.fillRect(36,38,116,50); g.fillRect(156,28,56,60); g.fillStyle='#bfe4fa'; g.fillRect(168,38,32,22); g.fillStyle='#3a7af0'; g.fillRect(172,17,22,12);
    g.fillStyle='#16161a'; [66,182].forEach(x=>{ g.beginPath(); g.arc(x,92,17,0,7); g.fill(); }); });
}
/* Blick durch die offene Tür: Wand der Fahrzeughalle mit Rolltor und Neonlicht */
function hallenBild(){
  return bild(1024,320,(g)=>{ g.fillStyle='#b8bcc4'; g.fillRect(0,0,1024,320); g.fillStyle='rgba(60,64,74,.2)'; for(let y=18;y<320;y+=28) g.fillRect(0,y,1024,3);
    for(let x=60;x<1024;x+=250){ g.fillStyle='#fffbe0'; g.fillRect(x,24,130,12); }
    [110,420,730].forEach(x=>{ g.fillStyle='#7a7e88'; g.fillRect(x-8,72,206,248); g.fillStyle='#dce0e6'; g.fillRect(x,80,190,240); g.fillStyle='#8a8e98'; for(let y=100;y<320;y+=20) g.fillRect(x,y,190,4); g.fillStyle='#9ad0f0'; for(let a=0;a<4;a++) g.fillRect(x+12+a*44,124,34,28); });
    g.strokeStyle='#e8dcc0'; g.lineWidth=11; [340,650,960].forEach(x=>[26,14].forEach(r=>{ g.beginPath(); g.arc(x,160,r,0,7); g.stroke(); })); });
}

/* ---------- Ausgang: die Schiebetür zur Fahrzeughalle ---------- */
function baueTuer(k,sc,hinten){
  /* Fahrzeughalle dahinter */
  const wand=new THREE.Mesh(new THREE.PlaneGeometry(22,6.4),basis(0xffffff,{map:hallenBild()})); wand.position.set(AX,3.2,HINTEN-5.6); hinten.add(wand);
  const halle=gruppe(hinten,0,0,0);
  hell(box(halle,18,.04,5.6,0x84868e,AX,-.012,HINTEN-2.8));
  [-1.55,1.55].forEach(a=>hell(box(halle,.12,.02,3.6,GELB,AX+a,.016,HINTEN-2.1)));
  verschmelze(halle);
  const wagen=FW.loeschwagen(hinten,AX+.7,HINTEN-4.1,0); wagen.g.scale.setScalar(.92);
  k.anim.push(t=>wagen.blau.forEach((b,i)=>b.visible=Math.sin(t*5+i*Math.PI)>-.2));
  /* Rahmen, Laufschiene, Zeichen und Lampen */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.3,4.55,.16,GOLD,s*2.02,2.27,.08); });
  box(r,4.34,.24,.16,GOLD,0,4.52,.08);
  box(r,8.0,.18,.22,EISEN,1.85,4.78,.3); [-2.1,.4,3.0,5.75].forEach(x=>box(r,.16,.34,.4,METALL2,x,4.78,.2));
  box(r,3.8,.04,.8,METALL,0,.02,.05);
  [-.18,.18].forEach(z=>hell(box(r,7.9,.05,.08,METALL2,1.85,.04,.34+z*.6)));
  const lampen=[-1.35,1.35].map(x=>{ box(r,.42,.14,.24,EISEN,x,5.03,.14); return x; });
  verschmelze(r);
  lampen.forEach(x=>ball(hinten,.17,basis(0xffe27a),AX+x,5.2,HINTEN+.2));
  FW.tafel(hinten,torZeichen(),1.4,.7,AX,5.36,HINTEN+.08);
  /* Türblatt */
  const bl=gruppe(hinten,AX,0,HINTEN+.3); bl.userData.lebendig=true;
  box(bl,3.9,4.5,.14,ROT,0,2.3,0);
  [-1.86,1.86].forEach(x=>box(bl,.16,4.5,.18,ROT2,x,2.3,0)); [.14,4.47].forEach(y=>box(bl,3.9,.16,.18,ROT2,0,y,0));
  box(bl,3.5,.2,.18,WEISS,0,1.35,0); box(bl,3.5,.08,.18,GELB,0,1.12,0);
  box(bl,2.5,1.15,.04,METALL,0,3.5,.08); box(bl,2.3,.96,.04,basis(0xbfe4fa),0,3.5,.1); box(bl,.07,.96,.05,METALL,0,3.5,.12);
  [[-.75,3.55],[.45,3.4]].forEach(([x,y])=>{ const s=box(bl,.07,.55,.02,basis(0xffffff),x,y,.13); s.rotation.z=-.7; });
  /* langer Griff */
  box(bl,.13,1.3,.13,METALL,-1.45,2.2,.22); [1.65,2.75].forEach(y=>box(bl,.13,.12,.2,METALL2,-1.45,y,.12));
  /* Rollen an der Schiene */
  [-1.3,1.3].forEach(x=>{ box(bl,.16,.34,.08,METALL2,x,4.62,.08); flach(walze(bl,.17,.1,METALL,x,4.78,.12)); });
  box(bl,1.4,1.06,.06,CREME,.05,2.27,.09);
  const schloss=FW.zahlenschloss(bl,.05,2.14,.22); schloss.scale.setScalar(1.35);
  verschmelze(bl);
  const glanz=schein(hinten,'rgba(255,225,110,.4)',AX,2.3,HINTEN+.8,1.2);
  const licht=new THREE.PointLight(0xfff0d0,.15,10,1.5); licht.position.set(AX,3.4,HINTEN-1.6); sc.add(licht);
  k.kasten(AX,-13.1,4.0,.8); /* geschlossene Tür: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Schiebetür zur Fahrzeughalle', einfach:'Tür zur Halle', steh:[AX-.7,-10.9], durch:[AX-.2,-15.4],
    treffer:{x:AX,y:2.4,z:-12.9,b:3.9,h:4.8,t:.9}, schildOben:[AX,5.3,-12.3], glanz:[AX,2.3,-12.7],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.05)/.88)); bl.position.x=AX+3.85*a*a*(3-2*a); glanz.visible=auf<.05; licht.intensity=.15+.9*auf; } });
}

/* ---------- Rutschstange (Deko, in der Einleitung genannt) ---------- */
function rutschstange(k,sc){
  const g=gruppe(sc,SX,0,SZ_);
  const messing=new THREE.MeshPhongMaterial({color:0xf0b828,emissive:0x5a3a00,specular:0xffffff,shininess:110});
  walze(g,.17,7.0,messing,0,3.5,0);
  /* heller Glanzstreifen */
  hell(box(g,.045,6.7,.02,basis(0xfff8d0),-.06,3.5,.165));
  /* weiches Polster am Boden: rot mit weißem Rand */
  walze(g,.85,.24,ROT,0,.13,0); flach(ring(g,.72,.07,WEISS,0,.26,0)); walze(g,.34,.14,METALL2,0,.32,0); flach(ring(g,.24,.05,messing,0,.42,0));
  /* Halter oben an der Wand mit rundem Schutzring */
  box(g,.16,.16,1.5,EISEN,0,6.05,-.75); flach(ring(g,.55,.09,ROT,0,6.05,0)); [-1,1].forEach(s=>strich(g,[s*.55,6.05,0],[0,6.05,0],.035,METALL2));
  flach(ring(g,.19,.05,METALL2,0,4.4,0));
  verschmelze(g);
  const funken=[0,1].map(i=>schein(sc,'rgba(255,250,200,.95)',SX-.05,2,SZ_+.28,.6));
  k.anim.push(t=>funken.forEach((f,i)=>{ const u=(t*.22+i*.5)%1; f.position.y=5.6-u*4.8; const s=.25+Math.abs(Math.sin(u*Math.PI*3))*.55; f.scale.set(s,s,1); }));
  k.kreis(SX,SZ_,.85);
}

/* ---------- Wandschmuck ---------- */
function fenster(par,x,y,z,dreh,n){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  FW.tafel(g,fensterBild(n),2.4,2.0,0,0,.05);
  [-1,1].forEach(s=>box(g,.16,2.24,.2,WEISS,s*1.27,0,.1)); [-1.08,1.08].forEach(h=>box(g,2.7,.16,.2,WEISS,0,h,.1));
  box(g,.08,2.0,.1,WEISS,0,0,.09); box(g,2.4,.08,.1,WEISS,0,.2,.09); box(g,2.9,.14,.42,HELLHOLZ,0,-1.18,.21);
  [-1,1].forEach(s=>{ for(let i=0;i<3;i++) box(g,.18,2.0-i*.08,.07,i%2?CREME:ORANGE,s*(1.52-i*.16),.04,.2+(i%2)*.04); });
  strich(g,[-1.7,1.24,.24],[1.7,1.24,.24],.045,HOLZ3); [-1.72,1.72].forEach(a=>ball(g,.09,GOLD,a,1.24,.24));
  rohr(g,.18,.13,.26,0xc8683a,-.65,-.98,.26); [[-.08,0],[.09,.05],[0,.12]].forEach(([a,b])=>ball(g,.12,LAUB2,-.65+a,-.76+b,.26));
  verschmelze(g);
}
function wandlampe(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,.34,.34,.08,METALL2,0,0,.05); strich(g,[0,0,.08],[0,.1,.42],.045,METALL2);
  rohr(g,.2,.36,.4,basis(0xffe8a8),0,.2,.46); flach(ring(g,.36,.035,GOLD,0,0,.46));
  schein(g,'rgba(255,215,130,.5)',0,.2,.65,1.7);
}
/* Haken mit zwei Einsatzjacken und Helmen auf dem Brett darüber */
function jackenhaken(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,3.4,.14,.62,HOLZ,0,.5,.32); box(g,3.4,.24,.1,HOLZ3,0,.05,.06);
  [-.9,.9].forEach(a=>{ flach(walze(g,.05,.3,METALL,a,.04,.2));
    rohr(g,.28,.52,1.5,ANZUG,a,-.82,.34,12).scale.z=.42; box(g,.98,.12,.46,STREIF,a,-1.2,.34); box(g,.72,.09,.44,STREIF,a,-.55,.33);
    [-1,1].forEach(s=>{ strich(g,[a+s*.28,-.2,.36],[a+s*.62,-1.2,.38],.12,ANZUG); ball(g,.13,STREIF,a+s*.57,-1.05,.38,1,.45,1); });
    box(g,.05,1.4,.04,METALL,a,-.82,.58); });
  FW.helm(g,-1.05,.57,.34,ROT,1.1,0); FW.helm(g,0,.57,.34,WEISS,1.1,0); FW.helm(g,1.05,.57,.34,GELB,1.1,0);
}
function geschirrbrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,2.6,.11,.5,HELLHOLZ,0,0,.27); [-1.05,1.05].forEach(a=>strich(g,[a,-.5,.06],[a,-.05,.42],.05,HOLZ3));
  [[-.95,ROT],[-.45,BLAU],[.05,GELB]].forEach(([a,f])=>{ walze(g,.15,.3,f,a,.21,.27); ring(g,.09,.025,f,a+.17,.21,.27); });
  [.65,1.08].forEach((a,i)=>{ walze(g,.18,.44,i?0xc8a468:CREME,a,.28,.27); walze(g,.2,.08,HOLZ3,a,.54,.27); });
}
function pokalbrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,2.8,.11,.5,HOLZ3,0,0,.27); [-1.15,1.15].forEach(a=>strich(g,[a,-.5,.06],[a,-.05,.42],.05,HOLZ2));
  [[-.85,GOLD,1.15],[0,METALL,.9],[.85,0xc88a50,.75]].forEach(([a,f,s])=>{ box(g,.36,.12,.3,HOLZ,a,.12,.27); walze(g,.06,.24*s,f,a,.18+.12*s,.27); rohr(g,.26*s,.1*s,.36*s,f,a,.18+.42*s,.27); [-1,1].forEach(v=>ring(g,.1*s,.025,f,a+v*.25*s,.18+.45*s,.27)); });
}
function wandbild(par,x,y,z,dreh,himmel){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,2.3,1.66,.08,HOLZ3,0,0,.06); FW.tafel(g,autoBild(himmel),2.06,1.42,0,0,.11);
}
/* Wimpelkette */
function wimpel(par,x1,x2,y,z){
  const n=Math.round((x2-x1)/.7), F=[ROT,GELB,BLAU,WEISS]; let alt=null;
  for(let i=0;i<=n;i++){ const u=i/n, p=[x1+(x2-x1)*u, y-Math.sin(u*Math.PI)*.35, z]; if(alt) strich(par,alt,p,.018,HOLZ3); alt=p;
    if(i>0&&i<n){ const w=kegel(par,.17,.36,F[i%4],p[0],p[1]-.2,z); w.rotation.x=Math.PI; w.scale.z=.02; } }
}

/* ---------- Möbel und Deko am Boden ---------- */
function kuehlschrank(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  box(g,1.5,3.1,1.1,0x7ac8c0,0,1.6,0); ball(g,.75,0x7ac8c0,0,3.13,0,1,.2,.73); box(g,1.52,.05,1.12,METALL2,0,2.1,0);
  box(g,.1,.6,.1,METALL,.52,2.55,.6); box(g,.1,.9,.1,METALL,.52,1.35,.6); box(g,1.4,.12,1.0,EISEN,0,.06,0);
  [[-.4,2.6,ROT],[-.05,1.6,GELB],[-.45,1.2,BLAU]].forEach(([a,y,f])=>flach(walze(g,.1,.05,f,a,y,.57)));
}
function spuele(par,x,z){
  const g=gruppe(par,x,0,z);
  box(g,1.8,1.35,1.2,HOLZ,0,.7,0); box(g,1.94,.12,1.32,0xe8e4dc,0,1.44,0); [-.43,.43].forEach(a=>{ box(g,.78,1.02,.05,HELLHOLZ,a,.7,.62); ball(g,.07,METALL,a-Math.sign(a)*.22,.85,.68); });
  box(g,1.0,.04,.75,METALL2,-.2,1.52,.05); flach(ring(g,.07,.02,METALL,-.2,1.55,.05));
  walze(g,.06,.55,METALL,-.2,1.75,-.42); strich(g,[-.2,2.02,-.42],[-.2,2.02,-.05],.055,METALL); strich(g,[-.2,2.02,-.05],[-.2,1.86,-.02],.05,METALL);
  walze(g,.17,.34,0x4aa8d8,.6,1.67,.1); [-.08,.06].forEach(a=>strich(g,[.6+a,1.7,.1],[.6+a*2.4,2.14,.1],.025,HOLZ2));
}
function stockbett(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-1,1].forEach(s=>[-1.95,1.95].forEach(c=>{ walze(g,.1,3.1,HOLZ2,c,1.55,s*.8); ball(g,.13,GOLD,c,3.14,s*.8); }));
  [.65,2.1].forEach((y,i)=>{ box(g,4.0,.2,1.7,HOLZ,0,y,0); box(g,3.8,.24,1.54,CREME,0,y+.2,0); box(g,2.5,.15,1.6,i?BLAU:ROT,.6,y+.34,0); box(g,.18,.17,1.62,WEISS,-.5,y+.34,0); ball(g,.42,WEISS,-1.45,y+.42,0,1,.45,1.35); });
  box(g,2.6,.14,.1,HELLHOLZ,.5,2.75,.82);
  [1.0,1.75].forEach(a=>strich(g,[a,0,1.05],[a,2.55,.9],.06,HELLHOLZ)); for(let i=0;i<5;i++) strich(g,[1.0,.35+i*.46,1.03-i*.027],[1.75,.35+i*.46,1.03-i*.027],.045,HELLHOLZ);
}
function buecherregal(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,3.0,3.0,.12,HOLZ3,0,1.5,-.4); [-1.46,1.46].forEach(a=>box(g,.14,3.0,.9,HOLZ2,a,1.5,0)); [.1,1.05,2.0,2.95].forEach(y=>box(g,3.06,.11,.95,HELLHOLZ,0,y,0));
  const F=[ROT,BLAU,GRUEN,GELB,ORANGE,0x8a5ab0];
  [.15,1.1].forEach((y,r)=>{ let a=-1.28, i=r*2; while(a<(r?.3:1.2)){ const w=.14+zufall()*.1, h=.58+zufall()*.22; box(g,w,h,.6,F[i%6],a+w/2,y+h/2,.04); a+=w+.025; i++; } });
  ball(g,.34,0x3a8ad8,.85,1.5,.06); flach(ring(g,.37,.025,GOLD,.85,1.5,.06)).rotation.x=1.2;
  FW.helm(g,-.75,2.06,.05,0xf4f0e8,1.1,.2); box(g,.9,.5,.6,0xc8a468,.55,2.3,.04); box(g,.4,.07,.02,HOLZ3,.55,2.38,.35);
}
function kicker(par,x,z){
  const g=gruppe(par,x,0,z);
  [-1.35,1.35].forEach(a=>[-.65,.65].forEach(c=>walze(g,.13,1.0,HOLZ3,a,.5,c)));
  box(g,3.2,.14,1.7,HOLZ,0,1.0,0); [-.82,.82].forEach(c=>box(g,3.2,.44,.12,HOLZ,0,1.24,c)); [-1.56,1.56].forEach(a=>box(g,.12,.44,1.7,HOLZ,a,1.24,0));
  box(g,2.96,.04,1.52,0x3a9a4a,0,1.1,0); box(g,.04,.01,1.5,WEISS,0,1.13,0); flach(ring(g,.28,.015,WEISS,0,1.13,0)); [-1.49,1.49].forEach(a=>box(g,.03,.22,.55,SCHWARZ,a,1.2,0));
  [-1.05,-.35,.35,1.05].forEach((a,i)=>{ flach(walze(g,.035,2.35,METALL,a,1.46,0)); [-1.2,1.2].forEach(c=>flach(walze(g,.09,.28,SCHWARZ,a,1.46,c)));
    [-.45,0,.45].forEach(c=>{ box(g,.1,.3,.17,i%2?BLAU:ROT,a,1.36,c); ball(g,.085,0xf0c8a0,a,1.58,c); }); });
  ball(g,.08,WEISS,.1,1.2,.22);
}
function stehlampe(par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,.5,.12,EISEN,0,.06,0); walze(g,.06,3.0,METALL2,0,1.55,0); rohr(g,.4,.7,.75,basis(0xffdc90),0,3.3,0,18,false); flach(ring(g,.7,.045,ORANGE,0,2.94,0)); flach(ring(g,.4,.04,ORANGE,0,3.67,0));
  schein(g,'rgba(255,210,120,.5)',0,3.2,.5,2.2);
}
function pflanze(par,x,z,s){
  const g=gruppe(par,x,0,z);
  rohr(g,.5*s,.36*s,.7*s,0xb85a30,0,.35*s,0); flach(ring(g,.5*s,.055,0x8a3a1c,0,.7*s,0)); walze(g,.45*s,.05,0x4a2c14,0,.68*s,0);
  for(let i=0;i<11;i++){ const a=i*2.4, h=1.15+((i*37)%11)*.09, ra=.2+(i%3)*.16, p=[Math.cos(a)*ra*s,h*s,Math.sin(a)*ra*s]; strich(g,[0,.7*s,0],p,.025,LAUB3); const b=ball(g,.27*s,[LAUB,LAUB2,LAUB3][i%3],p[0],p[1],p[2],.75,1.25,.35); b.rotation.y=-a; }
}
function sitzbank(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-.26,.26].forEach(c=>box(g,3.2,.14,.46,HELLHOLZ,0,.66,c)); [-1.35,1.35].forEach(a=>box(g,.18,.6,.85,EISEN,a,.3,0)); box(g,2.6,.1,.1,EISEN,0,.25,0);
  box(g,1.0,.2,.75,ROT,.85,.83,0); box(g,.14,.215,.77,WEISS,.85,.835,0);
}
/* Kiste mit aufgerollten Schläuchen */
function schlauchkiste(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,2.4,.12,1.2,HOLZ2,0,.1,0); [-.56,.56].forEach(c=>box(g,2.4,.55,.1,HOLZ,0,.4,c)); [-1.15,1.15].forEach(a=>box(g,.1,.55,1.2,HOLZ,a,.4,0));
  [-.7,0,.7].forEach((a,i)=>{ const r=FW.schlauchrolle(g,a,.86,0,.5,i===1?0xd8402a:0xe8dcc0); r.rotation.y=Math.PI/2+(i-1)*.12; });
}
function stuhl(g,x,z,dreh){
  const s=gruppe(g,x,0,z); s.rotation.y=dreh;
  [-.34,.34].forEach(a=>[-.34,.34].forEach(c=>walze(s,.065,.8,HOLZ2,a,.4,c)));
  box(s,.9,.12,.9,HOLZ,0,.85,0); box(s,.72,.1,.72,ROT,0,.94,.02);
  [-.34,.34].forEach(a=>walze(s,.065,1.1,HOLZ2,a,1.4,-.38)); box(s,.86,.34,.1,HOLZ,0,1.75,-.38); box(s,.74,.12,.08,HOLZ,0,1.3,-.38);
}
/* flacher Teppich */
function teppich(par,x,z,w,d,farben){
  farben.forEach((f,i)=>hell(box(par,w-i*.5,.012,d-i*.5,f,x,.008+i*.005,z)));
}

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  const h=FW.huelle(k,{ B,T,H, himmelLicht:0xfff0d8, grund:0x5a4636, staerke:.74, sonne:0xffe4b8, sonneStaerke:.38,
    wandBild:FW.putzBild('#f4e6c6'), bodenBild:FW.dielenBild([184,134,86],'#4a2c14'), leiste:HOLZ2, sockel:0, oeffnung:{x:AX,b:3.8,h:4.4} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueTuer(k,sc,hinten);
  rutschstange(k,sc);

  /* ---------- rotes Sockelband mit weißer Leiste ---------- */
  const dh=gruppe(hinten,0,0,0), dl=gruppe(links,0,0,0), dr=gruppe(rechts,0,0,0), LX=-B/2, RX=B/2, LD=Math.PI/2, RD=-Math.PI/2;
  [[-B/2,AX-2.15],[AX+2.15,B/2]].forEach(([a,b])=>{ box(dh,b-a,1.25,.08,ROT,(a+b)/2,.625,HINTEN+.03); box(dh,b-a,.14,.12,WEISS,(a+b)/2,1.3,HINTEN+.05); box(dh,b-a,.16,.12,ROT2,(a+b)/2,.08,HINTEN+.05); });
  [[dl,LX,1],[dr,RX,-1]].forEach(([g,x,v])=>{ box(g,.08,1.25,T,ROT,x+v*.03,.625,0); box(g,.12,.14,T,WEISS,x+v*.05,1.3,0); box(g,.12,.16,T,ROT2,x+v*.05,.08,0); box(g,.3,.28,T,HOLZ2,x+v*.15,6.2,0); });
  box(dh,B,.28,.3,HOLZ2,0,6.2,HINTEN+.15);

  /* ---------- Rückwand ---------- */
  fenster(dh,-15.7,3.5,HINTEN,0,0); wandlampe(dh,17.0,3.9,HINTEN);
  wimpel(dh,-17.6,-9.0,5.9,HINTEN+.3); wimpel(dh,-4.6,.8,5.85,HINTEN+.2); wimpel(dh,.8,5.8,5.85,HINTEN+.2);
  wandlampe(dh,-9.4,3.7,HINTEN); wandlampe(dh,.15,4.0,HINTEN); wandlampe(dh,5.35,4.0,HINTEN);
  /* ---------- links ---------- */
  geschirrbrett(dl,LX,4.1,-9.4,LD); wandbild(dl,LX,4.45,-1.7,LD,'#f8d8a0'); fenster(dl,LX,4.4,3.1,LD,1); jackenhaken(dl,LX,3.55,7.7,LD); fenster(dl,LX,3.6,11.0,LD,3);
  wandlampe(dl,LX,3.9,-3.8,LD); wandlampe(dl,LX,3.9,.4,LD); wandlampe(dl,LX,3.9,5.6,LD);
  /* ---------- rechts ---------- */
  fenster(dr,RX,3.5,-8.6,RD,2); wandbild(dr,RX,4.45,-3.6,RD); pokalbrett(dr,RX,3.9,4.3,RD); jackenhaken(dr,RX,3.5,9.4,RD); fenster(dr,RX,3.6,.2,RD,0);
  wandlampe(dr,RX,3.9,-5.9,RD); wandlampe(dr,RX,3.9,2.1,RD); wandlampe(dr,RX,3.9,6.6,RD);
  [dh,dl,dr].forEach(g=>{ verschmelze(g); ohneSchatten(g); });

  /* ---------- Möbel am Boden ---------- */
  const v=gruppe(sc,0,0,0);
  /* Küche */
  spuele(v,-9.4,-12.75); k.kasten(-9.4,-12.75,1.95,1.35);
  kuehlschrank(v,-17.15,-11.6,LD); k.kasten(-17.15,-11.6,1.25,1.6);
  pflanze(v,-15.2,-12.6,1.0); k.kreis(-15.2,-12.6,.65);
  pflanze(v,17.0,-12.4,1.15); k.kreis(17.0,-12.4,.75);
  stehlampe(v,-14.1,-8.3); k.kreis(-14.1,-8.3,.55);
  /* links */
  stockbett(v,-16.9,3.1,LD); k.kasten(-16.65,3.1,2.4,4.15);
  buecherregal(v,-17.2,-1.7,LD); k.kasten(-17.2,-1.7,1.05,3.1);
  schlauchkiste(v,-16.9,10.8,LD); k.kasten(-16.9,10.8,1.35,2.5);
  /* rechts */
  buecherregal(v,17.2,-3.6,RD); k.kasten(17.2,-3.6,1.05,3.1);
  schlauchkiste(v,16.9,4.6,RD); k.kasten(16.9,4.6,1.35,2.5);
  pflanze(v,16.9,7.0,1.0); k.kreis(16.9,7.0,.65);
  sitzbank(v,16.9,11.0,RD); k.kasten(16.9,11.0,1.05,3.3);
  /* Mitte und vorn */
  kicker(v,10.6,6.2); k.kasten(10.6,6.2,3.35,2.75);
  sitzbank(v,-11.4,12.3,0); k.kasten(-11.4,12.3,3.3,1.05);
  pflanze(v,-7.4,12.3,.9); k.kreis(-7.4,12.3,.6);
  schlauchkiste(v,4.8,12.2,.05); k.kasten(4.8,12.2,2.5,1.4);
  sitzbank(v,11.4,12.3,0); k.kasten(11.4,12.3,3.3,1.05);
  pflanze(v,-12.6,-8.2,.9); k.kreis(-12.6,-8.2,.6);
  verschmelze(v);

  /* Teppiche und Küchenfliesen (flach, nicht fest) */
  const tp=gruppe(sc,0,0,0);
  const fl=FW.fliesenBild('#f0ece0','#c8584a','#8a7a68'); const ft=new THREE.Mesh(new THREE.PlaneGeometry(7.2,3.0),new THREE.MeshLambertMaterial({map:fl})); ft.rotation.x=-Math.PI/2; ft.position.set(-7.4,.006,-12.0); ft.receiveShadow=true; sc.add(ft);
  teppich(tp,-7.0,-1.1,7.2,5.0,[0x2f5a8a,0xe8c870,0x35689a,0x4a80b0]);
  teppich(tp,-.8,-6.9,6.4,3.8,[0x9c2a20,0xf0dcb0,0xb83a2c,0xc85a3a]);
  teppich(tp,10.6,6.2,4.8,3.8,[0x3a6a44,0xd8c890,0x4a8454]);
  verschmelze(tp); ohneSchatten(tp);

  /* ---------- Einsatzkräfte in der Pause ---------- */
  FW.mensch(k,sc,-12.8,5.6,.9,{ haut:1, helm:false, anzug:0x2a4a8a, phase:1 }); k.kreis(-12.8,5.6,.55);
  FW.mensch(k,sc,14.6,5.4,-1.2,{ haut:2, helm:false, phase:3, winkt:false }); k.kreis(14.6,5.4,.55);

  /* ---------- Licht (mit der Türlampe fünf Punktlichter) ---------- */
  flacker(k,-7.0,4.2,-10.4,0xffd8a0,.35,12);
  flacker(k,-13.4,3.4,-7.6,0xffc070,.4,11);
  flacker(k,-13.6,3.9,2.0,0xffd090,.3,14);
  flacker(k,14.4,3.9,.6,0xffd090,.3,14);

  return { tuer, start:[1.8,2.0] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.4,-10.0],[-9.4,-9.0],[-4.6,-5.0],[1.6,-10.2],[5.2,-9.4],[13.0,-11.4],[-13.6,-2.0],[-1.8,-2.6],[4.6,-4.6],[10.2,-6.0],
  [14.4,-3.0],[-13.8,9.2],[-7.4,4.4],[-4.6,9.8],[2.2,4.6],[2.0,10.6],[8.2,8.8],[14.4,8.4],[11.2,2.0],[-9.6,8.6]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-12.0, z:HINTEN, wand:'hinten', steh:[-12.0,-11.2], kasten:[3.6,.8], treffer:[3.6,2.7,.8], trefferY:1.75, baue(g,k){ /* 1 Dienstplan */
      box(g,3.55,2.55,.1,METALL,0,3.1,.09); FW.tafel(g,planBild(),3.3,2.27,0,3.1,.15);
      [-1.75,1.75].forEach(x=>[1.86,4.34].forEach(y=>ball(g,.09,EISEN,x,y,.14)));
      /* dicke Magnete */
      [[-.55,3.55,BLAU],[.45,3.05,ROT],[1.2,3.55,GRUEN],[1.2,2.2,GELB],[-.55,2.55,ORANGE],[.0,2.2,BLAU]].forEach(([x,y,f])=>{ flach(walze(g,.13,.09,f,x,y,.2)); ball(g,.045,WEISS,x-.04,y+.04,.25); });
      /* Ablage mit Stiften */
      box(g,2.4,.09,.3,METALL2,0,1.76,.24); [[-.6,ROT],[0,BLAU],[.6,GRUEN]].forEach(([x,f])=>{ quer(walze(g,.05,.46,f,x,1.86,.28)); quer(walze(g,.055,.12,SCHWARZ,x+.27,1.86,.28)); }); } },
  { x:-2.2, z:HINTEN, wand:'hinten', steh:[-2.2,-11.3], kasten:[2.4,.8], treffer:[2.3,2.4,.8], trefferY:2.2, baue(g,k){ /* 2 Wachuhr */
      flach(walze(g,1.08,.2,ROT,0,3.4,.14)); ring(g,1.06,.1,ROT2,0,3.4,.24); flach(walze(g,.9,.06,WEISS,0,3.4,.25)); ring(g,.91,.035,METALL,0,3.4,.28);
      for(let i=0;i<12;i++){ const a=i*Math.PI/6, gross=i%3===0, r=gross?.68:.73; const s=box(g,gross?.09:.045,gross?.24:.14,.02,SCHWARZ,Math.sin(a)*r,3.4+Math.cos(a)*r,.29); s.rotation.z=-a; }
      const zeiger=(l,d,zz,f)=>{ const q=gruppe(g,0,3.4,zz); q.userData.lebendig=true; box(q,d,l,.025,f,0,l/2-.09,0); return q; };
      const std=zeiger(.54,.12,.31,SCHWARZ), min=zeiger(.78,.075,.34,SCHWARZ), sek=zeiger(.86,.03,.37,ROT); ball(g,.09,ROT,0,3.4,.38);
      /* kleine Glocke oben und Helm-Zeichen */
      ball(g,.2,GOLD,0,4.56,.2,1,.8,.8); ball(g,.06,GOLD,0,4.75,.2); box(g,.2,.2,.1,METALL2,0,4.42,.12);
      k.anim.push(t=>{ sek.rotation.z=-Math.floor(t)*Math.PI/30; min.rotation.z=-1.05-t*.015; std.rotation.z=1.05-t*.00125; }); } },
  { x:-16.85, z:-6.1, dreh:Math.PI/2, steh:[-14.8,-6.1], kasten:[1.5,3.3], treffer:[3.2,4.2,1.5], baue(g,k){ /* 3 Spind */
      const F=0x7e94ac, D=0x5a7088;
      box(g,3.1,3.35,1.1,D,0,1.82,0); box(g,3.2,.14,1.2,EISEN,0,3.55,0); [-1.35,1.35].forEach(a=>box(g,.2,.18,.9,EISEN,a,.09,0));
      [-1.02,0,1.02].forEach((a,i)=>{ box(g,.94,3.12,.07,F,a,1.82,.57);
        for(let j=0;j<4;j++){ box(g,.56,.05,.03,SCHWARZ,a,3.1-j*.13,.62); box(g,.56,.05,.03,SCHWARZ,a,.75-j*.13,.62); }
        box(g,.52,.26,.03,WEISS,a,2.45,.62); box(g,.34,.06,.02,[ROT,BLAU,GRUEN][i],a,2.45,.645);
        box(g,.09,.36,.1,METALL,a+.28,1.65,.65); ball(g,.075,GOLD,a+.28,1.35,.63,1,1,.5); });
      /* Helm obendrauf, Haken mit Handschuhen an der Tür */
      FW.helm(g,-.75,3.62,.08,WEISS,1.65,.25);
      box(g,.9,.3,.75,0x8a5a30,.75,3.77,0); box(g,.94,.08,.79,HOLZ3,.75,3.95,0);
      [-.12,.14].forEach(a=>{ box(g,.22,.34,.1,ORANGE,-1.02+a,1.75,.68); box(g,.2,.1,.11,SCHWARZ,-1.02+a,1.96,.68); }); } },
  { x:-7.0, z:-1.2, steh:[-7.0,1.25], kasten:[5.5,3.4], treffer:[5.2,2.4,3.1], baue(g,k){ /* 4 Esstisch mit Stühlen, Teekanne, Brot und Obst */
      [-1.6,1.6].forEach(a=>[-.8,.8].forEach(c=>walze(g,.13,1.3,HOLZ2,a,.65,c)));
      box(g,3.8,.16,2.1,HOLZ,0,1.36,0); box(g,3.4,.16,1.7,HOLZ2,0,1.22,0);
      /* karierte Tischdecke in der Mitte */
      box(g,1.5,.03,2.14,ROT,0,1.45,0); [-.5,0,.5].forEach(a=>box(g,.12,.035,2.15,WEISS,a,1.452,0)); [-.7,0,.7].forEach(c=>box(g,1.52,.037,.12,WEISS,0,1.453,c));
      [-1.5,1.5].forEach(a=>box(g,.01,.3,.01,ROT,a*.5,1.3,1.07));
      stuhl(g,-2.2,.1,Math.PI/2); stuhl(g,2.2,.1,-Math.PI/2); stuhl(g,-.9,-1.2,0); stuhl(g,.9,-1.2,0);
      /* Gedecke */
      [[-1.3,.55,ROT],[1.3,.55,BLAU],[-1.3,-.55,GELB],[1.3,-.55,GRUEN]].forEach(([x,z,f])=>{ walze(g,.36,.04,WEISS,x,1.47,z); flach(ring(g,.27,.025,f,x,1.495,z));
        rohr(g,.15,.12,.3,f,x+(x<0?.5:-.5),1.6,z); walze(g,.125,.02,0xa8601c,x+(x<0?.5:-.5),1.75,z); ring(g,.08,.025,f,x+(x<0?.67:-.67),1.6,z); box(g,.05,.02,.5,METALL,x-(x<0?.46:-.46),1.465,z); });
      /* Teekanne */
      const t=gruppe(g,-.2,1.47,.3); ball(t,.4,0x2a68b8,0,.37,0,1.05,.9,1); walze(t,.22,.07,0x1c4a88,0,.72,0); ball(t,.1,GOLD,0,.82,0); strich(t,[.32,.3,0],[.62,.46,0],.09,0x2a68b8); strich(t,[.62,.46,0],[.74,.7,0],.06,0x2a68b8); ring(t,.22,.055,0x1c4a88,-.44,.4,0);
      [[0,.4,.39],[-.22,.28,.32],[.22,.28,.32]].forEach(([a,y,c])=>ball(t,.055,WEISS,a,y,c,1,1,.4));
      /* Brotkorb hinten, Obstschale */
      rohr(g,.5,.36,.26,0xc89448,.3,1.6,-.5); flach(ring(g,.5,.05,0xa87430,.3,1.73,-.5)); [-.22,.02,.26].forEach((a,i)=>ball(g,.19,i%2?0xe0a858:0xc8823a,.3+a,1.76,-.5,.85,.75,1.5));
      [[-.62,-.45,ROT],[-.42,-.55,0x8ac040],[-.5,-.3,ORANGE]].forEach(([x,z,f])=>{ ball(g,.15,f,x,1.64,z); walze(g,.015,.1,HOLZ3,x,1.82,z); }); walze(g,.36,.07,METALL,-.52,1.49,-.43);
      const dampf=[0,1,2].map(i=>{ const m=basis(0xffffff,{transparent:true,opacity:.5,depthWrite:false}); return hell(ball(g,.1,m,.55,2.3,.3)); });
      k.anim.push(tt=>dampf.forEach((d,i)=>{ const u=(tt*.4+i/3)%1; d.position.set(.55+Math.sin(u*6+i)*.12*u, 2.24+u*.75, .3); d.scale.setScalar(.04+u*.12); d.material.opacity=.55*(1-u); })); } },
  { x:14.1, z:-8.4, dreh:-.3, steh:[13.3,-6.2], kasten:[3.1,1.9], treffer:[2.9,3.6,1.5], baue(g,k){ /* 5 Einsatzstiefel mit Hose */
      box(g,2.9,.1,1.7,GUMMI,0,.05,.05); box(g,2.7,.02,.1,GELB,0,.11,.82);
      /* Gestell */
      [-1.3,1.3].forEach(a=>{ walze(g,.09,3.3,HOLZ2,a,1.65,-.55); ball(g,.14,GOLD,a,3.35,-.55); box(g,.22,.12,1.2,HOLZ3,a,.16,-.35); });
      quer(walze(g,.09,2.75,HOLZ,0,3.15,-.55));
      /* Hose */
      const N=0x2a3c6a, N2=0x1c2a4e;
      [-.46,.46].forEach(a=>{ rohr(g,.37,.34,1.35,N,a,1.5,0); walze(g,.375,.15,STREIF,a,1.18,0); walze(g,.362,.06,METALL,a,1.04,0); box(g,.4,.4,.08,N2,a,1.7,.34); flach(ring(g,.35,.055,N2,a,.84,0)); });
      box(g,1.62,.55,.72,N,0,2.35,0); box(g,1.68,.16,.78,N2,0,2.68,0); box(g,.28,.22,.08,GOLD,0,2.68,.41); box(g,.05,.55,.04,N2,0,2.3,.38);
      /* rote Hosenträger über die Stange */
      [-.52,.52].forEach(a=>{ strich(g,[a,2.7,.36],[a*.82,3.23,-.45],.07,ROT); strich(g,[a*.82,3.23,-.45],[a*.9,2.72,-.62],.07,ROT); box(g,.2,.14,.08,METALL,a,2.72,.42); });
      strich(g,[-.46,2.98,-.08],[.46,2.98,-.08],.05,ROT);
      /* Stiefel */
      [-.5,.5].forEach(a=>{ const s=gruppe(g,a,.1,.08); s.rotation.y=a*.35;
        box(s,.66,.16,1.2,SCHWARZ,0,.09,.18); ball(s,.33,0x26262c,0,.34,.48,1,.82,1.3); ball(s,.24,GELB,0,.27,.77,1.15,.65,.8);
        rohr(s,.33,.34,.72,0x26262c,0,.5,0); flach(ring(s,.345,.06,GELB,0,.84,0)); box(s,.16,.28,.06,GELB,0,.98,.32); }); } },
  { x:2.8, z:HINTEN, wand:'hinten', steh:[2.8,-11.2], kasten:[3.5,.8], treffer:[3.4,2.8,.8], trefferY:1.75, baue(g,k){ /* 6 Berufe-Plakat */
      box(g,3.34,2.58,.07,0xf0701a,0,3.1,.07); FW.tafel(g,berufeBild(),3.14,2.36,0,3.1,.115);
      [-1.45,1.45].forEach(x=>[2.0,4.2].forEach(y=>{ flach(walze(g,.12,.09,BLAU,x,y,.17)); ball(g,.04,WEISS,x-.03,y+.04,.22); })); } },
  { x:7.7, z:1.2, dreh:-.15, steh:[7.35,3.35], r:1.25, treffer:[2.4,2.7,1.5], baue(g,k){ /* 7 Erste-Hilfe-Koffer auf einem Hocker */
      [-.9,.9].forEach(a=>[-.42,.42].forEach(c=>walze(g,.09,.95,METALL2,a,.48,c))); box(g,2.3,.13,1.25,HELLHOLZ,0,1.0,0); box(g,1.9,.07,.9,HOLZ2,0,.4,0);
      const F=0x1f9a58, D=0x11703c;
      box(g,2.0,1.25,.68,F,0,1.72,-.1); [-1,1].forEach(a=>[1.13,2.31].forEach(y=>ball(g,.13,D,a*.97,y,-.1,1,1,2.6)));
      box(g,2.04,.07,.72,D,0,2.05,-.1);
      flach(walze(g,.48,.05,D,0,1.66,.25)); box(g,.24,.74,.04,WEISS,0,1.66,.29); box(g,.74,.24,.045,WEISS,0,1.66,.29);
      [-.68,.68].forEach(a=>{ box(g,.2,.26,.1,METALL,a,2.07,.27); box(g,.12,.07,.12,EISEN,a,2.04,.29); });
      [-.34,.34].forEach(a=>walze(g,.07,.26,SCHWARZ,a,2.46,-.1)); quer(walze(g,.09,.8,SCHWARZ,0,2.6,-.1));
      /* Verbandrolle und Pflasterschachtel davor und darunter */
      flach(walze(g,.18,.24,WEISS,-.75,1.25,.42)); flach(ring(g,.1,.025,0xd8d0c0,-.75,1.25,.55)).rotation.x=0; box(g,.42,.03,.16,WEISS,-.48,1.085,.5);
      box(g,.5,.22,.3,0xf4d8a8,.68,1.18,.43); box(g,.3,.06,.02,ROT,.68,1.19,.59);
      quer(walze(g,.2,.55,0x4aa0d8,-.4,.63,0)); box(g,.6,.35,.5,WEISS,.45,.62,0); } },
  { x:14.9, z:.8, dreh:-.4, steh:[12.95,1.7], r:1.0, treffer:[1.8,3.4,1.6], baue(g,k){ /* 8 Feuerlöscher */
      walze(g,.82,.12,EISEN,0,.06,0); flach(ring(g,.78,.05,GELB,0,.13,0));
      const lack=new THREE.MeshPhongMaterial({color:0xe02418,emissive:0x2a0400,specular:0xffffff,shininess:60});
      walze(g,.52,2.0,lack,0,1.25,0); ball(g,.52,lack,0,2.25,0,1,.6,1); walze(g,.54,.14,EISEN,0,.24,0);
      /* Aufkleber mit Bildzeichen */
      box(g,.62,.88,.04,WEISS,0,1.35,.51); ball(g,.15,ORANGE,0,1.47,.54,1,1,.2); kegel(g,.13,.3,ORANGE,0,1.66,.54).scale.z=.02; ball(g,.07,GELB,0,1.43,.57,1,1,.2); [1.12,.99].forEach(y=>box(g,.42,.05,.02,EISEN,0,y,.54));
      /* Ventil mit Hebel und Druckanzeige */
      walze(g,.2,.34,METALL2,0,2.68,0); walze(g,.25,.09,METALL,0,2.58,0);
      box(g,.72,.09,.2,EISEN,-.22,3.04,0); const hb=box(g,.72,.09,.2,EISEN,-.22,2.84,0); hb.rotation.z=.06; walze(g,.06,.26,METALL2,0,2.93,0); ring(g,.11,.025,GELB,.14,3.06,0);
      flach(walze(g,.15,.1,GOLD,0,2.7,.22)); flach(walze(g,.11,.03,WEISS,0,2.7,.28)); box(g,.03,.1,.01,ROT,.02,2.73,.3);
      /* schwarzer Schlauch mit rundem Trichter */
      [[[.15,2.7,0],[.6,2.72,.08]],[[.6,2.72,.08],[.82,2.3,.18]],[[.82,2.3,.18],[.8,1.4,.28]],[[.8,1.4,.28],[.72,1.0,.34]]].forEach(([a,b])=>{ strich(g,a,b,.085,SCHWARZ); ball(g,.087,SCHWARZ,b[0],b[1],b[2]); });
      rohr(g,.09,.2,.42,SCHWARZ,.72,.8,.34); flach(ring(g,.2,.03,METALL,.72,.59,.34)); box(g,.35,.1,.12,METALL2,.55,1.45,.26); } },
  { x:-6.6, z:-12.45, steh:[-6.6,-10.4], kasten:[2.9,1.7], treffer:[2.8,4.6,1.7], baue(g,k){ /* 9 Küchenherd mit Suppentopf */
      const E=0xfaf4e4;
      box(g,2.7,1.45,1.5,E,0,.82,0); box(g,2.5,.14,1.3,EISEN,0,.07,0); box(g,2.82,.12,1.6,SCHWARZ,0,1.6,0); box(g,2.7,.55,.12,E,0,1.9,-.72);
      /* Backofentür mit warmem Fenster und Drehknöpfe */
      box(g,1.9,.82,.08,METALL,0,.66,.76); box(g,1.5,.52,.04,SCHWARZ,0,.62,.81); box(g,1.34,.38,.03,basis(0xe8862a),0,.62,.83); [-.3,.3].forEach(a=>box(g,.03,.38,.02,SCHWARZ,a,.62,.85));
      quer(walze(g,.05,1.6,METALL2,0,1.0,.92)); [-.75,.75].forEach(a=>box(g,.08,.08,.16,METALL2,a,1.0,.84));
      [-1.0,-.5,0,.5,1.0].forEach(a=>{ flach(walze(g,.12,.12,ROT,a,1.33,.8)); box(g,.03,.13,.02,WEISS,a,1.36,.87); });
      /* Platten */
      [[.85,.35],[.85,-.35]].forEach(([x,z])=>{ walze(g,.34,.04,EISEN,x,1.68,z); flach(ring(g,.2,.025,METALL2,x,1.71,z)); });
      walze(g,.72,.05,basis(0xff7a28),-.4,1.69,.05);
      /* großer roter Suppentopf mit Kelle und klapperndem Deckel */
      const rot=new THREE.MeshPhongMaterial({color:0xd8281c,specular:0xffffff,shininess:50});
      walze(g,.68,.9,rot,-.4,2.17,.05); flach(ring(g,.68,.055,WEISS,-.4,2.62,.05)); walze(g,.62,.04,0xe8a030,-.4,2.6,.05);
      [[-.25,.2,ORANGE],[-.62,.28,0x5aa83a],[-.1,-.2,0x5aa83a],[-.55,-.15,ORANGE]].forEach(([x,z,f])=>ball(g,.09,f,x,2.63,z+.05,1,.5,1));
      [-1,1].forEach(s=>{ const r=ring(g,.19,.055,METALL,-.4+s*.76,2.4,.05); r.rotation.x=Math.PI/2; });
      [[0,2.0,.73],[-.34,2.3,.66],[.34,2.25,.66],[-.2,1.9,.69],[.22,2.45,.66]].forEach(([a,y,c])=>ball(g,.07,WEISS,-.4+a,y,c,1,1,.35));
      const deckel=gruppe(g,-.78,2.78,.05); deckel.userData.lebendig=true; walze(deckel,.66,.07,rot,0,0,0); ball(deckel,.5,rot,0,.01,0,1,.25,1); ball(deckel,.12,SCHWARZ,0,.18,0); deckel.rotation.z=.42;
      strich(g,[.0,2.55,.1],[.5,3.14,.2],.045,METALL); ring(g,.08,.025,METALL,.54,3.19,.2);
      /* kleiner Wasserkessel rechts */
      ball(g,.32,0x3aa89a,.85,1.98,.35,1,.85,1); walze(g,.14,.07,SCHWARZ,.85,2.26,.35); strich(g,[1.08,1.95,.4],[1.35,2.2,.45],.055,0x3aa89a); ring(g,.22,.035,SCHWARZ,.85,2.24,.35,Math.PI);
      /* Dunstabzugshaube */
      const hg=gruppe(g,0,4.15,-.35); hg.scale.z=.55; rohr(hg,.55,1.75,.75,METALL,0,0,0,4).rotation.y=Math.PI/4; box(g,2.52,.16,1.0,METALL2,0,3.76,-.35); box(g,.7,1.4,.5,METALL,0,5.2,-.65);
      /* Kellen an der Wand */
      quer(walze(g,.035,1.9,METALL2,0,2.95,-.88)); [[-.8,.14],[-.3,.11],[.35,.17],[.8,.1]].forEach(([a,r])=>{ walze(g,.028,.55,METALL,a,2.64,-.86); ball(g,r,METALL,a,2.32,-.86,1,1,.45); });
      const dampf=[0,1,2,3,4,5,6].map(i=>{ const m=basis(0xffffff,{transparent:true,opacity:.5,depthWrite:false}); return hell(ball(g,.1,m,-.4,2.8,.1)); });
      k.anim.push(t=>{ deckel.position.y=2.78+Math.max(0,Math.sin(t*7))*.05; deckel.rotation.z=.42+Math.sin(t*9)*.03;
        dampf.forEach((d,i)=>{ const u=(t*.38+i/7)%1; d.position.set(-.15+Math.sin(u*7+i*2)*.25*u, 2.72+u*1.5, .25+Math.cos(u*5+i)*.14*u); d.scale.setScalar(.08+u*.24); d.material.opacity=.65*(1-u); }); }); } },
  { x:-.7, z:-7.3, steh:[-.7,-5.0], kasten:[4.8,1.9], treffer:[4.6,2.6,1.9], baue(g,k){ /* 10 Sofa mit Wachkatze */
      [-2.0,2.0].forEach(a=>[-.6,.6].forEach(c=>walze(g,.11,.24,HOLZ3,a,.12,c)));
      box(g,4.4,.5,1.7,SOFABLAU2,0,.48,0); [-1.0,1.0].forEach(a=>box(g,1.94,.34,1.42,SOFABLAU,a,.88,.14));
      box(g,4.4,1.45,.45,SOFABLAU2,0,1.4,-.66); [-1.0,1.0].forEach(a=>{ box(g,1.9,.95,.24,SOFABLAU,a,1.58,-.38); quer(walze(g,.16,1.9,SOFABLAU,a,2.05,-.4)); });
      [-2.18,2.18].forEach(a=>{ box(g,.45,.95,1.7,SOFABLAU2,a,.95,0); flach(walze(g,.3,1.72,SOFABLAU,a,1.43,0)); });
      /* Kissen und gefaltete Decke */
      const ki=ball(g,.48,GELB,-1.55,1.45,-.12,1,1,.42); ki.rotation.z=.3; ball(g,.09,ORANGE,-1.55,1.45,.1);
      box(g,.9,.14,1.2,ROT,-.62,1.12,.22); box(g,.92,.15,.14,WEISS,-.62,1.122,.45); box(g,.9,.6,.08,ROT,-.62,.82,.9); box(g,.92,.1,.09,WEISS,-.62,.72,.905);
      /* Wachkatze: liegt auf dem Sitz, hebt den Kopf */
      const F=0xf09030, D=0xb05a14, W=0xfff4e4;
      const katz=gruppe(g,.75,1.05,.22); katz.userData.lebendig=true; katz.scale.setScalar(1.18);
      const leib=gruppe(katz,0,0,0); ball(leib,.44,F,0,.34,0,1.45,.82,1); [-.28,.02,.3].forEach(x=>ball(leib,.4,D,x-.08,.4,0,.17,.9,1.06)); ball(leib,.27,F,-.42,.28,.18,1.1,.85,.9);
      verschmelze(leib);
      ball(katz,.24,W,.46,.3,.16,.9,1.05,1); [.02,.34].forEach(c=>ball(katz,.13,W,.72,.09,c,1.5,.65,.9));
      const kopf=gruppe(katz,.58,.76,.2); const k2=gruppe(kopf,0,0,0);
      ball(k2,.33,F,0,0,0,1.05,.95,1); [-.15,.15].forEach(s=>{ const o=kegel(k2,.13,.28,F,s*1.15,.33,0); o.rotation.z=-s*2.2; const i=kegel(k2,.07,.18,0xf0a0a0,s*1.15,.32,.07); i.rotation.z=-s*2.2; });
      [-.1,.1].forEach(s=>ball(k2,.13,W,s*.85,-.1,.25,1.1,.8,.8)); ball(k2,.045,0xe06878,0,-.04,.37,1.2,.8,.8);
      [-.08,0,.08].forEach(x=>ball(k2,.04,D,x,.24,.22,.5,1.6,.8));
      [-1,1].forEach(s=>[-.05,.03].forEach(y=>strich(k2,[s*.12,-.09,.33],[s*.52,-.09+y,.3],.007,WEISS)));
      verschmelze(k2);
      const augen=gruppe(kopf,0,.06,.29); [-.13,.13].forEach(x=>{ ball(augen,.075,0x7ae050,x,0,0,1,1,.55); ball(augen,.05,SCHWARZ,x,0,.03,.45,1.25,.55); ball(augen,.018,WEISS,x+.02,.025,.065); });
      /* rotes Halsband mit Glöckchen */
      flach(ring(katz,.23,.05,ROT,.55,.52,.19)); ball(katz,.075,GOLD,.62,.45,.43);
      const schwanz=gruppe(katz,-.58,.22,.12); strich(schwanz,[0,0,0],[-.2,-.04,.3],.1,F); strich(schwanz,[-.2,-.04,.3],[.18,-.08,.52],.09,F); ball(schwanz,.1,F,-.2,-.04,.3); ball(schwanz,.11,D,.2,-.08,.53);
      k.anim.push(t=>{ leib.scale.y=1+Math.sin(t*2.2)*.045; kopf.rotation.y=Math.sin(t*.7)*.35; kopf.rotation.z=Math.sin(t*1.1)*.08; augen.scale.y=(t%4)<.18?.12:1; schwanz.rotation.y=Math.sin(t*2.4)*.25; }); } }
];

return { titel:'Die Wachhalle', breite:36, tiefe:27, oben:['24,16,12','52,38,30','92,72,56'], baue, gegenstaende, verstecke };
})();

/* Raum 2: Die Fahrzeughalle. Große helle Halle mit Neonröhren, Löschfahrzeug, Spinden, Werkbank, Schlauchboot, Hund und Einsatzkräften.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das große rote Rolltor in der Rückwand links, es fährt nach oben, dahinter liegt der helle Hof. */
RAEUME3D.feuerwache[1] = (function(){
const { ROT, ROT2, WEISS, CREME, GELB, ORANGE, BLAU, GRUEN, SCHWARZ, GUMMI, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, HOLZ3, GLAS, ANZUG, STREIF } = FW;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=-8, TB=5.6, TH=4.7;      /* Rolltor: Mitte, Breite, Höhe der Öffnung */
const SCHLAUCH=0xe8dcc0, SCHLAUCH2=0xd2c29c, STAHL=0x8a949e, STAHLD=0x4e5862;

const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze/Ring nach vorn bzw. flach legen */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* Gruppe mit Drehung (z. B. an einer Seitenwand: dann zeigt ihr +z in den Raum) */
function drehGruppe(par,x,z,dreh){ const g=gruppe(par,x,0,z); g.rotation.y=dreh; return g; }

/* ---------- Bilder ---------- */
/* Hallenwand aus großen hellen Blöcken */
function wandBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#9aa2ac'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++) for(let s=-1;s<4;s++){ const x=s*128+(r%2)*64, v=Math.floor(zufall()*10)-5;
      const mal=xx=>{ g.fillStyle='rgb('+(206+v)+','+(212+v)+','+(216+v)+')'; g.fillRect(xx+2,r*64+2,124,60); g.fillStyle='rgba(255,255,255,.2)'; g.fillRect(xx+4,r*64+4,120,4); };
      mal(x); if(x<0) mal(x+512); } });
}
/* glatter Hallenboden aus Betonplatten */
function bodenBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#8f949a'; g.fillRect(0,0,512,512);
    for(let i=0;i<1300;i++){ g.fillStyle=i%2?'rgba(255,255,255,.1)':'rgba(40,44,52,.12)'; g.fillRect(zufall()*506,zufall()*506,2+zufall()*5,2+zufall()*4); }
    g.fillStyle='#6a7078'; [0,256].forEach(a=>{ g.fillRect(a,0,3,512); g.fillRect(0,a,512,3); }); });
}
/* hohes Fenster: blauer Himmel, Wolken, Baumkronen */
function fensterBild(){
  return bild(384,160,(g)=>{ const v=g.createLinearGradient(0,0,0,160); v.addColorStop(0,'#5aaaf0'); v.addColorStop(1,'#d8f0ff'); g.fillStyle=v; g.fillRect(0,0,384,160);
    g.fillStyle='#ffffff'; [[80,50],[260,36]].forEach(([x,y])=>{ [[0,0,26],[28,6,20],[-28,8,18]].forEach(([a,b,r])=>{ g.beginPath(); g.arc(x+a,y+b,r,0,7); g.fill(); }); });
    g.fillStyle='#5a9a48'; for(let i=0;i<10;i++){ g.beginPath(); g.arc(i*42+10,162,24+zufall()*18,0,7); g.fill(); } });
}
/* Blick durch das offene Tor: sonniger Hof mit Häusern und Bäumen */
function hofBild(){
  return bild(768,320,(g)=>{ const v=g.createLinearGradient(0,0,0,230); v.addColorStop(0,'#62b4f8'); v.addColorStop(1,'#e8f8ff'); g.fillStyle=v; g.fillRect(0,0,768,320);
    const l=g.createRadialGradient(520,70,6,520,70,110); l.addColorStop(0,'rgba(255,252,210,1)'); l.addColorStop(1,'rgba(255,240,150,0)'); g.fillStyle=l; g.fillRect(380,0,280,200);
    [[60,120,110,'#e89a6a'],[190,90,130,'#f4d878'],[340,135,100,'#9ac0e0'],[470,110,120,'#e8b0a0'],[620,100,140,'#b8d890']].forEach(([x,y,b,f])=>{ g.fillStyle=f; g.fillRect(x,y,b,250-y);
      g.fillStyle='#a8483a'; g.beginPath(); g.moveTo(x-8,y); g.lineTo(x+b/2,y-44); g.lineTo(x+b+8,y); g.fill();
      g.fillStyle='#4a6a90'; for(let a=x+16;a<x+b-24;a+=38) for(let c=y+18;c<225;c+=40) g.fillRect(a,c,20,24); });
    g.fillStyle='#4e9a40'; for(let i=0;i<18;i++){ g.beginPath(); g.arc(i*46,250+zufall()*14,26+zufall()*16,0,7); g.fill(); }
    g.fillStyle='#c8c4bc'; g.fillRect(0,266,768,54); });
}
/* Fahrzeugtafel: Löschfahrzeug von der Seite mit Maßpfeilen */
function tafelBild(){
  return bild(512,352,(g)=>{ g.fillStyle='#fbfcfe'; g.fillRect(0,0,512,352);
    g.strokeStyle='rgba(70,120,180,.18)'; g.lineWidth=2; for(let x=0;x<512;x+=32){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,352); g.stroke(); } for(let y=0;y<352;y+=32){ g.beginPath(); g.moveTo(0,y); g.lineTo(512,y); g.stroke(); }
    g.fillStyle='#d0261c'; g.fillRect(86,106,244,142); g.beginPath(); g.moveTo(336,248); g.lineTo(336,122); g.lineTo(404,122); g.lineTo(446,184); g.lineTo(446,248); g.fill();
    g.fillStyle='#8ccaf0'; g.beginPath(); g.moveTo(350,136); g.lineTo(398,136); g.lineTo(430,184); g.lineTo(350,184); g.fill();
    g.fillStyle='#b8c0c8'; [100,176,252].forEach(x=>{ g.fillRect(x,126,64,70); }); g.fillStyle='#ffffff'; g.fillRect(86,208,360,12);
    g.strokeStyle='#50586a'; g.lineWidth=5; g.beginPath(); g.moveTo(92,86); g.lineTo(320,86); g.moveTo(92,100); g.lineTo(320,100); for(let x=100;x<320;x+=24){ g.moveTo(x,86); g.lineTo(x,100); } g.stroke();
    g.fillStyle='#2a7af0'; g.fillRect(354,104,30,18);
    [140,388].forEach(x=>{ g.fillStyle='#202026'; g.beginPath(); g.arc(x,250,34,0,7); g.fill(); g.fillStyle='#c8ced6'; g.beginPath(); g.arc(x,250,14,0,7); g.fill(); });
    const pfeil=(x1,y1,x2,y2)=>{ g.strokeStyle='#1c3a6a'; g.fillStyle='#1c3a6a'; g.lineWidth=5; g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke(); const a=Math.atan2(y2-y1,x2-x1);
      [[x2,y2,a],[x1,y1,a+Math.PI]].forEach(([x,y,w])=>{ g.beginPath(); g.moveTo(x,y); g.lineTo(x-18*Math.cos(w-.45),y-18*Math.sin(w-.45)); g.lineTo(x-18*Math.cos(w+.45),y-18*Math.sin(w+.45)); g.fill(); }); };
    pfeil(86,314,446,314); pfeil(46,86,46,284); pfeil(86,44,330,44); });
}
/* Zahl 112 für die Fahrertür und das runde Wandzeichen */
function notrufBild(){
  return bild(256,96,(g)=>{ g.fillStyle='#ffffff'; g.fillRect(0,0,256,96); g.fillStyle='#d0261c'; g.font='700 82px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('112',128,52); });
}

/* ---------- Ausgang: das Rolltor ---------- */
function baueTor(k,sc,hinten){
  /* Hof dahinter */
  const aus=new THREE.Mesh(new THREE.PlaneGeometry(14,5.4),basis(0xffffff,{map:hofBild()})); aus.position.set(AX,2.7,HINTEN-5.2); hinten.add(aus);
  const hof=gruppe(hinten,0,0,0);
  hell(box(hof,12,.04,5.0,0xbcb8ae,AX,-.012,HINTEN-2.75));
  [-1.2,1.2].forEach(a=>hell(box(hof,.16,.02,4.7,GELB,AX+a*1.4,.02,HINTEN-2.7)));
  FW.laubbaum(hof,AX-3.9,HINTEN-3.0,3.6); FW.laubbaum(hof,AX+4.0,HINTEN-3.8,3.2,0x68aa3c); FW.busch(hof,AX+2.9,HINTEN-1.5,.5); FW.busch(hof,AX-2.9,HINTEN-1.2,.4);
  for(let i=0;i<9;i++) box(hof,.12,.8,.12,WEISS,AX-4.4+i*1.1,.4,HINTEN-4.8); box(hof,9.0,.12,.08,WEISS,AX,.62,HINTEN-4.74);
  ohneSchatten(hof);
  const tb=FW.taube(hof,AX+1.5,0,HINTEN-2.2,2.4); tb.g.userData.lebendig=true;
  k.anim.push(t=>{ tb.kopf.position.y=.34-Math.max(0,Math.sin(t*3))*.14; tb.g.position.x=AX+1.5+Math.sin(t*.5)*.5; });
  /* Rahmen mit gelb-schwarzen Warnstreifen */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ for(let i=0;i<12;i++) box(r,.46,.4,.5,i%2?SCHWARZ:GELB,s*(TB/2+.23),.2+i*.4,.08); box(r,.14,TH,.3,STAHLD,s*(TB/2-.05),TH/2,.12); });
  /* Rollkasten oben */
  box(r,TB+1.1,.62,.7,STAHL,0,TH+.34,.22); box(r,TB+1.16,.1,.76,STAHLD,0,TH+.68,.22); [-2.2,-1.1,0,1.1,2.2].forEach(a=>ball(r,.06,METALL,a,TH+.34,.6));
  hell(box(r,TB,.03,.5,STAHLD,0,.012,.1));
  /* Schaltkasten rechts neben dem Tor mit großen Pfeil-Knöpfen */
  box(r,.7,1.1,.2,GELB,3.9,2.0,.14); [[2.27,GRUEN,0],[1.73,ROT,Math.PI]].forEach(([y,f,d])=>{ flach(walze(r,.2,.09,f,3.9,y,.27)); const p=kegel(r,.11,.18,WEISS,3.9,y,.34); p.rotation.z=d; p.scale.z=.03; });
  strich(r,[3.9,2.55,.1],[3.9,TH+.2,.1],.04,STAHLD); strich(r,[3.9,TH+.2,.1],[3.35,TH+.34,.2],.04,STAHLD);
  verschmelze(r);
  /* Ampel und Drehleuchte */
  const rotM=basis(0xff3020), gruenM=basis(0x1a4a24);
  const am=gruppe(hinten,AX-3.7,0,HINTEN); box(am,.5,.2,.1,EISEN,0,5.62,.14);
  hell(ball(am,.17,rotM,-.15,5.62,.24)); hell(ball(am,.17,gruenM,.24,5.62,.24));
  const dm=basis(0xffa018), dreh=gruppe(hinten,AX,TH+.9,HINTEN+.3); dreh.userData.lebendig=true; hell(ball(dreh,.2,dm,0,.02,0,1,.9,1)); const strahlA=hell(box(dreh,.62,.07,.07,basis(0xffe080),0,.02,0)); walze(dreh,.24,.08,EISEN,0,-.13,0);
  const blink=schein(hinten,'rgba(255,170,40,.8)',AX,TH+.92,HINTEN+.7,1.2); blink.visible=false;
  /* Torlamellen: fahren nach oben in den Rollkasten */
  const n=13, hh=TH/n, lamellen=[];
  for(let i=0;i<n;i++){ const l=gruppe(hinten,AX,hh*(i+.5),HINTEN+.04); l.userData.lebendig=true;
    box(l,TB-.12,hh-.04,.14,i%2?ROT:0xe03a28,0,0,0); box(l,TB-.12,.05,.18,ROT2,0,-hh/2+.03,0);
    if(i===8) [-1.9,-.95,0,.95,1.9].forEach(a=>{ box(l,.74,hh-.08,.05,WEISS,a,0,.07); hell(box(l,.62,hh-.16,.04,basis(0xbfe8ff),a,0,.09)); });
    if(i===0){ box(l,TB-.12,.12,.2,GUMMI,0,-hh/2+.06,.02); [-1.7,1.7].forEach(a=>box(l,.5,.08,.12,METALL,a,.04,.14)); }
    verschmelze(l); lamellen.push(l); }
  const schlossG=gruppe(hinten,AX,1.85,HINTEN+.2); schlossG.userData.lebendig=true;
  box(schlossG,1.62,1.3,.07,WEISS,0,.08,-.02); box(schlossG,1.46,1.14,.08,STAHLD,0,.08,0);
  const schloss=FW.zahlenschloss(schlossG,0,-.02,.17); schloss.scale.setScalar(1.35); verschmelze(schlossG);
  const licht=new THREE.PointLight(0xfff4d0,.12,11,1.5); licht.position.set(AX,3.4,HINTEN-1.6); sc.add(licht);
  k.kasten(AX,-13.15,TB+.6,.8); /* geschlossenes Tor: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  let laeuft=0;
  k.anim.push(t=>{ dreh.rotation.y=laeuft?t*8:0; blink.visible=!!laeuft && Math.sin(t*10)>0; });
  return ausgang(k,{ name:'Rolltor', einfach:'Großes Tor', steh:[AX+1.5,-11.1], durch:[AX+.2,-15.6], losNach:1.5,
    treffer:{x:AX,y:2.35,z:-12.95,b:TB,h:4.7,t:.9}, schildOben:[AX,4.4,-12.4], glanz:[AX,1.9,-12.7],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)), hub=a*a*(3-2*a)*TH;
      lamellen.forEach((l,i)=>{ const y=hh*(i+.5)+hub; l.position.y=y; l.visible=y<TH-hh*.3; });
      schlossG.position.y=1.85+hub; schlossG.visible=1.85+hub<TH-.7;
      laeuft=auf>.02?1:0; rotM.color.setHex(auf>.5?0x4a1410:0xff3020); gruenM.color.setHex(auf>.5?0x40ff70:0x1a4a24); licht.intensity=.12+.8*auf; } });
}

/* ---------- Wandschmuck ---------- */
/* Stahlstütze mit Warnfuß; steht an der Wand, +z in den Raum */
function stuetze(par,x,z,dreh){
  const g=drehGruppe(par,x,z,dreh);
  box(g,.34,H,.22,STAHL,0,H/2,.12); box(g,.62,H,.08,STAHLD,0,H/2,.04);
  for(let i=0;i<4;i++) box(g,.66,.22,.3,i%2?SCHWARZ:GELB,0,.11+i*.22,.14);
  box(g,.8,.3,.4,STAHLD,0,H-.15,.18);
}
function fenster(par,x,z,dreh,tex,y){
  const g=drehGruppe(par,x,z,dreh);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(3.6,1.5),basis(0xffffff,{map:tex})); m.position.set(0,y,.05); g.add(m);
  [-1.87,-.62,.62,1.87].forEach(a=>box(g,.14,1.68,.18,WEISS,a,y,.08));
  [-.82,.82].forEach(h=>box(g,3.88,.14,.2,WEISS,0,y+h,.08)); box(g,4.0,.1,.36,STAHL,0,y-.92,.16);
}
/* Neonröhre in weißer Fassung */
function neon(par,x,z,dreh,y,laenge,m){
  const g=drehGruppe(par,x,z,dreh);
  box(g,laenge+.3,.16,.14,WEISS,0,y+.06,.1); [-1,1].forEach(s=>box(g,.14,.26,.34,STAHL,s*(laenge/2+.08),y,.2));
  [.22,.38].forEach((d,i)=>hell(quer(walze(g,.065,laenge,m,0,y-.02-i*.08,d-i*.04))));
  schein(g,'rgba(225,244,255,.3)',0,y-.05,.55,1.7);
}
/* rundes Zeichen mit der Notrufnummer */
function notrufZeichen(par,x,y,z){
  const g=gruppe(par,x,y,z);
  box(g,2.1,1.02,.1,ROT,0,0,.06); box(g,1.86,.8,.06,WEISS,0,0,.1);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(1.7,.64),new THREE.MeshLambertMaterial({map:notrufBild()})); m.position.z=.15; g.add(m);
}
/* lange Holzleiter, waagrecht auf Haken */
function wandleiter(par,x,y,z){
  const g=gruppe(par,x,y,z);
  [-.3,.3].forEach(h=>box(g,5.2,.1,.1,HOLZ,0,h,.22)); for(let i=0;i<13;i++) box(g,.09,.62,.07,0xc8985a,-2.4+i*.4,0,.22);
  [-1.8,1.8].forEach(a=>{ box(g,.16,.14,.34,EISEN,a,-.4,.16); box(g,.16,.34,.08,EISEN,a,-.26,.34); });
}
/* Regal mit bunten Gerätekisten an der Wand */
function kistenRegal(par,x,z,dreh){
  const g=drehGruppe(par,x,z,dreh);
  [1.6,2.8].forEach((y,r)=>{ box(g,3.6,.1,.7,STAHL,0,y,.36); [-1.6,1.6].forEach(a=>strich(g,[a,y-.5,.06],[a,y-.05,.6],.04,STAHLD));
    [-1.15,0,1.15].forEach((a,i)=>{ const f=[BLAU,GELB,GRUEN,0x7a5ac0,ORANGE,BLAU][i+r*3]; box(g,.95,.6,.55,f,a,y+.36,.36); box(g,1.0,.1,.6,STAHLD,a,y+.69,.36); box(g,.4,.14,.04,WEISS,a,y+.36,.65); }); });
}

/* ---------- Deko am Boden (nichts davon ist ein Gegenstand) ---------- */
/* offene Spindnische mit Einsatzjacke und Stiefeln, +z in den Raum */
function spinde(par,x,z,dreh,n){
  const g=drehGruppe(par,x,z,dreh), br=1.35, W=n*br;
  box(g,W,.12,1.0,STAHLD,0,.07,0); box(g,W,3.0,.08,0xa8b4c2,0,1.55,-.46); box(g,W+.1,.14,1.0,STAHL,0,3.08,0);
  for(let i=0;i<=n;i++) box(g,.09,3.0,.95,STAHL,-W/2+i*br,1.55,0);
  for(let i=0;i<n;i++){ const a=-W/2+(i+.5)*br, f=i%3===1?0x3a4a6a:ANZUG;
    box(g,br-.1,.07,.9,METALL,a,2.62,0); box(g,.55,.3,.5,[BLAU,GRUEN,0x8a6ac0][i%3],a,2.81,0);
    strich(g,[a-.35,2.3,-.1],[a+.35,2.3,-.1],.025,METALL);
    box(g,.78,1.15,.34,f,a,1.68,-.08); [-1,1].forEach(s=>{ const arm=box(g,.2,.95,.26,f,a+s*.46,1.66,-.08); arm.rotation.z=s*.12; box(g,.21,.08,.28,STREIF,a+s*.5,1.34,-.08); });
    box(g,.8,.1,.36,STREIF,a,1.36,-.08); box(g,.8,.08,.36,STREIF,a,1.9,-.08); box(g,.04,1.1,.02,METALL,a,1.68,.1);
    [-.22,.22].forEach(s=>{ walze(g,.13,.52,SCHWARZ,a+s,.42,0); ball(g,.15,SCHWARZ,a+s,.22,.16,1,.7,1.5); walze(g,.137,.07,GELB,a+s,.66,0); }); }
}
function werkbank(par,x,z,dreh){
  const g=drehGruppe(par,x,z,dreh);
  box(g,3.6,.18,1.15,HOLZ,0,1.2,0); [-1.65,1.65].forEach(a=>[-.42,.42].forEach(c=>box(g,.14,1.12,.14,STAHLD,a,.56,c))); box(g,3.3,.08,.9,STAHL,0,.36,0);
  box(g,1.2,.76,1.0,BLAU,.95,.74,0); [.52,.76,1.0].forEach(y=>box(g,.8,.07,.05,METALL,.95,y,.52));
  /* Schraubstock */
  box(g,.4,.14,.4,STAHLD,-1.15,1.36,.2); box(g,.14,.34,.5,STAHLD,-1.3,1.55,.2); box(g,.14,.34,.5,STAHLD,-.96,1.55,.2); quer(walze(g,.05,.9,METALL,-1.15,1.5,.3)); strich(g,[-1.62,1.7,.3],[-1.62,1.3,.3],.03,METALL);
  /* Stehlampe und Werkzeugkasten */
  box(g,.9,.36,.45,ROT,.15,1.47,-.2); box(g,.92,.08,.47,ROT2,.15,1.68,-.2); strich(g,[-.15,1.85,-.2],[.45,1.85,-.2],.035,EISEN); [-.15,.45].forEach(a=>strich(g,[a,1.7,-.2],[a,1.85,-.2],.035,EISEN));
  strich(g,[1.45,1.28,-.25],[1.2,2.0,-.25],.04,EISEN); const s=kegel(g,.24,.3,GELB,1.08,2.04,-.2); s.rotation.z=-.7;
  box(g,.8,.3,.6,GELB,-.7,.56,0); box(g,.7,.26,.6,GRUEN,-.7,.18,0);
}
/* Schlauchboot auf einem Gestell, entlang x */
function boot(par,x,z,dreh){
  const g=drehGruppe(par,x,z,dreh);
  [-1.2,1.2].forEach(a=>{ [-.55,.55].forEach(c=>box(g,.16,.7,.16,STAHLD,a,.35,c)); box(g,.2,.14,1.4,STAHLD,a,.72,0); });
  const F=0xf26a14;
  [-.62,.62].forEach(c=>{ quer(walze(g,.34,3.0,F,-.2,1.12,c)); ball(g,.34,F,-1.7,1.12,c); strich(g,[1.3,1.12,c],[2.0,1.28,0],.34,F); quer(walze(g,.355,.2,SCHWARZ,-.9,1.12,c)); quer(walze(g,.355,.2,SCHWARZ,.5,1.12,c)); });
  ball(g,.36,F,2.0,1.28,0);
  box(g,3.3,.14,1.3,0x5a6470,0,1.0,0); box(g,.3,.1,1.0,HOLZ,-.3,1.22,0); [-.94,.94].forEach(c=>{ [[-1.7,-.7],[-.7,.35],[.35,1.35]].forEach(([u,v])=>{ const m=(u+v)/2; strich(g,[u,1.42,c*.95],[m,1.24,c*1.08],.025,WEISS); strich(g,[m,1.24,c*1.08],[v,1.42,c*.95],.025,WEISS); }); }); strich(g,[-.9,1.32,.2],[1.0,1.32,-.2],.04,HOLZ); box(g,.42,.05,.24,HOLZ2,1.2,1.32,-.24); box(g,.22,.7,1.0,HOLZ2,-1.65,1.15,0);
  strich(g,[-1.9,1.5,0],[-2.05,.9,0],.09,EISEN); box(g,.42,.4,.4,EISEN,-1.9,1.62,0);
}
function reifen(par,x,z,n){
  const g=gruppe(par,x,0,z);
  for(let i=0;i<n;i++){ const y=.22+i*.42, a=(i%2)*.06; flach(ring(g,.52,.21,GUMMI,a,y,0)); walze(g,.3,.12,i===n-1?METALL:STAHLD,a,y,0); }
  walze(g,.12,.1,EISEN,((n-1)%2)*.06,.22+(n-1)*.42+.1,0);
}
/* Stapel silberner Gerätekisten */
function kisten(par,x,z,dreh){
  const g=drehGruppe(par,x,z,dreh);
  [[-.65,.35,0,1.25,.68],[.7,.35,.05,1.25,.68],[-.4,.98,0,1.15,.55]].forEach(([a,y,c,w,h])=>{ box(g,w,h,.95,METALL,a,y,c); [-h/2,h/2].forEach(d=>[-.47,.47].forEach(t=>box(g,w+.05,.07,.07,STAHLD,a,y+d*.96,c+t))); [-w/2,w/2].forEach(d=>[-.47,.47].forEach(t=>box(g,.07,h,.07,STAHLD,a+d*.98,y,c+t))); [-.5,.5].forEach(t=>{ box(g,.36,.1,.05,SCHWARZ,a,y+.05,c+t); [-.3,.3].forEach(d=>box(g,.09,.16,.05,GOLD,a+d,y+h*.3,c+t)); }); });
}
/* Stromerzeuger im orangen Rohrrahmen */
function stromer(par,x,z,dreh){
  const g=drehGruppe(par,x,z,dreh), F=ORANGE;
  [-.9,.9].forEach(a=>[-.5,.5].forEach(c=>strich(g,[a,.08,c],[a,1.25,c],.065,F)));
  [.14,1.25].forEach(y=>{ [-.5,.5].forEach(c=>strich(g,[-.9,y,c],[.9,y,c],.065,F)); [-.9,.9].forEach(a=>strich(g,[a,y,-.5],[a,y,.5],.065,F)); });
  box(g,.9,.7,.75,EISEN,-.35,.55,0); box(g,1.5,.3,.72,F,0,1.04,0); box(g,.62,.62,.8,STAHL,.48,.52,0);
  [[.34,.62],[.62,.62]].forEach(([a,y])=>flach(walze(g,.09,.05,SCHWARZ,a,y,.42))); ball(g,.05,basis(0x50ff70),.48,.38,.42); flach(walze(g,.13,.14,SCHWARZ,-.4,1.22,0)).rotation.x=0;
}
/* Sandsäcke auf einer Holzpalette */
function sandsaecke(par,x,z){
  const g=gruppe(par,x,0,z);
  [-.55,0,.55].forEach(c=>box(g,2.3,.07,.35,HOLZ,0,.19,c)); [-1,0,1].forEach(a=>box(g,.24,.14,1.45,HOLZ2,a,.08,0));
  [[-.55,.42,-.35],[.55,.42,-.35],[-.55,.42,.35],[.55,.42,.35],[0,.74,-.3],[0,.74,.32],[0,1.05,0]].forEach(([a,y,c],i)=>{ const f=i%2?0xc8ae78:0xb89c68; ball(g,.55,f,a,y,c,1.12,.42,.64); ball(g,.06,HOLZ2,a+.62,y,c); });
}
/* Dalmatiner, läuft entlang x */
function hund(k,punkte,tempo){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0), W=0xf8f4ec;
  ball(r,.4,W,0,.72,0,1.55,.85,.82); ball(r,.3,W,.46,.82,0); strich(r,[.5,.9,0],[.74,1.18,0],.17,W);
  ball(r,.28,W,.82,1.28,0); ball(r,.15,W,1.06,1.19,0,1.35,.8,.95); ball(r,.07,SCHWARZ,1.27,1.22,0);
  [-1,1].forEach(s=>{ ball(r,.14,SCHWARZ,.72,1.3,s*.28,.7,1.55,.45); ball(r,.04,SCHWARZ,1.03,1.38,s*.14); });
  strich(r,[.62,1.0,-.19],[.62,1.0,.19],.065,ROT); ball(r,.07,GOLD,.76,.94,0);
  /* Tupfen auf Rücken und Flanken */
  [[-.4,1.01,.1],[0,1.06,-.12],[.28,1.02,.14],[-.2,.82,.32],[.22,.7,.33],[-.46,.66,.26],[-.05,.58,.32],[-.2,.82,-.32],[.25,.74,-.32],[-.48,.7,-.26],[.5,.95,.24],[.52,.78,-.28],[.82,1.55,.05]].forEach(([x,y,z],i)=>ball(r,.075+(i%3)*.012,SCHWARZ,x,y,z,1,.75,.55+(i%2)*.1));
  const schwanz=gruppe(g,-.58,.86,0); strich(schwanz,[0,0,0],[-.42,.42,0],.07,W); ball(schwanz,.06,SCHWARZ,-.24,.25,0); verschmelze(schwanz);
  const beine=[[.38,.2],[.38,-.2],[-.36,.2],[-.36,-.2]].map(([x,z],i)=>{ const b=gruppe(g,x,.6,z); walze(b,.085,.56,W,0,-.28,0); ball(b,.1,W,.05,-.55,0,1.3,.6,1); ball(b,.045,SCHWARZ,.05,-.2-(i%2)*.12,z>0?.07:-.07); verschmelze(b); return b; });
  verschmelze(r);
  k.anim.push(t=>{ beine.forEach((b,i)=>b.rotation.z=Math.sin(t*6+(i%3?3.14:0))*.42); schwanz.rotation.x=Math.sin(t*9)*.45; });
  laeufer(k,g,punkte,tempo,0,6);
}

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  const h=FW.huelle(k,{ B,T,H, himmelLicht:0xf4faff, grund:0x6a6e78, staerke:.7, sonne:0xfff4e0, sonneStaerke:.36,
    wandBild:wandBild(), bodenBild:bodenBild(), bodenWdh:[6,4.5], leiste:STAHLD, sockel:1.25, sockelFarbe:ROT2, oeffnung:{x:AX,b:TB,h:TH} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueTor(k,sc,hinten);
  const neonM=basis(0xf4fcff), neonF=basis(0xf4fcff), ftex=fensterBild(), LD=Math.PI/2;

  /* ---------- Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  [-17.6,-12.35,6.5,12.9,17.6].forEach(x=>stuetze(dh,x,HINTEN,0));
  fenster(dh,-15.0,HINTEN,0,ftex,5.15);
  neon(dh,-1.2,HINTEN,0,5.55,3.2,neonM); neon(dh,9.6,HINTEN,0,5.65,3.4,neonF); neon(dh,15.2,HINTEN,0,5.55,3.0,neonM);
  notrufZeichen(dh,3.3,5.25,HINTEN);
  wandleiter(dh,3.0,3.35,HINTEN);
  kistenRegal(dh,15.25,HINTEN,0); k.kasten(15.25,-13.1,3.7,.8); k.kasten(-17.6,5.7,.8,3.7);
  /* ---------- Seitenwände ---------- */
  const dl=gruppe(links,0,0,0), dr=gruppe(rechts,0,0,0);
  [-12.9,-5.6,2.0,9.4].forEach(z=>{ stuetze(dl,-B/2,z,LD); stuetze(dr,B/2,z,-LD); });
  [-9.2,-1.8,5.7].forEach((z,i)=>{ fenster(dl,-B/2,z,LD,ftex,4.45); fenster(dr,B/2,z,-LD,ftex,4.45); neon(dl,-B/2,z,LD,5.85,3.4,neonM); neon(dr,B/2,z,-LD,5.85,3.4,neonM); });
  kistenRegal(dl,-B/2,5.7,LD);
  [dh,dl,dr].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
  /* eine Röhre flackert ab und zu */
  k.anim.push(t=>neonF.color.setHex((t%7<.5 && Math.sin(t*40)>0)?0x8a9498:0xf4fcff));

  /* ---------- Möbel und Geräte am Boden ---------- */
  const v=gruppe(sc,0,0,0);
  /* links */
  reifen(v,-17.1,-12.35,2); k.kreis(-17.1,-12.35,.8);
  spinde(v,-17.35,-7.0,LD,3); k.kasten(-17.35,-7.0,1.1,4.2);
  boot(v,-16.7,.2,LD); k.kasten(-16.7,.15,1.9,4.9);
  reifen(v,-16.9,8.2,3); k.kreis(-16.9,8.2,.8);
  stromer(v,-16.6,11.4,.5); k.kreis(-16.6,11.4,1.15);
  /* rechts */
  reifen(v,16.9,-11.9,4); k.kreis(16.9,-11.9,.8); reifen(v,15.3,-12.3,2); k.kreis(15.3,-12.3,.8);
  spinde(v,17.35,-7.6,-LD,4); k.kasten(17.35,-7.6,1.1,5.55);
  werkbank(v,17.15,-1.0,-LD); k.kasten(17.15,-1.0,1.35,3.75);
  stromer(v,17.0,4.6,LD); k.kasten(17.0,4.6,1.3,2.1);
  sandsaecke(v,16.4,11.6); k.kasten(16.4,11.6,2.5,1.6);
  /* vorn (niedrig) */
  kisten(v,-11.4,12.2,0); k.kasten(-11.35,12.2,2.75,1.2);
  sandsaecke(v,-5.6,12.25); k.kasten(-5.6,12.25,2.5,1.6);
  reifen(v,-.6,12.25,2); k.kreis(-.6,12.25,.8);
  kisten(v,5.6,12.2,.04); k.kasten(5.65,12.2,2.8,1.25);
  kisten(v,11.4,12.2,-.04); k.kasten(11.45,12.2,2.8,1.25);
  verschmelze(v);

  /* ---------- Markierungen auf dem Boden ---------- */
  const m=gruppe(sc,0,0,0);
  const bucht=drehGruppe(m,3.4,-5.2,-.22);
  [-2.15,2.15].forEach(c=>box(bucht,9.2,.012,.18,GELB,0,.008,c)); [-4.6,4.6].forEach(a=>box(bucht,.18,.013,4.48,GELB,a,.008,0));
  for(let i=0;i<14;i++) box(m,.4,.014,.5,i%2?SCHWARZ:GELB,AX-2.6+i*.4,.009,-12.7);
  [-1,1].forEach(s=>box(m,.16,.012,4.2,WEISS,AX+s*2.9,.008,-10.3));
  box(m,22,.012,.34,STAHLD,0,.006,9.2); for(let i=0;i<44;i++) box(m,.12,.016,.26,SCHWARZ,-10.75+i*.5,.009,9.2);
  verschmelze(m); ohneSchatten(m);

  /* ---------- Einsatzkräfte ---------- */
  /* eine Person poliert das Fahrzeug */
  const p=FW.mensch(k,sc,2.4,-3.25,2.92,{ haut:1, helm:false, winkt:false, phase:1 }); k.kreis(2.4,-3.25,.45);
  const lappen=ball(p.armR,.16,GELB,0,-.64,.04,1.2,.7,1);
  k.anim.push(t=>{ p.armR.rotation.x=-1.5+Math.sin(t*4)*.18; p.armR.rotation.z=.15+Math.cos(t*4)*.35; });
  /* eine Person winkt an der Werkbank */
  FW.mensch(k,sc,14.9,1.6,-1.15,{ haut:2, helm:GELB, phase:3 }); k.kreis(14.9,1.6,.5);

  /* ---------- Hund ---------- */
  hund(k,[[-8.6,-6.8],[-4.4,-7.8],[-3.6,-3.6],[-6.2,-.4],[-9.6,-1.0],[-10.2,-4.6]],1.35);

  /* ---------- Licht (mit dem Torlicht vier Punktlichter) ---------- */
  [[-10,5.4,-7],[8,5.4,-8],[1,5.8,3]].forEach(([x,y,z])=>{ const l=new THREE.PointLight(0xeef8ff,.22,17,1.5); l.position.set(x,y,z); sc.add(l); });

  return { tuer, start:[-3.0,2.0] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.0,-9.2],[-4.4,-10.6],[1.2,-10.2],[6.4,-9.6],[13.4,-9.4],[-14.8,-5.8],[-7.6,-4.2],[13.8,-6.0],[9.8,-1.4],[14.0,-2.8],
  [-14.6,1.2],[-8.4,1.8],[3.2,.2],[7.4,.8],[14.0,7.0],[-14.0,8.2],[-8.0,8.0],[-1.4,7.6],[6.4,7.6],[.6,10.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-1.25, z:HINTEN, wand:'hinten', steh:[-1.5,-11.35], kasten:[3.9,.8], treffer:[3.9,2.7,.8], trefferY:1.35, baue(g,k){ /* 1 Schlauchhalter */
      box(g,3.9,2.55,.08,HOLZ2,0,2.72,.05); box(g,3.7,2.35,.05,HOLZ,0,2.72,.1);
      quer(walze(g,.08,3.85,EISEN,0,3.82,.3)); [-1.8,1.8].forEach(a=>box(g,.14,.14,.32,EISEN,a,3.82,.16));
      [[-1.22,SCHLAUCH],[0,0xe04a34],[1.22,SCHLAUCH]].forEach(([a,f],i)=>{
        flach(walze(g,.09,.5,EISEN,a,3.22,.33)); strich(g,[a,3.82,.3],[a,3.3,.45],.045,EISEN);
        const y=2.62;
        [0,1,2,3].forEach(n=>ring(g,.52-n*.115,.062,n%2?(i===1?0xb82c1c:SCHLAUCH2):f,a,y,.26+n*.012));
        flach(walze(g,.1,.16,GOLD,a,y,.28));
        box(g,.16,.7,.08,EISEN,a,3.0,.4);
        /* loses Ende mit Kupplung */
        strich(g,[a+.48,y-.1,.3],[a+.42,1.75-(i%2)*.15,.34],.065,f); walze(g,.11,.22,GOLD,a+.42,1.62-(i%2)*.15,.34); walze(g,.125,.06,0xb88a20,a+.42,1.68-(i%2)*.15,.34); }); } },
  { x:9.65, z:HINTEN, wand:'hinten', steh:[9.7,-11.35], kasten:[4.1,.8], treffer:[4.0,2.7,.8], trefferY:1.45, baue(g,k){ /* 2 Werkzeugwand */
      box(g,3.9,2.55,.08,EISEN,0,2.8,.05); box(g,3.7,2.35,.05,0xd8b47c,0,2.8,.1);
      for(let i=0;i<9;i++) for(let j=0;j<6;j++) hell(box(g,.05,.05,.02,HOLZ3,-1.64+i*.41,1.85+j*.38,.13));
      const z=.22;
      /* Maulschlüssel */
      [[-1.55,1.35],[-1.2,1.05]].forEach(([a,l])=>{ strich(g,[a,3.6,z],[a,3.6-l,z],.065,METALL); ring(g,.14,.065,METALL,a,3.73,z,4.6).rotation.z=2.4; ring(g,.1,.05,METALL,a,3.5-l,z); });
      /* Hammer */
      strich(g,[-.66,3.45,z],[-.66,2.3,z],.07,0xc8863a); box(g,.62,.24,.2,STAHLD,-.66,3.56,z); walze(g,.08,.4,ROT,-.66,2.45,z);
      /* Schraubendreher */
      [[-.2,GELB],[.08,ROT],[.36,BLAU]].forEach(([a,f])=>{ walze(g,.09,.38,f,a,3.52,z); walze(g,.03,.5,METALL,a,3.09,z); box(g,.08,.1,.03,METALL,a,2.82,z); });
      /* Zange */
      [-1,1].forEach(s=>{ strich(g,[.82,3.15,z],[.82+s*.2,2.4,z],.055,BLAU); strich(g,[.82,3.15,z],[.82+s*.08,3.6,z],.05,STAHLD); }); flach(walze(g,.09,.12,METALL,.82,3.15,z+.04));
      /* Handsäge */
      const s=gruppe(g,.0,2.12,z); box(s,1.35,.34,.05,METALL,.12,0,0); for(let i=0;i<11;i++){ const q=box(s,.09,.09,.04,METALL,-.48+i*.12,-.18,0); q.rotation.z=.785; } ring(s,.2,.075,ORANGE,-.72,.02,0);
      /* Kabelrolle und Wasserwaage */
      ring(g,.4,.07,ORANGE,1.42,3.2,z); ring(g,.27,.065,0xd85a10,1.42,3.2,z+.03); box(g,.12,.24,.1,EISEN,1.42,3.64,z);
      box(g,1.2,.2,.1,GELB,1.1,1.92,z); [-.35,0,.35].forEach(a=>box(g,.16,.09,.03,0x80f0a0,1.1+a,1.92,z+.06)); } },
  { x:3.4, z:-5.2, dreh:-.22, steh:[4.65,-2.55], r:1.55, treffer:[7.6,3.7,3.1], baue(g,k){ /* 3 Löschfahrzeug */
      const w=FW.loeschwagen(g,0,0,0); w.g.scale.setScalar(1.15);
      /* roter Lack glänzt */
      const lack=new THREE.MeshPhongMaterial({color:0xd8281c,specular:0xffd8c8,shininess:60});
      w.g.traverse(m=>{ if(m.isMesh && m.material===mat(ROT)) m.material=lack; });
      const d=gruppe(w.g,0,0,0);
      /* Spiegel, Kühlergitter, Kupplungen, Trittbretter */
      [-1,1].forEach(v=>{ strich(d,[3.1,2.3,v*1.2],[3.38,2.5,v*1.46],.035,EISEN); box(d,.12,.5,.24,EISEN,3.4,2.45,v*1.48); box(d,.03,.4,.18,GLAS,3.33,2.45,v*1.48);
        box(d,1.5,.1,.3,METALL,-.1,.62,v*1.22); [-.5,.1].forEach(a=>{ flach(walze(d,.14,.12,GOLD,a,1.18,v*1.25)); flach(walze(d,.07,.14,EISEN,a,1.18,v*1.26)); });
        box(d,.03,1.35,.03,ROT2,1.35,1.92,v*1.215); box(d,.03,1.35,.03,ROT2,3.0,1.92,v*1.215); });
      [1.02,1.14,1.26].forEach(y=>box(d,.05,.06,1.0,EISEN,3.17,y,0));
      [-3.14].forEach(x=>{ box(d,.05,1.3,1.8,METALL,x,1.7,0); for(let i=0;i<5;i++) box(d,.06,.025,1.7,METALL2,x-.01,1.25+i*.24,0); [-.95,.95].forEach(c=>ball(d,.12,basis(0xff5030),x,1.0,c,.5,1,1)); });
      verschmelze(d);
      const nr=notrufBild();
      [-1,1].forEach(v=>{ const s=new THREE.Mesh(new THREE.PlaneGeometry(.95,.36),new THREE.MeshLambertMaterial({map:nr})); s.position.set(2.4,1.76,v*1.245); s.rotation.y=v>0?0:Math.PI; w.g.add(s); });
      k.anim.push(t=>{ const an=t%5<1.6; w.blau.forEach((b,i)=>b.visible=!an || (Math.floor(t*5)+i)%2===0); });
      /* Glanzlichter */
      const funkel=[[-2.2,2.95,1.5],[1.7,3.15,1.5],[3.5,1.8,1.1]].map(([x,y,z])=>schein(g,'rgba(255,255,255,.75)',x,y,z,.5));
      k.anim.push(t=>funkel.forEach((s,i)=>{ const u=Math.max(0,Math.sin(t*1.4+i*2.1)); s.scale.setScalar(.05+u*u*u*.6); }));
      /* Hindernis entlang des gedrehten Fahrzeugs */
      [-2.75,-1.4,1.4,2.75].forEach(a=>k.kreis(3.4+a*Math.cos(.22),-5.2+a*Math.sin(.22),1.55)); } },
  { x:-12.4, z:-3.4, dreh:.35, steh:[-11.6,-1.2], r:1.35, treffer:[2.9,2.7,1.8], baue(g,k){ /* 4 Schlauchhaspel */
      const cy=1.45;
      /* Räder und Gestell */
      [-.82,.82].forEach(c=>{ ring(g,.5,.12,GUMMI,0,.62,c); ring(g,.36,.04,METALL,0,.62,c); for(let i=0;i<6;i++){ const a=i*Math.PI/3; strich(g,[0,.62,c],[Math.cos(a)*.38,.62+Math.sin(a)*.38,c],.035,METALL); } flach(walze(g,.12,.2,GOLD,0,.62,c)); });
      flach(walze(g,.07,1.75,EISEN,0,.62,0));
      [-.62,.62].forEach(c=>{ strich(g,[0,.62,c],[0,cy,c],.08,ROT); strich(g,[0,.62,c],[-1.05,.1,c],.07,ROT); strich(g,[0,cy,c],[1.0,1.9,c],.07,ROT); strich(g,[1.0,1.9,c],[1.4,2.25,c],.07,ROT); });
      strich(g,[-1.05,.1,-.62],[-1.05,.1,.62],.08,ROT); strich(g,[1.4,2.25,-.75],[1.4,2.25,.75],.075,EISEN); [-.6,.6].forEach(c=>flach(walze(g,.11,.3,GUMMI,1.4,2.25,c)));
      /* Trommel mit aufgewickeltem Schlauch */
      const t=gruppe(g,0,cy,0); t.userData.lebendig=true;
      flach(walze(t,.82,.84,SCHLAUCH,0,0,0));
      [-.28,0,.28].forEach(c=>ring(t,.82,.075,SCHLAUCH2,0,0,c));
      [-.5,.5].forEach(c=>{ ring(t,.99,.075,ROT,0,0,c); for(let i=0;i<6;i++){ const a=i*Math.PI/3; strich(t,[0,0,c],[Math.cos(a)*.98,Math.sin(a)*.98,c],.05,ROT); } });
      [.66,.46,.27].forEach((r,i)=>ring(t,r,.07,i%2?SCHLAUCH2:SCHLAUCH,0,0,.44));
      flach(walze(t,.15,1.2,GOLD,0,0,0)); verschmelze(t);
      k.anim.push(tt=>{ t.rotation.z=Math.sin(tt*.6)*.12; });
      strich(g,[.72,cy-.4,.3],[1.15,.14,.5],.085,SCHLAUCH); strich(g,[1.15,.14,.5],[1.55,.12,.75],.085,SCHLAUCH); walze(g,.13,.2,GOLD,1.6,.13,.78).rotation.z=1.35; } },
  { x:-6.1, z:4.9, dreh:.12, steh:[-5.9,6.85], kasten:[3.2,1.6], treffer:[3.0,1.9,1.5], baue(g,k){ /* 5 Leitkegel */
      const huetchen=(x,y,z,s)=>{ const c=gruppe(g,x,y,z); c.scale.setScalar(s); box(c,.82,.1,.82,SCHWARZ,0,.05,0);
        /* Stück eines Kegels zwischen zwei Höhen */
        const R=h=>.3-(h/1.4)*.24;
        [[0,.42,ORANGE],[.42,.66,WEISS],[.66,.88,ORANGE],[.88,1.08,WEISS],[1.08,1.4,ORANGE]].forEach(([a,b,f])=>rohr(c,R(b),R(a),b-a,f,0,.1+(a+b)/2,0,16));
        walze(c,.07,.04,0x8a3a08,0,1.51,0); };
      huetchen(-.95,0,.2,1.1); huetchen(.05,0,-.15,1.28);
      /* drei ineinander gestapelte Kegel */
      huetchen(1.05,0,.12,1.0); huetchen(1.05,.24,.12,1.0); huetchen(1.05,.48,.12,1.0); } },
  { x:-14.75, z:HINTEN, wand:'hinten', steh:[-14.5,-11.35], kasten:[3.3,.8], treffer:[3.3,2.5,.8], trefferY:1.5, baue(g,k){ /* 6 Fahrzeugtafel */
      box(g,3.25,2.3,.1,STAHLD,0,2.8,.3); box(g,3.1,2.15,.06,WEISS,0,2.8,.36); FW.tafel(g,tafelBild(),2.96,2.04,0,2.8,.41);
      [-1.45,1.45].forEach(a=>[1.82,3.78].forEach(y=>ball(g,.08,ROT,a,y,.4)));
      [-1.2,1.2].forEach(a=>box(g,.12,.12,.3,STAHLD,a,2.8,.14)); } },
  { x:12.3, z:-3.1, steh:[11.4,-1.35], r:1.05, treffer:[2.0,2.5,1.6], baue(g,k){ /* 7 Hydrant */
      walze(g,.82,.14,METALL2,0,.07,0); walze(g,.62,.18,ROT2,0,.2,0);
      walze(g,.44,1.35,ROT,0,.95,0); walze(g,.52,.14,ROT2,0,.42,0); walze(g,.47,.2,WEISS,0,1.18,0);
      walze(g,.56,.16,ROT2,0,1.66,0); ball(g,.46,ROT,0,1.74,0,1,.85,1); walze(g,.17,.22,EISEN,0,2.16,0); box(g,.18,.14,.18,EISEN,0,2.3,0);
      [-1,1].forEach(s=>{ quer(walze(g,.22,.34,ROT,s*.55,1.32,0)); quer(walze(g,.28,.16,METALL,s*.76,1.32,0)); quer(walze(g,.1,.1,EISEN,s*.86,1.32,0));
        strich(g,[s*.72,1.08,.12],[s*.5,.86,.4],.022,METALL); strich(g,[s*.5,.86,.4],[s*.28,1.0,.4],.022,METALL); });
      flach(walze(g,.32,.3,ROT,0,.88,.46)); flach(walze(g,.39,.16,METALL,0,.88,.62)); flach(walze(g,.15,.12,EISEN,0,.88,.72));
      for(let i=0;i<6;i++){ const a=i*Math.PI/3; ball(g,.045,EISEN,Math.cos(a)*.3,.88+Math.sin(a)*.3,.71); } } },
  { x:10.6, z:3.8, dreh:-.2, steh:[9.4,5.6], kasten:[2.9,1.7], treffer:[2.7,2.65,1.5], baue(g,k){ /* 8 Löscheimer */
      const eimer=(x,y,z)=>{ const e=gruppe(g,x,y,z);
        rohr(e,.48,.35,.82,ROT,0,.41,0,18,true); walze(e,.35,.05,ROT2,0,.03,0); flach(ring(e,.48,.04,METALL,0,.82,0)); flach(ring(e,.365,.03,ROT2,0,.06,0));
        rohr(e,.435,.405,.2,WEISS,0,.43,0,18,true); walze(e,.445,.03,0x58b8f0,0,.72,0);
        const b=ring(e,.48,.028,EISEN,0,.82,0,Math.PI); b.rotation.x=-.45; quer(walze(e,.06,.3,HOLZ,0,.82+.48*Math.cos(.45),-.48*Math.sin(.45))); };
      eimer(-.68,0,.1); eimer(.68,0,.1);
      box(g,2.5,.12,.9,HOLZ,0,1.38,-.05); box(g,2.5,.05,.1,HOLZ2,0,1.35,.4); [-1.22,1.22].forEach(a=>[-.4,.3].forEach(c=>box(g,.12,1.35,.12,HOLZ2,a,.675,c)));
      eimer(0,1.44,-.05); } },
  { x:-12.4, z:4.6, dreh:.32, steh:[-11.5,6.55], kasten:[3.4,2.0], treffer:[3.2,3.2,1.3], baue(g,k){ /* 9 Helmregal */
      [-1.5,1.5].forEach(a=>{ [-.42,.42].forEach(c=>box(g,.13,3.0,.13,HOLZ2,a,1.5,c)); box(g,.3,.1,1.15,HOLZ3,a,.05,0); });
      box(g,3.0,2.7,.06,HOLZ3,0,1.6,-.47);
      [.42,1.34,2.26].forEach((y,r)=>{ box(g,3.1,.1,.98,HOLZ,0,y,0); box(g,3.1,.08,.05,HOLZ2,0,y+.02,.5);
        [-.98,0,.98].forEach((a,i)=>FW.helm(g,a,y+.08,.04,[[ROT,GELB,WEISS],[GELB,WEISS,ROT],[WEISS,ROT,GELB]][r][i],1.22,(i-1)*-.14)); });
      box(g,3.2,.1,1.05,HOLZ2,0,3.02,0); } },
  { x:3.1, z:4.7, dreh:-.1, steh:[2.7,6.65], kasten:[3.2,1.6], treffer:[3.0,2.6,1.3], baue(g,k){ /* 10 Atemluft-Flaschen */
      /* Gestell */
      box(g,3.1,.14,1.05,STAHLD,0,.09,0); [-1.48,1.48].forEach(a=>[-.4,.4].forEach(c=>strich(g,[a,.1,c],[a,1.35,c],.06,BLAU)));
      [-.4,.4].forEach(c=>strich(g,[-1.48,1.1,c],[1.48,1.1,c],.06,BLAU)); [-1.48,1.48].forEach(a=>strich(g,[a,1.35,-.4],[a,1.35,.4],.06,BLAU));
      [-1.08,-.36,.36,1.08].forEach((a,i)=>{
        walze(g,.29,1.42,GELB,a,.88,0); ball(g,.29,GELB,a,1.59,0,1,.7,1); walze(g,.3,.1,SCHWARZ,a,.24,0); walze(g,.298,.12,WEISS,a,1.4,0); walze(g,.299,.05,SCHWARZ,a,1.31,0);
        walze(g,.09,.2,METALL,a,1.86,0); walze(g,.12,.08,METALL2,a,1.82,0); quer(walze(g,.05,.34,METALL,a,1.95,0)); quer(walze(g,.11,.1,SCHWARZ,a+(i%2?-.2:.2),1.95,0));
        flach(walze(g,.1,.07,METALL,a,2.1,.02)); flach(walze(g,.075,.02,WEISS,a,2.1,.065)); strich(g,[a,2.1,.08],[a+.04,2.14,.08],.01,ROT); });
      /* Halteriemen vorn */
      strich(g,[-1.48,.62,.4],[1.48,.62,.4],.045,SCHWARZ);
      [-.72,.72].forEach(a=>box(g,.18,.16,.08,ROT,a,.62,.43)); } }
];

return { titel:'Die Fahrzeughalle', breite:36, tiefe:27, oben:['16,20,28','48,56,68','104,114,128'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Der Übungshof an einem sonnigen Tag. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Hinter der Hofmauer stehen die Wache, Bäume und Häuser, im Hof der hohe Schlauchturm mit wehenden Schläuchen.
   Ausgang: das Hoftor hinten in der Mitte. Zwei Flügel schwingen zur Straße hin auf. */
RAEUME3D.feuerwache[2] = (function(){
const B=36, T=27;
const ZW=-T/2;                 /* Vorderseite der Rückwand */
const MH=3.15;                 /* Höhe der Hofmauer */
const TX=6.7, TZ=-11.5;        /* Schlauchturm */
const HIMMEL=0xbfe2fb;
const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });
/* Gegenstände und Deko mit vielen kleinen Kugeln: sparsamere Form */
function leicht(g){ const k=new THREE.SphereGeometry(1,10,7); g.traverse(m=>{ if(m.isMesh && m.geometry===GEO.sph) m.geometry=k; }); }
/* Taube mit nur wenigen Zeichenaufrufen: Körper und Kopf je zusammengefasst */
function taube(par,x,y,z,d){ const v=FW.taube(par,x,y,z,d); v.kopf.userData.lebendig=true; ohneSchatten(v.g); verschmelze(v.kopf); verschmelze(v.g); return v; }
/* viereckiges Pyramidendach: halbe=halbe Kantenlänge in x und z, Mitte bei y */
let PYR=null;
function pyramide(par,farbe,x,y,z,halbX,h,halbZ){ if(!PYR){ PYR=new THREE.ConeGeometry(1,1,4); PYR.rotateY(Math.PI/4); } return teil(par,PYR,farbe,x,y,z,halbX*1.414,h,halbZ*1.414); }
/* Schlauch als weiche Linie durch mehrere Punkte */
function schlauch(par,punkte,r,farbe){
  const kurve=new THREE.CatmullRomCurve3(punkte.map(p=>V(p[0],p[1],p[2])));
  const m=new THREE.Mesh(new THREE.TubeGeometry(kurve,punkte.length*9,r,7,false),mat(farbe)); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}
/* fünfzackiger Stern auf einer Leinwand */
function sternMalen(c,x,y,r){ c.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, q=i%2?r*.45:r; c[i?'lineTo':'moveTo'](x+Math.cos(a)*q,y+Math.sin(a)*q); } c.closePath(); c.fill(); }

/* ---------- Licht, Hofboden ---------- */
function grund(k){
  const sc=FW.freiluft(k,{ himmelLicht:0xf4faff, grund:0x77705f, staerke:.76, sonne:0xfff0c8, sonneStaerke:.52, bodenFarbe:'#74a246' });
  const t=bild(512,512,g=>{ g.fillStyle='#aeaca4'; g.fillRect(0,0,512,512);
    for(let r=0;r<2;r++) for(let s=0;s<2;s++){ const v=Math.floor(zufall()*10)-5; g.fillStyle='rgb('+(176+v)+','+(173+v)+','+(164+v)+')'; g.fillRect(s*256+2,r*256+2,252,252); }
    for(let i=0;i<1900;i++){ g.fillStyle=i%2?'rgba(255,255,255,.2)':'rgba(70,62,48,.16)'; g.fillRect(zufall()*508,zufall()*508,2+zufall()*3,2+zufall()*2); } });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(36.4/8,58/8);
  const hof=new THREE.Mesh(new THREE.PlaneGeometry(36.4,58),new THREE.MeshLambertMaterial({map:t})); hof.rotation.x=-Math.PI/2; hof.position.set(0,0,ZW+29); hof.receiveShadow=true; sc.add(hof);
  /* aufgemalte Linien: Laufbahn, Zufahrt zum Tor, Rinnen */
  const g=gruppe(sc,0,0,0);
  [8.9,10.3].forEach(z=>box(g,31,.012,.12,0xf6f2e6,0,.008,z));
  [-15.5,15.5].forEach(x=>box(g,.14,.012,1.52,0xf6f2e6,x,.009,9.6));
  [-2.6,2.6].forEach(x=>{ for(let i=0;i<5;i++) box(g,.18,.012,1.1,FW.GELB,x,.008,-12.3+i*2.1); });
  [[-6,0],[9,6.4],[-1.5,12.3],[15.4,-8.6]].forEach(([x,z])=>{ box(g,1.1,.014,.7,FW.EISEN,x,.008,z); for(let i=0;i<6;i++) box(g,.07,.016,.56,FW.METALL,x-.42+i*.17,.01,z); });
  ohneSchatten(g); verschmelze(g);
}

/* ---------- Hofmauer rings um den Hof ---------- */
function mauern(k){
  const ziegel=FW.ziegelBild([176,86,60]);
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts');
  const l=B/2+.5-3.3;
  [-1,1].forEach(v=>{ FW.mauer(hinten,ziegel,l,MH,.5,v*(3.3+l/2),MH/2,ZW-.25); });
  FW.mauer(links,ziegel,.5,MH,T,-B/2-.25,MH/2,0); FW.mauer(rechts,ziegel,.5,MH,T,B/2+.25,MH/2,0);
  const h=gruppe(hinten,0,0,0);
  [-1,1].forEach(v=>{ box(h,l+.1,.22,.72,FW.STEIN,v*(3.3+l/2),MH+.1,ZW-.25); box(h,l,.3,.1,FW.STEIN2,v*(3.3+l/2),.15,ZW+.02);
    [4,10.2,18].forEach(x=>{ if(x===10.2&&v>0) return; box(h,.55,MH+.35,.66,0x98452f,v*x,(MH+.35)/2,ZW-.25); box(h,.75,.2,.84,FW.STEIN,v*x,MH+.44,ZW-.25); }); });
  ohneSchatten(h); verschmelze(h);
  [[links,-1],[rechts,1]].forEach(([w,s])=>{ const g=gruppe(w,0,0,0);
    box(g,.72,.22,T+.2,FW.STEIN,s*(B/2+.25),MH+.1,0); box(g,.1,.3,T,FW.STEIN2,s*(B/2-.02),.15,0);
    [-13.4,-9,-.2,6.6,13.3].forEach(z=>{ box(g,.66,MH+.35,.55,0x98452f,s*(B/2+.25),(MH+.35)/2,z); box(g,.84,.2,.75,FW.STEIN,s*(B/2+.25),MH+.44,z); });
    ohneSchatten(g); verschmelze(g); });
  return { hinten, links, rechts };
}

/* ---------- Ausgang: das Hoftor, dahinter die Straße ---------- */
function hoftor(k){
  const sc=k.scene, Z=ZW-.15;
  const g=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ box(g,.8,3.9,.8,0xc4c2bc,v*2.95,1.95,Z); box(g,1.02,.24,1.02,FW.STEIN2,v*2.95,3.98,Z); box(g,.92,.3,.92,FW.STEIN2,v*2.95,.15,Z);
    walze(g,.18,.16,FW.EISEN,v*2.95,4.18,Z); ball(g,.27,FW.ROT,v*2.95,4.46,Z);
    [1.1,2.1,3.1].forEach(y=>box(g,.84,.05,.84,FW.STEIN,v*2.95,y,Z)); });
  box(g,5.1,.03,.5,FW.METALL2,0,.015,Z);
  verschmelze(g);
  [-1,1].forEach(v=>k.kasten(v*2.95,Z,.9,.9));
  k.kasten(0,Z-.1,5.2,.5);
  /* Zufahrt, Straße und Gehwege (die Häuser stehen gegenüber) */
  const s=gruppe(sc,0,0,0);
  box(s,8.4,.03,9.4,0xc4c0b4,0,.004,-18.3); [-4.3,4.3].forEach(x=>box(s,.2,.1,9.4,0xa6a296,x,.04,-18.3));
  box(s,90,.03,1.6,0xd0ccc0,0,.006,-23.2); box(s,90,.03,4.8,0x55565e,0,.008,-26.4); box(s,90,.03,1.6,0xd0ccc0,0,.006,-29.6);
  box(s,90,.12,.16,0xa6a296,0,.04,-24); box(s,90,.12,.16,0xa6a296,0,.04,-28.8);
  for(let x=-42;x<43;x+=3) box(s,1.5,.014,.18,FW.WEISS,x,.03,-26.4);
  for(let i=0;i<4;i++) box(s,.9,.014,.22,FW.GELB,-2.7+i*1.8,.026,-14.6);
  ohneSchatten(s); verschmelze(s);
  /* ein kleines Auto fährt vorbei */
  const auto=gruppe(sc,0,0,-25.6); auto.userData.lebendig=true; const a=gruppe(auto,0,0,0);
  box(a,2.6,.6,1.3,0x2f88c8,0,.65,0); box(a,1.4,.55,1.2,0x2f88c8,-.15,1.2,0); box(a,1.1,.38,1.24,FW.GLAS,-.15,1.22,0);
  [-.85,.85].forEach(x=>[-.62,.62].forEach(z=>{ walze(a,.34,.2,FW.GUMMI,x,.34,z).rotation.x=Math.PI/2; walze(a,.14,.22,FW.METALL,x,.34,z).rotation.x=Math.PI/2; }));
  [-.4,.4].forEach(z=>ball(a,.11,basis(0xfff6b0),1.3,.7,z,.4,1,1));
  ohneSchatten(a); verschmelze(a);
  k.anim.push(t=>{ auto.position.x=((t*3.2+8)%56)-28; });
  /* zwei Torflügel, außen angeschlagen, oben rund abgeschlossen (keine Spitzen) */
  const fluegel=[-1,1].map(v=>{
    const f=gruppe(sc,v*2.53,0,Z), r=-v;
    [.34,1.36,2.86].forEach(y=>box(f,2.46,.14,.14,FW.ROT,r*1.25,y,0));
    [.07,2.43].forEach(x=>box(f,.16,2.75,.18,FW.ROT2,r*x,1.58,0));
    for(let i=1;i<7;i++) walze(f,.05,2.55,FW.ROT,r*(.07+i*.337),1.6,0);
    box(f,2.3,.9,.07,FW.ROT2,r*1.25,.85,0);
    [0,1,2,3].forEach(i=>{ const q=box(f,.16,.95,.02,FW.WEISS,r*(.5+i*.5),.85,.05); q.rotation.z=v*.55; });
    const bogen=ring(f,.5,.05,FW.ROT,r*1.25,2.9,0,Math.PI); bogen.scale.set(2.3,.75,1);
    walze(f,.06,.5,FW.EISEN,0,.6,0); walze(f,.06,.5,FW.EISEN,0,2.6,0);
    verschmelze(f); return f; });
  const sch=gruppe(fluegel[1],-1.58,1.88,.2); box(sch,1.36,1.3,.1,FW.EISEN,0,.1,-.07); const schloss=FW.zahlenschloss(sch,0,0,.08); schloss.scale.setScalar(1.35); verschmelze(sch);
  return ausgang(k,{ steh:[-.9,-11.5], durch:[-.2,-17.4], treffer:{x:0,y:1.75,z:ZW+.4,b:5.1,h:3.5,t:1}, name:'Hoftor', einfach:'Hoftor', schildOben:[0,4.9,ZW+.3], glanz:[.95,2.1,ZW+.75],
    blick:{ pitch:.42, zoom:.9 }, losNach:1.2, warte:.3,
    bewege:auf=>{ fluegel[0].rotation.y=auf*1.5; fluegel[1].rotation.y=-auf*1.5; } });
}

/* ---------- Schlauchturm mit wehenden Schläuchen ---------- */
function schlauchturm(k){
  const sc=k.scene, turm=gruppe(sc,0,0,0);
  const fest=gruppe(turm,TX,0,TZ);
  FW.mauer(fest,FW.ziegelBild([196,62,48],'#e8d8c8'),2.7,10.4,2.5,0,5.2,0);
  box(fest,3,.4,2.8,FW.STEIN2,0,.2,0); box(fest,3.1,.3,2.9,FW.WEISS,0,10.5,0);
  pyramide(fest,0x5c606c,0,11.6,0,1.7,1.9,1.6); ball(fest,.2,FW.GOLD,0,12.65,0);
  [2.4,5.9,8.2].forEach(y=>box(fest,2.78,.18,2.58,FW.WEISS,0,y-1.05,0));
  /* Fenster seitlich, vorn nur oben (unten hängen die Schläuche) */
  [2.5,4.9,7.3].forEach(y=>[-1,1].forEach(v=>{ box(fest,.08,1,.8,FW.WEISS,v*1.37,y,0); box(fest,.1,.82,.62,FW.GLAS,v*1.38,y,0); box(fest,.12,.82,.05,FW.WEISS,v*1.38,y,0); }));
  [6.9,9.2].forEach(y=>{ box(fest,.95,1,.08,FW.WEISS,0,y,1.27); box(fest,.76,.82,.1,FW.GLAS,0,y,1.28); box(fest,.05,.82,.12,FW.WEISS,0,y,1.28); box(fest,1.1,.1,.24,FW.STEIN,0,y-.54,1.32); });
  /* Ausleger mit Rundholz, an dem die Schläuche trocknen */
  [-1.2,1.2].forEach(x=>{ box(fest,.14,.14,1.1,FW.EISEN,x,5.45,1.75); strich(fest,[x,4.6,1.26],[x,5.4,2.05],.05,FW.EISEN); });
  walze(fest,.09,3.5,FW.HOLZ2,0,5.45,2.2).rotation.z=Math.PI/2; [-1.75,1.75].forEach(x=>ball(fest,.13,FW.GOLD,x,5.45,2.2));
  verschmelze(fest);
  /* Schläuche: oben und unten ein eigenes Gelenk, damit sie schwingen */
  [[-1.4,0xf2e6c8,3.9],[-.7,0xffd860,3.4],[0,0xf2e6c8,4.1],[.7,0xe8f0f4,3.2],[1.4,0xf2e6c8,3.7]].forEach(([x,f,len],i)=>{
    const o=gruppe(turm,TX+x,5.4,TZ+2.24); o.userData.lebendig=true; const l1=len*.5, oben=gruppe(o,0,0,0);
    ring(oben,.13,.06,f,0,0,-.04,Math.PI).rotation.y=Math.PI/2;
    [-.13,.13].forEach(v=>box(oben,.14,l1,.08,f,v,-l1/2,.04));
    verschmelze(oben);
    const u=gruppe(o,0,-l1,.04); u.userData.lebendig=true; const l2=len-l1;
    [-.13,.13].forEach((v,j)=>{ const l=l2-(j?.35:0); box(u,.14,l,.08,f,v,-l/2+.03,0); walze(u,.1,.22,FW.GOLD,v,-l-.05,0); walze(u,.115,.06,0xa87c20,v,-l-.14,0); });
    verschmelze(u);
    k.anim.push(t=>{ o.rotation.x=-.1+Math.sin(t*1.5+i*1.3)*.09; o.rotation.z=Math.sin(t*1.1+i)*.05; u.rotation.x=-.06+Math.sin(t*2.1+i*1.7)*.16; u.rotation.z=Math.sin(t*1.7+i*2)*.07; });
  });
  k.verdecker(turm,TX,TZ+.9,2);
  k.kasten(TX,TZ+.75,3.6,3.9); /* Turm samt hängenden Schläuchen */
  /* Schlauchrollen und Kupplungen am Fuß */
  const g=gruppe(sc,0,0,0);
  [[-2.1,0,0]].forEach(([x,y,z],i)=>{ FW.schlauchrolle(g,TX+x,.46+y,TZ+.5+z,.46,i?0xd8503a:0xf2e6c8); });
  FW.schlauchrolle(g,TX+2.05,.5,TZ+.7,.5,0xf2e6c8);
  verschmelze(g);
  k.kreis(TX-2.1,TZ+.5,.55); k.kreis(TX+2.05,TZ+.7,.6);
}

/* ---------- die Wache und die Häuser hinter der Mauer ---------- */
function fenster(liste,x,y,z,quer){
  const b=quer?.06:.8, t=quer?.8:.06;
  liste.push([x,y,z,b+(quer?0:.16),1.12,t+(quer?.16:0),0xfaf6ee]);
  const d=quer?(x<0?.04:-.04):0, dz=quer?0:.04;
  liste.push([x+d,y,z+dz,b,.94,t,0x74b4e4]);
  liste.push([x+d*1.5,y,z+dz*1.5,quer?b:.06,.94,quer?.06:t,0xfaf6ee]);
}
function umgebung(k,W){
  const sc=k.scene;
  /* Wache: links hinter der Rückwand */
  const w=gruppe(sc,0,0,0), z=-18.6, ziegel=FW.ziegelBild([190,70,50]);
  FW.mauer(w,ziegel,14,6.6,3.6,-12,3.3,z);
  FW.mauer(w,ziegel,4,8.4,3.8,-21,4.2,z);
  const g=gruppe(w,0,0,0), F=[];
  box(g,14.4,.35,4,FW.WEISS,-12,6.75,z); box(g,13.6,.5,3.2,0x5c606c,-12,7.15,z); box(g,4.4,.35,4.2,FW.WEISS,-21,8.55,z);
  pyramide(g,0x5c606c,-21,9.6,z,2.3,1.8,2.2);
  box(g,14.1,.18,3.72,FW.WEISS,-12,3.3,z);
  [-18,-15.8,-13.6,-8.2,-6.2].forEach(x=>{ fenster(F,x,4.45,z+1.8); fenster(F,x,1.9,z+1.8); });
  [-21.8,-20.2].forEach(x=>[2,4.4,6.8].forEach(y=>fenster(F,x,y,z+1.9)));
  verschmelze(g); FW.viele(w,GEO.box,F);
  const t112=bild(256,160,c=>{ c.fillStyle='#ffffff'; c.fillRect(0,0,256,160); c.strokeStyle='#d0261c'; c.lineWidth=14; c.strokeRect(8,8,240,144); c.fillStyle='#d0261c'; c.font='900 96px Andika, Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('112',128,86); });
  FW.tafel(w,t112,2.5,1.56,-10.9,4.25,z+1.86);
  /* Blaulicht auf dem Dach */
  const bm=basis(0x3a8aff), lampen=[-14.5,-9.5].map(x=>{ walze(w,.25,.12,FW.EISEN,x,7.46,z+1.2); const b=ball(w,.26,bm,x,7.62,z+1.2,1,.9,1); b.userData.lebendig=true; b.castShadow=false; return b; });
  k.anim.push(t=>{ lampen.forEach((b,i)=>{ const s=.26*(Math.floor(t*3+i)%2?1:.72); b.scale.set(s,s*.9,s); }); });
  ohneSchatten(w);
  /* bunte Häuser */
  const haeuser=(par,liste)=>{ const h=gruppe(par,0,0,0), f=[];
    liste.forEach(([x,zz,b,hh,farbe,dachf,quer])=>{
      const bx=quer?3.4:b, bz=quer?b:3.4;
      box(h,bx,hh,bz,farbe,x,hh/2,zz); box(h,bx+.2,.2,bz+.2,FW.WEISS,x,hh+.05,zz);
      pyramide(h,dachf,x,hh+1.1,zz,bx/2+.25,1.9,bz/2+.25);
      box(h,.4,1,.4,0x8a4a3a,x+bx*.22,hh+1.35,zz);
      for(let y=hh-1;y>.8;y-=1.65) for(let u=-b/2+.85;u<b/2-.5;u+=1.35){ if(quer) fenster(f,x+(x<0?1.72:-1.72),y,zz+u,true); else fenster(f,x+u,y,zz+1.72); }
    });
    ohneSchatten(h); verschmelze(h); FW.viele(par,GEO.box,f); };
  haeuser(sc,[[-4.2,-32.6,3.8,4.4,0xf2d488,0xb04830],[.4,-33.4,4.2,5.2,0x9cc8e0,0x5c606c],[5.2,-32.4,4,3.8,0xe8a088,0x8a3a2a],[10,-32.8,4.2,5.6,0xf4ead0,0xb04830],[15.1,-32.4,4.6,4.4,0xb4d89c,0x6a4a3a],[20.4,-33,4.4,6,0xf0b878,0x5c606c],[26,-32.6,4.8,4.6,0xc8b0e0,0xb04830],
    [-27,-32.8,5,5,0xf2d488,0x6a4a3a],[-9.6,-33.2,5,6.4,0xe8d0b0,0x8a3a2a],[-15.5,-32.6,4.6,5,0x9cc8e0,0xb04830],[32,-32.4,5,5.4,0x9cc8e0,0x8a3a2a],[-33,-32,5,4.6,0xe8a088,0x5c606c],[-21.4,-33,4.6,4.2,0xb4d89c,0x8a3a2a],[28,-18.6,5,4.6,0xf2d488,0x8a3a2a]]);
  haeuser(W.links,[[-26,-10,4.6,4.8,0xf4ead0,0xb04830,true],[-27,-3.8,5,6,0x9cc8e0,0x5c606c,true],[-26,2.8,4.4,4.2,0xf0b878,0x8a3a2a,true],[-27.5,9.4,5,5.4,0xb4d89c,0x6a4a3a,true],[-26,16.5,5,4.4,0xe8a088,0xb04830,true]]);
  haeuser(W.rechts,[[26,-12,4.8,5.6,0xe8a088,0x5c606c,true],[27,-5.4,4.6,4.4,0xf2d488,0xb04830,true],[26,1.2,5,6.2,0xb4d89c,0x8a3a2a,true],[27.4,8,4.6,4.6,0xc8b0e0,0x6a4a3a,true],[26,15,5,5.2,0x9cc8e0,0xb04830,true]]);
  /* Bäume */
  const baeume=(par,liste)=>{ const h=gruppe(par,0,0,0); liste.forEach(([x,zz,hh],i)=>FW.laubbaum(h,x,zz,hh,[FW.LAUB,0x5a9a3a,0x6aa840][i%3])); ohneSchatten(h); verschmelze(h); };
  baeume(sc,[[-6.2,-21.8,3],[6.2,-17.6,3],[9.8,-20.4,4.4],[15.8,-16.4,6.4],[19.8,-15.6,5.4],[13.6,-21,4],[23.5,-18,6],[-26.5,-16,6.2],[-30,-12,5],[-24,-21.4,4.4],[31,-14,5.8]]);
  baeume(W.links,[[-21.2,-9,5.6],[-20.8,-2.4,4.8],[-22,4.4,6],[-20.8,11,5],[-22.4,-14,5.4],[-31,5,6]]);
  baeume(W.rechts,[[21.2,-8.4,5.2],[20.9,-1.6,5.8],[21.8,5.6,4.8],[20.9,12,5.6],[31,-2,6]]);
  /* vorn draußen: Bäume nur weit an der Seite, dazwischen niedrige Büsche */
  baeume(sc,[[-24,19,5],[-31,27,6],[24,20,5.4],[32,28,6],[-23,31,5],[23,33,5.6]]);
  const b=gruppe(sc,0,0,0);
  for(let i=0;i<22;i++){ const x=(i%2?1:-1)*(19.8+zufall()*4), zz=14.5+i*.95; FW.busch(b,x,zz,.45+zufall()*.35); }
  ohneSchatten(b); verschmelze(b);
  FW.wiesenschmuck(sc,-34,-19,14,34,240,40); FW.wiesenschmuck(sc,19,34,14,34,240,40);
  /* Wolken */
  const wm=basis(0xffffff);
  [[-24,14,-44],[2,17,-52],[26,13.5,-40],[-40,12,-10],[42,15,-6]].forEach(([x,y,zz],i)=>{ const c=gruppe(sc,x,y,zz); c.userData.lebendig=true; const q=gruppe(c,0,0,0);
    [[0,0,0,2.1],[2.1,-.3,0,1.5],[-2.2,-.4,.2,1.4],[.8,.8,0,1.4]].forEach(([a,d,e,r])=>ball(q,r,wm,a,d,e,1.25,.65,.8)); ohneSchatten(q); verschmelze(q);
    k.anim.push(t=>{ c.position.x=x+Math.sin(t*.04+i*2)*7; }); });
}

/* ---------- Übende Einsatzkräfte (am Rand) ---------- */
function mannschaft(k){
  const sc=k.scene;
  /* eine Einsatzkraft läuft Runden */
  const o=gruppe(sc,-15.5,0,0); o.userData.lebendig=true;
  const m=FW.mensch(null,o,0,0,Math.PI/2,{ haut:1, helm:FW.GELB, winkt:false });
  laeufer(k,o,[[-15.5,-.8],[-13.2,-.4],[-13,8],[-15.5,8.4]],2.6,0,9);
  k.anim.push(t=>{ const s=Math.sin(t*9); m.armL.rotation.x=s*.9; m.armR.rotation.x=-s*.9; m.g.position.y=Math.abs(s)*.1; });
  /* zwei winken */
  FW.mensch(k,sc,15.9,9.6,-.6,{ haut:0, helm:FW.ROT, phase:1 }); k.kreis(15.9,9.6,.5);
  FW.mensch(k,sc,3.9,-11.7,.2,{ haut:2, helm:FW.WEISS, phase:3.4 }); k.kreis(3.9,-11.7,.5);
}

/* ---------- Ausstattung im Hof ---------- */
function ausstattung(k,W){
  const sc=k.scene;
  const g=gruppe(sc,0,0,0);
  /* Fahne mit weißer Flamme */
  walze(g,.09,5.4,FW.METALL,-4.8,2.7,-12.4); ball(g,.15,FW.GOLD,-4.8,5.45,-12.4); walze(g,.34,.2,FW.STEIN2,-4.8,.1,-12.4); k.kreis(-4.8,-12.4,.38);
  const fahne=[0,1,2,3].map(i=>{ const f=gruppe(sc,-4.72+i*.42,4.65,-12.4); f.userData.lebendig=true; box(f,.43,1.1,.04,FW.ROT,.21,0,0); if(i===1){ [-1,1].forEach(v=>{ ball(f,.2,FW.ORANGE,.22,-.14,v*.03,1,1,.15); kegel(f,.13,.46,FW.ORANGE,.15,.14,v*.03).scale.z=.03; kegel(f,.09,.3,FW.ORANGE,.35,.08,v*.03).scale.z=.03; ball(f,.11,FW.GELB,.22,-.18,v*.05,1,1.2,.15); kegel(f,.08,.24,FW.GELB,.2,-.02,v*.05).scale.z=.03; }); } box(f,.43,.14,.05,FW.GELB,.21,-.48,0); ohneSchatten(f); verschmelze(f); return f; });
  k.anim.push(t=>{ let z=-12.4; fahne.forEach((f,i)=>{ const a=Math.sin(t*3.2-i*1.1)*.32; f.rotation.y=a; f.position.x=i?fahne[i-1].position.x+Math.cos(fahne[i-1].rotation.y)*.42:-4.72; f.position.z=z; z-=Math.sin(a)*.42; }); });
  /* Hoflaternen */
  [[-16.9,-12.4],[16.9,-12.3],[-17,12.6],[17,12.6]].forEach(([x,z])=>{ walze(g,.08,3.6,FW.EISEN,x,1.8,z); walze(g,.25,.2,FW.EISEN,x,.1,z); box(g,.5,.5,.5,0xfff0b0,x,3.85,z); pyramide(g,FW.EISEN,x,4.28,z,.38,.35,.38); box(g,.6,.08,.6,FW.EISEN,x,3.58,z); k.kreis(x,z,.3); });
  /* Bank mit Helmen und Handtuch */
  const bank=(x,z,quer)=>{ const b=gruppe(g,x,0,z); b.rotation.y=quer; [-1,1].forEach(v=>{ box(b,.16,.55,.6,FW.EISEN,v*1.05,.28,0); box(b,.12,.9,.1,FW.EISEN,v*1.05,.9,-.34); }); [-.2,.03,.26].forEach(a=>box(b,2.5,.09,.2,FW.HOLZ,0,.6,a)); [1,1.28].forEach(y=>box(b,2.5,.2,.08,FW.HOLZ,0,y,-.3));
    FW.helm(b,-.7,.66,.02,FW.GELB,.95,.4); FW.helm(b,.02,.66,.04,FW.ROT,.95,-.3); box(b,.55,.06,.62,0x4a90d0,.75,.67,.05); box(b,.55,.4,.05,0x4a90d0,.75,.47,.38); };
  bank(-16.7,3.8,Math.PI/2); k.kasten(-16.9,3.8,.9,2.7);
  bank(16.8,6.4,-Math.PI/2); k.kasten(16.95,6.4,.9,2.7);
  /* Reifenstapel */
  [[16.5,-10.8,3],[15.2,-11.8,2],[-16.5,-1.9,3]].forEach(([x,z,n])=>{ for(let i=0;i<n;i++){ ring(g,.42,.19,FW.GUMMI,x+(i%2)*.06,.2+i*.35,z).rotation.x=Math.PI/2; ring(g,.43,.04,FW.GELB,x+(i%2)*.06,.37+i*.35,z).rotation.x=Math.PI/2; } k.kreis(x,z,.65); });
  /* Wasserfässer */
  [[9.5,-12.4,0x2f68c0]].forEach(([xx,z,f])=>{ walze(g,.5,1.15,f,xx,.58,z); [.2,.62,1.05].forEach(y=>ring(g,.5,.035,FW.METALL,xx,y,z).rotation.x=Math.PI/2); walze(g,.42,.05,0x9ad8f4,xx,1.17,z); k.kreis(xx,z,.55); });
  /* Blumenkübel an den Ecken und am Tor */
  [[-3.85,-12.4],[-16.8,10.8],[16.8,11.2],[16.8,1.4],[-16.8,-8.8]].forEach(([x,z],i)=>{ box(g,.85,.6,.85,0x9a5a34,x,.3,z); box(g,.97,.1,.97,FW.HOLZ2,x,.62,z); ball(g,.45,FW.LAUB,x,.82,z,1,.7,1);
    for(let j=0;j<9;j++){ const a=j*.7; ball(g,.1,[FW.ROT,FW.GELB,FW.WEISS][(i+j)%3],x+Math.cos(a)*(.12+(j%3)*.11),1.08-(j%3)*.07,z+Math.sin(a)*(.12+(j%3)*.11)); } k.kreis(x,z,.55); });
  /* Büsche an der Mauer */
  [[-11.6,-12.6,.42],[10.9,12.7,.5],[-11,12.7,.5],[-5,12.8,.45],[5.6,12.8,.45],[-17.1,-10.5,.45],[17.1,-6.8,.5],[17.1,3.8,.4],[-17.1,6.7,.4],[17.1,-1,.42]].forEach(([x,z,r])=>{ FW.busch(g,x,z,r); k.kreis(x,z,r*1.25); });
  /* ausgerollte Schläuche mit Kupplungen (flach, ohne Hindernis) */
  [[[[-13,.07,11.8],[-9,.07,11.2],[-5.6,.07,12],[-2.8,.07,11.3]],0xf2e6c8]].forEach(([P,f])=>{
    schlauch(g,P,.075,f); [P[0],P[P.length-1]].forEach(p=>{ ball(g,.15,FW.GOLD,p[0],.09,p[2],1,.7,1); }); });
  leicht(g); verschmelze(g);
  /* Gras in den Fugen am Rand */
  const halme=[];
  for(let i=0;i<260;i++){ const s=i%3, x=s===0?-17.8+zufall()*.7:s===1?17.1+zufall()*.7:-17.6+zufall()*35.2, z=s===2?(i%2?-13.3+zufall()*.25:13+zufall()*1.4):-13+zufall()*26;
    if(Math.abs(x)<3.8 && z<-12) continue; halme.push([x,.09,z,.05,.18+zufall()*.1,.05,[FW.LAUB,FW.LAUB2,FW.LAUB3][i%3],0,(zufall()-.5)*.5,(zufall()-.5)*.5]); }
  FW.viele(sc,GEO.cone,halme);
  /* Tauben auf der Mauer und im Hof */
  [[W.hinten,-11.4,MH+.21,-13.7,.4],[W.hinten,4.8,MH+.21,-13.6,2.6],[W.links,-18.2,MH+.21,2.2,.1],[W.rechts,18.2,MH+.21,-6.4,3.2],[sc,-1.4,0,12.2,.8],[sc,-.4,0,11.8,2.4]].forEach(([p,x,y,z,d],i)=>{
    const v=taube(p,x,y,z,d); k.anim.push(t=>{ v.kopf.rotation.z=-Math.max(0,Math.sin(t*2.4+i*1.9))*.7; }); });
  /* Singvögel am Himmel */
  for(let i=0;i<3;i++){ const v=gruppe(sc,0,5,-14), m=basis(i%2?0x35507a:0x5a3a2a); v.userData.lebendig=true;
    ball(v,.14,m,0,0,0,2,.75,.75).castShadow=false; ball(v,.1,m,.28,.07,0).castShadow=false;
    const fl=[-1,1].map(s=>{ const f=gruppe(v,0,0,0); box(f,.22,.03,.55,m,-.02,0,s*.33).castShadow=false; return f; });
    const w0=i*1.6, r=6+(i%3)*2;
    k.anim.push(t=>{ const a=t*.3+w0; v.position.set(-4+Math.cos(a)*r*1.5,4.7+(i%3)*.5+Math.sin(t*1.3+i)*.25,-15.3+Math.sin(a)*.9); v.rotation.y=Math.atan2(-Math.cos(a)*.9,-Math.sin(a)*r*1.5); const s=Math.sin(t*8+i)*.65; fl[0].rotation.x=s; fl[1].rotation.x=-s; }); }
}

/* ---------- Gegenstände ---------- */
/* 1 Zeitanzeige: schwarze Tafel mit laufenden Leuchtziffern, Stoppuhr-Zeichen und Stopptaster */
function zeitanzeige(g,k){
  [-1.3,1.3].forEach(x=>box(g,.14,1.9,.14,FW.METALL2,x,.95,.02));
  box(g,3.6,1.65,.24,FW.METALL,0,2.5,.02); box(g,3.34,1.4,.06,0x101014,0,2.5,.14);
  /* Stoppuhr obendrauf */
  walze(g,.5,.18,FW.GELB,0,3.8,.05).rotation.x=Math.PI/2; walze(g,.39,.04,FW.WEISS,0,3.8,.16).rotation.x=Math.PI/2; walze(g,.1,.2,FW.METALL2,0,4.37,.05); box(g,.3,.1,.16,FW.ROT,0,4.5,.05);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4; ball(g,.03,FW.SCHWARZ,Math.cos(a)*.31,3.8+Math.sin(a)*.31,.19); }
  const zeiger=gruppe(g,0,3.8,.22); zeiger.userData.lebendig=true; box(zeiger,.05,.32,.02,FW.ROT,0,.13,0); ball(zeiger,.05,FW.SCHWARZ,0,0,0);
  /* Ziffern aus je sieben Leuchtstreifen */
  const X=[-1.18,-.56,.56,1.18], S=[[0,.42,.3,.09],[.2,.21,.09,.33],[.2,-.21,.09,.33],[0,-.42,.3,.09],[-.2,-.21,.09,.33],[-.2,.21,.09,.33],[0,0,.3,.09]];
  const MUSTER=['abcdef','bc','abged','abgcd','fgbc','afgcd','afgedc','abc','abcdefg','abcdfg'];
  X.forEach(x=>S.forEach(s=>box(g,s[2],s[3],.02,0x143020,x+s[0],2.5+s[1],.175)));
  [-.18,.18].forEach(y=>ball(g,.075,basis(0x4cff70),0,2.5+y,.19,1,1,.4));
  const im=new THREE.InstancedMesh(GEO.box,basis(0x4cff70),28), o=new THREE.Object3D(); im.frustumCulled=false; g.add(im);
  let alt=-1;
  const zeige=sek=>{ if(sek===alt) return; alt=sek; const m=Math.floor(sek/60), s=sek%60, Z=[0,m%10,Math.floor(s/10),s%10];
    Z.forEach((z,i)=>S.forEach((e,j)=>{ const an=MUSTER[z].indexOf('abcdefg'[j])>=0; o.position.set(X[i]+e[0],2.5+e[1],.2); o.scale.set(an?e[2]:0,an?e[3]:0,an?.02:0); o.updateMatrix(); im.setMatrixAt(i*7+j,o.matrix); })); im.instanceMatrix.needsUpdate=true; };
  zeige(47);
  k.anim.push(t=>{ zeige(47+(Math.floor(t)%540)); zeiger.rotation.z=-Math.floor(t)*Math.PI/15; });
  /* Stopptaster auf einem Pfosten */
  walze(g,.32,.1,FW.EISEN,1.25,.05,.5); walze(g,.09,1,FW.GELB,1.25,.55,.5); walze(g,.26,.18,FW.GELB,1.25,1.1,.5); ball(g,.2,FW.ROT,1.25,1.2,.5,1,.75,1);
  schlauch(g,[[1.25,.06,.45],[.7,.04,.25],[1.1,.2,.08],[1.28,1.7,.1]],.03,FW.SCHWARZ);
}
/* 2 Spritzwand mit Zielklappen und Wasserstrahl aus einem Strahlrohr auf einem Ständer */
function spritzwand(g,k){
  [-1.3,1.3].forEach(x=>box(g,.18,1,.16,FW.METALL2,x,.5,.02));
  box(g,3.3,2.9,.16,FW.WEISS,0,2.15,.02);
  [[0,3.62,3.46,.16],[0,.68,3.46,.16],[-1.66,2.15,.16,3.1],[1.66,2.15,.16,3.1]].forEach(([x,y,w,h])=>box(g,w,h,.24,FW.ROT,x,y,.04));
  /* blaue Tropfen als Zeichen */
  [-.15,.2].forEach((x,i)=>{ const y=3.12-i*.14; ball(g,.12,FW.BLAU,x,y,.11,1,1,.3); kegel(g,.1,.22,FW.BLAU,x,y+.16,.11).scale.z=.03; });
  const klappen=[[-.92,2.5],[0,1.5],[.92,2.5]].map(([x,y],i)=>{
    box(g,.9,.09,.3,FW.EISEN,x,y-.56,.2); [-.35,.35].forEach(v=>walze(g,.05,.16,FW.EISEN,x+v,y-.5,.28).rotation.z=Math.PI/2);
    walze(g,.5,.03,0x30343c,x,y,.11).rotation.x=Math.PI/2;
    const f=gruppe(g,x,y-.5,.3); f.userData.lebendig=true;
    [[.47,FW.ROT],[.33,FW.WEISS],[.2,FW.ROT],[.08,FW.GELB]].forEach(([r,c],j)=>walze(f,r,.05+j*.012,c,0,.5,0).rotation.x=Math.PI/2);
    verschmelze(f); return f; });
  k.anim.push(t=>{ klappen[1].rotation.x=-.22-Math.abs(Math.sin(t*6.5))*.2; klappen[0].rotation.x=-Math.max(0,Math.sin(t*.9))*.05; klappen[2].rotation.x=-Math.max(0,Math.sin(t*.9+3))*.05; });
  /* Strahlrohr: rund, mit Brause, auf einem Dreibein */
  const D=[-1.5,1.25,2.45], Zp=[0,1.5,.5];
  [[-.4,.25],[.4,.25],[0,-.45]].forEach(([a,b])=>{ strich(g,[D[0],.95,D[2]],[D[0]+a,.04,D[2]+b],.045,FW.EISEN); ball(g,.07,FW.GUMMI,D[0]+a,.05,D[2]+b); });
  walze(g,.12,.22,FW.ROT,D[0],1.02,D[2]);
  const r=V(Zp[0]-D[0],Zp[1]+1.7-D[1],Zp[2]-D[2]).normalize();
  const bei=l=>[D[0]+r.x*l,D[1]+r.y*l,D[2]+r.z*l];
  strich(g,bei(-.45),bei(.2),.1,FW.GOLD); strich(g,bei(-.55),bei(-.42),.14,FW.ROT); strich(g,bei(.2),bei(.36),.15,0xc89428); strich(g,bei(.36),bei(.4),.11,FW.METALL);
  schlauch(g,[bei(-.5),[D[0]-.25,.5,D[2]+.35],[D[0]-.5,.08,D[2]+.15],[-1.9,.08,1.3],[-1.55,.08,.5],[-1.5,.4,.14]],.08,0xf2e6c8);
  box(g,.4,.4,.14,FW.ROT,-1.5,.45,.06);
  k.kreis(12.8+D[0],-13.35+D[2],.55); k.kasten(12.1,-11.9,.9,1.4); k.kreis(-.9,12,.55);
  /* Wasser: Tropfen im Bogen und Spritzer an der Klappe */
  const N=56, M=18, wm=basis(0xaee4ff), im=new THREE.InstancedMesh(new THREE.SphereGeometry(1,7,5),wm,N+M), o=new THREE.Object3D(); im.frustumCulled=false; g.add(im);
  const A=bei(.42);
  k.anim.push(t=>{
    for(let i=0;i<N;i++){ const u=(i/N+t*.9)%1, s=Math.sin(i*12.9)*.5;
      o.position.set(A[0]+(Zp[0]-A[0])*u+s*.07*u,A[1]+(Zp[1]-A[1])*u+Math.sin(u*Math.PI)*.95+Math.cos(i*7.3)*.04*u,A[2]+(Zp[2]-A[2])*u); const gr=.055+u*.03; o.scale.set(gr,gr,gr*1.5); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }
    for(let i=0;i<M;i++){ const u=(i/M*3+t*2.2)%1, a=i/M*6.283, w=.12+u*.62;
      o.position.set(Zp[0]+Math.cos(a)*w,Zp[1]+Math.sin(a)*w-u*u*.5,Zp[2]+.05+u*.25); const gr=.06*(1-u)+.008; o.scale.set(gr,gr,gr); o.updateMatrix(); im.setMatrixAt(N+i,o.matrix); }
    im.instanceMatrix.needsUpdate=true; });
}
/* 3 Kriechtunnel */
function tunnel(g,k){
  const L=3.4, R=.9;
  const aussen=rohr(g,R,R,L,0x2f7fe0,0,R+.04,0,24,true); aussen.rotation.z=Math.PI/2;
  const innen=rohr(g,R-.07,R-.07,L-.02,0x17305e,0,R+.04,0,24,true); innen.rotation.z=Math.PI/2;
  for(let i=0;i<6;i++){ const x=-L/2+i*L/5, rand=i===0||i===5; ring(g,R-(rand?.025:0),rand?.11:.065,rand?FW.GELB:0x15488e,x,R+.04,0).rotation.y=Math.PI/2; }
  [-1.1,1.1].forEach(x=>[-1,1].forEach(v=>{ box(g,.4,.3,.34,FW.ROT,x,.15,v*.72); box(g,.46,.08,.4,FW.EISEN,x,.04,v*.72); }));
  box(g,L-.2,.05,.8,0xe8d070,0,.17,0);
  [-1,1].forEach(v=>k.kreis(-11.5+v*.94,-4.6-v*.57,.95));
}
/* 4 Balancierbalken */
function balken(g,k){
  const H=.95;
  box(g,4.2,.2,.36,0xf0c860,0,H,0); box(g,4.22,.05,.38,0x9a7018,0,H-.12,0);
  [-1.5,-.5,.5,1.5].forEach(x=>box(g,.34,.015,.37,FW.ROT,x,H+.107,0));
  [-2.12,2.12].forEach(x=>box(g,.08,.28,.42,FW.ROT,x,H,0));
  [-1.55,1.55].forEach(x=>{ [-1,1].forEach(v=>strich(g,[x,H-.1,v*.1],[x,.1,v*.52],.08,FW.HOLZ2)); box(g,.14,.1,.7,FW.HOLZ2,x,.45,0); box(g,.3,.1,1.3,FW.HOLZ3,x,.07,0); });
  /* blaue Matten darunter */
  [-.72,.72].forEach(x=>{ box(g,1.36,.14,1.15,0x2f68c0,x,.08,0); box(g,1.2,.02,1,0x4a88dc,x,.16,0); });
  const v=taube(g,1.85,H+.1,0,-.5); v.g.scale.setScalar(.85);
  k.anim.push(t=>{ v.kopf.rotation.z=-Math.max(0,Math.sin(t*2))*.6; });
}
/* 5 Kübelspritze: Eimer mit Handpumpe, Schlauch und runder Brause */
function kuebelspritze(g,k){
  rohr(g,.66,.5,.95,FW.ROT,-.15,.5,0,24,true); walze(g,.5,.06,FW.ROT2,-.15,.05,0);
  walze(g,.62,.04,0x7ccaf2,-.15,.82,0);
  ring(g,.66,.05,FW.METALL,-.15,.975,0).rotation.x=Math.PI/2; ring(g,.545,.035,FW.WEISS,-.15,.28,0).rotation.x=Math.PI/2; ring(g,.6,.035,FW.WEISS,-.15,.63,0).rotation.x=Math.PI/2;
  [-1,1].forEach(v=>ball(g,.08,FW.EISEN,-.15+v*.66,.86,0));
  ring(g,.66,.028,FW.METALL2,-.15,.86,0,Math.PI).rotation.x=-1.15;
  /* Pumpe */
  walze(g,.14,.75,FW.METALL,-.15,1.05,0); walze(g,.18,.1,FW.EISEN,-.15,1.44,0);
  const griff=gruppe(g,-.15,1.5,0); griff.userData.lebendig=true;
  walze(griff,.05,.65,FW.METALL2,0,.18,0); walze(griff,.08,.8,FW.EISEN,0,.52,0).rotation.z=Math.PI/2; [-.4,.4].forEach(x=>ball(griff,.11,FW.GELB,x,.52,0));
  verschmelze(griff);
  k.anim.push(t=>{ griff.position.y=1.42+Math.abs(Math.sin(t*2.2))*.2; });
  /* Fußbügel */
  strich(g,[-.72,.7,.1],[-1,.1,.15],.045,FW.EISEN); box(g,.45,.08,.34,FW.EISEN,-1.02,.05,.15);
  /* Schlauch zur Brause, die auf einem Holzklotz liegt */
  schlauch(g,[[-.02,1.2,.05],[.45,1.35,.2],[.85,.9,.35],[.8,.1,.6],[.2,.09,.95],[.55,.09,1.1],[.9,.35,.85]],.075,FW.GUMMI);
  box(g,.42,.3,.4,FW.HOLZ,1.02,.15,.75);
  strich(g,[.88,.36,.86],[1.18,.5,.66],.09,FW.GOLD);
  strich(g,[1.17,.495,.667],[1.27,.545,.6],.2,0xc89428); strich(g,[1.268,.544,.601],[1.29,.555,.587],.17,FW.METALL);
}
/* 6 Übungsplan an der Wand */
function uebungsplan(g){
  const t=bild(512,420,c=>{
    c.fillStyle='#fbf7e6'; c.fillRect(0,0,512,420); c.lineCap='round'; c.lineJoin='round';
    c.fillStyle='#d0261c'; c.fillRect(0,0,512,46);
    for(let r=0;r<4;r++){ const y=64+r*88;
      if(r%2){ c.fillStyle='#eee6cc'; c.fillRect(8,y,496,80); }
      c.strokeStyle='#2a2a32'; c.lineWidth=6; c.strokeRect(30,y+18,44,44);
      if(r<3){ c.strokeStyle='#2a9a3a'; c.lineWidth=12; c.beginPath(); c.moveTo(36,y+38); c.lineTo(50,y+54); c.lineTo(84,y+10); c.stroke(); }
      c.strokeStyle='#2a2a32'; c.lineWidth=7; c.fillStyle='#d0261c';
      if(r===0){ /* Leiter */ c.beginPath(); c.moveTo(120,y+22); c.lineTo(214,y+22); c.moveTo(120,y+58); c.lineTo(214,y+58); for(let i=0;i<5;i++){ c.moveTo(132+i*18,y+22); c.lineTo(132+i*18,y+58); } c.stroke(); }
      else if(r===1){ /* Schlauchrolle */ [30,19,8].forEach(q=>{ c.beginPath(); c.arc(160,y+40,q,0,6.283); c.stroke(); }); c.beginPath(); c.moveTo(160,y+70); c.lineTo(214,y+70); c.stroke(); }
      else if(r===2){ /* Helm */ c.beginPath(); c.arc(166,y+50,34,Math.PI,0); c.closePath(); c.fill(); c.fillRect(120,y+50,92,10); c.fillStyle='#ffd21e'; c.fillRect(161,y+16,10,34); }
      else { /* Wassertropfen */ c.fillStyle='#2f78d8'; c.beginPath(); c.moveTo(165,y+8); c.quadraticCurveTo(205,y+52,186,y+64); c.quadraticCurveTo(165,y+82,144,y+64); c.quadraticCurveTo(125,y+52,165,y+8); c.fill(); }
      /* Balken statt Schrift */
      c.fillStyle='#8a8a94'; c.fillRect(248,y+22,180+(r*37)%70,13); c.fillRect(248,y+48,110+(r*53)%90,13);
    }
  });
  box(g,3.2,2.75,.1,FW.HOLZ2,0,2.05,0);
  FW.tafel(g,t,2.96,2.43,0,2.01,.07);
  [-1.46,1.46].forEach(x=>[.82,3.28].forEach(y=>ball(g,.07,FW.GOLD,x,y,.08,1,1,.6)));
  /* kleines Dach darüber und Ablage mit Stoppuhr */
  const d=box(g,3.6,.12,.7,FW.ROT,0,3.5,.26); d.rotation.x=.25;
  box(g,2.4,.09,.32,FW.HOLZ3,0,.58,.18);
  walze(g,.17,.1,FW.GELB,-1.05,.8,.2).rotation.x=Math.PI/2; walze(g,.12,.12,FW.WEISS,-1.05,.8,.2).rotation.x=Math.PI/2; walze(g,.04,.1,FW.EISEN,-1.05,1,.2); [-1.5,1.5].forEach(x=>box(g,.14,3.45,.14,FW.EISEN,x,1.72,-.04));
  strich(g,[.2,.67,.2],[1,.67,.22],.04,FW.BLAU); ball(g,.05,FW.SCHWARZ,1.02,.67,.22);
}
/* 7 Siegertreppchen mit Pokal */
function treppchen(g,k){
  const sterne=(n,x,y,w)=>{ const t=bild(256,128,c=>{ c.fillStyle='#ffffff'; for(let i=0;i<n;i++) sternMalen(c,128+(i-(n-1)/2)*78,64,38); });
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,w/2),new THREE.MeshLambertMaterial({map:t,transparent:true})); m.position.set(x,y,.67); g.add(m); };
  [[0,1.35,0xe8b020,0xfbd458],[-1.15,.95,0x9aa8b6,0xcdd8e2],[1.15,.65,0xb8703a,0xe09a5c]].forEach(([x,h,c,d],i)=>{
    box(g,1.12,h,1.25,c,x,h/2,0); box(g,1.2,.1,1.33,d,x,h+.03,0); box(g,1.18,.1,1.31,FW.EISEN,x,.05,0);
    sterne([3,2,1][i],x,h*.55,i===0?1.1:1.05); });
  /* Pokal */
  const y=1.43;
  box(g,.5,.14,.5,FW.HOLZ3,0,y+.07,0); walze(g,.2,.08,FW.GOLD,0,y+.18,0); walze(g,.07,.28,FW.GOLD,0,y+.35,0); ball(g,.12,FW.GOLD,0,y+.37,0);
  rohr(g,.38,.14,.5,0xffd840,0,y+.72,0,20,true); walze(g,.15,.05,FW.GOLD,0,y+.49,0); ring(g,.38,.035,0xfff0a0,0,y+.97,0).rotation.x=Math.PI/2;
  [-1,1].forEach(v=>{ const h=ring(g,.17,.04,FW.GOLD,v*.38,y+.74,0,Math.PI*1.25); h.rotation.z=v>0?-1.95:1.19; });
  const funkel=schein(g,'rgba(255,248,190,.9)',.25,y+.95,.3,.6);
  k.anim.push(t=>{ const s=.15+Math.max(0,Math.sin(t*2.5))*.6; funkel.scale.set(s,s,1); });
}
/* 8 Trinkflaschenkiste */
function flaschenkiste(g){
  const K=0x1f58b0, K2=0x3a80dc;
  box(g,2,.16,1.35,K,0,.16,0);
  [-1,1].forEach(v=>[-1,1].forEach(w=>{ box(g,.16,.82,.16,K,v*.94,.49,w*.61); }));
  [-1,1].forEach(w=>{ [.36,.62].forEach(y=>box(g,1.9,.14,.09,K2,0,y,w*.64)); box(g,2.04,.14,.13,K,0,.86,w*.64); [-.34,.34].forEach(x=>box(g,.1,.7,.1,K,x,.5,w*.64)); });
  [-1,1].forEach(v=>{ [.4,.7].forEach(y=>box(g,.09,.18,1.25,K2,v*.97,y,0)); box(g,.13,.14,1.36,K,v*.97,.94,0); box(g,.1,.08,.55,FW.WEISS,v*1.03,.86,0); });
  [-.9,.9].forEach(x=>[-.55,.55].forEach(z=>box(g,.28,.1,.28,FW.EISEN,x,.05,z)));
  const W=[0x7fd8f8,0x9ee0c8,0xf8b860,0x7fd8f8,0xf08aa0];
  for(let i=0;i<4;i++) for(let j=0;j<3;j++){ const x=-.66+i*.44, z=-.38+j*.38, n=(i*2+j)%5, hoch=(i===2&&j===1)?.34:0, c=W[n];
    walze(g,.165,.8,c,x,.66+hoch,z); ball(g,.165,c,x,1.06+hoch,z,1,.7,1); walze(g,.07,.16,c,x,1.2+hoch,z);
    walze(g,.172,.22,FW.WEISS,x,.84+hoch,z); walze(g,.176,.06,FW.BLAU,x,.84+hoch,z);
    walze(g,.1,.12,[FW.BLAU,FW.ROT,FW.GRUEN][(i+j)%3],x,1.33+hoch,z); box(g,.03,.5,.02,0xe8fcff,x-.08,.52+hoch,z+.15); }
  leicht(g);
}
/* 9 Übungspuppe aus Stoff, sitzt fröhlich auf einer Trage */
function puppe(g){
  const STOFF=0xe8c48c, ANZ=0xf2701c, HOSE=0x3a70b8, NAHT=0xfff4d8, H=.7;
  /* Trage */
  [-.62,.62].forEach(z=>{ walze(g,.07,3.5,FW.METALL,0,H,z).rotation.z=Math.PI/2; [-1.83,1.83].forEach(x=>walze(g,.095,.3,FW.SCHWARZ,x,H,z).rotation.z=Math.PI/2);
    [-1.15,1.15].forEach(x=>{ walze(g,.065,.62,FW.METALL2,x,H-.33,z); walze(g,.14,.12,FW.GUMMI,x,.14,z).rotation.x=Math.PI/2; }); });
  [-1.15,1.15].forEach(x=>box(g,.1,.1,1.24,FW.METALL2,x,.4,0));
  box(g,2.9,.12,1.16,0x2f9a54,0,H+.02,0); box(g,2.9,.04,.08,FW.WEISS,0,H+.09,.5); box(g,2.9,.04,.08,FW.WEISS,0,H+.09,-.5);
  const lehne=box(g,1.05,.12,1.1,0x2f9a54,-1.28,H+.45,0); lehne.rotation.z=-.85;
  /* Körper */
  const y=H+.1;
  strich(g,[-.55,y+.22,0],[-.98,y+.9,0],.3,ANZ); ball(g,.31,ANZ,-.55,y+.22,0); ball(g,.31,ANZ,-.98,y+.9,0);
  ball(g,.3,HOSE,-.45,y+.2,0,1.1,.85,1.1);
  [-1,1].forEach(v=>{ strich(g,[-.4,y+.18,v*.2],[.42,y+.36,v*.25],.17,HOSE); ball(g,.18,HOSE,.42,y+.36,v*.25); strich(g,[.42,y+.36,v*.25],[1.2,y+.16,v*.27],.15,HOSE);
    ring(g,.17,.025,NAHT,.42,y+.36,v*.25).rotation.y=Math.PI/2; ball(g,.2,STOFF,1.33,y+.22,v*.27,.85,1.15,.95); ring(g,.15,.03,FW.BLAU,1.2,y+.16,v*.27).rotation.y=Math.PI/2;
    strich(g,[-.92,y+.82,v*.3],[-.55,y+.5,v*.48],.11,ANZ); ball(g,.12,ANZ,-.55,y+.5,v*.48); strich(g,[-.55,y+.5,v*.48],[-.1,y+.34,v*.44],.1,ANZ); ball(g,.13,STOFF,0,y+.31,v*.43,1.2,.8,1);
    ring(g,.11,.022,NAHT,-.55,y+.5,v*.48).rotation.y=1.2; });
  /* aufgenähte Flicken und Nähte auf der Brust, Blick nach vorn */
  const flicken=(x,yy,z,c)=>{ box(g,.24,.24,.03,c,x,yy,z).rotation.z=.55; [[-.13,0],[.13,0],[0,-.13],[0,.13]].forEach(([a,b])=>ball(g,.022,NAHT,x+a*.85-b*.52,yy+a*.52+b*.85,z+.025)); };
  flicken(-.78,y+.52,.3,FW.GELB); flicken(.78,y+.3,.42,0xe85a8a);
  for(let i=0;i<7;i++){ const u=i/6; const s=box(g,.09,.03,.02,NAHT,-.5-u*.44+.18,y+.3+u*.68+.12,.2); s.rotation.z=.55; }
  /* Kopf aus Stoff mit Knopfaugen und aufgenähtem Lächeln */
  const kopf=gruppe(g,-1.1,y+1.4,.05); kopf.rotation.y=-.1;
  ball(kopf,.4,STOFF,0,0,0,1,1.02,.95); walze(kopf,.13,.2,STOFF,0,-.4,0);
  ring(kopf,.15,.04,FW.BLAU,0,-.37,0).rotation.x=Math.PI/2;
  [-.15,.15].forEach(v=>{ ball(kopf,.07,FW.SCHWARZ,v,.06,.365,1,1.1,.5); ball(kopf,.022,FW.WEISS,v+.022,.09,.405); });
  ball(kopf,.06,0xe0907a,0,-.05,.38,1,.8,.7);
  { const mund=ring(kopf,.14,.022,0x9a2a20,0,-.12,.365,Math.PI); mund.rotation.z=Math.PI; }
  [-.12,-.04,.05,.13].forEach((a,i)=>strich(kopf,[a,.37,.02],[a*1.5,.55+(i%2)*.05,.04],.028,0x8a5a30));
  [-.38,.38].forEach(v=>ball(kopf,.1,STOFF,v,0,0,.6,1,.8));
  leicht(g);
}
/* 10 Gestell mit Steckleitern */
function leitergestell(g){
  const A=0xdce4ea;
  [-1.35,1.35].forEach(x=>{ box(g,.2,2.75,.2,FW.ROT,x,1.37,-.3); box(g,.34,.14,1.2,FW.ROT2,x,.07,0); strich(g,[x,.75,-.3],[x,.1,.45],.055,FW.ROT2);
    [.4,1.25,2.1].forEach(y=>{ box(g,.14,.12,.72,FW.EISEN,x,y,.02); box(g,.14,.2,.08,FW.EISEN,x,y+.12,.36); }); });
  box(g,2.9,.16,.16,FW.ROT,0,2.76,-.3);
  /* drei Leiterteile übereinander, jedes mit Holmen, Sprossen und Steckhülsen */
  [.74,1.59,2.44].forEach((y,i)=>{ const x=(i-1)*.12, z=.18-i*.03;
    [-.27,.27].forEach(v=>{ box(g,3.9,.11,.13,A,x,y+v,z); [-1,1].forEach(s=>{ box(g,.3,.13,.15,FW.ROT,x+s*1.82,y+v,z); box(g,.08,.15,.17,FW.EISEN,x+s*1.62,y+v,z); }); });
    for(let j=0;j<10;j++) walze(g,.045,.5,FW.METALL,x-1.53+j*.34,y,z);
    box(g,.14,.62,.04,i===1?FW.GELB:FW.BLAU,x+.34,y,z+.09); });
}

const gegenstaende=[
  { x:-8.4, z:-13.35, wand:'hinten', steh:[-8.4,-11.3], kasten:[3.2,1.4], treffer:[3.7,4.4,.9], baue:zeitanzeige },
  { x:12.8, z:-13.35, wand:'hinten', steh:[13.8,-10.7], kasten:[3.4,.7], treffer:[3.7,3.8,1], baue:spritzwand },
  { x:-11.5, z:-4.6, dreh:.55, steh:[-10.2,-2.2], r:.95, treffer:[3.7,2,2], baue:tunnel },
  { x:-7.6, z:4.4, steh:[-7.4,6.4], kasten:[4.4,1.4], treffer:[4.4,1.6,1.3], baue:balken },
  { x:7.4, z:-3.4, steh:[6.8,-1.3], r:1.05, treffer:[2.6,2.3,2], baue:kuebelspritze },
  { x:-14.2, z:-13.35, wand:'hinten', steh:[-14.2,-11.3], kasten:[3.5,.9], treffer:[3.5,3.9,.9], baue:uebungsplan },
  { x:11.2, z:3.8, steh:[10.6,5.9], kasten:[3.6,1.45], treffer:[3.5,2.5,1.4], baue:treppchen },
  { x:4.2, z:6.2, dreh:-.15, steh:[4,8.1], kasten:[2.3,1.7], treffer:[2.2,1.8,1.5], baue:flaschenkiste },
  { x:-3.8, z:-5.6, dreh:.12, steh:[-3.6,-3.5], kasten:[3.8,1.7], treffer:[3.8,2.7,1.5], baue:puppe },
  { x:13, z:-3.8, dreh:-.15, steh:[12.6,-1.7], kasten:[4.1,1.7], treffer:[4.2,2.9,1.2], baue:leitergestell }
];
const verstecke=[[-11.5,-10.4],[-6,-9],[-15.2,-8.6],[-7,-2],[-1,-2.8],[2.4,-9.6],[9.4,-8.4],[15.4,-6.4],[10,-1],[15.4,1.4],[14.2,10.8],[7.8,11.6],[1,12],[-3.2,7.6],[-11.8,10.8],[-11,1.4],[-4,1],[5,1.2],[8,7.6],[-12.2,-7.6]];

function baue(k){
  grund(k);
  const W=mauern(k);
  const tuer=hoftor(k);
  schlauchturm(k);
  umgebung(k,W);
  mannschaft(k);
  ausstattung(k,W);
  return { tuer, start:[1.4,1.8] };
}
return { titel:'Der Übungshof', himmel:HIMMEL, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 4: Die Leitstelle. Abgedunkelter Raum, blau-grün leuchtende Bildschirme, blinkende Lämpchen, Stehpulte, Rechnerschränke,
   zwei Einsatzkräfte mit Kopfhörern. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: Schiebetür mit Ampellicht in der Rückwand rechts (x = 11); dahinter führt eine Treppe zum Dach ins Abendlicht. */
RAEUME3D.feuerwache[3] = (function(){
const { ROT, ROT2, WEISS, CREME, GELB, ORANGE, SCHWARZ, GUMMI, METALL, METALL2, EISEN, GOLD, HOLZ, HOLZ2, STREIF } = FW;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=11;                       /* Mitte der Schiebetür */
const NACHT=0x1a2640, PULT=0x33486e, PULT2=0x223050, HELL=0xd4dce6, HOLZHELL=0xdcae6c;

const hell=m=>{ m.castShadow=false; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze/Ring nach vorn bzw. flach legen */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };    /* Walze entlang x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

/* Leuchtfarben (je Aufbau neu) und blinkende Lämpchen in sechs Takten */
let LICHT={}, LED=[];
const L=c=>LICHT[c]||(LICHT[c]=basis(c));
const LEDFARBEN=[[0x50ff8a,0x14502c],[0x48d8ff,0x12485c],[0xff5a50,0x501814],[0xffd240,0x54440e],[0x50ff8a,0x14502c],[0x48d8ff,0x12485c]];

/* ---------- Bilder ---------- */
/* leuchtende Bildfläche, Blick nach +z */
function schirm(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),basis(0xffffff,{map:tex})); m.position.set(x,y,z); par.add(m); return m; }
/* Inhalte der Bildschirme: art 0 Straßenkarte, 1 Linienkurven, 2 Balkenliste, 3 Radar, 4 Wetter, 5 Fahrzeugübersicht */
function schirmBild(art){
  return bild(384,256,(g)=>{ g.fillStyle=['#06303c','#052418','#0a1c3c','#03281e','#0c2a4c','#08203a'][art]; g.fillRect(0,0,384,256);
    g.strokeStyle='rgba(110,220,230,.18)'; g.lineWidth=2; for(let x=0;x<384;x+=32){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,256); g.stroke(); } for(let y=0;y<256;y+=32){ g.beginPath(); g.moveTo(0,y); g.lineTo(384,y); g.stroke(); }
    if(art===0){ g.strokeStyle='#58e8e0'; g.lineWidth=9; [[0,70,384,92],[0,190,384,160],[90,0,120,256],[270,0,240,256],[0,0,384,256]].forEach(l=>{ g.beginPath(); g.moveTo(l[0],l[1]); g.lineTo(l[2],l[3]); g.stroke(); });
      [['#ff5048',150,98],['#ffd240',262,176],['#60ff80',60,160]].forEach(([f,x,y])=>{ g.fillStyle=f; g.beginPath(); g.arc(x,y,14,0,7); g.fill(); }); }
    if(art===1){ ['#60ff90','#48d8ff','#ffd240'].forEach((f,n)=>{ g.strokeStyle=f; g.lineWidth=6; g.beginPath(); for(let x=0;x<=384;x+=16){ const y=60+n*68+Math.sin(x*.05+n*2)*18+(x%64===32?-26:0); if(x) g.lineTo(x,y); else g.moveTo(x,y); } g.stroke(); }); }
    if(art===2){ for(let i=0;i<6;i++){ const y=18+i*39; g.fillStyle=['#60ff90','#ffd240','#ff5a50'][i%3]; g.beginPath(); g.arc(30,y+13,12,0,7); g.fill(); g.fillStyle='#7ab8ff'; g.fillRect(58,y+6,120+(i*67)%170,14); } }
    if(art===3){ g.strokeStyle='#40e890'; g.lineWidth=4; [34,68,104].forEach(r=>{ g.beginPath(); g.arc(192,128,r,0,7); g.stroke(); }); g.beginPath(); g.moveTo(70,128); g.lineTo(314,128); g.moveTo(192,10); g.lineTo(192,246); g.stroke(); }
    if(art===4){ g.fillStyle='#ffd240'; g.beginPath(); g.arc(130,96,44,0,7); g.fill(); g.fillStyle='#e8f4ff'; [[170,140,36],[215,120,46],[262,142,34]].forEach(c=>{ g.beginPath(); g.arc(c[0],c[1],c[2],0,7); g.fill(); }); g.fillRect(170,140,94,36);
      g.strokeStyle='#60c8ff'; g.lineWidth=6; for(let i=0;i<5;i++){ g.beginPath(); g.moveTo(180+i*22,190); g.lineTo(170+i*22,224); g.stroke(); } }
    if(art===5){ for(let r=0;r<3;r++) for(let s=0;s<2;s++){ const x=28+s*184, y=22+r*76; g.fillStyle='#e03028'; g.fillRect(x,y+10,78,32); g.fillRect(x+78,y+18,30,24); g.fillStyle='#a8e0ff'; g.fillRect(x+84,y+22,18,10);
        g.fillStyle='#d8e0e8'; [x+18,x+88].forEach(a=>{ g.beginPath(); g.arc(a,y+44,10,0,7); g.fill(); }); g.fillStyle=(r+s)%3?'#60ff90':'#ffd240'; g.beginPath(); g.arc(x+132,y+26,12,0,7); g.fill(); } } });
}
/* großer Stadtplan auf Papier */
function planBild(){
  return bild(768,448,(g)=>{ g.fillStyle='#f4efd8'; g.fillRect(0,0,768,448);
    g.fillStyle='#a8d488'; [[560,40,150,110],[60,290,130,110],[330,300,90,80]].forEach(r=>g.fillRect(r[0],r[1],r[2],r[3]));
    g.fillStyle='#5a9a48'; for(let i=0;i<40;i++){ g.beginPath(); g.arc(i%2?575+zufall()*120:75+zufall()*100,i%2?55+zufall()*80:305+zufall()*80,8,0,7); g.fill(); }
    for(let i=0;i<70;i++){ const x=24+zufall()*690, y=24+zufall()*380; g.fillStyle=['#e0a078','#d8b890','#c8a8c0','#e8c060'][i%4]; g.fillRect(x,y,22+zufall()*26,18+zufall()*20); }
    g.strokeStyle='#4aa0e0'; g.lineWidth=30; g.lineCap='round'; g.beginPath(); g.moveTo(0,372); g.bezierCurveTo(210,300,330,470,520,360); g.bezierCurveTo(620,300,680,330,768,282); g.stroke();
    const weg=(l,f,w)=>{ g.strokeStyle=f; g.lineWidth=w; g.beginPath(); g.moveTo(l[0],l[1]); g.lineTo(l[2],l[3]); g.stroke(); };
    const strassen=[[0,170,768,150],[0,262,768,250],[190,0,170,448],[480,0,505,448],[0,60,360,70],[300,0,640,448]];
    strassen.forEach(l=>weg(l,'#8a8478',20)); strassen.forEach(l=>weg(l,'#ffffff',13)); weg([0,170,768,150],'#ffd240',9);
    /* Feuerwache: rotes Haus */
    g.fillStyle='#d82820'; g.fillRect(228,184,72,48); g.beginPath(); g.moveTo(220,188); g.lineTo(264,156); g.lineTo(308,188); g.fill(); g.fillStyle='#ffffff'; g.fillRect(240,202,20,30); g.fillRect(268,202,20,30);
    g.strokeStyle='#4a3a20'; g.lineWidth=12; g.strokeRect(6,6,756,436); });
}
/* Tafel mit der Zahl 112 und einem Telefonhörer */
function notrufBild(){
  return bild(448,416,(g)=>{ g.fillStyle='#d8241c'; g.fillRect(0,0,448,416); g.strokeStyle='#ffffff'; g.lineWidth=14; g.strokeRect(18,18,412,380);
    g.fillStyle='#ffffff'; g.font='900 210px Andika, Arial, sans-serif'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('112',224,160);
    g.strokeStyle='#ffffff'; g.lineCap='round'; g.lineWidth=36; g.beginPath(); g.moveTo(148,318); g.quadraticCurveTo(224,268,300,318); g.stroke(); g.lineWidth=60; [[140,330],[308,330]].forEach(p=>{ g.beginPath(); g.moveTo(p[0],p[1]); g.lineTo(p[0],p[1]+22); g.stroke(); }); });
}
/* beleuchtete Fläche des Lagetischs: Gelände von oben */
function lageBild(){
  return bild(512,320,(g)=>{ g.fillStyle='#bfeee4'; g.fillRect(0,0,512,320);
    g.fillStyle='#86d084'; [[90,80,80,55],[410,230,90,60],[420,60,55,40]].forEach(e=>{ g.beginPath(); g.ellipse(e[0],e[1],e[2],e[3],0,0,7); g.fill(); });
    g.strokeStyle='#38a0e8'; g.lineWidth=22; g.beginPath(); g.moveTo(0,260); g.bezierCurveTo(150,170,240,300,330,180); g.bezierCurveTo(390,100,450,140,512,100); g.stroke();
    g.strokeStyle='#ffffff'; g.lineWidth=14; [[0,140,512,130],[180,0,160,320],[350,0,375,320]].forEach(l=>{ g.beginPath(); g.moveTo(l[0],l[1]); g.lineTo(l[2],l[3]); g.stroke(); });
    for(let i=0;i<26;i++){ g.fillStyle=i%2?'#e8a070':'#b8a8d8'; g.fillRect(20+zufall()*460,16+zufall()*270,18+zufall()*16,14+zufall()*14); }
    g.strokeStyle='#e03028'; g.lineWidth=7; g.setLineDash([16,12]); g.beginPath(); g.moveTo(60,138); g.lineTo(366,133); g.lineTo(372,230); g.stroke(); g.setLineDash([]); g.beginPath(); g.arc(373,238,30,0,7); g.stroke(); });
}
/* bedrucktes Blatt aus dem Drucker */
function blattBild(){
  return bild(192,256,(g)=>{ g.fillStyle='#ffffff'; g.fillRect(0,0,192,256); g.fillStyle='#d8302a'; g.fillRect(18,18,156,26); g.fillStyle='#4a5a78'; for(let i=0;i<5;i++) g.fillRect(18,62+i*20,100+(i*43)%56,8);
    g.fillStyle='#9ad898'; g.fillRect(18,166,156,72); g.strokeStyle='#4a90d8'; g.lineWidth=8; g.beginPath(); g.moveTo(18,220); g.lineTo(80,180); g.lineTo(174,208); g.stroke(); });
}
/* Abendhimmel über der Stadt hinter der Tür */
function abendBild(){
  return bild(256,448,(g)=>{ const v=g.createLinearGradient(0,0,0,330); v.addColorStop(0,'#3a3c8c'); v.addColorStop(.55,'#e8785c'); v.addColorStop(1,'#ffd884'); g.fillStyle=v; g.fillRect(0,0,256,448);
    const l=g.createRadialGradient(150,240,6,150,240,110); l.addColorStop(0,'rgba(255,250,210,1)'); l.addColorStop(1,'rgba(255,190,100,0)'); g.fillStyle=l; g.fillRect(0,100,256,300);
    g.fillStyle='#fff2b0'; g.beginPath(); g.arc(150,240,30,0,7); g.fill(); g.fillStyle='#ffffff'; for(let i=0;i<14;i++) g.fillRect(zufall()*250,zufall()*110,3,3);
    for(let i=0;i<8;i++){ const x=i*33-4, y=270+(i*47)%52; g.fillStyle='#4a3868'; g.fillRect(x,y,30,448-y); g.fillStyle='#ffe08a'; for(let r=0;r<3;r++) for(let s=0;s<2;s++) g.fillRect(x+6+s*12,y+10+r*18,6,8); } });
}

/* ---------- Ausgang: Schiebetür mit Ampel ---------- */
function baueTuer(k,sc,hinten){
  /* Treppenhaus hinter der Öffnung: Podest, Treppe nach oben, Abendhimmel */
  const himmel=new THREE.Mesh(new THREE.PlaneGeometry(3.7,6.2),basis(0xffffff,{map:abendBild()})); himmel.position.set(AX,3.1,-19.0); hinten.add(himmel);
  const th=gruppe(hinten,AX,0,0);
  [-1,1].forEach(s=>{ box(th,.24,4.4,5.1,0x8a6a58,s*1.88,2.2,-16.55); strich(th,[s*1.68,1.05,-14.2],[s*1.68,1.05,-15.8],.06,METALL); strich(th,[s*1.68,1.05,-15.8],[s*1.68,2.75,-18.5],.06,METALL);
    [[-14.3,0],[-15.8,0],[-17.15,.85],[-18.45,1.7]].forEach(([z,y])=>strich(th,[s*1.68,y,z],[s*1.68,y+1.05,z],.045,METALL2)); });
  box(th,3.5,.05,2.35,0xa89c90,0,-.005,-14.8);
  for(let i=0;i<8;i++){ const h=(i+1)*.22, z=-16.0-i*.36; box(th,3.5,h,.36,i%2?0xbcae9e:0xa89a8c,0,h/2,z); box(th,3.5,.06,.09,GELB,0,h+.01,z+.16); }
  verschmelze(th); ohneSchatten(th);
  /* Türrahmen */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.3,4.0,.3,METALL,s*1.75,2.0,.12); for(let i=0;i<5;i++) box(r,.31,.2,.02,i%2?SCHWARZ:GELB,s*1.75,.12+i*.2,.28); });
  box(r,3.8,.34,.34,METALL,0,3.77,.12); box(r,3.2,.05,.5,METALL2,0,.025,.05);
  /* Lichtleiste über der Tür */
  const leisteM=basis(0xff3028); box(r,2.9,.16,.1,leisteM,0,3.78,.32);
  /* Ampel links neben der Tür: oben Rot, unten Grün */
  box(r,.72,1.6,.24,SCHWARZ,-2.38,2.55,.14); box(r,.82,.1,.34,METALL,-2.38,3.4,.18);
  const rotM=basis(0xff2a20), gruenM=basis(0x12381c);
  flach(walze(r,.27,.1,rotM,-2.38,2.92,.28)); flach(walze(r,.27,.1,gruenM,-2.38,2.18,.28));
  [2.92,2.18].forEach(y=>{ ring(r,.29,.04,METALL2,-2.38,y,.33); box(r,.62,.07,.22,SCHWARZ,-2.38,y+.31,.34); });
  verschmelze(r);
  const rotS=schein(hinten,'rgba(255,50,30,.75)',AX-2.38,2.92,HINTEN+.6,1.7), gruenS=schein(hinten,'rgba(60,255,110,.75)',AX-2.38,2.18,HINTEN+.6,1.9); gruenS.visible=false;
  /* zwei Schiebeflügel; offen verschwinden sie in der Wand */
  const fluegel=[-1,1].map(s=>{ const f=gruppe(hinten,AX+s*.8,0,HINTEN-.14); f.userData.lebendig=true;
    box(f,1.6,3.6,.12,0x7e90ac,0,1.8,0); box(f,1.1,1.15,.03,0x9fd4f0,0,2.72,.07); strich(f,[-.4,2.5,.095],[.05,3.12,.095],.025,WEISS);
    box(f,1.3,.8,.03,0x6a7c98,0,.75,.07); box(f,1.6,.14,.04,GELB,0,1.35,.075); box(f,.07,3.6,.04,EISEN,-s*.76,1.8,.07); box(f,.1,.55,.07,METALL,-s*.56,1.75,.1);
    verschmelze(f); return f; });
  const schloss=FW.zahlenschloss(hinten,AX,1.85,HINTEN); schloss.scale.setScalar(1.35); schloss.userData.lebendig=true;
  const licht=new THREE.PointLight(0xffb468,.35,10,1.5); licht.position.set(AX,3.0,HINTEN-2.0); sc.add(licht);
  k.kasten(AX,-13.15,3.5,.8); /* geschlossene Tür: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Tür mit Signallicht', einfach:'Tür mit Licht', steh:[AX,-11.15], durch:[AX,-15.3],
    treffer:{x:AX-.3,y:2.1,z:-12.95,b:4.4,h:4.2,t:.9}, schildOben:[AX,4.75,-12.4], glanz:[AX,1.9,-12.8],
    bewege:(auf)=>{ const offen=auf>.02, a=Math.max(0,Math.min(1,(auf-.18)/.75)), w=a*a*(3-2*a);
      rotM.color.setHex(offen?0x441210:0xff2a20); gruenM.color.setHex(offen?0x38ff70:0x12381c); leisteM.color.setHex(offen?0x38ff70:0xff3028);
      rotS.visible=!offen; gruenS.visible=offen; schloss.visible=auf<.18;
      fluegel[0].position.x=AX-.8-1.62*w; fluegel[1].position.x=AX+.8+1.62*w; licht.intensity=.35+.9*auf; } });
}

/* ---------- Deko ---------- */
/* Rechnerschrank mit vielen blinkenden Lämpchen */
function rechner(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,1.5,3.5,1.05,0x28303e,0,1.75,0); box(g,1.6,.14,1.15,METALL2,0,3.54,0); box(g,1.34,3.2,.04,0x121822,0,1.76,.54);
  for(let r=0;r<8;r++){ const y=.38+r*.39; box(g,1.24,.3,.05,0x3c4658,0,y,.56); for(let i=0;i<4;i++) box(g,.09,.07,.03,LED[(r*3+i*5+Math.floor(x+20))%6],-.45+i*.2,y+.03,.6); box(g,.26,.05,.03,METALL,.4,y-.05,.6); }
  [-.68,.68].forEach(a=>box(g,.07,3.3,.07,METALL,a,1.76,.57));
}
/* Stehpult mit zwei oder drei Bildschirmen (kein Telefon, kein Stuhl). Blick nach +z */
function stehpult(par,x,z,dreh,arten){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  const n=arten.length, br=n*1.35+.2;
  [-br/2+.25,br/2-.25].forEach(a=>{ box(g,.22,1.35,.5,METALL2,a,.68,-.15); box(g,.32,.12,1.1,EISEN,a,.06,0); });
  box(g,br,.14,1.2,PULT,0,1.42,0); box(g,br,.05,.08,L(0x38d8e8),0,1.4,.62); box(g,br-.5,.6,.1,PULT2,0,.85,-.4);
  arten.forEach((art,i)=>{ const a=(i-(n-1)/2)*1.35; strich(g,[a,1.45,-.35],[a,1.78,-.38],.05,EISEN); box(g,1.22,.84,.08,EISEN,a,2.15,-.4); schirm(g,schirmBild(art),1.1,.72,a,2.15,-.35);
    box(g,.8,.05,.3,0x161c28,a,1.52,.2); for(let j=0;j<6;j++) box(g,.09,.02,.2,0x8c9ab0,a-.3+j*.12,1.555,.2); ball(g,.08,0x161c28,a+.52,1.53,.24,1,.6,1.3); });
  /* Kopfhörer am Rand und Becher */
  ring(g,.2,.04,EISEN,br/2-.22,1.62,.3,Math.PI); [-1,1].forEach(v=>ball(g,.1,0x38c8a0,br/2-.22+v*.2,1.58,.3,.7,1,1));
  walze(g,.12,.26,ORANGE,-br/2+.2,1.62,.34); ring(g,.07,.022,ORANGE,-br/2+.07,1.63,.34);
}
/* Zimmerpflanze mit großen Blättern */
function pflanze(par,x,z,h){
  const g=gruppe(par,x,0,z);
  rohr(g,.48,.36,.75,0xd8dce4,0,.38,0,14); flach(ring(g,.48,.05,METALL,0,.75,0)); walze(g,.43,.05,0x4a2c14,0,.73,0);
  for(let i=0;i<11;i++){ const w=i*2.4, u=i/11, aus=.62-u*.4, y=1.0+u*1.2*h;
    strich(g,[0,.7,0],[Math.cos(w)*aus,y,Math.sin(w)*aus],.025,0x357a34);
    const blatt=ball(g,.28,[0x3f9a44,0x5cb852,0x2f7a3c][i%3],Math.cos(w)*aus,y+.06,Math.sin(w)*aus,1.35,.28,.75); blatt.rotation.y=-w; blatt.rotation.z=.35; }
}
/* niedriger Schrank mit Schiebetüren, oben darauf Helm, Pokal oder Thermoskannen */
function lowboard(par,x,z,br,deko){
  const g=gruppe(par,x,0,z);
  box(g,br,1.0,.95,PULT2,0,.55,0); box(g,br+.1,.1,1.05,HELL,0,1.1,0); box(g,br-.15,.1,.85,EISEN,0,.05,0);
  const n=Math.round(br/1.2); for(let i=0;i<n;i++){ const a=-br/2+(i+.5)*br/n; box(g,br/n-.14,.76,.04,i%2?0x2f7a8a:PULT,a,.57,-.49); box(g,.28,.06,.05,METALL,a,.78,-.52); box(g,br/n-.14,.76,.04,i%2?0x2f7a8a:PULT,a,.57,.49); }
  if(deko===0) FW.helm(g,-br*.25,1.17,0,ROT,1.1,.4);
  if(deko===1){ walze(g,.24,.1,HOLZ2,br*.2,1.2,0); strich(g,[br*.2,1.2,0],[br*.2,1.55,0],.05,GOLD); rohr(g,.26,.1,.4,GOLD,br*.2,1.75,0); [-1,1].forEach(v=>ring(g,.12,.03,GOLD,br*.2+v*.28,1.78,0)); }
  if(deko!==1) [[-.02,ORANGE],[.42,0x38a878]].forEach(([a,f])=>{ walze(g,.16,.5,f,br*.2+a,1.4,0); walze(g,.1,.1,EISEN,br*.2+a,1.7,0); ring(g,.1,.025,EISEN,br*.2+a+.18,1.45,0); });
}
/* Wanduhr mit laufendem Zeiger */
function uhr(k,par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  flach(walze(g,.72,.1,METALL,0,0,.06)); flach(walze(g,.62,.04,L(0xeaf6ff),0,0,.12));
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; box(g,.05,i%3?.08:.14,.02,SCHWARZ,Math.sin(a)*.5,Math.cos(a)*.5,.15).rotation.z=-a; }
  const zeiger=(l,d,f,zz)=>{ const q=gruppe(g,0,0,zz); q.userData.lebendig=true; box(q,d,l,.02,f,0,l/2-.06,0); return q; };
  const s=zeiger(.34,.09,SCHWARZ,.16), m=zeiger(.5,.06,SCHWARZ,.18), sek=zeiger(.55,.025,ROT,.2); s.rotation.z=-2.2; ball(g,.06,ROT,0,0,.21);
  k.anim.push(t=>{ sek.rotation.z=-Math.floor(t)*Math.PI/30; m.rotation.z=1.1-t*.01; });
}
/* weiche Schallschutz-Platten an der Wand */
function platten(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  const F=[0x2f8c8a,0x3a62a0,0x48b09a,0x2a4a7c];
  for(let r=0;r<2;r++) for(let s=0;s<4;s++) box(g,.74,.74,.1+((r+s)%3)*.05,F[(r*2+s)%4],(s-1.5)*.82,(r-.5)*.82,.08);
}
/* Wandbrett mit Einsatzhelmen */
function helmbrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,3.1,.12,.7,HELL,0,0,.36); [-1.2,1.2].forEach(a=>strich(g,[a,-.55,.06],[a,-.05,.55],.05,METALL));
  [[-1.0,ROT],[0,GELB],[1.0,WEISS]].forEach(([a,f])=>FW.helm(g,a,.08,.38,f,1.05,0));
}
/* Einsatzkraft in der Leitstelle: Mensch ohne Helm mit Sprechgarnitur */
function disponent(k,x,z,dreh,haut,phase){
  const m=FW.mensch(k,k.scene,x,z,dreh,{ haut, helm:false, anzug:0x2c4c88, phase, winkt:false });
  const h=gruppe(m.kopf,0,0,0); ring(h,.31,.035,0x14181e,0,.04,0,Math.PI); [-1,1].forEach(v=>ball(h,.11,0x38d8a8,v*.3,0,0,.6,1,1));
  strich(h,[.3,-.02,.02],[.22,-.17,.26],.018,0x14181e); ball(h,.045,0x14181e,.2,-.18,.28);
  verschmelze(h);
  m.armL.rotation.x=-1.0; m.armR.rotation.x=-1.0;
  k.anim.push(t=>{ m.armL.rotation.x=-1.0+Math.sin(t*7+phase)*.09; m.armR.rotation.x=-1.0+Math.sin(t*8.3+phase+2)*.09; });
  k.kreis(x,z,.45);
}

/* ---------- Raum ---------- */
function baue(k){
  const sc=k.scene;
  LICHT={}; LED=LEDFARBEN.map(f=>basis(f[0]));
  const h=FW.huelle(k,{ B,T,H, himmelLicht:0xd4e6ff, grund:0x4c5a78, staerke:.8, sonne:0xd8e8ff, sonneStaerke:.36,
    wandBild:FW.putzBild('#4a6488'), bodenBild:FW.fliesenBild('#6a7c92','#607288','#39465a'), leiste:METALL2, sockelFarbe:PULT2, dunkel:0x121a2c, oeffnung:{x:AX,b:3.2,h:3.6} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueTuer(k,sc,hinten);

  /* blinkende Lämpchen und Lauflicht */
  k.anim.push(t=>LED.forEach((m,i)=>m.color.setHex(LEDFARBEN[i][Math.sin(t*(2.1+i*.77)+i*1.9)>-.25?0:1])));

  /* ---------- Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  box(dh,26.4,.09,.08,L(0x38d8e8),-4.8,5.55,HINTEN+.06); box(dh,3.8,.09,.08,L(0x38d8e8),16.1,5.55,HINTEN+.06);
  uhr(k,dh,-6.3,3.9,HINTEN,0);
  [4.3,-5.0,-13.4].forEach((x,j)=>{ box(dh,.16,2.9,.08,EISEN,x,2.95,HINTEN+.05); for(let i=0;i<7;i++) box(dh,.09,.18,.05,LED[(i+j*2)%6],x,1.8+i*.38,HINTEN+.1); });
  platten(dh,15.9,4.4,HINTEN,0);
  /* Kabelkanal unter den Bildschirmen */
  box(dh,8.6,.18,.22,METALL2,-.5,.75,HINTEN+.12); [-3.6,-.5,2.6].forEach(x=>strich(dh,[x,.75,HINTEN+.14],[x,1.2,HINTEN+.1],.05,EISEN));
  /* ---------- links ---------- */
  const dl=gruppe(links,0,0,0), LX=-B/2, LD=Math.PI/2;
  box(dl,.08,.09,T,L(0x38d8e8),LX+.06,5.55,0);
  platten(dl,LX,3.9,-1.2,LD); helmbrett(dl,LX,3.4,-6.2,LD); uhr(k,dl,LX,3.9,4.0,LD); platten(dl,LX,3.9,8.2,LD);
  /* ---------- rechts ---------- */
  const dr=gruppe(rechts,0,0,0), RX=B/2, RD=-Math.PI/2;
  box(dr,.08,.09,T,L(0x38d8e8),RX-.06,5.55,0);
  platten(dr,RX,3.9,-9.6,RD); helmbrett(dr,RX,3.6,-5.0,RD); platten(dr,RX,3.9,7.6,RD); uhr(k,dr,RX,3.9,2.8,RD);
  [dh,dl,dr].forEach(g=>{ verschmelze(g); ohneSchatten(g); });

  /* ---------- Möbel am Boden ---------- */
  const v=gruppe(sc,0,0,0);
  /* hinten: Rechnerschränke in den Ecken und Pflanzen */
  [-16.95,-15.35].forEach(x=>rechner(v,x,-12.8,0)); k.kasten(-16.15,-12.8,3.2,1.2);
  [15.35,16.95].forEach(x=>rechner(v,x,-12.8,0)); k.kasten(16.15,-12.8,3.2,1.2);
  pflanze(v,-6.4,-12.7,.9); k.kreis(-6.4,-12.7,.55);
  /* links: Stehpulte an der Wand */
  stehpult(v,-17.1,-1.3,Math.PI/2,[1,0,2]); k.kasten(-17.05,-1.3,1.4,4.35);
  stehpult(v,-17.1,7.4,Math.PI/2,[4,5]); k.kasten(-17.05,7.4,1.4,3.0);
  rechner(v,-17.35,-9.0,Math.PI/2); k.kasten(-17.35,-9.0,1.2,1.65);
  pflanze(v,-16.9,3.3,1.1); k.kreis(-16.9,3.3,.65);
  pflanze(v,-16.8,11.6,1.2); k.kreis(-16.8,11.6,.65);
  /* rechts */
  stehpult(v,17.1,7.4,-Math.PI/2,[5,1,3]); k.kasten(17.05,7.4,1.4,4.35);
  rechner(v,17.35,-9.2,-Math.PI/2); rechner(v,17.35,-.9,-Math.PI/2); k.kasten(17.35,-9.2,1.2,1.65); k.kasten(17.35,-.9,1.2,1.65);
  pflanze(v,16.9,2.2,1.0); k.kreis(16.9,2.2,.65);
  pflanze(v,16.8,11.6,1.2); k.kreis(16.8,11.6,.65);
  /* vorn (niedrig) */
  lowboard(v,-11.6,12.4,3.6,0); k.kasten(-11.6,12.4,3.75,1.1);
  pflanze(v,-7.6,12.3,.55); k.kreis(-7.6,12.3,.55);
  lowboard(v,-2.8,12.4,4.8,1); k.kasten(-2.8,12.4,4.95,1.1);
  lowboard(v,5.6,12.4,3.6,2); k.kasten(5.6,12.4,3.75,1.1);
  pflanze(v,9.4,12.3,.55); k.kreis(9.4,12.3,.55);
  lowboard(v,13.0,12.4,3.6,0); k.kasten(13.0,12.4,3.75,1.1);
  verschmelze(v);

  /* Teppichfelder und leuchtende Leitlinien (flach, nicht fest) */
  const tp=gruppe(sc,0,0,0);
  const feld=(x,z,b,t,f,rand)=>{ hell(box(tp,b,.012,t,rand,x,.006,z)); hell(box(tp,b-.24,.012,t-.24,f,x,.012,z)); };
  feld(-3.0,3.4,6.8,4.8,0x2f6670,0x48c8a8);
  feld(-14.9,-1.3,2.8,5.4,0x34486c,0x38b8c8); feld(14.9,7.4,2.8,5.4,0x34486c,0x38b8c8);
  [-.35,.35].forEach(s=>{ hell(box(tp,.1,.012,6.4,L(0x2fae9a),AX+s*4.6,.008,-9.4)); });
  verschmelze(tp); ohneSchatten(tp);

  /* ---------- Einsatzkräfte ---------- */
  disponent(k,-15.55,-1.9,-Math.PI/2-.35,1,0);
  disponent(k,15.55,7.9,Math.PI/2+.35,2,2.4);

  /* ---------- Licht (mit der Treppenlampe sechs Punktlichter) ---------- */
  const lampe=(x,y,z,f,s,w,p)=>{ const l=new THREE.PointLight(f,s,w,1.5); l.position.set(x,y,z); sc.add(l); k.anim.push(t=>{ l.intensity=s*(1+Math.sin(t*1.7+p)*.08); }); };
  lampe(-.5,3.4,-10.6,0x48e8e0,.7,13,0); lampe(-11.5,3.8,-8.0,0x58a8ff,.45,13,1.7); lampe(-12.5,3.6,5.0,0x50e8a0,.4,14,3.1);
  lampe(12.5,3.8,3.0,0x5898ff,.45,15,4.4); lampe(-1.5,3.6,4.0,0xfff0d8,.35,13,5.2);

  return { tuer, start:[3.0,-.6] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.2,-10.2],[-8.0,-9.4],[-3.4,-8.2],[3.6,-8.0],[14.0,-9.4],[-9.4,-5.2],[1.0,-5.6],[10.6,-6.4],[-13.2,.8],[-8.8,.2],
  [.6,-1.8],[13.6,-1.0],[-14.6,5.4],[-8.0,5.6],[2.4,5.8],[7.4,6.4],[13.4,4.4],[-12.4,9.8],[-1.0,9.4],[11.0,9.6]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-10.0, z:HINTEN, wand:'hinten', steh:[-9.8,-11.3], kasten:[5.4,.8], treffer:[5.4,3.5,.8], trefferY:1.2, baue(g,k){ /* 1 Stadtplan */
      box(g,5.3,3.3,.1,HOLZHELL,0,2.95,.08); schirm(g,planBild(),5.0,3.0,0,2.95,.145).material.color.setHex(0xdcdcdc);
      [-1,1].forEach(s=>{ box(g,.16,3.4,.2,HOLZ,s*2.62,2.95,.14); box(g,5.4,.16,.2,HOLZ,0,2.95+s*1.66,.14); });
      /* dicke Stecknadeln */
      [[-1.9,.8,0x2f78e0],[1.5,-.2,GELB],[.4,1.0,0x30b860],[2.0,.7,ROT],[-.5,-.65,ORANGE]].forEach(([x,y,f])=>{ strich(g,[x,2.95+y,.15],[x+.04,3.03+y,.36],.02,METALL); ball(g,.12,f,x+.05,3.05+y,.4); });
      /* blinkender Einsatzort */
      const p=gruppe(g,-1.0,3.35,.18); p.userData.lebendig=true; ring(p,.28,.045,L(0xff2a20),0,0,0); ball(p,.09,L(0xff2a20),0,0,.04);
      k.anim.push(t=>{ p.scale.setScalar(.8+((t*1.1)%1)*.6); });
      /* Leuchte über dem Plan */
      strich(g,[-1.2,4.65,.1],[-1.2,4.98,.45],.035,METALL); strich(g,[1.2,4.65,.1],[1.2,4.98,.45],.035,METALL); quer(walze(g,.1,3.2,METALL2,0,4.98,.48)); box(g,3.0,.05,.1,L(0xfff0c0),0,4.88,.5); } },
  { x:-.5, z:HINTEN, wand:'hinten', steh:[-.5,-11.3], kasten:[8.6,.8], treffer:[8.5,3.7,.8], trefferY:1.2, baue(g,k){ /* 2 Bildschirmwand */
      box(g,8.5,3.7,.12,0x10141c,0,3.05,.08);
      [0,1,2,3,4,5].forEach(i=>{ const x=(i%3-1)*2.76, y=i<3?3.96:2.14;
        box(g,2.66,1.72,.1,METALL2,x,y,.15); box(g,2.54,1.6,.04,SCHWARZ,x,y,.2); schirm(g,schirmBild([4,0,1,2,3,5][i]),2.42,1.48,x,y,.232);
        box(g,.1,.06,.03,LED[i],x+1.12,y-.8,.23); });
      /* Radar dreht sich */
      const z=gruppe(g,0,2.14,.25); z.userData.lebendig=true; box(z,.05,.6,.01,L(0xb0ffd0),0,.3,0); ball(z,.045,L(0xb0ffd0),0,0,0);
      const punkte=[0,1].map(i=>{ const q=gruppe(g,0,3.96,.26); q.userData.lebendig=true; flach(walze(q,.09,.02,L(i?0xffe040:0xff4038),0,0,0)); return q; });
      k.anim.push(t=>{ z.rotation.z=-t*1.8; punkte[0].position.set(Math.sin(t*.5)*1.0,3.96+Math.sin(t*.9)*.45,.26); punkte[1].position.set(Math.cos(t*.37+2)*.95,3.96+Math.cos(t*.71)*.5,.27); });
      schein(g,'rgba(70,220,230,.16)',0,3.0,.7,7.5); } },
  { x:-5.6, z:-3.4, steh:[-5.2,-1.25], kasten:[3.7,2.0], treffer:[3.5,2.8,1.9], baue(g,k){ /* 3 Notruftisch mit Telefon */
      [-1.55,1.55].forEach(a=>[-.68,.68].forEach(c=>{ walze(g,.1,1.2,METALL,a,.6,c); walze(g,.14,.08,EISEN,a,.04,c); }));
      box(g,3.6,.16,1.9,HOLZHELL,0,1.26,0); box(g,3.64,.07,1.94,HOLZ,0,1.17,0); box(g,3.2,.7,.08,0x2f7a8a,0,.76,-.7);
      /* großes rotes Telefon */
      const t=gruppe(g,-.55,1.34,.12);
      box(t,1.5,.2,1.05,ROT2,0,.1,0); const ob=box(t,1.4,.22,.82,ROT,0,.27,.02); ob.rotation.x=.18;
      box(t,.62,.04,.2,L(0x9affc0),-.22,.45,-.17).rotation.x=.18;
      for(let r=0;r<3;r++) for(let s=0;s<3;s++) box(t,.15,.07,.11,WEISS,-.43+s*.21,.43-r*.025,.04+r*.14).rotation.x=.18;
      [0,1,2].forEach(i=>box(t,.18,.06,.1,[GELB,0x30b860,METALL][i],.4,.43-i*.025,.04+i*.14).rotation.x=.18);
      /* Hörer auf zwei Stützen */
      [-.55,.55].forEach(a=>box(t,.2,.36,.2,ROT2,a,.5,-.36));
      quer(walze(t,.13,1.3,ROT,0,.82,-.36)); [-.72,.72].forEach(a=>{ ball(t,.27,ROT,a,.76,-.36,.95,.85,1.15); walze(t,.2,.06,SCHWARZ,a,.56,-.36); });
      /* gedrehtes Kabel */
      let alt=[-.9,.74,-.36]; for(let i=1;i<=26;i++){ const u=i/26, p=[-.9+u*.15-Math.sin(u*Math.PI)*.42+Math.cos(i*1.7)*.045*(1-u*u), .74-u*.62+Math.sin(i*1.7)*.045*(1-u*u), -.36+u*.46]; strich(t,alt,p,.028,SCHWARZ); alt=p; }
      /* Anruflampe */
      walze(t,.12,.08,METALL,.55,.47,-.14); const lm=basis(0xff3a30); ball(t,.13,lm,.55,.57,-.14);
      const s=schein(t,'rgba(255,60,40,.8)',.55,.62,-.14,1.1);
      k.anim.push(tt=>{ const an=Math.sin(tt*5)>0; lm.color.setHex(an?0xff3a30:0x6a1a16); s.visible=an; });
      /* Block, Stift, Tischlampe */
      box(g,.75,.05,.95,WEISS,.75,1.37,.28).rotation.y=-.15; for(let i=0;i<5;i++) box(g,.55,.012,.03,0x4a6ac0,.75+i*.02,1.4,.0+i*.14).rotation.y=-.15; quer(walze(g,.035,.7,0x2f68c0,1.25,1.39,.55)).rotation.y=1.1;
      walze(g,.26,.07,EISEN,1.35,1.37,-.5); strich(g,[1.35,1.4,-.5],[1.55,2.15,-.55],.05,METALL); strich(g,[1.55,2.15,-.55],[1.1,2.45,-.4],.05,METALL);
      const hb=kegel(g,.34,.38,GELB,1.0,2.36,-.34); hb.rotation.z=-.35; ball(g,.13,L(0xfff4c0),.94,2.19,-.32); schein(g,'rgba(255,230,160,.5)',.94,2.1,-.3,1.4); } },
  { x:-13.4, z:-6.4, dreh:.35, steh:[-12.5,-4.2], kasten:[3.6,2.3], treffer:[3.4,2.8,1.6], baue(g,k){ /* 4 Funkgeräte-Ladestation */
      box(g,3.2,1.0,1.3,0x5a6a80,0,.55,0); box(g,3.3,.12,1.4,HELL,0,1.1,0); box(g,3.0,.1,1.15,EISEN,0,.05,0);
      [-.75,.75].forEach(a=>{ box(g,1.35,.7,.05,0x76879e,a,.55,.67); box(g,.4,.07,.07,METALL,a,.78,.71); });
      box(g,3.05,.34,.8,0x20242c,0,1.33,.05); box(g,3.05,.7,.12,0x2c323c,0,1.5,-.45);
      [-1.1,-.37,.36,1.09].forEach((a,i)=>{ const f=gruppe(g,a,1.42,.02); f.rotation.x=-.08;
        box(f,.52,1.0,.3,i%2?GELB:0x3a8ae8,0,.5,0); box(f,.56,.18,.34,SCHWARZ,0,.05,0);
        box(f,.38,.24,.03,L(0x8af0c0),0,.76,.16); box(f,.26,.03,.01,0x14503a,-.03,.78,.18);
        [.5,.41,.32].forEach(y=>box(f,.36,.04,.03,i%2?SCHWARZ:METALL,0,y,.16)); [-.13,0,.13].forEach(x=>ball(f,.045,i%2?SCHWARZ:ORANGE,x,.21,.16));
        walze(f,.05,.62,SCHWARZ,-.15,1.3,0); ball(f,.07,SCHWARZ,-.15,1.62,0); walze(f,.08,.16,i%2?SCHWARZ:METALL,.14,1.07,0);
        box(g,.14,.09,.05,LED[[0,2,4,3][i]],a,1.33,.47); });
      /* Kabel */
      strich(g,[1.55,1.2,-.4],[1.75,.5,-.45],.04,SCHWARZ); strich(g,[1.75,.5,-.45],[1.75,.05,-.2],.04,SCHWARZ); schein(g,'rgba(80,255,150,.18)',0,1.7,.7,2.8); } },
  { x:7.3, z:-3.9, steh:[6.8,-1.8], r:1.15, treffer:[2.2,3.0,2.1], baue(g,k){ /* 5 Drehstuhl */
      const BL=0x2a86e8, BD=0x1c5cb0;
      for(let i=0;i<5;i++){ const a=i*Math.PI*2/5+.3, x=Math.sin(a)*.95, z=Math.cos(a)*.95; strich(g,[0,.42,0],[x,.24,z],.09,HELL); const rad=walze(g,.14,.18,SCHWARZ,x,.14,z); rad.rotation.z=Math.PI/2; rad.rotation.y=a; ball(g,.09,METALL,x,.27,z); }
      walze(g,.2,.3,EISEN,0,.45,0); walze(g,.11,.7,METALL,0,.8,0);
      const s=gruppe(g,0,0,0); s.rotation.y=.6; s.userData.lebendig=true; const o=gruppe(s,0,0,0);
      box(o,.8,.14,.8,EISEN,0,1.12,0); box(o,1.45,.28,1.35,BL,0,1.32,.05); quer(walze(o,.14,1.45,BL,0,1.32,.72));
      strich(o,[0,1.15,-.35],[0,1.35,-.82],.09,EISEN); strich(o,[0,1.35,-.82],[0,2.0,-.8],.09,EISEN);
      const ruecken=gruppe(o,0,2.35,-.7); ruecken.rotation.x=-.1; box(ruecken,1.25,1.35,.24,BL,0,0,0); quer(walze(ruecken,.2,1.25,BL,0,.66,0)); box(ruecken,.9,.45,.1,BD,0,-.28,.14); box(ruecken,.9,.5,.1,BD,0,.35,.14);
      [-1,1].forEach(v=>{ strich(o,[v*.72,1.22,-.15],[v*.88,1.78,-.15],.07,HELL); box(o,.22,.13,.95,SCHWARZ,v*.88,1.83,.02); });
      verschmelze(o);
      k.anim.push(t=>{ s.rotation.y=.55+Math.sin(t*.9)*.38; }); } },
  { x:6.2, z:HINTEN, wand:'hinten', steh:[6.2,-11.3], kasten:[3.0,.8], treffer:[2.9,3.2,.8], trefferY:1.4, baue(g,k){ /* 6 Notruf-Tafel */
      box(g,2.85,2.7,.12,WEISS,0,2.9,.08); schirm(g,notrufBild(),2.62,2.44,0,2.9,.15).material.color.setHex(0xeeeeee);
      [-1.28,1.28].forEach(x=>[1.72,4.08].forEach(y=>ball(g,.08,METALL,x,y,.17)));
      box(g,1.0,.16,.3,METALL2,0,4.33,.18);
      const lm=basis(0x48b8ff); ball(g,.24,lm,0,4.48,.22,1.5,.9,1);
      const s=schein(g,'rgba(70,170,255,.8)',0,4.5,.4,1.5);
      k.anim.push(t=>{ const an=Math.sin(t*6)>-.1; lm.color.setHex(an?0x60c8ff:0x1c4878); s.visible=an; }); } },
  { x:15.3, z:-5.0, dreh:-.75, steh:[13.2,-3.2], kasten:[2.4,2.5], treffer:[2.4,3.6,1.7], baue(g,k){ /* 7 Aktenschrank */
      const M=0xb8c0c8, MD=0x7c8692;
      box(g,2.3,3.1,1.15,M,0,1.6,0); box(g,2.4,.12,1.25,MD,0,3.2,0); box(g,2.2,.14,1.05,EISEN,0,.07,0);
      [-.56,.56].forEach((a,s)=>[.55,1.24,1.93,2.62].forEach((y,r)=>{ if(s===1&&r===2){ box(g,1.0,.6,.04,0x2a3038,a,y,.57); return; }
        box(g,1.02,.62,.07,0xcdd4da,a,y,.6); box(g,.46,.08,.1,MD,a,y+.04,.67); box(g,.36,.17,.02,[WEISS,GELB,0x8ad0a0,0xf0a8a0][(r+s)%4],a,y-.17,.645); }));
      /* herausgezogene Schublade mit bunten Mappen */
      const a=.56, y=1.93; box(g,1.02,.56,.09,0xcdd4da,a,y,1.38); box(g,.46,.08,.1,MD,a,y+.04,1.46);
      [-.49,.49].forEach(x=>box(g,.06,.4,.76,MD,a+x,y-.06,.98)); box(g,1.0,.05,.76,MD,a,y-.26,.98);
      [ROT,GELB,0x30a868,0x2f78d0,ORANGE,0x9a60c0].forEach((f,i)=>{ box(g,.84,.5,.07,f,a,y+.12,.68+i*.115); box(g,.2,.1,.075,f,a-.28+(i%3)*.28,y+.42,.68+i*.115); });
      /* Ordner oben */
      [[-.8,ROT],[-.55,0x2f78d0],[-.3,GELB],[-.05,0x30a868]].forEach(([x,f])=>{ box(g,.22,.78,.7,f,x,3.65,0); box(g,.12,.22,.02,WEISS,x,3.74,.36); flach(walze(g,.05,.03,EISEN,x,3.45,.36)); }); } },
  { x:-3.0, z:3.4, steh:[-.15,3.7], kasten:[4.5,2.8], treffer:[4.3,2.2,2.6], baue(g,k){ /* 8 Lagetisch */
      [-1.6,1.6].forEach(a=>{ box(g,.4,.9,1.5,METALL2,a,.5,0); box(g,.65,.14,1.9,EISEN,a,.07,0); }); box(g,3.0,.2,.2,EISEN,0,.4,0);
      box(g,4.2,.26,2.6,0x2a3446,0,1.07,0);
      schirm(g,lageBild(),3.8,2.2,0,1.215,0).rotation.x=-Math.PI/2;
      [-1,1].forEach(s=>{ box(g,4.28,.12,.18,METALL,0,1.23,s*1.27); box(g,.18,.12,2.7,METALL,s*2.05,1.23,0); box(g,3.9,.06,.05,L(0x48f0e0),0,1.04,s*1.32); box(g,.05,.06,2.3,L(0x48f0e0),s*2.12,1.04,0); });
      /* kleine Modellautos */
      const auto=(par,f,leiter)=>{ box(par,.5,.2,.26,f,-.06,.17,0); box(par,.2,.26,.26,f,.3,.2,0); box(par,.03,.1,.2,0xb0e0ff,.41,.25,0); [-.2,.26].forEach(x=>[-.13,.13].forEach(z=>flach(walze(par,.07,.05,SCHWARZ,x,.07,z)))); box(par,.09,.07,.14,L(0x48a0ff),.3,.37,0); if(leiter){ box(par,.55,.04,.05,METALL,-.1,.31,-.07); box(par,.55,.04,.05,METALL,-.1,.31,.07); [-.3,-.15,0,.12].forEach(x=>box(par,.03,.03,.16,METALL,x,.31,0)); } };
      const setze=(x,z,d,f,l)=>{ const q=gruppe(g,x,1.22,z); q.rotation.y=d; auto(q,f,l); return q; };
      setze(-1.25,-.5,.3,ROT,true); setze(1.3,-.6,2.5,WEISS,false); setze(.2,.75,-.2,ROT,false);
      /* Häuschen und Spielsteine für Einsatzorte */
      [[-1.4,.65,CREME],[.75,.45,0xf0c070]].forEach(([x,z,f])=>{ box(g,.3,.26,.3,f,x,1.35,z); rohr(g,0,.25,.2,ROT2,x,1.58,z,4).rotation.y=Math.PI/4; });
      [[-.4,-.7,GELB],[1.55,.55,0x30b860],[-.6,.2,ORANGE]].forEach(([x,z,f])=>{ walze(g,.13,.06,f,x,1.26,z); ball(g,.11,f,x,1.4,z); });
      const fahrer=gruppe(g,0,1.22,0); fahrer.userData.lebendig=true; auto(fahrer,ROT,true); verschmelze(fahrer);
      k.anim.push(t=>{ const u=Math.sin(t*.45); fahrer.position.x=u*1.3; fahrer.position.z=-.08; fahrer.rotation.y=Math.cos(t*.45)>0?0:Math.PI; });
      schein(g,'rgba(120,255,230,.14)',0,1.8,0,3.6); } },
  { x:11.7, z:1.6, dreh:-.35, steh:[9.1,3.0], kasten:[3.0,3.2], treffer:[2.8,2.8,2.1], baue(g,k){ /* 9 Großer Drucker */
      const W=0xdfe3e8, D=0x48505e;
      box(g,2.2,.2,1.4,D,0,.18,0); [-.95,.95].forEach(a=>[-.55,.55].forEach(c=>quer(walze(g,.1,.12,SCHWARZ,a,.1,c))));
      box(g,2.4,1.15,1.55,W,0,.86,0); [.55,.95].forEach(y=>{ box(g,2.0,.33,.05,0xc4cad2,0,y,.79); box(g,.6,.07,.07,D,0,y+.04,.83); });
      box(g,2.44,.3,1.58,D,0,1.58,0); box(g,2.4,.35,1.4,W,0,1.9,-.06); box(g,2.2,.12,1.15,D,0,2.13,-.14);
      /* Papiereinzug hinten */
      const e=gruppe(g,-.3,2.2,-.62); e.rotation.x=-.35; box(e,1.3,.8,.07,D,0,.38,0); box(e,1.1,.75,.06,WEISS,0,.5,.07);
      /* Bedienfeld */
      const p=gruppe(g,.8,2.2,.46); p.rotation.x=-.55; box(p,.62,.4,.12,D,0,0,0); box(p,.36,.22,.02,L(0x68e8ff),-.08,.02,.07); box(p,.08,.08,.04,LED[0],.21,.08,.07); box(p,.08,.08,.04,LED[3],.21,-.08,.07);
      box(g,1.45,.09,.05,SCHWARZ,-.15,1.62,.8);
      /* Ablage mit fertigen Blättern */
      box(g,1.5,.08,1.05,D,-.15,1.15,1.25); box(g,1.5,.14,.07,D,-.15,1.22,1.76); [-.82,.52].forEach(a=>strich(g,[a,.75,.78],[a,1.12,1.5],.045,D));
      [0,1,2].forEach(i=>box(g,1.14,.025,.82,i%2?0xeef0f4:WEISS,-.15+(i-1)*.04,1.2+i*.026,1.28));
      /* Blatt schiebt sich aus dem Schlitz */
      const bl=gruppe(g,-.15,1.62,.8); bl.userData.lebendig=true; const neig=gruppe(bl,0,0,0); neig.rotation.x=.3;
      const blatt=schirm(neig,blattBild(),1.08,1.1,0,.012,.55); blatt.rotation.x=-Math.PI/2; blatt.material.color.setHex(0xe4e4e4);
      k.anim.push(t=>{ const u=(t*.3)%1, a=Math.min(1,u/.75); bl.scale.z=.04+a*.96; bl.position.y=1.62-Math.max(0,u-.82)*1.5; });
      /* Papierpakete daneben */
      [[.1,0],[.30,.18]].forEach(([y,d])=>{ const q=gruppe(g,-.75,2.2+y-.02,-.02); q.rotation.y=d; box(q,.8,.2,.55,0x2f78d0,0,0,0); box(q,.82,.07,.2,WEISS,0,.002,0); }); } },
  { x:-11.8, z:2.6, steh:[-10.0,3.7], r:1.0, treffer:[1.8,3.6,1.7], baue(g,k){ /* 10 Wasserspender */
      box(g,1.15,.14,1.05,METALL2,0,.07,0); box(g,1.05,1.75,.95,WEISS,0,1.0,0); box(g,1.12,.14,1.02,METALL,0,1.93,0);
      box(g,.82,.62,.06,0x8c98a6,0,1.4,.47); [[-.2,0x2f88f0],[.2,0xe83028]].forEach(([x,f])=>{ box(g,.2,.18,.18,f,x,1.6,.55); walze(g,.045,.16,METALL,x,1.45,.6); });
      box(g,.86,.08,.34,METALL,0,1.1,.62); [-.28,-.14,0,.14,.28].forEach(x=>box(g,.04,.02,.28,EISEN,x,1.15,.62));
      box(g,.8,.6,.04,0xdce4ec,0,.55,.49); box(g,.28,.06,.06,METALL2,0,.76,.52);
      /* Becher in der Halterung */
      walze(g,.15,.7,METALL,.68,1.45,.1); [1.06,.99,.92].forEach(y=>rohr(g,.14,.1,.16,WEISS,.68,y,.1,12));
      rohr(g,.11,.08,.22,0x58c8f0,.18,1.27,.65,12);
      /* große blaue Flasche kopfüber */
      walze(g,.2,.2,0x2f78d0,0,2.08,0);
      const glas=basis(0x6cc4ff,{transparent:true,opacity:.42,depthWrite:false}), wasser=basis(0x2f98f0,{transparent:true,opacity:.6,depthWrite:false});
      rohr(g,.52,.2,.3,glas,0,2.32,0,18); rohr(g,.52,.52,.95,glas,0,2.94,0,18); const kuppe=ball(g,.52,glas,0,3.41,0,1,.4,1); kuppe.castShadow=false;
      hell(rohr(g,.47,.17,.28,wasser,0,2.33,0,18)); hell(rohr(g,.47,.47,.66,wasser,0,2.8,0,18));
      [2.62,3.28].forEach(y=>flach(ring(g,.53,.028,0x4aa8e8,0,y,0)));
      box(g,.09,.8,.03,L(0xe8f8ff),-.28,2.92,.45);
      const blasen=[0,1,2,3,4,5].map(i=>{ const b=hell(ball(g,.07,L(0xf0fcff),0,2.4,.3)); b.userData.lebendig=true; return b; });
      k.anim.push(t=>blasen.forEach((b,i)=>{ const u=(t*.55+i*.173)%1; b.position.set(Math.sin(i*2.4+u*6)*.22,2.35+u*.82,Math.cos(i*2.4)*.2+.12); b.scale.setScalar(.04+(i%3)*.018+u*.03); }));
      schein(g,'rgba(90,190,255,.3)',0,2.9,.3,2.2); } }
];

return { titel:'Die Leitstelle', breite:36, tiefe:27, oben:['10,16,28','22,34,56','40,58,88'], baue, gegenstaende, verstecke };
})();

/* Raum 5: Das Dach mit der Drehleiter im Abendrot. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: der Korb der Drehleiter am hinteren Dachrand. Das Törchen schwingt auf, die Figur steigt in den Korb.
   Der Korb bleibt dabei stehen (die Fahrt zeigt erst das Schlussbild). */
RAEUME3D.feuerwache[4] = (function(){
const B=36, T=27;
const RX=18.6, RZ=13.85;          /* halbe Maße der Dachplatte */
const EX=-4.5;                    /* Mitte des Korbs */
const KZ=-15.1;                   /* Mitte des Korbs in der Tiefe */
const UNTEN=-14;                  /* Straße tief unten */
const HIMMEL=0xf09a6c;
const ohneSchatten=g=>g.traverse(m=>{ m.castShadow=false; });
/* durchgehend dieselben Leuchtfarben (weniger Materialien) */
let LM=null;
const leuchten=()=>LM||(LM={ warm:basis(0xffe08a), rot:basis(0xff3a2a), gruen:basis(0x4af06a), blau:basis(0x4a9aff), linse:basis(0x9adcff) });
/* eigene Kugel mit weniger Dreiecken */
function leicht(g){ const k=new THREE.SphereGeometry(1,10,7); g.traverse(m=>{ if(m.isMesh && m.geometry===GEO.sph) m.geometry=k; }); }
/* flache Fläche mit gemaltem Bild, Blick nach +z */
function bildFlaeche(par,w,h,tex,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
/* Instanzen mit selbstleuchtender Farbe: liste [[x,y,z,sx,sy,sz,farbe]] */
function lichtpunkte(par,geo,liste){
  const im=new THREE.InstancedMesh(geo,basis(0xffffff),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.frustumCulled=false; par.add(im); return im;
}

/* ---------- Himmel, Sonne, Wolken, Vögel ---------- */
function himmel(k){
  const sc=k.scene;
  const t=bild(512,512,g=>{
    const v=g.createLinearGradient(0,0,0,512);
    v.addColorStop(0,'#4a4a92'); v.addColorStop(.28,'#9a6aa4'); v.addColorStop(.5,'#f0906a'); v.addColorStop(.66,'#ffc678'); v.addColorStop(.8,'#f4986c'); v.addColorStop(1,'#8a5a86');
    g.fillStyle=v; g.fillRect(0,0,512,512);
    g.fillStyle='#fff6d0'; for(let i=0;i<60;i++) g.fillRect((i*137)%510,(i*53)%110,2,2);
  });
  const kuppel=new THREE.Mesh(new THREE.CylinderGeometry(86,86,64,40,1,true),new THREE.MeshBasicMaterial({map:t,side:THREE.BackSide,depthWrite:false}));
  kuppel.position.y=8; kuppel.renderOrder=-5; sc.add(kuppel);
  const sonne=gruppe(sc,13,-.2,-62);
  ball(sonne,3.4,basis(0xfff2a8),0,0,0,1,1,.3).castShadow=false;
  const hof=schein(sonne,'rgba(255,214,110,.9)',0,0,1.4,17);
  k.anim.push(t=>{ const s=16+Math.sin(t*.8)*.9; hof.scale.set(s,s*.82,1); });
  const farben=[basis(0xffd2a6),basis(0xf08c9c),basis(0xc87aac)];
  [[-34,.6,-56,1.5],[-6,2.6,-64,1.9],[30,1.4,-54,1.3],[-56,3,-18,1.6],[56,2,-12,1.5],[-22,5,-60,1.1],[24,6,58,1.4],[-30,3,50,1.7]].forEach(([x,y,z,s],i)=>{
    const g=gruppe(sc,x,y,z), m=farben[i%3];
    [[0,0,2.2],[2.4,-.2,1.5],[-2.5,-.25,1.6],[.7,.45,1.3]].forEach(([a,b,r])=>{ ball(g,r*s,m,a*s,b*s,0,1.6,.3,.55); });
    ohneSchatten(g); leicht(g); verschmelze(g);
    k.anim.push(t=>{ g.position.x=x+Math.sin(t*.045+i)*5; });
  });
  /* ein Vogelschwarm zieht über der Stadt */
  const vm=basis(0x3a2438,{side:THREE.DoubleSide});
  for(let i=0;i<5;i++){ const g=gruppe(sc,0,0,-24); g.userData.lebendig=true; ball(g,.15,vm,0,0,0,2,.7,.7).castShadow=false;
    const fl=[-1,1].map(s=>{ const f=gruppe(g,0,0,0); box(f,.26,.035,.65,vm,-.03,0,s*.38).castShadow=false; return f; });
    const w0=i*.32+(i%2)*.12, r=11+(i%3)*1.4;
    k.anim.push(t=>{ const w=t*.2+w0; g.position.set(4+Math.cos(w)*r*1.5,-.2+(i%3)*.45+Math.sin(t*.9+i)*.25,-27+Math.sin(w)*r*.45); g.rotation.y=Math.atan2(-Math.cos(w)*r*.45,-Math.sin(w)*r*1.5);
      const s=Math.sin(t*6+i*1.4)*.6; fl[0].rotation.x=s; fl[1].rotation.x=-s; }); }
}

/* ---------- Die Stadt tief unten, rundum ---------- */
function stadtUnten(k){
  const sc=k.scene;
  const t=bild(512,512,g=>{
    g.fillStyle='#5a4a6e'; g.fillRect(0,0,512,512);
    for(let i=0;i<500;i++){ g.fillStyle=i%2?'rgba(110,80,120,.45)':'rgba(70,100,90,.4)'; g.fillRect(zufall()*500,zufall()*500,6+zufall()*18,5+zufall()*14); }
    g.fillStyle='#36304a'; [40,200,380].forEach(v=>{ g.fillRect(v,0,38,512); g.fillRect(0,v+30,512,38); });
    g.fillStyle='#e8d8b0'; [40,200,380].forEach(v=>{ for(let a=0;a<512;a+=32){ g.fillRect(v+18,a,3,14); g.fillRect(a,v+48,14,3); } });
    [40,200,380].forEach(v=>{ for(let a=14;a<512;a+=46){ [[v-3,a],[a,v+27],[v+41,a+22],[a+22,v+71]].forEach(([x,y])=>{ g.fillStyle='rgba(255,210,100,.35)'; g.beginPath(); g.arc(x,y,9,0,7); g.fill(); g.fillStyle='#ffe090'; g.beginPath(); g.arc(x,y,3,0,7); g.fill(); }); } });
  });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(9,9);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(320,320),new THREE.MeshBasicMaterial({map:t})); m.rotation.x=-Math.PI/2; m.position.y=UNTEN-.05; sc.add(m);
  const alle=gruppe(sc,0,0,0);
  const reihe=(dreh,x1,x2,z,h1,h2)=>{ const g=gruppe(alle,0,0,0); g.rotation.y=dreh; FW.stadt(g,x1,x2,z,h1,h2,UNTEN); };
  /* hinten: drei Reihen, die fernen sind höher (Umriss am Horizont); in der Nähe der Leiter bleibt die Straße frei */
  reihe(0,-52,-27,-26,3,7.5); reihe(0,5,52,-25,3,7);
  reihe(0,-62,62,-39,5,10.5);
  reihe(0,-74,74,-53,7,13.2);
  /* links, rechts und vorn */
  [Math.PI/2,-Math.PI/2].forEach(d=>{ reihe(d,-34,34,-27,3,7.5); reihe(d,-46,46,-40,5,10); reihe(d,-56,56,-54,7,12.5); });
  reihe(Math.PI,-40,40,-23,2.5,6); reihe(Math.PI,-55,55,-36,4,8.5); reihe(Math.PI,-66,66,-50,6,10);
  /* alle Häuser je Farbe zu einem Körper zusammenfassen (die Fenster bleiben als Instanzen) */
  verschmelze(alle); ohneSchatten(alle);
  /* Bäume am Straßenrand */
  const L=[];
  for(let i=0;i<150;i++){ const s=i%4; let x,z; if(s<2){ x=-30+zufall()*60; z=(s?1:-1)*(16.2+zufall()*5); } else { x=(s===2?-1:1)*(20.5+zufall()*5); z=-18+zufall()*36; }
    if(z<-14&&x>-25&&x<2) continue; const r=.7+zufall()*.9; L.push([x,UNTEN+r*.8,z,r,r*.9,r,[0x4a6a46,0x5a7a44,0x6a6a40][i%3]]); }
  FW.viele(sc,GEO.sph,L);
}

/* ---------- Dach, Hauswände darunter, Brüstung ---------- */
function dach(k){
  const sc=k.scene;
  const t=bild(1024,768,g=>{
    const X=x=>(x+RX)/(2*RX)*1024, Z=z=>(z+RZ)/(2*RZ)*768, bx=1024/(2*RX), bz=768/(2*RZ);
    g.fillStyle='#8e847e'; g.fillRect(0,0,1024,768);
    for(let i=0;i<5200;i++){ g.fillStyle=['rgba(255,236,214,.3)','rgba(60,46,50,.3)','rgba(160,110,90,.3)'][i%3]; g.fillRect(zufall()*1018,zufall()*762,2+zufall()*4,2+zufall()*3); }
    /* Gehwege aus Betonplatten */
    const platte=(x,z)=>{ g.fillStyle='#6a6064'; g.fillRect(X(x-.8),Z(z-.66),1.6*bx,1.32*bz); g.fillStyle=(Math.round(x+z)%2)?'#c2b8ac':'#b6aca2'; g.fillRect(X(x-.74),Z(z-.6),1.48*bx,1.2*bz); };
    for(let z=-12.6;z<9;z+=1.4) platte(EX,z);
    for(let x=-12.5;x<12;x+=1.68) if(Math.abs(x-EX)>1.3) platte(x,.8);
    /* gelb-schwarzer Streifen vor dem Korb */
    g.save(); g.beginPath(); g.rect(X(EX-1.75),Z(-13.4),3.5*bx,.55*bz); g.clip(); g.fillStyle='#ffd21e'; g.fillRect(X(EX-1.75),Z(-13.4),3.5*bx,.55*bz);
    g.strokeStyle='#26222a'; g.lineWidth=11; for(let a=-3;a<5;a+=.62){ g.beginPath(); g.moveTo(X(EX+a),Z(-12.7)); g.lineTo(X(EX+a+.75),Z(-13.5)); g.stroke(); } g.restore();
    /* Fugen der Dachbahnen */
    g.strokeStyle='rgba(60,48,52,.35)'; g.lineWidth=3; for(let x=-16;x<18;x+=6.4){ g.beginPath(); g.moveTo(X(x),0); g.lineTo(X(x),768); g.stroke(); }
  });
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(2*RX,2*RZ),new THREE.MeshLambertMaterial({map:t})); boden.rotation.x=-Math.PI/2; boden.receiveShadow=true; sc.add(boden);
  /* Haus darunter mit Fenstern */
  const haus=gruppe(sc,0,0,0);
  box(haus,2*RX-.02,-UNTEN-.04,2*RZ-.02,0xa85648,0,UNTEN/2-.02,0);
  [-.5,-4.6,-9].forEach(y=>box(haus,2*RX+.3,.28,2*RZ+.3,0xd8c8b4,0,y-.1,0));
  ohneSchatten(haus); verschmelze(haus);
  const F=[], R=[];
  [-2.6,-6.8,-11.2].forEach((y,e)=>{
    for(let i=0;i<12;i++){ const x=-16.5+i*3; [-1,1].forEach(s=>{ R.push([x,y,s*(RZ+.005),1.5,2.1,.04,0xb8a8a0]); F.push([x,y,s*(RZ+.02),1.2,1.8,.05,(i*7+e*3+s)%5?0xffdc80:0x4a4a72]); }); }
    for(let i=0;i<9;i++){ const z=-12+i*3; [-1,1].forEach(s=>{ R.push([s*(RX+.005),y,z,.04,2.1,1.5,0xb8a8a0]); F.push([s*(RX+.02),y,z,.05,1.8,1.2,(i*5+e)%4?0xffdc80:0x4a4a72]); }); }
  });
  lichtpunkte(sc,GEO.box,R); lichtpunkte(sc,GEO.box,F);
  /* Brüstung rundum, hinten mit Lücke für den Korb */
  const ziegel=FW.ziegelBild([182,92,66],'#e0cdb8'), g=gruppe(sc,0,0,0), H=.8, D=.5;
  const stueck=(x,z,w,d)=>{ FW.mauer(g,ziegel,w,H,d,x,H/2,z); box(g,w+(w>d?0:.16),.16,d+(d>w?0:.16),0xe4d6c0,x,H+.07,z); k.kasten(x,z,w,d); };
  const L=EX-1.75, Rr=EX+1.75;
  stueck((-RX+L)/2,-RZ+D/2,L+RX,D); stueck((Rr+RX)/2,-RZ+D/2,RX-Rr,D);
  stueck(0,RZ-D/2,2*RX,D);
  stueck(-RX+D/2,0,D,2*RZ-2*D); stueck(RX-D/2,0,D,2*RZ-2*D);
  verschmelze(g);
  /* Regenrinnen-Abläufe und kleine Eckpfeiler */
  const e=gruppe(sc,0,0,0);
  [-1,1].forEach(a=>[-1,1].forEach(b=>{ box(e,.72,1.15,.72,0xc87258,a*(RX-.3),.575,b*(RZ-.3)); box(e,.9,.18,.9,0xe4d6c0,a*(RX-.3),1.22,b*(RZ-.3)); ball(e,.26,0xe4d6c0,a*(RX-.3),1.52,b*(RZ-.3)); }));
  verschmelze(e);
}

/* ---------- Ausgang: der Korb an der Drehleiter ---------- */
function leiter(g,A,Z,halb){
  const a=V(A[0],A[1],A[2]), d=V(Z[0],Z[1],Z[2]).sub(a), l=d.length(), q=V(-d.z,0,d.x).normalize().multiplyScalar(halb);
  const p=(u,s,h)=>[a.x+d.x*u+q.x*s,a.y+d.y*u+(h||0),a.z+d.z*u+q.z*s];
  [-1,1].forEach(s=>{ strich(g,p(0,s),p(1,s),.14,0xc4ccd6); strich(g,p(0,s,.85),p(1,s,.85),.08,FW.ROT);
    const n=Math.round(l/1.5); for(let i=0;i<=n;i++){ strich(g,p(i/n,s),p(i/n,s,.85),.05,0xc4ccd6); if(i<n) strich(g,p(i/n,s),p((i+1)/n,s,.85),.045,0xc4ccd6); } });
  const n=Math.round(l/.55); for(let i=0;i<=n;i++) strich(g,p(i/n,-1),p(i/n,1),.06,0xe8ecf2);
}
function korbAusgang(k){
  const sc=k.scene, LF=leuchten();
  /* Leiter, Gelenkarm und Löschfahrzeug unten */
  const arm=gruppe(sc,0,0,0), KNIE=[-18,-1.5,-23.5], SPITZE=[EX-2.0,-.45,KZ-1.2];
  leiter(arm,KNIE,SPITZE,.62);
  strich(arm,SPITZE,[EX-1.1,-.32,KZ-.8],.22,FW.EISEN);
  strich(arm,[-18,-12,-26],KNIE,.45,FW.ROT); ball(arm,.7,FW.EISEN,KNIE[0],KNIE[1],KNIE[2]);
  walze(arm,1.0,.8,FW.EISEN,-18,-11.8,-26);
  ohneSchatten(arm); verschmelze(arm);
  const unten=gruppe(sc,0,UNTEN,0);
  const wagen=FW.loeschwagen(unten,-17.3,-26,0,{ ohneLeiter:true });
  const wagen2=FW.loeschwagen(unten,-7,-19.5,0,{});
  ohneSchatten(unten);
  k.anim.push(t=>{ [wagen,wagen2].forEach((w,n)=>w.blau.forEach((b,i)=>b.visible=Math.floor(t*3+i+n)%2===0)); });
  /* der Korb: Boden bündig mit dem Dach */
  const korb=gruppe(sc,EX,0,KZ), W=1.65, TI=1.15;
  box(korb,2*W,.3,2*TI+.1,FW.EISEN,0,-.16,0);
  for(let i=0;i<7;i++) box(korb,.38,.03,2*TI-.1,i%2?0xb8c0ca:0xd4dae2,-1.38+i*.46,-.012,0);
  [-1,1].forEach(a=>{ box(korb,.1,.5,2*TI+.14,FW.ROT,a*(W+.01),-.2,0); });
  box(korb,2*W+.1,.5,.1,FW.ROT,0,-.2,-TI-.04);
  [-1,1].forEach(a=>[-1,1].forEach(b=>{ walze(korb,.09,1.42,FW.ROT,a*W,.7,b*TI); ball(korb,.13,FW.GELB,a*W,1.46,b*TI); }));
  /* Geländer links, rechts, hinten */
  [.62,1.3].forEach(y=>{ strich(korb,[-W,y,-TI],[W,y,-TI],.07,FW.WEISS); [-1,1].forEach(a=>strich(korb,[a*W,y,-TI],[a*W,y,TI],.07,FW.WEISS)); });
  [-.82,0,.82].forEach(x=>strich(korb,[x,0,-TI],[x,1.3,-TI],.045,0xc4ccd6));
  [-.55,.35].forEach(z=>[-1,1].forEach(a=>strich(korb,[a*W,0,z],[a*W,1.3,z],.045,0xc4ccd6)));
  box(korb,2.9,.42,.07,FW.ROT,0,.24,-TI); box(korb,2.9,.1,.09,FW.GELB,0,.24,-TI);
  [-1,1].forEach(a=>{ box(korb,.07,.42,2.2,FW.ROT,a*W,.24,0); box(korb,.09,.1,2.2,FW.GELB,a*W,.24,0);
    /* Scheinwerfer außen am Korb */
    walze(korb,.22,.26,FW.EISEN,a*(W+.26),1.0,-TI+.15).rotation.x=Math.PI/2; walze(korb,.17,.04,LF.warm,a*(W+.26),1.0,-TI+.3).rotation.x=Math.PI/2; });
  verschmelze(korb);
  const blau=[-1,1].map(a=>{ const b=walze(korb,.14,.22,LF.blau,a*W,1.68,-TI); b.userData.lebendig=true; b.castShadow=false; return b; });
  /* Törchen vorn: Scharnier links, schwingt auf das Dach */
  const tor=gruppe(sc,EX-W+.1,0,KZ+TI); tor.userData.lebendig=true;
  const bw=2*W-.22;
  [.22,.72,1.22].forEach(y=>strich(tor,[0,y,0],[bw,y,0],.075,FW.GELB));
  [0,bw/4,bw/2,bw*3/4,bw].forEach((x,i)=>strich(tor,[x,.16,0],[x,1.26,0],i===0||i===4?.085:.05,FW.GELB));
  box(tor,bw,.34,.07,FW.ROT,bw/2,.47,0); for(let i=0;i<6;i++){ const s=box(tor,.14,.4,.09,FW.WEISS,.28+i*.52,.47,0); s.rotation.z=-.6; s.scale.y=.38; }
  box(tor,.18,.3,.16,FW.EISEN,bw-.05,1.0,.02);
  verschmelze(tor);
  /* Pfosten mit Zahlenschloss rechts neben der Lücke, links ein Leuchtpfosten */
  const pf=gruppe(sc,0,0,0), PX=EX+2.15, PZ=-13.5;
  [PX,EX-2.15].forEach((x,n)=>{ const h=n?1.9:2.0; for(let i=0;i<6;i++) box(pf,.36,h/6,.36,i%2?0x26222a:FW.GELB,x,h/12+i*h/6,PZ); box(pf,.5,.14,.5,FW.EISEN,x,h+.06,PZ); k.kreis(x,PZ,.3); });
  box(pf,1.02,.86,.16,FW.EISEN,PX+.1,2.5,PZ+.02);
  walze(pf,.13,.1,FW.EISEN,EX-2.15,2.06,PZ);
  walze(pf,.06,.42,FW.EISEN,PX+.1,3.1,PZ);
  verschmelze(pf);
  const schloss=FW.zahlenschloss(sc,PX+.1,2.42,PZ+.24); schloss.scale.setScalar(1.05); verschmelze(schloss);
  const rot=ball(sc,.17,LF.rot,PX+.1,3.38,PZ), gruen=ball(sc,.17,LF.gruen,PX+.1,3.38,PZ); gruen.visible=false;
  const rot2=ball(sc,.2,LF.rot,EX-2.15,2.24,PZ), gruen2=ball(sc,.2,LF.gruen,EX-2.15,2.24,PZ); gruen2.visible=false;
  [rot,gruen,rot2,gruen2].forEach(m=>m.castShadow=false);
  /* geschlossen kommt man nicht hindurch */
  k.kasten(EX,-13.6,3.5,.5);
  return ausgang(k,{ steh:[EX,-12.1], durch:[EX,KZ], treffer:{x:EX,y:1.25,z:-13.85,b:4.6,h:2.8,t:1.3}, name:'Korb der Drehleiter', einfach:'Korb an der Leiter',
    schildOben:[EX,3.5,-13.8], glanz:[PX+.1,2.45,PZ+.55], blick:{ pitch:.62, zoom:.95 },
    bewege:(auf,t)=>{ tor.rotation.y=-auf*1.8; rot.visible=rot2.visible=auf<.5; gruen.visible=gruen2.visible=auf>=.5;
      blau.forEach((b,i)=>b.visible=auf<.5||Math.floor(t*4+i)%2===0); } });
}

/* ---------- Ausstattung auf dem Dach (nichts davon ist ein Gegenstand) ---------- */
function schornstein(k,g,x,z,h,w){
  box(g,w,h,w*.8,0xa8503e,x,h/2,z); for(let y=.35;y<h-.2;y+=.35) box(g,w+.015,.03,w*.8+.015,0xd8bca8,x,y,z);
  box(g,w+.24,.18,w*.8+.24,0xd8c8b4,x,h+.08,z);
  const n=w>1?2:1; for(let i=0;i<n;i++){ const dx=n>1?(i-.5)*w*.5:0; walze(g,.17,.5,0x5a4a52,x+dx,h+.4,z); walze(g,.23,.08,0x3a3440,x+dx,h+.68,z); }
  k.kasten(x,z,w+.1,w*.8+.1);
}
function bogenrohr(k,g,x,z,dreh,h){
  const r=gruppe(g,x,0,z); r.rotation.y=dreh;
  walze(r,.24,h,0xb8c0c8,0,h/2,0); walze(r,.31,.1,0x7a828c,0,.06,0); walze(r,.27,.08,0x7a828c,0,h*.55,0);
  ball(r,.27,0xb8c0c8,0,h,0); const q=walze(r,.24,.5,0xb8c0c8,.25,h,0); q.rotation.z=Math.PI/2; const e=walze(r,.28,.1,0x7a828c,.5,h,0); e.rotation.z=Math.PI/2;
  const i=walze(r,.18,.03,0x2a2630,.56,h,0); i.rotation.z=Math.PI/2;
  k.kreis(x,z,.34);
}
function treppenhaus(k){
  const g=gruppe(k.scene,-15.5,0,10.4);
  box(g,3.4,2.5,2.9,0xc87a5c,0,1.25,0);
  for(let y=.45;y<2.4;y+=.42) box(g,3.42,.03,2.92,0xdcb8a0,0,y,0);
  box(g,3.8,.22,3.3,0x5a5260,0,2.61,0); box(g,3.5,.14,3.0,0x6e6674,0,2.78,0);
  /* schlichte graue Tür an der Seite, rundes Fenster vorn zum Dach */
  box(g,.08,.7,1.1,0x6e6a72,1.72,1.5,.2); for(let i=0;i<4;i++) box(g,.06,.06,.94,0x3a3640,1.77,1.28+i*.15,.2);
  const fz=walze(g,.46,.08,0xe4d6c0,.2,1.45,-1.47); fz.rotation.x=Math.PI/2; const fg=walze(g,.34,.1,leuchten().warm,.2,1.45,-1.48); fg.rotation.x=Math.PI/2;
  box(g,.7,.05,.05,0xe4d6c0,.2,1.45,-1.54); box(g,.05,.7,.05,0xe4d6c0,.2,1.45,-1.54);
  /* Wetterhahn */
  walze(g,.04,1.1,FW.EISEN,-.9,3.35,0); strich(g,[-1.4,3.55,0],[-.4,3.55,0],.025,FW.EISEN); strich(g,[-.9,3.55,-.5],[-.9,3.55,.5],.025,FW.EISEN);
  ball(g,.22,FW.GOLD,-.9,3.98,0,1.3,.9,.4); ball(g,.12,FW.GOLD,-.62,4.2,0); kegel(g,.05,.14,FW.ORANGE,-.45,4.18,0).rotation.z=-Math.PI/2; ball(g,.08,FW.ROT,-.62,4.34,0,1.2,.9,.5); ball(g,.2,FW.GOLD,-1.22,4.12,0,.7,1.4,.3);
  verschmelze(g); k.verdecker(g,-15.5,10.4,1.9); k.kasten(-15.5,10.4,3.6,3.1);
}
function lampe(k,g,x,z){
  walze(g,.24,.14,FW.EISEN,x,.07,z); walze(g,.07,2.3,FW.EISEN,x,1.15,z); box(g,.36,.42,.36,leuchten().warm,x,2.5,z);
  [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.05,.46,.05,FW.EISEN,x+a*.19,2.5,z+b*.19))); kegel(g,.4,.3,FW.EISEN,x,2.86,z); k.kreis(x,z,.28);
}
function lichterkette(k){
  const sc=k.scene, g=gruppe(sc,0,0,0), P=[];
  const kette=(a,b,n)=>{ for(let i=0;i<=n;i++){ const u=i/n, x=a[0]+(b[0]-a[0])*u, z=a[1]+(b[1]-a[1])*u, y=2.75-Math.sin(u*Math.PI)*.65;
      P.push([x,y-.12,z,.1,.14,.1,[0xffe27a,0xff8a6a,0x9ae0ff,0xfff4d0,0xa8f08a][i%5]]);
      if(i<n){ const v=(i+1)/n; strich(g,[x,y,z],[a[0]+(b[0]-a[0])*v,2.75-Math.sin(v*Math.PI)*.65,a[1]+(b[1]-a[1])*v],.018,0x2a2430); } } };
  [-1,1].forEach(s=>{ const x=s*(RX-.3), Z=[-13.4,-4.5,4.5,13.4];
    Z.forEach(z=>walze(g,.07,2.0,0x4a3a30,x,1.8,z));
    for(let i=0;i<3;i++) kette([x,Z[i]],[x,Z[i+1]],13); });
  ohneSchatten(g); verschmelze(g);
  const kugel=new THREE.SphereGeometry(1,8,6); lichtpunkte(sc,kugel,P);
}
function bank(k,g,x,z,dreh){
  const b=gruppe(g,x,0,z); b.rotation.y=dreh||0;
  [.19,-.19].forEach(v=>box(b,2.3,.12,.32,0xc08a54,0,.62,v)); [.95,1.3].forEach(y=>box(b,2.3,.22,.1,0xa8743e,0,y,-.42));
  [-1,1].forEach(a=>{ box(b,.14,.58,.7,FW.EISEN,a*1.0,.29,0); box(b,.1,.9,.1,FW.EISEN,a*1.0,1.0,-.42); });
}
function ausstattung(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  schornstein(k,g,-16.2,-10.6,2.2,1.5); schornstein(k,g,16.3,-5.6,1.8,1.1); schornstein(k,g,16,11,2.1,1.4); schornstein(k,g,-16.5,3.2,1.5,.9);
  bogenrohr(k,g,16.4,-1.2,Math.PI,1.1); bogenrohr(k,g,16.5,.4,Math.PI,.75); bogenrohr(k,g,-16.6,-6.6,0,.9); bogenrohr(k,g,10,-12.1,.5,.8); bogenrohr(k,g,-9,12,-.6,1.0); bogenrohr(k,g,-7.9,12.2,2.2,.65);
  /* flache Leitungen am Rand */
  [[-17.4,-8.8],[17.4,-3]].forEach(([x,z])=>{ box(g,.22,.2,3.2,0x9aa2ac,x,.1,z); });
  box(g,5.2,.18,.2,0x9aa2ac,13.2,.09,-12.7); [11,13,15].forEach(x=>box(g,.16,.24,.34,0x6a727c,x,.12,-12.7));
  lampe(k,g,-8.7,-12); lampe(k,g,2.8,-12.1); lampe(k,g,16.6,5.6); lampe(k,g,-6,10.8); lampe(k,g,10,10.8);
  /* Sitzecke vorn: Bänke, Tisch mit Thermoskanne und Bechern, ein Helm */
  bank(k,g,-1.9,11.3,Math.PI); k.kasten(-1.9,11.3,2.4,.95);
  bank(k,g,4.6,11.3,Math.PI); k.kasten(4.6,11.3,2.4,.95);
  walze(g,.75,.1,0xc08a54,1.35,.86,11.2); walze(g,.1,.84,FW.EISEN,1.35,.42,11.2); walze(g,.4,.08,FW.EISEN,1.35,.04,11.2); k.kreis(1.35,11.2,.8);
  walze(g,.15,.55,0x2f68c0,1.2,1.18,11.1); walze(g,.1,.12,FW.METALL,1.2,1.51,11.1); [[1.65,11.35],[1.6,10.9]].forEach(([x,z])=>{ walze(g,.1,.18,FW.WEISS,x,1.0,z); ring(g,.07,.022,FW.WEISS,x+.11,1.0,z); });
  FW.helm(g,-2.6,.69,11.3,FW.GELB,1,2.8);
  /* Holzkisten */
  const kiste=(x,y,z,s,d)=>{ const c=gruppe(g,x,y,z); c.rotation.y=d; box(c,s,s*.8,s,0xb8844a,0,s*.4,0); [-1,1].forEach(a=>{ box(c,s+.04,.09,s+.04,0x8a5c2e,0,s*.4+a*s*.32,0); }); };
  kiste(16.4,0,-11.6,1.2,.2); kiste(15,0,-11.9,.9,-.3); kiste(16.3,.97,-11.6,.75,.5); k.kasten(15.8,-11.7,2.6,1.4);
  /* Taubenhaus auf einem Pfahl */
  walze(g,.12,1.7,0x6a4020,16.2,.85,-8.6); box(g,1.2,.85,.9,0xe8d4b0,16.2,2.12,-8.6);
  [-1,1].forEach(a=>{ const d=box(g,.9,.1,1.1,0x5a6a9a,16.2+a*.36,2.75,-8.6); d.rotation.z=-a*.65; });
  { const l=walze(g,.17,.04,0x3a2418,16.2,2.14,-8.14); l.rotation.x=Math.PI/2; box(g,.42,.06,.2,0x6a4020,16.2,1.9,-8.07); }
  k.kreis(16.2,-8.6,.65);
  leicht(g); verschmelze(g);
  treppenhaus(k);
  lichterkette(k);
  /* Moospolster und kleine Steine im Kies */
  const S=[];
  for(let i=0;i<260;i++){ const x=-17.7+zufall()*35.4, z=-12.9+zufall()*25.8; if(Math.abs(x-EX)<1.6) continue; const s=.04+zufall()*.07; S.push([x,s*.3,z,s,s*.6,s*.85,[0xc4b4a8,0x6e6068,0xa88a7a,0x7a8a4a][i%4],i]); }
  for(let i=0;i<70;i++){ const a=zufall()*35-17.5, z=(i%2?1:-1)*(13.05+zufall()*.2); if(Math.abs(a-EX)<2.4) continue; S.push([a,.04,z,.18+zufall()*.2,.06,.12,[0x6a8a3a,0x85a048][i%2],0]); }
  FW.viele(sc,GEO.sph,S);
}

/* ---------- Tauben: laufend, pickend und auf der Brüstung ---------- */
function taube(k,x,y,z,dreh,phase){
  const t=FW.taube(k.scene,x,y,z,dreh); t.g.scale.setScalar(1.15);
  const r=gruppe(t.g,0,0,0); t.g.children.filter(c=>c.isMesh).forEach(m=>r.add(m)); leicht(t.g); verschmelze(r); verschmelze(t.kopf); ohneSchatten(t.kopf);
  k.anim.push(s=>{ const p=Math.max(0,Math.sin(s*1.3+phase))*Math.max(0,Math.sin(s*9+phase)); t.kopf.position.set(.18+p*.08,.34-p*.22,0); t.kopf.rotation.z=-p*.9; });
  return t;
}
function tauben(k){
  [[[-6.9,3.4],[-5.8,5.2],[-7.2,5.6]],[[1.2,-2.8],[3.4,-2.2],[2.4,-4.4]],[[9.4,7.8],[7.2,8.6],[8.8,9.4]]].forEach((w,i)=>{
    const a=taube(k,w[0][0],0,w[0][1],0,i*2); laeufer(k,a.g,w,.45+i*.07,i*1.3,8);
    const b=taube(k,w[0][0],0,w[0][1],0,i*2+1.7); laeufer(k,b.g,w,.45+i*.07,i*1.3+2.2,8); });
  taube(k,-6.6,0,-6.8,-.3,3.1);
  [[-10.4,-13.6,-1.6,.9],[1.8,-13.6,-1.2,4],[15,-13.6,-2,5]].forEach(([x,z,d,p])=>taube(k,x,.95,z,d,p));
  taube(k,16.2,2.94,-8.6,-1.2,1);
}

/* ---------- Gegenstände ---------- */
function windsack(g,k){
  const MX=-.75;
  walze(g,.52,.3,FW.BETON,MX,.15,0); walze(g,.32,.14,FW.STEIN2,MX,.36,0);
  walze(g,.11,3.7,0xd4dae2,MX,2.0,0); [.7,1.4].forEach(y=>walze(g,.14,.12,FW.ROT,MX,y,0));
  ball(g,.17,FW.GOLD,MX,3.95,0);
  [-.45,.45].forEach(z=>{ strich(g,[MX,1.9,0],[.95,.06,z],.022,FW.EISEN); box(g,.3,.14,.26,FW.BETON,.95,.07,z); });
  const s=gruppe(g,MX,3.45,0); s.userData.lebendig=true;
  strich(s,[0,.3,0],[.28,.56,0],.03,FW.EISEN); strich(s,[0,-.3,0],[.28,-.56,0],.03,FW.EISEN);
  const reif=ring(s,.58,.06,FW.EISEN,.28,0,0); reif.rotation.y=Math.PI/2;
  const glieder=[]; let eltern=gruppe(s,.28,0,0);
  for(let i=0;i<5;i++){ const l=.56, r1=.57-i*.075, r2=r1-.075;
    const m=rohr(eltern,r2,r1,l,i%2?FW.WEISS:0xff6a14,l/2,0,0,18,true); m.rotation.z=-Math.PI/2;
    glieder.push(eltern); if(i<4) eltern=gruppe(eltern,l,0,0); }
  const innen=walze(glieder[0],.5,.03,0x8a3008,.05,0,0); innen.rotation.z=Math.PI/2;
  k.anim.push(t=>{ s.rotation.y=Math.sin(t*.6)*.35+Math.sin(t*1.7)*.08; glieder.forEach((a,i)=>{ a.rotation.z=(i?-.035:-.05)+Math.sin(t*3.2-i*.9)*.07; a.rotation.y=Math.sin(t*2.3-i*.8)*.06; }); });
}
function funkmast(g,k){
  const C=0xe8ecf0, R=FW.ROT;
  box(g,2.1,.24,1.9,FW.BETON,0,.12,0);
  const fuss=[[-.75,.55],[.75,.55],[0,-.7]], y0=.24, y1=4.5;
  const p=(i,u)=>[fuss[i][0]*(1-u*.82),y0+(y1-y0)*u,fuss[i][1]*(1-u*.82)];
  for(let i=0;i<3;i++) for(let j=0;j<5;j++){ const u=j/5, v=(j+1)/5; strich(g,p(i,u),p(i,v),.065,j%2?C:R); strich(g,p(i,v),p((i+1)%3,v),.035,C); strich(g,p(i,u),p((i+1)%3,v),.028,C); }
  walze(g,.06,.9,C,0,4.9,0);
  /* zwei Schüsseln nach vorn und Stab-Antennen an den Seiten */
  [[-.45,2.9,.5,.52],[.4,3.65,.4,.36]].forEach(([x,y,z,r])=>{ const s=gruppe(g,x,y,z); s.rotation.x=-.2; s.rotation.y=x*.6;
    const sch=walze(s,r,.12,0xf4f4f8,0,0,0); sch.rotation.x=Math.PI/2; ring(s,r,.05,0x7a828c,0,0,.07); const m=walze(s,r*.55,.04,0xc4ccd6,0,0,.07); m.rotation.x=Math.PI/2;
    strich(s,[0,-r*.8,.08],[0,0,.46],.025,FW.EISEN); ball(s,.09,R,0,0,.48); strich(s,[0,0,-.06],[-x*.7,0,-.4],.05,FW.EISEN); });
  [-1,1].forEach(a=>{ strich(g,[0,4.35,0],[a*1.0,4.35,0],.045,C); box(g,.18,.85,.14,0xb8c0ca,a*1.0,4.45,0); strich(g,[0,1.9,0],[a*.85,1.9,.1],.04,C); walze(g,.035,.8,C,a*.85,2.25,.1); ball(g,.06,R,a*.85,2.68,.1); });
  /* Schaltkasten */
  box(g,.75,.85,.42,0x8a949e,.2,.66,.72); box(g,.55,.06,.03,FW.EISEN,.2,.9,.945); box(g,.55,.06,.03,FW.EISEN,.2,.76,.945); ball(g,.06,leuchten().gruen,.4,.5,.94);
  strich(g,[.55,.35,.7],[.62,.25,0],.04,FW.SCHWARZ);
  const lm=leuchten().rot;
  const l=ball(g,.19,lm,0,5.45,0); l.userData.lebendig=true; const hof=schein(g,'rgba(255,80,50,.85)',0,5.45,.05,1.5); hof.userData.lebendig=true;
  k.anim.push(t=>{ const an=Math.sin(t*3)>-.2; hof.visible=an; l.scale.setScalar(an?.19:.13); });
}
function steuerpult(g,k){
  const BL=0x4a6a86, BL2=0x2a4258;
  box(g,1.7,.16,1.15,FW.EISEN,0,.08,0);
  box(g,.7,1.0,.55,BL2,0,.66,-.05); box(g,.74,.1,.59,FW.GELB,0,.4,-.05);
  const o=gruppe(g,0,1.36,0); o.rotation.x=.52;
  box(o,2.2,.34,1.3,BL,0,0,0); box(o,2.26,.1,1.36,FW.GELB,0,-.12,0); box(o,2.0,.03,1.12,0xd4dae2,0,.18,0);
  /* drei Hebel mit bunten Knäufen */
  [[-.72,FW.ROT],[-.34,FW.GRUEN],[.04,FW.GELB]].forEach(([x,c],i)=>{ box(o,.12,.04,.6,FW.SCHWARZ,x,.2,.05); const h=gruppe(o,x,.2,.05); h.userData.lebendig=true; walze(h,.04,.5,FW.EISEN,0,.24,0); ball(h,.13,c,0,.52,0); verschmelze(h); k.anim.push(t=>{ h.rotation.x=Math.sin(t*.8+i*2)*.14; }); });
  [[.48,-.28,FW.ROT],[.8,-.28,FW.BLAU],[.48,.06,FW.GRUEN],[.8,.06,FW.ORANGE]].forEach(([x,z,c])=>{ walze(o,.13,.06,FW.EISEN,x,.21,z); walze(o,.095,.1,c,x,.24,z); });
  [-.8,-.52,-.24,.04].forEach((x,i)=>ball(o,.055,i%2?leuchten().gruen:leuchten().warm,x,.2,.46));
  /* roter Nothalt-Knopf */
  walze(o,.19,.07,FW.GELB,.66,.22,.4); ball(o,.13,FW.ROT,.66,.29,.4,1,.65,1);
  /* Bildschirm mit Leiter-Zeichnung */
  const tex=bild(256,192,c=>{ c.fillStyle='#0c2436'; c.fillRect(0,0,256,192); c.strokeStyle='#2a5a72'; c.lineWidth=2; for(let i=1;i<8;i++){ c.beginPath(); c.moveTo(i*32,0); c.lineTo(i*32,192); c.moveTo(0,i*32); c.lineTo(256,i*32); c.stroke(); }
    c.fillStyle='#ff5a40'; c.fillRect(24,140,90,26); c.fillStyle='#d0d8e0'; [44,94].forEach(x=>{ c.beginPath(); c.arc(x,170,11,0,7); c.fill(); });
    c.strokeStyle='#6af0a0'; c.lineWidth=6; c.beginPath(); c.moveTo(60,134); c.lineTo(200,38); c.moveTo(74,148); c.lineTo(214,52); c.stroke(); c.lineWidth=4; for(let i=0;i<9;i++){ const u=i/9; c.beginPath(); c.moveTo(60+140*u,134-96*u); c.lineTo(74+140*u,148-96*u); c.stroke(); }
    c.fillStyle='#ffd21e'; c.fillRect(196,22,40,28); });
  const rahmen=gruppe(g,0,2.18,-.62); box(rahmen,1.3,.98,.14,BL2,0,0,0); bildFlaeche(rahmen,1.14,.84,tex,0,0,.08); walze(g,.07,.55,FW.EISEN,0,1.6,-.62);
  /* Funkantenne und Kabelrolle */
  walze(g,.025,1.0,FW.EISEN,-.9,1.95,-.4); ball(g,.07,FW.ROT,-.9,2.47,-.4);
  [-.07,.07].forEach(d=>{ const r=ring(g,.32,.07,FW.SCHWARZ,1.05,.4,d-.1); r.rotation.y=.3; }); const n=walze(g,.12,.3,FW.ORANGE,1.05,.4,-.1); n.rotation.x=Math.PI/2; box(g,.3,.12,.3,FW.EISEN,1.05,.06,-.1);
}
function seilsack(eltern){
  const g=gruppe(eltern,-.3,0,-.15);
  const R1=FW.ROT, R2=FW.ROT2, S=0xffd860, S2=0xd8a828;
  /* bauchiger Stoffsack mit eingeschnürtem Hals und Kordel */
  ball(g,.82,R1,-.25,.5,0,1.06,.64,1); ball(g,.68,R1,-.22,.86,0,1,.72,.96); rohr(g,.42,.56,.34,R1,-.25,1.2,0,14);
  { const kordel=ring(g,.43,.05,FW.GELB,-.25,1.32,0); kordel.rotation.x=Math.PI/2; }
  strich(g,[-.05,1.3,.42],[.08,.95,.72],.03,FW.GELB); ball(g,.07,FW.GELB,.08,.93,.73);
  [[-.7,.95,.42,.5],[.22,.8,.6,-.4],[-.5,.45,.74,-.6]].forEach(([x,y,z,n])=>{ const f=box(g,.06,.5,.04,R2,x,y,z); f.rotation.z=n; });
  ball(g,.4,0x5a1410,-.25,1.37,0,1,.14,1);
  /* Seil quillt oben locker heraus */
  [[-.12,1.42,.05,.2,.25],[.12,1.45,-.06,.18,-.3],[0,1.55,.02,.17,.1]].forEach(([x,y,z,rr,n],i)=>{ const t=ring(g,rr,.075,i%2?S2:S,-.25+x,y,z); t.rotation.x=Math.PI/2+n; t.rotation.y=n; });
  /* flacher Gurt quer über die Vorderseite */
  strich(g,[-.95,.95,.42],[-.25,.72,.84],.045,FW.SCHWARZ); strich(g,[-.25,.72,.84],[.45,.95,.42],.045,FW.SCHWARZ); ball(g,.08,FW.GOLD,-.25,.72,.87);
  /* daneben eine liegende Seilrolle mit Haken-Ring (Karabiner) */
  [[.46,.09],[.34,.12],[.22,.16]].forEach(([rr,y],i)=>{ const t=ring(g,rr,.085,i%2?S2:S,1.3,y,-.05); t.rotation.x=Math.PI/2; });
  const kb=ring(g,.13,.045,0xd4dae2,1.15,.1,.5); kb.rotation.x=Math.PI/2; kb.scale.y=1.5;
}
function luefter(g,k){
  const M=0xb4bec8, M2=0x6a747e;
  box(g,2.35,.22,1.5,FW.EISEN,0,.11,0);
  box(g,2.15,1.65,1.3,M,0,1.05,0);
  [-1,1].forEach(a=>{ for(let i=0;i<6;i++) box(g,.05,.1,1.0,M2,a*1.09,.55+i*.2,0); });
  box(g,2.35,.16,1.5,M2,0,1.94,0);
  /* große runde Öffnung mit Flügelrad vorn */
  const loch=walze(g,.72,.05,0x242830,0,1.05,.66); loch.rotation.x=Math.PI/2;
  ring(g,.74,.08,FW.GELB,0,1.05,.7);
  const rad=gruppe(g,0,1.05,.72); rad.userData.lebendig=true;
  for(let i=0;i<5;i++){ const a=gruppe(rad,0,0,0); a.rotation.z=i*Math.PI*2/5; const f=ball(a,.36,0xe8eef4,.08,.34,0,.62,1,.12); f.rotation.z=-.35; }
  const nabe=walze(rad,.17,.12,FW.ROT,0,0,.03); nabe.rotation.x=Math.PI/2; verschmelze(rad);
  [.38,.62].forEach(r=>ring(g,r,.015,FW.EISEN,0,1.05,.85)); [0,Math.PI/2,Math.PI/4,-Math.PI/4].forEach(a=>{ const s=box(g,1.46,.028,.028,FW.EISEN,0,1.05,.855); s.rotation.z=a; });
  [-1,1].forEach(a=>[-1,1].forEach(b=>ball(g,.06,FW.EISEN,a*.92,1.05+b*.7,.66)));
  /* kleines Bogenrohr oben */
  walze(g,.16,.34,M2,.45,2.18,0); ball(g,.2,M,.45,2.38,0); { const b=walze(g,.16,.34,M,.45,2.38,.18); b.rotation.x=Math.PI/2; }
  const rohrR=walze(g,.2,.5,M2,-.65,2.2,0); ball(g,.27,M,-.65,2.5,0,1,.6,1);
  k.anim.push(t=>{ rad.rotation.z=-t*3.2; });
}
function hoehentafel(g){
  [-1.55,1.55].forEach(x=>{ box(g,.2,3.1,.2,FW.EISEN,x,1.55,-.06); box(g,.6,.14,.8,FW.BETON,x,.07,0); ball(g,.16,FW.ROT,x,3.2,-.06); });
  box(g,3.25,2.4,.14,FW.ROT,0,1.85,-.02);
  const t=bild(512,376,c=>{
    c.fillStyle='#fffaf0'; c.fillRect(0,0,512,376);
    c.fillStyle='#8ac060'; c.fillRect(0,336,512,40);
    /* Haus mit Stockwerken */
    c.fillStyle='#d8704a'; c.fillRect(300,96,150,240); c.fillStyle='#7a3a30'; c.beginPath(); c.moveTo(286,98); c.lineTo(375,34); c.lineTo(464,98); c.fill();
    c.fillStyle='#ffe28a'; for(let r=0;r<4;r++) for(let s=0;s<3;s++) c.fillRect(317+s*44,112+r*56,28,32);
    /* Löschfahrzeug mit ausgefahrener Leiter */
    c.fillStyle='#d0261c'; c.fillRect(48,284,120,38); c.fillRect(138,262,42,40); c.fillStyle='#9ad0f0'; c.fillRect(154,268,20,16);
    c.fillStyle='#2a2a30'; [76,152].forEach(x=>{ c.beginPath(); c.arc(x,324,15,0,7); c.fill(); });
    c.strokeStyle='#4a5666'; c.lineWidth=6; c.beginPath(); c.moveTo(74,274); c.lineTo(278,118); c.moveTo(88,290); c.lineTo(292,134); c.stroke();
    c.lineWidth=4; for(let i=0;i<12;i++){ const u=i/12; c.beginPath(); c.moveTo(74+204*u,274-156*u); c.lineTo(88+204*u,290-156*u); c.stroke(); }
    c.strokeStyle='#d0261c'; c.lineWidth=6; c.strokeRect(272,106,30,26);
    /* Höhenlineal mit Strichen und Pfeil */
    c.strokeStyle='#223a5a'; c.lineWidth=6; c.beginPath(); c.moveTo(482,336); c.lineTo(482,40); c.stroke();
    for(let i=0;i<=10;i++){ c.lineWidth=i%5?3:7; c.beginPath(); c.moveTo(i%5?470:458,336-i*28); c.lineTo(482,336-i*28); c.stroke(); }
    c.fillStyle='#223a5a'; c.beginPath(); c.moveTo(466,52); c.lineTo(482,18); c.lineTo(498,52); c.fill();
    c.strokeStyle='#f07a1e'; c.lineWidth=4; c.setLineDash([14,10]); [112,224].forEach(y=>{ c.beginPath(); c.moveTo(196,y); c.lineTo(456,y); c.stroke(); }); c.setLineDash([]);
    /* Baum und Mensch zum Vergleich */
    c.fillStyle='#6e4a2a'; c.fillRect(34,196,14,60); c.fillStyle='#4f9038'; c.beginPath(); c.arc(41,180,34,0,7); c.fill();
    c.fillStyle='#2a3a5a'; c.beginPath(); c.arc(236,288,10,0,7); c.fill(); c.fillRect(228,299,16,24); c.fillRect(229,322,5,15); c.fillRect(238,322,5,15);
  });
  bildFlaeche(g,2.95,2.16,t,0,1.85,.062);
  [[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([a,b])=>ball(g,.06,FW.GOLD,a*1.54,1.85+b*1.13,.07));
  box(g,3.55,.12,.45,FW.EISEN,0,3.14,0);
}
function solarplatte(g){
  const tex=bild(256,192,c=>{ c.fillStyle='#d4dce8'; c.fillRect(0,0,256,192); for(let r=0;r<4;r++) for(let s=0;s<4;s++){ const v=c.createLinearGradient(s*63,r*47,s*63+60,r*47+44); v.addColorStop(0,'#16306a'); v.addColorStop(.55,'#2a5aa8'); v.addColorStop(1,'#1a3878'); c.fillStyle=v; c.fillRect(s*63+4,r*47+4,59,43); c.fillStyle='rgba(200,224,255,.35)'; c.fillRect(s*63+23,r*47+4,2,43); c.fillRect(s*63+43,r*47+4,2,43); }
    c.fillStyle='rgba(255,190,140,.22)'; c.beginPath(); c.moveTo(20,192); c.lineTo(110,0); c.lineTo(150,0); c.lineTo(60,192); c.fill(); });
  [-1.05,1.05].forEach(x=>{ const p=gruppe(g,x,1.1,0); p.rotation.x=.82; box(p,1.98,1.9,.1,0xd4dce8,0,0,-.02); bildFlaeche(p,1.86,1.78,tex,0,0,.045);
    /* Gestell: vorn niedrig, hinten hoch */
    [-.75,.75].forEach(a=>{ strich(g,[x+a,0,.62],[x+a,.5,.62],.065,FW.EISEN); strich(g,[x+a,0,-.62],[x+a,1.7,-.62],.065,FW.EISEN); strich(g,[x+a,.1,.62],[x+a,.1,-.62],.05,FW.EISEN); }); });
  strich(g,[-1.8,.9,-.62],[1.8,.9,-.62],.045,FW.EISEN);
  box(g,.55,.45,.3,0xe8ecf0,0,.34,-.4); ball(g,.06,leuchten().gruen,.12,.42,-.23); strich(g,[0,.15,-.4],[0,.05,.5],.035,FW.SCHWARZ);
  [-2.0,2.0].forEach(x=>box(g,.3,.14,1.5,FW.BETON,x*.9,.07,0));
}
function dachbeet(eltern,k){
  const g=gruppe(eltern,-.35,0,0);
  [.22,.52,.82].forEach((y,i)=>{ box(g,3.5,.27,1.7,i%2?0xa8743e:0xc08a54,0,y,0); });
  [-1,1].forEach(a=>[-1,1].forEach(b=>{ box(g,.2,1.14,.2,0x74502a,a*1.74,.57,b*.84); ball(g,.12,0x74502a,a*1.74,1.18,b*.84); }));
  box(g,3.25,.1,1.45,0x4a2e1c,0,.98,0);
  /* Blumen: Tulpen, Margeriten, Sonnenblumen */
  const F=[0xe83a2a,0xffd21e,0xfff8f0,0xe85a9a,0x9a6ae0], S=[], K=[];
  for(let i=0;i<15;i++){ const x=-1.45+(i%8)*.41+(i>7?.2:0), z=i>7?.38:-.12, h=.36+((i*5)%4)*.09, c=F[i%5];
    S.push([x,1.0+h/2,z,.025,h,.025,0x3a8a2a]); S.push([x+.1,1.12,z,.12,.035,.06,0x5aaa38]); S.push([x-.09,1.2,z+.03,.11,.035,.06,0x4a9a30]);
    for(let j=0;j<6;j++){ const a=j*1.047; K.push([x+Math.cos(a)*.1,1.02+h+Math.sin(a)*.1,z+.02,.075,.075,.05,c]); } K.push([x,1.02+h,z+.06,.065,.065,.05,0xf0a020]); }
  for(let i=0;i<70;i++) S.push([-1.5+zufall()*3,1.06,-.6+zufall()*1.25,.1+zufall()*.08,.07,.09,[0x4f9038,0x6cae42,0x367030][i%3]]);
  FW.viele(g,GEO.box,S.filter(e=>e[3]<.03)); FW.viele(g,GEO.sph,S.filter(e=>e[3]>=.03)); FW.viele(g,GEO.sph,K);
  [-1.2,.15,1.3].forEach((x,i)=>{ const h=1.0+(i%2)*.25; walze(g,.035,h,0x3a8a2a,x,1.0+h/2,-.55); ball(g,.17,0x5aaa38,x+.16,1.4,-.55,1.3,.4,.7);
    for(let j=0;j<10;j++){ const a=j*.628; ball(g,.1,FW.GELB,x+Math.cos(a)*.23,1.05+h+Math.sin(a)*.23,-.52,1,1,.4); } ball(g,.17,0x6a3a14,x,1.05+h,-.47,1,1,.5); });
  /* Gießkanne mit runder Brause */
  const kn=gruppe(g,2.35,0,-.2); kn.rotation.y=-Math.PI/2; walze(kn,.34,.58,FW.BLAU,0,.31,0); walze(kn,.36,.07,0x7ab0f0,0,.6,0); const h=ring(kn,.26,.045,0x7ab0f0,0,.68,0,Math.PI); h.rotation.y=.2;
  strich(kn,[.26,.24,0],[.72,.68,0],.07,FW.BLAU); const br=walze(kn,.15,.1,0x7ab0f0,.76,.72,0); br.rotation.z=-.8;
  /* Schmetterling */
  const s=gruppe(g,0,2.2,0); s.userData.lebendig=true; walze(s,.025,.2,FW.SCHWARZ,0,0,0).rotation.x=Math.PI/2;
  const fl=[-1,1].map(a=>{ const f=gruppe(s,0,0,0); ball(f,.13,FW.ORANGE,a*.13,0,-.04,1,.12,.85); ball(f,.085,FW.GELB,a*.09,0,.09,1,.14,.9); verschmelze(f); return f; });
  k.anim.push(t=>{ s.position.set(Math.sin(t*.7)*1.3,2.25+Math.sin(t*1.9)*.25,Math.cos(t*1.1)*.4); s.rotation.y=Math.cos(t*.7)>0?Math.PI*.7:-Math.PI*.7; const w=Math.sin(t*13)*.8; fl[0].rotation.z=-w; fl[1].rotation.z=w; });
}
function sirene(g,k){
  const R1=FW.ROT, R2=FW.ROT2;
  walze(g,.58,.22,FW.BETON,0,.11,0); walze(g,.32,.12,FW.EISEN,0,.28,0);
  walze(g,.13,2.4,0xb8c0ca,0,1.4,0); [.6,.95].forEach(y=>walze(g,.16,.16,FW.GELB,0,y,0));
  /* Schaltkasten am Pfosten */
  box(g,.52,.62,.28,R1,0,1.55,.2); box(g,.36,.06,.03,FW.WEISS,0,1.7,.35); ball(g,.07,FW.GELB,0,1.46,.34);
  /* Pilz-Sirene: Teller, Lamellen-Trommel, breiter Hut */
  walze(g,.4,.18,FW.EISEN,0,2.62,0); walze(g,.82,.12,R2,0,2.76,0);
  walze(g,.46,.62,0x2a2a30,0,3.12,0);
  for(let i=0;i<14;i++){ const a=i*Math.PI/7, s=box(g,.09,.64,.26,0xe4e8ee,Math.cos(a)*.62,3.12,Math.sin(a)*.62); s.rotation.y=-a+.35; }
  walze(g,.86,.1,R2,0,3.47,0);
  rohr(g,.32,1.05,.4,R1,0,3.72,0,24); ball(g,.33,R1,0,3.9,0,1,.55,1); ball(g,.1,FW.GOLD,0,4.12,0);
  [-1,1].forEach(a=>strich(g,[a*.1,2.0,0],[a*.55,2.7,0],.045,FW.EISEN));
  /* leise Schallringe */
  const wm=basis(0xfff0c0,{transparent:true,opacity:.5,depthWrite:false});
  const wellen=[0,1].map(i=>{ const r=ring(g,1,.018,wm.clone(),0,3.12,0); r.rotation.x=Math.PI/2; r.castShadow=false; r.userData.lebendig=true; return r; });
  k.anim.push(t=>wellen.forEach((r,i)=>{ const u=(t*.45+i*.5)%1; r.scale.setScalar(.9+u*.8); r.material.opacity=.55*(1-u); }));
}
function fernrohr(g){
  const MG=0xe8b830, MG2=0xa87818, BL=0x24508a;
  /* Stativ aus Holz */
  [[-.95,.5],[.95,.5],[0,-.85]].forEach(([x,z])=>{ strich(g,[x,.04,z],[0,1.55,0],.08,0x8a5a2a); ball(g,.12,FW.EISEN,x,.07,z,1,.6,1); strich(g,[x*.55,.7,z*.55],[0,.7,0],.03,FW.EISEN); });
  walze(g,.22,.2,BL,0,1.55,0); walze(g,.07,.4,FW.EISEN,0,1.8,0); ball(g,.17,BL,0,2.0,0);
  /* Rohr schräg nach oben zum Himmel, von der Seite gesehen */
  const r=gruppe(g,0,2.14,0); r.rotation.z=.45; r.rotation.y=.12;
  const t=(r1,r2,l,c,x)=>{ const m=rohr(r,r1,r2,l,c,x,0,0,22); m.rotation.z=-Math.PI/2; return m; };
  t(.27,.23,1.0,MG,.05); t(.38,.33,.55,MG,.8); t(.4,.4,.14,BL,1.12); t(.29,.29,.12,BL,.52); t(.26,.26,.1,BL,-.3); t(.19,.19,.5,MG2,-.7); t(.13,.13,.24,FW.EISEN,-1.02); t(.17,.17,.09,BL,-1.17);
  const li=walze(r,.32,.03,leuchten().linse,1.2,0,0); li.rotation.z=-Math.PI/2;
  const gl=ball(r,.08,FW.WEISS,1.23,.12,.1,.25,1,1);
  /* kleines Sucherrohr, Drehknopf und Stern-Zeichen */
  walze(r,.08,.55,BL,0,.42,0).rotation.z=Math.PI/2; [-.18,.18].forEach(x=>box(r,.06,.2,.06,MG2,x,.3,0));
  walze(r,.13,.1,FW.ROT,-.05,-.05,.3).rotation.x=Math.PI/2;
  /* Tritthocker */
  box(g,.65,.1,.45,0xc08a54,-.7,.42,.65); [-1,1].forEach(a=>box(g,.1,.4,.38,0x74502a,-.7+a*.24,.2,.65));
}

function baue(k){
  LM=null;
  FW.freiluft(k,{ boden:false, himmelLicht:0xffdcc4, grund:0x74607a, staerke:.78, sonne:0xffb878, sonneStaerke:.55 });
  himmel(k);
  stadtUnten(k);
  dach(k);
  const tuer=korbAusgang(k);
  ausstattung(k);
  tauben(k);
  [[EX+2.3,3.0,-12.4,.45,8],[-10.5,2.8,6.5,.3,7],[10.5,2.8,-5,.3,7]].forEach(([x,y,z,s,w])=>flacker(k,x,y,z,0xffc070,s,w));
  return { tuer, start:[-1.4,-.2] };
}
const verstecke=[[-14.5,-8],[-9,-8.6],[-1.4,-11.6],[3.6,-6.2],[9,-8.8],[14.6,-7.4],[14.6,-2.4],[10.4,.4],[15.4,7.8],[12.6,11.6],[7.4,9.6],[1,8.6],[-3.6,8.4],[-11,10.4],[-15.8,6.2],[-14.4,1.4],[-11.6,-5.6],[-1.8,-4.8],[4.6,.2],[-5.4,1.8]];
const gegenstaende=[
  { x:-12.4, z:-10.4, steh:[-12.2,-8.4], kasten:[2.7,1.3], treffer:[4,4.3,1.6], baue:windsack },
  { x:12.8, z:-9.8, dreh:-.15, steh:[11.6,-7.4], kasten:[2.3,2], treffer:[2.4,4.4,1.8], baue:funkmast },
  { x:1, z:-8.6, steh:[1,-6.7], kasten:[2.7,1.5], treffer:[2.7,2.8,1.6], baue:steuerpult },
  { x:-8.4, z:-2.8, steh:[-8.2,-.8], kasten:[3.2,1.9], treffer:[3.2,1.95,2], baue:seilsack },
  { x:8, z:-3.2, dreh:-.12, steh:[7.8,-1.1], kasten:[2.5,1.7], treffer:[2.5,3.2,1.7], baue:luefter },
  { x:6.2, z:-11.2, steh:[6.2,-9.2], kasten:[3.7,.9], treffer:[3.7,3.4,.9], baue:hoehentafel },
  { x:12.6, z:3.2, dreh:-.12, steh:[12.2,5.5], kasten:[4.3,2], treffer:[4.4,2.1,1.9], baue:solarplatte },
  { x:-10.8, z:4.6, steh:[-10.6,6.7], kasten:[4.8,2], treffer:[4.4,2.7,2], baue:dachbeet },
  { x:-13.8, z:-2.6, steh:[-13.4,-.6], r:.75, treffer:[2.1,4.3,2.1], baue:sirene },
  { x:3.2, z:2.5, steh:[3.2,4.6], r:1.25, treffer:[2.8,2.95,1.8], baue:fernrohr }
];
return { titel:'Das Dach mit der Drehleiter', himmel:HIMMEL, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Schlussbild Feuerwache: Abendrot über der Stadt. Die Spielfigur steht im Korb der Drehleiter und fährt vom Dachrand
   der Feuerwache hoch über die Dächer (Leiter fährt aus und schwenkt sanft). In der Stadt gehen nach und nach die
   Fensterlichter an, das Löschfahrzeug kommt mit Blaulicht zurück und hält, die Einsatzkräfte winken, Tauben fliegen,
   Sterne und Konfetti. Ohne Schrift. */
FINALE3D.feuerwache = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  const DUNST=0xf0a07c;
  sc.background=new THREE.Color(DUNST);
  sc.fog=new THREE.Fog(DUNST,32,105);
  FW.freiluft(k,{ himmelLicht:0xffe2d4, grund:0x4c4660, staerke:.74, sonne:0xffb878, sonneStaerke:.46, bodenFarbe:'#5c6a52', punkte:['rgba(150,160,110,.4)','rgba(40,44,50,.4)','rgba(150,110,80,.25)'] });
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D(), FARBE=new THREE.Color();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const BUNT=[0xff4f6e,0xffd21e,0x2fb4ff,0x3fd07a,0xb264ec,0xff8a30];
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };

  /* ---------- Abendhimmel: Verlauf, tiefe Sonne, Wolken, Sterne ---------- */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#1c2056'); v.addColorStop(.31,'#34367a'); v.addColorStop(.39,'#7a5694'); v.addColorStop(.44,'#e07080'); v.addColorStop(.475,'#ff9c66'); v.addColorStop(.5,'#ffc474'); v.addColorStop(.53,'#f0a07c'); v.addColorStop(1,'#f0a07c'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(116,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(1,32),basis(0xffe690,{fog:false})); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,160,70,.8)',0,0,0,18); sonnenSchein.material.fog=false;
  const wolkeHell=basis(0xffb49c,{fog:false}), wolkeLila=basis(0xa86898,{fog:false});
  /* [Bildplatz x, Bildplatz y, Größe] */
  const wolken=[[-.84,.78,.8],[.12,.66,.45],[.7,.74,.75]].map(p=>{ const g=gruppe(sc,0,0,0);
    [[-2.4,0,1.2],[-.9,.35,1.6],[.9,.2,1.4],[2.4,-.05,1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1.3,.45,.4));
    ball(g,1,wolkeLila,0,-.36,.15,4.1,.4,.4); verschmelze(g); ohneSchatten(g); return { g, p }; });
  const NS=70, sterne=menge(new THREE.OctahedronGeometry(1,0),basis(0xfff6d0,{fog:false}),NS), sd=[];
  for(let i=0;i<NS;i++) sd.push({ x:-1+2*((i*.618034)%1), y:.68+zufall()*.31, g:i%9?.0035+zufall()*.003:.012, p:zufall()*6.28, ab:2.5+zufall()*6 });
  sterne.visible=false;

  /* ---------- Straße, Hof, Gehweg ---------- */
  const grundG=gruppe(sc,0,0,0);
  box(grundG,120,.02,6.6,0x44424e,0,0,4.4);
  box(grundG,120,.08,.4,0xc8c0b4,0,.02,.95); box(grundG,120,.08,.4,0xc8c0b4,0,.02,7.9);
  for(let x=-48;x<=48;x+=3.2) box(grundG,1.5,.02,.16,0xf4f0e0,x,.02,5.7);
  box(grundG,13,.02,2.4,0xa09a90,-5.5,.006,-.3);
  box(grundG,9,.02,3.6,0x8c8890,7.8,.008,-1.2);
  verschmelze(grundG); grundG.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

  /* ---------- Stadt: Häuserreihen, Fenster gehen nach und nach an ---------- */
  const stadtG=gruppe(sc,0,0,0), fenster=[];
  /* [x1, x2, z, Höhe von, Höhe bis] */
  [[-34,34,-12,2.2,4.2],[-50,50,-22,3,6],[-66,66,-34,3.5,7.5],[-34,-16,-3.4,2,3.8],[14,34,-3.4,2,3.8]].forEach(p=>{
    const im=FW.stadt(stadtG,p[0],p[1],p[2],p[3],p[4],0)[0]; if(!im) return;
    im.material.color.set(0xffffff);
    const n=im.count|0, liste=[];
    for(let i=0;i<n;i++){ im.setColorAt(i,FARBE.set(0x4a4672)); liste.push({ i, ab:1+Math.pow(zufall(),.85)*9, c:[0xffe08a,0xffd060,0xfff0b0,0xffb45a][(i*7)%4] }); }
    liste.sort((a,b)=>a.ab-b.ab); fenster.push({ im, liste, n:0 }); });
  /* Wasserturm und Windrad in der Ferne */
  const fern=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>strich(fern,[15+v*1.6,0,-27],[15+v*.7,7,-27],.18,0x4a3a5a));
  walze(fern,1.9,2.2,0x8a5a7a,15,8,-27); kegel(fern,2.15,1.1,0x6a3040,15,9.65,-27); ring(fern,1.95,.09,0x4a3a5a,15,7,-27).rotation.x=Math.PI/2;
  strich(fern,[24,0,-28],[24,8.4,-28],.16,0xd8c8d0);
  verschmelze(fern); ohneSchatten(fern);
  const rad=gruppe(sc,24,8.4,-27.7); [0,1,2].forEach(i=>{ const f=gruppe(rad,0,0,0); f.rotation.z=i*Math.PI*2/3; box(f,.26,2.8,.08,0xf0e4e8,0,1.4,0); }); ball(rad,.28,0xd8c8d0,0,0,.1); ohneSchatten(rad);

  /* ---------- Feuerwache mit Dach ---------- */
  const WX=-5.5, WB=10.2, WH=4.6, VZ=-1.4, HZ=-7;
  const wache=gruppe(sc,0,0,0), ziegel=FW.ziegelBild([188,82,58]);
  FW.mauer(wache,ziegel,WB,WH,VZ-HZ,WX,WH/2,(VZ+HZ)/2);
  const wd=gruppe(wache,0,0,0);
  box(wd,WB+.1,.3,VZ-HZ+.1,0x8a847c,WX,.15,(VZ+HZ)/2);
  box(wd,WB+.3,.24,VZ-HZ+.3,0x6a6670,WX,WH+.1,(VZ+HZ)/2);
  /* Dachrand */
  [VZ+.08,HZ-.08].forEach(z=>{ box(wd,WB+.36,.34,.24,FW.WEISS,WX,WH+.36,z); });
  [-1,1].forEach(v=>box(wd,.24,.34,VZ-HZ+.36,FW.WEISS,WX+v*(WB/2+.06),WH+.36,(VZ+HZ)/2));
  box(wd,WB+.2,.22,.1,FW.ROT,WX,3.55,VZ+.04);
  /* zwei Tore: links offen mit warmem Licht (das Fahrzeug ist unterwegs), rechts geschlossen */
  [-8,-4.4].forEach((x,i)=>{
    box(wd,3.2,3.05,.12,FW.WEISS,x,1.52,VZ+.03);
    if(i===0){ box(wd,2.9,2.88,.06,basis(0xffd48a),x,1.45,VZ+.09); box(wd,2.9,.55,.1,FW.ROT,x,2.62,VZ+.12); [2.45,2.72].forEach(y=>box(wd,2.9,.04,.02,FW.ROT2,x,y,VZ+.18));
      [-.9,-.2].forEach(a=>{ ring(wd,.3,.07,0xd8c8a0,x+a,1.5,VZ+.14); ring(wd,.15,.05,0xb8a880,x+a,1.5,VZ+.14); }); FW.helm(wd,x+.75,1.55,VZ+.2,FW.ROT,.9); box(wd,.9,.08,.2,FW.HOLZ2,x+.75,1.5,VZ+.18); }
    else { box(wd,2.9,2.88,.08,FW.ROT,x,1.45,VZ+.1); for(let j=0;j<6;j++) box(wd,2.9,.05,.04,FW.ROT2,x,.4+j*.38,VZ+.15);
      [-.9,0,.9].forEach(a=>{ box(wd,.7,.5,.04,FW.WEISS,x+a,2.3,VZ+.16); box(wd,.58,.38,.04,basis(0xffe49a),x+a,2.3,VZ+.19); }); }
    box(wd,.16,.16,.1,basis(0xffb020),x,3.3,VZ+.12); });
  /* Fenster und Eingang rechts */
  box(wd,1.25,2.3,.1,FW.WEISS,-1.6,1.15,VZ+.04); box(wd,1.0,2.15,.08,0x2f68c0,-1.6,1.08,VZ+.1); box(wd,.6,.6,.04,basis(0xffe49a),-1.6,1.6,VZ+.15); ball(wd,.07,FW.GOLD,-1.28,1.05,VZ+.18);
  [-9.2,-7.2,-5.2,-3.2,-1.4].forEach(x=>{ box(wd,1.1,.7,.08,FW.WEISS,x,4.08,VZ+.04); box(wd,.94,.54,.06,basis(0xffd878),x,4.08,VZ+.08); box(wd,.06,.54,.04,FW.WEISS,x,4.08,VZ+.12); });
  [-5.6,-3.6].forEach(z=>[1.4,3.4].forEach(y=>{ box(wd,.1,1,1.1,FW.WEISS,-.38,y,z); box(wd,.08,.84,.94,basis(0xffd878),-.35,y,z); box(wd,.1,.84,.06,FW.WEISS,-.32,y,z); }));
  /* Dach: Sirene, Funkmast, Lüfter, Solarplatten, Windsack, Dachbeet */
  const D=WH+.22;
  walze(wd,.09,1.2,FW.METALL2,-8.8,D+.6,-4.2); walze(wd,.5,.18,FW.ROT,-8.8,D+1.22,-4.2); walze(wd,.34,.3,FW.METALL,-8.8,D+1.45,-4.2); kegel(wd,.56,.34,FW.ROT,-8.8,D+1.76,-4.2);
  strich(wd,[-6.7,D,-5.6],[-6.7,D+3.2,-5.6],.07,FW.METALL); [1.2,2,2.7].forEach((y,i)=>box(wd,1.1-i*.28,.06,.06,FW.METALL,-6.7,D+y,-5.6)); ball(wd,.13,basis(0xff5040),-6.7,D+3.3,-5.6);
  box(wd,1.3,.7,.9,FW.METALL,-4.6,D+.35,-4.8); [.2,.45].forEach(y=>box(wd,1.34,.06,.94,FW.METALL2,-4.6,D+y,-4.8)); walze(wd,.34,.16,FW.EISEN,-4.6,D+.76,-4.8);
  [-2.9,-1.4].forEach(x=>{ const p=box(wd,1.25,.08,1.5,0x2a4a8a,x,D+.55,-5.4); p.rotation.x=.5; [-.3,.3].forEach(a=>{ const l=box(wd,.04,.03,1.5,FW.METALL,x+a,D+.6,-5.37); l.rotation.x=.5; }); box(wd,.1,.4,.1,FW.METALL2,x,D+.2,-5.8); });
  box(wd,2.2,.4,.6,FW.HOLZ,-7.2,D+.2,-2.4); for(let i=0;i<9;i++){ const x=-8.1+i*.23; strich(wd,[x,D+.35,-2.4],[x,D+.68+(i%3)*.1,-2.4],.02,FW.LAUB); ball(wd,.11,[FW.ROT,FW.GELB,FW.WEISS][i%3],x,D+.72+(i%3)*.1,-2.4); }
  strich(wd,[-.7,D,-6.5],[-.7,D+2,-6.5],.06,FW.METALL);
  verschmelze(wd);
  const sack=gruppe(sc,-.7,D+1.9,-6.5); [0,1,2,3].forEach(i=>{ const c=walze(sack,.26-i*.045,.34,i%2?FW.WEISS:FW.ORANGE,.18+i*.33,0,0); c.rotation.z=Math.PI/2; });
  /* Schlauchturm mit Uhr ohne Ziffern */
  const turm=gruppe(sc,-12.1,0,-5);
  FW.mauer(turm,ziegel,2.6,8.2,2.6,0,4.1,0);
  const tt=gruppe(turm,0,0,0);
  box(tt,3,.26,3,FW.WEISS,0,8.3,0); const hut=kegel(tt,2.1,1.7,FW.ROT2,0,9.28,0); hut.rotation.y=Math.PI/4; ball(tt,.2,FW.GOLD,0,10.25,0);
  [2.2,4.2].forEach(y=>{ box(tt,.8,1,.1,FW.WEISS,0,y,1.32); box(tt,.62,.82,.06,basis(0xffd878),0,y,1.37); });
  walze(tt,.72,.1,FW.WEISS,0,6.5,1.34).rotation.x=Math.PI/2; ring(tt,.74,.09,FW.GOLD,0,6.5,1.4); strich(tt,[0,6.5,1.44],[0,7.0,1.44],.04,FW.SCHWARZ); strich(tt,[0,6.5,1.44],[.36,6.35,1.44],.05,FW.SCHWARZ);
  verschmelze(tt);

  /* ---------- Bäume, Büsche, Laternen, Hydrant ---------- */
  [[-15.5,-.6,4],[-14.4,-8.6,4.6],[1.8,-8,3.8],[13.8,-6.8,4.2],[15.6,.2,3.4],[-19,9.6,3],[19,10,3.2]].forEach((p,i)=>FW.laubbaum(sc,p[0],p[1],p[2],[FW.LAUB,0xb87a30,FW.LAUB3][i%3]));
  [[.8,-5,.7],[1.9,-3.9,.5],[-13.6,.2,.6],[12.8,.2,.6],[-9,9.4,.55],[-2.6,9.8,.45],[5.4,9.3,.6],[11,9.7,.5]].forEach(p=>FW.busch(sc,p[0],p[1],p[2]));
  FW.wiesenschmuck(sc,-24,24,8.4,17,420,90);
  const klein=gruppe(sc,0,0,0), laternen=[];
  walze(klein,.2,.6,FW.ROT,3.3,.3,.4); ball(klein,.22,FW.ROT,3.3,.62,.4,1,.8,1); walze(klein,.07,.54,FW.ROT2,3.3,.38,.4).rotation.z=Math.PI/2; ball(klein,.06,FW.GOLD,3.3,.82,.4);
  [-13,13,-24,24].forEach(x=>{ strich(klein,[x,0,.7],[x,3.2,.7],.07,FW.EISEN); box(klein,.42,.1,.42,FW.EISEN,x,3.62,.7); laternen.push(x); });
  verschmelze(klein);
  const birne=basis(0xffe9a0);
  const lampen=laternen.map(x=>{ box(sc,.28,.36,.28,birne,x,3.38,.7).castShadow=false; return schein(sc,'rgba(255,200,90,.75)',x,3.4,.9,2.2); });
  const hallenSchein=schein(sc,'rgba(255,190,90,.45)',-8,1.5,VZ+.6,3.8);

  /* ---------- Drehleiter-Fahrzeug ---------- */
  const DLX=7.8, DLZ=-1.5;
  const wagen=FW.loeschwagen(sc,DLX,DLZ,0,{ ohneLeiter:true });
  const stuetz=gruppe(sc,DLX,0,DLZ);
  [-2.9,.8].forEach(x=>[-1,1].forEach(v=>{ box(stuetz,.26,.22,.8,FW.GELB,x,.7,v*1.45); walze(stuetz,.1,.65,FW.METALL,x,.36,v*1.78); walze(stuetz,.3,.1,FW.EISEN,x,.06,v*1.78); }));
  walze(stuetz,.95,.2,FW.METALL2,-1.4,2.72,0); box(stuetz,.8,.4,1,FW.ROT2,-1.4,2.98,0);
  verschmelze(stuetz);
  const P0=V(DLX-1.4,3.15,DLZ);

  /* ---------- Leiter aus drei Teilen, die ineinander ausfahren ---------- */
  const LANG=3.8, leiter=gruppe(sc,P0.x,P0.y,P0.z); leiter.rotation.order='YZX';
  const teile=[0,1,2].map(i=>{ const g=gruppe(leiter,0,0,0), w=.5-i*.085, h=.52-i*.07, c=[0xaab2ba,0xc4ccd4,0xe0e6ec][i];
    [-1,1].forEach(v=>{ box(g,LANG,.13,.09,c,LANG/2,0,v*w); box(g,LANG,.07,.06,c,LANG/2,h,v*w); for(let j=0;j<=5;j++) strich(g,[j*LANG/5,0,v*w],[Math.min(LANG,j*LANG/5+.34),h,v*w],.025,c); });
    for(let j=0;j<11;j++) box(g,.08,.06,w*2,c,.12+j*(LANG-.24)/10,0,0);
    box(g,.14,.18,w*2+.16,FW.ROT,LANG-.08,0,0);
    verschmelze(g); return g; });
  const stempel=walze(sc,.11,1,FW.METALL,0,0,0);

  /* ---------- Korb mit Spielfigur ---------- */
  const korb=gruppe(sc,0,0,0), kt=gruppe(korb,0,0,0);
  box(kt,2.1,.16,1.5,FW.METALL2,0,-.08,0); box(kt,2.14,.12,1.54,FW.ROT,0,-.2,0);
  [-1,1].forEach(v=>[-1,1].forEach(w=>{ walze(kt,.05,.95,FW.WEISS,v*1.02,.47,w*.72); ball(kt,.075,FW.GOLD,v*1.02,.97,w*.72); }));
  box(kt,2.1,.09,.09,FW.WEISS,0,.9,-.72); [-1,1].forEach(v=>box(kt,.09,.09,1.5,FW.WEISS,v*1.02,.9,0)); box(kt,2.1,.06,.06,FW.ROT,0,.46,-.72); [-1,1].forEach(v=>box(kt,.06,.06,1.5,FW.ROT,v*1.02,.46,0));
  box(kt,2.1,.07,.07,FW.WEISS,0,.64,.74); box(kt,2.1,.24,.05,FW.ROT,0,.16,.75); [-.7,-.23,.23,.7].forEach(x=>box(kt,.24,.15,.03,FW.GELB,x,.16,.785));
  [-1,1].forEach(v=>{ box(kt,.26,.22,.18,FW.EISEN,v*.82,-.36,.7); box(kt,.2,.16,.04,basis(0xfff6b0),v*.82,-.36,.81); });
  verschmelze(kt);
  const korbSchein=[-1,1].map(v=>schein(korb,'rgba(255,230,140,.55)',v*.82,-.36,.95,.9));
  const u=figur.userData, FS=1.35;
  figur.position.set(0,.02,.05); figur.scale.set(FS,FS,FS); figur.rotation.set(0,0,0); korb.add(figur);

  /* Weg des Korbs: vom Dachrand nach vorn oben über die Stadt */
  const AB=V(.9,4.85,-2.1), BIS=V(-1,8.5,2.4);
  const bahn=new THREE.CatmullRomCurve3([AB,V(-.5,6.2,-1),V(-2.1,7.7,.7),BIS]);

  /* ---------- Löschfahrzeug kommt zurück ---------- */
  const HALT=-6, FZ=3.5;
  const heim=FW.loeschwagen(sc,HALT-34,FZ,0);
  const blauSchein=[-.7,.7].map(v=>schein(heim.g,'rgba(70,140,255,.8)',2.5,3.35,v*.4,2.1));

  /* ---------- Einsatzkräfte winken ---------- */
  /* auf dem Dach */
  const oben=gruppe(sc,0,D,0);
  FW.mensch(k,oben,-2.6,-2.3,.2,{ haut:1, helm:FW.GELB, phase:1.2 });
  FW.mensch(k,oben,-5.8,-2.9,.1,{ haut:2, helm:FW.WEISS, phase:3 });
  /* unten */
  const unten=[[-.1,3.6,-.25,0,FW.ROT,0],[2.9,2.6,-.35,3,FW.GELB,2.1],[1.5,5.2,-.1,2,FW.GELB,4.2],[-9.8,5.6,.45,1,FW.ROT,5.1],[4.9,4.5,-.4,0,false,.7]]
    .map(p=>{ const m=FW.mensch(k,sc,p[0],p[1],p[2],{ haut:p[3], helm:p[4], phase:p[5], gr:1.15 });
      const fl=new THREE.Mesh(new THREE.CircleGeometry(.45,18),basis(0x000000,{transparent:true,opacity:.24,depthWrite:false})); fl.rotation.x=-Math.PI/2; fl.position.set(p[0],.035,p[1]); sc.add(fl); return m; });

  /* ---------- Tauben: zwei sitzen auf dem Dachrand, fünf fliegen ---------- */
  const sitzer=[[-8.6,.4],[-4.3,2.7]].map(p=>{ const t=FW.taube(sc,p[0],WH+.53,VZ+.1,-Math.PI/2+(p[1]>1?.5:-.5)); t.g.scale.setScalar(1.25); return t; });
  /* [Mitte x, y, z, Radius, Tempo, Start] */
  const flug=[[-7.5,9.6,-3,2.2,.7,0],[-6,11,-5,1.8,.6,2.4],[6.2,9.4,-2,2.4,-.65,1],[8,11,-5,1.6,-.8,4],[3.4,7.6,-6,2,.55,3.2]].map(p=>{ const t=FW.taube(sc,p[0],p[1],p[2],0); t.g.scale.setScalar(1.35);
    const fl=[-1,1].map(v=>{ const f=gruppe(t.g,0,.27,v*.12); ball(f,.2,0xc8d0de,-.02,0,v*.24,.75,.12,1.35); ball(f,.1,0x5a6478,-.06,0,v*.48,.8,.16,1.1); return f; });
    return { t, p, fl }; });

  /* Schatten werfen nur die großen Dinge (weniger Zeichenaufrufe) */
  const werfer=new Set();
  [wache,turm,korb,leiter,wagen.g,heim.g,stempel].forEach(g=>g.traverse(m=>werfer.add(m)));
  sc.traverse(m=>{ if(m.isMesh && !werfer.has(m)) m.castShadow=false; });

  /* ---------- Konfetti: seitlich vom Korb, damit die Figur frei bleibt ---------- */
  const NK=130, konfetti=menge(GEO.box,basis(0xffffff),NK), kd=[];
  for(let i=0;i<NK;i++){ const v=i%2?1:-1, hinten=i%5===0;
    kd.push({ x:hinten?(zufall()*2-1)*10:BIS.x+v*(2.4+zufall()*7.5), z:hinten?-3.5+zufall()*2:-.5+zufall()*4.5, y:zufall()*11, v:.55+zufall()*.55, p:zufall()*6.28, g:.8+zufall()*.5 });
    konfetti.setColorAt(i,FARBE.set(BUNT[i%6])); }
  konfetti.visible=false;

  /* ---------- Kamera: erst nah am Dachrand, dann weit genug für Korb, Wache, Fahrzeuge und Stadt ---------- */
  const NEIG=.2, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=5.7;
  const WICHTIG=[[BIS.x-.6,11.7,BIS.z],[BIS.x+.6,11.7,BIS.z],[0,.2,5.2],[HALT-3.3,.2,4.8],[HALT-3.3,3.3,4.8],[-10.6,6.4,-1.4],[8.6,.3,0],[8.6,3.4,0],[1.5,-.3,5.8]];
  const abstand=(a,tn)=>WICHTIG.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
    return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },14);

  /* Zeitplan in Sekunden: nach etwa 9 s ist der Korb oben, nach etwa 11 s ist alles ruhig */
  const LOS=1.1, DA=9.2, KOMM=1.8, STEHT=8, FEST=7.6, JUBEL=8.4;
  const ZIEL=V(0,0,0), A=V(0,0,0), R=V(0,0,0), HOCH=V(0,1,0), FUSS=V(0,0,0);
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));

    /* Korb fährt hoch, schwenkt sanft */
    const r=Math.min(1,Math.max(0,(t-LOS)/(DA-LOS))), e=weich(r), p=bahn.getPoint(e), danach=weich((t-DA+1)/2);
    const bx=p.x+Math.sin(t*.5)*.22*danach, by=p.y+Math.sin(t*1.1)*.07*danach, bz=p.z;
    korb.position.set(bx,by,bz); korb.rotation.y=Math.sin(t*.45)*.07*danach-.12*(1-e);
    korbSchein.forEach(s=>{ const g=.9+Math.sin(t*2)*.05; s.scale.set(g,g,1); });

    /* Leiter folgt dem Korb */
    A.set(bx+.95,by-.12,bz-.35);
    R.set(A.x-P0.x,A.y-P0.y,A.z-P0.z);
    const quer=Math.hypot(R.x,R.z), L=Math.hypot(quer,R.y);
    leiter.rotation.y=Math.atan2(-R.z,R.x); leiter.rotation.z=Math.atan2(R.y,quer);
    teile.forEach((g,i)=>{ g.position.x=(L-LANG)*i/2; g.position.y=i*.025; });
    /* Stützkolben unter der Leiter */
    FUSS.set(P0.x+.75,2.75,P0.z);
    R.set(P0.x+(A.x-P0.x)*1.8/L,P0.y+(A.y-P0.y)*1.8/L,P0.z+(A.z-P0.z)*1.8/L);
    ZIEL.set(R.x-FUSS.x,R.y-FUSS.y,R.z-FUSS.z);
    const lang=Math.hypot(ZIEL.x,ZIEL.y,ZIEL.z)||1;
    stempel.position.set((R.x+FUSS.x)/2,(R.y+FUSS.y)/2,(R.z+FUSS.z)/2); stempel.scale.set(.11,lang,.11);
    stempel.quaternion.setFromUnitVectors(HOCH,ZIEL.set(ZIEL.x/lang,ZIEL.y/lang,ZIEL.z/lang));

    /* Spielfigur winkt, oben jubelt sie mit beiden Armen und wird dann ruhiger */
    const jubel=weich((t-JUBEL)/.6), ruhe=1-.7*weich((t-11)/1.5);
    figur.rotation.y=Math.sin(t*.9)*.2;
    u.armR.rotation.z=2.45+Math.sin(t*7)*.28*(jubel?ruhe:1);
    u.armL.rotation.z=misch(-.18,-2.45+Math.sin(t*7+1.5)*.28*ruhe,jubel);
    u.armL.rotation.x=u.armR.rotation.x=0; u.beinL.rotation.x=u.beinR.rotation.x=0;
    u.koerper.position.y=Math.abs(Math.sin(t*4.2))*.08*jubel*ruhe;

    /* Kamera fährt vom Dachrand zurück */
    const asp=kamera.aspect||1.5, tn=Math.tan((asp<1.1?30:25)*Math.PI/180), d=abstand(asp,tn), z=weich((t-1.4)/7.6);
    const zx=misch(AB.x-.4,0,z), zy=misch(AB.y+1.1,ZIELY,z), zz=misch(AB.z,0,z), weit=misch(Math.min(11,d*.7),d,z), wippen=Math.sin(t*.2)*.25*weich((t-9)/3);
    kamera.position.set(zx+wippen,zy+weit*SN,zz+weit*CN); kamera.lookAt(zx,zy,zz);
    const c=kamera.position;
    kuppel.position.copy(c);
    /* Weltpunkt zu einem Bildplatz (x,y von -1 bis 1) in der Entfernung fern */
    const ort=(x,y,fern_)=>{ const h=y*fern_*tn; return [c.x+x*fern_*tn*asp, c.y-SN*fern_+CN*h, c.z-CN*fern_-SN*h]; };

    /* Sonne sinkt langsam, Wolken ziehen */
    const sp=ort(.62,misch(.55,.47,weich(t/14)),80), sg=.085*80*tn;
    sonne.position.set(sp[0],sp[1],sp[2]); sonne.scale.setScalar(sg); sonne.lookAt(c.x,c.y,c.z);
    sonnenSchein.position.set(sp[0],sp[1],sp[2]+.5); const sw=sg*(5.5+Math.sin(t*1.2)*.2); sonnenSchein.scale.set(sw,sw,1);
    wolken.forEach((w,i)=>{ const q=ort(w.p[0]+Math.sin(t*.07+i*2)*.05,w.p[1],70); w.g.position.set(q[0],q[1],q[2]); w.g.scale.setScalar(w.p[2]*70*tn/22); });
    sterne.visible=t>2.5;
    if(sterne.visible){ sd.forEach((s,i)=>{ const q=ort(s.x,s.y,65), g=s.g*65*tn*weich((t-s.ab)/1.5)*(.82+.18*Math.sin(t*1.7+s.p)); setze(sterne,i,q[0],q[1],q[2],g,g*1.4,g,0,0,0); }); sterne.instanceMatrix.needsUpdate=true; }

    /* Fensterlichter gehen an */
    fenster.forEach(f=>{ let neu=false; while(f.n<f.liste.length && f.liste[f.n].ab<=t){ const w=f.liste[f.n++]; f.im.setColorAt(w.i,FARBE.set(w.c)); neu=true; }
      if(neu && f.im.instanceColor) f.im.instanceColor.needsUpdate=true; });
    lampen.forEach((s,i)=>{ const g=2.2*weich((t-1.5-i*.7)/1)+.001; s.scale.set(g,g,1); });
    const hs=3.8+Math.sin(t*1.3)*.15; hallenSchein.scale.set(hs,hs*.8,1);

    /* Löschfahrzeug rollt heran und bremst sanft; Blaulicht blinkt 1,5-mal je Sekunde */
    const f=Math.min(1,Math.max(0,(t-KOMM)/(STEHT-KOMM))), rest=Math.pow(1-f,2.4);
    heim.g.position.set(HALT-34*rest,f>0&&f<1?Math.abs(Math.sin(t*9))*.025*(1-f):0,FZ);
    const takt=(t*1.5)%1<.5;
    heim.blau[0].visible=blauSchein[0].visible=takt; heim.blau[1].visible=blauSchein[1].visible=!takt;

    rad.rotation.z=-t*.5;
    sack.rotation.y=.25+Math.sin(t*.8)*.25; sack.rotation.z=-.12+Math.sin(t*2.1)*.06;

    /* Tauben */
    flug.forEach((v,i)=>{ const q=v.p, w=t*q[4]+q[5]; v.t.g.position.set(q[0]+Math.cos(w)*q[3],q[1]+Math.sin(w*1.7)*.4,q[2]+Math.sin(w)*q[3]*.7);
      const dx=-Math.sin(w)*q[4], dz=Math.cos(w)*.7*q[4]; v.t.g.rotation.y=Math.atan2(-dz,dx);
      const s=Math.sin(t*10+i*1.7)*.75; v.fl[0].rotation.x=s; v.fl[1].rotation.x=-s; });
    sitzer.forEach((v,i)=>{ v.kopf.rotation.y=Math.sin(t*1.3+i*2)*.5; v.kopf.rotation.z=-Math.pow(Math.max(0,Math.sin(t*1.8+i*3)),6)*.5; });

    /* Konfetti, sobald alle da sind */
    konfetti.visible=t>FEST;
    if(konfetti.visible){
      const tempo=t-FEST;
      kd.forEach((q,i)=>{ const weg=11+q.y*.3-tempo*q.v*1.8;
        /* erst von oben herein, danach gleichmäßig verteilt weiterfallen */
        const hy=weg>.2?weg:.2+((((weg-.2)%11)+11)%11);
        const g=q.g*weich((t-FEST)/.6)*weich(hy/.5)*(weg>.2?1:weich((11.2-hy)/.8));
        setze(konfetti,i,q.x+Math.sin(t*1.2+q.p)*.3,hy+.6,q.z,.09*g,.13*g,.012*g,t*1.7+q.p,t*1.2+q.p*2,Math.sin(t*1.6+q.p)); });
      konfetti.instanceMatrix.needsUpdate=true; }
  };
};

