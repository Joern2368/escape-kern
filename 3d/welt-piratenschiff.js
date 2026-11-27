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
const GF=['#c0392b','#e8a33a','#3f8a3a','#8a4a2a','#d8c040'];
const seemannskiste=()=>`${truhe('#3a5a8a','#c9a26a')}<path d="M-60 -46Q-74 -38 -60 -28M60 -46Q74 -38 60 -28" stroke="#c9b48a" stroke-width="5" fill="none"/><use href="#sym-anker" x="-30" y="-36" width="22" height="22" color="#f4ead0"/>`;
const sturmlaterne=()=>`${schatten(28,4)}<circle cx="0" cy="-60" r="80" fill="url(#licht)"/><g transform="translate(0 -104) scale(1.6)">${lampe(0,0)}</g>`;
const seesack=()=>sack('#e0d4b0',`<path d="M-46 -40H46" stroke="#2a4a7a" stroke-width="8"/><use href="#sym-anker" x="-16" y="-80" width="32" height="32" color="#2a4a7a"/>`);
const eimer=()=>`${schatten(40,4)}<path d="M8 -70L44 -170" stroke="#c9965a" stroke-width="7" stroke-linecap="round"/><path d="M-30 -64Q0 -110 30 -64" stroke="#555" stroke-width="3" fill="none"/><path d="M-30 -66L-24 0H24L30 -66Z" fill="#9a6a3a" stroke="#4a2a12" stroke-width="3"/><path d="M-29 -50H29M-25 -14H25" stroke="#555" stroke-width="5"/><ellipse cx="0" cy="-66" rx="30" ry="8" fill="#6ab0d8" stroke="#4a2a12" stroke-width="3"/><circle cx="-12" cy="-74" r="6" fill="#fff" opacity=".8"/><circle cx="-2" cy="-78" r="4" fill="#fff" opacity=".8"/>`;
const haengematte=()=>`<g transform="translate(0 -45)">${matte(120,'#e8dcb8')}<ellipse cx="-46" cy="44" rx="20" ry="9" fill="#fff" stroke="#b8a888"/></g>`;
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
const ladeliste=()=>`<rect x="-50" y="-66" width="100" height="132" rx="6" fill="#8a5a2a" stroke="#3a2010" stroke-width="3"/><rect x="-40" y="-52" width="80" height="108" fill="#f4ecd8"/><rect x="-16" y="-72" width="32" height="14" rx="3" fill="#888"/><path d="M-30 -30H30M-30 -8H30M-30 14H30M-30 36H10" stroke="#6b5a3a" stroke-width="3"/>`;
const buecherbord=()=>`${GF.map((c,k)=>`<rect x="${-70+k*28}" y="${-40+(k%2)*10}" width="24" height="${65-(k%2)*10}" fill="${c}" stroke="#333" stroke-width="2"/>`).join('')}<path d="M-84 30H84" stroke="#4a2a14" stroke-width="10"/>`;
const pult=()=>`${schatten(36,4)}<path d="M-24 0H24M0 0V-100" stroke="#4a2a14" stroke-width="8"/><g transform="translate(0 -108) rotate(-12)"><rect x="-46" y="-6" width="92" height="12" fill="#6b3a1c"/><path d="M-40 -6Q-20 -16 0 -8Q20 -16 40 -6V-14Q20 -24 0 -16Q-20 -24 -40 -14Z" fill="#f4ecd8" stroke="#7a1f28" stroke-width="2"/></g>`;
const globus=()=>`${schatten(34,4)}<path d="M-24 0H24M0 0V-40" stroke="#4a2a14" stroke-width="7"/><circle cx="0" cy="-80" r="38" fill="#3f8fbf" stroke="#6b4a1c" stroke-width="3"/><path d="M-26 -96Q-10 -110 6 -96Q0 -80 -18 -78ZM6 -70Q24 -76 28 -60Q14 -48 4 -56Z" fill="#a8c878"/><path d="M-30 -112A44 44 0 0 0 30 -48" stroke="#d8a73a" stroke-width="5" fill="none"/>`;
const rettungsring=()=>`${schatten(40,4)}<circle cy="-46" r="36" fill="none" stroke="#f4ead0" stroke-width="18"/><circle cy="-46" r="36" fill="none" stroke="#c0392b" stroke-width="18" stroke-dasharray="28.3 28.3"/>`;
const flaggenkiste=()=>`${schatten(46,4)}<path d="M-30 -40V-100M10 -40V-110" stroke="#6b3f1f" stroke-width="4"/><path d="M-30 -100H0V-78H-30Z" fill="#f2d03a"/><path d="M10 -110H44L30 -98L44 -86H10Z" fill="#2a6aa8"/>${kasten(90,50)}`;
const palme=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0Q-8 -70 16 -130" stroke="#8a5a2a" stroke-width="13" fill="none" stroke-linecap="round"/>${[-170,-135,-95,-50,-10,25,155].map(a=>`<ellipse cx="44" cy="0" rx="46" ry="11" fill="#3f9a4a" transform="translate(16 -130) rotate(${a})"/>`).join('')}<circle cx="10" cy="-124" r="7" fill="#6b4a24"/><circle cx="22" cy="-122" r="7" fill="#6b4a24"/></g>`;
const muschelhaufen=()=>`${schatten(66,4)}${[[-38,-4,1,'#f4b8c8'],[34,-2,.9,'#f8e8c8'],[0,-14,1.2,'#f0c8a0']].map(([x,y,s,c])=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0L-22 -24Q-22 -50 0 -50Q22 -50 22 -24Z" fill="${c}" stroke="#a8786a" stroke-width="3"/><path d="M0 0L-12 -46M0 0V-50M0 0L12 -46" stroke="#a8786a" stroke-width="2"/></g>`).join('')}`;
const kokosnuesse=()=>`${schatten(56,4)}${[[-30,-16],[28,-16],[0,-42]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="20" fill="#6b4a24" stroke="#3a2610" stroke-width="3"/><circle cx="${x-6}" cy="${y-4}" r="2.5" fill="#2a1608"/><circle cx="${x+5}" cy="${y-4}" r="2.5" fill="#2a1608"/><circle cx="${x}" cy="${y+5}" r="2.5" fill="#2a1608"/>`).join('')}<path d="M44 -6Q60 -26 76 -6Z" fill="#f4f0e0" stroke="#6b4a24" stroke-width="3"/>`;
const treibholz=()=>`${schatten(80,4)}<path d="M-72 -10Q-62 -36 -20 -32L60 -28Q82 -26 78 -8Q72 2 40 0L-60 0Q-76 0 -72 -10Z" fill="#b8a080" stroke="#6b5a40" stroke-width="3"/><path d="M-50 -14Q-10 -22 30 -14M-30 -6Q10 -10 50 -6" stroke="#8a7658" stroke-width="2" fill="none"/><path d="M20 -32L26 -46L34 -34L48 -36L38 -26L44 -14L30 -22L16 -14L22 -26L8 -34Z" fill="#e8843a" stroke="#a8501a" stroke-width="2"/>`;
const spaten=()=>`${schatten(50,4)}<path d="M-50 2Q-20 -24 0 -22Q24 -24 50 2Z" fill="#e8c880" stroke="#b8965a" stroke-width="2"/><g transform="rotate(-12 0 -10)"><path d="M0 -12V-140" stroke="#8a5a2a" stroke-width="9" stroke-linecap="round"/><path d="M-18 -140H18" stroke="#6b3f1f" stroke-width="9" stroke-linecap="round"/><path d="M-12 -12H12L16 -52Q0 -64 -16 -52Z" fill="#9aa0a8" stroke="#5a6068" stroke-width="3" transform="translate(0 40)"/></g>`;
const holzschild=()=>`<path d="M0 24V220" stroke="#6b3f1f" stroke-width="16"/><path d="M-70 -40H70L90 -8L70 24H-70Z" fill="#a87a44" stroke="#4a2a12" stroke-width="4"/><path d="M-60 -22H60M-60 4H50" stroke="#6b4a24" stroke-width="3"/><use href="#sym-anker" x="-22" y="-34" width="44" height="44" color="#4a2a12"/>`;
const felsentafel=()=>`<path d="M-48 -84Q-52 -94 -30 -96H34Q54 -94 50 -82L56 170H-52Z" fill="#9a9488" stroke="#4a463e" stroke-width="4"/><path d="M-30 -60H30M-30 -36H34M-30 -12H20M-30 12H30" stroke="#5a564e" stroke-width="4" stroke-linecap="round"/><path d="M-70 170Q0 130 70 170Z" fill="#e8c880"/>`;
const wrackkiste=()=>`${schatten(66,4)}<g transform="rotate(-8)"><rect x="-54" y="-58" width="108" height="56" fill="#8a6a3a" stroke="#4a2a12" stroke-width="3"/><path d="M-54 -38H54M-54 -20H54" stroke="#4a2a12" stroke-width="2"/><path d="M-54 -58L-62 -76M-20 -58L-14 -80M30 -58L38 -72" stroke="#6b4a24" stroke-width="6" stroke-linecap="round"/></g><path d="M-70 0Q0 -20 70 0Z" fill="#e8c880" opacity=".9"/>`;
const tagebuch=()=>`${schatten(56,4)}<path d="M-50 -6L0 -16L50 -6L46 -28L0 -40L-46 -28Z" fill="#f4ecd8" stroke="#6b3a14" stroke-width="3"/><path d="M0 -16V-40M-34 -24L-8 -30M-32 -16L-6 -22M8 -30L34 -24M8 -22L32 -16" stroke="#8a7a5a" stroke-width="2"/><path d="M-50 -6L-52 0L0 -10L52 0L50 -6" fill="#a33b22" stroke="#6b1a10" stroke-width="2"/><path d="M30 -34Q60 -58 70 -80Q52 -60 24 -36Z" fill="#c0392b" stroke="#7a1a10" stroke-width="2"/>`;
const glanz=(x,y,r)=>`<path d="M${x} ${y-r}L${x+r*.25} ${y-r*.25}L${x+r} ${y}L${x+r*.25} ${y+r*.25}L${x} ${y+r}L${x-r*.25} ${y+r*.25}L${x-r} ${y}L${x-r*.25} ${y-r*.25}Z" fill="#fff6c0"/>`;
const schlossPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>${d}`;};
const ankerOben=y=>`<use href="#sym-anker" x="474" y="${y}" width="52" height="52" color="#d8a73a"/>`;
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out}.tuer.offen #lukd{transform:scaleY(.1)}.tuer #leit{transform:scaleY(.04);transition:transform 1.6s ease-out .7s}.tuer.offen #leit{transform:scaleY(1)}.tuer.offen #kiw{transform:translateX(-230px)}.tuer.offen #flL{transform:scaleX(.12)}.tuer.offen #flR{transform:scaleX(.12)}.tuer.offen #gat{transform:scaleX(.1)}.tuer #rlei{opacity:0;transition:opacity 1s ease-in .9s}.tuer.offen #rlei{opacity:1}.tuer.offen #fels{transform:translateX(250px) rotate(240deg)}@keyframes wipp{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(5px) rotate(2deg)}}.tuer #boot{transform-origin:500px 456px;animation:wipp 3s ease-in-out infinite}</style>`;
function tuerLuke(n){
let st='';for(let k=0;k<10;k++)st+=`<path d="M472 ${200+k*30}H528" stroke="#b8965a" stroke-width="6" stroke-linecap="round"/>`;
return`<rect x="400" y="50" width="200" height="154" rx="6" fill="#3a2210" stroke="#1e1006" stroke-width="4"/>
   <rect x="414" y="64" width="172" height="126" fill="#9fd0ec"/><circle cx="548" cy="102" r="20" fill="#fff6c8"/><path d="M430 150q16-14 34 0q18-12 32 2" fill="#fff" opacity=".9"/>
   <g id="leit" class="tb" style="transform-origin:500px 190px"><path d="M472 190V500M528 190V500" stroke="#c9b48a" stroke-width="5"/>${st}</g>
   <g id="lukd" class="tb" style="transform-origin:500px 64px"><rect x="414" y="64" width="172" height="126" fill="#7f4e26" stroke="#3a2010" stroke-width="4"/><path d="M450 64V190M486 64V190M522 64V190M558 64V190" stroke="#3a2010" stroke-width="3"/><path d="M414 92H586M414 162H586" stroke="#3a3a40" stroke-width="9"/>${ankerOben(76)}${schlossPl(n,148)}</g>
   <ellipse cx="500" cy="196" rx="30" ry="7" fill="#c9b48a" stroke="#6b5a3a" stroke-width="2"/>`;
}
function tuerKistenwand(n){
let k='';const f=['','rgba(0,0,0,.12)','rgba(255,255,255,.1)'];let i=0;
for(const y of[470,400,330])for(const x of[430,500,570]){k+=`<g transform="translate(${x} ${y})">${kasten(70,70)}<rect x="-35" y="-70" width="70" height="70" fill="${f[i%3]||'none'}"/></g>`;i++;}
return`<rect x="388" y="246" width="224" height="224" fill="#0b120a"/><circle cx="500" cy="380" r="130" fill="url(#licht)"/><path d="M430 470V330Q500 290 570 330V470" fill="#16200f" stroke="#26341a" stroke-width="3"/>
   <rect x="380" y="240" width="240" height="14" fill="#3a2a14"/><rect x="380" y="240" width="14" height="230" fill="#3a2a14"/><rect x="606" y="240" width="14" height="230" fill="#3a2a14"/>
   <g id="kiw" class="tb">${k}<path d="M395 330H605M395 400H605" stroke="#5a3a1a" stroke-width="3"/>${ankerOben(270)}${schlossPl(n,365)}</g>`;
}
function tuerFenster(n){
return`<defs><linearGradient id="abendK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a7a"/><stop offset=".55" stop-color="#d86a6a"/><stop offset="1" stop-color="#ffc070"/></linearGradient></defs>
   <path d="M388 470V236Q388 150 500 150Q612 150 612 236V470Z" fill="#4a2a14" stroke="#2a1408" stroke-width="5"/>
   <path d="M402 470V240Q402 168 500 168Q598 168 598 240V470Z" fill="url(#abendK)"/><circle cx="500" cy="352" r="38" fill="#ffe08a"/><path d="M402 360H598V470H402Z" fill="#3a4a7a"/><path d="M430 380H570M450 398H550M418 420H582" stroke="#ffb070" stroke-width="4" opacity=".7"/><path d="M402 440H598" stroke="#5a3418" stroke-width="10"/>
   <g id="flL" class="tb" style="transform-origin:402px 330px"><path d="M402 470V240Q402 168 500 168V470Z" fill="#cfe8f4" fill-opacity=".3" stroke="#4a2a14" stroke-width="6"/><path d="M402 300H500M402 380H500M450 168V470" stroke="#4a2a14" stroke-width="4"/></g>
   <g id="flR" class="tb" style="transform-origin:598px 330px"><path d="M598 470V240Q598 168 500 168V470Z" fill="#cfe8f4" fill-opacity=".3" stroke="#4a2a14" stroke-width="6"/><path d="M598 300H500M598 380H500M550 168V470" stroke="#4a2a14" stroke-width="4"/></g>
   <path d="M372 140H394Q416 300 396 470H370Z" fill="#a8302e" stroke="#5a1a18" stroke-width="3"/><path d="M628 140H606Q584 300 604 470H630Z" fill="#a8302e" stroke="#5a1a18" stroke-width="3"/>
   <rect x="440" y="104" width="120" height="44" rx="6" fill="#3a2010"/>${ankerOben(52)}${schlossPl(n,126)}`;
}
function tuerReling(n){
let b='';for(let x=418;x<=586;x+=24)b+=`<path d="M${x} 386V452" stroke="#7f4e26" stroke-width="9"/>`;
return`<rect x="404" y="340" width="192" height="130" fill="#2f5a8a"/><path d="M404 340H596" stroke="#3a4a7a" stroke-width="2"/><path d="M416 372q10-5 20 0t20 0M540 400q10-5 20 0t20 0M430 424q10-5 20 0t20 0" stroke="#8fb8e0" stroke-width="3" fill="none"/>
   <path d="M518 342Q552 320 588 342Z" fill="#3f8a4a"/><path d="M556 330Q554 318 560 312" stroke="#6b4a24" stroke-width="3" fill="none"/><ellipse cx="560" cy="310" rx="9" ry="3" fill="#3f9a4a"/>
   <g id="boot"><path d="M438 438H562Q548 468 520 470H480Q452 468 438 438Z" fill="#a33b22" stroke="#5a1a10" stroke-width="3"/><path d="M442 448H558" stroke="#f4ead0" stroke-width="4"/><path d="M458 436L410 464M542 436L590 464" stroke="#8a5a2a" stroke-width="5" stroke-linecap="round"/></g>
   <g id="rlei"><path d="M482 386V446M518 386V446" stroke="#c9b48a" stroke-width="4"/>${[398,414,430].map(y=>`<path d="M482 ${y}H518" stroke="#b8965a" stroke-width="5" stroke-linecap="round"/>`).join('')}</g>
   <rect x="392" y="296" width="14" height="174" fill="#5a3418" stroke="#2a1608" stroke-width="2"/><rect x="594" y="296" width="14" height="174" fill="#5a3418" stroke="#2a1608" stroke-width="2"/>
   <g id="gat" class="tb" style="transform-origin:404px 400px"><rect x="404" y="372" width="192" height="14" rx="3" fill="#7f4e26" stroke="#3a2010" stroke-width="3"/><rect x="404" y="452" width="192" height="14" rx="3" fill="#7f4e26" stroke="#3a2010" stroke-width="3"/>${b}<rect x="470" y="314" width="60" height="58" rx="4" fill="#3a2010"/>${ankerOben(318)}${schlossPl(n,419)}</g>`;
}
function tuerHoehle(n){
return`<path d="M300 470Q300 140 500 140Q700 140 700 470Z" fill="#7a6a5a" stroke="#3a2e24" stroke-width="5"/>
   <path d="M330 400Q380 360 340 300M670 420Q620 360 660 290M430 180Q470 200 440 240M580 190Q540 230 570 260M360 250Q400 230 420 200" stroke="#4a3e34" stroke-width="4" fill="none"/>
   <path d="M410 470V300Q410 230 500 230Q590 230 590 300V470Z" fill="#0e0a08"/><circle cx="500" cy="420" r="70" fill="#ffd860" opacity=".22"/><circle cx="470" cy="450" r="5" fill="#ffd860"/><circle cx="530" cy="440" r="4" fill="#ffd860"/>
   <g id="fels" class="tb" style="transform-origin:500px 372px"><circle cx="500" cy="372" r="100" fill="#9a8a78" stroke="#4a3e34" stroke-width="5"/><path d="M430 320Q470 340 450 380M560 330Q540 370 580 400M470 430Q500 410 530 440" stroke="#6a5e50" stroke-width="4" fill="none"/><circle cx="440" cy="400" r="14" fill="#5a8a4a" opacity=".6"/><use href="#sym-schatzkarte" x="474" y="292" width="52" height="52" color="#e8c45a"/>${schlossPl(n,400)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'luke';
const arten={luke:[tuerLuke,'Luke mit Zahlenschloss'],kistenwand:[tuerKistenwand,'Kistenwand mit Zahlenschloss'],fenster:[tuerFenster,'Fenstertür mit Zahlenschloss'],reling:[tuerReling,'Reling-Tor mit Zahlenschloss'],hoehle:[tuerHoehle,'Höhleneingang mit Zahlenschloss']};
const a=arten[art]||arten.luke;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
SZENARIEN.piratenschiff={
name:"Das Piratenschiff",
symbole:["anker","steuerrad","papagei","muschel","schatzkarte"],
symbolNamen:["Anker","Steuerrad","Papagei","Muschel","Schatzkarte"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M8 80q13-7 26 0t26 0t26 0t26 0" stroke="#3f8fbf" stroke-width="4" fill="none"/><path d="M12 56H108L94 74H26Z" fill="#8a5a2a" stroke="#4a2a12" stroke-width="3"/><path d="M60 56V8" stroke="#4a2a12" stroke-width="4"/><path d="M63 14Q88 30 63 50Z" fill="#f4ead0" stroke="#8a7a5a" stroke-width="2"/><path d="M57 18Q36 32 57 50Z" fill="#f4ead0" stroke="#8a7a5a" stroke-width="2"/><path d="M60 8L78 12L60 16" fill="#a33b22"/><use href="#sym-papagei" x="86" y="22" width="28" height="28" color="#3fa84a"/></svg>`,
texte:{
einleitung:"Ahoi! Ihr seid an Bord eines alten Piratenschiffs. Kapitänin Rotbart hat alle Wege verschlossen – und oben an Deck wartet das Beiboot zur Schatzinsel! Jeder Weg ist mit einem Zahlenschloss gesichert. Untersucht die Gegenstände auf dem Schiff. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zum Schatz?",
startKnopf:"An Bord gehen",
hinweisGeber:"Der Papagei krächzt:",
richtig:"Richtig gelöst – ahoi!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Der Papagei schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Kapitänin",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeritzt. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt versperrt. Überprüft eure Ziffern!",
zeitUmTitel:"Die Sanduhr ist abgelaufen!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und das Beiboot trotzdem noch erreichen!",
geschafft:"Schatz gefunden!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und seid mit dem Beiboot zur Schatzinsel gerudert – dort habt ihr den Schatz gefunden! Kapitänin Rotbart winkt euch fröhlich zu!"
},
texteDu:{
einleitung:"Ahoi! Du bist an Bord eines alten Piratenschiffs. Kapitänin Rotbart hat alle Wege verschlossen – und oben an Deck wartet das Beiboot zur Schatzinsel! Jeder Weg ist mit einem Zahlenschloss gesichert. Untersuche die Gegenstände auf dem Schiff. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zum Schatz?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Der Papagei schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingeritzt. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt versperrt. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und das Beiboot trotzdem noch erreichen!",
geschafft:"Schatz gefunden!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und bist mit dem Beiboot zur Schatzinsel gerudert – dort hast du den Schatz gefunden! Kapitänin Rotbart winkt dir fröhlich zu!"
},
einfach:{
name:"Das Piratenschiff",
symbolNamen:["Anker","Steuerrad","Papagei","Muschel","Karte"],
texte:{
einleitung:"Ihr seid auf einem alten Piratenschiff. Die Kapitänin heißt Rotbart. Sie hat alle Wege zugeschlossen! An jedem Weg hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Oben auf dem Schiff wartet ein kleines Boot. Damit fahrt ihr zur Schatzinsel!",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr seid mit dem kleinen Boot zur Schatzinsel gefahren. Dort habt ihr den Schatz gefunden!"
},
texteDu:{
einleitung:"Du bist auf einem alten Piratenschiff. Die Kapitänin heißt Rotbart. Sie hat alle Wege zugeschlossen! An jedem Weg hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Oben auf dem Schiff wartet ein kleines Boot. Damit fährst du zur Schatzinsel!",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Schatz gefunden!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du bist mit dem kleinen Boot zur Schatzinsel gefahren. Dort hast du den Schatz gefunden!"
},
raeume:[
{titel:"Der Schlafraum",intro:"Hier schlafen die Leute vom Schiff. Sie schlafen in Hängematten. Durch die runden Fenster seht ihr das Meer. Hier sind die Zahlen für das Schloss an der Luke in der Decke versteckt.",introDu:"Hier schlafen die Leute vom Schiff. Sie schlafen in Hängematten. Durch die runden Fenster siehst du das Meer. Hier sind die Zahlen für das Schloss an der Luke in der Decke versteckt.",
objekte:[{name:"Kiste",fund:"In der Kiste liegt:"},{name:"Laterne",fund:"Unter der Laterne liegt:"},{name:"Tasche aus Stoff",fund:"In der Tasche steckt:"},{name:"Eimer",fund:"Im Eimer liegt:"},{name:"Hängematte",fund:"In der Hängematte liegt:"}],
infoObjekte:[{name:"Tafel mit Knoten",fund:"Hinter der Tafel steckt:"},{name:"Hocker mit Heft",fund:"Im Heft liegt:"},{name:"Schüssel zum Waschen",fund:"Unter der Schüssel liegt:"}]},
{titel:"Der Lagerraum",intro:"Hier unten ist es dunkel. Hier liegen Kisten, Säcke und Netze. Ein grünes Licht leuchtet. Sucht gut! Eine Wand aus Kisten versperrt den Gang.",introDu:"Hier unten ist es dunkel. Hier liegen Kisten, Säcke und Netze. Ein grünes Licht leuchtet. Such gut! Eine Wand aus Kisten versperrt den Gang.",
objekte:[{name:"Kiste mit Bananen",fund:"Zwischen den Bananen liegt:"},{name:"Anker",fund:"Am Anker hängt:"},{name:"Flasche mit Brief",fund:"In der Flasche steckt ein Brief:"},{name:"Sack mit Kartoffeln",fund:"Zwischen den Kartoffeln liegt:"},{name:"Netz",fund:"Im Netz hängt:"}],
infoObjekte:[{name:"Liste an der Wand",fund:"An der Liste klemmt:"},{name:"Fass mit Wasser",fund:"Auf dem Fass liegt:"},{name:"Dickes Seil",fund:"Im Seil steckt:"}]},
{titel:"Das Zimmer der Kapitänin",intro:"Das ist das Zimmer der Kapitänin. Am großen Fenster hängen rote Vorhänge. Auf dem Tisch liegt eine Karte. Die Tür zum Fenster hinten ist zu.",
objekte:[{name:"Tisch mit Karte",fund:"Auf der Karte steht:"},{name:"Schatzkiste",fund:"In der Kiste glitzert:"},{name:"Hut der Kapitänin",fund:"Im Hut steckt:"},{name:"Sanduhr",fund:"Unter der Sanduhr liegt:"},{name:"Bild der Kapitänin",fund:"Hinter dem Bild klebt:"}],
infoObjekte:[{name:"Brett mit Büchern",fund:"Zwischen den Büchern steckt:"},{name:"Buch auf dem Pult",fund:"Im Buch liegt:"},{name:"Erdkugel",fund:"An der Erdkugel klebt:"}]},
{titel:"Oben auf dem Schiff",intro:"Ihr seid oben auf dem Schiff. Die Sonne geht unter. Hinter dem Geländer wartet das kleine Boot. Öffnet das Schloss am Tor!",introDu:"Du bist oben auf dem Schiff. Die Sonne geht unter. Hinter dem Geländer wartet das kleine Boot. Öffne das Schloss am Tor!",
objekte:[{name:"Steuerrad",fund:"Am Steuerrad hängt:"},{name:"Papagei",fund:"Der Papagei lässt etwas fallen:"},{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Kompass",fund:"Unter dem Kompass liegt:"},{name:"Glocke",fund:"In der Glocke hängt:"}],
infoObjekte:[{name:"Fahne mit Papagei",fund:"An der Fahne hängt:"},{name:"Ring zum Schwimmen",fund:"Am Ring hängt:"},{name:"Kiste mit Fahnen",fund:"Zwischen den Fahnen steckt:"}]},
{titel:"Die Schatz-Insel",intro:"Ihr seid auf der Schatz-Insel. Hier stehen Palmen. Am Strand liegen Muscheln. Im Fels ist eine Höhle. Ein großer Stein ist davor. Findet die letzten Zahlen!",introDu:"Du bist auf der Schatz-Insel. Hier stehen Palmen. Am Strand liegen Muscheln. Im Fels ist eine Höhle. Ein großer Stein ist davor. Finde die letzten Zahlen!",
objekte:[{name:"Muschel-Haufen",fund:"Unter den Muscheln liegt:"},{name:"Kokosnüsse",fund:"In einer Kokosnuss steckt:"},{name:"Holz mit Seestern",fund:"Unter dem Seestern klebt:"},{name:"Alter Spaten",fund:"Im Sand steckt:"},{name:"Schild mit Anker",fund:"Hinter dem Schild steckt:"}],
infoObjekte:[{name:"Stein mit Schrift",fund:"In einer Ritze steckt:"},{name:"Kaputte Kiste",fund:"In der Kiste liegt:"},{name:"Buch im Sand",fund:"Im Buch liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Unterdeck",
intro:"Ihr wacht im Unterdeck auf. Hier schlafen die Matrosen in schaukelnden Hängematten. Durch die Bullaugen seht ihr das Meer, eine Laterne gibt warmes Licht. Irgendwo hier sind die Ziffern für das Schloss an der Luke in der Decke versteckt …",
introDu:"Du wachst im Unterdeck auf. Hier schlafen die Matrosen in schaukelnden Hängematten. Durch die Bullaugen siehst du das Meer, eine Laterne gibt warmes Licht. Irgendwo hier sind die Ziffern für das Schloss an der Luke in der Decke versteckt …",
tuerX:880,tuerArt:"luke",
hintergrund:()=>`${defs('#8a5a30','#3a2210','#ffc870')}${wand('#8a5632',34,320)}${balken([60,600,1000,1540],'#4a2c14')}${bullauge(250,300,40,'#ffd8a0','#3a7aa8')}${bullauge(1420,300,40,'#ffd8a0','#3a7aa8')}<g transform="translate(330 44)">${matte(250,'#cdbf98')}</g><g transform="translate(1270 44)">${matte(250,'#b8c8a0')}</g>${boden()}${laterne(700,40)}`,
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
{titel:"Der Laderaum",
intro:"Im Laderaum ist es dunkel und feucht. Hier lagern Kisten, Säcke und Netze für die lange Reise. Ein grünes Licht flackert. Sucht gut – die Ziffern sind gut versteckt! Eine Wand aus Kisten versperrt den Gang.",
introDu:"Im Laderaum ist es dunkel und feucht. Hier lagern Kisten, Säcke und Netze für die lange Reise. Ein grünes Licht flackert. Such gut – die Ziffern sind gut versteckt! Eine Wand aus Kisten versperrt den Gang.",
tuerX:220,tuerArt:"kistenwand",
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
intro:"Ihr habt die Kapitänskajüte erreicht! Rote Vorhänge hängen am großen Heckfenster, auf dem Tisch liegt eine Seekarte. Hier plant Kapitänin Rotbart ihre Reisen. Die Fenstertür zum Heck ist fest verschlossen.",
introDu:"Du hast die Kapitänskajüte erreicht! Rote Vorhänge hängen am großen Heckfenster, auf dem Tisch liegt eine Seekarte. Hier plant Kapitänin Rotbart ihre Reisen. Die Fenstertür zum Heck ist fest verschlossen.",
tuerX:300,tuerArt:"fenster",
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
intro:"Endlich an der frischen Luft! Auf dem Oberdeck geht gerade die Sonne unter, der Wind bläht das Segel. Hinter der Reling wartet das Beiboot, am Horizont liegt die Schatzinsel. Öffnet das Schloss am Reling-Tor – dann rudert ihr los!",
introDu:"Endlich an der frischen Luft! Auf dem Oberdeck geht gerade die Sonne unter, der Wind bläht das Segel. Hinter der Reling wartet das Beiboot, am Horizont liegt die Schatzinsel. Öffne das Schloss am Reling-Tor – dann rudern du los!",
tuerX:1300,tuerArt:"reling",
hintergrund:()=>`${defs('#b07a44','#5a3418','#ffb070')}<defs><linearGradient id="abend" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a7a"/><stop offset=".5" stop-color="#d86a6a"/><stop offset="1" stop-color="#ffc070"/></linearGradient></defs><rect width="1600" height="470" fill="url(#abend)"/><circle cx="480" cy="340" r="170" fill="url(#licht)"/><circle cx="480" cy="340" r="60" fill="#ffe08a"/><rect y="340" width="1600" height="130" fill="#3a4a7a"/><path d="M400 356H560M430 372H530M340 390H620" stroke="#ffb070" stroke-width="4" opacity=".7"/><g fill="#f8b8a8" opacity=".8"><ellipse cx="200" cy="90" rx="70" ry="16"/><ellipse cx="240" cy="76" rx="40" ry="14"/><ellipse cx="1040" cy="110" rx="80" ry="16"/><ellipse cx="1320" cy="60" rx="70" ry="14"/></g><path d="M130 170q10-8 20 0q10-8 20 0M1060 170q8-6 16 0q8-6 16 0" stroke="#3a2a4a" stroke-width="3" fill="none"/><rect y="380" width="1600" height="14" fill="#5a3418"/><path d="${[...Array(40)].map((_,k)=>`M${k*40+20} 394V470`).join('')}" stroke="#5a3418" stroke-width="8"/><path d="M700 0L450 384M700 0L950 384M700 60L540 384M700 60L860 384" stroke="#3a2010" stroke-width="3"/><rect x="684" y="0" width="32" height="470" fill="#6b3f1f"/><path d="M500 30H900" stroke="#4a2a14" stroke-width="12" stroke-linecap="round"/><path d="M510 36H890Q905 140 870 230Q700 262 530 230Q495 140 510 36Z" fill="#f4ead0" stroke="#b8a888" stroke-width="3"/>${boden()}`,
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
]},
{titel:"Die Schatzinsel",
intro:"Ihr seid mit dem Beiboot auf der Schatzinsel gelandet! Palmen wiegen sich im Wind, am Strand liegen Muscheln. Dort hinten im Fels ist der Eingang zur Schatzhöhle – doch ein riesiger Stein versperrt ihn. Findet die Ziffern für das letzte Schloss!",
introDu:"Du bist mit dem Beiboot auf der Schatzinsel gelandet! Palmen wiegen sich im Wind, am Strand liegen Muscheln. Dort hinten im Fels ist der Eingang zur Schatzhöhle – doch ein riesiger Stein versperrt ihn. Finde die Ziffern für das letzte Schloss!",
tuerX:1300,tuerArt:"hoehle",
hintergrund:()=>`${defs('#f0d89a','#b8965a','#fff0b0')}<defs><linearGradient id="himmelI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa8e0"/><stop offset=".7" stop-color="#bfe4f0"/><stop offset="1" stop-color="#fde8b8"/></linearGradient></defs><rect width="1600" height="470" fill="url(#himmelI)"/><circle cx="360" cy="140" r="110" fill="url(#licht)"/><circle cx="360" cy="140" r="52" fill="#fff6c8"/><g fill="#fff" opacity=".85"><ellipse cx="820" cy="90" rx="80" ry="16"/><ellipse cx="860" cy="76" rx="44" ry="14"/><ellipse cx="1180" cy="130" rx="70" ry="14"/></g><rect y="290" width="1600" height="120" fill="#2f9ac8"/><path d="M80 320q15-8 30 0t30 0M600 340q15-8 30 0t30 0M1000 316q15-8 30 0t30 0M300 380q15-8 30 0t30 0" stroke="#bfe8f8" stroke-width="3" fill="none"/><g transform="translate(760 300) scale(.55)"><path d="M-80 0H80L64 30H-64Z" fill="#8a5a2a" stroke="#4a2a12" stroke-width="3"/><path d="M0 0V-110" stroke="#4a2a12" stroke-width="5"/><path d="M4 -100Q50 -70 4 -20Z" fill="#f4ead0" stroke="#8a7a5a" stroke-width="3"/></g><rect y="398" width="1600" height="72" fill="#f2d79a"/><path d="M0 402Q200 392 400 402T800 402T1200 402T1600 402" stroke="#fff" stroke-width="6" fill="none" opacity=".7"/>${palme(110,440,1.7)}${palme(470,446,1.3)}${palme(930,440,1.5)}${palme(1560,440,1.2)}<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="M0 500Q300 480 600 500T1200 500T1600 496M0 600Q300 580 600 600T1200 600T1600 596M0 700Q300 680 600 700T1200 700T1600 696" stroke="rgba(150,110,50,.35)" stroke-width="4" fill="none"/>${[[200,540],[640,560],[980,520],[1220,620],[1500,560],[420,680]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#b8965a"/>`).join('')}`,
objekte:[
{name:"Muschelhaufen",x:300,boden:600,fuss:4,by:-70,zeichne:muschelhaufen,fund:"Unter den Muscheln liegt:"},
{name:"Kokosnüsse",x:640,boden:700,fuss:4,by:-70,zeichne:kokosnuesse,fund:"In einer Kokosnuss steckt:"},
{name:"Treibholz mit Seestern",x:880,boden:620,fuss:4,by:-60,zeichne:treibholz,fund:"Unter dem Seestern klebt:"},
{name:"Alter Spaten",x:1020,boden:730,fuss:4,by:-165,zeichne:spaten,fund:"Im Sand am Spaten steckt:"},
{name:"Holzschild mit Anker",x:520,y:250,wand:true,by:-70,zeichne:holzschild,fund:"Hinter dem Schild steckt:"}
],
infoObjekte:[
{name:"Felsentafel",x:160,y:300,wand:true,by:-125,zeichne:felsentafel,fund:"In einer Ritze der Felsentafel steckt:"},
{name:"Wrackkiste",x:1510,boden:590,fuss:4,by:-90,zeichne:wrackkiste,fund:"In der Wrackkiste liegt:"},
{name:"Tagebuch im Sand",x:780,boden:520,fuss:4,by:-55,zeichne:tagebuch,fund:"Im Tagebuch liegt:"}
]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><radialGradient id="glut"><stop offset="0" stop-color="#ffe680" stop-opacity=".9"/><stop offset="1" stop-color="#ffb030" stop-opacity="0"/></radialGradient><linearGradient id="hoehleG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1e18"/><stop offset="1" stop-color="#5a4434"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#hoehleG)"/><path d="M0 0H1000V110Q940 80 880 120Q800 60 720 112Q640 50 560 112Q480 60 400 114Q320 60 240 112Q160 70 90 118Q40 90 0 110Z" fill="#1e1410"/>
   ${[100,260,420,580,740,900].map((x,k)=>`<path d="M${x-22} ${90+k%2*12}L${x} ${150+k%3*20}L${x+22} ${90+k%2*12}Z" fill="#2a1e18"/>`).join('')}
   <path d="M0 440Q250 400 500 430T1000 420V600H0Z" fill="#4a3624"/>
   <circle cx="500" cy="370" r="330" fill="url(#glut)"/>
   <path d="M500 380L120 40M500 380L300 20M500 380L500 10M500 380L700 20M500 380L880 40" stroke="#fff2b0" stroke-width="22" opacity=".12"/>
   <path d="M280 470Q350 390 500 380Q650 390 720 470Z" fill="#e8b830" stroke="#a07818" stroke-width="3"/>
   <path d="M400 392L418 250Q500 218 582 250L600 392Z" fill="#4a2410" stroke="#2a1208" stroke-width="4"/><path d="M416 386L430 262Q500 238 570 262L584 386Z" fill="#8a4a22"/>
   <rect x="380" y="380" width="240" height="96" fill="#7a3a1a" stroke="#2a1208" stroke-width="4"/><path d="M380 380H620M380 428H620M430 380V476M570 380V476" stroke="#e0b040" stroke-width="7"/><rect x="484" y="420" width="32" height="30" rx="4" fill="#e0b040" stroke="#6b4a1c" stroke-width="3"/>
   <path d="M388 384Q440 330 500 336Q560 330 612 384Z" fill="#f0c840" stroke="#a07818" stroke-width="3"/>
   ${[[430,360,'#e03a3a'],[500,344,'#3a8ae0'],[560,362,'#3ac060'],[470,370,'#c050e0']].map(([x,y,c])=>`<path d="M${x-12} ${y}L${x} ${y-14}L${x+12} ${y}L${x} ${y+12}Z" fill="${c}" stroke="#fff" stroke-width="2"/>`).join('')}
   ${[[330,470],[690,468],[250,520],[760,520],[600,500],[400,510]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="15" ry="5" fill="#f0c840" stroke="#a07818" stroke-width="2"/>`).join('')}
   <path d="M300 440Q340 480 380 452" stroke="#f4ead0" stroke-width="5" fill="none"/>${[308,324,342,360,376].map((x,k)=>`<circle cx="${x}" cy="${452+Math.sin(k)*10+k%2*6}" r="5" fill="#f4ead0" stroke="#b8a888" stroke-width="1"/>`).join('')}
   ${glanz(350,330,18)}${glanz(660,320,22)}${glanz(500,290,26)}${glanz(250,420,14)}${glanz(740,410,16)}${glanz(600,230,14)}`
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
   treffer {x,y,z,b,h,t} (Tippfläche), name (Schild), schildOben [x,y,z], glanz [x,y,z], bewege(auf) (auf läuft von 0 bis 1) */
function ausgang(k,opt){
  const sc=k.scene, a=opt.treffer;
  const treffer=new THREE.Mesh(GEO.box,basis(0,{visible:false})); treffer.scale.set(a.b,a.h,a.t); treffer.position.set(a.x,a.y,a.z); sc.add(treffer);
  /* Bis Klasse 6 (einfache Sprache) darf der Ausgang einen leichteren Namen haben */
  const leicht=typeof CONFIG!=='undefined' && (typeof CONFIG.einfacheSprache==='boolean' ? CONFIG.einfacheSprache : parseInt(CONFIG.klasse,10)<=6);
  const schild=textSprite(leicht && opt.einfach ? opt.einfach : opt.name); schild.position.set(opt.schildOben[0],opt.schildOben[1],opt.schildOben[2]); schild.visible=false; sc.add(schild);
  const tuer={ steh:opt.steh, durch:opt.durch, tief:!!opt.tief, hoch:opt.hoch||0, treffer, schild, bereit:false, offen:false };
  const g=schein(sc,'rgba(255,225,120,.9)',opt.glanz[0],opt.glanz[1],opt.glanz[2],2.2); g.visible=false;
  let auf=0;
  k.anim.push((t,dt)=>{ g.visible=tuer.bereit; if(tuer.bereit){ const s=1.8+Math.sin(t*5)*.5; g.scale.set(s,s,1); } auf+=((tuer.offen?1:0)-auf)*Math.min(1,dt*2.5); opt.bewege(auf,t); });
  return tuer;
}

/* ===================================================================
   PIRATENSCHIFF in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei piratenschiff-raum<n>.js, die sich in RAEUME3D.piratenschiff[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, verschmelze, bild, schein, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.piratenschiff = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen */
const NEU=[
  [['Ziehharmonika','In der Ziehharmonika steckt:','Musik-Kasten','Im Musik-Kasten steckt:'],['Stiefelpaar','Im Stiefel liegt:','Zwei Stiefel','Im Stiefel liegt:']],
  [['Apfelkorb','Zwischen den Äpfeln liegt:','Korb mit Äpfeln','Im Korb liegt:'],['Tonkrug','Im Tonkrug liegt:','Großer Krug','Im Krug liegt:']],
  [['Schiffsmodell','Im kleinen Segel steckt:','Kleines Schiff','Am kleinen Schiff hängt:'],['Teekanne','Unter der Teekanne liegt:','Kanne für Tee','Unter der Kanne liegt:']],
  [['Angel','An der Angel hängt:','Angel für Fische','An der Angel hängt:'],['Liegestuhl','Auf dem Liegestuhl liegt:','Stuhl zum Liegen','Auf dem Stuhl liegt:']],
  [['Sandburg','In der Sandburg steckt:','Burg aus Sand','In der Burg steckt:'],['Floß','Auf dem Floß liegt:','Boot aus Holz','Im Boot liegt:']]
];
const SZP=SZENARIEN.piratenschiff;
/* Schreibfehler im 2D-Text für die 3D-Fassung berichtigen */
SZP.raeume.forEach(r=>{ if(r.introDu) r.introDu=r.introDu.split('rudern du').join('ruderst du'); });
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZP.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZP.einfach) SZP.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const SCHIFF = (function(){
const HOLZ=0x9a6a38, HOLZ2=0x6b421e, HOLZ3=0xb98a52, EISEN=0x3a3d44, MESSING=0xd8a73a, SEIL=0xd2b47a, ROT=0xb8342a, WEISS=0xf4ecd8, SAND=0xe8cf8e;

/* Planken-Bild, waagerecht. grund = [r,g,b] */
function holzBild(grund){
  const G=grund||[128,84,46];
  return bild(512,512,(g)=>{
    g.fillStyle='#24160c'; g.fillRect(0,0,512,512);
    /* je Reihe zwei Planken, die zusammen genau die Kachel füllen (keine sichtbare Naht beim Kacheln) */
    for(let r=0;r<8;r++){ const start=(r*197)%512, erste=210+(r*53)%100; let x=start;
      [erste,512-erste].forEach(w=>{ const h=Math.floor(zufall()*26)-13;
        const mal=xx=>{ g.fillStyle='rgb('+(G[0]+h)+','+(G[1]+h)+','+(G[2]+h)+')'; g.fillRect(xx+2,r*64+2,w-4,60);
          g.fillStyle='rgba(255,230,190,.08)'; g.fillRect(xx+2,r*64+2,w-4,6);
          g.strokeStyle='rgba(40,20,5,.28)'; g.lineWidth=2; for(let k=0;k<4;k++){ const y=r*64+14+k*13; g.beginPath(); g.moveTo(xx+6,y); g.bezierCurveTo(xx+w*.3,y+(k%2?5:-4),xx+w*.6,y+(k%2?-5:4),xx+w-6,y); g.stroke(); }
          g.fillStyle='#2a1c12'; [[12,16],[12,48],[w-12,16],[w-12,48]].forEach(p=>{ g.beginPath(); g.arc(xx+p[0],r*64+p[1],4,0,7); g.fill(); }); };
        mal(x); mal(x-512); x+=w; }); }
  });
}
/* Wandstück mit gekacheltem Bild (Kachel 4,4 breit und hoch) */
function wandStueck(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const quer=Math.max(w,d); t.repeat.set(quer/4.4,h/4.4); t.offset.set(((w>d?x-w/2:z-d/2)/4.4)%1,((y-h/2)/4.4)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* Boden aus Planken (laufen in x-Richtung) als eine Fläche. wdh = [x,z] Wiederholungen */
function deckBoden(k,B,T,grund,wdh){
  const t=holzBild(grund||[158,112,68]); t.wrapS=t.wrapT=THREE.RepeatWrapping; const w=wdh||[B/9,T/6]; t.repeat.set(w[0],w[1]);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(B,T,72,54),new THREE.MeshLambertMaterial({map:t})); m.rotation.x=-Math.PI/2; m.receiveShadow=true; k.scene.add(m); return m;
}
/* Raumhülle für Räume IM Schiff: Licht, Plankenboden, Holzwände (hinten, links, rechts), Spanten (Rippen), Balken oben, niedriger Fußsockel.
   opt: B,T,H, himmel, grund, staerke (Grundlicht), sonne, sonneStaerke, wand [r,g,b], boden [r,g,b], spant (Farbe),
        spanten [z-Werte an den Seitenwänden] , pfosten [x-Werte an der Rückwand], oeffnung {x,b,h} (Loch in der Rückwand, optional) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6;
  sc.background=new THREE.Color(0x140c08);
  sc.add(new THREE.HemisphereLight(opt.himmel||0xe8e0d0,opt.grund||0x5c4430,opt.staerke||.85));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xffe8c8,opt.sonneStaerke||.4); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  deckBoden(k,B,T,opt.boden);
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x1c120c)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);
  const tex=holzBild(opt.wand||[112,72,40]), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    wandStueck(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); wandStueck(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); wandStueck(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else wandStueck(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  wandStueck(links,tex,.5,H,T,-B/2-.25,H/2,0); wandStueck(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.spant||HOLZ2, s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  box(s[0],B+1,.34,.7,f,0,H+.12,-T/2-.2);
  (opt.pfosten||[-13,-6.5,6.5,13]).forEach(x=>{ box(s[0],.5,H,.3,f,x,H/2,-T/2+.15); box(s[0],.7,.24,.45,f,x,H-.12,-T/2+.2); });
  [-1,1].forEach((v,i)=>{ const w=s[i+1]; box(w,.2,.28,T,f,v*(B/2-.07),.14,0); box(w,.7,.34,T+1,f,v*(B/2+.2),H+.12,0);
    (opt.spanten||[-9,-3,3,9]).forEach(z=>{ box(w,.34,H,.55,f,v*(B/2-.17),H/2,z); const a=box(w,.3,1.5,.5,f,v*(B/2-.55),H-.55,z); a.rotation.z=v*.7; }); });
  s.forEach(verschmelze);
  const fuss=gruppe(sc,0,0,0); [-1,1].forEach(v=>{ for(let z=-T/2+.6;z<T/2;z+=1.2) box(fuss,.42,.36+(Math.abs(Math.round(z*7))%3)*.03,1.12,f,v*(B/2+.27),.18,z); }); verschmelze(fuss);
  return { sc, B, T, H, hinten, links, rechts };
}
/* Rundes Fenster mit schaukelndem Meer. In die Wandgruppe, Blick nach +z; dreh: links Math.PI/2, rechts -Math.PI/2 */
function bullauge(par,k,x,y,z,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  const t=bild(128,128,(c)=>{ c.fillStyle='#9fd8f8'; c.fillRect(0,0,128,128); c.fillStyle='#ffffff'; [[34,34,11],[48,30,14],[63,36,10]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],p[2],0,7); c.fill(); });
    c.fillStyle='#2f86c0'; c.beginPath(); c.moveTo(0,74); for(let i=0;i<=128;i+=16) c.quadraticCurveTo(i+8,(i/16)%2?66:82,i+16,74); c.lineTo(144,128); c.lineTo(0,128); c.fill(); });
  const m=new THREE.Mesh(new THREE.CircleGeometry(.68,28),new THREE.MeshBasicMaterial({map:t})); m.position.z=.06; g.add(m);
  ring(g,.74,.13,MESSING,0,0,.1); for(let i=0;i<8;i++){ const a=i/8*6.283; ball(g,.05,0x8a6a20,Math.cos(a)*.74,Math.sin(a)*.74,.22); }
  const w=t; w.center.set(.5,.5); k.anim.push(zt=>{ w.rotation=Math.sin(zt*.9+x*.2)*.12; w.offset.y=Math.sin(zt*1.3+x)*.03; });
  return g;
}
/* Hängende, leicht schaukelnde Laterne (Deko). y = Höhe der Aufhängung. Kein Punktlicht: dafür flacker() */
function haengeLampe(par,k,x,y,z,farbe){
  const g=gruppe(par,x,y,z), hell=farbe||0xffd36a;
  strich(g,[0,0,0],[0,-.45,0],.025,EISEN); kegel(g,.28,.2,EISEN,0,-.5,0);
  const m=walze(g,.17,.34,basis(hell),0,-.75,0); m.castShadow=false; walze(g,.22,.07,EISEN,0,-.95,0); [[-.18,0],[.18,0],[0,.18],[0,-.18]].forEach(p=>strich(g,[p[0],-.57,p[1]],[p[0],-.93,p[1]],.015,EISEN));
  schein(g,'rgba(255,205,110,.65)',0,-.75,0,1.9);
  k.anim.push(t=>{ g.rotation.z=Math.sin(t*1.1+x)*.09; g.rotation.x=Math.sin(t*.7+z)*.04; });
  return g;
}
/* Bunter Papagei, Blick nach +x, Füße bei y=0. Gibt {g, fl:[linker, rechter Flügel], kopf} zurück. Nicht verschmelzen, wenn er sich bewegen soll. */
function papagei(par,x,y,z){
  const g=gruppe(par,x,y,z), leib=gruppe(g,0,0,0), kopf=gruppe(g,.16,.78,0);
  ball(leib,.25,0xe03a2a,0,.45,0,.95,1.35,.9); ball(leib,.17,0xffc21a,.12,.4,0,.7,1.2,.9);
  [-.07,.07].forEach(zz=>{ strich(leib,[.02,.18,zz],[.04,.02,zz],.025,0x555560); box(leib,.14,.03,.04,0x555560,.08,.015,zz); });
  [[0,0x2f7fe8],[-.07,0xffc21a],[.07,0xe03a2a]].forEach(p=>strich(leib,[-.14,.3,p[0]],[-.46,-.16,p[0]*1.8],.04,p[1]));
  verschmelze(leib);
  ball(kopf,.19,0xe03a2a,0,0,0); [-1,1].forEach(s=>{ ball(kopf,.085,0xffffff,.09,.04,s*.13,1,1,.6); ball(kopf,.034,0x101008,.13,.04,s*.17); });
  const s1=kegel(kopf,.1,.22,0xf2e2b0,.22,-.01,0); s1.rotation.z=-1.9; ball(kopf,.06,0x33302c,.2,-.1,0);
  [-.05,.04].forEach((v,i)=>strich(kopf,[-.02,.14,v],[-.14-i*.03,.32,v*1.6],.025,0xffc21a));
  const fl=[-1,1].map(s=>{ const a=gruppe(g,0,.62,s*.2); ball(a,.2,0x2fb84a,-.06,-.18,s*.03,.8,1.45,.3); ball(a,.13,0x2f7fe8,-.12,-.36,s*.04,.7,1.4,.3); verschmelze(a); return a; });
  return { g, fl, kopf };
}
/* Papagei, der Kreise fliegt */
function papageiFlug(k,cx,cz,r,h,tempo,start){
  const p=papagei(k.scene,cx,h,cz);
  k.anim.push(t=>{ const a=t*tempo+(start||0); p.g.position.set(cx+Math.cos(a)*r,h+Math.sin(t*2+(start||0))*.3,cz+Math.sin(a)*r); p.g.rotation.y=-a-Math.PI/2; const s=Math.sin(t*11); p.fl[0].rotation.x=.5+s*.9; p.fl[1].rotation.x=-.5-s*.9; });
  return p;
}
/* Möwe, die Kreise fliegt */
function moewe(k,cx,cz,r,h,tempo,start){
  const g=gruppe(k.scene,cx,h,cz), leib=gruppe(g,0,0,0); ball(leib,.2,0xf6f6f2,0,0,0,1.7,.85,.85); ball(leib,.13,0xf6f6f2,.32,.08,0); const s0=kegel(leib,.05,.18,0xf2a81a,.49,.06,0); s0.rotation.z=-Math.PI/2; [-1,1].forEach(s=>ball(leib,.022,0x101010,.39,.12,s*.08)); box(leib,.22,.03,.18,0xb8bcc4,-.36,0,0); verschmelze(leib);
  const fl=[-1,1].map(s=>{ const a=gruppe(g,0,.04,s*.12); box(a,.28,.035,.55,0xe8eaee,0,0,s*.28); box(a,.2,.03,.3,0x4a4e58,-.03,0,s*.68); verschmelze(a); return a; });
  g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
  k.anim.push(t=>{ const a=t*tempo+(start||0); g.position.set(cx+Math.cos(a)*r,h+Math.sin(t*1.7+(start||0))*.4,cz+Math.sin(a)*r); g.rotation.y=-a-Math.PI/2; const s=Math.sin(t*6+(start||0)); fl[0].rotation.x=s*.55; fl[1].rotation.x=-s*.55; });
}
/* Krabbe, läuft seitwärts auf einem Rundweg (punkte wie bei laeufer; nicht durch feste Dinge legen) */
function krabbe(k,punkte,tempo,start){
  const g=gruppe(k.scene,0,0,0), l=gruppe(g,0,0,0); l.rotation.y=Math.PI/2; const R=0xe0522a;
  const r=gruppe(l,0,0,0); ball(r,.24,R,0,.22,0,1,.6,1.35); [-1,1].forEach(s=>{ strich(r,[.14,.3,s*.1],[.2,.46,s*.12],.022,R); ball(r,.055,0xffffff,.2,.49,s*.12); ball(r,.027,0x101008,.24,.49,s*.12); strich(r,[.12,.22,s*.26],[.34,.28,s*.36],.04,R); ball(r,.11,R,.42,.3,s*.37,1.2,.8,.8); }); verschmelze(r);
  const beine=[-1,1].map(s=>{ const b=gruppe(l,0,0,0); [-.12,0,.12].forEach(x=>{ strich(b,[x,.2,s*.26],[x*1.7,.24,s*.44],.022,R); strich(b,[x*1.7,.24,s*.44],[x*2,.02,s*.54],.018,R); }); verschmelze(b); return b; });
  k.anim.push(t=>{ beine.forEach((b,i)=>b.position.y=Math.max(0,Math.sin(t*14+i*3.14))*.05); });
  laeufer(k,g,punkte,tempo||.8,start||0,10);
  return g;
}
/* Reling aus Pfosten und Handlauf von a=[x,z] nach b=[x,z], samt Hindernissen */
function reling(k,par,a,b,farbe){
  const g=gruppe(par,0,0,0), dx=b[0]-a[0], dz=b[1]-a[1], l=Math.hypot(dx,dz), n=Math.max(1,Math.round(l/.9)), f=farbe||HOLZ2;
  for(let i=0;i<=n;i++){ const x=a[0]+dx*i/n, z=a[1]+dz*i/n; walze(g,.09,1.05,f,x,.52,z); ball(g,.11,MESSING,x,1.08,z); }
  strich(g,[a[0],.98,a[1]],[b[0],.98,b[1]],.1,HOLZ); strich(g,[a[0],.52,a[1]],[b[0],.52,b[1]],.05,f);
  const m=Math.max(1,Math.ceil(l/.4)); for(let i=0;i<=m;i++) k.kreis(a[0]+dx*i/m,a[1]+dz*i/m,.14);
  verschmelze(g); return g;
}
/* Meer rund ums Deck oder die Insel: große bewegte Wasserfläche auf Höhe y mit Wellenstrichen */
function meer(k,y,farbe){
  const w=new THREE.Mesh(new THREE.PlaneGeometry(220,220),basis(farbe||0x2f8fc4)); w.rotation.x=-Math.PI/2; w.position.y=y; k.scene.add(w);
  const N=240, wellen=new THREE.InstancedMesh(GEO.box,basis(0xcdeeff),N), o=new THREE.Object3D(), P=[];
  for(let i=0;i<N;i++) P.push({ x:(zufall()-.5)*110, z:(zufall()-.5)*90, p:zufall()*6, l:.7+zufall()*1.4 });
  wellen.frustumCulled=false; k.scene.add(wellen);
  k.anim.push(t=>{ P.forEach((p,i)=>{ o.position.set(((p.x+t*.8+55)%110+110)%110-55,y+.03,p.z+Math.sin(t*.8+p.p)*.35); const s=Math.max(0,Math.sin(t*1.4+p.p)); o.scale.set(p.l*s+.01,.02,.09); o.updateMatrix(); wellen.setMatrixAt(i,o.matrix); }); wellen.instanceMatrix.needsUpdate=true; });
}
return { HOLZ, HOLZ2, HOLZ3, EISEN, MESSING, SEIL, ROT, WEISS, SAND, holzBild, wandStueck, deckBoden, huelle, bullauge, haengeLampe, papagei, papageiFlug, moewe, krabbe, reling, meer };
})();

/* Raum 1: Das Unterdeck (Schlafraum der Matrosen). Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: Leiter an der Rückwand zu einer Luke in der Decke. */
RAEUME3D.piratenschiff[0] = (function(){
const { HOLZ, HOLZ2, HOLZ3, EISEN, MESSING, SEIL, ROT, WEISS } = SCHIFF;
const BLAU=0x2a4a7a, LEINEN=0xe0d4b0, HOLZ4=0x4a2c14;

/* ---------- kleine Helfer ---------- */
/* liegender Ring (parallel zum Boden) */
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
/* Drehkörper aus Profilpunkten [Radius, Höhe] */
const dreh=(p,punkte,c,x,y,z)=>{ const geo=new THREE.LatheGeometry(punkte.map(q=>new THREE.Vector2(q[0],q[1])),26);
  const m=new THREE.Mesh(geo,mat(c,{side:THREE.DoubleSide})); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; p.add(m); return m; };
/* Anker als Zeichen, flach, Blick nach +z */
function ankerZeichen(p,x,y,z,gr,c){
  const a=gruppe(p,x,y,z); a.scale.set(gr,gr,gr);
  ring(a,.07,.025,c,0,.27,0); strich(a,[0,.2,0],[0,-.26,0],.028,c); strich(a,[-.14,.1,0],[.14,.1,0],.025,c);
  const b=ring(a,.22,.028,c,0,-.05,0,Math.PI); b.rotation.z=Math.PI;
  [-1,1].forEach(s=>{ const k=kegel(a,.065,.13,c,s*.22,-.01,0); k.rotation.z=-s*.25; });
}
/* stehendes Fass (nur Deko) */
function fassDeko(p,x,y,z,r,h){
  dreh(p,[[0,0],[r*.8,0],[r*.95,h*.22],[r,h*.5],[r*.95,h*.78],[r*.8,h],[0,h]],HOLZ,x,y,z);
  [[.12,.9],[.34,.995],[.66,.995],[.88,.9]].forEach(q=>reif(p,r*q[1],.04,EISEN,x,y+h*q[0],z));
  walze(p,r*.72,.03,HOLZ3,x,y+h+.012,z); box(p,r*1.3,.014,.035,HOLZ2,x,y+h+.034,z);
}
/* aufgerolltes Tau */
function tau(p,x,z,r){
  for(let i=0;i<4;i++) reif(p,r-i*.06,.085,i%2?SEIL:0xc4a266,x,.09+i*.13,z);
  strich(p,[x+r-.05,.12,z],[x+r+.55,.06,z+.35],.07,SEIL);
}

/* kleine Öllampe aus Messing: flache Schale mit offener Flamme an drei Ketten (y = Aufhängung) */
function oelLampe(par,k,x,y,z){
  const g=gruppe(par,x,y,z);
  ball(g,.07,EISEN,0,0,0);
  [0,1,2].forEach(i=>{ const a=i*2.094+.3; strich(g,[0,0,0],[Math.cos(a)*.27,-.72,Math.sin(a)*.27],.012,MESSING); });
  dreh(g,[[0,-.14],[.16,-.1],[.29,.02],[.31,.06],[.24,.04]],MESSING,0,-.78,0); walze(g,.23,.02,0x6a4410,0,-.76,0); ball(g,.07,MESSING,0,-.96,0);
  const f=kegel(g,.06,.2,basis(0xffa322),0,-.64,0); f.castShadow=false;
  schein(g,'rgba(255,200,100,.55)',0,-.64,0,1.1);
  k.anim.push(t=>{ g.rotation.z=Math.sin(t*1.1+x+z)*.07; });
  return g;
}

function baue(k){
  const sc=k.scene;
  const h=SCHIFF.huelle(k,{ B:36, T:27, H:6, wand:[118,76,42], boden:[152,106,64], staerke:.82, sonne:0xffe0b8, sonneStaerke:.38,
    pfosten:[-15.4,-10.9,-5.7,6.1,12.2], spanten:[-11.4,-5.9,3.9,11.4] });
  const B=h.B, T=h.T, hinten=h.hinten, links=h.links, rechts=h.rechts;

  /* ---------- Bullaugen ---------- */
  [[-13.1,3.6],[4.1,3.9],[8.9,4.05]].forEach(p=>verschmelze(SCHIFF.bullauge(hinten,k,p[0],p[1],-T/2+.03,0)));
  [-8.6,-1,7.8].forEach(z=>{ verschmelze(SCHIFF.bullauge(links,k,-B/2+.02,3.9,z,Math.PI/2)); verschmelze(SCHIFF.bullauge(rechts,k,B/2-.02,3.9,z,-Math.PI/2)); });

  /* ---------- Ausgang: Leiter, Deckenstück mit Luke, Zahlenschloss ---------- */
  const decke=gruppe(sc,0,0,0);
  /* Deckenplanken links und rechts der Öffnung, schmale Balken hinten und vorn */
  [-1,1].forEach(s=>{ for(let i=0;i<4;i++) box(decke,.34,.2,2.15,i%2?HOLZ:0x8a5a30,s*(1.34+i*.36),5.03,-12.43);
    box(decke,.18,.28,2.3,HOLZ4,s*2.66,5.02,-12.4); strich(decke,[s*2.55,3.7,-13.4],[s*2.55,4.9,-12.1],.11,HOLZ2);
    box(decke,.16,.34,1.86,HOLZ4,s*1.2,5.07,-12.45); });
  box(decke,2.5,.34,.16,HOLZ4,0,5.07,-13.38); box(decke,5.5,.24,.22,HOLZ4,0,5.0,-11.45);
  [-2.3,-1.75,1.75,2.3].forEach(x=>ball(decke,.06,MESSING,x,5.15,-11.45));
  /* Leiter, fast senkrecht, dicht an der Rückwand */
  const LZ=y=>-13.05-y*.03;
  [-1,1].forEach(s=>{ strich(decke,[s*.72,0,LZ(0)],[s*.72,5.1,LZ(5.1)],.11,HOLZ3); box(decke,.34,.12,.4,HOLZ2,s*.72,.06,LZ(0));
    strich(decke,[s*1.02,.1,LZ(0)-.05],[s*1.02,1.5,LZ(1.5)],.05,SEIL); strich(decke,[s*1.02,1.5,LZ(1.5)],[s*1.02,4.85,LZ(4.85)],.05,SEIL); ball(decke,.09,MESSING,s*1.02,1.5,LZ(1.5)); });
  for(let i=0;i<9;i++){ const y=.42+i*.52; box(decke,1.5,.12,.24,i%2?HOLZ:0xa8743e,0,y,LZ(y)+.02); }
  /* Pfosten für das Schloss, rechts neben der Leiter */
  box(decke,.36,3.0,.3,HOLZ2,1.8,1.5,-12.98); box(decke,.5,.18,.44,HOLZ4,1.8,.09,-12.98); box(decke,.46,.14,.4,HOLZ4,1.8,3.05,-12.98);
  box(decke,.86,.84,.1,HOLZ4,1.8,2.3,-12.8);
  verschmelze(decke);
  k.kasten(0,-12.95,4.2,.7);

  /* Luke: Klappe mit Scharnier an der linken Kante */
  const klappe=gruppe(sc,-1.12,5.29,-12.45);
  for(let i=0;i<6;i++) box(klappe,.36,.14,1.82,i%2?0xa8743e:0x946232,.19+i*.373,0,0);
  [-.62,.62].forEach(z=>{ box(klappe,2.24,.06,.18,EISEN,1.12,.09,z); box(klappe,2.2,.05,.14,HOLZ4,1.12,-.09,z); for(let i=0;i<5;i++) ball(klappe,.05,MESSING,.2+i*.46,.13,z); });
  ring(klappe,.24,.055,MESSING,1.72,.14,0).rotation.x=Math.PI/2; box(klappe,.2,.1,.14,MESSING,1.72,.11,-.24);
  [-.6,.6].forEach(z=>{ const s=walze(klappe,.09,.34,EISEN,0,.07,z); s.rotation.x=Math.PI/2; });
  verschmelze(klappe);
  /* Lichtspalte rund um die geschlossene Klappe */
  const spalt=gruppe(sc,0,0,0), hellspalt=basis(0xffefb0);
  [[0,-13.34,2.3,.05],[0,-11.55,2.3,.05],[1.16,-12.45,.05,1.82]].forEach(p=>{ const m=box(spalt,p[2],.04,p[3],hellspalt,p[0],5.26,p[1]); m.castShadow=false; });
  verschmelze(spalt);
  /* Himmel hinter der offenen Luke, Lichtstrahl und Lichtfleck */
  const himmelBild=bild(256,200,(g)=>{ const v=g.createLinearGradient(0,0,0,200); v.addColorStop(0,'#5ab8f4'); v.addColorStop(1,'#d8f4ff'); g.fillStyle=v; g.fillRect(0,0,256,200);
    g.fillStyle='#fff2a0'; g.beginPath(); g.arc(196,52,28,0,7); g.fill(); g.fillStyle='#ffffff'; [[52,92,22],[82,80,30],[112,94,22],[162,142,18],[188,134,24],[214,144,17]].forEach(p=>{ g.beginPath(); g.arc(p[0],p[1],p[2],0,7); g.fill(); }); });
  /* der Himmel liegt flach in der Öffnung (durchscheinend, damit die Figur sichtbar hindurchsteigt) */
  const himmelM=new THREE.MeshBasicMaterial({map:himmelBild,transparent:true,opacity:0,depthWrite:false});
  const himmel=new THREE.Mesh(new THREE.PlaneGeometry(2.22,1.74),himmelM); himmel.rotation.x=-Math.PI/2; himmel.position.set(0,5.16,-12.43); himmel.visible=false; sc.add(himmel);
  const strahlM=basis(0xfff0b8,{transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
  const strahl=new THREE.Mesh(new THREE.CylinderGeometry(.95,1.55,5.1,20,1,true),strahlM); strahl.position.set(0,2.55,-12.1); strahl.rotation.x=-.08; sc.add(strahl);
  const fleckM=basis(0xffe9a0,{transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  const fleck=new THREE.Mesh(new THREE.CircleGeometry(1.6,28),fleckM); fleck.rotation.x=-Math.PI/2; fleck.position.set(0,.04,-11.9); sc.add(fleck);
  const taglicht=new THREE.PointLight(0xfff0c8,0,14,1.5); taglicht.position.set(0,4.4,-11.6); sc.add(taglicht);
  const sonnig=schein(sc,'rgba(255,245,190,.5)',0,5.6,-12.4,2); sonnig.visible=false;
  /* goldenes Zahlenschloss mit Kette zur Luke */
  const schloss=gruppe(sc,1.8,2.3,-12.62);
  box(schloss,.8,.64,.24,0xd8a73a,0,0,0); ring(schloss,.26,.075,0x9aa3ad,0,.32,0,Math.PI);
  box(schloss,.84,.06,.26,0xf2c85a,0,.29,0); box(schloss,.84,.06,.26,0xa87a20,0,-.31,0);
  for(let i=0;i<3;i++){ box(schloss,.18,.25,.04,0xfff3cf,-.23+i*.23,-.03,.135); box(schloss,.04,.12,.02,0x4a3410,-.23+i*.23,-.03,.162); }
  verschmelze(schloss);
  const kette=gruppe(sc,0,0,0);
  for(let i=0;i<11;i++){ const f=i/10, r=ring(kette,.11,.032,i%2?0xb4bac4:0x8a909a,1.8-f*.62,2.75+f*2.45,-12.62+f*.5); r.rotation.y=i%2?1.35:.1; r.scale.y=1.35; }
  verschmelze(kette);
  const tuer=ausgang(k,{ name:'Luke', steh:[0,-11.1], durch:[0,-12.65], hoch:4,
    treffer:{x:.25,y:3.2,z:-12.55,b:4.4,h:6.4,t:1.3}, schildOben:[0,5.9,-11.7], glanz:[1.8,2.35,-12.35],
    bewege:(auf)=>{ klappe.rotation.z=auf*1.95; spalt.visible=auf<.05; schloss.visible=kette.visible=auf<.04; himmel.visible=auf>.04; himmelM.opacity=.8*auf;
      strahlM.opacity=.2*auf; strahl.visible=auf>.02; fleckM.opacity=.4*auf; fleck.visible=auf>.02; taglicht.intensity=1.3*auf; sonnig.visible=auf>.1; sonnig.scale.set(2*auf+.01,2*auf+.01,1); } });

  /* ---------- Stockbetten (Kojen) an den Seitenwänden ---------- */
  const koje=(x,z,s,f1,f2)=>{ const g=gruppe(sc,x,0,z); /* s: Richtung zur Wand (-1 links, 1 rechts) */
    [-.88,.88].forEach(a=>[-2,2].forEach(b=>{ box(g,.18,2.75,.18,HOLZ2,a,1.37,b); ball(g,.13,MESSING,a,2.82,b); }));
    [[.55,f1],[1.85,f2]].forEach(([y,f])=>{ box(g,1.9,.16,4.05,HOLZ,0,y,0); box(g,1.68,.22,3.8,WEISS,0,y+.18,0);
      box(g,1.74,.16,2.35,f,0,y+.29,.65); box(g,1.76,.045,.3,WEISS,0,y+.385,-.25); [.5,1.35].forEach(b=>box(g,1.76,.045,.14,0xe8c85a,0,y+.385,b));
      ball(g,.42,0xfffaf0,0,y+.4,-1.5,1.55,.5,.85); box(g,.1,.3,4,HOLZ2,s*.9,y+.28,0); box(g,.09,.14,2.4,HOLZ2,-s*.92,y+.36,-.7); });
    [-.1,.5].forEach(b=>strich(g,[-s*1.02,0,1.05+b],[-s*.98,2.1,1.05+b],.05,HOLZ3)); [.4,.85,1.3,1.75].forEach(y=>box(g,.1,.08,.66,HOLZ3,-s*1.0,y,1.25));
    verschmelze(g); k.verdecker(g,x,z,1.5); k.kasten(x+s*.1,z,2.35,4.3); };
  koje(-16.7,-3.3,-1,0x3a6aa8,0xb8342a); koje(-16.7,6.6,-1,0x3f8a5a,0x3a6aa8);
  koje(16.7,-3.4,1,0xb8342a,0x3f8a5a); koje(16.7,2.2,1,0xd89a2a,0x7a4a8a);

  /* ---------- Pfosten mit Armen, zwei Öllampen, Papagei und Flaschenzug ----------
     Lampen und Papagei hängen an der Pfostengruppe, damit sie mit dem Pfosten durchsichtig werden */
  [[-9,-6.4,1],[9,-6.4,-1],[-9.6,4.4,1],[9.6,5.2,1]].forEach(([x,z,s],i)=>{
    const g=gruppe(sc,x,0,z);
    box(g,.95,.28,.95,HOLZ4,0,.14,0); walze(g,.32,5.5,HOLZ2,0,2.9,0); box(g,.95,.24,.95,HOLZ4,0,5.75,0);
    for(let j=0;j<6;j++) reif(g,.34,.05,SEIL,0,1.15+j*.1,0); [.55,3.1,5.2].forEach(y=>reif(g,.34,.04,EISEN,0,y,0));
    strich(g,[0,4.45,0],[s*1.05,4.45,0],.08,HOLZ); strich(g,[0,3.75,0],[s*.7,4.42,0],.06,HOLZ);
    if(i===2) strich(g,[s*1.05,4.45,-.35],[s*1.05,4.45,.35],.07,HOLZ3);
    if(i===3){ strich(g,[s*.95,4.4,0],[s*.95,3.9,0],.025,SEIL); box(g,.3,.46,.22,HOLZ3,s*.95,3.68,0); ring(g,.16,.045,EISEN,s*.95,3.68,.13); [-.08,.08].forEach(a=>strich(g,[s*.95+a,3.5,0],[s*.95+a,2.7,0],.025,SEIL)); reif(g,.09,.035,SEIL,s*.95,2.68,0); }
    verschmelze(g); /* erst danach die bewegten Teile anhängen */
    if(i<2) verschmelze(oelLampe(g,k,s*1.02,4.42,0));
    if(i===2){ const pp=SCHIFF.papagei(g,s*1.05,4.5,0); pp.g.rotation.y=-Math.PI/2; /* nickt, dreht den Kopf und schlägt manchmal mit den Flügeln */
      k.anim.push(t=>{ pp.kopf.rotation.y=Math.sin(t*.9)*.8; pp.kopf.rotation.z=Math.sin(t*2.3)*.12; const f=Math.sin(t*.5)>.75?Math.abs(Math.sin(t*12))*.9:0; pp.fl[0].rotation.x=f; pp.fl[1].rotation.x=-f; }); }
    k.verdecker(g,x,z,.6); k.kreis(x,z,.52);
  });
  flacker(k,-8,3.5,-6,0xffb860,.75,13); flacker(k,8,3.5,-6,0xffb860,.7,13); flacker(k,-8.4,3.5,4.6,0xffb860,.5,12);

  /* ---------- langer Tisch mit zwei Bänken ---------- */
  const teppich=gruppe(sc,0,0,1.2);
  box(teppich,7.6,.012,5.2,0x9a2e28,0,.008,0); box(teppich,7.0,.012,4.6,0xd8b060,0,.017,0); box(teppich,6.6,.012,4.2,0x2f5a80,0,.026,0);
  for(let i=0;i<22;i++) [-1,1].forEach(s=>box(teppich,.34,.012,.07,0xe8d8a8,s*3.96,.012,-2.4+i*.228));
  verschmelze(teppich);
  const tisch=gruppe(sc,0,0,1.2);
  for(let i=0;i<4;i++) box(tisch,5,.16,.4,i%2?0xa8743e:0x946232,0,1.0,-.615+i*.41);
  [-2,2].forEach(x=>{ box(tisch,.28,.9,1.2,HOLZ2,x,.47,0); box(tisch,.5,.14,1.5,HOLZ4,x,.08,0); }); box(tisch,4,.16,.16,HOLZ2,0,.42,0);
  [-1.4,1.4].forEach(z=>{ box(tisch,4.6,.14,.55,HOLZ,0,.6,z); [-1.9,0,1.9].forEach(x=>box(tisch,.2,.55,.42,HOLZ2,x,.28,z)); });
  /* Holzbecher mit Henkel, Würfel und ein kleines Tau auf dem Tisch */
  [[-1.8,-.35],[-1.2,.4],[1.5,-.3],[2.05,.35]].forEach(([x,z],i)=>{ rohr(tisch,.17,.14,.34,i%2?0x7a4a24:0xc08a50,x,1.25,z,14); reif(tisch,.17,.025,EISEN,x,1.36,z); walze(tisch,.14,.015,HOLZ4,x,1.427,z); ring(tisch,.1,.032,HOLZ2,x+.2,1.26,z); });
  [[.55,.25,0xf4ecd8],[.9,.02,0xc0392b]].forEach(([x,z,f])=>{ const w=box(tisch,.22,.22,.22,f,x,1.2,z); w.rotation.y=.5+x; ball(tisch,.035,0x222222,x,1.31,z); });
  [0,1,2].forEach(i=>reif(tisch,.3-i*.05,.045,SEIL,-.4,1.12+i*.065,-.1));
  verschmelze(tisch); k.kasten(0,1.2,5.2,3.35);
  /* Wollknäuel der Katze unter dem vorderen Rand */
  const knaeuel=gruppe(sc,3.4,.24,3.4); ball(knaeuel,.24,0xd8453a,0,0,0); [0,1,2].forEach(i=>{ const r=ring(knaeuel,.242,.016,0xf08070,0,0,0); r.rotation.set(i*1.1,i*.7,0); }); strich(knaeuel,[.1,-.21,0],[.65,-.21,.3],.018,0xd8453a);
  verschmelze(knaeuel); k.kreis(3.4,3.4,.25);

  /* ---------- vordere Mitte: Stern als Einlegearbeit im Boden, gerolltes Segel, Ankerwinde ---------- */
  const stern=gruppe(sc,0,0,8.4);
  const zacke=(a,l,b,f,y)=>{ const q=new THREE.Shape(); q.moveTo(0,l); q.lineTo(b,0); q.lineTo(-b,0); q.lineTo(0,l);
    const m=new THREE.Mesh(new THREE.ShapeGeometry(q),mat(f,{side:THREE.DoubleSide})); m.rotation.set(-Math.PI/2,0,a); m.position.y=y; m.receiveShadow=true; stern.add(m); };
  [2.15,1.9].forEach((r,i)=>{ const m=new THREE.Mesh(new THREE.RingGeometry(r-.1,r,48),mat(i?0xd8b060:0x4a2c14)); m.rotation.x=-Math.PI/2; m.position.y=.008+i*.008; m.receiveShadow=true; stern.add(m); });
  for(let i=0;i<4;i++){ zacke(i*Math.PI/2+Math.PI/4,1.35,.28,0x4a2c14,.026); zacke(i*Math.PI/2,1.95,.34,i%2?0x2f5a80:0x9a2e28,.036); }
  walze(stern,.34,.012,0xd8b060,0,.046,0);
  verschmelze(stern);
  const segel=gruppe(sc,-3.3,0,4.7);
  const rolle=walze(segel,.34,3,0x9a4a34,0,.4,0); rolle.rotation.z=Math.PI/2;
  [-1,1].forEach(s=>{ const e=walze(segel,.25,.05,0x7a3424,s*1.51,.4,0); e.rotation.z=Math.PI/2; const r=ring(segel,.13,.04,0xb86a4a,s*1.55,.4,0); r.rotation.y=Math.PI/2; box(segel,.28,.14,.9,HOLZ2,s*1.0,.07,0); });
  [-1.1,-.4,.35,1.05].forEach(x=>{ const r=ring(segel,.355,.04,SEIL,x,.4,0); r.rotation.y=Math.PI/2; });
  strich(segel,[-1.4,.72,.08],[1.4,.72,.08],.04,0xb86a4a);
  verschmelze(segel); k.kasten(-3.3,4.7,3.2,.85);
  const winde=gruppe(sc,4.4,0,10.2);
  walze(winde,.72,.16,HOLZ4,0,.08,0); rohr(winde,.36,.5,.8,HOLZ,0,.56,0,16); [.3,.84].forEach(y=>reif(winde,y<.5?.49:.4,.045,EISEN,0,y,0));
  for(let i=0;i<8;i++){ const a=i*Math.PI/4; strich(winde,[Math.cos(a)*.47,.22,Math.sin(a)*.47],[Math.cos(a)*.36,.92,Math.sin(a)*.36],.04,HOLZ2); }
  walze(winde,.52,.22,HOLZ2,0,1.06,0); reif(winde,.52,.04,MESSING,0,1.06,0); ball(winde,.18,MESSING,0,1.2,0,1,.6,1);
  for(let i=0;i<4;i++){ const a=i*Math.PI/2+.35, p=[Math.cos(a)*.98,1.06,Math.sin(a)*.98]; strich(winde,[0,1.06,0],p,.065,HOLZ3); ball(winde,.1,HOLZ2,p[0],p[1],p[2]); }
  [.4,.5,.6].forEach(y=>reif(winde,.45-(y-.4)*.2,.05,SEIL,0,y,0));
  verschmelze(winde); k.kreis(4.4,10.2,1.05);

  /* ---------- Kombüsenofen mit Rohr ---------- */
  const ofen=gruppe(sc,-3.8,0,-12.75);
  box(ofen,1.9,.1,1.4,0x8a4a38,0,.05,0); [-.62,.62].forEach(x=>[-.3,.3].forEach(z=>box(ofen,.16,.34,.16,EISEN,x,.27,z)));
  box(ofen,1.5,1.15,.85,EISEN,0,1.0,0); box(ofen,1.7,.14,1,0x55585f,0,1.64,0); box(ofen,.82,.62,.06,0x55585f,-.15,.95,.45);
  walze(ofen,.22,4.4,0x2a2c32,.35,3.9,-.15); [2.4,3.8,5.2].forEach(y=>reif(ofen,.23,.035,0x55585f,.35,y,-.15)); ball(ofen,.07,MESSING,.5,1.15,.47);
  reif(ofen,.26,.04,0x2a2c32,-.4,1.73,0); strich(ofen,[-.9,1.45,.55],[.9,1.45,.55],.035,MESSING);
  verschmelze(ofen); k.kasten(-3.8,-12.75,2,1.45);
  const glut=gruppe(ofen,-.15,.95,.49);
  const loch=new THREE.Mesh(new THREE.PlaneGeometry(.62,.42),basis(0x3a1004)); glut.add(loch);
  const flammen=[[-.18,.26,0xff7a1a],[0,.38,0xffb030],[.18,.24,0xffe066]].map(([x,hh,f])=>{ const m=kegel(glut,.1,hh,basis(f),x,-.2+hh/2,.03); m.scale.z=.03; m.castShadow=false; return {m,hh}; });
  [-.2,0,.2].forEach(x=>box(glut,.035,.46,.03,EISEN,x,0,.07));
  schein(glut,'rgba(255,140,50,.55)',0,0,.25,1.8);
  k.anim.push(t=>{ flammen.forEach((f,i)=>{ const s=1+Math.sin(t*(8+i*3)+i)*.22; f.m.scale.y=f.hh*s; f.m.position.y=-.2+f.hh*s/2; }); });
  flacker(k,-3.8,1.6,-11.5,0xff8a30,.5,8);
  /* Holzscheite neben dem Ofen */
  const scheite=gruppe(sc,-5.6,0,-12.8);
  [[0,3],[1,2],[2,1]].forEach(([r,n])=>{ for(let i=0;i<n;i++){ const x=(i-(n-1)/2)*.36, w=walze(scheite,.17,.9,(i+r)%2?HOLZ:HOLZ2,x,.18+r*.3,0); w.rotation.x=Math.PI/2; const e=walze(scheite,.12,.02,0xd8b078,x,.18+r*.3,.46); e.rotation.x=Math.PI/2; } });
  verschmelze(scheite); k.kasten(-5.6,-12.8,1.15,1);

  /* ---------- gestapelte Fässer ---------- */
  const stapel1=gruppe(sc,0,0,0);
  fassDeko(stapel1,3.65,0,-12.65,.62,1.3); fassDeko(stapel1,4.95,0,-12.65,.62,1.3); fassDeko(stapel1,4.3,1.34,-12.72,.55,1.15);
  verschmelze(stapel1); k.kasten(4.3,-12.7,2.6,1.35);
  const stapel2=gruppe(sc,0,0,0);
  fassDeko(stapel2,-17.0,0,-12.55,.68,1.45); fassDeko(stapel2,-15.6,0,-12.65,.62,1.3); fassDeko(stapel2,-16.9,0,-11.2,.55,.95); fassDeko(stapel2,-16.6,1.47,-12.55,.52,1.1);
  verschmelze(stapel2); k.kasten(-16.25,-12.45,2.9,1.8); k.kreis(-16.9,-11.2,.58);
  const stapel3=gruppe(sc,0,0,0);
  fassDeko(stapel3,-16.9,0,12.3,.65,1.35); fassDeko(stapel3,-15.5,0,12.5,.6,1.1); fassDeko(stapel3,-16.8,1.37,12.35,.45,.8);
  fassDeko(stapel3,17.0,0,12.4,.65,1.35); fassDeko(stapel3,15.6,0,12.55,.55,.9);
  verschmelze(stapel3); k.kasten(-16.2,12.4,2.75,1.6); k.kasten(16.3,12.45,2.75,1.5);

  /* ---------- Taurollen, Gräting und Holzpoller ---------- */
  const taue=gruppe(sc,0,0,0);
  tau(taue,-11.8,12.1,.7); tau(taue,10.4,12.2,.65); tau(taue,13.2,-12.3,.55); tau(taue,-12.8,-12.4,.5);
  verschmelze(taue); k.kreis(-11.8,12.1,.78); k.kreis(10.4,12.2,.73); k.kreis(13.2,-12.3,.63); k.kreis(-12.8,-12.4,.58);
  const poller=gruppe(sc,0,0,0);
  [[-2.6,12.5],[2.6,12.5],[17.3,-7.2],[-17.3,1.6]].forEach(([x,z])=>{ walze(poller,.24,.75,HOLZ2,x,.37,z); ball(poller,.28,HOLZ3,x,.78,z,1,.6,1); reif(poller,.26,.06,SEIL,x,.48,z); reif(poller,.26,.06,SEIL,x,.36,z); k.kreis(x,z,.3); });
  verschmelze(poller);
  const graeting=gruppe(sc,0,0,-6.6);
  box(graeting,3.4,.02,2.8,0x140c06,0,.012,0);
  for(let i=0;i<8;i++) box(graeting,.14,.04,2.7,HOLZ,-1.47+i*.42,.04,0);
  for(let i=0;i<7;i++) box(graeting,3.3,.035,.12,HOLZ2,0,.074,-1.2+i*.4);
  [-1,1].forEach(s=>{ box(graeting,3.75,.12,.2,HOLZ4,0,.06,s*1.48); box(graeting,.2,.11,2.76,HOLZ4,s*1.77,.055,0); });
  verschmelze(graeting);

  /* ---------- Wandschmuck ---------- */
  /* Seil-Girlanden unter den oberen Balken */
  const girl=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  const bogenSeil=(g,a,b,tief)=>{ let alt=a; for(let i=1;i<=8;i++){ const f=i/8, p=[a[0]+(b[0]-a[0])*f, a[1]+(b[1]-a[1])*f-Math.sin(f*Math.PI)*tief, a[2]+(b[2]-a[2])*f]; strich(g,alt,p,.045,SEIL); alt=p; } ball(g,.1,MESSING,a[0],a[1],a[2]); };
  [[-15.4,-10.9],[-10.9,-5.7],[6.1,12.2],[12.2,17.4]].forEach(([a,b])=>bogenSeil(girl[0],[a,5.65,-T/2+.34],[b,5.65,-T/2+.34],.55));
  [[-11.4,-5.9],[-5.9,3.9],[3.9,11.4]].forEach(([a,b])=>{ bogenSeil(girl[1],[-B/2+.38,5.5,a],[-B/2+.38,5.5,b],.5); bogenSeil(girl[2],[B/2-.38,5.5,a],[B/2-.38,5.5,b],.5); });
  /* Rettungsringe an den Seitenwänden */
  [[girl[1],-B/2+.2,Math.PI/2,1.6,2.1],[girl[2],B/2-.2,-Math.PI/2,5.7,2.1]].forEach(([g,x,r,z,y])=>{ const q=gruppe(g,x,y,z); q.rotation.y=r;
    for(let i=0;i<8;i++){ const s=ring(q,.68,.2,i%2?ROT:WEISS,0,0,0,Math.PI/4+.02); s.rotation.z=i*Math.PI/4; } ring(q,.9,.035,SEIL,0,0,.1); });
  /* Wandbretter mit Büchern, Muschel und kleinem Holzfisch */
  const brett=(g,x,y,z,r)=>{ const q=gruppe(g,x,y,z); q.rotation.y=r; box(q,2.6,.12,.55,HOLZ3,0,0,.28); box(q,2.6,.1,.08,HOLZ2,0,.3,.52); [-1,1].forEach(s=>strich(q,[s*1,-.5,.04],[s*1,-.04,.44],.05,HOLZ2));
    [0xc0392b,0xe8a33a,0x3f8a3a,0x2a4a7a,0x8a4a2a,0xd8c040].forEach((f,i)=>{ const hh=.5+(i%3)*.1; box(q,.19,hh,.34,f,-1.1+i*.21,.06+hh/2,.26); box(q,.195,.05,.35,0xf4e2b0,-1.1+i*.21,.06+hh*.75,.26); });
    ball(q,.24,0xf4b8c8,.55,.2,.28,1,.8,.6); ball(q,.2,0x5ab0d8,.98,.2,.3,1.3,.75,.5); const fl=kegel(q,.14,.2,0x3a88b8,1.27,.2,.3); fl.rotation.z=Math.PI/2; };
  brett(girl[1],-B/2+.04,1.9,-9.6,Math.PI/2); brett(girl[2],B/2-.04,1.9,8.4,-Math.PI/2);
  /* Kleiderhaken mit Halstüchern und Mützen an den vorderen Seitenwänden */
  [[girl[1],-B/2+.12,Math.PI/2,10],[girl[2],B/2-.12,-Math.PI/2,-8.7]].forEach(([g,x,r,z])=>{ const q=gruppe(g,x,2.2,z); q.rotation.y=r; box(q,2.2,.2,.1,HOLZ2,0,0,0);
    [-.75,0,.75].forEach((a,i)=>{ const f=[ROT,0x2a4a7a,0x3f8a5a][i]; walze(q,.05,.24,MESSING,a,-.02,.12).rotation.x=Math.PI/2;
      if(i===1){ ball(q,.3,f,a,-.18,.26,1,.7,.7); ball(q,.1,WEISS,a,.06,.28); reif(q,.28,.05,WEISS,a,-.27,.26); } else { const tuch=kegel(q,.34,.85,f,a,-.48,.2); tuch.rotation.x=Math.PI; tuch.scale.z=.12; ball(q,.09,f,a,-.04,.2); } }); });
  girl.forEach(verschmelze);
  /* Wäscheleine mit Matrosenhemden hinten rechts (bewegt sich) */
  const leine=gruppe(hinten,0,0,0);
  strich(leine,[12.35,4.05,-T/2+.5],[17.5,4.05,-T/2+.5],.03,SEIL);
  [12.35,17.5].forEach(x=>{ strich(leine,[x,4.05,-T/2+.02],[x,4.05,-T/2+.5],.05,HOLZ3); ball(leine,.09,MESSING,x,4.05,-T/2+.5); });
  verschmelze(leine);
  [[13.3,BLAU],[14.95,ROT],[16.55,0x3f8a5a]].forEach(([x,f],i)=>{ const q=gruppe(hinten,x,4.02,-T/2+.5);
    box(q,.8,1.05,.08,WEISS,0,-.62,0); [0,1,2,3].forEach(j=>box(q,.82,.1,.1,f,0,-.3-j*.24,0));
    [-1,1].forEach(s=>{ const a=gruppe(q,s*.5,-.3,0); a.rotation.z=s*.55; box(a,.26,.58,.075,WEISS,0,-.12,0); box(a,.275,.09,.095,f,0,-.2,0); box(q,.08,.2,.14,HOLZ3,s*.28,0,0); });
    box(q,.3,.08,.11,f,0,-.12,0); verschmelze(q);
    k.anim.push(t=>{ q.rotation.x=Math.sin(t*1.3+i*1.7)*.1; q.rotation.z=Math.sin(t*.9+i)*.05; }); });

  /* ---------- Kleinteile am Boden: Nagelköpfe und Holzspäne (je ein Zeichenaufruf) ---------- */
  const o=new THREE.Object3D();
  const naegel=new THREE.InstancedMesh(GEO.cyl,mat(0x2a1c12),220);
  for(let i=0;i<220;i++){ o.position.set(-17+(i%20)*1.79+(Math.floor(i/20)%2)*.5,.006,-12.4+Math.floor(i/20)*2.45); o.rotation.set(0,0,0); o.scale.set(.05,.008,.05); o.updateMatrix(); naegel.setMatrixAt(i,o.matrix); }
  naegel.frustumCulled=false; sc.add(naegel);
  const ecken=[[-13.5,-11.6],[-6.5,-12.5],[6,-10.8],[11.8,-11.8],[-14.2,2.8],[14,-.5],[-13.8,11.6],[8,12.2],[-5.6,-10.8],[13.6,5.4]];
  const spaene=new THREE.InstancedMesh(GEO.box,mat(0xe0bc7a),260);
  for(let i=0;i<260;i++){ const e=ecken[i%ecken.length], a=zufall()*6.28, r=Math.sqrt(zufall())*1.1; o.position.set(e[0]+Math.cos(a)*r,.018+zufall()*.02,e[1]+Math.sin(a)*r*.7); o.rotation.set(0,zufall()*3.14,(zufall()-.5)*.4); o.scale.set(.1+zufall()*.18,.014,.03); o.updateMatrix(); spaene.setMatrixAt(i,o.matrix); }
  spaene.receiveShadow=true; spaene.frustumCulled=false; sc.add(spaene);

  /* ---------- Leben: Schiffskatze und Mäuse ---------- */
  katze(k,[[-5.8,6.3],[5,6.2],[5.6,-1.8],[2.2,-2.7],[1.6,-9.2],[-2.4,-9.2],[-6.4,-5.4],[-5.8,0]],1.5);
  maeuschen(k,[[-4.6,11.6],[.6,11.5],[1.1,10.5],[-4.2,10.4]],2.2,0);
  maeuschen(k,[[7.4,-9.8],[12,-9.9],[11.6,-7.9],[7.2,-8.2]],2.4,4);
  maeuschen(k,[[-13.8,-6.8],[-11.2,-7],[-11,-2.2],[-13.9,-1.8]],2,8);

  return { tuer, start:[0,9.5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-14.4,-11],[-9.8,-12.2],[-2.2,-11.3],[2.5,-12.1],[6.2,-10.6],[16.8,-11.4],[16.8,-6.2],[14.4,2.2],[16.6,5.6],[13.2,12.2],
  [5,12.4],[-8.6,12.4],[-14,10.6],[-16.8,.6],[-14.6,-4.4],[-10.2,-7.6],[0,-4.4],[0,4.1],[10.2,-5.2],[-10.6,5.6]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-13.6, z:-9.4, dreh:.18, steh:[-13.3,-7.9], kasten:[2.7,1.7], treffer:[2.8,1.7,1.6], baue(g){ /* 1 Seemannskiste: blau, gewölbter Deckel, Anker, Seilgriffe */
      const F=0x3a5a8a, BAND=0xc9a26a;
      [-.95,.95].forEach(x=>[-.45,.45].forEach(z=>box(g,.28,.12,.28,HOLZ4,x,.06,z)));
      box(g,2.3,.9,1.2,F,0,.57,0);
      const d=walze(g,.6,2.3,0x46699c,0,1.02,0); d.rotation.z=Math.PI/2; d.scale.set(.62,2.3,.6);
      [-.78,.78].forEach(x=>{ box(g,.16,.92,1.25,BAND,x,.57,0); const r=walze(g,.625,.16,BAND,x,1.02,0); r.rotation.z=Math.PI/2; r.scale.set(.645,.16,.625); });
      box(g,2.34,.09,1.24,BAND,0,1.02,0); box(g,2.32,.03,1.22,0x2a4268,0,.42,0);
      ankerZeichen(g,-.36,.56,.63,1.15,0xf4ead0);
      box(g,.34,.38,.08,MESSING,.34,.9,.64); ball(g,.055,0x2a1a08,.34,.9,.69); box(g,.04,.1,.02,0x2a1a08,.34,.82,.69);
      [-1,1].forEach(s=>{ const r=ring(g,.26,.06,SEIL,s*1.2,.78,0,Math.PI); r.rotation.set(0,Math.PI/2,Math.PI); [-.26,.26].forEach(z=>box(g,.12,.16,.14,HOLZ4,s*1.18,.8,z)); }); } },
  { x:-4.4, z:-3.2, steh:[-4.4,-1.8], r:.72, treffer:[1.4,2.3,1.4], baue(g){ /* 2 Sturmlaterne auf einem Hackklotz */
      walze(g,.66,.6,HOLZ2,0,.3,0); walze(g,.58,.03,0xd8b078,0,.615,0); reif(g,.4,.018,HOLZ,0,.632,0); reif(g,.2,.018,HOLZ,0,.632,0);
      const ROTL=0xb8342a;
      walze(g,.44,.16,ROTL,0,.71,0); walze(g,.36,.1,EISEN,0,.84,0);
      const glas=walze(g,.3,.62,basis(0xffe9a0,{transparent:true,opacity:.42,depthWrite:false}),0,1.2,0); glas.castShadow=false;
      const fl=kegel(g,.13,.36,basis(0xff8a1a),0,1.14,0); fl.castShadow=false; const f2=ball(g,.08,basis(0xffee88),0,1.03,0,1,1.5,1); f2.castShadow=false; walze(g,.1,.1,MESSING,0,.93,0);
      for(let i=0;i<4;i++){ const a=i*Math.PI/2+.4; strich(g,[Math.cos(a)*.37,.84,Math.sin(a)*.37],[Math.cos(a)*.37,1.55,Math.sin(a)*.37],.028,EISEN); }
      reif(g,.37,.025,EISEN,0,1.2,0); walze(g,.4,.09,EISEN,0,1.55,0); kegel(g,.42,.28,ROTL,0,1.73,0); walze(g,.1,.12,EISEN,0,1.9,0);
      ring(g,.4,.032,0x8a8e96,0,1.66,0,Math.PI).scale.y=1.2;
      schein(g,'rgba(255,200,100,.7)',0,1.2,0,2); } },
  { x:14.4, z:-9.2, dreh:-.35, steh:[13,-8.2], r:.75, treffer:[1.5,2.3,1.4], baue(g){ /* 3 Seesack: schlanker, leicht schiefer Stoffsack mit Falten, Zipfel und flachem Tragegurt */
      const P=[[0,0],[.42,.02],[.54,.16],[.55,.45],[.48,.85],[.5,1.15],[.43,1.45],[.26,1.66],[.12,1.76]];
      const radius=y=>{ for(let i=1;i<P.length;i++) if(y<=P[i][1]){ const a=P[i-1], b=P[i]; return a[0]+(b[0]-a[0])*(y-a[1])/Math.max(.001,b[1]-a[1]); } return .12; };
      const schief=y=>.07*y*y;
      /* Drehkörper mit Falten; vorn (beim Anker) bleibt er glatt */
      const stoff=(punkte,c)=>{ const geo=new THREE.LatheGeometry(punkte.map(q=>new THREE.Vector2(q[0],q[1])),42,Math.PI,Math.PI*2), p=geo.attributes.position;
        for(let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i), a=Math.atan2(x,z), vorn=Math.pow(Math.max(0,Math.cos(a)),4), oben=Math.max(0,y-1.2);
          const f=1+(1-vorn)*(.07*Math.sin(a*7+y*3)+.045*Math.sin(a*3-y*6))+oben*.22*Math.sin(a*9);
          p.setXYZ(i,x*f+schief(y),y,z*f); }
        geo.computeVertexNormals(); const m=new THREE.Mesh(geo,mat(c,{side:THREE.DoubleSide})); m.castShadow=true; m.receiveShadow=true; g.add(m); };
      stoff(P,LEINEN);
      stoff([.3,.38,.46].map(y=>[radius(y)*1.025,y]),BLAU);
      /* Falten als dunklere Nähte */
      [[1.15,.2,.9],[-1.2,.5,1.35],[.85,1.2,1.62],[-.8,.95,1.6],[2.2,.3,1.1]].forEach(([a,u,o])=>{ let alt=null; for(let i=0;i<=5;i++){ const y=u+(o-u)*i/5, w=a+Math.sin(i*.9)*.12, r=radius(y)*(1+.07*Math.sin(w*7+y*3)+.045*Math.sin(w*3-y*6))+.004, q=[Math.sin(w)*r+schief(y),y,Math.cos(w)*r]; if(alt) strich(g,alt,q,.014,0xbcab82); alt=q; } });
      const sx=schief(1.76);
      reif(g,.14,.045,0x8a5a2a,sx,1.76,0);
      /* weicher Stoffzipfel, zur Seite geknickt */
      [[-.1,1.92,.02,-.55,.13,.36],[.04,1.95,-.04,.15,.15,.42],[.17,1.87,.05,1.1,.12,.4]].forEach(([x,y,z,w,r,l])=>{ const c=kegel(g,r,l,LEINEN,sx+x,y,z); c.rotation.set(Math.PI,0,w); c.scale.z=r*.45; });
      ankerZeichen(g,schief(.9),.9,radius(.9)+.06,1.0,BLAU); } },
  { x:11, z:.9, steh:[11,2.6], r:.98, treffer:[2.1,2.2,1.6], baue(g){ /* 4 Eimer mit Seifenwasser und angelehntem Schrubber */
      const E=gruppe(g,-.15,0,0);
      rohr(E,.62,.48,.95,0xa8743e,0,.5,0,20,true); walze(E,.48,.05,HOLZ2,0,.05,0); walze(E,.56,.03,0x6ab0d8,0,.82,0);
      for(let i=0;i<14;i++){ const a=i/14*6.283; strich(E,[Math.cos(a)*.487,.03,Math.sin(a)*.487],[Math.cos(a)*.627,.98,Math.sin(a)*.627],.014,HOLZ2); }
      [[.2,.52],[.78,.6]].forEach(p=>reif(E,p[1],.04,EISEN,0,p[0],0));
      const hk=ring(E,.62,.035,0x8a8e96,0,.96,0,Math.PI); hk.rotation.x=-.6;
      [[-.28,.9,.1,.16],[-.08,.93,.25,.12],[-.34,.88,-.14,.11],[.05,.9,-.05,.14],[-.14,1.04,.08,.08],[.22,.87,.2,.09]].forEach(p=>ball(E,p[3],0xffffff,p[0],p[1],p[2]));
      /* Schrubber: Bürste am Boden, Stiel lehnt am Eimer */
      box(g,.38,.2,.9,HOLZ3,.82,.32,.15); for(let i=0;i<4;i++) for(let j=0;j<9;j++) box(g,.055,.22,.06,(i+j)%2?0xe8cf6a:0xc8a040,.69+i*.087,.11,-.24+j*.098);
      strich(g,[.84,.38,.15],[.02,2.15,-.12],.055,0xd8a866); ball(g,.08,ROT,.02,2.15,-.12); walze(g,.09,.14,EISEN,.82,.46,.14).rotation.z=.36;
      [[.4,.06,.75,.14],[.7,.05,.8,.09],[-.8,.05,.55,.1]].forEach(p=>ball(g,p[3],0xe8f6ff,p[0],p[1],p[2],1,.6,1)); } },
  { wand:'hinten', x:9, z:-13.5, steh:[9,-11.2], kasten:[5,2.7], treffer:[5.4,2.3,3], trefferY:.8, baue(g){ /* 5 Hängematte an der Wand mit Kissen und Decke */
      const N=24, M=10, form=(u,v)=>[u*1.85, 1.12+.95*u*u+.3*v*v*(1-.7*u*u), .76+v*(.56*(1-u*u)+.1)];
      const flaeche=(u0,u1,heb,m)=>{ const geo=new THREE.PlaneGeometry(1,1,N,M), p=geo.attributes.position, uv=geo.attributes.uv;
        for(let i=0;i<p.count;i++){ const a=uv.getX(i), b=uv.getY(i), u=u0+(u1-u0)*a, v=b*2-1, q=form(u,v*(heb?.8:1)); p.setXYZ(i,q[0],q[1]+heb,q[2]); }
        geo.computeVertexNormals(); const t=new THREE.Mesh(geo,m); t.castShadow=true; g.add(t); return t; };
      const streifen=(grund,linie)=>bild(256,128,c=>{ c.fillStyle=grund; c.fillRect(0,0,256,128); c.fillStyle=linie; [8,24,96,112].forEach(y=>c.fillRect(0,y,256,9)); c.fillStyle='rgba(90,70,40,.18)'; for(let x=0;x<256;x+=12) c.fillRect(x,0,3,128); });
      flaeche(-1,1,0,new THREE.MeshLambertMaterial({map:streifen('#efe2bc','#b8342a'),side:THREE.DoubleSide}));
      flaeche(-.18,.72,.07,new THREE.MeshLambertMaterial({map:streifen('#2f5a90','#e8c85a'),side:THREE.DoubleSide}));
      ball(g,.34,0xffffff,-1.02,1.74,.76,1.35,.62,1.3);
      [-1,1].forEach(s=>{ [-1,1].forEach(v=>{ let alt=null; for(let i=0;i<=N;i++){ const q=form(-1+2*i/N,v); if(alt && (s<0?i<=N/2:i>N/2)) strich(g,alt,q,.04,0x8a6a3a); alt=q; } });
        const haken=[s*2.55,2.72,.18]; for(let j=0;j<5;j++){ const q=form(s,-1+j*.5); strich(g,q,haken,.025,SEIL); }
        box(g,.4,.5,.14,HOLZ4,haken[0],haken[1],.07); ring(g,.14,.05,EISEN,haken[0],haken[1],.2); ball(g,.1,SEIL,haken[0],haken[1]-.1,.26); strich(g,[haken[0],haken[1]-.1,.26],[haken[0]+s*.08,haken[1]-.8,.2],.03,SEIL); }); } },
  { wand:'hinten', x:-8.2, z:-13.5, steh:[-8.2,-11.9], treffer:[3.2,2.2,.8], trefferY:1.1, baue(g){ /* 6 Knotentafel: Holzbrett mit sechs Seilknoten */
      g=gruppe(g,0,0,-.28); /* dicht an die Wand */
      box(g,3.1,2.1,.14,HOLZ4,0,2.2,.36); box(g,2.84,1.84,.06,0x2f4a6a,0,2.2,.45);
      [-1,1].forEach(s=>{ box(g,3.2,.14,.22,HOLZ3,0,2.2+s*1.02,.4); box(g,.14,2.18,.2,HOLZ3,s*1.53,2.2,.39); [-1,1].forEach(v=>ball(g,.07,MESSING,s*1.53,2.2+v*1.02,.53)); });
      const R=0xf0dcaa, knot=(x,y,r,p,q)=>{ const t=new THREE.Mesh(new THREE.TorusKnotGeometry(r,.05,80,8,p,q),mat(R)); t.position.set(x,y,.58); t.scale.z=.5; t.castShadow=true; g.add(t); };
      [-.9,0,.9].forEach(x=>[2.62,1.76].forEach(y=>{ strich(g,[x-.38,y,.52],[x+.38,y,.52],.045,R); [-1,1].forEach(s=>ball(g,.07,MESSING,x+s*.38,y,.52)); }));
      knot(-.9,2.62,.17,2,3); knot(0,2.62,.17,3,4); knot(.9,2.62,.16,2,5);
      [-.11,.11].forEach(a=>ring(g,.16,.048,R,-.9+a,1.76,.57));
      for(let i=0;i<5;i++){ const r=ring(g,.14,.045,R,-.18+i*.09,1.76,.57); r.rotation.y=1.15; }
      knot(.9,1.76,.17,3,2); [-1,1].forEach(s=>strich(g,[.9+s*.06,1.68,.56],[.9+s*.28,1.4,.54],.045,R)); } },
  { x:-12.6, z:1.2, dreh:.25, steh:[-12.4,2.75], r:.74, treffer:[1.6,1.8,1.4], baue(g){ /* 7 Hocker mit aufgeschlagenem Tagebuch */
      walze(g,.68,.16,0xa06a34,0,.9,0); reif(g,.66,.04,HOLZ2,0,.98,0);
      for(let i=0;i<3;i++){ const a=i*2.094+.5; strich(g,[Math.cos(a)*.38,.86,Math.sin(a)*.38],[Math.cos(a)*.6,0,Math.sin(a)*.6],.085,HOLZ2); }
      reif(g,.46,.035,HOLZ,0,.36,0);
      const buch=gruppe(g,0,1.06,.02); buch.rotation.x=.34;
      [-1,1].forEach(s=>{ const h2=gruppe(buch,0,.06,0); h2.rotation.z=s*.17; box(h2,.66,.07,.88,0x8a2a22,s*.33,0,0); box(h2,.58,.11,.8,0xfdf6e0,s*.31,.08,0);
        for(let i=0;i<6;i++) box(h2,i===5?.26:.42,.012,.035,0x4a5a7a,s*.32-(i===5?.08:0),.143,-.28+i*.11); [-1,1].forEach(v=>box(h2,.14,.082,.14,MESSING,s*.6,0,v*.38)); });
      box(buch,.07,.05,.86,0x5a1a14,0,.07,0); box(buch,.09,.02,.7,0xe8b030,0,.2,.12); strich(buch,[.02,.19,.46],[.08,-.1,.58],.035,0xe8b030);
      box(g,.7,.22,.12,HOLZ,0,1.08,-.27); strich(g,[.3,1.02,-.54],[.62,1.74,-.66],.018,0x6a4a20); const fe=ball(g,.2,0xf6f6ff,.56,1.61,-.64,.42,1.5,.16); fe.rotation.z=-.42; walze(g,.1,.16,0x1a2a4a,.3,1.06,-.54); } },
  { x:14.6, z:8.2, dreh:-.4, steh:[13.1,8.9], r:1, treffer:[1.9,1.8,1.6], baue(g){ /* 8 Waschschüssel auf einem Gestell, mit Handtuch und Seife */
      for(let i=0;i<3;i++){ const a=i*2.094+.55; strich(g,[Math.cos(a)*.66,0,Math.sin(a)*.66],[Math.cos(a)*.5,1.08,Math.sin(a)*.5],.07,HOLZ2); }
      reif(g,.5,.07,HOLZ,0,1.08,0); reif(g,.58,.04,HOLZ,0,.42,0); walze(g,.5,.05,HOLZ,0,.42,0);
      dreh(g,[[0,0],[.34,0],[.52,.12],[.7,.32],[.79,.42],[.72,.42],[.62,.32],[.46,.18],[0,.13]],0xf2f6fa,0,1.02,0);
      reif(g,.77,.045,0x2f6ac0,0,1.44,0); reif(g,.64,.025,0x2f6ac0,0,1.26,0); walze(g,.62,.02,0x7cc4ea,0,1.34,0);
      [[-.2,.1,.13],[0,.24,.09],[-.34,-.08,.08],[.16,-.2,.1]].forEach(p=>ball(g,p[2],0xffffff,p[0],1.39,p[1]));
      /* Wasserkrug aus Metall auf dem unteren Brett */
      rohr(g,.14,.24,.5,0x9aa8b4,0,.7,0,16); reif(g,.15,.03,0x6a7884,0,.95,0); ring(g,.16,.035,0x6a7884,.24,.72,0);
      /* Handtuch an der Stange */
      strich(g,[.92,1.22,-.45],[.92,1.22,.45],.04,MESSING); [-.42,.42].forEach(z=>strich(g,[.48,1.1,z*.7],[.92,1.22,z],.03,MESSING));
      box(g,.09,.82,.62,0xd0453a,.97,.82,0); [.5,.64].forEach(y=>box(g,.1,.06,.63,WEISS,.97,y,0));
      box(g,.26,.12,.18,0x8ad890,.55,1.5,.52).rotation.y=-.7; strich(g,[.4,1.32,.38],[.57,1.43,.54],.05,HOLZ); } },
  { x:5.2, z:-5.2, dreh:-.12, steh:[5.2,-3.7], kasten:[2.5,1.35], treffer:[2.5,1.9,1.3], baue(g){ /* 9 Ziehharmonika auf einem niedrigen Podest */
      box(g,2.35,.26,1.15,HOLZ2,0,.13,0); box(g,2.45,.06,1.25,HOLZ3,0,.29,0);
      const Y=.96;
      for(let i=0;i<13;i++){ const x=-.54+i*.09, w=i%2?.88:1.08, a=(i-6)*-.022; const f=box(g,.085,w,i%2?.6:.76,i%2?0x2a2a30:0xe8c050,x,Y+Math.cos((i-6)/6*1.4)*.1-.08,0); f.rotation.z=a; }
      [-1,1].forEach(s=>{ const e=gruppe(g,s*.82,Y-.05,0); e.rotation.z=s*-.14;
        box(e,.46,1.22,.82,0xc0281e,0,0,0); [-1,1].forEach(v=>box(e,.5,.09,.86,MESSING,0,v*.6,0));
        if(s>0){ box(e,.3,1.04,.1,WEISS,.06,0,.45); for(let i=0;i<8;i++) box(e,.31,.012,.02,0x555050,.06,-.4+i*.115,.505); for(let i=0;i<7;i++) if(i!==2&&i!==5) box(e,.18,.065,.06,0x141414,0,-.345+i*.115,.52); }
        else { for(let i=0;i<4;i++) for(let j=0;j<3;j++) ball(e,.048,0xfff8e8,-.12+j*.12,-.33+i*.22+j*.03,.43); }
        const r=ring(e,.34,.055,HOLZ4,s*.25,0,0,Math.PI); r.rotation.set(0,0,-s*Math.PI/2); r.scale.x=1.15; });
      ankerZeichen(g,-.82,1.4,.44,.5,MESSING); } },
  { x:-6.4, z:8.4, steh:[-6.4,9.95], r:.95, treffer:[2.2,1.7,1.7], baue(g){ /* 10 Stiefelpaar mit Umschlag und Schnalle, einer im Profil */
      [[-.5,.05,.55,.05],[.28,-.4,1.5,-.07]].forEach(([x,z,w,neig])=>{ const s=gruppe(g,x,0,z); s.rotation.y=w;
        const L=0x6a3a1c, D=0x2a160a, H=0xa8683a;
        box(s,.42,.11,.95,D,0,.055,.18); const sp=walze(s,.21,.11,D,0,.055,.65); sp.scale.set(.21,.108,.2); box(s,.4,.1,.26,D,0,.15,-.14);
        ball(s,.21,L,0,.28,.48,1,.85,1.6); box(s,.38,.3,.5,L,0,.32,.15);
        const schaft=gruppe(s,0,.35,-.02); schaft.rotation.z=neig;
        rohr(schaft,.25,.21,.88,L,0,.44,0,18); ball(schaft,.23,L,0,.02,0,1,.8,1.1);
        rohr(schaft,.31,.29,.24,H,0,.96,0,18); walze(schaft,.27,.02,D,0,1.083,0); reif(schaft,.31,.022,0xd89a60,0,1.075,0);
        reif(schaft,.24,.038,D,0,.3,0); box(schaft,.17,.16,.05,MESSING,0,.3,.26); box(schaft,.08,.065,.02,D,0,.3,.29); }); } }
];

return { titel:'Das Unterdeck', breite:36, tiefe:27, baue, gegenstaende, verstecke };
})();

/* Raum 2: Der Laderaum, dunkel und feucht, grünes Flackerlicht. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: Tür in einer Wand aus gestapelten Frachtkisten an der Rückwand, schwingt nach hinten auf, dahinter warmes Licht. */
RAEUME3D.piratenschiff[1] = (function(){
const { HOLZ, HOLZ2, HOLZ3, EISEN, MESSING, SEIL } = SCHIFF;
const B=36, T=27, H=6;
const BALKEN=0x4e3018, HELL=0xc89a5c, MOOS=[0x3f6a30,0x557f38];

/* Scheibe aus einem Drehprofil [[radius,höhe],...] */
function dreh(g,profil,c,x,y,z,seg){
  const m=new THREE.Mesh(new THREE.LatheGeometry(profil.map(p=>new THREE.Vector2(p[0],p[1])),seg||24),mat(c,{side:THREE.DoubleSide}));
  m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; g.add(m); return m;
}
/* waagerechter Reifen */
function reif(g,r,d,c,x,y,z){ const m=ring(g,r,d,c,x,y,z); m.rotation.x=Math.PI/2; return m; }

/* Große, geschlossene Frachtkiste: dunkel gestrichen, Rahmenleisten, Schräglatte, Eisenecken. x,z = Mitte, y = Unterkante */
function frachtkiste(par,x,y,z,b,h,t,art,drehung){
  const F=[[0x5c6a56,0x39442f],[0x6c5642,0x433022],[0x4c6068,0x2e3c44]][art%3];
  const g=gruppe(par,x,y,z); g.rotation.y=drehung||0;
  box(g,b-.08,h-.06,t-.08,F[0],0,h/2,0);
  [-1,1].forEach(v=>{
    /* Leisten vorn und hinten */
    box(g,b-.04,.12,.05,F[1],0,.09,v*(t/2-.03)); box(g,b-.04,.12,.05,F[1],0,h-.1,v*(t/2-.03));
    [-1,1].forEach(s=>box(g,.12,h-.08,.062,F[1],s*(b/2-.09),h/2,v*(t/2-.032)));
    /* Leisten an den Seiten */
    box(g,.05,.12,t-.04,F[1],v*(b/2-.03),.09,0); box(g,.05,.12,t-.04,F[1],v*(b/2-.03),h-.1,0);
    const q=box(g,.05,.1,Math.hypot(t-.3,h-.3),F[1],v*(b/2-.025),h/2,0); q.rotation.x=v*Math.atan2(h-.3,t-.3);
  });
  const l=box(g,Math.hypot(b-.35,h-.35),.11,.04,F[1],0,h/2,t/2-.025); l.rotation.z=((art+Math.round(x*3))%2?1:-1)*Math.atan2(h-.35,b-.35);
  [-1,1].forEach(s=>[.09,h-.1].forEach(yy=>{ box(g,.17,.17,.04,EISEN,s*(b/2-.09),yy,t/2+.005); ball(g,.03,0x9aa0a8,s*(b/2-.09),yy,t/2+.03); }));
  [-.28,0,.28].forEach(v=>box(g,b-.2,.02,.035,F[1],0,h-.025,v*t));
  return g;
}
/* Ballen aus Segeltuch, eckig, mit Schnüren verschnürt */
function ballen(par,x,y,z,b,h,t,c,drehung){
  const g=gruppe(par,x,y,z); g.rotation.y=drehung||0;
  box(g,b,h*.8,t*.94,c,0,h*.5,0); box(g,b*.94,h,t*.86,c,0,h*.5,0); box(g,b*.9,h*.86,t,c,0,h*.5,0);
  [-.25,.25].forEach(v=>box(g,.06,h+.03,t+.03,0x4a2e16,v*b,h*.5,0));
  box(g,b+.03,.05,t+.045,0x4a2e16,0,h*.5,0);
  [-.25,.25].forEach(v=>ball(g,.07,0x4a2e16,v*b,h*.5,t/2+.04));
  [-1,1].forEach(s=>[-1,1].forEach(v=>{ const e=box(g,.2,.1,.12,c,s*(b/2),h*.9,v*(t/2-.12)); e.rotation.z=s*.6; }));
  return g;
}
/* grüne Hängelaterne, y = Aufhängung */
function gruenLampe(par,k,x,y,z){
  const g=gruppe(par,x,y,z), l=gruppe(g,0,0,0);
  strich(l,[0,0,0],[0,-.3,0],.025,EISEN); kegel(l,.26,.2,EISEN,0,-.36,0); walze(l,.2,.07,EISEN,0,-.8,0);
  [[-.17,0],[.17,0],[0,.17],[0,-.17]].forEach(p=>strich(l,[p[0],-.44,p[1]],[p[0],-.78,p[1]],.015,EISEN));
  verschmelze(l);
  const glas=walze(g,.14,.32,basis(0xbcff9a),0,-.61,0); glas.castShadow=false;
  const s=schein(g,'rgba(140,255,120,.7)',0,-.61,0,1.8);
  k.anim.push(t=>{ g.rotation.z=Math.sin(t*1.05+x)*.07; const f=1.7+Math.sin(t*13+x*2+z)*.18+Math.sin(t*5.3+z)*.14; s.scale.set(f,f,1); });
}
/* Rundes Fenster unter der Wasserlinie: man sieht Fische vorbeischwimmen */
function tiefenFenster(par,k,x,y,z,drehung,start){
  const g=gruppe(par,x,y,z); g.rotation.y=drehung||0;
  const t=bild(128,128,c=>{ const v=c.createLinearGradient(0,0,0,128); v.addColorStop(0,'#4fc0b0'); v.addColorStop(1,'#0c3c4c'); c.fillStyle=v; c.fillRect(0,0,128,128);
    c.strokeStyle='#2f8a50'; c.lineWidth=6; [22,38,96].forEach((p,i)=>{ c.beginPath(); c.moveTo(p,128); c.bezierCurveTo(p-12,108,p+14,96,p-4,70+i*8); c.stroke(); });
    c.strokeStyle='rgba(220,255,250,.8)'; c.lineWidth=2; [[86,34,5],[94,52,3],[78,18,3],[40,48,2]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],p[2],0,7); c.stroke(); }); });
  const m=new THREE.Mesh(new THREE.CircleGeometry(.62,28),new THREE.MeshBasicMaterial({map:t})); m.position.z=.05; g.add(m);
  const r=gruppe(g,0,0,0); ring(r,.68,.12,MESSING,0,0,.12); for(let i=0;i<8;i++){ const a=i/8*6.283; ball(r,.045,0x8a6a20,Math.cos(a)*.68,Math.sin(a)*.68,.23); } verschmelze(r);
  [[0xffa030,.16,.9],[0xffe050,-.2,-.7]].forEach(([f,h,v],i)=>{
    const fi=gruppe(g,0,h,.085); ball(fi,.11,basis(f),0,0,0,1.4,.85,.2); const s=kegel(fi,.09,.12,basis(f),-.19,0,0); s.rotation.z=-Math.PI/2; s.scale.z=.02; ball(fi,.022,basis(0x101010),.08,.025,.03);
    fi.traverse(o=>{ if(o.isMesh) o.castShadow=false; }); verschmelze(fi); fi.traverse(o=>{ if(o.isMesh) o.castShadow=false; });
    k.anim.push(zt=>{ const p=zt*Math.abs(v)+start+i*2.2; fi.position.x=Math.sin(p)*.3; fi.position.y=h+Math.sin(p*2.3)*.04; fi.rotation.y=Math.cos(p)>=0?0:Math.PI; fi.position.z=.085; });
  });
}

function baue(k){
  const { sc, hinten, links, rechts }=SCHIFF.huelle(k,{ B, T, H, himmel:0xcfe0d0, grund:0x58463a, staerke:.78, sonne:0xe0ffd8, sonneStaerke:.34,
    wand:[94,70,46], boden:[112,86,56], spant:BALKEN, spanten:[-9,-3,3,9], pfosten:[-15.6,-1.6,8,13.6], oeffnung:{x:-8,b:3.2,h:3.7} });

  /* ---------- Wand aus gestapelten Frachtkisten mit Tür ---------- */
  const kw=gruppe(sc,0,0,0), KZ=-12.93;
  /* links der Tür: x -14.2 bis -9.62, rechts: -6.38 bis -2.2 */
  [[-14.2,[2.4,2.18],0,1.35,0],[-14.2,[1.5,1.5,1.58],1.35,1.2,1],[-14.2,[2.0,2.58],2.55,1.2,2],[-12.6,[1.4,1.58],3.75,1.15,0],
   [-6.38,[2.18,2.0],0,1.35,1],[-6.38,[1.4,1.4,1.38],1.35,1.2,2],[-6.38,[2.4,1.78],2.55,1.2,0],[-6.38,[1.6,1.3],3.75,1.15,1]].forEach(([x0,breiten,y,h,a])=>{
    let x=x0; breiten.forEach((w,i)=>{ frachtkiste(kw,x+w/2,y,KZ,w,h,1.04,a+i); x+=w; }); });
  frachtkiste(kw,-8.75,3.76,KZ,1.7,1.2,1.02,2); frachtkiste(kw,-7.14,3.76,KZ,1.5,1.05,1.0,0);
  frachtkiste(kw,-11.4,4.9,KZ,1.5,.85,.9,1,.08); frachtkiste(kw,-5.4,4.9,KZ,1.2,.9,.9,2,-.1);
  /* kräftiger heller Türrahmen */
  [-9.55,-6.45].forEach(x=>{ box(kw,.2,3.72,.34,HELL,x,1.86,-12.45); [.5,1.9,3.3].forEach(y=>ball(kw,.06,MESSING,x,y,-12.26)); });
  box(kw,3.5,.28,.42,HELL,-8,3.74,-12.45); [-9.2,-8,-6.8].forEach(x=>ball(kw,.07,MESSING,x,3.74,-12.22));
  box(kw,2.9,.06,.5,0x8a6a40,-8,.03,-12.42);
  verschmelze(kw); k.kasten(-11.9,-12.95,4.6,1.1); k.kasten(-4.3,-12.95,4.2,1.1);
  /* geschlossene Tür ist fest (beim Öffnen wird der Weg direkt gesetzt) */
  k.kasten(-8,-12.8,3.0,.8);

  /* Gang mit Treppe und Licht hinter der Tür */
  const gang=gruppe(sc,0,0,0);
  box(gang,3.3,.1,3,0x7a5430,-8,-.052,-15);
  [-9.66,-6.34].forEach(x=>box(gang,.3,3.9,2.9,0x6a4a2a,x,1.95,-15.05));
  for(let i=0;i<5;i++) box(gang,2.45,.2*(i+1),.28,i%2?0xc8985a:0xa87a44,-7.75,.1*(i+1),-15.28-i*.28);
  box(gang,3.6,.25,2.5,0x4a3018,-8,4.02,-15.25);
  verschmelze(gang);
  const licht=new THREE.Mesh(new THREE.PlaneGeometry(3.05,3.9),basis(0xffe2a0)); licht.position.set(-8,1.95,-16.7); sc.add(licht);
  schein(sc,'rgba(255,215,120,.85)',-7.8,2,-16.3,4);

  const blatt=gruppe(sc,-9.35,0,-12.55), holz=gruppe(blatt,0,0,0);
  for(let i=0;i<6;i++) box(holz,.44,3.52,.14,i%2?0xa8703a:0x946030,.225+i*.45,1.82,0);
  [.5,1.75,3.15].forEach(y=>{ box(holz,2.7,.17,.05,EISEN,1.35,y,.085); [.15,.75,1.35,1.95,2.55].forEach(x=>ball(holz,.045,0xaab0b8,x,y,.12)); });
  [.5,3.15].forEach(y=>walze(holz,.08,.34,EISEN,.04,y,.1));
  const griff=ring(holz,.17,.04,MESSING,2.3,1.35,.14); griff.rotation.x=-.15; ball(holz,.07,MESSING,2.3,1.53,.11);
  verschmelze(holz);
  const schloss=gruppe(blatt,1.9,2.35,.2);
  box(schloss,.82,.62,.18,0xe0ae38,0,0,0); ring(schloss,.26,.07,0xb4bcc6,0,.31,0,Math.PI);
  for(let i=0;i<3;i++){ box(schloss,.17,.24,.04,0xfff3cf,-.23+i*.23,-.04,.1); box(schloss,.09,.03,.02,0x4a3410,-.23+i*.23,-.04,.128); }
  /* Lichtspalt unter der Tür */
  const spalt=box(sc,2.66,.035,.05,basis(0xffe29a),-8,.085,-12.42); spalt.castShadow=false;
  schein(sc,'rgba(255,215,120,.45)',-8,.15,-12.2,1.6);
  const tuer=ausgang(k,{ name:'Tür in der Kistenwand', steh:[-8,-11.35], durch:[-8,-14.9],
    treffer:{x:-8,y:1.9,z:-12.35,b:3.1,h:3.8,t:.5}, schildOben:[-8,4.7,-11.9], glanz:[-7.45,2.35,-12.15],
    bewege:auf=>{ blatt.rotation.y=auf*1.5; schloss.visible=auf<.04; spalt.visible=auf<.1; } });
  gruenLampe(sc,k,-10.3,4.1,-12.05); gruenLampe(sc,k,-5.7,4.1,-12.05);
  const arme=gruppe(sc,0,0,0); [-10.3,-5.7].forEach(x=>{ strich(arme,[x,4.1,-12.42],[x,4.1,-12.05],.04,EISEN); box(arme,.22,.22,.05,EISEN,x,4.1,-12.39); }); verschmelze(arme);

  /* ---------- Stützbalken mit grünen Laternen (werden durchsichtig) ---------- */
  [[-8.5,-1.8],[-8.5,5.2],[7.2,-2.2],[8.2,6.6]].forEach(([x,z],i)=>{
    const g=gruppe(sc,x,0,z);
    box(g,.8,.22,.8,0x34241a,0,.11,0); box(g,.46,5.9,.46,0x6a4624,0,2.95,0);
    [.7,2.2,4.9].forEach(y=>{ box(g,.52,.14,.52,EISEN,0,y,0); ball(g,.045,0x9aa0a8,0,y,.28); });
    box(g,1.8,.3,.5,BALKEN,0,5.95,0); [-1,1].forEach(s=>{ const a=box(g,.2,1.15,.24,BALKEN,s*.5,5.45,0); a.rotation.z=-s*.75; });
    strich(g,[0,3.75,.2],[0,3.75,.78],.045,EISEN); strich(g,[0,3.3,.22],[0,3.72,.65],.025,EISEN);
    if(i%2){ [0,1,2,3,4].forEach(j=>{ const r=ring(g,.09,.025,0x8a9098,.3,2-j*.14,.02); r.rotation.y=j%2?Math.PI/2:0; r.scale.y=1.3; }); box(g,.16,.07,.07,EISEN,.28,2.14,.02); }
    for(let j=0;j<4;j++) ball(g,.1,MOOS[j%2],Math.cos(j*1.7)*.36,.22,Math.sin(j*1.7)*.36,1.3,.45,1);
    verschmelze(g); gruenLampe(g,k,0,3.75,.78); k.verdecker(g,x,z,.45); k.kreis(x,z,.42);
  });

  /* ---------- Frachtstapel ---------- */
  /* hinten rechts */
  const s1=gruppe(sc,0,0,0);
  frachtkiste(s1,13.9,0,-12.35,2.1,1.7,1.9,0); frachtkiste(s1,16.35,0,-12.3,2.5,2.1,2.0,1);
  frachtkiste(s1,14,1.7,-12.5,1.6,1.3,1.4,2,.12); frachtkiste(s1,16.4,2.1,-12.45,1.9,1.2,1.5,0,-.08); frachtkiste(s1,16.5,3.3,-12.6,1.2,.9,1.1,2,.2);
  verschmelze(s1); k.kasten(15.25,-12.3,4.9,2.1);
  /* hinten links, darüber ein Lastenkran */
  const s2=gruppe(sc,0,0,0);
  frachtkiste(s2,-16.55,0,-12.15,2.5,1.8,2.2,2); frachtkiste(s2,-16.7,0,-10.1,2.1,1.2,1.8,0); frachtkiste(s2,-16.65,1.8,-12.35,1.8,1.3,1.5,1,.15);
  verschmelze(s2); k.kasten(-16.55,-11.2,2.6,4.1);
  const kran=gruppe(links,0,0,0);
  box(kran,.3,2.6,.34,BALKEN,-17.8,4.5,-8); strich(kran,[-17.7,5.55,-8],[-15.1,5.55,-8],.14,HOLZ2); strich(kran,[-17.7,3.8,-8],[-16,5.5,-8],.09,HOLZ2);
  const rolle=walze(kran,.28,.16,HOLZ3,-15.2,5.35,-8); rolle.rotation.x=Math.PI/2; ball(kran,.08,EISEN,-15.2,5.35,-7.89);
  verschmelze(kran);
  const last=gruppe(links,-15.2,5.35,-8), lt=gruppe(last,0,0,0);
  strich(lt,[0,0,0],[0,-1,0],.03,SEIL); ring(lt,.12,.035,EISEN,0,-1.1,0);
  [-1,1].forEach(s=>[-1,1].forEach(v=>strich(lt,[0,-1.18,0],[s*.5,-1.65,v*.4],.022,SEIL)));
  frachtkiste(lt,0,-2.5,0,1.15,.85,.95,1);
  verschmelze(lt);
  k.anim.push(t=>{ last.rotation.z=Math.sin(t*1.1)*.07; last.rotation.x=Math.sin(t*.8+1)*.05; });
  /* rechte Wand */
  const s3=gruppe(sc,0,0,0);
  frachtkiste(s3,16.75,0,-.2,2.2,1.5,2.1,1); frachtkiste(s3,16.75,0,2.0,2.1,1.1,2.1,2); frachtkiste(s3,16.9,1.5,-.2,1.6,1.1,1.5,0,-.12);
  verschmelze(s3); k.kasten(16.75,.9,2.3,4.5);
  /* Insel in der Mitte */
  const s4=gruppe(sc,0,0,0);
  frachtkiste(s4,-4.7,0,-4.6,2.2,1.35,1.7,0,0); frachtkiste(s4,-4.95,1.35,-4.7,1.4,1.05,1.2,1,.28); ballen(s4,-3.85,1.35,-4.35,.6,.45,.9,0xcdbf98,-.15);
  verschmelze(s4); k.verdecker(s4,-4.7,-4.6,1.3); k.kasten(-4.7,-4.6,2.3,1.8);
  /* vorn rechts und vorn links */
  const s5=gruppe(sc,0,0,0);
  frachtkiste(s5,16.6,0,11.9,2.4,1.5,2.2,2); frachtkiste(s5,14.35,0,12.35,1.9,1.0,1.5,1); frachtkiste(s5,16.75,1.5,12.1,1.6,1,1.4,0,.15);
  verschmelze(s5); k.kasten(16.6,11.9,2.5,2.4); k.kasten(14.35,12.35,2,1.6);
  const s6=gruppe(sc,0,0,0);
  ballen(s6,-16.8,0,11.9,1.7,.9,2.2,0xc8b88e); ballen(s6,-15.1,0,12.4,1.5,.8,1.3,0x9aa888,.06); ballen(s6,-16.75,.9,11.7,1.4,.75,1.5,0xb89a74,-.12); ballen(s6,-16.9,1.65,11.9,1.1,.6,1,0xd8ccaa,.2);
  verschmelze(s6); k.kasten(-16,12,3.5,2.4);
  /* Palette mit Segeltuchballen */
  const s7=gruppe(sc,11.2,0,1.5);
  for(let i=0;i<6;i++) box(s7,.38,.07,1.9,HOLZ3,-1.15+i*.46,.17,0); [-.75,0,.75].forEach(z=>box(s7,2.7,.12,.2,HOLZ2,0,.07,z));
  ballen(s7,-.65,.21,.05,1.2,.75,1.6,0xcdbf98); ballen(s7,.68,.21,-.02,1.15,.65,1.55,0x8a9c8c,.05); ballen(s7,-.15,.96,0,1.3,.6,1.2,0xa87858,.2);
  verschmelze(s7); k.kasten(11.2,1.5,2.8,2);

  /* Bretterstapel vorn */
  const br=gruppe(sc,-5,0,11.2);
  [-1.4,0,1.4].forEach(x=>box(br,.22,.16,1.4,BALKEN,x,.08,0));
  [[.22,5],[.35,5],[.5,4]].forEach(([y,n],r)=>{ for(let i=0;i<n;i++) box(br,3.7+((i*3+r)%4)*.12,.11,.23,(i+r)%2?HELL:0xa87c46,((i+r)%3-1)*.08,y+(r?.005*r:0),-(n-1)*.13+i*.26); if(r<2) [-1,1].forEach(x=>box(br,.14,.025,1.34,BALKEN,x,y+.068,0)); });
  verschmelze(br); k.kasten(-5,11.2,4.1,1.5);
  /* Ersatz-Planken vorn rechts, quer gestapelt */
  const br2=gruppe(sc,11,0,11.9); br2.rotation.y=0;
  for(let r=0;r<4;r++) for(let i=0;i<4;i++){ if(r%2) box(br2,.26,.14,1.3,i%2?0x8a6034:0xb08450,-.87+i*.58,.08+r*.15,0); else box(br2,2.2,.14,.24,i%2?0x8a6034:0xb08450,0,.08+r*.15,-.48+i*.32); }
  verschmelze(br2); k.kasten(11,11.9,2.3,1.4);

  /* Handkarren mit Brettern und einem Ballen */
  const w=gruppe(sc,14.2,0,-3.2);
  box(w,2.4,.14,1.3,HOLZ,0,.75,0); [-1,1].forEach(s=>{ box(w,2.4,.1,.08,HOLZ2,0,1.08,s*.62); [-1.1,-.4,.4,1.1].forEach(x=>box(w,.09,.34,.08,HOLZ2,x,.92,s*.62));
    ring(w,.5,.09,0x3a2616,.15,.59,s*.76); for(let j=0;j<4;j++) box(w,.98,.07,.06,HOLZ3,.15,.59,s*.76).rotation.z=j*Math.PI/4; ball(w,.11,EISEN,.15,.59,s*.81); });
  box(w,.12,.7,.12,HOLZ2,-1.05,.35,0); strich(w,[1.15,.75,.35],[1.75,.5,.35],.055,HOLZ2); strich(w,[1.15,.75,-.35],[1.75,.5,-.35],.055,HOLZ2); strich(w,[1.72,.51,-.42],[1.72,.51,.42],.055,HOLZ);
  ballen(w,-.5,.82,0,1.05,.65,1,0xb8a880,.1); for(let i=0;i<4;i++) box(w,1.15,.08,.2,i%2?HELL:0xa87c46,.55,.87+(i%2)*.09,-.35+i*.23);
  verschmelze(w); k.kasten(14.35,-3.2,3,1.75);

  /* verzurrtes Frachtgut an der Rückwand */
  const s8=gruppe(sc,10.6,0,-12.5);
  ballen(s8,-.7,0,0,1.45,.95,1.5,0x9aa888); ballen(s8,.75,0,.05,1.35,.8,1.6,0xc8b88e,.04); ballen(s8,-.55,.95,-.15,1.3,.75,1.2,0xcdbf98,-.08);
  frachtkiste(s8,.78,.8,-.2,1.15,.95,1.15,1,.1); ballen(s8,-.2,1.7,-.35,1.1,.55,.9,0xa87858,.12);
  verschmelze(s8); k.kasten(10.6,-12.5,3,1.9);

  /* ---------- vordere Mitte ---------- */
  /* Werkbank mit Holzhammer, Hobel und Klötzen */
  const wb=gruppe(sc,2.4,0,12.1);
  box(wb,2.7,.16,1.05,HELL,0,.82,0); [-1.15,1.15].forEach(x=>{ [-.36,.36].forEach(z=>box(wb,.18,.76,.18,HOLZ2,x,.38,z)); box(wb,.12,.1,.72,HOLZ2,x,.25,0); }); box(wb,2.3,.08,.5,HOLZ,0,.32,0);
  box(wb,.5,.2,.22,0x7a4a24,-.75,1.0,-.1); box(wb,.12,.1,.7,HOLZ3,-.75,.96,.12); box(wb,.55,.18,.2,0x8a3a24,.2,.99,.05); ball(wb,.09,HOLZ3,.05,1.12,.05); box(wb,.14,.18,.07,HOLZ3,.34,1.15,.05);
  [[.85,.98,-.2],[1.05,.98,.15],[.9,1.15,-.12]].forEach((q,i)=>box(wb,.2,.17,.22,i%2?0xb88450:0xd8ac70,q[0],q[1],q[2]).rotation.y=i*.5);
  [-.7,0,.65].forEach((x,i)=>box(wb,.5,.12+i*.02,.4,i%2?0x8a6034:0xb08450,x,.42+i*.01,0).rotation.y=(i-1)*.2);
  verschmelze(wb); k.kasten(2.4,12.1,2.8,1.15);
  /* zwei Sägeböcke mit langen Brettern */
  const sb=gruppe(sc,2.2,0,7.2);
  [-.75,.75].forEach(x=>{ box(sb,.18,.14,1,HOLZ2,x,.66,0); [-1,1].forEach(v=>[-1,1].forEach(u=>strich(sb,[x,.66,v*.36],[x+u*.26,.03,v*.46],.06,HOLZ))); });
  [-.27,.02,.31].forEach((z,i)=>box(sb,2.3-i*.15,.09,.25,i%2?0x9a6c3a:HELL,(i-1)*.08,.785,z)); box(sb,1.5,.09,.25,0x8a6034,.1,.885,-.12);
  verschmelze(sb); k.kasten(2.2,7.2,2.4,1.1);
  /* niedrige Ballen */
  const s9=gruppe(sc,-.8,0,6.9);
  ballen(s9,-.1,0,0,1.5,.65,1.05,0x8a9c8c,.08); ballen(s9,.05,.65,-.05,1,.45,.75,0xcdbf98,-.2);
  verschmelze(s9); k.kasten(-.8,6.9,1.7,1.25);
  /* niedriges Frachtgut vorn */
  const s10=gruppe(sc,8.5,0,12.35);
  frachtkiste(s10,-.3,0,0,1.25,.8,1.2,2,.06); ballen(s10,.65,0,.1,.6,.5,1,0xc8b88e,-.05); ballen(s10,-.3,.8,0,.85,.4,.8,0xa87858,.2);
  verschmelze(s10); k.kasten(8.35,12.4,2.2,1.4);
  /* Ladeklappe im Boden mit Eisenring und Beschlägen */
  const lk=gruppe(sc,-.6,0,10.9);
  for(let i=0;i<5;i++) box(lk,.34,.04,1.5,i%2?0x7a5230:0x8e6438,-.72+i*.36,.045,0);
  [-.55,.55].forEach(z=>box(lk,1.86,.025,.15,EISEN,0,.076,z)); [-1,1].forEach(v=>box(lk,1.98,.05,.1,BALKEN,0,.05,v*.8)); reif(lk,.18,.035,MESSING,.36,.095,0);
  verschmelze(lk);

  /* ---------- Wandschmuck ---------- */
  [[0,3.5,0],[15.1,4.75,2]].forEach(([x,y,s])=>tiefenFenster(hinten,k,x,y,-T/2+.02,0,s));
  [-6,6].forEach((z,i)=>tiefenFenster(links,k,-B/2+.02,3.4,z,Math.PI/2,1+i*3));
  [-6,6].forEach((z,i)=>tiefenFenster(rechts,k,B/2-.02,3.4,z,-Math.PI/2,2+i*2));
  const wr=gruppe(rechts,0,0,0), wl=gruppe(links,0,0,0), wh=gruppe(hinten,0,0,0);
  /* Ruder in Halterungen (rechte Wand) */
  [1.15,1.75].forEach((y,i)=>{ strich(wr,[17.62,y,3.9],[17.62,y,7],.065,HOLZ3); box(wr,.07,.36,.85,i?0x3f7a8a:0xb86a3a,17.62,y,i?3.55:7.35); [4.4,6.5].forEach(z=>box(wr,.4,.1,.12,EISEN,17.8,y-.11,z)); });
  k.kasten(17.6,5.45,.4,4.5);
  /* angelehnte Ersatzleiter und ein Holzrad */
  [-.35,.35].forEach(v=>strich(wr,[17.1,.02,10.4+v],[17.9,4.2,10.4+v],.07,HOLZ));
  for(let i=1;i<=7;i++){ const u=i/8; box(wr,.12,.07,.74,HOLZ2,17.1+u*.8,u*4.2,10.4); }
  k.kasten(17.35,10.4,.7,1);
  const rad=gruppe(wl,-17.45,.82,-4.2); rad.rotation.y=Math.PI/2;
  ring(rad,.72,.1,0x5a3a1c,0,0,0); for(let i=0;i<5;i++) box(rad,1.4,.09,.07,HOLZ,0,0,0).rotation.z=i*Math.PI/5; const nabe=walze(rad,.17,.2,EISEN,0,0,0); nabe.rotation.x=Math.PI/2;
  k.kasten(-17.5,-4.2,.6,1.8);
  /* Bord mit gefalteten Decken und Holzkästchen (linke Wand) */
  box(wl,.62,.1,2.4,HOLZ2,-17.65,2.05,6.2); [-.9,.9].forEach(d=>strich(wl,[-17.97,1.5,6.2+d],[-17.45,2,6.2+d],.05,EISEN));
  [0x3a6a8a,0xc8b070,0x8a3a30].forEach((f,i)=>box(wl,.5,.13,.75,f,-17.65,2.17+i*.135,5.45));
  box(wl,.45,.42,.6,0x5a7a50,-17.67,2.32,6.4); box(wl,.47,.07,.62,0x35502c,-17.67,2.55,6.4); box(wl,.4,.3,.35,0x7a4a2a,-17.68,2.26,7.05);
  /* Flaschenzüge und Haken */
  [.9,12.6,-.9].forEach((x,i)=>{
    const g=wh, z=-13.4, y=i===1?3.4:2.3; box(g,.34,.18,.12,EISEN,x,y+.62,z); strich(g,[x,y+.6,z+.05],[x,y+.26,z+.08],.025,EISEN); ball(g,.24,HOLZ,x,y,z+.12,.75,1.15,.5); ball(g,.07,MESSING,x,y,z+.25); ring(g,.13,.03,EISEN,x,y-.4,z+.12,Math.PI*1.5); });
  /* angelehnte Bretter hinten */
  for(let i=0;i<4;i++) strich(wh,[6.75+i*.26,.02,-12.9+(i%2)*.08],[6.7+i*.3,2.6+(i%3)*.3,-13.38],.09,i%2?HELL:0x8a6034);
  k.kasten(7.15,-13.1,1.2,.7);
  [wr,wl,wh].forEach(verschmelze);

  /* ---------- Boden: Bilgengitter, Pfützen, Moos, Späne ---------- */
  const gt=gruppe(sc,.6,0,3.4);
  const tief=new THREE.Mesh(new THREE.PlaneGeometry(2.5,1.9),basis(0x143c34)); tief.rotation.x=-Math.PI/2; tief.position.y=.014; gt.add(tief);
  [-1,1].forEach(s=>{ box(gt,2.8,.07,.18,BALKEN,0,.035,s*1); box(gt,.18,.078,2.1,BALKEN,s*1.32,.039,0); });
  for(let i=0;i<7;i++) box(gt,.09,.035,1.86,EISEN,-1.05+i*.35,.042,0); box(gt,2.46,.02,.09,EISEN,0,.065,0);
  const glanzWasser=[0,1,2].map(i=>box(gt,.24,.006,.04,basis(0x7ad8b0),0,.019,-.55+i*.55));
  k.anim.push(t=>{ glanzWasser.forEach((m,i)=>{ m.position.x=Math.sin(t*.9+i*2.1)*.9; m.scale.x=.15+Math.abs(Math.sin(t*1.7+i))*.25; }); });
  [[-1.6,-7.6,1.1],[4.2,6.2,.9],[-11.5,-1.2,.8],[12,-7,.75],[-9.5,8.6,.7],[10.6,8.9,1]].forEach(([x,z,gr],i)=>{
    const pf=new THREE.Mesh(new THREE.CircleGeometry(gr,28),basis(0x4aa090,{transparent:true,opacity:.32,depthWrite:false})); pf.rotation.x=-Math.PI/2; pf.scale.y=.62; pf.position.set(x,.016+i*.001,z); sc.add(pf);
    const kl=new THREE.Mesh(new THREE.CircleGeometry(gr*.5,20),basis(0x8fd8c0,{transparent:true,opacity:.22,depthWrite:false})); kl.rotation.x=-Math.PI/2; kl.scale.y=.55; kl.position.set(x+gr*.7,.027,z+gr*.3); sc.add(kl);
    const tropf=ball(sc,.04,basis(0xc8fff0,{transparent:true,opacity:.8}),x,5,z,1,2,1); tropf.castShadow=false;
    const welle=new THREE.Mesh(new THREE.RingGeometry(.88,1,28),basis(0xe0fff4,{transparent:true,opacity:0,depthWrite:false})); welle.rotation.x=-Math.PI/2; welle.position.set(x,.038,z); sc.add(welle);
    k.anim.push(t=>{ const p=((t+i*.83)%2.6)/2.6; tropf.visible=p<.45; tropf.position.y=5.6-p*p*27.5; const u=Math.max(0,(p-.45)/.55); welle.scale.setScalar(.06+u*gr*.75); welle.material.opacity=p>.45?.75*(1-u):0; }); });
  const moos=gruppe(sc,0,0,0);
  [[-17.4,-6.6],[-17.4,4.2],[-17.4,8.8],[17.4,-5],[17.4,7],[17.4,-9.8],[-1.2,-13.1],[2.2,-13.15],[12.4,-13.1],[-14.7,-13.1],[8.8,13.1],[-9,13.1],[2,13.15],[-2.2,-12.2]].forEach(p=>{ for(let i=0;i<7;i++) ball(moos,.12+zufall()*.17,MOOS[i%2],p[0]+(zufall()-.5)*.9,.015,p[1]+(zufall()-.5)*.5,1.4,.3,1); });
  verschmelze(moos);
  const N=520, spaene=new THREE.InstancedMesh(GEO.box,mat(0xc8a058),N), o=new THREE.Object3D();
  const nester=[[-16,-7],[-13,-10.5],[12,-10.8],[15.5,4.5],[9.5,3.5],[13,10.5],[-7.5,12],[-1.8,11.5],[-13.5,11],[-6,-6],[16,-5],[-15.5,2.5],[1,-12],[6.5,12.3]];
  for(let i=0;i<N;i++){ const n=nester[i%nester.length], a=zufall()*6.28, r=Math.sqrt(zufall())*1.4; o.position.set(Math.max(-17.6,Math.min(17.6,n[0]+Math.cos(a)*r)),.024+zufall()*.025,Math.max(-13.1,Math.min(13.1,n[1]+Math.sin(a)*r))); o.rotation.set(0,zufall()*3.14,(zufall()-.5)*.15); o.scale.set(.12+zufall()*.24,.014,.025); o.updateMatrix(); spaene.setMatrixAt(i,o.matrix); }
  spaene.receiveShadow=true; spaene.frustumCulled=false; sc.add(spaene);

  /* ---------- Licht ---------- */
  flacker(k,-8,3.8,-10.4,0x8cff78,.5,11); flacker(k,4,4.2,-8.5,0x8cff78,.55,14); flacker(k,-11,4,2.5,0x90ff80,.5,14);
  flacker(k,11,4,3.5,0x90ff80,.5,14); flacker(k,-1,5,7,0xffd8a0,.42,17); flacker(k,13,3.8,-8.5,0xb0ff98,.35,9);

  /* ---------- Leben ---------- */
  katze(k,[[0,-9.3],[5.2,-8.6],[5.2,.4],[1.6,1.2],[-6.4,1.2],[-6.8,-7.6],[-2.8,-9.6]],1.5);
  maeuschen(k,[[-8,9.5],[-2,9.4],[-1.9,12.5],[-8,12.5]],2.2,0);
  maeuschen(k,[[9,-.2],[13.4,-.4],[13.4,3.5],[9.2,3.4]],2.5,4);
  maeuschen(k,[[-14.6,-8.9],[-10,-9.2],[-10.2,-7],[-15,-6.8]],2,8);

  return { tuer, start:[0,9.8] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-16.8,-7.6],[-14,-11.6],[-16.8,-2.2],[-16.6,4],[-16.8,9.4],[-12.4,12.4],[-5,12.7],[.3,12.6],[6.4,12.5],[16.8,7.8],
  [16.8,-4.9],[16.8,-9.8],[10.8,-10.8],[5.9,-11.4],[0,-12.4],[-4.6,-6.4],[2.6,-4.8],[11.4,3.5],[14.6,.9],[-7.2,-9.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-12.5, z:-5, steh:[-12.5,-3.4], kasten:[2.4,2.2], treffer:[2.5,1.7,2.2], baue(g){ /* 1 Bananenkiste: offene helle Lattenkiste, randvoll mit Bananen */
      const L=0xd8a860, D=0x8a5a2a;
      box(g,2.1,.1,1.4,D,0,.12,0); box(g,1.96,.5,1.26,0x3a2410,0,.4,0);
      [.18,.43,.68].forEach(y=>{ [-1,1].forEach(s=>{ box(g,2.2,.17,.08,L,0,y,s*.72); box(g,.08,.17,1.36,L,s*1.07,y+.008,0); }); });
      [-1,1].forEach(s=>[-1,1].forEach(v=>{ box(g,.14,.86,.14,D,s*1.06,.43,v*.71); ball(g,.035,0x3a2410,s*1.06,.43,v*.79); ball(g,.035,0x3a2410,s*1.06,.68,v*.79); }));
      /* eine Banane: Bogen mit Spitzen, nach unten gekrümmt */
      const banane=(x,y,z,dr,kipp,f)=>{ const b=gruppe(g,x,y,z); b.rotation.y=dr; const i=gruppe(b,0,0,0); i.rotation.x=kipp;
        const bogen=ring(i,.34,.1,f,0,-.3,0,1.7); bogen.rotation.z=Math.PI/2-.85;
        const ex=Math.sin(.85)*.34, ey=Math.cos(.85)*.34-.3; ball(i,.095,f,-ex,ey,0); ball(i,.095,f,ex,ey,0);
        ball(i,.055,0x6a4a18,ex+.07,ey-.06,0); const s=box(i,.15,.07,.07,0x7a8a28,-ex-.08,ey-.055,0); s.rotation.z=.75; };
      const F=[0xffdc30,0xf4c820,0xffe658];
      for(let r=0;r<3;r++) for(let i=0;i<(3-(r===2?1:0));i++) for(let j=0;j<(r===2?1:2+(r===0?1:0));j++){
        const x=(i-(r===2?.5:1))*.62+(j%2)*.1, z=r===2?(i%2)*.12:(j-(r===0?1:.5))*(r===0?.42:.46);
        banane(x,.8+r*.2,z,(i*1.9+j*2.7+r)*.55-.8,(j-1)*.25,F[(i+j+r)%3]); }
      /* ein Büschel hängt vorn über den Rand */
      [-.16,0,.16].forEach((v,i)=>{ const b=gruppe(g,.55+v,.66,.84); b.rotation.z=v*1.4; const r=ring(b,.3,.075,F[i],0,0,-.04,1.9); r.rotation.y=-Math.PI/2; r.rotation.x=0; r.rotation.z=-.7; ball(b,.045,0x6a4a18,0,-.22,.17); });
      box(g,.42,.14,.16,0x7a8a28,.55,.86,.76);
      banane(-1.35,.15,.55,.7,Math.PI/2,0xffdc30); } },
  { x:2.5, z:-3, steh:[2.5,-1.4], kasten:[2.6,1.1], treffer:[2.7,2.9,1.1], baue(g){ /* 2 Schiffsanker auf Holzklötzen, mit Kette */
      const E=0x66727e, E2=0x8a96a4, D=0x424a56;
      box(g,1.3,.2,.85,HOLZ2,0,.1,0); box(g,.8,.14,.65,HOLZ,0,.27,0);
      walze(g,.14,2.05,E,0,1.5,0); walze(g,.2,.2,D,0,.56,0);
      ring(g,.27,.07,E2,0,2.73,0); walze(g,.19,.14,D,0,2.45,0);
      /* Querstange aus Holz mit Eisenbändern */
      box(g,1.75,.22,.26,0x8a5a2a,0,2.15,0); [-.86,-.4,.4,.86].forEach(x=>box(g,.09,.26,.3,D,x,2.15,0)); box(g,.34,.3,.32,E,0,2.15,0);
      /* gebogene Arme mit Schaufeln */
      const bogen=ring(g,.95,.13,E,0,1.45,0,Math.PI*.78); bogen.rotation.z=Math.PI*1.11;
      [-1,1].forEach(s=>{ const x=s*Math.sin(Math.PI*.39)*.95, y=1.45-Math.cos(Math.PI*.39)*.95;
        const f=kegel(g,.3,.55,E2,x+s*.03,y+.17,0); f.rotation.z=-s*.45; f.scale.z=.1; ball(g,.14,E,x,y,0); });
      ball(g,.2,D,0,.5,0,1.2,.9,1);
      /* Kette vom Ring bis auf den Boden */
      const P=[[.22,2.72,.05],[.55,2.55,.14],[.72,2.05,.24],[.8,1.5,.3],[.9,.95,.34],[1.0,.42,.38],[1.04,.07,.42],[.74,.06,.47],[.42,.06,.5],[.1,.06,.46]];
      let n=0; for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], d=Math.hypot(b[0]-a[0],b[1]-a[1],b[2]-a[2]), m=Math.max(1,Math.round(d/.17));
        for(let j=0;j<m;j++){ const u=j/m, r=ring(g,.09,.028,0xaab4c0,a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u); if(a[1]<.1) r.rotation.x=n%2?Math.PI/2:.25; else { r.rotation.y=n%2?Math.PI/2:0; r.scale.y=1.3; r.rotation.z=Math.atan2(a[0]-b[0],a[1]-b[1])*-1; } n++; } } } },
  { x:-3.5, z:4.5, dreh:.18, steh:[-3.4,6.1], kasten:[2.5,1.3], treffer:[2.5,1.45,1.2], baue(g){ /* 3 Flaschenpost: große grüne Flasche mit Brief auf einem Holzgestell */
      [-.65,.35].forEach(x=>{ box(g,.2,.2,1,HOLZ2,x,.1,0); [-1,1].forEach(s=>{ const b=box(g,.2,.42,.2,HOLZ,x,.33,s*.36); b.rotation.x=s*.45; }); });
      box(g,1.2,.09,.14,HOLZ2,-.15,.25,0);
      const glas=new THREE.MeshLambertMaterial({color:0x5ad88a,transparent:true,opacity:.42,depthWrite:false,side:THREE.DoubleSide,emissive:0x0c4a28});
      const pr=[[0,0],[.38,0],[.45,.08],[.45,1.15],[.38,1.34],[.17,1.52],[.14,1.84],[.19,1.86],[.19,1.93],[.13,1.94]].map(p=>new THREE.Vector2(p[0],p[1]));
      const f=new THREE.Mesh(new THREE.LatheGeometry(pr,26),glas); f.rotation.z=-Math.PI/2; f.position.set(-1.1,.8,0); f.renderOrder=2; g.add(f);
      const kork=walze(g,.13,.26,0xc8904e,.94,.8,0); kork.rotation.z=Math.PI/2;
      const boden=ring(g,.4,.04,0x2f9a5a,-1.08,.8,0); boden.rotation.y=Math.PI/2;
      const hals=ring(g,.165,.045,0x2f9a5a,.74,.8,0); hals.rotation.y=Math.PI/2;
      /* zusammengerollter Brief mit rotem Band */
      const brief=walze(g,.17,1.15,0xfff2cc,-.5,.72,0); brief.rotation.z=Math.PI/2-.06;
      [-1.08,.08].forEach((x,i)=>{ const r=ring(g,.12,.035,0xe0cc98,x,.72+(i?.035:-.035),0); r.rotation.y=Math.PI/2; const r2=ring(g,.055,.022,0xc8b078,x,.72+(i?.035:-.035),0); r2.rotation.y=Math.PI/2; });
      const band=walze(g,.182,.17,0xc8342a,-.5,.72,0); band.rotation.z=Math.PI/2-.06; ball(g,.075,0x9a1c18,-.5,.74,.18,1,1,.5);
      [[-.65,1.17,.22,1,.045],[.2,1.12,.28,.28,.045]].forEach(p=>box(g,p[3],p[4],.03,basis(0xeafff2),p[0],p[1],p[2]));
      schein(g,'rgba(180,255,210,.28)',-.2,.82,.2,2.4); } },
  { x:13.2, z:6.5, steh:[11.6,6.5], r:.95, treffer:[1.9,1.8,1.9], baue(g){ /* 4 Kartoffelsack: weicher Stoffsack mit Falten, umgekrempeltem Rand und Zipfeln, voller Kartoffeln */
      const J=0xa8845a, J2=0x765834, JI=0xd2b484;
      /* Falten: Radius schwankt rund um den Sack, hoch hebt und senkt den Rand */
      const welle=(a,y)=>1+.065*Math.sin(5*a+y*2.5)+.04*Math.sin(9*a-y*4);
      const stoff=(profil,c,hoch)=>{ const m=dreh(g,profil,c,0,0,0,40), q=m.geometry.attributes.position;
        for(let i=0;i<q.count;i++){ const x=q.getX(i), y=q.getY(i), z=q.getZ(i), a=Math.atan2(x,z), f=welle(a,y); q.setXYZ(i,x*f,y+(hoch?.075*Math.sin(3*a+.7)+.045*Math.sin(7*a):0),z*f); }
        m.geometry.computeVertexNormals(); return m; };
      stoff([[0,.02],[.66,.03],[.81,.16],[.8,.4],[.69,.68],[.55,.92],[.52,1.04],[.57,1.14]],J,false);
      /* umgekrempelter Rand: innen helle Stoffseite, nach außen geschlagen */
      stoff([[.55,1.1],[.62,1.2],[.72,1.17],[.74,1.06],[.69,.95]],JI,true);
      /* Faltenschatten und Naht */
      [.2,1.1,2.3,3.4,4.5,5.6].forEach((a,i)=>{ const P=[[.81,.17],[.8,.4],[.69,.68],[.56,.9]]; for(let j=i%2;j<3;j++){ const pt=(n,v)=>{ const b=a+v, rr=P[n][0]*welle(b,P[n][1])+.008; return [Math.sin(b)*rr,P[n][1],Math.cos(b)*rr]; }; strich(g,pt(j,j*.07),pt(j+1,(j+1)*.07),.014,J2); } });
      /* Zipfel: unten abstehende Sackecken und Spitzen am Rand */
      [[-1,.5],[1,.45],[1,-.5]].forEach(([s,z])=>{ const e=kegel(g,.19,.4,J,s*.72,.14,z); e.rotation.z=-s*1.3; e.rotation.y=s*z*-.9; e.scale.z=.1; });
      [-1.9,.9,2.5].forEach(a=>{ const e=kegel(g,.17,.34,JI,Math.sin(a)*.75,.93,Math.cos(a)*.75); e.rotation.order='YXZ'; e.rotation.y=a; e.rotation.x=Math.PI-.3; e.scale.z=.05; });
      const flick=box(g,.34,.3,.05,0x6a4c2c,-.34,.46,.7); flick.rotation.y=-.45; flick.rotation.z=.18;
      const knolle=(x,y,z,i)=>{ const f=[0xb4884c,0x96683a,0xc29a62][i%3]; const p=ball(g,.18,f,x,y,z,1.3,.9,1); p.rotation.set(i*.7,i*1.3,i*.4);
        ball(g,.028,0x6a4420,x+.07,y+.15,z+.07); ball(g,.022,0x6a4420,x-.1,y+.08,z+.14); };
      walze(g,.5,.05,0x5a4020,0,1.04,0);
      let n=0; [[.4,8,1.2],[.22,5,1.39],[0,1,1.55]].forEach(([rr,m,y])=>{ for(let i=0;i<m;i++){ const a=i/m*6.283+y; knolle(Math.cos(a)*rr,y,Math.sin(a)*rr,n++); } });
      [[-.92,.14,.55],[-.65,.13,.88],[.18,.14,1.0],[-1.05,.12,-.05]].forEach(q=>knolle(q[0],q[1],q[2],n++)); } },
  { wand:'hinten', x:4.1, z:-13.5, steh:[4.1,-12], kasten:[3.8,1.4], treffer:[3.8,2.9,.9], trefferY:.9, baue(g){ /* 5 Fischernetz mit Schwimmern, Fisch und Seestern */
      const N=0xe0cc9a, W=1.75, oben=3.55;
      const unten=x=>1.1+Math.pow(Math.abs(x)/W,2.2)*1.35+Math.sin(x*5)*.05;
      const innen=(x,y)=>Math.abs(x)<=W && y<=oben && y>=unten(x);
      const tiefe=(x,y)=>.12+Math.sin(Math.max(0,Math.min(1,(oben-y)/(oben-1.1)))*2.6)*.14;
      [-1,1].forEach(s=>{ for(let c=-1;c<6.2;c+=.34){ for(let x=-W;x<W-.001;x+=.175){ const x2=x+.175, y=s*x+c, y2=s*x2+c; if(innen(x,y)&&innen(x2,y2)) strich(g,[x,y,tiefe(x,y)+s*.006],[x2,y2,tiefe(x2,y2)+s*.006],.016,N); } } });
      for(let x=-W;x<W-.01;x+=.25){ const x2=Math.min(W,x+.25); strich(g,[x,unten(x),tiefe(x,unten(x))],[x2,unten(x2),tiefe(x2,unten(x2))],.04,0xb8965a); }
      [-W,W].forEach(x=>{ strich(g,[x,oben,.14],[x,unten(x),tiefe(x,unten(x))],.04,0xb8965a); });
      strich(g,[-W-.15,oben,.16],[W+.15,oben,.16],.085,HOLZ);
      [-W+.05,W-.05].forEach(x=>{ strich(g,[x,oben,.1],[x*.9,oben+.35,.04],.03,0xb8965a); ball(g,.09,EISEN,x*.9,oben+.36,.07); });
      [-1.35,-.68,0,.68,1.35].forEach((x,i)=>{ ball(g,.2,i%2?0xf2ece0:0xf08a28,x,oben-.03,.25); reif(g,.2,.028,0x8a5a2a,x,oben-.03,.25); });
      /* bunter Fisch */
      ball(g,.4,0x3aa8e0,-.55,2.05,.36,1.35,.75,.35); const s=kegel(g,.28,.36,0x2a78c0,-1.17,2.05,.36); s.rotation.z=-Math.PI/2; s.scale.z=.1;
      ball(g,.085,0xffffff,-.22,2.14,.48,1,1,.5); ball(g,.04,0x101008,-.2,2.14,.53); [-.7,-.5].forEach(x=>box(g,.07,.38,.03,0xffd83a,x,2.05,.5));
      /* Seestern */
      const st=new THREE.Shape(); for(let i=0;i<=10;i++){ const a=i/10*6.283+Math.PI/2, r=i%2?.15:.4; if(!i) st.moveTo(Math.cos(a)*r,Math.sin(a)*r); else st.lineTo(Math.cos(a)*r,Math.sin(a)*r); }
      const sm=new THREE.Mesh(new THREE.ExtrudeGeometry(st,{depth:.09,bevelEnabled:false}),mat(0xf0662a)); sm.position.set(.8,2.35,.28); sm.rotation.z=.3; g.add(sm);
      [[0,0],[0,.19],[.16,.05],[-.16,.05],[.09,-.14],[-.09,-.14]].forEach(p=>ball(g,.025,0xffc890,.8+p[0],2.35+p[1],.38));
      ball(g,.17,0xf4b0c0,.12,1.5,.36,1,.9,.4); [-.5,0,.5].forEach(a=>strich(g,[.12,1.38,.45],[.12+a*.24,1.62,.43],.012,0xa8687a)); } },
  { wand:'links', x:-18, z:0, dreh:Math.PI/2, steh:[-16.5,0], treffer:[2,2.6,.9], trefferY:.8, baue(g){ /* 6 Ladeliste: großes Klemmbrett mit Liste und Stift */
      box(g,1.8,2.35,.1,0x8a5a2a,0,2.05,.1); [-1,1].forEach(s=>{ box(g,.07,2.35,.04,HOLZ2,s*.87,2.05,.165); });
      const t=bild(320,432,c=>{ c.fillStyle='#fbf2d6'; c.fillRect(0,0,320,432); c.strokeStyle='#4a3a22'; c.lineCap='round';
        c.lineWidth=7; c.beginPath(); c.moveTo(70,40); c.lineTo(250,40); c.stroke();
        c.lineWidth=2; c.strokeStyle='#9a8a66'; for(let r=0;r<=6;r++){ c.beginPath(); c.moveTo(18,66+r*58); c.lineTo(302,66+r*58); c.stroke(); } [92,242].forEach(x=>{ c.beginPath(); c.moveTo(x,66); c.lineTo(x,414); c.stroke(); });
        for(let r=0;r<6;r++){ const y=95+r*58, a=r%3;
          c.lineWidth=4; c.strokeStyle='#4a3a22';
          if(a===0){ c.fillStyle='#b8844a'; c.fillRect(35,y-17,40,34); c.strokeRect(35,y-17,40,34); c.beginPath(); c.moveTo(35,y-17); c.lineTo(75,y+17); c.stroke(); }
          else if(a===1){ c.fillStyle='#e8c020'; c.beginPath(); c.moveTo(32,y-12); c.quadraticCurveTo(55,y+28,80,y-14); c.quadraticCurveTo(55,y+8,32,y-12); c.fill(); c.stroke(); }
          else { c.fillStyle='#c0392b'; c.beginPath(); c.arc(55,y+3,17,0,7); c.fill(); c.stroke(); c.beginPath(); c.moveTo(55,y-13); c.lineTo(61,y-24); c.stroke(); }
          const n=2+(r*3)%6; for(let i=0;i<n;i++){ const x=112+i*15+(i>=5?12:0); c.beginPath(); if(i===4){ c.moveTo(106,y+8); c.lineTo(172,y-10); } else { c.moveTo(x,y-16); c.lineTo(x-2,y+16); } c.stroke(); }
          if(r<4){ c.strokeStyle='#2f8a3a'; c.lineWidth=7; c.beginPath(); c.moveTo(256,y); c.lineTo(268,y+13); c.lineTo(290,y-16); c.stroke(); } else { c.lineWidth=3; c.strokeRect(258,y-14,28,28); } } });
      const p=new THREE.Mesh(new THREE.PlaneGeometry(1.52,2.02),new THREE.MeshLambertMaterial({map:t,emissive:0x2a2418})); p.position.set(0,1.99,.16); g.add(p);
      box(g,.8,.24,.13,0xaab4c0,0,3.13,.2); box(g,.9,.07,.15,0x78828e,0,2.99,.2); ring(g,.15,.035,0x78828e,0,3.28,.18,Math.PI); [-.3,.3].forEach(x=>ball(g,.045,0x42484f,x,3.15,.27));
      ball(g,.07,EISEN,0,3.45,.07);
      /* Stift an einer Schnur */
      strich(g,[.83,2.9,.18],[1.02,2.35,.2],.012,0x8a2a1a); strich(g,[1.02,2.35,.2],[.98,1.9,.2],.012,0x8a2a1a);
      walze(g,.05,.62,0xf2b828,.98,1.58,.2); kegel(g,.05,.13,0xe8c89a,.98,1.205,.2).rotation.x=Math.PI; ball(g,.022,0x222222,.98,1.14,.2); walze(g,.056,.08,0xc0504a,.98,1.93,.2);
      box(g,1.95,.13,.28,HOLZ2,0,.8,.14); } },
  { x:15.2, z:-7, steh:[13.55,-7], r:.85, treffer:[1.8,2,1.8], baue(g){ /* 7 Wasserfass: bauchig, oben offen mit Wasser, Zapfhahn und Schöpfkelle */
      dreh(g,[[0,.04],[.6,.04],[.73,.4],[.78,.85],[.73,1.3],[.62,1.66],[.56,1.66],[.55,1.5]],0xa86c34,0,0,0,26);
      for(let i=0;i<16;i++){ const a=i/16*6.283, P=[[.605,.05],[.738,.4],[.788,.85],[.738,1.3],[.628,1.64]]; for(let j=0;j<4;j++) strich(g,[Math.cos(a)*P[j][0],P[j][1],Math.sin(a)*P[j][0]],[Math.cos(a)*P[j+1][0],P[j+1][1],Math.sin(a)*P[j+1][0]],.012,0x5a3414); }
      [[.17,.67],[.52,.755],[1.18,.765],[1.53,.675]].forEach(p=>reif(g,p[1],.045,0x555e68,0,p[0],0));
      reif(g,.595,.05,0xc89050,0,1.66,0);
      walze(g,.57,.05,0x3a9ce8,0,1.56,0); [.18,.36].forEach(r=>reif(g,r,.012,0xbfe8ff,.04,1.592,.02));
      /* Zapfhahn zur Raumseite (links) mit Tropfen */
      const h=walze(g,.075,.34,MESSING,-.87,.55,0); h.rotation.z=Math.PI/2; walze(g,.055,.16,MESSING,-1.0,.47,0); walze(g,.035,.14,MESSING,-.93,.66,0); box(g,.09,.06,.28,MESSING,-.93,.74,0);
      ball(g,.055,0x6ac8ff,-1.0,.3,0,.9,1.4,.9); walze(g,.26,.02,0x58b8e0,-1.0,.015,0);
      /* Schöpfkelle hängt vorn */
      strich(g,[.08,1.68,.64],[.14,1.0,.9],.04,HOLZ3); const sch=dreh(g,[[0,0],[.13,.02],[.18,.11],[.19,.19]],0xc89050,.15,.78,.94,14); sch.rotation.x=.15; reif(g,.19,.025,HOLZ2,.15,.97,.97);
      /* Wassertropfen als Zeichen auf dem Fass */
      ball(g,.14,0x58c0ff,-.35,.92,.71,1,1,.3); const sp=kegel(g,.125,.22,0x58c0ff,-.35,1.09,.705); sp.scale.z=.04; } },
  { x:5.6, z:9.5, steh:[3.9,9.5], r:1.15, treffer:[2.5,1.3,2.4], baue(g){ /* 8 Taurolle: dickes Seil in Lagen aufgeschossen, loses Ende */
      const S=0xdcbc80, S2=0x94743c;
      const lage=(R,d,y,c,v)=>{ reif(g,R,d,c,0,y,0); const n=Math.round(R*30); for(let i=0;i<n;i++){ const a=(i+v)/n*6.283, ca=Math.cos(a), sa=Math.sin(a), b=a+.12/R;
          strich(g,[ca*(R+d*.99),y-d*.25,sa*(R+d*.99)],[Math.cos(b)*(R+d*.45),y+d*.94,Math.sin(b)*(R+d*.45)],.014,S2); } };
      [0,1,2,3].forEach(i=>lage(.76-i*.045,.14,.14+i*.21,i%2?0xe8cc92:S,i*.4));
      lage(.4,.12,.8,S,.2); reif(g,.38,.1,0xd0ae70,0,.14,0);
      walze(g,.34,.03,0x4a3418,0,.03,0);
      /* dünnes loses Ende mit Drehstreifen, liegt vor der Rolle */
      const P=[[.4,.86,.12],[.6,.9,.36],[.74,.72,.58],[.85,.42,.7],[.92,.07,.82],[.74,.065,1.02],[.46,.065,1.08],[.2,.065,.98]];
      for(let i=0;i<P.length-1;i++){ const a=P[i], b=P[i+1], d=[b[0]-a[0],b[1]-a[1],b[2]-a[2]], l=Math.hypot(d[0],d[1],d[2]), e=d.map(v=>v/l), q=Math.hypot(e[0],e[2])||1, sx=-e[2]/q, sz=e[0]/q;
        strich(g,a,b,.06,S); ball(g,.06,S,b[0],b[1],b[2]);
        for(let u=.04;u<l;u+=.085){ const m=[a[0]+e[0]*u,a[1]+e[1]*u,a[2]+e[2]*u];
          const o=[m[0],m[1]+.064,m[2]]; strich(g,[m[0]+sx*.058-e[0]*.045,m[1]+.025,m[2]+sz*.058-e[2]*.045],o,.012,S2); strich(g,o,[m[0]-sx*.058+e[0]*.045,m[1]+.025,m[2]-sz*.058+e[2]*.045],.012,S2); } }
      /* kurze Fransen */
      for(let i=0;i<7;i++){ const v=(i-3)*.045; strich(g,[.2,.065,.98],[.06-(i%2)*.04,.02+(i%3)*.035,.93+v-.02],.011,i%2?S:0xf0dcaa); } } },
  { x:-13, z:7.5, steh:[-11.35,7.5], r:.85, treffer:[1.8,2,1.8], baue(g){ /* 9 Apfelkorb: geflochtener Korb mit Henkel, voller Äpfel */
      const F=0xc4924e, F2=0x8a5c28;
      dreh(g,[[0,.04],[.55,.05],[.66,.35],[.76,.75],[.78,.86]],0xa87436,0,0,0,24);
      [[.1,.575],[.24,.63],[.38,.68],[.52,.715],[.66,.75]].forEach((p,i)=>reif(g,p[1],.045,i%2?F:F2,0,p[0],0));
      for(let i=0;i<18;i++){ const a=i/18*6.283; strich(g,[Math.cos(a)*.6,.05,Math.sin(a)*.6],[Math.cos(a)*.81,.86,Math.sin(a)*.81],.028,i%2?F:0xd8aa64); }
      reif(g,.79,.095,F,0,.88,0); reif(g,.8,.04,F2,0,.95,0);
      const henkel=ring(g,.79,.065,F,0,.9,0,Math.PI); henkel.rotation.y=.35; henkel.scale.y=1.2;
      walze(g,.7,.05,F2,0,.82,0);
      const apfel=(x,y,z,i)=>{ const f=[0xe0282a,0x84c832,0xd83420,0xf04a30][i%4]; ball(g,.21,f,x,y,z,1,.94,1); ball(g,.05,0x4a2a10,x,y+.185,z,1,.35,1); strich(g,[x,y+.17,z],[x+.05,y+.3,z+.02],.018,0x5a3a18);
        if(i%3===0){ const b=ball(g,.09,0x3f9a30,x+.12,y+.27,z,1.3,.25,.7); b.rotation.z=.4; } ball(g,.04,0xffd8c0,x-.09,y+.1,z+.15,1,1.2,.4); };
      let n=0; [[.52,10,.98],[.28,6,1.16],[0,1,1.32]].forEach(([r,m,y])=>{ for(let i=0;i<m;i++){ const a=i/m*6.283+y*2; apfel(Math.cos(a)*r,y,Math.sin(a)*r,n++); } });
      apfel(.78,.2,.66,1); apfel(.35,.2,.95,0); } },
  { x:9.5, z:-6.5, steh:[9.5,-4.95], r:.75, treffer:[1.6,2.3,1.5], baue(g){ /* 10 Tonkrug: großer bauchiger Krug mit zwei Henkeln, im Holzring */
      const T1=0xcc6a3a, T2=0x9a4424, C=0xf4d8a0;
      reif(g,.52,.11,HOLZ2,0,.11,0); [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78; box(g,.22,.16,.22,HOLZ,Math.cos(a)*.6,.08,Math.sin(a)*.6); });
      dreh(g,[[0,.12],[.36,.12],[.6,.4],[.7,.75],[.65,1.1],[.45,1.38],[.25,1.55],[.22,1.82],[.28,1.94],[.36,2.04],[.3,2.05],[.2,1.9]],T1,0,0,0,28);
      reif(g,.345,.045,T2,0,2.03,0); walze(g,.21,.03,0x3a1a0c,0,1.9,0);
      [[.62,.7],[1.12,.652]].forEach(p=>reif(g,p[1],.032,C,0,p[0],0)); reif(g,.255,.03,T2,0,1.56,0);
      const zack=[]; for(let i=0;i<=28;i++){ const a=i/28*6.283, y=i%2?1.0:.74, r=i%2?.695:.715; zack.push([Math.cos(a)*r,y,Math.sin(a)*r]); }
      for(let i=0;i<28;i++) strich(g,zack[i],zack[i+1],.024,C);
      [-1,1].forEach(s=>{ const P=[[s*.24,1.82,0],[s*.52,1.85,0],[s*.71,1.66,0],[s*.72,1.38,0],[s*.55,1.2,0]]; for(let i=0;i<P.length-1;i++){ strich(g,P[i],P[i+1],.075,T2); ball(g,.075,T2,P[i+1][0],P[i+1][1],0); } }); } }
];

return { titel:'Der Laderaum', breite:B, tiefe:T, oben:['16,12,8','22,24,16','24,20,14'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Die Kapitänskajüte. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Schiffsmodell) und 10 (Teekanne) sind neu. */
RAEUME3D.piratenschiff[2] = (function(){
const { HOLZ, HOLZ2, HOLZ3, EISEN, MESSING, ROT, WEISS } = SCHIFF;
const EDEL=0x5a2016, EDEL2=0x3a140e, EDEL3=0x7c3020, GOLD=0xf2c94c, ROT2=0x8a1c24, SAMT=0xa82a32, GRUEN=0x2f7a44, GRUEN2=0x4a9a4a;

/* gedrehter Körper aus Profilpunkten [Radius, Höhe] */
function dreh(par,punkte,c,x,y,z){ const m=new THREE.Mesh(new THREE.LatheGeometry(punkte.map(p=>new THREE.Vector2(p[0],p[1])),24),typeof c==='number'?mat(c,{side:THREE.DoubleSide}):c); m.position.set(x,y,z); m.castShadow=true; par.add(m); return m; }
/* Bildfläche mit gemaltem Bild */
function tafel(par,tex,w,h,x,y,z){ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
/* Teppich flach auf dem Boden */
function teppich(par,w,d,x,y,z,grund,rand){
  const t=bild(512,384,(g)=>{ g.fillStyle=rand; g.fillRect(0,0,512,384); g.fillStyle='#d8a73a'; g.fillRect(14,14,484,356); g.fillStyle='#2a2a5a'; g.fillRect(22,22,468,340); g.fillStyle=grund; g.fillRect(48,48,416,288);
    g.fillStyle='#e8c878'; for(let i=34;i<490;i+=28){ [35,349].forEach(yy=>{ g.beginPath(); g.moveTo(i,yy-9); g.lineTo(i+9,yy); g.lineTo(i,yy+9); g.lineTo(i-9,yy); g.fill(); }); } for(let j=62;j<330;j+=28){ [35,477].forEach(xx=>{ g.beginPath(); g.moveTo(xx,j-9); g.lineTo(xx+9,j); g.lineTo(xx,j+9); g.lineTo(xx-9,j); g.fill(); }); }
    [[150,'#e8c878'],[118,'#2a2a5a'],[86,'#c8603a'],[52,'#f0dca8'],[22,'#7a1820']].forEach(([r,f])=>{ g.fillStyle=f; g.beginPath(); g.moveTo(256-r*1.35,192); g.quadraticCurveTo(256-r*.4,192-r*.35,256,192-r*.85); g.quadraticCurveTo(256+r*.4,192-r*.35,256+r*1.35,192); g.quadraticCurveTo(256+r*.4,192+r*.35,256,192+r*.85); g.quadraticCurveTo(256-r*.4,192+r*.35,256-r*1.35,192); g.fill(); });
    [[96,96],[416,96],[96,288],[416,288]].forEach(([a,b])=>{ [[30,'#e8c878'],[19,'#2a2a5a'],[8,'#e8c878']].forEach(([r,f])=>{ g.fillStyle=f; g.beginPath(); g.arc(a,b,r,0,7); g.fill(); }); }); });
  const m=tafel(par,t,w,d,x,y,z); m.rotation.x=-Math.PI/2;
  for(let i=0;i<=Math.floor(d/.24);i++) [-1,1].forEach(s=>box(par,.2,.008,.05,0xf0dcb0,x+s*(w/2+.1),y,z-d/2+.05+i*.236));
  return m;
}
/* Kerzenflamme: bewegt sich */
function flamme(k,par,x,y,z,gross){
  const f=gruppe(par,x,y,z), a=kegel(f,.07,.22,basis(0xffa020),0,.11,0), b=kegel(f,.038,.13,basis(0xfff0a0),0,.08,.04); a.castShadow=b.castShadow=false;
  if(gross) schein(par,'rgba(255,190,90,.55)',x,y+.14,z,gross);
  k.anim.push(t=>{ f.scale.y=1+Math.sin(t*12+x*3+z)*.18+Math.sin(t*7.3+x)*.08; f.rotation.z=Math.sin(t*5+z+x)*.08; });
}
function stuhl(g,x,z,r){
  const s=gruppe(g,x,0,z); s.rotation.y=r;
  [-.34,.34].forEach(a=>{ box(s,.11,.62,.11,EDEL2,a,.31,.32); box(s,.12,1.75,.12,EDEL2,a,.87,-.34); ball(s,.09,MESSING,a,1.78,-.34); });
  box(s,.86,.12,.82,EDEL,0,.66,0); box(s,.74,.14,.7,SAMT,0,.76,.02); box(s,.6,.62,.08,SAMT,0,1.34,-.34); box(s,.82,.12,.12,EDEL,0,1.7,-.34);
}

function baue(k){
  const h=SCHIFF.huelle(k,{ B:36, T:27, H:6, wand:[112,44,32], boden:[142,92,56], spant:EDEL2, himmel:0xffe0c8, grund:0x58342a, staerke:.88, sonne:0xffd8b0, sonneStaerke:.42, oeffnung:{x:0,b:8.4,h:4.8}, pfosten:[-13,-6.4,6.4,13] });
  const sc=h.sc, hinten=h.hinten, links=h.links, rechts=h.rechts, Z=-13.5;

  /* Sammelgruppen: feste Deko wird am Ende je Farbe zusammengefasst (weniger Zeichenaufrufe) */
  const deko=gruppe(sc,0,0,0), dH=gruppe(hinten,0,0,0), dL=gruppe(links,0,0,0), dR=gruppe(rechts,0,0,0);

  /* ---------- Blick nach draußen: Heckgalerie, Meer im Abendlicht ---------- */
  const abend=bild(1024,256,(g)=>{ const v=g.createLinearGradient(0,0,0,196); v.addColorStop(0,'#34346e'); v.addColorStop(.55,'#8a4a86'); v.addColorStop(.8,'#e06a62'); v.addColorStop(1,'#ffca74'); g.fillStyle=v; g.fillRect(0,0,1024,196);
    g.fillStyle='#ffe89a'; g.beginPath(); g.arc(540,196,34,Math.PI,0); g.fill();
    g.fillStyle='rgba(255,170,150,.75)'; [[180,150,60],[330,124,44],[720,140,70],[880,164,50],[450,100,34]].forEach(([x,y,r])=>{ [[0,0,1],[.8,.12,.6],[-.8,.15,.55]].forEach(p=>{ g.beginPath(); g.ellipse(x+p[0]*r,y+p[1]*r,r*p[2],r*p[2]*.24,0,0,7); g.fill(); }); });
    const m=g.createLinearGradient(0,196,0,256); m.addColorStop(0,'#c0607a'); m.addColorStop(.35,'#4a548e'); m.addColorStop(1,'#2c4676'); g.fillStyle=m; g.fillRect(0,196,1024,60);
    g.fillStyle='#ffd888'; for(let i=0;i<9;i++){ const w=90-i*7; g.fillRect(540-w/2+((i%2)?9:-9),199+i*6.4,w,2.6); }
    g.fillStyle='#3a3260'; g.beginPath(); g.moveTo(250,197); g.quadraticCurveTo(300,168,352,197); g.fill(); });
  /* Bild: Horizont bei Höhe 1,4 */
  const ferne=new THREE.Mesh(new THREE.PlaneGeometry(24,6),new THREE.MeshBasicMaterial({map:abend})); ferne.position.set(0,3,Z-3.8); hinten.add(ferne);
  const see=new THREE.Mesh(new THREE.PlaneGeometry(24,1.5),basis(0x2c4676)); see.rotation.x=-Math.PI/2; see.position.set(0,-.02,Z-3.1); hinten.add(see);
  const wellen=new THREE.InstancedMesh(GEO.box,basis(0xffd0a8),22), o=new THREE.Object3D(); wellen.frustumCulled=false; hinten.add(wellen);
  k.anim.push(t=>{ for(let i=0;i<22;i++){ o.position.set(((i*2.17+t*.5)%16)-8,.02,Z-2.6-(i%4)*.3); o.scale.set(.5*Math.max(0,Math.sin(t*1.6+i*1.9))+.02,.015,.05); o.updateMatrix(); wellen.setMatrixAt(i,o.matrix); } wellen.instanceMatrix.needsUpdate=true; });
  const galerie=gruppe(dH,0,0,0);
  box(galerie,9.2,.12,2.2,HOLZ2,0,-.065,Z-1.3); for(let i=0;i<5;i++) box(galerie,9.2,.03,.38,i%2?HOLZ:0x8a5a30,0,.005,Z-.5-i*.42);
  for(let i=0;i<=16;i++){ const x=-4.4+i*.55; dreh(galerie,[[.08,0],[.05,.15],[.11,.35],[.05,.6],[.08,.75]],EDEL3,x,0,Z-2.3); }
  box(galerie,9.2,.12,.22,MESSING,0,.81,Z-2.3);
  verschmelze(galerie);
  /* eine Möwe gleitet draußen vorbei */
  const vogel=gruppe(hinten,0,2,Z-3.3); ball(vogel,.1,0xf8f4ee,0,0,0,1.8,.8,.8); const schwingen=[-1,1].map(s=>{ const f=gruppe(vogel,0,0,0); box(f,.34,.04,.16,0xf8f4ee,s*.22,0,0); return f; });
  k.anim.push(t=>{ vogel.position.set(((t*.7)%14)-7,1.9+Math.sin(t*1.3)*.25,Z-3.4); schwingen.forEach((f,i)=>f.rotation.z=(i?1:-1)*Math.sin(t*5)*.5); });

  /* ---------- Heckfenster mit Fenstertür ---------- */
  const rahmen=gruppe(dH,0,0,0), glas=basis(0xcfe8f8,{transparent:true,opacity:.14,depthWrite:false});
  const scheibe=(p,w,hh,x,y,z)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(w,hh),glas); m.position.set(x,y,z); p.add(m); };
  [-1,1].forEach(s=>{
    box(rahmen,2.3,.75,.34,EDEL,s*3.05,.375,Z-.12); [0,1].forEach(i=>box(rahmen,.82,.46,.06,EDEL3,s*(2.55+i*1.02),.36,Z+.07));
    [1.82,4.2].forEach(x=>box(rahmen,.24,4.8,.34,EDEL2,s*x,2.4,Z-.04));
    [2.62,3.4].forEach(x=>box(rahmen,.09,4.05,.12,EDEL2,s*x,2.78,Z-.08)); [.8,2.15,3.5].forEach(y=>box(rahmen,2.3,.09,.14,EDEL2,s*3.01,y,Z-.075));
    scheibe(hinten,2.2,4,s*3.01,2.78,Z-.12);
  });
  box(rahmen,8.8,.26,.42,EDEL2,0,4.86,Z+.02); box(rahmen,8.8,.07,.46,MESSING,0,5.02,Z+.02);
  box(rahmen,3.9,.22,.4,MESSING,0,4.02,Z); [-.9,0,.9].forEach(x=>box(rahmen,.08,.72,.12,EDEL2,x,4.44,Z-.09)); scheibe(hinten,3.4,.7,0,4.45,Z-.13);
  [-1,1].forEach(s=>box(rahmen,.12,4,.1,MESSING,s*1.77,2,Z+.17));
  box(rahmen,3.5,.06,.5,MESSING,0,.025,Z-.03);
  /* goldener Anker über der Tür */
  ring(rahmen,.13,.05,GOLD,0,5.82,Z+.2); box(rahmen,.11,.55,.1,GOLD,0,5.45,Z+.2); box(rahmen,.52,.09,.1,GOLD,0,5.62,Z+.21); ring(rahmen,.36,.065,GOLD,0,5.48,Z+.22,Math.PI).rotation.z=Math.PI; [-1,1].forEach(s=>kegel(rahmen,.12,.2,GOLD,s*.36,5.54,Z+.22));
  verschmelze(rahmen);
  /* zwei Glasflügel */
  const fluegel=[-1,1].map(s=>{ const g=gruppe(sc,s*1.7,0,Z-.08), r=-s;
    box(g,.2,3.85,.14,EDEL3,r*.1,1.95,0); box(g,.18,3.85,.14,EDEL3,r*1.6,1.95,0); [.45,3.8].forEach(y=>box(g,1.7,y<1?.8:.2,.13,EDEL3,r*.85,y,0));
    [1.75,2.8].forEach(y=>box(g,1.5,.08,.1,EDEL3,r*.85,y,0)); box(g,.08,2.9,.09,EDEL3,r*.85,2.3,0);
    box(g,1.15,.42,.04,EDEL2,r*.85,.45,.08); ring(g,.12,.025,MESSING,r*.85,.45,.12); ball(g,.08,GOLD,r*1.58,1.65,.14); box(g,.07,.3,.05,MESSING,r*1.58,1.65,.08);
    [.9,3.1].forEach(y=>walze(g,.06,.34,MESSING,r*.02,y,.06));
    scheibe(g,1.35,2.85,r*.85,2.3,0);
    verschmelze(g); return g; });
  /* Zahlenschloss mit goldenem Riegel, in Kopfhöhe darüber */
  const schloss=gruppe(sc,0,2.42,Z+.14);
  box(schloss,1.5,.14,.08,MESSING,0,0,-.03); [-.72,.72].forEach(x=>ball(schloss,.1,GOLD,x,0,0));
  box(schloss,.84,.62,.22,0xe0b040,0,0,.08); box(schloss,.92,.08,.24,GOLD,0,-.31,.08); ring(schloss,.26,.075,0xc8ced8,0,.31,.08,Math.PI);
  for(let i=0;i<3;i++){ box(schloss,.18,.24,.04,0xfff3cf,-.24+i*.24,-.02,.2); box(schloss,.05,.11,.02,0x3a2a10,-.24+i*.24,-.02,.23); }
  verschmelze(schloss);
  const tuer=ausgang(k,{ steh:[0,Z+1.35], durch:[0,Z-1.25], name:'Fenstertür', treffer:{x:0,y:2.1,z:Z+.1,b:3.6,h:4.2,t:.5}, schildOben:[0,4.5,Z+.7], glanz:[0,1.2,Z+.5],
    bewege:auf=>{ fluegel[0].rotation.y=auf*1.75; fluegel[1].rotation.y=-auf*1.75; schloss.visible=auf<.04; } });
  /* rote Vorhänge, leicht schwingend */
  [-1,1].forEach(s=>{ const g=gruppe(hinten,s*4.55,4.9,Z+.28);
    for(let i=0;i<6;i++){ const x=(i-2.5)*.2; strich(g,[x,0,(i%2)*.1],[s*.28+x*.32,-2.62,(i%2)*.06],.12,i%2?SAMT:ROT2); strich(g,[s*.28+x*.32,-2.62,(i%2)*.06],[s*.12+x*.85,-4.6,(i%2)*.08],.11,i%2?SAMT:ROT2); }
    ball(g,.34,GOLD,s*.28,-2.62,.05,1.25,.3,.7); ball(g,.1,GOLD,s*.28,-2.85,.28,.7,1.7,.7);
    verschmelze(g); k.anim.push(t=>{ g.rotation.z=Math.sin(t*.8+s)*.012; }); });
  const stange=gruppe(dH,0,0,0);
  strich(stange,[-5.3,4.97,Z+.4],[5.3,4.97,Z+.4],.06,MESSING); [-1,1].forEach(s=>ball(stange,.14,GOLD,s*5.35,4.97,Z+.4));
  for(let i=0;i<11;i++){ const x=-4+i*.8; ball(stange,.42,i%2?SAMT:ROT2,x,4.89,Z+.36,1.05,.55,.3); ball(stange,.06,GOLD,x,4.64,Z+.47); }
  verschmelze(stange);
  /* Fensterbänke mit Kissen */
  [-1,1].forEach(s=>{ const g=gruppe(deko,s*3.15,0,Z+.55);
    box(g,2,.5,.8,EDEL,0,.25,0); [-.5,.5].forEach(x=>box(g,.8,.3,.05,EDEL3,x,.25,.41)); box(g,2.08,.22,.86,SAMT,0,.61,0); box(g,2.1,.04,.88,GOLD,0,.5,0);
    const a=ball(g,.34,0x2f4a8a,s*.6,.95,-.15,1,.85,.4); a.rotation.z=s*.2; ball(g,.3,GOLD,s*.05,.9,-.18,1,.8,.4); ball(g,.07,GOLD,s*.6,.95,0);
    verschmelze(g); k.kasten(s*3.15,Z+.55,2.1,.9); });

  /* ---------- Teppiche ---------- */
  const flach=gruppe(sc,0,0,0);
  teppich(flach,15,11.5,-1,.012,-.5,'#94202a','#5a1018');
  teppich(flach,4.6,3.8,-14,.014,-3,'#2a5a52','#1a3430');
  teppich(flach,5,3.6,-8.8,.022,8.4,'#6a3270','#3a1a44');
  teppich(flach,5.4,3.6,13,.016,8.8,'#94202a','#4a1016');
  teppich(flach,3.4,2.6,0,.03,-10.9,'#243c72','#141f40');
  verschmelze(flach);

  /* ---------- Himmelbett in der linken hinteren Ecke ---------- */
  const bett=gruppe(sc,-15.4,0,-11);
  box(bett,4.2,.5,2.8,EDEL,0,.45,0); box(bett,4,.42,2.65,0xf6eedc,0,.9,0); box(bett,2.8,.16,2.75,0x2f4a8a,.62,1.15,0); box(bett,.3,.17,2.77,GOLD,-.72,1.17,0);
  [-.65,.65].forEach(z=>ball(bett,.5,0xfff8ec,-1.45,1.28,z,.85,.45,1.1)); box(bett,2.84,.4,.06,0x2f4a8a,.62,.9,1.4);
  box(bett,.22,1.9,2.9,EDEL3,-2.05,1.15,0); [-.8,0,.8].forEach(z=>ball(bett,.34,EDEL,-1.92,1.65,z,.2,1.1,1));
  [-2.05,2.05].forEach(x=>[-1.35,1.35].forEach(z=>{ walze(bett,.11,4.1,EDEL2,x,2.05,z); ball(bett,.17,GOLD,x,4.18,z); box(bett,.3,.3,.3,EDEL2,x,.15,z); }));
  [-1.35,1.35].forEach(z=>{ box(bett,4.2,.16,.14,EDEL2,0,3.98,z); for(let i=0;i<9;i++) ball(bett,.26,i%2?SAMT:ROT2,-1.85+i*.46,3.84,z,1,.75,.3); });
  [-2.05,2.05].forEach(x=>box(bett,.14,.16,2.7,EDEL2,x,3.98,0));
  [[-2.05,-1],[2.05,-1],[2.05,1]].forEach(([x,z])=>{ for(let i=0;i<3;i++){ const a=z*(1.3-i*.2); strich(bett,[x,3.9,a],[x,2,z*1.3],.12,i%2?SAMT:ROT2); strich(bett,[x,2,z*1.3],[x,.5,a],.12,i%2?SAMT:ROT2); } ball(bett,.22,GOLD,x,2,z*1.3,.8,.35,.8); });
  /* Stoffschildkröte auf der Decke */
  ball(bett,.32,GRUEN,.9,1.36,.3,1,.55,1); ball(bett,.17,0x8ac860,1.28,1.36,.3); [-1,1].forEach(s=>{ ball(bett,.03,0x101008,1.4,1.42,.3+s*.08); ball(bett,.11,0x8ac860,.75,1.26,.3+s*.3,1.2,.5,1); });
  verschmelze(bett); k.verdecker(bett,-15.4,-11,1.8); k.kasten(-15.4,-11,4.5,3.1);

  /* ---------- Kaminofen an der linken Wand ---------- */
  const ofen=gruppe(sc,-16.9,0,-3);
  [-.6,.6].forEach(x=>[-.75,.75].forEach(z=>ball(ofen,.17,0x24262c,x,.15,z,1,1.1,1))); box(ofen,1.6,1.7,2,EISEN,0,1.1,0); box(ofen,1.8,.16,2.2,0x2a2c32,0,2.02,0); box(ofen,1.72,.14,2.12,0x2a2c32,0,.28,0);
  box(ofen,.07,1,1.3,MESSING,.82,1.12,0); box(ofen,.05,.8,1.1,0x1a0e08,.85,1.12,0); [-.3,.3].forEach(z=>box(ofen,.05,.85,.05,0x24262c,.93,1.12,z));
  walze(ofen,.26,4.2,0x2a2c32,-.3,4.15,0); [2.2,3.9,5.5].forEach(y=>walze(ofen,.31,.14,MESSING,-.3,y,0));
  [-.8,.8].forEach(z=>ball(ofen,.08,GOLD,.85,1.75,z));
  /* Kessel obendrauf wäre eine zweite Kanne: hier stehen zwei Blumentöpfchen */
  [-.7,.7].forEach(z=>{ rohr(ofen,.2,.14,.3,0xc8603a,.35,2.25,z); ball(ofen,.22,GRUEN2,.35,2.52,z,1,.8,1); [0,1,2].forEach(i=>ball(ofen,.06,0xf8d040,.35+Math.cos(i*2.1)*.14,2.7,z+Math.sin(i*2.1)*.14)); });
  verschmelze(ofen); k.kasten(-16.9,-3,1.9,2.2); k.verdecker(ofen,-16.9,-3,1);
  const glut=[-.28,0,.28].map((z,i)=>{ const m=kegel(sc,.16,.5,basis(i===1?0xffd040:0xff7a1a),-16.005,.98,-3+z); m.scale.x=.04; m.castShadow=false; return m; });
  k.anim.push(t=>glut.forEach((m,i)=>{ const hh=.5*(1+Math.sin(t*(8+i*2.7)+i*2)*.3); m.scale.y=hh; m.position.y=.73+hh/2; }));
  schein(sc,'rgba(255,140,50,.6)',-15.8,1.1,-3,2.4);

  /* ---------- Ohrensessel am Ofen ---------- */
  [[-14.3,-5.3,-.95,0x2f6a4a],[-14.5,-.8,-2.25,SAMT]].forEach(([x,z,r,f])=>{ const g=gruppe(deko,x,0,z); g.rotation.y=r;
    box(g,1.3,.45,1.15,f,0,.5,0); box(g,1,.18,.95,f,0,.8,.08); box(g,1.3,1.4,.3,f,0,1.35,-.52); ball(g,.65,f,0,2.02,-.52,1,.38,.24);
    [-1,1].forEach(s=>{ box(g,.26,.55,1.1,f,s*.65,.95,.02); const w=walze(g,.17,1.12,f,s*.66,1.22,.02); w.rotation.x=Math.PI/2; ball(g,.3,f,s*.6,1.75,-.32,.35,1.1,.9); [-.45,.45].forEach(zz=>walze(g,.07,.3,EDEL2,s*.55,.15,zz)); });
    ball(g,.32,GOLD,0,1.15,-.28,1,.9,.35);
    verschmelze(g); k.kreis(x,z,.85); });

  /* ---------- Säulen (Schiffsstützen) mit Seilwicklung und Kerzen ---------- */
  [[-8.6,-.8],[8.4,-1.2]].forEach(([x,z])=>{ const g=gruppe(sc,x,0,z);
    box(g,.95,.34,.95,EDEL2,0,.17,0); rohr(g,.3,.34,5.5,EDEL3,0,3.05,0,14); box(g,.9,.25,.9,EDEL2,0,5.9,0);
    [.55,3.9,5.55].forEach(y=>{ const r=ring(g,.35,.06,MESSING,0,y,0); r.rotation.x=Math.PI/2; });
    for(let i=0;i<7;i++){ const r=ring(g,.34,.055,0xd2b47a,0,1.2+i*.1,0); r.rotation.x=Math.PI/2; }
    [-1,1].forEach(s=>{ strich(g,[s*.3,3.2,0],[s*.65,3.15,0],.045,MESSING); walze(g,.14,.07,MESSING,s*.68,3.18,0); walze(g,.07,.3,WEISS,s*.68,3.36,0); });
    verschmelze(g); [-1,1].forEach(s=>flamme(k,g,s*.68,3.52,0,.9)); k.verdecker(g,x,z,.55); k.kasten(x,z,.95,.95); });

  /* ---------- Stühle am Kartentisch ---------- */
  [[-7.55,-4.2,1.75],[-2.4,-4.4,-1.45]].forEach(([x,z,r])=>{ const g=gruppe(deko,0,0,0); stuhl(g,x,z,r); verschmelze(g); k.kreis(x,z,.52); });

  /* ---------- Papagei auf seiner Stange (Deko) ---------- */
  const staender=gruppe(deko,-6.3,0,-11.5);
  walze(staender,.42,.12,EDEL2,0,.06,0); walze(staender,.07,1.8,MESSING,0,.95,0); strich(staender,[-.6,1.85,0],[.6,1.85,0],.07,HOLZ3); [-.62,.62].forEach(x=>ball(staender,.1,GOLD,x,1.85,0)); walze(staender,.17,.14,MESSING,-.5,1.97,0);
  verschmelze(staender); k.kreis(-6.3,-11.5,.45);
  const pa=SCHIFF.papagei(sc,-6.25,1.9,-11.5); pa.g.rotation.y=-.9;
  k.anim.push(t=>{ pa.kopf.rotation.z=(t%5<1.6)?Math.sin(t*9)*.3:Math.sin(t*1.2)*.06; const s=(t%7<1.3)?Math.abs(Math.sin(t*13)):0; pa.fl[0].rotation.x=s*1.1; pa.fl[1].rotation.x=-s*1.1; });

  /* ---------- Kerzenleuchter am Boden ---------- */
  [[-12.2,-7.2],[2.8,-8.6],[11.4,4.9],[-4.8,11.7]].forEach(([x,z],i)=>{ const g=gruppe(sc,x,0,z);
    [0,1,2].forEach(j=>{ const a=j*2.094+i; strich(g,[Math.cos(a)*.38,.03,Math.sin(a)*.38],[0,.34,0],.05,MESSING); }); walze(g,.055,1.65,MESSING,0,1.1,0); ball(g,.13,GOLD,0,.9,0);
    [-.42,0,.42].forEach(a=>{ const y=a?1.88:2.04; if(a) strich(g,[0,1.65,0],[a,1.86,0],.035,MESSING); walze(g,.11,.05,GOLD,a,y,0); walze(g,.06,.32,WEISS,a,y+.18,0); });
    verschmelze(g); [-.42,0,.42].forEach(a=>flamme(k,g,a,(a?1.88:2.04)+.34,0,0)); schein(g,'rgba(255,190,90,.5)',0,2.4,0,1.7); k.kreis(x,z,.42); k.verdecker(g,x,z,.45); });

  /* ---------- Muschel-Vitrine an der rechten Wand ---------- */
  const vit=gruppe(sc,17.05,0,-10.6); vit.rotation.y=-Math.PI/2;
  box(vit,2.8,.9,1,EDEL,0,.45,0); [-.68,.68].forEach(x=>{ box(vit,1.15,.6,.05,EDEL3,x,.46,.52); ball(vit,.06,GOLD,x*.2,.5,.56); });
  box(vit,2.8,1.8,.1,EDEL2,0,1.8,-.45); [-1.36,0,1.36].forEach(x=>box(vit,.09,1.8,.9,EDEL,x,1.8,0)); [1.75,2.72].forEach(y=>box(vit,2.85,.09,.98,EDEL,0,y,0)); box(vit,3,.16,1.06,EDEL2,0,2.84,0); ball(vit,.18,GOLD,0,3.02,0);
  [.95,1.84].forEach((y,e)=>[-.95,-.4,.4,.95].forEach((x,i)=>{ const art=(i+e)%3, y0=y;
    if(art===0){ for(let j=-2;j<=2;j++){ const r=ball(vit,.2,j%2?0xf8c8b0:0xf0a890,x+j*.06,y0+.2,.12,.28,1,.35); r.rotation.z=-j*.36; } ball(vit,.08,0xf0a890,x,y0+.05,.14); }
    else if(art===1){ [0,1,2,3].forEach(j=>ball(vit,.2-j*.042,j%2?0xf4e2c0:0xd8a878,x,y0+.15+j*.14,.1,1,.7,1)); }
    else { strich(vit,[x,y0,.1],[x,y0+.45,.1],.05,0xf0605a); [-1,1].forEach(s=>{ strich(vit,[x,y0+.15,.1],[x+s*.2,y0+.42,.1],.038,0xf0605a); ball(vit,.055,0xf0605a,x+s*.2,y0+.44,.1); }); ball(vit,.06,0xf0605a,x,y0+.47,.1); } }));
  [-.68,.68].forEach(x=>scheibe(vit,1.28,1.68,x,1.8,.46));
  verschmelze(vit); k.kasten(17.05,-10.6,1.1,2.9);

  /* ---------- Kleiderschrank an der rechten Wand ---------- */
  const schrank=gruppe(sc,17.1,0,1.1); schrank.rotation.y=-Math.PI/2;
  box(schrank,2.8,3.5,1.1,EDEL,0,1.95,0); box(schrank,3.1,.22,1.3,EDEL2,0,3.8,0); box(schrank,2.95,.2,1.2,EDEL2,0,.25,0); [-1.2,1.2].forEach(x=>[-.35,.35].forEach(z=>ball(schrank,.15,GOLD,x,.12,z)));
  [-.68,.68].forEach(x=>{ box(schrank,1.2,3,.06,EDEL3,x,1.95,.57); box(schrank,.85,1.15,.04,EDEL,x,2.7,.62); box(schrank,.85,1.15,.04,EDEL,x,1.2,.62); ball(schrank,.08,GOLD,x*.2,1.95,.68); });
  ball(schrank,.5,EDEL3,0,3.95,.3,1.4,.55,.2); ball(schrank,.12,GOLD,0,4.05,.42);
  verschmelze(schrank); k.kasten(17.1,1.1,1.2,3); k.verdecker(schrank,17.1,1.1,1.4);

  /* ---------- Aquarium mit Fischen ---------- */
  const aqua=gruppe(sc,13.9,0,-2.6);
  box(aqua,2.4,.14,1.2,EDEL2,0,.96,0); [-1.05,1.05].forEach(x=>[-.46,.46].forEach(z=>box(aqua,.15,.92,.15,EDEL,x,.46,z))); box(aqua,2.1,.1,.9,EDEL,0,.35,0);
  box(aqua,2.2,.14,1,0xe8cf8e,0,1.1,0); [-1.1,1.1].forEach(x=>[-.5,.5].forEach(z=>box(aqua,.08,1.3,.08,MESSING,x,1.68,z))); [-.5,.5].forEach(z=>box(aqua,2.28,.08,.08,MESSING,0,2.34,z)); [-1.1,1.1].forEach(x=>box(aqua,.08,.08,1,MESSING,x,2.34,0));
  [[-.8,.7],[-.62,.45],[.75,.85],[.55,.4]].forEach(([x,l],i)=>{ strich(aqua,[x,1.15,-.2],[x+(i%2?.1:-.08),1.15+l,-.2],.045,i%2?GRUEN:GRUEN2); ball(aqua,.09,GRUEN2,x+(i%2?.1:-.08),1.15+l,-.2,.7,1.4,.5); });
  ball(aqua,.2,0x9a8a80,.1,1.22,.15,1.3,.8,1);
  verschmelze(aqua); k.kasten(13.9,-2.6,2.45,1.25);
  const wasser=new THREE.Mesh(GEO.box,basis(0x60b8e8,{transparent:true,opacity:.22,depthWrite:false})); wasser.scale.set(2.16,1.1,.96); wasser.position.set(0,1.72,0); aqua.add(wasser);
  [0xff8a1a,0xffd020,0xe84a8a].forEach((f,i)=>{ const g=gruppe(aqua,0,1.5+i*.24,(i-1)*.22); ball(g,.15,f,0,0,0,1.4,.9,.55); const s=kegel(g,.12,.2,f,-.27,0,0); s.rotation.z=-Math.PI/2; s.scale.z=.04; ball(g,.03,0x101018,.13,.04,.08); verschmelze(g);
    k.anim.push(t=>{ const a=t*(.6+i*.17)+i*2; g.position.x=Math.sin(a)*.68; g.position.y=1.55+i*.24+Math.sin(t*1.7+i)*.07; g.rotation.y=Math.cos(a)>0?0:Math.PI; }); });

  /* ---------- Klavier mit Hocker ---------- */
  const klavier=gruppe(sc,14.6,0,7.9);
  box(klavier,3.1,1.9,.75,EDEL2,0,1.05,-.2); box(klavier,3.25,.14,.9,EDEL,0,2.06,-.2); [-1.45,1.45].forEach(x=>{ box(klavier,.2,1.2,.6,EDEL2,x,.6,.4); ball(klavier,.13,GOLD,x,1.28,.62); });
  box(klavier,2.7,.14,.5,EDEL,0,1.05,.38); box(klavier,2.6,.07,.4,0xfaf6ea,0,1.15,.42); for(let i=0;i<17;i++){ if(i%7!==2&&i%7!==6) box(klavier,.08,.07,.24,0x141014,-1.2+i*.15,1.21,.33); }
  box(klavier,2.4,.55,.05,EDEL3,0,1.62,.2); [-.6,.6].forEach(x=>ring(klavier,.16,.025,MESSING,x,1.62,.25));
  /* Blumenvase obendrauf */
  dreh(klavier,[[0,0],[.14,0],[.24,.18],[.11,.4],[.17,.5]],0x2f6ab0,-.9,2.13,-.2); [[-.2,.82,0xf05a6a],[.05,.95,0xffd040],[.22,.78,0xf8f0f8]].forEach(([a,b,f])=>{ strich(klavier,[-.9,2.5,-.2],[-.9+a,2.13+b,-.2],.018,GRUEN); ball(klavier,.11,f,-.9+a,2.13+b,-.2); });
  verschmelze(klavier); k.kasten(14.6,7.95,3.25,1.2); k.verdecker(klavier,14.6,7.9,1.5);
  const hocker=gruppe(deko,14.6,0,9.7); walze(hocker,.5,.2,SAMT,0,.7,0); walze(hocker,.52,.07,GOLD,0,.58,0); walze(hocker,.1,.56,EDEL2,0,.3,0); walze(hocker,.38,.1,EDEL2,0,.06,0); verschmelze(hocker); k.kreis(14.6,9.7,.52);

  /* ---------- Harfe ---------- */
  const harfe=gruppe(sc,6.6,0,10.6); harfe.rotation.y=-.35;
  box(harfe,1.5,.2,.65,EDEL2,0,.1,0); walze(harfe,.1,2.5,GOLD,-.6,1.4,0); ball(harfe,.17,GOLD,-.6,2.72,0); strich(harfe,[.45,.2,0],[-.25,.4,0],.1,GOLD); strich(harfe,[.45,.2,0],[.62,2.15,0],.1,GOLD);
  strich(harfe,[-.6,2.55,0],[-.15,2.2,0],.09,GOLD); strich(harfe,[-.15,2.2,0],[.25,2.15,0],.09,GOLD); strich(harfe,[.25,2.15,0],[.66,2.35,0],.09,GOLD);
  for(let i=0;i<9;i++){ const x=-.45+i*.115; strich(harfe,[x,.38-i*.012,0],[x,[2.37,2.28,2.2,2.18,2.16,2.14,2.12,2.15,2.2][i],0],.009,0xfff8e0); }
  verschmelze(harfe); k.kreis(6.6,10.6,.8); k.verdecker(harfe,6.6,10.6,.75);

  /* ---------- Sofa vorne links, zur Raummitte gedreht ---------- */
  const sofa=gruppe(deko,-14.7,0,11.3); sofa.rotation.y=2.23;
  box(sofa,3.5,.42,1.35,EDEL,0,.45,0); box(sofa,3.3,.25,1.2,0x2a5a7a,0,.77,.04); box(sofa,3.5,.9,.28,0x2a5a7a,0,1.15,-.55); [-.9,0,.9].forEach(x=>ball(sofa,.5,0x2a5a7a,x,1.58,-.55,1,.32,.28));
  [-1,1].forEach(s=>{ const w=walze(sofa,.26,1.35,0x2a5a7a,s*1.65,1,0); w.rotation.x=Math.PI/2; ball(sofa,.12,GOLD,s*1.65,1,.7); box(sofa,.3,.5,1.3,EDEL,s*1.65,.7,0); [-.5,.5].forEach(z=>ball(sofa,.14,GOLD,s*1.5,.13,z)); });
  [[-1,SAMT],[1.05,GOLD]].forEach(([x,f])=>{ const a=box(sofa,.65,.55,.2,f,x,1.13,-.27); a.rotation.z=-x*.2; });
  verschmelze(sofa); [-1.25,0,1.25].forEach(a=>k.kreis(-14.7-a*.61,11.3-a*.79,.82));

  /* ---------- Sitzkissen vorne: eckig und flach, mit Quasten an den Ecken ---------- */
  const kissen=gruppe(deko,0,0,0);
  [[-1.9,12.2,SAMT,.25],[3.4,12.1,0x2f4a8a,-.2],[10.2,11.9,0x6a3270,.15]].forEach(([x,z,f,r])=>{ const g=gruppe(kissen,x,0,z); g.rotation.y=r;
    const q=new THREE.SphereGeometry(1,32,16), p=q.attributes.position, e=(v,n)=>Math.sign(v)*Math.pow(Math.abs(v),n);
    for(let i=0;i<p.count;i++){ const a=p.getX(i), b=p.getY(i), c=p.getZ(i), l=Math.hypot(a,c), w=Math.atan2(c,a); p.setXYZ(i,e(Math.cos(w),.25)*l*.58,e(b,.7)*.15,e(Math.sin(w),.25)*l*.58); }
    q.computeVertexNormals(); const m=new THREE.Mesh(q,mat(f)); m.position.y=.16; m.castShadow=m.receiveShadow=true; g.add(m);
    [-1,1].forEach(a=>[-1,1].forEach(b=>{ ball(g,.07,GOLD,a*.52,.15,b*.52); [-.04,0,.04].forEach(v=>strich(g,[a*.53,.15,b*.53],[a*(.65+v),.03,b*(.65-v)],.02,GOLD)); }));
    k.kreis(x,z,.68); });
  verschmelze(kissen);

  /* ---------- Topfpflanzen ---------- */
  const pflanzen=gruppe(deko,0,0,0);
  [[-17.15,12.5,1],[17.15,12.5,1],[17.15,-12.7,0],[-5.55,-12.75,0],[5.55,-12.75,1],[-12.2,-12.65,0],[17.15,5,0],[-17.15,2.9,1]].forEach(([x,z,art],i)=>{
    rohr(pflanzen,.4,.28,.62,0xb85a34,x,.31,z,14); walze(pflanzen,.44,.1,0xd0764a,x,.65,z); walze(pflanzen,.36,.02,0x3a2416,x,.71,z);
    if(art){ strich(pflanzen,[x,.7,z],[x,1.75,z],.07,0x7a5a30); for(let j=0;j<7;j++){ const a=j/7*6.283+i, ex=x+Math.cos(a)*.38, ez=z+Math.sin(a)*.38; strich(pflanzen,[x,1.75,z],[ex,2.05,ez],.035,GRUEN); const b=ball(pflanzen,.3,j%2?GRUEN:GRUEN2,ex,2,ez,1,.14,.38); b.rotation.y=-a; } ball(pflanzen,.13,GRUEN2,x,1.85,z); }
    else { for(let j=0;j<11;j++){ const a=j*2.4+i, r=j<5?.28:.16, y=j<5?.9:1.2+(j%3)*.12; ball(pflanzen,.24,j%2?GRUEN:GRUEN2,x+Math.cos(a)*r,y,z+Math.sin(a)*r,1,1.1,1); } for(let j=0;j<5;j++){ const a=j*1.3+i; ball(pflanzen,.075,j%2?0xff7aa0:0xffe060,x+Math.cos(a)*.4,1.15+(j%3)*.16,z+Math.sin(a)*.4); } }
    k.kreis(x,z,.45); });
  verschmelze(pflanzen);

  /* ---------- Wandschmuck: Wandteppich, Bullaugen, Wandleuchter ---------- */
  const wt=bild(384,256,(g)=>{ g.fillStyle='#e8c878'; g.fillRect(0,0,384,256); g.fillStyle='#7a1820'; g.fillRect(10,10,364,236); g.fillStyle='#8fd0e8'; g.fillRect(26,26,332,204);
    g.fillStyle='#ffd040'; g.beginPath(); g.arc(300,70,24,0,7); g.fill();
    ['#3a94c0','#2a6aa0','#1c4a7c'].forEach((f,j)=>{ g.fillStyle=f; g.beginPath(); g.moveTo(26,230); g.lineTo(26,140+j*28); for(let x=26;x<358;x+=41.5) g.quadraticCurveTo(x+21,116+j*28+(j%2)*8,x+41.5,140+j*28); g.lineTo(358,230); g.fill(); });
    g.fillStyle='#5a6a9a'; g.beginPath(); g.ellipse(160,142,74,36,0,0,7); g.fill(); g.beginPath(); g.moveTo(224,142); g.lineTo(276,102); g.lineTo(268,140); g.lineTo(290,160); g.fill(); g.fillStyle='#fff'; g.beginPath(); g.arc(120,132,8,0,7); g.fill(); g.fillStyle='#102030'; g.beginPath(); g.arc(119,133,4,0,7); g.fill();
    g.strokeStyle='#102030'; g.lineWidth=3; g.beginPath(); g.arc(118,148,16,.3,1.8); g.stroke(); g.strokeStyle='#e8f8ff'; g.lineWidth=5; [-1,0,1].forEach(s=>{ g.beginPath(); g.moveTo(140,106); g.quadraticCurveTo(140+s*10,66,140+s*34,76); g.stroke(); }); });
  const teppichWand=gruppe(links,-17.9,0,6);
  tafel(teppichWand,wt,3.9,2.6,.04,2.9,0).rotation.y=Math.PI/2; strich(teppichWand,[.1,4.28,-2.15],[.1,4.28,2.15],.06,MESSING); [-2.18,2.18].forEach(z=>ball(teppichWand,.12,GOLD,.1,4.28,z));
  for(let i=0;i<20;i++) box(teppichWand,.04,.28,.07,0xe8c878,.05,1.46,-1.85+i*.195);
  verschmelze(teppichWand);
  [[dR,17.93,3.9,-11,-Math.PI/2],[dR,17.93,3.9,11.2,-Math.PI/2],[dR,17.93,3.5,6,-Math.PI/2],[dL,-17.93,3.6,.2,Math.PI/2],[dL,-17.93,3.6,11.3,Math.PI/2],[dL,-17.93,4.7,-10.8,Math.PI/2],
    [dH,-15.5,4.9,Z+.03,0],[dH,-10.8,3.5,Z+.03,0],[dH,15.6,3.5,Z+.03,0]].forEach(([w,x,y,z,r])=>SCHIFF.bullauge(w,k,x,y,z,r));
  /* Wandleuchter: Halter in die Sammelgruppe, Flamme bleibt beweglich */
  const leuchter=(d,wandG,x,z,r)=>{ const g=gruppe(d,x,2.9,z); g.rotation.y=r; ball(g,.26,MESSING,0,0,.04,.8,1.2,.2); strich(g,[0,-.05,.05],[0,-.15,.38],.04,MESSING); walze(g,.17,.07,GOLD,0,-.12,.4); walze(g,.07,.34,WEISS,0,.09,.4);
    const f=gruppe(wandG,x,2.9,z); f.rotation.y=r; flamme(k,f,0,.27,.4,1.1); };
  leuchter(dH,hinten,-12,Z+.02,0); leuchter(dH,hinten,7.5,Z+.02,0); leuchter(dH,hinten,11.6,Z+.02,0);
  leuchter(dL,links,-17.65,3,Math.PI/2); leuchter(dR,rechts,17.65,-3,-Math.PI/2); leuchter(dR,rechts,17.65,9,-Math.PI/2);
  /* Wimpelketten an der Rückwand */
  const wimpel=gruppe(dH,0,0,0), WF=[0xf2c94c,0x2f8fd0,0xf4ecd8,0x2fb84a,0xe8622a];
  [[-17.4,-6.4],[6.4,17.4]].forEach(([a,b])=>{ let alt=[a,5.7]; for(let i=1;i<=12;i++){ const x=a+(b-a)*i/12, y=5.7-Math.sin(i/12*Math.PI)*.45; strich(wimpel,[alt[0],alt[1],Z+.42],[x,y,Z+.42],.018,0xd2b47a); if(i<12){ const w=kegel(wimpel,.2,.42,WF[i%5],x,y-.22,Z+.42); w.rotation.z=Math.PI; w.scale.z=.03; } alt=[x,y]; } });
  verschmelze(wimpel);
  /* Seilwicklungen als Girlande an den Seitenwänden */
  [[dL,-1],[dR,1]].forEach(([w,s])=>{ const g=gruppe(w,0,0,0); [[-9,-3],[-3,3],[3,9]].forEach(([a,b])=>{ let alt=[5.55,a]; for(let i=1;i<=8;i++){ const z=a+(b-a)*i/8, y=5.55-Math.sin(i/8*Math.PI)*.5; strich(g,[s*17.6,alt[0],alt[1]],[s*17.6,y,z],.055,0xd2b47a); alt=[y,z]; } ball(g,.13,MESSING,s*17.6,5.55,a); }); verschmelze(g); });

  /* ---------- Licht ---------- */
  /* Laternen an kurzen Wandarmen: mitten im Raum hängt nichts */
  [[hinten,dH,-13,-12.3,0,Z+.32],[hinten,dH,13,-12.3,0,Z+.32],[links,dL,-16.9,-6.5,-18,0],[links,dL,-16.9,7.6,-18,0],[rechts,dR,16.9,-8.6,18,0],[rechts,dR,16.9,3.9,18,0]].forEach(([w,d,x,z,wx,wz])=>{
    const a=wx||x, b=wz||z; strich(d,[a,5.96,b],[x,5.96,z],.055,EISEN); strich(d,[a,5.35,b],[(a+x)/2,5.96,(b+z)/2],.04,EISEN); box(d,.24,.9,.24,MESSING,a,5.62,b); ball(d,.09,MESSING,x,5.96,z);
    SCHIFF.haengeLampe(w,k,x,5.95,z); });
  flacker(k,-3.4,4.6,-6,0xffc070,.45,13); flacker(k,5,4.6,1.5,0xffc070,.45,13); flacker(k,-14.8,1.8,-3,0xff8a30,.75,9); flacker(k,-10,4.4,6.5,0xffc070,.35,11); flacker(k,0,2.8,Z+1.6,0xff9a70,.55,10); flacker(k,12,4.4,6.5,0xffc070,.35,11);

  [deko,dH,dL,dR].forEach(verschmelze);

  /* ---------- Katze und Maus ---------- */
  katze(k,[[-1.8,5.8],[5.6,5.9],[6.2,-1.8],[1.4,-2.4],[.6,-8.4],[-.7,-8.2],[-.9,.6],[-5.8,2.6],[-5.2,5.6]],1.5);
  maeuschen(k,[[-2.5,9.6],[-4.6,8.4],[-4,6.8],[-1,8]],2.2,2);

  return { tuer, start:[0,9.5] };
}

/* Verstecke für die Edelsteine */
const verstecke=[[-15.6,-8.4],[-11.4,-11.8],[-7.6,-12.4],[-16.6,-6.4],[-16.4,1.4],[-17,7.4],[-16.9,9.5],[-11.8,12.5],[-8.4,5],[-6.6,-6.8],[.2,12.5],[8.4,-3],[9,.4],[8.9,12.2],[16.9,11],[16.7,4],[15.9,-4.4],[14.6,-12.5],[12.4,-11.2],[5.2,-9.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10 */
const gegenstaende=[
  { x:-5, z:-4.2, steh:[-5,-2.25], kasten:[3.5,2.2], treffer:[3.5,1.9,2.3], baue(g){ /* 1 Kartentisch */
      [-1.4,1.4].forEach(x=>[-.8,.8].forEach(z=>{ walze(g,.13,1,EDEL2,x,.5,z); ball(g,.2,EDEL,x,.72,z); ball(g,.12,MESSING,x,.1,z); }));
      box(g,3.1,.1,.12,EDEL2,0,.34,0); box(g,3.2,.22,1.9,EDEL,0,1.02,0); box(g,3.45,.14,2.15,EDEL3,0,1.18,0);
      const karte=bild(512,320,(c)=>{ c.fillStyle='#ecd8a4'; c.fillRect(0,0,512,320); c.strokeStyle='#8a6a3a'; c.lineWidth=8; c.strokeRect(6,6,500,308); c.fillStyle='#a8d4e0'; c.fillRect(20,20,472,280);
        c.strokeStyle='rgba(60,110,140,.45)'; c.lineWidth=2; for(let x=80;x<492;x+=70){ c.beginPath(); c.moveTo(x,20); c.lineTo(x,300); c.stroke(); } for(let y=76;y<300;y+=62){ c.beginPath(); c.moveTo(20,y); c.lineTo(492,y); c.stroke(); }
        const insel=(x,y,rx,ry)=>{ c.fillStyle='#f0dc98'; c.beginPath(); c.ellipse(x,y,rx+9,ry+9,.3,0,7); c.fill(); c.fillStyle='#78b458'; c.beginPath(); c.ellipse(x,y,rx,ry,.3,0,7); c.fill(); };
        insel(110,110,56,38); insel(380,200,66,46); insel(250,252,26,18);
        c.fillStyle='#8a6a4a'; [[90,108],[122,100],[398,196]].forEach(([x,y])=>{ c.beginPath(); c.moveTo(x-18,y+14); c.lineTo(x,y-18); c.lineTo(x+18,y+14); c.fill(); });
        c.strokeStyle='#b0301c'; c.lineWidth=6; c.setLineDash([14,10]); c.beginPath(); c.moveTo(130,130); c.bezierCurveTo(220,60,260,210,360,214); c.stroke(); c.setLineDash([]); c.lineWidth=10; c.beginPath(); c.moveTo(356,196); c.lineTo(392,232); c.moveTo(392,196); c.lineTo(356,232); c.stroke();
        c.save(); c.translate(420,82); for(let i=0;i<8;i++){ c.rotate(Math.PI/4); c.fillStyle=i%2?'#b0301c':'#4a3418'; c.beginPath(); c.moveTo(-9,0); c.lineTo(0,i%2?-52:-34); c.lineTo(9,0); c.fill(); } c.fillStyle='#e8c050'; c.beginPath(); c.arc(0,0,9,0,7); c.fill(); c.restore(); });
      tafel(g,karte,2.75,1.65,-.12,1.262,0).rotation.x=-Math.PI/2;
      /* eingerollte Enden der Karte, Messing-Gewichte und Kerze */
      [-1.52,1.28].forEach(x=>{ const w=walze(g,.11,1.7,0xe0c88c,x,1.35,0); w.rotation.x=Math.PI/2; [-.87,.87].forEach(z=>ball(g,.08,0x8a6a3a,x,1.35,z)); });
      [[-1.05,.65],[.95,-.62]].forEach(p=>{ walze(g,.13,.13,MESSING,p[0],1.33,p[1]); ball(g,.07,GOLD,p[0],1.45,p[1]); });
      walze(g,.2,.05,MESSING,1.55,1.29,-.85); walze(g,.08,.4,WEISS,1.55,1.5,-.85); const f=kegel(g,.07,.2,basis(0xffb030,{transparent:true,opacity:.95}),1.55,1.82,-.85); f.castShadow=false; } },
  { x:9.4, z:2.8, dreh:-.18, steh:[9.1,4.55], kasten:[2.5,1.7], treffer:[2.4,1.9,1.6], baue(g){ /* 2 Schatztruhe: offen, voller Goldmünzen */
      const H0=0x8a4a22;
      box(g,2.1,.14,1.25,H0,0,.17,0); [-.57,.57].forEach(z=>box(g,2.1,.78,.13,H0,0,.55,z)); [-.99,.99].forEach(x=>box(g,.13,.78,1.05,H0,x,.55,0));
      [.4,.65].forEach(y=>box(g,2.12,.025,1.29,EDEL2,0,y,0));
      [-.75,.75].forEach(x=>[-.65,.65].forEach(z=>box(g,.16,.82,.05,GOLD,x,.55,z))); box(g,2.18,.09,.08,GOLD,0,.96,.63); [-1.05,1.05].forEach(x=>box(g,.08,.09,1.3,GOLD,x,.96,0));
      [-1,1].forEach(a=>[-.58,.58].forEach(z=>ball(g,.14,MESSING,a*.98,.12,z)));
      box(g,.42,.42,.08,GOLD,0,.72,.68); ball(g,.06,0x2a1a08,0,.76,.73); box(g,.05,.14,.02,0x2a1a08,0,.66,.725);
      /* offener Deckel, nach hinten geklappt */
      const d=gruppe(g,0,.98,-.62); d.rotation.x=-.28;
      box(d,2.1,.85,.14,H0,0,.43,-.05); const w=walze(d,.42,2.1,H0,0,.85,-.05); w.rotation.z=Math.PI/2; w.scale.set(.42,2.1,.14); box(d,1.86,.74,.04,SAMT,0,.45,.04);
      [-.75,.75].forEach(x=>box(d,.16,1.2,.2,GOLD,x,.6,-.05)); box(d,2.14,.09,.2,GOLD,0,.04,-.05);
      /* Münzberg und Perlenkette */
      ball(g,.75,0xe0a828,0,.72,0,1.22,.48,.68);
      for(let i=0;i<70;i++){ const a=i*2.4, r=Math.sqrt((i+.5)/70), x=Math.cos(a)*r*.88, z=Math.sin(a)*r*.47, m=walze(g,.13,.035,i%3?GOLD:0xffe27a,x,.76+(1-r*r)*.34+(i%4)*.012,z); m.rotation.set((zufall()-.5)*.7,0,(zufall()-.5)*.7); }
      for(let i=0;i<16;i++) ball(g,.06,0xfaf6f0,-.5+i*.045,1.02-Math.pow(Math.max(0,i-8)*.12,2)*.6,.38+Math.max(0,i-7)*.045);
      [[-.45,-.15],[.5,.05]].forEach(p=>{ ring(g,.17,.05,0xffe27a,p[0],1.15,p[1]).rotation.x=-.6; });
      [[1.25,.55],[1.18,.82],[-1.3,.65],[1.42,.7]].forEach(p=>walze(g,.13,.05,GOLD,p[0],.03,p[1])); schein(g,'rgba(255,220,110,.4)',0,1.25,.2,1.4); } },
  { x:-9.6, z:-9.8, steh:[-9.6,-8.2], r:.75, treffer:[1.6,3.3,1.2], baue(g){ /* 3 Hutständer mit Kapitänshut */
      [0,1,2].forEach(i=>{ const a=i*2.094+.52; strich(g,[Math.cos(a)*.62,.06,Math.sin(a)*.62],[0,.45,0],.08,EDEL2); ball(g,.1,MESSING,Math.cos(a)*.62,.09,Math.sin(a)*.62); });
      walze(g,.09,2.35,HOLZ3,0,1.45,0);
      /* roter Mantel mit goldenen Knöpfen */
      strich(g,[-.55,2.15,0],[.55,2.15,0],.07,HOLZ3);
      rohr(g,.34,.56,1.45,SAMT,0,1.45,0,16); ball(g,.5,SAMT,0,2.14,0,1.25,.35,.7);
      [-1,1].forEach(s=>{ strich(g,[s*.5,2.15,0],[s*.68,1.2,.05],.14,SAMT); const m=walze(g,.17,.2,GOLD,s*.68,1.25,.05); m.rotation.z=s*.19; ball(g,.17,GOLD,s*.52,2.28,.02,1.1,.4,.9); });
      strich(g,[-.1,2.2,.37],[-.03,.8,.57],.04,GOLD); strich(g,[.1,2.2,.37],[.03,.8,.57],.04,GOLD); [1.15,1.5,1.85].forEach((y,i)=>[-.17,.17].forEach(x=>ball(g,.06,GOLD,x,y,.53-i*.06)));
      /* Dreispitz: geschlossene flache Dreiecks-Krempe, runde Kuppel, Goldrand und Feder */
      const hut=gruppe(g,0,2.59,0); hut.rotation.x=.22;
      const kr=new THREE.Shape(); kr.moveTo(0,.92); kr.quadraticCurveTo(.3,.12,.94,-.52); kr.quadraticCurveTo(0,-.34,-.94,-.52); kr.quadraticCurveTo(-.3,.12,0,.92);
      const krempe=new THREE.Mesh(new THREE.ExtrudeGeometry(kr,{depth:.1,bevelEnabled:false,curveSegments:14}),mat(0x241c34,{side:THREE.DoubleSide})); krempe.rotation.x=Math.PI/2; krempe.position.y=.12; krempe.castShadow=true; hut.add(krempe);
      [[[0,.92],[.3,.12],[.94,-.52]],[[.94,-.52],[0,-.34],[-.94,-.52]],[[-.94,-.52],[-.3,.12],[0,.92]]].forEach(([a,m,b])=>{ const P=t=>[0,1].map(i=>(1-t)*(1-t)*a[i]+2*t*(1-t)*m[i]+t*t*b[i]);
        for(let i=0;i<8;i++){ const u=P(i/8), v=P((i+1)/8); strich(hut,[u[0],.14,u[1]],[v[0],.14,v[1]],.04,GOLD); ball(hut,.04,GOLD,u[0],.14,u[1]); } });
      ball(hut,.43,0x34284c,0,.24,-.04,1,1.05,.88);
      const band=ring(hut,.4,.04,GOLD,0,.22,-.04); band.rotation.x=Math.PI/2; band.scale.y=.9;
      ball(hut,.09,GOLD,0,.36,.34);
      /* Feder: schmale, sich überlappende Teile an einem Kiel, beginnt in der Kuppel */
      let alt=[.22,.46,.24];
      for(let i=1;i<=9;i++){ const t=i/9, n=[.22+t*.9,.46+Math.sin(t*2.1)*.5,.24-t*.3]; strich(hut,alt,n,.022,0xfff0c0);
        const f=ball(hut,.13,[0xe83a2a,0xf8603a,0xffa030][Math.floor((i-1)/3)],(alt[0]+n[0])/2,(alt[1]+n[1])/2,(alt[2]+n[2])/2,1.35,.5-t*.35,.18); f.rotation.z=Math.atan2(n[1]-alt[1],n[0]-alt[0]); alt=n; } } },
  { x:5.5, z:-6.2, steh:[5.5,-4.55], r:.85, treffer:[1.5,2.8,1.5], baue(g){ /* 4 große Sanduhr auf kleinem Ständer */
      [0,1,2].forEach(i=>{ const a=i*2.094+.5; strich(g,[Math.cos(a)*.62,0,Math.sin(a)*.62],[Math.cos(a)*.3,.62,Math.sin(a)*.3],.08,EDEL2); });
      walze(g,.72,.14,EDEL,0,.68,0); const r0=ring(g,.72,.035,MESSING,0,.68,0); r0.rotation.x=Math.PI/2;
      walze(g,.66,.16,HOLZ3,0,.83,0); walze(g,.66,.16,HOLZ3,0,2.55,0); walze(g,.5,.07,MESSING,0,.94,0); walze(g,.5,.07,MESSING,0,2.44,0); ball(g,.16,GOLD,0,2.7,0,1,.8,1);
      [0,1,2].forEach(i=>{ const a=i*2.094-.52, x=Math.cos(a)*.56, z=Math.sin(a)*.56; walze(g,.06,1.65,EDEL2,x,1.69,z); [1.2,1.69,2.18].forEach((y,j)=>ball(g,j===1?.13:.09,j===1?GOLD:MESSING,x,y,z)); });
      /* Sand unten (Kegel) und oben (Trichter), dazwischen der Strahl */
      kegel(g,.38,.42,0xf2b830,0,1.18,0); walze(g,.39,.06,0xf2b830,0,.99,0);
      const o2=kegel(g,.31,.34,0xf2b830,0,1.94,0); o2.rotation.x=Math.PI; walze(g,.31,.05,0xf2b830,0,2.12,0);
      walze(g,.022,.5,basis(0xffd050,{transparent:true,opacity:.95}),0,1.56,0);
      const glas=basis(0xcdf0ff,{transparent:true,opacity:.26,depthWrite:false,side:THREE.DoubleSide});
      dreh(g,[[.4,.97],[.47,1.15],[.43,1.35],[.22,1.56],[.06,1.69],[.22,1.82],[.43,2.03],[.47,2.23],[.4,2.41]],glas,0,0,0);
      [[.465,1.16],[.465,2.22],[.075,1.69]].forEach(p=>{ const r=ring(g,p[0],.016,0xe8f8ff,0,p[1],0); r.rotation.x=Math.PI/2; });
      [-.16,.16].forEach(y=>strich(g,[-.2,1.69+y*2.4,.43],[-.24,1.69+y*1.4,.4],.018,0xffffff)); } },
  { wand:'hinten', x:9.6, z:-13.5, steh:[9.6,-12.1], treffer:[2.4,2.8,.7], trefferY:1.2, baue(g){ /* 5 Bild der Kapitänin */
      box(g,2.35,2.75,.12,GOLD,0,2.6,.07);
      [-1.12,1.12].forEach(x=>{ box(g,.2,2.75,.14,0xd8a73a,x,2.6,.15); [-1.32,1.32].forEach(y=>ball(g,.19,0xffe27a,x,2.6+y,.2,1,1,.6)); }); [-1.32,1.32].forEach(y=>box(g,2.35,.2,.14,0xd8a73a,0,2.6+y,.15));
      ball(g,.28,0xffe27a,0,4.04,.16,1.4,.7,.45);
      const t=bild(256,320,(c)=>{ const v=c.createLinearGradient(0,0,0,320); v.addColorStop(0,'#6ab8e0'); v.addColorStop(.7,'#c8ecf4'); v.addColorStop(.71,'#2f78a8'); v.addColorStop(1,'#1c5078'); c.fillStyle=v; c.fillRect(0,0,256,320);
        const kr=(x,y,rx,ry,f)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); c.fill(); };
        const rotH='#d8481c'; kr(128,150,82,78,rotH); [[62,190],[56,224],[70,254],[194,190],[200,224],[186,254]].forEach(p=>kr(p[0],p[1],28,28,rotH));
        c.fillStyle='#a8222c'; c.beginPath(); c.moveTo(34,320); c.quadraticCurveTo(44,232,128,226); c.quadraticCurveTo(212,232,222,320); c.fill();
        c.fillStyle='#fff4e4'; c.beginPath(); c.moveTo(100,230); c.lineTo(156,230); c.lineTo(128,288); c.fill(); c.fillStyle='#f2c94c'; [[88,268],[84,298],[168,268],[172,298]].forEach(p=>kr(p[0],p[1],8,8,'#f2c94c'));
        c.fillStyle='#f4c8a0'; c.fillRect(114,196,28,40); kr(128,160,54,62,'#f8d0a8');
        c.fillStyle=rotH; c.beginPath(); c.moveTo(74,146); c.quadraticCurveTo(88,92,168,108); c.quadraticCurveTo(124,122,74,146); c.fill(); c.beginPath(); c.moveTo(182,148); c.quadraticCurveTo(182,110,150,102); c.lineTo(176,100); c.fill();
        [106,150].forEach(x=>{ kr(x,156,9,10,'#fff'); kr(x+1,157,6,7,'#2a6a4a'); kr(x+3,154,2.4,2.4,'#fff'); c.strokeStyle='#a8401c'; c.lineWidth=4; c.beginPath(); c.arc(x,150,15,3.85,5.55); c.stroke(); });
        kr(92,180,11,7,'rgba(240,110,100,.55)'); kr(164,180,11,7,'rgba(240,110,100,.55)'); c.strokeStyle='#c88868'; c.lineWidth=3; c.beginPath(); c.arc(126,174,6,.4,2.3); c.stroke();
        c.strokeStyle='#a8282c'; c.lineWidth=5; c.lineCap='round'; c.beginPath(); c.arc(128,180,23,.5,2.64); c.stroke(); kr(76,184,6,8,'#f2c94c'); kr(180,184,6,8,'#f2c94c');
        c.fillStyle='#241c34'; c.beginPath(); c.moveTo(28,110); c.quadraticCurveTo(80,96,128,104); c.quadraticCurveTo(176,96,228,110); c.quadraticCurveTo(196,48,128,40); c.quadraticCurveTo(60,48,28,110); c.fill();
        c.strokeStyle='#f2c94c'; c.lineWidth=6; c.beginPath(); c.moveTo(34,104); c.quadraticCurveTo(128,84,222,104); c.stroke(); kr(128,70,13,13,'#f2c94c');
        c.fillStyle='#2fb84a'; c.beginPath(); c.moveTo(150,52); c.quadraticCurveTo(206,6,236,38); c.quadraticCurveTo(196,34,164,66); c.fill(); });
      tafel(g,t,2,2.5,0,2.6,.2); } },
  { wand:'rechts', x:18, z:-6, dreh:-Math.PI/2, steh:[16.3,-6], treffer:[3.5,2.4,1], trefferY:1.2, baue(g){ /* 6 Bücherbord */
      g=gruppe(g,0,0,-.34);
      const F=[0xd0302a,0x2f6ac0,0x2f9a4a,0xf0b020,0x7a3aa0,0xe8e0c8,0x1f8a8a,0xe8702a];
      [1.55,2.7].forEach((y,e)=>{ box(g,3.4,.16,.75,HOLZ3,0,y,.55); box(g,3.4,.06,.06,MESSING,0,y,.95);
        let x=-1.55, i=e*3; while(x<1.15){ const w=.17+((i*7)%4)*.045, hh=.62+((i*5)%4)*.09, f=F[(i*3+e)%8]; box(g,w,hh,.5,f,x+w/2,y+.08+hh/2,.57); [.16,hh-.14].forEach(a=>box(g,w+.008,.05,.52,GOLD,x+w/2,y+.08+a,.57)); x+=w+.015; i++; }
        const s=box(g,.2,.72,.5,F[(e*5+2)%8],x+.3,y+.4,.57); s.rotation.z=.42; });
      [-1.45,1.45].forEach(x=>{ [1.55,2.7].forEach(y=>{ strich(g,[x,y-.55,.38],[x,y-.05,.82],.05,MESSING); ball(g,.07,GOLD,x,y-.57,.38); }); box(g,.16,2.5,.08,EDEL2,x,2.1,.38); ball(g,.1,GOLD,x,3.42,.42); }); } },
  { x:-11.6, z:2, dreh:.15, steh:[-11.35,3.65], kasten:[2.6,1.4], treffer:[2,2.3,1.5], baue(g){ /* 7 Logbuch auf dem Pult */
      box(g,1.3,.16,.95,EDEL2,0,.08,0); box(g,.9,.12,.7,EDEL,0,.22,0); dreh(g,[[.24,0],[.13,.15],[.2,.5],[.11,.98],[.18,1.18]],EDEL3,0,.28,0); strich(g,[.1,1.12,-.1],[1.06,1.34,-.2],.05,EDEL2);
      const p=gruppe(g,0,1.5,.04); p.rotation.x=.55;
      box(p,1.85,.12,1.25,EDEL,0,0,0); box(p,1.85,.1,.1,MESSING,0,.1,.62);
      box(p,1.66,.06,1.08,0x7a1f28,0,.09,-.02);
      const seite=bild(512,320,(c)=>{ c.fillStyle='#fbf2da'; c.fillRect(0,0,512,320); const v=c.createLinearGradient(216,0,296,0); v.addColorStop(0,'rgba(120,80,30,0)'); v.addColorStop(.5,'rgba(120,80,30,.5)'); v.addColorStop(1,'rgba(120,80,30,0)'); c.fillStyle=v; c.fillRect(216,0,80,320);
        c.strokeStyle='#3a4a7a'; c.lineWidth=5; for(let y=40;y<300;y+=32){ [[22,226],[290,490]].forEach(([a,b])=>{ if(a>200 && y<170) return; c.beginPath(); for(let x=a;x<b-((y*7)%60);x+=14) c.quadraticCurveTo(x+7,y+((x+y)%3-1)*7,x+14,y); c.stroke(); }); }
        c.strokeStyle='#8a4a20'; c.lineWidth=5; c.beginPath(); c.moveTo(330,130); c.quadraticCurveTo(390,160,450,130); c.lineTo(430,150); c.lineTo(348,150); c.closePath(); c.stroke(); c.beginPath(); c.moveTo(390,138); c.lineTo(390,40); c.lineTo(440,114); c.lineTo(390,114); c.stroke(); });
      [-1,1].forEach(s=>{ box(p,.79,.1,1,0xe8d8b0,s*.4,.15,-.02); });
      tafel(p,seite,1.58,1,0,.206,-.02).rotation.x=-Math.PI/2;
      strich(p,[.02,.22,-.5],[.03,.22,.5],.02,0xd0202a); box(p,.1,.03,.3,0xd0202a,.04,.12,.72);
      /* Tintenfass mit Schreibfeder an der Seite */
      box(g,.42,.08,.34,EDEL,1.08,1.38,-.2); walze(g,.13,.2,0x20305a,1.1,1.52,-.2); walze(g,.07,.07,MESSING,1.1,1.65,-.2);
      strich(g,[1.1,1.6,-.2],[1.32,2.18,-.32],.015,WEISS); const f=ball(g,.2,0xf8f8f4,1.3,2.1,-.3,.35,1.5,.18); f.rotation.z=-.36; } },
  { x:2.9, z:1.9, steh:[2.9,3.65], r:.9, treffer:[1.9,2.6,1.7], baue(g){ /* 8 Globus */
      [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.785; strich(g,[Math.cos(a)*.75,.05,Math.sin(a)*.75],[Math.cos(a)*.22,.42,Math.sin(a)*.22],.075,EDEL2); ball(g,.11,MESSING,Math.cos(a)*.75,.1,Math.sin(a)*.75); });
      dreh(g,[[.26,0],[.12,.14],[.19,.34],[.09,.52],[.16,.6]],EDEL3,0,.36,0); ball(g,.13,MESSING,0,.98,0);
      const welt=bild(512,256,(c)=>{ c.fillStyle='#2f86c8'; c.fillRect(0,0,512,256); c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=2; for(let x=0;x<=512;x+=64){ c.beginPath(); c.moveTo(x,0); c.lineTo(x,256); c.stroke(); } for(let y=32;y<256;y+=48){ c.beginPath(); c.moveTo(0,y); c.lineTo(512,y); c.stroke(); }
        const land=(P,f)=>{ c.fillStyle=f; c.beginPath(); c.moveTo(P[0],P[1]); for(let i=2;i<P.length;i+=2) c.lineTo(P[i],P[i+1]); c.closePath(); c.fill(); };
        [0,256].forEach(v=>{ land([v+20,50,v+70,34,v+110,60,v+90,90,v+66,100,v+58,124,v+40,92],'#8ac858'); land([v+70,128,v+104,140,v+96,176,v+76,214,v+66,170],'#e0c060'); land([v+150,46,v+210,36,v+242,70,v+206,84,v+196,66,v+164,80],'#78b850'); land([v+160,98,v+200,92,v+216,124,v+190,172,v+176,132,v+150,120],'#d8b058'); land([v+216,170,v+246,164,v+250,190,v+222,196],'#c89048'); });
        c.fillStyle='#f4faff'; c.fillRect(0,0,512,14); c.fillRect(0,240,512,16); });
      const k1=new THREE.Mesh(new THREE.SphereGeometry(.68,32,22),new THREE.MeshLambertMaterial({map:welt})); k1.position.set(0,1.78,0); k1.rotation.set(0,.7,.38); k1.castShadow=true; g.add(k1);
      const b=ring(g,.78,.045,GOLD,0,1.78,0,Math.PI); b.rotation.z=-1.19; [-1,1].forEach(s=>ball(g,.09,GOLD,s*.29,1.78-s*.72,0));
      const r=ring(g,.9,.055,EDEL,0,1.6,0); r.rotation.x=Math.PI/2; [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.785; strich(g,[Math.cos(a)*.2,.94,Math.sin(a)*.2],[Math.cos(a)*.9,1.6,Math.sin(a)*.9],.045,EDEL2); }); } },
  { x:12.4, z:-8.6, steh:[12.4,-6.95], kasten:[3,1.35], treffer:[2.8,2.5,1.0], baue(g){ /* 9 Schiffsmodell auf einem Tischchen */
      [-1.15,1.15].forEach(x=>[-.4,.4].forEach(z=>{ walze(g,.09,.85,EDEL2,x,.43,z); ball(g,.12,MESSING,x,.12,z); })); box(g,2.7,.16,1.1,EDEL,0,.93,0); box(g,2.82,.07,1.2,EDEL3,0,1.04,0);
      [-.55,.55].forEach(x=>{ box(g,.18,.3,.55,GOLD,x,1.22,0); });
      /* Rumpf */
      const f=new THREE.Shape(); f.moveTo(-1.15,.62); f.lineTo(-1.15,.28); f.quadraticCurveTo(-.9,-.02,-.5,0); f.lineTo(.55,0); f.quadraticCurveTo(1.05,.08,1.28,.55); f.lineTo(.55,.38); f.lineTo(-.55,.38); f.lineTo(-.58,.62); f.closePath();
      const rumpf=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:.5,bevelEnabled:true,bevelSize:.05,bevelThickness:.06,bevelSegments:1,curveSegments:8}),mat(0x9a4420)); rumpf.position.set(0,1.33,-.25); rumpf.castShadow=true; g.add(rumpf);
      box(g,1.7,.09,.64,GOLD,0,1.6,0); box(g,.58,.07,.66,GOLD,-.88,1.96,0); box(g,.5,.05,.5,HOLZ3,-.87,2,0); [-.75,-.4,0,.4,.75].forEach(x=>ball(g,.055,0x2a1408,x,1.5,.32));
      strich(g,[1.15,1.85,0],[1.58,2.14,0],.025,HOLZ3);
      /* drei Masten mit gewölbten Segeln */
      const segel=(x,y,w,hh)=>{ const q=new THREE.CylinderGeometry(w*.75,w*.75,hh,14,1,true,-.72,1.44), m=new THREE.Mesh(q,mat(0xfff4dc,{side:THREE.DoubleSide})); m.position.set(x,y,.03-w*.62); m.castShadow=true; g.add(m); strich(g,[x-w*.55,y+hh/2+.02,.04],[x+w*.55,y+hh/2+.02,.04],.022,HOLZ2); };
      [[-.62,3.05,.6],[.08,3.35,.78],[.72,2.85,.55]].forEach(([x,top,w],i)=>{ walze(g,.032,top-1.6,HOLZ2,x,(top+1.6)/2,0); segel(x,2.2,w,.52); segel(x,top-.38,w*.7,.36); ball(g,.05,GOLD,x,top+.02,0); const fa=box(g,.28,.16,.02,i===1?0x2fb84a:ROT,x-.15,top-.09,0); fa.rotation.z=.08; });
      strich(g,[.72,2.85,0],[1.56,2.13,0],.008,0xd2b47a); strich(g,[-.62,3.05,0],[-1.1,2,0],.008,0xd2b47a); strich(g,[-.62,3.05,0],[.08,3.35,0],.008,0xd2b47a); strich(g,[.08,3.35,0],[.72,2.85,0],.008,0xd2b47a); } },
  { x:-8.8, z:8.2, steh:[-8.8,9.95], r:.95, treffer:[2,2.2,1.9], baue(g){ /* 10 Teekanne auf kleinem Tisch */
      walze(g,.55,.1,EDEL2,0,.05,0); dreh(g,[[.26,0],[.13,.15],[.21,.45],[.12,.75],[.2,.86]],EDEL,0,.08,0);
      walze(g,.92,.1,EDEL3,0,.98,0); rohr(g,.96,1.04,.3,0xf8f0e0,0,.92,0,24,true); walze(g,.96,.04,0xf8f0e0,0,1.05,0); const sa=ring(g,1.03,.03,0x2f5ab8,0,.82,0); sa.rotation.x=Math.PI/2;
      /* bauchige Porzellankanne in Blau */
      const BL=0x2f62c8, kn=gruppe(g,-.12,1.07,0);
      dreh(kn,[[0,0],[.28,0],[.32,.07],[.5,.22],[.55,.42],[.48,.62],[.3,.74],[.28,.78]],BL,0,0,0);
      [[.545,.43,0xf8f4e8],[.3,.76,GOLD],[.315,.06,GOLD]].forEach(p=>{ const r=ring(kn,p[0],.028,p[2],0,p[1],0); r.rotation.x=Math.PI/2; });
      for(let i=0;i<9;i++){ const a=i/9*6.283; ball(kn,.06,0xf8f4e8,Math.cos(a)*.505,.28,Math.sin(a)*.505); }
      ball(kn,.3,BL,0,.78,0,1,.42,1); ball(kn,.1,GOLD,0,.96,0);
      strich(kn,[.42,.28,0],[.72,.48,0],.11,BL); strich(kn,[.72,.48,0],[.92,.82,0],.075,BL); ball(kn,.11,BL,.72,.48,0); const m=ring(kn,.08,.025,GOLD,.925,.83,0); m.rotation.x=Math.PI/2; m.rotation.y=-.55;
      const gr=ring(kn,.27,.065,BL,-.52,.42,0,Math.PI*1.3); gr.rotation.z=Math.PI*.35;
      [[.35,.62],[.62,-.34]].forEach(([x,z])=>{ rohr(g,.16,.11,.24,0xf8f4e8,x,1.19,z,16); walze(g,.14,.015,0x9a5a1c,x,1.312,z); const r=ring(g,.16,.018,0x2f62c8,x,1.3,z); r.rotation.x=Math.PI/2; ring(g,.08,.025,0xf8f4e8,x+.19,1.2,z); });
      } }
];

return { titel:'Die Kapitänskajüte', breite:36, tiefe:27, baue, gegenstaende, verstecke };
})();

/* Raum 4: Das Oberdeck bei Sonnenuntergang. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Angel) und 10 (Liegestuhl) sind neu.
   Ausgang: das Reling-Tor hinten rechts schwingt auf; dahinter Steg, Strickleiter, Beiboot und in der Ferne die Schatzinsel. */
RAEUME3D.piratenschiff[3] = (function(){
const { HOLZ, HOLZ2, HOLZ3, EISEN, MESSING, SEIL, ROT, WEISS, SAND, holzBild, wandStueck, deckBoden, papagei, moewe, reling, meer } = SCHIFF;
const B=36, T=27;
const BLAU=0x2a5aa8, GELB=0xf2c62a, GRUEN=0x3f9a4a, DUNKEL=0x4a2a14, SILBER=0xb8bec8, TORROT=0x9a3222;
const WASSER=-2.5;
const TX=7, TZ=-14.1;   /* Mitte des Reling-Tors */

/* Körper aus einem Profil [[Radius,Höhe],...], um die senkrechte Achse gedreht */
function dreh(p,profil,c,x,y,z){ const m=new THREE.Mesh(new THREE.LatheGeometry(profil.map(q=>new THREE.Vector2(q[0],q[1])),22),mat(c,{side:THREE.DoubleSide})); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; p.add(m); return m; }
function fass(p,x,y,z,s){
  const g=gruppe(p,x,y,z); g.scale.setScalar(s||1);
  rohr(g,.46,.46,.4,0xa0703a,0,.6,0,14); rohr(g,.46,.38,.4,0x94642f,0,.2,0,14); rohr(g,.38,.46,.4,0x94642f,0,1,0,14);
  walze(g,.35,.03,0xc09058,0,1.215,0);
  [[.1,.425],[.42,.468],[.8,.468],[1.12,.415]].forEach(([h,r])=>{ const q=ring(g,r,.025,EISEN,0,h,0); q.rotation.x=Math.PI/2; });
  return g;
}
/* Seiltrommel: aufgewickeltes Tau zwischen zwei Holzscheiben, daneben das lose Ende */
function seilrolle(p,x,y,z){
  walze(p,.46,.09,HOLZ2,x,y+.045,z); walze(p,.34,.42,SEIL,x,y+.3,z);
  [.15,.24,.33,.42].forEach(h=>{ const q=ring(p,.342,.018,0xa8844c,x,y+h,z); q.rotation.x=Math.PI/2; });
  walze(p,.46,.09,HOLZ,x,y+.555,z); walze(p,.09,.14,MESSING,x,y+.66,z);
  strich(p,[x+.32,y+.2,z+.1],[x+.58,y+.04,z+.3],.045,SEIL);
}
/* Fracht unter einem Netz: Stoffballen auf Brettern */
function fracht(p,x,z,b,t){
  const g=gruppe(p,x,0,z);
  box(g,b,.14,t,HOLZ2,0,.07,0);
  const w=b/2-.06, F=[0xc89a6a,0x5a7a8a,0xa86a4a,0x8a9a5a];
  [-1,1].forEach((v,i)=>{ box(g,w,.6,t-.2,F[i],v*(w/2+.03),.45,0); [-.3,.3].forEach(q=>box(g,.07,.62,t-.18,DUNKEL,v*(w/2+.03)+q*w,.455,0)); });
  box(g,b*.55,.5,t*.65,F[2],.05,1.0,0);
  /* Netz darüber: Maschen vorn, hinten und oben */
  const n=Math.round(b/.45);
  for(let i=0;i<=n;i++){ const u=-b/2+i*b/n, o=u*.58;
    [-1,1].forEach(v=>{ strich(g,[u,.12,v*(t/2+.02)],[o,1.29,v*t*.33],.018,SEIL); }); strich(g,[o,1.29,-t*.33],[o,1.29,t*.33],.018,SEIL); }
  [[.4,t/2-.03],[.78,t*.45],[1.29,t*.33]].forEach(([y,q])=>{ const l=b/2*(1-(y-.12)*.36); [-1,1].forEach(v=>strich(g,[-l,y,v*q],[l,y,v*q],.018,SEIL)); });
}
/* Sitzbank ohne Lehne, entlang x */
function holzbank(p,x,z,l,d,kissen){
  const g=gruppe(p,x,0,z); g.rotation.y=d||0;
  box(g,l,.13,.55,HOLZ3,0,.62,0); [-1,1].forEach(v=>box(g,.16,.56,.46,HOLZ2,v*(l/2-.2),.28,0)); box(g,l-.5,.1,.12,HOLZ,0,.24,0);
  if(kissen!==undefined){ box(g,.75,.14,.48,kissen,-l/4,.75,0); box(g,.1,.15,.49,WEISS,-l/4,.752,0); }
}
/* Zitronenbäumchen im Kübel */
function baeumchen(p,x,z){
  rohr(p,.45,.32,.62,0xb8603a,x,.31,z,14); const r=ring(p,.45,.055,0x9a4a2a,x,.62,z); r.rotation.x=Math.PI/2;
  walze(p,.07,.75,HOLZ2,x,.98,z);
  [[0,1.55,0,.45],[-.28,1.35,.1,.3],[.3,1.38,-.08,.32],[.05,1.88,.02,.28]].forEach((b,i)=>ball(p,b[3],i%2?0x4f9a3a:0x3f8a3a,x+b[0],b[1],z+b[2]));
  [[-.35,1.5,.3],[.3,1.62,.33],[.02,1.28,.42],[.42,1.3,.15],[-.1,1.9,.26]].forEach(q=>ball(p,.09,0xffd820,x+q[0],q[1],z+q[2],1,1.15,1));
}
/* Möwe, die sitzt (Deko) */
function sitzMoewe(p,x,y,z,d){
  const g=gruppe(p,x,y,z); g.rotation.y=d;
  [-1,1].forEach(s=>walze(g,.022,.18,0xf2a81a,0,.09,s*.07));
  ball(g,.2,0xf6f6f2,0,.32,0,1.5,.85,.85); ball(g,.13,0xf6f6f2,.25,.52,0); const n=kegel(g,.05,.18,0xf2a81a,.42,.5,0); n.rotation.z=-Math.PI/2;
  [-1,1].forEach(s=>{ ball(g,.022,0x101010,.33,.56,s*.075); ball(g,.15,0xb8bec8,-.07,.35,s*.14,1.5,.6,.4); });
  box(g,.24,.04,.16,0x4a4e58,-.34,.33,0);
  return g;
}

/* Matrosin oder Matrose, Blick nach +x */
function matrose(k){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0), haut=0xdca078;
  rohr(r,.25,.34,.8,WEISS,0,1.18,0,16);
  [.9,1.12,1.34].forEach((y,i)=>{ const q=ring(r,.325-i*.028,.04,BLAU,0,y,0); q.rotation.x=Math.PI/2; });
  walze(r,.35,.1,DUNKEL,0,.8,0);
  ball(r,.31,haut,0,1.86,0); [-1,1].forEach(s=>{ ball(r,.04,0x20140e,.29,1.88,s*.11); ball(r,.27,WEISS,0,1.5,s*.22,.8,.5,.7); });
  const m=ring(r,.085,.016,0x8a3a30,.3,1.77,0,Math.PI); m.rotation.set(0,Math.PI/2,Math.PI);
  ball(r,.3,0x2a1a10,-.08,1.88,0,.95,1,1.04);
  ball(r,.31,ROT,-.03,2.04,0,1.02,.62,1.04); ball(r,.09,ROT,-.34,1.98,.05); strich(r,[-.34,1.96,.05],[-.5,1.72,.14],.045,ROT);
  const glied=(y,z,c,rad,l,fuss)=>{ const a=gruppe(g,0,y,z); walze(a,rad,l,c,0,-l/2,0); if(fuss) ball(a,.14,0x3a2210,.07,-l,0,1.4,.65,1); else ball(a,.1,haut,0,-l-.03,0); verschmelze(a); return a; };
  const beine=[-1,1].map(s=>glied(.78,s*.15,0x2c3c66,.11,.7,true)), arme=[-1,1].map(s=>{ const a=glied(1.5,s*.4,WEISS,.085,.58,false); a.rotation.x=-s*.14; return a; });
  verschmelze(r);
  k.anim.push(t=>{ beine.forEach((b,i)=>b.rotation.z=Math.sin(t*5+i*3.14)*.4); arme.forEach((a,i)=>a.rotation.z=-Math.sin(t*5+i*3.14)*.35); });
  return g;
}
/* kleine Möwe, die über das Deck watschelt */
function laufMoewe(k){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0); sitzMoewe(r,0,0,0,0); verschmelze(r); return g;
}
/* springender Fisch: taucht regelmäßig aus dem Meer auf */
function springFisch(k,x,z,richt,farbe,versatz){
  const g=gruppe(k.scene,x,WASSER-1,z); g.rotation.y=richt; const r=gruppe(g,0,0,0);
  ball(r,.35,farbe,0,0,0,1.8,.85,.55); ball(r,.24,0xf4ecd8,.1,-.12,0,1.8,.6,.7);
  [-1,1].forEach(s=>{ const f=kegel(r,.16,.5,farbe,-.72,s*.15,0); f.rotation.z=Math.PI/2+s*.55; f.scale.z=.05; ball(r,.07,0xffffff,.42,.08,s*.16); ball(r,.035,0x101010,.46,.08,s*.21); });
  const fl=kegel(r,.15,.35,farbe,-.05,.36,0); fl.scale.z=.05;
  verschmelze(r); g.traverse(m=>{ m.castShadow=false; });
  const welle=new THREE.Mesh(new THREE.RingGeometry(.75,1,24),basis(0xeaf8ff,{transparent:true,opacity:0,depthWrite:false})); welle.rotation.x=-Math.PI/2; welle.position.set(x,WASSER+.07,z); k.scene.add(welle);
  k.anim.push(t=>{ const p=((t+versatz)%5.5)/5.5, u=p/.26, spr=u<1;
    g.visible=spr; if(spr){ const w=(u-.5)*2.6; g.position.set(x+Math.cos(richt)*w,WASSER-.35+Math.sin(u*Math.PI)*1.7,z-Math.sin(richt)*w); r.rotation.z=(.5-u)*2.2; }
    const q=Math.max(0,(p-.24)/.2), da=p>.24&&q<1; welle.visible=da; if(da){ welle.position.set(x+Math.cos(richt)*1.3,WASSER+.07,z-Math.sin(richt)*1.3); welle.scale.setScalar(.2+q*1.1); welle.material.opacity=.8*(1-q); } });
}

function baue(k){
  const sc=k.scene;
  sc.background=new THREE.Color(0xf0a47c);
  sc.add(new THREE.HemisphereLight(0xffdcc0,0x6a4a56,.76));
  const sonne=new THREE.DirectionalLight(0xffb878,.56); sonne.position.set(-13,22,9); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=62; sonne.shadow.bias=-.001; sc.add(sonne);

  const hinten=k.wand('hinten');
  const fest=gruppe(sc,0,0,0);

  /* ---------- Himmel, Meer, Abendsonne ---------- */
  const abend=bild(1024,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#2c2f66'); v.addColorStop(.45,'#6a4a8a'); v.addColorStop(.64,'#d86a70'); v.addColorStop(.74,'#ff9a64'); v.addColorStop(.82,'#ffd884'); v.addColorStop(1,'#ffd884'); g.fillStyle=v; g.fillRect(0,0,1024,512);
    const sx=567, sy=396; g.save(); g.translate(sx,sy); g.scale(.28,1);
    const s=g.createRadialGradient(0,0,0,0,0,120); s.addColorStop(0,'rgba(255,245,190,1)'); s.addColorStop(1,'rgba(255,210,120,0)'); g.fillStyle=s; g.fillRect(-120,-120,240,240); g.fillStyle='#fff0a8'; g.beginPath(); g.arc(0,0,42,0,6.283); g.fill(); g.restore();
    g.fillStyle='rgba(255,180,170,.55)'; [[80,300,60,7],[260,340,80,6],[430,285,50,8],[690,320,90,7],[860,270,55,9],[980,350,70,5],[540,240,60,6]].forEach(p=>{ g.beginPath(); g.ellipse(p[0],p[1],p[2],p[3],0,0,6.283); g.fill(); }); });
  const kuppel=new THREE.Mesh(new THREE.CylinderGeometry(90,90,70,48,1,true),new THREE.MeshBasicMaterial({map:abend,side:THREE.BackSide})); kuppel.position.y=20; sc.add(kuppel);
  meer(k,WASSER,0x33689a);
  /* Glitzerstraße der Abendsonne */
  const glanz=new THREE.InstancedMesh(GEO.box,basis(0xffc070),110), o=new THREE.Object3D(), GP=[];
  for(let i=0;i<110;i++){ const z=-16-zufall()*48; GP.push({ x:z*.34+(zufall()-.5)*(3+(-z)*.12), z, p:zufall()*6, l:.5+zufall()*1.2 }); }
  glanz.frustumCulled=false; sc.add(glanz);
  k.anim.push(t=>{ GP.forEach((p,i)=>{ const s=Math.max(0,Math.sin(t*2.1+p.p)); o.position.set(p.x,WASSER+.06,p.z); o.rotation.set(0,0,0); o.scale.set(p.l*s+.05,.02,.13); o.updateMatrix(); glanz.setMatrixAt(i,o.matrix); }); glanz.instanceMatrix.needsUpdate=true; });
  /* Abendwolken, die langsam ziehen */
  [[-34,2,-52,0xffb4a0],[-8,5.5,-62,0xf89aa4],[24,3.5,-58,0xffc4a0],[44,7,-42,0xf4a0b0],[-48,8,-24,0xffd0b0],[6,11,-62,0xd890b8]].forEach(([x,y,z,f],i)=>{
    const w=gruppe(sc,x,y,z), m=basis(f); [[0,0,0,2.6],[2.7,-.3,.2,1.9],[-2.6,-.4,0,1.8],[1,.8,-.2,1.7],[4.6,-.6,0,1.1]].forEach(p=>{ const q=ball(w,p[3],m,p[0],p[1],p[2],1.2,.5,.7); q.castShadow=false; q.receiveShadow=false; });
    verschmelze(w); w.traverse(q=>{ q.castShadow=false; });
    k.anim.push(t=>{ w.position.x=((x+t*(.35+i*.05)+50)%100)-50; }); });

  /* ---------- Schatzinsel in der Ferne ---------- */
  const insel=gruppe(sc,15,WASSER,-33);
  ball(insel,1,SAND,0,0,0,8.5,.75,4.6); ball(insel,1,0xf6e2a8,-5.5,0,1.8,3.2,.45,2);
  ball(insel,1,GRUEN,1.2,.4,-.8,4.6,2.5,2.8); ball(insel,1,0x2f7a3a,3.9,.4,-.2,2.8,1.8,2); ball(insel,1,0x4fae52,-1.8,.4,.2,2.6,1.6,1.9);
  const berg=kegel(insel,1.7,3.8,0x8a7a6a,1.4,2.8,-1.4); berg.scale.z=1.1;
  ball(insel,.8,0x2a1a10,-.4,.9,2.1,1,1,.5); ball(insel,.45,0x9a9488,-1.5,.65,2.55); ball(insel,.35,0x8a8478,.7,.6,2.6);
  [[-6,1.7,3.1,-.3],[-4.1,2.5,2.2,.2],[5.7,1.2,2.5,.35],[7,.2,2,.15],[-3.2,3.1,.9,-.15]].forEach(([x,z,h,n])=>{
    const sp=[x+n*2,h+.4,z]; strich(insel,[x,.4,z],sp,.2,0x8a5a2a);
    for(let i=0;i<6;i++){ const a=i*1.047; strich(insel,sp,[sp[0]+Math.cos(a)*1.25,sp[1]-.25,sp[2]+Math.sin(a)*.9],.12,i%2?0x3f9a4a:0x58b84a); }
    ball(insel,.22,0x6b4a24,sp[0],sp[1]-.2,sp[2]+.15); });
  const brandung=gruppe(insel,0,0,0); [-7,-4.5,-2,.5,3,5.5].forEach((x,i)=>ball(brandung,.5,basis(0xffffff),x,.05,4.4+(i%2)*.3-Math.abs(x)*.12,2,.1,.4));
  verschmelze(insel); insel.traverse(q=>{ q.castShadow=false; });
  schein(sc,'rgba(255,225,120,.55)',14.6,-1.4,-30.4,2.4);

  /* ---------- Deck und Schiffsrumpf ---------- */
  deckBoden(k,37,28,[170,116,70],[4,4.6]);
  const tex=holzBild([118,70,38]), H=3.5, uy=-H/2-.04;
  wandStueck(sc,tex,38,H,.5,0,uy,14.25); wandStueck(sc,tex,38,H,.5,0,uy,-14.25);
  wandStueck(sc,tex,.5,H,28,-18.75,uy,0); wandStueck(sc,tex,.5,H,28,18.75,uy,0);
  const rumpf=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ box(rumpf,.55,.2,28,HOLZ2,s*18.76,-.06,0);
    box(rumpf,.2,.24,28.6,GELB,s*19.03,-.6,0); box(rumpf,.2,.2,28.6,DUNKEL,s*19.03,-1.9,0);
    box(rumpf,38.1,.24,.2,GELB,0,-.6,s*14.53); box(rumpf,38.1,.2,.2,DUNKEL,0,-1.9,s*14.53);
    [-1,1].forEach(v=>walze(rumpf,.35,H+.2,DUNKEL,s*18.8,uy,v*14.3)); });
  box(rumpf,37.1,.2,.55,HOLZ2,0,-.06,14.27); box(rumpf,37.1,.2,.55,HOLZ2,0,-.064,-14.27);
  /* niedrige Fußleiste vorn */
  for(let x=-17.9;x<18;x+=1.2) box(rumpf,1.12,.26+(Math.abs(Math.round(x*7))%3)*.03,.36,HOLZ2,x,.15,14.3);
  /* Bordfenster außen */
  for(let x=-15;x<=15;x+=5){ walze(rumpf,.42,.06,basis(0xffd878),x,-1.25,14.52).rotation.x=Math.PI/2; ring(rumpf,.45,.09,MESSING,x,-1.25,14.56); box(rumpf,.06,.8,.04,DUNKEL,x,-1.25,14.57); box(rumpf,.8,.06,.04,DUNKEL,x,-1.25,14.575); }
  [-1,1].forEach(s=>{ for(let z=-9;z<=9;z+=4.5){ walze(rumpf,.42,.06,basis(0xffd878),s*19.02,-1.25,z).rotation.z=Math.PI/2; const r=ring(rumpf,.45,.09,MESSING,s*19.07,-1.25,z); r.rotation.y=Math.PI/2; } });
  /* Bugspriet links */
  strich(rumpf,[-18.8,-.5,-8],[-24.5,1.6,-9],.28,HOLZ); strich(rumpf,[-24.4,1.57,-9],[-18.7,1.0,-12.5],.03,SEIL); ball(rumpf,.3,MESSING,-24.6,1.63,-9);
  verschmelze(rumpf);
  /* Reling: links, rechts, hinten (Aufbau links hinten, Lücke für das Tor) */
  reling(k,sc,[-18.62,13.6],[-18.62,-14.1]); reling(k,sc,[18.62,13.6],[18.62,-14.1]);
  reling(k,sc,[-18.62,-14.12],[-14.35,-14.12]); reling(k,sc,[-.65,-14.12],[TX-2.45,-14.12]); reling(k,sc,[TX+2.45,-14.12],[18.62,-14.12]);
  [[2.2,-14.12,-1.9],[13.6,-14.12,-1.2],[-18.62,-5.4,-.4],[18.62,4.4,3.4]].forEach(([x,z,d])=>sitzMoewe(fest,x,1.17,z,d));

  /* ---------- Heckaufbau: daran hängen Glocke und Flagge ---------- */
  wandStueck(hinten,tex,13.6,3.7,.8,-7.5,1.85,-13.5);
  const auf=gruppe(hinten,0,0,0);
  box(auf,14,.24,1.15,HOLZ3,-7.5,3.82,-13.46); box(auf,13.9,.2,.2,GELB,-7.5,3.55,-13.03); box(auf,13.8,.3,.2,DUNKEL,-7.5,.15,-13.03);
  [-14.2,-12.4,-8.6,-6.4,-2.7,-.8].forEach(x=>{ box(auf,.3,3.7,.22,DUNKEL,x,1.85,-13.05); box(auf,.45,.2,.34,MESSING,x,3.36,-13.02); });
  for(let x=-14.2;x<=-.7;x+=.9){ walze(auf,.08,.8,HOLZ2,x,4.34,-13.05); ball(auf,.1,MESSING,x,4.78,-13.05); }
  box(auf,13.8,.14,.18,HOLZ,-7.5,4.68,-13.05);
  /* erleuchtete Heckfenster */
  [-7.5,-13.3,-1.75].forEach((x,i)=>{ const w=i?.95:1.5;
    box(auf,w+.3,1.4,.08,MESSING,x,2.15,-13.08); box(auf,w,1.1,.06,basis(0xffd070),x,2.15,-13.03);
    box(auf,.07,1.1,.05,DUNKEL,x,2.15,-12.99); box(auf,w,.07,.05,DUNKEL,x,2.2,-12.985); box(auf,w+.5,.14,.3,HOLZ3,x,1.38,-12.99);
    if(!i){ box(auf,1.7,.3,.34,TORROT,x,1.57,-12.86); box(auf,1.76,.07,.4,HOLZ3,x,1.73,-12.86);
      for(let j=0;j<11;j++){ const b=ball(auf,.14,j%2?0x3f8a3a:0x58a844,x-.75+j*.15,1.82+(j%3)*.04,-12.84,.55,1.25,.35); b.rotation.z=(j%2?1:-1)*.6; }
      [[-.6,2.12,0xe0302a],[-.2,2.28,0xf06aa0],[.22,2.1,0xe0302a],[.62,2.25,0xf06aa0]].forEach(([d,y,f])=>{ strich(auf,[x+d,1.74,-12.84],[x+d,y,-12.78],.022,0x2f7a30);
        for(let n=0;n<5;n++){ const a=n*1.2566+1.5708; ball(auf,.085,f,x+d+Math.cos(a)*.1,y+Math.sin(a)*.1,-12.76,1,1,.35); } ball(auf,.06,0xffd820,x+d,y,-12.72,1,1,.5); }); } });
  /* aufgehängtes Netz unter dem mittleren Fenster */
  box(auf,2,.09,.12,HOLZ,-7.5,1.22,-12.98);
  for(let i=0;i<=8;i++){ const x=-8.4+i*.225; strich(auf,[x,1.2,-12.97],[Math.min(-6.6,x+.55),.35,-12.97],.016,SEIL); strich(auf,[x,1.2,-12.965],[Math.max(-8.4,x-.55),.35,-12.965],.016,SEIL); }
  fass(auf,-12.9,3.93,-13.5,.62); fass(auf,-2.2,3.93,-13.5,.62); sitzMoewe(auf,-6.4,4.84,-13.05,-1.2);
  baeumchen(gruppe(auf,0,3.93,0),-9.4,-13.5);
  verschmelze(auf);
  [-12.4,-2.7].forEach(x=>{ const g=gruppe(hinten,x,2.9,-12.62); strich(g,[0,.2,-.4],[0,.2,0],.04,EISEN); kegel(g,.28,.22,EISEN,0,.08,0); walze(g,.17,.36,basis(0xffd36a),0,-.2,0); walze(g,.22,.08,EISEN,0,-.42,0); [-.17,.17].forEach(v=>walze(g,.018,.4,EISEN,v,-.2,.05)); verschmelze(g); schein(g,'rgba(255,200,100,.65)',0,-.2,.15,1.8); });
  flacker(k,-12.4,2.7,-12,0xffa848,.4,8); flacker(k,-2.7,2.7,-12,0xffa848,.4,8);
  k.kasten(-7.5,-13.5,13.8,.95);
  k.kasten(-10.5,-12.5,2.3,1.2);   /* Glockengestell */

  /* Treppe hinauf zum Heckaufbau */
  const treppe=gruppe(sc,0,0,0);
  for(let i=0;i<9;i++){ const h=(i+1)*.42, z=-9.5-i*.5; box(treppe,1.7,.14,.55,i%2?HOLZ3:HOLZ,-15.45,h-.07,z); box(treppe,1.5,h-.14,.45,HOLZ2,-15.45,(h-.14)/2,z); }
  box(treppe,1.75,.2,.7,HOLZ3,-15.1,3.72,-13.65);
  [-16.3,-14.6].forEach(x=>{ [0,4,8].forEach(i=>{ const h=(i+1)*.42, z=-9.5-i*.5; walze(treppe,.07,1,HOLZ2,x,h+.5,z); ball(treppe,.1,MESSING,x,h+1.03,z); }); strich(treppe,[x,1.34,-9.5],[x,4.7,-13.5],.06,HOLZ); });
  verschmelze(treppe); k.verdecker(treppe,-15.45,-11.5,1.6); k.kasten(-15.45,-11.6,1.9,4.7);

  /* ---------- Reling-Tor: Ausgang ---------- */
  const torfest=gruppe(sc,TX,0,TZ);
  [-1,1].forEach(s=>{ box(torfest,.45,3.9,.45,HOLZ3,s*2.25,1.95,0); box(torfest,.62,.3,.62,DUNKEL,s*2.25,.15,0); [1.5,3.15].forEach(y=>box(torfest,.53,.14,.53,MESSING,s*2.25,y,0)); ball(torfest,.28,MESSING,s*2.25,4.15,0);
    strich(torfest,[s*2.25,2.5,0],[s*1.45,3.6,0],.09,HOLZ2); });
  box(torfest,5.2,.4,.4,HOLZ,0,3.66,0); box(torfest,5.3,.1,.5,MESSING,0,3.91,0);
  /* Anker als Zierde oben */
  ring(torfest,.12,.04,MESSING,0,4.68,0); box(torfest,.09,.6,.09,MESSING,0,4.28,0); box(torfest,.5,.08,.08,MESSING,0,4.45,0); ring(torfest,.32,.055,MESSING,0,4.3,0,Math.PI).rotation.z=Math.PI;
  /* Steg außenbords */
  for(let i=0;i<5;i++) box(torfest,4.3,.2,.37,i%2?HOLZ3:HOLZ,0,-.05,-.03-i*.39);
  [-1,1].forEach(s=>{ strich(torfest,[s*1.9,-1.5,-.35],[s*1.9,-.15,-1.6],.1,HOLZ2); walze(torfest,.11,.8,HOLZ2,s*2.05,.38,-1.72); ball(torfest,.14,MESSING,s*2.05,.82,-1.72); strich(torfest,[s*2.05,.7,-1.72],[s*2.25,1.1,-.1],.035,SEIL); });
  /* Strickleiter schräg hinunter zum Boot */
  const la=[.7,-.02,-1.78], lb=[2.3,-1.5,-5.45], dx=lb[0]-la[0], dz=lb[2]-la[2], ql=Math.hypot(dx,dz), qx=-dz/ql, qz=dx/ql;
  [-.55,.55].forEach(v=>strich(torfest,[la[0]+qx*v,la[1],la[2]+qz*v],[lb[0]+qx*v,lb[1],lb[2]+qz*v],.055,SEIL));
  for(let i=1;i<=9;i++){ const u=i/10, q=box(torfest,1.35,.09,.2,HOLZ3,la[0]+dx*u,la[1]+(lb[1]-la[1])*u,la[2]+dz*u); q.rotation.y=Math.atan2(-qz,qx); }
  verschmelze(torfest);
  /* Beiboot auf dem Wasser, schaukelt */
  const boot=gruppe(sc,11.6,WASSER+.08,-20.6), bk=gruppe(boot,0,0,0); boot.scale.setScalar(1.15);
  const form=(a,b)=>{ const f=new THREE.Shape(); f.moveTo(-a,-b*.75); f.quadraticCurveTo(0,-b*1.25,a*.55,-b*.8); f.quadraticCurveTo(a*.95,-b*.45,a*1.2,0); f.quadraticCurveTo(a*.95,b*.45,a*.55,b*.8); f.quadraticCurveTo(0,b*1.25,-a,b*.75); f.lineTo(-a,-b*.75); return f; };
  const platte=(a,b,h,c,y)=>{ const m=new THREE.Mesh(new THREE.ExtrudeGeometry(form(a,b),{depth:h,bevelEnabled:false}),mat(c)); m.rotation.x=-Math.PI/2; m.position.y=y; m.castShadow=true; bk.add(m); };
  platte(2.3,.8,.32,TORROT,-.12); platte(2.45,.95,.34,0xa87438,.19); platte(2.6,1.07,.16,WEISS,.52); platte(2.35,.84,.04,0x6b421e,.69);
  [-1.25,0,1.25].forEach(x=>box(bk,.45,.14,1.75,HOLZ3,x,.83,0));
  [-1,1].forEach(s=>{ strich(bk,[-.3,.92,s*.15],[1.1,.82,s*2.05],.06,HOLZ3); const bl=box(bk,.3,.06,.8,ROT,1.35,.8,s*2.35); bl.rotation.y=s*.63; ring(bk,.12,.04,EISEN,.2,.86,s*.92); });
  verschmelze(bk);
  k.anim.push(t=>{ boot.position.y=WASSER+.08+Math.sin(t*1.5)*.08; boot.rotation.x=Math.sin(t*1.1)*.045; boot.rotation.z=Math.sin(t*.8)*.025; });
  /* Torflügel */
  const fluegel=[-1,1].map(s=>{ const f=gruppe(sc,TX+s*2.03,0,TZ), d=-s;
    [.26,1.28].forEach(y=>box(f,1.98,.18,.16,TORROT,d*1.0,y,0));
    [.08,1.9].forEach(x=>box(f,.18,1.3,.2,TORROT,d*x,.76,0));
    for(let i=1;i<6;i++){ walze(f,.06,1.05,HOLZ3,d*i*.33,.78,0); ball(f,.085,MESSING,d*i*.33,1.44,0); }
    strich(f,[d*.15,.3,.1],[d*1.85,1.22,.1],.065,TORROT);
    [.26,1.28].forEach(y=>box(f,.5,.1,.04,EISEN,d*.3,y,.11));
    ring(f,.13,.035,MESSING,d*1.7,.78,.16);
    verschmelze(f); return f; });
  const schloss=gruppe(sc,TX,2.6,TZ+.25);
  [-.42,.42].forEach(x=>{ for(let i=0;i<4;i++){ const r=ring(schloss,.08,.025,SILBER,x,.55+i*.13,-.12); r.rotation.y=i%2?Math.PI/2:0; } });
  box(schloss,1.5,.95,.24,MESSING,0,0,0); ring(schloss,.45,.09,SILBER,0,.47,-.04,Math.PI);
  [[-.7,.42],[.7,.42],[-.7,-.42],[.7,-.42]].forEach(([x,y])=>ball(schloss,.06,0x8a6420,x,y,.13));
  for(let i=0;i<3;i++){ box(schloss,.36,.5,.04,0x2a1a08,-.43+i*.43,-.02,.14); box(schloss,.28,.4,.04,0xfff3cf,-.43+i*.43,-.02,.16); box(schloss,.06,.22,.02,0x2a1a08,-.43+i*.43,-.02,.19); }
  verschmelze(schloss);
  let tuer=null;
  tuer=ausgang(k,{ steh:[TX,-12.2], durch:[TX,-15.25], treffer:{x:TX,y:1.9,z:TZ+.2,b:4.6,h:3.8,t:.7}, name:'Reling-Tor', schildOben:[TX,4.4,TZ+.3], glanz:[TX,1.2,TZ+.5],
    bewege:a=>{ fluegel[0].rotation.y=a*1.4; fluegel[1].rotation.y=-a*1.4; schloss.visible=!(tuer && tuer.offen) && a<.05; } });

  /* ---------- zwei Masten mit geblähten Segeln ---------- */
  const segelBild=streif=>bild(256,160,g=>{ g.fillStyle='#f6ecd2'; g.fillRect(0,0,256,160); g.fillStyle=streif; g.fillRect(0,52,256,22); g.fillRect(0,100,256,10);
    g.strokeStyle='rgba(120,90,50,.35)'; g.lineWidth=2; for(let x=32;x<256;x+=32){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,160); g.stroke(); }
    g.strokeStyle='#a88a58'; g.lineWidth=7; g.strokeRect(3,3,250,154); g.fillStyle='#b08850'; [[60,128],[196,26]].forEach(p=>{ g.fillRect(p[0],p[1],24,18); }); });
  [[-7,-3,'#c0453a',0],[12.4,-1,'#2f6aa8',1.8]].forEach(([x,z,streif,phase],nr)=>{
    const m=gruppe(sc,x,0,z);
    walze(m,.55,.3,DUNKEL,0,.15,0); rohr(m,.22,.4,14.6,0x8a5a2c,0,7.3,0,16);
    [.75,2.4,4.2].forEach(y=>{ const r=ring(m,.4-y*.012,.05,EISEN,0,y,0); r.rotation.x=Math.PI/2; });
    /* Belegnägel mit Tauen am Mastfuß */
    const bn=ring(m,.52,.08,HOLZ2,0,1.05,0); bn.rotation.x=Math.PI/2;
    for(let i=0;i<6;i++){ const a=i*1.047+.3, px=Math.cos(a)*.52, pz=Math.sin(a)*.52; walze(m,.045,.4,HOLZ3,px,1.15,pz); if(i%2===0) [-.05,.05].forEach(v=>strich(m,[px*1.06,1.2,pz*1.06],[px*1.1+v,.45,pz*1.1-v],.03,SEIL)); }
    walze(m,.2,.5,MESSING,0,14.75,0); ball(m,.24,MESSING,0,15.1,0);
    verschmelze(m); k.verdecker(m,x,z,.6); k.kreis(x,z,.62);
    const s=gruppe(sc,x,0,z), stangen=gruppe(s,0,0,0);
    [[12.65,7.6],[9.25,7]].forEach(([y,l])=>{ walze(stangen,.15,l,HOLZ2,0,y,.45).rotation.z=Math.PI/2; [-1,1].forEach(v=>ball(stangen,.2,MESSING,v*l/2,y,.45)); });
    [-1,1].forEach(v=>{ strich(stangen,[v*3.7,12.65,.45],[0,14.3,0],.022,SEIL); strich(stangen,[v*3.4,9.25,.45],[v*3.6,12.65,.45],.02,SEIL); });
    if(nr===1){ walze(stangen,.65,.16,HOLZ,0,13.15,0); rohr(stangen,.75,.65,.65,HOLZ3,0,13.53,0,14,true); const r=ring(stangen,.75,.07,DUNKEL,0,13.86,0); r.rotation.x=Math.PI/2; }
    verschmelze(stangen);
    const geo=new THREE.PlaneGeometry(6.6,3.3,16,10), tuch=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({map:segelBild(streif),side:THREE.DoubleSide,emissive:0x3a2418})); tuch.position.set(0,10.95,.55); s.add(tuch);
    const welle=t=>{ const p=geo.attributes.position; for(let i=0;i<p.count;i++){ const u=p.getX(i)/3.3, v=p.getY(i)/1.65; p.setZ(i,(1-u*u*.85)*(1-v*v)*(.85+Math.sin(t*1.6+phase+u*2)*.16)+Math.sin(t*3.2+phase+u*5+v*3)*.035); } p.needsUpdate=true; geo.computeVertexNormals(); };
    welle(0); k.anim.push(welle);
    k.verdecker(s,x,z+.5,2);
  });
  /* Strickleiter-Netze hinten rechts und links außen an der Reling */
  const netz=gruppe(fest,0,0,0);
  const spannNetz=(x,z0,z1)=>{ const s=Math.sign(x), n=7;
    for(let i=0;i<=n;i++){ const z=z0+(z1-z0)*i/n; strich(netz,[x,1,z],[x+s*.42,-1.5,z],.025,SEIL); }
    for(let j=0;j<=4;j++){ const u=j/4; strich(netz,[x+s*.42*u,1-2.5*u,z0],[x+s*.42*u,1-2.5*u,z1],.025,SEIL); } };
  spannNetz(-18.72,-1,4.5); spannNetz(18.72,-8,-2.5);
  /* Netz an der Reling, innen */
  for(const [x,z0] of [[-18.45,5.8],[18.45,-1.8]]){ for(let i=0;i<=8;i++){ const z=z0+i*.42; strich(netz,[x,.98,z],[x,.1,Math.min(z0+3.36,z+1.26)],.018,0xb89860); strich(netz,[x,.98,z],[x,.1,Math.max(z0,z-1.26)],.018,0xb89860); } }

  /* ---------- Bordlaternen auf Pfosten ---------- */
  [[-17.3,8.6],[17.3,-7.6],[-10.8,12.15],[11.2,12.15],[3.1,-12.3],[17.3,12.1]].forEach(([x,z],i)=>{
    const g=gruppe(sc,x,0,z);
    walze(g,.28,.16,EISEN,0,.08,0); walze(g,.08,2.3,EISEN,0,1.3,0); walze(g,.26,.08,EISEN,0,2.45,0);
    walze(g,.2,.42,basis(0xffd36a),0,2.7,0); [0,1,2,3].forEach(j=>{ const a=j*1.571+.78; walze(g,.022,.44,EISEN,Math.cos(a)*.22,2.7,Math.sin(a)*.22); });
    kegel(g,.34,.28,MESSING,0,3.05,0); ball(g,.07,MESSING,0,3.22,0); const r=ring(g,.12,.03,MESSING,0,1.7,0); r.rotation.x=Math.PI/2;
    verschmelze(g); schein(g,'rgba(255,200,100,.7)',0,2.7,0,1.9); k.kreis(x,z,.3); k.verdecker(g,x,z,.35);
    if(i===0||i===1) flacker(k,x*.96,2.7,z,0xffa848,.45,9); });

  /* ---------- Ladeluken mit Holzgitter ---------- */
  const luke=(x,z,b,t)=>{ const g=gruppe(fest,x,0,z);
    box(g,b-.2,.12,t-.2,0x1e120a,0,.07,0);
    [-1,1].forEach(s=>{ box(g,b,.42,.2,HOLZ2,0,.21,s*(t/2-.1)); box(g,.2,.43,t-.38,HOLZ2,s*(b/2-.1),.215,0); [-1,1].forEach(v=>box(g,.3,.06,.3,MESSING,s*(b/2-.15),.455,v*(t/2-.15))); });
    for(let u=-b/2+.45;u<b/2-.25;u+=.42) box(g,.13,.1,t-.4,HOLZ3,u,.33,0);
    for(let v=-t/2+.5;v<t/2-.25;v+=.45) box(g,b-.4,.08,.13,HOLZ,0,.355,v);
    k.kasten(x,z,b,t); };
  luke(-1.4,1.7,2.7,2.1); luke(.9,-8.9,3,2.2);

  /* Schiffspumpe */
  const pumpe=gruppe(fest,4.4,0,-8.3);
  walze(pumpe,.55,.18,HOLZ2,0,.09,0); rohr(pumpe,.3,.36,1.25,0x7a4a24,0,.78,0,14); [.35,1.2].forEach(y=>{ const r=ring(pumpe,.34,.04,EISEN,0,y,0); r.rotation.x=Math.PI/2; });
  walze(pumpe,.08,.55,EISEN,0,1.65,0); strich(pumpe,[-.75,1.55,0],[.5,1.98,0],.07,EISEN); ball(pumpe,.13,ROT,-.78,1.54,0);
  strich(pumpe,[.25,1.15,.2],[.55,1.05,.45],.09,MESSING); strich(pumpe,[.55,1.05,.45],[.58,.8,.48],.08,MESSING);
  k.kreis(4.4,-8.3,.7);

  /* Segelrollen (Ersatzsegel) */
  const rollen=gruppe(fest,-9.9,0,-8.2);
  [[-.34,.34,0xf0e4c6],[.36,.34,0xe4d4b0],[.02,.9,0xf6ecd2]].forEach(([z,y,f])=>{ walze(rollen,.34,2.9,f,0,y,z).rotation.z=Math.PI/2; [-1,1].forEach(s=>{ walze(rollen,.2,.04,0xc8b488,s*1.46,y,z).rotation.z=Math.PI/2; const r=ring(rollen,.355,.035,0x8a5a2a,s*.8,y,z); r.rotation.y=Math.PI/2; }); });
  [-1,1].forEach(s=>box(rollen,.22,.14,1.5,HOLZ2,s*1.1,.07,0));
  k.kasten(-9.9,-8.2,3.1,1.5);

  /* Fässer, Säcke, Taurollen */
  const lager=gruppe(fest,0,0,0);
  fass(lager,-17.35,0,-6.5,1); fass(lager,-17.3,0,-5.4,1.08); fass(lager,-16.35,0,-5.95,.85); k.kasten(-16.9,-5.95,2,2.15);
  fass(lager,17.3,0,-12.9,1.1); fass(lager,16.25,0,-12.95,.95); fass(lager,17.35,0,-11.85,.85); fass(lager,16.9,1.33,-12.9,.7); k.kasten(16.8,-12.45,2,1.9);
  fass(lager,17.3,0,9.6,1.05); fass(lager,17.35,0,10.65,.9); k.kasten(17.3,10.1,1.1,2.1);
  fass(lager,-17.35,0,12.2,1.05); fass(lager,-16.3,0,12.25,.95); seilrolle(lager,-16.9,0,11); k.kasten(-16.9,11.75,2.1,2.2);
  fass(lager,10.45,0,-4.5,.92); fass(lager,10.8,0,-3.5,.8); k.kreis(10.6,-4,.95);
  const sack=(x,z,s,f)=>{ ball(lager,.5*s,f,x,.45*s,z,1,1,.9); ball(lager,.3*s,f,x,.84*s,z,1,.8,.9); const r=ring(lager,.14*s,.04,0x8a5a2a,x,1.04*s,z); r.rotation.x=Math.PI/2; kegel(lager,.19*s,.18*s,f,x,1.17*s,z).rotation.x=Math.PI; };
  sack(-8.5,-1.7,1,0xd8c498); sack(-9.25,-2.25,.9,0xc8a878); sack(-8.55,-2.65,.8,0xe4d4b0); k.kreis(-8.8,-2.2,1.05);
  [[-5.35,-3.6],[14.5,-12.4],[-12.6,12.2],[6.2,12.3],[-1.9,-12.1]].forEach(([x,z])=>{ seilrolle(lager,x,0,z); k.kreis(x,z,.6); });

  /* Anker auf einem Bock mit Kette */
  const anker=gruppe(fest,15.6,0,-4.3); anker.rotation.y=-.45;
  const AF=0x4a505c;
  box(anker,1.9,.2,.8,HOLZ2,0,.1,0); walze(anker,.13,2,AF,0,1.35,0); ring(anker,.27,.08,AF,0,2.58,0); box(anker,1.35,.16,.18,HOLZ,0,2.08,0); [-1,1].forEach(s=>ball(anker,.12,MESSING,s*.7,2.08,0));
  ring(anker,.85,.13,AF,0,1.2,0,Math.PI).rotation.z=Math.PI;
  [-1,1].forEach(s=>{ const f=kegel(anker,.28,.55,AF,s*.85,1.38,0); f.scale.z=.1; f.rotation.z=-s*.12; });
  for(let i=0;i<9;i++){ const r=ring(anker,.12,.04,SILBER,.35+i*.15,2.5-i*.29,.18+Math.sin(i*.8)*.1); r.rotation.y=i%2?1.4:.2; }
  for(let i=0;i<6;i++){ const r=ring(anker,.12,.04,SILBER,.95+i*.17,i%2?.13:.05,.4+Math.sin(i*1.3)*.12); if(!(i%2)) r.rotation.x=Math.PI/2; }
  k.kreis(15.6,-4.3,1.1); k.kreis(16.45,-3.4,.5);

  /* Ersatzrundhölzer rechts, Sitzbank mit Decken links */
  const holz=gruppe(fest,16.9,0,7.1);
  [[-.35,.3],[.35,.3],[0,.82]].forEach(([x,y])=>{ walze(holz,.3,3.4,HOLZ,x,y,0).rotation.x=Math.PI/2; [-1,1].forEach(s=>walze(holz,.22,.04,0xe0bc84,x,y,s*1.71).rotation.x=Math.PI/2); });
  [-1.1,1.1].forEach(z=>{ box(holz,1.55,.14,.2,DUNKEL,0,.07,z); const r=ring(holz,.72,.04,SEIL,0,.4,z,Math.PI); r.scale.y=1.05; });
  k.kasten(16.9,7.1,1.5,3.5);
  const bank=gruppe(fest,-17.25,0,2.4);
  box(bank,.9,.16,3.2,HOLZ3,0,.72,0); [-1.35,0,1.35].forEach(z=>box(bank,.75,.66,.16,HOLZ2,0,.33,z)); box(bank,.14,.5,3.2,HOLZ,-.46,1.25,0); [-1.4,1.4].forEach(z=>box(bank,.14,.55,.14,HOLZ2,-.46,.98,z));
  [[-1,BLAU],[-.35,ROT]].forEach(([z,f])=>{ walze(bank,.22,.75,f,.02,1.01,z).rotation.z=Math.PI/2; [-.2,.2].forEach(x=>{ const r=ring(bank,.225,.025,WEISS,x,1.01,z); r.rotation.y=Math.PI/2; }); });
  rohr(bank,.28,.2,.34,0x9a6a38,0,.98,.85,12); for(let i=0;i<5;i++) ball(bank,.12,i%2?0xf08a20:0xffd820,(i%3-1)*.13,1.17+(i%2)*.05,.85+(i%2-.5)*.18);
  k.kasten(-17.3,2.4,1.1,3.3);

  /* Eimer und Wischer */
  const putz=gruppe(fest,13.4,0,11.5);
  rohr(putz,.42,.32,.6,0x8a949e,0,.3,0,16,true); walze(putz,.32,.04,EISEN,0,.03,0); walze(putz,.37,.02,0x6ac0e8,0,.45,0); const henkel=ring(putz,.42,.025,EISEN,0,.6,0,Math.PI);
  henkel.rotation.x=-.5; [[-.18,.5,.1],[.12,.52,-.08],[.05,.49,.17]].forEach(p=>ball(putz,.09,0xf4fcff,p[0],p[1],p[2]));
  strich(putz,[1.05,.18,.1],[.7,2.1,-.1],.05,HOLZ3); for(let i=0;i<16;i++){ const a=i*.393; strich(putz,[1.05,.3,.1],[1.05+Math.cos(a)*.35,.05,.1+Math.sin(a)*.3],.035,i%2?0xe8e4d8:0xc8c4b4); }
  k.kasten(13.75,11.5,1.9,1);

  /* Zitronenbäumchen */
  const pflanzen=gruppe(fest,0,0,0);
  [[-8.9,12.2],[3.2,12.25],[-17.35,-1.4],[17.35,.8],[11.6,-12.45],[2.4,6.1]].forEach(([x,z])=>{ baeumchen(pflanzen,x,z); k.kreis(x,z,.52); });

  /* Fracht unter Netzen, Bänke, Netzgestell, Tisch und eine kleine Luke */
  const deko=gruppe(fest,0,0,0);
  [[-9.6,1.4,2.4,1.5],[-11,9.9,2.2,1.5],[7.7,3.9,2,1.4],[15,9.6,1.9,1.5]].forEach(([x,z,b,t])=>{ fracht(deko,x,z,b,t); k.kasten(x,z,b+.1,t+.1); });
  /* Gestell, an dem ein Fischernetz mit Korken trocknet */
  const ng=gruppe(deko,-6.4,0,2.8);
  [-1,1].forEach(v=>{ box(ng,.7,.14,.5,HOLZ2,v*1.2,.07,0); walze(ng,.08,1.9,HOLZ,v*1.2,.98,0); ball(ng,.12,MESSING,v*1.2,1.98,0); });
  walze(ng,.07,2.6,HOLZ3,0,1.82,0).rotation.z=Math.PI/2;
  for(let i=0;i<=12;i++){ const x=-1.08+i*.18; strich(ng,[x,1.8,0],[Math.min(1.08,x+.6),.35+(i%3)*.05,.06],.015,0xb89860); strich(ng,[x,1.8,0],[Math.max(-1.08,x-.6),.35+(i%2)*.07,-.05],.015,0xb89860); }
  for(let i=0;i<7;i++) ball(ng,.09,i%2?0xc88a4a:0xe0a860,-.96+i*.32,.4+(i%3)*.12,.08,1.3,.8,.8);
  k.kasten(-6.4,2.8,2.8,.55); 
  /* Tisch mit Tischdecke, Blumenvase und Laterne, zwei Bänke */
  const ti=gruppe(deko,3.9,0,9.7);
  box(ti,1.9,.14,1.1,HOLZ3,0,.9,0); [-1,1].forEach(a=>[-1,1].forEach(b=>box(ti,.14,.84,.14,HOLZ2,a*.78,.42,b*.4))); box(ti,.55,.025,1.14,BLAU,0,.985,0); [-.2,.2].forEach(x=>box(ti,.07,.012,1.15,WEISS,x,1.004,0));
  rohr(ti,.1,.17,.34,0x2f8a8a,-.55,1.14,0,12); [[-.1,.34,0xe0302a],[.09,.42,0xffd820],[.02,.28,0xf06aa0]].forEach(([x,h,f],i)=>{ strich(ti,[-.55,1.28,0],[-.55+x*1.6,1.28+h,(i-1)*.1],.018,0x2f7a30); ball(ti,.11,f,-.55+x*1.6,1.3+h,(i-1)*.1); });
  walze(ti,.17,.06,EISEN,.55,1.0,0); walze(ti,.12,.3,basis(0xffd36a),.55,1.18,0); kegel(ti,.2,.17,MESSING,.55,1.42,0);
  holzbank(deko,3.9,8.75,1.8,0); holzbank(deko,3.9,10.65,1.8,0);
  k.kasten(3.9,9.7,2,2.45);
  holzbank(deko,-1.6,6.5,2.1,0,ROT); k.kasten(-1.6,6.5,2.15,.65);
  holzbank(deko,17.35,3.3,2.2,Math.PI/2,BLAU); k.kasten(17.35,3.3,.65,2.25);
  luke(8.2,11.7,2.1,1.5);

  verschmelze(fest);

  /* ---------- Leben: Matrosin, Möwen, Katze, Maus, Fische ---------- */
  const mat1=matrose(k); laeufer(k,mat1,[[10.2,-10.6],[10.6,-6.6],[13.4,-6.3],[13,-3.4],[10.3,-1.5],[6.6,-1],[6.2,-6.2]],1.25,0,6);
  katze(k,[[-4,4.2],[1.2,3.9],[1.9,-1.6],[-3.8,-1.5]],1.1);
  maeuschen(k,[[-14.4,-7.4],[-12.2,-6.2],[-12,-9.6],[-13.6,-9]],1.5,1);
  laeufer(k,laufMoewe(k),[[-2.8,11.8],[1.2,11.3],[.6,8.6],[-2.4,9]],.45,2,9);
  laeufer(k,laufMoewe(k),[[10.4,5.6],[14.6,7.4],[11.2,9.9],[9.4,6.2]],.4,5,10);
  moewe(k,-12,-17,5,5.2,.55,0); moewe(k,6,-23,7,4.6,-.4,2); moewe(k,23,-6,4,4.4,.7,4); moewe(k,-23,5,4,5,-.6,1); moewe(k,-1,-5,9,16.8,.3,3);
  springFisch(k,-4,-18.5,.3,0x58c8d8,0); springFisch(k,2,-23.5,2.8,0xf0a040,2.1); springFisch(k,-11,-21,3.3,0x8ab8e8,3.7); springFisch(k,22,2,1.4,0x58c8d8,1.2); springFisch(k,-22,-3,-1.7,0xf0a040,4.4); springFisch(k,-6,17.5,.1,0x8ab8e8,2.9); springFisch(k,9,17.8,3.1,0x58c8d8,.8);

  return { tuer, start:[0,9.8] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-16.8,-8.2],[-13.8,-11.4],[-12.4,-8.4],[-7.4,-4.4],[-9.9,-9.8],[-1.2,-10.6],[.6,-6.4],[10.2,-12.2],[15.2,-10.4],[16.8,-2.2],[10.4,-1.9],[-5.4,-.4],[-15.8,4.2],[-17.2,6.4],[-14.5,12.4],[-7.4,10.8],[4.6,11.6],[15.2,12.2],[15.2,5.2],[-1.4,4.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-.5, z:-4.4, steh:[-.5,-2.75], kasten:[2.3,1.3], treffer:[2.6,3,1.3], baue(g){ /* 1 Steuerrad */
      box(g,1.7,.16,1.15,HOLZ2,0,.08,0); [-1,1].forEach(s=>{ box(g,.2,1.55,.6,HOLZ,s*.45,.9,-.2); ball(g,.15,MESSING,s*.45,1.72,-.2); });
      box(g,.75,.8,.4,HOLZ2,0,.6,-.22); box(g,.5,.5,.06,MESSING,0,.6,0);
      walze(g,.11,.65,EISEN,0,1.55,0).rotation.x=Math.PI/2;
      const y=1.62, z=.3;
      ring(g,.9,.12,0xb06a2c,0,y,z); ring(g,.62,.055,0x8a4a1c,0,y,z);
      for(let i=0;i<8;i++){ const a=i*Math.PI/4+Math.PI/2, cx=Math.cos(a), cy=Math.sin(a);
        strich(g,[0,y,z],[cx*.95,y+cy*.95,z],.065,0x9a5a24); strich(g,[cx*.98,y+cy*.98,z],[cx*1.3,y+cy*1.3,z],.095,i?0xc8843c:MESSING); ball(g,.12,i?0xc8843c:MESSING,cx*1.31,y+cy*1.31,z); }
      walze(g,.27,.22,MESSING,0,y,z).rotation.x=Math.PI/2; ball(g,.12,0xf4d870,0,y,z+.14); } },
  { x:-12.4, z:-2.8, steh:[-12.4,-1.2], r:.75, treffer:[1.8,3.4,1.4], baue(g,k){ /* 2 Papageienstange mit Papagei */
      walze(g,.62,.16,HOLZ2,0,.08,0); walze(g,.42,.14,HOLZ,0,.22,0); walze(g,.09,1.75,HOLZ,0,1.1,0); [.45,1.7].forEach(y=>walze(g,.13,.1,MESSING,0,y,0));
      walze(g,.08,1.7,HOLZ3,0,1.98,0).rotation.z=Math.PI/2; [-1,1].forEach(s=>ball(g,.12,MESSING,s*.87,1.98,0));
      /* Futternapf und kleiner Schaukelring */
      strich(g,[-.7,1.98,0],[-.7,1.78,0],.025,MESSING); rohr(g,.2,.13,.16,MESSING,-.7,1.7,0,14); [-.07,.06,0].forEach((v,i)=>ball(g,.06,0xffd820,-.7+v,1.79,i===2?.08:-.02));
      strich(g,[.62,1.98,0],[.62,1.62,0],.018,MESSING); ring(g,.17,.03,ROT,.62,1.45,0);
      const p=papagei(k.scene,-12.35,2.04,-2.8); p.g.scale.setScalar(1.3); p.g.rotation.y=-1.25;
      k.anim.push(t=>{ p.kopf.rotation.y=Math.sin(t*.8)*.55; p.kopf.rotation.z=Math.sin(t*4.2)*.1*Math.max(0,Math.sin(t*.55)); const s=Math.max(0,Math.sin(t*.7)-.75)*4*Math.abs(Math.sin(t*12)); p.fl[0].rotation.x=s; p.fl[1].rotation.x=-s; }); } },
  { x:12.7, z:-8.6, steh:[12.7,-6.8], r:1.05, treffer:[3,2.8,1.8], baue(g){ /* 3 Fernrohr auf einem Dreibein */
      [[-.8,.55],[.8,.55],[0,-.85]].forEach(([x,z])=>{ strich(g,[x,.04,z],[0,1.5,0],.085,HOLZ2); ball(g,.13,MESSING,x,.08,z); });
      walze(g,.2,.22,MESSING,0,1.55,0); box(g,.22,.3,.22,EISEN,0,1.75,0);
      const f=gruppe(g,0,1.98,0); f.rotation.y=.5; const r=gruppe(f,0,0,0); r.rotation.z=.26;
      const stueck=(x,l,r1,c)=>{ walze(r,r1,l,c,x,0,0).rotation.z=Math.PI/2; };
      stueck(-.75,.7,.15,MESSING); stueck(0,.85,.21,0x8a3a1c); stueck(.8,.8,.27,MESSING);
      [[-1.1,.18],[-.42,.23],[.42,.29],[1.18,.32]].forEach(([x,r1])=>stueck(x,.1,r1,0xf0c850));
      stueck(-1.27,.24,.09,EISEN); stueck(-1.41,.07,.14,EISEN);
      walze(r,.25,.02,0x8ad0f0,1.24,0,0).rotation.z=Math.PI/2; ball(r,.07,0xffffff,1.255,.08,.08,.2,1,1); } },
  { x:4.6, z:1.4, steh:[4.6,3], r:.8, treffer:[1.9,2.3,1.5], baue(g){ /* 4 Kompass auf einer Säule */
      walze(g,.68,.14,HOLZ2,0,.07,0); rohr(g,.34,.5,.95,0x8a4a24,0,.6,0,8); walze(g,.55,.14,HOLZ2,0,1.12,0); [.3,.9].forEach(y=>{ const r=ring(g,y<.5?.47:.37,.035,MESSING,0,y,0); r.rotation.x=Math.PI/2; });
      const kopf=gruppe(g,0,1.44,0); kopf.rotation.x=.62;
      rohr(kopf,.72,.5,.34,MESSING,0,0,0,28); const r=ring(kopf,.71,.065,0xf0c850,0,.18,0); r.rotation.x=Math.PI/2;
      const t=bild(256,256,c=>{ c.fillStyle='#f8f0d8'; c.fillRect(0,0,256,256); c.strokeStyle='#8a6a34'; c.lineWidth=6; c.beginPath(); c.arc(128,128,112,0,6.283); c.stroke();
        for(let i=0;i<32;i++){ const a=i*6.283/32, l=i%4?10:22; c.lineWidth=i%4?3:5; c.beginPath(); c.moveTo(128+Math.cos(a)*108,128+Math.sin(a)*108); c.lineTo(128+Math.cos(a)*(108-l),128+Math.sin(a)*(108-l)); c.stroke(); }
        const stern=(n,v,R,i0,f)=>{ for(let i=0;i<n;i++){ const a=i*6.283/n+v; c.fillStyle=f; c.beginPath(); c.moveTo(128,128); c.lineTo(128+Math.cos(a-.4)*i0,128+Math.sin(a-.4)*i0); c.lineTo(128+Math.cos(a)*R,128+Math.sin(a)*R); c.lineTo(128+Math.cos(a+.4)*i0,128+Math.sin(a+.4)*i0); c.fill(); } };
        stern(4,.785,60,24,'#2a5aa8'); stern(4,0,86,28,'#3a2c20');
        c.save(); c.translate(128,128); c.rotate(.55); c.fillStyle='#d8261a'; c.beginPath(); c.moveTo(0,-92); c.lineTo(17,0); c.lineTo(-17,0); c.fill(); c.fillStyle='#2a4a9a'; c.beginPath(); c.moveTo(0,92); c.lineTo(17,0); c.lineTo(-17,0); c.fill(); c.fillStyle='#f0c850'; c.beginPath(); c.arc(0,0,12,0,6.283); c.fill(); c.restore(); });
      const s=new THREE.Mesh(new THREE.CircleGeometry(.66,32),new THREE.MeshBasicMaterial({map:t,color:0xf4ecdc})); s.rotation.x=-Math.PI/2; s.position.y=.215; kopf.add(s);
      /* zwei Ausgleichskugeln an den Seiten */
      [-1,1].forEach(s2=>{ strich(g,[s2*.35,1.12,0],[s2*.82,1.2,0],.07,HOLZ2); ball(g,.2,s2<0?0xc0392b:GRUEN,s2*.86,1.36,0); walze(g,.1,.08,MESSING,s2*.86,1.19,0); }); } },
  { wand:'hinten', x:-10.5, z:-13.1, steh:[-10.5,-11.1], treffer:[2.4,2.9,1.1], trefferY:.55, baue(g){ /* 5 Schiffsglocke am Gestell */
      [-1,1].forEach(s=>{ box(g,.22,3.25,.22,HOLZ3,s*.98,1.68,.3); ball(g,.17,MESSING,s*.98,3.45,.3); strich(g,[s*.98,2.4,.35],[s*.45,3.05,.5],.07,HOLZ3); box(g,.2,.2,.4,HOLZ2,s*.98,1,.1); });
      box(g,2.25,.28,.4,HOLZ,0,3.15,.4); box(g,.22,.2,.5,EISEN,0,2.98,.55);
      ring(g,.14,.055,MESSING,0,2.8,.65);
      dreh(g,[[.02,1.22],[.26,1.18],[.38,1.02],[.42,.7],[.47,.4],[.58,.17],[.76,.02],[.72,-.02],[.6,.05]],0xe8b83a,0,1.46,.65);
      [[.425,2.2,.05],[.53,1.74,.045],[.73,1.5,.05]].forEach(([r,y,d])=>{ const q=ring(g,r,d,0xf8e08a,0,y,.65); q.rotation.x=Math.PI/2; });
      walze(g,.03,.7,EISEN,0,1.65,.65); ball(g,.17,0x8a6420,0,1.33,.68);
      strich(g,[0,1.22,.68],[.04,.75,.75],.045,SEIL); ball(g,.11,ROT,.04,.73,.75); strich(g,[.04,.7,.75],[.04,.45,.75],.06,ROT); } },
  { wand:'hinten', x:-4.5, z:-13.1, steh:[-4.5,-11.5], treffer:[2.9,2.9,.9], trefferY:.8, baue(g,k){ /* 6 Flagge mit Papagei */
      [-1,1].forEach(s=>{ box(g,.14,.14,.45,EISEN,s*1.3,3.4,.22); ball(g,.14,MESSING,s*1.52,3.4,.42); });
      walze(g,.075,3,HOLZ3,0,3.4,.42).rotation.z=Math.PI/2; [-1,-.33,.33,1].forEach(x=>ring(g,.12,.03,MESSING,x*1.05,3.32,.42).rotation.y=Math.PI/2);
      const t=bild(384,320,c=>{ c.fillStyle='#1f74b8'; c.fillRect(0,0,384,320); c.strokeStyle='#ffd830'; c.lineWidth=16; c.strokeRect(10,10,364,300);
        const el=(x,y,a,b,d,f)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,a,b,d,0,6.283); c.fill(); };
        el(192,160,128,128,0,'#f8f0d8');
        c.lineCap='round'; [['#2f6ae0',-22],['#ffc21a',0],['#e03a2a',22]].forEach(p=>{ c.strokeStyle=p[0]; c.lineWidth=18; c.beginPath(); c.moveTo(168,202); c.lineTo(118+p[1],268-Math.abs(p[1])*.4); c.stroke(); });
        el(188,175,46,68,.55,'#e03a2a'); el(206,184,25,45,.55,'#ffc21a'); el(160,178,27,60,.6,'#2fa844'); el(145,199,15,37,.65,'#2f6ae0');
        el(221,103,46,44,0,'#e03a2a');
        c.fillStyle='#ffc21a'; [[-1,-18,-44],[0,4,-52],[1,28,-46]].forEach(p=>{ c.beginPath(); c.moveTo(208,70); c.lineTo(214+p[1],68+p[2]*.55); c.lineTo(232,66); c.fill(); });
        el(233,96,18,18,0,'#ffffff'); el(236,97,8,8,0,'#141008'); el(239,94,3,3,0,'#ffffff');
        c.fillStyle='#ffae14'; c.beginPath(); c.moveTo(252,88); c.quadraticCurveTo(298,94,278,142); c.quadraticCurveTo(268,122,248,122); c.fill(); c.fillStyle='#3a342c'; c.beginPath(); c.moveTo(250,122); c.quadraticCurveTo(268,128,262,138); c.quadraticCurveTo(250,138,244,128); c.fill();
        c.strokeStyle='#7a4a1e'; c.lineWidth=16; c.beginPath(); c.moveTo(112,240); c.lineTo(276,240); c.stroke(); c.strokeStyle='#5a5a62'; c.lineWidth=8; [182,214].forEach(x=>{ c.beginPath(); c.moveTo(x,222); c.lineTo(x+6,244); c.stroke(); }); });
      const geo=new THREE.PlaneGeometry(2.5,2.1,16,8), tuch=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({map:t,side:THREE.DoubleSide,emissive:0x1c1410})); tuch.position.set(0,2.23,.45); g.add(tuch);
      k.anim.push(zt=>{ const p=geo.attributes.position; for(let i=0;i<p.count;i++){ const h=(1.05-p.getY(i))/2.1; p.setZ(i,(Math.sin(zt*2.4+p.getX(i)*2.6)*.09+.09)*h); } p.needsUpdate=true; });
      [-1,1].forEach(s=>{ strich(g,[s*1.25,3.4,.45],[s*1.42,1.75,.42],.025,SEIL); ball(g,.09,GELB,s*1.42,1.68,.42); kegel(g,.1,.25,GELB,s*1.42,1.52,.42); }); } },
  { x:13, z:3.2, steh:[13,4.75], r:.8, treffer:[2.1,2.7,1], baue(g){ /* 7 Rettungsring auf einem Ständer */
      box(g,1.5,.16,.8,HOLZ2,0,.08,0); box(g,.24,2.3,.2,HOLZ,0,1.25,-.18); ball(g,.17,MESSING,0,2.5,-.18);
      [-1,1].forEach(s=>strich(g,[s*.65,.15,0],[0,.75,-.18],.08,HOLZ2));
      box(g,.36,.14,.5,EISEN,0,2.18,.02);
      const y=1.35, z=.17;
      for(let i=0;i<8;i++){ const q=ring(g,.74,.23,i%2?0xf8f4ea:0xe02a1c,0,y,z,Math.PI/4+.02); q.rotation.z=i*Math.PI/4+Math.PI/8; }
      for(let i=0;i<4;i++){ const a=i*Math.PI/2+Math.PI/4, b=a+Math.PI/2, m=(a+b)/2;
        const A=[Math.cos(a)*.99,y+Math.sin(a)*.99,z+.06], M=[Math.cos(m)*1.1,y+Math.sin(m)*1.1,z+.06], Bp=[Math.cos(b)*.99,y+Math.sin(b)*.99,z+.06];
        strich(g,A,M,.035,SEIL); strich(g,M,Bp,.035,SEIL); const q=ring(g,.24,.045,0xd2a860,Math.cos(a)*.74,y+Math.sin(a)*.74,z); q.quaternion.setFromUnitVectors(V(0,0,1),V(-Math.sin(a),Math.cos(a),0)); } } },
  { x:-13.4, z:5.4, steh:[-13.4,7.15], kasten:[2.5,1.6], treffer:[2.5,2.9,1.5], baue(g){ /* 8 Kiste mit Signalflaggen */
      const f=0x2f6a5a;
      box(g,2.1,.12,1.2,DUNKEL,0,.08,0);
      [-1,1].forEach(s=>{ box(g,2.2,.85,.12,f,0,.55,s*.6); box(g,.12,.84,1.08,f,s*1.04,.55,0); box(g,2.3,.12,.18,MESSING,0,.98,s*.6); box(g,.18,.11,1.1,MESSING,s*1.05,.985,0);
        [-1,1].forEach(v=>box(g,.18,.9,.18,MESSING,s*1.04,.54,v*.6)); ring(g,.18,.045,SEIL,s*1.14,.65,0).rotation.y=Math.PI/2; });
      box(g,.34,.34,.08,MESSING,0,.72,.68); box(g,.07,.14,.03,DUNKEL,0,.7,.73);
      const deckel=gruppe(g,0,1.04,-.66); deckel.rotation.x=-.28; box(deckel,2.2,.95,.12,f,0,.48,-.04); [-.75,.75].forEach(x=>box(deckel,.16,.99,.16,MESSING,x,.48,-.04));
      /* zusammengerollte Flaggen */
      [[-.7,.2,ROT,GELB],[-.2,.28,BLAU,WEISS],[.32,.18,GELB,ROT],[.78,.25,WEISS,BLAU],[-.45,-.22,GRUEN,WEISS],[.55,-.25,ROT,WEISS]].forEach(([x,z,a,b],i)=>{ const r=gruppe(g,x,.98+(i%3)*.05,z); r.rotation.y=(i%2?1:-1)*.2; walze(r,.19,.7,a,0,0,0).rotation.x=Math.PI/2; [-.2,.2].forEach(v=>walze(r,.198,.11,b,0,0,v).rotation.x=Math.PI/2); });
      /* drei Flaggen an Stöcken */
      const stock=(x,n,h,neig)=>{ const s=gruppe(g,x,.7,-.1); s.rotation.z=neig; walze(s,.045,h,HOLZ3,0,h/2,0); ball(s,.08,MESSING,0,h+.03,0);
        const w=.68, hh=.52, y=h-.32, d=n===0?-1:1, cx=d*(w/2+.04);
        if(n===0){ box(s,w,hh,.05,GELB,cx,y,0); box(s,w*.5,hh*.5,.07,BLAU,cx,y,0); }
        else if(n===1){ for(let i=0;i<4;i++) box(s,w/2,hh/2,.05,(i===0||i===3)?0xe02a1c:WEISS,cx+(i%2-.5)*w/2,y+(Math.floor(i/2)-.5)*hh/2,0); }
        else { [BLAU,WEISS,ROT].forEach((c,i)=>box(s,w/3,hh,.05,c,cx+(i-1)*w/3,y,0)); } };
      stock(-.75,0,2.05,.2); stock(.02,1,2.25,-.03); stock(.75,2,1.8,-.2); } },
  { x:7.4, z:7.4, steh:[7.4,9.05], r:.75, treffer:[2.4,3.7,1.2], baue(g){ /* 9 Angel, aufrecht in einem Halter */
      walze(g,.6,.18,HOLZ2,-.2,.09,0); rohr(g,.3,.42,.55,HOLZ,-.2,.45,0,12); walze(g,.17,.28,EISEN,-.2,.85,0); [.3,.66].forEach(y=>{ const r=ring(g,y<.5?.4:.33,.035,MESSING,-.2,y,0); r.rotation.x=Math.PI/2; });
      const a=[-.24,.7,0], m1=[-.1,1.75,0], m2=[.16,2.7,0], sp=[.75,3.45,0];
      strich(g,a,m1,.095,0xc89458); strich(g,m1,m2,.065,0xd8261a); strich(g,m2,sp,.04,0xd8261a); ball(g,.07,MESSING,sp[0],sp[1],0);
      [.15,.32,.5].forEach(u=>{ const r=ring(g,.11-u*.05,.025,MESSING,a[0]+(m1[0]-a[0])*u*2+.02,a[1]+(m1[1]-a[1])*u*2,0); r.rotation.x=Math.PI/2; });
      [m1,m2].forEach(p=>ring(g,.1,.025,MESSING,p[0]+.1,p[1],0));
      /* Rolle mit Kurbel */
      strich(g,[-.2,1.15,0],[-.2,1.15,.22],.05,EISEN); walze(g,.25,.18,MESSING,-.2,1.15,.28).rotation.x=Math.PI/2; walze(g,.16,.2,SILBER,-.2,1.15,.29).rotation.x=Math.PI/2;
      strich(g,[-.2,1.15,.42],[.02,1.02,.42],.032,EISEN); ball(g,.08,ROT,.03,1.01,.45);
      /* Schnur mit rot-weißem Schwimmer */
      strich(g,[-.06,1.25,.2],[m1[0]+.2,m1[1],0],.01,0xffffff); strich(g,[m1[0]+.2,m1[1],0],[m2[0]+.2,m2[1],0],.01,0xffffff); strich(g,[m2[0]+.2,m2[1],0],sp,.01,0xffffff);
      strich(g,sp,[.88,1.65,0],.012,0xffffff); ball(g,.17,0xf8f4ea,.88,1.4,0); ball(g,.175,0xe02a1c,.88,1.47,0,1,.62,1); walze(g,.022,.28,0xe02a1c,.88,1.67,0);
      strich(g,[.88,1.25,0],[.88,.98,0],.012,0xffffff); ring(g,.09,.022,SILBER,.82,.94,0,Math.PI*1.2).rotation.z=Math.PI*.9; } },
  { x:-4.8, z:6.4, dreh:.4, steh:[-4.1,8.75], kasten:[2.2,2.4], treffer:[1.9,2.2,2.3], baue(g){ /* 10 Liegestuhl mit gestreiftem Stoff */
      const H=0xc8924e;
      [-1,1].forEach(s=>{ const x=s*.76;
        strich(g,[x,.08,.9],[x,2.0,-.85],.075,H); strich(g,[x,.08,-.8],[x,.9,.75],.075,H); strich(g,[x,.08,-.8],[x,.95,-.28],.06,H);
        strich(g,[x,.9,.75],[x,.92,1.05],.065,H); box(g,.2,.09,1.2,H,s*.87,1.05,.05); strich(g,[s*.84,1.03,.55],[x,.65,.28],.05,H); strich(g,[s*.84,1.03,-.4],[x,1.15,-.1],.05,H); ball(g,.07,MESSING,x,.55,.07); });
      [[2.0,-.85],[.9,.9],[.08,.9],[.08,-.8]].forEach(([y,z])=>walze(g,.075,1.6,H,0,y,z).rotation.z=Math.PI/2);
      /* Stoffbahn hängt vom oberen Stab bis zum vorderen Stab */
      const P=[[2.02,-.83],[1.5,-.5],[1.02,-.2],[.68,.12],[.66,.45],[.76,.7],[.95,.9]];
      const farben=[0xd8261a,0xf8f4ea,0xd8261a,0xf8f4ea,0xd8261a,0xf8f4ea,0xd8261a];
      for(let j=0;j<P.length-1;j++){ const a=P[j], b=P[j+1], dy=b[0]-a[0], dz=b[1]-a[1], l=Math.hypot(dy,dz);
        farben.forEach((f,i)=>{ const q=box(g,1.34/7,.055,l+.03,f,-.67+(i+.5)*1.34/7,(a[0]+b[0])/2,(a[1]+b[1])/2); q.rotation.x=-Math.atan2(dy,dz); }); }
      walze(g,.17,.85,BLAU,0,1.86,-.62).rotation.z=Math.PI/2; [-.25,.25].forEach(x=>walze(g,.178,.09,WEISS,x,1.86,-.62).rotation.z=Math.PI/2); } }
];

return { titel:'Das Oberdeck', himmel:0xf0a47c, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 5: Die Schatzinsel unter offenem Himmel. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: der Höhleneingang im Fels hinten, davor rollt ein großer runder Stein zur Seite. */
RAEUME3D.piratenschiff[4] = (function(){
const { HOLZ, HOLZ2, HOLZ3, EISEN, MESSING, SEIL, ROT, WEISS, wandStueck, papagei, papageiFlug, moewe, krabbe, meer } = SCHIFF;
const B=36, T=27;
const HX=8;                       /* Mitte des Höhleneingangs */
const SAND=0xecd08c, SANDD=0xd2ae68, FELS=0x9a7a5c, FELS2=0x7e6048, FELS3=0xb29270, STEIN=0xa6a49c;
const BLATT=0x2f9a3e, BLATT2=0x55b848, STAMM=0xa8743c, STAMM2=0x86582a, GOLD=0xf2c230, KOKOS=0x74481f;
const doppel=c=>mat(c,{side:THREE.DoubleSide});

/* ---------- Grundformen ---------- */
/* kantiger Fels: unregelmäßig verformte Kugel mit flachen Seiten */
function felsGeo(saatF,stufe,rau){
  const geo=new THREE.IcosahedronGeometry(1,stufe===undefined?1:stufe), p=geo.attributes.position, r=rau||.3;
  for(let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), z=p.getZ(i), h=Math.sin(Math.round(x*50)*1.29+Math.round(y*50)*7.82+Math.round(z*50)*3.77+saatF)*4375.8, f=1+(h-Math.floor(h)-.5)*r; p.setXYZ(i,x*f,y*f,z*f); }
  geo.computeVertexNormals(); return geo;
}
/* Fläche aus einer Liste von Dreiecken (je 9 Zahlen) */
function netz(par,P,farbe,x,y,z){
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.computeVertexNormals();
  const m=new THREE.Mesh(geo,doppel(farbe)); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}
/* ausgeschnittene Platte mit Dicke (Punkte in x/y, Dicke nach +z) */
function platte(par,punkte,tiefe,farbe,x,y,z){
  const f=new THREE.Shape(); punkte.forEach(([a,b],i)=>i?f.lineTo(a,b):f.moveTo(a,b));
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tiefe,bevelEnabled:false}),mat(farbe)); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}
/* Palmwedel / großes Blatt: zeigt nach +x, biegt sich nach unten, gezackter Rand */
function wedel(par,laenge,breite,hoch,haengt,farbe,x,y,z,dreh){
  const N=10, P=[], pkt=i=>{ const s=i/N, w=breite*Math.sin(Math.PI*Math.min(.96,s*.9+.06))*(i%2?1:.68); return [s*laenge, hoch*s-haengt*s*s, w]; };
  for(let i=0;i<N;i++){ const a=pkt(i), b=pkt(i+1), ya=a[1]-a[2]*.28, yb=b[1]-b[2]*.28;
    P.push(a[0],a[1],0, b[0],b[1],0, b[0]+.12,yb,-b[2]);  P.push(a[0],a[1],0, a[0]+.12,ya,-a[2], b[0]+.12,yb,-b[2]);
    P.push(a[0],a[1],0, b[0]+.12,yb,b[2], b[0],b[1],0);   P.push(a[0],a[1],0, a[0]+.12,ya,a[2], b[0]+.12,yb,b[2]); }
  const m=netz(par,P,farbe,x,y,z); m.rotation.y=dreh||0; return m;
}

/* ---------- Texturen ---------- */
function sandBild(){
  return bild(512,512,g=>{ g.fillStyle='#dcbc78'; g.fillRect(0,0,512,512);
    for(let i=0;i<2600;i++){ g.fillStyle=['rgba(170,125,60,.22)','rgba(250,232,180,.3)','rgba(200,150,80,.2)'][i%3]; g.fillRect(zufall()*509,zufall()*509,2+(i%2),2); }
    g.lineWidth=5; g.lineCap='round';
    for(let i=0;i<22;i++){ const x=20+zufall()*380, y=14+zufall()*480, l=50+zufall()*60; g.strokeStyle='rgba(180,132,62,.2)'; g.beginPath(); g.moveTo(x,y); g.quadraticCurveTo(x+l/2,y-11,x+l,y); g.stroke();
      g.strokeStyle='rgba(248,228,176,.35)'; g.beginPath(); g.moveTo(x,y+5); g.quadraticCurveTo(x+l/2,y-6,x+l,y+5); g.stroke(); } });
}

/* ---------- Strand: Sand, nasser Rand, Schaum, flaches Wasser ---------- */
function umriss(plus,ziel){
  const P=[], w=(v)=>Math.sin(v*.85)*.28+Math.sin(v*2.1+1)*.12;
  for(let x=-18.5;x<=18.5;x+=.925) P.push([x*(1+plus/18.5), 14.05+w(x)+plus]);
  for(let z=13.2;z>=-18;z-=1.04) P.push([18.55+w(z)+plus, z]);
  P.push([18.5+plus,-18.8-plus],[-18.5-plus,-18.8-plus]);
  for(let z=-18;z<=13.3;z+=1.04) P.push([-18.55-w(z+2)-plus, z]);
  const s=ziel||new THREE.Shape(); P.forEach(([x,z],i)=>i?s.lineTo(x,-z):s.moveTo(x,-z)); return s;
}
function boden(k){
  const sc=k.scene, lege=(form,material,y)=>{ const m=new THREE.Mesh(new THREE.ShapeGeometry(form),material); m.rotation.x=-Math.PI/2; m.position.y=y; m.receiveShadow=true; sc.add(m); return m; };
  const t=sandBild(); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(1/9,1/9);
  lege(umriss(0),new THREE.MeshLambertMaterial({map:t}),0);
  lege(umriss(.7),mat(0xc29c5e),-.08);
  const schaum=umriss(1.55); schaum.holes.push(umriss(.45,new THREE.Path()));
  const s1=lege(schaum,basis(0xffffff,{transparent:true,opacity:.85,depthWrite:false}),-.17);
  const schaum2=umriss(2.35); schaum2.holes.push(umriss(2.05,new THREE.Path()));
  const s2=lege(schaum2,basis(0xeafaff,{transparent:true,opacity:.6,depthWrite:false}),-.2);
  lege(umriss(3.4),basis(0x6fd4d0),-.288);
  k.anim.push(t=>{ const a=Math.sin(t*1.2), b=Math.sin(t*1.2+2); s1.scale.set(1+a*.008,1+a*.009,1); s2.scale.set(1+b*.016,1+b*.018,1); s2.material.opacity=.4+b*.25; });
  meer(k,-.3,0x2f9fcb);
}

/* ---------- Palme ---------- */
function palme(k,x,z,h,nx,nz,start){
  const g=gruppe(k.scene,x,0,z), stamm=gruppe(g,0,0,0), N=9;
  const ort=i=>{ const s=i/N; return [nx*s*s, h*s, nz*s*s]; };
  for(let i=0;i<N;i++){ const a=ort(i), b=ort(i+1), r=.34-i*.018, d=V(b[0]-a[0],b[1]-a[1],b[2]-a[2]), l=d.length();
    const t=rohr(stamm,r*.82,r,l*1.04,i%2?STAMM:STAMM2,(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2,9); t.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); }
  for(let i=0;i<5;i++){ const a=i*1.257; ball(stamm,.2,STAMM2,Math.cos(a)*.3,.07,Math.sin(a)*.3,1.4,.55,.8).rotation.y=-a; }
  verschmelze(stamm);
  const krone=gruppe(g,nx,h,nz);
  for(let i=0;i<8;i++){ const a=i*.785+start; wedel(krone,2.5+(i%3)*.25,.5,1.5-(i%2)*.55,2.1,i%2?BLATT:BLATT2,0,.05+(i%2)*.08,0,a); strich(krone,[0,0,0],[Math.cos(a)*.7,.32,-Math.sin(a)*.7],.035,0x4a7a28); }
  ball(krone,.34,0x6a8a28,0,0,0,1,.8,1); verschmelze(krone);
  k.kreis(x,z,.46); k.verdecker(g,x+nx,z+nz,2.8);
  k.anim.push(t=>{ krone.rotation.z=Math.sin(t*.9+start)*.045; krone.rotation.x=Math.sin(t*.67+start*2)*.035; });
}

/* ---------- Felswand mit Höhle ---------- */
function felswand(k,hinten){
  const w=gruppe(hinten,0,0,0), G=[felsGeo(1),felsGeo(5),felsGeo(9)], F=[FELS,FELS2,FELS3];
  /* dunkle Rückschicht, damit zwischen den Felsen nichts durchscheint */
  const l=HX-2.3+19.4, r=19.4-HX-2.3;
  box(w,l,5.4,.8,0x5c4434,-19.4+l/2,2.7,-15.7); box(w,r,5.4,.8,0x5c4434,19.4-r/2,2.7,-15.7); box(w,4.7,1.3,.8,0x5c4434,HX,4.75,-15.7);
  const brocken=(x,y,sx,sy,sz,f,i,vorn)=>{ const m=teil(w,G[i%3],F[f],x,y,vorn-sz*1.17-sx*.1,sx,sy,sz); m.rotation.set(0,(zufall()-.5)*.16,(zufall()-.5)*.3); return m; };
  [[.9,1.45,1.25,-13.32],[2.9,1.35,1.35,-13.55],[4.7,1.4,1.05,-13.9]].forEach(([y,sx,sy,vorn],reihe)=>{
    for(let i=0,x=-19+reihe*.8;x<=19.4;i++,x+=2.05){ const bx=sx*(.85+zufall()*.35), by=sy*(.85+zufall()*.3), yy=y+(zufall()-.5)*.35;
      if(Math.abs(x-HX)<2.35+bx*1.17 && yy-by*1.17<4.05) continue;
      brocken(x,yy,bx,by,1,(i+reihe*2)%3,i+reihe,vorn-zufall()*.18); } });
  /* Felskuppe, die die Höhle hinten und seitlich umschließt */
  box(w,5.8,1,2.5,0x5c4434,HX,4.9,-17.1); [-1,1].forEach(s=>box(w,.7,4.5,2.5,0x5c4434,HX+s*2.8,2.25,-17.1));
  [[-1.7,1.2],[.3,1.45],[2,1.1]].forEach(([x,r],i)=>teil(w,G[i],F[i],HX+x,5.2,-16.9,r*1.2,r*.75,r));
  /* Felsbogen um den Eingang */
  for(let i=0;i<=10;i++){ const a=i/10*Math.PI; brocken(HX+Math.cos(a)*2.72,1.9+Math.sin(a)*2.6,.72,.7,.65,i%2?2:0,i,-13.52); }
  [-1,1].forEach((s,i)=>{ brocken(HX+s*2.8,.6,.8,.95,.65,2-i,i+1,-13.52); });
  brocken(HX-.3,5.3,1.5,.8,.7,1,2,-13.7); brocken(HX+2.4,5.1,1.2,.9,.7,0,1,-13.75);
  /* Grün oben auf dem Fels */
  const gruen=gruppe(hinten,0,0,0);
  for(let x=-18.6;x<=18.8;x+=1.5){ const y=5.65+zufall()*.35, z=-15.1+zufall()*.5; ball(gruen,.75+zufall()*.35,zufall()>.5?BLATT:0x278234,x,y,z,1.3,.7,1); ball(gruen,.45,BLATT2,x+.6,y+.25,z+.25,1.2,.75,1); }
  for(let i=0;i<30;i++){ const x=-18+i*1.24+zufall()*.4; ball(gruen,.11,[0xff5a8a,0xffffff,0xffa62a][i%3],x,6.05+zufall()*.4,-14.45+zufall()*.2); }
  [-16,-9.5,-3.4,2.8,13.6,17.2].forEach((x,i)=>{ for(let j=0;j<7;j++) wedel(gruen,1.5,.32,1.1-(j%2)*.5,1.5,j%2?BLATT:BLATT2,x,6.1,-15,j*.9+i); });
  [[-17,3.2],[10.9,5.4],[-3.3,4.6]].forEach(([x,h],i)=>{ strich(gruen,[x,5.6,-15.6],[x+(i%2?.5:-.4),5.6+h*.5,-15.8],.18,STAMM2); strich(gruen,[x+(i%2?.5:-.4),5.6+h*.5,-15.8],[x+(i%2?1.2:-.9),5.6+h*.85,-15.8],.13,STAMM);
    for(let j=0;j<7;j++) wedel(gruen,1.9,.4,1.1-(j%2)*.5,1.5,j%2?BLATT:BLATT2,x+(i%2?1.2:-.9),5.6+h*.85,-15.8,j*.9); });
  /* Lianen und Farne an der Wand */
  [[-9.7,3.3],[-8.9,1.8],[-3.4,2.7],[-2.7,1.5],[3.5,3.1],[4.3,1.9],[12.6,1.1],[15.3,3.4],[16.2,2.2],[-16.9,2.6]].forEach(([x,l],i)=>{ let a=[x,5.6,-13.55];
    const n=Math.ceil(l/.55); for(let j=1;j<=n;j++){ const b=[x+Math.sin(j*1.7+i)*.16,5.6-l*j/n,-13.2-Math.min(.1,j*.05)]; strich(gruen,a,b,.035,0x3a6a24); [-1,1].forEach(s=>ball(gruen,.14,(j+i)%2?BLATT:BLATT2,b[0]+s*.14,b[1]+(s>0?.12:0),b[2]+.04,1.2,.65,.4).rotation.z=s*.5); a=b; }
    if(i%3===0) ball(gruen,.13,0xff5a8a,a[0],a[1]-.1,a[2]+.06); });
  [[-9.4,1.5],[3.3,2.2],[15.6,1.2],[-3.1,3.4]].forEach(([x,y],i)=>{ for(let j=0;j<6;j++) wedel(gruen,.8,.18,.65,.7,j%2?BLATT:BLATT2,x,y,-13.35,Math.PI+j*Math.PI/5); });
  verschmelze(w); verschmelze(gruen);
  /* Hindernis entlang der Wand */
  k.kasten((-18.5+HX-2.2)/2,-13.6,HX-2.2+18.5,.7); k.kasten((18.5+HX+2.2)/2,-13.6,18.5-HX-2.2,.7);
}

/* ---------- Wasserfall mit kleinem Becken ---------- */
function wasserfall(k,hinten){
  const t=bild(128,256,g=>{ g.fillStyle='#68c4e8'; g.fillRect(0,0,128,256); for(let i=0;i<110;i++){ const x=zufall()*124, y=zufall()*256, l=20+zufall()*50; g.fillStyle=i%3?'rgba(255,255,255,.75)':'rgba(40,130,200,.5)'; g.fillRect(x,y,3+(i%3),l); g.fillRect(x,y-256,3+(i%3),l); } });
  t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(1,1.4);
  const geo=new THREE.PlaneGeometry(1.7,5.8,4,10), m=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({map:t})); m.position.set(-13.2,2.9,-13.14); hinten.add(m);
  const kante=gruppe(hinten,-13.2,0,0), G=felsGeo(3);
  [[-1.2,5.8,.65],[1.2,5.85,.7],[0,6.15,.5],[-1.15,.45,.55],[1.15,.4,.6]].forEach(([x,y,s],i)=>teil(kante,G,i%2?FELS2:FELS3,x,y,-13.55,s,s,.45));
  walze(kante,.9,.12,0x8ad8f4,0,5.75,-13.35).scale.set(.95,.12,.3);
  verschmelze(kante);
  const becken=gruppe(k.scene,-13.2,0,-12.35);
  walze(becken,1,.04,0x4ab4dc,0,.025,-.1).scale.set(1.75,.04,.95);
  walze(becken,1,.046,0x8ad8f4,0,.028,-.35).scale.set(1.05,.046,.55);
  for(let i=0;i<13;i++){ const a=-.25+i/12*(Math.PI+.5), s=.24+zufall()*.16; teil(becken,G,i%2?STEIN:FELS3,Math.cos(a)*1.8,s*.45,Math.sin(a)*.98-.1,s*1.2,s*.9,s).rotation.y=i; }
  verschmelze(becken);
  const gischt=new THREE.InstancedMesh(GEO.sph,basis(0xffffff),9), o=new THREE.Object3D(); gischt.frustumCulled=false; k.scene.add(gischt);
  k.anim.push(z=>{ t.offset.y=z*.9; for(let i=0;i<9;i++){ const s=.07+Math.abs(Math.sin(z*4+i*1.7))*.12; o.position.set(-13.9+i*.18,.12+Math.sin(z*5+i)*.05,-12.9+(i%3)*.17); o.scale.set(s,s*.8,s); o.updateMatrix(); gischt.setMatrixAt(i,o.matrix); } gischt.instanceMatrix.needsUpdate=true; });
  k.kasten(-13.2,-12.4,4.1,1.7);
}

/* ---------- Ausgang: Höhle mit rollendem Stein ---------- */
function hoehle(k,hinten){
  const sc=k.scene, innen=gruppe(sc,HX,0,0);
  const t=bild(256,256,g=>{ g.fillStyle='#3a1c08'; g.fillRect(0,0,256,256); const v=g.createRadialGradient(128,190,8,128,180,170); v.addColorStop(0,'#fff6b8'); v.addColorStop(.3,'#ffcc40'); v.addColorStop(.65,'#b8661a'); v.addColorStop(1,'#3a1c08'); g.fillStyle=v; g.fillRect(0,0,256,256); });
  const hg=new THREE.Mesh(new THREE.PlaneGeometry(4.9,4.4),basis(0x6a6a6a,{map:t})); hg.position.set(0,2.2,-17.8); innen.add(hg);
  const dunkel=basis(0x2e1a10,{side:THREE.DoubleSide});
  [-1,1].forEach(s=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(3.4,4.4),dunkel); m.rotation.y=Math.PI/2; m.position.set(s*2.38,2.2,-16.1); innen.add(m); });
  const decke=new THREE.Mesh(new THREE.PlaneGeometry(4.8,3.4),dunkel); decke.rotation.x=Math.PI/2; decke.position.set(0,4.35,-16.1); innen.add(decke);
  /* Goldschatz tief in der Höhle */
  const schatz=gruppe(innen,0,0,-17.1), gold=basis(0xffd23a), gold2=basis(0xf0a818);
  [[-1.25,.9],[1.3,1.05],[.2,.55]].forEach(([x,s],j)=>{ kegel(schatz,.75*s,.8*s,gold2,x,.4*s,j===2?-.45:0); for(let i=0;i<22;i++){ const a=i*2.4, r=(i/22)*.75*s; const m=walze(schatz,.13,.035,i%3?gold:gold2,x+Math.cos(a)*r,.82*s*(1-i/24),(j===2?-.45:0)+Math.sin(a)*r+.06); m.rotation.set(zufall()*.6,0,zufall()*.6); } });
  schatz.traverse(m=>{ m.castShadow=false; }); verschmelze(schatz);
  const glut=schein(innen,'rgba(255,205,70,.85)',0,1.6,-16.6,4.6); glut.material.opacity=.2;
  const licht=new THREE.PointLight(0xffb830,0,9,1.5); licht.position.set(HX,2,-15.4); sc.add(licht);
  /* der große runde Stein */
  const R=2.14, roll=gruppe(sc,HX,2.02,-12.98), stein=gruppe(roll,0,0,0);
  teil(stein,felsGeo(17,2,.11),STEIN,0,0,0,R,R,.46);
  teil(stein,felsGeo(21,2,.12),0x8e8c84,0,0,-.08,R*1.03,R*1.01,.38);
  [[-1.35,-.55,.38],[-1.05,-.95,.26],[1.3,1.0,.24],[.75,-1.35,.2]].forEach(([x,y,s])=>ball(stein,s,0x5a9a48,x,y,.34,1.2,.85,.45));
  verschmelze(stein);
  /* goldenes Zahlenschloss über Kopfhöhe (drei Felder wie in den anderen Räumen) */
  const schloss=gruppe(roll,0,.52,.57);
  box(schloss,2.5,.16,.1,EISEN,0,0,-.05); [-1.15,1.15].forEach(x=>ball(schloss,.12,MESSING,x,0,.02,1,1,.6));
  box(schloss,1.25,.86,.24,GOLD,0,-.02,.05); ring(schloss,.34,.09,0xc4cad4,0,.41,.05,Math.PI);
  box(schloss,1.05,.66,.04,0xffd95a,0,-.02,.18); [-1,1].forEach(a=>[-1,1].forEach(b=>ball(schloss,.05,0xa87a18,a*.46,-.02+b*.26,.2,1,1,.6)));
  [-.31,0,.31].forEach(x=>{ box(schloss,.25,.38,.04,0xfff3cf,x,-.04,.21); box(schloss,.06,.2,.02,0x2a1a08,x,-.04,.24); });
  verschmelze(schloss);
  let tuer=null;
  tuer=ausgang(k,{ steh:[HX,-11.15], durch:[HX,-15.9], treffer:{x:HX,y:2.1,z:-12.9,b:4.3,h:4.2,t:1.4}, name:'Höhle', schildOben:[HX,5.1,-12.2], glanz:[HX,2.5,-12.15],
    bewege:(auf,z)=>{ const w=auf*4.6; roll.position.x=HX+w; roll.rotation.z=-w/R; schloss.visible=!(tuer && tuer.offen);
      hg.material.color.setScalar(.42+auf*.58); licht.intensity=auf*(1.7+Math.sin((z||0)*7)*.15); glut.material.opacity=.2+auf*.8; } });
  k.kasten(HX,-13.1,4.5,1.5);
  return tuer;
}

/* ---------- Ferne: Schiff vor Anker, Hügel, Wolken, springende Fische ---------- */
function schiff(k){
  const g=gruppe(k.scene,-29,-.2,-5); g.rotation.y=1.25;
  const r=gruppe(g,0,0,0);
  platte(r,[[-5,2.6],[-3.2,2.5],[-3,1.7],[2.8,1.7],[3.2,2.2],[5.4,2.4],[4.2,.6],[2.8,-.1],[-3.8,-.1],[-4.8,.8]],2.6,0x7a4a24,0,0,-1.3);
  platte(r,[[-4.75,1.25],[4.7,1.25],[4.5,.95],[-4.55,.95]],2.7,0xe8b84a,0,0,-1.35);
  [-3,-1.5,0,1.5,3].forEach(x=>[-1,1].forEach(s=>ball(r,.2,0x2a1a10,x,.55,s*1.34,1,1,.3)));
  [-4.6,-3.8,-3.1,3.6,4.4].forEach(x=>[-1,1].forEach(s=>box(r,.12,.5,.12,HOLZ3,x,2.65,s*1.2)));
  strich(r,[5,2.2,0],[7.2,3.1,0],.09,HOLZ2);
  const segel=(x,y,b,h)=>{ const geo=new THREE.PlaneGeometry(b,h,8,6), p=geo.attributes.position; for(let i=0;i<p.count;i++){ const u=p.getX(i)/b*2, v=p.getY(i)/h*2; p.setZ(i,(1-u*u)*(1-v*v*.6)*.55); } geo.computeVertexNormals();
    const s=gruppe(r,x,y,0); s.rotation.y=.62; const m=new THREE.Mesh(geo,doppel(0xfaf2dc)); s.add(m); [-1,1].forEach(v=>strich(s,[-b/2-.15,v*h/2,0],[b/2+.15,v*h/2,0],.06,HOLZ2)); };
  [[-2.6,6.4],[.3,7.8],[3,5.9]].forEach(([x,h])=>{ strich(r,[x,1.6,0],[x,h,0],.13,HOLZ2); segel(x,h*.43+.4,2.7,1.8); segel(x,h*.74+.25,2,1.35); ball(r,.18,MESSING,x,h,0); });
  const fb=bild(160,100,c=>{ c.fillStyle='#2a6ab8'; c.fillRect(0,0,160,100); const e=(x,y,a,b,f,d)=>{ c.fillStyle=f; c.beginPath(); c.ellipse(x,y,a,b,d||0,0,6.283); c.fill(); };
    e(70,58,22,30,'#e03a2a',-.3); e(86,30,18,18,'#e03a2a'); e(60,62,12,24,'#2fb84a',-.5); e(48,82,6,18,'#ffc21a',.8); e(92,26,6,6,'#ffffff'); e(93,26,3,3,'#101008'); c.fillStyle='#ffc21a'; c.beginPath(); c.moveTo(101,24); c.quadraticCurveTo(122,30,104,46); c.lineTo(99,34); c.fill(); });
  const flagge=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.05),new THREE.MeshBasicMaterial({map:fb,side:THREE.DoubleSide})); flagge.position.set(.3-.7,8.5,.55); flagge.rotation.y=.62; r.add(flagge); strich(r,[.3,7.8,0],[.3,9.1,0],.05,HOLZ2);
  strich(r,[4.2,1.6,1.4],[5.6,-.1,2.2],.04,0x3a3d44);
  r.traverse(m=>{ m.castShadow=false; }); verschmelze(r);
  k.anim.push(t=>{ g.position.y=-.2+Math.sin(t*.8)*.12; r.rotation.x=Math.sin(t*.6)*.03; });
}
/* grünes Hinterland hinter der Felswand */
function huegel(k){
  const g=gruppe(k.scene,0,0,0);
  walze(g,1,.2,0xcfae6c,0,-.14,-26).scale.set(27,.2,13); walze(g,1,.2,0x4f9440,0,-.09,-27).scale.set(24,.2,11);
  [[-17,-23,6,4.2],[-7,-27,8,5.8],[4,-24,6.5,3.8],[14,-26,7.5,5.2],[-14,-33,7,4],[8,-34,9,6.2],[21,-22,4.5,2.8],[-1,-21.5,4,2.4]].forEach(([x,z,b,h],i)=>{
    ball(g,1,i%2?0x3f8a38:0x58a444,x,-.2,z,b,h,b*.62);
    for(let j=0;j<5;j++){ const a=j*1.9+i, u=.3+(j%3)*.18; ball(g,.7+(j%2)*.35,j%2?0x278234:BLATT,x+Math.cos(a)*b*u,h*Math.sqrt(1-u*u)-.4,z+Math.abs(Math.sin(a))*b*.62*u,1.2,.75,1); } });
  [[-19,-20,3.6],[-11.5,-22.5,5.4],[-8,-27,7.4],[-2,-20.5,4.2],[3.5,-22.5,5.8],[11,-20,3.8],[15,-26,7],[19,-20.5,4],[8,-34,8],[-15,-31,6]].forEach(([x,z,h],i)=>{
    const sp=[x+(i%2?.8:-.8),h,z]; strich(g,[x,0,z],sp,.22,i%2?STAMM:STAMM2); for(let j=0;j<7;j++) wedel(g,2.5,.5,1.3-(j%2)*.5,1.9,j%2?BLATT:BLATT2,sp[0],sp[1],sp[2],j*.9+i); });
  g.traverse(m=>{ m.castShadow=false; }); verschmelze(g);
}
function ferne(k){
  const G=felsGeo(13);
  [[-26,10,1.4],[25,-10,1.8],[29,-7,1],[-23,-17,2],[24,15,.9],[-24,17,1.1]].forEach(([x,z,s])=>{ const g=gruppe(k.scene,x,0,z); teil(g,G,FELS,0,0,0,s*1.4,s,s); teil(g,G,FELS2,s,-.1,s*.7,s*.7,s*.55,s*.6); ball(g,s*.55,BLATT,-.1,s*.85,0,1.3,.5,1); g.traverse(m=>{ m.castShadow=false; }); verschmelze(g); });
  const wolken=[[-48,7,-22],[-40,10,8],[46,8,-16],[50,6,10],[-18,13,-48],[22,11,-50]].map(([x,y,z],i)=>{ const g=gruppe(k.scene,x,y,z), w=basis(0xffffff);
    [[0,0,2],[2,-.35,1.5],[-2.1,-.4,1.4],[.8,.75,1.35],[-.8,.5,1.2]].forEach(([a,b,r])=>{ ball(g,r,w,a,b,0,1.2,.75,.8).castShadow=false; }); verschmelze(g); return [g,z,i]; });
  k.anim.push(t=>wolken.forEach(([g,z,i])=>{ g.position.z=z+Math.sin(t*.05+i)*5; }));
  [[-23,5,0],[22.5,-4,2.1],[-22.5,-12,4]].forEach(([x,z,s])=>{ const g=gruppe(k.scene,x,-1,z), f=gruppe(g,0,0,0); ball(f,.3,0xf28a2a,0,0,0,1.8,.8,.5); const h=kegel(f,.28,.4,0xffc21a,-.65,0,0); h.rotation.z=-Math.PI/2; h.scale.z=.08; [-1,1].forEach(v=>ball(f,.05,0x101008,.35,.07,v*.13)); verschmelze(f);
    k.anim.push(t=>{ const p=((t+s)%5)/1.4, da=p<1; g.visible=da; if(da){ g.position.set(x,-.4+Math.sin(p*Math.PI)*1.8,z-1+p*2); g.rotation.y=-Math.PI/2; f.rotation.z=(.5-p)*2; } }); });
}

/* ---------- Strandausstattung ---------- */
function ausstattung(k){
  const sc=k.scene, G=[felsGeo(2),felsGeo(7),felsGeo(11)];
  /* Felsbrocken mit Pflanzen */
  const felsen=gruppe(sc,0,0,0);
  [[-17.1,-3.4,.9],[17.1,-1.2,.85],[17,-8.3,.95],[-6.4,-6.8,.9],[16.9,1.6,.55],[-17.3,12,.75],[11.2,-6.9,.6],[-16.9,-11.2,.7],[2.3,-12.4,.5],[-9.5,-12.5,.55]].forEach(([x,z,s],i)=>{
    teil(felsen,G[i%3],[STEIN,FELS3,FELS][i%3],x,s*.55,z,s,s*.8,s*.9).rotation.y=i*1.3;
    teil(felsen,G[(i+1)%3],FELS2,x+(x>0?-.55:.55)*s,s*.22,z+.5*s,s*.45,s*.38,s*.4).rotation.y=i;
    for(let j=0;j<5;j++) wedel(felsen,.7+s*.35,.16,.75,.8,j%2?BLATT:BLATT2,x-.1,.1,z-s*.6,j*1.25+i);
    k.kreis(x,z,s*1.02); });
  verschmelze(felsen);
  /* sitzender Papagei auf dem Felsen */
  const ast=gruppe(sc,-6.4,0,-6.8); strich(ast,[0,.7,0],[0,1.36,0],.09,STAMM2); strich(ast,[-.1,1.34,-.35],[.1,1.34,.35],.065,STAMM); verschmelze(ast);
  const p=papagei(sc,-6.4,1.4,-6.8); p.g.rotation.y=-1; k.anim.push(t=>{ p.kopf.rotation.y=Math.sin(t*.9)*.7; p.kopf.rotation.z=Math.sin(t*2.3)*.12; const s=Math.max(0,Math.sin(t*.5)-.7)*3*Math.abs(Math.sin(t*12)); p.fl[0].rotation.x=s; p.fl[1].rotation.x=-s; });
  /* Tropenbüsche mit großen Blüten */
  const busch=gruppe(sc,0,0,0);
  [[-17.2,-6.2,1],[-17.3,3.6,.85],[-17.2,8.4,.9],[17.2,-4.6,.95],[17.3,9,.8],[3.6,-12.35,.8],[-3.2,-12.4,.75],[16.5,-12.2,.9],[-17.1,-.9,.7],[-2.3,12.4,.6],[12.4,12.3,.7]].forEach(([x,z,s],i)=>{
    for(let j=0;j<9;j++) wedel(busch,1.15*s,.3*s,(j%3===0?1.5:.95)*s,.9*s,j%2?BLATT:BLATT2,x,.12,z,j*.7+i);
    ball(busch,.35*s,0x278234,x,.3*s,z,1.2,.9,1.2);
    const f=[0xff4a6a,0xff9a1a,0xe85ac8,0xffffff][i%4];
    [[.3,.7,.35],[-.4,.55,.2],[.05,.95,-.1]].forEach(([a,b,c])=>{ for(let m=0;m<5;m++){ const w=m*1.257; ball(busch,.1*s,f,x+(a+Math.cos(w)*.11)*s,(b+Math.sin(w)*.11)*s,z+c*s,1,1,.55); } ball(busch,.065*s,0xffd83a,x+a*s,b*s,z+(c+.08)*s); });
    k.kreis(x,z,.8*s); });
  verschmelze(busch);
  /* Lagerfeuer */
  const feuer=gruppe(sc,3.3,0,9.2), holz=gruppe(feuer,0,0,0);
  for(let i=0;i<9;i++){ const a=i*.698; teil(holz,G[i%3],i%2?STEIN:0x7a766e,Math.cos(a)*.72,.14,Math.sin(a)*.72,.23,.18,.23).rotation.y=a; }
  for(let i=0;i<5;i++){ const a=i*1.257; strich(holz,[Math.cos(a)*.5,.08,Math.sin(a)*.5],[-Math.cos(a)*.06,.55,-Math.sin(a)*.06],.075,i%2?HOLZ2:0x4a2a12); }
  verschmelze(holz);
  const flammen=[[0,.95,0xff7a1a,0],[-.22,.6,0xffa62a,.12],[.22,.68,0xffa62a,-.1],[.02,.5,0xffe866,.22]].map(([x,h,c,z])=>{ const m=kegel(feuer,h*.28,h,basis(c),x,.2+h/2,z); m.castShadow=false; return [m,h]; });
  schein(feuer,'rgba(255,160,60,.55)',0,.7,0,2.4);
  k.anim.push(t=>flammen.forEach(([m,h],i)=>{ const s=1+Math.sin(t*(9+i*2.1)+i)*.22; m.scale.y=h*s; m.position.y=.2+h*s/2; }));
  flacker(k,3.3,1.3,9.2,0xff8a30,.35,6); k.kreis(3.3,9.2,.95);
  /* Grasbüschel, Blümchen und kleine Kiesel */
  const frei=[[-13,7.5],[-10.5,-5],[-3,8],[7,3.5],[-3.5,-3],[4.5,-5.5],[14.8,5.5],[14,-6],[3.3,9.2],[HX,-11],[-6.5,-11.6],[0,-11.6]];
  const orte=(n,rand)=>{ const L=[]; let v=0; while(L.length<n && v++<3000){ const x=(zufall()-.5)*35.4, z=(zufall()-.5)*25.6+.2; if(rand && Math.abs(x)<13 && z<10.5 && z>-9.8) continue; if(frei.some(f=>Math.hypot(x-f[0],z-f[1])<2.3)) continue; L.push([x,z]); } return L; };
  const o=new THREE.Object3D(), streu=(geo,farbe,liste)=>{ const m=new THREE.InstancedMesh(geo,mat(farbe),liste.length||1); m.frustumCulled=false; liste.forEach((q,i)=>{ o.position.set(q[0],q[1],q[2]); o.rotation.set(q[3]||0,q[4]||0,q[5]||0); o.scale.set(q[6],q[7],q[8]); o.updateMatrix(); m.setMatrixAt(i,o.matrix); }); m.receiveShadow=true; sc.add(m); };
  const halme=[[],[]];
  orte(80,true).forEach(([x,z],i)=>{ for(let j=0;j<7;j++){ const a=j*.9+i, h=.28+zufall()*.32; halme[i%2].push([x+Math.cos(a)*.13,h*.45,z+Math.sin(a)*.13,Math.sin(a)*.45,0,-Math.cos(a)*.45,.045,h,.045]); } });
  streu(GEO.cone,0x4a9a38,halme[0]); streu(GEO.cone,0x86b83c,halme[1]);
  const bluete=orte(34,true); streu(GEO.sph,0xfff4a0,bluete.slice(0,17).map(([x,z])=>[x,.2,z,0,0,0,.09,.07,.09])); streu(GEO.sph,0xff7aa8,bluete.slice(17).map(([x,z])=>[x,.2,z,0,0,0,.09,.07,.09]));
  streu(GEO.cyl,0x4a8a30,bluete.map(([x,z])=>[x,.09,z,0,0,0,.015,.18,.015]));
  const kiesel=felsGeo(4,0,.35);
  [0xb09474,0x98938a].forEach(c=>streu(kiesel,c,orte(46,false).map(([x,z])=>{ const s=.06+zufall()*.08; return [x,s*.45,z,0,zufall()*6,0,s*1.2,s*.75,s]; })));
}

/* ---------- Tiere ---------- */
function schildkroete(k,weg){
  const g=gruppe(k.scene,0,0,0), r=gruppe(g,0,0,0), HAUT=0x8ab84a;
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(.62,12,6,0,Math.PI*2,0,Math.PI/2),mat(0x3f7a34)); kuppel.position.y=.26; kuppel.scale.set(1.15,.85,.95); kuppel.castShadow=true; r.add(kuppel);
  walze(r,.62,.1,0xc8a85a,0,.25,0).scale.set(.73,.1,.61);
  ball(r,.2,0x7a5a28,0,.76,0,1.2,.3,1.1); for(let i=0;i<6;i++){ const a=i*1.047; ball(r,.15,0x6a8a2a,Math.cos(a)*.45,.6,Math.sin(a)*.37,1.15,.42,1); }
  strich(r,[.55,.3,0],[.82,.43,0],.12,HAUT); ball(r,.21,HAUT,.93,.48,0,1.2,.95,.95);
  [-1,1].forEach(s=>{ ball(r,.065,0xffffff,1.04,.57,s*.13); ball(r,.035,0x101008,1.09,.58,s*.14); });
  strich(r,[1.12,.4,-.08],[1.16,.39,.08],.012,0x3a5a1a); const sw=kegel(r,.08,.26,HAUT,-.78,.25,0); sw.rotation.z=Math.PI/2; verschmelze(r);
  const beine=[[.42,.5],[.42,-.5],[-.45,.45],[-.45,-.45]].map(([x,z])=>{ const b=gruppe(g,x,.19,z); ball(b,.2,HAUT,x>0?.08:-.06,-.07,z>0?.06:-.06,1.35,.55,.85).rotation.y=(x>0?-1:1)*(z>0?.5:-.5); verschmelze(b); return b; });
  k.anim.push(t=>{ beine.forEach((b,i)=>b.rotation.y=Math.sin(t*2.6+(i%3?3.14:0))*.35); r.position.y=Math.abs(Math.sin(t*2.6))*.025; });
  laeufer(k,g,weg,.38,0,2);
}
function schmetterling(k,x,z,farbe,start){
  const g=gruppe(k.scene,x,1.5,z); ball(g,.07,0x2a1a10,0,0,0,2,.7,.7);
  const fl=[-1,1].map(s=>{ const a=gruppe(g,0,.02,s*.03); ball(a,.17,farbe,.06,0,s*.16,.85,.07,1); ball(a,.11,farbe,-.12,0,s*.11,.9,.08,.9); ball(a,.05,0xffffff,.08,.012,s*.2,1,.1,1); verschmelze(a); return a; });
  g.traverse(m=>{ m.castShadow=false; });
  k.anim.push(t=>{ const a=t*.5+start; g.position.set(x+Math.sin(a)*1.6,1.5+Math.sin(t*2.1+start)*.45,z+Math.sin(a*2)*.8); g.rotation.y=Math.atan2(-Math.cos(a*2)*1.6,Math.cos(a)*1.6); const s=Math.sin(t*13+start)*.9; fl[0].rotation.x=s; fl[1].rotation.x=-s; });
}

function baue(k){
  const sc=k.scene;
  sc.add(new THREE.HemisphereLight(0xd4ecff,0xb08c58,.65));
  const sonne=new THREE.DirectionalLight(0xfff0c8,.55); sonne.position.set(-11,24,13); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const hinten=k.wand('hinten');
  boden(k);
  felswand(k,hinten);
  wasserfall(k,hinten);
  const tuer=hoehle(k,hinten);
  schiff(k); huegel(k); ferne(k);
  ausstattung(k);
  [[-16.2,-8.6,4.6,.9,.5,0],[-15.9,.9,5,1.1,-.3,1.3],[-12.5,-1.9,4.9,-.9,-.6,2.2],[11.5,-2.7,5.1,.8,-.7,3.1],[-2.9,-9.1,4.8,-.7,-.4,4.4],[16.1,-11,4.3,-.8,.6,.7]].forEach(a=>palme(k,a[0],a[1],a[2],a[3],a[4],a[5]));

  schildkroete(k,[[-1.8,.7],[.3,-.9],[.8,1.8],[2.3,4.4],[-1.8,3.6]]);
  krabbe(k,[[8,10.2],[10.8,11.4],[13.2,9.8],[10.2,8.4]],.8,0);
  krabbe(k,[[-16,4.9],[-13.6,3.4],[-11.4,4.6],[-14.2,5.5]],.65,3);
  krabbe(k,[[7.4,-1.6],[10,-2.6],[9.4,-4.6],[7.2,-3.4]],.55,5);
  papageiFlug(k,-8.2,-6.2,3.2,6.7,.55,1);
  moewe(k,-24,0,5,5.5,.45,0); moewe(k,23,-5,4.5,6,-.5,2); moewe(k,-5,-19,7,10,.35,4); moewe(k,23,9,3.5,4,.6,1);
  schmetterling(k,-12,1.2,0xff8a1a,0); schmetterling(k,2,-8.8,0x3a9af0,2.4); schmetterling(k,12.5,2,0xf0d020,4.1);

  return { tuer, start:[2.8,.2] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.6,-10.4],[-16,-4.8],[-16.9,6.6],[-15,11.6],[-11.8,-8.4],[-9.2,1.2],[-6.2,-8.8],[-7.8,9.9],[-1.2,-9.4],[-5.8,-1],[1.4,6.8],[4.6,-8.2],[5.4,11.8],[9.6,1.4],[12.8,-2.2],[15.9,-9.4],[11.4,-9.6],[15.7,8],[14.6,10.8],[16.2,-3]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-13, z:7.4, steh:[-13,9.35], kasten:[2.7,2], treffer:[2.7,1.8,2], baue(g){ /* 1 Muschelhaufen */
      ball(g,1.25,SANDD,0,0,0,1,.32,.72);
      const muschel=(x,y,z,R,c,d,rx,ry,rz)=>{ const m=gruppe(g,x,y,z); m.rotation.set(rx,ry,rz); const N=12, P=[];
        const pkt=(i,s)=>{ const a=-1.3+i/N*2.6, r=R*s*(1-.1*(a/1.3)*(a/1.3))*(s===1&&i%2===0?1.05:1), z2=s===0?0:(s<1?.24*R:.04*R)+(i%2?.07*R:0)*s; return [Math.sin(a)*r,Math.cos(a)*r,z2]; };
        for(let i=0;i<N;i++){ const h=pkt(0,0), a=pkt(i,.58), b=pkt(i+1,.58), e=pkt(i,1), f=pkt(i+1,1); P.push(...h,...b,...a, ...a,...b,...f, ...a,...f,...e); }
        netz(m,P,c,0,0,0);
        for(let i=1;i<N;i+=2){ const a=pkt(i,.58), e=pkt(i,1); strich(m,[0,.02,.02],[a[0],a[1],a[2]+.015],.018,d); strich(m,[a[0],a[1],a[2]+.015],[e[0],e[1],e[2]+.015],.018,d); }
        box(m,R*.55,R*.17,R*.14,d,0,0,.01); };
      muschel(-.15,.3,-.28,1.2,0xffa878,0xc8603a,-.18,.05,.04);
      muschel(-.82,.18,.12,.82,0xff8ab0,0xc04a74,-.4,.35,.42);
      muschel(.72,.2,.05,.9,0xfff0d0,0xc89a60,-.35,-.3,-.38);
      muschel(-.2,.2,.5,.62,0xb89ae8,0x7a58b0,-.95,.1,-.15);
      muschel(.52,.13,.7,.46,0xff9a5a,0xb85a28,-1.15,-.2,.3);
      muschel(-.95,.12,.62,.4,0xfff0d0,0xc89a60,-1.2,.4,.2);
      /* große Schneckenmuschel */
      const sn=gruppe(g,.98,.34,.46); sn.rotation.set(0,-.5,.2);
      [[0,0,.36],[.27,.07,.28],[.47,.15,.2],[.61,.23,.13],[.7,.3,.08]].forEach(([x,y,r],i)=>{ ball(sn,r,i%2?0xf4c8a0:0xfae4c4,x-.2,y,0); if(r>.1) ring(sn,r*.94,.022,0xc87a50,x-.2,y,0).rotation.y=1.3; });
      ball(sn,.22,0xf07a90,-.42,-.04,.12,.8,.9,.55); ball(g,.15,0xffffff,.1,.46,.56); } },
  { x:-10.5, z:-5, steh:[-10.5,-3.25], kasten:[2.4,1.8], treffer:[2.4,1.7,1.8], baue(g){ /* 2 Kokosnüsse */
      [-1,1].forEach(s=>wedel(g,1.35,.5,.12,.1,s>0?BLATT:BLATT2,0,.03+(s>0?.012:0),0,s>0?.15:Math.PI-.2));
      const nuss=(x,y,z,d,kipp)=>{ const n=gruppe(g,x,y,z); n.rotation.set(kipp,d,0); ball(n,.46,KOKOS,0,0,0,1,1.06,1);
        [[-.13,.14],[.13,.14],[0,-.05]].forEach(([a,b])=>ball(n,.07,0x231204,a,b,Math.sqrt(.215-a*a-b*b)-.01,1,1,.6));
        for(let i=0;i<12;i++){ const a=i*2.4, v=-.5+i*.09, r=Math.cos(v*1.5)*.43; strich(n,[Math.cos(a)*r,v*.8,Math.sin(a)*r],[Math.cos(a+.25)*(r+.05),v*.8+.17,Math.sin(a+.25)*(r+.05)],.014,0xa87a44); }
        [-1,0,1].forEach(v=>strich(n,[v*.03,.46,0],[v*.13,.62,-.03],.02,0xb88a50)); };
      nuss(-.5,.46,-.28,.25,-.2); nuss(.42,.46,-.35,-.3,-.25); nuss(-.05,1.14,-.27,.05,-.2); nuss(-.62,.44,.55,.5,-.35);
      /* eine aufgeschlagene Kokosnuss */
      const h=gruppe(g,.6,.4,.48); h.rotation.set(.8,-.3,0);
      const sch=new THREE.Mesh(new THREE.SphereGeometry(.46,18,10,0,Math.PI*2,Math.PI/2,Math.PI/2),mat(KOKOS)); sch.castShadow=true; h.add(sch);
      walze(h,.455,.04,0xfffdf2,0,-.005,0); walze(h,.29,.046,0xd8d0b8,0,.002,0); const rd=ring(h,.455,.025,0x4a2a10,0,0,0); rd.rotation.x=Math.PI/2; } },
  { x:-3, z:7.9, steh:[-3,9.55], kasten:[3.4,1.35], treffer:[3.5,1.8,1.4], baue(g){ /* 3 Treibholz mit Seestern */
      const H=0xbca888, D=0x8a7454, Q=Math.PI/2;
      const s1=rohr(g,.4,.5,2.1,H,-.4,.46,0,11); s1.rotation.z=-Q+.03; const s2=rohr(g,.28,.4,1.2,H,1.18,.5,0,11); s2.rotation.z=-Q-.08;
      [[-1.46,.49,.43],[1.79,.54,.23]].forEach(([x,y,r])=>{ walze(g,r,.05,0xe0cc9c,x,y,0).rotation.z=Q; [.65,.3].forEach(f=>{ ring(g,r*f,.016,D,x+(x<0?-.032:.032),y,0).rotation.y=Q; }); });
      strich(g,[-.8,.75,-.1],[-1.25,1.35,-.35],.15,H); strich(g,[-1.25,1.35,-.35],[-1.6,1.5,-.35],.08,H); strich(g,[-1.15,1.2,-.3],[-1.05,1.65,-.5],.06,D);
      strich(g,[1.3,.7,-.1],[1.65,1.1,-.25],.11,H); strich(g,[.9,.3,.25],[1.35,.07,.65],.1,D);
      [[-.9,.32,.9],[.1,.4,1.1],[-.4,.17,.75],[.9,.35,.7],[-.2,-.3,1]].forEach(([x,w,l])=>strich(g,[x-l/2,.47+Math.sin(w)*.47,Math.cos(w)*.46],[x+l/2,.47+Math.sin(w+.08)*.45,Math.cos(w+.08)*.45],.022,D));
      /* großer Seestern */
      const st=gruppe(g,.12,.84,.39); st.rotation.set(-.72,0,.12);
      const f=new THREE.Shape(); for(let i=0;i<=10;i++){ const a=Math.PI/2+i*Math.PI/5, r=i%2?.27:.72; if(i) f.lineTo(Math.cos(a)*r,Math.sin(a)*r); else f.moveTo(Math.cos(a)*r,Math.sin(a)*r); }
      const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:.1,bevelEnabled:true,bevelThickness:.07,bevelSize:.05,bevelSegments:2}),mat(0xff7a1e)); m.castShadow=true; st.add(m);
      ball(st,.19,0xff8e30,0,0,.15,1,1,.5); ball(st,.065,0xffd080,0,0,.26);
      for(let i=0;i<5;i++){ const a=Math.PI/2+i*Math.PI*.4; [.24,.4,.55].forEach((r,j)=>ball(st,.05-j*.009,0xffd080,Math.cos(a)*r,Math.sin(a)*r,.2-j*.012)); } } },
  { x:7, z:3.5, steh:[7,5.15], kasten:[2.3,1.35], treffer:[2.2,2.75,1.4], baue(g){ /* 4 Alter Spaten, steckt im Sand */
      ball(g,.85,SANDD,-.15,0,0,1,.2,.72);
      const s=gruppe(g,-.1,.12,0); s.rotation.z=-.16;
      platte(s,[[-.47,.86],[.47,.86],[.45,.25],[.27,-.05],[0,-.16],[-.27,-.05],[-.45,.25]],.1,0x8e98a6,0,0,-.05);
      box(s,.96,.09,.16,0x6a727e,0,.87,0); box(s,.07,.65,.03,0xc4ccd8,0,.52,.06);
      [[-.25,.6,.09],[.22,.42,.07],[.27,.7,.05],[-.14,.33,.05]].forEach(([x,y,r])=>ball(s,r,0xa8602a,x,y,.05,1,.8,.2));
      rohr(s,.09,.15,.4,0x6a727e,0,1.08,0,10); walze(s,.085,1.3,0xc08a4a,0,1.82,0); walze(s,.1,.09,EISEN,0,1.34,0);
      [-1,1].forEach(v=>strich(s,[0,2.4,0],[v*.28,2.68,0],.065,HOLZ2)); strich(s,[-.34,2.68,0],[.34,2.68,0],.085,HOLZ2);
      ball(g,.5,0xe0bc74,-.1,0,.12,1.15,.22,.85);
      /* ausgehobener Sandhaufen daneben */
      ball(g,.5,0xd8b068,.74,0,-.1,.95,.4,.9); ball(g,.26,0xe0bc74,.66,.12,0,1.1,.5,1); [[.95,.09,.35],[.55,.07,.48],[-.75,.08,.25]].forEach(([x,y,z])=>ball(g,.08,0xb08a50,x,y,z)); } },
  { wand:'hinten', x:-6.5, z:-12.85, steh:[-6.5,-11.2], treffer:[2.9,3.2,.8], baue(g,k){ /* 5 Holzschild mit Anker */
      [-.95,.85].forEach(x=>{ box(g,.24,3.2,.22,HOLZ2,x,1.6,-.14); kegel(g,.18,.25,HOLZ2,x,3.3,-.14); ball(g,.32,SANDD,x,0,-.1,1.2,.5,1); });
      const U=[[-1.38,-.9],[1.05,-.9],[1.55,0],[1.05,.9],[-1.38,.9]];
      platte(g,U,.16,HOLZ2,0,2.15,-.05); platte(g,U.map(([a,b])=>[a*.91+.01,b*.86]),.06,0xe0b878,0,2.15,.1);
      [-.28,.28].forEach(y=>box(g,2.35,.028,.02,0xa87c48,-.14,2.15+y,.17));
      [[-1.12,-.62],[-1.12,.62],[.95,-.62],[.95,.62]].forEach(([x,y])=>ball(g,.07,EISEN,x,2.15+y,.17));
      const a=gruppe(g,-.08,2.13,.23), F=0x1e3a6a;
      ring(a,.15,.055,F,0,.52,0); box(a,.13,.86,.09,F,0,-.04,0); box(a,.68,.11,.09,F,0,.23,.004); [-1,1].forEach(s=>ball(a,.08,F,s*.36,.23,0));
      const bg=ring(a,.47,.07,F,0,-.04,0,Math.PI*.84); bg.rotation.z=Math.PI*1.08;
      [-1,1].forEach(s=>{ const sp=kegel(a,.15,.26,F,s*.45,-.11,0); sp.rotation.z=-s*.35; sp.scale.z=.07; }); ball(a,.09,F,0,-.52,0);
      k.kasten(-6.5,-12.95,2.3,.5); } },
  { wand:'hinten', x:0, z:-12.8, steh:[0,-11.15], treffer:[2.9,3.4,.9], baue(g,k){ /* 6 Felsentafel mit eingeritzten Bildern */
      const H=0xcfd0c8, D=0x4a4c52;
      const U=[[-1.25,0],[1.25,0],[1.2,2.45]]; for(let i=1;i<8;i++){ const a=i/8*Math.PI; U.push([Math.cos(a)*1.2,2.45+Math.sin(a)*.75]); } U.push([-1.2,2.45]);
      platte(g,U.map(([a,b])=>[a*1.09,b*1.05]),.45,0x77756e,0,0,-.58); platte(g,U,.28,H,0,.04,-.18);
      const z=.12, L=(a,b)=>strich(g,[a[0],a[1],z],[b[0],b[1],z],.038,D);
      ring(g,.2,.038,D,-.6,2.65,z); for(let i=0;i<8;i++){ const a=i*.785; L([-.6+Math.cos(a)*.28,2.65+Math.sin(a)*.28],[-.6+Math.cos(a)*.42,2.65+Math.sin(a)*.42]); }
      L([.62,2.2],[.62,2.9]); for(let i=0;i<5;i++){ const a=-.35+i*.78; L([.62,2.9],[.62+Math.cos(a)*.38,2.9+Math.sin(a)*.22]); } L([.35,2.2],[.92,2.2]);
      for(let i=0;i<8;i++) L([-.9+i*.225,1.75+(i%2?.1:0)],[-.9+(i+1)*.225,1.75+(i%2?0:.1)]);
      /* zwei Zeilen erfundene Zeichen (keine Buchstaben) */
      const Z=[ [[0,0,1,1],[0,1,.5,.5],[1,0,1,.4]], [[0,.5,.5,1],[.5,1,1,.5],[.5,.55,.5,0]], [[0,0,0,1],[0,.7,1,.35],[.6,0,1,0]], [[0,1,1,1],[.5,1,.15,0],[.5,.5,1,.15]], [[0,.2,.4,.8],[.4,.8,.7,.2],[.7,.2,1,.8]], [[.1,0,.9,.2],[.5,.1,.5,.8],[.2,1,.8,.75]] ];
      [[1.3,0],[.22,3]].forEach(([y,v])=>{ for(let i=0;i<7;i++) Z[(i*5+v)%6].forEach(([a,b,c,d])=>strich(g,[-.82+i*.25+a*.15,y+b*.19,z],[-.82+i*.25+c*.15,y+d*.19,z],.022,D)); });
      L([-.8,.8],[-.5,1.02]); L([-.5,1.02],[-.15,.8]); L([-.15,.8],[-.5,.58]); L([-.5,.58],[-.8,.8]); L([-.8,.8],[-1,.98]); L([-1,.98],[-1,.62]); L([-1,.62],[-.8,.8]); ball(g,.045,D,-.3,.84,z);
      L([.2,.65],[.95,.65]); L([.2,.65],[.35,.48]); L([.35,.48],[.8,.48]); L([.8,.48],[.95,.65]); L([.57,.65],[.57,1.2]); L([.57,1.2],[.9,.78]); L([.9,.78],[.57,.78]);
      /* Ritze */
      [[[1.17,1.75],[.85,1.5]],[[.85,1.5],[.98,1.3]],[[.98,1.3],[.62,1.12+.28]]].forEach(([a,b])=>strich(g,[a[0],a[1],.11],[b[0],b[1],.11],.025,0x2e2e32));
      [[-1.25,.2,.42],[1.3,.16,.36],[-.65,.08,.22]].forEach(([x,y,r])=>ball(g,r,0x8a867c,x,y,.02,1.2,.85,.8));
      [[-1.05,2.75,.2],[-1.18,2.45,.14],[1.12,.55,.17]].forEach(([x,y,r])=>ball(g,r,0x5a9a48,x,y,.06,1.2,.9,.5));
      k.kasten(0,-13,2.8,.6); } },
  { x:14, z:-6, dreh:-.28, steh:[13.4,-4.05], kasten:[2.8,2.15], treffer:[2.7,2.2,2], baue(g){ /* 7 Wrackkiste: alt, zerbrochen, halb im Sand */
      const H=0x8a6238, D=0x553618, N=0xa87c48;
      const q=gruppe(g,0,.02,0); q.rotation.z=.13;
      box(q,2,.18,1.35,D,0,.12,0); box(q,1.9,1,.1,0x2a1a0c,0,.65,-.55); [-1,1].forEach(s=>box(q,.1,.95,1.05,0x2a1a0c,s*.93,.62,0));
      [.3,.63,.96].forEach((y,i)=>{ box(q,2.05,.29,.12,i%2?H:N,0,y,-.65); [-1,1].forEach(s=>box(q,.12,.29,1.3,i%2?N:H,s*1.01,y,0)); });
      box(q,2.05,.29,.12,H,0,.3,.65); box(q,.78,.29,.12,N,-.63,.63,.66); box(q,.52,.29,.12,N,.76,.63,.66); box(q,.42,.27,.12,H,-.82,.96,.66); box(q,.32,.27,.12,H,.86,.96,.66);
      [[-.22,.66,1],[.48,.62,-1],[-.58,.96,1],[.68,.97,-1]].forEach(([x,y,s])=>{ const z=kegel(q,.15,.34,N,x+s*.06,y,.66); z.rotation.z=-s*Math.PI/2; z.scale.z=.05; });
      [-1,1].forEach(a=>[-1,1].forEach(b=>{ box(q,.2,1.2,.2,D,a*.98,.65,b*.62); [.2,1.08].forEach(y=>box(q,.25,.15,.25,0x7a4a2a,a*.98,y,b*.62)); }));
      const br=box(q,1.75,.1,.42,N,-.18,1.3,-.35); br.rotation.set(.1,.18,.12);
      const br2=box(q,.34,1.25,.1,H,.55,1.18,-.42); br2.rotation.z=-.5; const br3=box(q,.2,.8,.09,N,-.62,1.28,-.5); br3.rotation.z=.35;
      const br4=box(q,.3,1.1,.1,N,.1,.42,.92); br4.rotation.set(-.55,0,1.25);
      [[-.7,.35,.718,.09],[-.5,.22,.718,.06],[.85,.42,.718,.08],[.64,.24,.718,.05],[.72,.34,.719,.04]].forEach(([x,y,z,r])=>ball(q,r,0xcdb88c,x,y,z,1.3,.9,.12));
      [-.9,-.72,.98].forEach((x,i)=>{ strich(q,[x,1.12,.74],[x+.08,.75,.75],.04,0x2f7a44); strich(q,[x+.08,.75,.75],[x-.03,.4-i*.06,.76],.035,0x3f9a52); });
      ball(g,.8,SANDD,-.55,0,.38,1.25,.28,.75); ball(g,.65,0xe0bc74,.75,0,-.35,1.15,.26,.85); } },
  { x:-3.5, z:-3, steh:[-3.5,-1.3], kasten:[2.2,1.7], treffer:[2.2,1.75,1.6], baue(g){ /* 8 Tagebuch: dick und aufgeschlagen, schräg auf einem flachen Sandhügel */
      ball(g,1.15,SANDD,0,0,0,.98,.34,.76); ball(g,.72,0xdcbc78,0,0,-.28,1.2,.98,.7);
      const p=gruppe(g,0,.66,.02); p.rotation.set(.48,0,.04);
      box(p,2,.13,1.35,0x8a2418,0,0,0); box(p,.14,.16,1.38,0x5a140c,0,.005,0);
      [-1,1].forEach(s=>{ const b=gruppe(p,s*.47,.17,0); b.rotation.z=s*.09;
        box(b,.9,.17,1.22,0xe8d8b0,0,0,0); box(b,.88,.03,1.18,0xfff8e4,0,.095,0); [-.04,.03].forEach(y=>box(b,.91,.012,1.23,0xb8a478,0,y,0));
        [[-1,-1],[-1,1],[1,-1],[1,1]].forEach(([a,c])=>{ if(a===s) box(p,.2,.05,.2,GOLD,s*.93,.065,c*.6); });
        if(s<0) for(let i=0;i<7;i++) box(b,i%3===2?.4:.66,.012,.045,0x4a3220,i%3===2?-.13:0,.117,-.45+i*.145);
        else { for(let i=0;i<3;i++) box(b,i===2?.4:.64,.012,.045,0x4a3220,0,.117,-.45+i*.14);
          ball(b,.24,0x6ab04a,0,.115,.26,1.25,.06,.85); ball(b,.07,0xd83a2a,.1,.135,.22,1,.2,1); strich(b,[-.2,.14,.4],[-.05,.14,.25],.018,0xd83a2a); } });
      box(p,.07,.02,1.1,0xe8b820,.04,.28,.05); box(p,.1,.02,.34,0xe8b820,.07,.12,.77).rotation.x=.45;
      strich(g,[.92,.18,.55],[1.1,1.15,.2],.022,0x8a5a2a); const fe=ball(g,.13,0xe03a2a,1.08,1.07,.23,.55,2.4,.22); fe.rotation.z=-.17; walze(g,.14,.22,0x2a3a7a,.92,.11,.55); } },
  { x:4.5, z:-5.5, steh:[4.5,-3.45], kasten:[2.9,2.8], treffer:[2.9,2.35,2.7], baue(g){ /* 9 Sandburg */
      const S=0xe8bc62, S2=0xd29c48, DU=0x6a4418;
      const rand=(i,d)=>{ const a=i/22*6.283, r=1.25+Math.sin(i*2.3)*.07+Math.sin(i*5.1)*.04+d; return [Math.cos(a)*r,.015,Math.sin(a)*r]; };
      for(let i=0;i<22;i++){ strich(g,rand(i,0),rand(i+1,0),.045+(i%3)*.008,0x3a98bc); const q=rand(i+.5,.13); ball(g,.11+(i%4)*.02,i%2?S2:S,q[0],0,q[2],1,.65,1); }
      walze(g,1.18,.16,S2,0,.08,0);
      box(g,1.5,.75,1.4,S,0,.52,0);
      for(let i=0;i<5;i++){ const v=-.62+i*.31; [-1,1].forEach(s=>{ box(g,.17,.18,.15,S,v,.98,s*.63); if(i&&i<4) box(g,.15,.18,.17,S,s*.68,.98,v); }); }
      [-1,1].forEach(a=>[-1,1].forEach(b=>{ const x=a*.76, z=b*.7; rohr(g,.28,.34,1.15,S,x,.72,z,14); walze(g,.34,.12,S2,x,1.32,z); kegel(g,.34,.46,S2,x,1.61,z); box(g,.09,.2,.04,DU,x,.95,z+.3); }));
      rohr(g,.36,.44,.95,S,0,1.3,-.1,14); walze(g,.44,.12,S2,0,1.8,-.1); for(let i=0;i<8;i++){ const a=i*.785; box(g,.14,.15,.14,S,Math.cos(a)*.36,1.92,-.1+Math.sin(a)*.36); }
      [-.13,.13].forEach(x=>box(g,.1,.2,.05,DU,x,1.45,.29));
      box(g,.44,.38,.06,DU,0,.34,.71); walze(g,.22,.06,DU,0,.53,.71).rotation.x=Math.PI/2; box(g,.46,.07,.5,HOLZ,0,.17,1.0);
      strich(g,[0,1.85,-.1],[0,2.5,-.1],.025,HOLZ2); platte(g,[[0,0],[.5,-.14],[0,-.3]],.025,0x2a6ad8,.02,2.48,-.11);
      [[-.5,.52],[.5,.52],[-.34,.76],[.34,.76]].forEach(([x,y],i)=>ball(g,.06,i<2?0xd83a2a:0x2a8a5a,x,y,.72,1,1,.6)); } },
  { x:14.5, z:5.6, steh:[11.9,5.6], kasten:[3.8,3.1], treffer:[3.7,2.9,3], baue(g){ /* 10 Floß am Strand */
      const Q=Math.PI/2;
      for(let i=0;i<7;i++){ const z=-1.26+i*.42, l=3.4+((i*3)%4)*.12, x=((i*5)%3-1)*.07;
        walze(g,.215,l,i%2?0xb07a40:0x946030,x,.3,z).rotation.z=Q;
        [-1,1].forEach(s=>{ walze(g,.17,.03,0xe8c488,x+s*(l/2+.008),.3,z).rotation.z=Q; ring(g,.08,.014,0xa87a44,x+s*(l/2+.028),.3,z).rotation.y=Q; }); }
      [-1.2,1.2].forEach(x=>{ walze(g,.13,2.98,HOLZ2,x,.58,0).rotation.x=Q;
        for(let i=0;i<7;i++){ const z=-1.26+i*.42; [-.07,.07].forEach(d=>{ const r=ring(g,.17,.03,0xf0dca8,x,.55,z+d); r.rotation.y=.45*(d>0?1:-1); }); } });
      /* Mast mit kleinem gestreiftem Segel */
      walze(g,.11,2.4,HOLZ2,.1,1.7,-.65); ball(g,.15,MESSING,.1,2.95,-.65); box(g,.5,.2,.5,HOLZ,.1,.62,-.65);
      [2.62,1.35].forEach(y=>walze(g,.055,1.85,HOLZ,.1,y,-.53).rotation.z=Q);
      for(let i=0;i<5;i++){ const w=1.68, h=1.24/5; box(g,w-Math.abs(i-2)*.04,h,.05,i%2?WEISS:0xe0483a,.1,1.36+h*(i+.5),-.5+Math.sin((i+.5)/5*Math.PI)*.1); }
      [-1,1].forEach(s=>strich(g,[.1,2.85,-.65],[s*1.55,.52,.15],.02,SEIL));
      strich(g,[-1.45,.62,.85],[.85,.62,.55],.05,0xd8a860); ball(g,.27,0xd8a860,1.05,.62,.52,1.6,.18,.8);
      [0,.075,.15].forEach((y,i)=>{ const r=ring(g,.33-i*.06,.045,SEIL,.85,.54+y,.95); r.rotation.x=Q; }); } }
];

return { titel:'Die Schatzinsel', himmel:0xa6def6, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Schlussbild Piratenschiff: Schatzinsel am Tag. Der große Stein rollt vor der Höhle zur Seite, goldenes Licht strahlt heraus,
   die Schatztruhe geht auf, die Figur läuft hin und jubelt, der Papagei landet auf der Truhe, Konfetti.
   Am Strand liegt das kleine Ruderboot, daneben winkt Kapitänin Rotbart. */
FINALE3D.piratenschiff = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  sc.background=new THREE.Color(0x8fd4f8); sc.fog=new THREE.Fog(0xbfe6f8,55,140);
  sc.add(new THREE.HemisphereLight(0xffffff,0x8a7048,.54));
  const sonne=new THREE.DirectionalLight(0xfff0c8,.5); sonne.position.set(12,24,18); sonne.castShadow=true; sonne.shadow.mapSize.set(1024,1024);
  const c=sonne.shadow.camera; c.left=-18; c.right=18; c.top=18; c.bottom=-14; c.near=1; c.far=70; sonne.shadow.bias=-.001; sc.add(sonne);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const leuchtend=(f,e)=>mat(f,{emissive:e});

  /* ---------- Meer und Insel (Oberkante des Sands bei y=0) ---------- */
  SCHIFF.meer(k,-.5);
  const scheibe=(rx,rz,h,farbe,y,z)=>{ const m=rohr(sc,1,1.04,h,farbe,0,y,z,56); m.scale.set(rx,1,rz); m.castShadow=false; return m; };
  scheibe(18.4,15.2,.04,0x58c8cc,-.5,1);
  const schaum=scheibe(15.6,12.7,.04,basis(0xeafaff),-.45,1);
  scheibe(15,12.2,.8,0xc4a064,-.4,1);
  /* feuchter, dunklerer Sand vor der Truhe: darauf heben sich die Münzen ab */
  const feucht=rohr(sc,1,1,.012,0x8f6c3c,0,.006,-2.5,40); feucht.scale.set(3.4,1,1.9); feucht.castShadow=false;

  /* ---------- Felswand mit Höhle (Öffnung x von -2,4 bis 2,4; vorne endet der Fels hinter z=-3,4) ---------- */
  const brocken=new THREE.DodecahedronGeometry(1,0), fels=gruppe(sc,0,0,0), FELS=[0x8a7a68,0x9c8a74,0x75685a,0xab9a82];
  const stein=(x,y,z,sx,sy,sz,f,dreh)=>{ const m=teil(fels,brocken,mat(FELS[f]),x,y,z,sx,sy,sz); m.rotation.set(0,dreh||0,((f%2)-.5)*.14); return m; };
  /* Pfosten links und rechts der Öffnung */
  [-1,1].forEach(s=>{
    stein(s*3.95,1.2,-5.2,1.55,1.9,1.5,s<0?0:1);
    stein(s*3.9,3.5,-5.3,1.5,1.7,1.45,s<0?1:0,.5);
    stein(s*3.8,1.4,-7,1.5,2.2,1.5,2,.9);
    stein(s*3.7,4.1,-7.1,1.5,2,1.5,2,.2);
    stein(s*6.1,1.5,-5.7,2,2.7,1.8,s<0?3:2,.8);
    stein(s*5.7,4.8,-6.4,2,2.4,1.9,s<0?0:3,.3);
    stein(s*8.4,1,-6.4,2,2.2,2,s<0?1:0,.4);
    stein(s*7.9,s<0?1.8:3.2,-7.6,1.9,s<0?1.8:2.4,2,2,1.1);   /* links niedriger: Blick aufs Schiff */
    stein(s*10,.3,-5.4,1.5,1.3,1.5,3,.7);
    stein(s*3.6,6.2,-6,1.9,1.7,1.8,s<0?2:1,.6);
  });
  /* Bogen über dem Eingang und Gipfel */
  stein(-1.5,5.85,-5.2,1.9,1.35,1.6,3,.2); stein(1.4,5.95,-5.35,1.9,1.4,1.6,1,.7); stein(0,5.7,-6.8,2.8,1.4,1.7,0,.1);
  stein(0,7.3,-6.8,2.6,1.6,2,2,.4); stein(-3.4,7.7,-8,2.2,1.8,2,0,.9); stein(3.1,7.4,-8,2.2,1.7,2,3,.5);
  /* Rückseite hinter der Höhle */
  [-4.4,-1.5,1.5,4.4].forEach((x,i)=>{ stein(x,1.6,-9.7,2.1,2.8,1.8,i%2?2:0,i*.7); stein(x*.9,4.9,-9.7,2.1,2.6,1.8,i%2?0:2,i*.4); });
  /* kleine Steine am Fuß */
  [[-10.6,-2.6,.7],[-8.8,-3.7,.55],[9.9,-3.9,.6],[11.3,-4.4,.8],[-12.2,2.2,.45],[12.4,2.4,.4],[-7.9,9.2,.35],[8.8,8.6,.5],[3.8,9.8,.25]].forEach((p,i)=>stein(p[0],p[2]*.4,p[1],p[2],p[2]*.75,p[2],i%4,i));
  verschmelze(fels);
  /* Grün oben auf dem Fels, Ranken über dem Eingang */
  const gruen=gruppe(sc,0,0,0), BLATT=[0x3f8a34,0x57a83e,0x2f7430];
  [[-8.4,3.5,-6.9,1.2],[-5.8,7.1,-6.2,1.3],[-3.4,9.2,-7.7,1.5],[-.8,8.8,-6.6,1.1],[1.4,8.7,-7,1.3],[3.6,8.9,-7.7,1.4],[5.7,7.1,-6.4,1.4],[8,5.4,-7.2,1.5],[-2.6,7.7,-5.4,.8],[2.8,7.6,-5.4,.75]].forEach((p,i)=>{
    ball(gruen,p[3],BLATT[i%3],p[0],p[1],p[2],1.25,.62,1); ball(gruen,p[3]*.65,BLATT[(i+1)%3],p[0]+p[3]*.7,p[1]-.1,p[2]+.3,1.1,.7,1); });
  [[-3.1,6.3,-3.9,2.4],[-2.2,6.1,-3.75,1.1],[2.4,6.2,-3.75,1.3],[3.2,6.4,-3.9,2.7],[-6.3,6,-4.45,2],[6.6,6,-4.45,1.6]].forEach((p,i)=>{
    const n=Math.round(p[3]/.28); for(let j=0;j<n;j++){ const x=p[0]+Math.sin(j*1.7+i)*.12, y=p[1]-j*.28; ball(gruen,.15,BLATT[(i+j)%3],x,y,p[2],1.2,.9,.5); if(j%4===3) ball(gruen,.1,j%8===3?0xf06a9a:0xffd83a,x+.1,y,p[2]+.1); } });
  verschmelze(gruen);

  /* Inneres der Höhle: leuchtet beim Öffnen golden */
  const innenBild=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,170,8,128,160,150); v.addColorStop(0,'#fffbe0'); v.addColorStop(.3,'#ffd65a'); v.addColorStop(.65,'#c9781c'); v.addColorStop(1,'#3a1e0a'); g.fillStyle=v; g.fillRect(0,0,256,256); });
  const innenMat=new THREE.MeshBasicMaterial({map:innenBild,color:0x221408});
  const innen=new THREE.Mesh(new THREE.PlaneGeometry(6.6,5.8),innenMat); innen.position.set(0,2.8,-7.75); sc.add(innen);
  const dunkelHell=new THREE.Color(0x221408), ganzHell=new THREE.Color(0xffffff);
  const strahlMat=new THREE.MeshBasicMaterial({color:0xffe890,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
  const faecher=gruppe(sc,0,1.7,-6.9);
  for(let i=0;i<9;i++){ const g=gruppe(faecher,0,0,i*.012); g.rotation.z=(i-4)*.36; const form=new THREE.Mesh(new THREE.ConeGeometry(.34,3.8,3,1,true),strahlMat); form.rotation.x=Math.PI; form.position.y=1.9; form.scale.z=.05; g.add(form); }
  const glanz=schein(sc,'rgba(255,215,90,.95)',0,2,-6.3,1), glanzBoden=schein(sc,'rgba(255,190,60,.22)',0,.8,-2.9,1);
  const gold=new THREE.PointLight(0xffc848,0,15,1.4); gold.position.set(0,3.2,-3.2); sc.add(gold);

  /* ---------- Der große Rollstein ---------- */
  const rollstein=gruppe(sc,0,2.65,-2.6), R=2.85;
  ball(rollstein,R,0xa6a49c,0,0,0,1,1,.27);
  const vorne=(x,y)=>R*.27*Math.sqrt(Math.max(0,1-(x*x+y*y)/(R*R)));
  [[-1.8,1.2,.6],[-1.35,1.7,.42],[-2.05,.65,.34],[1.5,-1.65,.45],[1.95,-1.15,.28]].forEach((p,i)=>ball(rollstein,p[2],i%2?0x57a83e:0x3f8a34,p[0],p[1],vorne(p[0],p[1])-.02,1.2,.9,.32));
  [[2,.9,.2],[.4,-2.25,.24],[-1.9,-1.2,.17],[.7,2.2,.15]].forEach(p=>ball(rollstein,p[2],0x8e8c84,p[0],p[1],vorne(p[0],p[1]),1,.8,.45));
  verschmelze(rollstein);
  const staubMat=new THREE.MeshBasicMaterial({color:0xf0dcaa,transparent:true,opacity:0,depthWrite:false});
  const staub=[]; for(let i=0;i<9;i++){ const m=new THREE.Mesh(GEO.sph,staubMat); sc.add(m); staub.push(m); }

  /* ---------- Schatztruhe ---------- */
  const TX=0, TZ=-4.75, TDREH=.38;
  const truhe=gruppe(sc,TX,0,TZ), korpus=gruppe(truhe,0,0,0);
  truhe.rotation.y=TDREH;   /* schräg: so sieht man die runde Seite des Deckels */
  const HOLZ=0x8a4620, DUNKEL=0x5a2a12, BAND=leuchtend(0xe6b030,0x4a3000);
  box(korpus,3,1.3,1.7,HOLZ,0,.65,0);
  [.34,.76].forEach(y=>{ box(korpus,3.02,.05,1.72,DUNKEL,0,y,0); });
  [-1.38,-.8,.8,1.38].forEach(x=>box(korpus,.2,1.32,1.76,BAND,x,.66,0));
  box(korpus,3.08,.16,.08,BAND,0,1.22,.87); box(korpus,3.08,.16,.08,BAND,0,.1,.87);
  box(korpus,.52,.56,.1,BAND,0,.88,.9); ball(korpus,.09,0x3a2208,0,.94,.96,1,1,.4); box(korpus,.06,.2,.03,0x3a2208,0,.82,.96);
  verschmelze(korpus);
  const deckel=gruppe(truhe,0,1.32,-.85), dg=gruppe(deckel,0,0,0);
  const setze=(geo,m,x,y,z)=>{ const t=new THREE.Mesh(geo,m); t.position.set(x,y,z); t.castShadow=true; dg.add(t); return t; };
  /* gewölbte Schale: außen Holz, innen roter Samt, beides rund */
  const walzenHalb=(r,b,m,x,offen)=>{ const t=setze(new THREE.CylinderGeometry(r,r,b,24,1,!!offen,0,Math.PI),m,x,0,.85); t.rotation.z=Math.PI/2; };
  const bogen=(r,d,x)=>{ const t=setze(new THREE.TorusGeometry(r,d,8,28,Math.PI),BAND,x,0,.85); t.rotation.y=Math.PI/2; };
  walzenHalb(.85,3,mat(HOLZ),0); [-1.38,-.8,.8,1.38].forEach(x=>walzenHalb(.885,.2,BAND,x,true));
  const SAMT=mat(0x8c1c34,{side:THREE.DoubleSide,emissive:0x240008});
  walzenHalb(.76,2.78,SAMT,0,true);
  [-1.39,1.39].forEach(x=>{ const t=setze(new THREE.CircleGeometry(.76,24,0,Math.PI),SAMT,x,0,.85); t.rotation.y=Math.PI/2; });
  [-1.36,-.7,0,.7,1.36].forEach(x=>bogen(.735,.045,x));   /* goldene Rippen innen: zeigen die Wölbung */
  [-1.5,1.5].forEach(x=>{ bogen(.85,.07,x); bogen(.5,.035,x); ball(dg,.11,BAND,x,.2,.85,.7,1,1); });
  /* Holzrand innen mit Goldleiste und Nägeln */
  const RAND=0xb0692e;
  [.07,1.63].forEach(z=>{ box(dg,3.04,.1,.18,RAND,0,.02,z); });
  [-1.44,1.44].forEach(x=>box(dg,.18,.1,1.4,RAND,x,.02,.85));
  box(dg,3.1,.13,.07,BAND,0,.03,1.74); box(dg,3.1,.13,.07,BAND,0,.03,-.04);
  for(let i=0;i<9;i++){ const x=-1.4+i*.35; ball(dg,.05,BAND,x,-.04,1.63); ball(dg,.05,BAND,x,-.04,.07); }
  [-1.44,1.44].forEach(x=>[.5,.85,1.2].forEach(z=>ball(dg,.05,BAND,x,-.04,z)));
  box(dg,.4,.34,.09,BAND,0,.13,1.78);
  verschmelze(dg);
  /* Goldhaufen, Münzen und Edelsteine */
  const schatz=gruppe(truhe,0,0,0), MUENZE=leuchtend(0xffc414,0x6e4400), PRAEGUNG=leuchtend(0xd87c00,0x4a2600), o=new THREE.Object3D();
  ball(schatz,1,leuchtend(0xb87406,0x3a2000),0,1.28,0,1.35,.42,.7);
  const hoehe=(x,z)=>1.28+.42*Math.sqrt(Math.max(0,1-(x/1.35)*(x/1.35)-(z/.7)*(z/.7)));
  const NM=180, viele=(m,n)=>new THREE.InstancedMesh(GEO.cyl,m,n), muenzen=viele(MUENZE,100), mitte=viele(PRAEGUNG,100), lose=viele(MUENZE,NM-100), losMitte=viele(PRAEGUNG,NM-100), streu=gruppe(truhe,0,0,0);
  for(let i=0;i<NM;i++){ let x,y,z;
    if(i<100){ const a=zufall()*6.283, r=Math.sqrt(zufall()); x=Math.cos(a)*r*1.26; z=Math.sin(a)*r*.62; y=hoehe(x,z)+.03; o.rotation.set((zufall()-.5)*.9,zufall()*6,(zufall()-.5)*.9); }
    else { x=(zufall()-.5)*(i<150?3.6:5); z=1.05+zufall()*zufall()*(i<150?1.1:2.2); y=.045+(i%7)*.006+(i<125?zufall()*.14:0); o.rotation.set((zufall()-.5)*.25,zufall()*6,(zufall()-.5)*.25); }
    const oben=i<100?muenzen:lose, innenTeil=i<100?mitte:losMitte, j=i<100?i:i-100;
    o.position.set(x,y,z); o.scale.set(.18,.055,.18); o.updateMatrix(); oben.setMatrixAt(j,o.matrix);
    o.scale.set(.105,.07,.105); o.updateMatrix(); innenTeil.setMatrixAt(j,o.matrix); }
  [muenzen,mitte,lose,losMitte].forEach(m=>{ m.frustumCulled=false; m.receiveShadow=true; }); schatz.add(muenzen,mitte); streu.add(lose,losMitte);
  const juwel=new THREE.OctahedronGeometry(1,0), BUNT=[0xe5243b,0x2f7fe8,0x14b860,0xb24ae0,0x30d8d0];
  [[-.9,.2,.24],[-.35,.4,.2],[.1,0,.3],[.62,.36,.22],[1,.05,.2],[-.55,-.2,.2],[.5,-.22,.22],[-.05,.52,.15]].forEach((p,i)=>{ const f=BUNT[i%5]; const m=teil(schatz,juwel,leuchtend(f,new THREE.Color(f).multiplyScalar(.4).getHex()),p[0],hoehe(p[0],p[1])+p[2]*.75,p[1],p[2],p[2]*1.2,p[2]); m.rotation.set(.2,i*.9,(i%3-1)*.3); });
  [[-1.5,1.3,.18],[.9,1.55,.16],[1.9,1.15,.14],[-.4,1.9,.13]].forEach((p,i)=>{ const f=BUNT[(i+1)%5]; teil(streu,juwel,leuchtend(f,new THREE.Color(f).multiplyScalar(.4).getHex()),p[0],p[2]*.9,p[1],p[2],p[2],p[2]).rotation.set(.5,i,.3); });
  /* Perlenkette über dem vorderen Rand */
  for(let i=0;i<13;i++){ const u=i/12, x=-1.15+u*.9; ball(schatz,.065,leuchtend(0xfff6e8,0x504838),x,1.4-Math.sin(u*Math.PI)*.45,.8+Math.sin(u*Math.PI)*.14); }
  verschmelze(schatz); verschmelze(streu);
  const funkel=[[-.9,1.95,.3],[.1,2.15,.1],[.7,1.9,.45],[1.15,1.7,.2],[-.4,1.85,.55],[-1.5,.45,1.35],[.9,.4,1.6],[1.9,.35,1.2],[-.4,.35,1.95],[.35,1.75,-.3],[-1.1,1.65,-.2],[0,.5,1.3]].map((p,i)=>({ s:schein(truhe,'rgba(255,255,225,1)',p[0],p[1],p[2],.1), p:i*1.9 }));

  /* ---------- Kleines Ruderboot am Strand ---------- */
  const boot=gruppe(sc,5.9,0,-.9); boot.rotation.y=-.1;
  const oval=(geo,m,y,sx,sy,sz,flach)=>{ const t=new THREE.Mesh(geo,m); t.position.set(0,y,0); t.scale.set(sx,sy,sz); if(flach) t.rotation.x=flach; t.castShadow=true; t.receiveShadow=true; boot.add(t); return t; };
  oval(new THREE.SphereGeometry(1,28,12,0,Math.PI*2,Math.PI/2,Math.PI/2),mat(0x8a3c1c,{side:THREE.DoubleSide}),.86,1.9,.85,.85);
  const reif=new THREE.TorusGeometry(1,.075,8,36);
  oval(reif,mat(0xf4ecd8),.86,1.9,.85,1,Math.PI/2);
  oval(reif,mat(0x2f6fc8),.62,1.86,.84,.8,Math.PI/2);
  walze(boot,1,.05,0xc08a50,0,.34,0).scale.set(1.45,.05,.64);
  [-.75,.55].forEach(x=>box(boot,.34,.09,1.52,0xd09a5a,x,.74,0));
  [-1,1].forEach(v=>{ strich(boot,[-.9,.82,-v*.25],[.75,1.02,v*1.05],.05,0xd8b070); const b=ball(boot,.24,0xd8b070,.98,1.04,v*1.16,1.5,.22,.75); b.rotation.y=-v*.5; });
  ball(boot,.13,SCHIFF.MESSING,1.9,.94,0); ball(boot,.13,SCHIFF.MESSING,-1.9,.94,0);
  verschmelze(boot);

  /* ---------- Kapitänin Rotbart: winkt fröhlich (Blick nach +z) ---------- */
  const kap=gruppe(sc,3.25,0,-1.2); kap.scale.set(1.08,1.08,1.08); kap.rotation.y=-.2;
  const leib=gruppe(kap,0,0,0), HAUT=0xf2c29a, ROTHAAR=0xd8481c, MANTEL=0x1f4f9a, GOLD=0xe8b830;
  [-.15,.15].forEach(x=>{ walze(leib,.1,.5,0x3a3048,x,.4,0); walze(leib,.13,.26,0x4a2a18,x,.17,0); ball(leib,.14,0x4a2a18,x,.08,.07,1,.6,1.5); });
  rohr(leib,.25,.42,.82,MANTEL,0,.98,0);
  rohr(leib,.318,.33,.11,0x5a3418,0,.94,0); box(leib,.15,.13,.05,GOLD,0,.94,.32);
  [1.08,1.2].forEach(y=>[-.09,.09].forEach(x=>ball(leib,.034,GOLD,x,y,y>1.1?.285:.305)));
  ball(leib,.16,0xffffff,0,1.34,.14,1,.8,.7);
  ball(leib,.31,HAUT,0,1.68,0);
  [-.11,.11].forEach(x=>{ ball(leib,.042,0x20140e,x,1.71,.29); ball(leib,.06,0xf08878,x*1.7,1.6,.25,1,.7,.4); });
  const lachen=ring(leib,.095,.018,0x9a2a28,0,1.6,.292,Math.PI); lachen.rotation.z=Math.PI;
  ball(leib,.33,ROTHAAR,0,1.68,-.1,1.08,1.05,.85);
  [-1,1].forEach(v=>{ for(let i=0;i<5;i++) ball(leib,.15-i*.012,ROTHAAR,v*(.3+Math.sin(i*1.9)*.05),1.72-i*.14,-.03-i*.012); });
  [-.13,.03,.17].forEach((x,i)=>ball(leib,.1,ROTHAAR,x,1.93-i*.012,.2,1.3,.6,.8));
  walze(leib,.55,.07,0x26264a,0,1.99,0).scale.set(.57,.07,.46); ball(leib,.32,0x26264a,0,2.07,-.02,1.1,.85,.95);
  walze(leib,.33,.09,GOLD,0,2.06,-.02).scale.set(.355,.08,.31); ball(leib,.07,GOLD,0,2.13,.28,1,1,.5);
  strich(leib,[.24,2.12,.1],[.56,2.5,-.05],.035,0xffc21a); ball(leib,.12,0xe03a2a,.46,2.39,0,.7,1.7,.4).rotation.z=-.7;
  verschmelze(leib);
  const kapArme=[-1,1].map(v=>{ const a=gruppe(kap,v*.31,1.3,0); walze(a,.095,.58,MANTEL,0,-.29,0); walze(a,.115,.1,GOLD,0,-.55,0); ball(a,.115,HAUT,0,-.68,0); a.rotation.z=v*.25; verschmelze(a); return a; });

  /* ---------- Palmen ---------- */
  const kronen=[];
  function palme(x,z,h,nx,nz,gr){
    const stamm=gruppe(sc,x,0,z); let alt=[0,0,0];
    for(let i=1;i<=7;i++){ const u=i/7, p=[nx*u*u,h*u,nz*u*u]; strich(stamm,alt,p,.34-u*.15,i%2?0x9a6a38:0x83582c); ball(stamm,.36-u*.15,0x6b421e,p[0],p[1],p[2],1,.35,1); alt=p; }
    ball(stamm,.5,0x7a5a30,0,.05,0,1,.4,1); verschmelze(stamm);
    const krone=gruppe(sc,x+nx,h,z+nz);
    for(let i=0;i<8;i++){ const a=gruppe(krone,0,0,0); a.rotation.y=i/8*6.283+x; const f=i%2?0x3f9a34:0x55b040, L=gr*(i%2?1:.85);
      const stueck=(x0,y0,x1,y1,b)=>{ const g=gruppe(a,(x0+x1)/2,(y0+y1)/2,0); g.rotation.z=Math.atan2(y1-y0,x1-x0); ball(g,1,f,0,0,0,Math.hypot(x1-x0,y1-y0)*.62,.07,b); };
      stueck(.1,.05,1.1*L,.55*L,.34*gr); stueck(1*L,.55*L,2.1*L,.35*L,.46*gr); stueck(2*L,.38*L,2.9*L,-.45*L,.3*gr);
      strich(a,[0,0,0],[1.1*L,.6*L,0],.045,0x2f7430); strich(a,[1.1*L,.6*L,0],[2.1*L,.42*L,0],.035,0x2f7430); }
    [[.3,-.2,.15],[-.2,-.28,.28],[-.15,-.2,-.3]].forEach(p=>ball(krone,.26,0x6b421e,p[0],p[1],p[2]));
    verschmelze(krone); kronen.push({ g:krone, p:x+z });
  }
  palme(-10.4,-.6,6.6,1.3,.3,1.1); palme(-12,-5.2,5,-1.4,0,.95); palme(10.8,-.8,6.2,-.9,.4,1.1); palme(12.3,5.2,4.6,1.2,0,.85); palme(-12.4,6.4,3.9,-.9,.3,.75);

  /* ---------- Büsche, Blumen, Gras, Muscheln, Seesterne ---------- */
  const deko=gruppe(sc,0,0,0);
  [[-9.4,-2.4],[-11.2,-2],[10.4,-.2],[12.2,-2.2],[-12.8,4.2],[12.9,.6],[-10.2,8],[10.4,8.6],[11.8,-5.6],[-9.6,-6.6]].forEach((p,i)=>{
    ball(deko,.75,BLATT[i%3],p[0],.35,p[1],1.2,.8,1); ball(deko,.5,BLATT[(i+1)%3],p[0]+.7,.25,p[1]+.3); ball(deko,.45,BLATT[(i+2)%3],p[0]-.65,.22,p[1]+.2);
    for(let j=0;j<4;j++) ball(deko,.13,[0xf06a9a,0xffd83a,0xe04a3a,0xffffff][(i+j)%4],p[0]+Math.sin(j*2.1+i)*.55,.8-j*.12,p[1]+.55+j*.08); });
  for(let i=0;i<46;i++){ const s=i%2?-1:1, x=s*(6.6+zufall()*6), z=-1+zufall()*9.5; for(let j=-1;j<=1;j++){ const h=kegel(deko,.06,.45+zufall()*.2,i%3?0x6aa83a:0x4f9030,x+j*.12,.22,z); h.rotation.z=-j*.35; h.castShadow=false; } }
  [[-2.8,6.4],[2.2,5.2],[5.8,1.6],[-8.6,5.4],[1.1,10.4],[-1.4,3.6],[7.6,5.8],[-5.2,10.2]].forEach((p,i)=>{
    if(i%2){ for(let j=0;j<5;j++){ const a=j/5*6.283+i, g=gruppe(deko,p[0],.05,p[1]); g.rotation.y=a; ball(g,.22,0xf08030,.17,0,0,1.2,.22,.35); } ball(deko,.1,0xffa850,p[0],.08,p[1],1,.6,1); }
    else { ball(deko,.17,i%4?0xf6b8b0:0xfff0e0,p[0],.06,p[1],1.2,.45,1); ball(deko,.07,0xe89890,p[0],.08,p[1]-.16,1,.5,1); } });
  verschmelze(deko);

  /* ---------- Schiff mit Papageienflagge in der Ferne ---------- */
  const schiff=gruppe(sc,-18,-.5,-20), rumpf=gruppe(schiff,0,0,0);
  box(rumpf,6.4,1.5,2.4,0x7a4420,0,.75,0); box(rumpf,6.7,.22,2.6,0xd8a73a,0,1.5,0); box(rumpf,6.5,.18,2.46,0x4a2410,0,.6,0);
  [-1,1].forEach(s=>{ const m=kegel(rumpf,1,2.1,0x7a4420,s*4.2,.78,0); m.rotation.z=-s*Math.PI/2; m.scale.set(.75,2.1,1.2); });
  box(rumpf,1.9,1.2,2.3,0x9a5a2a,-2.4,2.15,0); box(rumpf,2.1,.18,2.5,0xd8a73a,-2.4,2.82,0);
  [-3,-2.4,-1.8].forEach(x=>box(rumpf,.32,.4,.06,0xffe080,x,2.15,1.18));
  [-2,-.7,.6,1.9].forEach(x=>ball(rumpf,.22,0xbfe4f8,x,1.02,1.22,1,1,.25));
  strich(rumpf,[3.6,1.4,0],[5.8,2.6,0],.1,0x5a3418);
  walze(rumpf,.13,7,0x5a3418,.1,4.9,0); walze(rumpf,.11,4.8,0x5a3418,2.5,3.7,0);
  verschmelze(rumpf);
  const segelMat=new THREE.MeshLambertMaterial({color:0xfaf2dc,emissive:0x38342a,side:THREE.DoubleSide});
  const segel=(x,y,b,h)=>{ const geo=new THREE.PlaneGeometry(b,h,8,6), p=geo.attributes.position; for(let i=0;i<p.count;i++){ const u=p.getX(i)/b*2, v=p.getY(i)/h*2; p.setZ(i,(1-u*u*.7)*(1-v*v*.8)*.6); } geo.computeVertexNormals(); const m=new THREE.Mesh(geo,segelMat); m.position.set(x,y,.16); schiff.add(m); box(schiff,b+.3,.14,.14,0x5a3418,x,y+h/2+.04,.12); };
  segel(.1,3.5,3.2,2.2); segel(.1,6.2,2.5,1.8); segel(2.8,3.6,1.8,2.3);
  const flagBild=bild(256,160,(g)=>{ g.fillStyle='#1f5fb8'; g.fillRect(0,0,256,160); g.strokeStyle='#ffd040'; g.lineWidth=10; g.strokeRect(5,5,246,150);
    const e=(f,x,y,rx,ry,w)=>{ g.fillStyle=f; g.beginPath(); g.ellipse(x,y,rx,ry,w||0,0,6.284); g.fill(); };
    e('#ffc21a',96,122,12,38,.85); e('#e03a2a',128,92,34,48,.35); e('#2fb84a',112,100,17,40,.55); e('#e03a2a',152,52,30,28); e('#ffffff',160,46,12,12); e('#101008',163,46,5,5);
    g.fillStyle='#ffe8a0'; g.beginPath(); g.moveTo(176,36); g.quadraticCurveTo(214,44,194,76); g.quadraticCurveTo(190,60,174,60); g.fill();
    g.strokeStyle='#6b421e'; g.lineWidth=9; g.beginPath(); g.moveTo(70,138); g.lineTo(200,138); g.stroke(); });
  const flagge=new THREE.Mesh(new THREE.PlaneGeometry(2.8,1.75,12,1),new THREE.MeshBasicMaterial({map:flagBild,side:THREE.DoubleSide})); flagge.position.set(1.62,9.1,.05); schiff.add(flagge);
  walze(schiff,.07,2,0x5a3418,.1,9.1,0); ball(schiff,.16,0xd8a73a,.1,10.15,0);
  schiff.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });

  /* kleine Nachbarinsel rechts am Horizont */
  const fern=gruppe(sc,23,-.5,-22);
  ball(fern,1,SCHIFF.SAND,0,0,0,5,.8,3); ball(fern,1.6,0x4f9a3a,-1.2,.8,0,1.4,.8,1); ball(fern,1.1,0x3f8a34,1.2,.7,.4);
  strich(fern,[1.8,.4,0],[2.6,4.2,0],.18,0x83582c); for(let i=0;i<7;i++){ const a=i/7*6.283; ball(fern,.25,i%2?0x3f9a34:0x55b040,2.6+Math.cos(a),4.2-.15,Math.sin(a)*.8,Math.abs(Math.cos(a))*3+1.4,.6,Math.abs(Math.sin(a))*2.4+1.1); }
  verschmelze(fern); fern.traverse(m=>{ if(m.isMesh) m.castShadow=false; });

  /* ---------- Sonne, Wolken, Möwen, Krabben, Schmetterlinge ---------- */
  schein(sc,'rgba(255,240,170,.95)',18,17,-26,13);
  const wolken=[[-14,15,-24],[6,17,-28],[22,12,-18]].map(p=>{ const g=gruppe(sc,p[0],p[1],p[2]); for(let i=0;i<5;i++) ball(g,1+zufall(),basis(0xffffff),(i-2)*1.3,zufall()*.6,0,1.2,.7,1); verschmelze(g); g.traverse(m=>{ if(m.isMesh) m.castShadow=false; }); return g; });
  SCHIFF.moewe(k,-14,-12,5,8.6,.5,0); SCHIFF.moewe(k,13,-9,6,10,-.42,2); SCHIFF.moewe(k,-1,-8,7,11.4,.34,4);
  SCHIFF.krabbe(k,[[4.6,3.4],[7.6,2.8],[8.2,5],[5.2,5.8]],.8,0);
  SCHIFF.krabbe(k,[[-10.2,2],[-8.3,1.4],[-8.1,3.4],[-9.8,3.8]],.65,3);
  const falter=[[-8.4,1.8,-1.6,0xffd83a],[8.6,2.2,.2,0xf06a9a]].map((p,i)=>{ const g=gruppe(sc,p[0],p[1],p[2]); ball(g,.05,0x30221a,0,0,0,2.4,1,1); const f=[-1,1].map(s=>{ const a=gruppe(g,0,0,0); ball(a,.18,p[3],0,0,s*.17,1,.12,1); return a; }); return { g,f,p,i }; });

  /* ---------- Papagei: kreist, fliegt in die Höhle und landet auf der Ecke der Truhe ---------- */
  const vogel=SCHIFF.papagei(sc,5,5.4,1); vogel.g.scale.set(1.25,1.25,1.25);
  const kreis=t=>[Math.cos(2.9-t*1.55)*4.8,5.3+Math.sin(t*3)*.25,1+Math.sin(2.9-t*1.55)*2.4];
  const bahn=[kreis(3),[1.8,4.4,.2],[.1,3.7,-3],[-.7,3.5,-5.2],[1,3.9,-4.9],[2.5,3.3,-3],[TX+1.38*Math.cos(TDREH)+.7*Math.sin(TDREH),1.34,TZ-1.38*Math.sin(TDREH)+.7*Math.cos(TDREH)]];
  const ort=t=>{ if(t<3) return kreis(t); const u=Math.min(1,(t-3)/4.4)*(bahn.length-1), i=Math.min(bahn.length-2,Math.floor(u)), f=u-i;
    const P=j=>bahn[Math.max(0,Math.min(bahn.length-1,j))], a=P(i-1), b=P(i), d=P(i+1), e=P(i+2);
    return [0,1,2].map(n=>.5*(2*b[n]+(d[n]-a[n])*f+(2*a[n]-5*b[n]+4*d[n]-e[n])*f*f+(3*b[n]-a[n]-3*d[n]+e[n])*f*f*f)); };

  /* ---------- Konfetti ---------- */
  const N=220, konf=new THREE.InstancedMesh(GEO.box,basis(0xffffff),N), teile=[];
  const farben=[0xe5243b,0x2f7fe8,0x14b860,0xffc21a,0xb24ae0,0xffffff];
  for(let i=0;i<N;i++){ teile.push({ x:(zufall()-.5)*18, y:zufall()*11, z:-3.4+zufall()*5.6, v:1+zufall()*1.4, p:zufall()*6 }); konf.setColorAt(i,new THREE.Color(farben[i%6])); }
  konf.frustumCulled=false; konf.visible=false; sc.add(konf);

  /* ---------- Figur: läuft von vorn links neben die Truhe ---------- */
  const VON=[-6.4,3.4], NACH=[-3.15,-2.3];
  figur.position.set(VON[0],0,VON[1]); figur.scale.set(1.2,1.2,1.2); figur.rotation.y=Math.atan2(NACH[0]-VON[0],NACH[1]-VON[1]); sc.add(figur);
  const u=figur.userData;

  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    /* 0,6 bis 3 s: der Stein rollt nach rechts */
    const roll=weich((t-.6)/2.4), weg=roll*6.1, rollt=t>.6&&t<3;
    rollstein.position.set(weg,2.65+(rollt?Math.abs(Math.sin(t*17))*.05:0),-2.6); rollstein.rotation.z=-weg/R;
    const wolke=rollt?Math.sin((t-.6)/2.4*Math.PI):0;
    staubMat.opacity=wolke*.55; staub.forEach((m,i)=>{ m.visible=wolke>.02; const a=(t*1.3+i*.37)%1; m.position.set(weg-2.4+i*.45-a*.8,.15+a*.9,-1.9+(i%3)*.4); const s=.15+a*.45; m.scale.set(s,s*.8,s); });
    /* goldenes Licht aus der Höhle */
    const licht=weich((t-.9)/2.4), puls=1+Math.sin(t*3.1)*.08;
    innenMat.color.copy(dunkelHell).lerp(ganzHell,licht);
    strahlMat.opacity=licht*(.2+Math.sin(t*2.3)*.05); faecher.rotation.z=Math.sin(t*.6)*.12;
    const g1=.1+licht*6.2*puls; glanz.scale.set(g1,g1*.85,1); glanz.visible=licht>.02;
    const g2=.1+licht*4.5*puls; glanzBoden.scale.set(g2,g2*.4,1); glanzBoden.visible=licht>.02;
    gold.intensity=licht*.65*puls;
    /* 2,8 bis 4,3 s: Deckel öffnet sich, ganz leichtes Nachwippen */
    const auf=weich((t-2.8)/1.5);
    deckel.rotation.x=-1.9*auf+(t>4.3?Math.sin((t-4.3)*9)*.07*Math.max(0,1-(t-4.3)):0);
    streu.visible=auf>.35;
    funkel.forEach(f=>{ f.s.visible=auf>.5; const s=Math.pow(Math.max(0,Math.sin(t*3.4+f.p)),6)*.85+.05; f.s.scale.set(s,s,1); });
    /* ab 3,3 s läuft die Figur zur Truhe, danach Jubel */
    const lauf=Math.min(1,Math.max(0,(t-3.3)/3)), geht=lauf>0&&lauf<1, jubel=lauf>=1;
    figur.position.set(VON[0]+(NACH[0]-VON[0])*lauf,0,VON[1]+(NACH[1]-VON[1])*lauf);
    const blick=Math.atan2(NACH[0]-VON[0],NACH[1]-VON[1]), dreh=weich((t-6.3)/.6);
    figur.rotation.y=blick+(.2-blick)*dreh;
    const s=Math.sin(t*11);
    u.beinL.rotation.x=geht?s*.7:0; u.beinR.rotation.x=geht?-s*.7:0;
    u.armL.rotation.x=geht?-s*.6:0; u.armR.rotation.x=geht?s*.6:0;
    u.armL.rotation.z=jubel?-2.5+Math.sin(t*7)*.25:-.18; u.armR.rotation.z=jubel?2.5-Math.sin(t*7)*.25:.18;
    u.koerper.position.y=jubel?Math.abs(Math.sin(t*5))*.3:(geht?Math.abs(Math.cos(t*11))*.07:0);
    /* Papagei */
    const p=ort(t); vogel.g.position.set(p[0],p[1],p[2]);
    if(t<7.4){ const q=ort(t+.08), dx=q[0]-p[0], dz=q[2]-p[2]; if(Math.abs(dx)+Math.abs(dz)>.001) vogel.g.rotation.y=Math.atan2(-dz,dx);
      const f=Math.sin(t*13); vogel.fl[0].rotation.x=.5+f*.9; vogel.fl[1].rotation.x=-.5-f*.9; vogel.kopf.rotation.y=0; }
    else { vogel.g.rotation.y=-Math.PI/2+.1; const flattert=(t%3.4)<.9, f=flattert?.4+Math.abs(Math.sin(t*14))*.9:0;
      vogel.fl[0].rotation.x=f; vogel.fl[1].rotation.x=-f; vogel.g.position.y=p[1]+(flattert?Math.abs(Math.sin(t*7))*.12:0); vogel.kopf.rotation.y=Math.sin(t*1.9)*.6; vogel.kopf.rotation.x=Math.sin(t*4.3)*.15; }
    /* Kapitänin winkt, ab dem Öffnen besonders kräftig */
    kapArme[1].rotation.z=2.45+Math.sin(t*6.5)*(t>3?.42:.28);
    kapArme[0].rotation.z=-.28-Math.sin(t*2)*.05; kap.position.y=t>5.5?Math.abs(Math.sin(t*3.2))*.08:0;
    /* Konfetti ab 5,5 s */
    konf.visible=t>5.5;
    if(konf.visible){ teile.forEach((c0,i)=>{ c0.y-=c0.v*dt; if(c0.y<0) c0.y+=11; o.position.set(c0.x+Math.sin(t*2+c0.p)*.4,c0.y+.05,c0.z); o.rotation.set(t*3+c0.p,t*2+c0.p,0); o.scale.set(.16,.03,.11); o.updateMatrix(); konf.setMatrixAt(i,o.matrix); }); konf.instanceMatrix.needsUpdate=true; }
    /* Palmen, Brandung, Schiff, Wolken, Schmetterlinge */
    kronen.forEach(c0=>{ c0.g.rotation.z=Math.sin(t*1.2+c0.p)*.05; c0.g.rotation.x=Math.sin(t*.9+c0.p*2)*.035; });
    const welle=1+Math.sin(t*1.5)*.008; schaum.scale.set(15.6*welle,1,12.7*welle);
    schiff.position.set((kamera.aspect>2?-25:-18)+Math.sin(t*.12)*1.2,-.5+Math.sin(t*1.1)*.12,-20); schiff.rotation.z=Math.sin(t*.9)*.03;
    const fp=flagge.geometry.attributes.position; for(let i=0;i<fp.count;i++){ const x=fp.getX(i)+1.4; fp.setZ(i,Math.sin(x*2.6-t*5)*.09*x); } fp.needsUpdate=true;
    wolken.forEach((w,i)=>{ w.position.x+=dt*(.3+i*.1); if(w.position.x>36) w.position.x=-36; });
    falter.forEach(f=>{ f.g.position.set(f.p[0]+Math.sin(t*.7+f.i*3)*1.1,f.p[1]+Math.sin(t*2.1+f.i)*.4,f.p[2]+Math.cos(t*.9+f.i)*.8); f.g.rotation.y=t*.8+f.i; const a=Math.sin(t*15+f.i)*.9; f.f[0].rotation.x=a; f.f[1].rotation.x=-a; });
    /* Kamera: erst die ganze Insel, dann nah an Truhe, Figur, Kapitänin und Boot. Der breite flache Streifen braucht wenig Abstand,
       schmale Bilder gehen so weit zurück, dass seitlich alles hineinpasst. */
    const nah=weich((t-3)/4), a=kamera.aspect||1.5, halb=Math.tan((a<1.1?30:25)*Math.PI/180);
    const ende=Math.min(22,Math.max(7,1.8+(a>2?5:6.3)/(halb*a))), anfang=a>2?15.5:Math.max(ende+9,20);
    const d=anfang+(ende-anfang)*nah, zx=(a>2?.6:1.3)*nah, zy=2.8-1.2*nah, zz=-3.4+.4*nah;
    kamera.position.set(zx+Math.sin(t*.15)*.7*nah, zy+d*.23, zz+d*.97); kamera.lookAt(zx,zy,zz);
  };
};

