document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-btblume\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-13 -17L-6 -9L0 -19L6 -9L13 -17Q16 4 0 6Q-16 4 -13 -17Z\"/><path d=\"M0 6V19M0 14Q-8 8 -12 12M0 14Q8 8 12 12\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-btherz\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 17C-30 -1 -18 -26 0 -9C18 -26 30 -1 0 17Z\"/></symbol>\n<symbol id=\"sym-btsocke\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-9 -19H7V1L16 7Q21 16 12 18H-3Q-11 18 -9 9Z\"/><path d=\"M-9 -13H7M-9 -7H7\" stroke=\"#fff\" stroke-width=\"3\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-btballon\" viewBox=\"-20 -20 40 40\"><ellipse cx=\"0\" cy=\"-5\" rx=\"13\" ry=\"15\" fill=\"currentColor\"/><path d=\"M-3 10H3L0 13Z\" fill=\"currentColor\"/><path d=\"M0 13Q-6 16 0 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><ellipse cx=\"-5\" cy=\"-10\" rx=\"3\" ry=\"5\" fill=\"#fff\" opacity=\".5\"/></symbol>\n<symbol id=\"sym-btsonne\" viewBox=\"-20 -20 40 40\"><circle cx=\"0\" cy=\"0\" r=\"9\" fill=\"currentColor\"/><path d=\"M0 -19V-13M0 13V19M-19 0H-13M13 0H19M-13 -13L-9 -9M9 9L13 13M-13 13L-9 9M9 -9L13 -13\" stroke=\"currentColor\" stroke-width=\"4\" stroke-linecap=\"round\"/></symbol>\n</defs>\n</svg>");
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
const B=(x,y,a,s,c)=>`<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0Q25 -16 50 0Q25 16 0 0Z" fill="${c}"/>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.3)');
const holz='#b07a3a',dk='#4a2a10',gelb='#ffd23a',rot='#ef4a4a',blau='#3a8ae8',gruen='#4ab04a',dgr='#1f6a2a',rosa='#f37ab8',lila='#a05ae0',orange='#ff9a2a',tk='#2ad0c8',weiss='#fffaf0';
const gr='#3a3a40';const bunt=[rot,orange,gelb,gruen,blau,lila];
const bl=(x,y,c,r)=>[0,72,144,216,288].map(a=>C(x+Math.sin(a/57.3)*r,y-Math.cos(a/57.3)*r,r*.8,c)).join('')+C(x,y,r*.6,gelb);
const korb=(w,h)=>P(`M${-w} ${-h}H${w}L${w-12} 0H${12-w}Z`,'#c8963a','#6a4a10',3)+L(`M${4-w} ${-h*.62}H${w-4}M${8-w} ${-h*.3}H${w-8}`,'#6a4a10',2);
const kiste=(x,y,w,h,c)=>R(x,y,w,h,c||holz,dk,3)+L(`M${x} ${y+h/2}H${x+w}`,dk,2);
const tafel=(c,t)=>R(-88,-64,176,128,weiss,c,5)+R(-88,-64,176,22,c)+X(0,-47,t,'14','#fff');
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".55"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const hg=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<80;k++)d+=L(`M${(k*137+20)%1600} ${490+(k*53)%280}l-5 -12M${(k*137+26)%1600} ${490+(k*53)%280}l4 -13`,'#2a7a2a',3);let f='';for(let k=0;k<26;k++)f+=bl((k*263+90)%1600,500+(k*79)%260,bunt[k%6],5);return g+d+f+P('M1100 780Q1250 600 1300 470H1360Q1340 600 1300 780Z','#e8d0a0');}
if(m==1){for(let r=0;r<6;r++)for(let k=0;k<16;k++)if((r+k)%2)d+=R(k*100,470+r*52,100,52,'rgba(255,255,255,.55)');return g+d+L('M0 470H1600','#c8508a',6);}
if(m==2){for(const y of[495,525,560,605,660,725])d+=`M0 ${y}H1600`;let f='';for(let k=0;k<30;k++)f+=C((k*173+40)%1600,(k*7)%2?510+(k*41)%220:540+(k*43)%200,3,'#3a2210');return g+L(d,'rgba(40,20,10,.55)',3)+f+P('M1000 470L1250 470L1500 780L900 780Z','rgba(255,240,180,.18)');}
if(m==3){for(let r=0;r<5;r++)for(let k=0;k<11;k++)d+=R(k*150-(r%2)*75,476+r*62,146,58,bunt[(r*2+k)%6],'rgba(255,255,255,.6)',3);return g+`<g opacity=".7">${d}</g>`;}
for(let y of[490,515,545,580,620,670,730])d+=`M0 ${y}H1600`;for(let x=-400;x<2000;x+=130)d+=`M${800+(x-800)*.45} 470L${x} 780`;return g+L(d,'rgba(80,40,20,.45)',3)+E(800,640,240,55,'#4ab0a0','#1a6a60',4)+E(800,640,180,36,'none',gelb,4);}
const vogelhaus=()=>`${L('M0 -70V-40',dk,4)}${P('M-50 -30L0 -72L50 -30Z',rot,'#8a2020',3)}${R(-40,-30,80,70,gelb,dk,3)}${C(0,0,14,'#4a2a10')}${R(-24,40,48,8,holz)}${U('btherz',-10,-60,20,'#fff')}${E(34,32,10,12,blau)}${C(34,18,8,blau)}${P('M41 16l8 3l-8 3Z',orange)}`;
const waescheleine=()=>`${L('M-100 -40Q0 -10 100 -40','#8a7a6a',3)}${[-74,-40,-6,28,62].map((x,k)=>R(x-3,-34+Math.abs(x)*-.2+10,6,12,holz)+U('btsocke',x-18,-24+Math.abs(x)*-.2+10,40,bunt[(k*2)%6])).join('')}${C(-100,-40,6,holz)}${C(100,-40,6,holz)}`;
const schaukel=()=>`${sch(90)}${L('M-80 0L-60 -230M80 0L60 -230M-60 -230H60',holz,10)}${L('M-30 -230V-60M30 -230V-60','#c8a46a',4)}${R(-44,-64,88,14,rot,'#8a2020',3)}${[-30,30].map(x=>bl(x,-232,bunt[x>0?4:1],5)).join('')}`;
const zwerge=()=>`${sch(90)}${[[-56,0,rot],[0,10,blau],[56,-4,gelb]].map(([x,d,c])=>R(x-16,-60+d,32,40-d+d,gruen,dgr,2)+R(x-16,-22,32,22,'#7a4a20')+C(x,-72+d,14,'#f6d2b0')+P(`M${x-16} ${-78+d}L${x} ${-124+d}L${x+16} ${-78+d}Z`,c,'rgba(0,0,0,.3)',2)+P(`M${x-13} ${-68+d}Q${x} ${-30+d} ${x+13} ${-68+d}Z`,'#fff')+C(x-5,-76+d,2,'#111')+C(x+5,-76+d,2,'#111')).join('')}`;
const blumenbeet=()=>`${sch(110)}${R(-110,-30,220,30,'#8a5a30',dk,3)}${E(0,-30,106,12,'#5a3a20')}${[...Array(9)].map((_,k)=>L(`M${-88+k*22} -30V${-70-k%3*14}`,dgr,3)+bl(-88+k*22,-70-k%3*14,bunt[k%6],7)).join('')}`;
const gartentafel=()=>`${tafel(gruen,'MEIN GARTEN')}${U('btsonne',-74,-34,32,orange)}${L('M-40 50V10',dgr,4)}${B(-40,20,-130,.7,gruen)}${B(-40,30,-50,.7,gruen)}${bl(-40,8,rosa,8)}${L('M0 -20H70M0 0H70M0 20H60M0 40H50','#9a9a80',3)}`;
const giesskanne=()=>`${sch(70)}${P('M-46 0V-76Q0 -90 46 -76V0Z',tk,'#1a7a74',3)}${L('M46 -60L90 -100',tk,9)}${E(92,-102,10,6,'#1a7a74')}${L('M-46 -70Q-80 -60 -46 -20','#1a7a74',7)}${U('btblume',-14,-58,28,'#fff')}`;
const schubkarre=()=>`${sch(110)}${C(-80,-22,22,gr,'#111',4)}${P('M-110 -50H90L60 -20H-80Z',blau,'#1a4a8a',3)}${L('M70 -30L120 0M50 -20L80 0',holz,6)}${[[-60,-62,22],[-14,-66,26],[34,-62,20]].map(([x,y,r])=>E(x,y,r,r*.8,orange,'#a05010',2)+L(`M${x} ${y-r*.8}l3 -8`,dgr,3)).join('')}`;
const kuechenuhr=()=>`${C(0,0,66,rosa,'#a03a7a',6)}${C(0,0,54,weiss)}${[...Array(12)].map((_,k)=>C(Math.sin(k/1.91)*44,-Math.cos(k/1.91)*44,k%3?3:6,bunt[k%6])).join('')}${X(0,-28,'12','14',dk)}${X(30,6,'3','14',dk)}${X(0,40,'6','14',dk)}${X(-30,6,'9','14',dk)}${L('M0 0V-36M0 0L24 10',dk,5)}${C(0,0,5,rot)}`;
const geschirrregal=()=>`${R(-96,-70,192,140,'#7ad0e8','#2a6a8a',4)}${L('M-96 -20H96M-96 30H96','#2a6a8a',5)}${[-70,-34,2,38,74].map((x,k)=>C(x,-44,17,bunt[k],'#fff',3)).join('')}${[-66,-26,14,54].map((x,k)=>R(x-12,6,24,22,bunt[k+2],'#fff',2)+L(`M${x+12} 12q10 4 0 12`,bunt[k+2],3)).join('')}${[-60,0,60].map((x,k)=>E(x,56,22,10,bunt[5-k],'#fff',2)).join('')}`;
const herd=()=>`${sch(100)}${R(-90,-110,180,110,'#f0f0f4','#6a6a7a',4)}${R(-70,-80,140,60,'#3a3a48','#6a6a7a',3)}${C(-50,-98,6,rot)}${C(50,-98,6,gruen)}${E(-10,-114,60,10,'#3a3a40')}${L('M50 -114H110',holz,8)}${[0,1,2,3].map(k=>E(-10,-126-k*9,40,8,'#f0c060','#c08020',2)).join('')}${P('M-24 -162Q-10 -170 4 -162Q-10 -156 -24 -162Z',gelb)}${C(-10,-140,80,'url(#licht)')}`;
const mehlsack=()=>`${sch(70)}${P('M-56 0Q-66 -60 -50 -110L-30 -124H30L50 -110Q66 -60 56 0Z','#f4ecd8','#a8987a',3)}${L('M-30 -124Q0 -110 30 -124','#a8987a',4)}${X(0,-50,'MEHL','22','#a05a20')}${U('btherz',-10,-40,20,rosa)}${C(-40,-132,14,'rgba(255,255,255,.8)')}${C(-58,-146,10,'rgba(255,255,255,.6)')}`;
const teigtisch=()=>`${sch(90)}${R(-90,-96,180,14,holz,dk,3)}${L('M-76 -82V0M76 -82V0',dk,8)}${E(0,-114,54,24,lila,'#5a2a8a',3)}${E(0,-130,48,10,'#fff0c0')}${L('M24 -130L60 -180','#8a8a9a',5)}${E(64,-190,10,16,'none','#8a8a9a',3)}${[-60,62].map((x,k)=>E(x,-104,12,15,k?'#fff':'#f0d0a0','#a08060',2)).join('')}`;
const rezepttafel=()=>`${R(-92,-66,184,132,'#2a4a3a',holz,8)}${X(0,-40,'PFANNKUCHEN','15','#fff')}${[[-70,-12],[-70,14],[-70,40]].map(([x,y],k)=>E(x,y,8,10,['#fff','#ffe0a0','#fff'][k])).join('')}${L('M-52 -12H60M-52 14H40M-52 40H70','rgba(255,255,255,.7)',3)}`;
const eierkorb=()=>`${sch(70)}${korb(66,50)}${[-40,-14,12,38,-26,2,28].map((x,k)=>E(x,k>3?-74:-56,12,15,['#fff8e8','#f0d0a0'][k%2],'#a08060',2)).join('')}${L('M-54 -50Q0 -130 54 -50','#8a5a20',5)}`;
const toepfe=()=>`${sch(80)}${R(-37,-40,74,40,rot,'#8a2020',3)}${R(-26,-76,60,36,blau,'#1a4a8a',3)}${R(-16,-104,46,28,gelb,'#a08010',3)}${L('M-46 -30H-37M37 -30H46M-34 -66H-26M34 -66H42',gr,5)}${E(7,-108,26,6,gruen)}`;
const schatzkarte=()=>`${P('M-92 -60L-60 -66L-20 -58L30 -66L92 -58V60L50 66L0 58L-50 66L-92 60Z','#f4e0b0','#a07a40',3)}${P('M-50 -30Q-20 -50 20 -36Q60 -30 50 10Q30 40 -10 30Q-60 30 -50 -30Z','#bfe8a0','#6a9a4a',2)}${L('M-70 40L-40 20L-10 10L20 -6L40 -20','#c04a2a',3)}${U('btherz',30,-34,24,rot)}${X(-66,-36,'N','14',dk)}`;
const spinnennetz=()=>`${[0,45,90,135].map(a=>`<path transform="rotate(${a})" d="M-80 0H80" stroke="rgba(255,255,255,.7)" stroke-width="2"/>`).join('')}${[24,48,72].map(r=>C(0,0,r,'none','rgba(255,255,255,.6)',2)).join('')}${[[30,-20],[-40,30],[50,40],[-20,-60]].map(([x,y])=>C(x,y,4,tk)).join('')}${L('M20 -80V-30','rgba(255,255,255,.7)',2)}${C(20,-20,12,lila)}${C(16,-22,3,'#fff')}${C(24,-22,3,'#fff')}${L('M16 -15Q20 -12 24 -15','#fff',2)}${L('M8 -20l-10 -6M8 -14l-10 6M32 -20l10 -6M32 -14l10 6',lila,3)}`;
const geldtruhe=()=>`${sch(90)}${kiste(-80,-70,160,70,'#c0504a')}${P('M-80 -70Q-80 -116 0 -116Q80 -116 80 -70Z','#d86a50',dk,3)}${L('M-50 -114V0M50 -114V0',gelb,6)}${[[-30,-120],[0,-126],[30,-120],[-14,-136],[16,-138]].map(([x,y])=>C(x,y,11,gelb,'#a07010',2)).join('')}${R(-70,-132,40,22,'#9ae0a0','#3a8a4a',2)}${C(0,-100,60,'url(#licht)')}`;
const muschelkiste=()=>`${sch(80)}${kiste(-70,-60,140,60,'#5a9ad8')}${[[-44,-62,rosa],[-14,-68,'#fff0e0'],[16,-62,orange],[44,-68,tk]].map(([x,y,c])=>P(`M${x} ${y}L${x-14} ${y-10}Q${x} ${y-30} ${x+14} ${y-10}Z`,c,'#a0603a',2)).join('')}${E(0,-30,30,8,'none','#fff',2)}`;
const koffer=()=>`${sch(100)}${R(-90,-60,180,60,'#e8a030',dk,3)}${P('M-90 -60L-70 -140H70L90 -60Z','#f0b850',dk,3)}${R(-20,-150,40,12,dk)}${P('M-60 -60Q-50 -110 -20 -80L-40 -60Z',lila)}${E(30,-80,40,10,blau)}${R(14,-116,32,36,blau)}${L('M-80 -40Q0 -20 80 -50',rosa,8)}${U('btsonne',-12,-40,24,gelb)}`;
const ordnungstafel=()=>`${tafel(orange,'ORDNUNG')}${[[-70,-30,rot],[-20,-30,blau],[30,-30,gruen],[-70,14,gelb],[-20,14,lila],[30,14,tk]].map(([x,y,c])=>R(x,y,42,36,c,'#fff',2)).join('')}${L('M76 -30V50',orange,4)}`;
const kistenstapel=()=>`${sch(90)}${kiste(-86,-60,90,60,'#c89a5a')}${kiste(8,-60,80,60,'#b88a4a')}${kiste(-56,-120,96,60,'#d8aa6a')}${X(-41,-20,'A','24',dk)}${X(48,-20,'B','24',dk)}${X(-8,-80,'C','24',dk)}`;
const globus=()=>`${sch(60)}${R(-40,-12,80,12,holz)}${L('M0 -12V-40M-50 -110A54 54 0 0 0 30 -60',dk,5)}${C(0,-110,54,'#5ab0f0','#1a5a9a',3)}${P('M-30 -140Q-10 -150 0 -130Q-10 -110 -30 -120Z',gruen)}${P('M10 -100Q40 -110 40 -86Q20 -70 10 -80Z',gruen)}${P('M-20 -90Q-10 -84 -16 -74Z',gruen)}`;
const sammelbilder=()=>`${R(-96,-66,192,132,'#ffe8b0',orange,4)}${[...Array(8)].map((_,k)=>R(-84+(k%4)*44,-56+Math.floor(k/4)*60,38,52,'#fff',bunt[k%6],3)+U(['btblume','btherz','btsocke','btballon','btsonne'][k%5],-75+(k%4)*44,-46+Math.floor(k/4)*60,20,bunt[(k+2)%6])).join('')}`;
const buecherregal=()=>`${R(-100,-76,200,152,'#c8783a',dk,4)}${L('M-100 -26H100M-100 24H100',dk,5)}${[...Array(27)].map((_,k)=>{const r=Math.floor(k/9),x=-94+(k%9)*21,h=34+(k*7)%12;return R(x,-26+r*50-h,18,h,bunt[(k+r)%6],'rgba(0,0,0,.3)',1);}).join('')}`;
const trampolin=()=>`${sch(110)}${L('M-90 0V-50M90 0V-50M-50 0V-46M50 0V-46',gr,6)}${E(0,-54,110,22,'#2a2a3a',blau,8)}${[...Array(10)].map((_,k)=>L(`M${-100+k*22} ${-44-Math.abs(k-4.5)*-1}l0 8`,gelb,3)).join('')}${E(0,-56,70,12,'rgba(255,255,255,.15)')}`;
const zauberhut=()=>`${sch(70)}${E(0,-80,70,14,'#3a8ae8','#1a4a8a',3)}${L('M0 -80V0',dk,6)}${E(0,-2,40,8,dk)}${E(0,-96,44,10,'#2a2a3a')}${R(-28,-170,56,74,'#2a2a3a')}${R(-28,-118,56,12,rot)}${E(0,-170,28,6,'#4a4a5a')}${[[-30,-200],[10,-214],[40,-190]].map(([x,y],k)=>U('btsonne',x-10,y-10,20,[gelb,rosa,tk][k])).join('')}`;
const eisenbahn=()=>`${sch(130)}${E(0,-12,130,22,'none','#8a6a4a',6)}${E(0,-12,130,22,'none','#c8a46a',2)}${R(-110,-60,60,40,rot,'#8a2020',3)}${R(-100,-90,30,30,rot,'#8a2020',3)}${R(-60,-80,14,20,dk)}${[-40,10,60].map((x,k)=>R(x,-54,44,32,bunt[k+2],'rgba(0,0,0,.3)',3)).join('')}${[-100,-64,-30,0,20,50,70,96].map(x=>C(x,-18,8,gr)).join('')}${C(-52,-96,8,'rgba(255,255,255,.7)')}${C(-40,-110,10,'rgba(255,255,255,.5)')}`;
const zirkusplakat=()=>`${R(-80,-66,160,132,'#fff0d8',rot,5)}${P('M-60 40L0 -40L60 40Z',rot)}${P('M-40 40L0 -40L-20 40Z','#fff')}${P('M20 40L0 -40L40 40Z','#fff')}${L('M0 -40V-56',dk,3)}${P('M0 -56L16 -50L0 -44Z',gelb)}${X(0,58,'ZIRKUS','15',rot)}${[[-60,-40],[60,-30]].map(([x,y])=>U('btsonne',x-10,y-10,20,gelb)).join('')}`;
const ballkorb=()=>`${sch(70)}${korb(60,56)}${[[-34,-66,rot],[-4,-72,gelb],[26,-66,blau],[-18,-90,gruen],[12,-94,lila]].map(([x,y,c])=>C(x,y,16,c,'rgba(0,0,0,.3)',2)+L(`M${x-12} ${y-4}Q${x} ${y+6} ${x+12} ${y-4}`,'#fff',2)).join('')}`;
const kloetze=()=>`${sch(60)}${[[0,blau,'A'],[1,gelb,'B'],[2,rot,'C'],[3,gruen,'D']].map(([k,c,t])=>R(-28+(k%2)*8-4,-50-k*44,52,44,c,'rgba(0,0,0,.35)',3)+X(-2+(k%2)*8-4,-20-k*44,t,'24','#fff')).join('')}`;
const windspiel=()=>`${E(0,-70,46,10,holz,dk,2)}${[-34,-17,0,17,34].map((x,k)=>L(`M${x} -66V${-10+k%3*16}`,'#c8c8d0',2)+R(x-5,-10+k%3*16,10,40,['#e8e8f0','#c8d8f8'][k%2],'#8a8aa0',1)+U('btsonne',x-8,34+k%3*16,16,bunt[k])).join('')}${L('M0 -80V-96',dk,3)}`;
const blumenampel=()=>`${L('M0 -100L-50 -20M0 -100L50 -20M0 -100V-20','#c8a46a',3)}${P('M-60 -20H60Q50 30 0 34Q-50 30 -60 -20Z',rosa,'#a03a7a',3)}${[-44,-20,4,28,48].map((x,k)=>bl(x,-30-k%2*16,bunt[(k*2+1)%6],8)).join('')}${L('M-50 20Q-60 60 -40 80M50 20Q64 56 46 74',gruen,4)}`;
const schaukelstuhl=()=>`${sch(90)}${L('M-90 0Q0 24 90 0',holz,8)}${L('M-60 6V-60M50 6V-60M-60 -60L-74 -170',dk,8)}${R(-66,-70,122,16,holz,dk,3)}${P('M-74 -170L-60 -64L-40 -64L-52 -168Z',holz)}${R(-62,-90,110,24,lila,'#5a2a8a',2)}${[0,1,2].map(k=>L(`M${-54+k*36} -88l14 20`,'#fff',3)).join('')}`;
const laterne=()=>`${sch(50)}${R(-24,-8,48,8,dk)}${L('M0 -8V-120',dk,6)}${P('M-30 -120H30L22 -190H-22Z','rgba(255,230,140,.85)',dk,4)}${P('M-34 -190H34L0 -214Z',dk)}${C(0,-155,14,'#fff6c0')}${C(0,-155,90,'url(#licht)')}`;
const fernglas=()=>`${sch(60)}${L('M0 -90L-36 0M0 -90L36 0M0 -90V0',dk,5)}${`<g transform="translate(0 -100) rotate(-12)">${R(-40,-30,34,44,gr,'#111',3)}${R(6,-30,34,44,gr,'#111',3)}${R(-6,-20,12,20,'#5a5a60')}${C(-23,-30,15,'#5ab0f0')}${C(23,-30,15,'#5ab0f0')}</g>`}`;
const abendtafel=()=>`${tafel(rosa,'DER ABEND')}${R(-76,-38,152,82,'#f8b080')}${C(0,40,26,orange)}${R(-76,40,152,4,'#c06a3a')}${P('M-76 44V30Q-40 10 0 28Q40 12 76 30V44Z',dgr)}${[[-50,-24],[-20,-30],[40,-20]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${C(56,-20,9,'#fff6c0')}`;
const kissen=()=>`${sch(80)}${[[0,rot,80],[1,gelb,72],[2,blau,64],[3,gruen,56]].map(([k,c,w])=>P(`M${-w} ${-k*26}Q0 ${-k*26+10} ${w} ${-k*26}V${-k*26-26}Q0 ${-k*26-34} ${-w} ${-k*26-26}Z`,c,'rgba(0,0,0,.3)',2)+C(0,-k*26-13,4,'#fff')).join('')}`;
const hundekorb=()=>`${sch(100)}${E(0,-26,96,30,'#c8963a','#6a4a10',4)}${E(0,-36,80,16,'#e8b0c0')}${E(-6,-44,50,20,'#b07a40')}${C(42,-50,20,'#b07a40')}${E(56,-40,9,6,'#3a2010')}${E(34,-62,10,16,'#7a4a20')}${L('M36 -54q6 4 12 0','#3a2010',2)}${L('M-56 -46q-20 -10 -24 -30','#b07a40',8)}${X(-40,-76,'z','16','#5a5a8a')}${X(-26,-92,'z','12','#5a5a8a')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#3a2a4a" stroke="#ffd23a" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#3a2a4a" stroke="#ffd23a" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #btg1{transform:scaleX(.1)}.tuer.offen #btg2{transform:scaleX(.1)}.tuer.offen #btsk{transform:scaleX(.08)}.tuer.offen #btlk{transform:translateY(-250px);opacity:0}.tuer .btfl{opacity:0;transform:translateY(60px)}.tuer.offen .btfl{opacity:1;transform:none}.tuer.offen #btvh{transform:scaleY(.08)}.tuer.offen #btv1{transform:scaleX(.1)}.tuer.offen #btv2{transform:scaleX(.1)}@keyframes btst{50%{opacity:.2}}.btsb{animation:btst 2.4s ease-in-out infinite}</style>`;
function tuerTor(n){
const fl=(x,c)=>{let s='';for(let k=0;k<5;k++)s+=P(`M${x+4+k*21} 470V300l9 -16l9 16V470Z`,bunt[(k+c)%6],'#fff',2);return s+L(`M${x} 340H${x+110}M${x} 430H${x+110}`,'#fff',6);};
return`${R(390,200,220,270,'#bfe8ff')}${P('M440 470L480 330H520L560 470Z','#e8d0a0')}${R(400,300,200,40,'#5ab04a')}${[[430,360],[570,350]].map(([x,y],k)=>bl(x,y,bunt[k*3],8)).join('')}${R(330,200,62,270,dgr)}${R(608,200,62,270,dgr)}${[...Array(8)].map((_,k)=>C(340+(k%2)*320+(k%4>1?30:0),214+Math.floor(k/4)*130,30,k%2?'#2a8a3a':'#3a9a3a')).join('')}${bunt.map((c,k)=>L(`M${336+k*9} 230A${164-k*9} ${130-k*9} 0 0 1 ${664-k*9} 230`,c,9)).join('')}
   <g id="btg1" class="tb" style="transform-origin:390px 380px">${fl(390,0)}</g>
   <g id="btg2" class="tb" style="transform-origin:610px 380px">${fl(500,3)}</g>
   <g class="tb pl">${sPl(n,390)}</g>`;
}
function tuerKammer(n){
let r='';for(let k=0;k<4;k++)r+=L(`M408 ${230+k*60}H592`,holz,6)+[0,1,2,3].map(j=>R(420+j*44,200+k*60,30,28,bunt[(j+k)%6],'#fff',2)).join('');
return`${R(380,150,240,320,'#fff','#c8508a',8)}${R(396,166,208,304,'#ffe8b0')}${r}${C(500,300,110,'url(#licht)')}${P('M380 150Q500 100 620 150Z',rosa,'#c8508a',4)}${U('btherz',488,116,24,'#fff')}
   <g id="btsk" class="tb" style="transform-origin:396px 300px">${R(396,166,208,304,tk,'#1a7a74',4)}${[[440,220],[560,240],[470,400],[560,420],[420,320]].map(([x,y],k)=>C(x,y,12,bunt[k],'#fff',2)).join('')}${C(500,230,34,'#bfe8ff','#fff',5)}${C(580,330,9,gelb,'#a08010',2)}${X(500,300,'VORRAT','18','#fff')}</g>
   <g class="tb pl">${sPl(n,360)}</g>`;
}
function tuerLuke(n){
let s='';for(let k=0;k<5;k++)s+=L(`M440 ${450-k*58}H560`,'#d8a050',8);
return`${P('M360 470V200L500 120L640 200V470Z','#5a3a2a','#2a1a10',5)}${R(400,190,200,280,'#ffe0a0')}${C(500,330,130,'url(#licht)')}${R(400,400,200,70,'#f0a8c0')}
   <g class="tb btfl">${L('M440 470V160M560 470V160','#b07a3a',10)}${s}</g>
   <g id="btlk" class="tb">${R(400,190,200,280,'#8a5a30','#3a2010',5)}${[230,290,350,410].map(y=>L(`M404 ${y}H596`,'#5a3a20',3)).join('')}${R(470,196,60,14,'#5a5a60')}${L('M410 200L590 460M590 200L410 460','#5a3a20',6)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerVorhang(n){
let f='';for(let k=0;k<11;k++)f+=R(380+k*22,150,22,320,k%2?'#c8202a':'#e83a3a');
return`${R(360,120,280,350,'#3a1a4a')}${R(400,180,200,290,'#2a8ad0','#1a4a7a',5)}${R(410,190,180,270,'#bfe8ff')}${P('M410 460V360Q500 300 590 360V460Z','#f0a050')}${R(400,440,200,30,holz)}${R(380,460,240,10,dk)}${[...Array(12)].map((_,k)=>C(370+k*24,130,7,gelb,'#c88a10',2)).join('')}${P('M360 120H640V160Q500 200 360 160Z',lila,'#5a2a8a',3)}
   <g id="btvh" class="tb" style="transform-origin:500px 150px">${f}${L('M380 160Q500 190 620 160',gelb,5)}</g>
   <g class="tb pl">${sPl(n,340)}</g>`;
}
function tuerVeranda(n){
const fl=x=>R(x,160,110,310,'rgba(255,255,255,.25)','#fff',8)+L(`M${x+55} 160V470M${x} 260H${x+110}M${x} 360H${x+110}`,'#fff',5)+C(x+(x<500?96:14),330,6,gelb);
return`${R(380,150,240,320,'#3a2a6a')}${R(390,160,220,310,'#f0a070')}${C(500,360,50,'#ffd060')}${C(500,360,110,'url(#licht)')}${R(390,360,220,110,dgr)}${[420,480,540,590].map((x,k)=>L(`M${x} 200V230`,'#fff',1)+E(x,240,12,15,bunt[k])).join('')}${L('M390 230Q500 260 610 230','#fff',2)}${P('M370 150H630L500 110Z',holz,dk,4)}${R(370,150,10,320,holz)}${R(620,150,10,320,holz)}
   <g id="btv1" class="tb" style="transform-origin:390px 300px">${fl(390)}</g>
   <g id="btv2" class="tb" style="transform-origin:610px 300px">${fl(500)}</g>
   <g class="tb pl">${sPl(n,300)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'gartentor';
const arten={gartentor:[tuerTor,'Gartentor unter dem Regenbogen mit Zahlenschloss'],speisekammer:[tuerKammer,'Tür zur Speisekammer mit Zahlenschloss'],dachluke:[tuerLuke,'Luke mit Leiter mit Zahlenschloss'],vorhang:[tuerVorhang,'Zirkusvorhang vor der Tür mit Zahlenschloss'],verandatuer:[tuerVeranda,'Glastür zum Garten mit Zahlenschloss']};
const a=arten[art]||arten.gartentor;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const papagei=(x,y,c,f)=>`${E(x,y,16,24,c)}${C(x,y-26,13,c)}${P(`M${x+9} ${y-30}q12 2 8 14q-4 -6 -8 -6Z`,'#fff0a0')}${C(x+4,y-29,3,'#111')}${P(`M${x-4} ${y+18}l-8 34l14 -8Z`,f)}<g class="btwk" style="transform-origin:${x-8}px ${y-10}px">${P(`M${x-8} ${y-10}Q${x-40} ${y-40} ${x-46} ${y-6}Q${x-26} ${y+2} ${x-8} ${y+6}Z`,f)}</g>`;
const hund=(x,y)=>`${E(x,y,46,22,'#c08a4a')}${L(`M${x-30} ${y+14}v26M${x+26} ${y+14}v26`,'#c08a4a',10)}<g class="btwk" style="transform-origin:${x-40}px ${y-6}px">${L(`M${x-40} ${y-6}q-20 -14 -18 -36`,'#c08a4a',8)}</g><g class="btwk" style="transform-origin:${x+40}px ${y}px">${L(`M${x+40} ${y}l20 -40`,'#c08a4a',10)}</g>${C(x+44,y-30,22,'#c08a4a')}${E(x+30,y-36,9,18,'#7a4a20')}${C(x+50,y-34,3,'#111')}${E(x+64,y-26,6,5,'#3a2010')}${L(`M${x+50} ${y-18}q8 6 14 0`,'#3a2010',2)}`;
const kind=(x,y,c,s,h,k)=>`<g class="btkt" style="animation-delay:${k*.18}s">${L(`M${x-8} ${y}l-8 30M${x+8} ${y}l8 30`,s,6)}${P(`M${x} ${y-50}L${x-24} ${y+4}H${x+24}Z`,c)}${L(`M${x-6} ${y-42}l-22 -24M${x+6} ${y-42}l22 -24`,s,6)}${C(x,y-62,14,s)}${P(`M${x-15} ${y-62}Q${x} ${y-88} ${x+15} ${y-62}Q${x} ${y-72} ${x-15} ${y-62}Z`,h)}${C(x-5,y-62,2,'#111')}${C(x+5,y-62,2,'#111')}${L(`M${x-5} ${y-55}Q${x} ${y-51} ${x+5} ${y-55}`,'#111',2)}</g>`;
const lampion=(x,y,c)=>`${L(`M${x} ${y-30}V${y-20}`,'#3a3a40',2)}${C(x,y,36,'url(#btS)')}${E(x,y,17,21,c)}${R(x-9,y-24,18,6,'#3a3a40')}${R(x-9,y+18,18,6,'#3a3a40')}`;
SZENARIEN.buntehaus={
name:"Das bunte Haus",
symbole:["btblume","btherz","btsocke","btballon","btsonne"],
symbolNamen:["Blume","Herz","Socke","Ballon","Sonne"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect width="120" height="90" rx="10" fill="#bfe8ff"/><rect y="68" width="120" height="22" fill="#4ab04a"/><path d="M30 40L60 14L90 40Z" fill="#ef4a4a"/><rect x="34" y="40" width="52" height="34" fill="#ffd23a"/><rect x="40" y="46" width="12" height="12" fill="#3a8ae8"/><rect x="68" y="46" width="12" height="12" fill="#a05ae0"/><rect x="54" y="54" width="12" height="20" fill="#2ad0c8"/><circle cx="100" cy="18" r="9" fill="#ff9a2a"/><circle cx="14" cy="72" r="4" fill="#f37ab8"/><circle cx="24" cy="76" r="4" fill="#ff9a2a"/><circle cx="104" cy="74" r="4" fill="#a05ae0"/></svg>`,
texte:{
einleitung:"Willkommen im bunten Haus! Hier wohnt Mira mit ihrem Hund und ihrem Papagei. Heute Abend gibt es ein großes Gartenfest, und ihr seid eingeladen. Doch die Hausfee hat überall Rätsel versteckt: im Garten, in der Küche, auf dem Dachboden, im Spielzimmer und auf der Veranda. Jede Tür hat ein Zahlenschloss. Untersucht die Gegenstände in jedem Raum. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, darf mitfeiern. Schafft ihr es, ihr Spürnasen?",
startKnopf:"Ab ins bunte Haus",
hinweisGeber:"Die Hausfee flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Hausfee kichert freundlich … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen gemalt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Lampions gehen an!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und das bunte Haus trotzdem noch ganz erkunden!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Im Garten leuchten bunte Lampions, und das Gartenfest beginnt. Alle Kinder tanzen über die Wiese. Der Hund wedelt mit dem Schwanz, und der Papagei winkt mit den Flügeln. Mira und die Hausfee danken euch. Ihr seid jetzt echte Gäste im bunten Haus!"
},
texteDu:{
einleitung:"Willkommen im bunten Haus! Hier wohnt Mira mit ihrem Hund und ihrem Papagei. Heute Abend gibt es ein großes Gartenfest, und du bist eingeladen. Doch die Hausfee hat überall Rätsel versteckt: im Garten, in der Küche, auf dem Dachboden, im Spielzimmer und auf der Veranda. Jede Tür hat ein Zahlenschloss. Untersuche die Gegenstände in jedem Raum. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, darf mitfeiern. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Hausfee kichert freundlich … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen gemalt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und das bunte Haus trotzdem noch ganz erkunden!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Im Garten leuchten bunte Lampions, und das Gartenfest beginnt. Alle Kinder tanzen über die Wiese. Der Hund wedelt mit dem Schwanz, und der Papagei winkt mit den Flügeln. Mira und die Hausfee danken dir. Du bist jetzt ein echter Gast im bunten Haus!"
},
einfach:{
name:"Das bunte Haus",
symbolNamen:["Blume","Herz","Socke","Ballon","Sonne"],
texte:{
einleitung:"Ihr seid im bunten Haus. Hier wohnt Mira mit ihrem Hund und ihrem Papagei. Heute gibt es ein Fest. Ihr seht fünf Orte: den Garten, die Küche, den Dach-Boden, das Spiel-Zimmer und die Veranda. Die Haus-Fee hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende feiert ihr mit. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Im Garten leuchten Lampions. Alle Kinder tanzen. Der Hund und der Papagei winken euch zu!"
},
texteDu:{
einleitung:"Du bist im bunten Haus. Hier wohnt Mira mit ihrem Hund und ihrem Papagei. Heute gibt es ein Fest. Du siehst fünf Orte: den Garten, die Küche, den Dach-Boden, das Spiel-Zimmer und die Veranda. Die Haus-Fee hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende feierst du mit. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Im Garten leuchten Lampions. Alle Kinder tanzen. Der Hund und der Papagei winken dir zu!"
},
raeume:[
{titel:"Der Garten",intro:"Die Sonne scheint. Überall blühen Blumen. Hinten ist ein Tor mit Regen-Bogen. Findet die Zahlen!",introDu:"Die Sonne scheint. Überall blühen Blumen. Hinten ist ein Tor mit Regen-Bogen. Finde die Zahlen!",
objekte:[{name:"Vogel-Haus",fund:"Im Haus liegt:"},{name:"Wäsche-Leine",fund:"An der Leine hängt:"},{name:"Garten-Schaukel",fund:"An der Schaukel klebt:"},{name:"Garten-Zwerge",fund:"Bei den Zwergen liegt:"},{name:"Blumen-Beet",fund:"Im Beet liegt:"}],
infoObjekte:[{name:"Garten-Tafel",fund:"An der Tafel klebt:"},{name:"Gieß-Kanne",fund:"An der Kanne klebt:"},{name:"Schub-Karre",fund:"In der Karre liegt:"}]},
{titel:"Die Küche",intro:"Es riecht nach Pfann-Kuchen. Töpfe stehen herum. Die Tür zur Vorrats-Kammer ist zu.",
objekte:[{name:"Küchen-Uhr",fund:"An der Uhr klebt:"},{name:"Geschirr-Regal",fund:"Im Regal liegt:"},{name:"Pfann-Kuchen-Herd",fund:"Am Herd klebt:"},{name:"Mehl-Sack",fund:"Am Sack klebt:"},{name:"Teig-Tisch",fund:"Auf dem Tisch liegt:"}],
infoObjekte:[{name:"Rezept-Tafel",fund:"An der Tafel klebt:"},{name:"Eier-Korb",fund:"Im Korb liegt:"},{name:"Topf-Turm",fund:"Im Topf liegt:"}]},
{titel:"Der Dach-Boden",intro:"Unter dem Dach stehen Kisten und Truhen. Eine kleine Spinne lacht. Die Luke mit der Leiter ist zu.",
objekte:[{name:"Schatz-Karte",fund:"An der Karte klebt:"},{name:"Spinnen-Netz",fund:"Im Netz hängt:"},{name:"Geld-Truhe",fund:"In der Truhe liegt:"},{name:"Muschel-Kiste",fund:"In der Kiste liegt:"},{name:"Koffer mit Kleidern",fund:"Im Koffer liegt:"}],
infoObjekte:[{name:"Ordnungs-Tafel",fund:"An der Tafel klebt:"},{name:"Kisten-Stapel",fund:"An den Kisten klebt:"},{name:"Welt-Kugel",fund:"An der Kugel klebt:"}]},
{titel:"Das Spiel-Zimmer",intro:"Hier gibt es viele Spiele. In der Zirkus-Ecke hängt ein roter Vorhang. Findet die Zahlen!",introDu:"Hier gibt es viele Spiele. In der Zirkus-Ecke hängt ein roter Vorhang. Finde die Zahlen!",
objekte:[{name:"Bilder-Wand",fund:"An der Wand klebt:"},{name:"Bücher-Regal",fund:"Im Regal liegt:"},{name:"Trampolin",fund:"Auf dem Trampolin liegt:"},{name:"Zauber-Hut",fund:"Im Hut liegt:"},{name:"Spiel-Eisenbahn",fund:"In der Bahn liegt:"}],
infoObjekte:[{name:"Zirkus-Plakat",fund:"Am Plakat klebt:"},{name:"Ball-Korb",fund:"Im Korb liegt:"},{name:"Klötze-Turm",fund:"Am Turm klebt:"}]},
{titel:"Die Veranda",intro:"Die Sonne geht unter. Unten im Garten ist bald das Fest. Öffnet die Glas-Tür!",introDu:"Die Sonne geht unter. Unten im Garten ist bald das Fest. Öffne die Glas-Tür!",
objekte:[{name:"Wind-Spiel",fund:"Am Wind-Spiel hängt:"},{name:"Blumen-Ampel",fund:"In den Blumen liegt:"},{name:"Schaukel-Stuhl",fund:"Auf dem Stuhl liegt:"},{name:"Garten-Laterne",fund:"An der Laterne klebt:"},{name:"Fern-Glas",fund:"Am Fern-Glas klebt:"}],
infoObjekte:[{name:"Abend-Tafel",fund:"An der Tafel klebt:"},{name:"Kissen-Stapel",fund:"Unter dem Kissen liegt:"},{name:"Hunde-Korb",fund:"Im Korb liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Im Garten des bunten Hauses",
intro:"Die Sonne scheint auf einen fröhlichen Garten. Bunte Blumen blühen, an der Wäscheleine flattern Socken in allen Farben, und im großen Baum hängt ein Baumhaus. Mira hat das Gartentor unter dem Regenbogen mit einem Zahlenschloss verschlossen. Findet die Ziffern, damit ihr ins Haus kommt!",
introDu:"Die Sonne scheint auf einen fröhlichen Garten. Bunte Blumen blühen, an der Wäscheleine flattern Socken in allen Farben, und im großen Baum hängt ein Baumhaus. Mira hat das Gartentor unter dem Regenbogen mit einem Zahlenschloss verschlossen. Finde die Ziffern, damit du ins Haus kommst!",
tuerX:1300,tuerArt:"gartentor",
hintergrund:()=>`${defs('#7ad05a','#3a8a2a','#fff6b0')}${hg('btH','#5ab8f8','#a8dcff','#e0f6ff')}${R(0,0,1600,470,'url(#btH)')}${C(1480,80,44,'#fff3a0')}${C(1480,80,190,'url(#licht)')}${[[200,70],[820,110],[1180,60]].map(([x,y])=>E(x,y,70,20,'#fff')+E(x-30,y-12,34,18,'#fff')+E(x+24,y-14,36,22,'#fff')).join('')}${P('M0 380Q300 300 600 360T1200 340T1600 360V470H0Z','#8ad870')}${R(1500,200,100,180,'#ffd23a',dk,3)}${P('M1480 200L1560 140L1620 200Z',rot)}${R(1520,250,30,30,blau,'#fff',3)}${[...Array(32)].map((_,k)=>P(`M${k*50+6} 470V400l19 -20l19 20V470Z`,bunt[k%6],'#fff',2)).join('')}${L('M0 420H1600','#fff',6)}${R(430,90,60,380,'#8a5a30',dk,4)}${L('M440 200Q380 160 330 170M480 180Q560 140 620 160',dk,16)}${C(460,90,150,'#3a9a3a')}${C(360,130,90,'#4ab04a')}${C(560,120,100,'#2a8a3a')}${P('M400 140H540V200H400Z','#f37ab8',dk,3)}${P('M390 140L470 90L550 140Z',lila,dk,3)}${R(450,160,30,40,'#fff6c0')}${L('M380 200V470M410 200V470',holz,6)}${[230,270,310,350,390,430].map(y=>L(`M380 ${y}H410`,holz,5)).join('')}${[[300,90,rot],[620,60,gelb],[520,40,orange]].map(([x,y,c])=>C(x,y,10,c)).join('')}${boden(0)}`,
objekte:[
{name:"Vogelhäuschen",x:230,y:230,wand:true,by:-80,zeichne:vogelhaus,fund:"Im Vogelhäuschen liegt:"},
{name:"Wäscheleine mit Socken",x:760,y:210,wand:true,by:-60,zeichne:waescheleine,fund:"An der Wäscheleine hängt:"},
{name:"Gartenschaukel",x:150,boden:700,fuss:4,by:-245,zeichne:schaukel,fund:"An der Gartenschaukel klebt:"},
{name:"Gartenzwerg-Familie",x:500,boden:650,fuss:4,by:-135,zeichne:zwerge,fund:"Bei der Gartenzwerg-Familie liegt:"},
{name:"Blumenbeet",x:850,boden:720,fuss:4,by:-105,zeichne:blumenbeet,fund:"Im Blumenbeet liegt:"}
],
infoObjekte:[{name:"Gartentafel",x:1030,y:240,wand:true,by:-82,zeichne:gartentafel,fund:"An der Gartentafel klebt:"},{name:"Gießkanne",x:1060,boden:590,fuss:4,by:-120,zeichne:giesskanne,fund:"An der Gießkanne klebt:"},{name:"Schubkarre",x:1480,boden:740,fuss:4,by:-100,zeichne:schubkarre,fund:"In der Schubkarre liegt:"}]},
{titel:"Die Pfannkuchen-Küche",
intro:"In der bunten Küche duftet es nach Pfannkuchen. Töpfe in allen Farben stehen herum, Mehl stäubt durch die Luft, und die Küchenuhr tickt fröhlich. Die Tür zur Speisekammer hat ein Zahlenschloss. Dahinter beginnt eine schmale Treppe nach oben. Findet die Ziffern, um sie zu öffnen!",
introDu:"In der bunten Küche duftet es nach Pfannkuchen. Töpfe in allen Farben stehen herum, Mehl stäubt durch die Luft, und die Küchenuhr tickt fröhlich. Die Tür zur Speisekammer hat ein Zahlenschloss. Dahinter beginnt eine schmale Treppe nach oben. Finde die Ziffern, um sie zu öffnen!",
tuerX:400,tuerArt:"speisekammer",
hintergrund:()=>`${defs('#f8c8e0','#d878a8','#fff0b0')}${R(0,0,1600,470,'#ffe07a')}<g opacity=".35">${[...Array(40)].map((_,k)=>C((k*173+40)%1600,30+(k*61)%240,10,bunt[k%6])).join('')}</g>${[...Array(32)].map((_,k)=>R(k*50,330,50,40,k%2?'#7ad0e8':'#fff','#4aa0b8',1)+R(k*50,370,50,40,k%2?'#fff':'#7ad0e8','#4aa0b8',1)).join('')}${R(0,410,1600,60,'#f37ab8','#a03a7a',3)}${R(0,400,1600,14,'#fff')}${R(900,60,140,110,'#bfe8ff','#fff',8)}${L('M970 60V170M900 115H1040','#fff',5)}${P('M890 54Q930 120 900 180H880V54Z',rot)}${P('M1050 54Q1010 120 1040 180H1060V54Z',rot)}${L('M1300 0V60','#5a5a60',3)}${P('M1260 90Q1300 40 1340 90Z',orange)}${C(1300,96,10,'#fff6c0')}${C(1300,120,160,'url(#licht)')}${[...Array(6)].map((_,k)=>C(600+k*40,40+(k%2)*20,4,'rgba(255,255,255,.9)')).join('')}${boden(1)}`,
objekte:[
{name:"Küchenuhr",x:780,y:200,wand:true,by:-80,zeichne:kuechenuhr,fund:"An der Küchenuhr klebt:"},
{name:"Geschirrregal",x:1160,y:230,wand:true,by:-90,zeichne:geschirrregal,fund:"Im Geschirrregal liegt:"},
{name:"Pfannkuchen-Herd",x:700,boden:640,fuss:4,by:-185,zeichne:herd,fund:"Am Pfannkuchen-Herd klebt:"},
{name:"Mehlsack",x:1000,boden:720,fuss:4,by:-150,zeichne:mehlsack,fund:"Am Mehlsack klebt:"},
{name:"Teigschüssel-Tisch",x:1300,boden:590,fuss:4,by:-210,zeichne:teigtisch,fund:"Auf dem Teigschüssel-Tisch liegt:"}
],
infoObjekte:[{name:"Rezepttafel",x:1460,y:240,wand:true,by:-82,zeichne:rezepttafel,fund:"An der Rezepttafel klebt:"},{name:"Eierkorb",x:150,boden:700,fuss:4,by:-120,zeichne:eierkorb,fund:"Im Eierkorb liegt:"},{name:"Topfturm",x:1500,boden:730,fuss:4,by:-130,zeichne:toepfe,fund:"Im obersten Topf liegt:"}]},
{titel:"Die Schatzkammer unterm Dach",
intro:"Unter dem Dach ist es gemütlich und ein bisschen staubig. Durch das runde Dachfenster fällt ein Sonnenstrahl. Überall stehen Truhen und Kisten voller Schätze. Eine kleine Spinne hat ein glitzerndes Netz gewebt und schaut euch freundlich zu. Die Luke zur Leiter hat ein Zahlenschloss. Sie führt hinunter ins Spielzimmer. Findet die Ziffern!",
introDu:"Unter dem Dach ist es gemütlich und ein bisschen staubig. Durch das runde Dachfenster fällt ein Sonnenstrahl. Überall stehen Truhen und Kisten voller Schätze. Eine kleine Spinne hat ein glitzerndes Netz gewebt und schaut dir freundlich zu. Die Luke zur Leiter hat ein Zahlenschloss. Sie führt hinunter ins Spielzimmer. Finde die Ziffern!",
tuerX:850,tuerArt:"dachluke",
hintergrund:()=>`${defs('#a87a50','#5a3a22','#fff0b0')}${hg('btD','#3a2440','#6a4a3a','#7a5a40')}${R(0,0,1600,470,'url(#btD)')}${[...Array(16)].map((_,k)=>L(`M${k*100+50} 120V470`,'rgba(30,15,10,.35)',4)).join('')}${P('M0 0H1600V40L800 0L0 160Z','#3a2010')}${L('M0 160L800 0L1600 160','#8a5a30',30)}${L('M200 120V470M1400 120V470',holz,24)}${C(1060,110,62,'#bfe8ff','#8a5a30',12)}${L('M1060 48V172M998 110H1122','#8a5a30',6)}${P('M1020 150L1110 150L1420 470L880 470Z','rgba(255,240,180,.16)')}${[...Array(14)].map((_,k)=>`<g class="btsb" style="animation-delay:${(k%5)*.4}s">${C(980+(k*53)%300,200+(k*71)%260,3,'#fff6c0')}</g>`).join('')}${L('M640 0V60M1300 0V70','#2a1a10',2)}${C(640,70,12,'#fff6c0')}${C(640,70,120,'url(#licht)')}${C(1300,80,12,'#fff6c0')}${C(1300,80,120,'url(#licht)')}${[...Array(9)].map((_,k)=>P(`M${300+k*40} ${30+k*4}l12 0l-6 16Z`,bunt[k%6])).join('')}${boden(2)}`,
objekte:[
{name:"Schatzkarte",x:300,y:230,wand:true,by:-80,zeichne:schatzkarte,fund:"An der Schatzkarte klebt:"},
{name:"Glitzer-Spinnennetz",x:580,y:200,wand:true,by:-90,zeichne:spinnennetz,fund:"Im Glitzer-Spinnennetz hängt:"},
{name:"Spielgeld-Truhe",x:150,boden:700,fuss:4,by:-160,zeichne:geldtruhe,fund:"In der Spielgeld-Truhe liegt:"},
{name:"Muschelkiste",x:450,boden:640,fuss:4,by:-100,zeichne:muschelkiste,fund:"In der Muschelkiste liegt:"},
{name:"Verkleidungskoffer",x:1150,boden:720,fuss:4,by:-165,zeichne:koffer,fund:"Im Verkleidungskoffer liegt:"}
],
infoObjekte:[{name:"Ordnungstafel",x:1300,y:250,wand:true,by:-82,zeichne:ordnungstafel,fund:"An der Ordnungstafel klebt:"},{name:"Kistenstapel",x:1450,boden:590,fuss:4,by:-135,zeichne:kistenstapel,fund:"Am Kistenstapel klebt:"},{name:"Alter Globus",x:760,boden:740,fuss:4,by:-180,zeichne:globus,fund:"Am alten Globus klebt:"}]},
{titel:"Das Spielzimmer mit Zirkus-Ecke",
intro:"Im Spielzimmer ist alles bunt: Bücher, Bälle, eine Eisenbahn und ein großes Trampolin. In der Zirkus-Ecke hängt ein roter Vorhang mit Lichtern. Dahinter liegt die Tür zur Veranda. Findet die Ziffern, damit sich der Vorhang hebt!",
introDu:"Im Spielzimmer ist alles bunt: Bücher, Bälle, eine Eisenbahn und ein großes Trampolin. In der Zirkus-Ecke hängt ein roter Vorhang mit Lichtern. Dahinter liegt die Tür zur Veranda. Finde die Ziffern, damit sich der Vorhang hebt!",
tuerX:1200,tuerArt:"vorhang",
hintergrund:()=>`${defs('#8ad0f0','#3a8ab8','#ffe8f8')}${R(0,0,1600,470,'#f8d8f0')}${[...Array(20)].map((_,k)=>R(k*80,0,40,470,'#f0c0e8')).join('')}${P('M960 0H1440L1600 470H800Z','#fff')}${[...Array(10)].map((_,k)=>P(`M${960+k*48} 0H${984+k*48}L${840+k*80} 470H${800+k*80}Z`,rot)).join('')}${L('M0 60Q200 110 400 60T800 60',dk,2)}${[...Array(16)].map((_,k)=>P(`M${k*50+10} ${64+Math.sin(k*.8)*10}l30 0l-15 30Z`,bunt[k%6])).join('')}${R(40,140,120,100,'#bfe8ff','#fff',8)}${L('M100 140V240','#fff',4)}${[[600,60],[700,140],[200,330],[880,40]].map(([x,y],k)=>U('btballon',x-24,y-24,48,bunt[k+1])).join('')}${R(0,440,1600,30,'#fff')}${C(1200,250,260,'url(#licht)')}${boden(3)}`,
objekte:[
{name:"Wand mit Sammelbildern",x:300,y:240,wand:true,by:-82,zeichne:sammelbilder,fund:"An der Wand mit Sammelbildern klebt:"},
{name:"Bücherregal",x:700,y:250,wand:true,by:-94,zeichne:buecherregal,fund:"Im Bücherregal liegt:"},
{name:"Trampolin",x:200,boden:700,fuss:4,by:-95,zeichne:trampolin,fund:"Auf dem Trampolin liegt:"},
{name:"Zauberhut-Tisch",x:560,boden:640,fuss:4,by:-230,zeichne:zauberhut,fund:"Im Zauberhut liegt:"},
{name:"Spielzeug-Eisenbahn",x:880,boden:720,fuss:4,by:-125,zeichne:eisenbahn,fund:"Im Wagen der Spielzeug-Eisenbahn liegt:"}
],
infoObjekte:[{name:"Zirkusplakat",x:1490,y:240,wand:true,by:-82,zeichne:zirkusplakat,fund:"Am Zirkusplakat klebt:"},{name:"Korb mit Jonglierbällen",x:1460,boden:610,fuss:4,by:-125,zeichne:ballkorb,fund:"Im Korb mit Jonglierbällen liegt:"},{name:"Bauklötze-Turm",x:1060,boden:740,fuss:4,by:-200,zeichne:kloetze,fund:"Am Bauklötze-Turm klebt:"}]},
{titel:"Die Veranda mit Aussicht",
intro:"Auf der Veranda ist es warm und still. Die Sonne geht langsam hinter dem Garten unter, und der Himmel leuchtet rosa und orange. Unten im Garten wird schon das Fest vorbereitet. Die Glastür zur Gartentreppe hat das letzte Zahlenschloss. Findet die Ziffern, damit das Fest beginnen kann!",
introDu:"Auf der Veranda ist es warm und still. Die Sonne geht langsam hinter dem Garten unter, und der Himmel leuchtet rosa und orange. Unten im Garten wird schon das Fest vorbereitet. Die Glastür zur Gartentreppe hat das letzte Zahlenschloss. Finde die Ziffern, damit das Fest beginnen kann!",
tuerX:650,tuerArt:"verandatuer",
hintergrund:()=>`${defs('#c88a5a','#7a4a2a','#ffd890')}${hg('btV','#5a4a9a','#f08aa0','#ffc870')}<radialGradient id="btS"><stop offset="0" stop-color="#fff6c0" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/></radialGradient>${R(0,0,1600,470,'url(#btV)')}${C(1150,330,70,'#ffd060')}${C(1150,330,260,'url(#licht)')}${P('M0 470V330Q200 290 400 320T800 310T1200 330T1600 300V470Z','#3a6a4a')}${[[150,320],[420,300],[1000,300],[1400,290]].map(([x,y])=>R(x-6,y-10,12,60,'#3a2a1a')+C(x,y-30,40,'#2a5a3a')).join('')}${[[200,60],[500,40],[1350,80]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${R(0,0,1600,40,holz,dk,3)}${[...Array(32)].map((_,k)=>C(k*50+25,40,22,bunt[k%6])).join('')}${[100,1000,1500].map(x=>R(x-14,40,28,430,'#f4e8d8','#8a6a4a',3)).join('')}${L('M0 380H1600M0 450H1600','#f4e8d8',10)}${[...Array(40)].map((_,k)=>L(`M${k*40+20} 380V450`,'#f4e8d8',6)).join('')}${L('M120 90Q600 160 980 90',dk,2)}${[...Array(8)].map((_,k)=>lampion(180+k*110,110+Math.sin(k*.9)*12,bunt[k%6])).join('')}${boden(4)}`,
objekte:[
{name:"Windspiel",x:250,y:210,wand:true,by:-100,zeichne:windspiel,fund:"Am Windspiel hängt:"},
{name:"Blumenampel",x:1000,y:230,wand:true,by:-110,zeichne:blumenampel,fund:"In der Blumenampel liegt:"},
{name:"Schaukelstuhl",x:150,boden:700,fuss:4,by:-185,zeichne:schaukelstuhl,fund:"Auf dem Schaukelstuhl liegt:"},
{name:"Verandalaterne",x:400,boden:630,fuss:4,by:-225,zeichne:laterne,fund:"An der Verandalaterne klebt:"},
{name:"Fernglas auf Stativ",x:950,boden:720,fuss:4,by:-150,zeichne:fernglas,fund:"Am Fernglas klebt:"}
],
infoObjekte:[{name:"Abendtafel",x:1350,y:240,wand:true,by:-82,zeichne:abendtafel,fund:"An der Abendtafel klebt:"},{name:"Kissenstapel",x:1200,boden:600,fuss:4,by:-115,zeichne:kissen,fund:"Unter dem Kissenstapel liegt:"},{name:"Hundekorb",x:1480,boden:740,fuss:4,by:-105,zeichne:hundekorb,fund:"Im Hundekorb liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs>${hg('btE','#2a2a6a','#c86a9a','#ffb870')}<radialGradient id="btS"><stop offset="0" stop-color="#fff6c0" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes btw{50%{transform:rotate(-30deg)}}@keyframes bth{50%{transform:translateY(-14px)}}.btwk{animation:btw .8s ease-in-out infinite}.btkt{animation:bth .7s ease-in-out infinite}</style>
   <rect width="1000" height="600" fill="url(#btE)"/>${[[60,40],[200,90],[420,30],[620,70],[900,50]].map(([x,y])=>C(x,y,2.5,'#fff6c8')).join('')}${C(820,90,24,'#fff6c0')}${C(830,82,20,'#3a2a6a')}
   ${R(560,210,300,190,'#ffd23a',dk,4)}${P('M540 210L710 110L880 210Z',rot,dk,4)}${[[590,250,blau],[700,250,lila],[790,250,tk]].map(([x,y,c])=>R(x,y,50,50,'#fff6c0',c,6)).join('')}${R(690,320,50,80,tk,dk,3)}
   ${R(0,400,1000,200,'#3a8a3a')}${P('M0 420Q500 380 1000 420V400H0Z','#4aa04a')}
   ${L('M0 150Q250 230 500 160T1000 150',dk,2)}${[...Array(9)].map((_,k)=>lampion(60+k*110,180+Math.sin(k*1.1)*16,bunt[k%6])).join('')}
   ${kind(250,470,rot,'#f6d2b0','#3a2a1a',0)}${kind(350,480,blau,'#8a5a3a','#1a1a1a',1)}${kind(450,470,gelb,'#c88a5a','#e8c060',2)}${kind(550,485,gruen,'#f0c090','#6a3a1a',3)}${kind(650,475,lila,'#6a4028','#1a1a1a',4)}
   ${hund(120,520)}${papagei(860,440,rot,blau)}${L('M820 470H900',holz,6)}
   ${U('btballon',150,240,40,rosa)}${U('btballon',780,300,40,gelb)}${U('btherz',470,280,30,'#fff6c0')}`
};
})();