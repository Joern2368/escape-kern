document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-nase\" viewBox=\"-20 -20 40 40\"><path d=\"M-19 0H-13M13 0H19\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/><circle r=\"12\" fill=\"currentColor\"/><circle cx=\"-4\" cy=\"-5\" r=\"3.5\" fill=\"#fff\" opacity=\".6\"/></symbol>\n<symbol id=\"sym-ball\" viewBox=\"-20 -20 40 40\"><circle r=\"14\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M-14 0A14 14 0 0 0 14 0Z\" fill=\"currentColor\"/><path d=\"M-8 -7Q0 -12 8 -7\" stroke=\"currentColor\" stroke-width=\"2.5\" fill=\"none\" stroke-linecap=\"round\"/></symbol>\n<symbol id=\"sym-stern\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -14L4 -4L14 -4L6 2L9 13L0 6L-9 13L-6 2L-14 -4L-4 -4Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-zylinder\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-17 12H17M-10 12V-14H10V12\"/></g><path d=\"M-10 2H10V7H-10Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-popcorn\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"><path d=\"M-12 -2L-8 17H8L12 -2Z\"/><path d=\"M-3 -2L-2 17M3 -2L2 17\"/></g><circle cx=\"-7\" cy=\"-7\" r=\"5\" fill=\"currentColor\"/><circle cx=\"0\" cy=\"-12\" r=\"5.5\" fill=\"currentColor\"/><circle cx=\"7\" cy=\"-7\" r=\"5\" fill=\"currentColor\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${s?` stroke="${s}" stroke-width="${k}"`:''}/>`;
const C=(x,y,r,f,s,k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${s?` stroke="${s}" stroke-width="${k}"`:''}/>`;
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.32)"/>`;
const BC=['#e8413a','#f4c430','#3aa0e8','#5ac85a','#e86ab8'];
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <linearGradient id="oben" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l||'#fff3b0'}" stop-opacity=".5"/><stop offset="1" stop-color="${l||'#fff3b0'}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
function boden(linien){let d='';if(linien)for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return`<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="${d}" stroke="rgba(0,0,0,.2)" stroke-width="2"/>`;}
function streifen(f,w,y0,y1){let d='';for(let x=0;x<1600;x+=2*w)d+=`M${x} ${y0}h${w}V${y1}h${-w}Z`;return`<path d="${d}" fill="${f}"/>`;}
function linien(f,a,y0,y1){let d='';for(let x=a;x<1600;x+=a)d+=`M${x} ${y0}V${y1}`;return`<path d="${d}" stroke="${f}" stroke-width="3"/>`;}
function kette(x0,x1,y,dd,n,wimpel){let s=`<path d="M${x0} ${y}Q${(x0+x1)/2} ${y+2*dd} ${x1} ${y}" stroke="#333" stroke-width="2" fill="none"/>`;for(let k=1;k<n;k++){const t=k/n,x=x0+(x1-x0)*t,yy=y+4*dd*t*(1-t);s+=wimpel?`<path class="wehen" style="animation-delay:-${(k*.37).toFixed(2)}s" d="M${x-13} ${yy}H${x+13}L${x} ${yy+30}Z" fill="${BC[k%5]}"/>`:`${C(x,yy+5,6,BC[k%5]).replace('<circle','<circle class="blink" style="animation-delay:-'+(k*.23).toFixed(2)+'s"')}${C(x,yy+5,14,BC[k%5]).split('fill=').join('opacity=".25" fill=')}`;}return s;}
function lampe(x,l,f){return`<circle cx="${x}" cy="${l+30}" r="110" fill="url(#licht)"/><path d="M${x} 0V${l}" stroke="#222" stroke-width="3"/><path d="M${x-30} ${l+26}Q${x} ${l-12} ${x+30} ${l+26}Z" fill="${f}" stroke="#222" stroke-width="2"/><ellipse cx="${x}" cy="${l+26}" rx="12" ry="5" fill="#fff3b0"/>`;}
function spot(x,f){return`<path d="M${x-14} 40H${x+14}L${x+150} 600H${x-150}Z" fill="${f}" opacity=".16"/><ellipse cx="${x}" cy="600" rx="150" ry="40" fill="${f}" opacity=".2"/>${R(x-18,24,36,22,'#333')}`;}
const podest=()=>`${schatten(58,4)}<path d="M-52 -76V-6A52 12 0 0 0 52 -6V-76Z" fill="#c8302a" stroke="#6a1010" stroke-width="3"/><path d="M-52 -50Q0 -36 52 -50" stroke="#f4c430" stroke-width="6" fill="none"/><ellipse cy="-76" rx="52" ry="12" fill="#f4c430" stroke="#8a6420" stroke-width="3"/>${[-28,0,28].map(x=>`<use href="#sym-stern" x="${x-9}" y="-34" width="18" height="18" color="#fff3b0"/>`).join('')}`;
const einrad=()=>`${schatten(36,4)}<circle cy="-32" r="30" fill="none" stroke="#222" stroke-width="7"/>${[0,45,90,135].map(a=>`<path d="M0 -60V-4" stroke="#aaa" stroke-width="2" transform="rotate(${a} 0 -32)"/>`).join('')}${C(0,-32,5,'#666')}<path d="M-6 -32L-4 -110M6 -32L4 -110" stroke="#3aa0e8" stroke-width="5"/><path d="M-20 -116Q0 -128 22 -116Q20 -106 0 -108Q-18 -106 -20 -116Z" fill="#222"/><path d="M-12 -32H-22M12 -32H22" stroke="#555" stroke-width="4"/>`;
const trommel=()=>`${schatten(50,4)}<path d="M-46 -90V-8A46 12 0 0 0 46 -8V-90Z" fill="#3a6ad8" stroke="#1a2a6a" stroke-width="3"/><path d="M-46 -84${[...Array(8)].map((_,k)=>`L${-40+k*11.5} ${k%2?-84:-14}`).join('')}L46 -84" stroke="#f4ecd8" stroke-width="3" fill="none"/><ellipse cy="-90" rx="46" ry="12" fill="#f4ecd8" stroke="#8a7a5a" stroke-width="3"/><path d="M10 -100L40 -130M-14 -100L-34 -134" stroke="#8a5a2a" stroke-width="5" stroke-linecap="round"/>${C(40,-130,7,'#e8413a')}${C(-34,-134,7,'#e8413a')}`;
const clownsauto=()=>`${schatten(66,4)}<path d="M-62 -18V-50Q-60 -60 -40 -62L-24 -92H20L38 -62Q60 -60 62 -48V-18Z" fill="#f4c430" stroke="#8a6420" stroke-width="3"/><path d="M-18 -86H-2V-64H-32ZM4 -86H16L30 -64H4Z" fill="#cfe8ef"/>${C(-38,-16,15,'#e8413a','#222',4)}${C(38,-16,15,'#e8413a','#222',4)}${C(-38,-16,5,'#fff')}${C(38,-16,5,'#fff')}<path d="M26 -92V-112" stroke="#3f8a4a" stroke-width="3"/>${C(26,-118,8,'#e86ab8')}${C(26,-118,3,'#f4c430')}${C(58,-44,5,'#fff3b0')}`;
const trapez=()=>`<path d="M-50 -200L-40 50M50 -200L40 50" stroke="#e8d9b8" stroke-width="4"/><rect x="-48" y="44" width="96" height="12" rx="6" fill="#c8302a" stroke="#6a1010" stroke-width="2"/><path d="M-46 -20L-56 -6L-42 -8ZM46 -20L56 -6L42 -8Z" fill="#f4c430"/>`;
const schminktisch=()=>`${schatten(66,4)}<path d="M-54 0V-60M54 0V-60" stroke="#8a4a6a" stroke-width="7"/>${R(-64,-66,128,12,'#b86a8a','#6a2a4a',2)}${R(-46,-170,92,100,'#cfe8ef','#6a2a4a',6)}<path d="M-30 -150L-10 -166M10 -110L36 -140" stroke="#fff" stroke-width="4" opacity=".7"/>${[...Array(5)].map((_,k)=>C(-40+k*20,-176,5,'#fff3b0')).join('')}${[0,1,2].map(k=>C(-52,-150+k*30,5,'#fff3b0')+C(52,-150+k*30,5,'#fff3b0')).join('')}${R(-36,-78,10,12,'#e8413a')}${R(-20,-80,14,14,'#3aa0e8')}${C(20,-74,8,'#f4c430')}`;
const staender=()=>`${schatten(66,4)}<path d="M-56 -6V-200H56V-6M-66 -6H-46M46 -6H66" stroke="#888" stroke-width="5" fill="none"/>${[['#e8413a',-40],['#3aa0e8',-14],['#5ac85a',12],['#f4c430',38]].map(([c,x])=>`<path d="M${x} -200V-190M${x-16} -170L${x} -190L${x+16} -170V-90H${x-16}Z" stroke="#555" stroke-width="2" fill="${c}"/>${C(x,-140,4,'#fff')}`).join('')}`;
const hutschachteln=()=>`${schatten(50,4)}${[[0,46,40,'#e86ab8'],[-40,36,30,'#3aa0e8'],[-70,26,26,'#f4c430']].map(([y,rx,h,c])=>`${R(-rx,y-h,2*rx,h,c,'#4a2a3a',2)}<ellipse cy="${y-h}" rx="${rx}" ry="8" fill="${c}" stroke="#4a2a3a" stroke-width="2"/><path d="M${-rx} ${y-h+12}H${rx}" stroke="#fff" stroke-width="3"/>`).join('')}`;
const schuhe=()=>`${schatten(60,4)}${[-30,26].map(x=>`<path d="M${x-30} -4Q${x-34} -30 ${x-6} -34Q${x+6} -40 ${x+10} -28Q${x+40} -26 ${x+36} -4Z" fill="#e8413a" stroke="#6a1010" stroke-width="3"/><path d="M${x-30} -4H${x+36}" stroke="#222" stroke-width="5"/>${C(x+4,-30,4,'#f4c430')}`).join('')}`;
const kostuem=()=>`${C(0,-70,4,'#888')}<path d="M0 -70V-60M-30 -46L0 -60L30 -46" stroke="#888" stroke-width="3" fill="none"/><path d="M-30 -46L-46 -20L-34 -12L-24 -30L-20 40H20L24 -30L34 -12L46 -20L30 -46Q0 -30 -30 -46Z" fill="#7a3ac8" stroke="#3a1a6a" stroke-width="3"/>${[[-10,-20],[10,0],[-6,20],[12,-28],[0,-4]].map(([x,y])=>`<use href="#sym-stern" x="${x-6}" y="${y-6}" width="12" height="12" color="#f4c430"/>`).join('')}<path d="M-20 40L-28 60H28L20 40Z" fill="#e86ab8" stroke="#3a1a6a" stroke-width="2"/>`;
const holzkiste=()=>`${schatten(70,4)}${R(-64,-124,128,120,'#b8865a','#6b4a24',4)}<path d="M-64 -124L64 -4M-64 -4L64 -124" stroke="#8a5a2a" stroke-width="8"/>${R(-64,-124,128,14,'#8a5a2a')}${R(-64,-18,128,14,'#8a5a2a')}<use href="#sym-stern" x="-16" y="-80" width="32" height="32" color="#c8302a"/>`;
const stelzen=()=>`${schatten(40,4)}${[-18,18].map(x=>`<path d="M${x-8} 0L${x+8} -220" stroke="#c8302a" stroke-width="8" stroke-linecap="round"/><path d="M${x-6} -60H${x+12}" stroke="#222" stroke-width="6"/><path d="M${x-5} -120L${x+3} -150" stroke="#fff" stroke-width="8"/>`).join('')}`;
const zauberkasten=()=>`${schatten(50,4)}${R(-44,-130,88,126,'#1b2a48','#f4c430',4)}<path d="M0 -130V-4" stroke="#f4c430" stroke-width="3"/>${[[-22,-100],[22,-70],[-20,-40],[20,-110]].map(([x,y])=>`<use href="#sym-stern" x="${x-9}" y="${y-9}" width="18" height="18" color="#f4c430"/>`).join('')}<use href="#sym-zylinder" x="-22" y="-166" width="44" height="44" color="#222"/>`;
const seilrolle=()=>`${schatten(56,4)}${C(0,-50,48,'#8a5a2a','#4a2a14',4)}${C(0,-50,34,'#d8c08a')}${[0,1,2,3].map(k=>`<path d="M-32 ${-72+k*14}Q0 ${-66+k*14} 32 ${-72+k*14}" stroke="#a88a5a" stroke-width="2" fill="none"/>`).join('')}${C(0,-50,8,'#4a2a14')}<path d="M34 -40Q60 -10 50 0" stroke="#d8c08a" stroke-width="5" fill="none"/>`;
const scheinwerfer=()=>`<path d="M-60 -40H-20V0" stroke="#555" stroke-width="6" fill="none"/><path d="M38 0L130 70L150 10Z" fill="#fff3b0" opacity=".3"/><g transform="rotate(20)"><path d="M-30 -20H24L40 -34V34L24 20H-30Z" fill="#444" stroke="#222" stroke-width="3"/><ellipse cx="40" rx="8" ry="34" fill="#fff3b0"/></g>`;
const bett=()=>`${schatten(70,4)}<path d="M-64 0V-200M64 0V-200" stroke="#8a5a2a" stroke-width="8"/>${[-30,-120].map((y,k)=>`${R(-60,y-16,120,16,'#8a5a2a')}${R(-58,y-34,116,18,k?'#5ac85a':'#3aa0e8')}<ellipse cx="-36" cy="${y-38}" rx="16" ry="8" fill="#f4ecd8"/>`).join('')}<path d="M40 -120V-30M54 -120V-30M40 -96H54M40 -66H54" stroke="#6b4a24" stroke-width="4"/>`;
const herd=()=>`${schatten(50,4)}${R(-44,-90,88,88,'#e8e2d2','#555',3)}${R(-32,-64,64,40,'#333','#555',2)}<path d="M-20 -44H20" stroke="#ff9a2a" stroke-width="4"/>${C(-24,-80,4,'#222')}${C(24,-80,4,'#222')}<path d="M-26 -90Q-26 -126 0 -126Q26 -126 26 -90Z" fill="#c8302a" stroke="#6a1010" stroke-width="2"/><path d="M26 -104L44 -116" stroke="#c8302a" stroke-width="6" stroke-linecap="round"/><path d="M-12 -132Q0 -146 12 -132" stroke="#6a1010" stroke-width="4" fill="none"/><path d="M48 -126Q42 -140 50 -150" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>`;
const klapptisch=()=>`${schatten(56,4)}<path d="M-40 0L30 -60M40 0L-30 -60" stroke="#8a5a2a" stroke-width="6"/>${R(-56,-68,112,10,'#b8865a','#6b4a24',2)}${R(-34,-90,18,22,'#e8413a')}<path d="M-16 -84Q-8 -80 -16 -74" stroke="#e8413a" stroke-width="3" fill="none"/>${R(12,-88,18,20,'#3aa0e8')}${R(-6,-74,18,6,'#f4ecd8')}`;
const koffer=()=>`${schatten(56,4)}<rect x="-50" y="-96" width="100" height="90" rx="10" fill="#a0522d" stroke="#5a2a14" stroke-width="3"/><path d="M-16 -96V-110H16V-96" stroke="#5a2a14" stroke-width="5" fill="none"/>${C(-24,-60,14,'#f4c430')}${R(4,-76,30,20,'#3aa0e8')}<use href="#sym-stern" x="10" y="-44" width="22" height="22" color="#fff3b0"/>${C(-36,-4,5,'#222')}${C(36,-4,5,'#222')}`;
const pokale=()=>`${R(-90,20,180,10,'#8a5a2a')}<path d="M-80 30L-70 44M80 30L70 44" stroke="#6b4a24" stroke-width="4"/>${[[-56,1],[0,1.3],[56,.9]].map(([x,s])=>`<g transform="translate(${x} 20) scale(${s})"><path d="M-14 -50H14Q14 -24 0 -20Q-14 -24 -14 -50ZM-4 -20H4V-8H-4ZM-12 -8H12V0H-12Z" fill="#f4c430" stroke="#8a6420" stroke-width="2"/><path d="M-14 -46Q-24 -42 -14 -32M14 -46Q24 -42 14 -32" stroke="#f4c430" stroke-width="3" fill="none"/></g>`).join('')}`;
const kasse=()=>`${schatten(80,4)}${R(-70,-180,140,176,'#c8302a','#6a1010',3)}${R(-50,-150,100,60,'#fff3b0','#6a1010',3)}${R(-60,-84,120,10,'#f4ecd8')}<path d="M-84 -180L0 -236L84 -180Z" fill="#f4ecd8" stroke="#6a1010" stroke-width="3"/><path d="M-56 -180L0 -236L-28 -180ZM28 -180L0 -236L56 -180Z" fill="#c8302a"/>${R(-40,-74,80,60,'#a82020')}<text y="-160" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="18" fill="#fff">KASSE</text>`;
const popcornwagen=()=>`${schatten(66,4)}${C(-40,-14,14,'#222')}${C(40,-14,14,'#222')}${R(-58,-70,116,50,'#c8302a','#6a1010',3)}${R(-50,-150,100,80,'#cfe8ef','#888',4)}${[...Array(14)].map((_,k)=>C(-40+(k%7)*13,-82-Math.floor(k/7)*12-(k%2)*3,7,'#fff3b0','#e8c45a',1)).join('')}<path d="M-64 -150L-50 -176H50L64 -150Z" fill="#f4ecd8" stroke="#6a1010" stroke-width="3"/><path d="M-30 -176L-36 -150M0 -176V-150M30 -176L36 -150" stroke="#c8302a" stroke-width="10"/><use href="#sym-popcorn" x="-16" y="-62" width="32" height="32" color="#fff3b0"/>`;
const ballons=()=>`${schatten(26,4)}${R(-14,-20,28,20,'#888','#444',2)}${[[-34,-230,'#e8413a'],[0,-250,'#3aa0e8'],[32,-226,'#f4c430'],[-14,-196,'#5ac85a'],[18,-192,'#e86ab8']].map(([x,y,c])=>`<path d="M0 -20Q${x/2} ${(y-20)/2} ${x} ${y+26}" stroke="#666" stroke-width="1.5" fill="none"/><ellipse cx="${x}" cy="${y}" rx="22" ry="27" fill="${c}"/><ellipse cx="${x-8}" cy="${y-10}" rx="5" ry="8" fill="#fff" opacity=".5"/>`).join('')}`;
const parkbank=()=>`${schatten(72,4)}<path d="M-56 0V-40M56 0V-40" stroke="#333" stroke-width="7"/>${R(-70,-46,140,10,'#3f7a4a')}${R(-70,-76,140,10,'#3f7a4a')}${R(-70,-96,140,10,'#3f7a4a')}<path d="M-60 -46V-100M60 -46V-100" stroke="#333" stroke-width="6"/>`;
const zirkusschild=()=>`<path d="M-80 -110V-44M80 -110V-44" stroke="#888" stroke-width="3"/><rect x="-110" y="-44" width="220" height="80" rx="14" fill="#c8302a" stroke="#f4c430" stroke-width="6"/>${[...Array(10)].map((_,k)=>C(-96+k*21.3,-44,5,BC[k%5])+C(-96+k*21.3,36,5,BC[(k+2)%5])).join('')}<text y="10" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="30" fill="#fff3b0">ZIRKUS</text>`;
const plakat=()=>`${R(-60,-80,120,160,'#f4ecd8','#c8302a',6)}<path d="M-40 40L0 -40L40 40Z" fill="#e8413a"/><path d="M-20 40L0 -40L20 40Z" fill="#fff"/><path d="M0 -40V-56" stroke="#222" stroke-width="2"/><path d="M0 -56L14 -50L0 -44Z" fill="#3aa0e8"/>${R(-44,50,88,16,'#3a6ad8')}<use href="#sym-stern" x="-52" y="-72" width="22" height="22" color="#f4c430"/><use href="#sym-stern" x="30" y="-72" width="22" height="22" color="#f4c430"/>`;
const reifen=()=>`${schatten(44,4)}<path d="M-30 0H30M0 0V-150M-20 -150H20" stroke="#8a5a2a" stroke-width="6" stroke-linecap="round"/>${['#e8413a','#5ac85a','#3aa0e8'].map((c,k)=>`<ellipse cx="${-8+k*8}" cy="-104" rx="18" ry="44" fill="none" stroke="${c}" stroke-width="6"/>`).join('')}`;
const ballkiste=()=>`${schatten(52,4)}${[[-30,-56,'#e8413a'],[-6,-62,'#f4c430'],[18,-58,'#3aa0e8'],[36,-52,'#5ac85a'],[-16,-48,'#e86ab8']].map(([x,y,c])=>C(x,y,13,c,'#222',1.5)).join('')}${R(-48,-50,96,50,'#b8865a','#6b4a24',3)}<path d="M-48 -26H48" stroke="#6b4a24" stroke-width="2"/>`;
const foto=()=>`${R(-50,-60,100,120,'#d8a73a','#8a6420',5)}${R(-40,-50,80,100,'#cfe8ef')}<path d="M-26 50Q-26 18 0 16Q26 18 26 50Z" fill="#5ac85a"/>${C(-18,-12,10,'#e8413a')}${C(18,-12,10,'#e8413a')}${C(0,-6,18,'#f4d8c0')}${C(0,-2,5,'#e8413a')}<path d="M-8 6Q0 12 8 6" stroke="#c8302a" stroke-width="2" fill="none"/><path d="M-12 -22L0 -46L12 -22Z" fill="#3aa0e8"/>${C(0,-46,4,'#f4c430')}`;
const naehmaschine=()=>`${schatten(56,4)}<path d="M-44 0V-50M44 0V-50" stroke="#555" stroke-width="6"/>${R(-54,-56,108,10,'#b86a8a')}${R(-44,-64,88,8,'#2a2a2a')}${R(-40,-110,18,46,'#2a2a2a')}${R(-40,-110,74,20,'#2a2a2a')}${R(20,-110,14,38,'#2a2a2a')}<path d="M27 -72V-64" stroke="#ccc" stroke-width="2"/>${C(-30,-90,9,'#888')}${R(-4,-122,10,12,'#e8413a')}`;
const paravent=()=>`${schatten(70,4)}${[[-66,'#e86ab8'],[-22,'#7a3ac8'],[22,'#e86ab8']].map(([x,c])=>`${R(x,-180,44,170,c,'#4a2a3a',3)}${C(x+22,-120,10,'#f4c430')}${C(x+22,-60,6,'#fff')}`).join('')}<path d="M-60 -10V0M60 -10V0" stroke="#4a2a3a" stroke-width="5"/>`;
const lagerplan=()=>`${R(-50,-66,100,132,'#8a5a2a','#4a2a14',3)}${R(-40,-52,80,110,'#f4ecd8')}${R(-16,-72,32,14,'#888')}${[0,1,2,3,4].map(k=>`<path d="M-26 ${-35+k*18}H${k%2?14:28}" stroke="#666" stroke-width="3"/>${R(-36,-38+k*18,6,6,'none','#3a6ad8',2)}`).join('')}`;
const keulenfass=()=>`${schatten(44,4)}${[[-16,-8,'#e8413a'],[0,4,'#f4ecd8'],[16,-4,'#3aa0e8']].map(([x,r,c])=>`<path d="M${x-3} -60V-100Q${x-12} -120 ${x} -134Q${x+12} -120 ${x+3} -100V-60Z" fill="${c}" stroke="#222" stroke-width="2" transform="rotate(${r} ${x} -60)"/>`).join('')}<path d="M-38 -70Q-44 -35 -38 0H38Q44 -35 38 -70Z" fill="#a0683a" stroke="#4a2a14" stroke-width="3"/><path d="M-42 -50H42M-42 -20H42" stroke="#555" stroke-width="5"/>`;
const farbeimer=()=>`${schatten(56,4)}${[[-28,'#e8413a',50],[24,'#3aa0e8',40]].map(([x,c,h])=>`<path d="M${x-22} ${-h}L${x-18} 0H${x+18}L${x+22} ${-h}Z" fill="#c9ccce" stroke="#555" stroke-width="2"/><ellipse cx="${x}" cy="${-h}" rx="22" ry="6" fill="${c}"/><path d="M${x-10} ${-h}V${-h+16}M${x+6} ${-h}V${-h+10}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`).join('')}<path d="M-20 -50L-8 -100" stroke="#8a5a2a" stroke-width="5"/>${R(-16,-118,16,20,'#f4c430')}`;
const tourkarte=()=>`${R(-90,-60,180,120,'#e8f0d8','#6b4a24',5)}<path d="M-70 -20Q-40 -50 -10 -30Q20 -50 60 -30Q76 0 50 30Q10 46 -20 30Q-70 20 -70 -20Z" fill="#a8d08a" stroke="#5a8a4a" stroke-width="2"/><path d="M-50 -10L-14 -24L20 10L50 -10" stroke="#c8302a" stroke-width="3" stroke-dasharray="6 4" fill="none"/>${[[-50,-10],[-14,-24],[20,10],[50,-10]].map(([x,y])=>C(x,y,6,'#c8302a','#fff',2)).join('')}`;
const gitarre=()=>`${schatten(40,4)}<g transform="rotate(-8)"><ellipse cy="-36" rx="30" ry="32" fill="#d8873a" stroke="#6b3a14" stroke-width="3"/><ellipse cy="-84" rx="22" ry="22" fill="#d8873a" stroke="#6b3a14" stroke-width="3"/>${C(0,-66,8,'#3a2010')}${R(-5,-180,10,80,'#6b3a14')}${R(-8,-200,16,22,'#3a2010')}<path d="M-2 -196V-40M2 -196V-40" stroke="#eee" stroke-width="1"/>${R(-12,-36,24,6,'#3a2010')}</g>`;
const kaktus=()=>`${schatten(32,4)}<path d="M10 -80H22V-96M-10 -66H-22V-86" stroke="#5aa04a" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M-10 -40V-110Q-10 -122 0 -122Q10 -122 10 -110V-40Z" fill="#5aa04a" stroke="#2f6a2a" stroke-width="3"/><path d="M-22 0L-26 -40H26L22 0Z" fill="#e86ab8" stroke="#8a2a5a" stroke-width="3"/>${C(0,-124,6,'#f4c430')}`;
const programm=()=>`${R(-70,-80,140,160,'#2a3a2a','#8a5a2a',6)}${[0,1,2,3].map(k=>`${C(-46,-52+k*36,8,BC[k])}<path d="M-28 ${-52+k*36}H${46-k%2*18}" stroke="#f4ecd8" stroke-width="3"/>`).join('')}`;
const zuckerwatte=()=>`${schatten(50,4)}${R(-46,-80,92,76,'#e86ab8','#8a2a5a',3)}<path d="M-46 -60H46" stroke="#fff" stroke-width="4"/><ellipse cy="-84" rx="40" ry="10" fill="#c9ccce" stroke="#888" stroke-width="2"/><path d="M-6 -84L-10 -140M16 -84L24 -134" stroke="#f4ecd8" stroke-width="3"/>${C(-10,-152,18,'#ffb8d8')}${C(24,-146,16,'#b8e0ff')}`;
const litfass=()=>`${schatten(44,4)}${R(-36,-190,72,180,'#3f6a3a')}${R(-40,-16,80,16,'#2a4a2a')}<path d="M-46 -190Q0 -214 46 -190Z" fill="#2a4a2a"/>${R(-30,-170,60,70,'#f4c430')}${R(-30,-94,60,70,'#f4ecd8')}<path d="M-14 -110L0 -150L14 -110Z" fill="#c8302a"/>${C(0,-60,14,'#e8413a')}`;
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500;
let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="330" r="8" fill="#1a1030" stroke="#f4c430" stroke-width="2"/>`;
const bogen='M410 470V250Q410 172 500 172Q590 172 590 250V470Z';
const birnen=[...Array(9)].map((_,k)=>{const a=Math.PI*k/8;return C(500-106*Math.cos(a),246-90*Math.sin(a),5,BC[k%5]).replace('<circle','<circle class="blink" style="animation-delay:-'+(k*.21).toFixed(2)+'s"');}).join('');
return`<defs><clipPath id="tuerclip"><path d="${bogen}"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#1f3a8a"/><stop offset=".5" stop-color="#3a6ad8"/><stop offset="1" stop-color="#1a2a6a"/></linearGradient></defs>
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Tür mit Zahlenschloss">
   <path d="M380 470V244Q380 140 500 140Q620 140 620 244V470Z" fill="#c8302a" stroke="#6a1010" stroke-width="5"/>${birnen}
   <path d="${bogen}" fill="#120a04"/>
   <g clip-path="url(#tuerclip)"><g id="platte"><path d="${bogen}" fill="url(#platteG)"/><path d="M455 172V470M545 172V470" stroke="#f4c430" stroke-width="4"/><path d="M410 400H590" stroke="#f4c430" stroke-width="6"/><use href="#sym-stern" x="468" y="236" width="64" height="64" color="#f4c430"/><rect x="${500-n*11-12}" y="312" width="${n*22+24}" height="36" rx="6" fill="#1a1030" stroke="#f4c430" stroke-width="2"/>${d}</g></g>
   <path d="M486 140L500 118L514 140" fill="#f4c430" stroke="#8a6420" stroke-width="2"/>
  </g></g>`;
}
const staub=(x0,x1,y0,y1,n)=>[...Array(n)].map((_,k)=>`<circle class="treibt" cx="${x0+k*137%(x1-x0)}" cy="${y0+k*71%(y1-y0)}" r="${2+k%3}" fill="#fff6c8" style="animation-duration:${7+k%5*2}s;animation-delay:-${k*1.1}s"/>`).join('');
const schwenkLicht=(x,f)=>`<g class="schwenk" style="animation-delay:-${x%5}s"><path d="M${x-14} 30H${x+14}L${x+140} 560H${x-140}Z" fill="${f}" opacity=".13"/></g>`;
const funkeln=pts=>pts.map(([x,y],k)=>`<g class="glitz" style="animation-delay:-${(k*.7).toFixed(1)}s"><path transform="translate(${x} ${y})" d="M0 -12L3 -3L12 0L3 3L0 12L-3 3L-12 0L-3 -3Z" fill="#fff6b0"/></g>`).join('');
const gluehwuermchen=n=>[...Array(n)].map((_,k)=>`<circle class="blink" cx="${120+k*173%1400}" cy="${300+k*97%330}" r="4" fill="#d8ff6a" style="animation-delay:-${(k*.37).toFixed(2)}s;animation-duration:${(.9+k%4*.4).toFixed(1)}s"/>`).join('');
const pendelLampe=x=>`<g class="pendel"><path d="M${x} 0V110" stroke="#222" stroke-width="3"/><path d="M${x-30} 150Q${x} 100 ${x+30} 150Z" fill="#e8b830" stroke="#222" stroke-width="2"/><circle cx="${x}" cy="150" r="70" fill="url(#licht)"/></g>`;
const haengeBallons=l=>l.map(([x,y,c],k)=>`<g class="schwenk" style="animation-delay:-${k*1.3}s;animation-duration:${4+k%3}s"><path d="M${x} 0V${y-30}" stroke="#777" stroke-width="2"/><ellipse cx="${x}" cy="${y}" rx="24" ry="30" fill="${c}"/><path d="M${x-5} ${y+29}H${x+5}L${x} ${y+37}Z" fill="${c}"/><ellipse cx="${x-9}" cy="${y-10}" rx="5" ry="9" fill="#fff" opacity=".4"/></g>`).join('');
const seile=l=>l.map(([x,h])=>`<g class="schwenk"><path d="M${x} 0V${h}" stroke="#3a2a1a" stroke-width="6"/><circle cx="${x}" cy="${h+8}" r="9" fill="none" stroke="#3a2a1a" stroke-width="4"/></g>`).join('');
SZENARIEN.zirkus={
ambiente:n=>[
schwenkLicht(520,'#7ad0ff')+schwenkLicht(1080,'#ff9ac8')+staub(300,1300,120,420,10),
funkeln([[300,210],[720,150],[1120,250],[1420,170],[880,330]])+staub(100,1500,150,450,8),
schwenkLicht(800,'#fff3b0')+staub(200,1400,100,440,14),
pendelLampe(560)+staub(300,1300,150,420,8),
gluehwuermchen(14)
][n],
vordergrund:n=>[
kette(0,1800,-6,14,22,1)+kette(60,1860,14,14,22,1),
kette(0,1800,0,14,26,0),
seile([[380,230],[1500,190],[1000,120]]),
kette(0,1800,-6,14,22,1)+kette(0,1800,20,12,26,0),
haengeBallons([[200,120,'#e8413a'],[250,150,'#f4c430'],[900,110,'#3aa0e8'],[1500,130,'#e86ab8'],[1560,100,'#5ac85a']])
][n],
name:"Zirkus",
symbole:["nase","ball","stern","zylinder","popcorn"],
symbolNamen:["Clownsnase","Jonglierball","Stern","Zylinderhut","Popcorn"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M10 80L60 14L110 80Z" fill="#f4ecd8" stroke="#6a1010" stroke-width="3"/><path d="M30 80L60 14L45 80ZM75 80L60 14L90 80Z" fill="#c8302a"/><path d="M60 14V4" stroke="#333" stroke-width="2"/><path d="M60 4L74 8L60 12Z" fill="#3aa0e8"/><path d="M50 80V60Q60 50 70 60V80Z" fill="#1a1030"/><use href="#sym-stern" x="4" y="4" width="24" height="24" color="#f4c430"/><use href="#sym-stern" x="92" y="8" width="20" height="20" color="#f4c430"/></svg>`,
texte:{
einleitung:"Ihr seid zu Gast im Zirkus Sternschnuppe. Nach der Probe wollt ihr euch die Manege ansehen – da fällt die Tür hinter euch ins Schloss! Die Zirkusdirektorin hat ein Rätselspiel für euch vorbereitet: Jede Tür hat ein Zahlenschloss. Untersucht die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zum Ausgang, bevor die Vorstellung beginnt?",
startKnopf:"Die Manege betreten",
hinweisGeber:"Clownin Lulu flüstert:",
richtig:"Bravo! Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Clownin Lulu schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss des Zirkus",
schlossSymbol:"Über jedem Rad ist ein Zirkus-Zeichen. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Vorstellung beginnt!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Manege frei für euch! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Zirkus gefunden. Das ganze Zirkusteam klatscht Beifall!"
},
texteDu:{
einleitung:"Du bist zu Gast im Zirkus Sternschnuppe. Nach der Probe willst du dir die Manege ansehen – da fällt die Tür hinter dir ins Schloss! Die Zirkusdirektorin hat ein Rätselspiel für dich vorbereitet: Jede Tür hat ein Zahlenschloss. Untersuche die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zum Ausgang, bevor die Vorstellung beginnt?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Clownin Lulu schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zirkus-Zeichen. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Manege frei für dich! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Zirkus gefunden. Das ganze Zirkusteam klatscht Beifall!"
},
einfach:{
name:"Der Zirkus",
symbolNamen:["Clownsnase","Ball","Stern","Hut","Popcorn"],
texte:{
einleitung:"Ihr seid in einem Zirkus. Ihr wollt euch das große Zelt ansehen. Plötzlich geht die Tür hinter euch zu! An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
texteDu:{
einleitung:"Du bist in einem Zirkus. Du willst dir das große Zelt ansehen. Plötzlich geht die Tür hinter dir zu! An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Die Manege",intro:"Ihr steht in der Mitte vom großen Zelt. Hier ist die Show. Bunte Lampen leuchten. Hier sind die Zahlen für das erste Schloss versteckt.",introDu:"Du stehst in der Mitte vom großen Zelt. Hier ist die Show. Bunte Lampen leuchten. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[{name:"Rotes Podest",fund:"Unter dem Podest liegt:"},{name:"Rad mit Sattel",fund:"Am Sattel klebt:"},{name:"Trommel",fund:"In der Trommel liegt:"},{name:"Kleines Auto",fund:"Im Auto liegt:"},{name:"Schaukel oben",fund:"An der Schaukel hängt:"}],
infoObjekte:[{name:"Bild vom Zirkus",fund:"Hinter dem Bild klebt:"},{name:"Ständer mit Ringen",fund:"An einem Ring hängt:"},{name:"Kiste mit Bällen",fund:"Zwischen den Bällen liegt:"}]},
{titel:"Die Garderobe",intro:"Hier ziehen sich die Leute vom Zirkus um. Hier hängen bunte Kleider. Findet die Zahlen für das nächste Schloss!",introDu:"Hier ziehen sich die Leute vom Zirkus um. Hier hängen bunte Kleider. Finde die Zahlen für das nächste Schloss!",
objekte:[{name:"Tisch mit Spiegel",fund:"Am Spiegel klebt:"},{name:"Stange mit Kleidern",fund:"In einer Tasche steckt:"},{name:"Schachteln für Hüte",fund:"In einer Schachtel liegt:"},{name:"Große Schuhe",fund:"In einem Schuh steckt:"},{name:"Kleid mit Sternen",fund:"Am Kleid hängt:"}],
infoObjekte:[{name:"Foto von der Clownin",fund:"Hinter dem Foto klebt:"},{name:"Maschine zum Nähen",fund:"Unter der Maschine liegt:"},{name:"Wand zum Umziehen",fund:"Hinter der Wand liegt:"}]},
{titel:"Das Lager",intro:"Hier stehen viele Sachen für die Show. Es ist ein bisschen dunkel. Sucht die Zahlen!",introDu:"Hier stehen viele Sachen für die Show. Es ist ein bisschen dunkel. Suche die Zahlen!",
objekte:[{name:"Große Kiste",fund:"In der Kiste liegt:"},{name:"Lange Stelzen",fund:"An den Stelzen klebt:"},{name:"Kasten zum Zaubern",fund:"Im Kasten liegt:"},{name:"Rolle mit Seil",fund:"Im Seil steckt:"},{name:"Lampe an der Wand",fund:"An der Lampe klebt:"}],
infoObjekte:[{name:"Liste an der Wand",fund:"Unter der Liste steckt:"},{name:"Fass mit Keulen",fund:"Im Fass liegt:"},{name:"Eimer mit Farbe",fund:"Unter dem Eimer liegt:"}]},
{titel:"Der Wohnwagen",intro:"In diesem Wagen wohnen Leute vom Zirkus. Es ist klein und gemütlich. Löst die Aufgaben!",introDu:"In diesem Wagen wohnen Leute vom Zirkus. Es ist klein und gemütlich. Löse die Aufgaben!",
objekte:[{name:"Bett",fund:"Unter dem Kissen liegt:"},{name:"Herd mit Kanne",fund:"Unter der Kanne liegt:"},{name:"Kleiner Tisch",fund:"Unter einer Tasse liegt:"},{name:"Koffer",fund:"Im Koffer liegt:"},{name:"Brett mit Pokalen",fund:"In einem Pokal liegt:"}],
infoObjekte:[{name:"Karte an der Wand",fund:"Hinter der Karte klebt:"},{name:"Gitarre",fund:"In der Gitarre liegt:"},{name:"Kaktus",fund:"Im Topf steckt:"}]},
{titel:"Der Platz vor dem Zelt",intro:"Ihr seid draußen. Es ist schon Abend. Viele kleine Lampen leuchten. Öffnet das letzte Tor!",introDu:"Du bist draußen. Es ist schon Abend. Viele kleine Lampen leuchten. Öffne das letzte Tor!",
objekte:[{name:"Kasse",fund:"In der Kasse liegt:"},{name:"Wagen mit Popcorn",fund:"Im Popcorn liegt:"},{name:"Luftballons",fund:"An einem Ballon hängt:"},{name:"Bank",fund:"Unter der Bank liegt:"},{name:"Schild vom Zirkus",fund:"Am Schild hängt:"}],
infoObjekte:[{name:"Tafel mit dem Programm",fund:"Unter der Tafel klebt:"},{name:"Stand mit Zuckerwatte",fund:"Am Stand liegt:"},{name:"Runde Säule mit Plakaten",fund:"An der Säule klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Manege",
intro:"Ihr steht mitten in der Manege des großen Zirkuszelts. Scheinwerfer leuchten auf den runden Platz. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
introDu:"Du stehst mitten in der Manege des großen Zirkuszelts. Scheinwerfer leuchten auf den runden Platz. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
tuerX:800,
hintergrund:()=>`${defs('#d89a5a','#7a4a22')}<rect width="1600" height="470" fill="#f4e4c8"/>${streifen('#c8302a',50,0,470)}<rect width="1600" height="470" fill="url(#oben)"/>${R(0,400,1600,70,'#6a1010')}${R(0,400,1600,8,'#f4c430')}<path d="M330 0V470M1270 0V470" stroke="#8a6420" stroke-width="16"/><path d="M640 400V110Q700 300 680 400ZM960 400V110Q900 300 920 400Z" fill="#8a1a1a"/>${kette(0,800,40,40,8,1)}${kette(800,1600,40,40,8,1)}${boden(0)}<ellipse cx="800" cy="650" rx="700" ry="130" fill="#e8b878" opacity=".5"/><ellipse cx="800" cy="650" rx="700" ry="130" fill="none" stroke="#c8302a" stroke-width="22"/><ellipse cx="800" cy="650" rx="700" ry="130" fill="none" stroke="#fff" stroke-width="22" stroke-dasharray="44 44"/>${spot(450,'#fff3b0')}${spot(1150,'#b8e0ff')}`,
objekte:[
{name:"Manegen-Podest",x:480,boden:600,fuss:4,by:-110,zeichne:podest,fund:"Unter dem Podest liegt:"},
{name:"Einrad",x:1120,boden:600,fuss:4,by:-150,zeichne:einrad,fund:"Unter dem Sattel klebt:"},
{name:"Große Trommel",x:1380,boden:700,fuss:4,by:-160,zeichne:trommel,fund:"In der Trommel klappert etwas:"},
{name:"Clownsauto",x:250,boden:700,fuss:4,by:-145,zeichne:clownsauto,fund:"Auf dem Fahrersitz liegt:"},
{name:"Trapez",x:1100,y:200,wand:true,by:10,zeichne:trapez,fund:"Um die Stange ist ein Zettel gewickelt:"}
],
infoObjekte:[{name:"Zirkusplakat",x:450,y:240,wand:true,by:-100,zeichne:plakat,fund:"Hinter dem Plakat klebt:"},{name:"Reifenständer",x:1530,boden:560,fuss:4,by:-175,zeichne:reifen,fund:"An einem Reifen hängt:"},{name:"Kiste mit Jonglierbällen",x:700,boden:740,fuss:4,by:-95,zeichne:ballkiste,fund:"Zwischen den Bällen liegt:"}]},
{titel:"Die Garderobe",
intro:"Im Kostümwagen machen sich die Artistinnen und Artisten für die Vorstellung fertig. Glitzerkostüme hängen bereit, am Spiegel leuchten kleine Lampen. Findet die Ziffern für das nächste Schloss!",
introDu:"Im Kostümwagen machen sich die Artistinnen und Artisten für die Vorstellung fertig. Glitzerkostüme hängen bereit, am Spiegel leuchten kleine Lampen. Finde die Ziffern für das nächste Schloss!",
tuerX:1350,
licht:{ton:'#ff6ab8',a:.07},
hintergrund:()=>`${defs('#7a4a5a','#3a1a2a','#ffd8f0')}<defs><pattern id="punkte" width="60" height="60" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="6" fill="#e8a8c8"/><circle cx="45" cy="45" r="6" fill="#e8a8c8"/></pattern></defs><rect width="1600" height="470" fill="#c87aa8"/><rect width="1600" height="380" fill="url(#punkte)"/>${R(0,380,1600,90,'#7a3a6a')}${linien('rgba(0,0,0,.25)',100,388,470)}${R(0,372,1600,10,'#f4c430')}<rect width="1600" height="40" fill="#4a1a3a"/>${kette(0,1600,50,24,16)}${boden(1)}${lampe(700,110,'#e86ab8')}<rect width="1600" height="470" fill="url(#oben)" opacity=".5"/>`,
objekte:[
{name:"Schminktisch mit Spiegel",x:300,boden:570,fuss:4,by:-200,zeichne:schminktisch,fund:"Am Spiegel klebt:"},
{name:"Kleiderständer",x:620,boden:640,fuss:4,by:-220,zeichne:staender,fund:"In einer Kostümtasche steckt:"},
{name:"Hutschachteln",x:950,boden:720,fuss:4,by:-120,zeichne:hutschachteln,fund:"In der obersten Schachtel liegt:"},
{name:"Clownsschuhe",x:1150,boden:600,fuss:4,by:-60,zeichne:schuhe,fund:"In einem Schuh steckt:"},
{name:"Glitzerkostüm",x:900,y:240,wand:true,by:-90,zeichne:kostuem,fund:"Am Kostüm hängt ein Zettel:"}
],
infoObjekte:[{name:"Foto der Clownin",x:520,y:230,wand:true,by:-80,zeichne:foto,fund:"Hinter dem Foto klebt:"},{name:"Nähmaschine",x:1500,boden:730,fuss:4,by:-130,zeichne:naehmaschine,fund:"Unter der Nähmaschine liegt:"},{name:"Paravent",x:110,boden:720,fuss:4,by:-200,zeichne:paravent,fund:"Hinter dem Paravent liegt:"}]},
{titel:"Das Requisitenlager",
intro:"Im Requisitenlager wird alles aufbewahrt, was in der Vorstellung gebraucht wird: Kisten, Seile, Stelzen und Zauberkästen. Nur ein paar Lampen geben Licht. Sucht die Ziffern!",
introDu:"Im Requisitenlager wird alles aufbewahrt, was in der Vorstellung gebraucht wird: Kisten, Seile, Stelzen und Zauberkästen. Nur ein paar Lampen geben Licht. Suche die Ziffern!",
tuerX:250,
licht:{spot:true,dunkel:.6,farbe:'#05050f'},
hintergrund:()=>`${defs('#6a7078','#262a30','#fff0c0')}<rect width="1600" height="470" fill="#4a5a6a"/>${linien('rgba(0,0,0,.25)',24,40,470)}<rect width="1600" height="40" fill="#2a323a"/>${R(860,140,700,8,'#8a969e')}${R(860,290,700,8,'#8a969e')}<path d="M870 140V470M1550 140V470" stroke="#8a969e" stroke-width="8"/>${[880,980,1090,1200,1330,1440].map((x,k)=>R(x,(k%2?70:90),90,(k%2?70:50),k%3?'#a0784a':'#b89c70','#6b5a3a',2)+R(x+10,226-(k%2)*20,80,64+(k%2)*20,BC[k%5])).join('')}${boden(1)}${lampe(600,120,'#888')}${lampe(1300,100,'#888')}<rect width="1600" height="470" fill="url(#oben)"/>`,
objekte:[
{name:"Große Holzkiste",x:600,boden:600,fuss:4,by:-150,zeichne:holzkiste,fund:"In der Holzkiste liegt:"},
{name:"Stelzen",x:880,boden:560,fuss:4,by:-245,zeichne:stelzen,fund:"An einer Stelze klebt:"},
{name:"Zauberkasten",x:1150,boden:690,fuss:4,by:-185,zeichne:zauberkasten,fund:"Im doppelten Boden liegt:"},
{name:"Seilrolle",x:1420,boden:600,fuss:4,by:-115,zeichne:seilrolle,fund:"Im Seil steckt:"},
{name:"Scheinwerfer",x:1250,y:230,wand:true,by:-70,zeichne:scheinwerfer,fund:"Am Scheinwerfer klebt:"}
],
infoObjekte:[{name:"Lagerliste",x:650,y:240,wand:true,by:-90,zeichne:lagerplan,fund:"Unter der Lagerliste steckt:"},{name:"Fass mit Jonglierkeulen",x:380,boden:730,fuss:4,by:-155,zeichne:keulenfass,fund:"Zwischen den Keulen liegt:"},{name:"Farbeimer",x:1520,boden:740,fuss:4,by:-135,zeichne:farbeimer,fund:"Unter einem Farbeimer liegt:"}]},
{titel:"Der Wohnwagen",
intro:"Im Wohnwagen wohnen Artistinnen und Artisten, wenn der Zirkus von Stadt zu Stadt reist. Es ist eng, aber gemütlich. Auf dem Herd steht noch der Teekessel. Löst die Aufgaben!",
introDu:"Im Wohnwagen wohnen Artistinnen und Artisten, wenn der Zirkus von Stadt zu Stadt reist. Es ist eng, aber gemütlich. Auf dem Herd steht noch der Teekessel. Löse die Aufgaben!",
tuerX:1000,
licht:{ton:'#ff9a30',a:.1},
hintergrund:()=>`${defs('#8a5a32','#3f2614','#ffe0a0')}<rect width="1600" height="470" fill="#c89a6a"/>${linien('rgba(90,50,20,.35)',40,40,470)}<path d="M0 0H1600V60Q800 10 0 60Z" fill="#7a4a24"/>${R(0,330,1600,140,'#3f7a4a')}${linien('rgba(0,0,0,.2)',80,330,470)}${R(0,322,1600,10,'#2a4a2a')}${C(250,170,60,'#7cb8e8','#6b4a24',10)}${C(270,150,14,'#fff6c8')}<path d="M180 108Q250 150 320 108V96H180Z" fill="#e8413a"/>${boden(1)}<ellipse cx="760" cy="640" rx="300" ry="70" fill="#c8302a" opacity=".6"/><ellipse cx="760" cy="640" rx="260" ry="54" fill="none" stroke="#f4c430" stroke-width="6" opacity=".7"/>${lampe(780,90,'#f4c430')}`,
objekte:[
{name:"Etagenbett",x:250,boden:570,fuss:4,by:-215,zeichne:bett,fund:"Unter dem Kopfkissen liegt:"},
{name:"Herd mit Teekessel",x:560,boden:620,fuss:4,by:-165,zeichne:herd,fund:"Unter dem Teekessel liegt:"},
{name:"Klapptisch",x:820,boden:720,fuss:4,by:-110,zeichne:klapptisch,fund:"Unter einer Tasse liegt:"},
{name:"Reisekoffer",x:1250,boden:600,fuss:4,by:-125,zeichne:koffer,fund:"Im Reisekoffer liegt:"},
{name:"Regal mit Pokalen",x:600,y:220,wand:true,by:-60,zeichne:pokale,fund:"Im größten Pokal liegt:"}
],
infoObjekte:[{name:"Landkarte der Zirkusreise",x:1350,y:230,wand:true,by:-80,zeichne:tourkarte,fund:"Hinter der Landkarte klebt:"},{name:"Gitarre",x:1500,boden:700,fuss:4,by:-215,zeichne:gitarre,fund:"In der Gitarre liegt:"},{name:"Kaktus",x:1080,boden:745,fuss:4,by:-145,zeichne:kaktus,fund:"Im Blumentopf steckt:"}]},
{titel:"Der Vorplatz",
intro:"Ihr seid draußen auf dem Vorplatz vor dem Zirkuszelt. Es ist schon Abend, bunte Lichterketten leuchten. Gleich kommen die Gäste! Hier liegt das letzte Geheimnis – öffnet das Tor nach draußen!",
introDu:"Du bist draußen auf dem Vorplatz vor dem Zirkuszelt. Es ist schon Abend, bunte Lichterketten leuchten. Gleich kommen die Gäste! Hier liegt das letzte Geheimnis – öffne das Tor nach draußen!",
tuerX:450,
licht:{ton:'#2a3a9a',a:.17},
hintergrund:()=>`${defs('#8a7a5a','#3a3020')}<defs><linearGradient id="abend" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1f4a"/><stop offset=".7" stop-color="#7a3a6a"/><stop offset="1" stop-color="#e8885a"/></linearGradient></defs><rect width="1600" height="470" fill="url(#abend)"/>${[[120,60],[300,110],[620,50],[880,90],[1500,60],[1380,130]].map(([x,y])=>`<use href="#sym-stern" x="${x}" y="${y}" width="14" height="14" color="#fff3b0"/>`).join('')}${C(760,90,26,'#fff6c8')}<path d="M820 470L1000 140H1440L1600 470Z" fill="#f4ecd8"/>${[0,1,2,3,4].map(k=>`<path d="M${860+k*150} 470L${1020+k*90} 140H${1060+k*90}L${930+k*150} 470Z" fill="#c8302a"/>`).join('')}<path d="M1000 140L1220 60L1440 140Z" fill="#c8302a"/><path d="M1220 60V20" stroke="#333" stroke-width="4"/><path d="M1220 20L1250 30L1220 40Z" fill="#f4c430"/><path d="M1160 470V380Q1220 330 1280 380V470Z" fill="#2a1a10"/>${kette(0,800,180,40,10)}${kette(800,1220,180,-60,7)}${kette(1220,1600,100,50,7)}<path d="M0 410H330M570 410H1600M0 440H330M570 440H1600" stroke="#8a5a2a" stroke-width="8"/>${[20,100,180,260,600,680,760].map(x=>R(x,390,12,80,'#6b4a24')).join('')}${boden(0)}<path d="M330 780L380 470H520L570 780Z" fill="#b8a07a" opacity=".6"/>`,
objekte:[
{name:"Kassenhäuschen",x:820,boden:560,fuss:4,by:-255,zeichne:kasse,fund:"Neben den Eintrittskarten liegt:"},
{name:"Popcornwagen",x:1100,boden:680,fuss:4,by:-195,zeichne:popcornwagen,fund:"Zwischen dem Popcorn liegt:"},
{name:"Luftballons",x:200,boden:600,fuss:4,by:-290,zeichne:ballons,fund:"An einem Ballon hängt:"},
{name:"Parkbank",x:580,boden:735,fuss:4,by:-115,zeichne:parkbank,fund:"Unter der Parkbank liegt:"},
{name:"Zirkusschild",x:1150,y:190,wand:true,by:-60,zeichne:zirkusschild,fund:"Am Schild hängt ein Zettel:"}
],
infoObjekte:[{name:"Programmtafel",x:1460,y:240,wand:true,by:-100,zeichne:programm,fund:"Unter der Programmtafel klebt:"},{name:"Zuckerwattestand",x:1380,boden:600,fuss:4,by:-185,zeichne:zuckerwatte,fund:"Am Zuckerwattestand liegt:"},{name:"Litfaßsäule",x:1520,boden:720,fuss:4,by:-225,zeichne:litfass,fund:"An der Litfaßsäule klebt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0e8"/><stop offset=".8" stop-color="#ffe8c8"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/>${C(780,150,55,'#fff6c8')}
   <path d="M0 430Q250 380 500 410T1000 400V600H0Z" fill="#8cc06a"/><path d="M0 480Q300 450 600 490T1000 470V600H0Z" fill="#6aa04a"/>
   <path d="M600 420L680 300H840L920 420Z" fill="#f4ecd8"/><path d="M630 420L700 300H730L670 420ZM760 420L760 300H790L810 420ZM850 420L820 300H850L900 420Z" fill="#c8302a"/><path d="M680 300L760 250L840 300Z" fill="#c8302a"/><path d="M760 250V226" stroke="#333" stroke-width="3"/><path d="M760 226L780 232L760 238Z" fill="#f4c430"/>
   ${[[200,220,'#e8413a'],[260,180,'#3aa0e8'],[330,240,'#f4c430'],[150,280,'#5ac85a']].map(([x,y,c])=>`<path d="M${x} ${y+28}Q${x-10} ${y+60} ${x+4} ${y+90}" stroke="#666" stroke-width="1.5" fill="none"/><ellipse cx="${x}" cy="${y}" rx="22" ry="28" fill="${c}"/>`).join('')}
   <path d="M420 600Q470 500 520 470Q560 500 600 600Z" fill="#d8c8a0"/>
   <path d="M0 0H1000V600H0Z M180 600V230Q180 70 500 70Q820 70 820 230V600Z" fill="#6a1010" fill-rule="evenodd"/><path d="M180 600V230Q180 70 500 70Q820 70 820 230V600" stroke="#f4c430" stroke-width="18" fill="none"/>`
};
})();