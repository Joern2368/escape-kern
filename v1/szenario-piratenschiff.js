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