document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-bxberg\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M-19 16L-6 -6L-1 1L7 -15L19 16ZM7 -9L3 -1L6 -3L9 0L11 -3Z\"/></symbol>\n<symbol id=\"sym-bxblume\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><ellipse cx=\"0\" cy=\"-10\" rx=\"4.5\" ry=\"9\"/><ellipse cx=\"0\" cy=\"-10\" rx=\"4.5\" ry=\"9\" transform=\"rotate(60)\"/><ellipse cx=\"0\" cy=\"-10\" rx=\"4.5\" ry=\"9\" transform=\"rotate(120)\"/><ellipse cx=\"0\" cy=\"-10\" rx=\"4.5\" ry=\"9\" transform=\"rotate(180)\"/><ellipse cx=\"0\" cy=\"-10\" rx=\"4.5\" ry=\"9\" transform=\"rotate(240)\"/><ellipse cx=\"0\" cy=\"-10\" rx=\"4.5\" ry=\"9\" transform=\"rotate(300)\"/></g><circle r=\"5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"/></symbol>\n<symbol id=\"sym-bxsonne\" viewBox=\"-20 -20 40 40\"><circle r=\"8\" fill=\"currentColor\"/><path d=\"M0 -18V-12M0 12V18M-18 0H-12M12 0H18M-13 -13L-9 -9M9 9L13 13M-13 13L-9 9M9 -9L13 -13\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-bxschnee\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -18V18M-15.6 -9L15.6 9M-15.6 9L15.6 -9M-5 -15L0 -10L5 -15M-5 15L0 10L5 15M-15 -4L-9 -5L-11 -11M15 4L9 5L11 11M-15 4L-9 5L-11 11M15 -4L9 -5L11 -11\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></symbol>\n<symbol id=\"sym-bxfahne\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><rect x=\"-14\" y=\"-18\" width=\"4\" height=\"36\"/><path d=\"M-10 -17H16L9 -8L16 1H-10Z\"/></g></symbol>\n</defs>\n</svg>");
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
const holz='#8a5a30',dk='#3a2410',gold='#f2c14e',fels='#8a8680',fd='#3a3632',eis='#c8ecfa',ed='#4a8ab8';
const berg=(x,y,w,yb,f,sn)=>{const h=yb-y;return P(`M${x-w/2} ${yb}L${x} ${y}L${x+w/2} ${yb}Z`,f)+(sn?P(`M${x-w*.13} ${y+h*.26}L${x} ${y}L${x+w*.13} ${y+h*.26}L${x+w*.05} ${y+h*.2}L${x} ${y+h*.28}L${x-w*.05} ${y+h*.2}Z`,sn):'');};
const wolke=(x,y,s,f)=>E(x,y,60*s,18*s,f)+E(x-26*s,y-10*s,26*s,16*s,f)+E(x+18*s,y-14*s,30*s,20*s,f);
const tanne=(x,y,h,f)=>R(x-4,y-h*.2,8,h*.2,'#5a3a1c')+P(`M${x-h*.28} ${y-h*.18}L${x} ${y-h}L${x+h*.28} ${y-h*.18}Z`,f);
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="bxH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa8e8"/><stop offset="1" stop-color="#e4f4fc"/></linearGradient>
</defs>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<70;k++){const x=(k*137+20)%1600,y=490+(k*53)%280;d+=`M${x} ${y}l-5 -12M${x} ${y}l2 -14M${x} ${y}l7 -10`;}let f='';for(let k=0;k<36;k++)f+=C((k*211+60)%1600,500+(k*79)%260,4+k%3,['#fff','#f6d84a','#e85a8a','#9a7ae8'][k%4]);return g+L(d,'#3a8a2a',3)+f;}
if(m==1){for(const y of[490,515,545,580,625,680,745])d+=`M0 ${y}H1600`;for(let k=0;k<7;k++){const y=[470,490,515,545,580,625,680,745][k];for(let x=(k%2)*90;x<1600;x+=180+k*20)d+=`M${x} ${y}V${[490,515,545,580,625,680,745,780][k]}`;}return g+L(d,'rgba(40,20,5,.4)',3);}
if(m==2){for(let k=0;k<14;k++){const x=(k*233+80)%1600,y=500+(k*41)%250;d+=`M${x} ${y}l40 10l30 -8l50 14`;}let f='';for(let k=0;k<10;k++)f+=E((k*317+150)%1600,520+(k*67)%230,60,6,'rgba(255,255,255,.6)');return g+L(d,'#5a9ac8',3)+f;}
if(m==3){for(let k=0;k<60;k++)d+=E((k*149+30)%1600,490+(k*47)%285,8+k%5*4,4+k%3*2,['#9a948a','#7a746a','#b0a898'][k%3]);return g+d;}
for(let k=0;k<22;k++)d+=E((k*181+50)%1600,500+(k*59)%270,50+k%4*20,8,'rgba(255,255,255,.75)');for(let k=0;k<6;k++)d+=P(`M${(k*277+120)%1600} ${560+(k*71)%180}l20 -24l26 6l14 18Z`,'#7a746a','#4a4640',2);return g+d;}
const fahrplan=()=>`${R(-80,-56,160,112,'#2e5a8a','#1a3050',4)}${R(-80,-56,160,24,gold,'#1a3050',4)}${L('M-56 -44H56','#1a3050',4)}${[-12,8,28,44].map(y=>L(`M-62 ${y}H-24M-4 ${y}H62`,'#fff',4)).join('')}`;
const suhr=()=>`${L('M0 -76V-48','#4a4a52',6)}${R(-30,-80,60,8,'#4a4a52')}${C(0,0,48,'#fff','#2a2a30',7)}${[...Array(12)].map((_,k)=>{const a=k*Math.PI/6,s=Math.sin(a),c=Math.cos(a);return L(`M${s*35} ${c*35}L${s*41} ${c*41}`,'#2a2a30',3);}).join('')}${L('M0 0V-30M0 0L22 8','#2a2a30',5)}${C(0,0,4,'#c0303a')}`;
const automat=()=>`${sch(46)}${R(-40,-160,80,160,'#c0303a','#5a1818',4)}${R(-28,-144,56,40,'#9ad0f0','#2a2a30',3)}${U('bxberg',-12,-140,24,'#2e5a8a')}${[0,1,2].map(k=>C(-16+k*16,-88,6,['#7ad06a','#f6d84a','#fff'][k],'#2a2a30',2)).join('')}${R(-20,-66,40,8,'#2a2a30')}${R(-14,-62,28,26,'#fff','#888',1.5)}${L('M-8 -52H8M-8 -44H4','#888',2)}`;
const rucksack=()=>`${sch(40)}${P('M-34 0V-70Q-34 -104 0 -104Q34 -104 34 -70V0Z','#e8703a','#7a3010',4)}${P('M-36 -78Q-36 -100 0 -102Q36 -100 36 -78V-58H-36Z','#c04a20','#7a3010',3)}${R(-22,-40,44,30,'#c04a20','#7a3010',3)}${L('M0 -58V-48','#f2c14e',4)}${L('M-14 -104Q0 -122 14 -104','#5a3a1c',4)}${E(-38,-60,6,26,'#5aa0d8','#2a5a8a',2)}`;
const picknick=()=>`${sch(70)}${E(0,-6,70,12,'#e8403a')}${L('M-60 -6H60M-30 -16L-36 4M0 -18V6M30 -16L36 4','#fff',4)}${P('M-38 -14L-32 -58H32L38 -14Z','#c89a50','#6a4a1c',3)}${L('M-36 -30H36M-34 -44H34','#8a6a28',2)}${L('M-26 -58Q0 -96 26 -58','#6a4a1c',5)}${C(-14,-64,9,'#e74c3c')}${E(12,-64,12,7,'#f6d84a','#a08020',1.5)}`;
const bergkarte=()=>`${L('M-50 -52V-80M50 -52V-80','#4a4a52',4)}${R(-84,-56,168,112,'#f0f4e8','#5a6a50',4)}${P('M-76 48L-40 -10L-20 14L10 -34L40 10L76 -14V48Z','#9ac090')}${P('M10 -34L2 -22L10 -26L18 -22Z','#fff')}${L('M-66 40Q-40 30 -20 14T10 -20','#c0303a',3)}${C(10,-30,5,'#c0303a')}${C(-66,40,5,'#2e5a8a')}${L('M30 34Q50 26 70 30','#5ab0e0',4)}`;
const wegweiser=()=>`${sch(26)}${R(-6,-200,12,200,'#c8c8d0','#5a5a68',2)}${[[-180,1],[-140,-1],[-100,1]].map(([y,s])=>P(`M${s>0?-6:6} ${y}H${s*70}L${s*84} ${y+14}L${s*70} ${y+28}H${s>0?-6:6}Z`,'#f6d84a','#8a6a10',3)+L(`M${s*16} ${y+10}H${s*56}M${s*16} ${y+18}H${s*44}`,'#3a3a40',3)).join('')}`;
const kuebel=()=>`${sch(60)}${R(-60,-50,120,50,'#a0703a',dk,4)}${L('M-60 -26H60','#6a4020',3)}${[[-44,-80,'#e85a8a'],[-20,-92,'#f6d84a'],[4,-84,'#fff'],[26,-96,'#9a7ae8'],[46,-78,'#e85a8a']].map(([x,y,c])=>L(`M${x} -50V${y}`,'#3a8a2a',4)+C(x,y,9,c,'#555',1.5)+C(x,y,3,'#f2a030')).join('')}`;
const glockenbrett=()=>`${R(-90,-60,180,22,holz,dk,4)}${[-56,0,56].map((x,k)=>L(`M${x} -38V${-16+k*6}`,'#c0303a',6)+P(`M${x-20} ${30+k*6}H${x+20}Q${x+16} ${10+k*6} ${x+14} ${-6+k*6}Q${x} ${-20+k*6} ${x-14} ${-6+k*6}Q${x-16} ${10+k*6} ${x-20} ${30+k*6}Z`,gold,'#8a6a10',3)+C(x,34+k*6,5,'#6a4a20')).join('')}`;
const kaeseregal=()=>`${R(-90,-64,180,128,'#7a4a28',dk,5)}${L('M-86 0H86','#5a3418',6)}${[[-50,-24],[0,-24],[50,-24],[-26,40],[26,40]].map(([x,y])=>E(x,y,26,14,'#f2c860','#a07a20',3)+R(x-26,y-14,52,8,'#f8dc80')).join('')}${P('M60 30L82 42L60 50Z','#f8dc80','#a07a20',2)}`;
const schemel=()=>`${sch(50)}${L('M-26 0L-14 -46M26 0L14 -46M0 0V-46','#6a4020',7)}${E(0,-50,32,9,holz,dk,3)}${P('M30 0L36 -50H74L80 0Z','#b8bec8','#4a5058',3)}${E(55,-50,19,5,'#fff','#4a5058',2)}${L('M38 -40Q55 -60 72 -40','#4a5058',3)}`;
const butterfass=()=>`${sch(40)}${P('M-36 0L-28 -110H28L36 0Z','#b8803a',dk,4)}${L('M-34 -26H34M-31 -84H31','#3a3a40',5)}${E(0,-110,28,7,'#c89a50',dk,3)}${L('M0 -116V-170','#a0703e',7)}${L('M-14 -170H14','#a0703e',8)}`;
const kanne=()=>`${sch(36)}${P('M-30 0V-70L-18 -92V-108H18V-92L30 -70V0Z','#c8ced8','#4a5058',4)}${E(0,-108,20,6,'#e0e4ea','#4a5058',3)}${L('M-30 -40H30','#8a9098',4)}${L('M-12 -100Q0 -124 12 -100','#4a5058',4)}${L('M-24 -60Q-14 -50 -24 -20','rgba(255,255,255,.7)',4)}`;
const kraeuter=()=>`${R(-70,-62,140,124,'#e8d8b0','#6a4a28',5)}${C(-70,-62,6,'#5a3418')}${[[-36,-20,'#6ab04a','#fff'],[0,-24,'#4a9a3a','#9a7ae8'],[36,-20,'#6ab04a','#f6d84a'],[-18,30,'#4a9a3a','#e85a8a'],[22,30,'#6ab04a','#fff']].map(([x,y,g,b])=>L(`M${x} ${y+22}V${y-14}M${x} ${y}l-10 -8M${x} ${y+8}l10 -8`,g,3)+C(x,y-16,6,b,'#555',1)).join('')}`;
const ofen=()=>`${sch(70)}${R(-66,-150,132,150,'#4a8a6a','#1a3a2a',4)}${L('M-66 -100H66M-66 -50H66M-22 -150V0M22 -150V0','#2a5a40',3)}${R(-74,-162,148,14,'#7a4a28',dk,3)}${R(-24,-60,48,40,'#2a1a10',dk,3)}${E(0,-34,16,10,'#ff9a30')}${E(0,-32,8,6,'#ffe070')}${C(0,-40,60,'url(#licht)')}`;
const heu=()=>`${sch(84)}${P('M-84 0Q-80 -70 -10 -84Q70 -80 84 0Z','#e8c860','#a08020',3)}${L('M-60 -20l14 -20M-30 -50l16 -16M10 -60l10 -18M44 -30l14 -18','#c8a040',3)}${E(14,-80,26,16,'#f4f0e8','#6a6058',3)}${C(40,-92,10,'#f4f0e8','#6a6058',3)}${L('M36 -100l-4 -10M44 -100l4 -10','#8a7a60',3)}${C(44,-92,2,'#222')}${L('M-4 -66V-52M24 -66V-52','#6a6058',4)}`;
const zapfen=()=>`${P('M-90 -40Q0 -64 90 -40V-20H-90Z','#f4fcff',ed,3)}${[-74,-48,-22,4,30,56,80].map((x,k)=>P(`M${x-10} -22L${x} ${20+(k%3)*18}L${x+10} -22Z`,eis,ed,2)).join('')}${L('M-70 -36H-30M10 -38H50','#fff',3)}`;
const kristall=()=>`${P('M0 -70L60 -36V36L0 70L-60 36V-36Z','rgba(200,236,250,.85)',ed,4)}${P('M0 -70L60 -36L0 0L-60 -36Z','rgba(255,255,255,.4)')}${U('bxschnee',-36,-36,72,'#fff')}`;
const schlitten=()=>`${sch(70)}${L('M-70 -4H60Q80 -4 76 -22','#c0303a',6)}${L('M-50 -4V-30M40 -4V-30','#c0303a',5)}${R(-64,-46,124,16,holz,dk,3)}${L('M-64 -38H60','#6a4020',2)}${R(-40,-76,60,30,'#e8703a','#7a3010',3)}${L('M-40 -64H20','#f6d84a',3)}`;
const eisen=()=>`${sch(50)}${P('M-40 -20V-80H-6V-46L40 -36Q50 -32 48 -20Z','#4a6ab0','#1a2a5a',4)}${R(-42,-22,92,10,'#2a2a30')}${L('M-40 -80H-6','#e8703a',6)}${L('M-36 -12l-4 12M-16 -12l-4 12M4 -12l-4 12M24 -12l-4 12M44 -12l-4 12','#a8b0bc',4)}${L('M-36 -12H44','#a8b0bc',3)}`;
const messstab=()=>`${sch(30)}${E(0,0,40,10,'#fff')}${R(-6,-220,12,222,'#fff','#4a4a52',2)}${[0,1,2,3,4,5].map(k=>R(-6,-210+k*36,12,18,'#c0303a')).join('')}${L('M6 -210H50L40 -196L50 -182H6','#2e6ac8',3)}${P('M6 -210H50L40 -196L50 -182H6Z','#2e6ac8')}`;
const gtafel=()=>`${R(-80,-58,160,116,'#2a5a8a','#14304a',5)}${P('M-66 40L-40 -6L-14 18L14 -34L40 4L66 -20V40Z','#c8ecfa')}${L('M-60 30Q-20 20 10 26T60 20','#5aa0d8',4)}${R(-66,-46,60,10,'#fff')}${R(-66,-30,40,6,'rgba(255,255,255,.6)')}${U('bxschnee',38,-48,26,'#fff')}`;
const eisblock=()=>`${sch(60)}${P('M-56 0V-80L-30 -100H50V-20L24 0Z','rgba(200,236,250,.9)',ed,4)}${P('M-56 -80L-30 -100H50L24 -80Z','#f4fcff',ed,3)}${L('M24 -80V0M24 -80L50 -100','#8ac8e8',3)}${[[-30,-50,5],[-10,-30,3],[0,-60,4],[-36,-22,3]].map(([x,y,r])=>C(x,y,r,'#fff')).join('')}`;
const schneehaufen=()=>`${sch(70)}${P('M-72 0Q-70 -44 -30 -52Q0 -76 34 -54Q70 -44 72 0Z','#fafcff','#a8c0d8',3)}${E(-20,-36,20,8,'#e4eef8')}${L('M30 -56V-118','#5a3a1c',4)}${P('M30 -118H70L60 -106L70 -94H30Z','#e8403a','#7a1a10',2)}`;
const haken=()=>`${P('M-90 -50L-60 -64L40 -58L90 -40L84 50L-40 60L-86 40Z',fels,fd,4)}${L('M-70 -10L60 -20M-60 30L70 20','#6a6660',3)}${[-50,0,50].map((x,k)=>C(x,-24+k*10,7,'#c8ccd4','#3a3a40',3)+P(`M${x-6} ${-14+k*10}Q${x-12} ${16+k*10} ${x} ${20+k*10}Q${x+12} ${16+k*10} ${x+6} ${-14+k*10}`,'none',['#e8a030','#5aa0d8','#7ad06a'][k],4)).join('')}`;
const seilrolle=()=>`${L('M0 -70V-40','#3a3a40',6)}${C(0,-74,7,'#c8ccd4','#3a3a40',3)}${[44,34,24].map((r,k)=>E(0,4,r+10,r,'none',['#e8403a','#f2803a','#e8403a'][k],7)).join('')}${L('M-20 40Q-30 60 -10 70','#e8403a',6)}`;
const helm=()=>`${sch(60)}${P('M-60 0Q-50 -30 0 -32Q50 -30 60 0Z','#9a948a',fd,3)}${P('M-40 -30Q-40 -86 0 -86Q40 -86 40 -30Z','#f2c14e','#8a6a10',4)}${R(-44,-34,88,8,'#e8a030','#8a6a10',2)}${L('M-20 -80Q0 -90 20 -80','#fff',4)}${C(26,-52,5,'#fff')}`;
const kiste=()=>`${sch(64)}${R(-60,-70,120,70,'#4a7a5a','#1a3a2a',4)}${R(-64,-80,128,14,'#3a6a4a','#1a3a2a',3)}${L('M-40 -70V0M40 -70V0','#2a4a3a',4)}${R(-12,-60,24,14,'#c8ccd4','#3a3a40',2)}${[[-36,-92,'#e8a030'],[-12,-96,'#5aa0d8'],[14,-92,'#e8403a']].map(([x,y,c])=>E(x,y,8,12,'none',c,4)).join('')}`;
const steinbock=()=>`${sch(70)}${P('M-70 0L-60 -40H60L70 0Z',fels,fd,3)}${E(0,-80,40,20,'#a07a50','#4a3020',3)}${L('M-26 -64V-40M-10 -64V-40M14 -64V-40M30 -64V-40','#6a4a30',7)}${P('M30 -92L48 -118L62 -110L52 -88Z','#a07a50','#4a3020',3)}${L('M50 -116Q36 -150 8 -146M56 -114Q50 -148 26 -152','#6a5a48',6)}${C(54,-104,2.5,'#222')}${L('M-40 -86l-10 -6','#6a4a30',4)}`;
const gestein=()=>`${R(-82,-58,164,116,'#e8e4dc','#4a4640',4)}${[['#c89a70',-40],['#a8a49a',-14],['#d8c090',10],['#8a7a6a',34]].map(([c,y])=>P(`M-70 ${y}Q-30 ${y-8} 0 ${y}T70 ${y-6}V${y+22}Q30 ${y+16} 0 ${y+22}T-70 ${y+22}Z`,c)).join('')}${L('M-70 -46H70','#4a4640',2)}${C(40,22,6,'#f4f0e8','#6a6660',2)}`;
const kristallstein=()=>`${sch(60)}${P('M-60 0Q-62 -40 -30 -50Q0 -60 30 -48Q62 -40 60 0Z','#7a746a',fd,3)}${[[-24,-40,-1],[0,-50,0],[22,-44,1]].map(([x,y,s])=>P(`M${x-8} ${y}L${x-6+s*6} ${y-44}L${x+s*6} ${y-56}L${x+6+s*6} ${y-44}L${x+8} ${y}Z`,'rgba(230,240,255,.9)','#7a8ab8',2)).join('')}${L('M-2 -96V-60','#fff',2)}`;
const quelle=()=>`${sch(70)}${P('M-70 -40Q-64 -110 -20 -116Q20 -112 30 -60L24 -40Z',fels,fd,3)}${R(-40,-36,110,30,holz,dk,3)}${R(-36,-36,102,10,'#6ac0e8')}${L('M10 -66Q22 -56 20 -40','#9ad8f8',5)}${R(-30,-6,10,6,'#5a3418')}${R(50,-6,10,6,'#5a3418')}`;
const gbuch=()=>`${L('M0 30V110','#4a4a52',8)}${P('M-40 110L-20 92H20L40 110Z',fels,fd,2)}${R(-44,-36,88,66,'#c8ccd4','#3a3a40',4)}${P('M-48 -36L0 -60L48 -36Z','#9aa0a8','#3a3a40',3)}${R(-30,-24,60,42,'#c0303a','#5a1818',2)}${L('M0 -24V18','#5a1818',2)}${L('M-24 -12H-6M6 -12H24M-24 0H-6M6 0H24','#f6ecc8',2)}`;
const adler=()=>`${P('M0 0Q-40 -40 -90 -30Q-60 -16 -50 -4Q-30 0 -14 8Z','#6a4a30','#2a1a10',2)}${P('M0 0Q40 -40 90 -30Q60 -16 50 -4Q30 0 14 8Z','#6a4a30','#2a1a10',2)}${E(0,6,14,22,'#7a5a38','#2a1a10',2)}${C(0,-18,10,'#f4f0e8','#2a1a10',2)}${P('M0 -16L8 -12L0 -8Z',gold)}${P('M-10 26L0 40L10 26Z','#7a5a38')}`;
const fernglas=()=>`${sch(40)}${R(-6,-110,12,110,'#3a6a8a','#1a3a4a',2)}${R(-22,-8,44,10,'#3a6a8a')}${R(-40,-150,80,44,'#4a8aaa','#1a3a4a',4)}${C(-20,-128,12,'#9ad0f0','#1a3a4a',3)}${C(20,-128,12,'#9ad0f0','#1a3a4a',3)}${R(-8,-156,16,8,'#1a3a4a')}`;
const steinmann=()=>`${sch(50)}${E(0,-14,48,16,'#8a8680',fd,3)}${E(-2,-40,38,13,'#a09a90',fd,3)}${E(4,-62,30,11,'#7a766e',fd,3)}${E(0,-82,22,9,'#b0aaa0',fd,3)}${E(2,-98,14,8,'#8a8680',fd,3)}`;
const murmel=()=>`${sch(36)}${E(0,-44,26,42,'#b08a5a','#5a3a1c',3)}${E(0,-30,14,24,'#d8b888')}${C(0,-96,18,'#b08a5a','#5a3a1c',3)}${C(-7,-100,3,'#222')}${C(7,-100,3,'#222')}${E(0,-90,6,4,'#5a3a1c')}${L('M-12 -60l-10 10M12 -60l10 10','#5a3a1c',6)}${C(-14,-112,5,'#8a6a40')}${C(14,-112,5,'#8a6a40')}`;
const panorama=()=>`${L('M0 60V130','#5a3a1c',8)}${P('M-90 60H90L80 -40H-80Z','#5a3a1c',dk,4)}${P('M-80 50H80L72 -32H-72Z','#f6f0e0')}${P('M-72 30L-46 -10L-30 6L-6 -26L18 0L40 -18L72 20V50H-72Z','#8aa0c0')}${[[-46,-10],[-6,-26],[40,-18]].map(([x,y])=>L(`M${x} ${y-6}V${y-18}`,'#c0303a',2)+C(x,y-20,3,'#c0303a')).join('')}`;
const wetter=()=>`${sch(36)}${R(-4,-220,8,220,'#c8ccd4','#4a4a52',2)}${L('M-36 -210H36','#4a4a52',4)}${[-36,36].map(x=>E(x,-210,10,7,'#e8403a','#7a1a10',2)).join('')}${L('M-30 -176H30','#4a4a52',3)}${P('M30 -186L44 -176L30 -166Z','#f2c14e')}${R(-30,-110,60,46,'#fff','#4a4a52',3)}${L('M-30 -96H30M-30 -82H30','#c8ccd4',3)}${U('bxsonne',-14,-150,28,gold)}`;
const edelweiss=()=>`${sch(60)}${P('M-60 0Q-56 -36 -20 -40Q20 -46 60 0Z','#7a746a',fd,3)}${P('M-44 -26Q0 -54 44 -16','none','#4a8a3a',8)}${[[-26,-56,30],[6,-70,34],[34,-48,26]].map(([x,y,w])=>L(`M${x} ${y+16}V-30`,'#6aa05a',3)+U('bxblume',x-w/2,y-w/2,w,'#f4f6f0')+C(x,y,4,'#e8d870')).join('')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#1a2a3a" stroke="#f2c14e" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#1a2a3a" stroke="#f2c14e" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #bxa{transform:rotate(-80deg);transition-delay:.6s}.tuer.offen #bxg1{transform:scaleX(.14)}.tuer.offen #bxg2{transform:scaleX(.14)}.tuer.offen #bxh{transform:scaleX(.14)}.tuer.offen #bxe1{transform:scaleX(.12)}.tuer.offen #bxe2{transform:scaleX(.12)}.tuer.offen #bxk{transform:translateY(-200px);opacity:0}.tuer.offen #bxs{transform:translateY(90px);opacity:0}</style>`;
const aussicht=(h)=>`${R(410,190,180,280,h)}${berg(470,250,220,470,'#8aa0c0','#fff')}${berg(560,290,160,470,'#6a88b0','#fff')}`;
function tuerStation(n){
const gl=x=>R(x,190,90,280,'rgba(170,215,240,.8)','#4a5a68',4)+L(`M${x+16} 220L${x+40} 200M${x+16} 260L${x+60} 220`,'#fff',4)+R(x+(x<500?74:8),300,8,60,'#4a5a68');
return`${R(350,130,300,340,'#ece6da','#5a5048',5)}${R(336,108,328,34,'#c0303a','#5a1818',4)}${U('bxberg',484,110,30,'#fff')}${aussicht('#bfe4fa')}${L('M410 210L590 170','#3a3a40',3)}${L('M520 186V214','#3a3a40',3)}${R(500,214,40,34,'#e8403a','#5a1818',2)}${R(506,220,28,12,'#bfe4fa')}${R(410,440,180,30,'#a8a8b0','#5a5a68',2)}
   <g id="bxg1" class="tb" style="transform-origin:410px 330px">${gl(410)}</g>
   <g id="bxg2" class="tb" style="transform-origin:590px 330px">${gl(500)}</g>
   ${R(392,370,22,100,'#6a6a78','#2a2a30',3)}<g id="bxa" class="tb" style="transform-origin:403px 392px">${R(403,385,196,14,'#fff','#5a1818',2)}${[0,1,2,3].map(k=>R(423+k*44,385,22,14,'#c0303a')).join('')}</g>
   <g class="tb pl">${sPl(n,300)}</g>`;
}
function tuerHuette(n){
let b='';for(let k=1;k<6;k++)b+=`M${410+k*30} 190V470`;
return`${P('M350 180L500 96L650 180Z','#6a3a1c',dk,5)}${R(386,170,228,300,'#5a3418',dk,4)}${aussicht('#9ad8f8')}${P('M410 400Q480 380 590 396V470H410Z','#7ac05a')}${C(440,220,14,'#fff6a0')}
   <g id="bxh" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,'#a0683a',dk,4)}${L(b,'#6a4020',3)}${L('M420 236H580M420 424H580M424 424L576 236','#6a4020',12)}${P('M500 228Q488 212 478 224Q470 236 500 256Q530 236 522 224Q512 212 500 228Z',dk)}${C(570,334,9,'#3a3a40')}</g>
   <g class="tb pl">${sPl(n,350)}</g>`;
}
function tuerEis(n){
const pl=x=>R(x,190,90,280,'rgba(210,242,255,.94)',ed,4)+L(`M${x+20} 210L${x+50} 280L${x+30} 340M${x+60} 380L${x+40} 440`,'#7ab8e0',3)+L(`M${x+12} 200V250`,'#fff',5);
return`${P('M354 470V240Q354 132 500 132Q646 132 646 240V470Z',eis,ed,5)}${L('M372 240Q372 152 500 152Q628 152 628 240','#fff',5)}${R(410,190,180,280,'#14406a')}${E(500,330,80,120,'#2a6aa0')}${E(500,340,50,80,'#4a9ad0')}${E(500,350,24,40,'#9ae0ff')}${C(500,340,140,'url(#licht)')}
   <g id="bxe1" class="tb" style="transform-origin:410px 330px">${pl(410)}</g>
   <g id="bxe2" class="tb" style="transform-origin:590px 330px">${pl(500)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerKamin(n){
let s='';for(let k=0;k<7;k++)s+=`M462 ${200+k*40}H538`;
return`${P('M340 470L352 300L380 180L440 140L560 136L620 190L650 320L660 470Z','#6a6660',fd,5)}${P('M430 470V200L470 168H530L570 200V470Z','#24221e')}${E(500,180,40,14,'#ffe8a0')}${C(500,190,120,'url(#licht)')}${L('M462 180V470M538 180V470','#a0703e',6)}${L(s,'#a0703e',5)}${C(500,126,18,'#c8ccd4','#3a3a40',4)}${L('M500 126V200','#e8a030',4)}
   <g id="bxk" class="tb">${P('M408 470L400 260L430 196H570L600 262L594 470Z','#8a8680',fd,5)}${L('M420 300L480 320L520 300L586 320M416 400L470 380L540 410L590 390','#6a6660',4)}${C(500,214,10,'none','#3a3a40',5)}</g>
   <g class="tb pl">${sPl(n,340)}</g>`;
}
function tuerSchnee(n){
return`${R(410,170,180,300,'#ffc890')}${C(500,270,40,'#fff0a0')}${C(500,270,130,'url(#licht)')}${E(500,330,110,24,'#fff')}${P('M440 470Q490 400 500 330Q510 400 560 470Z','#f4f8ff')}${L('M500 330V256','#5a3a1c',4)}${P('M500 256H530L522 266L530 276H500Z','#e8403a')}${P('M340 470L360 260L410 170L430 470Z',fels,fd,4)}${P('M660 470L640 270L590 160L570 470Z',fels,fd,4)}${P('M360 262L410 170L426 230L392 222Z','#fff')}${P('M640 272L590 160L574 226L612 214Z','#fff')}
   <g id="bxs" class="tb">${P('M404 470V250Q430 200 466 226Q500 180 534 222Q570 196 596 246V470Z','#f6faff','#a8c0d8',4)}${E(450,320,28,10,'#e0ecf8')}${E(550,400,34,10,'#e0ecf8')}${E(480,440,40,10,'#e0ecf8')}</g>
   <g class="tb pl">${sPl(n,350)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'schranke';
const arten={schranke:[tuerStation,'Schranke zur Gondel mit Zahlenschloss'],huettentuer:[tuerHuette,'Hüttentür mit Zahlenschloss'],eistor:[tuerEis,'Eistor zur Eishöhle mit Zahlenschloss'],kamin:[tuerKamin,'Felsplatte vor dem Kamin mit Zahlenschloss'],schneewand:[tuerSchnee,'Schneewand vor dem Gipfelweg mit Zahlenschloss']};
const a=arten[art]||arten.schranke;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.bergexpedition={
name:"Die Bergexpedition",
symbole:["bxberg","bxblume","bxsonne","bxschnee","bxfahne"],
symbolNamen:["Berg","Edelweiß","Sonne","Schneeflocke","Fahne"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="92" cy="26" r="12" fill="#f6c84a"/><path d="M4 84L44 22L62 48L78 30L116 84Z" fill="#6a88b0" stroke="#2a3a5a" stroke-width="3"/><path d="M44 22L34 38L44 34L52 40Z" fill="#fff"/><path d="M44 22V4" stroke="#3a3a40" stroke-width="3"/><path d="M44 4H62L56 10L62 16H44Z" fill="#e8403a"/><path d="M4 84Q40 70 60 78T116 74V84Z" fill="#7ac05a"/></svg>`,
texte:{
einleitung:"Ihr startet zu einer großen Bergexpedition! Mit der Seilbahn geht es hinauf zur Alm, über den Gletscher, die Steilwand hoch und bis zum Gipfel. Die Bergführerin hat auf dem Weg Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, steht am Ende auf dem Gipfel und sieht über das Wolkenmeer. Schafft ihr es?",
startKnopf:"Losgehen",
hinweisGeber:"Die Bergführerin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Bergführerin schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Es wird Abend!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Gipfel trotzdem noch erreichen!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Gipfel erreicht. Die Bergführerin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du startest zu einer großen Bergexpedition! Mit der Seilbahn geht es hinauf zur Alm, über den Gletscher, die Steilwand hoch und bis zum Gipfel. Die Bergführerin hat auf dem Weg Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände an jedem Ort. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, steht am Ende auf dem Gipfel und sieht über das Wolkenmeer. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Bergführerin schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Gipfel trotzdem noch erreichen!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Gipfel erreicht. Die Bergführerin ist stolz auf dich!"
},
einfach:{
name:"Die Bergexpedition",
symbolNamen:["Berg","Edelweiß","Sonne","Schneeflocke","Fahne"],
texte:{
einleitung:"Ihr wandert auf einen hohen Berg. Zuerst fahrt ihr mit der Seilbahn. Dann geht es zur Alm, über das Eis und die Felswand hoch. Die Bergführerin hat Rätsel versteckt. Jeder Weg hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Oben auf dem Gipfel ist das Ziel. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss am Weg",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Es wird Abend!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr steht auf dem Gipfel. Die Bergführerin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du wanderst auf einen hohen Berg. Zuerst fährst du mit der Seilbahn. Dann geht es zur Alm, über das Eis und die Felswand hoch. Die Bergführerin hat Rätsel versteckt. Jeder Weg hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Oben auf dem Gipfel ist das Ziel. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du stehst auf dem Gipfel. Die Bergführerin ist stolz auf dich!"
},
raeume:[
{titel:"Die Talstation",intro:"Ihr steht unten im Tal. Hier fährt die Seilbahn ab. Eine Schranke ist zu. Findet die Zahlen!",introDu:"Du stehst unten im Tal. Hier fährt die Seilbahn ab. Eine Schranke ist zu. Finde die Zahlen!",
objekte:[{name:"Fahr-Plan",fund:"Am Plan klebt:"},{name:"Stations-Uhr",fund:"An der Uhr klebt:"},{name:"Fahrkarten-Automat",fund:"Im Automaten liegt:"},{name:"Ruck-Sack",fund:"Im Rucksack liegt:"},{name:"Picknick-Korb",fund:"Im Korb liegt:"}],
infoObjekte:[{name:"Wander-Karte",fund:"An der Karte klebt:"},{name:"Weg-Weiser",fund:"Am Schild klebt:"},{name:"Blumen-Kasten",fund:"Bei den Blumen liegt:"}]},
{titel:"Die Almhütte",intro:"Ihr seid in einer Hütte aus Holz. Hier leben Kühe und Ziegen. Es riecht nach Käse. Die Tür ist zu.",introDu:"Du bist in einer Hütte aus Holz. Hier leben Kühe und Ziegen. Es riecht nach Käse. Die Tür ist zu.",
objekte:[{name:"Glocken-Brett",fund:"Am Brett klebt:"},{name:"Käse-Regal",fund:"Im Regal liegt:"},{name:"Melk-Hocker",fund:"Am Hocker klebt:"},{name:"Butter-Fass",fund:"Am Fass klebt:"},{name:"Milch-Kanne",fund:"An der Kanne klebt:"}],
infoObjekte:[{name:"Kräuter-Brett",fund:"Am Brett liegt:"},{name:"Kachel-Ofen",fund:"Am Ofen klebt:"},{name:"Heu mit Ziege",fund:"Im Heu liegt:"}]},
{titel:"Der Gletscher",intro:"Hier ist alles aus Eis. Es ist kalt und blau. Ein Tor aus Eis ist zu.",
objekte:[{name:"Eis-Zapfen",fund:"Am Eis klebt:"},{name:"Eis-Stern",fund:"Am Stern klebt:"},{name:"Schlitten",fund:"Auf dem Schlitten liegt:"},{name:"Berg-Schuh",fund:"Im Schuh liegt:"},{name:"Mess-Stange",fund:"An der Stange klebt:"}],
infoObjekte:[{name:"Eis-Tafel",fund:"An der Tafel klebt:"},{name:"Eis-Würfel",fund:"Im Eis liegt:"},{name:"Schnee-Berg",fund:"Im Schnee liegt:"}]},
{titel:"Die Steilwand",intro:"Vor euch ist eine hohe Felswand. Hier hängen Seile. Eine Felsplatte versperrt den Weg.",introDu:"Vor dir ist eine hohe Felswand. Hier hängen Seile. Eine Felsplatte versperrt den Weg.",
objekte:[{name:"Kletter-Haken",fund:"Am Haken hängt:"},{name:"Seil-Rolle",fund:"Am Seil hängt:"},{name:"Kletter-Helm",fund:"Im Helm liegt:"},{name:"Seil-Kiste",fund:"In der Kiste liegt:"},{name:"Stein-Bock",fund:"Beim Steinbock liegt:"}],
infoObjekte:[{name:"Stein-Tafel",fund:"An der Tafel klebt:"},{name:"Kristall-Stein",fund:"Am Stein klebt:"},{name:"Wasser-Quelle",fund:"An der Quelle liegt:"}]},
{titel:"Der Gipfel",intro:"Ihr seid fast oben! Die Sonne geht auf. Unter euch sind Wolken. Öffnet den Weg durch den Schnee!",introDu:"Du bist fast oben! Die Sonne geht auf. Unter dir sind Wolken. Öffne den Weg durch den Schnee!",
objekte:[{name:"Gipfel-Buch",fund:"Im Buch liegt:"},{name:"Adler",fund:"Beim Adler klebt:"},{name:"Fern-Glas",fund:"Am Fernglas klebt:"},{name:"Stein-Turm",fund:"Im Stein-Turm liegt:"},{name:"Murmel-Tier",fund:"Beim Murmeltier liegt:"}],
infoObjekte:[{name:"Aussichts-Tafel",fund:"An der Tafel klebt:"},{name:"Wetter-Mast",fund:"Am Mast klebt:"},{name:"Edelweiß",fund:"Bei den Blumen liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Talstation",
intro:"Die Morgensonne scheint auf die Sommerwiese im Tal. Bienen summen über den Blumen, und hoch oben glitzern die verschneiten Gipfel. An der Seilbahnstation ist die Schranke zur Gondel noch zu. Findet die Ziffern, um sie zu öffnen!",
introDu:"Die Morgensonne scheint auf die Sommerwiese im Tal. Bienen summen über den Blumen, und hoch oben glitzern die verschneiten Gipfel. An der Seilbahnstation ist die Schranke zur Gondel noch zu. Finde die Ziffern, um sie zu öffnen!",
tuerX:1250,tuerArt:"schranke",
hintergrund:()=>`${defs('#8ad060','#4a9a3a','#fff4b0')}${R(0,0,1600,470,'url(#bxH)')}${C(180,90,40,'#fff6b0')}${C(180,90,140,'url(#licht)')}${wolke(500,80,1,'#fff')}${wolke(950,50,.8,'#fff')}${berg(200,120,700,470,'#7a90b8','#fff')}${berg(650,60,800,470,'#6a80a8','#fff')}${berg(1150,140,700,470,'#8aa0c0','#fff')}${P('M0 380Q300 330 700 370T1600 350V470H0Z','#6ab04a')}${[60,140,330,420,560,820,900,1500,1560].map((x,k)=>tanne(x,420+k%3*14,120+k%2*40,'#2a6a3a')).join('')}${L('M0 40L1250 150','#3a3a40',4)}${L('M520 98V130','#3a3a40',3)}${R(492,130,56,44,'#e8403a','#5a1818',3)}${R(500,138,40,16,'#bfe4fa')}${R(1040,110,420,360,'#d8d0c0','#5a5048',4)}${P('M1020 116L1250 40L1480 116Z','#5a5a68','#2a2a30',4)}${R(1060,200,30,70,'#bfe4fa','#5a5048',3)}${R(1410,200,30,70,'#bfe4fa','#5a5048',3)}${L('M0 440H1040','#a0703e',5)}${[...Array(14)].map((_,k)=>R(k*75+20,420,8,50,'#a0703e')).join('')}${boden(0)}`,
objekte:[
{name:"Fahrplan",x:250,y:240,wand:true,by:-75,zeichne:fahrplan,fund:"Am Fahrplan klebt:"},
{name:"Stationsuhr",x:900,y:230,wand:true,by:-100,zeichne:suhr,fund:"An der Uhr klebt:"},
{name:"Fahrkartenautomat",x:150,boden:700,fuss:4,by:-180,zeichne:automat,fund:"Im Ausgabefach liegt:"},
{name:"Wanderrucksack",x:450,boden:730,fuss:4,by:-135,zeichne:rucksack,fund:"Im Rucksack liegt:"},
{name:"Picknickkorb",x:750,boden:650,fuss:4,by:-110,zeichne:picknick,fund:"Im Picknickkorb liegt:"}
],
infoObjekte:[{name:"Wanderkarte",x:600,y:250,wand:true,by:-100,zeichne:bergkarte,fund:"An der Wanderkarte klebt:"},{name:"Wegweiser",x:1000,boden:610,fuss:4,by:-220,zeichne:wegweiser,fund:"Am Wegweiser klebt:"},{name:"Blumenkasten",x:1450,boden:740,fuss:4,by:-115,zeichne:kuebel,fund:"Zwischen den Blumen liegt:"}]},
{titel:"Die Almhütte",
intro:"In der gemütlichen Almhütte knistert der Ofen. Es riecht nach Heu und frischem Käse, und draußen läuten die Kuhglocken. Die schwere Hüttentür ist verschlossen. Findet die Ziffern, um sie zu öffnen!",
introDu:"In der gemütlichen Almhütte knistert der Ofen. Es riecht nach Heu und frischem Käse, und draußen läuten die Kuhglocken. Die schwere Hüttentür ist verschlossen. Finde die Ziffern, um sie zu öffnen!",
tuerX:450,tuerArt:"huettentuer",
hintergrund:()=>`${defs('#a0703a','#5a3418','#ffd890')}${R(0,0,1600,470,'#8a5a32')}${[...Array(20)].map((_,k)=>L(`M0 ${k*24+12}H1600`,'rgba(40,20,5,.35)',3)).join('')}${[...Array(9)].map((_,k)=>R(k*200-10,0,26,470,'#5a3418',dk,2)).join('')}${R(0,0,1600,30,'#4a2a10')}${[[60,140],[650,150]].map(([x,y])=>R(x,y,150,120,'#9ad8f8','#4a2a10',8)+berg(x+60,y+30,140,y+120,'#8aa0c0','#fff')+P(`M${x} ${y+100}Q${x+75} ${y+80} ${x+150} ${y+96}V${y+120}H${x}Z`,'#7ac05a')+L(`M${x+75} ${y}V${y+120}M${x} ${y+60}H${x+150}`,'#4a2a10',6)+P(`M${x-10} ${y-6}H${x+160}L${x+150} ${y+24}H${x}Z`,'#c0303a')).join('')}${C(1000,60,120,'url(#licht)')}${L('M1000 0V40','#3a2410',3)}${P('M980 40H1020L1030 70H970Z','#f2c14e','#8a6a10',2)}${R(0,440,1600,30,'#4a2a10')}${boden(1)}`,
objekte:[
{name:"Glockenbrett",x:900,y:230,wand:true,by:-75,zeichne:glockenbrett,fund:"An der Kuhglocke klebt:"},
{name:"Käseregal",x:1200,y:240,wand:true,by:-80,zeichne:kaeseregal,fund:"Zwischen den Käselaiben liegt:"},
{name:"Melkschemel",x:150,boden:740,fuss:4,by:-75,zeichne:schemel,fund:"Unter dem Schemel klebt:"},
{name:"Butterfass",x:750,boden:700,fuss:4,by:-185,zeichne:butterfass,fund:"Am Butterfass klebt:"},
{name:"Milchkanne",x:1050,boden:640,fuss:4,by:-130,zeichne:kanne,fund:"An der Milchkanne klebt:"}
],
infoObjekte:[{name:"Kräutertafel",x:1450,y:240,wand:true,by:-80,zeichne:kraeuter,fund:"An der Kräutertafel klebt:"},{name:"Kachelofen",x:650,boden:600,fuss:4,by:-180,zeichne:ofen,fund:"Am Kachelofen klebt:"},{name:"Heuhaufen mit Zicklein",x:1350,boden:720,fuss:4,by:-125,zeichne:heu,fund:"Im Heu liegt:"}]},
{titel:"Der Gletscher",
intro:"Blaues Licht schimmert durch das uralte Eis. Der Gletscher knackt leise, und in den Spalten glitzert es wie Glas. Ein Tor aus Eis führt in eine Eishöhle. Findet die Ziffern, um es zu öffnen!",
introDu:"Blaues Licht schimmert durch das uralte Eis. Der Gletscher knackt leise, und in den Spalten glitzert es wie Glas. Ein Tor aus Eis führt in eine Eishöhle. Finde die Ziffern, um es zu öffnen!",
tuerX:800,tuerArt:"eistor",
hintergrund:()=>`${defs('#eef8ff','#9ac8e8','#9ae0ff')}<linearGradient id="bxG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a3a6a"/><stop offset="1" stop-color="#8ac8f0"/></linearGradient>${R(0,0,1600,470,'url(#bxG)')}${[[100,40],[400,80],[900,30],[1300,60],[1500,30]].map(([x,y])=>C(x,y,2,'#fff')).join('')}${berg(300,60,800,470,'#9ac0e0','#fff')}${berg(1300,80,900,470,'#8ab0d8','#fff')}${P('M0 200L120 150L260 210L420 160L560 230L700 170L900 160L1080 220L1240 150L1400 210L1600 170V470H0Z',eis,ed,4)}${L('M60 260L120 380M300 240L280 400M1100 250L1140 420M1380 240L1360 380M1500 260L1540 400','#7ab8e0',4)}${P('M0 330L200 300L400 340L560 310V470H0Z','#a8d8f0',ed,3)}${P('M1040 320L1250 290L1600 330V470H1040Z','#a8d8f0',ed,3)}${C(400,300,220,'url(#licht)')}${C(1250,300,220,'url(#licht)')}${boden(2)}${P('M200 600L260 590L320 610L420 596','none','#2a6aa0',8)}`,
objekte:[
{name:"Eiszapfen",x:250,y:220,wand:true,by:-80,zeichne:zapfen,fund:"Am Eiszapfen klebt:"},
{name:"Eiskristall",x:1100,y:240,wand:true,by:-90,zeichne:kristall,fund:"Im Eiskristall steckt:"},
{name:"Schlitten",x:150,boden:720,fuss:4,by:-95,zeichne:schlitten,fund:"Auf dem Schlitten liegt:"},
{name:"Bergschuh mit Steigeisen",x:500,boden:650,fuss:4,by:-100,zeichne:eisen,fund:"Im Bergschuh liegt:"},
{name:"Messstange",x:1300,boden:700,fuss:4,by:-240,zeichne:messstab,fund:"An der Messstange klebt:"}
],
infoObjekte:[{name:"Gletschertafel",x:1450,y:250,wand:true,by:-78,zeichne:gtafel,fund:"An der Gletschertafel klebt:"},{name:"Eisblock",x:1050,boden:600,fuss:4,by:-120,zeichne:eisblock,fund:"Im Eisblock steckt:"},{name:"Schneehaufen",x:650,boden:740,fuss:4,by:-135,zeichne:schneehaufen,fund:"Im Schnee liegt:"}]},
{titel:"Die Steilwand",
intro:"Die graue Felswand ragt steil in den Himmel. Bunte Kletterseile hängen an festen Haken, und die Nachmittagssonne wärmt den Stein. Eine schwere Felsplatte versperrt den Kamin nach oben. Findet die Ziffern, um sie hochzuziehen!",
introDu:"Die graue Felswand ragt steil in den Himmel. Bunte Kletterseile hängen an festen Haken, und die Nachmittagssonne wärmt den Stein. Eine schwere Felsplatte versperrt den Kamin nach oben. Finde die Ziffern, um sie hochzuziehen!",
tuerX:1350,tuerArt:"kamin",
hintergrund:()=>`${defs('#a8a090','#5a5248','#ffd090')}<linearGradient id="bxS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0a860"/><stop offset="1" stop-color="#ffe0b0"/></linearGradient>${R(0,0,1600,470,'url(#bxS)')}${C(140,80,36,'#fff0b0')}${P('M0 470V260L80 200L150 120L230 60L330 20L330 0H1600V470Z','#7a746c',fd,5)}${[...Array(9)].map((_,k)=>L(`M${280+k*30} ${60+k*48}Q900 ${30+k*50} 1600 ${50+k*50}`,'rgba(40,36,30,.3)',4)).join('')}${[[420,130],[760,90],[1120,140],[600,330],[980,300]].map(([x,y])=>P(`M${x-60} ${y}L${x+60} ${y-8}L${x+50} ${y+14}L${x-50} ${y+16}Z`,'#9a948a',fd,3)).join('')}${[[500,'#e8403a'],[830,'#2e6ac8'],[1180,'#7ad06a']].map(([x,c])=>L(`M${x} 0Q${x+20} 200 ${x-10} 460`,c,5)+C(x,40,6,'#c8ccd4','#3a3a40',2)+C(x+12,200,6,'#c8ccd4','#3a3a40',2)).join('')}${C(900,200,500,'url(#licht)')}${boden(3)}`,
objekte:[
{name:"Kletterhaken",x:300,y:250,wand:true,by:-80,zeichne:haken,fund:"Am Karabiner hängt:"},
{name:"Seilrolle",x:1000,y:230,wand:true,by:-95,zeichne:seilrolle,fund:"Am Seil hängt:"},
{name:"Kletterhelm",x:200,boden:720,fuss:4,by:-105,zeichne:helm,fund:"Im Helm liegt:"},
{name:"Materialkiste",x:700,boden:650,fuss:4,by:-120,zeichne:kiste,fund:"In der Kiste liegt:"},
{name:"Steinbock",x:1050,boden:600,fuss:4,by:-170,zeichne:steinbock,fund:"Neben dem Steinbock liegt:"}
],
infoObjekte:[{name:"Gesteinstafel",x:650,y:250,wand:true,by:-78,zeichne:gestein,fund:"An der Gesteinstafel klebt:"},{name:"Bergkristall",x:450,boden:740,fuss:4,by:-120,zeichne:kristallstein,fund:"Am Bergkristall klebt:"},{name:"Bergquelle",x:1500,boden:740,fuss:4,by:-135,zeichne:quelle,fund:"An der Quelle liegt:"}]},
{titel:"Der Gipfel",
intro:"Ihr seid fast am Ziel! Die Sonne geht auf und färbt den Himmel rosa und gold. Unter euch liegt ein weißes Wolkenmeer. Nur noch eine Schneewand trennt euch vom Gipfel. Findet die Ziffern für das letzte Schloss!",
introDu:"Du bist fast am Ziel! Die Sonne geht auf und färbt den Himmel rosa und gold. Unter dir liegt ein weißes Wolkenmeer. Nur noch eine Schneewand trennt dich vom Gipfel. Finde die Ziffern für das letzte Schloss!",
tuerX:600,tuerArt:"schneewand",
hintergrund:()=>`${defs('#f6f8fc','#c8d0e0','#ffd0a0')}<linearGradient id="bxA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4a9a"/><stop offset=".5" stop-color="#e88aa0"/><stop offset="1" stop-color="#ffd890"/></linearGradient>${R(0,0,1600,470,'url(#bxA)')}${[[80,40],[300,70],[1300,50],[1500,90]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${C(1150,330,70,'#fff0a0')}${C(1150,330,300,'url(#licht)')}${berg(250,200,500,400,'#8a7aa8','#fff')}${berg(1450,230,400,400,'#7a6a98','#fff')}${berg(900,260,300,400,'#9a8ab8','#fff')}${[...Array(18)].map((_,k)=>E(k*95+20,390+(k%3)*18,90,30,k%2?'#fff':'#fbeef4')).join('')}${R(0,420,1600,50,'#fff4f6')}${boden(4)}`,
objekte:[
{name:"Gipfelbuch-Kasten",x:200,y:250,wand:true,by:-75,zeichne:gbuch,fund:"Im Gipfelbuch liegt:"},
{name:"Steinadler",x:1000,y:200,wand:true,by:-50,zeichne:adler,fund:"In den Federn des Adlers steckt:"},
{name:"Aussichtsfernrohr",x:950,boden:700,fuss:4,by:-170,zeichne:fernglas,fund:"Am Fernrohr klebt:"},
{name:"Steinmännchen",x:1250,boden:650,fuss:4,by:-120,zeichne:steinmann,fund:"Zwischen den Steinen liegt:"},
{name:"Murmeltier",x:150,boden:740,fuss:4,by:-135,zeichne:murmel,fund:"Neben dem Murmeltier liegt:"}
],
infoObjekte:[{name:"Panoramatafel",x:1350,y:250,wand:true,by:-60,zeichne:panorama,fund:"An der Panoramatafel klebt:"},{name:"Wetterstation",x:1450,boden:600,fuss:4,by:-240,zeichne:wetter,fund:"An der Wetterstation klebt:"},{name:"Edelweiß-Polster",x:330,boden:640,fuss:4,by:-105,zeichne:edelweiss,fund:"Bei den Edelweißblüten liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="bxE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a9a"/><stop offset=".5" stop-color="#f08aa0"/><stop offset="1" stop-color="#ffd870"/></linearGradient><radialGradient id="bxL"><stop offset="0" stop-color="#fff6c0" stop-opacity=".9"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/></radialGradient></defs>
   <rect width="1000" height="600" fill="url(#bxE)"/>${[[90,50],[260,90],[760,60],[920,110]].map(([x,y])=>C(x,y,3,'#fff6c8')).join('')}${C(500,330,260,'url(#bxL)')}${C(500,330,70,'#fff0a0')}${L('M500 200V150M410 240L370 210M590 240L630 210M380 320H320M620 320H680','#fff6c0',6)}
   ${berg(140,220,360,400,'#8a7aa8','#fff')}${berg(860,240,320,400,'#7a6a98','#fff')}${[...Array(12)].map((_,k)=>E(k*90+10,390+(k%3)*16,90,30,k%2?'#fff':'#fbeef4')).join('')}${R(0,420,1000,40,'#fff4f6')}
   ${P('M120 600L260 470L380 420L470 360L540 380L640 440L800 500L900 600Z','#7a746a',fd,5)}${P('M330 440L470 360L540 380L600 420L500 410L420 430Z','#fff')}
   ${L('M500 372V240','#5a3a1c',6)}${P('M503 244H600L580 268L600 292H503Z','#e8403a','#7a1a10',3)}${U('bxberg',530,250,36,'#fff')}
   <g transform="translate(740 470)">${E(0,-30,30,16,'#a07a50','#4a3020',3)}${L('M-18 -18V4M-6 -18V4M10 -18V4M22 -18V4','#6a4a30',5)}${P('M22 -40L34 -60L44 -54L36 -36Z','#a07a50','#4a3020',3)}${L('M36 -58Q26 -84 6 -82M42 -56Q38 -82 22 -86','#6a5a48',5)}</g>
   <g transform="translate(300 520)">${E(0,-26,16,26,'#b08a5a','#5a3a1c',3)}${C(0,-58,12,'#b08a5a','#5a3a1c',3)}${C(-4,-60,2,'#222')}${C(4,-60,2,'#222')}</g>
   ${U('bxblume',380,520,40,'#f4f6f0')}${U('bxblume',430,540,30,'#f4f6f0')}${U('bxblume',600,530,34,'#f4f6f0')}${L('M120 160q14 -10 28 0q14 -10 28 0M800 140q12 -8 24 0q12 -8 24 0','#3a2a4a',3)}`
};
})();