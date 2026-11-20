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