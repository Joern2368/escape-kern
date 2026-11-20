document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-rbhut\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-19 8Q-10 4 -9 -6Q-7 -17 3 -16Q13 -15 11 -3Q14 3 19 6Q12 12 0 11Q-12 12 -19 8Z\"/><path d=\"M-9 1H11\" stroke=\"#fff\" stroke-width=\"3\" opacity=\".6\"/></symbol>\n<symbol id=\"sym-rbsack\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-11 -8Q-19 6 -14 17H14Q19 6 11 -8ZM-8 -9L-12 -18L-3 -13L0 -19L3 -13L12 -18L8 -9Z\"/><path d=\"M-9 -8H9\" stroke=\"#fff\" stroke-width=\"2.5\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-rbnote\" viewBox=\"-20 -20 40 40\"><ellipse cx=\"-6\" cy=\"11\" rx=\"8\" ry=\"6\" fill=\"currentColor\"/><path d=\"M1 10V-17Q9 -13 14 -6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-rbpilz\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-19 1Q-18 -17 0 -17Q18 -17 19 1ZM-6 1H6L7 18H-7Z\"/><circle cx=\"-7\" cy=\"-8\" r=\"3\" fill=\"#fff\" opacity=\".7\"/><circle cx=\"6\" cy=\"-10\" r=\"3\" fill=\"#fff\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-rbbrezel\" viewBox=\"-20 -20 40 40\"><path d=\"M0 14Q-18 16 -17 -1Q-16 -14 -7 -14Q3 -13 6 6M0 14Q18 16 17 -1Q16 -14 7 -14Q-3 -13 -6 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\" stroke-linecap=\"round\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const st=(s,k)=>s?` stroke="${s}" stroke-width="${k||2}"`:'';
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${st(s,k)}/>`;
const C=(x,y,r,f,s,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${st(s,k)}/>`;
const E=(x,y,a,b,f,s,k)=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${f}"${st(s,k)}/>`;
const P=(d,f,s,k)=>`<path d="${d}" fill="${f}"${st(s,k)}/>`;
const L=(d,s,k)=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${k||2}" stroke-linecap="round"/>`;
const U=(id,x,y,w,c)=>`<use href="#sym-${id}" x="${x}" y="${y}" width="${w}" height="${w}" color="${c}"/>`;
const X=(x,y,t,g,f)=>`<text x="${x}" y="${y}" font-size="${g}" fill="${f}" font-family="Arial,Helvetica,sans-serif" font-weight="bold" text-anchor="middle">${t}</text>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.3)');
const holz='#a8743a',dk='#4a2a10',gr='#3a3a40',rot='#c8402a',gruen='#3a8a3a',gelb='#f2c14e',fw='#7a3a1a',creme='#f4ead0',sack='#b8955a',stein='#8a8078';
const apf=(x,y,r,c)=>C(x,y,r,c,'rgba(0,0,0,.25)',1)+L(`M${x} ${y-r}l2 -5`,dk,2);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<110;k++)d+=E((k*137+20)%1600,484+(k*53)%290,20+k%3*5,7+k%2*3,['#a8a090','#bab2a2','#948c7c'][k%3],'rgba(70,60,50,.4)',1.5);return g+d;}
if(m==1){for(const y of[500,540,590,650,720])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=110)d+=`M${800+(x-800)*.5} 470L${x} 780`;return g+L(d,'rgba(90,40,10,.4)',3)+E(800,650,440,72,'#b8443a','#7a2a20',6)+E(800,650,380,54,'none',gelb,4);}
if(m==2){for(let k=0;k<70;k++){const x=(k*149+30)%1600,y=490+(k*61)%280;d+=`M${x} ${y}l-6 -16M${x} ${y}l2 -20M${x} ${y}l8 -14`;}let f='';for(let k=0;k<40;k++)f+=E((k*97+50)%1600,480+(k*43)%290,9,5,['#c8782a','#a8501a','#d8a030'][k%3]);return g+f+L(d,'#4a7a2a',3)+R(0,470,1600,50,'rgba(230,240,235,.35)');}
if(m==3){for(let k=0;k<45;k++)d+=E((k*173+40)%1600,490+(k*59)%280,24+k%4*8,10+k%3*4,['#6a625a','#7a7268','#58504a'][k%3],'rgba(30,25,20,.5)',2);return g+d;}
for(const y of[500,545,600,670,750])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=150)d+=`M${800+(x-800)*.6} 470L${x} 780`;return g+L(d,'rgba(60,40,60,.35)',3);}
const haus=(x,b,w,h,c)=>{const t=b-h,m=t+h/2,q=x+w/2;return R(x,t,w,h,creme,fw,5)+L(`M${x} ${m}H${x+w}M${q} ${t}V${b}M${q} ${t}L${x+w} ${m}M${x} ${m}L${q} ${b}`,fw,6)+R(x+14,t+14,w/2-28,h/2-28,'#9ac8e8','#fff',3)+R(q+14,m+14,w/2-28,h/2-28,'#9ac8e8','#fff',3)+P(`M${x-14} ${t}L${q} ${t-h*.55}L${x+w+14} ${t}Z`,c,'#5a2a1a',3);};
const baum=(x,b,s,c)=>R(x-16*s,b-150*s,32*s,150*s,'#6a4a2a',dk,3)+[[0,-190,80],[-60,-160,60],[60,-160,60],[-30,-235,55],[40,-228,55]].map(([a,y,r])=>C(x+a*s,b+y*s,r*s,c||'#4a8a3a','#2a5a1a',2)).join('');
const taube=(x,y)=>E(x,y,14,9,'#a8acb8','#5a5e68',1.5)+C(x+11,y-8,6,'#a8acb8')+P(`M${x+16} ${y-9}l6 2l-6 2Z`,'#e8a040')+C(x+12,y-9,1.5,'#111');
const pilz=(x,y,s,c)=>R(x-6*s,y-24*s,12*s,24*s,'#f4ead0','#a89878',1.5)+P(`M${x-22*s} ${y-22*s}Q${x} ${y-52*s} ${x+22*s} ${y-22*s}Z`,c,'#5a2a1a',1.5)+C(x-6*s,y-32*s,3*s,'#fff')+C(x+8*s,y-30*s,3*s,'#fff');
const spieluhr=(x,y,s)=>R(x-30*s,y-30*s,60*s,30*s,'#b0603a',dk,2)+P(`M${x-30*s} ${y-30*s}L${x-24*s} ${y-62*s}H${x+36*s}L${x+30*s} ${y-30*s}Z`,'#d88a5a',dk,2)+R(x-22*s,y-24*s,44*s,16*s,gelb)+C(x,y-38*s,6*s,'#e85a8a')+L(`M${x+30*s} ${y-14*s}h${10*s}v${-8*s}`,gr,2*s);
const lampion=(x,y,c)=>`<circle cx="${x}" cy="${y}" r="30" fill="${c}" opacity=".28"/>`+E(x,y,15,19,c,'#6a4a2a',1.5)+R(x-6,y-23,12,5,gr)+R(x-6,y+18,12,5,gr);
const aushang=()=>`${R(-86,-64,172,128,'#9a6a3a',dk,6)}${[[-72,-50,62,50],[2,-48,70,40],[-60,6,56,46],[14,0,58,50]].map(([x,y,w,h],k)=>R(x,y,w,h,['#fff','#fff4c0','#e0f0ff','#ffe0e0'][k],'#bbb',1)+L(`M${x+8} ${y+18}H${x+w-8}M${x+8} ${y+30}H${x+w-16}`,'#7a7a80',3)+C(x+w/2,y+5,4,rot)).join('')}`;
const rathausuhr=()=>`${P('M-62 -50L0 -92L62 -50Z','#b04a30',dk,3)}${R(-56,-50,112,112,creme,fw,5)}${C(0,6,40,'#fff',gr,5)}${[...Array(12)].map((_,k)=>{const a=k*Math.PI/6,s=Math.sin(a),c=Math.cos(a);return L(`M${s*28} ${6+c*28}L${s*34} ${6+c*34}`,gr,k%3?2:4);}).join('')}${L('M0 6V-20M0 6L20 14',gr,4)}${C(0,6,4,rot)}`;
const brunnen=()=>`${sch(95)}${R(-90,-62,180,56,'#a8a49c','#5a5650',3)}${L('M-90 -34H90M-45 -62V-34M15 -62V-34M60 -34V-6M-20 -34V-6','#5a5650',2)}${E(0,-6,90,12,'#a8a49c','#5a5650',3)}${E(0,-62,90,18,'#6ab0e0','#5a5650',4)}${R(-8,-150,16,88,'#a8a49c','#5a5650',2)}${C(0,-154,12,'#a8a49c','#5a5650',2)}${L('M0 -156Q-34 -170 -50 -72M0 -156Q34 -170 50 -72','#8ad0f8',4)}${taube(60,-84)}`;
const marktstand=()=>`${sch(95)}${L('M-82 0V-176M82 0V-176',dk,6)}${R(-90,-72,180,72,'#c89060',dk,3)}${R(-94,-84,188,14,holz,dk,3)}${[-66,-38,-10,18,46,72,-52,-24,4,32,60].map((x,k)=>apf(x,k>5?-116:-96,12,k%3?rot:'#8ac040')).join('')}${P('M-104 -176H104L94 -148H-94Z','#3a8a3a')}${[-80,-40,0,40,80].map(x=>C(x,-148,20,'#fff')).join('')}${R(-104,-186,208,12,'#2a6a2a')}`;
const milchkannen=()=>`${sch(70)}${[-42,0,42].map(x=>P(`M${x-18} 0V-56Q${x-18} -68 ${x-8} -72V-86H${x+8}V-72Q${x+18} -68 ${x+18} -56V0Z`,'#c8ccd4','#5a5e68',3)+R(x-11,-94,22,8,'#8a8e98')+L(`M${x-18} -30H${x+18}`,'#5a5e68',2)).join('')}`;
const dorfkarte=()=>`${R(-92,-66,184,132,'#f4e4b8','#8a6a30',4)}${L('M-92 20Q-30 0 10 30T92 10','#5ab0e0',8)}${[[-60,-30],[-40,-40],[-50,-14]].map(([x,y])=>C(x,y,12,gruen)).join('')}${P('M50 -50Q66 -64 82 -50V-26H50Z','#7a7268')}${P('M58 -26V-40Q66 -48 74 -40V-26Z','#2a2420')}${[[0,-30],[18,-20],[-6,-10]].map(([x,y])=>R(x,y,12,10,rot)).join('')}${R(20,40,34,14,'#c83a3a')}${L('M-70 48H-40M-55 33V63',gr,3)}${X(-55,30,'N','13',gr)}${X(-55,76,'S','11',gr)}${X(-30,52,'O','11',gr)}${X(-80,52,'W','11',gr)}`;
const wegweiser=()=>`${sch(30)}${R(-7,-224,14,224,holz,dk,3)}${P('M-10 -214H72L88 -200L72 -186H-10Z',creme,dk,3)}${X(38,-194,'WALD','16',gruen)}${P('M10 -174H-72L-88 -160L-72 -146H10Z',creme,dk,3)}${X(-34,-154,'DORF','16',rot)}${P('M-10 -134H72L88 -120L72 -106H-10Z',creme,dk,3)}${X(38,-114,'MARKT','14','#3a5a9a')}`;
const taubenhaus=()=>`${sch(40)}${R(-6,-150,12,150,holz,dk,2)}${R(-50,-210,100,60,creme,fw,3)}${P('M-60 -210L0 -246L60 -210Z','#b04a30',dk,3)}${[-28,0,28].map(x=>C(x,-184,9,'#3a2a20')).join('')}${R(-58,-152,116,6,holz)}${taube(-34,-160)}${taube(26,-160)}`;
const wanduhr=()=>`${R(-34,-92,68,176,'#7a4a20',dk,4)}${P('M-40 -92L0 -118L40 -92Z','#7a4a20',dk,3)}${C(0,-52,26,'#fff8e8',gr,3)}${L('M0 -52V-70M0 -52L12 -46',gr,3)}${R(-22,-18,44,92,'#5a3010')}${L('M0 -18V52',gelb,3)}${C(0,56,11,gelb,'#9a7a10',2)}`;
const familienbilder=()=>`${[[-64,-10,'#f0c8a0','#5a8ad8'],[0,-24,'#c8905a',rot],[64,-6,'#e8b890',gruen]].map(([x,y,h,k])=>R(x-26,y-34,52,66,'#fff8e8',gelb,5)+C(x,y-8,11,h)+P(`M${x-16} ${y+28}Q${x-16} ${y+6} ${x} ${y+6}Q${x+16} ${y+6} ${x+16} ${y+28}Z`,k)).join('')}`;
const ofenbank=()=>`${sch(110)}${R(-110,-60,220,16,holz,dk,3)}${L('M-96 -44V0M96 -44V0',dk,8)}${R(-104,-72,110,12,'#c84a4a','#7a2a2a',2)}${E(50,-76,30,14,'#e8a050','#8a5a20',2)}${C(76,-86,11,'#e8a050','#8a5a20',2)}${P('M69 -94l3 -11l6 8ZM79 -95l7 -9l1 11Z','#e8a050')}${L('M22 -72Q6 -88 18 -100','#e8a050',5)}${L('M72 -86h3M80 -86h3','#3a2a10',2)}`;
const strickkorb=()=>`${sch(60)}${L('M-28 -62L-62 -116M-18 -64L-42 -120','#c8ccd4',4)}${P('M-56 -50H56L46 0H-46Z','#c8963a','#6a4a10',3)}${L('M-52 -34H52M-48 -18H48','#6a4a10',2)}${C(-24,-58,18,'#4a8ad8','#2a5a9a',2)}${C(14,-60,20,'#e85a7a','#9a2a4a',2)}${C(42,-52,14,gelb,'#9a7a10',2)}${L('M-24 -58Q0 -24 14 -60','#4a8ad8',2)}`;
const kommode=()=>`${sch(90)}${R(-86,-120,172,120,'#9a5a30',dk,4)}${[-110,-74,-38].map(y=>R(-76,y,152,30,'#b06a3a',dk,2)+C(0,y+15,5,gelb)).join('')}${E(-20,-122,46,7,'#fff','#ccc',1)}<rect x="-46" y="-158" width="52" height="34" fill="none" stroke="#7a6a5a" stroke-width="2" stroke-dasharray="6 4"/>${P('M40 -122Q30 -150 46 -168H62Q78 -150 68 -122Z','#5ab0d0','#2a6a8a',2)}${C(48,-176,8,rot)}${C(62,-178,8,gelb)}`;
const stickbild=()=>`${C(0,0,66,'#fff8e8','#a8743a',8)}${X(0,-14,'EHRLICH','17',rot)}${X(0,8,'WÄHRT AM','14','#3a5a9a')}${X(0,28,'LÄNGSTEN','14','#3a5a9a')}${P('M0 -40q-8 -10 -14 -2q-2 8 14 16q16 -8 14 -16q-6 -8 -14 2Z','#e85a7a')}${[-40,40].map(x=>C(x,40,6,gruen)).join('')}`;
const schaukelstuhl=()=>`${sch(70)}${L('M-72 -6Q0 16 72 -6',dk,7)}${L('M-50 -2L-44 -80M40 -2L36 -80',dk,6)}${R(-52,-92,94,14,holz,dk,3)}${P('M-48 -92L-60 -192H24L36 -92Z','#b07a40',dk,4)}${L('M-40 -112L-48 -172M-16 -112L-20 -172M8 -112L8 -172','#7a4a20',3)}${P('M-64 -182Q-20 -150 30 -186L40 -124Q-20 -104 -72 -134Z','#7a5ab0','#4a2a7a',2)}`;
const teetisch=()=>`${sch(70)}${L('M0 -70V0M-30 0H30',dk,7)}${P('M-72 -74L-62 -48H62L72 -74Z','#f4e8f0','#c8a8b8',2)}${E(0,-74,72,12,'#fff','#c8b8a8',2)}${P('M-32 -84Q-36 -120 -8 -122Q18 -120 14 -84Z','#5aa0d8','#2a5a8a',2)}${C(-10,-126,5,'#2a5a8a')}${L('M14 -102Q30 -106 30 -90M-34 -110Q-46 -112 -44 -96','#2a5a8a',4)}${R(30,-94,20,14,'#fff','#c8a8b8',2)}${C(-52,-82,8,'#d8a050')}`;
const huttast=()=>`${L('M-100 -46Q0 -66 100 -40',dk,12)}${L('M60 -48L84 -76M-60 -52L-80 -80',dk,6)}${[[84,-82],[-80,-86],[30,-62]].map(([x,y])=>E(x,y,16,9,'#4a8a2a')).join('')}${L('M8 -58V-32','#6a4a2a',3)}${P('M-58 30Q-30 22 -26 -10Q-22 -36 8 -34Q36 -32 32 -6Q40 16 62 26Q30 40 0 38Q-30 40 -58 30Z','#4a7a3a','#2a4a1a',3)}${R(-26,6,58,10,'#c8a02a')}${R(-14,-18,16,14,'#c89050','#6a4a20',1.5)}`;
const nistkasten=()=>`${R(-16,-92,32,184,'#6a4a2a',dk,3)}${R(-40,-36,80,76,holz,dk,3)}${P('M-50 -36L0 -70L50 -36Z','#7a4a20',dk,3)}${C(0,-4,14,'#2a1a10')}${C(0,-6,9,'#c87a3a')}${C(-3,-9,2,'#111')}${P('M5 -6l6 2l-6 2Z',gelb)}${R(-4,18,8,16,dk)}`;
const raeubersack=()=>`${sch(60)}${P('M-56 0Q-66 -60 -30 -100L30 -100Q66 -60 56 0Z',sack,'#6a4a20',3)}${R(-20,-60,30,24,'#7a9ac8','#3a5a8a',2)}${L('M-16 -56l22 16M-16 -40l22 -16','#3a5a8a',1.5)}${P('M-30 -100L-40 -124L-10 -112L0 -128L12 -112L40 -124L30 -100Z',sack,'#6a4a20',3)}${L('M-32 -102Q0 -92 32 -102',rot,5)}`;
const pilzkreis=()=>`${E(0,-4,96,22,'rgba(60,120,40,.35)')}${[[-70,0,1,rot],[-36,-14,.8,'#a8703a'],[0,-18,1,rot],[36,-14,.8,'#a8703a'],[70,0,1,rot],[-38,12,.7,'#c8903a'],[38,12,.7,rot]].map(([x,y,s,c])=>pilz(x,y,s,c)).join('')}`;
const fussspuren=()=>`${E(0,-10,112,26,'#6a4a2a')}${E(0,-12,100,20,'#7a5a32')}${[[-80,-6,0],[-46,-16,1],[-12,-6,0],[22,-16,1],[56,-6,0],[86,-16,1]].map(([x,y])=>E(x,y,9,5,'#3a2410')+E(x+12,y,4,4,'#3a2410')).join('')}`;
const tiertafel=()=>`${R(-90,-66,180,132,'#e8f0d8','#3a6a2a',6)}${R(-90,-66,180,22,'#3a6a2a')}${X(0,-49,'TIERE IM WALD','14','#fff')}${P('M-62 -20L-44 -30L-50 -6L-62 10L-74 -6L-80 -30Z','#e8802a')}${C(-62,-6,4,'#fff')}${E(-4,-4,16,20,'#a8783a')}${C(-10,-12,6,'#fff')}${C(2,-12,6,'#fff')}${C(-10,-12,2.5,'#111')}${C(2,-12,2.5,'#111')}${P('M44 10Q44 -14 64 -14Q80 -14 82 4Q70 14 44 10Z','#6a4a2a')}${L('M50 -10l-4 -8M58 -14l-2 -9M66 -14l1 -9M74 -10l4 -8','#3a2410',3)}${C(82,2,3,'#111')}${L('M-74 40H-10M10 40H74M-74 54H-30M10 54H50','#5a6a4a',4)}`;
const baumstumpf=()=>`${sch(70)}${P('M-60 0Q-56 -40 -50 -80H50Q56 -40 60 0Z','#7a5a3a',dk,3)}${E(0,-80,50,14,'#d8b080',dk,3)}${E(0,-80,30,8,'none','#a8804a',2)}${E(0,-80,12,3,'none','#a8804a',2)}${L('M-30 -60V-10M10 -66V-6M36 -50V-8','#5a3a20',3)}${E(-46,-20,16,10,'#5a9a3a')}${C(40,-30,10,'#d8b860','#8a6a20',2)}${P('M30 -22H58Q54 -16 30 -18Z','#c8a880')}`;
const ameisenhaufen=()=>`${sch(80)}${P('M-80 0Q-40 -120 0 -124Q40 -120 80 0Z','#9a6a3a','#5a3a1a',3)}${[...Array(26)].map((_,k)=>L(`M${-60+(k*29)%120} ${-10-(k*37)%100}l6 -4`,'#6a4a2a',2)).join('')}${[[-30,-40],[10,-70],[40,-20],[-50,-14],[0,-100]].map(([x,y])=>E(x,y,4,2.5,'#1a1a1a')+E(x+6,y,3,2.5,'#1a1a1a')).join('')}`;
const raetselschild=()=>`${L('M-60 -92L-50 -52M60 -92L50 -52','#c8a060',3)}${C(0,-96,5,gr)}${L('M-60 -92L0 -96L60 -92','#c8a060',3)}${R(-88,-52,176,112,holz,dk,6)}${X(0,-12,'RÄTSEL','28','#fff4c0')}${X(-52,40,'?','34',gelb)}${X(0,44,'?','40','#fff')}${X(52,40,'?','34',gelb)}`;
const hoehlenlaterne=()=>`${C(0,20,120,'url(#licht)')}${L('M-50 -62H0V-44',gr,6)}${R(-56,-76,10,30,gr)}${P('M-30 -44L0 -62L30 -44Z',gr)}${P('M-26 -44H26L22 40H-22Z','rgba(255,220,120,.85)',gr,4)}${E(0,6,10,18,'#fff6b0')}${R(-26,40,52,8,gr)}`;
const apfelsack=()=>`${sch(80)}${P('M-60 0Q-70 -60 -36 -100H36Q70 -60 60 0Z',sack,'#6a4a20',3)}${E(0,-100,36,10,'#5a3a1a')}${[-20,4,26,-8,14].map((x,k)=>apf(x,-104-(k>2?14:0),12,k%2?'#8ac040':rot)).join('')}${apf(78,-12,12,rot)}${apf(100,-10,11,'#8ac040')}`;
const spielzeugkiste=()=>`${sch(80)}${P('M-76 -90L-70 -150H70L76 -90Z','#c87a3a',dk,3)}${R(-76,-90,152,90,'#b06a2a',dk,3)}${L('M-76 -46H76',dk,3)}${R(-12,-58,24,22,gelb,dk,2)}${C(-34,-104,22,'#c8905a','#6a4a20',2)}${C(-50,-122,9,'#c8905a','#6a4a20',2)}${C(-18,-122,9,'#c8905a','#6a4a20',2)}${C(-40,-106,3,'#111')}${C(-28,-106,3,'#111')}${C(22,-104,18,'#3a8ae0','#1a4a8a',2)}${L('M8 -100Q22 -92 38 -104','#fff',4)}${R(46,-130,18,40,rot,'#7a1a10',2)}`;
const haengematte=()=>`${sch(120)}${L('M-110 0V-150M110 0V-150',dk,10)}${L('M-110 -140Q0 -40 110 -140','#e8c870',5)}${P('M-104 -130Q0 -30 104 -130Q0 -60 -104 -130Z','#e85a4a','#8a2a1a',2)}${L('M-70 -100Q0 -60 70 -100M-40 -84Q0 -66 40 -84','#f4d870',3)}${E(-60,-102,26,12,creme,'#a89878',2)}`;
const beuteliste=()=>`${R(-64,-82,128,164,'#f4ecd8','#8a7a5a',3)}${X(0,-56,'BEUTE','20',rot)}${[[-28,0,'apf'],[-28,22,'bal'],[-28,44,'ted']].map(([x,dy,t])=>{const y=-34+dy*1.2;return(t=='apf'?apf(x,y,8,rot):t=='bal'?C(x,y,8,'#3a8ae0'):C(x,y,8,'#c8905a'))+L(`M-6 ${y-8}v16M2 ${y-8}v16M10 ${y-8}v16`,gr,3);}).join('')}${U('rbnote',-40,34,24,'#7a5ab0')}${X(20,54,'?','26','#7a5ab0')}`;
const feuerlaterne=()=>`${C(0,-40,120,'url(#licht)')}${sch(70)}${[-56,-30,0,30,56].map((x,k)=>E(x,-6,16,10,['#8a8078','#7a7268','#9a9088'][k%3],'#4a4440',2)).join('')}${L('M-40 -14L36 -40M-36 -40L40 -14','#7a4a20',10)}${R(-14,-74,28,46,'rgba(255,210,110,.9)',gr,3)}${P('M-16 -74L0 -88L16 -74Z',gr)}${E(0,-50,6,12,'#fff6b0')}`;
const kistenstapel=()=>`${sch(70)}${[[-66,-64,70],[4,-64,64],[-44,-128,80]].map(([x,y,w])=>R(x,y,w,64,'#a8743a',dk,3)+L(`M${x} ${y}L${x+w} ${y+64}M${x+w} ${y}L${x} ${y+64}`,'#7a4a20',3)).join('')}${R(-30,-112,50,24,creme,dk,1.5)}${X(-5,-94,'ÄPFEL','12',rot)}`;
const plakat=()=>`${R(-70,-86,140,172,'#fff4d0','#8a3a2a',4)}${R(-70,-86,140,30,'#c83a3a')}${X(0,-64,'THEATER','20','#fff')}${C(0,-10,26,'#f0c8a0','#8a5a3a',2)}${P('M-26 -22Q0 -60 26 -22Q0 -32 -26 -22Z','#4a7a3a')}${C(-9,-12,3,'#111')}${C(9,-12,3,'#111')}${L('M-9 2Q0 10 9 2','#8a3a2a',2)}${X(0,46,'HEUTE','16','#3a5a9a')}${X(0,70,'ABEND','16','#3a5a9a')}`;
const lampionkette=()=>`${L('M-130 -30Q0 30 130 -30',gr,2)}${[[-100,-10,'#e85a4a'],[-50,6,gelb],[0,12,'#5ab0e8'],[50,6,'#8ac040'],[100,-10,'#e86ab0']].map(([x,y,c])=>lampion(x,y+18,c)).join('')}`;
const puppenstaender=()=>`${sch(70)}${L('M-60 0L0 -40L60 0M0 -40V-180M-70 -180H70',dk,6)}${[[-50,'#4a9a4a','#3a7a3a'],[0,'#f0c8a0',rot],[50,'#e8a050','#c87a2a']].map(([x,h,k],i)=>P(`M${x-18} -120V-176H${x+18}V-120Z`,k)+C(x,-150,15,h,'#5a3a20',1.5)+C(x-5,-153,2.5,'#111')+C(x+5,-153,2.5,'#111')+(i==1?P(`M${x-14} -162L${x-14} -176L${x-7} -168L${x} -178L${x+7} -168L${x+14} -176V-162Z`,gelb):i==0?C(x,-142,5,'#2a6a2a'):P(`M${x-14} -162l4 -12l6 8ZM${x+14} -162l-4 -12l-6 8Z`,'#e8a050'))).join('')}`;
const zuschauerbank=()=>`${sch(120)}${R(-120,-50,240,14,holz,dk,3)}${R(-120,-96,240,12,holz,dk,3)}${L('M-104 -36V0M104 -36V0M-104 -84V-50M104 -84V-50',dk,7)}${R(-60,-62,50,12,'#7a5ab0')}${R(30,-58,34,8,'#fff','#888',1)}`;
const eintrittskasse=()=>`${sch(80)}${R(-76,-90,152,90,'#3a6ab0','#1a3a6a',3)}${R(-76,-100,152,12,'#2a4a8a')}${R(-40,-128,64,28,'#8a8e98',gr,2)}${E(-8,-128,24,5,'#5a5e68')}${[[-50,-106],[36,-106],[50,-110]].map(([x,y])=>C(x,y,7,gelb,'#9a7a10',1.5)).join('')}${R(40,-170,4,70,gr)}${R(24,-190,44,30,'#fff',gr,2)}${X(46,-168,'2 €','16',rot)}`;
const regeltafel=()=>`${R(-86,-72,172,144,'#2a4a3a',holz,8)}${X(0,-44,'REGELN','20',gelb)}${[-18,10,38].map((y,k)=>L(`M-60 ${y}l6 7l12 -14`,'#8ae07a',4)+L(`M-34 ${y}H${k==1?40:58}`,'#fff',4)).join('')}${P('M58 46q-6 -8 -11 -2q-2 6 11 13q13 -7 11 -13q-5 -6 -11 2Z','#e85a7a')}`;
const notenstaender=()=>`${sch(50)}${L('M0 -100V-10M-36 0L0 -14L36 0',gr,5)}${P('M-56 -186H56L48 -100H-48Z',gr)}${R(-48,-180,96,74,'#fff','#bbb',1)}${[-166,-150,-134,-118].map(y=>L(`M-42 ${y}H42`,'#888',1.5)).join('')}${U('rbnote',-40,-176,22,'#111')}${U('rbnote',-6,-164,22,'#111')}${U('rbnote',24,-172,22,'#111')}`;
const brezelstand=()=>`${sch(90)}${C(-60,-10,14,gr)}${C(60,-10,14,gr)}${R(-86,-90,172,72,'#e8c890',dk,3)}${R(-86,-100,172,12,holz,dk,2)}${[-56,-20,16,52].map(x=>U('rbbrezel',x-16,-132,32,'#a8602a')).join('')}${L('M-80 -100V-176M80 -100V-176',dk,5)}${P('M-96 -176H96L86 -156H-86Z',rot)}${E(0,-196,20,12,'#fff','#bbb',2)}${R(-14,-194,28,10,'#fff','#bbb',1)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#3a2a1a" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#3a2a1a" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #rbg1{transform:scaleX(.12)}.tuer.offen #rbg2{transform:scaleX(.12)}.tuer.offen #rbh{transform:scaleX(.1)}.tuer.offen #rbd1{transform:translateX(-120px)}.tuer.offen #rbd2{transform:translateX(120px)}.tuer.offen #rbf{transform:translateX(200px)}.tuer.offen #rbv1{transform:scaleX(.15)}.tuer.offen #rbv2{transform:scaleX(.15)}</style>`;
function tuerTor(n){
const fl=x=>{let s='';for(let k=0;k<5;k++)s+=P(`M${x+6+k*19} 470V292l7 -12l7 12V470Z`,'#e8d8b0','#6a4a20',2);return s+R(x,322,100,10,holz,dk,2)+R(x,424,100,10,holz,dk,2);};
return`${E(320,400,80,96,'#3a7a2a','#2a5a1a',3)}${E(680,400,80,96,'#3a7a2a','#2a5a1a',3)}${R(400,200,200,270,'#bfe0f8')}${R(400,380,200,90,'#7ab848')}${P('M470 470L490 380H510L530 470Z','#d8c090')}${R(450,306,100,74,creme,fw,3)}${P('M440 306L500 266L560 306Z','#b04a30')}${R(490,340,20,40,'#7a4a20')}${[420,440,570,585].map((x,k)=>C(x,420+k%2*14,7,['#e85a7a',gelb][k%2])).join('')}${R(370,220,30,250,'#b8a898','#6a5a4a',3)}${R(600,220,30,250,'#b8a898','#6a5a4a',3)}${R(364,208,42,16,'#8a8078')}${R(594,208,42,16,'#8a8078')}
   <g id="rbg1" class="tb" style="transform-origin:400px 380px">${fl(400)}</g>
   <g id="rbg2" class="tb" style="transform-origin:600px 380px">${fl(500)}</g>
   <g class="tb pl">${sPl(n,370)}</g>`;
}
function tuerHinten(n){
let b='';for(let k=1;k<6;k++)b+=`M${410+k*30} 190V470`;
return`${R(380,160,240,310,'#8a5a30',dk,5)}${R(410,190,180,280,'#cfe8d0')}${[[440,330],[500,300],[560,330]].map(([x,y])=>P(`M${x-34} ${y+70}L${x} ${y-40}L${x+34} ${y+70}Z`,'#2a6a3a')).join('')}${R(410,400,180,70,'#6a9a4a')}${P('M480 470L494 400H506L520 470Z','#a8905a')}${R(370,150,260,18,'#6a3a18')}
   <g id="rbh" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#a86a3a',dk,4)}${L(b,'#7a4a20',3)}${P('M500 270q-14 -18 -26 -4q-4 14 26 30q30 -16 26 -30q-12 -14 -26 4Z','#ffe8a0',dk,2)}${R(410,230,60,12,gr)}${R(410,410,60,12,gr)}${C(570,340,8,gelb,dk,2)}</g>
   <g class="tb pl">${sPl(n,380)}</g>`;
}
function tuerDornen(n){
const he=x=>{let s='';for(let k=0;k<16;k++)s+=E(x+20+(k*37)%90,200+(k*53)%260,34,30,['#2a6a2a','#3a7a2a','#1f5a24'][k%3]);let t='';for(let k=0;k<12;k++){const a=x+14+(k*41)%96,c=210+(k*67)%250;t+=`M${a} ${c}l12 -6M${a+20} ${c+10}l-8 -10`;}let b='';for(let k=0;k<6;k++)b+=C(x+24+(k*29)%80,230+(k*71)%220,5,'#d83a5a');return s+L(t,'#6a3a1a',3)+b;};
return`${R(380,170,240,300,'#3a5a3a')}${P('M400 470V300Q400 210 500 210Q600 210 600 300V470Z','#8a8078','#4a4440',4)}${P('M440 470V320Q440 260 500 260Q560 260 560 320V470Z','#2a2420')}${C(500,400,60,'url(#licht)')}${L('M366 470V180Q370 150 400 150M634 470V180Q630 150 600 150M400 150Q500 120 600 150','#5a3a1a',12)}
   <g id="rbd1" class="tb">${he(380)}</g>
   <g id="rbd2" class="tb">${he(500)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerFels(n){
let s='';for(let k=0;k<8;k++)s+=`M470 ${450-k*36}H530`;
return`${P('M340 470L350 210Q380 120 500 110Q620 120 650 210L660 470Z','#5a5048','#2a2420',4)}${R(410,170,180,300,'#1a1410')}${C(500,190,90,'#ffd890','none')}${C(500,190,60,'#ffe8b0')}${L('M470 470V170M530 470V170','#c8a060',5)}${L(s,'#c8a060',6)}${C(640,150,14,'#6a6a70',gr,3)}
   <g id="rbf" class="tb">${P('M400 470V250Q400 166 500 166Q600 166 600 250V470Z',stein,'#4a4440',5)}${L('M440 260L470 300L456 350M560 220L540 280L566 330M480 420L520 400','#5a524a',3)}${C(560,360,16,'none',gr,6)}${L('M576 360Q640 300 640 164','#c8a060',5)}</g>
   <g class="tb pl">${sPl(n,320)}</g>`;
}
function tuerVorhang(n){
const vh=x=>{let f='';for(let k=1;k<5;k++)f+=`M${x+k*20} 196V388`;return R(x,192,100,200,'#b81e2e','#6a0a14',2)+L(f,'#7a0a1a',4);};
return`${R(360,120,280,350,'#c83a3a','#6a1a1a',5)}${R(360,120,280,60,'#8a1a2a')}${X(500,160,'THEATER','26',gelb)}${R(400,190,200,200,'#1a2a5a')}${[[420,210],[470,230],[560,214],[585,250]].map(([x,y])=>C(x,y,3,'#fff6c0')).join('')}${C(500,340,70,'url(#licht)')}${R(470,350,60,40,'#7a4a20')}${spieluhr(500,350,.8)}${U('rbnote',440,260,28,gelb)}${U('rbnote',540,250,24,gelb)}${R(380,390,240,22,gelb,'#8a6a10',2)}${[400,450,500,550,600].map(x=>C(x,440,8,gelb)).join('')}
   <g id="rbv1" class="tb" style="transform-origin:400px 290px">${vh(400)}</g>
   <g id="rbv2" class="tb" style="transform-origin:600px 290px">${vh(500)}</g>
   <g class="tb pl">${sPl(n,300)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'gartentor';
const arten={gartentor:[tuerTor,'Gartentor zu Großmutters Häuschen mit Zahlenschloss'],hintertuer:[tuerHinten,'Hintertür des Häuschens mit Zahlenschloss'],dornentor:[tuerDornen,'Tor in der Dornenhecke mit Zahlenschloss'],felsentuer:[tuerFels,'Felsentür mit Seil vor der Strickleiter mit Zahlenschloss'],vorhang:[tuerVorhang,'Vorhang am Puppentheater mit Zahlenschloss']};
const a=arten[art]||arten.gartentor;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const mensch=(x,y,h,k,hut)=>`${L(`M${x-7} ${y}V${y-30}M${x+7} ${y}V${y-30}`,'#3a3a5a',9)}${R(x-15,y-70,30,42,k)}${C(x,y-82,12,h)}${hut}<g class="rbwk" style="transform-origin:${x+13}px ${y-64}px">${L(`M${x+13} ${y-64}L${x+28} ${y-100}`,k,8)}</g>${L(`M${x-13} ${y-64}L${x-20} ${y-34}`,k,8)}`;
const rudi=(x,y)=>`${L(`M${x-10} ${y}V${y-40}M${x+10} ${y}V${y-40}`,'#7a5a3a',13)}${R(x+4,y-26,10,10,'#5a8a3a')}${P(`M${x-26} ${y-38}Q${x-30} ${y-96} ${x} ${y-98}Q${x+30} ${y-96} ${x+26} ${y-38}Z`,'#3a6ab0')}${L(`M${x-24} ${y-56}H${x+24}M${x-26} ${y-74}H${x+26}`,'#fff',5)}${R(x-16,y-84,32,48,'#fff','#ccc',1)}<g class="rbwk" style="transform-origin:${x+22}px ${y-88}px">${L(`M${x+22} ${y-88}L${x+42} ${y-126}`,'#3a6ab0',10)}${C(x+43,y-130,6,'#f0c8a0')}</g>${L(`M${x-22} ${y-86}L${x-44} ${y-66}`,'#3a6ab0',10)}${C(x,y-114,18,'#f0c8a0')}${P(`M${x-18} ${y-112}Q${x-16} ${y-88} ${x} ${y-90}Q${x+16} ${y-88} ${x+18} ${y-112}Q${x} ${y-102} ${x-18} ${y-112}Z`,'#b0602a')}${C(x,y-112,5,'#e8907a')}${C(x-7,y-120,2.5,'#111')}${C(x+7,y-120,2.5,'#111')}${E(x,y-140,22,13,'#fff','#ccc',2)}${R(x-15,y-136,30,8,'#fff','#ccc',1)}`;
const oma=(x,y)=>`${P(`M${x-24} ${y}L${x-16} ${y-74}H${x+16}L${x+24} ${y}Z`,'#7a5ab0')}${P(`M${x-20} ${y-74}L${x} ${y-50}L${x+20} ${y-74}Z`,'#e8a0c0')}${L(`M${x+14} ${y-66}L${x+40} ${y-58}M${x-14} ${y-66}L${x+28} ${y-56}`,'#7a5ab0',8)}${C(x,y-88,15,'#f0d0b0')}${C(x,y-106,9,'#d8d8e0')}${P(`M${x-15} ${y-92}Q${x} ${y-110} ${x+15} ${y-92}Q${x} ${y-100} ${x-15} ${y-92}Z`,'#d8d8e0')}${C(x-6,y-88,4,'none',gr,1.5)}${C(x+6,y-88,4,'none',gr,1.5)}`;
SZENARIEN.raeuber={
name:"Das Räuber-Rätsel",
symbole:["rbhut","rbsack","rbnote","rbpilz","rbbrezel"],
symbolNamen:["Hut","Sack","Note","Pilz","Brezel"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M30 80V52L36 30H96L90 52V80Z" fill="#b0603a" stroke="#4a2a10" stroke-width="3"/><path d="M30 52H90V80H30Z" fill="#b0603a" stroke="#4a2a10" stroke-width="3"/><rect x="38" y="58" width="44" height="14" fill="#f2c14e"/><circle cx="60" cy="44" r="6" fill="#e85a8a"/><path d="M10 34Q20 30 21 20Q23 8 33 9Q43 10 41 22Q44 28 50 30Q40 36 30 35Q18 36 10 34Z" fill="#4a7a3a" stroke="#2a4a1a" stroke-width="2"/><ellipse cx="98" cy="30" rx="6" ry="5" fill="#7a5ab0"/><path d="M103 29V8Q110 11 114 17" fill="none" stroke="#7a5ab0" stroke-width="3" stroke-linecap="round"/></svg>`,
texte:{
einleitung:"Im kleinen Dorf ist etwas passiert: Die Spieluhr der Großmutter ist verschwunden! Der Räuber Rudi hat sie mitgenommen. Rudi ist kein böser Räuber, sondern ein freundlicher und tollpatschiger. Folgt seinen Spuren über den Dorfplatz, durch Großmutters Häuschen, in den Räuberwald, in die Räuberhöhle und zur Bühne am Marktplatz. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es, die Spieluhr zurückzubringen?",
startKnopf:"Los geht&rsquo;s",
hinweisGeber:"Die Großmutter flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Großmutter schüttelt freundlich den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Kirchturmuhr schlägt!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Spieluhr trotzdem noch finden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Der Räuber Rudi gibt der Großmutter die Spieluhr zurück und sagt: Entschuldigung! Die Spieluhr spielt wieder ihr fröhliches Lied. Rudi bekommt sogar eine ehrliche Arbeit in der Bäckerei. Die Großmutter, Rudi und alle Leute aus dem Dorf klatschen und winken euch zu. Ihr seid echte Spürnasen!"
},
texteDu:{
einleitung:"Im kleinen Dorf ist etwas passiert: Die Spieluhr der Großmutter ist verschwunden! Der Räuber Rudi hat sie mitgenommen. Rudi ist kein böser Räuber, sondern ein freundlicher und tollpatschiger. Folge seinen Spuren über den Dorfplatz, durch Großmutters Häuschen, in den Räuberwald, in die Räuberhöhle und zur Bühne am Marktplatz. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es, die Spieluhr zurückzubringen?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Großmutter schüttelt freundlich den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Spieluhr trotzdem noch finden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Der Räuber Rudi gibt der Großmutter die Spieluhr zurück und sagt: Entschuldigung! Die Spieluhr spielt wieder ihr fröhliches Lied. Rudi bekommt sogar eine ehrliche Arbeit in der Bäckerei. Die Großmutter, Rudi und alle Leute aus dem Dorf klatschen und winken dir zu. Du bist eine echte Spürnase!"
},
einfach:{
name:"Das Räuber-Rätsel",
symbolNamen:["Hut","Sack","Note","Pilz","Brezel"],
texte:{
einleitung:"Die Oma hat eine Spiel-Uhr. Die Spiel-Uhr ist weg! Der Räuber Rudi hat sie mitgenommen. Rudi ist ein netter und lustiger Räuber. Ihr sucht die Spiel-Uhr an fünf Orten. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Rudi gibt die Spiel-Uhr zurück. Die Oma freut sich. Rudi arbeitet jetzt beim Bäcker. Alle winken euch zu!"
},
texteDu:{
einleitung:"Die Oma hat eine Spiel-Uhr. Die Spiel-Uhr ist weg! Der Räuber Rudi hat sie mitgenommen. Rudi ist ein netter und lustiger Räuber. Du suchst die Spiel-Uhr an fünf Orten. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Rudi gibt die Spiel-Uhr zurück. Die Oma freut sich. Rudi arbeitet jetzt beim Bäcker. Alle winken dir zu!"
},
raeume:[
{titel:"Der Dorf-Platz",intro:"Die Sonne geht auf. Auf dem Platz steht ein Brunnen. Die Oma sucht ihre Spiel-Uhr. Das Tor zum Garten ist zu. Findet die Zahlen!",introDu:"Die Sonne geht auf. Auf dem Platz steht ein Brunnen. Die Oma sucht ihre Spiel-Uhr. Das Tor zum Garten ist zu. Finde die Zahlen!",
objekte:[{name:"Zettel-Brett",fund:"Am Brett klebt:"},{name:"Rathaus-Uhr",fund:"An der Uhr klebt:"},{name:"Brunnen",fund:"Am Brunnen liegt:"},{name:"Markt-Stand",fund:"Auf dem Stand liegt:"},{name:"Milch-Kannen",fund:"An der Kanne klebt:"}],
infoObjekte:[{name:"Dorf-Karte",fund:"An der Karte klebt:"},{name:"Weg-Weiser",fund:"Am Schild klebt:"},{name:"Tauben-Haus",fund:"Am Haus klebt:"}]},
{titel:"Das Haus von Oma",intro:"In der Stube ist es warm. Die Uhr tickt. Die Spiel-Uhr ist nicht mehr da. Die Tür hinten ist zu.",
objekte:[{name:"Wand-Uhr",fund:"An der Uhr klebt:"},{name:"Familien-Bilder",fund:"Am Bild klebt:"},{name:"Ofen-Bank",fund:"Auf der Bank liegt:"},{name:"Strick-Korb",fund:"Im Korb liegt:"},{name:"Kommode",fund:"Auf der Kommode liegt:"}],
infoObjekte:[{name:"Stick-Bild",fund:"Am Bild klebt:"},{name:"Schaukel-Stuhl",fund:"Auf dem Stuhl liegt:"},{name:"Tee-Tisch",fund:"Auf dem Tisch liegt:"}]},
{titel:"Der Wald",intro:"Im Wald ist es grün. Es gibt viel Nebel. Am Ast hängt ein Hut. Die Hecke hat ein Tor. Das Tor ist zu.",
objekte:[{name:"Räuber-Hut",fund:"Im Hut liegt:"},{name:"Vogel-Haus",fund:"Am Vogel-Haus klebt:"},{name:"Räuber-Sack",fund:"Im Sack liegt:"},{name:"Pilz-Kreis",fund:"Bei den Pilzen liegt:"},{name:"Fuß-Spuren",fund:"Bei den Spuren liegt:"}],
infoObjekte:[{name:"Tier-Tafel",fund:"An der Tafel klebt:"},{name:"Baum-Stumpf",fund:"Auf dem Stumpf liegt:"},{name:"Ameisen-Haufen",fund:"Am Haufen liegt:"}]},
{titel:"Die Höhle",intro:"Hier wohnt Rudi. Lampen leuchten. Es gibt Säcke mit Äpfeln. Die Tür aus Stein ist zu.",
objekte:[{name:"Rätsel-Schild",fund:"Am Schild klebt:"},{name:"Höhlen-Lampe",fund:"An der Lampe klebt:"},{name:"Apfel-Sack",fund:"Im Sack liegt:"},{name:"Spielzeug-Kiste",fund:"In der Kiste liegt:"},{name:"Hänge-Matte",fund:"In der Matte liegt:"}],
infoObjekte:[{name:"Beute-Liste",fund:"An der Liste klebt:"},{name:"Feuer-Lampe",fund:"Bei der Lampe liegt:"},{name:"Kisten-Stapel",fund:"In der Kiste liegt:"}]},
{titel:"Die Bühne",intro:"Es ist Abend. Bunte Lampen leuchten. Hinter dem Vorhang spielt Musik. Öffnet das letzte Schloss!",introDu:"Es ist Abend. Bunte Lampen leuchten. Hinter dem Vorhang spielt Musik. Öffne das letzte Schloss!",
objekte:[{name:"Theater-Plakat",fund:"Am Plakat klebt:"},{name:"Lampion-Kette",fund:"Am Lampion klebt:"},{name:"Puppen-Ständer",fund:"Bei den Puppen liegt:"},{name:"Zuschauer-Bank",fund:"Auf der Bank liegt:"},{name:"Eintritts-Kasse",fund:"In der Kasse liegt:"}],
infoObjekte:[{name:"Regel-Tafel",fund:"An der Tafel klebt:"},{name:"Noten-Ständer",fund:"Am Ständer klebt:"},{name:"Brezel-Stand",fund:"Am Stand liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Dorfplatz",
intro:"Die Morgensonne scheint auf die bunten Fachwerkhäuser. Am Brunnen gurren die Tauben, und unter der Dorflinde öffnet der erste Marktstand. Da ruft die Großmutter: Meine Spieluhr ist weg! Das Gartentor zu ihrem Häuschen hat ein Zahlenschloss. Findet die Ziffern, um es zu öffnen!",
introDu:"Die Morgensonne scheint auf die bunten Fachwerkhäuser. Am Brunnen gurren die Tauben, und unter der Dorflinde öffnet der erste Marktstand. Da ruft die Großmutter: Meine Spieluhr ist weg! Das Gartentor zu ihrem Häuschen hat ein Zahlenschloss. Finde die Ziffern, um es zu öffnen!",
tuerX:1250,tuerArt:"gartentor",
hintergrund:()=>`${defs('#b0a898','#847c70','#fff0c8')}<linearGradient id="rbH1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ac4ec"/><stop offset="1" stop-color="#ffe2c0"/></linearGradient>${R(0,0,1600,470,'url(#rbH1)')}${C(140,110,44,'#fff3b0')}${C(140,110,220,'url(#licht)')}${[[480,70],[1150,50]].map(([x,y])=>E(x,y,70,20,'#fff')+E(x-30,y-12,34,18,'#fff')+E(x+24,y-14,36,22,'#fff')).join('')}${[[-20,190,180,'#b04a30'],[170,170,230,'#8a3a2a'],[900,190,200,'#c0603a'],[1090,160,180,'#9a4a2a'],[1390,200,230,'#b04a30']].map(([x,w,h,c])=>haus(x,450,w,h,c)).join('')}${baum(640,450,1.4)}${taube(1180,232)}${taube(300,262)}${L('M380 180Q480 230 600 190M1100 230Q1200 270 1300 236','#5a4a3a',2)}${[400,430,460,490,520,560,1120,1150,1190,1230,1270].map((x,k)=>P(`M${x} ${192+Math.abs(k%6-3)*5}l12 0l-6 16Z`,[rot,gelb,'#3a7ad8',gruen][k%4])).join('')}${boden(0)}`,
objekte:[
{name:"Aushangbrett",x:250,y:220,wand:true,by:-80,zeichne:aushang,fund:"Am Aushangbrett klebt:"},
{name:"Rathausuhr",x:650,y:200,wand:true,by:-100,zeichne:rathausuhr,fund:"An der Rathausuhr klebt:"},
{name:"Dorfbrunnen",x:450,boden:650,fuss:4,by:-180,zeichne:brunnen,fund:"Am Rand vom Dorfbrunnen liegt:"},
{name:"Marktstand",x:850,boden:720,fuss:4,by:-200,zeichne:marktstand,fund:"Auf dem Marktstand liegt:"},
{name:"Milchkannen",x:150,boden:700,fuss:4,by:-105,zeichne:milchkannen,fund:"An der Milchkanne klebt:"}
],
infoObjekte:[{name:"Dorfkarte",x:1000,y:240,wand:true,by:-82,zeichne:dorfkarte,fund:"An der Dorfkarte klebt:"},{name:"Wegweiser",x:1050,boden:600,fuss:4,by:-235,zeichne:wegweiser,fund:"Am Wegweiser klebt:"},{name:"Taubenhaus",x:1450,boden:740,fuss:4,by:-255,zeichne:taubenhaus,fund:"Am Taubenhaus klebt:"}]},
{titel:"Großmutters Häuschen",
intro:"In der gemütlichen Stube tickt die Wanduhr, und der Kachelofen wärmt. Auf der Kommode ist ein leerer Platz – dort stand die Spieluhr. Durch das Fenster seht ihr Fußspuren, die in den Wald führen. Die Hintertür ist noch verschlossen. Findet die Ziffern, um sie zu öffnen!",
introDu:"In der gemütlichen Stube tickt die Wanduhr, und der Kachelofen wärmt. Auf der Kommode ist ein leerer Platz – dort stand die Spieluhr. Durch das Fenster siehst du Fußspuren, die in den Wald führen. Die Hintertür ist noch verschlossen. Finde die Ziffern, um sie zu öffnen!",
tuerX:450,tuerArt:"hintertuer",
hintergrund:()=>`${defs('#b8783a','#7a4a20','#ffc880')}${R(0,0,1600,470,'#f0d8b0')}${[...Array(64)].map((_,k)=>C((k%16)*100+50,60+Math.floor(k/16)*90,6,'#d8a878')).join('')}${R(0,0,1600,28,'#7a4a20')}${[300,900,1400].map(x=>R(x-14,0,28,40,'#6a3a18')).join('')}${R(0,370,1600,100,'#b07a48',dk,2)}${[...Array(16)].map((_,k)=>L(`M${k*100+50} 376V466`,'#8a5a30',3)).join('')}${R(70,110,180,170,'#cfe8f8','#7a4a20',8)}${L('M160 110V280M70 195H250','#7a4a20',6)}${[[96,220],[130,250],[200,230]].map(([x,y])=>E(x,y,8,5,'#6a4a2a')).join('')}${P('M60 104H110Q96 200 66 290H60Z','#d84a4a')}${P('M260 104H210Q224 200 254 290H260Z','#d84a4a')}${R(60,280,200,12,holz,dk,2)}${C(160,200,150,'url(#licht)')}${R(940,150,200,300,'#4a9a7a','#2a5a4a',4)}${L('M940 210H1140M940 270H1140M940 330H1140M940 390H1140M990 150V450M1040 150V450M1090 150V450','#2a5a4a',2)}${R(926,136,228,20,'#3a7a5a','#2a5a4a',3)}${R(1010,380,60,50,'#2a2a2a','#1a1a1a',3)}${C(1040,405,50,'url(#licht)')}${R(1016,396,48,28,'#e8803a')}${[600,1300].map(x=>L(`M${x} 28V70`,gr,3)+P(`M${x-28} 92L${x-12} 70H${x+12}L${x+28} 92Z`,'#d8a040')+C(x,110,140,'url(#licht)')).join('')}${boden(1)}`,
objekte:[
{name:"Wanduhr",x:800,y:210,wand:true,by:-125,zeichne:wanduhr,fund:"An der Wanduhr klebt:"},
{name:"Familienbilder",x:1250,y:220,wand:true,by:-66,zeichne:familienbilder,fund:"Hinter einem Familienbild steckt:"},
{name:"Ofenbank mit Katze",x:1000,boden:560,fuss:4,by:-115,zeichne:ofenbank,fund:"Unter der schlafenden Katze liegt:"},
{name:"Strickkorb",x:700,boden:680,fuss:4,by:-125,zeichne:strickkorb,fund:"Im Strickkorb liegt:"},
{name:"Kommode mit leerem Platz",x:150,boden:740,fuss:4,by:-190,zeichne:kommode,fund:"Auf dem leeren Platz der Spieluhr liegt:"}
],
infoObjekte:[{name:"Stickbild",x:1480,y:240,wand:true,by:-75,zeichne:stickbild,fund:"Am Stickbild klebt:"},{name:"Schaukelstuhl",x:1350,boden:700,fuss:4,by:-200,zeichne:schaukelstuhl,fund:"Auf dem Schaukelstuhl liegt:"},{name:"Teetisch",x:1500,boden:600,fuss:4,by:-140,zeichne:teetisch,fund:"Unter der Teekanne liegt:"}]},
{titel:"Der Räuberwald",
intro:"Im Wald ist es still und grün. Zwischen den hohen Bäumen hängt leichter Nebel, und die Sonne malt helle Streifen auf den Boden. An einem Ast baumelt ein Hut – das ist bestimmt Rudis Hut! Die Fußspuren führen zu einer dichten Dornenhecke. Das Tor in der Hecke hat ein Zahlenschloss. Findet die Ziffern, um es zu öffnen!",
introDu:"Im Wald ist es still und grün. Zwischen den hohen Bäumen hängt leichter Nebel, und die Sonne malt helle Streifen auf den Boden. An einem Ast baumelt ein Hut – das ist bestimmt Rudis Hut! Die Fußspuren führen zu einer dichten Dornenhecke. Das Tor in der Hecke hat ein Zahlenschloss. Finde die Ziffern, um es zu öffnen!",
tuerX:800,tuerArt:"dornentor",
hintergrund:()=>`${defs('#5a7a3a','#3a5a2a','#f8ffd0')}<linearGradient id="rbH3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f4a2f"/><stop offset="1" stop-color="#9ac8a0"/></linearGradient>${R(0,0,1600,470,'url(#rbH3)')}${[[200,0],[700,0],[1200,0]].map(([x])=>P(`M${x} 0H${x+90}L${x+260} 470H${x+120}Z`,'rgba(255,255,220,.15)')).join('')}${[40,170,330,520,640,960,1080,1270,1390,1540].map((x,k)=>R(x-18-k%3*6,0,36+k%3*12,470,['#4a3a2a','#5a4a32','#3e3022'][k%3])).join('')}${[...Array(14)].map((_,k)=>E(k*125,30+(k%3)*24,110,60,['#1f5a2a','#2a6a32','#174a22'][k%3])).join('')}${[[200,380],[700,330],[1250,390],[1500,340]].map(([x,y])=>E(x,y,260,28,'rgba(255,255,255,.3)')).join('')}${[...Array(12)].map((_,k)=>E(k*140+40,450,80,36,['#2a6a2a','#3a7a32'][k%2])).join('')}${boden(2)}`,
objekte:[
{name:"Hut am Ast",x:250,y:220,wand:true,by:-100,zeichne:huttast,fund:"Im Hut am Ast steckt:"},
{name:"Vogelnistkasten",x:1150,y:200,wand:true,by:-82,zeichne:nistkasten,fund:"Am Vogelnistkasten klebt:"},
{name:"Räubersack",x:150,boden:700,fuss:4,by:-140,zeichne:raeubersack,fund:"Im Räubersack liegt:"},
{name:"Pilzkreis",x:450,boden:650,fuss:4,by:-70,zeichne:pilzkreis,fund:"Zwischen den Pilzen liegt:"},
{name:"Fußspuren im Matsch",x:1100,boden:720,fuss:4,by:-50,zeichne:fussspuren,fund:"Neben den Fußspuren liegt:"}
],
infoObjekte:[{name:"Tiertafel",x:1480,y:240,wand:true,by:-82,zeichne:tiertafel,fund:"An der Tiertafel klebt:"},{name:"Baumstumpf",x:1300,boden:600,fuss:4,by:-110,zeichne:baumstumpf,fund:"Auf dem Baumstumpf liegt:"},{name:"Ameisenhaufen",x:600,boden:740,fuss:4,by:-135,zeichne:ameisenhaufen,fund:"Neben dem Ameisenhaufen liegt:"}]},
{titel:"Die Räuberhöhle",
intro:"In der Höhle leuchten warme Laternen. Hier wohnt Rudi! Überall stehen Säcke mit Äpfeln und Kisten mit Spielzeug. Rudi ist nicht zu Hause – er übt auf dem Marktplatz für ein Theaterstück. Hinter der Felsentür führt eine Strickleiter nach draußen. Findet die Ziffern, um die Felsentür zu öffnen!",
introDu:"In der Höhle leuchten warme Laternen. Hier wohnt Rudi! Überall stehen Säcke mit Äpfeln und Kisten mit Spielzeug. Rudi ist nicht zu Hause – er übt auf dem Marktplatz für ein Theaterstück. Hinter der Felsentür führt eine Strickleiter nach draußen. Finde die Ziffern, um die Felsentür zu öffnen!",
tuerX:1300,tuerArt:"felsentuer",
hintergrund:()=>`${defs('#7a7064','#4a4238','#ffc870')}${R(0,0,1600,470,'#5a5046')}${P('M0 0H1600V100Q1500 150 1400 96Q1300 160 1180 104Q1060 150 940 100Q820 160 700 104Q580 150 460 100Q340 160 220 104Q110 150 0 110Z','#2e2620')}${[120,300,560,820,1000,1180,1480].map((x,k)=>P(`M${x-16} ${110+k%2*20}L${x} ${170+k%3*24}L${x+16} ${110+k%2*20}Z`,'#3a322a')).join('')}${L('M60 200L120 260L100 340M380 180L420 250M760 220L720 300L760 380M1500 200L1460 280','#3a322a',4)}${[[150,300],[850,280],[1550,300]].map(([x,y])=>C(x,y,200,'url(#licht)')).join('')}${P('M0 470V160Q40 250 30 470Z','#4a4038')}${P('M1600 470V170Q1560 260 1570 470Z','#4a4038')}${[[480,330],[860,340]].map(([x,y])=>R(x,y,90,8,holz,dk,2)+apf(x+20,y-10,10,rot)+apf(x+46,y-10,10,'#8ac040')+C(x+72,y-12,12,'#3a8ae0')).join('')}${boden(3)}`,
objekte:[
{name:"Rätselschild",x:300,y:220,wand:true,by:-110,zeichne:raetselschild,fund:"Am Rätselschild klebt:"},
{name:"Höhlenlaterne",x:700,y:200,wand:true,by:-85,zeichne:hoehlenlaterne,fund:"An der Höhlenlaterne klebt:"},
{name:"Beutesack mit Äpfeln",x:200,boden:700,fuss:4,by:-135,zeichne:apfelsack,fund:"Im Beutesack liegt:"},
{name:"Spielzeugkiste",x:550,boden:640,fuss:4,by:-165,zeichne:spielzeugkiste,fund:"In der Spielzeugkiste liegt:"},
{name:"Hängematte",x:900,boden:720,fuss:4,by:-165,zeichne:haengematte,fund:"In der Hängematte liegt:"}
],
infoObjekte:[{name:"Beuteliste",x:1050,y:240,wand:true,by:-90,zeichne:beuteliste,fund:"An der Beuteliste klebt:"},{name:"Lagerfeuer aus Laternen",x:1050,boden:600,fuss:4,by:-105,zeichne:feuerlaterne,fund:"Neben der Laterne liegt:"},{name:"Kistenstapel",x:1500,boden:740,fuss:4,by:-140,zeichne:kistenstapel,fund:"In der obersten Kiste liegt:"}]},
{titel:"Die Bühne am Marktplatz",
intro:"Es wird Abend. Bunte Lampions leuchten über dem Marktplatz. Auf den Bänken warten die Leute aus dem Dorf auf das Puppentheater. Hinter dem roten Vorhang klingt leise eine Melodie … Findet die Ziffern für das letzte Zahlenschloss!",
introDu:"Es wird Abend. Bunte Lampions leuchten über dem Marktplatz. Auf den Bänken warten die Leute aus dem Dorf auf das Puppentheater. Hinter dem roten Vorhang klingt leise eine Melodie … Finde die Ziffern für das letzte Zahlenschloss!",
tuerX:600,tuerArt:"vorhang",
hintergrund:()=>`${defs('#8a7a8a','#5a4a5a','#ffd890')}<linearGradient id="rbH5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a6a"/><stop offset=".6" stop-color="#c86a7a"/><stop offset="1" stop-color="#ffc07a"/></linearGradient>${R(0,0,1600,470,'url(#rbH5)')}${[[120,40],[380,70],[900,30],[1250,60],[1520,40]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${C(1380,90,30,'#fff6d0')}${[...Array(16)].map((_,k)=>{const x=k*100,h=110+(k*47)%100;return R(x,450-h,94,h,'#4a3a6a')+P(`M${x-4} ${450-h}L${x+47} ${410-h}L${x+98} ${450-h}Z`,'#3a2a5a')+R(x+20,470-h,16,18,'#ffe08a')+R(x+58,470-h,16,18,k%2?'#ffe08a':'#2a2050');}).join('')}${R(860,360,740,110,'#8a5a30',dk,3)}${L('M860 390H1600',dk,2)}${[1000,1250,1500].map(x=>C(x,380,140,'url(#licht)')).join('')}${boden(4)}`,
objekte:[
{name:"Theaterplakat",x:200,y:220,wand:true,by:-100,zeichne:plakat,fund:"Am Theaterplakat klebt:"},
{name:"Lampionkette",x:1000,y:180,wand:true,by:-50,zeichne:lampionkette,fund:"Am grünen Lampion klebt:"},
{name:"Handpuppen-Ständer",x:300,boden:700,fuss:4,by:-205,zeichne:puppenstaender,fund:"Bei den Handpuppen liegt:"},
{name:"Zuschauerbank",x:950,boden:640,fuss:4,by:-110,zeichne:zuschauerbank,fund:"Auf der Zuschauerbank liegt:"},
{name:"Eintrittskasse",x:1250,boden:700,fuss:4,by:-200,zeichne:eintrittskasse,fund:"In der Eintrittskasse liegt:"}
],
infoObjekte:[{name:"Regeltafel",x:1350,y:240,wand:true,by:-85,zeichne:regeltafel,fund:"An der Regeltafel klebt:"},{name:"Notenständer",x:1450,boden:600,fuss:4,by:-195,zeichne:notenstaender,fund:"Am Notenständer klebt:"},{name:"Brezelstand",x:800,boden:740,fuss:4,by:-215,zeichne:brezelstand,fund:"Am Brezelstand liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="rbE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a6a"/><stop offset=".6" stop-color="#c86a8a"/><stop offset="1" stop-color="#ffc87a"/></linearGradient></defs>
   <style>@keyframes rbw{50%{transform:rotate(-30deg)}}@keyframes rbn{from{transform:translateY(0);opacity:1}to{transform:translateY(-170px);opacity:0}}.rbwk{animation:rbw .8s ease-in-out infinite}.rbno{animation:rbn 3s linear infinite}</style>
   <rect width="1000" height="600" fill="url(#rbE)"/>${[[80,50],[260,90],[700,40],[920,100]].map(([x,y])=>C(x,y,3,'#fff6c8')).join('')}
   ${[...Array(10)].map((_,k)=>{const x=k*100,h=90+(k*41)%80;return R(x,400-h,94,h,'#4a3a6a')+P(`M${x-4} ${400-h}L${x+47} ${364-h}L${x+98} ${400-h}Z`,'#3a2a5a')+R(x+30,420-h,16,18,'#ffe08a');}).join('')}
   ${L('M0 110Q250 190 500 130Q750 190 1000 110',gr,2)}${[[80,138,'#e85a4a'],[220,168,gelb],[380,150,'#5ab0e8'],[620,150,'#8ac040'],[780,168,'#e86ab0'],[920,138,gelb]].map(([x,y,c])=>lampion(x,y,c)).join('')}
   ${R(0,400,1000,200,'#6a5a6a')}${R(180,380,640,60,'#8a5a30',dk,3)}${R(180,380,640,10,'#b07a48')}
   ${oma(420,384)}${spieluhr(462,330,.7)}${rudi(540,384)}
   ${[[0,0],[1,1],[2,2]].map(([d,k])=>`<g class="rbno" style="animation-delay:${d}s">${U('rbnote',440+k*24,260-k*18,26,['#fff6c0','#ffd0e0','#d0f0ff'][k])}</g>`).join('')}
   ${mensch(120,560,'#f0c8a0','#3a8a4a',P('M104 474Q120 456 136 474Z','#3a7a3a'))}${mensch(240,580,'#a8704a',gelb,'')}${mensch(760,580,'#e8b890',rot,R(746,472,28,6,'#2a5a9a'))}${mensch(880,560,'#8a5a3a','#5ab0e8','')}
   ${U('rbbrezel',300,200,40,'#f0b060')}${U('rbhut',660,200,40,'#8ac070')}${U('rbsack',830,230,36,'#e8c890')}`
};
})();