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
intro:"Du bist über die Feuerleiter auf den Dachboden geklettert. Durch das Dachfenster fällt Mondlicht auf alte Koffer und Kisten. Hier wartet Friedas letzter Fall – öffnet das Schloss an der Dachluke, dann habt ihr die Prüfung bestanden!",
introDu:"Ihr seid über die Feuerleiter auf den Dachboden geklettert. Durch das Dachfenster fällt Mondlicht auf alte Koffer und Kisten. Hier wartet Friedas letzter Fall – öffne das Schloss an der Dachluke, dann hast du die Prüfung bestanden!",
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