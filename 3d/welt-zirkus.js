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
const seilrolle=()=>`${schatten(56,4)}${C(0,-50,48,'#8a5a2a','#4a2a14',4)}${C(0,-50,34,'#d8c08a')}${[0,1,2,3].map(k=>`<path d="M-32 ${-72+k*14}Q0 ${-66+k*14} 32 ${-72+k*14}" stroke="#a88a5a" stroke-width="2" fill="none"/>`).join('')}${C(0,-50,8,'#4a2a14')}<path d="M34 -40Q60 -10 50 0" stroke="#d8c08a" stroke-width="5" fill="none"/>`;
const scheinwerfer=()=>`<path d="M-60 -40H-20V0" stroke="#555" stroke-width="6" fill="none"/><path d="M38 0L130 70L150 10Z" fill="#fff3b0" opacity=".3"/><g transform="rotate(20)"><path d="M-30 -20H24L40 -34V34L24 20H-30Z" fill="#444" stroke="#222" stroke-width="3"/><ellipse cx="40" rx="8" ry="34" fill="#fff3b0"/></g>`;
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
const programm=()=>`${R(-70,-80,140,160,'#2a3a2a','#8a5a2a',6)}${[0,1,2,3].map(k=>`${C(-46,-52+k*36,8,BC[k])}<path d="M-28 ${-52+k*36}H${46-k%2*18}" stroke="#f4ecd8" stroke-width="3"/>`).join('')}`;
const zuckerwatte=()=>`${schatten(50,4)}${R(-46,-80,92,76,'#e86ab8','#8a2a5a',3)}<path d="M-46 -60H46" stroke="#fff" stroke-width="4"/><ellipse cy="-84" rx="40" ry="10" fill="#c9ccce" stroke="#888" stroke-width="2"/><path d="M-6 -84L-10 -140M16 -84L24 -134" stroke="#f4ecd8" stroke-width="3"/>${C(-10,-152,18,'#ffb8d8')}${C(24,-146,16,'#b8e0ff')}`;
const litfass=()=>`${schatten(44,4)}${R(-36,-190,72,180,'#3f6a3a')}${R(-40,-16,80,16,'#2a4a2a')}<path d="M-46 -190Q0 -214 46 -190Z" fill="#2a4a2a"/>${R(-30,-170,60,70,'#f4c430')}${R(-30,-94,60,70,'#f4ecd8')}<path d="M-14 -110L0 -150L14 -110Z" fill="#c8302a"/>${C(0,-60,14,'#e8413a')}`;
const heuballen=()=>`${schatten(60,4)}${R(-54,-52,108,50,'#e8c45a','#a07818',3)}${R(-44,-98,88,46,'#f0d070','#a07818',3)}<path d="M-54 -34H54M-44 -78H44M-20 -52V-2M20 -52V-2" stroke="#a07818" stroke-width="3"/><path d="M-50 -52L-60 -66M30 -98L40 -112M-10 -98L-16 -112" stroke="#e8c45a" stroke-width="4" stroke-linecap="round"/>`;
const futtereimer=()=>`${schatten(40,4)}<path d="M-34 -50L-26 -2H26L34 -50Z" fill="#3aa0e8" stroke="#1a4a8a" stroke-width="3"/><path d="M-34 -50Q0 -66 34 -50" stroke="#1a4a8a" stroke-width="3" fill="none"/><ellipse cx="0" cy="-50" rx="34" ry="8" fill="#e8a838"/>${[[-14,-54],[4,-56],[16,-52]].map(([x,y])=>C(x,y,6,'#f4c430')).join('')}<path d="M-34 -48Q0 -96 34 -48" stroke="#555" stroke-width="3" fill="none"/>`;
const pony=()=>`${schatten(70,4)}<path d="M-46 -6V-60M-24 -6V-56M30 -6V-60M52 -6V-56" stroke="#8a5a2a" stroke-width="10" stroke-linecap="round"/><path d="M-54 -64Q-60 -108 -10 -112Q40 -114 58 -96Q66 -88 62 -64Q40 -50 0 -52Q-36 -50 -54 -64Z" fill="#c8864a" stroke="#6b3a14" stroke-width="3"/><path d="M50 -96L58 -134Q86 -130 84 -106Q84 -96 66 -88Z" fill="#c8864a" stroke="#6b3a14" stroke-width="3"/>${C(74,-116,3,'#222')}<path d="M54 -130L48 -150L66 -136Z" fill="#8a5a2a"/><path d="M-54 -80Q-76 -70 -70 -44" stroke="#3a2210" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M36 -112Q20 -124 6 -110" stroke="#3a2210" stroke-width="7" fill="none" stroke-linecap="round"/>`;
const ziege=()=>`${schatten(56,4)}<path d="M-30 -6V-44M-10 -6V-42M20 -6V-44M38 -6V-42" stroke="#9a9a9a" stroke-width="8" stroke-linecap="round"/><path d="M-40 -48Q-44 -84 0 -86Q40 -86 48 -62Q44 -46 0 -44Q-26 -44 -40 -48Z" fill="#f4f0e8" stroke="#8a8a8a" stroke-width="3"/><path d="M40 -76L50 -104Q72 -102 70 -80Q66 -66 48 -66Z" fill="#f4f0e8" stroke="#8a8a8a" stroke-width="3"/><path d="M48 -104L44 -124M58 -104L66 -122" stroke="#8a8a8a" stroke-width="4" stroke-linecap="round"/>${C(62,-90,3,'#222')}<path d="M62 -68L60 -54" stroke="#8a8a8a" stroke-width="4"/>`;
const tiertafel=()=>`${R(-70,-50,140,100,'#f4ecd8','#6b4a24',5)}<path d="M-70 -50L-84 -66M70 -50L84 -66" stroke="#6b4a24" stroke-width="4"/><path d="M-44 -20Q-44 -34 -30 -34Q-16 -34 -16 -20Q-16 -8 -30 -8Q-44 -8 -44 -20Z" fill="#c8864a"/><path d="M0 -26H50M0 -10H40M0 6H50" stroke="#6b4a24" stroke-width="4" stroke-linecap="round"/><path d="M-40 30H40" stroke="#c8302a" stroke-width="5" stroke-linecap="round"/>`;
const traenke=()=>`${schatten(66,4)}<path d="M-56 -4L-48 -46H48L56 -4Z" fill="#8a5a2a" stroke="#4a2a14" stroke-width="3"/><ellipse cx="0" cy="-46" rx="48" ry="9" fill="#4a90c8"/><path d="M-30 -46q10 -5 20 0t20 0" stroke="#bfe8ff" stroke-width="2" fill="none"/><path d="M-48 -30H48" stroke="#4a2a14" stroke-width="3"/>`;
const balancierstange=()=>`${schatten(70,4)}<path d="M-70 -86H70" stroke="#c8302a" stroke-width="7" stroke-linecap="round"/>${C(-70,-86,12,'#3a3a44')}${C(70,-86,12,'#3a3a44')}<path d="M0 -86V-4M-24 -4H24" stroke="#8a5a2a" stroke-width="8" stroke-linecap="round"/>${C(0,-86,6,'#f4c430')}`;
const kreidekasten=()=>`${schatten(46,4)}<path d="M-34 -4V-70M34 -4V-70" stroke="#6b4a24" stroke-width="7"/>${R(-44,-90,88,24,'#f4ecd8','#6b4a24',3)}<path d="M-34 -90L-24 -102H24L34 -90Z" fill="#e8e0c8" stroke="#6b4a24" stroke-width="3"/><path d="M-20 -80H20" stroke="#aaa" stroke-width="3"/>`;
const uebungstrapez=()=>`${schatten(60,4)}<path d="M-54 -4L-40 -190M54 -4L40 -190M-40 -190H40" stroke="#6b4a24" stroke-width="8" stroke-linecap="round"/><path d="M-30 -190V-104M30 -190V-104" stroke="#e8d9b8" stroke-width="4"/>${R(-38,-110,76,10,'#c8302a','#6a1010',2)}`;
const regeltafel=()=>`${R(-70,-60,140,120,'#2a3a6a','#f4c430',5)}${[[-36,-30],[0,-30],[36,-30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="#fff" stroke-width="4"/>`).join('')}<path d="M-50 12H50M-50 32H30" stroke="#fff" stroke-width="4" stroke-linecap="round"/><path d="M-26 -42L-46 -18M10 -42L-10 -18" stroke="#f4c430" stroke-width="3"/>`;
const schlossPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=C(x0+k*22,y,8,'#1a1030','#f4c430',2);return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#1a1030" stroke="#f4c430" stroke-width="2"/>`+d;};
const sternOben=y=>`<use href="#sym-stern" x="472" y="${y}" width="56" height="56" color="#f4c430"/>`;
const TDEF=`<defs><clipPath id="vhclip"><rect x="396" y="190" width="208" height="280"/></clipPath><clipPath id="spclip"><ellipse cx="500" cy="320" rx="98" ry="138"/></clipPath><linearGradient id="spG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eaf6ff"/><stop offset=".5" stop-color="#a8c4e0"/><stop offset="1" stop-color="#d8e8f8"/></linearGradient><radialGradient id="spH"><stop offset="0" stop-color="#8a4ad8"/><stop offset="1" stop-color="#1a0a3a"/></radialGradient><pattern id="rw" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><rect width="40" height="40" fill="#f4ecd8"/><rect width="20" height="40" fill="#c8302a"/></pattern><radialGradient id="tubG"><stop offset="0" stop-color="#cfe8ff"/><stop offset=".3" stop-color="#3a1a3a"/><stop offset="1" stop-color="#7a1a2a"/></radialGradient><linearGradient id="torG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1f4a"/><stop offset="1" stop-color="#ffb870"/></linearGradient><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#1f3a8a"/><stop offset=".5" stop-color="#3a6ad8"/><stop offset="1" stop-color="#1a2a6a"/></linearGradient></defs>`;
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out}.tuer.offen #vho{transform:translateY(-300px)}.tuer.offen #spi{transform:scaleX(.1)}.tuer.offen #gl{transform:scaleX(.12)}.tuer.offen #gr{transform:scaleX(.12)}.tuer.offen #kla{transform:scaleY(.1)}.tuer.offen #tl{transform:scaleX(.12)}.tuer.offen #tr{transform:scaleX(.12)}</style>`;
function tuerVorhang(n){
let f='';for(let x=410;x<604;x+=26)f+=`M${x} 190V470`;let sc='M378 194';for(let k=0;k<8;k++)sc+='q15.25 24 30.5 0';
return`${R(396,190,208,280,'#1a0e1e')}<circle cx="500" cy="360" r="110" fill="url(#licht)"/>
   <g clip-path="url(#vhclip)"><g id="vho" class="tb">${R(396,190,208,290,'#c8302a')}<path d="${f}" stroke="#8a1a1a" stroke-width="5"/><path d="M423 190V470M475 190V470M527 190V470M579 190V470" stroke="#e8605a" stroke-width="3" opacity=".6"/>${R(396,452,208,10,'#f4c430')}${[410,440,470,500,530,560,590].map(x=>C(x,468,4,'#f4c430')).join('')}</g></g>
   ${R(378,158,244,36,'#8a1a1a','#f4c430',3)}<path d="${sc}" fill="#8a1a1a" stroke="#f4c430" stroke-width="3"/>${sternOben(96)}${schlossPl(n,176)}`;
}
function tuerSpiegel(n){
let bl='';for(let k=0;k<16;k++){const a=k*Math.PI/8;bl+=C((500+Math.cos(a)*114).toFixed(0),(320+Math.sin(a)*150).toFixed(0),6,BC[k%5],'#6b4a1c',1);}
const sp=[[450,230],[540,260],[480,330],[560,380],[440,400],[520,200]].map(([x,y])=>`<use href="#sym-stern" x="${x}" y="${y}" width="12" height="12" color="#fff3b0"/>`).join('');
return`<ellipse cx="500" cy="320" rx="116" ry="152" fill="#c9962e" stroke="#6b4a1c" stroke-width="6"/>${bl}<ellipse cx="500" cy="320" rx="98" ry="138" fill="url(#spH)"/>${sp}
   <g clip-path="url(#spclip)"><g id="spi" class="tb" style="transform-origin:402px 320px"><ellipse cx="500" cy="320" rx="98" ry="138" fill="url(#spG)"/><path d="M430 200L470 160M420 260L520 170M420 330L560 190" stroke="#fff" stroke-width="12" opacity=".5"/>${sternOben(204)}${schlossPl(n,336)}</g></g>`;
}
function tuerGatter(n){
const cols=['#e8413a','#f4c430','#3aa0e8','#5ac85a'];let l='',r='';
for(let k=0;k<4;k++){l+=`<rect x="410" y="${236+k*58}" width="90" height="40" fill="${cols[k]}" stroke="#4a2a14" stroke-width="3"/>`;r+=`<rect x="500" y="${236+k*58}" width="90" height="40" fill="${cols[(k+2)%4]}" stroke="#4a2a14" stroke-width="3"/>`;}
return`${R(410,220,180,250,'#2a1a0a')}${R(410,440,180,30,'#e8c45a')}<circle cx="500" cy="380" r="90" fill="url(#licht)"/>
   <g id="gl" class="tb" style="transform-origin:410px 340px">${l}<path d="M410 436L500 240" stroke="#4a2a14" stroke-width="6"/></g><g id="gr" class="tb" style="transform-origin:590px 340px">${r}<path d="M590 436L500 240" stroke="#4a2a14" stroke-width="6"/></g>
   ${R(392,120,18,350,'#8a5a2a','#4a2a14',3)}${R(590,120,18,350,'#8a5a2a','#4a2a14',3)}${R(410,120,180,58,'#f4ecd8','#4a2a14',4)}${sternOben(60)}${schlossPl(n,150)}`;
}
function tuerRutsche(n){
let ri='';for(let k=1;k<4;k++)ri+=`<ellipse cx="500" cy="350" rx="${96-k*22}" ry="${104-k*24}" fill="none" stroke="#3a0a1a" stroke-width="3" opacity=".6"/>`;
return`<ellipse cx="500" cy="350" rx="114" ry="122" fill="#8a1a1a" stroke="#f4c430" stroke-width="6"/><ellipse cx="500" cy="350" rx="96" ry="104" fill="url(#tubG)"/>${ri}
   <g id="kla" class="tb" style="transform-origin:500px 246px"><ellipse cx="500" cy="350" rx="96" ry="104" fill="url(#rw)" stroke="#f4c430" stroke-width="4"/><ellipse cx="500" cy="350" rx="80" ry="88" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>${sternOben(268)}${schlossPl(n,392)}</g>`;
}
function tuerTor(n){
let b='';for(let k=0;k<9;k++){const a=Math.PI*k/8;b+=C((500-110*Math.cos(a)).toFixed(0),(200-96*Math.sin(a)).toFixed(0),5,BC[k%5]).replace('<circle','<circle class="blink" style="animation-delay:-'+(k*.21).toFixed(2)+'s"');}
return`<path d="M386 200Q500 90 614 200" stroke="#f4c430" stroke-width="10" fill="none"/>${b}${R(408,190,184,280,'url(#torG)')}${[[440,230],[540,250],[480,300]].map(([x,y])=>`<use href="#sym-stern" x="${x}" y="${y}" width="12" height="12" color="#fff3b0"/>`).join('')}
   <g id="tl" class="tb" style="transform-origin:408px 340px">${R(408,200,92,270,'url(#platteG)','#f4c430',3)}<path d="M454 200V470M408 400H500" stroke="#f4c430" stroke-width="4"/><use href="#sym-stern" x="436" y="250" width="40" height="40" color="#f4c430"/></g>
   <g id="tr" class="tb" style="transform-origin:592px 340px">${R(500,200,92,270,'url(#platteG)','#f4c430',3)}<path d="M546 200V470M500 400H592" stroke="#f4c430" stroke-width="4"/><use href="#sym-stern" x="524" y="250" width="40" height="40" color="#f4c430"/></g>
   ${R(386,170,22,300,'#c8302a','#6a1010',3)}${R(592,170,22,300,'#c8302a','#6a1010',3)}${schlossPl(n,150)}`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'vorhang';
const arten={vorhang:[tuerVorhang,'Manegenvorhang mit Zahlenschloss'],spiegel:[tuerSpiegel,'Zauberspiegel mit Zahlenschloss'],gatter:[tuerGatter,'Holzgatter mit Zahlenschloss'],rutsche:[tuerRutsche,'Rutsche mit Zahlenschloss'],tor:[tuerTor,'Zirkustor mit Zahlenschloss']};
const a=arten[art]||arten.vorhang;
return`${TDEF}${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
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
schwenkLicht(500,'#fff3b0')+staub(200,1400,100,440,14),
funkeln([[300,160],[700,120],[1200,180],[1450,140]])+schwenkLicht(450,'#fff3b0')+schwenkLicht(1150,'#b8e0ff')+staub(200,1400,100,420,10),
gluehwuermchen(14)
][n],
vordergrund:n=>[
kette(0,1800,-6,14,22,1)+kette(60,1860,14,14,22,1),
kette(0,1800,0,14,26,0),
kette(0,1800,-6,14,22,1),
seile([[380,230],[1500,190],[1000,120]]),
haengeBallons([[200,120,'#e8413a'],[250,150,'#f4c430'],[900,110,'#3aa0e8'],[1500,130,'#e86ab8'],[1560,100,'#5ac85a']])
][n],
name:"Zirkus",
symbole:["nase","ball","stern","zylinder","popcorn"],
symbolNamen:["Clownsnase","Jonglierball","Stern","Zylinderhut","Popcorn"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M10 80L60 14L110 80Z" fill="#f4ecd8" stroke="#6a1010" stroke-width="3"/><path d="M30 80L60 14L45 80ZM75 80L60 14L90 80Z" fill="#c8302a"/><path d="M60 14V4" stroke="#333" stroke-width="2"/><path d="M60 4L74 8L60 12Z" fill="#3aa0e8"/><path d="M50 80V60Q60 50 70 60V80Z" fill="#1a1030"/><use href="#sym-stern" x="4" y="4" width="24" height="24" color="#f4c430"/><use href="#sym-stern" x="92" y="8" width="20" height="20" color="#f4c430"/></svg>`,
texte:{
einleitung:"Ihr seid zu Gast im Zirkus Sternschnuppe. Nach der Probe wollt ihr euch die Manege ansehen – da fällt die Tür hinter euch ins Schloss! Die Zirkusdirektorin hat ein Rätselspiel für euch vorbereitet: Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zum Ausgang, bevor die Vorstellung beginnt?",
startKnopf:"Die Manege betreten",
hinweisGeber:"Clownin Lulu flüstert:",
richtig:"Bravo! Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Clownin Lulu schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss des Zirkus",
schlossSymbol:"Über jedem Rad ist ein Zirkus-Zeichen. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt versperrt. Überprüft eure Ziffern!",
zeitUmTitel:"Die Vorstellung beginnt!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Manege frei für euch! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Zirkus gefunden. Das ganze Zirkusteam klatscht Beifall!"
},
texteDu:{
einleitung:"Du bist zu Gast im Zirkus Sternschnuppe. Nach der Probe willst du dir die Manege ansehen – da fällt die Tür hinter dir ins Schloss! Die Zirkusdirektorin hat ein Rätselspiel für dich vorbereitet: Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zum Ausgang, bevor die Vorstellung beginnt?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Clownin Lulu schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zirkus-Zeichen. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt versperrt. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Manege frei für dich! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus dem Zirkus gefunden. Das ganze Zirkusteam klatscht Beifall!"
},
einfach:{
name:"Der Zirkus",
symbolNamen:["Clownsnase","Ball","Stern","Hut","Popcorn"],
texte:{
einleitung:"Ihr seid in einem Zirkus. Ihr wollt euch das große Zelt ansehen. Plötzlich geht die Tür hinter euch zu! An jedem Weg hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
texteDu:{
einleitung:"Du bist in einem Zirkus. Du willst dir das große Zelt ansehen. Plötzlich geht die Tür hinter dir zu! An jedem Weg hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Die Manege",intro:"Ihr steht in der Mitte vom großen Zelt. Hier ist die Show. Bunte Lampen leuchten. Der rote Vorhang hat ein Schloss. Hier sind die Zahlen dafür versteckt.",introDu:"Du stehst in der Mitte vom großen Zelt. Hier ist die Show. Bunte Lampen leuchten. Der rote Vorhang hat ein Schloss. Hier sind die Zahlen dafür versteckt.",
objekte:[{name:"Rotes Podest",fund:"Unter dem Podest liegt:"},{name:"Rad mit Sattel",fund:"Am Sattel klebt:"},{name:"Trommel",fund:"In der Trommel liegt:"},{name:"Kleines Auto",fund:"Im Auto liegt:"},{name:"Schaukel oben",fund:"An der Schaukel hängt:"}],
infoObjekte:[{name:"Bild vom Zirkus",fund:"Hinter dem Bild klebt:"},{name:"Ständer mit Ringen",fund:"An einem Ring hängt:"},{name:"Kiste mit Bällen",fund:"Zwischen den Bällen liegt:"}]},
{titel:"Die Garderobe",intro:"Hier ziehen sich die Leute vom Zirkus um. Hier hängen bunte Kleider. Der große Spiegel hat ein Schloss. Findet die Zahlen!",introDu:"Hier ziehen sich die Leute vom Zirkus um. Hier hängen bunte Kleider. Der große Spiegel hat ein Schloss. Finde die Zahlen!",
objekte:[{name:"Tisch mit Spiegel",fund:"Am Spiegel klebt:"},{name:"Stange mit Kleidern",fund:"In einer Tasche steckt:"},{name:"Schachteln für Hüte",fund:"In einer Schachtel liegt:"},{name:"Große Schuhe",fund:"In einem Schuh steckt:"},{name:"Kleid mit Sternen",fund:"Am Kleid hängt:"}],
infoObjekte:[{name:"Foto von der Clownin",fund:"Hinter dem Foto klebt:"},{name:"Maschine zum Nähen",fund:"Unter der Maschine liegt:"},{name:"Wand zum Umziehen",fund:"Hinter der Wand liegt:"}]},
{titel:"Das Tierzelt",intro:"Hier wohnen die Tiere vom Zirkus. Es gibt Ponys und Ziegen. Es riecht nach Heu. Das bunte Gatter hat ein Schloss. Findet die Zahlen!",introDu:"Hier wohnen die Tiere vom Zirkus. Es gibt Ponys und Ziegen. Es riecht nach Heu. Das bunte Gatter hat ein Schloss. Finde die Zahlen!",
objekte:[{name:"Heu-Ballen",fund:"Im Heu steckt:"},{name:"Eimer mit Futter",fund:"Unter dem Futter liegt:"},{name:"Pony Pünktchen",fund:"Am Halsband steckt:"},{name:"Ziege Gerda",fund:"Die Ziege hat im Maul:"},{name:"Tafel mit Tieren",fund:"Hinter der Tafel klebt:"}],
infoObjekte:[{name:"Plan fürs Futter",fund:"Auf dem Plan steht:"},{name:"Kiste mit Zaumzeug",fund:"In der Kiste liegt:"},{name:"Wasser für die Tiere",fund:"Am Rand klebt:"}]},
{titel:"Oben im Zelt",intro:"Ihr seid ganz oben im Zelt. Hier hängen Seile und Schaukeln. Unten ist die Manege ganz klein. Die Rutsche hat ein Schloss. Findet die Zahlen!",introDu:"Du bist ganz oben im Zelt. Hier hängen Seile und Schaukeln. Unten ist die Manege ganz klein. Die Rutsche hat ein Schloss. Finde die Zahlen!",
objekte:[{name:"Rolle mit Seil",fund:"Im Seil steckt:"},{name:"Stange zum Balancieren",fund:"An der Stange klebt:"},{name:"Lange Stelzen",fund:"An den Stelzen klebt:"},{name:"Kasten mit Kreide",fund:"Unter der Kreide liegt:"},{name:"Lampe an der Wand",fund:"An der Lampe klebt:"}],
infoObjekte:[{name:"Tafel mit Regeln",fund:"Auf der Tafel steht:"},{name:"Fass mit Keulen",fund:"Im Fass liegt:"},{name:"Schaukel zum Üben",fund:"An der Schaukel klebt:"}]},
{titel:"Der Platz vor dem Zelt",intro:"Ihr seid draußen. Es ist schon Abend. Viele kleine Lampen leuchten. Öffnet das letzte Tor!",introDu:"Du bist draußen. Es ist schon Abend. Viele kleine Lampen leuchten. Öffne das letzte Tor!",
objekte:[{name:"Kasse",fund:"In der Kasse liegt:"},{name:"Wagen mit Popcorn",fund:"Im Popcorn liegt:"},{name:"Luftballons",fund:"An einem Ballon hängt:"},{name:"Bank",fund:"Unter der Bank liegt:"},{name:"Schild vom Zirkus",fund:"Am Schild hängt:"}],
infoObjekte:[{name:"Tafel mit dem Programm",fund:"Unter der Tafel klebt:"},{name:"Stand mit Zuckerwatte",fund:"Am Stand liegt:"},{name:"Runde Säule mit Plakaten",fund:"An der Säule klebt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Die Manege",
intro:"Ihr steht mitten in der Manege des großen Zirkuszelts. Scheinwerfer leuchten auf den runden Platz. Der rotgoldene Vorhang am Ende der Manege bleibt zu. Irgendwo hier sind die Ziffern für sein Schloss versteckt …",
introDu:"Du stehst mitten in der Manege des großen Zirkuszelts. Scheinwerfer leuchten auf den runden Platz. Der rotgoldene Vorhang am Ende der Manege bleibt zu. Irgendwo hier sind die Ziffern für sein Schloss versteckt …",
tuerX:800,tuerArt:"vorhang",
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
intro:"Im Kostümwagen machen sich die Artistinnen und Artisten für die Vorstellung fertig. Glitzerkostüme hängen bereit, am Spiegel leuchten kleine Lampen. Der große Zauberspiegel ist verschlossen. Findet die Ziffern für sein Schloss!",
introDu:"Im Kostümwagen machen sich die Artistinnen und Artisten für die Vorstellung fertig. Glitzerkostüme hängen bereit, am Spiegel leuchten kleine Lampen. Der große Zauberspiegel ist verschlossen. Finde die Ziffern für sein Schloss!",
tuerX:1350,tuerArt:"spiegel",
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
{titel:"Das Tierzelt",
intro:"Im Tierzelt wohnen die Ponys, Ziegen und Hunde vom Zirkus. Es riecht nach Heu, und in den Boxen rascheln die Tiere. Das bunte Gatter am Ende des Zelts ist abgeschlossen. Findet die Ziffern für sein Schloss!",
introDu:"Im Tierzelt wohnen die Ponys, Ziegen und Hunde vom Zirkus. Es riecht nach Heu, und in den Boxen rascheln die Tiere. Das bunte Gatter am Ende des Zelts ist abgeschlossen. Finde die Ziffern für sein Schloss!",
tuerX:250,tuerArt:"gatter",
licht:{ton:'#ffb040',a:.08},
hintergrund:()=>`${defs('#e0c070','#8a6a30','#fff3b0')}<rect width="1600" height="470" fill="#f4e4c8"/>${streifen('#3aa0e8',50,0,470)}<rect width="1600" height="470" fill="url(#oben)"/>${R(0,330,1600,140,'#a0784a')}${linien('rgba(0,0,0,.25)',50,330,470)}${R(0,320,1600,12,'#6b4a24')}${[560,860,1160].map(x=>R(x,352,200,118,'#3a2414')+R(x+8,430,184,40,'#e8c45a')+R(x+30,356,16,16,'#f4c430')).join('')}${kette(0,1600,40,30,14,1)}${boden(1)}${[[780,600,160,26],[1180,700,140,22],[500,740,120,20]].map(([x,y,rx,ry])=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#e8c45a" opacity=".55"/>`).join('')}${lampe(500,100,'#ffd890')}${lampe(1100,110,'#ffd890')}`,
objekte:[
{name:"Heuballen",x:600,boden:620,fuss:4,by:-110,zeichne:heuballen,fund:"Zwischen dem Heu steckt:"},
{name:"Futtereimer",x:900,boden:720,fuss:4,by:-105,zeichne:futtereimer,fund:"Unter dem Futter liegt:"},
{name:"Pony Pünktchen",x:1150,boden:600,fuss:4,by:-150,zeichne:pony,fund:"Unter dem Halsband von Pünktchen steckt:"},
{name:"Ziege Gerda",x:1420,boden:680,fuss:4,by:-125,zeichne:ziege,fund:"Gerda hat etwas im Maul:"},
{name:"Tiertafel",x:720,y:240,wand:true,by:-85,zeichne:tiertafel,fund:"Hinter der Tiertafel klebt:"}
],
infoObjekte:[{name:"Futterplan",x:1000,y:240,wand:true,by:-90,zeichne:lagerplan,fund:"Auf dem Futterplan steht:"},{name:"Kiste mit Zaumzeug",x:1520,boden:560,fuss:4,by:-150,zeichne:holzkiste,fund:"In der Kiste liegt:"},{name:"Wassertränke",x:450,boden:735,fuss:4,by:-60,zeichne:traenke,fund:"Am Rand der Tränke klebt:"}]},
{titel:"Die Trapez-Kuppel",
intro:"Ihr seid hoch oben unter dem Zeltdach! Trapeze und Seile hängen von der Decke, Scheinwerfer leuchten durch die Zeltstoffbahnen. Unten sieht man die Manege ganz klein. Die Rutsche am Rand der Plattform ist mit einer Klappe verschlossen. Findet die Ziffern für ihr Schloss!",
introDu:"Du bist hoch oben unter dem Zeltdach! Trapeze und Seile hängen von der Decke, Scheinwerfer leuchten durch die Zeltstoffbahnen. Unten siehst du die Manege ganz klein. Die Rutsche am Rand der Plattform ist mit einer Klappe verschlossen. Finde die Ziffern für ihr Schloss!",
tuerX:1000,tuerArt:"rutsche",
licht:{spot:true,dunkel:.45,farbe:'#05050f'},
hintergrund:()=>`${defs('#8a5a3a','#2a1a10','#fff3b0')}<rect width="1600" height="470" fill="#1b1f4a"/>${[...Array(18)].map((_,k)=>`<path d="M800 -80L${k*100-80} 470L${k*100+20} 470Z" fill="${k%2?'#c8302a':'#e8e0c8'}" opacity=".3"/>`).join('')}<rect width="1600" height="470" fill="url(#oben)"/>${[[330,260],[1330,230]].map(([x,y])=>`<path d="M${x-30} 0V${y}M${x+30} 0V${y}" stroke="#e8d9b8" stroke-width="3"/>${R(x-44,y-4,88,10,'#c8302a','#6a1010',2)}`).join('')}<path d="M800 -80V60" stroke="#333" stroke-width="4"/><path d="M800 40L840 52L800 64Z" fill="#f4c430"/>${R(0,440,1600,30,'#6b4a24')}${R(0,440,1600,6,'#f4c430')}${boden(1)}${spot(450,'#fff3b0')}${spot(1150,'#b8e0ff')}${kette(0,1600,50,30,16,1)}`,
objekte:[
{name:"Seilrolle",x:400,boden:600,fuss:4,by:-115,zeichne:seilrolle,fund:"Im Seil steckt:"},
{name:"Balancierstange",x:650,boden:720,fuss:4,by:-100,zeichne:balancierstange,fund:"An der Stange klebt:"},
{name:"Lange Stelzen",x:250,boden:560,fuss:4,by:-245,zeichne:stelzen,fund:"An einer Stelze klebt:"},
{name:"Kreidekasten",x:1300,boden:700,fuss:4,by:-105,zeichne:kreidekasten,fund:"Unter dem Kreidestaub liegt:"},
{name:"Scheinwerfer",x:700,y:230,wand:true,by:-70,zeichne:scheinwerfer,fund:"Am Scheinwerfer klebt:"}
],
infoObjekte:[{name:"Sicherheitstafel",x:450,y:240,wand:true,by:-85,zeichne:regeltafel,fund:"Auf der Sicherheitstafel steht:"},{name:"Fass mit Jonglierkeulen",x:130,boden:740,fuss:4,by:-155,zeichne:keulenfass,fund:"Zwischen den Keulen liegt:"},{name:"Übungstrapez",x:1500,boden:580,fuss:4,by:-200,zeichne:uebungstrapez,fund:"An der Trapezstange klebt:"}]},
{titel:"Der Vorplatz",
intro:"Ihr seid draußen auf dem Vorplatz vor dem Zirkuszelt. Es ist schon Abend, bunte Lichterketten leuchten. Gleich kommen die Gäste! Hier liegt das letzte Geheimnis – öffnet das Tor nach draußen!",
introDu:"Du bist draußen auf dem Vorplatz vor dem Zirkuszelt. Es ist schon Abend, bunte Lichterketten leuchten. Gleich kommen die Gäste! Hier liegt das letzte Geheimnis – öffne das Tor nach draußen!",
tuerX:450,tuerArt:"tor",
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
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1f4a"/><stop offset=".65" stop-color="#7a3a6a"/><stop offset="1" stop-color="#e8885a"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/>${[[90,60],[200,140],[420,50],[560,90],[880,60],[800,150],[330,200]].map(([x,y])=>`<use href="#sym-stern" x="${x}" y="${y}" width="14" height="14" color="#fff3b0"/>`).join('')}
   ${[[300,170,'#f4c430'],[690,130,'#e86ab8'],[520,230,'#3aa0e8']].map(([x,y,c])=>[0,1,2,3,4,5,6,7,8,9].map(k=>{const a=k*Math.PI/5;return`<path d="M${x} ${y}L${(x+Math.cos(a)*46).toFixed(0)} ${(y+Math.sin(a)*46).toFixed(0)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`+C((x+Math.cos(a)*58).toFixed(0),(y+Math.sin(a)*58).toFixed(0),4,c);}).join('')+C(x,y,6,'#fff')).join('')}
   <path d="M0 450Q250 410 500 440T1000 430V600H0Z" fill="#3a2a4a"/>
   <path d="M300 460L420 260H720L840 460Z" fill="#f4ecd8"/>${[0,1,2,3].map(k=>`<path d="M${340+k*130} 460L${440+k*70} 260H${490+k*70}L${400+k*130} 460Z" fill="#c8302a"/>`).join('')}<path d="M420 260L570 180L720 260Z" fill="#c8302a"/><path d="M570 180V150" stroke="#333" stroke-width="3"/><path d="M570 150L598 160L570 170Z" fill="#f4c430"/><path d="M520 460V380Q570 340 620 380V460Z" fill="#ffd890"/>
   ${[[100,500],[170,520],[240,500],[700,520],[780,500],[860,525]].map(([x,y])=>`<ellipse cx="${x}" cy="${y+24}" rx="16" ry="30" fill="#1a1030"/>`+C(x,y-14,13,'#1a1030')).join('')}
   <path d="M0 330Q250 380 500 330T1000 340" stroke="#333" stroke-width="2" fill="none"/>${[40,160,280,400,520,640,760,880].map((x,k)=>C(x,340+Math.sin(k*1.6)*14,7,BC[k%5])).join('')}
   <path d="M0 0H1000V600H0Z M180 600V230Q180 70 500 70Q820 70 820 230V600Z" fill="#6a1010" fill-rule="evenodd"/><path d="M180 600V230Q180 70 500 70Q820 70 820 230V600" stroke="#f4c430" stroke-width="18" fill="none"/>`
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
   losNach (Sekunden, bis die Figur nach dem Öffnen losläuft, Standard 1.1; z. B. bis eine Brücke gebaut ist), warte (zusätzliche Sekunden vor dem Abblenden, Standard 0),
   blick {pitch,zoom,hoehe} (Kamera beim offenen Ausgang; hoehe: Blickpunkt steigt mit der Figur),
   treffer {x,y,z,b,h,t} (Tippfläche), name (Schild), schildOben [x,y,z], glanz [x,y,z], bewege(auf) (auf läuft von 0 bis 1) */
function ausgang(k,opt){
  const sc=k.scene, a=opt.treffer;
  const treffer=new THREE.Mesh(GEO.box,basis(0,{visible:false})); treffer.scale.set(a.b,a.h,a.t); treffer.position.set(a.x,a.y,a.z); sc.add(treffer);
  /* Bis Klasse 6 (einfache Sprache) darf der Ausgang einen leichteren Namen haben */
  const leicht=typeof CONFIG!=='undefined' && (typeof CONFIG.einfacheSprache==='boolean' ? CONFIG.einfacheSprache : parseInt(CONFIG.klasse,10)<=6);
  const schild=textSprite(leicht && opt.einfach ? opt.einfach : opt.name); schild.position.set(opt.schildOben[0],opt.schildOben[1],opt.schildOben[2]); schild.visible=false; sc.add(schild);
  const tuer={ steh:opt.steh, durch:opt.durch, tief:!!opt.tief, hoch:opt.hoch||0, rutsch:opt.rutsch||null, rutschDauer:opt.rutschDauer||1.5, losNach:opt.losNach||1.1, warte:opt.warte||0, blick:opt.blick||null, treffer, schild, bereit:false, offen:false };
  const g=schein(sc,'rgba(255,225,120,.9)',opt.glanz[0],opt.glanz[1],opt.glanz[2],2.2); g.visible=false;
  let auf=0;
  k.anim.push((t,dt)=>{ g.visible=tuer.bereit; if(tuer.bereit){ const s=1.8+Math.sin(t*5)*.5; g.scale.set(s,s,1); } auf+=((tuer.offen?1:0)-auf)*Math.min(1,dt*2.5); opt.bewege(auf,t); });
  return tuer;
}

/* ===================================================================
   ZIRKUS in 3D: gemeinsame Bausteine für alle fünf Räume und das Schlussbild.
   Je Raum eine Datei zirkus-raum<n>.js, die sich in RAEUME3D.zirkus[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   Alle Figuren und Tiere blicken wie angegeben, Füße bei y=0. Hindernisse setzt der Raum selbst (außer bei mast).
   =================================================================== */
RAEUME3D.zirkus = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Große Laufkugel','Unter der Laufkugel klemmt:','Große Kugel','Unter der Kugel liegt:'],['Orchesterpult mit Trompete','Zwischen den Notenblättern liegt:','Pult mit Trompete','Auf dem Pult liegt:']],
  [['Überseekoffer','Im Überseekoffer liegt:','Großer Koffer','Im Koffer liegt:'],['Zylinder mit Stoffhase','Der Stoffhase hält etwas fest:','Hut mit Hase','Beim Hasen liegt:']],
  [['Hundekörbchen mit Hund','Unter dem Kissen im Körbchen liegt:','Korb mit Hund','Im Korb liegt:'],['Schubkarre','In der Schubkarre liegt:','Schubkarre','In der Schubkarre liegt:']],
  [['Sprungtuch','Mitten auf dem Sprungtuch liegt:','Tuch zum Springen','Auf dem Tuch liegt:'],['Glocke am Seil','Am Seil der Glocke hängt:','Glocke','An der Glocke hängt:']],
  [['Drehorgel','An der Kurbel der Drehorgel klemmt:','Musik-Kasten','Beim Musik-Kasten liegt:'],['Zirkuswagen','Unter dem Fenster vom Zirkuswagen klebt:','Wagen vom Zirkus','Am Wagen klebt:']]
];
const SZZ=SZENARIEN.zirkus;
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZZ.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZZ.einfach) SZZ.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
/* Nur in 3D: Der Scheinwerfer in Raum 4 heißt bis Klasse 6 Große Lampe (er steht frei, nicht an der Wand) */
if(SZZ.einfach){ const r=SZZ.einfach.raeume[3]; if(r && r.objekte && r.objekte[4]) r.objekte[4].name='Große Lampe'; }
})();

const ZIRKUS = (function(){
const ROT=0xc8302a, ROT2=0x8a1a1a, GELB=0xf4c430, BLAU=0x3a8ae0, BLAU2=0x1f3a8a, GRUEN=0x4aae52, ROSA=0xe86ab8, LILA=0x7a3ac8, TUERKIS=0x2ab8b0, ORANGE=0xf08a30,
  CREME=0xf4ecd8, WEISS=0xfaf6ee, SCHWARZ=0x1c140c, GOLD=0xe8b830, MESSING=0xd0a040, METALL=0x98a2aa, METALL2=0x50585e, EISEN=0x2c3034,
  HOLZ=0x9a6636, HOLZ2=0x6a3f1c, HOLZ3=0x442612, HELLHOLZ=0xc89a62, LEDER=0x8a4a20, LEDER2=0x5a2e14, STROH=0xe8c456, STROH2=0xc89c30, SEIL=0xd8c08a, HAUT=0xf1c7a0;
const BUNT=[0xe8413a,0xf4c430,0x3aa0e8,0x5ac85a,0xe86ab8];
const css=c=>'#'+('000000'+c.toString(16)).slice(-6);
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };   /* Walze oder Ring: Achse zeigt nach z (Ring: liegt flach) */
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };      /* Walze: Achse zeigt nach x */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

/* ---------- Bilder (kachelbar) ---------- */
/* senkrechte Zeltstreifen mit leichten Falten. a, b = Zahlen-Farben; n = Streifen je Kachel (gerade Zahl) */
function streifenBild(a,b,n){
  const A=a===undefined?ROT:a, B=b===undefined?CREME:b, N=n||6;
  return bild(512,512,(g)=>{ const w=512/N; for(let i=0;i<N;i++){ g.fillStyle=css(i%2?B:A); g.fillRect(i*w,0,w+1,512);
      const v=g.createLinearGradient(i*w,0,(i+1)*w,0); v.addColorStop(0,'rgba(40,10,10,.28)'); v.addColorStop(.35,'rgba(255,255,255,.10)'); v.addColorStop(.7,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(40,10,10,.22)'); g.fillStyle=v; g.fillRect(i*w,0,w+1,512); } });
}
/* Tapete mit Punkten oder Sternen (Garderobe). grund und muster = CSS-Farben, sterne=true malt Sterne */
function tapetenBild(grund,muster,sterne){
  return bild(512,512,(g)=>{ g.fillStyle=grund||'#b8689a'; g.fillRect(0,0,512,512); g.fillStyle=muster||'#e8a8c8';
    for(let r=0;r<6;r++) for(let s=0;s<6;s++){ const x=s*85.33+(r%2?64:21), y=r*85.33+42;
      if(sterne){ g.beginPath(); for(let i=0;i<10;i++){ const a=i*Math.PI/5-Math.PI/2, d=i%2?6:15; g.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d); } g.fill(); } else { g.beginPath(); g.arc(x,y,9,0,7); g.fill(); } } });
}
/* Dielenboden. grund = [r,g,b] */
function dielenBild(grund,fuge){
  const G=grund||[150,104,64];
  return bild(512,512,(g)=>{ g.fillStyle=fuge||'#34200e'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ let x=-((r*97)%256); while(x<512){ const v=Math.floor(zufall()*26)-13;
      const mal=xx=>{ g.fillStyle='rgb('+(G[0]+v)+','+(G[1]+v)+','+(G[2]+v)+')'; g.fillRect(xx+1,r*64+1,253,62); g.fillStyle='rgba(50,25,8,.16)'; for(let k=0;k<5;k++) g.fillRect(xx+6+((k*53)%90),r*64+10+k*11,110+((k*31)%90),2); };
      mal(x); if(x<0) mal(x+512); x+=256; } } });
}
/* körniger Boden: Sägemehl, Erde, Wiese, Kies. grund = CSS-Farbe, punkte = Liste von CSS-Farben, halme=true malt Grashalme */
function kornBild(grund,punkte,halme){
  const P=punkte||['rgba(255,236,190,.4)','rgba(130,80,30,.25)'];
  return bild(512,512,(g)=>{ g.fillStyle=grund||'#c89458'; g.fillRect(0,0,512,512);
    for(let i=0;i<1500;i++){ g.fillStyle=P[i%P.length]; const x=zufall()*505, y=zufall()*495; if(halme) g.fillRect(x,y,2,5+zufall()*10); else g.fillRect(x,y,2+zufall()*5,2+zufall()*3); } });
}
/* flache Bildtafel (Plakat, Plan, Foto), Blick nach +z */
function tafel(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
/* Wandstück (Kasten) mit Bild, das über mehrere Stücke nahtlos weiterläuft (Kachel 6 Einheiten) */
function mauer(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const q=Math.max(w,d); t.repeat.set(q/6,h/6); t.offset.set(((w>d?x-w/2:z-d/2)/6)%1,((y-h/2)/6)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* ebene Vielecke aus Punkten (Fächer um den ersten Punkt), beidseitig, werden von verschmelze erfasst. farbe = Zahl; leuchtet=true: ohne Licht */
function vieleck(par,punkte,farbe,leuchtet){
  const P=[]; for(let i=1;i<punkte.length-1;i++) [punkte[0],punkte[i],punkte[i+1]].forEach(p=>P.push(p[0],p[1],p[2]));
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.computeVertexNormals();
  const m=new THREE.Mesh(geo,leuchtet?basis(farbe,{side:THREE.DoubleSide}):mat(farbe,{side:THREE.DoubleSide})); par.add(m); return m;
}
/* Volant (Zackenrand mit Bommeln) entlang x, Oberkante bei y, Blick nach +z */
function volant(par,x1,x2,y,z,a,b){
  const A=a===undefined?ROT:a, B=b===undefined?GELB:b, n=Math.max(1,Math.round((x2-x1)/1.2)), w=(x2-x1)/n;
  for(let i=0;i<n;i++){ const l=x1+i*w; vieleck(par,[[l,y,z],[l+w,y,z],[l+w,y-.38,z],[l+w*.75,y-.64,z],[l+w*.5,y-.74,z],[l+w*.25,y-.64,z],[l,y-.38,z]],i%2?B:A); ball(par,.11,i%2?A:B,l+w*.5,y-.82,z); }
  box(par,x2-x1,.14,.1,B,(x1+x2)/2,y+.02,z);
}
/* ---------- Raumhülle: Licht, Boden, Wände (in den Wandgruppen, blenden beim Drehen aus), Sockel, Volant ----------
   opt: B,T,H, hintergrund (Farbe), himmelLicht, grund, staerke, sonne, sonneStaerke, wandBild, bodenBild, bodenWdh [x,z], boden (false: kein Boden),
        aussen (Farbe unter dem Boden), waende (false: keine Wände), volant ([a,b] oder false), sockel (Höhe, 0 = keiner; Standard 1), sockelFarbe, leiste, oeffnung {x,b,h} */
function huelle(k,opt){
  opt=opt||{};
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6.4;
  sc.background=new THREE.Color(opt.hintergrund===undefined?0x160a0e:opt.hintergrund);
  sc.add(new THREE.HemisphereLight(opt.himmelLicht||0xfff0d6,opt.grund||0x5a3a34,opt.staerke||.74));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xffe8c8,opt.sonneStaerke||.42); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  if(opt.boden!==false){
    const tex=opt.bodenBild||kornBild(); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; const w=opt.bodenWdh||[B/8,T/8];
    const bodenM=new THREE.MeshLambertMaterial({map:tex});
    const flaeche=(x1,x2,z1,z2)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/.5)),Math.max(1,Math.round((z2-z1)/.5))), uv=geo.attributes.uv;
      for(let i=0;i<uv.count;i++) uv.setXY(i,((x1+B/2)+uv.getX(i)*(x2-x1))/B*w[0],((T/2-z2)+uv.getY(i)*(z2-z1))/T*w[1]);
      const m=new THREE.Mesh(geo,bodenM); m.rotation.x=-Math.PI/2; m.position.set((x1+x2)/2,0,(z1+z2)/2); m.receiveShadow=true; sc.add(m); };
    flaeche(-B/2,B/2,-T/2,T/2);
    flaeche(-B/2-18,B/2+18,T/2,T/2+26); flaeche(-B/2-18,-B/2,-T/2,T/2); flaeche(B/2,B/2+18,-T/2,T/2); /* Boden läuft weiter, damit beim Drehen keine dunkle Fläche entsteht */
    const unten=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(opt.aussen===undefined?0x24120e:opt.aussen)); unten.rotation.x=-Math.PI/2; unten.position.y=-.06; sc.add(unten);
  }
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), R={ sc, B, T, H, hinten, links, rechts };
  if(opt.waende===false) return R;
  const tex=opt.wandBild||streifenBild(), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    mauer(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); mauer(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); if(H-o.h>.05) mauer(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else mauer(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  mauer(links,tex,.5,H,T,-B/2-.25,H/2,0); mauer(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.leiste===undefined?GOLD:opt.leiste, sh=opt.sockel===undefined?1:opt.sockel, sf=opt.sockelFarbe===undefined?ROT2:opt.sockelFarbe, s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  box(s[0],B+1,.22,.66,f,0,H+.1,-T/2-.25); [-1,1].forEach((v,i)=>box(s[i+1],.66,.22,T+1,f,v*(B/2+.25),H+.1,0));
  if(sh>0){
    const stueck=(x1,x2)=>{ if(x2-x1<.1) return; box(s[0],x2-x1,sh,.08,sf,(x1+x2)/2,sh/2,-T/2+.02); box(s[0],x2-x1,.12,.15,f,(x1+x2)/2,sh+.04,-T/2+.05); };
    if(o){ stueck(-B/2,o.x-o.b/2); stueck(o.x+o.b/2,B/2); } else stueck(-B/2,B/2);
    [-1,1].forEach((v,i)=>{ box(s[i+1],.08,sh,T,sf,v*(B/2-.02),sh/2,0); box(s[i+1],.15,.12,T,f,v*(B/2-.05),sh+.04,0); });
  }
  if(opt.volant!==false){ const [a,b]=opt.volant||[ROT,GELB];
    volant(s[0],-B/2,B/2,H-.02,-T/2+.06,a,b);
    [-1,1].forEach((v,i)=>{ const q=gruppe(s[i+1],v*(B/2-.06),0,0); q.rotation.y=-v*Math.PI/2; volant(q,-T/2,T/2,H-.02,0,a,b); }); }
  s.forEach(verschmelze);
  return R;
}
/* ---------- Zeltteile ---------- */
/* Zeltbahnen wie ein Fächer in einer senkrechten Ebene: Spitze [x,y,z], unten von x1 bis x2 auf Höhe untenY, n Bahnen (Zeltdach als Rückwand-Bild) */
function faecher(par,spitze,untenY,x1,x2,n,a,b){
  const A=a===undefined?ROT:a, B=b===undefined?CREME:b, w=(x2-x1)/n;
  for(let i=0;i<n;i++) vieleck(par,[spitze,[x1+i*w,untenY,spitze[2]],[x1+(i+1)*w,untenY,spitze[2]]],i%2?B:A);
}
/* gestreiftes Kegeldach von außen, Unterkante bei y, mit Goldrand; flagge=false lässt den Wimpel oben weg */
function zeltdach(par,x,y,z,r,h,n,a,b,flagge){
  const A=a===undefined?ROT:a, B=b===undefined?CREME:b, N=n||16, g=gruppe(par,x,y,z);
  for(let i=0;i<N;i++){ const geo=new THREE.CylinderGeometry(.05,r,h,2,1,true,i*Math.PI*2/N,Math.PI*2/N); const m=new THREE.Mesh(geo,mat(i%2?B:A,{side:THREE.DoubleSide})); m.position.y=h/2; m.castShadow=true; g.add(m);
    const w=(i+.5)*Math.PI*2/N; ball(g,Math.min(.3,r*.07),GOLD,Math.sin(w)*r,-.08,Math.cos(w)*r); }
  liegend(ring(g,r,Math.min(.14,r*.03),GOLD,0,0,0));
  if(flagge!==false){ walze(g,.07,1.4,HOLZ2,0,h+.6,0); ball(g,.14,GOLD,0,h+1.35,0); vieleck(g,[[.06,h+1.25,0],[1.15,h+1.0,0],[.06,h+.75,0]],GELB); }
  return g;
}
/* runde gestreifte Zeltwand, Fuß bei y. von/bogen (Bogenmaß, 0 = Richtung +z) begrenzen den Ausschnitt, z. B. für eine Eingangslücke */
function zeltrund(par,x,y,z,r,h,n,a,b,von,bogen){
  const A=a===undefined?ROT:a, B=b===undefined?CREME:b, N=n||16, g=gruppe(par,x,y,z), s=von||0, l=bogen===undefined?Math.PI*2:bogen;
  for(let i=0;i<N;i++){ const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,3,1,true,s+i*l/N,l/N),mat(i%2?B:A,{side:THREE.DoubleSide})); m.position.y=h/2; m.castShadow=true; m.receiveShadow=true; g.add(m); }
  return g;
}
/* Zeltmast mit Spiralband, Goldkugel und Wimpel; setzt Hindernis und Verdecker selbst. farben [mast, band] */
function mast(k,x,z,h,farben){
  const H=h||7, [a,b]=farben||[ROT,CREME], g=gruppe(k.scene,x,0,z);
  walze(g,.42,.36,HOLZ2,0,.18,0); liegend(ring(g,.4,.06,GOLD,0,.36,0)); walze(g,.2,H,a,0,H/2,0);
  for(let y=.7;y<H-.3;y+=.55){ const r=liegend(ring(g,.205,.045,b,0,y,0)); r.rotation.y=.35; }
  ball(g,.3,GOLD,0,H+.15,0); walze(g,.04,.8,HOLZ2,0,H+.7,0); vieleck(g,[[.03,H+1.1,0],[.95,H+.9,0],[.03,H+.68,0]],GELB);
  verschmelze(g); k.kreis(x,z,.48); k.verdecker(g,x,z,.35); return g;
}
/* Punkt auf einer durchhängenden Schnur von a nach b */
const haengt=(a,b,durch,t)=>[a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t-durch*4*t*(1-t), a[2]+(b[2]-a[2])*t];
function schnur(par,a,b,durch,c){ for(let i=0;i<10;i++) strich(par,haengt(a,b,durch,i/10),haengt(a,b,durch,(i+1)/10),.018,c); }
/* Lichterketten: ketten = [[a,b,durchhang,anzahl], ...] mit a,b = [x,y,z]. Alle Ketten eines Aufrufs zusammen etwa 6 Zeichenaufrufe; die Farben blinken sanft.
   Echtes Licht dazu sparsam mit flacker(...) */
function lichterkette(k,par,ketten,opt){
  const o=opt||{}, F=o.farben||[0xff6a5a,0xffd84a,0x5ac8ff,0x7ae87a,0xff8ad8], g=gruppe(par,0,0,0), M=F.map(c=>basis(c));
  let n=0; ketten.forEach(([a,b,durch,anz])=>{ schnur(g,a,b,durch,0x2a2020); for(let i=1;i<anz;i++){ const p=haengt(a,b,durch,i/anz), j=n++%F.length; const m=teil(g,GEO.sph,M[j],p[0],p[1]-.13,p[2],o.gr||.12,(o.gr||.12)*1.3,o.gr||.12); m.castShadow=false; walze(g,.045,.08,0x3a3030,p[0],p[1]-.02,p[2]); } });
  verschmelze(g); ohneSchatten(g);
  const C=F.map(c=>new THREE.Color(c));
  k.anim.push(t=>{ M.forEach((m,i)=>m.color.copy(C[i]).multiplyScalar(.82+.28*Math.max(0,Math.sin(t*2.4+i*1.7)))); });
  return g;
}
/* Wimpelketten: ketten = [[a,b,durchhang,anzahl], ...]. Wimpel zeigen nach +z (für die Seitenwände die Gruppe drehen) */
function wimpel(par,ketten,farben){
  const F=farben||BUNT, g=gruppe(par,0,0,0); let n=0;
  ketten.forEach(([a,b,durch,anz])=>{ schnur(g,a,b,durch,0x4a3a30); const L=Math.hypot(b[0]-a[0],b[2]-a[2])||1, ux=(b[0]-a[0])/L*.27, uz=(b[2]-a[2])/L*.27;
    for(let i=0;i<anz;i++){ const p=haengt(a,b,durch,(i+.5)/anz); vieleck(g,[[p[0]-ux,p[1],p[2]-uz],[p[0]+ux,p[1],p[2]+uz],[p[0],p[1]-.6,p[2]]],F[n++%F.length]); } });
  verschmelze(g); ohneSchatten(g); return g;
}
/* weicher Scheinwerferkegel von oben (Spitze bei x,y,z), unten Radius r auf dem Boden */
function lichtkegel(par,x,y,z,r,farbe){
  const m=new THREE.Mesh(new THREE.CylinderGeometry(.15,r,y,24,1,true),basis(farbe||0xfff0b0,{transparent:true,opacity:.09,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending})); m.position.set(x,y/2,z); par.add(m);
  const f=new THREE.Mesh(new THREE.CircleGeometry(r,28),basis(farbe||0xfff0b0,{transparent:true,opacity:.16,depthWrite:false,blending:THREE.AdditiveBlending})); f.rotation.x=-Math.PI/2; f.position.set(x,.03,z); par.add(f); return { kegel:m, fleck:f };
}
/* ---------- Requisiten ---------- */
/* flacher Stern, Blick nach +z, Radius r */
function stern(par,x,y,z,r,farbe){
  const P=[]; for(let i=0;i<=10;i++){ const a=i*Math.PI/5+Math.PI/2, d=i%2?r*.45:r; P.push([x+Math.cos(a)*d,y+Math.sin(a)*d,z]); }
  return vieleck(par,[[x,y,z]].concat(P),farbe===undefined?GELB:farbe);
}
/* rundes Podest, Fuß bei y=0, mit Goldrändern und Stern vorn */
function podest(par,x,z,r,h,farbe,y){
  const g=gruppe(par,x,y||0,z); rohr(g,r*.86,r,h,farbe===undefined?BLAU:farbe,0,h/2,0,24); walze(g,r*.9,.08,GELB,0,h+.02,0);
  liegend(ring(g,r,.05,GOLD,0,.07,0)); liegend(ring(g,r*.87,.05,GOLD,0,h,0)); stern(g,0,h*.52,r*.96,Math.min(h,r)*.3,CREME); return g;
}
/* Jonglierkeule (bunter Kegel zum Werfen), Fuß bei y */
function keule(par,x,y,z,farbe){
  const g=gruppe(par,x,y,z); walze(g,.045,.36,HELLHOLZ,0,.18,0); ball(g,.07,WEISS,0,.02,0); ball(g,.15,farbe,0,.55,0,1,1.7,1); rohr(g,.05,.09,.2,farbe,0,.82,0,12); ball(g,.07,WEISS,0,.94,0);
  walze(g,.152,.07,WEISS,0,.55,0); return g;
}
/* Luftballon mit Schnur: Fuß der Schnur bei (x,y,z), Ballon in Höhe hoch */
function ballon(par,x,y,z,hoch,farbe,gr){
  const g=gruppe(par,x,y,z), r=gr||.36; strich(g,[0,0,0],[0,hoch-r*1.1,0],.012,0xdddddd); ball(g,r,farbe,0,hoch,0,1,1.2,1); kegel(g,r*.18,r*.28,farbe,0,hoch-r*1.26,0); ball(g,r*.2,WEISS,-r*.45,hoch+r*.5,r*.78,.7,1,.4); return g;
}
/* Häufchen Popcorn, n Stück im Umkreis r, Höhe h */
function popcorn(par,x,y,z,r,h,n){ for(let i=0;i<n;i++){ const a=i*2.4, d=Math.sqrt((i+.5)/n)*r; ball(par,.07+zufall()*.04,i%4?0xfff0b8:0xf8d870,x+Math.cos(a)*d,y+(1-d/r)*h+zufall()*.04,z+Math.sin(a)*d); } }
/* viele Halme, Steine, Blumen als eine Instanz-Gruppe. liste: [[x,y,z,sx,sy,sz,farbe,drehY,drehX,drehZ]], geo: GEO.sph / GEO.cone / GEO.box / GEO.cyl */
function viele(par,geo,liste){
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(e[8]||0,e[7]||0,e[9]||0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.receiveShadow=true; im.frustumCulled=false; par.add(im); return im;
}
/* lose Halme oder Sägespäne flach auf dem Boden (Deko): Fleck um (x,z), Radius r, n Stück */
function halme(par,x,z,r,n){
  const L=[]; for(let i=0;i<n;i++){ const a=zufall()*6.28, d=Math.sqrt(zufall())*r; L.push([x+Math.cos(a)*d,.02+zufall()*.025,z+Math.sin(a)*d,.28+zufall()*.3,.012,.028,i%3?STROH:STROH2,zufall()*3.14]); }
  return viele(par,GEO.box,L);
}
/* Heuballen mit zwei Schnüren, Fuß bei y */
function ballen(par,x,y,z,b,h,t,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0; box(g,b,h,t,STROH,0,h/2,0); [-.27,.27].forEach(v=>box(g,.07,h+.03,t+.03,LEDER2,v*b,h/2,0));
  for(let i=0;i<22;i++){ const m=box(g,.2+zufall()*.3,.025,.025,i%3?STROH2:0xf8dc80,(zufall()-.5)*(b-.4),zufall()*h*.9+.05,(i%2?1:-1)*(t/2+.012)); m.rotation.z=(zufall()-.5)*.8; m.castShadow=false; }
  for(let i=0;i<14;i++){ const m=box(g,.2+zufall()*.3,.025,.03,i%3?STROH2:0xf8dc80,(zufall()-.5)*(b-.4),h+.012,(zufall()-.5)*(t-.2)); m.rotation.y=(zufall()-.5)*1.4; m.castShadow=false; }
  verschmelze(g); return g;
}
/* Zahlenschloss (golden, drei Felder), Blick nach +z */
function zahlenschloss(par,x,y,z){
  const g=gruppe(par,x,y,z); box(g,.9,.66,.22,GOLD,0,0,0); ring(g,.27,.075,0x9aa3ad,0,.33,0,Math.PI); [-.25,0,.25].forEach(v=>{ box(g,.2,.3,.04,0xfff3cf,v,-.02,.12); box(g,.045,.16,.02,0x2a1a08,v,-.02,.15); });
  return g;
}
/* gefaltete Stoffbahn (Vorhang) aus runden Falten: Breite b, Höhe h, Mitte unten bei (x,y,z), mit Goldsaum */
function vorhang(par,x,y,z,b,h,farbe,dunkel){
  const g=gruppe(par,x,y,z), n=Math.max(2,Math.round(b/.34)), w=b/n;
  for(let i=0;i<n;i++){ const m=walze(g,w*.62,h,i%2?(dunkel===undefined?ROT2:dunkel):(farbe===undefined?ROT:farbe),-b/2+(i+.5)*w,h/2,i%2?0:.07); m.scale.z=.14; ball(g,.075,GOLD,-b/2+(i+.5)*w,.1,i%2?.12:.19); }
  box(g,b,.14,.34,GOLD,0,.28,.03); return g;
}
/* ---------- Figuren (blicken nach +z, Höhe etwa 2.1, bleiben beweglich; Hindernis setzt der Raum) ---------- */
function gesicht(kopf){
  [-.12,.12].forEach(x=>{ ball(kopf,.048,0x20140e,x,.04,.305); ball(kopf,.016,WEISS,x+.016,.058,.35); ball(kopf,.06,0xf09a8a,x*1.55,-.07,.28,1,.7,.35); });
  const mund=ring(kopf,.11,.022,0xa83a30,0,-.09,.31,Math.PI); mund.rotation.z=Math.PI;
}
function glied(par,x,y,z,c,l,r){ const a=gruppe(par,x,y,z); a.userData.lebendig=true; walze(a,r,l,c,0,-l/2,0); ball(a,r,c,0,0,0); return a; }
/* Clownin Lulu. opt: winkt (Arm winkt), jongliert (drei Bälle), ruhig (keine Bewegung), phase.
   Rückgabe: { g, koerper, kopf, armL, armR, beinL, beinR, baelle } */
function clownin(k,par,x,z,dreh,opt){
  const o=opt||{}, g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.userData.lebendig=true;
  const koerper=gruppe(g,0,0,0); koerper.userData.lebendig=true; const r=gruppe(koerper,0,0,0);
  const beinL=glied(g,-.19,.66,0,TUERKIS,.56,.15), beinR=glied(g,.19,.66,0,GELB,.56,.15);
  [beinL,beinR].forEach(b=>{ ball(b,.17,ROT,0,-.57,.16,1.1,.65,1.8); ball(b,.06,GELB,0,-.46,.3); liegend(ring(b,.15,.045,CREME,0,-.47,0)); verschmelze(b); });
  rohr(r,.27,.44,.7,ORANGE,0,.95,0); ball(r,.42,ORANGE,0,.68,0,1,.45,1);
  [[-.2,.75,.34],[.22,.9,.3],[-.14,1.12,.28],[.26,.66,.33],[0,.9,-.37],[-.28,.9,-.25]].forEach(([a,b,c],i)=>ball(r,.085,[BLAU,GRUEN,ROSA][i%3],a,b,c,1,1,.45));
  [1.14,.94,.74].forEach((y,i)=>ball(r,.075,GELB,0,y,.3+i*.06));
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(r,.14,i%2?WEISS:BLAU,Math.cos(a)*.27,1.31,Math.sin(a)*.27,1,.55,1); }
  const armL=glied(koerper,-.34,1.22,0,GELB,.52,.09), armR=glied(koerper,.34,1.22,0,TUERKIS,.52,.09);
  [armL,armR].forEach(a=>{ ball(a,.11,WEISS,0,-.58,0); liegend(ring(a,.095,.035,CREME,0,-.46,0)); verschmelze(a); }); armL.rotation.z=-.3; armR.rotation.z=.3;
  const kopf=gruppe(koerper,0,1.66,0); kopf.userData.lebendig=true;
  ball(kopf,.33,HAUT,0,0,0); gesicht(kopf); ball(kopf,.085,0xe8281e,0,-.02,.35);
  [[-.34,.04,-.02],[-.31,.2,-.1],[-.3,-.1,-.12],[.34,.04,-.02],[.31,.2,-.1],[.3,-.1,-.12],[-.15,.26,-.2],[.15,.26,-.2],[0,.14,-.32],[-.2,-.04,-.28],[.2,-.04,-.28],[0,.3,-.1]].forEach(p=>ball(kopf,.15,0xe85a1e,p[0],p[1],p[2]));
  const hut=gruppe(kopf,.1,.32,.02); hut.rotation.z=-.28; walze(hut,.26,.05,GRUEN,0,0,0); walze(hut,.16,.24,GRUEN,0,.13,0); walze(hut,.165,.06,GELB,0,.07,0);
  strich(hut,[.1,.2,.1],[.2,.42,.14],.016,0x2a7a30); for(let i=0;i<6;i++){ const a=i*Math.PI/3; ball(hut,.055,WEISS,.2+Math.cos(a)*.075,.44+Math.sin(a)*.075,.14); } ball(hut,.05,GELB,.2,.44,.17);
  verschmelze(r); verschmelze(kopf);
  const baelle=[];
  if(o.jongliert){ [BLAU,GRUEN,ROSA].forEach(c=>{ const b=gruppe(koerper,0,1.2,.5); b.userData.lebendig=true; ball(b,.12,c,0,0,0); baelle.push(b); }); armL.rotation.set(-1.2,0,-.15); armR.rotation.set(-1.2,0,.15); }
  if(!o.ruhig){ const ph=o.phase||0; k.anim.push(t=>{ const u=t+ph;
    koerper.position.y=Math.abs(Math.sin(u*2.1))*.03; kopf.rotation.z=Math.sin(u*1.3)*.1;
    if(o.winkt){ armR.rotation.z=2.5+Math.sin(u*7)*.35; }
    if(o.jongliert){ baelle.forEach((b,i)=>{ const w=(u*.8+i/3)%1; b.position.set(-.45+.9*(i%2?1-w:w),1.15+Math.sin(w*Math.PI)*1.25,.55); }); armL.rotation.x=-1.2+Math.sin(u*7.5)*.25; armR.rotation.x=-1.2-Math.sin(u*7.5)*.25; }
  }); }
  return { g, koerper, kopf, armL, armR, beinL, beinR, baelle };
}
/* Artistin. opt: pose 'steht' (Standard), 'haengt' (Arme nach oben, Hände bei y=2.34) oder 'sitzt' (Sitzfläche bei y=.66, Füße hängen darunter),
   winkt, ruhig, farbe, haar, phase. Rückgabe: { g, koerper, kopf, armL, armR, beinL, beinR } */
function artistin(k,par,x,z,dreh,opt){
  const o=opt||{}, F=o.farbe===undefined?TUERKIS:o.farbe, H=o.haar===undefined?0x4a2412:o.haar, pose=o.pose||'steht';
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.userData.lebendig=true;
  const koerper=gruppe(g,0,0,0); koerper.userData.lebendig=true; const r=gruppe(koerper,0,0,0);
  const beinL=glied(g,-.13,.7,0,0xf0d8d0,.62,.095), beinR=glied(g,.13,.7,0,0xf0d8d0,.62,.095);
  [beinL,beinR].forEach(b=>{ ball(b,.1,GOLD,0,-.64,.07,1,.7,1.6); verschmelze(b); });
  rohr(r,.2,.23,.62,F,0,1.0,0); ball(r,.21,F,0,1.28,0,1.15,.55,.9);
  rohr(r,.24,.52,.2,0xffd8ec,0,.7,0,20); rohr(r,.25,.42,.14,F,0,.76,0,20); liegend(ring(r,.23,.035,GOLD,0,.82,0));
  [[0,1.14,.22,.09],[-.1,.96,.21,.05],[.12,1.0,.2,.05]].forEach(([a,b,c,d])=>stern(r,a,b,c+.02,d,GELB));
  walze(r,.08,.14,HAUT,0,1.4,0);
  const armL=glied(koerper,-.27,1.28,0,HAUT,.54,.07), armR=glied(koerper,.27,1.28,0,HAUT,.54,.07);
  [armL,armR].forEach(a=>{ ball(a,.085,HAUT,0,-.57,0); liegend(ring(a,.075,.022,GOLD,0,-.46,0)); verschmelze(a); }); armL.rotation.z=-.35; armR.rotation.z=.35;
  const kopf=gruppe(koerper,0,1.74,0); kopf.userData.lebendig=true;
  ball(kopf,.31,HAUT,0,0,0); gesicht(kopf);
  const haube=new THREE.Mesh(new THREE.SphereGeometry(.34,18,12,0,Math.PI*2,0,Math.PI*.5),mat(H)); haube.position.set(0,.03,-.02); haube.rotation.x=-.35; kopf.add(haube);
  ball(kopf,.28,H,0,-.01,-.1,1.05,1,.85); ball(kopf,.17,H,0,.38,-.1); liegend(ring(kopf,.12,.03,GELB,0,.29,-.09)); stern(kopf,.17,.27,.2,.08,GELB);
  verschmelze(r); verschmelze(kopf);
  if(pose==='haengt'){ armL.rotation.z=-2.95; armR.rotation.z=2.95; armL.position.x=-.2; armR.position.x=.2; armL.scale.y=armR.scale.y=1.9; }
  if(pose==='sitzt'){ beinL.rotation.x=beinR.rotation.x=-.55; armL.rotation.z=-2.5; armR.rotation.z=2.5; }
  if(!o.ruhig){ const ph=o.phase||0; k.anim.push(t=>{ const u=t+ph;
    kopf.rotation.z=Math.sin(u*1.1)*.08;
    if(o.winkt) armR.rotation.z=2.5+Math.sin(u*6.5)*.35;
    if(pose!=='steht'){ beinL.rotation.x=(pose==='sitzt'?-.55:0)+Math.sin(u*1.9)*.22; beinR.rotation.x=(pose==='sitzt'?-.55:0)-Math.sin(u*1.9)*.22; }
  }); }
  return { g, koerper, kopf, armL, armR, beinL, beinR };
}
/* Trapez: Aufhängung bei (x,y,z), Seile der Länge l, Stange entlang x. opt: breite, schwung (Bogenmaß, 0 = still), phase,
   artistin ('sitzt' oder 'haengt'), farbe. Es schwingt vor und zurück. Rückgabe: { g, stange, figur } */
function trapez(k,par,x,y,z,l,opt){
  const o=opt||{}, b=o.breite||(o.artistin==='sitzt'?1.2:1.5), g=gruppe(par,x,y,z); g.userData.lebendig=true;
  [-1,1].forEach(s=>{ strich(g,[s*b/2,0,0],[s*b/2,-l,0],.03,SEIL); ball(g,.07,GOLD,s*b/2,0,0); ball(g,.085,GOLD,s*b/2,-l,0); });
  const stange=gruppe(g,0,-l,0); quer(walze(stange,.07,b+.3,ROT,0,0,0)); [-.28,.28].forEach(v=>quer(walze(stange,.078,.2,WEISS,v*b,0,0)));
  let figur=null;
  if(o.artistin){ figur=artistin(k,stange,0,0,0,{ pose:o.artistin, farbe:o.farbe, phase:o.phase }); figur.g.position.y=o.artistin==='haengt'?-2.34:-.58; }
  verschmelze(g);
  const s=o.schwung===undefined?.12:o.schwung, ph=o.phase||0;
  if(s) k.anim.push(t=>{ g.rotation.x=Math.sin((t+ph)*1.5)*s; });
  return { g, stange, figur };
}
/* ---------- Tiere (blicken nach +x, Füße bei y=0, bleiben beweglich; Hindernis setzt der Raum oder laeufer(k,t.g,...)) ---------- */
/* Pony Pünktchen: weiß mit braunen Punkten, rotes Halfter, Federbusch. Etwa 2.6 lang, 2.3 hoch bei gr=1.
   opt: federbusch (false = ohne), halfter (Farbe), punkte (false = ohne Punkte, für andere Ponys), fell, maehne (Farben), laeuft (Beine bewegen sich), ruhig, phase. Rückgabe: { g, hals, kopf, beine, schweif } */
function pony(k,par,x,z,dreh,gr,opt){
  const o=opt||{}, F=o.fell===undefined?0xf4ead8:o.fell, P=0x9a5a2a, M=o.maehne===undefined?0x5a3418:o.maehne, HF=o.halfter===undefined?ROT:o.halfter, ph=o.phase||0;
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0);
  ball(r,.52,F,0,1.15,0,1.5,.95,.9); ball(r,.45,F,.5,1.18,0,1,1.05,.92); ball(r,.52,F,-.5,1.2,0,1,1,.95);
  if(o.punkte!==false){ [-1,1].forEach(s=>[[-.65,1.35,.46,.15],[-.2,1.05,.45,.12],[.2,1.38,.43,.13],[.55,1.05,.39,.1],[-.5,.98,.45,.09]].forEach(([a,b,c,d])=>ball(r,d,P,a,b,s*c,1,1,.35)));
  [[-.3,1.66,.1,.14],[.3,1.62,-.12,.1],[-.75,1.62,-.1,.11]].forEach(([a,b,c,d])=>ball(r,d,P,a,b,c,1,.35,1)); }
  verschmelze(r);
  const beine=[[.58,.24],[.58,-.24],[-.6,.26],[-.6,-.26]].map(([a,c])=>{ const q=gruppe(g,a,.95,c); q.userData.lebendig=true; strich(q,[0,.05,0],[.02,-.42,0],.13,F); ball(q,.105,F,.02,-.43,0); strich(q,[.02,-.43,0],[.02,-.8,0],.085,F); rohr(q,.1,.135,.16,0x3a2a1c,.04,-.87,0,12); verschmelze(q); return q; });
  const hals=gruppe(g,.74,1.3,0); hals.userData.lebendig=true; const h=gruppe(hals,0,0,0);
  const hr=rohr(h,.2,.34,.85,F,.24,.33,0,14); hr.rotation.z=-.6; ball(h,.33,F,0,0,0,1,1,.8);
  for(let i=0;i<6;i++){ const u=i/5; ball(h,.16,M,-.27+u*.56,.17+u*.75,0,.75,1.1,.45); }
  verschmelze(h);
  const kopf=gruppe(hals,.52,.78,0); kopf.userData.lebendig=true;
  ball(kopf,.26,F,.02,0,0,1.15,1,.9); strich(kopf,[.05,-.02,0],[.46,-.24,0],.18,F); ball(kopf,.19,0xe8b8a0,.52,-.28,0,1.05,.95,1); if(o.punkte!==false) ball(kopf,.1,P,.14,.14,.16,1,1,.5);
  [-1,1].forEach(s=>{ ball(kopf,.06,SCHWARZ,.19,.06,s*.21); ball(kopf,.02,WEISS,.215,.085,s*.255); ball(kopf,.035,SCHWARZ,.65,-.27,s*.12);
    const a=kegel(kopf,.09,.28,F,-.1,.34,s*.15); a.scale.z=.06; a.rotation.x=s*.22; const i=kegel(kopf,.045,.17,0xd89a88,-.06,.32,s*.155); i.scale.z=.035; i.rotation.x=s*.22;
    strich(kopf,[.38,-.18,s*.2],[-.04,.1,s*.245],.026,HF); ball(kopf,.045,GOLD,.38,-.2,s*.21); });
  const rg=ring(kopf,.2,.028,HF,.38,-.2,0); rg.rotation.y=Math.PI/2; rg.rotation.x=-.45;
  ball(kopf,.12,M,.06,.22,0,1.5,.55,.75);
  if(o.federbusch!==false){ walze(kopf,.05,.14,GOLD,-.04,.34,0); [-1,0,1].forEach(v=>ball(kopf,.08,v?ROT:GELB,-.04+v*.04,.6-Math.abs(v)*.07,v*.09,.8,2,.8)); }
  verschmelze(kopf);
  const schweif=gruppe(g,-.95,1.4,0); schweif.userData.lebendig=true; ball(schweif,.12,M,-.05,0,0); strich(schweif,[-.06,-.02,0],[-.28,-.36,0],.1,M); ball(schweif,.18,M,-.3,-.56,0,.75,1.8,.85); verschmelze(schweif);
  if(!o.ruhig) k.anim.push(t=>{ const u=t+ph; schweif.rotation.x=Math.sin(u*2.4)*.3; hals.rotation.z=Math.sin(u*1.0)*.1; kopf.rotation.y=Math.sin(u*.7)*.12; if(o.laeuft) beine.forEach((b,i)=>b.rotation.z=Math.sin(u*6+[0,3.14,3.14,0][i])*.4); });
  return { g, hals, kopf, beine, schweif };
}
/* Ziege Gerda: weißgrau, Schlappohren, kleine runde Hörner, Bart, Glöckchen, Heu im Maul. Etwa 1.9 lang, 1.9 hoch bei gr=1.
   opt: laeuft, ruhig, phase, heu (false = ohne). Rückgabe: { g, hals, kopf, beine, schwanz } */
function ziege(k,par,x,z,dreh,gr,opt){
  const o=opt||{}, F=0xece6da, D=0x8a7a68, ph=o.phase||0;
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0); ball(r,.42,F,0,.9,0,1.55,1,.85); ball(r,.3,D,-.2,1.12,0,1.4,.7,1.05); ball(r,.3,F,.42,.96,0); verschmelze(r);
  const beine=[[.42,.2],[.42,-.2],[-.44,.2],[-.44,-.2]].map(([a,c])=>{ const q=gruppe(g,a,.75,c); q.userData.lebendig=true; strich(q,[0,.05,0],[.01,-.4,0],.09,F); strich(q,[.01,-.4,0],[.01,-.66,0],.06,F); rohr(q,.065,.09,.12,0x4a3a2a,.02,-.69,0,10); verschmelze(q); return q; });
  const hals=gruppe(g,.55,1.05,0); hals.userData.lebendig=true; const h=gruppe(hals,0,0,0); strich(h,[0,-.05,0],[.28,.42,0],.17,F); ball(h,.17,F,.28,.42,0);
  const band=ring(h,.19,.035,ROT,.15,.2,0); band.rotation.x=Math.PI/2; band.rotation.y=.55; ball(h,.09,GOLD,.34,.1,0,1,1.1,1); verschmelze(h);
  const kopf=gruppe(hals,.34,.52,0); kopf.userData.lebendig=true; const kt=gruppe(kopf,0,0,0);
  ball(kt,.2,F,0,0,0,1.15,1,.95); strich(kt,[.05,-.02,0],[.3,-.12,0],.12,F); ball(kt,.11,0xe0b0a0,.36,-.13,0);
  [-1,1].forEach(s=>{ ball(kt,.045,SCHWARZ,.13,.07,s*.16); ball(kt,.015,WEISS,.15,.09,s*.2); ball(kt,.022,SCHWARZ,.45,-.11,s*.05);
    strich(kt,[0,.15,s*.09],[-.1,.38,s*.14],.045,0xc8a878); strich(kt,[-.1,.38,s*.14],[-.27,.42,s*.18],.035,0xc8a878); ball(kt,.036,0xc8a878,-.27,.42,s*.18);
    const ohr=ball(kt,.14,D,-.1,-.04,s*.27,.6,.32,1.15); ohr.rotation.x=s*.5; });
  verschmelze(kt);
  const maul=gruppe(kopf,.24,-.18,0); maul.userData.lebendig=true; ball(maul,.075,F,.05,-.02,0,1.4,.6,1); const bart=kegel(maul,.07,.24,0xd8d0c0,0,-.17,0); bart.rotation.x=Math.PI;
  if(o.heu!==false) for(let i=0;i<7;i++) strich(maul,[.12,.03,0],[.2+(i%3)*.08,-.12-(i%4)*.05,(i-3)*.07],.012,i%2?STROH:0x9cac44);
  verschmelze(maul);
  const schwanz=gruppe(g,-.65,1.1,0); schwanz.userData.lebendig=true; strich(schwanz,[0,0,0],[-.16,.24,0],.08,F); ball(schwanz,.09,F,-.17,.26,0); verschmelze(schwanz);
  if(!o.ruhig) k.anim.push(t=>{ const u=t+ph; maul.position.z=Math.sin(u*7)*.025; maul.rotation.x=Math.sin(u*7)*.12; schwanz.rotation.x=Math.sin(u*5)*.35*(Math.sin(u*.8)>0?1:.15); hals.rotation.z=Math.sin(u*.8)*.1; if(o.laeuft) beine.forEach((b,i)=>b.rotation.z=Math.sin(u*7+[0,3.14,3.14,0][i])*.4); });
  return { g, hals, kopf, beine, schwanz };
}
/* Zirkushund (hellbraun-weiß). pose 'steht' (Standard), 'sitzt' oder 'liegt'. Etwa 1.4 lang, 1.2 hoch bei gr=1.
   opt: pose, krause (bunte Halskrause), farbe, laeuft, ruhig, phase. Rückgabe: { g, kopf, beine, schwanz } */
function hund(k,par,x,z,dreh,gr,opt){
  const o=opt||{}, pose=o.pose||'steht', F=o.farbe===undefined?0xd89a52:o.farbe, D=0x7a4a22, ph=o.phase||0;
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; g.scale.setScalar(gr||1); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0); let kp, sw; const beine=[];
  if(pose==='liegt'){ ball(r,.3,F,0,.27,0,1.7,.85,1.05); ball(r,.22,F,-.34,.28,0,1,1,1.3); ball(r,.2,WEISS,.34,.22,0,1,.9,1);
    [-1,1].forEach(s=>{ strich(r,[.34,.12,s*.18],[.76,.09,s*.17],.085,F); ball(r,.1,WEISS,.78,.09,s*.17,1.2,.8,1); ball(r,.14,F,-.24,.14,s*.34,1.5,.7,.7); ball(r,.085,WEISS,-.02,.08,s*.37,1.3,.7,1); }); kp=[.52,.56]; sw=[-.55,.2]; }
  else if(pose==='sitzt'){ const rumpf=ball(r,.28,F,0,.52,0,1,1.5,.95); rumpf.rotation.z=-.4; ball(r,.2,WEISS,.19,.56,0,.8,1.3,.85);
    [-1,1].forEach(s=>{ ball(r,.21,F,-.17,.23,s*.2,1.3,1,.7); ball(r,.09,WEISS,.12,.07,s*.27,1.4,.7,1); strich(r,[.22,.55,s*.15],[.3,.06,s*.15],.07,F); ball(r,.09,WEISS,.34,.07,s*.15,1.2,.8,1); }); kp=[.28,.98]; sw=[-.36,.14]; }
  else { ball(r,.28,F,0,.58,0,1.6,.95,.9); ball(r,.2,WEISS,.34,.52,0,.9,.95,.95);
    [[.32,.16],[.32,-.16],[-.32,.17],[-.32,-.17]].forEach(([a,c])=>{ const q=gruppe(g,a,.48,c); q.userData.lebendig=true; walze(q,.07,.42,F,0,-.2,0); ball(q,.09,WEISS,.03,-.41,0,1.2,.7,1); verschmelze(q); beine.push(q); }); kp=[.52,.9]; sw=[-.45,.66]; }
  verschmelze(r);
  const kopf=gruppe(g,kp[0],kp[1],0); kopf.userData.lebendig=true;
  ball(kopf,.25,F,0,0,0); ball(kopf,.14,WEISS,.2,-.06,0,1.25,.8,1); ball(kopf,.06,SCHWARZ,.37,-.02,0); ball(kopf,.07,WEISS,.17,.12,0,.9,1.4,.6);
  const zunge=ball(kopf,.05,0xe87080,.28,-.17,0,1,.5,.9); zunge.rotation.z=-.4;
  [-1,1].forEach(s=>{ ball(kopf,.045,SCHWARZ,.21,.07,s*.11); ball(kopf,.015,WEISS,.245,.09,s*.115); const ohr=ball(kopf,.14,D,-.04,-.02,s*.25,.75,1.35,.35); ohr.rotation.x=-s*.35; });
  if(o.krause) for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(kopf,.09,BUNT[i%5],-.08+Math.cos(a)*.05,-.24,Math.sin(a)*.2,1.1,.5,1); }
  else { const band=liegend(ring(kopf,.17,.03,ROT,-.06,-.2,0)); band.rotation.y=.3; ball(kopf,.05,GOLD,.1,-.27,0); }
  verschmelze(kopf);
  const schwanz=gruppe(g,sw[0],sw[1],0); schwanz.userData.lebendig=true; strich(schwanz,[0,0,0],[-.24,pose==='liegt'?.04:.28,0],.065,F); ball(schwanz,.07,WEISS,-.25,pose==='liegt'?.05:.29,0); verschmelze(schwanz);
  if(!o.ruhig) k.anim.push(t=>{ const u=t+ph; schwanz.rotation.y=Math.sin(u*9)*.55; kopf.rotation.x=Math.sin(u*.9)>.7?.28:Math.sin(u*1.7)*.05; kopf.position.y=kp[1]+Math.sin(u*2.2)*.015; if(o.laeuft) beine.forEach((b,i)=>b.rotation.z=Math.sin(u*9+[0,3.14,3.14,0][i])*.45); });
  return { g, kopf, beine, schwanz };
}

/* ---------- die zehn neuen Gegenstände (9 und 10 je Raum) ----------
   Fertige Teile der Gegenstand-Beschreibung (r oder kasten, treffer, baue); der Raum ergänzt x, z, steh (und bei Bedarf dreh):
   Object.assign({ x:3, z:4, steh:[3,6] }, ZIRKUS.NEU.laufkugel). Vorderseite zeigt nach +z.
   kasten dreht sich nicht mit: bei gedrehtem Gegenstand einen eigenen, größeren kasten angeben. */
const NEU={
  laufkugel:{ r:1.2, treffer:[2.3,2.5,2.3], baue(g){ /* Raum 1, Nr. 9: große Kugel zum Darauflaufen, liegt in einem Holzring */
    walze(g,.95,.14,HOLZ2,0,.07,0); liegend(ring(g,.78,.17,HOLZ,0,.28,0)); [0,1,2,3,4,5].forEach(i=>{ const a=i*Math.PI/3+.5; ball(g,.09,GOLD,Math.cos(a)*.93,.28,Math.sin(a)*.93); });
    const y=1.38; ball(g,1.08,BLAU,0,y,0);
    liegend(ring(g,1.075,.07,ROT,0,y,0)); [-.62,.62].forEach(h=>{ const r=Math.sqrt(1.08*1.08-h*h); liegend(ring(g,r+.005,.05,GELB,0,y+h,0)); });
    [[0,.3],[2.1,.3],[4.2,.3],[1.05,-.3],[3.15,-.3],[5.25,-.3]].forEach(([a,h])=>{ const q=gruppe(g,0,y,0); q.rotation.y=a; const s=gruppe(q,0,0,0); s.rotation.x=-Math.asin(h/1.09); stern(s,0,0,1.1,.24,CREME); });
    walze(g,.2,.06,GOLD,0,y+1.08,0); } },
  orchesterpult:{ kasten:[2.8,1.5], treffer:[2.8,2.7,1.5], baue(g){ /* Raum 1, Nr. 10: rotes Kapellen-Pult mit Notenständer, darauf liegt vorn die Trompete */
    box(g,2.5,1.0,1.1,ROT,0,.5,0); box(g,2.62,.1,1.2,GOLD,0,1.04,0); box(g,2.62,.1,1.2,GOLD,0,.05,0); [-1.22,1.22].forEach(x=>box(g,.1,1.0,.06,GOLD,x,.52,.56)); stern(g,0,.52,.57,.34,GELB); [-.75,.75].forEach(x=>stern(g,x,.52,.57,.17,CREME));
    /* Notenpult hinten */
    walze(g,.06,1.0,EISEN,-.45,1.55,-.35); const n=gruppe(g,-.45,2.15,-.32); n.rotation.x=-.32; box(n,1.35,.88,.08,HOLZ2,0,0,0); box(n,1.4,.09,.2,HOLZ,0,-.46,.07);
    [-.32,.32].forEach(x=>{ box(n,.58,.72,.02,WEISS,x,.02,.055); for(let i=0;i<4;i++){ const y=.24-i*.16; box(n,.46,.012,.01,0x777777,x,y,.07); [0,1,2].forEach(j=>{ const a=x-.16+j*.16, h=y+((i+j*2)%3-1)*.035; ball(n,.034,SCHWARZ,a,h,.075,1.2,.9,.4); box(n,.012,.11,.01,SCHWARZ,a+.034,h+.055,.075); }); } });
    /* Trompete: Mundstück links, langes Rohr mit Bogen, drei Ventile, weiter Trichter rechts */
    const t=gruppe(g,.12,1.36,.28); t.rotation.y=-.1;
    quer(walze(t,.05,1.45,GOLD,-.1,.08,0)); quer(walze(t,.05,.85,GOLD,-.05,-.17,0));
    [-.47,.37].forEach((x,i)=>{ const b=ring(t,.125,.05,GOLD,x,-.045,0,Math.PI); b.rotation.z=i?-Math.PI/2:Math.PI/2; });
    const tr=rohr(t,.34,.06,.55,mat(GOLD,{side:THREE.DoubleSide}),.88,.08,0,22,true); tr.rotation.z=-Math.PI/2; const rd=ring(t,.34,.035,MESSING,1.155,.08,0); rd.rotation.y=Math.PI/2;
    [-.25,-.08,.09].forEach(x=>{ walze(t,.062,.42,MESSING,x,.04,0); walze(t,.025,.14,GOLD,x,.3,0); ball(t,.06,WEISS,x,.38,0,1,.55,1); });
    quer(rohr(t,.028,.075,.13,WEISS,-.88,.08,0,12)); [-.55,.25].forEach(x=>box(t,.1,.14,.2,HOLZ2,x,-.25,0)); } },
  koffer:{ kasten:[2.7,1.6], treffer:[2.7,2.1,1.6], baue(g){ /* Raum 2, Nr. 9: großer Reisekoffer mit Beschlägen, Riemen und Aufklebern */
    const K=0x2f6a5a, K2=0x1f4a3e;
    [[-1.05,.5],[1.05,.5],[-1.05,-.5],[1.05,-.5]].forEach(([x,z])=>ball(g,.12,EISEN,x,.1,z));
    box(g,2.5,1.1,1.3,K,0,.7,0); box(g,2.52,.07,1.32,K2,0,1.28,0); box(g,2.5,.34,1.3,K,0,1.47,0); quer(walze(g,.65,2.48,K,0,1.6,0)).scale.set(.28,2.48,.65);
    [-.72,.72].forEach(x=>{ box(g,.2,1.52,.05,LEDER,x,.9,.665); quer(walze(g,.65,.2,LEDER,x,1.6,0)).scale.set(.31,.2,.67); box(g,.28,.24,.06,GOLD,x,1.12,.69); box(g,.12,.09,.03,LEDER2,x,1.12,.725); });
    [-1,1].forEach(s=>[.2,1.58].forEach(y=>{ box(g,.26,.26,.07,MESSING,s*1.15,y,.65); [-1,1].forEach(v=>box(g,.07,.26,.2,MESSING,s*1.24,y,v*.57)); }));
    box(g,.3,.34,.07,GOLD,0,1.24,.68); ball(g,.045,SCHWARZ,0,1.22,.72,1,1.5,.5);
    const h=ring(g,.3,.065,LEDER2,0,1.88,0,Math.PI); h.scale.y=.85; [-.3,.3].forEach(x=>box(g,.16,.08,.18,GOLD,x,1.88,0));
    /* Aufkleber */
    liegend(walze(g,.24,.02,GELB,-.28,.62,.665)); stern(g,-.28,.62,.685,.17,ROT);
    const a=box(g,.46,.32,.02,CREME,.28,.52,.665); a.rotation.z=.18; vieleck(g,[[.12,.45,.685],[.3,.66,.685],[.46,.47,.685]],BLAU);
    const b=box(g,.34,.34,.02,ROSA,.25,.94,.665); b.rotation.z=-.25; ball(g,.09,WEISS,.25,.94,.675,1,1,.2);
    const c=box(g,.3,.42,.02,ORANGE,-1.0,.74,.665); c.rotation.z=-.12; } },
  zylinderhase:{ r:.95, treffer:[1.8,3.1,1.8], baue(g){ /* Raum 2, Nr. 10: runder Tisch, darauf ein großer Zylinder, aus dem ein Stoffhase schaut */
    walze(g,.55,.1,HOLZ3,0,.05,0); walze(g,.12,.9,HOLZ2,0,.5,0); walze(g,.88,.1,HOLZ,0,.98,0);
    rohr(g,.9,.96,.26,LILA,0,.88,0,24,true); for(let i=0;i<14;i++){ const a=i*Math.PI/7; ball(g,.06,GOLD,Math.cos(a)*.95,.74,Math.sin(a)*.95); }
    walze(g,.72,.08,0x24202a,0,1.07,0); rohr(g,.48,.44,.74,0x24202a,0,1.46,0,24); walze(g,.455,.17,ROT,0,1.22,0); liegend(ring(g,.48,.04,0x4a4450,0,1.83,0)); walze(g,.44,.02,SCHWARZ,0,1.84,0);
    const F=0xd8c4a8, I=0xf0a8b0;
    ball(g,.34,F,0,2.02,0,1,.85,.95); ball(g,.33,F,0,2.34,.03);
    [-1,1].forEach(s=>{ const o=gruppe(g,s*.15,2.58,0); o.rotation.z=-s*.2; if(s>0){ o.rotation.z=-.55; } ball(o,.13,F,0,.28,0,.85,2.4,.5); ball(o,.075,I,0,.28,.055,.8,2.9,.35);
      ball(g,.065,SCHWARZ,s*.12,2.4,.32); ball(g,.02,WEISS,s*.1,2.42,.38); ball(g,.13,0xf4e8d4,s*.09,2.24,.28,1,.8,.8); ball(g,.13,F,s*.33,1.93,.34,1,.75,1.2); });
    ball(g,.055,I,0,2.3,.39,1.2,.85,.8); box(g,.09,.09,.02,WEISS,0,2.14,.37);
    [-1,1].forEach(s=>[-.03,.05].forEach(v=>strich(g,[s*.12,2.24+v*.3,.36],[s*.45,2.24+v*2,.36],.007,WEISS)));
    /* Flicken mit Naht und Schleife */
    box(g,.14,.12,.02,BLAU,.15,2.53,.28); [-.24,.24].forEach((x,i)=>{ const m=kegel(g,.1,.22,ROT,x*.55,1.9,.52); m.rotation.z=i?Math.PI/2:-Math.PI/2; }); ball(g,.06,ROT,0,1.9,.53);
    stern(g,0,1.5,.5,.14,GELB); } },
  hundekorb:{ kasten:[2.9,2.0], treffer:[2.9,1.7,2.0], baue(g,k){ /* Raum 3, Nr. 9: geflochtenes Körbchen mit Kissen und Hund, davor ein Napf */
    const W=0xb8824a, W2=0x8a5a2c, q=gruppe(g,-.2,0,0), korb=gruppe(q,0,0,0); korb.scale.set(1.3,1,.95);
    walze(korb,.86,.12,W2,0,.06,0); [.16,.3,.44].forEach((y,i)=>liegend(ring(korb,.88+i*.03,.085,i%2?W2:W,0,y,0))); liegend(ring(korb,.96,.1,W,0,.56,0));
    for(let i=0;i<22;i++){ const a=i*Math.PI/11; if(Math.sin(a)>.82) continue; strich(korb,[Math.cos(a)*.9,.08,Math.sin(a)*.9],[Math.cos(a)*1.0,.58,Math.sin(a)*1.0],.032,i%2?W:W2); }
    ball(korb,.84,ROT,0,.24,0,1,.22,1); [[-.45,.3],[.4,-.35],[.45,.35],[-.4,-.4]].forEach(([x,z])=>ball(korb,.07,CREME,x,.4,z,1,.35,1));
    hund(k,q,-.18,0,-.35,1.05,{ pose:'liegt' }).g.position.y=.36;
    /* Napf und Spielknochen */
    rohr(g,.24,.32,.2,BLAU,1.22,.1,.65,18); walze(g,.2,.04,0x8a5a2a,1.22,.2,.65); strich(g,[.7,.08,.88],[.98,.08,.8],.05,WEISS); [[.66,.84],[.7,.93],[.98,.75],[1.02,.85]].forEach(([x,z])=>ball(g,.07,WEISS,x,.08,z)); } },
  schubkarre:{ kasten:[3.4,1.7], treffer:[3.4,2.1,1.7], baue(g){ /* Raum 3, Nr. 10: Schubkarre mit Stroh und Möhren */
    const A=0x3a7ac8, D=0x24507e, rad=gruppe(g,-1.25,.44,0);
    ring(rad,.32,.12,SCHWARZ,0,0,0); liegend(walze(rad,.22,.14,METALL,0,0,0)); liegend(walze(rad,.08,.34,ROT,0,0,0));
    [-1,1].forEach(s=>{ strich(g,[-1.25,.44,s*.2],[-.55,.76,s*.46],.05,METALL2); strich(g,[-.55,.76,s*.46],[.95,.76,s*.5],.06,METALL2); strich(g,[.95,.76,s*.5],[1.55,1.06,s*.56],.055,METALL2); strich(g,[1.38,.98,s*.55],[1.68,1.12,s*.58],.085,SCHWARZ);
      strich(g,[.68,.74,s*.46],[.78,.07,s*.54],.06,METALL2); box(g,.34,.08,.18,METALL2,.78,.05,s*.54); });
    const m=gruppe(g,-.05,1.05,0); m.scale.set(1.35,1,.88); const w=rohr(m,.86,.56,.62,mat(A,{side:THREE.DoubleSide}),0,0,0,4,true); w.rotation.y=Math.PI/4;
    box(g,1.15,.08,.72,D,-.05,.77,0); [-1,1].forEach(s=>{ box(g,1.74,.09,.09,D,-.05,1.37,s*.54); box(g,.09,.09,1.15,D,-.05+s*.84,1.37,0); });
    ball(g,.6,STROH,-.28,1.28,0,1.15,.62,.82); ball(g,.45,STROH2,.32,1.3,0,1.1,.55,.9);
    for(let i=0;i<60;i++){ const x=-.8+(i*.618%1)*1.5, z=-.42+(i*.29%1)*.84, y=1.45+(1-Math.abs(x))*.18; strich(g,[x,y,z],[x+((i%5)-2)*.15,y+.08+(i%4)*.07,z+((i%3)-1)*.18],.015,i%3?0xf8dc80:STROH2); }
    [[.3,.24,.5],[.52,.02,.1],[.12,-.2,-.3]].forEach(([x,z,d])=>{ const c=gruppe(g,x,1.7,z); c.rotation.set(0,d,-1.25); kegel(c,.1,.55,ORANGE,0,0,0).rotation.x=Math.PI; [-1,0,1].forEach(v=>strich(c,[0,.26,0],[v*.14,.52,v*.05],.028,GRUEN)); }); } },
  sprungtuch:{ r:1.55, treffer:[3.1,1.6,3.1], baue(g){ /* Raum 4, Nr. 9: rundes Sprungtuch auf einem Gestell, mit Federn und Ringen */
    for(let i=0;i<8;i++){ const a=i*Math.PI/4+.39, x=Math.cos(a), z=Math.sin(a); strich(g,[x*1.42,.9,z*1.42],[x*1.5,.05,z*1.5],.075,METALL); ball(g,.11,EISEN,x*1.5,.08,z*1.5); }
    liegend(ring(g,1.44,.12,ROT,0,.92,0));
    walze(g,1.08,.05,CREME,0,.9,0); walze(g,.82,.052,ROT,0,.905,0); walze(g,.55,.054,CREME,0,.91,0); walze(g,.3,.056,BLAU,0,.915,0);
    const s=gruppe(g,0,.95,0); s.rotation.x=-Math.PI/2; stern(s,0,0,0,.24,GELB);
    for(let i=0;i<28;i++){ const a=i*Math.PI/14; strich(g,[Math.cos(a)*1.06,.9,Math.sin(a)*1.06],[Math.cos(a)*1.4,.93,Math.sin(a)*1.4],.025,i%2?GOLD:METALL); }
    for(let i=0;i<8;i++){ const a=i*Math.PI/4; ball(g,.09,GELB,Math.cos(a)*1.46,1.04,Math.sin(a)*1.46,1,.6,1); } } },
  glocke:{ kasten:[2.2,1.3], treffer:[2.2,3.5,1.3], baue(g,k){ /* Raum 4, Nr. 10: Glocke im Holzgestell mit langem Zugseil */
    [-.9,.9].forEach(x=>{ box(g,.4,.14,1.1,HOLZ3,x,.07,0); box(g,.2,3.1,.2,HOLZ2,x,1.6,0); [-1,1].forEach(s=>strich(g,[x,.1,s*.48],[x,.8,0],.06,HOLZ)); ball(g,.15,GOLD,x,3.4,0); });
    box(g,2.2,.22,.28,HOLZ,0,3.16,0);
    const gl=gruppe(g,0,3.05,0); gl.userData.lebendig=true;
    ring(gl,.1,.04,EISEN,0,-.08,0); ball(gl,.3,GOLD,0,-.46,0,1,.95,1); rohr(gl,.29,.36,.46,GOLD,0,-.7,0,22); rohr(gl,.36,.45,.16,GOLD,0,-1.01,0,22); rohr(gl,.45,.63,.16,GOLD,0,-1.17,0,22); liegend(ring(gl,.63,.05,MESSING,0,-1.25,0)); liegend(ring(gl,.37,.025,MESSING,0,-.93,0));
    /* großer Klöppel, schaut deutlich unten heraus */
    walze(gl,.045,.28,EISEN,0,-1.36,0); ball(gl,.18,EISEN,0,-1.54,0);
    stern(gl,0,-.7,.36,.13,CREME);
    verschmelze(gl);
    strich(g,[.55,3.16,0],[.55,3.07,.55],.05,HOLZ); ball(g,.07,EISEN,.55,3.07,.55); const s=gruppe(g,.55,3.05,.55); s.userData.lebendig=true; strich(s,[0,0,0],[0,-2.15,0],.04,SEIL); ball(s,.11,SEIL,0,-1.7,0); ball(s,.14,ROT,0,-2.18,0); rohr(s,.07,.18,.34,ROT,0,-2.4,0,14); [-.1,0,.1].forEach(v=>strich(s,[v*.5,-2.35,.1],[v*1.6,-2.66,.14],.018,GELB)); verschmelze(s);
    k.anim.push(t=>{ const w=Math.sin(t*2.2)*(.04+.06*Math.max(0,Math.sin(t*.5))); gl.rotation.z=w; s.rotation.z=-w*.5; }); } },
  drehorgel:{ kasten:[3.0,1.6], treffer:[3.0,2.9,1.6], baue(g,k){ /* Raum 5, Nr. 9: bunte Drehorgel auf zwei Rädern, mit Pfeifen, Kurbel und fliegenden Noten */
    [-1,1].forEach(s=>{ const q=gruppe(g,-.15,.55,s*.68); ring(q,.47,.075,HOLZ3,0,0,0); for(let i=0;i<4;i++){ const a=i*Math.PI/4; strich(q,[Math.cos(a)*.45,Math.sin(a)*.45,0],[-Math.cos(a)*.45,-Math.sin(a)*.45,0],.035,GELB); } liegend(walze(q,.1,.14,ROT,0,0,0)); });
    strich(g,[.65,.78,0],[.75,.05,0],.08,HOLZ2); box(g,.3,.1,.6,HOLZ3,.75,.05,0); [-.4,.4].forEach(z=>{ strich(g,[-.9,.95,z],[-1.4,1.25,z],.055,HOLZ2); }); strich(g,[-1.4,1.25,-.45],[-1.4,1.25,.45],.07,SCHWARZ);
    box(g,1.9,.14,1.15,HOLZ,0,.9,0); box(g,1.75,1.2,.95,ROT,0,1.55,0); box(g,1.88,.14,1.08,GOLD,0,2.2,0); box(g,1.84,.1,1.04,GOLD,0,1.0,0);
    const d=ring(g,.8,.07,GOLD,0,2.25,.42,Math.PI); d.scale.y=.55; vieleck(g,[[-.8,2.26,.4],[-.57,2.57,.4],[0,2.69,.4],[.57,2.57,.4],[.8,2.26,.4]],BLAU); stern(g,0,2.45,.42,.15,GELB);
    box(g,1.35,.82,.04,0x24202a,0,1.56,.49); for(let i=0;i<7;i++){ const h=.66-Math.abs(i-3)*.09, x=-.54+i*.18; walze(g,.065,h,MESSING,x,1.2+h/2,.55); ball(g,.065,GOLD,x,1.2+h,.55); box(g,.07,.025,.03,SCHWARZ,x,1.32,.62); }
    [-.78,.78].forEach(x=>{ box(g,.08,1.14,.04,GOLD,x,1.56,.49); [1.2,1.9].forEach(y=>ball(g,.06,GELB,x,y,.53)); });
    const ku=gruppe(g,.92,1.5,.1); ku.userData.lebendig=true; quer(walze(ku,.09,.14,EISEN,.02,0,0)); strich(ku,[.1,0,0],[.12,.4,0],.045,METALL); quer(walze(ku,.07,.3,HELLHOLZ,.27,.4,0)); verschmelze(ku);
    const noten=[0,1,2].map(i=>{ const n=gruppe(g,0,2.8,.2); n.userData.lebendig=true; const c=[BLAU,GRUEN,LILA][i]; ball(n,.1,c,0,0,0,1.2,.85,.6); box(n,.035,.38,.035,c,.1,.19,0); box(n,.16,.07,.035,c,.17,.35,0); verschmelze(n); return n; });
    k.anim.push(t=>{ ku.rotation.x=t*3.2; noten.forEach((n,i)=>{ const u=(t*.32+i/3)%1; n.position.set(-.6+i*.55+Math.sin(u*6+i)*.2,2.7+u*1.1,.2); const s=Math.sin(u*Math.PI)*.9+.05; n.scale.set(s,s,s); n.rotation.z=Math.sin(u*5+i)*.3; }); }); } },
  zirkuswagen:{ kasten:[5.4,2.6], treffer:[5.2,4.1,2.4], baue(g){ /* Raum 5, Nr. 10: bunter Wohnwagen vom Zirkus mit Speichenrädern, Fenster mit Vorhängen und Runddach (ohne Tür, damit er nicht wie der Ausgang wirkt) */
    [-1.55,1.55].forEach(x=>[-1,1].forEach(s=>{ const r=x<0?.58:.48, q=gruppe(g,x,r,s*1.02); ring(q,r-.08,.09,HOLZ3,0,0,0); for(let i=0;i<4;i++){ const a=i*Math.PI/4+.2; strich(q,[Math.cos(a)*(r-.1),Math.sin(a)*(r-.1),0],[-Math.cos(a)*(r-.1),-Math.sin(a)*(r-.1),0],.035,GELB); } liegend(walze(q,.11,.14,ROT,0,0,0)); }));
    box(g,4.6,.22,1.85,HOLZ2,0,.86,0); box(g,4.4,1.9,1.75,BLAU,0,1.9,0);
    [-1.35,1.35].forEach(x=>box(g,.12,1.9,1.82,GELB,x,1.9,0));
    /* Stirnseiten: blau mit schmalen Eckleisten, Fenster und Stern */
    [-1,1].forEach(s=>{ [-.87,.87].forEach(z=>box(g,.12,1.9,.12,GELB,s*2.19,1.9,z));
      const q=gruppe(g,s*2.2,0,0); q.rotation.y=s*Math.PI/2; box(q,.8,.68,.04,0xffe8a0,0,2.16,.02); box(q,.05,.68,.03,CREME,0,2.16,.05); [1.8,2.16,2.52].forEach(y=>box(q,.92,.07,.07,CREME,0,y,.05)); [-.43,.43].forEach(x=>box(q,.07,.76,.07,CREME,x,2.16,.05)); stern(q,0,1.42,.05,.27,GELB); }); box(g,4.55,.14,1.88,GELB,0,.99,0); box(g,4.55,.14,1.88,GELB,0,2.84,0);
    quer(teil(g,new THREE.CylinderGeometry(1,1,1,18,1,false,0,Math.PI),ROT,0,2.9,0,.62,4.9,1.1));
    [-2.45,-1.2,0,1.2,2.45].forEach(x=>{ const r=ring(g,1,.06,CREME,x,2.9,0,Math.PI); r.rotation.y=Math.PI/2; r.scale.set(1.12,.64,1); });
    box(g,5.0,.12,2.3,GOLD,0,2.9,0); const vo=gruppe(g,0,2.86,1.17); vo.scale.y=.4; volant(vo,-2.45,2.45,0,0,CREME,ROT);
    walze(g,.12,.55,EISEN,1.5,3.6,-.2); walze(g,.19,.1,EISEN,1.5,3.9,-.2);
    /* Fenster mit Läden, Vorhängen und Blumenkasten */
    box(g,1.45,1.0,.06,0xffe8a0,0,1.9,.9); [-.5,.5].forEach(x=>{ vieleck(g,[[x*1.4,2.38,.945],[x*.2,2.38,.945],[x*1.15,1.9,.945],[x*1.4,1.45,.945]],ROSA); });
    box(g,.07,1.0,.05,CREME,0,1.9,.95); [1.38,2.42].forEach(y=>box(g,1.6,.1,.12,CREME,0,y,.94)); [-.76,.76].forEach(x=>box(g,.1,1.1,.12,CREME,x,1.9,.94));
    [-1,1].forEach(s=>{ box(g,.36,1.02,.07,GRUEN,s*1.02,1.9,.94); [1.65,1.9,2.15].forEach(y=>box(g,.26,.05,.03,CREME,s*1.02,y,.99)); stern(g,s*1.77,1.9,.9,.27,GELB); });
    box(g,1.5,.2,.3,ROT,0,1.22,1.02); for(let i=0;i<7;i++){ ball(g,.12,GRUEN,-.6+i*.2,1.36,1.04); ball(g,.075,BUNT[i%5],-.6+i*.2,1.46,1.1); }
    /* Deichsel */
    strich(g,[-2.3,.75,0],[-2.65,.35,0],.06,HOLZ2); ball(g,.09,EISEN,-2.65,.35,0); } }
};
return { ROT, ROT2, GELB, BLAU, BLAU2, GRUEN, ROSA, LILA, TUERKIS, ORANGE, CREME, WEISS, SCHWARZ, GOLD, MESSING, METALL, METALL2, EISEN, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER, LEDER2, STROH, STROH2, SEIL, HAUT, BUNT,
  css, liegend, quer, ohneSchatten, streifenBild, tapetenBild, dielenBild, kornBild, tafel, mauer, vieleck, volant, huelle, faecher, zeltdach, zeltrund, mast, haengt, schnur, lichterkette, wimpel, lichtkegel,
  stern, podest, keule, ballon, popcorn, viele, halme, ballen, zahlenschloss, vorhang, clownin, artistin, trapez, pony, ziege, hund, NEU };
})();

/* Raum 1: Die Manege. Großes rot-weißes Zirkuszelt mit runder Sandmanege, niedrigem Manegenrand, Masten, Zuschauerrängen,
   wandernden Scheinwerfern, Lichterketten, Wimpeln, Clownin Lulu, einer Artistin und einem Zirkushund.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Laufkugel) und 10 (Orchesterpult) sind neu.
   Ausgang: der rotgoldene Vorhang in der Rückwand rafft sich zu beiden Seiten, dahinter ein heller Gang. */
RAEUME3D.zirkus[0] = (function(){
const Z=ZIRKUS;
const { ROT, ROT2, GELB, BLAU, BLAU2, GRUEN, ROSA, LILA, TUERKIS, ORANGE, CREME, WEISS, SCHWARZ, GOLD, MESSING, METALL, METALL2, EISEN, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, SEIL, BUNT, liegend, quer, ohneSchatten, vieleck, stern } = Z;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const MX=0, MZ=-.8, MR=10.6; /* Mitte und Radius der Manege */

/* ---------- Bilder ---------- */
function gangBild(){
  return bild(256,300,(g)=>{ const v=g.createRadialGradient(128,170,10,128,170,210); v.addColorStop(0,'#fffbe6'); v.addColorStop(.45,'#ffe08a'); v.addColorStop(1,'#e8703a'); g.fillStyle=v; g.fillRect(0,0,256,300);
    g.fillStyle='rgba(255,255,255,.35)'; for(let i=0;i<12;i++){ const a=i*Math.PI/6; g.beginPath(); g.moveTo(128,170); g.lineTo(128+Math.cos(a)*260,170+Math.sin(a)*260); g.lineTo(128+Math.cos(a+.17)*260,170+Math.sin(a+.17)*260); g.fill(); }
    g.fillStyle='#fff'; for(let i=0;i<26;i++){ const x=(i*97)%250, y=(i*53)%200; g.beginPath(); g.arc(x,y,2+i%3,0,7); g.fill(); } });
}
/* Zirkusplakat ohne Schrift: Zelt mit Fahne, Sterne, bunte Bälle */
function plakatBild(){
  return bild(384,480,(g)=>{ g.fillStyle='#fbf0d4'; g.fillRect(0,0,384,480);
    const v=g.createLinearGradient(0,0,0,360); v.addColorStop(0,'#2a4aa8'); v.addColorStop(1,'#7ac0ee'); g.fillStyle=v; g.fillRect(18,18,348,444);
    const sternM=(x,y,r,c)=>{ g.fillStyle=c; g.beginPath(); for(let i=0;i<10;i++){ const a=i*Math.PI/5-Math.PI/2, d=i%2?r*.45:r; g.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d); } g.fill(); };
    [[64,70,28],[322,78,34],[96,150,15],[304,166,14],[262,52,13],[130,56,11]].forEach(s=>sternM(s[0],s[1],s[2],'#ffd83a'));
    g.fillStyle='#5aa84a'; g.fillRect(18,370,348,92);
    for(let i=0;i<8;i++){ g.fillStyle=i%2?'#fff6e0':'#d8322a'; g.beginPath(); g.moveTo(192,112); g.lineTo(46+i*36.5,248); g.lineTo(82.5+i*36.5,248); g.fill(); g.fillRect(68+i*31,248,31.5,132); }
    for(let i=0;i<8;i++){ g.fillStyle=i%2?'#d8322a':'#f4c430'; g.beginPath(); g.arc(64+i*36.5,250,18,0,Math.PI); g.fill(); }
    g.fillStyle='#4a1420'; g.beginPath(); g.moveTo(192,268); g.lineTo(240,380); g.lineTo(144,380); g.fill();
    g.strokeStyle='#4a2a10'; g.lineWidth=5; g.beginPath(); g.moveTo(192,114); g.lineTo(192,62); g.stroke(); g.fillStyle='#f4c430'; g.beginPath(); g.moveTo(194,62); g.lineTo(242,76); g.lineTo(194,94); g.fill();
    [[70,420,26,'#e8413a'],[136,436,22,'#f4c430'],[252,432,24,'#e86ab8'],[318,414,27,'#3a6ad8']].forEach(b=>{ g.fillStyle=b[3]; g.beginPath(); g.arc(b[0],b[1],b[2],0,7); g.fill(); g.fillStyle='rgba(255,255,255,.6)'; g.beginPath(); g.arc(b[0]-8,b[1]-8,6,0,7); g.fill(); });
    sternM(192,432,25,'#ffffff'); });
}

/* ---------- Ausgang: der rotgoldene Vorhang ---------- */
function baueAusgang(k,sc,hinten){
  const gang=gruppe(hinten,0,0,0);
  box(gang,4.1,.1,4.2,0xe8b878,0,-.045,-15.6);
  box(gang,1.7,.012,4.1,ROT,0,.012,-15.6); [-.92,.92].forEach(x=>box(gang,.14,.016,4.1,GOLD,x,.014,-15.6));
  [-1,1].forEach(s=>{ box(gang,.16,4.6,3.9,0xf0b060,s*2.12,2.3,-15.7); [-14.6,-15.8,-17.0].forEach((z,i)=>{ ball(gang,.13,basis([0xfff0a0,0xff9ac8,0x9ad8ff][i]),s*1.98,3.3,z); }); stern(gang,s*1.5,2.6+s*.5,-17.55,.3,GELB); });
  const f=new THREE.Mesh(new THREE.PlaneGeometry(4.4,4.7),new THREE.MeshBasicMaterial({map:gangBild()})); f.position.set(0,2.35,-17.68); gang.add(f);
  verschmelze(gang); ohneSchatten(gang); gang.visible=false;

  /* fester Rahmen: goldene Säulen mit Lampen, roter Bogen mit Zacken und Stern */
  const r=gruppe(hinten,0,0,0);
  [-1,1].forEach(s=>{ const x=s*2.34; walze(r,.19,4.6,GOLD,x,2.3,-13.2); walze(r,.3,.3,ROT2,x,.15,-13.2); liegend(ring(r,.27,.06,GOLD,x,.32,-13.2));
    for(let y=.7;y<4.4;y+=.5){ const q=liegend(ring(r,.195,.04,ROT,x,y,-13.2)); q.rotation.y=.35; }
    ball(r,.25,GOLD,x,4.78,-13.2); ball(r,.17,basis(0xfff2b0),x,5.12,-13.2); });
  box(r,4.7,.5,.36,ROT2,0,4.72,-13.3); box(r,4.8,.09,.42,GOLD,0,5.0,-13.28); box(r,4.5,.07,.42,GOLD,0,4.5,-13.26);
  for(let i=0;i<7;i++){ const x=-1.8+i*.6; vieleck(r,[[x-.3,4.5,-13.07],[x+.3,4.5,-13.07],[x+.17,4.22,-13.07],[x,4.13,-13.07],[x-.17,4.22,-13.07]],i%2?GELB:ROT); ball(r,.06,GOLD,x,4.1,-13.06); }
  [-1.5,-.75,.75,1.5].forEach(x=>stern(r,x,4.73,-13.1,.15,CREME));
  stern(r,0,5.28,-13.18,.52,GELB); stern(r,0,5.28,-13.16,.27,CREME);
  verschmelze(r);

  /* zwei Vorhanghälften, außen aufgehängt */
  const haelften=[-1,1].map(s=>{ const q=gruppe(hinten,s*2.14,0,-13.38); q.userData.lebendig=true; const v=Z.vorhang(q,-s*1.07,0,0,2.14,4.55,ROT,ROT2);
    box(v,.09,4.4,.05,GOLD,-s*1.01,2.28,.22);
    [[-.55,3.5],[.35,2.9],[-.15,1.3],[.5,.95],[-.6,.8]].forEach(([a,y])=>stern(v,a,y,.25,.13,GELB));
    verschmelze(v); ohneSchatten(v); return q; });
  /* goldene Raffbänder, erscheinen beim Öffnen */
  const raff=[-1,1].map(s=>{ const q=gruppe(hinten,s*1.9,2.0,-13.1); box(q,.62,.18,.14,GOLD,0,0,0); ball(q,.12,GOLD,-s*.2,-.12,.06); strich(q,[-s*.2,-.15,.06],[-s*.24,-.55,.08],.05,GELB); verschmelze(q); q.visible=false; return q; });
  /* Goldkordel mit blauem Schild und großem Zahlenschloss */
  const schl=gruppe(hinten,0,0,-13.05); schl.userData.lebendig=true;
  [-1,1].forEach(s=>{ strich(schl,[s*2.05,2.75,-.05],[s*.8,2.3,.02],.06,GOLD); ball(schl,.12,GOLD,s*2.05,2.75,-.02); });
  liegend(walze(schl,.95,.08,BLAU2,0,2.2,0)); ring(schl,.95,.08,GOLD,0,2.2,.04);
  [0,1,2,3,4,5,6,7].forEach(i=>{ const a=i*Math.PI/4+.39; ball(schl,.055,CREME,Math.cos(a)*.79,2.2+Math.sin(a)*.79,.06,1,1,.4); });
  const zs=Z.zahlenschloss(schl,0,2.04,.18); zs.scale.setScalar(1.4);
  verschmelze(schl);
  const schimmer=schein(schl,'rgba(255,225,120,.45)',0,2.2,.5,1.8);

  const licht=new THREE.PointLight(0xffe8b0,0,12,1.5); licht.position.set(0,3,-14.8); sc.add(licht);
  k.kasten(0,-13.15,5.3,.7);
  return ausgang(k,{ name:'Roter Vorhang', einfach:'Roter Vorhang', steh:[1.35,-11.4], durch:[.15,-15.6],
    treffer:{x:0,y:2.35,z:-12.95,b:4.4,h:4.7,t:.8}, schildOben:[0,4.5,-12.1], glanz:[0,2.2,-12.4],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.06)/.88)), w=a*a*(3-2*a);
      haelften.forEach((q,i)=>{ q.scale.x=1-.78*w; q.rotation.y=Math.sin(t*1.3+i*2)*.012*(1-w); });
      raff.forEach(q=>q.visible=w>.75);
      schl.position.y=w*3.2; schl.visible=auf<.4; gang.visible=auf>.02; licht.intensity=1.8*auf;
      const g=1.7+Math.sin(t*2.2)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Manege: Sandkreis, flacher rot-weißer Rand mit kleinen Lampen ---------- */
function manege(k,sc){
  const tex=Z.kornBild('#e2b678',['rgba(255,240,200,.55)','rgba(150,95,40,.28)','rgba(250,215,150,.5)']);
  tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.repeat.set(4,4);
  const kreis=new THREE.Mesh(new THREE.CircleGeometry(MR,64),new THREE.MeshLambertMaterial({map:tex})); kreis.rotation.x=-Math.PI/2; kreis.position.set(MX,.008,MZ); kreis.receiveShadow=true; sc.add(kreis);
  const g=gruppe(sc,0,0,0), N=44, L=2*Math.PI*MR/N, lampen=[basis(0xffe27a),basis(0x8ad8ff),basis(0xff9ac8)];
  for(let i=0;i<N;i++){ const a=(i+.5)*Math.PI*2/N, x=MX+Math.sin(a)*MR, z=MZ+Math.cos(a)*MR;
    if(Math.abs(a-Math.PI)<.23) continue; /* Lücke vor dem Vorhang */
    const q=box(g,L-.06,.12,.46,i%2?WEISS:ROT,x,.06,z); q.rotation.y=a; q.castShadow=false;
    if(i%2) ball(g,.075,lampen[(i>>1)%3],x,.15,z).castShadow=false; }
  /* großer aufgemalter Stern in der Mitte */
  const stFlach=(r,c,y)=>{ const P=[[MX,y,MZ+.6]]; for(let i=0;i<=10;i++){ const a=i*Math.PI/5, d=i%2?r*.45:r; P.push([MX+Math.sin(a+Math.PI)*d,y,MZ+.6+Math.cos(a+Math.PI)*d]); } vieleck(g,P,c); };
  stFlach(2.7,0xc8503a,.016); stFlach(2.1,0xeac890,.022);
  verschmelze(g); ohneSchatten(g);
  /* Sägespäne und Konfetti */
  const L2=[]; for(let i=0;i<260;i++){ const a=zufall()*6.28, d=Math.sqrt(zufall())*(MR-.5); L2.push([MX+Math.sin(a)*d,.022,MZ+Math.cos(a)*d,.09+zufall()*.07,.008,.05,i%3?(i%2?0xf8d898:0xc89458):BUNT[i%5],zufall()*3.14]); }
  Z.viele(sc,GEO.box,L2);
}

/* ---------- Zuschauer: Bankreihen mit Leuten. Eigene Richtung: Blick nach +z, Wand bei z=0, Länge entlang x ---------- */
function tribuene(k,wandG,x,z,dreh,laenge,phase){
  const q=gruppe(wandG,x,0,z); q.rotation.y=dreh;
  const fest=gruppe(q,0,0,0);
  [0,1,2].forEach(i=>{ const h=.5+(2-i)*.62, zz=.4+i*.72;
    box(fest,laenge,h,.7,i%2?BLAU2:0x2a3a78,0,h/2,zz);
    box(fest,laenge+.1,.12,.74,HELLHOLZ,0,h+.05,zz);
    box(fest,laenge,.1,.04,GOLD,0,h-.1,zz+.37); });
  /* Geländer vorn */
  box(fest,laenge+.1,.12,.14,ROT,0,.92,2.35); box(fest,laenge,.05,.16,GOLD,0,1.0,2.35);
  const n=Math.floor(laenge/.5); for(let i=0;i<=n;i++){ const a=-laenge/2+i*laenge/n; walze(fest,.045,.9,i%2?WEISS:ROT,a,.45,2.35); }
  [-1,1].forEach(s=>{ box(fest,.16,2.0,.18,ROT2,s*(laenge/2+.06),1.0,.4); ball(fest,.15,GOLD,s*(laenge/2+.06),2.15,.4); });
  verschmelze(fest);
  /* Leute in zwei Gruppen, die abwechselnd hüpfen; grobe Körper, damit das Publikum wenig Rechenleistung braucht */
  const RUND=new THREE.SphereGeometry(1,10,7), KLEIN=new THREE.SphereGeometry(1,6,4), ARM=new THREE.CylinderGeometry(1,1,1,6);
  const K=[[],[]], F=[[],[]], A=[[],[]];
  const haut=[0xf1c7a0,0xd8a070,0xa86e48,0xf6d4b4], haar=[0x3a2010,0xc89038,0x1c1410,0x9a4a1c,0xd8d0c8], hemd=[0xe8413a,0xf4c430,0x3aa0e8,0x5ac85a,0xe86ab8,0xf08a30,0x9a5ad8,0xf4ecd8];
  let m=0;
  [0,1,2].forEach(i=>{ const h=.61+(2-i)*.62, zz=.42+i*.72;
    for(let a=-laenge/2+.5+(i%2)*.3;a<laenge/2-.35;a+=.92){ m++; if((m*7)%11===3) continue; const g=m%2, gr=.9+((m*13)%5)*.05, c=hemd[(m*5+i)%8], ht=haut[(m*3)%4], x2=a+((m*17)%5-2)*.04;
      K[g].push([x2,h+.28*gr,zz,.25*gr,.34*gr,.2*gr,c]); K[g].push([x2,h+.78*gr,zz,.19*gr,.2*gr,.19*gr,ht]);
      K[g].push([x2,h+.9*gr,zz-.05,.21*gr,.14*gr,.2*gr,haar[(m*11)%5]]);
      [-1,1].forEach(s=>{ F[g].push([x2+s*.07*gr,h+.8*gr,zz+.175*gr,.028,.032,.02,0x1c120a]);
        const hoch=(m%4===0); A[g].push([x2+s*(hoch?.31:.25)*gr,h+(hoch?.62:.3)*gr,zz+.02,.06,.4*gr,.06,c,0,0,hoch?-s*.55:s*.4]);
        F[g].push([x2+s*(hoch?.42:.33)*gr,h+(hoch?.82:.11)*gr,zz+.03,.075,.075,.075,ht]); });
      F[g].push([x2,h+.71*gr,zz+.17*gr,.06,.022,.02,0xa83a30]);
    } });
  [0,1].forEach(i=>{ const p=gruppe(q,0,0,0); p.userData.lebendig=true; Z.viele(p,RUND,K[i]).receiveShadow=false; Z.viele(p,KLEIN,F[i]).receiveShadow=false; Z.viele(p,ARM,A[i]).receiveShadow=false;
    k.anim.push(t=>{ p.position.y=Math.max(0,Math.sin(t*3.1+i*3.14+phase))*.07; }); });
}

/* ---------- Deko ---------- */
/* Stapel aus bunten Bauklötzen mit Sternen */
function kloetze(k,g,x,z,dreh){
  const q=gruppe(g,x,0,z); q.rotation.y=dreh;
  [[-.5,.45,0,.9,TUERKIS,.1],[.5,.4,.05,.8,ORANGE,-.15],[-.05,1.22,0,.72,LILA,.35]].forEach(([a,y,c,s,f,d])=>{ const w=gruppe(q,a,y,c); w.rotation.y=d; box(w,s,s,s,f,0,0,0); stern(w,0,0,s/2+.012,s*.34,CREME); });
  ball(q,.28,ROT,-.05,1.85,0); liegend(ring(q,.285,.035,GELB,-.05,1.85,0));
  k.kreis(x,z,1.05);
}
/* Pflanzkübel aus Ton mit viel Grün und wenigen flachen Blüten */
function kuebel(k,g,x,z,gr){
  const q=gruppe(g,x,0,z); q.scale.setScalar(gr);
  rohr(q,.55,.36,.75,0xb8643a,0,.375,0,14); liegend(ring(q,.56,.08,0x9a4e2a,0,.75,0)); walze(q,.48,.04,0x4a2e1a,0,.76,0);
  ball(q,.46,0x3f8a3a,0,1.05,0,1,.85,1);
  for(let i=0;i<11;i++){ const a=i*2*Math.PI/11, w=gruppe(q,0,.98+(i%3)*.12,0); w.rotation.y=a; const blatt=ball(w,.24,i%2?0x2f7a32:0x58a844,.46,.05,0,1.6,.22,.7); blatt.rotation.z=.25+(i%3)*.2; }
  [0,1,2,3,4].forEach(i=>{ const a=-.3+i*1.26, w=gruppe(q,Math.sin(a)*.27,1.42-(i%2)*.04,Math.cos(a)*.27); w.rotation.set(Math.cos(a)*.45,0,-Math.sin(a)*.45);
    ball(w,.13,i%2?0xffffff:0xff9ac8,0,0,0,1,.22,1); ball(w,.045,0xffc21a,0,.035,0,1,.6,1); });
  [[-.18,1.55,-.05],[.2,1.6,.05],[0,1.68,-.15]].forEach(([a,y,c])=>kegel(q,.09,.42,0x58a844,a,y,c));
  k.kreis(x,z,.62*gr);
}
/* kleine Bodenlampe auf einem Standbügel: helles, nach vorn offenes Gehäuse, das in die Manege leuchtet (flach, am Rand) */
function bodenlampe(k,g,x,z,c){
  const q=gruppe(g,x,0,z); q.rotation.y=Math.atan2(MX-x,MZ-z);
  box(q,.74,.07,.36,METALL,0,.035,0);
  [-1,1].forEach(s=>{ box(q,.06,.44,.1,METALL2,s*.35,.27,0); ball(q,.065,GOLD,s*.39,.44,0); });
  const w=gruppe(q,0,.44,0); w.rotation.x=-.5;
  const t=rohr(w,.32,.17,.36,0xdfe8f0,0,0,.02,16); t.rotation.x=Math.PI/2; ball(w,.17,0xdfe8f0,0,0,-.16,1,1,.6);
  liegend(walze(w,.28,.02,basis(c),0,0,.21)); ring(w,.31,.035,GOLD,0,0,.21);
  schein(q,'rgba(255,245,200,.55)',0,.56,.34,.95);
  k.kreis(x,z,.45);
}
/* Wandschmuck: rundes Medaillon mit Stern, Blick nach +z */
function medaillon(g,x,y,z,c){
  liegend(walze(g,.7,.08,c,x,y,z)); ring(g,.7,.075,GOLD,x,y,z+.04); stern(g,x,y,z+.06,.46,GELB);
  [-1,1].forEach(s=>{ vieleck(g,[[x+s*.35,y-.6,z],[x+s*.75,y-1.35,z],[x+s*.4,y-1.2,z],[x+s*.2,y-1.45,z],[x+s*.08,y-.66,z]],s<0?GELB:BLAU); });
}

/* ---------- Gegenstände (Reihenfolge = ort 1 bis 10) ---------- */
const gegenstaende=[
  { x:-6.0, z:-5.6, steh:[-5.8,-3.6], r:1.2, treffer:[2.3,1.9,2.3], baue(g){ /* 1 rotes Manegen-Podest */
      Z.podest(g,0,0,1.15,1.35,ROT);
      for(let i=0;i<12;i++){ const a=i*Math.PI/6+.26; ball(g,.065,GOLD,Math.sin(a)*1.12,.24,Math.cos(a)*1.12); }
      [-1,1].forEach(s=>{ const q=gruppe(g,0,0,0); q.rotation.y=s*.9; stern(q,0,.72,1.09,.22,GELB); });
      walze(g,.7,.03,ROT,0,1.42,0);
      const o=gruppe(g,0,1.445,0); o.rotation.x=-Math.PI/2; stern(o,0,0,0,.52,GELB); } },
  { x:6.0, z:-5.6, steh:[5.8,-3.6], r:1.0, treffer:[1.8,2.7,1.3], baue(g){ /* 2 Einrad in einem kleinen Holzständer */
      const y=.8;
      box(g,1.5,.1,.9,HOLZ2,0,.05,0); [-1,1].forEach(s=>{ box(g,.75,.28,.14,HOLZ,0,.22,s*.24); [-.36,.36].forEach(x=>ball(g,.055,GOLD,x,.22,s*.33)); });
      ring(g,.66,.115,SCHWARZ,0,y,0); ring(g,.52,.045,0xdce4ec,0,y,0);
      for(let i=0;i<6;i++){ const a=i*Math.PI/6+.1; strich(g,[Math.cos(a)*.52,y+Math.sin(a)*.52,0],[-Math.cos(a)*.52,y-Math.sin(a)*.52,0],.018,0xc8d0d8); }
      liegend(walze(g,.12,.5,METALL2,0,y,0)); liegend(walze(g,.14,.18,ROT,0,y,0));
      [-1,1].forEach(s=>{ strich(g,[0,y,s*.23],[0,1.6,s*.2],.055,BLAU); ball(g,.07,GOLD,0,y,s*.27);
        strich(g,[0,y,s*.29],[s*.3,y-s*.17,s*.3],.045,METALL); box(g,.32,.09,.22,ROT,s*.33,y-s*.19,s*.42); box(g,.26,.1,.04,GELB,s*.33,y-s*.19,s*.54); });
      box(g,.18,.14,.48,BLAU,0,1.6,0); strich(g,[0,1.6,0],[0,2.2,0],.065,BLAU); liegend(ring(g,.085,.03,GOLD,0,1.9,0));
      /* Sattel: lang, geschwungen */
      ball(g,.26,SCHWARZ,0,2.27,0,1.7,.45,.85); [-1,1].forEach(s=>{ const m=ball(g,.17,SCHWARZ,s*.45,2.37,0,1.35,.55,.85); m.rotation.z=s*.45; });
      box(g,.5,.04,.4,GOLD,0,2.17,0); } },
  { x:7.4, z:2.6, steh:[7.2,4.5], r:1.2, treffer:[2.3,2.4,2.3], baue(g){ /* 3 große Trommel mit zwei Schlägeln */
      [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78; box(g,.28,.2,.28,HOLZ3,Math.cos(a)*.75,.1,Math.sin(a)*.75); });
      rohr(g,1.05,1.05,1.2,0x2f62d0,0,.8,0,32);
      [.24,1.38].forEach(y=>{ liegend(ring(g,1.07,.11,ROT,0,y,0)); liegend(ring(g,1.1,.025,GOLD,0,y+(y<1?.11:-.11),0)); });
      walze(g,1.0,.08,0xf8eed4,0,1.43,0); liegend(ring(g,.55,.014,0xd8c8a0,0,1.475,0));
      for(let i=0;i<16;i++){ const a=i*Math.PI/8, b=(i+1)*Math.PI/8, u=i%2?1.28:.36, v=i%2?.36:1.28; strich(g,[Math.sin(a)*1.085,u,Math.cos(a)*1.085],[Math.sin(b)*1.085,v,Math.cos(b)*1.085],.028,CREME); ball(g,.065,GOLD,Math.sin(a)*1.1,u,Math.cos(a)*1.1); }
      stern(g,.2,.8,1.12,.22,GELB);
      /* Schlägel liegen schräg auf dem Fell und ragen nach oben */
      [-1,1].forEach(s=>{ strich(g,[-s*.35,1.52,.35],[s*.75,2.12,-.3],.05,HELLHOLZ); ball(g,.2,ROT,s*.75,2.12,-.3); const w=ring(g,.2,.025,CREME,s*.75,2.12,-.3); w.rotation.y=s*.9; }); } },
  { x:-8.0, z:1.8, steh:[-7.8,3.9], kasten:[3.6,2.0], treffer:[3.5,2.6,1.9], baue(g,k){ /* 4 kleines offenes Clownsauto, Front nach +x */
      /* Räder */
      [-1.05,1.05].forEach(x=>[-1,1].forEach(s=>{ const q=gruppe(g,x,.48,s*.76); ring(q,.34,.13,SCHWARZ,0,0,0); liegend(walze(q,.26,.16,ROT,0,0,0)); liegend(walze(q,.09,.24,WEISS,0,0,0)); for(let i=0;i<4;i++){ const a=i*Math.PI/2+.78; ball(q,.045,GELB,Math.cos(a)*.17,Math.sin(a)*.17,s*.11); }
        const f=ring(g,.52,.07,ROT,x,.5,s*.76,Math.PI); f.castShadow=true; }));
      /* Wanne: Boden, Seiten, Haube und Heck */
      box(g,3.0,.22,1.3,0xd8a020,0,.55,0);
      [-1,1].forEach(s=>{ box(g,1.25,.62,.14,GELB,-.25,.95,s*.6); box(g,1.3,.09,.18,ROT,-.25,1.3,s*.6); });
      box(g,.95,.66,1.34,GELB,.92,.95,0); ball(g,.66,GELB,1.33,.93,0,.55,.52,1); quer(walze(g,.42,.9,GELB,.92,1.12,0)).scale.set(.21,.9,.65);
      box(g,.72,.78,1.34,GELB,-1.2,1.0,0); ball(g,.67,GELB,-1.52,1.0,0,.35,.6,1);
      /* Sitz und Lehne, Lenkrad, Windschutzscheibe */
      box(g,.7,.2,1.02,ROT,-.45,.85,0); box(g,.22,.85,1.02,ROT,-.82,1.32,0); [-.25,.25].forEach(z=>box(g,.04,.7,.07,CREME,-.7,1.35,z));
      strich(g,[.48,1.0,.18],[.14,1.52,.18],.035,EISEN); const l=ring(g,.25,.05,SCHWARZ,.12,1.55,.18); l.rotation.set(0,Math.PI/2,0); l.rotation.z=.55;
      [-1,1].forEach(s=>strich(g,[.52,1.25,s*.6],[.38,2.05,s*.6],.045,METALL)); strich(g,[.38,2.05,-.6],[.38,2.05,.6],.045,METALL);
      const sch=new THREE.Mesh(GEO.box,mat(0xbfe8ff,{transparent:true,opacity:.4,depthWrite:false})); sch.scale.set(.03,.68,1.16); sch.position.set(.455,1.68,0); sch.rotation.z=.17; g.add(sch);
      /* Lichter, Stoßstangen, rote Nase vorn */
      [-.42,.42].forEach(z=>{ ball(g,.19,0xfff6c0,1.66,1.04,z,.7,1,1); const q=ring(g,.19,.035,METALL,1.7,1.04,z); q.rotation.y=Math.PI/2; });
      ball(g,.19,ROT,1.8,.82,0); strich(g,[1.74,.55,-.62],[1.74,.55,.62],.075,METALL); strich(g,[-1.68,.55,-.62],[-1.68,.55,.62],.075,METALL);
      [-.45,.45].forEach(z=>ball(g,.09,ROT,-1.76,1.0,z,.5,1,1));
      /* Punkte, Stern und Hupe */
      [[-1.3,1.05,.19,BLAU],[-1.05,.78,.1,GRUEN],[.72,.85,.16,ROSA],[1.13,1.07,.11,BLAU],[-.55,.9,.12,GRUEN]].forEach(([x,y,r,c])=>liegend(walze(g,r,.03,c,x,y,.675)));
      stern(g,-.05,.95,.685,.24,ROT);
      ball(g,.15,SCHWARZ,.32,1.38,.72); const h=rohr(g,.04,.17,.4,GOLD,.58,1.4,.72,14); h.rotation.z=-Math.PI/2;
      /* Antenne mit drehender Blume */
      strich(g,[-1.45,1.35,-.45],[-1.55,2.25,-.45],.025,GRUEN); const b=gruppe(g,-1.55,2.35,-.42); b.userData.lebendig=true;
      for(let i=0;i<6;i++){ const a=i*Math.PI/3; ball(b,.13,ROSA,Math.cos(a)*.17,Math.sin(a)*.17,0,1,1,.35); } ball(b,.1,GELB,0,0,.05); verschmelze(b);
      k.anim.push(t=>{ b.rotation.z=t*1.4; }); } },
  { x:-7.6, z:HINTEN, wand:'hinten', steh:[-7.6,-11.4], kasten:[3.2,1.5], treffer:[3.1,4.0,1.3], trefferY:1.0, baue(g,k){ /* 5 tief hängendes Trapez mit Zettel */
      /* blaues Sternenrund als Hintergrund */
      liegend(walze(g,1.7,.06,BLAU2,0,3.0,.05)); ring(g,1.7,.08,GOLD,0,3.0,.1);
      [[-1.0,3.9,.2],[.95,4.0,.14],[.1,4.3,.11],[-.25,3.35,.13],[.45,2.75,.1],[-1.15,2.9,.1],[1.2,3.05,.17],[-.6,1.85,.14],[.75,1.75,.12]].forEach(([x,y,r],i)=>stern(g,x,y,.12,r,i%2?CREME:GELB));
      /* Balken oben */
      box(g,2.6,.22,.3,HOLZ2,0,5.15,.3); [-1.05,1.05].forEach(x=>{ strich(g,[x,5.7,.05],[x,5.2,.3],.06,EISEN); ball(g,.13,GOLD,x,5.15,.5); });
      const s=gruppe(g,0,5.15,.5); s.userData.lebendig=true;
      [-1.05,1.05].forEach(x=>{ strich(s,[x,0,0],[x,-3.1,0],.06,SEIL); ball(s,.12,GOLD,x,-3.1,0); [-.7,-1.5,-2.3].forEach(y=>ball(s,.08,ROT,x,y,0));
        strich(s,[x*1.24,-3.15,0],[x*1.3,-3.55,0],.022,GELB); ball(s,.09,GELB,x*1.3,-3.58,0,1,1.5,1); });
      quer(walze(s,.12,2.55,ROT,0,-3.1,0)); [-.82,-.55,.55,.82].forEach(x=>quer(walze(s,.132,.13,WEISS,x,-3.1,0)));
      /* Zettel um die Stange gewickelt */
      quer(walze(s,.17,.52,0xfff6d8,0,-3.1,0)); const z=box(s,.46,.48,.025,0xfff6d8,0,-3.43,.13); z.rotation.z=.08;
      [-.05,-.17,-.29].forEach((y,i)=>box(s,.3-(i%2)*.07,.024,.01,0x5a6a9a,.005,-3.34+y,.15));
      verschmelze(s);
      k.anim.push(t=>{ s.rotation.x=Math.sin(t*1.5)*.035; }); } },
  { x:7.6, z:HINTEN, wand:'hinten', steh:[7.6,-11.4], kasten:[3.2,.9], treffer:[3.0,3.9,.9], trefferY:1.0, baue(g){ /* 6 Zirkusplakat mit Goldrahmen */
      const y=3.0;
      const p=new THREE.Mesh(new THREE.PlaneGeometry(2.56,3.2),new THREE.MeshLambertMaterial({map:plakatBild(),emissive:0x201810})); p.position.set(0,y,.17); g.add(p);
      box(g,2.7,3.34,.1,HOLZ3,0,y,.08);
      [-1,1].forEach(s=>{ box(g,2.92,.2,.2,GOLD,0,y+s*1.68,.14); box(g,.2,3.5,.2,GOLD,s*1.36,y,.14); [-1,1].forEach(v=>{ ball(g,.18,ROT,s*1.36,y+v*1.68,.26,1,1,.6); ball(g,.07,GELB,s*1.36,y+v*1.68,.37); }); });
      /* Bilderlampe oben */
      strich(g,[0,y+1.75,.1],[0,y+2.05,.5],.04,MESSING); quer(walze(g,.1,1.1,MESSING,0,y+2.05,.52)); quer(walze(g,.05,.95,basis(0xfff0b0),0,y+1.97,.55)); } },
  { x:13.2, z:-5.0, steh:[12.8,-3.0], kasten:[2.8,1.3], treffer:[2.8,3.4,1.3], baue(g){ /* 7 Reifenständer */
      [-1.2,1.2].forEach(x=>{ box(g,.24,.14,1.15,HOLZ3,x,.07,0); box(g,.18,3.0,.18,HOLZ,x,1.55,-.18); [-1,1].forEach(s=>strich(g,[x,.1,s*.48],[x,.75,-.18],.055,HOLZ2)); ball(g,.17,GOLD,x,3.17,-.18); });
      box(g,2.65,.18,.2,HOLZ2,0,2.9,-.18); box(g,2.4,.12,.12,HOLZ2,0,.45,-.18);
      [[-.7,ROT,.02],[0,GRUEN,.24],[.7,BLAU,.46]].forEach(([x,c,z],i)=>{ strich(g,[x,2.9,-.18],[x,2.92,z+.1],.055,GOLD); ball(g,.085,GOLD,x,2.92,z+.12);
        const y=2.92-.66; ring(g,.66,.085,c,x,y,z);
        for(let j=0;j<8;j++){ const a=j*Math.PI/4+i*.3; if(Math.sin(a)>.9) continue; const w=ring(g,.66,.098,j%2?GELB:CREME,x,y,z,.16); w.rotation.z=a; } });
      /* vierter Reifen lehnt unten */
      const q=gruppe(g,.15,.55,.55); q.rotation.x=-.3; ring(q,.5,.075,ORANGE,0,0,0); for(let j=0;j<6;j++){ const w=ring(q,.5,.087,LILA,0,0,0,.2); w.rotation.z=j*Math.PI/3; }
      /* Bänder am Balken */
      [-1.2,1.2].forEach(x=>[[ROSA,-.12],[TUERKIS,.12]].forEach(([c,d])=>vieleck(g,[[x,3.0,-.06],[x+d-.07,2.2,-.04],[x+d,2.34,-.04],[x+d+.07,2.16,-.04]],c))); } },
  { x:2.8, z:5.4, steh:[2.6,7.3], kasten:[2.6,1.8], treffer:[2.5,1.8,1.7], baue(g){ /* 8 Kiste mit Jonglierbällen */
      const x0=0;
      box(g,2.2,.14,1.35,HOLZ2,x0,.07,0);
      [-1,1].forEach(s=>{ [.24,.52,.8].forEach(y=>{ box(g,2.2,.24,.1,HELLHOLZ,0,y,s*.63); box(g,.1,.24,1.2,HOLZ,s*1.05,y,0); }); [-1,1].forEach(v=>{ box(g,.16,.94,.16,HOLZ3,s*1.06,.5,v*.63); ball(g,.07,GOLD,s*1.06,.98,v*.63); }); });
      box(g,2.0,.5,1.15,HOLZ3,0,.4,0);
      stern(g,0,.52,.695,.3,ROT); [-.68,.68].forEach(x=>stern(g,x,.52,.695,.16,BLAU));
      const F=[0xe8413a,0xf4c430,0x3aa0e8,0x5ac85a,0xe86ab8,0xf08a30,0x9a5ad8];
      const ballM=(x,y,z,r,i)=>{ ball(g,r,F[i%7],x,y,z); const w=ring(g,r*.985,r*.13,i%3?WEISS:ROT2,x,y,z); w.rotation.set((i%5)*.45-.8,(i%4)*.7,0); };
      [[-.72,-.3],[-.24,-.32],[.26,-.3],[.74,-.28],[-.76,.28],[-.26,.3],[.24,.27],[.74,.3]].forEach(([x,z],i)=>ballM(x,.88+(i%3)*.04,z,.28,i));
      [[-.46,.02],[.06,-.03],[.54,.04]].forEach(([x,z],i)=>ballM(x,1.2,z,.27,i+3)); ballM(.05,1.5,.04,.25,1);
      ballM(1.18,.17,.74,.17,2); ballM(-1.15,.17,.72,.17,5); } },
  Object.assign({ x:-13.2, z:-4.8, steh:[-12.4,-2.7] },Z.NEU.laufkugel),
  Object.assign({ x:12.6, z:6.2, steh:[12.2,8.1] },Z.NEU.orchesterpult)
];

function baue(k){
  const sc=k.scene;
  const h=Z.huelle(k,{ B,T,H, himmelLicht:0xffeed8, grund:0x5a2a30, staerke:.74, sonne:0xffe4c0, sonneStaerke:.4,
    bodenBild:Z.kornBild('#8a4c38',['rgba(200,140,90,.35)','rgba(60,20,10,.3)']), bodenWdh:[B/7,T/7], aussen:0x3a1a18, oeffnung:{x:0,b:4.2,h:4.55} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc,hinten);
  manege(k,sc);

  /* ---------- Zuschauerränge: hinten in den Ecken und an beiden Seiten ---------- */
  [-1,1].forEach(s=>{ tribuene(k,hinten,s*14.75,HINTEN,0,5.6,s+1); k.kasten(s*14.8,-12.25,6.0,2.5); });
  tribuene(k,links,-18,.6,Math.PI/2,17.6,.7); k.kasten(-16.75,.6,2.5,17.9);
  tribuene(k,rechts,18,.6,-Math.PI/2,17.6,2.3); k.kasten(16.75,.6,2.5,17.9);

  /* ---------- Wandschmuck ---------- */
  const wh=gruppe(hinten,0,0,0);
  [[-14.6,BLAU],[-4.25,LILA],[4.25,TUERKIS],[14.6,BLAU]].forEach(([x,c],i)=>medaillon(wh,x,Math.abs(x)>10?4.2:3.5,HINTEN+.08,c));
  verschmelze(wh); ohneSchatten(wh);
  [[links,-1],[rechts,1]].forEach(([w,s])=>{ const q=gruppe(w,s*17.9,0,0); q.rotation.y=-s*Math.PI/2; [-5.6,.4,6.4].forEach((x,i)=>medaillon(q,x,4.2,0,[LILA,BLAU,TUERKIS][i]));
    verschmelze(q); ohneSchatten(q);
    Z.wimpel(q,[[[-11.5,5.45,.2],[-5.6,5.45,.2],.35,9],[[-5.6,5.45,.2],[.4,5.45,.2],.35,9],[[.4,5.45,.2],[6.4,5.45,.2],.35,9],[[6.4,5.45,.2],[12.4,5.45,.2],.35,9]]);
    Z.lichterkette(k,q,[[[-10.6,3.5,.15],[-2.6,3.5,.15],.5,14],[[-2.6,3.5,.15],[3.4,3.5,.15],.4,10],[[3.4,3.5,.15],[11.6,3.5,.15],.5,14]]); });
  Z.lichterkette(k,hinten,[[[-17.7,5.9,-13.25],[-10.5,5.8,-13.2],.45,14],[[-10.5,5.8,-13.2],[-2.5,5.2,-13.1],.55,15],[[2.5,5.2,-13.1],[10.5,5.8,-13.2],.55,15],[[10.5,5.8,-13.2],[17.7,5.9,-13.25],.45,14]],{gr:.13});

  /* ---------- Masten mit Wimpeln und Scheinwerfern ---------- */
  [[-10.8,-9.4],[10.8,-9.4],[-14.2,11.2],[14.4,2.0]].forEach(([x,z],i)=>{ Z.mast(k,x,z,i===2?5.6:6.8,i%2?[BLAU,CREME]:[ROT,CREME]); });
  [[-10.8,-9.4],[10.8,-9.4]].forEach(([x,z],i)=>{ const q=gruppe(sc,x,5.9,z); q.rotation.y=i?-.55:.55; const w=gruppe(q,0,0,.45); w.rotation.x=.55; liegend(walze(w,.3,.55,EISEN,0,0,0)); liegend(walze(w,.24,.03,basis(i?0xbfe4ff:0xfff0b0),0,0,.29)); ring(w,.29,.045,GOLD,0,0,.28); box(q,.12,.12,.5,EISEN,0,0,.2);
    verschmelze(q); schein(q,i?'rgba(170,215,255,.7)':'rgba(255,235,160,.7)',0,-.18,.8,1.3); k.verdecker(q,x,z,.5); });

  /* ---------- wandernde Scheinwerferkegel ---------- */
  [[-6.0,-5.6,0xfff0b0,1.9,0],[6.0,-5.4,0xa8d8ff,1.9,2.1],[0,-8.2,0xffb8e0,1.7,4.2]].forEach(([x,z,c,r,ph])=>{ const l=Z.lichtkegel(sc,x,8.4,z,r,c);
    k.anim.push(t=>{ const dx=Math.sin(t*.45+ph)*1.4, dz=Math.cos(t*.33+ph)*.8; l.kegel.position.x=l.fleck.position.x=x+dx; l.kegel.position.z=l.fleck.position.z=z+dz; }); });

  /* ---------- Ausstattung am Boden ---------- */
  const m=gruppe(sc,0,0,0);
  kloetze(k,m,-14.0,6.4,.4); kloetze(k,m,5.8,11.6,-.25);
  kuebel(k,m,-3.2,-12.4,.95); kuebel(k,m,3.6,-12.4,.95); kuebel(k,m,-11.6,11.9,1.1); kuebel(k,m,-7.0,12.4,.9); kuebel(k,m,-1.2,12.4,.9); kuebel(k,m,9.6,12.3,1.0); kuebel(k,m,16.8,11.6,1.2); kuebel(k,m,-16.8,11.6,1.2);
  bodenlampe(k,m,-8.7,-8.6,0xfff0b0); bodenlampe(k,m,8.7,-8.6,0xbfe4ff); bodenlampe(k,m,-8.9,6.8,0xffc0e0); bodenlampe(k,m,8.9,6.9,0xfff0b0);
  verschmelze(m);

  /* ---------- Leben ---------- */
  /* Clownin Lulu jongliert neben dem Vorhang */
  Z.clownin(k,sc,-3.7,-9.5,.3,{ jongliert:true }); k.kreis(-3.7,-9.5,.65);
  /* Artistin winkt vor dem Plakat-Bereich */
  Z.artistin(k,sc,3.8,-9.7,-.3,{ winkt:true, farbe:LILA, phase:1.7 }); k.kreis(3.8,-9.7,.55);
  /* zweite Artistin spaziert */
  const gang=gruppe(sc,0,0,0), a=Z.artistin(k,gang,0,0,Math.PI/2,{ farbe:ROSA, haar:0x1c1410, phase:3.1 });
  k.anim.push(t=>{ const s=Math.sin(t*6)*.45; a.beinL.rotation.x=s; a.beinR.rotation.x=-s; });
  laeufer(k,gang,[[9.8,-2.6],[11.6,-1.4],[11.4,1.0],[9.8,-.2]],1.0,1,12);
  /* zwei Zirkushunde laufen ihre Runden */
  const h1=Z.hund(k,sc,0,0,0,.85,{ krause:true, laeuft:true }); laeufer(k,h1.g,[[-4.8,-1.8],[-2.8,.2],[-2.6,3.2],[-4.6,4.6],[-5.4,.6]],1.5,0,9);
  const h2=Z.hund(k,sc,0,0,0,.65,{ farbe:0xf0e4d0, laeuft:true, phase:2.4 }); laeufer(k,h2.g,[[-1.8,8.0],[-4.6,9.0],[-3.4,10.6],[0,9.6]],1.2,3,10);

  /* ---------- Licht (zusammen mit dem Ausgang 5 Punktlichter) ---------- */
  flacker(k,-10.0,4.4,-9.0,0xffd890,.42,13);
  flacker(k,10.0,4.4,-9.0,0xd8e8ff,.38,13);
  flacker(k,0,5.0,-8.0,0xffc8a0,.32,12);
  flacker(k,0,5.4,4.0,0xffe0b0,.3,16);

  return { tuer, start:[0,-2.2] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-13.6,-9.4],[-9.4,-10.8],[-5.6,-9.2],[5.6,-9.2],[9.4,-10.8],[13.8,-9.2],[-9.4,-5.0],[-3.0,-5.6],[3.0,-5.8],[10.0,-5.8],[-13.6,.4],[13.4,-.8],[-12.0,4.4],[-4.4,6.8],[.4,3.4],[5.2,1.4],[14.0,4.0],[-9.6,10.0],[2.0,10.4],[8.4,9.4]];

return { titel:'Die Manege', breite:36, tiefe:27, oben:['24,8,18','66,20,30','116,42,42'], baue, gegenstaende, verstecke };
})();

/* Raum 2: Die Garderobe im Kostümwagen. Sterntapete in Beere und Rosa, Holzrippen mit Dachbögen, runde Fenster mit Vorhängen,
   viele Lämpchen, Teppiche, Koje, Sofa, Bollerofen, Federboas, eine Artistin, Katze und Mäuschen.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 aus zirkus-gemeinsam.js.
   Ausgang: der große ovale Zauberspiegel in der Rückwand, er schwingt wie eine Tür auf (Drehpunkt links), dahinter ein lila Glitzergang. */
RAEUME3D.zirkus[1] = (function(){
const Z=ZIRKUS;
const { ROT, ROT2, GELB, BLAU, BLAU2, GRUEN, ROSA, LILA, TUERKIS, ORANGE, CREME, WEISS, SCHWARZ, GOLD, MESSING, METALL, METALL2, EISEN, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER2, BUNT, liegend, quer, ohneSchatten } = Z;
const B=36, T=27, H=6.4, HINTEN=-13.5;
const AX=4.6;                                   /* Mitte des Zauberspiegels */
const SA=1.75, SB=2.7, SY=2.45, SU=.14;         /* Spiegel-Oval: halbe Breite, halbe Höhe, Mitte, Unterkante */
const SAMT=0x8a2452, PINK=0xf49ac8, BEERE=0x5a1e4a, HELLLILA=0xb07ae0, WAND=0x6a2e5a;

/* ---------- kleine Helfer ---------- */
const hell=m=>{ m.castShadow=false; return m; };
function form(par,geo,farbe,x,y,z){ const m=new THREE.Mesh(geo,typeof farbe==='number'?mat(farbe,{side:THREE.DoubleSide}):farbe); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
let birne=null;
function lampenMaterial(){ return birne||(birne=basis(0xffeeb0)); }   /* ein gemeinsames Material für alle Glühbirnen */

/* ---------- Bilder ---------- */
/* Abendhimmel hinter den runden Fenstern */
function fensterBild(mondX){
  return bild(256,256,(g)=>{ const v=g.createLinearGradient(0,0,0,256); v.addColorStop(0,'#1a2466'); v.addColorStop(.6,'#5a4aa8'); v.addColorStop(1,'#f0946a'); g.fillStyle=v; g.fillRect(0,0,256,256);
    g.fillStyle='#fff6c0'; for(let i=0;i<34;i++){ const s=2+zufall()*3; g.fillRect(zufall()*256,zufall()*140,s,s); }
    g.beginPath(); g.arc(mondX,70,24,0,7); g.fill(); g.fillStyle='#2e3a84'; g.beginPath(); g.arc(mondX+11,62,21,0,7); g.fill();
    /* kleine Zeltspitzen */
    [[70,150,62],[196,176,48]].forEach(([x,y,b])=>{ for(let i=0;i<6;i++){ g.fillStyle=i%2?'#f4e4c8':'#c8302a'; g.beginPath(); g.moveTo(x,y); g.lineTo(x-b+i*b/3,y+50); g.lineTo(x-b+(i+1)*b/3,y+50); g.fill(); g.fillRect(x-b+i*b/3,y+50,b/3+1,60); } g.fillStyle='#f4c430'; g.fillRect(x-1,y-20,3,20); g.fillRect(x+2,y-20,16,9); });
    g.fillStyle='#2a4a34'; g.fillRect(0,226,256,30); });
}
/* Spiegelglas: kühler Verlauf mit schrägen Lichtstreifen */
function glasBild(oben,unten){
  return bild(256,384,(g)=>{ const v=g.createLinearGradient(0,0,256,384); v.addColorStop(0,oben); v.addColorStop(1,unten); g.fillStyle=v; g.fillRect(0,0,256,384);
    g.strokeStyle='rgba(255,255,255,.75)'; g.lineCap='round'; [[40,170,150,50,16],[66,200,140,120,7],[120,330,214,230,12]].forEach(([a,b,c,d,w])=>{ g.lineWidth=w; g.beginPath(); g.moveTo(a,b); g.lineTo(c,d); g.stroke(); });
    g.fillStyle='#ffffff'; [[200,80,11],[52,290,8],[178,160,6],[96,60,5]].forEach(([x,y,r])=>{ g.beginPath(); for(let i=0;i<8;i++){ const a=i*Math.PI/4, d=i%2?r*.25:r*1.4; g.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d); } g.fill(); }); });
}
/* Foto der Clownin Lulu: orange Locken, rote Nase, grüner Hut mit Blume */
function lulBild(){
  return bild(384,448,(g)=>{ const oval=(x,y,rx,ry,f,w)=>{ g.fillStyle=f; g.beginPath(); g.ellipse(x,y,rx,ry,w||0,0,7); g.fill(); };
    g.fillStyle='#9adcf0'; g.fillRect(0,0,384,448); g.fillStyle='#ffe070'; [[52,60],[330,84],[44,250],[342,270]].forEach(([x,y])=>oval(x,y,12,12,'#ffe070'));
    oval(192,478,150,128,'#f08a30'); [[130,410],[254,414],[192,430]].forEach(([x,y])=>oval(x,y,17,17,'#3a8ae0'));
    for(let i=0;i<9;i++) oval(84+i*27,356+Math.sin(i*.39)*14,23,19,i%2?'#ffffff':'#3a8ae0');
    [[92,210],[80,170],[96,136],[104,250],[292,210],[304,170],[288,136],[280,250],[126,114],[258,114]].forEach(([x,y])=>oval(x,y,40,40,'#e85a1e'));
    oval(192,230,96,104,'#f6cca8'); [[150,204],[234,204]].forEach(([x,y])=>{ oval(x,y,13,17,'#20140e'); oval(x+4,y-6,4,5,'#ffffff'); });
    [[128,262],[256,262]].forEach(([x,y])=>oval(x,y,20,13,'#f09a8a')); oval(192,248,27,25,'#e8281e'); oval(183,240,8,7,'#ffb0a0');
    g.strokeStyle='#a82a24'; g.lineWidth=9; g.lineCap='round'; g.beginPath(); g.arc(192,262,46,.45,2.69); g.stroke();
    g.save(); g.translate(206,128); g.rotate(-.24); oval(0,0,84,17,'#3a9a42'); g.fillStyle='#3a9a42'; g.fillRect(-48,-76,96,76); g.fillStyle='#f4c430'; g.fillRect(-48,-30,96,17);
    for(let i=0;i<6;i++) oval(62+Math.cos(i*1.047)*20,-90+Math.sin(i*1.047)*20,13,13,'#ffffff'); oval(62,-90,13,13,'#f4c430'); g.strokeStyle='#2a7a30'; g.lineWidth=6; g.beginPath(); g.moveTo(38,-52); g.lineTo(60,-80); g.stroke(); g.restore(); });
}

/* eckiges Spiegelglas des Schminktischs */
function spiegelGlas(g,w,h,x,y,z){ Z.tafel(g,glasBild('#d8f4ff','#7ab0d0'),w,h,x,y,z); }

/* ---------- Ausgang: der Zauberspiegel ---------- */
/* Punkte auf dem unten abgeschnittenen Oval (Mitte x=0), Faktor f vergrößert */
function ovalPunkte(f,n){
  const w=Math.asin(Math.max(-1,(SU-SY)/(SB*f))), P=[];
  for(let i=0;i<=n;i++){ const a=w+(Math.PI-2*w)*i/n; P.push([Math.cos(a)*SA*f,SY+Math.sin(a)*SB*f]); }
  return P;
}
function ovalForm(f){ const s=new THREE.Shape(); ovalPunkte(f,40).forEach((p,i)=>i?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1])); return s; }
function baueSpiegel(k,sc,hinten,wandDeko){
  /* lila Glitzergang hinter dem Spiegel */
  const gang=gruppe(hinten,AX,0,HINTEN);
  box(gang,4.4,.1,4.4,0x5a2a8a,0,-.02,-2.5); [0,1,2,3].forEach(i=>box(gang,2.2-i*.2,.02,.5,i%2?HELLLILA:PINK,0,.05,-.8-i*.95));
  [-1,1].forEach(s=>{ box(gang,.2,5.8,4.2,0x7a3ac8,s*2.2,2.9,-2.5); [-1.2,-2.4,-3.6].forEach((z,i)=>{ box(gang,.12,5.2,.22,i%2?PINK:HELLLILA,s*2.06,2.6,z); }); });
  box(gang,4.6,.2,4.2,0x4a1e7a,0,5.8,-2.5);
  const ende=bild(256,384,(g)=>{ g.fillStyle='#4a1a7a'; g.fillRect(0,0,256,384); const l=g.createRadialGradient(128,210,6,128,210,190); l.addColorStop(0,'rgba(255,240,255,1)'); l.addColorStop(.35,'rgba(226,150,255,.9)'); l.addColorStop(1,'rgba(90,30,160,0)'); g.fillStyle=l; g.fillRect(0,0,256,384);
    g.fillStyle='#fff6c0'; for(let i=0;i<60;i++){ const x=zufall()*256, y=zufall()*384, r=2+zufall()*7; g.beginPath(); for(let j=0;j<8;j++){ const a=j*Math.PI/4, d=j%2?r*.3:r; g.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d); } g.fill(); } });
  form(gang,new THREE.PlaneGeometry(4.4,5.8),basis(0xffffff,{map:ende}),0,2.9,-4.55);
  verschmelze(gang); ohneSchatten(gang);
  const funken=[]; [[-1.4,3.8,-2.0],[1.2,4.4,-3.1],[-.8,1.4,-3.6],[1.5,2.2,-1.4],[.2,3.2,-4.0],[-1.6,2.5,-3.0],[.8,.9,-2.6]].forEach(([x,y,z],i)=>{ const f=gruppe(gang,x,y,z); f.userData.lebendig=true; const s=Z.stern(f,0,0,0,.2,GELB); s.material=basis(i%2?0xfff4b0:0xffd0f4,{side:THREE.DoubleSide}); funken.push(f); });
  /* Wandfeld rund um das Oval */
  const feld=new THREE.Shape(); [[-2.25,0],[2.25,0],[2.25,5.75],[-2.25,5.75]].forEach((p,i)=>i?feld.lineTo(p[0],p[1]):feld.moveTo(p[0],p[1]));
  const loch=new THREE.Path(); ovalPunkte(1,40).forEach((p,i)=>i?loch.lineTo(p[0],p[1]):loch.moveTo(p[0],p[1])); feld.holes.push(loch);
  const r=gruppe(wandDeko,AX,0,HINTEN);
  form(r,new THREE.ShapeGeometry(feld),BEERE,0,0,.03);
  const P=ovalPunkte(1.06,40);
  for(let i=0;i<40;i++){ strich(r,[P[i][0],P[i][1],.12],[P[i+1][0],P[i+1][1],.12],.12,GOLD); ball(r,.12,GOLD,P[i][0],P[i][1],.12); }
  ball(r,.12,GOLD,P[40][0],P[40][1],.12);
  box(r,2.5,.14,.6,GOLD,0,.07,.28);
  [-2.17,2.17].forEach(x=>{ box(r,.18,5.75,.24,GOLD,x,2.88,.12); ball(r,.2,GOLD,x,5.9,.12); });
  box(r,4.55,.16,.26,GOLD,0,5.75,.12);
  Z.stern(r,0,5.62,.3,.46,GELB); [-1.55,1.55].forEach(x=>{ Z.stern(r,x,5.05,.1,.24,CREME); Z.stern(r,x*1.12,.6,.1,.2,CREME); });
  /* bunte Lampen rund um den Rahmen, blinken */
  const L=ovalPunkte(1.17,14), farben=[0xff6a5a,0xffd84a,0x5ac8ff,0x7ae87a,0xff8ad8], M=farben.map(c=>basis(c)), C=farben.map(c=>new THREE.Color(c));
  const lg=gruppe(hinten,AX,0,HINTEN);
  L.forEach((p,i)=>{ hell(ball(lg,.15,M[i%5],p[0],p[1],.22)); walze(lg,.1,.07,MESSING,p[0],p[1],.1).rotation.x=Math.PI/2; });
  verschmelze(lg); ohneSchatten(lg);
  /* Spiegeltür: Drehpunkt links */
  const dreh=gruppe(hinten,AX-SA*1.02,0,HINTEN+.2); dreh.userData.lebendig=true;
  const blatt=gruppe(dreh,SA*1.02,0,0);
  const glas=glasBild('#e4f6ff','#8a9ad8'); glas.repeat.set(1/(SA*2.04),1/(SB*1.9)); glas.offset.set(.5,.03);
  form(blatt,new THREE.ShapeGeometry(ovalForm(1.015)),new THREE.MeshBasicMaterial({map:glas,side:THREE.FrontSide}),0,0,.02);
  form(blatt,new THREE.ShapeGeometry(ovalForm(1.015)),basis(HOLZ,{side:THREE.DoubleSide}),0,0,-.02);   /* ohne Licht: keine zackigen Schatten auf der Rückseite */
  const Q=ovalPunkte(.97,40);
  for(let i=0;i<40;i++) strich(blatt,[Q[i][0],Q[i][1],.06],[Q[i+1][0],Q[i+1][1],.06],.065,MESSING);
  strich(blatt,[Q[0][0],Q[0][1],.06],[Q[40][0],Q[40][1],.06],.065,MESSING);
  const hr=basis(GOLD); for(let i=0;i<40;i++) strich(blatt,[Q[i][0],Q[i][1],-.07],[Q[i+1][0],Q[i+1][1],-.07],.045,hr); strich(blatt,[Q[0][0],Q[0][1],-.07],[Q[40][0],Q[40][1],-.07],.045,hr);
  [1.3,3.6].forEach(y=>walze(blatt,.09,.5,GOLD,-SA*.99,y,.08));
  box(blatt,1.5,1.18,.08,BEERE,0,2.15,.08); box(blatt,1.62,.09,.1,GOLD,0,2.76,.09); box(blatt,1.62,.09,.1,GOLD,0,1.54,.09);
  const schloss=Z.zahlenschloss(blatt,0,2.05,.24); schloss.scale.setScalar(1.35);
  ball(blatt,.11,GOLD,1.3,2.15,.14);
  verschmelze(blatt);
  const licht=new THREE.PointLight(0xe0a0ff,.3,10,1.5); licht.position.set(AX,3.2,-12.2); sc.add(licht);
  const glanz=schein(hinten,'rgba(255,200,250,.35)',AX,4.1,HINTEN+.7,1.4);
  k.anim.push(t=>{ M.forEach((m,i)=>m.color.copy(C[i]).multiplyScalar(.8+.3*Math.max(0,Math.sin(t*3+i*1.3))));
    funken.forEach((f,i)=>{ const s=.55+.5*Math.abs(Math.sin(t*2.2+i*1.9)); f.scale.set(s,s,s); f.rotation.z=t*.4+i; }); });
  k.kasten(AX,-13.0,4.7,1.5); /* geschlossener Spiegel: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Zauberspiegel', einfach:'Großer Spiegel', steh:[AX+1.9,-11.0], durch:[AX,-14.9],
    treffer:{x:AX,y:2.7,z:-12.95,b:4.3,h:5.4,t:.9}, schildOben:[AX,4.6,-12.2], glanz:[AX,2.2,-12.6],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.05)/.88)); dreh.rotation.y=-1.85*a*a*(3-2*a); glanz.visible=auf<.05; licht.intensity=.3+1.2*auf; } });
}

/* ---------- Wandschmuck (Blick nach +z) ---------- */
/* rundes Fenster mit Gardinen, die leicht wehen */
function rundfenster(k,par,x,y,z,dreh,mondX){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  form(g,new THREE.CircleGeometry(1.05,32),basis(0xffffff,{map:fensterBild(mondX)}),0,0,.05);
  const f=g;
  ring(f,1.1,.14,HELLHOLZ,0,0,.1); ring(f,1.28,.05,GOLD,0,0,.08); box(f,.08,2.15,.07,HELLHOLZ,0,0,.1); box(f,2.15,.08,.07,HELLHOLZ,0,0,.1);
  strich(f,[-1.75,1.4,.3],[1.75,1.4,.3],.05,HOLZ3); [-1.78,1.78].forEach(a=>ball(f,.11,GOLD,a,1.4,.3));
  box(f,2.0,.12,.45,HELLHOLZ,0,-1.34,.22);
  [-.55,.55].forEach((a,i)=>{ rohr(f,.2,.15,.26,i?TUERKIS:ORANGE,a,-1.15,.25,12); ball(f,.2,GRUEN,a,-.95,.25,1.1,.7,.9); [[-.1,0],[.1,.04],[0,.12]].forEach(([c,d],j)=>ball(f,.075,j%2?GELB:PINK,a+c,-.9+d,.38)); });
  const tuecher=[-1,1].map(s=>{ const v=gruppe(g,s*1.45,1.36,.3); v.userData.lebendig=true;
    Z.vieleck(v,[[s*.18,0,0],[-s*.72,0,0],[-s*.45,-.75,0],[-s*.05,-1.35,0],[s*.18,-1.4,0]],SAMT);
    Z.vieleck(v,[[s*.18,-1.4,0],[-s*.05,-1.35,0],[-s*.4,-2.45,.01],[s*.22,-2.55,.01]],SAMT);
    strich(v,[-s*.1,-1.38,.03],[s*.22,-1.36,.03],.065,GOLD); verschmelze(v); return v; });
  k.anim.push(t=>{ tuecher.forEach((v,i)=>v.rotation.z=Math.sin(t*1.3+i*2.1+x+z)*.025); });
}
/* grosses Lämpchen an der Wand mit rosa Schirm */
function wandlampe(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  walze(g,.2,.08,GOLD,0,0,.06).rotation.x=Math.PI/2; strich(g,[0,0,.06],[0,.05,.45],.045,GOLD); walze(g,.05,.24,GOLD,0,.14,.45);
  rohr(g,.2,.42,.45,PINK,0,.42,.45,16,true); ring(g,.42,.035,GOLD,0,.2,.45).rotation.x=Math.PI/2;
  for(let i=0;i<8;i++){ const a=i*Math.PI/4; ball(g,.05,GELB,Math.cos(a)*.42,.1,.45+Math.sin(a)*.42); }
  schein(g,'rgba(255,200,150,.55)',0,.28,.62,1.7);
}
/* Federboa: weiche dicke Schlange über einem Haken, zwei offene Enden hängen herab. kurz=true: kürzere Enden (über Wandbrettern) */
function boa(par,x,y,z,dreh,farbe,farbe2,kurz){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,.4,.2,.08,HOLZ3,0,.05,.05); ball(g,.09,GOLD,0,.05,.18);
  const ky=kurz?.7:1, weg=[[-.34,-1.62],[-.6,-1.2],[-.4,-.72],[-.44,-.25],[0,.08],[.42,-.2],[.36,-.62],[.58,-1.05]];
  let n=0;
  for(let i=0;i<weg.length-1;i++) for(let j=0;j<(i===weg.length-2?5:4);j++){   /* im letzten Stück auch der Endpunkt */
    const a=weg[i], b=weg[i+1], px=a[0]+(b[0]-a[0])*j/4, py=a[1]+(b[1]-a[1])*j/4;
    const m=ball(g,.12+((n*3)%5)*.01,n%6<3?farbe:farbe2,px+((n%3)-1)*.025,py*(py<0?ky:1),.27+(n%2)*.035,1.08,.9,.85); m.rotation.z=(n%4-1.5)*.35; m.castShadow=false;
    n++; }
}
/* aufgespannter Fächer */
function faecherDeko(par,x,y,z,dreh,a,b){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  const P=i=>{ const w=.35+i*(Math.PI-.7)/9; return [Math.cos(w)*1.0,Math.sin(w)*1.0,.1]; };
  for(let i=0;i<9;i++){ Z.vieleck(g,[[0,0,.1],P(i),P(i+1)],i%2?a:b); ball(g,.07,GOLD,P(i)[0],P(i)[1],.12); strich(g,[0,0,.12],P(i),.015,HOLZ2); }
  ball(g,.07,GOLD,P(9)[0],P(9)[1],.12); ball(g,.11,GOLD,0,0,.13);
}
/* Wandbrett mit Duftflaschen und Dosen */
function flaschenBrett(par,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  box(g,2.8,.12,.5,HELLHOLZ,0,0,.26); [-1.1,1.1].forEach(a=>strich(g,[a,-.55,.05],[a,-.05,.42],.055,HOLZ3));
  [[-1.1,TUERKIS],[.15,PINK],[1.05,HELLLILA]].forEach(([a,f])=>{ rohr(g,.1,.22,.46,f,a,.3,.27,10); walze(g,.07,.14,CREME,a,.6,.27); ball(g,.11,GOLD,a,.74,.27); });
  [[-.52,ROT],[.6,GRUEN]].forEach(([a,f])=>{ walze(g,.24,.28,f,a,.2,.27); walze(g,.26,.07,GOLD,a,.37,.27); ball(g,.07,CREME,a,.45,.27); });
}
/* Wanduhr mit Zeigern, Pendel schwingt */
function wanduhr(k,par,x,y,z){
  const g=gruppe(par,x,y,z);
  walze(g,.72,.18,HOLZ2,0,0,.12).rotation.x=Math.PI/2; walze(g,.58,.06,CREME,0,0,.22).rotation.x=Math.PI/2; ring(g,.65,.06,GOLD,0,0,.24);
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(g,.035,SCHWARZ,Math.cos(a)*.46,Math.sin(a)*.46,.26); }
  strich(g,[0,0,.28],[.2,.2,.28],.03,SCHWARZ); strich(g,[0,0,.29],[-.04,.44,.29],.022,ROT); ball(g,.06,GOLD,0,0,.3);
  Z.stern(g,0,.92,.16,.22,GELB);
  const p=gruppe(g,0,-.62,.14); p.userData.lebendig=true; strich(p,[0,0,0],[0,-.75,0],.025,MESSING); ball(p,.18,GOLD,0,-.82,0,1,1,.5); verschmelze(p);
  k.anim.push(t=>{ p.rotation.z=Math.sin(t*3.1)*.3; });
}
/* Holzrippen mit runden Dachbögen: so sieht man, dass es ein Wagen ist */
function rippen(h,L,R){
  const zi=HINTEN+.12;
  [-17.82,-12.2,-5.9,.55,8.7,17.82].forEach(x=>{ box(h,.24,H,.18,HOLZ2,x,H/2,zi); ball(h,.13,GOLD,x,1.45,zi+.1);
    [-1,1].forEach(s=>{ if(Math.abs(x+s*1.4)>18) return; const b=ring(h,1.35,.09,HOLZ2,x+s*1.35,4.95,zi+.04,Math.PI/2); b.rotation.z=s>0?Math.PI/2:0; }); });
  box(h,B,.22,.26,HOLZ3,0,6.3,zi+.02);
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.12);
    [-13.3,-7.2,-1.2,4.8,10.8].forEach(z=>{ box(w,.18,H,.24,HOLZ2,x,H/2,z);
      [-1,1].forEach(v=>{ if(Math.abs(z+v*1.4)>13.5) return; const q=gruppe(w,x,4.95,z+v*1.35); q.rotation.y=Math.PI/2; const b=ring(q,1.35,.09,HOLZ2,0,0,0,Math.PI/2); b.rotation.z=v>0?0:Math.PI/2; }); });
    box(w,.26,.22,T,HOLZ3,x,6.3,0); });
}

/* ---------- Möbel und Deko am Boden (nichts davon ist ein Gegenstand) ---------- */
function teppich(par,x,z,rx,rz,farben,y){
  const rund=new THREE.CylinderGeometry(1,1,1,48);
  farben.forEach((f,i)=>{ const q=1-i*.2, m=teil(par,rund,f,x,(y||.012)+i*.006,z,1,.02,1); m.scale.set(rx*q,.02,rz*q); m.castShadow=false; });
  for(let i=0;i<26;i++){ const a=i*Math.PI/13; hell(ball(par,.09,CREME,x+Math.cos(a)*rx*1.01,.025,z+Math.sin(a)*rz*1.01,1,.25,1)); }
}
function laeuferTeppich(par,x,z,b,t){
  hell(box(par,b,.02,t,SAMT,x,.014,z)); [-1,1].forEach(s=>{ hell(box(par,b,.026,.14,GOLD,x,.016,z+s*(t/2-.22))); for(let i=0;i<9;i++) hell(box(par,.3,.02,.06,CREME,x+s*(b/2+.13),.012,z-t/2+.15+i*(t-.3)/8)); });
  for(let i=0;i<Math.floor(b/1.3);i++){ const m=hell(box(par,.4,.03,.4,i%2?TUERKIS:GELB,x-b/2+.9+i*1.3,.016,z)); m.rotation.y=Math.PI/4; }
}
/* rotes Samtsofa, Vorderseite +z */
function sofa(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-1.55,1.55].forEach(a=>[-.45,.45].forEach(c=>ball(g,.13,GOLD,a,.12,c)));
  box(g,3.5,.4,1.25,SAMT,0,.42,0); [-.82,.82].forEach(a=>ball(g,.85,0xa83462,a,.66,.08,.96,.24,.66));
  box(g,3.5,.9,.35,SAMT,0,1.05,-.48); [-1.1,0,1.1].forEach(a=>{ ball(g,.62,0xa83462,a,1.38,-.42,.95,.75,.3); ball(g,.06,GOLD,a,1.32,-.22); });
  [-1.72,1.72].forEach(a=>{ box(g,.3,.55,1.25,SAMT,a,.8,0); walze(g,.25,1.28,0xa83462,a,1.1,0).rotation.x=Math.PI/2; ball(g,.1,GOLD,a,1.1,.66); });
  const k1=box(g,.62,.55,.2,TUERKIS,-1.05,1.05,-.15); k1.rotation.z=.35; ball(g,.08,GELB,-1.05,1.05,-.02);
  const k2=box(g,.58,.52,.2,GELB,1.1,1.03,-.15); k2.rotation.z=-.3; Z.stern(g,1.1,1.03,-.03,.17,ROT);
}
/* Koje mit Vorhang an der Seitenwand, Vorderseite +z */
function koje(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,4.4,.75,1.3,HOLZ,0,.4,0); [-1.45,0,1.45].forEach(a=>{ box(g,1.2,.42,.05,HELLHOLZ,a,.4,.67); ball(g,.07,GOLD,a,.4,.72); });
  box(g,4.2,.3,1.2,CREME,0,.9,0); box(g,3.0,.36,1.26,BLAU,.6,.94,0); [-.4,.4,1.2,1.9].forEach(a=>{ ball(g,.13,GELB,a,1.12,.3,1,.2,1); ball(g,.1,PINK,a+.35,1.12,-.2,1,.2,1); });
  ball(g,.5,WEISS,-1.55,1.18,0,.9,.42,1.05);
  [-2.2,2.2].forEach(a=>{ box(g,.18,3.1,.18,HOLZ2,a,1.55,.58); ball(g,.15,GOLD,a,3.22,.58); box(g,.14,1.7,1.3,HOLZ2,a,.85,-.02); });
  box(g,4.55,.16,.22,HOLZ3,0,3.0,.58);
  [-1,1].forEach(s=>{ for(let i=0;i<3;i++) walze(g,.15,1.75-i*.04,i%2?ROSA:LILA,s*(2.0-i*.26),2.05,.6+(i%2)*.04).scale.z=.07; box(g,.8,.11,.2,GOLD,s*1.75,1.7,.62); });
  for(let i=0;i<9;i++){ ball(g,.28,i%2?ROSA:LILA,-1.92+i*.48,2.9,.66,1,.75,.25); ball(g,.06,GOLD,-1.92+i*.48,2.65,.72); }
}
/* Kommode mit Schubladen, obendrauf Teekanne und Tassen */
function kommode(par,x,z,dreh,farbe){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-1,1].forEach(a=>[-.35,.35].forEach(c=>ball(g,.12,HOLZ3,a,.11,c)));
  box(g,2.3,1.15,.95,farbe,0,.75,0); box(g,2.45,.12,1.05,HELLHOLZ,0,1.38,0);
  [.46,.82,1.14].forEach(y=>{ box(g,2.05,.28,.05,CREME,0,y,.49); [-.45,.45].forEach(a=>ball(g,.07,GOLD,a,y,.55)); });
  ball(g,.28,TUERKIS,-.55,1.68,0,1.05,.9,1.05); ball(g,.08,GOLD,-.55,1.97,0); strich(g,[-.34,1.62,0],[-.03,1.9,0],.055,TUERKIS); ring(g,.16,.04,TUERKIS,-.84,1.68,0);
  [[.25,ROT],[.75,GELB]].forEach(([a,f])=>{ walze(g,.2,.04,WEISS,a,1.46,.08); rohr(g,.14,.1,.22,f,a,1.59,.08,12); ring(g,.07,.022,f,a+.16,1.6,.08); });
}
/* runder Bollerofen mit Rohr und warmem Schein */
function ofen(k,par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,.85,.08,METALL2,0,.04,0); [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78; strich(g,[Math.cos(a)*.55,0,Math.sin(a)*.55],[Math.cos(a)*.38,.4,Math.sin(a)*.38],.08,EISEN); });
  walze(g,.58,1.15,EISEN,0,.94,0); [.42,1.5].forEach(y=>liegend(ring(g,.6,.06,MESSING,0,y,0))); walze(g,.66,.12,METALL2,0,1.57,0);
  walze(g,.17,2.4,EISEN,-.12,2.8,-.15); [2.2,3.2].forEach(y=>liegend(ring(g,.19,.04,MESSING,-.12,y,-.15))); ball(g,.22,EISEN,-.12,4.0,-.15,1,.7,1);
  box(g,.55,.46,.08,MESSING,0,.86,.56); hell(box(g,.4,.3,.04,basis(0xffa430),0,.86,.61)); [-.12,0,.12].forEach(a=>box(g,.035,.32,.04,EISEN,a,.86,.64));
  const gl=schein(par,'rgba(255,150,50,.6)',x,.9,z+.85,1.3);
  k.anim.push(t=>{ const s=1.2+Math.sin(t*9)*.08+Math.sin(t*5.3)*.07; gl.scale.set(s,s,1); });
}
/* Stehlampe mit Fransenschirm */
function stehlampe(k,par,x,z,farbe){
  const g=gruppe(par,x,0,z);
  walze(g,.45,.1,HOLZ3,0,.05,0); walze(g,.07,2.7,GOLD,0,1.4,0); ball(g,.13,GOLD,0,1.3,0);
  rohr(g,.34,.66,.7,farbe,0,2.95,0,18,true); liegend(ring(g,.66,.04,GOLD,0,2.6,0)); liegend(ring(g,.34,.035,GOLD,0,3.3,0));
  for(let i=0;i<18;i++){ const a=i*Math.PI/9; walze(g,.022,.2,GELB,Math.cos(a)*.65,2.48,Math.sin(a)*.65); }
  hell(ball(g,.2,lampenMaterial(),0,2.72,0)); schein(g,'rgba(255,208,140,.5)',0,2.8,0,2.2);
  k.kreis(x,z,.5);
}
/* weiches Sitzkissen */
function kissen(par,x,z,farbe,knopf){
  const g=gruppe(par,x,0,z);
  ball(g,.62,farbe,0,.3,0,1,.5,1); liegend(ring(g,.6,.045,knopf,0,.3,0)); ball(g,.1,knopf,0,.62,0,1,.5,1);
  for(let i=0;i<6;i++){ const a=i*Math.PI/3; strich(g,[0,.62,0],[Math.cos(a)*.55,.47,Math.sin(a)*.55],.016,knopf); }
}
/* Pflanze im Topf */
function pflanze(par,x,z,gr){
  const g=gruppe(par,x,0,z); g.scale.setScalar(gr||1);
  rohr(g,.44,.3,.6,0xc8603a,0,.3,0,14); liegend(ring(g,.44,.055,0xa84a28,0,.6,0)); walze(g,.4,.04,HOLZ3,0,.58,0);
  for(let i=0;i<9;i++){ const a=i*.7, r=.18+(i%3)*.13, h=1.0+((i*5)%4)*.2; strich(g,[0,.55,0],[Math.cos(a)*r,h,Math.sin(a)*r],.025,0x3a7a34); const b=ball(g,.24,i%2?GRUEN:0x2e8a48,Math.cos(a)*r*1.3,h+.05,Math.sin(a)*r*1.3,.65,1.15,.35); b.rotation.y=-a; }
}
/* Korb mit Stoffrollen (stehen schräg, bunte Enden) */
function stoffkorb(par,x,z){
  const g=gruppe(par,x,0,z);
  rohr(g,.62,.5,.75,0xb88a50,0,.38,0,16,true); walze(g,.5,.06,0x8a6030,0,.04,0); [.25,.5].forEach(y=>liegend(ring(g,.53+y*.12,.03,0x8a6030,0,y,0))); liegend(ring(g,.63,.06,0x8a6030,0,.76,0));
  [[-.24,-.12,TUERKIS],[.2,-.2,GELB],[.04,.22,PINK],[.28,.16,GRUEN],[-.2,.2,HELLLILA]].forEach(([a,c,f],i)=>{ const q=gruppe(g,a,.2,c); q.rotation.set(c*.5,0,-a*.7); walze(q,.17,1.3+(i%2)*.22,f,0,.68,0); walze(q,.05,1.45+(i%2)*.22,HELLHOLZ,0,.7,0); liegend(ring(q,.175,.018,CREME,0,1.0,0)); });
}
/* Waschtisch mit Schüssel und Krug */
function waschtisch(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-.6,.6].forEach(a=>[-.35,.35].forEach(c=>walze(g,.07,.95,HOLZ2,a,.48,c))); box(g,1.6,.12,1.0,HOLZ,0,1.0,0); box(g,1.4,.08,.8,HOLZ2,0,.35,0);
  rohr(g,.5,.28,.26,WEISS,-.25,1.2,0,18,true); walze(g,.3,.04,WEISS,-.25,1.09,0); walze(g,.4,.03,0x8ad0f0,-.25,1.24,0); liegend(ring(g,.5,.03,BLAU,-.25,1.33,0));
  rohr(g,.14,.24,.55,WEISS,.5,1.34,0,14); rohr(g,.19,.13,.18,WEISS,.5,1.7,0,14); ring(g,.17,.04,BLAU,.73,1.45,0); liegend(ring(g,.2,.025,BLAU,.5,1.4,0));
  ball(g,.4,PINK,.2,.52,0,1.2,.4,.8);
}
/* Spieluhr: kleine Tänzerin dreht sich auf einem Tischchen */
function spieluhr(k,par,x,z){
  const g=gruppe(par,x,0,z);
  walze(g,.4,.08,HOLZ3,0,.04,0); walze(g,.1,.75,HOLZ2,0,.45,0); walze(g,.6,.09,HOLZ,0,.85,0); walze(g,.42,.28,TUERKIS,0,1.03,0); liegend(ring(g,.43,.03,GOLD,0,1.18,0)); liegend(ring(g,.43,.03,GOLD,0,.9,0));
  const f=gruppe(g,0,1.17,0); f.userData.lebendig=true; walze(f,.035,.3,0xf1c7a0,0,.15,0); rohr(f,.06,.28,.13,PINK,0,.34,0,14); walze(f,.07,.24,PINK,0,.5,0); ball(f,.11,0xf1c7a0,0,.73,0); ball(f,.07,HOLZ2,0,.83,-.04); [-1,1].forEach(s=>strich(f,[0,.57,0],[s*.24,.85,0],.022,0xf1c7a0)); verschmelze(f);
  k.anim.push(t=>{ f.rotation.y=t*1.5; }); k.kreis(x,z,.62);
}
/* Papierlaterne an einem Wandarm, pendelt */
function laterne(k,par,x,y,z,dreh,farbe,phase){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  strich(g,[0,0,0],[0,0,.8],.045,HOLZ3); ball(g,.08,GOLD,0,0,.82);
  const p=gruppe(g,0,0,.75); p.userData.lebendig=true; strich(p,[0,0,0],[0,-.3,0],.015,SCHWARZ); ball(p,.36,farbe,0,-.65,0,1,.95,1); walze(p,.17,.09,GOLD,0,-.32,0); walze(p,.17,.09,GOLD,0,-.98,0); [-.18,.04].forEach(h=>liegend(ring(p,.35,.015,CREME,0,-.58+h,0))); walze(p,.03,.3,GELB,0,-1.15,0); verschmelze(p); ohneSchatten(p);
  k.anim.push(t=>{ p.rotation.z=Math.sin(t*1.4+phase)*.12; });
}
/* Schmetterling flattert um eine Lampe */
function falter(k,x,y,z,farbe,phase){
  const g=gruppe(k.scene,x,y,z); g.userData.lebendig=true; ball(g,.05,SCHWARZ,0,0,0,.8,.8,2.4);
  const fl=[-1,1].map(s=>{ const q=gruppe(g,0,0,0); Z.vieleck(q,[[0,0,0],[s*.28,0,-.22],[s*.34,0,-.04],[s*.2,0,.04],[s*.26,0,.18],[s*.08,0,.16]],farbe,true); return q; });
  k.anim.push(t=>{ const u=t*.8+phase; g.position.set(x+Math.cos(u)*.9,y+Math.sin(u*2.3)*.35,z+Math.sin(u)*.55); g.rotation.y=-u; fl[0].rotation.z=-Math.sin(t*14+phase)*.9; fl[1].rotation.z=Math.sin(t*14+phase)*.9; });
}

function baue(k){
  const sc=k.scene;
  const h=Z.huelle(k,{ B,T,H, hintergrund:0x24101e, himmelLicht:0xffe8e0, grund:0x5a2e3a, staerke:.76, sonne:0xffd8b0, sonneStaerke:.36,
    wandBild:Z.tapetenBild('#8e3e78','#c870a8',true), bodenBild:Z.dielenBild([158,100,66],'#38180e'), aussen:0x24100e,
    leiste:GOLD, sockel:1.3, sockelFarbe:0x7a4026, volant:false, oeffnung:{x:AX,b:4.4,h:5.7} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;

  /* v = alles, was am Boden steht (eine Gruppe, damit gleiche Farben zusammengefasst werden) */
  const v=gruppe(sc,0,0,0);

  /* ---------- Rückwand ---------- */
  const dh=gruppe(hinten,0,0,0), dl=gruppe(links,0,0,0), dr=gruppe(rechts,0,0,0), LD=Math.PI/2, RD=-Math.PI/2;
  rippen(dh,dl,dr);
  const tuer=baueSpiegel(k,sc,hinten,dh);
  rundfenster(k,dh,-14.7,3.45,HINTEN,0,180);
  rundfenster(k,dh,11.5,3.65,HINTEN,0,70);
  boa(dh,-6.9,4.3,HINTEN,0,0xffa8d8,WEISS);
  wanduhr(k,dh,-.9,4.55,HINTEN);
  faecherDeko(dh,-5.0,2.4,HINTEN,0,ROT,GELB);
  wandlampe(dh,-11.2,3.6,HINTEN+.06,0); wandlampe(dh,-4.6,3.8,HINTEN,0); wandlampe(dh,.55,2.75,HINTEN+.18,0); wandlampe(dh,8.7,3.2,HINTEN+.18,0);
  boa(dh,15.2,4.7,HINTEN,0,0x8cf0e8,WEISS,true);
  flaschenBrett(dh,15.8,2.45,HINTEN,0);
  Z.lichterkette(k,hinten,[[[-17.6,5.85,HINTEN+.35],[-12.2,5.85,HINTEN+.35],.45,11],[[-12.2,5.85,HINTEN+.35],[-5.9,5.85,HINTEN+.35],.5,12],[[-5.9,5.85,HINTEN+.35],[.55,5.85,HINTEN+.35],.5,12],[[.55,5.85,HINTEN+.35],[2.2,5.95,HINTEN+.35],.15,3],[[7.0,5.95,HINTEN+.35],[8.7,5.85,HINTEN+.35],.15,3],[[8.7,5.85,HINTEN+.35],[17.6,5.85,HINTEN+.35],.55,16]]);
  /* niedrige Möbel an der Rückwand */
  pflanze(v,-17.0,-12.6,1.2); k.kreis(-17.0,-12.6,.7);
  kommode(v,-13.4,-12.65,0,TUERKIS); k.kasten(-13.4,-12.65,2.55,1.15);
  stoffkorb(v,-5.7,-12.55); k.kreis(-5.7,-12.55,.72);
  kissen(v,-.5,-12.45,HELLLILA,GOLD); k.kreis(-.5,-12.45,.66);
  waschtisch(v,9.3,-12.6,0); k.kasten(9.3,-12.6,1.75,1.15);
  kommode(v,16.2,-12.65,0,ROSA); k.kasten(16.2,-12.65,2.55,1.15);
  stehlampe(k,v,1.35,-12.3,LILA);

  /* ---------- linke Wand ---------- */
  const LX=-B/2;
  rundfenster(k,dl,LX,3.45,-9.2,LD,80); rundfenster(k,dl,LX,3.45,7.8,LD,190);
  boa(dl,LX,4.5,-5.0,LD,0xdcb8ff,WEISS); faecherDeko(dl,LX,3.7,-3.1,LD,TUERKIS,CREME);
  boa(dl,LX,4.35,3.3,LD,0xffa8d8,WEISS); faecherDeko(dl,LX,3.9,12.2,LD,HELLLILA,GELB);
  wandlampe(dl,LX,3.0,-1.2,LD); wandlampe(dl,LX,3.0,4.8,LD); wandlampe(dl,LX,3.2,-7.0,LD);
  flaschenBrett(dl,LX,2.3,12.2,LD);
  Z.lichterkette(k,links,[[[LX+.35,5.85,-13.2],[LX+.35,5.85,-7.2],.45,11],[[LX+.35,5.85,-7.2],[LX+.35,5.85,-1.2],.45,11],[[LX+.35,5.85,-1.2],[LX+.35,5.85,4.8],.45,11],[[LX+.35,5.85,4.8],[LX+.35,5.85,10.8],.45,11]]);
  laterne(k,dl,LX+.1,5.3,-12.0,LD,ORANGE,0); laterne(k,dl,LX+.1,5.3,10.8,LD,TUERKIS,2.4);
  kommode(v,-17.1,-9.4,LD,HELLLILA); k.kasten(-17.1,-9.4,1.2,2.55);
  koje(v,-17.1,-4.2,LD); k.kasten(-17.1,-4.2,1.5,4.6);
  ofen(k,v,-16.95,1.8); k.kreis(-16.95,1.8,.9);
  sofa(v,-17.05,7.4,LD); k.kasten(-17.05,7.4,1.45,3.75);
  pflanze(v,-17.0,11.0,1.1); k.kreis(-17.0,11.0,.65);

  /* ---------- rechte Wand ---------- */
  const RX=B/2;
  rundfenster(k,dr,RX,3.45,-4.2,RD,190); rundfenster(k,dr,RX,3.45,1.6,RD,80);
  boa(dr,RX,4.5,-10.2,RD,0xdcb8ff,WEISS,true); flaschenBrett(dr,RX,2.3,-10.2,RD);
  boa(dr,RX,4.5,7.0,RD,0x8cf0e8,WEISS); faecherDeko(dr,RX,3.7,9.2,RD,ROSA,CREME); faecherDeko(dr,RX,3.9,12.2,RD,ORANGE,TUERKIS);
  wandlampe(dr,RX,3.0,-7.2,RD); wandlampe(dr,RX,3.0,-1.2,RD); wandlampe(dr,RX,3.0,4.8,RD);
  Z.lichterkette(k,rechts,[[[RX-.35,5.85,-13.2],[RX-.35,5.85,-7.2],.45,11],[[RX-.35,5.85,-7.2],[RX-.35,5.85,-1.2],.45,11],[[RX-.35,5.85,-1.2],[RX-.35,5.85,4.8],.45,11],[[RX-.35,5.85,4.8],[RX-.35,5.85,10.8],.45,11]]);
  laterne(k,dr,RX-.1,5.3,-12.0,RD,PINK,1.2); laterne(k,dr,RX-.1,5.3,10.8,RD,GELB,3.6);
  sofa(v,17.05,-4.2,RD); k.kasten(17.05,-4.2,1.45,3.75);
  stoffkorb(v,17.1,-7.8); k.kreis(17.1,-7.8,.72);
  waschtisch(v,17.1,1.6,RD); k.kasten(17.1,1.6,1.15,1.75);
  koje(v,17.1,7.8,RD); k.kasten(17.1,7.8,1.5,4.6);
  pflanze(v,17.05,11.7,1.2); k.kreis(17.05,11.7,.7);
  stehlampe(k,v,16.6,-.9,TUERKIS); stehlampe(k,v,-16.4,-.7,ROSA);
  [dh,dl,dr].forEach(g=>{ verschmelze(g); ohneSchatten(g); });

  /* ---------- Deko vorn (niedrig) ---------- */
  kommode(v,-13.6,12.45,Math.PI,ORANGE); k.kasten(-13.6,12.45,2.55,1.15);
  kissen(v,-10.9,12.3,TUERKIS,GELB); kissen(v,-9.6,12.45,ROSA,CREME); k.kasten(-10.25,12.35,2.6,1.3);
  stoffkorb(v,-5.6,12.35); k.kreis(-5.6,12.35,.72);
  sofa(v,.4,12.4,Math.PI); k.kasten(.4,12.4,3.75,1.45);
  pflanze(v,4.6,12.4,.9); k.kreis(4.6,12.4,.55);
  waschtisch(v,8.4,12.45,Math.PI); k.kasten(8.4,12.45,1.75,1.15);
  kommode(v,13.8,12.45,Math.PI,TUERKIS); k.kasten(13.8,12.45,2.55,1.15);

  /* Kissen und Kleinigkeiten im Raum */
  [[-14.2,5.0,HELLLILA,GOLD],[-13.6,9.0,GELB,ROT],[14.2,3.6,ROT,GOLD],[-13.9,-7.4,PINK,CREME],[7.6,9.4,TUERKIS,GELB]].forEach(([x,z,a,b])=>{ kissen(v,x,z,a,b); k.kreis(x,z,.64); });
  spieluhr(k,v,-13.7,-2.0);
  verschmelze(v);

  /* ---------- Teppiche (flach, begehbar) ---------- */
  const tp=gruppe(sc,0,0,0);
  teppich(tp,-.4,.6,4.4,3.2,[0x6a2a8a,GOLD,SAMT,PINK]);
  teppich(tp,-6.8,-4.6,2.8,2.4,[TUERKIS,CREME,0x1f7a78],.016);
  teppich(tp,9.6,5.4,3.6,2.7,[0x2a4a9a,GELB,BLAU],.014);
  laeuferTeppich(tp,AX,-8.9,3.0,5.4);
  verschmelze(tp); ohneSchatten(tp);

  /* ---------- warmes Licht ---------- */
  flacker(k,-8.6,3.8,-8.8,0xffc080,.42,14); flacker(k,-13.0,4.0,3.0,0xff9ab8,.32,13); flacker(k,12.8,4.0,-3.0,0xffc888,.34,13); flacker(k,4.0,4.4,6.0,0xffd0a0,.26,14);

  /* ---------- Leben: eine Artistin macht sich fertig und winkt, Katze, Mäuschen, Schmetterlinge ---------- */
  Z.artistin(k,sc,-13.4,2.6,.9,{ winkt:true, farbe:ROSA, haar:0x2a1408 }); k.kreis(-13.4,2.6,.6);
  katze(k,[[-8.4,8.6],[-1.4,9.4],[6.6,7.0],[6.4,10.4],[-7.0,10.2]],1.3);
  maeuschen(k,[[-11.6,-10.2],[-6.0,-9.4],[-4.4,-7.8],[-11.0,-8.4]],1.5,0);
  falter(k,-11.4,4.2,-11.2,0xffe060,0); falter(k,15.0,3.8,-1.4,0x70e0ff,2.5);

  return { tuer, start:[-.6,-.4] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-14.8,-10.8],[-10.8,-5.8],[-4.4,-9.8],[-.8,-7.2],[1.6,-3.8],[13.0,-3.0],[15.6,-7.0],[7.2,-7.8],[-14.6,-4.8],[-7.0,-1.9],
  [-14.4,7.2],[-7.8,6.8],[-1.2,7.8],[1.0,3.6],[6.8,5.6],[14.6,.6],[13.6,9.8],[-12.0,10.2],[3.4,-.8],[11.0,2.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-6.8, z:-6.4, dreh:.14, steh:[-6.5,-4.2], kasten:[3.1,1.9], treffer:[2.9,3.2,1.7], baue(g,k){ /* 1 Schminktisch mit Spiegel (eckig und klein, ganz anders als der Zauberspiegel) */
      const F=0xf0b8d4, D=0xb85a8a;
      [-1.2,1.2].forEach(x=>[-.45,.35].forEach(z=>{ walze(g,.09,1.0,D,x,.52,z); ball(g,.12,GOLD,x,.1,z); }));
      box(g,2.75,.36,1.05,F,0,1.12,-.05); box(g,2.9,.1,1.18,D,0,1.34,-.05);
      [-.7,.7].forEach(x=>{ box(g,1.15,.24,.04,CREME,x,1.12,.49); ball(g,.065,GOLD,x,1.12,.54); });
      box(g,1.85,1.5,.14,D,0,2.18,-.46); box(g,1.95,.1,.2,GOLD,0,2.96,-.46);
      spiegelGlas(g,1.38,1.12,0,2.14,-.38);
      const M=lampenMaterial(); [-.72,-.36,0,.36,.72].forEach(x=>hell(ball(g,.095,M,x,2.82,-.34))); [1.62,1.95,2.28,2.55].forEach(y=>[-.81,.81].forEach(x=>hell(ball(g,.095,M,x,y,-.34))));
      schein(g,'rgba(255,226,150,.4)',0,2.85,-.2,1.5);
      /* Lippenstifte, Puderdose mit Quaste, Pinsel im Becher, Duftflasche */
      [[-1.15,ROT],[-.94,PINK],[-.73,0xc82a6a]].forEach(([x,f])=>{ walze(g,.065,.2,GOLD,x,1.49,.12); walze(g,.045,.13,f,x,1.65,.12); ball(g,.045,f,x,1.71,.12); });
      walze(g,.27,.12,TUERKIS,-.25,1.45,.18); liegend(ring(g,.27,.025,GOLD,-.25,1.52,.18)); ball(g,.19,WEISS,-.25,1.6,.18,1,.65,1); ball(g,.05,ROSA,-.25,1.72,.18);
      rohr(g,.15,.12,.3,LILA,.65,1.54,-.08,12); [[-.1,HOLZ,ROT],[0,HELLHOLZ,WEISS],[.1,HOLZ2,GELB]].forEach(([a,s,f])=>{ strich(g,[.65+a*.3,1.6,-.08],[.65+a*1.8,2.0,-.08],.025,s); ball(g,.06,f,.65+a*1.95,2.04,-.08,.8,1.4,.8); });
      rohr(g,.08,.17,.28,0x70d0e8,1.12,1.53,.12,10); ball(g,.08,GOLD,1.12,1.75,.12);
      const q=box(g,.55,.07,.12,HOLZ2,.28,1.43,.3); q.rotation.y=.35; ball(g,.14,HOLZ,.58,1.44,.2,1.1,.45,.9);
      /* runder Hocker davor */
      walze(g,.4,.18,SAMT,0,.62,.52); liegend(ring(g,.4,.04,GOLD,0,.55,.52)); [0,1,2].forEach(i=>{ const a=i*2.094+.5; strich(g,[Math.cos(a)*.36,0,.52+Math.sin(a)*.3],[Math.cos(a)*.22,.56,.52+Math.sin(a)*.18],.055,GOLD); }); } },
  { x:-10.2, z:.4, dreh:.2, steh:[-9.7,2.7], kasten:[4.1,1.9], treffer:[3.9,3.5,1.5], baue(g,k){ /* 2 Kleiderständer mit fünf bunten Kleidern */
      [-1.75,1.75].forEach(x=>{ walze(g,.09,3.1,METALL,x,1.65,0); ball(g,.15,GOLD,x,3.25,0); strich(g,[x,.22,-.55],[x,.22,.55],.08,METALL2); [-.55,.55].forEach(z=>ball(g,.13,SCHWARZ,x,.13,z)); });
      quer(walze(g,.07,3.6,METALL,0,3.1,0)); quer(walze(g,.05,3.5,METALL2,0,.22,0));
      [[-1.3,ROT,GELB,1.0],[-.65,BLAU,WEISS,1.55],[0,GELB,GRUEN,1.2],[.65,GRUEN,CREME,1.6],[1.3,PINK,LILA,1.1]].forEach(([x,F,D,L],i)=>{
        const q=gruppe(g,x,0,(i%2?.06:-.04)); q.rotation.y=(i-2)*.05+.12;
        ring(q,.1,.022,GOLD,0,3.1,0,4.7); strich(q,[0,3.0,0],[0,2.86,0],.022,GOLD);
        strich(q,[0,2.88,0],[-.36,2.68,0],.035,HELLHOLZ); strich(q,[0,2.88,0],[.36,2.68,0],.035,HELLHOLZ);
        rohr(q,.27,.2,.75,F,0,2.34,0,14).scale.z=.5;
        [-1,1].forEach(s=>{ strich(q,[s*.22,2.66,0],[s*.4,2.2,.03],.085,F); ball(q,.095,D,s*.4,2.2,.03); });
        rohr(q,.2,.42,L,F,0,1.96-L/2,0,16).scale.z=.5; walze(q,.215,.09,D,0,1.98,0).scale.z=.115;
        const u=ring(q,.42,.045,D,0,1.97-L,0); u.rotation.x=Math.PI/2; u.scale.y=.5;
        if(i%2) [.25,.62,1.0].forEach((a,j)=>ball(q,.075,D,(j-1)*.09,1.9-a*(L/1.4),.24,1,1,.35)); else [0,1,2].forEach(j=>ball(q,.065,D,0,2.55-j*.22,.15,1,1,.5));
      }); } },
  { x:7.6, z:.4, steh:[7.3,2.6], r:1.35, treffer:[2.5,2.9,2.2], baue(g,k){ /* 3 Hutschachteln: gestapelt, mit Deckeln, Schleife und einem Hut obendrauf */
      const dose=(par,x,y,z,r,h,F,S,D)=>{ walze(par,r,h,F,x,y+h/2,z); for(let i=0;i<14;i++){ const a=i*Math.PI/7; const s=box(par,r*.19,h*.98,.025,S,x+Math.sin(a)*r,y+h/2,z+Math.cos(a)*r); s.rotation.y=a; } walze(par,r*1.09,h*.24,D,x,y+h*.93,z); liegend(ring(par,r*1.09,.025,GOLD,x,y+h*.81,z)); liegend(ring(par,r*1.01,.025,GOLD,x,y+.03,z)); };
      dose(g,-.15,0,-.1,1.0,.75,PINK,CREME,ROSA);
      const m=gruppe(g,-.2,.78,-.14); dose(m,0,0,0,.74,.6,TUERKIS,WEISS,0x1f7a78);
      const o=gruppe(g,-.14,1.42,-.1); dose(o,0,0,0,.52,.48,GELB,ORANGE,ORANGE);
      /* Hut mit breiter Krempe, Band und Feder */
      walze(g,.58,.06,LILA,-.14,1.95,-.1); ball(g,.31,LILA,-.14,2.05,-.1,1,.95,1); walze(g,.315,.1,ROT,-.14,2.07,-.1);
      Z.vieleck(g,[[.14,2.14,.14],[.17,2.34,.13],[.28,2.58,.11],[.56,2.9,.08],[.42,2.58,.11],[.3,2.34,.13]],WEISS); strich(g,[.1,2.08,.15],[.48,2.76,.1],.012,PINK);
      /* Schleife und Anhänger an der mittleren Schachtel */
      [-1,1].forEach(s=>{ const f=kegel(g,.15,.34,ROT,-.2+s*.17,1.27,.68); f.rotation.z=s*Math.PI/2; strich(g,[-.2,1.27,.68],[-.2+s*.22,.9,.9],.035,ROT); }); ball(g,.09,GOLD,-.2,1.27,.72);
      /* kleine Schachtel daneben */
      dose(g,.95,0,.62,.46,.42,HELLLILA,CREME,LILA); } },
  { x:-4.4, z:4.3, dreh:.12, steh:[-4.1,6.5], kasten:[3.2,2.1], treffer:[3.0,1.8,1.9], baue(g,k){ /* 4 Clownsschuhe: zwei riesige rote Schuhe */
      const R1=0xe02a24, SOHLE=0x24140c;
      [[-.12,-.48,.14],[.12,.5,-.1]].forEach(([x,z,w],i)=>{ const s=gruppe(g,x,0,z); s.rotation.y=w;
        ball(s,.5,SOHLE,.55,.13,0,1.55,.24,1.02); ball(s,.45,SOHLE,-.65,.13,0,1.2,.26,.9); box(s,1.1,.12,.7,SOHLE,0,.12,0);
        ball(s,.52,R1,.66,.45,0,1.2,.86,.92); ball(s,.45,R1,-.02,.36,0,1.6,.62,.78); ball(s,.4,R1,-.68,.45,0,.95,.95,.84);
        rohr(s,.31,.37,.52,R1,-.68,.78,0,16); liegend(ring(s,.31,.085,GELB,-.68,1.05,0)); walze(s,.27,.03,SOHLE,-.68,1.05,0);
        /* Zunge und gekreuzte Schnürsenkel */
        const z1=box(s,.42,.1,.4,GELB,-.28,.7,0); z1.rotation.z=-.38;
        [0,1,2].forEach(j=>{ const a=-.46+j*.22, y=.83-j*.08; strich(s,[a,y,-.24],[a+.2,y-.06,.24],.032,WEISS); strich(s,[a,y,.24],[a+.2,y-.06,-.24],.032,WEISS); });
        [-1,1].forEach(v=>{ const r=ring(s,.15,.035,WEISS,-.5,.94,v*.17); r.rotation.set(-v*.7,0,v*.2); strich(s,[-.5,.9,0],[-.34,.62,v*.46],.025,WEISS); });
        /* Flicken und Bommel */
        const f=box(s,.34,.3,.04,i?BLAU:GRUEN,.2,.42,.34); f.rotation.z=.2; [-.1,.1].forEach(a=>ball(s,.025,CREME,.2+a,.42+a,.37));
        ball(s,.17,i?TUERKIS:GELB,.8,.95,0); ball(s,.06,WEISS,.76,1.07,.1); }); } },
  { x:-2.5, z:HINTEN, wand:'hinten', steh:[-2.5,-11.2], kasten:[2.8,1.5], treffer:[2.7,3.5,.9], trefferY:.95, baue(g,k){ /* 5 Glitzerkostüm am Bügel an der Wand */
      const F=0x28c8c0, D=0x127a80, y0=.0, vorn=.34;
      walze(g,.13,.3,GOLD,0,4.42,.18).rotation.x=Math.PI/2; ball(g,.13,GOLD,0,4.42,.36);
      ring(g,.15,.03,METALL,0,4.24,.32,4.7); strich(g,[0,4.1,.32],[0,3.96,.32],.03,METALL);
      strich(g,[0,3.98,.3],[-.7,3.68,.3],.06,HELLHOLZ); strich(g,[0,3.98,.3],[.7,3.68,.3],.06,HELLHOLZ);
      Z.vieleck(g,[[-.64,3.7,vorn],[-.24,3.84,vorn],[0,3.58,vorn],[.24,3.84,vorn],[.64,3.7,vorn],[.44,3.1,vorn],[.36,2.5,vorn],[-.36,2.5,vorn],[-.44,3.1,vorn]],F);
      [-1,1].forEach(s=>{ ball(g,.25,D,s*.66,3.6,vorn,1,.8,.55); strich(g,[s*.74,3.5,vorn],[s*1.02,2.55,vorn],.13,F); ball(g,.15,GOLD,s*1.03,2.5,vorn,1,.6,.7); });
      /* weiter Rock aus zwei Lagen mit Zacken */
      Z.vieleck(g,[[-.36,2.48,vorn+.04],[.36,2.48,vorn+.04],[1.18,1.5,vorn+.04],[.78,1.62,vorn+.04],[.4,1.38,vorn+.04],[0,1.58,vorn+.04],[-.4,1.38,vorn+.04],[-.78,1.62,vorn+.04],[-1.18,1.5,vorn+.04]],ROSA);
      Z.vieleck(g,[[-.36,2.5,vorn+.08],[.36,2.5,vorn+.08],[.86,1.86,vorn+.08],[.52,1.98,vorn+.08],[.26,1.78,vorn+.08],[0,1.96,vorn+.08],[-.26,1.78,vorn+.08],[-.52,1.98,vorn+.08],[-.86,1.86,vorn+.08]],PINK);
      box(g,.82,.17,.08,GOLD,0,2.5,vorn+.1); ball(g,.12,ROT,0,2.5,vorn+.16,1,1,.6);
      [[-.3,3.35,.16],[.26,3.05,.2],[-.14,2.78,.12],[.34,3.48,.1],[-.7,1.72,.14],[.66,1.74,.13],[0,2.22,.16],[-.32,2.05,.1],[.36,2.12,.1]].forEach(([x,y,r])=>Z.stern(g,x,y,vorn+.13,r,GELB));
      ball(g,.07,GOLD,0,3.56,vorn+.06);
      /* Zettel am Ärmel */
      strich(g,[1.03,2.45,vorn+.05],[1.1,2.08,vorn+.1],.012,CREME); const z=box(g,.34,.42,.03,CREME,1.12,1.86,vorn+.1); z.rotation.z=.14; [1.94,1.84,1.74].forEach(y=>box(g,.22,.025,.01,HOLZ2,1.12,y,vorn+.125));
      /* funkelnde Sterne */
      const FU=basis(0xffffff,{side:THREE.DoubleSide});
      [[-.95,3.2],[.98,3.75],[-.55,1.2],[.9,2.9],[-.16,3.12]].forEach(([x,y],i)=>{ const q=gruppe(g,x,y,vorn+.2); q.userData.lebendig=true; Z.stern(q,0,0,0,.15,WEISS).material=FU; k.anim.push(t=>{ const s=Math.max(.05,Math.sin(t*2.6+i*1.4)); q.scale.set(s,s,s); q.rotation.z=t+i; }); }); } },
  { x:-9.3, z:HINTEN, wand:'hinten', steh:[-9.3,-11.2], kasten:[2.6,1.5], treffer:[2.5,3.0,.8], trefferY:1.55, baue(g,k){ /* 6 Foto der Clownin Lulu im Goldrahmen */
      box(g,2.2,2.55,.14,GOLD,0,3.0,.14); box(g,1.94,2.3,.06,HOLZ3,0,3.0,.21); Z.tafel(g,lulBild(),1.78,2.08,0,3.0,.255);
      [-1.08,1.08].forEach(x=>[1.76,4.24].forEach(y=>{ ball(g,.18,MESSING,x,y,.2,1,1,.7); ball(g,.08,ROT,x,y,.34); }));
      strich(g,[-.7,4.28,.12],[0,4.72,.1],.02,SCHWARZ); strich(g,[.7,4.28,.12],[0,4.72,.1],.02,SCHWARZ); ball(g,.1,GOLD,0,4.74,.14);
      Z.stern(g,0,1.74,.3,.24,ROT); } },
  { x:9.7, z:-6.0, dreh:-.14, steh:[9.4,-3.8], kasten:[3.3,1.9], treffer:[3.1,3.3,1.7], baue(g,k){ /* 7 Nähmaschine auf dem Nähtisch: hell türkis, hoher Arm mit viel Luft darunter */
      const S=0x3fe0cc;
      [-1.25,1.25].forEach(x=>{ strich(g,[x,0,-.52],[x,1.12,.42],.07,EISEN); strich(g,[x,0,.52],[x,1.12,-.42],.07,EISEN); ring(g,.26,.04,EISEN,x,.56,0).rotation.y=Math.PI/2; });
      box(g,2.5,.06,.16,EISEN,0,.3,0); box(g,.9,.07,.55,METALL2,0,.2,.2);
      box(g,3.0,.14,1.35,HELLHOLZ,0,1.18,0); box(g,3.02,.06,1.37,HOLZ,0,1.09,0);
      /* Maschine: Sockel, Säule rechts, Arm oben, Kopf links mit Nadel */
      box(g,2.0,.16,.65,S,-.05,1.33,-.1); box(g,.42,1.36,.44,S,.72,2.07,-.1); box(g,1.75,.34,.42,S,.06,2.58,-.1); quer(walze(g,.2,1.75,S,.06,2.74,-.1));
      box(g,.4,.6,.46,S,-.78,2.38,-.1); ball(g,.22,S,-.78,2.69,-.1);
      box(g,1.15,.06,.02,GOLD,.02,2.68,.12); [-.38,.02,.42].forEach(x=>Z.stern(g,x,2.52,.13,.075,GOLD)); box(g,1.8,.05,.02,GOLD,-.05,1.33,.235);
      /* Handrad auf seiner Achse an der Säule */
      quer(walze(g,.09,.22,EISEN,1.0,2.4,-.1));
      const rad=gruppe(g,1.06,2.4,-.1); rad.rotation.y=Math.PI/2; ring(rad,.34,.075,METALL,0,0,0); [0,1,2].forEach(i=>{ const a=i*Math.PI/3; strich(rad,[Math.cos(a)*.32,Math.sin(a)*.32,0],[-Math.cos(a)*.32,-Math.sin(a)*.32,0],.035,METALL); }); ball(rad,.1,ROT,0,0,.04);
      walze(g,.045,.32,METALL,.4,3.04,-.1); walze(g,.16,.24,ROT,.4,3.09,-.1); walze(g,.19,.045,HELLHOLZ,.4,3.23,-.1); walze(g,.19,.045,HELLHOLZ,.4,2.95,-.1);
      strich(g,[.25,3.09,-.05],[-.75,2.8,.16],.012,ROT); strich(g,[-.75,2.8,.16],[-.78,2.08,.14],.012,ROT);
      const n=gruppe(g,-.78,1.94,-.02); n.userData.lebendig=true; walze(n,.045,.26,METALL,0,.05,0); walze(n,.018,.38,0xe8f0f8,0,-.24,0); box(n,.22,.035,.12,METALL,0,-.43,0); verschmelze(n);
      k.anim.push(t=>{ n.position.y=1.94+(Math.sin(t*.7)>-.2?Math.abs(Math.sin(t*9))*.11:0); });
      /* schmale, flache Stoffbahn mit Falten links neben der Nadel, vorn hängt ein kurzes Ende */
      box(g,.42,.025,1.14,PINK,-1.24,1.265,.12); [-1.36,-1.22,-1.1].forEach((x,i)=>strich(g,[x,1.285,-.42+i*.07],[x+.03,1.285,.68],.022,i%2?WEISS:ROSA));
      box(g,.42,.4,.025,PINK,-1.24,1.07,.7); [-1.34,-1.14].forEach(x=>strich(g,[x,1.27,.715],[x+.02,.89,.715],.018,ROSA));
      /* Garnrollen, Nadelkissen, Schere */
      [[.25,GELB],[.55,ORANGE],[.85,LILA]].forEach(([x,f])=>{ walze(g,.1,.22,f,x,1.37,.46); walze(g,.125,.035,HELLHOLZ,x,1.49,.46); });
      ball(g,.17,ROT,1.25,1.36,.35,1,.75,1); [[-.07,.04],[.08,-.03],[0,.1]].forEach(([a,c],i)=>{ strich(g,[1.25+a,1.45,.35+c],[1.25+a*2,1.63,.35+c*2],.01,METALL); ball(g,.032,i%2?GELB:WEISS,1.25+a*2,1.64,.35+c*2); }); } },
  { x:13.1, z:-9.4, steh:[12.8,-7.2], kasten:[4.2,1.5], treffer:[4.0,3.5,1.3], baue(g,k){ /* 8 Paravent: drei Felder im Zickzack mit Stoff, runden Bögen und Füßen */
      [[-1.28,.42,PINK,ROSA],[0,-.42,HELLLILA,LILA],[1.28,.42,PINK,ROSA]].forEach(([x,w,F,D],i)=>{ const q=gruppe(g,x,0,i===1?-.02:0); q.rotation.y=w;
        [-.66,.66].forEach(a=>{ box(q,.11,2.9,.13,GOLD,a,1.65,0); box(q,.18,.22,.34,HOLZ2,a,.11,0); ball(q,.09,GOLD,a,3.16,0); });
        box(q,1.3,.1,.12,GOLD,0,.42,0); box(q,1.3,.1,.12,GOLD,0,2.92,0);
        ring(q,.63,.07,GOLD,0,2.92,0,Math.PI).scale.y=.7;
        const o=walze(q,.6,.06,F,0,2.92,0); o.geometry=new THREE.CylinderGeometry(1,1,1,18,1,false,Math.PI/2,Math.PI); o.rotation.x=Math.PI/2; o.scale.set(.62,.06,.43);
        for(let j=0;j<6;j++) box(q,.205,2.42,.05+(j%2)*.03,j%2?D:F,-.5+j*.2,1.67,0);
        Z.stern(q,0,2.15,.08,.27,GELB); Z.stern(q,-.2,1.2,.08,.13,CREME); Z.stern(q,.24,.82,.08,.13,CREME); });
      /* Tuch über dem rechten Feld */
      const t=gruppe(g,1.28,0,0); t.rotation.y=.42; box(t,.7,.1,.34,TUERKIS,.15,3.02,0); box(t,.7,1.0,.05,TUERKIS,.15,2.55,.16); box(t,.7,.09,.065,GELB,.15,2.2,.165); for(let i=0;i<7;i++) box(t,.04,.18,.03,GELB,-.15+i*.1,1.98,.16); } },
  Object.assign({ x:3.7, z:4.4, steh:[3.5,6.6] }, Z.NEU.koffer),
  Object.assign({ x:12.0, z:6.0, steh:[11.2,8.0] }, Z.NEU.zylinderhase)
];
return { titel:'Die Garderobe', breite:B, tiefe:T, oben:['30,12,26','56,24,48','90,40,74'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Das Tierzelt. Blau-weißes Zelt mit Stroh auf dem Boden, hölzerne Boxen an der Rückwand und an beiden Seiten
   mit kleinen Ponys und jungen Ziegen, warme Hängelampen, Heuhaufen, Hundehütte, laufende Hunde, ein Zicklein, Hühner und Mäuse.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Hundekörbchen) und 10 (Schubkarre) kommen aus zirkus-gemeinsam.js.
   Ausgang: das bunte Gatter links in der Rückwand, beide Flügel schwingen nach hinten auf. */
RAEUME3D.zirkus[2] = (function(){
const Z=ZIRKUS;
const { ROT, ROT2, GELB, BLAU, BLAU2, GRUEN, ROSA, LILA, TUERKIS, ORANGE, CREME, WEISS, SCHWARZ, GOLD, MESSING, METALL, METALL2, EISEN, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER, LEDER2, STROH, STROH2, SEIL, liegend, quer, ohneSchatten } = Z;
const B=36, T=27, HINTEN=-13.5;
const AX=-7; /* Mitte des Ausgangs */
const HAFER=0xe0b050, WASSER=0x4aa8e0;

/* ---------- weniger Zeichenaufrufe ---------- */
/* fasst alle festen Teile unter g zu einem Körper mit Farben je Eckpunkt zusammen. ausser = bewegte Untergruppen, die einzeln bleiben.
   Leuchtende, durchsichtige und bebilderte Teile bleiben, wie sie sind. Das Ergebnis ist gegen ein zweites Verschmelzen geschützt. */
function buendeln(g,ausser){
  const A=ausser||[]; g.updateMatrixWorld(true);
  const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(), toepfe=[{ P:[],N:[],C:[],weg:0,schatten:false },{ P:[],N:[],C:[],weg:0,schatten:false }], weg=[];
  g.traverse(m=>{ if(!m.isMesh || m.isInstancedMesh || !m.material.visible || m.material.transparent || m.material.map || m.material.isMeshBasicMaterial) return;
    for(let p=m; p && p!==g; p=p.parent) if(A.indexOf(p)>=0) return;
    const t=toepfe[m.material.side===THREE.DoubleSide?1:0], q=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone();
    q.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));
    const pa=q.attributes.position.array, na=q.attributes.normal.array, c=m.material.color;
    for(let i=0;i<pa.length;i+=3){ t.P.push(pa[i],pa[i+1],pa[i+2]); t.N.push(na[i],na[i+1],na[i+2]); t.C.push(c.r,c.g,c.b); }
    if(m.castShadow) t.schatten=true; t.weg++; weg.push(m); q.dispose(); });
  weg.forEach(m=>m.parent.remove(m));
  toepfe.forEach((t,i)=>{ if(!t.weg) return;
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(t.P,3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute(t.N,3)); geo.setAttribute('color',new THREE.Float32BufferAttribute(t.C,3));
    const neu=new THREE.Mesh(geo,mat(0xffffff,i?{ vertexColors:true, side:THREE.DoubleSide }:{ vertexColors:true })); neu.castShadow=t.schatten; neu.receiveShadow=true; neu.userData.lebendig=true; g.add(neu); });
}
/* Tier mit bewegten Teilen: erst die inneren Teile bündeln (innen vor außen angeben), dann den Rest */
function tierBuendeln(g,teile){ teile.forEach((t,i)=>buendeln(t,teile.slice(0,i))); buendeln(g,teile); return g; }

/* ---------- Heu ---------- */
/* lockerer Heuhaufen (rund und weich, damit er nicht wie ein Heuballen aussieht). teile = [[x,y,z,Radius x,Höhe,Radius z,Anzahl Halme]]
   Die Halme sind kurz, liegen dicht an und haben fast die Farbe des Haufens. */
function heu(par,teile){
  const L=[], farben=[0xe4c05c,0xd8b04c,0xc89e40,0xe8c868];
  teile.forEach(([x,y,z,a,h,c,n])=>{
    ball(par,1,0xd2aa48,x,y,z,a*.94,h*.94,c*.94);
    for(let i=0;i<n*.6;i++){ const az=i*2.39996+zufall()*.4, el=Math.asin(Math.min(.99,(i+.5)/(n*.6))), r=.94+zufall()*.06;
      L.push([x+Math.cos(el)*Math.cos(az)*a*r, y+Math.max(.03,Math.sin(el)*h*r), z+Math.cos(el)*Math.sin(az)*c*r, .14+zufall()*.14,.025,.04, farben[i%4],
        -az+1.57+(zufall()-.5)*1.2, 0, (zufall()-.5)*.5]); }
  });
  return Z.viele(par,GEO.box,L);
}
/* dezente Einstreu auf dem Boden: wenige kurze Halme in gedeckten Farben */
function streu(par,x,z,r,n){
  const L=[]; for(let i=0;i<n*.55;i++){ const a=zufall()*6.28, d=Math.sqrt(zufall())*r; L.push([x+Math.cos(a)*d,.012+zufall()*.012,z+Math.sin(a)*d,.12+zufall()*.14,.008,.035,[0xc29c5c,0xcaa866,0xb89054][i%3],zufall()*3.14]); }
  return Z.viele(par,GEO.box,L);
}
/* Heuballen mit zwei Schnüren, Strohflecken und kurzen, anliegenden Halmen an Seiten und Kanten, Fuß bei y */
function ballen(par,x,y,z,b,h,t,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0; box(g,b,h,t,STROH,0,h/2,0); [-.27,.27].forEach(v=>box(g,.08,h+.03,t+.03,LEDER2,v*b,h/2,0));
  box(g,b+.012,.035,t+.012,0xd4b048,0,h*.34,0); box(g,b+.012,.035,t+.012,0xd4b048,0,h*.68,0);
  for(let i=0;i<20;i++){ const f=i%2?0xdcb84c:0xf0d06a, a=(zufall()-.5)*(b-.35);
    box(g,.16+zufall()*.12,.04,.012,f,a,.08+zufall()*(h-.16),(i%4<2?1:-1)*(t/2+.006)); box(g,.16+zufall()*.12,.012,.04,f,(zufall()-.5)*(b-.35),h+.006,(zufall()-.5)*(t-.2)); }
  const halm=(w,d,c,px,py,pz,rz,ry)=>{ const m=box(g,w,.022,d,c,px,py,pz); m.rotation.set(0,ry||0,rz||0); m.castShadow=false; };
  const ton=[0xf6da78,0xc89c34,0xe8c458];
  for(let i=0;i<34;i++){ const s=i%2?1:-1; halm(.13+zufall()*.1,.014,ton[i%3],(zufall()-.5)*(b-.2),.07+zufall()*(h-.12),s*(t/2+.014),(zufall()-.5)*.9); }
  for(let i=0;i<16;i++){ const s=i%2?1:-1, m=box(g,.014,.022,.13+zufall()*.1,ton[i%3],s*(b/2+.014),.08+zufall()*(h-.14),(zufall()-.5)*(t-.2)); m.rotation.x=(zufall()-.5)*.9; m.castShadow=false; }
  /* Halme, die knapp über die Oberkanten und Ecken ragen */
  for(let i=0;i<28;i++){ const s=i%2?1:-1; halm(.14+zufall()*.08,.018,ton[i%3],-b/2+.08+(i*.618%1)*(b-.16),h+.012,s*(t/2),(zufall()-.5)*.5,(zufall()-.5)*.8); }
  for(let i=0;i<16;i++){ const s=i%2?1:-1; halm(.15,.018,ton[i%3],s*(b/2),i<8?h-.02:.12+(i%4)*.16,-t/2+.06+(i*.37%1)*(t-.12),s*(zufall()*.5-.1),(zufall()-.5)*.9); }
  return g;
}

/* ---------- Bilder ---------- */
function draussenBild(){
  return bild(256,256,(g)=>{ const v=g.createLinearGradient(0,0,0,170); v.addColorStop(0,'#8ac8ff'); v.addColorStop(1,'#ffe8c0'); g.fillStyle=v; g.fillRect(0,0,256,256);
    g.fillStyle='#fff6c0'; g.beginPath(); g.arc(194,56,28,0,7); g.fill();
    g.fillStyle='#8ac860'; g.beginPath(); g.ellipse(50,178,150,46,0,0,7); g.fill(); g.fillStyle='#6cb04a'; g.beginPath(); g.ellipse(224,196,140,44,0,0,7); g.fill(); g.fillStyle='#7ec056'; g.fillRect(0,192,256,64);
    g.fillStyle='#f6ecd8'; for(let x=8;x<256;x+=32) g.fillRect(x,164,7,32); g.fillRect(0,172,256,5); g.fillRect(0,185,256,5);
    g.fillStyle='#e8d090'; g.beginPath(); g.moveTo(104,194); g.lineTo(152,194); g.lineTo(206,256); g.lineTo(50,256); g.fill(); });
}
/* kleine Tierzeichnungen für Tafel und Plan: Ursprung = Mitte, Blick nach rechts */
function malTier(g,art,x,y,s){
  g.save(); g.translate(x,y); g.scale(s,s); g.lineCap='round';
  const kreis=(a,b,r,c)=>{ g.fillStyle=c; g.beginPath(); g.arc(a,b,r,0,7); g.fill(); };
  const oval=(a,b,r,t,c,w)=>{ g.fillStyle=c; g.beginPath(); g.ellipse(a,b,r,t,w||0,0,7); g.fill(); };
  const linie=(a,b,c,d,w,f)=>{ g.strokeStyle=f; g.lineWidth=w; g.beginPath(); g.moveTo(a,b); g.lineTo(c,d); g.stroke(); };
  if(art==='pony'){ const F='#c8864a', M='#4a2a14';
    [-26,-14,14,26].forEach(a=>linie(a,8,a,38,8,F)); [-26,-14,14,26].forEach(a=>linie(a,38,a,40,9,M)); oval(0,2,36,20,F); linie(22,-6,36,-30,18,F); oval(45,-30,17,11,F,.5); linie(30,-42,32,-50,6,F); linie(18,-16,30,-40,8,M); linie(-34,-6,-46,24,10,M); kreis(44,-34,2.8,'#140c06'); }
  else if(art==='ziege'){ const F='#f4f0e6', D='#6a6058';
    [-22,-10,12,22].forEach(a=>linie(a,10,a,40,6,D)); oval(0,4,32,18,F); g.strokeStyle=D; g.lineWidth=3; g.beginPath(); g.ellipse(0,4,32,18,0,0,7); g.stroke(); linie(20,-4,32,-24,14,F); oval(39,-26,15,10,F,.35);
    g.strokeStyle='#b08850'; g.lineWidth=5; g.beginPath(); g.moveTo(34,-34); g.quadraticCurveTo(24,-52,12,-46); g.stroke(); oval(24,-24,10,4,D,-.5); linie(46,-18,44,-6,5,D); kreis(41,-29,2.6,'#140c06'); linie(-30,-6,-38,-18,6,D); }
  else { const F='#d89a52', D='#6a3a18';
    [-20,-10,12,22].forEach(a=>linie(a,10,a,38,7,F)); oval(0,6,30,16,F); oval(16,10,12,10,'#fff6e8'); kreis(30,-14,18,F); oval(46,-8,12,8,'#fff6e8'); kreis(55,-10,4.5,'#140c06'); oval(20,-14,7,17,D,.35); kreis(34,-19,2.8,'#140c06'); linie(-28,0,-42,-20,7,F); }
  g.restore();
}
function tiertafelBild(){
  return bild(480,320,(g)=>{ g.fillStyle='#f8efd6'; g.fillRect(0,0,480,320);
    [['#bfe4ff','pony'],['#cdeeb0','ziege'],['#ffd8a8','hund']].forEach(([c,art],i)=>{ const x=14+i*155; g.fillStyle=c; g.fillRect(x,46,142,176); malTier(g,art,x+68,140,1.2);
      g.fillStyle='#6b4a24'; g.fillRect(x+20,240,102,12); g.fillRect(x+34,266,74,12); g.fillRect(x+26,290,90,9); });
    g.fillStyle='#c8302a'; [176,240,304].forEach(x=>{ g.beginPath(); g.arc(x,23,11,0,7); g.fill(); }); });
}
function planBild(){
  return bild(320,420,(g)=>{ g.fillStyle='#24503e'; g.fillRect(0,0,320,420); g.strokeStyle='rgba(255,255,255,.55)'; g.lineWidth=3;
    [142,274].forEach(y=>{ g.beginPath(); g.moveTo(16,y); g.lineTo(304,y); g.stroke(); }); g.beginPath(); g.moveTo(130,18); g.lineTo(130,402); g.stroke();
    ['pony','ziege','hund'].forEach((art,i)=>{ const y=78+i*132; g.fillStyle='#f4ecd8'; g.beginPath(); g.arc(68,y,50,0,7); g.fill(); malTier(g,art,64,y+4,.72);
      if(i===0){ [166,204].forEach(x=>{ g.fillStyle='#ff9a30'; g.beginPath(); g.moveTo(x-15,y-18); g.lineTo(x+15,y-18); g.lineTo(x,y+36); g.fill(); g.strokeStyle='#7ae070'; g.lineWidth=6; [-12,0,12].forEach(v=>{ g.beginPath(); g.moveTo(x,y-18); g.lineTo(x+v,y-40); g.stroke(); }); }); }
      else if(i===1){ g.strokeStyle='#ffe070'; g.lineWidth=5; for(let k=0;k<26;k++){ const x=148+(k*37)%84; g.beginPath(); g.moveTo(x,y+30); g.lineTo(x+((k*13)%41)-20,y-24-(k%4)*6); g.stroke(); } g.strokeStyle='#c8762a'; g.lineWidth=8; g.beginPath(); g.moveTo(148,y+14); g.lineTo(234,y+14); g.stroke(); }
      else { g.strokeStyle='#fff6e8'; g.lineWidth=18; g.lineCap='round'; g.beginPath(); g.moveTo(160,y+14); g.lineTo(222,y-14); g.stroke(); g.fillStyle='#fff6e8'; [[152,y+6],[162,y+28],[220,y-28],[230,y-6]].forEach(([a,b])=>{ g.beginPath(); g.arc(a,b,13,0,7); g.fill(); }); }
      g.strokeStyle='#ffe070'; g.lineWidth=9; g.lineCap='round'; g.beginPath(); g.moveTo(256,y); g.lineTo(270,y+16); g.lineTo(298,y-20); g.stroke(); }); });
}

/* ---------- Ausgang: das bunte Gatter ---------- */
function baueAusgang(k,sc,hinten){
  /* Weg nach draußen hinter der Wand */
  const gang=gruppe(hinten,0,0,0);
  box(gang,4.2,.1,4.4,0xe0c078,AX,-.045,-15.7);
  [-1,1].forEach(s=>{ for(let i=0;i<4;i++) box(gang,.16,3.9,.98,i%2?CREME:BLAU,AX+s*2.28,1.95,-14.25-i*.98); });
  Z.tafel(gang,draussenBild(),4.8,4.1,AX,2.0,-17.9);
  streu(gang,AX,-15.5,1.7,50);
  buendeln(gang); ohneSchatten(gang); gang.visible=false;

  /* fester Rahmen: zwei gestreifte Pfosten, Balken mit Stern und Hufeisen */
  const r=gruppe(hinten,0,0,0);
  [-1,1].forEach(s=>{ const x=AX+s*2.35; box(r,.48,.34,.5,HOLZ3,x,.17,-13.22); walze(r,.2,4.0,CREME,x,2.15,-13.22); for(let y=.6;y<3.9;y+=.62){ walze(r,.215,.3,ROT,x,y,-13.22); } ball(r,.3,GOLD,x,4.5,-13.22); });
  box(r,5.0,.34,.36,HOLZ2,AX,3.88,-13.25); box(r,5.05,.07,.4,GOLD,AX,4.08,-13.25);
  Z.stern(r,AX,4.55,-13.12,.45,GELB);
  [-1.15,1.15].forEach(v=>ring(r,.24,.07,METALL,AX+v,4.38,-13.15,Math.PI*1.5).rotation.z=-Math.PI*.25);
  buendeln(r);

  /* zwei Flügel aus bunten Brettern */
  const farben=[ROT,GELB,TUERKIS,GRUEN];
  const fluegel=s=>{
    const dreh=gruppe(hinten,AX+s*2.1,0,-13.32); dreh.userData.lebendig=true;
    const f=gruppe(dreh,-s*1.05,0,0);
    for(let i=0;i<4;i++){ const x=-.78+i*.52, c=farben[s<0?i:(i+2)%4]; box(f,.5,3.45,.14,c,x,1.8,0); box(f,.03,3.45,.02,HOLZ3,x+.255,1.8,.08); liegend(walze(f,.25,.14,c,x,3.52,0)); }
    [.5,1.5,3.1].forEach(y=>box(f,2.08,.2,.08,CREME,0,y,.11));
    strich(f,[s*.95,.55,.12],[-s*.95,1.45,.12],.075,CREME);
    [.5,3.1].forEach(y=>{ box(f,.7,.1,.04,EISEN,s*.68,y,.17); ball(f,.08,EISEN,s*.36,y,.18,1,1,.5); });
    return { dreh, f };
  };
  const li=fluegel(-1), re=fluegel(1);
  /* Schlossplatte mit großem Zahlenschloss am linken Flügel, reicht über die Mitte */
  const p=gruppe(li.f,1.05,2.28,.2);
  box(p,1.7,1.35,.1,HOLZ3,0,0,0); [-.87,.87].forEach(x=>box(p,.1,1.45,.12,GOLD,x,0,.02)); [-.69,.69].forEach(y=>box(p,1.84,.1,.12,GOLD,0,y,.02));
  Z.zahlenschloss(p,0,-.14,.17).scale.setScalar(1.35);
  buendeln(li.dreh); buendeln(re.dreh);
  const schimmer=schein(p,'rgba(255,225,120,.5)',0,0,.4,1.6);

  const licht=new THREE.PointLight(0xfff0c0,0,12,1.5); licht.position.set(AX,3,-14.9); sc.add(licht);
  k.kasten(AX,-13.2,5.2,.7);
  return ausgang(k,{ name:'Buntes Gatter', einfach:'Buntes Gatter', steh:[AX+1.7,-11.4], durch:[AX,-15.5],
    treffer:{x:AX,y:2.0,z:-12.95,b:4.4,h:3.9,t:.8}, schildOben:[AX,4.9,-12.1], glanz:[AX,2.3,-12.5],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.9)), w=a*a*(3-2*a);
      li.dreh.rotation.y=w*Math.PI*.51; re.dreh.rotation.y=-w*Math.PI*.51; gang.visible=auf>.02; licht.intensity=1.7*auf;
      schimmer.visible=auf<.3; const q=1.55+Math.sin(t*2.2)*.2; schimmer.scale.set(q,q,1); } });
}

/* ---------- junge Ziege (braun oder dunkel, ohne Glocke, damit Gerda eindeutig bleibt), Blick nach +x ---------- */
function zicklein(k,par,x,z,dreh,gr,fell,fleck,o){
  const opt=o||{}, ph=opt.phase||0;
  const g=gruppe(par,x,0,z); g.rotation.y=dreh; g.scale.setScalar(gr); g.userData.lebendig=true;
  const r=gruppe(g,0,0,0); ball(r,.38,fell,0,.82,0,1.45,.95,.85); ball(r,.24,fleck,-.18,1.0,0,1.2,.7,1.15); ball(r,.27,fell,.36,.88,0); strich(r,[-.5,.98,0],[-.66,1.18,0],.07,fell); verschmelze(r);
  const beine=[[.36,.17],[.36,-.17],[-.38,.17],[-.38,-.17]].map(([a,c])=>{ const q=gruppe(g,a,.68,c); q.userData.lebendig=true; strich(q,[0,.04,0],[.01,-.6,0],.075,fell); ball(q,.085,SCHWARZ,.02,-.61,0,1.1,.8,1); verschmelze(q); return q; });
  const kopf=gruppe(g,.58,1.15,0); kopf.userData.lebendig=true;
  strich(kopf,[-.1,-.2,0],[.13,.2,0],.15,fell); ball(kopf,.22,fell,.18,.28,0,1.15,1,.95); ball(kopf,.12,fleck,.42,.18,0,1.1,.85,1);
  [-1,1].forEach(s=>{ ball(kopf,.045,SCHWARZ,.32,.35,s*.17); ball(kopf,.015,WEISS,.34,.37,s*.21); const e=ball(kopf,.15,fleck,.07,.26,s*.31,.6,.32,1.15); e.rotation.x=s*.4; strich(kopf,[.14,.46,s*.09],[.07,.62,s*.12],.04,0xd8c098); });
  verschmelze(kopf);
  k.anim.push(t=>{ const u=t+ph; kopf.rotation.z=Math.sin(u*1.4)*.1-(Math.sin(u*.45)>.7?.35:0); if(opt.laeuft) beine.forEach((b,i)=>b.rotation.z=Math.sin(u*8+[0,3.14,3.14,0][i])*.4); });
  return { g, kopf, beine };
}

/* ---------- Tierbox. Eigene Richtung: Wand bei z=0, Front bei z=tief ---------- */
function stall(par,x,z,dreh,w,tief,o){
  const q=gruppe(par,x,0,z); q.rotation.y=dreh;
  const dh=o.tuer||1.15, F=o.farbe;
  /* Bretterwand hinten und Strohboden */
  box(q,w,2.3,.1,0x7a4c24,0,1.15,.08); for(let a=-w/2+.5;a<w/2-.2;a+=.5) box(q,.035,2.25,.02,HOLZ3,a,1.15,.14); box(q,w,.14,.16,HELLHOLZ,0,2.34,.12);
  box(q,w-.2,.05,tief-.2,0xd0a444,0,.025,tief/2);
  /* Trennwände und Pfosten */
  [-1,1].forEach(s=>{ const a=s*(w/2-.07); box(q,.12,1.35,tief-.1,HOLZ2,a,.68,tief/2); box(q,.18,.12,tief,HELLHOLZ,a,1.4,tief/2);
    box(q,.24,2.35,.24,HOLZ3,a,1.18,tief); ball(q,.17,F,a,2.5,tief); });
  /* niedrige Front mit buntem Rand und Kreuzbrettern */
  box(q,w-.3,dh,.1,HOLZ,0,dh/2+.04,tief);
  box(q,w-.3,.14,.18,F,0,dh+.08,tief); box(q,w-.3,.14,.14,F,0,.16,tief+.02);
  [-1,0,1].forEach(v=>box(q,.14,dh-.1,.14,F,v*(w/2-.3),dh/2+.07,tief+.015));
  [-1,1].forEach(s=>{ const m=s*(w/4-.07), b=w/4-.35; strich(q,[m-b,.3,tief+.08],[m+b,dh-.1,tief+.08],.045,CREME); strich(q,[m-b,dh-.1,tief+.08],[m+b,.3,tief+.08],.045,CREME); });
  ring(q,.17,.05,METALL,0,dh*.55,tief+.13,Math.PI*1.5).rotation.z=-Math.PI*.25;
  /* Heuraufe an der Rückwand */
  const hx=o.raufe===undefined?-w/4:o.raufe;
  for(let i=0;i<6;i++){ const a=hx-.55+i*.22; strich(q,[a,1.45,.2],[a,2.0,.55],.025,EISEN); }
  strich(q,[hx-.62,2.0,.55],[hx+.62,2.0,.55],.035,EISEN);
  ball(q,.5,STROH,hx,1.82,.3,1.15,.55,.5); for(let i=0;i<7;i++) ball(q,.15,i%2?0xe4c05c:0xd2aa48,hx-.5+i*.17,1.98+(i%3)*.05,.36,1.1,.7,.9);
}
function boxen(k,sc,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  /* Rückwand */
  stall(h,-13.9,HINTEN,0,7.4,2.6,{ farbe:ROT, raufe:-2.3 });
  stall(h,9.1,HINTEN,0,5.6,2.6,{ farbe:GELB, tuer:.95 });
  stall(h,14.85,HINTEN,0,5.8,2.6,{ farbe:ROT, raufe:1.2 });
  k.kasten(-13.9,-12.15,7.6,2.8); k.kasten(11.95,-12.15,11.6,2.8);
  /* Seiten: [z, Farbe, Fronthöhe] */
  [[-8.65,GELB,1.15],[-4.15,ROT,.95],[.35,GRUEN,1.15]].forEach(([z,f,d])=>stall(L,-18,z,Math.PI/2,4.5,3.4,{ farbe:f, tuer:d }));
  [[-8.65,GRUEN,.95],[-4.15,GELB,1.15],[.35,ROT,.95]].forEach(([z,f,d])=>stall(R,18,z,-Math.PI/2,4.5,3.4,{ farbe:f, tuer:d }));
  k.kasten(-16.25,-4.15,3.7,13.7); k.kasten(16.25,-4.15,3.7,13.7);
  [h,L,R].forEach(g=>{ buendeln(g); ohneSchatten(g); });
  [[hinten,-15.0,-12.2],[links,-16.4,-8.8],[rechts,16.4,-4.4],[hinten,14.6,-12.2]].forEach(([p,x,z])=>streu(p,x,z,1.1,40));
  [[links,-16.2,.3],[rechts,16.2,.3],[hinten,9.0,-12.1]].forEach(([p,x,z])=>streu(p,x,z,1.1,30));

  /* Tiere in den Boxen: nur Hals, Kopf und Schwanz bleiben beweglich */
  const pony=(par,x,z,d,gr,o)=>{ const t=Z.pony(k,par,x,z,d,gr,Object.assign({ punkte:false, federbusch:false },o)); tierBuendeln(t.g,[t.hals]); ohneSchatten(t.g); };
  const jung=(par,x,z,d,gr,fell,fleck,phase)=>{ const t=zicklein(k,par,x,z,d,gr,fell,fleck,{ phase }); tierBuendeln(t.g,[t.kopf]); ohneSchatten(t.g); };
  const schlaf=(par,x,z,d,fell,phase)=>{ const t=Z.hund(k,par,x,z,d,.8,{ pose:'liegt', farbe:fell, phase }); tierBuendeln(t.g,[t.kopf]); ohneSchatten(t.g); };
  pony(hinten,-13.3,-12.1,.08,.72,{ fell:0xb06a30, maehne:0x3a2010, halfter:GRUEN, phase:1.3 });
  pony(hinten,14.9,-12.1,Math.PI-.08,.68,{ fell:0x8a8e98, maehne:0xe8e4dc, halfter:BLAU, phase:4.1 });
  jung(hinten,9.0,-12.0,-.25,.95,0xb87a42,0xf0dcc0,2.2);
  jung(links,-16.0,-4.3,-.4,1.0,0x4a3a34,0xe8e0d4,.4);
  pony(links,-16.1,.15,-.35,.7,{ fell:0xe0b060, maehne:0xfff0d0, halfter:ROT, phase:2.8 });
  pony(rechts,16.1,-8.75,Math.PI+.35,.7,{ fell:0x4a2e1e, maehne:0x1c100a, halfter:GELB, phase:5.6 });
  jung(rechts,16.0,.25,Math.PI+.4,1.0,0xc89058,0x6a4026,3.5);
  /* in zwei Boxen schläft je ein Hund im Stroh */
  schlaf(links,-16.0,-8.7,-.5,0x8a6a50,1.9);
  schlaf(rechts,16.0,-4.2,Math.PI+.5,0xe8d0a8,4.9);
}

/* ---------- Deko ---------- */
function lampe(g,x,y,z){
  strich(g,[x,y+.95,z],[x,y+.28,z],.022,EISEN); rohr(g,.1,.46,.32,ROT,x,y+.18,z,16,true); ball(g,.1,GOLD,x,y+.36,z); liegend(ring(g,.46,.035,GOLD,x,y+.02,z));
  ball(g,.17,basis(0xffe48a),x,y-.02,z).castShadow=false; schein(g,'rgba(255,200,100,.55)',x,y-.05,z,1.9);
}
function sack(g,x,z,dreh,c){
  const q=gruppe(g,x,0,z); q.rotation.y=dreh;
  ball(q,.52,c,0,.48,0,1,1.05,.82); rohr(q,.2,.42,.45,c,0,.98,0,14); liegend(ring(q,.2,.05,LEDER2,0,1.17,0)); rohr(q,.3,.18,.24,c,0,1.31,0,12);
  strich(q,[0,.3,.45],[0,.75,.45],.025,0x7a9a30); [-1,1].forEach(v=>[0,1,2].forEach(i=>ball(q,.06,0x7a9a30,v*.09,.42+i*.13,.44,.7,1.3,.4)));
}
function huette(k,sc,x,z,dreh){
  const g=gruppe(sc,x,0,z); g.rotation.y=dreh;
  box(g,2.2,1.5,2.0,BLAU,0,.75,0); [-1.05,1.05].forEach(a=>box(g,.14,1.52,.06,CREME,a,.76,1.01));
  liegend(walze(g,.5,.08,HOLZ3,0,.62,1.0)); box(g,1.0,.62,.08,HOLZ3,0,.31,1.0); const rg=ring(g,.52,.07,CREME,0,.62,1.04,Math.PI);
  [-.52,.52].forEach(a=>box(g,.13,.62,.08,CREME,a,.31,1.04));
  Z.vieleck(g,[[-1.1,1.5,1.0],[1.1,1.5,1.0],[0,2.25,1.0]],BLAU); Z.vieleck(g,[[-1.1,1.5,-1.0],[0,2.25,-1.0],[1.1,1.5,-1.0]],BLAU);
  [-1,1].forEach(s=>{ const d=box(g,1.5,.14,2.35,ROT,s*.66,1.92,0); d.rotation.z=-s*.6; });
  strich(g,[0,2.34,-1.18],[0,2.34,1.18],.08,GOLD);
  /* Knochen über dem Eingang */
  strich(g,[-.22,1.5,1.07],[.22,1.5,1.07],.055,WEISS); [-1,1].forEach(s=>[-1,1].forEach(v=>ball(g,.075,WEISS,s*.25,1.5+v*.065,1.07)));
  buendeln(g); k.kasten(x,z,2.6,2.6);
}
function kuerbis(k,g,x,z,gr){
  const q=gruppe(g,x,0,z); q.scale.setScalar(gr);
  for(let i=0;i<6;i++){ const a=i*Math.PI/3; ball(q,.34,i%2?0xf08a24:0xe07818,Math.cos(a)*.18,.32,Math.sin(a)*.18,1,.95,1); }
  strich(q,[0,.55,0],[.08,.8,0],.06,0x4a7a30); ball(q,.18,0x4a8a38,.24,.62,.08,1.2,.2,.8);
  k.kreis(x,z,.55*gr);
}
function heuhaufen(k,g,x,z,gr){
  heu(g,[[x,0,z,.95*gr,.95*gr,.85*gr,170],[x-.4*gr,.3*gr,z+.15,.55*gr,.75*gr,.5*gr,70]]); k.kreis(x,z,1.05*gr);
}
/* Holzbank mit gefalteter Pferdedecke */
function bank(k,g,x,z){
  [-1.25,1.25].forEach(a=>{ box(g,.18,.62,.7,HOLZ3,x+a,.31,z); box(g,.16,1.3,.14,HOLZ3,x+a,.95,z+.36); });
  box(g,3.0,.14,.85,HOLZ,x,.69,z); [1.12,1.45].forEach(y=>box(g,3.0,.22,.1,HOLZ,x,y,z+.36));
  box(g,1.1,.12,.75,ROT,x-.6,.82,z-.02); box(g,1.12,.06,.77,GELB,x-.6,.91,z-.02); box(g,1.05,.09,.7,ROT,x-.6,.98,z-.02);
  k.kasten(x,z+.05,3.2,1.1);
}
function karotten(k,g,x,z){
  /* niedriger Haufen Möhren und Kohl auf Stroh */
  [[-.35,.1],[.4,-.2]].forEach(([a,c],i)=>{ ball(g,.36,0x7ab850,x+a,.34,z+c); for(let j=0;j<6;j++){ const w=j*1.05; ball(g,.26,j%2?0x5a9a38:0x8ac860,x+a+Math.cos(w)*.25,.24,z+c+Math.sin(w)*.25,1,.8,1); } });
  for(let i=0;i<12;i++){ const a=i*.52, d=.65+(i%3)*.14, px=x+Math.cos(a)*d, pz=z+Math.sin(a)*d*.75; const m=kegel(g,.1,.55,ORANGE,px,.11+(i%3)*.04,pz); m.rotation.set(0,-a,-Math.PI/2); strich(g,[px-Math.cos(a)*.25,.12+(i%3)*.04,pz-Math.sin(a)*.25],[px-Math.cos(a)*.48,.2,pz-Math.sin(a)*.44],.035,GRUEN); }
  k.kreis(x,z,1.05);
}
function huhn(k,punkte,tempo,start,c){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0);
  ball(r,.27,c,0,.4,0,1.25,.95,.9); [-1,1].forEach(s=>{ strich(r,[.02,.22,s*.1],[.02,.02,s*.1],.025,ORANGE); box(r,.16,.03,.1,ORANGE,.07,.02,s*.1); });
  [-.12,0,.12].forEach((v,i)=>strich(r,[-.26,.46,v*.4],[-.5,.7+(i===1?.08:0),v],.05,c));
  const kopf=gruppe(g,.24,.52,0); kopf.userData.lebendig=true;
  strich(kopf,[0,0,0],[.12,.2,0],.09,c); ball(kopf,.13,c,.14,.26,0); const s=kegel(kopf,.05,.13,ORANGE,.31,.24,0); s.rotation.z=-Math.PI/2;
  [0,1,2].forEach(i=>ball(kopf,.05,ROT,.08+i*.06,.39+(i===1?.025:0),0,1,1,.5)); [-1,1].forEach(v=>ball(kopf,.022,SCHWARZ,.2,.29,v*.11));
  buendeln(kopf); buendeln(g,[kopf]); ohneSchatten(g);
  k.anim.push(t=>{ kopf.rotation.z=Math.sin(t*1.3+start)>.2?-Math.abs(Math.sin(t*7+start))*.9:0; });
  laeufer(k,g,punkte,tempo,start,11);
}

/* ---------- Gegenstände (Reihenfolge = ort 1 bis 10) ---------- */
const gegenstaende=[
  { x:-10.2, z:-6.4, steh:[-9.8,-4.4], kasten:[3.3,1.5], treffer:[3.3,2.1,1.5], baue(g){ /* 1 Stapel aus drei Heuballen */
      ballen(g,-.8,0,0,1.55,.85,1.15,.03); ballen(g,.82,0,0,1.55,.85,1.15,-.04); ballen(g,.02,.86,0,1.6,.82,1.1,-.08);
      buendeln(g); } },
  { x:-2.7, z:-7.0, steh:[-2.5,-5.1], r:.9, treffer:[1.7,2.2,1.7], baue(g){ /* 2 großer Eimer voll Futter mit Möhren und Apfel */
      rohr(g,.74,.54,1.05,BLAU,0,.56,0,22,true); walze(g,.54,.08,BLAU2,0,.07,0);
      [[.14,.57],[.55,.65]].forEach(([y,r])=>liegend(ring(g,r,.03,BLAU2,0,y,0))); liegend(ring(g,.74,.06,0xd8e0e8,0,1.09,0));
      walze(g,.68,.08,HAFER,0,1.02,0); ball(g,.64,HAFER,0,1.05,0,1,.42,1);
      for(let i=0;i<50;i++){ const a=i*2.4, r=Math.sqrt((i+.5)/50)*.6; ball(g,.05,i%2?0xf6d888:0xb88030,Math.cos(a)*r,1.32-r*r*.55,Math.sin(a)*r,1.4,.7,.8); }
      [[-.3,.15,.55],[.08,-.25,-.15],[.34,.18,-.65]].forEach(([x,z,n])=>{ const c=gruppe(g,x,1.42,z); c.rotation.z=n; kegel(c,.12,.6,ORANGE,0,0,0).rotation.x=Math.PI; [-1,0,1].forEach(v=>strich(c,[0,.28,0],[v*.14,.55,v*.05],.03,GRUEN)); });
      ball(g,.19,ROT,0,1.38,.34); strich(g,[0,1.53,.34],[.05,1.66,.34],.018,HOLZ3); ball(g,.08,GRUEN,.13,1.6,.34,1.3,.3,.8);
      const henkel=ring(g,.74,.035,METALL,0,1.09,0,Math.PI); henkel.rotation.x=-.95; [-1,1].forEach(s=>ball(g,.09,METALL2,s*.74,1.09,0));
      Z.stern(g,0,.58,.69,.2,GELB);
      [[-.75,.55],[-.62,.74],[.7,.6],[.84,.36]].forEach(([x,z])=>ball(g,.05,HAFER,x,.03,z,1.4,.5,.8));
      buendeln(g); } },
  { x:5.4, z:-4.9, dreh:Math.PI+.42, steh:[3.9,-2.5], kasten:[3.8,2.2], treffer:[4.0,3.4,1.7], baue(g,k){ /* 3 Pony Pünktchen */
      const t=Z.pony(k,g,-.28,0,0,1.25,{ halfter:ROT, phase:.7 }); tierBuendeln(t.g,[t.kopf,t.hals,t.schweif]); } },
  { x:-5.6, z:-2.1, dreh:-.45, steh:[-4.2,.1], kasten:[2.9,1.9], treffer:[3.0,2.4,1.5], baue(g,k){ /* 4 Ziege Gerda */
      const t=Z.ziege(k,g,-.3,0,0,1.2,{ phase:1.6 }); tierBuendeln(t.g,[t.kopf.children[1],t.hals,t.schwanz]); } },
  { x:-1.4, z:HINTEN, wand:'hinten', steh:[-1.4,-11.5], kasten:[3.2,.9], treffer:[3.4,2.8,.9], trefferY:1.5, baue(g){ /* 5 Tafel mit Tieren */
      const y=2.85;
      Z.tafel(g,tiertafelBild(),3.0,2.0,0,y,.17); box(g,3.1,2.1,.1,HOLZ3,0,y,.08);
      [-1,1].forEach(s=>{ box(g,3.34,.18,.2,ROT,0,y+s*1.08,.15); box(g,.18,2.3,.2,ROT,s*1.58,y,.15); [-1,1].forEach(v=>ball(g,.1,GOLD,s*1.58,y+v*1.08,.28)); });
      [-1,1].forEach(s=>strich(g,[s*1.3,y+1.15,.14],[0,y+1.75,.14],.03,SEIL)); ball(g,.1,EISEN,0,y+1.75,.14);
      buendeln(g); } },
  { x:3.4, z:HINTEN, wand:'hinten', steh:[3.4,-11.5], kasten:[2.5,.9], treffer:[2.5,3.5,.9], trefferY:1.0, baue(g){ /* 6 Futterplan: hohe grüne Kreidetafel */
      const y=2.8;
      Z.tafel(g,planBild(),2.0,2.62,0,y,.17); box(g,2.1,2.72,.1,HOLZ3,0,y,.08);
      [-1,1].forEach(s=>{ box(g,2.3,.15,.2,HELLHOLZ,0,y+s*1.38,.15); box(g,.15,2.9,.2,HELLHOLZ,s*1.08,y,.15); });
      /* Klemme oben, Ablage mit Kreide unten */
      box(g,.8,.24,.24,METALL,0,y+1.48,.2); ring(g,.14,.04,METALL2,0,y+1.66,.2,Math.PI);
      box(g,2.2,.09,.34,HOLZ,0,1.3,.28); [[-.6,WEISS],[-.18,GELB],[.24,0xff9a8a]].forEach(([x,c])=>quer(walze(g,.05,.32,c,x,1.4,.32))); box(g,.4,.14,.22,0x7a8aa0,.75,1.42,.3);
      buendeln(g); } },
  { x:10.6, z:-2.2, steh:[10.2,-.3], kasten:[2.6,1.5], treffer:[2.6,2.7,1.6], baue(g){ /* 7 offene Kiste mit Zaumzeug */
      [-1,1].forEach(s=>{ box(g,2.3,.85,.12,HOLZ,0,.5,s*.58); box(g,.12,.85,1.12,HOLZ,s*1.09,.5,0); [-1,1].forEach(v=>box(g,.18,.95,.18,MESSING,s*1.1,.5,v*.58)); box(g,2.36,.1,.18,HELLHOLZ,0,.95,s*.58); box(g,.18,.1,1.2,HELLHOLZ,s*1.1,.95,0); });
      box(g,2.2,.12,1.1,HOLZ2,0,.1,0); box(g,2.1,.82,1.04,0x4a2a14,0,.57,0); [.28,.62].forEach(y=>box(g,2.12,.04,.02,HOLZ3,0,y,.65));
      /* hoch offener Deckel mit hellem Feld, davor hängt aufrecht ein großes Zaumzeug */
      const d=gruppe(g,0,.98,-.62); d.rotation.x=-.18; box(d,2.0,1.4,.12,HOLZ,0,.7,0); box(d,1.76,1.22,.04,CREME,0,.7,.07); [-.93,.93].forEach(x=>box(d,.14,1.44,.18,MESSING,x,.7,0));
      const y=.17;
      liegend(walze(d,.09,.14,GOLD,0,1.55,.1));
      ring(d,.42,.065,BLAU,0,1.1,y,Math.PI);                      /* Kopfriemen */
      strich(d,[-.42,1.1,y],[.42,1.1,y],.06,BLAU);                /* Stirnriemen */
      [-1,1].forEach(s=>{ strich(d,[s*.42,1.1,y],[s*.31,.66,y],.06,BLAU); strich(d,[s*.31,.66,y],[s*.33,.4,y],.06,BLAU); ball(d,.095,GOLD,s*.42,1.1,y+.03,1,1,.6); ball(d,.085,GOLD,s*.31,.66,y+.08,1,1,.6); });
      const nase=ring(d,.33,.07,BLAU,0,.66,y+.02); nase.scale.y=.36;      /* Nasenriemen */
      [-1,1].forEach(s=>ring(d,.17,.05,0xe4ecf4,s*.42,.31,y+.02));        /* Gebissringe */
      strich(d,[-.26,.31,y],[.26,.31,y],.04,0xb8c4cc);
      /* Zügel: von den Ringen über die Vorderkante, vorn zu einer Schlaufe verbunden */
      [-1,1].forEach(s=>{ const P=[[s*.56,1.27,-.5],[s*.82,1.1,0],[s*.86,1.08,.68],[s*.66,.62,.73],[s*.32,.36,.73],[0,.3,.73]];
        P.forEach((q,i)=>{ if(i) strich(g,P[i-1],q,.055,LEDER); ball(g,.056,LEDER,q[0],q[1],q[2]); }); });
      box(g,.22,.16,.07,GOLD,0,.3,.75);
      /* aufgerolltes Führseil und Bürste in der Kiste */
      [0,.07].forEach(v=>liegend(ring(g,.28-v,.05,SEIL,-.5,1.02+v,0))); box(g,.55,.16,.26,HELLHOLZ,.5,1.1,0); box(g,.5,.1,.22,HOLZ3,.5,1.0,0);
      buendeln(g); } },
  { x:-10.4, z:2.4, steh:[-10.0,.5], kasten:[3.5,1.5], treffer:[3.5,2.6,1.5], baue(g,k){ /* 8 Wassertränke mit grüner Pumpe */
      [-1.2,.85].forEach(x=>[-1,1].forEach(s=>{ strich(g,[x,.03,s*.62],[x,.5,s*.4],.09,HOLZ3); }));
      box(g,2.7,.14,.85,HOLZ2,-.2,.5,0);
      [-1,1].forEach(s=>{ const w=gruppe(g,-.2,.82,s*.52); w.rotation.x=s*.25; box(w,2.8,.66,.12,HOLZ,0,0,0); box(w,2.82,.035,.02,HOLZ3,0,0,s*.07); box(w,2.92,.1,.18,HELLHOLZ,0,.35,0); [-1.1,1.1].forEach(x=>box(w,.12,.68,.04,METALL2,x,0,s*.075)); });
      [-1,1].forEach(s=>box(g,.14,.7,1.12,HOLZ2,-.2+s*1.36,.82,0));
      box(g,2.62,.1,1.1,WASSER,-.2,1.03,0);
      const wellen=[-.75,.55].map((x,i)=>{ const q=gruppe(g,x,1.095,0); q.userData.lebendig=true; liegend(ring(q,.26,.018,0xd8f4ff,0,0,0)); return q; });
      /* Pumpe mit Schwengel und Auslauf */
      box(g,.5,.2,.6,0x8a8a80,1.55,.1,0); walze(g,.16,1.85,GRUEN,1.55,1.05,0); walze(g,.2,.14,0x2a7a38,1.55,1.98,0); ball(g,.18,GRUEN,1.55,2.08,0);
      strich(g,[1.55,1.75,0],[.95,1.75,0],.085,GRUEN); strich(g,[.95,1.75,0],[.9,1.58,0],.085,GRUEN);
      strich(g,[1.55,2.05,0],[1.85,2.4,0],.055,EISEN); strich(g,[1.85,2.4,0],[1.62,2.5,0],.05,EISEN); ball(g,.09,ROT,1.62,2.5,0);
      const tropfen=gruppe(g,.9,1.45,0); tropfen.userData.lebendig=true; ball(tropfen,.07,0x9ae0ff,0,0,0,.85,1.5,.85);
      ball(g,.14,GELB,-.9,1.14,.15,1.3,.9,1); ball(g,.09,GELB,-.76,1.28,.15); kegel(g,.04,.1,ORANGE,-.65,1.27,.15).rotation.z=-Math.PI/2; ball(g,.02,SCHWARZ,-.73,1.31,.23);
      buendeln(g,[tropfen].concat(wellen)); buendeln(tropfen); wellen.forEach(w=>buendeln(w));
      k.anim.push(t=>{ const u=(t*.9)%1; tropfen.position.y=1.5-u*u*.42; tropfen.visible=u<.95; wellen.forEach((w,i)=>{ const v=(t*.45+i*.5)%1; w.scale.set(.4+v,1,.4+v); }); }); } },
  Object.assign({ x:7.5, z:4.3, steh:[6.6,2.2] }, ZIRKUS.NEU.hundekorb),
  Object.assign({ x:-4.8, z:5.7, steh:[-4.4,3.7] }, ZIRKUS.NEU.schubkarre)
];

function baue(k){
  const sc=k.scene;
  const h=Z.huelle(k,{ B,T,H:6.4, himmelLicht:0xfff0d8, grund:0x5a4430, staerke:.72, sonne:0xffe0b0, sonneStaerke:.4,
    wandBild:Z.streifenBild(0x2f74c8,CREME), bodenBild:Z.kornBild('#a87c4e',['rgba(240,204,96,.65)','rgba(255,232,160,.5)','rgba(85,52,24,.3)']), bodenWdh:[B/7,T/7],
    hintergrund:0x101830, aussen:0x2a1c10, volant:[BLAU,GELB], sockel:1.1, sockelFarbe:HOLZ2, leiste:HELLHOLZ, oeffnung:{x:AX,b:4.2,h:3.75} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc,hinten);
  boxen(k,sc,hinten,links,rechts);

  /* ---------- Lampen und Lichterketten ---------- */
  const lh=gruppe(hinten,0,0,0), lL=gruppe(links,0,0,0), lR=gruppe(rechts,0,0,0);
  [-11.0,1.0,6.0,11.9].forEach(x=>{ strich(lh,[x,4.85,-13.45],[x,4.9,-12.5],.04,EISEN); lampe(lh,x,3.95,-12.5); });
  [[lL,-1],[lR,1]].forEach(([g,v])=>[-6.4,-1.9,6.0].forEach(z=>{ strich(g,[v*17.95,4.85,z],[v*16.4,4.9,z],.04,EISEN); lampe(g,v*16.4,3.95,z); }));
  [lh,lL,lR].forEach(g=>{ buendeln(g); verschmelze(g); ohneSchatten(g); });
  Z.lichterkette(k,hinten,[[[-17.8,5.35,-13.3],[-9.6,5.35,-13.3],.35,12],[[-4.4,5.35,-13.3],[6.0,5.35,-13.3],.35,15],[[6.0,5.35,-13.3],[17.8,5.35,-13.3],.35,16]]);

  /* Hufeisen, Seil und Striegel an der Rückwand */
  const w=gruppe(hinten,0,0,0);
  [1.0,6.0].forEach(x=>ring(w,.26,.075,METALL,x,2.7,-13.4,Math.PI*1.5).rotation.z=-Math.PI*.25);
  [0,1,2].forEach(i=>ring(w,.42-i*.04,.05,SEIL,-11.0+i*.03,2.9-i*.03,-13.36+i*.03)); ball(w,.1,EISEN,-11.0,3.34,-13.35);
  buendeln(w);

  /* ---------- Ausstattung am Boden ---------- */
  const m=gruppe(sc,0,0,0);
  heuhaufen(k,m,-15.6,5.2,1.25); heuhaufen(k,m,-16.4,7.4,.85); heuhaufen(k,m,15.6,11.2,1.15); heuhaufen(k,m,-8.0,11.6,.95);
  sack(m,-15.6,11.4,.3,0xd8c498); sack(m,-14.5,11.8,-.2,0xc4aa7a); sack(m,-14.9,10.4,.6,0xe4d4ae); k.kreis(-15.0,11.2,1.35);
  sack(m,16.9,4.6,-1.2,0xd8c498); sack(m,16.8,5.7,-1.5,0xc4aa7a); k.kasten(16.9,5.15,1.2,2.2);
  bank(k,m,-1.6,11.9); bank(k,m,9.4,11.7);
  karotten(k,m,3.4,11.6); karotten(k,m,16.4,8.2);
  kuerbis(k,m,-11.2,12.0,1.1); kuerbis(k,m,-12.2,11.3,.75); kuerbis(k,m,13.2,12.2,.95);
  buendeln(m);
  huette(k,sc,14.4,5.6,-.65);
  Z.mast(k,-13.4,7.8,6.6,[CREME,BLAU]); Z.mast(k,11.4,8.2,6.6,[CREME,BLAU]);

  /* ein sitzender Hund neben der Hütte */
  const sitzt=Z.hund(k,sc,12.8,-7.6,Math.PI+.9,.9,{ pose:'sitzt', krause:true, farbe:0xf0e0c8, phase:2.4 }); tierBuendeln(sitzt.g,[sitzt.kopf,sitzt.schwanz]); k.kreis(12.8,-7.6,.75);

  /* Stroh auf dem Boden */
  [[-12.8,-8.6,1.4,45],[-7.4,-9.8,1.2,30],[.8,-9.6,1.4,35],[7.4,-9.4,1.5,40],[12.8,-5.2,1.4,35],[-12.6,-1.2,1.5,40],[-10.2,-5.4,2.1,60],[-5.6,-2.0,2.0,55],[5.4,-4.8,2.4,70],
   [10.6,-1.4,1.5,30],[-10.4,3.2,1.8,35],[7.5,4.8,2.0,40],[-4.8,6.2,1.9,40],[-15.2,6.0,2.3,60],[12.8,1.6,1.4,28],[-.8,2.4,1.3,16],[2.4,7.6,1.5,22],[-8.6,8.4,1.4,25],[9.0,9.4,1.4,24]].forEach(([x,z,r,n])=>streu(sc,x,z,r,n));

  /* ---------- flache Kleinigkeiten im Vordergrund (man läuft darüber) ---------- */
  const vorn=gruppe(sc,0,0,0);
  /* Hufspuren zum Gatter */
  [[-.9,1.0],[-1.5,.2],[-1.6,-1.0],[-2.4,-2.0],[-2.5,-3.2],[-3.4,-4.2],[-3.5,-5.4],[-4.4,-6.4],[-4.5,-7.6],[-5.2,-8.7]].forEach(([x,z],i)=>{
    const u=ring(vorn,.15,.045,0x6a4a2c,x,.012,z,Math.PI*1.45); u.rotation.set(-Math.PI/2,0,-Math.PI*.22+(i%2?.35:.6)); u.scale.z=.2; });
  /* Pfotenspuren */
  [[3.2,.2],[2.6,1.0],[2.9,1.9],[2.2,2.6],[1.3,2.9],[.8,3.7],[-.1,4.0]].forEach(([x,z],i)=>{ const a=x+(i%2?.14:-.14);
    ball(vorn,.1,0x6a4a2c,a,.008,z,1.2,.08,1); [[-.13,-.09],[-.05,-.17],[.06,-.17],[.14,-.09]].forEach(([u,v])=>ball(vorn,.042,0x6a4a2c,a+u,.008,z+v,1,.18,1)); });
  /* ein kleiner Hundeball, eine Möhre und ein Apfel */
  ball(vorn,.13,0xb85a48,-2.5,.13,2.5); liegend(ring(vorn,.13,.016,0xd8b860,-2.5,.13,2.5));
  { const c=gruppe(vorn,-3.0,.06,.9); c.rotation.y=.5; kegel(c,.055,.3,0xd88038,0,0,0).rotation.z=-Math.PI/2; [-1,0,1].forEach(v=>strich(c,[-.14,0,0],[-.27,.02,v*.07],.016,0x5a8a40)); }
  ball(vorn,.085,0xb84a3a,2.6,.08,4.6); strich(vorn,[2.6,.15,4.6],[2.62,.2,4.6],.01,HOLZ3);
  buendeln(vorn); ohneSchatten(vorn);
  [[-1.6,1.4,1.1,20],[2.4,3.8,1.2,22],[.2,5.6,1.2,18]].forEach(([x,z,r,n])=>streu(sc,x,z,r,n));

  /* ---------- Leben: die Wege liegen frei zwischen den festen Dingen ---------- */
  const flitzer=(punkte,tempo,start,farbe,gr,krause)=>{ const t=Z.hund(k,sc,punkte[0][0],punkte[0][1],0,gr,{ laeuft:true, krause, farbe, phase:start }); tierBuendeln(t.g,[t.kopf,t.schwanz].concat(t.beine)); laeufer(k,t.g,punkte,tempo,start,9); };
  flitzer([[-12.0,4.9],[-8.2,4.7],[-7.8,8.9],[-11.4,9.6]],2.0,0,0xd89a52,.78,true);
  flitzer([[.2,4.4],[4.2,2.8],[4.6,8.2],[.4,9.2]],1.7,6,0x5a4638,.7,false);
  const zi=zicklein(k,sc,10.0,.8,0,.75,0xf0d8b0,0xa86a38,{ laeuft:true, phase:1.1 }); tierBuendeln(zi.g,[zi.kopf].concat(zi.beine)); laeufer(k,zi.g,[[10.0,.9],[12.9,.6],[12.6,2.9],[10.4,2.4]],.8,2,8);
  huhn(k,[[.2,-9.4],[1.8,-8.2],[1.0,-6.6],[-.4,-7.8]],.55,0,WEISS);
  huhn(k,[[8.2,-8.6],[10.4,-7.4],[9.4,-5.8],[8.0,-6.8]],.5,2.5,0xc0702c);
  maeuschen(k,[[-13.4,.2],[-12.2,-3.0],[-13.6,-4.6],[-13.8,-1.6]],1.4,1);
  maeuschen(k,[[5.4,10.0],[7.8,9.2],[8.0,7.4],[5.8,8.4]],1.6,4);

  /* ---------- Licht (zusammen mit dem Ausgang 5 Punktlichter) ---------- */
  flacker(k,-11.0,3.8,-10.8,0xffc060,.5,10);
  flacker(k,6.0,3.8,-10.8,0xffc468,.55,11);
  flacker(k,-13.6,3.8,-1.9,0xffbc60,.45,10);
  flacker(k,13.6,3.8,-1.9,0xffbc60,.45,10);

  return { tuer, start:[0,-1.0] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-12.8,-9.2],[-9.6,-10.0],[-4.4,-9.0],[.8,-10.6],[6.0,-9.2],[10.2,-9.6],[13.6,-9.4],[13.6,-4.8],[-13.2,-3.4],[-7.8,-4.0],[-.6,-5.0],[8.4,-1.0],[-13.0,1.0],[-7.4,2.4],[2.4,1.0],[13.4,-.8],[-7.0,9.8],[2.2,6.4],[7.6,7.8],[-1.6,8.4]];

return { titel:'Das Tierzelt', breite:36, tiefe:27, oben:['10,16,36','28,48,94','62,92,150'], baue, gegenstaende, verstecke };
})();

/* Raum 4: Die Trapez-Kuppel. Hohe Holzplattform unter dem Zeltdach mit Geländer ringsum. Durch ein großes Loch mit Fangnetz
   sieht man tief unten die kleine Manege mit winzigen Zuschauern, Pony und Clownin. Außen schwingen Trapeze.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Sprungtuch) und 10 (Glocke) sind neu.
   Ausgang: die rot-weiße Klappe vor der Rutsche am hinteren Rand, sie klappt nach oben, die Figur rutscht hinunter. */
RAEUME3D.zirkus[3] = (function(){
const Z=ZIRKUS;
const { ROT, ROT2, GELB, BLAU, BLAU2, GRUEN, ROSA, LILA, TUERKIS, ORANGE, CREME, WEISS, SCHWARZ, GOLD, MESSING, METALL, METALL2, EISEN, HOLZ, HOLZ2, HOLZ3, HELLHOLZ, LEDER, LEDER2, SEIL, HAUT, BUNT, liegend, quer, ohneSchatten } = Z;
const B=36, T=27, HINTEN=-13.5;
/* Loch in der Plattform und Manege tief unten */
const LX=5, LZ1=-3.5, LZ2=2.5;
const TIEF=-9, MZ=-14, MG=1.35;
/* Ausgang und Rutsche (Punkte = Höhe der Füße) */
const AX=7;
const BAHN=[[AX,-0.1,-13.4],[AX,-0.55,-14.9],[AX,-1.15,-16.4],[AX,-1.75,-17.9],[AX,-2.1,-19.4]];

/* ---------- Bilder ---------- */
/* Sicherheitstafel ohne Schrift: Netz, Hände am Seil, Schuhe, jeweils mit Haken */
function regelBild(){
  return bild(512,368,(g)=>{ g.fillStyle='#24387c'; g.fillRect(0,0,512,368); g.lineCap='round'; g.lineJoin='round';
    const kreis=x=>{ g.fillStyle='#fbf5e4'; g.beginPath(); g.arc(x,134,70,0,7); g.fill(); g.strokeStyle='#e8b830'; g.lineWidth=9; g.stroke(); };
    [90,256,422].forEach(kreis);
    /* Fangnetz */
    g.strokeStyle='#1f6a9a'; g.lineWidth=5; g.beginPath(); for(let i=-2;i<=2;i++){ g.moveTo(90+i*22,100); g.lineTo(90+i*22,170); g.moveTo(44,134+i*17); g.lineTo(136,134+i*17); } g.stroke();
    /* zwei Hände am Seil */
    g.strokeStyle='#a87a30'; g.lineWidth=14; g.beginPath(); g.moveTo(256,76); g.lineTo(256,192); g.stroke();
    g.fillStyle='#e8a878'; [[240,108],[272,156]].forEach(([x,y])=>{ g.beginPath(); g.ellipse(x,y,30,19,0,0,7); g.fill(); });
    g.strokeStyle='#8a5030'; g.lineWidth=4; g.beginPath(); [[240,108],[272,156]].forEach(([x,y])=>[-7,5].forEach(v=>{ g.moveTo(x-14,y+v); g.lineTo(x+18,y+v); })); g.stroke();
    /* weiche Schuhe */
    g.fillStyle='#c8302a'; [[402,112],[438,156]].forEach(([x,y])=>{ g.beginPath(); g.ellipse(x,y,36,17,-.25,0,7); g.fill(); });
    g.strokeStyle='#ffffff'; g.lineWidth=5; g.beginPath(); [[402,112],[438,156]].forEach(([x,y])=>{ g.moveTo(x-12,y-6); g.lineTo(x+10,y-12); }); g.stroke();
    /* grüne Haken */
    [90,256,422].forEach(x=>{ g.fillStyle='#3a9a4a'; g.beginPath(); g.arc(x,278,42,0,7); g.fill(); g.strokeStyle='#ffffff'; g.lineWidth=12; g.beginPath(); g.moveTo(x-20,280); g.lineTo(x-5,296); g.lineTo(x+23,262); g.stroke(); }); });
}

/* ---------- Plattform ---------- */
function boden(k,sc){
  const tex=Z.dielenBild([172,118,70]); tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
  const m=new THREE.MeshLambertMaterial({map:tex});
  const flaeche=(x1,x2,z1,z2)=>{ const geo=new THREE.PlaneGeometry(x2-x1,z2-z1,Math.max(1,Math.round((x2-x1)/.8)),Math.max(1,Math.round((z2-z1)/.8))), uv=geo.attributes.uv;
    for(let i=0;i<uv.count;i++) uv.setXY(i,((x1+B/2)+uv.getX(i)*(x2-x1))/6,((T/2-z2)+uv.getY(i)*(z2-z1))/6);
    const f=new THREE.Mesh(geo,m); f.rotation.x=-Math.PI/2; f.position.set((x1+x2)/2,0,(z1+z2)/2); f.receiveShadow=true; sc.add(f); };
  flaeche(-B/2,B/2,-T/2,LZ1); flaeche(-B/2,B/2,LZ2,T/2); flaeche(-B/2,-LX,LZ1,LZ2); flaeche(LX,B/2,LZ1,LZ2);
  const g=gruppe(sc,0,0,0);
  /* dicke Balken am Außenrand und um das Loch */
  [-1,1].forEach(s=>{ box(g,B+.5,.6,.35,HOLZ2,0,-.31,s*(T/2+.12)); box(g,.35,.6,T,HOLZ2,s*(B/2+.12),-.31,0); box(g,B+.6,.14,.4,ROT,0,-.68,s*(T/2+.14)); box(g,.4,.14,T+.2,ROT,s*(B/2+.14),-.68,0); });
  const mz=(LZ1+LZ2)/2, lt=LZ2-LZ1;
  [LZ1-.1,LZ2+.1].forEach(z=>box(g,LX*2+.4,.52,.2,HOLZ3,0,-.275,z)); [-1,1].forEach(s=>box(g,.2,.52,lt,HOLZ3,s*(LX+.1),-.275,mz));
  /* bunter Randstreifen auf den Dielen */
  [-1,1].forEach(s=>{ box(g,B-.6,.02,.22,ROT,0,.011,s*(T/2-.45)); box(g,.22,.022,T-.7,ROT,s*(B/2-.45),.012,0); });
  [LZ1-.38,LZ2+.38].forEach(z=>box(g,LX*2+1.0,.02,.24,GELB,0,.012,z)); [-1,1].forEach(s=>box(g,.24,.022,lt+.5,GELB,s*(LX+.38),.013,mz));
  /* lange Stützen bis nach unten, mit schrägen Streben */
  const stuetze=(x,z)=>walze(g,.3,9,HOLZ3,x,-4.95,z);
  [-17.6,17.6].forEach(x=>stuetze(x,-13.2)); [-1,1].forEach(s=>strich(g,[s*12.6,-.5,-13.2],[s*17.6,-5.5,-13.2],.18,HOLZ3)); [-17.6,-8.8,0,12.6,17.6].forEach(x=>stuetze(x,13.2)); [-4.4,4.4].forEach(z=>{ stuetze(-17.6,z); stuetze(17.6,z); });
  [-1,1].forEach(s=>[[-13.2,-4.4],[-4.4,4.4],[4.4,13.2]].forEach(([a,b])=>{ strich(g,[s*17.6,-.8,a],[s*17.6,-5.5,b],.12,HOLZ2); strich(g,[s*17.6,-5.5,a],[s*17.6,-.8,b],.12,HOLZ2); }));
  verschmelze(g); ohneSchatten(g);
}
/* Geländer: Pfosten mit zwei Stangen von a nach b ([x,z]), hoch = Höhe */
function gelaender(g,a,b,hoch,pf,oben){
  const l=Math.hypot(b[0]-a[0],b[1]-a[1]), n=Math.max(1,Math.round(l/1.9));
  for(let i=0;i<=n;i++){ const x=a[0]+(b[0]-a[0])*i/n, z=a[1]+(b[1]-a[1])*i/n; walze(g,.075,hoch,pf,x,hoch/2,z); ball(g,.12,GOLD,x,hoch+.07,z); }
  strich(g,[a[0],hoch-.08,a[1]],[b[0],hoch-.08,b[1]],.06,oben); strich(g,[a[0],hoch*.52,a[1]],[b[0],hoch*.52,b[1]],.035,SEIL);
}
function gelaenderAlle(k,sc){
  const g=gruppe(sc,0,0,0), R=17.75, V1=13.25;
  gelaender(g,[-R,-V1],[AX-1.75,-V1],1.15,WEISS,ROT); gelaender(g,[AX+1.75,-V1],[R,-V1],1.15,WEISS,ROT);
  gelaender(g,[-R,V1],[R,V1],.8,WEISS,ROT); gelaender(g,[-R,-V1],[-R,V1],1.0,WEISS,ROT); gelaender(g,[R,-V1],[R,V1],1.0,WEISS,ROT);
  k.kasten((-R+AX-1.75)/2,-V1,AX-1.75+R,.3); k.kasten((R+AX+1.75)/2,-V1,R-AX-1.75,.3); k.kasten(0,V1,R*2,.3); k.kasten(-R,0,.3,V1*2); k.kasten(R,0,.3,V1*2);
  /* rund um das Loch */
  const x=LX+.2, a=LZ1-.2, b=LZ2+.2;
  gelaender(g,[-x,a],[x,a],.9,BLAU,GELB); gelaender(g,[-x,b],[x,b],.7,BLAU,GELB); gelaender(g,[-x,a],[-x,b],.8,BLAU,GELB); gelaender(g,[x,a],[x,b],.8,BLAU,GELB);
  k.kasten(0,(a+b)/2,x*2+.3,b-a+.3);
  verschmelze(g); ohneSchatten(g);
  /* Zackenrand an der hinteren Lochkante, zum Betrachter hin */
  const v=gruppe(sc,0,0,0); const q=gruppe(v,0,-.06,LZ1+.04); q.scale.y=.55; Z.volant(q,-LX,LX,0,0,ROT,CREME);
  verschmelze(q); ohneSchatten(v);
  /* Fangnetz im Loch */
  const n=gruppe(sc,0,0,0), F=0xcfc4a4;
  const tiefe=(x,z)=>-.75-.55*(1-Math.pow(x/LX,2))*(1-Math.pow((z-(LZ1+LZ2)/2)/((LZ2-LZ1)/2),2));
  for(let i=-4;i<=4;i++){ const px=i*LX/5; for(let j=0;j<6;j++){ const z1=LZ1+j*(LZ2-LZ1)/6, z2=z1+(LZ2-LZ1)/6; strich(n,[px,tiefe(px,z1),z1],[px,tiefe(px,z2),z2],.014,F); } }
  for(let j=1;j<6;j++){ const z=LZ1+j*(LZ2-LZ1)/6; for(let i=-5;i<5;i++){ const a2=i*LX/5, b2=(i+1)*LX/5; strich(n,[a2,tiefe(a2,z),z],[b2,tiefe(b2,z),z],.014,F); } }
  verschmelze(n); ohneSchatten(n);
}

/* ---------- Tief unten: die kleine Manege ---------- */
function untenManege(k,sc){
  const tex=Z.kornBild('#5a3428',['rgba(200,140,90,.25)','rgba(20,5,5,.35)']); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.repeat.set(22,22);
  const grund=new THREE.Mesh(new THREE.PlaneGeometry(130,130),new THREE.MeshLambertMaterial({map:tex})); grund.rotation.x=-Math.PI/2; grund.position.y=TIEF-.04; sc.add(grund);
  const m=gruppe(sc,0,TIEF,MZ), fest=gruppe(m,0,0,0); m.scale.setScalar(MG);
  walze(fest,6.2,.08,0xe8c078,0,.04,0); walze(fest,2.6,.1,0xd8a860,0,.05,0);
  const s=gruppe(fest,0,.13,0); s.rotation.x=-Math.PI/2; Z.stern(s,0,0,0,1.7,ROT);
  const rand=[]; for(let i=0;i<40;i++){ const a=i/40*Math.PI*2; rand.push([Math.sin(a)*6.4,.32,Math.cos(a)*6.4,1.02,.62,.5,i%2?WEISS:ROT,a]); }
  Z.viele(m,GEO.box,rand);
  [[8.0,.25,BLAU2],[9.5,.7,ROT2],[11.0,1.15,BLAU2]].forEach(([r,y,c])=>liegend(ring(fest,r,.34,c,0,y,0)));
  const leib=[], kopf=[];
  [[8.0,.9,46],[9.5,1.35,56],[11.0,1.8,64]].forEach(([r,y,n],j)=>{ for(let i=0;i<n;i++){ const a=(i+j*.4)/n*Math.PI*2; if((i*7+j)%11===0 || Math.abs(a-Math.PI)<.24) continue; const x=Math.sin(a)*r, z=Math.cos(a)*r;
      leib.push([x,y,z,.3,.42,.3,[0xe8413a,0xf4c430,0x3aa0e8,0x5ac85a,0xe86ab8,0xf6f0e0,0x9a5ad8][(i*3+j)%7]]);
      kopf.push([x,y+.6,z,.25,.25,.25,[0xf1c7a0,0xc89068,0x8a5a38,0xf6d6b8][(i+j)%4]]); } });
  Z.viele(m,GEO.sph,leib); Z.viele(m,GEO.sph,kopf);
  /* Vorhang zum Eingang, kleine Podeste und Fahnen */
  box(fest,4.2,2.6,.4,ROT,0,2.6,-12.3); box(fest,4.5,.3,.5,GOLD,0,4.0,-12.3); for(let i=0;i<6;i++) walze(fest,.2,2.6,ROT2,-1.75+i*.7,2.6,-12.05);
  Z.podest(fest,-2.4,-1.4,.65,.6,BLAU,.08); Z.podest(fest,2.5,-1.0,.6,.5,GRUEN,.08);
  verschmelze(fest); ohneSchatten(m);
  const c=Z.clownin(k,m,0,.2,0,{ jongliert:true, phase:.7 }); c.g.scale.setScalar(.95); c.g.position.y=.1; ohneSchatten(c.g);
  const p=Z.pony(k,m,0,4.2,0,.85,{ laeuft:true });
  const oval=[]; for(let i=0;i<24;i++){ const a=-i/24*Math.PI*2; oval.push([+(Math.cos(a)*4.3).toFixed(2),+(Math.sin(a)*4.3).toFixed(2)]); }
  laeufer(k,p.g,oval,1.9,0,6); k.anim.push(()=>{ p.g.position.y+=.1; }); ohneSchatten(p.g);
  const l1=Z.lichtkegel(m,-3,5.6,1,2.0,0xfff0b0), l2=Z.lichtkegel(m,3,5.6,-1,2.0,0xb8e0ff);
  k.anim.push(t=>{ [l1,l2].forEach((l,i)=>{ const x=(i?3:-3)+Math.sin(t*.6+i*2.4)*1.6, z=(i?-1:1)+Math.cos(t*.45+i)*1.8; l.kegel.position.x=l.fleck.position.x=x; l.kegel.position.z=l.fleck.position.z=z; }); });
}

/* ---------- Zeltdach rundum und Rückwand-Bahnen ---------- */
function zelt(k,sc){
  const g=gruppe(sc,0,0,0);
  Z.zeltrund(g,0,TIEF-.2,0,45,34,44,0x70202e,0x8c7468);
  Z.faecher(g,[0,19,-33],TIEF,-29,29,18,0x9a2c34,0xc4ac90);
  for(let i=0;i<=18;i+=2){ strich(g,[0,19,-32.8],[-29+i*58/18,TIEF,-32.8],.08,GOLD); }
  ball(g,.9,GOLD,0,18.6,-32.6);
  [[-15,3.4],[-8,6.2],[10,6.0],[16,3.0],[0,8.6]].forEach(([x,y])=>Z.stern(g,x,y,-32.6,.75,GELB));
  /* Goldband rund um das Zelt */
  liegend(ring(g,44.6,.22,GOLD,0,-1.5,0)); liegend(ring(g,44.6,.22,GOLD,0,8,0));
  verschmelze(g); ohneSchatten(g);
  /* Licht, das durch die Stoffbahnen scheint */
  [[-24,4,-30,'rgba(255,240,180,.5)'],[25,5,-30,'rgba(180,220,255,.5)'],[-38,5,-8,'rgba(255,190,220,.45)'],[38,5,-6,'rgba(255,240,180,.45)'],[-34,3,18,'rgba(180,220,255,.4)'],[34,3,19,'rgba(255,190,220,.4)']]
    .forEach(([x,y,z,c],i)=>{ const s=schein(sc,c,x,y,z,9); k.anim.push(t=>{ const w=8.5+Math.sin(t*.9+i*1.3)*1.2; s.scale.set(w,w,1); }); });
  [[-10,-8.5,0xfff0b0],[1,-9,0xffb8e0],[11,-6,0xb8e0ff],[-12,5,0xb8e0ff]].forEach(([x,z,c],i)=>{ const l=Z.lichtkegel(sc,x,12,z,2.3,c); l.fleck.visible=false; l.kegel.material.opacity=.045;
    k.anim.push(t=>{ l.kegel.material.opacity=.042+Math.sin(t*1.1+i*2)*.012; }); });
}

/* ---------- Leben außerhalb: Trapeze, Strickleitern, Tauben, Ballons ---------- */
function luft(k,sc){
  [[-12,14,-18,12.4,{ artistin:'sitzt', farbe:ROSA, schwung:.2, phase:0 }],[-2.6,15,-21,12.2,{ artistin:'haengt', farbe:TUERKIS, schwung:.19, phase:1.9 }],
   [14.5,14,-18.5,12.0,{ schwung:.24, phase:.8 }],[-22.5,14,-3,11.8,{ artistin:'sitzt', farbe:GELB, schwung:.17, phase:3.1 }],[22.5,14,2,12.0,{ schwung:.22, phase:2.3 }]]
    .forEach(([x,y,z,l,o])=>ohneSchatten(Z.trapez(k,sc,x,y,z,l,o).g));
  const g=gruppe(sc,0,0,0);
  /* Strickleitern und Seile mit Knoten */
  [[-19.6,-9],[19.8,-7.5],[-17.2,-17]].forEach(([x,z])=>{ [-.4,.4].forEach(v=>strich(g,[x+v,13,z],[x+v,-8.8,z],.035,SEIL)); for(let y=-8;y<12;y+=.75) strich(g,[x-.4,y,z],[x+.4,y,z],.05,HELLHOLZ); });
  [[-20.2,6,ROT],[20.4,8.5,BLAU],[-7.4,-17,GELB],[19.5,-14.5,GRUEN]].forEach(([x,z,c])=>{ strich(g,[x,14,z],[x,.4,z],.05,SEIL); [.5,2.2,3.9].forEach(y=>ball(g,.13,SEIL,x,y,z)); ball(g,.22,c,x,.2,z); rohr(g,.08,.24,.5,c,x,-.15,z,10); });
  /* kleine Plattform gegenüber mit Fahne */
  walze(g,2.1,.35,HOLZ,19,.1,-20); liegend(ring(g,2.12,.09,GOLD,19,.28,-20)); walze(g,.35,9.2,HOLZ3,19,-4.6,-20);
  walze(g,.07,2.6,HOLZ2,20.3,1.5,-20.6); Z.vieleck(g,[[20.35,2.8,-20.6],[21.6,2.45,-20.6],[20.35,2.1,-20.6]],GELB);
  /* hohes Seil zur kleinen Plattform */
  strich(g,[AX+2.4,-.5,-13.8],[17.4,.15,-19],.035,METALL);
  verschmelze(g); ohneSchatten(g);
  const a=Z.artistin(k,sc,18.7,-19.8,-.35,{ winkt:true, farbe:LILA, haar:0x1c140c, phase:1.2 }); a.g.position.y=.28; ohneSchatten(a.g);
  /* Tauben */
  [[-7,3.0,-17.5,5.5,1.6,.55,0],[4,4.4,-19,7,2.2,.42,2.4],[-19.5,3.6,2,1.2,7,.38,4.1]].forEach(([mx,y,mz,rx,rz,tempo,ph])=>{
    const t=gruppe(sc,mx,y,mz); t.userData.lebendig=true; ball(t,.22,WEISS,0,0,0,1.7,.8,.85); ball(t,.14,WEISS,.38,.1,0); ball(t,.025,SCHWARZ,.47,.15,.1); ball(t,.025,SCHWARZ,.47,.15,-.1);
    const s=kegel(t,.055,.14,ORANGE,.56,.08,0); s.rotation.z=-Math.PI/2; Z.vieleck(t,[[-.28,0,0],[-.68,.05,-.22],[-.68,.05,.22]],0xe0e0ea);
    const fl=[-1,1].map(v=>{ const q=gruppe(t,0,.05,v*.12); q.userData.lebendig=true; Z.vieleck(q,[[.18,0,0],[-.02,0,v*.72],[-.28,0,v*.55],[-.2,0,0]],0xf0f0f8); return q; });
    verschmelze(t); ohneSchatten(t);
    k.anim.push(zt=>{ const w=zt*tempo+ph; t.position.set(mx+Math.cos(w)*rx,y+Math.sin(w*2.2)*.35,mz+Math.sin(w)*rz); t.rotation.y=Math.atan2(-Math.cos(w)*rz,-Math.sin(w)*rx); fl.forEach((q,i)=>q.rotation.x=(i?1:-1)*Math.sin(zt*8+ph)*.7); });
  });
  /* Luftballons steigen von unten auf */
  [[-21,-11,ROT],[-9.5,-23,GELB],[12,-23.5,BLAU],[21.5,-2,ROSA],[-21.5,9,GRUEN]].forEach(([x,z,c],i)=>{ const q=gruppe(sc,x,0,z); q.userData.lebendig=true; Z.ballon(q,0,0,0,1.6,c,.55); verschmelze(q); ohneSchatten(q);
    k.anim.push(t=>{ const u=(t*.045+i*.23)%1; q.position.set(x+Math.sin(t*.7+i)*.5,-9+u*22,z); }); });
}

/* ---------- Ausstattung auf der Plattform ---------- */
function bank(g,x,z){
  [-1.4,1.4].forEach(v=>[-.25,.25].forEach(w=>box(g,.12,.55,.12,HOLZ3,x+v,.28,z+w))); box(g,3.2,.14,.75,HELLHOLZ,x,.62,z);
  /* gefaltetes Handtuch und Trinkflaschen */
  box(g,.8,.05,.82,TUERKIS,x-.8,.72,z); box(g,.8,.45,.05,TUERKIS,x-.8,.51,z+.42); box(g,.82,.07,.84,WEISS,x-.8,.755,z).scale.x=.14;
  [[.45,ROT],[.85,BLAU],[1.2,GRUEN]].forEach(([v,c])=>{ walze(g,.12,.42,c,x+v,.9,z); walze(g,.05,.12,WEISS,x+v,1.17,z); walze(g,.125,.08,WEISS,x+v,.9,z); });
}
/* flache Turnmatte mit Nähten, darauf eine zusammengerollte Matte */
function matten(g,x,z){
  box(g,3.35,.2,1.75,BLAU,x,.1,z); [-.84,0,.84].forEach(v=>box(g,.05,.012,1.76,BLAU2,x+v,.206,z));
  quer(walze(g,.27,1.6,ROT,x,.47,z-.15)); [-.45,.45].forEach(v=>quer(walze(g,.28,.1,CREME,x+v,.47,z-.15)));
  [-1,1].forEach(s=>[.19,.09].forEach((r,i)=>{ const m=ring(g,r,.02,i%2?ROT2:CREME,x+s*.81,.47,z-.15); m.rotation.y=Math.PI/2; }));
  box(g,1.55,.05,.34,ROT,x,.23,z+.1);
}
/* Gestell mit Seilrad und Sandsäcken als Gegengewicht */
function gewicht(g,x,z){
  [-.85,.85].forEach(v=>{ box(g,.16,2.7,.16,HOLZ2,x,1.35,z+v); box(g,.9,.12,.3,HOLZ3,x,.06,z+v); }); box(g,.2,.2,2.0,HOLZ,x,2.7,z);
  const r=ring(g,.3,.07,METALL,x,3.05,z); r.rotation.y=Math.PI/2; walze(g,.06,.35,EISEN,x,2.9,z);
  [[-.45,1.35,0xb89860],[.1,.8,0xa88450],[.55,1.7,0xc8a870]].forEach(([v,y,c])=>{ strich(g,[x,2.65,z+v],[x,y+.35,z+v],.025,SEIL); ball(g,.25,c,x,y,z+v,1,1.25,1); kegel(g,.13,.2,c,x,y+.33,z+v); liegend(ring(g,.08,.03,ROT,x,y+.34,z+v)); });
}
function hocker(g,x,z){
  walze(g,.55,.12,ROT,0+x,.75,z); liegend(ring(g,.55,.05,GOLD,x,.75,z)); [0,1,2].forEach(i=>{ const a=i*2.09; strich(g,[x+Math.cos(a)*.25,.72,z+Math.sin(a)*.25],[x+Math.cos(a)*.5,0,z+Math.sin(a)*.5],.06,HOLZ2); });
  /* Wasserkrug und zwei Becher */
  rohr(g,.18,.24,.5,TUERKIS,x-.1,1.06,z,14); ring(g,.14,.035,TUERKIS,x-.33,1.1,z); [[.25,.18],[.28,-.2]].forEach(([a,b])=>rohr(g,.11,.08,.22,GELB,x+a,.92,z+b,12));
}
function ausstattung(k,sc){
  const d=gruppe(sc,0,0,0);
  bank(d,-3.6,12.1); k.kasten(-3.6,12.15,3.4,.95);
  matten(d,4.2,11.7); k.kasten(4.25,11.7,3.5,1.8);
  gewicht(d,-16.9,3.2); k.kasten(-16.9,3.2,.95,2.2);
  gewicht(d,16.9,-1.2); k.kasten(16.9,-1.2,.95,2.2);
  hocker(d,-16.4,9.2); k.kreis(-16.4,9.2,.65);
  hocker(d,2.2,-12.1); k.kreis(2.2,-12.1,.65);
  matten(d,-15.6,-9.6); k.kasten(-15.55,-9.6,3.5,1.8);
  bank(d,-1.0,-9.4); k.kasten(-1.0,-9.4,3.4,.95);
  verschmelze(d);
  Z.mast(k,-16.9,-12.4,7,[ROT,CREME]); Z.mast(k,16.9,-12.4,7,[BLAU,CREME]); Z.mast(k,-16.9,12.3,5,[BLAU,CREME]); Z.mast(k,16.9,12.3,5,[ROT,CREME]);
  Z.artistin(k,sc,13.6,-10.4,-.45,{ winkt:true, farbe:ORANGE, haar:0xc87828 }); k.kreis(13.6,-10.4,.6);
  Z.wimpel(sc,[[[-16.9,7.0,-12.4],[-5,7.0,-13.6],1.1,18],[[-5,7.0,-13.6],[AX,7.0,-13.6],1.0,18],[[AX,7.0,-13.6],[16.9,7.0,-12.4],.9,15]]);
  Z.lichterkette(k,sc,[
    [[-16.9,5.6,-12.4],[-8,5.4,-14.2],.8,12],[[-8,5.4,-14.2],[1.5,5.4,-14.2],.8,12],[[12,5.4,-14.2],[16.9,5.6,-12.4],.5,6],
    [[-16.9,5.6,-12.4],[-17.9,4.6,0],1.2,14],[[-17.9,4.6,0],[-16.9,4.9,12.3],1.2,14],[[16.9,5.6,-12.4],[17.9,4.6,0],1.2,14],[[17.9,4.6,0],[16.9,4.9,12.3],1.2,14]]);
}

/* ---------- Ausgang: Klappe und Rutsche ---------- */
function baueAusgang(k,sc){
  const r=gruppe(sc,0,0,0);
  for(let i=0;i<BAHN.length-1;i++){
    const a=i?BAHN[i]:[AX,0,-12.95], b=BAHN[i+1], dy=b[1]-a[1], dz=b[2]-a[2], l=Math.hypot(dy,dz);
    const q=gruppe(r,AX,(a[1]+b[1])/2,(a[2]+b[2])/2); q.rotation.x=Math.atan2(dy,-dz);
    box(q,1.8,.12,l+.12,i%2?ORANGE:GELB,0,-.1,0); box(q,.5,.02,l+.12,0xfff0a8,0,-.032,0);
    [-1,1].forEach(s=>{ box(q,.18,.55,l+.14,ROT,s*.99,.08,0); box(q,.24,.1,l+.14,WEISS,s*.99,.39,0); });
  }
  const e=BAHN[BAHN.length-1];
  quer(walze(r,.2,2.2,ROT,AX,e[1]-.16,e[2]-.12));
  [-1,1].forEach(s=>{ ball(r,.2,GOLD,AX+s*.99,e[1]+.42,e[2]); strich(r,[AX+s*.8,-.5,-13.35],[AX+s*.8,-4.6,-13.35],.16,HOLZ3); [BAHN[2],e].forEach(p=>strich(r,[AX+s*.8,p[1]-.2,p[2]],[AX+s*.8,-4.5,-13.35],.13,HOLZ3)); ball(r,.19,GOLD,AX+s*.99,.4,-13.35); });
  /* hohe, gestreifte Seitenwangen neben dem Rahmen: so ist die Rutsche auch bei geschlossener Klappe zu sehen */
  const HOCH=[2.55,2.0,1.45,1.05,.8], oben=(i,s)=>[AX+s*2.85,BAHN[i][1]+HOCH[i],BAHN[i][2]-(i?0:.1)], unten=(i,s)=>[AX+s*1.62,BAHN[i][1]-.15,BAHN[i][2]-(i?0:.1)];
  [-1,1].forEach(s=>{ for(let i=0;i<BAHN.length-1;i++){ Z.vieleck(r,[unten(i,s),oben(i,s),oben(i+1,s),unten(i+1,s)],i%2?CREME:ROT); strich(r,oben(i,s),oben(i+1,s),.17,GELB); strich(r,unten(i,s),unten(i+1,s),.1,GELB); }
    for(let i=0;i<BAHN.length;i++){ ball(r,.19,GELB,...oben(i,s)); strich(r,unten(i,s),[AX+s*1.05,BAHN[i][1]-.1,BAHN[i][2]-(i?0:.1)],.07,HOLZ2); }
    strich(r,unten(0,s),oben(0,s),.14,GELB); ball(r,.28,GOLD,AX+s*2.9,BAHN[0][1]+HOCH[0]+.2,BAHN[0][2]-.1); });
  verschmelze(r); ohneSchatten(r);
  /* fester Rahmen */
  const f=gruppe(sc,AX,0,-13.0);
  [-1,1].forEach(s=>{ box(f,.3,3.3,.3,BLAU,s*1.42,1.65,0); [.5,1.3,2.1,2.9].forEach(y=>box(f,.34,.16,.34,GELB,s*1.42,y,0)); ball(f,.24,GOLD,s*1.42,3.5,0); });
  box(f,3.15,.28,.34,BLAU,0,3.3,0);
  verschmelze(f);
  /* die Klappe hängt oben am Balken */
  const kl=gruppe(sc,AX,3.12,-12.98); kl.userData.lebendig=true;
  const br=2.46/6; for(let i=0;i<6;i++) box(kl,br,3.0,.16,i%2?CREME:ROT,-1.23+(i+.5)*br,-1.54,0);
  [-.1,-2.98].forEach(y=>box(kl,2.52,.14,.22,GOLD,0,y,0)); [-1.24,1.24].forEach(x=>box(kl,.1,3.0,.2,GOLD,x,-1.54,0));
  box(kl,1.45,1.1,.06,BLAU2,0,-1.25,.11); box(kl,1.55,.08,.08,GOLD,0,-.68,.11); box(kl,1.55,.08,.08,GOLD,0,-1.82,.11);
  const schloss=Z.zahlenschloss(kl,0,-1.34,.26); schloss.scale.setScalar(1.2);
  Z.stern(kl,0,-2.4,.1,.36,GELB);
  verschmelze(kl);
  k.kasten(AX,-13.0,3.2,.8);
  const weich=a=>{ a=Math.max(0,Math.min(1,a)); return a*a*(3-2*a); };
  return ausgang(k,{ name:'Rutschenklappe', einfach:'Klappe zur Rutsche', steh:[AX,-10.5], durch:[AX,-12.4], rutsch:BAHN, rutschDauer:1.8,
    treffer:{x:AX,y:1.8,z:-12.9,b:3.2,h:3.6,t:.8}, schildOben:[AX,4.35,-12.4], glanz:[AX,1.9,-12.4],
    bewege:(auf)=>{ kl.rotation.x=weich(auf/.8)*1.95; } });
}

function baue(k){
  const sc=k.scene;
  Z.huelle(k,{ B,T, waende:false, boden:false, hintergrund:0x1b1f4a, himmelLicht:0xfff0e0, grund:0x5a3c50, staerke:.72, sonne:0xffe4c4, sonneStaerke:.38 });
  zelt(k,sc);
  untenManege(k,sc);
  boden(k,sc);
  gelaenderAlle(k,sc);
  const tuer=baueAusgang(k,sc);
  ausstattung(k,sc);
  luft(k,sc);
  [[0,-5,MZ,0xffd890,.9,18],[-10,6,-4,0xffd8a0,.35,18],[10,6,2,0xb8d0ff,.3,18]].forEach(([x,y,z,c,s,w])=>{ const l=new THREE.PointLight(c,s,w,1.5); l.position.set(x,y,z); sc.add(l); });
  return { tuer, start:[-.4,7] };
}

/* Verstecke für den Edelstein */
const verstecke=[[-14,-7],[-12.6,-4],[-7,-4.8],[-3,-6.6],[3,-6.4],[9.6,-8.6],[11.4,-3],[8,-1.2],[15.6,3.8],[9.6,9.8],
  [15.4,11],[.6,10],[-7,11],[-13.4,11.2],[-14.6,6],[-14,.8],[-7.4,2.6],[-7,-1.4],[5.4,-11.2],[1,-7]];

/* ---------- Gegenstände: Reihenfolge = ort 1 bis 10 ---------- */
const gegenstaende=[
  { x:-10.4, z:-.8, steh:[-10.1,1.6], kasten:[3.0,2.2], treffer:[2.8,2.1,1.9], baue(g){ /* 1 Seilrolle: Holzrolle mit aufgewickeltem Seil */
      const q=gruppe(g,-.15,0,0); q.rotation.y=.42;
      [-.72,.72].forEach(x=>{ quer(walze(q,.95,.18,HELLHOLZ,x,.95,0)); const r=ring(q,.93,.05,HOLZ2,x,.95,0); r.rotation.y=Math.PI/2;
        const s=Math.sign(x); quer(walze(q,.22,.08,HOLZ3,x+s*.12,.95,0)); quer(walze(q,.09,.1,METALL,x+s*.16,.95,0));
        for(let i=0;i<4;i++){ const a=i*Math.PI/2+.78; quer(walze(q,.11,.04,HOLZ3,x+s*.095,.95+Math.sin(a)*.55,Math.cos(a)*.55)); } });
      quer(walze(q,.52,1.3,SEIL,0,.95,0));
      for(let i=0;i<8;i++){ const r=ring(q,.56,.085,i%2?SEIL:0xc4a468,-.57+i*.163,.95,0); r.rotation.y=Math.PI/2; }
      [-.55,.55].forEach(z=>box(q,1.7,.14,.22,HOLZ3,0,.07,z));
      /* loses Seilende mit rotem Knoten */
      strich(g,[.1,.5,.45],[.65,.09,.8],.085,SEIL); strich(g,[.65,.09,.8],[1.25,.09,.55],.085,SEIL); [[.65,.8],[1.25,.55]].forEach(([x,z])=>ball(g,.095,SEIL,x,.09,z)); ball(g,.17,ROT,1.33,.15,.52);
    } },
  { x:-10.6, z:6.4, dreh:.1, steh:[-10.3,8.4], kasten:[4.8,1.4], treffer:[4.6,1.9,1.0], baue(g){ /* 2 Balancierstange: lang, auf zwei Gabeln, bunte Ringe und Bänder */
      [-1.3,1.3].forEach(x=>{ walze(g,.09,1.1,HOLZ2,x,.55,0); box(g,.3,.12,1.0,HOLZ3,x,.06,0); box(g,.8,.12,.26,HOLZ3,x,.06,0); walze(g,.13,.14,GOLD,x,1.1,0); [-1,1].forEach(s=>strich(g,[x,1.14,0],[x,1.45,s*.2],.05,HOLZ)); });
      quer(walze(g,.085,4.5,WEISS,0,1.3,0));
      [-1,1].forEach(s=>{ [[2.15,ROT],[1.92,GELB],[1.69,BLAU]].forEach(([x,c])=>quer(walze(g,.098,.23,c,s*x,1.3,0))); ball(g,.12,ROT,s*2.28,1.3,0,.8,1,1);
        [[GELB,-.14],[ROSA,.03],[TUERKIS,.18]].forEach(([c,v])=>{ strich(g,[s*2.2,1.26,0],[s*2.2+v,.7,.1+v*.3],.028,c); strich(g,[s*2.2+v,.7,.1+v*.3],[s*2.2+v*.6,.45,.18],.028,c); }); });
      quer(walze(g,.105,.7,LEDER,0,1.3,0)); [-.2,0,.2].forEach(x=>quer(walze(g,.112,.05,LEDER2,x,1.3,0)));
    } },
  { x:-15.6, z:-4.4, dreh:.35, steh:[-13.2,-3.8], kasten:[2.8,1.8], treffer:[2.7,4.2,1.2], baue(g){ /* 3 Lange Stelzen als V, große helle Trittklötze außen, an ein niedriges Gestell gelehnt */
      [-1,1].forEach(s=>{ const q=gruppe(g,s*.42,0,-.1); q.rotation.x=-.1; q.rotation.z=-s*.09; const F=s>0?BLAU:ROT;
        box(q,.2,4.0,.2,F,0,2.05,0); [.55,2.3,2.85,3.4].forEach(y=>box(q,.215,.22,.215,GELB,0,y,0)); box(q,.32,.2,.32,SCHWARZ,0,.1,0); ball(q,.17,GOLD,0,4.14,0);
        /* Trittklotz mit Keil darunter und flachem Fußriemen */
        box(q,.74,.28,.5,0xfff0c4,s*.45,1.4,.04); box(q,.78,.07,.54,ORANGE,s*.45,1.57,.04); strich(q,[s*.08,.75,.04],[s*.62,1.28,.04],.1,0xfff0c4);
        box(q,.16,.04,.55,LEDER,s*.45,1.62,.04); });
      [-1.0,1.0].forEach(x=>{ box(g,.16,1.0,.16,HOLZ2,x,.5,-.48); box(g,.24,.12,.7,HOLZ3,x,.06,-.45); }); quer(walze(g,.08,2.2,HOLZ,0,.98,-.48));
    } },
  { x:7.8, z:5.6, dreh:-.22, steh:[7.4,7.5], r:1.05, treffer:[1.9,2.2,1.5], baue(g){ /* 4 Kreidekasten: offener Kasten voll weißer Kreide auf einem Hocker */
      [-.6,.6].forEach(x=>[-.35,.35].forEach(z=>strich(g,[x*1.15,0,z*1.2],[x,.8,z],.065,HOLZ2))); box(g,1.55,.12,1.0,HOLZ3,0,.84,0);
      box(g,1.35,.1,.85,LEDER,0,.95,0); [-.42,.42].forEach(z=>box(g,1.45,.38,.1,BLAU,0,1.14,z)); [-.68,.68].forEach(x=>box(g,.1,.38,.9,BLAU,x,1.14,0));
      [-.42,.42].forEach(z=>box(g,1.48,.07,.13,GOLD,0,1.35,z)); Z.stern(g,0,1.13,.48,.15,CREME);
      for(let i=0;i<15;i++){ const x=-.48+(i%5)*.24, z=-.22+Math.floor(i/5)*.22; const b=box(g,.2,.2+(i%3)*.07,.18,i%4?WEISS:0xe8e8f0,x,1.22+(i%2)*.06,z); b.rotation.y=(i%5-2)*.2; b.rotation.z=(i%3-1)*.2; }
      /* aufgeklappter Deckel */
      const d=gruppe(g,0,1.34,-.46); d.rotation.x=-.28; box(d,1.45,.8,.08,BLAU,0,.4,0); box(d,1.48,.07,.1,GOLD,0,.8,0);
      /* weißer Handabdruck im Deckel */
      ball(d,.14,WEISS,0,.32,.05,1,1.05,.12); [[-.15,.5,.3],[-.05,.57,.1],[.06,.57,-.1],[.16,.5,-.3]].forEach(([x,y,a])=>{ const f=ball(d,.04,WEISS,x,y,.05,1,2.6,.2); f.rotation.z=a; }); const dm=ball(d,.045,WEISS,.19,.29,.05,1,2.3,.2); dm.rotation.z=-1.1;
      /* Kreidestücke und Staub daneben */
      [[.72,.55,.5],[.9,.38,-.4],[-.8,.5,1.2]].forEach(([x,z,a])=>{ const m=walze(g,.07,.34,WEISS,x,.07,z); m.rotation.set(0,a,Math.PI/2); });
      for(let i=0;i<22;i++){ const a=i*2.4, r=.4+(i%5)*.13; ball(g,.03+(i%3)*.012,WEISS,Math.cos(a)*r,.015,.35+Math.sin(a)*r*.55,1,.3,1); }
    } },
  { x:-11.8, z:-12.3, wand:'hinten', steh:[-11.5,-10.4], kasten:[3.0,1.3], treffer:[2.8,3.0,1.2], trefferY:.9, baue(g,k){ /* 5 Scheinwerfer an einem Holzgitter */
      [-1.2,1.2].forEach(x=>{ box(g,.18,3.7,.18,HOLZ3,x,1.85,-.35); box(g,.35,.12,1.0,HOLZ3,x,.06,-.15); });
      [1.15,3.55].forEach(y=>box(g,2.6,.16,.14,HOLZ2,0,y,-.35)); [-1,1].forEach(s=>strich(g,[s*1.2,1.15,-.38],[0,2.5,-.38],.05,HOLZ));
      const l=gruppe(g,0,2.4,.12); l.userData.lebendig=true; const t=gruppe(l,0,0,0);
      /* Bügel, Gehäuse, helle Linse und vier Klappen */
      [-.82,.82].forEach(x=>{ box(t,.1,.95,.12,METALL,x,.35,-.05); quer(walze(t,.13,.2,GOLD,x,0,-.05)); }); box(t,1.74,.1,.12,METALL,0,.84,-.05);
      liegend(walze(t,.66,.75,EISEN,0,0,-.1)); liegend(walze(t,.5,.3,METALL2,0,0,-.6)); ring(t,.64,.08,METALL,0,0,.3);
      liegend(walze(t,.56,.04,basis(0xfff2a0),0,0,.29)); liegend(walze(t,.3,.05,basis(0xffffe8),0,0,.3)); [.38,.2].forEach(r=>ring(t,r,.012,0xe8c850,0,0,.33));
      [[0,.78,1.05,.34,-.55,0],[0,-.78,1.05,.34,.55,0],[-.78,0,.34,1.0,0,-.55],[.78,0,.34,1.0,0,.55]].forEach(([x,y,b,h,rx,ry])=>{ const m=box(t,b,h,.05,SCHWARZ,x,y,.44); m.rotation.set(rx,ry,0); });
      [-.28,0,.28].forEach(x=>box(t,.1,.06,.5,METALL,x,.66,-.2));
      verschmelze(t);
      const s=schein(l,'rgba(255,240,150,.55)',0,0,.65,2.1);
      strich(g,[0,3.55,-.35],[0,3.25,.05],.06,METALL); strich(g,[.5,1.9,-.2],[1.1,1.2,-.3],.03,SCHWARZ);
      k.anim.push(t=>{ l.rotation.y=Math.sin(t*.7)*.22; l.rotation.x=.12+Math.sin(t*.5)*.05; const w=2.0+Math.sin(t*3)*.15; s.scale.set(w,w,1); });
    } },
  { x:-5.4, z:-12.45, wand:'hinten', steh:[-5.1,-10.5], kasten:[3.9,1.0], treffer:[3.8,2.7,.8], trefferY:.8, baue(g){ /* 6 Sicherheitstafel mit Bildern */
      [-1.75,1.75].forEach(x=>{ box(g,.18,3.4,.18,HOLZ2,x,1.7,-.1); box(g,.32,.12,.9,HOLZ3,x,.06,0); ball(g,.15,GOLD,x,3.5,-.1); });
      box(g,3.5,2.6,.12,GOLD,0,2.05,0); box(g,3.34,2.44,.14,BLAU2,0,2.05,0);
      Z.tafel(g,regelBild(),3.15,2.26,0,2.05,.085);
      [-1.6,1.6].forEach(x=>[.88,3.22].forEach(y=>ball(g,.08,ROT,x,y,.08)));
    } },
  { x:15.3, z:-5.6, steh:[13.2,-5.2], r:1.15, treffer:[2.1,2.8,2.1], baue(g){ /* 7 Fass mit Jonglierkeulen */
      rohr(g,.66,.66,.45,HOLZ,0,1.12,0,18,true); rohr(g,.66,.78,.45,HOLZ,0,.68,0,18,true); rohr(g,.78,.66,.46,HOLZ,0,.23,0,18,true);
      for(let i=0;i<12;i++){ const a=i*Math.PI/6; strich(g,[Math.cos(a)*.66,.02,Math.sin(a)*.66],[Math.cos(a)*.79,.46,Math.sin(a)*.79],.014,HOLZ3); strich(g,[Math.cos(a)*.79,.46,Math.sin(a)*.79],[Math.cos(a)*.67,1.34,Math.sin(a)*.67],.014,HOLZ3); }
      [[.69,.14],[.8,.46],[.74,.9],[.675,1.32]].forEach(([r,y])=>liegend(ring(g,r,.05,METALL,0,y,0))); walze(g,.62,.05,HOLZ3,0,1.0,0);
      [[0,0,0,0,ROT],[-.34,.16,.1,.36,BLAU],[.34,.14,.08,-.36,GELB],[-.12,-.3,-.34,.12,GRUEN],[.2,-.26,-.3,-.18,ROSA],[-.14,.34,.34,.14,ORANGE],[.22,.32,.3,-.2,TUERKIS]].forEach(([x,z,rx,rz,c])=>{ const q=Z.keule(g,x,1.0,z,c); q.rotation.set(rx,0,rz); q.scale.setScalar(1.4); });
      const l=Z.keule(g,-.55,.04,.95,LILA); l.rotation.z=.28; l.scale.setScalar(1.25);
    } },
  { x:12.2, z:1.7, dreh:-.2, steh:[11.8,3.9], kasten:[4.2,2.2], treffer:[3.9,3.3,1.5], baue(g,k){ /* 8 Übungstrapez auf eigenem Gestell mit Matte */
      [-1.65,1.65].forEach(x=>{ [-1,1].forEach(s=>{ strich(g,[x,.05,s*.75],[x,3.05,0],.1,HOLZ); box(g,.34,.12,.34,HOLZ3,x,.06,s*.75); }); strich(g,[x,1.1,-.5],[x,1.1,.5],.06,HOLZ2); ball(g,.18,GOLD,x,3.12,0); });
      quer(walze(g,.11,3.5,HOLZ2,0,3.05,0));
      box(g,2.7,.16,1.5,BLAU,0,.08,0); box(g,2.74,.05,1.54,WEISS,0,.08,0);
      const s=gruppe(g,0,3.0,0); s.userData.lebendig=true;
      [-.8,.8].forEach(x=>{ strich(s,[x,0,0],[x,-1.75,0],.035,SEIL); const r=ring(s,.13,.035,GOLD,x,0,0); r.rotation.y=Math.PI/2; ball(s,.1,GOLD,x,-1.75,0); });
      quer(walze(s,.095,2.0,ROT,0,-1.75,0)); [-.45,0,.45].forEach(x=>quer(walze(s,.105,.2,WEISS,x,-1.75,0)));
      verschmelze(s); k.anim.push(t=>{ s.rotation.x=Math.sin(t*1.7)*.16; });
    } },
  Object.assign({ x:-8.8, z:-7.6, steh:[-8.4,-5.4] }, ZIRKUS.NEU.sprungtuch),
  Object.assign({ x:13.2, z:7.9, dreh:-.2, steh:[12.8,9.8] }, ZIRKUS.NEU.glocke, { kasten:[2.4,1.5] })
];

return { titel:'Die Trapez-Kuppel', breite:B, tiefe:T, himmel:0x1b1f4a, baue, gegenstaende, verstecke };
})();

/* Raum 5: Der Vorplatz am Abend, draußen vor dem Zirkuszelt. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das Zirkustor im hinteren Zaun, beide blauen Flügel schwingen nach außen auf, dahinter geht der Weg weiter. */
RAEUME3D.zirkus[4] = (function(){
const Z=ZIRKUS;
const B=36, T=27;
const EX=-6;                              /* Mitte des Zirkustors */
const ZH=-13.75, ZS=18.3, ZV=13.8;        /* Zaun hinten, seitlich, vorn */
const NACHT=0x3c3470;
const LAUB=0x2f6a4a, LAUB2=0x3f8056, LAUB3=0x24543e, STAMM=0x5a3c28, TORB=0x2f62c8, TORB2=0x1f3a8a, BANK=0x3f9a5a, BANK2=0x2a6e40;

/* ---------- Himmel: Abendrot, Sterne, Mond, Wolken ---------- */
function himmelsleben(k){
  const sc=k.scene;
  const t=bild(4,256,g=>{ const v=g.createLinearGradient(0,0,0,256); v.addColorStop(0,'rgba(60,52,112,0)'); v.addColorStop(.45,'rgba(122,70,130,.55)'); v.addColorStop(.72,'rgba(214,104,112,.9)'); v.addColorStop(1,'rgba(246,160,100,1)'); g.fillStyle=v; g.fillRect(0,0,4,256); });
  const rund=new THREE.Mesh(new THREE.CylinderGeometry(86,86,24,40,1,true),basis(0xffffff,{map:t,transparent:true,side:THREE.BackSide,depthWrite:false})); rund.position.y=11; sc.add(rund);
  /* zwei Gruppen Sterne, die abwechselnd funkeln */
  const sterne=[0,1].map(n=>{ const P=[]; for(let i=0;i<110;i++){ const a=zufall()*6.283, r=64+zufall()*10; P.push(Math.cos(a)*r,7.5+zufall()*26,Math.sin(a)*r); }
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
    const m=new THREE.PointsMaterial({color:n?0xfff3b0:0xffffff,size:n?3.6:2.6,sizeAttenuation:false,transparent:true}); sc.add(new THREE.Points(geo,m)); return m; });
  k.anim.push(t=>{ sterne[0].opacity=.75+.25*Math.sin(t*1.7); sterne[1].opacity=.75+.25*Math.sin(t*2.3+2); });
  const mond=gruppe(sc,-10,10.5,-56); ball(mond,1.8,basis(0xf4ecc8),0,0,0).castShadow=false; [[-.6,.5,.34],[.65,-.25,.24],[-.1,-.8,.2]].forEach(([x,y,r])=>{ const c=ball(mond,r,basis(0xdccf9e),x,y,Math.sqrt(3.24-x*x-y*y),1,1,.12); c.lookAt(mond.position.x+x*8,mond.position.y+y*8,mond.position.z+Math.sqrt(3.24-x*x-y*y)*8); c.castShadow=false; }); schein(mond,'rgba(255,238,180,.35)',0,0,-.4,6.5);
  const wolken=[[-38,9,-44],[8,12,-52],[30,8.5,-46],[-54,10,-18],[52,11,-14]].map(([x,y,z],i)=>{ const g=gruppe(sc,x,y,z), m=basis(0x9a6a9a), s=.7+(i%3)*.2;
    [[0,0,1.6],[2.1,-.15,1.1],[-2,-.2,1.2],[.5,.5,1]].forEach(([a,b,r])=>{ ball(g,r*s,m,a*s,b*s,0,1.5,.45,.6).castShadow=false; }); verschmelze(g); return [g,x,i]; });
  k.anim.push(t=>wolken.forEach(([g,x,i])=>{ g.position.x=x+Math.sin(t*.05+i*1.7)*7; }));
}

/* ---------- Licht, Wiese und Kiesplatz ---------- */
function grund(k){
  const sc=k.scene;
  sc.add(new THREE.HemisphereLight(0xd8d0ff,0x8a6a4a,.76));
  const sonne=new THREE.DirectionalLight(0xffd2a8,.4); sonne.position.set(-8,26,13); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const t=Z.kornBild('#4e7a54',['rgba(130,180,100,.45)','rgba(24,54,44,.45)','rgba(90,140,84,.5)'],true); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(280/9,280/9);
  const bm=new THREE.Mesh(new THREE.PlaneGeometry(280,280),new THREE.MeshLambertMaterial({map:t})); bm.rotation.x=-Math.PI/2; bm.position.y=-.015; bm.receiveShadow=true; sc.add(bm);
  const w=bild(1024,768,g=>{
    const X=x=>(x+18)/36*1024, Y=z=>(z+13.6)/26.2*768;
    g.fillStyle='#c4a276'; g.fillRect(0,0,1024,768);
    for(let i=0;i<5200;i++){ g.fillStyle=['rgba(255,232,190,.5)','rgba(112,80,50,.35)','rgba(170,140,108,.55)'][i%3]; g.fillRect(zufall()*1020,zufall()*764,2+(i%3),2+(i%2)); }
    g.lineCap='round'; g.lineJoin='round';
    const spur=(P,b,f)=>{ g.strokeStyle=f; g.lineWidth=b; g.beginPath(); g.moveTo(X(P[0][0]),Y(P[0][1])); for(let i=1;i<P.length-1;i++) g.quadraticCurveTo(X(P[i][0]),Y(P[i][1]),X((P[i][0]+P[i+1][0])/2),Y((P[i][1]+P[i+1][1])/2)); const e=P[P.length-1]; g.lineTo(X(e[0]),Y(e[1])); g.stroke(); };
    [[[EX,-13.6],[EX,-9],[-3,-3],[-1,2],[0,7],[0,10]],[[-1,2],[-6,1],[-10,2],[-12.5,1.2]],[[-1,2],[3,2.6],[8,2],[11.5,-2],[12.4,-3]]].forEach(P=>{ spur(P,78,'rgba(232,206,160,.22)'); spur(P,52,'rgba(236,212,166,.35)'); spur(P,24,'rgba(246,226,184,.3)'); });
    /* Rand weich auslaufen lassen, darunter liegt überall die Wiese */
    g.globalCompositeOperation='destination-out';
    [[0,0,60,0,0,0,60,768],[1024,0,964,0,964,0,60,768],[0,768,0,668,0,668,1024,100],[0,0,0,26,0,0,1024,26]].forEach(([a,b,c,d,x,y,bb,h])=>{ const v=g.createLinearGradient(a,b,c,d); v.addColorStop(0,'rgba(0,0,0,1)'); v.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=v; g.fillRect(x,y,bb,h); });
  });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(36,26.2),new THREE.MeshLambertMaterial({map:w,transparent:true,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.set(0,-.002,-.5); m.receiveShadow=true; m.renderOrder=-1; sc.add(m);
}

/* ---------- Zaun in Rot und Creme (runde Köpfe, keine Spitzen) ---------- */
function zaunStueck(g,x1,z1,x2,z2,h){
  const dx=x2-x1, dz=z2-z1, l=Math.hypot(dx,dz), n=Math.max(1,Math.round(l/2.4)), dreh=Math.atan2(-dz,dx);
  for(let i=0;i<=n;i++){ const x=x1+dx*i/n, z=z1+dz*i/n; box(g,.24,h+.15,.24,Z.ROT2,x,(h+.15)/2,z); ball(g,.17,Z.GOLD,x,h+.28,z); }
  [.38,.82].forEach(a=>{ const m=box(g,l,.11,.09,Z.CREME,(x1+x2)/2,h*a,(z1+z2)/2); m.rotation.y=dreh; });
  const q=Math.max(1,Math.round(l/.6));
  for(let i=1;i<q;i++){ const x=x1+dx*i/q, z=z1+dz*i/q, f=i%2?Z.ROT:Z.CREME, p=box(g,.2,h*.86,.07,f,x,h*.47,z); p.rotation.y=dreh; const o=ball(g,.1,f,x,h*.9,z,1,.8,.4); o.rotation.y=dreh; }
}
function lichtpfahl(g,x,z,h){ walze(g,.09,h,STAMM,x,h/2,z); ball(g,.17,Z.GOLD,x,h+.08,z); }
function zaeune(k){
  const hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts');
  const h=gruppe(hinten,0,0,0), l=gruppe(links,0,0,0), r=gruppe(rechts,0,0,0), v=gruppe(k.scene,0,0,0);
  zaunStueck(h,-ZS,ZH,EX-2.75,ZH,1.35); zaunStueck(h,EX+2.75,ZH,ZS,ZH,1.35);
  zaunStueck(l,-ZS,ZH,-ZS,ZV,1.3); zaunStueck(r,ZS,ZH,ZS,ZV,1.3);
  zaunStueck(v,-ZS,ZV,ZS,ZV,.75);
  /* Lichterketten zwischen Pfählen knapp hinter dem Zaun */
  const px=[-18.4,-13.6,EX-2.9], qx=[EX+2.9,2,8,13.2,18.4], hk=[];
  [px,qx].forEach(L=>{ L.forEach(x=>lichtpfahl(h,x,ZH-.35,3.7)); for(let i=0;i<L.length-1;i++) hk.push([[L[i],3.75,ZH-.35],[L[i+1],3.75,ZH-.35],.55,Math.max(6,Math.round((L[i+1]-L[i])*1.7))]); });
  Z.lichterkette(k,hinten,hk,{gr:.14});
  [[-1,l,links],[1,r,rechts]].forEach(([s,g,wand])=>{ const x=s*(ZS+.35), P=[-13.2,-6.6,0,6.6,13.4], K=[];
    P.forEach(z=>lichtpfahl(g,x,z,3.4)); for(let i=0;i<P.length-1;i++) K.push([[x,3.45,P[i]],[x,3.45,P[i+1]],.55,10]); Z.lichterkette(k,wand,K,{gr:.14}); });
  [h,l,r,v].forEach(q=>{ verschmelze(q); Z.ohneSchatten(q); });
}

/* ---------- Ausgang: das Zirkustor ---------- */
function zirkustor(k){
  const sc=k.scene;
  /* der Weg dahinter mit kleinen Laternen bis in die Ferne */
  const weg=gruppe(sc,0,0,0);
  const P=[[EX,-13],[EX,-19],[EX-1,-26],[EX-3.6,-33],[EX-5,-41],[EX-4,-50],[EX-1,-60]];
  for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], l=Math.hypot(b[0]-a[0],b[1]-a[1]), d=Math.atan2(b[0]-a[0],b[1]-a[1]);
    const m=box(weg,3.5,.02,l+.5,0xc4a276,(a[0]+b[0])/2,.006+i*.0015,(a[1]+b[1])/2); m.rotation.y=d;
    const n=box(weg,1.8,.02,l+.3,0xdcc096,(a[0]+b[0])/2,.018+i*.0015,(a[1]+b[1])/2); n.rotation.y=d; }
  for(let i=1;i<6;i++){ const a=P[i]; [-2.5,2.5].forEach(s=>{ walze(weg,.07,1.4,Z.EISEN,a[0]+s,.7,a[1]); ball(weg,.22,basis(0xffe08a),a[0]+s,1.55,a[1]); kegel(weg,.26,.2,Z.EISEN,a[0]+s,1.83,a[1]); }); }
  Z.ohneSchatten(weg); verschmelze(weg);
  /* gestreifte Torpfosten mit Goldkugeln */
  const fest=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ const x=EX+s*2.5;
    box(fest,.75,.28,.75,Z.HOLZ3,x,.14,ZH);
    for(let i=0;i<6;i++) walze(fest,.27,.44,i%2?Z.CREME:Z.ROT,x,.5+i*.44,ZH);
    walze(fest,.36,.16,Z.GOLD,x,3.0,ZH); ball(fest,.3,Z.GOLD,x,3.33,ZH); Z.stern(fest,x,3.9,ZH,.3,Z.GELB); });
  /* Torbogen */
  [[2.5,.13,Z.GOLD,0],[2.2,.07,TORB,-.04]].forEach(([r,d,f,dz])=>{ const b=ring(fest,r,d,f,EX,3.0,ZH+dz,Math.PI); b.scale.y=.62; });
  const st=gruppe(fest,EX,4.56,ZH+.12); Z.stern(st,0,-.3,.08,.4,Z.GELB); Z.stern(st,0,-.3,.1,.2,Z.CREME);
  verschmelze(fest);
  Z.lichterkette(k,sc,[[[EX-2.5,3.05,ZH+.22],[EX+2.5,3.05,ZH+.22],-1.55,18]],{gr:.14});
  /* zwei blaue Torflügel mit Sternen, Angeln an den Pfosten */
  const fluegel=[-1,1].map(s=>{
    const f=gruppe(sc,EX+s*2.2,0,ZH+.02), r=-s;
    for(let i=0;i<6;i++){ const u=.2+i*.36, hoch=2.25+Math.sin((u/2.2)*Math.PI/2)*.55; box(f,.35,hoch,.12,i%2?TORB:0x3a78e0,r*u,.16+hoch/2,0); ball(f,.19,i%2?TORB:0x3a78e0,r*u,.16+hoch,0,.92,.5,.32); }
    [.4,2.1].forEach(y=>box(f,2.14,.14,.05,Z.GOLD,r*1.08,y,.085));
    [.07,2.15].forEach(x=>box(f,.09,2.0,.05,Z.GOLD,r*x,1.25,.09));
    Z.stern(f,r*(s>0?.6:.75),1.6,.13,.31,Z.GELB); Z.stern(f,r*1.6,.9,.13,.24,Z.CREME); Z.stern(f,r*.5,.82,.13,.18,Z.GELB); Z.stern(f,r*1.55,2.42,.09,.16,Z.CREME);
    if(s>0){ const schloss=Z.zahlenschloss(f,r*1.62,1.55,.22); schloss.scale.setScalar(1.3); }
    else ring(f,.15,.04,Z.GOLD,r*2.0,1.45,.14);
    verschmelze(f); return f; });
  /* Lampe am rechten Pfosten: rot = zu, grün = offen */
  walze(sc,.1,.3,Z.EISEN,EX+3.0,2.2,ZH+.2);
  const rot=ball(sc,.16,basis(0xff3a2a),EX+3.0,2.46,ZH+.2), gruen=ball(sc,.16,basis(0x4af05a),EX+3.0,2.46,ZH+.2); gruen.visible=false;
  const tuer=ausgang(k,{ steh:[EX,-11.6], durch:[EX,-17.6], treffer:{x:EX,y:2.2,z:ZH+.35,b:5.8,h:4.4,t:1}, name:'Zirkustor', einfach:'Großes Tor', schildOben:[EX,5.4,-13.2], glanz:[EX+.58,1.55,ZH+.9],
    bewege:auf=>{ fluegel[0].rotation.y=auf*1.35; fluegel[1].rotation.y=-auf*1.35; rot.visible=auf<.5; gruen.visible=auf>=.5; } });
  k.kasten(EX,ZH+.1,6.4,.9);
  return tuer;
}

/* ---------- das große Zelt und zwei kleine Zelte ---------- */
function zelt(g,x,z,r,h,dh,n,a,b){
  verschmelze(Z.zeltrund(g,x,0,z,r,h,n,a,b));
  verschmelze(Z.zeltdach(g,x,h,z,r+.45,dh,n,a,b));
}
function zelte(k){
  const sc=k.scene, g=gruppe(sc,0,0,0), X=9, ZZ=-23, R=7.4, H=3.4;
  zelt(g,X,ZZ,R,H,4.8,20,Z.ROT,Z.CREME);
  /* Sterne und Goldband auf der Zeltwand (kein Eingang auf dieser Seite) */
  [-1.0,-.68,-.36,-.04,.28,.6,.92].forEach((w,i)=>{ const q=gruppe(g,X,0,ZZ); q.rotation.y=w; Z.stern(q,0,2.25+(i%2)*.35,R+.07,.5-(i%2)*.14,i%2?Z.BLAU:Z.GELB); });
  const band=ring(g,R+.03,.1,Z.GOLD,X,.35,ZZ); band.rotation.x=Math.PI/2;
  zelt(g,-23,-24,3.8,2.5,2.8,14,Z.BLAU,Z.CREME);
  zelt(g,26.5,-17,3.2,2.3,2.4,12,Z.GELB,Z.ROT);
  Z.ohneSchatten(g); verschmelze(g);
  /* Lichter am Dachrand und Wimpel zu den Pfählen */
  const K=[], rr=R+.5;
  for(let i=0;i<7;i++){ const w=-1.26+i*.36, v=w+.36; K.push([[X+Math.sin(w)*rr,H-.05,ZZ+Math.cos(w)*rr],[X+Math.sin(v)*rr,H-.05,ZZ+Math.cos(v)*rr],.35,6]); }
  Z.lichterkette(k,sc,K,{gr:.15});
  Z.wimpel(sc,[[[X,H+5.6,ZZ],[18.4,3.8,ZH-.35],.8,16],[[X,H+5.6,ZZ],[-2.2,3.6,-20],.8,15]]);
}

/* ---------- Bäume, Häuser, Riesenrad in der Ferne ---------- */
function baum(g,x,z,s){
  walze(g,.26*s,2*s,STAMM,x,1*s,z);
  [[0,2.9,0,1.35,LAUB],[-.9,2.45,.2,.95,LAUB3],[.95,2.55,.1,.9,LAUB2],[.1,3.8,-.1,.9,LAUB2]].forEach(([a,b,c,r,f])=>ball(g,r*s,f,x+a*s,b*s,z+c*s,1,.9,1));
}
function ferne(k){
  const sc=k.scene, g=gruppe(sc,0,0,0);
  [[-30,-17,1.2],[-16.5,-21,1.1],[-19,-31,1.4],[1.5,-34,1.3],[20,-30,1.5],[35,-24,1.3],[-33,-30,1.6],[-38,-6,1.4],[-36,10,1.2],[-27,19,1],[37,-4,1.5],[34,13,1.3],[25,21,1],[-14,-45,1.5],[16,-46,1.6],[-48,-20,1.7],[46,-24,1.6],[-25.5,2,.9],[27,4,.95]].forEach(([x,z,s])=>baum(g,x,z,s));
  /* Häuser mit hellen Fenstern */
  const licht=basis(0xffd878);
  [[-31,-46,0],[-24,-50,1],[-17,-54,2],[11,-55,3],[19,-52,0],[28,-48,1],[-44,-38,2],[41,-40,3],[-52,2,1],[52,-2,2]].forEach(([x,z,i])=>{ const h=3+i*.55, q=gruppe(g,x,0,z); q.rotation.y=-x*.012;
    box(q,4.4,h,3.4,[0x8a5a78,0x6a6a9a,0x9a6a58,0x5a7088][i],0,h/2,0); const d=kegel(q,3.5,2,[0x4a2438,0x2c2c54,0x5a2c28,0x28384c][i],0,h+1,0); d.rotation.y=Math.PI/4; d.scale.z=2.8;
    [-1.2,0,1.2].forEach(a=>[1,2.3].forEach(b=>{ if((a+b+i)%2.4<2) box(q,.6,.7,.1,licht,a,b,1.72); })); });
  [[-52,-62,30,5,0x354a6a],[-8,-70,34,5.5,0x40406a],[40,-62,30,6,0x354a6a],[68,-20,22,5,0x40406a],[-70,-12,24,5,0x354a6a]].forEach(([x,z,r,h,f])=>ball(g,1,f,x,-.5,z,r,h,r*.5));
  Z.ohneSchatten(g); verschmelze(g);
  /* kleines Riesenrad weit hinten, dreht sich langsam */
  const fuss=gruppe(sc,-31,0,-37); [-1,1].forEach(s=>strich(fuss,[s*3,0,0],[0,6.2,0],.18,Z.METALL)); Z.ohneSchatten(fuss); verschmelze(fuss);
  const rad=gruppe(sc,-31,6.2,-36.7), gondeln=[];
  ring(rad,4.6,.1,basis(0xffd84a),0,0,0).castShadow=false;
  for(let i=0;i<8;i++){ const a=i*Math.PI/4; strich(rad,[0,0,0],[Math.cos(a)*4.6,Math.sin(a)*4.6,0],.06,Z.METALL); }
  ball(rad,.5,Z.ROT,0,0,0); Z.ohneSchatten(rad); verschmelze(rad);
  for(let i=0;i<8;i++){ const q=gruppe(sc,0,0,-36.4); box(q,.95,.65,.6,basis([0xff6a5a,0x5ac8ff,0x7ae87a,0xff8ad8][i%4]),0,-.4,0).castShadow=false; gondeln.push(q); }
  k.anim.push(t=>{ rad.rotation.z=t*.18; gondeln.forEach((q,i)=>{ const a=i*Math.PI/4+t*.18; q.position.x=-31+Math.cos(a)*4.6; q.position.y=6.2+Math.sin(a)*4.6; }); });
  /* zwei Scheinwerfer, deren Strahlen über den Himmel wandern */
  [[2,-33,0],[19,-33,2.4]].forEach(([x,z,ph])=>{ const q=gruppe(sc,x,3,z);
    const m=new THREE.Mesh(new THREE.CylinderGeometry(1.6,.15,20,14,1,true),basis(0xfff0c0,{transparent:true,opacity:.1,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending})); m.position.y=10; q.add(m);
    k.anim.push(t=>{ q.rotation.z=Math.sin(t*.4+ph)*.6; }); });
  /* Fahrräder der Gäste draußen am rechten Zaun */
  const rd=gruppe(sc,0,0,0);
  [[-6,Z.BLAU],[-4.7,Z.GRUEN],[-3.4,Z.ROT],[7,Z.GELB]].forEach(([z,f])=>{ const q=gruppe(rd,19.9,0,z);
    [-.6,.6].forEach(a=>{ ring(q,.42,.05,Z.SCHWARZ,a,.47,0); }); strich(q,[-.6,.47,0],[-.15,.95,0],.045,f); strich(q,[-.15,.95,0],[.4,.9,0],.045,f); strich(q,[.4,.9,0],[.6,.47,0],.045,f); strich(q,[-.15,.95,0],[.05,.47,0],.045,f); strich(q,[.4,.9,0],[.05,.47,0],.045,f); strich(q,[-.6,.47,0],[.05,.47,0],.035,f);
    box(q,.34,.08,.14,Z.SCHWARZ,-.2,1.06,0); strich(q,[.4,.9,0],[.36,1.2,0],.035,Z.METALL); strich(q,[.36,1.2,-.24],[.36,1.2,.24],.035,Z.SCHWARZ); });
  Z.ohneSchatten(rd); verschmelze(rd);
}

/* ---------- Gäste (blicken nach +x) ---------- */
function gast(k,par,x,z,dreh,gr,hemd,hose,haar,opt){
  const o=opt||{}, g=gruppe(par,x,0,z); g.rotation.y=dreh; g.scale.setScalar(gr);
  const r=gruppe(g,0,0,0);
  rohr(r,.22,.34,.72,hemd,0,1.02,0,10); ball(r,.23,hemd,0,1.36,0,1,.6,1.15);
  ball(r,.28,Z.HAUT,0,1.76,0); ball(r,.29,haar,-.07,1.85,0,1,.85,1.05);
  if(o.zopf) ball(r,.15,haar,-.33,1.66,0,.8,1.5,.8);
  if(o.hut){ walze(r,.34,.05,o.hut,0,2.0,0); walze(r,.2,.22,o.hut,0,2.12,0); }
  [-1,1].forEach(s=>{ ball(r,.035,Z.SCHWARZ,.26,1.79,s*.1); strich(r,[0,1.36,s*.28],[.06,.82,s*.44],.075,hemd); ball(r,.085,Z.HAUT,.07,.76,s*.45); });
  verschmelze(r);
  const beine=[-1,1].map(s=>{ const b=gruppe(g,0,.7,s*.14); walze(b,.095,.62,hose,0,-.31,0); box(b,.32,.13,.18,Z.EISEN,.07,-.63,0); verschmelze(b); return b; });
  Z.ohneSchatten(g);
  if(o.weg){ laeufer(k,g,o.weg,o.tempo||1,o.start||0,8); k.anim.push(t=>{ const s=Math.sin(t*5+(o.start||0))*.4; beine[0].rotation.z=s; beine[1].rotation.z=-s; }); }
  else k.anim.push(t=>{ g.position.y=Math.max(0,Math.sin(t*2.3+x))*.06; g.rotation.y=dreh+Math.sin(t*.8+z+x)*.18; });
  return g;
}
function gaeste(k){
  const sc=k.scene;
  const hinten=[[.5,-14.75],[15.5,-14.75],[15.5,-15.05],[.5,-15.05]];
  gast(k,sc,.5,-14.75,0,.95,Z.TUERKIS,Z.BLAU2,0x4a2412,{weg:hinten,tempo:.9,start:0,zopf:true});
  gast(k,sc,2,-14.75,0,.7,Z.GELB,Z.ROT2,0xc87a30,{weg:hinten,tempo:.9,start:1.4});
  gast(k,sc,9,-15.05,0,.95,Z.LILA,0x3a3040,0x1c140c,{weg:hinten,tempo:.9,start:16,hut:Z.ROT});
  const links=[[-20.5,-9],[-20.5,9],[-21.8,9],[-21.8,-9]];
  gast(k,sc,-20.5,-9,0,.95,Z.ORANGE,0x3a4a6a,0x2a1a10,{weg:links,tempo:1.1,start:3});
  gast(k,sc,-20.5,0,0,.72,Z.ROSA,Z.LILA,0xe0b050,{weg:links,tempo:1.1,start:4.6,zopf:true});
  const rechts=[[21.4,10],[21.4,-10],[22.8,-10],[22.8,10]];
  gast(k,sc,21.4,3,0,.98,Z.GRUEN,0x4a3a30,0x8a4a20,{weg:rechts,tempo:1,start:9,hut:Z.BLAU2});
  /* wartende Gäste links neben dem Tor */
  gast(k,sc,-10.6,-15.2,-Math.PI/2,.95,Z.ROT,Z.BLAU2,0x6a3a14,{zopf:true});
  gast(k,sc,-11.8,-15.4,-1.2,.7,Z.BLAU,0x3a3040,0xe0b050);
  gast(k,sc,-13.1,-15.2,-1.9,1,0x2a9a70,0x3a2a20,0x1c140c,{hut:Z.GELB});
}

/* ---------- Ausstattung auf dem Platz ---------- */
function ausstattung(k){
  const sc=k.scene;
  /* Laternen */
  [[-16.7,-6],[16.7,-11.7],[-16.7,11.6],[16.7,11.2],[-2,-12.2],[17,-.6]].forEach(([x,z])=>{ const g=gruppe(sc,x,0,z);
    walze(g,.3,.24,Z.EISEN,0,.12,0); walze(g,.09,3.1,Z.EISEN,0,1.6,0); ring(g,.14,.045,Z.GOLD,0,2.7,0).rotation.x=Math.PI/2;
    box(g,.46,.52,.46,basis(0xffe49a),0,3.42,0); [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.06,.58,.06,Z.EISEN,a*.24,3.42,b*.24))); kegel(g,.46,.3,Z.EISEN,0,3.84,0).rotation.y=Math.PI/4; ball(g,.08,Z.GOLD,0,4.02,0);
    schein(g,'rgba(255,214,120,.55)',0,3.42,0,2.1); verschmelze(g); Z.ohneSchatten(g); k.kreis(x,z,.36); k.verdecker(g,x,z,.4); });
  /* Absperrseile vor dem Tor */
  const g=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ const x=EX+s*3.25, P=[-12.5,-11.2,-9.9];
    P.forEach(z=>{ walze(g,.24,.09,Z.MESSING,x,.05,z); walze(g,.06,1.05,Z.GOLD,x,.55,z); ball(g,.12,Z.GOLD,x,1.13,z); });
    for(let i=0;i<2;i++) for(let j=0;j<8;j++) strich(g,Z.haengt([x,1.02,P[i]],[x,1.02,P[i+1]],.28,j/8),Z.haengt([x,1.02,P[i]],[x,1.02,P[i+1]],.28,(j+1)/8),.055,Z.ROT);
    k.kasten(x,-11.2,.4,2.9); });
  /* Blumenkübel am Rand */
  [[-16.9,5.4],[16.9,-8.2],[-11.4,12.2],[11.2,12.2],[3.2,-12.4],[16.9,8]].forEach(([x,z],i)=>{
    rohr(g,.55,.42,.6,i%2?Z.BLAU2:Z.ROT2,x,.3,z,14); ring(g,.55,.06,Z.GOLD,x,.6,z).rotation.x=Math.PI/2; ball(g,.5,LAUB2,x,.68,z,1,.55,1);
    for(let j=0;j<9;j++){ const a=j*2.4, r=.08+j*.045; ball(g,.11,Z.BUNT[(i+j%3)%5],x+Math.cos(a)*r,1.0-r*.4,z+Math.sin(a)*r); }
    k.kreis(x,z,.58); });
  verschmelze(g); Z.ohneSchatten(g);
  /* Büsche, Grasbüschel und Blumen als Instanzen */
  const L=[], F=[LAUB,LAUB2,LAUB3,0x4a8a50];
  for(let i=0;i<150;i++){ const s=i%4; let x, z;
    if(s===0){ x=-30+zufall()*60; z=-16.2-zufall()*.9; if(x>1 && x<17) x=-30+zufall()*15; }
    else if(s===1){ x=-19.1-zufall()*.2; z=-12+zufall()*26; } else if(s===2){ x=19+zufall()*.2; z=-12+zufall()*26; }
    else { x=-26+zufall()*52; z=15+zufall()*9; }
    if(i%9===4){ x=-34+zufall()*68; z=-27-zufall()*12; }
    if((Math.abs(x-EX)<5 && z<-13) || (s===2 && z>-7.5 && z<8.5)) continue;
    const r=.28+zufall()*.35; L.push([x,r*.4,z,r,r*.75,r*.9,F[i%4],i]); L.push([x+r*.7,r*.28,z+r*.2,r*.6,r*.5,r*.6,F[(i+1)%4],i]);
    if(i%2===0) L.push([x-r*.2,r*1.05,z+r*.55,.11,.11,.11,Z.BUNT[i%10/2|0],0]); }
  Z.viele(sc,new THREE.SphereGeometry(1,10,7),L).castShadow=false;
  const halme=[], blumen=[];
  const nah=(x,z,r)=>gegenstaende.some(d=>Math.hypot(d.x-x,d.z-z)<r+1.5 || Math.hypot(d.steh[0]-x,d.steh[1]-z)<r) || verstecke.some(v=>Math.hypot(v[0]-x,v[1]-z)<r);
  const bueschel=(x,z,i)=>{ for(let j=0;j<5;j++){ const a=j*1.26+i, h=.18+zufall()*.2; halme.push([x+Math.cos(a)*.11,h/2,z+Math.sin(a)*.11,.045,h,.045,[0x4e8a4a,0x66a054,0x3a7040][(i+j)%3],0,Math.sin(a)*.35,-Math.cos(a)*.35]); } };
  for(let i=0;i<90;i++){ const s=i%4; const x=s<2?(s?17.75:-17.75)+(zufall()-.5)*.35:-17.4+zufall()*34.8, z=s<2?-12.8+zufall()*26:(s===2?-13.2:13.1)+(zufall()-.5)*.35;
    if(Math.abs(x-EX)<3.8 && z<-12) continue; bueschel(x,z,i);
    if(i%2) blumen.push([x+.25,.2,z+.1,.1,.08,.1,Z.BUNT[i%5],0]); }
  [[-3.6,6.2],[3.6,3.8],[-12.6,9],[10.2,9.6],[-1.8,-6.8],[9.4,-1.4],[-10,-5.6],[3.4,10.4],[-7.2,10.8]].forEach(([x,z],i)=>{ if(nah(x,z,.8)) return; bueschel(x,z,i);
    for(let j=0;j<4;j++){ const bx=x+Math.cos(j*2.4)*(.2+j*.09), bz=z+Math.sin(j*2.4)*(.2+j*.09); halme.push([bx,.1,bz,.02,.2,.02,0x3f6a30,0,0,0]); blumen.push([bx,.22,bz,.08,.045,.08,[Z.WEISS,Z.GELB,Z.ROSA][(i+j)%3],0]); } });
  for(let i=0;i<120;i++){ const s=i%2; blumen.push([s?-19.6-zufall()*12:19.6+zufall()*12,.1,-12+zufall()*28,.1,.07,.1,Z.BUNT[i%5],0]); }
  /* südlicher Rand: niedrige Blumen, Grasbüschel und kleine Kiesel */
  const kiesel=[];
  for(let i=0;i<70;i++){ const x=-17.3+i*.5+(zufall()-.5)*.25, z=13.05+(zufall()-.5)*.35, h=.14+(i%3)*.05;
    halme.push([x,h/2,z,.02,h,.02,0x3f6a30,0,0,0]); blumen.push([x,h+.02,z,.11,.06,.11,Z.BUNT[(i/4|0)%5],0]);
    if(i%3===0) bueschel(x+.2,z-.2,i); if(i%2) kiesel.push([x,.04,12.6+(zufall()-.5)*.2,.1,.055,.08,i%4===1?0xd8ccb8:0xa89c8c,i]); }
  [[-15.6,12],[-13,10.6],[-9,12.3],[-5.6,9.8],[-3,12.4],[2.2,12.5],[6.8,10.2],[7.4,12.3],[13,12],[15.8,11.4],[-16,7.6],[16,6.4],[-2.8,10],[3.4,7.6]].forEach(([x,z],i)=>{ if(nah(x,z,.7)) return;
    bueschel(x,z,i);
    for(let j=0;j<6;j++){ const a=j*2.4, d=.15+j*.1, bx=x+Math.cos(a)*d, bz=z+Math.sin(a)*d*.7; halme.push([bx,.08,bz,.018,.16,.018,0x3f6a30,0,0,0]); blumen.push([bx,.17,bz,.085,.048,.085,[Z.WEISS,Z.GELB,Z.ROSA,Z.TUERKIS][(i+(j>>1))%4],0]); }
    for(let j=0;j<3;j++) kiesel.push([x-.5+j*.22,.035,z+.45-(j%2)*.15,.09-j*.015,.05,.07,j%2?0xd8ccb8:0xa89c8c,i+j]); });
  Z.viele(sc,new THREE.SphereGeometry(1,7,5),kiesel).castShadow=false;
  Z.viele(sc,GEO.cone,halme).castShadow=false; Z.viele(sc,new THREE.SphereGeometry(1,7,5),blumen).castShadow=false;
}
function leben(k){
  const sc=k.scene;
  Z.clownin(k,sc,2.5,-.8,-.25,{ winkt:true, phase:.7 }); k.kreis(2.5,-.8,.6);
  const h=Z.hund(k,sc,-3,8.4,0,.85,{ krause:true, laeuft:true });
  laeufer(k,h.g,[[-4.6,8.6],[2.2,8.8],[2.8,11.8],[-4.2,11.6]],1.5,0,9);
  /* Glühwürmchen */
  const m=basis(0xe8ff7a);
  [[-15,8,0],[-11,-4,1],[9,10,2],[15,-1,3],[3,-6.5,4],[-8,11,5],[-1,-11,6],[11,1,7],[-17,-11,8],[20,6,9]].forEach(([x,z,i])=>{ const g=ball(sc,.065,m,x,1.5,z); g.castShadow=false;
    k.anim.push(t=>{ g.position.set(x+Math.sin(t*.5+i)*1.1,1.4+Math.sin(t*.9+i*2)*.6,z+Math.cos(t*.4+i*1.3)*.9); const s=.03+.055*Math.max(0,Math.sin(t*2+i*1.9)); g.scale.set(s,s,s); }); });
  flacker(k,-12.2,3.4,.4,0xffc878,.42,10);
  flacker(k,11.6,3.4,-3.2,0xffc878,.42,10);
  flacker(k,11.6,3.2,5.8,0xff9ac8,.36,9);
  flacker(k,EX,4.2,-11.2,0xffdc90,.45,11);
  flacker(k,1.5,4.5,-8,0xffc890,.35,12);
}

/* ---------- Gegenstände ---------- */
/* 1 Kassenhäuschen mit Fenster, Eintrittskarten und gestreiftem Dach */
function kasse(g){
  box(g,2.5,.2,2.1,Z.HOLZ3,0,.1,0); box(g,2.3,1.25,1.9,Z.ROT,0,.82,0);
  [-.78,-.26,.26,.78].forEach(x=>box(g,.2,1.15,.04,Z.CREME,x,.82,.96));
  box(g,2.7,.14,.6,Z.HOLZ,0,1.5,1.05); box(g,2.74,.06,.64,Z.GOLD,0,1.42,1.05);
  [-1,1].forEach(s=>{ box(g,.28,1.35,.28,Z.ROT2,s*1.02,2.2,.82); box(g,.2,1.35,1.5,Z.ROT,s*1.05,2.2,-.05); });
  box(g,1.9,1.35,.14,0x7a2a22,0,2.2,-.86);
  box(g,1.7,1.2,.04,basis(0xffe9a8),0,2.18,-.76);
  [-.88,.88].forEach(x=>box(g,.07,1.35,.08,Z.GOLD,x,2.2,.98)); box(g,1.84,.09,.1,Z.GOLD,0,2.82,.98);
  box(g,2.55,.22,2.15,Z.GOLD,0,2.98,0);
  const d=Z.zeltdach(g,0,3.08,0,1.72,1.05,12,Z.ROT,Z.CREME,true); d.scale.set(1,.85,.92);
  /* großes Bild einer Eintrittskarte vorn unter der Theke */
  const s=gruppe(g,0,.84,1.05); box(s,1.35,.58,.07,Z.GELB,0,0,0); [-1,1].forEach(v=>{ const m=walze(s,.13,.09,Z.ROT,v*.68,0,0); m.rotation.x=Math.PI/2; box(s,.04,.42,.02,Z.ROT2,v*.42,0,.045); }); Z.stern(s,0,0,.05,.22,Z.ROT);
  /* Eintrittskarten auf der Theke */
  [Z.TUERKIS,Z.ROSA,Z.GELB,Z.GRUEN,Z.BLAU].forEach((f,i)=>{ const a=(i-2)*.5, q=gruppe(g,-.4+Math.sin(a)*.34,1.576+i*.006,1.3-Math.cos(a)*.27); q.rotation.y=-a; box(q,.2,.008,.38,f,0,0,0); box(q,.12,.004,.05,Z.CREME,0,.007,-.1); ball(q,.035,Z.WEISS,0,.006,.05,1,.15,1); });
  const r=walze(g,.2,.22,Z.GELB,.62,1.77,1.1); r.rotation.x=Math.PI/2; const r2=walze(g,.07,.24,Z.ROT,.62,1.77,1.1); r2.rotation.x=Math.PI/2; box(g,.3,.025,.18,Z.GELB,.84,1.59,1.18);
  ball(g,.11,Z.GOLD,.98,1.65,1.05,1,.8,1); walze(g,.025,.09,Z.EISEN,.98,1.77,1.05);
}
/* 2 Popcornwagen mit Glaskasten, hüpfendem Popcorn und Dach */
function popcornwagen(g,k){
  [-1,1].forEach(s=>{ const q=gruppe(g,-.7,.46,s*.72); ring(q,.38,.08,Z.SCHWARZ,0,0,0); for(let i=0;i<4;i++){ const a=i*Math.PI/4; strich(q,[Math.cos(a)*.36,Math.sin(a)*.36,0],[-Math.cos(a)*.36,-Math.sin(a)*.36,0],.035,Z.GELB); } walze(q,.09,.14,Z.GOLD,0,0,0).rotation.x=Math.PI/2; });
  [-.45,.45].forEach(z=>{ box(g,.14,.7,.14,Z.HOLZ2,.9,.35,z); });
  strich(g,[1.1,.95,-.5],[1.55,1.15,-.5],.05,Z.METALL); strich(g,[1.1,.95,.5],[1.55,1.15,.5],.05,Z.METALL); strich(g,[1.55,1.15,-.5],[1.55,1.15,.5],.07,Z.SCHWARZ);
  box(g,2.3,.75,1.2,Z.ROT,0,1.0,0); box(g,2.4,.1,1.3,Z.GOLD,0,1.4,0); box(g,2.36,.08,1.26,Z.GOLD,0,.66,0);
  /* Popcorntüte vorn auf dem Wagen gemalt */
  Z.vieleck(g,[[-.24,.74,.62],[.24,.74,.62],[.34,1.26,.62],[-.34,1.26,.62]],Z.CREME); [-.16,.02,.2].forEach(x=>Z.vieleck(g,[[x*.75-.05,.74,.63],[x*.75+.03,.74,.63],[x*1.1+.04,1.26,.63],[x*1.1-.07,1.26,.63]],Z.ROT)); [-.22,0,.22].forEach((x,i)=>ball(g,.13,0xfff0b8,x,1.3+(i%2)*.06,.63,1,1,.5));
  [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.09,1.2,.09,Z.GOLD,a*1.05,2.05,b*.52)));
  const glas=box(g,2.05,1.15,1.0,basis(0xcff0ff,{transparent:true,opacity:.18,depthWrite:false}),0,2.05,0); glas.castShadow=false;
  Z.popcorn(g,-.35,1.52,0,.52,.5,60); Z.popcorn(g,.4,1.52,.02,.5,.42,50); Z.popcorn(g,0,1.5,.26,.34,.3,24);
  /* Topf oben im Glaskasten */
  walze(g,.28,.28,Z.METALL,.25,2.42,0); walze(g,.31,.05,Z.METALL2,.25,2.58,0); walze(g,.03,.2,Z.EISEN,.25,2.68,0);
  const hupf=[0,1,2,3,4,5].map(i=>{ const m=ball(g,.08,0xfff4c8,0,2,0); m.userData.lebendig=true; return m; });
  k.anim.push(t=>hupf.forEach((m,i)=>{ const u=(t*.9+i/6)%1, a=i*2.1; m.position.set(.25+Math.cos(a)*u*.7,2.35+Math.sin(u*Math.PI)*.24-u*.4,Math.sin(a)*u*.38); }));
  box(g,2.45,.14,1.35,Z.GOLD,0,2.7,0);
  for(let i=0;i<8;i++){ const x=-1.1+i*.314, f=i%2?Z.CREME:Z.ROT; const d=box(g,.315,.1,1.5,f,x,2.95,0); d.scale.y=.34; ball(g,.16,f,x,2.75,.72,1,.8,.35); }
  box(g,1.9,.2,1.0,Z.ROT,0,3.08,0); ball(g,.2,Z.GOLD,0,3.3,0);
  /* gefüllte Tüten auf der Seite */
  [[-1.5,.45],[-1.62,-.05]].forEach(([x,z])=>{ walze(g,.07,.9,Z.HOLZ2,x,.45,z); rohr(g,.24,.16,.46,Z.CREME,x,1.08,z,10); rohr(g,.215,.185,.14,Z.ROT,x,1.08,z,10); Z.popcorn(g,x,1.3,z,.22,.22,14); });
}
/* 3 Luftballons an einem Ständer */
function ballons(g,k){
  walze(g,.55,.2,Z.BLAU2,0,.1,0); walze(g,.4,.14,Z.GOLD,0,.26,0); walze(g,.08,1.0,Z.GOLD,0,.75,0); ball(g,.14,Z.GOLD,0,1.28,0);
  Z.stern(g,0,.12,.57,.1,Z.GELB);
  const teile=[[-.75,2.65,.1,0],[0,3.35,-.1,2],[.72,2.75,.05,1],[-.38,2.15,.45,3],[.4,2.1,.4,4],[-.55,3.2,-.35,4],[.55,3.25,-.35,3]].map(([x,y,z,f],i)=>{
    const q=gruppe(g,0,1.25,0); q.userData.lebendig=true; const r=.4;
    strich(q,[0,0,0],[x,y-1.25-r*1.15,z],.014,0xf4f4f4);
    ball(q,r,Z.BUNT[f],x,y-1.25,z,1,1.2,1); kegel(q,.08,.12,Z.BUNT[f],x,y-1.25-r*1.24,z); ball(q,.08,Z.WEISS,x-.17,y-1.25+.2,z+.32,.7,1.1,.4);
    verschmelze(q); return q; });
  const schleife=gruppe(g,0,1.2,.1); [-1,1].forEach(s=>{ const m=kegel(schleife,.13,.3,Z.ROT,s*.16,0,0); m.rotation.z=s*Math.PI/2; }); ball(schleife,.08,Z.ROT,0,0,0);
  k.anim.push(t=>teile.forEach((q,i)=>{ q.rotation.z=Math.sin(t*1.3+i*1.4)*.055; q.rotation.x=Math.sin(t*.9+i*2.1)*.04; }));
}
/* 4 Parkbank aus grünen Latten mit Eisenfüßen */
function parkbank(g){
  [-1.3,1.3].forEach(x=>{ strich(g,[x,0,.42],[x,.7,.34],.09,Z.EISEN); strich(g,[x,0,-.5],[x,.7,-.28],.09,Z.EISEN); strich(g,[x,.68,-.28],[x,1.78,-.55],.08,Z.EISEN);
    box(g,.16,.1,.9,Z.EISEN,x,.66,.02); const a=ring(g,.3,.06,Z.EISEN,x,.82,.14,Math.PI); a.rotation.y=Math.PI/2; box(g,.2,.09,.62,Z.HOLZ,x,1.13,.1); ball(g,.12,Z.EISEN,x,.07,.43,1,.6,1.3); });
  [-.2,.07,.34].forEach((z,i)=>box(g,3.0,.1,.23,i%2?BANK2:BANK,0,.76,z));
  [1.07,1.38,1.69].forEach((y,i)=>{ const m=box(g,3.0,.24,.09,i%2?BANK2:BANK,0,y,-.31-i*.075); m.rotation.x=-.24; });
  [-1.0,0,1.0].forEach(x=>[1.07,1.69].forEach(y=>ball(g,.04,Z.GOLD,x,y,y>1.5?-.4:-.25)));
}
/* 5 Zirkusschild mit gemaltem Zelt und blinkenden Lämpchen */
function zirkusschild(g,k){
  [-1.55,1.55].forEach(x=>{ walze(g,.12,3.2,Z.HOLZ2,x,1.6,-.14); ball(g,.2,Z.GOLD,x,3.35,-.14); box(g,.55,.16,.55,Z.HOLZ3,x,.08,-.14); });
  box(g,3.5,2.0,.16,Z.ROT,0,2.1,0);
  const bogen=gruppe(g,0,3.08,0); const o=walze(bogen,1,.16,Z.ROT,0,0,0); o.rotation.x=Math.PI/2; o.scale.set(1.2,.16,.55);
  const t=bild(512,288,c=>{
    c.fillStyle='#1f3a8a'; c.fillRect(0,0,512,288);
    c.fillStyle='#fff3b0'; [[60,50,20],[452,56,24],[110,120,12],[416,130,13],[256,30,15],[40,200,13],[476,205,12]].forEach(([x,y,r])=>{ c.beginPath(); for(let i=0;i<10;i++){ const a=i*Math.PI/5-Math.PI/2, d=i%2?r*.45:r; c.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d); } c.fill(); });
    c.fillStyle='#4aae52'; c.fillRect(0,250,512,38);
    c.fillStyle='#f4ecd8'; c.fillRect(150,160,212,92);
    c.fillStyle='#c8302a'; for(let i=0;i<5;i+=2) c.fillRect(150+i*42.4,160,42.4,92);
    for(let i=0;i<8;i++){ c.fillStyle=i%2?'#f4ecd8':'#c8302a'; c.beginPath(); c.moveTo(256,56); c.lineTo(120+i*34,162); c.lineTo(154+i*34,162); c.fill(); }
    c.fillStyle='#f4c430'; for(let i=0;i<8;i++){ c.beginPath(); c.arc(137+i*34,162,17,0,Math.PI); c.fill(); }
    c.fillStyle='#4a1414'; c.beginPath(); c.moveTo(220,252); c.quadraticCurveTo(256,150,292,252); c.fill();
    c.strokeStyle='#f4ecd8'; c.lineWidth=5; c.beginPath(); c.moveTo(256,58); c.lineTo(256,16); c.stroke(); c.fillStyle='#f4c430'; c.beginPath(); c.moveTo(258,16); c.lineTo(300,28); c.lineTo(258,40); c.fill();
    [[78,214,'#e86ab8'],[436,214,'#2ab8b0']].forEach(([x,y,f])=>{ c.fillStyle=f; c.beginPath(); c.arc(x,y,30,0,7); c.fill(); c.strokeStyle='#fff'; c.lineWidth=6; c.beginPath(); c.arc(x,y,17,.5,3.6); c.stroke(); });
  });
  Z.tafel(g,t,3.0,1.69,0,2.1,.095);
  [[0,2.99,3.2,.12],[0,1.21,3.2,.12],[-1.55,2.1,.12,1.8],[1.55,2.1,.12,1.8]].forEach(([x,y,w,h])=>box(g,w,h,.22,Z.GOLD,x,y,.02));
  Z.stern(g,0,3.34,.12,.26,Z.GELB);
  const a=basis(0xfff08a), b=basis(0xffa040), L=[];
  for(let i=0;i<=10;i++){ L.push([-1.65+i*.33,3.1]); L.push([-1.65+i*.33,1.1]); }
  for(let i=1;i<6;i++){ L.push([-1.65,1.1+i*.333]); L.push([1.65,1.1+i*.333]); }
  L.forEach(([x,y],i)=>{ ball(g,.07,(Math.round(x*3)+Math.round(y*3))%2?a:b,x,y,.15).castShadow=false; });
  const hell=new THREE.Color(0xfff6b0), warm=new THREE.Color(0xffa040);
  k.anim.push(t=>{ const u=.5+.5*Math.sin(t*3.5); a.color.copy(hell).multiplyScalar(.72+.3*u); b.color.copy(warm).multiplyScalar(1.02-.3*u); });
}
/* 6 Programmtafel: dunkelgrüne Tafel mit vier Bildern untereinander */
function programmtafel(g){
  [-1.2,1.2].forEach(x=>{ box(g,.18,2.9,.18,Z.HOLZ2,x,1.45,-.08); strich(g,[x,1.5,-.12],[x*1.08,.05,-.45],.07,Z.HOLZ2); box(g,.34,.1,.4,Z.HOLZ3,x,.05,-.06); });
  box(g,2.55,2.2,.12,Z.HOLZ,0,1.9,0);
  const t=bild(480,420,c=>{
    c.fillStyle='#24463a'; c.fillRect(0,0,480,420);
    const F=['#ff6a5a','#ffd84a','#6ac8ff','#8ae87a'];
    for(let i=0;i<4;i++){ const y=56+i*103;
      c.fillStyle=F[i]; c.beginPath(); c.arc(52,y,27,0,7); c.fill();
      c.strokeStyle='#f4ecd8'; c.lineWidth=5; c.beginPath(); c.moveTo(52,y-16); c.lineTo(52,y); c.lineTo(66,y+8); c.stroke();
      c.lineWidth=9; c.lineCap='round'; c.beginPath(); c.moveTo(235,y-13); c.lineTo(440,y-13); c.moveTo(235,y+17); c.lineTo(390-i*22,y+17); c.stroke();
      if(i<3){ c.lineWidth=2; c.beginPath(); c.moveTo(24,y+51); c.lineTo(456,y+51); c.stroke(); } }
    const x=160;
    c.fillStyle='#ff8ad8'; c.beginPath(); c.arc(x,56,29,0,7); c.fill(); c.strokeStyle='#ffd84a'; c.lineWidth=8; c.beginPath(); c.arc(x,56,18,.4,3.4); c.stroke();
    c.fillStyle='#f4ecd8'; c.fillRect(x-30,150,52,26); [-26,-12,4,16].forEach(a=>c.fillRect(x+a,170,7,25)); c.beginPath(); c.moveTo(x+8,158); c.lineTo(x+28,126); c.lineTo(x+46,140); c.lineTo(x+22,164); c.fill(); c.fillStyle='#c87a30'; c.beginPath(); c.arc(x-8,161,8,0,7); c.fill();
    c.strokeStyle='#f4ecd8'; c.lineWidth=5; c.beginPath(); c.moveTo(x-28,230); c.lineTo(x-28,282); c.moveTo(x+28,230); c.lineTo(x+28,282); c.stroke(); c.strokeStyle='#ff6a5a'; c.lineWidth=10; c.beginPath(); c.moveTo(x-34,282); c.lineTo(x+34,282); c.stroke(); c.fillStyle='#ffd8b0'; c.beginPath(); c.arc(x,253,11,0,7); c.fill(); c.fillStyle='#6ac8ff'; c.fillRect(x-10,263,20,18);
    c.fillStyle='#ffd84a'; c.beginPath(); for(let i=0;i<10;i++){ const a=i*Math.PI/5-Math.PI/2, d=i%2?15:34; c.lineTo(x+Math.cos(a)*d,365+Math.sin(a)*d); } c.fill();
  });
  Z.tafel(g,t,2.32,2.03,0,1.9,.07);
  [[0,2.98,2.65,.13],[0,.82,2.65,.13],[-1.24,1.9,.13,2.25],[1.24,1.9,.13,2.25]].forEach(([x,y,w,h])=>box(g,w,h,.2,Z.HELLHOLZ,x,y,.02));
  [-1,1].forEach(s=>{ const d=box(g,1.5,.12,.5,Z.BLAU2,s*.68,3.24,0); d.rotation.z=-s*.24; }); ball(g,.15,Z.GOLD,0,3.46,0);
  box(g,1.6,.08,.24,Z.HELLHOLZ,0,.76,.14); walze(g,.04,.26,Z.WEISS,-.4,.84,.16).rotation.z=Math.PI/2; walze(g,.04,.2,Z.ROSA,-.05,.84,.18).rotation.z=Math.PI/2; box(g,.3,.1,.14,Z.GELB,.45,.85,.16);
}
/* 7 Zuckerwattestand mit drehender Watte im Kessel */
function wattestand(g,k){
  box(g,2.5,1.1,1.3,Z.ROSA,0,.7,0); box(g,2.62,.12,1.42,Z.WEISS,0,1.3,0); box(g,2.56,.1,1.36,Z.WEISS,0,.2,0);
  [-.9,-.3,.3,.9].forEach(x=>box(g,.26,.98,.04,0xffc0e0,x,.72,.66));
  [-1,1].forEach(s=>{ ball(g,.17,Z.EISEN,s*1.0,.15,.5); ball(g,.17,Z.EISEN,s*1.0,.15,-.5); });
  Z.stern(g,0,.74,.7,.26,Z.GELB);
  /* Kessel */
  walze(g,.5,.08,Z.METALL2,.45,1.4,0); rohr(g,.78,.54,.42,mat(0xc8d0d8,{side:THREE.DoubleSide}),.45,1.62,0,24,true); ring(g,.78,.05,Z.METALL,.45,1.83,0).rotation.x=Math.PI/2; walze(g,.13,.34,Z.METALL2,.45,1.6,0);
  const w=gruppe(g,.45,1.72,0); w.userData.lebendig=true;
  for(let i=0;i<9;i++){ const a=i*.7; ball(w,.19,i%3?0xffc4e2:0xffe0f2,Math.cos(a)*.42,Math.sin(i*1.7)*.05,Math.sin(a)*.42,1.2,.65,1); } verschmelze(w);
  k.anim.push(t=>{ w.rotation.y=t*3; });
  /* Halter mit fertiger Zuckerwatte am Stiel */
  box(g,.9,.2,.4,Z.HOLZ,-.75,1.46,.2);
  [[-1.1,2.45,0xff9ad0,-.28],[-.72,2.75,0xa8dcff,0],[-.34,2.4,0xffc4e2,.3]].forEach(([x,y,f,n])=>{ strich(g,[x-n*.5,1.5,.2],[x,y-.2,.2],.03,Z.CREME);
    [[0,0,0,.28],[-.18,-.06,.04,.19],[.18,-.04,-.04,.2],[0,.22,0,.19],[.04,-.2,.06,.16]].forEach(([a,b,c,r])=>ball(g,r,f,x+a,y+b,.2+c)); });
  /* kleines gestreiftes Dach hinten */
  [-1.18,1.18].forEach(x=>walze(g,.055,1.95,Z.WEISS,x,2.3,-.58));
  box(g,2.6,.09,.09,Z.WEISS,0,3.26,-.58);
  for(let i=0;i<9;i++){ const x=-1.16+i*.29, f=i%2?Z.WEISS:Z.ROSA; const d=box(g,.29,.07,.8,f,x,3.33,-.46); d.rotation.x=.3; ball(g,.15,f,x,3.18,-.08,1,.85,.3); }
}
/* 8 Litfaßsäule mit bunten Plakaten */
function litfass(g,k){
  walze(g,.95,.34,LAUB3,0,.17,0); ring(g,.86,.07,Z.GOLD,0,.38,0).rotation.x=Math.PI/2;
  const t=bild(1024,512,c=>{
    c.fillStyle='#e8dcc0'; c.fillRect(0,0,1024,512);
    const F=['#f4c430','#3a8ae0','#e86ab8','#4aae52','#f4ecd8','#7a3ac8','#f08a30','#2ab8b0'];
    for(let i=0;i<4;i++){ for(let j=0;j<2;j++){ const x=i*256+14+j*10, y=j*250+14+(i%2)*6, f=F[(i+j*4)%8], n=(i*2+j+(i>1?1:0))%4;
      c.fillStyle=f; c.fillRect(x,y,222,226); c.strokeStyle='#8a2418'; c.lineWidth=6; c.strokeRect(x+8,y+8,206,210);
      const mx=x+111, my=y+113;
      if(n===0){ for(let s=0;s<6;s++){ c.fillStyle=s%2?'#fff':'#c8302a'; c.beginPath(); c.moveTo(mx,my-78); c.lineTo(mx-84+s*28,my+4); c.lineTo(mx-56+s*28,my+4); c.fill(); } c.fillStyle='#c8302a'; c.fillRect(mx-66,my+4,132,66); c.fillStyle='#fff'; c.beginPath(); c.moveTo(mx-24,my+70); c.lineTo(mx,my+14); c.lineTo(mx+24,my+70); c.fill(); }
      else if(n===1){ c.fillStyle='#ffd8b0'; c.beginPath(); c.arc(mx,my,52,0,7); c.fill(); c.fillStyle='#e85a1e'; [[-62,-8],[62,-8],[-52,-38],[52,-38]].forEach(([a,b])=>{ c.beginPath(); c.arc(mx+a,my+b,24,0,7); c.fill(); }); c.fillStyle='#e8281e'; c.beginPath(); c.arc(mx,my+6,15,0,7); c.fill(); c.fillStyle='#20140e'; c.beginPath(); c.arc(mx-18,my-14,7,0,7); c.arc(mx+18,my-14,7,0,7); c.fill(); c.strokeStyle='#a83a30'; c.lineWidth=7; c.beginPath(); c.arc(mx,my+14,22,.3,2.85); c.stroke(); c.fillStyle='#2a7a30'; c.beginPath(); c.moveTo(mx-30,my-46); c.lineTo(mx+8,my-96); c.lineTo(mx+30,my-46); c.fill(); }
      else if(n===2){ c.fillStyle='#fff6d0'; c.beginPath(); for(let s=0;s<10;s++){ const a=s*Math.PI/5-Math.PI/2, d=s%2?34:82; c.lineTo(mx+Math.cos(a)*d,my+Math.sin(a)*d); } c.fill(); c.strokeStyle='#c8302a'; c.lineWidth=7; c.stroke(); }
      else { [['#c8302a',-46,22],['#3a8ae0',46,22],['#f4c430',0,-44]].forEach(([b,a,d])=>{ c.fillStyle=b; c.beginPath(); c.arc(mx+a,my+d,36,0,7); c.fill(); c.strokeStyle='#fff'; c.lineWidth=6; c.beginPath(); c.arc(mx+a,my+d,22,3.4,4.9); c.stroke(); }); } } }
  });
  const m=new THREE.Mesh(new THREE.CylinderGeometry(.78,.78,2.5,28,1,true),new THREE.MeshLambertMaterial({map:t})); m.position.y=1.65; m.rotation.y=.4; m.castShadow=true; g.add(m);
  walze(g,.88,.2,LAUB3,0,3.0,0); ring(g,.88,.07,Z.GOLD,0,3.12,0).rotation.x=Math.PI/2;
  rohr(g,.5,1.04,.34,LAUB2,0,3.28,0,24); ball(g,.54,LAUB2,0,3.42,0,1,.62,1); walze(g,.07,.32,Z.GOLD,0,3.84,0); ball(g,.16,Z.GOLD,0,4.04,0);
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(g,.09,Z.GOLD,Math.cos(a)*.99,3.1,Math.sin(a)*.99); }
  verschmelze(g); k.verdecker(g,9,-1.5,.9);
}

const verstecke=[[-16.3,-7.1],[-10.4,-6.6],[-15.8,3.6],[-15,9],[-10.6,9.6],[-6.4,11.8],[-12,-.6],[-2.2,-7],[2.8,-7],[9.2,-6.8],[10,-12.2],[15.8,-8.6],[16,1],[9.6,1.8],[15.6,9],[9.2,11],[4.4,12.2],[.2,5.8],[-5,2.6],[4,-11.2]];
const gegenstaende=[
  { x:-14.2, z:-.8, dreh:.45, steh:[-12.4,1.5], kasten:[2.9,2.6], treffer:[2.9,4.2,2.4], baue:kasse },
  { x:12.8, z:-5, dreh:-.25, steh:[12.2,-2.8], kasten:[3.5,2.2], treffer:[3.5,3.5,1.9], baue:popcornwagen },
  { x:-8.8, z:5.2, steh:[-7.8,6.9], r:.75, treffer:[2.4,3.9,1.7], baue:ballons },
  { x:6.8, z:6, dreh:-.15, steh:[6.5,7.9], kasten:[3.2,1.5], treffer:[3.2,2,1.4], baue:parkbank },
  { x:.4, z:-10.4, steh:[.4,-8.5], kasten:[3.8,.9], treffer:[3.8,3.8,.9], baue:zirkusschild },
  { x:6.7, z:-10, steh:[6.5,-8.1], kasten:[3,1.1], treffer:[3,3.6,1], baue:programmtafel },
  { x:12.8, z:4.4, dreh:-.2, steh:[11.8,6.5], kasten:[2.9,2], treffer:[2.9,3.5,1.7], baue:wattestand },
  { x:9, z:-1.5, steh:[9,.4], r:.98, treffer:[2,4.2,2], baue:litfass },
  Object.assign({ x:-7.2, z:-2.8, steh:[-7.2,-.8] }, Z.NEU.drehorgel),
  Object.assign({ x:-13.4, z:-9.8, steh:[-13,-7.5] }, Z.NEU.zirkuswagen)
];

function baue(k){
  grund(k);
  himmelsleben(k);
  zaeune(k);
  const tuer=zirkustor(k);
  zelte(k);
  ferne(k);
  ausstattung(k);
  gaeste(k);
  leben(k);
  return { tuer, start:[-1,3.2] };
}
return { titel:'Der Vorplatz', himmel:NACHT, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Schlussbild Zirkus: die Abendvorstellung in der Manege. Der rotgoldene Vorhang geht auf, Pony Pünktchen kommt heraus und
   läuft eine Runde, Clownin Lulu winkt, die Artistin schwingt am Trapez, das Publikum klatscht, die Spielfigur jubelt,
   dazu Scheinwerfer, Lichterketten und Konfetti. Ohne Schrift. */
FINALE3D.zirkus = function(k,kamera,figur){
  const sc=k.scene, Z=ZIRKUS;
  if(!k.anim) k.anim=[];
  sc.background=new THREE.Color(0x1a0c18);
  sc.add(new THREE.HemisphereLight(0xffecd4,0x6a3c48,.66));
  const licht=new THREE.DirectionalLight(0xffe4bc,.46); licht.position.set(-6,16,11); licht.castShadow=true; licht.shadow.mapSize.set(1024,1024);
  const sk=licht.shadow.camera; sk.left=-14; sk.right=14; sk.top=13; sk.bottom=-11; sk.near=1; sk.far=44; licht.shadow.bias=-.001; sc.add(licht);
  const buehnenLicht=new THREE.PointLight(0xffc860,.7,14,1.5); buehnenLicht.position.set(0,4.5,-7.4); sc.add(buehnenLicht);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D(), FARBE=new THREE.Color();
  const BUNT=[0xff4f6e,0xffc21a,0x2fb4ff,0x3fd07a,0xb264ec,0xff8a30];
  const schattenFleck=(r,x,z,sx)=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(r,20),basis(0x000000,{transparent:true,opacity:.22,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.set(x,.02,z); m.scale.x=sx||1; sc.add(m); return m; };

  /* Maße: Mitte und Halbachsen der Runde, Ebene des Vorhangs */
  const MZ=-1.4, RX=4.9, RZ=3.2, VZ=-6.4;

  /* ---------- Zelt: runde Wand und Dach ---------- */
  const wand=Z.zeltrund(sc,0,0,8,26,8.2,56,Z.ROT,Z.CREME); verschmelze(wand); Z.ohneSchatten(wand);
  const dach=Z.zeltdach(sc,0,8.2,8,26,15,56,Z.ROT2,0xd8b890,false); verschmelze(dach); Z.ohneSchatten(dach);

  /* ---------- Sandboden mit Manegenrand (vorn und vor dem Vorhang offen) ---------- */
  const sand=Z.kornBild('#c89050',['rgba(255,230,180,.45)','rgba(120,70,25,.28)','rgba(240,200,130,.4)']); sand.wrapS=sand.wrapT=THREE.RepeatWrapping; sand.repeat.set(12,12);
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(76,76),new THREE.MeshLambertMaterial({map:sand})); boden.rotation.x=-Math.PI/2; boden.receiveShadow=true; sc.add(boden);
  const rand=gruppe(sc,0,0,0), ARX=8.5, ARZ=5.6, AMZ=-1, NR=44;
  for(let i=0;i<NR;i++){ const a=(i+.5)*Math.PI*2/NR, b=a+.01, x=Math.cos(a)*ARX, z=AMZ+Math.sin(a)*ARZ;
    if(Math.abs(x)<5.2) continue;
    const tx=-Math.sin(b)*ARX, tz=Math.cos(b)*ARZ, L=Math.hypot(tx,tz)*Math.PI*2/NR, q=gruppe(rand,x,0,z); q.rotation.y=Math.atan2(-tz,tx);
    box(q,L+.04,.42,.46,i%2?Z.CREME:Z.ROT,0,.21,0); box(q,L+.04,.07,.54,Z.GOLD,0,.45,0); }
  verschmelze(rand);
  Z.halme(sc,0,MZ,7,260);
  [[-7,-3.4,Z.BLAU],[7,-3.4,Z.TUERKIS]].forEach(([x,z,c])=>{ const g=gruppe(sc,0,0,0); Z.podest(g,x,z,.75,.8,c); verschmelze(g); });

  /* ---------- Glitzerbühne hinter dem Vorhang ---------- */
  const glitzer=bild(512,384,g=>{ const v=g.createRadialGradient(256,260,10,256,260,330); v.addColorStop(0,'#fff0b0'); v.addColorStop(.25,'#f0a04a'); v.addColorStop(.6,'#7a2a8a'); v.addColorStop(1,'#241450'); g.fillStyle=v; g.fillRect(0,0,512,384);
    g.fillStyle='rgba(255,240,180,.17)'; for(let i=0;i<16;i++){ const a=i*Math.PI/8; g.beginPath(); g.moveTo(256,260); g.lineTo(256+Math.cos(a)*420,260+Math.sin(a)*420); g.lineTo(256+Math.cos(a+.17)*420,260+Math.sin(a+.17)*420); g.fill(); }
    g.fillStyle='#fff8d8'; for(let i=0;i<46;i++){ const x=zufall()*500+6, y=zufall()*250+6, r=3+zufall()*7; g.beginPath(); for(let j=0;j<8;j++){ const a=j*Math.PI/4, d=j%2?r*.3:r; g.lineTo(x+Math.cos(a)*d,y+Math.sin(a)*d); } g.fill(); } });
  const hinten=new THREE.Mesh(new THREE.PlaneGeometry(10.6,7.2),new THREE.MeshBasicMaterial({map:glitzer})); hinten.position.set(0,3.6,-8.9); sc.add(hinten);
  const rahmen=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{
    box(rahmen,.3,7.2,2.5,Z.ROT2,s*5.25,3.6,-7.65);
    walze(rahmen,.3,6.9,Z.GOLD,s*4.75,3.45,VZ+.15); walze(rahmen,.5,.4,Z.ROT2,s*4.75,.2,VZ+.15);
    for(let y=.9;y<6.5;y+=.7) Z.liegend(ring(rahmen,.31,.07,Z.ROT,s*4.75,y,VZ+.15));
    ball(rahmen,.42,Z.GOLD,s*4.75,7.15,VZ+.15); });
  box(rahmen,9.8,.5,.5,Z.ROT2,0,6.75,VZ+.1); box(rahmen,10,.14,.62,Z.GOLD,0,7.05,VZ+.1);
  Z.volant(rahmen,-4.5,4.5,6.55,VZ+.42,Z.ROT,Z.GELB);
  Z.stern(rahmen,0,7.45,VZ+.5,.75,Z.GOLD); Z.stern(rahmen,0,7.45,VZ+.52,.4,Z.GELB);
  [-1,1].forEach(s=>Z.stern(rahmen,s*2.4,7.32,VZ+.45,.34,Z.CREME));
  verschmelze(rahmen);
  const vorhaenge=[-1,1].map(s=>{ const g=Z.vorhang(sc,s*2.25,0,VZ,4.5,6.5); verschmelze(g); return { g, s }; });
  const glanz=schein(sc,'rgba(255,210,110,.6)',0,2.6,-8.4,7);

  /* ---------- Masten ---------- */
  const masten=gruppe(sc,0,0,0);
  [-9.4,9.4].forEach(x=>{ walze(masten,.4,.34,Z.HOLZ2,x,.17,-3); walze(masten,.17,11,Z.BLAU,x,5.5,-3);
    for(let y=.7;y<10.5;y+=.6){ const r=Z.liegend(ring(masten,.175,.04,Z.CREME,x,y,-3)); r.rotation.y=.35; }
    ball(masten,.26,Z.GOLD,x,7.9,-3); });
  verschmelze(masten);

  /* ---------- Zuschauerbänke und Publikum ---------- */
  const baenke=gruppe(sc,0,0,0), plaetze=[], REIHEN=6;
  for(let r=0;r<REIHEN;r++){
    const rx=10.4+r*1.35, rz=7.2+r*1.2, y=.55+r*.62, n=Math.round((rx+rz)*1.9);
    const punkt=a=>[Math.cos(a)*rx,MZ+Math.sin(a)*rz];
    for(let i=0;i<n;i++){ const a=-Math.PI*1.1+(i+.5)*Math.PI*1.2/n, [x,z]=punkt(a);
      if(Math.abs(x)<6.2) continue;
      const tx=-Math.sin(a)*rx, tz=Math.cos(a)*rz, L=Math.hypot(tx,tz)*Math.PI*1.2/n, dreh=Math.atan2(-tz,tx);
      const q=gruppe(baenke,x,0,z); q.rotation.y=dreh;
      box(q,L+.1,.14,.8,Z.HELLHOLZ,0,y,0); box(q,L+.1,y,.1,r%2?Z.BLAU2:Z.ROT2,0,y/2,.38);
      /* Blick zur Mitte der Manege und etwas zum Betrachter */
      plaetze.push({ x:x+(zufall()-.5)*.18, y:y+.07, z, dreh:Math.atan2(-x*.8,3-z), p:zufall()*6.28, g:.9+zufall()*.22 }); } }
  verschmelze(baenke); Z.ohneSchatten(baenke);
  const NP=plaetze.length;
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; sc.add(t); return t; };
  const weiss=()=>new THREE.MeshLambertMaterial({color:0xffffff});
  /* grobe Formen, damit das große Publikum wenig Dreiecke braucht */
  const RUND=new THREE.SphereGeometry(1,8,6), KLEIN=new THREE.SphereGeometry(1,5,4), STAB=new THREE.CylinderGeometry(1,1,1,6,1,true);
  const leiber=menge(RUND,weiss(),NP), koepfe=menge(RUND,weiss(),NP), haare=menge(RUND,weiss(),NP), augen=menge(KLEIN,basis(0x1c120c),NP*2), haende=menge(KLEIN,weiss(),NP*2), arme=menge(STAB,weiss(),NP*2);
  const KLEID=[0xe8413a,0xf4c430,0x3aa0e8,0x5ac85a,0xe86ab8,0x8a5ad8,0xf08a30,0x2ab8b0], TEINT=[0xf1c7a0,0xe0a878,0xb87a4c,0x8a5430,0xf6d4b4], SCHOPF=[0x2a1a10,0x6a3c18,0xc89038,0xa8481c,0x181414,0xb8b0a8];
  plaetze.forEach((p,i)=>{ const c=KLEID[(i*5+(i>>3))%KLEID.length], h=TEINT[(i*3+(i>>2))%TEINT.length];
    leiber.setColorAt(i,FARBE.set(c)); koepfe.setColorAt(i,FARBE.set(h)); haare.setColorAt(i,FARBE.set(SCHOPF[(i*7+(i>>4))%SCHOPF.length]));
    [0,1].forEach(j=>{ haende.setColorAt(i*2+j,FARBE.set(h)); arme.setColorAt(i*2+j,FARBE.set(c)); }); });
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  const publikum=t=>{
    plaetze.forEach((p,i)=>{ const jubel=weich((t-1.2-(p.p%1)*.5)/.5), hoch=jubel*Math.max(0,Math.sin(t*5+p.p))*.14, g=p.g, c=Math.cos(p.dreh), s=Math.sin(p.dreh);
      /* Teil an der Stelle (seitlich a, oben b, vorn v) relativ zur sitzenden Person */
      const an=(m,j,a,b,v,sx,sy,sz,rz)=>setze(m,j,p.x+(a*c+v*s)*g,p.y+hoch+b*g,p.z+(-a*s+v*c)*g,sx*g,sy*g,sz*g,0,p.dreh,rz);
      an(leiber,i,0,.4,0,.31,.44,.26); an(koepfe,i,0,1.0,0,.25,.25,.25); an(haare,i,0,1.1,-.06,.265,.21,.25);
      const winkt=i%3===0, klatsch=Math.abs(Math.sin(t*9+p.p))*.13;
      [-1,1].forEach((v,j)=>{
        const hx=winkt?v*(.5+Math.sin(t*6+p.p)*.08*jubel):v*misch(.26,.05+klatsch,jubel), hy=winkt?misch(.3,1.15,jubel):misch(.3,.62,jubel), hv=winkt?.08:.34;
        an(haende,i*2+j,hx,hy,hv,.085,.085,.085);
        const sx=v*.24, sy=.58, dx=hx-sx, dy=hy-sy, l=Math.hypot(dx,dy,hv);
        o.position.set(p.x+((sx+hx)/2*c+hv/2*s)*g,p.y+hoch+(sy+hy)/2*g,p.z+(-(sx+hx)/2*s+hv/2*c)*g); o.scale.set(.06*g,l*g,.06*g);
        o.quaternion.setFromUnitVectors(V(0,1,0),V(dx*c+hv*s,dy,-dx*s+hv*c).normalize()); o.updateMatrix(); arme.setMatrixAt(i*2+j,o.matrix); });
      [-1,1].forEach((v,j)=>an(augen,i*2+j,v*.085,1.01,.23,.032,.036,.025)); });
    [leiber,koepfe,haare,augen,haende,arme].forEach(m=>{ m.instanceMatrix.needsUpdate=true; });
  };

  /* ---------- Lichterketten und Wimpel unter dem Dach ---------- */
  Z.lichterkette(k,sc,[[[-18,6.8,-4],[-9.4,7.9,-3],.8,14],[[-9.4,7.9,-3],[-4.8,7.4,VZ+.2],.6,9],[[4.8,7.4,VZ+.2],[9.4,7.9,-3],.6,9],[[9.4,7.9,-3],[18,6.8,-4],.8,14],
    [[-4.8,7.4,VZ],[0,8.7,-7],.2,8],[[0,8.7,-7],[4.8,7.4,VZ],.2,8]],{gr:.13});
  Z.wimpel(sc,[[[-20,8,-12],[-6,8.4,-14],1,16],[[-6,8.4,-14],[6,8.4,-14],1,14],[[6,8.4,-14],[20,8,-12],1,16]]);

  /* ---------- Trapez: die Artistin schwingt groß vor der offenen Glitzerbühne ---------- */
  const AG=1.35;
  const flug=Z.trapez(k,sc,-2.3,11,-1.2,7.1,{ artistin:'sitzt', breite:1.2*AG, schwung:.17, phase:.4, farbe:Z.TUERKIS });
  const flugFigur=flug.figur;
  flugFigur.g.scale.setScalar(AG); flugFigur.g.position.y=-.58*AG;
  k.anim.push(t=>{ flugFigur.armR.rotation.z=2.45+Math.sin(t*6.5)*.45; });

  /* ---------- Clownin Lulu und Spielfigur ---------- */
  const LX=-5.5, LZ=1.2, FX=5.5, FZ=1.3;
  const lulu=Z.clownin(k,sc,LX,LZ,.35,{ winkt:true }); lulu.g.scale.setScalar(1.22);
  schattenFleck(.65,LX,LZ);
  const u=figur.userData, FS=1.32;
  figur.position.set(FX,0,FZ); figur.scale.set(FS,FS,FS); sc.add(figur);

  /* ---------- Pony Pünktchen ---------- */
  const pony=Z.pony(k,sc,0,-7,-Math.PI/2,1.04,{ laeuft:true });
  const ponyFleck=schattenFleck(.55,0,-7,2.1);

  /* ---------- Scheinwerfer ---------- */
  Z.lichtkegel(sc,LX,10,LZ,1.35,0xffd8f0); Z.lichtkegel(sc,FX,10,FZ,1.35,0xd0ecff);
  const folge=Z.lichtkegel(sc,0,10,MZ+RZ,1.8,0xfff0b0);

  /* ---------- Konfetti und Funkeln ---------- */
  const NK=170, konfetti=menge(GEO.box,basis(0xffffff),NK), kd=[];
  for(let i=0;i<NK;i++){ kd.push({ x:(zufall()*2-1)*(i%4?8:13), y:zufall()*7.4, z:-4.5+zufall()*7.5, v:.55+zufall()*.6, p:zufall()*6.28, g:.8+zufall()*.5 });
    konfetti.setColorAt(i,FARBE.set(BUNT[i%6])); }
  const NF=30, funkeln=menge(new THREE.OctahedronGeometry(1,0),basis(0xfff2a0),NF), fd=[];
  for(let i=0;i<NF;i++) fd.push({ x:(zufall()*2-1)*6.4, y:2.8+zufall()*4, z:-5.6+zufall()*3, p:zufall()*6.28 });

  /* ---------- Kamera ---------- */
  const NEIG=.17, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=2.9;
  /* kleinster Abstand, bei dem Lulu, Spielfigur, Runde, Artistin und Vorhang im Bild sind */
  const WICHTIG=[[LX-1,0,LZ],[LX-1,3.2,LZ],[FX+1,0,FZ],[FX+1,3.5,FZ],[0,-.1,3.3],[-3.6,6.5,-.2],[-4.9,7.6,VZ],[4.9,7.6,VZ],[0,8.1,VZ],[-RX-1.4,2.6,MZ],[RX+1.4,2.6,MZ]];
  const abstand=(a,tn)=>WICHTIG.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
    return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },9);

  /* Zeitplan in Sekunden: nach etwa 6 s ist alles Wichtige geschehen */
  const AUF=.3, HERAUS=1.1, RUNDE=2.05, DA=5.5, ENDE=6.0;
  const HALB=-Math.PI/2, VORN=Math.PI/2; /* HALB: Blick nach vorn; VORN: Bahnwinkel vorn in der Mitte */
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), d=abstand(a,tn);
    const wippen=Math.sin(t*.22)*.2*weich((t-ENDE)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);

    /* Vorhang geht auf und rafft sich zu beiden Seiten */
    const auf=weich((t-AUF)/1.3);
    vorhaenge.forEach(v=>{ v.g.position.x=v.s*misch(2.25,3.9,auf); v.g.scale.x=misch(1,.28,auf)*(1+Math.sin(t*6)*.015*auf*(1-weich((t-2)/1.5))); });
    const gw=7*(.7+.3*auf)+Math.sin(t*2)*.25; glanz.scale.set(gw,gw,1);
    buehnenLicht.intensity=.15+.6*auf;

    /* Pony: aus dem Vorhang nach vorn, eine Runde durch die Manege, am Ende vorn in der Mitte Verbeugung */
    const raus=weich((t-HERAUS)/(RUNDE-HERAUS));
    const r=Math.min(1,Math.max(0,(t-RUNDE)/(DA-RUNDE))), e=.45*r+.55*weich(r), w=VORN+e*Math.PI*2;
    const px=Math.cos(w)*RX, pz=t<RUNDE?misch(-7.1,MZ+RZ,raus):MZ+Math.sin(w)*RZ;
    const bahn=Math.atan2(-Math.cos(w)*RZ,-Math.sin(w)*RX);
    const einbiegen=weich((t-RUNDE+.15)/.5), schluss=weich((t-DA+.15)/.6);
    const diff=Math.atan2(Math.sin(bahn-HALB),Math.cos(bahn-HALB));
    let dreh=HALB+diff*einbiegen;
    dreh+=Math.atan2(Math.sin(-2.5-dreh),Math.cos(-2.5-dreh))*schluss;
    const lauf=weich((t-HERAUS)/.25)*(1-weich((t-DA+.35)/.45));
    pony.g.visible=ponyFleck.visible=t>HERAUS;
    pony.g.position.set(t<RUNDE?0:px,Math.abs(Math.sin(t*12))*.16*lauf,pz); pony.g.rotation.y=dreh;
    ponyFleck.position.set(pony.g.position.x,.025,pz); ponyFleck.rotation.z=dreh;
    pony.beine.forEach((b,i)=>{ b.rotation.z=misch(0,Math.sin(t*12+[0,3.14,3.14,0][i])*.55,lauf); });
    const knicks=weich((t-DA-.1)/.4)*(.5-.5*Math.cos(Math.max(0,t-DA-.1)*3.6));
    pony.hals.rotation.z=Math.sin(t*(lauf>.5?12:1.3))*.07-.5*knicks;
    /* das linke Vorderbein winkt nach der Runde */
    pony.beine[0].rotation.z+=schluss*Math.max(0,Math.sin((t-DA)*3.6))*.65;
    folge.kegel.position.set(pony.g.position.x,5,pz); folge.fleck.position.set(pony.g.position.x,.035,pz);
    folge.kegel.visible=folge.fleck.visible=t>HERAUS;

    /* Spielfigur: schaut zum Vorhang, dreht sich nach vorn und jubelt */
    const staunt=weich(t/.6)*(1-weich((t-2.2)/.6)), jubel=weich((t-2.3)/.5);
    figur.rotation.y=-2.2*staunt-.28*jubel+Math.sin(t*1.3)*.12*jubel;
    u.armL.rotation.z=misch(-.18,-2.45+Math.sin(t*8+1.5)*.3,jubel);
    u.armR.rotation.z=misch(.18,2.45+Math.sin(t*8)*.3,jubel);
    u.beinL.rotation.x=u.beinR.rotation.x=0;
    u.koerper.position.y=Math.abs(Math.sin(t*4.6))*.22*jubel;
    u.koerper.rotation.z=Math.sin(t*2.3)*.04*jubel;

    publikum(t);

    /* Konfetti fällt von oben, sobald der Vorhang offen ist, dazu Funkeln */
    const AB=AUF+1.1;
    konfetti.visible=funkeln.visible=t>AB;
    if(konfetti.visible){
      const los=weich((t-AB)/1.4);
      kd.forEach((f,i)=>{ const fall=(t-AB)*f.v*1.5, start=8.6+f.y*.45;
        /* erst von oben herein, danach gleichmäßig in der Luft */
        const hy=start-fall>.1?start-fall:.1+((((start-fall-.1)%8.4)+8.4)%8.4);
        const g=f.g*weich((8.5-hy)/.6+(start-fall>.1?1:0))*weich(hy/.25);
        setze(konfetti,i,f.x+Math.sin(t*1.6+f.p)*.3,hy,f.z,.11*g,.16*g,.012*g,t*2.6+f.p,t*1.7+f.p*2,Math.sin(t*2+f.p)); });
      konfetti.instanceMatrix.needsUpdate=true;
      fd.forEach((f,i)=>{ const g=.012+.07*Math.pow(Math.max(0,Math.sin(t*2.6+f.p)),4)*los;
        setze(funkeln,i,f.x+Math.sin(t*.5+f.p)*.2,f.y+Math.sin(t*.8+f.p*2)*.25,f.z,g,g*1.5,g,0,t+f.p,0); });
      funkeln.instanceMatrix.needsUpdate=true; }
  };
};

