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