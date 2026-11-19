document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-anker\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"0\" cy=\"-13\" r=\"4\"/><path d=\"M0 -9V16M-8 -3H8M-15 4Q-13 16 0 16Q13 16 15 4M-15 4L-18 9M-15 4L-10 6M15 4L18 9M15 4L10 6\"/></g></symbol>\n<symbol id=\"sym-steuerrad\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><circle r=\"10\"/><path d=\"M0 -17V17M-17 0H17M-12 -12L12 12M12 -12L-12 12\"/></g><circle r=\"3.5\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-papagei\" viewBox=\"-20 -20 40 40\"><path d=\"M-1 -16Q8 -17 10 -11Q17 -12 15 -4Q14 -1 12 -4Q11 -7 9 -7Q10 2 3 9L-1 19H-7L-4 10Q-11 3 -9 -6Q-8 -14 -1 -16ZM1 -11a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0Z\" fill=\"currentColor\" fill-rule=\"evenodd\"/></symbol>\n<symbol id=\"sym-muschel\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M0 13L-15 -2Q-15 -15 0 -15Q15 -15 15 -2Z\"/><path d=\"M0 13L-8 -13M0 13V-15M0 13L8 -13M-6 13V17H6V13\"/></g></symbol>\n<symbol id=\"sym-schatzkarte\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-17 -12L-6 -15L6 -12L17 -15V12L6 15L-6 12L-17 15Z\"/><path d=\"M-4 -4L4 4M4 -4L-4 4\" stroke-width=\"3.5\"/></g></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.32)"/>`;
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l}" stop-opacity=".5"/><stop offset="1" stop-color="${l}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
function steine(x0,x1,y0,y1,h,w,f){let d='';for(let y=y0,r=0;y<y1;y+=h,r++){d+=`M${x0} ${y}H${x1}`;for(let x=x0+(r%2)*w/2;x<x1;x+=w)d+=`M${x} ${y}V${Math.min(y+h,y1)}`;}return`<path d="${d}" stroke="${f}" stroke-width="2" fill="none"/>`;}
const wand=(f,h,w)=>`<rect width="1600" height="470" fill="${f}"/>${steine(0,1600,40,470,h,w,'rgba(0,0,0,.28)')}`;
function boden(){let d='';for(let x=-1600;x<=3200;x+=100)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[500,560,640,730])d+=`M0 ${y}H1600`;return`<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="${d}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;}
const balken=(xs,f)=>xs.map(x=>`<rect x="${x-16}" y="0" width="32" height="470" fill="${f}"/><rect x="${x+10}" y="0" width="6" height="470" fill="rgba(0,0,0,.3)"/>`).join('')+`<rect width="1600" height="36" fill="${f}"/><rect y="36" width="1600" height="6" fill="rgba(0,0,0,.3)"/>`;
function bullauge(x,y,r,h,m){let n='';for(let k=0;k<8;k++){const a=k*Math.PI/4;n+=`<circle cx="${(x+Math.cos(a)*(r+6)).toFixed(1)}" cy="${(y+Math.sin(a)*(r+6)).toFixed(1)}" r="2.5" fill="#6b4a1c"/>`;}
return`<circle cx="${x}" cy="${y}" r="${r+12}" fill="#c9962e" stroke="#6b4a1c" stroke-width="3"/><circle cx="${x}" cy="${y}" r="${r}" fill="${h}"/><path d="M${x-r} ${y+4}A${r} ${r} 0 0 0 ${x+r} ${y+4}Z" fill="${m}"/><path d="M${x-r*.6} ${y-r*.4}Q${x-r*.3} ${y-r*.75} ${x+r*.1} ${y-r*.75}" stroke="#fff" stroke-width="4" opacity=".5" fill="none" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#6b4a1c" stroke-width="4"/>${n}`;}
const lampe=(x,y,c)=>`<g transform="translate(${x} ${y})"><circle r="7" fill="none" stroke="#333" stroke-width="3"/><path d="M-16 18L0 5L16 18Z" fill="#333"/><rect x="-14" y="18" width="28" height="40" rx="4" fill="${c||'#ffd27a'}" stroke="#333" stroke-width="3"/><path d="M-5 18V58M5 18V58" stroke="#333" stroke-width="2"/><path d="M0 28Q7 40 0 50Q-7 40 0 28Z" fill="#ff8a1a"/><rect x="-18" y="58" width="36" height="7" fill="#333"/></g>`;
const laterne=(x,l,c)=>`<circle cx="${x}" cy="${l+40}" r="150" fill="url(#licht)"/><path d="M${x} 0V${l}" stroke="#2a1a0a" stroke-width="3"/>${lampe(x,l+4,c)}`;
const matte=(w,f)=>`<path d="M${-w} 0L${40-w} 26M${w} 0L${w-40} 26M${-w} 0L${40-w} 52M${w} 0L${w-40} 52" stroke="#c9b48a" stroke-width="2.5"/><path d="M${36-w} 26Q0 90 ${w-36} 26L${w-40} 52Q0 120 ${40-w} 52Z" fill="${f}" stroke="#6b5a3a" stroke-width="2"/><path d="M${38-w} 39Q0 105 ${w-38} 39" stroke="#a33b22" stroke-width="5" fill="none"/><circle cx="${-w}" r="6" fill="none" stroke="#333" stroke-width="3"/><circle cx="${w}" r="6" fill="none" stroke="#333" stroke-width="3"/>`;
const truhe=(f,b)=>`${schatten(66,4)}<rect x="-60" y="-62" width="120" height="60" fill="${f}" stroke="#2a1608" stroke-width="3"/><path d="M-60 -62Q0 -96 60 -62Z" fill="${f}" stroke="#2a1608" stroke-width="3"/><path d="M-38 -2V-70M38 -2V-70M-60 -40H60" stroke="${b}" stroke-width="6"/><rect x="-10" y="-52" width="20" height="20" rx="3" fill="${b}" stroke="#2a1608"/><circle cx="0" cy="-43" r="3" fill="#2a1608"/>`;
const kasten=(w,h)=>`<rect x="${-w/2}" y="${-h}" width="${w}" height="${h}" fill="#a87a44" stroke="#4a2a12" stroke-width="3"/><path d="M${-w/2} ${-h/2}H${w/2}M${8-w/2} ${-h}V0M${w/2-8} ${-h}V0" stroke="#6b4a24" stroke-width="5"/>`;
const sack=(f,ex)=>`${schatten(46,4)}<path d="M-40 -2Q-52 -60 -24 -92L-14 -100H14L24 -92Q52 -60 40 -2Z" fill="${f}" stroke="#6b5a3a" stroke-width="3"/><path d="M-16 -100L-10 -114Q0 -120 10 -114L16 -100Z" fill="${f}" stroke="#6b5a3a" stroke-width="2"/><path d="M-17 -97H17" stroke="#8a5a2a" stroke-width="5"/>${ex}`;
const zwiebel=(x,y)=>`<circle cx="${x}" cy="${y}" r="12" fill="#c8742a" stroke="#7a3a10" stroke-width="2"/><path d="M${x} ${y-12}l-3 -8" stroke="#7a3a10" stroke-width="2"/>`;
const zopf=x=>`<path d="M${x} 36V200" stroke="#c9a060" stroke-width="4"/>${[0,1,2,3,4,5].map(k=>zwiebel(x+(k%2?9:-9),84+k*20)).join('')}`;
const GF=['#c0392b','#e8a33a','#3f8a3a','#8a4a2a','#d8c040'];
const seemannskiste=()=>`${truhe('#3a5a8a','#c9a26a')}<path d="M-60 -46Q-74 -38 -60 -28M60 -46Q74 -38 60 -28" stroke="#c9b48a" stroke-width="5" fill="none"/><use href="#sym-anker" x="-30" y="-36" width="22" height="22" color="#f4ead0"/>`;
const sturmlaterne=()=>`${schatten(28,4)}<circle cx="0" cy="-60" r="80" fill="url(#licht)"/><g transform="translate(0 -104) scale(1.6)">${lampe(0,0)}</g>`;
const seesack=()=>sack('#e0d4b0',`<path d="M-46 -40H46" stroke="#2a4a7a" stroke-width="8"/><use href="#sym-anker" x="-16" y="-80" width="32" height="32" color="#2a4a7a"/>`);
const eimer=()=>`${schatten(40,4)}<path d="M8 -70L44 -170" stroke="#c9965a" stroke-width="7" stroke-linecap="round"/><path d="M-30 -64Q0 -110 30 -64" stroke="#555" stroke-width="3" fill="none"/><path d="M-30 -66L-24 0H24L30 -66Z" fill="#9a6a3a" stroke="#4a2a12" stroke-width="3"/><path d="M-29 -50H29M-25 -14H25" stroke="#555" stroke-width="5"/><ellipse cx="0" cy="-66" rx="30" ry="8" fill="#6ab0d8" stroke="#4a2a12" stroke-width="3"/><circle cx="-12" cy="-74" r="6" fill="#fff" opacity=".8"/><circle cx="-2" cy="-78" r="4" fill="#fff" opacity=".8"/>`;
const haengematte=()=>`<g transform="translate(0 -45)">${matte(120,'#e8dcb8')}<ellipse cx="-46" cy="44" rx="20" ry="9" fill="#fff" stroke="#b8a888"/></g>`;
const herd=()=>`${schatten(66,4)}<rect x="34" y="-300" width="24" height="200" fill="#3a3a40"/><path d="M-52 -2V-16M52 -2V-16" stroke="#222" stroke-width="8"/><rect x="-62" y="-100" width="124" height="86" rx="4" fill="#3a3a42" stroke="#18181c" stroke-width="3"/><rect x="-68" y="-108" width="136" height="12" rx="3" fill="#55555e"/><rect x="-44" y="-80" width="44" height="40" rx="4" fill="#ff8a2a" stroke="#18181c" stroke-width="4"/><path d="M-36 -46Q-30 -70 -22 -52Q-16 -74 -8 -46Z" fill="#ffd25a"/><circle cx="30" cy="-60" r="8" fill="#888"/><path d="M-40 -108L-36 -146H36L40 -108Z" fill="#a8b0b8" stroke="#4a5058" stroke-width="3"/><path d="M-40 -134H-52M40 -134H52" stroke="#4a5058" stroke-width="6" stroke-linecap="round"/><ellipse cx="0" cy="-146" rx="36" ry="7" fill="#c9d0d6" stroke="#4a5058" stroke-width="2"/><path d="M-12 -160Q-20 -176 -10 -190M8 -162Q0 -180 12 -196" stroke="#fff" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`;
const zwiebelkorb=()=>`${schatten(52,4)}<path d="M-46 -48Q0 -110 46 -48" stroke="#8a6a3a" stroke-width="5" fill="none"/>${[[-30,-52],[-10,-54],[10,-54],[30,-52],[-20,-66],[0,-68],[20,-66]].map(([x,y])=>zwiebel(x,y)).join('')}<path d="M-50 -50Q-46 0 0 0Q46 0 50 -50Z" fill="#c9a060" stroke="#6b4a24" stroke-width="3"/><path d="M-48 -36H48M-42 -20H42" stroke="#8a6a3a" stroke-width="3"/>`;
const mehlsack=()=>sack('#efe6cf',`<text x="0" y="-40" text-anchor="middle" font-size="18" font-weight="700" fill="#6b5a3a" font-family="Arial,sans-serif">MEHL</text><ellipse cx="46" cy="0" rx="16" ry="6" fill="#fff"/>`);
const kanne=()=>`${schatten(40,4)}<g transform="scale(1.2)"><path d="M28 -40Q56 -50 62 -80" stroke="#c8743a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M-30 -60Q-56 -40 -32 -16" stroke="#6b3a1a" stroke-width="6" fill="none"/><path d="M-30 0Q-40 -40 -22 -70H22Q40 -40 30 0Z" fill="#c8743a" stroke="#6b3a1a" stroke-width="3"/><ellipse cx="0" cy="-72" rx="22" ry="6" fill="#a85a2a" stroke="#6b3a1a" stroke-width="2"/><circle cx="0" cy="-80" r="6" fill="#6b3a1a"/><path d="M-14 -50Q-18 -30 -12 -12" stroke="#f2b07a" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
const gewuerzregal=()=>`<rect x="-84" y="-60" width="168" height="120" fill="#7a4a24" stroke="#3a2010" stroke-width="4"/><path d="M-80 0H80M-80 54H80" stroke="#3a2010" stroke-width="6"/>${[...Array(10)].map((_,k)=>{const x=-66+(k%5)*33,y=k<5?-4:50;return`<rect x="${x-11}" y="${y-38}" width="22" height="38" rx="4" fill="${GF[(k*3)%5]}" stroke="#333" stroke-width="1.5"/><rect x="${x-12}" y="${y-44}" width="24" height="8" fill="#5a3418"/><rect x="${x-8}" y="${y-26}" width="16" height="10" fill="#f4ecd8"/>`;}).join('')}`;
const netz=()=>{let d='';for(let k=-7;k<=7;k++)d+=`M${k*18-36} -70L${k*18+36} 80M${k*18+36} -70L${k*18-36} 80`;return`<clipPath id="nc"><path d="M-100 -70H100Q90 20 60 70Q0 90 -60 70Q-90 20 -100 -70Z"/></clipPath><g clip-path="url(#nc)"><path d="${d}" stroke="#c9b48a" stroke-width="2.5"/></g><path d="M-100 -70H100" stroke="#8a6a3a" stroke-width="5"/>${[-80,-40,0,40,80].map(x=>`<circle cx="${x}" cy="-70" r="9" fill="#e8a33a" stroke="#6b4a24" stroke-width="2"/>`).join('')}<path d="M-46 20Q-30 4 -12 20Q-30 36 -46 20ZM-46 20L-58 10V30Z" fill="#5ab0d8" stroke="#2a6a8a" stroke-width="2"/><circle cx="-20" cy="18" r="2.5" fill="#222"/><use href="#sym-muschel" x="16" y="16" width="34" height="34" color="#f2c0a0"/>`;};
const bananenkiste=()=>`${schatten(66,4)}${kasten(116,60)}${[[-34,-64,-10],[-6,-70,6],[22,-64,-4],[-20,-80,8],[10,-82,-8]].map(([x,y,a])=>`<path d="M-22 0Q0 16 22 0Q0 7 -22 0Z" fill="#f2d03a" stroke="#a88a1a" stroke-width="2" transform="translate(${x} ${y}) rotate(${a})"/>`).join('')}`;
const anker=()=>`${schatten(60,4)}<path d="M12 -150Q60 -150 70 -100Q80 -50 70 -2" stroke="#7a8288" stroke-width="5" stroke-dasharray="10 4" fill="none"/><g stroke="#4a5258" stroke-linecap="round" fill="none"><circle cx="0" cy="-150" r="14" stroke-width="8"/><path d="M0 -136V-14" stroke-width="14"/><path d="M-36 -116H36" stroke-width="12"/><path d="M-58 -50Q-50 -6 0 -8Q50 -6 58 -50" stroke-width="12"/></g><path d="M-58 -64L-70 -42L-48 -46ZM58 -64L70 -42L48 -46Z" fill="#4a5258" stroke="#4a5258" stroke-width="4" stroke-linejoin="round"/>`;
const flaschenpost=()=>`${schatten(66,4)}<g transform="rotate(-6) scale(1.1)"><path d="M-60 -22Q-60 -44 -38 -44H20L34 -34H50V-12H34L20 -2H-38Q-60 -2 -60 -22Z" fill="#5aa86a" fill-opacity=".55" stroke="#2f6a3a" stroke-width="3"/><rect x="50" y="-32" width="14" height="18" rx="3" fill="#a87a44" stroke="#6b4a24" stroke-width="2"/><rect x="-42" y="-32" width="54" height="20" rx="8" fill="#f4ecd8" stroke="#b8a888" stroke-width="2"/><path d="M-16 -32V-12" stroke="#a33b22" stroke-width="4"/><path d="M-50 -34Q-30 -40 0 -38" stroke="#fff" stroke-width="3" opacity=".6" fill="none" stroke-linecap="round"/></g>`;
const kartoffelsack=()=>sack('#b89a6a',`${[[-52,-6],[54,-6],[40,-16],[-38,-14]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="12" ry="9" fill="#c9a060" stroke="#7a5a2a" stroke-width="2"/>`).join('')}<path d="M-30 -50H30M-34 -30H34" stroke="#8a7048" stroke-width="2"/>`);
const kartentisch=()=>`${schatten(100,4)}<g transform="scale(1.25)"><path d="M-64 0V-70M64 0V-70M-44 -2V-60M44 -2V-60" stroke="#4a2a14" stroke-width="8"/><path d="M-84 -70L-64 -94H64L84 -70Z" fill="#6b3a1c" stroke="#3a1a0a" stroke-width="3"/><rect x="-84" y="-70" width="168" height="10" fill="#4a2a14"/><path d="M-60 -74L-46 -90H44L58 -74Z" fill="#e8d6a8" stroke="#8a6a3a" stroke-width="2"/><path d="M-34 -80Q-24 -88 -10 -84Q-4 -78 -18 -76Z" fill="#a8c878"/><path d="M14 -84L22 -78M22 -84L14 -78" stroke="#a33b22" stroke-width="3"/><path d="M-10 -80Q4 -88 16 -81" stroke="#a33b22" stroke-width="1.5" stroke-dasharray="3 2" fill="none"/><path d="M40 -80L64 -114" stroke="#f4ecd8" stroke-width="3"/></g>`;
const schatztruhe=()=>`${truhe('#7a3a1a','#e0b040')}${[[-74,-6],[-62,-4],[72,-6],[-68,-14]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="#f2c94c" stroke="#a87a1a" stroke-width="2"/>`).join('')}<path d="M64 -14L72 -24L80 -14L72 -4Z" fill="#3fa8d8" stroke="#1a5a7a"/>`;
const hutstaender=()=>`${schatten(34,4)}<path d="M-26 0L0 -10L26 0M0 -6V-170" stroke="#4a2a14" stroke-width="7" stroke-linecap="round"/><path d="M-22 -150Q-34 -100 -26 -60H26Q34 -100 22 -150Q0 -162 -22 -150Z" fill="#a82a2a" stroke="#5a1010" stroke-width="3"/>${[-136,-114,-92].map(y=>`<circle cx="0" cy="${y}" r="3.5" fill="#d8a73a"/>`).join('')}<path d="M-44 -176Q-30 -166 0 -170Q30 -166 44 -176Q30 -202 0 -206Q-30 -202 -44 -176Z" fill="#2a2030" stroke="#000" stroke-width="2"/><path d="M-40 -178Q0 -168 40 -178" stroke="#d8a73a" stroke-width="3" fill="none"/><path d="M10 -200Q40 -232 62 -214Q40 -206 14 -194Z" fill="#e8c45a" stroke="#a88a1a" stroke-width="1.5"/>`;
const sanduhr=()=>`${schatten(36,4)}<rect x="-34" y="-12" width="68" height="12" rx="3" fill="#6b3a1c"/><rect x="-34" y="-122" width="68" height="12" rx="3" fill="#6b3a1c"/><path d="M-28 -110V-12M28 -110V-12" stroke="#6b3a1c" stroke-width="5"/><path d="M-20 -110Q-20 -76 0 -62Q20 -76 20 -110ZM-20 -12Q-20 -46 0 -60Q20 -46 20 -12Z" fill="#dff0f4" fill-opacity=".6" stroke="#9fc8d8" stroke-width="2"/><path d="M-13 -96Q0 -90 13 -96Q8 -76 0 -68Q-8 -76 -13 -96ZM-17 -12Q0 -36 17 -12Z" fill="#e8c45a"/><path d="M0 -64V-14" stroke="#e8c45a" stroke-width="2"/>`;
const bild=()=>`<rect x="-58" y="-74" width="116" height="148" rx="6" fill="#d8a73a" stroke="#8a6420" stroke-width="4"/><rect x="-46" y="-62" width="92" height="124" fill="#2f5a7a"/><path d="M-36 62Q-36 16 0 12Q36 16 36 62Z" fill="#a82a2a"/><path d="M-26 -6Q-34 30 -28 48M26 -6Q34 30 28 48" stroke="#d8502a" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="0" cy="-8" r="20" fill="#f2c8a0"/><circle cx="-7" cy="-10" r="2.5" fill="#222"/><circle cx="7" cy="-10" r="2.5" fill="#222"/><path d="M-7 0Q0 6 7 0" stroke="#222" stroke-width="2" fill="none"/><path d="M-38 -22Q-20 -28 0 -26Q20 -28 38 -22Q24 -54 0 -56Q-24 -54 -38 -22Z" fill="#2a2030"/><use href="#sym-papagei" x="14" y="14" width="30" height="30" color="#5ad86a"/>`;
const steuerrad=()=>{let s='';for(let k=0;k<8;k++)s+=`<g transform="rotate(${k*45})"><path d="M0 -16V-82" stroke="#7a4a24" stroke-width="7"/><path d="M0 -84V-100" stroke="#7a4a24" stroke-width="10" stroke-linecap="round"/></g>`;return`${schatten(44,4)}<path d="M-30 0L-18 -110H18L30 0Z" fill="#6b3f1f" stroke="#3a2010" stroke-width="3"/><g transform="translate(0 -130)"><circle r="70" fill="none" stroke="#8a5a2a" stroke-width="12"/>${s}<circle r="16" fill="#d8a73a" stroke="#6b4a1c" stroke-width="3"/></g>`;};
const papageienstange=()=>`${schatten(36,4)}<path d="M-28 0H28M0 0V-150M-40 -150H40" stroke="#6b3f1f" stroke-width="7" stroke-linecap="round"/><path d="M-36 -146Q-36 -130 -22 -132" stroke="#6b3f1f" stroke-width="4" fill="none"/><path d="M-6 -162L-26 -110L-4 -122L8 -152Z" fill="#2a6ad8"/><ellipse cx="4" cy="-180" rx="18" ry="26" fill="#d83a2a"/><path d="M-12 -192Q-22 -160 -4 -150Q8 -172 -12 -192Z" fill="#3fa84a"/><path d="M-10 -168Q-8 -160 -4 -156" stroke="#f2d03a" stroke-width="4"/><circle cx="10" cy="-206" r="15" fill="#d83a2a"/><circle cx="15" cy="-210" r="5" fill="#fff"/><circle cx="16" cy="-210" r="2.5" fill="#222"/><path d="M22 -210Q36 -208 28 -192Q24 -198 20 -198Z" fill="#f2d03a" stroke="#6b4a1c" stroke-width="1.5"/><path d="M-2 -154V-146M10 -154V-146" stroke="#555" stroke-width="3"/>`;
const fernrohr=()=>`${schatten(46,4)}<path d="M0 -80L-36 0M0 -80L36 0M0 -80V0" stroke="#4a2a14" stroke-width="5"/><g transform="rotate(-20 0 -86)"><rect x="-60" y="-96" width="120" height="20" rx="4" fill="#d8a73a" stroke="#6b4a1c" stroke-width="2"/><rect x="40" y="-100" width="28" height="28" rx="4" fill="#a87a2a"/><rect x="-70" y="-92" width="14" height="12" fill="#6b4a1c"/></g>`;
const kompass=()=>`${schatten(44,4)}<path d="M-26 0L-18 -80H18L26 0Z" fill="#7a4a24" stroke="#3a2010" stroke-width="3"/><path d="M-32 -80H32" stroke="#3a2010" stroke-width="6"/><circle cx="-36" cy="-100" r="9" fill="#c9ccce" stroke="#555"/><circle cx="36" cy="-100" r="9" fill="#c9ccce" stroke="#555"/><path d="M-26 -84Q-26 -124 0 -124Q26 -124 26 -84Z" fill="#d8a73a" stroke="#6b4a1c" stroke-width="3"/><ellipse cx="0" cy="-102" rx="16" ry="12" fill="#f4ecd8" stroke="#6b4a1c" stroke-width="2"/><path d="M0 -112L4 -102L0 -92L-4 -102Z" fill="#a33b22"/>`;
const glocke=()=>`<path d="M-40 100V-66H34" stroke="#6b3f1f" stroke-width="10" fill="none"/><path d="M26 -66V-52" stroke="#333" stroke-width="4"/><path d="M26 16Q20 40 30 64" stroke="#c9b48a" stroke-width="3" fill="none"/><path d="M8 -44Q8 -54 26 -56Q44 -54 44 -44Q44 -6 56 10H-4Q8 -6 8 -44Z" fill="#d8a73a" stroke="#8a6420" stroke-width="3"/><circle cx="26" cy="15" r="6" fill="#8a6420"/><path d="M16 -40Q14 -16 8 0" stroke="#fff3b0" stroke-width="4" fill="none" opacity=".7" stroke-linecap="round"/>`;
const flagge=()=>`<path d="M-50 160V-80" stroke="#6b3f1f" stroke-width="7"/><circle cx="-50" cy="-84" r="6" fill="#d8a73a"/><path d="M-46 -76Q0 -90 60 -72Q50 -44 60 -14Q0 -30 -46 -18Z" fill="#2a6aa8" stroke="#17406a" stroke-width="2"/><use href="#sym-papagei" x="-12" y="-68" width="40" height="40" color="#f2d03a"/>`;
const fass=()=>`${schatten(40,4)}<path d="M-34 -2Q-44 -55 -34 -108H34Q44 -55 34 -2Z" fill="#9a6232" stroke="#4a2a12" stroke-width="3"/><path d="M-18 -106Q-24 -55 -18 -4M0 -108V-2M18 -106Q24 -55 18 -4" stroke="rgba(0,0,0,.2)" stroke-width="2" fill="none"/><path d="M-39 -86H39M-39 -24H39" stroke="#555" stroke-width="6"/><ellipse cx="0" cy="-108" rx="34" ry="8" fill="#b8804a" stroke="#4a2a12" stroke-width="3"/><path d="M-6 -50H8V-40" stroke="#888" stroke-width="5" fill="none"/>`;
const taurolle=()=>`${schatten(54,4)}${[0,1,2,3].map(k=>`<ellipse cx="0" cy="${-10-k*9}" rx="${48-k*3}" ry="${16-k}" fill="#c9a060" stroke="#7a5a2a" stroke-width="3"/>`).join('')}<ellipse cx="0" cy="-37" rx="16" ry="6" fill="#5a3a1a"/><path d="M44 -12Q70 -6 78 -2" stroke="#c9a060" stroke-width="8" stroke-linecap="round"/>`;
const knotentafel=()=>`<rect x="-70" y="-55" width="140" height="110" rx="6" fill="#a87a44" stroke="#4a2a12" stroke-width="4"/><path d="M-50 -30q10-20 20 0t20 0M10 -30h40M-50 20c0-20 30-20 20 0s-20 20 0 20M14 18a14 14 0 1 0 28 0a14 14 0 1 0 -28 0" stroke="#f4ead0" stroke-width="5" fill="none" stroke-linecap="round"/>`;
const hocker=()=>`${schatten(34,4)}<path d="M-24 0L-18 -60M24 0L18 -60M-21 -30H21" stroke="#6b3f1f" stroke-width="6"/><ellipse cx="0" cy="-62" rx="32" ry="9" fill="#8a5a2a" stroke="#3a2010" stroke-width="3"/><path d="M-22 -68L0 -64L22 -68V-78L0 -74L-22 -78Z" fill="#f4ecd8" stroke="#2a4a7a" stroke-width="3"/>`;
const waschschuessel=()=>`${schatten(36,4)}<path d="M-26 0L-20 -70M26 0L20 -70M-24 -24H24" stroke="#6b3f1f" stroke-width="6"/><rect x="18" y="-62" width="14" height="40" fill="#c0392b"/><path d="M-40 -74Q-36 -50 0 -50Q36 -50 40 -74Z" fill="#e8eef2" stroke="#5a6a78" stroke-width="3"/><ellipse cx="0" cy="-74" rx="40" ry="7" fill="#9fd0ec" stroke="#5a6a78" stroke-width="2"/>`;
const speiseplan=()=>`<rect x="-62" y="-58" width="124" height="116" rx="4" fill="#2f3a32" stroke="#7a4a24" stroke-width="8"/><path d="M-44 -34H26M-44 -10H40M-44 14H20M-44 38H34" stroke="#f4f4ea" stroke-width="4" stroke-dasharray="10 5" opacity=".85"/><circle cx="42" cy="-34" r="9" fill="#c0392b"/>`;
const apfelfass=()=>`${schatten(46,4)}${[-24,-8,8,24,-16,0,16].map((x,k)=>`<circle cx="${x}" cy="${k<4?-62:-74}" r="10" fill="${k%3?'#c0392b':'#3f8a3a'}"/>`).join('')}<path d="M-40 -60L-32 0H32L40 -60Z" fill="#b8804a" stroke="#4a2a12" stroke-width="3"/><path d="M-38 -44H38M-34 -14H34" stroke="#555" stroke-width="5"/>`;
const fischtisch=()=>`${schatten(50,4)}<path d="M-40 0V-50M40 0V-50" stroke="#6b3f1f" stroke-width="7"/><rect x="-54" y="-60" width="108" height="12" fill="#8a5a2a" stroke="#3a2010" stroke-width="2"/><rect x="-40" y="-68" width="70" height="8" rx="3" fill="#d8b07a"/><path d="M-30 -76Q-8 -90 14 -76Q-8 -62 -30 -76ZM14 -76L26 -86V-66Z" fill="#7ab0c8" stroke="#2a6a8a" stroke-width="2"/>`;
const ladeliste=()=>`<rect x="-50" y="-66" width="100" height="132" rx="6" fill="#8a5a2a" stroke="#3a2010" stroke-width="3"/><rect x="-40" y="-52" width="80" height="108" fill="#f4ecd8"/><rect x="-16" y="-72" width="32" height="14" rx="3" fill="#888"/><path d="M-30 -30H30M-30 -8H30M-30 14H30M-30 36H10" stroke="#6b5a3a" stroke-width="3"/>`;
const buecherbord=()=>`${GF.map((c,k)=>`<rect x="${-70+k*28}" y="${-40+(k%2)*10}" width="24" height="${65-(k%2)*10}" fill="${c}" stroke="#333" stroke-width="2"/>`).join('')}<path d="M-84 30H84" stroke="#4a2a14" stroke-width="10"/>`;
const pult=()=>`${schatten(36,4)}<path d="M-24 0H24M0 0V-100" stroke="#4a2a14" stroke-width="8"/><g transform="translate(0 -108) rotate(-12)"><rect x="-46" y="-6" width="92" height="12" fill="#6b3a1c"/><path d="M-40 -6Q-20 -16 0 -8Q20 -16 40 -6V-14Q20 -24 0 -16Q-20 -24 -40 -14Z" fill="#f4ecd8" stroke="#7a1f28" stroke-width="2"/></g>`;
const globus=()=>`${schatten(34,4)}<path d="M-24 0H24M0 0V-40" stroke="#4a2a14" stroke-width="7"/><circle cx="0" cy="-80" r="38" fill="#3f8fbf" stroke="#6b4a1c" stroke-width="3"/><path d="M-26 -96Q-10 -110 6 -96Q0 -80 -18 -78ZM6 -70Q24 -76 28 -60Q14 -48 4 -56Z" fill="#a8c878"/><path d="M-30 -112A44 44 0 0 0 30 -48" stroke="#d8a73a" stroke-width="5" fill="none"/>`;
const rettungsring=()=>`${schatten(40,4)}<circle cy="-46" r="36" fill="none" stroke="#f4ead0" stroke-width="18"/><circle cy="-46" r="36" fill="none" stroke="#c0392b" stroke-width="18" stroke-dasharray="28.3 28.3"/>`;
const flaggenkiste=()=>`${schatten(46,4)}<path d="M-30 -40V-100M10 -40V-110" stroke="#6b3f1f" stroke-width="4"/><path d="M-30 -100H0V-78H-30Z" fill="#f2d03a"/><path d="M10 -110H44L30 -98L44 -86H10Z" fill="#2a6aa8"/>${kasten(90,50)}`;
const palme=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0Q-8 -70 16 -130" stroke="#8a5a2a" stroke-width="13" fill="none" stroke-linecap="round"/>${[-170,-135,-95,-50,-10,25,155].map(a=>`<ellipse cx="44" cy="0" rx="46" ry="11" fill="#3f9a4a" transform="translate(16 -130) rotate(${a})"/>`).join('')}<circle cx="10" cy="-124" r="7" fill="#6b4a24"/><circle cx="22" cy="-122" r="7" fill="#6b4a24"/></g>`;
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500;
let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="330" r="8" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>`;
let niet='';for(const y of[236,424])for(let x=422;x<=580;x+=26)niet+=`<circle cx="${x}" cy="${y}" r="3" fill="#a0a6aa"/>`;
const blatt='M410 470V204Q410 186 428 186H572Q590 186 590 204V470Z';
return`<defs><clipPath id="tuerclip"><path d="${blatt}"/></clipPath><linearGradient id="platteG" x1="0" x2="1"><stop offset="0" stop-color="#5a3418"/><stop offset=".5" stop-color="#7f4e26"/><stop offset="1" stop-color="#4a2a12"/></linearGradient></defs>
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="Tür mit Zahlenschloss">
   <path d="M378 470V176Q378 154 400 154H600Q622 154 622 176V470Z" fill="#3a2210" stroke="#1e1006" stroke-width="5"/>
   <path d="${blatt}" fill="#120a04"/>
   <g clip-path="url(#tuerclip)"><g id="platte"><path d="${blatt}" fill="url(#platteG)"/><path d="M446 186V470M482 186V470M518 186V470M554 186V470" stroke="#3a2010" stroke-width="3"/><path d="M410 236H590M410 424H590" stroke="#3a3a40" stroke-width="14"/>${niet}<use href="#sym-anker" x="472" y="248" width="56" height="56" color="#d8a73a"/><rect x="${500-n*11-12}" y="312" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>${d}<circle cx="568" cy="392" r="11" fill="none" stroke="#3a3a40" stroke-width="5"/></g></g>
   <circle cx="500" cy="154" r="10" fill="#d8a73a" stroke="#6b4a1c" stroke-width="2"/>
  </g></g>`;
}
SZENARIEN.piratenschiff={
name:"Das Piratenschiff",
symbole:["anker","steuerrad","papagei","muschel","schatzkarte"],
symbolNamen:["Anker","Steuerrad","Papagei","Muschel","Schatzkarte"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M8 80q13-7 26 0t26 0t26 0t26 0" stroke="#3f8fbf" stroke-width="4" fill="none"/><path d="M12 56H108L94 74H26Z" fill="#8a5a2a" stroke="#4a2a12" stroke-width="3"/><path d="M60 56V8" stroke="#4a2a12" stroke-width="4"/><path d="M63 14Q88 30 63 50Z" fill="#f4ead0" stroke="#8a7a5a" stroke-width="2"/><path d="M57 18Q36 32 57 50Z" fill="#f4ead0" stroke="#8a7a5a" stroke-width="2"/><path d="M60 8L78 12L60 16" fill="#a33b22"/><use href="#sym-papagei" x="86" y="22" width="28" height="28" color="#3fa84a"/></svg>`,
texte:{
einleitung:"Ahoi! Ihr seid an Bord eines alten Piratenschiffs. Kapitänin Rotbart hat alle Türen verschlossen – und oben an Deck wartet das Beiboot zur Schatzinsel! Jede Tür hat ein Zahlenschloss. Untersucht die Gegenstände auf dem Schiff. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zur Schatzinsel?",
startKnopf:"An Bord gehen",
hinweisGeber:"Der Papagei krächzt:",
richtig:"Richtig gelöst – ahoi!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Der Papagei schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Kapitänin",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeritzt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Sanduhr ist abgelaufen!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und das Beiboot trotzdem noch erreichen!",
geschafft:"Land in Sicht!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und seid mit dem Beiboot zur Schatzinsel gerudert. Kapitänin Rotbart winkt euch fröhlich zu!"
},
texteDu:{
einleitung:"Ahoi! Du bist an Bord eines alten Piratenschiffs. Kapitänin Rotbart hat alle Türen verschlossen – und oben an Deck wartet das Beiboot zur Schatzinsel! Jede Tür hat ein Zahlenschloss. Untersuche die Gegenstände auf dem Schiff. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zur Schatzinsel?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Der Papagei schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeritzt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber die Tür bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und das Beiboot trotzdem noch erreichen!",
geschafft:"Land in Sicht!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und bist mit dem Beiboot zur Schatzinsel gerudert. Kapitänin Rotbart winkt dir fröhlich zu!"
},
einfach:{
name:"Das Piratenschiff",
symbolNamen:["Anker","Steuerrad","Papagei","Muschel","Karte"],
texte:{
einleitung:"Ihr seid auf einem alten Piratenschiff. Die Kapitänin heißt Rotbart. Sie hat alle Türen zugeschlossen! An jeder Tür hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Oben auf dem Schiff wartet ein kleines Boot. Damit fahrt ihr zur Schatzinsel!",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Jetzt fahrt ihr mit dem kleinen Boot zur Schatzinsel!"
},
texteDu:{
einleitung:"Du bist auf einem alten Piratenschiff. Die Kapitänin heißt Rotbart. Sie hat alle Türen zugeschlossen! An jeder Tür hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Oben auf dem Schiff wartet ein kleines Boot. Damit fährst du zur Schatzinsel!",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Die Tür bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Jetzt fährst du mit dem kleinen Boot zur Schatzinsel!"
},
raeume:[
{titel:"Der Schlafraum",intro:"Hier schlafen die Leute vom Schiff. Sie schlafen in Hängematten. Durch die runden Fenster seht ihr das Meer. Hier sind die Zahlen für das erste Schloss versteckt.",introDu:"Hier schlafen die Leute vom Schiff. Sie schlafen in Hängematten. Durch die runden Fenster siehst du das Meer. Hier sind die Zahlen für das erste Schloss versteckt.",
objekte:[{name:"Kiste",fund:"In der Kiste liegt:"},{name:"Laterne",fund:"Unter der Laterne liegt:"},{name:"Tasche aus Stoff",fund:"In der Tasche steckt:"},{name:"Eimer",fund:"Im Eimer liegt:"},{name:"Hängematte",fund:"In der Hängematte liegt:"}],
infoObjekte:[{name:"Tafel mit Knoten",fund:"Hinter der Tafel steckt:"},{name:"Hocker mit Heft",fund:"Im Heft liegt:"},{name:"Schüssel zum Waschen",fund:"Unter der Schüssel liegt:"}]},
{titel:"Die Schiffsküche",intro:"Das ist die Küche vom Schiff. Auf dem Herd kocht eine Suppe. An der Decke hängen Zwiebeln. Findet die Zahlen für das nächste Schloss!",introDu:"Das ist die Küche vom Schiff. Auf dem Herd kocht eine Suppe. An der Decke hängen Zwiebeln. Finde die Zahlen für das nächste Schloss!",
objekte:[{name:"Herd mit Topf",fund:"Im Topf schwimmt:"},{name:"Korb mit Zwiebeln",fund:"Zwischen den Zwiebeln liegt:"},{name:"Sack mit Mehl",fund:"Im Mehl steckt:"},{name:"Kanne",fund:"In der Kanne klappert etwas:"},{name:"Regal mit Gewürzen",fund:"Hinter einem Glas steckt:"}],
infoObjekte:[{name:"Tafel mit dem Essen",fund:"Neben der Tafel hängt:"},{name:"Fass mit Äpfeln",fund:"Zwischen den Äpfeln liegt:"},{name:"Tisch mit Fisch",fund:"Unter dem Fisch liegt:"}]},
{titel:"Der Lagerraum",intro:"Hier unten ist es dunkel. Hier liegen Kisten, Säcke und Netze. Ein grünes Licht leuchtet. Sucht gut!",introDu:"Hier unten ist es dunkel. Hier liegen Kisten, Säcke und Netze. Ein grünes Licht leuchtet. Such gut!",
objekte:[{name:"Kiste mit Bananen",fund:"Zwischen den Bananen liegt:"},{name:"Anker",fund:"Am Anker hängt:"},{name:"Flasche mit Brief",fund:"In der Flasche steckt ein Brief:"},{name:"Sack mit Kartoffeln",fund:"Zwischen den Kartoffeln liegt:"},{name:"Netz",fund:"Im Netz hängt:"}],
infoObjekte:[{name:"Liste an der Wand",fund:"An der Liste klemmt:"},{name:"Fass mit Wasser",fund:"Auf dem Fass liegt:"},{name:"Dickes Seil",fund:"Im Seil steckt:"}]},
{titel:"Das Zimmer der Kapitänin",intro:"Das ist das Zimmer der Kapitänin. Am großen Fenster hängen rote Vorhänge. Auf dem Tisch liegt eine Karte.",
objekte:[{name:"Tisch mit Karte",fund:"Auf der Karte steht:"},{name:"Schatzkiste",fund:"In der Kiste glitzert:"},{name:"Hut der Kapitänin",fund:"Im Hut steckt:"},{name:"Sanduhr",fund:"Unter der Sanduhr liegt:"},{name:"Bild der Kapitänin",fund:"Hinter dem Bild klebt:"}],
infoObjekte:[{name:"Brett mit Büchern",fund:"Zwischen den Büchern steckt:"},{name:"Buch auf dem Pult",fund:"Im Buch liegt:"},{name:"Erdkugel",fund:"An der Erdkugel klebt:"}]},
{titel:"Oben auf dem Schiff",intro:"Ihr seid oben auf dem Schiff. Die Sonne geht unter. Hinter der letzten Tür wartet das kleine Boot. Öffnet das letzte Schloss!",introDu:"Du bist oben auf dem Schiff. Die Sonne geht unter. Hinter der letzten Tür wartet das kleine Boot. Öffne das letzte Schloss!",
objekte:[{name:"Steuerrad",fund:"Am Steuerrad hängt:"},{name:"Papagei",fund:"Der Papagei lässt etwas fallen:"},{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Kompass",fund:"Unter dem Kompass liegt:"},{name:"Glocke",fund:"In der Glocke hängt:"}],
infoObjekte:[{name:"Fahne mit Papagei",fund:"An der Fahne hängt:"},{name:"Ring zum Schwimmen",fund:"Am Ring hängt:"},{name:"Kiste mit Fahnen",fund:"Zwischen den Fahnen steckt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Unterdeck",
intro:"Ihr wacht im Unterdeck auf. Hier schlafen die Matrosen in schaukelnden Hängematten. Durch die Bullaugen seht ihr das Meer, eine Laterne gibt warmes Licht. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
introDu:"Du wachst im Unterdeck auf. Hier schlafen die Matrosen in schaukelnden Hängematten. Durch die Bullaugen siehst du das Meer, eine Laterne gibt warmes Licht. Irgendwo hier sind die Ziffern für das erste Schloss versteckt …",
tuerX:800,
hintergrund:()=>`${defs('#8a5a30','#3a2210','#ffc870')}${wand('#8a5632',34,320)}${balken([60,600,1000,1540],'#4a2c14')}${bullauge(250,300,40,'#ffd8a0','#3a7aa8')}${bullauge(1420,300,40,'#ffd8a0','#3a7aa8')}<g transform="translate(330 44)">${matte(250,'#cdbf98')}</g><g transform="translate(1270 44)">${matte(250,'#b8c8a0')}</g>${boden()}${laterne(800,40)}`,
objekte:[
{name:"Seemannskiste",x:300,boden:600,fuss:4,by:-100,zeichne:seemannskiste,fund:"In der Seemannskiste liegt:"},
{name:"Sturmlaterne",x:560,boden:700,fuss:4,by:-125,zeichne:sturmlaterne,fund:"Unter der Laterne liegt:"},
{name:"Seesack",x:1060,boden:590,fuss:4,by:-135,zeichne:seesack,fund:"Im Seesack steckt:"},
{name:"Eimer mit Schrubber",x:1350,boden:700,fuss:4,by:-110,zeichne:eimer,fund:"Im Eimer schwimmt:"},
{name:"Hängematte",x:1180,y:240,wand:true,by:-70,zeichne:haengematte,fund:"In der Hängematte liegt:"}
],
infoObjekte:[
{name:"Knotentafel",x:480,y:255,wand:true,by:-75,zeichne:knotentafel,fund:"Hinter der Knotentafel steckt:"},
{name:"Hocker mit Tagebuch",x:1500,boden:560,fuss:4,by:-100,zeichne:hocker,fund:"Im Tagebuch liegt:"},
{name:"Waschschüssel",x:130,boden:730,fuss:4,by:-100,zeichne:waschschuessel,fund:"Unter der Waschschüssel liegt:"}
]},
{titel:"Die Kombüse",
intro:"Ihr steht in der Kombüse, der Küche des Schiffs. Auf dem Herd blubbert ein Topf mit Suppe, an der Decke hängen Zwiebelzöpfe. Findet die Ziffern für das nächste Schloss!",
introDu:"Du stehst in der Kombüse, der Küche des Schiffs. Auf dem Herd blubbert ein Topf mit Suppe, an der Decke hängen Zwiebelzöpfe. Finde die Ziffern für das nächste Schloss!",
tuerX:1350,
hintergrund:()=>`${defs('#9a6a3a','#4a2a14','#ffb060')}${wand('#b07a46',30,260)}<rect x="470" y="140" width="260" height="330" fill="#a04a32"/>${steine(470,730,140,470,28,56,'rgba(60,20,10,.45)')}<rect width="1600" height="36" fill="#5a3418"/>${zopf(360)}${zopf(430)}<path d="M1030 70H1200" stroke="#444" stroke-width="5"/>${[1060,1120,1180].map(x=>`<path d="M${x} 70V92" stroke="#444" stroke-width="4"/><circle cx="${x}" cy="114" r="22" fill="#5a5a62" stroke="#2a2a30" stroke-width="3"/>`).join('')}${bullauge(1540,200,30,'#9fd0ec','#2f78a8')}<g transform="translate(80 470)">${fass()}</g><g transform="translate(170 470) scale(.85)">${fass()}</g>${boden()}<circle cx="600" cy="420" r="260" fill="url(#licht)"/>${laterne(800,60)}`,
objekte:[
{name:"Herd mit Kochtopf",x:600,boden:560,fuss:4,by:-215,zeichne:herd,fund:"Im Kochtopf schwimmt:"},
{name:"Zwiebelkorb",x:1000,boden:700,fuss:4,by:-100,zeichne:zwiebelkorb,fund:"Zwischen den Zwiebeln liegt:"},
{name:"Mehlsack",x:250,boden:650,fuss:4,by:-135,zeichne:mehlsack,fund:"Im Mehl steckt:"},
{name:"Kupferkanne",x:840,boden:620,fuss:4,by:-120,zeichne:kanne,fund:"In der Kanne klappert etwas:"},
{name:"Gewürzregal",x:920,y:240,wand:true,by:-80,zeichne:gewuerzregal,fund:"Hinter einem Gewürzglas steckt:"}
],
infoObjekte:[
{name:"Speiseplan",x:200,y:250,wand:true,by:-80,zeichne:speiseplan,fund:"Neben dem Speiseplan hängt:"},
{name:"Apfelfass",x:1530,boden:600,fuss:4,by:-100,zeichne:apfelfass,fund:"Zwischen den Äpfeln liegt:"},
{name:"Küchentisch mit Fisch",x:1150,boden:745,fuss:4,by:-105,zeichne:fischtisch,fund:"Unter dem Fisch liegt:"}
]},
{titel:"Der Laderaum",
intro:"Im Laderaum ist es dunkel und feucht. Hier lagern Kisten, Säcke und Netze für die lange Reise. Ein grünes Licht flackert. Sucht gut – die Ziffern sind gut versteckt!",
introDu:"Im Laderaum ist es dunkel und feucht. Hier lagern Kisten, Säcke und Netze für die lange Reise. Ein grünes Licht flackert. Such gut – die Ziffern sind gut versteckt!",
tuerX:220,
hintergrund:()=>`${defs('#3a4030','#12160e','#a8f0a0')}${wand('#3e3c2c',30,360)}${[440,820,1200].map(x=>`<path d="M${x-20} 0Q${x+30} 235 ${x-20} 470" stroke="#26241a" stroke-width="28" fill="none"/>`).join('')}<rect width="1600" height="40" fill="#1e1c14"/><polygon points="960,40 1050,40 1180,470 830,470" fill="#cfffc0" opacity=".07"/><circle cx="420" cy="150" r="28" fill="none" stroke="#a88a5a" stroke-width="9"/><circle cx="420" cy="150" r="16" fill="none" stroke="#a88a5a" stroke-width="7"/><path d="M440 168Q450 200 440 220" stroke="#a88a5a" stroke-width="7" fill="none" stroke-linecap="round"/><g transform="translate(1320 470)">${kasten(140,100)}</g><g transform="translate(1470 470)">${kasten(140,100)}</g><g transform="translate(1395 370)">${kasten(140,90)}</g>${boden()}${laterne(630,50,'#b8f0a0')}`,
objekte:[
{name:"Bananenkiste",x:520,boden:600,fuss:4,by:-115,zeichne:bananenkiste,fund:"Zwischen den Bananen liegt:"},
{name:"Schiffsanker",x:850,boden:690,fuss:4,by:-190,zeichne:anker,fund:"Am Anker hängt:"},
{name:"Flaschenpost",x:1150,boden:620,fuss:4,by:-80,zeichne:flaschenpost,fund:"In der Flasche steckt ein Brief:"},
{name:"Kartoffelsack",x:1400,boden:720,fuss:4,by:-135,zeichne:kartoffelsack,fund:"Zwischen den Kartoffeln liegt:"},
{name:"Fischernetz",x:1000,y:230,wand:true,by:-95,zeichne:netz,fund:"Im Netz hat sich etwas verfangen:"}
],
infoObjekte:[
{name:"Ladeliste",x:650,y:260,wand:true,by:-90,zeichne:ladeliste,fund:"An der Ladeliste klemmt:"},
{name:"Wasserfass",x:1500,boden:560,fuss:4,by:-130,zeichne:fass,fund:"Auf dem Fass liegt:"},
{name:"Taurolle",x:700,boden:510,fuss:4,by:-70,zeichne:taurolle,fund:"In der Taurolle steckt:"}
]},
{titel:"Die Kapitänskajüte",
intro:"Ihr habt die Kapitänskajüte erreicht! Rote Vorhänge hängen am großen Heckfenster, auf dem Tisch liegt eine Seekarte. Hier plant Kapitänin Rotbart ihre Reisen.",
introDu:"Du hast die Kapitänskajüte erreicht! Rote Vorhänge hängen am großen Heckfenster, auf dem Tisch liegt eine Seekarte. Hier plant Kapitänin Rotbart ihre Reisen.",
tuerX:300,
hintergrund:()=>`${defs('#6a3a22','#2a120a','#ffd890')}<rect width="1600" height="470" fill="#7a1f28"/><path d="${[...Array(32)].map((_,k)=>`M${k*50+25} 40V340`).join('')}" stroke="#93343a" stroke-width="4"/><rect y="340" width="1600" height="130" fill="#5a3418"/>${steine(0,1600,340,470,65,200,'rgba(0,0,0,.3)')}<rect width="1600" height="40" fill="#3a1a0a"/><path d="M0 40H1600M0 340H1600" stroke="#d8a73a" stroke-width="5"/><rect x="600" y="80" width="440" height="260" rx="10" fill="#4a2a14"/><rect x="614" y="94" width="412" height="140" fill="#8ac8ec"/><circle cx="940" cy="170" r="26" fill="#fff3b0"/><rect x="614" y="234" width="412" height="92" fill="#2f78a8"/><path d="M640 270q12-8 24 0t24 0M800 290q12-8 24 0t24 0M920 262q12-8 24 0t24 0" stroke="#bfe8f8" stroke-width="3" fill="none"/><path d="M717 94V326M820 94V326M923 94V326M614 210H1026" stroke="#4a2a14" stroke-width="8"/><path d="M540 46H1100" stroke="#d8a73a" stroke-width="6"/><path d="M560 46H640Q616 140 650 220Q610 260 600 340H560Z" fill="#a82a32" stroke="#5a1018" stroke-width="3"/><path d="M1080 46H1000Q1024 140 990 220Q1030 260 1040 340H1080Z" fill="#a82a32" stroke="#5a1018" stroke-width="3"/><circle cx="636" cy="220" r="7" fill="#d8a73a"/><circle cx="1004" cy="220" r="7" fill="#d8a73a"/><rect x="620" y="360" width="400" height="56" fill="#4a2a14"/><rect x="620" y="346" width="400" height="20" rx="8" fill="#a82a32"/>${boden()}${laterne(1310,40)}`,
objekte:[
{name:"Kartentisch",x:820,boden:610,fuss:4,by:-160,zeichne:kartentisch,fund:"Auf der Karte ist etwas markiert:"},
{name:"Schatztruhe",x:1250,boden:690,fuss:4,by:-105,zeichne:schatztruhe,fund:"In der Schatztruhe glitzert:"},
{name:"Hutständer mit Kapitänshut",x:560,boden:560,fuss:4,by:-235,zeichne:hutstaender,fund:"Im Hut der Kapitänin steckt:"},
{name:"Sanduhr",x:1050,boden:720,fuss:4,by:-145,zeichne:sanduhr,fund:"Unter der Sanduhr liegt:"},
{name:"Bild der Kapitänin",x:1420,y:230,wand:true,by:-95,zeichne:bild,fund:"Hinter dem Bild klebt:"}
],
infoObjekte:[
{name:"Bücherbord",x:1200,y:230,wand:true,by:-60,zeichne:buecherbord,fund:"Zwischen den Büchern steckt:"},
{name:"Logbuch auf dem Pult",x:1500,boden:580,fuss:4,by:-145,zeichne:pult,fund:"Im Logbuch liegt:"},
{name:"Globus",x:640,boden:740,fuss:4,by:-135,zeichne:globus,fund:"Am Globus klebt:"}
]},
{titel:"Das Oberdeck",
intro:"Endlich an der frischen Luft! Auf dem Oberdeck geht gerade die Sonne unter, der Wind bläht das Segel. Hinter der letzten Tür wartet das Beiboot zur Schatzinsel – öffnet das letzte Schloss!",
introDu:"Endlich an der frischen Luft! Auf dem Oberdeck geht gerade die Sonne unter, der Wind bläht das Segel. Hinter der letzten Tür wartet das Beiboot zur Schatzinsel – öffne das letzte Schloss!",
tuerX:1300,
hintergrund:()=>`${defs('#b07a44','#5a3418','#ffb070')}<defs><linearGradient id="abend" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a7a"/><stop offset=".5" stop-color="#d86a6a"/><stop offset="1" stop-color="#ffc070"/></linearGradient></defs><rect width="1600" height="470" fill="url(#abend)"/><circle cx="480" cy="340" r="170" fill="url(#licht)"/><circle cx="480" cy="340" r="60" fill="#ffe08a"/><rect y="340" width="1600" height="130" fill="#3a4a7a"/><path d="M400 356H560M430 372H530M340 390H620" stroke="#ffb070" stroke-width="4" opacity=".7"/><g fill="#f8b8a8" opacity=".8"><ellipse cx="200" cy="90" rx="70" ry="16"/><ellipse cx="240" cy="76" rx="40" ry="14"/><ellipse cx="1040" cy="110" rx="80" ry="16"/><ellipse cx="1320" cy="60" rx="70" ry="14"/></g><path d="M130 170q10-8 20 0q10-8 20 0M1060 170q8-6 16 0q8-6 16 0" stroke="#3a2a4a" stroke-width="3" fill="none"/><rect y="380" width="1600" height="14" fill="#5a3418"/><path d="${[...Array(40)].map((_,k)=>`M${k*40+20} 394V470`).join('')}" stroke="#5a3418" stroke-width="8"/><path d="M700 0L450 384M700 0L950 384M700 60L540 384M700 60L860 384" stroke="#3a2010" stroke-width="3"/><rect x="684" y="0" width="32" height="470" fill="#6b3f1f"/><path d="M500 30H900" stroke="#4a2a14" stroke-width="12" stroke-linecap="round"/><path d="M510 36H890Q905 140 870 230Q700 262 530 230Q495 140 510 36Z" fill="#f4ead0" stroke="#b8a888" stroke-width="3"/><rect x="1140" y="120" width="320" height="350" fill="#7a4a24"/>${steine(1140,1460,120,470,30,320,'rgba(0,0,0,.28)')}<rect x="1124" y="104" width="352" height="20" rx="4" fill="#4a2a14"/>${boden()}`,
objekte:[
{name:"Steuerrad",x:1040,boden:610,fuss:4,by:-250,zeichne:steuerrad,fund:"Am Steuerrad hängt:"},
{name:"Papageienstange",x:260,boden:640,fuss:4,by:-245,zeichne:papageienstange,fund:"Der Papagei lässt etwas fallen:"},
{name:"Fernrohr",x:520,boden:720,fuss:4,by:-135,zeichne:fernrohr,fund:"Im Fernrohr steckt:"},
{name:"Kompass",x:800,boden:570,fuss:4,by:-145,zeichne:kompass,fund:"Unter dem Kompass liegt:"},
{name:"Schiffsglocke",x:1000,y:280,wand:true,by:-85,zeichne:glocke,fund:"In der Glocke klingelt etwas:"}
],
infoObjekte:[
{name:"Flagge mit Papagei",x:300,y:220,wand:true,by:-100,zeichne:flagge,fund:"An der Flagge hängt:"},
{name:"Rettungsring",x:1520,boden:700,fuss:4,by:-100,zeichne:rettungsring,fund:"Am Rettungsring hängt:"},
{name:"Kiste mit Signalflaggen",x:110,boden:520,fuss:4,by:-125,zeichne:flaggenkiste,fund:"Zwischen den Flaggen steckt:"}
]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="inselhimmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ab8e8"/><stop offset="1" stop-color="#fde8b8"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#inselhimmel)"/><circle cx="760" cy="150" r="80" fill="#fff6c8" opacity=".45"/><circle cx="760" cy="150" r="50" fill="#fff6c8"/>
   <rect y="330" width="1000" height="270" fill="#2f9ac8"/><path d="M220 360q15-8 30 0t30 0M600 350q15-8 30 0t30 0M680 390q15-8 30 0t30 0" stroke="#bfe8f8" stroke-width="3" fill="none"/>
   <path d="M0 600V440Q260 380 540 420Q800 450 1000 410V600Z" fill="#f2d79a"/><path d="M0 446Q260 386 540 426Q800 456 1000 416" stroke="#fff" stroke-width="6" fill="none" opacity=".7"/>
   ${palme(640,450,1.2)}${palme(760,440,.9)}${palme(260,425,1)}
   <g transform="translate(330 505)"><path d="M-80 -30H80Q70 0 40 6H-40Q-70 0 -80 -30Z" fill="#a33b22" stroke="#5a1a10" stroke-width="3"/><path d="M-80 -30H80" stroke="#f4ead0" stroke-width="6"/><path d="M-60 -16H60" stroke="#6b3a1c" stroke-width="5"/><path d="M-96 -46L76 -24" stroke="#8a5a2a" stroke-width="6" stroke-linecap="round"/><ellipse cx="82" cy="-23" rx="16" ry="6" fill="#8a5a2a" transform="rotate(7 82 -23)"/></g>
   <path d="M610 515L636 535M636 515L610 535" stroke="#a33b22" stroke-width="6" stroke-linecap="round"/><g transform="translate(730 530) scale(.6)">${truhe('#7a3a1a','#e0b040')}</g>
   <path d="M0 0H1000V600H0Z M170 600V150Q170 90 230 90H770Q830 90 830 150V600Z" fill="#3a2414" fill-rule="evenodd"/><path d="M0 40H1000M0 160H162M0 280H162M0 400H162M0 520H162M838 160H1000M838 280H1000M838 400H1000M838 520H1000" stroke="#24160a" stroke-width="4"/><path d="M170 600V150Q170 90 230 90H770Q830 90 830 150V600" stroke="#8a5a30" stroke-width="16" fill="none"/>`
};
})();