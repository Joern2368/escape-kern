document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-mbbuch\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -10Q-10 -17 -19 -14V12Q-10 10 0 16Q10 10 19 12V-14Q10 -17 0 -10Z\"/><path d=\"M0 -9V15M-14 -6Q-8 -8 -4 -5M-14 0Q-8 -2 -4 1M4 -5Q8 -8 14 -6M4 1Q8 -2 14 0\" fill=\"none\" stroke=\"#fff\" stroke-width=\"2\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-mbfeder\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M16 -19Q-8 -14 -10 8L-17 18L-7 10Q16 4 16 -19Z\"/><path d=\"M-15 16L12 -14\" stroke=\"#fff\" stroke-width=\"1.8\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-mbkrone\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M-18 10V-12L-9 -1L0 -17L9 -1L18 -12V10Z\"/><rect x=\"-18\" y=\"11\" width=\"36\" height=\"6\" fill=\"currentColor\"/><circle cx=\"0\" cy=\"3\" r=\"3.5\" fill=\"#fff\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-mbapfel\" viewBox=\"-20 -20 40 40\"><path fill=\"currentColor\" d=\"M0 -8Q-8 -14 -14 -9Q-20 -1 -15 9Q-9 18 0 14Q9 18 15 9Q20 -1 14 -9Q8 -14 0 -8Z\"/><path d=\"M0 -8Q1 -14 4 -18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M3 -13Q10 -19 15 -13Q8 -9 3 -13Z\" fill=\"currentColor\" opacity=\".7\"/></symbol>\n<symbol id=\"sym-mbflocke\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -18V18M-15.6 -9L15.6 9M-15.6 9L15.6 -9M-5 -15L0 -10L5 -15M-5 15L0 10L5 15M-15 -3L-9 -5L-12 -10M15 3L9 5L12 10\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const st=(s,k)=>s?` stroke="${s}" stroke-width="${k||2}"`:'';
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${st(s,k)}/>`;
const RR=(x,y,w,h,r,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}"${st(s,k)}/>`;
const C=(x,y,r,f,s,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${st(s,k)}/>`;
const E=(x,y,a,b,f,s,k)=>`<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="${f}"${st(s,k)}/>`;
const P=(d,f,s,k)=>`<path d="${d}" fill="${f}"${st(s,k)}/>`;
const L=(d,s,k)=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${k}" stroke-linecap="round"/>`;
const U=(id,x,y,w,c)=>`<use href="#sym-${id}" x="${x}" y="${y}" width="${w}" height="${w}" color="${c}"/>`;
const X=(x,y,t,g,f)=>`<text x="${x}" y="${y}" font-size="${g}" fill="${f}" font-family="Arial,Helvetica,sans-serif" font-weight="bold" text-anchor="middle">${t}</text>`;
const B=(x,y,a,s,c)=>`<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0Q25 -16 50 0Q25 16 0 0Z" fill="${c}"/>`;
const G=(x,y,s,i)=>`<g transform="translate(${x} ${y}) scale(${s})">${i}</g>`;
const sch=rx=>E(0,4,rx,8,'rgba(0,0,0,.25)');
const holz='#b07840',dk='#4a2a14',gold='#e8b83a',dgold='#a07a20',rot='#d84a5a',rosa='#f48ab8',lila='#a88ae8',blau='#5a8ae0',hblau='#8ab0d8',tk='#4ac8c0',gruen='#5ab05a',orange='#f29a3a',weiss='#fff',pflaume='#6a3a6a',grau='#9a9aa8';
const FB=[rot,blau,gold,tk,lila,gruen,rosa,orange,'#3a4a9a','#8a3a5a'];
const W=(x,y,s,c)=>[[0,0,1],[-.85,.25,.7],[.85,.25,.75],[-.4,-.45,.7],[.45,-.5,.65]].map(([a,b,r])=>C(x+a*s,y+b*s,r*s,c||weiss)).join('');
const ST=(x,y,r,c)=>P('M'+[...Array(10)].map((_,k)=>{const a=k*Math.PI/5,q=k%2?r*.45:r;return(x+Math.sin(a)*q).toFixed(1)+' '+(y-Math.cos(a)*q).toFixed(1);}).join('L')+'Z',c);
const reihe=(x,y,w,h)=>{let s='',k=0;for(let p=x;p<x+w-10;k++){const b=10+(k*7)%9,t=(k*5)%16;s+=R(p,y-h+t,b,h-t,FB[(k*3)%10],'rgba(0,0,0,.3)',1);p+=b+1;}return s;};
const apfel=(x,y,r)=>C(x,y,r,rot,'#8a2030',2)+L(`M${x} ${y-r}l2 -5`,dk,2);
const korb=(w,h)=>P(`M${-w} ${-h}H${w}L${w-12} 0H${-w+12}Z`,'#d8a050','#7a4a1a',3)+L(`M${-w+4} ${-h*.66}H${w-4}M${-w+8} ${-h*.33}H${w-8}`,'#7a4a1a',2);
const taube=(x,y,s)=>G(x,y,s,E(0,0,20,12,weiss,'#b0c0d0',2)+C(16,-10,8,weiss,'#b0c0d0',2)+P('M23 -11l7 2l-7 3Z',orange)+C(18,-12,1.8,'#222')+P('M-4 -4Q-20 -24 -30 -8Q-16 -2 -4 2Z','#eef4fa','#b0c0d0',1.5)+P('M-18 2l-14 4l14 4Z','#eef4fa'));
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".55"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
</defs>`;
const hg=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
function boden(m){let d='';const g='<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/>';
if(m==0){for(let k=0;k<46;k++)d+=C((k*137+20)%1600,490+(k*53)%280,26+k%4*12,k%3?'rgba(255,255,255,.75)':'rgba(170,200,240,.35)');for(let k=0;k<10;k++)d+=U('mbflocke',(k*173+60)%1600,500+(k*61)%240,18,'#bcd8f4');return g+d;}
if(m==1){for(let r=0;r<7;r++){const y=480+r*44+r*r*2;d+=`M0 ${y}Q800 ${y+26} 1600 ${y}`;for(let x=(r%2)*60;x<1600;x+=120)d+=`M${x} ${y+4}l${(x-800)*.03} 40`;}return g+L(d,'rgba(90,60,120,.4)',3)+E(820,630,300,70,'#f4b8d0','#b85a8a',5)+E(820,630,230,48,'none','#fff',3)+ST(820,630,30,'#fff');}
if(m==2){for(let y of[494,524,560,604,656,716])d+=`M0 ${y}H1600`;for(let k=0;k<16;k++)d+=`M${k*100+(k%2)*40} ${494+(k%5)*30}v34`;let f='';for(let k=0;k<30;k++)f+=L(`M${(k*131)%1600} ${490+(k*43)%280}l${14+k%3*6} ${-6+k%4*4}`,'#e8c860',3);return g+L(d,'rgba(90,50,20,.5)',3)+E(500,640,230,54,'#c84a5a','#7a2a3a',4)+E(500,640,180,38,'none',gold,4)+f;}
if(m==3){for(let r=0;r<7;r++)for(let k=0;k<18;k++){const x=k*96+(r%2)*48-20,y=476+r*46;d+=`M${x} ${y}L${x+48} ${y+23}L${x} ${y+46}L${x-48} ${y+23}Z`;}return g+P(d,'rgba(255,255,255,.18)','rgba(160,120,40,.45)',2)+ST(800,620,90,'rgba(232,184,58,.5)')+C(800,620,40,'rgba(255,255,255,.4)');}
for(let x=-400;x<2000;x+=100)d+=`M${800+(x-800)*.5} 470L${x} 780`;for(let y of[520,590,680])d+=`M0 ${y}H1600`;let f='';for(let k=0;k<14;k++)f+=X((k*197+60)%1600,520+(k*59)%230,'ABCDEFGHIKLMNO'[k],'22','rgba(255,230,160,.35)');return g+L(d,'rgba(255,200,220,.18)',3)+R(0,470,1600,12,gold)+f;}
const flockenkette=()=>`${L('M-90 -40Q0 0 90 -40',hblau,3)}${C(-90,-40,6,gold)}${C(90,-40,6,gold)}${[-60,-20,20,60].map((x,k)=>{const y=-34+(90-Math.abs(x))*.2;return L(`M${x} ${y}V${y+16+k%2*22}`,hblau,2)+U('mbflocke',x-15,y+14+k%2*22,30,[blau,lila,tk,rosa][k]);}).join('')}`;
const regenschild=()=>`${RR(-86,-60,172,120,10,'#fffaf0',gold,4)}${[rot,orange,gold,gruen,blau,lila].map((c,k)=>L(`M${-64+k*8} 34A${64-k*8} ${64-k*8} 0 0 1 ${64-k*8} 34`,c,7)).join('')}${W(-62,38,13,'#d8e8f8')}${W(62,38,13,'#d8e8f8')}`;
const apfelbaum=()=>`${sch(80)}${P('M-16 0Q-10 -80 -14 -150H14Q10 -80 16 0Z',holz,dk,3)}${L('M0 -120L-40 -160M4 -130L40 -170',holz,8)}${[[0,-200,60],[-52,-170,44],[52,-176,46],[-30,-236,40],[34,-240,40]].map(([x,y,r])=>C(x,y,r,gruen)).join('')}${[[-40,-170],[20,-190],[54,-160],[-10,-236],[30,-232],[-62,-204],[62,-212]].map(([x,y])=>apfel(x,y,9)).join('')}${apfel(-34,-8,8)}`;
const wolkenbrunnen=()=>`${sch(90)}${R(-70,-80,140,80,'#d8d0e8','#6a6a8a',3)}${L('M-70 -54H70M-70 -28H70M-30 -80V-54M30 -80V-54M0 -54V-28M-50 -28V0M50 -28V0','#8a8aa8',2)}${E(0,-80,70,16,'#ece6f8','#6a6a8a',3)}${E(0,-80,56,10,'#7ac0f0')}${L('M-60 -80V-170M60 -80V-170',holz,8)}${P('M-82 -160L0 -212L82 -160Z',rosa,'#a04a6a',3)}${L('M-56 -140H56',dk,4)}${L('M10 -140V-112',dk,2)}${P('M0 -112H20L17 -96H3Z',holz,dk,2)}${W(-22,-88,9)}`;
const bettenstapel=()=>`${sch(100)}${[[-96,-40,192,weiss,blau],[-88,-78,176,'#fde2ee',rosa],[-80,-114,160,'#eef0ff',lila]].map(([x,y,w,c,s])=>RR(x,y,w,38,16,c,s,3)+[1,2,3,4].map(j=>C(x+w*j/5,y+19,4,s)).join('')).join('')}${E(-20,-122,46,14,weiss,hblau,3)}${U('mbflocke',30,-150,30,hblau)}`;
const jahrestafel=()=>`${R(-88,-64,176,128,weiss,hblau,4)}${L('M0 -60V60M-84 0H84',hblau,2)}${[0,72,144,216,288].map(a=>`<ellipse transform="translate(-44 -32) rotate(${a})" cx="0" cy="-11" rx="6" ry="9" fill="${rosa}"/>`).join('')}${C(-44,-32,6,gold)}${C(44,-32,13,gold)}${L('M44 -56V-50M44 -14V-8M20 -32H26M62 -32H68M27 -49l4 4M57 -19l4 4M61 -49l-4 4M27 -15l4 -4',gold,3)}${B(-70,34,-20,.7,orange)}${B(-36,24,150,.6,'#d85a3a')}${U('mbflocke',28,14,32,blau)}`;
const flockenkissen=()=>`${sch(90)}${RR(-84,-62,168,62,28,weiss,hblau,3)}${C(-84,-58,8,weiss,hblau,2)}${C(84,-58,8,weiss,hblau,2)}${[[-44,-38,blau],[0,-30,lila],[44,-38,tk]].map(([x,y,c])=>U('mbflocke',x-12,y-12,24,c)).join('')}`;
const apfelkorb=()=>`${sch(70)}${[[-38,-54],[-12,-58],[14,-56],[40,-54],[-24,-74],[4,-78],[30,-72]].map(([x,y])=>apfel(x,y,14)).join('')}${korb(64,50)}${L('M-56 -50Q0 -130 56 -50','#7a4a1a',5)}`;
const wandteppich=()=>`${L('M-84 -82H84',holz,6)}${R(-70,-78,140,150,'#b84a7a','#6a2a4a',3)}${R(-58,-66,116,126,'#fbe0ea')}${L('M-20 50V-10M30 50V0',gruen,4)}${B(-20,20,-150,.6,gruen)}${B(30,30,-30,.6,gruen)}${[[-20,-16,rot],[30,-6,lila]].map(([x,y,c])=>C(x-8,y,7,c)+C(x+8,y,7,c)+C(x,y-8,7,c)+C(x,y+8,7,c)+C(x,y,5,gold)).join('')}${taube(-10,-42,.7)}${[...Array(14)].map((_,k)=>L(`M${-65+k*10} 72v12`,'#b84a7a',3)).join('')}`;
const buecherbord=()=>`${reihe(-84,40,168,72)}${R(-92,40,184,10,holz,dk,2)}${L('M-80 50l14 22M80 50l-14 22',dk,4)}`;
const spinnrad=()=>`${sch(80)}${L('M-60 0L-34 -60M40 0L24 -60M-70 -60H60',holz,7)}${C(10,-122,60,'none',holz,6)}${[0,45,90,135].map(a=>`<path transform="translate(10 -122) rotate(${a})" d="M-58 0H58" stroke="${holz}" stroke-width="3"/>`).join('')}${C(10,-122,10,dk)}${L('M-60 -60V-122',holz,6)}${E(-60,-130,14,8,'#f0d890','#a08030',2)}${L('M-60 -130Q-30 -112 10 -122','#e8c860',2)}`;
const wollzopf=()=>`${sch(60)}${R(-40,-12,80,12,dk)}${L('M0 -12V-232',holz,8)}${L('M0 -228H40V-214',holz,6)}${[...Array(9)].map((_,k)=>E(40+(k%2?6:-6),-204+k*18,9,12,k%2?'#f2c84a':gold,dgold,2)).join('')}${E(30,-30,44,14,'#f2c84a',dgold,3)}${P('M30 -44l-18 -10v20ZM30 -44l18 -10v20Z',rosa,'#a04a6a',2)}`;
const lesesessel=()=>`${sch(90)}${RR(-60,-150,120,100,30,'#8a6ad8','#4a3a8a',3)}${RR(-70,-70,140,40,12,'#9a7ae8','#4a3a8a',3)}${RR(-86,-100,30,70,12,'#7a5ac8','#4a3a8a',3)}${RR(56,-100,30,70,12,'#7a5ac8','#4a3a8a',3)}${L('M-60 -30V0M60 -30V0',dk,6)}${U('mbbuch',-22,-96,44,rot)}`;
const turmuhr=()=>`${C(0,0,64,'#fffaf0','#8a6aa8',6)}${[1,2,4,5,7,8,10,11].map(k=>C(Math.sin(k*Math.PI/6)*52,-Math.cos(k*Math.PI/6)*52,3,'#4a3a8a')).join('')}${['12','3','6','9'].map((t,k)=>X([0,46,0,-46][k],[-40,5,50,5][k],t,'15','#4a3a8a')).join('')}${L('M0 0V-38M0 0L24 14','#4a3a8a',5)}${C(0,0,5,gold)}`;
const wollkorb=()=>`${sch(70)}${[[-34,-56,rosa],[0,-62,tk],[32,-56,gold],[-14,-80,lila]].map(([x,y,c])=>C(x,y,18,c,'rgba(0,0,0,.25)',2)+L(`M${x-12} ${y-8}Q${x} ${y+4} ${x+12} ${y-10}M${x-14} ${y+4}Q${x} ${y-12} ${x+14} ${y+6}`,'rgba(255,255,255,.6)',2)).join('')}${L('M20 -60L60 -110M30 -56L74 -100',grau,4)}${korb(62,48)}`;
const schreibpult=()=>`${sch(70)}${L('M-56 0V-90M56 0V-90',dk,6)}${P('M-70 -90L70 -100V-110L-70 -104Z',holz,dk,3)}${P('M-50 -106L10 -112L14 -100L-46 -94Z','#fffaf0','#a09080',2)}${L('M-40 -102H0M-38 -98H-4',hblau,2)}${R(30,-130,22,24,'#3a4a9a',dk,2)}${U('mbfeder',30,-160,34,lila)}`;
const eselT=()=>`${R(-52,-60,12,60,grau)}${R(-30,-60,12,60,grau)}${R(20,-60,12,60,grau)}${R(40,-60,12,60,grau)}${L('M-62 -84q-16 10 -10 30','#5a5a6a',4)}${E(0,-82,64,32,'#a8a8b8','#5a5a6a',3)}${P('M36 -100L58 -150L84 -140L64 -88Z','#a8a8b8','#5a5a6a',3)}${P('M62 -160L56 -202L72 -166Z',grau,'#5a5a6a',2)}${P('M74 -162L82 -200L86 -160Z',grau,'#5a5a6a',2)}${E(78,-150,22,16,'#a8a8b8','#5a5a6a',3)}${E(94,-142,12,10,'#e0d8e0')}${C(76,-156,3,'#111')}${L('M90 -134q6 4 10 -2','#5a5a6a',2)}${L('M58 -150l-8 30','#5a5a6a',5)}`;
const katzeT=()=>`${L('M20 -10Q50 -20 40 -60','#e8902a',8)}${E(0,-28,26,30,'#f4a040','#a05a10',2)}${C(0,-68,20,'#f4a040','#a05a10',2)}${P('M-18 -78L-14 -100L-2 -86ZM18 -78L14 -100L2 -86Z','#f4a040','#a05a10',2)}${C(-7,-70,3,'#2a6a2a')}${C(7,-70,3,'#2a6a2a')}${P('M-3 -62h6l-3 3Z',rosa)}${L('M-6 -56q6 4 12 0M-22 -62h12M10 -62h12','#7a4010',1.5)}`;
const hahnT=()=>`${L('M-22 -10Q-54 -46 -40 -74M-26 -4Q-62 -24 -58 -56M-26 4Q-60 0 -66 -30','#3a9a6a',7)}${E(0,-6,28,24,'#d86a3a','#8a3a1a',2)}${C(20,-36,14,'#e88a4a','#8a3a1a',2)}${P('M10 -48q4 -12 8 -2q4 -12 8 -2q4 -10 6 2Z',rot)}${P('M32 -38l12 4l-12 4Z',gold)}${E(30,-24,4,7,rot)}${C(23,-40,2.5,'#111')}${L('M-6 16V30M8 16V30',gold,3)}`;
const hundT=()=>`${L('M-46 -20q-20 -10 -16 -30','#8a5a3a',6)}${E(0,-20,50,20,'#c89a6a','#6a4a2a',2)}${C(50,-36,20,'#c89a6a','#6a4a2a',2)}${E(40,-34,8,16,'#8a5a3a')}${C(68,-34,4,'#222')}${C(54,-42,2.5,'#222')}${L('M58 -26q6 4 10 0','#6a4a2a',2)}`;
const sternlaterne=()=>`${C(0,-6,110,'url(#licht)')}${L('M0 -90V-50',dk,3)}${P('M-26 -50H26L34 -40H-34Z',dk)}${R(-26,-40,52,70,'rgba(255,240,170,.9)',dk,4)}${L('M0 -40V30M-26 -5H26',dk,2)}${ST(0,-5,16,gold)}${R(-30,30,60,8,dk)}`;
const hahnstange=()=>`${L('M-90 30H90',holz,10)}${L('M-80 30v24M80 30v24',dk,6)}${hahnT()}`;
const eselLaute=()=>`${sch(80)}${eselT()}${E(-10,-84,22,16,'#d8984a','#7a4a1a',2)}${L('M8 -92L50 -114','#7a4a1a',5)}${C(-10,-84,5,'#5a3010')}`;
const katzeFass=()=>`${sch(60)}${P('M-46 0Q-56 -55 -46 -110H46Q56 -55 46 0Z',holz,dk,3)}${L('M-52 -30H52M-52 -80H52',dk,4)}${E(0,-110,46,10,'#c88a50',dk,2)}${G(0,-112,1,katzeT())}`;
const trommel=()=>`${sch(70)}${R(-60,-90,120,84,rot,'#7a2a2a',3)}${L('M-60 -86L-40 -10L-20 -86L0 -10L20 -86L40 -10L60 -86',gold,3)}${E(0,-6,60,14,'#a03a3a','#7a2a2a',3)}${E(0,-90,60,16,'#fffaf0','#7a4a1a',3)}${L('M-40 -110L20 -94M40 -112L-18 -96',holz,5)}${P('M70 -30L110 -50L114 -20Z',gold,dgold,2)}${L('M70 -30H40',gold,6)}`;
const notentafel=()=>`${R(-88,-62,176,124,'#fff8e8','#8a5a2a',4)}${[-30,-20,-10,0,10].map(y=>L(`M-74 ${y}H74`,'#8a7a6a',1.5)).join('')}${[[-56,-5],[-30,-15],[-4,0],[22,-20],[48,-10]].map(([x,y])=>E(x,y,7,5,'#3a2a5a')+L(`M${x+6} ${y}V${y-28}`,'#3a2a5a',2)).join('')}${[[-60,40,'#a8a8b8'],[-20,40,'#c89a6a'],[20,40,'#f4a040'],[60,40,'#d86a3a']].map(([x,y,c])=>C(x,y,12,c,'#5a4a3a',2)).join('')}`;
const hundHeu=()=>`${sch(100)}${R(-92,-60,184,60,'#ecd060','#a8862a',3)}${L('M-80 -40h40M-20 -24h60M30 -46h50M-70 -14h30','#c8a040',3)}${G(-10,-58,1,hundT())}`;
const tisch=()=>`${sch(100)}${L('M-80 0V-70M80 0V-70',dk,8)}${R(-100,-80,200,14,holz,dk,3)}${P('M-100 -66H100L90 -40H-90Z','#fbe0ea','#c86a8a',2)}${E(-56,-96,30,16,'#d8a050','#8a5a20',2)}${L('M-70 -100l8 -6M-56 -104l8 -6M-42 -100l8 -6','#8a5a20',2)}${P('M-10 -80V-122H14V-80Z',blau,'#2a4a8a',2)}${L('M14 -114q12 4 0 20',blau,4)}${E(54,-86,30,8,'#fffaf0',grau,2)}${apfel(44,-98,9)}${apfel(64,-96,9)}`;
const kronleuchter=()=>`${C(0,-20,120,'url(#licht)')}${L('M0 -100V-30',gold,4)}${E(0,-10,80,14,'none',gold,5)}${E(0,-34,44,8,'none',gold,4)}${L('M0 -30L-80 -10M0 -30L80 -10M0 -30L-40 -6M0 -30L40 -6',gold,2)}${[-80,-40,0,40,80].map(x=>C(x,-18,8,'#fff8d0',gold,2)+P(`M${x} -4l-5 10l5 10l5 -10Z`,'#cfeff8',hblau,1)).join('')}`;
const koenigsbild=()=>`${R(-80,-74,160,148,gold,dgold,4)}${R(-66,-60,132,120,'#bfe4e0')}${P('M-50 60Q-46 10 0 4Q46 10 50 60Z',rot)}${P('M-30 14Q0 30 30 14L24 60H-24Z',weiss)}${C(0,-14,24,'#f6d2b0')}${P('M-18 -4Q0 30 18 -4Q10 10 0 10Q-10 10 -18 -4Z',weiss)}${C(-8,-18,2.5,'#222')}${C(8,-18,2.5,'#222')}${L('M-6 -6q6 4 12 0','#a04a4a',2)}${U('mbkrone',-20,-62,40,gold)}`;
const glitzertreppe=()=>`${sch(110)}${[0,1,2,3].map(k=>R(-110+k*22,-30-k*30,220-k*44,30,k%2?'#f4f0ff':'#e0f4f2','#8ac8c0',2)+[...Array(5-k)].map((_,j)=>ST(-80+k*22+j*(160-k*44)/(4-k||1),-15-k*30,6,gold)).join('')).join('')}${L('M-110 0V-60M110 0V-60M-110 -60L-44 -150',gold,4)}${P('M10 -96Q12 -104 22 -104Q30 -104 34 -98L44 -92H14Z','rgba(200,240,255,.85)','#6ab0d0',2)}`;
const taubenbrunnen=()=>`${sch(110)}${E(0,-20,110,24,'#e8f0f0','#8ac8c0',4)}${E(0,-22,92,14,'#8ad0f0')}${R(-14,-120,28,100,'#f4f8f8','#8ac8c0',3)}${E(0,-122,50,12,'#e8f0f0','#8ac8c0',3)}${L('M0 -134Q-40 -170 -70 -30M0 -134Q40 -170 70 -30M0 -134V-170',blau,3)}${C(0,-172,6,'#cfeff8')}${taube(-80,-44,.9)}${taube(76,-40,-.9)}`;
const harfe=()=>`${sch(60)}${[-24,-10,4,18,32,46].map(x=>L(`M${x} ${-(x+36)*1.04}V${-205+(x+40)*(x+40)*.006}`,'#fff8d0',2)).join('')}${L('M-40 0V-200',gold,10)}${L('M-40 -200Q10 -222 50 -152Q60 -122 70 -110',gold,8)}${L('M-36 0L70 -110',dgold,12)}${C(-40,-204,7,rosa)}`;
const tanztafel=()=>`${R(-88,-64,176,128,'#fdf6fa',gold,4)}${[[-50,30,'1'],[-10,-10,'2'],[40,20,'3']].map(([x,y,t])=>E(x,y,12,20,rosa)+C(x,y-28,6,rosa)+X(x,y+42,t,'16','#8a3a5a')).join('')}${L('M-40 10Q-30 -10 -22 -10M2 -4Q20 10 28 16','#8a3a5a',2)}`;
const festtorte=()=>`${sch(80)}${L('M0 0V-40',gold,8)}${E(0,-44,70,12,weiss,gold,3)}${RR(-60,-100,120,52,8,'#fbd0e0','#c86a8a',2)}${RR(-44,-140,88,40,8,weiss,hblau,2)}${RR(-28,-172,56,32,8,'#c8f0ec','#4ac8c0',2)}${L('M-60 -84Q-45 -74 -30 -84T0 -84T30 -84T60 -84M-44 -126Q-30 -116 -16 -126T14 -126T44 -126',weiss,4)}${[-40,-14,14,40].map(x=>C(x,-104,6,rot)).join('')}${ST(0,-186,14,gold)}`;
const thronsessel=()=>`${sch(80)}${RR(-60,-220,120,170,20,gold,dgold,4)}${RR(-46,-204,92,140,14,'#c83a5a')}${R(-70,-70,140,30,gold,dgold,3)}${RR(-60,-84,120,20,8,'#e85a7a')}${L('M-60 -40V0M60 -40V0',dgold,8)}${U('mbkrone',-22,-252,44,gold)}${C(0,-150,8,'#fff8d0')}`;
const maerchenkarte=()=>`${R(-90,-62,180,124,'#f6e8c8','#8a5a2a',4)}${L('M-70 40Q-40 0 -10 20T40 -10T70 -40','#a07a50',3)}${W(-58,-34,12,'#fff')}${R(-20,-6,22,26,'#c8b8e0','#5a4a80',2)}${P('M-24 -6L-9 -24L6 -6Z',rosa)}${R(36,-30,30,22,holz,dk,2)}${P('M32 -30L51 -44L70 -30Z',rot)}${U('mbkrone',50,20,26,gold)}${apfel(-60,36,6)}`;
const abcbild=()=>`${R(-90,-66,180,132,pflaume,gold,5)}${[['A',-50,rot],['B',0,blau],['C',50,gruen]].map(([t,x,c],k)=>RR(x-24,-32+k*8,48,48,6,c,weiss,2)+X(x,k*8+4,t,'32',weiss)).join('')}`;
const riesenbuch=()=>`${sch(110)}${P('M-20 0L-12 -110H12L20 0Z',pflaume,'#3a1a3a',3)}${P('M-100 -110L0 -96L100 -110L96 -170Q50 -186 0 -168Q-50 -186 -96 -170Z','#fffaf0','#a09080',3)}${L('M0 -168V-96',grau,2)}${[-148,-136,-124].map(y=>L(`M-82 ${y}Q-46 ${y-10} -12 ${y+2}M12 ${y+2}Q46 ${y-10} 82 ${y}`,'#b0a8c0',2)).join('')}${C(50,-150,10,gold)}${ST(-30,-196,10,gold)}${C(0,-150,110,'url(#licht)')}`;
const leselampe=()=>`${sch(50)}${E(0,-6,36,10,dk)}${L('M0 -10V-200',gold,6)}${P('M-50 -190L-30 -240H30L50 -190Z','#3aa08a','#1a5a4a',3)}${C(0,-180,120,'url(#licht)')}${E(0,-190,50,8,'#fff4b0')}`;
const buecherturm=()=>`${sch(80)}${[[-70,'#3a4a9a'],[-60,rot],[-74,gold],[-56,tk],[-64,lila],[-50,gruen],[-58,rosa]].map(([w,c],k)=>R(w+(k%2)*8,-26-k*26,-w*2,26,c,'rgba(0,0,0,.35)',2)+L(`M${w+(k%2)*8+10} ${-13-k*26}H${-w+(k%2)*8-10}`,'rgba(255,255,255,.5)',2)).join('')}${U('mbbuch',-24,-226,48,'#fffaf0')}`;
const maerchentafel=()=>`${R(-90,-64,180,128,'#fffaf0',pflaume,4)}${R(-90,-64,180,22,pflaume)}${X(0,-47,'ES WAR EINMAL','14',gold)}${[-20,-4,12,28,44].map(y=>L(`M-74 ${y}H${y>30?20:74}`,'#b0a8c0',3)).join('')}${U('mbkrone',40,30,26,gold)}`;
const tintenfass=()=>`${sch(50)}${U('mbfeder',-30,-160,60,rosa)}${U('mbfeder',-6,-150,52,tk)}${U('mbfeder',-44,-140,44,gold)}${P('M-36 0Q-44 -40 -24 -60H24Q44 -40 36 0Z','#2a2a6a','#141440',3)}${R(-20,-74,40,16,'#2a2a6a','#141440',2)}`;
const lesekissen=()=>`${sch(100)}${RR(-100,-50,200,50,24,'#c84a6a','#7a2a4a',3)}${RR(-70,-86,140,40,20,'#3aa08a','#1a5a4a',3)}${[-70,-35,0,35,70].map(x=>C(x,-25,4,gold)).join('')}${U('mbbuch',-24,-118,48,blau)}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#3a2a5a" stroke="#e8b83a" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#3a2a5a" stroke="#e8b83a" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen .pl{opacity:0}.tuer.offen #mbw1{transform:translateX(-120px);opacity:.3}.tuer.offen #mbw2{transform:translateX(120px);opacity:.3}.tuer.offen #mbf1,.tuer.offen #mbf2,.tuer.offen #mbs1,.tuer.offen #mbs2,.tuer.offen #mbh{transform:scaleX(.1)}.tuer.offen #mbd{transform:scaleX(.06)}.tuer .fit{opacity:0;transform:translateY(-90px)}.tuer.offen .fit{opacity:1;transform:none}@keyframes mbs{0%{transform:translateY(-40px);opacity:0}30%{opacity:1}100%{transform:translateY(70px);opacity:0}}.mbsn{animation:mbs 5s linear infinite}@keyframes mbg{50%{opacity:.25}}.mbgl{animation:mbg 2.2s ease-in-out infinite}</style>`;
function tuerWolke(n){
const h=a=>[190,250,310,370,430].map((y,k)=>C(a?580:420,y,52,k%2?'#f4f8ff':weiss)+C(a?530:470,y+26,44,k%2?weiss:'#eef4ff')).join('');
return`${R(390,150,220,320,'#fff2d0')}${C(500,320,130,'url(#licht)')}${[rot,orange,gold,gruen,blau,lila].map((c,k)=>R(410+k*8,422-k*46,180-k*16,48,c)).join('')}${ST(500,170,16,gold)}
   <g id="mbw1" class="tb">${h(0)}</g>
   <g id="mbw2" class="tb">${h(1)}</g>
   ${W(380,190,46)}${W(620,190,46)}${W(500,140,54)}${W(370,440,40)}${W(630,440,40)}
   <g class="tb pl">${sPl(n,310)}</g>`;
}
function tuerTurm(n){
const f=x=>R(x,170,100,270,'#d87a9a','#7a3a5a',3)+L(`M${x+25} 172V438M${x+50} 172V438M${x+75} 172V438`,'#b85a7a',2)+L(`M${x+8} 220H${x+92}M${x+8} 390H${x+92}`,'#7a3a5a',4)+C(x+(x<500?90:10),305,5,gold);
let z='';for(let k=0;k<15;k++)z+=E(500+(k%2?6:-6),186+k*19,10,12,k%2?'#f2c84a':gold,dgold,2);
return`${P('M400 470V240Q400 170 500 170Q600 170 600 240V470Z','#bfe0fa')}${P('M400 420Q470 340 540 400T600 380V470H400Z','#7ac07a')}${C(560,230,22,'#fff4b0')}${W(450,230,16)}
   <g id="mbf1" class="tb" style="transform-origin:400px 300px">${f(400)}</g>
   <g id="mbf2" class="tb" style="transform-origin:600px 300px">${f(500)}</g>
   <path fill-rule="evenodd" d="M360 470V230Q360 130 500 130Q640 130 640 230V470ZM400 470V240Q400 170 500 170Q600 170 600 240V470Z" fill="#b8a4d8" stroke="#5a4a80" stroke-width="4"/>${R(380,440,240,30,'#d8c8ec','#5a4a80',3)}${L('M378 230Q378 150 500 150Q622 150 622 230','#8a74b8',3)}
   <g class="tb fit">${z}${P('M500 470l-14 -12h28Z',rosa)}</g>
   <g class="tb pl">${sPl(n,300)}</g>`;
}
function tuerHinter(n){
return`${R(380,170,240,300,'#5a3a1a')}${R(410,190,180,280,'#1a2a5a')}${C(540,240,22,'#fff6c0')}${C(552,234,18,'#1a2a5a')}${[[430,220],[470,260],[520,210],[575,300]].map(([x,y])=>C(x,y,2.5,'#fff')).join('')}${P('M410 470V330L440 300L470 340L500 290L530 340L560 310L590 330V470Z','#0f1a3a')}${P('M470 470L495 360H505L530 470Z','#6a7a9a')}
   <g id="mbh" class="tb" style="transform-origin:410px 330px">${R(410,190,180,280,holz,dk,3)}${L('M446 192V468M482 192V468M518 192V468M554 192V468','#8a5a2a',2)}${L('M420 230H580M420 430H580M420 430L580 230',dk,8)}${C(500,280,26,'#ffe9a0',dk,4)}${L('M500 254V306M474 280H526',dk,3)}${C(570,340,8,gold,dgold,2)}</g>
   ${L('M440 156l14 -6v18M476 150l14 -6v18',gold,3)}${C(448,170,5,gold)}${C(484,164,5,gold)}${R(368,160,264,14,'#7a4a20')}
   <g class="tb pl">${sPl(n,380)}</g>`;
}
function tuerSpiegel(n){
const f=x=>R(x,170,100,300,'#f8fcfc',gold,4)+R(x+12,190,76,190,'#bfe4f0',dgold,2)+L(`M${x+20} 260L${x+60} 200M${x+26} 300L${x+80} 220`,'rgba(255,255,255,.9)',4)+R(x+16,396,68,56,'none',gold,2)+C(x+(x<500?90:10),330,6,gold);
return`${R(400,170,200,300,'#fff0c0')}${C(500,340,140,'url(#licht)')}${P('M470 300H530L600 470H400Z','#f8e0a0')}${R(476,240,48,60,'#ffe080','#c8a040',2)}
   <g id="mbs1" class="tb" style="transform-origin:400px 320px">${f(400)}</g>
   <g id="mbs2" class="tb" style="transform-origin:600px 320px">${f(500)}</g>
   ${R(380,150,20,320,gold,dgold,3)}${R(600,150,20,320,gold,dgold,3)}${P('M372 160Q500 60 628 160Z',gold,dgold,3)}${[...Array(7)].map((_,k)=>L(`M500 158L${410+k*30} ${150-Math.sin(k*Math.PI/6)*40}`,dgold,2)).join('')}${U('mbkrone',480,104,40,'#fff8d0')}
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerBuch(n){
let s='';for(let k=0;k<8;k++)s+=ST(430+(k*53)%150,200+(k*71)%220,6+k%3*3,'#fff8a0');
return`${R(372,140,256,330,pflaume,'#3a1a3a',4)}${R(390,154,224,306,'#fffaf0','#a09080',2)}${L('M606 160V454M598 160V454',grau,1.5)}${C(500,300,140,'url(#licht)')}<g class="mbgl">${s}</g>${P('M440 460Q480 380 500 300Q520 380 560 460Z','#f8e0a0')}${R(480,250,40,56,'#ffe080',gold,2)}
   <g id="mbd" class="tb" style="transform-origin:390px 300px">${R(390,146,232,320,'#b84a6a','#6a2a4a',4)}${R(406,162,200,288,'none',gold,4)}${[[406,162],[606,162],[406,450],[606,450]].map(([x,y])=>C(x,y,9,gold)).join('')}${U('mbbuch',466,190,80,gold)}${X(506,300,'MÄRCHEN','24',gold)}</g>
   ${R(372,140,22,330,'#8a3a5a','#3a1a3a',3)}
   <g class="tb pl">${sPl(n,380)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'wolkentor';
const arten={wolkentor:[tuerWolke,'Wolkentor mit Zahlenschloss'],turmfenster:[tuerTurm,'Fensterläden am Turmfenster mit Zahlenschloss'],hintertuer:[tuerHinter,'Hintertür der Hütte mit Zahlenschloss'],spiegeltuer:[tuerSpiegel,'Spiegeltür des Ballsaals mit Zahlenschloss'],buchdeckel:[tuerBuch,'Großer Buchdeckel mit Zahlenschloss']};
const a=arten[art]||arten.wolkentor;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const figur=(x,y,k,o)=>`${P(`M${x-30} ${y}L${x-14} ${y-70}H${x+14}L${x+30} ${y}Z`,k)}${L(`M${x-12} ${y-62}L${x-32} ${y-28}`,k,9)}<g class="mbwk" style="transform-origin:${x+12}px ${y-62}px">${L(`M${x+12} ${y-62}L${x+40} ${y-102}`,k,9)}${C(x+42,y-106,6,'#f6d2b0')}</g>${C(x,y-86,18,'#f6d2b0')}${C(x-6,y-88,2.5,'#222')}${C(x+6,y-88,2.5,'#222')}${L(`M${x-6} ${y-80}q6 5 12 0`,'#a04a4a',2)}${o}`;
SZENARIEN.maerchenbuch={
name:"Das Märchenbuch",
symbole:["mbbuch","mbfeder","mbkrone","mbapfel","mbflocke"],
symbolNamen:["Buch","Feder","Krone","Apfel","Schneeflocke"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect width="120" height="90" rx="10" fill="#fbe0ea"/><circle cx="60" cy="44" r="34" fill="#fff4b0" opacity=".7"/><path d="M60 34Q40 22 18 28V72Q40 66 60 78Q80 66 102 72V28Q80 22 60 34Z" fill="#fffaf0" stroke="#6a3a6a" stroke-width="3"/><path d="M60 34V78M26 40Q40 36 52 42M26 50Q40 46 52 52M68 42Q80 36 94 40M68 52Q80 46 94 50" fill="none" stroke="#a88ae8" stroke-width="2"/><path d="M60 6L63 14L71 14L65 19L67 27L60 22L53 27L55 19L49 14L57 14Z" fill="#e8b83a"/><circle cx="24" cy="16" r="3" fill="#e8b83a"/><circle cx="98" cy="14" r="3" fill="#e8b83a"/></svg>`,
texte:{
einleitung:"Willkommen im Märchenbuch! Ein altes, dickes Buch liegt aufgeschlagen vor euch. Plötzlich leuchten seine Seiten, und ihr landet mitten in den Märchen. Ihr besucht das Wolkenland von Frau Holle, ein hohes Turmzimmer, die Hütte der Bremer Stadtmusikanten, einen glänzenden Ballsaal und die große Bibliothek im Buch. Die Märchenerzählerin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände auf jeder Seite. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, kommt wieder nach Hause. Schafft ihr es, ihr Leseratten?",
startKnopf:"Ins Märchenbuch",
hinweisGeber:"Die Märchenerzählerin flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Märchenerzählerin lächelt und blättert zurück … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss am Durchgang",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Geschichte macht eine Pause!",
zeitUm:"Eure Zeit ist abgelaufen. Aber keine Sorge – ihr dürft weiterspielen und das Märchenbuch trotzdem zu Ende lesen!",
geschafft:"Ihr habt es geschafft!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst. Das Märchenbuch leuchtet hell auf, und seine Seiten klappen sanft zu. Ihr sitzt wieder zu Hause, und das Buch liegt vor euch. Frau Holle, die Bremer Stadtmusikanten, die Prinzessin und der König winken euch zum Abschied zu. Ihr seid jetzt echte Märchen-Expertinnen und Märchen-Experten!"
},
texteDu:{
einleitung:"Willkommen im Märchenbuch! Ein altes, dickes Buch liegt aufgeschlagen vor dir. Plötzlich leuchten seine Seiten, und du landest mitten in den Märchen. Du besuchst das Wolkenland von Frau Holle, ein hohes Turmzimmer, die Hütte der Bremer Stadtmusikanten, einen glänzenden Ballsaal und die große Bibliothek im Buch. Die Märchenerzählerin hat überall Rätsel versteckt. Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände auf jeder Seite. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Wer alle Schlösser öffnet, kommt wieder nach Hause. Schaffst du es?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Märchenerzählerin lächelt und blättert zurück … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeprägt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Durchgang bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber keine Sorge – du darfst weiterspielen und das Märchenbuch trotzdem zu Ende lesen!",
geschafft:"Du hast es geschafft!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst. Das Märchenbuch leuchtet hell auf, und seine Seiten klappen sanft zu. Du sitzt wieder zu Hause, und das Buch liegt vor dir. Frau Holle, die Bremer Stadtmusikanten, die Prinzessin und der König winken dir zum Abschied zu. Du bist jetzt eine echte Märchen-Expertin oder ein echter Märchen-Experte!"
},
einfach:{
name:"Das Märchenbuch",
symbolNamen:["Buch","Feder","Krone","Apfel","Schnee-Flocke"],
texte:{
einleitung:"Vor euch liegt ein altes Märchen-Buch. Die Seiten leuchten. Ihr seid jetzt im Buch! Ihr seht fünf Orte: das Wolken-Land, den Turm, die Hütte, den Ball-Saal und die Bücherei. Die Märchen-Erzählerin hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommt ihr eine Zahl. Am Ende kommt ihr nach Hause. Schafft ihr es?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss an der Tür",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Buch klappt zu. Ihr seid wieder zu Hause. Alle Märchen-Figuren winken euch zu!"
},
texteDu:{
einleitung:"Vor dir liegt ein altes Märchen-Buch. Die Seiten leuchten. Du bist jetzt im Buch! Du siehst fünf Orte: das Wolken-Land, den Turm, die Hütte, den Ball-Saal und die Bücherei. Die Märchen-Erzählerin hat Rätsel versteckt. Jede Tür hat ein Zahlenschloss. Für jede richtige Aufgabe bekommst du eine Zahl. Am Ende kommst du nach Hause. Schaffst du es?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du hast es geschafft!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Das Buch klappt zu. Du bist wieder zu Hause. Alle Märchen-Figuren winken dir zu!"
},
raeume:[
{titel:"Das Wolken-Land",intro:"Ihr seid auf einer weichen Wolke. Hier wohnt Frau Holle. Es schneit. Ein Tor aus Wolken ist zu. Findet die Zahlen!",introDu:"Du bist auf einer weichen Wolke. Hier wohnt Frau Holle. Es schneit. Ein Tor aus Wolken ist zu. Finde die Zahlen!",
objekte:[{name:"Flocken-Kette",fund:"An der Kette hängt:"},{name:"Regen-Bogen-Schild",fund:"Am Schild klebt:"},{name:"Apfel-Baum",fund:"Am Baum hängt:"},{name:"Wolken-Brunnen",fund:"Im Brunnen liegt:"},{name:"Betten-Stapel",fund:"In den Betten liegt:"}],
infoObjekte:[{name:"Jahres-Zeiten-Tafel",fund:"An der Tafel klebt:"},{name:"Flocken-Kissen",fund:"Im Kissen steckt:"},{name:"Apfel-Korb",fund:"Im Korb liegt:"}]},
{titel:"Der hohe Turm",intro:"Ihr seid oben im Turm. Hier steht ein Spinn-Rad. Am Fenster sind Läden. Sie sind zu. Findet die Zahlen!",introDu:"Du bist oben im Turm. Hier steht ein Spinn-Rad. Am Fenster sind Läden. Sie sind zu. Finde die Zahlen!",
objekte:[{name:"Wand-Teppich",fund:"Am Teppich steckt:"},{name:"Bücher-Brett",fund:"Auf dem Brett liegt:"},{name:"Spinn-Rad",fund:"Am Rad hängt:"},{name:"Woll-Zopf",fund:"Im Zopf steckt:"},{name:"Lese-Sessel",fund:"Auf dem Sessel liegt:"}],
infoObjekte:[{name:"Turm-Uhr",fund:"An der Uhr klebt:"},{name:"Woll-Korb",fund:"Im Korb liegt:"},{name:"Schreib-Tisch",fund:"Auf dem Tisch liegt:"}]},
{titel:"Die Hütte im Wald",intro:"In der Hütte ist es warm. Esel, Hund, Katze und Hahn machen Musik. Die Hinter-Tür ist zu.",
objekte:[{name:"Stern-Laterne",fund:"An der Laterne hängt:"},{name:"Hahn",fund:"Beim Hahn liegt:"},{name:"Esel",fund:"Beim Esel liegt:"},{name:"Katze",fund:"Bei der Katze liegt:"},{name:"Trommel",fund:"Auf der Trommel liegt:"}],
infoObjekte:[{name:"Noten-Tafel",fund:"An der Tafel klebt:"},{name:"Hund",fund:"Beim Hund liegt:"},{name:"Ess-Tisch",fund:"Auf dem Tisch liegt:"}]},
{titel:"Der Ball-Saal",intro:"Im Schloss ist ein Fest. Die Lampe funkelt. Tauben sitzen am Brunnen. Die Spiegel-Tür ist zu.",
objekte:[{name:"Kron-Leuchter",fund:"Am Leuchter hängt:"},{name:"König-Bild",fund:"Am Bild klebt:"},{name:"Glitzer-Treppe",fund:"Auf der Treppe liegt:"},{name:"Tauben-Brunnen",fund:"Am Brunnen liegt:"},{name:"Harfe",fund:"An der Harfe hängt:"}],
infoObjekte:[{name:"Tanz-Tafel",fund:"An der Tafel klebt:"},{name:"Fest-Torte",fund:"Bei der Torte liegt:"},{name:"Thron",fund:"Auf dem Thron liegt:"}]},
{titel:"Die Bücherei im Buch",intro:"Hier stehen viele Bücher. Buchstaben leuchten. Ein großes Buch ist die letzte Tür. Öffnet es!",introDu:"Hier stehen viele Bücher. Buchstaben leuchten. Ein großes Buch ist die letzte Tür. Öffne es!",
objekte:[{name:"Märchen-Karte",fund:"An der Karte klebt:"},{name:"ABC-Bild",fund:"Am Bild klebt:"},{name:"Riesen-Buch",fund:"Im Buch liegt:"},{name:"Lese-Lampe",fund:"An der Lampe hängt:"},{name:"Bücher-Turm",fund:"Im Turm steckt:"}],
infoObjekte:[{name:"Märchen-Tafel",fund:"An der Tafel klebt:"},{name:"Tinten-Fass",fund:"Beim Fass liegt:"},{name:"Lese-Kissen",fund:"Auf dem Kissen liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Im Wolkenland von Frau Holle",
intro:"Ihr rutscht durch einen alten Brunnen und landet weich auf einer Wolke. Hier oben wohnt Frau Holle. Sie schüttelt gerade ihre Betten aus, und darum schneit es unten auf der Erde. Ein Apfelbaum trägt rote Äpfel. Hinten versperrt ein dichtes Wolkentor den Weg. Findet die Ziffern, damit sich die Wolken teilen!",
introDu:"Du rutschst durch einen alten Brunnen und landest weich auf einer Wolke. Hier oben wohnt Frau Holle. Sie schüttelt gerade ihre Betten aus, und darum schneit es unten auf der Erde. Ein Apfelbaum trägt rote Äpfel. Hinten versperrt ein dichtes Wolkentor den Weg. Finde die Ziffern, damit sich die Wolken teilen!",
tuerX:1250,tuerArt:"wolkentor",
hintergrund:()=>`${defs('#f4f8ff','#c8dcf4','#fff6d0')}${hg('mbH1','#7cc0f0','#bfe0fa','#fde2ee')}${R(0,0,1600,470,'url(#mbH1)')}${C(1480,80,46,'#fff4b0')}${C(1480,80,200,'url(#licht)')}${[[150,110,40],[480,60,30],[1150,50,32],[900,150,26]].map(([x,y,s])=>W(x,y,s)).join('')}${W(470,330,70,'#f4f8ff')}${R(400,220,140,100,'#fde8d0','#c89a7a',3)}${P('M386 224L470 166L554 224Z',rosa,'#a04a6a',3)}${R(445,246,50,40,'#bfe0fa','#c89a7a',3)}${P('M440 282H500V312Q470 322 440 312Z',weiss,hblau,2)}${[...Array(17)].map((_,k)=>C(k*100,452+(k%3)*8,70,k%2?weiss:'#f4f8ff')).join('')}${[...Array(26)].map((_,k)=>`<g class="mbsn" style="animation-delay:${(k%9)*.55}s">${U('mbflocke',(k*67+20)%1600,40+(k*41)%360,10+k%3*5,k%2?'#fff':'#d8ecfa')}</g>`).join('')}${boden(0)}`,
objekte:[
{name:"Schneeflocken-Kette",x:250,y:200,wand:true,by:-60,zeichne:flockenkette,fund:"An der Schneeflocken-Kette hängt:"},
{name:"Regenbogen-Schild",x:650,y:220,wand:true,by:-80,zeichne:regenschild,fund:"Am Regenbogen-Schild klebt:"},
{name:"Apfelbaum",x:150,boden:700,fuss:4,by:-290,zeichne:apfelbaum,fund:"Am Apfelbaum hängt:"},
{name:"Wolkenbrunnen",x:500,boden:650,fuss:4,by:-225,zeichne:wolkenbrunnen,fund:"Am Rand des Wolkenbrunnens liegt:"},
{name:"Bettenstapel",x:850,boden:720,fuss:4,by:-165,zeichne:bettenstapel,fund:"Zwischen den Betten steckt:"}
],
infoObjekte:[{name:"Jahreszeiten-Tafel",x:1000,y:240,wand:true,by:-82,zeichne:jahrestafel,fund:"An der Jahreszeiten-Tafel klebt:"},{name:"Schneeflocken-Kissen",x:1050,boden:600,fuss:4,by:-90,zeichne:flockenkissen,fund:"Im Schneeflocken-Kissen steckt:"},{name:"Apfelkorb",x:1450,boden:740,fuss:4,by:-110,zeichne:apfelkorb,fund:"Im Apfelkorb liegt:"}]},
{titel:"Das hohe Turmzimmer",
intro:"Eine Wendeltreppe führt hinauf in ein rundes Turmzimmer. Hier stehen ein Spinnrad, viele Bücher und ein gemütlicher Sessel. Ein langer, goldener Zopf aus Wolle liegt bereit. Das große Fenster hat Fensterläden mit einem Zahlenschloss. Findet die Ziffern, dann könnt ihr am Wollzopf sicher nach unten klettern!",
introDu:"Eine Wendeltreppe führt hinauf in ein rundes Turmzimmer. Hier stehen ein Spinnrad, viele Bücher und ein gemütlicher Sessel. Ein langer, goldener Zopf aus Wolle liegt bereit. Das große Fenster hat Fensterläden mit einem Zahlenschloss. Finde die Ziffern, dann kannst du am Wollzopf sicher nach unten klettern!",
tuerX:450,tuerArt:"turmfenster",
hintergrund:()=>`${defs('#ead8f0','#c0a8d8','#ffe8f4')}${hg('mbH2','#c8b8e4','#d8cce8','#e8dcf0')}${R(0,0,1600,470,'url(#mbH2)')}${[...Array(10)].map((_,r)=>L(`M0 ${r*47+20}Q800 ${r*47+40} 1600 ${r*47+20}`,'rgba(90,70,130,.3)',2)+[...Array(14)].map((_,k)=>L(`M${k*120+(r%2)*60} ${r*47+24}v44`,'rgba(90,70,130,.25)',2)).join('')).join('')}${[150,1315].map(x=>P(`M${x-34} 340V200Q${x-34} 160 ${x} 160Q${x+34} 160 ${x+34} 200V340Z`,'#bfe0fa','#6a5a90',8)+P(`M${x-30} 340Q${x} 300 ${x+30} 330V340Z`,'#7ac07a')+L(`M${x} 160V340M${x-34} 250H${x+34}`,'#6a5a90',4)).join('')}${R(0,0,1600,36,'#8a6aa8')}${L('M0 44Q100 74 200 44T400 44T600 44T800 44T1000 44T1200 44T1400 44T1600 44',gruen,4)}${[...Array(16)].map((_,k)=>B(k*100+20,54+(k%2)*8,k*40,.4,gruen)+C(k*100+60,58,6,k%2?rosa:weiss)).join('')}${R(0,440,1600,30,'#a890c8')}${boden(1)}`,
objekte:[
{name:"Wandteppich",x:800,y:220,wand:true,by:-100,zeichne:wandteppich,fund:"Hinter dem Wandteppich steckt:"},
{name:"Bücherbord",x:1150,y:210,wand:true,by:-50,zeichne:buecherbord,fund:"Auf dem Bücherbord liegt:"},
{name:"Spinnrad",x:150,boden:700,fuss:4,by:-200,zeichne:spinnrad,fund:"Am Spinnrad hängt:"},
{name:"Langer Wollzopf",x:700,boden:650,fuss:4,by:-250,zeichne:wollzopf,fund:"Im langen Wollzopf steckt:"},
{name:"Lesesessel",x:1000,boden:720,fuss:4,by:-165,zeichne:lesesessel,fund:"Auf dem Lesesessel liegt:"}
],
infoObjekte:[{name:"Turmuhr",x:1480,y:240,wand:true,by:-82,zeichne:turmuhr,fund:"An der Turmuhr klebt:"},{name:"Wollkorb",x:1300,boden:600,fuss:4,by:-125,zeichne:wollkorb,fund:"Im Wollkorb liegt:"},{name:"Schreibpult",x:1500,boden:740,fuss:4,by:-170,zeichne:schreibpult,fund:"Auf dem Schreibpult liegt:"}]},
{titel:"In der Hütte der Stadtmusikanten",
intro:"Mitten im Wald steht eine kleine Hütte. Draußen ist es schon Nacht, aber drinnen ist es warm und hell. Esel, Hund, Katze und Hahn wohnen hier und machen zusammen Musik. Sie freuen sich über Besuch! Die Hintertür der Hütte hat ein Zahlenschloss. Findet die Ziffern, dann geht die Reise weiter zum Schloss!",
introDu:"Mitten im Wald steht eine kleine Hütte. Draußen ist es schon Nacht, aber drinnen ist es warm und hell. Esel, Hund, Katze und Hahn wohnen hier und machen zusammen Musik. Sie freuen sich über Besuch! Die Hintertür der Hütte hat ein Zahlenschloss. Finde die Ziffern, dann geht die Reise weiter zum Schloss!",
tuerX:800,tuerArt:"hintertuer",
hintergrund:()=>`${defs('#e0b060','#9a6a2a','#ffd890')}${hg('mbH3','#2a6a66','#3a7a70','#4a8a76')}${R(0,0,1600,470,'url(#mbH3)')}${[...Array(32)].map((_,k)=>L(`M${k*50+25} 0V470`,'rgba(10,40,40,.35)',3)).join('')}${[560,1280].map(x=>R(x-44,150,88,110,'#1a2a5a','#7a4a20',10)+C(x+14,180,10,'#fff6c0')+C(x-20,200,2,'#fff')+P(`M${x-40} 256L${x-20} 216L${x} 256ZM${x} 256L${x+20} 226L${x+40} 256Z`,'#0f1a3a')+L(`M${x} 150V260M${x-44} 205H${x+44}`,'#7a4a20',5)).join('')}${R(0,0,1600,40,'#7a4a20')}${C(250,180,260,'url(#licht)')}${C(1100,200,240,'url(#licht)')}${R(0,446,1600,24,'#7a4a20')}${boden(2)}`,
objekte:[
{name:"Sternenlaterne",x:250,y:190,wand:true,by:-96,zeichne:sternlaterne,fund:"An der Sternenlaterne hängt:"},
{name:"Hahn auf der Stange",x:1100,y:230,wand:true,by:-82,zeichne:hahnstange,fund:"Neben dem Hahn liegt:"},
{name:"Esel mit Laute",x:150,boden:700,fuss:4,by:-215,zeichne:eselLaute,fund:"Unter der Laute des Esels liegt:"},
{name:"Katze auf dem Fass",x:500,boden:650,fuss:4,by:-230,zeichne:katzeFass,fund:"Neben der Katze auf dem Fass liegt:"},
{name:"Musikantentrommel",x:1050,boden:720,fuss:4,by:-130,zeichne:trommel,fund:"Auf der Musikantentrommel liegt:"}
],
infoObjekte:[{name:"Notentafel",x:1450,y:240,wand:true,by:-80,zeichne:notentafel,fund:"An der Notentafel klebt:"},{name:"Hund auf dem Heuballen",x:1350,boden:600,fuss:4,by:-125,zeichne:hundHeu,fund:"Neben dem Hund im Heu liegt:"},{name:"Gedeckter Tisch",x:800,boden:745,fuss:4,by:-140,zeichne:tisch,fund:"Auf dem gedeckten Tisch liegt:"}]},
{titel:"Der Ballsaal im Schloss",
intro:"Im Schloss ist heute ein großes Fest. Der Kronleuchter funkelt, eine Harfe spielt leise, und weiße Tauben gurren am Brunnen. Auf der glitzernden Treppe steht ein gläserner Schuh. Die Spiegeltür am Ende des Saals hat ein Zahlenschloss. Findet die Ziffern, damit sie sich öffnet!",
introDu:"Im Schloss ist heute ein großes Fest. Der Kronleuchter funkelt, eine Harfe spielt leise, und weiße Tauben gurren am Brunnen. Auf der glitzernden Treppe steht ein gläserner Schuh. Die Spiegeltür am Ende des Saals hat ein Zahlenschloss. Finde die Ziffern, damit sie sich öffnet!",
tuerX:1100,tuerArt:"spiegeltuer",
hintergrund:()=>`${defs('#f6ecd8','#d8c49a','#fff4c8')}${hg('mbH4','#c8ece8','#e0f6f2','#f2fbf8')}${R(0,0,1600,470,'url(#mbH4)')}${P('M240 440V230Q240 170 300 170Q360 170 360 230V440Z','#2a3a7a',gold,6)}${[40,520,880,1260,1560].map(x=>R(x-25,90,50,350,'#fafcfc','#c8d8d8',2)+R(x-32,80,64,18,gold)+R(x-32,430,64,14,gold)).join('')}${R(0,0,1600,80,'#f4b8d0')}${[...Array(20)].map((_,k)=>P(`M${k*80} 80Q${k*80+40} 130 ${k*80+80} 80Z`,'#e88ab0')).join('')}${L('M0 120H1600M0 440H1600',gold,4)}${taube(560,180,1)}${taube(980,150,-1)}${[...Array(12)].map((_,k)=>`<g class="mbgl" style="animation-delay:${(k%4)*.5}s">${ST((k*137+80)%1600,150+(k*53)%250,5,gold)}</g>`).join('')}${boden(3)}`,
objekte:[
{name:"Kronleuchter",x:300,y:160,wand:true,by:-110,zeichne:kronleuchter,fund:"Am Kronleuchter hängt:"},
{name:"Bild vom König",x:700,y:230,wand:true,by:-90,zeichne:koenigsbild,fund:"Am Bild vom König klebt:"},
{name:"Glitzertreppe",x:150,boden:700,fuss:4,by:-160,zeichne:glitzertreppe,fund:"Auf der Glitzertreppe liegt:"},
{name:"Taubenbrunnen",x:500,boden:650,fuss:4,by:-190,zeichne:taubenbrunnen,fund:"Am Rand des Taubenbrunnens liegt:"},
{name:"Goldene Harfe",x:850,boden:720,fuss:4,by:-240,zeichne:harfe,fund:"An der goldenen Harfe hängt:"}
],
infoObjekte:[{name:"Tanzschritt-Tafel",x:1400,y:240,wand:true,by:-82,zeichne:tanztafel,fund:"An der Tanzschritt-Tafel klebt:"},{name:"Festtorte",x:1350,boden:600,fuss:4,by:-205,zeichne:festtorte,fund:"Neben der Festtorte liegt:"},{name:"Thronsessel",x:1500,boden:740,fuss:4,by:-260,zeichne:thronsessel,fund:"Auf dem Thronsessel liegt:"}]},
{titel:"Die Bibliothek im Märchenbuch",
intro:"Ihr steht in einer riesigen Bibliothek mitten im Märchenbuch. Bis unter die Decke stehen bunte Bücher. Leuchtende Buchstaben schweben durch die Luft. Hier ist der Ausgang: ein großer Buchdeckel mit dem letzten Zahlenschloss. Findet die Ziffern, damit sich das Buch öffnet und ihr nach Hause kommt!",
introDu:"Du stehst in einer riesigen Bibliothek mitten im Märchenbuch. Bis unter die Decke stehen bunte Bücher. Leuchtende Buchstaben schweben durch die Luft. Hier ist der Ausgang: ein großer Buchdeckel mit dem letzten Zahlenschloss. Finde die Ziffern, damit sich das Buch öffnet und du nach Hause kommst!",
tuerX:600,tuerArt:"buchdeckel",
hintergrund:()=>`${defs('#c84a6a','#7a2a4a','#fff0b0')}${hg('mbH5','#24245a','#30306a','#3a3a7a')}${R(0,0,1600,470,'url(#mbH5)')}${[100,190,280,370].map(y=>reihe(0,y,1600,74)+R(0,y,1600,10,pflaume,'#3a1a3a',2)).join('')}${[0,400,800,1200,1590].map(x=>R(x,0,14,470,pflaume)).join('')}${L('M1460 40V450M1510 40V450',holz,6)}${[80,140,200,260,320,380,440].map(y=>L(`M1460 ${y}H1510`,holz,5)).join('')}${[...Array(14)].map((_,k)=>`<g class="mbgl" style="animation-delay:${(k%5)*.4}s">${X((k*113+60)%1600,40+(k*47)%60,'ABCDEFGHIJKLMN'[k],'26','#fff0a0')}</g>`).join('')}${C(800,60,300,'url(#licht)')}${R(0,446,1600,24,pflaume)}${boden(4)}`,
objekte:[
{name:"Märchenkarte",x:200,y:220,wand:true,by:-80,zeichne:maerchenkarte,fund:"An der Märchenkarte klebt:"},
{name:"Buchstabenbild",x:1000,y:210,wand:true,by:-84,zeichne:abcbild,fund:"Am Buchstabenbild klebt:"},
{name:"Riesenbuch",x:300,boden:700,fuss:4,by:-215,zeichne:riesenbuch,fund:"Im Riesenbuch liegt:"},
{name:"Leselampe",x:950,boden:640,fuss:4,by:-255,zeichne:leselampe,fund:"An der Leselampe hängt:"},
{name:"Bücherturm",x:1250,boden:700,fuss:4,by:-240,zeichne:buecherturm,fund:"Im Bücherturm steckt:"}
],
infoObjekte:[{name:"Tafel der Märchen",x:1350,y:240,wand:true,by:-82,zeichne:maerchentafel,fund:"An der Tafel der Märchen klebt:"},{name:"Tintenfass mit Federn",x:1450,boden:600,fuss:4,by:-170,zeichne:tintenfass,fund:"Neben dem Tintenfass liegt:"},{name:"Lesekissen",x:800,boden:740,fuss:4,by:-125,zeichne:lesekissen,fund:"Auf dem Lesekissen liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs>${hg('mbE','#2a2a6a','#a86aa8','#fbd0e0')}<radialGradient id="mbS"><stop offset="0" stop-color="#fff6c0" stop-opacity=".95"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/></radialGradient></defs>
   <style>@keyframes mbz{0%,25%{transform:scaleX(-1)}70%,100%{transform:scaleX(1)}}@keyframes mbo{0%,40%{opacity:1}70%,100%{opacity:0}}@keyframes mbp{50%{transform:scale(1.15);opacity:.7}}@keyframes mbw{50%{transform:rotate(-30deg)}}.mbzu{animation:mbz 4s ease-in-out both}.mblf{animation:mbo 4s ease-in-out both}.mbpu{animation:mbp 2.4s ease-in-out infinite;transform-origin:500px 330px}.mbwk{animation:mbw .9s ease-in-out infinite}</style>
   <rect width="1000" height="600" fill="url(#mbE)"/>${[[60,40],[200,90],[420,30],[620,70],[760,40],[900,110],[120,200]].map(([x,y])=>ST(x,y,6,'#fff6c8')).join('')}
   <g class="mbpu">${C(500,330,260,'url(#mbS)')}</g>
   ${P('M320 430L500 410L680 430V250L500 230L320 250Z','#fffaf0','#a09080',3)}<g class="mblf">${P('M320 430L500 410V230L320 250Z','#fffaf0','#a09080',3)}${[270,300,330,360].map(y=>L(`M340 ${y}Q420 ${y-14} 486 ${y-8}`,'#b0a8c0',3)).join('')}</g>${[270,300,330,360].map(y=>L(`M514 ${y-8}Q580 ${y-14} 660 ${y}`,'#b0a8c0',3)).join('')}
   <g class="mbzu" style="transform-origin:500px 330px">${P('M500 410L684 432V246L500 226Z','#b84a6a','#6a2a4a',4)}${U('mbbuch',552,286,80,gold)}</g>${R(494,224,12,190,'#8a3a5a')}
   ${P('M0 600V520Q250 490 500 510Q750 490 1000 520V600Z','#7ac07a')}
   ${figur(110,540,'#8ab0d8',E(110,434,22,10,weiss)+C(90,440,7,weiss))}${U('mbflocke',150,380,26,weiss)}${U('mbflocke',60,360,20,weiss)}
   ${figur(250,550,rosa,P('M226 492L230 452Q250 430 270 452L274 492H262V456Q250 448 238 456V492Z','#f2c84a')+U('mbkrone',236,428,28,gold))}
   ${figur(390,560,rot,P('M374 476Q390 500 406 476Q398 486 390 486Q382 486 374 476Z',weiss)+U('mbkrone',374,438,32,gold))}
   ${G(800,560,.9,eselT())}${G(806,450,.7,hundT())}${G(816,420,.6,katzeT())}${G(818,340,.6,hahnT())}
   ${[[640,180],[700,120],[300,140],[900,260]].map(([x,y],k)=>U(['mbapfel','mbfeder','mbkrone','mbflocke'][k],x,y,30,'#fff6c0')).join('')}`
};
})();