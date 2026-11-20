document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-zrsanduhr\" viewBox=\"-20 -20 40 40\"><path d=\"M-13 -18H13M-13 18H13\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/><path d=\"M-10 -16H10Q10 -4 2 0Q10 4 10 16H-10Q-10 4 -2 0Q-10 -4 -10 -16Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M-6 -9H6L0 -2ZM0 4L7 14H-7Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-zramphore\" viewBox=\"-20 -20 40 40\"><path d=\"M-4 -18H4V-14Q14 -8 13 2Q12 12 4 17H-4Q-12 12 -13 2Q-14 -8 -4 -14Z\" fill=\"currentColor\"/><path d=\"M-5 -15Q-14 -15 -11 -5M5 -15Q14 -15 11 -5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"/><path d=\"M-11 0H11M-10 6H10\" stroke=\"#fff\" stroke-width=\"2\" opacity=\".6\"/></symbol>\n<symbol id=\"sym-zrfeder\" viewBox=\"-20 -20 40 40\"><path d=\"M16 -19Q-8 -14 -10 8L-4 6Q14 0 16 -19Z\" fill=\"currentColor\"/><path d=\"M-10 8L-17 18\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M14 -16L-7 7\" stroke=\"#fff\" stroke-width=\"1.8\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-zrzahnrad\" viewBox=\"-20 -20 40 40\"><circle r=\"13\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"9\" stroke-dasharray=\"5.1 5.1\"/><circle r=\"10\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"5\"/></symbol>\n<symbol id=\"sym-zrbirne\" viewBox=\"-20 -20 40 40\"><path d=\"M-6 8Q-6 2 -10 -2Q-15 -8 -13 -13Q-9 -20 0 -20Q9 -20 13 -13Q15 -8 10 -2Q6 2 6 8Z\" fill=\"currentColor\"/><rect x=\"-6\" y=\"10\" width=\"12\" height=\"4\" rx=\"1\" fill=\"currentColor\"/><rect x=\"-4\" y=\"15\" width=\"8\" height=\"3\" rx=\"1\" fill=\"currentColor\"/><path d=\"M-3 4V-6L0 -9L3 -6V4\" fill=\"none\" stroke=\"#fff\" stroke-width=\"1.5\" opacity=\".8\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const N=v=>+v.toFixed(1);
const st=(s,k)=>s?` stroke="${s}" stroke-width="${k}"`:'';
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${st(s,k)}/>`;
const C=(x,y,r,f,s,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${st(s,k)}/>`;
const E=(x,y,a,b,f,s,k)=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${f}"${st(s,k)}/>`;
const P=(d,f,s,k)=>`<path d="${d}" fill="${f}"${st(s,k)}/>`;
const PE=(d,f,s,k)=>`<path fill-rule="evenodd" d="${d}" fill="${f}"${st(s,k)}/>`;
const L=(d,s,k)=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${k}" stroke-linecap="round"/>`;
const U=(id,x,y,w,c)=>`<use href="#sym-${id}" x="${x}" y="${y}" width="${w}" height="${w}" color="${c}"/>`;
const X=(x,y,t,g,f)=>`<text x="${x}" y="${y}" font-size="${g}" fill="${f}" font-family="Arial,Helvetica,sans-serif" font-weight="bold" text-anchor="middle">${t}</text>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.3)');
const gold='#f2c14e',mess='#d8a83a',kupfer='#c87a3a',cyan='#5ae0f0',pink='#f06ac8',lila='#9a7af0',marmor='#f8f6f0',mg='#a8a090',holz='#8a5a2a',dh='#4a2a10',ocker='#a8442a',dbr='#5a3a2a',bunt=['#e8504a','#3a8ad8','#3aa86a',gold,lila,'#f28a1a'];
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const lg=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const gitter=(ys,sp,f,c,k)=>{let d='';for(const y of ys)d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=sp)d+=`M${800+(x-800)*f} 470L${x} 780`;return L(d,c,k);};
const ZR=(x,y,r,n,f,s)=>{let d='';for(let k=0;k<n*2;k++){const q=k%2?r*.75:r,a=k*Math.PI/n,b=(k+1)*Math.PI/n;d+=(k?'L':'M')+N(x+Math.cos(a)*q)+' '+N(y+Math.sin(a)*q)+'L'+N(x+Math.cos(b)*q)+' '+N(y+Math.sin(b)*q);}return P(d+'Z',f,s,2)+C(x,y,N(r*.3),s);};
const ZK=(x,y,r)=>ZR(N(x-r*.9),N(y-r*.8),N(r*.36),8,mess,'#6a4a1a')+ZR(N(x+r*.92),N(y+r*.72),N(r*.3),7,kupfer,'#5a2a10')+C(x,y,r,'#2a2a6a',gold,N(r*.12))+C(x,y,N(r*.78),'none',cyan,N(r*.08))+C(x,y,N(r*.58),'none',pink,N(r*.07))+C(x,y,N(r*.38),'#fff8c0')+L(`M${x} ${y}V${N(y-r*.3)}M${x} ${y}L${N(x+r*.22)} ${N(y+r*.1)}`,'#2a2a6a',N(r*.06));
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<26;k++)d+=E((k*137)%1600,490+(k*53)%280,8+k%4*4,4+k%3*2,k%2?'#7a5a3a':'#b8a07a');return g+d+E(800,620,520,90,'rgba(255,220,160,.15)');}
if(m==1){const ys=[470,500,540,590,650,720,780],q=(x,y)=>(800+(x-800)*(.6+.4*(y-470)/310)).toFixed(1);for(let r=0;r<6;r++)for(let c=0;c<17;c++){if((r+c)%2)continue;const a=-400+c*140,b=a+140,y1=ys[r],y2=ys[r+1];d+=`<polygon points="${q(a,y1)},${y1} ${q(b,y1)},${y1} ${q(b,y2)},${y2} ${q(a,y2)},${y2}" fill="rgba(160,150,130,.2)"/>`;}return g+d;}
if(m==2)return g+gitter([500,540,590,650,720],170,.55,'rgba(110,90,60,.35)',3)+E(800,640,360,70,'rgba(160,60,60,.25)');
if(m==3){const ys=[470,490,515,545,580,620,665,715,780];for(let r=0;r<8;r++){d+=`M0 ${ys[r+1]}H1600`;for(let j=0;j<8;j++)d+=`M${(j*230+r*97)%1600} ${ys[r]}V${ys[r+1]}`;}return g+L(d,'rgba(60,30,10,.35)',2);}
return g+gitter([520,580,650,730],160,.5,'rgba(90,224,240,.35)',2)+E(800,640,300,60,'none',lila,6)+E(800,640,220,40,'none',cyan,4);}
const hand=(x,y,c)=>E(x,y+6,11,13,c)+L(`M${x-10} ${y}L${x-18} ${y-12}M${x-5} ${y-6}V${y-24}M${x} ${y-6}V${y-28}M${x+5} ${y-6}V${y-25}M${x+10} ${y-2}V${y-18}`,c,5);
const hoehlenbild=()=>`${P('M-92 -60Q-60 -78 0 -70Q70 -80 94 -50Q104 0 88 54Q40 72 -20 66Q-84 70 -96 40Q-104 -10 -92 -60Z','#d8b08a','#8a6248',4)}${E(-30,-6,30,20,ocker)}${C(-62,-14,14,ocker)}${L('M-72 -6Q-82 14 -74 26M-46 10V34M-36 10V34M-20 10V34M-6 6V30',ocker,6)}${E(44,10,22,11,dbr)}${C(66,0,7,dbr)}${L('M30 18V40M56 18V40M66 -6L60 -26M66 -6L76 -24M60 -26L54 -32M76 -24L82 -30',dbr,4)}${C(50,-42,12,'#e8a030')}`;
const handwand=()=>`${P('M-86 -56Q0 -76 88 -54Q100 0 84 58Q0 74 -84 58Q-100 0 -86 -56Z','#c8986e','#8a6248',4)}${hand(-48,-8,ocker)}${hand(-6,22,'#f4ecd8')}${hand(40,-14,dbr)}${hand(56,34,ocker)}${C(-50,40,6,dbr)}${C(-30,46,4,dbr)}`;
const fellrahmen=()=>`${L('M-80 -70H80M-80 70H80M-70 -80V80M70 -80V80','#6a4a2a',8)}${P('M-62 -60Q0 -50 62 -60Q54 0 62 60Q0 50 -62 60Q-54 0 -62 -60Z','#e8c898','#8a6a4a',2)}${L('M-62 -60L-70 -70M62 -60L70 -70M-62 60L-70 70M62 60L70 70','#8a6a4a',2)}${C(-26,-18,14,'#c8502a')}${P('M30 -34A16 16 0 1 0 30 -2A12 12 0 1 1 30 -34Z',dbr)}${L('M-40 26H40M-30 40H30','#8a5a3a',4)}`;
const fellzelt=()=>`${sch(110)}${P('M-110 0L0 -200L110 0Z','#a8784a','#5a3a1a',4)}${P('M-30 0L0 -110L30 0Z','#3a2a1a')}${L('M-20 -222L10 -190M20 -222L-10 -190','#6a4a2a',6)}${[[-60,-40],[40,-60],[-20,-130],[70,-20],[-80,-14]].map(([x,y])=>E(x,y,10,6,'#7a5230')).join('')}`;
const steintisch=()=>`${sch(120)}${R(-90,-44,40,44,'#8a847a','#5a564e',3)}${R(50,-44,40,44,'#8a847a','#5a564e',3)}${P('M-120 -60Q-110 -90 -40 -94Q60 -98 116 -80Q130 -50 110 -40Q0 -30 -110 -40Z','#9a9488','#5a564e',4)}${P('M-80 -94Q-70 -130 -56 -94Z','#c8b89a','#6a5a40',2)}${P('M-30 -96Q-24 -112 4 -110Q20 -104 10 -96Z','#a8a090','#5a564e',2)}${L('M30 -100L74 -110','#f4ecd8',4)}${C(76,-110,3,'#f4ecd8')}${E(96,-102,18,8,holz,dh,2)}${C(90,-108,4,'#a83a5a')}${C(100,-108,4,'#5a3a8a')}`;
const steinkreis=()=>`${E(0,-6,90,22,'#6a5a48')}${C(0,-60,64,'url(#licht)')}${R(-22,-80,44,60,'#ffd070','#8a5a2a',4)}${P('M-28 -80L0 -104L28 -80Z',holz)}${L('M-12 -64V-30M12 -64V-30',holz,3)}${[...Array(9)].map((_,k)=>{const a=k*Math.PI/4.5;return E(N(Math.cos(a)*80),N(-6+Math.sin(a)*18),16,10,'#a8a090','#5a564e',2);}).join('')}`;
const knochenhuette=()=>`${sch(110)}${P('M-100 0Q-100 -150 0 -150Q100 -150 100 0Z','#8a6a4a','#4a3220',4)}${L('M-90 -10Q-100 -130 -20 -160M90 -10Q100 -130 20 -160M-50 0Q-60 -100 0 -140M50 0Q60 -100 0 -140','#f4ecd8',9)}${P('M-26 0V-50Q0 -76 26 -50V0Z','#3a2a1a')}`;
const beerenkorb=()=>`${sch(60)}${[[-30,-66,'#a83a5a'],[-12,-70,'#5a3a8a'],[8,-66,'#a83a5a'],[26,-70,holz],[40,-64,'#5a3a8a'],[-2,-80,holz]].map(([x,y,c])=>C(x,y,8,c)).join('')}${P('M-56 -60H56L44 0H-44Z','#c8a060','#6a4a1a',3)}${L('M-52 -40H52M-48 -20H48M-30 -60L-24 0M0 -60V0M30 -60L24 0','#8a6a2a',2)}`;
const amph=(x,s,c)=>`<g transform="translate(${x} -10) scale(${s})">${P('M-10 -90H10V-80Q34 -66 32 -36Q30 -10 10 0H-10Q-30 -10 -32 -36Q-34 -66 -10 -80Z',c,'#5a2a10',2)}${L('M-12 -84Q-26 -84 -24 -66M12 -84Q26 -84 24 -66','#5a2a10',4)}${L('M-30 -44H30M-28 -28H28','#2a1a10',4)}${R(-14,-96,28,8,c,'#5a2a10',2)}</g>`;
const tafelGr=()=>`${R(-90,-64,180,128,marmor,mg,4)}${R(-90,-64,180,14,'#5a8ad8')}${X(0,-6,'Α Β Γ Δ','30','#2a4a8a')}${X(0,40,'Ε Ζ Η Θ','30','#2a4a8a')}`;
const mosaik=()=>`${R(-80,-64,160,128,'#e8f4fc','#d8743a',6)}${[...Array(7)].map((_,k)=>L(`M-70 ${-42+k*14}H70`,'rgba(42,138,216,.2)',6)).join('')}${P('M-50 20Q-20 -40 40 -20Q60 -14 66 -4L50 -2Q20 -10 0 10Q-20 30 -50 20Z','#2a6ab8','#1a3a6a',2)}${P('M-50 20L-68 6L-62 30Z','#2a6ab8')}${P('M10 -30L20 -50L26 -24Z','#2a6ab8')}${C(42,-12,3,'#fff')}${L('M-70 50Q-50 40 -30 50T10 50T50 50','#2a8ad8',5)}`;
const olymptafel=()=>`${R(-90,-64,180,128,'#fffdf6',mg,4)}${R(-90,-64,180,14,'#d8743a')}${[...Array(6)].map((_,k)=>E(-40+k*3,-30+k*13,10,5,'#7a9a3a')+E(40-k*3,-30+k*13,10,5,'#7a9a3a')).join('')}${C(0,-26,7,'#2a2a2a')}${L('M0 -18L-4 6M-4 6L-16 26M-4 6L10 24M-2 -12L-16 -2M-2 -12L14 -16','#2a2a2a',5)}`;
const amphoren=()=>`${sch(110)}${R(-110,-10,220,10,'#c8c0b0','#7a7468',2)}${amph(-62,1,'#d8743a')}${amph(0,1.2,'#e8904a')}${amph(64,.9,'#c8602a')}`;
const olive=()=>`${sch(80)}${P('M-16 0Q-6 -60 -24 -110L-10 -114Q4 -70 10 -120L22 -116Q14 -60 16 0Z','#7a5a3a','#4a3220',3)}${[[-60,-150],[0,-180],[60,-150],[-30,-120],[40,-115],[0,-140],[-80,-118],[80,-120]].map(([x,y])=>E(x,y,40,24,'#8aa05a','#5a7030',2)).join('')}${[[-50,-140],[20,-170],[56,-130],[-10,-118]].map(([x,y])=>C(x,y,5,'#3a3a5a')).join('')}`;
const zielband=()=>`${sch(120)}${L('M-110 0V-150M110 0V-150',marmor,10)}${C(-110,-154,8,gold)}${C(110,-154,8,gold)}${P('M-110 -110Q0 -96 110 -110V-96Q0 -82 -110 -96Z','#e8504a')}${X(0,-56,'ZIEL','26','#2a4a8a')}${L('M-130 0H130',marmor,4)}`;
const podest=()=>`${sch(110)}${R(-40,-100,80,100,marmor,mg,3)}${R(-110,-66,70,66,'#e8e4da',mg,3)}${R(40,-46,70,46,'#e8e4da',mg,3)}${X(0,-60,'1','30',mess)}${X(-75,-30,'2','26','#8a96a0')}${X(75,-16,'3','24','#b8743a')}${E(0,-110,24,8,'none','#7a9a3a',6)}`;
const brunnen=()=>`${sch(80)}${P('M-80 -50H80L64 0H-64Z','#f4f0e6',mg,3)}${E(0,-50,80,12,'#7ac8f0',mg,3)}${R(-10,-110,20,60,'#f4f0e6',mg,2)}${E(0,-112,30,8,'#f4f0e6',mg,2)}${L('M0 -116Q-30 -130 -40 -56M0 -116Q30 -130 40 -56','#9ad8f8',4)}`;
const fensterGarten=()=>`${P('M-70 80V-30Q-70 -90 0 -90Q70 -90 70 -30V80Z','#e8d8b8','#9a8060',6)}${P('M-56 70V-26Q-56 -76 0 -76Q56 -76 56 -26V70Z','#bfe8fa')}${R(-56,20,112,50,'#7ac06a')}${[-40,-20,0,20,40].map((x,k)=>L(`M${x} 70V${30-k%2*14}`,'#3a8a3a',4)+C(x,26-k%2*14,7,[gold,'#c87ae0','#fff','#f28a6a',gold][k])).join('')}${L('M0 -76V70M-56 0H56','#9a8060',5)}`;
const pergament=()=>`${R(-74,-70,148,140,'#f8ecc8','#b8986a',3)}${E(-74,0,8,70,'#e8d8a8','#b8986a',2)}${E(74,0,8,70,'#e8d8a8','#b8986a',2)}${R(-56,-54,46,46,'#c83a3a',mess,3)}${X(-33,-18,'A','36','#f2d060')}${L('M0 -46H56M0 -30H56M-56 0H56M-56 16H56M-56 32H40M-56 48H50','#6a5a40',3)}`;
const roemtafel=()=>`${R(-88,-62,176,124,'#4a3a2a',holz,6)}${X(0,-12,'I · V · X','30','#f8ecc8')}${X(0,36,'L · C · M','30','#f2d060')}`;
const schreibpult=()=>`${sch(80)}${L('M-50 0L-40 -90M50 0L40 -90','#6a4020',8)}${P('M-70 -90L70 -120L76 -100L-64 -70Z','#9a6a3a',dh,3)}${P('M-50 -90L40 -108L44 -96L-46 -78Z','#f8ecc8')}${R(50,-136,18,16,'#2a2a4a')}${P('M58 -140Q40 -190 22 -210Q46 -186 62 -142Z','#fff','#8a8a9a',2)}`;
const lesepult=()=>`${sch(70)}${R(-10,-140,20,140,'#6a4020')}${R(-50,-8,100,8,dh)}${P('M-80 -150L0 -170L80 -150V-130L0 -150L-80 -130Z','#7a4a20')}${P('M-76 -154Q-40 -176 -2 -164V-148Q-40 -158 -76 -138Z','#fffaf0','#b8986a',2)}${P('M76 -154Q40 -176 2 -164V-148Q40 -158 76 -138Z','#fffaf0','#b8986a',2)}${L('M-64 -152L-14 -162M-64 -146L-14 -156M14 -162L64 -152M14 -156L64 -146','#8a7a5a',1.5)}`;
const truhe=()=>`${sch(90)}${P('M-80 -70L-90 -140H90L80 -70Z','#6a3a18',dh,3)}${[-50,-20,10,40].map((x,k)=>R(x-6,-104+k%2*8,24,40,'#f8ecc8','#b8986a',2)+R(x,-104+k%2*8,12,4,'#c83a3a')).join('')}${R(-80,-70,160,70,holz,dh,4)}${L('M-80 -40H80M-50 -70V0M50 -70V0',mess,4)}`;
const farbregal=()=>`${sch(80)}${R(-80,-150,160,150,'#9a6a3a',dh,4)}${R(-80,-78,160,8,dh)}${['#c83a3a','#2a6ad8','#3aa86a',gold].map((c,k)=>R(-68+k*36,-108,24,30,c,dh,2)+R(-68+k*36,-36,24,30,bunt[(k+4)%6],dh,2)).join('')}${L('M-46 -108L-38 -136M34 -36L40 -62','#c8a060',3)}`;
const ledlaterne=()=>`${sch(50)}${L('M-36 0L-28 -60M36 0L28 -60','#6a4020',7)}${R(-40,-68,80,12,holz,dh,2)}${C(0,-110,56,'url(#licht)')}${R(-20,-130,40,60,'#fff2b0','#5a4a3a',4)}${P('M-26 -130L0 -150L26 -130Z','#5a4a3a')}${C(0,-158,6,'none','#5a4a3a',3)}${C(0,-100,8,'#fff')}`;
const bauplan=()=>`${R(-90,-64,180,128,'#2a5a9a','#d8e8f8',3)}${L('M-80 -40H80M-80 0H80M-80 40H80M-40 -60V60M0 -60V60M40 -60V60','rgba(255,255,255,.15)',1.5)}${E(0,0,50,16,'none','#fff',3)}${L('M-70 -24H70M-20 -24V-12M20 -24V-12M-10 16L-24 40M10 16L24 40','#fff',3)}${C(-24,44,6,'none','#fff',2)}${C(24,44,6,'none','#fff',2)}${C(-84,-58,5,'#e8504a')}${C(84,-58,5,'#e8504a')}`;
const pendeluhr=()=>`${P('M-46 -80L0 -104L46 -80Z','#6a4020')}${R(-40,-80,80,170,holz,dh,4)}${C(0,-40,30,'#fffaf0',mess,5)}${L('M0 -40V-60M0 -40L14 -32','#2a2a2a',3)}${R(-28,0,56,80,'#5a3a1a')}${L('M0 0V60',mess,3)}${C(0,64,12,mess,'#8a6a1a',2)}`;
const erftafel=()=>`${R(-90,-64,180,128,'#f4e8d0',holz,5)}${R(-90,-64,180,16,kupfer)}${U('zrbirne',-76,-40,44,mess)}${U('zrzahnrad',-22,-40,44,'#6a4a2a')}${U('zrfeder',32,-40,44,'#2a5a9a')}${L('M-70 30H70M-70 46H50','#8a6a4a',4)}`;
const werkbank=()=>`${sch(120)}${R(-120,-90,240,16,'#a8743a','#5a3a1a',3)}${L('M-108 -74V0M108 -74V0','#5a3a1a',8)}${R(-100,-40,200,8,'#7a4a20')}${ZR(-60,-108,18,8,mess,'#6a4a1a')}${ZR(-26,-102,12,7,kupfer,'#6a3a1a')}${L('M10 -96L60 -106',mess,6)}${L('M60 -106L84 -110','#3a3a3a',4)}${P('M90 -90V-118H108V-90Z','#3aa8a0','#1a5a5a',2)}${L('M108 -112L124 -124','#1a5a5a',3)}`;
const dampf=()=>`${sch(100)}${R(-100,-20,200,20,'#6a4a2a','#3a2a10',3)}${R(-80,-90,110,70,kupfer,'#6a3a1a',3)}${E(-80,-55,10,35,'#d8904a','#6a3a1a',3)}${R(-60,-140,24,50,'#5a5a5a','#2a2a2a',2)}${C(-48,-156,12,'#fff')}${C(-36,-176,16,'#fff')}${C(-20,-202,20,'rgba(255,255,255,.8)')}${C(60,-60,40,'none','#5a5a5a',6)}${L('M60 -60L32 -32M60 -60L88 -88M60 -60V-100M60 -60V-20M20 -60H100','#5a5a5a',3)}${L('M30 -60H60',mess,5)}`;
const presse=()=>`${sch(90)}${L('M-60 0V-170M60 0V-170','#6a4020',12)}${R(-70,-180,140,20,'#7a4a20','#3a2a10',2)}${L('M0 -160V-110','#5a5a5a',8)}${L('M-50 -140H50','#5a5a5a',5)}${C(-50,-140,6,mess)}${C(50,-140,6,mess)}${R(-44,-110,88,14,'#5a5a5a')}${R(-70,-70,140,16,'#a8743a','#3a2a10',2)}${R(-40,-90,80,20,'#fffaf0',mg,2)}${X(0,-75,'ABC','14','#2a2a2a')}`;
const birnenkiste=()=>`${sch(70)}${[-36,0,36].map((x,k)=>C(x,-90-k%2*10,28,'url(#licht)')+C(x,-90-k%2*10,16,'#fff2a0','#c8a040',2)+R(x-7,-76-k%2*10,14,14,'#8a8a8a')).join('')}${R(-64,-64,128,64,'#c8904a','#5a3a1a',3)}${L('M-64 -32H64M-30 -64V0M30 -64V0',holz,3)}`;
const globus=()=>`${sch(50)}${R(-30,-10,60,10,'#6a4020')}${L('M0 -10V-44','#6a4020',6)}${P('M-50 -130A56 56 0 0 0 40 -60','none',mess,5)}${C(0,-100,44,'#5ab0e8','#2a5a8a',3)}${P('M-24 -126Q-6 -136 6 -120Q-4 -104 -20 -110Z','#6ab05a')}${P('M8 -96Q30 -100 28 -76Q10 -70 6 -84Z','#6ab05a')}`;
const robo=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${L('M-14 0V-30M14 0V-30','#8a96b0',8)}${R(-30,-90,60,60,'#e8eef8','#6a7aa0',3)}${C(0,-60,10,cyan)}${R(-24,-136,48,40,'#e8eef8','#6a7aa0',3)}${C(-10,-118,6,cyan)}${C(10,-118,6,cyan)}${L('M-8 -106Q0 -100 8 -106','#6a7aa0',2)}${L('M0 -136V-150','#6a7aa0',3)}${C(0,-154,5,pink)}${L('M-30 -80L-48 -50','#8a96b0',7)}<g class="zrwk" style="transform-origin:30px -80px">${L('M30 -80L50 -112','#8a96b0',7)}</g></g>`;
const holo=()=>`${R(-92,-66,184,132,'rgba(90,224,240,.25)',cyan,4)}${L('M-70 40H70',cyan,2)}${[[-60,30],[-30,50],[0,20],[30,60],[60,40]].map(([x,h])=>R(x-10,40-h,20,h,'rgba(154,122,240,.7)')).join('')}${C(50,-34,20,'none',pink,3)}${E(50,-34,20,8,'none',pink,2)}${X(-36,-28,'2026','20','#2a6a8a')}`;
const grosseUhr=()=>`${C(0,0,62,'#fff',lila,10)}${C(0,0,50,'none',cyan,3)}${[...Array(12)].map((_,k)=>{const a=k*Math.PI/6;return C(N(Math.sin(a)*40),N(Math.cos(a)*40),k%3?2.5:5,'#3a3a6a');}).join('')}${L('M0 0V-30M0 0L22 8','#3a3a6a',5)}${C(0,0,5,pink)}`;
const zeitstrahl=()=>`${R(-90,-60,180,120,'#fff',lila,4)}${L('M-76 10H70','#3a3a6a',5)}${P('M70 0L86 10L70 20Z','#3a3a6a')}${[['#b8743a',-64],['#3a8ad8',-30],[holz,4],[mess,38],[cyan,66]].map(([c,x],k)=>L(`M${x} ${k%2?24:-4}V${k%2?44:-30}`,c,4)+C(x,10,9,c,'#fff',2)).join('')}`;
const steuerpult=()=>`${sch(120)}${L('M96 -84L110 -126','#6a7aa0',6)}${C(110,-130,9,pink)}${P('M-110 0V-80L-80 -120H80L110 -80V0Z','#e8eef8','#6a7aa0',4)}${R(-70,-112,80,30,'#1a2a4a')}${X(-30,-90,'1850','20',cyan)}${[[30,'#e8504a'],[54,gold],[78,'#3aa86a']].map(([x,c])=>C(x,-98,8,c)).join('')}${R(-90,-60,180,10,lila)}${[...Array(6)].map((_,k)=>R(-80+k*28,-40,18,12,[cyan,pink,gold][k%3])).join('')}`;
const roboter=()=>`${sch(60)}${robo(0,0,1.3)}`;
const sessel=()=>`${sch(80)}${R(-10,-30,20,30,'#8a96b0')}${R(-50,-8,100,8,'#6a7aa0')}${P('M-70 -40Q-80 -150 0 -160Q80 -150 70 -40Z',lila,'#5a4aa0',4)}${P('M-50 -50Q-56 -130 0 -136Q56 -130 50 -50Z','#e8e4ff')}${R(-60,-60,120,26,pink,'#a83a88',3)}`;
const vitrine=()=>`${sch(80)}${R(-70,-60,140,60,'#c8d0e8','#6a7aa0',3)}${R(-66,-150,132,90,'rgba(200,240,255,.45)','#6a7aa0',3)}${U('zramphore',-60,-126,40,'#d8743a')}${U('zrsanduhr',-20,-126,40,'#6a7aa0')}${U('zrbirne',22,-126,40,gold)}${L('M-50 -140L-30 -120','#fff',3)}`;
const sternentisch=()=>`${sch(80)}${R(-10,-60,20,60,'#8a96b0')}${P('M-60 -70L-40 -150H40L60 -70Z','rgba(90,224,240,.25)')}${E(0,-64,80,16,'#e8eef8','#6a7aa0',3)}${L('M-20 -130L10 -140L24 -110L0 -96L-30 -104Z',cyan,1.5)}${[[-20,-130],[10,-140],[24,-110],[-30,-104],[0,-96]].map(([x,y])=>C(x,y,4,'#fff')).join('')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a2a6a" stroke="${cyan}" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a2a6a" stroke="${gold}" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #zrf1{transform:translateX(-110px)}.tuer.offen #zrf2{transform:translateX(110px)}.tuer.offen #zrs1,.tuer.offen #zrs2{transform:scaleX(.1)}.tuer.offen #zrb{transform:scaleX(.06)}.tuer.offen #zrr{transform:translateX(60px)}.tuer.offen #zrz{transform:translateX(250px) rotate(360deg);opacity:.2}.tuer.offen #zrp{transform:scale(.05);opacity:0}.tuer .fit{opacity:0}.tuer.offen .fit{opacity:1}@keyframes zrg{50%{opacity:.4}}.zrgl{animation:zrg 2s ease-in-out infinite}</style>`;
const glut=(y,r)=>`${C(500,y,140,'url(#licht)')}<g class="zrgl">${ZK(500,y,r)}</g>`;
function tuerFels(n){
return`${R(390,150,220,320,'#2a1a5a')}${glut(290,72)}
   <g id="zrf1" class="tb">${P('M388 470V200Q396 150 470 150H500L480 220L505 290L475 360L500 470Z','#9a7250','#5a3a20',4)}${L('M420 220L450 260M410 380L440 350','#5a3a20',3)}</g>
   <g id="zrf2" class="tb">${P('M500 150H530Q604 150 612 200V470H500L475 360L505 290L480 220Z','#9a7250','#5a3a20',4)}${L('M560 210L580 250M540 400L580 380','#5a3a20',3)}</g>
   ${PE('M340 470V190Q340 100 500 100Q660 100 660 190V470ZM388 470V200Q396 150 470 150H530Q604 150 612 200V470Z','#7a5638','#4a2e18',4)}${E(380,130,30,12,'#7a9a4a')}${E(630,150,24,10,'#7a9a4a')}${ZK(500,124,20)}
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerSaeule(n){
const fl=x=>R(x,182,90,288,'#f4f0e6',mg,3)+L(`M${x+12} 200H${x+78}M${x+12} 450H${x+78}`,'#5a8ad8',4)+R(x+20,240,50,170,'none','#c8c0b0',2)+C(x+(x<500?80:10),330,6,mess);
const sl=x=>R(x-20,182,40,280,'#fffdf6','#b8b0a0',2)+L(`M${x-8} 186V458M${x} 186V458M${x+8} 186V458`,'#d8d2c4',2)+R(x-28,172,56,12,'#f4f0e6',mg,2);
return`${R(410,180,180,290,'#e8f6ff')}${glut(320,70)}
   <g id="zrs1" class="tb" style="transform-origin:410px 320px">${fl(410)}</g>
   <g id="zrs2" class="tb" style="transform-origin:590px 320px">${fl(500)}</g>
   ${sl(390)}${sl(610)}${R(350,160,300,22,marmor,mg,3)}${P('M350 160L500 96L650 160Z',marmor,mg,4)}${ZK(500,136,16)}${R(340,460,320,14,'#e8e2d4',mg,2)}
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerBuch(n){
return`${R(390,170,220,300,'#1a1a3a')}${glut(320,70)}
   <g id="zrb" class="tb" style="transform-origin:500px 320px">${R(400,176,200,294,'#7a4a20','#3a2008',4)}${[230,300,370,440].map((y,r)=>R(404,y,192,8,'#3a2008')+[...Array(9)].map((_,k)=>R(410+k*20,y-46+(k+r)%3*6,16,46-(k+r)%3*6,bunt[(k+r)%5],'#3a2008',1)).join('')).join('')}</g>
   <g id="zrr" class="tb">${R(560,300,90,16,'#9a9a9a','#3a3a3a',2)}${C(566,308,8,mess)}</g>
   ${PE('M360 470V200Q360 120 500 120Q640 120 640 200V470ZM400 470V210Q400 170 500 170Q600 170 600 210V470Z','#c8b490','#8a7450',4)}${R(616,288,40,40,'#6a6a6a','#3a3a3a',2)}${ZK(500,140,16)}
   <g class="tb pl">${sPl(n,400)}</g>`;
}
function tuerRad(n){
return`${R(390,180,220,290,'#2a2040')}${glut(330,72)}
   <g id="zrz" class="tb" style="transform-origin:500px 330px">${ZR(500,330,118,12,kupfer,'#5a2a10')}${C(500,330,86,'#d8a050','#5a2a10',4)}${L('M500 250V410M420 330H580M444 274L556 386M556 274L444 386','#8a5020',10)}${C(500,330,26,mess,'#5a2a10',4)}</g>
   ${PE('M360 470V190Q360 130 420 130H580Q640 130 640 190V470ZM392 470V200Q392 166 426 166H574Q608 166 608 200V470Z','#8a5030',dh,4)}${[[376,190],[624,190],[376,300],[624,300],[376,440],[624,440]].map(([x,y])=>C(x,y,5,mess)).join('')}${ZR(372,140,28,8,mess,'#6a4a1a')}${ZR(632,148,22,7,kupfer,'#5a2a10')}${ZK(500,148,14)}
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerPortal(n){
return`${R(380,150,240,320,'#e8f4ff',lila,6)}${C(500,310,150,'url(#licht)')}${ZK(500,310,112)}
   <g class="tb fit">${P('M500 310m-60 0a60 60 0 1 0 120 0a45 45 0 1 0 -90 0a30 30 0 1 0 60 0','none','#fff',5)}</g>
   <g id="zrp" class="tb" style="transform-origin:500px 310px">${C(500,310,84,'rgba(90,224,240,.6)','#fff',4)}${L('M440 270L560 350M440 350L560 270M500 230V390','rgba(255,255,255,.6)',3)}</g>
   ${R(360,128,280,24,'#c8d0e8','#6a7aa0',3)}${X(500,146,'ZEITPORTAL','16','#5a4aa0')}${R(370,452,260,18,'#c8d0e8','#6a7aa0',3)}${R(372,150,12,302,cyan)}${R(616,150,12,302,cyan)}
   <g class="tb pl">${sPl(n,430)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'felsspalte';
const arten={felsspalte:[tuerFels,'Felsspalte mit Zeitkreis und Zahlenschloss'],saeulentor:[tuerSaeule,'Säulentor mit Zeitkreis und Zahlenschloss'],buecherwand:[tuerBuch,'Drehende Bücherwand mit Riegel und Zahlenschloss'],zahnradtor:[tuerRad,'Zahnrad-Tor mit Zahlenschloss'],portal:[tuerPortal,'Zeitportal mit Zahlenschloss']};
const a=arten[art]||arten.felsspalte;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const mensch=(x,y,h,k,extra)=>`${L(`M${x-7} ${y}V${y-30}M${x+7} ${y}V${y-30}`,'#3a3a5a',9)}${R(x-15,y-70,30,42,k)}${C(x,y-82,12,h)}${extra}<g class="zrwk" style="transform-origin:${x+13}px ${y-64}px">${L(`M${x+13} ${y-64}L${x+28} ${y-100}`,k,8)}</g>${L(`M${x-13} ${y-64}L${x-20} ${y-34}`,k,8)}`;
const rock=(x,y,c)=>P(`M${x-15} ${y-30}L${x-20} ${y}H${x+20}L${x+15} ${y-30}Z`,c);
SZENARIEN.zeitreise={
name:"Die Zeitreise",
symbole:["zrsanduhr","zramphore","zrfeder","zrzahnrad","zrbirne"],
symbolNamen:["Sanduhr","Amphore","Feder","Zahnrad","Glühbirne"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="30" cy="64" r="15" fill="none" stroke="#d8a83a" stroke-width="9" stroke-dasharray="6 5"/><circle cx="94" cy="24" r="11" fill="none" stroke="#c87a3a" stroke-width="8" stroke-dasharray="5 4"/><circle cx="60" cy="45" r="34" fill="#2a2a6a" stroke="#f2c14e" stroke-width="5"/><circle cx="60" cy="45" r="25" fill="none" stroke="#5ae0f0" stroke-width="4"/><circle cx="60" cy="45" r="17" fill="none" stroke="#f06ac8" stroke-width="3"/><circle cx="60" cy="45" r="11" fill="#fff8c0"/><path d="M60 45V37M60 45L66 48" stroke="#2a2a6a" stroke-width="2.5" stroke-linecap="round"/></svg>`,
texte:{
einleitung:"Willkommen im Museum! Hinten im Saal steht eine alte Zeitmaschine. Die Zeitwächterin lädt euch zu einer Zeitreise ein: Ihr besucht die Steinzeit, das alte Griechenland, eine Schreibstube im Kloster, eine Werkstatt voller Erfindungen und zum Schluss die Zeitmaschinen-Zentrale. Jedes Zeitportal hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Portale öffnet, landet sicher wieder in der Gegenwart. Schafft ihr es?",
startKnopf:"Los geht&rsquo;s",
hinweisGeber:"Die Zeitwächterin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Zeitwächterin schüttelt freundlich den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Zeitportal",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Die Zahnräder klicken – aber das Portal bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Sanduhr ist abgelaufen!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Zeitreise trotzdem zu Ende bringen!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Die Zeitmaschine bringt euch sicher zurück ins Museum. Sie glüht noch in allen Farben, und Menschen aus allen Zeiten winken euch fröhlich zu: ein Mensch aus der Steinzeit, eine Griechin, eine Nonne und ein Mönch, eine Erfinderin und ein kleiner Roboter. Ihr seid jetzt echte Zeitreise-Profis!"
},
texteDu:{
einleitung:"Willkommen im Museum! Hinten im Saal steht eine alte Zeitmaschine. Die Zeitwächterin lädt dich zu einer Zeitreise ein: Du besuchst die Steinzeit, das alte Griechenland, eine Schreibstube im Kloster, eine Werkstatt voller Erfindungen und zum Schluss die Zeitmaschinen-Zentrale. Jedes Zeitportal hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Portale öffnet, landet sicher wieder in der Gegenwart. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Zeitwächterin schüttelt freundlich den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Die Zahnräder klicken – aber das Portal bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Zeitreise trotzdem zu Ende bringen!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Die Zeitmaschine bringt dich sicher zurück ins Museum. Sie glüht noch in allen Farben, und Menschen aus allen Zeiten winken dir fröhlich zu: ein Mensch aus der Steinzeit, eine Griechin, eine Nonne und ein Mönch, eine Erfinderin und ein kleiner Roboter. Du bist jetzt ein echter Zeitreise-Profi!"
},
einfach:{
name:"Die Zeit-Reise",
symbolNamen:["Sand-Uhr","Krug","Feder","Zahn-Rad","Glüh-Birne"],
texte:{
einleitung:"Ihr seid im Museum. Dort steht eine Zeit-Maschine. Die Zeit-Wächterin lädt euch ein. Ihr reist in fünf Zeiten: in die Stein-Zeit, zu den alten Griechen, in ein Kloster, in eine Werkstatt und in die Zentrale. Jedes Tor hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende seid ihr wieder im Museum. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Zeit-Tor",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Das Tor bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr seid wieder im Museum. Die Zeit-Maschine leuchtet bunt. Alle winken euch zu!"
},
texteDu:{
einleitung:"Du bist im Museum. Dort steht eine Zeit-Maschine. Die Zeit-Wächterin lädt dich ein. Du reist in fünf Zeiten: in die Stein-Zeit, zu den alten Griechen, in ein Kloster, in eine Werkstatt und in die Zentrale. Jedes Tor hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende bist du wieder im Museum. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Das Tor bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du bist wieder im Museum. Die Zeit-Maschine leuchtet bunt. Alle winken dir zu!"
},
raeume:[
{titel:"Die Höhle aus der Stein-Zeit",intro:"Es ist früh am Morgen. Ihr steht vor einer Höhle. An der Wand sind Tiere gemalt. Hinten im Fels leuchtet ein Zeit-Kreis. Findet die Zahlen!",introDu:"Es ist früh am Morgen. Du stehst vor einer Höhle. An der Wand sind Tiere gemalt. Hinten im Fels leuchtet ein Zeit-Kreis. Finde die Zahlen!",
objekte:[{name:"Tier-Bild",fund:"Am Bild klebt:"},{name:"Hände-Bild",fund:"Am Bild klebt:"},{name:"Fell-Zelt",fund:"Im Zelt liegt:"},{name:"Stein-Tisch",fund:"Auf dem Tisch liegt:"},{name:"Stein-Kreis",fund:"Im Kreis liegt:"}],
infoObjekte:[{name:"Fell-Bild",fund:"Am Fell klebt:"},{name:"Knochen-Hütte",fund:"In der Hütte liegt:"},{name:"Beeren-Korb",fund:"Im Korb liegt:"}]},
{titel:"Das alte Griechen-Land",intro:"Die Sonne scheint. Der Himmel ist blau. Ihr seht weiße Säulen und das Meer. Zwischen zwei Säulen ist ein Tor. Öffnet das Tor!",introDu:"Die Sonne scheint. Der Himmel ist blau. Du siehst weiße Säulen und das Meer. Zwischen zwei Säulen ist ein Tor. Öffne das Tor!",
objekte:[{name:"Buchstaben-Tafel",fund:"An der Tafel klebt:"},{name:"Delfin-Bild",fund:"Am Bild klebt:"},{name:"Krüge",fund:"Im Krug liegt:"},{name:"Oliven-Baum",fund:"Am Baum hängt:"},{name:"Ziel-Band",fund:"Am Band hängt:"}],
infoObjekte:[{name:"Sport-Tafel",fund:"An der Tafel klebt:"},{name:"Sieger-Treppe",fund:"Auf der Treppe liegt:"},{name:"Brunnen",fund:"Am Brunnen liegt:"}]},
{titel:"Die Schreib-Stube",intro:"Hier ist es still. Mönche und Nonnen schreiben Bücher mit der Hand. Kleine Lampen geben Licht. Hinter der Bücher-Wand ist ein Tor. Findet die Zahlen!",introDu:"Hier ist es still. Mönche und Nonnen schreiben Bücher mit der Hand. Kleine Lampen geben Licht. Hinter der Bücher-Wand ist ein Tor. Finde die Zahlen!",
objekte:[{name:"Fenster",fund:"Am Fenster klebt:"},{name:"Schöner Buchstabe",fund:"Am Blatt klebt:"},{name:"Schreib-Tisch",fund:"Auf dem Tisch liegt:"},{name:"Lese-Pult",fund:"Im Buch liegt:"},{name:"Truhe",fund:"In der Truhe liegt:"}],
infoObjekte:[{name:"Zahlen-Tafel",fund:"An der Tafel klebt:"},{name:"Farb-Regal",fund:"Im Regal liegt:"},{name:"Laterne",fund:"An der Laterne klebt:"}]},
{titel:"Die Werkstatt",intro:"Hier tickt und surrt es. Lampen leuchten. Zahn-Räder drehen sich. Das Tor ist ein großes Zahn-Rad. Findet die Zahlen!",introDu:"Hier tickt und surrt es. Lampen leuchten. Zahn-Räder drehen sich. Das Tor ist ein großes Zahn-Rad. Finde die Zahlen!",
objekte:[{name:"Bau-Plan",fund:"Am Plan klebt:"},{name:"Pendel-Uhr",fund:"An der Uhr klebt:"},{name:"Werk-Bank",fund:"Auf der Bank liegt:"},{name:"Dampf-Maschine",fund:"An der Maschine klebt:"},{name:"Druck-Maschine",fund:"In der Maschine liegt:"}],
infoObjekte:[{name:"Erfinder-Tafel",fund:"An der Tafel klebt:"},{name:"Lampen-Kiste",fund:"In der Kiste liegt:"},{name:"Globus",fund:"Am Globus klebt:"}]},
{titel:"Die Zentrale",intro:"Der Raum ist hell. Ihr seht eine Tafel aus Licht und die Stadt. Das letzte Tor summt. Findet die Zahlen! Dann seid ihr wieder im Museum.",introDu:"Der Raum ist hell. Du siehst eine Tafel aus Licht und die Stadt. Das letzte Tor summt. Finde die Zahlen! Dann bist du wieder im Museum.",
objekte:[{name:"Licht-Tafel",fund:"An der Tafel klebt:"},{name:"Runde Uhr",fund:"An der Uhr klebt:"},{name:"Steuer-Pult",fund:"Auf dem Pult liegt:"},{name:"Roboter",fund:"Der Roboter hält:"},{name:"Sessel",fund:"Auf dem Sessel liegt:"}],
infoObjekte:[{name:"Zeit-Strahl",fund:"Am Zeit-Strahl klebt:"},{name:"Glas-Kasten",fund:"Im Kasten liegt:"},{name:"Sternen-Tisch",fund:"Auf dem Tisch liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Steinzeit-Höhle",
intro:"Die Zeitmaschine landet mit einem leisen Summen vor einer großen Höhle. Es ist früher Morgen, und die Sonne geht gerade auf. An den Felswänden haben Menschen der Steinzeit Tiere gemalt. Am Lagerplatz stehen ein Fellzelt und eine Hütte aus Mammutknochen. Hinten in einer Felsspalte leuchtet der Zeitkreis. Findet die Ziffern, damit sich der Fels öffnet!",
introDu:"Die Zeitmaschine landet mit einem leisen Summen vor einer großen Höhle. Es ist früher Morgen, und die Sonne geht gerade auf. An den Felswänden haben Menschen der Steinzeit Tiere gemalt. Am Lagerplatz stehen ein Fellzelt und eine Hütte aus Mammutknochen. Hinten in einer Felsspalte leuchtet der Zeitkreis. Finde die Ziffern, damit sich der Fels öffnet!",
tuerX:1250,tuerArt:"felsspalte",
hintergrund:()=>`${defs('#b8885a','#8a6038','#ffe0b0')}${lg('zrM','#f8a6b0','#ffd0a0','#fff0c0')}${R(0,0,1600,470,'#c8996e')}${[...Array(9)].map((_,k)=>E(k*190+60,150+(k*67)%200,90,50,k%2?'#bc8c62':'#d4a67a')).join('')}${P('M420 340Q408 140 505 116Q602 140 592 340Z','url(#zrM)')}${C(505,300,34,'#fff4b0')}${P('M420 340Q470 280 505 296Q550 266 592 340Z','#8ab870')}${C(505,240,260,'url(#licht)')}${P('M0 0H1600V70L1540 110L1490 70L1420 120L1360 76L1280 104L1200 70L1120 116L1060 72L980 100L900 66L820 110L760 70L680 96L620 64L540 92L480 60L400 104L340 70L260 112L200 72L120 100L60 66L0 90Z','#7a5436')}${R(0,410,1600,60,'#a87a50')}${[80,640,1480].map(x=>P(`M${x-30} 410L${x} 360L${x+30} 410Z`,'#8a6040')).join('')}${boden(0)}`,
objekte:[
{name:"Höhlenmalerei mit Tieren",x:300,y:210,wand:true,by:-92,zeichne:hoehlenbild,fund:"Neben der Höhlenmalerei steckt:"},
{name:"Handabdrücke an der Felswand",x:700,y:200,wand:true,by:-88,zeichne:handwand,fund:"Zwischen den Handabdrücken steckt:"},
{name:"Fellzelt",x:180,boden:690,fuss:4,by:-235,zeichne:fellzelt,fund:"Im Fellzelt liegt:"},
{name:"Steinwerkbank",x:520,boden:720,fuss:4,by:-145,zeichne:steintisch,fund:"Auf der Steinwerkbank liegt:"},
{name:"Steinkreis mit Leuchtlaterne",x:880,boden:650,fuss:4,by:-125,zeichne:steinkreis,fund:"Neben der Leuchtlaterne liegt:"}
],
infoObjekte:[{name:"Gespanntes Fell mit Zeichen",x:1000,y:230,wand:true,by:-92,zeichne:fellrahmen,fund:"Am gespannten Fell hängt:"},{name:"Korb mit Beeren und Nüssen",x:1060,boden:600,fuss:4,by:-100,zeichne:beerenkorb,fund:"Im Korb mit Beeren und Nüssen liegt:"},{name:"Hütte aus Mammutknochen",x:1480,boden:740,fuss:4,by:-175,zeichne:knochenhuette,fund:"In der Hütte aus Mammutknochen liegt:"}]},
{titel:"Das alte Griechenland",
intro:"Die Mittagssonne strahlt vom blauen Himmel. Weiße Säulen glänzen, und hinter dem Tempel glitzert das Meer. Auf der Laufbahn finden gerade Wettläufe statt – wie bei den Olympischen Spielen. Zwischen zwei Säulen wartet das nächste Zeitportal. Findet die Ziffern, damit sich das Säulentor öffnet!",
introDu:"Die Mittagssonne strahlt vom blauen Himmel. Weiße Säulen glänzen, und hinter dem Tempel glitzert das Meer. Auf der Laufbahn finden gerade Wettläufe statt – wie bei den Olympischen Spielen. Zwischen zwei Säulen wartet das nächste Zeitportal. Finde die Ziffern, damit sich das Säulentor öffnet!",
tuerX:450,tuerArt:"saeulentor",
hintergrund:()=>`${defs('#f4efe2','#d8d0c0','#fffbe0')}${lg('zrB','#3a9ae8','#8acbf4','#d8f2ff')}${R(0,0,1600,470,'url(#zrB)')}${C(1250,70,46,'#fff8b0')}${C(1250,70,220,'url(#licht)')}${E(300,60,90,18,'#fff')}${E(600,110,70,14,'#fff')}${R(0,320,1600,150,'#2a8ad8')}${L('M40 350H160M260 380H400M520 340H600',marmor,3)}${P('M0 390Q200 300 420 350Q560 320 660 360V470H0Z','#a8c070')}${R(100,270,180,12,marmor)}${[...Array(5)].map((_,k)=>R(110+k*38,282,14,56,marmor)).join('')}${P('M90 270L190 236L290 270Z',marmor)}${R(660,150,940,320,'#f8f4ea')}${R(640,130,980,24,'#e8e2d4','#b8b0a0',3)}${[...Array(7)].map((_,k)=>R(666+k*155,154,28,300,'#fffdf6','#c8c0b0',2)).join('')}${R(0,440,1600,30,'#e8e2d4')}${boden(1)}`,
objekte:[
{name:"Tafel mit griechischen Buchstaben",x:800,y:220,wand:true,by:-80,zeichne:tafelGr,fund:"An der Tafel mit griechischen Buchstaben klebt:"},
{name:"Mosaik mit Delfin",x:1100,y:210,wand:true,by:-80,zeichne:mosaik,fund:"Am Mosaik mit Delfin klebt:"},
{name:"Drei Amphoren",x:150,boden:720,fuss:4,by:-140,zeichne:amphoren,fund:"In einer Amphore steckt:"},
{name:"Olivenbaum",x:760,boden:700,fuss:4,by:-215,zeichne:olive,fund:"Am Olivenbaum hängt:"},
{name:"Zielband der Laufbahn",x:1060,boden:650,fuss:4,by:-175,zeichne:zielband,fund:"Am Zielband hängt:"}
],
infoObjekte:[{name:"Tafel der Olympischen Spiele",x:1450,y:230,wand:true,by:-80,zeichne:olymptafel,fund:"An der Tafel der Olympischen Spiele klebt:"},{name:"Marmor-Brunnen",x:1230,boden:600,fuss:4,by:-140,zeichne:brunnen,fund:"Am Marmor-Brunnen liegt:"},{name:"Siegerpodest mit Olivenkranz",x:1350,boden:740,fuss:4,by:-130,zeichne:podest,fund:"Auf dem Siegerpodest liegt:"}]},
{titel:"Die Schreibstube im Kloster",
intro:"In der Schreibstube des Klosters ist es ganz still. Hier schreiben Mönche und Nonnen Bücher mit der Hand ab – Buchstabe für Buchstabe. Statt Kerzen leuchten kleine Laternen. Durch das Fenster seht ihr den Kräutergarten. Das Zeitportal ist hinter einer Bücherwand versteckt. Findet die Ziffern, damit sie sich dreht!",
introDu:"In der Schreibstube des Klosters ist es ganz still. Hier schreiben Mönche und Nonnen Bücher mit der Hand ab – Buchstabe für Buchstabe. Statt Kerzen leuchten kleine Laternen. Durch das Fenster siehst du den Kräutergarten. Das Zeitportal ist hinter einer Bücherwand versteckt. Finde die Ziffern, damit sie sich dreht!",
tuerX:800,tuerArt:"buecherwand",
hintergrund:()=>{let t='';for(let y=70;y<400;y+=50)t+=`M0 ${y}H1600`;return`${defs('#b8a07a','#8a7450','#fff0c0')}${R(0,0,1600,470,'#e8d8b4')}${L(t,'rgba(160,130,90,.25)',2)}${[...Array(5)].map((_,k)=>P(`M${k*320} 170Q${k*320+160} -40 ${k*320+320} 170`,'none','#b89a6a',16)).join('')}${R(0,0,1600,24,'#c8b490')}${[320,640,960,1280].map(x=>R(x-18,150,36,320,'#d8c49a','#a8906a',2)).join('')}${R(0,400,1600,70,'#a87a4a')}${L('M0 400H1600',dh,5)}${[480,1120,1440].map(x=>L(`M${x} 24V90`,'#5a4a3a',3)+C(x,110,90,'url(#licht)')+R(x-14,90,28,36,'#fff2b0','#5a4a3a',3)).join('')}${boden(2)}`;},
objekte:[
{name:"Fenster zum Kräutergarten",x:250,y:200,wand:true,by:-102,zeichne:fensterGarten,fund:"Am Fenster zum Kräutergarten klebt:"},
{name:"Pergament mit Zierbuchstaben",x:520,y:220,wand:true,by:-85,zeichne:pergament,fund:"Am Pergament mit Zierbuchstaben klebt:"},
{name:"Schreibpult mit Feder",x:200,boden:700,fuss:4,by:-222,zeichne:schreibpult,fund:"Auf dem Schreibpult liegt:"},
{name:"Lesepult mit großem Buch",x:520,boden:740,fuss:4,by:-190,zeichne:lesepult,fund:"Im großen Buch liegt:"},
{name:"Truhe mit Pergamentrollen",x:1050,boden:680,fuss:4,by:-155,zeichne:truhe,fund:"In der Truhe mit Pergamentrollen liegt:"}
],
infoObjekte:[{name:"Tafel mit römischen Zahlen",x:1150,y:230,wand:true,by:-78,zeichne:roemtafel,fund:"An der Tafel mit römischen Zahlen klebt:"},{name:"Regal mit Farbtöpfen",x:1300,boden:600,fuss:4,by:-165,zeichne:farbregal,fund:"Im Regal mit Farbtöpfen liegt:"},{name:"Laterne auf dem Hocker",x:1480,boden:740,fuss:4,by:-182,zeichne:ledlaterne,fund:"Neben der Laterne liegt:"}]},
{titel:"Die Werkstatt der Erfindungen",
intro:"In der Werkstatt tickt und surrt es überall. Glühbirnen leuchten, Zahnräder drehen sich, und an der Wand hängen Baupläne. Hier tüfteln eine Erfinderin und ein Erfinder an neuen Ideen. Das Zeitportal ist ein riesiges Zahnrad. Findet die Ziffern, damit es zur Seite rollt!",
introDu:"In der Werkstatt tickt und surrt es überall. Glühbirnen leuchten, Zahnräder drehen sich, und an der Wand hängen Baupläne. Hier tüfteln eine Erfinderin und ein Erfinder an neuen Ideen. Das Zeitportal ist ein riesiges Zahnrad. Finde die Ziffern, damit es zur Seite rollt!",
tuerX:1100,tuerArt:"zahnradtor",
hintergrund:()=>{let t='';for(let x=160;x<1600;x+=160)t+=`M${x} 70V300`;let p='';for(let x=40;x<1600;x+=80)p+=`M${x} 300V470`;return`${defs('#a8743a','#6a4020','#ffe8a0')}${R(0,0,1600,470,'#d8a070')}${L(t+'M0 180H1600','#b87a48',4)}${R(0,300,1600,170,'#7a4a2a')}${L(p,'#5a3418',3)}${L('M0 300H1600',dh,6)}${L('M0 56H1600',kupfer,16)}${L('M0 56H1600','#f0b070',4)}${ZR(860,170,56,10,'#c8904a','#7a4a20')}${ZR(930,96,30,8,mess,'#6a4a1a')}${[420,780,1300,1520].map(x=>L(`M${x} 0V100`,'#3a2a1a',2)+C(x,118,110,'url(#licht)')+C(x,118,14,'#fff2a0','#c8a040',2)+R(x-6,98,12,8,'#5a5a5a')).join('')}${boden(3)}`;},
objekte:[
{name:"Wand mit Bauplänen",x:250,y:210,wand:true,by:-80,zeichne:bauplan,fund:"An der Wand mit Bauplänen hängt:"},
{name:"Pendeluhr",x:600,y:200,wand:true,by:-118,zeichne:pendeluhr,fund:"An der Pendeluhr klebt:"},
{name:"Werkbank mit Werkzeug",x:180,boden:700,fuss:4,by:-140,zeichne:werkbank,fund:"Auf der Werkbank liegt:"},
{name:"Modell einer Dampfmaschine",x:500,boden:650,fuss:4,by:-232,zeichne:dampf,fund:"Am Modell der Dampfmaschine klebt:"},
{name:"Modell einer Druckerpresse",x:820,boden:730,fuss:4,by:-195,zeichne:presse,fund:"In der Druckerpresse liegt:"}
],
infoObjekte:[{name:"Tafel der Erfindungen",x:1400,y:230,wand:true,by:-80,zeichne:erftafel,fund:"An der Tafel der Erfindungen klebt:"},{name:"Kiste mit Glühbirnen",x:1340,boden:610,fuss:4,by:-140,zeichne:birnenkiste,fund:"In der Kiste mit Glühbirnen liegt:"},{name:"Globus der Erfinderin",x:1500,boden:740,fuss:4,by:-158,zeichne:globus,fund:"Am Globus klebt:"}]},
{titel:"Die Zeitmaschinen-Zentrale",
intro:"Ihr seid in der hellen Zeitmaschinen-Zentrale. Auf der Hologramm-Tafel leuchten bunte Bilder, und durch das große Fenster seht ihr die Stadt von heute. Am Zeitstrahl seht ihr alle Orte eurer Reise. Das letzte Zeitportal summt schon. Findet die Ziffern, damit es euch zurück ins Museum bringt!",
introDu:"Du bist in der hellen Zeitmaschinen-Zentrale. Auf der Hologramm-Tafel leuchten bunte Bilder, und durch das große Fenster siehst du die Stadt von heute. Am Zeitstrahl siehst du alle Orte deiner Reise. Das letzte Zeitportal summt schon. Finde die Ziffern, damit es dich zurück ins Museum bringt!",
tuerX:600,tuerArt:"portal",
hintergrund:()=>`${defs('#e0e6f4','#b8c4e0','#f0faff')}${lg('zrC','#7ac8ff','#bfe6ff','#e8f8ff')}${R(0,0,1600,470,'#f6f8ff')}${R(0,0,1600,36,'#e0e6f4')}${R(60,60,320,240,'url(#zrC)','#c8d0e8',10)}${E(140,92,40,12,'#fff')}${[...Array(8)].map((_,k)=>{const h=60+(k*53)%120;return R(70+k*38,300-h,32,h,['#9ab0d8','#b8c8e8','#8aa0c8'][k%3])+R(78+k*38,310-h,8,8,'#fff')+R(90+k*38,330-h,8,8,'#fff');}).join('')}${L('M220 60V300M60 180H380','#c8d0e8',6)}${R(0,330,1600,8,cyan)}${R(0,344,1600,5,lila)}${[1000,1400].map(x=>R(x-90,36,180,8,'#fff')+C(x,60,180,'url(#licht)')).join('')}${boden(4)}`,
objekte:[
{name:"Hologramm-Tafel",x:950,y:220,wand:true,by:-82,zeichne:holo,fund:"An der Hologramm-Tafel leuchtet:"},
{name:"Große Uhr",x:1250,y:200,wand:true,by:-82,zeichne:grosseUhr,fund:"An der großen Uhr klebt:"},
{name:"Steuerpult der Zeitmaschine",x:200,boden:700,fuss:4,by:-145,zeichne:steuerpult,fund:"Auf dem Steuerpult liegt:"},
{name:"Roboter-Helfer",x:950,boden:680,fuss:4,by:-220,zeichne:roboter,fund:"Der Roboter-Helfer hält:"},
{name:"Kapsel-Sessel",x:1150,boden:740,fuss:4,by:-175,zeichne:sessel,fund:"Auf dem Kapsel-Sessel liegt:"}
],
infoObjekte:[{name:"Zeitstrahl an der Wand",x:1500,y:230,wand:true,by:-76,zeichne:zeitstrahl,fund:"Am Zeitstrahl klebt:"},{name:"Sternenkarten-Tisch",x:360,boden:610,fuss:4,by:-165,zeichne:sternentisch,fund:"Auf dem Sternenkarten-Tisch liegt:"},{name:"Vitrine mit Fundstücken",x:1400,boden:620,fuss:4,by:-165,zeichne:vitrine,fund:"In der Vitrine mit Fundstücken liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs>${lg('zrE','#fff4dc','#f8e4c8','#f0d4b0')}<radialGradient id="zrS"><stop offset="0" stop-color="#bff4ff" stop-opacity=".9"/><stop offset="1" stop-color="#f06ac8" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes zrwa{50%{transform:rotate(-30deg)}}.zrwk{animation:zrwa .8s ease-in-out infinite}@keyframes zrg{50%{opacity:.4}}.zrgl{animation:zrg 2s ease-in-out infinite}@keyframes zrdr{to{transform:rotate(360deg)}}.zrdr{animation:zrdr 8s linear infinite;transform-origin:500px 270px}</style>
   <rect width="1000" height="600" fill="url(#zrE)"/>${[60,250,750,940].map(x=>R(x-22,60,44,380,'#fffdf6','#c8b898',2)+R(x-30,48,60,14,'#f4ecdc','#c8b898',2)).join('')}${R(0,30,1000,20,'#e8d8bc')}${R(400,62,200,40,'#c83a3a')}${X(500,90,'MUSEUM','24','#fff')}${R(0,440,1000,160,'#c8a070')}${L('M0 440H1000M0 480H1000M0 530H1000M0 590H1000','#a8804a',3)}
   <g class="zrgl">${C(500,270,230,'url(#zrS)')}</g><g class="zrdr"><circle cx="500" cy="270" r="140" fill="none" stroke="${cyan}" stroke-width="6" stroke-dasharray="22 14"/></g>${ZK(500,270,110)}${P('M400 440L420 390H580L600 440Z','#8a96b0','#6a7aa0',3)}${R(430,402,140,12,cyan)}
   ${mensch(90,575,'#c8905a','#a8784a',E(90,-1+575-92,13,7,'#3a2a1a')+C(84,519,3,'#7a5230')+C(97,531,3,'#7a5230'))}${mensch(210,580,'#f0c8a0','#fffdf6',rock(210,580,'#fffdf6')+R(195,528,30,4,mess)+E(210,488,13,4,'none','#7a9a3a',3))}${robo(330,585,.9)}
   ${mensch(670,580,'#f4d0b0','#3a3a4a',rock(670,580,'#3a3a4a')+L('M657 490Q654 510 652 522M683 490Q686 510 688 522','#3a3a4a',6)+R(658,484,24,5,'#fff'))}${mensch(790,575,'#a8704a','#8a6a3a',rock(790,575,'#8a6a3a')+L('M775 529H805','#f2d090',3))}${mensch(910,580,'#e8b890','#3aa86a',R(899,518,22,34,'#c8904a')+C(905,498,4,'none',mess,2)+C(915,498,4,'none',mess,2)+C(910,484,7,'#8a4a2a'))}
   ${U('zrsanduhr',120,300,34,mess)}${U('zramphore',250,250,30,'#d8743a')}${U('zrfeder',730,250,30,lila)}${U('zrzahnrad',860,300,34,kupfer)}${U('zrbirne',40,380,30,gold)}`
};
})();