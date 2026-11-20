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