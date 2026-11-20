document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-khherz\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 17C-26 0 -20 -19 -7 -16Q-2 -15 0 -9Q2 -15 7 -16C20 -19 26 0 0 17Z\"/></symbol>\n<symbol id=\"sym-khteddy\" viewBox=\"-20 -20 40 40\"><circle cx=\"-11\" cy=\"-12\" r=\"7\" fill=\"currentColor\"/><circle cx=\"11\" cy=\"-12\" r=\"7\" fill=\"currentColor\"/><circle cx=\"0\" cy=\"2\" r=\"15\" fill=\"currentColor\"/><ellipse cx=\"0\" cy=\"8\" rx=\"7\" ry=\"5\" fill=\"#fff\" opacity=\".7\"/><circle cx=\"-5\" cy=\"-2\" r=\"2.2\" fill=\"#fff\"/><circle cx=\"5\" cy=\"-2\" r=\"2.2\" fill=\"#fff\"/></symbol>\n<symbol id=\"sym-khstetho\" viewBox=\"-20 -20 40 40\"><path d=\"M-11 -17V-4Q-11 8 0 8Q11 8 11 -4V-17M0 8V12Q0 18 7 18H9\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><circle cx=\"13\" cy=\"15\" r=\"6\" fill=\"currentColor\"/><circle cx=\"-11\" cy=\"-17\" r=\"3\" fill=\"currentColor\"/><circle cx=\"11\" cy=\"-17\" r=\"3\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-khthermo\" viewBox=\"-20 -20 40 40\"><rect x=\"-5\" y=\"-19\" width=\"10\" height=\"28\" rx=\"5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"/><circle cx=\"0\" cy=\"12\" r=\"8\" fill=\"currentColor\"/><rect x=\"-2\" y=\"-6\" width=\"4\" height=\"16\" fill=\"currentColor\"/><path d=\"M8 -14H13M8 -7H13M8 0H13\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-khheli\" viewBox=\"-20 -20 40 40\"><ellipse cx=\"3\" cy=\"0\" rx=\"13\" ry=\"9\" fill=\"currentColor\"/><path d=\"M-9 -2H-19V3H-9Z\" fill=\"currentColor\"/><path d=\"M-15 -14H19M3 -9V-14M-7 15H15M-2 8V15M10 8V15M-19 -6V4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></symbol>\n</defs>\n</svg>");
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
const gr='#3a4450',bl='#3a8ad8',hb='#bfe4fa',gn='#3aa86a',rt='#e8504a',gb='#f2c14e',og='#f28a1a',pk='#f4a6c0',li='#a88ae0',tb='#b8844a',chrom='#c8ccd4',mg='#5a6070',bunt=[rt,bl,gn,gb,li,og];
const ted=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})">${C(-10,-27,6,c,'#5a3a1a',2)}${C(10,-27,6,c,'#5a3a1a',2)}${E(0,4,15,16,c,'#5a3a1a',2)}${C(0,-16,13,c,'#5a3a1a',2)}${E(0,-11,6,4.5,'#f4dcb0')}${C(-4,-19,1.8,'#2a1a0a')}${C(4,-19,1.8,'#2a1a0a')}${C(0,-12,1.6,'#2a1a0a')}${E(0,6,8,9,'#f4dcb0')}</g>`;
const hase=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${E(-7,-30,5,15,'#fff','#aaa',2)}${E(7,-30,5,15,'#fff','#aaa',2)}${C(0,-8,15,'#fff','#aaa',2)}${C(-5,-10,2,gr)}${C(5,-10,2,gr)}${E(0,-4,3,2,pk)}</g>`;
const stern=(x,y,r,c)=>P(`M${x} ${y-r}L${x+r*.3} ${y-r*.3}L${x+r} ${y-r*.2}L${x+r*.45} ${y+r*.25}L${x+r*.6} ${y+r}L${x} ${y+r*.6}L${x-r*.6} ${y+r}L${x-r*.45} ${y+r*.25}L${x-r} ${y-r*.2}L${x-r*.3} ${y-r*.3}Z`,c,'#c89010',1.5);
const kn=(x,y,l,r)=>[[-l,-r*.6],[-l,r*.6],[l,-r*.6],[l,r*.6]].map(([a,b])=>C(x+a,y+b,r*.7,'#fff8e8','#8a7a5a',2)).join('')+L(`M${x-l} ${y}H${x+l}`,'#fff8e8',r);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const gitter=(ys,sp,f,c,k)=>{let d='';for(const y of ys)d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=sp)d+=`M${800+(x-800)*f} 470L${x} 780`;return L(d,c,k);};
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<6;k++)d+=E(k*290+130,560+(k*71)%160,100,10,'rgba(255,255,255,.4)');return g+gitter([500,540,590,650,720],160,.55,'rgba(150,140,120,.35)',2)+d;}
if(m==1){for(let k=0;k<5;k++)d+=E(560+k*60,560+k*34,7,10,'rgba(255,255,255,.22)')+E(590+k*60,550+k*34,7,10,'rgba(255,255,255,.22)');return g+gitter([510,560,620,700],200,.5,'rgba(190,220,255,.18)',2)+d;}
if(m==2){for(const y of[490,512,538,568,602,640,684,732])d+=`M0 ${y}H1600`;return g+L(d,'rgba(160,110,50,.35)',2)+E(420,640,280,60,'rgba(168,138,224,.3)')+E(1220,660,300,70,'rgba(242,193,78,.35)');}
if(m==3){const ys=[470,500,540,590,650,720,780],q=(x,y)=>(800+(x-800)*(.6+.4*(y-470)/310)).toFixed(1);for(let r=0;r<6;r++)for(let c=0;c<17;c++){if((r+c)%2)continue;const a=-400+c*140,b=a+140,y1=ys[r],y2=ys[r+1];d+=`<polygon points="${q(a,y1)},${y1} ${q(b,y1)},${y1} ${q(b,y2)},${y2} ${q(a,y2)},${y2}" fill="rgba(90,110,130,.18)"/>`;}return g+d;}
return g+gitter([560,680],400,.5,'rgba(0,0,0,.15)',3)+E(700,620,330,110,'none',gb,10)+L('M640 570V670M760 570V670M640 620H760','#fff',16)+L('M0 486H1600','#f2c14e',6);}
const pflanze=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${P('M-40 0L-48 -70H48L40 0Z','#e8e0d0','#8a7a6a',3)}${R(-52,-78,104,12,'#d8ccb8','#8a7a6a',2)}${[[-50,-190],[-20,-230],[20,-220],[50,-180],[0,-160],[-60,-130],[60,-140]].map(([a,b])=>P(`M0 -78Q${a*.3} ${(b-78)/2} ${a} ${b}Q${a*.9} ${b+50} 0 -78Z`,'#4aa84a','#2a6a2a',2)).join('')}</g>`;
const infotafel=()=>`${R(-90,-66,180,132,'#fff','#2a7ab0',4)}${R(-90,-66,180,26,'#2a7ab0')}${X(0,-46,'INFO','20','#fff')}${[[-14,rt],[14,gn],[42,bl]].map(([y,c])=>C(-66,y-6,9,c)+L(`M-48 ${y-6}H34`,'#8a96a0',5)+P(`M50 ${y-14}L68 ${y-6}L50 ${y+2}Z`,c)).join('')}`;
const wanduhr=()=>`${C(0,0,54,'#fff',gn,9)}${[...Array(12)].map((_,k)=>{const a=k*Math.PI/6,s=Math.sin(a),c=Math.cos(a);return L(`M${(s*34).toFixed(1)} ${(c*34).toFixed(1)}L${(s*41).toFixed(1)} ${(c*41).toFixed(1)}`,gr,k%3?2:4);}).join('')}${L('M0 0V-30M0 0L20 10',gr,5)}${C(0,0,4,rt)}`;
const tresen=()=>`${sch(140)}${R(-140,-110,280,110,'#e8f4ee','#5a8a7a',4)}${R(-150,-122,300,16,'#8ac8b0','#4a7a6a',3)}${R(-140,-70,280,8,gn)}${U('khherz',-20,-60,40,rt)}${R(60,-190,64,46,'#2a3440','#8a96a0',3)}${R(66,-184,52,34,'#9ad8f0')}${L('M92 -144V-122','#8a96a0',6)}${P('M-116 -122Q-116 -146 -100 -146Q-84 -146 -84 -122Z',gb,'#8a6a10',2)}${C(-100,-150,4,'#8a6a10')}${R(-40,-150,20,28,hb,'#5a8ab0',2)}${C(-30,-160,10,pk)}${C(-22,-170,7,gb)}`;
const wartestuehle=()=>`${sch(120)}${[[-80,bl],[0,gn],[80,og]].map(([x,c])=>R(x-32,-118,64,56,c,gr,2)+R(x-34,-64,68,14,c,gr,2)+L(`M${x-28} -50V0M${x+28} -50V0`,gr,4)).join('')}${ted(0,-84,1,tb)}`;
const zimmerpflanze=()=>`${sch(60)}${pflanze(0,0,1)}`;
const haendeplakat=()=>`${R(-84,-66,168,132,'#eaf8ff',bl,4)}${P('M-40 50V-6Q-40 -16 -30 -16V-40Q-30 -48 -24 -48Q-18 -48 -18 -40V-20H-14V-46Q-14 -54 -8 -54Q-2 -54 -2 -46V-20H2V-40Q2 -48 8 -48Q14 -48 14 -40V0L24 -12Q32 -18 36 -10L20 24Q10 50 -20 50Z','#f4c8a0','#a0704a',2)}${[[44,-40,10],[60,-14,7],[34,-58,6],[-62,-40,8],[-58,20,11],[56,30,9]].map(([x,y,r])=>C(x,y,r,'rgba(255,255,255,.8)','#7ab8e8',2)).join('')}`;
const spielkiste=()=>`${sch(80)}${R(-74,-70,148,70,gb,'#9a7010',3)}${R(-74,-70,148,14,'#e8a020')}${C(-40,-86,22,rt,'#8a2a1a',2)}${L('M-62 -86H-18','#fff',4)}${R(-8,-108,30,30,bl,gr,2)}${X(7,-86,'A','20','#fff')}${R(26,-96,26,26,gn,gr,2)}${ted(50,-120,.9,tb)}`;
const wasserspender=()=>`${sch(50)}${R(-34,-150,68,150,'#f4f6f8','#8a96a0',3)}${P('M-26 -150V-210Q-26 -226 -10 -226H10Q26 -226 26 -210V-150Z','rgba(120,190,250,.7)','#3a7ab0',3)}${R(-8,-236,16,12,'#3a7ab0')}${R(-12,-110,24,20,'#3a4a5a')}${R(-6,-90,4,10,bl)}${R(4,-90,4,10,rt)}${R(-24,-60,48,6,'#8a96a0')}${[46,58].map((x,k)=>P(`M${x-8} ${-80-k*12}H${x+8}L${x+5} ${-60-k*12}H${x-5}Z`,'#fff','#8a96a0',1.5)).join('')}`;
const leuchtkasten=()=>`${R(-92,-70,184,140,chrom,mg,5)}${R(-80,-58,160,116,'#1a2a44')}${C(0,0,70,'url(#licht)')}${C(-22,-44,9,'none',hb,2)}${C(22,-44,9,'none',hb,2)}${C(0,-30,18,'none',hb,2)}${E(0,16,22,26,'none',hb,2)}${L('M-6 -33h1M6 -33h1M-6 -24Q0 -19 6 -24',hb,3)}${L('M0 -8V36M-12 2Q0 8 12 2M-13 12Q0 18 13 12M-12 22Q0 28 12 22M-20 4L-40 -8M20 4L40 -8M-10 38L-14 54M10 38L14 54','#fff',3)}${[[-40,-8],[40,-8],[-14,54],[14,54]].map(([x,y])=>C(x,y,3.5,'#fff')).join('')}`;
const handbild=()=>`${R(-66,-80,132,160,'#1a2a44','#8a96a0',4)}${R(-22,-90,44,16,'#8a96a0')}${[[-30,-46],[-12,-60],[6,-58],[24,-44]].map(([x,y])=>L(`M${x*.4} 30L${x} ${y+46}M${x} ${y+40}V${y+22}M${x} ${y+17}V${y}`,'#e8f4ff',5)).join('')}${L('M-14 34L-44 6M-47 2L-56 -12','#e8f4ff',5)}${C(-8,42,6,'#e8f4ff')}${C(6,42,6,'#e8f4ff')}${L('M-8 50V74M8 50V74','#e8f4ff',6)}`;
const knochenposter=()=>`${R(-84,-66,168,132,'#fffaf0','#8a6a40',4)}${R(-84,-66,168,10,'#e8a060')}${kn(0,-30,48,14)}${kn(-34,10,28,10)}${kn(38,10,22,9)}${kn(0,44,40,8)}`;
const schutzwand=()=>`${sch(80)}${R(-70,-210,140,190,'#7a8aa8','#3a4a60',4)}${R(-46,-190,92,60,'rgba(190,230,250,.7)','#3a4a60',3)}${L('M-36 -160L-16 -180M-30 -140L4 -174','#fff',3)}${R(-50,-110,100,40,gb,'#8a6a10',2)}${U('khteddy',-16,-106,32,'#8a5a2a')}${R(-80,-24,160,12,'#3a4a60')}${C(-64,-6,9,gr)}${C(64,-6,9,gr)}`;
const roentgentisch=()=>`${sch(130)}${R(-120,-90,240,18,'#e8ecf0',mg,3)}${R(-20,-72,40,72,'#8a96a0','#4a5260',3)}${R(-60,-8,120,8,'#4a5260')}${L('M110 -90V-250H20','#8a96a0',10)}${R(-30,-270,60,40,chrom,'#4a5260',3)}${P('M-22 -230H22L14 -210H-14Z','#e8ecf0','#4a5260',2)}${E(-80,-98,24,9,'#fff',chrom,2)}<g transform="rotate(-90 -30 -108)">${ted(-30,-108,1.05,tb)}</g>${R(-12,-112,80,22,'#a8d8f0','#3a7ab0',2)}`;
const schuerzen=()=>`${sch(60)}${L('M0 0V-220M-60 -220H60M-40 0H40',gr,6)}${[[-40,bl],[0,gn],[40,pk]].map(([x,c])=>L(`M${x} -220V-206`,gr,3)+P(`M${x-18} -206H${x+18}L${x+22} -110H${x-22}Z`,c,gr,2)+C(x,-196,5,'#fff')).join('')}`;
const teddyrollstuhl=()=>`${sch(70)}${C(-20,-40,38,'none',gr,6)}${C(-20,-40,4,gr)}${C(50,-10,10,'none',gr,4)}${L('M-50 -86H30L46 -20M-50 -86V-150M30 -86L40 -110',gr,6)}${R(-48,-96,70,14,bl)}${ted(-6,-118,1.2,tb)}${L('M-22 -132Q-6 -110 10 -128','#fff',6)}`;
const kuschelkorb=()=>`${sch(70)}${ted(-28,-60,1,'#e8c890')}${hase(26,-58,1)}${P('M-64 -56H64L52 0H-52Z','#c8963a','#6a4a10',3)}${L('M-58 -38H58M-54 -20H54','#6a4a10',2)}`;
const fieberkurve=()=>`${R(-90,-66,180,132,'#fff',rt,4)}${L('M-70 -20H76M-70 6H76M-70 26H76','#d8dce4',1.5)}${L('M-70 -46V46H76',gr,3)}${L('M-60 -30L-34 -8L-8 4L18 16L44 24L70 28',rt,4)}${[[-60,-30],[-34,-8],[-8,4],[18,16],[44,24],[70,28]].map(([x,y])=>C(x,y,4,rt)).join('')}${U('khthermo',56,-60,26,bl)}`;
const mobile=()=>`${L('M0 -100V-40M-70 -40H70M-70 -40V-4M70 -40V-14M0 -40V20M-35 20H35M-35 20V36M35 20V46','#8a96a0',2)}${stern(-70,8,14,gb)}${P('M70 -14A22 22 0 1 0 92 12A17 17 0 1 1 70 -14Z',gb,'#c89010',1.5)}${E(0,30,20,10,'#fff','#9ab8d8',2)}${E(-35,46,14,9,pk,'#c86a8a',2)}${P('M-21 46L-12 38V54Z',pk)}${stern(35,58,12,hb)}`;
const essensplakat=()=>`${R(-84,-66,168,132,'#f4fff0',gn,4)}${C(-10,4,50,'#fff','#8a96a0',3)}${P('M-10 4V-46A50 50 0 0 1 40 4Z','#8ad86a')}${P('M-10 4H40A50 50 0 0 1 -10 54Z','#f2a040')}${P('M-10 4V54A50 50 0 0 1 -60 4Z','#e8c070')}${P('M-10 4H-60A50 50 0 0 1 -10 -46Z','#f27a6a')}${R(54,-30,20,50,'#fff','#5a8ab0',2)}${R(54,-14,20,12,hb)}`;
const kinderbett=()=>`${sch(130)}${R(-130,-80,260,30,'#fff','#8a96a0',3)}${L('M-124 -50V0M124 -50V0',gr,6)}${C(-124,0,6,gr)}${C(124,0,6,gr)}${R(-136,-150,16,150,pk,'#a85a7a',3)}${R(120,-118,16,118,pk,'#a85a7a',3)}${E(-90,-90,34,14,'#fff',chrom,2)}${ted(-88,-104,1.1,tb)}${P('M-64 -84Q-60 -112 0 -110H118V-80H-64Z','#8ac8f0','#3a7ab0',2)}${[-30,10,50,90].map(x=>C(x,-96,7,'#fff')).join('')}`;
const buecherregal=()=>`${sch(90)}${R(-90,-130,180,130,'#f2d8a0','#a8743a',4)}${R(-90,-68,180,6,'#a8743a')}${[...Array(8)].map((_,k)=>R(-82+k*20,-122+(k%3)*8,14,52-(k%3)*8,bunt[k%6],gr,1.5)).join('')}${[0,1,2].map(k=>R(-80+k*4,-20-k*14,90,14,bunt[(k+2)%6],gr,1.5)).join('')}${P('M-30 -130L0 -140L30 -130V-150L0 -160L-30 -150Z','#fff','#8a96a0',2)}`;
const spielecke=()=>`${sch(110)}${E(0,-8,110,20,'#a8d8a0','#5a9a5a',3)}${[[-60,-14,bl],[-60,-42,rt],[-60,-70,gb],[-30,-14,gn]].map(([x,y,c])=>R(x-14,y-28,28,28,c,gr,2)).join('')}${C(30,-34,22,'#f2a040','#8a5010',2)}${L('M10 -40Q30 -30 50 -40','#fff',4)}${R(60,-40,46,20,li,gr,2)}${C(70,-18,7,gr)}${C(96,-18,7,gr)}`;
const kinderwaage=()=>`${sch(70)}${R(-60,-22,120,22,'#e8ecf0',mg,3)}${L('M48 -22V-150',gr,6)}${R(26,-190,56,42,'#2a3a4a','#8a96a0',3)}${R(32,-184,44,26,'#9af0c0')}${X(54,-164,'12','18',gr)}${ted(-10,-48,1.3,'#c8945a')}`;
const gitterbett=()=>{let b='';for(let x=-96;x<100;x+=24)b+=`M${x} -122V-58`;return`${sch(110)}${R(-104,-70,208,14,'#fff',chrom,2)}${hase(-50,-70,1.2)}${R(-20,-84,110,20,'#f8d0e0','#c86a8a',2)}${L(b,'#7ab8e8',4)}${R(-110,-130,220,10,'#7ab8e8','#3a7ab0',2)}${R(-110,-58,220,10,'#7ab8e8','#3a7ab0',2)}${L('M-110 -140V0M110 -140V0','#3a7ab0',7)}`;};
const reagenzregal=()=>`${R(-90,-40,180,16,'#c8a070','#6a4a20',3)}${[...Array(6)].map((_,k)=>{const x=-65+k*26,c=bunt[k],h=30+(k%3)*12;return R(x-8,-70,16,104,'rgba(230,245,255,.6)','#7a8a9a',2)+R(x-7,34-h,14,h,c);}).join('')}${R(-90,30,180,16,'#c8a070','#6a4a20',3)}${L('M-84 -24V30M84 -24V30','#6a4a20',5)}`;
const laborkittel=()=>`${R(-60,-80,120,12,'#a8743a','#4a2a10',2)}${C(0,-70,5,gr)}${P('M-14 -66H14L52 -46L62 64H-62L-52 -46Z','#fff','#9aa4ae',2)}${L('M0 -58V64M-14 -66L0 -30L14 -66','#9aa4ae',2)}${R(24,0,24,22,'none','#9aa4ae',2)}${R(30,-6,4,16,bl)}${U('khherz',-44,-24,20,rt)}${[-10,14,38].map(y=>C(-6,y,3,'#9aa4ae')).join('')}`;
const lebewesenposter=()=>`${R(-84,-66,168,132,'#f4fff8','#3aa8a0',4)}${C(-14,0,46,'#e8fff4','#3aa8a0',4)}${L('M18 32L56 58','#3aa8a0',10)}${[[-34,-14,10,gn],[-4,-22,8,li],[-20,18,9,og],[10,8,7,bl]].map(([x,y,r,c])=>C(x,y,r,c)+C(x-3,y-2,1.5,gr)+C(x+3,y-2,1.5,gr)+L(`M${x-3} ${y+3}Q${x} ${y+5} ${x+3} ${y+3}`,gr,1.5)).join('')}${E(58,-38,16,8,gn)}${E(58,-12,8,8,pk)}`;
const mikroskoptisch=()=>`${sch(110)}${R(-110,-110,220,14,'#e8ecf0',mg,3)}${L('M-100 -96V0M100 -96V0','#8a96a0',6)}${R(-30,-124,60,14,gr)}${P('M-6 -124Q-26 -170 -6 -210L10 -206Q-8 -170 14 -124Z',gr)}${R(-22,-152,48,8,chrom)}${P('M-8 -206L-22 -248L-6 -254L8 -212Z','#e8ecf0',gr,2)}${R(-28,-262,24,10,gr)}${E(-72,-114,20,5,'rgba(200,240,200,.8)','#7a9a7a',1.5)}${R(46,-130,44,20,'#fff','#8a96a0',2)}`;
const laborwaage=()=>`${sch(70)}${R(-60,-90,120,90,'#dfe8ee',mg,3)}${R(-50,-72,100,8,'#8a96a0')}${C(30,-40,5,mg)}${R(-56,-112,112,22,'#f4f6f8',mg,3)}${R(-44,-106,44,12,'#9af0c0')}${X(-22,-97,'2,5','11',gr)}${E(16,-114,26,5,chrom,mg,2)}${R(8,-132,16,16,gb)}${R(-50,-190,100,78,'rgba(210,240,255,.4)','#7a8a9a',3)}`;
const zentrifuge=()=>`${sch(80)}${R(-70,-60,140,60,chrom,mg,3)}${C(-56,-4,7,gr)}${C(56,-4,7,gr)}${P('M-64 -60V-100Q-64 -120 -40 -120H40Q64 -120 64 -100V-60Z','#f4f6f8',mg,3)}${E(0,-122,56,14,hb,mg,3)}${[0,60,120,180,240,300].map(a=>C((Math.cos(a*Math.PI/180)*30).toFixed(1),(-122+Math.sin(a*Math.PI/180)*7).toFixed(1),4,bunt[(a/60)%3])).join('')}${R(-50,-96,40,16,'#2a3a4a')}${C(30,-88,7,gn)}`;
const messbecher=()=>`${sch(70)}${L('M-60 -8V-140M60 -8V-140','#8a96a0',5)}${R(-66,-140,132,8,mg)}${R(-66,-72,132,8,mg)}${C(-56,-4,6,gr)}${C(56,-4,6,gr)}${[[-38,-140,40,bl],[0,-140,30,rt],[38,-140,22,gn],[-24,-72,26,gb],[24,-72,36,li]].map(([x,y,h,c])=>P(`M${x-14} ${y}V${y-50}H${x+14}V${y}Z`,'rgba(230,245,255,.6)','#7a8a9a',2)+R(x-13,y-h,26,h,c)+L(`M${x+6} ${y-10}h7M${x+6} ${y-20}h7M${x+6} ${y-30}h7M${x+6} ${y-40}h7`,mg,1.5)).join('')}`;
const kuehlschrank=()=>`${sch(60)}${R(-56,-220,112,220,'#f4f6f8',mg,4)}${R(-46,-208,92,180,'rgba(190,230,250,.5)','#7a8a9a',3)}${[-160,-110,-60].map(y=>R(-46,y,92,4,'#8a96a0')+[-30,-10,10,30].map((x,k)=>R(x-5,y-28,10,28,bunt[k],mg,1)).join('')).join('')}${R(36,-140,6,40,mg)}${X(0,-8,'4 °C','14',bl)}`;
const windsack=()=>{let s='';for(let k=0;k<4;k++){const a=-56+k*30,b=a+30,ha=30-(a+56)*.15,hc=30-(b+56)*.15,da=(a+56)*.15,db=(b+56)*.15;s+=P(`M${a} ${(da-ha).toFixed(1)}L${b} ${(db-hc).toFixed(1)}L${b} ${(db+hc).toFixed(1)}L${a} ${(da+ha).toFixed(1)}Z`,k%2?'#fff':og,'#a04a10',1.5);}return L('M-60 -40V140',gr,6)+C(-60,-42,5,gr)+s;};
const wetterstation=()=>`${L('M0 -70V120',gr,5)}${L('M-40 -70H40M0 -70V-90',gr,3)}${C(-40,-70,9,'#fff',gr,2)}${C(40,-70,9,'#fff',gr,2)}${C(0,-90,9,'#fff',gr,2)}${R(-44,-10,88,60,'#2a3a4a','#8a96a0',3)}${R(-36,-2,72,24,'#9af0c0')}${X(0,16,'18 °C','15',gr)}${L('M-24 38H20M12 32L20 38L12 44',hb,3)}`;
const notrufschild=()=>`${R(-84,-66,168,132,'#fff',rt,6)}${R(-84,-66,168,34,rt)}${X(0,-42,'NOTRUF','20','#fff')}${X(20,30,'112','46',rt)}${P('M-66 -10Q-70 20 -46 44L-36 34L-46 22L-52 26Q-58 12 -54 0L-46 -2L-48 -16Z',gr)}`;
const trage=()=>`${sch(120)}${L('M-90 -64L70 -12M90 -64L-70 -12','#8a96a0',5)}${C(-70,-6,8,gr)}${C(70,-6,8,gr)}${R(-120,-80,240,16,chrom,mg,3)}${E(-90,-90,26,10,'#fff',chrom,2)}${ted(-80,-104,1,'#d8a860')}${R(-60,-100,170,22,'#f2a040','#a8601a',2)}`;
const rucksack=()=>`${sch(60)}${L('M-30 -140Q0 -170 30 -140','#8a2a10',6)}${P('M-50 0V-110Q-50 -140 -20 -140H20Q50 -140 50 -110V0Z','#e8603a','#8a2a10',3)}${R(-40,-70,80,50,'#f27a4a','#8a2a10',2)}${R(-16,-122,32,32,'#fff')}${U('khherz',-14,-120,28,rt)}${L('M-40 -46H40','#ffe080',4)}`;
const funkpult=()=>`${sch(100)}${L('M0 -140V-120','#8a96a0',6)}${R(-40,-200,80,60,'#1a2a3a','#8a96a0',3)}${R(-34,-194,68,48,'#6ab8e8')}${L('M-30 -160Q-10 -180 10 -164T30 -176','#fff',2)}${C(10,-170,8,'#fff')}${X(10,-165,'H','12',rt)}${R(-100,-90,200,90,'#5a6a7a','#2a3440',4)}${P('M-100 -90L-80 -120H80L100 -90Z','#3a4a5a','#2a3440',3)}${R(-70,-116,50,22,'#9af0c0')}${[0,1,2].map(k=>C(10+k*20,-104,6,[rt,gb,gn][k])).join('')}${L('M62 -118Q76 -150 90 -118','#2a2a30',4)}${C(62,-116,7,'#2a2a30')}${C(90,-116,7,'#2a2a30')}`;
const helmregal=()=>`${sch(80)}${L('M-70 -8V-170M70 -8V-170',gr,5)}${R(-76,-90,152,8,mg)}${R(-76,-170,152,8,mg)}${[[-36,-90,'#fff'],[34,-90,gb],[-30,-170,og],[36,-170,bl]].map(([x,y,c])=>P(`M${x-26} ${y}Q${x-28} ${y-44} ${x} ${y-44}Q${x+28} ${y-44} ${x+26} ${y}Z`,c,gr,2)+R(x-20,y-24,32,12,'#2a3a4a')).join('')}`;
const deckenkiste=()=>`${sch(70)}${R(-64,-60,128,60,gn,'#1a5a3a',3)}${[0,1,2,3].map(k=>R(-50+(k%2)*6,-76-k*16,100,16,[pk,hb,gb,li][k],gr,1.5)).join('')}${ted(26,-140,.8,tb)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a3440" stroke="#9af0c0" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a3440" stroke="#9af0c0" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #khg1{transform:translateX(-100px)}.tuer.offen #khg2{transform:translateX(100px)}.tuer.offen #khs{transform:translateX(200px)}.tuer .khgn{opacity:0}.tuer.offen .khgn{opacity:1}.tuer.offen .khrt{opacity:0}.tuer.offen #kht{transform:scaleX(.1)}.tuer.offen #khd{transform:translateY(-240px);opacity:.25}.tuer.offen #khw{transform:rotate(540deg)}.tuer.offen #khh{transform:translateX(-112px)}</style>`;
function tuerGlas(n){
const gl=x=>R(x,180,110,290,'rgba(190,230,250,.5)','#8a9aa8',5)+L(`M${x+16} 230L${x+50} 206M${x+16} 280L${x+76} 236`,'#fff',3)+C(x+55,320,8,gn);
return`${R(360,140,280,330,'#dfe8e4','#5a8a7a',5)}${R(390,180,220,290,'#fdf4dc')}${R(390,380,220,90,'#e8dcc4')}${R(440,220,120,130,'#fff8e8','#c8b898',3)}${C(500,280,90,'url(#licht)')}${pflanze(570,430,.4)}${R(400,96,200,36,gn,'#1a6a4a',3)}${X(500,122,'STATIONEN','20','#fff')}${R(480,146,40,12,'#2a3440')}${C(500,152,3,rt)}
   <g id="khg1" class="tb">${gl(390)}</g>
   <g id="khg2" class="tb">${gl(500)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerSchleuse(n){
return`${R(380,170,440,12,'#4a5468')}${R(360,150,280,320,'#8a96a8','#3a4458',6)}${R(390,186,220,284,'#fde8c8')}${R(420,220,160,100,'#fff8e8','#d8c0a0',3)}${C(500,270,90,'url(#licht)')}${R(390,400,220,70,'#e8d0b0')}${R(450,104,100,40,'#2a3440','#8a96a0',3)}<g class="tb khrt">${C(500,124,14,rt)}${C(500,124,26,'rgba(232,80,74,.3)')}</g><g class="tb khgn">${C(500,124,14,'#4ad86a')}${C(500,124,26,'rgba(74,216,106,.3)')}</g>
   <g id="khs" class="tb">${R(390,186,220,284,'#b8c0cc','#4a5468',5)}${R(460,220,80,60,'rgba(190,230,250,.6)','#4a5468',3)}${R(404,300,10,80,'#4a5468')}${R(440,330,120,70,gb,'#8a6a10',3)}${U('khteddy',476,338,48,'#8a5a2a')}</g>
   <g class="tb pl">${sPl(n,430)}</g>`;
}
function tuerTier(n){
const tuerform='M400 470V205Q400 170 435 170H565Q600 170 600 205V470Z';
return`${P('M378 470V200Q378 148 430 148H570Q622 148 622 200V470Z',pk,'#a85a7a',5)}${P(tuerform,'#e8f8e0')}${R(440,200,120,90,'#bfe4fa','#fff',5)}${C(530,230,18,gb)}${R(400,400,200,70,'#c8e8b8')}
   <g id="kht" class="tb" style="transform-origin:400px 300px">${P(tuerform,'#ffe08a','#a8743a',4)}${C(450,226,24,hb,'#a8743a',4)}${L('M528 392L548 262',og,22)}${E(500,398,50,26,og)}${L('M466 412V462M486 418V462M516 418V462M536 412V462',og,9)}${E(558,250,22,13,og)}${L('M552 238L548 224M564 238L566 224','#8a5010',4)}${C(566,248,2.5,gr)}${[[480,392],[510,404],[530,380],[540,330],[536,296],[468,402]].map(([x,y])=>C(x,y,6,'#a8601a')).join('')}${C(418,330,8,'#a8743a')}</g>
   <g class="tb pl">${sPl(n,450)}</g>`;
}
function tuerRad(n){
return`${R(350,140,300,330,'#d0dce2',mg,5)}${R(380,170,240,300,'#f0fff4')}${C(500,250,110,'url(#licht)')}${R(400,300,200,10,'#8a96a0')}${[420,460,500,540,580].map((x,k)=>R(x-8,262,16,38,bunt[k],mg,1.5)).join('')}${R(380,400,240,70,'#dfece6')}${R(420,100,160,34,'#3aa8a0')}${X(500,124,'LABOR','20','#fff')}
   <g id="khd" class="tb">${R(380,170,240,300,'rgba(200,240,250,.55)','#7a8a9a',5)}${L('M400 230L450 190M400 290L500 210','#fff',4)}${R(380,330,240,14,'#9ad8a0')}</g>
   ${R(662,250,30,150,'#8a96a0',mg,2)}<g id="khw" class="tb" style="transform-origin:677px 320px">${C(677,320,30,'none','#c83a2a',6)}${L('M647 320H707M677 290V350M656 299L698 341M698 299L656 341','#c83a2a',4)}${C(677,320,7,mg)}</g>
   <g class="tb pl">${sPl(n,370)}</g>`;
}
function tuerHeli(n){
return`${L('M440 430V470M620 430V470',gr,6)}${L('M380 470H690',gr,7)}${P('M700 330L800 314V338L700 384Z',gb,'#8a6a10',3)}${C(800,324,22,'none',gr,4)}${R(500,238,20,34,gr)}${L('M300 236H740',gr,8)}${P('M330 420Q320 300 420 272H600Q680 272 712 340L720 420Z',gb,'#8a6a10',4)}${P('M342 380Q348 304 420 288V380Z','#9ad0f0','#8a6a10',3)}${R(330,394,390,14,rt)}${U('khherz',620,330,44,rt)}${R(450,292,120,124,'#4a5a6a')}${R(462,350,40,50,'#3a8ad8')}${ted(530,380,1,tb)}
   <g id="khh" class="tb">${R(450,292,120,124,gb,'#8a6a10',3)}${R(468,306,84,40,'#9ad0f0','#8a6a10',2)}${R(546,360,14,6,'#8a6a10')}${R(450,394,120,14,rt)}</g>
   <g class="tb pl">${sPl(n,370)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'glas';
const arten={glas:[tuerGlas,'Automatische Glas-Schiebetür mit Zahlenschloss'],schleuse:[tuerSchleuse,'Schwere Tür vom Röntgenraum mit Lampe und Zahlenschloss'],tier:[tuerTier,'Tür mit Giraffe mit Zahlenschloss'],rad:[tuerRad,'Glastür mit Handrad und Zahlenschloss'],heli:[tuerHeli,'Tür vom Rettungshubschrauber mit Zahlenschloss']};
const a=arten[art]||arten.glas;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const mensch=(x,y,h,k,extra)=>`${L(`M${x-7} ${y}V${y-30}M${x+7} ${y}V${y-30}`,'#3a3a5a',9)}${R(x-15,y-70,30,42,k)}${C(x,y-82,12,h)}${extra}<g class="khwk" style="transform-origin:${x+13}px ${y-64}px">${L(`M${x+13} ${y-64}L${x+28} ${y-100}`,k,8)}</g>${L(`M${x-13} ${y-64}L${x-20} ${y-34}`,k,8)}`;
SZENARIEN.krankenhaus={
name:"Das Krankenhaus",
symbole:["khherz","khteddy","khstetho","khthermo","khheli"],
symbolNamen:["Herz","Teddy","Stethoskop","Thermometer","Hubschrauber"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect x="20" y="26" width="80" height="58" fill="#f6faf4" stroke="#3a8ad8" stroke-width="3"/><path d="M14 28L60 6L106 28Z" fill="#3aa86a"/><path d="M60 52C40 40 44 24 54 27Q58 28 60 33Q62 28 66 27C76 24 80 40 60 52Z" fill="#e8504a"/><rect x="50" y="62" width="20" height="22" fill="#8ac8f0" stroke="#3a8ad8" stroke-width="2"/><circle cx="32" cy="42" r="6" fill="#8ac8f0"/><circle cx="88" cy="42" r="6" fill="#8ac8f0"/></svg>`,
texte:{
einleitung:"Willkommen im Krankenhaus! Heute ist Teddy-Tag: Viele Kinder bringen ihre kranken Kuscheltiere mit. Ihr helft den Ärztinnen, Ärzten und Pflegekräften. Ihr kommt zum Empfang, in den Röntgenraum, auf die Kinderstation, ins Labor und auf den Dachlandeplatz. Die Stationsleiterin hat überall Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, macht am Ende alle Teddys wieder gesund. Schafft ihr es?",
startKnopf:"Los geht&rsquo;s",
hinweisGeber:"Die Stationsleiterin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Stationsleiterin schüttelt freundlich den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Schichtende im Krankenhaus!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und das Krankenhaus trotzdem noch ganz erkunden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Alle Teddys und alle Kinder sind wieder gesund. Die Ärztinnen, Ärzte und Pflegekräfte winken euch fröhlich zu, und der Rettungshubschrauber fliegt los in den Regenbogen. Ihr seid jetzt echte Krankenhaus-Profis!"
},
texteDu:{
einleitung:"Willkommen im Krankenhaus! Heute ist Teddy-Tag: Viele Kinder bringen ihre kranken Kuscheltiere mit. Du hilfst den Ärztinnen, Ärzten und Pflegekräften. Du kommst zum Empfang, in den Röntgenraum, auf die Kinderstation, ins Labor und auf den Dachlandeplatz. Die Stationsleiterin hat überall Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, macht am Ende alle Teddys wieder gesund. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Stationsleiterin schüttelt freundlich den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und das Krankenhaus trotzdem noch ganz erkunden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Alle Teddys und alle Kinder sind wieder gesund. Die Ärztinnen, Ärzte und Pflegekräfte winken dir fröhlich zu, und der Rettungshubschrauber fliegt los in den Regenbogen. Du bist jetzt ein echter Krankenhaus-Profi!"
},
einfach:{
name:"Das Kranken-Haus",
symbolNamen:["Herz","Teddy","Hör-Rohr","Fieber-Messer","Hubschrauber"],
texte:{
einleitung:"Ihr seid im Kranken-Haus. Heute ist Teddy-Tag. Kinder bringen ihre kranken Teddys mit. Ihr seht fünf Orte: den Empfang, den Röntgen-Raum, die Kinder-Station, das Labor und das Dach. Die Chefin der Station hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende sind alle Teddys gesund. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Alle Teddys sind gesund. Der Hubschrauber fliegt los. Alle winken euch zu!"
},
texteDu:{
einleitung:"Du bist im Kranken-Haus. Heute ist Teddy-Tag. Kinder bringen ihre kranken Teddys mit. Du siehst fünf Orte: den Empfang, den Röntgen-Raum, die Kinder-Station, das Labor und das Dach. Die Chefin der Station hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende sind alle Teddys gesund. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Alle Teddys sind gesund. Der Hubschrauber fliegt los. Alle winken dir zu!"
},
raeume:[
{titel:"Der Empfang",intro:"Die Halle ist hell. Hier warten Kinder mit ihren Teddys. Die Glas-Tür ist zu. Findet die Zahlen!",introDu:"Die Halle ist hell. Hier warten Kinder mit ihren Teddys. Die Glas-Tür ist zu. Finde die Zahlen!",
objekte:[{name:"Info-Tafel",fund:"An der Tafel klebt:"},{name:"Wand-Uhr",fund:"An der Uhr klebt:"},{name:"Empfangs-Tresen",fund:"Auf dem Tresen liegt:"},{name:"Warte-Stühle",fund:"Auf dem Stuhl liegt:"},{name:"Große Pflanze",fund:"Im Blumen-Topf liegt:"}],
infoObjekte:[{name:"Hände-Plakat",fund:"Am Plakat klebt:"},{name:"Spiel-Kiste",fund:"In der Kiste liegt:"},{name:"Wasser-Spender",fund:"Am Wasser-Spender klebt:"}]},
{titel:"Der Röntgen-Raum",intro:"Das Licht ist leise und blau. Am Leucht-Kasten seht ihr die Knochen von einem Teddy. Röntgen tut nicht weh. Über der Tür ist eine rote Lampe.",introDu:"Das Licht ist leise und blau. Am Leucht-Kasten siehst du die Knochen von einem Teddy. Röntgen tut nicht weh. Über der Tür ist eine rote Lampe.",
objekte:[{name:"Leucht-Kasten",fund:"Am Kasten klebt:"},{name:"Hand-Bild",fund:"Am Bild klebt:"},{name:"Schutz-Wand",fund:"An der Wand klebt:"},{name:"Röntgen-Tisch",fund:"Auf dem Tisch liegt:"},{name:"Schürzen-Ständer",fund:"An der Schürze hängt:"}],
infoObjekte:[{name:"Knochen-Plakat",fund:"Am Plakat klebt:"},{name:"Teddy-Rollstuhl",fund:"Am Rollstuhl klebt:"},{name:"Kuschel-Korb",fund:"Im Korb liegt:"}]},
{titel:"Die Kinder-Station",intro:"Die Wände sind bunt. In den Betten liegen Kinder mit Teddys. An der Tür ist eine Giraffe. Die Tür ist zu.",
objekte:[{name:"Fieber-Tafel",fund:"An der Tafel klebt:"},{name:"Mobile",fund:"Am Mobile hängt:"},{name:"Kinder-Bett",fund:"Im Bett liegt:"},{name:"Bücher-Regal",fund:"Im Regal liegt:"},{name:"Spiel-Ecke",fund:"In der Spiel-Ecke liegt:"}],
infoObjekte:[{name:"Essens-Plakat",fund:"Am Plakat klebt:"},{name:"Kinder-Waage",fund:"Auf der Waage liegt:"},{name:"Hasen-Bett",fund:"Im Bett liegt:"}]},
{titel:"Das Labor",intro:"Hier ist alles weiß und sauber. In den Gläsern ist buntes Wasser. Die Glas-Tür hat ein rotes Rad. Die Tür ist zu.",
objekte:[{name:"Röhrchen-Regal",fund:"Im Regal steckt:"},{name:"Labor-Kittel",fund:"Im Kittel steckt:"},{name:"Mikroskop",fund:"Am Mikroskop liegt:"},{name:"Labor-Waage",fund:"Auf der Waage liegt:"},{name:"Schleuder-Maschine",fund:"An der Maschine klebt:"}],
infoObjekte:[{name:"Lupen-Plakat",fund:"Am Plakat klebt:"},{name:"Mess-Becher",fund:"Am Becher klebt:"},{name:"Kühl-Schrank",fund:"Im Kühl-Schrank liegt:"}]},
{titel:"Das Dach",intro:"Ihr seid oben auf dem Dach. Der Himmel ist orange. Der Hubschrauber wartet. Öffnet seine Tür!",introDu:"Du bist oben auf dem Dach. Der Himmel ist orange. Der Hubschrauber wartet. Öffne seine Tür!",
objekte:[{name:"Wind-Sack",fund:"Am Wind-Sack hängt:"},{name:"Wetter-Station",fund:"An der Station klebt:"},{name:"Trage",fund:"Auf der Trage liegt:"},{name:"Not-Rucksack",fund:"Im Rucksack steckt:"},{name:"Funk-Pult",fund:"Auf dem Pult liegt:"}],
infoObjekte:[{name:"Notruf-Schild",fund:"Am Schild klebt:"},{name:"Helm-Regal",fund:"Im Helm liegt:"},{name:"Decken-Kiste",fund:"In der Kiste liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Empfang",
intro:"Durch große Fenster scheint die Sonne in die helle Eingangshalle. Am Empfang begrüßt euch eine freundliche Pflegekraft. Im Wartebereich sitzen Kinder mit ihren Teddys. Die automatische Glas-Schiebetür zu den Stationen hat ein Zahlenschloss. Findet die Ziffern, um sie zu öffnen!",
introDu:"Durch große Fenster scheint die Sonne in die helle Eingangshalle. Am Empfang begrüßt dich eine freundliche Pflegekraft. Im Wartebereich sitzen Kinder mit ihren Teddys. Die automatische Glas-Schiebetür zu den Stationen hat ein Zahlenschloss. Finde die Ziffern, um sie zu öffnen!",
tuerX:1250,tuerArt:"glas",
hintergrund:()=>`${defs('#f0ece4','#d8d0c4','#fffbe8')}<linearGradient id="khH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ac8f0"/><stop offset="1" stop-color="#e0f4fc"/></linearGradient>${R(0,0,1600,470,'#f6faf4')}${R(0,300,1600,170,'#d8efe4')}${R(0,296,1600,8,gn)}${[...Array(8)].map((_,k)=>R(15+k*200,24,170,90,'url(#khH)','#b8c8c0',5)+E(70+k*200,104,40,16,'#7ac87a')+E(130+k*200,108,30,12,'#5aa85a')).join('')}${[200,600,1000,1400].map(x=>R(x-70,0,140,8,'#fff')+C(x,40,160,'url(#licht)')).join('')}${R(360,128,180,36,gn,'#1a6a4a',3)}${X(450,154,'EMPFANG','22','#fff')}${pflanze(1080,470,.7)}${pflanze(1520,470,.8)}${boden(0)}`,
objekte:[
{name:"Informationstafel",x:250,y:220,wand:true,by:-82,zeichne:infotafel,fund:"An der Informationstafel klebt:"},
{name:"Wanduhr",x:650,y:210,wand:true,by:-72,zeichne:wanduhr,fund:"An der Wanduhr klebt:"},
{name:"Wartestühle",x:150,boden:720,fuss:4,by:-160,zeichne:wartestuehle,fund:"Auf einem Wartestuhl liegt:"},
{name:"Empfangstresen",x:450,boden:650,fuss:4,by:-205,zeichne:tresen,fund:"Auf dem Empfangstresen liegt:"},
{name:"Zimmerpflanze",x:850,boden:700,fuss:4,by:-245,zeichne:zimmerpflanze,fund:"Im Blumentopf steckt:"}
],
infoObjekte:[{name:"Plakat zum Händewaschen",x:950,y:240,wand:true,by:-82,zeichne:haendeplakat,fund:"Am Plakat zum Händewaschen klebt:"},{name:"Spielzeugkiste",x:1050,boden:600,fuss:4,by:-160,zeichne:spielkiste,fund:"In der Spielzeugkiste liegt:"},{name:"Wasserspender",x:1450,boden:740,fuss:4,by:-250,zeichne:wasserspender,fund:"Am Wasserspender klebt:"}]},
{titel:"Der Röntgenraum",
intro:"Im Röntgenraum ist das Licht gedämpft und bläulich. Am Leuchtkasten hängt ein Röntgenbild von einem Teddy – man sieht seine Knochen! Keine Sorge: Röntgen tut nicht weh. Über der schweren Tür leuchtet eine rote Lampe. Findet die Ziffern, damit sie grün wird!",
introDu:"Im Röntgenraum ist das Licht gedämpft und bläulich. Am Leuchtkasten hängt ein Röntgenbild von einem Teddy – man sieht seine Knochen! Keine Sorge: Röntgen tut nicht weh. Über der schweren Tür leuchtet eine rote Lampe. Finde die Ziffern, damit sie grün wird!",
tuerX:400,tuerArt:"schleuse",
hintergrund:()=>`${defs('#3a4a6a','#22304a','#c0e0ff')}${R(0,0,1600,470,'#6a7898')}${[...Array(8)].map((_,k)=>R(k*200+8,40,184,250,'#7684a4','#5a6888',3)).join('')}${R(0,300,1600,170,'#5a6888')}${L('M0 300H1600',gb,6)}${L('M0 22H1600','#3a4860',14)}${[650,1300].map(x=>R(x-60,30,120,10,'#e8f4ff')+C(x,60,180,'url(#licht)')).join('')}${[[620,130],[1000,90],[1320,120],[140,110],[960,380],[1540,360]].map(([x,y],k)=>stern(x,y,10+k%3*4,['#fff6b0',hb,pk][k%3])).join('')}${boden(1)}`,
objekte:[
{name:"Leuchtkasten",x:800,y:220,wand:true,by:-85,zeichne:leuchtkasten,fund:"Am Leuchtkasten klebt:"},
{name:"Röntgenbild der Hand",x:1150,y:210,wand:true,by:-105,zeichne:handbild,fund:"Am Röntgenbild der Hand klebt:"},
{name:"Röntgen-Schutzwand",x:150,boden:720,fuss:4,by:-225,zeichne:schutzwand,fund:"An der Röntgen-Schutzwand klebt:"},
{name:"Röntgentisch",x:700,boden:640,fuss:4,by:-285,zeichne:roentgentisch,fund:"Auf dem Röntgentisch liegt:"},
{name:"Schürzenständer",x:1000,boden:720,fuss:4,by:-235,zeichne:schuerzen,fund:"In einer Schutzschürze steckt:"}
],
infoObjekte:[{name:"Knochen-Poster",x:1450,y:230,wand:true,by:-82,zeichne:knochenposter,fund:"Am Knochen-Poster klebt:"},{name:"Teddy im Rollstuhl",x:1280,boden:600,fuss:4,by:-165,zeichne:teddyrollstuhl,fund:"Am Rollstuhl vom Teddy klebt:"},{name:"Kuscheltier-Korb",x:1500,boden:740,fuss:4,by:-115,zeichne:kuschelkorb,fund:"Im Kuscheltier-Korb liegt:"}]},
{titel:"Die Kinderstation",
intro:"Auf der Kinderstation sind die Wände bunt wie ein Regenbogen. In den Betten kuscheln Kinder mit ihren Teddys, und in der Spielecke wird gebaut. Die Tür mit der Giraffe hat ein Zahlenschloss. Findet die Ziffern, um sie zu öffnen!",
introDu:"Auf der Kinderstation sind die Wände bunt wie ein Regenbogen. In den Betten kuscheln Kinder mit ihren Teddys, und in der Spielecke wird gebaut. Die Tür mit der Giraffe hat ein Zahlenschloss. Finde die Ziffern, um sie zu öffnen!",
tuerX:800,tuerArt:"tier",
hintergrund:()=>`${defs('#e8c898','#c89a60','#fff0c0')}${[...Array(16)].map((_,k)=>R(k*100,0,100,470,['#fff4c8','#d8f4e4','#fde0e8','#dcecfc'][k%4])).join('')}${R(0,0,1600,24,'#fff')}${[rt,og,gb,gn,bl,li].map((c,k)=>{const r=170-k*14;return`<path d="M${800-r} 150A${r} ${r} 0 0 1 ${800+r} 150" fill="none" stroke="${c}" stroke-width="14" opacity=".6"/>`;}).join('')}${R(1360,70,200,200,'#bfe4fa','#fff',10)}${C(1500,130,30,'#fff2a0')}${C(1500,130,120,'url(#licht)')}${E(1420,220,40,14,'#fff')}${L('M1460 70V270M1360 170H1560','#fff',6)}${R(0,400,1600,70,'#f8f0e0')}${L('M0 400H1600','#f2a6c0',6)}${[100,500,1100].map(x=>stern(x,60,12,gb)).join('')}${boden(2)}`,
objekte:[
{name:"Fieberkurve",x:250,y:220,wand:true,by:-82,zeichne:fieberkurve,fund:"An der Fieberkurve klebt:"},
{name:"Mobile",x:520,y:170,wand:true,by:-110,zeichne:mobile,fund:"Am Mobile hängt:"},
{name:"Kinderbett",x:200,boden:690,fuss:4,by:-165,zeichne:kinderbett,fund:"Unter dem Kopfkissen im Kinderbett liegt:"},
{name:"Bilderbuch-Regal",x:560,boden:740,fuss:4,by:-175,zeichne:buecherregal,fund:"Im Bilderbuch-Regal steckt:"},
{name:"Spielecke",x:1050,boden:700,fuss:4,by:-115,zeichne:spielecke,fund:"In der Spielecke liegt:"}
],
infoObjekte:[{name:"Plakat zum gesunden Essen",x:1200,y:230,wand:true,by:-82,zeichne:essensplakat,fund:"Am Plakat zum gesunden Essen klebt:"},{name:"Kinderwaage",x:1300,boden:600,fuss:4,by:-205,zeichne:kinderwaage,fund:"Auf der Kinderwaage liegt:"},{name:"Gitterbett mit Hase",x:1480,boden:740,fuss:4,by:-155,zeichne:gitterbett,fund:"Im Gitterbett liegt:"}]},
{titel:"Das Labor",
intro:"Im Labor ist alles weiß und blitzsauber. In Reagenzgläsern leuchtet buntes Wasser, und unter dem Mikroskop sieht man winzige Dinge ganz groß. Die Glastür hinten lässt sich nur mit dem roten Handrad öffnen – und das hat ein Zahlenschloss. Findet die Ziffern!",
introDu:"Im Labor ist alles weiß und blitzsauber. In Reagenzgläsern leuchtet buntes Wasser, und unter dem Mikroskop sieht man winzige Dinge ganz groß. Die Glastür hinten lässt sich nur mit dem roten Handrad öffnen – und das hat ein Zahlenschloss. Finde die Ziffern!",
tuerX:600,tuerArt:"rad",
hintergrund:()=>{let t='';for(let x=0;x<1600;x+=40)t+=`M${x} 300V470`;for(let y=300;y<470;y+=40)t+=`M0 ${y}H1600`;return`${defs('#f4f8fa','#c8d4dc','#e8fcff')}${R(0,0,1600,470,'#eef8fa')}${R(0,300,1600,170,'#e0f0f0')}${L(t,'#c8dcdc',2)}${R(0,0,1600,30,'#d0dce2')}${[250,950,1350].map(x=>R(x-80,30,160,10,'#fff')+C(x,50,170,'url(#licht)')).join('')}${R(1050,40,460,90,'#bfe4fa','#fff',8)}${L('M1203 40V130M1356 40V130','#fff',6)}${R(0,392,1600,12,'#5a6a7a')}${R(0,404,1600,66,'#dfe8ee')}${[[60,rt],[110,bl],[170,gn],[1080,gb],[1140,li],[1450,og],[1510,bl]].map(([x,c])=>P(`M${x-10} 392V366H${x+10}V392Z`,'rgba(230,245,255,.7)','#7a8a9a',2)+R(x-9,376,18,16,c)).join('')}${boden(3)}`;},
objekte:[
{name:"Reagenzglas-Regal",x:250,y:220,wand:true,by:-90,zeichne:reagenzregal,fund:"Im Reagenzglas-Regal steckt:"},
{name:"Laborkittel",x:950,y:230,wand:true,by:-95,zeichne:laborkittel,fund:"In der Tasche vom Laborkittel steckt:"},
{name:"Laborwaage",x:150,boden:700,fuss:4,by:-205,zeichne:laborwaage,fund:"Auf der Laborwaage liegt:"},
{name:"Mikroskop-Tisch",x:1000,boden:650,fuss:4,by:-275,zeichne:mikroskoptisch,fund:"Neben dem Mikroskop liegt:"},
{name:"Zentrifuge",x:1250,boden:720,fuss:4,by:-145,zeichne:zentrifuge,fund:"An der Zentrifuge klebt:"}
],
infoObjekte:[{name:"Poster der kleinen Lebewesen",x:1350,y:230,wand:true,by:-82,zeichne:lebewesenposter,fund:"Am Poster der kleinen Lebewesen klebt:"},{name:"Messbecher-Wagen",x:1500,boden:620,fuss:4,by:-205,zeichne:messbecher,fund:"Am Messbecher-Wagen klebt:"},{name:"Proben-Kühlschrank",x:380,boden:740,fuss:4,by:-235,zeichne:kuehlschrank,fund:"Im Proben-Kühlschrank liegt:"}]},
{titel:"Der Dachlandeplatz",
intro:"Ganz oben auf dem Dach weht ein frischer Wind. Der Abendhimmel leuchtet orange über der Stadt. Auf dem großen H wartet der Rettungshubschrauber. Seine Tür hat das letzte Zahlenschloss. Findet die Ziffern, damit er starten kann!",
introDu:"Ganz oben auf dem Dach weht ein frischer Wind. Der Abendhimmel leuchtet orange über der Stadt. Auf dem großen H wartet der Rettungshubschrauber. Seine Tür hat das letzte Zahlenschloss. Finde die Ziffern, damit er starten kann!",
tuerX:1100,tuerArt:"heli",
hintergrund:()=>`${defs('#9a9aa0','#6a6a72','#ffd090')}<linearGradient id="khA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4a9a"/><stop offset=".6" stop-color="#f0907a"/><stop offset="1" stop-color="#ffd888"/></linearGradient>${R(0,0,1600,470,'url(#khA)')}${[[140,40],[420,70],[760,36],[1520,60]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${C(300,380,70,'#ffe0a0')}${C(300,380,260,'url(#licht)')}${[[700,110],[1250,80]].map(([x,y])=>E(x,y,80,18,'rgba(255,230,220,.7)')+E(x-30,y-12,40,16,'rgba(255,230,220,.7)')).join('')}${[...Array(16)].map((_,k)=>{const x=k*100,h=70+(k*37)%110;return R(x,440-h,90,h,'#5a4a7a')+R(x+16,450-h,14,14,'#ffe08a')+R(x+56,470-h,14,14,k%2?'#ffe08a':'#3a2e5a');}).join('')}${L('M0 420H1600M0 446H1600','#c8ccd4',5)}${[...Array(33)].map((_,k)=>L(`M${k*50} 420V470`,'#c8ccd4',4)).join('')}${boden(4)}`,
objekte:[
{name:"Windsack",x:250,y:200,wand:true,by:-70,zeichne:windsack,fund:"Am Windsack hängt:"},
{name:"Wetterstation",x:600,y:230,wand:true,by:-115,zeichne:wetterstation,fund:"An der Wetterstation klebt:"},
{name:"Fahrbare Trage",x:200,boden:700,fuss:4,by:-150,zeichne:trage,fund:"Auf der fahrbaren Trage liegt:"},
{name:"Notfall-Rucksack",x:480,boden:640,fuss:4,by:-180,zeichne:rucksack,fund:"Im Notfall-Rucksack steckt:"},
{name:"Funkpult",x:800,boden:720,fuss:4,by:-215,zeichne:funkpult,fund:"Auf dem Funkpult liegt:"}
],
infoObjekte:[{name:"Notruf-Schild",x:1500,y:230,wand:true,by:-82,zeichne:notrufschild,fund:"Am Notruf-Schild klebt:"},{name:"Helmregal",x:1500,boden:620,fuss:4,by:-230,zeichne:helmregal,fund:"In einem Helm liegt:"},{name:"Kiste mit Decken",x:1250,boden:740,fuss:4,by:-180,zeichne:deckenkiste,fund:"In der Kiste mit Decken liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="khE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a5ab0"/><stop offset=".55" stop-color="#f4a07a"/><stop offset="1" stop-color="#ffe08a"/></linearGradient><radialGradient id="khS"><stop offset="0" stop-color="#fff4c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff4c0" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes khf{0%{transform:translate(0,0)}25%{transform:translate(0,-40px)}100%{transform:translate(420px,-380px)}}@keyframes khwa{50%{transform:rotate(-30deg)}}@keyframes khr{50%{transform:scaleX(.15)}}.khfl{animation:khf 7s ease-in 1s both}.khwk{animation:khwa .8s ease-in-out infinite}.khro{animation:khr .3s linear infinite;transform-origin:430px 282px}</style>
   <rect width="1000" height="600" fill="url(#khE)"/>${C(820,320,200,'url(#khS)')}${C(820,320,54,'#fff0a0')}
   ${bunt.map((c,j)=>{const r=430-j*18;return`<path d="M${500-r} 440A${r} ${r} 0 0 1 ${500+r} 440" fill="none" stroke="${[rt,og,gb,gn,bl,li][j]}" stroke-width="18" opacity=".7"/>`;}).join('')}
   ${[...Array(10)].map((_,k)=>{const x=k*100,h=50+(k*37)%80;return R(x,430-h,90,h,'#5a4a7a')+R(x+30,446-h,14,14,'#ffe08a');}).join('')}${R(0,430,1000,170,'#7a7a82')}${E(500,520,300,60,'none',gb,8)}${L('M0 432H1000',chrom,6)}
   <g class="khfl">${P('M490 330L600 314V334L500 360Z',gb,'#8a6a10',3)}${C(600,322,18,'none',gr,4)}${R(424,284,12,24,gr)}<g class="khro">${L('M330 282H530',gr,8)}</g>${E(430,340,80,44,gb,'#8a6a10',4)}${P('M356 340Q360 306 410 300V340Z','#9ad0f0')}${R(352,356,160,10,rt)}${U('khherz',440,312,34,rt)}${L('M380 400H490M400 384V400M470 384V400',gr,6)}</g>
   ${mensch(110,570,'#f0c8a0','#fff',U('khstetho',100,488,20,bl))}${ted(150,575,1.1,tb)}${mensch(230,585,'#8a5a3a','#5ab0c8','')}${mensch(340,570,'#e8b890','#fff',R(326,486,28,8,'#3aa86a'))}${hase(380,580,1.1)}
   ${mensch(660,570,'#a8704a','#8ad0a0','')}${ted(700,580,1.1,'#e8c890')}${mensch(780,585,'#f4d0b0','#fff',U('khstetho',770,503,20,rt))}${mensch(890,570,'#6a4a2a','#f4a6c0','')}${ted(935,575,1.1,tb)}
   ${U('khherz',120,330,34,'#ff8a9a')}${U('khherz',300,260,28,'#ff8a9a')}${U('khherz',760,250,30,'#ff8a9a')}${U('khteddy',880,360,34,'#fff6c0')}${U('khstetho',60,420,30,'#fff6c0')}`
};
})();