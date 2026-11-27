document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-buch\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"><path d=\"M-16 -12Q-8 -16 0 -12Q8 -16 16 -12V14Q8 10 0 14Q-8 10 -16 14Z\"/><path d=\"M0 -12V14\"/></g></symbol>\n<symbol id=\"sym-schluessel\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3.5\" stroke-linecap=\"round\"><circle cx=\"-8\" cy=\"0\" r=\"7\"/><path d=\"M-1 0H17M11 0V7M15 0V5\"/></g></symbol>\n<symbol id=\"sym-eule\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"><ellipse cx=\"0\" cy=\"3\" rx=\"11\" ry=\"14\"/><path d=\"M-10 -9L-7 -17L-3 -11M10 -9L7 -17L3 -11M-2 4L0 7L2 4\"/></g><circle cx=\"-5\" cy=\"-3\" r=\"3.5\" fill=\"currentColor\"/><circle cx=\"5\" cy=\"-3\" r=\"3.5\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-tintenfeder\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M-12 16L10 -16Q17 -7 6 1Q0 7 -12 16Z\"/><path d=\"M-12 16L-16 19M-5 8L5 -5\"/></g></symbol>\n<symbol id=\"sym-sanduhr\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M-11 -16H11M-11 16H11M-9 -16Q-9 -4 0 0Q9 -4 9 -16M-9 16Q-9 4 0 0Q9 4 9 16\"/></g><path d=\"M-5 13Q0 7 5 13Z\" fill=\"currentColor\"/></symbol>\n<symbol id=\"sym-stern\" viewBox=\"-20 -20 40 40\"><path d=\"M0 -14L4 -4L14 -4L6 2L9 13L0 6L-9 13L-6 2L-14 -4L-4 -4Z\" fill=\"currentColor\"/></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const R=(x,y,w,h,f,s,k)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${s?` stroke="${s}" stroke-width="${k}"`:''}/>`;
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.32)"/>`;
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1||'#8a5a32'}"/><stop offset="1" stop-color="${b2||'#3f2614'}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l||'#ffd890'}" stop-opacity=".5"/><stop offset="1" stop-color="${l||'#ffd890'}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
function steine(y0,y1,h,w,f){let d='';for(let y=y0,r=0;y<y1;y+=h,r++){d+=`M0 ${y}H1600`;for(let x=(r%2)*w/2;x<1600;x+=w)d+=`M${x} ${y}V${Math.min(y+h,y1)}`;}return`<path d="${d}" stroke="${f}" stroke-width="2" fill="none"/>`;}
function boden(){let d='';for(let x=-1600;x<=3200;x+=120)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return`<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="${d}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>`;}
function paneel(y0,f){let d='';for(let x=40;x<1600;x+=120)d+=`M${x} ${y0+14}V462`;return`${R(0,y0,1600,470-y0,f)}<path d="${d}" stroke="rgba(0,0,0,.25)" stroke-width="3"/><rect x="0" y="${y0}" width="1600" height="10" fill="rgba(0,0,0,.25)"/>`;}
const BF=['#8a2a2a','#2a4a7a','#3f6a3a','#b8862a','#6a3a6a','#a0522d','#2f5f5f'];
function regal(x,y,w,h,holz){let s=`${R(x,y,w,h,holz||'#5a3418','#2a1608',3)}`;for(let yy=y+10;yy+52<=y+h;yy+=62){let xx=x+8,k=Math.round(yy+x)%7;while(xx<x+w-14){const bw=Math.min(9+((k*7)%9),x+w-8-xx),bh=34+((k*5)%15);s+=`${R(xx,yy+50-bh,bw,bh,BF[k%7])}`;xx+=bw+1;k++;}s+=`${R(x,yy+50,w,8,'#2a1608')}`;}return s;}
function blechregal(x,y,w,h){let s=`${R(x,y,w,h,'none','#8a969e',5)}`;for(let yy=y+70;yy<y+h;yy+=70){s+=`${R(x,yy,w,6,'#8a969e')}`;for(let xx=x+10,k=0;xx<x+w-50;xx+=58,k++)s+=`${R(xx,yy-44,48,44,(k%2?'#c9b28a':'#b89c70'),'#6b5a3a',2)}${R(xx+16,yy-30,16,8,'#f4ecd8')}`;}return s;}
function fenster(x,y,nacht){return`<path d="M${x-55} ${y+130}V${y}Q${x-55} ${y-62} ${x} ${y-62}Q${x+55} ${y-62} ${x+55} ${y}V${y+130}Z" fill="${nacht?'#1b2a48':'#bfe0f0'}" stroke="#5a3418" stroke-width="9"/>${nacht?`<circle cx="${x+18}" cy="${y-14}" r="15" fill="#fff1b8"/><use href="#sym-stern" x="${x-36}" y="${y+10}" width="14" height="14" color="#e8c45a"/><use href="#sym-stern" x="${x-10}" y="${y+50}" width="10" height="10" color="#e8c45a"/>`:''}<path d="M${x} ${y-62}V${y+130}M${x-55} ${y+40}H${x+55}" stroke="#5a3418" stroke-width="5"/>`;}
function haengelampe(x,l,f){return`<circle cx="${x}" cy="${l+30}" r="110" fill="url(#licht)"/><path d="M${x} 0V${l}" stroke="#222" stroke-width="3"/><path d="M${x-30} ${l+26}Q${x} ${l-12} ${x+30} ${l+26}Z" fill="${f}" stroke="#222" stroke-width="2"/><ellipse cx="${x}" cy="${l+26}" rx="12" ry="5" fill="#fff3b0"/>`;}
function kerze(x,y){return`${R(x-5,y,10,26,'#f4ecd8')}<g transform="translate(${x} ${y}) scale(.35)"><g class="flamme"><path d="M0 -58Q15 -32 12 -12Q8 -3 0 -3Q-8 -3 -12 -12Q-15 -32 0 -58Z" fill="#ff9a2a"/><path d="M0 -40Q7 -24 6 -12Q4 -6 0 -6Q-4 -6 -6 -12Q-7 -24 0 -40Z" fill="#ffe07a"/></g></g>`;}
const pult=()=>`${schatten(44,4)}<path d="M-8 0V-70M8 0V-70" stroke="#5a3418" stroke-width="8"/><rect x="-34" y="-6" width="68" height="8" rx="3" fill="#5a3418"/><path d="M-46 -70L46 -86L46 -76L-46 -60Z" fill="#7a4a24" stroke="#3a2010" stroke-width="2"/><path d="M-40 -72Q-20 -88 0 -82L0 -76Q-20 -82 -40 -66Z" fill="#f4ecd8" stroke="#8a7a5a"/><path d="M0 -82Q20 -96 40 -86L40 -80Q20 -90 0 -76Z" fill="#f4ecd8" stroke="#8a7a5a"/><path d="M-32 -74L-10 -82M-32 -70L-10 -78M8 -84L32 -88M8 -80L32 -84" stroke="#8a7a5a" stroke-width="1.5"/>`;
const globus=()=>`${schatten(40,4)}<path d="M-26 0H26M0 0V-26" stroke="#5a3418" stroke-width="7" stroke-linecap="round"/><path d="M-44 -70A44 44 0 0 0 30 -40" stroke="#b8862a" stroke-width="5" fill="none"/><circle cx="-6" cy="-72" r="38" fill="#3f8fbf" stroke="#1f4f6a" stroke-width="3"/><path d="M-30 -84Q-20 -96 -6 -90Q2 -80 -10 -74Q-22 -70 -30 -84ZM0 -62Q14 -70 22 -58Q16 -46 4 -50Z" fill="#6aa04a"/><path d="M-44 -72H32M-6 -110V-34" stroke="#1f4f6a" stroke-width="1.5" opacity=".6"/>`;
const wagen=()=>`${schatten(58,4)}<circle cx="-40" cy="-8" r="8" fill="#222"/><circle cx="40" cy="-8" r="8" fill="#222"/>${R(-54,-80,108,66,'#6b4a24','#3a2010',3)}${R(-54,-48,108,5,'#3a2010')}${[-46,-34,-22,-10,2,14,26,38].map((x,k)=>`${R(x,-78+(k%3)*3,10,28-(k%3)*3,BF[k%7])}`).join('')}${[-46,-30,-14,2,18,34].map((x,k)=>`${R(x,-42+(k%2)*4,14,26-(k%2)*4,BF[(k+3)%7])}`).join('')}<path d="M54 -80L66 -100" stroke="#3a2010" stroke-width="5" stroke-linecap="round"/>`;
const sessel=()=>`${schatten(58,4)}<path d="M-44 0V-14M44 0V-14" stroke="#3a2010" stroke-width="6"/><path d="M-40 -110Q-40 -130 0 -130Q40 -130 40 -110V-40H-40Z" fill="#8a2a2a" stroke="#4a1010" stroke-width="3"/><rect x="-52" y="-56" width="104" height="44" rx="10" fill="#9a3434" stroke="#4a1010" stroke-width="3"/><rect x="-58" y="-80" width="20" height="62" rx="9" fill="#8a2a2a" stroke="#4a1010" stroke-width="3"/><rect x="38" y="-80" width="20" height="62" rx="9" fill="#8a2a2a" stroke="#4a1010" stroke-width="3"/><path d="M-20 -110L0 -98L20 -110M0 -98V-60" stroke="#6a1a1a" stroke-width="2" fill="none"/>`;
const uhr=()=>`<rect x="-34" y="-70" width="68" height="150" rx="8" fill="#6b4a24" stroke="#3a2010" stroke-width="3"/><circle cx="0" cy="-36" r="26" fill="#f4ecd8" stroke="#b8862a" stroke-width="4"/><path d="M0 -36V-54M0 -36L12 -30" stroke="#222" stroke-width="3" stroke-linecap="round"/>${R(-20,0,40,70,'#3a2010')}<path d="M0 2V50" stroke="#b8862a" stroke-width="3"/><circle cx="0" cy="54" r="9" fill="#d8a73a"/>`;
const karteischrank=()=>`${schatten(66,4)}${R(-62,-150,124,148,'#7a5a34','#3a2010',3)}${[0,1,2,3,4].map(r=>[0,1,2].map(c=>`${R(-56+c*39,-144+r*28,35,24,'#8a6a3e','#3a2010',1.5)}${R(-46+c*39,-136+r*28,14,5,'#f4ecd8')}<circle cx="${-38+c*39}" cy="${-126+r*28}" r="2.5" fill="#d8a73a"/>`).join('')).join('')}`;
const schreibmaschine=()=>`${schatten(56,4)}<path d="M-44 0V-58M44 0V-58" stroke="#4a3a2a" stroke-width="7"/>${R(-54,-64,108,10,'#6b4a24')}<path d="M-36 -64L-30 -96H30L36 -64Z" fill="#2a2a2a" stroke="#000" stroke-width="2"/>${[0,1,2].map(r=>[...Array(7)].map((_,c)=>`<circle cx="${-24+c*8+r*2}" cy="${-72-r*7}" r="2.6" fill="#ddd"/>`).join('')).join('')}<rect x="-30" y="-108" width="60" height="12" rx="6" fill="#444"/>${R(-20,-132,40,28,'#fff')}<path d="M-14 -124H14M-14 -118H8" stroke="#999" stroke-width="2"/>`;
const aktenkiste=()=>`${schatten(52,4)}<path d="M-40 -46L-36 -60H30L34 -46" fill="#d8c8a0"/><rect x="-26" y="-64" width="20" height="18" fill="#f4ecd8" transform="rotate(-6 -16 -55)"/><rect x="2" y="-66" width="22" height="20" fill="#e8dcc0" transform="rotate(5 13 -56)"/>${R(-48,-48,96,48,'#b8956a','#6b4a24',3)}<rect x="-14" y="-30" width="28" height="12" fill="#f4ecd8" stroke="#6b4a24"/>`;
const leiter=()=>`${schatten(40,4)}<path d="M-30 0L-6 -250M30 0L54 -250" stroke="#7a5a34" stroke-width="9" stroke-linecap="round"/>${[...Array(8)].map((_,k)=>`<path d="M${-28+k*3} ${-24-k*30}H${32+k*3}" stroke="#7a5a34" stroke-width="7"/>`).join('')}`;
const tresor=()=>`<rect x="-62" y="-62" width="124" height="124" rx="6" fill="#6a747a" stroke="#2c3438" stroke-width="5"/>${R(-50,-50,100,100,'#7c868c','#2c3438',2)}<circle cx="0" cy="0" r="24" fill="#3a4246" stroke="#c9ccce" stroke-width="3"/>${[0,1,2,3,4,5,6,7].map(k=>`<path d="M0 -24V-18" stroke="#c9ccce" stroke-width="2" transform="rotate(${k*45})"/>`).join('')}<path d="M30 -10H44V10H30" stroke="#c9ccce" stroke-width="5" fill="none"/>`;
const kompass=()=>`${schatten(46,4)}<path d="M-34 0L-28 -60M34 0L28 -60" stroke="#4a2a14" stroke-width="7"/><ellipse cx="0" cy="-62" rx="46" ry="14" fill="#6b3a1c" stroke="#3a2010" stroke-width="3"/><ellipse cx="0" cy="-70" rx="30" ry="10" fill="#d8a73a" stroke="#8a6420" stroke-width="2"/><ellipse cx="0" cy="-72" rx="24" ry="7" fill="#f4ecd8"/><path d="M-18 -72L0 -75L18 -72L0 -69Z" fill="#a33b22"/><path d="M0 -79V-65" stroke="#222" stroke-width="1.5"/>`;
const fernrohr=()=>`${schatten(46,4)}<path d="M0 -80L-36 0M0 -80L36 0M0 -80V0" stroke="#4a2a14" stroke-width="5"/><g transform="rotate(-24 0 -86)"><rect x="-56" y="-96" width="112" height="20" rx="4" fill="#b8862a" stroke="#6b4a1c" stroke-width="2"/><rect x="40" y="-100" width="26" height="28" rx="4" fill="#8a6420"/>${R(-66,-92,14,12,'#6b4a1c')}</g>`;
const seekiste=()=>`${schatten(70,4)}${R(-62,-62,124,60,'#2f5a5a','#1a3030',3)}<path d="M-62 -62Q0 -94 62 -62Z" fill="#3a6a6a" stroke="#1a3030" stroke-width="3"/><path d="M-40 -2V-74M40 -2V-74M-62 -36H62" stroke="#888" stroke-width="5"/><path d="M-62 -40Q-76 -36 -62 -26M62 -40Q76 -36 62 -26" stroke="#c9a26a" stroke-width="5" fill="none"/><rect x="-10" y="-50" width="20" height="18" fill="#d8a73a" stroke="#6b4a1c"/>`;
const flaschenschiff=()=>`${schatten(56,4)}<path d="M-30 0L-20 -16H20L30 0Z" fill="#6b3a1c"/><path d="M-60 -48Q-60 -78 -20 -78H34L44 -70H56V-38H44L34 -30H-20Q-60 -30 -60 -48Z" fill="#cfe8ef" fill-opacity=".55" stroke="#7aa8b8" stroke-width="3"/><path d="M-40 -42H20L12 -34H-32Z" fill="#8a5a2a"/><path d="M-12 -42V-72M6 -42V-66" stroke="#4a2a14" stroke-width="2"/><path d="M-12 -70L-30 -50H-12ZM6 -64L-6 -48H6Z" fill="#f4ecd8"/>${R(54,-62,10,16,'#8a5a2a')}`;
const wandkarte=()=>`${R(-92,-66,184,132,'#e8d6a8','#6b4a1c',5)}<path d="M-70 -20Q-50 -50 -20 -36Q0 -20 -10 6Q-30 30 -60 14Q-80 0 -70 -20ZM20 -40Q50 -50 70 -30Q76 -6 56 10Q30 20 24 0Q12 -20 20 -40Z" fill="#c9b07a" stroke="#8a6a3a" stroke-width="2"/><path d="M-60 40q10-6 20 0t20 0t20 0t20 0t20 0t20 0" stroke="#3f8fbf" stroke-width="2" fill="none"/><path d="M38 -16L48 -6M48 -16L38 -6" stroke="#a33b22" stroke-width="4" stroke-linecap="round"/><path d="M-30 -10Q0 -30 43 -11" stroke="#a33b22" stroke-width="2" stroke-dasharray="5 4" fill="none"/>`;
const presse=()=>`${schatten(56,4)}${R(-52,-20,104,18,'#6b4a24','#3a2010',3)}<rect x="-46" y="-36" width="92" height="16" fill="#e8dcc0" stroke="#8a7a5a"/>${R(-52,-52,104,16,'#6b4a24','#3a2010',3)}<path d="M-44 -2V-120M44 -2V-120" stroke="#3a2010" stroke-width="10"/>${R(-52,-128,104,14,'#3a2010')}<path d="M0 -52V-140" stroke="#777" stroke-width="7"/><path d="M-34 -146H34" stroke="#777" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="-146" r="7" fill="#555"/>`;
const papierstapel=()=>`${schatten(50,4)}${[0,1,2,3,4,5,6].map(k=>`${R(-42+(k%2)*4,-12-k*12,84,12,(k%3?'#f4ecd8':'#e8dcc0'),'#b8a888',1.5)}`).join('')}<path d="M-40 -96L36 -92" stroke="#a33b22" stroke-width="4"/>`;
const leimtopf=()=>`${schatten(36,4)}<path d="M-26 0L-20 -50M26 0L20 -50M-22 -26H22" stroke="#5a3418" stroke-width="6"/><ellipse cx="0" cy="-52" rx="30" ry="8" fill="#7a4a24"/><path d="M-18 -56L-15 -84H15L18 -56Z" fill="#8a8a8a" stroke="#444" stroke-width="2"/><ellipse cx="0" cy="-84" rx="15" ry="5" fill="#e8dcb0"/><path d="M6 -84L22 -112" stroke="#8a5a2a" stroke-width="5" stroke-linecap="round"/><path d="M4 -86L8 -78" stroke="#ccc" stroke-width="6"/>`;
const tinte=()=>`${schatten(50,4)}<path d="M-40 0V-48M40 0V-48" stroke="#5a3418" stroke-width="7"/>${R(-48,-54,96,10,'#6b4a24')}${[[-30,'#1f2a6a'],[-6,'#7a1a1a'],[18,'#1a5a2a'],[38,'#222']].map(([x,c])=>`<path d="M${x-9} -54V-70Q${x-9} -76 ${x-4} -76H${x+4}Q${x+9} -76 ${x+9} -70V-54Z" fill="${c}" stroke="#000" stroke-width="1.5"/>${R(x-4,-82,8,6,'#6b4a24')}`).join('')}<path d="M-14 -78L-30 -112" stroke="#f4ecd8" stroke-width="3"/>`;
const werkzeugbrett=()=>`${R(-90,-70,180,140,'#c9a26a','#6b4a1c',5)}${[...Array(28)].map((_,k)=>`<circle cx="${-75+(k%7)*25}" cy="${-56+Math.floor(k/7)*35}" r="2" fill="#6b4a1c"/>`).join('')}<path d="M-64 -40L-40 20M-40 -40L-64 20" stroke="#666" stroke-width="5"/><circle cx="-68" cy="26" r="7" fill="none" stroke="#a33b22" stroke-width="4"/><circle cx="-36" cy="26" r="7" fill="none" stroke="#a33b22" stroke-width="4"/><rect x="-14" y="-50" width="12" height="100" fill="#f4ecd8" stroke="#8a7a5a"/><path d="M28 -40V30" stroke="#8a5a2a" stroke-width="7"/>${R(16,-52,24,14,'#666')}<circle cx="66" cy="-20" r="14" fill="#a33b22"/><circle cx="66" cy="-20" r="5" fill="#6b1a1a"/><path d="M60 10L72 50" stroke="#999" stroke-width="3"/>`;
const kugel=()=>`${schatten(40,4)}<path d="M-28 0L-18 -30H18L28 0Z" fill="#3a2a5a" stroke="#1a1030" stroke-width="2"/><path d="M-22 -30Q0 -42 22 -30" fill="#d8a73a"/><circle cx="0" cy="-64" r="34" fill="#8a6ac8" fill-opacity=".75" stroke="#c8b8f0" stroke-width="3"/><circle cx="-10" cy="-76" r="9" fill="#fff" opacity=".6"/><circle cx="6" cy="-58" r="14" fill="#c8b8f0" opacity=".35"/>`;
const sanduhr=()=>`${schatten(40,4)}${R(-40,-12,80,12,'#6b4a24','#3a2010',2)}${R(-40,-150,80,12,'#6b4a24','#3a2010',2)}<path d="M-34 -138V-12M34 -138V-12" stroke="#6b4a24" stroke-width="6"/><path d="M-26 -138Q-26 -96 0 -76Q26 -96 26 -138ZM-26 -12Q-26 -54 0 -74Q26 -54 26 -12Z" fill="#cfe8ef" fill-opacity=".5" stroke="#9fc8d8" stroke-width="2"/><path d="M-18 -120Q0 -110 18 -120Q12 -96 0 -84Q-12 -96 -18 -120Z" fill="#e8c45a"/><path d="M-22 -12Q0 -40 22 -12Z" fill="#e8c45a"/><path d="M0 -76V-14" stroke="#e8c45a" stroke-width="2"/>`;
const eule=()=>`${schatten(36,4)}<path d="M0 0V-150M-28 0H28" stroke="#5a3418" stroke-width="7" stroke-linecap="round"/><path d="M-40 -150H40" stroke="#5a3418" stroke-width="8" stroke-linecap="round"/><ellipse cx="0" cy="-184" rx="26" ry="34" fill="#8a6a44" stroke="#4a3018" stroke-width="2"/><path d="M-16 -170Q0 -150 16 -170" fill="#c9a87a"/><circle cx="-11" cy="-196" r="10" fill="#f4ecd8"/><circle cx="11" cy="-196" r="10" fill="#f4ecd8"/><circle cx="-11" cy="-196" r="5" fill="#222"/><circle cx="11" cy="-196" r="5" fill="#222"/><path d="M-4 -186L0 -180L4 -186Z" fill="#d8a73a"/><path d="M-22 -214L-16 -228L-8 -216M22 -214L16 -228L8 -216" fill="#8a6a44" stroke="#4a3018" stroke-width="2"/><path d="M-8 -152V-148M8 -152V-148" stroke="#d8a73a" stroke-width="4"/>`;
const leuchter=()=>`${schatten(36,4)}<path d="M-24 0Q0 -12 24 0" fill="#b8862a"/><path d="M0 -6V-80M-34 -60Q-34 -80 0 -80Q34 -80 34 -60" stroke="#b8862a" stroke-width="6" fill="none"/>${R(-42,-62,16,6,'#b8862a')}${R(26,-62,16,6,'#b8862a')}${R(-8,-84,16,6,'#b8862a')}${kerze(-34,-88)}${kerze(34,-88)}${kerze(0,-110)}<circle cx="0" cy="-100" r="70" fill="url(#licht)"/>`;
const sternkarte=()=>`<circle r="80" fill="#1b2a48" stroke="#b8862a" stroke-width="6"/><circle r="66" fill="none" stroke="#3a4a78" stroke-width="2"/>${[[-30,-30],[-8,-44],[20,-36],[34,-10],[10,8],[-24,20],[-40,0],[28,34],[-6,48]].map(([x,y])=>`<use href="#sym-stern" x="${x-7}" y="${y-7}" width="14" height="14" color="#e8c45a"/>`).join('')}<path d="M-30 -30L-8 -44L20 -36L34 -10L10 8M-24 20L-40 0" stroke="#8fa8d8" stroke-width="1.5" fill="none"/><circle cx="46" cy="-46" r="9" fill="#fff1b8"/>`;
const portraet=()=>`${R(-56,-72,112,144,'#b8862a','#6b4a1c',4)}${R(-44,-60,88,120,'#3a5a4a')}<path d="M-30 60Q-30 10 0 6Q30 10 30 60Z" fill="#2a2a3a"/><circle cx="0" cy="-12" r="20" fill="#e8c0a0"/><path d="M-22 -14Q-22 -40 0 -40Q22 -40 22 -14Q16 -30 0 -30Q-16 -30 -22 -14Z" fill="#8a8a8a"/><circle cx="-7" cy="-14" r="5" fill="none" stroke="#222" stroke-width="2"/><circle cx="7" cy="-14" r="5" fill="none" stroke="#222" stroke-width="2"/>`;
const bueste=()=>`${schatten(36,4)}${R(-28,-90,56,88,'#c9bea2','#6b5a3a',3)}${R(-34,-98,68,10,'#b8ad90','#6b5a3a',2)}<path d="M-30 -98Q-30 -126 0 -128Q30 -126 30 -98Z" fill="#e8e2d2" stroke="#9a9280" stroke-width="2"/><ellipse cx="0" cy="-148" rx="18" ry="22" fill="#e8e2d2" stroke="#9a9280" stroke-width="2"/><path d="M-18 -158Q-12 -174 0 -172Q14 -174 18 -158" stroke="#c8c0ae" stroke-width="5" fill="none"/>`;
const pflanze=()=>`${schatten(34,4)}<path d="M-24 0L-30 -46H30L24 0Z" fill="#a0522d" stroke="#5a2a14" stroke-width="3"/>${R(-34,-52,68,10,'#8a4422')}<path d="M0 -52Q-40 -80 -50 -120Q-20 -100 0 -52ZM0 -52Q40 -86 48 -128Q14 -100 0 -52ZM0 -52Q-6 -100 6 -150Q16 -100 0 -52Z" fill="#3f7a4a" stroke="#1f4a2a" stroke-width="2"/>`;
const pinnwand=()=>`${R(-70,-50,140,100,'#b8865a','#6b4a24',5)}${[[-56,-38,'#f4ecd8'],[-14,-32,'#f0e070'],[26,-40,'#cfe8ef'],[-44,6,'#f0e070'],[8,4,'#f4ecd8']].map(([x,y,c])=>`${R(x,y,34,30,c)}<circle cx="${x+17}" cy="${y+4}" r="3" fill="#a33b22"/>`).join('')}`;
const ordner=()=>`${schatten(56,4)}${[-48,-24,0,24].map((x,k)=>`${R(x,-80,22,80,BF[k],'#222',1.5)}${R(x+5,-62,12,18,'#f4ecd8')}<circle cx="${x+11}" cy="-20" r="4" fill="#222"/>`).join('')}`;
const zeitungen=()=>`${schatten(40,4)}<path d="M-30 0L-20 -90M30 0L20 -90M-26 -40H26" stroke="#7a5a34" stroke-width="6"/><path d="M-22 -86L-30 -50H26L22 -86Z" fill="#e8e2d2" stroke="#8a8a8a" stroke-width="2"/><path d="M-20 -78H16M-22 -70H18M-24 -62H20" stroke="#777" stroke-width="2"/>`;
const windrose=()=>`<circle r="56" fill="#e8d6a8" stroke="#6b4a1c" stroke-width="5"/><path d="M0 -46L8 -8L46 0L8 8L0 46L-8 8L-46 0L-8 -8Z" fill="#a33b22" stroke="#6b1a1a" stroke-width="2"/><path d="M0 -46L8 -8L0 0ZM46 0L8 8L0 0ZM0 46L-8 8L0 0ZM-46 0L-8 -8L0 0Z" fill="#f4ecd8"/>`;
const steuerrad=()=>`${schatten(40,4)}<path d="M-20 0L-10 -60H10L20 0Z" fill="#6b3a1c" stroke="#3a2010" stroke-width="2"/><g transform="translate(0 -96)"><circle r="34" fill="none" stroke="#8a5a2a" stroke-width="7"/>${[0,45,90,135].map(a=>`<path d="M0 -46V46" stroke="#8a5a2a" stroke-width="6" stroke-linecap="round" transform="rotate(${a})"/>`).join('')}<circle r="8" fill="#d8a73a"/></g>`;
const kartenkorb=()=>`${schatten(40,4)}${[[-18,-12],[0,4],[16,-6],[-4,-16]].map(([x,r])=>`<rect x="${x-6}" y="-110" width="12" height="80" fill="#e8d6a8" stroke="#8a6a3a" stroke-width="2" transform="rotate(${r} ${x} -30)"/>`).join('')}<path d="M-34 -50H34L26 0H-26Z" fill="#b8865a" stroke="#6b4a24" stroke-width="3"/><path d="M-32 -34H32M-30 -18H30" stroke="#6b4a24" stroke-width="2"/>`;
const schuerze=()=>`<circle cy="-60" r="5" fill="#555"/><path d="M-14 -40Q0 -64 14 -40" stroke="#6b4a24" stroke-width="3" fill="none"/><path d="M-22 -40H22L26 -10Q46 -12 48 -4L40 60H-40L-48 -4Q-46 -12 -26 -10Z" fill="#7a5a3a" stroke="#3a2010" stroke-width="3"/>${R(-20,14,40,24,'#6b4a2a','#3a2010',2)}`;
const naehkasten=()=>`${schatten(46,4)}${R(-42,-44,84,44,'#a0522d','#5a2a14',3)}<path d="M-42 -44L-30 -66H30L42 -44" fill="#b8683a" stroke="#5a2a14" stroke-width="3"/>${[[-20,'#2a4a7a'],[0,'#8a2a2a'],[20,'#3f6a3a']].map(([x,c])=>`${R(x-6,-82,12,16,c)}`).join('')}<circle cy="-22" r="5" fill="#d8a73a"/>`;
const stoffrollen=()=>`${schatten(44,4)}${[[-24,'#2f5f5f',-100],[0,'#8a2a2a',-120],[24,'#b8862a',-94]].map(([x,c,h])=>`${R(x-10,h,20,-h,c,'#222',1.5)}<ellipse cx="${x}" cy="${h}" rx="10" ry="4" fill="#f4ecd8"/>`).join('')}${R(-40,-40,80,40,'#6b4a24','#3a2010',3)}`;
const mondkalender=()=>`<rect x="-80" y="-44" width="160" height="88" rx="6" fill="#1b2a48" stroke="#b8862a" stroke-width="5"/>${[[-54,8],[-18,20],[18,0],[54,-20]].map(([x,o])=>`<circle cx="${x}" r="14" fill="#fff1b8"/>${o?`<circle cx="${x+o}" r="14" fill="#1b2a48"/>`:''}`).join('')}`;
const planeten=()=>`${schatten(36,4)}<path d="M-22 0H22M0 0V-80" stroke="#b8862a" stroke-width="5"/><ellipse cy="-100" rx="56" ry="16" fill="none" stroke="#8fa8d8" stroke-width="2"/><circle cy="-100" r="16" fill="#f0c040"/><circle cx="-52" cy="-96" r="7" fill="#3f8fbf"/><circle cx="40" cy="-110" r="9" fill="#c86a3a"/>`;
const truhe=()=>`${schatten(56,4)}${R(-52,-54,104,54,'#3a2a5a','#1a1030',3)}<path d="M-52 -54Q0 -84 52 -54Z" fill="#4a3a6a" stroke="#1a1030" stroke-width="3"/>${R(-8,-46,16,16,'#d8a73a')}${[[-32,-30],[30,-22],[-20,-66],[24,-64]].map(([x,y])=>`<use href="#sym-stern" x="${x-7}" y="${y-7}" width="14" height="14" color="#e8c45a"/>`).join('')}`;
const sPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>${d}`;};
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out,opacity 1.8s ease-in-out}.tuer.offen #rs{transform:translateX(190px)}.tuer.offen .sl0{transform:translateX(-200px)}.tuer.offen .sl1{transform:translateX(200px)}.tuer.offen .pl{opacity:0}.tuer.offen #km{transform:scaleY(.1)}.tuer.offen #b1{transform:scaleX(.12)}.tuer.offen #b2{transform:scaleX(.12)}.tuer.offen #mf1{transform:scaleX(.14)}.tuer.offen #mf2{transform:scaleX(.14)}</style>`;
const gang=`<rect x="410" y="190" width="180" height="280" fill="#1a1008"/><circle cx="500" cy="330" r="110" fill="url(#licht)"/><path d="M420 470L470 380H530L580 470M470 380V260M530 380V260" stroke="#3a2a18" stroke-width="3" fill="none"/>`;
function tuerRegal(n){
return`<rect x="380" y="160" width="240" height="310" fill="#9a8a72" stroke="#4a3a24" stroke-width="5"/>${gang}
   <rect x="380" y="174" width="440" height="12" fill="#6b4a24" stroke="#3a2010" stroke-width="2"/>
   <g id="rs" class="tb">${regal(410,190,180,280,'#5a3418')}${sPl(n,330)}</g>`;
}
function tuerSchub(n){
let r='';
for(let j=0;j<6;j++){let s='';for(let i=0;i<3;i++){const x=410+i*60,y=190+j*46.7;s+=`<rect x="${x}" y="${y}" width="60" height="46.7" fill="${(i+j)%2?'#8a969e':'#a0aab2'}" stroke="#4a5258" stroke-width="2"/><rect x="${x+18}" y="${y+10}" width="24" height="8" fill="#f4ecd8" stroke="#4a5258" stroke-width="1"/><rect x="${x+22}" y="${y+26}" width="16" height="6" rx="3" fill="#3a4046"/>`;}r+=`<g class="tb sl${j%2}" style="transition-delay:${(j*.1).toFixed(1)}s">${s}</g>`;}
return`<defs><clipPath id="sclip"><rect x="410" y="190" width="180" height="280"/></clipPath></defs>
   <rect x="380" y="160" width="240" height="310" fill="#5a646c" stroke="#22282e" stroke-width="5"/>${gang}
   <g clip-path="url(#sclip)">${r}</g><g class="tb pl">${sPl(n,330)}</g>`;
}
function tuerKarte(n){
return`<rect x="380" y="160" width="240" height="310" fill="#9a8a72" stroke="#4a3a24" stroke-width="5"/>${gang}
   <g id="km" class="tb" style="transform-origin:500px 190px"><rect x="410" y="190" width="180" height="280" fill="#ecdcb0" stroke="#8a6a3a" stroke-width="3"/><path d="M430 250Q450 224 482 240Q494 270 470 292Q440 304 430 270Z" fill="#a8b878"/><path d="M512 300Q540 280 570 310Q568 350 540 360Q512 340 512 300Z" fill="#a8b878"/><path d="M440 380Q470 366 490 390Q480 420 448 414Z" fill="#c8a868"/><path d="M420 340C460 330 490 350 560 420" stroke="#a33b22" stroke-width="3" stroke-dasharray="8 6" fill="none"/><circle cx="560" cy="226" r="14" fill="none" stroke="#6a4a2a" stroke-width="3"/>${sPl(n,330)}</g>
   <rect x="396" y="176" width="208" height="16" rx="8" fill="#6b4a24" stroke="#3a2010" stroke-width="3"/><circle cx="396" cy="184" r="8" fill="#d8a73a"/><circle cx="604" cy="184" r="8" fill="#d8a73a"/>`;
}
function tuerBuch(n){
let z='';for(let k=0;k<6;k++)z+=`M430 ${230+k*30}H570`;
return`<rect x="396" y="170" width="212" height="304" rx="6" fill="#4a1a1a" stroke="#2a0a0a" stroke-width="4"/>${gang}
   <g id="b2" class="tb" style="transform-origin:410px 330px;transition-delay:.4s"><rect x="410" y="190" width="180" height="280" fill="#f4ecd8" stroke="#b8a888" stroke-width="2"/><path d="${z}" stroke="#a8a088" stroke-width="3"/></g>
   <g id="b1" class="tb" style="transform-origin:410px 330px"><rect x="410" y="190" width="180" height="280" fill="#8a2a2a" stroke="#4a1010" stroke-width="4"/><rect x="420" y="200" width="160" height="260" fill="none" stroke="#d8a73a" stroke-width="3"/><use href="#sym-buch" x="472" y="212" width="56" height="56" color="#d8a73a"/>${sPl(n,330)}</g>
   <rect x="396" y="170" width="16" height="304" rx="4" fill="#2a0a0a"/>`;
}
function tuerMond(n){
const bogen='M410 470V250Q410 172 500 172Q590 172 590 250V470Z';
const sterne=[[440,230],[470,200],[520,215],[560,250],[450,300],[540,320],[500,270]].map(([x,y])=>`<rect x="${x}" y="${y}" width="4" height="4" fill="#fff6c8"/>`).join('');
let st='';for(let x=416;x<=584;x+=24)st+=`M${x} 420V462`;
const gl=(x)=>`<rect x="${x}" y="172" width="90" height="298" fill="rgba(190,220,245,.25)" stroke="#5a3418" stroke-width="5"/><path d="M${x+45} 172V470M${x} 270H${x+90}M${x} 370H${x+90}" stroke="#5a3418" stroke-width="4"/>`;
return`<defs><clipPath id="mclip"><path d="${bogen}"/></clipPath><linearGradient id="himmelM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2a48"/><stop offset="1" stop-color="#4a5a8a"/></linearGradient></defs>
   <path d="M380 470V244Q380 140 500 140Q620 140 620 244V470Z" fill="#9a8a72" stroke="#4a3a24" stroke-width="5"/>
   <g clip-path="url(#mclip)"><rect x="410" y="172" width="180" height="298" fill="url(#himmelM)"/><circle cx="540" cy="250" r="34" fill="#fff6c8"/><circle cx="552" cy="244" r="30" fill="#2c3d66"/>${sterne}<path d="M410 400H430V380H450V400H490V370H510V400H560V385H590V470H410Z" fill="#14203a"/><path d="M410 420H590M410 462H590" stroke="#5a3418" stroke-width="6"/><path d="${st}" stroke="#5a3418" stroke-width="5"/></g>
   <g id="mf1" class="tb" style="transform-origin:410px 330px">${gl(410)}</g><g id="mf2" class="tb" style="transform-origin:590px 330px">${gl(500)}</g>
   <g class="tb pl">${sPl(n,330)}</g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'regal';
const arten={regal:[tuerRegal,'Schiebe-Regal mit Zahlenschloss'],schub:[tuerSchub,'Schubladenwand mit Zahlenschloss'],karte:[tuerKarte,'Weltkarte mit Zahlenschloss'],buch:[tuerBuch,'Riesenbuch mit Zahlenschloss'],mond:[tuerMond,'Mondfenster mit Zahlenschloss']};
const a=arten[art]||arten.regal;
return`${TSTIL}<g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const W='#e8d9b8';
SZENARIEN.bibliothek={
name:"Die alte Bibliothek",
symbole:["buch","schluessel","eule","tintenfeder","sanduhr"],
symbolNamen:["Buch","Schlüssel","Eule","Schreibfeder","Sanduhr"],
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M8 20Q34 8 60 20Q86 8 112 20V80Q86 68 60 80Q34 68 8 80Z" fill="#f4ecd8" stroke="#8a6420" stroke-width="3"/><path d="M60 20V80" stroke="#8a6420" stroke-width="3"/><path d="M18 34Q34 28 50 34M18 46Q34 40 50 46M70 34Q86 28 102 34" stroke="#b8a888" stroke-width="2" fill="none"/><use href="#sym-schluessel" x="66" y="40" width="40" height="34" color="#a33b22"/></svg>`,
texte:{
einleitung:"Ihr besucht die älteste Bibliothek der Stadt. Kaum seid ihr im Lesesaal, schlägt die schwere Tür hinter euch zu! Die Bibliothekarin hat euch ein Rätselspiel hinterlassen: Jeder Durchgang hat ein Zahlenschloss. Untersucht die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findet ihr den Weg hinaus?",
startKnopf:"Die Bibliothek betreten",
hinweisGeber:"Die kluge Eule flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Eule schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Bibliothek",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt zu. Überprüft eure Ziffern!",
zeitUmTitel:"Die Bibliothek schließt!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Ihr seid frei!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus der alten Bibliothek gefunden. Die Bibliothekarin ist stolz auf euch!"
},
texteDu:{
einleitung:"Du besuchst die älteste Bibliothek der Stadt. Kaum bist du im Lesesaal, schlägt die schwere Tür hinter dir zu! Die Bibliothekarin hat dir ein Rätselspiel hinterlassen: Jeder Durchgang hat ein Zahlenschloss. Untersuche die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Findest du den Weg hinaus?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Eule schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt zu. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und den Ausgang trotzdem noch finden!",
geschafft:"Du bist frei!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und den Weg aus der alten Bibliothek gefunden. Die Bibliothekarin ist stolz auf dich!"
},
einfach:{
name:"Die alte Bibliothek",
symbolNamen:["Buch","Schlüssel","Eule","Feder","Sanduhr"],
texte:{
einleitung:"Ihr seid in einer sehr alten Bibliothek. Dort stehen ganz viele Bücher. Plötzlich geht die Tür hinter euch zu! An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg nach draußen?",
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
einleitung:"Du bist in einer sehr alten Bibliothek. Dort stehen ganz viele Bücher. Plötzlich geht die Tür hinter dir zu! An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg nach draußen?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst und den Weg nach draußen gefunden!"
},
raeume:[
{titel:"Der Lesesaal",intro:"Ein großer Saal voller Bücher. Grüne Lampen leuchten. Hier sind die Zahlen für das Schloss am Regal versteckt.",
objekte:[{name:"Pult mit Buch",fund:"Im Buch liegt:"},{name:"Globus",fund:"Im Globus klappert etwas:"},{name:"Bücherwagen",fund:"Hinter den Büchern liegt:"},{name:"Sessel",fund:"Unter dem Kissen liegt:"},{name:"Uhr",fund:"Hinter der Uhr klebt:"}],
infoObjekte:[{name:"Bild an der Wand",fund:"Hinter dem Bild klebt:"},{name:"Kopf aus Stein",fund:"Unter dem Kopf liegt:"},{name:"Pflanze",fund:"In der Erde steckt:"}]},
{titel:"Der Aktenraum",intro:"Ihr seid im Aktenraum. Hier liegen viele alte Papiere in Kisten und Schränken. Findet die Zahlen für das Schloss an der Schubladenwand!",introDu:"Du bist im Aktenraum. Hier liegen viele alte Papiere in Kisten und Schränken. Finde die Zahlen für das Schloss an der Schubladenwand!",
objekte:[{name:"Schrank mit Schubladen",fund:"In einer Schublade liegt:"},{name:"Schreibmaschine",fund:"In der Schreibmaschine steckt ein Zettel:"},{name:"Kiste mit Papieren",fund:"Zwischen den Papieren liegt:"},{name:"Leiter",fund:"Oben auf der Leiter liegt:"},{name:"Tresor",fund:"Der Tresor geht auf! Darin liegt:"}],
infoObjekte:[{name:"Pinnwand",fund:"Unter einem Zettel steckt:"},{name:"Ordner",fund:"Im Ordner liegt:"},{name:"Ständer mit Zeitungen",fund:"In der Zeitung liegt:"}]},
{titel:"Der Kartenraum",intro:"Hier hängen viele alte Karten an den Wänden. Mit Karten fanden Menschen früher den Weg.",
objekte:[{name:"Kompass",fund:"Unter dem Kompass liegt:"},{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Kiste vom Schiff",fund:"In der Kiste liegt:"},{name:"Schiff in der Flasche",fund:"Im kleinen Schiff steckt:"},{name:"Karte an der Wand",fund:"Hinter der Karte steckt:"}],
infoObjekte:[{name:"Schild mit Himmelsrichtungen",fund:"Hinter dem Schild steckt:"},{name:"Rad vom Schiff",fund:"Am Rad hängt:"},{name:"Korb mit Rollen",fund:"In einer Rolle steckt:"}]},
{titel:"Die Werkstatt",intro:"Hier reparieren Menschen alte Bücher. Es riecht nach Kleber und Papier.",
objekte:[{name:"Presse für Bücher",fund:"In der Presse liegt:"},{name:"Stapel Papier",fund:"Im Papier steckt:"},{name:"Topf mit Kleber",fund:"Am Pinsel klebt:"},{name:"Tinte",fund:"Unter der Tinte liegt:"},{name:"Brett mit Werkzeug",fund:"Hinter der Schere hängt:"}],
infoObjekte:[{name:"Schürze",fund:"In der Tasche steckt:"},{name:"Rollen aus Stoff",fund:"Zwischen dem Stoff liegt:"},{name:"Kasten mit Faden",fund:"Im Kasten liegt:"}]},
{titel:"Das Turmzimmer",intro:"Ihr seid oben im Turm. Durch das runde Fenster scheint der Mond. Öffnet das letzte Schloss!",introDu:"Du bist oben im Turm. Durch das runde Fenster scheint der Mond. Öffne das letzte Schloss!",
objekte:[{name:"Glaskugel",fund:"In der Kugel leuchtet ein Zeichen:"},{name:"Sanduhr",fund:"Im Sand liegt:"},{name:"Eule",fund:"Die Eule lässt etwas fallen:"},{name:"Kerzen",fund:"Unter den Kerzen liegt:"},{name:"Bild mit Sternen",fund:"Hinter dem Bild steckt:"}],
infoObjekte:[{name:"Bild vom Mond",fund:"Hinter dem Bild klebt:"},{name:"Sonne mit Planeten",fund:"Unter der Sonne klebt:"},{name:"Kiste mit Sternen",fund:"In der Kiste liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Der Lesesaal",
intro:"Ein großer Lesesaal mit hohen Regalen voller Bücher. Grüne Lampen leuchten über den Tischen. Irgendwo hier sind die Ziffern für das Schloss am Schiebe-Regal versteckt …",
tuerX:800,tuerArt:"regal",
hintergrund:()=>`${defs('#9a6a3a','#4a2e18')}<rect width="1600" height="470" fill="${W}"/>${regal(30,90,250,300)}${regal(1080,90,250,300)}${regal(1340,90,240,300)}${fenster(400,170)}${paneel(380,'#6b3f20')}<rect width="1600" height="40" fill="#4a2a14"/>${boden()}${haengelampe(300,110,'#2f6a3a')}${haengelampe(1300,110,'#2f6a3a')}`,
objekte:[
{name:"Lesepult mit Buch",x:430,boden:620,fuss:4,by:-110,zeichne:pult,fund:"Zwischen den Seiten des Buches liegt:"},
{name:"Globus",x:1080,boden:580,fuss:4,by:-130,zeichne:globus,fund:"Im Globus klappert etwas:"},
{name:"Bücherwagen",x:1350,boden:700,fuss:4,by:-120,zeichne:wagen,fund:"Hinter den Büchern liegt:"},
{name:"Ohrensessel",x:220,boden:720,fuss:4,by:-150,zeichne:sessel,fund:"Unter dem Sitzkissen liegt:"},
{name:"Pendeluhr",x:600,y:250,wand:true,by:-100,zeichne:uhr,fund:"Hinter dem Pendel klebt:"}
],
infoObjekte:[{name:"Porträt der Gründerin",x:1000,y:250,wand:true,by:-95,zeichne:portraet,fund:"Hinter dem Bild klebt:"},{name:"Büste eines Dichters",x:1520,boden:560,fuss:4,by:-195,zeichne:bueste,fund:"Unter der Büste liegt:"},{name:"Topfpflanze",x:650,boden:745,fuss:4,by:-170,zeichne:pflanze,fund:"In der Blumenerde steckt:"}]},
{titel:"Das Archiv",
intro:"Ihr steht im Archiv. Hier lagern alte Akten, Karteikarten und Briefe in langen Metallregalen. Findet die Ziffern für das Schloss an der Schubladenwand!",
introDu:"Du stehst im Archiv. Hier lagern alte Akten, Karteikarten und Briefe in langen Metallregalen. Finde die Ziffern für das Schloss an der Schubladenwand!",
tuerX:1350,tuerArt:"schub",
hintergrund:()=>`${defs('#4a5a62','#1c2428','#e8f0ff')}<rect width="1600" height="470" fill="#5a6a78"/>${steine(40,470,60,200,'rgba(20,30,40,.25)')}<rect width="1600" height="40" fill="#2c3438"/><path d="M0 60H1600M0 74H1600" stroke="#8a969e" stroke-width="6"/>${blechregal(60,120,320,340)}${blechregal(760,120,420,340)}${boden()}${haengelampe(500,90,'#c9ccce')}${haengelampe(1000,90,'#c9ccce')}`,
objekte:[
{name:"Karteischrank",x:250,boden:570,fuss:4,by:-175,zeichne:karteischrank,fund:"In einer Schublade liegt:"},
{name:"Schreibmaschine",x:560,boden:650,fuss:4,by:-155,zeichne:schreibmaschine,fund:"In der Schreibmaschine steckt ein Zettel:"},
{name:"Aktenkiste",x:900,boden:720,fuss:4,by:-90,zeichne:aktenkiste,fund:"Zwischen den Akten liegt:"},
{name:"Bibliotheksleiter",x:1120,boden:540,fuss:4,by:-275,zeichne:leiter,fund:"Auf der obersten Stufe liegt:"},
{name:"Wandtresor",x:670,y:260,wand:true,by:-90,zeichne:tresor,fund:"Der Tresor springt auf! Darin liegt:"}
],
infoObjekte:[{name:"Pinnwand mit Notizen",x:500,y:250,wand:true,by:-75,zeichne:pinnwand,fund:"Unter einem Notizzettel steckt:"},{name:"Aktenordner",x:140,boden:730,fuss:4,by:-105,zeichne:ordner,fund:"In einem Ordner ist abgeheftet:"},{name:"Zeitungsständer",x:1520,boden:710,fuss:4,by:-115,zeichne:zeitungen,fund:"Zwischen den Zeitungen liegt:"}]},
{titel:"Der Kartenraum",
intro:"Im Kartenraum hängen alte Landkarten an den Wänden. Ein Fernrohr zeigt zum Fenster, ein Kompass liegt bereit. Hier planten Forscherinnen und Forscher ihre Reisen. Die große Weltkarte hat ein Zahlenschloss.",
tuerX:220,tuerArt:"karte",
hintergrund:()=>`${defs('#6b4024','#2a160a')}<rect width="1600" height="470" fill="#2f4a3a"/>${paneel(360,'#4a2a14')}<rect width="1600" height="40" fill="#1a2a20"/>${R(980,110,520,220,'#e8d6a8','#6b4a1c',6)}<path d="M1010 200Q1060 150 1120 180Q1160 220 1120 260Q1060 290 1020 250ZM1200 150Q1280 130 1340 170Q1360 230 1300 250Q1240 260 1220 220ZM1380 240Q1420 220 1460 250Q1450 290 1410 290Z" fill="#c9b07a" stroke="#8a6a3a" stroke-width="2"/><path d="M1000 300q20-8 40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0t40 0" stroke="#3f8fbf" stroke-width="2" fill="none"/>${boden()}${haengelampe(800,120,'#b8862a')}`,
objekte:[
{name:"Kompass",x:520,boden:640,fuss:4,by:-100,zeichne:kompass,fund:"Unter dem Kompass liegt:"},
{name:"Fernrohr",x:1250,boden:560,fuss:4,by:-140,zeichne:fernrohr,fund:"Im Fernrohr steckt:"},
{name:"Seekiste",x:1450,boden:700,fuss:4,by:-110,zeichne:seekiste,fund:"In der Seekiste liegt:"},
{name:"Buddelschiff",x:860,boden:720,fuss:4,by:-105,zeichne:flaschenschiff,fund:"Im Schiff in der Flasche steckt:"},
{name:"Wandkarte",x:680,y:240,wand:true,by:-95,zeichne:wandkarte,fund:"Hinter der Karte steckt:"}
],
infoObjekte:[{name:"Windrose",x:420,y:240,wand:true,by:-80,zeichne:windrose,fund:"Hinter der Windrose steckt:"},{name:"Steuerrad",x:1020,boden:560,fuss:4,by:-165,zeichne:steuerrad,fund:"Am Steuerrad hängt:"},{name:"Korb mit Kartenrollen",x:340,boden:745,fuss:4,by:-130,zeichne:kartenkorb,fund:"In einer Kartenrolle steckt:"}]},
{titel:"Die Buchbinderwerkstatt",
intro:"In der Werkstatt der Buchbinder werden alte Bücher repariert. Es riecht nach Leim und Papier. Auf der Werkbank liegen Werkzeuge bereit. Das Riesenbuch hat ein Zahlenschloss.",
tuerX:800,tuerArt:"buch",
hintergrund:()=>`${defs('#7a7068','#34302c','#fff3d0')}<rect width="1600" height="470" fill="#9a5a3e"/>${steine(40,470,30,90,'rgba(60,20,10,.35)')}<rect width="1600" height="40" fill="#3a2a20"/>${fenster(1450,180,false)}<circle cx="1450" cy="300" r="260" fill="url(#licht)"/>${regal(40,120,220,280,'#6b4a24')}${R(980,380,380,18,'#6b4a24')}<path d="M1000 398V470M1340 398V470" stroke="#3a2010" stroke-width="12"/>${boden()}`,
objekte:[
{name:"Buchpresse",x:330,boden:610,fuss:4,by:-170,zeichne:presse,fund:"Zwischen den Brettern der Presse liegt:"},
{name:"Papierstapel",x:560,boden:725,fuss:4,by:-125,zeichne:papierstapel,fund:"Im Papierstapel steckt:"},
{name:"Leimtopf",x:1060,boden:640,fuss:4,by:-140,zeichne:leimtopf,fund:"Am Leimpinsel klebt:"},
{name:"Tintenfässer",x:1360,boden:580,fuss:4,by:-125,zeichne:tinte,fund:"Unter einem Tintenfass liegt:"},
{name:"Werkzeugbrett",x:1150,y:250,wand:true,by:-100,zeichne:werkzeugbrett,fund:"Hinter der Schere hängt:"}
],
infoObjekte:[{name:"Lederschürze",x:520,y:240,wand:true,by:-85,zeichne:schuerze,fund:"In der Schürzentasche steckt:"},{name:"Stoffrollen",x:1530,boden:730,fuss:4,by:-145,zeichne:stoffrollen,fund:"Zwischen den Stoffrollen liegt:"},{name:"Nähkasten",x:140,boden:745,fuss:4,by:-105,zeichne:naehkasten,fund:"Im Nähkasten liegt:"}]},
{titel:"Das geheime Turmzimmer",
intro:"Eine schmale Treppe führt hinauf ins geheime Turmzimmer. Durch das runde Fenster scheint der Mond. Hier liegt das letzte Geheimnis der Bibliothek – öffnet das Schloss am Mondfenster!",
introDu:"Eine schmale Treppe führt hinauf ins geheime Turmzimmer. Durch das runde Fenster scheint der Mond. Hier liegt das letzte Geheimnis der Bibliothek – öffne das Schloss am Mondfenster!",
tuerX:1350,tuerArt:"mond",
hintergrund:()=>`${defs('#3a3048','#151020','#c8b8f0')}<rect width="1600" height="470" fill="#2c2648"/>${steine(40,470,44,70,'rgba(0,0,0,.3)')}<rect width="1600" height="40" fill="#1a1430"/><circle cx="1000" cy="190" r="86" fill="#1b2a48" stroke="#5a4a78" stroke-width="12"/><circle cx="1030" cy="160" r="20" fill="#fff1b8"/><use href="#sym-stern" x="960" y="200" width="16" height="16" color="#e8c45a"/><use href="#sym-stern" x="990" y="236" width="10" height="10" color="#e8c45a"/><circle cx="1000" cy="300" r="300" fill="#8fa8f0" opacity=".1"/>${boden()}${haengelampe(540,120,'#6a4a9a')}`,
objekte:[
{name:"Kristallkugel",x:520,boden:600,fuss:4,by:-125,zeichne:kugel,fund:"In der Kugel leuchtet ein Zeichen auf:"},
{name:"Große Sanduhr",x:820,boden:710,fuss:4,by:-175,zeichne:sanduhr,fund:"Im Sand liegt:"},
{name:"Eule auf der Stange",x:260,boden:570,fuss:4,by:-255,zeichne:eule,fund:"Die Eule lässt etwas fallen:"},
{name:"Kerzenleuchter",x:1080,boden:630,fuss:4,by:-145,zeichne:leuchter,fund:"Unter dem Leuchter liegt:"},
{name:"Sternkarte",x:700,y:230,wand:true,by:-105,zeichne:sternkarte,fund:"Hinter der Sternkarte steckt:"}
],
infoObjekte:[{name:"Mondkalender",x:330,y:220,wand:true,by:-65,zeichne:mondkalender,fund:"Hinter dem Mondkalender klebt:"},{name:"Planetenmodell",x:1530,boden:600,fuss:4,by:-140,zeichne:planeten,fund:"Unter der Sonne des Modells klebt:"},{name:"Sternentruhe",x:140,boden:745,fuss:4,by:-100,zeichne:truhe,fund:"In der Sternentruhe liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a6a"/><stop offset=".6" stop-color="#f0a878"/><stop offset="1" stop-color="#ffd8a8"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/><circle cx="500" cy="400" r="110" fill="#fff2c0" opacity=".45"/><circle cx="500" cy="400" r="58" fill="#fff6d0"/><circle cx="250" cy="140" r="26" fill="#f4f0e0" opacity=".85"/>
   <path d="M0 420Q200 360 420 400T1000 380V600H0Z" fill="#8cc06a"/><path d="M0 470Q300 430 600 480T1000 460V600H0Z" fill="#6aa04a"/>
   <path d="M420 600Q470 500 520 470Q560 500 600 600Z" fill="#d8c8a0"/>
   ${[[230,400],[330,420],[700,410],[820,430]].map(([x,y])=>`${R(x-6,y-60,12,60,'#6b4a24')}<circle cx="${x}" cy="${y-80}" r="40" fill="#3f8a4a"/><circle cx="${x-20}" cy="${y-60}" r="26" fill="#4f9a5a"/>`).join('')}
   <path d="M300 120l10 6 10-6M340 100l8 5 8-5M560 90l9 5 9-5" stroke="#3a2a17" stroke-width="2.5" fill="none"/>
   <rect y="530" width="1000" height="14" fill="#6b4a24"/>${[...Array(20)].map((_,k)=>`<rect x="${30+k*50}" y="544" width="10" height="56" fill="#5a3a1c"/>`).join('')}<use href="#sym-eule" x="640" y="190" width="100" height="100" color="#3a2a17"/><path d="M0 0H1000V600H0Z M180 600V230Q180 70 500 70Q820 70 820 230V600Z" fill="#3a2414" fill-rule="evenodd"/><path d="M180 600V230Q180 70 500 70Q820 70 820 230V600" stroke="#9a8a72" stroke-width="18" fill="none"/>`
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
   BIBLIOTHEK in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei bibliothek-raum<n>.js, die sich in RAEUME3D.bibliothek[n-1] einträgt.
   Global aus helfer3d.js: box, ball, walze, kegel, rohr, ring, strich, gruppe, teil, verschmelze, bild, schein, leuchtBild, mat, basis, GEO, V,
   zufall, textSprite, laeufer, katze, maeuschen, flacker, ausgang.
   =================================================================== */
RAEUME3D.bibliothek = [];
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen.
   [Name, Fundtext, leichter Name, leichter Fundtext] */
const NEU=[
  [['Kamin','Auf dem Kaminsims liegt:','Kamin','Auf dem Kamin liegt:'],['Schachtisch','Unter dem Schachbrett liegt:','Tisch mit Schachspiel','Beim Schachspiel liegt:']],
  [['Tischventilator','Der Luftzug weht etwas hervor:','Ventilator','Beim Ventilator liegt:'],['Stempelkarussell','Zwischen den Stempeln steckt:','Runder Tisch mit Stempeln','Bei den Stempeln steckt:']],
  [['Schiffslaterne','Unter der Laterne liegt:','Lampe vom Schiff','Unter der Lampe liegt:'],['Schiffsglocke','In der Glocke klemmt:','Glocke vom Schiff','In der Glocke steckt:']],
  [['Waschbecken','Unter der Seife liegt:','Waschbecken','Beim Waschbecken liegt:'],['Leine mit Buntpapier','Zwischen den bunten Blättern hängt:','Bunte Blätter an der Leine','Bei den bunten Blättern hängt:']],
  [['Schaukelstuhl','Unter dem Kissen liegt:','Stuhl zum Schaukeln','Unter dem Kissen liegt:'],['Spieluhr','In der Spieluhr liegt:','Dose mit Musik','In der Dose liegt:']]
];
const SZB=SZENARIEN.bibliothek;
/* Einfache Einleitungen: den Ausgang nennen */
if(SZB.einfach) [[1,'Der Ausgang ist das Tor mit den Schubladen.'],[2,'Der Ausgang ist hinter der großen Weltkarte.'],[3,'Der Ausgang ist das riesige Buch.'],[4,'Der Ausgang ist das große Fenster mit dem Mond.']].forEach(([i,satz])=>{ const r=SZB.einfach.raeume[i]; if(r) ['intro','introDu'].forEach(k=>{ if(r[k] && r[k].indexOf(satz)<0) r[k]=r[k]+' '+satz; }); });
/* In 3D ist das Mondfenster ein Bogenfenster; das einzige runde Ding dort ist die Sternkarte */
[SZB.raeume[4],SZB.einfach&&SZB.einfach.raeume[4]].forEach(r=>{ if(r) ['intro','introDu'].forEach(k=>{ if(r[k]) r[k]=r[k].split('runde Fenster').join('große Bogenfenster'); }); });
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZB.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZB.einfach) SZB.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

const BIB = (function(){
const HOLZ=0x8a5a30, HOLZ2=0x5a3418, HOLZ3=0x3a2010, MESSING=0xd8a73a, MESSING2=0xa87c22, PAPIER=0xf4ecd8, PAPIER2=0xdccca4, STEIN=0xb8ac92, STEIN2=0x8a7e68,
  ROT=0x8a2a2a, BLAU=0x2a4a7a, GRUEN=0x3f6a3a, LAMPE=0x2f7a4a, LILA=0x6a3a6a, TUERKIS=0x2f6a6a, GOLD=0xe8b830, SCHWARZ=0x1c160e, WEISS=0xfaf6ea;
/* Buchfarben */
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
  flaeche(-B/2-10,B/2+10,T/2,T/2+10); /* Boden läuft vorn weiter, damit hochkant keine dunkle Fläche entsteht */
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
/* liegender Bücherstapel mit n Büchern (Fuß bei y). Nur sparsam als Deko: nicht mit Gegenständen verwechselbar machen */
function stapel(par,x,y,z,n,dreh){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh||0;
  for(let i=0;i<n;i++){ const w=.75-(i%3)*.08, c=BUCH[(i*3+n)%7], b=gruppe(g,(i%2)*.05,.09+i*.18,0); b.rotation.y=(i%3-1)*.14;
    box(b,w,.17,.52,c,0,0,0); box(b,w-.04,.11,.48,PAPIER,.05,0,.03); }
  return g;
}
/* grüne Hängelampe an einer Kette von oben, Schirm in Höhe y. Mit Lichtschein. Echtes Licht dafür sparsam mit flacker(...) */
function lampe(par,x,y,z,farbe){
  const g=gruppe(par,x,y,z); walze(g,.025,.8,HOLZ3,0,.65,0).castShadow=false; ball(g,.09,MESSING,0,.34,0); ball(g,.07,MESSING2,0,1.07,0).castShadow=false;
  rohr(g,.18,.6,.42,farbe||LAMPE,0,.08,0,18,true).castShadow=false; const r=ring(g,.6,.03,MESSING,0,-.13,0); r.rotation.x=Math.PI/2; r.castShadow=false;
  ball(g,.17,basis(0xfff2b0),0,-.08,0).castShadow=false; schein(g,'rgba(255,225,140,.6)',0,-.2,0,1.8); return g;
}
/* grüne Tischlampe (Bibliothekslampe), Fuß bei y */
function tischlampe(par,x,y,z){
  const g=gruppe(par,x,y,z); walze(g,.2,.06,MESSING2,0,.03,0); walze(g,.035,.5,MESSING,0,.3,0);
  const s=walze(g,.16,.7,LAMPE,0,.58,0); s.rotation.z=Math.PI/2; [-.36,.36].forEach(a=>ball(g,.07,MESSING,a,.58,0));
  box(g,.6,.05,.18,basis(0xfff2b0),0,.43,0).castShadow=false; schein(g,'rgba(255,230,150,.5)',0,.45,.1,1.1); return g;
}
/* Rundbogenfenster in der Rückwand (Blick nach +z), Unterkante bei y. himmel: [oben, unten] CSS-Farben. nacht: Mond und Sterne */
function bogenfenster(par,x,y,z,b,h,himmel,nacht){
  const g=gruppe(par,x,y,z), H=himmel||['#8ac8f0','#e8f6ff'];
  const t=bild(256,384,(c)=>{ const v=c.createLinearGradient(0,0,0,384); v.addColorStop(0,H[0]); v.addColorStop(1,H[1]); c.fillStyle=v; c.fillRect(0,0,256,384);
    if(nacht){ c.fillStyle='#fff6c8'; for(let i=0;i<40;i++) c.fillRect(zufall()*252,zufall()*300,3,3); c.beginPath(); c.arc(170,100,34,0,7); c.fill(); }
    else { c.fillStyle='#ffffff'; [[60,90],[190,150]].forEach(p=>[[-26,0,22],[0,-10,30],[28,0,22]].forEach(q=>{ c.beginPath(); c.arc(p[0]+q[0],p[1]+q[1],q[2],0,7); c.fill(); }));
      c.fillStyle='#5a9a4a'; c.beginPath(); c.moveTo(0,330); c.quadraticCurveTo(70,270,140,320); c.quadraticCurveTo(200,285,256,310); c.lineTo(256,384); c.lineTo(0,384); c.fill(); } });
  const r=b/2, eck=h-r, form=new THREE.Shape(); form.moveTo(-r,0); form.lineTo(r,0); form.lineTo(r,eck); form.absarc(0,eck,r,0,Math.PI,false); form.lineTo(-r,0);
  const geo=new THREE.ShapeGeometry(form,20), uv=geo.attributes.uv; for(let i=0;i<uv.count;i++) uv.setXY(i,(uv.getX(i)+r)/b,uv.getY(i)/h);
  const m=new THREE.Mesh(geo,basis(0xffffff,{map:t})); m.position.z=.02; g.add(m);
  const R=gruppe(g,0,0,0);
  [-1,1].forEach(s=>box(R,.18,eck,.2,HOLZ2,s*r,eck/2,.06)); ring(R,r,.09,HOLZ2,0,eck,.06,Math.PI); box(R,b+.4,.18,.34,STEIN,0,-.02,.1);
  box(R,.07,h-.05,.08,HOLZ2,0,(h-.05)/2,.07); [eck,eck*.5].forEach(a=>box(R,b,.07,.08,HOLZ2,0,a,.07));
  verschmelze(R); return g;
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
/* Eule (etwa 1,3 hoch, Füße bei y=0, Blick nach +z). Kopf dreht sich, Augen blinzeln. Rückgabe: { g, kopf, fluegel[2] } */
function eule(k,par,x,y,z,gr){
  const g=gruppe(par,x,y,z); g.scale.setScalar(gr||1); g.userData.lebendig=true;
  const F=0x8a5c34, D=0x5e3c20, H=0xe8d2a8, r=gruppe(g,0,0,0);
  ball(r,.42,F,0,.52,0,1,1.18,.88); ball(r,.3,H,0,.46,.17,.9,1.12,.72);
  [[-.1,.55],[.1,.55],[0,.42],[-.13,.32],[.13,.32],[0,.65]].forEach(([a,b])=>ball(r,.035,D,a,b,.39,1.4,.7,.5));
  [-1,1].forEach(s=>{ [-.07,.07].forEach(a=>ball(r,.05,0xe8a030,s*.14+a,.04,.16,.7,.7,1.5)); }); ball(r,.14,D,0,.14,-.34,1,.5,1.8);
  const fl=[-1,1].map(s=>{ const f=gruppe(g,s*.36,.78,-.02); ball(f,.34,D,s*.05,-.26,0,.3,1.05,.72); return f; });
  const kopf=gruppe(g,0,1.08,0); ball(kopf,.36,F,0,0,0,1.08,.9,.92);
  const augen=[];
  [-1,1].forEach(s=>{ ball(kopf,.16,H,s*.15,.01,.26,1,1,.45); const a=gruppe(kopf,s*.15,.02,.34); ball(a,.095,0xffc81e,0,0,0,1,1,.45); ball(a,.052,SCHWARZ,0,0,.035,1,1,.5); ball(a,.018,WEISS,.025,.03,.06); augen.push(a);
    const o=kegel(kopf,.09,.24,D,s*.25,.31,0); o.rotation.z=-s*.5; });
  const sch=kegel(kopf,.06,.16,0xe8a030,0,-.09,.37); sch.rotation.x=Math.PI*.85;
  verschmelze(r);
  k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.5+x)*.45*Math.max(0,Math.sin(t*.23+z)+.4); const z2=(t+x)%4.2<.14?.12:1; augen.forEach(a=>a.scale.y=z2); });
  return { g, kopf, fluegel:fl };
}
/* Viele Bücher, Blätter oder Steine als eine Instanz-Gruppe. liste: [[x,y,z,sx,sy,sz,farbe,drehY,drehX,drehZ]], geo: GEO.sph / GEO.cone / GEO.box / GEO.cyl */
function viele(par,geo,liste){
  const im=new THREE.InstancedMesh(geo,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), C=new THREE.Color();
  liste.forEach((e,i)=>{ o.position.set(e[0],e[1],e[2]); o.scale.set(e[3],e[4],e[5]); o.rotation.set(e[8]||0,e[7]||0,e[9]||0); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,C.set(e[6])); });
  im.receiveShadow=true; im.frustumCulled=false; par.add(im); return im;
}
return { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, STEIN, STEIN2, ROT, BLAU, GRUEN, LAMPE, LILA, TUERKIS, GOLD, SCHWARZ, WEISS, BUCH,
  dielenBild, tapeteBild, quaderBild, tafel, mauer, huelle, regal, stapel, lampe, tischlampe, bogenfenster, zahlenschloss, teppich, eule, viele };
})();

/* Raum 1: Der Lesesaal. Großer, warmer Saal mit hohen Bücherregalen, grünen Lampen über den Lesetischen,
   Teppichen, Rundbogenfenstern und einem Kaminfeuer. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Kamin) und 10 (Schachtisch) sind neu.
   Ausgang: das Schiebe-Regal in der Mitte der Rückwand fährt an einer Messingschiene nach links, dahinter liegt ein beleuchteter Geheimgang. */
RAEUME3D.bibliothek[0] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, STEIN, STEIN2, ROT, BLAU, GRUEN, LAMPE, LILA, TUERKIS, GOLD, SCHWARZ, WEISS, BUCH } = BIB;
const KIRSCH=0x8a3a1c, KIRSCH2=0xa8541f, MARMOR=0xeee8da, MARMOR2=0xcfc7b2, SAMT=0xa02c30, SAMT2=0x7a1c24, BLATT=0x3f8a44, BLATT2=0x56a850, TON=0xb8603a;
const B=36, T=27, H=7, HINTEN=-13.5;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
/* leuchtendes Teil ohne Schatten */
const hell=m=>{ m.castShadow=false; return m; };
/* Wanddeko und flache Dinge werfen keinen Schatten */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* gemeinsame Leucht-Materialien (damit verschmelze sie zusammenfassen kann) */
let GLUEH=null, KERZE=null;

/* Flamme aus drei Kegeln, flackert. Fuß bei (x,y,z) in par */
function flamme(k,par,x,y,z,gr){
  const f=gruppe(par,x,y,z); f.userData.lebendig=true;
  const teile=[[0,0,.24,.8,0xff7a18],[-.14,.06,.16,.54,0xffa022],[.13,.1,.14,.46,0xffe066]].map(([a,b,r,h,c])=>({ m:hell(kegel(f,r*gr,h*gr,basis(c),a*gr,h*gr/2,b*gr)), h:h*gr }));
  k.anim.push(t=>{ teile.forEach((q,i)=>{ const a=1+Math.sin(t*(8+i*3.3)+x*3+i*2+z)*.22; q.m.scale.y=q.h*a; q.m.position.y=q.h*a/2; q.m.rotation.z=Math.sin(t*5.5+i+x)*.09; }); });
}
/* Kerze mit kleiner Flamme (steht still) */
function kerze(p,x,y,z,h){ walze(p,.1,.04,MESSING,x,y+.02,z); walze(p,.055,h,WEISS,x,y+h/2,z); hell(ball(p,.05,KERZE,x,y+h+.09,z,.8,1.5,.8)); }

/* ---------- Ausgang: das Schiebe-Regal ---------- */
function baueAusgang(k,sc,hinten){
  /* Geheimgang hinter der Wand */
  const gang=gruppe(hinten,0,0,0);
  box(gang,3.9,.1,4.4,0x8a7256,0,-.045,-15.7);
  [-1,1].forEach(s=>{ box(gang,.2,4.2,4.0,0x9a8468,s*2.0,2.1,-15.9);
    [-14.4,-15.7,-17.0].forEach(z=>{ box(gang,.12,4.2,.24,STEIN,s*1.86,2.1,z); box(gang,.14,.18,.14,MESSING2,s*1.76,2.5,z+.5); hell(ball(gang,.13,GLUEH,s*1.72,2.74,z+.5,.8,1.3,.8)); }); });
  box(gang,1.5,.02,4.2,SAMT,0,.015,-15.65); [-.65,.65].forEach(x=>box(gang,.1,.025,4.2,MESSING,x,.018,-15.65));
  const ende=bild(256,288,(g)=>{ const v=g.createRadialGradient(128,170,8,128,170,200); v.addColorStop(0,'#fffbe0'); v.addColorStop(.35,'#ffd878'); v.addColorStop(1,'#5a3414'); g.fillStyle=v; g.fillRect(0,0,256,288);
    /* Treppe nach oben ins Licht */
    for(let i=0;i<8;i++){ const w=210-i*20, y=270-i*17; g.fillStyle=i%2?'#a87a48':'#c89a60'; g.fillRect(128-w/2,y,w,17); g.fillStyle='rgba(255,245,200,.7)'; g.fillRect(128-w/2,y,w,3); }
    g.strokeStyle='#6a4420'; g.lineWidth=10; g.beginPath(); g.moveTo(70,150); g.lineTo(70,90); g.arc(128,90,58,Math.PI,0); g.lineTo(186,150); g.stroke();
    g.fillStyle='#fffce8'; [[40,50],[214,66],[96,40],[170,30],[34,130],[222,140]].forEach(([x,y])=>{ g.fillRect(x-1,y-6,3,13); g.fillRect(x-6,y-1,13,3); }); });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(3.9,4.2),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,2.1,-17.85); gang.add(e);
  verschmelze(gang); gang.visible=false;

  /* fester Rahmen: helle Steinpfeiler, Gesims mit goldenem Buchzeichen, Laufschiene */
  const r=gruppe(hinten,0,0,0);
  [-1,1].forEach(s=>{ const x=s*2.34; box(r,.46,4.55,.28,MARMOR,x,2.27,-13.36); box(r,.62,.5,.32,STEIN,x,.25,-13.34); box(r,.6,.18,.32,GOLD,x,4.42,-13.34);
    [-.1,.1].forEach(v=>box(r,.05,3.5,.03,MARMOR2,x+v,2.35,-13.21));
    /* Goldleiste um die Öffnung */
    box(r,.09,4.05,.05,GOLD,s*1.92,2.02,-13.46); });
  box(r,5.4,.34,.34,MARMOR,0,4.84,-13.33); box(r,5.7,.14,.46,GOLD,0,5.07,-13.28);
  /* Schild über dem Ausgang: aufgeschlagenes goldenes Buch in einem Bogen */
  liegend(walze(r,.86,.14,GOLD,0,5.5,-13.42)); liegend(walze(r,.72,.18,SAMT2,0,5.5,-13.41));
  [-1,1].forEach(s=>{ const a=box(r,.5,.5,.08,PAPIER,s*.27,5.56,-13.27); a.rotation.z=s*.2; [-.1,.04,.18].forEach(y=>{ const l=box(r,.34,.035,.02,STEIN2,s*.28,5.54+y,-13.22); l.rotation.z=s*.2; }); });
  box(r,.06,.56,.1,MESSING2,0,5.5,-13.24);
  /* Laufschiene reicht nach links, damit man sieht, wohin das Regal fährt */
  box(r,8.9,.12,.14,MESSING,-2.15,4.53,-12.8); [-6.55,2.25].forEach(x=>{ ball(r,.14,GOLD,x,4.53,-12.8); box(r,.1,.1,.6,MESSING2,x,4.53,-13.1); });
  box(r,8.9,.025,.12,MESSING2,-2.15,.016,-12.62);
  verschmelze(r);
  const glanz=[-1,1].map(s=>schein(hinten,'rgba(255,215,110,.55)',s*2.34,4.0,-13.0,1.3));
  [-1,1].forEach(s=>hell(ball(hinten,.2,GLUEH,s*2.34,4.0,-13.15,1,1.3,.8)));

  /* das Regal selbst: rötliches Kirschholz mit Goldrahmen, auf Rollen */
  const s=gruppe(hinten,0,0,0); s.userData.lebendig=true;
  const re=BIB.regal(s,0,0,3.86,4.05,KIRSCH2); re.position.z=-12.9; re.scale.z=.62;
  [-1,1].forEach(v=>{ box(s,.12,4.16,.08,GOLD,v*1.93,2.1,-12.63); [.1,4.14].forEach(y=>ball(s,.13,GOLD,v*1.93,y,-12.61,1,1,.6)); });
  [.12,4.17].forEach(y=>box(s,4.0,.12,.08,GOLD,0,y,-12.62));
  [-1.35,1.35].forEach(x=>{ box(s,.09,.32,.07,MESSING2,x,4.35,-12.74); liegend(walze(s,.15,.09,MESSING,x,4.54,-12.69)); liegend(walze(s,.05,.11,HOLZ3,x,4.54,-12.68)); });
  /* Schlossplatte */
  box(s,3.86,.16,.07,GOLD,0,2.55,-12.57);
  box(s,1.5,1.34,.07,SAMT2,0,2.5,-12.55); [-.74,.74].forEach(x=>box(s,.08,1.4,.1,GOLD,x,2.5,-12.54)); [-.68,.68].forEach(y=>box(s,1.56,.08,.1,GOLD,0,2.5+y,-12.54));
  const schloss=BIB.zahlenschloss(s,0,2.38,-12.42); schloss.scale.setScalar(1.18);
  verschmelze(s);
  const schimmer=schein(s,'rgba(255,225,120,.6)',0,2.5,-12.3,1.5);

  const licht=new THREE.PointLight(0xffd488,0,12,1.5); licht.position.set(0,2.8,-14.6); sc.add(licht);
  k.kasten(0,-13.05,4.9,.9);
  return ausgang(k,{ name:'Schiebe-Regal', einfach:'Regal zum Schieben', steh:[0,-11.4], durch:[0,-15.4],
    treffer:{x:0,y:2.4,z:-12.8,b:4.4,h:4.5,t:.8}, schildOben:[0,4.1,-11.9], glanz:[0,2.5,-12.1],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.04)/.92)), w=a*a*(3-2*a);
      s.position.x=-4.22*w; gang.visible=auf>.02; licht.intensity=1.5*auf;
      schimmer.visible=auf<.5; const g=1.45+Math.sin(t*2.2)*.2; schimmer.scale.set(g,g,1);
      glanz.forEach((q,i)=>{ const h=1.25+Math.sin(t*3+i*2)*.15+auf*.8; q.scale.set(h,h,1); }); } });
}

/* ---------- Wände: Regale, Fenster, obere Bücherreihen, Wandlampen ---------- */
function vorhang(g,x,y,z,dreh){
  const v=gruppe(g,x,y,z); v.rotation.y=dreh;
  box(v,3.3,.1,.14,MESSING2,0,3.95,.2); [-1.68,1.68].forEach(a=>ball(v,.12,GOLD,a,3.95,.2));
  [-1,1].forEach(s=>{ [0,1,2].forEach(i=>walze(v,.13,3.55,i%2?SAMT2:SAMT,s*(1.2+i*.17),2.1,.14)); box(v,.6,.14,.34,GOLD,s*1.37,1.35,.14); });
}
function wandDeko(k,sc,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  /* Rückwand: hohe Regale und zwei Fenster */
  [-1,1].forEach(s=>{
    [[10.7,2.7],[16.45,2.9]].forEach(([x,b])=>{ BIB.regal(h,s*x,-13.1,b,4.8); k.kasten(s*x,-13.1,b+.2,.85); });
    BIB.bogenfenster(h,s*13.55,1.45,-13.44,2.2,3.7,['#7fc0f0','#fdf0d0']); vorhang(h,s*13.55,1.35,-13.45,0);
    /* Fensterbank mit Kissen */
    box(h,2.1,.5,.75,HOLZ,s*13.55,.25,-13.1); box(h,1.95,.18,.68,TUERKIS,s*13.55,.59,-13.08); [-.5,.5].forEach(a=>ball(h,.27,s>0?0xd8a73a:SAMT,s*13.55+a,.86,-13.2,1.2,1,.55)); k.kasten(s*13.55,-13.1,2.2,.85);
    /* Wandlampen neben dem Ausgang */
    const x=s*3.8; box(h,.3,.5,.06,MESSING2,x,2.9,-13.46); box(h,.07,.07,.1,MESSING,x,2.95,-13.41); rohr(h,.1,.18,.3,LAMPE,x,3.2,-13.36); hell(ball(h,.08,GLUEH,x,3.02,-13.36));
    schein(hinten,'rgba(255,225,140,.45)',x,3.05,-13.2,1.0);
  });
  /* Seitenwände */
  const seite=(g,v,regale,fenster)=>{ const dreh=-v*Math.PI/2;
    regale.forEach(([z,b])=>{ const r=BIB.regal(g,v*17.58,z,b,4.8); r.rotation.y=dreh; k.kasten(v*17.55,z,.9,b+.2); });
    fenster.forEach(z=>{ const f=BIB.bogenfenster(g,v*17.94,1.45,z,2.2,3.7,['#7fc0f0','#fdf0d0']); f.rotation.y=dreh; vorhang(g,v*17.95,1.35,z,dreh); });
  };
  seite(L,-1,[[-9.8,4.2],[1.25,3.0],[9.2,3.8]],[5.1]);
  seite(R,1,[[-10.1,4.2],[-5.6,3.6],[2.5,4.0],[7.0,3.8]],[-1.5,11.2]);
  /* obere Bücherreihe auf Wandbrettern */
  const reihe=(par,g,von,bis,wo)=>{ const liste=[]; let a=von;
    while(a<bis-.3){ const w=.13+zufall()*.13, hh=.5+zufall()*.4; if(zufall()<.06){ a+=.3; continue; }
      const p=wo(a+w/2); liste.push([p[0],5.56+hh/2,p[1],p[2]?.42:w,hh,p[2]?w:.42,BUCH[Math.floor(zufall()*BUCH.length)]]); a+=w+.02; }
    BIB.viele(par,GEO.box,liste);
    const m=(von+bis)/2, p=wo(m), l=bis-von+.2; box(g,p[2]?.55:l,.12,p[2]?l:.55,HOLZ2,p[0],5.48,p[1]);
    for(let q=von+.2;q<bis;q+=2.1){ const e=wo(q); box(g,p[2]?.34:.12,.3,p[2]?.12:.34,HOLZ3,p[2]?e[0]*1.004:e[0],5.28,p[2]?e[1]:e[1]-.08); } };
  [-1,1].forEach(s=>{ reihe(hinten,h,s<0?-17.4:3.4,s<0?-3.4:17.4,a=>[a,-13.22,false]); });
  reihe(links,L,-12.6,-6.6,a=>[-17.72,a,true]); reihe(links,L,-.4,12.8,a=>[-17.72,a,true]); reihe(rechts,R,-12.6,12.8,a=>[17.72,a,true]);
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Möbel ---------- */
/* langer Lesetisch mit zwei Holzbänken, grüner Tischlampe, Schreibzeug und kleinen Bücherstapeln */
function lesetisch(k,g,sc,x,z,b,variante){
  const t=gruppe(g,x,0,z);
  [-1,1].forEach(s=>{ [-.58,.58].forEach(v=>{ walze(t,.1,1.05,HOLZ2,s*(b/2-.25),.53,v); ball(t,.14,HOLZ2,s*(b/2-.25),.5,v); }); box(t,.12,.14,1.2,HOLZ3,s*(b/2-.25),.3,0); });
  box(t,b,.16,1.6,HOLZ,0,1.12,0); box(t,b-.3,.14,1.35,HOLZ2,0,.99,0); box(t,b-.7,.02,.8,GRUEN,0,1.21,0);
  [-1,1].forEach(s=>{ const bz=s*1.25; box(t,b-.5,.13,.46,KIRSCH,0,.6,bz); box(t,b-.65,.07,.36,s>0?SAMT:TUERKIS,0,.69,bz); [-1,1].forEach(v=>box(t,.16,.56,.4,HOLZ2,v*(b/2-.55),.28,bz)); });
  /* Tintenfass mit Feder */
  const tx=variante?-.55:.55; walze(t,.12,.18,BLAU,tx,1.3,-.35); walze(t,.07,.06,MESSING,tx,1.42,-.35); strich(t,[tx,1.4,-.35],[tx+.28,1.95,-.45],.018,WEISS); const f=ball(t,.17,WEISS,tx+.24,1.84,-.43,.35,1.2,.15); f.rotation.z=-.46;
  /* kleiner Stapel geschlossener Bücher */
  [[0,ROT],[1,BLAU],[2,GRUEN]].slice(0,variante?2:3).forEach(([i,c])=>{ const q=gruppe(t,(variante?1:-1)*(b/2-.75),1.27+i*.14,.15); q.rotation.y=(i-1)*.22; box(q,.62-i*.07,.13,.44,c,0,0,0); box(q,.56-i*.07,.08,.42,PAPIER,.05,0,.025); });
  BIB.tischlampe(g,x+(variante?-1:1)*(b/2-1.05),1.2,z+.05);
  k.kasten(x,z,b,3.0);
}
/* niedriges Bücherbord im Raum (vorn) */
function bord(k,g,x,z,b,dreh){
  const r=BIB.regal(g,x,z,b,1.5,HOLZ); r.rotation.y=dreh||0;
  const quer=Math.abs(Math.sin(dreh||0))>.5; k.kasten(x,z,quer?.9:b+.2,quer?b+.2:.9);
}
/* Zettelkatalog: Schrank mit vielen kleinen Schubladen */
function katalog(k,g,x,z){
  const q=gruppe(g,x,0,z); q.rotation.y=Math.PI; q.scale.setScalar(.7);
  box(q,3.0,1.35,.8,HOLZ,0,.82,0); box(q,3.16,.14,.94,HOLZ2,0,1.55,0); [-1.35,1.35].forEach(a=>box(q,.18,.16,.7,HOLZ3,a,.08,0));
  for(let i=0;i<6;i++) for(let j=0;j<4;j++){ const a=-1.2+i*.48, y=.34+j*.31; box(q,.43,.26,.04,KIRSCH,a,y,.41); box(q,.18,.08,.02,PAPIER,a,y+.04,.44); ball(q,.035,GOLD,a,y-.06,.45); }
  box(q,.5,.26,.34,TUERKIS,-.9,1.75,0); for(let i=0;i<6;i++) box(q,.04,.24,.28,i%2?PAPIER:PAPIER2,-1.08+i*.07,1.9,0);
  k.kasten(x,z,2.3,.75);
}
/* niedrige Polsterbank ohne Lehne */
function lesebank(k,g,x,z,c){
  [-1,1].forEach(s=>{ box(g,.18,.34,.55,HOLZ2,x+s*.95,.17,z); ball(g,.1,GOLD,x+s*.95,.36,z-.28); });
  box(g,2.3,.14,.66,HOLZ,x,.4,z); box(g,2.15,.16,.56,c,x,.54,z); [-.55,0,.55].forEach(a=>ball(g,.05,GOLD,x+a,.63,z));
  k.kasten(x,z,2.35,.7);
}
/* grüne Stehlampe */
function stehlampe(k,g,sc,x,z){
  walze(g,.38,.1,MESSING2,x,.05,z); walze(g,.045,2.7,MESSING,x,1.4,z); ball(g,.1,GOLD,x,1.5,z);
  rohr(g,.28,.6,.6,LAMPE,x,2.95,z,18,true); const r=ring(g,.6,.035,MESSING,x,2.65,z); r.rotation.x=Math.PI/2; hell(ball(g,.2,GLUEH,x,2.74,z));
  schein(sc,'rgba(255,225,140,.55)',x,2.6,z,2.0); k.kreis(x,z,.45);
}
/* Rollleiter an einem Regal der rechten Wand */
function leiter(k,g,z){
  [-.45,.45].forEach(v=>{ strich(g,[15.95,.12,z+v],[17.12,4.75,z+v],.07,HOLZ); ball(g,.14,SCHWARZ,15.95,.14,z+v); ball(g,.11,GOLD,17.12,4.76,z+v); });
  for(let i=1;i<10;i++){ const u=i/10.3; box(g,.26,.07,.9,HOLZ2,15.95+1.17*u,.12+4.63*u,z); }
  k.kasten(16.5,z,1.5,1.2);
}

/* ---------- Lichtstrahlen aus den Fenstern mit tanzendem Staub ---------- */
function staubLicht(k,sc){
  const strahlen=[[[-13.55,3.9,-13.2],[-11.4,.1,-8.6]],[[13.55,3.9,-13.2],[11.0,.1,-8.9]],[[-17.7,3.9,5.1],[-13.2,.1,6.6]]];
  const M=basis(0xffefb0,{transparent:true,opacity:.07,depthWrite:false,side:THREE.DoubleSide});
  strahlen.forEach(([a,b])=>{ const A=V(a[0],a[1],a[2]), E=V(b[0],b[1],b[2]), d=E.clone().sub(A), l=d.length();
    const m=new THREE.Mesh(new THREE.CylinderGeometry(1.25,.65,l,20,1,true),M); m.position.copy(A).addScaledVector(d,.5); m.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); sc.add(m); });
  const n=75, staub=new THREE.InstancedMesh(GEO.box,basis(0xfff4c8,{transparent:true,opacity:.75,depthWrite:false}),n), o=new THREE.Object3D(), D=[];
  for(let i=0;i<n;i++) D.push([zufall()*6.283,Math.sqrt(zufall()),zufall(),.018+zufall()*.028]);
  staub.frustumCulled=false; sc.add(staub);
  k.anim.push(t=>{ D.forEach((d,i)=>{ const [a,b]=strahlen[i%3], u=(d[2]+t*.022)%1, w=a[0]+(b[0]-a[0])*u, y=a[1]+(b[1]-a[1])*u, z=a[2]+(b[2]-a[2])*u, r=d[1]*(.5+u*.6), v=d[0]+t*.18*(i%2?1:-1);
    o.position.set(w+Math.cos(v)*r,Math.max(.15,y+Math.sin(v*1.7)*.3),z+Math.sin(v)*r); o.rotation.set(t+i,t*.6+i,0); o.scale.set(d[3],d[3],d[3]); o.updateMatrix(); staub.setMatrixAt(i,o.matrix); }); staub.instanceMatrix.needsUpdate=true; });
}

function baue(k){
  const sc=k.scene;
  GLUEH=basis(0xfff0a8); KERZE=basis(0xffb030);
  const h=BIB.huelle(k,{ B,T,H, himmelLicht:0xffe8c8, grund:0x54381f, staerke:.74, sonne:0xffe0b0, sonneStaerke:.4,
    wandBild:BIB.tapeteBild('#c9a874','rgba(110,60,25,.22)'), bodenBild:BIB.dielenBild([160,108,64]), leiste:HOLZ2, sockel:1.3, oeffnung:{x:0,b:3.74,h:4.0} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueAusgang(k,sc,hinten);
  wandDeko(k,sc,hinten,links,rechts);

  /* ---------- Teppiche (nicht überlappend) ---------- */
  BIB.teppich(sc,0,-.1,7.4,10.6,SAMT,MESSING2);
  BIB.teppich(sc,0,-8.95,2.7,6.6,SAMT2,GOLD);
  BIB.teppich(sc,-12.2,5.9,5.8,4.8,BLAU,0xd8b878);
  BIB.teppich(sc,-14.2,-2.8,3.4,5.0,GRUEN,0xd8b878);
  BIB.teppich(sc,6.4,7.8,5.0,4.2,TUERKIS,MESSING2);
  BIB.teppich(sc,10.6,3.0,4.6,3.2,LILA,MESSING2);

  /* ---------- Möbel ---------- */
  const m=gruppe(sc,0,0,0);
  lesetisch(k,m,sc,-10.4,-8.1,4.4,0);
  lesetisch(k,m,sc,-4.7,-6.2,3.4,1);
  lesetisch(k,m,sc,9.3,-8.5,4.0,1);
  lesetisch(k,m,sc,13.7,-1.2,3.4,0);
  stehlampe(k,m,sc,-14.5,4.2);
  stehlampe(k,m,sc,16.2,-12.0);
  stehlampe(k,m,sc,-16.2,-12.0);
  bord(k,m,-10.2,11.7,3.6,0); bord(k,m,9.8,12.0,3.4,Math.PI);
  bord(k,m,13.6,8.9,3.4,-Math.PI/2); bord(k,m,-14.6,10.0,2.6,Math.PI/2);
  katalog(k,m,0,12.35);
  leiter(k,m,3.2);
  /* Deko auf den vorderen Borden: Vase, Kerzen, kleine Eulenfigur aus Messing */
  walze(m,.2,.06,TUERKIS,-11.2,1.71,11.7); rohr(m,.32,.17,.55,TUERKIS,-11.2,2.0,11.7,18,true); liegend(ring(m,.32,.035,GOLD,-11.2,2.28,11.7));
  [[-.28,2.75,SAMT],[0,2.95,GOLD],[.27,2.7,0xe878a0]].forEach(([a,y,c])=>{ strich(m,[-11.2,1.8,11.7],[-11.2+a,y,11.7],.022,BLATT); for(let i=0;i<5;i++){ const w=i*1.2566; ball(m,.075,c,-11.2+a+Math.cos(w)*.08,y+Math.sin(w)*.08,11.7); } ball(m,.055,PAPIER,-11.2+a,y,11.64); ball(m,.1,BLATT2,-11.2+a*.6,2.38,11.7,1.2,.45,.6); });
  [-9.6,-9.2].forEach((x,i)=>kerze(m,x,1.66,11.7,.35+i*.15));
  ball(m,.24,MESSING,10.4,1.94,12.0,1,1.2,.9); ball(m,.19,MESSING,10.4,2.28,12.0); [-1,1].forEach(s=>{ ball(m,.07,SCHWARZ,10.4+s*.08,2.31,11.83); kegel(m,.06,.14,MESSING2,10.4+s*.13,2.48,12.0); });
  /* Holzstapel neben dem Kamin */
  [[0,0],[.36,0],[.72,0],[.18,.3],[.54,.3],[.36,.6]].forEach(([a,y])=>{ const s=walze(m,.18,.9,HOLZ,-17.45,.19+y,-7.0+a*.9+.06); s.rotation.z=Math.PI/2; const e=walze(m,.12,.92,0xd8b078,-17.45,.19+y,-7.0+a*.9+.06); e.rotation.z=Math.PI/2; });
  k.kasten(-17.45,-6.7,.9,1.2);
  /* flache Randdeko vorn: Läufer, niedrige Polsterbänke, Einlegestreifen im Boden */
  [[-5.8,TUERKIS],[5.4,SAMT]].forEach(([x,c])=>{ lesebank(k,m,x,12.45,c); });
  BIB.teppich(sc,-5.9,11.0,4.0,1.8,SAMT,0xd8b878); BIB.teppich(sc,5.4,11.15,3.4,1.8,BLAU,0xd8b878);
  const einlage=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ box(einlage,.16,.01,12.4,HOLZ3,v*16.55,.006,6.4); box(einlage,.07,.01,12.4,MESSING2,v*16.3,.006,6.4); });
  box(einlage,33.1,.01,.16,HOLZ3,0,.007,13.15); box(einlage,32.6,.01,.07,MESSING2,0,.007,12.98);
  ohneSchatten(einlage); verschmelze(einlage);
  BIB.stapel(m,-8.0,0,9.9,3,.5); k.kreis(-8.0,9.9,.5); BIB.stapel(m,12.0,0,6.5,2,-.4); k.kreis(12.0,6.5,.5);
  verschmelze(m);

  /* ---------- Hängelampen über den Lesetischen (klein, hoch, blenden vor der Figur aus) ---------- */
  [[-10.4,-8.1],[-4.7,-6.2],[9.3,-8.5],[13.7,-1.2]].forEach(([x,z])=>{ const l=BIB.lampe(sc,x,4.15,z); l.scale.setScalar(.72); k.verdecker(l,x,z,.45); });
  flacker(k,-7.4,3.3,-6.6,0xffdc90,.42,10);
  flacker(k,9.8,3.3,-6.4,0xffdc90,.42,10);
  flacker(k,-12.4,2.6,5.4,0xffd488,.36,8);
  flacker(k,12.6,3.2,2.6,0xffd488,.32,9);
  flacker(k,-16.0,1.3,-3.5,0xff8a30,.85,9);

  staubLicht(k,sc);

  /* ---------- Leben: die Bibliothekskatze ---------- */
  katze(k,[[-2.8,-2.4],[1.6,-2.2],[2.9,1.2],[6.6,2.6],[7.0,4.4],[2.6,5.4],[2.3,9.6],[-1.8,9.8],[-2.8,4.2],[-7.4,3.6],[-9.4,1.2],[-9,-2.4],[-5.4,-2.8]],.95);

  return { tuer, start:[0,5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.6,-11.0],[-15.2,-6.4],[-11.2,-3.2],[-7.4,-3.6],[-2.8,-10.6],[3.2,-8.4],[13.6,-10.8],[15.8,-5.6],[8.2,-3.4],[15.6,1.2],[14.6,4.4],[15.8,11.8],[11.4,9.4],[3.6,11.6],[-6.8,11.6],[-16.4,12.0],[-15.8,1.6],[-8.4,6.4],[3.0,-.6],[-3.4,2.0]];

/* ---------- Bilder ---------- */
function globusBild(){
  return bild(512,256,(g)=>{ g.fillStyle='#3f93c4'; g.fillRect(0,0,512,256);
    g.strokeStyle='rgba(255,255,255,.35)'; g.lineWidth=2; for(let x=0;x<=512;x+=43){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,256); g.stroke(); } for(let y=32;y<256;y+=32){ g.beginPath(); g.moveTo(0,y); g.lineTo(512,y); g.stroke(); }
    const land=(c,p)=>{ g.fillStyle=c; g.beginPath(); p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y)); g.fill(); };
    land('#78b050',[[40,50],[100,36],[140,62],[118,92],[96,100],[88,122],[66,96],[46,80]]); land('#d0a848',[[104,128],[142,140],[150,166],[126,208],[112,180],[96,150]]);
    land('#d0a848',[[236,96],[284,90],[306,122],[286,140],[272,178],[250,146],[230,120]]); land('#78b050',[[240,50],[300,34],[390,40],[430,70],[392,96],[366,126],[344,98],[300,80],[250,76]]);
    land('#c87848',[[400,160],[448,152],[466,180],[430,194],[402,184]]); land('#f4f4ec',[[0,236],[120,228],[260,240],[400,226],[512,238],[512,256],[0,256]]); land('#f4f4ec',[[150,0],[230,0],[214,22],[170,26]]); });
}
function portraetBild(){
  return bild(384,480,(g)=>{ const v=g.createRadialGradient(192,170,20,192,220,320); v.addColorStop(0,'#6a9a84'); v.addColorStop(1,'#1f3a32'); g.fillStyle=v; g.fillRect(0,0,384,480);
    const oval=(x,y,rx,ry,c)=>{ g.fillStyle=c; g.beginPath(); g.ellipse(x,y,rx,ry,0,0,7); g.fill(); };
    /* Kleid und weißer Kragen */
    g.fillStyle='#4a2a58'; g.beginPath(); g.moveTo(52,480); g.quadraticCurveTo(70,312,192,300); g.quadraticCurveTo(314,312,332,480); g.fill();
    g.fillStyle='#e8b898'; g.fillRect(168,260,48,58);
    g.fillStyle='#f6f0e0'; g.beginPath(); g.moveTo(132,308); g.lineTo(192,360); g.lineTo(252,308); g.quadraticCurveTo(192,334,132,308); g.fill(); oval(192,364,15,18,'#e8b830'); oval(192,364,7,9,'#b8362a');
    /* Haar mit Dutt */
    oval(192,80,46,38,'#b8b4b0'); oval(192,180,104,112,'#c4c0bc'); oval(192,198,78,92,'#f0c4a4');
    g.fillStyle='#c4c0bc'; g.beginPath(); g.moveTo(110,182); g.quadraticCurveTo(118,96,196,102); g.quadraticCurveTo(268,104,276,182); g.quadraticCurveTo(240,128,190,136); g.quadraticCurveTo(140,132,110,182); g.fill();
    /* Gesicht mit runder Brille und Lächeln */
    g.strokeStyle='#3a2a1a'; g.lineWidth=5; [158,226].forEach(x=>{ g.beginPath(); g.arc(x,194,25,0,7); g.stroke(); oval(x,196,6,7,'#2a1a10'); }); g.beginPath(); g.moveTo(183,192); g.quadraticCurveTo(192,184,201,192); g.stroke();
    oval(142,232,15,9,'rgba(220,110,90,.45)'); oval(242,232,15,9,'rgba(220,110,90,.45)');
    g.strokeStyle='#c8947a'; g.lineWidth=4; g.beginPath(); g.moveTo(192,204); g.lineTo(186,230); g.lineTo(196,232); g.stroke();
    g.strokeStyle='#a0403a'; g.lineWidth=6; g.beginPath(); g.arc(192,236,28,.35,Math.PI-.35); g.stroke();
    /* Buch in den Händen */
    g.fillStyle='#8a2a2a'; g.fillRect(128,408,128,72); g.fillStyle='#e8b830'; g.fillRect(142,424,100,6); g.fillRect(158,442,68,5); oval(124,442,18,24,'#f0c4a4'); oval(260,442,18,24,'#f0c4a4'); });
}
function brettBild(){
  return bild(256,256,(g)=>{ for(let i=0;i<8;i++) for(let j=0;j<8;j++){ g.fillStyle=(i+j)%2?'#5a2e14':'#f6e4bc'; g.fillRect(i*32,j*32,32,32); } });
}

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-6.8, z:.8, dreh:.22, steh:[-6.35,2.75], r:.95, treffer:[2.2,2.8,1.7], baue(g,k){ /* 1 Lesepult mit großem aufgeschlagenem Buch */
      box(g,1.5,.18,1.15,HOLZ2,0,.09,0); box(g,1.1,.14,.85,HOLZ,0,.25,0); walze(g,.17,1.2,KIRSCH,0,.9,0); [.45,.85,1.35].forEach(y=>ball(g,.24,HOLZ2,0,y,0,1,.55,1));
      [-1,1].forEach(s=>strich(g,[s*.55,.28,0],[s*.12,.75,0],.08,KIRSCH));
      const p=gruppe(g,0,1.72,0); p.rotation.x=.62;
      box(p,2.05,.13,1.35,KIRSCH,0,0,0); box(p,2.05,.2,.12,HOLZ2,0,.12,.66); box(p,2.1,.05,.06,GOLD,0,.08,-.66);
      box(p,1.86,.1,1.08,BLAU,0,.12,0);
      [-1,1].forEach(s=>{ const a=gruppe(p,s*.44,.22,0); a.rotation.z=-s*.07; box(a,.86,.12,.98,PAPIER2,0,-.02,0); box(a,.84,.05,.96,WEISS,0,.055,0);
        for(let i=0;i<6;i++){ if(s<0 && i<3) continue; box(a,i%3===2?.4:.64,.012,.045,0x6a5a48,i%3===2?-.12:0,.087,-.33+i*.13); }
        if(s<0){ box(a,.36,.012,.34,ROT,-.14,.087,-.22); ball(a,.1,GOLD,-.14,.095,-.22,1,.15,1); box(a,.2,.012,.045,0x6a5a48,.22,.087,-.3); box(a,.2,.012,.045,0x6a5a48,.22,.087,-.17); } });
      box(p,.07,.1,1.04,PAPIER2,0,.24,0); box(p,.09,.03,1.15,ROT,.03,.33,.08); box(p,.09,.34,.03,ROT,.03,.18,.73);
      const glanz=schein(g,'rgba(255,240,170,.55)',0,2.35,.1,1.4);
      k.anim.push(t=>{ glanz.material.opacity=.45+Math.sin(t*1.7)*.2; }); } },
  { x:4.8, z:-4.2, steh:[4.8,-2.2], r:1.05, treffer:[2.3,3.2,2.0], baue(g,k){ /* 2 Globus im Holzgestell mit Messingbügel */
      walze(g,.75,.14,HOLZ2,0,.07,0); walze(g,.45,.12,HOLZ,0,.2,0); walze(g,.12,.75,KIRSCH,0,.62,0); ball(g,.22,HOLZ2,0,.6,0,1,.7,1); ball(g,.17,MESSING,0,1.02,0);
      [0,1,2].forEach(i=>{ const a=i*2.094+.5; strich(g,[Math.cos(a)*.85,.08,Math.sin(a)*.85],[0,.55,0],.08,KIRSCH); ball(g,.12,GOLD,Math.cos(a)*.85,.11,Math.sin(a)*.85); });
      const achse=gruppe(g,0,2.13,0); achse.rotation.z=.38;
      const bogen=ring(achse,1.08,.055,MESSING,0,0,0,Math.PI); bogen.rotation.z=Math.PI/2;
      [-1,1].forEach(s=>{ walze(achse,.045,.2,MESSING2,0,s*1.02,0); ball(achse,.11,GOLD,0,s*1.13,0); });
      const kugel=gruppe(achse,0,0,0); kugel.userData.lebendig=true;
      const m=new THREE.Mesh(new THREE.SphereGeometry(.93,32,22),new THREE.MeshLambertMaterial({map:globusBild()})); m.castShadow=true; kugel.add(m);
      const reif=ring(g,1.2,.06,HOLZ,0,1.55,0); reif.rotation.x=Math.PI/2; reif.scale.set(.93,.93,1);
      [-1,1].forEach(s=>strich(g,[s*1.1,1.55,0],[0,1.0,0],.045,MESSING2));
      k.anim.push(t=>{ kugel.rotation.y=t*.22; }); } },
  { x:10.2, z:2.8, dreh:-.18, steh:[10.0,4.85], kasten:[3.0,1.7], treffer:[3.1,2.5,1.5], baue(g){ /* 3 Bücherwagen auf vier Rädern mit Schiebegriff */
      [-1,1].forEach(s=>[-.52,.52].forEach(v=>{ liegend(walze(g,.27,.14,SCHWARZ,s*.98,.27,v)); liegend(walze(g,.12,.17,MESSING,s*.98,.27,v)); }));
      [-1.18,1.18].forEach(x=>[-.46,.46].forEach(v=>{ box(g,.13,1.55,.13,TUERKIS,x,1.15,v); ball(g,.1,GOLD,x,1.96,v); }));
      [.52,1.32].forEach((y,e)=>{ box(g,2.5,.13,1.06,HOLZ,0,y,0); [-.5,.5].forEach(v=>box(g,2.5,.12,.07,TUERKIS,0,y+.12,v));
        [-.22,.22].forEach((z,hinten)=>{ let a=-1.04, i=e*3+hinten*2; while(a<1.0){ const w=.15+(i%3)*.045, hh=.46+((i*5)%4)*.055; if(a+w>1.08) break;
          if(e===1 && z>0 && a>.38){ const q=box(g,.17,.55,.34,BUCH[i%8],a+.3,y+.32,z); q.rotation.z=.45; break; }
          box(g,w,hh,.38,BUCH[(i*3)%8],a+w/2,y+.07+hh/2,z); box(g,w+.006,.06,.39,GOLD,a+w/2,y+.07+hh*.72,z); a+=w+.025; i++; } }); });
      [-.46,.46].forEach(v=>strich(g,[1.18,1.85,v],[1.55,2.12,v],.055,MESSING)); strich(g,[1.55,2.12,-.52],[1.55,2.12,.52],.085,SAMT);
      [[0,GRUEN],[1,ROT]].forEach(([i,c])=>{ const q=gruppe(g,-.55,1.98+i*.17,0); q.rotation.y=i*.3-.1; box(q,.78-i*.1,.16,.56,c,0,0,0); box(q,.72-i*.1,.1,.54,PAPIER,.05,0,.025); }); } },
  { x:-11.5, z:6.0, dreh:.55, steh:[-9.75,7.7], r:1.35, treffer:[2.8,3.4,2.2], baue(g){ /* 4 Ohrensessel aus rotem Samt */
      [-.95,.95].forEach(x=>[-.62,.68].forEach(z=>{ walze(g,.1,.34,HOLZ3,x,.17,z); ball(g,.12,GOLD,x,.06,z,1,.6,1); }));
      box(g,2.35,.5,1.7,SAMT2,0,.58,.02);
      box(g,1.5,.34,1.34,SAMT,0,.98,.2); ball(g,.72,SAMT,0,1.12,.2,1.0,.18,.88);
      box(g,1.9,2.0,.42,SAMT,0,1.8,-.68); const kopf=walze(g,.32,1.9,SAMT,0,2.82,-.68); kopf.rotation.z=Math.PI/2; [-.95,.95].forEach(x=>ball(g,.32,SAMT,x,2.82,-.68,.5,1,1));
      [-1,1].forEach(s=>{
        /* Ohren */
        box(g,.28,1.35,.62,SAMT,s*1.02,2.17,-.34); ball(g,.36,SAMT,s*1.04,2.2,-.04,.42,1.7,.9);
        /* Armlehnen mit Rolle */
        box(g,.46,.8,1.55,SAMT,s*1.0,1.05,.1); const a=walze(g,.29,1.6,SAMT,s*1.04,1.47,.12); a.rotation.x=Math.PI/2; liegend(walze(g,.2,.06,SAMT2,s*1.04,1.47,.94)); ball(g,.07,GOLD,s*1.04,1.47,.99); });
      [[-.45,2.35],[0,2.6],[.45,2.35],[-.22,1.95],[.22,1.95],[-.45,1.55],[.45,1.55]].forEach(([x,y])=>ball(g,.065,GOLD,x,y,-.46,1,1,.6));
      /* Zierkissen und gefaltete Decke über der Lehne */
      const ki=box(g,.8,.62,.24,0xe8b848,-.28,1.46,-.34); ki.rotation.set(-.16,0,.18); const st=box(g,.82,.1,.26,TUERKIS,-.28,1.46,-.33); st.rotation.set(-.16,0,.18);
      box(g,.66,.08,.8,TUERKIS,1.05,1.8,.1); box(g,.08,.8,.8,TUERKIS,1.37,1.42,.1); [.2,-.1].forEach(z=>{ box(g,.68,.085,.1,PAPIER,1.05,1.802,z+.05); box(g,.09,.8,.1,PAPIER,1.372,1.42,z+.05); }); } },
  { x:-7.9, z:HINTEN, wand:'hinten', steh:[-7.9,-11.5], kasten:[2.3,1.0], treffer:[2.3,4.4,1.2], trefferY:.55, baue(g,k){ /* 5 Pendeluhr an der Wand */
      const z=.34;
      box(g,1.7,2.2,.5,KIRSCH,0,2.0,.26); box(g,1.9,.16,.64,HOLZ2,0,.9,.3); box(g,1.2,.22,.42,HOLZ2,0,.72,.24); ball(g,.2,GOLD,0,.56,.24);
      box(g,2.0,1.7,.6,KIRSCH,0,3.85,.31); box(g,2.2,.18,.74,HOLZ2,0,3.04,.35); box(g,2.2,.18,.74,HOLZ2,0,4.72,.35);
      liegend(walze(g,.72,.4,HOLZ2,0,4.8,.23)); ball(g,.17,GOLD,0,5.6,.25); [-.95,.95].forEach(x=>{ ball(g,.14,GOLD,x,4.92,.45); walze(g,.07,1.5,GOLD,x*.94,3.88,.65); });
      /* Zifferblatt */
      liegend(walze(g,.76,.08,GOLD,0,3.88,.63)); liegend(walze(g,.65,.1,WEISS,0,3.88,.64));
      for(let i=0;i<12;i++){ const a=i*Math.PI/6; const q=box(g,.05,i%3?.08:.15,.02,SCHWARZ,Math.sin(a)*.54,3.88+Math.cos(a)*.54,.7); q.rotation.z=-a; }
      const zeiger=[[.34,.075],[.5,.05]].map(([l,d],i)=>{ const q=gruppe(g,0,3.88,.73+i*.03); q.userData.lebendig=true; box(q,d,l,.03,SCHWARZ,0,l/2-.05,0); return q; });
      ball(g,.08,GOLD,0,3.88,.78);
      /* Pendelkasten mit Fenster */
      box(g,1.18,1.86,.04,SCHWARZ,0,2.0,.52); [-.65,.65].forEach(x=>box(g,.12,2.0,.1,GOLD,x,2.0,.56)); [1.02,2.98].forEach(y=>box(g,1.42,.1,.1,GOLD,0,y,.56));
      const pendel=gruppe(g,0,2.9,.6); pendel.userData.lebendig=true; box(pendel,.07,1.35,.04,MESSING,0,-.68,0); liegend(walze(pendel,.3,.09,GOLD,0,-1.42,.02)); liegend(walze(pendel,.15,.11,MESSING2,0,-1.42,.025)); verschmelze(pendel);
      const glas=new THREE.Mesh(new THREE.PlaneGeometry(1.18,1.86),basis(0xbfe4f0,{transparent:true,opacity:.14,depthWrite:false})); glas.position.set(0,2.0,.74); g.add(glas);
      k.anim.push(t=>{ pendel.rotation.z=Math.sin(t*2.6)*.24; zeiger[0].rotation.z=-2.2-t*.012; zeiger[1].rotation.z=-t*.14; }); } },
  { x:7.5, z:HINTEN, wand:'hinten', steh:[7.0,-11.5], kasten:[2.8,.8], treffer:[2.9,3.8,.8], trefferY:1.15, baue(g,k){ /* 6 Porträt der Gründerin im Goldrahmen */
      box(g,2.7,3.28,.14,GOLD,0,3.0,.08); box(g,2.4,2.98,.18,MESSING2,0,3.0,.09); box(g,2.24,2.82,.2,HOLZ3,0,3.0,.095);
      const b=new THREE.Mesh(new THREE.PlaneGeometry(2.12,2.68),new THREE.MeshLambertMaterial({map:portraetBild()})); b.position.set(0,3.0,.21); g.add(b);
      [-1,1].forEach(s=>[-1,1].forEach(v=>{ ball(g,.2,GOLD,s*1.33,3.0+v*1.62,.16,1,1,.55); ball(g,.09,MESSING2,s*1.33,3.0+v*1.62,.28); }));
      [4.66,1.34].forEach(y=>ball(g,.26,GOLD,0,y,.14,1.8,.7,.5));
      /* Namensschild und Bilderleuchte */
      box(g,1.2,.3,.08,MESSING,0,1.02,.08); [-.03,.07].forEach((y,i)=>box(g,i?.8:.55,.04,.02,HOLZ3,0,1.0+y,.13));
      strich(g,[0,4.85,.06],[0,5.0,.45],.04,MESSING2); const l=walze(g,.1,1.2,MESSING,0,5.0,.5); l.rotation.z=Math.PI/2; box(g,1.0,.04,.1,basis(0xfff2b0),0,4.9,.52).castShadow=false;
      schein(g,'rgba(255,230,150,.4)',0,4.6,.55,1.6); } },
  { x:12.8, z:-5.4, dreh:-.35, steh:[12.0,-3.55], r:.95, treffer:[1.9,3.8,1.6], baue(g){ /* 7 Büste eines Dichters mit Lorbeerkranz auf einer Säule */
      const W=MARMOR, G=MARMOR2;
      box(g,1.35,.22,1.35,STEIN2,0,.11,0); box(g,1.15,.18,1.15,STEIN,0,.31,0); walze(g,.42,1.25,0x3f5a4a,0,1.0,0); [0,1,2,3,4,5,6,7].forEach(i=>{ const a=i*.785; walze(g,.07,1.2,0x587868,Math.sin(a)*.4,1.0,Math.cos(a)*.4); });
      walze(g,.5,.1,GOLD,0,1.65,0); box(g,1.15,.16,1.15,STEIN,0,1.78,0); box(g,.5,.2,.08,GOLD,0,.32,.58);
      walze(g,.34,.16,G,0,1.94,0);
      ball(g,.62,W,0,2.26,0,1.15,.7,.72); [-1,1].forEach(s=>{ strich(g,[s*.5,2.46,.2],[s*.04,2.12,.45],.09,G); }); ball(g,.08,G,0,2.12,.48);
      walze(g,.17,.34,W,0,2.7,0);
      ball(g,.43,W,0,3.1,.02,.96,1.12,.94);
      /* Locken */
      for(let i=0;i<22;i++){ const a=i*2.4, u=(i%7)/7, x=Math.cos(a)*.38, z=Math.sin(a)*.36-.08; if(z>.16 && u<.75) continue; ball(g,.15,G,x*(1-u*.3),2.96+u*.55,z); }
      ball(g,.34,G,0,3.35,-.1,1.15,.8,1);
      [-1,1].forEach(s=>{ ball(g,.075,G,s*.15,3.16,.38,1.2,.75,.5); ball(g,.034,STEIN2,s*.15,3.16,.42); strich(g,[s*.06,3.28,.39],[s*.25,3.27,.35],.025,G); });
      ball(g,.075,W,0,3.04,.43,.8,1.35,1); const mund=ring(g,.12,.022,STEIN2,0,2.97,.39,Math.PI*.7); mund.rotation.z=Math.PI*1.15;
      /* Schnurrbart */
      [-1,1].forEach(s=>{ const q=ball(g,.1,G,s*.1,2.945,.41,1.3,.5,.5); q.rotation.z=-s*.35; });
      /* Lorbeerkranz */
      for(let i=0;i<16;i++){ const a=-2.5+i*(5/15), q=ball(g,.1,i%2?0xc8a020:GOLD,Math.sin(a)*.45,3.39-Math.cos(a)*.0+((i%2)?.05:0),Math.cos(a)*.4,.55,.4,1.35); q.rotation.y=a+1.2; } } },
  { x:-4.6, z:8.0, steh:[-2.9,7.3], r:.95, treffer:[2.1,3.2,1.9], baue(g,k){ /* 8 Topfpflanze mit großen Blättern */
      walze(g,.74,.1,0x8a4422,0,.05,0); rohr(g,.68,.46,1.0,TON,0,.58,0); walze(g,.76,.2,0xc8744a,0,1.12,0); liegend(ring(g,.6,.04,0xe8b878,0,.72,0)); walze(g,.65,.04,0x4a2e1a,0,1.22,0);
      [[-.4,.2],[.35,.3],[.1,-.35],[-.15,.42],[.44,-.15]].forEach(([x,z])=>ball(g,.08,0x6a4428,x,1.25,z,1,.5,1));
      [[0,2.95,.0],[-.75,2.45,.15],[.78,2.5,.05],[-.45,2.05,.62],[.5,1.95,.6],[-.35,2.7,-.5],[.45,2.75,-.4],[-.82,1.75,-.25],[.85,1.8,-.3],[0,2.2,.5]].forEach(([x,y,z],i)=>{
        const bl=gruppe(g,0,0,0); bl.userData.lebendig=i<3; strich(bl,[x*.15,1.2,z*.15],[x*.72,y-.22,z*.72],.045,0x2f6a30);
        const b=gruppe(bl,x,y,z); b.rotation.order='YXZ'; b.rotation.y=Math.atan2(x,z+.001); b.rotation.x=.75;
        ball(b,.46,i%2?BLATT2:BLATT,0,0,0,.72,.13,1); box(b,.035,.03,.78,0x9ad070,0,.062,0); [-1,1].forEach(s=>[-.12,.14].forEach(v=>strich(b,[0,.066,v-.08],[s*.2,.06,v+.1],.012,0x9ad070)));
        if(i<3){ verschmelze(bl); k.anim.push(t=>{ bl.rotation.z=Math.sin(t*.9+i*2)*.018; }); } }); } },
  { x:-18, z:-3.5, dreh:Math.PI/2, wand:'links', steh:[-15.35,-3.5], kasten:[3.9,4.9], treffer:[4.7,3.6,3.0], baue(g,k){ /* 9 Kamin mit prasselndem Feuer */
      /* Schornstein */
      box(g,3.7,3.9,.5,0xa8543a,0,5.0,.25); for(let r=0;r<9;r++) for(let i=0;i<4;i++){ const x=-1.38+i*.92+(r%2?.22:-.22); box(g,.82,.31,.05,(r+i)%3?0xb86244:0x984a32,x,3.5+r*.4,.52); }
      box(g,3.9,.18,.62,HOLZ2,0,6.9,.3);
      /* Steinfassung */
      box(g,4.2,.22,2.0,STEIN2,0,.11,.86);
      [-1,1].forEach(s=>{ box(g,.86,2.5,1.15,STEIN,s*1.65,1.45,.58); box(g,1.0,.3,1.3,STEIN2,s*1.65,.36,.6); box(g,.5,1.5,.06,MARMOR2,s*1.65,1.5,1.17); ball(g,.17,MARMOR,s*1.65,2.45,1.17,1,1,.5); });
      box(g,2.5,2.4,.12,0x241410,0,1.4,.08); box(g,2.5,.6,1.15,STEIN,0,2.45,.58); [-1,1].forEach(s=>{ const q=box(g,.7,.4,1.14,STEIN,s*1.05,2.08,.575); q.rotation.z=-s*.42; });
      box(g,.5,.62,.1,MARMOR2,0,2.46,1.17);
      box(g,4.55,.26,1.5,MARMOR,0,2.84,.72); box(g,4.35,.1,1.36,STEIN2,0,2.66,.68);
      /* Rost und Holzscheite */
      [-.7,-.35,0,.35,.7].forEach(x=>box(g,.07,.07,.8,SCHWARZ,x,.36,.7));
      [[-.28,.5,.55,.25],[.3,.52,.62,-.3],[0,.7,.55,.08]].forEach(([x,y,z,d])=>{ const s=walze(g,.14,1.15,HOLZ2,x,y,z); s.rotation.z=Math.PI/2; s.rotation.y=d; });
      const glutA=basis(0xff5a10), glutB=basis(0xffa030); [-.5,-.12,.28,.56].forEach((x,i)=>hell(ball(g,.1,i%2?glutA:glutB,x,.42,.92,1.3,.6,.9)));
      flamme(k,g,-.4,.55,.66,1.15); flamme(k,g,.28,.6,.62,1.35); flamme(k,g,.02,.5,.92,.8);
      const glut=schein(g,'rgba(255,130,40,.65)',0,1.1,1.25,3.2);
      k.anim.push(t=>{ const a=3.0+Math.sin(t*7.3)*.22+Math.sin(t*13)*.12; glut.scale.set(a,a*.85,1); });
      /* Funkenschutz-Kante */
      box(g,3.0,.1,.07,MESSING,0,.52,1.78); [-1.5,0,1.5].forEach(x=>{ walze(g,.04,.32,MESSING,x,.37,1.78); ball(g,.09,GOLD,x,.6,1.78); });
      /* Sims: Kerzen, Vase, Bücher und ein kleines Segelschiff */
      [-1.9,-1.6,1.9].forEach((x,i)=>kerze(g,x,2.97,.85,[.55,.36,.48][i]));
      ball(g,.2,BLAU,1.3,3.16,.7,1,.95,1); rohr(g,.19,.09,.32,BLAU,1.3,3.46,.7,18,true); liegend(ring(g,.19,.025,GOLD,1.3,3.62,.7));
      [[-.16,3.9,SAMT],[.03,4.02,GOLD],[.18,3.86,0xe878a0]].forEach(([a,y,c])=>{ strich(g,[1.3,3.4,.7],[1.3+a,y,.7],.016,BLATT); ball(g,.085,c,1.3+a,y,.7); });
      [0,1,2,3].forEach(i=>box(g,.17,.6-i*.05,.42,BUCH[i*2],-1.05+i*.19,3.27-i*.025,.7));
      /* Segelschiff: langer Rumpf mit spitzem Bug und flachen Dreieckssegeln */
      const flach=(punkte,c,x,y,z)=>{ const f=new THREE.Shape(); punkte.forEach(([a,b],i)=>i?f.lineTo(a,b):f.moveTo(a,b)); const q=new THREE.Mesh(new THREE.ShapeGeometry(f),mat(c,{side:THREE.DoubleSide})); q.position.set(x,y,z); g.add(q); return q; };
      [-.12,.46].forEach(x=>box(g,.08,.1,.2,HOLZ3,x,3.02,.8));
      [-.07,.07].forEach(v=>flach([[-.62,.24],[.72,.24],[.42,0],[-.42,0]],KIRSCH,.18,3.04,.8+v)); box(g,.84,.2,.13,KIRSCH,.18,3.15,.8); box(g,1.3,.04,.17,GOLD,.23,3.29,.8);
      walze(g,.018,.9,HOLZ3,.2,3.74,.8);
      flach([[0,0],[.52,0],[0,.76]],WEISS,.23,3.38,.8); flach([[0,0],[-.44,0],[0,.6]],PAPIER,.17,3.38,.8); flach([[0,0],[.24,.06],[0,.13]],ROT,.21,4.17,.8);
      /* Wappen mit aufgeschlagenem Buch über dem Sims */
      const schild=[[-.62,.62],[.62,.62],[.62,-.05],[.42,-.4],[0,-.66],[-.42,-.4],[-.62,-.05]];
      flach(schild,GOLD,0,4.95,.57); flach(schild.map(([a,b])=>[a*.84,b*.84]),BLAU,0,4.95,.59);
      [-1,1].forEach(s=>{ const a=box(g,.34,.38,.03,PAPIER,s*.18,4.98,.62); a.rotation.z=s*.18; [-.08,.04].forEach(y=>{ const l=box(g,.22,.025,.02,STEIN2,s*.19,4.98+y,.645); l.rotation.z=s*.18; }); });
      box(g,.045,.43,.04,MESSING2,0,4.96,.63); ball(g,.07,GOLD,0,5.35,.62,1,1,.4); } },
  { x:6.3, z:7.4, steh:[6.2,5.15], kasten:[3.5,2.0], treffer:[3.5,2.6,2.0], baue(g){ /* 10 Schachtisch mit Figuren und zwei Hockern */
      walze(g,.6,.14,HOLZ2,0,.07,0); walze(g,.18,1.15,KIRSCH,0,.7,0); [.45,.95].forEach(y=>ball(g,.28,HOLZ2,0,y,0,1,.6,1));
      box(g,2.0,.18,2.0,KIRSCH,0,1.35,0); box(g,1.82,.05,1.82,GOLD,0,1.46,0);
      const b=new THREE.Mesh(new THREE.PlaneGeometry(1.7,1.7),new THREE.MeshLambertMaterial({map:brettBild()})); b.rotation.x=-Math.PI/2; b.position.set(0,1.492,0); b.receiveShadow=true; g.add(b);
      const s=1.7/8, p=(i,j)=>[(i-3.5)*s,(j-3.5)*s];
      const figur=(i,j,art,c)=>{ const [x,z]=p(i,j); walze(g,.085,.05,c,x,1.52,z);
        const h=[.2,.28,.34,.44][art]; kegel(g,.075,h,c,x,1.52+h/2,z);
        if(art===0) ball(g,.062,c,x,1.52+h,z);
        else if(art===1) walze(g,.075,.13,c,x,1.52+h-.04,z);
        else if(art===2){ ball(g,.08,c,x,1.52+h-.03,z,1,1.25,1); ball(g,.03,c,x,1.55+h+.07,z); }
        else { walze(g,.06,.07,c,x,1.52+h-.03,z); [-.045,.045].forEach(v=>ball(g,.032,c,x+v,1.57+h,z)); ball(g,.04,c,x,1.59+h,z); } };
      const HELL=0xfff6dc, DUNKEL=0x2a1a14;
      [[0,0,1],[2,0,2],[3,0,3],[7,0,1],[1,1,0],[2,1,0],[4,2,0],[5,1,0],[6,2,2]].forEach(([i,j,a])=>figur(i,j,a,DUNKEL));
      [[0,7,1],[4,7,3],[5,7,2],[7,7,1],[0,6,0],[1,6,0],[3,4,0],[6,6,0],[2,5,2]].forEach(([i,j,a])=>figur(i,j,a,HELL));
      /* geschlagene Figuren am Rand */
      [[-.93,-.5,DUNKEL],[.93,.4,HELL]].forEach(([x,z,c])=>{ kegel(g,.07,.22,c,x,1.56,z); ball(g,.055,c,x,1.68,z); });
      [-1,1].forEach(v=>{ const x=v*1.4; walze(g,.42,.16,SAMT,x,.86,0); walze(g,.45,.08,HOLZ2,x,.75,0); [0,1,2].forEach(i=>{ const a=i*2.094+.4; strich(g,[x+Math.cos(a)*.38,0,Math.sin(a)*.38],[x+Math.cos(a)*.22,.74,Math.sin(a)*.22],.065,KIRSCH); }); liegend(ring(g,.28,.025,MESSING,x,.34,0)); }); } }
];

return { titel:'Der Lesesaal', breite:36, tiefe:27, oben:['26,16,8','62,42,24','110,80,48'], baue, gegenstaende, verstecke };
})();

/* Raum 2: Das Archiv. Kühles Graugrün, Blechregale mit Archivkartons und Mappen, Stahlschränke, Rohre, Arbeitslampen und viele alte Papiere.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Tischventilator) und 10 (Stempelkarussell) sind neu.
   Ausgang: die große Schubladenwand rechts in der Rückwand, die Schubladenblöcke gleiten auseinander. */
RAEUME3D.bibliothek[1] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, SCHWARZ, WEISS, GOLD } = BIB;
const BLECH=0x8d9b94, BLECH2=0x55665e, BLECH3=0x34423c, STAHL=0xb4bfba, STAHL2=0x6f7e86, KARTON=0x6f8a86, KARTON2=0x879784, KARTON3=0x5d7078,
  MAPPE=0xc9bfa0, MAPPE2=0xa8a588, ALT=0xe6d6ac, ROHR=0x7c8a82, KUPFER=0xb0714a, ROT=0xb23a2e, BLAU=0x2c5c9a, GRUEN=0x3d8a4a, GELB=0xe8b526;
const B=36, T=27, H=6.4, HINTEN=-13.5, AX=9;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const hell=m=>{ m.castShadow=false; return m; };
/* flache runde Scheibe mit Blick nach +z */
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* Walze liegend entlang x bzw. z */
const quer=(p,r,l,c,x,y,z)=>{ const m=walze(p,r,l,c,x,y,z); m.rotation.z=Math.PI/2; return m; };
const laengs=(p,r,l,c,x,y,z)=>liegend(walze(p,r,l,c,x,y,z));

/* ---------- Blechregal mit Archivkartons, Mappen, Papierbündeln und Rollen. Fuß bei y=0, Blick nach +z, Tiefe .8 ---------- */
function blechregal(par,x,z,b,h,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-1,1].forEach(s=>[-.36,.36].forEach(v=>box(g,.09,h,.09,BLECH3,s*(b/2-.05),h/2,v)));
  const faecher=Math.max(2,Math.round(h/.85)), fh=(h-.2)/faecher;
  for(let j=0;j<=faecher;j++){ const y=.14+j*fh; box(g,b,.06,.82,BLECH,0,y,0); box(g,b,.09,.04,BLECH2,0,y-.01,.41); }
  strich(g,[-b/2+.08,.2,-.39],[b/2-.08,h-.1,-.39],.022,BLECH2); strich(g,[b/2-.08,.2,-.39],[-b/2+.08,h-.1,-.39],.022,BLECH2);
  for(let j=0;j<faecher;j++){ const y=.17+j*fh, frei=fh-.12; let a=-b/2+.14;
    while(a<b/2-.45){ const r=zufall(), rest=b/2-.14-a;
      if(r<.42){ const w=Math.min(rest,.52+zufall()*.2), hh=frei*(.62+zufall()*.25), c=[KARTON,KARTON2,KARTON3][Math.floor(zufall()*3)];
        box(g,w,hh,.66,c,a+w/2,y+hh/2,.02); box(g,w+.03,.09,.69,BLECH2,a+w/2,y+hh-.03,.02); box(g,w*.5,.17,.02,PAPIER2,a+w/2,y+hh*.46,.36); box(g,w*.3,.025,.025,BLECH3,a+w/2,y+hh*.46,.37); a+=w+.07; }
      else if(r<.68){ const n=Math.min(Math.floor(rest/.1),4+Math.floor(zufall()*4));
        for(let i=0;i<n;i++){ const hh=frei*(.58+zufall()*.3), m=box(g,.075,hh,.58,i%3?MAPPE:MAPPE2,a+.05+i*.1,y+hh/2,.04); if(i===n-1) m.rotation.z=.12; box(g,.08,.06,.02,PAPIER,a+.05+i*.1,y+hh*.7,.34); } a+=n*.1+.14; }
      else if(r<.88){ const w=Math.min(rest,.62); let yy=y;
        for(let i=0;i<4;i++){ const d=.07+zufall()*.04; if(yy+d>y+frei*.8) break; box(g,w-(i%2)*.08,d,.56,i%2?ALT:PAPIER2,a+w/2+(i%3-1)*.025,yy+d/2,.04); yy+=d+.008; }
        box(g,.04,yy-y+.02,.6,0x8a5a34,a+w/2,(y+yy)/2,.04); a+=w+.08; }
      else { const w=Math.min(rest,.58);
        [[.14,.12],[.4,.12],[.27,.33]].forEach(([dx,dy],i)=>{ if(dx+.12<=w+.02){ laengs(g,.115,.62,i%2?ALT:PAPIER,a+dx,y+dy,.02); laengs(g,.04,.64,0x8a6a44,a+dx,y+dy,.02); } }); a+=w+.08; } } }
  return g;
}
/* Stahlschrank mit zwei Türen (bewusst ohne Schubladen), Blick nach +z */
function stahlschrank(par,x,z,dreh,h){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0; h=h||3.1;
  box(g,1.5,.18,.86,BLECH3,0,.09,0); box(g,1.46,h,.82,STAHL2,0,h/2+.16,0); box(g,1.56,.12,.92,BLECH2,0,h+.22,0);
  [-1,1].forEach(s=>{ box(g,.66,h-.24,.04,BLECH,s*.35,h/2+.16,.42); [0,1,2,3].forEach(i=>{ box(g,.38,.04,.03,BLECH3,s*.35,h-.2-i*.11,.445); box(g,.38,.04,.03,BLECH3,s*.35,.55+i*.11,.445); });
    box(g,.07,.42,.07,STAHL,s*.09,h*.55,.47); box(g,.32,.18,.02,PAPIER,s*.38,h*.7,.445); });
  /* alte Rollen obendrauf */
  [-.4,0,.38].forEach((a,i)=>{ quer(g,.13,.62,i%2?ALT:PAPIER2,a*.4,h+.41+(i===1?.2:0),a*.7); });
  return g;
}
/* Palette mit verschnürten Papierbündeln */
function buendel(par,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  [-.6,0,.6].forEach(v=>box(g,.22,.12,1.3,HOLZ2,v,.06,0)); [-.5,-.17,.17,.5].forEach(v=>box(g,1.65,.06,.26,HOLZ,0,.15,v));
  [[-.42,0,.7],[.42,.05,.52]].forEach(([a,b,h],i)=>{ for(let j=0;j*.12<h;j++) box(g,.68-(j%2)*.04,.11,.94-(j%3)*.03,j%3?ALT:PAPIER2,a+(j%2)*.02,.24+j*.12,b);
    const o=.19+Math.ceil(h/.12)*.12; box(g,.05,.03,.98,0x7a4a2a,a,o,b); box(g,.72,.03,.05,0x7a4a2a,a,o,b); box(g,.05,o-.18,.02,0x7a4a2a,a,(o+.18)/2,b+.48); ball(g,.06,0x7a4a2a,a,o+.04,b); });
  quer(g,.14,.8,PAPIER,-.4,1.15,0); quer(g,.05,.83,ROT,-.4,1.15,0);
  return g;
}
/* gerahmtes altes Schriftstück (Wanddeko) */
function urkundenBild(art){
  return bild(256,320,(g)=>{ g.fillStyle=art%2?'#e8d8a8':'#ddd0aa'; g.fillRect(0,0,256,320);
    g.fillStyle='rgba(120,90,40,.14)'; for(let i=0;i<60;i++) g.fillRect(zufall()*250,zufall()*314,6+zufall()*20,4);
    g.fillStyle='#4a3a28'; g.fillRect(50,28,156,14); for(let y=66;y<240;y+=19) g.fillRect(28,y,150+((y*37)%52),5);
    if(art%3===1){ g.strokeStyle='#4a6a7a'; g.lineWidth=5; g.strokeRect(46,92,164,130); g.beginPath(); g.moveTo(46,200); g.lineTo(100,130); g.lineTo(140,175); g.lineTo(172,140); g.lineTo(210,196); g.stroke(); }
    g.fillStyle='#a8382a'; g.beginPath(); g.arc(190,272,24,0,7); g.fill(); g.fillStyle='#d86050'; g.beginPath(); g.arc(190,272,11,0,7); g.fill(); });
}

/* ---------- Ausgang: die große Schubladenwand ---------- */
function baueAusgang(k,sc,hinten){
  /* heller Gang dahinter */
  const gang=gruppe(hinten,AX,0,0);
  box(gang,4.4,.1,4.1,0xe8d6a4,0,-.045,-15.5);
  box(gang,4.7,.2,4,0xb8ac84,0,4.35,-15.6);
  [-1,1].forEach(s=>{ box(gang,.2,4.4,3.6,0xf0e2b8,s*2.3,2.2,-15.7);
    [-14.7,-15.7,-16.7].forEach(z=>{ box(gang,.08,3.6,.12,0x9a7a48,s*2.18,1.8,z); [.9,1.9,2.9].forEach(y=>box(gang,.34,.08,.8,0x9a7a48,s*2.04,y,z-.45)); });
    [-14.7,-16].forEach(z=>hell(ball(gang,.16,basis(0xfffbe0),s*2.05,3.55,z))); });
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,140,6,128,140,175); v.addColorStop(0,'#ffffff'); v.addColorStop(.4,'#fff2bc'); v.addColorStop(1,'#d89c48'); g.fillStyle=v; g.fillRect(0,0,256,256);
    g.strokeStyle='rgba(150,100,40,.5)'; g.lineWidth=5; for(let i=0;i<5;i++){ g.beginPath(); g.moveTo(70-i*14,256-i*2); g.lineTo(186+i*14,256-i*2); g.stroke(); } });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4.5,4.4),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,2.2,-17.45); gang.add(e);
  verschmelze(gang); ohneSchatten(gang); gang.visible=false;
  /* sechs Schubladenblöcke aus Stahl: je drei gleiten nach links und rechts */
  const bloecke=[];
  [0,1,2].forEach(r=>[-1,1].forEach(s=>{ const b=gruppe(hinten,AX+s*1.05,.04+r*1.38,HINTEN+.3); b.userData.lebendig=true; const t=gruppe(b,0,0,0);
    box(t,2.09,1.36,.22,BLECH3,0,.69,0);
    [-1,1].forEach(a=>[0,1].forEach(z=>{ const x=a*.52, y=.36+z*.66, c=(r+z+(a*s>0?1:0))%2?0x7f93a8:0x9db0c0;
      box(t,.98,.61,.12,c,x,y,.13); box(t,.86,.05,.03,0xc8d6e0,x,y+.25,.2);
      box(t,.42,.18,.04,MESSING,x,y+.07,.2); box(t,.34,.11,.05,PAPIER,x,y+.07,.205);
      quer(t,.035,.34,SCHWARZ,x,y-.15,.26); [-.15,.15].forEach(q=>box(t,.05,.05,.08,SCHWARZ,x+q,y-.15,.22)); }));
    verschmelze(t); ohneSchatten(t); bloecke.push({ b, r, s, x:AX+s*1.05 }); }));
  /* fester, dunkler Rahmen mit Messingbändern, Sockel und Giebel */
  const r=gruppe(hinten,AX,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.6,4.35,.62,0x2a3236,s*2.42,2.17,.32); box(r,.84,.42,.84,0x1e2428,s*2.42,.21,.42);
    [.62,1.5,2.9,3.95].forEach(y=>box(r,.68,.12,.68,MESSING,s*2.42,y,.33));
    [1.05,2.2,3.4].forEach(y=>ball(r,.09,GOLD,s*2.42,y,.65,1,1,.6));
    ball(r,.3,MESSING,s*2.42,5.02,.32); walze(r,.12,.2,MESSING2,s*2.42,4.74,.32); });
  box(r,5.7,.5,.66,0x2a3236,0,4.42,.33); box(r,5.9,.13,.76,MESSING,0,4.74,.36); box(r,5.5,.08,.04,GOLD,0,4.25,.68);
  const bogen=ring(r,1.05,.1,MESSING,0,4.8,.4,Math.PI); bogen.scale.y=.62;
  scheibe(r,.34,.14,GOLD,0,5.0,.4); ring(r,.2,.04,0x2a3236,0,5.0,.49); ball(r,.09,0x2a3236,0,5.0,.5); box(r,.1,.26,.03,0x2a3236,0,4.86,.49);
  verschmelze(r);
  /* Schwelle mit Pfeil nach vorn, flach am Boden */
  const schwelle=gruppe(sc,AX,0,-12.45);
  box(schwelle,4.2,.02,1.3,0x2a3236,0,.012,0); box(schwelle,3.9,.024,1.05,0x7a2a34,0,.014,0); [-1,1].forEach(s=>{ const q=box(schwelle,.7,.03,.11,GOLD,s*.22,.018,0); q.rotation.y=s*.65; });
  verschmelze(schwelle); ohneSchatten(schwelle);
  /* Riegel und goldenes Zahlenschloss */
  const sperre=gruppe(hinten,AX,2.42,HINTEN+.66);
  box(sperre,4.3,.2,.1,MESSING2,0,0,0); [-2.1,2.1].forEach(x=>box(sperre,.24,.44,.2,MESSING,x,0,0)); box(sperre,1.7,1.36,.08,0x7a2a34,0,.03,.07); box(sperre,1.56,1.22,.09,0xfbf0cc,0,.03,.08);
  const schloss=BIB.zahlenschloss(sperre,0,-.1,.27); schloss.scale.setScalar(1.35);
  verschmelze(sperre); ohneSchatten(sperre);
  const schimmer=schein(hinten,'rgba(255,220,110,.55)',AX,2.45,HINTEN+1.15,1.7);
  const licht=new THREE.PointLight(0xffdf90,0,13,1.5); licht.position.set(AX,3,-14.6); sc.add(licht);
  [-1,1].forEach(s=>k.kasten(AX+s*2.42,-13.0,.85,.9));
  k.kasten(AX,-13.1,4.2,.9); /* geschlossene Schubladen: beim Öffnen läuft die Figur ohne Wegsuche hindurch */
  return ausgang(k,{ name:'Schubladenwand', einfach:'Tor mit Schubladen', steh:[AX,-11.3], durch:[AX,-15.4],
    treffer:{x:AX,y:2.5,z:-12.9,b:5.4,h:4.8,t:.8}, schildOben:[AX,3.85,-12.1], glanz:[AX,2.45,-12.4],
    bewege:(auf,t)=>{ bloecke.forEach(o=>{ const a=Math.max(0,Math.min(1,(auf-.04-o.r*.12)/.66)), w=a*a*(3-2*a); o.b.position.x=o.x+o.s*2.28*w; });
      sperre.visible=auf<.05; schimmer.visible=auf<.05; gang.visible=auf>.02; licht.intensity=1.8*auf; const g=1.6+Math.sin(t*2.4)*.2; schimmer.scale.set(g,g,1); } });
}

/* ---------- Wanddeko: Rohre, Ventile, Urkunden, Uhr, Lüftungsgitter mit wehenden Bändern ---------- */
function wandSchmuck(k,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  /* Rohre an der Rückwand */
  quer(h,.17,36,ROHR,0,5.95,HINTEN+.26); quer(h,.1,36,KUPFER,0,5.52,HINTEN+.18);
  for(let x=-16;x<=16;x+=4){ quer(h,.22,.14,BLECH3,x,5.95,HINTEN+.26); box(h,.1,.62,.12,BLECH3,x+1.2,5.74,HINTEN+.1); }
  [-14.9,-2.4,15].forEach(x=>{ scheibe(h,.1,.3,BLECH3,x,5.52,HINTEN+.34); ring(h,.24,.045,ROT,x,5.52,HINTEN+.5); box(h,.46,.05,.04,ROT,x,5.52,HINTEN+.5); box(h,.05,.46,.04,ROT,x,5.52,HINTEN+.5); });
  /* Uhr und Manometer */
  scheibe(h,.62,.12,BLECH3,-3.2,4.55,HINTEN+.1); scheibe(h,.52,.14,PAPIER,-3.2,4.55,HINTEN+.11); for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(h,.03,SCHWARZ,-3.2+Math.sin(a)*.43,4.55+Math.cos(a)*.43,HINTEN+.19); }
  strich(h,[-3.2,4.55,HINTEN+.21],[-3.2,4.9,HINTEN+.21],.025,SCHWARZ); strich(h,[-3.2,4.55,HINTEN+.21],[-2.94,4.45,HINTEN+.21],.032,SCHWARZ);
  [3,4].forEach((x,i)=>{ strich(h,[x,5.52,HINTEN+.18],[x,4.75,HINTEN+.18],.05,KUPFER); scheibe(h,.3,.14,MESSING,x,4.6,HINTEN+.16); scheibe(h,.23,.16,PAPIER,x,4.6,HINTEN+.17); strich(h,[x,4.6,HINTEN+.27],[x+(i?-.13:.1),4.74,HINTEN+.27],.018,ROT); });
  /* Rohre an den Seitenwänden, mit Fallrohren in den Ecken */
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.26);
    laengs(w,.17,27,ROHR,x,5.95,0); laengs(w,.09,27,KUPFER,s*(B/2-.17),5.5,0);
    for(let z=-12;z<=12;z+=4){ laengs(w,.22,.14,BLECH3,x,5.95,z); box(w,.12,.62,.1,BLECH3,s*(B/2-.1),5.72,z+1.1); }
    walze(w,.15,5.9,ROHR,s*(B/2-.3),2.97,-13.2); [1,3,5].forEach(y=>walze(w,.2,.14,BLECH3,s*(B/2-.3),y,-13.2)); });
  /* alte Schriftstücke in Rahmen an den Seitenwänden */
  const texte=[0,1,2,3].map(urkundenBild);
  [[L,-1,[-9.4,-6.9,.1,2.6,10.4]],[R,1,[-10.6,-8,-.6,1.9,11]]].forEach(([w,s,zs])=>zs.forEach((z,i)=>{ const x=s*(B/2-.06), y=4.55+(i%2)*.08;
    box(w,.07,1.4,1.16,i%2?HOLZ2:BLECH3,x,y,z); const m=BIB.tafel(w,texte[(i+(s>0?2:0))%4],.94,1.18,s*(B/2-.11),y,z); m.rotation.y=-s*Math.PI/2; }));
  /* Lüftungsgitter mit flatternden Bändern */
  [[L,-1,-3.4],[R,1,5.2]].forEach(([w,s,z],n)=>{ box(w,.12,1.1,1.7,BLECH3,s*(B/2-.08),4.55,z); [0,1,2,3,4].forEach(i=>box(w,.08,.08,1.5,STAHL,s*(B/2-.16),4.18+i*.19,z));
    [-.5,0,.5].forEach((v,i)=>{ const f=gruppe(w,s*(B/2-.24),4.15,z+v); f.userData.lebendig=true; hell(box(f,.03,.62,.17,[GELB,PAPIER,0xe0705a][i],0,-.31,0));
      k.anim.push(t=>{ f.rotation.z=-s*(.95+Math.sin(t*5+i*2+n)*.2+Math.sin(t*11+i)*.07); }); }); });
  /* Leine mit alten Blättern zum Trocknen, hoch an der Rückwand */
  [[-13.2,-8.8]].forEach(([a,b])=>{ strich(h,[a,5.05,HINTEN+.2],[b,5.05,HINTEN+.2],.018,0x7a5a3a);
    [0,1,2,3,4].forEach(i=>{ const p=gruppe(h,a+.5+i*.86,5.03,HINTEN+.24); p.userData.lebendig=true; hell(box(p,.55,.66,.02,i%2?ALT:PAPIER,0,-.36,0)); [-.22,-.34,-.46].forEach(y=>hell(box(p,.38,.025,.025,0x8a7a5a,0,y,.002))); hell(box(p,.07,.14,.06,HOLZ,0,0,0)); verschmelze(p);
      k.anim.push(t=>{ p.rotation.x=-.08+Math.sin(t*1.8+i*1.3)*.09; p.rotation.z=Math.sin(t*1.2+i)*.05; }); }); });
  /* Mauseloch mit Käse an der linken Wand */
  ball(L,.34,0x100c08,-17.9,.02,6.75,.22,1,1); const loch=ring(L,.35,.05,HOLZ2,-17.84,.04,6.75,Math.PI); loch.rotation.y=Math.PI/2;
  const kaese=kegel(L,.2,.3,0xf4c83a,-17.45,.12,7.2); kaese.rotation.x=Math.PI/2; kaese.scale.z=.1;
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- pendelnde Arbeitslampe aus Blech ---------- */
function arbeitslampe(k,sc,x,z,start,mitLicht,hoehe){
  const g=gruppe(sc,x,hoehe||9.2,z); g.userData.lebendig=true; const t=gruppe(g,0,0,0);
  walze(t,.03,2.8,BLECH3,0,-1.4,0); walze(t,.14,.26,BLECH3,0,-2.85,0);
  hell(rohr(t,.14,.45,.36,0x2f5a52,0,-3.1,0,20,true)); liegend(ring(t,.45,.025,STAHL,0,-3.28,0)); hell(ball(t,.15,basis(0xfff4b8),0,-3.23,0));
  verschmelze(t); ohneSchatten(t);
  schein(g,'rgba(255,232,150,.5)',0,-3.35,0,1.2);
  let l=null; if(mitLicht){ l=new THREE.PointLight(0xffe0a0,.55,13,1.5); sc.add(l); }
  k.anim.push(a=>{ const w=Math.sin(a*1.1+start)*.07; g.rotation.z=w; if(l) l.position.set(x+Math.sin(w)*3.4,5,z); });
}

/* ---------- flache und niedrige Deko in der vorderen Raumhälfte ---------- */
function vorneSchmuck(k,sc,deko){
  const flach=gruppe(sc,0,0,0);
  /* Lüftungsroste im Boden */
  [[-5.4,7.9],[-12.2,8.8],[3.6,9.0],[12.4,9.2]].forEach(([x,z])=>{ box(flach,1.9,.02,1.1,BLECH3,x,.012,z); box(flach,1.66,.024,.88,0x161c1a,x,.014,z); for(let i=0;i<7;i++) box(flach,.09,.03,.9,STAHL2,x-.69+i*.23,.018,z); });
  /* gelb-dunkel gestreifte Bodenlinie vor den vorderen Regalen */
  [-1,1].forEach(s=>{ for(let i=0;i<22;i++) box(flach,.52,.014,.2,i%2?BLECH3:0xc8a438,s*(3.5+i*.52),.009,10.15); });
  verschmelze(flach); ohneSchatten(flach);
  /* Heizrohre am vorderen Rand mit Heizkörper */
  quer(deko,.13,6.6,KUPFER,-.5,.28,12.95); quer(deko,.11,6.6,ROHR,-.5,.62,12.95);
  [-3.6,-1.6,1.2,2.6].forEach(x=>{ box(deko,.16,.76,.34,BLECH3,x,.38,12.95); });
  ring(deko,.24,.045,ROT,1.9,.98,12.95).rotation.x=Math.PI/2; walze(deko,.05,.34,STAHL,1.9,.8,12.95);
  for(let i=0;i<8;i++){ const x=-1.15+i*.22; box(deko,.15,.72,.34,STAHL,x,.5,12.6); ball(deko,.09,STAHL,x,.86,12.6,.85,.7,1.8); }
  [.24,.74].forEach(y=>quer(deko,.05,1.9,BLECH2,-.38,y,12.6));
  k.kasten(-.5,12.75,6.8,.7);
  /* Grünpflanzen in Töpfen */
  [[-10.2,11.7],[9.5,11.8]].forEach(([x,z])=>{ rohr(deko,.46,.32,.6,0xb0643a,x,.3,z); walze(deko,.5,.1,0x8a4a28,x,.6,z);
    for(let i=0;i<9;i++){ const a=i*2.4, d=.2+(i%3)*.14, y=1.0+(i*5%9)*.07, px=x+Math.cos(a)*d, pz=z+Math.sin(a)*d; strich(deko,[x,.6,z],[px,y,pz],.025,0x2f6a38); const b=ball(deko,.24,i%2?0x3f8a48:0x5aa055,px,y+.08,pz,.55,1.25,.3); b.rotation.y=-a; b.rotation.z=(i%3-1)*.35; }
    k.kreis(x,z,.55); });
}

function baue(k){
  const sc=k.scene;
  const h=BIB.huelle(k,{ B,T,H, himmelLicht:0xeefaf2, grund:0x445248, staerke:.74, sonne:0xfff0d4, sonneStaerke:.38,
    wandBild:BIB.quaderBild([140,160,146],'#6c7e70',10), bodenBild:BIB.quaderBild([122,130,122],'#586058',4), bodenWdh:[B/9,T/9],
    leiste:0x35463e, sockelFarbe:0x587064, oeffnung:{x:AX,b:4.2,h:4.2} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  sc.background=new THREE.Color(0x101816);
  const tuer=baueAusgang(k,sc,hinten);
  wandSchmuck(k,hinten,links,rechts);

  /* ---------- Blechregale und Stahlschränke an den Wänden ---------- */
  const rH=gruppe(hinten,0,0,0), rL=gruppe(links,0,0,0), rR=gruppe(rechts,0,0,0);
  [[-16.1,3.0,3.9],[-9.35,2.3,3.9],[-3.2,2.9,3.4],[3.1,2.6,3.9],[15.9,3.6,3.9]].forEach(([x,b,hh])=>{ blechregal(rH,x,-13.0,b,hh); k.kasten(x,-13.0,b,.9); });
  [[-9.2,4.2],[-3.4,4.2],[2.4,3.8]].forEach(([z,b])=>{ blechregal(rL,-17.45,z,b,3.7,Math.PI/2); k.kasten(-17.45,z,.9,b); });
  [[9.0,3.2]].forEach(([z,b])=>{ blechregal(rL,-17.45,z,b,2.6,Math.PI/2); k.kasten(-17.45,z,.9,b); });
  [[-8.9,4.6],[.8,4.2]].forEach(([z,b])=>{ blechregal(rR,17.45,z,b,3.7,-Math.PI/2); k.kasten(17.45,z,.9,b); });
  [7.2,8.8].forEach(z=>{ stahlschrank(rR,17.4,z,-Math.PI/2); k.kasten(17.4,z,.95,1.6); });
  stahlschrank(rL,-17.4,5.4,Math.PI/2,2.7); k.kasten(-17.4,5.4,.95,1.6);
  [rH,rL,rR].forEach(g=>{ verschmelze(g); ohneSchatten(g); });

  /* ---------- niedrige Regale mitten im Raum und vorn ---------- */
  const deko=gruppe(sc,0,0,0);
  [[-10.4,-7.7,3.8,1.2],[1.2,-8.0,4.2,1.2],[-6.6,11.3,4.2,1.35],[5.6,11.5,4.2,1.35]].forEach(([x,z,b,hh])=>{ blechregal(deko,x,z,b,hh); k.kasten(x,z,b,.95); });
  /* Papierbündel auf Paletten in den Ecken und an den Regalen */
  [[-16.2,12.1,.25],[-12.9,12.2,-.15],[16.1,12.0,-.3],[12.2,-9.2,.2],[16.2,-3.8,1.65]].forEach(([x,z,d])=>{ buendel(deko,x,z,d); const q=Math.abs(Math.sin(d))>.7; k.kasten(x,z,q?1.45:1.8,q?1.8:1.45); });
  /* Heizkessel mit Rohr und Anzeige rechts */
  const K=gruppe(deko,16.5,0,4.5);
  [-.45,.45].forEach(v=>box(K,1.0,.25,.22,BLECH3,0,.12,v)); walze(K,.68,1.9,KUPFER,0,1.2,0); ball(K,.68,KUPFER,0,2.15,0,1,.45,1); [.5,1.2,1.9].forEach(y=>walze(K,.71,.1,BLECH3,0,y,0));
  walze(K,.13,3.4,ROHR,0,4.1,0); const anz=scheibe(K,.26,.1,PAPIER,0,1.55,0); anz.rotation.z=Math.PI/2; anz.position.set(-.72,1.55,0); const ar=ring(K,.27,.045,MESSING,-.76,1.55,0); ar.rotation.y=Math.PI/2; strich(K,[-.79,1.55,0],[-.79,1.7,.1],.02,ROT);
  k.kreis(16.5,4.5,.8);
  /* Läufer */
  BIB.teppich(sc,0,3.2,5.4,10.4,0x4a6a5e,0x8a8460);
  BIB.teppich(sc,AX,-8.4,3.2,5.4,0x6a3a40,0xa89458);
  vorneSchmuck(k,sc,deko);
  verschmelze(deko);
  /* Säulen aus Stahlträgern vorn an den Seiten */
  [[-14.6,8.9],[14.7,-7.0]].forEach(([x,z])=>{ const s=gruppe(sc,x,0,z); box(s,.7,.14,.7,BLECH3,0,.07,0); box(s,.14,5.6,.36,BLECH2,0,2.9,0); [-.2,.2].forEach(v=>box(s,.42,5.6,.08,BLECH,0,2.9,v));
    [.45,5.3].forEach(y=>box(s,.5,.14,.56,GELB,0,y,0)); for(let y=.9;y<5;y+=.8) [-.12,.12].forEach(a=>ball(s,.045,BLECH3,a,y,.25));
    verschmelze(s); k.kreis(x,z,.42); k.verdecker(s,x,z,.5); });

  /* ---------- Licht ---------- */
  arbeitslampe(k,sc,-9.5,-5.5,0,true); arbeitslampe(k,sc,3.2,-6.8,1.7,true); arbeitslampe(k,sc,-13,2.6,3.1,false); arbeitslampe(k,sc,11.5,1.5,4.4,true,10.8);
  const vorn=new THREE.PointLight(0xd8f0e0,.28,15,1.5); vorn.position.set(-8,4.5,6); sc.add(vorn);

  /* ---------- Staub im Lampenlicht ---------- */
  const n=50, staub=new THREE.InstancedMesh(GEO.box,basis(0xfff6d0,{transparent:true,opacity:.7,depthWrite:false}),n), o=new THREE.Object3D(), D=[];
  for(let i=0;i<n;i++) D.push([[-9.5,3.2,11.5][i%3],[-5.5,-6.8,1.5][i%3],zufall()*6.283,.2+zufall()*1.3,zufall(),.018+zufall()*.025]);
  staub.frustumCulled=false; sc.add(staub);
  k.anim.push(t=>{ D.forEach((d,i)=>{ const u=(d[4]+t*.03)%1, a=d[2]+t*.15; o.position.set(d[0]+Math.cos(a)*d[3],.4+(1-u)*4.4,d[1]+Math.sin(a)*d[3]); o.rotation.set(t+i,t*.6,0); o.scale.setScalar(d[5]); o.updateMatrix(); staub.setMatrixAt(i,o.matrix); }); staub.instanceMatrix.needsUpdate=true; });

  /* ---------- Leben: Mäuse zwischen den Möbeln ---------- */
  maeuschen(k,[[-2.9,-5.8],[1.0,-5.9],[2.0,-1.0],[-2.6,.4],[-3.0,-3]],1.7,0);
  maeuschen(k,[[-15.4,1.2],[-9,1.6],[-8,7.8],[-12,9.2],[-15.6,6.8]],1.4,5);
  maeuschen(k,[[8.6,-6.8],[9.4,.6],[14.6,1.6],[10.6,-1.0],[10.4,-5.8]],1.9,9);

  return { tuer, start:[0,5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.6,-11.2],[-9.4,-10.2],[-3.2,-10.4],[3.2,-11.2],[13.2,-11.4],[-15.8,-6.2],[-9.8,-5],[-2,-5.6],[8,-5.4],[15.6,-6],
  [-15.6,.8],[-8.8,.4],[2,-1],[9.4,.4],[15.2,2.6],[-14.8,10.6],[-6.6,9.4],[2.4,9.6],[8.6,9.6],[14,10.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-12.4, z:-12.3, steh:[-12.3,-10.1], kasten:[3.5,2.7], treffer:[3.4,3.2,1.5], baue(g){ /* 1 Karteischrank aus Holz mit vielen kleinen Schubladen */
      const F=0xa0723c, F2=0xbe8e50;
      [-1.45,1.45].forEach(x=>[-.45,.45].forEach(z=>box(g,.18,.5,.18,HOLZ3,x,.25,z)));
      box(g,3.3,2.35,1.15,F,0,1.65,0); box(g,3.5,.16,1.3,HOLZ2,0,.48,0); box(g,3.52,.18,1.32,HOLZ2,0,2.9,0); box(g,3.25,.1,1.1,HOLZ,0,3.03,0);
      for(let r=0;r<5;r++) for(let c=0;c<4;c++){ const x=-1.17+c*.78, y=.8+r*.43;
        if(r===2&&c===2){ box(g,.68,.34,.04,0x20140a,x,y,.58); continue; }
        box(g,.7,.36,.08,F2,x,y,.59); box(g,.34,.13,.03,MESSING,x,y+.06,.64); box(g,.27,.08,.035,WEISS,x,y+.06,.645); ball(g,.055,GOLD,x,y-.09,.66); }
      /* eine Schublade steht offen, voller Karteikarten */
      const x=-1.17+2*.78, y=.8+2*.43;
      [-.3,.3].forEach(a=>box(g,.07,.26,.62,F,x+a,y-.03,.9)); box(g,.62,.06,.62,F,x,y-.15,.9); box(g,.72,.36,.08,F2,x,y,1.23); box(g,.34,.13,.03,MESSING,x,y+.06,1.28); box(g,.27,.08,.035,WEISS,x,y+.06,1.285); ball(g,.055,GOLD,x,y-.09,1.3);
      for(let i=0;i<7;i++){ const m=box(g,.5,.3,.025,i%3?PAPIER:0xf0c860,x,y+.1+(i%2)*.03,.68+i*.075); m.rotation.x=-.12; if(i%3===0) box(g,.14,.08,.03,ROT,x-.1+i*.03,y+.28,.67+i*.075); }
      /* Karteikasten obendrauf */
      box(g,.7,.28,.5,0x2f6a62,-1.0,3.22,0); [0,1,2].forEach(i=>box(g,.6,.2,.04,PAPIER,-1.0,3.4,-.14+i*.13)); } },
  { x:-5.6, z:-3.6, steh:[-5.6,-1.5], kasten:[2.9,1.7], treffer:[2.9,3.2,1.7], baue(g){ /* 2 Schreibmaschine auf einem Schreibtisch */
      [-1.25,1.25].forEach(x=>[-.65,.65].forEach(z=>box(g,.18,1.0,.18,HOLZ2,x,.5,z)));
      box(g,2.9,.16,1.7,HOLZ,0,1.07,0); box(g,2.7,.22,.08,HOLZ2,0,.9,.68); box(g,2.5,.012,1.4,0x3f6a52,0,1.156,0);
      const S=0x2a2c34;
      box(g,2.0,.22,1.15,S,0,1.28,.08); box(g,1.84,.28,.6,S,0,1.5,-.18); box(g,1.86,.05,.05,MESSING,0,1.37,.665);
      const flaeche=box(g,1.66,.1,.74,0x181a20,0,1.5,.3); flaeche.rotation.x=.34;
      /* runde helle Tasten in drei Reihen */
      for(let r=0;r<3;r++) for(let c=0;c<(r===1?8:9);c++){ const x=-.68+c*.17+(r===1?.085:0), z=.08+r*.21, y=1.66-r*.078; walze(g,.068,.035,MESSING,x,y,z); walze(g,.054,.045,WEISS,x,y+.008,z); }
      box(g,.9,.05,.1,STAHL,0,1.42,.68);
      /* Typenhebel als Fächer */
      for(let i=0;i<11;i++){ const a=(i-5)*.19; strich(g,[Math.sin(a)*.2,1.65,-.12],[Math.sin(a)*.62,1.68,-.3-Math.cos(a)*.06],.012,STAHL); }
      /* Walze mit Drehknöpfen und Hebel */
      quer(g,.17,2.0,0x14161a,0,1.8,-.4); [-1.08,1.08].forEach(x=>{ quer(g,.2,.16,STAHL,x,1.8,-.4); quer(g,.11,.1,S,x*1.1,1.8,-.4); });
      strich(g,[-1.08,1.8,-.4],[-1.4,2.12,-.1],.045,STAHL); ball(g,.09,STAHL,-1.4,2.12,-.1);
      /* eingespanntes Blatt */
      const blatt=gruppe(g,.05,1.88,-.5); blatt.rotation.x=-.12; box(blatt,1.15,1.05,.03,WEISS,0,.5,0); [.82,.68,.54,.4,.26].forEach((y,i)=>box(blatt,i===4?.4:.85,.035,.035,0x4a4a52,i===4?-.22:0,y,.004));
      /* Farbbandspulen */
      [-1,1].forEach(s=>{ walze(g,.15,.07,SCHWARZ,s*.76,1.67,-.14); liegend(ring(g,.11,.035,ROT,s*.76,1.71,-.14)); }); } },
  { x:4.6, z:-3.6, dreh:-.12, steh:[4.6,-1.5], kasten:[2.5,1.8], treffer:[2.5,2.1,1.8], baue(g){ /* 3 Aktenkiste: offener Karton voller Akten */
      const P=0xc4955c, P2=0xa87a44;
      box(g,2.0,.08,1.35,P2,0,.05,0); [-1,1].forEach(s=>{ box(g,2.0,1.0,.09,P,0,.52,s*.65); box(g,.09,1.0,1.35,P2,s*.97,.52,0); });
      /* aufgeklappte Deckel */
      [-1,1].forEach(s=>{ const f=box(g,.5,.06,1.3,P,s*1.17,1.1,0); f.rotation.z=s*.5; }); const hk=box(g,1.9,.55,.06,P,0,1.2,-.8); hk.rotation.x=-.45;
      /* Akten und Mappen, die oben herausschauen */
      const F=[0xf4ecd8,0xe8c050,0xdccca4,0x7a9ac0,0xf4ecd8,0xd8885a,0xe6d6ac];
      F.forEach((c,i)=>{ const q=gruppe(g,-.72+i*.24,.55,(i%3-1)*.1); q.rotation.z=(i-3)*.055; const hh=.95+(i*5%3)*.15; box(q,.1,hh,1.0,c,0,hh/2,0); box(q,.11,.14,.3,c,0,hh+.05,(i%3-1)*.28); });
      [[-.5,.28,-.15],[.45,.3,.12]].forEach(([x,z,d])=>{ const q=box(g,.55,.75,.03,WEISS,x,1.25,z); q.rotation.z=d; [1.5,1.38].forEach(y=>{ const l=box(g,.38,.03,.035,0x6a6a72,x-d*(y-1.25),y,z+.002); l.rotation.z=d; }); });
      /* Schild und Griffloch vorn, rotes Band */
      box(g,.85,.4,.03,PAPIER,0,.56,.71); [.64,.54,.45].forEach((y,i)=>box(g,.6-i*.12,.04,.035,0x4a3a28,0,y,.72));
      box(g,2.02,.1,.02,ROT,0,.19,.705); [-.7,.7].forEach(x=>box(g,.34,.1,.03,0x4a3018,x,.78,.7)); } },
  { x:-13.4, z:-3.4, dreh:.4, steh:[-11.7,-1.4], kasten:[2.2,2.4], treffer:[1.9,4.4,2.0], baue(g){ /* 4 Bibliotheksleiter aus hellem Holz mit Plattform */
      const F=0xd09a52, F2=0x9a6a30;
      [-1,1].forEach(s=>{ strich(g,[s*.78,.2,.95],[s*.52,3.45,-.25],.1,F2); strich(g,[s*.78,.2,-1.0],[s*.52,3.45,-.45],.08,F2);
        quer(g,.17,.12,SCHWARZ,s*.82,.17,.98); quer(g,.07,.15,MESSING,s*.82,.17,.98); quer(g,.17,.12,SCHWARZ,s*.82,.17,-1.02); quer(g,.07,.15,MESSING,s*.82,.17,-1.02);
        /* Handlauf */
        strich(g,[s*.52,3.45,-.45],[s*.52,4.2,-.5],.06,MESSING); strich(g,[s*.52,4.2,-.5],[s*.64,2.7,.55],.045,MESSING); ball(g,.1,MESSING,s*.52,4.2,-.5); });
      for(let i=1;i<=7;i++){ const u=i/8, w=1.56-.52*u; box(g,w,.11,.36,F,0,.2+3.25*u,.95-1.2*u); box(g,w,.03,.04,MESSING,0,.25+3.25*u,1.14-1.2*u); }
      [1.1,2.3].forEach(y=>{ const u=(y-.2)/3.25; quer(g,.045,1.5-.5*u,F2,0,y,-1.0+.55*u); });
      box(g,1.24,.14,.65,F,0,3.5,-.35); quer(g,.05,1.1,MESSING,0,4.2,-.5);
      /* Blatt auf der obersten Stufe */
      const z=box(g,.55,.03,.42,WEISS,.1,3.59,-.32); z.rotation.y=.35; const r=quer(g,.09,.55,ALT,-.28,3.66,-.45); r.rotation.y=.5; } },
  { x:0, z:HINTEN, wand:'hinten', steh:[0,-11.4], kasten:[2.8,.9], treffer:[2.7,2.7,.9], trefferY:1.15, baue(g,k){ /* 5 Wandtresor mit Zahlenrad und Griffkreuz */
      const S=0x465661, S2=0x2a343c, S3=0x62767f;
      box(g,2.6,2.6,.22,S2,0,2.45,.11); box(g,2.25,2.25,.18,STAHL,0,2.45,.24); box(g,2.02,2.02,.2,S,0,2.45,.3); box(g,1.72,1.72,.06,S3,0,2.45,.41);
      [-1,1].forEach(a=>[-1,1].forEach(b=>ball(g,.085,STAHL,a*1.16,2.45+b*1.16,.24)));
      [-.55,.55].forEach(v=>{ walze(g,.11,.45,STAHL,-1.05,2.45+v,.42); });
      /* Zahlenrad */
      scheibe(g,.5,.1,MESSING,-.2,2.65,.46); scheibe(g,.42,.12,PAPIER,-.2,2.65,.47);
      const rad=gruppe(g,-.2,2.65,.55); rad.userData.lebendig=true;
      scheibe(rad,.25,.1,S2,0,0,0); scheibe(rad,.1,.16,STAHL,0,0,0); for(let i=0;i<10;i++){ const a=i*Math.PI/5; box(rad,.03,.03,.02,PAPIER,Math.sin(a)*.2,Math.cos(a)*.2,.06); } box(rad,.07,.2,.04,ROT,0,.13,.07);
      verschmelze(rad);
      for(let i=0;i<20;i++){ const a=i*Math.PI/10; strich(g,[-.2+Math.sin(a)*.31,2.65+Math.cos(a)*.31,.54],[-.2+Math.sin(a)*(i%5?.37:.4),2.65+Math.cos(a)*(i%5?.37:.4),.54],.013,SCHWARZ); }
      /* Griffkreuz */
      scheibe(g,.17,.2,STAHL,.5,2.0,.5); [0,1,2].forEach(i=>{ const a=i*Math.PI*2/3+.3, x=.5+Math.sin(a)*.42, y=2.0+Math.cos(a)*.42; strich(g,[.5,2.0,.6],[x,y,.6],.055,STAHL); ball(g,.1,GOLD,x,y,.6); });
      box(g,.65,.2,.04,MESSING,.35,3.15,.45); [-.18,0,.18].forEach(v=>box(g,.1,.06,.05,SCHWARZ,.35+v,3.15,.46));
      const gl=schein(g,'rgba(230,245,255,.6)',.65,3.0,.7,.5);
      k.anim.push(t=>{ rad.rotation.z=Math.sin(t*.7)*1.8; gl.material.opacity=Math.max(0,Math.sin(t*1.6)); }); } },
  { x:-6.4, z:HINTEN, wand:'hinten', steh:[-6.4,-11.4], kasten:[3.4,.7], treffer:[3.4,2.5,.8], trefferY:1.35, baue(g){ /* 6 Pinnwand aus Kork mit bunten Notizzetteln */
      box(g,3.3,2.35,.14,HOLZ2,0,2.6,.08); box(g,3.02,2.07,.16,0xc08a54,0,2.6,.1);
      for(let i=0;i<70;i++) ball(g,.03,i%2?0xa87240:0xd8a870,-1.42+zufall()*2.84,1.65+zufall()*1.9,.175,1,1,.3);
      const Z=[[-1.0,3.15,PAPIER,.1],[-.18,3.22,0xf8e050,-.08],[.75,3.1,0x9ad8f0,.12],[-.95,2.2,0xf8a0b8,-.12],[-.05,2.4,PAPIER,.05],[.95,2.25,0xa8e078,-.06],[.28,1.82,0xf8e050,.14]];
      Z.forEach(([x,y,c,d],i)=>{ const q=gruppe(g,x,y,.2+(i%2)*.012); q.rotation.z=d; const w=i===4?.78:.66, hh=i===6?.42:.58; box(q,w,hh,.025,c,0,0,0); [.07,-.06,-.18].forEach((v,j)=>{ if(i===6&&j>1) return; box(q,w*(.68-j*.12),.028,.03,0x5a5660,-.02*j,v,.003); }); ball(q,.065,i%3===0?BLAU:ROT,0,hh/2-.07,.05); });
      const P=[[-1.0,3.37,.27],[-.18,3.44,.27],[-.05,2.62,.27],[.95,2.47,.27],[.75,3.32,.27]]; for(let i=0;i<P.length-1;i++) strich(g,P[i],P[i+1],.012,ROT); } },
  { x:-11, z:5.2, dreh:.3, steh:[-10.3,7.4], kasten:[3.2,1.9], treffer:[3.0,2.8,1.5], baue(g){ /* 7 Aktenordner: große bunte Ordner auf einem niedrigen Tisch */
      [-1.3,1.3].forEach(x=>[-.5,.5].forEach(z=>walze(g,.08,.66,BLECH3,x,.33,z))); box(g,3.0,.14,1.35,HOLZ,0,.72,0); box(g,2.7,.07,1.1,BLECH2,0,.24,0);
      const ordner=(x,y,c,d)=>{ const o=gruppe(g,x,y,0); o.rotation.z=d||0;
        box(o,.46,1.55,.96,c,0,.775,0); box(o,.36,.04,.9,PAPIER,0,1.56,-.02);
        box(o,.3,.55,.03,WEISS,0,1.08,.49); [1.22,1.1,.98].forEach((v,j)=>box(o,.2-j*.03,.035,.035,0x3a3a44,0,v,.495));
        ring(o,.095,.032,STAHL,0,.36,.495); scheibe(o,.075,.02,SCHWARZ,0,.36,.485); box(o,.465,.06,.97,0x2a2a30,0,.05,0); };
      [ROT,BLAU,GELB,GRUEN].forEach((c,i)=>ordner(-1.14+i*.5,.79,c));
      ordner(1.12,.82,0x8a4aa0,.26); } },
  { x:11.8, z:6.0, dreh:-.3, steh:[10.9,8.1], kasten:[2.8,1.8], treffer:[2.7,2.9,1.4], baue(g){ /* 8 Zeitungsständer aus Holz mit eingehängten Zeitungen */
      [-1.2,1.2].forEach(x=>{ strich(g,[x,.1,.65],[x,2.65,-.15],.085,HOLZ); strich(g,[x,.1,-.7],[x,2.65,-.15],.085,HOLZ); box(g,.2,.12,1.6,HOLZ2,x,.06,0); ball(g,.14,MESSING,x,2.74,-.15); });
      quer(g,.06,2.5,HOLZ2,0,2.62,-.15);
      const seite=n=>bild(256,256,(c)=>{ c.fillStyle='#f0ece0'; c.fillRect(0,0,256,256); c.fillStyle='#1e1e22'; c.font='700 44px Georgia, serif'; c.textAlign='center'; c.fillText(['ZEITUNG','NEUES','BLATT'][n],128,44); c.fillRect(12,56,232,6); c.fillRect(20,74,170,14);
        c.fillStyle=['#5a8ab0','#c08a50','#6a9a60'][n]; c.fillRect(20,100,104,74); c.fillStyle='#6a6a70'; for(let y=102;y<176;y+=12) c.fillRect(138,y,100,5); for(let y=188;y<248;y+=12){ c.fillRect(20,y,104,5); c.fillRect(138,y,100,5); } });
      [[-.58,1.72,.32,0],[.6,1.72,.32,1],[0,2.62,-.04,2]].forEach(([x,y,z,n],i)=>{ const zg=gruppe(g,x,y,z); const w=i===2?1.6:1.04, hh=i===2?.8:1.08;
        quer(zg,.055,w+.2,HOLZ2,0,.02,0); [-1,1].forEach(s=>ball(zg,.085,MESSING,s*(w/2+.12),.02,0));
        const vor=gruppe(zg,0,0,.07); vor.rotation.x=-.1; box(vor,w,hh,.025,0xdcd6c6,0,-hh/2,-.015); BIB.tafel(vor,seite(n),w-.03,hh-.03,0,-hh/2,.003);
        const rueck=gruppe(zg,0,0,-.07); rueck.rotation.x=.12; box(rueck,w,hh*.85,.025,0xdcd6c6,0,-hh*.43,0); });
      quer(g,.05,2.4,HOLZ2,0,1.74,.26); [-1.2,1.2].forEach(x=>strich(g,[x,1.74,.26],[x,1.74,.12],.05,HOLZ2));
      for(let x of [-1.2,1.2]) strich(g,[x,.55,.5],[x,.55,-.55],.05,HOLZ2); quer(g,.05,2.4,HOLZ2,0,.4,.55); } },
  { x:12.6, z:-3.4, dreh:-.3, steh:[11.8,-1.35], r:.95, treffer:[2.1,3.5,1.5], baue(g,k){ /* 9 Tischventilator mit drehenden Flügeln */
      walze(g,.5,.1,BLECH3,0,.05,0); walze(g,.1,.95,BLECH3,0,.55,0); walze(g,.9,.12,HOLZ,0,1.08,0); liegend(ring(g,.9,.04,HOLZ2,0,1.08,0));
      const F=0xc8543a;
      walze(g,.46,.14,F,0,1.21,0); ball(g,.38,F,0,1.28,0,1,.45,1); walze(g,.09,.75,STAHL,0,1.65,-.18);
      [-.18,0,.18].forEach((x,i)=>ball(g,.055,i===1?GELB:PAPIER,x,1.34,.36));
      laengs(g,.3,.55,F,0,2.3,-.25); ball(g,.3,F,0,2.3,-.52,1,1,.55);
      /* Flügel */
      const fl=gruppe(g,0,2.3,.14); fl.userData.lebendig=true;
      for(let i=0;i<4;i++){ const a=gruppe(fl,0,0,0); a.rotation.z=i*Math.PI/2; const b=ball(a,.36,0x4aa0c0,.1,.41,0,.78,1.15,.08); b.rotation.y=.25; }
      scheibe(fl,.17,.16,MESSING,0,0,.03); ball(fl,.1,MESSING,0,0,.12);
      verschmelze(fl); ohneSchatten(fl);
      /* Schutzgitter */
      [.9,.62,.34].forEach((rad,i)=>ring(g,rad,i?.016:.045,STAHL,0,2.3,.34)); ring(g,.9,.04,STAHL,0,2.3,-.02);
      for(let i=0;i<12;i++){ const a=i*Math.PI/6, c=Math.cos(a), s=Math.sin(a); strich(g,[c*.12,2.3+s*.12,.36],[c*.9,2.3+s*.9,.34],.012,STAHL); if(i%2===0) strich(g,[c*.9,2.3+s*.9,.34],[c*.9,2.3+s*.9,-.02],.016,STAHL); }
      scheibe(g,.14,.06,MESSING,0,2.3,.38);
      /* Bänder wehen im Luftzug */
      [-.3,0,.3].forEach((x,i)=>{ const q=gruppe(g,x,1.5+(i===1?-.07:0),.38); q.userData.lebendig=true; hell(box(q,.08,.035,.55,[GELB,0xf4f0e0,GRUEN][i],0,0,.27));
        k.anim.push(t=>{ q.rotation.x=.25+Math.sin(t*9+i*2)*.18; q.rotation.y=x*.5+Math.sin(t*6+i)*.12; }); });
      k.anim.push(t=>{ fl.rotation.z=-t*9; }); } },
  { x:6.2, z:3.6, steh:[5.5,5.7], r:1.05, treffer:[2.2,3.8,2.2], baue(g,k){ /* 10 Stempelkarussell mit Stempelkissen */
      walze(g,.55,.1,HOLZ3,0,.05,0); walze(g,.14,.9,HOLZ2,0,.5,0); walze(g,1.02,.14,HOLZ,0,1.0,0); liegend(ring(g,1.02,.045,MESSING,0,1.0,0));
      /* offene Stempelkissen auf dem Tisch */
      [[-.55,.65,ROT,.4],[.05,.8,BLAU,0],[.62,.6,GRUEN,-.5]].forEach(([x,z,c,d])=>{ const q=gruppe(g,x,1.08,z); q.rotation.y=d; box(q,.46,.09,.3,STAHL,0,.045,0); box(q,.38,.05,.22,c,0,.095,0); const deckel=box(q,.46,.04,.3,STAHL,0,.2,-.24); deckel.rotation.x=1.15; });
      const rad=gruppe(g,0,1.07,-.05); rad.userData.lebendig=true;
      walze(rad,.07,1.65,MESSING,0,.82,0);
      /* großer Stempel als Krone: Gummiplatte, Holzfuß, Hals und runder Griff */
      walze(rad,.37,.1,SCHWARZ,0,1.67,0); box(rad,.64,.24,.5,0xd8a05a,0,1.84,0); box(rad,.66,.08,.52,ROT,0,1.78,0); rohr(rad,.1,.2,.4,0xb87a40,0,2.15,0); liegend(ring(rad,.13,.035,MESSING,0,2.32,0)); ball(rad,.29,0x9a3a28,0,2.56,0,1,.9,1);
      const stempel=(p,x,y,z,c,s)=>{ const q=gruppe(p,x,y,z); q.scale.setScalar(s); walze(q,.14,.1,c,0,.05,0); walze(q,.17,.1,0xe0b070,0,.15,0); walze(q,.055,.24,0xb87a40,0,.31,0); ball(q,.13,c,0,.48,0,1,.85,1); };
      [[.34,.72,7,1.0],[1.0,.46,5,.9]].forEach(([y,r,n,s],e)=>{ walze(rad,r+.14,.06,e?0x2f6a62:0x3a7a70,0,y,0); liegend(ring(rad,r+.14,.035,MESSING,0,y+.03,0));
        for(let i=0;i<n;i++){ const a=i*Math.PI*2/n; stempel(rad,Math.cos(a)*r,y+.03,Math.sin(a)*r,[ROT,BLAU,GELB,GRUEN,0x8a4aa0,0xe0702a,0x2a2c34][(i+e*3)%7],s); } });
      verschmelze(rad);
      k.anim.push(t=>{ rad.rotation.y=t*.35; }); } }
];

return { titel:'Das Archiv', breite:36, tiefe:27, oben:['14,22,20','30,42,38','58,74,66'], baue, gegenstaende, verstecke };
})();

/* Raum 3: Der Kartenraum. Petrolblaue Wände, alte Landkarten, Kartentische, Fenster zum Meer,
   Regale voller Kartenrollen, warme Lampen, ein kleiner Papagei und ein Mobile.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Schiffslaterne) und 10 (Schiffsglocke) sind neu.
   Ausgang: die große Weltkarte in der Rückwand links, sie rollt sich an einer Stange nach oben. */
RAEUME3D.bibliothek[2] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, GOLD, SCHWARZ, WEISS, ROT, BLAU, GRUEN } = BIB;
const PETROL=0x14505c, PETROL2=0x0e3842, SEE=0x2a7a96, BRONZE=0xb87a2c, EISEN=0x4a4e58, SEIL=0xd8bc82;
const B=36, T=27, H=6.8, HINTEN=-13.5;

/* ---------- kleine Helfer ---------- */
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
const hell=m=>{ m.castShadow=false; return m; };
/* liegende Walze entlang z (Blick auf die runde Fläche) bzw. entlang x */
const nachVorn=m=>{ m.rotation.x=Math.PI/2; return m; };
const quer=m=>{ m.rotation.z=Math.PI/2; return m; };
const flach=m=>{ m.rotation.x=Math.PI/2; return m; }; /* Ring waagrecht legen */
/* runde Bildscheibe */
function bildKreis(par,tex,r,x,y,z){ const m=new THREE.Mesh(new THREE.CircleGeometry(r,40),new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m; }
/* Drehkörper aus einem Profil [[Radius,Höhe],…] */
function drehkoerper(par,profil,farbe,x,y,z){
  const m=new THREE.Mesh(new THREE.LatheGeometry(profil.map(p=>new THREE.Vector2(p[0],p[1])),28),mat(farbe,{side:THREE.DoubleSide})); m.position.set(x,y,z); m.castShadow=true; m.receiveShadow=true; par.add(m); return m;
}
/* durchsichtiges Teil (bleibt beim Verschmelzen einzeln) */
const glasMat=(farbe,deck)=>new THREE.MeshLambertMaterial({color:farbe,transparent:true,opacity:deck,depthWrite:false,side:THREE.DoubleSide});

/* ---------- gemalte Karten ---------- */
function flaeche(g,punkte,farbe,rand){
  g.fillStyle=farbe; g.strokeStyle=rand; g.lineWidth=4; g.beginPath(); g.moveTo(punkte[0][0],punkte[0][1]); punkte.slice(1).forEach(p=>g.lineTo(p[0],p[1])); g.closePath(); g.fill(); g.stroke();
}
/* bunte Weltkarte: blaues Meer, grüne und sandfarbene Erdteile (für den Ausgang und die Globen) */
function weltBild(){
  return bild(576,512,(g)=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#2f7fb4'); v.addColorStop(.5,'#46a4cc'); v.addColorStop(1,'#2a6c9e'); g.fillStyle=v; g.fillRect(0,0,576,512);
    g.strokeStyle='rgba(255,255,255,.28)'; g.lineWidth=2; for(let x=48;x<576;x+=80){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,512); g.stroke(); } for(let y=56;y<512;y+=80){ g.beginPath(); g.moveTo(0,y); g.lineTo(576,y); g.stroke(); }
    const R='#2a5a30';
    flaeche(g,[[40,90],[120,62],[205,80],[215,125],[170,150],[160,200],[130,222],[112,190],[80,172],[66,130]],'#7ab854',R); /* Nordamerika */
    flaeche(g,[[150,244],[196,252],[232,292],[212,340],[184,372],[168,430],[150,392],[152,330],[132,286]],'#58a048',R); /* Südamerika */
    flaeche(g,[[270,100],[310,72],[352,86],[345,120],[318,128],[296,152],[272,140]],'#a8c860',R); /* Europa */
    flaeche(g,[[272,182],[330,168],[380,200],[398,244],[370,268],[352,340],[322,372],[308,318],[300,272],[260,242],[256,205]],'#e0b45a',R); /* Afrika */
    flaeche(g,[[362,76],[440,50],[528,78],[540,130],[500,148],[506,196],[470,214],[452,176],[420,212],[400,166],[364,150],[350,122]],'#8cbc50',R); /* Asien */
    flaeche(g,[[442,308],[492,286],[536,310],[540,356],[498,372],[448,356]],'#d89848',R); /* Australien */
    flaeche(g,[[0,470],[90,455],[200,480],[330,462],[450,484],[576,462],[576,512],[0,512]],'#f0f6fa','#8ab0c8'); /* Südpol */
    flaeche(g,[[214,26],[262,20],[270,52],[236,70],[212,50]],'#f0f6fa','#8ab0c8'); /* Grönland */
    /* kleine Inseln, Segelschiff und Wellen */
    [[244,190],[408,300],[470,246],[84,300],[544,216]].forEach(p=>{ g.fillStyle='#7ab854'; g.beginPath(); g.ellipse(p[0],p[1],11,7,.5,0,7); g.fill(); });
    g.fillStyle='#8a4a22'; g.beginPath(); g.moveTo(52,380); g.lineTo(104,380); g.lineTo(92,396); g.lineTo(64,396); g.fill(); g.fillRect(76,336,4,44); g.fillStyle='#fffaf0'; g.beginPath(); g.moveTo(82,338); g.lineTo(106,372); g.lineTo(82,372); g.fill(); g.beginPath(); g.moveTo(74,346); g.lineTo(54,372); g.lineTo(74,372); g.fill();
    g.strokeStyle='#d8f2ff'; g.lineWidth=3; [[60,250],[230,420],[420,430],[560,270],[250,230],[40,200],[410,390]].forEach(p=>{ g.beginPath(); for(let i=0;i<5;i++) g.lineTo(p[0]-24+i*12,p[1]+(i%2?-6:0)); g.stroke(); });
    g.setLineDash([12,10]); g.strokeStyle='#d83a24'; g.lineWidth=5; g.beginPath(); g.moveTo(290,140); g.bezierCurveTo(210,230,300,420,430,340); g.stroke(); g.setLineDash([]);
  });
}
/* Wandkarte (Gegenstand 5): Pergament mit zwei Inseln, Wellen, Weg und rotem Kreuz, wie in 2D */
function inselBild(){
  return bild(512,368,(g)=>{ g.fillStyle='#f0deae'; g.fillRect(0,0,512,368); g.fillStyle='rgba(150,100,40,.12)'; for(let i=0;i<60;i++) g.fillRect(zufall()*490,zufall()*350,26,10);
    flaeche(g,[[60,130],[110,66],[190,92],[230,140],[196,214],[130,250],[72,220],[44,176]],'#bfa05a','#6b4a1c');
    flaeche(g,[[310,80],[390,56],[456,96],[468,168],[412,214],[350,196],[322,144]],'#bfa05a','#6b4a1c');
    g.fillStyle='#4a7a34'; [[110,140],[148,118],[130,176],[360,106],[430,130]].forEach(p=>{ g.beginPath(); g.moveTo(p[0],p[1]-24); g.lineTo(p[0]+18,p[1]+10); g.lineTo(p[0]-18,p[1]+10); g.fill(); });
    g.strokeStyle='#2a74a4'; g.lineWidth=6; for(let r=0;r<2;r++){ g.beginPath(); for(let x=40;x<=470;x+=22) g.lineTo(x,288+r*34+(x/22%2<1?-9:5)); g.stroke(); }
    g.setLineDash([16,12]); g.strokeStyle='#b0301c'; g.lineWidth=8; g.beginPath(); g.moveTo(150,210); g.bezierCurveTo(240,300,330,230,392,168); g.stroke(); g.setLineDash([]);
    g.lineWidth=16; g.lineCap='round'; g.beginPath(); g.moveTo(372,130); g.lineTo(416,174); g.moveTo(416,130); g.lineTo(372,174); g.stroke();
  });
}
/* alte Deko-Karte in Brauntönen (klein, ohne Kreuz und Weg) */
function altBild(nr){
  return bild(256,192,(g)=>{ g.fillStyle=nr%2?'#d8c090':'#cdb07c'; g.fillRect(0,0,256,192);
    g.strokeStyle='rgba(100,70,30,.35)'; g.lineWidth=1.5; for(let i=0;i<9;i++){ g.beginPath(); g.moveTo(i*32,0); g.lineTo(256-i*20,192); g.stroke(); }
    for(let n=0;n<3;n++){ const cx=50+n*76+(nr*13+n*29)%24, cy=48+((nr*41+n*67)%90), P=[]; for(let i=0;i<9;i++){ const a=i*.7, r=18+((i*17+nr*11+n*5)%18); P.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r*.8]); } flaeche(g,P,'#a8844c','#5a3c18'); }
    g.strokeStyle='#6a4a22'; g.lineWidth=5; g.strokeRect(8,8,240,176);
  });
}
/* Seekarte auf den Tischen */
function seeKarte(nr){
  return bild(256,160,(g)=>{ g.fillStyle='#cfe0d4'; g.fillRect(0,0,256,160);
    g.strokeStyle='rgba(40,100,120,.4)'; g.lineWidth=1.5; for(let x=0;x<256;x+=32){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,160); g.stroke(); } for(let y=0;y<160;y+=32){ g.beginPath(); g.moveTo(0,y); g.lineTo(256,y); g.stroke(); }
    flaeche(g,[[0,0],[80,0],[96,34],[60,52],[70,96],[30,120],[0,104]],'#e4cc94','#7a5a2a');
    flaeche(g,[[150+nr*8,60],[196,44],[226,82],[200,120],[162,104]],'#e4cc94','#7a5a2a');
    flaeche(g,[[110,128],[134,118],[146,140],[120,150]],'#a8bc74','#5a6a2a');
    g.strokeStyle='#e4cc94'; g.lineWidth=10; g.strokeRect(5,5,246,150);
  });
}
/* Blick aus dem Fenster: Himmel, Wolken, Möwen und Meer */
function meerBild(){
  return bild(256,384,(c)=>{ const v=c.createLinearGradient(0,0,0,250); v.addColorStop(0,'#5ab2ee'); v.addColorStop(1,'#e8f8ff'); c.fillStyle=v; c.fillRect(0,0,256,384);
    c.fillStyle='#fff6b8'; c.beginPath(); c.arc(190,70,26,0,7); c.fill();
    c.fillStyle='#ffffff'; [[66,116],[176,170]].forEach(p=>[[-26,0,22],[0,-10,30],[28,0,22]].forEach(q=>{ c.beginPath(); c.arc(p[0]+q[0],p[1]+q[1],q[2],0,7); c.fill(); }));
    c.strokeStyle='#2a3a4a'; c.lineWidth=3; [[100,62],[132,84]].forEach(p=>{ c.beginPath(); c.moveTo(p[0]-14,p[1]); c.quadraticCurveTo(p[0]-6,p[1]-10,p[0],p[1]); c.quadraticCurveTo(p[0]+6,p[1]-10,p[0]+14,p[1]); c.stroke(); });
    const m=c.createLinearGradient(0,240,0,384); m.addColorStop(0,'#2a9ac0'); m.addColorStop(1,'#10506e'); c.fillStyle=m; c.fillRect(0,244,256,140);
    c.fillStyle='#4a9a52'; c.beginPath(); c.moveTo(24,248); c.quadraticCurveTo(66,206,118,248); c.fill();
    c.strokeStyle='#c8f0ff'; c.lineWidth=4; for(let r=0;r<5;r++){ for(let i=0;i<4;i++){ const x=14+i*66+(r%2)*30, y=272+r*24; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+12,y-9,x+24,y); c.stroke(); } } });
}

/* Rundbogenfenster mit Meerblick, Blick nach +z, Unterkante bei y */
function seeFenster(par,tex,x,y,z,b,h){
  const g=gruppe(par,x,y,z), r=b/2, eck=h-r, form=new THREE.Shape(); form.moveTo(-r,0); form.lineTo(r,0); form.lineTo(r,eck); form.absarc(0,eck,r,0,Math.PI,false); form.lineTo(-r,0);
  const geo=new THREE.ShapeGeometry(form,20), uv=geo.attributes.uv; for(let i=0;i<uv.count;i++) uv.setXY(i,(uv.getX(i)+r)/b,uv.getY(i)/h);
  const m=new THREE.Mesh(geo,basis(0xffffff,{map:tex})); m.position.z=.02; g.add(m);
  [-1,1].forEach(s=>box(g,.2,eck,.22,HOLZ,s*r,eck/2,.06)); ring(g,r,.11,HOLZ,0,eck,.06,Math.PI); box(g,b+.5,.2,.4,PAPIER2,0,-.04,.12);
  box(g,.08,h-.05,.08,HOLZ,0,(h-.05)/2,.07); [eck,eck*.5].forEach(a=>box(g,b,.08,.08,HOLZ,0,a,.07));
  /* gebundene Vorhänge */
  [-1,1].forEach(s=>{ box(g,.34,eck*.55,.12,0xb8382c,s*(r+.22),eck*.78,.14); box(g,.22,eck*.5,.1,0xa02c24,s*(r+.28),eck*.26,.13); box(g,.4,.12,.18,GOLD,s*(r+.24),eck*.5,.16); });
  box(g,b+1.1,.1,.12,MESSING2,0,eck*1.07,.2); [-1,1].forEach(s=>ball(g,.1,GOLD,s*(r+.6),eck*1.07,.2));
  return g;
}

/* ---------- Regal mit Fächern voller Kartenrollen. Blick nach +z, Tiefe .8 ---------- */
function rollenRegal(par,x,z,b,h,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh||0;
  box(g,b,h,.1,HOLZ3,0,h/2,-.34); box(g,b+.18,.18,.9,HOLZ2,0,h+.09,0); box(g,b,.24,.84,HOLZ3,0,.12,0);
  const n=Math.max(2,Math.round(b/1.2)), fb=b/n, reihen=Math.max(2,Math.round((h-.24)/.95)), fh=(h-.24)/reihen;
  for(let i=0;i<=n;i++) box(g,.12,h,.8,HOLZ2,-b/2+i*fb,h/2,0);
  for(let j=0;j<=reihen;j++) box(g,b,.09,.8,HOLZ,0,.24+j*fh,0);
  const rollen=[], baender=[];
  for(let i=0;i<n;i++) for(let j=0;j<reihen;j++){ const cx=-b/2+(i+.5)*fb, y=.29+j*fh, anz=2+((i+j)%2);
    const orte=[[-.28,.15],[.04,.15],[.32,.15],[-.12,.42],[.18,.42]];
    orte.slice(0,anz+Math.floor(zufall()*3)).forEach(([a,c],m)=>{ const r=.13+zufall()*.025, v=zufall()*.14;
      rollen.push([cx+a*Math.min(1,fb/1.15),y+c,v-.06,r,.7,r,[0xf4e8c4,0xe4cc90,0xd8bc84,0xefe0b8][(i+j+m)%4],0,Math.PI/2,0]);
      baender.push([cx+a*Math.min(1,fb/1.15),y+c,v+.14,r+.012,.1,r+.012,[0xc0382c,0x2a8a9a,0x3f8a4a,0xd89a28][(i*2+j+m)%4],0,Math.PI/2,0]);
      baender.push([cx+a*Math.min(1,fb/1.15),y+c,v+.295,r*.38,.02,r*.38,0x8a6a3a,0,Math.PI/2,0]); }); }
  verschmelze(g); BIB.viele(g,GEO.cyl,rollen); BIB.viele(g,GEO.cyl,baender); return g;
}

/* ---------- Ausgang: die große Weltkarte ---------- */
function baueKartenTor(k,sc,hinten){
  const X=-9, KB=4.9, KH=4.35, OBEN=4.5;
  /* beleuchteter Gang dahinter */
  const gang=gruppe(hinten,X,0,0);
  box(gang,4.8,.1,4,0xc89a5a,0,-.045,-15.5); box(gang,1.9,.02,3.9,0xb8382c,0,.012,-15.5);
  [-1,1].forEach(s=>{ box(gang,.2,4.4,3.6,0xf4d89a,s*2.38,2.2,-15.7); [.3,1.3].forEach(y=>box(gang,.06,.14,3.4,HOLZ,s*2.27,y,-15.7)); [-14.6,-16.2].forEach(z=>{ hell(ball(gang,.16,basis(0xfff2b0),s*2.18,2.9,z)); box(gang,.1,.1,.2,MESSING,s*2.25,2.68,z); }); });
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,140,8,128,140,180); v.addColorStop(0,'#ffffff'); v.addColorStop(.35,'#fff2c0'); v.addColorStop(1,'#e8a850'); g.fillStyle=v; g.fillRect(0,0,256,256); });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4.8,4.4),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,2.2,-17.45); gang.add(e);
  verschmelze(gang); gang.visible=false;
  /* fester Rahmen aus Holz und Messing mit Sockeln */
  const r=gruppe(hinten,X,0,HINTEN);
  [-1,1].forEach(s=>{ box(r,.62,4.7,.5,HOLZ,s*2.75,2.35,.2); box(r,.82,.5,.68,HOLZ2,s*2.75,.25,.24); [1.1,3.5].forEach(y=>box(r,.68,.14,.56,GOLD,s*2.75,y,.21));
    box(r,.28,2.0,.06,HOLZ3,s*2.75,2.3,.47); ball(r,.13,GOLD,s*2.75,2.3,.52,1,1,.6); box(r,.3,.5,.5,MESSING2,s*2.75,4.5,.42); });
  box(r,6.3,.5,.55,HOLZ,0,5.1,.2); box(r,6.6,.18,.72,HOLZ2,0,5.43,.24); box(r,5.9,.08,.04,GOLD,0,5.1,.49);
  /* kleiner Globus als Krone */
  ball(r,.34,SEE,0,5.88,.3); ball(r,.18,0x7ab854,-.08,5.96,.5,1.1,.8,.6); ball(r,.12,0x7ab854,.15,5.76,.52,.8,1.1,.5); flach(ring(r,.4,.03,GOLD,0,5.88,.3)).rotation.x=Math.PI/2.4;
  box(r,4.95,.16,.3,HOLZ2,0,.08,.16); /* Schwelle unter der Karte */
  verschmelze(r);
  /* Stange mit goldenen Knöpfen */
  const stange=gruppe(hinten,X,OBEN,HINTEN+.5);
  quer(walze(stange,.13,6.4,MESSING,0,0,0)); [-1,1].forEach(s=>{ ball(stange,.27,GOLD,s*3.3,0,0); quer(walze(stange,.19,.12,GOLD,s*3.06,0,0)); });
  verschmelze(stange);
  /* die Karte selbst: rollt sich von unten auf */
  const tex=weltBild(), karte=new THREE.Mesh(new THREE.PlaneGeometry(KB,KH),new THREE.MeshLambertMaterial({map:tex,emissive:0x222222})); karte.position.set(X,OBEN-KH/2,HINTEN+.36); karte.receiveShadow=true; hinten.add(karte);
  const rolle=gruppe(hinten,X,OBEN-KH,HINTEN+.44); rolle.userData.lebendig=true;
  const walz=quer(walze(rolle,.12,KB+.1,0xe8d4a0,0,0,0)); [-1,1].forEach(s=>ball(rolle,.15,GOLD,s*(KB/2+.12),0,0));
  /* Zahlenschloss auf einer Messingplatte */
  const sperre=gruppe(hinten,X,2.75,HINTEN+.52);
  box(sperre,1.56,1.42,.08,MESSING2,0,.08,0); box(sperre,1.38,1.24,.1,PETROL2,0,.08,.01); [-.66,.66].forEach(a=>[-.5,.66].forEach(c=>ball(sperre,.07,GOLD,a,c,.07)));
  const schloss=BIB.zahlenschloss(sperre,0,-.07,.18); schloss.scale.setScalar(1.15);
  verschmelze(sperre);
  const licht=new THREE.PointLight(0xffdc98,0,12,1.5); licht.position.set(X,2.8,-14.6); sc.add(licht);
  [-1,1].forEach(s=>k.kasten(X+s*2.75,-13.1,.82,.8));
  return ausgang(k,{ name:'Große Weltkarte', einfach:'Tür mit der Weltkarte', steh:[X,-11.4], durch:[X,-15.4],
    treffer:{x:X,y:2.4,z:-13,b:5,h:4.5,t:.8}, schildOben:[X,4.2,-12.2], glanz:[X,2.8,-12.6],
    bewege:(auf)=>{ const a=Math.max(0,Math.min(1,(auf-.06)/.9)), s=1-.94*a*a*(3-2*a);
      karte.scale.y=s; karte.position.y=OBEN-KH*s/2; tex.repeat.y=s; tex.offset.y=1-s;
      rolle.position.y=OBEN-KH*s; const d=1+(1-s)*1.7; walz.scale.x=.12*d; walz.scale.z=.12*d; rolle.rotation.x=-a*14;
      sperre.visible=auf<.06; gang.visible=auf>.02; licht.intensity=1.7*auf; } });
}

/* ---------- Möbel und Deko ---------- */
/* großer Kartentisch mit Seekarte, Lupe, Tintenfass, Büchern und Lampe */
function kartenTisch(par,k,x,z,nr){
  const g=gruppe(par,x,0,z), s=x<0?1:-1;
  [-1.65,1.65].forEach(a=>[-.75,.75].forEach(c=>{ walze(g,.13,1.0,HOLZ2,a,.5,c); ball(g,.17,HOLZ2,a,.62,c); }));
  box(g,3.3,.1,.14,HOLZ2,0,.24,0); box(g,3.8,.18,2.0,HOLZ,0,1.08,0); box(g,3.9,.06,2.1,HOLZ2,0,1.0,0);
  const m=BIB.tafel(g,seeKarte(nr),2.9,1.6,-s*.15,1.178,0); m.rotation.x=-Math.PI/2;
  /* aufgerollte Karte an der Seite */
  nachVorn(walze(g,.13,1.7,0xe8d4a0,-s*1.67,1.3,0)); nachVorn(walze(g,.142,.14,ROT,-s*1.67,1.3,.2));
  /* Lupe */
  flach(ring(g,.22,.04,MESSING,-s*.7,1.23,.35)); strich(g,[-s*.55,1.23,.5],[-s*.22,1.23,.72],.05,HOLZ3);
  /* Tintenfass mit Feder */
  walze(g,.13,.2,0x1a2a5a,s*1.55,1.27,.55); walze(g,.07,.07,MESSING,s*1.55,1.4,.55); strich(g,[s*1.55,1.4,.55],[s*1.75,1.95,.45],.018,WEISS); const f=ball(g,.2,WEISS,s*1.73,1.88,.46,.35,1.2,.12); f.rotation.z=-s*.35;
  BIB.tischlampe(g,s*1.4,1.17,-.5);
  verschmelze(g); k.kasten(x,z,3.9,2.1);
}
function stuhl(par,k,x,z,dreh){
  const g=gruppe(par,x,0,z); g.rotation.y=dreh;
  [-.34,.34].forEach(a=>[-.34,.34].forEach(c=>walze(g,.06,.68,HOLZ2,a,.34,c))); box(g,.88,.12,.88,HOLZ,0,.72,0); box(g,.7,.12,.7,0xb8382c,0,.82,.02);
  [-.34,.34].forEach(a=>{ walze(g,.06,1.0,HOLZ2,a,1.25,-.36); ball(g,.09,MESSING,a,1.78,-.36); }); [1.25,1.58].forEach(y=>box(g,.68,.2,.08,HOLZ,0,y,-.36));
  verschmelze(g); k.kreis(x,z,.55);
}
/* Erdkugel im Holzgestell */
function globus(par,k,x,z,tex){
  const g=gruppe(par,x,0,z);
  walze(g,.55,.12,HOLZ2,0,.06,0); walze(g,.12,.8,HOLZ,0,.5,0); ball(g,.2,HOLZ,0,.55,0,1,.8,1); walze(g,.28,.1,MESSING,0,.93,0);
  const bogen=ring(g,.82,.05,MESSING,0,1.8,0,Math.PI*1.1); bogen.rotation.z=Math.PI*.95;
  const k2=new THREE.Mesh(new THREE.SphereGeometry(.72,24,16),new THREE.MeshLambertMaterial({map:tex})); k2.position.set(0,1.8,0); k2.castShadow=true; g.add(k2);
  ball(g,.09,GOLD,0,2.62,0);
  verschmelze(g); g.scale.setScalar(.72); k.kreis(x,z,.6); k.anim.push(t=>{ k2.rotation.y=t*.12; });
}
function fass(par,k,x,z){
  const g=gruppe(par,x,0,z);
  drehkoerper(g,[[0,0],[.5,0],[.66,.35],[.7,.65],[.66,.95],[.5,1.3],[0,1.3]],HOLZ,0,0,0);
  [[.57,.14],[.69,.48],[.69,.82],[.57,1.16]].forEach(([r,y])=>flach(ring(g,r,.04,EISEN,0,y,0))); walze(g,.48,.04,HOLZ2,0,1.31,0);
  verschmelze(g); k.kreis(x,z,.75);
}
function pflanze(par,k,x,z){
  const g=gruppe(par,x,0,z);
  rohr(g,.5,.36,.7,0xc0663a,0,.35,0); flach(ring(g,.5,.06,0xa04e2a,0,.7,0)); walze(g,.46,.04,0x4a3018,0,.69,0);
  for(let i=0;i<11;i++){ const a=i*2.4, d=.18+(i%3)*.14, y=1.15+(i%4)*.28, px=Math.cos(a)*d, pz=Math.sin(a)*d*.8; strich(g,[0,.7,0],[px,y,pz],.025,0x2f6a34); const q=ball(g,.28,i%2?0x3f9a48:0x66b454,px*1.3,y+.08,pz*1.3,1.1,.35,.65); q.rotation.set(Math.sin(a)*.5,-a,Math.cos(a)*.5); }
  verschmelze(g); k.kreis(x,z,.6);
}
/* niedrige Sitzbank mit zwei Kissen */
function sitzBank(par,k,x,z){
  const g=gruppe(par,x,0,z);
  [-1.1,1.1].forEach(a=>box(g,.18,.45,.8,HOLZ2,a,.22,0)); box(g,2.7,.14,.9,HOLZ,0,.5,0); box(g,2.2,.08,.1,HOLZ2,0,.2,0);
  [-.6,.6].forEach((a,i)=>{ box(g,1.05,.16,.74,i?0x2a8a9a:0xb8382c,a,.65,0); ball(g,.07,GOLD,a,.75,0,1,.5,1); });
  verschmelze(g); k.kasten(x,z,2.7,.9);
}
/* flacher Blumenkasten */
function blumenKasten(par,k,x,z){
  const g=gruppe(par,x,0,z);
  box(g,2.4,.5,.75,HOLZ,0,.25,0); [.07,.47].forEach(y=>box(g,2.48,.09,.82,MESSING2,0,y,0));
  for(let i=0;i<9;i++){ const a=-.96+i*.24, c=(i%2?.14:-.12); ball(g,.22,i%2?0x3f9a48:0x66b454,a,.62,c,1,.8,1); ball(g,.1,[0xf2609a,0xffd028,0xf4f0ff,0xff7a40][i%4],a+.05,.84,c+.06,1,.7,1); }
  verschmelze(g); k.kasten(x,z,2.5,.85);
}
/* aufgerolltes Tau, flach am Boden */
function tauRolle(par,k,x,z){
  const g=gruppe(par,x,0,z);
  [[.55,.09],[.52,.23],[.47,.37]].forEach(([rad,y],i)=>flach(ring(g,rad,.095,i%2?0xc8a868:SEIL,0,y,0)));
  strich(g,[.45,.38,.12],[.85,.08,.4],.085,SEIL); ball(g,.12,0xb83024,.88,.1,.42);
  verschmelze(g); k.kreis(x,z,.68);
}
/* Wandleuchte: runde Glaskugel auf Messingarm */
function wandLeuchte(par,x,y,z){
  const g=gruppe(par,x,y,z);
  nachVorn(walze(g,.2,.08,MESSING2,0,-.3,.04)); strich(g,[0,-.3,.05],[0,-.24,.34],.04,MESSING); walze(g,.15,.08,MESSING,0,-.2,.34);
  hell(ball(g,.23,basis(0xffe9a0),0,.02,.34)); schein(g,'rgba(255,205,110,.55)',0,.02,.45,1.7); return g;
}
/* Wimpelkette (bunte Signalwimpel) zwischen zwei Punkten, leicht durchhängend */
function wimpel(liste,schnur,a,b,n){
  let alt=a;
  for(let i=1;i<=n;i++){ const u=i/n, p=[a[0]+(b[0]-a[0])*u, a[1]+(b[1]-a[1])*u-Math.sin(u*Math.PI)*.4, a[2]+(b[2]-a[2])*u];
    strich(schnur,alt,p,.015,SEIL);
    if(i<n){ const dx=Math.abs(b[0]-a[0])>Math.abs(b[2]-a[2]); liste.push([p[0],p[1]-.19,p[2],dx?.17:.03,.36,dx?.03:.17,[0xe0442c,0xf6c42a,0x2f8ad0,0xf4f0e4,0x3faa5a][i%5],0,Math.PI,0]); }
    alt=p; }
}
function wandSchmuck(k,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0), meer=meerBild();
  /* Fenster zum Meer in der Rückwand (das Fernrohr schaut hinaus) */
  [5.3,9.7].forEach(x=>seeFenster(h,meer,x,1.75,HINTEN,2.5,3.9));
  [-3,2.65,7.5].forEach((x,i)=>wandLeuchte(h,x,[4.85,4.85,3.9][i],HINTEN));
  /* Messingleiste oben */
  [[-12.35,-18],[18,-5.65]].forEach(([a,b])=>box(h,Math.abs(a-b),.1,.08,MESSING2,(a+b)/2,6.35,HINTEN+.04));
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.04), dreh=-s*Math.PI/2;
    box(w,.08,.1,T,MESSING2,s*(B/2-.04),6.35,0);
    [-1.2,10.9].forEach(z=>{ const f=seeFenster(w,meer,s*(B/2),1.75,z,2.3,3.7); f.rotation.y=dreh; });
    /* nur eine alte Karte je Seite, in schmalem Rahmen */
    { const z=-9.9, y=3.9, b=2.0, hh=1.4, m=BIB.tafel(w,altBild(s>0?5:0),b,hh,x-s*.03,y,z); m.rotation.y=dreh;
      [-1,1].forEach(v=>{ box(w,.09,.09,b+.18,HOLZ3,x-s*.02,y+v*(hh/2+.04),z); box(w,.09,hh+.1,.09,HOLZ3,x-s*.02,y,z+v*(b/2+.05)); }); }
    /* Wandbretter mit Büchern und kleinem Topf */
    [[2.6,2.7],[4.8,3.7]].forEach(([z,y],i)=>{ const bx=s*(B/2-.35); box(w,.6,.1,1.8,HOLZ,bx,y,z); [-.65,.65].forEach(v=>box(w,.45,.35,.1,HOLZ2,s*(B/2-.25),y-.22,z+v));
      [0,1,2,3].forEach(j=>box(w,.4,.5+((j+i)%3)*.09,.15,BIB.BUCH[(j*2+i)%7],bx,y+.3+((j+i)%3)*.045,z-.7+j*.18));
      rohr(w,.2,.14,.28,0xc0663a,bx,y+.19,z+.5); [[0,.5,0],[.05,.42,.2],[-.02,.42,-.2]].forEach(q=>ball(w,.17,0x4aa850,bx+q[0],y+q[1],z+.5+q[2])); });
    [-12.2,.8,7.4].forEach(z=>{ const l=wandLeuchte(w,s*(B/2),z>5?4.4:3.2,z); l.rotation.y=dreh; });
  });
  /* Wimpelketten */
  [[hinten,[[[-5.4,6.5,-13.25],[1,6.5,-13.25]],[[1,6.5,-13.25],[8,6.5,-13.25]],[[8,6.5,-13.25],[17.4,6.5,-13.25]],[[-17.4,6.5,-13.25],[-12.6,6.5,-13.25]]]],
   [links,[0,1,2,3].map(i=>[[-17.75,6.2,-13+i*6.5],[-17.75,6.2,-6.5+i*6.5]])],
   [rechts,[0,1,2,3].map(i=>[[17.75,6.2,-13+i*6.5],[17.75,6.2,-6.5+i*6.5]])]].forEach(([w,ketten])=>{ const g=gruppe(w,0,0,0), liste=[]; ketten.forEach(([a,b])=>wimpel(liste,g,a,b,13)); verschmelze(g); ohneSchatten(g); BIB.viele(w,GEO.cone,liste); });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Leben: Papagei auf der Stange ---------- */
function papagei(k,sc,x,z){
  const st=gruppe(sc,x,0,z);
  walze(st,.55,.12,HOLZ2,0,.06,0); walze(st,.09,2.0,HOLZ,0,1.1,0); ball(st,.16,MESSING,0,.2,0,1,.7,1); walze(st,.3,.07,MESSING,0,1.25,0);
  quer(walze(st,.08,1.5,HOLZ,0,2.12,0)); [-.78,.78].forEach(a=>ball(st,.11,MESSING,a,2.12,0)); rohr(st,.14,.09,.12,MESSING2,-.52,2.24,0);
  verschmelze(st); k.kreis(x,z,.6);
  const p=gruppe(sc,x+.08,2.16,z); p.userData.lebendig=true; p.scale.setScalar(.78);
  const ROT2=0xe0302a, GELB=0xf8c820, BLAU2=0x1f68d0, rumpf=gruppe(p,0,0,0);
  ball(rumpf,.33,ROT2,0,.48,0,1,1.35,.95); ball(rumpf,.22,0xf05038,0,.42,.15,1,1.2,.8);
  [-.13,.13].forEach(a=>{ ball(rumpf,.075,0x6a5a50,a,.05,.08,1,.8,1.4); });
  [[0,BLAU2,1.0],[-.1,ROT2,.86],[.1,GELB,.76]].forEach(([a,c,l])=>strich(rumpf,[a*.5,.3,-.22],[a*1.6,.3-l*.8,-.22-l*.35],.065,c));
  verschmelze(rumpf);
  const fl=[-1,1].map(s=>{ const f=gruppe(p,s*.28,.72,-.03); ball(f,.24,ROT2,s*.05,-.1,0,.5,.9,.95); ball(f,.22,GELB,s*.08,-.25,-.01,.45,.85,.9); ball(f,.24,BLAU2,s*.08,-.45,-.08,.4,1.15,.7); verschmelze(f); return f; });
  const kopf=gruppe(p,0,1.05,.04);
  ball(kopf,.29,ROT2,0,0,0); [-1,1].forEach(s=>{ ball(kopf,.14,WEISS,s*.17,.02,.19,.8,1,.7); ball(kopf,.065,SCHWARZ,s*.19,.05,.28); ball(kopf,.022,WEISS,s*.19+.02,.075,.34); });
  ball(kopf,.15,0xf4d890,0,-.04,.29,.8,.95,1); const sp=kegel(kopf,.1,.22,0xf4d890,0,-.16,.4); sp.rotation.x=Math.PI*.82; ball(kopf,.08,0x3a3028,0,-.17,.28,.9,.8,1);
  [-.07,0,.07].forEach((a,i)=>{ const q=ball(kopf,.1,[GELB,0x3faa4a,GELB][i],a,.32,-.04,.35,1.3,.6); q.rotation.z=-a*4; });
  verschmelze(kopf);
  k.anim.push(t=>{ kopf.rotation.y=Math.sin(t*.7)*.8; kopf.rotation.z=Math.sin(t*1.9)*.16;
    const flattert=(t%6)<1.5, w=flattert?Math.abs(Math.sin(t*11))*1.1:.06+Math.sin(t*2)*.04; fl[0].rotation.z=-w; fl[1].rotation.z=w;
    p.position.y=2.16+(flattert?Math.abs(Math.sin(t*11))*.06:0); p.rotation.y=Math.sin(t*.35)*.3; });
}
/* Mobile mit Möwen, Fischen, Sonne und Wolke, dreht sich langsam */
function mobile(k,sc,x,y,z){
  const fest=gruppe(sc,x,y,z); strich(fest,[0,0,0],[0,2.6,0],.015,SEIL);
  const m=gruppe(sc,x,y,z); m.userData.lebendig=true;
  ball(m,.09,MESSING,0,0,0); quer(walze(m,.025,2.2,HOLZ,0,0,0)); nachVorn(walze(m,.025,2.2,HOLZ,0,-.06,0));
  const dinge=[[1.1,0,'moewe',.75],[-1.1,0,'fisch',1.15],[0,1.1,'sonne',1.4],[0,-1.1,'wolke',.95]].map(([a,c,art,l])=>{
    strich(m,[a,0,c],[a,-l,c],.01,SEIL); const d=gruppe(m,a,-l-.18,c);
    if(art==='moewe'){ ball(d,.14,WEISS,0,0,0,1.5,.8,.8); ball(d,.09,WEISS,.22,.06,0); ball(d,.04,0xf0a030,.33,.05,0,1.5,.7,.7); [-1,1].forEach(s=>{ const f=ball(d,.24,0xc8d4dc,s*.02,.07,s*.24,.4,.1,1); f.rotation.x=-s*.35; }); }
    else if(art==='fisch'){ ball(d,.2,0xf08a28,0,0,0,1.4,.9,.5); const s=kegel(d,.15,.22,0xf8b030,-.36,0,0); s.rotation.z=-Math.PI/2; s.scale.z=.05; [-1,1].forEach(v=>ball(d,.035,SCHWARZ,.17,.04,v*.09)); }
    else if(art==='sonne'){ ball(d,.19,0xffd028,0,0,0,1,1,.6); for(let i=0;i<8;i++){ const w=i*.785; ball(d,.055,0xffa820,Math.cos(w)*.29,Math.sin(w)*.29,0); } }
    else [[-.17,0,.14],[0,.07,.19],[.18,0,.14]].forEach(q=>ball(d,q[2],0xe8f2fa,q[0],q[1],0,1,1,.7));
    verschmelze(d); return d; });
  verschmelze(m); ohneSchatten(m); ohneSchatten(fest);
  k.anim.push(t=>{ m.rotation.y=t*.35; dinge.forEach((d,i)=>{ d.rotation.y=Math.sin(t*1.1+i*1.6)*.7; }); });
}

function baue(k){
  const sc=k.scene;
  const h=BIB.huelle(k,{ B,T,H, himmelLicht:0xfff2dc, grund:0x3a4a52, staerke:.74, sonne:0xffe6c0, sonneStaerke:.4,
    wandBild:BIB.tapeteBild('#1d5c6a','rgba(120,200,205,.14)'), bodenBild:BIB.dielenBild([158,108,66]), leiste:HOLZ2, sockel:1.35, sockelFarbe:HOLZ,
    oeffnung:{x:-9,b:4.9,h:4.5} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueKartenTor(k,sc,hinten);
  wandSchmuck(k,hinten,links,rechts);

  /* feste Möbel je Farbe zusammengefasst. Was an einer Wand steht, gehört zur Wandgruppe und blendet beim Drehen mit aus */
  const deko=gruppe(sc,0,0,0), dH=gruppe(hinten,0,0,0), dL=gruppe(links,0,0,0), dR=gruppe(rechts,0,0,0), seite=s=>s<0?dL:dR;
  /* Regale mit Kartenrollen und Büchern an den Wänden */
  rollenRegal(dH,-15.35,-13.05,3.6,4.2); k.kasten(-15.35,-13.05,3.8,.9);
  rollenRegal(dH,14.9,-13.05,4.6,4.2); k.kasten(14.9,-13.05,4.8,.9);
  [-1,1].forEach(s=>{ rollenRegal(seite(s),s*17.5,-6.4,3.4,3.2,-s*Math.PI/2); k.kasten(s*17.45,-6.4,.95,3.6);
    BIB.regal(seite(s),s*17.55,7.4,2.8,3.2).rotation.y=-s*Math.PI/2; k.kasten(s*17.5,7.4,.9,3.0); });

  /* Teppiche in Meeresblau */
  BIB.teppich(deko,0,2.2,10.4,8.2,0x1c4a70,MESSING2); BIB.teppich(deko,0,10.4,8.6,1.7,0x1c4a70,MESSING2);

  /* Kartentische, Stühle, ein kleiner Globus in der Ecke, Fässer, Pflanzen */
  [[-14.2,-9.1],[14.2,-9.1],[-13.2,10.2],[13.2,10.2]].forEach(([x,z],i)=>kartenTisch(deko,k,x,z,i));
  stuhl(deko,k,-14.3,-11.1,0); stuhl(deko,k,14.3,-11.1,0); stuhl(deko,k,-10.4,10.4,-1.7); stuhl(deko,k,10.4,10.4,1.7);
  globus(dR,k,16.7,-11.5,weltBild());
  fass(dL,k,-16.7,12.4); fass(dL,k,-16.8,-2.9); fass(dR,k,16.7,12.4); fass(dR,k,16.8,2.7);
  pflanze(dH,k,11.9,-12.4); pflanze(dL,k,-16.9,5); pflanze(dR,k,16.8,-.2);

  /* Bücherstapel als kleine Ausstattung an den Rändern */
  [[-17.2,9.5,.4],[17.2,9.5,-.5],[-17.4,-11.2,1.1]].forEach(([x,z,d],i)=>{ BIB.stapel(seite(x),x,0,z,4+i%2,d); k.kreis(x,z,.45); });

  /* niedrige Ausstattung vorn: Sitzbänke, Blumenkästen, aufgerollte Taue */
  [-3.1,3.1].forEach(x=>sitzBank(deko,k,x,12.5)); [-7.4,7.4].forEach(x=>blumenKasten(deko,k,x,12.5));
  tauRolle(deko,k,-11.2,12.4); tauRolle(deko,k,10.9,12.3); tauRolle(deko,k,11.4,6.6);

  [deko,dH,dL,dR].forEach(verschmelze);

  papagei(k,sc,2.9,-12.3);
  mobile(k,sc,-15,6.7,4);

  flacker(k,-3,4.4,-11.9,0xffbc60,.45,9); flacker(k,3,3.9,-11.9,0xffbc60,.4,9);
  flacker(k,-13.4,3,-8,0xffb050,.45,9); flacker(k,13.4,3,-8,0xffb050,.45,9); flacker(k,0,4.6,6,0xffca80,.3,13);

  return { tuer, start:[-4.8,-1] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15.2,-4.8],[-10,-8],[-4,-9.8],[.4,-9.2],[7.8,-10],[11,-10.4],[-9.4,1],[-14.8,4.2],[-9.6,12],[-3,11],[3.4,11.4],[9.3,10],[15.4,6.6],[15,1],[7.2,.6],[7,-3.6],[.8,-3.8],[-5,3.8],[4.8,3.6],[-15.6,7.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-7, z:-3.2, steh:[-7,-1.1], r:.95, treffer:[1.9,3.2,1.7], baue(g,k){ /* 1 Kompass: großes Messinggehäuse mit offenem Deckel und zitternder Nadel */
      walze(g,.65,.14,HOLZ2,0,.07,0); walze(g,.17,.95,HOLZ,0,.6,0); ball(g,.27,HOLZ,0,.62,0,1,.7,1); walze(g,.78,.14,HOLZ2,0,1.13,0);
      rohr(g,.86,.78,.34,MESSING,0,1.37,0,32); flach(ring(g,.82,.07,GOLD,0,1.55,0));
      const tex=bild(256,256,(p)=>{ p.fillStyle='#fbf4e0'; p.beginPath(); p.arc(128,128,128,0,7); p.fill(); p.strokeStyle='#5a4420'; p.lineWidth=3; p.beginPath(); p.arc(128,128,112,0,7); p.stroke();
        for(let i=0;i<32;i++){ const a=i*Math.PI/16, r=i%4?102:92; p.beginPath(); p.moveTo(128+Math.cos(a)*r,128+Math.sin(a)*r); p.lineTo(128+Math.cos(a)*112,128+Math.sin(a)*112); p.stroke(); }
        p.fillStyle='#2a1a08'; p.font='700 40px Andika, Arial, sans-serif'; p.textAlign='center'; p.textBaseline='middle'; [['N',128,40],['O',216,128],['S',128,218],['W',40,128]].forEach(q=>p.fillText(q[0],q[1],q[2])); });
      const blatt=bildKreis(g,tex,.76,0,1.555,0); blatt.rotation.x=-Math.PI/2;
      /* Deckel, nach hinten aufgeklappt, innen blau mit goldenem Stern */
      const d=gruppe(g,0,1.55,-.82); d.rotation.x=-.28;
      nachVorn(walze(d,.84,.12,MESSING,0,.86,0)); nachVorn(walze(d,.7,.03,PETROL,0,.86,.07)); ring(d,.78,.05,GOLD,0,.86,.07); [0,1,2,3].forEach(i=>{ const q=box(d,.09,.6,.02,GOLD,0,.86,.095); q.rotation.z=i*Math.PI/4; q.scale.y=i%2?.4:.7; }); ball(d,.11,GOLD,0,.86,.1,1,1,.4);
      [-.25,.25].forEach(a=>quer(walze(g,.07,.2,GOLD,a,1.55,-.84)));
      const n=gruppe(g,0,1.64,0); n.userData.lebendig=true;
      [[-1,0xd8281c],[1,0x2a4a9a]].forEach(([s,c])=>{ const q=kegel(n,.13,.62,c,0,0,s*.31); q.rotation.x=s*Math.PI/2; q.scale.z=.05; });
      walze(n,.09,.1,GOLD,0,.02,0);
      k.anim.push(t=>{ n.rotation.y=.55+Math.sin(t*1.3)*.28+Math.sin(t*4.1)*.05; }); } },
  { x:1.0, z:-7.4, dreh:.88, steh:[2.1,-5.1], r:1.45, treffer:[3.5,3.4,1.3], baue(g){ /* 2 Fernrohr: Messingrohr auf Dreibein, zeigt schräg zum Fenster */
      [[.85,0],[-.5,.75],[-.5,-.75]].forEach(([x,z])=>{ strich(g,[0,1.85,0],[x,.05,z],.075,HOLZ); ball(g,.12,MESSING2,x,.08,z,1,.7,1); strich(g,[x*.5,.95,z*.5],[0,.9,0],.025,MESSING2); });
      walze(g,.1,.3,MESSING2,0,.9,0); ball(g,.22,MESSING,0,1.95,0); walze(g,.12,.28,MESSING2,0,2.08,0);
      const r=gruppe(g,0,2.38,0); r.rotation.z=.3;
      const stueck=(rad,len,c,x)=>quer(walze(r,rad,len,c,x,0,0));
      stueck(.26,1.5,GOLD,-.15); stueck(.34,1.0,0x7a2c1c,.95); stueck(.4,.3,GOLD,1.55); stueck(.17,.5,MESSING2,-1.1); stueck(.12,.26,SCHWARZ,-1.46); stueck(.2,.1,GOLD,-1.62);
      [-.85,.45,1.42].forEach(x=>stueck(x>0?.37:.29,.09,MESSING2,x));
      stueck(.33,.04,0x8ad8f4,1.72); ball(r,.09,WEISS,1.75,.1,.1,.2,1,1);
      stueck(.07,.6,MESSING2,-.05).position.y=.36; [-.28,.18].forEach(x=>box(r,.07,.14,.07,MESSING2,x,.28,0)); } },
  { x:12.2, z:2.4, dreh:-.2, steh:[12,4.5], kasten:[3.3,2.0], treffer:[3.2,2.3,1.9], baue(g){ /* 3 Seekiste: grüne Truhe mit runder Haube, Eisenbändern und Seilgriffen */
      const K=0x2c7a70, K2=0x1f5a54;
      box(g,2.9,1.15,1.6,K,0,.68,0); [-1.3,1.3].forEach(x=>[-.65,.65].forEach(z=>box(g,.34,.16,.34,HOLZ3,x,.08,z)));
      [.38,.74].forEach(y=>box(g,2.92,.05,1.62,K2,0,y,0));
      const d=new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,2.9,24,1,false,0,Math.PI),mat(0x38948a)); d.rotation.z=Math.PI/2; d.position.set(0,1.27,0); d.scale.x=.82; d.castShadow=true; g.add(d);
      box(g,3.0,.16,1.7,EISEN,0,1.28,0); box(g,3.0,.14,1.7,EISEN,0,.18,0);
      [-.95,.95].forEach(x=>{ box(g,.2,1.15,1.68,EISEN,x,.7,0); const b=new THREE.Mesh(new THREE.CylinderGeometry(.84,.84,.2,24,1,false,0,Math.PI),mat(EISEN)); b.rotation.z=Math.PI/2; b.position.set(x,1.27,0); b.scale.x=.82; g.add(b);
        [.35,.7,1.05].forEach(y=>ball(g,.055,GOLD,x,y,.855)); });
      [-1,1].forEach(a=>[-1,1].forEach(c=>box(g,.24,.34,.24,MESSING,a*1.37,.32,c*.72)));
      [-1,1].forEach(s=>{ const q=ring(g,.34,.075,SEIL,s*1.52,.98,0,Math.PI); q.rotation.set(0,Math.PI/2,Math.PI); [-.34,.34].forEach(z=>ball(g,.13,MESSING2,s*1.47,.99,z)); });
      box(g,.56,.62,.1,GOLD,0,1.1,.84); ball(g,.09,SCHWARZ,0,1.14,.9,1,1,.5); box(g,.06,.18,.04,SCHWARZ,0,1.0,.9); box(g,.3,.26,.1,MESSING2,0,1.48,.82); } },
  { x:-11.2, z:5.8, dreh:.28, steh:[-10.5,8.0], kasten:[3.5,2.1], treffer:[3.4,2.8,1.6], baue(g,k){ /* 4 Buddelschiff: Segelschiff in einer liegenden Glasflasche auf einem Tischchen */
      [-1.25,1.25].forEach(x=>[-.5,.5].forEach(z=>walze(g,.1,.9,HOLZ2,x,.45,z))); box(g,3.1,.16,1.4,HOLZ,0,.96,0); box(g,3.12,.07,1.42,MESSING2,0,.87,0);
      [-.75,.55].forEach(x=>{ box(g,.28,.3,1.0,HOLZ3,x,1.16,0); });
      const CY=2.0;
      /* klarer Ständer: zwei Holzklötze mit Messingschalen, in denen die Flasche liegt */
      [-.8,.55].forEach(x=>{ box(g,.34,.2,1.1,HOLZ3,x,1.12,0); const q=ring(g,.73,.085,HOLZ2,x,CY,0,Math.PI); q.rotation.set(0,Math.PI/2,Math.PI); [-.73,.73].forEach(z=>ball(g,.13,GOLD,x,CY,z)); });
      /* Wasser */
      ball(g,.9,0x1f78b0,-.1,CY-.5,0,1.05,.2,.5); [-.75,-.1,.55].forEach(x=>ball(g,.12,0xd8f4ff,x,CY-.35,.34,1.5,.35,.5));
      /* flache Form in der Ebene nach vorn, Punkte relativ zur Flaschenmitte */
      const platte=(punkte,farbe,z)=>{ const f=new THREE.Shape(); f.moveTo(punkte[0][0],punkte[0][1]); punkte.slice(1).forEach(q=>f.lineTo(q[0],q[1])); f.lineTo(punkte[0][0],punkte[0][1]);
        const m=new THREE.Mesh(new THREE.ShapeGeometry(f),mat(farbe,{side:THREE.DoubleSide})); m.position.set(0,CY,z); g.add(m); return m; };
      /* Rumpf mit spitzem Bug, Heckaufbau und gelbem Streifen */
      [-.17,-.085,0,.085,.17].forEach(z=>platte([[-.74,-.14],[.5,-.14],[.76,-.08],[.5,-.38],[-.62,-.38]],0x4a1e0a,z));
      box(g,1.14,.22,.34,0x4a1e0a,-.07,CY-.26,0); box(g,1.26,.05,.37,0xf0c030,-.11,CY-.2,0); box(g,1.24,.04,.34,0xc8904c,-.12,CY-.13,0);
      box(g,.3,.17,.34,0x9a4c20,-.57,CY-.04,0); box(g,.34,.04,.37,0xf0c030,-.57,CY+.06,0); [-.65,-.5].forEach(x=>box(g,.07,.07,.02,0xfff2b0,x,CY-.04,.18));
      strich(g,[.6,CY-.11,0],[.96,CY+.05,0],.022,HOLZ3);
      /* zwei Masten mit je zwei flachen, nach vorn zeigenden Segeln */
      [[-.34,.74],[.32,.66]].forEach(([x,hh])=>{ walze(g,.025,hh,HOLZ3,x,CY-.13+hh/2,0);
        [[.07,.25,.58],[.37,.17,.4]].forEach(([y,sh,sb],i)=>{ const o=y+sh-(hh<.7&&i?.04:0);
          platte([[x-sb*.4,o],[x+sb*.4,o],[x+sb/2,y+.03],[x+sb*.2,y-.005],[x,y-.015],[x-sb*.2,y-.005],[x-sb/2,y+.03]],0xfffaf0,.045);
          quer(walze(g,.018,sb*.86,HOLZ3,x,CY+o,.05)); }); });
      platte([[-.34,.62],[-.34,.53],[-.12,.575]],0xe0382c,.01);
      /* Flasche: grünliches Glas, Bauch, Schulter, Hals mit festem Korken */
      const glas=new THREE.MeshLambertMaterial({color:0xa8e8d4,transparent:true,opacity:.24,depthWrite:false}), halsGlas=glasMat(0x4cba8c,.55);
      const bauch=quer(teil(g,GEO.cyl,glas,-.15,CY,0,.68,2.0,.68)); bauch.castShadow=false; bauch.geometry=new THREE.CylinderGeometry(1,1,1,28,1,true);
      hell(teil(g,GEO.sph,glas,-1.15,CY,0,.3,.68,.68));
      hell(quer(rohr(g,.68,.25,.45,halsGlas,1.075,CY,0,28,true)));
      hell(quer(rohr(g,.25,.25,.66,halsGlas,1.63,CY,0,24,true)));
      [[-1.15,.68,.018],[.85,.68,.018],[1.3,.255,.022],[1.96,.265,.05]].forEach(([x,rad,d])=>{ ring(g,rad,d,0x3f9a72,x,CY,0).rotation.y=Math.PI/2; });
      quer(walze(g,.225,.4,0xb47a40,2.0,CY,0));
      const gl=schein(g,'rgba(255,255,255,.8)',-.95,CY+.42,.65,.35); k.anim.push(t=>{ gl.material.opacity=.15+.35*Math.abs(Math.sin(t*1.5)); }); } },
  { x:.3, z:HINTEN, wand:'hinten', steh:[.3,-11.6], kasten:[3.2,.8], treffer:[3.3,2.7,.8], trefferY:1.55, baue(g){ /* 5 Wandkarte: Inselkarte im dicken Goldrahmen */
      box(g,3.2,2.5,.12,HOLZ3,0,2.9,.08);
      BIB.tafel(g,inselBild(),2.86,2.14,0,2.9,.15);
      [-1,1].forEach(s=>{ box(g,3.28,.2,.2,GOLD,0,2.9+s*1.2,.14); box(g,.2,2.6,.2,GOLD,s*1.54,2.9,.14); [-1,1].forEach(v=>ball(g,.18,MESSING2,s*1.54,2.9+v*1.2,.2,1,1,.7)); });
      [-1.0,1.05].forEach((x,i)=>ball(g,.1,i?0x2f8ad0:0xd8281c,x,3.65,.24));
      /* Aufhängung */
      strich(g,[-1.0,4.2,.08],[0,4.75,.08],.025,SEIL); strich(g,[1.0,4.2,.08],[0,4.75,.08],.025,SEIL); ball(g,.1,MESSING,0,4.75,.1); } },
  { x:-3.9, z:HINTEN, wand:'hinten', steh:[-3.9,-11.6], kasten:[2.6,.8], treffer:[2.7,2.8,.8], trefferY:1.4, baue(g,k){ /* 6 Windrose: runde Scheibe mit achtzackigem Stern */
      nachVorn(walze(g,1.28,.14,HOLZ,0,2.8,.08));
      const tex=bild(512,512,(p)=>{ p.fillStyle='#f2e0b0'; p.beginPath(); p.arc(256,256,256,0,7); p.fill(); p.strokeStyle='#6b4a1c'; p.lineWidth=6; [196,236].forEach(r=>{ p.beginPath(); p.arc(256,256,r,0,7); p.stroke(); });
        const zacke=(w,l,br)=>{ const P=(a,r)=>[256+Math.sin(a)*r,256-Math.cos(a)*r], s=P(w,l); [[-1,'#c0301c'],[1,'#fffaf0']].forEach(([v,c])=>{ const q=P(w+v*Math.PI/4,br); p.fillStyle=c; p.beginPath(); p.moveTo(256,256); p.lineTo(s[0],s[1]); p.lineTo(q[0],q[1]); p.closePath(); p.fill(); p.lineWidth=4; p.stroke(); }); };
        for(let i=0;i<4;i++) zacke(Math.PI/4+i*Math.PI/2,150,50); for(let i=0;i<4;i++) zacke(i*Math.PI/2,196,66);
        p.fillStyle='#2a1a08'; p.font='700 44px Andika, Arial, sans-serif'; p.textAlign='center'; p.textBaseline='middle'; [['N',256,40],['O',474,258],['S',256,476],['W',38,258]].forEach(q=>p.fillText(q[0],q[1],q[2])); });
      bildKreis(g,tex,1.2,0,2.8,.17); ring(g,1.26,.09,GOLD,0,2.8,.17); for(let i=0;i<8;i++){ const a=i*.785; ball(g,.09,MESSING2,Math.sin(a)*1.27,2.8+Math.cos(a)*1.27,.25); }
      ball(g,.17,GOLD,0,2.8,.22,1,1,.6);
      const s=schein(g,'rgba(255,230,150,.7)',0,2.8,.4,.8); k.anim.push(t=>{ s.material.opacity=.2+.35*Math.abs(Math.sin(t*1.1)); }); } },
  { x:9.6, z:-3.4, dreh:-.2, steh:[9.2,-1.2], r:1.35, treffer:[2.8,3.8,1.3], baue(g,k){ /* 7 Steuerrad: Speichenrad mit Griffen auf einer Säule */
      box(g,1.5,.18,1.1,HOLZ3,0,.09,0); rohr(g,.28,.5,1.8,HOLZ2,0,1.05,-.12); [.35,1.5].forEach(y=>flach(ring(g,.5-(y-.15)*.12,.04,MESSING,0,y,-.12))); box(g,.5,.4,.5,HOLZ2,0,2.1,-.12);
      const r=gruppe(g,0,2.2,.3); r.userData.lebendig=true;
      ring(r,.93,.12,0xa8662c,0,0,0); ring(r,.93,.03,GOLD,0,0,.12); ring(r,.45,.055,0xa8662c,0,0,0);
      for(let i=0;i<8;i++){ const a=i*Math.PI/4, c=Math.cos(a), s=Math.sin(a); strich(r,[0,0,0],[c*1.18,s*1.18,0],.06,0xc07c38); strich(r,[c*1.1,s*1.1,0],[c*1.4,s*1.4,0],.095,0x8a4a1c); ball(r,.115,i===2?ROT:0x8a4a1c,c*1.43,s*1.43,0); }
      nachVorn(walze(r,.25,.22,GOLD,0,0,0)); ball(r,.13,MESSING2,0,0,.14);
      nachVorn(walze(g,.12,.4,MESSING2,0,2.2,.1));
      verschmelze(r); k.anim.push(t=>{ r.rotation.z=Math.sin(t*.7)*.3; }); } },
  { x:-12.4, z:-3.8, steh:[-11.9,-1.7], r:1.0, treffer:[2.1,3.2,1.8], baue(g){ /* 8 Korb mit Kartenrollen */
      const W=0xc8944c, W2=0x9a6a30;
      rohr(g,.9,.64,1.15,W,0,.6,0,28); walze(g,.66,.08,W2,0,.05,0);
      for(let i=0;i<22;i++){ const a=i*Math.PI/11; strich(g,[Math.sin(a)*.66,.05,Math.cos(a)*.66],[Math.sin(a)*.91,1.16,Math.cos(a)*.91],.035,W2); }
      [[.7,.28],[.77,.58],[.84,.88]].forEach(([r,y])=>flach(ring(g,r,.05,0xe0b06c,0,y,0))); flach(ring(g,.91,.1,W2,0,1.18,0));
      [-1,1].forEach(s=>ring(g,.27,.065,W2,s*.97,1.2,0,Math.PI));
      [[-.42,.15,-.5,2.55],[.02,-.35,.04,2.95],[.45,.05,.5,2.5],[-.15,.35,-.18,2.25],[.28,.38,.3,2.05],[-.5,-.28,-.42,2.2],[.5,-.35,.3,2.7]].forEach(([x,z,n,l],i)=>{
        const a=[x*.5,.5,z*.5], b=[x*.7+n*.8,l,z*1.3], P=u=>[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,a[2]+(b[2]-a[2])*u];
        strich(g,a,b,.15,i%2?0xf6e8c0:0xe8cc8c); strich(g,P(.68),P(.77),.163,[ROT,0x2a8a9a,GRUEN,0xd89a28][i%4]); strich(g,P(.995),P(1.012),.1,0x9a7440); strich(g,P(1.0),P(1.025),.045,0xf6e8c0); }); } },
  { x:7.2, z:6.9, steh:[7.2,9.0], r:.85, treffer:[1.6,3.4,1.5], baue(g,k){ /* 9 Schiffslaterne: Messinglaterne mit leuchtendem Glas auf einem Holzpfosten */
      walze(g,.7,.14,HOLZ3,0,.07,0); walze(g,.3,.8,HOLZ2,0,.54,0); [.3,.78].forEach(y=>flach(ring(g,.31,.05,SEIL,0,y,0))); walze(g,.6,.14,HOLZ,0,1.0,0);
      walze(g,.52,.22,MESSING,0,1.18,0); flach(ring(g,.52,.05,GOLD,0,1.28,0));
      hell(ball(g,.17,basis(0xfff6c0),0,1.68,0,1,1.7,1)); hell(ball(g,.09,basis(0xff9a28),0,1.56,0,1,1.4,1)); walze(g,.09,.2,MESSING2,0,1.38,0);
      hell(teil(g,GEO.cyl,glasMat(0xffc850,.38),0,1.78,0,.42,1.0,.42));
      for(let i=0;i<6;i++){ const a=i*Math.PI/3+Math.PI/6; strich(g,[Math.sin(a)*.47,1.26,Math.cos(a)*.47],[Math.sin(a)*.47,2.32,Math.cos(a)*.47],.032,MESSING2); }
      [1.62,1.96].forEach(y=>flach(ring(g,.475,.025,MESSING2,0,y,0)));
      walze(g,.52,.12,GOLD,0,2.34,0); rohr(g,.2,.58,.34,0xb83024,0,2.57,0); walze(g,.2,.2,MESSING,0,2.82,0); ball(g,.23,GOLD,0,2.94,0,1,.5,1);
      ring(g,.28,.05,MESSING,0,3.1,0);
      const s=schein(g,'rgba(255,200,90,.65)',0,1.75,.3,2.2); k.anim.push(t=>{ const a=2.2+Math.sin(t*8)*.12+Math.sin(t*5.3)*.1; s.scale.set(a,a,1); }); } },
  { x:-6.6, z:8.0, steh:[-6.5,10.1], kasten:[2.6,1.2], treffer:[2.6,3.5,1.2], baue(g,k){ /* 10 Schiffsglocke: Bronzeglocke im Holzgestell mit Zugseil */
      [-1.05,1.05].forEach(x=>{ box(g,.46,.18,1.1,HOLZ3,x,.09,0); box(g,.24,2.9,.28,HOLZ,x,1.6,0); ball(g,.2,MESSING,x,3.2,0); strich(g,[x,2.45,0],[x*.55,2.9,0],.07,HOLZ2); });
      box(g,2.6,.28,.36,HOLZ2,0,2.97,0); box(g,2.0,.12,.14,HOLZ2,0,.4,0);
      [-.28,.28].forEach(x=>box(g,.1,.34,.4,EISEN,x,2.92,0));
      const gl=gruppe(g,0,2.82,0); gl.userData.lebendig=true;
      ring(gl,.14,.05,MESSING2,0,-.1,0);
      drehkoerper(gl,[[0,-.2],[.24,-.23],[.4,-.34],[.47,-.55],[.5,-.85],[.57,-1.08],[.72,-1.28],[.78,-1.4]],0xd89428,0,0,0);
      flach(ring(gl,.77,.065,0xf0bc40,0,-1.39,0)); [[.505,-.82],[.53,-.95]].forEach(([r,y])=>flach(ring(gl,r,.022,0xf6d060,0,y,0)));
      ball(gl,.06,0xfff0b0,-.25,-.6,.4,.7,2,.4);
      strich(gl,[0,-.9,0],[0,-1.5,0],.035,EISEN); ball(gl,.15,EISEN,0,-1.54,0);
      strich(gl,[0,-1.6,0],[0,-2.12,0],.045,SEIL); ball(gl,.1,SEIL,0,-1.82,0); ball(gl,.12,0xb83024,0,-2.14,0,.9,1.3,.9);
      verschmelze(gl); k.anim.push(t=>{ gl.rotation.z=Math.sin(t*1.7)*.09; }); } }
];

return { titel:'Der Kartenraum', breite:36, tiefe:27, oben:['8,24,34','18,52,64','52,96,108'], baue, gegenstaende, verstecke };
})();

/* Raum 4: Die Buchbinderwerkstatt. Helle, freundliche Handwerksstube: heller Putz, Holzbalken, eine Werkbank mit Holzwerkzeug am Rand,
   ein offenes Fenster mit Tageslicht und Schmetterlingen, Papierrollen, Lederstücke und Farben.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Waschbecken) und 10 (Leine mit Buntpapier) sind neu.
   Ausgang: das Riesenbuch in der Mitte der Rückwand, Deckel und Seiten klappen auf. */
RAEUME3D.bibliothek[3] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, ROT, BLAU, GRUEN, TUERKIS, GOLD, SCHWARZ, WEISS } = BIB;
const BUCHE=0xc99a62, BUCHE2=0xa87a46, EISEN=0x7d8a92, EISEN2=0x56626c, LEDER=0x9a5a2a, LEDER2=0x6e3a18, LEDER3=0xc08048, KERAMIK=0xf2f6f4, CHROM=0xc4d4de, LEIM=0xe8a020;
const B=36, T=27, H=6.6, HINTEN=-13.5;

/* ---------- kleine Helfer ---------- */
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };
const hell=m=>{ m.castShadow=false; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* flache runde Scheibe mit Blick nach +z */
const scheibe=(p,r,d,c,x,y,z)=>liegend(walze(p,r,d,c,x,y,z));
/* flache Form aus Punkten, Blick nach +z */
function form(par,punkte,c,x,y,z){
  const s=new THREE.Shape(); punkte.forEach((p,i)=>i?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1]));
  const m=new THREE.Mesh(new THREE.ShapeGeometry(s),mat(c)); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}
/* stabiler Tisch: Platte oben bei Höhe h */
function tisch(g,b,t,h,platte,bein){
  box(g,b,.18,t,platte||BUCHE,0,h-.09,0); box(g,b-.2,.16,t-.2,bein||HOLZ,0,h-.26,0);
  [-1,1].forEach(s=>[-1,1].forEach(v=>box(g,.2,h-.18,.2,bein||HOLZ,s*(b/2-.2),(h-.18)/2,v*(t/2-.2))));
  box(g,b-.4,.1,.12,bein||HOLZ,0,.35,-(t/2-.2));
}

/* ---------- Bilder ---------- */
function putzBild(){
  return bild(512,512,(g)=>{ g.fillStyle='#f4e8cc'; g.fillRect(0,0,512,512);
    for(let i=0;i<900;i++){ g.fillStyle=i%2?'rgba(255,255,255,.28)':'rgba(170,130,70,.09)'; const r=2+zufall()*9; g.beginPath(); g.arc(zufall()*512,zufall()*512,r,0,7); g.fill(); } });
}
/* marmoriertes Papier */
function marmorBild(farben){
  return bild(256,320,(g)=>{ g.fillStyle=farben[0]; g.fillRect(0,0,256,320);
    for(let i=0;i<26;i++){ g.strokeStyle=farben[1+i%(farben.length-1)]; g.lineWidth=5+(i*7)%13; g.beginPath(); const y=i*14-20;
      for(let x=-10;x<=270;x+=10) g.lineTo(x,y+Math.sin(x*.035+i*.8)*20+Math.sin(x*.09+i*2)*8); g.stroke(); }
    for(let i=0;i<22;i++){ const x=zufall()*256, y=zufall()*320; [14,8,3].forEach((r,j)=>{ g.fillStyle=farben[(i+j)%farben.length]; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }); }
    g.strokeStyle='#fffaf0'; g.lineWidth=12; g.strokeRect(5,5,246,310); });
}
function fliesenBild(){
  return bild(256,128,(g)=>{ g.fillStyle='#dfeeee'; g.fillRect(0,0,256,128);
    for(let r=0;r<3;r++) for(let c=0;c<6;c++){ g.fillStyle=(r+c)%2?'#8fd0d8':'#f6fcfc'; g.fillRect(c*43+3,r*43+3,38,38); } });
}

/* ---------- Ausgang: das Riesenbuch ---------- */
const HOCH=.88; /* Höhe gestaucht, damit der obere Rand im Querformat weniger unter der Kopfleiste liegt */
function baueRiesenbuch(k,sc,hinten){
  /* warm leuchtender Gang hinter dem Buch */
  const gang=gruppe(hinten,0,0,0);
  box(gang,3.9,.1,4,0xe8c88a,0,-.045,-15.5); box(gang,1.6,.02,4,ROT,0,.015,-15.5);
  [-1,1].forEach(s=>{ box(gang,.2,4,3.6,0xffe8b0,s*1.93,2,-15.7); for(let i=0;i<14;i++) hell(box(gang,.08,.7+(i%3)*.12,.2,BIB.BUCH[(i+(s>0?3:0))%7],s*1.8,1.35+(i%2)*1.35,-14.2-(i%7)*.45));
    [.9,2.25].forEach(y=>box(gang,.22,.08,3.3,HOLZ,s*1.8,y,-15.6)); });
  box(gang,4,.15,3.6,0xffe0a0,0,3.98,-15.7);
  const ende=bild(256,256,(g)=>{ const v=g.createRadialGradient(128,160,8,128,160,180); v.addColorStop(0,'#ffffff'); v.addColorStop(.35,'#fff2b8'); v.addColorStop(1,'#f0a038'); g.fillStyle=v; g.fillRect(0,0,256,256); });
  const e=new THREE.Mesh(new THREE.PlaneGeometry(4,4),new THREE.MeshBasicMaterial({map:ende})); e.position.set(0,2,-17.45); gang.add(e);
  verschmelze(gang); gang.scale.y=HOCH; gang.visible=false;
  /* fester Teil: Rückendeckel, Seitenblock (Rahmen um die Öffnung), Buchrücken, Stufe */
  const r=gruppe(hinten,0,0,HINTEN);
  box(r,.5,4.62,.5,0x6a1c1c,-2.1,2.31,.2); [.5,1.2,3.4,4.1].forEach(y=>box(r,.56,.14,.56,GOLD,-2.1,y,.2));
  box(r,.34,4.2,.34,PAPIER,1.99,2.12,.17); box(r,3.9,.34,.34,PAPIER,0,4.19,.17);
  for(let i=0;i<4;i++){ const z=.05+i*.08; box(r,.36,4.2,.015,PAPIER2,1.995,2.12,z); box(r,3.9,.36,.015,PAPIER2,0,4.195,z); }
  box(r,.2,4.62,.1,0x6a1c1c,2.26,2.31,.05); box(r,4.5,.2,.14,0x6a1c1c,.1,4.47,.07);
  box(r,4.9,.07,1.0,HOLZ2,0,.035,.5);
  verschmelze(r); r.scale.y=HOCH;
  /* drei Seiten, Drehpunkt am Buchrücken */
  const seiten=[0,1,2].map(i=>{ const s=gruppe(hinten,-1.88,0,HINTEN+.36+i*.035); s.userData.lebendig=true; s.scale.y=HOCH; const t=gruppe(s,0,0,0);
    box(t,3.9,4.15,.02,i===1?PAPIER2:PAPIER,1.95,2.13,0);
    for(let z=0;z<11;z++){ const w=z%4===3?1.9:3.0; box(t,w,.06,.008,0xa89878,.4+w/2,3.6-z*.28,.016); }
    verschmelze(t); ohneSchatten(t); return s; });
  /* Buchdeckel mit goldenem Rahmen, Buchzeichen und Zahlenschloss */
  const deckel=gruppe(hinten,-1.95,0,HINTEN+.55); deckel.userData.lebendig=true; deckel.scale.y=HOCH; const d=gruppe(deckel,0,0,0);
  box(d,4.25,4.48,.18,0x9a2a28,2.125,2.31,0);
  [.34,4.28].forEach(y=>box(d,3.8,.1,.04,GOLD,2.15,y,.11)); [.28,4.02].forEach(x=>box(d,.1,3.98,.04,GOLD,x,2.31,.11));
  [.5,4.12].forEach(y=>[.45,3.85].forEach(x=>{ const q=box(d,.46,.46,.05,GOLD,x,y,.1); q.rotation.z=Math.PI/4; scheibe(d,.1,.08,ROT,x,y,.13); }));
  /* aufgeschlagenes Buch als Zeichen oben */
  [-1,1].forEach(s=>{ const q=box(d,.7,.62,.04,PAPIER,2.15+s*.36,3.52,.12); q.rotation.z=s*.16; [-.16,0,.16].forEach(y=>{ const l=box(d,.48,.05,.02,GOLD,2.15+s*.37,3.52+y+.03,.15); l.rotation.z=s*.16; }); });
  box(d,.1,.7,.07,GOLD,2.15,3.45,.14);
  /* Stern unten */
  for(let i=0;i<4;i++){ const q=box(d,.8,.13,.03,GOLD,2.15,.95,.11+i*.003); q.rotation.z=i*Math.PI/4; } scheibe(d,.17,.1,0xfff0b0,2.15,.95,.13);
  verschmelze(d);
  const sperre=gruppe(deckel,2.15,2.2,.2); sperre.userData.lebendig=true; sperre.scale.y=1/HOCH; /* Schloss bleibt unverzerrt */
  box(sperre,2.3,.34,.06,LEDER2,.95,0,-.06); box(sperre,.3,.55,.1,MESSING2,2.0,0,-.04);
  box(sperre,1.7,1.45,.06,0x3a2412,0,.08,-.03); box(sperre,1.54,1.29,.07,0xfff0cc,0,.08,-.02);
  const schloss=BIB.zahlenschloss(sperre,0,-.06,.1); schloss.scale.setScalar(1.4);
  verschmelze(sperre);
  const glanzS=schein(hinten,'rgba(255,215,100,.5)',.2,3.1,HINTEN+1.0,1.4);
  const licht=new THREE.PointLight(0xffd488,0,13,1.5); licht.position.set(0,2.3,-13.9); sc.add(licht);
  k.kasten(0,-13.1,5,.8);
  return ausgang(k,{ name:'Riesenbuch', einfach:'Riesiges Buch', steh:[0,-8.9], durch:[0,-15.4],
    treffer:{x:0,y:2.1,z:-12.8,b:4.7,h:4.15,t:.8}, schildOben:[0,4.4,-12.4], glanz:[0,2.0,-12.5],
    bewege:(auf,t)=>{ const q=(v)=>{ const a=Math.max(0,Math.min(1,v)); return a*a*(3-2*a); };
      deckel.rotation.y=-2.2*q((auf-.05)/.8); seiten.forEach((s,i)=>{ s.rotation.y=-(1.72+i*.12)*q((auf-.22+i*.05)/.72)-(auf>.5?Math.sin(t*3+i*2)*.025:0); });
      gang.visible=auf>.02; licht.intensity=1.8*auf; glanzS.visible=auf<.05; glanzS.material.opacity=.45+Math.sin(t*2.2)*.25; } });
}

/* ---------- offenes Fenster mit Tageslicht, Vorhängen und Blumenkasten ---------- */
function offenesFenster(k,par,x){
  [-2.4,2.4].forEach(a=>k.kasten(x+a,-12.8,1.3,1.2)); /* offene Flügel ragen in Kopfhöhe in den Raum */
  const g=gruppe(par,x,0,HINTEN), y=1.9, b=3.4, h=3.1;
  const t=bild(256,256,(c)=>{ const v=c.createLinearGradient(0,0,0,256); v.addColorStop(0,'#74c4f4'); v.addColorStop(1,'#e8f8ff'); c.fillStyle=v; c.fillRect(0,0,256,256);
    c.fillStyle='#fff3a0'; c.beginPath(); c.arc(200,50,26,0,7); c.fill(); c.fillStyle='#ffffff'; [[60,60],[130,105]].forEach(p=>[[-22,4,18],[0,-6,26],[24,4,18]].forEach(q=>{ c.beginPath(); c.arc(p[0]+q[0],p[1]+q[1],q[2],0,7); c.fill(); }));
    c.fillStyle='#78b858'; c.beginPath(); c.moveTo(0,200); c.quadraticCurveTo(70,140,140,200); c.quadraticCurveTo(200,160,256,185); c.lineTo(256,256); c.lineTo(0,256); c.fill();
    c.fillStyle='#4a9040'; [[40,205,28],[75,220,22],[215,205,30]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],p[2],0,7); c.fill(); }); });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(b,h),basis(0xffffff,{map:t})); m.position.set(0,y+h/2,.03); g.add(m);
  [-1,1].forEach(s=>{ box(g,.2,h+.3,.26,HOLZ,s*(b/2+.08),y+h/2,.1);
    /* geöffnete Fensterflügel */
    const f=gruppe(g,s*(b/2+.1),y,.22); f.rotation.y=-s*.62; const mitte=s*.74;
    [.08,h/2,h-.08].forEach(v=>box(f,1.5,.13,.1,WEISS,mitte,v,0)); [.04,.74,1.46].forEach(v=>box(f,.11,h,.1,WEISS,s*v,h/2,0)); ball(f,.08,MESSING,s*1.4,h*.45,.1); });
  box(g,b+.5,.22,.26,HOLZ,0,y+h+.1,.1); box(g,b+.8,.18,.7,BUCHE,0,y-.07,.3);
  /* Blumenkasten */
  box(g,b-.2,.34,.4,0xb85a38,0,y+.19,.36);
  for(let i=0;i<13;i++){ const a=-1.45+i*.242; ball(g,.15,i%2?0x4f9a40:0x6cb450,a,y+.42,.36,1,.9,1); ball(g,.09,[0xf06090,0xffd030,0xffffff,0xe84838][i%4],a+.04,y+.55+(i%3)*.05,.44); }
  /* Vorhänge an einer runden Stange */
  const st=walze(g,.06,b+2.4,HOLZ2,0,y+h+.42,.3); st.rotation.z=Math.PI/2; [-1,1].forEach(s=>ball(g,.13,MESSING,s*(b/2+1.2),y+h+.42,.3));
  [-1,1].forEach(s=>{ const v=gruppe(par,x+s*(b/2+.95),y+h+.36,HINTEN+.36); const i=gruppe(v,0,0,0);
    for(let j=0;j<4;j++) box(i,.17,2.6-(j%2)*.1,.1,j%2?0xf0b050:0xf6c870,(j-1.5)*.16,-1.32,(j%2)*.05); box(i,.74,.14,.18,0xc8503a,0,-1.8,.03);
    verschmelze(i); ohneSchatten(i); k.anim.push(t2=>{ v.rotation.z=Math.sin(t2*1.4+s*2)*.035; v.rotation.x=-Math.max(0,Math.sin(t2*.9+s))*.05; }); });
}
/* Schmetterlinge flattern vor dem offenen Fenster */
function schmetterling(k,sc,cx,cy,cz,farbe,start,tempo){
  const g=gruppe(sc,cx,cy,cz); g.scale.setScalar(.9);
  hell(ball(g,.07,SCHWARZ,0,0,0,.8,.8,2.6)); hell(ball(g,.08,SCHWARZ,0,.02,.2));
  const fl=[-1,1].map(s=>{ const f=gruppe(g,s*.04,0,0); hell(ball(f,.28,farbe,s*.24,0,.1,1,.06,.78)); hell(ball(f,.2,farbe,s*.18,0,-.17,1,.06,.85)); hell(ball(f,.09,WEISS,s*.31,.02,.12,1,.15,1)); return f; });
  k.anim.push(t=>{ const u=t*tempo+start; g.position.set(cx+Math.sin(u)*1.9+Math.sin(u*2.7)*.4,cy+Math.sin(u*1.7)*.55+Math.sin(t*5+start)*.08,cz+Math.sin(u*1.3+1)*.8);
    g.rotation.y=Math.atan2(Math.cos(u)*1.9,Math.cos(u*1.3+1)*1.04); g.rotation.x=.45; const w=Math.sin(t*13+start)*.9; fl[0].rotation.z=-w; fl[1].rotation.z=w; });
}

/* ---------- Deko an den Wänden ---------- */
function wandSchmuck(k,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  /* Holzbalken (Fachwerk) */
  [-17.75,-14.9,-8.5,-3,3,9.2,17.75].forEach(x=>box(h,.34,H-1.3,.14,HOLZ,x,(H+1.3)/2,HINTEN+.07));
  [[-16.3,2.5],[-5.75,5.2],[5.75,5.2],[13.5,8.2]].forEach(([x,w])=>box(h,w,.3,.12,HOLZ,x,5.55,HINTEN+.06));
  [[-8.35,-1],[-3.15,1],[3.15,-1],[9.05,1]].forEach(([x,s])=>strich(h,[x,4.55,HINTEN+.1],[x-s*.95,5.5,HINTEN+.1],.11,HOLZ));
  [[L,-1],[R,1]].forEach(([w,s])=>{ [-13.2,-6,-.8,5.6,13.2].forEach(z=>box(w,.14,H-1.3,.34,HOLZ,s*(B/2-.07),(H+1.3)/2,z)); box(w,.12,.3,T,HOLZ,s*(B/2-.06),5.55,0); });
  /* kleine Malerpalette mit Farben */
  const pal=gruppe(h,10.05,4.35,HINTEN+.14);
  ball(pal,.45,BUCHE,0,0,0,1.1,.85,.12); ball(pal,.1,HOLZ3,.19,-.15,.06,1,.8,.2);
  [[-.28,.13,0xe83a30],[-.11,.23,0xf8a020],[.09,.24,0xf8e030],[.28,.13,0x38a848],[-.3,-.07,0x2868d0],[-.14,-.19,0x8a40b0]].forEach(([a,b,c])=>ball(pal,.085,c,a,b,.07,1,1,.35));
  /* Wanduhr */
  scheibe(h,.6,.16,HOLZ2,3.84,4.1,HINTEN+.1); scheibe(h,.49,.18,WEISS,3.84,4.1,HINTEN+.11);
  for(let i=0;i<12;i++){ const a=i*Math.PI/6; ball(h,.032,SCHWARZ,3.84+Math.cos(a)*.39,4.1+Math.sin(a)*.39,HINTEN+.21); }
  const zeiger=gruppe(hinten,3.84,4.1,HINTEN+.24); box(zeiger,.05,.36,.03,SCHWARZ,0,.15,0); k.anim.push(t=>{ zeiger.rotation.z=-t*.2; });
  box(h,.3,.05,.03,SCHWARZ,3.96,4.1,HINTEN+.22); ball(h,.065,ROT,3.84,4.1,HINTEN+.26);
  /* Wimpelkette über dem Riesenbuch */
  for(let i=0;i<15;i++){ const x=-2.8+i*.4, y=5.35-Math.sin(i/14*Math.PI)*.22; if(i<14) strich(h,[x,y,HINTEN+.2],[x+.4,5.35-Math.sin((i+1)/14*Math.PI)*.22,HINTEN+.2],.018,HOLZ2);
    form(h,[[-.15,0],[.15,0],[0,-.32]],[0xe84a3a,0xf8c030,0x3a9a58,0x3a70c0][i%4],x,y,HINTEN+.22); }
  /* Fenster in den Seitenwänden */
  [[L,-1,-3.6],[L,-1,10.2],[R,1,2.4],[R,1,-9.6]].forEach(([w,s,z])=>{ const f=BIB.bogenfenster(w,s*(B/2-.12),2.1,z,2.4,3.1,['#86ccf6','#eef8ff']); f.rotation.y=-s*Math.PI/2; });
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
}

/* ---------- Möbel und Werkstattdeko ---------- */
/* schlichte Werkbank am linken Rand: nur Werkzeug aus Holz (Hammer, Lineal, Hobel), darunter Bretter */
function werkbank(k,sc,x,z){ /* längs zur Wand, Vorderseite zur Raummitte; wird mit der übrigen Deko verschmolzen */
  const g=gruppe(sc,x,0,z), y=1.32; g.rotation.y=Math.PI/2;
  box(g,3.8,.24,1.8,BUCHE,0,1.2,0); box(g,3.82,.06,.08,BUCHE2,0,1.2,.91); box(g,3.4,.22,1.5,HOLZ,0,.97,0); box(g,3.2,.1,1.3,BUCHE2,0,.36,0);
  [-1.6,1.6].forEach(a=>[-.64,.64].forEach(b=>box(g,.28,1.1,.28,HOLZ2,a,.55,b)));
  [0,1,2].forEach(i=>box(g,2.4-i*.15,.09,1.0,i%2?BUCHE:0xc8a070,i*.05,.46+i*.09,0));
  /* Holz-Schraubstock */
  box(g,.7,.4,.22,HOLZ,-1.3,1.14,1.02); const gr=walze(g,.05,.75,HOLZ3,-1.3,1.1,1.19); gr.rotation.z=Math.PI/2; [-.37,.37].forEach(a=>ball(g,.08,HOLZ3,-1.3+a,1.1,1.19));
  /* Holzhammer */
  const hm=gruppe(g,-1.05,y,-.2); hm.rotation.y=.35; box(hm,.68,.36,.38,0xa8743c,0,.18,0); const st=walze(hm,.08,.95,BUCHE2,0,.16,.62); st.rotation.x=Math.PI/2; ball(hm,.1,BUCHE2,0,.16,1.08);
  /* Lineal aus Holz */
  box(g,1.5,.035,.18,0xdcb070,.45,y+.02,.55).rotation.y=-.1; for(let i=0;i<9;i++) box(g,.02,.01,.08,HOLZ3,-.15+i*.15,y+.045,.55-(i-4)*.015);
  /* Holzhobel mit runden Griffen */
  const hb=gruppe(g,.95,y,-.25); hb.rotation.y=-.2; box(hb,.95,.26,.32,0xb88450,0,.13,0); ball(hb,.15,HOLZ,.3,.34,0,1,1.1,1); box(hb,.16,.3,.22,HOLZ,-.25,.38,0).rotation.z=.25;
  k.kasten(x+.1,z,2.2,3.9);
}
/* Hocker */
function hocker(k,g,x,z,c){ walze(g,.5,.14,c,x,.86,z); walze(g,.42,.06,HOLZ2,x,.77,z); [-1,1].forEach(s=>[-1,1].forEach(v=>strich(g,[x+s*.24,.76,z+v*.24],[x+s*.34,0,z+v*.34],.065,HOLZ))); k.kreis(x,z,.45); }
/* Gestell mit Papierrollen (weiß) oder Lederrollen (braun) an der Seitenwand */
function rollenGestell(k,g,s,z,farben){
  const x=s*17.25;
  [-1.35,1.35].forEach(v=>box(g,.9,2.75,.16,HOLZ2,x,1.37,z+v)); [.25,1.1,1.95,2.75].forEach(y=>box(g,.92,.1,2.7,HOLZ,x,y,z));
  [.54,1.39,2.24].forEach((y,e)=>{ for(let i=0;i<5-(e%2);i++){ const a=z-1.0+i*.5+(e%2)*.25, c=farben[(i+e)%farben.length];
    const r=walze(g,.23,.85,c,x-s*.05,y,a); r.rotation.z=Math.PI/2; const q=walze(g,.1,.05,farben===PAPIERFARBEN?0xb89868:LEDER2,x-s*.49,y,a); q.rotation.z=Math.PI/2; } });
  /* große Rolle obenauf */
  const o=walze(g,.28,2.2,farben[0],x,3.08,z); o.rotation.x=Math.PI/2; [-1.15,1.15].forEach(v=>scheibe(g,.12,.06,HOLZ3,x,3.08,z+v));
  k.kasten(s*17.2,z,1.0,2.9);
}
const PAPIERFARBEN=[0xfffdf4,0xf4ead0,0xe8dcc0], LEDERFARBEN=[LEDER,LEDER3,LEDER2,0xb06a38];
/* Grünpflanze im Holzkasten */
function pflanzkasten(k,g,x,z){
  box(g,1.3,.75,1.3,HOLZ,x,.38,z); box(g,1.42,.12,1.42,HOLZ2,x,.74,z); box(g,1.34,.12,1.34,HOLZ2,x,.2,z); box(g,1.1,.06,1.1,0x5a3a20,x,.8,z);
  for(let i=0;i<22;i++){ const a=i*2.4, d=.5*Math.sqrt((i+.5)/22), hh=1.0+(1-d)*1.1*(.6+((i*7)%5)/10); ball(g,.27,[0x3f8a3c,0x66b04c,0x4f9a40][i%3],x+Math.cos(a)*d,hh,z+Math.sin(a)*d,1,1.25,1); }
  for(let i=0;i<7;i++){ const a=i*.9; ball(g,.09,i%2?0xffd030:0xf06090,x+Math.cos(a)*.55,1.35+(i%3)*.22,z+Math.sin(a)*.55); }
  k.kasten(x,z,1.42,1.42);
}

/* niedriger Blumenkasten als Randdeko */
function blumenkiste(k,g,x,z){
  box(g,2.6,.4,.7,0xb85a38,x,.22,z); box(g,2.7,.08,.8,HOLZ2,x,.43,z); [-1.1,1.1].forEach(a=>box(g,.2,.08,.8,HOLZ2,x+a,.04,z));
  for(let i=0;i<10;i++){ const a=x-1.1+i*.245; ball(g,.18,i%2?0x4f9a40:0x6cb450,a,.55,z+(i%3-1)*.1,1,.9,1); ball(g,.085,[0xf06090,0xffd030,0xffffff,0xe84838][i%4],a+.04,.72+(i%3)*.05,z+((i*2)%3-1)*.14); }
  k.kasten(x,z,2.7,.8);
}

function baue(k){
  const sc=k.scene;
  const h=BIB.huelle(k,{ B,T,H, himmelLicht:0xfff8e8, grund:0x8a7458, staerke:.74, sonne:0xfff0d0, sonneStaerke:.4,
    wandBild:putzBild(), bodenBild:BIB.dielenBild([190,144,94],'#7a5430'), leiste:HOLZ2, sockel:1.3, sockelFarbe:BUCHE2, oeffnung:{x:0,b:3.7,h:3.55} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  const tuer=baueRiesenbuch(k,sc,hinten);
  wandSchmuck(k,hinten,links,rechts);
  const rueck=gruppe(hinten,0,0,0);
  offenesFenster(k,rueck,-11.8);
  BIB.bogenfenster(rueck,15.6,2.1,HINTEN+.1,2.2,3.0,['#86ccf6','#eef8ff']);
  verschmelze(rueck); ohneSchatten(rueck);

  /* Wandmöbel hängen in den Seitenwänden und blenden beim Drehen mit aus */
  const wl=gruppe(links,0,0,0), wr=gruppe(rechts,0,0,0), seite=s=>s<0?wl:wr;
  /* Regale mit reparierten Büchern */
  BIB.regal(wl,-16.1,-12.95,2.5,3.4,HOLZ); k.kasten(-16.1,-12.95,2.7,.9);
  [[-1,-9.2,3.4],[-1,2.3,3.0],[1,-5.9,3.6],[1,7.0,3.0]].forEach(([s,z,b])=>{ const r=BIB.regal(seite(s),s*17.5,z,b,3.2,HOLZ); r.rotation.y=-s*Math.PI/2; k.kasten(s*17.45,z,.9,b+.2); });
  [[-1,-.6,PAPIERFARBEN],[1,-1.8,PAPIERFARBEN],[-1,7.6,LEDERFARBEN],[1,11.2,LEDERFARBEN]].forEach(([s,z,f])=>rollenGestell(k,seite(s),s,z,f));
  pflanzkasten(k,wl,-16.4,12); pflanzkasten(k,wr,16.4,-12.2);
  [wl,wr].forEach(verschmelze);

  const deko=gruppe(sc,0,0,0);
  werkbank(k,deko,-11.8,-.4);
  /* große Pappbögen und Bretter im Ständer vorn */
  [[-13.6,11.9],[8.6,11.9]].forEach(([x,z])=>{ box(deko,2.8,.22,1.1,HOLZ2,x,.11,z); [-1.3,1.3].forEach(a=>{ box(deko,.16,1.0,1.0,HOLZ,x+a,.6,z); ball(deko,.11,MESSING,x+a,1.15,z); });
    [0x6a8ab0,0xc8a878,0x8a3a34,0xdcc498,0x4a7a50].forEach((c,i)=>box(deko,2.2-(i%3)*.18,1.35-(i%2)*.25,.12,c,x+(i%2)*.06,.85-(i%2)*.12,z-.36+i*.18)); k.kasten(x,z,2.9,1.2); });
  /* eine Holzkiste mit fertig gebundenen Büchern in der Ecke vorn rechts */
  { const x=13.6, z=12.1; box(deko,1.6,.12,1.1,HOLZ,x,.06,z); [-.5,.5].forEach(b=>box(deko,1.6,.5,.1,BUCHE2,x,.35,z+b)); [-.75,.75].forEach(a=>box(deko,.1,.5,1.1,BUCHE2,x+a,.35,z));
    for(let i=0;i<7;i++){ const a=x-.54+i*.18; box(deko,.14,.75+(i%3)*.1,.75,BIB.BUCH[i%7],a,.5+(i%3)*.05,z); box(deko,.145,.06,.76,MESSING,a,.72,z); } k.kasten(x,z,1.7,1.2); }
  /* niedrige Blumenkästen am vorderen Rand */
  [-9.4,-5.2,-1.2,2.8,5.6].forEach(x=>blumenkiste(k,deko,x,x>5?12.6:12.4));
  verschmelze(deko);

  /* Läufer zum Riesenbuch und Teppich vorn */
  BIB.teppich(sc,0,-6.4,2.8,9.2,0x3a7a70,0xe8c070);
  BIB.teppich(sc,0,6.4,5.2,3.4,0xb8503a,0xe8c070);

  /* Hängelampen */
  [-7,7].forEach(x=>{ const l=BIB.lampe(sc,x,6.2,-8.6,0xd86a30); ohneSchatten(l); verschmelze(l); });
  flacker(k,-7,5.2,-8.2,0xffd890,.3,9); flacker(k,7,5.2,-8.2,0xffd890,.3,9);
  const tag=new THREE.PointLight(0xf0f8ff,.55,11,1.5); tag.position.set(-11.8,3.8,-11.2); sc.add(tag);

  /* Sonnenfleck am Boden vor dem Fenster */
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(8,7),basis(0xffffff,{map:leuchtBild('rgba(255,245,180,.3)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); fleck.rotation.x=-Math.PI/2; fleck.position.set(-10.5,.05,-9.4); sc.add(fleck);

  /* ---------- Leben: Schmetterlinge am Fenster ---------- */
  schmetterling(k,sc,-11.8,3.6,-11.2,0xff8a20,0,.7); schmetterling(k,sc,-11.2,4.3,-11.1,0x3a90f0,2.1,.55);
  schmetterling(k,sc,-12.4,2.9,-10.9,0xf860a0,4.2,.62); schmetterling(k,sc,-9.8,4.0,-10.4,0xf8d020,1.2,.45);

  return { tuer, start:[0,3] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-14.8,-11],[-8.6,-10.6],[-4,-8],[3,-10.6],[9,-11],[15.6,-9.6],[-15,-7],[-9.4,-1.6],[-2.2,-2.4],[2.6,-4],[9.2,-5.6],[15,.2],[-15,5.4],[-9.4,4.8],[-2.8,8.6],[3.4,9.6],[9.6,8.6],[15,8.8],[-12,9.8],[12,-7.2]];

/* ---------- Gegenstände: Reihenfolge = ort 1 bis 10 ---------- */
const gegenstaende=[
  { x:-6.3, z:-4.8, steh:[-6.3,-2.7], kasten:[2.9,1.9], treffer:[2.9,3.9,1.9], baue(g){ /* 1 Buchpresse: Bücher zwischen zwei Brettern, Spindel mit großem Rad */
      tisch(g,2.8,1.8,1.0,HOLZ,HOLZ2);
      box(g,2.5,.24,1.45,BUCHE,0,1.12,0);
      /* eingespannte Bücher */
      [[0x2a5a9a,1.36],[0x38804a,1.63]].forEach(([c,y],i)=>{ box(g,1.66-i*.1,.06,1.14,c,0,y-.1,.06); box(g,1.6-i*.1,.15,1.08,PAPIER,.0,y,.07); box(g,1.66-i*.1,.06,1.14,c,0,y+.1,.06); box(g,.12,.26,1.15,c,-.82+i*.05,y,.06); });
      box(g,2.5,.26,1.45,BUCHE,0,1.9,0); box(g,2.52,.06,1.47,MESSING2,0,1.9,0);
      [-1.12,1.12].forEach(x=>{ box(g,.26,2.15,.4,0x23606a,x,2.05,-.1); ball(g,.17,MESSING,x,3.28,-.1); });
      box(g,2.65,.34,.52,0x23606a,0,2.95,-.1); box(g,2.4,.07,.04,GOLD,0,2.95,.18);
      /* Spindel */
      walze(g,.13,1.6,CHROM,0,2.8,-.1); for(let i=0;i<9;i++) liegend(ring(g,.15,.025,EISEN2,0,2.08+i*.09,-.1));
      walze(g,.4,.1,EISEN2,0,2.08,-.1); walze(g,.24,.2,EISEN2,0,3.18,-.1);
      /* Handrad, nach vorn geneigt */
      const rad=gruppe(g,0,3.62,-.1); rad.rotation.x=.38;
      liegend(ring(rad,.72,.085,0xd83a30,0,0,0)); walze(rad,.18,.2,MESSING,0,0,0);
      for(let i=0;i<4;i++){ const a=i*Math.PI/2+.4; strich(rad,[0,0,0],[Math.cos(a)*.72,0,Math.sin(a)*.72],.055,0xd83a30); ball(rad,.14,MESSING,Math.cos(a)*.76,.02,Math.sin(a)*.76); } } },
  { x:6.4, z:-5.8, steh:[6.4,-3.6], kasten:[3.2,2.2], treffer:[3.2,2.8,2.2], baue(g){ /* 2 Papierstapel: viele lose Bögen auf einer Palette */
      [-.75,0,.75].forEach(z=>box(g,3.1,.12,.24,HOLZ2,0,.06,z)); [-1.3,-.65,0,.65,1.3].forEach(x=>box(g,.5,.1,1.95,BUCHE2,x,.18,0));
      const stoss=(x,z,b,t,n)=>{ for(let i=0;i<n;i++){ const q=box(g,b,.048,t,[0xffffff,0xf4eee0,0xfffaf0,0xe4dcc8][i%4],x+(zufall()-.5)*.09,.255+i*.058,z+(zufall()-.5)*.09); q.rotation.y=(zufall()-.5)*(i>n-5?.4:.1); q.castShadow=i%6===0; } return .255+n*.058; };
      const y=stoss(-.5,-.05,1.7,1.5,30); const y2=stoss(.98,.25,.95,1.2,14);
      /* oberste Bögen liegen schräg, einer biegt sich über den Rand */
      const a=box(g,1.6,.02,1.4,0xffffff,-.45,y+.02,0); a.rotation.y=.42;
      const b=box(g,.9,.02,.6,0xffffff,-.35,y-.06,.98); b.rotation.set(.55,.12,0); box(g,.9,.02,.4,0xffffff,-.35,y+.04,.62).rotation.y=.12;
      const c=box(g,.9,.02,1.1,0xfff4cc,.98,y2+.02,.25); c.rotation.y=-.35;
      /* runder Stein als Briefbeschwerer */
      ball(g,.25,0x58a0b8,-.55,y+.16,-.12,1.15,.65,1); ball(g,.07,0xbfe8f0,-.64,y+.28,-.04,1.3,.5,1);
      /* loses Blatt am Boden gelehnt */
      const d=box(g,.9,1.15,.025,0xffffff,1.15,.72,1.02); d.rotation.x=-.22; } },
  { x:11.6, z:-3.2, steh:[9.6,-3.1], r:.98, treffer:[2.1,3.3,2.0], baue(g,k){ /* 3 Leimtopf mit dickem Pinsel */
      walze(g,.92,.16,BUCHE,0,.96,0); walze(g,.78,.08,HOLZ2,0,.84,0); [0,1,2,3].forEach(i=>{ const a=i*Math.PI/2+.78; strich(g,[Math.cos(a)*.5,.86,Math.sin(a)*.5],[Math.cos(a)*.72,0,Math.sin(a)*.72],.1,HOLZ); }); liegend(ring(g,.6,.045,HOLZ2,0,.36,0));
      walze(g,.74,.12,EISEN2,0,1.1,0);
      rohr(g,.68,.58,1.05,EISEN,0,1.66,0,26,true); walze(g,.58,.06,EISEN2,0,1.17,0); liegend(ring(g,.69,.065,CHROM,0,2.19,0)); liegend(ring(g,.62,.035,EISEN2,0,1.45,0));
      walze(g,.64,.05,LEIM,0,2.08,0);
      /* Leim läuft über den Rand */
      [[-.35,.5],[.12,.8],[.5,.35]].forEach(([w,l],i)=>{ const x=Math.sin(w*1.6)*.66, z=Math.cos(w*1.6)*.66; strich(g,[x,2.2,z],[x*.96,2.2-l,z*.96],.075,LEIM); ball(g,.1+i*.01,LEIM,x*.96,2.18-l,z*.96); ball(g,.13,LEIM,x,2.19,z,1.2,.6,1.2); });
      /* Schild mit Tropfen */
      box(g,.5,.46,.05,0xfff2c8,-.1,1.62,.64); ball(g,.12,LEIM,-.1,1.57,.68,1,1,.3); kegel(g,.095,.18,LEIM,-.1,1.72,.675).scale.z=.03;
      const hg=ring(g,.72,.035,EISEN2,0,2.0,-.16,Math.PI); hg.rotation.x=-.5; [-1,1].forEach(s=>ball(g,.09,MESSING,s*.7,2.0,-.12));
      /* breiter Pinsel mit Borsten und rundem Stielende */
      const p=gruppe(g,.15,2.1,.08); p.rotation.z=-.55;
      box(p,.46,.32,.24,0xd8b070,0,.12,0); box(p,.5,.22,.28,CHROM,0,.36,0); box(p,.3,.16,.18,HOLZ,0,.54,0); walze(p,.1,.8,ROT,0,.98,0); ball(p,.15,ROT,0,1.4,0); [-.15,0,.15].forEach(x=>box(p,.03,.3,.25,0xa87c40,x,.1,0));
      const gl=schein(g,'rgba(255,200,80,.55)',-.2,2.2,.4,.45); k.anim.push(t=>{ gl.material.opacity=.3+.4*Math.abs(Math.sin(t*1.3)); }); } },
  { x:12.2, z:4.8, steh:[10.1,4.8], kasten:[3.0,1.8], treffer:[2.9,3.1,1.8], baue(g){ /* 4 Tintenfässer: vier große Gläser mit bunter Tinte und eine Schreibfeder */
      tisch(g,2.9,1.65,1.15,HOLZ,HOLZ2); box(g,2.7,.08,1.4,0x2f6a5a,0,1.19,0);
      [[-.98,.2,0x2448c8,1],[-.3,-.2,0xd02830,1.18],[.4,.22,0x1f9a48,.95],[1.0,-.18,0x38284a,1.08]].forEach(([x,z,c,s])=>{ const y=1.23;
        box(g,.58*s,.5*s,.58*s,c,x,y+.25*s,z); ball(g,.33*s,c,x,y+.5*s,z,1,.45,1); walze(g,.17*s,.16*s,CHROM,x,y+.68*s,z); liegend(ring(g,.19*s,.035,MESSING,x,y+.77*s,z)); walze(g,.14*s,.02,c,x,y+.775*s,z);
        box(g,.4*s,.26*s,.02,WEISS,x,y+.24*s,z+.3*s); ball(g,.065*s,c,x,y+.23*s,z+.31*s,1,1,.25);
        ball(g,.04,WEISS,x-.18*s,y+.46*s,z+.28*s,.7,1.8,.5); });
      /* Korken liegen daneben */
      [[-.62,.55],[.72,.58]].forEach(([x,z])=>{ walze(g,.14,.18,0xc89860,x,1.32,z); });
      /* große Schreibfeder im roten Glas: schmale, spitze Fahne mit sichtbarem Kiel */
      const f=gruppe(g,-.3,2.0,-.2); f.rotation.z=.38;
      form(f,[[0,.42],[.11,.55],[.15,.74],[.07,.78],[.16,.86],[.14,1.08],[.06,1.1],[.12,1.2],[.08,1.42],[0,1.72],[-.08,1.46],[-.12,1.18],[-.05,1.12],[-.13,1.03],[-.14,.76],[-.1,.57]],0xfffaf0,0,0,0);
      form(f,[[0,1.38],[.075,1.43],[0,1.72],[-.07,1.45]],0x40a0e0,0,0,.006);
      strich(f,[0,-.05,.015],[0,1.55,.015],.025,0xb87830);
      [.62,.82,1.02,1.22].forEach(y=>[-1,1].forEach(s=>strich(f,[0,y,.012],[s*.1,y+.13,.012],.007,0xc8bca0)));
      /* Probierblatt mit Farbklecksen */
      const bl=box(g,.62,.02,.42,WEISS,.05,1.245,.55); bl.rotation.y=.2; [[-.12,0x2448c8],[.06,0xd02830],[.2,0x1f9a48]].forEach(([a,c])=>walze(g,.065,.012,c,.05+a,1.262,.55-a*.2)); } },
  { x:6.3, z:HINTEN, wand:'hinten', steh:[6.3,-11.6], kasten:[3.6,.8], treffer:[3.6,2.9,.8], trefferY:1.45, baue(g){ /* 5 Werkzeugbrett: Lochbrett mit freundlichen Werkzeugen */
      box(g,3.55,2.75,.1,HOLZ2,0,2.9,.1); box(g,3.3,2.5,.12,0xf0d09a,0,2.9,.12);
      for(let i=0;i<13;i++) for(let j=0;j<9;j++) hell(box(g,.05,.05,.02,0x8a6a38,-1.5+i*.25,1.86+j*.26,.19));
      const z=.28, haken=(x,y)=>ball(g,.06,EISEN2,x,y,z+.06);
      /* Kinderschere mit runden Spitzen */
      [-1,1].forEach(s=>{ strich(g,[-1.05+s*.26,2.62,z],[-1.05-s*.17,3.62,z+(s>0?.03:0)],.065,CHROM); ball(g,.075,CHROM,-1.05-s*.17,3.62,z+(s>0?.03:0)); ring(g,.22,.075,0xe0382c,-1.05+s*.32,2.42,z+.02); });
      ball(g,.08,EISEN2,-1.05,3.1,z+.08); haken(-1.05,3.25);
      /* Holzhammer */
      box(g,.8,.46,.26,0xc8904a,-.08,3.55,z); box(g,.1,.48,.28,HOLZ2,-.4,3.55,z); box(g,.1,.48,.28,HOLZ2,.24,3.55,z); walze(g,.085,1.05,HOLZ,-.08,2.85,z); ball(g,.12,HOLZ,-.08,2.32,z); haken(-.38,3.2); haken(.22,3.2);
      /* Falzbein (flach und rund) */
      box(g,.2,1.0,.08,WEISS,.62,3.1,z); ball(g,.1,WEISS,.62,3.6,z,1,1,.4); ball(g,.1,WEISS,.62,2.6,z,1,1,.4); haken(.62,3.45);
      /* Farbrolle mit Griff */
      const w=walze(g,.17,.66,0x3a70c0,1.2,3.6,z+.06); w.rotation.z=Math.PI/2; strich(g,[.85,3.6,z],[.85,3.28,z],.03,CHROM); strich(g,[.85,3.28,z],[1.2,3.15,z],.03,CHROM); walze(g,.09,.55,0xf8b020,1.2,2.85,z); ball(g,.1,0xf8b020,1.2,2.56,z);
      /* Garnrolle und Schraubzwinge */
      ring(g,.2,.09,0x38a060,-.35,1.95,z); ball(g,.06,EISEN2,-.35,2.15,z+.1);
      box(g,.14,.62,.12,0x2a5a9a,.55,2.05,z); [2.34,1.76].forEach(y=>box(g,.52,.13,.14,0x2a5a9a,.76,y,z)); walze(g,.045,.3,CHROM,.94,1.92,z); ball(g,.09,ROT,.94,2.07,z);
      /* Lineal unten */
      box(g,2.9,.22,.07,0xf8d850,0,1.56,.22); for(let i=0;i<24;i++) box(g,.02,i%4?.07:.12,.02,SCHWARZ,-1.38+i*.12,1.63,.27); } },
  { x:-6.1, z:HINTEN, wand:'hinten', steh:[-6.1,-11.6], kasten:[3.0,.8], treffer:[2.8,3.85,.8], trefferY:.6, baue(g){ /* 6 Lederschürze am Haken */
      box(g,2.7,3.35,.08,0x3a7068,0,2.75,.09); box(g,2.46,3.1,.1,0xcfe4d4,0,2.75,.1);
      box(g,2.2,.22,.18,HOLZ2,0,4.1,.18); scheibe(g,.13,.35,MESSING,0,4.1,.3); ball(g,.17,MESSING,0,4.1,.5);
      /* Halsband */
      [-1,1].forEach(s=>strich(g,[0,4.18,.36],[s*.42,3.48,.26],.075,LEDER2));
      const aussen=[[-.5,2.12],[.5,2.12],[.56,1.35],[.72,1.0],[1.06,.9],[.92,-.6],[.8,-.74],[-.8,-.74],[-.92,-.6],[-1.06,.9],[-.72,1.0],[-.56,1.35]];
      form(g,aussen.map(([x,y])=>[x*1.07,(y-.7)*1.05+.7]),LEDER2,0,1.42,.2); form(g,aussen,LEDER,0,1.42,.23);
      /* Nähte */
      for(let i=0;i<9;i++){ const x=-.72+i*.18; box(g,.09,.025,.012,0xf0d8a0,x,.76,.25); if(i<6) box(g,.09,.025,.012,0xf0d8a0,-.4+i*.16,3.44,.25); }
      /* große Tasche mit Klappe */
      box(g,1.3,.78,.1,LEDER3,0,1.56,.27); box(g,1.36,.14,.13,LEDER2,0,1.98,.27); box(g,.04,.72,.12,LEDER2,0,1.54,.28);
      for(let i=0;i<8;i++){ box(g,.09,.025,.012,0xf0d8a0,-.54+i*.155,1.25,.325); } [-.56,.56].forEach(x=>ball(g,.06,MESSING,x,1.9,.35));
      /* Zollstock-Ende und Stoffzipfel in der Tasche */
      box(g,.14,.5,.04,0xf8d040,-.3,2.2,.26).rotation.z=.12; ball(g,.2,0xd84838,.34,2.08,.25,1,1.1,.25);
      /* Schnallen und Bänder */
      [-1,1].forEach(s=>{ ring(g,.12,.035,MESSING,s*.42,3.45,.29); strich(g,[s*.98,2.36,.25],[s*1.14,1.9,.25],.055,LEDER2); strich(g,[s*1.14,1.9,.25],[s*1.02,1.35,.25],.05,LEDER2); ball(g,.09,LEDER2,s*.95,2.34,.25,1,1,.5); }); } },
  { x:-12.9, z:3.8, steh:[-10.8,3.8], kasten:[3.0,2.1], treffer:[3.0,3.6,2.1], baue(g){ /* 7 Stoffrollen: bunte gemusterte Rollen stehen in einer Kiste */
      box(g,2.9,.14,2.0,HOLZ2,0,.07,0); [-.95,.95].forEach(z=>{ box(g,2.9,.28,.1,BUCHE2,0,.35,z); box(g,2.9,.28,.1,BUCHE2,0,.76,z); }); [-1.4,1.4].forEach(x=>{ box(g,.1,.28,1.9,BUCHE2,x,.35,0); box(g,.1,.28,1.9,BUCHE2,x,.76,0); [-.95,.95].forEach(z=>box(g,.16,1.0,.16,HOLZ,x,.5,z)); });
      [[-.9,-.45,0x2aa0a0,2.9,0],[-.05,-.52,0xe04050,3.25,1],[.85,-.4,0xf8b828,2.75,2],[-.85,.4,0x8a50c0,2.15,2],[.05,.35,0x4aa84a,2.45,0],[.9,.45,0x3a70d0,1.95,1]].forEach(([x,z,c,h,m])=>{
        walze(g,.36,h-.15,c,x,(h-.15)/2+.15,z); walze(g,.37,.03,c,x,h,z); walze(g,.3,.05,WEISS,x,h+.01,z); liegend(ring(g,.19,.03,c,x,h+.045,z)); walze(g,.09,.2,0xb89060,x,h+.1,z);
        if(m===0) for(let i=0;i<4;i++) liegend(ring(g,.362,.035,WEISS,x,h-.28-i*.34,z));
        if(m===1) for(let i=0;i<18;i++){ const a=(i%6)*1.047+(Math.floor(i/6)%2)*.5; ball(g,.075,WEISS,x+Math.sin(a)*.34,h-.3-Math.floor(i/6)*.4,z+Math.cos(a)*.34,1,1,1); }
        if(m===2) for(let i=0;i<3;i++){ walze(g,.368,.14,i%2?0xffffff:0xf06090,x,h-.3-i*.4,z); } });
      /* abgerollte Stoffbahn hängt vorn über den Rand */
      box(g,.8,.06,.65,0x4aa84a,.05,.93,.75); box(g,.8,.78,.06,0x4aa84a,.05,.57,1.07); [.34,.62].forEach(y=>box(g,.82,.08,.07,WEISS,.05,y,1.075)); } },
  { x:-9.2, z:8.4, steh:[-7.0,8.4], kasten:[2.9,1.9], treffer:[2.8,3.1,1.9], baue(g){ /* 8 Nähkasten: offener Kasten mit Garnrollen, Nadelkissen und Maßband */
      tisch(g,2.8,1.75,.95,BUCHE,HOLZ);
      const rot=0xb04838;
      box(g,2.3,.14,1.35,HOLZ2,0,1.02,0); [-.62,.62].forEach(z=>box(g,2.3,.55,.1,rot,0,1.34,z)); [-1.1,1.1].forEach(x=>box(g,.1,.55,1.3,rot,x,1.34,0));
      box(g,2.34,.07,.12,GOLD,0,1.62,.62); scheibe(g,.12,.06,GOLD,0,1.32,.69); box(g,2.12,.04,1.16,0xf8dca8,0,1.38,0);
      /* aufgeklappter Deckel mit Polster */
      const d=gruppe(g,0,1.62,-.65); d.rotation.x=-.28; box(d,2.3,1.15,.12,rot,0,.58,0); box(d,2.0,.9,.05,0xf4a8b8,0,.58,.08); [-.5,0,.5].forEach(x=>[.38,.78].forEach(y=>ball(d,.05,rot,x,y,.12))); box(d,.5,.14,.14,GOLD,0,1.18,0);
      /* Garnrollen */
      [[-.78,0x2a60c8],[-.38,0xe83a40],[.02,0x38a850],[.42,0xf8c020]].forEach(([x,c])=>{ walze(g,.13,.4,c,x,1.65,-.3); [1.43,1.87].forEach(y=>walze(g,.17,.06,BUCHE,x,y,-.3)); walze(g,.045,.02,HOLZ3,x,1.91,-.3); });
      /* Nadelkissen mit runden Köpfen */
      ball(g,.32,0xe83a50,.7,1.58,.15,1,.75,1); for(let i=0;i<6;i++){ const a=i*1.05; ball(g,.055,[WEISS,0xf8d020,0x40a0f0][i%3],.7+Math.cos(a)*.17,1.84,.15+Math.sin(a)*.17); strich(g,[.7+Math.cos(a)*.12,1.76,.15+Math.sin(a)*.12],[.7+Math.cos(a)*.17,1.84,.15+Math.sin(a)*.17],.012,CHROM); }
      ball(g,.12,0x3f8a3c,.7,1.82,.15,1.3,.3,1.3);
      /* Maßband, aufgerollt, hängt über den Rand */
      liegend(ring(g,.2,.07,0xf8e040,-.55,1.46,.22)); liegend(ring(g,.08,.05,0xf8e040,-.55,1.47,.22));
      box(g,.5,.03,.15,0xf8e040,-.2,1.64,.45); box(g,.5,.03,.3,0xf8e040,-.2,1.65,.6).scale.x=.15; box(g,.16,.7,.03,0xf8e040,-.2,1.32,.72); for(let i=0;i<5;i++) box(g,.09,.02,.012,SCHWARZ,-.2,1.05+i*.13,.74);
      /* Knöpfe und Fingerhut */
      [[0,.3,0x8a50c0],[.2,.05,0x2aa0a0],[.08,.45,0xf07830],[-.22,.05,0x3a70d0]].forEach(([x,z,c])=>{ walze(g,.11,.06,c,x,1.43,z); [-.03,.03].forEach(a=>walze(g,.018,.012,SCHWARZ,x+a,1.465,z)); });
      rohr(g,.09,.13,.22,CHROM,.35,1.52,.36); ball(g,.09,CHROM,.35,1.63,.36,1,.5,1); } },
  { x:12.2, z:-12.3, steh:[12.2,-10.3], kasten:[3.3,1.3], treffer:[3.3,3.8,1.4], baue(g,k){ /* 9 Waschbecken mit tropfendem Hahn, Seife und Handtuch */
      /* Rückwand aus Kacheln */
      box(g,2.7,2.0,.12,0x3a8a9a,-.25,2.5,-.48); BIB.tafel(g,fliesenBild(),2.5,1.8,-.25,2.5,-.41);
      /* Unterschrank */
      box(g,2.5,1.15,1.0,0x5aa8b8,-.25,.66,0); box(g,2.4,.1,.9,0x2a5a68,-.25,.05,0); [-.62,.62].forEach(x=>{ box(g,1.05,.8,.05,0x78c0cc,-.25+x,.66,.52); ball(g,.08,MESSING,-.25+x*.25,.76,.57); });
      /* Becken: Rand, Boden, Wasser */
      box(g,2.65,.14,1.18,KERAMIK,-.25,1.3,.02); [-.5,.54].forEach(z=>box(g,2.65,.34,.14,KERAMIK,-.25,1.52,z)); [-1.5,1.0].forEach(x=>box(g,.16,.34,1.16,KERAMIK,x,1.52,.02));
      box(g,2.36,.14,.92,0x6cccec,-.25,1.43,.02); box(g,2.68,.05,.17,0x3a8ac0,-.25,1.7,.54);
      /* Wasserhahn mit rundem Drehknopf */
      walze(g,.13,.75,CHROM,-.25,2.05,-.34); ball(g,.14,CHROM,-.25,2.42,-.34); strich(g,[-.25,2.42,-.34],[-.25,2.46,.08],.11,CHROM); ball(g,.12,CHROM,-.25,2.46,.08); strich(g,[-.25,2.46,.08],[-.25,2.22,.14],.095,CHROM); liegend(ring(g,.095,.025,EISEN,-.25,2.21,.145));
      walze(g,.05,.22,CHROM,-.25,2.62,-.34); [0,1].forEach(i=>{ const q=walze(g,.055,.44,CHROM,-.25,2.74,-.34); q.rotation.set(i?Math.PI/2:0,0,i?0:Math.PI/2); }); [[-.22,0],[.22,0],[0,-.22],[0,.22]].forEach(([a,b],i)=>ball(g,.085,i<2?0x2a70d0:0xe04040,-.25+a,2.74,-.34+b));
      /* Seife auf Schale mit Schaumblasen */
      box(g,.6,.07,.34,0xf8d860,.55,1.74,.5); box(g,.4,.18,.24,0xf890b0,.55,1.86,.5); [-.2,.2].forEach(x=>ball(g,.12,0xf890b0,.55+x,1.86,.5,.8,.75,1));
      [[.28,2.0,.09],[.8,1.93,.07],[.66,2.08,.05]].forEach(([x,y,r])=>ball(g,r,0xeafcff,x,y,.5));
      /* Handtuch hängt breit nach vorn über einer quer liegenden Stange */
      box(g,.5,.08,.4,HOLZ2,1.42,.04,.02); walze(g,.06,2.2,HOLZ,1.42,1.12,.02); strich(g,[1.42,2.2,.02],[1.42,2.2,.28],.045,HOLZ);
      const st=walze(g,.05,.76,HOLZ,1.43,2.22,.3); st.rotation.z=Math.PI/2; [1.06,1.8].forEach(x=>ball(g,.075,MESSING,x,2.22,.3));
      box(g,.6,1.35,.14,0xfff4dc,1.43,1.55,.34); walze(g,.1,.6,0xfff4dc,1.43,2.22,.33).rotation.z=Math.PI/2; [1.05,1.25].forEach(y=>box(g,.61,.09,.155,0xe86048,1.43,y,.34));
      for(let i=0;i<6;i++) box(g,.05,.11,.08,0xfff4dc,1.18+i*.1,.83,.34);
      /* Spiegelrand-Bord mit Handbürste */
      box(g,1.1,.09,.28,HOLZ,-1.0,2.95,-.3); box(g,.55,.15,.2,0xd8a860,-1.1,3.08,-.3); box(g,.5,.08,.17,WEISS,-1.1,3.19,-.3); ball(g,.12,0x40a8d8,-.62,3.11,-.3);
      /* Tropfen und Wellenring */
      const tr=gruppe(g,-.25,2.16,.145); tr.userData.lebendig=true; ball(tr,.085,0x58c8ff,0,0,0,1,1.25,1); kegel(tr,.06,.13,0x58c8ff,0,.13,0);
      const wr=gruppe(g,-.25,1.52,.145); wr.userData.lebendig=true; liegend(ring(wr,.2,.018,WEISS,0,0,0));
      k.anim.push(t=>{ const a=(t*.7)%1; if(a<.45){ tr.visible=true; tr.position.y=2.15; tr.scale.setScalar(.35+a*1.45); wr.visible=false; }
        else if(a<.7){ const u=(a-.45)/.25; tr.visible=true; tr.scale.setScalar(1); tr.position.y=2.15-u*u*.62; wr.visible=false; }
        else { const u=(a-.7)/.3; tr.visible=false; wr.visible=true; wr.scale.set(.3+u*1.6,1,.3+u*1.4); } }); } },
  { x:-12.3, z:-5.2, steh:[-12.3,-3.2], kasten:[5.6,1.0], treffer:[5.5,3.4,1.0], baue(g,k){ /* 10 Leine mit marmoriertem Buntpapier zwischen zwei Pfosten */
      [-2.5,2.5].forEach(x=>{ box(g,.75,.14,.9,HOLZ2,x,.07,0); walze(g,.13,3.1,HOLZ,x,1.6,0); ball(g,.2,0xe84a3a,x,3.2,0); [-.3,.3].forEach(z=>strich(g,[x,.65,0],[x,.12,z],.07,HOLZ)); });
      const linie=x=>3.0-.2*(1-(x/2.5)*(x/2.5));
      for(let i=0;i<10;i++){ const a=-2.5+i*.5; strich(g,[a,linie(a),0],[a+.5,linie(a+.5),0],.028,HOLZ3); }
      [['#2a60c0','#8ad8f0','#ffffff','#1a2a80','#60e0c0'],['#e8506a','#ffd040','#ffffff','#a02050','#ff9040'],['#2f9a58','#c8f060','#ffffff','#10605a','#f8e040'],['#7a40b0','#f090d0','#ffffff','#3a2070','#60c8f0'],['#f08020','#ffe870','#ffffff','#d03828','#40b0a0']].forEach((F,i)=>{
        const x=-1.9+i*.95, y=linie(x), p=gruppe(g,x,y,0); p.userData.lebendig=true;
        const hh=1.35+(i%2)*.18, tex=marmorBild(F);
        const m=new THREE.Mesh(new THREE.PlaneGeometry(.84,hh),new THREE.MeshLambertMaterial({map:tex,side:THREE.DoubleSide,emissive:0x222222})); m.position.set(0,-hh/2-.02,.02); m.castShadow=true; p.add(m);
        const kl=gruppe(p,0,0,0); [-.27,.27].forEach(a=>{ box(kl,.1,.28,.12,0xe8b870,a,-.01,.03); box(kl,.11,.04,.13,EISEN2,a,.02,.03); }); verschmelze(kl);
        k.anim.push(t=>{ const wind=Math.sin(t*1.9+i*1.1)*.5+Math.sin(t*3.3+i*2.3)*.22; p.rotation.x=wind*.22; p.rotation.z=Math.sin(t*1.4+i)*.035; }); }); } }
];

return { titel:'Die Buchbinderwerkstatt', breite:36, tiefe:27, oben:['70,48,28','130,100,66','206,182,140'], baue, gegenstaende, verstecke };
})();

/* Raum 5: Das geheime Turmzimmer. Violett-blaue Steinwände, Holzbalken, Sternenschmuck, Mondlicht, Laternen und Kerzen,
   eine Holztreppe am linken Rand. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: das Mondfenster rechts in der Rückwand, zwei Flügel schwingen auf den Balkon hinaus. */
RAEUME3D.bibliothek[4] = (function(){
const { HOLZ, HOLZ2, HOLZ3, MESSING, MESSING2, PAPIER, PAPIER2, GOLD, SCHWARZ } = BIB;
const STEIN=0x9a8cc4, STEIN2=0x6c5e98, STEINH=0xc4b8e4, VIOLETT=0x6a42a8, VIOLETT2=0x462a78, NACHT=0x22306a, ROSA=0xd0508a, TUERKIS=0x2fa0a8,
  CREME=0xfbf3da, GRUEN=0x3f8a52, GRUEN2=0x66ac5c, TON=0xb8623a, ROT=0xb03a4a, GELB=0xffd84a;
const B=36, T=27, H=7.2, HINTEN=-13.5, AX=1.5; /* AX = Mitte des Mondfensters (im Startbild in der Lücke der Kopfleiste) */
const BS=2.0; /* Höhe, an der der Rundbogen beginnt */

/* ---------- kleine Helfer ---------- */
const flach=m=>{ m.rotation.x=Math.PI/2; return m; };
const hell=m=>{ m.castShadow=false; return m; };
const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh) m.castShadow=false; });
/* flacher fünfzackiger Stern, Blick nach +z */
function stern(par,r,c,x,y,z,dreh){
  const f=new THREE.Shape();
  for(let i=0;i<10;i++){ const a=Math.PI/2+i*Math.PI/5, q=i%2?r*.45:r; if(i) f.lineTo(Math.cos(a)*q,Math.sin(a)*q); else f.moveTo(Math.cos(a)*q,Math.sin(a)*q); }
  const m=new THREE.Mesh(new THREE.ShapeGeometry(f),typeof c==='number'?mat(c):c); m.position.set(x,y,z); m.rotation.z=dreh||0; par.add(m); return m;
}
/* Kerzenflamme, flackert. Fuß bei (x,y,z) */
function flamme(k,par,x,y,z,gr,ph){
  const f=gruppe(par,x,y,z); f.userData.lebendig=true;
  const a=hell(kegel(f,.09*gr,.32*gr,basis(0xff9a24),0,.16*gr,0)), b=hell(ball(f,.055*gr,basis(0xfff2a0),0,.09*gr,.03*gr,1,1.5,1));
  const s=schein(par,'rgba(255,180,80,.6)',x,y+.16*gr,z+.05,.95*gr);
  k.anim.push(t=>{ const q=1+Math.sin(t*10+ph)*.16+Math.sin(t*17+ph*2)*.08; a.scale.y=.32*gr*q; a.position.y=.16*gr*q; a.rotation.z=Math.sin(t*6+ph)*.08;
    b.scale.y=.08*gr*q; const w=.95*gr*(1+Math.sin(t*12+ph)*.09); s.scale.set(w,w,1); });
}
/* eckige Wandlaterne, hängt an der Wand mit Blick nach +z (Gruppe in der Wandgruppe) */
function laterne(k,par,x,y,z,dreh,ph){
  const g=gruppe(par,x,y,z); g.rotation.y=dreh;
  box(g,.18,.5,.06,HOLZ3,0,.45,.04); box(g,.1,.1,.55,HOLZ3,0,.68,.3); walze(g,.025,.2,HOLZ3,0,.56,.5);
  box(g,.5,.08,.5,MESSING2,0,.42,.5); const d=kegel(g,.36,.22,MESSING2,0,.57,.5); d.rotation.y=Math.PI/4;
  [[-.2,-.2],[.2,-.2],[-.2,.2],[.2,.2]].forEach(([a,c])=>box(g,.05,.66,.05,MESSING2,a,.05,.5+c));
  box(g,.5,.1,.5,MESSING2,0,-.31,.5); walze(g,.09,.28,CREME,0,-.13,.5);
  flamme(k,g,0,.02,.5,.95,ph);
}
/* Topfpflanze */
function pflanze(par,k,x,z,gr){
  const g=gruppe(par,x,0,z);
  rohr(g,.5*gr,.34*gr,.7*gr,TON,0,.35*gr,0); flach(ring(g,.5*gr,.07*gr,0x8a4628,0,.7*gr,0));
  for(let i=0;i<9;i++){ const a=i*2.4, d=(i%3)*.17+.08, h=1.0+(i%4)*.24; strich(g,[0,.65*gr,0],[Math.cos(a)*d*gr,h*gr,Math.sin(a)*d*gr],.025*gr,GRUEN);
    const b=ball(g,.26*gr,i%2?GRUEN:GRUEN2,Math.cos(a)*(d+.12)*gr,(h+.12)*gr,Math.sin(a)*(d+.12)*gr,.65,1.25,.35); b.rotation.set(Math.sin(a)*.5,a,-Math.cos(a)*.5); }
  k.kreis(x,z,.55*gr);
}

/* ---------- Ausgang: das Mondfenster ---------- */
function himmelBild(){
  return bild(512,320,(g)=>{ const v=g.createLinearGradient(0,0,0,320); v.addColorStop(0,'#14205a'); v.addColorStop(.6,'#3452a0'); v.addColorStop(1,'#7a86d0'); g.fillStyle=v; g.fillRect(0,0,512,320);
    for(let i=0;i<90;i++){ g.fillStyle=i%4?'#ffffff':'#ffe890'; const s=i%7?2:4; g.fillRect(zufall()*508,zufall()*230,s,s); }
    /* Dächer der Stadt mit warmen Fenstern */
    g.fillStyle='#1a1c46'; for(let x=0;x<512;x+=46){ const h=42+(x*37%40); g.fillRect(x,320-h,42,h); g.beginPath(); g.moveTo(x-3,320-h); g.lineTo(x+21,320-h-26); g.lineTo(x+45,320-h); g.fill(); }
    g.fillStyle='#ffcc60'; for(let x=14;x<512;x+=46) g.fillRect(x,320-26-(x*13%14),8,10); });
}
function baueFenster(k,sc,hinten){
  /* Balkon und Nachthimmel hinter der Öffnung */
  const aus=gruppe(hinten,AX,0,0);
  box(aus,5.6,.1,3.9,0xa89cc8,0,-.045,-15.45);
  [-14.4,-15.4,-16.4].forEach(z=>box(aus,5.6,.012,.06,STEIN2,0,.012,z));
  box(aus,5.6,.14,.3,STEINH,0,.72,-16.95); box(aus,5.6,.18,.34,STEIN,0,.1,-16.95);
  for(let i=0;i<10;i++){ const x=-2.5+i*.555; walze(aus,.09,.5,STEINH,x,.42,-16.95); ball(aus,.13,STEINH,x,.38,-16.95,1,1.2,1); }
  const tex=himmelBild(), himmel=new THREE.Mesh(new THREE.PlaneGeometry(11,6.6),basis(0xffffff,{map:tex})); himmel.position.set(0,3.2,-17.45); aus.add(himmel);
  [-1,1].forEach(s=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(3.7,6.6),basis(0xffffff,{map:tex})); m.position.set(s*2.85,3.2,-15.6); m.rotation.y=-s*Math.PI/2; aus.add(m); });
  /* großer Mond */
  const MX=1.65, MY=1.68;
  hell(ball(aus,.45,basis(0xfff4c0),MX,MY,-17.2,1,1,.25));
  [[-.15,.12,.1],[.16,-.1,.075],[.04,.22,.05]].forEach(([a,b,r])=>hell(ball(aus,r,basis(0xe8d898),MX+a,MY+b,-17.07,1,1,.2)));
  verschmelze(aus); ohneSchatten(aus);
  const hof=schein(hinten,'rgba(255,240,180,.6)',AX+MX,MY,-16.95,1.7);
  /* Rundbogen: Zwickel, Gewände, Bogensteine */
  const r=gruppe(hinten,AX,0,HINTEN);
  const zw=new THREE.Shape(); zw.moveTo(-2,BS); zw.lineTo(-2,BS+2.05); zw.lineTo(2,BS+2.05); zw.lineTo(2,BS); zw.absarc(0,BS,2,0,Math.PI,false);
  const z=new THREE.Mesh(new THREE.ExtrudeGeometry(zw,{depth:.45,bevelEnabled:false,curveSegments:20}),mat(STEIN2)); z.position.z=-.47; r.add(z);
  [-1,1].forEach(s=>{ box(r,.52,BS,.5,STEINH,s*2.26,BS/2,.14); box(r,.72,.3,.66,STEIN2,s*2.26,.15,.18); box(r,.68,.22,.62,GOLD,s*2.26,BS,.17); });
  ring(r,2.25,.25,STEINH,0,BS,.1,Math.PI); ring(r,2.02,.07,GOLD,0,BS,.3,Math.PI); ring(r,2.5,.06,GOLD,0,BS,.22,Math.PI);
  box(r,4.1,.07,.5,GOLD,0,.025,.05);
  /* goldene Mondsichel und Sterne über dem Bogen */
  const si=new THREE.Shape(); si.absarc(0,0,.48,Math.PI*.35,Math.PI*1.65,false); si.quadraticCurveTo(-.34,0,Math.cos(Math.PI*.35)*.48,Math.sin(Math.PI*.35)*.48);
  const sm=new THREE.Mesh(new THREE.ShapeGeometry(si,18),mat(GELB)); sm.position.set(0,BS+2.95,.3); r.add(sm);
  stern(r,.26,GELB,.5,BS+2.95,.3); [-1,1].forEach(s=>{ stern(r,.2,GOLD,s*1.35,BS+2.65,.2,s*.2); stern(r,.14,GOLD,s*2.35,BS+2.1,.2); });
  verschmelze(r);
  /* zwei Flügel mit Glas, Drehpunkt außen */
  const glas=basis(0xbfd8ff,{transparent:true,opacity:.13,depthWrite:false,side:THREE.DoubleSide});
  const fluegel=[-1,1].map(s=>{ const f=gruppe(hinten,AX+s*1.96,0,HINTEN-.02); f.userData.lebendig=true; const t=gruppe(f,-s*.98,0,0);
    const form=new THREE.Shape();
    if(s<0){ form.moveTo(-.98,0); form.lineTo(.98,0); form.lineTo(.98,BS+1.96); form.absarc(.98,BS,1.96,Math.PI/2,Math.PI,false); }
    else { form.moveTo(-.98,0); form.lineTo(.98,0); form.lineTo(.98,BS); form.absarc(-.98,BS,1.96,0,Math.PI/2,false); }
    t.add(new THREE.Mesh(new THREE.ShapeGeometry(form,16),glas));
    box(t,.13,BS,.12,HOLZ,s*.91,BS/2,0); box(t,.11,BS+1.95,.12,HOLZ,-s*.92,(BS+1.95)/2,0);
    const b=ring(t,1.9,.07,HOLZ,-s*.98,BS,0,Math.PI/2); b.rotation.z=s<0?Math.PI/2:0;
    box(t,1.96,.3,.13,HOLZ,0,.15,0); box(t,1.94,.09,.1,HOLZ,0,.95,0); box(t,.07,BS+1.7,.08,HOLZ,s*.02,(BS+1.7)/2,0);
    box(t,1.46,.07,.09,HOLZ,-s*.19,BS+1.15,0);
    ball(t,.1,GOLD,-s*.74,1.35,.12);
    verschmelze(t); return f; });
  /* goldener Riegel mit Zahlenschloss: über der Figur, aber unterhalb der Kopfleiste */
  const sperre=gruppe(hinten,AX,1.75,HINTEN+.24); sperre.userData.lebendig=true;
  box(sperre,4.3,.17,.12,GOLD,0,0,0); [-2.1,2.1].forEach(x=>box(sperre,.24,.44,.24,MESSING2,x,0,0));
  box(sperre,1.58,1.3,.1,VIOLETT2,0,.03,.08); ring(sperre,.9,.04,GOLD,0,.03,.1).scale.set(.98,.82,1);
  const schloss=BIB.zahlenschloss(sperre,0,-.1,.28); schloss.scale.setScalar(1.35);
  verschmelze(sperre);
  const glanz=schein(hinten,'rgba(255,225,110,.55)',AX,1.75,HINTEN+.62,1.3);
  /* Mondlicht am Boden und im Raum */
  const fleck=new THREE.Mesh(new THREE.PlaneGeometry(5.6,6.4),basis(0xffffff,{map:leuchtBild('rgba(150,180,255,.42)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));
  fleck.rotation.x=-Math.PI/2; fleck.position.set(AX-.4,.05,-10.6); sc.add(fleck);
  const licht=new THREE.PointLight(0xa8c4ff,.55,12,1.5); licht.position.set(AX,3.0,-12.2); sc.add(licht);
  [-1,1].forEach(s=>k.kasten(AX+s*2.3,-13.2,.75,.75));
  k.kasten(AX,-13.2,5.35,.9); /* geschlossenes Fenster: die Figur läuft nicht ins Schloss (beim Öffnen läuft sie ohne Wegsuche hindurch) */
  return ausgang(k,{ name:'Mondfenster', einfach:'Fenster mit dem Mond', steh:[AX,-11.0], durch:[AX,-15.5],
    treffer:{x:AX,y:2.1,z:-13,b:4.4,h:4.2,t:.8}, schildOben:[AX,4.25,-12.4], glanz:[AX,1.75,-12.7],
    bewege:(auf,t)=>{ const a=Math.max(0,Math.min(1,(auf-.06)/.9)), w=1.65*a*a*(3-2*a);
      fluegel[0].rotation.y=w; fluegel[1].rotation.y=-w; sperre.visible=auf<.06; glanz.visible=auf<.06; licht.intensity=.55+1.1*auf;
      const h=1.7+auf*1.4+Math.sin(t*1.5)*.12; hof.scale.set(h,h,1); } });
}

/* ---------- Wandschmuck: Balken, Sterne, Laternen, Stoffbahnen, hängende Sterne ---------- */
function wandSchmuck(k,hinten,links,rechts){
  const h=gruppe(hinten,0,0,0), L=gruppe(links,0,0,0), R=gruppe(rechts,0,0,0);
  const zi=HINTEN+.14;
  /* Holzbalken hinten (beim Fenster ausgespart) */
  [-17.7,-11.1,-5.9,-1.7,4.55,11.55,17.7].forEach(x=>{ box(h,.36,H,.26,HOLZ2,x,H/2,zi); box(h,.5,.24,.34,HOLZ3,x,6.05,zi+.02); });
  box(h,B,.34,.3,HOLZ2,0,6.28,zi+.02);
  [-11.1,-5.9,-1.7,4.55,11.55].forEach(x=>[-1,1].forEach(s=>strich(h,[x+s*.1,5.35,zi+.05],[x+s*.95,6.15,zi+.05],.09,HOLZ2)));
  /* Seitenwände */
  [[L,-1],[R,1]].forEach(([w,s])=>{ const x=s*(B/2-.12);
    [-13.2,-7,-.5,6,12.9].forEach(z=>{ box(w,.26,H,.36,HOLZ2,x,H/2,z); [-1,1].forEach(v=>strich(w,[x-s*.05,5.35,z+v*.1],[x-s*.05,6.15,z+v*.95],.09,HOLZ2)); });
    box(w,.3,.34,T,HOLZ2,x,6.28,0); });
  /* goldene Sterne verstreut über den Wänden */
  [[-16.3,4.6,.28],[-14.6,5.4,.18],[-13.4,3.9,.14],[-12.2,5.2,.2],[-8.6,5.45,.15],[-6.8,5.0,.24],[-4.6,5.0,.16],[-2.8,5.45,.2],[5.4,5.2,.22],[6.5,4.2,.15],[12.8,4.9,.22],[15.1,5.45,.15],[16.5,3.9,.26],
   [-15.4,6.8,.18],[-9.9,6.75,.22],[-3.2,6.8,.16],[3.6,6.75,.2],[14.4,6.8,.2]].forEach(([x,y,r],i)=>stern(h,r,i%3?GOLD:GELB,x,y,HINTEN+.03,(i%5)*.25));
  [[L,-1],[R,1]].forEach(([w,s])=>{ [[-11.4,4.7,.26],[-9.2,5.5,.15],[-5.2,4.5,.18],[-2.6,5.3,.28],[1.6,4.4,.15],[3.8,5.4,.22],[8.2,4.8,.28],[10.8,5.5,.16],[-8,6.75,.18],[2.6,6.75,.2],[9.4,6.8,.18]].forEach(([z,y,r],i)=>{
      const m=stern(w,r,i%3?GOLD:GELB,s*(B/2-.03),y,z+(s>0?.6:0),0); m.rotation.y=-s*Math.PI/2; });
    /* Stoffbahnen */
    (s<0?[-3.8,2.6]:[-3.8,9.4]).forEach((z,i)=>{ const x=s*(B/2-.14), c=i?VIOLETT:NACHT;
      box(w,.12,.1,1.9,HOLZ3,x,4.0,z); [-.95,.95].forEach(v=>ball(w,.11,GOLD,x,4.0,z+v));
      box(w,.06,2.3,1.6,c,x,2.8,z); [3.65,1.95].forEach(y=>box(w,.08,.14,1.62,GOLD,x,y,z));
      [-.55,0,.55].forEach(v=>{ const q=kegel(w,.2,.4,c,x,1.48,z+v); q.rotation.x=Math.PI; q.scale.x=.04; ball(w,.08,GOLD,x,1.24,z+v); }); });
  });
  /* Laternen */
  [-11.1,-1.7,4.55,11.55].forEach((x,i)=>laterne(k,h,x,3.3,HINTEN+.24,0,i*1.7));
  [[L,-1],[R,1]].forEach(([w,s])=>[-7,6].forEach((z,i)=>laterne(k,w,s*(B/2-.24),3.3,z,-s*Math.PI/2,i*2.3+s)));
  [h,L,R].forEach(g=>{ verschmelze(g); ohneSchatten(g); });
  /* Sterne an Schnüren, pendeln leicht */
  [[hinten,-14.4,HINTEN+.5,1.5],[hinten,-3.85,HINTEN+.5,1.0],[hinten,6.0,HINTEN+.5,1.35],[hinten,14.2,HINTEN+.5,.8],
   [links,-17.3,-1.8,1.5],[links,-17.3,3,1.1],[rechts,17.3,-3,1.2],[rechts,17.3,2.4,1.6]].forEach(([w,x,z,l],i)=>{
    const p=gruppe(w,x,6.15,z); p.userData.lebendig=true; const innen=gruppe(p,0,0,0); if(w!==hinten) innen.rotation.y=x<0?Math.PI/2:-Math.PI/2;
    hell(walze(innen,.014,l,GELB,0,-l/2,0)); stern(innen,.3,GELB,0,-l-.26,0); stern(innen,.13,GELB,0,-l*.45,.02);
    verschmelze(innen); ohneSchatten(innen); k.anim.push(t=>{ p.rotation.z=Math.sin(t*.9+i*1.9)*.05; }); });
}

/* ---------- Holztreppe am linken Rand hinauf zu einer kleinen Empore ---------- */
function treppe(k,sc){
  const g=gruppe(sc,0,0,0), n=11, z0=-1.4, dz=.82, hoch=3.0;
  for(let i=0;i<n;i++){ const z=z0-i*dz, y=(i+1)*hoch/n;
    box(g,2.1,.16,dz+.06,HOLZ,-16.9,y-.08,z); box(g,2.0,y-.12,.12,HOLZ2,-16.95,(y-.12)/2,z-dz/2+.08); box(g,.9,.02,dz+.07,VIOLETT,-16.9,y+.008,z);
    walze(g,.06,1.0,HOLZ2,-15.88,y+.5,z); }
  strich(g,[-15.88,hoch/n+1.02,z0],[-15.88,hoch+1.02,z0-(n-1)*dz],.09,HOLZ3);
  ball(g,.17,GOLD,-15.88,hoch/n+1.14,z0);
  /* Empore in der Ecke */
  const za=z0-(n-1)*dz-.4, zm=(za+HINTEN)/2, zl=za-HINTEN;
  box(g,2.5,.18,zl,HOLZ,-16.75,hoch-.08,zm); box(g,.18,hoch,.18,HOLZ3,-15.65,hoch/2,za-.15); box(g,.18,hoch,.18,HOLZ3,-15.65,hoch/2,HINTEN+.35);
  box(g,.14,.12,zl,HOLZ3,-15.62,hoch+1.02,zm); for(let z=HINTEN+.35;z<za;z+=.55) walze(g,.05,1.0,HOLZ2,-15.62,hoch+.5,z);
  /* Bücher auf der Empore und Fässchen mit Rollen darunter */
  BIB.stapel(g,-17.1,hoch,-12.6,3,.4); BIB.stapel(g,-17.2,hoch,-11.3,2,-.3);
  rohr(g,.5,.4,.9,HOLZ2,-16.8,.45,-12.5); [.25,.7].forEach(y=>flach(ring(g,.47,.035,MESSING2,-16.8,y,-12.5)));
  [[-.18,.1,.18],[.15,-.1,-.2],[.05,.2,.06],[-.05,-.18,-.1]].forEach(([a,c,s],i)=>strich(g,[-16.8+a,.6,-12.5+c],[-16.8+a+s,1.55+(i%2)*.15,-12.5+c*1.5],.09,i%2?PAPIER:PAPIER2));
  verschmelze(g); k.kasten(-16.75,-7.5,2.5,12.1); k.verdecker(g,-16.7,-8,1.6);
}

/* ---------- Möbel als Deko ---------- */
/* Schreibpult an der rechten Wand */
function schreibtisch(k,sc,x,z){
  const g=gruppe(sc,x,0,z); g.rotation.y=-Math.PI/2;
  box(g,3.2,.16,1.4,HOLZ,0,1.2,0); [-1.4,1.4].forEach(a=>[-.5,.5].forEach(c=>box(g,.18,1.15,.18,HOLZ2,a,.57,c))); box(g,2.8,.32,.1,HOLZ2,0,.98,-.55);
  /* aufgeschlagenes Buch, Tinte, Feder */
  box(g,1.2,.05,.8,0x7a2a4a,-.4,1.31,.1); [-1,1].forEach(s=>{ const q=box(g,.55,.07,.72,PAPIER,-.4+s*.28,1.35,.1); q.rotation.z=s*.07; for(let i=0;i<4;i++) box(g,.4,.012,.03,0x8a7a6a,-.4+s*.28,1.395,-.12+i*.15); });
  box(g,.24,.22,.24,NACHT,.62,1.39,.2); strich(g,[.62,1.45,.2],[.92,2.0,0],.02,CREME); ball(g,.17,CREME,.86,1.88,.04,.35,1.5,.12).rotation.z=-.5;
  BIB.stapel(g,1.05,1.28,-.28,3,.2); strich(g,[-1.45,1.38,-.35],[-.85,1.38,-.5],.1,PAPIER2); strich(g,[-1.4,1.38,-.08],[-1.05,1.38,-.15],.09,PAPIER);
  /* Hocker */
  rohr(g,.45,.45,.14,VIOLETT,0,.78,1.15); [[-.28,.9],[.28,.9],[0,1.45]].forEach(([a,c])=>strich(g,[a*.6,.72,c],[a,0,c],.06,HOLZ2));
  k.kasten(x,z,1.5,3.3); k.kreis(x-1.15,z,.5);
}
/* Kommode mit vielen kleinen Schubladen */
function kommode(k,sc,x,z,dreh){
  const g=gruppe(sc,x,0,z); g.rotation.y=dreh;
  box(g,2.8,1.5,.9,HOLZ,0,.82,0); box(g,3.0,.14,1.05,HOLZ3,0,1.63,0); [-1.25,1.25].forEach(a=>box(g,.2,.14,.7,HOLZ3,a,.07,0));
  for(let i=0;i<4;i++) for(let j=0;j<3;j++){ box(g,.56,.38,.06,HOLZ2,-.99+i*.66,.34+j*.46,.46); ball(g,.06,GOLD,-.99+i*.66,.34+j*.46,.52); }
  BIB.stapel(g,-.8,1.7,0,2,.3);
  box(g,.55,.35,.45,TON,.7,1.87,0); for(let i=0;i<6;i++) ball(g,.22,i%2?GRUEN:GRUEN2,.7+Math.cos(i*1.05)*.22,2.14+(i%3)*.09,Math.sin(i*1.05)*.16);
  const quer=Math.abs(Math.sin(dreh))>.5; k.kasten(x,z,quer?1.05:3.0,quer?3.0:1.05);
}
/* Holzbank mit Büchern und Decke (vorn) */
function bank(k,sc,x,z){
  const g=gruppe(sc,x,0,z);
  box(g,3.2,.16,.9,HOLZ,0,.66,0); [-1.35,1.35].forEach(a=>box(g,.22,.6,.8,HOLZ2,a,.3,0)); box(g,2.5,.14,.14,HOLZ2,0,.26,0);
  BIB.stapel(g,-.9,.74,0,3,.25); strich(g,[.3,.86,-.25],[1.3,.86,.15],.12,PAPIER); strich(g,[.5,.84,.2],[1.35,.84,.35],.1,PAPIER2);
  k.kasten(x,z,3.3,.95);
}

/* ---------- Leben: Glühwürmchen ---------- */
function gluehwuermchen(k,sc){
  const n=36, im=new THREE.InstancedMesh(GEO.sph,basis(0xeaff7a),n), o=new THREE.Object3D(), D=[], S=[];
  const orte=[[-14,-8],[-6,-9],[2,-8],[7,-10],[14,-8],[-13,-1],[-3,-1],[8,-2],[15,0],[-14,9],[-3,9],[10,9]];
  for(let i=0;i<n;i++){ const p=orte[i%orte.length]; D.push([p[0]+(zufall()-.5)*3,1.4+zufall()*2.8,p[1]+(zufall()-.5)*3,zufall()*6.28,.35+zufall()*.5]); }
  im.frustumCulled=false; sc.add(im);
  for(let i=0;i<8;i++) S.push(schein(sc,'rgba(220,255,110,.65)',0,0,0,.5));
  k.anim.push(t=>{ D.forEach((d,i)=>{ const a=t*d[4]+d[3], x=d[0]+Math.sin(a)*.9, y=d[1]+Math.sin(a*1.7)*.35, z=d[2]+Math.cos(a*.8)*.9, g=.035+.018*Math.max(0,Math.sin(t*2.3+d[3]*3));
      o.position.set(x,y,z); o.scale.set(g,g,g); o.updateMatrix(); im.setMatrixAt(i,o.matrix);
      if(i<8){ S[i].position.set(x,y,z); const w=g*11; S[i].scale.set(w,w,1); } }); im.instanceMatrix.needsUpdate=true; });
}

function baue(k){
  const sc=k.scene;
  const h=BIB.huelle(k,{ B,T,H, himmelLicht:0xe6e4ff, grund:0x765a6a, staerke:.8, sonne:0xdce4ff, sonneStaerke:.38,
    wandBild:BIB.quaderBild([128,118,176],'#40356a',8), bodenBild:BIB.dielenBild([156,112,98],'#432a38'),
    leiste:HOLZ3, sockel:1.1, sockelFarbe:0x6a4438, oeffnung:{x:AX,b:4,h:BS+2} });
  const hinten=h.hinten, links=h.links, rechts=h.rechts;
  sc.background=new THREE.Color(0x1c1638);
  const tuer=baueFenster(k,sc,hinten);
  wandSchmuck(k,hinten,links,rechts);
  treppe(k,sc);

  /* ---------- Teppiche ---------- */
  const boden=gruppe(sc,0,0,0);
  [[5.2,GOLD,.006],[4.95,VIOLETT2,.01],[3.9,GOLD,.014],[3.75,VIOLETT,.018],[1.7,GOLD,.022],[1.55,NACHT,.026]].forEach(([r,c,y])=>hell(walze(boden,r,.006,c,0,y,.3)));
  for(let i=0;i<16;i++){ const a=i*Math.PI/8; const m=stern(boden,.24,GOLD,Math.cos(a)*4.42,.021,.3+Math.sin(a)*4.42); m.rotation.set(-Math.PI/2,0,a); }
  verschmelze(boden); ohneSchatten(boden);
  BIB.teppich(sc,-7.4,5.8,5.4,4.4,VIOLETT,GOLD); BIB.teppich(sc,AX,-8.2,3.2,4.6,NACHT,GOLD); BIB.teppich(sc,0,11.2,7,2.8,ROT,GOLD);

  /* ---------- Regale und Möbel (am Ende gemeinsam verschmolzen) ---------- */
  const moebel=gruppe(sc,0,0,0);
  [[-3.85,3.1,3.6],[5.9,2.0,3.2],[14.4,3.6,4.0]].forEach(([x,b,hh])=>{ BIB.regal(moebel,x,-13.05,b,hh,HOLZ2); k.kasten(x,-13.05,b+.2,.95); });
  [[1,-9.8,3.2,4.0],[1,-.6,3.4,3.2],[-1,9.4,3.2,2.8]].forEach(([s,z,b,hh])=>{ const r=BIB.regal(moebel,s*17.45,z,b,hh,HOLZ2); r.rotation.y=-s*Math.PI/2; k.kasten(s*17.45,z,.95,b+.2); });
  /* Leiter am rechten Regal */
  const leiter=gruppe(moebel,0,0,0);
  [-10.9,-10.0].forEach(z=>strich(leiter,[15.9,0,z],[16.95,3.7,z],.07,HOLZ));
  for(let i=1;i<8;i++){ const u=i/8.4; strich(leiter,[15.9+1.05*u,3.7*u,-10.9],[15.9+1.05*u,3.7*u,-10],.05,HOLZ); }
  k.kasten(16.5,-10.4,1.2,1.1);

  schreibtisch(k,moebel,17.1,9.2);
  kommode(k,moebel,-17.35,2.6,Math.PI/2);
  bank(k,moebel,-10.5,12.2); bank(k,moebel,10.5,12.2);
  const gruen=gruppe(moebel,0,0,0);
  [[-13.4,-12.6,1],[-16.8,-.0,.85],[-17,12.4,1.3],[17,12.5,1.3],[17.1,3,1.15],[-14.2,12.4,.8],[12.0,-12.65,.7],[17.1,-12.4,1.15],[14.2,12.4,.8]].forEach(([x,z,g])=>pflanze(gruen,k,x,z,g));
  /* Fässchen mit Papierrollen */
  [[17,5.2],[-17,6.1]].forEach(([x,z])=>{ rohr(gruen,.55,.45,1.0,HOLZ,x,.5,z); [.28,.78].forEach(y=>flach(ring(gruen,.52,.04,MESSING2,x,y,z)));
    [[-.2,.1,.15],[.18,-.12,-.18],[.05,.22,.05],[-.08,-.2,-.08],[.2,.14,.12]].forEach(([a,c,s],i)=>strich(gruen,[x+a,.7,z+c],[x+a+s,1.65+(i%3)*.14,z+c*1.5],.09,i%2?PAPIER:PAPIER2)); k.kreis(x,z,.6); });
  verschmelze(moebel);
  /* Kräuterbüschel hängen am Balken */
  [[-1,-9.6],[-1,3],[1,-5.5],[1,5]].forEach(([s,z])=>{ const w=s<0?links:rechts, g=gruppe(w,s*17.45,6.1,z);
    for(let j=0;j<3;j++){ const a=(j-1)*.55; strich(g,[0,0,a],[0,-.45,a],.012,PAPIER2); for(let i=0;i<5;i++) ball(g,.11,i%2?GRUEN:GRUEN2,Math.cos(i*2.5)*.08,-.55-i*.11,a+Math.sin(i*2.5)*.08,.8,1.5,.8); }
    verschmelze(g); ohneSchatten(g); });

  gluehwuermchen(k,sc);
  maeuschen(k,[[-15,10.4],[-11,10.2],[-12,9.4],[-15,9.6]],1.1,0);
  maeuschen(k,[[13.4,-8.6],[15.4,-7.4],[15.2,-2.4],[14.2,-6]],.9,3);

  return { tuer, start:[0,3] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-14.4,-9.4],[-14.6,-4],[-11.8,-10.4],[-6.6,-9],[-3.2,-8.4],[11.4,-8.8],[6,-9.4],[13,-8.6],[15.4,-1.8],[9,-.6],[1.8,-3.4],[-6.4,-.6],[-14.8,.6],[-14.6,7.4],[-9.4,9.8],[-3,9],[3.6,8.8],[9.4,7.8],[14.6,10.4],[15,6.6]];

/* ---------- Bilder für die Wand-Gegenstände ---------- */
function sternkartenBild(){
  return bild(512,512,(g)=>{ const v=g.createRadialGradient(256,256,20,256,256,260); v.addColorStop(0,'#3452a8'); v.addColorStop(1,'#131f52'); g.fillStyle=v; g.fillRect(0,0,512,512);
    g.strokeStyle='rgba(170,195,255,.45)'; g.lineWidth=3; [90,165,232].forEach(r=>{ g.beginPath(); g.arc(256,256,r,0,7); g.stroke(); });
    for(let i=0;i<8;i++){ const a=i*Math.PI/4; g.beginPath(); g.moveTo(256,256); g.lineTo(256+Math.cos(a)*232,256+Math.sin(a)*232); g.stroke(); }
    const zack=(x,y,r)=>{ g.fillStyle='#ffe27a'; g.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, q=i%2?r*.45:r; g.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q); } g.closePath(); g.fill(); };
    [[[110,170],[170,120],[240,140],[300,100],[345,170]],[[120,300],[180,350],[160,420]],[[290,300],[360,270],[410,330],[350,390],[290,300]]].forEach(l=>{ g.strokeStyle='#ffffff'; g.lineWidth=5; g.beginPath(); l.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])); g.stroke(); l.forEach((p,i)=>zack(p[0],p[1],i%2?18:24)); });
    g.fillStyle='#ffffff'; for(let i=0;i<70;i++) g.fillRect(40+zufall()*430,40+zufall()*430,4,4);
    g.fillStyle='#fff1b8'; g.beginPath(); g.arc(256,244,30,0,7); g.fill(); });
}
function mondBild(){
  return bild(640,416,(g)=>{ g.fillStyle='#f2e4bc'; g.fillRect(0,0,640,416); g.fillStyle='#1d2a60'; g.fillRect(14,14,612,388);
    /* acht Mondphasen in zwei Reihen */
    for(let i=0;i<8;i++){ const x=92+(i%4)*152, y=112+Math.floor(i/4)*184, r=54;
      g.fillStyle='#46508a'; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill();
      if(i){ g.fillStyle='#fff1a8'; g.beginPath();
        for(let j=0;j<=24;j++){ const a=-Math.PI/2+j*Math.PI/24, s=i<=4?1:-1; g.lineTo(x+s*Math.cos(a)*r,y+Math.sin(a)*r); }
        for(let j=0;j<=24;j++){ const a=Math.PI/2-j*Math.PI/24, w=Math.cos(i*Math.PI/4)*(i<=4?1:-1); g.lineTo(x+w*Math.cos(a)*r,y+Math.sin(a)*r); }
        g.closePath(); g.fill(); }
      g.strokeStyle='#c8d0f8'; g.lineWidth=3; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.stroke();
      g.fillStyle='#e8b830'; for(let j=0;j<=i%4;j++) g.fillRect(x-(i%4)*9+j*18-4,y+68,8,8); } });
}
function notenBild(zwei,farbe){
  return bild(96,96,(g)=>{ g.fillStyle=farbe; g.strokeStyle='#3a1a50'; g.lineWidth=4;
    const kopf=(x,y)=>{ g.beginPath(); g.arc(x,y,13,0,Math.PI*2); g.stroke(); g.fill(); };
    if(zwei){ g.fillRect(30,16,7,56); g.fillRect(72,12,7,56); g.fillRect(30,12,49,12); kopf(23,72); kopf(65,68); }
    else { g.fillRect(52,12,8,60); g.beginPath(); g.moveTo(58,12); g.quadraticCurveTo(86,26,74,50); g.quadraticCurveTo(76,32,58,30); g.fill(); kopf(44,72); } });
}

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-3.4, z:-4.3, steh:[-3.4,-2.3], r:.95, treffer:[1.9,3.0,1.8], baue(g,k){ /* 1 Kristallkugel auf rundem Tisch */
      walze(g,.62,.1,HOLZ3,0,.05,0); walze(g,.16,1.0,HOLZ2,0,.55,0);
      rohr(g,.9,1.0,.34,VIOLETT,0,1.08,0,24); walze(g,.92,.1,VIOLETT2,0,1.28,0); flach(ring(g,.98,.035,GOLD,0,.93,0));
      for(let i=0;i<10;i++){ const a=i*.6283; stern(g,.1,GELB,Math.sin(a)*.97,1.08,Math.cos(a)*.97).rotation.y=a; }
      rohr(g,.34,.52,.26,GOLD,0,1.46,0); flach(ring(g,.37,.07,MESSING2,0,1.62,0));
      [0,1,2,3].forEach(i=>{ const a=i*1.571+.785; strich(g,[Math.sin(a)*.42,1.45,Math.cos(a)*.42],[Math.sin(a)*.58,1.92,Math.cos(a)*.58],.055,GOLD); ball(g,.08,GOLD,Math.sin(a)*.58,1.94,Math.cos(a)*.58); });
      const kugel=ball(g,.68,mat(0x9a7ae8,{transparent:true,opacity:.62,emissive:0x2a1a6a,depthWrite:false}),0,2.22,0); kugel.castShadow=false;
      const wirbel=gruppe(g,0,2.22,0); wirbel.userData.lebendig=true;
      for(let i=0;i<7;i++){ const a=i*.9; hell(ball(wirbel,.09-(i%3)*.018,basis(i%2?0xfff4b0:0xd8f0ff),Math.cos(a)*(.12+i*.045),(i-3)*.09,Math.sin(a)*(.12+i*.045))); }
      verschmelze(wirbel);
      hell(ball(g,.13,basis(0xffffff,{transparent:true,opacity:.75}),-.28,2.52,.54,1,1.4,.3));
      const s=schein(g,'rgba(190,160,255,.7)',0,2.22,.2,2.1);
      const l=new THREE.PointLight(0xb89aff,.5,7,1.5); l.position.set(0,2.5,.4); g.add(l);
      k.anim.push(t=>{ wirbel.rotation.y=t*.9; wirbel.rotation.z=Math.sin(t*.6)*.35; const w=2.1+Math.sin(t*2.1)*.3; s.scale.set(w,w,1); l.intensity=.5+Math.sin(t*2.1)*.14; }); } },
  { x:4.0, z:-5.4, steh:[4.0,-3.35], r:1.05, treffer:[2.1,3.6,1.9], baue(g,k){ /* 2 Große Sanduhr */
      walze(g,1.0,.18,HOLZ3,0,.09,0); walze(g,.92,.22,HOLZ,0,.29,0); walze(g,.92,.22,HOLZ,0,3.28,0); walze(g,1.0,.16,HOLZ3,0,3.46,0);
      [.4,3.17].forEach(y=>flach(ring(g,.88,.05,GOLD,0,y,0))); ball(g,.17,GOLD,0,3.68,0);
      [0,1,2,3].forEach(i=>{ const a=i*1.571+.785, x=Math.sin(a)*.78, z=Math.cos(a)*.78; walze(g,.07,2.8,HOLZ2,x,1.78,z); [.85,1.78,2.7].forEach(y=>ball(g,.12,GOLD,x,y,z,1,.8,1)); });
      const profil=[[.52,.4],[.64,.62],[.62,1.0],[.4,1.38],[.09,1.72],[.09,1.84],[.4,2.18],[.62,2.56],[.64,2.94],[.52,3.17]];
      const glas=new THREE.Mesh(new THREE.LatheGeometry(profil.map(p=>new THREE.Vector2(p[0],p[1])),24),mat(0xcdf0ff,{transparent:true,opacity:.28,emissive:0x203848,side:THREE.DoubleSide,depthWrite:false})); g.add(glas);
      const SAND=basis(0xf0c450), oben=hell(kegel(g,.46,.8,SAND,0,2.2,0)); oben.rotation.x=Math.PI;
      const unten=hell(kegel(g,.56,.8,SAND,0,.8,0)), strahl=hell(walze(g,.025,1.3,basis(0xffe080),0,1.12,0));
      [oben,unten,strahl].forEach(m=>m.userData.lebendig=true);
      k.anim.push(t=>{ const u=(t*.05)%1, o=Math.max(.06,1-u), a=.2+u*.8; oben.scale.set(.46*Math.cbrt(o),.75*Math.cbrt(o),.46*Math.cbrt(o)); oben.position.y=1.8+oben.scale.y/2;
        unten.scale.set(.56*(.5+a*.5),.85*a,.56*(.5+a*.5)); unten.position.y=.4+unten.scale.y/2; strahl.scale.x=strahl.scale.z=.022+Math.sin(t*20)*.006; }); } },
  { x:-6.8, z:-4.6, steh:[-6.8,-2.7], r:.95, treffer:[1.9,4.1,1.4], baue(g,k){ /* 3 Eule auf der Stange */
      walze(g,.75,.14,HOLZ3,0,.07,0); walze(g,.55,.14,HOLZ2,0,.2,0); walze(g,.12,2.0,HOLZ,0,1.2,0); [.5,1.9].forEach(y=>walze(g,.17,.12,GOLD,0,y,0));
      const st=walze(g,.11,1.7,HOLZ,0,2.2,.05); st.rotation.z=Math.PI/2; [-.88,.88].forEach(x=>ball(g,.17,GOLD,x,2.2,.05));
      const e=BIB.eule(k,g,0,2.28,0,1.4);
      k.anim.push(t=>{ const flattert=Math.max(0,Math.sin(t*.7))>.93?1:0, w=flattert*Math.abs(Math.sin(t*13))*.9+.03; e.fluegel[0].rotation.z=-w; e.fluegel[1].rotation.z=w; e.g.position.y=2.28+flattert*Math.abs(Math.sin(t*13))*.07; }); } },
  { x:11.4, z:-4.8, steh:[11.3,-2.9], r:.9, treffer:[2.2,3.9,1.2], baue(g,k){ /* 4 Kerzenleuchter mit fünf Kerzen */
      walze(g,.72,.12,MESSING2,0,.06,0); rohr(g,.22,.55,.34,GOLD,0,.28,0); walze(g,.1,2.0,GOLD,0,1.4,0); [.75,1.5,2.2].forEach((y,i)=>ball(g,.2-i*.02,GOLD,0,y,0,1,.75,1));
      [.5,.95].forEach(r=>ring(g,r,.065,GOLD,0,2.4,0,Math.PI).rotation.z=Math.PI);
      walze(g,.07,.5,GOLD,0,2.55,0);
      [[-.95,2.4],[-.5,2.4],[0,2.75],[.5,2.4],[.95,2.4]].forEach(([x,y],i)=>{ const h=i===2?.65:(i%4?.55:.45);
        if(i!==2) walze(g,.045,.12,GOLD,x,y+.04,0); rohr(g,.22,.12,.12,MESSING2,x,y+.14,0); walze(g,.12,h,CREME,x,y+.2+h/2,0); ball(g,.05,CREME,x+.1,y+.2+h*.7,.04,1,2,1);
        flamme(k,g,x,y+.22+h,0,1,i*1.9); });
      flacker(k,11.4,3.6,-4.0,0xffa848,.65,9); } },
  { x:8.8, z:HINTEN, wand:'hinten', steh:[8.8,-11.4], kasten:[3.5,.8], treffer:[3.7,3.8,.8], trefferY:.55, baue(wand,k){ /* 5 Sternkarte: runde Himmelskarte */
      const g=gruppe(wand,0,-.4,0);
      flach(walze(g,1.72,.16,HOLZ2,0,2.85,.1));
      const m=new THREE.Mesh(new THREE.CircleGeometry(1.55,48),basis(0xe8e8f4,{map:sternkartenBild()})); m.position.set(0,2.85,.2); g.add(m);
      ring(g,1.62,.12,GOLD,0,2.85,.21); ring(g,1.78,.045,MESSING2,0,2.85,.16);
      for(let i=0;i<8;i++){ const a=i*Math.PI/4+.39; ball(g,.11,GOLD,Math.cos(a)*1.62,2.85+Math.sin(a)*1.62,.3); }
      stern(g,.24,GELB,0,4.68,.26); walze(g,.04,.2,MESSING2,0,4.5,.15);
      const f=[[-.72,.5],[.78,-.55],[.35,.92]].map(([x,y])=>schein(g,'rgba(255,245,180,.9)',x,2.85+y,.32,.4));
      k.anim.push(t=>{ f.forEach((s,i)=>{ const w=.2+.35*Math.abs(Math.sin(t*1.6+i*2)); s.scale.set(w,w,1); }); }); } },
  { x:-8.35, z:HINTEN, wand:'hinten', steh:[-8.35,-11.4], kasten:[3.8,.8], treffer:[4.0,3.4,.8], trefferY:1.4, baue(g,k){ /* 6 Mondkalender */
      box(g,3.9,2.65,.14,HOLZ,0,3.0,.09);
      const m=new THREE.Mesh(new THREE.PlaneGeometry(3.6,2.34),basis(0xece8f0,{map:mondBild()})); m.position.set(0,3.0,.18); g.add(m);
      [-1,1].forEach(s=>{ box(g,4.05,.13,.1,GOLD,0,3.0+s*1.28,.17); box(g,.13,2.68,.1,GOLD,s*1.96,3.0,.17); });
      [-1.96,1.96].forEach(x=>[1.72,4.28].forEach(y=>ball(g,.13,MESSING2,x,y,.24)));
      [-1,1].forEach(s=>strich(g,[s*1.4,4.33,.12],[0,4.9,.12],.03,PAPIER2)); ball(g,.12,GOLD,0,4.9,.14);
      /* wandernder Ring um die heutige Mondform */
      const r=ring(g,.37,.035,basis(0xff8ab8),0,3.5,.22); r.castShadow=false; r.userData.lebendig=true;
      k.anim.push(t=>{ const i=Math.floor(t*.4)%8; r.position.set((92+(i%4)*152-320)/640*3.6,3.0-(112+Math.floor(i/4)*184-208)/416*2.34,.22); }); } },
  { x:12.0, z:3.3, steh:[11.8,5.8], r:1.55, treffer:[3.2,3.4,3.0], baue(g,k){ /* 7 Planetenmodell: dreht sich */
      walze(g,1.0,.16,HOLZ3,0,.08,0); rohr(g,.4,.8,.45,HOLZ,0,.38,0); walze(g,.5,.12,HOLZ2,0,.66,0);
      walze(g,.09,1.6,GOLD,0,1.5,0); ball(g,.17,MESSING2,0,.95,0);
      hell(ball(g,.45,basis(0xffd028),0,2.55,0)); const s=schein(g,'rgba(255,200,60,.65)',0,2.55,0,1.8);
      flach(ring(g,1.62,.035,MESSING2,0,.9,0)); for(let i=0;i<4;i++){ const a=i*1.571; strich(g,[0,.72,0],[Math.cos(a)*1.62,.9,Math.sin(a)*1.62],.035,MESSING2); }
      const arme=[[.72,1.35,0x3a9ae0,.17,1.0,0],[1.0,1.65,0xe0603a,.2,.7,2.2],[1.32,1.95,0xe8a860,.3,.45,4.1],[1.6,2.3,0x58c8a0,.19,.3,1.1]].map(([r,y,c,gr,v,start],i)=>{
        const a=gruppe(g,0,0,0); a.userData.lebendig=true;
        strich(a,[0,y-.28+i*.02,0],[r,y-.28+i*.02,0],.03,GOLD); strich(a,[r,y-.28,0],[r,y+.2,0],.03,GOLD); ball(a,gr,c,r,y+.25,0);
        if(i===2) flach(ring(a,.45,.04,PAPIER2,r,y+.25,0)).rotation.x=1.25;
        if(i===0) ball(a,.07,CREME,r+.27,y+.37,0);
        flach(ring(g,r,.012,0x9ab0e8,0,y+.25,0)); verschmelze(a); return [a,v,start]; });
      k.anim.push(t=>{ arme.forEach(([a,v,start])=>a.rotation.y=t*v*.7+start); const w=1.8+Math.sin(t*2.4)*.2; s.scale.set(w,w,1); }); } },
  { x:-11.8, z:2.4, dreh:.3, steh:[-11.4,4.7], kasten:[3.0,2.1], treffer:[2.9,2.6,1.9], baue(g,k){ /* 8 Sternentruhe */
      [-1.1,1.1].forEach(x=>[-.55,.55].forEach(z=>ball(g,.2,MESSING2,x,.14,z,1,.8,1)));
      box(g,2.65,1.15,1.5,VIOLETT,0,.76,0); box(g,2.75,.14,1.6,GOLD,0,1.34,0); box(g,2.75,.12,1.6,GOLD,0,.24,0);
      const deckel=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,2.65,24,1,false,0,Math.PI),mat(VIOLETT2)); deckel.rotation.z=Math.PI/2; deckel.position.set(0,1.4,0); deckel.scale.x=.85; deckel.castShadow=true; g.add(deckel);
      [-1.27,0,1.27].forEach(x=>{ const r=ring(g,.76,.055,GOLD,x,1.4,0,Math.PI); r.rotation.y=Math.PI/2; r.scale.y=.86; });
      [-1.27,1.27].forEach(x=>box(g,.16,1.15,1.55,GOLD,x,.76,0));
      box(g,.5,.55,.1,GOLD,0,1.15,.79); ball(g,.08,SCHWARZ,0,1.2,.85); box(g,.06,.18,.04,SCHWARZ,0,1.08,.85);
      [[-.75,.72,.3],[.75,.72,.3],[-.38,.45,.14],[.4,1.04,.13],[-.42,1.08,.12],[.35,.48,.12]].forEach(([x,y,r])=>stern(g,r,GELB,x,y,.775));
      [[-.65,1.9],[.65,1.9]].forEach(([x,y])=>{ stern(g,.2,GELB,x,y,.55).rotation.x=-.85; });
      const f=[[-.9,2.2,.4],[.2,2.4,.3],[1.0,2.0,.55]].map(([x,y,z])=>schein(g,'rgba(255,240,150,.9)',x,y,z,.45));
      k.anim.push(t=>{ f.forEach((s,i)=>{ const w=.55*Math.max(0,Math.sin(t*1.8+i*2.1)); s.scale.set(w,w,1); }); }); } },
  { x:-7.2, z:5.6, dreh:.55, steh:[-4.95,6.5], r:1.2, treffer:[2.1,3.2,2.2], baue(g,k){ /* 9 Schaukelstuhl mit Kissen */
      const wippe=gruppe(g,0,2.6,0); wippe.userData.lebendig=true; const s=gruppe(wippe,0,-2.6,0);
      [-.72,.72].forEach(x=>{ const bogen=1.05, r=ring(s,2.55,.085,HOLZ2,x,2.64,0,bogen); r.rotation.set(0,Math.PI/2,-Math.PI/2-bogen/2);
        strich(s,[x,.18,.62],[x,1.62,.66],.09,HOLZ); strich(s,[x,.18,-.62],[x,3.0,-.98],.1,HOLZ); ball(s,.15,GOLD,x,3.07,-.99);
        box(s,.24,.12,1.65,HOLZ,x,1.66,-.05); ball(s,.15,HOLZ,x,1.66,.8); });
      box(s,1.5,.16,1.4,HOLZ,0,.98,0); strich(s,[-.72,.5,.63],[.72,.5,.63],.06,HOLZ2);
      strich(s,[-.72,2.86,-.96],[.72,2.86,-.96],.11,HOLZ); strich(s,[-.72,1.5,-.79],[.72,1.5,-.79],.07,HOLZ);
      [-.44,-.15,.15,.44].forEach(x=>strich(s,[x,1.05,-.73],[x,2.86,-.96],.055,HOLZ2));
      /* zwei weiche Kissen */
      ball(s,.5,ROSA,0,1.2,.05,1.35,.42,1.25);
      const kissen=gruppe(s,0,1.92,-.66); kissen.rotation.x=-.12; ball(kissen,.52,TUERKIS,0,0,0,1.15,1.05,.38);
      stern(kissen,.28,GELB,0,0,.22); [[-.5,.45],[.5,.45],[-.5,-.45],[.5,-.45]].forEach(([x,y])=>ball(kissen,.09,GELB,x,y,0));
      verschmelze(s);
      k.anim.push(t=>{ wippe.rotation.x=Math.sin(t*1.5)*.065; }); } },
  { x:6.4, z:3.2, steh:[6.2,5.35], r:1.05, treffer:[2.1,3.4,1.8], baue(g,k){ /* 10 Spieluhr auf kleinem Tisch */
      walze(g,.95,.14,HOLZ,0,1.0,0); flach(ring(g,.95,.04,HOLZ3,0,1.0,0)); walze(g,.12,.9,HOLZ2,0,.5,0);
      [0,1,2].forEach(i=>{ const a=i*2.094+.5; strich(g,[0,.42,0],[Math.sin(a)*.75,.05,Math.cos(a)*.75],.08,HOLZ2); });
      /* Dose mit offenem Deckel */
      box(g,1.3,.5,.95,TUERKIS,0,1.34,0); box(g,1.37,.08,1.02,GOLD,0,1.12,0); box(g,1.37,.08,1.02,GOLD,0,1.6,0);
      [-.63,.63].forEach(x=>[-.46,.46].forEach(z=>ball(g,.09,GOLD,x,1.12,z)));
      [-.38,0,.38].forEach((x,i)=>stern(g,i===1?.17:.12,GELB,x,1.36,.485));
      const d=gruppe(g,0,1.63,-.5); d.rotation.x=-.28; box(d,1.34,.95,.1,TUERKIS,0,.47,-.02); box(d,1.14,.76,.04,ROSA,0,.47,.05); box(d,1.4,.08,.14,GOLD,0,.97,-.02); stern(d,.14,CREME,-.38,.65,.08); stern(d,.1,CREME,.4,.34,.08);
      walze(g,.44,.05,ROSA,0,1.66,.02);
      const kur=walze(g,.045,.35,MESSING,.82,1.35,0); kur.rotation.z=Math.PI/2; strich(g,[.98,1.35,0],[.98,1.13,.14],.035,MESSING); ball(g,.08,ROT,.98,1.12,.15);
      /* drehende Sternfigur */
      const fig=gruppe(g,0,1.68,.02); fig.userData.lebendig=true;
      walze(fig,.035,.55,GOLD,0,.27,0); flach(ring(fig,.2,.025,CREME,0,.12,0));
      [0,Math.PI/2].forEach(w=>{ stern(fig,.42,mat(GELB,{side:THREE.DoubleSide}),0,.9,0).rotation.y=w; }); ball(fig,.09,GOLD,0,.9,0);
      verschmelze(fig);
      const glanz=schein(g,'rgba(255,230,150,.55)',0,2.55,.1,1.2);
      const noten=[[0,'#ffe25a'],[1,'#ff9ad0'],[0,'#8ae8ff'],[1,'#ffe25a']].map(([zwei,c])=>{ const s=new THREE.Sprite(new THREE.SpriteMaterial({map:notenBild(zwei,c),transparent:true,depthWrite:false})); g.add(s); return s; });
      k.anim.push(t=>{ fig.rotation.y=t*1.7; const w=1.2+Math.sin(t*3)*.15; glanz.scale.set(w,w,1);
        noten.forEach((s,i)=>{ const a=(t*.24+i/4)%1, seite=i%2?1:-1; s.position.set(seite*(.55+a*.5)+Math.sin(a*8+i)*.15,1.9+a*1.6,.2); s.scale.set(.55,.55,1); s.material.opacity=Math.min(1,a*6,(1-a)*2.5); }); }); } }
];

return { titel:'Das geheime Turmzimmer', breite:36, tiefe:27, oben:['26,18,52','48,38,92','86,70,138'], baue, gegenstaende, verstecke };
})();

/* Schlussbild Bibliothek: früher Morgen vor der alten Bibliothek. Die zwei Holzflügel des steinernen Tors schwingen auf,
   aus dem warm leuchtenden Bücherflur tritt die Spielfigur, läuft nach vorn, winkt und jubelt. Die Bibliothekskatze sitzt
   neben dem Weg, die Eule fliegt eine Runde und landet über dem Torbogen, die Sonne geht über Wiesen, Bäumen und Zaun auf,
   dazu Vögel und buntes Konfetti aus Buchseiten. Ohne Schrift. */
FINALE3D.bibliothek = function(k,kamera,figur){
  const sc=k.scene;
  if(!k.anim) k.anim=[];
  if(!k.kreis) k.kreis=function(){}; /* im Schlussbild braucht es keine Hindernisse */
  const HORIZONT=0xffd6ae;
  sc.background=new THREE.Color(HORIZONT);
  sc.fog=new THREE.Fog(HORIZONT,42,130);
  const himmelsLicht=new THREE.HemisphereLight(0xdde6ff,0x6a7a40,.62); sc.add(himmelsLicht);
  const licht=new THREE.DirectionalLight(0xffd8a0,.55); licht.position.set(9,11,13); licht.castShadow=true; licht.shadow.mapSize.set(1024,1024);
  const sk=licht.shadow.camera; sk.left=-15; sk.right=15; sk.top=13; sk.bottom=-11; sk.near=1; sk.far=48; licht.shadow.bias=-.001; sc.add(licht);
  const weich=x=>{ const a=Math.min(1,Math.max(0,x)); return a*a*(3-2*a); };
  const misch=(a,b,u)=>a+(b-a)*u;
  const o=new THREE.Object3D();
  const ohneSchatten=g=>g.traverse(m=>{ if(m.isMesh){ m.castShadow=false; m.receiveShadow=false; } });
  const STEIN=0xdccdaa, STEIN2=0xa8977a, HOLZ=BIB.HOLZ, HOLZ2=BIB.HOLZ2, HOLZ3=BIB.HOLZ3, GOLD=BIB.GOLD, MESSING=BIB.MESSING, PAPIER=BIB.PAPIER, WEISS=BIB.WEISS;
  const DACH=0xa84a34, DACH2=0x84362a;
  const GRUEN=[0x4f8a34,0x69a63e,0x3d7a3a,0x86b446];
  const BUNT=[0xff4f6e,0xffc21a,0x2fb4ff,0x3fd07a,0xb264ec,0xff8a30];

  /* ---------- Morgenhimmel: Verlauf, Sonne, Wolken ---------- */
  const KUPPEL=118; /* groß genug für Sonne und Wolken in sehr breiten Bildern, kleiner als die Sichtweite der Kamera (120) */
  const himmelBild=bild(4,512,g=>{ const v=g.createLinearGradient(0,0,0,512); v.addColorStop(0,'#4a68b4'); v.addColorStop(.3,'#6c90d4'); v.addColorStop(.39,'#a4bce8'); v.addColorStop(.44,'#f0bcc0'); v.addColorStop(.475,'#ffc49a'); v.addColorStop(.5,'#ffd6ae'); v.addColorStop(1,'#ffd6ae'); g.fillStyle=v; g.fillRect(0,0,4,512); });
  const kuppel=new THREE.Mesh(new THREE.SphereGeometry(KUPPEL,24,32),new THREE.MeshBasicMaterial({map:himmelBild,side:THREE.BackSide,fog:false}));
  kuppel.frustumCulled=false; sc.add(kuppel);
  const sonne=new THREE.Mesh(new THREE.CircleGeometry(1,32),basis(0xfff0a8,{fog:false})); sc.add(sonne);
  const sonnenSchein=schein(sc,'rgba(255,200,110,.85)',0,0,0,18); sonnenSchein.material.fog=false;
  const strahlen=gruppe(sc,0,0,0), strahlM=basis(0xffe8a0,{fog:false,transparent:true,opacity:.5,depthWrite:false});
  for(let i=0;i<12;i++){ const a=i*Math.PI/6, s=box(strahlen,.14,i%2?.55:.85,.02,strahlM,Math.cos(a)*1.75,Math.sin(a)*1.75,0); s.rotation.z=a-Math.PI/2; }
  ohneSchatten(strahlen);
  const wolkeHell=basis(0xfff0e4,{fog:false}), wolkeRosa=basis(0xf4b8b4,{fog:false});
  /* [Bildplatz x, Bildplatz y, Größe] */
  const wolken=[[-.72,.76,1],[-.3,.9,.65],[.34,.88,.8],[.9,.5,.6]].map(p=>{ const g=gruppe(sc,0,0,0);
    [[-2.4,0,1.2],[-.9,.35,1.6],[.9,.2,1.4],[2.4,-.05,1]].forEach(q=>ball(g,q[2],wolkeHell,q[0],q[1],0,1.3,.5,.4));
    ball(g,1,wolkeRosa,0,-.38,.15,4.1,.42,.4); verschmelze(g); ohneSchatten(g); return { g, p }; });

  /* ---------- Wiese, Weg, ferne Hügel ---------- */
  const grasBild=bild(256,256,g=>{ g.fillStyle='#72aa46'; g.fillRect(0,0,256,256); const F=['#82bc50','#659a3c','#8cc458','#5c9238'];
    for(let i=0;i<700;i++){ g.fillStyle=F[i%4]; g.fillRect(zufall()*252,zufall()*250,3,3+zufall()*5); } });
  grasBild.wrapS=grasBild.wrapT=THREE.RepeatWrapping; grasBild.repeat.set(48,48);
  const boden=new THREE.Mesh(new THREE.PlaneGeometry(240,240),new THREE.MeshLambertMaterial({map:grasBild})); boden.rotation.x=-Math.PI/2; boden.receiveShadow=true; sc.add(boden);
  const wegGrund=box(sc,3.1,.02,15,0xb89c70,0,.005,4.6); wegGrund.castShadow=false;
  const platten=[];
  for(let r=0;r<21;r++) for(let i=0;i<3;i++){ const x=(i-1)*.96+(r%2?.14:-.14), z=-2.55+r*.7; platten.push([x,.022,z,.84+zufall()*.08,.016,.6,r%2===i%2?0xe4d2aa:0xd4bf94,(zufall()-.5)*.1]); }
  BIB.viele(sc,GEO.box,platten);
  const huegel=gruppe(sc,0,0,0);
  [[-72,-62,26,8,10,0x80ac64],[-34,-72,28,6.5,10,0x94bc7c],[4,-76,30,7,10,0x80ac64],[42,-68,26,6,10,0x94bc7c],[76,-56,24,8.5,10,0x80ac64],[-52,-34,14,4,9,0x6a9e4a],[54,-36,15,3.6,9,0x6a9e4a]].forEach(d=>ball(huegel,1,d[5],d[0],-.6,d[1],d[2],d[3],d[4]));
  verschmelze(huegel); ohneSchatten(huegel);

  /* ---------- Bibliotheksgebäude ---------- */
  const OB=1.6, ER=2.5, GB=5, GH=4.9, VORN=-3.25, HINTEN=-6.3, TIEF=VORN-HINTEN;
  const quader=BIB.quaderBild([208,186,148],'#8a7658',8);
  const haus=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>BIB.mauer(haus,quader,GB-OB,GH,TIEF,v*(OB+GB)/2,GH/2,(VORN+HINTEN)/2));
  /* Feld über dem Torbogen */
  const feld=new THREE.Shape(); feld.moveTo(-OB,ER); feld.absarc(0,ER,OB,Math.PI,0,true); feld.lineTo(OB,GH); feld.lineTo(-OB,GH); feld.lineTo(-OB,ER);
  const feldBild=quader.clone(); feldBild.needsUpdate=true; feldBild.wrapS=feldBild.wrapT=THREE.RepeatWrapping; feldBild.repeat.set(1/6,1/6);
  const bogenfeld=new THREE.Mesh(new THREE.ShapeGeometry(feld,24),new THREE.MeshLambertMaterial({map:feldBild})); bogenfeld.position.z=VORN; haus.add(bogenfeld);

  /* Sockel, Ecksteine, Gesims, flaches Walmdach, Schornsteine */
  const schmuck=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ box(schmuck,GB-OB-.5,.4,.2,STEIN2,v*(OB+.5+GB)/2,.2,VORN+.08);
    for(let i=0;i<10;i++) box(schmuck,i%2?.42:.6,.44,.18,STEIN,v*(GB-(i%2?.19:.28)),.24+i*.48,VORN+.07);
    box(schmuck,GB-OB-.55,.12,.14,STEIN,v*(OB+.55+GB)/2,2.62,VORN+.06); });
  box(schmuck,GB*2+.4,.2,TIEF+.4,STEIN,0,GH+.1,(VORN+HINTEN)/2); box(schmuck,GB*2+.65,.1,TIEF+.65,STEIN2,0,GH+.25,(VORN+HINTEN)/2);
  [-1,1].forEach(v=>{ box(schmuck,.55,1.2,.55,0xb8664a,v*3.5,GH+.95,-5); box(schmuck,.72,.14,.72,STEIN2,v*3.5,GH+1.6,-5); });
  verschmelze(schmuck);
  const dachForm=new THREE.Shape(); dachForm.moveTo(-GB-.2,0); dachForm.lineTo(GB+.2,0); dachForm.lineTo(GB-1,1); dachForm.lineTo(-GB+1,1); dachForm.lineTo(-GB-.2,0);
  const dach=new THREE.Mesh(new THREE.ExtrudeGeometry(dachForm,{depth:TIEF,bevelEnabled:false}),mat(DACH)); dach.position.set(0,GH+.3,HINTEN); dach.castShadow=true; sc.add(dach);
  const ziegel=gruppe(sc,0,0,0);
  for(let i=1;i<5;i++){ const u=i/5; box(ziegel,2*(GB+.2-1.2*u),.05,.06,DACH2,0,GH+.3+u,VORN+.02); }
  box(ziegel,2*(GB-1)+.2,.12,.3,DACH2,0,GH+1.33,VORN-.1);
  verschmelze(ziegel); ohneSchatten(ziegel);

  /* Rechteckige Fenster voller Bücher, mit warmem Licht */
  const fensterBild=()=>bild(256,256,g=>{ g.fillStyle='#7a4a20'; g.fillRect(0,0,256,256);
    const v=g.createRadialGradient(128,110,10,128,128,180); v.addColorStop(0,'#ffe6a0'); v.addColorStop(1,'#c8822c'); g.fillStyle=v; g.fillRect(0,0,256,256);
    const F=['#a02c2c','#2c5490','#3f7a38','#d09a2c','#7a3a7c','#2f7474','#c05a28','#efe2c0'];
    for(let r=0;r<3;r++){ const unten=82+r*84; let x=8; while(x<236){ const w=12+zufall()*15, h=42+zufall()*28;
        if(zufall()<.08){ x+=14; continue; }
        g.fillStyle=F[Math.floor(zufall()*8)]; g.fillRect(x,unten-h,w,h); g.fillStyle='rgba(255,215,110,.85)'; g.fillRect(x,unten-h+9,w,4); g.fillRect(x,unten-14,w,3); x+=w+2; }
      g.fillStyle='#5a3418'; g.fillRect(0,unten,256,8); } });
  const rahmen=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>[[1.5,1.5],[3.7,1.45]].forEach(([y,h])=>{ const x=v*3.42, b=1.9;
    const glas=new THREE.Mesh(new THREE.PlaneGeometry(b,h),basis(0xffffff,{map:fensterBild()})); glas.position.set(x,y,VORN+.03); sc.add(glas);
    [-1,1].forEach(s=>{ box(rahmen,.12,h+.12,.14,HOLZ2,x+s*b/2,y,VORN+.08); box(rahmen,b+.12,.12,.14,HOLZ2,x,y+s*h/2,VORN+.08); });
    box(rahmen,.06,h,.06,HOLZ2,x,y,VORN+.07);
    box(rahmen,b+.4,.14,.34,STEIN,x,y-h/2-.12,VORN+.14); box(rahmen,b+.34,.2,.2,STEIN,x,y+h/2+.17,VORN+.1); box(rahmen,.28,.3,.24,STEIN2,x,y+h/2+.17,VORN+.11); }));
  /* Blumenkästen unter den unteren Fenstern */
  [-1,1].forEach(v=>{ box(rahmen,1.8,.22,.28,HOLZ,v*3.42,.5,VORN+.36);
    for(let i=0;i<9;i++){ const x=v*3.42-.76+i*.19; ball(rahmen,.12,GRUEN[i%3],x,.64,VORN+.36); ball(rahmen,.065,BUNT[(i*2+(v>0?1:0))%6],x,.74+(i%2)*.04,VORN+.44); } });
  verschmelze(rahmen);

  /* Leuchtender Bücherflur hinter dem Tor */
  const flurBild=bild(256,384,g=>{ g.fillStyle='#8a4c1c'; g.fillRect(0,0,256,384);
    const F=['#a83030','#305c9c','#44803c','#d8a030','#80407c','#348080'];
    for(let r=0;r<6;r++){ const unten=70+r*58; let x=4; while(x<248){ const w=10+zufall()*10, h=28+zufall()*22; g.fillStyle=F[Math.floor(zufall()*6)]; g.fillRect(x,unten-h,w,h); x+=w+2; } g.fillStyle='#5a3014'; g.fillRect(0,unten,256,6); }
    const v=g.createRadialGradient(128,270,6,128,250,190); v.addColorStop(0,'rgba(255,248,200,1)'); v.addColorStop(.35,'rgba(255,205,100,.82)'); v.addColorStop(1,'rgba(255,150,40,0)'); g.fillStyle=v; g.fillRect(0,0,256,384); });
  const flur=new THREE.Mesh(new THREE.PlaneGeometry(OB*2,ER+OB),new THREE.MeshBasicMaterial({map:flurBild,fog:false})); flur.position.set(0,(ER+OB)/2,-5.7); sc.add(flur);
  const flurBoden=box(sc,OB*2,.02,2.8,0xc88c48,0,.018,-4.35); flurBoden.castShadow=false;
  const drinnen=new THREE.PointLight(0xffb454,1.1,8,1.5); drinnen.position.set(0,2.5,-4.4); sc.add(drinnen);
  const lichtfleck=new THREE.Mesh(new THREE.PlaneGeometry(5,4.6),new THREE.MeshBasicMaterial({map:leuchtBild('rgba(255,200,100,.5)'),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); lichtfleck.rotation.x=-Math.PI/2; lichtfleck.position.set(0,.05,-1.8); sc.add(lichtfleck);

  /* Torbogen aus Keilsteinen, darüber ein Aufsatz mit aufgeschlagenem Buch (Sitzplatz der Eule) */
  const tor=gruppe(sc,0,0,0);
  [-1,1].forEach(v=>{ const x=v*(OB+.27);
    for(let i=0;i<5;i++) box(tor,i%2?.5:.56,ER/5-.03,.36,i%2?STEIN:0xcab890,x,(i+.5)*ER/5,VORN+.12);
    box(tor,.66,.28,.48,STEIN2,x,.14,VORN+.14); box(tor,.68,.16,.46,STEIN2,x,ER,VORN+.14); });
  const NK=11;
  for(let i=0;i<NK;i++){ const a=(i+.5)*Math.PI/NK, r=OB+.27, s=box(tor,r*Math.PI/NK-.03,.54,i===5?.46:.36,i===5?GOLD:(i%2?STEIN:0xcab890),Math.cos(a)*r,ER+Math.sin(a)*r,VORN+.12); s.rotation.z=a-Math.PI/2; }
  box(tor,2.9,.8,.4,STEIN,0,GH+.12,VORN+.14); box(tor,3.2,.18,.64,STEIN2,0,GH+.62,VORN+.18);
  [-1,1].forEach(v=>{ ball(tor,.24,STEIN2,v*1.72,GH+.22,VORN+.14,1,1,.8); ball(tor,.14,STEIN,v*1.72,GH+.54,VORN+.14);
    const einband=box(tor,.84,.56,.07,0x8a2a2a,v*.42,GH+.14,VORN+.37); einband.rotation.z=v*.1;
    const blatt=box(tor,.74,.46,.07,PAPIER,v*.4,GH+.17,VORN+.4); blatt.rotation.z=v*.1;
    for(let i=0;i<4;i++){ const z_=box(tor,.5,.028,.02,0x9a8660,v*.4,GH+.31-i*.09,VORN+.445); z_.rotation.z=v*.1; } });
  box(tor,.06,.52,.1,GOLD,0,GH+.14,VORN+.41);
  verschmelze(tor);
  const SITZ=[0,GH+.71,VORN+.28];

  /* Stufe vor dem Tor */
  const stufe=box(sc,4.3,.06,.5,STEIN2,0,.02,VORN+.25); stufe.castShadow=false;

  /* ---------- zwei Holzflügel, die nach außen aufschwingen ---------- */
  const TZ=-2.8;
  const fluegel=[-1,1].map(v=>{ const angel=gruppe(sc,v*OB,.04,TZ), g=gruppe(angel,0,0,0), r=-v; /* r: Richtung zur Tormitte */
    const f=new THREE.Shape();
    if(r>0){ f.moveTo(0,0); f.lineTo(OB,0); f.lineTo(OB,ER+OB); f.absarc(OB,ER,OB,Math.PI/2,Math.PI,false); f.lineTo(0,0); }
    else { f.moveTo(0,0); f.lineTo(0,ER); f.absarc(-OB,ER,OB,0,Math.PI/2,false); f.lineTo(-OB,0); f.lineTo(0,0); }
    const blatt=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:.14,bevelEnabled:false,curveSegments:20}),mat(HOLZ)); blatt.position.z=-.07; blatt.castShadow=true; blatt.receiveShadow=true; g.add(blatt);
    [-.09,.09].forEach(z=>{
      for(let i=1;i<4;i++){ const x=i*OB/4, h=ER+Math.sqrt(Math.max(0,OB*OB-(OB-x)*(OB-x))); box(g,.035,h-.1,.02,HOLZ3,r*x,(h-.1)/2+.04,z*.85); }
      [.5,2.2].forEach(y=>{ box(g,OB-.16,.14,.04,0x4a4a52,r*(OB/2),y,z); [.2,.55,.9,1.25].forEach(x=>ball(g,.045,MESSING,r*x,y,z*1.25)); });
      ring(g,.15,.032,GOLD,r*(OB-.28),1.45,z*1.35); ball(g,.07,GOLD,r*(OB-.28),1.62,z*1.2); });
    verschmelze(g); return { angel, v }; });

  /* ---------- Zaun, Bäume, Büsche, Blumen ---------- */
  const ZZ=-1.9, latten=[], knaeufe=[];
  [-1,1].forEach(v=>{ for(let i=0;i<64;i++){ const x=v*(5.55+i*.42); latten.push([x,.52,ZZ,.2,1.04,.09,i%2?0xf4ead2:0xe8dcc0]); knaeufe.push([x,1.05,ZZ,.1,.1,.05,i%2?0xf4ead2:0xe8dcc0]); }
    [.3,.8].forEach(y=>latten.push([v*18.8,y,ZZ-.09,27,.12,.08,0xc8b490]));
    latten.push([v*5.38,.65,ZZ,.26,1.3,.26,0xc8b490]); knaeufe.push([v*5.38,1.4,ZZ,.18,.18,.18,GOLD]); });
  BIB.viele(sc,GEO.box,latten); BIB.viele(sc,GEO.sph,knaeufe);
  const staemme=[], kronen=[], fruechte=[];
  const baum=(x,z,s,i)=>{ staemme.push([x,s*.8,z,s*.2,s*1.6,s*.2,0x7a4e28]);
    [[0,2.3,0,1],[-.65,1.9,.15,.7],[.68,1.95,.05,.72],[.1,3,-.05,.65]].forEach((q,j)=>kronen.push([x+q[0]*s,q[1]*s,z+q[2]*s,q[3]*s,q[3]*s*.9,q[3]*s*.85,GRUEN[(i+j)%4]]));
    if(i%3===0) [[-.5,2.5,.85],[.4,2.1,.95],[.15,2.9,.62],[-.95,1.8,.75]].forEach(q=>fruechte.push([x+q[0]*s,q[1]*s,z+q[2]*s,.11*s,.11*s,.11*s,0xe83c3c])); };
  [[-7.6,-5,1.2],[7.9,-6.4,1.05],[-11.5,-7.5,1.35],[11.2,-4.4,.9],[-15.5,-4,1.1],[15.6,-8,1.4],[-21,-8.5,1.5],[20.5,-4.6,1.15],[-27,-5,1.2],[27,-8,1.5],[-34,-9,1.4],[34,-5.5,1.3],
   [-9,-19,1.2],[8.5,-23,1.1],[-19,-22,1.5],[18,-18,1.1],[-30,-24,1.6],[29,-22,1.5],[-42,-20,1.7],[42,-18,1.6],[-1,-27,1.3],[-52,-14,1.6],[52,-12,1.7]].forEach((p,i)=>baum(p[0],p[1],p[2],i));
  BIB.viele(sc,GEO.cyl,staemme); BIB.viele(sc,GEO.sph,kronen); BIB.viele(sc,GEO.sph,fruechte);
  const busch=[], halme=[], stiele=[], blueten=[], mitten=[];
  [-1,1].forEach(v=>{ [[5.5,-3.1,.5],[6.2,-3.5,.7],[6.9,-3,.42],[2.75,-2.75,.3]].forEach((p,i)=>busch.push([v*p[0],p[2]*.6,p[1],p[2]*1.15,p[2]*.9,p[2],GRUEN[(i+(v>0?2:0))%4]])); });
  for(let i=0;i<260;i++){ const v=i%2?1:-1, x=v*(2+zufall()*zufall()*22), z=-1.2+zufall()*10;
    for(let j=-1;j<2;j++) halme.push([x+j*.06,.11,z,.035,.24,.035,GRUEN[(i+j+1)%4],0,0,-j*.4]);
    if(i%3===0){ const bx=x+.2, h=.2+zufall()*.14; stiele.push([bx,h/2,z,.025,h,.025,0x4f8a34]); blueten.push([bx,h,z,.1,.045,.1,[0xfff6ee,0xff8ab0,0xffd84a,0xb89cff][(i/3)%4|0]]); mitten.push([bx,h+.04,z,.04,.03,.04,0xf0a020]); } }
  BIB.viele(sc,GEO.sph,busch); BIB.viele(sc,GEO.cone,halme); BIB.viele(sc,GEO.box,stiele); BIB.viele(sc,GEO.sph,blueten); BIB.viele(sc,GEO.sph,mitten);

  /* ---------- Bibliothekskatze sitzt auf einem Kissen neben dem Weg ---------- */
  const platz=gruppe(sc,-3,0,1.4), kissen=gruppe(platz,0,0,0);
  ball(kissen,.72,0x8a2a3a,0,.13,0,1,.24,.85); const borte=ring(kissen,.68,.035,GOLD,0,.13,0); borte.rotation.x=Math.PI/2; borte.scale.set(1.04,.88,1);
  verschmelze(kissen);
  const miez=gruppe(platz,0,.27,0); miez.rotation.y=.35; miez.scale.setScalar(1.25);
  const MF=0xe08a30, MD=0xa85a18, MH=0xfbeed4, rumpf=gruppe(miez,0,0,0);
  ball(rumpf,.3,MF,0,.27,-.08,1,.9,1.1); ball(rumpf,.22,MF,0,.45,.06,.95,1.35,.9); ball(rumpf,.14,MH,0,.44,.2,.9,1.4,.55);
  [-1,1].forEach(v=>{ ball(rumpf,.17,MF,v*.22,.17,-.04,.8,1,1.15); ball(rumpf,.09,MH,v*.23,.05,.2,.9,.55,1.4); strich(rumpf,[v*.09,.42,.2],[v*.1,.06,.28],.055,MF); ball(rumpf,.075,MH,v*.1,.05,.32,1,.65,1.3);
    [.2,.3,.4].forEach((y,i)=>ball(rumpf,.06,MD,v*(.27-i*.035),y,-.1,.5,.45,1.8)); });
  const mKopf=gruppe(miez,0,.84,.12);
  ball(mKopf,.22,MF,0,0,0,1.08,.95,.95); ball(mKopf,.1,MH,0,-.07,.17,1.35,.75,.8); ball(mKopf,.028,0xd0606c,0,-.04,.255);
  [-1,1].forEach(v=>{ const ohr=kegel(mKopf,.085,.19,MF,v*.13,.22,0); ohr.rotation.z=-v*.28; const innen=kegel(mKopf,.045,.11,0xe8a0a0,v*.132,.215,.05); innen.rotation.z=-v*.28;
    ball(mKopf,.048,0x78d858,v*.09,.04,.19,1,1.1,.6); ball(mKopf,.022,0x101008,v*.09,.04,.22,.55,1.4,.5); ball(mKopf,.05,MD,v*.04,.16,.14,.35,1.1,.7);
    [-.02,.035].forEach(h=>strich(mKopf,[v*.06,-.07,.24],[v*.33,-.07+h,.2],.005,0xffffff)); });
  ring(mKopf,.15,.025,0x2a4a7a,0,-.17,0).rotation.x=Math.PI/2; ball(mKopf,.045,GOLD,0,-.2,.16);
  /* Schwanz liegt auf dem Kissen, die Spitze wedelt */
  strich(rumpf,[0,.09,-.36],[.34,.07,-.22],.065,MF); strich(rumpf,[.34,.07,-.22],[.41,.065,.08],.06,MF);
  const mSpitze=gruppe(miez,.41,.065,.08); strich(mSpitze,[0,0,0],[-.04,.03,.28],.055,MF); ball(mSpitze,.065,MH,-.04,.035,.29);
  verschmelze(rumpf); verschmelze(mKopf); verschmelze(mSpitze);

  /* ---------- Eule: fliegt eine Runde und landet über dem Torbogen ---------- */
  const eule=BIB.eule(k,sc,SITZ[0],SITZ[1],SITZ[2],.85);
  const RUNDE=[[-11,4.4,-1.5],[-5.2,4.9,-.4],[-1.6,4.5,.8],[2.6,4.7,.4],[4,5.6,-1.2],[1.4,6.1,-2],[-2.4,5.7,-1.4],[-1.5,6.2,-2.2],SITZ];
  const EAB=2.2, EAN=8.4;
  /* weiche Kurve durch alle Punkte (Catmull-Rom) */
  const flugOrt=u=>{ const n=RUNDE.length-1, s=Math.min(n-1e-6,Math.max(0,u*n)), i=Math.floor(s), f=s-i, P=j=>RUNDE[Math.min(n,Math.max(0,j))];
    const a=P(i-1), b=P(i), c=P(i+1), d=P(i+2);
    return [0,1,2].map(x=>.5*(2*b[x]+(c[x]-a[x])*f+(2*a[x]-5*b[x]+4*c[x]-d[x])*f*f+(3*b[x]-a[x]-3*c[x]+d[x])*f*f*f)); };

  /* ---------- Spielfigur ---------- */
  const u=figur.userData, FS=1.3, VON=-4.3, BIS=2.7;
  figur.position.set(0,0,VON); figur.scale.set(FS,FS,FS); sc.add(figur);

  /* ---------- Vögel, Konfetti aus Buchseiten, Funkeln ---------- */
  const menge=(geo,m,n)=>{ const t=new THREE.InstancedMesh(geo,m,n); t.frustumCulled=false; t.visible=false; sc.add(t); return t; };
  const setze=(t,i,x,y,z,sx,sy,sz,rx,ry,rz)=>{ o.position.set(x,y,z); o.scale.set(sx,sy,sz); o.rotation.set(rx||0,ry||0,rz||0); o.updateMatrix(); t.setMatrixAt(i,o.matrix); };
  const NV=14, voegel=menge(GEO.box,basis(0x3a3050,{fog:false}),NV);
  const FARBE=new THREE.Color();
  /* bunte Seiten: kleine flache Rechtecke, seitlich vom Weg dichter, damit die Figur frei bleibt */
  const NK2=110, konfetti=menge(GEO.box,basis(0xffffff),NK2), kd=[];
  for(let i=0;i<NK2;i++){ const v=i%2?1:-1; kd.push({ x:v*(.5+zufall()*(i%5?3.6:6)), y:zufall()*5.4, z:-2+zufall()*4.2, v:.45+zufall()*.55, p:zufall()*6.28, g:.8+zufall()*.5 });
    konfetti.setColorAt(i,FARBE.set(BUNT[i%6])); }
  const FUNKE=new THREE.OctahedronGeometry(1,0);
  const NF=40, funkeln=menge(FUNKE,basis(0xfff2a0),NF), fd=[];
  for(let i=0;i<NF;i++) fd.push({ x:(zufall()*2-1)*4.2, y:.4+zufall()*4.2, z:-2.2+zufall()*3.4, p:zufall()*6.28 });

  /* ---------- Kamera ---------- */
  const NEIG=.12, CN=Math.cos(NEIG), SN=Math.sin(NEIG), ZIELY=2.9;
  /* q: 0 schmal (bis 4:3), 1 sehr breit */
  const plaetze=a=>{ const q=weich((a-1.4)/1.4); return { q, katze:misch(-2.9,-3.7,q) }; };
  /* kleinster Kameraabstand, bei dem alle wichtigen Punkte im Bild sind */
  const abstand=(P,a,tn)=>{ const punkte=[
      [-GB-.3,GH+.3,VORN],[GB+.3,GH+.3,VORN],[GB-1,GH+1.4,VORN],[0,SITZ[1]+1.2,SITZ[2]],
      [0,-.05,3.9],[-1.2,3.2,BIS],[1.2,3.2,BIS],[P.katze-1,0,1.9],[P.katze-.7,1.8,1.4]];
    return punkte.reduce((m,p)=>{ const Y=p[1]-ZIELY, naeher=Y*SN+p[2]*CN, hoch=Math.abs(Y*CN-p[2]*SN);
      return Math.max(m,Math.abs(p[0])/(.95*tn*a)+naeher,hoch/(.95*tn)+naeher); },9); };

  const LOS=1.9, DA=4.9;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    k.anim.forEach(fn=>fn(t,dt));
    const a=kamera.aspect||1.5, tn=Math.tan((a<1.1?30:25)*Math.PI/180), P=plaetze(a), d=abstand(P,a,tn);
    const wippen=Math.sin(t*.22)*.22*weich((t-5)/2);
    kamera.position.set(wippen,ZIELY+d*SN,d*CN); kamera.lookAt(0,ZIELY,0);
    const c=kamera.position;
    kuppel.position.copy(c);
    /* Weltpunkt zu einem Bildplatz (x,y von -1 bis 1) in der Entfernung weit */
    const ort=(bx,by,weit)=>{ const hoch=by*weit*tn; return [c.x+bx*weit*tn*a, c.y-SN*weit+CN*hoch, c.z-CN*weit-SN*hoch]; };

    /* Sonne geht rechts neben der Bibliothek hinter den Hügeln auf */
    const auf=weich(t/11);
    const rand=(GB+.4)/((d-((GH-ZIELY)*SN+VORN*CN))*tn*a); /* rechte Hauskante im Bild */
    const sg=.095*78*tn; /* Sonnenradius: fester Anteil der Bildhöhe */
    const sx=Math.min(.97-.095/a,Math.max(.62,rand+.12)); /* auch im schmalen Bild ganz sichtbar */
    const sp=ort(sx,misch(.27,.68,auf),78);
    sonne.position.set(sp[0],sp[1],sp[2]); sonne.scale.setScalar(sg);
    sonnenSchein.position.set(sp[0],sp[1],sp[2]+.5); sonnenSchein.scale.set(sg*6,sg*6,1);
    strahlen.position.set(sp[0],sp[1],sp[2]+.2); strahlen.scale.setScalar(sg*(.86+Math.sin(t*1.8)*.04)); strahlen.rotation.z=t*.12;
    himmelsLicht.intensity=.55+.14*auf; licht.intensity=.4+.22*auf;
    wolken.forEach((w,i)=>{ const q=ort(w.p[0]+Math.sin(t*.07+i*2)*.05,w.p[1],55); w.g.position.set(q[0],q[1],q[2]); w.g.scale.setScalar(w.p[2]*55*tn/22); });

    /* Torflügel schwingen auf */
    const offen=weich((t-.5)/1.7);
    fluegel.forEach(f=>{ f.angel.rotation.y=f.v*1.82*offen; });
    drinnen.intensity=1.1+Math.sin(t*4)*.07;

    /* Figur tritt heraus, läuft nach vorn, winkt und jubelt */
    const lauf=Math.min(1,Math.max(0,(t-LOS)/(DA-LOS))), geht=lauf>0&&lauf<1, s=Math.sin(t*10);
    figur.position.z=misch(VON,BIS,lauf);
    figur.rotation.y=geht?0:Math.sin(t*.9)*.14*weich(t-DA);
    u.beinL.rotation.x=geht?s*.65:0; u.beinR.rotation.x=geht?-s*.65:0;
    const winkt=weich((t-DA)/.4), jubel=weich((Math.sin((t-7)*.9)-.2)/.5)*weich((t-7)/.5);
    u.armR.rotation.x=geht?s*.55:0; u.armL.rotation.x=geht?-s*.55:0;
    u.armR.rotation.z=misch(.18,2.4+Math.sin(t*7.5)*.38,winkt);
    u.armL.rotation.z=misch(-.18,-2.35+Math.sin(t*7.5+1.6)*.35,jubel);
    u.koerper.position.y=geht?Math.abs(Math.cos(t*10))*.07:Math.abs(Math.sin(t*4))*.05*winkt+Math.abs(Math.sin(t*5))*.22*jubel; u.koerper.rotation.z=Math.sin(t*2.2)*.035*winkt;

    /* Katze: Schwanzspitze wedelt, Kopf dreht sich zur Figur */
    platz.position.x=P.katze;
    mSpitze.rotation.y=Math.sin(t*2.4)*.4;
    mKopf.rotation.y=.4*weich((Math.sin(t*.7-1)+.4)/.6); mKopf.rotation.z=Math.sin(t*1.3)*.1;

    /* Eule: Anflug, Runde, Landung; danach ruhig mit gelegentlichem Flattern */
    const flug=Math.min(1,Math.max(0,(t-EAB)/(EAN-EAB))), fliegt=flug<1;
    eule.g.visible=t>EAB;
    RUNDE[0][0]=-Math.max(11,13*tn*a+1.5); /* Anflug beginnt in jedem Bildformat außerhalb des Bildes */
    if(fliegt){
      const v=misch(flug,weich(flug),.4), p=flugOrt(v), n=flugOrt(Math.min(1,v+.015)), dreh=Math.atan2(n[0]-p[0],n[2]-p[2]), landet=weich((flug-.86)/.14);
      eule.g.position.set(p[0],p[1],p[2]); eule.g.rotation.set(.45*(1-landet),dreh*(1-landet),0,'YXZ');
      eule.fluegel.forEach((f,i)=>{ f.rotation.z=(i?1:-1)*(1.5+Math.sin(t*13)*.75); });
    } else {
      eule.g.position.set(SITZ[0],SITZ[1],SITZ[2]); eule.g.rotation.set(0,0,0,'YXZ');
      const flattert=Math.max(weich((EAN+.6-t)/.6),weich((Math.sin(t*.8)-.8)/.15));
      eule.fluegel.forEach((f,i)=>{ f.rotation.z=(i?1:-1)*flattert*(.8+Math.sin(t*12)*.5); });
    }

    /* Vögel ziehen über den Himmel */
    voegel.visible=true;
    for(let i=0;i<NV/2;i++){ const bx=((t*(.05+i*.004)+i*.17+(i>3?1.35:.45))%2.6)-1.3, by=.54+(i%4)*.075+Math.sin(t*.8+i)*.015, q=ort(bx,by,48+(i%3)), schlag=Math.sin(t*6+i*1.9)*.45+.15;
      [-1,1].forEach((v,j)=>setze(voegel,i*2+j,q[0]+v*.36*Math.cos(schlag),q[1]+.36*Math.sin(schlag),q[2],.8,.1,.12,0,0,v*schlag)); }
    voegel.instanceMatrix.needsUpdate=true;

    /* Konfetti flattert aus dem Tor auf und sinkt wirbelnd, dazu Funkeln */
    konfetti.visible=funkeln.visible=t>1.4;
    if(konfetti.visible){
      const los=weich((t-1.4)/2.2);
      kd.forEach((f,i)=>{ const y=.1+((f.y-t*f.v)%5.4+5.4)%5.4, g=f.g*weich((t-1.4)/.5)*weich((5.4-y)/.6)*weich(y/.25);
        setze(konfetti,i,f.x*los+Math.sin(t*1.6+f.p)*.28,misch(1.8,y,los),misch(-2.9,f.z,los),.11*g,.15*g,.012*g,t*2.6+f.p,t*1.7+f.p*2,Math.sin(t*2+f.p)); });
      konfetti.instanceMatrix.needsUpdate=true;
      fd.forEach((f,i)=>{ const g=.015+.06*Math.pow(Math.max(0,Math.sin(t*2.6+f.p)),4)*los;
        setze(funkeln,i,f.x+Math.sin(t*.5+f.p)*.2,f.y+Math.sin(t*.8+f.p*2)*.25,f.z,g,g*1.5,g,0,t+f.p,0); });
      funkeln.instanceMatrix.needsUpdate=true; }
  };
};

