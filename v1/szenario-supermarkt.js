document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-smapfel\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -8Q-6 -13 -12 -11Q-19 -8 -18 2Q-17 13 -8 17Q-4 18 0 16Q4 18 8 17Q17 13 18 2Q19 -8 12 -11Q6 -13 0 -8Z\"/><path d=\"M0 -8Q0 -14 3 -18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/><path fill=\"currentColor\" d=\"M3 -13Q10 -20 15 -15Q9 -10 3 -13Z\"/></symbol>\n<symbol id=\"sym-smkorb\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-18 -4H18L13 17H-13Z\"/><path d=\"M-11 -4Q-11 -18 0 -18Q11 -18 11 -4\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\"/><path d=\"M-6 1V13M0 1V13M6 1V13\" stroke=\"#fff\" stroke-width=\"2\" opacity=\".6\"/></symbol>\n<symbol id=\"sym-smbrot\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-19 10Q-19 -12 0 -12Q19 -12 19 10Z\"/><path d=\"M-9 -6L-5 4M0 -8L4 3M9 -6L12 3\" stroke=\"#fff\" stroke-width=\"2.5\" stroke-linecap=\"round\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-smwaage\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -16V14M-12 14H12M-16 -10H16M-16 -10L-21 3M-16 -10L-11 3M16 -10L11 3M16 -10L21 3\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/><path fill=\"currentColor\" d=\"M-22 3H-10Q-10 9 -16 9Q-22 9 -22 3ZM10 3H22Q22 9 16 9Q10 9 10 3Z\"/></symbol>\n<symbol id=\"sym-smmoehre\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-8 -6Q4 -12 10 -4L-14 18Q-16 4 -8 -6Z\"/><path d=\"M8 -6L16 -16M10 -4L19 -8M6 -8L8 -19\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></symbol>\n</defs>\n</svg>");
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
const holz='#a8743a',dk='#4a2a10',gr='#3a3a40',chrom='#c8ccd4',rot='#d83a2a',gruen='#3a9a3a',gelb='#f2c14e',braun='#b8742a',orange='#f28a1a';
const apf=(x,y,r,c)=>C(x,y,r,c,'rgba(0,0,0,.25)',1)+L(`M${x} ${y-r}l2 -5`,dk,2);
const kiste=(x,y,w,h)=>R(x,y,w,h,holz,dk,3)+L(`M${x} ${y+h/2}H${x+w}`,dk,2);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<110;k++)d+=E((k*137+20)%1600,484+(k*53)%290,20+k%3*5,7+k%2*3,['#9a958c','#b0aaa0','#857f76'][k%3],'rgba(60,55,50,.4)',1.5);return g+d;}
if(m==1){for(const y of[505,550,605,670,750])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=120)d+=`M${800+(x-800)*.5} 470L${x} 780`;return g+L(d,'rgba(120,50,20,.45)',3);}
if(m==2){for(const y of[500,540,590,650,720])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=140)d+=`M${800+(x-800)*.6} 470L${x} 780`;let f='';for(let k=0;k<6;k++)f+=E(k*290+120,560+(k*71)%160,90,10,'rgba(255,255,255,.35)');return g+L(d,'rgba(120,130,140,.4)',2)+f;}
if(m==3){for(let k=0;k<12;k++)d+=E((k*211+60)%1600,500+(k*67)%250,50,8,'rgba(60,60,70,.15)');let f='';for(let k=0;k<30;k++)f+=C((k*41)%260,480+(k*37)%280,3,'rgba(220,240,255,.8)');return g+d+L('M0 520H1600M0 740H1600',gelb,8)+f;}
for(let x=0;x<1600;x+=200)d+=`M${x+40} 560L${x+10} 760`;return g+L(d,'#e8e8e0',6)+R(0,470,1600,16,'#8a8680');}
const markise=(x,y,w,a,b)=>{let s='';const n=Math.round(w/40);for(let k=0;k<n;k++)s+=R(x+k*40,y,40,46,k%2?b:a)+C(x+k*40+20,y+46,20,k%2?b:a);return s;};
const hausreihe=(y)=>{let d='';const f=['#e8b878','#c8d8a8','#e8c8c0','#b8d0e0','#f0e0a0'];for(let k=0;k<11;k++){const x=k*150-20,h=170+(k*47)%70;d+=R(x,y-h,140,h,f[k%5],'#8a7060',2)+P(`M${x-6} ${y-h}L${x+70} ${y-h-50}L${x+146} ${y-h}Z`,'#b04a30')+R(x+24,y-h+30,30,40,'#7aa0c0','#fff',3)+R(x+86,y-h+30,30,40,'#7aa0c0','#fff',3);}return d;};
const preistafel=()=>`${R(-84,-62,168,124,'#2a3a30',holz,8)}${[[-52,-30,rot],[-52,6,gruen],[-52,40,orange]].map(([x,y,c])=>C(x,y,11,c)+L(`M-30 ${y}H20`,'#fff',4)+X(52,y+8,'€','22','#fff')).join('')}`;
const marktuhr=()=>`${L('M0 52V90','#2a5a3a',8)}${C(0,0,52,'#fff','#2a5a3a',9)}${[...Array(12)].map((_,k)=>{const a=k*Math.PI/6,s=Math.sin(a),c=Math.cos(a);return L(`M${s*34} ${c*34}L${s*40} ${c*40}`,gr,k%3?2:4);}).join('')}${L('M0 0V-30M0 0L22 8','#2a2a30',5)}${C(0,0,4,rot)}`;
const jahresplakat=()=>`${R(-84,-64,168,128,'#fff','#5a6a3a',4)}${R(-80,-60,80,60,'#d8f0b0')}${R(0,-60,80,60,'#fff0a0')}${R(-80,0,80,60,'#f8c890')}${R(0,0,80,60,'#d8e8f8')}${L('M-62 -18q8 -22 22 -4',gruen,4)}${P('M18 -40Q30 -52 42 -40Q42 -20 30 -16Q18 -20 18 -40Z',rot)}${C(-40,32,18,orange,'#a05010',2)}${L('M-40 14V8',gruen,4)}${C(40,30,16,'#a8c870','#5a7a30',2)}${C(40,30,8,'#d8f0b0')}`;
const apfelkiste=()=>`${sch(70)}${kiste(-70,-60,140,60)}${kiste(-60,-120,120,60)}${[-50,-24,2,28,54].map((x,k)=>apf(x,-66,13,k%2?rot:'#8ac040')).join('')}${[-40,-12,16,44].map(x=>apf(x,-126,13,'#e85030')).join('')}`;
const marktwaage=()=>`${sch(80)}${L('M-70 0V-70M70 0V-70',dk,7)}${R(-84,-82,168,14,holz,dk,3)}${R(-10,-150,20,68,'#8a8070','#3a3020',2)}${L('M-60 -150H60',gr,6)}${L('M-56 -150L-70 -110M-56 -150L-42 -110M56 -150L42 -110M56 -150L70 -110',gr,2)}${P('M-76 -110H-36Q-40 -96 -56 -96Q-72 -96 -76 -110Z',gelb,'#8a6a10',2)}${P('M36 -110H76Q72 -96 56 -96Q40 -96 36 -110Z',gelb,'#8a6a10',2)}${apf(-56,-120,10,rot)}${R(46,-120,20,12,gr)}`;
const kartoffelsack=()=>`${sch(70)}${[[-34,0],[34,0]].map(([x])=>P(`M${x-36} 0Q${x-44} -70 ${x-24} -96L${x+24} -96Q${x+44} -70 ${x+36} 0Z`,'#c8a46a','#6a4a20',3)+L(`M${x-22} -96Q${x} -88 ${x+22} -96`,'#6a4a20',4)).join('')}${[-50,-20,10,40,-34,24].map((x,k)=>E(x,-100-(k>3?14:0),13,10,'#d8b070','#8a6030',2)).join('')}`;
const bollerwagen=()=>`${sch(90)}${R(-80,-74,150,50,holz,dk,3)}${L('M70 -40L120 -70',dk,6)}${C(-50,-14,16,gr,'#111',3)}${C(40,-14,16,gr,'#111',3)}${C(-36,-96,26,orange,'#a05010',3)}${C(18,-92,22,'#f2a030','#a05010',3)}${L('M-36 -122v-8M18 -114v-8',gruen,5)}${L('M-50 -96Q-36 -106 -22 -96M4 -92Q18 -100 32 -92','#a05010',2)}`;
const kraeutertopf=()=>`${sch(60)}${[-38,0,38].map((x,k)=>P(`M${x-18} 0L${x-22} -36H${x+22}L${x+18} 0Z`,'#c8683a','#6a3010',2)+[...Array(5)].map((_,j)=>L(`M${x} -36L${x-14+j*7} ${-70-(j%2)*14}`,['#3a8a2a','#5aa83a','#2a6a2a'][k],4)).join('')).join('')}`;
const brotregal=()=>`${R(-90,-64,180,128,'#8a5a30',dk,4)}${[-30,16,60].map(y=>R(-90,y,180,6,dk)).join('')}${[-60,-20,20,60].map(x=>E(x,-42,18,11,braun,'#6a3a10',2)).join('')}${[-66,-36,-6,24,54].map(x=>C(x+6,8,10,'#d8a050','#6a3a10',2)).join('')}${[-50,0,50].map(x=>R(x-22,36,44,22,'#8a4a20','#4a2010',2)).join('')}`;
const rezepttafel=()=>`${R(-66,-74,132,148,'#fffaf0','#a08060',4)}${C(0,-74,7,rot)}${E(-26,-36,22,12,'#e8d8c0','#8a6a40',2)}${L('M-6 -54L22 -28M14 -56L30 -36',gr,3)}${[-6,12,30,48].map(y=>L(`M-48 ${y}H${y%12?30:48}`,'#8a7a6a',4)).join('')}`;
const getreideplakat=()=>`${R(-84,-64,168,128,'#fff4d8','#8a6a30',4)}${[-52,-18,18,52].map((x,k)=>L(`M${x} 52V-20`,'#b08a30',3)+[...Array(5)].map((_,j)=>E(x-5,-24+j*10,5,3,['#e0b040','#c89030','#d8c070','#a87a30'][k])+E(x+5,-20+j*10,5,3,['#e0b040','#c89030','#d8c070','#a87a30'][k])).join('')).join('')}${R(-84,-64,168,18,'#c8a040')}`;
const mehlsaecke=()=>`${sch(80)}${[[-40,0],[40,0],[0,-70]].map(([x,y])=>P(`M${x-38} ${y}Q${x-44} ${y-50} ${x-30} ${y-70}H${x+30}Q${x+44} ${y-50} ${x+38} ${y}Z`,'#f4f0e8','#a09880',3)+X(x,y-28,'MEHL','15','#8a7a5a')).join('')}`;
const teigmaschine=()=>`${sch(60)}${R(-50,-20,100,20,'#9aa0a8','#4a5058',3)}${R(-50,-150,30,130,'#b8bcc4','#4a5058',3)}${R(-50,-170,100,30,'#b8bcc4','#4a5058',3)}${L('M20 -140V-96Q20 -80 6 -84','#6a7078',6)}${P('M-20 -100H58L48 -20H-10Z',chrom,'#4a5058',3)}${E(19,-100,39,8,'#f0e0b8','#a08860',2)}${C(-35,-128,6,'#40c060')}`;
const brottheke=()=>`${sch(130)}${R(-130,-100,260,100,'#c89060','#5a3a20',4)}${R(-130,-150,260,50,'rgba(220,240,255,.45)','#8a9aa8',3)}${R(-130,-104,260,6,'#fff')}${[-96,-50,-4,42,88].map((x,k)=>k%2?P(`M${x-16} -110Q${x-24} -128 ${x-8} -130Q${x} -118 ${x+8} -130Q${x+24} -128 ${x+16} -110Q${x} -122 ${x-16} -110Z`,braun,'#6a3a10',2):E(x,-116,18,10,'#d8a050','#6a3a10',2)).join('')}${R(-130,-60,260,10,'#8a5a30')}`;
const broetchenkorb=()=>`${sch(70)}${P('M-66 -50H66L52 0H-52Z','#c8963a','#6a4a10',3)}${L('M-60 -34H60M-56 -18H56','#6a4a10',2)}${[-46,-16,14,44,-30,0,30].map((x,k)=>E(x,k>3?-70:-56,16,11,'#e0a850','#7a4a10',2)+L(`M${x-6} ${k>3?-72:-58}L${x+6} ${k>3?-68:-54}`,'#fff4d0',2)).join('')}`;
const blechwagen=()=>`${sch(60)}${L('M-50 -8V-190M50 -8V-190',chrom,6)}${[-170,-130,-90,-50].map(y=>R(-56,y,112,6,'#6a7078')+[-36,-12,12,36].map(x=>E(x,y-6,10,6,'#e0a850','#7a4a10',1.5)).join('')).join('')}${C(-50,-4,7,gr)}${C(50,-4,7,gr)}`;
const angebot=()=>`${L('M-50 -90V-60M50 -90V-60','#8a8e98',3)}${P('M-80 -60H80V40L60 60H-80Z',gelb,'#a07010',4)}${X(0,-22,'ANGEBOT','24',rot)}${C(-36,20,18,rot)}${X(-36,28,'%','22','#fff')}${L('M0 14H56M0 32H40',rot,6)}`;
const konservenregal=()=>`${R(-92,-62,184,124,'#e8ecf0','#7a8088',4)}${[-4,58].map(y=>R(-92,y,184,6,'#7a8088')).join('')}${[-74,-46,-18,10,38,66].map((x,k)=>R(x-11,-44,22,40,['#e84a3a','#3a8ae0',gruen,gelb][k%4],gr,2)+R(x-11,-30,22,10,'#fff')).join('')}${[-70,-34,2,38,74].map((x,k)=>R(x-12,20,24,38,'rgba(230,150,60,.7)',gr,2)+R(x-13,14,26,8,['#c83a2a','#3a6ab0'][k%2])).join('')}`;
const ernaehrungskreis=()=>`${R(-80,-76,160,152,'#fff','#4a6a8a',4)}${[['#5ab0e8',0,60],['#6ac04a',60,150],['#f0c040',150,240],['#e89040',240,300],['#e85a5a',300,360]].map(([c,a,b])=>{const p=v=>[Math.sin(v*Math.PI/180)*60,-Math.cos(v*Math.PI/180)*60];const[x1,y1]=p(a),[x2,y2]=p(b);return P(`M0 0L${x1.toFixed(1)} ${y1.toFixed(1)}A60 60 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z`,c,'#fff',3);}).join('')}${C(0,0,16,'#fff')}${U('smapfel',30,8,24,'#fff')}`;
const einkaufswagen=()=>`${sch(70)}${P('M-70 -130H70L56 -50H-56Z','rgba(200,210,220,.35)',chrom,4)}${L('M-60 -110H64M-58 -90H60M-56 -70H58M-30 -130V-50M0 -130V-50M30 -130V-50',chrom,2)}${L('M70 -130L94 -150H108M-56 -50L-60 -20H60L56 -50',chrom,5)}${C(-50,-10,9,gr)}${C(50,-10,9,gr)}${R(-50,-158,34,32,'#f4e0b0','#8a6a40',2)}${apf(0,-138,12,rot)}${R(16,-170,22,44,'#fff','#5a8ab8',2)}${C(-24,-140,10,'#8ac040')}`;
const kassenband=()=>`${sch(130)}${R(-130,-90,260,90,'#5a6a7a','#2a3440',4)}${R(-130,-100,200,14,'#2a2a30')}${L('M-120 -93H60','#5a5a62',2)}${R(70,-110,60,20,'#3a4a5a')}${R(84,-160,40,44,'#1a2a3a','#8a9aa8',3)}${R(90,-152,28,26,'#5ad0b0')}${L('M104 -116V-110','#8a9aa8',4)}${R(-110,-124,30,24,'#f0c040',gr,2)}${C(-56,-112,12,orange)}${R(-28,-130,22,30,'#fff','#5a8ab8',2)}${R(-122,-60,40,30,'#9aa8b8',gr,2)}`;
const obstwaage=()=>`${sch(50)}${R(-36,-8,72,8,gr)}${L('M0 -8V-96','#8a8e98',8)}${R(-46,-108,92,14,'#c8ccd4','#5a5e68',3)}${R(-30,-170,60,50,'#2a3a4a','#8a9aa8',3)}${R(-22,-162,44,22,'#9af0c0')}${[-16,0,16].map(x=>R(x-6,-136,12,10,'#e8ecf0')).join('')}${L('M0 -120V-108','#8a9aa8',4)}${R(52,-140,14,40,'#e8ecf0','#8a8e98',2)}`;
const korbstapel=()=>`${sch(60)}${[0,-22,-44,-66].map(y=>P(`M-56 ${y-40}H56L46 ${y}H-46Z`,rot,'#7a1a10',3)+L(`M-40 ${y-28}H40M-36 ${y-14}H36`,'#7a1a10',2)).join('')}${L('M-30 -106Q-30 -130 0 -130Q30 -130 30 -106','#2a2a30',5)}`;
const wasserkisten=()=>`${sch(70)}${[[-38,0],[38,0],[0,-60]].map(([x,y])=>[...Array(4)].map((_,k)=>R(x-28+k*15,y-86,11,36,'rgba(170,220,255,.9)','#3a7ab0',1.5)+R(x-26+k*15,y-92,7,7,'#3a7ab0')).join('')+R(x-34,y-54,68,54,'#3a8ae0','#1a3a6a',3)+R(x-14,y-40,28,10,'#1a3a6a')).join('')}`;
const lagerliste=()=>`${R(-60,-80,120,160,'#c8a070','#6a4a20',4)}${R(-50,-64,100,136,'#fff')}${R(-20,-88,40,18,'#8a8e98',gr,2)}${[-40,-12,16,44].map((y,k)=>R(-40,y-8,14,14,'#fff',gr,2)+L(`M-18 ${y}H38`,'#8a8a90',4)+(k<3?L(`M-38 ${y}l4 5l8 -11`,gruen,3):'')).join('')}`;
const thermometer=()=>`${R(-34,-90,68,180,'#e8f4fc','#5a8ab0',4)}${R(-7,-70,14,110,'#fff','#5a8ab0',2)}${R(-4,-6,8,46,'#3a8ae0')}${C(0,52,14,'#3a8ae0','#5a8ab0',2)}${[-60,-40,-20,0,20].map(y=>L(`M10 ${y}H20`,'#5a8ab0',2)).join('')}${L('M-22 -60v20M-32 -50h20M-29 -57l14 14M-29 -43l14 -14','#8ac8f0',3)}`;
const herkunftskarte=()=>`${R(-92,-64,184,128,'#bfe4fa','#3a6a8a',4)}${P('M-70 -40Q-50 -50 -40 -30Q-44 -6 -56 6Q-74 -10 -70 -40Z','#9ac070')}${P('M-50 14Q-30 10 -34 46Q-46 54 -50 14Z','#9ac070')}${P('M-6 -46Q20 -54 30 -40Q22 -26 4 -30Q-8 -36 -6 -46Z','#9ac070')}${P('M0 -20Q20 -24 22 10Q10 40 0 20Q-8 0 0 -20Z','#9ac070')}${P('M30 -40Q70 -50 80 -20Q60 0 40 -12Z','#9ac070')}${P('M54 22Q76 18 78 40Q60 46 54 22Z','#9ac070')}${L('M10 -40Q-30 -60 -50 -30M10 -40Q10 0 10 6M10 -40Q60 0 64 30','#d83a2a',2)}${C(10,-40,6,rot,'#fff',2)}${C(-50,-30,4,gelb)}${C(10,6,4,gelb)}${C(64,30,4,gelb)}`;
const hubwagen=()=>`${sch(100)}${L('M80 -10L110 -110',gr,6)}${R(96,-124,30,10,'#1a1a1a')}${R(-90,-26,180,16,'#c8a070','#6a4a20',3)}${R(-90,-14,180,10,orange,'#8a4a08',2)}${C(-80,-2,6,gr)}${C(84,-2,8,gr)}${[[-84,-86],[-4,-86],[-84,-136],[-4,-136]].map(([x,y])=>R(x,y,80,58,'#c8945a','#6a4a20',3)+L(`M${x} ${y+12}H${x+80}`,'#e8c890',3)).join('')}`;
const kartonturm=()=>`${sch(60)}${[[-58,-60,70],[4,-60,56],[-44,-120,80],[-20,-170,50]].map(([x,y,w])=>R(x,y,w,y==-170?50:60,'#c8945a','#6a4a20',3)+L(`M${x+w/2} ${y}V${y+18}`,'#e8c890',4)).join('')}${L('M-12 -24V-48M-20 -40L-12 -48L-4 -40',gr,3)}${L('M28 -24V-48M20 -40L28 -48L36 -40',gr,3)}`;
const bananenkisten=()=>`${sch(80)}${[[-42,0],[42,0],[0,-50]].map(([x,y])=>R(x-40,y-50,80,50,'#e8d8a8','#8a7040',3)+[...Array(3)].map((_,k)=>P(`M${x-28+k*18} ${y-50}Q${x-30+k*18} ${y-80} ${x-12+k*18} ${y-86}Q${x-20+k*18} ${y-70} ${x-16+k*18} ${y-50}Z`,'#f4d830','#8a7a10',2)).join('')).join('')}`;
const milchwagen=()=>`${sch(60)}${L('M-52 -8V-180M52 -8V-180M-52 -180H52M-52 -94H52',chrom,5)}${L('M-26 -180V-8M0 -180V-8M26 -180V-8','rgba(200,204,212,.6)',2)}${[-38,-12,14,40].map(x=>P(`M${x-10} -98V-130L${x} -140L${x+10} -130V-98Z`,'#fff','#5a8ab8',2)+R(x-10,-122,20,8,'#5ab0e8')+P(`M${x-10} -12V-44L${x} -54L${x+10} -44V-12Z`,'#fff','#5a8ab8',2)+R(x-10,-36,20,8,'#5ab0e8')).join('')}${C(-52,-4,6,gr)}${C(52,-4,6,gr)}`;
const sackkarre=()=>`${sch(50)}${L('M-30 -10L-14 -170M30 -10L14 -170','#3a6ab0',6)}${L('M-22 -170H22','#1a1a1a',8)}${R(-40,-12,80,8,'#5a5e68')}${C(-34,-4,12,'#1a1a1a')}${C(34,-4,12,'#1a1a1a')}${[[-28,-20],[-24,-76]].map(([x,y])=>P(`M${x} ${y}V${y-50}Q${x+28} ${y-60} ${x+56} ${y-50}V${y}Z`,'#f0e8d0','#8a7a5a',3)).join('')}`;
const lieferplan=()=>`${R(-86,-62,172,124,'#f4f4f0','#3a5a3a',4)}${R(-86,-62,172,20,'#3a9a5a')}${L('M-60 30Q-30 -20 0 10T60 -20',gr,4)}${[[-60,30,rot],[0,10,gelb],[60,-20,gruen]].map(([x,y,c])=>C(x,y,9,c,'#fff',2)).join('')}${R(-60,40,40,16,'#fff','#3a9a5a',2)}${C(-52,58,4,gr)}${C(-28,58,4,gr)}`;
const hoflaterne=()=>`${C(0,40,120,'url(#licht)')}${L('M-60 -40H0V-10',gr,6)}${R(-66,-60,12,40,gr)}${P('M-24 -10H24L16 30H-16Z','#4a4a52',gr,2)}${E(0,32,18,6,'#fff6b0')}`;
const berufetafel=()=>`${R(-90,-64,180,128,'#fff8e8','#6a4a28',4)}${[[-56,'#f0c8a0','#fff'],[0,'#a8704a',rot],[56,'#e8b890','#3a9a5a']].map(([x,h,c],k)=>R(x-18,0,36,44,c,gr,1.5)+C(x,-16,15,h)+(k==0?E(x,-34,20,10,'#fff','#aaa',2)+R(x-14,-36,28,8,'#fff'):k==1?P(`M${x-17} -24Q${x} -44 ${x+17} -24Z`,'#3a7a3a'):R(x-16,-34,32,8,'#2a5a9a')+R(x-6,-28,26,4,'#2a5a9a'))).join('')}`;
const rollcontainer=()=>`${sch(60)}${L('M-54 -8V-170M54 -8V-170M-54 -170H54M-54 -60H54M-54 -116H54','#8a8e98',5)}${[-26,0,26].map(x=>L(`M${x} -170V-8`,'rgba(138,142,152,.6)',2)).join('')}${R(-46,-110,52,48,'#c8945a','#6a4a20',2)}${R(10,-104,38,42,'#3a9a5a','#1a4a2a',2)}${R(-40,-56,80,46,'#c8945a','#6a4a20',2)}${C(-50,-4,6,gr)}${C(50,-4,6,gr)}`;
const paketwaage=()=>`${sch(70)}${R(-64,-14,128,14,'#5a5e68','#2a2a30',3)}${R(-44,-76,88,62,'#c8945a','#6a4a20',3)}${L('M-44 -56H44M0 -76V-14','#e8c890',4)}${L('M60 -14V-110','#5a5e68',6)}${R(40,-140,46,32,'#1a2a3a','#8a9aa8',3)}${R(46,-134,34,18,'#9af0c0')}`;
const hochbeet=()=>`${sch(90)}${R(-86,-60,172,60,holz,dk,3)}${L('M-86 -30H86',dk,2)}${R(-80,-68,160,10,'#5a3a20')}${[-60,-30,0].map(x=>E(x,-78,16,11,'#6ac04a','#3a7a2a',2)).join('')}${[30,52,74].map(x=>P(`M${x-4} -66L${x} -84L${x+4} -66Z`,orange)+L(`M${x} -84L${x-6} -104M${x} -84L${x+6} -102`,gruen,3)).join('')}`;
const mehrwegkisten=()=>`${sch(60)}${[0,-34,-68,-102].map((y,k)=>R(-50+(k%2)*6,y-34,100,34,'#3a9a5a','#1a4a2a',3)+R(-24+(k%2)*6,y-26,48,10,'#1a4a2a')).join('')}`;
const lastenrad=()=>`${sch(100)}${C(-70,-28,26,'none','#1a1a1a',5)}${C(70,-28,26,'none','#1a1a1a',5)}${L('M-70 -28L-20 -40L30 -28L70 -28M-20 -40L-10 -100M30 -28L60 -110M48 -110H76',gr,5)}${R(-24,-106,30,8,'#1a1a1a')}${R(-108,-110,80,58,'#3a9a5a','#1a4a2a',3)}${U('smkorb',-84,-102,32,'#fff')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a3a2a" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a3a2a" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #smp1{transform:scaleX(.12)}.tuer.offen #smp2{transform:scaleX(.12)}.tuer.offen #smb{transform:scaleX(.1)}.tuer.offen #sms1{transform:translateX(-88px)}.tuer.offen #sms2{transform:translateX(88px)}.tuer.offen #smr{transform:scaleY(.06)}.tuer.offen #smk1{transform:scaleX(.08)}.tuer.offen #smk2{transform:scaleX(.08)}</style>`;
function tuerPlane(n){
const pl=x=>{let s='';for(let k=0;k<5;k++)s+=R(x+k*20,170,10,300,'rgba(255,255,255,.75)');return R(x,170,100,300,'#3a8a4a','#1a4a2a',2)+s;};
return`${R(400,170,200,300,'#f4d8a8')}${R(420,230,160,8,'#8a5a30')}${[440,480,520,560].map(x=>E(x,222,16,9,braun)).join('')}${R(440,300,120,90,'#ffe8a0','#8a5a30',4)}${C(500,345,70,'url(#licht)')}${R(400,400,200,70,'#c89060')}${R(380,140,20,330,holz,dk,3)}${R(600,140,20,330,holz,dk,3)}${markise(370,110,260,'#3a8a4a','#fff')}
   <g id="smp1" class="tb" style="transform-origin:400px 300px">${pl(400)}</g>
   <g id="smp2" class="tb" style="transform-origin:600px 300px">${pl(500)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerBack(n){
return`${R(380,150,240,320,'#c89060','#5a3a20',5)}${R(410,180,180,290,'#eef2f4')}${R(410,180,180,14,'#fff')}${[250,330,410].map(y=>R(410,y,180,6,'#9aa0a8')+[430,470,510,550].map((x,k)=>R(x,y-34,26,34,['#e84a3a','#3a8ae0',gelb,gruen][k])).join('')).join('')}${R(410,140,180,36,'#8a5a30','#4a2a10',3)}${X(500,166,'BACKSTUBE','20','#fff4d0')}
   <g id="smb" class="tb" style="transform-origin:410px 300px">${R(410,180,180,290,'#e8dcc4','#6a4a28',4)}${C(500,260,36,'#bfe4fa','#6a4a28',6)}${L('M484 246L508 236M480 264L516 246','#fff',4)}${R(420,420,160,40,chrom,'#6a6e78',2)}${R(566,320,10,46,'#6a4a28')}${U('smbrot',476,320,48,braun)}</g>
   <g class="tb pl">${sPl(n,380)}</g>`;
}
function tuerGlas(n){
const gl=x=>R(x,190,90,280,'rgba(190,230,250,.55)','#8a9aa8',5)+L(`M${x+16} 230L${x+44} 210M${x+16} 270L${x+66} 230`,'#fff',3)+R(x+(x<500?80:4),300,6,60,'#8a9aa8');
return`${R(370,150,260,320,'#d8dce2','#6a7078',5)}${R(400,190,200,280,'#7a8490')}${L('M420 190V470M580 190V470',orange,10)}${L('M420 260H580M420 340H580M420 420H580','#2a5aa8',8)}${[440,500,540].map(x=>R(x,226,34,34,'#c8945a')+R(x-10,306,30,34,'#c8945a')).join('')}${R(430,118,140,30,gruen,'#1a5a2a',3)}${X(500,140,'LAGER','20','#fff')}
   <g id="sms1" class="tb">${gl(410)}</g>
   <g id="sms2" class="tb">${gl(500)}</g>
   <g class="tb pl">${sPl(n,370)}</g>`;
}
function tuerRoll(n){
let b='';for(let k=0;k<14;k++)b+=`M410 ${206+k*20}H590`;
let w='';for(let k=0;k<8;k++)w+=R(372,140+k*40,24,20,'#1a1a1a')+R(604,140+k*40,24,20,'#1a1a1a');
return`${R(370,130,260,340,gelb,'#3a3c44',5)}${w}${R(410,170,180,300,'#f0906a')}${R(410,170,180,80,'#7a5aa0')}${C(540,300,24,'#ffe0a0')}${R(410,380,180,90,'#5a5a60')}${R(420,320,110,70,'#f4f4f0','#3a5a3a',3)}${R(530,340,40,50,'#f4f4f0','#3a5a3a',3)}${R(400,150,200,24,'#5a5c64')}
   <g id="smr" class="tb" style="transform-origin:500px 172px">${R(410,172,180,298,'#a8b0bc','#4a5260',4)}${L(b,'#7a8290',4)}${R(470,440,60,12,'#4a5260')}</g>
   <g class="tb pl">${sPl(n,320)}</g>`;
}
function tuerKlappe(n){
const fl=x=>R(x,180,120,250,'#f4f4f0','#3a5a3a',4)+R(x,300,120,20,'#3a9a5a')+L(`M${x+(x<500?108:12)} 260V360`,'#5a5e68',6);
return`${C(500,330,200,'url(#licht)')}${R(360,160,280,280,'#e8ece8','#2a4a2a',5)}${R(380,180,240,250,'#5a4a3a')}${R(390,330,100,90,'#3a9a5a','#1a4a2a',3)}${R(500,330,110,90,holz,dk,3)}${[410,440,470].map(x=>apf(x,324,12,rot)).join('')}${[520,550,580].map(x=>E(x,322,14,9,braun)).join('')}${R(400,250,90,70,'#c8945a','#6a4a20',3)}${R(510,260,90,60,'#c8945a','#6a4a20',3)}${R(350,430,300,16,'#5a5e68')}${R(352,400,12,22,'#e83a2a')}${R(636,400,12,22,'#e83a2a')}${C(410,456,24,'#2a2a30','#111',3)}${C(590,456,24,'#2a2a30','#111',3)}${C(410,456,9,chrom)}${C(590,456,9,chrom)}
   <g id="smk1" class="tb" style="transform-origin:380px 300px">${fl(380)}</g>
   <g id="smk2" class="tb" style="transform-origin:620px 300px">${fl(500)}</g>
   <g class="tb pl">${sPl(n,240)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'plane';
const arten={plane:[tuerPlane,'Planenvorhang am Marktstand mit Zahlenschloss'],backstube:[tuerBack,'Tür der Backstube mit Zahlenschloss'],glastuer:[tuerGlas,'Glas-Schiebetür zum Lager mit Zahlenschloss'],rolltor:[tuerRoll,'Rolltor zum Hof mit Zahlenschloss'],ladeklappe:[tuerKlappe,'Ladeklappe des Lieferwagens mit Zahlenschloss']};
const a=arten[art]||arten.plane;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const mensch=(x,y,h,k,hut)=>`${L(`M${x-7} ${y}V${y-30}M${x+7} ${y}V${y-30}`,'#3a3a5a',9)}${R(x-15,y-70,30,42,k)}${C(x,y-82,12,h)}${hut}<g class="smwk" style="transform-origin:${x+13}px ${y-64}px">${L(`M${x+13} ${y-64}L${x+28} ${y-100}`,k,8)}</g>${L(`M${x-13} ${y-64}L${x-20} ${y-34}`,k,8)}`;
SZENARIEN.supermarkt={
name:"Supermarkt und Markt",
symbole:["smapfel","smkorb","smbrot","smwaage","smmoehre"],
symbolNamen:["Apfel","Korb","Brot","Waage","Möhre"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect x="14" y="30" width="92" height="50" fill="#a8743a" stroke="#4a2a10" stroke-width="3"/><path d="M8 12H112V30H8Z" fill="#3a8a4a"/><path d="M28 12V30M48 12V30M68 12V30M88 12V30" stroke="#fff" stroke-width="10"/><circle cx="34" cy="52" r="10" fill="#d83a2a"/><circle cx="56" cy="54" r="10" fill="#8ac040"/><circle cx="78" cy="52" r="10" fill="#f28a1a"/><ellipse cx="56" cy="70" rx="30" ry="7" fill="#b8742a"/></svg>`,
texte:{
einleitung:"Willkommen auf dem Wochenmarkt! Heute helft ihr den Marktleuten und dem Team vom Supermarkt. Ihr kommt zum Obststand, in die Bäckerei, an die Kasse, ins Lager und zur Laderampe. Die Marktleiterin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, schickt am Ende den Lieferwagen auf die Reise. Schafft ihr es?",
startKnopf:"Los geht&rsquo;s",
hinweisGeber:"Die Marktleiterin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Marktleiterin schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Feierabend auf dem Markt!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Markt trotzdem noch ganz erkunden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Alle Waren sind verteilt, und der Lieferwagen fährt los. Die Marktleute, die Bäckerin und der Bäcker und viele Kundinnen und Kunden winken euch fröhlich zu. Ihr seid jetzt echte Markt-Profis!"
},
texteDu:{
einleitung:"Willkommen auf dem Wochenmarkt! Heute hilfst du den Marktleuten und dem Team vom Supermarkt. Du kommst zum Obststand, in die Bäckerei, an die Kasse, ins Lager und zur Laderampe. Die Marktleiterin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, schickt am Ende den Lieferwagen auf die Reise. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Marktleiterin schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Markt trotzdem noch ganz erkunden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Alle Waren sind verteilt, und der Lieferwagen fährt los. Die Marktleute, die Bäckerin und der Bäcker und viele Kundinnen und Kunden winken dir fröhlich zu. Du bist jetzt ein echter Markt-Profi!"
},
einfach:{
name:"Supermarkt und Markt",
symbolNamen:["Apfel","Korb","Brot","Waage","Möhre"],
texte:{
einleitung:"Ihr seid auf dem Markt. Ihr seht fünf Orte: den Obst-Stand, die Bäckerei, die Kasse, das Lager und den Hof. Die Chefin vom Markt hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende fährt das Liefer-Auto los. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Liefer-Auto fährt los. Alle winken euch zu!"
},
texteDu:{
einleitung:"Du bist auf dem Markt. Du siehst fünf Orte: den Obst-Stand, die Bäckerei, die Kasse, das Lager und den Hof. Die Chefin vom Markt hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende fährt das Liefer-Auto los. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Liefer-Auto fährt los. Alle winken dir zu!"
},
raeume:[
{titel:"Der Obst-Stand",intro:"Die Sonne scheint. Auf dem Markt gibt es Obst und Gemüse. Der Stand hat einen Vorhang. Findet die Zahlen!",introDu:"Die Sonne scheint. Auf dem Markt gibt es Obst und Gemüse. Der Stand hat einen Vorhang. Finde die Zahlen!",
objekte:[{name:"Preis-Tafel",fund:"An der Tafel klebt:"},{name:"Markt-Uhr",fund:"An der Uhr klebt:"},{name:"Apfel-Kisten",fund:"In der Kiste liegt:"},{name:"Markt-Waage",fund:"Auf der Waage liegt:"},{name:"Kartoffel-Säcke",fund:"Im Sack liegt:"}],
infoObjekte:[{name:"Obst-Kalender",fund:"Am Kalender klebt:"},{name:"Hand-Wagen",fund:"Im Wagen liegt:"},{name:"Kräuter-Töpfe",fund:"Bei den Kräutern liegt:"}]},
{titel:"Die Bäckerei",intro:"Hier riecht es nach Brot. Der Ofen ist warm. Die Tür zur Back-Stube ist zu.",
objekte:[{name:"Brot-Regal",fund:"Im Regal liegt:"},{name:"Rezept-Zettel",fund:"Am Zettel klebt:"},{name:"Mehl-Säcke",fund:"Am Sack klebt:"},{name:"Knet-Maschine",fund:"An der Maschine klebt:"},{name:"Brot-Theke",fund:"Auf der Theke liegt:"}],
infoObjekte:[{name:"Getreide-Bild",fund:"Am Bild klebt:"},{name:"Brötchen-Korb",fund:"Im Korb liegt:"},{name:"Blech-Wagen",fund:"Auf dem Blech liegt:"}]},
{titel:"Die Kasse",intro:"Hier bezahlen die Leute. Die Lampen sind hell. Die Glas-Tür zum Lager ist zu.",
objekte:[{name:"Angebots-Schild",fund:"Am Schild klebt:"},{name:"Dosen-Regal",fund:"Im Regal liegt:"},{name:"Einkaufs-Wagen",fund:"Im Wagen liegt:"},{name:"Kassen-Band",fund:"Auf dem Band liegt:"},{name:"Obst-Waage",fund:"An der Waage klebt:"}],
infoObjekte:[{name:"Essens-Kreis",fund:"Am Bild klebt:"},{name:"Korb-Stapel",fund:"Im Korb liegt:"},{name:"Wasser-Kisten",fund:"In der Kiste liegt:"}]},
{titel:"Das Lager",intro:"Hier stehen hohe Regale. Im Kühl-Raum ist es kalt. Das große Tor ist zu.",
objekte:[{name:"Lager-Liste",fund:"An der Liste klebt:"},{name:"Thermo-Meter",fund:"Am Thermometer klebt:"},{name:"Hub-Wagen",fund:"Auf dem Wagen liegt:"},{name:"Karton-Turm",fund:"Im Karton liegt:"},{name:"Bananen-Kisten",fund:"In der Kiste liegt:"}],
infoObjekte:[{name:"Welt-Karte",fund:"An der Karte klebt:"},{name:"Milch-Wagen",fund:"Im Wagen liegt:"},{name:"Sack-Karre",fund:"Auf der Karre liegt:"}]},
{titel:"Der Hof",intro:"Es ist Abend. Das Liefer-Auto wartet. Öffnet die Klappe hinten am Auto!",introDu:"Es ist Abend. Das Liefer-Auto wartet. Öffne die Klappe hinten am Auto!",
objekte:[{name:"Liefer-Plan",fund:"Am Plan klebt:"},{name:"Hof-Lampe",fund:"An der Lampe klebt:"},{name:"Gitter-Wagen",fund:"Im Wagen liegt:"},{name:"Paket-Waage",fund:"Auf der Waage liegt:"},{name:"Hoch-Beet",fund:"Im Beet liegt:"}],
infoObjekte:[{name:"Berufe-Tafel",fund:"An der Tafel klebt:"},{name:"Grüne Kisten",fund:"In der Kiste liegt:"},{name:"Lasten-Rad",fund:"Im Rad-Korb liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Obststand auf dem Wochenmarkt",
intro:"Die Sonne scheint auf den Wochenmarkt. Unter bunten Markisen leuchten Äpfel, Kürbisse und frische Kräuter. Die Marktfrauen und Marktmänner wiegen das Obst ab. Hinten am Stand hängt ein Planenvorhang mit Zahlenschloss. Findet die Ziffern, um ihn zu öffnen!",
introDu:"Die Sonne scheint auf den Wochenmarkt. Unter bunten Markisen leuchten Äpfel, Kürbisse und frische Kräuter. Die Marktfrauen und Marktmänner wiegen das Obst ab. Hinten am Stand hängt ein Planenvorhang mit Zahlenschloss. Finde die Ziffern, um ihn zu öffnen!",
tuerX:1250,tuerArt:"plane",
hintergrund:()=>`${defs('#a8a49c','#7a766e','#fff4c0')}<linearGradient id="smH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa8e8"/><stop offset="1" stop-color="#d8f0fc"/></linearGradient>${R(0,0,1600,470,'url(#smH)')}${C(1480,70,40,'#fff6b0')}${C(1480,70,170,'url(#licht)')}${[[260,60],[860,90]].map(([x,y])=>E(x,y,70,20,'#fff')+E(x-30,y-12,34,18,'#fff')+E(x+24,y-14,36,22,'#fff')).join('')}${hausreihe(380)}${[[40,'#d83a2a'],[560,'#2a6ab0'],[1420,'#f28a1a']].map(([x,c])=>R(x+10,320,140,120,'#c89060',dk,3)+markise(x,290,160,c,'#fff')+[...Array(5)].map((_,k)=>apf(x+30+k*26,330,10,['#d83a2a','#8ac040',gelb,orange,'#a8c870'][(k+x)%5])).join('')).join('')}${[300,900].map(x=>L(`M${x} 250V440`,'#5a5a62',5)+P(`M${x-40} 250Q${x} 200 ${x+40} 250`,'#e8e0c0')).join('')}${boden(0)}`,
objekte:[
{name:"Preistafel",x:250,y:220,wand:true,by:-80,zeichne:preistafel,fund:"An der Preistafel klebt:"},
{name:"Marktuhr",x:650,y:200,wand:true,by:-70,zeichne:marktuhr,fund:"An der Marktuhr klebt:"},
{name:"Apfelkisten",x:150,boden:700,fuss:4,by:-165,zeichne:apfelkiste,fund:"In der Apfelkiste liegt:"},
{name:"Marktwaage",x:450,boden:650,fuss:4,by:-175,zeichne:marktwaage,fund:"Auf der Marktwaage liegt:"},
{name:"Kartoffelsäcke",x:850,boden:720,fuss:4,by:-140,zeichne:kartoffelsack,fund:"Im Kartoffelsack steckt:"}
],
infoObjekte:[{name:"Obst-Jahreskalender",x:1000,y:240,wand:true,by:-82,zeichne:jahresplakat,fund:"Am Obst-Jahreskalender klebt:"},{name:"Bollerwagen mit Kürbissen",x:1050,boden:600,fuss:4,by:-150,zeichne:bollerwagen,fund:"Im Bollerwagen liegt:"},{name:"Kräutertöpfe",x:1450,boden:740,fuss:4,by:-105,zeichne:kraeutertopf,fund:"Zwischen den Kräutertöpfen liegt:"}]},
{titel:"Die Bäckerei",
intro:"In der Bäckerei ist es warm, und es duftet nach frischem Brot. Im Steinofen glüht das Feuer. Die Bäckerin und der Bäcker sind schon seit dem frühen Morgen wach. Die Tür zur Backstube ist noch verschlossen. Findet die Ziffern, um sie zu öffnen!",
introDu:"In der Bäckerei ist es warm, und es duftet nach frischem Brot. Im Steinofen glüht das Feuer. Die Bäckerin und der Bäcker sind schon seit dem frühen Morgen wach. Die Tür zur Backstube ist noch verschlossen. Finde die Ziffern, um sie zu öffnen!",
tuerX:450,tuerArt:"backstube",
hintergrund:()=>`${defs('#c8704a','#8a4a2a','#ffc070')}${R(0,0,1600,470,'#f4d8a8')}${R(0,300,1600,170,'#e8c090')}${[...Array(40)].map((_,k)=>R((k%20)*80,300+Math.floor(k/20)*85,80,85,'none','#d0a070',2)).join('')}${R(0,0,1600,30,'#c89060')}${[150,700,1100,1500].map(x=>L(`M${x} 30V90`,gr,3)+P(`M${x-30} 110L${x-14} 90H${x+14}L${x+30} 110Z`,'#5a3a20')+C(x,130,130,'url(#licht)')).join('')}${R(90,120,130,160,'#ffe8b0','#8a5a30',6)}${L('M155 120V280M90 200H220','#8a5a30',5)}${P('M930 440V230Q1030 140 1130 230V440Z','#a8988a','#5a4a3a',5)}${P('M970 440V270Q1030 210 1090 270V440Z','#2a1a10')}${C(1030,400,90,'url(#licht)')}${P('M985 440Q1000 380 1020 420Q1030 360 1045 420Q1060 380 1075 440Z',orange)}${P('M1005 440Q1015 410 1030 430Q1045 400 1055 440Z',gelb)}${boden(1)}`,
objekte:[
{name:"Brotregal",x:800,y:230,wand:true,by:-80,zeichne:brotregal,fund:"Im Brotregal liegt:"},
{name:"Rezeptzettel",x:1250,y:220,wand:true,by:-90,zeichne:rezepttafel,fund:"Am Rezeptzettel klebt:"},
{name:"Mehlsäcke",x:150,boden:740,fuss:4,by:-155,zeichne:mehlsaecke,fund:"Am Mehlsack klebt:"},
{name:"Knetmaschine",x:700,boden:680,fuss:4,by:-185,zeichne:teigmaschine,fund:"An der Knetmaschine klebt:"},
{name:"Brottheke",x:1000,boden:560,fuss:4,by:-165,zeichne:brottheke,fund:"In der Brottheke liegt:"}
],
infoObjekte:[{name:"Getreide-Plakat",x:1480,y:240,wand:true,by:-80,zeichne:getreideplakat,fund:"Am Getreide-Plakat klebt:"},{name:"Brötchenkorb",x:1350,boden:700,fuss:4,by:-100,zeichne:broetchenkorb,fund:"Im Brötchenkorb liegt:"},{name:"Backblechwagen",x:1500,boden:600,fuss:4,by:-205,zeichne:blechwagen,fund:"Auf dem Backblech liegt:"}]},
{titel:"Die Supermarkt-Kasse",
intro:"Im Supermarkt summen die hellen Leuchtröhren. Kundinnen und Kunden legen ihre Einkäufe auf das Kassenband. In den Regalen stehen Nudeln, Dosen und Gläser. Die Glas-Schiebetür zum Lager ist noch verschlossen. Findet die Ziffern, um sie zu öffnen!",
introDu:"Im Supermarkt summen die hellen Leuchtröhren. Kundinnen und Kunden legen ihre Einkäufe auf das Kassenband. In den Regalen stehen Nudeln, Dosen und Gläser. Die Glas-Schiebetür zum Lager ist noch verschlossen. Finde die Ziffern, um sie zu öffnen!",
tuerX:800,tuerArt:"glastuer",
hintergrund:()=>`${defs('#e0e4e8','#a8b0b8','#eaf8ff')}${R(0,0,1600,470,'#eef2f4')}${R(0,0,1600,40,'#d8dee4')}${[150,550,1050,1450].map(x=>R(x-90,48,180,10,'#fff','#b8c0c8',2)+C(x,60,150,'url(#licht)')).join('')}${R(0,90,1600,36,'#3a9a5a')}${[[200,'OBST'],[560,'GEMÜSE'],[1060,'BROT'],[1400,'MILCH']].map(([x,t])=>X(x,116,t,'24','#fff')).join('')}${[0,1000].map(x0=>R(x0+20,280,x0?580:560,180,'#d8dce2','#8a9098',3)+[320,380,440].map(y=>R(x0+20,y,x0?580:560,6,'#8a9098')+[...Array(13)].map((_,k)=>R(x0+34+k*42,y-34,30,34,['#e84a3a','#3a8ae0',gelb,gruen,'#f0f0f0',orange][(k+y/20)%6])).join('')).join('')).join('')}${R(0,450,1600,20,'#c8d0d8')}${boden(2)}`,
objekte:[
{name:"Angebotsschild",x:250,y:200,wand:true,by:-110,zeichne:angebot,fund:"Am Angebotsschild klebt:"},
{name:"Konservenregal",x:1150,y:230,wand:true,by:-80,zeichne:konservenregal,fund:"Im Konservenregal steht:"},
{name:"Einkaufswagen",x:150,boden:700,fuss:4,by:-185,zeichne:einkaufswagen,fund:"Im Einkaufswagen liegt:"},
{name:"Kassenband",x:450,boden:650,fuss:4,by:-175,zeichne:kassenband,fund:"Auf dem Kassenband liegt:"},
{name:"Obstwaage zum Selbstwiegen",x:1100,boden:720,fuss:4,by:-190,zeichne:obstwaage,fund:"An der Obstwaage klebt:"}
],
infoObjekte:[{name:"Ernährungskreis",x:1480,y:240,wand:true,by:-95,zeichne:ernaehrungskreis,fund:"Am Ernährungskreis klebt:"},{name:"Einkaufskorb-Stapel",x:1300,boden:600,fuss:4,by:-150,zeichne:korbstapel,fund:"Im obersten Einkaufskorb liegt:"},{name:"Wasserkisten",x:600,boden:740,fuss:4,by:-170,zeichne:wasserkisten,fund:"In der Wasserkiste liegt:"}]},
{titel:"Das Lager",
intro:"Im Lager stehen Hochregale bis unter die Decke. Überall warten Kartons und Paletten. Aus dem Kühlraum kommt eisige Luft, an seiner Tür glitzert Frost. Das Rolltor zum Hof ist noch unten. Findet die Ziffern, um es hochzufahren!",
introDu:"Im Lager stehen Hochregale bis unter die Decke. Überall warten Kartons und Paletten. Aus dem Kühlraum kommt eisige Luft, an seiner Tür glitzert Frost. Das Rolltor zum Hof ist noch unten. Finde die Ziffern, um es hochzufahren!",
tuerX:1300,tuerArt:"rolltor",
hintergrund:()=>`${defs('#9aa0a8','#6a7078','#e8f0ff')}${R(0,0,1600,470,'#8a94a0')}${[...Array(10)].map((_,k)=>L(`M0 ${k*46+20}H1600`,'rgba(40,50,60,.15)',2)).join('')}${[300,800,1300].map(x=>R(x-60,10,120,8,'#fff')+C(x,30,150,'url(#licht)')).join('')}${R(0,60,270,410,'#d8eefa','#5a8ab0',5)}${R(40,110,190,360,'#eaf6fe','#7aaad0',4)}${R(190,260,14,60,'#5a8ab0')}${[...Array(24)].map((_,k)=>C(20+(k*53)%240,80+(k*71)%380,3+k%3,'#fff')).join('')}${L('M10 64Q60 90 100 64T200 64T270 70','#fff',8)}${[420,760].map(x=>L(`M${x} 40V470M${x+260} 40V470`,orange,12)+[120,220,320,420].map(y=>L(`M${x} ${y}H${x+260}`,'#2a5aa8',9)+[0,1,2].map(k=>R(x+20+k*80,y-60,64,58,'#c8945a','#6a4a20',2)).join('')).join('')).join('')}${boden(3)}`,
objekte:[
{name:"Lagerliste",x:300,y:230,wand:true,by:-100,zeichne:lagerliste,fund:"An der Lagerliste klebt:"},
{name:"Kühlraum-Thermometer",x:700,y:220,wand:true,by:-105,zeichne:thermometer,fund:"Am Kühlraum-Thermometer klebt:"},
{name:"Hubwagen mit Palette",x:200,boden:700,fuss:4,by:-175,zeichne:hubwagen,fund:"Auf der Palette liegt:"},
{name:"Kartonturm",x:550,boden:640,fuss:4,by:-210,zeichne:kartonturm,fund:"Im obersten Karton liegt:"},
{name:"Bananenkisten",x:900,boden:720,fuss:4,by:-150,zeichne:bananenkisten,fund:"In der Bananenkiste liegt:"}
],
infoObjekte:[{name:"Herkunftskarte",x:1050,y:240,wand:true,by:-82,zeichne:herkunftskarte,fund:"An der Herkunftskarte klebt:"},{name:"Rollwagen mit Milch",x:1050,boden:600,fuss:4,by:-195,zeichne:milchwagen,fund:"Im Milch-Rollwagen liegt:"},{name:"Sackkarre",x:1500,boden:740,fuss:4,by:-195,zeichne:sackkarre,fund:"Auf der Sackkarre liegt:"}]},
{titel:"Laderampe und Hof",
intro:"Draußen am Hof wird es Abend. Der Himmel färbt sich orange, und die Hoflaterne geht an. An der Laderampe wartet der Lieferwagen. Seine Ladeklappe hat das letzte Zahlenschloss. Findet die Ziffern, damit die Waren verteilt werden können!",
introDu:"Draußen am Hof wird es Abend. Der Himmel färbt sich orange, und die Hoflaterne geht an. An der Laderampe wartet der Lieferwagen. Seine Ladeklappe hat das letzte Zahlenschloss. Finde die Ziffern, damit die Waren verteilt werden können!",
tuerX:600,tuerArt:"ladeklappe",
hintergrund:()=>`${defs('#6a6a70','#3a3a42','#ffd090')}<linearGradient id="smA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a8a"/><stop offset=".6" stop-color="#e8806a"/><stop offset="1" stop-color="#ffd080"/></linearGradient>${R(0,0,1600,470,'url(#smA)')}${[[140,40],[420,60],[1300,36],[1520,70]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${C(820,360,70,'#ffe0a0')}${C(820,360,260,'url(#licht)')}${[...Array(16)].map((_,k)=>{const x=k*100,h=60+(k*37)%90;return R(x,440-h,90,h,'#5a4a7a')+R(x+20,440-h+20,14,14,'#ffe08a')+R(x+54,440-h+20,14,14,(k%2)?'#ffe08a':'#3a2e5a');}).join('')}${R(1100,60,500,410,'#b0583a','#5a2a1a',4)}${[...Array(9)].map((_,k)=>L(`M1100 ${90+k*42}H1600`,'rgba(255,230,210,.3)',2)).join('')}${R(1100,380,500,90,'#8a8680','#4a4640',3)}${R(1100,372,500,12,'#f2c14e')}${boden(4)}`,
objekte:[
{name:"Lieferplan",x:200,y:220,wand:true,by:-80,zeichne:lieferplan,fund:"Am Lieferplan klebt:"},
{name:"Hoflaterne",x:1000,y:200,wand:true,by:-75,zeichne:hoflaterne,fund:"An der Hoflaterne klebt:"},
{name:"Rollcontainer",x:300,boden:700,fuss:4,by:-215,zeichne:rollcontainer,fund:"Im Rollcontainer liegt:"},
{name:"Paketwaage",x:950,boden:640,fuss:4,by:-185,zeichne:paketwaage,fund:"Auf der Paketwaage liegt:"},
{name:"Hochbeet",x:1250,boden:700,fuss:4,by:-150,zeichne:hochbeet,fund:"Im Hochbeet liegt:"}
],
infoObjekte:[{name:"Tafel der Berufe",x:1350,y:240,wand:true,by:-82,zeichne:berufetafel,fund:"An der Tafel der Berufe klebt:"},{name:"Mehrwegkisten",x:1450,boden:600,fuss:4,by:-180,zeichne:mehrwegkisten,fund:"In der obersten Mehrwegkiste liegt:"},{name:"Lastenrad",x:800,boden:740,fuss:4,by:-155,zeichne:lastenrad,fund:"In der Kiste vom Lastenrad liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="smE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a8a"/><stop offset=".55" stop-color="#f0806a"/><stop offset="1" stop-color="#ffd870"/></linearGradient><radialGradient id="smS"><stop offset="0" stop-color="#fff0c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff0c0" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes smf{from{transform:translateX(0)}to{transform:translateX(440px)}}@keyframes smw{50%{transform:rotate(-30deg)}}.smfz{animation:smf 5s ease-in both}.smwk{animation:smw .8s ease-in-out infinite}</style>
   <rect width="1000" height="600" fill="url(#smE)"/>${[[90,50],[260,90],[760,60],[920,110]].map(([x,y])=>C(x,y,3,'#fff6c8')).join('')}${C(820,300,200,'url(#smS)')}${C(820,300,56,'#fff0a0')}
   ${[...Array(10)].map((_,k)=>{const x=k*100,h=50+(k*37)%80;return R(x,420-h,90,h,'#5a4a7a')+R(x+30,440-h,14,14,'#ffe08a');}).join('')}${R(0,420,1000,180,'#4a4a52')}${R(0,420,1000,20,'#8a8680')}${L('M0 520H120M200 520H320M400 520H520M600 520H720M800 520H920','#fff',6)}
   ${R(30,330,170,110,'#c89060',dk,3)}${markise(20,290,200,'#3a8a4a','#fff')}${[...Array(5)].map((_,k)=>apf(60+k*28,326,11,['#d83a2a','#8ac040',orange,gelb,'#d83a2a'][k])).join('')}
   <g class="smfz">${R(250,370,190,120,'#f4f4f0','#2a4a2a',4)}${R(250,420,190,18,'#3a9a5a')}${P('M440 490V390H490L526 440V490Z','#f4f4f0','#2a4a2a',4)}${P('M450 400H486L512 436H450Z','#9ad0f0')}${U('smkorb',320,380,40,'#3a9a5a')}${C(300,494,20,'#2a2a30')}${C(470,494,20,'#2a2a30')}${C(300,494,8,chrom)}${C(470,494,8,chrom)}${C(522,466,7,'#fff6b0')}</g>
   ${mensch(130,570,'#f0c8a0','#3a8a4a',P('M114 484Q130 466 146 484Z','#3a7a3a'))}${mensch(240,585,'#a8704a','#fff',E(240,487,18,9,'#fff','#aaa',2)+R(227,489,26,8,'#fff'))}${mensch(350,570,'#e8b890',rot,'')}${mensch(460,585,'#8a5a3a',gelb,R(445,489,30,8,'#2a5a9a')+R(455,493,24,4,'#2a5a9a'))}
   ${U('smapfel',600,150,30,'#fff6c0')}${U('smbrot',380,110,26,'#fff6c0')}${U('smmoehre',880,140,34,'#fff6c0')}`
};
})();