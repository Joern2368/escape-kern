document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-lupe\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\"><circle cx=\"-4\" cy=\"-4\" r=\"10\" stroke-width=\"3.5\"/><path d=\"M4 4L15 15\" stroke-width=\"5\"/></g></symbol>\n<symbol id=\"sym-fussabdruck\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><path d=\"M-6 -2Q-9 -10 -2 -11Q7 -11 6 -1Q5 6 7 12Q7 18 0 18Q-6 18 -6 10Q-5 4 -6 -2Z\"/><circle cx=\"-6\" cy=\"-15\" r=\"2.6\"/><circle cx=\"-1\" cy=\"-17\" r=\"2.6\"/><circle cx=\"4\" cy=\"-16\" r=\"2.4\"/><circle cx=\"8\" cy=\"-13\" r=\"2.1\"/><circle cx=\"10\" cy=\"-9\" r=\"1.8\"/></g></symbol>\n<symbol id=\"sym-fingerabdruck\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"><path d=\"M-13 9Q-15 -15 0 -15Q15 -15 13 6\"/><path d=\"M-8 14Q-10 -9 0 -9Q10 -9 8 10\"/><path d=\"M-3 16Q-4 -3 0 -3Q4 -3 3 12\"/></g></symbol>\n<symbol id=\"sym-hut\" viewBox=\"-20 -20 40 40\"><g fill=\"currentColor\"><path d=\"M-10 4V-8Q-10 -14 0 -14Q10 -14 10 -8V4Z\"/><ellipse cx=\"0\" cy=\"6\" rx=\"18\" ry=\"5\"/></g><path d=\"M-10 -1H10\" stroke=\"#fff\" stroke-opacity=\".5\" stroke-width=\"3\"/></symbol>\n<symbol id=\"sym-taschenlampe\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"-18\" y=\"-5\" width=\"18\" height=\"10\" rx=\"2\"/><path d=\"M0 -5L7 -9V9L0 5Z\"/><path d=\"M11 -11L16 -15M12 0H18M11 11L16 15\"/></g></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.32)"/>`;
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1||'#8a5a32'}"/><stop offset="1" stop-color="${b2||'#3f2614'}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l||'#ffd890'}" stop-opacity=".5"/><stop offset="1" stop-color="${l||'#ffd890'}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
const R=(x,y,w,h,f,s,sw,rx)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}"${rx?` rx="${rx}"`:''} fill="${f}"${s?` stroke="${s}" stroke-width="${sw||2}"`:''}/>`;
const P=(d,f,s,sw)=>`<path d="${d}" fill="${f||'none'}"${s?` stroke="${s}" stroke-width="${sw||2}"`:''}/>`;
const C=(x,y,r,f,s,sw)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${s?` stroke="${s}" stroke-width="${sw||2}"`:''}/>`;
const U=(n,x,y,g,f)=>`<use href="#sym-${n}" x="${x}" y="${y}" width="${g}" height="${g}" color="${f}"/>`;
const Q=(n,f)=>[...Array(n)].map((_,k)=>f(k)).join('');
function boden(sp,ys){let d='';for(let x=-1600;x<=3200;x+=sp||120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of ys||[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return`<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="${d}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>`;}
function paneel(y0,f){let d='';for(let x=40;x<1600;x+=120)d+=`M${x} ${y0+14}V462`;return R(0,y0,1600,470-y0,f)+P(d,0,'rgba(0,0,0,.25)',3)+R(0,y0,1600,10,'rgba(0,0,0,.25)');}
function streifen(f,ab,w){let d='';for(let x=ab;x<1600;x+=ab)d+=`M${x} 40V470`;return P(d,0,f,w);}
function gitter(y0,y1,s,f){let d='';for(let y=y0;y<y1;y+=s)d+=`M0 ${y}H1600`;for(let x=0;x<1600;x+=s)d+=`M${x} ${y0}V${y1}`;return P(d,0,f,2);}
const decke=f=>R(0,0,1600,40,f);
function tisch(w,h,f,s){return schatten(w/2+6,4)+P(`M${-w/2+8} 0V${-h}M${w/2-8} 0V${-h}`,0,s,7)+R(-w/2-6,-h-10,w+12,12,f,s,2,3);}
function stativ(h){return schatten(40,4)+P(`M0 ${-h}L-34 0M0 ${-h}L34 0M0 ${-h}V-6`,0,'#4a4a4a',5);}
function roehre(x){return`<ellipse cx="${x}" cy="70" rx="200" ry="50" fill="#eaf6ff" opacity=".18"/>`+P(`M${x-60} 40V50M${x+60} 40V50`,0,'#333',2)+R(x-100,48,200,12,'#f4fbff','#7a8a96',2,6);}
function fensterStadt(x,y,w,h){let s=R(x-w/2,y,w,h,'#1f2c44');const b=[[-.48,.5],[-.3,.7],[-.12,.4],[.06,.62],[.24,.45],[.4,.75]];b.forEach(([a,t])=>{const bx=x+a*w;s+=R(bx,y+h*(1-t),w*.17,h*t,'#2f3e5c')+Q(3,k=>R(bx+8,y+h*(1-t)+12+k*22,8,10,k%2?'#3a4866':'#f0d070'));});let r='';for(let k=0;k<26;k++){const rx=x-w/2+((k*37)%w),ry=y+((k*53)%(h-24));r+=`M${rx} ${ry}l-6 18`;}return s+R(x-w/2,y,w,h,'none','#4a2c16',10)+P(`M${x} ${y}V${y+h}M${x-w/2} ${y+h/2}H${x+w/2}`,0,'#4a2c16',6)+R(x-w/2-14,y+h,w+28,12,'#5a3418');}
function ventilator(x){return P(`M${x} 40V78`,0,'#222',4)+`<ellipse cx="${x}" cy="84" rx="110" ry="9" fill="#5a3a20" stroke="#2a1608" stroke-width="2"/><ellipse cx="${x}" cy="86" rx="34" ry="12" fill="#4a2c16"/>`+C(x,82,12,'#b8862a','#5a3a20');}
function korkwand(x,y,w,h){const z=[[30,30,'#f4ecd8'],[150,20,'#cfe0f0'],[290,40,'#f4ecd8'],[400,24,'#f6e58a'],[70,140,'#f6e58a'],[210,130,'#f4ecd8'],[350,150,'#cfe0f0']];let s=R(x,y,w,h,'#c49a5e','#6b4a24',10),pk=[];z.forEach(([a,b,f],k)=>{const px=x+a,py=y+b;s+=R(px,py,80,70,f,'#8a7a5a',1.5)+(k%2?C(px+40,py+30,14,'#9aa8b4')+P(`M${px+18} ${py+66}Q${px+40} ${py+38} ${px+62} ${py+66}Z`,'#9aa8b4'):P(`M${px+10} ${py+20}H${px+70}M${px+10} ${py+34}H${px+60}M${px+10} ${py+48}H${px+66}`,0,'#9a8e70',2));pk.push([px+40,py+6]);});s+=P('M'+[0,1,5,2,3,6,4,0].map(k=>pk[k].join(' ')).join('L'),0,'#d0202a',3);return s+pk.map(([a,b],k)=>C(a,b,5,k%2?'#2a6ad0':'#d0202a','#222',1)).join('');}
function waescheleine(){const f=['#e8e0d0','#d8d0c0','#f0e8d8'];let s=P('M420 110Q1000 140 1580 110',0,'#ddd',2);for(let k=0;k<8;k++){const x=470+k*140,y=118+Math.round(Math.sin(k/7*3.14)*12);s+=R(x,y,70,58,f[k%3],'#888',1)+R(x+6,y+6,58,38,'#5a4a4a')+(k%2?C(x+24,y+20,8,'#e8c45a')+P(`M${x+6} ${y+44}L${x+30} ${y+24}L${x+46} ${y+36}L${x+64} ${y+22}V${y+44}Z`,'#8a9a7a'):C(x+35,y+20,9,'#c9a68a')+P(`M${x+20} ${y+44}Q${x+35} ${y+26} ${x+50} ${y+44}Z`,'#8a6a5a'))+R(x+30,y-8,8,14,'#b8864a');}return s;}
function rotlicht(x){return C(x,120,320,'url(#licht)')+P(`M${x} 0V90`,0,'#111',3)+P(`M${x-26} 112Q${x} 76 ${x+26} 112Z`,'#2a1010','#000')+`<ellipse cx="${x}" cy="114" rx="16" ry="7" fill="#ff3020"/>`;}
function dach(){return R(0,0,1600,470,'#4a3424')+streifen('rgba(0,0,0,.28)',60,3)+P('M0 300L300 0H370L0 370ZM1600 300L1300 0H1230L1600 370Z','#2a1a10')+R(0,30,1600,26,'#3a2416','#1a0e06',2)+P('M1030 80H1170L1192 200H1008Z','#1b2a48','#2a1a10',10)+C(1130,118,16,'#fff1b8')+P('M1060 104l3 6l6 1l-5 4l1 6l-5 -3l-5 3l1 -6l-5 -4l6 -1Z','#e8c45a')+P('M1100 80V200M1019 140H1181',0,'#2a1a10',5)+P('M8 60Q40 70 50 100M8 60Q30 90 20 120M8 60L60 66M28 66Q30 80 22 90',0,'rgba(220,220,220,.4)',1.5);}
const schreibtisch=()=>`${schatten(86,4)}${R(-74,-70,58,70,'#7a4a28','#3a2010',2)}${R(62,-70,10,70,'#5a3418')}${Q(2,k=>R(-68,-64+k*32,46,26,'#8a5a32','#3a2010',1.5)+C(-45,-51+k*32,3,'#d8a73a'))}${R(-84,-82,168,14,'#6b4024','#3a2010',3,3)}${R(-60,-88,46,6,'#f4ecd8','#b8a888',1)}${C(40,-104,56,'url(#licht)')}${P('M28 -82H52L48 -88H32Z','#b8862a')}${P('M40 -88V-110',0,'#b8862a',4)}${P('M16 -108Q40 -130 64 -108Z','#2f8a4a','#1a4a2a',2)}<ellipse cx="40" cy="-108" rx="22" ry="4" fill="#fff6c0"/>`;
const telefon=()=>`${tisch(70,74,'#7a4a28','#3a2010')}${P('M-30 -84L-22 -112H22L30 -84Z','#2a2a2a','#000')}${C(0,-98,12,'#e8e0d0','#555')}${Q(8,k=>`<circle cx="${Math.round(Math.cos(k*.8)*8)}" cy="${-98+Math.round(Math.sin(k*.8)*8)}" r="1.8" fill="#555"/>`)}${P('M-32 -116Q-34 -128 -20 -126H20Q34 -128 32 -116L24 -112Q0 -118 -24 -112Z','#2a2a2a','#000')}${P('M30 -94Q46 -70 30 -50Q22 -40 34 -30',0,'#2a2a2a',2)}`;
const papierkorb=()=>`${schatten(34,4)}${C(-10,-62,12,'#f4ecd8','#b8a888')}${C(10,-66,11,'#e8dcc0','#b8a888')}${P('M-26 0L-32 -60H32L26 0Z','#8a949a','#3a4246',3)}${P('M-16 -2L-20 -58M0 -2V-58M16 -2L20 -58M-30 -40H30M-28 -20H28',0,'#5a646a',2)}`;
const tresor=()=>`${schatten(56,4)}${R(-52,-116,104,112,'#5a646a','#2c3438',4,5)}${R(-42,-106,84,92,'#6a747a','#2c3438',2)}${C(-6,-60,18,'#3a4246','#c9ccce',3)}${Q(8,k=>`<path d="M-6 -78V-72" stroke="#c9ccce" stroke-width="2" transform="rotate(${k*45} -6 -60)"/>`)}${P('M22 -72V-48',0,'#c9ccce',6)}${R(-46,-6,16,8,'#2c3438')}${R(30,-6,16,8,'#2c3438')}`;
const wanduhr=()=>`${C(0,0,46,'#f4ecd8','#5a3418',8)}${Q(12,k=>`<path d="M0 -38V-32" stroke="#333" stroke-width="3" transform="rotate(${k*30})"/>`)}${P('M0 0V-26M0 0L18 8',0,'#222',4)}${C(0,0,4,'#a33b22')}`;
const karteikasten=()=>`${tisch(110,64,'#6a7a88','#2c3438')}${Q(7,k=>R(-38+k*11,-126+(k%3)*3,9,16,['#f4ecd8','#f6e58a','#cfe0f0'][k%3],'#8a7a5a',1))}${R(-46,-114,92,40,'#8a6a3e','#3a2010',2)}${R(-14,-102,28,12,'#f4ecd8','#6b4a24',1)}`;
const hundekorb=()=>`${schatten(66,4)}${P('M-62 -36Q0 -50 62 -36','#a8743a')}${P('M-50 -36Q-50 -58 0 -58Q50 -58 50 -36Z','#c83a3a')}<ellipse cx="8" cy="-50" rx="38" ry="17" fill="#c98a4a" stroke="#7a4a1a" stroke-width="2"/>${C(-32,-58,17,'#c98a4a','#7a4a1a')}<ellipse cx="-50" cy="-54" rx="12" ry="8" fill="#e8b47a"/>${C(-60,-56,4,'#222')}${P('M-34 -64Q-29 -60 -24 -64',0,'#222',2)}<ellipse cx="-22" cy="-56" rx="7" ry="13" fill="#7a4a1a" transform="rotate(20 -22 -56)"/>${P('M44 -52Q64 -64 58 -76',0,'#c98a4a',6)}${P('M-64 -38Q-64 0 0 0Q64 0 64 -38Q0 -24 -64 -38Z','#c9944e','#6b4a24',3)}${P('M-56 -24Q0 -8 56 -24M-48 -12Q0 2 48 -12',0,'#8a5a2a',2)}`;
const kreidetafel=()=>`${schatten(46,4)}${P('M-44 0L-24 -170M44 0L24 -170M0 -40V-160',0,'#7a5a34',6)}${R(-64,-166,128,96,'#2f4a3a','#8a6a3e',6)}${U('fussabdruck',-56,-158,40,'#f4ecd8')}${P('M-8 -138Q14 -150 30 -130M22 -136L30 -130L24 -122M-44 -96H40M-44 -84H20',0,'#f4ecd8',2.5)}`;
const fernglas=()=>`${stativ(130)}${R(-34,-168,28,42,'#2a2a2a','#000',2,8)}${R(6,-168,28,42,'#2a2a2a','#000',2,8)}${R(-6,-156,12,16,'#555')}${C(-20,-124,11,'#7ab0d8','#555',3)}${C(20,-124,11,'#7ab0d8','#555',3)}`;
const stadtplan=()=>`${R(-90,-64,180,128,'#efe6c8','#3a4a5a',6)}${R(-70,-44,50,36,'#9ac07a')}${P('M-86 30Q-30 10 0 30T86 20',0,'#5a9ad0',10)}${P('M-86 -20H86M10 -60V60M-50 -60L60 60',0,'#fff',6)}${P('M-60 40L-10 -24L46 -40',0,'#d0202a',3)}${C(-60,40,6,'#d0202a','#222',1)}${C(-10,-24,6,'#2a6ad0','#222',1)}${C(46,-40,6,'#f0c020','#222',1)}`;
const schalen=()=>`${tisch(176,72,'#3a2a2a','#140808')}${[-56,0,56].map((x,k)=>R(x-26,-94,52,12,'#e8e8e8','#666',2,2)+R(x-22,-92,44,5,['#d8a0a0','#e8d080','#a0c8d8'][k]))}${R(-14,-96,28,8,'#f4ecd8')}${P('M36 -110L56 -92M44 -112L58 -94',0,'#999',3)}`;
const kamera=()=>`${stativ(120)}${R(-40,-166,80,46,'#2a2a2a','#000',2,6)}${R(-32,-176,20,10,'#888')}${C(0,-142,17,'#444','#aaa',3)}${C(0,-142,8,'#7ab0d8')}${C(-4,-146,3,'#fff')}${R(22,-172,10,6,'#d0202a')}`;
const waschbecken=()=>`${schatten(64,4)}${P('M-46 0V-74M46 0V-74',0,'#7a8486',7)}${R(-62,-90,124,38,'#e8ecec','#6a7070',3,4)}${R(-50,-90,100,10,'#a8c8d8')}${P('M30 -90V-122H6V-112',0,'#a0a8aa',6)}${R(-48,-112,16,22,'#6b3a1c','#2a1408',1,3)}`;
const filmkiste=()=>`${schatten(56,4)}${R(-52,-62,104,62,'#8a6a3e','#4a3018',3)}${P('M-52 -42H52M-52 -22H52',0,'#5a4028',2)}${[-30,-6,18].map(x=>R(x,-88,18,26,'#e8a83a','#5a3a10',2,3)+R(x-1,-92,20,6,'#2a2a2a'))}${P('M40 -62Q60 -90 46 -110',0,'#2a2a2a',10)}${P('M40 -62Q60 -90 46 -110',0,'#888',2)}`;
const flaschenregal=()=>`${R(-86,30,172,8,'#5a3a2a')}${R(-86,-26,172,8,'#5a3a2a')}${[[-70,'#6b3a1c'],[-38,'#2a5a3a'],[-6,'#6b3a1c'],[26,'#3a3a6a'],[56,'#6b3a1c']].map(([x,f],k)=>P(`M${x} 30V0Q${x} -8 ${x+6} -10V-18H${x+12}V-10Q${x+18} -8 ${x+18} 0V30Z`,f,'#000',1.5)+R(x+2,8,14,10,'#f4ecd8'))}${[-60,-20,30].map(x=>R(x,-64,22,38,'#cfd8dc','#666',1.5,3))}`;
const koffer=()=>`${schatten(66,4)}${R(-62,-44,124,44,'#8a3a2a','#4a1a10',3,6)}${R(-50,-80,100,36,'#3a5a7a','#1a2a3a',3,6)}${R(-36,-106,72,26,'#b8864a','#5a3a1a',3,5)}${P('M-30 -44V0M30 -44V0',0,'#5a2a1a',5)}${P('M-12 -106V-114H12V-106',0,'#3a2010',4)}${C(26,-62,9,'#f0c020')}${C(-30,-24,8,'#f4ecd8')}`;
const schaukelpferd=()=>`${schatten(64,4)}${P('M-66 -18Q0 10 66 -18',0,'#7a4a24',8)}${P('M-36 -12L-28 -58M36 -12L28 -58M-24 -8L-18 -56M24 -8L18 -56',0,'#e8e0d0',6)}<ellipse cx="0" cy="-66" rx="40" ry="17" fill="#f4ecd8" stroke="#8a7a5a" stroke-width="2"/>${P('M24 -74L36 -112Q46 -120 58 -108L52 -98L40 -96L34 -70Z','#f4ecd8','#8a7a5a')}${P('M24 -78L32 -110Q36 -118 42 -118',0,'#c83a3a',7)}${C(44,-108,2.5,'#222')}${P('M-10 -82Q4 -90 16 -82V-70H-10Z','#c83a3a')}${P('M-40 -68Q-58 -64 -56 -44',0,'#c83a3a',6)}${C(-14,-62,4,'#9a8a6a')}${C(6,-58,4,'#9a8a6a')}`;
const truhe=()=>`${schatten(74,4)}${R(-66,-62,132,62,'#7a4a1e','#3d230c',3)}${P('M-66 -62Q0 -100 66 -62Z','#8d5726','#3d230c',3)}${P('M-44 0V-80M44 0V-80',0,'#9a9a9a',6)}${R(-12,-70,24,22,'#d8a73a','#6b4a1c',2,3)}${C(0,-60,3,'#3d230c')}`;
const lampenkiste=()=>`${schatten(56,4)}${R(-48,-54,96,54,'#a07a48','#5a3a1a',3)}${P('M-48 -36H48M-48 -18H48M-30 -54V0M30 -54V0',0,'#7a5a30',2)}<path d="M22 -82L96 -104V-38L22 -60Z" fill="#fff6b0" opacity=".45"/>${R(-34,-78,50,20,'#c83a2a','#5a1a10',2,5)}${P('M14 -82L26 -86V-50L14 -54Z','#9a9a9a','#444')}${R(-20,-74,10,8,'#333',0,0,2)}`;
const spiegel=()=>`<ellipse cx="0" cy="0" rx="44" ry="62" fill="#c8dce8" stroke="#b8862a" stroke-width="9"/>${P('M-20 -30L4 -46M-24 -10L14 -36',0,'#fff',4)}${C(0,-70,6,'#b8862a')}`;
const zeitung=()=>`<g transform="rotate(-4)">${R(-46,-58,92,116,'#efe8d4','#9a8e70',2)}${R(-38,-48,76,10,'#333')}${R(-38,-32,34,34,'#a8a8a8')}${U('hut',-38,-38,34,'#333')}${P('M2 -28H38M2 -18H38M2 -8H32M-38 12H38M-38 22H38M-38 32H38M-38 42H24',0,'#8a8270',3)}${R(-12,-66,24,14,'rgba(240,230,160,.8)')}</g>`;
const garderobe=()=>`${schatten(40,4)}${P('M-34 0L0 -14L34 0M0 -10V-206',0,'#5a3418',7)}${P('M-22 -196L0 -190L22 -196',0,'#5a3418',5)}${P('M-8 -194L-30 -182L-36 -84H36L30 -182L8 -194Z','#c9a46a','#7a5a34',2)}${P('M-8 -194L0 -160L8 -194M-30 -182L-34 -110M30 -182L34 -110M0 -160V-84',0,'#7a5a34',2)}${R(-34,-132,68,9,'#9a7a44')}${C(-7,-146,3,'#5a3418')}${C(-7,-110,3,'#5a3418')}${C(7,-146,3,'#5a3418')}${C(7,-110,3,'#5a3418')}<ellipse cx="0" cy="-208" rx="28" ry="6" fill="#4a2e1e"/>${R(-16,-232,32,24,'#5a3a2a',0,0,6)}${R(-16,-216,32,6,'#2a1a10')}`;
const aktenschrank=()=>`${schatten(56,4)}${R(-50,-172,100,172,'#7a8a6a','#3a4a30',3,3)}${Q(4,k=>R(-42,-164+k*42,84,36,'#8a9a7a','#3a4a30',2)+R(-16,-158+k*42,32,10,'#f4ecd8')+R(-12,-142+k*42,24,5,'#d8d8d8'))}`;
const kalender=()=>`${R(-50,-60,100,120,'#f4ecd8','#5a3418',4)}${R(-50,-60,100,26,'#c83a3a')}${C(-25,-60,5,'#333')}${C(25,-60,5,'#333')}${Q(12,k=>R(-42+(k%4)*22,-26+Math.floor(k/4)*26,16,18,k==6?'#f6e58a':'#fff','#b8a888',1))}`;
const aktenstapel=()=>`${schatten(50,4)}${Q(5,k=>R(-44+(k%2)*4,-18-k*18,88,18,['#c9a46a','#6a8ab0','#c87a5a'][k%3],'#3a2a1a',1.5))}${R(-20,-104,40,10,'#f4ecd8')}`;
const buecherregal=()=>`${schatten(60,4)}${R(-56,-180,112,180,'#6b4024','#3a2010',3)}${Q(15,k=>R(-46+(k%5)*18,-168+Math.floor(k/5)*56,14,48,['#3a5a7a','#c83a3a','#2f8a4a','#d8a73a'][k%4],'#222',1))}${P('M-52 -118H52M-52 -62H52M-52 -6H52',0,'#3a2010',4)}`;
const plakat=()=>`${R(-48,-64,96,128,'#e8e0c8','#2a1010',4)}${Q(3,k=>C(-28,-36+k*36,10,['#d8a0a0','#e8d080','#a0c8d8'][k])+P(`M-10 ${-40+k*36}H36M-10 ${-30+k*36}H26`,0,'#5a4a4a',3))}`;
const fotoalbum=()=>`${schatten(40,4)}${P('M-28 0L-22 -60M28 0L22 -60M-25 -30H25',0,'#4a2a20',5)}${R(-36,-68,72,10,'#5a3428','#2a1008',2,3)}${R(-40,-100,40,32,'#f4ecd8','#8a7a5a',1)}${R(0,-100,40,32,'#f4ecd8','#8a7a5a',1)}${R(-35,-95,30,20,'#9aa8b4')}${R(5,-95,30,20,'#c9a68a')}`;
const papierschrank=()=>`${schatten(50,4)}${R(-46,-130,92,130,'#8a6a4a','#e8c890',3)}${P('M0 -130V0',0,'#e8c890',2)}${C(-7,-66,3,'#d8a73a')}${C(7,-66,3,'#d8a73a')}${R(-38,-152,40,22,'#e8a83a','#5a3a10',2)}${R(4,-146,32,16,'#d0202a','#4a0a0a',2)}`;
const landkarte=()=>`${P('M-70 -48Q0 -60 70 -48V48Q0 60 -70 48Z','#e8d8a8','#8a6a3e',3)}${P('M-50 -20Q-20 -40 0 -14Q20 10 46 -6',0,'#5a9ad0',4)}${P('M-40 20Q-10 4 20 26',0,'#7a9a5a',6)}${C(34,22,7,'none','#d0202a',3)}${P('M-50 34L-30 38L-12 30',0,'#d0202a',2)}`;
const buecherkiste=()=>`${schatten(56,4)}${Q(5,k=>R(-44+k*18,-80+(k%2)*6,14,30,['#3a5a7a','#8a3a2a','#2a5a3a','#b8864a','#5a3a6a'][k],'#222',1))}${R(-52,-56,104,56,'#a07a48','#5a3a1a',3)}${P('M-52 -38H52M-52 -18H52',0,'#7a5a30',2)}`;
const globus=()=>`${schatten(36,4)}${R(-26,-10,52,10,'#5a3418',0,0,3)}${P('M0 -10V-34',0,'#5a3418',6)}${C(0,-80,46,'#5a9ad0','#2a4a6a',2)}${P('M-30 -100Q-10 -110 0 -90Q10 -70 -10 -60Q-30 -60 -36 -78ZM14 -112Q34 -104 38 -84Q24 -88 14 -98Z','#8ab06a')}${P('M-34 -44A50 50 0 0 1 34 -116',0,'#b8862a',4)}`;
const muelltonne=()=>`${schatten(40,4)}${R(-30,-80,60,80,'#8a96a0','#4a5660',3,6)}${R(-35,-94,70,16,'#a0acb6','#4a5660',3,5)}${P('M-16 -66V-10M0 -66V-10M16 -66V-10',0,'#4a5660',3)}${P('M34 -90Q54 -100 52 -70',0,'#4a5660',4)}`;
const zeitungskiste=()=>`${schatten(52,4)}${R(-46,-50,92,50,'#8a6a3a','#4a3018',3)}${R(-38,-64,76,16,'#f4ecd8','#8a7a5a',2)}${R(-34,-76,70,14,'#e8e0c8','#8a7a5a',2)}${P('M-26 -70H20M-26 -58H10',0,'#8a7a5a',2)}`;
const fahrrad=()=>`${schatten(70,4)}${C(-48,-34,34,'none','#2a2a2a',5)}${C(48,-34,34,'none','#2a2a2a',5)}${P('M-48 -34L-14 -66H30L48 -34M-14 -66L-4 -34H-48M30 -66V-84M18 -86H42M-14 -66V-80M-26 -82H-2',0,'#c0303a',5)}${C(-4,-34,6,'#8a96a0')}`;
const strassenkatze=()=>`${schatten(32,4)}<ellipse cx="0" cy="-26" rx="24" ry="26" fill="#3a3a44"/>${C(0,-62,16,'#3a3a44')}${P('M-14 -72L-12 -90L-2 -76ZM14 -72L12 -90L2 -76Z','#3a3a44')}${C(-6,-62,3,'#ffe680')}${C(6,-62,3,'#ffe680')}${P('M20 -6Q52 -10 46 -42',0,'#3a3a44',7)}`;
const briefkasten=()=>`${R(-32,-28,64,56,'#e0b020','#8a6a10',3,8)}${P('M-20 -8H20',0,'#5a4a10',4)}${P('M32 -16V-40H44',0,'#c0303a',4)}${C(0,14,4,'#8a6a10')}`;
const wegweiser=()=>`${P('M0 34V220',0,'#5a5a64',8)}${P('M-62 -34H42L60 -18L42 -2H-62Z','#e8e0c8','#5a4a3a',3)}${P('M62 10H-42L-60 26L-42 42H62Z','#e8e0c8','#5a4a3a',3)}${U('lupe',-52,-32,28,'#2a3a44')}${U('hut',24,12,28,'#2a3a44')}`;
const pakete=()=>`${schatten(54,4)}${R(-46,-42,92,42,'#c8a070','#7a5a30',3)}${R(-32,-76,64,34,'#d8b080','#7a5a30',3)}${P('M0 -42V0M0 -76V-42',0,'#8a6a3a',5)}${R(8,-30,22,14,'#fff','#8a6a3a',1)}`;
const regentonne=()=>`${schatten(44,4)}${P('M-34 0Q-44 -50 -34 -100H34Q44 -50 34 0Z','#6a7a8a','#2a3a4a',3)}${P('M-38 -22H38M-40 -50H40M-38 -78H38',0,'#3a4a5a',5)}<ellipse cx="0" cy="-100" rx="34" ry="8" fill="#4a90c8"/>${P('M34 -90Q60 -86 62 -60',0,'#6a7a8a',6)}`;
const schlossPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=C(x0+k*22,y,8,'#1a1208','#d8a73a',2);return R(500-n*11-12,y-18,n*22+24,36,'#1a1208','#d8a73a',2,6)+d;};
const lupeOben=(y,c)=>U('lupe',474,y,52,c||'#e8c45a');
const TDEF=`<defs><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#7a8a96"/><stop offset=".5" stop-color="#b4c2cc"/><stop offset="1" stop-color="#6a7884"/></linearGradient><clipPath id="dkclip"><rect x="410" y="196" width="180" height="274"/></clipPath></defs>`;
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out}.tuer.offen #reg{transform:scaleX(.1)}.tuer #rad{transform-origin:500px 330px;transition:transform 1.2s ease-in-out}.tuer.offen #rad{transform:rotate(300deg)}.tuer.offen #tre{transform:scaleX(.12);transition:transform 1.6s ease-in-out 1s}.tuer.offen #pl{transform:translateX(-95px)}.tuer.offen #pr{transform:translateX(95px)}.tuer .la{transition:fill 1s}.tuer.offen .la{fill:#4ae07a}.tuer.offen #fl{transform:translateY(100px)}.tuer.offen #lid3{transform:scaleY(.1)}.tuer #trp{transform:scaleY(.04);transition:transform 1.6s ease-out .7s}.tuer.offen #trp{transform:scaleY(1)}</style>`;
function tuerRegal(n){
let b='';const cols=['#a33b22','#2a4a8a','#3a8a4a','#d8a73a','#6a3a8a','#8a5a2a'];
for(let r=0;r<4;r++){let x=402;for(let k=0;x<590;k++){const w=14+(k*7+r*5)%12,h=44+(k*13+r*7)%18;b+=R(x,196+r*68+60-h,w,h,cols[(k+r)%6],'#2a1608',1);x+=w+1;}b+=R(398,256+r*68,204,8,'#5a3418');}
return`${R(380,170,240,300,'#3a2414','#1a0e06',4)}${R(396,184,208,286,'#0e0804')}${C(500,340,110,'url(#licht)')}
   <g id="reg" class="tb" style="transform-origin:500px 330px">${R(396,184,208,286,'#6b4024','#3a2010',3)}${b}${R(398,460,204,10,'#5a3418')}${schlossPl(n,330)}</g>${lupeOben(110)}`;
}
function tuerTresor(n){
let bo='';for(let k=0;k<12;k++){const a=k*Math.PI/6;bo+=C((500+Math.cos(a)*94).toFixed(0),(340+Math.sin(a)*94).toFixed(0),5,'#4a5660');}
return`${R(372,150,256,320,'#5a6470','#22282e',5)}${C(500,340,116,'#0e1218','#22282e',4)}${C(500,340,100,'url(#licht)')}${lupeOben(158)}
   <g id="tre" class="tb" style="transform-origin:388px 340px">${C(500,340,112,'url(#platteG)','#4a5660',6)}${C(500,340,96,'none','#6a7884',4)}${bo}<g id="rad">${C(500,330,34,'none','#2a3238',8)}${P('M500 296V364M466 330H534M476 306L524 354M524 306L476 354',0,'#2a3238',5)}${C(500,330,10,'#4a5660')}</g>${schlossPl(n,412)}</g>`;
}
function tuerSchleuse(n){
let st='';for(let k=0;k<5;k++)st+=`M${425+k*16} 200V466`;
return`${R(380,150,240,320,'#24100f','#0a0404',5)}${R(410,196,180,274,'#0a0404')}${C(500,340,100,'url(#licht)')}
   <g clip-path="url(#dkclip)"><g id="pl" class="tb">${R(410,196,90,274,'#1a0e10','#000',3)}${P(st,0,'#2a1618',3)}${R(484,320,8,60,'#6a3a3a')}</g><g id="pr" class="tb">${R(500,196,90,274,'#1a0e10','#000',3)}${P(st.split('M425').join('M509'),0,'#2a1618',3)}${R(508,320,8,60,'#6a3a3a')}</g></g>
   ${R(530,86,70,36,'#1a0808','#000',3,6)}${C(565,104,11,'#ff3a2a',null,0).replace('/>',' class="la"/>')}${lupeOben(96)}${schlossPl(n,173)}`;
}
function tuerFeuer(n){
let r='';for(let y=276;y<370;y+=18)r+=`M452 ${y}H548`;
return`${P('M380 250L356 340M620 250L644 340',0,'#3a3a44',6)}${P('M620 236L704 148M646 236L730 148M640 214L712 140',0,'#3a3a44',5)}${P('M650 214H668M668 190H686M686 166H704',0,'#3a3a44',4)}
   ${R(380,236,240,14,'#3a3a44','#14141a',3)}${P('M392 250V262M416 250V262M440 250V262M464 250V262M488 250V262M512 250V262M536 250V262M560 250V262M584 250V262M608 250V262',0,'#14141a',3)}${P('M380 236V176H620V236M380 206H620',0,'#3a3a44',5)}
   <g id="fl" class="tb">${P('M452 262V372M548 262V372',0,'#8a96a0',6)}${P(r,0,'#8a96a0',5)}</g>
   ${R(440,184,120,44,'#1a1208','#d8a73a',2,6)}${lupeOben(118,'#5ff0a0')}${schlossPl(n,206)}`;
}
function tuerKlapp(n){
let t='';for(let k=1;k<8;k++){const y=190+k*35,d=14*(y-190)/280;t+=`M${452-d} ${y}H${548+d}`;}
return`${R(410,60,180,134,'#2a1c12','#120a04',4)}${R(420,70,160,110,'#1b2a5a')}${[[440,92],[470,150],[520,86],[560,130],[450,120]].map(([x,y])=>C(x,y,2,'#fff')).join('')}${C(546,98,16,'#fff3a8')}
   <g id="trp" class="tb" style="transform-origin:500px 190px">${P('M452 190L438 470M548 190L562 470',0,'#8a5a2a',8)}${P(t,0,'#a87a44',7)}</g>
   <g id="lid3" class="tb" style="transform-origin:500px 62px">${R(420,70,160,110,'#6b4a2a','#3a2010',4)}${P('M452 70V180M500 70V180M548 70V180',0,'#3a2010',3)}${lupeOben(76,'#e8c45a')}${schlossPl(n,152)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'regal';
const arten={regal:[tuerRegal,'Drehbares Bücherregal mit Zahlenschloss'],tresor:[tuerTresor,'Wandtresor mit Zahlenschloss'],schleuse:[tuerSchleuse,'Lichtschleuse mit Zahlenschloss'],feuer:[tuerFeuer,'Feuerleiter mit Zahlenschloss'],klapp:[tuerKlapp,'Dachluke mit Zahlenschloss']};
const a=arten[art]||arten.regal;
return`${TDEF}${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.detektiv={
name:"Das Detektivbüro",
symbole:["lupe","fussabdruck","fingerabdruck","hut","taschenlampe"],
symbolNamen:["Lupe","Fußabdruck","Fingerabdruck","Hut","Taschenlampe"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="52" cy="40" r="30" fill="#e8f2f6" stroke="#8a6420" stroke-width="7"/><path d="M74 62L104 84" stroke="#5a3418" stroke-width="12" stroke-linecap="round"/><use href="#sym-fingerabdruck" x="30" y="18" width="44" height="44" color="#2a4a6a"/><use href="#sym-hut" x="76" y="2" width="38" height="38" color="#5a3a2a"/></svg>`,
texte:{
einleitung:"Ihr gehört zum Detektiv-Nachwuchs im Büro der berühmten Detektivin Frieda Fuchs. Heute ist eure große Prüfung: Frieda hat alle Wege mit Zahlenschlössern verschlossen und in jedem Raum knifflige Fälle versteckt. Untersucht die Gegenstände genau. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Fälle löst, findet den Weg nach draußen!",
startKnopf:"Das Detektivbüro betreten",
hinweisGeber:"Der Spürhund Bello flüstert:",
richtig:"Fall gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Bello legt den Kopf schief … Prüft eure Spur noch einmal!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Detektei",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt versperrt. Überprüft eure Ziffern!",
zeitUmTitel:"Die Prüfungszeit ist um!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – gute Spürnasen bleiben dran! Ihr dürft weiterspielen und den Ausgang trotzdem noch finden.",
geschafft:"Prüfung bestanden!",
abschluss:"Geschafft! Ihr habt alle Fälle zum Thema <b>{titel}</b> gelöst und den Weg aus dem Detektivbüro gefunden. Frieda Fuchs ernennt euch zu echten Spürnasen!"
},
texteDu:{
einleitung:"Du gehörst zum Detektiv-Nachwuchs im Büro der berühmten Detektivin Frieda Fuchs. Heute ist deine große Prüfung: Frieda hat alle Wege mit Zahlenschlössern verschlossen und in jedem Raum knifflige Fälle versteckt. Untersuche die Gegenstände genau. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Fälle löst, findet den Weg nach draußen!",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Bello legt den Kopf schief … Prüfe deine Spur noch einmal!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt versperrt. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – gute Spürnasen bleiben dran! Du darfst weiterspielen und den Ausgang trotzdem noch finden.",
geschafft:"Prüfung bestanden!",
abschluss:"Geschafft! Du hast alle Fälle zum Thema <b>{titel}</b> gelöst und den Weg aus dem Detektivbüro gefunden. Frieda Fuchs ernennt dich zur echten Spürnase!"
},
einfach:{
name:"Das Detektivbüro",
symbolNamen:["Lupe","Fußspur","Fingerabdruck","Hut","Taschenlampe"],
texte:{
einleitung:"Ihr seid im Büro von Frieda Fuchs. Frieda ist eine berühmte Detektivin. Heute macht ihr eine Prüfung. An jedem Weg hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr habt den Weg nach draußen gefunden. Ihr seid jetzt echte Spürnasen!"
},
texteDu:{
einleitung:"Du bist im Büro von Frieda Fuchs. Frieda ist eine berühmte Detektivin. Heute machst du eine Prüfung. An jedem Weg hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du hast den Weg nach draußen gefunden. Du bist jetzt eine echte Spürnase!"
},
raeume:[
{titel:"Das Büro",intro:"Das ist das Büro von Frieda Fuchs. Draußen ist es Abend. Auf dem Tisch leuchtet eine grüne Lampe. Das Bücherregal hat ein Schloss. Hier sind die Zahlen dafür versteckt.",
objekte:[{name:"Schreibtisch",fund:"In der Schublade liegt:"},{name:"Telefon",fund:"Unter dem Telefon liegt:"},{name:"Papierkorb",fund:"Im Papierkorb liegt ein Zettel:"},{name:"Tresor",fund:"Der Tresor geht auf! Darin liegt:"},{name:"Uhr",fund:"Hinter der Uhr klebt:"}],
infoObjekte:[{name:"Zettel aus der Zeitung",fund:"Hinter dem Zettel klebt:"},{name:"Ständer mit Mantel und Hut",fund:"In der Tasche vom Mantel steckt:"},{name:"Schrank mit Schubladen",fund:"In einer Schublade liegt:"}]},
{titel:"Der Raum mit der Pinnwand",intro:"Ihr seid im Raum mit der Pinnwand. Dort hängen Fotos und Zettel. Rote Fäden verbinden sie. Findet die Zahlen für den Tresor!",introDu:"Du bist im Raum mit der Pinnwand. Dort hängen Fotos und Zettel. Rote Fäden verbinden sie. Finde die Zahlen für den Tresor!",
objekte:[{name:"Kasten mit Karten",fund:"Zwischen den Karten steckt:"},{name:"Korb von Bello",fund:"Unter dem Kissen liegt:"},{name:"Tafel",fund:"Auf der Tafel steht:"},{name:"Fernglas",fund:"Im Fernglas steckt:"},{name:"Karte von der Stadt",fund:"Hinter der Karte steckt:"}],
infoObjekte:[{name:"Kalender",fund:"Hinter dem Kalender steckt:"},{name:"Regal mit Büchern",fund:"Zwischen den Büchern steckt:"},{name:"Stapel mit Mappen",fund:"In der obersten Mappe liegt:"}]},
{titel:"Der Raum für Fotos",intro:"Das ist der Raum für Fotos. Hier leuchtet nur eine rote Lampe. An einer Leine hängen Fotos.",
objekte:[{name:"Schalen für Fotos",fund:"In einer Schale liegt:"},{name:"Kamera",fund:"In der Kamera steckt:"},{name:"Waschbecken",fund:"Neben dem Waschbecken liegt:"},{name:"Kiste mit Filmen",fund:"In der Kiste liegt:"},{name:"Brett mit Flaschen",fund:"Hinter einer Flasche steckt:"}],
infoObjekte:[{name:"Plakat mit Bildern",fund:"Auf dem Plakat steht:"},{name:"Buch mit Fotos",fund:"In dem Buch steht:"},{name:"Schrank mit Papier",fund:"Im Schrank liegt:"}]},
{titel:"Der Hinterhof",intro:"Ihr seid draußen im Hinterhof. Es ist Nacht und es ist still. Dort ist eine Leiter aus Metall. Sie ist hochgezogen und hat ein Schloss. Findet die Zahlen!",introDu:"Du bist draußen im Hinterhof. Es ist Nacht und es ist still. Dort ist eine Leiter aus Metall. Sie ist hochgezogen und hat ein Schloss. Finde die Zahlen!",
objekte:[{name:"Mülltonne",fund:"Unter dem Deckel klebt:"},{name:"Kiste mit Zeitungen",fund:"Zwischen den Zeitungen steckt:"},{name:"Altes Fahrrad",fund:"Im Korb liegt:"},{name:"Katze",fund:"Die Katze sitzt auf einem Zettel mit:"},{name:"Briefkasten",fund:"Im Briefkasten steckt:"}],
infoObjekte:[{name:"Schild mit Pfeilen",fund:"Hinter dem Schild steckt:"},{name:"Stapel mit Paketen",fund:"Auf dem Paket steht:"},{name:"Tonne mit Regenwasser",fund:"An der Tonne klebt:"}]},
{titel:"Der Dachboden",intro:"Ihr seid oben auf dem Dachboden. Der Mond scheint durch das Fenster. Öffnet das Schloss an der Luke!",introDu:"Du bist oben auf dem Dachboden. Der Mond scheint durch das Fenster. Öffne das Schloss an der Luke!",
objekte:[{name:"Koffer",fund:"Im Koffer liegt:"},{name:"Schaukelpferd",fund:"Unter dem Sattel steckt:"},{name:"Truhe",fund:"In der Truhe liegt:"},{name:"Taschenlampe",fund:"Die Lampe leuchtet auf einen Zettel:"},{name:"Spiegel",fund:"Am Spiegel klebt:"}],
infoObjekte:[{name:"Alte Karte",fund:"Hinten auf der Karte steht:"},{name:"Kiste mit Büchern",fund:"In einem Buch steht:"},{name:"Globus",fund:"Unten am Globus klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Büro",
intro:"Willkommen im Büro von Frieda Fuchs! Draußen funkeln die Lichter der Stadt, an der Decke surrt ein Ventilator. Auf dem Schreibtisch brennt eine grüne Lampe. Das große Bücherregal an der Wand wirkt seltsam – dahinter muss ein Geheimgang liegen! Irgendwo hier sind die Ziffern für sein Schloss versteckt …",
tuerX:800,tuerArt:"regal",
hintergrund:()=>`${defs('#8a5a32','#3f2614','#d8f0a0')}${R(0,0,1600,470,'#7a5634')}${streifen('rgba(255,240,200,.07)',40,14)}${fensterStadt(1150,110,220,210)}${paneel(370,'#4a2c16')}${decke('#3a2414')}${ventilator(800)}${boden()}`,
objekte:[
{name:"Schreibtisch mit grüner Lampe",x:420,boden:640,fuss:4,by:-150,zeichne:schreibtisch,fund:"In der Schreibtischschublade liegt:"},
{name:"Telefon mit Wählscheibe",x:1060,boden:580,fuss:4,by:-150,zeichne:telefon,fund:"Unter dem Telefon klemmt ein Zettel:"},
{name:"Papierkorb",x:640,boden:735,fuss:4,by:-100,zeichne:papierkorb,fund:"Ein zerknüllter Zettel im Papierkorb verrät:"},
{name:"Tresor",x:1380,boden:700,fuss:4,by:-140,zeichne:tresor,fund:"Der Tresor springt auf! Darin liegt:"},
{name:"Wanduhr",x:520,y:200,wand:true,by:-75,zeichne:wanduhr,fund:"Hinter der Wanduhr klebt:"}
],
infoObjekte:[
{name:"Zeitungsausschnitt",x:1450,y:230,wand:true,by:-82,zeichne:zeitung,fund:"Hinter dem Zeitungsausschnitt klebt:"},
{name:"Garderobe mit Mantel und Hut",x:160,boden:570,fuss:4,by:-255,zeichne:garderobe,fund:"In der Manteltasche steckt:"},
{name:"Aktenschrank",x:1250,boden:545,fuss:4,by:-195,zeichne:aktenschrank,fund:"In einer Schublade liegt:"}
]},
{titel:"Die Pinnwand-Zentrale",
intro:"Ihr steht im Ermittlungsraum. An der großen Pinnwand verbinden rote Fäden Fotos und Notizen. Hier sammelt Frieda alle Spuren zu ihren Fällen. Der Wandtresor am Ende des Raums führt weiter. Findet die Ziffern für sein Schloss!",
introDu:"Du stehst im Ermittlungsraum. An der großen Pinnwand verbinden rote Fäden Fotos und Notizen. Hier sammelt Frieda alle Spuren zu ihren Fällen. Der Wandtresor am Ende des Raums führt weiter. Finde die Ziffern für sein Schloss!",
tuerX:1350,tuerArt:"tresor",
hintergrund:()=>`${defs('#5a6470','#22282e','#e0f0ff')}${R(0,0,1600,470,'#56687a')}${paneel(390,'#34404c')}${korkwand(110,90,520,240)}${decke('#2a3440')}${roehre(400)}${roehre(1000)}${boden(150)}`,
objekte:[
{name:"Karteikasten",x:260,boden:600,fuss:4,by:-150,zeichne:karteikasten,fund:"Zwischen den Karteikarten steckt:"},
{name:"Hundekorb von Bello",x:980,boden:720,fuss:4,by:-100,zeichne:hundekorb,fund:"Unter Bellos Kissen liegt:"},
{name:"Kreidetafel",x:640,boden:560,fuss:4,by:-190,zeichne:kreidetafel,fund:"Auf der Kreidetafel steht:"},
{name:"Fernglas auf Stativ",x:1120,boden:580,fuss:4,by:-190,zeichne:fernglas,fund:"Im Fernglas steckt ein Zettel:"},
{name:"Stadtplan",x:900,y:220,wand:true,by:-85,zeichne:stadtplan,fund:"Hinter dem Stadtplan steckt:"}
],
infoObjekte:[
{name:"Kalender mit Terminen",x:1100,y:240,wand:true,by:-85,zeichne:kalender,fund:"Hinter dem Kalenderblatt steckt:"},
{name:"Regal mit Detektivbüchern",x:1530,boden:600,fuss:4,by:-210,zeichne:buecherregal,fund:"Zwischen zwei Büchern steckt:"},
{name:"Stapel mit Fallakten",x:420,boden:720,fuss:4,by:-140,zeichne:aktenstapel,fund:"In der obersten Fallakte liegt:"}
]},
{titel:"Die Dunkelkammer",
intro:"In der Dunkelkammer leuchtet nur eine rote Lampe. Hier entwickelt Frieda ihre Fotos. An der Wäscheleine hängen frische Bilder zum Trocknen. Vorsicht – helles Licht würde die Fotos verderben! Die Lichtschleuse zum Ausgang öffnet sich nur mit dem Schloss.",
tuerX:220,tuerArt:"schleuse",
hintergrund:()=>`${defs('#3a1a1a','#120606','#ff4a3a')}${R(0,0,1600,470,'#3a1c20')}${paneel(390,'#24100f')}${decke('#1a0808')}${rotlicht(760)}${waescheleine()}${boden(140)}`,
objekte:[
{name:"Entwicklerschalen",x:600,boden:600,fuss:4,by:-125,zeichne:schalen,fund:"In einer Entwicklerschale erscheint auf einem Foto:"},
{name:"Fotokamera auf Stativ",x:1180,boden:580,fuss:4,by:-200,zeichne:kamera,fund:"In der Kamera steckt:"},
{name:"Waschbecken",x:850,boden:700,fuss:4,by:-140,zeichne:waschbecken,fund:"Neben dem Waschbecken liegt:"},
{name:"Kiste mit Filmrollen",x:1450,boden:720,fuss:4,by:-130,zeichne:filmkiste,fund:"In einer Filmdose steckt:"},
{name:"Regal mit Flaschen",x:1000,y:285,wand:true,by:-85,zeichne:flaschenregal,fund:"Hinter einer Flasche steckt:"}
],
infoObjekte:[
{name:"Plakat mit Anleitung",x:1330,y:275,wand:true,by:-85,zeichne:plakat,fund:"Auf dem Plakat steht:"},
{name:"Fotoalbum auf dem Hocker",x:450,boden:730,fuss:4,by:-130,zeichne:fotoalbum,fund:"Im Fotoalbum steht:"},
{name:"Schrank mit Fotopapier",x:1500,boden:560,fuss:4,by:-180,zeichne:papierschrank,fund:"Im Schrank liegt:"}
]},
{titel:"Der Hinterhof",
intro:"Ihr tretet hinaus in den Hinterhof. Es ist Nacht, und der Mond scheint auf die Mülltonnen. Eine alte Feuerleiter führt hinauf aufs Dach, doch die unterste Leiter ist hochgezogen. Findet die Ziffern für ihr Schloss!",
introDu:"Du trittst hinaus in den Hinterhof. Es ist Nacht, und der Mond scheint auf die Mülltonnen. Eine alte Feuerleiter führt hinauf aufs Dach, doch die unterste Leiter ist hochgezogen. Finde die Ziffern für ihr Schloss!",
tuerX:1050,tuerArt:"feuer",
hintergrund:()=>`${defs('#3a3a46','#14141c','#ffd890')}${R(0,0,1600,470,'#2a2a3a')}${R(0,50,1600,420,'#4a3038')}${P(Q(11,k=>`M0 ${90+k*38}H1600`)+Q(41,k=>`M${k*40} 90V470`),0,'rgba(0,0,0,.28)',2)}${[[160,130,'#ffd890'],[320,130,'#1a1a2a'],[700,130,'#ffd890'],[1200,130,'#1a1a2a'],[1380,130,'#ffd890']].map(([x,y,f])=>R(x,y,70,100,f,'#2a1a10',5)+P(`M${x+35} ${y}V${y+100}M${x} ${y+50}H${x+70}`,0,'#2a1a10',3)).join('')}${P('M1500 50V470',0,'#6a6a74',12)}${R(0,0,1600,50,'#1a1a24')}${P('M280 470V230Q280 200 310 200H340',0,'#2a2a30',8)}${C(350,206,12,'#fff3a0')}${C(350,210,210,'url(#licht)')}${boden(140)}`,
objekte:[
{name:"Mülltonne",x:300,boden:600,fuss:4,by:-105,zeichne:muelltonne,fund:"Unter dem Deckel der Mülltonne klebt:"},
{name:"Kiste mit Zeitungen",x:600,boden:700,fuss:4,by:-80,zeichne:zeitungskiste,fund:"Zwischen den nassen Zeitungen steckt:"},
{name:"Altes Fahrrad",x:1400,boden:640,fuss:4,by:-105,zeichne:fahrrad,fund:"Im Fahrradkorb liegt:"},
{name:"Straßenkatze",x:760,boden:560,fuss:4,by:-105,zeichne:strassenkatze,fund:"Die Katze sitzt auf einem Zettel mit:"},
{name:"Briefkasten",x:520,y:300,wand:true,by:-45,zeichne:briefkasten,fund:"Im Briefkasten steckt:"}
],
infoObjekte:[{name:"Wegweiser",x:220,y:250,wand:true,by:-100,zeichne:wegweiser,fund:"Hinter dem Wegweiser steckt:"},{name:"Paketstapel",x:1520,boden:720,fuss:4,by:-90,zeichne:pakete,fund:"Auf dem obersten Paket steht:"},{name:"Regentonne",x:130,boden:690,fuss:4,by:-115,zeichne:regentonne,fund:"An der Regentonne klebt:"}]},
{titel:"Der Dachboden",
intro:"Ihr seid über die Feuerleiter auf den Dachboden geklettert. Durch das Dachfenster fällt Mondlicht auf alte Koffer und Kisten. Hier wartet Friedas letzter Fall – öffnet das Schloss an der Dachluke, dann habt ihr die Prüfung bestanden!",
introDu:"Du bist über die Feuerleiter auf den Dachboden geklettert. Durch das Dachfenster fällt Mondlicht auf alte Koffer und Kisten. Hier wartet Friedas letzter Fall – öffne das Schloss an der Dachluke, dann hast du die Prüfung bestanden!",
tuerX:600,tuerArt:"klapp",
hintergrund:()=>`${defs('#5a4030','#241810','#c8d8ff')}${dach()}${boden(160)}<path d="M1008 200H1192L1420 780H880Z" fill="#c8d8ff" opacity=".13"/>`,
objekte:[
{name:"Alte Koffer",x:300,boden:620,fuss:4,by:-130,zeichne:koffer,fund:"Im obersten Koffer liegt:"},
{name:"Schaukelpferd",x:1000,boden:640,fuss:4,by:-135,zeichne:schaukelpferd,fund:"Unter dem Sattel des Schaukelpferds steckt:"},
{name:"Truhe",x:1350,boden:720,fuss:4,by:-110,zeichne:truhe,fund:"In der Truhe liegt:"},
{name:"Kiste mit Taschenlampe",x:760,boden:735,fuss:4,by:-110,zeichne:lampenkiste,fund:"Die Taschenlampe leuchtet auf einen Zettel:"},
{name:"Alter Spiegel",x:300,y:250,wand:true,by:-90,zeichne:spiegel,fund:"Im Spiegel erscheint:"}
],
infoObjekte:[
{name:"Alte Landkarte",x:900,y:255,wand:true,by:-75,zeichne:landkarte,fund:"Auf der Rückseite der Landkarte steht:"},
{name:"Kiste mit alten Büchern",x:140,boden:720,fuss:4,by:-110,zeichne:buecherkiste,fund:"In einem alten Buch steht:"},
{name:"Alter Globus",x:1300,boden:540,fuss:4,by:-150,zeichne:globus,fund:"Am Fuß vom Globus klebt:"}
]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a7a"/><stop offset=".55" stop-color="#e8826a"/><stop offset="1" stop-color="#ffd890"/></linearGradient></defs>
   ${R(0,0,1000,600,'url(#himmel)')}${Q(14,k=>C((k*71)%1000,(k*43)%220,2,'#fff'))}${C(640,420,120,'#fff3a8','',0).replace('fill="#fff3a8"','fill="#fff3a8" opacity=".4"')}${C(640,420,64,'#fff3a8')}
   ${[[0,140,300],[120,100,250],[220,150,330],[560,120,280],[680,100,230],[790,170,300]].map(([x,w,h],k)=>P(`M${x} 600V${600-h}H${x+w}V600Z`,k%2?'#3a2a4a':'#2a1f3a')+Q(Math.floor(h/70),j=>R(x+14,600-h+20+j*64,20,28,j%2?'#ffd890':'#4a3a5a'))).join('')}
   ${P('M420 600V480H470V440H500V480H540V600Z','#2a1f3a')}${P('M450 440V400M485 440V410',0,'#2a1f3a',10)}
   <g transform="translate(640 590)">${P('M-26 0L-20 -80H20L26 0Z','#6b4a2a','#2a1608',3)}${C(0,-98,18,'#f2d0a8','#2a1608',3)}${P('M-26 -108H26L18 -134H-18Z','#5a3a2a','#2a1608',3)}${P('M26 -60L60 -92',0,'#2a1608',5)}${C(68,-100,14,'#e8f2f6','#8a6420',4)}</g>
   ${P('M250 600Q260 560 290 560Q300 540 320 556Q330 596 320 600Z','#2a1f3a')}${P('M296 548L300 534L308 548ZM316 548L320 536L326 552Z','#2a1f3a')}
   <path d="M0 0H1000V600H0Z M240 600V90H760V600Z" fill="#2a1c12" fill-rule="evenodd"/>${R(240,90,520,510,'none','#5a3a22',18)}`
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
   treffer {x,y,z,b,h,t} (Tippfläche), name (Schild), schildOben [x,y,z], glanz [x,y,z], bewege(auf) (auf läuft von 0 bis 1) */
function ausgang(k,opt){
  const sc=k.scene, a=opt.treffer;
  const treffer=new THREE.Mesh(GEO.box,basis(0,{visible:false})); treffer.scale.set(a.b,a.h,a.t); treffer.position.set(a.x,a.y,a.z); sc.add(treffer);
  /* Bis Klasse 6 (einfache Sprache) darf der Ausgang einen leichteren Namen haben */
  const leicht=typeof CONFIG!=='undefined' && (typeof CONFIG.einfacheSprache==='boolean' ? CONFIG.einfacheSprache : parseInt(CONFIG.klasse,10)<=6);
  const schild=textSprite(leicht && opt.einfach ? opt.einfach : opt.name); schild.position.set(opt.schildOben[0],opt.schildOben[1],opt.schildOben[2]); schild.visible=false; sc.add(schild);
  const tuer={ steh:opt.steh, durch:opt.durch, tief:!!opt.tief, hoch:opt.hoch||0, rutsch:opt.rutsch||null, rutschDauer:opt.rutschDauer||1.5, treffer, schild, bereit:false, offen:false };
  const g=schein(sc,'rgba(255,225,120,.9)',opt.glanz[0],opt.glanz[1],opt.glanz[2],2.2); g.visible=false;
  let auf=0;
  k.anim.push((t,dt)=>{ g.visible=tuer.bereit; if(tuer.bereit){ const s=1.8+Math.sin(t*5)*.5; g.scale.set(s,s,1); } auf+=((tuer.offen?1:0)-auf)*Math.min(1,dt*2.5); opt.bewege(auf,t); });
  return tuer;
}

/* ===================================================================
   DETEKTIVBÜRO in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei detektiv-raum<n>.js, die sich in RAEUME3D.detektiv[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.detektiv = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Grammofon','Unter der Schallplatte liegt:','Alter Plattenspieler','Beim Plattenspieler liegt:'],['Sofa','Unter dem Kissen liegt:','Sofa','Unter dem Kissen liegt:']],
  [['Diaprojektor','Im Diaprojektor steckt:','Gerät für Bilder','Im Gerät steckt:'],['Verkleidungskiste','In der Verkleidungskiste liegt:','Kiste zum Verkleiden','In der Kiste liegt:']],
  [['Großer Wecker','Hinter dem Wecker klemmt:','Großer Wecker','Beim Wecker liegt:'],['Foto-Vergrößerer','Unter dem Vergrößerer liegt:','Gerät für große Fotos','Beim Gerät liegt:']],
  [['Straßenlaterne','An der Laterne klebt:','Laterne','An der Laterne klebt:'],['Gartenbank','Unter der Gartenbank liegt:','Bank','Unter der Bank liegt:']],
  [['Nähmaschine','Unter dem Stoff liegt:','Nähmaschine','Bei der Nähmaschine liegt:'],['Teddybär','Der Teddybär hält etwas fest:','Teddy','Beim Teddy liegt:']]
];
const SZD=SZENARIEN.detektiv;
/* Texte an die 3D-Räume anpassen: Die Dunkelkammer ist heller, der Ausgang in Raum 2 ist eine Tür */
[SZD, SZD.einfach].forEach(s=>{ if(!s) return; [1,2].forEach(i=>{ const r=s.raeume[i]; if(r) ['intro','introDu'].forEach(k=>{ if(r[k]) r[k]=r[k].split('nur eine rote Lampe').join('eine rote Lampe').split('für den Tresor').join('für die große Tresortür'); }); }); });
if(SZD.einfach){ const r=SZD.einfach.raeume[2]; if(r) ['intro','introDu'].forEach(k=>{ if(r[k]) r[k]=r[k]+' Der Ausgang ist die runde Drehtür.'; }); }
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZD.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZD.einfach) SZD.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const DET = (function(){
const HOLZ=0x8a5a30, HOLZ2=0x5a3418, HOLZ3=0x3a2010, MESSING=0xd8a73a, MESSING2=0xa87c22, PAPIER=0xf4ecd8, PAPIER2=0xdccca4, STEIN=0xa8a090, STEIN2=0x7a7266,
  ROT=0x8a2a2a, BLAU=0x2a4a7a, GRUEN=0x3f6a3a, LAMPE=0x2f7a4a, LILA=0x5a4a7a, METALL=0x8a949c, METALL2=0x4e565e, GOLD=0xe8b830, SCHWARZ=0x1c160e, WEISS=0xfaf6ea;
const BUCH=[0x8a2a2a,0x2a4a7a,0x3f6a3a,0xb8862a,0x6a3a6a,0xa0522d,0x2f5f5f,0xc8b890];
/* Dielenboden (kachelbar). grund = [r,g,b] */
function dielenBild(grund,fuge){
  const G=grund||[150,104,62];
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#3a2010'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ let x=-((r*97)%256); while(x<512){ const w=256, v=Math.floor(zufall()*26)-13;
      const mal=xx=>{ g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(xx+1,r*64+1,w-3,62);
        g.fillStyle='rgba(50,25,8,.16)'; for(let k=0;k<5;k++) g.fillRect(xx+6+((k*53)%90),r*64+10+k*11,110+((k*31)%90),2); };
      mal(x); if(x<0) mal(x+512); x+=w; } } });
}
/* Tapete mit feinen Streifen. grund, streifen = CSS-Farben */
function tapeteBild(grund,streifen){
  return bild(512,512,(g)=>{ g.fillStyle=grund||'#d8c8a0'; g.fillRect(0,0,512,512);
    g.fillStyle=streifen||'rgba(140,100,50,.18)'; for(let x=0;x<512;x+=64){ g.fillRect(x+8,0,14,512); g.fillRect(x+30,0,3,512); }
    for(let i=0;i<300;i++){ g.fillStyle=i%2?'rgba(255,255,255,.07)':'rgba(60,30,10,.06)'; g.fillRect(zufall()*510,zufall()*510,3,3); } });
}
/* Mauerwerk aus Quadern (Turmzimmer, Tor). grund = [r,g,b] */
function quaderBild(grund,fuge,reihen){
  const G=grund||[150,140,124], n=reihen||8, h=512/n;
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#3c362c'; g.fillRect(0,0,512,512);
    for(let r=0;r<n;r++){ let x=(r%2)*-64; while(x<512){ const w=128, v=Math.floor(zufall()*24)-12;
      const mal=xx=>{ g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(xx+2,r*h+2,w-4,h-4);
        g.fillStyle='rgba(255,250,230,.12)'; g.fillRect(xx+2,r*h+2,w-4,4); g.fillStyle='rgba(20,15,8,.2)'; g.fillRect(xx+2,r*h+h-8,w-4,6); };
      mal(x); if(x<0) mal(x+512); x+=w; } } });
}
/* flache Bildtafel (z. B. Gemälde, Karte), Blick nach +z */
function tafel(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
function mauer(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const quer=Math.max(w,d); t.repeat.set(quer/6,h/6); t.offset.set(((w>d?x-w/2:z-d/2)/6)%1,((y-h/2)/6)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* ---------- Innenraum: Licht, Boden, Wände (hinten, links, rechts, in den Wandgruppen, blenden beim Drehen aus), Holzsockel, Zierleiste ----------
   opt: B,T,H, himmelLicht, grund, staerke, sonne, sonneStaerke, wandBild (tapeteBild/quaderBild), bodenBild, bodenWdh [x,z], leiste (Farbe),
        sockel (Höhe der Holzvertäfelung, 0 = keine; Standard 1.3), sockelFarbe, oeffnung {x,b,h} (Loch in der Rückwand für den Ausgang) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6.4;
  sc.background=new THREE.Color(0x140d08);
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xffeacc,opt.grund||0x4a3420,opt.staerke||.76));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xffe4bc,opt.sonneStaerke||.4); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const platten=opt.bodenBild||dielenBild(); platten.wrapS=platten.wrapT=THREE.RepeatWrapping; const w=opt.bodenWdh||[B/8,T/8];
  const bodenM=new THREE.MeshLambertMaterial({map:platten});
  const flaeche=(x1,x2,z1,z2)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/.5)),Math.max(1,Math.round((z2-z1)/.5))), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,((x1+B/2)+uv.getX(i)*(x2-x1))/B*w[0],((T/2-z2)+uv.getY(i)*(z2-z1))/T*w[1]);
    const m=new THREE.Mesh(geo,bodenM); m.rotation.x=-Math.PI/2; m.position.set((x1+x2)/2,0,(z1+z2)/2); m.receiveShadow=true; sc.add(m); };
  flaeche(-B/2,B/2,-T/2,T/2);
  flaeche(-B/2-18,B/2+18,T/2,T/2+26); /* Boden läuft vorn weit weiter, damit auch beim Drehen mit vollem Zoom keine dunkle Fläche entsteht */
  flaeche(-B/2-18,-B/2,-T/2,T/2); flaeche(B/2,B/2+18,-T/2,T/2); /* auch seitlich, falls die Seitenwand beim Drehen ausblendet */
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x24180e)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);
  const tex=opt.wandBild||tapeteBild(), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    mauer(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); mauer(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); if(H-o.h>.05) mauer(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else mauer(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  mauer(links,tex,.5,H,T,-B/2-.25,H/2,0); mauer(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.leiste||HOLZ2, sh=opt.sockel===undefined?1.3:opt.sockel, sf=opt.sockelFarbe||HOLZ, s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
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
/* Teppich flach auf dem Boden (Deko, kein Hindernis) */
function teppich(par,x,z,b,t,farbe,rand){
  const g=gruppe(par,x,0,z); box(g,b,.012,t,rand||MESSING2,0,.008,0); box(g,b-.5,.012,t-.5,farbe||ROT,0,.013,0); box(g,b-1.3,.012,t-1.3,rand||MESSING2,0,.017,0); box(g,b-1.55,.012,t-1.55,farbe||ROT,0,.021,0);
  g.traverse(m=>{ if(m.isMesh) m.castShadow=false; }); verschmelze(g); return g;
}
/* Viele Bücher, Blätter oder Steine als eine Instanz-Gruppe. liste: [[x,y,z,sx,sy,sz,farbe,drehY,drehX,drehZ]], geo: GEO.sph / GEO.cone / GEO.box / GEO.cyl */
function viele(par,geo,liste){
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(e[8]||0,e[7]||0,e[9]||0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.receiveShadow=true; im.frustumCulled=false; par.add(im); return im;
}
/* Steinplatten-Boden (kachelbar, reihen x reihen Platten). grund, grund2 = [r,g,b] für Schachbrettmuster */
function fliesenBild(grund,grund2,fuge,reihen){
  const A=grund||[222,214,198], B=grund2||A, n=reihen||4, h=512/n;
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#9a907c'; g.fillRect(0,0,512,512);
    for(let r=0;r<n;r++) for(let s=0;s<n;s++){ const C=(r+s)%2?B:A, v=Math.floor(zufall()*12)-6; g.fillStyle='rgb('+(C[0]+v)+','+(C[1]+v)+','+(C[2]+v)+')'; g.fillRect(s*h+1.5,r*h+1.5,h-3,h-3);
      g.strokeStyle='rgba(120,105,80,.18)'; g.lineWidth=2; g.beginPath(); g.moveTo(s*h+zufall()*h,r*h+3); g.quadraticCurveTo(s*h+zufall()*h,r*h+h/2,s*h+zufall()*h,r*h+h-3); g.stroke(); } });
}
/* Marmorsäule, Fuß bei y=0, Höhe h. Hindernis (k.kreis) und k.verdecker setzt die Funktion selbst */
function saeule(par,k,x,z,h,farbe){
  const g=gruppe(par,x,0,z), c=farbe||0xece6da;
  box(g,1.25,.28,1.25,STEIN2,0,.14,0); walze(g,.56,.2,STEIN,0,.38,0); rohr(g,.4,.47,h-.9,c,0,.48+(h-.9)/2,0);
  for(let i=0;i<10;i++){ const a=i*Math.PI/5; strich(g,[Math.cos(a)*.46,.55,Math.sin(a)*.46],[Math.cos(a)*.4,h-.5,Math.sin(a)*.4],.03,STEIN); }
  walze(g,.54,.18,STEIN,0,h-.33,0); box(g,1.3,.26,1.3,STEIN2,0,h-.11,0); verschmelze(g); k.kreis(x,z,.72); k.verdecker(g,x,z,.75); return g;
}
/* Sockel für ein Ausstellungsstück (nur Deko oder Teil eines Gegenstands), Fuß bei y=0 */
function sockel(par,x,z,b,h,farbe){ const g=gruppe(par,x,0,z); box(g,b+.24,.18,b+.24,STEIN2,0,.09,0); box(g,b,h-.3,b,farbe||0xece6da,0,.18+(h-.3)/2,0); box(g,b+.18,.14,b+.18,STEIN,0,h-.05,0); return g; }
/* Gemälde im goldenen Rahmen, Blick nach +z, Mitte bei (x,y,z). mal(g,w,h) zeichnet auf 256 x (256*h/b) */
function gemaelde(par,x,y,z,b,h,mal){
  const g=gruppe(par,x,y,z); box(g,b+.34,h+.34,.14,MESSING2,0,0,0); box(g,b+.16,h+.16,.16,MESSING,0,0,.01);
  tafel(g,bild(256,Math.max(16,Math.round(256*h/b)),mal),b,h,0,0,.1); return g;
}
/* Bücherregal voller Bücher, Fuß bei y=0, Blick nach +z, Breite b, Höhe h, Tiefe .7. Bücher stehen vorn bündig.
   Gibt die Gruppe zurück (bereits verschmolzen). Hindernis selbst setzen. Drehen über .rotation.y */
function regal(par,x,z,b,h,holz){
  const g=gruppe(par,x,0,z), c=holz||HOLZ2;
  box(g,b,h,.12,HOLZ3,0,h/2,-.29); [-1,1].forEach(s=>box(g,.16,h,.7,c,s*(b/2-.08),h/2,0));
  const faecher=Math.max(1,Math.round((h-.4)/.9)), fh=(h-.3)/faecher;
  for(let j=0;j<=faecher;j++) box(g,b,.1,.72,c,0,.2+j*fh,0);
  box(g,b,.2,.74,HOLZ3,0,.1,0); box(g,b+.16,.16,.82,c,0,h+.1,0);
  for(let j=0;j<faecher;j++){ let a=-b/2+.2; const y=.25+j*fh;
    while(a<b/2-.34){ const w=.12+zufall()*.12, hh=fh*(.55+zufall()*.3);
      if(zufall()<.07){ a+=.2; continue; }
      const m=box(g,w,hh,.46,BUCH[Math.floor(zufall()*BUCH.length)],a+w/2,y+hh/2,.06); m.castShadow=false;
      if(zufall()<.35) box(g,w+.005,.05,.47,MESSING,a+w/2,y+hh*.75,.06).castShadow=false;
      a+=w+.015; } }
  verschmelze(g); return g;
}
/* grüne Hängelampe an einer Kette von oben, Schirm in Höhe y. Mit Lichtschein. Echtes Licht dafür sparsam mit flacker(...) */
function lampe(par,x,y,z,farbe){
  const g=gruppe(par,x,y,z); walze(g,.025,.8,HOLZ3,0,.65,0).castShadow=false; ball(g,.09,MESSING,0,.34,0); ball(g,.07,MESSING2,0,1.07,0).castShadow=false;
  rohr(g,.18,.6,.42,farbe||LAMPE,0,.08,0,18,true).castShadow=false; const r=ring(g,.6,.03,MESSING,0,-.13,0); r.rotation.x=Math.PI/2; r.castShadow=false;
  ball(g,.17,basis(0xfff2b0),0,-.08,0).castShadow=false; schein(g,'rgba(255,225,140,.6)',0,-.2,0,1.8); return g;
}
/* Spürhund Bello (Dackel-Art, etwa 1,3 hoch, 2 lang, Blick nach +x). Bleibt beweglich: Schwanz wedelt, Kopf nickt, Ohren wippen.
   Rückgabe: { g, kopf, beine[4] }. Hindernis selbst setzen oder mit laeufer(k,g,...) laufen lassen und beine bewegen */
function hund(k,par,x,z,dreh,gr){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1); g.userData.lebendig=true;
  const F=0xb8743a, D=0x6e4020, H=0xf0d8b0, r=gruppe(g,0,0,0);
  ball(r,.42,F,0,.62,0,1.65,.85,.82); ball(r,.28,H,.38,.52,0,1,.9,1); ball(r,.2,D,-.25,.82,0,1.5,.4,1.2);
  const beine=[[.42,.2],[.42,-.2],[-.42,.2],[-.42,-.2]].map(([a,c])=>{ const q=gruppe(g,a,.45,c); walze(q,.09,.4,F,0,-.2,0); ball(q,.11,H,.04,-.4,0,1.25,.65,1); return q; });
  const kopf=gruppe(g,.72,1.0,0); ball(kopf,.3,F,0,0,0); ball(kopf,.19,H,.25,-.08,0,1.35,.8,.95); ball(kopf,.075,SCHWARZ,.52,-.03,0);
  [-1,1].forEach(s=>{ ball(kopf,.055,SCHWARZ,.23,.1,s*.14); ball(kopf,.018,WEISS,.265,.125,s*.15); });
  const ohren=[-1,1].map(s=>{ const o=gruppe(kopf,-.04,.14,s*.25); ball(o,.17,D,0,-.17,s*.05,.65,1.35,.4); return o; });
  ring(kopf,.21,.04,ROT,-.1,-.19,0).rotation.set(Math.PI/2,.5,0); ball(kopf,.055,GOLD,.1,-.3,0);
  const schwanz=gruppe(g,-.66,.78,0); strich(schwanz,[0,0,0],[-.26,.34,0],.065,F); ball(schwanz,.07,H,-.27,.36,0);
  verschmelze(r);
  k.anim.push(t=>{ schwanz.rotation.x=Math.sin(t*9)*.5; kopf.rotation.z=Math.sin(t*1.3)*.1; ohren.forEach((o,i)=>o.rotation.x=(i?1:-1)*Math.abs(Math.sin(t*2.1))*.14); });
  return { g, kopf, beine };
}
return { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, STEIN, STEIN2, ROT, BLAU, GRUEN, LAMPE, LILA, METALL, METALL2, GOLD, SCHWARZ, WEISS, BUCH,
  dielenBild, tapeteBild, quaderBild, fliesenBild, tafel, mauer, huelle, saeule, sockel, gemaelde, regal, lampe, hund, zahlenschloss, teppich, viele };
})();

/* Raum 1: Das Büro. Gemütliches Detektivbüro am Abend: warme Dielen, Tapete, große Fenster mit Stadtlichtern,
   Deckenventilator, Bücherregale, grüne Schreibtischlampe und ein Goldfisch. Gegenstände 1 bis 8 wie im 2D-Szenario,
   9 (Grammofon) und 10 (Sofa) sind neu.
   Ausgang: das drehbare Bücherregal in der Mitte der Rückwand dreht sich um seine Mittelachse, dahinter liegt ein beleuchteter Geheimgang. */
RAEUME3D.detektiv[0] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, STEIN, STEIN2, ROT, BLAU, GRUEN, LAMPE, METALL, METALL2, GOLD, SCHWARZ, WEISS, BUCH } = DET;
const MAHAGONI=0x9c3a1e, MAHAGONI2=0x6e2412, VORHANG=0x2f5a46, VORHANG2=0x244636, LEDER=0x8a3226, SOFA=0x2f6e72, SOFA2=0x23565c, SENF=0xd8a23a, TON=0xb8603a, BLATT=0x3f8a44, BLATT2=0x56a850;
const B=36, T=27, H=7, HINTEN=-13.5;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const hell=m=>{ m.castShadow=false; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* gemeinsames Leucht-Material (damit verschmelze es zusammenfassen kann) */
let GLUEH=null;
function lichtPunkt(sc,x,y,z,farbe,staerke,weit){ const l=new THREE.PointLight(farbe,staerke,weit,1.5); l.position.set(x,y,z); sc.add(l); return l; }
/* flache Bildtafel, die selbst leuchtet (Fenster, Gang) */
function leuchtTafel(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex})); m.position.set(x,y,z); par.add(m); return m; }

/* ---------- Bilder ---------- */
function stadtBild(versatz){
  return bild(256,240,(g)=>{ const v=g.createLinearGradient(0,0,0,240); v.addColorStop(0,'#16224a'); v.addColorStop(.6,'#3a3a72'); v.addColorStop(1,'#b86a62'); g.fillStyle=v; g.fillRect(0,0,256,240);
    g.fillStyle='#fff6d0'; for(let i=0;i<34;i++) g.fillRect((i*67+versatz*31)%252,(i*29+versatz*11)%90,2,2);
    g.beginPath(); g.arc(versatz%2?58:196,44,19,0,7); g.fill(); g.fillStyle='#222c58'; g.beginPath(); g.arc(versatz%2?66:204,39,17,0,7); g.fill();
    [[0,.46,44,'#2a2c52'],[36,.66,38,'#1c2040'],[70,.38,40,'#30305a'],[106,.58,34,'#181c38'],[138,.34,46,'#2a2c52'],[180,.7,36,'#1c2040'],[214,.48,44,'#30305a']].forEach(([x,h,w,c],i)=>{
      const hh=h*240*(.85+((i+versatz)%3)*.1), y=240-hh; g.fillStyle=c; g.fillRect(x,y,w,hh);
      if((i+versatz)%3===0){ g.beginPath(); g.moveTo(x,y); g.lineTo(x+w/2,y-20); g.lineTo(x+w,y); g.fill(); }
      for(let a=x+6;a<x+w-8;a+=11) for(let b=y+9;b<232;b+=15){ const q=(a*7+b*3+versatz*5)%11; if(q<5){ g.fillStyle=q<3?'#ffd86a':'#ffeeb0'; g.fillRect(a,b,6,8); } else if(q<7){ g.fillStyle='#48507a'; g.fillRect(a,b,6,8); } } });
  });
}
function zifferBild(){
  return bild(256,256,(g)=>{ g.fillStyle='#fbf4e0'; g.beginPath(); g.arc(128,128,127,0,7); g.fill(); g.fillStyle='#2a1a08'; g.textAlign='center'; g.textBaseline='middle'; g.font='700 30px Andika, Arial, sans-serif';
    for(let i=1;i<=12;i++){ const a=i*Math.PI/6; g.fillText(String(i),128+Math.sin(a)*96,128-Math.cos(a)*96); }
    for(let i=0;i<60;i++){ const a=i*Math.PI/30; g.fillRect(128+Math.sin(a)*118-1.5,128-Math.cos(a)*118-1.5,3,3); } });
}
function zeitungBild(){
  return bild(384,288,(g)=>{ g.fillStyle='#efe4c4'; g.fillRect(0,0,384,288); g.fillStyle='#241a10'; g.textAlign='center'; g.textBaseline='middle';
    g.font='700 40px Georgia, serif'; g.fillText('STADTBOTE',192,30); g.fillRect(16,54,352,5); g.fillRect(16,63,352,2);
    g.font='700 27px Andika, Arial, sans-serif'; g.fillText('Frieda Fuchs löst Fall!',192,88);
    g.fillStyle='#b8aa8a'; g.fillRect(20,110,166,140);
    /* Foto: ein Fuchs mit Lupe */
    g.fillStyle='#5a4a38'; g.beginPath(); g.moveTo(60,150); g.lineTo(66,122); g.lineTo(88,145); g.lineTo(112,145); g.lineTo(134,122); g.lineTo(140,150); g.lineTo(124,196); g.lineTo(100,214); g.lineTo(76,196); g.fill();
    g.fillStyle='#efe4c4'; [[84,166],[116,166]].forEach(([x,y])=>{ g.beginPath(); g.arc(x,y,6,0,7); g.fill(); }); g.fillStyle='#1a1008'; g.beginPath(); g.arc(100,204,7,0,7); g.fill();
    g.strokeStyle='#241a10'; g.lineWidth=6; g.beginPath(); g.arc(150,205,20,0,7); g.stroke(); g.beginPath(); g.moveTo(163,220); g.lineTo(178,242); g.stroke();
    g.fillStyle='#6a5c44'; for(let y=114;y<252;y+=13) g.fillRect(200,y,(y%39===0)?110:162,5); for(let y=262;y<280;y+=11) g.fillRect(20,y,344,4);
    g.strokeStyle='#c0281e'; g.lineWidth=5; g.beginPath(); g.ellipse(192,88,178,23,0,0,7); g.stroke(); });
}
function musterBild(){
  return bild(410,330,(g)=>{ g.fillStyle='#8a2a2a'; g.fillRect(0,0,410,330);
    const raute=(x,y,b,h,c)=>{ g.fillStyle=c; g.beginPath(); g.moveTo(x,y-h); g.lineTo(x+b,y); g.lineTo(x,y+h); g.lineTo(x-b,y); g.fill(); };
    g.strokeStyle='#2a4a6a'; g.lineWidth=16; g.strokeRect(20,20,370,290); g.strokeStyle='#d8b878'; g.lineWidth=4; g.strokeRect(36,36,338,258);
    for(let x=52;x<=360;x+=44){ raute(x,56,15,12,'#d8a23a'); raute(x,274,15,12,'#d8a23a'); } for(let y=96;y<=240;y+=46){ raute(56,y,12,16,'#d8a23a'); raute(354,y,12,16,'#d8a23a'); }
    raute(205,165,118,92,'#2a4a6a'); raute(205,165,90,70,'#d8b878'); raute(205,165,70,54,'#3f6a3a'); raute(205,165,40,31,'#d8a23a'); raute(205,165,16,13,'#6e2430');
    [[96,102],[314,102],[96,228],[314,228]].forEach(([x,y])=>{ raute(x,y,24,20,'#3f6a3a'); raute(x,y,10,8,'#d8b878'); }); });
}
function gangBild(){
  return bild(256,288,(g)=>{ const v=g.createRadialGradient(128,150,8,128,150,200); v.addColorStop(0,'#fffbe0'); v.addColorStop(.35,'#ffd070'); v.addColorStop(1,'#4a2a12'); g.fillStyle=v; g.fillRect(0,0,256,288);
    for(let i=0;i<9;i++){ const w=220-i*19, y=272-i*17; g.fillStyle=i%2?'#9a6a3c':'#c08c56'; g.fillRect(128-w/2,y,w,17); g.fillStyle='rgba(255,245,200,.75)'; g.fillRect(128-w/2,y,w,3); }
    g.strokeStyle='#5a3414'; g.lineWidth=9; g.beginPath(); g.moveTo(78,126); g.lineTo(78,82); g.arc(128,82,50,Math.PI,0); g.lineTo(178,126); g.stroke(); });
}

/* ---------- Ausgang: das drehbare Bücherregal ---------- */
function baueAusgang(k,sc,hinten){
  /* Geheimgang hinter der Wand */
  const gang=gruppe(hinten,0,0,0);
  box(gang,3.9,.1,4.4,0x7a5e42,0,-.045,-15.7);
  [-1,1].forEach(s=>{ box(gang,.2,4.2,3.9,0x8a6c50,s*2.0,2.1,-15.95);
    [-14.5,-15.9,-17.3].forEach(z=>{ box(gang,.12,4.2,.24,STEIN2,s*1.86,2.1,z); box(gang,.14,.18,.14,MESSING2,s*1.82,2.5,z+.5); hell(ball(gang,.12,GLUEH,s*1.76,2.74,z+.5,.8,1.3,.8)); }); });
  box(gang,1.4,.02,4.2,ROT,.85,.015,-15.65); [.2,1.5].forEach(x=>box(gang,.1,.025,4.2,MESSING,x,.018,-15.65));
  leuchtTafel(gang,gangBild(),3.9,4.2,0,2.1,-17.85);
  verschmelze(gang); gang.visible=false;

  /* fester Rahmen: dunkelgrüne Pfeiler mit Gold, Gesims, rundes Drehzeichen */
  const r=gruppe(hinten,0,0,0);
  [-1,1].forEach(s=>{ const x=s*2.17; box(r,.42,4.3,.26,VORHANG,x,2.15,-13.37); box(r,.54,.4,.32,STEIN2,x,.2,-13.35); box(r,.54,.2,.32,GOLD,x,4.24,-13.35);
    [-.09,.09].forEach(v=>box(r,.04,3.4,.03,GOLD,x+v,2.25,-13.23)); });
  box(r,4.96,.3,.34,VORHANG2,0,4.46,-13.33); box(r,5.2,.12,.44,GOLD,0,4.66,-13.29);
  /* Zeichen „dreht sich“: zwei goldene Bogenpfeile */
  liegend(walze(r,.62,.12,GOLD,0,5.25,-13.43)); liegend(walze(r,.52,.14,VORHANG2,0,5.25,-13.42));
  [0,Math.PI].forEach(a=>{ const b=ring(r,.32,.055,GOLD,0,5.25,-13.31,Math.PI*.72); b.rotation.z=a+.25;
    const e=a+.25+Math.PI*.72, p=kegel(r,.14,.24,GOLD,Math.cos(e)*.32,5.25+Math.sin(e)*.32,-13.31); p.rotation.z=e; });
  /* Wandlampen neben dem Ausgang */
  [-1,1].forEach(s=>{ const x=s*3.1; box(r,.3,.5,.06,MESSING2,x,2.9,-13.46); box(r,.08,.08,.22,MESSING,x,2.9,-13.37); rohr(r,.17,.28,.34,SENF,x,3.2,-13.26,14,true); hell(ball(r,.11,GLUEH,x,3.1,-13.26)); });
  verschmelze(r);
  [-1,1].forEach(s=>schein(hinten,'rgba(255,215,120,.5)',s*3.1,3.1,-13.05,1.2));

  /* das drehbare Regal: rotes Mahagoni mit Goldrahmen, Drehpunkt in der Mitte */
  const s=gruppe(hinten,0,0,-13.25); s.userData.lebendig=true;
  const re=DET.regal(s,0,0,3.38,3.8,MAHAGONI); re.position.y=.03; re.scale.z=.52;
  [-1,1].forEach(v=>{ box(s,.12,3.96,.08,GOLD,v*1.72,2.01,.22); [.1,3.94].forEach(y=>ball(s,.12,GOLD,v*1.69,y,.22,1,1,.55)); });
  [.1,3.95].forEach(y=>box(s,3.5,.12,.08,GOLD,0,y,.22));
  /* Rückseite (beim Drehen zu sehen) */
  box(s,3.3,3.75,.04,MAHAGONI2,0,1.95,-.18); [-.8,.8].forEach(x=>box(s,1.2,3.1,.03,MAHAGONI,x,1.95,-.2));
  /* Drehachse oben und unten */
  walze(s,.2,.07,GOLD,0,4.03,0); walze(s,.09,.2,MESSING2,0,4.1,0);
  /* Schlossplatte mit großem Zahlenschloss */
  box(s,1.62,1.46,.07,SCHWARZ,0,2.35,.25); [-.81,.81].forEach(x=>box(s,.09,1.55,.09,GOLD,x,2.35,.26)); [-.73,.73].forEach(y=>box(s,1.7,.09,.09,GOLD,0,2.35+y,.26));
  const schloss=DET.zahlenschloss(s,0,2.2,.35); schloss.scale.setScalar(1.3);
  verschmelze(s);
  const schimmer=schein(s,'rgba(255,225,120,.55)',0,2.35,.55,1.6);

  const licht=lichtPunkt(sc,0,2.9,-15.0,0xffd080,0,12);
  k.kasten(0,-13.05,4.9,.9);
  return ausgang(k,{ name:'Bücherregal', einfach:'Regal zum Drehen', steh:[1.15,-11.1], durch:[1.15,-15.7],
    treffer:{x:0,y:2.3,z:-12.85,b:4.2,h:4.5,t:.8}, schildOben:[0,4.2,-11.9], glanz:[0,2.35,-12.3],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)), w=a*a*(3-2*a);
      s.rotation.y=w*Math.PI*.49; gang.visible=auf>.02; licht.intensity=1.5*auf;
      schimmer.visible=auf<.3; const g=1.55+Math.sin(t*2.2)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Wände: Fenster, Bücherregale ---------- */
/* Fenster mit Nachtstadt, Mitte unten bei (x,1.55,z) in einer eigenen Gruppe (zum Drehen) */
function fenster(par,x,z,dreh,b,versatz){
  const f=gruppe(par,x,0,z); f.rotation.y=dreh;
  const h=3.0, y=1.55+h/2;
  leuchtTafel(f,stadtBild(versatz),b,h,0,y,.04);
  [-1,1].forEach(s=>box(f,.16,h+.2,.14,HOLZ3,s*(b/2+.04),y,.08));
  box(f,b+.3,.16,.14,HOLZ3,0,y+h/2+.04,.08); box(f,.09,h,.08,HOLZ3,0,y,.09); box(f,b,.09,.08,HOLZ3,0,y+.35,.09);
  box(f,b+.5,.14,.44,HOLZ,0,1.48,.2);
  /* Vorhangstange und zur Seite gebundene Vorhänge */
  box(f,b+1.1,.08,.1,MESSING2,0,4.8,.24); [-1,1].forEach(s=>{ ball(f,.1,GOLD,s*(b/2+.6),4.8,.24);
    [0,1].forEach(i=>walze(f,.12,3.25,i?VORHANG2:VORHANG,s*(b/2+.2+i*.17),3.15,.2)); box(f,.46,.12,.3,GOLD,s*(b/2+.28),2.5,.2); });
  return f;
}
function wandDeko(k,sc,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  fenster(h,-13.8,-13.49,0,3.0,1);
  fenster(h,7.0,-13.49,0,3.1,2);
  fenster(h,14.5,-13.49,0,2.8,4);
  /* schmales Regal in der linken Ecke */
  DET.regal(h,-16.85,-13.1,1.9,4.4,HOLZ2); k.kasten(-16.85,-13.1,2.1,.85);
  /* niedriges Bord neben dem rechten Fenster (Platz für den Goldfisch) */
  DET.regal(h,4.25,-13.08,1.2,1.2,HOLZ2); k.kasten(4.25,-13.08,1.4,.9);
  const seite=(g,v,regale,fen)=>{ const dreh=-v*Math.PI/2;
    regale.forEach(([z,b,hh])=>{ const r=DET.regal(g,v*17.58,z,b,hh,HOLZ2); r.rotation.y=dreh; k.kasten(v*17.55,z,.9,b+.2); });
    fen.forEach(([z,n])=>fenster(g,v*17.99,z,dreh,3.0,n));
  };
  seite(L,-1,[[-10.2,4.4,4.4],[2.6,3.8,4.4],[9.2,3.6,3.0]],[[-3.6,3]]);
  seite(R,1,[[-1.4,3.8,4.4],[10.0,3.8,3.0]],[[-7.4,5],[4.4,6]]);
  seite(R,1,[[-11.8,2.2,4.4]],[]);
  /* gerahmte Bilder über den niedrigen Regalen */
  [[-1,9.2],[1,10.0]].forEach(([v,z])=>{ const g=v<0?L:R, q=DET.gemaelde(g,v*17.9,4.55,z,2.0,1.3,(c,w,hh)=>{ c.fillStyle=v<0?'#6a8aa8':'#d8a060'; c.fillRect(0,0,w,hh); c.fillStyle=v<0?'#3a5a48':'#7a4a30';
    c.beginPath(); c.moveTo(0,hh); c.lineTo(w*.3,hh*.4); c.lineTo(w*.55,hh*.75); c.lineTo(w*.75,hh*.3); c.lineTo(w,hh); c.fill(); c.fillStyle='#fff0b0'; c.beginPath(); c.arc(w*.2,hh*.22,hh*.1,0,7); c.fill(); }); q.rotation.y=-v*Math.PI/2; });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Leben: Goldfisch im Glas (klein, auf dem Bord) ---------- */
function goldfisch(k,par,x,y,z){
  const g=gruppe(par,x,y,z); g.userData.lebendig=true;
  hell(walze(g,.24,.05,HOLZ3,0,.025,0)); hell(walze(g,.2,.07,0xc8a878,0,.1,0));
  [[-.1,.06],[.08,-.04]].forEach(([a,c])=>{ strich(g,[a,.12,c],[a*1.3,.4,c],.012,BLATT2); });
  const fisch=gruppe(g,0,.34,0);
  hell(ball(fisch,.1,0xff8a1a,0,0,0,1.35,.9,.7)); const fl=gruppe(fisch,-.12,0,0); const f=hell(kegel(fl,.09,.15,0xffa83a,-.07,0,0)); f.rotation.z=-Math.PI/2; f.scale.z=.025;
  [-1,1].forEach(s=>hell(ball(fisch,.018,SCHWARZ,.09,.025,s*.055)));
  const glas=new THREE.Mesh(new THREE.SphereGeometry(.38,18,12,0,Math.PI*2,Math.PI*.2,Math.PI*.72),basis(0xbfe8ff,{transparent:true,opacity:.24,depthWrite:false,side:THREE.DoubleSide})); glas.position.y=.36; g.add(glas);
  const rand=liegend(ring(g,.23,.015,0xd8f0ff,0,.67,0)); rand.castShadow=false;
  k.anim.push(t=>{ const a=t*.9; fisch.position.set(Math.cos(a)*.15,.34+Math.sin(t*1.7)*.05,Math.sin(a)*.12); fisch.rotation.y=Math.atan2(-Math.cos(a)*.12,-Math.sin(a)*.15); fl.rotation.y=Math.sin(t*9)*.5; });
}

/* ---------- Ventilator an einem Wandarm der Rückwand (Nabe bei x,y,z) ---------- */
function ventilator(k,par,x,y,z){
  const arm=gruppe(par,x,y,0), l=z-HINTEN;
  box(arm,.4,.62,.08,MESSING2,0,.5,HINTEN+.04); box(arm,.12,.12,l,MESSING,0,.5,HINTEN+l/2); strich(arm,[0,.24,HINTEN+.08],[0,.5,HINTEN+l*.55],.04,MESSING2);
  walze(arm,.06,.3,MESSING2,0,.37,z); ball(arm,.1,GOLD,0,.52,z);
  verschmelze(arm); ohneSchatten(arm);
  const g=gruppe(par,x,y,z); g.userData.lebendig=true; g.scale.setScalar(.75);
  walze(g,.34,.26,MESSING,0,.14,0); ball(g,.22,MESSING2,0,-.02,0,1,.6,1);
  const fl=gruppe(g,0,.08,0); fl.userData.lebendig=true;
  for(let i=0;i<4;i++){ const a=gruppe(fl,0,0,0); a.rotation.y=i*Math.PI/2; box(a,.34,.05,.1,MESSING2,.46,0,0); const b=box(a,.92,.04,.36,HOLZ3,1.02,0,0); b.rotation.x=.14; ball(a,.18,HOLZ3,1.47,0,0,.5,.12,1); }
  hell(ball(g,.1,GLUEH,0,-.17,0));
  verschmelze(fl); verschmelze(g); ohneSchatten(g);
  k.anim.push(t=>{ fl.rotation.y=t*2.6; });
}

/* ---------- Deko-Möbel ---------- */
function pflanze(k,g,x,z,gr){
  const p=gruppe(g,x,0,z); p.scale.setScalar(gr);
  rohr(p,.48,.32,.7,TON,0,.35,0); walze(p,.52,.12,0xc8744a,0,.73,0); walze(p,.44,.03,0x4a2e1a,0,.8,0);
  for(let i=0;i<9;i++){ const a=i*2.4, r=.3+(i%3)*.17, y=1.2+(i%4)*.22; strich(p,[0,.8,0],[Math.cos(a)*r,y,Math.sin(a)*r],.03,0x2f6a30);
    const b=ball(p,.32,i%2?BLATT:BLATT2,Math.cos(a)*r,y,Math.sin(a)*r,.55,.18,1.1); b.rotation.order='YXZ'; b.rotation.y=Math.atan2(Math.cos(a),Math.sin(a)); b.rotation.x=.5; }
  k.kreis(x,z,.82*gr);
}
function stehlampe(k,g,sc,x,z){
  walze(g,.38,.1,MESSING2,x,.05,z); walze(g,.045,2.5,MESSING,x,1.3,z); ball(g,.1,GOLD,x,1.4,z);
  rohr(g,.3,.58,.55,SENF,x,2.75,z,18,true); liegend(ring(g,.58,.035,MESSING,x,2.48,z)); hell(ball(g,.2,GLUEH,x,2.55,z));
  schein(sc,'rgba(255,215,130,.5)',x,2.5,z,2.0); k.kreis(x,z,.5);
}
/* niedriges Bücherbord im Raum */
function bord(k,g,x,z,b,dreh){
  const r=DET.regal(g,x,z,b,1.15,HOLZ); r.rotation.y=dreh||0;
  const quer=Math.abs(Math.sin(dreh||0))>.5; k.kasten(x,z,quer?.9:b+.2,quer?b+.2:.9);
}
/* runder Hocker: vier schräge Holzbeine, flaches Sitzpolster */
function hocker(k,g,x,z,c){
  [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.5, u=Math.cos(a), v=Math.sin(a); strich(g,[x+u*.52,.03,z+v*.52],[x+u*.32,.68,z+v*.32],.065,HOLZ2); ball(g,.08,MESSING,x+u*.52,.06,z+v*.52); });
  liegend(ring(g,.41,.03,HOLZ2,x,.34,z));
  walze(g,.55,.1,HOLZ,x,.71,z); walze(g,.5,.1,c,x,.81,z); ball(g,.5,c,x,.85,z,1,.18,1); ball(g,.06,GOLD,x,.95,z);
  k.kreis(x,z,.62);
}
/* liegender Bücherstapel mit zwei, drei dicken Bänden */
function stapel(k,g,x,z,n,dreh){
  for(let i=0;i<n;i++){ const q=gruppe(g,x,.11+i*.2,z); q.rotation.y=dreh+(i-1)*.25; box(q,.86-i*.08,.18,.62,BUCH[(i*3+n)%8],0,0,0); box(q,.8-i*.08,.12,.6,PAPIER,.05,0,.025); }
  k.kreis(x,z,.52);
}

/* ---------- Gegenstände (Reihenfolge = ort 1 bis 10) ---------- */
const gegenstaende=[
  { x:-5.2, z:-5.9, steh:[-4.9,-3.45], kasten:[3.8,3.0], treffer:[3.8,2.9,3.0], baue(g){ /* 1 Schreibtisch mit grüner Lampe */
      /* Schreibtischstuhl dahinter */
      const c=-.85; walze(g,.5,.08,HOLZ3,0,.06,c); walze(g,.1,.7,METALL2,0,.42,c); box(g,1.15,.22,1.0,LEDER,0,.85,c); box(g,1.15,1.25,.2,LEDER,0,1.75,c-.5); liegend(walze(g,.575,.2,LEDER,0,2.35,c-.5)).scale.z=.3;
      [-1,1].forEach(s=>{ box(g,.12,.1,.9,HOLZ,s*.66,1.22,c); box(g,.1,.4,.1,HOLZ,s*.66,1.02,c+.3); [-.25,0,.25].forEach(y=>ball(g,.045,GOLD,s*.45,1.8+y,c-.39)); });
      /* Tisch */
      const z=.5;
      box(g,3.5,.18,1.7,HOLZ,0,1.42,z); box(g,3.6,.07,1.8,HOLZ2,0,1.32,z); box(g,2.2,.02,1.05,0x2f5a3a,-.15,1.52,z+.08);
      [-1,1].forEach(s=>{ box(g,.95,1.2,1.5,HOLZ2,s*1.18,.68,z); box(g,1.05,.1,1.6,HOLZ3,s*1.18,.05,z);
        [0,1,2].forEach(i=>{ const y=.34+i*.36; box(g,.8,.3,.05,HOLZ,s*1.18,y,z+.76); box(g,.26,.06,.07,GOLD,s*1.18,y,z+.8); }); });
      box(g,1.45,.9,.08,HOLZ2,0,.82,z-.55);
      /* grüne Schreibtischlampe */
      const lx=1.05, lz=z-.2;
      walze(g,.3,.1,MESSING,lx,1.56,lz); walze(g,.045,.75,MESSING,lx,1.95,lz); ball(g,.08,GOLD,lx,2.34,lz);
      const sm=mat(0x1fa85a,{emissive:0x0d5a2c,side:THREE.DoubleSide});
      const sch=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,1.05,18,1,true,0,Math.PI),sm); sch.rotation.set(0,0,Math.PI/2); sch.position.set(lx,2.36,lz); g.add(sch);
      [-1,1].forEach(s=>{ const d=new THREE.Mesh(new THREE.CircleGeometry(.34,14,0,Math.PI),sm); d.rotation.y=Math.PI/2; d.position.set(lx+s*.525,2.36,lz); g.add(d); });
      box(g,1.1,.06,.06,GOLD,lx,2.36,lz+.34); box(g,1.1,.06,.06,GOLD,lx,2.36,lz-.34);
      const bi=walze(g,.1,.8,basis(0xfff6c0),lx,2.38,lz); bi.rotation.z=Math.PI/2; bi.castShadow=false;
      strich(g,[lx+.3,2.28,lz+.25],[lx+.3,1.98,lz+.28],.012,GOLD); ball(g,.04,GOLD,lx+.3,1.96,lz+.28);
      schein(g,'rgba(190,255,160,.45)',lx,2.15,lz+.45,1.7);
      /* Schreibzeug, Akte, Lupe, Tasse */
      const a=box(g,.82,.03,.62,PAPIER,-.2,1.55,z+.15); a.rotation.y=.12; [-.15,0,.15].forEach(v=>{ const q=box(g,.56,.012,.035,STEIN2,-.2,1.575,z+.15+v); q.rotation.y=.12; });
      box(g,.7,.1,.55,0xc89a50,-1.2,1.58,z-.25); box(g,.2,.12,.12,ROT,-1.2,1.58,z+.04);
      liegend(ring(g,.22,.045,GOLD,.45,1.57,z+.38)); walze(g,.2,.02,0xbfe4f4,.45,1.56,z+.38); strich(g,[.6,1.57,z+.52],[.9,1.57,z+.74],.055,HOLZ3);
      walze(g,.16,.28,0xd8e4ea,-1.35,1.66,z+.45); ring(g,.09,.03,0xd8e4ea,-1.54,1.66,z+.45); walze(g,.13,.02,0x5a3014,-1.35,1.805,z+.45);
      walze(g,.1,.16,SCHWARZ,.25,1.59,z-.45); strich(g,[.25,1.65,z-.45],[.45,2.15,z-.55],.018,ROT); } },
  { x:6.7, z:-6.6, steh:[6.2,-4.7], r:.95, treffer:[1.9,2.5,1.7], baue(g){ /* 2 Telefon mit Wählscheibe auf einem Tischchen */
      walze(g,.5,.1,HOLZ3,0,.05,0); walze(g,.13,1.15,HOLZ2,0,.65,0); ball(g,.22,HOLZ,0,.55,0,1,.7,1);
      walze(g,.88,.12,HOLZ,0,1.25,0); walze(g,.9,.05,HOLZ3,0,1.17,0); walze(g,.66,.02,0xe8dcc0,0,1.32,0); liegend(ring(g,.66,.025,ROT,0,1.33,0));
      const SK=0x1a1a20;
      box(g,1.12,.2,.82,SK,0,1.43,0); box(g,.9,.28,.5,SK,0,1.62,-.14); const schraeg=box(g,.9,.1,.55,SK,0,1.64,.18); schraeg.rotation.x=.6;
      /* Wählscheibe, schräg nach vorn */
      const d=gruppe(g,0,1.7,.22); d.rotation.x=-.96;
      liegend(walze(d,.31,.06,GOLD,0,0,0)); liegend(walze(d,.27,.08,WEISS,0,0,.005));
      for(let i=0;i<9;i++){ const a=1.2+i*.52; liegend(walze(d,.045,.02,SK,Math.cos(a)*.19,Math.sin(a)*.19,.05)); }
      liegend(walze(d,.085,.03,GOLD,0,0,.055)); box(d,.14,.035,.03,METALL,.2,-.18,.07);
      /* Gabel und Hörer */
      [-.32,.32].forEach(x=>{ box(g,.1,.22,.16,GOLD,x,1.85,-.16); });
      const griff=walze(g,.085,.9,SK,0,2.02,-.16); griff.rotation.z=Math.PI/2; [-1,1].forEach(s=>{ walze(g,.17,.22,SK,s*.52,1.96,-.16); walze(g,.18,.04,GOLD,s*.52,1.86,-.16); });
      /* geringeltes Kabel */
      [[-.62,1.9,-.16],[-.78,1.65,0],[-.68,1.42,.2],[-.78,1.34,.0],[-.58,1.45,-.2]].forEach((p,i,l)=>{ if(i) strich(g,l[i-1],p,.028,SK); }); } },
  { x:-8.6, z:-2.3, steh:[-7.1,-1.5], r:.85, treffer:[1.6,1.9,1.6], baue(g){ /* 3 Papierkorb aus Drahtgitter mit zerknülltem Papier */
      const M=0x9aa8b2;
      walze(g,.5,.07,METALL2,0,.04,0);
      for(let i=0;i<18;i++){ const a=i*Math.PI/9; strich(g,[Math.cos(a)*.47,.05,Math.sin(a)*.47],[Math.cos(a)*.66,1.15,Math.sin(a)*.66],.022,M); }
      [[.4,.52],[.75,.58],[1.15,.66]].forEach(([y,r],i)=>liegend(ring(g,r,i===2?.055:.025,i===2?METALL:M,0,y,0)));
      rohr(g,.57,.46,.8,0x56626c,0,.47,0,18,true);
      const knuell=new THREE.IcosahedronGeometry(1,0);
      [[0,.95,0,.3],[-.28,1.08,.16,.26],[.27,1.1,-.1,.27],[.12,1.12,.28,.21],[-.1,1.28,-.12,.2],[.62,.17,.32,.18]].forEach(([x,y,z,r],i)=>{ const q=teil(g,knuell,i%2?PAPIER2:PAPIER,x,y,z,r,r*.85,r*.95); q.rotation.set(i*1.3,i*.7,i*2.1); }); } },
  { x:11.0, z:-2.2, steh:[10.4,0], kasten:[2.0,2.0], treffer:[2.0,2.4,2.0], baue(g){ /* 4 kleiner Standtresor */
      const A=0x3f5668, D=0x263642;
      [-.65,.65].forEach(x=>[-.5,.5].forEach(z=>box(g,.28,.18,.28,SCHWARZ,x,.09,z)));
      box(g,1.7,1.75,1.4,A,0,1.05,0); box(g,1.8,.1,1.5,D,0,1.96,0); box(g,1.8,.1,1.5,D,0,.2,0);
      box(g,1.42,1.45,.08,D,0,1.06,.72); box(g,1.28,1.31,.06,0x4e6a7e,0,1.06,.76);
      [-.56,.56].forEach(x=>[.5,1.06,1.62].forEach(y=>ball(g,.045,METALL,x,y,.8)));
      [.65,1.47].forEach(y=>walze(g,.07,.26,METALL,-.72,y,.76));
      /* silbernes Drehrad */
      liegend(walze(g,.3,.09,0xd8e0e6,-.12,1.25,.83)); liegend(walze(g,.2,.13,METALL2,-.12,1.25,.85)); liegend(walze(g,.06,.18,0xd8e0e6,-.12,1.25,.87));
      for(let i=0;i<12;i++){ const a=i*Math.PI/6; const q=box(g,.025,.07,.02,SCHWARZ,-.12+Math.sin(a)*.25,1.25+Math.cos(a)*.25,.885); q.rotation.z=-a; }
      /* Griff mit drei Speichen */
      for(let i=0;i<3;i++){ const a=i*2.094+.4, x=.3+Math.cos(a)*.22, y=.72+Math.sin(a)*.22; strich(g,[.3,.72,.88],[x,y,.88],.032,0xd8e0e6); ball(g,.06,0xd8e0e6,x,y,.88); } liegend(walze(g,.09,.14,METALL,.3,.72,.84));
      box(g,.42,.16,.03,MESSING,.25,1.55,.8); } },
  { x:-5.3, z:HINTEN, wand:'hinten', steh:[-3.8,-11.5], kasten:[2.3,.9], treffer:[2.3,3.0,.9], trefferY:1.6, baue(g,k){ /* 5 Wanduhr */
      const y=3.25;
      liegend(walze(g,1.0,.3,HOLZ2,0,y,.17)); ring(g,.99,.09,HOLZ,0,y,.33); ring(g,.83,.055,GOLD,0,y,.36);
      const z=new THREE.Mesh(new THREE.CircleGeometry(.83,36),new THREE.MeshLambertMaterial({map:zifferBild(),emissive:0x2a2418})); z.position.set(0,y,.34); g.add(z);
      box(g,.62,.5,.26,HOLZ2,0,2.12,.15); box(g,.44,.34,.03,SCHWARZ,0,2.1,.29); ball(g,.16,HOLZ,0,1.82,.15,1.6,.7,.8); ball(g,.15,GOLD,0,y+1.08,.2);
      const zeiger=[[.45,.085],[.66,.055],[.7,.022]].map(([l,d],i)=>{ const q=gruppe(g,0,y,.38+i*.025); q.userData.lebendig=true; box(q,d,l,.02,i===2?0xc0281e:SCHWARZ,0,l/2-.08,0); verschmelze(q); return q; });
      liegend(walze(g,.075,.06,GOLD,0,y,.46));
      const pendel=gruppe(g,0,2.32,.33); pendel.userData.lebendig=true; box(pendel,.035,.32,.02,MESSING,0,-.16,0); liegend(walze(pendel,.11,.05,GOLD,0,-.34,0)); verschmelze(pendel);
      k.anim.push(t=>{ zeiger[0].rotation.z=-5.2-t*.004; zeiger[1].rotation.z=-1.1-t*.05; zeiger[2].rotation.z=-Math.floor(t)*Math.PI/30; pendel.rotation.z=Math.sin(t*3.14)*.25; }); } },
  { x:-9.7, z:HINTEN, wand:'hinten', steh:[-9.5,-11.5], kasten:[2.7,.9], treffer:[2.8,2.5,.8], trefferY:1.75, baue(g){ /* 6 Zeitungsausschnitt im Rahmen */
      const y=3.0;
      box(g,2.7,2.15,.1,HOLZ3,0,y,.07); box(g,2.52,1.97,.12,0xc49a5e,0,y,.08);
      const q=new THREE.Mesh(new THREE.PlaneGeometry(2.24,1.68),new THREE.MeshLambertMaterial({map:zeitungBild(),emissive:0x1c1810})); q.position.set(0,y,.16); q.rotation.z=.025; g.add(q);
      [[-1.06,.78],[1.06,.82]].forEach(([x,v])=>{ ball(g,.09,0xd0202a,x,y+v,.22); });
      box(g,.7,.18,.06,MESSING,0,y-1.17,.1); } },
  { x:-14.7, z:-4.6, steh:[-13.2,-3.7], r:.95, treffer:[2.0,4.1,1.8], baue(g){ /* 7 Garderobe mit Mantel und Hut */
      const MANTEL=0xc0965a, MANTEL2=0x9a7440;
      [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78; strich(g,[Math.cos(a)*.72,.07,Math.sin(a)*.72],[0,.45,0],.07,HOLZ2); ball(g,.1,HOLZ3,Math.cos(a)*.72,.09,Math.sin(a)*.72); });
      walze(g,.085,3.35,HOLZ2,0,1.75,0);
      [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.3, x=Math.cos(a)*.55, z=Math.sin(a)*.55; strich(g,[0,3.0,0],[x,3.25,z],.045,HOLZ); ball(g,.09,GOLD,x,3.27,z); });
      /* Hut obenauf */
      walze(g,.6,.07,0x6a4426,0,3.47,0); rohr(g,.3,.37,.4,0x6a4426,0,3.69,0); ball(g,.3,0x6a4426,0,3.88,0,1,.35,1); walze(g,.375,.12,ROT,0,3.56,0);
      /* Mantel vorn */
      const m=gruppe(g,.05,0,.32);
      rohr(m,.34,.64,1.95,MANTEL,0,1.75,0,16).scale.z=.55;
      ball(m,.4,MANTEL,0,2.72,0,1.25,.45,.6);
      [-1,1].forEach(s=>{ strich(m,[s*.42,2.7,0],[s*.7,1.65,.08],.13,MANTEL); ball(m,.13,MANTEL2,s*.7,1.63,.08);
        const k1=box(m,.2,.56,.05,MANTEL2,s*.15,2.5,.28); k1.rotation.set(-.12,0,-s*.45);
        box(m,.3,.07,.06,MANTEL2,s*.33,1.35,.31); });
      box(m,.04,1.75,.04,MANTEL2,0,1.65,.31); [2.1,1.75,1.4,1.05].forEach((y,i)=>ball(m,.055,HOLZ3,.13,y,.27+i*.03));
      box(m,.98,.13,.64,0x5a3a1e,0,1.78,0); box(m,.2,.17,.06,GOLD,0,1.78,.34);
      /* roter Schal */
      strich(g,[-.2,3.05,.15],[-.5,2.5,.45],.09,ROT); strich(g,[-.5,2.5,.45],[-.55,1.9,.55],.09,ROT); box(g,.2,.08,.1,PAPIER,-.55,1.88,.55); } },
  { x:11.0, z:HINTEN, wand:'hinten', steh:[10.9,-11.2], kasten:[2.9,2.8], treffer:[2.9,3.6,2.6], baue(g){ /* 8 Aktenschrank aus Metall */
      const A=0x7c9484, D=0x55695c, z=.5;
      box(g,2.6,3.05,.9,A,0,1.62,z); box(g,2.72,.12,1.0,D,0,3.2,z); box(g,2.66,.16,.94,D,0,.08,z);
      [-.65,.65].forEach(x=>[0,1,2,3].forEach(i=>{ const y=.55+i*.72, offen=(x>0&&i===2)?.28:0;
        if(offen){ box(g,1.12,.5,offen,D,x,y-.04,z+.45+offen/2); [-.3,0,.3].forEach((v,j)=>box(g,.28,.22,.05,j===1?0xf6e58a:0xd8b878,x+v,y+.3,z+.5+j*.06)); }
        box(g,1.18,.64,.06,0x8ca696,x,y,z+.46+offen); box(g,.42,.18,.03,PAPIER,x,y+.12,z+.5+offen); box(g,.26,.035,.02,STEIN2,x,y+.12,z+.52+offen);
        box(g,.44,.07,.09,0xd8e0e6,x,y-.14,z+.52+offen); }));
      /* Ordner obenauf */
      [[-.9,ROT],[-.66,BLAU],[-.42,SENF]].forEach(([x,c])=>{ box(g,.2,.68,.55,c,x,3.6,z); box(g,.12,.2,.02,PAPIER,x,3.7,z+.285); });
      box(g,.7,.4,.6,0xc89a60,.7,3.46,z); box(g,.76,.08,.66,0xa87c44,.7,3.68,z); } },
  { x:-9.0, z:5.2, steh:[-6.9,4.6], r:1.3, treffer:[2.5,3.9,2.4], baue(g,k){ /* 9 Grammofon mit großem Trichter und drehender Platte */
      [-.65,.65].forEach(x=>[-.55,.55].forEach(z=>{ walze(g,.09,.5,HOLZ3,x,.25,z); ball(g,.12,GOLD,x,.07,z,1,.6,1); }));
      box(g,1.6,.75,1.4,HOLZ2,0,.84,0); box(g,1.76,.1,1.56,HOLZ,0,1.24,0); [-.37,.37].forEach(x=>{ box(g,.62,.52,.05,HOLZ,x,.84,.71); ball(g,.05,GOLD,x*.2,.84,.76); });
      box(g,1.4,.34,1.2,MAHAGONI,0,1.46,0); box(g,1.48,.06,1.28,GOLD,0,1.65,0);
      /* drehende Schallplatte */
      const p=gruppe(g,.12,1.72,.1); p.userData.lebendig=true;
      walze(p,.56,.05,0x16121a,0,0,0); [.46,.34].forEach(r=>liegend(ring(p,r,.008,0x4a4454,0,.03,0))); walze(p,.19,.02,0xd8362a,0,.035,0); box(p,.12,.012,.06,PAPIER,.1,.05,0); walze(p,.025,.08,0xd8e0e6,0,.07,0); box(p,.3,.008,.025,0x8a8498,.3,.03,.22); verschmelze(p);
      /* Tonarm und Kurbel */
      walze(g,.07,.24,MESSING,.62,1.8,-.4); strich(g,[.62,1.92,-.4],[.42,1.84,.22],.03,0xd8e0e6); box(g,.12,.07,.17,SCHWARZ,.41,1.81,.28);
      strich(g,[.7,1.46,.15],[.98,1.46,.15],.035,MESSING); strich(g,[.98,1.46,.15],[.98,1.2,.15],.035,MESSING); strich(g,[.98,1.2,.15],[1.14,1.2,.15],.06,HOLZ3);
      /* Trichter */
      strich(g,[-.45,1.65,-.4],[-.45,2.25,-.45],.07,MESSING); ball(g,.11,GOLD,-.45,2.27,-.45); strich(g,[-.45,1.95,-.4],[.35,1.9,.1],.035,MESSING2);
      const prof=[[.08,0],[.12,.3],[.18,.6],[.3,.85],[.52,1.05],[.78,1.18],[.9,1.2]].map(([r,y])=>new THREE.Vector2(r,y));
      const tr=gruppe(g,-.45,2.28,-.45); tr.quaternion.setFromUnitVectors(V(0,1,0),V(.3,.5,.82).normalize());
      const au=new THREE.Mesh(new THREE.LatheGeometry(prof,12),mat(0xe0aa34,{side:THREE.DoubleSide,emissive:0x3a2606})); au.castShadow=true; tr.add(au);
      liegend(ring(tr,.9,.045,0xf4cc5a,0,1.2,0)); liegend(ring(tr,.2,.03,MESSING2,0,.64,0));
      /* kleine Noten steigen auf */
      const noten=[0,1,2].map(i=>{ const n=gruppe(g,0,0,0); n.userData.lebendig=true; const m=basis([0xffe27a,0x9ae0ff,0xffb0c8][i],{transparent:true,opacity:.9,depthWrite:false});
        hell(ball(n,.09,m,0,0,0,1.2,.85,.5)); hell(box(n,.03,.32,.03,m,.09,.15,0)); const f=hell(box(n,.15,.05,.03,m,.15,.29,0)); f.rotation.z=-.5; return {n,m}; });
      k.anim.push(t=>{ p.rotation.y=-t*2.4; noten.forEach(({n,m},i)=>{ const u=(t*.28+i/3)%1; n.position.set(.1+u*.5+Math.sin(u*9+i*2)*.18,3.15+u*.8,.55+u*.25); m.opacity=Math.sin(u*Math.PI)*.9; }); }); } },
  { x:9.0, z:5.0, steh:[8.9,7.3], kasten:[4.85,2.1], treffer:[4.8,2.4,2.0], baue(g){ /* 10 gemütliches Sofa */
      [-1.95,1.95].forEach(x=>[-.7,.7].forEach(z=>{ walze(g,.12,.26,HOLZ3,x,.13,z); }));
      box(g,4.2,.45,1.75,SOFA2,0,.48,0); box(g,4.2,1.35,.45,SOFA2,0,1.3,-.68);
      const rl=walze(g,.25,4.2,SOFA,0,1.98,-.68); rl.rotation.z=Math.PI/2;
      [-1.2,0,1.2].forEach(x=>{ box(g,1.15,.3,1.25,SOFA,x,.85,.2); ball(g,.58,SOFA,x,.98,.2,.98,.2,1.05); box(g,1.12,.85,.24,SOFA,x,1.45,-.4); ball(g,.06,GOLD,x,1.5,-.27); });
      [-1,1].forEach(s=>{ box(g,.46,.85,1.75,SOFA2,s*2.0,1.0,0); const a=walze(g,.29,1.77,SOFA,s*2.02,1.45,0); a.rotation.x=Math.PI/2; liegend(walze(g,.19,.04,SOFA2,s*2.02,1.45,.89)); ball(g,.07,GOLD,s*2.02,1.45,.93); });
      [[-1.38,SENF,.22],[1.38,0xc0482e,-.2]].forEach(([x,c,d])=>{ const q=gruppe(g,x,1.37,-.14); q.rotation.set(-.2,0,d); box(q,.78,.66,.18,c,0,0,0); ball(q,.36,c,0,0,0,1,.85,.42); ball(q,.07,PAPIER,0,0,.16); });
      } }
];

function baue(k){
  const sc=k.scene;
  GLUEH=basis(0xfff0a8);
  const h=DET.huelle(k,{ B,T,H, himmelLicht:0xffe2c0, grund:0x4a3020, staerke:.72, sonne:0xffd8a8, sonneStaerke:.36,
    wandBild:DET.tapeteBild('#a87a50','rgba(255,225,170,.17)'), bodenBild:DET.dielenBild([164,108,62]), leiste:HOLZ2, sockel:1.3, sockelFarbe:0x74492a, oeffnung:{x:0,b:3.74,h:4.05} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc,hinten);
  wandDeko(k,sc,hinten,links,rechts);
  goldfisch(k,hinten,4.25,1.38,-12.95);

  /* ---------- Teppiche (nicht überlappend) ---------- */
  DET.teppich(sc,0,-.6,5.4,4.6,ROT,0xd8b878);
  const muster=new THREE.Mesh(new THREE.PlaneGeometry(4.1,3.3),new THREE.MeshLambertMaterial({map:musterBild()})); muster.rotation.x=-Math.PI/2; muster.position.set(0,.03,-.6); muster.receiveShadow=true; sc.add(muster);
  DET.teppich(sc,0,-8.4,3.0,6.4,0x6e2430,GOLD);
  DET.teppich(sc,-5.2,-5.8,5.6,4.2,GRUEN,0xd8b878);
  DET.teppich(sc,-8.9,5.3,4.8,4.4,BLAU,0xd8b878);
  DET.teppich(sc,9.0,5.5,6.4,4.6,SENF,0x6e2430);
  DET.teppich(sc,0,8.8,7.0,3.4,BLAU,MESSING2);

  /* ---------- Möbel am Rand ---------- */
  const m=gruppe(sc,0,0,0);
  stehlampe(k,m,sc,16.5,-12.2);
  stehlampe(k,m,sc,13.0,3.8);
  stehlampe(k,m,sc,-13.6,6.6);
  bord(k,m,-9.4,11.9,3.4,0); bord(k,m,9.4,11.9,3.4,Math.PI); bord(k,m,0,12.3,3.6,Math.PI);
  bord(k,m,-13.6,.4,2.6,Math.PI/2); bord(k,m,14.4,8.6,2.8,-Math.PI/2);
  pflanze(k,m,-15.4,11.6,1.15); pflanze(k,m,15.4,11.6,1.15); pflanze(k,m,-4.7,12.1,.8); pflanze(k,m,4.7,12.1,.8);
  pflanze(k,m,15.8,-4.8,1.0); pflanze(k,m,-15.6,-11.3,.9); pflanze(k,m,-3.8,.3,.7); pflanze(k,m,3.8,.3,.7);
  hocker(k,m,-4.9,8.8,LEDER); hocker(k,m,4.9,8.7,VORHANG); hocker(k,m,12.9,6.3,0xc0482e);
  stapel(k,m,-12.5,10.2,3,.4); stapel(k,m,12.4,10.0,2,-.5); stapel(k,m,-12.4,-10.6,3,-.2); stapel(k,m,13.9,-9.0,2,.6);
  /* Kleinigkeiten auf den Borden: Kerzenleuchter ohne Flamme, Schalen, Kästchen */
  [[-10.4,11.9,BLAU],[10.4,11.9,0x8a3a6a],[.9,12.3,VORHANG]].forEach(([x,z,c])=>{ rohr(m,.28,.14,.45,c,x,1.5,z); liegend(ring(m,.28,.03,GOLD,x,1.72,z)); });
  [[-8.7,11.9],[8.7,11.9],[-.8,12.3]].forEach(([x,z],i)=>{ box(m,.7,.3,.45,i%2?HOLZ3:MAHAGONI,x,1.42,z); box(m,.74,.07,.49,GOLD,x,1.59,z); });
  /* Einlegestreifen im Boden vorn und an den Seiten */
  const einlage=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ box(einlage,.16,.01,12.4,HOLZ3,v*16.55,.006,6.4); box(einlage,.07,.01,12.4,MESSING2,v*16.3,.006,6.4); });
  box(einlage,33.1,.01,.16,HOLZ3,0,.007,13.15); box(einlage,32.6,.01,.07,MESSING2,0,.007,12.98);
  /* Rahmen aus dunklem Holz um den mittleren Teppich */
  [-1,1].forEach(v=>{ box(einlage,.12,.01,6.6,HOLZ3,v*4.75,.006,-.4); box(einlage,9.62,.01,.12,HOLZ3,0,.007,-.4+v*3.3); });
  ohneSchatten(einlage); verschmelze(einlage);
  verschmelze(m);

  ventilator(k,hinten,4.3,3.85,-12.0);

  /* ---------- Licht (zusammen mit dem Geheimgang 6 Punktlichter) ---------- */
  lichtPunkt(sc,-4.1,2.6,-4.9,0xd8ffb0,.6,8);
  lichtPunkt(sc,0,3.6,-11.6,0xffd490,.4,9);
  lichtPunkt(sc,12.6,2.8,3.8,0xffc878,.5,10);
  lichtPunkt(sc,-13.2,2.8,6.4,0xffc878,.45,10);
  lichtPunkt(sc,15.4,2.8,-11.2,0xffc878,.4,10);

  return { tuer, start:[0,-3] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-15.4,-8.2],[-12.0,-7.4],[-7.6,-9.6],[-3.6,-10.2],[3.2,-9.8],[8.6,-9.4],[14.2,-11.0],[14.4,-.4],[15.2,2.0],[15.8,6.4],[12.2,12.2],[6.6,10.6],[2.2,10.4],[-2.4,10.8],[-7.0,10.0],[-15.6,8.0],[-11.6,2.0],[-3.2,2.8],[3.6,-1.8],[8.2,-.4]];

return { titel:'Das Büro', breite:36, tiefe:27, oben:['24,14,10','58,38,28','100,70,48'], baue, gegenstaende, verstecke };
})();

/* Raum 2: Die Pinnwand-Zentrale. Ermittlungsraum aus rotem Backstein und Petrol mit kleiner Deko-Pinnwand an der Rückwand,
   Nachtfenstern, Messinglampen, Schreibtischen und Spürhund Bello, der seine Runde läuft.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Diaprojektor) und 10 (Verkleidungskiste) sind neu.
   Ausgang: der Wandtresor in der Mitte der Rückwand, die große runde Tresortür dreht ihr Rad und schwingt nach links auf. */
RAEUME3D.detektiv[1] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, SCHWARZ, WEISS, GOLD, ROT, BLAU, GRUEN, METALL, METALL2 } = DET;
const PETROL=0x1f6468, PETROL2=0x123c42, PETROL3=0x2f8084, STAHL=0xb8c2c6, STAHL2=0x74848a, KORK=0xc4925a, LEDER=0x7a4428;
const B=36, T=27, H=6.4, HINTEN=-13.5;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
/* flache runde Scheibe mit Blick nach +z */
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
const quer=(p,r,l,c,x,y,z)=>{ const m=walze(p,r,l,c,x,y,z); m.rotation.z=Math.PI/2; return m; };
const flachring=(p,r,d,c,x,y,z)=>liegend(ring(p,r,d,c,x,y,z));
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* grobe Kugeln als eine Instanz-Gruppe: liste [x,y,z,sx,sy,sz,farbe] */
const kugeln=(par,liste)=>DET.viele(par,new THREE.SphereGeometry(1,8,6),liste);
/* Gruppe für Wandschmuck: Blick vom Raum aus ist +z, x läuft an der Wand entlang */
function anWand(w,seite,x){
  const g=gruppe(w,seite==='links'?-B/2:B/2,0,x); g.rotation.y=seite==='links'?Math.PI/2:-Math.PI/2; return g;
}

/* ---------- Bilder ---------- */
function fotoBild(art){
  return bild(128,128,(g)=>{ g.fillStyle=['#9ac4d8','#d8c89a','#a8c89a','#c8b0c8','#b8c4d0'][art%5]; g.fillRect(0,0,128,128);
    g.fillStyle='#4a5a5a';
    if(art%5===0){ g.fillRect(24,60,80,60); g.beginPath(); g.moveTo(14,62); g.lineTo(64,24); g.lineTo(114,62); g.fill(); g.fillStyle='#f4d870'; g.fillRect(42,76,16,16); g.fillRect(72,76,16,16); }
    else if(art%5===1){ g.fillStyle='#6a4a2a'; g.beginPath(); g.ellipse(64,86,26,22,0,0,7); g.fill(); [[28,54],[50,34],[80,34],[102,54]].forEach(p=>{ g.beginPath(); g.ellipse(p[0],p[1],11,14,0,0,7); g.fill(); }); }
    else if(art%5===2){ g.fillRect(58,70,12,50); g.fillStyle='#3a7a44'; g.beginPath(); g.arc(64,56,38,0,7); g.fill(); }
    else if(art%5===3){ g.beginPath(); g.arc(64,52,26,0,7); g.fill(); g.beginPath(); g.ellipse(64,128,50,42,0,0,7); g.fill(); g.fillStyle='#2a2a34'; g.fillRect(28,28,72,10); g.fillRect(44,8,40,24); }
    else { g.lineWidth=9; g.strokeStyle='#2a3a44'; g.beginPath(); g.arc(36,88,24,0,7); g.stroke(); g.beginPath(); g.arc(94,88,24,0,7); g.stroke(); g.beginPath(); g.moveTo(36,88); g.lineTo(58,52); g.lineTo(92,52); g.lineTo(94,88); g.moveTo(58,52); g.lineTo(66,88); g.lineTo(92,52); g.stroke(); } });
}
function fensterBild(){
  return bild(256,320,(g)=>{ const v=g.createLinearGradient(0,0,0,320); v.addColorStop(0,'#16284a'); v.addColorStop(1,'#3a5a80'); g.fillStyle=v; g.fillRect(0,0,256,320);
    g.fillStyle='#fff3c0'; g.beginPath(); g.arc(188,62,24,0,7); g.fill();
    for(let i=0;i<30;i++){ g.fillRect((i*73)%252,(i*41)%130,3,3); }
    [[0,170,54],[50,130,48],[96,200,46],[140,150,56],[194,185,62]].forEach(([x,y,b],n)=>{ g.fillStyle=n%2?'#18202e':'#222c3c'; g.fillRect(x,y,b,320-y);
      for(let r=y+14;r<306;r+=26) for(let s=x+8;s<x+b-10;s+=18){ g.fillStyle=(r+s+n)%3?'#f4cf70':'#33405a'; g.fillRect(s,r,9,13); } }); });
}
function posterBild(art){
  return bild(256,320,(g)=>{ g.fillStyle=['#ecdfbc','#d8e4d8','#e8d4c0'][art%3]; g.fillRect(0,0,256,320);
    g.strokeStyle='#1f4a52'; g.fillStyle='#1f4a52';
    if(art%3===0){ g.lineWidth=7; for(let i=1;i<8;i++){ g.beginPath(); g.ellipse(128,170,i*13,i*17,0,.3*(i%3),5.6+.1*i); g.stroke(); } }
    else if(art%3===1){ g.lineWidth=18; g.beginPath(); g.arc(108,140,62,0,7); g.stroke(); g.lineWidth=28; g.beginPath(); g.moveTo(154,188); g.lineTo(214,262); g.stroke(); }
    else { [[80,110],[168,190],[90,260]].forEach(([x,y])=>{ g.beginPath(); g.ellipse(x,y+16,22,18,0,0,7); g.fill(); [[-26,-8],[-10,-22],[10,-22],[26,-8]].forEach(p=>{ g.beginPath(); g.arc(x+p[0],y+p[1],8,0,7); g.fill(); }); }); }
    g.fillRect(48,26,160,14); g.fillRect(72,48,112,8); });
}

/* ---------- Ausgang: der Wandtresor ---------- */
const TR=1.92, LR=1.78, MY=1.55; /* Radius Tür, Radius Loch, Höhe der Mitte */
/* Kreisbogen, unten flach abgeschnitten in Höhe y0, von rechts unten über oben nach links unten */
function bogenPunkte(r,y0,n){
  const a=Math.asin((y0-MY)/r), p=[];
  for(let i=0;i<=n;i++){ const w=a+(Math.PI-2*a)*i/n; p.push([Math.cos(w)*r,MY+Math.sin(w)*r]); }
  return p;
}
function platte(par,punkte,dicke,farbe,x,y,z){
  const s=new THREE.Shape(); punkte.forEach((p,i)=>i?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1]));
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(s,{depth:dicke,bevelEnabled:false}),mat(farbe)); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
function baueAusgang(k,sc,hinten){
  /* beleuchteter Gang dahinter */
  const gang=gruppe(hinten,0,0,0);
  box(gang,4.2,.1,4.2,0xd8c08a,0,-.045,-15.55);
  box(gang,4.4,.2,4,0xb89a64,0,3.9,-15.75);
  [-1,1].forEach(s=>{ box(gang,.2,3.95,4,0xf0deb0,s*2.1,1.97,-15.75);
    [-14.6,-15.8,-17].forEach(z=>{ box(gang,.08,3.7,.16,0x9a7a48,s*1.98,1.85,z); ball(gang,.15,basis(0xfffbe0),s*1.93,2.8,z+.5); }); });
  box(gang,1.9,.02,3.9,ROT,0,.012,-15.6);
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,140,6,128,140,175); v.addColorStop(0,'#ffffff'); v.addColorStop(.4,'#fff2bc'); v.addColorStop(1,'#d89c48'); g.fillStyle=v; g.fillRect(0,0,256,256);
    g.strokeStyle='rgba(150,100,40,.5)'; g.lineWidth=5; for(let i=0;i<5;i++){ g.beginPath(); g.moveTo(70-i*14,256-i*2); g.lineTo(186+i*14,256-i*2); g.stroke(); } });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4.1,3.9),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,1.95,-17.7); gang.add(e);
  verschmelze(gang); ohneSchatten(gang); gang.visible=false;
  /* Stahlfront mit rundem Loch, unten offen bis zum Boden (keine Stufe) */
  const f=gruppe(hinten,0,0,0);
  const innen=bogenPunkte(LR,0,40);
  platte(f,[[-2.45,0],[-2.45,4.25],[2.45,4.25],[2.45,0],...innen],.24,PETROL2,0,0,HINTEN);
  /* Messingring um das Loch */
  const rand=bogenPunkte(LR+.14,.05,30); for(let i=0;i<rand.length-1;i++) strich(f,[rand[i][0],rand[i][1],HINTEN+.27],[rand[i+1][0],rand[i+1][1],HINTEN+.27],.09,MESSING);
  /* seitliche Pfosten und Sturz mit Nieten */
  [-1,1].forEach(s=>{ box(f,.42,4.4,.5,PETROL,s*2.55,2.2,HINTEN+.25); box(f,.56,.34,.62,PETROL2,s*2.55,.17,HINTEN+.31);
    [.8,1.65,2.5,3.35,4.1].forEach(y=>ball(f,.085,GOLD,s*2.55,y,HINTEN+.52,1,1,.6)); });
  box(f,5.6,.42,.58,PETROL,0,4.46,HINTEN+.29); box(f,5.8,.12,.68,MESSING,0,4.73,HINTEN+.34);
  [-2,-1,0,1,2].forEach(x=>ball(f,.085,GOLD,x,4.46,HINTEN+.6,1,1,.6));
  /* zwei Scharnierblöcke links */
  [.75,2.35].forEach(y=>{ walze(f,.14,.5,STAHL2,-2.12,y,HINTEN+.5); box(f,.4,.34,.2,STAHL2,-2.3,y,HINTEN+.5); });
  verschmelze(f); ohneSchatten(f);
  /* die runde Tür: Drehpunkt am Scharnier links */
  const AN=-2.12, tuerG=gruppe(hinten,AN,0,HINTEN+.5); tuerG.userData.lebendig=true;
  const t=gruppe(tuerG,-AN,0,0);
  platte(t,bogenPunkte(TR,.04,44),.3,STAHL2,0,0,-.2);
  platte(t,bogenPunkte(TR-.17,.16,44),.06,STAHL,0,0,.09);
  const kreis=bogenPunkte(TR-.46,.36,34); for(let i=0;i<kreis.length-1;i++) strich(t,[kreis[i][0],kreis[i][1],.16],[kreis[i+1][0],kreis[i+1][1],.16],.045,STAHL2);
  for(let i=0;i<14;i++){ const w=-.5+i*(Math.PI+1)/13; ball(t,.08,PETROL2,Math.cos(w)*(TR-.31),MY+Math.sin(w)*(TR-.31),.17,1,1,.7); }
  [.75,2.35].forEach(y=>box(t,1.0,.24,.12,STAHL2,-1.45,y,.17));
  verschmelze(t); ohneSchatten(t);
  /* Drehrad */
  const rad=gruppe(t,0,1.2,.38); rad.userData.lebendig=true;
  ring(rad,.62,.085,MESSING,0,0,0); for(let i=0;i<6;i++){ const a=i*Math.PI/3; strich(rad,[0,0,0],[Math.cos(a)*.78,Math.sin(a)*.78,0],.055,MESSING2); ball(rad,.11,GOLD,Math.cos(a)*.8,Math.sin(a)*.8,0); }
  scheibe(rad,.2,.2,GOLD,0,0,.02); ball(rad,.09,PETROL2,0,0,.14);
  verschmelze(rad); ohneSchatten(rad);
  scheibe(t,.12,.3,STAHL2,0,1.2,.24);
  /* goldenes Zahlenschloss oben auf der Tür */
  const platteS=gruppe(t,0,2.62,.2); box(platteS,1.5,1.0,.08,PETROL2,0,.06,0); box(platteS,1.38,.9,.09,0xfbf0cc,0,.06,.01);
  const schloss=DET.zahlenschloss(platteS,0,-.03,.17); schloss.scale.setScalar(1.15);
  verschmelze(platteS); ohneSchatten(platteS);
  const schimmer=schein(hinten,'rgba(255,220,110,.5)',0,2.65,HINTEN+1.25,1.6);
  const licht=new THREE.PointLight(0xffdf90,0,12,1.5); licht.position.set(0,2.8,-14.8); sc.add(licht);
  /* Schwelle mit Pfeil, flach am Boden */
  const schwelle=gruppe(sc,0,0,-11.9);
  box(schwelle,3.0,.016,1.5,PETROL2,0,.01,0); box(schwelle,2.7,.02,1.2,PETROL3,0,.012,0); [-1,1].forEach(s=>{ const q=box(schwelle,.75,.026,.12,GOLD,s*.24,.016,0); q.rotation.y=s*.65; });
  verschmelze(schwelle); ohneSchatten(schwelle);
  k.kasten(0,-12.9,5.7,1.0); /* geschlossene Tür: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  const weich=a=>{ a=Math.max(0,Math.min(1,a)); return a*a*(3-2*a); };
  /* steh liegt außerhalb des Schwenkbereichs der Tür (Abstand zum Scharnier größer als der Türdurchmesser) */
  return ausgang(k,{ name:'Wandtresor', einfach:'Große Tresortür', steh:[0,-8.4], durch:[0,-15.6],
    treffer:{x:0,y:2.2,z:-12.8,b:5.2,h:4.4,t:.8}, schildOben:[0,4.3,-12.1], glanz:[0,2.65,-12.2],
    bewege:(auf,tz)=>{ rad.rotation.z=-weich(auf/.45)*Math.PI*2.2; tuerG.rotation.y=-weich((auf-.22)/.7)*1.75;
      schimmer.visible=auf<.05; gang.visible=auf>.12; licht.intensity=1.8*auf; const g=1.5+Math.sin(tz*2.4)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Deko-Pinnwand: klein, ruhig und hoch an der Rückwand, damit sie nicht wie ein Gegenstand wirkt ---------- */
function pinnwand(h){
  const g=gruppe(h,-5.6,3.55,HINTEN);
  box(g,3.3,1.7,.08,HOLZ3,0,0,.04); box(g,3.12,1.52,.1,0xa27c54,0,0,.05);
  const fotos=[0,2,4].map(fotoBild), pk=[];
  /* [x,y,Art (Zahl = Foto, sonst Notiz),Drehung] */
  [[-1.05,.2,0,.06],[-.35,-.28,'n',-.06],[.35,.22,1,-.04],[1.08,-.2,2,.07]].forEach(([x,y,a,d])=>{
    const q=gruppe(g,x,y,.11); q.rotation.z=d;
    if(typeof a==='number'){ box(q,.5,.56,.02,PAPIER2,0,0,0); DET.tafel(q,fotos[a],.41,.4,0,.04,.015); }
    else { box(q,.5,.44,.02,PAPIER2,0,0,0); [.07,-.03,-.13].forEach((v,j)=>box(q,.34-j*.07,.022,.025,0x6a625a,-.02*j,v,.004)); }
    pk.push([x,y+(typeof a==='number'?.24:.17),.15]); });
  [[0,1],[1,2],[2,3]].forEach(([a,b])=>strich(g,pk[a],pk[b],.011,0xa83a34));
  pk.forEach(p=>{ ball(g,.05,0xa83a34,p[0],p[1],p[2]+.01); });
  verschmelze(g); ohneSchatten(g);
}

/* ---------- Wanddeko und Möbelstücke ---------- */
function fenster(par,x,tex,b){
  b=b||2.6;
  box(par,b+.34,3.0,.12,HOLZ2,x,3.15,.06); DET.tafel(par,tex,b,2.7,x,3.15,.13);
  box(par,.1,2.7,.06,HOLZ2,x,3.15,.16); box(par,b,.1,.06,HOLZ2,x,2.85,.16); box(par,b+.54,.16,.4,HOLZ,x,1.64,.2);
  /* Jalousie halb herabgelassen */
  for(let i=0;i<4;i++) box(par,b,.09,.06,PAPIER2,x,4.44-i*.17,.2);
  strich(par,[x+b*.38,4.45,.24],[x+b*.38,3.4,.24],.012,PAPIER); ball(par,.06,MESSING,x+b*.38,3.37,.24);
}
function poster(par,x,y,tex){ box(par,.78,.96,.08,PETROL2,x,y,.04); DET.tafel(par,tex,.68,.86,x,y,.09); }
function wandlampe(par,x,y){
  box(par,.24,.5,.08,MESSING2,x,y-.1,.05); strich(par,[x,y-.2,.08],[x,y,.4],.045,MESSING);
  rohr(par,.16,.34,.34,0x2f8a60,x,y+.14,.4,16,true); ball(par,.13,basis(0xfff2b0),x,y+.08,.4); schein(par,'rgba(255,220,130,.5)',x,y+.02,.55,1.4);
}
function heizkoerper(par,x,z){
  for(let i=0;i<9;i++){ const a=x-1.04+i*.26; box(par,.17,.9,.3,0xd8d0bc,a,.65,z); ball(par,.1,0xd8d0bc,a,1.1,z,.85,.7,1.5); }
  [.34,.96].forEach(y=>quer(par,.05,2.4,STAHL2,x,y,z)); [-1,1].forEach(s=>walze(par,.05,.34,STAHL2,x+s*1.04,.17,z));
}
function pflanze(k,par,x,z,gr){
  const g=gruppe(par,x,0,z); g.scale.setScalar(gr||1);
  rohr(g,.48,.33,.66,0xc06a3c,0,.33,0); walze(g,.53,.12,0x9a4e2a,0,.66,0);
  const K=[]; for(let i=0;i<13;i++){ const a=i*2.4, d=.18+(i%3)*.16, y=1.0+((i*5)%13)*.07; strich(g,[0,.66,0],[Math.cos(a)*d,y,Math.sin(a)*d],.025,0x2f6a38); K.push([Math.cos(a)*d,y+.06,Math.sin(a)*d,.25,.17,.25,i%2?0x3f8a48:0x62a856]); }
  kugeln(g,K); k.kreis(x,z,.56*(gr||1));
}
/* Schreibtisch mit Messinglampe, Telefon und Tasse, Blick nach +z */
function schreibtisch(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,3.0,.16,1.4,HOLZ,0,1.08,0); box(g,2.86,.012,1.26,PETROL,0,1.166,0);
  [-1,1].forEach(s=>{ box(g,.8,1.0,1.2,HOLZ2,s*1.02,.5,0); [.3,.68].forEach(y=>{ box(g,.62,.3,.05,HOLZ,s*1.02,y,.62); ball(g,.05,MESSING,s*1.02,y,.67); }); });
  box(g,1.3,.55,.08,HOLZ2,0,.72,-.55);
  walze(g,.24,.07,MESSING2,-1.0,1.21,-.2); strich(g,[-1.0,1.2,-.2],[-1.0,1.85,-.2],.035,MESSING); rohr(g,.14,.38,.3,0x2f8a60,-.85,1.9,-.1,16,true); strich(g,[-1.0,1.85,-.2],[-.85,2.02,-.1],.03,MESSING); ball(g,.1,basis(0xfff2b0),-.85,1.84,-.1);
  /* Wählscheiben-Telefon */
  box(g,.62,.22,.46,0xb83a30,.85,1.28,.0); scheibe(g,.15,.05,PAPIER,.85,1.4,.12).rotation.x=.7; quer(g,.07,.66,0x8a2820,.85,1.5,-.1); [-1,1].forEach(s=>ball(g,.13,0x8a2820,.85+s*.33,1.46,-.1,1,.8,1));
  walze(g,.14,.28,0xf0c040,.15,1.31,.2); ring(g,.09,.025,0xf0c040,.31,1.31,.2);
  box(g,.55,.02,.42,PAPIER,-.35,1.18,.18).rotation.y=.2;
  return g;
}
function sessel(par,x,z,dreh,breite){
  const g=gruppe(par,x,0,z), b=breite||1.8; g.rotation.y=dreh||0;
  [-1,1].forEach(s=>[-.5,.5].forEach(v=>walze(g,.08,.24,HOLZ3,s*(b/2-.2),.12,v)));
  box(g,b,.4,1.3,LEDER,0,.43,0); box(g,b,1.05,.34,LEDER,0,1.0,-.52); quer(g,.19,b,0x8a5030,0,1.54,-.54);
  [-1,1].forEach(s=>{ box(g,.28,.46,1.3,LEDER,s*(b/2-.1),.85,0); const a=walze(g,.19,1.3,0x8a5030,s*(b/2-.1),1.1,0); a.rotation.x=Math.PI/2; });
  const n=Math.max(1,Math.round(b/1.4)); for(let i=0;i<n;i++){ const x2=-b/2+.3+(i+.5)*(b-.6)/n; box(g,(b-.6)/n-.06,.2,.92,0x9a5c38,x2,.72,.08); for(let j=-1;j<=1;j++) ball(g,.045,MESSING,x2+j*.3,1.2,-.34); }
  return g;
}
function standuhr(k,par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  box(g,1.2,.3,.8,HOLZ3,0,.15,0); box(g,.94,2.5,.6,HOLZ2,0,1.5,0); box(g,1.2,1.1,.74,HOLZ2,0,3.2,0); box(g,1.36,.16,.86,HOLZ,0,3.83,0); ball(g,.15,MESSING,0,4.05,0);
  scheibe(g,.44,.06,MESSING,0,3.22,.38); scheibe(g,.37,.08,WEISS,0,3.22,.39); for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(g,.025,SCHWARZ,Math.sin(a)*.3,3.22+Math.cos(a)*.3,.44); }
  strich(g,[0,3.22,.46],[0,3.46,.46],.022,SCHWARZ); strich(g,[0,3.22,.46],[.2,3.13,.46],.028,SCHWARZ);
  box(g,.62,1.7,.04,0x2a1c10,0,1.5,.31);
  const p=gruppe(g,0,2.3,.36); p.userData.lebendig=true; strich(p,[0,0,0],[0,-1.15,0],.025,MESSING); scheibe(p,.19,.06,GOLD,0,-1.2,0);
  verschmelze(p); k.anim.push(t=>{ p.rotation.z=Math.sin(t*2.6)*.17; });
}

function wandSchmuck(k,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), nacht=fensterBild(), P=[0,1].map(posterBild);
  pinnwand(hinten);
  /* Rückwand: Fenster, Wandlampen, Uhr */
  const hf=gruppe(h,0,0,HINTEN); fenster(hf,-14.4,nacht); fenster(hf,14.4,nacht);
  [-9.35,3.55,8.6].forEach(x=>wandlampe(hf,x,3.45));
  /* Messingrohr oben entlang */
  [[-18,-2.9],[2.9,18]].forEach(([a,b])=>quer(hf,.09,b-a,MESSING2,(a+b)/2,5.55,.2));
  for(let x=-16;x<=16;x+=4) if(Math.abs(x)>3) box(hf,.14,.34,.28,PETROL2,x,5.55,.12);
  scheibe(hf,.62,.14,PETROL2,0,5.55,.1); scheibe(hf,.5,.18,PAPIER,0,5.55,.11); strich(hf,[0,5.55,.22],[0,5.9,.22],.028,SCHWARZ); strich(hf,[0,5.55,.22],[.27,5.46,.22],.035,SCHWARZ);
  /* Seitenwände */
  const L=anWand(links,'links',0), R=anWand(rechts,'rechts',0);
  /* in diesen Gruppen läuft x entlang der Wand: links x = -z, rechts x = z */
  fenster(L,-6.4,nacht,2.4); fenster(R,4.2,nacht,3.0); fenster(R,-3.6,nacht,2.4);
  /* nur zwei kleine Bilder, hoch aufgehängt */
  poster(L,-2.6,4.55,P[0]); poster(R,9.6,4.55,P[1]);
  [8.6,-.2,-12].forEach(x=>wandlampe(L,x,3.5)); [-7.8,7.4,12].forEach(x=>wandlampe(R,x,3.5));
  [L,R].forEach(w=>{ quer(w,.09,27,MESSING2,0,5.55,.2); for(let x=-12;x<=12;x+=4) box(w,.14,.34,.28,PETROL2,x,5.55,.12); });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* langer niedriger Pflanzkasten aus Petrol-Holz mit Blattwerk und Blüten, Hindernis inklusive */
function pflanzkasten(k,par,x,z,b){
  const g=gruppe(par,x,0,z);
  box(g,b,.6,.9,PETROL,0,.36,0); box(g,b+.14,.12,1.04,MESSING2,0,.68,0); [-1,1].forEach(s=>[-.35,.35].forEach(v=>box(g,.2,.14,.2,HOLZ3,s*(b/2-.2),.07,v)));
  const K=[], n=Math.round(b*7); for(let i=0;i<n;i++){ const a=-b/2+.25+(i+.5)*(b-.5)/n; K.push([a,.84+(i%3)*.09,((i*5)%7-3)*.09,.25,.2,.25,i%2?0x3f8a48:0x62a856]); if(i%3===1) K.push([a,1.12+(i%2)*.06,((i*3)%5-2)*.1,.1,.09,.1,[0xf0a030,0xf4f0e0,0xe06080][i%9%3]]); }
  kugeln(g,K); k.kasten(x,z,b+.15,1.05);
}
/* Sitzbank mit Polster, ohne Lehne */
function bank(k,par,x,z,b){
  const g=gruppe(par,x,0,z); [-1,1].forEach(s=>[-.35,.35].forEach(v=>walze(g,.09,.5,HOLZ2,s*(b/2-.25),.25,v)));
  box(g,b,.16,1.0,HOLZ,0,.56,0); box(g,b-.2,.2,.84,LEDER,0,.72,0); for(let a=-b/2+.6;a<b/2-.4;a+=.7) ball(g,.05,MESSING,a,.83,0);
  k.kasten(x,z,b,1.0);
}
/* Windrose als Einlegearbeit, ganz flach im Boden */
function windrose(par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,1.75,.01,0xc8a058,0,.024,0); walze(g,1.6,.012,PETROL2,0,.026,0);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4, l=i%2?.9:1.55, q=gruppe(g,0,.034+(i%2?0:.002),0); q.rotation.y=a; const s=kegel(q,i%2?.17:.27,l,i%2?0xc8a058:PAPIER2,0,0,-l/2); s.rotation.x=-Math.PI/2; s.scale.z=.008; }
  walze(g,.26,.016,0x8a3a34,0,.04,0);
  ohneSchatten(g); verschmelze(g);
}

/* ---------- Möbel an den Rändern (kein Aussehen wie ein Gegenstand) ---------- */
function moebel(k,sc,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0), d=gruppe(sc,0,0,0);
  heizkoerper(h,-14.4,-13.0); k.kasten(-14.4,-13.0,2.5,.6); heizkoerper(h,14.4,-13.0); k.kasten(14.4,-13.0,2.5,.6);
  pflanze(k,h,-10.7,-12.6); pflanze(k,h,3.55,-12.7,.8); pflanze(k,h,16.9,-12.4,1.1);
  /* linke Wand: Standuhr, Schreibtisch, Pflanze */
  standuhr(k,L,-17.4,-10.2,Math.PI/2); k.kasten(-17.4,-10.2,.95,1.4);
  schreibtisch(L,-17.1,1.9,Math.PI/2); k.kasten(-17.1,1.9,1.5,3.1);
  pflanze(k,L,-17.0,-6.4,1.05); pflanze(k,L,-17.0,8.6);
  /* rechte Wand: Schreibtisch, Sessel, Globus */
  schreibtisch(R,17.1,-7.8,-Math.PI/2); k.kasten(17.1,-7.8,1.5,3.1);
  sessel(R,16.8,-.6,-Math.PI/2,2.0); k.kasten(16.8,-.6,1.5,2.1);
  pflanze(k,R,17.0,8.8);
  /* vorderer Rand: Ledersofa, Teetisch, Sessel, Globus, Pflanzen, alles niedrig */
  sessel(d,-8.6,12.2,Math.PI,4.2); k.kasten(-8.6,12.2,4.3,1.5);
  const tt=gruppe(d,0,0,12.2); box(tt,3.4,.14,1.2,HOLZ,0,.72,0); [-1.5,1.5].forEach(x=>[-.45,.45].forEach(z=>walze(tt,.09,.66,HOLZ2,x,.33,z))); box(tt,3.0,.08,.9,HOLZ2,0,.26,0);
  ball(tt,.34,PETROL3,-.8,1.08,0,1,.9,1); walze(tt,.14,.08,MESSING,-.8,1.42,0); ball(tt,.07,MESSING,-.8,1.5,0); strich(tt,[-.52,1.0,0],[-.22,1.32,0],.06,PETROL3); ring(tt,.2,.045,PETROL3,-1.14,1.1,0);
  [[.15,.2],[.75,-.15]].forEach(([x,z])=>{ walze(tt,.2,.03,WEISS,x,.805,z); walze(tt,.12,.2,WEISS,x,.92,z); ring(tt,.07,.02,WEISS,x+.14,.92,z); });
  walze(tt,.32,.06,STAHL,1.35,.82,0); [0,1,2,3,4].forEach(i=>walze(tt,.11,.06,i%2?0xd89a50:0x9a5a30,1.35+Math.cos(i*1.26)*.15,.88,Math.sin(i*1.26)*.15));
  k.kasten(0,12.2,3.5,1.3);
  const gl=gruppe(d,9.4,0,12.0); gl.scale.setScalar(.75); walze(gl,.5,.12,HOLZ3,0,.06,0); walze(gl,.09,.6,HOLZ2,0,.4,0); ball(gl,.62,0x4a8ac8,0,1.36,0);
  [[.2,.35,.42,.3],[-.35,.05,.4,.26],[.3,-.25,.45,.2],[-.1,.45,.3,.2],[.5,.1,.1,.26]].forEach(([x,y,z,r])=>{ const v=V(x,y,z).normalize().multiplyScalar(.52); ball(gl,r,0x72a858,v.x,1.36+v.y,v.z); });
  ring(gl,.72,.035,MESSING,0,1.36,0).rotation.z=.4; k.kreis(9.4,12.0,.6);
  pflanze(k,d,-14.6,12.1,1.1); pflanze(k,d,-3.9,12.3,.85); pflanze(k,d,4.2,12.3,.85); pflanze(k,d,16.6,12.0,1.1);
  sessel(d,13.2,12.1,Math.PI+.15,1.9); k.kasten(13.2,12.1,2.2,1.7);
  [h,L,R,d].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

function baue(k){
  const sc=k.scene;
  const h=DET.huelle(k,{ B,T,H, himmelLicht:0xfff0dc, grund:0x3a4a4c, staerke:.78, sonne:0xffe2bc, sonneStaerke:.36,
    wandBild:DET.quaderBild([158,86,66],'#c4ac94',16), bodenBild:DET.dielenBild([136,100,72]), leiste:PETROL2, sockelFarbe:PETROL, sockel:1.15,
    oeffnung:{x:0,b:4.0,h:3.75} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  sc.background=new THREE.Color(0x0e1a1c);
  const tuer=baueAusgang(k,sc,hinten);
  wandSchmuck(k,hinten,links,rechts);
  moebel(k,sc,hinten,links,rechts);
  /* Teppiche und niedrige Deko vorn */
  DET.teppich(sc,9.2,4.6,5.2,4.0,0x2f5a66,0xa88a54);
  DET.teppich(sc,-6.8,6.8,5.2,4.0,0x8a3a34,0xc8a058);
  const vorn=gruppe(sc,0,0,0);
  pflanzkasten(k,vorn,8.8,7.6,3.6); pflanzkasten(k,vorn,-6.2,9.6,3.6); bank(k,vorn,9.4,2.7,3.0); bank(k,vorn,-6.8,3.4,3.0);
  verschmelze(vorn); ohneSchatten(vorn);
  windrose(sc,.3,2.2);
  DET.teppich(sc,0,-5.4,3.6,4.2,PETROL,0xc8a058);
  /* flache Fransen an beiden Enden und gewebte Ecken */
  const fr=gruppe(sc,0,0,-5.4);
  [-1,1].forEach(s=>{ for(let i=0;i<15;i++) box(fr,.07,.012,.32,PAPIER2,-1.68+i*.24,.008,s*2.25);
    [-1,1].forEach(v=>{ box(fr,.26,.01,.26,0xc8a058,v*.8,.03,s*1.1).rotation.y=Math.PI/4; }); });
  ohneSchatten(fr); verschmelze(fr);
  DET.teppich(sc,.4,6.6,5.4,4.6,0x8a3a34,0xc8a058);
  DET.teppich(sc,-11.4,-1.8,5.0,4.2,0x2f5a66,0xa88a54);
  /* Licht */
  [[-9,5,-5,.5],[9,5,-4,.5],[0,5.5,6,.32]].forEach(([x,y,z,s])=>{ const l=new THREE.PointLight(0xffd9a0,s,16,1.5); l.position.set(x,y,z); sc.add(l); });

  /* ---------- Leben: Spürhund Bello läuft seine Runde ---------- */
  const bello=DET.hund(k,sc,BELLOWEG[0][0],BELLOWEG[0][1],0,.95);
  k.anim.push(t=>{ bello.beine.forEach((b,i)=>b.rotation.z=Math.sin(t*8+(i%3?3.14:0))*.5); });
  laeufer(k,bello.g,BELLOWEG,1.7,0,8);

  return { tuer, start:[0,-5.5] };
}
const BELLOWEG=[[2.6,-8.0],[6.8,-6.4],[7.4,-.8],[5.4,2.6],[2.4,3.8],[2.2,8.4],[-1.8,8.6],[-3.2,3.2],[-8.4,.6],[-8.2,-4.8],[-4.2,-7.4],[-1.4,-8.2]];

/* Verstecke für den Edelstein */
const verstecke=[[-15.6,-11.4],[-8,-10.8],[-4.6,-8],[4.2,-9],[8.4,-11.6],[13.4,-10.4],[-15.2,-5.8],[-9,-4.2],[6.4,-3.6],[14.6,-3.2],
  [-14.6,1.6],[-2.8,.8],[9.4,1.4],[15.4,7.4],[-15.6,8.4],[-9,8.6],[-1,10.4],[3.4,5.2],[10.4,9.4],[-9.6,2.8]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-11.6, z:-8, dreh:.15, steh:[-10.9,-5.7], kasten:[3.4,2.0], treffer:[3.2,2.4,1.7], baue(g){ /* 1 Karteikasten: zwei lange offene Holzkästen voller Karten auf einem Tisch */
      [-1.35,1.35].forEach(x=>[-.6,.6].forEach(z=>box(g,.18,.9,.18,HOLZ3,x,.45,z)));
      box(g,3.1,.16,1.6,HOLZ2,0,.96,0); box(g,2.8,.08,1.3,HOLZ3,0,.34,0);
      [-.74,.74].forEach((x,n)=>{ const F=0xd49a50;
        box(g,1.3,.08,1.36,F,x,1.08,0); [-1,1].forEach(s=>box(g,.1,.5,1.36,F,x+s*.62,1.35,0)); box(g,1.34,.5,.1,F,x,1.35,.66); box(g,1.34,.78,.1,F,x,1.49,-.66);
        box(g,.62,.28,.04,MESSING,x,1.38,.72); box(g,.5,.18,.045,WEISS,x,1.38,.725); ball(g,.07,MESSING,x,1.17,.74);
        for(let i=0;i<8;i++){ const z=-.5+i*.14, hoch=.62+(i%3)*.04; const c=box(g,1.08,hoch,.03,i%2?PAPIER:WEISS,x,1.12+hoch/2,z); c.rotation.x=-.1;
          box(g,.28,.14,.035,[ROT,0xf0c030,PETROL3,0x5aa050][(i+n)%4],x-.36+((i+n*2)%4)*.24,1.17+hoch,z-.03).rotation.x=-.1; } });
      /* eine Karte liegt vorn quer */
      const q=box(g,.55,.36,.03,0xf8e888,.05,1.78,.16); q.rotation.z=.3; } },
  { x:3.5, z:-3.0, steh:[3.4,-.55], r:1.6, treffer:[2.9,1.5,2.4], baue(g){ /* 2 Bellos Hundekorb: leer, mit Kissen, Knochen-Spielzeug und Ball */
      const W=0xb8803c, W2=0x8a5a28;
      const boden=walze(g,1,.16,W2,0,.08,0); boden.scale.set(1.4,.16,1.1);
      [[.2,W],[.4,W2],[.6,W],[.78,0xd09a50]].forEach(([y,c],i)=>{ const r=ring(g,1.22,i===3?.17:.14,c,0,y,0,i===3?Math.PI*1.6:Math.PI*2); r.rotation.x=Math.PI/2; r.scale.set(1.13,.9,1); if(i===3) r.rotation.z=Math.PI*.7; });
      for(let i=0;i<22;i++){ const a=i*Math.PI/11; if(Math.sin(a)>.82) continue; strich(g,[Math.cos(a)*1.46,.1,Math.sin(a)*1.17],[Math.cos(a)*1.46,.76,Math.sin(a)*1.17],.04,W2); }
      /* dickes rotes Kissen */
      ball(g,1.08,0xc83a3a,0,.34,0,1.12,.28,.84); flachring(g,.55,.035,0xf0c860,0,.62,0).scale.set(1.15,.82,1); ball(g,.1,0xf0c860,0,.63,0,1,.5,1);
      /* Knochen-Spielzeug aus hellem Gummi mit blauem Band */
      const kn=gruppe(g,.35,.78,.28); kn.rotation.y=.5; quer(kn,.11,.76,WEISS,0,0,0); [-1,1].forEach(a=>[-1,1].forEach(b=>ball(kn,.17,WEISS,a*.42,0,b*.12))); quer(kn,.125,.2,0x2a8ad0,0,0,0);
      ball(g,.24,0xf0c020,-.55,.78,-.15); flachring(g,.243,.03,0x2a8ad0,-.55,.78,-.15);
      /* Namensschild vorn */
      box(g,1.1,.42,.08,PETROL2,0,.45,1.32); const t=bild(256,96,(c)=>{ c.fillStyle='#f4ecd8'; c.fillRect(0,0,256,96); c.fillStyle='#2a1a08'; c.font='700 60px Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('BELLO',128,52); });
      DET.tafel(g,t,.96,.32,0,.45,1.37); } },
  { x:-5.6, z:-3.9, dreh:.2, steh:[-5.4,-1.6], kasten:[3.7,1.9], treffer:[3.5,3.5,1.1], baue(g){ /* 3 Kreidetafel auf Holzgestell */
      [-1.6,1.6].forEach(x=>{ strich(g,[x,0,.55],[x,3.35,0],.085,HOLZ); strich(g,[x,0,-.55],[x,3.35,0],.085,HOLZ); box(g,.22,.12,1.3,HOLZ2,x,.06,0); ball(g,.13,MESSING,x,3.42,0); });
      quer(g,.06,3.2,HOLZ2,0,.62,0);
      box(g,3.2,2.2,.12,HOLZ,0,2.15,.27);
      const t=bild(512,340,(c)=>{ c.fillStyle='#24503c'; c.fillRect(0,0,512,340); c.fillStyle='rgba(255,255,255,.07)'; for(let i=0;i<40;i++) c.fillRect((i*97)%470,(i*53)%320,50,7);
        c.strokeStyle='#f4f0e0'; c.fillStyle='#f4f0e0'; c.lineWidth=6; c.lineCap='round';
        [[70,260,-.5],[120,205,-.2],[150,285,-.3]].forEach(([x,y,d])=>{ c.save(); c.translate(x,y); c.rotate(d); c.beginPath(); c.ellipse(0,0,14,24,0,0,7); c.fill(); c.beginPath(); c.ellipse(0,36,11,10,0,0,7); c.fill(); c.restore(); });
        c.beginPath(); c.moveTo(170,180); c.quadraticCurveTo(250,90,330,160); c.stroke(); c.beginPath(); c.moveTo(300,155); c.lineTo(332,162); c.lineTo(328,128); c.stroke();
        c.beginPath(); c.arc(400,200,48,0,7); c.stroke(); c.beginPath(); c.moveTo(435,236); c.lineTo(472,278); c.stroke();
        c.font='700 60px Arial, sans-serif'; c.fillText('?',382,220); c.fillStyle='#f8e070'; c.font='700 52px Arial, sans-serif'; c.fillText('SPUREN',40,66); c.fillRect(40,84,230,5);
        c.fillStyle='#f4f0e0'; [112,138].forEach((y,i)=>c.fillRect(330,y-60,130-i*40,6)); });
      DET.tafel(g,t,2.92,1.94,0,2.15,.34);
      box(g,3.0,.1,.34,HOLZ2,0,1.0,.44); [[-.9,WEISS],[-.45,0xf8e070],[-.05,0xf0a0a0]].forEach(([x,c])=>quer(g,.05,.32,c,x,1.1,.48));
      box(g,.55,.18,.2,0x4a3a6a,.9,1.14,.46); box(g,.55,.07,.2,PAPIER2,.9,1.26,.46); } },
  { x:13.6, z:4.0, steh:[11.9,5.4], r:1.0, treffer:[2.2,3.2,1.9], baue(g){ /* 4 großes Fernglas auf Stativ, schaut zum rechten Fenster */
      [0,1,2].forEach(i=>{ const a=i*Math.PI*2/3+.5; strich(g,[0,1.9,0],[Math.cos(a)*.88,.04,Math.sin(a)*.88],.065,HOLZ); ball(g,.1,MESSING,Math.cos(a)*.88,.08,Math.sin(a)*.88); strich(g,[0,.85,0],[Math.cos(a)*.48,.85,Math.sin(a)*.48],.025,MESSING2); });
      walze(g,.2,.18,MESSING,0,1.94,0); walze(g,.09,.4,MESSING2,0,2.15,0); box(g,.5,.14,.42,METALL2,0,2.34,0);
      const f=gruppe(g,0,2.66,0); f.rotation.y=-.45; f.rotation.z=.1;
      [-.37,.37].forEach(z=>{ quer(f,.28,.95,0x24282e,.25,0,z); quer(f,.34,.45,0x24282e,.8,0,z); quer(f,.36,.12,MESSING,1.02,0,z); quer(f,.29,.02,0x8ad0f0,1.09,0,z); ball(f,.07,WEISS,1.105,.1,z-.08,.3,1,1);
        quer(f,.22,.4,0x24282e,-.42,0,z); quer(f,.16,.24,METALL2,-.72,0,z); quer(f,.2,.1,SCHWARZ,-.87,0,z); quer(f,.29,.12,MESSING,-.2,0,z); });
      box(f,.5,.14,.4,MESSING2,.15,.06,0); box(f,.2,.2,.3,MESSING2,-.35,0,0); quer(f,.12,.24,MESSING,.15,.25,0).rotation.set(Math.PI/2,0,0); } },
  { x:6.3, z:HINTEN, wand:'hinten', steh:[6.3,-11.4], kasten:[3.8,.8], treffer:[3.6,2.7,.8], trefferY:1.1, baue(g){ /* 5 Stadtplan als große Rollkarte mit Straßen, Fluss und Stecknadeln */
      const t=bild(512,352,(c)=>{ c.fillStyle='#f4ecd0'; c.fillRect(0,0,512,352);
        for(let r=0;r<5;r++) for(let s=0;s<7;s++){ c.fillStyle=['#e0b890','#d8a8a0','#e8cc90'][(r*3+s)%3]; c.fillRect(14+s*72,14+r*67,54,48); }
        c.fillStyle='#86c070'; c.fillRect(86,81,126,115); c.fillRect(374,215,126,48); c.fillStyle='#4a9050'; for(let i=0;i<14;i++){ c.beginPath(); c.arc(100+(i*37)%100,94+(i*29)%90,8,0,7); c.fill(); }
        c.strokeStyle='#4a9ad8'; c.lineWidth=34; c.beginPath(); c.moveTo(-10,260); c.bezierCurveTo(150,180,280,340,530,90); c.stroke();
        c.strokeStyle='#ffffff'; c.lineWidth=11; c.beginPath(); c.moveTo(0,74); c.lineTo(512,74); c.moveTo(0,208); c.lineTo(512,208); c.moveTo(222,0); c.lineTo(222,352); c.moveTo(366,0); c.lineTo(366,352); c.moveTo(0,352); c.lineTo(222,74); c.stroke();
        c.fillStyle='#2a4a5a'; c.beginPath(); c.moveTo(470,24); c.lineTo(484,64); c.lineTo(470,54); c.lineTo(456,64); c.fill(); c.strokeStyle='#2a4a5a'; c.lineWidth=8; c.strokeRect(4,4,504,344); });
      box(g,3.3,2.35,.07,PAPIER2,0,2.45,.07); DET.tafel(g,t,3.18,2.2,0,2.45,.12);
      [3.68,1.22].forEach(y=>{ quer(g,.11,3.55,HOLZ2,0,y,.15); [-1.85,1.85].forEach(x=>ball(g,.17,MESSING,x,y,.15)); });
      [-1.2,1.2].forEach(x=>strich(g,[x,3.7,.12],[0,4.12,.08],.018,HOLZ3)); ball(g,.08,MESSING,0,4.12,.1);
      /* große Stecknadeln */
      [[-1.0,2.0,0xd0202a],[.25,3.0,0x2a5ad0],[1.05,2.2,0xf0b010]].forEach(([x,y,c])=>{ strich(g,[x,y,.12],[x,y+.08,.3],.016,STAHL); ball(g,.12,c,x,y+.1,.33); }); } },
  { x:10.8, z:HINTEN, wand:'hinten', steh:[10.8,-11.4], kasten:[2.4,.7], treffer:[2.3,2.8,.8], trefferY:1.1, baue(g){ /* 6 großer Wandkalender mit Terminen */
      box(g,2.2,2.7,.1,PETROL2,0,2.45,.05);
      const t=bild(384,480,(c)=>{ c.fillStyle='#fbf6e8'; c.fillRect(0,0,384,480); c.fillStyle='#c8383a'; c.fillRect(0,0,384,108); c.fillStyle='#fff'; c.font='700 54px Arial, sans-serif'; c.textAlign='center'; c.fillText('TERMINE',192,76);
        c.textAlign='center'; c.font='700 24px Arial, sans-serif';
        for(let i=0;i<30;i++){ const x=18+(i%6)*60, y=128+Math.floor(i/6)*68; c.fillStyle=i===8?'#f8e060':'#fff'; c.fillRect(x,y,48,56); c.strokeStyle='#b8a888'; c.lineWidth=2; c.strokeRect(x,y,48,56); c.fillStyle='#3a3a44'; c.fillText(String(i+1),x+24,y+34);
          if(i===3||i===16||i===25){ c.strokeStyle='#d0202a'; c.lineWidth=5; c.beginPath(); c.arc(x+24,y+27,25,0,7); c.stroke(); } } });
      DET.tafel(g,t,1.96,2.45,0,2.42,.115);
      for(let i=0;i<6;i++) ring(g,.1,.028,STAHL,-.75+i*.3,3.72,.14).rotation.y=Math.PI/2;
      ball(g,.1,MESSING,0,3.98,.08); [-.75,.75].forEach(x=>strich(g,[x,3.8,.12],[0,3.98,.1],.016,HOLZ3));
      /* ein Blatt-Eck ist hochgeklappt */
      const e=box(g,.42,.42,.03,PAPIER2,.78,1.34,.17); e.rotation.z=.785; e.scale.y=.16; } },
  { x:-15.4, z:-2.4, dreh:Math.PI/2, steh:[-13.7,-2.4], kasten:[.9,3.7], treffer:[3.6,4.3,1.0], baue(g){ /* 7 Regal mit Detektivbüchern, obenauf Lupe und Hut */
      DET.regal(g,0,0,3.4,3.3);
      box(g,2.2,.34,.08,PETROL2,0,3.3,.43); const t=bild(512,80,(c)=>{ c.fillStyle='#f4ecd8'; c.fillRect(0,0,512,80); c.fillStyle='#1f4a52'; c.font='700 52px Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('DETEKTIV-BÜCHER',256,44); });
      DET.tafel(g,t,2.1,.28,0,3.3,.48);
      ring(g,.34,.065,MESSING,-.9,3.95,.1); const gl=ball(g,.3,basis(0xbfe8ff),-.9,3.95,.1,1,1,.1); gl.castShadow=false; strich(g,[-.67,3.72,.1],[-.35,3.5,.18],.07,HOLZ3);
      walze(g,.52,.06,0x8a6a44,.85,3.52,0); ball(g,.34,0xa08050,.85,3.62,0,1,.9,1); walze(g,.345,.1,HOLZ3,.85,3.62,0); } },
  { x:-2.0, z:-1.7, steh:[-2.0,1.1], kasten:[2.9,1.7], treffer:[2.7,2.3,1.6], baue(g){ /* 8 Stapel mit Fallakten: dicke Mappen mit Reitern, Gummibändern und Etiketten auf einer niedrigen Palette */
      [-1.2,0,1.2].forEach(x=>box(g,.22,.12,1.4,HOLZ3,x,.06,0)); [-.5,0,.5].forEach(z=>box(g,2.8,.07,.4,HOLZ,0,.155,z));
      const F=[0xe0b45a,0x4a8ab0,0xd0704a,0x6aa060,0xc8a878];
      [[-.7,7,0],[.68,5,2]].forEach(([x,n,o],s)=>{ for(let i=0;i<n;i++){ const q=gruppe(g,x+((i*7)%5-2)*.025,.19+i*.2,((i*3)%3-1)*.03); q.rotation.y=((i*5)%7-3)*.035;
          const c=F[(i+o)%5]; box(q,1.16,.045,1.04,c,0,.022,0); box(q,1.07,.11,.95,PAPIER,0,.1,-.01); box(q,1.16,.045,1.04,c,0,.178,0); box(q,.06,.2,1.04,c,-.57,.1,0);
          box(q,.46,.12,.03,WEISS,-.1,.1,.52); box(q,.07,.215,1.06,ROT,.36,.1,0); box(q,.16,.04,.24,[ROT,PETROL3,0xf0c030][i%3],.62,.18,-.28+(i%3)*.26); } });
      /* oberste Akte steht schräg offen mit Foto und Klammer */
      const o=gruppe(g,-.7,1.62,-.05); o.rotation.x=-.85; o.rotation.y=.12; box(o,1.15,.92,.06,0xe0b45a,0,.43,0); box(o,.34,.14,.06,0xe0b45a,-.3,.95,0); box(o,.96,.74,.03,WEISS,.03,.42,.045);
      box(o,.36,.36,.02,0x7ab0c8,-.18,.52,.065); ball(o,.09,0x4a3a2a,-.18,.5,.08,1,1,.2); [.58,.47,.36].forEach(y=>box(o,.3,.035,.02,0x5a5660,.26,y,.065)); box(o,.6,.035,.02,0x5a5660,-.03,.2,.065); ring(o,.09,.022,STAHL,.28,.76,.07);
      /* rundes rotes Siegel auf dem rechten Stapel */
      walze(g,.22,.05,ROT,.6,1.23,.1); walze(g,.12,.07,0xe86050,.6,1.23,.1); } },
  { x:12.0, z:-2.0, steh:[10.7,.65], kasten:[3.4,3.5], treffer:[3.0,3.6,3.4], baue(g,k){ /* 9 Diaprojektor strahlt auf eine kleine Leinwand */
      /* Leinwand auf Dreibein, hinten */
      const LZ=-1.35, LX=-.3;
      const lw=gruppe(g,LX,0,0);
      strich(lw,[0,.7,LZ-.1],[0,3.45,LZ-.1],.05,METALL2); [[-.8,.3],[.8,.3],[0,-.35]].forEach(([x,z])=>strich(lw,[0,.75,LZ-.1],[x,.03,LZ+z],.05,METALL2));
      box(lw,2.5,1.85,.07,SCHWARZ,0,2.4,LZ-.02); quer(lw,.09,2.7,METALL,0,3.37,LZ); quer(lw,.06,2.6,METALL,0,1.45,LZ); ball(lw,.1,MESSING,0,3.55,LZ-.1);
      const t=bild(384,272,(c)=>{ c.fillStyle='#fffbe8'; c.fillRect(0,0,384,272); c.fillStyle='#a8dcf0'; c.fillRect(24,20,336,232); c.fillStyle='#6ab060'; c.fillRect(24,190,336,62);
        c.fillStyle='#e8e0d0'; c.beginPath(); c.moveTo(96,200); c.lineTo(112,76); c.lineTo(152,76); c.lineTo(168,200); c.fill(); c.fillStyle='#d0403a'; c.fillRect(108,110,48,22); c.fillRect(102,156,60,22); c.fillRect(110,54,44,24); c.beginPath(); c.moveTo(102,56); c.lineTo(132,32); c.lineTo(162,56); c.fill();
        c.fillStyle='#f8d030'; c.beginPath(); c.arc(300,70,28,0,7); c.fill(); c.fillStyle='#8a5a30'; c.beginPath(); c.ellipse(262,196,40,22,0,0,7); c.fill(); c.beginPath(); c.arc(302,170,18,0,7); c.fill(); c.fillRect(232,206,10,24); c.fillRect(282,206,10,24); });
      const l=new THREE.Mesh(new THREE.PlaneGeometry(2.3,1.65),new THREE.MeshBasicMaterial({map:t})); l.position.set(0,2.4,LZ+.025); lw.add(l);
      /* Tischchen mit Projektor, vorn rechts (so sieht man ihn schräg von der Seite mit Objektiv) */
      const PX=1.0, PZ=.85;
      [-.42,.42].forEach(x=>[-.36,.36].forEach(z=>strich(g,[PX+x*1.2,0,PZ+z*1.2],[PX+x,.9,PZ+z],.055,HOLZ2))); box(g,1.2,.12,1.05,HOLZ,PX,.95,PZ); box(g,.9,.07,.75,HOLZ2,PX,.45,PZ); box(g,.6,.2,.5,PETROL,PX,.58,PZ);
      const winkel=Math.atan2(PX-LX,PZ-LZ), p=gruppe(g,PX,1.0,PZ); p.rotation.y=winkel;
      box(p,.7,.46,.95,0xc4ccd0,0,.27,0); box(p,.72,.09,.97,0xe0702a,0,.17,0); [-1,1].forEach(s=>[0,.1,.2,.3].forEach(z=>box(p,.03,.18,.045,METALL2,s*.355,.36,z)));
      /* langes Objektiv vorn */
      liegend(walze(p,.2,.36,METALL2,0,.34,-.62)); liegend(walze(p,.15,.3,SCHWARZ,0,.34,-.9)); flachring(p,.2,.04,MESSING,0,.34,-.8); flachring(p,.15,.035,MESSING,0,.34,-1.05); scheibe(p,.11,.03,basis(0xfff8d0),0,.34,-1.055);
      quer(p,.09,.1,SCHWARZ,.39,.26,-.2);
      /* rundes Magazin mit vielen Dias dreht sich */
      const m=gruppe(p,0,.56,.1); m.userData.lebendig=true; walze(m,.43,.09,METALL2,0,0,0); walze(m,.17,.17,SCHWARZ,0,.06,0); ball(m,.08,MESSING,0,.17,0);
      for(let i=0;i<24;i++){ const a=i*Math.PI/12, d=box(m,.16,.12,.025,i%6===0?0x50a0d0:WEISS,Math.cos(a)*.31,.1,Math.sin(a)*.31); d.rotation.y=-a; }
      verschmelze(m); k.anim.push(a=>{ m.rotation.y=Math.floor(a*.7)*Math.PI/12+Math.min(1,(a*.7%1)*5)*Math.PI/12; });
      const linse=V(PX-Math.sin(winkel)*1.07,1.34,PZ-Math.cos(winkel)*1.07), mitte=V(LX,2.4,LZ+.05);
      /* Lichtkegel */
      const von=linse.clone(), richt=von.clone(); richt.x-=mitte.x; richt.y-=mitte.y; richt.z-=mitte.z; const len=richt.length();
      const kg=new THREE.Mesh(new THREE.CylinderGeometry(.1,.95,len,24,1,true),basis(0xfff0a8,{transparent:true,opacity:.2,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
      kg.position.set((von.x+mitte.x)/2,(von.y+mitte.y)/2,(von.z+mitte.z)/2); kg.quaternion.setFromUnitVectors(V(0,1,0),richt.normalize()); g.add(kg);
      const s=schein(g,'rgba(255,240,170,.7)',von.x,von.y,von.z,.8);
      k.anim.push(a=>{ kg.material.opacity=.19+Math.sin(a*13)*.015+Math.sin(a*3.1)*.02; s.material.opacity=.8+Math.sin(a*13)*.1; }); } },
  { x:-11.8, z:5.4, dreh:.22, steh:[-11.3,7.65], kasten:[3.2,2.8], treffer:[3.0,2.6,2.4], baue(g){ /* 10 Verkleidungskiste: offen, mit Hüten, Schals, falschem Bart und Brillen */
      const F=0x7a3a6a, F2=0x5a2850;
      box(g,2.5,.1,1.4,F2,0,.15,0); [-1,1].forEach(s=>{ box(g,2.5,.95,.12,F,0,.62,s*.66); box(g,.12,.95,1.4,F2,s*1.21,.62,0); });
      [-1.1,1.1].forEach(x=>[-.55,.55].forEach(z=>ball(g,.14,MESSING,x,.12,z)));
      [-.8,.8].forEach(x=>box(g,.14,.97,.04,MESSING,x,.62,.74)); box(g,2.54,.09,.06,MESSING,0,1.1,.73); box(g,.34,.3,.06,GOLD,0,.92,.76);
      /* aufgeklappter Deckel mit Stern */
      const d=gruppe(g,0,1.1,-.72); d.rotation.x=-.32; box(d,2.5,1.3,.14,F,0,.65,-.04); [-.8,.8].forEach(x=>box(d,.14,1.32,.04,MESSING,x,.65,.05));
      for(let i=0;i<5;i++){ const a=i*Math.PI*2/5; const z=kegel(d,.13,.34,GOLD,Math.sin(a)*.24,.7+Math.cos(a)*.24,.06); z.rotation.z=-a; z.scale.z=.04; } scheibe(d,.17,.06,GOLD,0,.7,.06);
      /* bunte Stoffe in der Kiste */
      [[-.7,0xd83a3a],[-.1,0x2a8ac0],[.55,0xf0b020],[.85,0x4aa060]].forEach(([x,c],i)=>ball(g,.55,c,x,.82+(i%2)*.1,(i%2)*.2-.1,1,.62,.95));
      /* Zylinderhut */
      const z=gruppe(g,-.72,1.28,-.12); z.rotation.z=.22; walze(z,.48,.08,SCHWARZ,0,0,0); rohr(z,.31,.29,.66,SCHWARZ,0,.36,0); walze(z,.31,.14,ROT,0,.12,0);
      /* Strohhut mit blauem Band */
      const s=gruppe(g,.68,1.42,-.2); s.rotation.z=-.28; s.rotation.x=.15; walze(s,.6,.07,0xeccb6a,0,0,0); ball(s,.33,0xeccb6a,0,.08,0,1,.95,1); walze(s,.34,.1,0x2a6ad0,0,.1,0);
      /* falscher Bart mit Schnurrbart hängt über den Rand */
      const K=[]; [[0,0,.2],[-.17,.04,.17],[.17,.04,.17],[-.1,-.18,.17],[.1,-.18,.17],[0,-.34,.15],[-.27,.2,.12],[.27,.2,.12]].forEach(([x,y,r])=>K.push([-.35+x,.86+y,.84,r,r,r*.6,0x8a5228])); kugeln(g,K);
      [-1,1].forEach(a=>{ const m=ball(g,.2,0xa86a34,-.35+a*.17,1.13,.94,1.2,.5,.5); m.rotation.z=a*.35; });
      /* große runde Brille darüber */
      [-1,1].forEach(a=>{ ring(g,.16,.035,GOLD,-.35+a*.21,1.4,.9); }); strich(g,[-.4,1.43,.9],[-.3,1.43,.9],.025,GOLD); [-1,1].forEach(a=>strich(g,[-.35+a*.37,1.42,.9],[-.35+a*.45,1.32,.6],.02,GOLD));
      /* Sonnenbrille an der Vorderwand */
      [-1,1].forEach(a=>{ const b=ball(g,.13,0x20262c,.5+a*.15,.55,.76,1.05,.85,.25); b.castShadow=false; ring(g,.135,.025,0x40c0a0,.5+a*.15,.55,.78).scale.y=.85; }); strich(g,[.46,.58,.78],[.54,.58,.78],.022,0x40c0a0);
      /* gestreifter Schal hängt seitlich heraus */
      for(let i=0;i<6;i++){ box(g,.36,.17,.09,i%2?WEISS:0xe0402a,1.05,1.1-i*.16,.79+(i%2)*.004).rotation.z=.06; }
      box(g,.4,.12,.5,0xe0402a,1.05,1.2,.55); [-.12,0,.12].forEach(x=>box(g,.05,.16,.05,0xe0402a,1.08+x,.16,.8));
      /* Federboa links */
      const FB=[]; for(let i=0;i<14;i++){ const u=i/13; FB.push([-1.34,1.18-Math.max(0,u-.25)*1.1,.4-u*.2+Math.sin(i*1.7)*.07,.13,.13,.13,i%2?0x40c0c8:0x70e0e0]); } kugeln(g,FB); } }
];

return { titel:'Die Pinnwand-Zentrale', breite:36, tiefe:27, oben:['14,26,28','24,46,50','48,76,80'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Die Dunkelkammer. Friedas Fotolabor in hellem Rosa-Rot-Violett (auf dem iPad gut erkennbar): rote Lampen, eine Wäscheleine
   mit frischen Fotos an der Rückwand, gefliester Boden, Fotohintergrund-Rollen, Rohre, Lüfter, Schürzen und Pflanzen als Randdeko.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Großer Wecker) und 10 (Foto-Vergrößerer) sind neu.
   Ausgang: die Lichtschleuse, eine runde Drehschleuse in der Mitte der Rückwand. Ihre Trommel dreht sich und gibt die Öffnung frei.
   Leben: Fotos schaukeln an der Leine, Motten flattern um die roten Lampen, der Wasserhahn tropft. */
RAEUME3D.detektiv[2] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, GOLD, SCHWARZ, WEISS } = DET;
const ROT=0xd8342c, ROT2=0x8e1e28, ROSA=0xf2a8b8, BEERE=0x8a3a62, PFLAUME=0x4e2448, VIOLETT=0x7a58a8, TUERKIS=0x2a8a94, GELB=0xf8cc38, BLAU=0x3a78c8, GRUEN=0x4a9a58,
  CHROM=0xd0dce4, STAHL=0x8a98a6, STAHL2=0x525e6c, KERAMIK=0xf6f8f8, CREME=0xfff2d8;
const B=36, T=27, H=6.4, HINTEN=-13.5;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Scheibe oder Ring mit Blick nach +z bzw. Ring flach */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };      /* Walze längs x */
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
function tisch(g,b,t,h,platte,bein){
  box(g,b,.16,t,platte,0,h-.08,0); box(g,b-.24,.18,t-.24,bein,0,h-.25,0);
  [-1,1].forEach(s=>[-1,1].forEach(v=>box(g,.18,h-.16,.18,bein,s*(b/2-.2),(h-.16)/2,v*(t/2-.2))));
}
/* Bildtafel, die selbst ein wenig leuchtet (Fotos, Plakat, Zifferblatt) */
function papier(par,tex,w,h,x,y,z){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex,side:THREE.DoubleSide,emissive:0x2a2224})); m.position.set(x,y,z); par.add(m); return m;
}
/* Foto mit weißem Rand und einem fröhlichen Motiv (0 bis 5) */
function fotoBild(art){
  return bild(160,192,(g)=>{ g.fillStyle='#fffaf2'; g.fillRect(0,0,160,192);
    const himmel=['#9ad4f4','#ffd890','#b8e8c8','#e8c8f4','#ffc0b0','#a8e0e8'][art]; g.fillStyle=himmel; g.fillRect(12,12,136,142);
    const kreis=(x,y,r,c)=>{ g.fillStyle=c; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); };
    const vieleck=(p,c)=>{ g.fillStyle=c; g.beginPath(); p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])); g.fill(); };
    g.fillStyle='#6aa850'; g.fillRect(12,122,136,32);
    if(art===0){ g.fillStyle='#d8543c'; g.fillRect(48,82,64,50); vieleck([[40,86],[80,48],[120,86]],'#7a3a2a'); g.fillStyle='#fff0a0'; g.fillRect(58,94,16,16); g.fillStyle='#5a3418'; g.fillRect(86,100,16,32); kreis(128,34,13,'#ffe030'); }
    else if(art===1){ kreis(80,108,28,'#a8642c'); kreis(80,72,24,'#b8743a'); kreis(56,78,13,'#6e4020'); kreis(104,78,13,'#6e4020'); kreis(72,68,4,'#14100c'); kreis(88,68,4,'#14100c'); kreis(80,82,7,'#14100c'); }
    else if(art===2){ g.fillStyle='#7a4a24'; g.fillRect(72,86,16,46); kreis(80,66,34,'#2f8a3a'); kreis(56,82,22,'#46a448'); kreis(104,82,22,'#46a448'); [[66,60],[94,70],[80,88]].forEach(p=>kreis(p[0],p[1],6,'#e83a30')); }
    else if(art===3){ kreis(80,108,26,'#5a5a66'); kreis(80,74,23,'#6a6a76'); vieleck([[58,66],[62,38],[78,54]],'#6a6a76'); vieleck([[102,66],[98,38],[82,54]],'#6a6a76'); kreis(71,72,5,'#c8f040'); kreis(89,72,5,'#c8f040'); kreis(80,84,4,'#f08090'); }
    else if(art===4){ g.fillStyle='#3a8ac8'; g.fillRect(12,112,136,42); vieleck([[38,112],[124,112],[106,132],[56,132]],'#c8342c'); g.fillStyle='#5a3418'; g.fillRect(78,48,5,64); vieleck([[85,50],[122,104],[85,104]],'#ffffff'); kreis(36,38,13,'#ffe030'); }
    else { g.strokeStyle='#5a3418'; g.lineWidth=11; g.beginPath(); g.arc(70,70,30,0,7); g.stroke(); kreis(70,70,25,'#d8f4ff'); g.beginPath(); g.moveTo(92,92); g.lineTo(126,130); g.stroke(); kreis(60,60,7,'#ffffff'); }
    g.fillStyle='#8a6a70'; g.fillRect(40,168,80,5);
  });
}

/* ---------- Ausgang: die Lichtschleuse (runde Drehschleuse) ---------- */
const SZ=-12.9; /* Achse der Trommel */
function bogen(par,r,h,von,weite,m,y){
  const q=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,Math.max(6,Math.round(weite*14)),1,true,von,weite),m); q.position.y=y; q.receiveShadow=true; par.add(q); return q;
}
function baueSchleuse(k,sc,hinten){
  const R=1.9, A=2.28, HO=3.7, V4=Math.PI/4, HW=V4+.06; /* HW = halbe Breite einer Trommelschale */
  /* helles Licht dahinter (erst beim Öffnen sichtbar) */
  const gang=gruppe(hinten,0,0,0);
  box(gang,4.3,.1,4.4,0xfff0c8,0,-.044,-15.6); box(gang,1.5,.02,4.4,0xffe070,0,.02,-15.6);
  [-1,1].forEach(s=>{ box(gang,.2,3.8,3.9,basis(0xfff0c0),s*2.12,1.9,-15.75); [-14.4,-15.5,-16.6].forEach(z=>box(gang,.06,3.7,.16,basis(0xffd060),s*1.99,1.85,z)); });
  box(gang,4.4,.14,3.9,basis(0xffe6a8),0,3.82,-15.75);
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,150,8,128,150,180); v.addColorStop(0,'#ffffff'); v.addColorStop(.45,'#fffbe0'); v.addColorStop(1,'#ffcc58'); g.fillStyle=v; g.fillRect(0,0,256,256); });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4.4,3.9),basis(0xffffff,{map:ende})); e.position.set(0,1.9,-17.7); gang.add(e);
  verschmelze(gang); gang.visible=false;

  /* fester Teil: Sockelring, Deckel, Seitenschalen, goldene Pfosten */
  const fest=gruppe(hinten,0,0,SZ), blech=mat(0x6a4a8a,{side:THREE.DoubleSide});
  walze(fest,A+.12,.07,STAHL2,0,.035,0); const br=ring(fest,A+.12,.045,GOLD,0,.08,0); br.rotation.x=Math.PI/2;
  walze(fest,A+.14,.42,PFLAUME,0,HO+.21,0); [HO+.02,HO+.42].forEach(y=>liegend(ring(fest,A+.14,.07,GOLD,0,y,0)));
  walze(fest,1.5,.14,VIOLETT,0,HO+.5,0);
  [-1,1].forEach(s=>{ bogen(fest,A,HO,s>0?V4:-V4-1.2,1.2,blech,HO/2);
    [.5,1.5,2.5,3.3].forEach(y=>{ const q=bogen(fest,A+.025,.12,s>0?V4:-V4-1.2,1.2,mat(0xa888c8,{side:THREE.DoubleSide}),y); q.castShadow=false; });
    const x=s*Math.sin(V4)*(A+.03), z=Math.cos(V4)*(A+.03); walze(fest,.2,HO,GOLD,x,HO/2,z); [.15,HO-.12].forEach(y=>walze(fest,.26,.2,MESSING2,x,y,z)); [1.0,2.0,3.0].forEach(y=>ball(fest,.23,MESSING,x,y,z,1,.4,1)); });
  /* Sonnenzeichen über dem Eingang */
  scheibe(fest,.19,.08,CREME,0,HO+.21,A+.14); scheibe(fest,.1,.1,GELB,0,HO+.21,A+.15);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4; ball(fest,.045,GELB,Math.cos(a)*.31,HO+.21+Math.sin(a)*.17,A+.17); }
  verschmelze(fest);

  /* drehbare Trommel: zwei Wandschalen, dazwischen zwei Öffnungen (geschlossen zeigen sie zur Seite) */
  const trommel=gruppe(hinten,0,0,SZ); trommel.userData.lebendig=true;
  const t=gruppe(trommel,0,0,0), haut=mat(0xc8d2dc,{side:THREE.DoubleSide}), streif=mat(0x7a8896,{side:THREE.DoubleSide});
  [0,Math.PI].forEach(m=>{ bogen(t,R,HO-.1,m-HW,2*HW,haut,HO/2+.03);
    [.28,.85,3.05,3.45].forEach(y=>bogen(t,R+.022,.14,m-HW,2*HW,streif,y));
    [-HW+.02,HW-.02,0].forEach((d,i)=>{ if(m && i===2) return; const a=m+d; walze(t,i===2?.025:.07,HO-.1,i===2?STAHL2:ROT,Math.sin(a)*(R+.02),HO/2+.03,Math.cos(a)*(R+.02)); });
    for(let i=0;i<7;i++) [.55,3.25].forEach(y=>{ const a=m-.6+i*.2; ball(t,.045,STAHL2,Math.sin(a)*(R+.05),y,Math.cos(a)*(R+.05)); }); });
  /* Schild und Zahlenschloss auf der Vorderschale */
  box(t,1.74,1.36,.1,PFLAUME,0,2.0,R+.01); box(t,1.58,1.2,.1,CREME,0,2.0,R+.03);
  const schloss=DET.zahlenschloss(t,0,1.86,R+.13); schloss.scale.setScalar(1.45);
  verschmelze(t);

  /* Anzeigelampe auf dem Deckel: rot, offen grün */
  const rotM=basis(0xff4a38), gruenM=basis(0x48f078);
  const anzeige=gruppe(hinten,0,HO+.72,SZ+1.2); anzeige.userData.lebendig=true;
  walze(anzeige,.24,.14,GOLD,0,-.12,0); const birne=ball(anzeige,.19,rotM,0,.04,0); birne.castShadow=false;
  const glimm=schein(hinten,'rgba(255,230,150,.55)',0,2.0,SZ+R+.5,1.5);
  const licht=new THREE.PointLight(0xfff0c0,0,12,1.5); licht.position.set(0,2.4,-13.6); sc.add(licht);
  k.kasten(0,-12.25,4.9,2.7);
  return ausgang(k,{ name:'Lichtschleuse', einfach:'Runde Drehtür', steh:[0,-9.4], durch:[0,-16],
    treffer:{x:0,y:2.1,z:-10.9,b:3.9,h:4.2,t:.9}, schildOben:[0,4.75,-10.6], glanz:[0,1.9,-10.55],
    bewege:(auf,t2)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.84)), u=a*a*(3-2*a);
      trommel.rotation.y=u*Math.PI/2; gang.visible=auf>.02; licht.intensity=2.2*auf;
      birne.material=auf>.3?gruenM:rotM; glimm.visible=auf<.05; glimm.material.opacity=.4+Math.sin(t2*2.2)*.25; } });
}

/* ---------- Wäscheleine mit schaukelnden Fotos (in der Rückwandgruppe) ---------- */
function waescheleine(k,hinten){
  const g=gruppe(hinten,0,0,0), x1=-11.7, x2=-3.1, z=-13.0;
  const linie=x=>{ const u=(x-(x1+x2)/2)/((x2-x1)/2); return 2.92-.24*(1-u*u); };
  [x1,x2].forEach(x=>{ box(g,.36,.5,.12,HOLZ,x,2.92,HINTEN+.1); strich(g,[x,2.92,HINTEN+.1],[x,2.92,z],.07,HOLZ2); ball(g,.13,MESSING,x,2.92,z); });
  for(let i=0;i<16;i++){ const a=x1+i*(x2-x1)/16, b=x1+(i+1)*(x2-x1)/16; strich(g,[a,linie(a),z],[b,linie(b),z],.035,CREME); }
  verschmelze(g); ohneSchatten(g);
  [0,1,2,3,4,5].forEach(i=>{ const x=x1+.85+i*1.38, p=gruppe(hinten,x,linie(x),z); p.userData.lebendig=true;
    papier(p,fotoBild(i),1.02,1.22,0,-.64,.03);
    const kl=gruppe(p,0,0,0); [-.34,.34].forEach(a=>{ box(kl,.11,.3,.13,0xf0c070,a,-.02,.05); box(kl,.12,.04,.14,STAHL2,a,.02,.05); }); verschmelze(kl); ohneSchatten(kl);
    k.anim.push(t=>{ p.rotation.x=Math.sin(t*1.7+i*1.3)*.13+Math.sin(t*3.1+i)*.04; p.rotation.z=Math.sin(t*1.25+i*.9)*.075; }); });
}

/* ---------- rote Wandlampe neben der Schleuse und Motten ---------- */
function wandlampe(hinten){
  const g=gruppe(hinten,3.35,3.05,HINTEN);
  scheibe(g,.34,.1,STAHL2,0,.2,.06); strich(g,[0,.2,.1],[0,.55,.55],.055,STAHL); strich(g,[0,.55,.55],[0,.38,.7],.055,STAHL);
  rohr(g,.14,.44,.34,ROT2,0,.2,.7,20,true); liegend(ring(g,.44,.035,GOLD,0,.03,.7));
  ball(g,.3,basis(0xff3a28),0,-.03,.7,1,.95,1); ball(g,.12,basis(0xffa080),-.08,.03,.94);
  verschmelze(g); ohneSchatten(g); schein(g,'rgba(255,70,60,.75)',0,-.05,1.05,2.5);
}
function motte(k,par,cx,cy,cz,rx,rz,start,tempo){
  const g=gruppe(par,cx,cy,cz); g.userData.lebendig=true;
  ball(g,.075,0x6a4a34,0,0,0,.8,.8,2.1); ball(g,.07,0x8a6a4a,0,.02,.15);
  [-1,1].forEach(s=>{ strich(g,[s*.03,.06,.18],[s*.12,.2,.3],.012,0x4a3020); ball(g,.026,SCHWARZ,s*.05,.05,.2); });
  const fl=[-1,1].map(s=>{ const f=gruppe(g,s*.04,.02,0); ball(f,.2,0xfff0d0,s*.18,0,.06,1,.07,.75); ball(f,.14,0xe8c898,s*.13,0,-.13,1,.07,.8); ball(f,.05,0x9a6a40,s*.22,.016,.08,1,.2,1); return f; });
  ohneSchatten(g);
  k.anim.push(t=>{ const u=t*tempo+start; g.position.set(cx+Math.cos(u)*rx+Math.sin(u*3.1)*.12,cy+Math.sin(u*1.7)*.3+Math.sin(t*7+start)*.06,cz+Math.sin(u)*rz);
    g.rotation.y=Math.atan2(-Math.sin(u)*rx,Math.cos(u)*rz); g.rotation.x=.4; const w=Math.sin(t*17+start)*.85; fl[0].rotation.z=-w; fl[1].rotation.z=w; });
}

/* ---------- Wandschmuck ---------- */
function luefter(k,par,x,y){
  const g=gruppe(par,x,y,HINTEN);
  box(g,1.7,1.7,.14,STAHL,0,0,.08); scheibe(g,.7,.06,PFLAUME,0,0,.17); ring(g,.72,.07,CHROM,0,0,.22); [-1,1].forEach(s=>[-1,1].forEach(v=>ball(g,.07,STAHL2,s*.7,v*.7,.17)));
  verschmelze(g); ohneSchatten(g);
  const r=gruppe(par,x,y,HINTEN+.27); r.userData.lebendig=true;
  for(let i=0;i<4;i++){ const a=i*Math.PI/2; const f=ball(r,.3,ROSA,Math.cos(a)*.3,Math.sin(a)*.3,0,1,.55,.1); f.rotation.z=a+.35; }
  ball(r,.14,GOLD,0,0,.03,1,1,.6); ohneSchatten(r); k.anim.push(t=>{ r.rotation.z=t*2.6; });
}
/* Schürze am Haken, Blick nach +z */
function schuerze(g,x,y,z,c){
  box(g,.16,.16,.2,MESSING,x,y+.9,z); [-1,1].forEach(s=>strich(g,[x,y+.9,z+.08],[x+s*.28,y+.5,z+.04],.035,PFLAUME));
  box(g,.72,.55,.08,c,x,y+.28,z+.02); box(g,1.2,1.35,.1,c,x,y-.62,z+.02); box(g,.72,.42,.05,CREME,x,y-.65,z+.1); box(g,.76,.07,.07,PFLAUME,x,y-.42,z+.11); box(g,1.28,.09,.12,PFLAUME,x,y+.04,z+.02);
}
function wandSchmuck(k,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  /* Rohre unter der Decke */
  [[-17.9,-2.6],[4.6,17.9]].forEach(([a,b])=>{ quer(walze(h,.11,b-a,STAHL,(a+b)/2,5.5,HINTEN+.2)); quer(walze(h,.07,b-a,0xb85a38,(a+b)/2,5.15,HINTEN+.14)); for(let x=a+.6;x<b;x+=2.6) box(h,.18,.62,.2,STAHL2,x,5.32,HINTEN+.14); });
  [-17.4,8.7,17.4].forEach(x=>{ walze(h,.09,3.9,STAHL,x,3.4,HINTEN+.14); [2.2,3.8].forEach(y=>box(h,.3,.12,.2,STAHL2,x,y,HINTEN+.12)); ball(h,.16,STAHL2,x,5.5,HINTEN+.2); });
  /* Schürzen an Haken */
  schuerze(h,13.2,2.55,HINTEN+.12,TUERKIS); schuerze(h,15.1,2.55,HINTEN+.12,0xe8a030);
  box(h,3.6,.16,.1,HOLZ,14.15,3.5,HINTEN+.06);
  /* Filmstreifen als Zierband an den Seitenwänden, dazu Rohre */
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.04);
    box(w,.06,.78,T-.8,0x2c1c30,x,4.55,0);
    for(let i=0;i<16;i++){ const z=-12.3+i*1.64; box(w,.04,.46,1.25,[0xffd8a0,0xa8d8f0,0xf4b0c8,0xc8e8a8][i%4],x-s*.04,4.55,z); ball(w,.15,[0xe86030,0x3a78c8,0x9a3a8a,0x3a8a40][i%4],x-s*.06,4.47,z,.15,1,1.6); }
    for(let i=0;i<60;i++){ const z=-12.9+i*.437; [4.28,4.86].forEach(y=>box(w,.04,.09,.18,CREME,x-s*.04,y,z)); }
    const r=walze(w,.11,T-.6,STAHL,s*(B/2-.2),5.55,0); r.rotation.x=Math.PI/2; for(let z=-11.5;z<13;z+=3.4) box(w,.22,.34,.18,STAHL2,s*(B/2-.12),5.55,z); });
  /* große gerahmte Fotos an den Seitenwänden */
  [[L,-1,-9.4,2],[L,-1,5.2,4],[R,1,-.4,0],[R,1,3.2,3]].forEach(([w,s,z,art])=>{ const f=gruppe(w,s*(B/2-.1),2.75,z); f.rotation.y=-s*Math.PI/2; box(f,1.9,2.15,.1,GOLD,0,0,0); box(f,1.72,1.97,.12,MESSING2,0,0,.01); papier(f,fotoBild(art),1.55,1.82,0,0,.09); });
  /* Fotohintergrund-Rollen mit kurzer Stoffbahn (endet über dem Sockel, damit es nicht wie eine Tür aussieht) */
  [[L,-1,.9,TUERKIS],[R,1,8.4,0xf4b838]].forEach(([w,s,z,c])=>{ const x=s*17.6; const r=walze(w,.22,3.4,c,x,3.7,z); r.rotation.x=Math.PI/2; [-1.78,1.78].forEach(v=>{ scheibe(w,.28,.14,HOLZ2,x,3.7,z+v); box(w,.5,.12,.12,STAHL2,s*17.8,3.7,z+v); });
    box(w,.06,2.0,3.1,c,s*17.78,2.65,z); quer(walze(w,.07,3.2,HOLZ,s*17.76,1.65,z)).rotation.set(Math.PI/2,0,0);
    /* aufgemalte Wölkchen auf der Stoffbahn */
    [[-.7,2.95],[.65,2.3]].forEach(([v,y])=>[[-.28,0,.2],[0,.1,.27],[.3,0,.2]].forEach(([a,b,gr])=>ball(w,gr,CREME,s*17.74,y+b,z+v+a,.1,.8,1))); });
  /* Schürze auch an den Seiten */
  [[L,-1,10.2,0x8a50b0],[R,1,-10.8,ROT]].forEach(([w,s,z,c])=>{ const f=gruppe(w,s*(B/2-.14),2.4,z); f.rotation.y=-s*Math.PI/2; schuerze(f,0,0,0,c); });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Randdeko am Boden ---------- */
const KUGEL=()=>new THREE.SphereGeometry(1,8,6);
function pflanzen(k,deko,orte){
  const blaetter=[];
  orte.forEach(([x,z,s])=>{ rohr(deko,.62*s,.45*s,.72*s,0xe0a858,x,.36*s,z); liegend(ring(deko,.63*s,.07*s,CREME,x,.72*s,z)); walze(deko,.55*s,.04,0x5a3820,x,.72*s,z);
    for(let i=0;i<26;i++){ const a=i*2.4, d=.62*s*Math.sqrt((i+.5)/26), y=(.86+(.62*s-d)*1.1+((i*7)%5)*.06)*s;
      blaetter.push([x+Math.cos(a)*d,y,z+Math.sin(a)*d,.21*s,.15*s,.21*s,[0x3f9a50,0x72c060,0x2f7a48][i%3],a,.25,.2]); }
    k.kreis(x,z,.68*s); });
  DET.viele(deko,KUGEL(),blaetter);
}
/* liegende Fotohintergrund-Rollen auf zwei Holzböcken */
function rollenLager(k,deko,x,z){
  [-1.3,1.3].forEach(a=>{ box(deko,.24,.18,1.5,HOLZ2,x+a,.09,z); [-.7,0,.7].forEach(v=>box(deko,.24,.2,.14,HOLZ,x+a,.27,z+v)); });
  [[-.36,.43,VIOLETT],[.36,.43,0xf4b838],[0,.88,TUERKIS]].forEach(([v,y,c])=>{ quer(walze(deko,.3,3.3,c,x,y,z+v)); [-1.68,1.68].forEach(a=>{ quer(walze(deko,.16,.06,CREME,x+a,y,z+v)); quer(walze(deko,.07,.08,HOLZ3,x+a,y,z+v)); }); });
  k.kasten(x,z,3.5,1.55);
}
function bank(k,deko,x,z){
  box(deko,3.0,.2,.9,HOLZ,x,.55,z); [-1.25,1.25].forEach(a=>box(deko,.22,.46,.75,HOLZ2,x+a,.23,z)); box(deko,2.5,.12,.14,HOLZ2,x,.22,z);
  [-.75,.75].forEach((a,i)=>{ ball(deko,.55,i?ROSA:VIOLETT,x+a,.76,z,1.15,.3,.7); ball(deko,.09,GOLD,x+a,.93,z); });
  k.kasten(x,z,3.05,.95);
}

/* kleine, blasse Bodeneinlage in Fliesenfarben (kein Hindernis) */
function bodenBlende(par,x,z,r){
  const g=gruppe(par,x,0,z); walze(g,r+.07,.008,0xb88aa8,0,.005,0); walze(g,r,.01,0xdcc0cc,0,.008,0);
  for(let i=0;i<4;i++){ const m=new THREE.Mesh(new THREE.CylinderGeometry(r-.14,r-.14,.01,8,1,false,i*Math.PI/2,Math.PI/4),mat(0xc8a0bc)); m.position.y=.012; m.receiveShadow=true; g.add(m); }
  ohneSchatten(g);
}
/* Kabel flach auf dem Boden, weich geschwungen durch die Punkte [x,z] */
function kabel(par,punkte,c){
  const P=punkte, q=(a,b,c2,d,t)=>.5*(2*b+(c2-a)*t+(2*a-5*b+4*c2-d)*t*t+(3*b-a-3*c2+d)*t*t*t);
  let alt=P[0];
  for(let i=0;i<P.length-1;i++) for(let j=1;j<=7;j++){ const v=[0,1].map(n=>q(P[Math.max(0,i-1)][n],P[i][n],P[i+1][n],P[Math.min(P.length-1,i+2)][n],j/7));
    const m=strich(par,[alt[0],.055,alt[1]],[v[0],.055,v[1]],.055,c); if(m) m.castShadow=false; ball(par,.056,c,v[0],.055,v[1]).castShadow=false; alt=v; }
}
/* niedrige Holzbank mit gerollten Handtüchern */
function handtuchBank(k,deko,x,z){
  box(deko,2.2,.14,.85,HOLZ,x,.47,z); [-.9,.9].forEach(a=>box(deko,.18,.42,.72,HOLZ2,x+a,.21,z)); box(deko,1.8,.09,.12,HOLZ2,x,.18,z);
  [[-.66,.74,CREME,ROT],[0,.74,0x9ad8e0,PFLAUME],[.66,.74,ROSA,CREME],[-.33,1.13,0xf8d868,TUERKIS],[.33,1.13,CREME,VIOLETT]].forEach(([a,y,c,streif])=>{
    liegend(walze(deko,.22,.76,c,x+a,y,z)); [-.2,.2].forEach(v=>liegend(walze(deko,.228,.08,streif,x+a,y,z+v))); scheibe(deko,.09,.03,streif,x+a,y,z+.38); });
  k.kasten(x,z,2.25,.9);
}

function baue(k){
  const sc=k.scene;
  const h=DET.huelle(k,{ B,T,H, himmelLicht:0xffdce8, grund:0x80486a, staerke:.76, sonne:0xffd6d0, sonneStaerke:.38,
    wandBild:DET.tapeteBild('#c87890','rgba(110,30,80,.2)'), bodenBild:DET.fliesenBild([214,170,184],[176,132,166],'#6e4660',4), bodenWdh:[B/7,T/7],
    leiste:PFLAUME, sockel:1.3, sockelFarbe:BEERE, oeffnung:{x:0,b:4.2,h:3.75} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueSchleuse(k,sc,hinten);
  wandSchmuck(k,hinten,links,rechts);
  waescheleine(k,hinten);
  wandlampe(hinten);
  luefter(k,hinten,10.4,3.0);

  const deko=gruppe(sc,0,0,0);
  rollenLager(k,deko,-8.6,11.4); rollenLager(k,deko,8.8,11.4);
  bank(k,deko,-3.2,12.0); bank(k,deko,3.4,12.0);
  pflanzen(k,deko,[[-16.4,12,1.15],[-13.6,12.3,.8],[16.4,12,1.15],[13.6,12.3,.8],[0,12.4,.75],[-16.7,-11.9,1.1],[16.7,-11.9,1.1],[-16.8,5.4,.9],[16.8,-1.8,.9],[-9.6,7.8,.8],[9.0,8.5,.8],[-12.6,-9.2,.7],[12.8,-8.6,.7],[3.9,8.5,.7],[-3.3,-1.4,.55],[3.4,-6.6,.55]]);
  handtuchBank(k,deko,-3.4,8.3); handtuchBank(k,deko,13.4,8.6);
  verschmelze(deko);
  /* flache Bodeneinlagen und Gummimatten unter den Arbeitsplätzen */
  const boden=gruppe(sc,0,0,0);
  bodenBlende(boden,0,7.2,.95);
  /* Bordüre rundum und zwei Leitstreifen zur Schleuse */
  [-10.2,10.4].forEach(z=>box(boden,29.4,.012,.24,PFLAUME,0,.008,z)); [-14.7,14.7].forEach(x=>box(boden,.24,.012,20.6,PFLAUME,x,.009,.1));
  [-1.7,1.7].forEach(x=>{ box(boden,.2,.014,8.2,GOLD,x,.012,-5.4); box(boden,.1,.016,8.2,PFLAUME,x+(x<0?.24:-.24),.013,-5.4); });
  /* Kabel */
  kabel(boden,[[-17.7,6.9],[-14.8,6.3],[-12.8,5.6]],0x2c1c30);
  kabel(boden,[[17.7,-3.4],[15,-2.6],[12.4,-4.8],[9.8,-4.4],[8.4,-3.5]],0x2c1c30);
  kabel(boden,[[-3.9,8.9],[-5.6,6.6],[-2.9,4.9],[-3.6,2.1],[-6.4,.6],[-8.9,4.4],[-10.9,5.5]],0x7a3a8a);
  kabel(boden,[[3.8,7.9],[2.7,5.7],[5.3,4.3],[3.1,.5],[5.8,-1.2],[8.0,-3.3]],0x2a7a88);
  ohneSchatten(boden); verschmelze(boden);
  DET.teppich(sc,-6.6,-5.6,6.0,4.4,0xa83a52,0xf4c0c8);
  DET.teppich(sc,-11.8,5.8,4.0,3.6,0x6a3a7a,0xf4d0a0);
  DET.teppich(sc,11.4,4.8,4.4,3.6,0x2f7a84,0xf4c0c8);

  /* rote Hängelampen an den Seiten */
  /* Lampe, Wandarm, Schein und Motte hängen in der jeweiligen Seitenwand und blenden mit ihr aus; das Punktlicht bleibt */
  [[links,-16.0,-8.4,4.5,1],[rechts,16.4,1.0,5.2,.7]].forEach(([wand,x,z,y,gr],i)=>{ const s=i?1:-1, l=DET.lampe(wand,x,y,z,ROT); l.scale.setScalar(gr); ohneSchatten(l); verschmelze(l);
    const arm=gruppe(wand,0,0,0), oben=y+1.07*gr; strich(arm,[s*(B/2),oben,z],[x,oben,z],.06,PFLAUME); strich(arm,[s*(B/2),oben-.7,z],[x+s*(B/2-Math.abs(x))*.4,oben,z],.04,PFLAUME); box(arm,.14,1.1,.4,PFLAUME,s*(B/2-.07),oben-.35,z); ohneSchatten(arm); verschmelze(arm);
    schein(wand,'rgba(255,60,70,.5)',x,y-.2,z,2.6*gr);
    flacker(k,x-(i?.6:0),y-.6,z,0xff6a68,.42,10); motte(k,wand,x-(i?.2:0),y-.35,z,.95*gr,.8*gr,i*2.6+1,1.5+i*.3); });
  flacker(k,3.35,2.9,-11.9,0xff4a40,.55,8);
  motte(k,hinten,3.45,3.0,-12.5,.75,.5,0,1.9); motte(k,hinten,3.45,3.45,-12.55,.55,.45,3.4,-1.4);
  const vl=new THREE.PointLight(0xfff0c0,.35,4.5,1.5); vl.position.set(-11.8,1.9,6.0); sc.add(vl);

  return { tuer, start:[0,3] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-15.2,-10],[-10.4,-10.4],[-4.6,-9.8],[3.8,-10],[9.4,-10.2],[14.6,-9.6],[-12.8,-3.4],[-3.6,-2.6],[3.6,-2.8],[13.4,-2.8],
  [-15,2.2],[-9,3.2],[-2.8,6.4],[3.4,5.8],[11.4,8.4],[15,8.2],[-13.2,8.9],[-6.2,9],[6,9.2],[1.6,.2]];

/* ---------- Gegenstände: Reihenfolge = ort 1 bis 10 ---------- */
const gegenstaende=[
  { x:-6.6, z:-5.6, steh:[-6.6,-3.5], kasten:[4.6,2.0], treffer:[4.6,2.2,2.0], baue(g,k){ /* 1 Entwicklerschalen: drei große Wannen mit Bädern und Fotos */
      tisch(g,4.5,1.9,1.2,0x5ab0b8,STAHL2); box(g,4.2,.1,1.5,STAHL,0,.35,0);
      [[-1.45,0xf46a8a,1],[0,0xf8d040,3],[1.45,0x48b0f0,0]].forEach(([x,c,art],i)=>{ const s=gruppe(g,x,1.2,.05);
        box(s,1.2,.08,1.4,KERAMIK,0,.04,0); [-.65,.65].forEach(z=>box(s,1.32,.34,.12,KERAMIK,0,.19,z)); [-.6,.6].forEach(a=>box(s,.12,.34,1.3,KERAMIK,a,.19,0));
        box(s,1.08,.1,1.18,c,0,.13,0); [-.65,.65].forEach(z=>box(s,1.34,.05,.14,c,0,.38,z));
        const f=gruppe(s,0,.215,0); f.userData.lebendig=true; const p=papier(f,fotoBild(art),.7,.85,0,0,0); p.rotation.x=-Math.PI/2; p.rotation.z=(i-1)*.22;
        k.anim.push(t=>{ f.position.set(Math.sin(t*1.2+i*2)*.05,.215+Math.sin(t*2.1+i)*.012,Math.cos(t*.9+i*2)*.04); }); });
      /* Fotozange mit runden Enden */
      const z=gruppe(g,.72,1.62,.45); z.rotation.y=-.5; [-1,1].forEach(s=>{ strich(z,[-.5,0,s*.03],[.45,-.02,s*.14],.04,HOLZ); ball(z,.1,ROT,.48,-.02,s*.14,1.2,.6,1); }); ball(z,.09,HOLZ2,-.52,0,0);
      /* Handtuch an der Tischkante */
      box(g,.7,.07,.3,CREME,-.72,1.22,.82); box(g,.7,.7,.07,CREME,-.72,.9,.98); [.66,.78].forEach(y=>box(g,.72,.06,.08,ROT,-.72,y,.985)); } },
  { x:8.2, z:-3.4, steh:[8.2,-1.2], r:1.05, treffer:[2.1,3.7,2.1], baue(g,k){ /* 2 Fotokamera auf Stativ */
      [0,1,2].forEach(i=>{ const a=i*Math.PI*2/3+Math.PI/3, x=Math.sin(a)*.92, z=Math.cos(a)*.92; strich(g,[0,2.15,0],[x,.08,z],.08,HOLZ); strich(g,[x*.5,1.115,z*.5],[0,1.115,0],.03,STAHL2); ball(g,.12,SCHWARZ,x,.08,z,1,.65,1); });
      walze(g,.13,.55,STAHL2,0,2.25,0); walze(g,.28,.14,CHROM,0,2.52,0);
      const c=gruppe(g,0,3.0,0); c.rotation.y=-.35;
      box(c,1.55,.86,.7,TUERKIS,0,0,0); box(c,1.58,.2,.73,CHROM,0,.37,0); box(c,1.58,.12,.73,SCHWARZ,0,-.4,0); box(c,.34,.9,.12,0x1a5a64,-.6,0,.34);
      scheibe(c,.42,.26,CHROM,.08,-.05,.46); scheibe(c,.34,.36,SCHWARZ,.08,-.05,.52); ring(c,.34,.04,GOLD,.08,-.05,.71); scheibe(c,.24,.04,0x70c8f4,.08,-.05,.72); ball(c,.065,WEISS,-.01,.04,.75,1,1,.4);
      box(c,.5,.3,.45,CHROM,.08,.6,0); box(c,.3,.17,.04,0x2a4a6a,.08,.61,.24);
      box(c,.38,.26,.14,WEISS,-.5,.6,.15); box(c,.3,.17,.03,0xfff4a0,-.5,.6,.23);
      walze(c,.12,.14,ROT,.58,.54,0); walze(c,.15,.12,STAHL2,-.82,.2,0).rotation.z=Math.PI/2;
      const blitz=schein(c,'rgba(255,255,230,.9)',-.5,.6,.34,.8); k.anim.push(t=>{ const a=(t*.35)%1; blitz.material.opacity=a<.06?1-a/.06:0; }); } },
  { x:-16.0, z:-3.0, dreh:Math.PI/2, steh:[-13.9,-3.0], kasten:[1.6,3.1], treffer:[3.0,3.4,1.5], baue(g,k){ /* 3 Waschbecken mit tropfendem Hahn */
      box(g,2.8,1.7,.1,0x3a8ab0,0,2.45,-.6); for(let i=0;i<7;i++) for(let j=0;j<4;j++) box(g,.34,.36,.05,(i+j)%2?0xbfeaf4:0xffffff,-1.17+i*.39,1.86+j*.4,-.54);
      box(g,2.3,1.1,.9,0x48a0a8,0,.65,-.08); box(g,2.2,.1,.8,PFLAUME,0,.05,-.08); [-.56,.56].forEach(x=>{ box(g,.98,.78,.05,0x80ccd0,x,.66,.39); ball(g,.08,MESSING,x*.28,.8,.45); });
      box(g,2.75,.14,1.2,KERAMIK,0,1.27,0); [-.51,.52].forEach(z=>box(g,2.75,.36,.15,KERAMIK,0,1.5,z)); [-1.29,1.29].forEach(x=>box(g,.17,.36,1.18,KERAMIK,x,1.5,0));
      box(g,2.42,.14,.9,0x70d0f0,0,1.41,0); box(g,2.78,.05,.18,0x2a70b0,0,1.69,.52);
      walze(g,.12,.7,CHROM,0,2.05,-.4); ball(g,.13,CHROM,0,2.4,-.4); strich(g,[0,2.4,-.4],[0,2.46,.04],.1,CHROM); ball(g,.11,CHROM,0,2.46,.04); strich(g,[0,2.46,.04],[0,2.22,.1],.085,CHROM); liegend(ring(g,.09,.025,STAHL,0,2.2,.105));
      [[-.55,0x2a70d0],[.55,ROT]].forEach(([x,c])=>{ walze(g,.07,.36,CHROM,x,1.85,-.4); walze(g,.18,.12,c,x,2.08,-.4); quer(walze(g,.045,.46,CHROM,x,2.17,-.4)); ball(g,.07,c,x,2.2,-.4); });
      /* Wasserrohre zur Wand */
      [-.7,.7].forEach(x=>{ [.55,2.5].forEach(y=>{ liegend(walze(g,.09,1.35,STAHL,x,y,-1.29)); scheibe(g,.16,.08,STAHL2,x,y,-1.94); }); });
      /* Seife und Schaum */
      box(g,.54,.06,.34,GELB,.8,1.72,.46); box(g,.38,.17,.22,0xf880b0,.8,1.83,.46); [[.54,1.96,.08],[1.04,1.92,.06],[.92,2.06,.045]].forEach(([x,y,r])=>ball(g,r,0xeafcff,x,y,.46));
      /* Handtuch vorn */
      quer(walze(g,.045,.86,STAHL,-.74,1.22,.66)); box(g,.66,.82,.09,0xfff0c8,-.74,.83,.7); [.55,.72].forEach(y=>box(g,.68,.07,.1,ROT,-.74,y,.7));
      /* Tropfen und Wellenring */
      const tr=gruppe(g,0,2.14,.105); tr.userData.lebendig=true; ball(tr,.085,0x48b8ff,0,0,0,1,1.25,1); kegel(tr,.058,.13,0x48b8ff,0,.12,0);
      const wr=gruppe(g,0,1.49,.105); wr.userData.lebendig=true; liegend(ring(wr,.2,.018,WEISS,0,0,0));
      k.anim.push(t=>{ const a=(t*.75)%1; if(a<.45){ tr.visible=true; tr.position.y=2.13; tr.scale.setScalar(.35+a*1.45); wr.visible=false; }
        else if(a<.7){ const u=(a-.45)/.25; tr.visible=true; tr.scale.setScalar(1); tr.position.y=2.13-u*u*.6; wr.visible=false; }
        else { const u=(a-.7)/.3; tr.visible=false; wr.visible=true; wr.scale.set(.3+u*1.7,1,.3+u*1.5); } }); } },
  { x:11.4, z:4.8, steh:[9.1,4.8], kasten:[3.0,2.1], treffer:[3.0,2.7,2.1], baue(g){ /* 4 Kiste mit Filmrollen */
      box(g,2.6,.12,1.7,HOLZ2,0,.12,0); [-1.1,1.1].forEach(x=>box(g,.28,.1,1.7,HOLZ3,x,.05,0));
      [.4,.78].forEach(y=>{ [-.82,.82].forEach(z=>box(g,2.7,.3,.1,0xd09a58,0,y,z)); [-1.3,1.3].forEach(x=>box(g,.1,.3,1.7,0xd09a58,x,y,0)); });
      [-1.3,1.3].forEach(x=>[-.82,.82].forEach(z=>box(g,.18,.95,.18,HOLZ,x,.58,z)));
      box(g,2.5,.55,1.55,HOLZ3,0,.45,0);
      const dose=(x,y,z,c)=>{ const d=gruppe(g,x,y,z); walze(d,.23,.62,c,0,0,0); walze(d,.245,.09,SCHWARZ,0,.34,0); walze(d,.245,.09,SCHWARZ,0,-.3,0); walze(d,.08,.14,SCHWARZ,0,.44,0); walze(d,.237,.22,CREME,0,0,0); ball(d,.07,c,0,0,.23,1,1,.4); return d; };
      [[-.95,-.42,GELB],[-.35,-.45,ROT],[.28,-.4,BLAU],[.92,-.44,GRUEN],[-.7,.15,0xf07828],[.62,.1,VIOLETT],[-.15,.42,GELB],[.98,.45,ROT]].forEach(([x,z,c],i)=>dose(x,1.02+(i%3)*.1,z,c));
      const l=dose(-.85,1.02,.5,BLAU); l.rotation.z=1.25;
      /* ausgerollter Filmstreifen über den Rand */
      const stueck=(y,z,rx,len)=>{ const s=gruppe(g,.22,y,z); s.rotation.x=rx; box(s,.4,.045,len,0x3a2428,0,0,0); for(let i=0;i<Math.floor(len/.18);i++){ const v=-len/2+.1+i*.18; [-.15,.15].forEach(a=>box(s,.05,.012,.07,CREME,a,.03,v)); if(i%2===0) box(s,.18,.012,.14,0xf4a860,0,.03,v+.03); } };
      stueck(1.14,.62,.12,.6); stueck(.66,.97,Math.PI/2-.08,.9);
      /* Schild mit Filmrad */
      box(g,.75,.5,.04,CREME,-.55,.58,.9); scheibe(g,.18,.03,SCHWARZ,-.55,.58,.93); for(let i=0;i<5;i++){ const a=i*1.256; scheibe(g,.045,.02,CREME,-.55+Math.cos(a)*.1,.58+Math.sin(a)*.1,.95); } } },
  { x:6.6, z:HINTEN, wand:'hinten', steh:[6.6,-11.6], kasten:[3.4,.9], treffer:[3.3,2.15,.9], trefferY:1.2, baue(g){ /* 5 Regal mit Flaschen */
      box(g,3.15,1.9,.08,0xf4dcc0,0,2.27,.08); [-1.6,1.6].forEach(x=>box(g,.14,2.0,.56,HOLZ,x,2.27,.3));
      [1.38,2.33,3.24].forEach(y=>{ box(g,3.34,.1,.6,HOLZ,0,y,.32); box(g,3.34,.05,.04,MESSING,0,y,.63); });
      const flasche=(x,y,c,hh,r)=>{ walze(g,r,hh,c,x,y+hh/2,.36); ball(g,r,c,x,y+hh,.36,1,.5,1); walze(g,r*.38,.18,c,x,y+hh+r*.5,.36); walze(g,r*.48,.09,SCHWARZ,x,y+hh+r*.5+.12,.36); box(g,r*1.3,hh*.42,.03,CREME,x,y+hh*.46,.36+r); ball(g,r*.22,c,x,y+hh*.46,.38+r,1,1,.3); box(g,.035,hh*.6,.02,WEISS,x-r*.82,y+hh*.55,.36+r*.62); };
      [[-1.2,0x8a4a1e,.5,.2],[-.62,0x2a9a60,.4,.24],[-.02,0x3a68d0,.52,.2],[.58,0xe89020,.38,.23],[1.18,0x8a50b8,.48,.2]].forEach(([x,c,hh,r])=>flasche(x,1.43,c,hh,r));
      [[-1.15,0x30a8c0,.4,.23],[-.55,0xd83a40,.5,.19],[.05,GELB,.36,.25],[.68,0x2a9a60,.5,.19],[1.2,0x8a4a1e,.4,.2]].forEach(([x,c,hh,r])=>flasche(x,2.38,c,hh,r)); } },
  { x:-14.4, z:HINTEN, wand:'hinten', steh:[-14.4,-11.6], kasten:[3.0,.5], treffer:[2.8,2.5,.6], trefferY:1.35, baue(g){ /* 6 Plakat mit Anleitung */
      box(g,2.74,2.36,.08,PFLAUME,0,2.55,.07);
      const tex=bild(512,440,(c)=>{ c.fillStyle='#fff6e0'; c.fillRect(0,0,512,440); c.fillStyle='#8e1e28'; c.fillRect(0,0,512,84);
        c.fillStyle='#ffffff'; c.font='700 46px Andika, Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('So geht’s',256,44);
        [['#f46a8a','Entwickeln'],['#f8c828','Spülen'],['#48a8e8','Trocknen']].forEach((s,i)=>{ const y=145+i*108; c.fillStyle=s[0]; c.beginPath(); c.arc(72,y,42,0,7); c.fill();
          c.fillStyle='#2a1420'; c.textAlign='center'; c.font='700 46px Andika, Arial, sans-serif'; c.fillText(String(i+1),72,y+2); c.textAlign='left'; c.font='700 44px Andika, Arial, sans-serif'; c.fillText(s[1],140,y-6);
          c.fillStyle='#b89aa0'; c.fillRect(140,y+30,320-i*50,8); }); });
      papier(g,tex,2.56,2.2,0,2.55,.13);
      [-1.18,1.18].forEach(x=>[1.55,3.55].forEach(y=>ball(g,.085,GOLD,x,y,.16,1,1,.6))); } },
  { x:-4.7, z:3.4, steh:[-4.7,5.6], r:1.05, treffer:[2.2,2.2,1.8], baue(g){ /* 7 Fotoalbum auf dem Hocker */
      walze(g,.75,.18,0xe0a050,0,.96,0); liegend(ring(g,.75,.06,HOLZ2,0,.96,0)); walze(g,.55,.1,HOLZ2,0,.84,0);
      [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78; strich(g,[Math.cos(a)*.4,.84,Math.sin(a)*.4],[Math.cos(a)*.72,.04,Math.sin(a)*.72],.085,HOLZ); }); liegend(ring(g,.58,.04,HOLZ2,0,.34,0));
      const a=gruppe(g,0,1.36,0); a.rotation.x=.42;
      [-1,1].forEach(s=>{ const f=gruppe(a,s*.5,0,0); f.rotation.z=s*.1; box(f,1.02,.1,1.3,0x2a5aa8,0,-.02,0); box(f,.92,.1,1.18,CREME,-s*.02,.06,0);
        [-.28,.28].forEach((v,i)=>{ const p=papier(f,fotoBild(s<0?(i?2:1):(i?4:0)),.46,.46,s*(i?-.08:.08),.118,v); p.rotation.x=-Math.PI/2; p.rotation.z=(i?-1:1)*.14*s; });
        [-.56,.56].forEach(v=>ball(f,.08,GOLD,s*.45,.02,v,1,.6,1)); });
      walze(a,.065,1.32,GOLD,0,.05,0).rotation.x=Math.PI/2; box(a,.13,.03,.45,ROT,.05,.1,.78);
      /* Stütze unter dem Album */
      box(g,1.3,.34,.2,HOLZ,0,1.17,-.35); } },
  { x:15.6, z:-6.0, dreh:-Math.PI/2+.35, steh:[13.4,-6.0], kasten:[2.4,3.4], treffer:[3.0,3.5,1.4], baue(g){ /* 8 Schrank mit Fotopapier */
      const holz=0xd8a060;
      box(g,2.9,3.3,.1,HOLZ2,0,1.65,-.55); [-1.4,1.4].forEach(x=>box(g,.14,3.3,1.15,holz,x,1.65,0)); box(g,3.1,.18,1.32,HOLZ,0,3.38,0); box(g,2.94,.14,1.15,HOLZ,0,.14,0);
      box(g,2.66,1.35,1.05,holz,0,.88,-.04); [-.66,.66].forEach(x=>{ box(g,1.22,1.12,.06,HOLZ,x,.9,.52); box(g,.94,.84,.06,holz,x,.9,.54); ball(g,.1,MESSING,x*.2,.95,.62); });
      [1.62,2.5].forEach(y=>box(g,2.7,.1,1.12,HOLZ,0,y,0));
      /* Packungen mit Fotopapier, aufrecht und liegend, mit Bild-Etikett */
      const packung=(x,y,b,hh,c)=>{ box(g,b,hh,.36,c,x,y+hh/2,.22); box(g,b*.74,hh*.46,.02,CREME,x,y+hh*.5,.41); ball(g,hh*.12,0xf8b020,x-b*.2,y+hh*.57,.425,1,1,.2); kegel(g,hh*.18,hh*.24,GRUEN,x+b*.1,y+hh*.44,.425).scale.z=.02; box(g,b+.01,.07,.37,SCHWARZ,x,y+hh*.88,.22); };
      [[-.88,.72,.66,0xf4a020],[-.06,.78,.56,ROT],[.82,.74,.7,0x2a70c0]].forEach(([x,b,hh,c])=>packung(x,1.67,b,hh,c));
      [[-.62,1.1,.6,0x2a9a60],[.66,1.0,.52,0xf4a020]].forEach(([x,b,hh,c])=>packung(x,2.55,b,hh,c));
      /* weiße Bögen schauen aus der offenen Packung */
      [0,1,2].forEach(i=>{ const q=box(g,.52,.5,.025,WEISS,-.58+i*.09,3.13,.2-i*.06); q.rotation.z=-.08+i*.09; });
      box(g,1.6,.28,.05,CREME,0,3.38,.69); [-.5,0,.5].forEach((x,i)=>box(g,.3,.18,.03,[ROT,GELB,BLAU][i],x,3.38,.72)); } },
  { x:4.9, z:2.2, steh:[4.9,4.5], r:1.1, treffer:[2.3,3.4,1.8], baue(g,k){ /* 9 Großer Wecker mit zwei Glocken auf einem Tischchen */
      walze(g,.95,.14,0xe8b868,0,.98,0); liegend(ring(g,.95,.06,HOLZ2,0,.98,0)); walze(g,.15,.84,HOLZ,0,.49,0); walze(g,.62,.14,HOLZ2,0,.08,0); ball(g,.24,HOLZ,0,.55,0,1,.7,1);
      const w=gruppe(g,0,1.05,0); w.userData.lebendig=true; const u=gruppe(w,0,0,0), Y=.98;
      [-1,1].forEach(s=>{ strich(u,[s*.42,.42,0],[s*.62,.06,.08],.09,CHROM); ball(u,.12,CHROM,s*.62,.07,.08); });
      scheibe(u,.8,.46,ROT,0,Y,0); ring(u,.75,.09,CHROM,0,Y,.23); scheibe(u,.7,.04,CREME,0,Y,.25);
      for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(u,i%3?.035:.065,SCHWARZ,Math.sin(a)*.55,Y+Math.cos(a)*.55,.285,1,1,.4); }
      [-1,1].forEach(s=>{ const gl=gruppe(u,s*.58,Y+.8,0); gl.rotation.z=-s*.55; const m=new THREE.Mesh(new THREE.SphereGeometry(.38,18,10,0,Math.PI*2,0,Math.PI*.5),mat(GOLD,{side:THREE.DoubleSide})); m.castShadow=true; gl.add(m); liegend(ring(gl,.38,.035,MESSING2,0,0,0)); ball(gl,.09,CHROM,0,.42,0); strich(gl,[0,0,0],[0,-.18,0],.07,STAHL2); });
      const bg=ring(u,.5,.055,CHROM,0,Y+.8,0,Math.PI); bg.scale.y=.9;
      walze(u,.035,.46,STAHL2,0,Y+.95,0); ball(u,.12,STAHL2,0,Y+1.18,0);
      const min=gruppe(w,0,Y,.31); box(min,.06,.52,.025,SCHWARZ,0,.22,0);
      const std=gruppe(w,0,Y,.33); box(std,.09,.36,.025,SCHWARZ,0,.14,0);
      const sek=gruppe(w,0,Y,.35); box(sek,.025,.55,.015,ROT,0,.2,0); ball(sek,.07,GOLD,0,0,.01,1,1,.5);
      [min,std,sek].forEach(z=>z.userData.lebendig=true); verschmelze(u);
      k.anim.push(t=>{ sek.rotation.z=-Math.floor(t)*Math.PI/30*5; min.rotation.z=-1.05-t*.05; std.rotation.z=1.05-t*.004; const a=t%6; w.rotation.z=a<.8?Math.sin(t*42)*.045:0; }); } },
  { x:-11.8, z:5.4, steh:[-11.8,7.7], kasten:[2.7,2.1], treffer:[2.6,3.5,2.0], baue(g,k){ /* 10 Foto-Vergrößerer: breites Grundbrett mit Fotoblatt im Rahmen, Säule, kleiner Kopf leuchtet nach unten */
      tisch(g,2.4,1.9,.95,0x9a5a78,PFLAUME); box(g,2.0,.1,1.4,PFLAUME,0,.34,0);
      /* Grundbrett mit hellem Holz und dunklem Rand */
      box(g,2.5,.14,1.95,PFLAUME,0,1.02,0); box(g,2.3,.1,1.75,0xffd078,0,1.1,0);
      /* Fotoblatt im dicken Rahmen */
      box(g,1.62,.025,1.2,WEISS,0,1.16,.24); const bl=papier(g,fotoBild(4),1.3,.9,0,1.18,.24); bl.rotation.x=-Math.PI/2;
      [-.37,.85].forEach(z=>box(g,1.86,.12,.15,SCHWARZ,0,1.21,z)); [-.86,.86].forEach(x=>box(g,.15,.12,1.36,SCHWARZ,x,1.21,.24)); [-.86,.86].forEach(x=>[-.37,.85].forEach(z=>ball(g,.08,GOLD,x,1.29,z,1,.6,1)));
      /* Säule */
      walze(g,.24,.18,STAHL2,0,1.24,-.67); walze(g,.11,2.05,CHROM,0,2.2,-.67); ball(g,.15,PFLAUME,0,3.24,-.67);
      for(let i=0;i<6;i++) box(g,.07,.04,.05,STAHL2,0,1.55+i*.24,-.55);
      /* Arm mit Stellrad */
      walze(g,.19,.32,VIOLETT,0,2.72,-.67); box(g,.17,.17,.75,VIOLETT,0,2.72,-.28); quer(walze(g,.05,.36,GOLD,.28,2.72,-.67)); quer(walze(g,.14,.09,GOLD,.47,2.72,-.67));
      /* kleiner Kopf mit Balgen und Linse */
      walze(g,.34,.46,CREME,0,2.72,.2); [2.52,2.93].forEach(y=>liegend(ring(g,.34,.045,VIOLETT,0,y,.2))); ball(g,.32,VIOLETT,0,2.95,.2,1,.65,1); walze(g,.09,.14,GOLD,0,3.2,.2);
      [0,1,2].forEach(i=>walze(g,.27-i*.045,.1,i%2?0xc8a8e0:VIOLETT,0,2.44-i*.1,.2));
      walze(g,.13,.14,GOLD,0,2.12,.2); walze(g,.1,.03,basis(0xfff4b0),0,2.04,.2);
      /* Lichtkegel */
      const m=basis(0xfff2a8,{transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide});
      const kg=rohr(g,.11,.58,.8,m,0,1.63,.22,22,true); kg.castShadow=false; kg.receiveShadow=false;
      const gl=schein(g,'rgba(255,240,160,.55)',0,1.32,.45,.9); k.anim.push(t=>{ m.opacity=.25+Math.sin(t*1.8)*.07; gl.material.opacity=.65+Math.sin(t*1.8)*.25; }); } }
];

return { titel:'Die Dunkelkammer', breite:36, tiefe:27, oben:['52,14,34','128,52,82','204,118,142'], baue, gegenstaende, verstecke };
})();

/* Raum 4: Der Hinterhof bei Nacht. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Straßenlaterne) und 10 (Gartenbank) sind neu.
   Ausgang: die Feuerleiter an der Rückwand. Die hochgezogene untere Leiter fährt herunter, die Figur klettert hinauf. */
RAEUME3D.detektiv[3] = (function(){
const { GOLD, WEISS, SCHWARZ, PAPIER, PAPIER2, zahlenschloss, mauer, viele } = DET;
const B=36, T=27, Q=Math.PI/2;
const EX=0;                         /* Mitte der Feuerleiter: in der freien Mitte zwischen den Kopfleisten */
const LEITERZ=-12.3;                /* Ebene der beweglichen Leiter, vor dem Podest */
const HIMMEL=0x2b3f74;
const HAUSH=5.6, MAUERH=2.9, SEITEH=4.2;
const HOLZ=0x9a6a3c, HOLZ2=0x6a4424, EISEN=0x39414e, EISEN2=0x242a34, STAHL=0xb4c6da, STAHL2=0x8295ac;
const ZIEGEL=0x9a5a58, STEIN=0xb4aeb8, STEIN2=0x807a8a, LAUB=0x4a7a52, LAUB2=0x65945e, ROT=0xd2483c;
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const warm=()=>mat(0xffd684,{emissive:0xc08a30});   /* beleuchtete Fensterscheiben */
const dunkelglas=()=>mat(0x54699c,{emissive:0x18223c});
const grob=()=>new THREE.IcosahedronGeometry(1,0);   /* 20 Dreiecke je Blatt, Stein oder Blüte */

/* ausgeschnittene Platte mit Dicke (Punkte in x/y, Dicke nach +z) */
function platte(par,punkte,tiefe,farbe,x,y,z){
  const f=new THREE.Shape(); punkte.forEach((p,i)=>{ if(i) f.lineTo(p[0],p[1]); else f.moveTo(p[0],p[1]); });
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tiefe,bevelEnabled:false}),typeof farbe==='number'?mat(farbe):farbe); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}
/* Fläche mit gemaltem Bild, Blick nach +z */
function bildFlaeche(par,w,h,textur,x,y,z){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:textur,transparent:true,emissive:0x1a1a1a})); m.position.set(x,y,z); par.add(m); return m;
}

/* ---------- Bilder: Pflaster und Backstein ---------- */
function pflasterBild(){
  return bild(512,512,g=>{ g.fillStyle='#4a4c66'; g.fillRect(0,0,512,512);
    const n=10, s=512/n;
    for(let r=0;r<n;r++) for(let i=0;i<n;i++){
      const v=Math.floor(zufall()*30)-15, x=i*s+(r%2)*s/2+s/2+(zufall()-.5)*4, y=r*s+s/2+(zufall()-.5)*4, a=s*.45+zufall()*2, b=s*.43+zufall()*2, art=zufall();
      const F=art<.2?[146,134,150]:art<.4?[124,132,164]:[136,140,166];
      const mal=xx=>{ const stein=(dx,dy,w,h,f)=>{ g.fillStyle=f; g.beginPath(); const l=xx+dx-w, o=y+dy-h, q=14; g.moveTo(l+q,o); g.arcTo(l+2*w,o,l+2*w,o+2*h,q); g.arcTo(l+2*w,o+2*h,l,o+2*h,q); g.arcTo(l,o+2*h,l,o,q); g.arcTo(l,o,l+2*w,o,q); g.fill(); };
        stein(1,2,a,b,'#33354c'); stein(0,0,a-1,b-1,'rgb('+(F[0]+v)+','+(F[1]+v)+','+(F[2]+v)+')'); stein(-3,-4,a*.55,b*.45,'rgba(205,220,255,.17)'); };
      mal(x); if(x+a>512) mal(x-512); }
  });
}
function backsteinBild(){
  return bild(512,512,g=>{ g.fillStyle='#8a7c8c'; g.fillRect(0,0,512,512);
    for(let r=0;r<16;r++){ for(let i=-1;i<8;i++){ const x=i*64+(r%2)*32, v=Math.floor(zufall()*28)-14, art=((i+8)%8*5+r*3)%11;
      const F=art===0?[128,74,86]:art===5?[178,110,92]:[156,90,86];
      const w=((i+8)%8*7+r*13)%9-4;
      g.fillStyle='rgb('+(F[0]+w*2)+','+(F[1]+w)+','+(F[2]+w)+')'; g.fillRect(x+2,r*32+2,60,28);
      g.fillStyle='rgba(255,225,225,.13)'; g.fillRect(x+2,r*32+2,60,3); g.fillStyle='rgba(30,10,30,.2)'; g.fillRect(x+2,r*32+26,60,4);
      if(v>8){ g.fillStyle='rgba(40,16,34,.14)'; g.fillRect(x+10,r*32+8,26,12); } } }
  });
}

/* ---------- Licht und Boden ---------- */
function boden(k){
  const sc=k.scene;
  sc.background=new THREE.Color(HIMMEL);
  sc.add(new THREE.HemisphereLight(0xc2d2ff,0x76606a,.82));
  const mond=new THREE.DirectionalLight(0xb4caff,.48); mond.position.set(9,24,6); mond.castShadow=true; mond.shadow.mapSize.set(2048,2048);
  const c=mond.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; mond.shadow.bias=-.001; sc.add(mond);
  const t=pflasterBild(); t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const m=new THREE.MeshLambertMaterial({map:t}), aussen=new THREE.MeshLambertMaterial({map:t,color:0x9a9ab4});
  /* Texturkoordinaten aus der Raumlage, damit die Steine überall gleich groß sind (eine Kachel = 6) */
  const flaeche=(x1,x2,z1,z2,mm,fein)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/fein)),Math.max(1,Math.round((z2-z1)/fein))), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,(x1+uv.getX(i)*(x2-x1))/6,(-z2+uv.getY(i)*(z2-z1))/6);
    const f=new THREE.Mesh(geo,mm); f.rotation.x=-Math.PI/2; f.position.set((x1+x2)/2,0,(z1+z2)/2); f.receiveShadow=true; sc.add(f); };
  flaeche(-18.5,18.5,-14,13.5,m,.6);
  flaeche(-18.5,18.5,13.5,48,aussen,2.5);
  flaeche(-64,-18.5,-14,48,aussen,2.5);
  flaeche(18.5,64,-14,48,aussen,2.5);
}

/* ---------- Himmel hinter der Rückwand: Mond, Sterne, ferne Häuser ---------- */
function himmel(k){
  const sc=k.scene;
  const mt=bild(256,128,g=>{ g.fillStyle='#fff4c4'; g.fillRect(0,0,256,128); g.fillStyle='rgba(214,190,128,.55)';
    [[40,40,13],[70,82,9],[96,48,7],[56,66,5],[190,50,14],[220,90,8],[140,30,6]].forEach(([x,y,r])=>{ g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }); });
  const mg=gruppe(sc,3.25,3.76,-14.9);
  const m=new THREE.Mesh(new THREE.SphereGeometry(.64,24,18),basis(0xffffff,{map:mt})); m.rotation.y=-1.1; mg.add(m);
  const hof=schein(mg,'rgba(220,232,255,.55)',0,0,-.2,3.6);
  k.anim.push(t=>{ const s=3.6+Math.sin(t*.7)*.25; hof.scale.set(s,s,1); });
  /* Sterne: weit hinter dem Hof */
  const sterne=(n,gr,farbe,phase)=>{ const P=new Float32Array(n*3); for(let i=0;i<n;i++){ P[i*3]=-48+zufall()*96; P[i*3+1]=-3+zufall()*22; P[i*3+2]=-30-zufall()*16; }
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.BufferAttribute(P,3));
    const mm=new THREE.PointsMaterial({map:leuchtBild(farbe),size:gr,transparent:true,depthWrite:false});
    const p=new THREE.Points(geo,mm); p.frustumCulled=false; sc.add(p); k.anim.push(t=>{ mm.opacity=.75+Math.sin(t*1.3+phase)*.25; }); };
  sterne(110,.5,'rgba(255,255,255,1)',0); sterne(50,.85,'rgba(255,240,190,1)',2.4);
  /* Häuser der Nachbarschaft, tiefer gelegen */
  const haus=[], dach=[], fenster=[];
  const F=[0x34406a,0x3e4676,0x2e3a62];
  const baue=(x,z,br,top,i)=>{ const h=top+9; haus.push([x,-9+h/2,z,br,h,2.4,F[i%3],0]);
    if(i%3) dach.push([x,top+.4,z,br*.72,.8,1.8,0x262e52,0]); else haus.push([x+br*.22,top+.35,z,.4,.8,.4,0x262e52,0]);
    for(let r=0;r<3;r++) for(let s=0;s<Math.max(1,Math.floor(br/1.1));s++) if((s*3+r*5+i)%4<2) fenster.push([x-br/2+(s+.5)*br/Math.max(1,Math.floor(br/1.1)),top-.6-r*1.15,z+1.23,.36,.5,.05,(s+r+i)%5?0xffc860:0xfff0b0,0]); };
  for(let i=0,x=-34;x<=34;i++){ const br=2.4+zufall()*2; baue(x+br/2,-22-(i%3)*2.4,br,-.2+zufall()*1.4,i); x+=br+.3; }
  [-1,1].forEach(v=>[21.5,26,31,37].forEach((x,i)=>baue(v*x,-16.5-(i%2)*2,3.6,1.6+zufall()*2.2,i+(v>0?1:0))));
  viele(sc,GEO.box,haus); viele(sc,new THREE.ConeGeometry(1,1,4,1,false,Math.PI/4),dach);
  const fm=viele(sc,GEO.box,fenster); fm.material.dispose(); fm.material=new THREE.MeshBasicMaterial({color:0xffffff});
}

/* ---------- Fenster in der Hauswand, Blick nach +z, Mitte bei (x,y,z) ---------- */
function fenster(par,x,y,z,b,h,an,laden){
  const g=gruppe(par,x,y,z);
  box(g,b+.3,h+.3,.1,STEIN,0,0,0); box(g,b,h,.06,an?warm():dunkelglas(),0,0,.05);
  box(g,.08,h,.05,HOLZ2,0,0,.09); box(g,b,.08,.05,HOLZ2,0,h*.12,.09);
  box(g,b+.5,.14,.36,STEIN2,0,-h/2-.18,.12); box(g,b+.4,.18,.2,STEIN2,0,h/2+.2,.06);
  if(an){ [-1,1].forEach(s=>{ platte(g,[[0,h/2],[s*b*.34,h/2],[s*b*.1,h*.02],[s*b*.04,-h/2],[0,-h/2]],.02,0xd8705a,-s*b/2,0,.075); }); }
  else strich(g,[-b*.34,-h*.3,.09],[-b*.08,h*.02,.09],.025,0xaec4f0);
  if(laden) [-1,1].forEach(s=>{ const l=gruppe(g,s*(b/2+.42),0,.08); box(l,.5,h+.1,.08,laden,0,0,0); [-.3,-.1,.1,.3].forEach(v=>box(l,.38,.05,.04,0x24404a,0,v*h,.05)); });
  return g;
}
/* Fallrohr an der Wand */
function fallrohr(par,x,z,h){ walze(par,.1,h,STAHL2,x,h/2,z); [.5,h*.55,h-.3].forEach(y=>box(par,.3,.1,.16,EISEN,x,y,z-.04)); box(par,.34,.22,.3,EISEN,x,h,z); }
/* Efeu als viele kleine Blätter. fl: Funktion(u,v) -> Punkt an der Wand */
function efeu(liste,n,fl,br,h){
  for(let i=0;i<n;i++){ const v=zufall(), u=(zufall()-.5)*br*(1-v*.65)+Math.sin(v*7)*.25, p=fl(u,v*h), s=.11+zufall()*.1;
    liste.push([p[0],p[1],p[2],s,s*.8,s*.6,[LAUB,LAUB2,0x3c6a4a,0x87a05a][i%4],zufall()*3,zufall(),zufall()]); }
}

/* ---------- Wände ---------- */
function waende(k){
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), zt=backsteinBild();
  const ZH=-T/2-.25, F=-T/2;
  /* Rückwand: zwei Häuser, dazwischen eine niedrige Hofmauer (darüber der Mond) */
  const L=1.9, R=6.4;
  mauer(hinten,zt,L+18.5,HAUSH,.5,(-18.5+L)/2,HAUSH/2,ZH);
  mauer(hinten,zt,R-L,MAUERH,.5,(L+R)/2,MAUERH/2,ZH);
  mauer(hinten,zt,18.5-R,HAUSH,.5,(R+18.5)/2,HAUSH/2,ZH);
  const h=gruppe(hinten,0,0,0);
  box(h,R-L,.16,.74,STEIN,(L+R)/2,MAUERH+.07,ZH);
  [[-18.5,L],[R,18.5]].forEach(([a,b])=>{ box(h,b-a,.26,.8,STEIN2,(a+b)/2,HAUSH+.1,ZH); const n=Math.round((b-a)/.62); for(let i=0;i<n;i++) box(h,(b-a)/n-.08,.16,.95,i%2?0x5a5276:0x6a5e86,a+(i+.5)*(b-a)/n,HAUSH+.3,ZH); });
  [L-.16,R+.16].forEach(x=>{ for(let i=0;i<9;i++) box(h,i%2?.42:.34,.5,.1,STEIN2,x,.3+i*.62,F+.02); });
  [-15.5,-9,10.5,15].forEach((x,i)=>{ box(h,.62,1.1,.5,ZIEGEL,x,HAUSH+.8,ZH); box(h,.8,.16,.66,STEIN2,x,HAUSH+1.4,ZH); });
  box(h,36,.34,.14,STEIN2,0,.17,F+.04);
  /* Fenster: unten warm leuchtend, oben gemischt */
  fenster(h,-15.3,2.05,F+.04,1.3,1.5,true,0x3f7a74);
  fenster(h,-7.7,2.05,F+.04,1.3,1.5,true,0x3f7a74);
  fenster(h,-4.2,2.05,F+.04,1.1,1.4,false,0x3f7a74);
  fenster(h,13.6,2.05,F+.04,1.4,1.5,true,0x8a5a8a);
  fenster(h,16.4,2.05,F+.04,1.1,1.5,false);
  [[-15.3,false],[-11.5,true],[-7.7,false],[10,true],[13.6,false],[16.4,true]].forEach(([x,an])=>fenster(h,x,4.35,F+.04,1.1,1.2,an));
  fallrohr(h,-17.4,F+.16,HAUSH); fallrohr(h,7.1,F+.16,HAUSH);
  /* Blumenkästen */
  [-15.3,-7.7,13.6].forEach(x=>{ box(h,1.7,.22,.34,HOLZ2,x,.98,F+.3); for(let i=0;i<7;i++){ ball(h,.13,LAUB2,x-.66+i*.22,1.14,F+.34); ball(h,.075,i%2?0xf07aa0:0xffc84a,x-.66+i*.22,1.26,F+.4); } });
  verschmelze(h); ohneSchatten(h);
  const blatt=[];
  efeu(blatt,150,(u,v)=>[5.3+u*.85,v+.1,F+.08+zufall()*.1],2,2.9);
  efeu(blatt,150,(u,v)=>[17.3+u*.5,v+.1,F+.08+zufall()*.1],2,4.6);
  for(let i=0;i<34;i++){ const x=4.4+zufall()*(R-4.6); blatt.push([x,MAUERH+.1-zufall()*zufall()*.8,F+.1,.13,.1,.08,i%2?LAUB:LAUB2,i,0,i]); }
  viele(hinten,grob(),blatt);
  /* Seitenwände mit Fenstern, Dachkante und Lichterkette */
  [[links,-1],[rechts,1]].forEach(([w,v])=>{
    mauer(w,zt,.5,SEITEH,T+.5,v*(B/2+.25),SEITEH/2,-.25);
    const g=gruppe(w,0,0,0), X=v*B/2;
    box(g,.8,.26,T+.6,STEIN2,v*(B/2+.25),SEITEH+.1,-.25);
    for(let i=0;i<43;i++) box(g,.95,.16,.56,i%2?0x5a5276:0x6a5e86,v*(B/2+.25),SEITEH+.3,-13.2+i*.62);
    box(g,.14,.34,T,STEIN2,X-v*.04,.17,0);
    [[-9.4,true],[-3.8,false],[2.6,true],[8.6,v<0]].forEach(([z,an])=>{ const f=fenster(g,X-v*.04,2.1,z,1.3,1.45,an,v<0?0x3f7a74:0x8a5a8a); f.rotation.y=-v*Q; });
    [-12.2,11.6].forEach(z=>{ walze(g,.1,SEITEH,STAHL2,X-v*.16,SEITEH/2,z); box(g,.3,.22,.34,EISEN,X-v*.16,SEITEH,z); });
    verschmelze(g); ohneSchatten(g);
    /* Lichterkette unter der Dachkante */
    const birnen=[], kabel=gruppe(w,0,0,0);
    for(let s=0;s<5;s++){ const z0=-12.6+s*5; let alt=null; for(let j=0;j<=10;j++){ const z=z0+j*.5, y=3.9-Math.sin(j/10*Math.PI)*.45, p=[X-v*.14,y,z]; if(alt) strich(kabel,alt,p,.018,EISEN2); alt=p; if(j%2) birnen.push([X-v*.15,y-.13,z,.09,.12,.09,[0xffe080,0xff9a70,0xa8e8ff,0xc8f090][(j+s)%4],0]); } }
    verschmelze(kabel); ohneSchatten(kabel);
    const bm=viele(w,grob(),birnen); bm.material.dispose(); bm.material=new THREE.MeshBasicMaterial({color:0xffffff});
    const e=[]; [[-12.6,1.6,3.4],[5.6,1.8,2.6],[12.4,1.8,3.2]].forEach(([z,br,ho])=>efeu(e,110,(u,y)=>[X-v*(.08+zufall()*.12),y+.1,z+u],br,ho));
    viele(w,grob(),e);
  });
  return { hinten, links, rechts };
}

/* ---------- Ausgang: Feuerleiter ---------- */
function feuerleiter(k,hinten){
  const F=-T/2, PY=3.0, OG=PY+2.8, fest=gruppe(hinten,EX,0,0);
  /* Podest aus Gitterstäben, endet hinter der Leiter */
  const VORN=-12.45;
  box(fest,3.5,.12,.14,STAHL,0,PY,VORN-.07); box(fest,3.5,.12,.12,STAHL2,0,PY,F+.1);
  for(let i=0;i<=17;i++) box(fest,.09,.07,VORN-F-.1,STAHL2,-1.7+i*.2,PY,(F+VORN)/2);
  /* Stützen an die Wand */
  [-1.6,1.6].forEach(x=>{ strich(fest,[x,PY-.05,VORN-.1],[x,PY-1.35,F+.08],.075,STAHL2); box(fest,.22,.3,.12,EISEN,x,PY-1.35,F+.08); box(fest,.22,.3,.12,EISEN,x,PY,F+.08); });
  /* Geländer, in der Mitte offen für die Leiter */
  [-1,1].forEach(s=>{ [.85,1.25].forEach(x=>walze(fest,.045,1.1,STAHL,s*x,PY+.55,VORN-.08)); walze(fest,.05,1.1,STAHL,s*1.7,PY+.55,VORN-.08); walze(fest,.05,1.1,STAHL,s*1.7,PY+.55,F+.12);
    box(fest,.9,.09,.09,STAHL,s*1.28,PY+1.12,VORN-.08); box(fest,.09,.09,VORN-F-.1,STAHL,s*1.7,PY+1.12,(F+VORN)/2); });
  /* Treppe weiter nach oben zum zweiten Podest */
  const z=-13.0;
  [-.28,.28].forEach(d=>strich(fest,[-.9,PY+.05,z+d],[-4.1,OG,z+d],.07,STAHL2));
  for(let i=1;i<9;i++) box(fest,.4,.07,.62,STAHL,-.9-i*.355,PY+.05+i*.295,z);
  strich(fest,[-.9,PY+1.05,z+.32],[-4.1,OG+1,z+.32],.045,STAHL);
  box(fest,2.2,.12,1,STAHL2,-5.1,OG,-13.0); for(let i=0;i<=5;i++) walze(fest,.045,.9,STAHL,-6.15+i*.42,OG+.45,-12.55); box(fest,2.2,.08,.08,STAHL,-5.1,OG+.92,-12.55);
  /* Führungsschienen der unteren Leiter */
  [-.82,.82].forEach(x=>{ box(fest,.14,.5,.34,EISEN,x,PY+.1,LEITERZ-.07); box(fest,.1,.1,.2,EISEN,x*.9,PY+.28,LEITERZ); });
  /* helle Tür-freie Trittplatte am Boden unter der Leiter */
  box(fest,2,.05,.9,STEIN2,0,.025,-12.35); [-.6,-.2,.2,.6].forEach(x=>box(fest,.1,.02,.7,STAHL2,x,.056,-12.35));
  verschmelze(fest);
  /* bewegliche Leiter: oben (zu) hängt sie bei 2.2, unten (offen) steht sie auf dem Boden */
  const OBEN=2.2, UNTEN=.12, SY=1.4;   /* SY: Höhe des Zahlenschlosses */
  const leiter=gruppe(hinten,EX,OBEN,LEITERZ); leiter.userData.lebendig=true;
  [-.62,.62].forEach(x=>{ walze(leiter,.075,4.3,STAHL,x,2.15,0); ball(leiter,.1,GOLD,x,4.33,0); ball(leiter,.1,EISEN,x,0,0); });
  for(let i=0;i<11;i++) walze(leiter,.058,1.24,i?STAHL:GOLD,0,.1+i*.4,0).rotation.z=Q;
  verschmelze(leiter);
  /* goldenes Zahlenschloss an einer Kette, hängt an der untersten Sprosse */
  const sperre=gruppe(hinten,EX,0,0); sperre.userData.lebendig=true;
  const schloss=zahlenschloss(sperre,0,SY,LEITERZ+.14); schloss.scale.setScalar(1.3); verschmelze(schloss);
  strich(sperre,[0,SY+.6,LEITERZ+.04],[0,OBEN+.1,LEITERZ],.05,GOLD);
  [-1,1].forEach(s=>{ const a=[s*.55,SY,LEITERZ+.08], b=[s*1.35,SY-.7,F+.1]; for(let i=0;i<9;i++){ const u=(i+.5)/9, m=ring(sperre,.09,.028,0x9aa6b8,a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u-Math.sin(u*Math.PI)*.12,a[2]+(b[2]-a[2])*u); m.rotation.set(i%2?Q*.6:0,i%2?0:.5,s*-.7); } box(sperre,.3,.3,.14,EISEN,b[0],b[1],b[2]); });
  verschmelze(sperre);
  const glimmen=schein(hinten,'rgba(255,214,110,.5)',EX,SY+.05,LEITERZ+.4,2);
  k.kasten(EX,-12.7,4,1.6);
  let tuer=null;
  tuer=ausgang(k,{ steh:[EX-1.1,-10.7], durch:[EX,-11.82], hoch:2.8, treffer:{x:EX,y:2.5,z:-12.4,b:3.6,h:4.8,t:1}, name:'Feuerleiter', einfach:'Leiter aus Metall',
    schildOben:[EX,4,-11.9], glanz:[EX,SY+.05,-11.9],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,auf*1.5-.05)); leiter.position.y=OBEN+(UNTEN-OBEN)*a*a*(3-2*a); sperre.visible=!(tuer&&tuer.offen); glimmen.visible=sperre.visible; glimmen.material.opacity=.6+Math.sin((t||0)*2.4)*.3; } });
  /* Kletterbewegung der Figur, sobald sie auf der Leiter nach oben steigt */
  k.anim.push(t=>{ const f=k.figur&&k.figur(); if(!tuer.offen || !f || !(f.position.y>.05) || !(f.position.y<tuer.hoch-.02)) return; const u=f.userData, s=Math.sin(t*11);
    f.rotation.y=Math.PI; u.armL.rotation.x=-2.4+s*.5; u.armR.rotation.x=-2.4-s*.5; u.beinL.rotation.x=-.45-s*.45; u.beinR.rotation.x=-.45+s*.45; });
  return tuer;
}

/* ---------- Ausstattung: niedrig und am Rand ---------- */
function ausstattung(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  const steine=[], blatt=[], bluete=[], gras=[], laub=[];
  /* Blumenbeete mit Steinrand: [x,z,breite,tiefe] */
  [[-13.5,12.55,6.4,1.3],[-1,12.7,5.2,1.1],[12.5,12.55,6.8,1.3],[-17.25,8.6,1.1,4.6],[17.25,-8.6,1.1,5.4],[-17.25,-9.4,1.1,4.4],[4.4,-12.9,3.4,.85]].forEach(([x,z,br,ti],n)=>{
    box(g,br,.14,ti,0x5a4038,x,.07,z); k.kasten(x,z,br,ti);
    const nx=Math.round(br/.45), nz=Math.round(ti/.45);
    for(let i=0;i<=nx;i++) [-1,1].forEach(s=>steine.push([x-br/2+i*br/nx,.12,z+s*ti/2,.24,.18,.2,i%2?STEIN:STEIN2,i+n]));
    for(let i=1;i<nz;i++) [-1,1].forEach(s=>steine.push([x+s*br/2,.12,z-ti/2+i*ti/nz,.2,.18,.24,i%2?STEIN2:STEIN,i]));
    const m=Math.round(br*ti*5);
    for(let i=0;i<m;i++){ const px=x+(zufall()-.5)*(br-.5), pz=z+(zufall()-.5)*(ti-.45), s=.16+zufall()*.14;
      blatt.push([px,.2+s*.4,pz,s,s*.85,s,i%3?LAUB:LAUB2,i,0,0]);
      if(i%3===0){ const f=[0xffffff,0xf488b0,0xffc84a,0xb89cf0][(i/3+n)%4|0]; bluete.push([px+.05,.34+s*1.2,pz+.05,.1,.08,.1,f,0]); bluete.push([px+.05,.4+s*1.2,pz+.05,.045,.04,.045,0xf8a020,0]); } } });
  /* kleiner Herbstbaum vorn rechts und links hinten in der Ecke */
  [[16.2,9.2,1],[-16.4,-6.2,.9]].forEach(([x,z,s],n)=>{ const b=gruppe(sc,x,0,z);
    walze(b,.22*s,2.4*s,HOLZ2,0,1.2*s,0); strich(b,[0,1.7*s,0],[-.6*s,2.6*s,.2],.1,HOLZ2); strich(b,[0,2*s,0],[.5*s,2.8*s,-.2],.09,HOLZ2);
    verschmelze(b); const kr=[]; for(let i=0;i<70;i++){ const a=zufall()*6.28, r=Math.sqrt(zufall())*1.25*s, q=.24+zufall()*.2; kr.push([Math.cos(a)*r,(3+(zufall()-.5)*1.2)*s,Math.sin(a)*r,q,q*.8,q,[0xd88a38,0xc4602e,0xe8b04a,0x9a8a3a][i%4],i]); }
    viele(b,grob(),kr); k.kreis(x,z,.5); k.verdecker(b,x,z,1.2*s); });
  /* Kürbisse */
  [[-16.4,12.2,.55],[-15.5,11.1,.36],[8.2,12.4,.45],[16.4,12,.5],[-16.7,2.6,.38]].forEach(([x,z,r],i)=>{
    [-.38,0,.38].forEach(d=>ball(g,r,i%2?0xe8902c:0xf0a23a,x+d*r,r*.7,z+Math.abs(d)*.02,.78,.78,1)); walze(g,r*.12,r*.45,0x5a7a30,x,r*1.55,z); k.kreis(x,z,r*1.1); });
  /* Rundsträucher an den Seiten */
  [[17.2,7.2],[17.25,1.8],[-17.25,4.4],[-17.2,-12.4],[17.2,-12.5],[-12.5,-12.9]].forEach(([x,z],n)=>{ for(let i=0;i<14;i++){ const s=.25+zufall()*.2; blatt.push([x+(zufall()-.5)*.85,.2+zufall()*.65,z+(zufall()-.5)*.7,s,s*.85,s,[LAUB,LAUB2,0x3c6a4a][i%3],i,0,0]); } k.kreis(x,z,.62); });
  /* Abflussrinne und Gitter, flach */
  [-9.5,5.5].forEach(m=>{ box(g,1.7,.018,.7,0x33354c,m,.01,11.15); for(let i=-3;i<=3;i++) box(g,.09,.022,.58,STEIN2,m+i*.23,.016,11.15); });
  verschmelze(g);
  /* Grasbüschel in den Fugen, vor allem am Rand */
  const orte=[[-16,6.4],[-14.6,10],[-9.6,11.9],[-6.4,12.4],[3.4,12],[6,11.6],[9.4,10.4],[14.8,6.2],[15.8,-4.4],[8.8,-12.5],[-9.8,-12.7],[1,-12.5],[-15.8,-.2],[-2.8,10],[11.6,.4],[-12.4,-9.4],[14.6,-11.6],[2.2,6.4]];
  orte.forEach(([x,z])=>{ for(let i=0;i<14;i++){ const px=x+(zufall()-.5)*.7, pz=z+(zufall()-.5)*.45, h=.1+zufall()*.14; gras.push([px,h*.4,pz,.04,h,.04,i%2?0x6a9a62:0x84ac66,zufall()*3,(zufall()-.5)*1.5,(zufall()-.5)*1.5]); } });
  /* Herbstblätter: am Rand dicht, in der Mitte vereinzelt */
  for(let i=0;i<430;i++){ let x=-17.6+zufall()*35.2, z=-13+zufall()*26.4; if(i%3){ if(i%2) x=(i%4<2?-1:1)*(13.4+zufall()*4.2); else z=8+zufall()*5.2; }
    laub.push([x,.022+(i%5)*.003,z,.14,.012,.08,[0xd88a38,0xb85a30,0xe0b048,0x9a7a40][i%4],zufall()*6.3]); }
  /* weiter draußen: Büsche hinter den Seitenwänden und vor dem Hof, damit beim Drehen nichts kahl wirkt */
  for(let i=0;i<150;i++){ const s=.5+zufall()*.8; let x,z; if(i%3===0){ x=-30+zufall()*60; z=17+zufall()*16; } else { x=(i%3===1?-1:1)*(20.4+zufall()*18); z=-12.6+zufall()*34; }
    blatt.push([x,s*.45,z,s,s*.8,s,[0x34585a,0x426a52,0x2c4a58][i%3],i,0,0]); }
  viele(sc,grob(),steine); viele(sc,grob(),blatt); viele(sc,grob(),bluete); viele(sc,GEO.box,gras); viele(sc,grob(),laub);
}
function waescheleine(links){
  const g=gruppe(links,-17.55,0,0);
  strich(g,[0,3.45,-7.6],[0,3.15,-4.4],.02,PAPIER2); strich(g,[0,3.15,-4.4],[0,3.45,-1.2],.02,PAPIER2);
  [-7.6,-1.2].forEach(z=>box(g,.5,.1,.1,EISEN,-.2,3.45,z));
  [[-6.7,0xd8605a,.7,.9],[-5.5,0xf0e8d8,.8,.6],[-4.3,0x5a8ac8,.55,1],[-3,0xe8b84a,.75,.75]].forEach(([z,c,br,h],i)=>{ const y=3.45-.3*(1-Math.abs(z+4.4)/3.2); box(g,.05,h,br,c,0,y-h/2,z); [-1,1].forEach(s=>box(g,.08,.14,.07,HOLZ,0,y,z+s*br*.38)); if(!(i%2)) [-1,1].forEach(s=>box(g,.05,.3,.26,c,0,y-.18,z+s*(br/2+.1))); });
  verschmelze(g); ohneSchatten(g);
}

/* ---------- Hofmitte und Vordergrund: flache Dinge (kein Hindernis) und niedrige Randausstattung ---------- */
/* Pfütze mit unregelmäßigem Rand; mond: zittriges Spiegelbild aus schmalen hellen Streifen */
function pfuetze(g,x,z,b,t,dreh,mond){
  const p=gruppe(g,x,0,z); p.rotation.y=dreh;
  const form=(f,hoehe,farbe)=>{ const pkt=[]; for(let i=0;i<22;i++){ const a=i/22*Math.PI*2, w=f*(1+Math.sin(a*3+x)*.17+Math.sin(a*5+z)*.1); pkt.push([Math.cos(a)*b/2*w,Math.sin(a)*t/2*w]); }
    platte(p,pkt,.006,farbe,0,hoehe,0).rotation.x=-Q; };
  form(1.08,.004,0x42425e);
  form(1,.011,mat(0x3a466c,{emissive:0x080e24})); /* gedeckt, damit die Pfützen nicht wie Gegenstände wirken */
  /* Spiegelbild des Mondes: ein weicher, unregelmäßiger Fleck mit blassem Hof */
  if(mond){ [[.34,.016,mat(0x6c86b8,{emissive:0x1c2c50})],[.2,.021,mat(0xe8e4bc,{emissive:0x77704c})]].forEach(([f,y,m])=>{ const teilp=gruppe(p,b*.12,0,-t*.06); const pkt=[]; for(let i=0;i<14;i++){ const a=i/14*Math.PI*2, w=f*(1+Math.sin(a*4+z)*.13); pkt.push([Math.cos(a)*b/2*w,Math.sin(a)*t/2*w*1.15]); } platte(teilp,pkt,.005,m,0,y,0).rotation.x=-Q; }); }
}
/* Kanaldeckel aus Eisen mit Steinring und Riffelmuster */
function kanaldeckel(g,x,z){
  walze(g,.9,.016,0x2e3044,x,.008,z); walze(g,.76,.03,0x6a6e80,x,.015,z); walze(g,.64,.04,0x4a4e60,x,.02,z);
  for(let i=-2;i<=2;i++) for(let j=-2;j<=2;j++) if(Math.abs(i)+Math.abs(j)<4) box(g,.15,.012,.15,0x80869a,x+i*.22,.043,z+j*.22).rotation.y=Q/2;
  [-1,1].forEach(s=>box(g,.07,.014,.2,0x1c1e2c,x+s*.7,.034,z));
}
function hofmitte(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  pfuetze(g,-3.1,5.2,3,1.9,.25,true);
  pfuetze(g,1.1,-7.2,3.4,1.8,-.15,true);
  pfuetze(g,8.6,5.4,2.4,1.5,.6,false);
  pfuetze(g,-8.4,1.1,2,1.3,-.5,false);
  pfuetze(g,1.8,9.6,2.2,1.3,.1,true);
  kanaldeckel(g,-2.2,-2.4); kanaldeckel(g,8,.9);
  const laub=[], gras=[], pilze=[], stiele=[], punkte=[];
  /* Laubhaufen */
  [[2,6.4,1],[-8.8,-2,.85],[1.4,-.4,.6],[-1,12,.9],[14.6,-1,.8],[-13,9.4,.9],[8,-7.6,.7],[-1.2,7.8,.55]].forEach(([x,z,r],n)=>{
    for(let i=0;i<90;i++){ const a=i*2.4+zufall(), d=zufall()*r, h=(1-d/r)*r*.34;
      laub.push([x+Math.cos(a)*d*1.2,.03+zufall()*h,z+Math.sin(a)*d*.85,.17,.025,.1,[0xe09038,0xc05a2c,0xecbc48,0xa8803c][(i+n)%4],zufall()*6.3,(zufall()-.5)*.8,(zufall()-.5)*.8]); } });
  /* Gras in den Fugen: kurze, gewundene Linien quer über den Hof */
  [[-5.6,1.6,.5],[-1.6,2.2,-.9],[2,.8,.2],[-4.6,-4.6,1.9],[3,-5.8,.7],[7.4,-1.8,-.4],[-3.6,8.2,.1],[2.6,4.2,1.3],[6.2,3.2,.4],[-8,5.6,-1.2],[10.2,7,2.2],[-.6,-9,.1],[-11,-7.6,.9],[4.8,7.6,-.3],[-9.8,8.2,.6],[11.8,-2.8,1.5]].forEach(([x,z,w],n)=>{
    /* drei kleine Büschel mit Lücken statt einer durchgehenden Linie */
    [-.95,.05,.85].forEach((m,j)=>{ for(let i=0;i<7-j;i++){ const u=m+(zufall()-.5)*.55, v=Math.sin(m*2.6+n)*.22+(zufall()-.5)*.14, h=.06+zufall()*.09;
      gras.push([x+Math.cos(w)*u-Math.sin(w)*v,h*.4,z+Math.sin(w)*u+Math.cos(w)*v,.04,h,.04,i%2?0x568a5c:0x74a066,zufall()*3,(zufall()-.5)*1.4,(zufall()-.5)*1.4]); } }); });
  /* rote Pilze in Grüppchen am Rand */
  [[-16.9,6],[-9,12.8],[5.2,12.8],[17,4.4],[17,-2.2],[-17,-1.4]].forEach(([x,z])=>{
    [[0,0,1],[.42,.14,.7],[-.3,.24,.55]].forEach(([dx,dz,s])=>{ const px=x+dx, pz=z+dz; stiele.push([px,.2*s,pz,.09*s,.4*s,.09*s,0xf4ead8,0]); pilze.push([px,.42*s,pz,.27*s,.16*s,.27*s,0xd8483c,0]);
      [[0,.15,0],[.15,.09,.07],[-.13,.1,.09],[.03,.08,-.17],[-.02,.09,.18]].forEach(([a,b,c])=>punkte.push([px+a*s,(.42+b)*s,pz+c*s,.045*s,.03*s,.045*s,0xffffff,0])); });
    k.kreis(x,z,.4); });
  /* Blumentöpfe aus Ton entlang der Seitenwände und vorn */
  const blueten=[];
  [[-17.25,1.2],[17.25,-4.6],[-7.4,12.8],[3.4,12.9],[17.2,6]].forEach(([x,z],n)=>{
    [[0,0,1],[.15,.62,.72]].forEach(([dx,dz,s])=>{ const px=x+(x<-16?-dx:x>16?dx:dz), pz=z+(Math.abs(x)>16?dz:-dx*.4);
      rohr(g,.3*s,.2*s,.46*s,0xc86a44,px,.23*s,pz,12); rohr(g,.34*s,.34*s,.09*s,0xdc8458,px,.47*s,pz,12);
      for(let i=0;i<9;i++){ const a=i*2.4, d=(i%3)*.09*s; blueten.push([px+Math.cos(a)*d,(.58+(i%3?0:.12))*s,pz+Math.sin(a)*d,.13*s,.12*s,.13*s,i%3?LAUB2:[0xf488b0,0xffc84a,0xffffff][n%3],i]); }
      k.kreis(px,pz,.34*s); }); });
  ohneSchatten(g); verschmelze(g);
  viele(sc,GEO.box,laub); viele(sc,GEO.box,gras); viele(sc,GEO.cyl,stiele); viele(sc,grob(),pilze); viele(sc,grob(),punkte); viele(sc,grob(),blueten);
}

/* ---------- Glühwürmchen ---------- */
function gluehwuermchen(k){
  const orte=[[-14,10],[-16,5],[-12,-10],[-9,11],[-1.5,11.5],[3,-10.5],[5.5,-11.5],[1,-9],[9,10.5],[13,9],[16,3],[15,-6],[-15,-3],[7,7],[-3,-6],[12,-4.5],[-8,.5],[2,8.5],[17,-10],[-6,-11]];
  const n=orte.length*2, P=new Float32Array(n*3), geo=new THREE.BufferGeometry(), attr=new THREE.BufferAttribute(P,3); geo.setAttribute('position',attr);
  const punkte=(gr,farbe)=>{ const m=new THREE.PointsMaterial({map:leuchtBild(farbe),size:gr,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}); const p=new THREE.Points(geo,m); p.frustumCulled=false; k.scene.add(p); return m; };
  const hof=punkte(.55,'rgba(200,255,110,.8)'); punkte(.16,'rgba(255,255,210,1)');
  const setze=t=>{ for(let i=0;i<n;i++){ const o=orte[i%orte.length], w=i*1.7; P[i*3]=o[0]+Math.sin(t*(.35+(i%5)*.06)+w)*1.1; P[i*3+1]=1+(i%4)*.4+Math.sin(t*(.8+(i%3)*.2)+w*2)*.35; P[i*3+2]=o[1]+Math.cos(t*(.3+(i%4)*.07)+w)*.8; } attr.needsUpdate=true; hof.opacity=.75+Math.sin(t*2.6)*.25; };
  setze(0); k.anim.push(setze);
}

/* ---------- Gegenstände ---------- */
function muelltonnen(g){
  const tonne=(x,z,farbe,dunkel,schief)=>{ const t=gruppe(g,x,0,z);
    rohr(t,.62,.52,1.5,farbe,0,.8,0,20); [.38,.82,1.28].forEach(y=>ring(t,.535+y*.066,.04,dunkel,0,y,0).rotation.x=Q);
    for(let i=0;i<14;i++){ const a=i*Math.PI/7; strich(t,[Math.cos(a)*.55,.18,Math.sin(a)*.55],[Math.cos(a)*.625,1.46,Math.sin(a)*.625],.022,dunkel); }
    walze(t,.55,.1,dunkel,0,.05,0);
    [-1,1].forEach(s=>{ const griff=ring(t,.17,.04,dunkel,s*.64,1.25,0,Math.PI); griff.rotation.z=-s*Q; });
    const d=gruppe(t,schief?-.12:0,schief?1.78:1.6,0); d.rotation.z=schief?.28:0;
    walze(d,.7,.13,farbe,0,0,0); ring(d,.69,.05,dunkel,0,-.03,0).rotation.x=Q; ball(d,.6,farbe,0,.04,0,1,.26,1); const gr=ring(d,.19,.05,dunkel,0,.2,0,Math.PI); gr.scale.y=.85;
    return t; };
  tonne(-.72,-.1,0xa8b6c4,0x5e6c7e,false); tonne(.74,.14,0x6a9a8a,0x365a54,true);
  /* Zettel, der unter dem schiefen Deckel hervorschaut */
  const z=box(g,.44,.34,.03,PAPIER,1.08,1.6,.68); z.rotation.z=-.18; box(g,.26,.035,.035,0x5a4a4a,1.08,1.64,.7).rotation.z=-.18; box(g,.2,.035,.035,0x5a4a4a,1.06,1.56,.7).rotation.z=-.18;
  /* Fischgräte als lustiger Rest am Boden */
  strich(g,[-.2,.05,.78],[.35,.05,.9],.025,PAPIER2); [0,1,2].forEach(i=>strich(g,[-.08+i*.15,.05,.68+i*.03],[-.12+i*.15,.05,.94+i*.03],.018,PAPIER2)); ball(g,.09,PAPIER2,.42,.06,.92,1,.5,1);
}
function zeitungskiste(g){
  /* Holzkiste aus Latten */
  box(g,2.1,.1,1.3,HOLZ2,0,.1,0);
  [.28,.58,.88].forEach(y=>{ [-.66,.66].forEach(z=>box(g,2.2,.22,.1,HOLZ,0,y,z)); [-1.07,1.07].forEach(x=>box(g,.1,.22,1.3,HOLZ,x,y,0)); });
  [-1.08,1.08].forEach(x=>[-.67,.67].forEach(z=>box(g,.18,1.06,.18,HOLZ2,x,.53,z)));
  box(g,1.9,.6,1.1,PAPIER2,0,.46,0);
  const blatt=bild(256,192,c=>{ c.fillStyle='#f2ecda'; c.fillRect(0,0,256,192); c.fillStyle='#2a2630'; c.font='700 40px Andika, Arial, sans-serif'; c.textAlign='center'; c.fillText('ZEITUNG',128,42); c.fillRect(14,52,228,5);
    c.fillStyle='#8aa0b8'; c.fillRect(20,70,96,66); c.fillStyle='#6a6470'; for(let y=72;y<182;y+=14){ c.fillRect(132,y,104,5); if(y>142) c.fillRect(20,y,96,5); } });
  /* gefaltete Zeitungen, die oben herausschauen */
  [[-.48,1.02,.02,.14],[.5,1.1,-.06,-.2],[.02,1.2,.08,.04]].forEach(([x,y,z,d],i)=>{ const p=gruppe(g,x,y,z); p.rotation.y=d; box(p,1.02,.12,.86,i%2?PAPIER2:PAPIER,0,0,0); const f=bildFlaeche(p,.98,.82,blatt,0,.066,0); f.rotation.x=-Q; walze(p,.075,1.02,PAPIER,0,0,.43).rotation.z=Q; });
  /* Schnur um das oberste Bündel */
  [-.25,.3].forEach(x=>box(g,.05,.03,.94,HOLZ2,x,1.3,.08)); ball(g,.07,HOLZ2,.3,1.33,.08);
  /* Titelblatt vorn an der Kiste */
  const v=bildFlaeche(g,.95,.7,blatt,-.1,.62,.725); v.rotation.z=.07;
}
function fahrrad(g){
  const RAD=.82, LACK=0xd8483c, REIFEN=0x20222c;
  [-1.32,1.32].forEach(x=>{ ring(g,RAD,.09,REIFEN,x,RAD+.09,0); ring(g,RAD-.11,.035,STAHL,x,RAD+.09,0);
    for(let i=0;i<8;i++){ const a=i*Math.PI/8, c=Math.cos(a)*(RAD-.1), s=Math.sin(a)*(RAD-.1); strich(g,[x-c,RAD+.09-s,0],[x+c,RAD+.09+s,0],.014,STAHL); }
    walze(g,.1,.24,EISEN,x,RAD+.09,0).rotation.x=Q;
    const blech=ring(g,RAD+.15,.05,LACK,x,RAD+.09,0,Math.PI*.72); blech.rotation.z=Math.PI*.14; });
  const NH=[-1.32,.91,0], TL=[-.2,.66,0], SA=[-.52,1.72,0], LK=[.88,1.66,0], VN=[1.32,.91,0];
  [[NH,TL],[TL,SA],[NH,SA],[TL,LK],[SA,[.84,1.54,0]]].forEach(([a,b])=>strich(g,a,b,.065,LACK));
  strich(g,LK,VN,.06,LACK); strich(g,[.96,1.45,0],[.76,2.06,0],.055,STAHL);
  /* Lenker und Klingel */
  strich(g,[.76,2.06,-.46],[.76,2.06,.46],.045,STAHL); [-1,1].forEach(s=>strich(g,[.76,2.06,s*.46],[.46,2.02,s*.5],.06,HOLZ2)); ball(g,.11,GOLD,.76,2.14,.24,1,.7,1);
  /* Sattel, Kette, Pedale */
  strich(g,SA,[-.6,1.94,0],.045,STAHL); ball(g,.26,0x7a4a28,-.66,1.98,0,1.5,.4,.75);
  ring(g,.24,.04,EISEN,-.2,.66,.1); strich(g,[-.2,.9,.1],[-1.32,1.02,.1],.018,EISEN); strich(g,[-.2,.42,.1],[-1.32,.8,.1],.018,EISEN);
  [-1,1].forEach(s=>{ strich(g,[-.2,.66,s*.14],[-.2+s*.3,.66-s*.24,s*.2],.035,STAHL); box(g,.24,.07,.18,EISEN2,-.2+s*.3,.66-s*.24,s*.28); });
  /* Gepäckträger */
  box(g,.8,.05,.34,EISEN,-1.46,1.9,0); strich(g,[-1.6,1.9,.14],[-1.32,.91,.14],.025,EISEN); strich(g,[-1.1,1.9,0],SA,.025,EISEN);
  /* Weidenkorb vorn mit Zettel */
  const korb=gruppe(g,1.58,1.62,0), W=0xd8a860, W2=0xa87838;
  box(korb,.8,.06,.7,W2,0,0,0);
  for(let i=0;i<4;i++){ const b=.8+i*.05, t=.7+i*.05, y=.08+i*.135; [-1,1].forEach(s=>{ box(korb,b,.11,.07,i%2?W:W2,0,y,s*t/2); box(korb,.07,.11,t,i%2?W:W2,s*b/2,y,0); }); }
  [-1,1].forEach(s=>[-.28,0,.28].forEach(x=>box(korb,.05,.54,.04,W,x*1.15,.28,s*.44)));
  [-1,1].forEach(s=>box(korb,1.04,.08,.09,W,0,.58,s*.44)); [-1,1].forEach(s=>box(korb,.09,.08,.96,W,s*.49,.58,0));
  const zet=box(korb,.4,.46,.04,PAPIER,-.08,.6,.08); zet.rotation.z=.24; box(korb,.24,.04,.045,0x5a4a4a,-.12,.74,.08).rotation.z=.24;
  strich(g,LK,[1.3,1.62,0],.035,EISEN);
  /* Ständer */
  strich(g,[-.35,.7,.08],[-.62,.04,.42],.04,EISEN);
}
function katzeSitzt(g,k){
  const F=0xf0a048, D=0xc06a24, H=0xfff0dc, rosa=0xf4909c;
  /* Zettel unter der Katze */
  box(g,1.25,.025,.8,PAPIER,.2,.016,.55).rotation.y=.22; [0,1].forEach(i=>box(g,.5,.012,.05,0x5a4a4a,.5,.034,.72+i*.14).rotation.y=.22);
  const r=gruppe(g,0,0,0);
  ball(r,.55,F,0,.62,-.2,1,1.12,1.05);                                  /* Hinterleib */
  ball(r,.42,F,0,.98,.04,.98,1.22,.9); ball(r,.31,H,0,.92,.28,.88,1.3,.65);   /* Brust */
  [-1,1].forEach(s=>{ ball(r,.34,F,s*.42,.38,-.1,.8,1.05,1.2); ball(r,.17,H,s*.48,.12,.28,1,.65,1.45);
    walze(r,.13,.78,F,s*.19,.47,.38); ball(r,.17,H,s*.2,.12,.46,1,.7,1.25); });
  [[1.28,-.32],[1.0,-.52],[.72,-.66]].forEach(([y,z])=>ball(r,.2,D,0,y,z,1.5,.28,.7));
  /* rotes Halsband mit Glöckchen */
  ring(r,.3,.055,0x3a8ac8,0,1.34,.1).rotation.x=Q-.18; ball(r,.09,GOLD,0,1.24,.45);
  verschmelze(r);
  const kopf=gruppe(g,0,1.72,.14); kopf.userData.lebendig=true; const kk=gruppe(kopf,0,0,0);
  ball(kk,.5,F,0,0,0,1.1,.95,.95);
  [-1,1].forEach(s=>{ const o=kegel(kk,.23,.46,F,s*.33,.47,0); o.rotation.z=-s*.32; const i=kegel(kk,.13,.3,rosa,s*.325,.45,.11); i.rotation.z=-s*.32;
    ball(kk,.13,H,s*.12,-.16,.4,1.1,.85,.8); ball(kk,.13,D,s*.45,.0,.14,.55,.28,1);
    [-.08,.03,.13].forEach((h,i)=>strich(kk,[s*.2,-.15+h*.2,.5],[s*.82,-.2+h,.38],.009,0xffffff)); });
  ball(kk,.065,rosa,0,-.07,.53,1.3,.85,.8);
  strich(kk,[0,-.1,.52],[0,-.19,.5],.014,0x6a2a20); [-1,1].forEach(s=>strich(kk,[0,-.19,.5],[s*.11,-.24,.47],.014,0x6a2a20));
  [0,-.14,.14].forEach(x=>box(kk,.055,.2,.05,D,x,.34-Math.abs(x)*.2,.36).rotation.x=-.5);
  verschmelze(kk);
  const augen=[-1,1].map(s=>{ const a=gruppe(kopf,s*.21,.09,.42); ball(a,.115,mat(0x9af06a,{emissive:0x3a8a20}),0,0,0,1,1.08,.55); ball(a,.062,SCHWARZ,0,0,.052,.75,1.35,.5); ball(a,.025,mat(0xffffff,{emissive:0xaaaaaa}),.035,.045,.085); return a; });
  /* Schwanz legt sich vorn um die Pfoten, die Spitze wackelt */
  const weg=[[.28,.18,-.68],[.72,.15,-.34],[.82,.14,.12],[.7,.13,.46]];
  const s0=gruppe(g,0,0,0); for(let i=0;i<weg.length-1;i++){ strich(s0,weg[i],weg[i+1],.125,i%2?D:F); ball(s0,.13,i%2?D:F,weg[i+1][0],weg[i+1][1],weg[i+1][2]); } ball(s0,.13,F,weg[0][0],weg[0][1],weg[0][2]); verschmelze(s0);
  const spitze=gruppe(g,.7,.13,.46); spitze.userData.lebendig=true; strich(spitze,[0,0,0],[-.28,.02,.2],.115,D); ball(spitze,.13,H,-.3,.03,.22);
  k.anim.push(t=>{ kopf.rotation.z=Math.sin(t*.8)*.12; kopf.rotation.y=Math.sin(t*.47)*.2; const zu=(t%4.2)<.16?.12:1; augen.forEach(a=>a.scale.y=zu); spitze.rotation.y=Math.sin(t*2.2)*.45; });
}
/* Wand-Gegenstände: Ursprung an der Rückwand, y=0 ist die Unterkante */
function briefkasten(g){
  const GELB=0xf4c428, GELB2=0xb88a14;
  box(g,1.7,1.5,.1,HOLZ2,0,.82,-.02);
  box(g,1.4,1.15,.42,GELB,0,.75,.24);
  const d=walze(g,.7,.42,GELB,0,1.32,.24); d.rotation.x=Q; d.scale.set(.7,.42,.36);
  box(g,1.5,.1,.5,GELB2,0,.15,.25);
  box(g,.9,.2,.04,GELB2,0,1.1,.46); box(g,.72,.075,.05,SCHWARZ,0,1.1,.47);
  const brief=box(g,.44,.26,.03,PAPIER,.06,1.24,.49); brief.rotation.z=-.16; box(g,.1,.09,.035,ROT,.2,1.27,.5).rotation.z=-.16;
  box(g,.9,.52,.04,GELB2,0,.55,.455); box(g,.82,.44,.05,GELB,0,.55,.46); ball(g,.07,STAHL,.26,.55,.51);
  /* Posthorn */
  ring(g,.13,.032,EISEN,-.13,.57,.5); kegel(g,.1,.2,EISEN,.05,.5,.5).rotation.z=-Q*1.25;
  /* rotes Fähnchen */
  box(g,.07,.7,.06,ROT,.8,1.1,.3); box(g,.34,.24,.06,ROT,.96,1.34,.3); ball(g,.08,EISEN,.8,.76,.33);
}
function wegweiser(g){
  box(g,.22,2.85,.16,HOLZ2,0,.97,.02);   /* Pfosten bis zum Boden */ kegel(g,.2,.26,GOLD,0,2.52,.02);
  const zeichen=(art,c)=>{ c.strokeStyle='#243a48'; c.fillStyle='#243a48'; c.lineWidth=11; c.lineCap='round';
    if(art==='lupe'){ c.beginPath(); c.arc(54,56,30,0,7); c.stroke(); c.beginPath(); c.moveTo(78,80); c.lineTo(104,106); c.stroke(); }
    else { c.beginPath(); c.ellipse(64,86,52,12,0,0,7); c.fill(); c.beginPath(); c.moveTo(32,84); c.quadraticCurveTo(36,26,64,34); c.quadraticCurveTo(92,26,96,84); c.fill(); c.fillStyle='#c8483c'; c.fillRect(34,66,60,12); } };
  [[1.88,1,0xf6ecd0,'lupe',.05],[1.06,-1,0xa8d8c0,'hut',-.04]].forEach(([y,s,farbe,art,dreh])=>{
    const a=gruppe(g,0,y,.12); a.rotation.z=dreh;
    platte(a,[[-.55*s,-.36],[1.15*s,-.36],[1.65*s,0],[1.15*s,.36],[-.55*s,.36]],.12,farbe,0,0,0);
    platte(a,[[-.62*s,-.43],[1.18*s,-.43],[1.76*s,0],[1.18*s,.43],[-.62*s,.43]],.06,HOLZ,0,0,-.03);
    bildFlaeche(a,.62,.62,bild(128,128,c=>zeichen(art,c)),.62*s,0,.128); });
}
function pakete(g){
  const K=0xcc9c64, K2=0xdcb482, K3=0xb88450, BAND=0x8a6030;
  const paket=(x,y,z,b,h,t,farbe,dreh,schnur)=>{ const p=gruppe(g,x,y,z); p.rotation.y=dreh; box(p,b,h,t,farbe,0,h/2,0);
    box(p,.2,.03,t+.03,schnur||BAND,0,h+.005,0); box(p,.2,h+.01,.03,schnur||BAND,0,h/2,t/2); if(schnur){ box(p,b+.03,.03,.1,schnur,0,h+.012,0); box(p,b+.03,.08,.03,schnur,0,h/2,t/2+.005); }
    box(p,b*.28,h*.3,.03,WEISS,b*.27,h*.55,t/2+.02); [0,1].forEach(i=>box(p,b*.18,.03,.035,0x4a4450,b*.27,h*.6-i*.1,t/2+.03)); box(p,.1,.12,.035,ROT,b*.36,h*.68,t/2+.032); return p; };
  paket(-.5,0,0,1.25,.8,1.2,K,.06); paket(.76,0,.08,1.05,.62,1,K3,-.14);
  paket(-.42,.8,-.02,1.05,.65,.95,K2,-.12,ROT); paket(.76,.62,.04,.82,.5,.8,K2,.1);
  const oben=paket(-.35,1.45,0,.78,.46,.72,K,.2,0x3a7ac0);
  [-1,1].forEach(s=>{ const m=ring(oben,.13,.035,0x3a7ac0,s*.12,.54,0); m.rotation.y=.4*s; m.scale.y=.6; });
}
function regentonne(g,k){
  const D=0x7a4a28, D2=0x935c32;
  walze(g,.72,.08,HOLZ2,0,.1,0);
  [[.06,.5,.72,.88],[.5,.95,.88,.93],[.95,1.4,.93,.87],[1.4,1.82,.87,.74]].forEach(([a,b,u,o],i)=>rohr(g,o,u,b-a,D,0,(a+b)/2,0,24,true));
  for(let i=0;i<16;i++){ const a=i*Math.PI/8, c=Math.cos(a), s=Math.sin(a); [[.06,.72,.5,.885],[.5,.885,.95,.935],[.95,.935,1.4,.875],[1.4,.875,1.82,.745]].forEach(([y1,r1,y2,r2])=>strich(g,[c*r1,y1,s*r1],[c*r2,y2,s*r2],.02,D2)); }
  [[.28,.815],[.7,.915],[1.25,.915],[1.68,.8]].forEach(([y,r])=>ring(g,r,.05,STAHL2,0,y,0).rotation.x=Q);
  ring(g,.74,.07,D2,0,1.83,0).rotation.x=Q;
  walze(g,.72,.04,mat(0x58b0e8,{emissive:0x16406a}),0,1.72,0);
  /* Hahn aus Messing */
  walze(g,.07,.3,GOLD,0,.6,.98).rotation.x=Q; walze(g,.05,.2,GOLD,0,.5,1.1); walze(g,.09,.05,ROT,0,.72,1.08); walze(g,.025,.14,GOLD,0,.66,1.08);
  /* angeklebter Zettel */
  const z=box(g,.46,.38,.03,PAPIER,-.4,1.02,.86); z.rotation.y=-.43; [0,1].forEach(i=>{ const l=box(g,.28,.035,.035,0x5a4a4a,-.4,1.08-i*.12,.875); l.rotation.y=-.43; });
  /* schwimmendes Blatt, Ringe und fallender Tropfen */
  ball(g,.14,LAUB2,.28,1.75,-.2,1.3,.15,.8);
  const welle=ring(g,.3,.016,basis(0xdaf2ff,{transparent:true,opacity:.7,depthWrite:false}),-.1,1.755,.1); welle.rotation.x=Q; welle.castShadow=false;
  const tropfen=gruppe(g,-.1,2.5,.1); tropfen.userData.lebendig=true; ball(tropfen,.07,mat(0x9adcff,{emissive:0x2a6a9a}),0,0,0,1,1.35,1);
  k.anim.push(t=>{ const u=(t*.6)%1, f=Math.min(1,u/.45); tropfen.visible=u<.45; tropfen.position.y=2.55-f*f*.78; const w=u<.45?0:(u-.45)/.55; welle.visible=u>=.45; const s=.3+w*1.6; welle.scale.set(s,s,1); welle.material.opacity=.75*(1-w); });
}
function laterne(g,k){
  walze(g,.46,.18,EISEN,0,.09,0); rohr(g,.24,.34,.55,EISEN,0,.45,0); ring(g,.23,.05,GOLD,0,.74,0).rotation.x=Q;
  rohr(g,.11,.15,2.6,EISEN,0,2.0,0); ring(g,.15,.045,GOLD,0,3.05,0).rotation.x=Q; walze(g,.06,.9,EISEN,0,3.05,0).rotation.z=Q; [-.45,.45].forEach(x=>ball(g,.09,GOLD,x,3.05,0));
  rohr(g,.36,.18,.18,EISEN,0,3.36,0);
  const glas=mat(0xffe8a0,{emissive:0xf0b040});
  rohr(g,.46,.32,.74,glas,0,3.82,0,6);
  for(let i=0;i<6;i++){ const a=Math.PI/6+i*Math.PI/3-Math.PI/6, s=Math.sin(a), c=Math.cos(a); strich(g,[s*.33,3.45,c*.33],[s*.47,4.19,c*.47],.032,EISEN); }
  rohr(g,.08,.66,.38,EISEN,0,4.4,0,6); ball(g,.11,GOLD,0,4.66,0);
  schein(g,'rgba(255,205,110,.8)',0,3.82,0,3.4);
  /* angeklebter Zettel */
  box(g,.42,.5,.04,PAPIER,0,1.75,.15).rotation.z=.08; [0,1,2].forEach(i=>box(g,.26,.035,.045,0x5a4a4a,0,1.88-i*.12,.152).rotation.z=.08); box(g,.2,.09,.05,0xe8c870,.02,2,.153).rotation.z=-.3;
  verschmelze(g); k.verdecker(g,-10.6,3.2,.45);   /* erst zusammenfassen, dann durchsichtig schaltbar machen */
}
function gartenbank(g){
  const H1=0xc88a48, H2=0xa86e36;
  [-.36,-.04,.28].forEach((z,i)=>box(g,3.3,.13,.28,i%2?H2:H1,0,.8,z));
  [1.2,1.52,1.84].forEach((y,i)=>{ const b=box(g,3.3,.25,.11,i%2?H2:H1,0,y,-.55-i*.05); b.rotation.x=-.14; });
  [-1.55,1.55].forEach(x=>{ strich(g,[x,0,.36],[x,.76,.34],.085,EISEN); strich(g,[x,0,-.5],[x,.76,-.46],.085,EISEN); strich(g,[x,.76,-.48],[x,2.0,-.72],.085,EISEN); strich(g,[x,.72,.4],[x,.72,-.5],.07,EISEN);
    strich(g,[x,.76,.36],[x,1.18,.34],.065,EISEN); strich(g,[x,1.2,.46],[x,1.2,-.58],.08,EISEN); ball(g,.12,EISEN,x,1.2,.46); const b=ring(g,.2,.04,EISEN,x,.4,-.06); b.rotation.y=Q; });
  /* Zettel, der unter der Sitzfläche hervorschaut */
  box(g,.55,.03,.42,PAPIER,.6,.03,.24).rotation.y=-.3; box(g,.32,.012,.04,0x5a4a4a,.62,.052,.29).rotation.y=-.3;
}

/* ---------- Raum bauen ---------- */
function baue(k){
  boden(k); himmel(k);
  const w=waende(k);
  waescheleine(w.links);
  const tuer=feuerleiter(k,w.hinten);
  ausstattung(k);
  hofmitte(k);
  gluehwuermchen(k);
  maeuschen(k,[[-6.6,-3.6],[-1.2,-5.6],[1.8,-2.2],[-1.6,.2],[-6,-1]],1.5,0);
  maeuschen(k,[[7.2,6.4],[12,8.2],[8.6,10],[3.2,8.8]],1.2,4);
  /* warmes Licht: an der Leiter, vor zwei Fenstern, an der rechten Wand (die Laterne ist Gegenstand 9) */
  flacker(k,EX,3,-10.4,0xffc870,.45,8);
  flacker(k,-12.5,2.6,-11,0xffb860,.5,9);
  flacker(k,12,2.8,-10.8,0xffb860,.5,10);
  flacker(k,15.4,2.6,3,0xffb860,.45,9);
  flacker(k,-10.6,3.9,3.9,0xffc060,.85,13);
  return { tuer, start:[0,3] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-15.6,-10.6],[-9.8,-10],[1.4,-10.8],[5.6,-9.6],[15.2,-10.6],[14.4,-5.8],[15.8,-2.4],[8.4,-.8],[15.4,4.8],[13,9.6],[6.2,10.4],[.8,9.8],[-3,7],[-10.2,10.8],[-14.6,6.6],[-15.6,.8],[-10.4,-3.4],[-4,-2.6],[1.6,-5.4],[-6.8,5.4]];

/* ---------- Gegenstände: Reihenfolge = ort 1 bis 10 ---------- */
const gegenstaende=[
  { x:-6.3, z:-7.4, steh:[-6.3,-5.3], kasten:[3.2,1.8], treffer:[3.3,2.5,2], baue:muelltonnen },
  { x:5.6, z:-4.2, steh:[3.7,-2.8], kasten:[2.4,1.5], treffer:[2.6,1.9,1.7], baue:zeitungskiste },
  { x:10.2, z:-6.4, dreh:-.08, steh:[10.2,-4.6], kasten:[4.5,1.2], treffer:[4.6,2.6,1.3], baue:fahrrad },
  { x:4.4, z:2.4, dreh:-.2, steh:[2.7,4], r:.95, treffer:[2,2.5,2.2], baue:katzeSitzt },
  { x:-11.4, z:-13.42, y:.7, wand:'hinten', steh:[-11.4,-11.5], treffer:[2.3,1.8,1.2], baue:briefkasten },
  { x:10.4, z:-13.42, y:.45, wand:'hinten', steh:[12.7,-11.6], treffer:[3.6,3.15,.8], trefferY:-.45, baue:wegweiser },
  { x:12.4, z:2.4, dreh:-.15, steh:[10.1,3], kasten:[2.8,1.7], treffer:[2.9,2.3,1.8], baue:pakete },
  { x:-13.4, z:-4.6, steh:[-11.6,-3.4], r:1.05, treffer:[2.1,2.6,2.4], baue:regentonne },
  { x:-10.6, z:3.2, steh:[-9,4], r:.5, treffer:[1.4,4.8,1.4], baue:laterne },
  { x:-6.2, z:8.6, dreh:.12, steh:[-3.6,9.2], kasten:[3.5,1.5], treffer:[3.6,2.1,1.6], baue:gartenbank }
];
return { titel:'Der Hinterhof', breite:B, tiefe:T, himmel:HIMMEL, baue, gegenstaende, verstecke };
})();

/* Raum 5: Der Dachboden. Warme Bretterwände, Holzbalken mit Dachschrägen an den Wänden, Mondlicht durch das Dachfenster
   (davor eine Eule), tanzender Staub, abgedeckte Möbel, Teppichrollen, leere Bilderrahmen.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die Dachluke in der Mitte der Rückwand, eine Leiter führt hinauf, die Klappe schwingt nach oben auf. */
RAEUME3D.detektiv[4] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, ROT, BLAU, GRUEN, GOLD, SCHWARZ, WEISS, METALL, METALL2, BUCH } = DET;
const HELLHOLZ=0xc89860, BALKEN=0x6a4020, TUCH=0xd6d2c4, TUCH2=0xb4b0a4, TUCHG=0xa8b8a4, TUCHG2=0x8a9a88, CREME=0xfbf0d4, ORANGE=0xd8782a, ROSA=0xc86a7a;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=0;                      /* Mitte der Dachluke (im Startbild in der Lücke der Kopfleiste) */
const FX=5.6;                    /* Mitte des Dachfensters */

/* ---------- kleine Helfer ---------- */
const hell=m=>{ m.castShadow=false; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };

/* senkrechte Bretterwand (kachelbar) */
function bretterBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#3e2814'; g.fillRect(0,0,512,512);
    for(let i=0;i<10;i++){ const x=i*51.2, v=Math.floor(zufall()*22)-11; g.fillStyle='rgb('+(150+v)+','+(110+v)+','+(76+v)+')'; g.fillRect(x+2,0,48,512);
      g.fillStyle='rgba(60,34,12,.2)'; for(let j=0;j<7;j++) g.fillRect(x+8+zufall()*32,zufall()*420,2,50+zufall()*90);
      g.fillStyle='rgba(60,34,12,.35)'; g.beginPath(); g.ellipse(x+14+zufall()*24,40+zufall()*430,4,9,0,0,7); g.fill();
      g.fillStyle='#2e1c0c'; [14,498].forEach(y=>g.fillRect(x+22,y,5,5)); } });
}
/* Nachthimmel mit Sternen, Mond (mondX, mondY, mondR) und Dächern */
function himmelBild(mondX,mondY,mondR,daecher){
  return bild(512,384,(g)=>{ const v=g.createLinearGradient(0,0,0,384); v.addColorStop(0,'#182a68'); v.addColorStop(.65,'#3a5aa8'); v.addColorStop(1,'#8a9ad8'); g.fillStyle=v; g.fillRect(0,0,512,384);
    for(let i=0;i<80;i++){ g.fillStyle=i%4?'#ffffff':'#ffe890'; const s=i%7?3:5; g.fillRect(zufall()*505,zufall()*300,s,s); }
    const h=g.createRadialGradient(mondX,mondY,mondR*.8,mondX,mondY,mondR*2.6); h.addColorStop(0,'rgba(255,244,190,.55)'); h.addColorStop(1,'rgba(255,244,190,0)'); g.fillStyle=h; g.fillRect(0,0,512,384);
    g.fillStyle='#fff3c0'; g.beginPath(); g.arc(mondX,mondY,mondR,0,7); g.fill();
    g.fillStyle='#ecdc9c'; [[-.3,.2,.22],[.35,-.15,.15],[.1,.45,.1]].forEach(([a,b,r])=>{ g.beginPath(); g.arc(mondX+a*mondR,mondY+b*mondR,r*mondR,0,7); g.fill(); });
    if(daecher){ g.fillStyle='#1c2048'; for(let x=0;x<512;x+=64){ const hh=40+(x*7%50); g.fillRect(x,384-hh,60,hh); g.beginPath(); g.moveTo(x-4,384-hh); g.lineTo(x+30,384-hh-34); g.lineTo(x+64,384-hh); g.fill(); }
      g.fillStyle='#ffcc60'; for(let x=22;x<512;x+=64) g.fillRect(x,384-30-(x*3%16),10,12); } });
}

/* ---------- Ausgang: die Dachluke mit Leiter ---------- */
function baueLuke(k,sc,hinten,wandTex){
  /* unter der Luke bleibt die Wand, dahinter liegt der Nachthimmel */
  DET.mauer(hinten,wandTex,2.5,2.2,.5,AX,1.1,HINTEN-.25);
  const himmel=new THREE.Mesh(new THREE.PlaneGeometry(9,6.4),basis(0xffffff,{map:himmelBild(262,150,38,false)})); himmel.position.set(AX,3.2,HINTEN-1.5); hinten.add(himmel);
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.3,2.75,.34,HELLHOLZ,s*1.45,3.3,.1); box(r,.07,2.5,.06,GOLD,s*1.64,3.3,.27); });
  box(r,3.3,.28,.34,HELLHOLZ,0,4.58,.1); box(r,3.3,.22,.5,HELLHOLZ,0,2.08,.18);
  /* kleines Dach mit roten Ziegeln darüber */
  [-1,1].forEach(s=>{ strich(r,[s*2.25,4.55,.2],[0,5.8,.2],.14,BALKEN); strich(r,[s*2.2,4.78,.24],[0,6.0,.24],.12,0xb8482e); });
  ball(r,.18,GOLD,0,5.95,.3);
  /* Leiter */
  [-.82,.82].forEach(x=>{ strich(r,[x,0,.6],[x,2.72,.5],.09,HELLHOLZ); ball(r,.14,GOLD,x,2.76,.5); });
  for(let i=1;i<=5;i++){ const y=i*.44, z=.6-y*.037; box(r,1.66,.1,.2,i%2?HELLHOLZ:0xdcae74,0,y,z); }
  verschmelze(r);
  /* Klappe: Drehpunkt oben */
  const kl=gruppe(hinten,AX,4.44,HINTEN+.26); kl.userData.lebendig=true;
  [-1.04,-.52,0,.52,1.04].forEach((x,i)=>box(kl,.5,2.24,.13,i%2?0x9a5c28:0xb06e32,x,-1.13,0));
  [-.28,-1.98].forEach(y=>{ box(kl,2.62,.18,.07,METALL2,0,y,.09); [-1.1,-.55,.55,1.1].forEach(x=>ball(kl,.05,METALL,x,y,.14)); });
  [-.85,.85].forEach(x=>walze(kl,.09,.4,METALL2,x,-.03,.08).rotation.z=Math.PI/2);
  [-1,1].forEach(s=>box(kl,.06,2.24,.04,GOLD,s*1.3,-1.13,.08));
  box(kl,1.38,1.1,.07,HOLZ3,0,-1.17,.09);
  const schloss=DET.zahlenschloss(kl,0,-1.3,.24); schloss.scale.setScalar(1.3);
  verschmelze(kl);
  const glanz=schein(hinten,'rgba(255,225,110,.5)',AX,3.15,HINTEN+.7,1.2);
  const licht=new THREE.PointLight(0xaac6ff,.25,9,1.5); licht.position.set(AX,3.6,-12.4); sc.add(licht);
  k.kasten(AX,-13.0,3.4,1.7); /* geschlossene Luke und Leiter: beim Öffnen läuft die Figur ohne Wegsuche hin */
  return ausgang(k,{ name:'Dachluke', einfach:'Klappe im Dach', steh:[AX,-10.8], durch:[AX,-12.75], hoch:2.25,
    treffer:{x:AX,y:2.4,z:-12.9,b:3.4,h:4.8,t:1.0}, schildOben:[AX,4.7,-12.2], glanz:[AX,3.15,-12.6],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.05)/.88)); kl.rotation.x=-2.25*a*a*(3-2*a); glanz.visible=auf<.05; licht.intensity=.25+1.2*auf; } });
}

/* ---------- Dachfenster mit Eule, Mondstrahl und Staub ---------- */
function eule(k,par,x,y,z){
  const g=gruppe(par,x,y,z); g.userData.lebendig=true;
  const F=0xa0683a, D=0x6e4422, h=0xf0dcb4, r=gruppe(g,0,0,0);
  ball(r,.4,F,0,.46,0,1,1.18,.85); ball(r,.28,h,0,.4,.17,1,1.2,.7);
  [[-.1,.46],[.1,.46],[0,.3],[-.12,.18],[.12,.18]].forEach(([a,b])=>ball(r,.045,D,a,b,.38,1.2,.7,.5));
  [-1,1].forEach(s=>{ ball(r,.2,D,s*.37,.45,0,.5,1.6,.9); [-.05,.05].forEach(v=>ball(r,.055,ORANGE,s*.16+v,.03,.24,.8,.7,1.6)); });
  verschmelze(r);
  const kopf=gruppe(g,0,1.04,.02); kopf.userData.lebendig=true;
  ball(kopf,.37,F,0,0,0,1.08,.92,.92);
  [-1,1].forEach(s=>{ ball(kopf,.18,h,s*.15,.02,.25,1,1,.55); hell(ball(kopf,.11,basis(0xffd430),s*.15,.04,.34,1,1,.45)); ball(kopf,.058,SCHWARZ,s*.15,.04,.39,1,1,.5); hell(ball(kopf,.02,basis(0xffffff),s*.15+.025,.07,.425));
    const o=kegel(kopf,.11,.28,D,s*.25,.34,0); o.rotation.z=-s*.45; });
  const sn=kegel(kopf,.07,.18,ORANGE,0,-.1,.37); sn.rotation.x=Math.PI*.9;
  verschmelze(kopf);
  k.anim.push(t=>{ const a=Math.sin(t*.55); kopf.rotation.y=Math.max(-.75,Math.min(.75,a*1.5)); kopf.rotation.z=Math.sin(t*1.3)*.12; });
}
function baueFenster(k,sc,hinten){
  const himmel=new THREE.Mesh(new THREE.PlaneGeometry(3.0,2.15),basis(0xffffff,{map:himmelBild(360,130,62,true)})); himmel.position.set(FX,2.38,HINTEN+.04); hinten.add(himmel);
  const f=gruppe(hinten,FX,0,HINTEN);
  [-1,1].forEach(s=>box(f,.2,2.35,.26,HELLHOLZ,s*1.58,2.38,.12));
  box(f,3.36,.2,.26,HELLHOLZ,0,3.52,.12); box(f,3.6,.18,.66,HELLHOLZ,0,1.23,.33);
  box(f,.08,2.15,.08,HELLHOLZ,.1,2.38,.1); box(f,3.0,.08,.08,HELLHOLZ,0,2.7,.1);
  [-1.3,1.3].forEach(x=>strich(f,[x,.75,.06],[x,1.18,.5],.07,BALKEN));
  verschmelze(f);
  eule(k,hinten,FX-.85,1.31,HINTEN+.42);
  /* Mondstrahl: vom Fenster schräg auf den Boden */
  const W=[[4.2,3.35,-13.2],[7.0,3.35,-13.2],[7.0,1.45,-13.2],[4.2,1.45,-13.2]], Fl=[[1.2,.04,-6.4],[5.6,.04,-6.4],[5.8,.04,-10.6],[1.6,.04,-10.6]], P=[];
  for(let i=0;i<4;i++){ const j=(i+1)%4; [W[i],W[j],Fl[j],W[i],Fl[j],Fl[i]].forEach(p=>P.push(p[0],p[1],p[2])); }
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
  const strahl=new THREE.Mesh(geo,basis(0x9ab8ff,{transparent:true,opacity:.055,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending})); sc.add(strahl);
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(7.4,6.6),basis(0xffffff,{map:leuchtBild('rgba(150,185,255,.5)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  fleck.rotation.x=-Math.PI/2; fleck.position.set(3.5,.05,-8.4); sc.add(fleck);
  const mond=new THREE.PointLight(0xa8c4ff,.6,11,1.5); mond.position.set(4.8,3.0,-11.2); sc.add(mond);
  /* tanzender Staub im Mondlicht */
  const n=90, im=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,0),basis(0xf4f8ff,{transparent:true,opacity:.75,depthWrite:false}),n), o=new THREE.Object3D(), D=[];
  for(let i=0;i<n;i++) D.push([zufall(),zufall(),zufall(),zufall()*6.28,.35+zufall()*.6,.018+zufall()*.022]);
  im.frustumCulled=false; sc.add(im);
  const misch=(a,b,u)=>a+(b-a)*u;
  k.anim.push(t=>{ D.forEach((d,i)=>{ const u=(d[0]+t*.012*d[4])%1, a=t*d[4]+d[3];
      const x=misch(misch(4.3,6.9,d[1]),misch(1.5,5.5,d[1]),u)+Math.sin(a)*.18, y=misch(misch(1.5,3.25,d[2]),.15,u)+Math.sin(a*1.7)*.12, z=misch(-13.0,misch(-10.4,-6.6,d[2]),u)+Math.cos(a*.8)*.15;
      const g=d[5]*(1+.35*Math.sin(t*2.2+d[3]*3)); o.position.set(x,y,z); o.scale.set(g,g,g); o.updateMatrix(); im.setMatrixAt(i,o.matrix); }); im.instanceMatrix.needsUpdate=true; });
}

/* ---------- Deko-Bausteine (nichts davon sieht wie ein Gegenstand aus) ---------- */
/* Möbel unter einem Tuch: Sessel oder Sofa. Blick nach +z, Breite b */
function abgedeckt(par,x,z,dreh,b,farbe,schatten){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  box(g,b,.85,1.3,farbe,0,.5,.05); box(g,b-.1,1.1,.45,farbe,0,1.45,-.4); strich(g,[-b/2+.1,2.0,-.4],[b/2-.1,2.0,-.4],.24,farbe);
  [-1,1].forEach(s=>{ strich(g,[s*(b/2-.18),1.12,-.4],[s*(b/2-.18),1.12,.68],.24,farbe); ball(g,.24,farbe,s*(b/2-.18),1.12,.68);
    box(g,.14,.18,.14,HOLZ3,s*(b/2-.2),.09,.55); });
  const n=Math.round(b/.55);
  for(let i=0;i<n;i++){ const u=-b/2+(i+.5)*b/n; box(g,.09,.72,.05,schatten,u,.48,.72); const z2=kegel(g,b/n*.55,.28,farbe,u,.13,.66); z2.rotation.x=Math.PI; z2.scale.z=.18; }
}
/* hoher Schrank unter einem Tuch mit Falten und Schnur */
function tuchSchrank(par,x,z,dreh,farbe,schatten){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  box(g,2.2,3.0,.95,farbe,0,1.55,0); box(g,2.34,.16,1.08,farbe,0,3.12,0);
  [-.8,-.35,.2,.72].forEach((u,i)=>{ const q=box(g,.12,2.7-(i%2)*.5,.07,schatten,u,1.4-(i%2)*.2,.5); q.rotation.z=(i-1.5)*.04; });
  box(g,2.26,.08,1.0,0x8a5a2a,0,1.75,0); ball(g,.12,0x8a5a2a,.45,1.75,.54);
  [-.9,.9].forEach(u=>box(g,.22,.12,.8,HOLZ3,u,.06,0));
}
/* Stehlampe mit großem Schirm */
function stehlampe(par,x,z,farbe){
  const g=gruppe(par,x,0,z);
  walze(g,.45,.12,HOLZ3,0,.06,0); walze(g,.07,2.3,MESSING2,0,1.2,0); ball(g,.15,MESSING,0,1.1,0);
  hell(rohr(g,.35,.72,.7,farbe,0,2.5,0,16,true)); flach(ring(g,.72,.045,GOLD,0,2.15,0)); flach(ring(g,.35,.04,GOLD,0,2.85,0));
  for(let i=0;i<14;i++){ const a=i*.449; ball(g,.055,GOLD,Math.cos(a)*.72,2.05,Math.sin(a)*.72,.7,1.5,.7); }
}
/* gerollte Teppiche: liegend (entlang x oder z) */
function rollen(par,x,z,laengs){
  const g=gruppe(par,x,0,z); if(laengs) g.rotation.y=Math.PI/2;
  [[-.34,.34,ROT],[.34,.34,0x2f6a6a],[0,.9,0xb8862a]].forEach(([c,y,f],i)=>{ const l=2.5-i*.25, q=walze(g,.34,l,f,0,y,c); q.rotation.z=Math.PI/2;
    [-1,1].forEach(s=>{ [[.25,PAPIER2],[.13,f]].forEach(([r,fa],j)=>walze(g,r,.04,fa,s*(l/2+.01+j*.015),y,c).rotation.z=Math.PI/2); walze(g,.355,.08,CREME,s*l*.3,y,c).rotation.z=Math.PI/2; }); });
}
/* stehende Teppichrollen, an die Wand gelehnt */
function rollenStehend(par,x,z){
  const g=gruppe(par,x,0,z);
  [[-.38,2.1,0x8a3a5a],[.08,2.6,0x3a6a8a],[.46,1.7,0x6a7a3a]].forEach(([a,h,f],i)=>{ walze(g,.23,h,f,a,h/2,(i%2)*.14); walze(g,.17,.05,PAPIER2,a,h+.01,(i%2)*.14); walze(g,.08,.06,f,a,h+.02,(i%2)*.14);
    [.4,h-.35].forEach(y=>walze(g,.245,.08,CREME,a,y,(i%2)*.14)); });
}
/* Stapel alter Holzbalken */
function balkenStapel(par,x,z,b,laengs){
  const g=gruppe(par,x,0,z); if(laengs) g.rotation.y=Math.PI/2;
  [[-.42,.14],[0,.14],[.42,.14],[-.22,.42],[.22,.42],[0,.7]].forEach(([c,y],i)=>{ const l=b-(i%3)*.22; box(g,l,.26,.36,i%2?BALKEN:0x8a5c34,(i%2)*.1,y,c);
    [-1,1].forEach(s=>box(g,.03,.14,.2,HELLHOLZ,(i%2)*.1+s*(l/2+.01),y,c)); });
}
/* leere Bilderrahmen, hintereinander angelehnt (Blick nach +z, man sieht hindurch) */
function leereRahmen(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  [[-.35,1.9,2.2,GOLD,-.3],[.45,1.5,1.7,HOLZ3,0],[-.1,1.1,1.15,MESSING2,.3]].forEach(([a,b,h,f,c])=>{ const r=gruppe(g,a,0,c); r.rotation.x=-.13;
    [-1,1].forEach(s=>box(r,.14,h,.12,f,s*(b/2-.07),h/2,0)); [.07,h-.07].forEach(y=>box(r,b,.14,.12,f,0,y,0));
    [-1,1].forEach(s=>[.08,h-.08].forEach(y=>ball(r,.11,f,s*(b/2-.07),y,.03))); });
}
/* Garderobenständer mit Hüten und Schal */
function huete(par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,.1,2.8,HOLZ3,0,1.4,0); [0,1,2,3].forEach(i=>{ const a=i*1.571; strich(g,[0,.45,0],[Math.cos(a)*.62,.05,Math.sin(a)*.62],.07,HOLZ3); strich(g,[0,2.35,0],[Math.cos(a)*.52,2.65,Math.sin(a)*.52],.05,HOLZ3); });
  [[.52,2.72,0,0x2a4a7a],[-.52,2.72,0,0x8a2a2a],[0,2.92,0,0x4a3a2a]].forEach(([a,y,c,f])=>{ walze(g,.4,.06,f,a,y,c); walze(g,.23,.3,f,a,y+.17,c); walze(g,.24,.07,GOLD,a,y+.07,c); });
  strich(g,[0,2.67,.52],[.04,1.4,.62],.11,0xd8a02a); [1.45,1.7].forEach(y=>walze(g,.13,.07,GRUEN,.035,y,.61));
}
/* altes Wagenrad, an die Wand gelehnt (Blick nach +z) */
function wagenrad(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  const r=gruppe(g,0,1.12,0); r.rotation.x=-.16;
  ring(r,1.0,.12,HOLZ,0,0,0); ring(r,1.12,.04,METALL2,0,0,0); flach(walze(r,.24,.34,HOLZ2,0,0,0)); ball(r,.11,METALL2,0,0,.2);
  for(let i=0;i<8;i++){ const a=i*Math.PI/4+.2; strich(r,[0,0,0],[Math.cos(a)*.95,Math.sin(a)*.95,0],.065,HELLHOLZ); }
}
/* leerer Vogelkäfig auf einem Ständer */
function kaefig(par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,.42,.1,HOLZ3,0,.05,0); walze(g,.07,1.2,HOLZ2,0,.65,0); walze(g,.58,.12,HOLZ2,0,1.3,0);
  for(let i=0;i<12;i++){ const a=i*Math.PI/6, c=Math.cos(a)*.5, s=Math.sin(a)*.5; strich(g,[c,1.35,s],[c,2.25,s],.018,GOLD); strich(g,[c,2.25,s],[0,2.68,0],.018,GOLD); }
  [1.38,1.85,2.25].forEach(y=>flach(ring(g,.5,.025,GOLD,0,y,0))); ball(g,.1,GOLD,0,2.72,0); flach(ring(g,.13,.025,GOLD,0,2.86,0)).rotation.x=0;
  strich(g,[-.3,1.75,0],[.3,1.75,0],.025,HOLZ);
}
/* alter Küchenstuhl mit Wolldecke */
function stuhl(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  box(g,1.15,.14,1.05,HOLZ,0,1.0,0); [-.48,.48].forEach(a=>{ strich(g,[a,0,.42],[a,.95,.42],.07,HOLZ2); strich(g,[a,0,-.45],[a,2.3,-.5],.075,HOLZ2); ball(g,.11,HOLZ,a,2.34,-.5); });
  [1.55,2.05].forEach(y=>box(g,.95,.22,.08,HOLZ,0,y,-.48));
  box(g,.8,.1,1.1,GRUEN,.2,1.12,.02); box(g,.8,.6,.07,GRUEN,.2,.84,.56); [-.05,.45].forEach(a=>box(g,.07,.62,.09,CREME,a,.84,.565));
}
/* Wandbrett mit Blumentöpfen, Blick nach +z (Gruppe an die Wand drehen) */
function wandbrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh;
  box(g,3.4,.12,.6,HELLHOLZ,0,0,.3); [-1.4,1.4].forEach(a=>strich(g,[a,-.7,.05],[a,-.05,.5],.06,BALKEN));
  [[-1.3,.45],[-.55,.62],[.15,.4]].forEach(([a,h],i)=>{ rohr(g,.28,.2,h,0xb8643a,a,.06+h/2,.3); flach(ring(g,.28,.04,0x96502c,a,.06+h,.3));
    if(i===1) for(let j=0;j<6;j++) ball(g,.15,j%2?GRUEN:0x6a9a4a,a+Math.cos(j*1.1)*.18,h+.2+(j%3)*.1,.3+Math.sin(j*1.1)*.12,.8,1.2,.8); });
  /* aufgewickeltes Seil */
  for(let i=0;i<3;i++) flach(ring(g,.36-i*.03,.065,0xd0b478,1.05,.13+i*.11,.32));
}
/* Wanduhr mit Pendel */
function uhr(k,par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh;
  box(g,1.1,1.9,.28,HOLZ2,0,-.25,.14); flach(walze(g,.62,.3,HOLZ,0,.5,.17)); flach(walze(g,.46,.05,CREME,0,.5,.34));
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(g,.032,SCHWARZ,Math.cos(a)*.37,.5+Math.sin(a)*.37,.37); }
  strich(g,[0,.5,.39],[0,.8,.39],.025,SCHWARZ); strich(g,[0,.5,.39],[.22,.4,.39],.03,SCHWARZ);
  const p=gruppe(g,0,-.1,.34); p.userData.lebendig=true; strich(p,[0,0,0],[0,-.75,0],.025,MESSING2); flach(walze(p,.2,.07,GOLD,0,-.8,0)); verschmelze(p);
  k.anim.push(t=>{ p.rotation.z=Math.sin(t*2.6)*.22; });
}
/* Laterne an der Wand mit warmem Licht */
function laterne(k,par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh;
  box(g,.12,.12,.45,HOLZ3,0,.55,.22); box(g,.5,.08,.5,METALL2,0,.38,.42); kegel(g,.34,.22,METALL2,0,.53,.42); box(g,.5,.09,.5,METALL2,0,-.28,.42);
  [[-.21,-.21],[.21,-.21],[-.21,.21],[.21,.21]].forEach(([a,c])=>box(g,.045,.62,.045,METALL2,a,.05,.42+c));
  hell(ball(g,.15,basis(0xffd668),0,.03,.42,1,1.5,1)); schein(g,'rgba(255,190,90,.6)',0,.05,.5,1.5);
}

/* ---------- Wandschmuck: Balken, Dachschrägen, Spinnweben ---------- */
function gebaelk(hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0), zi=HINTEN+.14;
  [-17.75,-13.6,-8.5,-2.75,2.75,8.5,13.6,17.75].forEach(x=>box(h,.34,H,.26,BALKEN,x,H/2,zi));
  box(h,B,.32,.3,BALKEN,0,6.2,zi+.02);
  /* Dachschrägen in den Ecken und Streben */
  [-1,1].forEach(s=>{ strich(h,[s*17.8,3.5,zi+.08],[s*11.6,6.15,zi+.08],.2,HOLZ2); strich(h,[s*17.8,4.5,zi+.05],[s*14.4,6.0,zi+.05],.11,HOLZ2);
    [2.75,8.5,13.6].forEach(x=>[-1,1].forEach(v=>strich(h,[s*x+v*.1,5.25,zi+.05],[s*x+v*.85,6.1,zi+.05],.09,HOLZ2))); });
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.14);
    [-13.2,-6.6,0,6.6,13].forEach(z=>{ box(w,.26,3.6,.34,BALKEN,x,1.8,z); strich(w,[x,3.5,z],[s*16.35,6.3,z],.19,BALKEN); strich(w,[x,4.9,z],[s*17.2,4.9,z],.09,HOLZ2); });
    box(w,.3,.3,T,BALKEN,s*16.35,6.3,0); box(w,.24,.24,T,HOLZ2,x,3.55,0);
    for(let i=0;i<4;i++){ const z=-9.9+i*6.6; strich(w,[x,3.6,z-3],[s*16.4,6.25,z+3],.07,HOLZ2); } });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
  /* dezente Spinnweben in zwei oberen Ecken */
  const spinn=basis(0xb4a692);
  [-1,1].forEach(s=>{ const g=gruppe(hinten,s*17.55,6.0,HINTEN+.34), P=[0,1,2,3,4].map(i=>{ const a=i*Math.PI/8; return [-s*Math.cos(a),-Math.sin(a)]; });
    P.forEach(p=>strich(g,[0,0,0],[p[0]*1.5,p[1]*1.5,0],.006,spinn));
    [.5,.9,1.3].forEach(r=>{ for(let i=0;i<4;i++) strich(g,[P[i][0]*r,P[i][1]*r,0],[P[i+1][0]*r,P[i+1][1]*r,0],.005,spinn); }); verschmelze(g); ohneSchatten(g); });
}
/* Wimpelkette zwischen zwei Punkten */
function wimpel(par,a,b,quer){
  const n=11, F=[ROT,GOLD,BLAU,GRUEN,ORANGE];
  let alt=a;
  for(let i=1;i<=n;i++){ const u=i/n, p=[a[0]+(b[0]-a[0])*u, a[1]+(b[1]-a[1])*u-Math.sin(u*Math.PI)*.55, a[2]+(b[2]-a[2])*u];
    strich(par,alt,p,.015,PAPIER2);
    if(i<n){ const q=kegel(par,.18,.4,F[i%5],p[0],p[1]-.2,p[2]); q.rotation.x=Math.PI; if(quer) q.scale.x=.04; else q.scale.z=.04; }
    alt=p; }
}

function baue(k){
  const sc=k.scene, wandTex=bretterBild();
  const h=DET.huelle(k,{ B,T,H, himmelLicht:0xffe8cc, grund:0x6a4a38, staerke:.8, sonne:0xe8e4ff, sonneStaerke:.36,
    wandBild:wandTex, bodenBild:DET.dielenBild([172,124,80],'#432a16'), leiste:HOLZ3, sockel:0, oeffnung:{x:AX,b:2.5,h:4.45} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueLuke(k,sc,hinten,wandTex);
  baueFenster(k,sc,hinten);
  gebaelk(hinten,links,rechts);

  /* ---------- Teppiche (flach, ohne Hindernis) ---------- */
  DET.teppich(sc,0,2.4,6.2,5.0,0x8a3030,0xd8b060);
  DET.teppich(sc,0,-8.4,2.6,3.6,0x2a4a6a,0xd8b060);
  DET.teppich(sc,-10.8,-2.2,5.4,4.2,0x3f6a4a,0xd8b060);
  DET.teppich(sc,10.8,5.0,4.8,4.2,0x5a4a7a,0xd8b060);
  DET.teppich(sc,-1.2,10.6,5.6,2.8,0x2f6a6a,0xe8c880);

  /* ---------- Deko an der Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0);
  tuchSchrank(dh,-15.7,-12.75,0,TUCH,TUCH2); k.kasten(-15.7,-12.75,2.4,1.2);
  leereRahmen(dh,-11.4,-12.75,0); k.kasten(-11.4,-12.7,2.8,1.2);
  stehlampe(dh,-9.0,-12.6,ORANGE); k.kreis(-9.0,-12.6,.7);
  schein(hinten,'rgba(255,200,110,.5)',-9.0,2.35,-11.9,2.0);
  kaefig(dh,8.2,-12.75); k.kreis(8.2,-12.75,.62);
  abgedeckt(dh,15.4,-12.45,0,2.8,TUCHG,TUCHG2); k.kasten(15.4,-12.4,3.0,1.65);
  laterne(k,dh,-2.55,3.0,HINTEN+.22,0); laterne(k,dh,2.55,3.0,HINTEN+.22,0);
  uhr(k,dh,-13.6,3.25,HINTEN+.28,0);
  wimpel(dh,[-8.4,5.3,HINTEN+.4],[-2.85,5.3,HINTEN+.4]);
  wimpel(dh,[8.4,5.3,HINTEN+.4],[13.5,5.3,HINTEN+.4]);
  /* warmes Licht der Laternen */
  flacker(k,-6.0,3.6,-10.2,0xffb050,.55,12); flacker(k,-11.0,4.0,3.0,0xffb864,.45,13);

  /* ---------- Deko links ---------- */
  const dl=gruppe(links,0,0,0);
  abgedeckt(dl,-16.85,-8.9,Math.PI/2,3.6,TUCH,TUCH2); k.kasten(-16.8,-8.9,1.7,3.8);
  wandbrett(dl,-17.98,2.3,-.7,Math.PI/2);
  tuchSchrank(dl,-17.2,-3.6,Math.PI/2,TUCHG,TUCHG2); k.kasten(-17.2,-3.6,1.2,2.45);
  wagenrad(dl,-17.35,1.9,Math.PI/2); k.kasten(-17.3,1.9,1.1,2.5);
  huete(dl,-16.9,6.4); k.kreis(-16.9,6.4,.75);
  rollen(dl,-16.9,10.4,true); k.kasten(-16.9,10.4,1.4,2.7);
  wandbrett(dl,-17.98,2.6,8.9,Math.PI/2);
  laterne(k,dl,-17.7,3.0,3.8,Math.PI/2); laterne(k,dl,-17.7,3.0,-11.4,Math.PI/2);
  wimpel(dl,[-17.5,5.2,-6.4],[-17.5,5.2,-.2],true);

  /* ---------- Deko rechts ---------- */
  const dr=gruppe(rechts,0,0,0);
  leereRahmen(dr,17.15,-8.6,-Math.PI/2); k.kasten(17.1,-8.5,1.4,3.0);
  abgedeckt(dr,16.85,-2.4,-Math.PI/2,2.8,TUCH,TUCH2); k.kasten(16.8,-2.4,1.7,3.0);
  stehlampe(dr,16.9,1.5,0x9a3a4a); k.kreis(16.9,1.5,.72);
  schein(rechts,'rgba(255,200,110,.5)',16.3,2.35,1.5,2.0);
  stuhl(dr,16.8,5.4,-Math.PI/2); k.kasten(16.8,5.4,1.35,1.4);
  rollen(dr,16.9,9.8,true); k.kasten(16.9,9.8,1.4,2.7);
  wandbrett(dr,17.98,2.4,-5.4,-Math.PI/2);
  rollenStehend(dr,17.2,-11.2); k.kasten(17.2,-11.15,1.5,.9);
  uhr(k,dr,17.7,3.0,3.6,-Math.PI/2);
  laterne(k,dr,17.7,3.0,-11.0,-Math.PI/2); laterne(k,dr,17.7,3.0,7.8,-Math.PI/2);
  wimpel(dr,[17.5,5.2,.2],[17.5,5.2,6.4],true);
  [dh,dl,dr].forEach(verschmelze);

  /* ---------- Deko vorn und seitlich im Raum (niedrig, an den Rändern) ---------- */
  const v=gruppe(sc,0,0,0);
  abgedeckt(v,-9.4,12.2,Math.PI,3.2,TUCHG,TUCHG2); k.kasten(-9.4,12.2,3.4,1.65);
  balkenStapel(v,7.0,12.4,3.6); k.kasten(7.0,12.4,3.8,1.35);
  rollen(v,-14.0,12.3); k.kasten(-14.0,12.3,2.8,1.4);
  abgedeckt(v,14.0,12.2,Math.PI,2.6,TUCH,TUCH2); k.kasten(14.0,12.2,2.8,1.65);
  leereRahmen(v,2.8,12.4,Math.PI); k.kasten(2.8,12.4,2.8,1.2);
  kaefig(v,-4.8,12.2); k.kreis(-4.8,12.2,.62);
  stehlampe(v,10.8,12.0,0x3f7a6a); k.kreis(10.8,12.0,.72);
  verschmelze(v);

  return { tuer, start:[0,-.6] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-13.4,-10.4],[-7.6,-8.8],[-14.4,-5.6],[-6.8,-4.6],[-1.4,-7.6],[8.2,-9.2],[13.4,-10.4],[14.2,-5.4],[7.4,-3.2],[-7.8,1.6],
  [0,3.8],[-14.4,1.0],[-14.2,8.6],[-6.6,6.8],[-2.4,9.4],[4.2,8.2],[7.6,5.6],[14.4,7.6],[14.0,1.2],[-12.4,10.4]];

/* ---------- Bilder für die Wand-Gegenstände ---------- */
function spiegelBild(){
  return bild(256,320,(g)=>{ const v=g.createLinearGradient(0,0,256,320); v.addColorStop(0,'#e8f6ff'); v.addColorStop(.5,'#9cc4dc'); v.addColorStop(1,'#5a86aa'); g.fillStyle=v; g.fillRect(0,0,256,320);
    g.strokeStyle='rgba(255,255,255,.75)'; g.lineCap='round'; [[18,50,150,120,60],[8,70,185,175,70],[26,150,262,222,205]].forEach(([w,x1,y1,x2,y2])=>{ g.lineWidth=w; g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke(); }); });
}
function kartenBild(){
  return bild(640,400,(g)=>{ g.fillStyle='#eedaa8'; g.fillRect(0,0,640,400);
    for(let i=0;i<120;i++){ g.fillStyle='rgba(140,100,40,.09)'; g.beginPath(); g.arc(zufall()*640,zufall()*400,4+zufall()*18,0,7); g.fill(); }
    g.fillStyle='#8ab8d0'; g.fillRect(24,24,592,352);
    const land=(P,f)=>{ g.fillStyle=f; g.strokeStyle='#6a4a20'; g.lineWidth=4; g.beginPath(); P.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.closePath(); g.fill(); g.stroke(); };
    land([[50,80],[130,46],[230,70],[210,130],[260,170],[190,220],[150,190],[90,200],[60,140]],'#d8c070');
    land([[180,260],[250,240],[290,290],[240,360],[200,330]],'#9ab060');
    land([[360,60],[480,44],[580,90],[560,170],[600,230],[500,250],[450,190],[380,180],[340,110]],'#c8a860');
    land([[460,300],[540,290],[570,340],[490,356]],'#9ab060');
    g.strokeStyle='#c02828'; g.lineWidth=7; g.setLineDash([16,12]); g.beginPath(); g.moveTo(110,130); g.bezierCurveTo(220,330,330,60,505,140); g.stroke(); g.setLineDash([]);
    g.lineWidth=11; g.beginPath(); g.moveTo(488,122); g.lineTo(526,160); g.moveTo(526,122); g.lineTo(488,160); g.stroke();
    /* Windrose */
    g.fillStyle='#5a3a18'; [[0,-1],[1,0],[0,1],[-1,0]].forEach(([a,b])=>{ g.beginPath(); g.moveTo(365+a*50,300+b*50); g.lineTo(365+b*11,300-a*11); g.lineTo(365-b*11,300+a*11); g.fill(); });
    g.fillStyle='#e8b830'; g.beginPath(); g.arc(365,300,9,0,7); g.fill(); });
}
function globusBild(){
  return bild(512,256,(g)=>{ g.fillStyle='#4a94d0'; g.fillRect(0,0,512,256);
    g.strokeStyle='rgba(255,255,255,.35)'; g.lineWidth=2; for(let x=0;x<=512;x+=64){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,256); g.stroke(); } [64,128,192].forEach(y=>{ g.beginPath(); g.moveTo(0,y); g.lineTo(512,y); g.stroke(); });
    const fleck=(x,y,a,b,f)=>{ g.fillStyle=f; g.beginPath(); for(let i=0;i<14;i++){ const w=i/14*6.283, q=.7+((i*37)%10)/18; const px=x+Math.cos(w)*a*q, py=y+Math.sin(w)*b*q; if(i) g.lineTo(px,py); else g.moveTo(px,py); } g.closePath(); g.fill(); };
    [[60,80,46,40],[100,170,28,44],[200,70,40,28],[220,140,34,46],[330,78,74,40],[390,180,36,24],[470,110,26,34]].forEach(([x,y,a,b],i)=>fleck(x,y,a,b,i%3?'#7ab058':'#d8bc5a'));
    g.fillStyle='#f4f8ff'; g.fillRect(0,0,512,14); g.fillRect(0,240,512,16); });
}

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-3.7, z:-5.2, steh:[-3.7,-3.15], kasten:[2.8,1.8], treffer:[2.8,2.7,1.8], baue(g,k){ /* 1 Alte Koffer */
      const koffer=(y,b,h,t,f,d,dreh,dx)=>{ const q=gruppe(g,dx,y,0); q.rotation.y=dreh;
        box(q,b,h,t,f,0,h/2,0); box(q,b+.04,.07,t+.04,d,0,h*.66,0);
        [-b*.28,b*.28].forEach(x=>{ box(q,.17,h+.05,t+.06,HOLZ3,x,h/2,0); box(q,.22,.18,.04,GOLD,x,h*.66,t/2+.05); });
        [-1,1].forEach(a=>[.07,h-.07].forEach(yy=>[-1,1].forEach(c=>box(q,.2,.17,.2,MESSING2,a*(b/2-.07),yy,c*(t/2-.07)))));
        return q; };
      koffer(0,2.5,.85,1.45,0xa83a2a,0x6a1e14,.04,0);
      const m=koffer(.87,2.0,.68,1.2,0x2f5f8a,0x1c3a58,-.14,-.08);
      flach(walze(m,.19,.03,CREME,0,.32,.62)); flach(walze(m,.11,.04,ROT,0,.32,.625));
      const o=koffer(1.57,1.45,.55,.95,0xc89850,0x8a6028,.2,.1);
      ring(o,.26,.065,HOLZ3,0,.56,0,Math.PI);
      const s=box(o,.34,.24,.03,GRUEN,.03,.24,.49); s.rotation.z=.2; flach(walze(g,.17,.03,GOLD,.15,.35,.77)); const s2=box(g,.4,.28,.03,CREME,-.2,.34,.765); s2.rotation.z=-.25; } },
  { x:-10.5, z:-3.2, dreh:.22, steh:[-10.0,-.9], kasten:[4.2,2.7], treffer:[3.6,3.3,2.0], baue(g,k){ /* 2 Schaukelpferd */
      const wippe=gruppe(g,0,2.75,0); wippe.userData.lebendig=true; const s=gruppe(wippe,0,-2.75,0);
      const F=0xf2e8d4, M=0x8a3a1c;
      [-.55,.55].forEach(z=>{ const bogen=1.3, r=ring(s,2.65,.11,0xb03a28,0,2.77,z,bogen); r.rotation.z=-Math.PI/2-bogen/2; [-1,1].forEach(v=>ball(s,.16,GOLD,v*1.62,.67,z)); });
      [-.9,.9].forEach(x=>box(s,.22,.1,1.2,HOLZ,x,.28,0));
      [[-.85,-.5],[.85,.5]].forEach(([x,v])=>[-.55,.55].forEach(z=>{ strich(s,[x+v*.3,.3,z],[x-v*.1,1.45,z*.55],.12,F); ball(s,.15,HOLZ3,x+v*.3,.36,z,1.1,.9,1); }));
      ball(s,.62,F,0,1.55,0,1.8,.95,.85); [[-.55,1.4,.48],[.5,1.38,.48],[-.85,1.65,.36]].forEach(([x,y,z])=>ball(s,.1,0xc8b498,x,y,z,1.2,1,.5));
      strich(s,[.7,1.7,0],[1.22,2.5,0],.3,F); ball(s,.34,F,1.32,2.58,0,1.15,1,.85); ball(s,.24,F,1.68,2.4,0,1.35,.85,.85); ball(s,.15,0xe0a898,1.9,2.34,0,.8,.9,1.1);
      [-1,1].forEach(v=>{ const o=kegel(s,.12,.34,F,1.18,2.97,v*.17); o.rotation.x=v*.25; ball(s,.075,SCHWARZ,1.52,2.66,v*.27); ball(s,.025,WEISS,1.55,2.69,v*.33); ball(s,.03,HOLZ3,1.98,2.38,v*.1); });
      for(let i=0;i<7;i++){ const u=i/6; ball(s,.19,M,1.14-u*.68,2.9-u*.95,0,.9,1.1,.8); }
      ball(s,.14,M,1.4,2.88,0,1.3,.7,1);
      ring(s,.25,.035,BLAU,1.62,2.43,0).rotation.y=Math.PI/2; strich(s,[1.65,2.3,.23],[.2,2.12,.45],.025,BLAU);
      box(s,.95,.14,1.02,ROT,-.1,2.1,0); [-1,1].forEach(v=>{ box(s,.75,.55,.07,ROT,-.1,1.82,v*.55); box(s,.77,.08,.08,GOLD,-.1,1.55,v*.55); ring(s,.13,.03,METALL,.05,1.22,v*.62); strich(s,[0,1.8,v*.59],[.05,1.34,v*.62],.025,HOLZ3); });
      ball(s,.15,ROT,.34,2.2,0,.8,1.2,2.2); ball(s,.15,ROT,-.55,2.2,0,.8,1.1,2.4);
      strich(s,[-1.05,1.75,0],[-1.45,1.55,0],.15,M); strich(s,[-1.45,1.55,0],[-1.62,.95,0],.13,M); ball(s,.17,M,-1.63,.92,0,.8,1.4,.8);
      verschmelze(s);
      k.anim.push(t=>{ wippe.rotation.z=Math.sin(t*1.6)*.05; }); } },
  { x:3.9, z:-5.2, steh:[3.9,-3.15], kasten:[3.0,1.8], treffer:[2.9,2.4,1.8], baue(g,k){ /* 3 Truhe */
      const K=0x7a3418, K2=0x924422, BAND=0x3f4a52;
      [-1.15,1.15].forEach(x=>[-.55,.55].forEach(z=>box(g,.34,.2,.34,BAND,x,.1,z)));
      box(g,2.6,1.1,1.45,K,0,.72,0); [.45,.8].forEach(y=>box(g,2.62,.035,1.47,HOLZ3,0,y,0));
      const deckel=new THREE.Mesh(new THREE.CylinderGeometry(.725,.725,2.6,24,1,false,0,Math.PI),mat(K2)); deckel.rotation.z=Math.PI/2; deckel.position.set(0,1.27,0); deckel.scale.x=.9; deckel.castShadow=true; g.add(deckel);
      box(g,2.72,.14,1.57,BAND,0,1.27,0); box(g,2.72,.12,1.57,BAND,0,.24,0);
      [-1.18,-.62,.62,1.18].forEach(x=>{ const r=ring(g,.73,.06,GOLD,x,1.27,0,Math.PI); r.rotation.y=Math.PI/2; r.scale.y=.9; box(g,.14,1.1,1.5,GOLD,x,.72,0); [.45,.95].forEach(y=>ball(g,.05,HOLZ3,x,y,.77)); });
      box(g,.56,.62,.1,GOLD,0,1.08,.76); ball(g,.085,SCHWARZ,0,1.12,.82); box(g,.065,.2,.04,SCHWARZ,0,.99,.82); ring(g,.14,.04,MESSING2,0,1.42,.78,Math.PI);
      [-1,1].forEach(s=>{ const r=ring(g,.24,.05,GOLD,s*1.37,.85,0); r.rotation.y=Math.PI/2; });
      const f=schein(g,'rgba(255,230,140,.8)',.62,1.85,.7,.5);
      k.anim.push(t=>{ const w=.6*Math.max(0,Math.sin(t*1.7)); f.scale.set(w,w,1); }); } },
  { x:-4.25, z:.3, steh:[-4.3,2.35], kasten:[2.5,1.9], treffer:[2.5,2.5,1.9], baue(g,k){ /* 4 Kiste mit Taschenlampe */
      const K=0xd0a460, L=0xa87838;
      box(g,2.1,1.25,1.5,K,0,.64,0);
      [-1,1].forEach(s=>[-1,1].forEach(c=>box(g,.18,1.33,.18,L,s*1.02,.66,c*.72)));
      [.1,1.22].forEach(y=>{ [-1,1].forEach(c=>box(g,2.1,.17,.08,L,0,y,c*.77)); [-1,1].forEach(s=>box(g,.08,.17,1.5,L,s*1.07,y,0)); });
      [-1,1].forEach(c=>strich(g,[-.9,.2,c*.77],[.9,1.12,c*.77],.07,L));
      [-.5,0,.5].forEach(z=>box(g,2.12,.04,.03,L,0,1.285,z));
      /* Zettel, auf den die Lampe leuchtet */
      const z=box(g,.52,.03,.66,PAPIER,.66,1.31,.28); z.rotation.y=-.35;
      /* Taschenlampe auf zwei Hölzchen */
      const l=gruppe(g,-.4,1.83,-.05); l.rotation.set(0,-.3,-.22);
      const quer=m=>{ m.rotation.z=Math.PI/2; return m; };
      quer(walze(l,.2,1.0,0xd0342a,-.12,0,0)); quer(rohr(l,.2,.36,.34,0xd0342a,.54,0,0)).rotation.z=Math.PI/2;
      quer(walze(l,.38,.14,METALL,.76,0,0)); hell(quer(walze(l,.31,.04,basis(0xfff6b8),.84,0,0)));
      quer(walze(l,.23,.12,METALL,-.64,0,0)); [-.35,-.2,-.05].forEach(x=>quer(walze(l,.215,.05,HOLZ3,x,0,0))); box(l,.26,.1,.16,GOLD,.18,.21,0);
      box(g,.18,.5,.5,L,-.75,1.52,-.12);
      const kg=new THREE.Mesh(new THREE.CylinderGeometry(.68,.3,1.25,18,1,true),basis(0xfff0a0,{transparent:true,opacity:.2,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
      kg.rotation.z=-Math.PI/2; kg.position.set(1.47,0,0); l.add(kg);
      const s=schein(l,'rgba(255,245,170,.85)',.95,0,.1,1.0);
      const li=new THREE.PointLight(0xfff0a0,.45,5,1.5); li.position.set(.9,2.1,.5); g.add(li);
      k.anim.push(t=>{ const q=1+Math.sin(t*2.4)*.1; s.scale.set(q,q,1); li.intensity=.45*q; }); } },
  { x:-5.9, y:-.22, z:HINTEN, wand:'hinten', steh:[-5.9,-11.4], kasten:[2.8,.8], treffer:[2.6,3.3,.8], trefferY:.55, baue(g,k){ /* 5 Alter Spiegel */
      const m=new THREE.Mesh(new THREE.CircleGeometry(1,40),basis(0xffffff,{map:spiegelBild()})); m.position.set(0,2.2,.18); m.scale.set(.9,1.2,1); g.add(m);
      const rueck=flach(walze(g,1,.12,HOLZ3,0,2.2,.08)); rueck.scale.set(1.08,.12,1.38);
      [[.98,1.28,.13,GOLD],[1.13,1.43,.06,MESSING2]].forEach(([a,b,d,c])=>{ const r=ring(g,1,d,c,0,2.2,.2); r.scale.set(a,b,1); });
      for(let i=0;i<14;i++){ const a=i*Math.PI/7; ball(g,.09,MESSING,Math.cos(a)*1.13,2.2+Math.sin(a)*1.43,.27); }
      ball(g,.21,GOLD,0,3.68,.24,1.3,1,.7); [-1,1].forEach(s=>ball(g,.13,GOLD,s*.3,3.6,.22,1.4,.8,.7)); ball(g,.08,ROT,0,3.68,.39);
      ball(g,.17,GOLD,0,.72,.22,1.8,.8,.7);
      const f=schein(g,'rgba(255,255,255,.9)',-.4,2.75,.4,.5);
      k.anim.push(t=>{ const w=.8*Math.pow(Math.max(0,Math.sin(t*1.3)),4)+.05; f.scale.set(w,w,1); }); } },
  { x:11.1, y:-.2, z:HINTEN, wand:'hinten', steh:[11.1,-11.4], kasten:[3.8,.8], treffer:[3.8,2.8,.8], trefferY:.95, baue(g,k){ /* 6 Alte Landkarte */
      const m=new THREE.Mesh(new THREE.PlaneGeometry(3.3,2.06),basis(0xe8e4dc,{map:kartenBild()})); m.position.set(0,2.3,.2); g.add(m);
      [1.2,3.4].forEach(y=>{ walze(g,.15,3.5,PAPIER2,0,y,.23).rotation.z=Math.PI/2; [-1,1].forEach(s=>{ walze(g,.08,.22,HOLZ3,s*1.84,y,.23).rotation.z=Math.PI/2; ball(g,.11,GOLD,s*1.97,y,.23); }); });
      [-1,1].forEach(s=>strich(g,[s*1.5,3.48,.15],[0,3.82,.1],.025,HOLZ3)); ball(g,.1,METALL2,0,3.84,.14); } },
  { x:4.3, z:.1, steh:[4.4,2.4], kasten:[2.6,2.8], treffer:[2.6,2.5,2.8], baue(g,k){ /* 7 Kiste mit alten Büchern */
      const K=0x3f7a72, L=0x285650;
      box(g,2.3,.16,1.55,L,0,.1,0); [-1,1].forEach(c=>box(g,2.3,.95,.12,K,0,.62,c*.72)); [-1,1].forEach(s=>box(g,.12,.95,1.5,K,s*1.1,.62,0));
      [-1,1].forEach(c=>{ [.32,.92].forEach(y=>box(g,2.36,.09,.05,L,0,y,c*.79)); [-1.1,1.1].forEach(x=>box(g,.18,1.05,.1,L,x,.62,c*.76)); });
      [-1,1].forEach(s=>box(g,.06,.14,.6,HOLZ3,s*1.18,.85,0));
      /* Bücher stehen in der Kiste */
      [[-.36,1.5],[.26,1.38]].forEach(([z,y0],reihe)=>{ let x=-.98; let i=reihe*3;
        while(x<.74){ const b=.2+((i*7)%4)*.035, h=.9+((i*5)%5)*.11, q=box(g,b,h,.54,BUCH[i%BUCH.length],x+b/2,y0-.45+h/2,z);
          box(g,b+.012,.07,.55,GOLD,x+b/2,y0-.45+h*.78,z); box(g,b-.07,h+.012,.45,PAPIER,x+b/2,y0-.45+h/2,z-.02); q.rotation.z=0; x+=b+.03; i++; } });
      const s=box(g,.22,.95,.52,ROT,.92,1.42,.2); s.rotation.z=.38;
      /* Bücher davor, zuoberst ein offenes Buch */
      box(g,.85,.17,.55,BLAU,-.55,.12,1.04).rotation.y=.2; box(g,.78,.1,.5,PAPIER,-.55,.13,1.07).rotation.y=.2; box(g,.7,.15,.5,0x8a5a2a,-.5,.29,1.02).rotation.y=-.15;
      [-1,1].forEach(v=>{ const q=box(g,.4,.06,.46,PAPIER,-.5+v*.2,.47,1.04); q.rotation.z=v*.14; const d=box(g,.43,.04,.5,0x7a2a4a,-.5+v*.21,.43,1.04); d.rotation.z=v*.14; }); } },
  { x:10.8, z:-4.1, steh:[10.6,-1.9], r:1.25, treffer:[2.4,3.6,2.1], baue(g,k){ /* 8 Alter Globus */
      walze(g,.8,.14,HOLZ3,0,.08,0); [0,1,2].forEach(i=>{ const a=i*2.094+.4; strich(g,[0,.75,0],[Math.sin(a)*.9,.12,Math.cos(a)*.9],.11,HOLZ2); ball(g,.15,HOLZ3,Math.sin(a)*.92,.13,Math.cos(a)*.92); });
      walze(g,.13,.75,HOLZ,0,.9,0); ball(g,.2,GOLD,0,.85,0);
      const achse=gruppe(g,0,2.3,0); achse.rotation.z=-.4; achse.userData.lebendig=true;
      const kugel=new THREE.Mesh(new THREE.SphereGeometry(.98,32,22),new THREE.MeshLambertMaterial({map:globusBild(),emissive:0x101820})); kugel.castShadow=true; achse.add(kugel);
      const r=ring(achse,1.12,.055,GOLD,0,0,0,Math.PI); r.rotation.z=Math.PI/2;
      [-1,1].forEach(s=>{ walze(achse,.05,.22,GOLD,0,s*1.08,0); ball(achse,.1,GOLD,0,s*1.19,0); });
      strich(g,[0,1.15,0],[-.43,1.27,0],.09,GOLD);
      k.anim.push(t=>{ kugel.rotation.y=t*.25; }); } },
  { x:-11.2, z:4.8, dreh:.18, steh:[-10.7,7.0], kasten:[3.6,2.3], treffer:[3.2,2.9,1.8], baue(g,k){ /* 9 Nähmaschine auf Tisch mit Handrad und Stoff */
      const EISEN=0x2a2e34, LACK=0x1e2430, STOFF=0xd8486a, TUPF=0xfff0d8;
      box(g,3.0,.16,1.35,0xd09a58,0,1.22,0); box(g,3.06,.07,1.41,HOLZ2,0,1.13,0);
      [-1.25,1.25].forEach(x=>{ [-.5,.5].forEach(z=>strich(g,[x,1.12,z*.8],[x,.06,z*1.1],.07,EISEN)); strich(g,[x,.18,-.5],[x,1.0,.38],.04,EISEN); strich(g,[x,.18,.5],[x,1.0,-.38],.04,EISEN); const r=ring(g,.22,.035,EISEN,x,.6,0); r.rotation.y=Math.PI/2; });
      strich(g,[-1.25,.3,-.3],[1.25,.3,-.3],.05,EISEN); box(g,1.2,.07,.6,EISEN,0,.22,.12);
      /* Maschine */
      box(g,1.95,.16,.62,LACK,.1,1.38,-.18); walze(g,.2,.7,LACK,.83,1.76,-.18); strich(g,[.88,2.12,-.18],[-.55,2.12,-.18],.21,LACK); ball(g,.22,LACK,.88,2.12,-.18); box(g,.38,.55,.4,LACK,-.65,2.0,-.18);
      walze(g,.028,.34,METALL,-.65,1.6,-.12); box(g,.24,.05,.2,METALL,-.65,1.49,-.12);
      [-.2,.1,.4].forEach(x=>ball(g,.07,GOLD,x,2.12,.04,1.6,.8,.4)); box(g,1.8,.035,.02,GOLD,.1,1.39,.14); box(g,.26,.04,.02,GOLD,-.65,2.17,.03);
      walze(g,.03,.3,METALL,.15,2.46,-.18); walze(g,.13,.26,0x2fa0a8,.15,2.5,-.18); [-1,1].forEach(s=>walze(g,.16,.04,HELLHOLZ,.15,2.5+s*.15,-.18));
      const rad=gruppe(g,1.18,2.08,-.18); rad.userData.lebendig=true;
      const felge=ring(rad,.4,.075,0xd0342a,0,0,0); felge.rotation.y=Math.PI/2; [0,1,2].forEach(i=>{ const a=i*1.047; strich(rad,[0,-Math.cos(a)*.38,-Math.sin(a)*.38],[0,Math.cos(a)*.38,Math.sin(a)*.38],.035,GOLD); });
      ball(rad,.1,GOLD,0,0,0); strich(rad,[0,.3,0],[.2,.3,0],.04,METALL); ball(rad,.075,HOLZ3,.22,.3,0); verschmelze(rad);
      strich(g,[.95,2.08,-.18],[1.18,2.08,-.18],.08,METALL);
      /* Stoff läuft unter der Nadel durch und hängt vorn herunter */
      box(g,1.25,.04,1.0,STOFF,-.75,1.49,.22).castShadow=false; box(g,1.25,.2,.05,STOFF,-.75,1.39,.73); box(g,1.25,.75,.06,STOFF,-.75,.98,.76);
      [-1.2,-.75,-.3].forEach((x,i)=>{ [0,1].forEach(j=>flach(walze(g,.075,.02,TUPF,x+j*.18,1.15-j*.35-(i%2)*.08,.8))); walze(g,.07,.01,TUPF,x+.05,1.518,.3+(i%2)*.25); });
      for(let i=0;i<5;i++){ const q=kegel(g,.125,.18,STOFF,-1.25+i*.25,.52,.76); q.rotation.x=Math.PI; q.scale.z=.03; }
      /* Garnrollen und Nadelkissen */
      [[.75,0xf0c020],[1.08,GRUEN]].forEach(([x,f])=>{ walze(g,.11,.24,f,x,1.45,.4); [1.32,1.58].forEach(y=>walze(g,.14,.035,HELLHOLZ,x,y,.4)); });
      ball(g,.17,ORANGE,1.28,1.38,.1,1,.7,1); [-.06,.06].forEach(a=>ball(g,.035,WEISS,1.28+a,1.55,.1+a));
      k.anim.push(t=>{ rad.rotation.x=t*1.4; }); } },
  { x:10.9, z:4.4, dreh:-.35, steh:[10.0,6.75], r:1.45, treffer:[2.6,3.7,2.2], baue(g,k){ /* 10 Teddybär auf Hocker */
      const F=0xc07c3c, H2=0xeccf9c, D=0x8a5428;
      /* Hocker mit Polster */
      [[-.6,-.6],[.6,-.6],[-.6,.6],[.6,.6]].forEach(([x,z])=>strich(g,[x*1.15,0,z*1.15],[x*.8,.7,z*.8],.12,HOLZ2));
      walze(g,1.0,.2,HOLZ,0,.74,0); walze(g,.92,.14,0x2f6a8a,0,.9,0); flach(ring(g,.92,.07,GOLD,0,.88,0));
      /* Körper */
      ball(g,.72,F,0,1.6,-.12,1,1.08,.88); ball(g,.45,H2,0,1.52,.33,1,1.15,.65);
      [-1,1].forEach(s=>{ strich(g,[s*.4,1.2,0],[s*.68,1.12,.82],.28,F); ball(g,.37,F,s*.7,1.13,.9,1,1.05,.95); ball(g,.22,H2,s*.72,1.13,1.19,1,1.15,.4);
        [-.13,0,.13].forEach(a=>ball(g,.06,H2,s*.72+a,1.39,1.18,1,1,.6));
        strich(g,[s*.55,2.0,-.05],[s*.52,1.5,.52],.22,F); ball(g,.25,F,s*.48,1.45,.6); });
      /* Herz in den Tatzen */
      [-1,1].forEach(s=>ball(g,.2,0xe0303a,s*.13,1.55,.74,1,1,.7)); const h=kegel(g,.3,.38,0xe0303a,0,1.32,.74); h.rotation.x=Math.PI; h.scale.z=.14; ball(g,.05,0xff9aa0,-.17,1.62,.89);
      /* Kopf */
      const kopf=gruppe(g,0,2.75,.02); kopf.userData.lebendig=true;
      ball(kopf,.66,F,0,0,0,1.05,.96,.95);
      [-1,1].forEach(s=>{ ball(kopf,.27,F,s*.55,.5,-.05,1,1,.6); ball(kopf,.16,H2,s*.55,.5,.1,1,1,.45); ball(kopf,.09,SCHWARZ,s*.23,.12,.58,1,1.15,.7); ball(kopf,.03,WEISS,s*.23+.035,.17,.65); ball(kopf,.09,0xe08a6a,s*.43,-.14,.47,1.2,.8,.4); });
      ball(kopf,.29,H2,0,-.17,.52,1.15,.85,.75); ball(kopf,.11,HOLZ3,0,-.06,.76,1.3,.9,.7); strich(kopf,[0,-.12,.76],[0,-.23,.74],.018,HOLZ3);
      const mund=ring(kopf,.1,.022,HOLZ3,0,-.22,.73,Math.PI); mund.rotation.z=Math.PI;
      strich(kopf,[0,.62,.05],[0,.35,.55],.012,D);
      verschmelze(kopf);
      /* blaue Schleife */
      [-1,1].forEach(s=>{ const q=kegel(g,.2,.4,0x2a6ad0,s*.24,2.14,.55); q.rotation.z=s*Math.PI/2; q.scale.z=.1; }); ball(g,.11,0x1c4aa0,0,2.14,.58);
      k.anim.push(t=>{ kopf.rotation.z=Math.sin(t*.9)*.09; }); } }
];

return { titel:'Der Dachboden', breite:36, tiefe:27, oben:['22,14,10','50,32,22','90,60,40'], baue, gegenstaende, verstecke };
})();

/* Schlussbild Detektivbüro: Sonnenaufgang auf einer Dachterrasse über den Dächern der Stadt. Die Dachluke klappt auf,
   die Spielfigur steigt heraus und läuft nach vorn, ein Detektivhut schwebt auf ihren Kopf, sie hält eine große Lupe hoch
   und jubelt. Detektivin Frieda Fuchs gratuliert mit einer Medaille und winkt, Spürhund Bello hüpft vor Freude, eine Katze
   schaut vom Schornstein aus zu, Vögel fliegen auf, dazu buntes Konfetti. Ohne Schrift. */
FINALE3D.detektiv = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  const HORIZONT=0xffd4ac;
  sc.background=new THREE.Color(HORIZONT);
  sc.fog=new THREE.Fog(HORIZONT,40,128);
  const himmelsLicht=new THREE.HemisphereLight(0xdfe4ff,0x8a6a54,.62); sc.add(himmelsLicht);
  const licht=new THREE.DirectionalLight(0xffd6a0,.55); licht.position.set(9,11,12); licht.castShadow=true; licht.shadow.mapSize.set(1024,1024);
  const sk=licht.shadow.camera; sk.left=-13; sk.right=13; sk.top=12; sk.bottom=-10; sk.near=1; sk.far=46; licht.shadow.bias=-.001; sc.add(licht);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D(), FARBE=new THREE.Color();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const HOLZ=DET.HOLZ, HOLZ2=DET.HOLZ2, HOLZ3=DET.HOLZ3, MESSING=DET.MESSING, MESSING2=DET.MESSING2, GOLD=DET.GOLD, STEIN=DET.STEIN, STEIN2=DET.STEIN2;
  const ZIEGEL=0xb4604a, ZIEGEL2=0x8e4636;
  const GRUEN=[0x4f8a34,0x69a63e,0x3d7a3a,0x86b446];
  const BUNT=[0xff4f6e,0xffc21a,0x2fb4ff,0x3fd07a,0xb264ec,0xff8a30];
  const schattenFleck=(par,r,y)=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(r,20),basis(0x000000,{transparent:true,opacity:.26,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.y=y||.03; par.add(m); return m; };

  /* ---------- Morgenhimmel: Verlauf, Sonne, Wolken ---------- */
  const KUPPEL=118; /* kleiner als die Sichtweite der Kamera (120), Sonne und Wolken liegen darin */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#39549c'); v.addColorStop(.3,'#5f86cc'); v.addColorStop(.39,'#a4b8e4'); v.addColorStop(.44,'#f2b4b8'); v.addColorStop(.475,'#ffc08a'); v.addColorStop(.5,'#ffd4ac'); v.addColorStop(1,'#ffd4ac'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(KUPPEL,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(1,32),basis(0xfff0a8,{fog:false})); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,195,110,.85)',0,0,0,18); sonnenSchein.material.fog=false;
  const strahlen=gruppe(sc,0,0,0), strahlM=basis(0xffe6a0,{fog:false,transparent:true,opacity:.5,depthWrite:false});
  for(let i=0;i<12;i++){ const a=i*Math.PI/6, s=box(strahlen,.14,i%2?.55:.85,.02,strahlM,Math.cos(a)*1.75,Math.sin(a)*1.75,0); s.rotation.z=a-Math.PI/2; }
  ohneSchatten(strahlen);
  const wolkeHell=basis(0xfff0e6,{fog:false}), wolkeRosa=basis(0xf4b0b4,{fog:false});
  /* [Bildplatz x, Bildplatz y, Größe] */
  const wolken=[[-.72,.74,1],[-.24,.9,.65],[.3,.82,.7],[.9,.9,.55]].map(p=>{ const g=gruppe(sc,0,0,0);
    [[-2.4,0,1.2],[-.9,.35,1.6],[.9,.2,1.4],[2.4,-.05,1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1.3,.5,.4));
    ball(g,1,wolkeRosa,0,-.38,.15,4.1,.42,.4); verschmelze(g); ohneSchatten(g); return { g, p }; });

  /* ---------- Stadt: Häuser mit Dächern, Schornsteinen und Fenstern ringsum und dahinter ---------- */
  const GRUND=-13;
  const strasse=new THREE.Mesh(new THREE.PlaneGeometry(300,300),mat(0x8a7284)); strasse.rotation.x=-Math.PI/2; strasse.position.y=GRUND; sc.add(strasse);
  const WAND=[0xc8a8b0,0xa898b8,0xdcb49c,0x98a8c4,0xd4c09c,0xb88c94,0x9cb4ac];
  const DACH=[0xa8503e,0x6a5a80,0x8a4a4a,0x4e6a86,0xb4663e];
  const haeuser=[], pyramiden=[], fenster=[];
  const haus=(x,z,b,oben,i)=>{ const h=oben-GRUND, t=3.2;
    haeuser.push([x,GRUND+h/2,z,b,h,t,WAND[i%7]]);
    if(i%3){ pyramiden.push([x,oben+.75,z,b*.74,1.5,t*.74,DACH[i%5]]); haeuser.push([x+b*.24,oben+.8,z+.5,.42,1,.42,ZIEGEL2]); haeuser.push([x+b*.24,oben+1.35,z+.5,.54,.14,.54,0x5a4650]); }
    else { haeuser.push([x,oben+.13,z,b+.3,.26,t+.3,DACH[(i+1)%5]]); haeuser.push([x-b*.22,oben+.65,z,.5,.8,.5,ZIEGEL]); haeuser.push([x+b*.18,oben+.45,z+.4,.9,.4,.8,0x8a8a9a]); }
    const spalten=Math.max(2,Math.floor(b/1.05));
    for(let r=0;r<4;r++) for(let s=0;s<spalten;s++) fenster.push([x-b/2+(s+.5)*b/spalten,oben-.75-r*1.25,z+t/2+.03,.46,.64,.04,(r*3+s*2+i)%5<2?0xffe6a0:0x5c648c]); };
  /* Reihen hinter der Terrasse: [z, Dachhöhe von, bis] */
  let nr=0;
  [[-11,-3.4,-.7],[-17,-2.4,.3],[-25,-1.6,1.4],[-35,-.8,2.6],[-48,0,3.8],[-62,.4,5]].forEach((r,j)=>{
    for(let x=-62-j*3;x<62+j*3;x+=4.3+j*.35){ haus(x+zufall()*.9,r[0]-zufall()*2,2.7+zufall()*1.2+j*.2,misch(r[1],r[2],zufall()),nr++); } });
  /* tiefer liegende Häuser links und rechts neben der Terrasse */
  [-1,1].forEach(v=>{ [13,18.5,25,33,43].forEach((x,i)=>[-4.5,1.5,8,16].forEach((z,j)=>haus(v*(x+zufall()*1.4),z+zufall()*1.6,3+zufall(),-6+zufall()*2.6+i*.35-j*.3,nr++))); });
  const dachGeo=new THREE.ConeGeometry(1,1,4); dachGeo.rotateY(Math.PI/4); /* vor dem Strecken drehen, damit die Dächer gerade sitzen */
  DET.viele(sc,GEO.box,haeuser); DET.viele(sc,dachGeo,pyramiden);
  const stadtLicht=new THREE.InstancedMesh(GEO.box,basis(0xffffff),fenster.length);
  fenster.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(0,0,0); o.updateMatrix(); stadtLicht.setMatrixAt(i,o.matrix); stadtLicht.setColorAt(i,FARBE.set(e[6])); });
  stadtLicht.frustumCulled=false; sc.add(stadtLicht);
  /* Uhrturm und Wassertürmchen ragen aus dem Häusermeer */
  const tuerme=gruppe(sc,0,0,0);
  box(tuerme,2.6,20,2.6,0xc49c8c,-14,GRUND+10,-27); box(tuerme,3,.35,3,STEIN,-14,7.1,-27); const spitze=kegel(tuerme,2.2,2.4,0x4e6a86,-14,8.4,-27); spitze.rotation.y=Math.PI/4;
  ball(tuerme,.25,GOLD,-14,9.75,-27);
  const zblatt=walze(tuerme,.95,.12,0xfff6e0,-14,5.6,-25.65); zblatt.rotation.x=Math.PI/2; ring(tuerme,.98,.1,MESSING,-14,5.6,-25.58);
  strich(tuerme,[-14,5.6,-25.52],[-14,6.3,-25.52],.07,HOLZ3); strich(tuerme,[-14,5.6,-25.52],[-13.5,5.35,-25.52],.08,HOLZ3);
  [[12.5,-22,2.4],[-26,-14,.6]].forEach(([x,z,y])=>{ [-1,1].forEach(a=>[-1,1].forEach(b=>walze(tuerme,.09,y+8,HOLZ3,x+a*.75,y-4,z+b*.75))); walze(tuerme,1.25,1.8,HOLZ,x,y+.9,z); [.35,1.45].forEach(h=>walze(tuerme,1.29,.12,HOLZ3,x,y+h,z)); kegel(tuerme,1.45,.9,0x8a4a4a,x,y+2.25,z); });
  ohneSchatten(tuerme); verschmelze(tuerme);

  /* ---------- Dachterrasse: Haus darunter, Dielen, Brüstung ---------- */
  const TB=9.2, HINTEN=-4, VORN=26;
  const unterbau=box(sc,TB*2,-GRUND-.05,VORN-HINTEN,0xa86a58,0,GRUND/2-.03,(VORN+HINTEN)/2); unterbau.castShadow=false;
  const dielen=DET.dielenBild([186,132,86],'#5a3418'); dielen.wrapS=dielen.wrapT=THREE.RepeatWrapping; dielen.repeat.set(3,5);
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(TB*2,VORN-HINTEN),new THREE.MeshLambertMaterial({map:dielen})); boden.rotation.x=-Math.PI/2; boden.position.set(0,.002,(VORN+HINTEN)/2); boden.receiveShadow=true; sc.add(boden);
  const bruestung=gruppe(sc,0,0,0);
  /* hinten niedrige Mauer mit Abdeckung und Geländer, an den Seiten ebenso */
  box(bruestung,TB*2+.4,.55,.34,ZIEGEL,0,.275,HINTEN); box(bruestung,TB*2+.6,.12,.5,0xe4d4bc,0,.6,HINTEN);
  for(let x=-TB;x<=TB+.01;x+=TB/12) walze(bruestung,.035,.42,0x3a4048,x,.86,HINTEN);
  box(bruestung,TB*2+.2,.07,.1,0x3a4048,0,1.09,HINTEN);
  [-1,1].forEach(v=>{ box(bruestung,.34,.55,VORN-HINTEN,ZIEGEL,v*TB,.275,(VORN+HINTEN)/2); box(bruestung,.5,.12,VORN-HINTEN,0xe4d4bc,v*TB,.6,(VORN+HINTEN)/2);
    for(let z=HINTEN;z<=14;z+=.78) walze(bruestung,.035,.42,0x3a4048,v*TB,.86,z);
    box(bruestung,.1,.07,VORN-HINTEN,0x3a4048,v*TB,1.09,(VORN+HINTEN)/2);
    [HINTEN,1,6,11].forEach(z=>{ box(bruestung,.55,1.2,.55,ZIEGEL2,v*TB,.6,z); box(bruestung,.7,.14,.7,0xe4d4bc,v*TB,1.26,z); ball(bruestung,.17,MESSING,v*TB,1.46,z); }); });
  for(let i=0;i<46;i++) box(bruestung,.04,.5,.03,ZIEGEL2,-TB+.25+i*(TB*2-.5)/45,.27,HINTEN+.18).castShadow=false;
  verschmelze(bruestung);

  /* ---------- Blumenkübel, Bäumchen, Gießkanne, Kissen ---------- */
  const deko=gruppe(sc,0,0,0);
  const kuebel=(x,z,s,j)=>{ rohr(deko,.42*s,.3*s,.5*s,0xc07450,x,.25*s,z); walze(deko,.44*s,.07*s,0xd89068,x,.51*s,z);
    for(let i=0;i<10;i++){ const a=i*2.4, r=i?.28*s:0; ball(deko,.18*s,GRUEN[(i+j)%4],x+Math.cos(a)*r,.6*s,z+Math.sin(a)*r); ball(deko,.08*s,BUNT[(i%2+j)%6],x+Math.cos(a)*r*1.1,(.76+(i%3)*.04)*s,z+Math.sin(a)*r*1.1+.05*s); } };
  [[-7.9,-3,1.2],[-6.8,-3.2,.85],[7.9,-2.9,1.15],[-8.2,.6,1],[8.2,.9,1.05],[-2.5,-3.25,.75],[2.4,-3.3,.7],[-7.6,4.8,1.1],[7.7,5.2,1]].forEach((p,i)=>kuebel(p[0],p[1],p[2],i));
  [[-5.6,-3,1],[6.6,-3.1,.9]].forEach(([x,z,s],j)=>{ rohr(deko,.4*s,.3*s,.6*s,0x4e6a86,x,.3*s,z); walze(deko,.07*s,1*s,HOLZ2,x,1*s,z);
    [[0,1.85,0,.55],[-.32,1.55,.1,.36],[.34,1.6,.05,.38],[0,2.3,0,.32]].forEach((q,i)=>ball(deko,q[3]*s,GRUEN[(i+j)%4],x+q[0]*s,q[1]*s,z+q[2])); });
  /* Gießkanne mit runder Brause */
  walze(deko,.24,.4,0x4aa0a8,-5.2,.2,-1.6); const tuelle=walze(deko,.05,.5,0x4aa0a8,-4.88,.33,-1.6); tuelle.rotation.z=-.9; ball(deko,.1,MESSING,-4.67,.5,-1.6,.6,1,1); ring(deko,.2,.035,0x3a808a,-5.28,.45,-1.6,Math.PI);
  verschmelze(deko);

  /* ---------- Wimpelkette zwischen zwei Masten ---------- */
  const masten=gruppe(sc,0,0,0), MX=6.9, MZ=-3.65;
  [-1,1].forEach(v=>{ walze(masten,.07,4.5,HOLZ2,v*MX,2.25,MZ); ball(masten,.14,GOLD,v*MX,4.58,MZ); });
  const durchhang=u=>4.45-Math.sin(u*Math.PI)*.75;
  for(let i=0;i<24;i++){ const u=i/24, w=(i+1)/24; strich(masten,[misch(-MX,MX,u),durchhang(u),MZ],[misch(-MX,MX,w),durchhang(w),MZ],.018,HOLZ3); }
  verschmelze(masten);
  const wimpelGeo=new THREE.ConeGeometry(1,1,3);
  const wimpel=[]; for(let i=1;i<22;i++){ const u=i/22, g=gruppe(sc,misch(-MX,MX,u),durchhang(u),MZ+.02), m=teil(g,wimpelGeo,BUNT[i%6],0,-.22,0,.2,.42,.04); m.rotation.z=Math.PI; m.castShadow=false; wimpel.push(g); }

  /* ---------- Dachluke mit aufklappendem Deckel und warmem Licht ---------- */
  const LZ=-1.5, LB=1.8, LH=.36;
  const luke=gruppe(sc,0,0,LZ);
  [-1,1].forEach(v=>{ box(luke,.18,LH,LB,HOLZ2,v*(LB/2-.09),LH/2,0); box(luke,LB-.36,LH,.18,HOLZ2,0,LH/2,v*(LB/2-.09)); box(luke,.24,.07,LB+.06,MESSING2,v*(LB/2-.09),LH+.02,0); box(luke,LB-.42,.07,.24,MESSING2,0,LH+.02,v*(LB/2-.09)); });
  box(luke,LB-.36,.01,LB-.36,basis(0x4a2a10),0,.012,0).castShadow=false;
  verschmelze(luke);
  const lukenSchein=schein(sc,'rgba(255,200,100,.7)',0,.4,LZ,2.6);
  const angel=gruppe(sc,0,LH+.08,LZ-LB/2), deckel=gruppe(angel,0,0,0);
  box(deckel,LB,.12,LB,HOLZ,0,.03,LB/2); [-.55,0,.55].forEach(x=>{ box(deckel,.04,.15,LB-.1,HOLZ3,x,.03,LB/2); });
  [.35,LB-.35].forEach(z=>box(deckel,LB-.12,.16,.14,MESSING2,0,.03,z)); const griff=ring(deckel,.17,.035,MESSING,0,-.05,LB-.12); griff.rotation.x=Math.PI/2;
  verschmelze(deckel);
  const drinnen=new THREE.PointLight(0xffbc5c,.9,5,1.5); drinnen.position.set(0,.8,LZ); sc.add(drinnen);

  /* ---------- Schornstein mit sitzender Katze ---------- */
  const SH=1.35;
  const schornstein=gruppe(sc,4.6,0,-2.4), mauerwerk=gruppe(schornstein,0,0,0);
  box(mauerwerk,1.15,SH,1,ZIEGEL,0,SH/2,0); box(mauerwerk,1.36,.16,1.2,0xe4d4bc,0,SH+.08,0); box(mauerwerk,1.3,.14,1.14,ZIEGEL2,0,.07,0);
  for(let r=1;r<6;r++){ box(mauerwerk,1.17,.025,1.02,ZIEGEL2,0,r*SH/6,0); [-.28,.28].forEach((x,i)=>box(mauerwerk,.025,SH/6,1.02,ZIEGEL2,x+(r%2)*.14-.07,(r+.5)*SH/6-.001,0)); }
  verschmelze(mauerwerk);
  const katz=gruppe(schornstein,0,SH+.16,.12); katz.scale.setScalar(1.15);
  const KF=0x5a5a66, KH=0xf6ead8, KD=0x35353f, kRumpf=gruppe(katz,0,0,0);
  ball(kRumpf,.3,KF,0,.34,-.04,1,1.2,.95); ball(kRumpf,.19,KH,0,.34,.17,1,1.3,.7);
  [-1,1].forEach(v=>{ ball(kRumpf,.2,KF,v*.2,.17,-.08,.9,.85,1.15); walze(kRumpf,.065,.34,KF,v*.11,.18,.24); ball(kRumpf,.085,KH,v*.11,.05,.28,1,.65,1.3); });
  verschmelze(kRumpf);
  const kKopf=gruppe(katz,0,.84,.08), kk=gruppe(kKopf,0,0,0);
  ball(kk,.25,KF,0,0,0,1.1,.95,.95); ball(kk,.12,KH,0,-.08,.18,1.2,.75,.8); ball(kk,.032,0xe0707a,0,-.04,.29);
  [-1,1].forEach(v=>{ const ohr=kegel(kk,.1,.2,KF,v*.16,.25,0); ohr.rotation.z=-v*.3; const innen=kegel(kk,.05,.12,0xe89a9a,v*.155,.23,.05); innen.rotation.z=-v*.3;
    ball(kk,.058,0x8ae85a,v*.1,.04,.215,1,1.1,.6); ball(kk,.024,0x101008,v*.1,.04,.252,.6,1.4,.5); ball(kk,.01,basis(0xffffff),v*.083,.065,.265);
    [-.03,.04].forEach(h=>strich(kk,[v*.07,-.08,.27],[v*.38,-.08+h,.2],.005,0xffffff)); ball(kk,.04,KD,v*.06,.19,.17,.5,1.2,.5); });
  verschmelze(kk);
  const halsband=ring(katz,.17,.032,0xc82a3a,0,.65,.08); halsband.rotation.x=Math.PI/2; ball(katz,.05,GOLD,0,.62,.28);
  /* Schwanz hängt vorn über die Kante und pendelt */
  const kSchwanz=gruppe(katz,.24,.1,.1);
  strich(kSchwanz,[0,0,0],[.2,0,.38],.065,KF); strich(kSchwanz,[.2,0,.38],[.24,-.4,.44],.06,KF); ball(kSchwanz,.068,KF,.2,0,.38); ball(kSchwanz,.08,KH,.24,-.42,.44);

  /* ---------- Detektivin Frieda Fuchs: rote Haare, Mantel, Medaille für die Spielfigur ---------- */
  const frieda=gruppe(sc,-3,0,1.4); frieda.scale.setScalar(1.35);
  const HAUT=0xf2c4a0, HAAR=0xd8501c, HAAR2=0xb03c12, MANTEL=0x2f6e6a, MANTEL2=0x245652, SCHAL=0xf0b830;
  const fk=gruppe(frieda,0,0,0), fRumpf=gruppe(fk,0,0,0);
  [-1,1].forEach(v=>{ walze(fRumpf,.085,.42,0x3a3048,v*.14,.28,0); ball(fRumpf,.12,0x5a2e18,v*.14,.08,.05,1,.7,1.55); });
  rohr(fRumpf,.23,.41,.92,MANTEL,0,.83,0); ball(fRumpf,.23,MANTEL,0,1.29,0,1.15,.5,.95);
  walze(fRumpf,.305,.09,0x5a2e18,0,.94,0); box(fRumpf,.13,.11,.04,GOLD,0,.94,.31);
  box(fRumpf,.025,.5,.03,MANTEL2,0,.65,.365).rotation.x=-.19;
  [-1,1].forEach(v=>{ const kr=box(fRumpf,.11,.27,.04,MANTEL2,v*.11,1.2,.235); kr.rotation.set(-.18,0,-v*.45); [1.12,.76].forEach(y=>ball(fRumpf,.03,GOLD,v*.1,y,y>1?.265:.35));
    box(fRumpf,.15,.04,.05,MANTEL2,v*.2,.67,.3).rotation.y=v*.55; });
  const tuch=ring(fRumpf,.16,.065,SCHAL,0,1.39,.01); tuch.rotation.x=Math.PI/2; box(fRumpf,.11,.3,.05,SCHAL,.08,1.22,.27).rotation.z=.18;
  verschmelze(fRumpf);
  const fKopf=gruppe(fk,0,1.72,0), f2=gruppe(fKopf,0,0,0);
  ball(f2,.29,HAUT,0,0,0);
  const schopf=new THREE.Mesh(new THREE.SphereGeometry(.318,18,12,0,Math.PI*2,0,Math.PI*.5),mat(HAAR)); schopf.position.set(0,.025,-.02); schopf.rotation.x=-.42; f2.add(schopf);
  ball(f2,.27,HAAR,0,-.02,-.11,1.12,1.05,.85);
  ball(f2,.13,HAAR,-.12,.24,.15,1.5,.55,.8).rotation.z=.35; ball(f2,.1,HAAR,.15,.23,.15,1.3,.55,.8).rotation.z=-.5;
  [-1,1].forEach(v=>{ ball(f2,.12,HAAR,v*.28,-.1,-.04,.75,1.5,1); ball(f2,.095,HAAR2,v*.29,-.27,-.05);
    ball(f2,.042,0x20140e,v*.1,.02,.27); ball(f2,.013,basis(0xffffff),v*.088,.037,.309); strich(f2,[v*.06,.11,.278],[v*.15,.12,.262],.012,HAAR2);
    ball(f2,.048,0xf28a80,v*.17,-.08,.222,1,.7,.4);
    [[.13,-.04],[.18,-.025],[.155,-.055]].forEach(q=>ball(f2,.011,0xc07048,v*q[0],q[1],Math.sqrt(Math.max(0,.0841-q[0]*q[0]-q[1]*q[1]))+.006)); });
  ball(f2,.032,0xe8ac88,0,-.04,.288);
  const fMund=ring(f2,.095,.017,0x9a3830,0,-.095,.265,Math.PI); fMund.rotation.z=Math.PI;
  for(let i=0;i<5;i++) ball(f2,.13-i*.014,i%2?HAAR2:HAAR,.05+i*.035,.12-i*.14,-.37-i*.012);
  ball(f2,.07,SCHAL,.04,.17,-.34);
  verschmelze(f2);
  const fArm=v=>{ const a=gruppe(fk,v*.29,1.27,0); walze(a,.08,.46,MANTEL,0,-.23,0); walze(a,.092,.08,MANTEL2,0,-.43,0); ball(a,.082,HAUT,0,-.52,0); verschmelze(a); return a; };
  const fArmL=fArm(-1), fArmR=fArm(1);
  const medaille=gruppe(fArmR,0,-.54,.07), md=gruppe(medaille,0,0,0);
  [-1,1].forEach(v=>{ strich(md,[v*.1,0,0],[0,-.2,0],.028,v<0?0xd8303a:0x2a62c0); });
  const scheibe=walze(md,.14,.05,GOLD,0,-.31,0); scheibe.rotation.x=Math.PI/2; ring(md,.14,.022,MESSING2,0,-.31,.01);
  for(let i=0;i<5;i++){ const a=i*Math.PI*.4; strich(md,[0,-.31,.04],[Math.sin(a)*.09,-.31+Math.cos(a)*.09,.04],.016,0xfff6d0); }
  verschmelze(md);
  schattenFleck(frieda,.48);

  /* ---------- Spürhund Bello ---------- */
  const bello=DET.hund(k,sc,3,1.8,-2.15,1.2);
  const bFleck=schattenFleck(sc,.85);

  /* ---------- Spielfigur mit Detektivhut und großer Lupe ---------- */
  const u=figur.userData, FS=1.3, BIS=2.4;
  figur.position.set(0,-3,LZ); figur.scale.set(FS,FS,FS); sc.add(figur);
  /* Trägt die Figur schon einen Strohhut (die Walzen am Kopf), wird er beim Aufsetzen des Detektivhuts ausgeblendet */
  const figurKopf=u.koerper.children.find(g=>Math.abs(g.position.y-1.62)<.01);
  const strohhut=figurKopf?figurKopf.children.filter(m=>m.geometry===GEO.cyl):[];
  /* Der Hut ist ein eigenes Teil auf Kopfhöhe (1,62): die Figur wird nicht verformt */
  const hutPlatz=gruppe(u.koerper,0,1.62,0), hut=gruppe(hutPlatz,0,0,0), hutTeile=gruppe(hut,0,0,0);
  const karo=bild(128,128,g=>{ g.fillStyle='#a8743c'; g.fillRect(0,0,128,128); g.fillStyle='rgba(70,36,14,.45)'; for(let i=0;i<128;i+=32){ g.fillRect(i,0,12,128); g.fillRect(0,i,128,12); }
    g.fillStyle='rgba(255,226,160,.55)'; for(let i=22;i<128;i+=32){ g.fillRect(i,0,3,128); g.fillRect(0,i,128,3); } });
  karo.wrapS=karo.wrapT=THREE.RepeatWrapping; karo.repeat.set(3,1.5);
  const stoff=new THREE.MeshLambertMaterial({map:karo}), STOFF2=0x7a4a22;
  const kuppe=new THREE.Mesh(new THREE.SphereGeometry(.43,22,12,0,Math.PI*2,0,Math.PI*.5),stoff); kuppe.position.y=.2; kuppe.scale.set(1,.98,1.02); kuppe.castShadow=true; hutTeile.add(kuppe);
  const hutRand=ring(hutTeile,.43,.032,STOFF2,0,.205,0); hutRand.rotation.x=Math.PI/2;
  [-1,1].forEach(v=>{ const schirm=ball(hutTeile,.25,stoff,0,.19,v*.4,1.15,.14,.95); schirm.rotation.x=v*.12;
    ball(hutTeile,.17,stoff,v*.4,.35,0,.28,1,.85).rotation.z=v*.42; });
  /* oben zusammengebundene Ohrenklappen mit Schleife */
  ball(hutTeile,.055,STOFF2,0,.63,0); [-1,1].forEach(v=>{ const s=ring(hutTeile,.07,.022,STOFF2,v*.08,.65,0); s.scale.y=.65; });
  hut.visible=false;
  const lupe=gruppe(u.armR,0,-.55,.06), lt=gruppe(lupe,0,0,0);
  walze(lt,.065,.34,HOLZ2,0,.07,0); ball(lt,.08,MESSING,0,-.11,0); walze(lt,.085,.09,MESSING,0,.27,0);
  ring(lt,.36,.06,GOLD,0,.66,0); ring(lt,.3,.018,MESSING2,0,.66,.03);
  const glas=new THREE.Mesh(new THREE.CircleGeometry(.33,28),basis(0xcfeeff,{transparent:true,opacity:.34,depthWrite:false,side:THREE.DoubleSide})); glas.position.set(0,.66,0); lt.add(glas);
  const glanzM=basis(0xffffff,{transparent:true,opacity:.85,depthWrite:false});
  const glanz=ring(lt,.23,.022,glanzM,0,.66,.015,Math.PI*.38); glanz.rotation.z=Math.PI*.55; glanz.castShadow=false; ball(lt,.028,glanzM,.13,.53,.02,1,1,.3).castShadow=false;
  verschmelze(lt);
  lupe.visible=false;
  const lupenStern=schein(sc,'rgba(255,250,210,.9)',0,0,0,.1); lupenStern.visible=false;

  /* ---------- Vögel: sitzen auf Brüstung und Boden, fliegen auf und kreisen ---------- */
  /* [x, y, z, Abflug in Sekunden; null: bleibt sitzen] */
  const VOEGEL=[[-1.7,.66,HINTEN,.8],[1.5,.66,HINTEN,.95],[2.7,.66,HINTEN,1.2],[-3.6,.66,HINTEN,1.4],[-1.5,0,2.9,2.1],[1.4,0,3.2,2.3],[-2,0,.2,1.5],[-4.6,.66,HINTEN,null],[3.2,.66,HINTEN,null]];
  const voegel=VOEGEL.map((p,i)=>{ const g=gruppe(sc,p[0],p[1]+(p[1]?.12:0),p[2]), hell=[0xf4f2ee,0x6aa8e0,0xb4bccc][i%3], dunkel=[0xc4c6d2,0x3a70b0,0x7a849c][i%3];
    const leib=gruppe(g,0,0,0);
    ball(leib,.15,hell,0,.19,0,.85,.85,1.35); box(leib,.15,.035,.2,dunkel,0,.2,-.24).rotation.x=.25;
    [-1,1].forEach(v=>strich(leib,[v*.05,.12,0],[v*.05,.01,.02],.013,0xe8806a));
    verschmelze(leib);
    const kopf=gruppe(g,0,.28,.15), kt=gruppe(kopf,0,0,0);
    ball(kt,.085,hell,0,.03,.02); kegel(kt,.025,.08,0xf0a030,0,.02,.13).rotation.x=Math.PI/2; [-1,1].forEach(v=>ball(kt,.016,0x181014,v*.068,.05,.055));
    verschmelze(kt);
    const fluegel=[-1,1].map(v=>{ const a=gruppe(g,v*.1,.24,0); ball(a,.16,dunkel,v*.13,0,-.02,1,.16,.62); ball(a,.07,hell,v*.27,0,-.05,1.2,.2,.7); verschmelze(a); return a; });
    return { g, kopf, fluegel, p, y:g.position.y, dreh:Math.sin(i*2.3)*1.2 }; });

  /* ---------- Konfetti und Funkeln ---------- */
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; t.visible=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  /* seitlich dichter, damit die Figur frei bleibt */
  const NK=130, konfetti=menge(GEO.box,basis(0xffffff),NK), kd=[];
  for(let i=0;i<NK;i++){ const v=i%2?1:-1; kd.push({ x:v*(1.1+zufall()*(i%5?3.6:6.4)), y:zufall()*5.8, z:-1.8+zufall()*4.4, v:.45+zufall()*.55, p:zufall()*6.28, g:.8+zufall()*.5 });
    konfetti.setColorAt(i,FARBE.set(BUNT[i%6])); }
  const NF=34, funkeln=menge(new THREE.OctahedronGeometry(1,0),basis(0xfff2a0),NF), fd=[];
  for(let i=0;i<NF;i++) fd.push({ x:(zufall()*2-1)*4.6, y:.8+zufall()*4, z:-1.8+zufall()*3, p:zufall()*6.28 });
  /* Sternenkreis, wenn der Hut landet */
  const NH=12, hutFunken=menge(funkeln.geometry,basis(0xffffff),NH);

  /* ---------- Kamera ---------- */
  const NEIG=.12, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=2.35;
  /* q: 0 schmal (bis 4:3), 1 sehr breit */
  const plaetze=a=>{ const q=weich((a-1.4)/1.4); return { q, frieda:misch(-2.95,-3.8,q), bello:misch(3,3.9,q), katze:misch(3.9,5.2,q) }; };
  /* kleinster Kameraabstand, bei dem alle wichtigen Punkte im Bild sind */
  const abstand=(P,a,tn)=>{ const punkte=[
      [-1.2,4.15,BIS],[2.1,4.15,BIS],[0,-.1,3.9],
      [P.frieda-1.05,0,1.9],[P.frieda-1.05,3.45,1.4],[P.bello+1.35,0,2.3],[P.bello+1.35,1.9,1.8],[P.katze+.85,3.3,-2.2],[0,2.5,LZ-1.4]];
    return punkte.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
      return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },9); };

  /* Zeitplan in Sekunden: alles Wichtige ist zu sehen, bevor sich nach 9 s die Urkunde öffnet */
  const AUF=.5, SPRUNG=1.5, LOS=2, DA=3.2, HUT=3.1, LUPE=4.5, JUBEL=5.5;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), P=plaetze(a), d=abstand(P,a,tn);
    const wippen=Math.sin(t*.22)*.22*weich((t-4)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);
    const c=kamera.position;
    kuppel.position.copy(c);
    /* Weltpunkt zu einem Bildplatz (x,y von -1 bis 1) in der Entfernung weit */
    const ort=(bx,by,weit)=>{ const hoch=by*weit*tn; return [c.x+bx*weit*tn*a, c.y-SN*weit+CN*hoch, c.z-CN*weit-SN*hoch]; };

    /* Sonne geht rechts über den Dächern auf */
    const auf=weich(t/8);
    const sg=.1*78*tn; /* Sonnenradius: fester Anteil der Bildhöhe */
    const sx=Math.min(.95-.1/a,.62);
    const sp=ort(sx,misch(.32,.62,auf),78);
    sonne.position.set(sp[0],sp[1],sp[2]); sonne.scale.setScalar(sg); sonne.lookAt(c.x,c.y,c.z);
    sonnenSchein.position.set(sp[0],sp[1],sp[2]+.5); sonnenSchein.scale.set(sg*6,sg*6,1);
    strahlen.position.set(sp[0],sp[1],sp[2]+.2); strahlen.scale.setScalar(sg*(.86+Math.sin(t*1.8)*.04)); strahlen.rotation.z=t*.12;
    himmelsLicht.intensity=.55+.14*auf; licht.intensity=.4+.22*auf;
    wolken.forEach((w,i)=>{ const q=ort(w.p[0]+Math.sin(t*.07+i*2)*.05,w.p[1],55); w.g.position.set(q[0],q[1],q[2]); w.g.scale.setScalar(w.p[2]*55*tn/22); });
    wimpel.forEach((w,i)=>{ w.rotation.x=Math.sin(t*2.3+i*.8)*.22; w.rotation.z=Math.sin(t*1.7+i)*.08; });

    /* Dachluke klappt auf */
    const offen=weich((t-.1)/.6);
    angel.rotation.x=-1.95*offen;
    const warm=offen*(1-.6*weich((t-LOS)/2));
    drinnen.intensity=warm*(1.1+Math.sin(t*4)*.07); lukenSchein.visible=warm>.01; lukenSchein.scale.set(.1+2.6*warm,.1+1.8*warm,1);

    /* Figur steigt heraus, hüpft über den Rand, läuft nach vorn */
    const steig=Math.min(1,Math.max(0,(t-AUF)/(SPRUNG-AUF))), huepf=Math.min(1,Math.max(0,(t-SPRUNG)/(LOS-SPRUNG))), lauf=Math.min(1,Math.max(0,(t-LOS)/(DA-LOS)));
    const klettert=steig>0&&steig<1, geht=lauf>0&&lauf<1, s=Math.sin(t*10);
    const y=steig<1?misch(-3,0,weich(steig))+(klettert?Math.abs(Math.sin(steig*Math.PI*4))*.1:0):Math.sin(huepf*Math.PI)*.85;
    const z=lauf>0?misch(LZ+1.8,BIS,lauf):misch(LZ,LZ+1.8,huepf);
    figur.position.set(0,y,z);
    const winkt=weich((t-DA)/.4)*(1-weich((t-LUPE+.2)/.4)), hebt=weich((t-LUPE-.1)/.6), jubel=weich((t-JUBEL)/.5);
    figur.rotation.y=t>DA?Math.sin(t*.9)*.14*weich(t-DA):0;
    u.beinL.rotation.x=geht?s*.65:klettert?Math.sin(t*9)*.5:-Math.sin(huepf*Math.PI)*.5; u.beinR.rotation.x=geht?-s*.65:klettert?-Math.sin(t*9)*.5:-Math.sin(huepf*Math.PI)*.25;
    u.armR.rotation.x=geht?s*.55:klettert?-1.1+Math.sin(t*9)*.5:-.25*hebt;
    u.armL.rotation.x=geht?-s*.55:klettert?-1.1-Math.sin(t*9)*.5:0;
    u.armR.rotation.z=misch(.18,2.15+Math.sin(t*3.2)*.1*jubel,hebt);
    u.armL.rotation.z=winkt>0?misch(-.18,-2.4+Math.sin(t*7.5)*.38,winkt):misch(-.18,-2.4+Math.sin(t*8)*.32,jubel);
    u.koerper.position.y=geht?Math.abs(Math.cos(t*10))*.07:Math.abs(Math.sin(t*4))*.05*winkt+Math.abs(Math.sin(t*4.6))*.2*jubel;
    u.koerper.rotation.z=Math.sin(t*2.2)*.03*jubel;

    /* Detektivhut schwebt von oben auf den Kopf */
    const faellt=weich((t-HUT)/.8);
    hut.visible=t>HUT;
    hut.position.set(Math.sin(faellt*Math.PI*2)*.25*(1-faellt),1.5*(1-faellt),0); hut.rotation.y=(1-faellt)*Math.PI*4; hut.scale.setScalar(.3+.7*weich((t-HUT)/.4));
    strohhut.forEach(m=>{ m.visible=t<HUT+.5; });
    const knall=(t-HUT-.75)/.9;
    hutFunken.visible=knall>0&&knall<1;
    if(hutFunken.visible){ for(let i=0;i<NH;i++){ const w=i*Math.PI*2/NH, r=.6+knall*1.1, g=.11*Math.sin(knall*Math.PI);
        setze(hutFunken,i,Math.cos(w)*r,(1.62+.45)*FS+Math.sin(w)*r*.8,BIS+.3,g,g*1.6,g,0,t*3,w); }
      hutFunken.instanceMatrix.needsUpdate=true; }

    /* Lupe erscheint in der Hand und wird hochgehalten, immer aufrecht und leicht nach außen geneigt */
    const da=weich((t-LUPE)/.5);
    lupe.visible=da>0; lupe.scale.setScalar(.1+.9*da); lupe.rotation.set(-u.armR.rotation.x,0,-u.armR.rotation.z-.22*hebt,'ZYX');
    const blitz=Math.pow(Math.max(0,Math.sin(t*1.9)),12)*weich((t-JUBEL)/.5);
    lupenStern.visible=blitz>.02;
    if(lupenStern.visible){ const w=u.armR.rotation.z, hx=(.34+Math.sin(w)*.55+Math.sin(.22)*.66-.12)*FS, hy=(1.2-Math.cos(w)*.55+Math.cos(.22)*.66+.14+u.koerper.position.y)*FS;
      lupenStern.position.set(hx,hy+y,z+.7); lupenStern.scale.set(.1+blitz*.9,.1+blitz*.9,1); }

    /* Frieda: winkt mit dem äußeren Arm, reicht die Medaille, schaut zur Figur */
    frieda.position.x=P.frieda; frieda.rotation.y=.3;
    const gruss=weich((t-1)/.6), reicht=weich((t-3.2)/.7);
    fArmL.rotation.z=misch(-.18,-2.5+Math.sin(t*6.2)*.34,gruss);
    fArmR.rotation.z=misch(.2,1.3+Math.sin(t*2.4)*.08,reicht); fArmR.rotation.x=-.35*reicht;
    medaille.rotation.set(-fArmR.rotation.x,0,-fArmR.rotation.z+Math.sin(t*3.6)*.18,'ZYX');
    fk.position.y=Math.abs(Math.sin(t*3))*.03*gruss+Math.abs(Math.sin(t*4.6))*.04*jubel;
    fKopf.rotation.y=.28*weich((Math.sin(t*.7-1)+.5)/.7); fKopf.rotation.z=Math.sin(t*1.3)*.07;

    /* Bello hüpft vor Freude, ab und zu mit einem Dreher */
    const froh=weich((t-1.8)/.6), sprung=Math.abs(Math.sin(t*4.4))*froh*(.18+.2*jubel);
    bello.g.position.set(P.bello,sprung,1.8);
    bello.g.rotation.y=-2.15+Math.sin(t*1.4)*.18*froh+Math.PI*2*weich(((t-JUBEL-1.5)%6)/.9)*(t>JUBEL+1.5?1:0);
    bello.beine.forEach((b,i)=>{ b.rotation.z=(i<2?1:-1)*sprung*1.4; });
    bFleck.position.set(P.bello,.032,1.8); bFleck.scale.setScalar(1-sprung*.6);

    /* Katze auf dem Schornstein: Kopf folgt der Figur, Schwanz pendelt */
    schornstein.position.x=P.katze;
    katz.rotation.y=-.3;
    kKopf.rotation.y=-.25+Math.sin(t*.8)*.18; kKopf.rotation.z=Math.sin(t*1.1+1)*.14; kKopf.position.y=.84+Math.sin(t*2)*.008;
    kSchwanz.rotation.z=Math.sin(t*2.1)*.3;

    /* Vögel: picken, auffliegen, im Kreis über der Terrasse flattern */
    const weite=Math.min(6,.78*d*tn*a);
    voegel.forEach((v,i)=>{ const [x,,pz,ab]=v.p, flug=ab===null?0:weich((t-ab)/2.6);
      if(ab===null||t<=ab){ v.g.position.set(x,v.y+Math.max(0,Math.sin(t*3+i*2))*.015,pz); v.g.rotation.set(0,v.dreh+Math.sin(t*.8+i)*.35,0,'YXZ');
        v.kopf.rotation.x=Math.pow(Math.max(0,Math.sin(t*3.4+i*1.7)),3)*.9; v.fluegel.forEach((f,j)=>{ f.rotation.z=(j?-1:1)*.12; }); return; }
      const bahn=tt=>{ const e=weich((tt-ab)/2.6), w=i*.95+tt*.55, ox=Math.cos(w)*weite*(.76+(i%3)*.12), oy=4.4+(i%3)*.45+Math.sin(w*2+i)*.35, oz=-2.4+Math.sin(w)*1.3;
        return [misch(x,ox,e),misch(v.y,oy,Math.min(1,e*1.25))+Math.sin(e*Math.PI)*.4,misch(pz,oz,e)]; };
      const p=bahn(t), n=bahn(t+.08);
      v.g.position.set(p[0],p[1],p[2]); v.g.rotation.set(-.3*(1-flug),Math.atan2(n[0]-p[0],n[2]-p[2]),0,'YXZ');
      v.kopf.rotation.x=0; v.fluegel.forEach((f,j)=>{ f.rotation.z=(j?1:-1)*Math.sin(t*(15-5*flug)+i*1.9)*.85; }); });

    /* Konfetti sprudelt beim Hut los und sinkt wirbelnd, dazu Funkeln */
    const START=HUT+.7;
    konfetti.visible=funkeln.visible=t>START;
    if(konfetti.visible){
      const los=weich((t-START)/2);
      kd.forEach((f,i)=>{ const hy=.1+((f.y-t*f.v)%5.8+5.8)%5.8, g=f.g*weich((t-START)/.5)*weich((5.9-hy)/.6)*weich(hy/.25);
        setze(konfetti,i,f.x*los+Math.sin(t*1.6+f.p)*.28,misch(3,hy,los),misch(0,f.z,los),.11*g,.15*g,.012*g,t*2.6+f.p,t*1.7+f.p*2,Math.sin(t*2+f.p)); });
      konfetti.instanceMatrix.needsUpdate=true;
      fd.forEach((f,i)=>{ const g=.012+.06*Math.pow(Math.max(0,Math.sin(t*2.6+f.p)),4)*los;
        setze(funkeln,i,f.x+Math.sin(t*.5+f.p)*.2,f.y+Math.sin(t*.8+f.p*2)*.25,f.z,g,g*1.5,g,0,t+f.p,0); });
      funkeln.instanceMatrix.needsUpdate=true; }
  };
};

