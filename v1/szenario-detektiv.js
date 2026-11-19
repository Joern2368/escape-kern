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
function fensterStadt(x,y,w,h){let s=R(x-w/2,y,w,h,'#1f2c44');const b=[[-.48,.5],[-.3,.7],[-.12,.4],[.06,.62],[.24,.45],[.4,.75]];b.forEach(([a,t])=>{const bx=x+a*w;s+=R(bx,y+h*(1-t),w*.17,h*t,'#2f3e5c')+Q(3,k=>R(bx+8,y+h*(1-t)+12+k*22,8,10,k%2?'#3a4866':'#f0d070'));});let r='';for(let k=0;k<26;k++){const rx=x-w/2+((k*37)%w),ry=y+((k*53)%(h-24));r+=`M${rx} ${ry}l-6 18`;}return s+P(r,0,'#a8c8e8',2)+R(x-w/2,y,w,h,'none','#4a2c16',10)+P(`M${x} ${y}V${y+h}M${x-w/2} ${y+h/2}H${x+w/2}`,0,'#4a2c16',6)+R(x-w/2-14,y+h,w+28,12,'#5a3418');}
function ventilator(x){return P(`M${x} 40V78`,0,'#222',4)+`<ellipse cx="${x}" cy="84" rx="110" ry="9" fill="#5a3a20" stroke="#2a1608" stroke-width="2"/><ellipse cx="${x}" cy="86" rx="34" ry="12" fill="#4a2c16"/>`+C(x,82,12,'#b8862a','#5a3a20');}
function korkwand(x,y,w,h){const z=[[30,30,'#f4ecd8'],[150,20,'#cfe0f0'],[290,40,'#f4ecd8'],[400,24,'#f6e58a'],[70,140,'#f6e58a'],[210,130,'#f4ecd8'],[350,150,'#cfe0f0']];let s=R(x,y,w,h,'#c49a5e','#6b4a24',10),pk=[];z.forEach(([a,b,f],k)=>{const px=x+a,py=y+b;s+=R(px,py,80,70,f,'#8a7a5a',1.5)+(k%2?C(px+40,py+30,14,'#9aa8b4')+P(`M${px+18} ${py+66}Q${px+40} ${py+38} ${px+62} ${py+66}Z`,'#9aa8b4'):P(`M${px+10} ${py+20}H${px+70}M${px+10} ${py+34}H${px+60}M${px+10} ${py+48}H${px+66}`,0,'#9a8e70',2));pk.push([px+40,py+6]);});s+=P('M'+[0,1,5,2,3,6,4,0].map(k=>pk[k].join(' ')).join('L'),0,'#d0202a',3);return s+pk.map(([a,b],k)=>C(a,b,5,k%2?'#2a6ad0':'#d0202a','#222',1)).join('');}
function waescheleine(){const f=['#e8e0d0','#d8d0c0','#f0e8d8'];let s=P('M420 110Q1000 140 1580 110',0,'#ddd',2);for(let k=0;k<8;k++){const x=470+k*140,y=118+Math.round(Math.sin(k/7*3.14)*12);s+=R(x,y,70,58,f[k%3],'#888',1)+R(x+6,y+6,58,38,'#5a4a4a')+(k%2?C(x+24,y+20,8,'#e8c45a')+P(`M${x+6} ${y+44}L${x+30} ${y+24}L${x+46} ${y+36}L${x+64} ${y+22}V${y+44}Z`,'#8a9a7a'):C(x+35,y+20,9,'#c9a68a')+P(`M${x+20} ${y+44}Q${x+35} ${y+26} ${x+50} ${y+44}Z`,'#8a6a5a'))+R(x+30,y-8,8,14,'#b8864a');}return s;}
function rotlicht(x){return C(x,120,320,'url(#licht)')+P(`M${x} 0V90`,0,'#111',3)+P(`M${x-26} 112Q${x} 76 ${x+26} 112Z`,'#2a1010','#000')+`<ellipse cx="${x}" cy="114" rx="16" ry="7" fill="#ff3020"/>`;}
function fensterHell(x){return R(x-110,110,220,180,'#a8d8f0')+`<ellipse cx="${x-30}" cy="170" rx="44" ry="16" fill="#fff"/><ellipse cx="${x+40}" cy="220" rx="36" ry="12" fill="#fff"/>`+R(x-110,110,220,180,'none','#8aa0b0',10)+P(`M${x} 110V290M${x-110} 200H${x+110}`,0,'#8aa0b0',6)+`<circle cx="${x}" cy="260" r="260" fill="#fff" opacity=".12"/>`;}
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
const mikroskop=()=>`${tisch(150,70,'#e8eef2','#7a8a96')}${R(-14,-88,54,8,'#2a4a6a',0,0,3)}${P('M32 -88Q42 -126 16 -146',0,'#2a4a6a',10)}${P('M-2 -156L16 -150L8 -112L-10 -118Z','#3a6a9a','#1a2a3a')}${R(-10,-112,44,6,'#222')}${R(-6,-166,14,12,'#1a2a3a',0,0,2)}${R(6,-108,14,4,'#cfe8ef')}`;
const gipsabdruck=()=>`${schatten(46,4)}${R(-40,-16,80,16,'#8a6a3e','#4a3018',2)}${P('M-36 -16L-30 -110Q0 -122 30 -110L36 -16Z','#ece8dc','#a8a090',3)}${U('fussabdruck',-30,-104,60,'#b8ae98')}`;
const reagenz=()=>`${tisch(120,60,'#d8e4ec','#6a7a86')}${R(-50,-92,100,8,'#c9a26a','#6b4a24',1)}${['#d04a4a','#e8c43a','#4a9ad0','#5ab06a','#a06ad0'].map((f,k)=>R(-40+k*18,-126,12,52,'#eaf6ff','#7a8a96',1.5,6)+R(-39+k*18,-100,10,24,f,0,0,5))}`;
const standlupe=()=>`${schatten(40,4)}<ellipse cx="0" cy="-6" rx="34" ry="8" fill="#5a646a"/>${P('M0 -8V-90',0,'#5a646a',7)}${C(0,-128,40,'#cfe8ef','#b8862a',9)}${U('fingerabdruck',-24,-152,48,'#2a4a6a')}${P('M-22 -146Q-14 -158 0 -160',0,'#fff',4)}`;
const fingertafel=()=>`${R(-92,-64,184,128,'#f8fbfd','#4a6a8a',6)}${Q(4,k=>R(-80+k*42,-44,36,44,'#fff','#9ab0c4',1.5)+U('fingerabdruck',-78+k*42,-42,32,'#2a4a6a')+R(-74+k*42,10,24,4,'#9ab0c4'))}${C(46,-22,24,'none','#d0202a',3)}${P('M-80 34H60M-80 46H30',0,'#9ab0c4',3)}`;
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
const regeltafel=()=>`${R(-56,-60,112,120,'#fff','#2a6ad0',5)}${R(-56,-60,112,24,'#2a6ad0')}${Q(4,k=>C(-38,-18+k*20,6,'#5ab06a')+R(-24,-21+k*20,64,6,'#9ab0c4'))}`;
const kittel=()=>`${schatten(34,4)}${P('M-28 0L0 -12L28 0M0 -8V-190',0,'#9aa8b4',6)}${P('M-8 -180L-30 -168L-34 -70H34L30 -168L8 -180Z','#fff','#9ab0c4',2)}${P('M0 -150V-70M-8 -180L0 -150L8 -180',0,'#9ab0c4',2)}${R(10,-122,16,16,'none','#9ab0c4',2)}${P('M16 -126V-138',0,'#2a6ad0',3)}`;
const kuehlschrank=()=>`${schatten(46,4)}${R(-42,-170,84,170,'#eef4f8','#7a8a96',3,8)}${P('M-42 -110H42',0,'#7a8a96',3)}${P('M30 -158V-128M30 -96V-50',0,'#9aa8b4',5)}${R(-30,-150,40,24,'#f6e58a')}${P('M-26 -142H6M-26 -134H0',0,'#9a8e70',2)}`;
const landkarte=()=>`${P('M-70 -48Q0 -60 70 -48V48Q0 60 -70 48Z','#e8d8a8','#8a6a3e',3)}${P('M-50 -20Q-20 -40 0 -14Q20 10 46 -6',0,'#5a9ad0',4)}${P('M-40 20Q-10 4 20 26',0,'#7a9a5a',6)}${C(34,22,7,'none','#d0202a',3)}${P('M-50 34L-30 38L-12 30',0,'#d0202a',2)}`;
const buecherkiste=()=>`${schatten(56,4)}${Q(5,k=>R(-44+k*18,-80+(k%2)*6,14,30,['#3a5a7a','#8a3a2a','#2a5a3a','#b8864a','#5a3a6a'][k],'#222',1))}${R(-52,-56,104,56,'#a07a48','#5a3a1a',3)}${P('M-52 -38H52M-52 -18H52',0,'#7a5a30',2)}`;
const globus=()=>`${schatten(36,4)}${R(-26,-10,52,10,'#5a3418',0,0,3)}${P('M0 -10V-34',0,'#5a3418',6)}${C(0,-80,46,'#5a9ad0','#2a4a6a',2)}${P('M-30 -100Q-10 -110 0 -90Q10 -70 -10 -60Q-30 -60 -36 -78ZM14 -112Q34 -104 38 -84Q24 -88 14 -98Z','#8ab06a')}${P('M-34 -44A50 50 0 0 1 34 -116',0,'#b8862a',4)}`;
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500;
let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="330" r="8" fill="#1a1208" stroke="#d8a73a" stroke-width="2"/>`;
const bogen='M410 470V170H590V470Z';
return`<defs><clipPath id="tuerclip"><path d="${bogen}"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#6b4024"/><stop offset=".5" stop-color="#8a5a32"/><stop offset="1" stop-color="#5a3418"/></linearGradient></defs>
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Tür mit Zahlenschloss">
   <path d="M388 470V150H612V470Z" fill="#3a2414" stroke="#1a0e06" stroke-width="4"/>
   <path d="${bogen}" fill="#0e0804"/>
   <g clip-path="url(#tuerclip)"><g id="platte"><path d="${bogen}" fill="url(#platteG)"/><rect x="430" y="186" width="140" height="110" rx="4" fill="#dce8ec" stroke="#3a2010" stroke-width="5"/><rect x="440" y="196" width="40" height="90" fill="#fff" opacity=".35"/><text x="500" y="248" text-anchor="middle" font-family="sans-serif" font-size="24" font-weight="bold" fill="#2a3a44">Detektei</text><use href="#sym-lupe" x="486" y="256" width="28" height="28" color="#2a3a44"/><rect x="432" y="366" width="136" height="86" fill="none" stroke="#3a2010" stroke-width="3"/><circle cx="572" cy="392" r="8" fill="#d8a73a"/><rect x="${500-n*11-12}" y="312" width="${n*22+24}" height="36" rx="6" fill="#1a1208" stroke="#d8a73a" stroke-width="2"/>${d}</g></g>
   <rect x="470" y="128" width="60" height="16" rx="3" fill="#d8a73a" stroke="#6b4a1c" stroke-width="2"/>
  </g></g>`;
}
SZENARIEN.detektiv={
name:"Das Detektivbüro",
symbole:["lupe","fussabdruck","fingerabdruck","hut","taschenlampe"],
symbolNamen:["Lupe","Fußabdruck","Fingerabdruck","Hut","Taschenlampe"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><circle cx="52" cy="40" r="30" fill="#e8f2f6" stroke="#8a6420" stroke-width="7"/><path d="M74 62L104 84" stroke="#5a3418" stroke-width="12" stroke-linecap="round"/><use href="#sym-fingerabdruck" x="30" y="18" width="44" height="44" color="#2a4a6a"/><use href="#sym-hut" x="76" y="2" width="38" height="38" color="#5a3a2a"/></svg>`,
texte:{
einleitung:"Ihr gehört zum Detektiv-Nachwuchs im Büro der berühmten Detektivin Frieda Fuchs. Heute ist eure große Prüfung: Frieda hat alle Türen mit Zahlenschlössern verschlossen und in jedem Raum knifflige Fälle versteckt. Untersucht die Gegenstände genau. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Fälle löst, findet den Weg nach draußen!",
startKnopf:"Das Detektivbüro betreten",
hinweisGeber:"Der Spürhund Bello flüstert:",
richtig:"Fall gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Bello legt den Kopf schief … Prüft eure Spur noch einmal!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Detektei",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Prüfungszeit ist um!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – gute Spürnasen bleiben dran! Ihr dürft weiterspielen und den Ausgang trotzdem noch finden.",
geschafft:"Prüfung bestanden!",
abschluss:"Geschafft! Ihr habt alle Fälle zum Thema <b>{titel}</b> gelöst und den Weg aus dem Detektivbüro gefunden. Frieda Fuchs ernennt euch zu echten Spürnasen!"
},
texteDu:{
einleitung:"Du gehörst zum Detektiv-Nachwuchs im Büro der berühmten Detektivin Frieda Fuchs. Heute ist deine große Prüfung: Frieda hat alle Türen mit Zahlenschlössern verschlossen und in jedem Raum knifflige Fälle versteckt. Untersuche die Gegenstände genau. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Fälle löst, findet den Weg nach draußen!",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Bello legt den Kopf schief … Prüfe deine Spur noch einmal!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – gute Spürnasen bleiben dran! Du darfst weiterspielen und den Ausgang trotzdem noch finden.",
geschafft:"Prüfung bestanden!",
abschluss:"Geschafft! Du hast alle Fälle zum Thema <b>{titel}</b> gelöst und den Weg aus dem Detektivbüro gefunden. Frieda Fuchs ernennt dich zur echten Spürnase!"
},
einfach:{
name:"Das Detektivbüro",
symbolNamen:["Lupe","Fußspur","Fingerabdruck","Hut","Taschenlampe"],
texte:{
einleitung:"Ihr seid im Büro von Frieda Fuchs. Frieda ist eine berühmte Detektivin. Heute macht ihr eine Prüfung. An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr habt den Weg nach draußen gefunden. Ihr seid jetzt echte Spürnasen!"
},
texteDu:{
einleitung:"Du bist im Büro von Frieda Fuchs. Frieda ist eine berühmte Detektivin. Heute machst du eine Prüfung. An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du hast den Weg nach draußen gefunden. Du bist jetzt eine echte Spürnase!"
},
raeume:[
{titel:"Das Büro",intro:"Das ist das Büro von Frieda Fuchs. Draußen regnet es. Auf dem Tisch leuchtet eine grüne Lampe. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[{name:"Schreibtisch",fund:"In der Schublade liegt:"},{name:"Telefon",fund:"Unter dem Telefon liegt:"},{name:"Papierkorb",fund:"Im Papierkorb liegt ein Zettel:"},{name:"Tresor",fund:"Der Tresor geht auf! Darin liegt:"},{name:"Uhr",fund:"Hinter der Uhr klebt:"}],
infoObjekte:[{name:"Zettel aus der Zeitung",fund:"Hinter dem Zettel klebt:"},{name:"Ständer mit Mantel und Hut",fund:"In der Tasche vom Mantel steckt:"},{name:"Schrank mit Schubladen",fund:"In einer Schublade liegt:"}]},
{titel:"Der Raum mit der Pinnwand",intro:"Ihr seid im Raum mit der Pinnwand. Dort hängen Fotos und Zettel. Rote Fäden verbinden sie. Findet die Zahlen für das nächste Schloss!",introDu:"Du bist im Raum mit der Pinnwand. Dort hängen Fotos und Zettel. Rote Fäden verbinden sie. Finde die Zahlen für das nächste Schloss!",
objekte:[{name:"Kasten mit Karten",fund:"Zwischen den Karten steckt:"},{name:"Korb von Bello",fund:"Unter dem Kissen liegt:"},{name:"Tafel",fund:"Auf der Tafel steht:"},{name:"Fernglas",fund:"Im Fernglas steckt:"},{name:"Karte von der Stadt",fund:"Hinter der Karte steckt:"}],
infoObjekte:[{name:"Kalender",fund:"Hinter dem Kalender steckt:"},{name:"Regal mit Büchern",fund:"Zwischen den Büchern steckt:"},{name:"Stapel mit Mappen",fund:"In der obersten Mappe liegt:"}]},
{titel:"Der Raum für Fotos",intro:"Das ist der Raum für Fotos. Hier leuchtet nur eine rote Lampe. An einer Leine hängen Fotos.",
objekte:[{name:"Schalen für Fotos",fund:"In einer Schale liegt:"},{name:"Kamera",fund:"In der Kamera steckt:"},{name:"Waschbecken",fund:"Neben dem Waschbecken liegt:"},{name:"Kiste mit Filmen",fund:"In der Kiste liegt:"},{name:"Brett mit Flaschen",fund:"Hinter einer Flasche steckt:"}],
infoObjekte:[{name:"Plakat mit Bildern",fund:"Auf dem Plakat steht:"},{name:"Buch mit Fotos",fund:"In dem Buch steht:"},{name:"Schrank mit Papier",fund:"Im Schrank liegt:"}]},
{titel:"Der Raum für Spuren",intro:"Das ist der Raum für Spuren. Hier ist alles weiß und sauber. Mit einer Lupe sieht man kleine Dinge groß.",
objekte:[{name:"Mikroskop",fund:"Unter dem Mikroskop liegt:"},{name:"Fußspur aus Gips",fund:"Neben der Fußspur liegt:"},{name:"Kleine Gläser",fund:"Hinter den Gläsern steckt:"},{name:"Große Lupe",fund:"Unter der Lupe liegt:"},{name:"Tafel mit Fingerabdrücken",fund:"Hinter der Tafel klebt:"}],
infoObjekte:[{name:"Schild mit Regeln",fund:"Auf dem Schild steht:"},{name:"Weißer Kittel",fund:"In der Tasche vom Kittel steckt:"},{name:"Kühlschrank",fund:"Im Kühlschrank liegt:"}]},
{titel:"Der Dachboden",intro:"Ihr seid oben auf dem Dachboden. Der Mond scheint durch das Fenster. Öffnet das letzte Schloss!",introDu:"Du bist oben auf dem Dachboden. Der Mond scheint durch das Fenster. Öffne das letzte Schloss!",
objekte:[{name:"Koffer",fund:"Im Koffer liegt:"},{name:"Schaukelpferd",fund:"Unter dem Sattel steckt:"},{name:"Truhe",fund:"In der Truhe liegt:"},{name:"Taschenlampe",fund:"Die Lampe leuchtet auf einen Zettel:"},{name:"Spiegel",fund:"Am Spiegel klebt:"}],
infoObjekte:[{name:"Alte Karte",fund:"Hinten auf der Karte steht:"},{name:"Kiste mit Büchern",fund:"In einem Buch steht:"},{name:"Globus",fund:"Unten am Globus klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Büro",
intro:"Willkommen im Büro von Frieda Fuchs! Draußen prasselt der Regen gegen das Fenster, an der Decke surrt ein Ventilator. Auf dem Schreibtisch brennt eine grüne Lampe. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
tuerX:800,
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
intro:"Ihr steht im Ermittlungsraum. An der großen Pinnwand verbinden rote Fäden Fotos und Notizen. Hier sammelt Frieda alle Spuren zu ihren Fällen. Findet die Ziffern für das nächste Schloss!",
introDu:"Du stehst im Ermittlungsraum. An der großen Pinnwand verbinden rote Fäden Fotos und Notizen. Hier sammelt Frieda alle Spuren zu ihren Fällen. Finde die Ziffern für das nächste Schloss!",
tuerX:1350,
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
intro:"In der Dunkelkammer leuchtet nur eine rote Lampe. Hier entwickelt Frieda ihre Fotos. An der Wäscheleine hängen frische Bilder zum Trocknen. Vorsicht – helles Licht würde die Fotos verderben!",
tuerX:220,
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
{titel:"Das Labor für Spuren",
intro:"Im Labor ist alles weiß und blitzsauber. Mit Mikroskop und Lupe untersucht Frieda Fingerabdrücke, Haare und Fußspuren. Schaut genau hin – jede Kleinigkeit kann wichtig sein!",
introDu:"Im Labor ist alles weiß und blitzsauber. Mit Mikroskop und Lupe untersucht Frieda Fingerabdrücke, Haare und Fußspuren. Schau genau hin – jede Kleinigkeit kann wichtig sein!",
tuerX:1050,
hintergrund:()=>`${defs('#c8d4dc','#7a8a96','#ffffff')}${R(0,0,1600,470,'#dceaf2')}${gitter(40,470,60,'rgba(90,130,160,.22)')}${R(0,400,1600,70,'#b8d4e4')}${fensterHell(300)}${decke('#a8bccb')}${roehre(600)}${roehre(1400)}${boden(100,[490,515,545,580,620,665,715,770])}`,
objekte:[
{name:"Mikroskop",x:420,boden:620,fuss:4,by:-185,zeichne:mikroskop,fund:"Unter dem Mikroskop liegt eine Probe. Darauf steht:"},
{name:"Gipsabdruck einer Fußspur",x:760,boden:730,fuss:4,by:-135,zeichne:gipsabdruck,fund:"Neben dem Gipsabdruck liegt:"},
{name:"Reagenzgläser",x:1300,boden:600,fuss:4,by:-150,zeichne:reagenz,fund:"Hinter den Reagenzgläsern steckt:"},
{name:"Große Lupe",x:1400,boden:730,fuss:4,by:-190,zeichne:standlupe,fund:"Unter der großen Lupe liegt:"},
{name:"Fingerabdruck-Tafel",x:700,y:220,wand:true,by:-85,zeichne:fingertafel,fund:"Hinter der Fingerabdruck-Tafel klebt:"}
],
infoObjekte:[
{name:"Tafel mit Laborregeln",x:1350,y:240,wand:true,by:-85,zeichne:regeltafel,fund:"Auf der Tafel mit den Regeln steht:"},
{name:"Laborkittel am Haken",x:150,boden:720,fuss:4,by:-220,zeichne:kittel,fund:"In der Kitteltasche steckt:"},
{name:"Kühlschrank für Proben",x:1530,boden:540,fuss:4,by:-200,zeichne:kuehlschrank,fund:"Im Kühlschrank liegt:"}
]},
{titel:"Der Dachboden",
intro:"Eine knarrende Treppe führt hinauf auf den Dachboden. Durch das Dachfenster fällt Mondlicht auf alte Koffer und Kisten. Hier wartet Friedas letzter Fall – öffnet das letzte Schloss, dann habt ihr die Prüfung bestanden!",
introDu:"Eine knarrende Treppe führt hinauf auf den Dachboden. Durch das Dachfenster fällt Mondlicht auf alte Koffer und Kisten. Hier wartet Friedas letzter Fall – öffne das letzte Schloss, dann hast du die Prüfung bestanden!",
tuerX:600,
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
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ccaf0"/><stop offset="1" stop-color="#ffe6b8"/></linearGradient></defs>
   ${R(0,0,1000,600,'url(#himmel)')}<circle cx="660" cy="170" r="90" fill="#fff6c8" opacity=".45"/>${C(660,170,55,'#fff3a8')}
   ${[[150,120,210,'#c9785a'],[270,110,260,'#e8c47a'],[380,130,190,'#8aa8c0'],[510,120,240,'#c98a8a'],[630,110,200,'#a8c08a'],[740,130,250,'#e0b090']].map(([x,w,h,f])=>R(x,470-h,w,h,f,'#5a4a3a',2)+P(`M${x-6} ${470-h}L${x+w/2} ${440-h}L${x+w+6} ${470-h}Z`,'#8a4a3a','#5a3a2a')+Q(Math.floor(h/60),k=>R(x+16,488-h+k*56,24,30,'#fff6d0','#5a4a3a',2)+R(x+w-40,488-h+k*56,24,30,'#fff6d0','#5a4a3a',2))).join('')}
   ${R(0,470,1000,40,'#c8c0b0')}${R(0,510,1000,90,'#6a6a70')}<path d="M0 556H1000" stroke="#fff" stroke-width="5" stroke-dasharray="40 30"/>
   ${P('M330 510V300M330 300Q330 284 346 284',0,'#2a2a2a',8)}${P('M336 284H372L366 304H342Z','#2a2a2a')}${C(354,312,10,'#fff3a0')}
   ${P('M560 110l10 6 10-6M600 90l8 5 8-5M420 130l9 5 9-5',0,'#3a2a17',2.5)}
   <path d="M0 0H1000V600H0Z M240 600V90H760V600Z" fill="#2a1c12" fill-rule="evenodd"/>${R(240,90,520,510,'none','#5a3a22',18)}`
};
})();