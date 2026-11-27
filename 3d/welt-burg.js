document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<defs>\n<symbol id=\"sym-krone\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M-15 9V-9L-7 1L0 -13L7 1L15 -9V9Z\"/><path d=\"M-15 15H15\"/></g></symbol>\n<symbol id=\"sym-schild\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"><path d=\"M-13 -15H13V0Q13 11 0 17Q-13 11 -13 0Z\"/><path d=\"M0 -15V17M-13 -3H13\"/></g></symbol>\n<symbol id=\"sym-lilie\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M0 -17Q8 -8 0 5Q-8 -8 0 -17Z\"/><path d=\"M-3 4Q-16 2 -15 -9Q-8 -10 -4 -1M3 4Q16 2 15 -9Q8 -10 4 -1M-10 7H10M0 7V16M-6 16H6\"/></g></symbol>\n<symbol id=\"sym-turm\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\"><path d=\"M-10 17V-8H10V17Z\"/><path d=\"M-12 -8V-16H-6V-11H-2V-16H2V-11H6V-16H12V-8\"/><path d=\"M-4 17V10Q0 5 4 10V17\"/></g></symbol>\n<symbol id=\"sym-fahne\" viewBox=\"-20 -20 40 40\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linejoin=\"round\" stroke-linecap=\"round\"><path d=\"M-12 18V-18\"/><path d=\"M-12 -15Q-3 -20 3 -14Q9 -9 16 -13V3Q9 7 3 2Q-3 -4 -12 1\"/></g></symbol>\n</defs>\n</svg>");
const SZENARIEN={};
(function(){
const schatten=(rx,cy)=>`<ellipse cx="0" cy="${cy}" rx="${rx}" ry="8" fill="rgba(0,0,0,.32)"/>`;
const defs=(b1,b2,l)=>`<defs>
 <linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${b1}"/><stop offset="1" stop-color="${b2}"/></linearGradient>
 <radialGradient id="licht"><stop offset="0" stop-color="${l||'#ffc870'}" stop-opacity=".5"/><stop offset="1" stop-color="${l||'#ffc870'}" stop-opacity="0"/></radialGradient>
 <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
</defs>`;
function steine(y0,y1,h,w,f){let d='';for(let y=y0,r=0;y<y1;y+=h,r++){d+=`M0 ${y}H1600`;for(let x=(r%2)*w/2;x<1600;x+=w)d+=`M${x} ${y}V${Math.min(y+h,y1)}`;}return`<path d="${d}" stroke="${f}" stroke-width="2" fill="none"/>`;}
function boden(st){let d='';for(let x=-1600;x<=3200;x+=st?160:110)d+=`M${800+(x-800)*.35} 470L${x} 780`;for(const y of[490,520,560,610,670,740])d+=`M0 ${y}H1600`;return`<polygon points="0,470 1600,470 1600,780 0,780" fill="url(#boden)"/><path d="${d}" stroke="rgba(0,0,0,.25)" stroke-width="2"/>`;}
const FL=`<g class="flamme"><path d="M0 -58Q15 -32 12 -12Q8 -3 0 -3Q-8 -3 -12 -12Q-15 -32 0 -58Z" fill="#ff9a2a"/><path d="M0 -40Q7 -24 6 -12Q4 -6 0 -6Q-4 -6 -6 -12Q-7 -24 0 -40Z" fill="#ffe07a"/></g>`;
const fl=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${FL}</g>`;
function fackel(x,y){return`<g transform="translate(${x} ${y})"><circle r="140" fill="url(#licht)"/><rect x="-6" y="0" width="12" height="62" fill="#4a3218"/><path d="M-18 -5H18L10 15H-10Z" fill="#6e4b22" stroke="#3a2610" stroke-width="2"/>${FL}</g>`;}
const stern=(x,y,r)=>`<path d="M${x} ${y-r}L${x+r*.3} ${y-r*.3}L${x+r} ${y}L${x+r*.3} ${y+r*.3}L${x} ${y+r}L${x-r*.3} ${y+r*.3}L${x-r} ${y}L${x-r*.3} ${y-r*.3}Z" fill="#ffe9a0"/>`;
const schild=(x,y,s,a,b)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-20 -24H20V0Q20 20 0 30Q-20 20 -20 0Z" fill="${a}" stroke="#3a2a14" stroke-width="3"/><path d="M0 -24V28M-20 -2H20" stroke="${b}" stroke-width="6"/></g>`;
const banner=(x,a,b,s)=>`<path d="M${x-48} 62H${x+48}" stroke="#6b4a1c" stroke-width="7" stroke-linecap="round"/><path d="M${x-38} 64H${x+38}V230L${x} 204L${x-38} 230Z" fill="${a}" stroke="#4a2a14" stroke-width="2"/><path d="M${x-38} 76H${x+38}" stroke="${b}" stroke-width="6"/><use href="#sym-${s}" x="${x-26}" y="104" width="52" height="52" color="${b}"/>`;
const stroh=(x,y)=>`<path d="M${x-40} ${y}Q${x} ${y-14} ${x+40} ${y}Z" fill="#c9a64a" opacity=".8"/><path d="M${x-30} ${y-2}L${x-38} ${y-12}M${x-10} ${y-6}L${x-6} ${y-18}M${x+12} ${y-6}L${x+20} ${y-16}M${x+30} ${y-2}L${x+40} ${y-8}" stroke="#e8c45a" stroke-width="3" stroke-linecap="round"/>`;
const kerze=(x,y)=>`<rect x="${x-5}" y="${y}" width="10" height="26" fill="#f4ecd8"/>${fl(x,y,.35)}`;
const holz='stroke="#4a2a12" stroke-width="3"';
const strohsack=()=>`${schatten(62,4)}<path d="M-58 0Q-66 -30 -50 -42H50Q66 -30 58 0Z" fill="#d8c08a" ${holz}/><path d="M-40 -42L-46 -56M-20 -42L-18 -60M2 -42L8 -58M24 -42L30 -56M42 -42L50 -52" stroke="#e8c45a" stroke-width="3" stroke-linecap="round"/><path d="M-30 -24H-10M14 -16H34" stroke="#a88a50" stroke-width="2" stroke-dasharray="4 3"/>`;
const krug=()=>`${schatten(30,4)}<path d="M20 -66Q42 -60 32 -32" stroke="#6a3418" stroke-width="6" fill="none"/><path d="M-14 -84H14L10 -70Q30 -56 26 -24Q22 0 0 0Q-22 0 -26 -24Q-30 -56 -10 -70Z" fill="#b8643a" stroke="#6a3418" stroke-width="3"/><path d="M-25 -42H25" stroke="#e8b080" stroke-width="3"/><ellipse cx="0" cy="-84" rx="14" ry="4" fill="#3a6a9a"/>`;
const eimer=()=>`${schatten(34,4)}<path d="M-28 -56Q0 -102 28 -56" stroke="#555" stroke-width="3" fill="none"/><path d="M-30 -56L-24 0H24L30 -56Z" fill="#9a6a3a" ${holz}/><path d="M-29 -42H29M-26 -14H26" stroke="#555" stroke-width="5"/><ellipse cx="0" cy="-56" rx="30" ry="6" fill="#4a7aa8" ${holz}/>`;
const mauerstein=()=>`${schatten(50,4)}<path d="M-44 0L-48 -34L-30 -50H34L46 -30L42 0Z" fill="#8a8e96" stroke="#3a3e46" stroke-width="3"/><path d="M-30 -50L-26 -30L-48 -34M-26 -30H46" stroke="#5a5e66" stroke-width="2" fill="none"/><circle cx="58" cy="-6" r="8" fill="#7a7e86"/><circle cx="-58" cy="-4" r="6" fill="#7a7e86"/>`;
const kette=()=>`<rect x="-16" y="-80" width="32" height="14" rx="4" fill="#4a4a50"/><path d="M0 -66V-56" stroke="#4a4a50" stroke-width="6"/>${[...Array(7)].map((_,k)=>k%2?`<rect x="-3" y="${-54+k*14}" width="6" height="18" rx="3" fill="#8a8a92"/>`:`<ellipse cx="0" cy="${-46+k*14}" rx="7" ry="10" fill="none" stroke="#8a8a92" stroke-width="4"/>`).join('')}<circle cx="0" cy="62" r="16" fill="none" stroke="#8a8a92" stroke-width="6"/>`;
const staender=()=>`${schatten(66,4)}${[-30,0,30].map(x=>`<path d="M${x} -8V-150" stroke="#8a5a2a" stroke-width="5"/><path d="M${x} -172L${x+8} -150H${x-8}Z" fill="#c8d0d8" stroke="#555" stroke-width="2"/>`).join('')}<rect x="-62" y="-14" width="124" height="12" fill="#6b4a24"/><path d="M-62 -112H62" stroke="#6b4a24" stroke-width="8"/><path d="M-56 -2V-116M56 -2V-116" stroke="#5a3418" stroke-width="7"/>${schild(-30,-46,1.15,'#a33b22','#e8c45a')}${schild(30,-46,1.15,'#2a4a8a','#f4ecd8')}`;
const wuerfel=(x,y)=>`<rect x="${x-9}" y="${y-9}" width="18" height="18" rx="3" fill="#fff" stroke="#555" stroke-width="1.5"/><circle cx="${x-4}" cy="${y-4}" r="2.2" fill="#222"/><circle cx="${x}" cy="${y}" r="2.2" fill="#222"/><circle cx="${x+4}" cy="${y+4}" r="2.2" fill="#222"/>`;
const wuerfeltisch=()=>`${schatten(66,4)}<path d="M-50 0V-60M50 0V-60" stroke="#5a3418" stroke-width="9"/><rect x="-66" y="-70" width="132" height="14" rx="3" fill="#8a5a2a" ${holz}/>${wuerfel(-30,-80)}${wuerfel(-6,-82)}<path d="M18 -70L22 -102H46L50 -70Z" fill="#7a3a1a" stroke="#3a1a08" stroke-width="2"/><ellipse cx="34" cy="-102" rx="12" ry="4" fill="#5a2a10"/>`;
const laterne=()=>`${schatten(28,4)}<circle cy="-40" r="70" fill="url(#licht)"/><rect x="-22" y="-12" width="44" height="12" fill="#3a3a3a"/><rect x="-18" y="-66" width="36" height="54" fill="#ffe7a0" fill-opacity=".85" stroke="#3a3a3a" stroke-width="4"/>${fl(0,-18,.4)}<path d="M0 -66V-12M-18 -39H18" stroke="#3a3a3a" stroke-width="2"/><path d="M-26 -66L0 -90L26 -66Z" fill="#3a3a3a"/><circle cx="0" cy="-97" r="7" fill="none" stroke="#3a3a3a" stroke-width="3"/>`;
const horn=()=>`${schatten(38,4)}<path d="M-26 0L-20 -40M26 0L20 -40" stroke="#5a3418" stroke-width="7"/><rect x="-34" y="-50" width="68" height="10" rx="3" fill="#8a5a2a"/><path d="M-40 -56Q0 -58 26 -90L42 -68Q8 -46 -40 -50Z" fill="#e8d8b0" stroke="#8a6a3a" stroke-width="2"/><ellipse cx="34" cy="-79" rx="8" ry="14" transform="rotate(-38 34 -79)" fill="#8a6a3a"/><path d="M-12 -57V-49M10 -66L14 -56" stroke="#d8a73a" stroke-width="4"/>`;
const schluesselbrett=()=>`<rect x="-72" y="-42" width="144" height="84" rx="6" fill="#8a5a2a" stroke="#4a2a12" stroke-width="4"/>${[[-48,'#d8a73a'],[-16,'#9aa0a8'],[16,'#d8a73a'],[48,'#9aa0a8']].map(([x,c])=>`<circle cx="${x}" cy="-28" r="4" fill="#3a2010"/><circle cx="${x}" cy="-14" r="8" fill="none" stroke="${c}" stroke-width="4"/><path d="M${x} -6V30M${x} 22H${x+8}M${x} 30H${x+10}" stroke="${c}" stroke-width="4"/>`).join('')}`;
const kessel=()=>`${schatten(58,4)}<path d="M-40 0L-34 -22M40 0L34 -22M0 2V-16" stroke="#222" stroke-width="7"/><path d="M-60 -70Q-70 -60 -56 -54M60 -70Q70 -60 56 -54" stroke="#222" stroke-width="5" fill="none"/><path d="M-56 -80H56Q60 -30 30 -16H-30Q-60 -30 -56 -80Z" fill="#2e2e34" stroke="#111" stroke-width="3"/><ellipse cx="0" cy="-80" rx="58" ry="10" fill="#3a3a42" stroke="#111" stroke-width="3"/><ellipse cx="0" cy="-80" rx="48" ry="6" fill="#e0943a"/><path d="M24 -84L50 -132" stroke="#8a5a2a" stroke-width="5"/><path d="M-16 -96Q-26 -112 -14 -126Q-4 -140 -14 -154M10 -98Q0 -116 12 -130" stroke="#fff" stroke-opacity=".6" stroke-width="6" fill="none" stroke-linecap="round"/>`;
const brotkorb=()=>`${schatten(50,4)}<ellipse cx="-18" cy="-44" rx="24" ry="14" fill="#c9883a" stroke="#7a4a1a" stroke-width="2"/><ellipse cx="16" cy="-50" rx="22" ry="16" fill="#d89a4a" stroke="#7a4a1a" stroke-width="2"/><path d="M-28 -50L-22 -40M-16 -52L-10 -42M8 -58L14 -46M18 -60L24 -48" stroke="#7a4a1a" stroke-width="2"/><path d="M-46 -40L-36 0H36L46 -40Z" fill="#c9a050" stroke="#7a5a20" stroke-width="3"/><path d="M-43 -27H43M-39 -13H39" stroke="#9a7a30" stroke-width="3"/>`;
const mehlsack=()=>`${schatten(46,4)}<ellipse cx="50" cy="-2" rx="18" ry="5" fill="#fff"/><path d="M-40 0Q-48 -60 -26 -84L-16 -96H16L26 -84Q48 -60 40 0Z" fill="#efe6d0" stroke="#9a8a6a" stroke-width="3"/><path d="M-20 -88Q0 -80 20 -88" stroke="#8a5a2a" stroke-width="5" fill="none"/><path d="M-16 -96L-22 -110M0 -96V-112M16 -96L22 -110" stroke="#9a8a6a" stroke-width="3"/><path d="M0 -16V-60" stroke="#c9a050" stroke-width="3"/>${[-52,-42,-32].map(y=>`<ellipse cx="-6" cy="${y}" rx="4" ry="7" fill="#d8a73a"/><ellipse cx="6" cy="${y}" rx="4" ry="7" fill="#d8a73a"/>`).join('')}`;
const gemuese=()=>`${schatten(56,4)}<circle cx="-20" cy="-56" r="20" fill="#7ab04a" stroke="#3a6a1a" stroke-width="2"/><path d="M-30 -60Q-20 -48 -10 -60" stroke="#3a6a1a" stroke-width="2" fill="none"/><path d="M8 -46L20 -88L30 -46Z" fill="#e8843a"/><path d="M20 -88L14 -102M20 -88L26 -102" stroke="#3a8a2a" stroke-width="4"/><circle cx="40" cy="-52" r="10" fill="#c0303a"/><path d="M-50 -46H50V0H-50Z" fill="#b8865a" ${holz}/><path d="M-50 -30H50M-50 -14H50" stroke="#4a2a12" stroke-width="2"/>`;
const kraeuter=()=>`<path d="M-76 -52H76" stroke="#6b4a24" stroke-width="6" stroke-linecap="round"/>${[[-48,'#5a8a3a'],[0,'#8a6aa8'],[48,'#7aa04a']].map(([x,c])=>`<path d="M${x} -52V-32" stroke="#a33b22" stroke-width="4"/><path d="M${x-6} -32Q${x-28} 10 ${x} 44Q${x+28} 10 ${x+6} -32Z" fill="${c}" stroke="#2a4a1a" stroke-width="2"/><path d="M${x} -30V38M${x} -6L${x-10} 8M${x} 6L${x+10} 20" stroke="#2a4a1a" stroke-width="2"/>`).join('')}`;
const thron=()=>`${schatten(62,4)}<path d="M-46 0V-120Q-46 -170 0 -186Q46 -170 46 -120V0Z" fill="#b8862a" stroke="#6b4a1c" stroke-width="4"/><path d="M-32 -64V-118Q-32 -154 0 -166Q32 -154 32 -118V-64Z" fill="#a33b3b"/><rect x="-56" y="-68" width="112" height="22" rx="6" fill="#c0303a" stroke="#6b1a1a" stroke-width="3"/>${[-62,46].map(x=>`<rect x="${x}" y="-96" width="16" height="50" rx="6" fill="#b8862a" stroke="#6b4a1c" stroke-width="3"/>`).join('')}<use href="#sym-krone" x="-20" y="-216" width="40" height="40" color="#e8c45a"/>`;
const laute=()=>`${schatten(38,4)}<path d="M-24 0H24" stroke="#5a3418" stroke-width="6" stroke-linecap="round"/><rect x="-6" y="-172" width="12" height="84" fill="#6b3a14"/><path d="M-6 -172L-14 -192H8L6 -172Z" fill="#4a2a10"/><path d="M0 -8Q-38 -12 -38 -50Q-38 -86 0 -94Q38 -86 38 -50Q38 -12 0 -8Z" fill="#c9883a" stroke="#6b3a14" stroke-width="3"/><circle cx="0" cy="-58" r="11" fill="#4a2a10"/><path d="M-12 -26H12" stroke="#4a2a10" stroke-width="5"/><path d="M-3 -170V-26M3 -170V-26" stroke="#f4ecd8"/>`;
const schach=()=>`${schatten(56,4)}<path d="M-36 0V-66M36 0V-66" stroke="#5a3418" stroke-width="8"/><rect x="-52" y="-74" width="104" height="12" fill="#8a5a2a" ${holz}/>${[...Array(16)].map((_,k)=>`<rect x="${-40+(k%8)*10}" y="${-94+Math.floor(k/8)*10}" width="10" height="10" fill="${(k+Math.floor(k/8))%2?'#3a2a1a':'#f4ecd8'}"/>`).join('')}<rect x="-40" y="-94" width="80" height="20" fill="none" stroke="#3a2010" stroke-width="2"/>${[[-30,'#f4ecd8'],[-14,'#f4ecd8'],[16,'#2a2a2a'],[32,'#2a2a2a']].map(([x,c])=>`<path d="M${x-6} -94L${x-3} -106H${x+3}L${x+6} -94Z" fill="${c}" stroke="#555"/><circle cx="${x}" cy="-109" r="5" fill="${c}" stroke="#555"/>`).join('')}`;
const leuchter=()=>`${schatten(38,4)}<path d="M-26 0Q0 -14 26 0" fill="#b8862a"/><path d="M0 -6V-150M-36 -130Q-36 -150 0 -150Q36 -150 36 -130" stroke="#b8862a" stroke-width="6" fill="none"/><path d="M-44 -129H-28M28 -129H44M-8 -151H8" stroke="#b8862a" stroke-width="6"/>${kerze(-36,-158)}${kerze(36,-158)}${kerze(0,-180)}<circle cx="0" cy="-170" r="70" fill="url(#licht)"/>`;
const teppich=()=>`<path d="M-92 -82H92" stroke="#6b4a1c" stroke-width="8" stroke-linecap="round"/><rect x="-78" y="-78" width="156" height="150" fill="#2f5a8a" stroke="#d8a73a" stroke-width="6"/><circle cx="44" cy="-44" r="14" fill="#f3d27a"/><path d="M-72 66V30Q-30 10 0 26Q36 6 72 28V66Z" fill="#5a9a4a"/><path d="M-30 40V-20H-18V-30H-10V-20H10V-30H18V-20H30V40Z" fill="#c8bca0" stroke="#5a4a3a" stroke-width="2"/><path d="M-6 40V24Q0 16 6 24V40" fill="#5a3418"/><path d="M0 -20V-50L16 -44L0 -38" fill="#c0303a" stroke="#5a4a3a" stroke-width="2"/><path d="M-72 78V88M-48 78V88M-24 78V88M0 78V88M24 78V88M48 78V88M72 78V88" stroke="#d8a73a" stroke-width="4"/>`;
const fernrohr=()=>`${schatten(46,4)}<path d="M0 -80L-36 0M0 -80L36 0M0 -80V0" stroke="#4a2a14" stroke-width="5"/><g transform="rotate(-28 0 -86)"><rect x="-56" y="-96" width="112" height="20" rx="4" fill="#b8862a" stroke="#6b4a1c" stroke-width="2"/><rect x="40" y="-100" width="26" height="28" rx="4" fill="#8a6420"/><rect x="-66" y="-92" width="14" height="12" fill="#6b4a1c"/></g>`;
const truhe=()=>`${schatten(66,4)}<rect x="-62" y="-62" width="124" height="60" fill="#8a5a2a" ${holz}/><path d="M-62 -62Q0 -96 62 -62Z" fill="#9a6a3a" ${holz}/><path d="M-40 -2V-76M40 -2V-76M-62 -36H62" stroke="#5a5a62" stroke-width="6"/><rect x="-11" y="-52" width="22" height="20" rx="3" fill="#d8a73a" stroke="#6b4a1c" stroke-width="2"/><circle cx="0" cy="-44" r="3" fill="#3a2010"/>`;
const pult=()=>`${schatten(44,4)}<path d="M-8 0V-70M8 0V-70" stroke="#5a3418" stroke-width="8"/><rect x="-34" y="-6" width="68" height="8" rx="3" fill="#5a3418"/><path d="M-46 -70L46 -86L46 -76L-46 -60Z" fill="#7a4a24" stroke="#3a2010" stroke-width="2"/><path d="M-36 -70L36 -83L38 -100L-34 -88Z" fill="#f4ecd8" stroke="#a89a7a" stroke-width="2"/><rect x="-42" y="-94" width="10" height="30" rx="5" fill="#e8dcc0" stroke="#a89a7a" transform="rotate(-10 -37 -79)"/><path d="M-24 -84L20 -92M-24 -78L20 -86M-24 -72L8 -78" stroke="#8a7a5a" stroke-width="2"/><path d="M28 -88L50 -128" stroke="#f4ecd8" stroke-width="4" stroke-linecap="round"/>`;
const taube=()=>`${schatten(36,4)}<path d="M0 0V-150M-28 0H28" stroke="#5a3418" stroke-width="7" stroke-linecap="round"/><path d="M-40 -150H40" stroke="#5a3418" stroke-width="8" stroke-linecap="round"/><path d="M-30 -178L-48 -168L-30 -164Z" fill="#c8ccd8"/><ellipse cx="0" cy="-172" rx="30" ry="18" fill="#f4f4f8" stroke="#9a9eaa" stroke-width="2"/><path d="M-14 -174Q6 -190 22 -170Q4 -164 -14 -174Z" fill="#c8ccd8"/><circle cx="24" cy="-192" r="12" fill="#f4f4f8" stroke="#9a9eaa" stroke-width="2"/><circle cx="28" cy="-194" r="2.5" fill="#222"/><path d="M35 -192L44 -189L35 -186Z" fill="#e8943a"/><path d="M-4 -156V-150M6 -156V-150" stroke="#e8943a" stroke-width="3"/><rect x="2" y="-162" width="10" height="7" rx="2" fill="#e8dcc0" stroke="#a33b22"/>`;
const himmelskarte=()=>`<rect x="-84" y="-80" width="168" height="160" fill="#e8d6a8" stroke="#6b4a1c" stroke-width="5"/><circle r="64" fill="#1b2a5a" stroke="#b8862a" stroke-width="4"/>${[[-30,-28],[-6,-42],[22,-30],[34,-4],[8,12],[-26,22],[-40,-2],[24,36]].map(([x,y])=>stern(x,y,7)).join('')}<path d="M-30 -28L-6 -42L22 -30L34 -4L8 12M-26 22L-40 -2" stroke="#8fa8d8" stroke-width="1.5" fill="none"/><path d="M44 -44A12 12 0 1 0 50 -26A9 9 0 1 1 44 -44Z" fill="#fff1b8"/>`;
const steintafel=()=>`<rect x="-60" y="-44" width="120" height="88" rx="6" fill="#9a9ea6" stroke="#3a3e46" stroke-width="4"/><path d="M-40 -20H40M-40 0H40M-40 20H16" stroke="#5a5e66" stroke-width="4"/>`;
const schemel=()=>`${schatten(36,4)}<path d="M-24 0L-16 -40M24 0L16 -40" stroke="#5a3418" stroke-width="7"/><rect x="-34" y="-50" width="68" height="12" rx="4" fill="#8a5a2a" ${holz}/>`;
const kiste=()=>`${schatten(48,4)}<rect x="-42" y="-60" width="84" height="58" fill="#8a6a3a" ${holz}/><path d="M-42 -40H42M-42 -20H42" stroke="#4a2a12" stroke-width="2"/>`;
const wachplan=()=>`<rect x="-50" y="-60" width="100" height="120" fill="#efe2c0" stroke="#6b4a1c" stroke-width="4"/><path d="M-34 -36H34M-34 -12H34M-34 12H34M-34 36H34" stroke="#8a7a5a" stroke-width="3"/><circle cy="-56" r="5" fill="#a33b22"/>`;
const wachbuch=()=>`${schatten(36,4)}<path d="M0 0V-60M-20 0H20" stroke="#5a3418" stroke-width="7"/><path d="M-34 -62L0 -56L34 -62V-80L0 -74L-34 -80Z" fill="#f4ecd8" stroke="#6b3a14" stroke-width="3"/>`;
const bank=()=>`${schatten(62,4)}<path d="M-46 0V-36M46 0V-36" stroke="#5a3418" stroke-width="8"/><rect x="-60" y="-46" width="120" height="12" rx="3" fill="#8a5a2a" ${holz}/>`;
const rezept=()=>`<rect x="-50" y="-56" width="100" height="112" rx="4" fill="#2e3438" stroke="#8a5a2a" stroke-width="7"/><path d="M-30 -30H30M-30 -10H20M-30 10H30M-30 30H10" stroke="#e8e8e0" stroke-width="3"/>`;
const kochbuch=()=>`${schatten(34,4)}<rect x="-28" y="-50" width="56" height="48" fill="#9a6a3a" ${holz}/><ellipse cy="-50" rx="28" ry="6" fill="#c9985a" ${holz}/><path d="M-24 -56L0 -52L24 -56V-70L0 -66L-24 -70Z" fill="#f4ecd8" stroke="#a33b22" stroke-width="3"/>`;
const regal=()=>`${schatten(46,4)}<path d="M-40 0V-110M40 0V-110" stroke="#5a3418" stroke-width="6"/><path d="M-40 -6H40M-40 -56H40M-40 -104H40" stroke="#6b4a24" stroke-width="6"/>${['#c0303a','#d8a73a','#5a8a3a'].map((c,k)=>`<rect x="${k*24-32}" y="-82" width="16" height="22" rx="3" fill="${c}"/>`).join('')}`;
const wappen=()=>`<path d="M-56 -70H56V0Q56 52 0 78Q-56 52 -56 0Z" fill="#2a4a8a" stroke="#d8a73a" stroke-width="6"/><path d="M0 -70V76M-56 4H56" stroke="#d8a73a" stroke-width="5"/><path d="M-56 -70H0V4H-56ZM0 4H56V0Q56 52 0 78Z" fill="#c0303a"/><use href="#sym-krone" x="-48" y="-54" width="40" height="40" color="#f3d27a"/><use href="#sym-lilie" x="8" y="-54" width="40" height="40" color="#f3d27a"/><use href="#sym-turm" x="-44" y="12" width="36" height="36" color="#f3d27a"/><use href="#sym-schild" x="8" y="12" width="36" height="36" color="#f3d27a"/>`;
const ruestung=()=>`${schatten(44,4)}<rect x="-40" y="-12" width="80" height="12" fill="#5a3418"/><path d="M-14 -12V-70M14 -12V-70" stroke="#a8b0b8" stroke-width="14"/><path d="M-26 -12H-4M4 -12H26" stroke="#7a828a" stroke-width="8" stroke-linecap="round"/><path d="M-30 -70H30L26 -140H-26Z" fill="#c8d0d8" stroke="#5a626a" stroke-width="3"/><path d="M-30 -86H30" stroke="#5a626a" stroke-width="3"/><path d="M-26 -136Q-44 -130 -40 -80M26 -136Q44 -130 40 -80" stroke="#a8b0b8" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M-20 -146V-176Q-20 -194 0 -194Q20 -194 20 -176V-146Z" fill="#c8d0d8" stroke="#5a626a" stroke-width="3"/><path d="M-14 -170H14M-14 -162H14" stroke="#3a4048" stroke-width="3"/><path d="M0 -194Q6 -216 24 -214Q12 -206 6 -194" fill="#c0303a"/><use href="#sym-lilie" x="-14" y="-124" width="28" height="28" color="#d8a73a"/>`;
const fass=()=>`${schatten(46,4)}<path d="M-34 0Q-46 -46 -34 -92H34Q46 -46 34 0Z" fill="#a0703a" ${holz}/><path d="M-14 -92Q-20 -46 -14 0M14 -92Q20 -46 14 0" stroke="#6b4a24" stroke-width="2" fill="none"/><path d="M-37 -78H37M-40 -46H40M-37 -14H37" stroke="#4a4a50" stroke-width="5"/><ellipse cx="0" cy="-92" rx="34" ry="7" fill="#b8864a" ${holz}/><path d="M-8 -36H8V-28H-8Z" fill="#6b4a24"/>`;
const landkarte=()=>`<rect x="-66" y="-50" width="132" height="100" fill="#e8d6a8" stroke="#6b4a1c" stroke-width="4"/><path d="M-50 20Q-20 -30 10 0T50 -20" stroke="#4a90c8" stroke-width="5" fill="none"/><path d="M-44 -24L-34 -38L-24 -24ZM22 30L32 16L42 30Z" fill="#5a9a4a"/><use href="#sym-turm" x="-12" y="4" width="24" height="24" color="#a33b22"/>`;
const buecher=()=>`${schatten(38,4)}${[['#a33b22',0],['#2a4a8a',4],['#3a8a4a',-4]].map(([c,d],k)=>`<rect x="${d-30}" y="${-16-k*14}" width="60" height="14" rx="2" fill="${c}" stroke="#3a2010" stroke-width="2"/>`).join('')}`;
const sanduhr=()=>`${schatten(28,4)}<path d="M-24 -4H24M-24 -96H24" stroke="#6b4a1c" stroke-width="8" stroke-linecap="round"/><path d="M-18 -92H18Q18 -64 3 -50Q18 -36 18 -8H-18Q-18 -36 -3 -50Q-18 -64 -18 -92Z" fill="#d8eef8" stroke="#6b4a1c" stroke-width="2"/><path d="M-12 -8Q0 -28 12 -8ZM-10 -80H10L0 -60Z" fill="#e8c45a"/>`;
const schlossPl=(n,y)=>{let d='';const x0=500-(n-1)*11;for(let k=0;k<n;k++)d+=`<circle cx="${x0+k*22}" cy="${y}" r="8" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>`;return`<rect x="${500-n*11-12}" y="${y-18}" width="${n*22+24}" height="36" rx="6" fill="#2a1a08" stroke="#d8a73a" stroke-width="2"/>${d}`;};
const kroneOben=y=>`<use href="#sym-krone" x="474" y="${y}" width="52" height="52" color="#e8c45a"/>`;
const TSTIL=`<style>.tuer .tb{transition:transform 1.8s ease-in-out}.tuer.offen #vhL{transform:scaleX(.16)}.tuer.offen #vhR{transform:scaleX(.16)}.tuer.offen #kamp{transform:translateX(200px)}.tuer.offen #luke{transform:scaleY(.12)}.tuer.offen #brue{transform:scaleY(.13)}</style>`;
function tuerGitter(n){
const bogen='M410 470V250Q410 172 500 172Q590 172 590 250V470Z';
let st='';for(let k=0;k<7;k++)st+=`<path d="M${428+k*24} 150V470" stroke="#3a3a42" stroke-width="8"/>`;
return`<path d="M370 470V244Q370 130 500 130Q630 130 630 244V470Z" fill="#8a8a8e" stroke="#3a3a3e" stroke-width="5"/>
   <path d="M370 300H410M590 300H630M370 390H410M590 390H630M384 196L420 214M616 196L580 214M440 146L458 180M560 146L542 180" stroke="#4a4a50" stroke-width="3"/>
   <path d="${bogen}" fill="#120a04"/><path d="M420 470L440 440H560L580 470M440 440L455 410H545L560 440M455 410L468 384H532L545 410" fill="#2a2018" stroke="#3a2c20" stroke-width="3"/>
   <g clip-path="url(#tuerclip)"><g id="platte">${st}<path d="M410 237H590M410 330H590M410 417H590" stroke="#4a4a52" stroke-width="12"/><circle cx="410" cy="237" r="7" fill="#7a7a84"/><circle cx="590" cy="237" r="7" fill="#7a7a84"/>${kroneOben(252)}${schlossPl(n,330)}</g></g>`;
}
function tuerVorhang(n){
return`<defs><radialGradient id="gangL"><stop offset="0" stop-color="#ffd890" stop-opacity=".9"/><stop offset="1" stop-color="#2a1408" stop-opacity="0"/></radialGradient></defs>
   <rect x="396" y="226" width="208" height="244" fill="#1a0c06"/><ellipse cx="500" cy="380" rx="70" ry="110" fill="url(#gangL)"/><path d="M470 470L486 400H514L530 470" fill="#3a2410"/>
   <rect x="380" y="206" width="240" height="24" rx="4" fill="#6b4220" stroke="#3a2010" stroke-width="3"/><rect x="380" y="226" width="22" height="244" fill="#8a5a2c" stroke="#3a2010" stroke-width="3"/><rect x="598" y="226" width="22" height="244" fill="#8a5a2c" stroke="#3a2010" stroke-width="3"/>
   <path d="M392 236H608" stroke="#3a2a14" stroke-width="5"/>
   <g id="vhL" class="tb" style="transform-origin:402px 240px"><path d="M402 238H501V470H402Z" fill="#a8302e" stroke="#5a1a18" stroke-width="3"/><path d="M426 240V468M450 240V468M474 240V468" stroke="#7a2020" stroke-width="4"/><path d="M402 462H501" stroke="#e8c45a" stroke-width="6"/></g>
   <g id="vhR" class="tb" style="transform-origin:598px 240px"><path d="M499 238H598V470H499Z" fill="#a8302e" stroke="#5a1a18" stroke-width="3"/><path d="M526 240V468M550 240V468M574 240V468" stroke="#7a2020" stroke-width="4"/><path d="M499 462H598" stroke="#e8c45a" stroke-width="6"/></g>
   <path d="M360 190H640L620 206H380Z" fill="#8a8a8e" stroke="#3a3a3e" stroke-width="3"/>${kroneOben(128)}${schlossPl(n,182)}`;
}
function tuerKamin(n){
const op='M410 470V290Q410 236 464 236H536Q590 236 590 290V470Z';
let br='';for(let y=250;y<470;y+=22)br+=`M410 ${y}H590`;
return`<defs><clipPath id="kaminclip"><path d="${op}"/></clipPath></defs>
   <path d="M360 470V140Q360 96 404 96H596Q640 96 640 140V470Z" fill="#9a8e7e" stroke="#4a3a2a" stroke-width="5"/>
   <path d="M360 200H640M360 300H410M590 300H640M360 390H410M590 390H640M430 96V150M500 96V150M570 96V150" stroke="#6a5e4e" stroke-width="3"/>
   <rect x="340" y="204" width="320" height="22" rx="4" fill="#6b4a24" stroke="#3a2610" stroke-width="3"/>
   <path d="${op}" fill="#0e0806"/><path d="M420 470L440 436H560L580 470M440 436L452 404H548L560 436M452 404L464 376H536L548 404M464 376L474 352H526L536 376" fill="#2a2018" stroke="#3a2c20" stroke-width="3"/>
   <g clip-path="url(#kaminclip)"><g id="kamp" class="tb"><path d="${op}" fill="#3a2a22"/><path d="${br}" stroke="#241610" stroke-width="3"/><circle cx="500" cy="440" r="90" fill="url(#licht)"/><path d="M440 462L560 440M440 440L560 464" stroke="#5a3418" stroke-width="14" stroke-linecap="round"/>${fl(470,446,1.1)}${fl(526,448,1.3)}</g></g>
   ${kroneOben(100)}${schlossPl(n,166)}`;
}
function tuerLuke(n){
const f='400,484 600,484 640,548 360,548';
return`<polygon points="388,478 612,478 654,556 346,556" fill="#6b4a24" stroke="#3a2010" stroke-width="4"/>
   <polygon points="${f}" fill="#0c0a14"/><path d="M380 504H620M372 520H628M366 536H634" stroke="#3a3040" stroke-width="5"/>
   <g id="luke" class="tb" style="transform-origin:500px 484px"><polygon points="${f}" fill="#8a5a2c" stroke="#3a2010" stroke-width="4"/><path d="M433 484L420 548M466 484L460 548M500 484V548M534 484L540 548M567 484L580 548" stroke="#4a2a12" stroke-width="3"/>${schlossPl(n,516)}<circle cx="500" cy="496" r="7" fill="none" stroke="#3a3a40" stroke-width="4"/></g>`;
}
function tuerBruecke(n){
const ob='M340 470V210Q340 110 500 110Q660 110 660 210V470Z',ib='M385 470V228Q385 150 500 150Q615 150 615 228V470Z';
let pl='';for(let x=412;x<615;x+=28)pl+=`M${x} 150V470`;
return`<defs><clipPath id="torclip"><path d="${ib}"/></clipPath><linearGradient id="himmelT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0e8"/><stop offset="1" stop-color="#e8f4d8"/></linearGradient></defs>
   <path d="${ob}" fill="#8a8a8e" stroke="#3a3a3e" stroke-width="5"/><path d="M340 270H385M615 270H660M340 360H385M615 360H660M356 170L392 190M644 170L608 190M420 130L436 158M580 130L564 158" stroke="#4a4a50" stroke-width="3"/>
   <g clip-path="url(#torclip)"><rect x="380" y="140" width="240" height="340" fill="url(#himmelT)"/><circle cx="560" cy="200" r="22" fill="#fff6c8"/><path d="M380 360Q440 330 500 352T620 346V430H380Z" fill="#8cc06a"/><path d="M380 395Q450 380 520 396T620 392V430H380Z" fill="#6aa04a"/><path d="M380 424H620V470H380Z" fill="#4a90c8"/><path d="M396 440q10-4 20 0t20 0M540 452q10-4 20 0t20 0M450 460q10-4 20 0t20 0" stroke="#bfe0f0" stroke-width="3" fill="none"/><path d="M380 424H620" stroke="#3a6a9a" stroke-width="3"/>
   <g id="brue" class="tb" style="transform-origin:500px 470px"><path d="M385 150H615V470H385Z" fill="#a0703a"/><path d="${pl}" stroke="#5a3418" stroke-width="3"/><path d="M385 235H615M385 330H615M385 420H615" stroke="#3a3a40" stroke-width="12"/><path d="M385 150H615V470H385Z" fill="none" stroke="#5a3418" stroke-width="8"/><circle cx="400" cy="170" r="7" fill="#7a7a84"/><circle cx="600" cy="170" r="7" fill="#7a7a84"/>${kroneOben(252)}${schlossPl(n,330)}</g></g>`;
}
function tuer(n,bereit,def){
const dx=((def&&def.tuerX)||500)-500,art=(def&&def.tuerArt)||'gitter';
const arten={gitter:[tuerGitter,'Gittertor mit Zahlenschloss'],vorhang:[tuerVorhang,'Vorhang mit Zahlenschloss'],kamin:[tuerKamin,'Kamin mit Zahlenschloss'],luke:[tuerLuke,'Luke mit Zahlenschloss'],bruecke:[tuerBruecke,'Zugbrücke mit Zahlenschloss']};
const a=arten[art]||arten.gitter;
return`<defs><clipPath id="tuerclip"><path d="M410 470V250Q410 172 500 172Q590 172 590 250V470Z"/></clipPath></defs>${TSTIL}
  <g transform="translate(${dx} 0)"><g class="tuer${bereit?' bereit':''}" role="button" tabindex="0" aria-label="${a[1]}">${a[0](n)}</g></g>`;
}
const ZT=['Krone','Schild','Lilie','Turm','Fahne'];
SZENARIEN.burg={
name:"Die Ritterburg",
symbole:["krone","schild","lilie","turm","fahne"],
symbolNamen:ZT,
emblem:`<svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><path d="M14 84V34H10V22H18V28H26V22H34V34H30V44H90V34H86V22H94V28H102V22H110V34H106V84Z" fill="#c8bca0" stroke="#5a4a3a" stroke-width="3" stroke-linejoin="round"/><path d="M50 84V64Q60 52 70 64V84Z" fill="#5a3418"/><path d="M22 22V6L36 10L22 14" fill="#c0303a" stroke="#5a4a3a" stroke-width="2"/><use href="#sym-krone" x="46" y="18" width="28" height="28" color="#b8862a"/></svg>`,
texte:{
einleitung:"Ihr besichtigt eine alte Ritterburg. Unten im Verlies fällt plötzlich die Gittertür hinter euch zu – klack! Zum Glück kennt die kleine Burgmaus einen Weg nach draußen: Jeder Durchgang in der Burg ist mit einem Zahlenschloss gesichert. Untersucht die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schafft ihr es bis zur Zugbrücke?",
startKnopf:"Die Burg betreten",
hinweisGeber:"Die Burgmaus flüstert:",
richtig:"Richtig gelöst!",
falsch:["Das stimmt leider noch nicht. Versucht es noch einmal!","Die Burgmaus schüttelt den Kopf … Prüft eure Antwort!","Fast! Lest die Aufgabe noch einmal ganz genau."],
schlossTitel:"Das Zahlenschloss der Burg",
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stellt unter jedem Zeichen die Ziffer ein, die ihr dafür gefunden habt.",
schlossStelle:"Stellt jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt versperrt. Überprüft eure Ziffern!",
zeitUmTitel:"Die Sonne geht unter!",
zeitUm:"Eure Zeit ist abgelaufen. Aber gebt nicht auf – ihr dürft weiterspielen und die Zugbrücke trotzdem noch erreichen!",
geschafft:"Ihr seid frei!",
abschluss:"Geschafft! Ihr habt alle Rätsel zum Thema <b>{titel}</b> gelöst und seid über die Zugbrücke aus der Ritterburg entkommen. Die Burgmaus jubelt!"
},
texteDu:{
einleitung:"Du besichtigst eine alte Ritterburg. Unten im Verlies fällt plötzlich die Gittertür hinter dir zu – klack! Zum Glück kennt die kleine Burgmaus einen Weg nach draußen: Jeder Durchgang in der Burg ist mit einem Zahlenschloss gesichert. Untersuche die Gegenstände in den Räumen. Hinter jeder gelösten Aufgabe verbirgt sich eine Ziffer. Schaffst du es bis zur Zugbrücke?",
falsch:["Das stimmt leider noch nicht. Versuche es noch einmal!","Die Burgmaus schüttelt den Kopf … Prüfe deine Antwort!","Fast! Lies die Aufgabe noch einmal ganz genau."],
schlossSymbol:"Über jedem Rad ist ein Zeichen eingraviert. Stelle unter jedem Zeichen die Ziffer ein, die du dafür gefunden hast.",
schlossStelle:"Stelle jede gefundene Ziffer an der richtigen Stelle ein.",
schlossFalsch:"Das Schloss klickt – aber der Weg bleibt versperrt. Überprüfe deine Ziffern!",
zeitUm:"Deine Zeit ist abgelaufen. Aber gib nicht auf – du darfst weiterspielen und die Zugbrücke trotzdem noch erreichen!",
geschafft:"Du bist frei!",
abschluss:"Geschafft! Du hast alle Rätsel zum Thema <b>{titel}</b> gelöst und bist über die Zugbrücke aus der Ritterburg entkommen. Die Burgmaus jubelt!"
},
einfach:{
name:"Die Ritterburg",
symbolNamen:['Krone','Schild','Blume','Turm','Fahne'],
texte:{
einleitung:"Ihr seid in einer alten Burg. Hier haben früher Ritter gewohnt. Ihr seid in einem Keller mit Gitter. Plötzlich geht die Gitter-Tür zu! Eine kleine Maus hilft euch. An jedem Durchgang hängt ein Zahlenschloss. Löst die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommt ihr eine Zahl. Findet ihr den Weg zur Brücke vor der Burg?",
falsch:["Das stimmt noch nicht. Versucht es noch einmal!","Leider falsch. Schaut noch einmal genau hin!","Fast! Lest die Aufgabe noch einmal."],
schlossTitel:"Das Zahlenschloss",
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stellt unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stellt jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüft eure Zahlen noch einmal!",
zeitUmTitel:"Die Zeit ist um!",
zeitUm:"Die Zeit ist vorbei. Aber ihr dürft weiterspielen!",
abschluss:"Super! Ihr habt alle Aufgaben zum Thema <b>{titel}</b> gelöst. Ihr seid über die Brücke aus der Burg gelaufen!"
},
texteDu:{
einleitung:"Du bist in einer alten Burg. Hier haben früher Ritter gewohnt. Du bist in einem Keller mit Gitter. Plötzlich geht die Gitter-Tür zu! Eine kleine Maus hilft dir. An jedem Durchgang hängt ein Zahlenschloss. Löse die Aufgaben in den Räumen. Für jede richtige Aufgabe bekommst du eine Zahl. Findest du den Weg zur Brücke vor der Burg?",
falsch:["Das stimmt noch nicht. Versuche es noch einmal!","Leider falsch. Schau noch einmal genau hin!","Fast! Lies die Aufgabe noch einmal."],
schlossSymbol:"Über jedem Rad ist ein Zeichen. Stelle unter jedem Zeichen die passende Zahl ein.",
schlossStelle:"Stelle jede Zahl an die richtige Stelle.",
schlossFalsch:"Der Weg bleibt zu. Prüfe deine Zahlen noch einmal!",
zeitUm:"Die Zeit ist vorbei. Aber du darfst weiterspielen!",
geschafft:"Du bist frei!",
abschluss:"Super! Du hast alle Aufgaben zum Thema <b>{titel}</b> gelöst. Du bist über die Brücke aus der Burg gelaufen!"
},
raeume:[
{titel:"Der Keller mit Gitter",intro:"Ihr seid ganz unten in der Burg. Hier ist es dunkel. Zwei Fackeln geben Licht. Sucht die Zahlen für das erste Schloss!",introDu:"Du bist ganz unten in der Burg. Hier ist es dunkel. Zwei Fackeln geben Licht. Suche die Zahlen für das erste Schloss!",
objekte:[{name:"Sack mit Stroh",fund:"Im Stroh liegt:"},{name:"Krug",fund:"Im Krug schwimmt:"},{name:"Eimer",fund:"Im Eimer liegt:"},{name:"Loser Stein",fund:"Unter dem Stein liegt:"},{name:"Kette",fund:"An der Kette hängt:"}],
infoObjekte:[{name:"Stein mit Schrift",fund:"In einem Spalt im Stein steckt:"},{name:"Hocker",fund:"Unter dem Hocker klebt:"},{name:"Alte Kiste",fund:"In der Kiste liegt:"}]},
{titel:"Die Küche",intro:"Hier wird für alle gekocht. Im Feuer steht ein großer Topf. Es riecht nach Brot und Suppe.",
objekte:[{name:"Großer Topf",fund:"Am Löffel klebt:"},{name:"Korb mit Brot",fund:"Unter dem Brot liegt:"},{name:"Sack mit Mehl",fund:"Im Mehl steckt:"},{name:"Kiste mit Gemüse",fund:"Zwischen dem Gemüse liegt:"},{name:"Kräuter",fund:"Zwischen den Kräutern hängt:"}],
infoObjekte:[{name:"Tafel mit Rezept",fund:"Hinter der Tafel steckt:"},{name:"Regal mit Gewürzen",fund:"Im Regal steht:"},{name:"Buch zum Kochen",fund:"Im Buch liegt:"}]},
{titel:"Der große Saal",intro:"Hier haben die Ritter gefeiert. Es gibt einen langen Tisch und einen Stuhl für den König. Das bunte Fenster leuchtet.",
objekte:[{name:"Stuhl des Königs",fund:"Auf dem Kissen liegt:"},{name:"Alte Gitarre",fund:"In der Gitarre klappert:"},{name:"Tisch mit Spiel",fund:"Unter dem Spiel liegt:"},{name:"Kerzen",fund:"Unter den Kerzen liegt:"},{name:"Bild aus Stoff",fund:"Hinter dem Stoff steckt:"}],
infoObjekte:[{name:"Zeichen der Burg",fund:"Hinter dem Zeichen steckt:"},{name:"Rüstung",fund:"Im Helm liegt:"},{name:"Fass",fund:"Auf dem Fass liegt:"}]},
{titel:"Das Zimmer im Turm",intro:"Ihr seid oben im Turm. Draußen leuchten die Sterne. Im Boden ist eine Luke mit einem Schloss. Öffnet sie! Dann geht es nach unten.",introDu:"Du bist oben im Turm. Draußen leuchten die Sterne. Im Boden ist eine Luke mit einem Schloss. Öffne sie! Dann geht es nach unten.",
objekte:[{name:"Fernrohr",fund:"Im Fernrohr steckt:"},{name:"Schatzkiste",fund:"In der Kiste liegt:"},{name:"Tisch mit Brief",fund:"Im Brief steht:"},{name:"Taube",fund:"Die Taube bringt:"},{name:"Bild mit Sternen",fund:"Hinter dem Bild steckt:"}],
infoObjekte:[{name:"Karte vom Land",fund:"Hinter der Karte steckt:"},{name:"Sanduhr",fund:"Unter der Uhr liegt:"},{name:"Stapel mit Büchern",fund:"Zwischen den Büchern steckt:"}]},
{titel:"Das Tor-Haus",intro:"Hier haben die Wächter gewartet. Sie haben auf das Burg-Tor aufgepasst. Die Brücke ist hoch. Findet die letzten Zahlen! Dann kommt die Brücke herunter.",introDu:"Hier haben die Wächter gewartet. Sie haben auf das Burg-Tor aufgepasst. Die Brücke ist hoch. Finde die letzten Zahlen! Dann kommt die Brücke herunter.",
objekte:[{name:"Schlüssel an der Wand",fund:"Bei den Schlüsseln hängt:"},{name:"Tisch mit Würfeln",fund:"Unter dem Becher liegt:"},{name:"Gestell mit Schilden",fund:"Hinter einem Schild steckt:"},{name:"Lampe",fund:"An der Lampe hängt:"},{name:"Horn",fund:"Im Horn steckt:"}],
infoObjekte:[{name:"Plan an der Wand",fund:"Hinter dem Plan steckt:"},{name:"Buch der Wächter",fund:"Im Buch steht:"},{name:"Bank",fund:"Unter der Bank liegt:"}]}
]
},
welt:{w:1600,h:780},
raeume:[
{titel:"Das Verlies",
intro:"Ihr sitzt im Verlies tief unten in der Burg. Durch ein kleines Gitterfenster fällt ein Lichtstrahl, zwei Fackeln flackern an den Steinwänden. Irgendwo hier sind die Ziffern für das erste Schloss versteckt. Das Gittertor ist mit einem Zahlenschloss gesichert …",
introDu:"Du sitzt im Verlies tief unten in der Burg. Durch ein kleines Gitterfenster fällt ein Lichtstrahl, zwei Fackeln flackern an den Steinwänden. Irgendwo hier sind die Ziffern für das erste Schloss versteckt. Das Gittertor ist mit einem Zahlenschloss gesichert …",
tuerX:800,tuerArt:"gitter",
hintergrund:()=>`${defs('#4e4e54','#1e1e22','#ffb060')}<rect width="1600" height="470" fill="#3e4350"/>${steine(40,470,52,120,'rgba(0,0,0,.35)')}<rect width="1600" height="40" fill="#22252c"/><rect x="1100" y="80" width="100" height="74" fill="#9ec8e0" stroke="#2a2d34" stroke-width="8"/><path d="M1125 80V154M1150 80V154M1175 80V154" stroke="#2a2d34" stroke-width="6"/><polygon points="1104,154 1196,154 1120,780 880,780" fill="#e8f4ff" opacity=".07"/><path d="M0 440H1600" stroke="rgba(60,90,50,.4)" stroke-width="6"/>${boden(1)}${fackel(560,200)}${fackel(1040,200)}${stroh(180,660)}${stroh(430,720)}${stroh(1200,640)}${stroh(940,560)}`,
objekte:[
{name:"Strohsack",x:250,boden:640,fuss:4,by:-80,zeichne:strohsack,fund:"Im Stroh versteckt liegt:"},
{name:"Wasserkrug",x:560,boden:590,fuss:4,by:-105,zeichne:krug,fund:"Im Wasserkrug schwimmt:"},
{name:"Holzeimer",x:1050,boden:700,fuss:4,by:-120,zeichne:eimer,fund:"Am Boden des Eimers liegt:"},
{name:"Loser Mauerstein",x:1300,boden:580,fuss:4,by:-72,zeichne:mauerstein,fund:"Unter dem Stein liegt:"},
{name:"Kette am Haken",x:300,y:230,wand:true,by:-100,zeichne:kette,fund:"Am Ring der Kette hängt:"}
],
infoObjekte:[
{name:"Steintafel",x:1400,y:240,wand:true,by:-64,zeichne:steintafel,fund:"In einer Ritze der Steintafel steckt:"},
{name:"Holzschemel",x:1490,boden:560,fuss:4,by:-75,zeichne:schemel,fund:"Unter dem Schemel klebt:"},
{name:"Alte Holzkiste",x:760,boden:740,fuss:4,by:-85,zeichne:kiste,fund:"In der alten Kiste liegt:"}]},
{titel:"Die Burgküche",
intro:"In der Burgküche ist es warm. Im großen Kamin brennt ein Feuer, darüber blubbert die Suppe im Kessel. Unter der Decke trocknen Kräuter. Hier wurde für alle in der Burg gekocht. Hinter dem roten Vorhang liegt ein kleiner Gang, doch das Schloss hält ihn zu.",
tuerX:220,tuerArt:"vorhang",
hintergrund:()=>`${defs('#9a5a3a','#4a2414','#ffb050')}<rect width="1600" height="470" fill="#c98a52"/>${steine(40,470,46,110,'rgba(90,40,10,.3)')}<rect width="1600" height="40" fill="#4a2a14"/><circle cx="800" cy="400" r="420" fill="url(#licht)"/><path d="M620 40H980L1040 172H560Z" fill="#a89a88" stroke="#4a3a2a" stroke-width="4"/><rect x="540" y="168" width="520" height="26" fill="#6b4a24"/><rect x="560" y="194" width="480" height="276" fill="#8a7e70" stroke="#4a3a2a" stroke-width="4"/><path d="M610 470V250Q610 214 650 214H950Q990 214 990 250V470Z" fill="#2a1408"/><path d="M700 466L900 450M700 450L900 468" stroke="#5a3418" stroke-width="14" stroke-linecap="round"/>${fl(720,456,1.3)}${fl(800,452,1.7)}${fl(880,456,1.3)}${[170,270].map(y=>`<rect x="1100" y="${y}" width="250" height="10" fill="#6b4a24"/>`).join('')}${[[1130,'#b8643a'],[1180,'#e8dcc0'],[1240,'#5a7a9a'],[1300,'#b8643a']].map(([x,c],k)=>`<path d="M${x-16} 170V${142-k%2*10}H${x+16}V170Z" fill="${c}" stroke="#4a2a12" stroke-width="2"/><circle cx="${x+4}" cy="250" r="${14+k%2*4}" fill="${k%2?'#d8a73a':'#c0303a'}"/>`).join('')}${boden(1)}`,
objekte:[
{name:"Suppenkessel",x:800,boden:520,fuss:4,by:-170,zeichne:kessel,fund:"Am Kochlöffel klebt:"},
{name:"Brotkorb",x:520,boden:680,fuss:4,by:-88,zeichne:brotkorb,fund:"Unter dem Brot liegt:"},
{name:"Mehlsack",x:1150,boden:600,fuss:4,by:-130,zeichne:mehlsack,fund:"Im Mehl steckt:"},
{name:"Gemüsekiste",x:1380,boden:710,fuss:4,by:-125,zeichne:gemuese,fund:"Zwischen dem Gemüse liegt:"},
{name:"Kräuterbündel",x:440,y:210,wand:true,by:-75,zeichne:kraeuter,fund:"Zwischen den Kräutern hängt:"}
],
infoObjekte:[
{name:"Rezepttafel",x:1450,y:230,wand:true,by:-76,zeichne:rezept,fund:"Hinter der Rezepttafel steckt:"},
{name:"Gewürzregal",x:1490,boden:560,fuss:4,by:-135,zeichne:regal,fund:"Zwischen den Gewürzen steht:"},
{name:"Kochbuch",x:300,boden:720,fuss:4,by:-95,zeichne:kochbuch,fund:"Im Kochbuch liegt:"}]},
{titel:"Der Rittersaal",
intro:"Ihr betretet den prächtigen Rittersaal. Bunte Banner hängen von der Decke, durch das Glasfenster fällt farbiges Licht. An der langen Tafel feierten Ritter und Burgfräulein ihre Feste. Der große Kamin sieht merkwürdig aus: Er hat ein Zahlenschloss!",
introDu:"Du betrittst den prächtigen Rittersaal. Bunte Banner hängen von der Decke, durch das Glasfenster fällt farbiges Licht. An der langen Tafel feierten Ritter und Burgfräulein ihre Feste. Der große Kamin sieht merkwürdig aus: Er hat ein Zahlenschloss!",
tuerX:1050,tuerArt:"kamin",
hintergrund:()=>`${defs('#9a8a72','#3a3028','#fff0c0')}<rect width="1600" height="470" fill="#d4c8a8"/>${steine(40,470,60,160,'rgba(90,70,40,.25)')}<rect width="1600" height="40" fill="#6b4a24"/><clipPath id="glas"><path d="M420 300V130Q420 60 480 60Q540 60 540 130V300Z"/></clipPath><g clip-path="url(#glas)">${['#c0303a','#2a5aa8','#e8c45a','#3a8a4a','#8a4aa8','#e8843a'].map((c,k)=>`<rect x="${420+(k%3)*40}" y="${60+Math.floor(k/3)*120}" width="40" height="120" fill="${c}"/>`).join('')}<circle cx="480" cy="130" r="26" fill="#f3d27a"/></g><path d="M420 300V130Q420 60 480 60Q540 60 540 130V300ZM460 60V300M500 60V300M420 180H540" stroke="#3a3028" stroke-width="5" fill="none"/>${banner(250,'#c0303a','#f3d27a','lilie')}${banner(700,'#2a5aa8','#f4ecd8','turm')}${banner(1550,'#3a8a4a','#f3d27a','fahne')}<rect x="200" y="408" width="620" height="16" fill="#7a4a24" stroke="#3a2010" stroke-width="2"/><path d="M230 424V470M790 424V470" stroke="#3a2010" stroke-width="12"/>${[260,380,500,620,740].map(x=>`<ellipse cx="${x}" cy="405" rx="20" ry="4" fill="#e8e2d2"/><path d="M${x+30} 406V390M${x+24} 380H${x+36}L${x+33} 392H${x+27}Z" stroke="#b8862a" stroke-width="3" fill="#d8a73a"/>`).join('')}${boden()}${['#c0303a','#2a5aa8','#e8c45a'].map((c,k)=>`<ellipse cx="${430+k*55}" cy="${540+k*12}" rx="60" ry="16" fill="${c}" opacity=".2"/>`).join('')}`,
objekte:[
{name:"Thron",x:1400,boden:560,fuss:4,by:-235,zeichne:thron,fund:"Auf dem Thronkissen liegt:"},
{name:"Laute",x:300,boden:700,fuss:4,by:-212,zeichne:laute,fund:"In der Laute klappert etwas:"},
{name:"Schachbrett",x:650,boden:620,fuss:4,by:-135,zeichne:schach,fund:"Unter dem Schachbrett liegt:"},
{name:"Kerzenleuchter",x:120,boden:580,fuss:4,by:-205,zeichne:leuchter,fund:"Unter dem Leuchter liegt:"},
{name:"Wandteppich",x:1400,y:240,wand:true,by:-105,zeichne:teppich,fund:"Hinter dem Wandteppich steckt:"}
],
infoObjekte:[
{name:"Burgwappen",x:830,y:230,wand:true,by:-100,zeichne:wappen,fund:"Hinter dem Wappen steckt:"},
{name:"Ritterrüstung",x:1240,boden:610,fuss:4,by:-235,zeichne:ruestung,fund:"Im Helm der Rüstung liegt:"},
{name:"Holzfass",x:1000,boden:740,fuss:4,by:-115,zeichne:fass,fund:"Auf dem Deckel des Fasses liegt:"}]},
{titel:"Das Turmzimmer",
intro:"Eine Wendeltreppe führt hinauf ins Turmzimmer. Vom Fenster aus seht ihr weit über das Land, am Himmel funkeln die Sterne. Im Boden ist eine Luke mit einem Zahlenschloss. Öffnet sie, dann geht es hinunter zum Burgtor!",
introDu:"Eine Wendeltreppe führt hinauf ins Turmzimmer. Vom Fenster aus siehst du weit über das Land, am Himmel funkeln die Sterne. Im Boden ist eine Luke mit einem Zahlenschloss. Öffne sie, dann geht es hinunter zum Burgtor!",
tuerX:500,tuerArt:"luke",
hintergrund:()=>`${defs('#4a4a5a','#1a1a26','#c8d0ff')}<rect width="1600" height="470" fill="#3a4266"/>${steine(40,470,44,90,'rgba(0,0,0,.3)')}<rect width="1600" height="470" fill="url(#vig)"/><rect width="1600" height="40" fill="#1e2238"/><rect x="138" y="0" width="24" height="470" fill="#2a2e48"/>${[...Array(9)].map((_,k)=>{const x=150+Math.round(70*Math.sin(k*.9));return`<path d="M${x-60} ${452-k*52}H${x+60}L${x+50} ${468-k*52}H${x-50}Z" fill="#6a6e88" stroke="#22253a" stroke-width="2"/>`;}).join('')}<path d="M900 330V180Q900 80 1050 80Q1200 80 1200 180V330Z" fill="#1b2a5a"/>${[[940,170],[990,120],[1080,110],[1150,190],[1010,210],[960,250],[1170,250]].map(([x,y],k)=>stern(x,y,4+k%3*2)).join('')}<circle cx="1120" cy="140" r="20" fill="#fff1b8"/><path d="M900 330V280Q960 250 1020 276Q1090 240 1200 270V330Z" fill="#2a4a3a"/><path d="M900 330V300Q1000 284 1100 304Q1150 296 1200 302V330Z" fill="#1e3a2c"/><path d="M1040 286V270L1052 262L1064 270V286Z" fill="#4a5a50"/><path d="M900 330V180Q900 80 1050 80Q1200 80 1200 180V330Z" fill="none" stroke="#8a8ea6" stroke-width="16"/><rect x="880" y="330" width="340" height="16" fill="#8a8ea6"/><circle cx="1050" cy="300" r="320" fill="#8fa8f0" opacity=".1"/>${boden(1)}`,
objekte:[
{name:"Fernrohr",x:1050,boden:560,fuss:4,by:-142,zeichne:fernrohr,fund:"Im Fernrohr steckt:"},
{name:"Schatztruhe",x:1330,boden:690,fuss:4,by:-112,zeichne:truhe,fund:"Die Truhe springt auf! Darin liegt:"},
{name:"Pult mit Schriftrolle",x:780,boden:620,fuss:4,by:-150,zeichne:pult,fund:"Auf der Schriftrolle steht:"},
{name:"Brieftaube",x:240,boden:620,fuss:4,by:-225,zeichne:taube,fund:"Die Brieftaube bringt eine Nachricht:"},
{name:"Himmelskarte",x:1400,y:220,wand:true,by:-100,zeichne:himmelskarte,fund:"Hinter der Himmelskarte steckt:"}
],
infoObjekte:[
{name:"Landkarte",x:760,y:220,wand:true,by:-70,zeichne:landkarte,fund:"Hinter der Landkarte steckt:"},
{name:"Sanduhr",x:1510,boden:560,fuss:4,by:-120,zeichne:sanduhr,fund:"Unter der Sanduhr liegt:"},
{name:"Bücherstapel",x:520,boden:735,fuss:4,by:-75,zeichne:buecher,fund:"Zwischen den Büchern steckt:"}]},
{titel:"Das Torhaus",
intro:"Ihr seid im Torhaus am Burgtor. Hier hielten die Wachen Tag und Nacht Ausschau. Die Zugbrücke ist hochgezogen und das Tor ist fest verschlossen. Findet die letzten Ziffern, dann kommt die Brücke herunter!",
introDu:"Du bist im Torhaus am Burgtor. Hier hielten die Wachen Tag und Nacht Ausschau. Die Zugbrücke ist hochgezogen und das Tor ist fest verschlossen. Finde die letzten Ziffern, dann kommt die Brücke herunter!",
tuerX:1300,tuerArt:"bruecke",
hintergrund:()=>`${defs('#8a5a32','#3a2412','#ffd890')}<rect width="1600" height="470" fill="#c4a678"/>${steine(330,470,35,90,'rgba(70,40,20,.3)')}<rect y="320" width="1600" height="10" fill="#5a3418"/>${[290,960].map(x=>`<rect x="${x-16}" y="140" width="32" height="110" rx="4" fill="#9a8a72"/><rect x="${x-8}" y="150" width="16" height="90" rx="8" fill="#26303a"/>`).join('')}${[100,480,860,1570].map(x=>`<rect x="${x-14}" y="40" width="28" height="430" fill="#5a3418"/>`).join('')}<rect width="1600" height="40" fill="#3a2010"/><rect y="40" width="1600" height="24" fill="#6b4220"/>${[200,580,940].map(x=>`<g transform="translate(${x} 64)"><path d="M0 0V40" stroke="#222" stroke-width="3"/><circle cy="60" r="90" fill="url(#licht)"/><rect x="-12" y="40" width="24" height="30" fill="#ffe7a0" stroke="#3a3a3a" stroke-width="3"/>${fl(0,66,.3)}</g>`).join('')}${boden()}`,
objekte:[
{name:"Schlüsselbrett",x:680,y:230,wand:true,by:-70,zeichne:schluesselbrett,fund:"Zwischen den Schlüsseln hängt:"},
{name:"Würfelspiel",x:700,boden:650,fuss:4,by:-125,zeichne:wuerfeltisch,fund:"Unter dem Würfelbecher liegt:"},
{name:"Waffenständer",x:220,boden:590,fuss:4,by:-192,zeichne:staender,fund:"Hinter einem Schild steckt:"},
{name:"Laterne",x:1000,boden:560,fuss:4,by:-125,zeichne:laterne,fund:"An der Laterne hängt:"},
{name:"Signalhorn",x:1100,boden:720,fuss:4,by:-110,zeichne:horn,fund:"Im Horn steckt ein Zettel:"}
],
infoObjekte:[
{name:"Wachplan",x:1050,y:220,wand:true,by:-80,zeichne:wachplan,fund:"Hinter dem Wachplan steckt:"},
{name:"Wachbuch",x:470,boden:560,fuss:4,by:-100,zeichne:wachbuch,fund:"Im Wachbuch steht:"},
{name:"Sitzbank",x:1530,boden:610,fuss:4,by:-70,zeichne:bank,fund:"Unter der Sitzbank liegt:"}]}
],
tuer,
vignette:`<rect width="1000" height="600" fill="url(#vig)" pointer-events="none"/>`,
ausgang:()=>`<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0e8"/><stop offset=".8" stop-color="#e8f4d8"/></linearGradient></defs>
   <rect width="1000" height="600" fill="url(#himmel)"/><circle cx="740" cy="170" r="90" fill="#fff6c8" opacity=".4"/><circle cx="740" cy="170" r="55" fill="#fff6c8"/>
   <path d="M260 210q20-20 44-6q24-14 40 6Z" fill="#fff" opacity=".85"/><path d="M0 360Q250 300 500 340T1000 330V600H0Z" fill="#8cc06a"/><path d="M0 400Q300 380 600 410T1000 400V600H0Z" fill="#6aa04a"/>
   ${[[150,392],[270,380],[740,388],[860,396]].map(([x,y])=>`<rect x="${x-6}" y="${y-50}" width="12" height="50" fill="#6b4a24"/><circle cx="${x}" cy="${y-66}" r="32" fill="#3f8a4a"/><circle cx="${x-16}" cy="${y-50}" r="22" fill="#4f9a5a"/>`).join('')}
   ${[[90,450],[200,470],[800,460],[900,480],[300,455]].map(([x,y],k)=>`<circle cx="${x}" cy="${y}" r="6" fill="${k%2?'#fff':'#f3d27a'}"/>`).join('')}
   <path d="M0 500Q250 486 500 500T1000 500V560Q750 548 500 560T0 560Z" fill="#4a90c8"/><path d="M60 524q15-6 30 0t30 0M700 530q15-6 30 0t30 0M820 520q15-6 30 0t30 0" stroke="#bfe0f0" stroke-width="3" fill="none"/>
   <polygon points="330,600 670,600 590,420 410,420" fill="#a0703a" stroke="#5a3418" stroke-width="4"/>${[445,475,510,550,595].map(y=>{const e=(y-420)/180*80;return`<path d="M${410-e} ${y}H${590+e}" stroke="#5a3418" stroke-width="3"/>`;}).join('')}
   <path d="M240 150L414 424M760 150L586 424" stroke="#555" stroke-width="7" stroke-dasharray="12 5"/>
   <path d="M0 0H1000V600H0Z M180 600V230Q180 70 500 70Q820 70 820 230V600Z" fill="#2e2a26" fill-rule="evenodd"/><path d="M290 98H710" stroke="#3a3530" stroke-width="14"/>${[...Array(11)].map((_,k)=>`<path d="M${310+k*38} 98V126L${314+k*38} 136L${318+k*38} 126V98" fill="#3a3530" stroke="#3a3530" stroke-width="4"/>`).join('')}<path d="M180 600V230Q180 70 500 70Q820 70 820 230V600" stroke="#7a726a" stroke-width="18" fill="none"/>`
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
   treffer {x,y,z,b,h,t} (Tippfläche), name (Schild), schildOben [x,y,z], glanz [x,y,z], bewege(auf) (auf läuft von 0 bis 1) */
function ausgang(k,opt){
  const sc=k.scene, a=opt.treffer;
  const treffer=new THREE.Mesh(GEO.box,basis(0,{visible:false})); treffer.scale.set(a.b,a.h,a.t); treffer.position.set(a.x,a.y,a.z); sc.add(treffer);
  /* Bis Klasse 6 (einfache Sprache) darf der Ausgang einen leichteren Namen haben */
  const leicht=typeof CONFIG!=='undefined' && (typeof CONFIG.einfacheSprache==='boolean' ? CONFIG.einfacheSprache : parseInt(CONFIG.klasse,10)<=6);
  const schild=textSprite(leicht && opt.einfach ? opt.einfach : opt.name); schild.position.set(opt.schildOben[0],opt.schildOben[1],opt.schildOben[2]); schild.visible=false; sc.add(schild);
  const tuer={ steh:opt.steh, durch:opt.durch, tief:!!opt.tief, hoch:opt.hoch||0, rutsch:opt.rutsch||null, rutschDauer:opt.rutschDauer||1.5, treffer, schild, bereit:false, offen:false };
  const g=schein(sc,'rgba(255,225,120,.9)',opt.glanz[0],opt.glanz[1],opt.glanz[2],2.2); g.visible=false;
  let auf=0;
  k.anim.push((t,dt)=>{ g.visible=tuer.bereit; if(tuer.bereit){ const s=1.8+Math.sin(t*5)*.5; g.scale.set(s,s,1); } auf+=((tuer.offen?1:0)-auf)*Math.min(1,dt*2.5); opt.bewege(auf,t); });
  return tuer;
}

/* ===================================================================
   RITTERBURG in 3D: gemeinsame Bausteine für alle fünf Räume.
   Je Raum eine Datei burg-raum<n>.js, die sich in RAEUME3D.burg[n-1] einträgt.
   =================================================================== */
(function(){
/* Zwei neue Gegenstände je Raum (Nummer 9 und 10), damit bis zu 5 Rätsel mit je einer Wissenskarte gehen */
const NEU=[
  [['Mäuseloch','Aus dem Mäuseloch schaut hervor:','Loch der Maus','Im Loch der Maus liegt:'],['Reisigbesen','Zwischen den Zweigen steckt:','Besen','Im Besen steckt:']],
  [['Backofen','Im Backofen liegt:','Ofen','Im Ofen liegt:'],['Eierkorb','Zwischen den Eiern liegt:','Korb mit Eiern','Im Korb liegt:']],
  [['Festtafel','Unter einem Teller liegt:','Großer Tisch','Unter einem Teller liegt:'],['Pauke','Auf der Pauke liegt:','Trommel','Auf der Trommel liegt:']],
  [['Blumentopf','Unter dem Blumentopf liegt:','Topf mit Blumen','Unter dem Topf liegt:'],['Vogelkäfig','Im Vogelkäfig liegt:','Käfig für Vögel','Im Käfig liegt:']],
  [['Seilwinde','An der Seilwinde hängt:','Rad mit Seil','Am Rad hängt:'],['Heuballen','Im Heu steckt:','Ballen mit Heu','Im Heu steckt:']]
];
const SZB=SZENARIEN.burg;
/* Kindgerecht: statt Waffen zeigt das Torhaus ein Gestell mit bunten Schilden */
SZB.raeume[4].objekte[2].name='Schildgestell';
NEU.forEach((paar,r)=>paar.forEach(n=>{ SZB.raeume[r].infoObjekte.push({ name:n[0], fund:n[1] }); if(SZB.einfach) SZB.einfach.raeume[r].infoObjekte.push({ name:n[2], fund:n[3] }); }));
})();

RAEUME3D.burg = [];
const BURG = (function(){
const HOLZ=0x8a5a2c, HOLZ2=0x6b421e, EISEN=0x3a3d44, STEIN=0x7d7f88, STROH=0xd9b455;

function steinBild(grund,hell){
  return bild(512,512,(g)=>{
    g.fillStyle='#2c2a2b'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ let x=(r%2)*-48;
      while(x<512){ const w=96+((r*7+Math.floor(x/96)*3)%3)*16; const h=grund+Math.floor(zufall()*hell);
        const mal=xx=>{ g.fillStyle='rgb('+h+','+(h+2)+','+(h+10)+')'; g.fillRect(xx+3,r*64+3,w-6,58);
          g.fillStyle='rgba(255,255,255,.09)'; g.fillRect(xx+3,r*64+3,w-6,7); g.fillStyle='rgba(0,0,0,.2)'; g.fillRect(xx+3,r*64+52,w-6,9);
          for(let k=0;k<22;k++){ g.fillStyle=k%2?'rgba(0,0,0,.14)':'rgba(255,255,255,.08)'; g.fillRect(xx+8+((k*37)%(w-18)),r*64+8+((k*23)%44),4,3); } };
        mal(x); if(x<0) mal(x+512); x+=w; } }
  });
}
function mauer(par,tex,w,h,d,x,y,z){
  const t=tex.clone(); t.needsUpdate=true; t.wrapS=t.wrapT=THREE.RepeatWrapping;
  const quer=Math.max(w,d); t.repeat.set(quer/4.4,h/4.4); t.offset.set(((w>d?x-w/2:z-d/2)/4.4)%1,((y-h/2)/4.4)%1);
  const m=new THREE.Mesh(GEO.box,new THREE.MeshLambertMaterial({map:t})); m.scale.set(w,h,d); m.position.set(x,y,z); m.receiveShadow=true; par.add(m); return m;
}

function fackel(par,k,x,z,nachVorn){
  const g=gruppe(par,x,2.7,z); g.rotation.y=nachVorn;
  box(g,.3,.5,.1,EISEN,0,-.15,.02);
  strich(g,[0,-.35,.05],[0,.25,.34],.07,HOLZ2);
  walze(g,.14,.18,EISEN,0,.32,.37);
  const f1=kegel(g,.17,.55,basis(0xff8a1e),0,.65,.37), f2=kegel(g,.09,.36,basis(0xffe066),0,.58,.4);
  f1.castShadow=f2.castShadow=false;
  const s=schein(g,'rgba(255,170,70,.75)',0,.65,.45,2.2);
  k.anim.push(t=>{ const a=1+Math.sin(t*13+x)*.12+Math.sin(t*7.3+x*3)*.1; f1.scale.y=.55*a; f2.scale.y=.36*(2-a); s.scale.set(2.2*a,2.2*a,1); });
}

/* ---------- bewegte Tiere (nicht fest, man kann sie nicht anfassen) ---------- */
function fledermaus(k,cx,cz,r,h,tempo,start){
  const g=gruppe(k.scene,cx,h,cz); ball(g,.15,0x3a2c44,0,0,0,1.3,1,.9); ball(g,.1,0x3a2c44,.2,.05,0); [-1,1].forEach(s=>{ kegel(g,.045,.13,0x3a2c44,.2,.17,s*.06); ball(g,.025,0xffe066,.29,.08,s*.045); });
  const fl=[-1,1].map(s=>{ const f=new THREE.Shape(); f.moveTo(0,0); f.lineTo(.18,.5); f.lineTo(.02,.72); f.lineTo(-.04,.5); f.lineTo(-.18,.5); f.lineTo(-.16,.28); f.lineTo(-.3,.18); f.lineTo(0,0);
    const w=new THREE.Mesh(new THREE.ShapeGeometry(f),mat(0x5a4468,{side:THREE.DoubleSide})); w.rotation.x=s*Math.PI/2; const a=gruppe(g,0,0,s*.08); a.add(w); return a; });
  k.anim.push(t=>{ const a=t*tempo+start; g.position.set(cx+Math.cos(a)*r,h+Math.sin(t*2.3+start)*.35,cz+Math.sin(a)*r); g.rotation.y=-a-Math.PI/2; fl[0].rotation.x=Math.sin(t*13+start)*.7; fl[1].rotation.x=-Math.sin(t*13+start)*.7; });
}

/* ---------- Raumhülle: Licht, Boden, Wände (hinten, links, rechts), Sockel, Mauerkrone, niedriger Fußsockel ----------
   opt: B,T,H, himmel, grund, staerke (Grundlicht), wandBild (aus steinBild), bodenBild (aus bild), bodenWdh [x,z],
        oeffnung {x,b,h} (Loch in der Rückwand für eine Tür, optional) */
function huelle(k,opt){
  const sc=k.scene, B=opt.B||36, T=opt.T||27, H=opt.H||6;
  sc.background=new THREE.Color(0x120d12);
  sc.add(new THREE.HemisphereLight(opt.himmel||0xc4d0f0,opt.grund||0x5c4834,opt.staerke||.82));
  const sonne=new THREE.DirectionalLight(opt.sonne||0xcfe0ff,opt.sonneStaerke||.42); sonne.position.set(-8,26,11); sonne.castShadow=true; sonne.shadow.mapSize.set(2048,2048);
  const c=sonne.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; sonne.shadow.bias=-.001; sc.add(sonne);
  const platten=opt.bodenBild; platten.wrapS=platten.wrapT=THREE.RepeatWrapping; const w=opt.bodenWdh||[B/14,T/10.5]; platten.repeat.set(w[0],w[1]);
  const bm=new THREE.Mesh(new THREE.PlaneGeometry(B,T,72,54),new THREE.MeshLambertMaterial({map:platten})); bm.rotation.x=-Math.PI/2; bm.receiveShadow=true; sc.add(bm);
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x221b1e)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);
  const tex=opt.wandBild, hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts'), o=opt.oeffnung;
  if(o){ const l=o.x-o.b/2+B/2+.5, r=B/2+.5-o.x-o.b/2;
    mauer(hinten,tex,l,H,.5,-B/2-.5+l/2,H/2,-T/2-.25); mauer(hinten,tex,r,H,.5,B/2+.5-r/2,H/2,-T/2-.25); mauer(hinten,tex,o.b,H-o.h,.5,o.x,o.h+(H-o.h)/2,-T/2-.25); }
  else mauer(hinten,tex,B+1,H,.5,0,H/2,-T/2-.25);
  mauer(links,tex,.5,H,T,-B/2-.25,H/2,0); mauer(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  const f=opt.leiste||0x4a4a52, s=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  box(s[0],B+1,.22,.66,f,0,H+.1,-T/2-.25);
  [-1,1].forEach((v,i)=>{ box(s[i+1],.18,.28,T,f,v*(B/2-.06),.14,0); box(s[i+1],.66,.22,T+1,f,v*(B/2+.25),H+.1,0); });
  s.forEach(verschmelze);
  const fuss=gruppe(sc,0,0,0); [-1,1].forEach(v=>{ for(let z=-T/2+.6;z<T/2;z+=1.2) box(fuss,.42,.36+(Math.abs(Math.round(z*7))%3)*.03,1.12,f,v*(B/2+.27),.18,z); }); verschmelze(fuss);
  return { sc, B, T, H, hinten, links, rechts };
}
return { HOLZ, HOLZ2, EISEN, STEIN, STROH, steinBild, mauer, fackel, laeufer, katze, maeuschen, fledermaus, huelle, flacker, ausgang };
})();

/* Raum 1: Das Verlies. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu. */
RAEUME3D.burg[0] = (function(){
const { HOLZ, HOLZ2, EISEN, STEIN, STROH, steinBild, mauer, fackel, laeufer, katze, maeuschen, fledermaus } = BURG;

function baue(k){
  const sc=k.scene, B=36, T=27, H=6;
  sc.background=new THREE.Color(0x120d12);
  sc.add(new THREE.HemisphereLight(0xd0dcf8,0x6c5840,1));
  const mond=new THREE.DirectionalLight(0xcfe0ff,.42); mond.castShadow=true; mond.shadow.mapSize.set(2048,2048);
  const c=mond.shadow.camera; c.left=-23; c.right=23; c.top=20; c.bottom=-20; c.near=1; c.far=60; mond.shadow.bias=-.001; sc.add(mond); sc.add(mond.target);
  mond.position.set(-8,26,11);
  const flacker=(x,y,z,farbe,st,weit)=>{ const l=new THREE.PointLight(farbe,st,weit,1.5); l.position.set(x,y,z); sc.add(l); k.anim.push(t=>{ l.intensity=st*(1+Math.sin(t*11+x)*.08+Math.sin(t*6.1+z)*.06); }); };

  /* Boden aus Steinplatten (viele Flächen, damit das Fackellicht sichtbar ist) */
  const platten=bild(1024,768,(g)=>{ g.fillStyle='#232022'; g.fillRect(0,0,1024,768);
    for(let r=0;r<8;r++){ let x=(r%2)*-60; while(x<1024){ const w=110+Math.floor(zufall()*60), h=92+Math.floor(zufall()*36);
      const mal=xx=>{ g.fillStyle='rgb('+h+','+(h-5)+','+(h-8)+')'; g.beginPath(); g.moveTo(xx+6,r*96+6); g.lineTo(xx+w-5,r*96+8); g.lineTo(xx+w-7,r*96+90); g.lineTo(xx+7,r*96+91); g.closePath(); g.fill();
        for(let i=0;i<26;i++){ g.fillStyle=i%2?'rgba(0,0,0,.16)':'rgba(255,255,255,.07)'; g.fillRect(xx+10+((i*41+x*7)%(w-24)+w-24)%(w-24),r*96+10+(i*29)%74,5,4); } };
      mal(x); if(x<0) mal(x+1024); x+=w; } } });
  platten.wrapS=platten.wrapT=THREE.RepeatWrapping; platten.repeat.set(B/14,T/10.5);
  const bm=new THREE.Mesh(new THREE.PlaneGeometry(B,T,72,54),new THREE.MeshLambertMaterial({map:platten})); bm.rotation.x=-Math.PI/2; bm.receiveShadow=true; sc.add(bm);
  const aussen=new THREE.Mesh(new THREE.PlaneGeometry(160,160),basis(0x221b1e)); aussen.rotation.x=-Math.PI/2; aussen.position.y=-.06; sc.add(aussen);

  const tex=steinBild(108,34), hinten=k.wand('hinten'), links=k.wand('links'), rechts=k.wand('rechts');
  const TB=3, TH=3.3; /* Tor: Breite und Höhe */
  const seit=(B+1-TB)/2;
  mauer(hinten,tex,seit,H,.5,-(TB/2+seit/2),H/2,-T/2-.25);
  mauer(hinten,tex,seit,H,.5,(TB/2+seit/2),H/2,-T/2-.25);
  mauer(hinten,tex,TB,H-TH,.5,0,TH+(H-TH)/2,-T/2-.25);
  mauer(links,tex,.5,H,T,-B/2-.25,H/2,0);
  mauer(rechts,tex,.5,H,T,B/2+.25,H/2,0);
  /* Sockel, Mauerkrone, Ecksäulen, flache Wandpfeiler */
  const schmuck=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  [-1,1].forEach(s=>box(schmuck[0],(B-TB)/2-.3,.28,.18,0x55565e,s*((B+TB)/4+.15),.14,-T/2+.06)); box(schmuck[0],B+1,.22,.66,0x4a4a52,0,H+.1,-T/2-.25);
  [-1,1].forEach((s,i)=>{ const w=schmuck[i+1]; box(w,.18,.28,T,0x55565e,s*(B/2-.06),.14,0); box(w,.66,.22,T+1,0x4a4a52,s*(B/2+.25),H+.1,0);
    walze(schmuck[0],.38,H,0x6c6e77,s*(B/2-.15),H/2,-T/2+.15); walze(schmuck[0],.5,.3,0x55565e,s*(B/2-.15),.15,-T/2+.15); walze(schmuck[0],.5,.25,0x55565e,s*(B/2-.15),H-.1,-T/2+.15); k.kreis(s*(B/2-.15),-T/2+.15,.4);
    [-7.5,-1.5,4.5,10.5].forEach(z=>{ if(s<0 && z>-6 && z<6) return; box(w,.34,H,.8,0x70727b,s*(B/2-.17),H/2,z); box(w,.5,.3,1,0x55565e,s*(B/2-.22),.15,z); box(w,.5,.26,1,0x55565e,s*(B/2-.22),H-.15,z); }); });
  [-13,-4.6,4.6,13].forEach(x=>{ box(schmuck[0],.8,H,.3,0x70727b,x,H/2,-T/2+.15); box(schmuck[0],1,.26,.48,0x55565e,x,H-.15,-T/2+.2); });
  schmuck.forEach(verschmelze);

  const fuss=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ for(let z=-T/2+.6;z<T/2;z+=1.2) box(fuss,.42,.36+(Math.round(z*7)%3)*.03,1.12,0x62646e,s*(B/2+.27),.18,z); });
  /* Bodenzier: Steinrosette vor dem Tor, Falltür, Pilze */
  [[2.4,0x9a948c],[1.9,0x5e5a60],[1.3,0xa8a096],[.6,0x6a5a58]].forEach(([r,f],i)=>walze(fuss,r,.012,f,0,.006+i*.004,-8.2));
  for(let i=0;i<8;i++){ const s=box(fuss,.24,.012,3.4,0x77707a,0,.024,-8.2); s.rotation.y=i*Math.PI/8; }
  box(fuss,2.4,.04,2.4,HOLZ2,-3.6,.02,11); for(let i=0;i<5;i++) box(fuss,.42,.03,2.2,HOLZ,-4.5+i*.45,.05,11); [-.7,.7].forEach(z=>box(fuss,2.3,.025,.16,EISEN,-3.6,.075,11+z)); ring(fuss,.22,.04,EISEN,-3,.1,11).rotation.x=Math.PI/2;
  [[4.5,12.7],[-6.8,12.8],[6.6,-12.8],[-17.3,-4.3],[17.3,3]].forEach(([x,z])=>{ for(let i=0;i<5;i++){ const px=x+(zufall()-.5)*.8, pz=z+(zufall()-.5)*.4, h=.16+zufall()*.2; walze(fuss,.05,h,0xeee4d0,px,h/2,pz); ball(fuss,.13,i%2?0xc8603a:0xd8a060,px,h,pz,1,.55,1); } });
  verschmelze(fuss);

  /* Torbogen aus Keilsteinen, dahinter glatte Zwickel */
  const bogen=gruppe(hinten,0,0,0), BY=TH-1;
  for(let i=0;i<=10;i++){ const a=Math.PI*i/10, x=Math.cos(a)*1.66, y=Math.sin(a)*1.18, s=box(bogen,.5,.42,.34,i%2?0x9a9ca4:0x86888f,x,BY+y,-T/2+.08); s.rotation.z=Math.atan2(y*1.66*1.66,x*1.18*1.18)-Math.PI/2; }
  [-1,1].forEach(s=>{ for(let i=0;i<4;i++) box(bogen,.46,.48,.34,i%2?0x9a9ca4:0x86888f,s*1.66,.25+i*.5,-T/2+.08); k.kasten(s*1.66,-T/2+.08,.5,.5); });
  verschmelze(bogen);
  [-1,1].forEach(s=>{ const f=new THREE.Shape(); f.moveTo(s*TB/2,BY); f.lineTo(s*TB/2,TH); f.lineTo(0,TH);
    for(let i=10;i>=0;i--){ const a=Math.PI/2*(1-i/10); f.lineTo(s*Math.cos(Math.PI/2-a)*TB/2,BY+Math.sin(Math.PI/2-a)*(TH-BY)); }
    const z=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:.42,bevelEnabled:false}),mat(0x55565e,{side:THREE.DoubleSide})); z.position.z=-T/2-.44; hinten.add(z); });

  /* Gang hinter dem Tor */
  const gang=gruppe(sc,0,0,-T/2-.5);
  const gb=box(gang,TB+.4,.1,2.6,0x4a4448,0,-.05,-1.3); gb.castShadow=false;
  [-1,1].forEach(s=>mauer(gang,tex,.4,TH+.3,2.6,s*(TB/2+.2),(TH+.3)/2,-1.3));
  const ende=new THREE.Mesh(new THREE.PlaneGeometry(TB+.4,TH+.3),basis(0x3a2414)); ende.position.set(0,(TH+.3)/2,-2.6); gang.add(ende);
  for(let i=0;i<4;i++) box(gang,TB,.18,.4,0x6a5a50,0,.09+i*.16,-1.3-i*.35);
  schein(gang,'rgba(255,190,90,.8)',0,1.9,-2.4,3.6);

  /* Gittertor mit Zahlenschloss */
  const gitter=gruppe(sc,0,0,-T/2-.18);
  for(let i=0;i<8;i++){ const x=-TB/2+.18+i*(TB-.36)/7; walze(gitter,.06,TH,EISEN,x,TH/2,0); kegel(gitter,.1,.22,EISEN,x,.11,0).rotation.x=Math.PI; }
  [.55,1.6,2.65].forEach(y=>box(gitter,TB,.13,.12,0x4a4e57,0,y,0));
  const schloss=gruppe(gitter,0,1.55,.16);
  box(schloss,.72,.58,.22,0xd8a73a,0,0,0); ring(schloss,.24,.07,0x9aa3ad,0,.29,0,Math.PI);
  for(let i=0;i<3;i++) box(schloss,.15,.2,.04,0xfff3cf,-.2+i*.2,-.05,.12);
  const glanz=schein(schloss,'rgba(255,225,120,.9)',0,0,.2,2.2); glanz.visible=false;
  const treffer=new THREE.Mesh(GEO.box,basis(0,{visible:false})); treffer.scale.set(TB,TH,.5); treffer.position.set(0,TH/2,-T/2+.05); sc.add(treffer);
  const schild=textSprite('Gittertür'); schild.position.set(0,TH+.75,-T/2+.4); schild.visible=false; sc.add(schild);
  const tuer={ steh:[0,-T/2+1.35], durch:[0,-T/2-1.2], treffer, schild, bereit:false, offen:false };
  let auf=0;
  k.anim.push((t,dt)=>{ glanz.visible=tuer.bereit; if(tuer.bereit){ const a=1.8+Math.sin(t*5)*.5; glanz.scale.set(a,a,1); }
    /* Gitter fährt nach oben in die Mauer: unten bleibt es offen, oben ragt nichts heraus */
    auf+=((tuer.offen?.86:0)-auf)*Math.min(1,dt*2.5); gitter.position.y=TH*auf; gitter.scale.y=1-auf; schloss.visible=!tuer.offen; });

  fackel(hinten,k,-2.55,-T/2,0); fackel(hinten,k,2.55,-T/2,0);
  fackel(hinten,k,-10.5,-T/2,0); fackel(hinten,k,12,-T/2,0);
  [-4.5,7.5].forEach(z=>fackel(rechts,k,B/2,z,-Math.PI/2)); [-12,12].forEach(z=>fackel(links,k,-B/2,z,Math.PI/2));
  flacker(-2.5,3.5,-T/2+1.4,0xff9a3c,.8,13); flacker(2.5,3.5,-T/2+1.4,0xff9a3c,.8,13);

  /* Gitterfenster mit Mondlicht */
  [-9,-15,15].forEach(fx=>{
    const fenster=gruppe(hinten,fx,3.9,-T/2+.02);
    box(fenster,1.9,1.5,.08,0x6a6c75,0,0,0);
    const himmel=new THREE.Mesh(new THREE.PlaneGeometry(1.55,1.15),basis(0x2c4a86)); himmel.position.z=.06; fenster.add(himmel);
    const m1=new THREE.Mesh(new THREE.CircleGeometry(.2,24),basis(0xfff4c4)); m1.position.set(-.35,.18,.07); if(fx===-9) fenster.add(m1);
    [[.2,.35],[.5,-.1],[.05,-.3],[-.55,-.28],[.62,.3]].forEach(p=>{ const s=new THREE.Mesh(new THREE.CircleGeometry(.025,8),basis(0xffffff)); s.position.set(p[0],p[1],.072); fenster.add(s); });
    [-.45,0,.45].forEach(x=>walze(fenster,.04,1.25,EISEN,x,0,.12)); box(fenster,1.65,.07,.07,EISEN,0,0,.12);
    box(fenster,2.1,.16,.34,0x8a8c94,0,-.82,.1);
    const strahl=new THREE.Mesh(new THREE.CylinderGeometry(.6,1.7,5.6,16,1,true),basis(0xbcd6ff,{transparent:true,opacity:.035,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
    strahl.position.set(fx,2,-T/2+1.7); strahl.rotation.x=-.62; hinten.add(strahl);
  });

  /* Freistehende Säulen (werden durchsichtig, wenn sie die Figur verdecken) */
  [-6.5,6.5].forEach(x=>[-6.5,1,8].forEach(z=>{
    const g=gruppe(sc,x,0,z);
    box(g,1.6,.35,1.6,0x55565e,0,.17,0); walze(g,.72,.3,0x6c6e77,0,.5,0);
    rohr(g,.52,.6,4,0x84868f,0,2.6,0,14);
    [1.5,2.6,3.7].forEach(y=>{ const r=ring(g,.57-.02*y/2,.035,0x62646c,0,y,0); r.rotation.x=Math.PI/2; });
    walze(g,.72,.3,0x6c6e77,0,4.7,0); box(g,1.6,.35,1.6,0x55565e,0,5,0);
    for(let i=0;i<5;i++) ball(g,.12+zufall()*.1,i%2?0x4f7a3a:0x638f45,Math.cos(i*1.3)*.7,.38,Math.sin(i*1.3)*.7,1.2,.4,1);
    verschmelze(g); k.verdecker(g,x,z,.8); k.kasten(x,z,1.5,1.5);
  }));

  /* Drei offene Zellen an der linken Wand */
  const stab=(g,x,z)=>walze(g,.055,3,EISEN,x,1.5,z);
  [-5,4.5].forEach(z=>{ const g=gruppe(sc,0,0,0); for(let x=-17.7;x<=-12.9;x+=.55) stab(g,x,z); [.35,1.7,2.95].forEach(y=>box(g,5,.1,.1,0x4a4e57,-15.5,y,z));
    verschmelze(g); k.verdecker(g,-15.4,z,2.6); k.kasten(-15.5,z,5,.3); });
  [[-11.5,-8.9,-5],[-5,-3.4,-.2],[-5,2.9,4.5],[4.5,6,7.6],[4.5,11.4,13.3]].forEach(([_,a,b])=>{
    const g=gruppe(sc,0,0,0); for(let z=a;z<=b+.01;z+=(b-a)/Math.max(1,Math.round((b-a)/.55))) stab(g,-13,z);
    [.35,1.7,2.95].forEach(y=>box(g,.1,.1,b-a,0x4a4e57,-13,y,(a+b)/2)); walze(g,.12,3.2,0x30333a,-13,1.6,a); walze(g,.12,3.2,0x30333a,-13,1.6,b);
    verschmelze(g); k.verdecker(g,-13,(a+b)/2,(b-a)/2); k.kasten(-13,(a+b)/2,.3,b-a); });
  /* Holzpritschen in den Zellen */
  const pritschen=gruppe(sc,0,0,0);
  [[-16.6,2.9],[-16.6,12.2]].forEach(([x,z])=>{ box(pritschen,2.4,.14,1.1,HOLZ,x,.55,z); [-1,1].forEach(a=>[-1,1].forEach(b=>box(pritschen,.14,.55,.14,HOLZ2,x+a*1.05,.27,z+b*.42))); box(pritschen,.6,.2,.8,0x8a7a62,x-.8,.72,z); box(pritschen,1.3,.1,.9,0x6a5648,x+.35,.67,z); k.kasten(x,z,2.4,1.1); });
  verschmelze(pritschen);

  /* Brunnen mit Wasserrinne zur rechten Wand */
  const brunnen=gruppe(sc,11.5,0,1);
  for(let r=0;r<3;r++) for(let i=0;i<14;i++){ const a=(i+r*.5)/14*6.283, s=box(brunnen,.68,.34,.42,(i+r)%2?0x8d8f98:0x777984,Math.cos(a)*1.45,.17+r*.34,Math.sin(a)*1.45); s.rotation.y=-a+Math.PI/2; }
  const rand=ring(brunnen,1.45,.16,0xa2a4ac,0,1.08,0); rand.rotation.x=Math.PI/2;
  [-1,1].forEach(s=>box(brunnen,.2,2.9,.2,HOLZ2,s*1.55,1.45,0)); box(brunnen,3.5,.18,.2,HOLZ,0,2.95,0);
  [-1,1].forEach(s=>{ const d=box(brunnen,3.9,.12,1,0x8a3a2a,0,3.35,s*.42); d.rotation.x=s*.6; });
  const winde=walze(brunnen,.16,2.6,HOLZ,0,2.4,0); winde.rotation.z=Math.PI/2; strich(brunnen,[0,2.4,0],[0,1.5,0],.025,0xd8c090); ring(brunnen,.2,.04,EISEN,0,1.32,0);
  verschmelze(brunnen);
  const wasser=new THREE.Mesh(new THREE.CircleGeometry(1.28,32),basis(0x2f6aa0)); wasser.rotation.x=-Math.PI/2; wasser.position.set(0,.8,0); brunnen.add(wasser);
  k.kreis(11.5,1,1.75); k.verdecker(brunnen,11.5,1,1.6);
  const rinne=gruppe(sc,0,0,0);
  [-1,1].forEach(s=>{ box(rinne,.85,.22,.22,0x8d8f98,13.42,.11,1+s*.62); box(rinne,1.8,.22,.22,0x8d8f98,17.1,.11,1+s*.62); });
  box(rinne,2.3,.07,2.1,HOLZ,15,.045,1); for(let i=0;i<5;i++) box(rinne,2.3,.012,.04,HOLZ2,15,.086,.2+i*.4);
  [-1,1].forEach(s=>{ const x=15+s*1.15; box(rinne,.1,.1,2.2,HOLZ2,x,.7,1); [-1.05,0,1.05].forEach(z=>box(rinne,.12,.75,.12,HOLZ,x,.37,1+z)); k.kasten(x,1,.12,2.2); });
  verschmelze(rinne);
  const strom=new THREE.Mesh(new THREE.PlaneGeometry(5,1.02,20,1),basis(0x3f86c0,{transparent:true,opacity:.8,depthWrite:false})); strom.rotation.x=-Math.PI/2; strom.position.set(15.5,.05,1); sc.add(strom);
  const glitzer=[0,1,2,3,4].map(i=>box(sc,.35,.015,.05,basis(0xcfe8ff),13,.07,1+((i%3)-1)*.28));
  k.anim.push(t=>{ glitzer.forEach((g,i)=>{ g.position.x=13.2+((t*1.3+i*.97)%4.8); g.visible=Math.abs(g.position.x-15)>1.2; }); wasser.position.y=.8+Math.sin(t*1.7)*.02; });
  /* Rinne: nur über die Holzbrücke */
  k.kasten(13.45,1,.9,1.3); k.kasten(17.05,1,1.9,1.3);

  /* Feuerschalen */
  [[-3.2,-4],[3.4,5.2],[-10.8,11],[14.5,-4.2]].forEach(([x,z],i)=>{
    const g=gruppe(sc,x,0,z); [0,1,2].forEach(j=>{ const a=j*2.094; strich(g,[Math.cos(a)*.5,0,Math.sin(a)*.5],[Math.cos(a)*.2,1.05,Math.sin(a)*.2],.06,EISEN); });
    rohr(g,.55,.28,.38,EISEN,0,1.2,0,16); for(let j=0;j<7;j++) ball(g,.13,j%2?0x3a1a10:0xb83a14,Math.cos(j)*.26,1.38,Math.sin(j*1.7)*.26);
    verschmelze(g); k.kreis(x,z,.55);
    const fl=[[0,0,.6,0xff7a1a],[.14,.08,.42,0xffb030],[-.1,-.08,.34,0xffe066]].map(([a,b,h,f])=>{ const m=kegel(g,h*.32,h,basis(f),a,1.4+h/2,b); m.castShadow=false; return m; });
    const s=schein(g,'rgba(255,150,60,.65)',0,1.75,0,3);
    k.anim.push(t=>{ fl.forEach((m,j)=>{ m.scale.y=[.6,.42,.34][j]*(1+Math.sin(t*(9+j*3)+i+j)*.22); }); const a=3+Math.sin(t*8+i)*.25; s.scale.set(a,a,1); });
    flacker(x,2,z,0xff8a30,.6,10);
  });

  /* Eingestürzte Ecke, Holzstapel und Leiterwagen */
  const schutt=gruppe(sc,0,0,0);
  for(let i=0;i<46;i++){ const x=15.6+zufall()*2.1, z=-13+zufall()*2.4, h=(x-15.4)*.35+zufall()*.35; const s=box(schutt,.4+zufall()*.6,.3+zufall()*.35,.4+zufall()*.5,i%3?0x777984:0x8d8f98,x,.15+zufall()*h,z); s.rotation.set(zufall()*.5,zufall()*3,zufall()*.5); }
  strich(schutt,[14.8,.1,-13],[17.4,2.9,-12.2],.16,HOLZ2); strich(schutt,[15.4,.1,-11],[17.8,1.9,-13],.14,HOLZ);
  verschmelze(schutt); k.kasten(16.4,-11.8,3.4,3.4);
  const holz=gruppe(sc,16.6,0,12);
  [[0,5],[1,4],[2,3],[3,2]].forEach(([r,n])=>{ for(let i=0;i<n;i++){ const x=(i-(n-1)/2)*.5; const s=walze(holz,.24,1.7,(i+r)%2?HOLZ:0x9a6a38,x,.25+r*.43,0); s.rotation.x=Math.PI/2; [-1,1].forEach(v=>{ const e=walze(holz,.17,.03,0xd8b078,x,.25+r*.43,v*.86); e.rotation.x=Math.PI/2; }); } });
  verschmelze(holz); k.kasten(16.6,12,2.7,1.8);
  const wagen=gruppe(sc,10,0,10.8); wagen.rotation.y=.35;
  box(wagen,2.6,.16,1.35,HOLZ,0,.8,0); [-1,1].forEach(s=>{ box(wagen,2.6,.1,.1,HOLZ2,0,1.35,s*.66); for(let i=0;i<7;i++) box(wagen,.08,.55,.08,HOLZ,-1.2+i*.4,1.08,s*.66); [-.8,.8].forEach(x=>{ ring(wagen,.45,.08,HOLZ2,x,.53,s*.82); for(let j=0;j<4;j++) box(wagen,.88,.07,.06,HOLZ,x,.53,s*.82).rotation.z=j*Math.PI/4; ball(wagen,.1,EISEN,x,.53,s*.86); }); });
  strich(wagen,[1.3,.75,0],[2.4,.12,0],.07,HOLZ2); for(let i=0;i<22;i++){ const x=-1.05+(i%7)*.35, z=-.4+Math.floor(i/7)*.4, y=1.02+(i>13?.14:0)+(i%3)*.04; ball(wagen,.2,i%2?0xb0508a:0xe8e0d0,x,y,z,1,1.1,1); kegel(wagen,.09,.28,0x4f8a34,x+.06,y+.27,z); }
  verschmelze(wagen); k.kasten(10.3,10.7,4,2.6);

  /* Spinnennetze und eine Spinne am Faden */
  const netzBild=bild(256,256,g=>{ g.strokeStyle='rgba(235,240,255,.7)'; g.lineWidth=2;
      for(let i=0;i<=5;i++){ const a=i/5*Math.PI/2; g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(a)*250,Math.sin(a)*250); g.stroke(); }
      for(let r=45;r<250;r+=40){ g.beginPath(); for(let i=0;i<=5;i++){ const a=i/5*Math.PI/2, x1=Math.cos(a)*r, y1=Math.sin(a)*r; if(!i) g.moveTo(x1,y1); else g.quadraticCurveTo(Math.cos(a-.16)*r*.82,Math.sin(a-.16)*r*.82,x1,y1); } g.stroke(); } });
  const netz=(par,x,y,z,sx,rotY,gr)=>{ const m=new THREE.Mesh(new THREE.PlaneGeometry(gr,gr),new THREE.MeshBasicMaterial({map:netzBild,transparent:true,depthWrite:false,side:THREE.DoubleSide})); m.position.set(x,y,z); m.scale.x=sx; m.rotation.y=rotY||0; par.add(m); };
  netz(rechts,B/2-.03,H-1.1,-T/2+1.5,1,-Math.PI/2,2.2); netz(links,-B/2+.03,H-1.1,T/2-1.5,1,Math.PI/2,2.2); netz(hinten,-B/2+1.5,H-1.1,-T/2+.03,1,0,2.2); netz(rechts,B/2-.03,H-1,5.9,1,-Math.PI/2,1.7); netz(hinten,14.5,H-1,-T/2+.03,-1,0,1.6);
  const spinne=gruppe(hinten,6.4,4,-T/2+.5); ball(spinne,.18,0x2a2230,0,0,0); ball(spinne,.11,0x2a2230,0,-.18,.03); [-1,1].forEach(s=>{ ball(spinne,.03,0xffffff,s*.05,-.18,.13); for(let j=0;j<4;j++){ strich(spinne,[s*.1,.02-j*.04,0],[s*.34,.14-j*.1,0],.014,0x2a2230); strich(spinne,[s*.34,.14-j*.1,0],[s*.42,.02-j*.14,0],.012,0x2a2230); } });
  const faden=walze(hinten,.008,1,0xe8ecf8,6.4,5,-T/2+.5);
  k.anim.push(t=>{ const y=3.9+Math.sin(t*.6)*.9; spinne.position.y=y; faden.position.y=(y+H)/2; faden.scale.y=H-y; });

  /* Stroh auf dem Boden (viele Halme in einem Aufruf) */
  const nester=[[-16,-12,1.6],[-14.5,-7,1.3],[-15.5,.5,1.4],[-16,10,1.5],[-9,-9,1.2],[-4,6.5,1.5],[2,-7,1.1],[-1,1.5,1.2],[8.5,-3,1.1],[4,10,1.4],[10,10.5,2],[14,8,1.2],[-9.5,1,1],[0,11.5,1],[13,-8,1]];
  const halme=new THREE.InstancedMesh(GEO.box,mat(STROH),1500), o=new THREE.Object3D();
  for(let i=0;i<1500;i++){ const n=nester[i%nester.length], a=zufall()*6.28, r=Math.sqrt(zufall())*n[2]; o.position.set(Math.max(-17.7,Math.min(17.7,n[0]+Math.cos(a)*r)),.025+zufall()*.05,Math.max(-13.2,Math.min(13.2,n[1]+Math.sin(a)*r))); o.rotation.set(0,zufall()*3.14,(zufall()-.5)*.2); o.scale.set(.22+zufall()*.3,.018,.025); o.updateMatrix(); halme.setMatrixAt(i,o.matrix); }
  halme.receiveShadow=true; halme.frustumCulled=false; sc.add(halme);
  /* Abflüsse, Pfützen, Tropfen */
  const gullis=gruppe(sc,0,0,0);
  [[0,-2],[-9,7.5],[8,6]].forEach(([x,z])=>{ walze(gullis,.5,.012,0x403c46,x,.008,z); for(let i=-2;i<=2;i++) box(gullis,.07,.012,.9-Math.abs(i)*.18,0x8a8e96,x+i*.18,.018,z); });
  verschmelze(gullis);
  [[-2.5,-7],[9,-8.5],[-8.5,-1.5],[2.5,8.5]].forEach(([x,z],i)=>{
    const pf=new THREE.Mesh(new THREE.CircleGeometry(.8,28),basis(0x6f93c4,{transparent:true,opacity:.35,depthWrite:false})); pf.rotation.x=-Math.PI/2; pf.scale.y=.6; pf.position.set(x,.03,z); sc.add(pf);
    const tropf=ball(sc,.03,basis(0xbfe0ff,{transparent:true,opacity:.7}),x,4,z,1,1.8,1), welle=new THREE.Mesh(new THREE.RingGeometry(.9,1,28),basis(0xdcefff,{transparent:true,opacity:0,depthWrite:false})); welle.rotation.x=-Math.PI/2; welle.position.set(x,.045,z); sc.add(welle);
    k.anim.push(t=>{ const p=((t+i*.7)%2.4)/2.4; tropf.visible=p<.5; tropf.position.y=5-p*10; const w=Math.max(0,(p-.5)*2); welle.scale.setScalar(.05+w*.55); welle.material.opacity=p>.5?.7*(1-w):0; }); });
  /* Moos und kleine Steine entlang der Wände */
  const deko=gruppe(sc,0,0,0);
  [[-17.4,-3],[17.4,-8],[17.3,4.5],[-11,-13],[5,-13],[12,13],[-5,13],[17.4,-2.5],[-17.4,7]].forEach(p=>{ for(let i=0;i<7;i++) ball(deko,.14+zufall()*.18,i%2?0x4f7a3a:0x638f45,p[0]+(zufall()-.5)*.8,.02,p[1]+(zufall()-.5)*.6,1.4,.35,1); });
  for(let i=0;i<110;i++){ const seite=i%3, x=seite===0?-12+zufall()*29:(seite===1?17+zufall()*.8:-17.8+zufall()*35.5), z=seite===2?(i%2?13-zufall()*.6:-13.2+zufall()*.5):-13+zufall()*26; const s=ball(deko,.05+zufall()*.1,0x777984,x,.05,z,1,.7,1); s.rotation.y=zufall()*3; }
  verschmelze(deko);

  katze(k,[[0,-9.5],[1.4,-3.4],[-3.5,3],[-9.2,4.5],[-9.2,-2.5],[-1.8,-1],[-.8,-8]]);
  maeuschen(k,[[-4,12],[5,12.3],[6,10.5],[-3,10.2]],2.6,0); maeuschen(k,[[2,-11.5],[7,-11],[6.8,-9.2],[3,-10]],2.2,5); maeuschen(k,[[-11.5,6],[-11.8,-3],[-10.2,-2],[-10,5]],2.4,9);
  fledermaus(k,-9,-5,3.5,6.1,1.1,0); fledermaus(k,8,-7,3,6.2,-1.3,2); fledermaus(k,2,5,4.5,6.3,.8,4); fledermaus(k,-14,3,2,5.9,1.4,1);

  return { tuer, start:[0,9.5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-16.8,-12.75],[-17,-6],[-12,-12.4],[-14,12.4],[-17,6],[-8,-6.8],[8,-7],[7.9,2.2],[14.3,3.6],[16.8,-1.2],[12.6,12.6],[16.5,8.8],[13.8,-12],[5,-12],[-5,-12.2],[-11.5,12.5],[17,-7],[1.5,12.4],[-8.2,9.4],[10.5,-1.8]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-15.8, z:-10.9, steh:[-13.3,-10.5], kasten:[3.5,2.1], treffer:[2.7,.95,1.8], baue(g){ /* 1 Strohsack: Sackleinen mit Nähten, Flicken, Zipfel und Kissen */
      /* weiches Kissen: Kugel, zu den Ecken hin eckiger gezogen */
      const kissen=(w,h,d,c,x,y,z)=>{ const q=new THREE.SphereGeometry(1,28,18), p=q.attributes.position, e=(v,n)=>Math.sign(v)*Math.pow(Math.abs(v),n);
        for(let i=0;i<p.count;i++){ const a=e(p.getX(i),.55), b=p.getY(i), c2=e(p.getZ(i),.55); p.setXYZ(i,a*w/2,e(b,.8)*h/2*(1+.07*Math.sin(a*7)*Math.cos(c2*5)),c2*d/2); }
        q.computeVertexNormals(); const m=new THREE.Mesh(q,mat(c)); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; g.add(m); return m; };
      box(g,2.7,.14,1.75,HOLZ2,0,.07,0);
      kissen(2.5,.66,1.55,0xa98a58,0,.45,0); kissen(.75,.42,1.1,0xeee6d2,-.75,.8,0);
      for(let i=0;i<9;i++){ const x=-.22+i*.13; box(g,.025,.02,.18,0x4a3418,x,.8,.08).rotation.y=.6; box(g,.025,.02,.18,0x4a3418,x,.8,.08).rotation.y=-.6; }
      box(g,.4,.025,.34,0x7a4a28,.45,.775,-.3).rotation.y=.25;
      const zipfel=kegel(g,.26,.42,0xa98a58,1.38,.46,0); zipfel.rotation.z=Math.PI/2; const band=ring(g,.15,.05,0x8a2a1a,1.24,.46,0); band.rotation.y=Math.PI/2;
      for(let i=0;i<130;i++){ const vorn=i<60, x=vorn?-1.4+zufall()*2.8:1.38+zufall()*.35, z=vorn?.78+zufall()*.35:-.6+zufall()*1.2, y=vorn?.03+zufall()*.14:.18+zufall()*.4;
        const h=box(g,.36,.022,.026,i%2?STROH:0xeccd70,x,y,z); h.rotation.set((zufall()-.5)*.4,zufall()*3,(zufall()-.5)*.8); } } },
  { x:-16, z:8.4, steh:[-14.6,8.4], r:.75, treffer:[1.4,1.8,1.4], baue(g){ /* 2 Wasserkrug auf Steinsockel */
      box(g,1.15,.45,1.15,STEIN,0,.22,0); box(g,1.3,.1,1.3,0x9294a0,0,.49,0);
      const pk=[[0,0],[.3,0],[.46,.22],[.5,.45],[.36,.72],[.2,.86],[.2,1.02],[.3,1.1]].map(p=>new THREE.Vector2(p[0],p[1]));
      const k1=new THREE.Mesh(new THREE.LatheGeometry(pk,24),mat(0xb8643a,{side:THREE.DoubleSide})); k1.position.y=.54; k1.castShadow=true; g.add(k1);
      walze(g,.2,.03,0x6fb0e0,0,1.56,0); const h=ring(g,.27,.065,0xa8562e,.42,1.28,0,Math.PI*1.2); h.rotation.z=-Math.PI*.6; const b=ring(g,.49,.035,0xe8c88a,0,.98,0); b.rotation.x=Math.PI/2; } },
  { x:9.6, z:4.3, steh:[9.6,5.65], r:.7, treffer:[1.4,1.5,1.4], baue(g){ /* 3 Holzeimer */
      rohr(g,.62,.48,.95,HOLZ,0,.5,0,20,true); walze(g,.48,.05,HOLZ2,0,.05,0); walze(g,.55,.03,0x4a78a8,0,.8,0);
      for(let i=0;i<14;i++){ const a=i/14*6.283; strich(g,[Math.cos(a)*.485,.03,Math.sin(a)*.485],[Math.cos(a)*.625,.98,Math.sin(a)*.625],.014,HOLZ2); }
      [[.2,.52],[.78,.6]].forEach(p=>{ const r=ring(g,p[1],.035,EISEN,0,p[0],0); r.rotation.x=Math.PI/2; });
      const h=ring(g,.62,.035,0x8a8e96,0,.96,0,Math.PI); h.rotation.x=-.35; } },
  { x:11.2, z:-9.6, dreh:-.2, steh:[11,-7.9], kasten:[1.8,1.4], treffer:[1.9,1.6,1.4], baue(g){ /* 4 Loser Mauerstein: Mauerrest, ein Stein ist herausgezogen */
      const F=[0x9a4f3a,0xb06248]; [[-.5,.22,.98],[.5,.22,.98],[-.72,.66,.54],[.72,.66,.54],[-.5,1.1,.98],[.5,1.1,.98]].forEach((p,i)=>box(g,p[2],.42,.55,F[i%2],p[0],p[1],-.2));
      box(g,.9,.44,.1,0x0c0a0e,0,.66,-.28);
      const s=box(g,.82,.4,.6,0xc4c2b4,.55,.22,.52); s.rotation.set(0,.45,-.06);
      const z=box(g,.42,.46,.025,0xfff0c0,-.14,.6,.12); z.rotation.z=.25; [0,1,2].forEach(i=>{ box(g,.25,.028,.01,0x6a4a20,-.14+i*.028,.7-i*.11,.14).rotation.z=.25; });
      [[-.7,.45],[-.2,.55],[-.45,.72]].forEach(p=>ball(g,.11,0x9a4f3a,p[0],.07,p[1],1,.7,1)); } },
  { x:-17.15, z:-1.5, dreh:Math.PI/2, steh:[-15.8,-1.5], kasten:[.8,1.2], treffer:[1.3,2.6,.9], trefferY:.5, baue(g){ /* 5 Kette am Haken, an einem Steinpfeiler */
      box(g,1.15,.28,.75,0x55565e,0,.14,-.12); box(g,.9,3.1,.5,0x8a8c96,0,1.75,-.18); box(g,1.1,.24,.68,0x55565e,0,3.38,-.18);
      box(g,.72,.72,.1,0x4a4b53,0,2.8,.1); [[-.26,2.55],[.26,2.55],[-.26,3.05],[.26,3.05]].forEach(p=>ball(g,.05,0xb0b4bc,p[0],p[1],.17));
      ring(g,.2,.06,0x8a8e96,0,2.8,.24);
      for(let i=0;i<9;i++){ const r=ring(g,.13,.038,i%2?0xb4bac4:0x969ca6,Math.sin(i*.25)*.05,2.5-i*.19,.28); r.rotation.y=i%2?Math.PI/2.2:0; r.scale.y=1.3; }
      ring(g,.28,.07,0xd8b040,0,.72,.3); } },
  { wand:'hinten', x:8.5, z:-13.5, steh:[8.5,-12.1], treffer:[2,1.8,.7], trefferY:1.1, baue(g){ /* 6 Steintafel */
      box(g,1.8,1.35,.2,0xb4b2a6,0,1.8,.1); const b=walze(g,.9,.2,0xb4b2a6,0,2.46,.1); b.rotation.x=Math.PI/2; b.scale.set(.9,.2,.42);
      const t=bild(256,200,c=>{ c.fillStyle='#b4b2a6'; c.fillRect(0,0,256,200); c.strokeStyle='#4a4840'; c.lineWidth=5; c.strokeRect(10,10,236,180);
        for(let r=0;r<5;r++){ let x=28; while(x<220){ const w=14+((r*31+x)%26); c.beginPath(); c.moveTo(x,40+r*31); c.lineTo(x+w*.4,30+r*31); c.lineTo(x+w*.6,44+r*31); c.lineTo(x+w,36+r*31); c.stroke(); x+=w+12; } } });
      const p=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.2),new THREE.MeshLambertMaterial({map:t})); p.position.set(0,1.8,.205); g.add(p); box(g,2.05,.14,.34,0x6a6c75,0,1.05,.16); } },
  { x:3.4, z:-2.5, steh:[2.2,-2.5], r:.5, treffer:[2.1,2,2.1], baue(g){ /* 7 Holzschemel */
      g.scale.set(.74,.68,.74);
      walze(g,.6,.17,0xa06a34,0,.82,0); const r=ring(g,.58,.04,HOLZ2,0,.9,0); r.rotation.x=Math.PI/2; walze(g,.32,.02,0xb47c42,0,.915,0);
      for(let i=0;i<3;i++){ const a=i*2.094+.5; strich(g,[Math.cos(a)*.34,.78,Math.sin(a)*.34],[Math.cos(a)*.55,0,Math.sin(a)*.55],.08,HOLZ2); }
      const s=ring(g,.4,.035,HOLZ,0,.36,0); s.rotation.x=Math.PI/2; } },
  { x:-9, z:11, steh:[-9,9.5], kasten:[1.9,1.15], treffer:[2,1.4,1.3], baue(g){ /* 8 Alte Holzkiste */
      box(g,1.8,.85,1.05,HOLZ,0,.45,0); const d=walze(g,.53,1.8,HOLZ,0,.87,0); d.rotation.z=Math.PI/2; d.scale.set(.5,1.8,.53);
      [-.65,0,.65].forEach(x=>{ box(g,.12,.87,1.09,EISEN,x,.45,0); const r=walze(g,.545,.12,EISEN,x,.87,0); r.rotation.z=Math.PI/2; r.scale.set(.515,.12,.545); });
      [.22,.5,.74].forEach(y=>{ box(g,1.82,.025,1.065,HOLZ2,0,y,0); });
      [1,-1].forEach(s=>{ box(g,.3,.34,.08,0xd8a73a,0,.74,s*.56); ball(g,.05,0x2a1a08,0,.72,s*.61); }); } },
  { x:15.8, z:6, dreh:-.55, steh:[14.4,7.15], kasten:[1.5,1.2], treffer:[1.8,1.5,1.1], baue(g){ /* 9 Mäuseloch in einem Mauerrest */
      [[-.5,.24,.74],[.28,.24,.76],[-.2,.72,.82],[.46,.68,.46],[-.25,1.14,.6]].forEach((p,i)=>box(g,p[2],.45,.42,i%2?0x777984:0x84868f,p[0],p[1],-.22));
      for(let i=0;i<=6;i++){ const a=Math.PI*i/6; const s=box(g,.34,.3,.2,i%2?0xb0b2bc:0x969aa4,Math.cos(a)*.56,.22+Math.sin(a)*.56,.07); s.rotation.z=a-Math.PI/2; }
      const l=new THREE.Mesh(new THREE.CircleGeometry(.44,24,0,Math.PI),basis(0x050305)); l.position.set(0,.22,.03); g.add(l); const u=new THREE.Mesh(new THREE.PlaneGeometry(.88,.24),basis(0x050305)); u.position.set(0,.11,.03); g.add(u);
      ball(g,.2,0xb0a8a0,.05,.24,.12,1,.95,.8); [-1,1].forEach(s=>{ ball(g,.1,0xe8a8a8,.05+s*.17,.43,.14,1,1,.35); ball(g,.03,0x14100e,.05+s*.075,.29,.28); }); ball(g,.035,0xe8808a,.05,.2,.3);
      [-1,1].forEach(s=>{ strich(g,[.05,.2,.29],[.05+s*.34,.25,.3],.006,0xf0f0f0); strich(g,[.05,.18,.29],[.05+s*.33,.14,.3],.006,0xf0f0f0); });
      const f=new THREE.Shape(); f.moveTo(0,0); f.lineTo(.5,0); f.lineTo(.5,.32); f.lineTo(0,0);
      const kk=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:.28,bevelEnabled:false}),mat(0xf4c430)); kk.position.set(-.92,0,.34); kk.castShadow=true; g.add(kk);
      [[-.55,.1,.06],[-.7,.07,.035],[-.5,.22,.035]].forEach(p=>ball(g,p[2],0xb8860b,p[0],p[1],.62,1,1,.3)); } },
  { x:-7.4, z:-13.02, steh:[-7.65,-11.9], r:.5, treffer:[1.1,2.5,.9], baue(g){ /* 10 Reisigbesen, an die Wand gelehnt */
      strich(g,[.1,.75,.3],[-.14,2.5,-.43],.065,HOLZ); const b=walze(g,.16,.18,0x8a2a1a,.1,.75,.3); b.rotation.x=-.3;
      for(let i=0;i<46;i++){ const a=zufall()*6.28, r=zufall()*.36; strich(g,[.1+Math.cos(a)*.07,.74,.3+Math.sin(a)*.07],[.13+Math.cos(a)*r,.03,.36+Math.sin(a)*r*.8],.016,i%3?0x9a7436:0xc29a50); }
      const r2=ring(g,.17,.03,STROH,.11,.6,.31); r2.rotation.x=Math.PI/2; } }
];

return { titel:'Das Verlies', breite:36, tiefe:27, baue, gegenstaende, verstecke };
})();

/* Raum 2: Die Burgküche. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 (Backofen) und 10 (Eierkorb) sind neu. */
RAEUME3D.burg[1] = (function(){
const { HOLZ, HOLZ2, EISEN, STEIN, STROH, mauer, fackel, laeufer, katze, maeuschen, huelle, flacker, ausgang } = BURG;

const B=36, T=27, H=6;
const KUPFER=0xcf7a38, KUPFER2=0xa9562a, ZIEGEL=0xa8503a, ZIEGEL2=0xbe6446, PUTZ=0xd9c3a0, HELLHOLZ=0xc28c50, CREME=0xf1e6cc, GRUEN=0x5c8f34;
const KX=1;                       /* Mitte des großen Kamins */
const TX=-8, TB=3.2, TH=3.6;      /* Durchgang hinter dem Vorhang: Mitte, Breite, Höhe */

/* ---------- gemalte Flächen ---------- */
/* warmes Ziegelmauerwerk (512 Bildpunkte = 4,4 Einheiten) */
function ziegelBild(){
  return bild(512,512,g=>{ g.fillStyle='#d8c4a2'; g.fillRect(0,0,512,512);
    const F=['#c98458','#bd7650','#d29264','#b46c49','#c88c60','#d9a272'];
    for(let r=0;r<12;r++){ const y=r*512/12, h=512/12;
      for(let i=-1;i<5;i++){ const x=i*128+(r%2)*64, n=(r*5+((i+4)%4)*3)%F.length;
        const mal=xx=>{ g.fillStyle=F[n]; g.fillRect(xx+3,y+3,122,h-5); g.fillStyle='rgba(255,240,210,.16)'; g.fillRect(xx+3,y+3,122,5); g.fillStyle='rgba(80,30,10,.18)'; g.fillRect(xx+3,y+h-8,122,6);
          for(let j=0;j<14;j++){ g.fillStyle=j%2?'rgba(90,40,20,.18)':'rgba(255,230,200,.13)'; g.fillRect(xx+8+((j*47+n*13)%108),y+8+((j*17)%(h-18)),5,3); } };
        mal(x); if(x+128>512) mal(x-512); } } });
}
/* Terrakottafliesen mit kleinen Rauten an den Ecken (1024 x 768 = 14 x 10,5 Einheiten) */
function fliesenBild(){
  return bild(1024,768,g=>{ g.fillStyle='#5a3626'; g.fillRect(0,0,1024,768);
    const F=['#b86a42','#a95e3a','#c4784c','#b2653e','#9f5636'];
    for(let r=0;r<6;r++) for(let i=0;i<8;i++){ const x=i*128, y=r*128; g.fillStyle=F[(r*3+i*2+(r*i)%3)%F.length]; g.fillRect(x+3,y+3,122,122);
      g.fillStyle='rgba(255,220,180,.10)'; g.fillRect(x+3,y+3,122,6); g.fillStyle='rgba(50,15,0,.14)'; g.fillRect(x+3,y+119,122,6);
      for(let j=0;j<18;j++){ g.fillStyle=j%2?'rgba(60,20,5,.16)':'rgba(255,225,190,.11)'; g.fillRect(x+10+(j*37+i*11)%102,y+10+(j*29+r*17)%102,5,4); } }
    for(let r=0;r<=6;r++) for(let i=0;i<=8;i++){ if((i+r)%2) continue; const x=i*128, y=r*128; g.fillStyle='#e2b878'; g.beginPath(); g.moveTo(x,y-20); g.lineTo(x+20,y); g.lineTo(x,y+20); g.lineTo(x-20,y); g.closePath(); g.fill(); } });
}
/* Blick in den Gemüsegarten */
function gartenBild(){
  return bild(256,192,g=>{ g.fillStyle='#9fd4f0'; g.fillRect(0,0,256,192);
    g.fillStyle='#ffe678'; g.beginPath(); g.arc(205,36,20,0,7); g.fill();
    g.fillStyle='#ffffff'; [[52,36,18],[72,30,22],[94,38,16]].forEach(p=>{ g.beginPath(); g.arc(p[0],p[1],p[2],0,7); g.fill(); });
    g.fillStyle='#7cb558'; g.beginPath(); g.moveTo(0,100); g.quadraticCurveTo(70,58,140,96); g.quadraticCurveTo(200,70,256,92); g.lineTo(256,192); g.lineTo(0,192); g.fill();
    g.fillStyle='#8a5a34'; [112,140,170].forEach(y=>g.fillRect(0,y,256,15));
    for(let i=0;i<10;i++){ const x=14+i*26; g.fillStyle='#4f8a2c'; g.beginPath(); g.arc(x,112,10,0,7); g.fill();
      g.fillStyle='#e8782a'; g.fillRect(x-3,140,6,10); g.fillStyle='#4f9a30'; g.fillRect(x-6,130,12,10);
      g.fillStyle=i%2?'#d8403a':'#8ac04a'; g.beginPath(); g.arc(x,171,8,0,7); g.fill(); }
    g.fillStyle='#a87844'; for(let x=4;x<256;x+=22) g.fillRect(x,84,6,22); g.fillRect(0,91,256,4); });
}

/* Deko-Farben auf eine kleine Farbkarte legen: weniger Farben je Gruppe = weniger Zeichenaufrufe */
const FARBKARTE=[HOLZ,HOLZ2,HELLHOLZ,EISEN,0x8a8e98,0x9c8c7c,0x7a6a5c,0xb4a490,PUTZ,CREME,0xf8f4ea,KUPFER,KUPFER2,0xe89a54,0xd8a73a,ZIEGEL,0xc0453a,GRUEN,0x3f6a5a,0x5a7aa8,0xe8821e,0xf2c230,STROH,0xecd29a,0x2a140a,0x4a2414,0x9a6438,0x8a4660,0x5a2a6a,0x8cc44a];
function angleichen(g){
  const rgb=c=>[c>>16&255,c>>8&255,c&255], K=FARBKARTE.map(rgb);
  g.traverse(m=>{ if(!m.isMesh || m.isInstancedMesh || m.material.map || m.material.transparent || !m.material.visible || m.material.side===THREE.DoubleSide || !m.material.color) return;
    const c=m.material.color, a=rgb(c.getHex?c.getHex():c); let best=0, d=1e9;
    K.forEach((q,i)=>{ const e=(q[0]-a[0])**2+(q[1]-a[1])**2+(q[2]-a[2])**2; if(e<d){ d=e; best=i; } });
    m.material=mat(FARBKARTE[best]); });
}

/* Schatten werfen nur Teile in den genannten Farben (weniger Zeichenaufrufe); ohne Farben: gar keine */
function schattenNur(g,...farben){ g.traverse(m=>{ if(!m.isMesh || !m.material.color) return; const c=m.material.color; m.castShadow=farben.indexOf(c.getHex?c.getHex():c)>=0; }); }
/* verstreutes Mehl: weicher, unregelmäßiger, halb durchsichtiger Fleck mit Körnchen */
function mehlfleck(p,x,y,z,b,t,dreh){
  const bildchen=bild(256,256,g=>{
    const tupf=(px,py,r,a)=>{ const v=g.createRadialGradient(px,py,0,px,py,r); v.addColorStop(0,'rgba(244,232,204,'+a+')'); v.addColorStop(1,'rgba(244,232,204,0)'); g.fillStyle=v; g.fillRect(px-r,py-r,r*2,r*2); };
    for(let i=0;i<26;i++){ const a=zufall()*6.28, d=zufall()*72; tupf(128+Math.cos(a)*d,128+Math.sin(a)*d*.8,16+zufall()*34,.28); }
    for(let i=0;i<230;i++){ const a=zufall()*6.28, d=Math.sqrt(zufall())*118; g.fillStyle='rgba(248,238,214,'+(.3+zufall()*.45)+')'; g.fillRect(128+Math.cos(a)*d,128+Math.sin(a)*d*.85,2+zufall()*3,2+zufall()*2); } });
  const m=new THREE.Mesh(new THREE.PlaneGeometry(b,t),new THREE.MeshLambertMaterial({map:bildchen,transparent:true,depthWrite:false}));
  m.rotation.x=-Math.PI/2; m.rotation.z=dreh||0; m.position.set(x,y,z); m.receiveShadow=true; p.add(m); return m;
}
/* lockerer Mehlhaufen: flache, unebene Kuppe */
function mehlhaufen(p,x,z,bx,h,bz){
  const q=new THREE.SphereGeometry(1,20,10,0,Math.PI*2,0,Math.PI/2), a=q.attributes.position;
  for(let i=0;i<a.count;i++){ const px=a.getX(i), py=a.getY(i), pz=a.getZ(i), w=Math.atan2(pz,px), f=1+.16*Math.sin(w*3+1)+.09*Math.sin(w*7); a.setXYZ(i,px*f,Math.pow(Math.max(0,py),1.5)*(1+.08*Math.sin(px*9+pz*7)),pz*f); }
  q.computeVertexNormals(); const m=new THREE.Mesh(q,mat(0xf1e6cc)); m.position.set(x,0,z); m.scale.set(bx,h,bz); m.castShadow=false; m.receiveShadow=true; p.add(m); return m;
}

/* ---------- kleine Dinge ---------- */
const liegend=(t,achse)=>{ t.rotation[achse||'z']=Math.PI/2; return t; };
const reif=(p,r,d,c,x,y,z)=>{ const t=ring(p,r,d,c,x,y,z); t.rotation.x=Math.PI/2; return t; };
function drehkoerper(p,punkte,c,x,y,z){ const m=new THREE.Mesh(new THREE.LatheGeometry(punkte.map(q=>new THREE.Vector2(q[0],q[1])),26),mat(c,{side:THREE.DoubleSide})); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; p.add(m); return m; }
function kuerbis(p,x,y,z,r,c){
  for(let i=0;i<6;i++){ const a=i/6*Math.PI; const s=ball(p,r,i%2?(c||0xe8821e):0xd96f14,x,y,z,1,.76,.58); s.rotation.y=a; }
  walze(p,r*.12,r*.42,0x5a7a2a,x,y+r*.86,z).rotation.z=.3; ball(p,r*.2,GRUEN,x+r*.22,y+r*.76,z,1.5,.25,1);
}
/* Pfanne, an der Wand hängend (Boden zeigt nach vorn, Stiel nach oben) */
function pfanne(p,x,y,z,r,c){
  liegend(walze(p,r,.09,c||KUPFER,x,y,z),'x'); liegend(walze(p,r*.68,.02,c===EISEN?0x565a66:KUPFER2,x,y,z+.055),'x'); ring(p,r,.028,c===EISEN?0x565a66:0xe89a54,x,y,z+.045);
  box(p,.07,r*1.5,.05,EISEN,x,y+r*1.6,z); ring(p,.07,.018,EISEN,x,y+r*2.42,z);
}
/* großer Holzlöffel, Kelle oder Schaumlöffel an der Wand */
function loeffel(p,x,y,z,art){ const c=art===2?KUPFER:HELLHOLZ; box(p,.07,.72,.05,c,x,y,z); ball(p,.14,c,x,y-.45,z,1,art?1:1.35,.4); ball(p,.04,EISEN,x,y+.4,z); }
/* geflochtener Zopf mit Zwiebeln oder Knoblauch, y = Aufhängung */
function zopf(p,x,y,z,knoblauch){
  strich(p,[x,y,z],[x,y-1.5,z],.03,STROH); ball(p,.05,EISEN,x,y+.03,z);
  for(let i=0;i<9;i++){ const s=i%2?1:-1, yy=y-.28-i*.15, px=x+s*(.1+(i%3)*.02);
    if(knoblauch){ ball(p,.13,i%3?0xf4eede:0xe4d8e0,px,yy,z+.08); kegel(p,.045,.13,0xd8ccb0,px,yy+.15,z+.08); }
    else{ ball(p,.15,i%3?0xc8782e:0x9a4660,px,yy,z+.08,1,.9,1); kegel(p,.04,.14,0xd8b060,px,yy+.16,z+.08); } }
  kegel(p,.12,.28,STROH,x,y-1.68,z+.03).rotation.x=Math.PI;
}
/* Schnur mit Apfelringen oder Pilzen zum Trocknen */
function schnur(p,x1,x2,y,z,pilze){
  const mx=(x1+x2)/2; strich(p,[x1,y,z],[mx,y-.25,z],.012,0xd8c090); strich(p,[mx,y-.25,z],[x2,y,z],.012,0xd8c090);
  for(let i=1;i<10;i++){ const f=i/10, x=x1+(x2-x1)*f, yy=y-.25*(1-Math.abs(f*2-1))-.1;
    if(pilze){ walze(p,.035,.14,CREME,x,yy-.04,z); ball(p,.1,0x9a6438,x,yy+.04,z,1,.55,1); } else ring(p,.09,.04,i%2?0xf0d890:0xe8c470,x,yy-.03,z); }
}

function baue(k){
  const hu=huelle(k,{ B, T, H, himmel:0xfff0d4, grund:0x6e4a34, staerke:.74, sonne:0xffe4bc, sonneStaerke:.42, wandBild:ziegelBild(), bodenBild:fliesenBild(), leiste:0x6e4426, oeffnung:{x:TX,b:TB,h:TH} });
  const sc=hu.sc, hinten=hu.hinten, links=hu.links, rechts=hu.rechts;
  sc.background=new THREE.Color(0x1c0f08);
  const wh=gruppe(hinten,0,0,0), wl=gruppe(links,0,0,0), wr=gruppe(rechts,0,0,0);
  /* Platz an einer Wand: x läuft an der Wand entlang, z zeigt in den Raum */
  const anLinks=z=>{ const g=gruppe(wl,-B/2+.02,0,z); g.rotation.y=Math.PI/2; return g; };
  const anRechts=z=>{ const g=gruppe(wr,B/2-.02,0,z); g.rotation.y=-Math.PI/2; return g; };
  /* alle festen Möbel ohne eigene Bewegung: am Ende gemeinsam verschmolzen (wenige Zeichenaufrufe) */
  const fest=gruppe(sc,0,0,0);

  /* ---------- Balkenwerk an den Wänden ---------- */
  [-17.75,-10.35,12.9,17.75].forEach(x=>{ box(wh,.45,H,.24,HOLZ2,x,H/2,-T/2+.12); box(wh,.75,.25,.4,HOLZ,x,H-.15,-T/2+.18); });
  box(wh,7.4,.26,.2,HOLZ2,-14.05,5.55,-T/2+.1); box(wh,2.5,.26,.2,HOLZ2,-5,5.55,-T/2+.1); box(wh,12.1,.26,.2,HOLZ2,11.8,5.55,-T/2+.1);
  [-1,1].forEach(s=>{ const w=s<0?wl:wr; box(w,.2,.26,T,HOLZ2,s*(B/2-.1),5.55,0); [-10.4,-5.8,.2,5.6,11.4].forEach(z=>{ box(w,.24,H,.42,HOLZ2,s*(B/2-.12),H/2,z); box(w,.4,.25,.72,HOLZ,s*(B/2-.18),H-.15,z); }); });

  /* ---------- Durchgang hinter dem Vorhang ---------- */
  [-1,1].forEach(s=>{ box(wh,.36,TH+.1,.36,HOLZ,TX+s*(TB/2+.14),(TH+.1)/2,-T/2+.05); box(wh,.5,.3,.46,STEIN,TX+s*(TB/2+.14),.15,-T/2+.05); k.kasten(TX+s*(TB/2+.14),-T/2+.05,.5,.46); });
  box(wh,TB+1,.38,.45,HOLZ,TX,TH+.2,-T/2+.08); box(wh,TB+1.2,.12,.52,HOLZ2,TX,TH+.45,-T/2+.08);
  const gang=gruppe(sc,TX,0,-T/2-.5);
  box(gang,TB+.4,.1,2.6,0x7a4a32,0,-.05,-1.3).castShadow=false;
  const gangTex=ziegelBild(); [-1,1].forEach(s=>mauer(gang,gangTex,.4,TH+.3,2.6,s*(TB/2+.2),(TH+.3)/2,-1.3));
  const ende=new THREE.Mesh(new THREE.PlaneGeometry(TB+.4,TH+.3),basis(0xffe4ae)); ende.position.set(0,(TH+.3)/2,-2.6); gang.add(ende);
  const gangholz=gruppe(gang,0,0,0);
  /* Treppe, die ins Helle hinaufführt */
  for(let i=0;i<6;i++){ const h=.17*(i+1), z=-1.12-i*.26; box(gangholz,TB,h,.26,i%2?0x9c8c7c:0x7a6a5c,0,h/2,z); box(gangholz,TB,.035,.07,0xb4a490,0,h+.01,z+.11); }
  box(gangholz,TB+.3,.2,.2,HOLZ,0,TH,-.9); box(gangholz,TB+.3,.2,.2,HOLZ,0,TH,-1.9);
  angleichen(gangholz); verschmelze(gangholz); schattenNur(gang);
  schein(gang,'rgba(255,225,150,.75)',0,2.2,-2.35,3.8);

  /* Roter Vorhang an einer Stange, zwei Bahnen schieben sich zur Seite */
  walze(wh,.07,TB+.5,0xd8a73a,TX,TH-.06,-T/2+.34).rotation.z=Math.PI/2; [-1,1].forEach(s=>ball(wh,.14,0xd8a73a,TX+s*(TB/2+.28),TH-.06,-T/2+.34));
  const bahnen=[-1,1].map(s=>{ const g=gruppe(sc,TX+s*TB/2,0,-T/2+.34), n=8, w=TB/2/n;
    for(let i=0;i<n;i++){ const x=-s*(i+.5)*w; const f=walze(g,w*.62,TH-.2,i%2?0xc43a34:0x9e2424,x,(TH-.2)/2+.04,i%2?.04:-.02); f.scale.z=.12;
      box(g,w*1.04,.14,.2,0xe8c45a,x,.24,i%2?.05:0); ring(g,.09,.022,0xe8c45a,x,TH-.1,0).rotation.y=Math.PI/2; }
    box(g,TB/2,.05,.2,0xe8c45a,-s*TB/4,.42,.02);
    verschmelze(g); schattenNur(g); g.traverse(m=>{ if(m.isMesh && m.material===mat(0x9e2424)) m.castShadow=true; }); return {g,s}; });
  const schloss=gruppe(sc,TX,2.55,-T/2+.62);
  box(schloss,.76,.6,.22,0xd8a73a,0,0,0); ring(schloss,.25,.07,0xaab2bc,0,.3,0,Math.PI);
  for(let i=0;i<3;i++) box(schloss,.16,.22,.04,0xfff3cf,-.22+i*.22,-.04,.12);
  [-1,1].forEach(s=>strich(schloss,[s*.38,0,-.05],[s*.8,.12,-.2],.035,0xaab2bc));
  verschmelze(schloss); schattenNur(schloss);
  const tuer=ausgang(k,{ steh:[TX,-T/2+1.35], durch:[TX,-T/2-1.2], treffer:{x:TX,y:TH/2,z:-T/2+.35,b:TB,h:TH,t:.7}, name:'Vorhang', schildOben:[TX,TH+.85,-T/2+.5], glanz:[TX,2.55,-T/2+.85],
    bewege:(auf,t)=>{ bahnen.forEach(b=>{ b.g.scale.x=1-.8*auf; b.g.position.z=-T/2+.34+Math.sin(t*1.3+b.s)*.012; }); schloss.visible=auf<.04; } });

  /* ---------- Feuer ---------- */
  const flamm=[basis(0xff6a14),basis(0xffa326),basis(0xffe066)];
  function feuer(x,y,z,gr){
    const g=gruppe(sc,x,y,z);
    const holz=gruppe(g,0,0,0); [-.5,.2,.75].forEach((a,i)=>{ const s=walze(holz,.11*gr,1.1*gr,i%2?0x4a2814:0x62381c,0,.1*gr+i*.03,0); s.rotation.set(0,a*2,Math.PI/2); }); verschmelze(holz); schattenNur(holz);
    const fl=[[0,0,.95,0],[-.3,.05,.65,1],[.32,-.04,.72,1],[-.08,.16,.5,2],[.14,.14,.4,2]].map(([a,b,h,f])=>{ const m=kegel(g,h*.27*gr,h*gr,flamm[f],a*gr,.12+h*gr/2,b*gr); m.castShadow=false; return {m,h:h*gr}; });
    const s=schein(g,'rgba(255,140,50,.6)',0,.5*gr,.2,2.6*gr);
    k.anim.push(t=>{ fl.forEach((f,j)=>{ const a=1+Math.sin(t*(8+j*2.3)+x+j)*.22; f.m.scale.y=f.h*a; f.m.position.y=.12+f.h*a/2; }); const a=2.6*gr*(1+Math.sin(t*9+x)*.07); s.scale.set(a,a,1); });
  }
  function dampf(x,y,z,n,gr,hoch){
    const D=[]; for(let i=0;i<n;i++) D.push(schein(sc,'rgba(235,235,235,.4)',x,y,z,gr));
    k.anim.push(t=>{ D.forEach((s,i)=>{ const p=(t*.35+i/n)%1; s.position.set(x+Math.sin(t*1.4+i*2.1)*.22*p,y+p*hoch,z); const a=gr*(.5+p); s.scale.set(a,a,1); s.material.opacity=Math.sin(p*Math.PI)*.85; }); });
  }

  /* ---------- Großer Kamin ---------- */
  const kam=gruppe(wh,KX,0,-T/2);
  box(kam,7.6,3.2,.12,0x2a140a,0,1.6,.07);
  for(let i=0;i<30;i++) box(kam,.5,.2,.04,i%2?0x4a2414:0x3a1c10,-3.3+(i%10)*.72+(Math.floor(i/10)%2)*.3,.5+Math.floor(i/10)*.55,.15);
  [-1,1].forEach(s=>{ for(let i=0;i<7;i++) box(kam,i%2?.86:.96,.44,i%2?1.84:1.94,i%2?0x9c8c7c:0xb4a490,s*4.2,.22+i*.455,.96); box(kam,1.15,.3,2.1,0x7a6a5c,s*4.2,.15,1); });
  box(kam,9.8,.42,2.15,HOLZ,0,3.38,1.05); box(kam,10,.14,2.3,HOLZ2,0,3.65,1.1);
  const haube=new THREE.Shape(); haube.moveTo(-4.4,0); haube.lineTo(4.4,0); haube.lineTo(2.5,2.4); haube.lineTo(-2.5,2.4); haube.lineTo(-4.4,0);
  const hm=new THREE.Mesh(new THREE.ExtrudeGeometry(haube,{depth:1.2,bevelEnabled:false}),mat(PUTZ)); hm.position.set(0,3.7,0); hm.castShadow=hm.receiveShadow=true; kam.add(hm);
  box(kam,7.1,.14,.08,ZIEGEL,0,4.45,1.22); box(kam,5.7,.14,.08,ZIEGEL,0,5.3,1.22);
  [-2,0,2].forEach((x,i)=>pfanne(kam,x,4.65+(i===1?.12:0),1.28,i===1?.42:.32));
  /* Teller und Kupferschalen auf dem Sims */
  [-3.9,-3,3,3.9].forEach((x,i)=>{ const t=gruppe(kam,x,4.07,1.5), rand=i%2?0x5a7aa8:0xc0453a; t.rotation.x=-.2;
    [[.34,0xf8f4ea,0],[.29,rand,.014],[.24,0xf8f4ea,.026],[.08,rand,.036]].forEach(([r,f,z])=>liegend(walze(t,r,.025,f,0,0,z),'x')); });
  /* Stange mit Kellen unter dem Sims */
  walze(kam,.04,2.8,EISEN,2.1,3.12,2.12).rotation.z=Math.PI/2; for(let i=0;i<5;i++) loeffel(kam,.95+i*.58,2.72,2.14,i%3);
  box(kam,9.4,.08,3,0x8a7a6a,0,.04,1.55); for(let i=0;i<8;i++) box(kam,1.1,.03,2.9,i%2?0x9a8a78:0x7e6e60,-4.05+i*1.157,.09,1.55);
  k.kasten(KX,-T/2+1.1,9.5,2.2);
  feuer(KX-2.4,.1,-T/2+.95,1.25);

  /* Bratenspieß mit Kürbis: dreht sich über dem Feuer */
  const SX=KX+1.9, SZ=-T/2+1.5;
  feuer(SX,.1,SZ-.1,.95);
  const bock=gruppe(fest,SX,0,SZ); [-1,1].forEach(s=>{ walze(bock,.07,1.55,EISEN,s*1.35,.77,0); [-1,1].forEach(a=>strich(bock,[s*1.35,1.5,0],[s*1.35+a*.18,1.82,0],.045,EISEN)); box(bock,.18,.1,.8,EISEN,s*1.35,.14,0); }); 
  const spiess=gruppe(sc,SX,1.6,SZ);
  liegend(walze(spiess,.045,3.15,0x8a8e98,0,0,0)); kuerbis(spiess,-.35,0,0,.48); kuerbis(spiess,.55,0,0,.3,0xf0a028);
  strich(spiess,[1.58,0,0],[1.58,.34,0],.04,EISEN); liegend(walze(spiess,.06,.28,HOLZ,1.72,.34,0));
  verschmelze(spiess); schattenNur(spiess,0xe8821e); k.anim.push(t=>{ spiess.rotation.x=t*.9; });

  /* ---------- Holzstapel neben dem Kamin ---------- */
  const stapel=gruppe(fest,7.35,0,-12.7);
  [[0,4],[1,3],[2,4],[3,3],[4,2]].forEach(([r,n])=>{ for(let i=0;i<n;i++){ const x=(i-(n-1)/2)*.46; liegend(walze(stapel,.22,1.2,(i+r)%2?HOLZ:0x9a6a38,x,.23+r*.39,0),'x'); liegend(walze(stapel,.15,.03,0xe0b880,x,.23+r*.39,.61),'x'); ring(stapel,.08,.012,HOLZ,x,.23+r*.39,.63); } });
  [-1,1].forEach(s=>box(stapel,.12,1.5,.14,HOLZ2,s*.96,.75,.45));
  k.kasten(7.35,-12.7,2.05,1.35);

  /* ---------- Gartenfenster ---------- */
  const garten=new THREE.MeshBasicMaterial({map:gartenBild()});
  function fenster(g,y,w){
    const f=gruppe(g,0,y,0), r=gruppe(f,0,0,0), h=w*.68;
    box(r,w+.3,h+.3,.1,0xb4a490,0,0,.05);
    const p=new THREE.Mesh(new THREE.PlaneGeometry(w,h),garten); p.position.z=.12; f.add(p);
    box(r,.09,h,.07,HOLZ2,0,0,.16); box(r,w,.08,.07,HOLZ2,0,0,.16);
    box(r,w+.5,.14,.42,HOLZ,0,-h/2-.18,.2);
    [-1,1].forEach(s=>{ const l=box(r,w*.24,h+.14,.08,0x3f7a5a,s*(w/2+w*.15+.16),0,.12); l.rotation.y=-s*.18; [-1,1].forEach(a=>box(r,w*.22,.07,.05,0x2a5a40,s*(w/2+w*.15+.16),a*h*.3,.19)); });
    /* Kräuter auf der Fensterbank */
    for(let i=0;i<9;i++) ball(r,.1,i%2?GRUEN:0x7aaa48,-w*.35+i*w*.085,-h/2-.04+(i%3)*.04,.3,1,.8,.8);
    verschmelze(r);
  }
  [[-15.1,4.05,2.1],[-4.9,4.5,1.15],[7.35,3.85,1.6]].forEach(([x,y,w])=>fenster(gruppe(wh,x,0,-T/2+.01),y,w));
  fenster(anLinks(3),3.7,2.2); fenster(anRechts(8.6),3.7,2.2);

  /* ---------- Wandschmuck hinten ---------- */
  [0,1].forEach(i=>pfanne(wh,-10.9,1.7+i*1.5,-T/2+.12,.34,i?KUPFER:EISEN));
  zopf(wh,-17.15,3.5,-T/2+.14,true); zopf(wh,-12.5,5.35,-T/2+.14,false);
  schnur(wh,-6.1,-3.85,2.9,-T/2+.14,true); schnur(wh,-6.1,-3.85,2.1,-T/2+.14,false);
  [13.55,17.1].forEach(x=>{ zopf(wh,x,x>15?3.6:2.2,-T/2+.14,x>15); });
  schnur(wh,13.6,17.2,5.2,-T/2+.14,false);
  [9.35,10.8,12.2].forEach((x,i)=>pfanne(wh,x,4.45+(i%2)*.35,-T/2+.12,.28,i===1?EISEN:KUPFER));

  /* ---------- linke Wand ---------- */
  [-11.9,-8.9,-8,-7.1].forEach((z,i)=>zopf(anLinks(z),0,4.4-(i%2)*.4,.06,i%2===0));
  const pl=anLinks(-3); walze(pl,.05,4.4,EISEN,0,3.9,.22).rotation.z=Math.PI/2; [-1.7,-.55,.6,1.75].forEach((x,i)=>pfanne(pl,x,2.65+(i%2)*.15,.2,.42-(i%2)*.08,i===2?EISEN:KUPFER));
  schnur(anLinks(-3),-2.3,2.3,5.2,.1,true);
  const tl=anLinks(9); walze(tl,.05,3.4,HOLZ,0,3.5,.18).rotation.z=Math.PI/2;
  [[-1.1,0xe8e0d0,0xc0453a],[0,0xdce8f0,0x3a6a9a],[1.1,0xe8e0d0,0x5a8a3a]].forEach(([x,c,s])=>{ box(tl,.75,1.1,.06,c,x,2.95,.22); [-.18,.2].forEach(y=>box(tl,.76,.09,.07,s,x,2.75+y,.22)); box(tl,.75,.16,.12,c,x,3.52,.22); });
  const kl=anLinks(12.2); [-.4,0,.4].forEach((x,i)=>loeffel(kl,x,3,.1,i));

  /* ---------- rechte Wand: blau-weiße Fliesen am Wasserbecken ---------- */
  const fw=anRechts(-3);
  for(let r=0;r<5;r++) for(let i=0;i<8;i++){ const x=-2.1+i*.6, y=.9+r*.5; box(fw,.57,.47,.05,(i+r)%2?0xeef2f4:0x4a7ab4,x,y,.03); box(fw,.18,.18,.02,(i+r)%2?0x4a7ab4:0xeef2f4,x,y,.06).rotation.z=Math.PI/4; }
  box(fw,5,.14,.18,HOLZ2,0,3.38,.08);
  [-1.6,-.6,.4,1.4].forEach((x,i)=>loeffel(fw,x,4.1,.12,(i+1)%3));
  [-11.5,-9.1,-7.7].forEach((z,i)=>zopf(anRechts(z),0,4.5-(i%2)*.5,.06,i!==1));
  const pr=anRechts(3.1); walze(pr,.05,3.8,EISEN,0,4.15,.22).rotation.z=Math.PI/2; [-1.4,0,1.4].forEach((x,i)=>pfanne(pr,x,2.85+(i%2)*.2,.2,.46-(i%2)*.1,i===1?EISEN:KUPFER));
  /* Tellerleiste */
  const tr=anRechts(12.45); [2.4,3.5].forEach(y=>{ box(tr,1.7,.1,.2,HOLZ,0,y-.38,.1); [-.43,.43].forEach(x=>{ liegend(walze(tr,.38,.06,CREME,x,y,.1),'x'); ring(tr,.26,.025,ZIEGEL2,x,y,.145); }); });
  schnur(anRechts(-8.4),-1.5,1.5,2.4,.1,false);

  fackel(hinten,k,-10.35,-T/2+.22,0); fackel(hinten,k,12.9,-T/2+.22,0);
  fackel(links,k,-B/2+.24,5.6,Math.PI/2); fackel(rechts,k,B/2-.24,5.6,-Math.PI/2);
  [wh,wl,wr].forEach(g=>{ angleichen(g); verschmelze(g); schattenNur(g); });

  flacker(k,KX-1.6,1.9,-9.9,0xff8a30,.75,14); flacker(k,10.8,1.6,-9.8,0xff7a20,.45,8);
  flacker(k,-14.5,3.6,4,0xffb260,.42,15); flacker(k,14.5,3.6,0,0xffb260,.42,15); flacker(k,-1,4.8,5,0xffd090,.28,17);

  /* ---------- Balkenstützen (werden durchsichtig, wenn sie die Figur verdecken) ---------- */
  [[-10.6,-6.2],[-9.6,6.2],[12.8,-5],[2.6,7.4]].forEach(([x,z],i)=>{
    const g=gruppe(sc,x,0,z);
    box(g,.9,.34,.9,0x9c8c7c,0,.17,0); box(g,.52,4.5,.52,HOLZ,0,2.55,0); box(g,.82,.2,.82,HOLZ2,0,4.7,0); box(g,1.6,.28,.4,HOLZ,0,4.94,0);
    [-1,1].forEach(s=>strich(g,[s*.2,4,0],[s*.7,4.85,0],.09,HOLZ2));
    [.7,3.5].forEach(y=>box(g,.58,.1,.58,EISEN,0,y,0));
    ball(g,.06,EISEN,0,3.1,.29);
    if(i%2) zopf(g,0,3.1,.3,i===1); else pfanne(g,0,2.15,.34,.34);
    angleichen(g); schattenNur(g,HOLZ); verschmelze(g); k.verdecker(g,x,z,.6); k.kasten(x,z,.9,.9);
  });

  /* ---------- Gestell mit hängenden Töpfen und Sieben ---------- */
  const gest=gruppe(sc,4.9,0,-4.4);
  [-1,1].forEach(s=>{ box(gest,.24,3.7,.24,HOLZ2,s*2.1,1.85,0); box(gest,.4,.16,1,HOLZ2,s*2.1,.08,0); k.kasten(4.9+s*2.1,-4.4,.4,1); });
  box(gest,4.7,.22,.26,HOLZ,0,3.7,0);
  [-1.45,-.5,.5,1.45].forEach((x,i)=>{ const y=i%2?2.75:2.95; strich(gest,[x,3.65,0],[x,y+.3,0],.018,EISEN);
    if(i===2){ reif(gest,.38,.05,HELLHOLZ,x,y,0); for(let j=-2;j<=2;j++){ box(gest,.7-Math.abs(j)*.14,.015,.02,0xd8c090,x,y,j*.13); box(gest,.02,.015,.7-Math.abs(j)*.14,0xd8c090,x+j*.13,y,0); } strich(gest,[x-.37,y,0],[x,y+.32,0],.012,EISEN); strich(gest,[x+.37,y,0],[x,y+.32,0],.012,EISEN); }
    else{ rohr(gest,.34,.27,.34,i%2?KUPFER2:KUPFER,x,y-.05,0,18); reif(gest,.35,.035,0xe89a54,x,y+.12,0); ring(gest,.3,.022,EISEN,x,y+.08,0,Math.PI); } });
  angleichen(gest); schattenNur(gest,HOLZ2); verschmelze(gest); k.verdecker(gest,4.9,-4.4,2.1);

  /* ---------- Arbeitstische ---------- */
  function tisch(x,z,w,d){
    const g=gruppe(fest,x,0,z);
    box(g,w,.18,d,HELLHOLZ,0,1,0); for(let i=1;i<4;i++) box(g,w,.012,.025,HOLZ,0,1.096,-d/2+i*d/4);
    box(g,w-.3,.2,d-.3,HOLZ,0,.82,0);
    [-1,1].forEach(a=>{ [-1,1].forEach(b=>box(g,.24,.92,.24,HOLZ2,a*(w/2-.25),.46,b*(d/2-.25))); box(g,.14,.14,d-.5,HOLZ2,a*(w/2-.25),.28,0); });
    box(g,w-.5,.14,.14,HOLZ2,0,.28,0); k.kasten(x,z,w,d); return g;
  }
  /* Teigtisch */
  const t1=tisch(-3,-3.9,4.8,1.9);
  walze(t1,.75,.015,0xf8f2e4,-1.25,1.1,.05); ball(t1,.45,0xecd29a,-1.35,1.26,0,1.25,.55,1); ball(t1,.2,0xecd29a,-.55,1.19,.45,1,.6,1);
  liegend(walze(t1,.13,1,HOLZ,-1,1.24,.62)); [-1,1].forEach(s=>liegend(walze(t1,.05,.3,HOLZ2,-1+s*.62,1.24,.62)));
  [[.35,-.35,0x5a7aa8],[1.05,.3,ZIEGEL2]].forEach(([x,z,c])=>{ rohr(t1,.46,.27,.34,c,x,1.27,z,18,true); walze(t1,.28,.04,c,x,1.12,z); walze(t1,.4,.03,CREME,x,1.37,z); });
  for(let i=0;i<4;i++){ walze(t1,.27-i*.012,.05,i%2?CREME:0xe0d4bc,1.9,1.12+i*.065,-.35); }
  strich(t1,[1.5,1.13,.55],[2.15,1.13,.3],.035,HOLZ); ball(t1,.12,HOLZ,2.17,1.14,.29,1.3,.5,1);
  ball(t1,.17,0xd8b040,.35,1.43,-.35,1,.5,1);
  /* Backtisch mit Obstkuchen, Käselaib und Apfelschale */
  const t2=tisch(-1.6,3.7,4.6,1.8);
  [[-1.55,-.15,0xa8283a],[-.35,.25,0x5a2a6a]].forEach(([x,z,c])=>{ rohr(t2,.52,.44,.18,0xd89a4a,x,1.18,z,22); walze(t2,.45,.04,c,x,1.28,z); for(let i=-1;i<=1;i++){ box(t2,.9-Math.abs(i)*.18,.035,.07,0xf0c070,x,1.31,z+i*.22); box(t2,.07,.035,.9-Math.abs(i)*.18,0xf0c070,x+i*.22,1.315,z); } reif(t2,.49,.05,0xc8863a,x,1.28,z); });
  walze(t2,.46,.3,0xf2c230,.8,1.24,-.2); walze(t2,.47,.06,0xe0a820,.8,1.24,-.2); [[.62,-.05],[.95,-.35],[1,.02]].forEach(p=>ball(t2,.06,0xc8900e,p[0],1.39,p[1],1,.25,1));
  rohr(t2,.5,.3,.26,HOLZ2,1.75,1.22,.2,18,true); walze(t2,.31,.03,HOLZ2,1.75,1.11,.2);
  [[0,0,0],[.24,.06,.05],[-.23,.08,.04],[.05,-.22,.05],[-.05,.24,.03],[.02,.04,.24]].forEach(([a,b,c],i)=>{ ball(t2,.16,i%3?0xd8323a:0x9ac43a,1.75+a,1.36+c,.2+b); box(t2,.025,.08,.025,HOLZ2,1.75+a,1.53+c,.2+b); });

  /* ---------- Wasserbecken mit Pumpe (rechte Wand) ---------- */
  const becken=gruppe(sc,16.85,0,-3);
  box(becken,1.5,.55,2.5,0x8c827a,0,.28,0);
  [-1,1].forEach(s=>{ box(becken,1.7,.55,.22,0xaaa098,0,.82,s*1.28); box(becken,.22,.55,2.78,0xaaa098,s*.74,.82,0); });
  walze(becken,.2,2.5,0x3f6a5a,.55,1.25,-1.6); walze(becken,.27,.16,EISEN,.55,.1,-1.6); walze(becken,.27,.14,EISEN,.55,2.5,-1.6); ball(becken,.18,0xd8a73a,.55,2.68,-1.6);
  strich(becken,[.55,2.05,-1.6],[.05,2.05,-.75],.1,0x3f6a5a); strich(becken,[.05,2.05,-.75],[.05,1.75,-.7],.09,0x3f6a5a);
  schattenNur(becken,0xaaa098); verschmelze(becken); k.kasten(16.85,-3.2,1.75,3.5);
  const hebel=gruppe(becken,.4,2.3,-1.6); strich(hebel,[0,0,0],[-.2,.15,-.85],.06,EISEN); ball(hebel,.11,HOLZ,-.2,.15,-.85); verschmelze(hebel); schattenNur(hebel);
  const wasser=new THREE.Mesh(new THREE.PlaneGeometry(1.28,2.34),basis(0x4a96c8,{transparent:true,opacity:.85,depthWrite:false})); wasser.rotation.x=-Math.PI/2; wasser.position.set(0,.96,0); becken.add(wasser);
  const tropfMat=basis(0xbfe4ff), tropfen=[0,1,2].map(()=>ball(becken,.05,tropfMat,.05,1.5,-.7,1,1.8,1));
  const welle=new THREE.Mesh(new THREE.RingGeometry(.85,1,24),basis(0xe8f6ff,{transparent:true,opacity:.5,depthWrite:false})); welle.rotation.x=-Math.PI/2; welle.position.set(.05,.975,-.7); becken.add(welle);
  k.anim.push(t=>{ tropfen.forEach((m,i)=>{ const p=(t*1.5+i/3)%1; m.position.y=1.68-p*p*.72; }); const p=(t*1.5)%1; welle.scale.setScalar(.08+p*.45); welle.material.opacity=.6*(1-p); hebel.rotation.x=Math.sin(t*2.2)*.18; wasser.position.y=.96+Math.sin(t*2)*.008; });

  /* ---------- Kürbisecke hinten links ---------- */
  const kk=gruppe(fest,-16.4,0,-11.55);
  box(kk,2.1,.08,1.9,HOLZ2,0,.04,0);
  kuerbis(kk,-.45,.55,-.35,.68); kuerbis(kk,.74,.45,-.42,.5,0xf0a028); kuerbis(kk,.42,.4,.55,.45); kuerbis(kk,-.6,.28,.68,.32,0xf0a028);
  k.kasten(-16.4,-11.55,2.1,1.95);

  /* ---------- Anrichte mit Tellern und Kupferschalen (linke Wand) ---------- */
  const an=gruppe(fest,-17.05,0,1.2);
  box(an,1.1,1.2,3.1,HOLZ,0,.65,0); box(an,1.3,.14,3.35,HELLHOLZ,.03,1.32,0); [-1,1].forEach(s=>box(an,1.2,.14,.16,HOLZ2,0,.07,s*1.5));
  [-.76,.76].forEach(z=>{ box(an,.06,.9,1.3,HOLZ2,.56,.66,z); box(an,.05,.7,1.1,HELLHOLZ,.59,.66,z); ball(an,.07,0xd8a73a,.64,.7,z*.35); });
  for(let i=0;i<6;i++) walze(an,.42-(i%2)*.03,.06,i%2?0xdce6f0:CREME,0,1.43+i*.07,-.9);
  [[.25,.4],[1.05,.32]].forEach(([z,r])=>{ rohr(an,r,r*.55,r*.7,KUPFER,0,1.4+r*.35,z,18,true); walze(an,r*.57,.03,KUPFER2,0,1.41,z); reif(an,r,.03,0xe89a54,0,1.4+r*.7,z); });
  k.kasten(-17.05,1.2,1.35,3.35);

  /* ---------- Handmühle und Mehlecke vorn links ---------- */
  const mu=gruppe(fest,-16.6,0,11.9);
  [-1,1].forEach(a=>[-1,1].forEach(b=>box(mu,.2,.6,.2,HOLZ2,a*.6,.3,b*.6))); box(mu,1.6,.16,1.6,HOLZ,0,.66,0);
  walze(mu,.78,.3,0x8e8a84,0,.89,0); walze(mu,.68,.3,0xb4b0a8,0,1.2,0); walze(mu,.14,.04,0x2a2420,0,1.37,0);
  walze(mu,.06,.55,HOLZ,.45,1.6,.15); ball(mu,.09,HOLZ2,.45,1.88,.15); for(let i=0;i<8;i++){ const a=i*.785; box(mu,.5,.012,.04,0x6a665e,Math.cos(a)*.38,1.356,Math.sin(a)*.38).rotation.y=-a; }
  k.kasten(-16.65,11.95,2.1,2.2);
  mehlhaufen(fest,-15.05,12.15,.55,.34,.46); mehlhaufen(fest,-14.55,11.85,.26,.14,.22); k.kreis(-15.05,12.15,.5);
  mehlfleck(sc,-14.8,.016,11.6,2.2,1.6,.4); mehlfleck(sc,-13.2,.018,10.5,1.7,.8,.5);

  /* ---------- Teigbrett vorn rechts: flach ausgerollter Teig, halb unter einem Tuch ---------- */
  const brett=gruppe(fest,15.7,0,10.9);
  [-1,1].forEach(a=>[-1,1].forEach(b=>box(brett,.16,.64,.16,HOLZ2,a*1.05,.32,b*.45)));
  box(brett,2.5,.14,1.2,HOLZ,0,.69,0); box(brett,2.3,.05,1.05,HELLHOLZ,0,.78,0);
  box(brett,1.2,.04,.82,0xecd29a,-.48,.825,0); [-1,1].forEach(a=>box(brett,.9,.035,.12,0xecd29a,-.55,.822,a*.44)); box(brett,.12,.035,.6,0xecd29a,-1.1,.822,.02);
  box(brett,1.3,.06,1.24,0xf1e6cc,.55,.86,0).rotation.y=.04; [-1,1].forEach(a=>box(brett,1.28,.34,.04,0xf1e6cc,.55,.71,a*.63)); box(brett,.04,.3,1.24,0xf1e6cc,1.27,.73,0);
  [.2,.42,.95].forEach(x=>box(brett,.08,.065,1.26,0x5a7aa8,x,.863,0).rotation.y=.04);
  k.kasten(15.7,10.9,2.6,1.35);

  /* ---------- Steinmörser rechts hinten ---------- */
  const mo=gruppe(fest,16.7,0,-9.6);
  walze(mo,.55,.2,0x7a726a,0,.1,0); walze(mo,.3,.35,0x8c847c,0,.37,0); drehkoerper(mo,[[0,0],[.35,.03],[.58,.3],[.66,.65],[.54,.65],[.44,.32],[0,.2]],0x9c948c,0,.52,0);
  strich(mo,[-.05,.82,0],[.5,1.65,.15],.1,HOLZ); ball(mo,.17,HOLZ,-.07,.83,-.01);
  k.kreis(16.7,-9.6,.7);

  /* ---------- vorn: Käsebrett und Kürbisse am Boden ---------- */
  const kb=gruppe(fest,5.2,0,12.15);
  box(kb,2,.14,1.05,HOLZ,0,.42,0); [-1,1].forEach(s=>box(kb,.18,.36,1,HOLZ2,s*.8,.18,0));
  [[-.5,.68,.42],[.45,.66,.38],[-.45,.95,.28]].forEach(([x,y,r])=>{ walze(kb,r,.28,0xf2c230,x,y,0); walze(kb,r+.015,.06,0xc0382c,x,y,0); });
  k.kasten(5.2,12.15,2,1.1);
  const vk=gruppe(fest,-5.3,0,12.1);
  kuerbis(vk,-.35,.38,0,.5); kuerbis(vk,.58,.28,.2,.36,0xf0a028); kuerbis(vk,.32,.19,-.56,.24);
  k.kreis(-5.3,12.1,.8);

  /* ---------- Boden: Zierkreis, Abfluss, verstreute Halme ---------- */
  const zier=gruppe(fest,0,0,0);
  [[2.3,0xd8a868],[2,0x8a4a30],[1.35,0xe2bc80],[1.1,0x9a5636]].forEach(([r,f],i)=>walze(zier,r,.01,f,3.6,.006+i*.004,.4));
  for(let i=0;i<4;i++) box(zier,.22,.01,2.1,0xe2bc80,3.6,.024+i*.001,.4).rotation.y=i*Math.PI/4;
  walze(zier,.55,.012,0x6a5a50,14.4,.008,-3); for(let i=-2;i<=2;i++) box(zier,.08,.012,.95-Math.abs(i)*.2,0x2a201c,14.4+i*.18,.018,-3);
  box(zier,3.4,.03,1.3,0x8a3a2a,TX,.016,-12.3); [-1,1].forEach(s=>box(zier,3.2,.012,.1,0xe8c45a,TX,.036,-12.3+s*.45));
  
  const nester=[[-16,6,1.2],[-11,-9.5,1.3],[-8,10,1.4],[6,-8,1],[12,6,1.3],[-12,2,1.2],[1.5,10.5,1],[12.5,11,1],[15,-6.5,1],[-5,-8,1]];
  const halme=new THREE.InstancedMesh(GEO.box,mat(0xcdb35a),520), o=new THREE.Object3D();
  for(let i=0;i<520;i++){ const n=nester[i%nester.length], a=zufall()*6.28, r=Math.sqrt(zufall())*n[2]; o.position.set(n[0]+Math.cos(a)*r,.025+zufall()*.025,Math.min(13.2,n[1]+Math.sin(a)*r)); o.rotation.set(0,zufall()*3.14,0); o.scale.set(.2+zufall()*.25,.014,.025); o.updateMatrix(); halme.setMatrixAt(i,o.matrix); }
  halme.receiveShadow=true; halme.frustumCulled=false; sc.add(halme);

  /* ---------- Köchin (läuft zwischen den Tischen hin und her) ---------- */
  const koechin=gruppe(sc,0,0,0), leib=gruppe(koechin,0,0,0), HAUT=0xf0c09a;
  rohr(leib,.26,.48,.95,0x3f6a8a,0,.82,0); box(leib,.08,.8,.52,0xf6f2ea,.36,.76,0).rotation.z=.2; rohr(leib,.24,.28,.45,0x3f6a8a,0,1.45,0);
  ball(leib,.3,HAUT,0,1.96,0); [-1,1].forEach(s=>{ ball(leib,.038,0x20140e,.28,2,s*.11); ball(leib,.055,0xe89080,.26,1.9,s*.17,.5,1,1); ball(leib,.14,0x8a4a22,-.08,1.96,s*.25);
    strich(leib,[0,1.58,s*.3],[.28,1.28,s*.36],.085,0x3f6a8a); strich(leib,[.28,1.28,s*.36],[.52,1.3,s*.22],.07,HAUT); });
  ball(leib,.16,0x8a4a22,-.28,2.02,0); walze(leib,.23,.2,0xffffff,-.02,2.26,0); ball(leib,.3,0xffffff,-.04,2.42,0,1,.65,1);
  rohr(leib,.34,.22,.24,ZIEGEL2,.6,1.32,0,16); walze(leib,.3,.04,CREME,.6,1.45,0); strich(leib,[.6,1.42,.05],[.78,1.75,.15],.028,HELLHOLZ);
  schattenNur(leib,0x3f6a8a); verschmelze(leib);
  const fuesse=[-1,1].map(s=>{ const b=gruppe(koechin,0,.5,s*.17); walze(b,.09,.44,0x5a3a28,0,-.2,0); ball(b,.12,0x2a1a10,.06,-.43,0,1.5,.6,1); schattenNur(b); return b; });
  k.anim.push(t=>{ fuesse.forEach((b,i)=>b.rotation.z=Math.sin(t*5+i*3.14)*.4); });
  laeufer(k,koechin,[[-6.8,-1.6],[0,-1.4],[.6,.6],[-2.5,1.3],[-6.8,.4]],1,0,5);

  /* Katze (wirft Schatten nur mit dem Rumpf) und Mäuse (ohne Schatten) */
  const vorTieren=sc.children.length;
  katze(k,[[2,-7.2],[10,-7],[10.4,-1],[10.6,4],[7.8,5.8],[4.8,4.8],[3.4,2.4],[1.2,-2],[.8,-6]],1.5);
  maeuschen(k,[[-12.6,12.4],[-9,12],[-8.2,9.4],[-11.4,9.8]],2.2,0); maeuschen(k,[[13,-9.6],[15.4,-10.2],[15,-7.2],[13.8,-7.6]],2,4); maeuschen(k,[[-15.6,-8.8],[-12,-9.6],[-11.4,-7],[-14.8,-6.2]],2.4,8);

  sc.children.slice(vorTieren).forEach((g,i)=>{ if(i===0) schattenNur(g,0xe08a30); else schattenNur(g); });

  /* Feuer unter dem Suppenkessel und Dampf */
  feuer(-1,.02,-10.8,.72); dampf(-1,1.95,-10.9,6,1.1,2.1);
  dampf(10.8,3.95,-12.7,4,.8,1.6); dampf(-1.95,1.55,3.95,3,.45,.9);
  const glut=schein(sc,'rgba(255,130,40,.75)',10.8,1.35,-10.85,1.5); k.anim.push(t=>{ const a=1.5+Math.sin(t*7)*.15; glut.scale.set(a,a,1); });

  angleichen(fest); verschmelze(fest); schattenNur(fest,HOLZ,0x9c8c7c);

  return { tuer, start:[0,9.5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-16.9,-9.4],[-14.3,-12.3],[-14.4,-5],[-17,4],[-16.9,8.4],[-10.7,5],[-10.7,-7.2],[-4.6,-5.6],[-2.6,2],[4.4,-10.4],[8.6,-11.5],[13.9,-12.3],[16.9,-7.6],[14,-4.6],[16.9,.4],[16.9,6.8],[13.4,11.8],[9.4,6.8],[3.8,7],[-6.8,12.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-1, z:-10.9, steh:[-1,-8.8], kasten:[2.3,2], treffer:[2.2,2.4,1.9], baue(g){ /* 1 Suppenkessel auf drei Beinen über dem Feuer */
      for(let i=0;i<11;i++){ const a=i/11*6.283; ball(g,.2,i%2?0x9a908a:0x7c746e,Math.cos(a)*.98,.1,Math.sin(a)*.86,1.1,.65,1); }
      [0,1,2].forEach(i=>{ const a=i*2.094+.52; strich(g,[Math.cos(a)*.88,0,Math.sin(a)*.8],[Math.cos(a)*.62,.82,Math.sin(a)*.62],.09,0x25252c); });
      drehkoerper(g,[[0,.55],[.5,.6],[.84,.85],[.97,1.18],[.9,1.5],[.82,1.64],[.92,1.74]],0x30303a,0,0,0);
      reif(g,.92,.075,0x4a4a56,0,1.74,0); reif(g,.965,.035,0x4a4a56,0,1.18,0);
      walze(g,.81,.04,0xe89428,0,1.62,0);
      [[-.4,.2,0xf06a20],[-.1,-.35,0x6aa034],[.35,.3,0xf4d060],[-.45,-.25,0x6aa034],[.1,.45,0xf06a20],[-.15,.05,0xf4d060]].forEach(([x,z,c])=>ball(g,.12,c,x,1.65,z,1,.5,1));
      [-1,1].forEach(s=>ring(g,.2,.05,0x5a5a66,s*1.02,1.5,0));
      /* Kochlöffel */
      strich(g,[.2,1.55,0],[.92,2.35,.3],.065,0xc28c50); ball(g,.17,0xc28c50,.24,1.64,.02,1.2,.55,1); ball(g,.1,0xc28c50,.93,2.36,.3);
      schattenNur(g,0x30303a); } },
  { x:-6.5, z:3.2, steh:[-6.5,4.85], r:.95, treffer:[1.9,1.9,1.9], baue(g){ /* 2 Brotkorb auf einem runden Tischchen */
      walze(g,.95,.14,0x8a5a2c,0,.74,0); walze(g,.22,.66,0x6b421e,0,.37,0); walze(g,.6,.12,0x6b421e,0,.07,0);
      rohr(g,.88,.64,.46,0xcfa254,0,1.04,0,24,true); walze(g,.65,.05,0x9a7430,0,.84,0);
      [[.69,.9],[.76,1.04],[.82,1.16]].forEach(p=>reif(g,p[0],.032,0x9a7430,0,p[1],0)); reif(g,.89,.07,0xe0bc6c,0,1.28,0);
      for(let i=0;i<18;i++){ const a=i/18*6.283; strich(g,[Math.cos(a)*.655,.83,Math.sin(a)*.655],[Math.cos(a)*.89,1.26,Math.sin(a)*.89],.022,0xa8823a); }
      /* Brote: zwei lange Laibe, ein runder, zwei Brötchen und eine Brezel */
      [[-.28,1.36,.24,.5],[.32,1.36,.1,-.35]].forEach(([x,y,z,d],i)=>{ const l=gruppe(g,x,y,z); l.rotation.y=d; ball(l,.25,i?0xd8923c:0xc47c2c,0,0,0,2.1,.9,1); [-.24,0,.24].forEach(a=>{ box(l,.07,.04,.34,0xf2cc84,a,.215-Math.abs(a)*.16,0).rotation.y=.5; }); });
      ball(g,.4,0xb06c24,-.05,1.45,-.35,1,.75,1); [-1,1].forEach(s=>box(g,.5,.035,.06,0xf2cc84,-.05,1.745,-.35).rotation.y=s*.78);
      ball(g,.2,0xe0a24c,.55,1.34,-.32,1,.8,1); ball(g,.18,0xd8923c,-.6,1.33,-.1,1,.8,1);
      const bz=gruppe(g,.12,1.5,.55); bz.rotation.x=-.7; ring(bz,.24,.06,0x9a561c,0,0,0); [-1,1].forEach(s=>strich(bz,[s*.2,.14,0],[-s*.08,-.2,.02],.05,0x9a561c));
      schattenNur(g,0xcfa254,0x8a5a2c); } },
  { x:-13.8, z:8.2, steh:[-12.1,8.2], r:.9, treffer:[1.8,2.1,1.7], baue(g){ /* 3 Mehlsack mit Ähre und verschüttetem Mehl */
      drehkoerper(g,[[0,0],[.68,.02],[.84,.28],[.82,.7],[.66,1.12],[.34,1.4],[.24,1.52],[.34,1.68],[.5,1.86]],0xe9dcbc,0,0,0);
      reif(g,.27,.065,0x8a4a22,0,1.5,0); [-1,1].forEach(s=>{ strich(g,[s*.1,1.5,.28],[s*.34,1.16,.55],.028,0x8a4a22); ball(g,.07,0x8a4a22,s*.34,1.14,.56); });
      walze(g,.35,.1,0xfffaf0,0,1.72,0); ball(g,.32,0xfffaf0,0,1.76,0,1,.5,1);
      /* Ähre als Zeichen vorn */
      strich(g,[0,.2,.87],[0,.95,.76],.028,0xb8841c); [.58,.74,.9].forEach(y=>[-1,1].forEach(s=>{ const a=ball(g,.1,0xd89c24,s*.11,y,.87-(y-.58)*.28,.65,1.35,.35); a.rotation.z=-s*.6; })); ball(g,.08,0xd89c24,0,1.05,.74,.65,1.4,.4);
      [-1,1].forEach(s=>strich(g,[s*.55,.12,.64],[s*.6,.9,.5],.012,0xb0a080));
      mehlhaufen(g,.66,.6,.34,.13,.27); mehlfleck(g,.55,.02,.65,1.8,1.25,-.3);
      const sch=rohr(g,.17,.13,.36,0x8a5a2c,.88,.25,.55,14,true); sch.rotation.set(0,0,-1.25); strich(g,[1.02,.3,.55],[1.28,.5,.55],.045,0x6b421e);
      schattenNur(g,0xe9dcbc); } },
  { x:8.8, z:8.6, steh:[8.8,10.45], kasten:[2.35,1.6], treffer:[2.4,1.7,1.6], baue(g){ /* 4 Gemüsekiste aus Latten */
      const L=0xc28c50, P=0x6b421e;
      box(g,2.2,.1,1.4,P,0,.12,0);
      [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.16,.86,.16,P,a*1.08,.43,b*.68)));
      [.26,.5,.74].forEach(y=>{ [-1,1].forEach(s=>{ box(g,2.24,.17,.08,L,0,y,s*.72); box(g,.08,.17,1.4,L,s*1.12,y,0); }); });
      box(g,2.05,.4,1.25,0x4a3018,0,.4,0);
      [[-.65,-.25,.36,0x8cc44a],[-.05,-.35,.33,0x5f9a38]].forEach(([x,z,r,c])=>{ ball(g,r,c,x,.92,z); for(let i=0;i<5;i++){ const a=i*1.256; const b=ball(g,r*.8,0x4f8a2c,x+Math.cos(a)*r*.72,.82,z+Math.sin(a)*r*.72,.8,.55,.8); b.rotation.y=-a; } });
      for(let i=0;i<7;i++){ const x=-.9+i*.18, z=.3+(i%3)*.07, y=.88+(i%2)*.08, m=kegel(g,.11,.66,i%2?0xf07818:0xff8c28,x,y,z); m.rotation.x=2.0; for(let j=-1;j<=1;j++) strich(g,[x,y+.14,z-.28],[x+j*.12,y+.44,z-.4],.025,0x4f9a30); }
      [[.55,.35],[.88,.18],[.8,.48],[.45,.05]].forEach(([x,z])=>{ ball(g,.19,0xdc2c24,x,.9,z,1,.88,1); ball(g,.06,0x4f8a2c,x,1.07,z,1.4,.4,1.4); });
      [0,1,2].forEach(i=>{ const x=.45+i*.2; strich(g,[x,.75,-.2],[x+.14,1.2,-.42],.08,0xf0ecd0); strich(g,[x+.14,1.2,-.42],[x+.2,1.55,-.55],.065,0x4f8a34); strich(g,[x+.14,1.2,-.42],[x+.4,1.42,-.5],.045,0x6aa044); });
      ball(g,.2,0xb04a8a,.28,.95,.42); kegel(g,.06,.2,0xf0ecd0,.28,1.17,.42);
      schattenNur(g,0xc28c50); } },
  { x:-14.2, z:-3.5, steh:[-14.2,-2], kasten:[2.9,.9], treffer:[2.9,3.1,1], baue(g){ /* 5 Kräuterbündel an einem Trockengestell */
      [-1,1].forEach(s=>{ box(g,.18,2.95,.18,0x6b421e,s*1.32,1.48,0); box(g,.3,.14,.85,0x6b421e,s*1.32,.07,0); strich(g,[s*1.3,2.45,0],[s*.9,2.9,0],.05,0x8a5a2c); });
      walze(g,.09,3,0x8a5a2c,0,2.92,0).rotation.z=Math.PI/2;
      [[-.82,0x4f8a34,0x78b048,0xf4f0d0],[0,0x6a7a4a,0x8a62b0,0xb48ae0],[.82,0x7a9a6a,0xa8c488,0xf0c828]].forEach(([x,c1,c2,bl])=>{
        strich(g,[x,2.9,0],[x,2.42,0],.025,0xa8321f); walze(g,.1,.16,0xc0382c,x,2.36,0); [-1,1].forEach(s=>ball(g,.09,0xc0382c,x+s*.14,2.42,.06,1.4,.6,.6));
        for(let i=0;i<13;i++){ const a=i*2.4, r=.1+(i%4)*.08, ux=x+Math.cos(a)*r, uz=Math.sin(a)*r*.8, uy=1.05+(i%5)*.14;
          strich(g,[x,2.3,0],[ux,uy,uz],.018,0x5a6a2a);
          for(let j=1;j<=4;j++){ const f=.3+j*.18, bx=x+(ux-x)*f, by=2.3+(uy-2.3)*f, bz=uz*f; const b=ball(g,.095,(i+j)%2?c1:c2,bx+((j%2)-.5)*.1,by,bz,.75,1.25,.45); b.rotation.set(0,a,(j%2?1:-1)*.55); }
          if(i%2) ball(g,.065,bl,ux,uy-.08,uz); } });
      schattenNur(g,0x6b421e); } },
  { wand:'hinten', x:15.4, z:-13.5, steh:[15.4,-12.05], treffer:[2.7,2.4,.7], trefferY:.9, baue(g){ /* 6 Rezepttafel: Schiefertafel mit Kreideschrift */
      box(g,2.5,2.05,.14,0xa0682e,0,2.1,.09);
      [-1,1].forEach(s=>{ box(g,2.66,.17,.22,0xc28c50,0,2.1+s*1.02,.13); box(g,.17,2.2,.22,0xc28c50,s*1.25,2.1,.13); });
      const t=bild(384,320,c=>{ c.fillStyle='#26333a'; c.fillRect(0,0,384,320); c.strokeStyle='#f4f4ea'; c.fillStyle='#f4f4ea'; c.lineWidth=5; c.lineCap='round';
        c.font='700 46px Andika, Arial, sans-serif'; c.textAlign='center'; c.fillText('Rezept',192,58); c.beginPath(); c.moveTo(108,76); c.lineTo(276,76); c.stroke();
        for(let r=0;r<5;r++){ const y=116+r*40; c.beginPath(); c.arc(40,y,6,0,7); c.fill(); let x=66; while(x<(r===4?170:260)){ const w=26+((r*37+x)%38); c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+w*.25,y-10,x+w*.5,y); c.quadraticCurveTo(x+w*.75,y+9,x+w,y-2); c.stroke(); x+=w+15; } }
        c.strokeStyle='#ff9a3a'; c.lineWidth=7; c.beginPath(); c.moveTo(296,130); c.lineTo(348,138); c.lineTo(320,230); c.closePath(); c.stroke(); c.strokeStyle='#9ad86a'; [-22,0,22].forEach(d=>{ c.beginPath(); c.moveTo(322,132); c.lineTo(322+d,96); c.stroke(); }); });
      const p=new THREE.Mesh(new THREE.PlaneGeometry(2.34,1.87),new THREE.MeshLambertMaterial({map:t,emissive:0x333333,emissiveMap:t})); p.position.set(0,2.1,.17); g.add(p);
      box(g,1.5,.09,.28,0x8a5a2c,0,.99,.2); walze(g,.045,.3,0xffffff,-.35,1.07,.24).rotation.z=Math.PI/2; walze(g,.045,.22,0xffd0d0,.1,1.07,.24).rotation.z=Math.PI/2;
      [-1,1].forEach(s=>strich(g,[s*.8,3.18,.14],[0,3.55,.08],.025,0xd8c090)); ball(g,.08,0x3a3d44,0,3.56,.1);
      schattenNur(g,0xa0682e); } },
  { x:-12.4, z:-12.85, steh:[-12.4,-11.35], kasten:[2.3,.8], treffer:[2.3,3.2,.9], baue(g){ /* 7 Gewürzregal voller Gläser und Dosen */
      box(g,2.1,2.9,.08,0x6b421e,0,1.55,-.3); [-1,1].forEach(s=>box(g,.14,3,.7,0xa06a34,s*1.08,1.5,0));
      box(g,2.45,.16,.82,0x8a5a2c,0,3.06,0); box(g,1.6,.2,.1,0xc28c50,0,3.22,.3);
      const F=[0xd8342a,0xf0a81c,0x5c9a34,0x8a4a22,0xf4d838,0xb8441c,0x7a4a9a,0x2a8a8a];
      [.3,.98,1.66,2.34].forEach((y,r)=>{ box(g,2.1,.1,.7,0xc28c50,0,y,0);
        for(let i=0;i<5;i++){ const x=-.8+i*.4, c=F[(r*3+i)%F.length], h=.34+((r+i)%3)*.06;
          if((r+i)%4===3){ box(g,.3,h,.3,c,x,y+.05+h/2,.14); box(g,.33,.07,.33,0xd8a73a,x,y+.08+h,.14); }
          else{ walze(g,.15,h,c,x,y+.05+h/2,.14); walze(g,.1,.09,0xd8b078,x,y+.09+h,.14); }
          box(g,.16,.13,.02,0xf6ecd4,x,y+.07+h*.45,.3); } });
      [-.8,.8].forEach(x=>{ ball(g,.15,0xf0e0c0,x,3.27,.05); kegel(g,.07,.14,0xc8a060,x,3.46,.05); });
      schattenNur(g,0xa06a34); } },
  { x:6.2, z:1.4, steh:[6.2,3.05], r:.85, treffer:[1.8,2.1,1.4], baue(g){ /* 8 Kochbuch aufgeschlagen auf einem Pult */
      walze(g,.62,.12,0x6b421e,0,.06,0); [-1,1].forEach(s=>{ box(g,1.1,.1,.16,0x8a5a2c,0,.16,s*.25); }); walze(g,.15,1.15,0x8a5a2c,0,.7,0); ball(g,.22,0x6b421e,0,.5,0);
      const p=gruppe(g,0,1.42,0); p.rotation.x=.55;
      box(p,1.75,.12,1.15,0x8a5a2c,0,0,0); box(p,1.75,.14,.1,0x6b421e,0,.1,.6);
      box(p,1.62,.08,1,0xb0302a,0,.1,0); [-1,1].forEach(a=>[-1,1].forEach(b=>box(p,.16,.09,.16,0xe8c45a,a*.74,.105,b*.43)));
      [-1,1].forEach(s=>{ const q=gruppe(p,s*.375,.2,-.02); q.rotation.z=s*.09; box(q,.72,.1,.9,0xfff6e0,0,0,0);
        if(s<0){ box(q,.46,.012,.07,0xa8321f,0,.058,-.33); for(let i=0;i<5;i++) box(q,.56-(i===4?.24:0),.012,.032,0x6a5436,i===4?-.12:0,.058,-.17+i*.13); }
        else{ const m=kegel(q,.1,.42,0xf07818,-.08,.08,-.14); m.rotation.set(0,0,Math.PI/2); m.scale.set(.1,.42,.035); [-.07,0,.07].forEach(d=>strich(q,[.12,.065,-.14],[.25,.065,-.14+d],.014,0x4f9a30)); ball(q,.11,0xd8342a,.14,.058,.12,1,.12,1); for(let i=0;i<3;i++) box(q,.54,.012,.032,0x6a5436,0,.058,.2+i*.1); } });
      box(p,.07,.03,.95,0x6b3a14,0,.2,-.02); box(p,.09,.02,.6,0x2f7a4a,.06,.27,.4); strich(p,[.06,.26,.68],[.1,-.18,.74],.035,0x2f7a4a);
      schattenNur(g,0x8a5a2c); } },
  { x:10.8, z:-12.1, steh:[10.8,-9.8], kasten:[3.5,2.45], treffer:[3.5,3.4,2.4], baue(g){ /* 9 Backofen mit Kuppel, Feuerloch und Kamin */
      box(g,3.4,.8,2.2,0x9c8c7c,0,.4,0); for(let i=0;i<6;i++){ box(g,.52,.3,.06,i%2?0xb4a490:0x84766a,-1.38+i*.552,.2,1.12); box(g,.52,.3,.06,i%2?0x84766a:0xb4a490,-1.38+i*.552,.55,1.12); }
      box(g,3.55,.18,2.35,0x6a5a50,0,.88,0);
      ball(g,1,0xc4684a,0,.95,-.18,1.62,1.8,.95);
      [[1.5,.66],[1.12,1.32],[.71,1.62]].forEach(([s,h])=>{ const r=reif(g,1,.03,0xe0b090,0,.95+h,-.18); r.scale.set(s*1.005,s*.592,1); });
      /* Feuerloch mit Bogen aus Steinen */
      box(g,1.5,.62,.3,0x9a4430,0,1.28,.76); const bg=walze(g,.75,.6,0x9a4430,0,1.55,.61); bg.rotation.x=Math.PI/2;
      const l=new THREE.Mesh(new THREE.CircleGeometry(.56,24,0,Math.PI),basis(0x1c0804)); l.position.set(0,1.45,.925); g.add(l); box(g,1.12,.48,.02,0x1c0804,0,1.21,.915);
      const gl=[basis(0xffd040),basis(0xff7a1a),basis(0xd83a10)];
      for(let i=0;i<9;i++) ball(g,.12,gl[i%3],-.4+i*.1,1.04+(i%2)*.06,.93,1,.8,.35);
      [-.25,.05,.3].forEach((x,i)=>kegel(g,.11,.34+(i%2)*.14,gl[i%2?0:1],x,1.25+(i%2)*.07,.93).scale.z=.03);
      for(let i=0;i<=8;i++){ const a=Math.PI*i/8, s=box(g,.26,.24,.18,i%2?0xe8d8bc:0xcab89c,Math.cos(a)*.7,1.45+Math.sin(a)*.7,.96); s.rotation.z=a-Math.PI/2; }
      [-1,1].forEach(s=>[0,1].forEach(i=>box(g,.24,.24,.18,i?0xe8d8bc:0xcab89c,s*.7,1.06+i*.26,.96)));
      box(g,1.9,.12,.42,0x6a5a50,0,.92,1.05);
      box(g,.9,2,.7,0xa8503a,0,2.75,-.7); [2.7,3.1,3.5].forEach(y=>box(g,.94,.05,.74,0xe0b090,0,y,-.7)); box(g,1.15,.2,.95,0x6a5a50,0,3.82,-.7);
      /* Ofenschieber aus Holz, seitlich angelehnt */
      strich(g,[1.55,.5,1.18],[1.45,2.55,.45],.05,0xc28c50); box(g,.46,.55,.06,0xc28c50,1.57,.3,1.2);
      schattenNur(g,0xc4684a,0x9c8c7c); } },
  { x:14.6, z:2.8, steh:[12.9,2.8], r:.9, treffer:[1.8,2.2,1.8], baue(g){ /* 10 Eierkorb mit Henkel auf einem Tischchen */
      box(g,1.5,.14,1.5,0x8a5a2c,0,.72,0); [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.16,.68,.16,0x6b421e,a*.58,.34,b*.58)));
      box(g,1.56,.04,.9,0x4a7ab4,0,.81,0); [-1,1].forEach(s=>{ box(g,.04,.3,.9,0x4a7ab4,s*.78,.66,0); box(g,1.57,.012,.08,0xeef2f4,0,.835,s*.3); });
      rohr(g,.74,.5,.44,0xa86c2c,0,1.05,0,24,true); walze(g,.51,.05,0x7a4a1c,0,.86,0);
      [[.56,.93],[.63,1.06]].forEach(p=>reif(g,p[0],.032,0x7a4a1c,0,p[1],0)); reif(g,.75,.065,0xc88c44,0,1.27,0);
      for(let i=0;i<16;i++){ const a=i/16*6.283; strich(g,[Math.cos(a)*.515,.86,Math.sin(a)*.515],[Math.cos(a)*.745,1.25,Math.sin(a)*.745],.022,0x8a561c); }
      const h=ring(g,.74,.06,0xa86c2c,0,1.27,0,Math.PI); h.rotation.y=.5;
      walze(g,.66,.06,0xe0bc5a,0,1.2,0); for(let i=0;i<20;i++){ const a=i*1.7; strich(g,[Math.cos(a)*.4,1.24,Math.sin(a)*.4],[Math.cos(a+.5)*.82,1.3+(i%3)*.04,Math.sin(a+.5)*.82],.012,0xe8c860); }
      const ei=(x,y,z,i)=>{ const e=ball(g,.17,i%3===0?0xd89c68:(i%3===1?0xfffaf0:0xf0d4ac),x,y,z,1,1.32,1); e.rotation.set(((i*5)%7-3)*.14,0,((i*3)%5-2)*.2); };
      for(let i=0;i<8;i++){ const a=i/8*6.283; ei(Math.cos(a)*.44,1.34,Math.sin(a)*.44,i); }
      [[.17,.1],[-.17,.12],[0,-.18]].forEach((p,i)=>ei(p[0],1.45,p[1],i+1)); ei(0,1.66,.02,1);
      ei(.6,.99,.62,0); ball(g,.12,0xfffaf0,-.6,.91,.6,1.3,1,1);
      schattenNur(g,0xa86c2c,0x8a5a2c); } }
];

return { titel:'Die Burgküche', breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Raum 3: Der Rittersaal. Heller Festsaal mit Kamin (Ausgang), Buntglasfenstern, Säulen und Musikecke.
   Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu. */
RAEUME3D.burg[2] = (function(){
const { HOLZ, HOLZ2, EISEN, fackel, laeufer } = BURG;
const GOLD=0xe2b23c, GOLD2=0xb8862a, ROT=0xb02a34, ROT2=0x7e1a26, BLAU=0x2a52a0, CREME=0xf3e9d2, MARMOR=0xece4d4, SILBER=0xbcc6d2, SILBER2=0x8a96a6;

/* ---------- kleine Helfer ---------- */
const KUGEL_KLEIN=new THREE.SphereGeometry(1,8,6), KUGEL_MITTEL=new THREE.SphereGeometry(1,12,8);
/* kleine Kugeln bekommen weniger Flächen (spart Dreiecke, sieht gleich aus) */
function sparen(gr){ gr.traverse(m=>{ if(!m.isMesh || m.geometry!==GEO.sph) return; const r=Math.max(m.scale.x,m.scale.y,m.scale.z); if(r<=.2) m.geometry=KUGEL_KLEIN; else if(r<=.45) m.geometry=KUGEL_MITTEL; }); }
/* Alle einfarbigen, festen Teile einer Gruppe zu EINEM Körper mit Eckfarben zusammenfassen (spart Zeichenaufrufe).
   Nur für Deko benutzen: Gegenstände fasst die Raumansicht selbst zusammen. */
function backe(gr,ohneSchatten){
  sparen(gr); gr.updateMatrixWorld(true);
  const inv=new THREE.Matrix4().copy(gr.matrixWorld).invert(), toepfe=new Map(), weg=[];
  gr.traverse(m=>{ if(!m.isMesh || m.isInstancedMesh) return; const s=m.material;
    if(!s.visible || s.transparent || s.map || !s.isMeshLambertMaterial) return;
    if(!toepfe.has(s.side)) toepfe.set(s.side,[]); toepfe.get(s.side).push(m); weg.push(m); });
  toepfe.forEach((liste,seite)=>{
    const P=[], N=[], F=[]; let schatten=false;
    liste.forEach(m=>{ const q=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone(); q.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));
      const p=q.attributes.position.array, n=q.attributes.normal.array, c=m.material.color;
      for(let i=0;i<p.length;i+=3){ P.push(p[i],p[i+1],p[i+2]); N.push(n[i],n[i+1],n[i+2]); F.push(c.r,c.g,c.b); }
      if(m.castShadow && !ohneSchatten) schatten=true; q.dispose(); });
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute(N,3)); geo.setAttribute('color',new THREE.Float32BufferAttribute(F,3));
    const neu=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({vertexColors:true,side:seite})); neu.castShadow=schatten; neu.receiveShadow=true; gr.add(neu);
  });
  weg.forEach(m=>m.parent.remove(m));
}
/* flache Form (Punkte [x,y]) mit Tiefe, Vorderseite zeigt nach +z */
function platte(par,punkte,tiefe,farbe,x,y,z){
  const f=new THREE.Shape(); punkte.forEach((p,i)=>i?f.lineTo(p[0],p[1]):f.moveTo(p[0],p[1]));
  const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:tiefe,bevelEnabled:false}),mat(farbe)); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; par.add(m); return m;
}
/* Drehkörper aus [Radius, Höhe] */
function dreher(par,punkte,farbe,x,y,z){
  const m=new THREE.Mesh(new THREE.LatheGeometry(punkte.map(p=>new THREE.Vector2(p[0],p[1])),24),mat(farbe,{side:THREE.DoubleSide})); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; par.add(m); return m;
}
function bildFlaeche(par,tex,w,h,x,y,z,leuchtet){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),leuchtet?new THREE.MeshBasicMaterial({map:tex}):new THREE.MeshLambertMaterial({map:tex})); m.position.set(x,y,z); par.add(m); return m;
}
const liegend=m=>{ m.rotation.x=Math.PI/2; return m; };

/* ---------- Tiere und Gaukler (bewegt, nicht antippbar) ---------- */
function hund(k,weg,tempo){
  const g=gruppe(k.scene,0,0,0), F=0xb87a42, D=0x6a3c1c, H=0xf4e8d4, rumpf=gruppe(g,0,0,0);
  ball(rumpf,.38,F,0,.68,0,1.55,.92,.9); ball(rumpf,.25,H,.36,.58,0,1,1.1,1.05); ball(rumpf,.26,D,-.15,.84,0,1.3,.55,1);
  ball(rumpf,.3,F,.66,1.08,0); ball(rumpf,.17,H,.92,.99,0,1.35,.8,.95); ball(rumpf,.065,0x20140e,1.12,1.04,0);
  [-1,1].forEach(s=>{ ball(rumpf,.15,D,.58,1.06,s*.29,.8,1.55,.45); ball(rumpf,.042,0x20140e,.91,1.18,s*.13); });
  ball(rumpf,.07,0xe86878,1.0,.86,0,1.2,.35,.9);
  const hals=ring(rumpf,.22,.045,ROT,.52,.87,0); hals.rotation.set(Math.PI/2,.65,0,'YXZ'); ball(rumpf,.06,GOLD,.76,.74,0);
  backe(rumpf);
  const schwanz=gruppe(g,-.54,.82,0); strich(schwanz,[0,0,0],[-.3,.36,0],.075,F); ball(schwanz,.085,H,-.31,.37,0); backe(schwanz);
  const beine=[[.36,.2],[.36,-.2],[-.34,.2],[-.34,-.2]].map(p=>{ const b=gruppe(g,p[0],.55,p[1]); walze(b,.085,.5,F,0,-.25,0); ball(b,.11,H,.04,-.49,0,1.25,.6,1); backe(b); return b; });
  k.anim.push(t=>{ beine.forEach((b,i)=>b.rotation.z=Math.sin(t*7+(i%3?3.14:0))*.42); schwanz.rotation.x=Math.sin(t*11)*.45; });
  laeufer(k,g,weg,tempo,0,7);
}
function gaukler(k,x,z){
  const g=gruppe(k.scene,x,0,z), haut=0xf0c49a, A=0xd8323c, B=0x2e9a58, C=0xf2c230;
  const leib=gruppe(g,0,0,0);
  [[-1,A],[1,B]].forEach(([s,f])=>{ walze(leib,.13,.85,f,s*.17,.52,0); ball(leib,.15,s<0?B:A,s*.17,.1,.1,1,.65,1.7); ball(leib,.07,C,s*.17,.14,.38);
    box(leib,.27,.8,.42,f,s*.135,1.34,0); ball(leib,.17,s<0?B:A,s*.3,1.68,0); });
  for(let i=0;i<10;i++){ const a=i/10*6.283; const e=kegel(leib,.1,.26,i%2?C:CREME,Math.cos(a)*.23,1.74,Math.sin(a)*.23); e.rotation.set(Math.sin(a)*1.9,0,-Math.cos(a)*1.9); }
  walze(leib,.34,.09,C,0,.98,0);
  ball(leib,.3,haut,0,2.07,0); [-.11,.11].forEach(v=>ball(leib,.04,0x20140e,v,2.11,.28)); ball(leib,.065,0xd86060,0,2.02,.3);
  const mund=ring(leib,.1,.018,0x8a3030,0,1.97,.27,Math.PI); mund.rotation.z=Math.PI;
  /* Narrenkappe mit drei Zipfeln und Glöckchen */
  walze(leib,.29,.12,C,0,2.28,-.02);
  [[-1,A],[0,B],[1,A]].forEach(([s,f])=>{ const e=[s*.52,s?2.55:2.86,s?0:-.2]; strich(leib,[s*.14,2.3,0],[s*.36,s?2.64:2.62,-.04],.1,f); strich(leib,[s*.36,s?2.64:2.62,-.04],e,.065,f); ball(leib,.09,GOLD,e[0],e[1]-.03,e[2]); });
  backe(leib);
  const arme=[-1,1].map(s=>{ const a=gruppe(g,s*.34,1.66,0); strich(a,[0,0,0],[s*.24,-.34,.04],.085,s<0?B:A); strich(a,[s*.24,-.34,.04],[s*.2,-.34,.46],.07,s<0?A:B); ball(a,.095,haut,s*.2,-.34,.5); backe(a); return a; });
  const baelle=[0xe5243b,0x2f7fe8,0xffc21a,0xb24ae0].map(f=>ball(g,.14,f,0,1.5,.55));
  k.anim.push(t=>{ baelle.forEach((b,i)=>{ const u=(t*.75+i*.5)%2, s=u<1?1:-1, p=u%1; b.position.set(s*(-.54+1.08*p),1.42+Math.sin(p*Math.PI)*(1.55+(i%2)*.12),.52+(i%2)*.04); });
    arme.forEach((a,i)=>{ a.rotation.x=Math.sin(t*4.7+i*3.14)*.22; }); leib.position.y=Math.abs(Math.sin(t*2.35))*.025; });
  k.kreis(x,z,.62);
}

function baue(k){
  const sc=k.scene, B=36, T=27, H=6.5;

  /* ---------- Hülle: heller Stein und Parkett (kein Schachmuster, damit nichts mit dem Schachbrett verwechselt wird) ---------- */
  const wandBild=bild(512,512,g=>{ g.fillStyle='#a8957a'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ let x=(r%2)*-64; while(x<512){ const w=128, h=Math.floor(zufall()*22);
      const mal=xx=>{ g.fillStyle='rgb('+(214+h)+','+(198+h)+','+(168+h)+')'; g.fillRect(xx+2,r*64+2,w-4,60); g.fillStyle='rgba(255,255,255,.28)'; g.fillRect(xx+2,r*64+2,w-4,5); g.fillStyle='rgba(90,60,30,.14)'; g.fillRect(xx+2,r*64+55,w-4,7);
        for(let i=0;i<20;i++){ g.fillStyle=i%2?'rgba(110,80,40,.13)':'rgba(255,255,255,.18)'; g.fillRect(xx+8+((i*37)%(w-18)),r*64+8+((i*23)%44),5,3); } };
      mal(x); if(x<0) mal(x+512); x+=w; } } });
  const parkett=bild(1024,768,g=>{ const F=['#b9813f','#c8924c','#a97236','#d09c58','#b27a3a'];
    for(let j=0;j<8;j++) for(let i=0;i<10;i++){ const x=i*102.4, y=j*96, quer=(i+j)%2; g.save(); g.beginPath(); g.rect(x,y,102.4,96); g.clip();
      for(let s=0;s<4;s++){ g.fillStyle=F[(i*3+j*5+s*2)%5]; if(quer) g.fillRect(x,y+s*24,102.4,24); else g.fillRect(x+s*25.6,y,25.6,96);
        g.fillStyle='rgba(70,38,12,.45)'; if(quer) g.fillRect(x,y+s*24,102.4,2); else g.fillRect(x+s*25.6,y,2,96);
        g.fillStyle='rgba(255,235,190,.16)'; if(quer) g.fillRect(x+8,y+s*24+10,70,3); else g.fillRect(x+s*25.6+10,y+10,3,66); }
      g.restore(); g.strokeStyle='rgba(60,30,10,.6)'; g.lineWidth=2; g.strokeRect(x,y,102.4,96); } });
  const H_=BURG.huelle(k,{ B,T,H, himmel:0xfff3dc, grund:0x8a6c50, staerke:.76, sonne:0xfff0d4, sonneStaerke:.42, wandBild, bodenBild:parkett, bodenWdh:[B/12,T/9], oeffnung:{x:0,b:4,h:3.3}, leiste:0x9a825e });
  const hinten=H_.hinten, links=H_.links, rechts=H_.rechts;
  sc.background=new THREE.Color(0x241a22);

  /* ---------- Wandzier: Goldfries, Pfeiler, Eckdienste ---------- */
  const zH=gruppe(hinten,0,0,0), zL=gruppe(links,0,0,0), zR=gruppe(rechts,0,0,0);
  box(zH,B,.16,.12,GOLD2,0,H-.55,-T/2+.07); box(zH,B,.1,.1,ROT2,0,H-.8,-T/2+.06);
  [-1,1].forEach(s=>box(zH,14.6,.28,.18,0x9a825e,s*10.6,.14,-T/2+.06));
  for(let x=-17.4;x<=17.4;x+=1.45) box(zH,.3,.3,.08,GOLD,x,H-.3,-T/2+.05).rotation.z=Math.PI/4;
  [[zL,-1],[zR,1]].forEach(([w,s])=>{ box(w,.12,.16,T,GOLD2,s*(B/2-.07),H-.55,0); box(w,.1,.1,T,ROT2,s*(B/2-.06),H-.8,0);
    for(let z=-12.6;z<=12.8;z+=1.45) box(w,.08,.3,.3,GOLD,s*(B/2-.05),H-.3,z).rotation.x=Math.PI/4;
    [-12,-4.6,2.4,9.4].forEach(z=>{ box(w,.28,H-.9,.7,MARMOR,s*(B/2-.14),(H-.9)/2,z); box(w,.44,.3,.9,GOLD2,s*(B/2-.2),.15,z); box(w,.44,.26,.9,GOLD,s*(B/2-.2),H-1,z); }); });
  [-1,1].forEach(s=>{ walze(zH,.36,H,MARMOR,s*(B/2-.14),H/2,-T/2+.14); walze(zH,.46,.32,GOLD2,s*(B/2-.14),.16,-T/2+.14); walze(zH,.46,.26,GOLD,s*(B/2-.14),H-.13,-T/2+.14); k.kreis(s*(B/2-.14),-T/2+.14,.4); });
  [zH,zL,zR].forEach(w=>backe(w,true));

  /* ---------- Buntglasfenster mit Vorhängen und farbigem Licht ---------- */
  const glas=bild(256,384,g=>{ const F=['#e0414e','#3a6fd0','#f2c43c','#3fae62','#9a58c0','#f08a38','#58c0d8'];
    g.fillStyle='#2e2620'; g.fillRect(0,0,256,384); g.save(); g.beginPath(); g.moveTo(0,384); g.lineTo(0,128); g.arc(128,128,128,Math.PI,0); g.lineTo(256,384); g.closePath(); g.clip();
    for(let r=0;r<8;r++) for(let i=0;i<5;i++){ const x=i*52-(r%2)*26, y=r*50; g.fillStyle=F[(i*2+r*3)%7]; g.beginPath(); g.moveTo(x+26,y); g.lineTo(x+52,y+25); g.lineTo(x+26,y+50); g.lineTo(x,y+25); g.closePath(); g.fill(); g.fillStyle=F[(i+r*5+3)%7]; g.fillRect(x+40,y+36,24,28); g.strokeStyle='#2e2620'; g.lineWidth=4; g.stroke(); g.strokeRect(x+40,y+36,24,28); }
    g.fillStyle='#ffe07a'; g.beginPath(); g.arc(128,130,46,0,6.283); g.fill(); g.lineWidth=7; g.stroke();
    for(let i=0;i<8;i++){ const a=i*Math.PI/4; g.beginPath(); g.moveTo(128,130); g.lineTo(128+Math.cos(a)*46,130+Math.sin(a)*46); g.stroke(); }
    g.restore(); g.lineWidth=10; g.beginPath(); g.moveTo(128,0); g.lineTo(128,84); g.moveTo(128,176); g.lineTo(128,384); g.stroke(); });
  const glasMat=new THREE.MeshBasicMaterial({map:glas,transparent:true});
  const fleck=bild(128,128,g=>{ const F=['#ff5060','#4a80ff','#ffd040','#40d070','#b060ff','#ff9040'];
    for(let r=0;r<3;r++) for(let i=0;i<2;i++){ const v=g.createRadialGradient(40+i*46,26+r*38,2,40+i*46,26+r*38,30); v.addColorStop(0,F[r*2+i]); v.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=v; g.fillRect(0,0,128,128); } });
  const fensterG=gruppe(hinten,0,0,0);
  [-15.4,-6.4,6.4,15.4].forEach((x,i)=>{
    const z=-T/2;
    for(let j=0;j<=8;j++){ const a=Math.PI*j/8, s=box(fensterG,.46,.28,.24,j%2?0xb8a484:0xcdbb9a,x+Math.cos(a)*1.08,3.7+Math.sin(a)*1.08,z+.1); s.rotation.z=a-Math.PI/2; }
    [-1,1].forEach(s=>box(fensterG,.26,2,.24,0xc4b292,x+s*1.08,2.7,z+.1)); box(fensterG,2.6,.22,.42,0xb8a484,x,1.62,z+.18);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(1.92,2.9),glasMat); m.position.set(x,3.2,z+.03); fensterG.add(m);
    /* Vorhänge in Falten, mit goldenen Raffbändern */
    walze(fensterG,.05,3.5,GOLD,x,4.98,z+.34).rotation.z=Math.PI/2; [-1,1].forEach(s=>ball(fensterG,.11,GOLD,x+s*1.78,4.98,z+.34));
    [-1,1].forEach(s=>{ for(let j=0;j<3;j++){ const px=x+s*(1.22+j*.17); strich(fensterG,[px,4.95,z+.3],[x+s*1.45+s*j*.05,2.7,z+.3],.11,j%2?ROT2:ROT); strich(fensterG,[x+s*1.45+s*j*.05,2.7,z+.3],[px+s*.05,1.2,z+.3],.1,j%2?ROT2:ROT); }
      box(fensterG,.5,.14,.28,GOLD,x+s*1.5,2.7,z+.32); });
    const farbe=[0xff9aa0,0x9ab8ff,0xffe090,0xa8ffc0][i];
    const strahl=new THREE.Mesh(new THREE.CylinderGeometry(.55,1.5,5,16,1,true),basis(farbe,{transparent:true,opacity:.055,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
    strahl.position.set(x,1.85,z+1.9); strahl.rotation.x=-.72; hinten.add(strahl);
    const f=new THREE.Mesh(new THREE.PlaneGeometry(3.2,3),new THREE.MeshBasicMaterial({map:fleck,transparent:true,opacity:.42,depthWrite:false,blending:THREE.AdditiveBlending})); f.rotation.x=-Math.PI/2; f.position.set(x,.075,z+3.8); sc.add(f);
  });
  backe(fensterG,true);

  /* tanzende Staubflöckchen im Fensterlicht */
  const staub=new THREE.InstancedMesh(GEO.box,basis(0xfff4c8),64), o=new THREE.Object3D(), korn=[];
  for(let i=0;i<64;i++) korn.push([[-15.4,-6.4,6.4,15.4][i%4]+(zufall()-.5)*1.8, .6+zufall()*3, -12.6+zufall()*2.4, zufall()*6.28]);
  staub.frustumCulled=false; sc.add(staub);
  k.anim.push(t=>{ korn.forEach((p,i)=>{ o.position.set(p[0]+Math.sin(t*.4+p[3])*.3, p[1]+Math.sin(t*.7+p[3]*2)*.25, p[2]+Math.cos(t*.3+p[3])*.25); o.scale.setScalar(.025); o.rotation.set(t+p[3],t,0); o.updateMatrix(); staub.setMatrixAt(i,o.matrix); }); staub.instanceMatrix.needsUpdate=true; });

  /* ---------- wehende Banner (Stoff mit Sinnbildern) ---------- */
  const bannerBild=(grund,zier,art)=>bild(128,320,g=>{ g.fillStyle=grund; g.beginPath(); g.moveTo(0,0); g.lineTo(128,0); g.lineTo(128,320); g.lineTo(64,272); g.lineTo(0,320); g.closePath(); g.fill();
    g.strokeStyle=zier; g.lineWidth=9; g.stroke(); g.fillStyle=zier; g.fillRect(0,34,128,9); g.fillRect(0,214,128,9);
    if(art===0){ g.beginPath(); g.arc(64,128,26,0,6.283); g.fill(); for(let i=0;i<12;i++){ const a=i*Math.PI/6; g.beginPath(); g.moveTo(64+Math.cos(a-.14)*32,128+Math.sin(a-.14)*32); g.lineTo(64+Math.cos(a)*52,128+Math.sin(a)*52); g.lineTo(64+Math.cos(a+.14)*32,128+Math.sin(a+.14)*32); g.fill(); } }
    else if(art===1){ g.beginPath(); g.moveTo(22,160); g.lineTo(18,92); g.lineTo(42,122); g.lineTo(64,82); g.lineTo(86,122); g.lineTo(110,92); g.lineTo(106,160); g.closePath(); g.fill(); g.fillRect(22,168,84,14); }
    else if(art===2){ g.beginPath(); for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, r=i%2?22:50; g.lineTo(64+Math.cos(a)*r,128+Math.sin(a)*r); } g.fill(); }
    else { for(let i=0;i<5;i++){ const a=i*1.2566; g.beginPath(); g.arc(64+Math.cos(a)*28,128+Math.sin(a)*28,20,0,6.283); g.fill(); } g.fillStyle=grund; g.beginPath(); g.arc(64,128,15,0,6.283); g.fill(); } });
  const bannerMat=[['#b02a34','#f4d070',0],['#27509a','#f4ecd8',1],['#2e7a48','#f4d070',2],['#7a3a8a','#f4ecd8',3]].map(a=>new THREE.MeshLambertMaterial({map:bannerBild(a[0],a[1],a[2]),side:THREE.DoubleSide,alphaTest:.5}));
  const stoffe=[0,1,2].map(()=>new THREE.PlaneGeometry(1.15,3,6,12));
  const stangen=[gruppe(hinten,0,0,0),gruppe(links,0,0,0),gruppe(rechts,0,0,0)];
  const banner=(wand,x,z,dreh,art,phase)=>{ const w=[hinten,links,rechts][wand], g=gruppe(w,x,0,z); g.rotation.y=dreh;
    /* an der Rückwand schmaler, etwas höher und flacher (neben Löwen und Vorhängen) */
    const ab=wand?.52:.3, hoch=wand?0:.2; if(!wand) g.scale.x=.72;
    const m=new THREE.Mesh(stoffe[phase],bannerMat[art]); m.position.set(0,3.45+hoch,ab); g.add(m);
    const s=gruppe(stangen[wand],x,0,z); s.rotation.y=dreh; const b=wand?1:.72; walze(s,.055,1.45*b,GOLD,0,4.97+hoch,ab).rotation.z=Math.PI/2; [-1,1].forEach(v=>{ ball(s,.1,GOLD,v*.74*b,4.97+hoch,ab); strich(s,[v*.55*b,4.97+hoch,ab],[v*.55*b,5.2+hoch,.03],.025,GOLD2); }); };
  [[-13.25,0,0],[-8.75,1,1],[-4.2,2,2],[4.2,2,0],[8.75,1,2],[13.25,0,1]].forEach(([x,a,p])=>banner(0,x,-T/2,0,a,p));
  [-8.2,-1.2,5.9].forEach((z,i)=>{ banner(1,-B/2,z,Math.PI/2,[1,3,0][i],i); banner(2,B/2,i?z:-6.5,-Math.PI/2,[3,0,2][i],(i+1)%3); });
  stangen.forEach(w=>backe(w,true));
  k.anim.push(t=>stoffe.forEach((geo,n)=>{ const p=geo.attributes.position; for(let i=0;i<p.count;i++){ const x=p.getX(i), y=p.getY(i), u=(1.5-y)/3; p.setZ(i,Math.sin(t*2.1+u*5+x*2.4+n*2.1)*.15*u); } p.needsUpdate=true; }));

  /* Wandfackeln an den Seiten */
  [-4.6,9.4].forEach(z=>{ fackel(links,k,-B/2+.28,z,Math.PI/2); fackel(rechts,k,B/2-.28,z,-Math.PI/2); });
  [links,rechts].forEach(w=>w.traverse(m=>{ if(m.isMesh) m.castShadow=false; }));

  /* ---------- Kamin = Ausgang ---------- */
  const kamin=gruppe(hinten,0,0,0), KZ=-T/2;
  [-1,1].forEach(s=>{
    box(kamin,1.2,.4,1.34,0x9a8468,s*2.58,.2,KZ+.65);
    for(let i=0;i<6;i++) box(kamin,i%2?1.04:1.1,.46,i%2?1.16:1.22,i%2?0xc2ac8a:0xd8c6a4,s*2.55,.63+i*.47,KZ+.6);
    box(kamin,1.26,.2,1.36,GOLD2,s*2.57,3.34,KZ+.66);
    /* Konsolen unter dem Sims */
    box(kamin,.4,.3,.3,0x9a8468,s*2.55,3.08,KZ+1.28);
  });
  for(let i=0;i<9;i++) box(kamin,.46,i===4?.74:.56,.34,i%2?0xc2ac8a:0xe2d2b0,-1.84+i*.46,3.58+(i===4?-.05:0),KZ+1.02);
  box(kamin,6.5,.24,1.52,MARMOR,0,3.98,KZ+.74); box(kamin,6.2,.12,1.4,GOLD,0,3.82,KZ+.7);
  platte(kamin,[[-2.7,0],[2.7,0],[1.55,2.4],[-1.55,2.4]],.75,0xd2bf9c,0,4.1,KZ);
  box(kamin,3.5,.22,.95,GOLD2,0,H-.02,KZ+.47);
  /* goldene Sonne am Rauchfang und Zierkrüge auf dem Sims */
  liegend(walze(kamin,.5,.1,GOLD,0,4.95,KZ+.8)); for(let i=0;i<12;i++){ const a=i*Math.PI/6, s=kegel(kamin,.11,.42,GOLD2,Math.cos(a)*.74,4.95+Math.sin(a)*.74,KZ+.8); s.rotation.z=a-Math.PI/2; } liegend(walze(kamin,.26,.14,0xfff0b0,0,4.95,KZ+.82));
  [-2.7,-2.0,2.0,2.7].forEach((x,i)=>dreher(kamin,[[0,0],[.18,0],[.26,.2],[.12,.42],[.09,.55],[.17,.66]],i%2?BLAU:0x2e8a6a,x,4.1,KZ+1.05));
  [-1,1].forEach(s=>{ box(kamin,.16,3.3,.5,0x1c120e,s*1.97,1.65,KZ-.2); box(kamin,.06,3.3,1.1,0x1c120e,s*1.95,1.65,KZ+.55); });
  /* Haken für die Kette des Zahlenschlosses */
  box(kamin,.16,.16,.22,EISEN,0,3.55,KZ+1.24);
  backe(kamin,true);
  k.kasten(-2.55,KZ+.62,1.2,1.3); k.kasten(2.55,KZ+.62,1.2,1.3); k.kasten(0,KZ+.6,4,1.3);
  /* Herdplatte (flach, begehbar) */
  const herd=gruppe(sc,0,0,0); box(herd,6.6,.05,1.9,0x8a7660,0,.025,KZ+.95); box(herd,4,.06,.9,0x4a3a34,0,.04,KZ+.25); backe(herd,true);

  /* Geheimgang hinter dem Kamin */
  const gang=gruppe(sc,0,0,KZ);
  box(gang,4.6,.1,3.2,0x6a5648,0,-.045,-1.6);
  [-1,1].forEach(s=>{ for(let i=0;i<7;i++) box(gang,.4,.46,2.7,i%2?0x6a5a50:0x7c6a5c,s*2.2,.23+i*.48,-1.85); });
  box(gang,4.8,.35,2.7,0x4a3c34,0,3.5,-1.85);
  for(let i=0;i<5;i++) box(gang,3.9,.16,.34,i%2?0x9a846c:0xb29a7e,0,.08+i*.17,-1.55-i*.32);
  const ende=new THREE.Mesh(new THREE.PlaneGeometry(4.2,3.4),basis(0x7a4a20)); ende.position.set(0,1.7,-3.18); gang.add(ende);
  platte(gang,[[-.8,0],[.8,0],[.8,1.5],[.4,1.95],[0,2.08],[-.4,1.95],[-.8,1.5]],.04,0x2a1608,0,.8,-3.16);
  backe(gang,true);
  schein(gang,'rgba(255,200,110,.85)',0,2,-2.9,3.4);

  /* Feuer: verschwindet beim Öffnen */
  const feuer=gruppe(sc,0,0,KZ+.42);
  [-1.25,1.25].forEach(x=>{ box(feuer,.14,.34,.9,EISEN,x,.2,.15); ball(feuer,.13,GOLD2,x,.46,.5); });
  /* dicke Holzscheite mit hellen Schnittflächen, vorn und gekreuzt */
  [[0,.3,.43,.07],[-.15,.3,.05,-.2],[.2,.62,.38,-.22],[-.2,.66,.3,.3]].forEach(([x,y,z,d])=>{ const h=walze(feuer,.19,2.5,0x6b421e,x,y,z); h.rotation.set(0,d,Math.PI/2); [-1,1].forEach(v=>{ const e=walze(feuer,.15,.04,0xe0a060,x+v*1.26*Math.cos(d),y,z-v*1.26*Math.sin(d)); e.rotation.set(0,d,Math.PI/2); }); });
  backe(feuer,true);
  const FM=[basis(0xe8420a),basis(0xff8a10),basis(0xffd83a)];
  const zungen=[[-1.3,.7,1.2,0],[-.8,.95,2.0,0],[-.15,1.15,2.45,0],[.55,.95,2.1,0],[1.2,.75,1.35,0],[-1.0,.55,1.15,1],[-.4,.7,1.75,1],[.25,.7,1.9,1],[.9,.55,1.2,1],[-.55,.38,.9,2],[0,.45,1.25,2],[.55,.36,.85,2]].map(([x,r,h,f])=>{ const m=kegel(feuer,r*.5,h,FM[f],x,.45+h/2,f*.17); m.castShadow=false; return {m,r,h}; });
  const glut=schein(feuer,'rgba(255,120,20,.65)',0,1.2,.55,5);
  const feuerLicht=new THREE.PointLight(0xff7a20,1.1,12,1.5); feuerLicht.position.set(0,1.7,KZ+1.8); sc.add(feuerLicht);

  /* rußschwarze Feuerrückwand mit Glutschimmer: verdeckt den Geheimgang, solange der Kamin zu ist */
  const russBild=bild(256,208,g=>{ g.fillStyle='#0c0807'; g.fillRect(0,0,256,208);
    for(let r=0;r<9;r++) for(let i=-1;i<6;i++){ g.fillStyle=(r+i)%2?'#1a100c':'#150d0a'; g.fillRect(i*52+(r%2)*26+2,r*24+2,48,20); }
    const v=g.createRadialGradient(128,208,10,128,208,170); v.addColorStop(0,'rgba(255,110,20,.75)'); v.addColorStop(.5,'rgba(160,40,0,.35)'); v.addColorStop(1,'rgba(0,0,0,0)'); g.fillStyle=v; g.fillRect(0,0,256,208); });
  const russ=gruppe(sc,0,0,KZ); bildFlaeche(russ,russBild,4.04,3.34,0,1.67,-.02,true);

  /* niedriges Funkengitter mit wenigen dünnen Stäben */
  const gitter=gruppe(sc,0,0,KZ+1.12);
  for(let i=0;i<7;i++){ const x=-1.86+i*.62, rand=i===0||i===6; walze(gitter,rand?.05:.022,rand?.72:.52,0x2c2e36,x,rand?.36:.3,0); if(rand) ball(gitter,.09,GOLD,x,.76,0); }
  box(gitter,3.76,.05,.06,GOLD2,0,.56,0); box(gitter,3.76,.05,.06,0x3c4048,0,.12,0);
  backe(gitter,true);
  /* Zahlenschloss hängt oben an einer Kette (über dem Kopf der Spielfigur) */
  const schloss=gruppe(sc,0,2.5,KZ+1.3);
  for(let i=0;i<3;i++){ const g1=ring(schloss,.09,.025,0xaab4be,0,.66+i*.14,0); g1.rotation.y=i%2*Math.PI/2; g1.castShadow=false; }
  box(schloss,1.08,.88,.1,0x23242a,0,0,-.09); box(schloss,.94,.74,.22,0xe8b73a,0,0,0); ring(schloss,.28,.08,0xaab4be,0,.37,0,Math.PI);
  for(let i=0;i<3;i++){ box(schloss,.21,.28,.04,0xfff3cf,-.26+i*.26,-.05,.12); box(schloss,.07,.12,.02,0x4a3410,-.26+i*.26,-.05,.145); }
  backe(schloss,true);

  const tuer=BURG.ausgang(k,{ steh:[0,-11.35], durch:[0,-T/2-1.2], name:'Kamin', treffer:{x:0,y:1.75,z:KZ+1.25,b:4,h:3.5,t:.5}, schildOben:[0,4.75,KZ+1.9], glanz:[0,2.5,KZ+1.55],
    bewege:(auf,t)=>{
      /* Feuer geht aus, Funkengitter und Rückwand versinken, das Schloss wird hochgezogen */
      const a=Math.min(1,auf*1.08);
      gitter.scale.y=Math.max(.02,1-a*1.1); gitter.visible=a<.85;
      russ.scale.y=Math.max(.02,1-a*1.1); russ.visible=a<.85; gang.visible=a>.01;
      schloss.position.y=2.5+a*1.2; schloss.visible=a<.35;
      const glimm=Math.max(0,1-a*1.25);
      feuer.visible=glimm>.02; feuer.scale.y=Math.max(.02,glimm);
      zungen.forEach((z,i)=>{ const s=1+Math.sin(t*(8+i%4*2.3)+i*1.7)*.18; z.m.scale.y=z.h*s; z.m.position.y=.45+z.h*s/2; z.m.rotation.z=Math.sin(t*5+i)*.08; });
      glut.scale.set(5+Math.sin(t*9)*.35,4.4+Math.sin(t*7)*.35,1);
      feuerLicht.intensity=1.1*glimm*(1+Math.sin(t*11)*.09+Math.sin(t*6.3)*.07);
    } });

  /* Steinlöwen neben dem Kamin (sitzend, mit großer Zackenmähne und Schwanzquaste) */
  [-1,1].forEach(s=>{ const g=gruppe(sc,s*3.75,0,KZ+.75); const F=0xdcb870, M=0x8a4e16, M2=0xac6a1e;
    box(g,1.1,.7,1.2,0x9a8468,0,.35,0); box(g,1.24,.14,1.34,GOLD2,0,.76,0);
    ball(g,.4,F,0,1.18,-.12,1,1,1.15); ball(g,.3,F,0,1.45,.16,1,1.2,.9);
    [-1,1].forEach(v=>{ strich(g,[v*.2,1.45,.28],[v*.22,.9,.44],.1,F); ball(g,.12,F,v*.22,.9,.48,1,.7,1.3); ball(g,.2,F,v*.34,1.0,-.05,.8,.9,1.4); });
    /* Mähne: dunkle Scheibe mit zwei Kränzen spitzer Zacken, auch als Brustlatz */
    ball(g,.5,M,0,1.92,.1,1,1.05,.5);
    for(let i=0;i<13;i++){ const a=i/13*6.283+.12, z=kegel(g,.13,.34,M,Math.cos(a)*.52,1.92+Math.sin(a)*.54,.1); z.rotation.z=a-Math.PI/2;
      const b=a+.24, z2=kegel(g,.11,.24,M2,Math.cos(b)*.39,1.92+Math.sin(b)*.41,.3); z2.rotation.z=b-Math.PI/2; }
    [-.18,0,.18].forEach((x,i)=>{ kegel(g,.12,i===1?.46:.34,M2,x,i===1?1.4:1.46,.4).rotation.x=Math.PI; });
    ball(g,.28,F,0,1.92,.34,1,1.05,.8); [-1,1].forEach(v=>ball(g,.1,0xf0dcae,v*.08,1.82,.55,1,.85,.8)); ball(g,.065,0x3a2414,0,1.9,.63,1.3,.8,.8); box(g,.12,.025,.03,0x3a2414,0,1.73,.58);
    [-1,1].forEach(v=>{ ball(g,.075,F,v*.25,2.19,.34,1,1,.6); ball(g,.042,0x2a1a0c,v*.11,2.01,.555); strich(g,[v*.04,2.12,.57],[v*.2,2.07,.54],.028,M); });
    /* Schwanz liegt außen um den Sockel nach vorn */
    strich(g,[s*.2,.93,-.5],[s*.52,.9,-.25],.065,F); strich(g,[s*.52,.9,-.25],[s*.52,.9,.4],.065,F); strich(g,[s*.52,.9,.4],[s*.46,1.12,.58],.06,F);
    ball(g,.14,M,s*.45,1.2,.62,1,1.25,1); kegel(g,.09,.24,M,s*.44,1.42,.62);
    backe(g); k.kasten(s*3.75,KZ+.75,1.15,1.25); });

  /* ---------- roter Läufer vom Eingang zum Kamin ---------- */
  const flur=gruppe(sc,0,0,0);
  box(flur,3,.02,23.2,ROT,0,.012,.05); [-1,1].forEach(s=>{ box(flur,.18,.024,23.2,GOLD,s*1.36,.016,.05); box(flur,.07,.024,23.2,ROT2,s*1.14,.017,.05); });
  for(let z=-9.6;z<=10.8;z+=2.55){ const r=box(flur,.62,.024,.62,GOLD2,0,.018,z); r.rotation.y=Math.PI/4; const r2=box(flur,.32,.028,.32,ROT2,0,.02,z); r2.rotation.y=Math.PI/4; }
  for(let i=0;i<13;i++) box(flur,.09,.02,.34,GOLD,-1.38+i*.23,.012,11.82);
  /* runde Teppiche */
  [[-12.9,8,3,0x27509a],[-8.5,9.8,1.5,0x7a3a8a],[13,7.9,2.2,0x2e7a48],[10,-8.5,1.8,0x27509a],[-8.8,-1.8,2,0x2e7a48]].forEach(([x,z,r,f],i)=>{ walze(flur,r,.012,GOLD2,x,.008+i*.001,z); walze(flur,r-.18,.014,f,x,.012+i*.001,z); walze(flur,r*.55,.016,CREME,x,.014+i*.001,z); walze(flur,r*.4,.018,f,x,.016+i*.001,z); });
  backe(flur,true);

  /* ---------- Marmorsäulen (werden durchsichtig, wenn sie verdecken) ---------- */
  [-4.2,4.2].forEach(x=>[-7,-1.8,6.8].forEach(z=>{
    const g=gruppe(sc,x,0,z);
    box(g,1.2,.3,1.2,0xa89478,0,.15,0); walze(g,.55,.22,GOLD2,0,.4,0);
    rohr(g,.36,.43,4.5,MARMOR,0,2.75,0,16);
    for(let i=0;i<8;i++){ const a=i*Math.PI/4; strich(g,[Math.cos(a)*.42,.55,Math.sin(a)*.42],[Math.cos(a)*.355,4.9,Math.sin(a)*.355],.035,0xd6cab4); }
    [.62,4.82].forEach(y=>{ liegend(ring(g,.43,.06,GOLD,0,y,0)); });
    rohr(g,.62,.38,.42,GOLD,0,5.18,0,16); box(g,1.2,.24,1.2,MARMOR,0,5.5,0); ball(g,.22,GOLD,0,5.82,0);
    backe(g); k.kasten(x,z,1.2,1.2); k.verdecker(g,x,z,.65);
  }));

  /* ---------- Kronleuchter hoch oben nahe der Rückwand ---------- */
  [-8.6,8.6].forEach((x,n)=>{
    const g=gruppe(sc,x,5.5,-11.4);
    for(let i=0;i<6;i++){ const r=ring(g,.09,.025,GOLD2,0,.5+i*.17,0); r.rotation.y=i%2*Math.PI/2; }
    ball(g,.22,GOLD,0,.1,0); liegend(ring(g,1,.07,GOLD,0,0,0)); liegend(ring(g,.5,.05,GOLD2,0,.36,0));
    const fm=basis(0xffd860);
    for(let i=0;i<8;i++){ const a=i*Math.PI/4, px=Math.cos(a), pz=Math.sin(a); strich(g,[0,.1,0],[px,0,pz],.035,GOLD2); walze(g,.13,.05,GOLD,px,.07,pz); walze(g,.055,.28,CREME,px,.22,pz); kegel(g,.065,.2,fm,px,.46,pz).castShadow=false; ball(g,.075,i%2?0xbfe4ff:0xff9aa8,px*.8,-.22,pz*.8,1,1.6,1); strich(g,[px*.8,-.02,pz*.8],[px*.8,-.18,pz*.8],.008,SILBER); }
    ball(g,.17,0xbfe4ff,0,-.3,0,1,1.4,1);
    backe(g,true); verschmelzeLicht(g,fm);
    schein(g,'rgba(255,214,130,.55)',0,.35,0,2.8);
    k.anim.push(t=>{ g.rotation.z=Math.sin(t*.7+n*2)*.02; g.rotation.y=Math.sin(t*.25+n)*.25; });
    BURG.flacker(k,x,4.8,-10.2,0xffcf80,.38,13);
  });
  /* alle Flammen eines Leuchters zu einem Körper */
  function verschmelzeLicht(g,m){ const teile=g.children.filter(c=>c.material===m); if(teile.length<2) return; const P=[];
    teile.forEach(c=>{ c.updateMatrix(); const q=c.geometry.toNonIndexed(); q.applyMatrix4(c.matrix); const a=q.attributes.position.array; for(let i=0;i<a.length;i++) P.push(a[i]); q.dispose(); g.remove(c); });
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); g.add(new THREE.Mesh(geo,m)); }
  /* farbiges Licht von den Fenstern */
  [[-10,0xff7080],[10,0x7096ff]].forEach(([x,f])=>{ const l=new THREE.PointLight(f,.32,13,1.5); l.position.set(x,3.2,-9.6); sc.add(l); });

  /* ---------- Möbel und Schmuck ---------- */
  /* gepolsterte Bänke an den Seitenwänden */
  const baenke=gruppe(sc,0,0,0);
  [[-1,-10.05,3],[-1,3.9,2.8],[-1,9.9,2.6],[1,-5.8,2.4],[1,10.1,2.8]].forEach(([s,z,l],i)=>{ const x=s*17.25, f=i%2?BLAU:ROT;
    box(baenke,.95,.16,l,HOLZ,x,.55,z); box(baenke,.8,.18,l-.2,f,x-s*.03,.72,z); box(baenke,.16,.9,l,HOLZ2,x+s*.42,1.05,z); box(baenke,.2,.14,l+.1,GOLD2,x+s*.42,1.55,z);
    [-1,1].forEach(v=>{ box(baenke,.9,.5,.16,HOLZ2,x,.25,z+v*(l/2-.15)); box(baenke,.95,.14,.18,HOLZ,x,.98,z+v*(l/2-.09)); ball(baenke,.12,GOLD,x-s*.42,1.1,z+v*(l/2-.09)); });
    const kz=z+l/2-.6, ki=box(baenke,.16,.5,.55,i%2?ROT:BLAU,x+s*.2,1.05,kz); ki.rotation.z=-s*.22; [-1,1].forEach(a=>[-1,1].forEach(b=>ball(baenke,.045,GOLD,x+s*.2+s*b*.055,1.05+b*.245,kz+a*.27))); ball(baenke,.05,GOLD,x+s*.1,1.04,kz);
    k.kasten(x,z,.95,l+.1); });
  backe(baenke);

  /* Blumenvasen an der Rückwand und bei den Säulen */
  const vasen=gruppe(sc,0,0,0);
  const vase=(x,z,f)=>{ walze(vasen,.42,.14,0x9a8468,x,.07,z); dreher(vasen,[[0,0],[.24,0],[.42,.34],[.4,.62],[.2,.88],[.18,1.02],[.32,1.14]],f,x,.14,z); liegend(ring(vasen,.4,.035,GOLD,x,.62,z));
    const bl=[0xe8384a,0xffd23a,0xf6f0ff,0xb858e0,0xff8a30];
    for(let i=0;i<11;i++){ const a=i*2.4, r=i?.18+(i%3)*.14:0, px=x+Math.cos(a)*r, pz=z+Math.sin(a)*r*.8, y=1.75+(i%4)*.11-(r>.3?.12:0); strich(vasen,[x,1.18,z],[px,y,pz],.018,0x3c7a30); ball(vasen,.12,bl[(i+Math.round(Math.abs(x)))%5],px,y,pz,1,.75,1); ball(vasen,.05,GOLD,px,y+.08,pz); if(i%2) ball(vasen,.13,0x4f9a3c,(px+x)/2,(y+1.2)/2,(pz+z)/2,1.2,.4,.8); }
    k.kreis(x,z,.45); };
  [[-6.4,-12.55,BLAU],[6.4,-12.55,BLAU],[-8.75,-12.65,0x2e8a6a],[8.75,-12.65,0x2e8a6a],[-10.4,12.4,ROT],[10.4,12.4,ROT],[17.15,7.9,BLAU],[-17.1,-1.9,ROT]].forEach(a=>vase(a[0],a[1],a[2]));
  backe(vasen,true);

  /* Bäumchen in Holzkübeln in den Ecken */
  const gruen=gruppe(sc,0,0,0);
  [[-16.85,-12.3],[16.85,-12.3],[-16.85,12.4],[16.85,12.4]].forEach(([x,z])=>{ const b=gruppe(sc,x,0,z); rohr(b,.52,.4,.65,HOLZ,0,.33,0,14); [.15,.54].forEach(y=>liegend(ring(b,.45+y*.1,.035,EISEN,0,y,0))); walze(b,.48,.04,0x4a3220,0,.65,0); walze(b,.08,.6,HOLZ2,0,.95,0); ball(b,.52,0x3f8a3a,0,1.5,0); ball(b,.37,0x4f9e46,.07,1.97,.04); ball(b,.21,0x62b054,0,2.33,0); for(let i=0;i<9;i++) ball(b,.065,0xf4a028,Math.cos(i*2.4)*.47,1.32+(i%4)*.2,Math.abs(Math.sin(i*2.4))*.36+.08); backe(b,true); k.kreis(x,z,.65); k.verdecker(b,x,z,.55); });
  /* niedrige Blumenkästen am vorderen Rand */
  [-13.6,-6.3,6.3,13.6].forEach((x,n)=>{ box(gruen,2.6,.42,.7,0x9a825e,x,.21,12.95); box(gruen,2.7,.08,.8,GOLD2,x,.45,12.95); for(let i=0;i<9;i++){ const px=x-1.1+i*.275; ball(gruen,.2,i%2?0x3f8a3a:0x57a648,px,.58,12.95,1,.8,1); ball(gruen,.1,[0xe8384a,0xffd23a,0xf6f0ff][(i+n)%3],px,.77,12.95+(i%2?.14:-.1)); } k.kasten(x,12.95,2.7,.8); });
  backe(gruen);

  /* Spinnrad an der linken Wand (Rad dreht sich) */
  const rad=gruppe(sc,-17,0,.7);
  box(rad,.8,.14,1.7,HOLZ,0,.62,.05); [[-.28,-.7],[.28,-.7],[-.28,.75],[.28,.75]].forEach(([x,z])=>strich(rad,[x,.6,z*.8],[x*1.5,0,z],.06,HOLZ2));
  [-1,1].forEach(s=>strich(rad,[s*.2,.6,-.4],[s*.2,1.45,-.4],.06,HOLZ2)); strich(rad,[0,.65,.65],[0,1.25,.65],.06,HOLZ); ball(rad,.24,CREME,0,1.38,.65,1,1.35,1); kegel(rad,.07,.3,HOLZ2,0,1.78,.65);
  strich(rad,[.22,1.45,-.4],[.05,1.38,.65],.008,CREME); walze(rad,.07,.55,HOLZ2,0,1.45,-.4).rotation.z=Math.PI/2; backe(rad); k.kasten(-17,.45,1.1,2.4);
  const speichen=gruppe(rad,.3,1.45,-.4); ring(speichen,.72,.06,HOLZ,0,0,0).rotation.y=Math.PI/2; for(let i=0;i<4;i++) box(speichen,.05,1.4,.07,HOLZ2,0,0,0).rotation.x=i*Math.PI/4; ball(speichen,.13,GOLD2,0,0,0); backe(speichen);
  k.anim.push(t=>{ speichen.rotation.x=t*1.4; });

  /* Bücherschrank und Truhe an der rechten Wand */
  const moebel=gruppe(sc,0,0,0);
  box(moebel,.16,2.9,2.7,HOLZ2,17.86,1.45,-9.6); [-1,1].forEach(s=>box(moebel,.8,2.9,.14,HOLZ,17.45,1.45,-9.6+s*1.35));
  [.15,.85,1.55,2.25,2.9].forEach(y=>box(moebel,.82,.1,2.84,HOLZ,17.45,y,-9.6)); box(moebel,.96,.16,3,GOLD2,17.42,3.04,-9.6);
  for(let r=0;r<4;r++){ let z=-10.85; for(let i=0;z<-8.45;i++){ const d=.14+((i*7+r*3)%4)*.035, h=.42+((i+r*2)%3)*.07; box(moebel,.5,h,d,[ROT,BLAU,0x2e7a48,0x7a3a8a,0xa86a2a][(i+r*2)%5],17.4,.2+r*.7+h/2,z+d/2); z+=d+.025; } }
  k.kasten(17.45,-9.6,.95,2.9);
  /* Wäschetruhe mit Kissen */
  box(moebel,1.05,.75,2,HOLZ,17.1,.4,-1.9); const deckel=walze(moebel,.52,2,HOLZ,17.1,.77,-1.9); deckel.rotation.x=Math.PI/2; deckel.scale.set(.52,2,.3);
  [-.75,0,.75].forEach(z=>box(moebel,1.1,.82,.12,EISEN,17.1,.42,-1.9+z)); box(moebel,.1,.26,.24,GOLD,16.55,.62,-1.5); k.kasten(17.1,-1.9,1.1,2.05);
  /* Notenpult und Hocker in der Musikecke, Kissen für den Gaukler */
  walze(moebel,.34,.08,HOLZ2,-15.9,.04,9.2); walze(moebel,.06,1.25,HOLZ2,-15.9,.65,9.2); const pult=box(moebel,.9,.65,.07,HOLZ,-15.9,1.45,9.2); pult.rotation.set(-.4,.5,0,'YXZ');
  const noten=bild(256,176,c=>{ c.fillStyle='#fdf6e2'; c.fillRect(0,0,256,176); c.fillStyle='#b89860'; c.fillRect(126,0,4,176); c.strokeStyle='#1a1410'; c.fillStyle='#1a1410';
    for(let seite=0;seite<2;seite++) for(let z=0;z<3;z++){ const x=10+seite*128, y=22+z*54; c.lineWidth=2; for(let l=0;l<5;l++){ c.beginPath(); c.moveTo(x,y+l*8); c.lineTo(x+108,y+l*8); c.stroke(); }
      for(let n=0;n<4;n++){ const nx=x+16+n*26, ny=y+8+((n*3+z*2+seite)%5)*4; c.beginPath(); c.ellipse(nx,ny,8,6,-.4,0,6.283); c.fill(); c.lineWidth=3; c.beginPath(); c.moveTo(nx+7,ny); c.lineTo(nx+7,ny-24); c.stroke(); } } });
  const blatt=bildFlaeche(moebel,noten,.8,.55,-15.877,1.47,9.242); blatt.rotation.set(-.4,.5,0,'YXZ'); k.kreis(-15.9,9.2,.45);
  [[-11.4,5.8,ROT],[-11.3,10.2,BLAU]].forEach(([x,z,f])=>{ walze(moebel,.42,.14,HOLZ,x,.55,z); ball(moebel,.4,f,x,.67,z,1,.35,1); for(let i=0;i<3;i++){ const a=i*2.094; strich(moebel,[x+Math.cos(a)*.22,.5,z+Math.sin(a)*.22],[x+Math.cos(a)*.36,0,z+Math.sin(a)*.36],.06,HOLZ2); } k.kreis(x,z,.45); });
  /* Korb mit Bällen und Reifen beim Gaukler */
  rohr(moebel,.45,.34,.5,0xb8874a,-10.2,.25,12.1,14); [[-.16,0,0xe5243b],[.18,.05,0x2f7fe8],[0,-.18,0xffc21a],[.02,.16,0x14b860]].forEach(([a,b,f])=>ball(moebel,.18,f,-10.2+a,.55,12.1+b)); k.kreis(-10.2,12.1,.48);
  backe(moebel);

  /* schlafende Katze auf einem Samtkissen neben dem Kamin */
  const ruhe=gruppe(sc,-6.7,0,-10.6);
  ball(ruhe,.75,ROT,0,.18,0,1.15,.3,.9); [[-.82,-.6],[.82,-.6],[-.82,.6],[.82,.6]].forEach(([x,z])=>ball(ruhe,.1,GOLD,x*.85,.14,z*.85)); backe(ruhe); k.kreis(-6.7,-10.6,.8);
  const mieze=gruppe(ruhe,0,.34,0), KF=0x9a9aa6, KD=0x6a6a78;
  ball(mieze,.4,KF,-.05,.2,0,1.3,.75,1); [-.25,0,.2].forEach(x=>ball(mieze,.3,KD,x,.27,0,.14,.92,1.04)); ball(mieze,.25,KF,.42,.22,.22); ball(mieze,.11,CREME,.52,.14,.4,1.2,.7,.8); ball(mieze,.03,0xe87888,.55,.18,.49);
  [-1,1].forEach(s=>{ kegel(mieze,.09,.18,KF,.42+s*.15,.47,.2); box(mieze,.1,.018,.02,0x20202a,.43+s*.11,.25,.455); });
  [[-.45,.1,-.1,-.5,.08,.3],[-.5,.08,.3,-.1,.07,.46],[-.1,.07,.46,.2,.07,.46]].forEach(s=>strich(mieze,[s[0],s[1],s[2]],[s[3],s[4],s[5]],.075,KF)); ball(mieze,.09,KD,.2,.07,.46);
  backe(mieze);
  k.anim.push(t=>{ mieze.scale.y=1+Math.sin(t*1.8)*.05; });

  /* zwei Standfahnen am Eingang (Tuch weht) */
  const fahnen=gruppe(sc,0,0,0);
  [-1,1].forEach((s,i)=>{ const x=s*2.75, z=12.1; walze(fahnen,.32,.2,0x9a825e,x,.1,z); walze(fahnen,.055,3.3,GOLD2,x,1.75,z); ball(fahnen,.13,GOLD,x,3.47,z);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(1.2,.85,10,3),new THREE.MeshLambertMaterial({color:i?BLAU:ROT,side:THREE.DoubleSide})); m.position.set(x+s*.65,2.9,z); sc.add(m);
    k.anim.push(t=>{ const p=m.geometry.attributes.position; for(let j=0;j<p.count;j++){ const u=(p.getX(j)*s+.6)/1.2; p.setZ(j,Math.sin(t*4-u*6+i)*.14*u); } p.needsUpdate=true; });
    k.kreis(x,z,.35); });
  backe(fahnen);

  /* Schmetterlinge über den Blumen */
  [[-6.2,-11.7,0],[8.6,-11.8,2],[10.4,11.2,4]].forEach(([x,z,p])=>{ const g=gruppe(sc,x,2.3,z); box(g,.05,.05,.24,0x30201a,0,0,0);
    const fl=[-1,1].map(s=>{ const a=gruppe(g,0,0,0); ball(a,.15,p===2?0x40a8f0:0xffa020,s*.14,0,-.03,1,.08,.85); return a; });
    k.anim.push(t=>{ g.position.set(x+Math.sin(t*.8+p)*.9,2.3+Math.sin(t*2.1+p)*.3,z+Math.sin(t*1.3+p)*.4); g.rotation.y=Math.cos(t*.8+p); fl[0].rotation.z=-Math.sin(t*14)*.9; fl[1].rotation.z=Math.sin(t*14)*.9; }); });

  gaukler(k,-8.5,9.8);
  hund(k,[[-2.3,-9],[2.3,-9],[2.3,-3.8],[1.6,5],[2.4,9],[-2.2,7.5],[-2,1],[-2.3,-4.5]],1.5);

  return { tuer, start:[0,9.5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-17.2,-7.6],[-17,-3.6],[-9.4,-8],[-8.2,-10.2],[-5.2,-11.6],[5.4,-11.6],[14.6,-12.2],[16,-7.7],[16.8,-.4],[17.1,3.9],[15.8,10.4],[8.4,10.8],[-17,6],[-15.3,11.2],[-6,12],[-6.4,8.6],[5.6,-2.2],[-5.7,-6],[10.4,-5.9],[5.2,8]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:-14, z:-5, steh:[-14,-2.6], kasten:[4.6,3.4], treffer:[3,4.4,2.4], baue(g){ /* 1 Thron auf einem Podest mit Stufen */
      box(g,4.6,.5,2.7,0xcabb9c,0,.25,-.35); box(g,4.6,.34,.34,0xb8a888,0,.17,1.17); box(g,4.6,.17,.34,0xa89878,0,.085,1.51);
      box(g,2.2,.03,2.6,ROT,0,.515,-.3); box(g,2.2,.03,.34,ROT,0,.355,1.17); box(g,2.2,.03,.34,ROT,0,.185,1.51);
      [-1,1].forEach(s=>{ box(g,.1,.035,2.6,GOLD,s*1.05,.52,-.3); walze(g,.12,.7,GOLD2,s*2,.85,.75); ball(g,.18,GOLD,s*2,1.3,.75); });
      /* Sitz, Beine, Armlehnen */
      [-1,1].forEach(s=>{ [-.95,.15].forEach(z=>{ walze(g,.13,.55,GOLD2,s*.8,.8,z); ball(g,.17,GOLD,s*.8,.62,z+.04,1,.7,1.2); });
        box(g,.26,.16,1.35,GOLD,s*.93,1.75,-.38); walze(g,.09,.6,GOLD2,s*.93,1.4,.18); ball(g,.17,GOLD,s*.93,1.75,.34);
        walze(g,.13,2.9,GOLD2,s*1.02,2.35,-1.02); ball(g,.2,GOLD,s*1.02,3.9,-1.02); kegel(g,.09,.24,GOLD,s*1.02,4.14,-1.02); });
      box(g,1.9,.3,1.35,GOLD2,0,1.15,-.4); ball(g,.85,ROT,0,1.38,-.35,1,.2,.72);
      box(g,1.95,2.2,.2,GOLD,0,2.3,-1.04); box(g,1.5,1.85,.08,ROT,0,2.3,-.92);
      for(let r=0;r<3;r++) for(let i=0;i<3;i++) ball(g,.055,GOLD,-.45+i*.45,1.8+r*.5,-.87);
      /* Krone oben auf der Lehne */
      platte(g,[[-.98,0],[.98,0],[.98,.2],[.6,.48],[.42,.28],[0,.82],[-.42,.28],[-.6,.48],[-.98,.2]],.2,GOLD,0,3.38,-1.14);
      ball(g,.13,0x2f7fe8,0,3.68,-.9,1,1,.6); [-.6,.6].forEach(x=>ball(g,.08,0x14b860,x,3.56,-.9)); ball(g,.11,0xe5243b,0,4.26,-1.04);
      box(g,.72,.13,.52,0x7a3a8a,.35,1.6,-.55); box(g,.5,.05,.34,0x9a52aa,.35,1.68,-.55); ball(g,.05,GOLD,.35,1.72,-.55);
      [-1,1].forEach(a=>[-1,1].forEach(b=>{ ball(g,.055,GOLD,.35+a*.37,1.6,-.55+b*.27); kegel(g,.05,.14,GOLD,.35+a*.4,1.51,-.55+b*.29); })); } },
  { x:-13.5, z:7, steh:[-13.5,8.6], r:.8, treffer:[1.7,3.1,1.1], baue(g){ /* 2 Laute auf einem Holzständer */
      walze(g,.62,.1,HOLZ2,0,.05,0); walze(g,.08,.5,HOLZ2,0,.32,-.2); box(g,.9,.1,.5,HOLZ2,0,.54,-.05); [-1,1].forEach(s=>{ box(g,.1,.26,.12,HOLZ2,s*.42,.68,.16); });
      strich(g,[0,.1,-.4],[0,2,-.4],.06,HOLZ2); strich(g,[0,2,-.4],[0,2,-.18],.05,HOLZ2);
      /* bauchiger Körper in Birnenform */
      ball(g,.66,0x9a5a24,0,1.2,-.08,1,1,.55); ball(g,.46,0x9a5a24,0,1.65,-.07,1,1.05,.55);
      liegend(walze(g,.58,.06,0xecc078,0,1.2,.27)); liegend(walze(g,.37,.062,0xecc078,0,1.68,.272));
      box(g,.72,.5,.058,0xecc078,0,1.47,.272);
      ring(g,.2,.035,HOLZ2,0,1.43,.32); liegend(walze(g,.17,.02,0x2a1408,0,1.43,.31));
      box(g,.5,.09,.07,0x3a2010,0,.9,.33);
      box(g,.22,1.05,.12,0x6b3a18,0,2.5,.16); for(let i=0;i<5;i++) box(g,.23,.025,.02,0xf0e0c0,0,2.12+i*.2,.23);
      const kopf=box(g,.26,.55,.1,0x4a2810,0,3.14,0); kopf.rotation.x=-.7;
      for(let i=0;i<3;i++) [-1,1].forEach(s=>{ const y=3.02+i*.13, z=.1-i*.11; walze(g,.028,.2,CREME,s*.22,y,z).rotation.z=Math.PI/2; ball(g,.06,CREME,s*.34,y,z,.7,1.3,1); });
      for(let i=0;i<5;i++){ const x=-.08+i*.04; strich(g,[x*1.9,.9,.37],[x,3,.24],.006,0xfdf8e8); } } },
  { x:-7, z:3.8, steh:[-7,5.5], kasten:[1.75,1.75], treffer:[1.9,1.9,1.9], baue(g){ /* 3 Schachbrett auf einem Tischchen */
      walze(g,.55,.1,HOLZ2,0,.05,0); rohr(g,.14,.24,.85,HOLZ,0,.52,0,12); ball(g,.22,HOLZ,0,.5,0,1,.7,1);
      box(g,1.7,.14,1.7,HOLZ2,0,.99,0); box(g,1.76,.05,1.76,GOLD2,0,.94,0);
      const brett=bild(256,256,c=>{ for(let r=0;r<8;r++) for(let i=0;i<8;i++){ c.fillStyle=(r+i)%2?'#3a2418':'#f6e6c4'; c.fillRect(i*32,r*32,32,32); } c.strokeStyle='#c89830'; c.lineWidth=5; c.strokeRect(2,2,252,252); });
      const f=bildFlaeche(g,brett,1.52,1.52,0,1.065,0); f.rotation.x=-Math.PI/2;
      const figur=(i,r,art,c)=>{ const x=-.665+i*.19, z=-.665+r*.19; walze(g,.078,.05,c,x,1.09,z);
        if(art==='b'){ kegel(g,.062,.17,c,x,1.19,z); ball(g,.05,c,x,1.29,z); }
        else if(art==='t'){ walze(g,.058,.24,c,x,1.23,z); walze(g,.082,.07,c,x,1.37,z); }
        else if(art==='s'){ kegel(g,.065,.2,c,x,1.2,z); box(g,.08,.13,.18,c,x,1.35,z+(r<4?.03:-.03)).rotation.x=r<4?.35:-.35; }
        else { kegel(g,.075,.36,c,x,1.29,z); ball(g,.06,c,x,1.49,z); if(art==='k'){ box(g,.03,.14,.03,GOLD,x,1.6,z); box(g,.1,.03,.03,GOLD,x,1.61,z); } else ring(g,.055,.018,GOLD,x,1.55,z).rotation.x=Math.PI/2; } };
      [[0,0,'t'],[1,0,'s'],[4,0,'k'],[3,0,'d'],[7,0,'t'],[0,1,'b'],[1,2,'b'],[3,3,'b'],[5,1,'b'],[6,1,'b'],[5,2,'s']].forEach(a=>figur(a[0],a[1],a[2],0x4a2a1c));
      [[0,7,'t'],[6,5,'s'],[4,7,'k'],[3,5,'d'],[7,7,'t'],[0,6,'b'],[2,6,'b'],[4,4,'b'],[5,6,'b'],[7,6,'b'],[1,5,'b']].forEach(a=>figur(a[0],a[1],a[2],0xfaf4e4)); } },
  { x:7.2, z:-6, steh:[7.2,-4.4], kasten:[2.2,1.1], treffer:[2.2,3.3,1.1], baue(g){ /* 4 großer goldener Kerzenleuchter */
      walze(g,.68,.12,GOLD2,0,.06,0); dreher(g,[[.58,0],[.3,.18],[.14,.3],[.1,.5]],GOLD,0,.1,0);
      walze(g,.085,1.8,GOLD,0,1.35,0); [.75,1.35,1.9].forEach((y,i)=>ball(g,i===1?.22:.16,GOLD2,0,y,0,1,.75,1));
      const fm=basis(0xff9a20), fi=basis(0xffec80);
      [.45,.9].forEach(r=>{ ring(g,r,.055,GOLD,0,2.32,0,Math.PI).rotation.z=Math.PI; });
      [-.9,-.45,0,.45,.9].forEach(x=>{ const y=x?2.32:2.55; if(!x) walze(g,.065,.45,GOLD,0,2.33,0); walze(g,.15,.07,GOLD2,x,y+.03,0); walze(g,.075,.45,CREME,x,y+.28,0); const a=kegel(g,.085,.28,fm,x,y+.66,0); a.castShadow=false; kegel(g,.045,.17,fi,x,y+.62,.06).castShadow=false; });
      schein(g,'rgba(255,200,100,.5)',0,2.95,.15,2.4); } },
  { wand:'hinten', x:-11, z:-13.5, steh:[-11,-12], treffer:[3.2,3.7,.7], trefferY:1, baue(g){ /* 5 Wandteppich: gewebtes Landschaftsbild mit Fransen */
      const t=bild(384,448,c=>{ c.fillStyle='#7e1a26'; c.fillRect(0,0,384,448); c.fillStyle='#e2b23c'; for(let i=0;i<384;i+=32){ [[i+16,16],[i+16,432]].forEach(p=>{ c.beginPath(); c.moveTo(p[0],p[1]-12); c.lineTo(p[0]+12,p[1]); c.lineTo(p[0],p[1]+12); c.lineTo(p[0]-12,p[1]); c.fill(); }); } for(let j=48;j<420;j+=32){ [16,368].forEach(x=>{ c.beginPath(); c.arc(x,j,9,0,6.283); c.fill(); }); }
        c.fillStyle='#a8d0e8'; c.fillRect(34,34,316,380); c.fillStyle='#ffd850'; c.beginPath(); c.arc(100,100,34,0,6.283); c.fill();
        c.fillStyle='#f6f2e4'; [[230,90],[256,80],[282,92]].forEach(p=>{ c.beginPath(); c.arc(p[0],p[1],20,0,6.283); c.fill(); });
        c.fillStyle='#6aa04a'; c.beginPath(); c.moveTo(34,300); c.quadraticCurveTo(190,190,350,280); c.lineTo(350,414); c.lineTo(34,414); c.fill();
        c.fillStyle='#d8c8a8'; c.fillRect(150,180,100,76); [138,230].forEach(x=>{ c.fillStyle='#d8c8a8'; c.fillRect(x,144,36,112); c.fillStyle='#b02a34'; c.beginPath(); c.moveTo(x-8,146); c.lineTo(x+18,102); c.lineTo(x+44,146); c.fill(); }); c.fillStyle='#5a3418'; c.beginPath(); c.arc(202,236,18,Math.PI,0); c.lineTo(220,256); c.lineTo(184,256); c.fill();
        [[70,300],[320,306],[290,262]].forEach(p=>{ c.fillStyle='#6b4220'; c.fillRect(p[0]-6,p[1],12,44); c.fillStyle='#2e6a38'; c.beginPath(); c.arc(p[0],p[1]-8,30,0,6.283); c.fill(); });
        c.strokeStyle='#e8d8a0'; c.lineWidth=16; c.beginPath(); c.moveTo(202,258); c.bezierCurveTo(240,310,130,340,170,414); c.stroke();
        for(let i=0;i<26;i++){ c.fillStyle=['#e8384a','#fff0f8','#ffd23a'][i%3]; c.beginPath(); c.arc(46+(i*73)%290,340+(i*41)%66,5,0,6.283); c.fill(); }
        c.fillStyle='rgba(60,30,10,.12)'; for(let y=0;y<448;y+=6) c.fillRect(0,y,384,2); });
      const ohne=()=>g.children.forEach(m=>m.castShadow=false);
      bildFlaeche(g,t,2.85,3.3,0,2.85,.28); box(g,2.9,3.34,.08,ROT2,0,2.85,.22);
      walze(g,.075,3.3,HOLZ,0,4.58,.32).rotation.z=Math.PI/2; [-1,1].forEach(s=>{ ball(g,.15,GOLD,s*1.7,4.58,.32); strich(g,[s*1.5,4.6,.3],[0,5.2,.06],.02,GOLD2); }); ball(g,.1,GOLD,0,5.2,.1);
      for(let i=0;i<19;i++){ const x=-1.35+i*.15; walze(g,.028,.26,GOLD,x,1.07,.28); ball(g,.05,GOLD2,x,.94,.28); } ohne(); } },
  { wand:'hinten', x:11, z:-13.5, steh:[11,-12], treffer:[2.5,3.2,.8], trefferY:1.1, baue(g){ /* 6 Burgwappen: großer Wappenschild mit Burg und Krone */
      const S=[[-1,1.15],[1,1.15],[1,.05],[.78,-.55],[.4,-.98],[0,-1.25],[-.4,-.98],[-.78,-.55],[-1,.05]];
      platte(g,S.map(p=>[p[0]*1.1,p[1]*1.1]),.16,GOLD,0,2.55,.06);
      platte(g,S.map(p=>[p[0]*.94,p[1]*.96]),.08,BLAU,0,2.55,.2);
      platte(g,[[-.94,-.1],[0,-.5],[.94,-.1],[.75,-.55],[.38,-.96],[0,-1.2],[-.38,-.96],[-.75,-.55]],.04,ROT,0,2.55,.28);
      /* Burg mit zwei Türmen */
      box(g,.8,.55,.08,CREME,0,2.72,.31); [-.48,.48].forEach(x=>{ box(g,.32,.95,.1,CREME,x,2.92,.32); [-.11,.11].forEach(v=>box(g,.1,.14,.1,CREME,x+v,3.45,.32)); box(g,.08,.2,.02,0x20304a,x,3.05,.38); });
      [-.18,.18].forEach(x=>box(g,.13,.14,.08,CREME,x,3.06,.31)); box(g,.24,.28,.02,0x3a2010,0,2.59,.36); liegend(walze(g,.12,.02,0x3a2010,0,2.73,.36));
      platte(g,[[0,.24],[.07,.07],[.25,.07],[.11,-.05],[.16,-.23],[0,-.12],[-.16,-.23],[-.11,-.05],[-.25,.07],[-.07,.07]],.05,GOLD,0,1.9,.31);
      platte(g,[[-.7,0],[.7,0],[.85,.55],[.4,.28],[0,.68],[-.4,.28],[-.85,.55]],.18,GOLD,0,3.86,.08);
      [[-.85,4.45],[0,4.6],[.85,4.45]].forEach(p=>ball(g,.11,0xe5243b,p[0],p[1],.17)); [-.4,0,.4].forEach(x=>ball(g,.08,0x2f7fe8,x,4,.27));
      g.children.forEach(m=>m.castShadow=false); } },
  { x:12.8, z:-4.5, dreh:-.35, steh:[11.2,-3.2], r:.85, treffer:[1.7,3.5,1.2], baue(g){ /* 7 Ritterrüstung auf einem Sockel, ohne Waffe */
      walze(g,.78,.26,HOLZ2,0,.13,0); walze(g,.68,.06,GOLD2,0,.29,0);
      [-1,1].forEach(s=>{ ball(g,.19,SILBER2,s*.25,.43,.12,1,.65,1.7); rohr(g,.15,.12,.58,SILBER,s*.25,.76,0,12); ball(g,.17,SILBER2,s*.25,1.08,.04); rohr(g,.19,.16,.5,SILBER,s*.24,1.36,0,12); });
      [0,1,2].forEach(i=>rohr(g,.34+i*.045,.38+i*.05,.14,i%2?SILBER2:SILBER,0,1.82-i*.13,0,16));
      walze(g,.37,.12,0x6a4a24,0,1.92,0); box(g,.16,.14,.08,GOLD,0,1.92,.37);
      rohr(g,.5,.35,.68,SILBER,0,2.3,0,16); ball(g,.49,SILBER,0,2.55,0,1,.45,.8); box(g,.05,.66,.05,SILBER2,0,2.33,.42); [-1,1].forEach(s=>ball(g,.05,GOLD,s*.26,2.5,.4));
      [-1,1].forEach(s=>{ ball(g,.26,SILBER,s*.56,2.56,0,1,.85,1); ball(g,.2,SILBER2,s*.66,2.4,0); strich(g,[s*.62,2.42,0],[s*.75,1.97,.02],.12,SILBER); ball(g,.14,SILBER2,s*.75,1.95,.02); strich(g,[s*.75,1.95,.02],[s*.7,1.52,.14],.11,SILBER); walze(g,.14,.14,SILBER2,s*.7,1.55,.13); ball(g,.14,SILBER,s*.69,1.37,.17,1,1.25,.85); });
      walze(g,.17,.16,SILBER2,0,2.77,0); walze(g,.31,.42,SILBER,0,3.04,0); ball(g,.31,SILBER,0,3.24,0,1,.8,1);
      box(g,.46,.07,.08,0x14161c,0,3.14,.28); [-.14,-.05,.05,.14].forEach(x=>box(g,.035,.18,.06,0x14161c,x,2.94,.29)); box(g,.05,.55,.07,SILBER2,0,3.22,.3);
      [[0,3.62,-.02,.19],[0,3.76,-.17,.18],[0,3.72,-.36,.15],[0,3.56,-.47,.12]].forEach(p=>ball(g,p[3],0xe0303c,p[0],p[1],p[2],.75,1,1)); } },
  { x:15.6, z:2, steh:[13.9,2], r:.98, treffer:[1.9,2.1,1.9], baue(g){ /* 8 Holzfass mit Reifen und Zapfhahn */
      dreher(g,[[0,0],[.66,0],[.8,.38],[.88,.85],[.8,1.32],[.66,1.7]],0xa8682e,0,.04,0);
      walze(g,.68,.06,0xc89050,0,1.69,0); [-.4,-.13,.14,.41].forEach(x=>box(g,.025,.012,1.1-Math.abs(x)*.7,HOLZ2,x,1.726,0)); liegend(ring(g,.67,.05,HOLZ2,0,1.73,0));
      for(let i=0;i<16;i++){ const a=i/16*6.283, P=[[.665,.06],[.805,.42],[.885,.89],[.805,1.36],[.665,1.72]]; for(let j=0;j<4;j++) strich(g,[Math.cos(a)*P[j][0],P[j][1],Math.sin(a)*P[j][0]],[Math.cos(a)*P[j+1][0],P[j+1][1],Math.sin(a)*P[j+1][0]],.012,HOLZ2); }
      [[.18,.73],[.55,.85],[1.25,.85],[1.62,.71]].forEach(p=>liegend(ring(g,p[1],.045,EISEN,0,p[0],0)));
      walze(g,.09,.04,HOLZ2,.2,1.74,.2);
      const hahn=gruppe(g,0,0,0); hahn.rotation.y=-.8; walze(hahn,.07,.34,GOLD2,0,.55,.95).rotation.x=Math.PI/2; walze(hahn,.05,.2,GOLD,0,.46,1.08); box(hahn,.24,.06,.07,GOLD,0,.68,1.04); walze(hahn,.03,.12,GOLD,0,.62,1.04); } },
  { x:7.5, z:2, steh:[7.5,4.55], kasten:[6.4,3.4], treffer:[6.4,2.2,3.2], baue(g){ /* 9 Festtafel: langer gedeckter Tisch mit Stühlen und Bänken */
      box(g,6,.14,1.75,HOLZ,0,1.02,0); [-2.7,2.7].forEach(x=>[-.65,.65].forEach(z=>walze(g,.11,.96,HOLZ2,x,.48,z))); box(g,5.4,.12,.12,HOLZ2,0,.35,0);
      box(g,5.7,.04,1.82,0xfbf6ea,0,1.11,0); [-1,1].forEach(s=>{ box(g,5.7,.36,.04,0xfbf6ea,0,.93,s*.91); box(g,5.7,.07,.05,GOLD,0,.77,s*.92); }); box(g,5.74,.02,.5,ROT,0,1.14,0);
      /* sechs Gedecke: Teller, Becher, Löffel */
      [-2.2,0,2.2].forEach(x=>[-1,1].forEach(s=>{ walze(g,.31,.035,0xdfe6f0,x,1.15,s*.57); walze(g,.22,.02,0xffffff,x,1.175,s*.57); liegend(ring(g,.28,.018,BLAU,x,1.175,s*.57));
        walze(g,.1,.03,GOLD2,x+.48,1.15,s*.5); walze(g,.03,.16,GOLD,x+.48,1.23,s*.5); rohr(g,.13,.07,.2,GOLD,x+.48,1.4,s*.5,12); box(g,.05,.015,.4,SILBER,x-.43,1.14,s*.57); ball(g,.06,SILBER,x-.43,1.15,s*.34,1,.3,1.4); }));
      /* Obstschale, Brote, Käse, Torte, Krüge */
      rohr(g,.48,.24,.2,GOLD,0,1.26,0,18); [[-.2,0,0xd8303a],[.18,.1,0xe8b830],[0,-.16,0x6ab83a],[.12,-.12,0xd8303a],[-.05,.15,0xf08a28]].forEach(([x,z,f],i)=>ball(g,.15,f,x,1.42+(i%2)*.05,z)); for(let i=0;i<9;i++) ball(g,.07,0x7a3a9a,(i%3-1)*.09,1.62-Math.floor(i/3)*.08,.02+(i%2)*.06);
      [-1.15,1.2].forEach((x,i)=>{ box(g,.75,.04,.5,HOLZ,x,1.16,0); ball(g,.3,0xc8843a,x,1.28,0,1.25,.6,.75); [-.16,0,.16].forEach(v=>box(g,.05,.02,.3,0xf0c880,x+v,1.45,0).rotation.y=.4); });
      walze(g,.3,.2,0xf2cc40,-2.1,1.25,0); [[-.1,.08],[.12,-.04],[0,-.16]].forEach(p=>walze(g,.045,.01,0xc8962a,-2.1+p[0],1.355,p[1]));
      walze(g,.34,.22,0xf8e0e8,2.15,1.27,0); walze(g,.24,.18,0xfff4f6,2.15,1.47,0); for(let i=0;i<7;i++){ const a=i/7*6.283; ball(g,.06,0xd8303a,2.15+Math.cos(a)*.18,1.59,Math.sin(a)*.18); } ball(g,.08,0xd8303a,2.15,1.62,0);
      [[-2.65,.35],[2.7,-.35],[.75,-.1]].forEach(([x,z])=>{ dreher(g,[[0,0],[.13,0],[.2,.16],[.09,.36],[.13,.48]],0x3a6aa8,x,1.13,z); ring(g,.11,.03,0x3a6aa8,x+.19,1.38,z); });
      /* hinten Stühle mit hoher Lehne, vorn niedrige Bänke */
      [-2.2,0,2.2].forEach(x=>{ box(g,.85,.12,.62,HOLZ,x,.62,-1.3); box(g,.72,.09,.5,ROT,x,.72,-1.28); [-.34,.34].forEach(v=>{ walze(g,.06,.62,HOLZ2,x+v,.31,-1.08); walze(g,.065,1.7,HOLZ2,x+v,.85,-1.57); ball(g,.1,GOLD,x+v,1.74,-1.57); }); box(g,.68,.46,.09,HOLZ,x,1.4,-1.57); box(g,.44,.28,.03,ROT,x,1.4,-1.51); });
      [-1.5,1.5].forEach(x=>{ box(g,2.4,.12,.5,HOLZ,x,.52,1.36); box(g,2.2,.08,.4,BLAU,x,.62,1.36); [-1,1].forEach(s=>box(g,.14,.48,.44,HOLZ2,x+s*1,.24,1.36)); });
      /* Schatten nur von den großen Holzteilen */
      g.children.forEach(m=>m.castShadow=m.material===mat(HOLZ)||m.material===mat(HOLZ2)); } },
  { x:13.5, z:8, steh:[11.75,8], r:1.12, treffer:[2.3,2.2,2.3], baue(g){ /* 10 Pauke: Kupferkessel mit Fell und zwei Schlägeln */
      for(let i=0;i<3;i++){ const a=i*2.094+.5; strich(g,[Math.cos(a)*.6,.75,Math.sin(a)*.6],[Math.cos(a)*.9,.06,Math.sin(a)*.9],.08,EISEN); ball(g,.12,GOLD2,Math.cos(a)*.9,.08,Math.sin(a)*.9,1,.6,1); }
      dreher(g,[[0,0],[.35,.04],[.66,.18],[.88,.42],[.98,.7],[1,1]],0xc8702e,0,.42,0);
      walze(g,.97,.05,0xf8f0da,0,1.43,0); liegend(ring(g,.35,.015,0xd8c8a0,0,1.46,0));
      liegend(ring(g,1.01,.065,GOLD,0,1.43,0)); liegend(ring(g,.9,.035,GOLD2,0,.86,0));
      for(let i=0;i<8;i++){ const a=i/8*6.283, x=Math.cos(a), z=Math.sin(a); strich(g,[x*1.07,1.46,z*1.07],[x*1.03,1.18,z*1.03],.035,SILBER); box(g,.14,.08,.14,GOLD2,x*1.05,1.17,z*1.05).rotation.y=-a; ball(g,.05,SILBER,x*1.08,1.52,z*1.08); }
      for(let i=0;i<8;i++){ const a=(i+.5)/8*6.283, b=(i+1.5)/8*6.283; strich(g,[Math.cos(a)*1.02,1.3,Math.sin(a)*1.02],[Math.cos((a+b)/2)*.96,.9,Math.sin((a+b)/2)*.96],.014,ROT); }
      [-1,1].forEach(s=>{ strich(g,[s*.55,1.52,.62],[-s*.18,1.57+(s>0?.06:0),-.28],.038,HOLZ); ball(g,.15,ROT,-s*.2,1.6+(s>0?.06:0),-.31); }); } }
];

gegenstaende.forEach(d=>{ const zeichne=d.baue; d.baue=(g,k)=>{ zeichne(g,k); sparen(g); }; });

return { titel:'Der Rittersaal', breite:36, tiefe:27, baue, gegenstaende, verstecke };
})();

/* Raum 4: Das Turmzimmer. Nacht in der Sternwarte hoch oben im Turm. Ausgang ist eine Luke im Boden.
   Gegenstände 1 bis 10 = ort 1 bis 10 (1 bis 8 wie im 2D-Szenario, 9 und 10 neu). */
RAEUME3D.burg[3] = (function(){
const { HOLZ, HOLZ2, EISEN, mauer, huelle, flacker, ausgang, katze, maeuschen, fledermaus } = BURG;
const GOLD=0xd8a73a, GOLD2=0xa87820, STEINH=0x9490b4, STEIND=0x6a6690, DUNKEL=0x4a3018, PAPIER=0xf0e2b8, WEISS=0xf2f0ea, ROT=0xa8323c, BLAU=0x34509c, VIOLETT=0x6a4296, GRUEN=0x3f8a4a;
const BUCHFARBEN=[0xa8323c,0x34509c,0x3f8a4a,0xd8a73a,0x6a4296,0x2a8a8a,0xc8602a,0xe8dcc0];

/* Stange mit zwei verschiedenen Enden-Dicken von a nach b */
function stange(p,a,b,r1,r2,c,offen){
  const A=V(a[0],a[1],a[2]), B=V(b[0],b[1],b[2]), d=B.clone().sub(A), l=d.length();
  const t=rohr(p,r2,r1,l,c,0,0,0,18,offen); t.position.copy(A).addScaledVector(d,.5); t.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); return t;
}
/* Fläche mit gemaltem Bild (wird nicht verschmolzen) */
function tafel(p,w,h,tex,x,y,z,leuchtet,durch){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),leuchtet?new THREE.MeshBasicMaterial({map:tex,transparent:!!durch}):new THREE.MeshLambertMaterial({map:tex,transparent:!!durch}));
  m.position.set(x,y,z); p.add(m); return m;
}
/* Drehkörper aus Punkten [Radius, Höhe] */
function dreh(p,punkte,material,x,y,z){
  const m=new THREE.Mesh(new THREE.LatheGeometry(punkte.map(q=>new THREE.Vector2(q[0],q[1])),24),material); m.position.set(x,y,z); m.castShadow=!material.transparent; p.add(m); return m;
}

/* Alle festen Teile einer Gruppe zu einem Körper mit Farben je Ecke zusammenfassen (viel weniger Zeichenaufrufe).
   Nicht für die Gegenstände benutzen: die fasst die Raumansicht selbst zusammen. */
function buendle(g){
  g.updateMatrixWorld(true);
  const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(), toepfe={}, weg=[];
  g.traverse(m=>{ if(!m.isMesh || m.isInstancedMesh || !m.material.visible || m.material.transparent || m.material.map) return;
    const art=(m.material.isMeshBasicMaterial?'b':'l')+m.material.side;
    (toepfe[art]=toepfe[art]||[]).push(m); weg.push(m); });
  Object.keys(toepfe).forEach(art=>{
    const P=[], N=[], F=[]; let schatten=false;
    toepfe[art].forEach(m=>{ const q=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone(), c=m.material.color; q.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));
      const p=q.attributes.position.array, n=q.attributes.normal.array; for(let i=0;i<p.length;i+=3){ P.push(p[i],p[i+1],p[i+2]); N.push(n[i],n[i+1],n[i+2]); F.push(c.r,c.g,c.b); }
      q.computeBoundingSphere(); if(art[0]==='l' && m.castShadow && q.boundingSphere.radius>.25) schatten=true; q.dispose(); });
    const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute(N,3)); geo.setAttribute('color',new THREE.Float32BufferAttribute(F,3));
    const o={vertexColors:true,side:Number(art.slice(1))};
    const neu=new THREE.Mesh(geo,art[0]==='b'?new THREE.MeshBasicMaterial(o):new THREE.MeshLambertMaterial(o)); neu.castShadow=schatten; neu.receiveShadow=true; g.add(neu);
  });
  weg.forEach(m=>m.parent.remove(m));
}

function baue(k){
  /* ---------- Hülle: violett-blaue Mauern, Holzdielen ---------- */
  const wandBild=bild(512,512,g=>{
    g.fillStyle='#262242'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ let x=(r%2)*-64;
      while(x<512){ const w=128, h=Math.floor(zufall()*22);
        const mal=xx=>{ g.fillStyle='rgb('+(84+h)+','+(78+h)+','+(126+h)+')'; g.fillRect(xx+3,r*64+3,w-6,58);
          g.fillStyle='rgba(255,255,255,.1)'; g.fillRect(xx+3,r*64+3,w-6,6); g.fillStyle='rgba(10,0,30,.22)'; g.fillRect(xx+3,r*64+52,w-6,9);
          for(let i=0;i<18;i++){ g.fillStyle=i%2?'rgba(10,0,30,.16)':'rgba(255,240,255,.08)'; g.fillRect(xx+8+((i*37)%(w-18)),r*64+8+((i*23)%44),5,3); } };
        mal(x); if(x<0) mal(x+512); x+=w; } }
  });
  const dielen=bild(1024,768,g=>{
    g.fillStyle='#2a170c'; g.fillRect(0,0,1024,768);
    for(let r=0;r<12;r++){ let x=-((r*173)%320);
      while(x<1024){ const w=320, h=Math.floor(zufall()*26);
        const mal=xx=>{ g.fillStyle='rgb('+(128+h)+','+(84+h)+','+(54+h*.6|0)+')'; g.fillRect(xx+2,r*64+2,w-4,61);
          g.strokeStyle='rgba(40,18,6,.35)'; g.lineWidth=2; for(let i=0;i<3;i++){ g.beginPath(); g.moveTo(xx+8,r*64+16+i*17); g.bezierCurveTo(xx+90,r*64+10+i*17,xx+200,r*64+24+i*17,xx+w-10,r*64+14+i*17); g.stroke(); }
          g.fillStyle='#24140a'; [[14,14],[14,48],[w-14,14],[w-14,48]].forEach(p=>{ g.beginPath(); g.arc(xx+p[0],r*64+p[1],3.5,0,6.3); g.fill(); }); };
        mal(x); if(x<0) mal(x+1280); x+=w; } }
  });
  const R=huelle(k,{ B:36, T:27, H:6, himmel:0xb2b4ff, grund:0x584050, staerke:.8, sonne:0xc4ccff, sonneStaerke:.4, wandBild, bodenBild:dielen, bodenWdh:[3,3], leiste:0x3a2c58 });
  const sc=R.sc, B=R.B, T=R.T, H=R.H;
  sc.background=new THREE.Color(0x0a0c26);

  const FL=basis(0xff9a22), FL2=basis(0xffe680), LICHTGELB=basis(0xffd874);
  /* feste Teile: werden am Ende je Farbe zusammengefasst */
  const boden=gruppe(sc,0,0,0), deko=gruppe(sc,0,0,0);
  const wh=gruppe(R.hinten,0,0,0), wl=gruppe(R.links,0,0,0), wr=gruppe(R.rechts,0,0,0);
  const buecher={h:[],l:[],r:[]};

  /* Sterne am Himmel über den Mauern */
  { const P=[]; for(let i=0;i<420;i++){ const a=zufall()*6.283, r=34+zufall()*30; P.push(Math.cos(a)*r,1+zufall()*34,Math.sin(a)*r); }
    const q=new THREE.BufferGeometry(); q.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
    sc.add(new THREE.Points(q,new THREE.PointsMaterial({color:0xfff6d8,size:.28}))); }

  /* ---------- Große Fenster mit Sternenhimmel ---------- */
  const himmelBild=(breit,hoch,mond)=>bild(256,Math.round(256*hoch/breit),(g,w,h)=>{
    g.beginPath(); g.moveTo(0,h); g.lineTo(0,w/2); g.arc(w/2,w/2,w/2,Math.PI,0); g.lineTo(w,h); g.closePath(); g.clip();
    const v=g.createLinearGradient(0,0,0,h); v.addColorStop(0,'#070b2c'); v.addColorStop(.7,'#243a86'); v.addColorStop(1,'#5a4a9a'); g.fillStyle=v; g.fillRect(0,0,w,h);
    for(let i=0;i<90;i++){ g.fillStyle=i%7?'#ffffff':'#ffe9a0'; g.beginPath(); g.arc(zufall()*w,zufall()*h*.8,i%11?1.1:2.4,0,6.3); g.fill(); }
    if(mond){ g.fillStyle='rgba(255,244,190,.18)'; g.beginPath(); g.arc(w*.68,h*.28,w*.17,0,6.3); g.fill(); g.fillStyle='#fff2b8'; g.beginPath(); g.arc(w*.68,h*.28,w*.1,0,6.3); g.fill(); g.fillStyle='#e8d890'; [[.65,.27,.018],[.71,.3,.026],[.69,.245,.012]].forEach(p=>{ g.beginPath(); g.arc(w*p[0],h*p[1],w*p[2],0,6.3); g.fill(); }); }
    g.fillStyle='#152248'; g.beginPath(); g.moveTo(0,h*.82); g.quadraticCurveTo(w*.25,h*.68,w*.55,h*.82); g.quadraticCurveTo(w*.8,h*.74,w,h*.8); g.lineTo(w,h); g.lineTo(0,h); g.fill();
    g.fillStyle='#0c1530'; g.fillRect(w*.18,h*.69,w*.2,h*.1); [.16,.35].forEach(x=>{ g.fillRect(w*x,h*.64,w*.06,h*.12); g.beginPath(); g.moveTo(w*(x-.012),h*.64); g.lineTo(w*(x+.03),h*.59); g.lineTo(w*(x+.072),h*.64); g.fill(); });
    g.fillStyle='#ffd25a'; [[.19,.67],[.38,.68],[.24,.73],[.3,.73],[.62,.9],[.8,.87],[.1,.92]].forEach(p=>g.fillRect(w*p[0],h*p[1],4,6));
  });
  const schnuppeBild=bild(128,16,g=>{ const v=g.createLinearGradient(0,0,128,0); v.addColorStop(0,'rgba(255,255,255,0)'); v.addColorStop(1,'rgba(255,250,220,1)'); g.fillStyle=v; g.beginPath(); g.moveTo(0,8); g.lineTo(120,4); g.arc(120,8,4,-1.57,1.57); g.fill(); });
  [[-11.2,2.8,false,0],[0,4.6,true,3.1],[8.8,2.8,false,5.7]].forEach(([x,w,mond,start])=>{
    const y0=1.25, h=w>4?4.35:3.7, spring=y0+h-w/2, z=-T/2;
    tafel(R.hinten,w,h,himmelBild(w,h,mond),x,y0+h/2,z+.03,true,true);
    [-1,1].forEach(s=>{ box(wh,.26,spring-y0,.28,STEINH,x+s*(w/2+.1),(spring+y0)/2,z+.12); });
    const n=w>4?13:9;
    for(let i=0;i<=n;i++){ const a=Math.PI*i/n, s=box(wh,Math.PI*(w/2+.1)/n+.04,.26,.28,i%2?STEINH:STEIND,x+Math.cos(a)*(w/2+.1),spring+Math.sin(a)*(w/2+.1),z+.12); s.rotation.z=a-Math.PI/2; }
    box(wh,w+.8,.2,.5,STEINH,x,y0-.06,z+.2);
    (w>4?[-w/6,w/6]:[0]).forEach(dx=>box(wh,.08,spring-y0+(w>4?.9:1.2),.08,DUNKEL,x+dx,y0+(spring-y0+(w>4?.9:1.2))/2,z+.09));
    box(wh,w,.08,.08,DUNKEL,x,spring,z+.09);
    /* Vorhänge */
    [-1,1].forEach(s=>{ for(let i=0;i<3;i++) walze(wh,.13,spring-y0+.5,i%2?0x4a2a72:VIOLETT,x+s*(w/2+.38+i*.17),(spring+y0+.5)/2,z+.14); ball(wh,.12,GOLD,x+s*(w/2+.55),2.3,z+.3); walze(wh,.05,.8,GOLD2,x+s*(w/2+.55),spring+.54,z+.22).rotation.z=Math.PI/2; });
    /* Sternschnuppe */
    const st=new THREE.Mesh(new THREE.PlaneGeometry(.8,.09),new THREE.MeshBasicMaterial({map:schnuppeBild,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})); st.rotation.z=-2.6; R.hinten.add(st);
    k.anim.push(t=>{ const p=((t+start)%7)/1.1; st.visible=p<1; st.position.set(x+w*.28-p*w*.56,y0+h*.76-p*w*.34,z+.05); st.material.opacity=p<1?Math.sin(p*Math.PI):0; });
  });
  /* Wetterfahne mit Hahn auf der Fensterbank (dreht sich im Nachtwind) */
  { walze(wh,.03,.9,GOLD2,9.4,1.73,-T/2+.32); ball(wh,.06,GOLD,9.4,2.18,-T/2+.32);
    const d=gruppe(R.hinten,9.4,2.3,-T/2+.32); box(d,.9,.04,.04,GOLD,0,0,0); kegel(d,.09,.2,GOLD,.52,0,0).rotation.z=-Math.PI/2; box(d,.18,.18,.03,GOLD,-.45,0,0);
    ball(d,.14,GOLD,0,.22,0,1.3,.9,.4); ball(d,.08,GOLD,.17,.38,0,1,1,.5); ball(d,.04,ROT,.18,.47,0); kegel(d,.03,.09,0xe8601a,.28,.37,0).rotation.z=-Math.PI/2; [0,1,2].forEach(i=>{ strich(d,[-.12,.22,0],[-.34,.3+i*.09,0],.025,GOLD); });
    buendle(d); k.anim.push(t=>{ d.rotation.y=Math.sin(t*.5)*.9+Math.sin(t*1.7)*.15; }); }
  /* Runde Fenster in den Seitenwänden */
  const rundBild=bild(128,128,g=>{ g.beginPath(); g.arc(64,64,63,0,6.3); g.clip(); g.fillStyle='#182a6a'; g.fillRect(0,0,128,128); for(let i=0;i<26;i++){ g.fillStyle='#fff'; g.beginPath(); g.arc(zufall()*128,zufall()*128,i%5?1.4:3,0,6.3); g.fill(); } });
  [[R.links,wl,-1,-1.4],[R.rechts,wr,1,-1.8],[R.rechts,wr,1,12]].forEach(([wand,fest,s,z])=>{
    const f=tafel(wand,1.4,1.4,rundBild,s*(B/2-.03),4.5,z,true,true); f.rotation.y=-s*Math.PI/2;
    ring(fest,.74,.12,STEINH,s*(B/2-.08),4.5,z).rotation.y=Math.PI/2; box(fest,.06,1.4,.07,DUNKEL,s*(B/2-.08),4.5,z); box(fest,.06,.07,1.4,DUNKEL,s*(B/2-.08),4.5,z); });

  /* ---------- Fachwerkbalken an den Wänden ---------- */
  [-17.78,-8.9,6.55,11.35,17.78].forEach(x=>{ box(wh,.36,H,.22,DUNKEL,x,H/2,-T/2+.11); });
  box(wh,B,.3,.24,HOLZ2,0,H-.18,-T/2+.12);
  [[wl,-1,[-8,-2.9,4.15,13.2]],[wr,1,[-8.3,-3,3.2,7.2,13.2]]].forEach(([g,s,zz])=>{
    zz.forEach(z=>box(g,.22,H,.34,DUNKEL,s*(B/2-.11),H/2,z)); box(g,.24,.3,T,HOLZ2,s*(B/2-.12),H-.18,0); });

  /* Wandteppiche mit Streifen, Burg und Mond (ohne Sterne, damit nur die Himmelskarte Sterne zeigt) */
  const teppichBild=(grund,motiv)=>bild(128,224,g=>{ g.fillStyle=grund; g.beginPath(); g.moveTo(0,0); g.lineTo(128,0); g.lineTo(128,190); g.lineTo(64,224); g.lineTo(0,190); g.fill();
    g.fillStyle='#ffe082';
    if(motiv==='streifen'){ [[24,16],[56,8],[78,28],[120,8],[142,16]].forEach(([y,h],i)=>{ g.fillStyle=i===2?'#f0e2b8':'#e8c45a'; g.fillRect(9,y,110,h); }); }
    else if(motiv==='burg'){ g.fillRect(34,90,60,68); [22,86].forEach(x=>{ g.fillRect(x,62,20,96); [0,12].forEach(d=>g.fillRect(x+d,50,8,12)); }); [46,60,74].forEach(x=>g.fillRect(x,80,8,10));
      g.fillStyle=grund; g.beginPath(); g.moveTo(52,158); g.lineTo(52,132); g.arc(64,132,12,Math.PI,0); g.lineTo(76,158); g.fill(); [28,92].forEach(x=>g.fillRect(x,84,8,18)); }
    else { g.beginPath(); g.arc(64,94,38,0,6.3); g.fill(); g.fillStyle=grund; g.beginPath(); g.arc(82,82,34,0,6.3); g.fill(); }
    g.strokeStyle='#e8c45a'; g.lineWidth=6; g.strokeRect(9,9,110,172); });
  [[R.links,-1,9.9,'streifen','#6a2a52'],[R.rechts,1,-10,'mond','#2a3a7a'],[R.rechts,1,5.2,'burg','#4a2a72']].forEach(([wand,s,z,motiv,f])=>{
    const t=tafel(wand,1.8,3.1,teppichBild(f,motiv),s*(B/2-.05),3.6,z,false,true); t.rotation.y=-s*Math.PI/2;
    walze(s<0?wl:wr,.06,2.1,GOLD2,s*(B/2-.1),5.18,z).rotation.x=Math.PI/2; });
  /* Kräuterbüschel zum Trocknen */
  [[wl,-1,-7.5],[wl,-1,8.6],[wr,1,-8.9],[wr,1,3.7]].forEach(([g,s,z])=>{
    for(let j=0;j<3;j++){ const zz=z+(j-1)*.34, x=s*(B/2-.28); strich(g,[s*(B/2-.05),4.2,zz],[x,3.9,zz],.015,PAPIER);
      for(let i=0;i<7;i++) strich(g,[x,3.9,zz],[x+(zufall()-.5)*.28,3.25+zufall()*.2,zz+(zufall()-.5)*.28],.025,j%2?0x8a6a9a:0x6a8a48); ball(g,.07,0xc8a060,x,3.88,zz); } });

  /* ---------- Teppiche und Bodenzier ---------- */
  const scheibe=(r,f,x,y,z,sx,sz)=>{ const m=walze(boden,r,.006,f,x,y,z); m.scale.set(r*(sx||1),.006,r*(sz||1)); m.castShadow=false; return m; };
  scheibe(4.4,0x7a2a48,0,.006,2.4,1.25,1); scheibe(4.4*.9,GOLD2,0,.01,2.4,1.25,1); scheibe(4.4*.84,0x2e3a78,0,.014,2.4,1.25,1); scheibe(1.7,0x7a2a48,0,.018,2.4);
  for(let i=0;i<8;i++){ const s=box(boden,.22,.006,6.4,GOLD2,0,.022,2.4); s.rotation.y=i*Math.PI/8; s.castShadow=false; }
  scheibe(.9,GOLD,0,.028,2.4);
  for(let i=0;i<16;i++){ const a=i/16*6.283; scheibe(.17,PAPIER,Math.cos(a)*4.3,.022,2.4+Math.sin(a)*3.4); }
  /* Läufer zur Luke */
  box(boden,2.3,.006,3.4,0x4a2a72,0,.008,-4); [-1,1].forEach(s=>{ box(boden,.14,.006,3.4,GOLD2,s*.92,.014,-4); for(let i=0;i<8;i++) box(boden,.08,.006,.3,PAPIER,-.9+i*.26,.012,-2.15); });
  /* weitere Teppiche */
  [[-7.5,-1.2,3.4,2.8,0x2a6a6a],[11.8,7.6,4.4,3.4,0x6a2a38],[-12,8.2,3.8,3.2,0x4a3a8a],[9.2,-9.6,3.6,3.4,0x2e3a78],[-13.4,1.8,3.4,4.4,0x8a4a28]].forEach(([x,z,w,t,f],i)=>{
    box(boden,w,.006,t,GOLD2,x,.006+i*.0002,z); box(boden,w-.3,.006,t-.3,f,x,.011+i*.0002,z); box(boden,w-1.1,.006,t-1.1,PAPIER,x,.015,z); box(boden,w-1.3,.006,t-1.3,f,x,.019,z); });
  /* Sternenkreis um die Luke */
  for(let i=0;i<12;i++){ const a=i/12*6.283, s=box(boden,.3,.006,.3,GOLD,Math.cos(a)*2.45,.016,-8+Math.sin(a)*2.3); s.rotation.y=a+.78; }

  /* ---------- Ausgang: Luke im Boden ---------- */
  const leiter=gruppe(sc,0,0,0); leiter.visible=false;
  { const LZ=-8;
    box(boden,3,.008,3,basis(0x030206),0,.02,LZ).castShadow=false;
    /* Stufen nach unten: von vorn nach hinten immer dunkler */
    [0x8a6a48,0x6a5038,0x4a3828,0x30251c,0x1c1612].forEach((f,i)=>{ const s=box(boden,2.5-i*.12,.006,.3,basis(f),0,.028,LZ+1.2-i*.52); s.castShadow=false; });
    /* Leiter (erst zu sehen, wenn der Deckel offen ist) */
    [-.62,.62].forEach(x=>{ strich(leiter,[x,.45,LZ-1.38],[x*.82,.04,LZ+.1],.07,HOLZ); ball(leiter,.1,HOLZ2,x,.46,LZ-1.38); });
    [.2,.45,.7].forEach(f=>box(leiter,1.22-f*.2,.06,.09,HOLZ,0,.45-f*.41,LZ-1.38+f*1.48)); buendle(leiter);
    /* Rahmen (flach, vorn offen begehbar) */
    [-1,1].forEach(s=>{ box(boden,.28,.14,3.4,HOLZ2,s*1.64,.07,LZ); for(let i=0;i<4;i++) ball(boden,.07,EISEN,s*1.64,.15,LZ-1.4+i*.93); });
    box(boden,3.56,.14,.24,HOLZ2,0,.07,LZ-1.6); box(boden,3,.06,.16,HOLZ2,0,.03,LZ+1.58);
  }
  const deckel=gruppe(sc,0,.11,-9.5);
  for(let i=0;i<6;i++) box(deckel,.48,.14,2.96,i%2?0xa06a34:HOLZ,-1.23+i*.492,0,1.5);
  [.45,2.45].forEach(z=>{ box(deckel,3,.05,.24,EISEN,0,.09,z); for(let i=0;i<7;i++) ball(deckel,.06,0x8a8e96,-1.32+i*.44,.12,z); });
  ring(deckel,.26,.05,GOLD,0,.12,1.35).rotation.x=Math.PI/2;
  buendle(deckel);
  const schloss=gruppe(deckel,0,.1,2.75);
  box(schloss,.9,.18,.6,GOLD,0,.08,0); ring(schloss,.24,.07,0xc0c6d0,0,.08,-.34).rotation.x=Math.PI/2;
  for(let i=0;i<3;i++) box(schloss,.2,.03,.28,0xfff3cf,-.26+i*.26,.18,.02);
  buendle(schloss);
  const unten=schein(sc,'rgba(255,190,90,.8)',0,.35,-7.9,3.4); unten.visible=false;
  const tuer=ausgang(k,{ steh:[0,-5.8], durch:[0,-8], tief:true, treffer:{x:0,y:.5,z:-8,b:3.3,h:1,t:3.3}, name:'Luke', schildOben:[0,2.3,-8], glanz:[0,.75,-6.9],
    bewege:auf=>{ deckel.rotation.x=-auf*1.85; schloss.visible=auf<.03; leiter.visible=auf>.08; unten.visible=auf>.25; unten.material.opacity=auf; } });

  /* ---------- Kerzen ---------- */
  const flamme=(p,x,y,z,s)=>{ kegel(p,.07*s,.24*s,FL,x,y+.12*s,z).castShadow=false; kegel(p,.035*s,.13*s,FL2,x,y+.1*s,z+.05*s).castShadow=false; };
  const kerze=(p,x,y,z,h)=>{ walze(p,.07,h,PAPIER,x,y+h/2,z); flamme(p,x,y+h,z,1); };
  const leuchten=[];
  const glimm=(p,x,y,z,gr,farbe)=>{ const s=schein(p,farbe||'rgba(255,180,80,.6)',x,y,z,gr); leuchten.push([s,gr,x*3+z]); };
  k.anim.push(t=>{ leuchten.forEach(([s,gr,v])=>{ const a=gr*(1+Math.sin(t*9+v)*.07+Math.sin(t*5.3+v*2)*.05); s.scale.set(a,a,1); }); });
  /* Standleuchter */
  [[-8.9,-12.45],[-3.6,-12.45],[2.65,-8.3],[-2.65,-8.3],[11.35,-12.45],[-13.8,4.4]].forEach(([x,z])=>{
    walze(deko,.3,.1,GOLD2,x,.05,z); walze(deko,.05,1.9,GOLD2,x,1,z); ball(deko,.11,GOLD,x,1.1,z); box(deko,.64,.06,.06,GOLD2,x,1.9,z);
    [-.3,0,.3].forEach(d=>{ walze(deko,.1,.05,GOLD,x+d,1.96,z); kerze(deko,x+d,1.97,z,d?.28:.44); });
    glimm(sc,x,2.55,z,1.7); k.kreis(x,z,.35); });
  flacker(k,-9,3.2,-11.2,0xffa040,.55,11); flacker(k,10.8,3.2,-11.2,0xffa040,.55,11); flacker(k,0,2.8,-10,0x8a78ff,.5,11); flacker(k,6,2.8,10.2,0xffb058,.55,11);

  /* ---------- Bücherregale (an den Wänden) ---------- */
  /* quer=false: an der Rückwand, quer=true: an einer Seitenwand (innen = Richtung in den Raum) */
  const regal=(g,liste,x,z,l,quer,innen)=>{
    const teilR=(a,t,w,h,d,c,y)=>quer?box(g,d,h,w,c,x+t*innen,y,z+a):box(g,w,h,d,c,x+a,y,z+t*innen);
    teilR(0,-.45,l,3.5,.1,0x3a2414,1.75);
    [-1,1].forEach(s=>teilR(s*(l/2-.08),0,.16,3.6,1,HOLZ2,1.8));
    [.12,.98,1.84,2.7,3.56].forEach(y=>teilR(0,0,l,.12,1.04,HOLZ,y));
    [0,1,2,3].forEach(f=>{ const y=.18+f*.86; let a=-l/2+.22;
      while(a<l/2-.3){ const dick=.1+zufall()*.13, hoch=.45+zufall()*.24;
        if(zufall()<.07){ const q=quer?[x+innen*.12,z+a+.18]:[x+a+.18,z+innen*.12]; walze(g,.15,.3,f%2?0x2a8a8a:0xc8602a,q[0],y+.15,q[1]); ball(g,.09,GOLD,q[0],y+.37,q[1]); a+=.42; continue; }
        const q=quer?[x+innen*.06,z+a+dick/2]:[x+a+dick/2,z+innen*.06];
        liste.push([q[0],y+hoch/2,q[1],quer?.62:dick*.9,hoch,quer?dick*.9:.62,BUCHFARBEN[Math.floor(zufall()*BUCHFARBEN.length)]]); a+=dick+.012; } });
  };
  regal(wh,buecher.h,4.55,-12.95,2.9,false,1); k.kasten(4.55,-12.9,3,1.2);
  regal(wl,buecher.l,-17.45,-5,4,true,1); k.kasten(-17.3,-5,1.4,4.2);
  regal(wl,buecher.l,-17.45,6.2,3.5,true,1); k.kasten(-17.3,6.2,1.4,3.6);
  regal(wr,buecher.r,17.45,.3,3.4,true,-1); k.kasten(17.3,.3,1.4,3.6);
  regal(wr,buecher.r,17.45,9.8,3.8,true,-1); k.kasten(17.3,9.8,1.4,4);
  [[R.hinten,buecher.h],[R.links,buecher.l],[R.rechts,buecher.r]].forEach(([wand,liste])=>{
    const im=new THREE.InstancedMesh(GEO.box,new THREE.MeshLambertMaterial({color:0xffffff}),liste.length), o=new THREE.Object3D(), c=new THREE.Color();
    liste.forEach((b,i)=>{ o.position.set(b[0],b[1],b[2]); o.scale.set(b[3],b[4],b[5]); o.updateMatrix(); im.setMatrixAt(i,o.matrix); im.setColorAt(i,c.setHex(b[6])); });
    im.receiveShadow=true; im.frustumCulled=false; wand.add(im); });
  /* Leiter am Regal */
  [-.4,.4].forEach(d=>strich(wl,[-15.95,0,6.2+d],[-16.85,3.7,6.2+d],.06,0x9a6a38)); for(let i=1;i<8;i++){ const f=i/8.4; box(wl,.1,.07,.8,0x9a6a38,-15.95-.9*f,3.7*f,6.2); }
  k.kasten(-16.3,6.2,.9,1.1);

  /* ---------- Eulen ---------- */
  const eule=(p,x,y,z,ry,s)=>{ const e=gruppe(p,x,y,z); e.rotation.y=ry; e.scale.setScalar(s);
    ball(e,.34,0x8a5a34,0,.4,0,1,1.2,.9); ball(e,.25,0xe0c498,0,.32,.14,1,1.15,.75); for(let i=0;i<7;i++) ball(e,.035,0x8a5a34,-.12+(i%4)*.08,.24+Math.floor(i/4)*.16,.33,1,.7,.5);
    ball(e,.29,0x9a6a40,0,.87,.02,1.1,.9,.95);
    [-1,1].forEach(v=>{ ball(e,.13,PAPIER,v*.12,.9,.23,1,1,.45); ball(e,.075,0xffb820,v*.12,.9,.29,1,1,.5); ball(e,.038,0x120a04,v*.12,.9,.33,1,1,.5); kegel(e,.085,.24,0x6a4224,v*.21,1.15,0).rotation.z=-v*.35; ball(e,.2,0x6a4224,v*.3,.43,-.02,.45,1.2,.85); walze(e,.04,.12,0xe8901a,v*.12,.04,.12); ball(e,.07,0xe8901a,v*.12,.02,.18,1,.4,1.3); });
    kegel(e,.06,.16,0xe8901a,0,.79,.31).rotation.x=2.7; return e; };
  eule(wh,3.8,3.62,-12.75,.2,.9); eule(wr,17.1,3.62,-.5,-1.2,.9); eule(wl,-17.1,3.62,-4.2,1.2,.85);
  /* fliegende Eule hoch oben */
  { const g=gruppe(sc,0,5.8,0), rumpf=eule(g,0,-.6,0,0,1); buendle(rumpf);
    const fl=[-1,1].map(v=>{ const a=gruppe(g,v*.25,0,0); ball(a,.4,0x6a4224,v*.4,0,0,1.25,.12,.65); ball(a,.24,0x8a5a34,v*.85,0,-.05,1.2,.12,.6); buendle(a); return a; });
    k.anim.push(t=>{ const a=t*.42; g.position.set(Math.cos(a)*10,5.7+Math.sin(t*1.3)*.3,-3+Math.sin(a)*6.5); g.rotation.y=Math.atan2(-Math.sin(a)*10,Math.cos(a)*6.5); fl[0].rotation.z=-Math.sin(t*6)*.6; fl[1].rotation.z=Math.sin(t*6)*.6; }); }
  fledermaus(k,-9,-6,3.2,6.9,1.2,1); fledermaus(k,9,3,3.6,6.9,-1,3);

  /* ---------- Wendeltreppe in der Ecke ---------- */
  { const g=gruppe(sc,-15.6,0,-11.1);
    walze(g,.3,6.4,DUNKEL,0,3.2,0); ball(g,.34,GOLD,0,6.5,0);
    let vor=null;
    for(let i=0;i<17;i++){ const a=.15+i*.37, y=.2+i*.31, cx=Math.cos(a), cz=Math.sin(a);
      const s=box(g,1.9,.16,.66,i%2?0xa06a34:HOLZ,cx*1.15,y,cz*1.15); s.rotation.y=-a;
      const kante=box(g,.12,.2,.7,HOLZ2,cx*2.08,y,cz*2.08); kante.rotation.y=-a;
      walze(g,.05,1.05,EISEN,cx*2.05,y+.55,cz*2.05); const oben=[cx*2.05,y+1.1,cz*2.05]; if(vor) strich(g,vor,oben,.07,GOLD2); vor=oben;
      if(i<5) walze(g,.09,y,DUNKEL,cx*1.7,y/2,cz*1.7); }
    ball(g,.13,GOLD,vor[0],vor[1],vor[2]);
    eule(g,0,6.68,0,.6,.75); buendle(g); k.verdecker(g,-15.6,-11.1,2.2); k.kasten(-15.6,-11.1,4.8,4.8); }

  /* ---------- Holzstützen mit Streben und Laternen ---------- */
  [[-3.9,-4.4],[4.1,-4.4],[-9.5,3.9],[8.3,5.6]].forEach(([x,z])=>{
    const g=gruppe(sc,x,0,z);
    box(g,.85,.35,.85,STEIND,0,.17,0); box(g,.48,5.5,.48,HOLZ2,0,3,0); box(g,.62,.14,.62,EISEN,0,.65,0); box(g,.62,.14,.62,EISEN,0,4.4,0);
    box(g,2,.28,.5,DUNKEL,0,5.85,0); [-1,1].forEach(s=>strich(g,[s*.2,4.9,0],[s*.85,5.75,0],.12,HOLZ));
    strich(g,[0,3.6,.2],[0,3.6,.62],.04,EISEN); box(g,.34,.06,.34,EISEN,0,3.4,.62); box(g,.24,.34,.24,LICHTGELB,0,3.18,.62); box(g,.34,.06,.34,EISEN,0,2.98,.62); kegel(g,.22,.18,EISEN,0,3.5,.62);
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>box(g,.035,.38,.035,EISEN,a*.13,3.18,.62+b*.13));
    buendle(g); glimm(g,0,3.2,.75,1.2); k.verdecker(g,x,z,.55); k.kasten(x,z,.85,.85); });

  /* ---------- Planetenmodell mit Sonne (dreht sich) ---------- */
  { const x=9.6, z=-2.8, g=gruppe(sc,x,0,z), fest=gruppe(g,0,0,0);
    walze(fest,1.25,.25,HOLZ2,0,.12,0); walze(fest,1,.2,HOLZ,0,.34,0); for(let i=0;i<8;i++){ const a=i/8*6.283; ball(fest,.1,GOLD,Math.cos(a)*1.12,.28,Math.sin(a)*1.12); }
    rohr(fest,.14,.34,1.1,GOLD2,0,.98,0); walze(fest,.07,2,GOLD,0,2.4,0); ring(fest,.34,.06,GOLD,0,1.5,0).rotation.x=Math.PI/2;
    buendle(fest);
    ball(g,.46,basis(0xffc428),0,3.75,0); glimm(g,0,3.75,0,2.4,'rgba(255,200,70,.65)');
    const arme=[[.85,1.75,.15,0xb8b0a8,1.1],[1.2,2.05,.22,0xe8a860,.8],[1.6,2.4,.26,0x3a80d8,.6],[2.0,2.75,.2,0xc8482a,.45],[2.4,3.1,.34,0xd8b07a,.3]].map(([r,y,gr,f,v],i)=>{
      const a=gruppe(g,0,0,0); strich(a,[0,y-.35,0],[r,y-.35,0],.035,GOLD); strich(a,[r,y-.35,0],[r,y,0],.03,GOLD); ball(a,gr,f,r,y,0);
      if(i===2){ ball(a,gr*.5,GRUEN,r+.1,y+.08,.18,1,1,.6); ball(a,.08,WEISS,r+.42,y+.12,0); }
      if(i===4) ring(a,gr*1.5,.035,PAPIER,r,y,0).rotation.x=1.25;
      walze(a,.14,.1,GOLD2,0,y-.35,0); buendle(a); return [a,v,i*1.7]; });
    k.anim.push(t=>{ arme.forEach(([a,v,s])=>{ a.rotation.y=t*v*.6+s; }); });
    k.verdecker(g,x,z,1.5); k.kreis(x,z,1.3); }

  /* ---------- Sternenkugel aus goldenen Ringen (dreht sich) ---------- */
  { const x=-2.3, z=2, g=gruppe(sc,x,0,z), fest=gruppe(g,0,0,0);
    walze(fest,.9,.16,HOLZ2,0,.08,0); [0,1,2,3].forEach(i=>{ const a=i*1.571+.78; strich(fest,[Math.cos(a)*.75,.12,Math.sin(a)*.75],[Math.cos(a)*.16,.8,Math.sin(a)*.16],.08,HOLZ); });
    walze(fest,.2,.16,GOLD2,0,.82,0); ring(fest,.95,.07,GOLD2,0,1.85,0,Math.PI).rotation.z=Math.PI; buendle(fest);
    const d=gruppe(g,0,1.85,0); ball(d,.4,0x2a3c9a,0,0,0);
    for(let i=0;i<26;i++){ const h=1-2*(i+.5)/26, q=Math.sqrt(1-h*h), a=i*2.4; ball(d,.035,LICHTGELB,Math.cos(a)*q*.405,h*.405,Math.sin(a)*q*.405); }
    ring(d,.85,.04,GOLD,0,0,0); ring(d,.78,.04,GOLD,0,0,0).rotation.x=Math.PI/2; ring(d,.71,.035,GOLD2,0,0,0).rotation.set(Math.PI/2+.45,0,0); ring(d,.64,.03,GOLD,0,0,0).rotation.y=Math.PI/2;
    strich(d,[-.5,-.8,0],[.5,.8,0],.025,GOLD2); ball(d,.08,GOLD,.5,.8,0);
    buendle(d); k.anim.push(t=>{ d.rotation.y=t*.35; });
    k.verdecker(g,x,z,.9); k.kreis(x,z,1); }

  /* ---------- Große Planeten auf Ständern ---------- */
  const planet=(x,z,r,f,streifen,reif)=>{ const g=gruppe(sc,x,0,z), fuss=gruppe(g,0,0,0), y=r+.8;
    walze(fuss,r*.75,.16,HOLZ2,0,.08,0); walze(fuss,.12,.8,GOLD2,0,.45,0); ring(fuss,r*.5,.06,GOLD,0,.82,0).rotation.x=Math.PI/2; buendle(fuss);
    const d=gruppe(g,0,y,0); ball(d,r,f,0,0,0);
    streifen.forEach(([h,c])=>{ const q=Math.sqrt(r*r-h*h*r*r); ring(d,q,.045,c,0,h*r,0).rotation.x=Math.PI/2; });
    ball(d,r*.22,streifen[0][1],r*.45,-r*.3,r*.78,1.4,.8,.5);
    if(reif){ [[1.45,.08,PAPIER],[1.72,.05,0xc89a60]].forEach(([m,dk,c])=>{ const o=ring(d,r*m,dk,c,0,0,0); o.rotation.x=1.3; o.scale.z=.4; }); }
    buendle(d); k.anim.push(t=>{ d.rotation.y=t*.25+x; });
    k.verdecker(g,x,z,r+.2); k.kreis(x,z,r+(reif?.35:.1)); };
  planet(-10.4,-8.4,.85,0xe0a060,[[-.5,0xa85a30],[-.1,0xf4dcb0],[.35,0xb86a3a],[.68,0xf4dcb0]]);
  planet(-8.4,11.2,.7,0xe8c878,[[-.4,0xc89a50],[.15,0xf8e8b8],[.55,0xc89a50]],true);
  /* hängende Planeten vor der Rückwand */
  [[-8.3,5.05,.22,0x3a80d8],[-4.2,4.9,.3,0xc8482a],[2.9,5.15,.24,0xb8b0a8],[6.9,4.5,.36,0x6ac0a0],[11.9,4.9,.28,0xb24ae0],[16.4,4.4,.4,0xe8a860]].forEach(([x,y,r,f],i)=>{
    const g=gruppe(R.hinten,x,y,-12.75); ball(g,r,f,0,0,0); ball(g,r*.4,PAPIER,r*.5,r*.35,r*.6,1.2,.6,.7); strich(g,[0,r,0],[0,H-y,0],.012,PAPIER); if(i%2===0) ring(g,r*1.5,.03,GOLD,0,0,0).rotation.x=1.25; buendle(g);
    k.anim.push(t=>{ g.rotation.y=t*.4+i; g.position.y=y+Math.sin(t*.8+i*2)*.08; }); });

  /* ---------- Kamin an der linken Wand ---------- */
  { const z=1.8;
    [-1,1].forEach(s=>{ box(wl,1.3,2.2,.7,STEINH,-17.35,1.1,z+s*1.55); box(wl,1.5,.3,.9,STEIND,-17.3,.15,z+s*1.55); });
    box(wl,1.5,.36,4.1,STEIND,-17.3,2.35,z); box(wl,1.7,.14,4.3,HOLZ,-17.2,2.6,z);
    box(wl,.9,3.4,2.6,STEINH,-17.55,4.3,z); box(wl,1,.16,2.75,STEIND,-17.52,4,z);
    box(wl,.14,2.2,2.5,basis(0x160a08),-17.9,1.1,z); box(wl,1.6,.12,3.9,STEIND,-17.15,.06,z);
    [[-.45,.28,.15],[.4,.28,-.2],[0,.46,.05]].forEach(([dz,y,dr],i)=>{ const s=walze(wl,.15,1.3,i%2?HOLZ:HOLZ2,-17.15,y,z+dz); s.rotation.set(Math.PI/2+dr,0,0); });
    const fg=gruppe(R.links,-17.05,.4,z);
    const fl=[[-.55,.8,0xff6a14],[0,1.3,0xff8a1e],[.55,.9,0xff6a14],[-.2,.8,0xffc030],[.28,.65,0xffe066]].map(([dz,h,f],i)=>{ const m=kegel(fg,.26+(i<3?.06:-.06),h,basis(f),i>2?.14:0,h/2,dz); m.castShadow=false; m.userData.h=h; return m; });
    glimm(fg,.5,.7,0,3,'rgba(255,130,50,.6)');
    k.anim.push(t=>{ fl.forEach((m,i)=>{ m.scale.y=m.userData.h*(1+Math.sin(t*(8+i*1.7)+i*2)*.2); m.position.y=m.scale.y/2; }); });
    kerze(wl,-17,2.67,z-1.7,.4); kerze(wl,-17,2.67,z+1.7,.3);
    [[-.9,0x2a8a8a],[-.3,ROT],[.8,BLAU]].forEach(([dz,f])=>{ walze(wl,.17,.36,f,-17.05,2.85,z+dz); ball(wl,.1,GOLD,-17.05,3.1,z+dz); });
    k.kasten(-17.1,z,1.8,4.2); flacker(k,-15.6,1.8,1.8,0xff7a28,.8,13);
  }
  /* Fass mit Besteck neben dem Kamin */
  rohr(deko,.48,.48,1,HOLZ,-17.05,.5,-1.6); [.2,.8].forEach(y=>ring(deko,.5,.04,EISEN,-17.05,y,-1.6).rotation.x=Math.PI/2); walze(deko,.42,.04,HOLZ2,-17.05,1.01,-1.6); walze(deko,.14,.34,0x2a8a8a,-17.05,1.2,-1.6); k.kreis(-17.05,-1.6,.6);

  /* ---------- Zaubertisch mit bunten Flaschen ---------- */
  { box(deko,1.9,.18,4,HOLZ,16.6,1.2,-5.5); [-1,1].forEach(a=>[-1,1].forEach(b=>box(deko,.2,1.15,.2,HOLZ2,16.6+a*.8,.57,-5.5+b*1.8))); box(deko,1.7,.1,3.7,HOLZ2,16.6,.4,-5.5);
    const farben=[0x3ae07a,0xff5ab0,0x48b8ff,0xffc21a,0xb24ae0,0xff6a3a].map(f=>basis(f));
    const glas=mat(0xdcecff,{transparent:true,opacity:.3,depthWrite:false});
    [[16.2,-7.1,0,1.2],[17,-6.7,1,.9],[16.3,-6.1,2,.85],[17.1,-5.7,3,1.3],[16.15,-4.9,4,1.1],[17.05,-4.4,5,.9],[16.4,-3.9,0,.8],[16.9,-3.75,2,1]].forEach(([x,z,f,s],i)=>{
      if(i%2){ ball(deko,.24*s,farben[f],x,1.29+.24*s,z); walze(deko,.08*s,.34*s,farben[f],x,1.29+.55*s,z); } else { kegel(deko,.28*s,.5*s,farben[f],x,1.29+.25*s,z); walze(deko,.08*s,.3*s,farben[f],x,1.29+.55*s,z); }
      walze(deko,.09*s,.12*s,HOLZ2,x,1.29+.76*s,z); ball(deko,.045*s,WEISS,x-.1*s,1.29+.3*s,z+.2*s); });
    glimm(sc,16.5,1.9,-5.5,2.6,'rgba(150,120,255,.45)');
    [[0,-6.5,0x3ae07a],[1,-5,0xff5ab0],[2,-4,0x48b8ff]].forEach(([i,z])=>{ walze(deko,.2,.22,STEINH,16,.56,z); walze(deko,.14,.5,farben[i],16,.7,z); });
    /* Regalbrett über dem Tisch */
    box(wr,.6,.1,3.2,HOLZ2,17.7,3,-5.6); [-6.9,-6.3,-5.6,-5,-4.4].forEach((z,i)=>{ walze(wr,.17,.4+(i%2)*.18,farben[i],17.7,3.25+(i%2)*.09,z); ball(wr,.08,HOLZ,17.7,3.52+(i%2)*.18,z); });
    k.kasten(16.6,-5.5,2.8,4.4); flacker(k,14.8,2.6,-5.5,0x9a70ff,.5,9);
    /* Kessel */
    const g=gruppe(sc,13,0,-6.9);
    ball(g,.7,0x24222c,0,.72,0,1,.85,1); ring(g,.58,.09,EISEN,0,1.17,0).rotation.x=Math.PI/2; [0,1,2].forEach(i=>{ const a=i*2.094+.4; strich(g,[Math.cos(a)*.45,.4,Math.sin(a)*.45],[Math.cos(a)*.62,0,Math.sin(a)*.62],.09,EISEN); }); walze(g,.52,.05,basis(0x58e88a),0,1.18,0);
    buendle(g); glimm(g,0,1.5,0,1.8,'rgba(90,255,150,.5)');
    const blasenM=basis(0xa8ffc4), blasen=[0,1,2,3,4,5].map(i=>ball(g,.09,blasenM,0,1.2,0));
    k.anim.push(t=>{ blasen.forEach((b,i)=>{ const p=(t*.55+i*.171)%1; b.position.set(Math.cos(i*2.2)*.3+Math.sin(t*2+i)*.06,1.2+p*1.3,Math.sin(i*2.2)*.3); b.scale.setScalar(.11*(1-p)+.01); }); });
    k.kreis(13,-6.9,.75); }

  /* ---------- Mondmodell in der hinteren rechten Ecke ---------- */
  walze(deko,1.1,.3,HOLZ2,16.5,.15,-11.7); walze(deko,.2,1,GOLD2,16.5,.75,-11.7); ball(deko,1.05,0xdedcc8,16.5,2.15,-11.7);
  [[-.5,.4,.82,.24],[.3,-.2,.95,.3],[-.1,-.6,.8,.17],[.55,.5,.66,.16],[-.8,-.1,.62,.2],[.05,.75,.68,.13]].forEach(([x,y,z,r])=>{ const l=Math.hypot(x,y,z)/1.03; ball(deko,r,0xb4b2a4,16.5+x/l,2.15+y/l,-11.7+z/l,1,1,.35).lookAt(16.5+2*x/l,2.15+2*y/l,-11.7+2*z/l); });
  ring(deko,1.25,.05,GOLD,16.5,2.15,-11.7).rotation.set(1.35,.25,0);
  walze(deko,.45,.8,0x2a8a8a,15.7,.4,-10.75); ball(deko,.3,GOLD,15.7,1.05,-10.75);
  k.kasten(16.6,-11.9,2.8,3.2);

  /* ---------- Bett der Sternguckerin oder des Sternguckers ---------- */
  box(deko,3.8,.45,2.2,HOLZ2,-15.8,.35,11.5); box(deko,.22,1.9,2.4,HOLZ,-17.6,.95,11.5); box(deko,.22,1,2.4,HOLZ,-14,.5,11.5);
  [-1,1].forEach(s=>{ ball(deko,.17,GOLD,-17.6,1.98,11.5+s*1.1); ball(deko,.14,GOLD,-14,1.08,11.5+s*1.1); });
  box(deko,3.4,.3,2,WEISS,-15.8,.7,11.5); box(deko,2.5,.14,2.1,BLAU,-15.3,.9,11.5); box(deko,.3,.17,2.12,PAPIER,-16.5,.91,11.5); ball(deko,.5,0xe8d8f4,-17,1.02,11.5,.8,.45,1.6);
  for(let i=0;i<14;i++){ const s=box(deko,.16,.02,.16,GOLD,-16+(i%5)*.52+(i%2)*.1,.98,10.75+Math.floor(i/5)*.68); s.rotation.y=.78; }
  k.kasten(-15.9,11.6,4.2,2.8);

  /* ---------- Teetisch vorn ---------- */
  walze(deko,.95,.14,HOLZ,6.2,1,11); walze(deko,.16,.95,HOLZ2,6.2,.48,11); walze(deko,.55,.1,HOLZ2,6.2,.05,11); walze(deko,.7,.02,ROT,6.2,1.08,11);
  ball(deko,.27,0x48a0c0,6.1,1.33,10.85); ball(deko,.08,GOLD,6.1,1.62,10.85); strich(deko,[6.3,1.28,10.85],[6.6,1.52,10.85],.05,0x48a0c0); ring(deko,.14,.035,0x48a0c0,5.82,1.34,10.85);
  [[5.6,11.35],[6.75,11.4]].forEach(([x,z])=>{ walze(deko,.18,.02,WEISS,x,1.1,z); rohr(deko,.12,.09,.18,WEISS,x,1.2,z); ring(deko,.06,.018,WEISS,x+.15,1.2,z); });
  kerze(deko,6.75,1.09,10.5,.35); glimm(sc,6.75,1.7,10.5,1.1);
  for(let i=0;i<5;i++) ball(deko,.1,0xd89a48,5.65+(i%3)*.17,1.14,10.5+Math.floor(i/3)*.18,1,.45,1);
  k.kreis(6.2,11,1);
  [[4.45,11.4],[7.95,10.7]].forEach(([x,z])=>{ walze(deko,.42,.12,HOLZ,x,.62,z); walze(deko,.34,.12,VIOLETT,x,.73,z); [0,1,2].forEach(i=>{ const a=i*2.094; strich(deko,[x+Math.cos(a)*.22,.6,z+Math.sin(a)*.22],[x+Math.cos(a)*.38,0,z+Math.sin(a)*.38],.06,HOLZ2); }); k.kreis(x,z,.42); });

  /* ---------- Lesesessel mit Beistelltisch ---------- */
  box(deko,1.5,.5,1.6,ROT,16.65,.55,5.2); box(deko,.45,1.9,1.7,ROT,17.45,1.2,5.2); walze(deko,.22,1.7,ROT,17.45,2.15,5.2).rotation.x=Math.PI/2;
  [-1,1].forEach(s=>{ box(deko,1.5,.45,.3,0x8a2430,16.65,.95,5.2+s*.8); walze(deko,.17,1.5,0x8a2430,16.65,1.18,5.2+s*.8).rotation.z=Math.PI/2; [-.6,.6].forEach(a=>walze(deko,.08,.3,HOLZ2,16.65+a,.15,5.2+s*.7)); });
  ball(deko,.4,GOLD,17.05,1.15,5.2,.4,1,1.1);
  k.kasten(16.9,5.2,2.2,2.2);

  /* ---------- Vorratsecke mit Fässern und Sack vorn rechts ---------- */
  [[16.8,12.5,1.25],[15.6,12.7,.9]].forEach(([x,z,h])=>{ rohr(deko,.5,.5,h,HOLZ,x,h/2,z); [.18,h-.18].forEach(y=>ring(deko,.52,.04,EISEN,x,y,z).rotation.x=Math.PI/2); walze(deko,.44,.04,HOLZ2,x,h+.01,z); });
  kerze(deko,15.6,.92,12.7,.3); 
  /* Sack: unten breit, oben zugebunden, mit offenem Zipfel und Flicken */
  ball(deko,.5,0xb89a68,14.5,.2,12.75,1.05,.42,.85); rohr(deko,.34,.5,.55,0xb89a68,14.5,.48,12.75); rohr(deko,.14,.34,.24,0xb89a68,14.5,.86,12.75); rohr(deko,.25,.12,.24,0xc8ac78,14.5,1.08,12.75,12,true);
  ring(deko,.14,.04,HOLZ2,14.5,.97,12.75).rotation.x=Math.PI/2; strich(deko,[14.5,.97,12.9],[14.62,.7,13.2],.022,HOLZ2); box(deko,.22,.2,.03,0x8a6a42,14.38,.47,12.33).rotation.set(.27,0,.2);
  k.kasten(16,12.5,4,1.8);

  /* ---------- Sitzkissen, Kleinteile, Körbe ---------- */
  [[-1.2,11.9,ROT],[2.4,-12.5,VIOLETT],[-12.2,12.4,0x2a8a8a]].forEach(([x,z,f])=>{ ball(deko,.55,f,x,.2,z,1,.42,1); ball(deko,.09,GOLD,x,.43,z); k.kreis(x,z,.5); });
  /* Korb mit zusammengerollten Decken */
  rohr(deko,.62,.46,.6,0xb88a4a,-6.2,.3,-9.2,16); ring(deko,.62,.06,0x8a5a2c,-6.2,.6,-9.2).rotation.x=Math.PI/2; [[-.2,BLAU],[.2,ROT]].forEach(([d,f])=>{ const s=walze(deko,.22,1.1,f,-6.2+d,.7,-9.2); s.rotation.x=Math.PI/2-.3; }); k.kreis(-6.2,-9.2,.65);
  /* Kürbislaternen mit freundlichem Gesicht */
  [[6.7,-9.9,.45],[-7.9,-6.9,.36]].forEach(([x,z,r])=>{ ball(deko,r,0xe87a1a,x,r*.8,z,1.15,.85,1.05); walze(deko,.06,.2,GRUEN,x,r*1.6,z); [-1,1].forEach(s=>ball(deko,r*.14,LICHTGELB,x+s*r*.38,r*.98,z+r*.98)); ring(deko,r*.35,.03,LICHTGELB,x,r*.78,z+r*1.03,Math.PI).rotation.z=Math.PI; k.kreis(x,z,r+.1); });
  /* Steinchen, Federn und Sternenzettel auf dem Boden */
  for(let i=0;i<70;i++){ const x=-16+zufall()*32, z=-12.4+zufall()*25; if(Math.abs(x)<2.2&&z<-5.5) continue; const s=box(boden,.14+zufall()*.1,.006,.05,i%3?PAPIER:0xb8b0d8,x,.026,z); s.rotation.y=zufall()*3; s.castShadow=false; }

  /* ---------- Spinnweben ---------- */
  const netzBild=bild(256,256,g=>{ g.strokeStyle='rgba(235,240,255,.7)'; g.lineWidth=2;
    for(let i=0;i<=5;i++){ const a=i/5*Math.PI/2; g.beginPath(); g.moveTo(0,0); g.lineTo(Math.cos(a)*250,Math.sin(a)*250); g.stroke(); }
    for(let r=45;r<250;r+=40){ g.beginPath(); for(let i=0;i<=5;i++){ const a=i/5*Math.PI/2, x=Math.cos(a)*r, y=Math.sin(a)*r; if(!i) g.moveTo(x,y); else g.quadraticCurveTo(Math.cos(a-.16)*r*.82,Math.sin(a-.16)*r*.82,x,y); } g.stroke(); } });
  const netzM=new THREE.MeshBasicMaterial({map:netzBild,transparent:true,depthWrite:false,side:THREE.DoubleSide});
  [[R.hinten,-B/2+1.2,H-1.1,-T/2+.26,1,0,2],[R.hinten,B/2-1.2,H-1.1,-T/2+.26,-1,0,2],[R.links,-B/2+.28,H-1.2,T/2-1.1,1,Math.PI/2,2],[R.rechts,B/2-.28,H-1.2,-T/2+1.2,1,-Math.PI/2,1.8]].forEach(([w,x,y,z,sx,ry,gr])=>{
    const m=new THREE.Mesh(new THREE.PlaneGeometry(gr,gr),netzM); m.position.set(x,y,z); m.scale.x=sx; m.rotation.y=ry; w.add(m); });

  /* schwebender Sternenstaub */
  { const P=[]; for(let i=0;i<160;i++) P.push(-17+zufall()*34,.8+zufall()*4.5,-12.5+zufall()*25);
    const q=new THREE.BufferGeometry(); q.setAttribute('position',new THREE.Float32BufferAttribute(P,3));
    const staub=new THREE.Points(q,new THREE.PointsMaterial({color:0xd8c8ff,size:.07,transparent:true,opacity:.7,depthWrite:false})); sc.add(staub);
    k.anim.push(t=>{ staub.position.y=Math.sin(t*.4)*.3; staub.position.x=Math.sin(t*.23)*.4; staub.material.opacity=.5+Math.sin(t*1.9)*.2; }); }

  [boden,deko,wh,wl,wr].forEach(buendle); boden.children.forEach(m=>{ m.castShadow=false; });

  katze(k,[[2.4,8],[2.2,-1.2],[-.4,-2.4],[-6,1.8],[-6.8,4.6],[-6.6,9.7],[-1,10.4]],1.3);
  maeuschen(k,[[10.3,10.2],[13.6,10.2],[13.4,10.9],[10.2,11]],2,3);

  return { tuer, start:[0,9.5] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-12.4,-12.2],[-16.6,-7.8],[-15,-2.8],[-14.4,7.2],[-13,11.3],[-8.7,-10.7],[-7.9,-8],[-5.25,-10.8],[2.2,-10.8],[6.4,-11.2],[11,-10.4],[14.6,-8.8],[15.8,-2.4],[16,3.2],[13.8,10.4],[8.9,11.9],[-6.4,11.9],[-10.6,2.2],[11.4,-.6],[-3.6,-.2]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { x:9, z:-10, steh:[9,-8.3], r:.95, treffer:[2.7,3.2,1.6], baue(g){ /* 1 Fernrohr aus Messing auf einem Dreibein */
      [[-.7,.5],[.75,.4],[0,-.75]].forEach(([x,z])=>{ strich(g,[x,.03,z],[0,1.65,0],.08,HOLZ); ball(g,.11,GOLD2,x,.07,z); });
      ring(g,.34,.035,GOLD2,0,.8,0).rotation.x=Math.PI/2; ball(g,.19,GOLD2,0,1.7,0); walze(g,.09,.35,GOLD2,0,1.85,0);
      const a=[-1,1.55,.45], b=[1.05,2.75,-.4], P=t=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
      stange(g,P(0),P(.2),.13,.13,0x2a1c14); stange(g,P(.18),P(.55),.2,.22,GOLD); stange(g,P(.53),P(.97),.27,.33,GOLD);
      [.19,.54,.75,.98].forEach((t,i)=>stange(g,P(t-.025),P(t+.025),[.23,.29,.31,.39][i],[.23,.29,.31,.39][i],i===2?0x7a2a22:GOLD2));
      stange(g,P(.995),P(1.015),.3,.3,basis(0x9ad8ff)); stange(g,P(-.07),P(0),.17,.17,GOLD);
      stange(g,[-.45,2.12,.22],[.25,2.53,-.07],.07,.07,GOLD2); } },
  { x:11.6, z:7.6, dreh:-.3, steh:[9.7,8.5], kasten:[2.2,1.8], treffer:[2.1,1.7,1.4], baue(g){ /* 2 Schatztruhe mit gewölbtem Deckel */
      box(g,1.85,.9,1.1,0x9a4a24,0,.55,0); const d=walze(g,.55,1.85,0xb45a2a,0,1,0); d.rotation.z=Math.PI/2; d.scale.set(.55,1.85,.55);
      [-.88,-.32,.32,.88].forEach(x=>{ box(g,.13,.92,1.14,GOLD,x,.55,0); const r=walze(g,.575,.13,GOLD,x,1,0); r.rotation.z=Math.PI/2; });
      box(g,1.9,.1,1.15,GOLD2,0,1,0); box(g,1.9,.1,1.15,GOLD2,0,.14,0);
      box(g,.42,.46,.1,GOLD,0,.86,.6); ball(g,.07,0x2a1a08,0,.9,.66); box(g,.045,.15,.04,0x2a1a08,0,.8,.66);
      [-1,1].forEach(s=>{ ring(g,.2,.04,GOLD2,s*.97,.7,0).rotation.y=Math.PI/2; [-.45,.45].forEach(z=>ball(g,.11,HOLZ2,s*.78,.07,z)); });
      [[-.5,.8],[.62,.78],[.4,.95],[.78,.95]].forEach(([x,z])=>walze(g,.12,.04,GOLD,x,.03,z)); } },
  { x:-7.5, z:-1.5, steh:[-7.5,.2], kasten:[1.7,1.3], treffer:[1.8,2.4,1.3], baue(g){ /* 3 Tisch mit Brief: Pult mit Schriftrolle, versiegeltem Brief und Feder */
      box(g,1.2,.16,.9,HOLZ2,0,.08,0); box(g,.34,1.35,.34,HOLZ,0,.8,0); ball(g,.24,HOLZ2,0,.7,0,1,.7,1); box(g,.8,.14,.6,HOLZ2,0,1.45,0);
      const p=gruppe(g,0,1.75,0); p.rotation.x=.55; box(p,1.65,.12,1.15,HOLZ,0,0,0); box(p,1.7,.14,.1,HOLZ2,0,.08,.58);
      const t=bild(256,200,c=>{ c.fillStyle='#f6e8bc'; c.fillRect(0,0,256,200); c.strokeStyle='#5a3a1a'; c.lineWidth=5; c.lineCap='round';
        for(let r=0;r<6;r++){ let x=24; while(x<(r===5?140:226)){ const w=16+((r*37+x)%28); c.beginPath(); c.moveTo(x,34+r*27); c.quadraticCurveTo(x+w*.3,24+r*27,x+w*.5,34+r*27); c.quadraticCurveTo(x+w*.75,42+r*27,x+w,32+r*27); c.stroke(); x+=w+10; } }
        c.fillStyle='#b8242c'; c.beginPath(); c.arc(200,170,16,0,6.3); c.fill(); });
      tafel(p,.68,.94,t,-.36,.075,-.01).rotation.x=-Math.PI/2;
      [-1,1].forEach(s=>{ walze(p,.085,1.04,PAPIER,-.36+s*.37,.14,-.01).rotation.x=Math.PI/2; [-1,1].forEach(v=>ball(p,.07,ROT,-.36+s*.37,.14,-.01+v*.56)); });
      /* versiegelter Brief rechts daneben */
      const u=bild(128,96,c=>{ c.fillStyle='#fffaf0'; c.fillRect(0,0,128,96); c.strokeStyle='#8a6a3a'; c.lineWidth=5; c.strokeRect(3,3,122,90); c.beginPath(); c.moveTo(4,6); c.lineTo(64,54); c.lineTo(124,6); c.moveTo(4,90); c.lineTo(46,42); c.moveTo(124,90); c.lineTo(82,42); c.stroke(); });
      box(p,.6,.05,.48,PAPIER,.47,.085,.08).rotation.y=-.12; const bp=tafel(p,.6,.48,u,.47,.113,.08); bp.rotation.set(-Math.PI/2,0,-.12);
      walze(p,.11,.05,0xc0242c,.47,.13,.09); walze(p,.055,.03,0xe84a4a,.47,.165,.09);
      walze(g,.12,.2,0x24304a,.98,1.55,-.2); box(g,.3,.06,.3,HOLZ2,.9,1.43,-.2); strich(g,[.98,1.6,-.2],[1.18,2.4,-.35],.018,WEISS); const f=ball(g,.13,WEISS,1.15,2.25,-.32,.5,1.9,.15); f.rotation.z=-.25; } },
  { x:-11.8, z:7.4, steh:[-10.2,8.1], r:.75, treffer:[1.9,3,1.3], baue(g){ /* 4 Brieftaube auf einer Stange, mit kleiner Briefrolle */
      walze(g,.6,.14,HOLZ2,0,.07,0); walze(g,.09,1.75,HOLZ,0,.95,0); const q=walze(g,.08,1.5,HOLZ,0,1.82,0); q.rotation.z=Math.PI/2; [-1,1].forEach(s=>ball(g,.12,GOLD,s*.75,1.82,0));
      [-1,1].forEach(s=>{ walze(g,.035,.26,0xe86a50,.02,2.0,s*.15); ball(g,.07,0xe86a50,.06,1.9,s*.15,1.5,.5,1); });
      ball(g,.4,0xeef0f8,0,2.38,0,1.4,.95,.9); ball(g,.3,0xdfe4f2,.34,2.5,0,.9,1.1,.85); ball(g,.25,WEISS,.55,2.86,0);
      ring(g,.19,.045,0x7aa0c8,.45,2.66,0).rotation.set(Math.PI/2,-.5,0);
      [-1,1].forEach(s=>{ ball(g,.05,0x181018,.66,2.92,s*.2); const w=ball(g,.34,0xaab4cc,-.1,2.45,s*.32,1.35,.62,.24); w.rotation.z=.18; ball(g,.2,0x8a94b0,-.42,2.37,s*.33,1.5,.4,.2).rotation.z=.3; });
      kegel(g,.075,.24,0xf0a030,.85,2.83,0).rotation.z=-Math.PI/2-.15;
      [-1,0,1].forEach(s=>{ const f=ball(g,.13,s?0xaab4cc:0xeef0f8,-.72,2.28,s*.13,2.2,.28,.75); f.rotation.z=.3; });
      /* kleine Briefrolle mit rotem Band, hängt am Schnabel */
      strich(g,[.9,2.8,.02],[.92,2.56,.14],.012,ROT);
      const rolle=gruppe(g,.92,2.5,.15); rolle.rotation.z=-.2; walze(rolle,.065,.34,PAPIER,0,0,0).rotation.z=Math.PI/2; walze(rolle,.075,.08,ROT,0,0,0).rotation.z=Math.PI/2; [-.17,.17].forEach(x=>ball(rolle,.05,0xd8c290,x,0,0,.4,1,1)); } },
  { wand:'hinten', x:-6.4, z:-13.5, steh:[-6.4,-12.1], treffer:[2.7,2.6,.7], trefferY:1.2, baue(g){ /* 5 Himmelskarte */
      box(g,2.75,2.65,.14,GOLD2,0,2.5,.1);
      const t=bild(384,368,c=>{ c.fillStyle='#0e1644'; c.fillRect(0,0,384,368); c.strokeStyle='#e8c45a'; c.lineWidth=5; [168,120,66].forEach(r=>{ c.beginPath(); c.arc(192,184,r,0,6.3); c.stroke(); });
        c.lineWidth=2; for(let i=0;i<12;i++){ const a=i/12*6.283; c.beginPath(); c.moveTo(192+Math.cos(a)*66,184+Math.sin(a)*66); c.lineTo(192+Math.cos(a)*168,184+Math.sin(a)*168); c.stroke(); }
        const stern=(x,y,r)=>{ c.fillStyle='#fff4b0'; c.beginPath(); for(let i=0;i<10;i++){ const a=i*Math.PI/5-Math.PI/2, q=i%2?r*.42:r; c.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q); } c.fill(); };
        [[[70,120],[105,90],[135,112],[160,78],[196,92]],[[236,132],[286,118],[300,168],[250,184],[236,132]],[[96,232],[130,262],[166,244],[190,296],[236,282]],[[270,240],[300,262],[318,224]]].forEach(s=>{ c.strokeStyle='#9ac8ff'; c.lineWidth=3; c.beginPath(); s.forEach(p=>c.lineTo(p[0],p[1])); c.stroke(); s.forEach((p,i)=>stern(p[0],p[1],i%2?9:13)); });
        c.fillStyle='#ffe082'; c.beginPath(); c.arc(192,184,26,0,6.3); c.fill(); c.fillStyle='#0e1644'; c.beginPath(); c.arc(204,176,22,0,6.3); c.fill();
        for(let i=0;i<60;i++){ c.fillStyle='#fff'; c.fillRect((i*83)%380,(i*137)%364,3,3); } });
      tafel(g,2.5,2.4,t,0,2.5,.18,true);
      [[-1.32,1.22],[1.32,1.22],[-1.32,3.78],[1.32,3.78]].forEach(([x,y])=>ball(g,.14,GOLD,x,y,.18)); } },
  { wand:'hinten', x:13.8, z:-13.5, steh:[13.8,-12.1], treffer:[2.9,2.4,.7], trefferY:1.2, baue(g){ /* 6 Landkarte */
      const t=bild(384,288,c=>{ c.fillStyle='#ecd9a4'; c.fillRect(0,0,384,288); c.fillStyle='#7ab4d8'; c.fillRect(14,14,356,260);
        const land=(f,p)=>{ c.fillStyle=f; c.strokeStyle='#6a5020'; c.lineWidth=4; c.beginPath(); c.moveTo(p[0][0],p[0][1]); p.slice(1).forEach(q=>c.lineTo(q[0],q[1])); c.closePath(); c.fill(); c.stroke(); };
        land('#e4cc88',[[30,60],[90,30],[170,52],[214,34],[250,80],[222,128],[260,176],[214,236],[130,222],[100,256],[42,214],[62,160],[28,120]]);
        land('#9ac060',[[60,80],[130,66],[190,92],[170,150],[190,196],[120,200],[80,168],[94,128]]);
        land('#e4cc88',[[290,150],[340,128],[356,184],[318,214],[282,190]]);
        c.fillStyle='#7a6a50'; [[96,110],[124,100],[150,116]].forEach(p=>{ c.beginPath(); c.moveTo(p[0]-18,p[1]+18); c.lineTo(p[0],p[1]-18); c.lineTo(p[0]+18,p[1]+18); c.fill(); });
        c.strokeStyle='#b8242c'; c.lineWidth=5; c.setLineDash([11,9]); c.beginPath(); c.moveTo(70,190); c.bezierCurveTo(130,140,180,220,200,150); c.bezierCurveTo(214,110,270,140,310,172); c.stroke(); c.setLineDash([]);
        c.lineWidth=8; c.beginPath(); c.moveTo(298,160); c.lineTo(322,186); c.moveTo(322,160); c.lineTo(298,186); c.stroke();
        c.fillStyle='#4a3a28'; c.fillRect(56,176,26,22); c.fillRect(52,166,10,14); c.fillRect(76,166,10,14);
        c.save(); c.translate(318,62); [0,1,2,3].forEach(i=>{ c.rotate(Math.PI/2); c.fillStyle=i===3?'#b8242c':'#3a2a14'; c.beginPath(); c.moveTo(0,-42); c.lineTo(10,0); c.lineTo(-10,0); c.fill(); }); c.fillStyle='#ecd9a4'; c.beginPath(); c.arc(0,0,8,0,6.3); c.fill(); c.restore(); });
      tafel(g,2.65,2,t,0,2.4,.17);
      [1.35,3.45].forEach(y=>{ walze(g,.14,2.9,HOLZ,0,y,.18).rotation.z=Math.PI/2; [-1,1].forEach(s=>ball(g,.17,GOLD,s*1.5,y,.18)); });
      [-1,1].forEach(s=>strich(g,[s*1.1,3.5,.14],[0,4.25,.08],.025,ROT)); ball(g,.1,GOLD,0,4.25,.12); } },
  { x:14, z:2.5, steh:[12.2,2.9], r:.85, treffer:[1.8,3,1.6], baue(g,k){ /* 7 Große Sanduhr */
      [[.14,0],[2.78,1]].forEach(([y,o])=>{ walze(g,.78,.2,HOLZ,0,y,0); walze(g,.62,.1,GOLD2,0,y+(o?.14:-.1),0); ring(g,.78,.05,GOLD,0,y,0).rotation.x=Math.PI/2; });
      ball(g,.14,GOLD,0,3.08,0);
      [0,1,2].forEach(i=>{ const a=i*2.094-.52, x=Math.cos(a)*.66, z=Math.sin(a)*.66; walze(g,.07,2.5,HOLZ2,x,1.46,z); [.55,1.46,2.37].forEach(y=>ball(g,.12,GOLD,x,y,z)); });
      dreh(g,[[.46,0],[.54,.18],[.52,.5],[.34,.86],[.09,1.18],[.07,1.26],[.09,1.34],[.34,1.66],[.52,2.02],[.54,2.34],[.46,2.52]],mat(0xcfeaff,{transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide}),0,.2,0);
      kegel(g,.46,.6,0xf0c050,0,.55,0); walze(g,.47,.14,0xf0c050,0,.31,0);
      const o=kegel(g,.37,.48,0xf0c050,0,1.84,0); o.rotation.x=Math.PI;
      ring(g,.1,.04,GOLD,0,1.46,0).rotation.x=Math.PI/2;
      /* rieselnder Sand */
      const s=walze(k.scene,.025,.65,basis(0xffd868),14,1.15,2.5);
      k.anim.push(t=>{ s.scale.x=s.scale.z=.022+Math.sin(t*23)*.008; }); } },
  { x:-4.2, z:7.2, steh:[-4.2,9], kasten:[2.1,1.5], treffer:[2.1,1.9,1.4], baue(g){ /* 8 Bücherstapel */
      const buch=(x,y,z,w,h,d,f,r)=>{ const b=gruppe(g,x,y,z); b.rotation.y=r; box(b,w,h*.18,d,f,0,h*.41,0); box(b,w,h*.18,d,f,0,-h*.41,0); box(b,w*.12,h,d,f,-w*.45,0,0); box(b,w*.9,h*.66,d*.93,0xf8f0d4,w*.02,0,0); [-.3,.3].forEach(a=>box(b,w*.13,h*1.02,.07,GOLD,-w*.45,0,a*d)); box(b,w*.4,.012,d*.16,GOLD,0,h*.5,d*.2); };
      [[1.45,.32,1.05,ROT,.12],[1.3,.28,.95,BLAU,-.2],[1.35,.24,1,GRUEN,.28],[1.15,.3,.85,GOLD2,-.08],[1.2,.22,.88,VIOLETT,.34]].reduce((y,[w,h,d,f,r],i)=>{ buch(-.25+(i%2?.07:-.05),y+h/2,0,w,h,d,f,r); return y+h; },0);
      [[.8,.2,.7,0x2a8a8a,.5],[.74,.22,.65,0xc8602a,.2],[.68,.18,.6,ROT,.7]].reduce((y,[w,h,d,f,r])=>{ buch(.7,y+h/2,.2,w,h,d,f,r); return y+h; },0);
      /* aufgeschlagenes Buch obenauf */
      const o=gruppe(g,-.25,1.46,0); o.rotation.set(.3,.1,0); [-1,1].forEach(s=>{ const h=gruppe(o,s*.31,0,0); h.rotation.z=s*.2; box(h,.66,.05,.86,ROT,0,0,0); box(h,.6,.07,.78,0xfcf6e0,0,.05,0); for(let i=0;i<5;i++) box(h,.42,.012,.03,0x5a4a38,0,.09,-.28+i*.14); });
      box(g,.08,.4,.02,0xe83a4a,.3,.98,.55); } },
  { x:4.9, z:3, steh:[4.9,4.7], r:.75, treffer:[1.7,2.5,1.5], baue(g){ /* 9 Blumentopf mit großen Blumen */
      walze(g,.68,.1,0xa8502a,0,.05,0);
      dreh(g,[[0,0],[.42,0],[.6,.8],[.7,.82],[.7,1.02],[.58,1.02],[.56,.92]],mat(0xd0663a,{side:THREE.DoubleSide}),0,.1,0);
      walze(g,.57,.06,0x4a2c1a,0,1.02,0); ring(g,.63,.03,0xf0c8a0,0,.62,0).rotation.x=Math.PI/2;
      [[0,2.35,.05,0xff4a6a],[-.48,1.92,.2,0xffc820],[.5,2.02,.1,0x5a90ff],[-.15,1.68,.42,0xf4f0ff],[.22,1.9,-.35,0xc060e8]].forEach(([x,y,z,f])=>{
        strich(g,[x*.3,1,z*.3],[x,y,z],.035,GRUEN); const b=gruppe(g,x,y,z); b.rotation.x=.55; b.rotation.z=-x*.5;
        for(let i=0;i<6;i++){ const a=i*1.047; ball(b,.15,f,Math.cos(a)*.19,0,Math.sin(a)*.19,1.15,.35,1.15); } ball(b,.12,f===0xffc820?0x8a4a18:0xffd830,0,.05,0,1,.7,1); });
      for(let i=0;i<9;i++){ const a=i*2.4, h=1.18+(i%3)*.16, l=ball(g,.22,i%2?0x4aa04a:0x2f7a3a,Math.cos(a)*.42,h,Math.sin(a)*.42,1.4,.22,.7); l.rotation.set(0,-a,.4); } } },
  { x:-12.5, z:-3.8, steh:[-10.8,-3.5], r:.8, treffer:[1.7,3.5,1.7], baue(g){ /* 10 Vogelkäfig mit offener Tür und buntem Vogel */
      walze(g,.55,.12,HOLZ2,0,.06,0); walze(g,.1,1.1,GOLD2,0,.65,0); ball(g,.17,GOLD,0,.7,0);
      walze(g,.82,.14,GOLD2,0,1.24,0); ring(g,.82,.05,GOLD,0,1.31,0).rotation.x=Math.PI/2;
      /* Tür vorn: Lücke in den Stäben */
      for(let i=0;i<18;i++){ const a=i/18*6.283, x=Math.cos(a)*.76, z=Math.sin(a)*.76; if(!(z>.6)) walze(g,.022,1.35,GOLD,x,1.97,z); stange(g,[x,2.64,z],[x*.7,2.98,z*.7],.022,.022,GOLD); stange(g,[x*.7,2.98,z*.7],[0,3.2,0],.022,.022,GOLD); }
      [1.95,2.64].forEach((y,i)=>{ if(i) ring(g,.76,.04,GOLD,0,y,0).rotation.x=Math.PI/2; else ring(g,.76,.03,GOLD,0,y,0,Math.PI*1.4).rotation.set(Math.PI/2,0,Math.PI*.8); });
      ring(g,.53,.025,GOLD,0,2.98,0).rotation.x=Math.PI/2; ball(g,.11,GOLD,0,3.23,0); ring(g,.14,.03,GOLD,0,3.42,0);
      /* offene Tür, nach außen geschwenkt */
      const t=gruppe(g,-.46,1.37,.62); t.rotation.y=-2.1; [0,.23,.46,.68].forEach(x=>walze(t,.025,.95,GOLD,x,.47,0)); [0,.5,.95].forEach(y=>box(t,.72,.05,.05,GOLD,.34,y,0));
      walze(g,.035,1.3,HOLZ,0,1.75,0).rotation.z=Math.PI/2;
      ball(g,.26,0xe8343c,0,2.05,.05,1.1,1.15,1); ball(g,.17,0xffd428,.03,1.98,.22,1,1.1,.7); ball(g,.19,0xe8343c,.1,2.39,.1); [-1,1].forEach(s=>{ ball(g,.18,0x2a78e0,-.04+s*.24,2.06,.02,.45,1.15,.9); });
      [[.03,.27],[.2,.25]].forEach(([x,z])=>{ ball(g,.05,WEISS,x,2.44,z); ball(g,.028,0x101008,x+.005,2.44,z+.04); });
      kegel(g,.07,.18,0xffa020,.16,2.34,.3).rotation.x=1.7; [-1,0,1].forEach(s=>{ strich(g,[-.05,1.9,-.05],[-.15+s*.1,1.45,-.3],.04,s?0x2a78e0:0x30b050); kegel(g,.04,.2,0x30b050,.08+s*.07,2.62,.08).rotation.z=-s*.5; }); } }
];

return { titel:'Das Turmzimmer', breite:36, tiefe:27, baue, gegenstaende, verstecke };
})();

/* Raum 5: Das Torhaus mit Wachstube, früher Morgen. Gegenstände 1 bis 8 wie im 2D-Szenario, 9 und 10 sind neu.
   Ausgang: die Zugbrücke in der hinteren Wand klappt nach außen über den Wassergraben. */
RAEUME3D.burg[4] = (function(){
const { HOLZ, HOLZ2, EISEN, STEIN, STROH, fackel, laeufer, katze, huelle, flacker, ausgang } = BURG;
const B=36, T=27, H=6.4;
const HELL=0xb98a52, GOLD=0xd8a73a, SILBER=0xb4bac4, ROT=0xb83228, BLAU=0x2a56a0, CREME=0xf4ecd8;

/* warme Sandsteinquader, deutlich anders als die grauen Mauern im Verlies */
function sandstein(){
  return bild(512,512,g=>{ g.fillStyle='#8a755a'; g.fillRect(0,0,512,512);
    for(let r=0;r<8;r++){ let x=(r%2)*-56;
      while(x<512){ const w=104+((r*5+Math.floor(x/104)*3+9)%3)*16, h=Math.floor(zufall()*26);
        const mal=xx=>{ g.fillStyle='rgb('+(196+h)+','+(170+h)+','+(128+h)+')'; g.fillRect(xx+3,r*64+3,w-6,58);
          g.fillStyle='rgba(255,250,220,.22)'; g.fillRect(xx+3,r*64+3,w-6,7); g.fillStyle='rgba(90,60,30,.2)'; g.fillRect(xx+3,r*64+52,w-6,9);
          for(let i=0;i<20;i++){ g.fillStyle=i%2?'rgba(90,60,30,.16)':'rgba(255,255,255,.14)'; g.fillRect(xx+8+((i*37)%(w-18)),r*64+8+((i*23)%44),4,3); } };
        mal(x); if(x<0) mal(x+512); x+=w; } } });
}
/* Kopfsteinpflaster */
function pflaster(){
  return bild(1024,1024,g=>{ g.fillStyle='#6a5c48'; g.fillRect(0,0,1024,1024);
    const F=['#b6a68c','#a8987e','#c4b298','#9c9080','#b0a496','#bca486'];
    for(let r=0;r<16;r++) for(let i=0;i<14;i++){ const w=1024/14, x=i*w+(r%2)*w/2+(zufall()-.5)*8, y=r*64+32+(zufall()-.5)*6, a=w/2-4+zufall()*2, b=25+zufall()*4, f=F[Math.floor(zufall()*F.length)];
      const mal=xx=>{ g.fillStyle='rgba(50,36,20,.45)'; g.beginPath(); g.ellipse(xx+2,y+4,a,b,0,0,6.283); g.fill();
        g.fillStyle=f; g.beginPath(); g.ellipse(xx,y,a,b,(i%3-1)*.07,0,6.283); g.fill();
        g.fillStyle='rgba(255,248,225,.28)'; g.beginPath(); g.ellipse(xx-6,y-8,a*.55,b*.35,0,0,6.283); g.fill(); };
      mal(x); if(x+a>1024) mal(x-1024); if(x-a<0) mal(x+1024); } });
}
/* Alle einfarbigen, festen Teile einer Gruppe zu EINEM Körper mit Eckpunktfarben bündeln (ein Zeichenaufruf).
   Nicht für Gegenstände benutzen: die fasst die Raumansicht selbst zusammen und würde die Farben verlieren. */
function buendeln(g){
  g.updateMatrixWorld(true);
  const inv=new THREE.Matrix4().copy(g.matrixWorld).invert(), P=[], N=[], F=[], weg=[]; let schatten=false;
  g.traverse(m=>{ if(!m.isMesh || m.isInstancedMesh) return; const s=m.material; if(!s.isMeshLambertMaterial || !s.visible || s.transparent || s.map || s.side!==THREE.FrontSide) return;
    const q=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone(); q.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv,m.matrixWorld));
    const p=q.attributes.position.array, n=q.attributes.normal.array; for(let i=0;i<p.length;i+=3){ P.push(p[i],p[i+1],p[i+2]); N.push(n[i],n[i+1],n[i+2]); F.push(s.color.r,s.color.g,s.color.b); }
    q.computeBoundingSphere(); if(m.castShadow && q.boundingSphere.radius>.25) schatten=true; q.dispose(); weg.push(m); });
  if(!weg.length) return;
  weg.forEach(m=>m.parent.remove(m));
  const geo=new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.Float32BufferAttribute(P,3)); geo.setAttribute('normal',new THREE.Float32BufferAttribute(N,3)); geo.setAttribute('color',new THREE.Float32BufferAttribute(F,3));
  const neu=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({vertexColors:true})); neu.castShadow=schatten; neu.receiveShadow=true; g.add(neu);
}
/* Fass, Kiste, Sack: kleine Bausteine für die Ausstattung */
function fass(p,x,y,z,s){
  const g=gruppe(p,x,y,z); g.scale.setScalar(s||1);
  rohr(g,.4,.4,.4,0xa0703a,0,.6,0,14); rohr(g,.4,.34,.4,0x946434,0,.2,0,14); rohr(g,.34,.4,.4,0x946434,0,1,0,14);
  walze(g,.31,.03,0xb8864a,0,1.215,0);
  [.12,.42,.8,1.1].forEach(h=>{ const r=ring(g,h===.42||h===.8?.405:.37,.025,EISEN,0,h,0); r.rotation.x=Math.PI/2; });
  return g;
}
function kiste(p,x,y,z,s,dreh){
  const g=gruppe(p,x,y,z); g.rotation.y=dreh||0;
  box(g,s,s,s,0xa87c46,0,s/2,0);
  [-1,1].forEach(a=>{ [-1,1].forEach(b=>box(g,.1,s+.02,.1,HOLZ2,a*(s/2-.03),s/2,b*(s/2-.03))); box(g,s+.04,.09,s+.04,HOLZ2,0,s/2+a*(s/2-.04),0); });
  return g;
}
function sack(p,x,y,z,c,s){
  const g=gruppe(p,x,y,z); g.scale.setScalar(s||1);
  ball(g,.46,c,0,.42,0,1,1.05,.9); ball(g,.3,c,0,.78,0,1,.8,.9); walze(g,.12,.2,c,0,1.02,0);
  const r=ring(g,.14,.035,0x8a5a2a,0,.99,0); r.rotation.x=Math.PI/2; kegel(g,.19,.17,c,0,1.17,0).rotation.x=Math.PI;
  return g;
}
/* Wächterin oder Wächter ohne Waffe, Blick nach +x */
function wache(par,farbe,haar,zopf){
  const g=gruppe(par,0,0,0), rumpf=gruppe(g,0,0,0), haut=0xe8b890;
  rohr(rumpf,.27,.4,.85,farbe,0,1.17,0,16); walze(rumpf,.35,.1,0x4a2a12,0,.98,0); box(rumpf,.08,.12,.14,GOLD,.35,.98,0);
  const w=box(rumpf,.04,.26,.26,0xf3d27a,.325,1.32,0); w.rotation.x=Math.PI/4;
  ball(rumpf,.31,haut,0,1.9,0); [-1,1].forEach(s=>{ ball(rumpf,.04,0x20140e,.29,1.92,s*.11); ball(rumpf,.05,0xe89a8a,.26,1.82,s*.17,.5,.7,1); ball(rumpf,.28,farbe,0,1.5,s*.24,.8,.55,.7); });
  const m=ring(rumpf,.085,.016,0x8a3a30,.3,1.81,0,Math.PI); m.rotation.set(0,Math.PI/2,Math.PI);
  ball(rumpf,.31,haar,-.07,1.9,0,.95,1,1.05);
  const helm=new THREE.Mesh(new THREE.SphereGeometry(.35,18,10,0,Math.PI*2,0,Math.PI*.5),mat(SILBER)); helm.position.set(-.01,2.0,0); rumpf.add(helm);
  walze(rumpf,.44,.045,0x969ca6,-.01,2.0,0); ball(rumpf,.07,GOLD,-.01,2.36,0);
  if(zopf) for(let i=0;i<5;i++) ball(rumpf,.12-i*.014,haar,-.34-i*.02,1.76-i*.14,0);
  const glied=(x,y,z,c,r,l,fuss)=>{ const a=gruppe(g,x,y,z); walze(a,r,l,c,0,-l/2,0); if(fuss) ball(a,.14,0x3a2210,.07,-l,0,1.4,.65,1); else ball(a,.1,haut,0,-l-.03,0); buendeln(a); return a; };
  const beine=[-1,1].map(s=>glied(0,.78,s*.16,0x4a3a5a,.11,.7,true)), arme=[-1,1].map(s=>{ const a=glied(0,1.52,s*.42,farbe,.085,.6,false); a.rotation.x=-s*.12; return a; });
  buendeln(rumpf);
  return { g, beine, arme };
}
function huhn(k,farbe){
  const g=gruppe(k.scene,0,0,0);
  ball(g,.28,farbe,0,.4,0,1.25,1,.95); ball(g,.17,farbe,.3,.7,0); const s=kegel(g,.17,.36,farbe,-.4,.58,0); s.rotation.z=.75;
  [-1,1].forEach(v=>{ ball(g,.17,farbe===CREME?0xe0d4bc:0x8a4a22,-.04,.43,v*.24,1.2,.65,.4); ball(g,.025,0x14100e,.42,.75,v*.1); walze(g,.022,.22,0xe8a020,0,.11,v*.1); box(g,.18,.025,.07,0xe8a020,.06,.013,v*.1); });
  [0,.07,.13].forEach((d,i)=>ball(g,.055,ROT,.36-d,.87-(i===2?.03:0),0)); const n=kegel(g,.055,.15,0xe8a020,.51,.68,0); n.rotation.z=-Math.PI/2; ball(g,.04,ROT,.43,.58,0,.7,1.3,.7);
  buendeln(g); return g;
}
function kueken(k){
  const g=gruppe(k.scene,0,0,0);
  ball(g,.14,0xffd83a,0,.18,0,1.15,1,1); ball(g,.095,0xffe25a,.13,.33,0); const n=kegel(g,.032,.08,0xe88a20,.24,.32,0); n.rotation.z=-Math.PI/2;
  [-1,1].forEach(v=>{ ball(g,.017,0x14100e,.2,.36,v*.055); walze(g,.012,.09,0xe88a20,0,.045,v*.05); });
  buendeln(g); return g;
}
function vogelKoerper(par,c,bauch){
  ball(par,.15,c,0,0,0,1.4,.95,.9); ball(par,.09,bauch,.06,-.05,0,1.3,.8,.9); ball(par,.1,c,.2,.09,0);
  const n=kegel(par,.035,.1,0xe8a020,.34,.08,0); n.rotation.z=-Math.PI/2; [-1,1].forEach(v=>ball(par,.018,0x14100e,.27,.12,v*.065));
  const s=box(par,.24,.03,.14,c,-.28,.02,0); s.rotation.z=-.25;
}
/* fliegender Vogel: Kreisbahn mit Flügelschlag */
function vogel(k,cx,cz,r,h,tempo,start){
  const g=gruppe(k.scene,cx,h,cz), r1=gruppe(g,0,0,0); g.scale.setScalar(.7); vogelKoerper(r1,0x2c4468,CREME); buendeln(r1);
  const fl=[-1,1].map(s=>{ const f=new THREE.Shape(); f.moveTo(.12,0); f.lineTo(-.06,.55); f.lineTo(-.2,.62); f.lineTo(-.12,0); f.lineTo(.12,0);
    const a=gruppe(g,0,.03,s*.08), w=new THREE.Mesh(new THREE.ShapeGeometry(f),mat(0x3c587e,{side:THREE.DoubleSide})); w.rotation.x=s*Math.PI/2; a.add(w); return a; });
  g.traverse(m=>{ m.castShadow=false; });
  k.anim.push(t=>{ const a=t*tempo+start; g.position.set(cx+Math.cos(a)*r,h+Math.sin(t*1.9+start)*.3,cz+Math.sin(a)*r); g.rotation.y=Math.atan2(-Math.cos(a)*tempo,-Math.sin(a)*tempo); fl[0].rotation.x=Math.sin(t*11+start)*.65; fl[1].rotation.x=-Math.sin(t*11+start)*.65; });
}
/* Spatz, hüpft zwischen zwei Stellen und pickt */
function spatz(k,x,z,dx,dz,start){
  const g=gruppe(k.scene,x,0,z), r=gruppe(g,0,.2,0); vogelKoerper(r,0x8a5a34,0xd8c8a8); [-1,1].forEach(v=>walze(r,.012,.13,0x6a4a20,0,-.14,v*.05)); buendeln(r); g.traverse(m=>{ m.castShadow=false; });
  k.anim.push(t=>{ const p=((t+start)%9)/9, hin=p<.5, u=Math.max(0,Math.min(1,((hin?p:p-.5)-.3)/.15)), a=hin?u:1-u;
    g.position.set(x+dx*a,u>0&&u<1?Math.abs(Math.sin(u*Math.PI*3))*.25:0,z+dz*a); g.rotation.y=Math.atan2(-dz,dx)+((hin?u>0:u<1)?(hin?0:Math.PI):0);
    r.rotation.z=(u===0||u===1)&&Math.sin(t*5+start)>.5?-.6:0; });
}

function baue(k){
  const wandBild=sandstein(), boden=pflaster();
  const { sc, hinten, links, rechts } = huelle(k,{ B, T, H, wandBild, bodenBild:boden, bodenWdh:[B/10,T/10], oeffnung:{x:0,b:5,h:4.5},
    himmel:0xdcecff, grund:0x9a7c58, staerke:.72, sonne:0xffe0ac, sonneStaerke:.55, leiste:0x9a8262 });
  sc.background=new THREE.Color(0xb4dcf4);

  /* Feste Ausstattung wird am Ende je Farbe in einem Zug zusammengefasst (wenige Zeichenaufrufe) */
  const fest=gruppe(sc,0,0,0), festHinten=gruppe(hinten,0,0,0), festLinks=gruppe(links,0,0,0), festRechts=gruppe(rechts,0,0,0);

  /* ---------- draußen: Wiese, Wassergraben, Morgenhimmel (nur durch das Tor zu sehen) ---------- */
  const wiese=new THREE.Mesh(new THREE.PlaneGeometry(170,170),mat(0x6f9c48)); wiese.rotation.x=-Math.PI/2; wiese.position.y=-.04; sc.add(wiese);
  const graben=new THREE.Mesh(new THREE.PlaneGeometry(170,3.2),basis(0x4a94c8)); graben.rotation.x=-Math.PI/2; graben.position.set(0,-.025,-15.55); sc.add(graben);
  const draussen=gruppe(fest,0,0,0);
  [-13.95,-17.2].forEach(z=>{ for(let i=0;i<36;i++){ const x=-17.5+i+zufall()*.3, r=.2+zufall()*.14; if(Math.abs(x)>=3) ball(draussen,r,i%2?0x9a9488:0xb0a694,x,0,z,1.3,.55,1); } });   /* Lücke für die Zugbrücke */
  box(draussen,2.6,.03,1.5,0xcaa878,0,-.02,-18);
  for(let i=0;i<40;i++){ const x=(i%2?1:-1)*(2.9+zufall()*6), z=-17.5-zufall()*1.1; walze(draussen,.015,.22,0x3a7a2a,x,.11,z); ball(draussen,.07,[0xffffff,0xf3d24a,0xe86a8a][i%3],x,.24,z); }
  [-4.2,4.4,-7.5,7.8].forEach((x,i)=>{ walze(draussen,.14,1,HOLZ2,x,.5,-18); ball(draussen,.62,i%2?0x4f9a4a:0x3f8a4a,x,1.35,-18); ball(draussen,.45,0x62aa50,x+.3,1.05,-17.8); });
  const wellen=new THREE.InstancedMesh(GEO.box,basis(0xd4f0ff),8), wo=new THREE.Object3D(); wellen.frustumCulled=false; sc.add(wellen);
  k.anim.push(t=>{ for(let i=0;i<8;i++){ wo.position.set(-9+((t*.6+i*2.35)%18),-.01,-14.4-(i%4)*.75); wo.scale.set(.6,.012,.07); wo.updateMatrix(); wellen.setMatrixAt(i,wo.matrix); } wellen.instanceMatrix.needsUpdate=true; });
  const morgen=bild(1024,400,g=>{ const v=g.createLinearGradient(0,0,0,400); v.addColorStop(0,'#6cb4ea'); v.addColorStop(.45,'#bfe0ee'); v.addColorStop(.62,'#fbe6b0'); v.addColorStop(.78,'#ffd49a'); g.fillStyle=v; g.fillRect(0,0,1024,400);
    const s=g.createRadialGradient(590,200,0,590,200,115); s.addColorStop(0,'rgba(255,250,200,1)'); s.addColorStop(1,'rgba(255,240,170,0)'); g.fillStyle=s; g.fillRect(460,70,260,260); g.fillStyle='#fff6b8'; g.beginPath(); g.arc(590,200,34,0,6.283); g.fill();
    g.fillStyle='rgba(255,255,255,.9)'; [[420,165],[700,150],[290,90],[760,60],[480,225]].forEach(([x,y])=>{ [[0,0,24],[26,6,18],[-26,8,17],[9,-11,17]].forEach(([a,b,r])=>{ g.beginPath(); g.arc(x+a,y+b,r,0,6.283); g.fill(); }); });
    [['#8cba7a',272,22],['#6a9e52',298,14]].forEach(([f,y,a],j)=>{ g.fillStyle=f; g.beginPath(); g.moveTo(0,400); for(let x=0;x<=1024;x+=32) g.lineTo(x,y+Math.sin(x*.012+j*2)*a); g.lineTo(1024,400); g.fill(); }); });
  const himmel=new THREE.Mesh(new THREE.PlaneGeometry(18,7),basis(0xffffff,{map:morgen})); himmel.position.set(0,2.1,-18.9); himmel.visible=false; sc.add(himmel);

  /* ---------- Torbogen und Zugbrücke ---------- */
  const rahmen=gruppe(festHinten,0,0,0);
  [-1,1].forEach(s=>{ for(let i=0;i<9;i++) box(rahmen,i%2?.5:.62,.49,.4,i%2?0xd8c6a0:0xbca47e,s*(i%2?2.76:2.82),.25+i*.5,-T/2+.06); k.kasten(s*2.8,-T/2+.1,.62,.5); });
  for(let i=0;i<11;i++) box(rahmen,.55,i===5?.72:.52,.4,i%2?0xd8c6a0:0xbca47e,-2.8+i*.56,4.78+(i===5?.1:0),-T/2+.06);
  /* kleine Krone als Schlussstein und Mauerlöcher für die Ketten */
  box(rahmen,.5,.14,.08,GOLD,0,4.8,-T/2+.3); [-.2,0,.2].forEach(x=>{ kegel(rahmen,.09,.24,GOLD,x,4.98,-T/2+.3); });
  [-1,1].forEach(s=>box(rahmen,.36,.28,.08,0x2a1a10,s*2.2,4.38,-T/2-.03));
  const PZ=-T/2-.12, PY=-.08;
  const bruecke=gruppe(sc,0,PY,PZ), holz=gruppe(bruecke,0,0,0);
  for(let i=0;i<10;i++) box(holz,.485,4.62,.2,i%2?0x9a6a36:0x865a2c,-2.23+i*.495,2.31,0);
  [.35,2.3,4.15].forEach(y=>{ box(holz,4.95,.16,.05,EISEN,0,y,.115); for(let i=0;i<10;i++) ball(holz,.055,SILBER,-2.23+i*.495,y,.14,1,1,.6); });
  [-1,1].forEach(s=>{ box(holz,.2,.24,.08,EISEN,s*2.2,3,.12); ring(holz,.13,.04,SILBER,s*2.2,3,.17); });
  buendeln(holz);
  const schloss=gruppe(bruecke,0,1.45,.2);
  box(schloss,2.2,.14,.08,EISEN,0,0,-.03); box(schloss,1,.74,.22,GOLD,0,0,.04); ring(schloss,.3,.08,SILBER,0,.37,.04,Math.PI);
  for(let i=0;i<3;i++){ box(schloss,.22,.3,.04,0x2a1a08,-.28+i*.28,-.04,.16); box(schloss,.16,.22,.04,0xfff3cf,-.28+i*.28,-.04,.18); box(schloss,.035,.13,.02,0x2a1a08,-.28+i*.28,-.04,.21); }
  buendeln(schloss);
  const GL=14, glieder=new THREE.InstancedMesh(new THREE.TorusGeometry(.095,.032,6,12),mat(0x6a707a),GL*2); glieder.frustumCulled=false; sc.add(glieder);
  const od=new THREE.Object3D(), oben=V(0,1,0), quer=new THREE.Quaternion();
  let tuer=null;
  const brueckeStellen=auf=>{
    const w=auf*Math.PI/2; bruecke.rotation.x=-w; himmel.visible=auf>.02; schloss.visible=!(tuer && tuer.offen);
    [-1,1].forEach((s,j)=>{ const a=V(s*2.2,4.38,-T/2+.06), b=V(s*2.2,PY+3*Math.cos(w)+.17*Math.sin(w),PZ-3*Math.sin(w)+.17*Math.cos(w)), d=b.clone().sub(a).normalize();
      for(let i=0;i<GL;i++){ od.position.lerpVectors(a,b,(i+.5)/GL); od.quaternion.setFromUnitVectors(oben,d); quer.setFromAxisAngle(oben,i%2?Math.PI/2:0); od.quaternion.multiply(quer); od.scale.set(1,1.35,1); od.updateMatrix(); glieder.setMatrixAt(j*GL+i,od.matrix); } });
    glieder.instanceMatrix.needsUpdate=true;
  };
  brueckeStellen(0);
  tuer=ausgang(k,{ steh:[0,-T/2+1.4], durch:[0,-T/2-1.5], treffer:{x:0,y:2.25,z:-T/2+.2,b:5,h:4.5,t:.5}, name:'Zugbrücke', schildOben:[0,5.6,-T/2+.5], glanz:[0,1.5,-T/2+.45], bewege:brueckeStellen });

  /* ---------- Wände: Fenster, Balken, Fackeln, Fahnen ---------- */
  const glasBlau=basis(0xa8dcf8), glasGold=basis(0xffdca0);
  [-9.2,9.4,14.7].forEach(fx=>{
    const f=gruppe(festHinten,fx,4.2,-T/2+.02);
    box(f,1.75,1.55,.08,0xd8c6a0,0,0,0);
    const s=new THREE.Mesh(new THREE.PlaneGeometry(1.35,1.2),glasBlau); s.position.z=.055; f.add(s);
    const s2=new THREE.Mesh(new THREE.PlaneGeometry(1.35,.35),glasGold); s2.position.set(0,-.42,.06); f.add(s2);
    box(f,.08,1.2,.08,HOLZ2,0,0,.1); box(f,1.35,.08,.08,HOLZ2,0,.05,.1); box(f,2,.16,.34,0xbca47e,0,-.85,.1);
    [-1,1].forEach(v=>box(f,.4,1.35,.08,0x4a7a4a,v*1.05,0,.07));
    walze(f,.16,.22,0xb8603a,.55,-.66,.2); for(let i=0;i<6;i++) ball(f,.07,i%2?0xe8506a:0x4f8a34,.55+(i%3-1)*.12,-.46+(i%2)*.1,.2);
    const strahl=new THREE.Mesh(new THREE.CylinderGeometry(.6,1.5,5.4,14,1,true),basis(0xffdc96,{transparent:true,opacity:.07,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
    strahl.position.set(fx,2.2,-T/2+1.7); strahl.rotation.x=-.62; hinten.add(strahl);
  });
  /* Fachwerkbalken an den Seitenwänden und Ecken */
  [[festLinks,-1],[festRechts,1]].forEach(([w,s])=>{ const g=gruppe(w,0,0,0), x=s*(B/2-.04);
    box(g,.12,.2,T,HOLZ2,x,3.6,0); box(g,.12,.18,T,HOLZ2,x,H-.2,0);
    for(let z=-T/2+.2;z<=T/2;z+=3.32) box(g,.14,H-3.6,.2,HOLZ2,x,(H+3.6)/2,z);
    for(let i=0;i<8;i++){ const z=-T/2+1.86+i*3.32; const q=box(g,.1,.14,3.9,HOLZ,x,4.9,z); q.rotation.x=(i%2?1:-1)*.62; }
    box(g,.5,H,.5,HOLZ2,s*(B/2-.2),H/2,-T/2+.2); });
  [[hinten,festHinten,-3.45,-T/2,0],[hinten,festHinten,3.45,-T/2,0],[links,festLinks,-B/2,-6.8,Math.PI/2],[links,festLinks,-B/2,9,Math.PI/2],[rechts,festRechts,B/2,5.2,-Math.PI/2],[rechts,festRechts,B/2,-10.6,-Math.PI/2]].forEach(([w,halter,x,z,d])=>{
    fackel(w,k,x,z,d); const f=w.children[w.children.length-1], h=gruppe(halter,x,f.position.y,z); h.rotation.y=d;
    f.children.filter(m=>m.isMesh && m.material.isMeshLambertMaterial).forEach(m=>h.add(m)); });
  flacker(k,-3.4,3.5,-T/2+1.3,0xffa040,.45,10); flacker(k,3.4,3.5,-T/2+1.3,0xffa040,.45,10);
  /* Wappenfahnen, sie wehen leicht */
  const fahnenBild=(grund,streif,zeichen)=>bild(128,200,g=>{ g.fillStyle=grund; g.fillRect(0,0,128,200); g.fillStyle=streif; g.fillRect(0,0,128,14); g.fillRect(10,14,9,186); g.fillRect(109,14,9,186); g.fillStyle='#f3d27a';
    if(zeichen===0){ g.beginPath(); g.moveTo(32,118); g.lineTo(32,66); g.lineTo(48,90); g.lineTo(64,56); g.lineTo(80,90); g.lineTo(96,66); g.lineTo(96,118); g.closePath(); g.fill(); }
    else if(zeichen===1){ g.fillRect(42,70,44,60); [36,57,78].forEach(x=>g.fillRect(x,54,14,20)); g.fillStyle=grund; g.fillRect(56,102,16,28); }
    else { g.beginPath(); for(let i=0;i<10;i++){ const a=i*Math.PI/5-Math.PI/2, r=i%2?17:42; g.lineTo(64+Math.cos(a)*r,92+Math.sin(a)*r); } g.closePath(); g.fill(); }
    g.clearRect(0,190,128,10); g.globalCompositeOperation='destination-out'; g.beginPath(); g.moveTo(20,200); g.lineTo(64,156); g.lineTo(108,200); g.closePath(); g.fill(); });
  const FB=[fahnenBild('#b83228','#f3d27a',0),fahnenBild('#2a56a0','#f4ecd8',1),fahnenBild('#2f7a44','#f3d27a',2)];
  const fahnen=[];
  const fahne=(par,halter,x,y,z,ry,n)=>{ const h=gruppe(halter,x,y,z), g=gruppe(par,x,y,z); h.rotation.y=g.rotation.y=ry; walze(h,.05,1.4,HOLZ2,0,1.07,.08).rotation.z=Math.PI/2; [-1,1].forEach(s=>ball(h,.09,GOLD,s*.74,1.07,.08));
    const geo=new THREE.PlaneGeometry(1.15,2.1,4,8), m=new THREE.Mesh(geo,new THREE.MeshLambertMaterial({map:FB[n],transparent:true,alphaTest:.4,side:THREE.DoubleSide})); m.position.z=.12; g.add(m); fahnen.push([geo,fahnen.length*1.7]); };
  fahne(hinten,festHinten,-4.45,3.5,-T/2,0,0); fahne(hinten,festHinten,4.45,3.5,-T/2,0,1); fahne(hinten,festHinten,11.7,3.9,-T/2,0,2); fahne(hinten,festHinten,-15.9,3.9,-T/2,0,1);
  fahne(links,festLinks,-B/2+.06,4,3.2,Math.PI/2,2); fahne(rechts,festRechts,B/2-.06,4,8.5,-Math.PI/2,0);
  k.anim.push(t=>fahnen.forEach(([geo,v])=>{ const p=geo.attributes.position; for(let i=0;i<p.count;i++){ const h=(1.05-p.getY(i))/2.1; p.setZ(i,Math.sin(t*2.2+v+p.getY(i)*2.6+p.getX(i)*1.5)*.07*h); } p.needsUpdate=true; }));

  /* ---------- Kamin mit Feuer, davor schläft der Hund ---------- */
  const kamin=gruppe(festHinten,-12.6,0,-T/2), feuer=gruppe(hinten,-12.6,0,-T/2);
  [-1,1].forEach(s=>{ for(let i=0;i<4;i++) box(kamin,.75,.46,1.05,i%2?0x9a8a74:0x84745e,s*1.45,.23+i*.47,.52); });
  box(kamin,4,.36,1.3,HOLZ2,0,2.06,.6); box(kamin,2.2,1.9,.1,0x1c100c,0,.95,.08);
  const abzug=rohr(kamin,.95,2,1.7,0xa8987e,0,3.09,.1,4); abzug.geometry.rotateY(Math.PI/4); abzug.scale.z=.5; box(kamin,1.35,2.5,.7,0x9a8a74,0,5.15,.34); box(kamin,4,.12,1.5,0x6a5c4c,0,.06,.72);
  [[-.35,.5,.35],[.35,.55,-.4],[0,.75,.05]].forEach(([x,z,d])=>{ const s=walze(kamin,.13,1.3,HOLZ,x*.5,.24+Math.abs(d)*.3,z); s.rotation.set(0,d*2,Math.PI/2); });
  [[-1.2,0x2a56a0],[-.4,0xc8903a],[.45,0xb8603a],[1.25,0x5a8a4a]].forEach(([x,c])=>{ rohr(kamin,.12,.18,.36,c,x,2.42,1.05,12); ring(kamin,.1,.025,c,x+.18,2.45,1.05); });
  const glut=[[0,.8,0xff7a1a],[-.35,.55,0xffa62a],[.38,.6,0xffa62a],[.05,.45,0xffe066]].map(([x,h,c],i)=>{ const m=kegel(feuer,h*.34,h,basis(c),x,.3+h/2,.55+(i===3?.2:0)); m.castShadow=false; return [m,h]; });
  const kaminSchein=schein(feuer,'rgba(255,150,60,.7)',0,.8,1.1,2.8);
  k.anim.push(t=>{ glut.forEach(([m,h],i)=>{ const s=1+Math.sin(t*(8+i*2.3)+i)*.2; m.scale.y=h*s; m.position.y=.3+h*s/2; }); const a=2.8+Math.sin(t*9)*.2; kaminSchein.scale.set(a,a,1); });
  flacker(k,-12.6,1.3,-11.6,0xff8a30,.6,9);
  k.kasten(-12.6,-12.75,4,1.5);
  const hund=gruppe(sc,-13.7,0,-11.45), pfoten=gruppe(fest,-13.7,0,-11.45);
  walze(pfoten,1,.03,0x3f6490,0,.018,0).scale.set(1.15,.03,.68); walze(pfoten,1,.034,0x5a86b4,0,.022,0).scale.set(.94,.034,.52);   /* ovale Decke */
  const leib=gruppe(hund,0,0,0); ball(leib,.4,0xb88450,-.12,.34,0,1.4,.72,.95); ball(leib,.24,0x9a6a3a,-.48,.3,.18,1,.8,1); ball(leib,.2,0xe8d0a8,.3,.24,.06,1,.8,1.1); strich(leib,[-.55,.2,.12],[-.18,.1,.48],.075,0xb88450); ball(leib,.09,0xe8d0a8,-.14,.1,.49,1.3,.7,1); buendeln(leib);
  const schwanz=gruppe(hund,-.62,.24,-.02); strich(schwanz,[0,0,0],[-.28,-.08,.14],.07,0x9a6a3a); strich(schwanz,[-.28,-.08,.14],[-.34,-.13,.42],.055,0x9a6a3a); ball(schwanz,.075,0xf4ecd8,-.34,-.13,.44); buendeln(schwanz);
  const dk=gruppe(hund,.52,.33,.14); ball(dk,.24,0xc29260,0,0,0); ball(dk,.14,0xe8d0a8,.24,-.08,.03,1.4,.75,.9); ball(dk,.065,0x20140e,.43,-.05,.03);
  [-1,1].forEach(s=>{ const o=ball(dk,.2,0x6a3e20,-.03,-.08,s*.27,.7,1.45,.32); o.rotation.x=-s*.42; box(dk,.03,.022,.1,0x20140e,.225,.05,s*.1); });
  [[.14,.2],[.08,-.14]].forEach(([a,b])=>{ strich(pfoten,[.3,.1,a],[.9,.08,b+.1],.07,0xc29260); ball(pfoten,.095,0xe8d0a8,.92,.08,b+.1,1.25,.7,1); }); buendeln(dk);
  k.anim.push(t=>{ leib.scale.y=1+Math.sin(t*1.8)*.05; dk.rotation.z=Math.max(0,Math.sin(t*.35)-.85)*1.8; schwanz.rotation.y=Math.sin(t*6)*.22*Math.max(0,Math.sin(t*.7)); });
  k.kreis(-13.7,-11.45,.65);

  /* ---------- Holzstützen mit Kopfbändern ---------- */
  [[-7.6,-5.6],[8.2,-4.8],[-7.6,1.1],[8.2,6]].forEach(([x,z],i)=>{
    const g=gruppe(sc,x,0,z);
    box(g,.95,.3,.95,0xa8987e,0,.15,0); box(g,.45,3.9,.45,HOLZ,0,2.2,0); box(g,.65,.2,.65,HOLZ2,0,4.2,0); box(g,1.9,.24,.3,HOLZ2,0,4.4,0);
    [-1,1].forEach(s=>{ strich(g,[s*.2,3.4,0],[s*.8,4.3,0],.09,HOLZ2); });
    [.75,3.15].forEach(y=>box(g,.52,.12,.52,EISEN,0,y,0));
    /* aufgehängte Seilrolle am Haken */
    box(g,.12,.1,.2,EISEN,0,2.22,.3);
    (i%2?[[.28,1.9,.3],[.22,1.85,.34]]:[[.24,1.95,.3],[.26,1.92,.34],[.2,1.99,.37]]).forEach(([r,y,vorn],j)=>ring(g,r,.05,j%2?0xb89858:0xc8a86a,0,y,vorn));
    buendeln(g); k.verdecker(g,x,z,.6); k.kreis(x,z,.52);
  });

  /* ---------- Schlafstellen an der linken Wand ---------- */
  const betten=gruppe(fest,0,0,0);
  [[-8.6,BLAU],[-4.9,ROT],[-1.2,0x2f7a44]].forEach(([z,c])=>{
    box(betten,3.1,.26,1.6,HOLZ,-16.3,.5,z); [-1,1].forEach(a=>[-1,1].forEach(b=>box(betten,.18,a<0?1.35:.9,.18,HOLZ2,-16.3+a*1.5,a<0?.67:.45,z+b*.74)));
    box(betten,.12,.55,1.4,HOLZ,-17.8,.92,z); box(betten,2.9,.24,1.45,CREME,-16.3,.73,z); box(betten,1.95,.16,1.54,c,-15.82,.87,z); box(betten,.22,.18,1.56,CREME,-16.75,.9,z);
    ball(betten,.4,0xffffff,-17.35,.95,z,.85,.45,1.35); [-.45,.15].forEach(a=>box(betten,.16,.02,1.55,GOLD,-15.7+a,.96,z));
    k.kasten(-16.3,z,3.2,1.7); });
  /* Pantoffeln und Truhenhocker */
  [[-14.4,-8.1],[-14.4,-4.4],[-14.4,-.8]].forEach(([x,z])=>[0,.28].forEach(d=>{ ball(betten,.11,0x7a4a28,x,.06,z+d,1.7,.55,1); ball(betten,.08,0x4a2a12,x-.08,.1,z+d,1,.4,.8); }));

  /* Fässer in der Ecke, Regal, Haken mit Umhängen */
  const lager=gruppe(fest,0,0,0);
  fass(lager,-17.35,0,-12.8,1.05); fass(lager,-16.4,0,-12.75,1.1); fass(lager,-17.2,0,-11.85,.9); fass(lager,-16.9,1.3,-12.8,.75); k.kasten(-16.9,-12.4,2,1.9);
  [-1,1].forEach(s=>box(lager,.75,2.6,.12,HOLZ2,-17.45,1.3,2.2+s*1.15));
  [.35,1.15,1.95,2.6].forEach((y,r)=>{ box(lager,.8,.1,2.4,HOLZ,-17.45,y,2.2); if(r<3) for(let i=0;i<4;i++){ const z=1.35+i*.57, c=[0xb8603a,0x4a78a8,0xc8903a,0x6a8a4a][(i+r)%4];
      if((i+r)%3===2){ ball(lager,.22,0xd89a4a,-17.35,y+.18,z,1,.7,1.1); } else { rohr(lager,.1,.18,.42,c,-17.4,y+.26,z,12); ring(lager,.09,.025,c,-17.22,y+.3,z); } } });
  [-.5,.3].forEach((d,i)=>{ const h=new THREE.Mesh(new THREE.SphereGeometry(.27,16,10,0,Math.PI*2,0,Math.PI*.55),mat(SILBER)); h.position.set(-17.45,2.66,2.2+d*1.5); h.castShadow=true; lager.add(h); walze(lager,.34,.04,0x969ca6,-17.45,2.68,2.2+d*1.5); ball(lager,.06,i?BLAU:ROT,-17.45,2.95,2.2+d*1.5); });
  k.kasten(-17.45,2.2,.9,2.45);
  const haken=gruppe(festLinks,-B/2,0,0);
  box(haken,.1,.18,3.4,HOLZ2,.06,2.5,6.9);
  /* flach hängende Umhänge: Stoffbahn mit Falten, Kapuze fällt nach unten, kein Kopf */
  const stoff=(punkte,c,x,z)=>{ const f=new THREE.Shape(); punkte.forEach(([a,b],i)=>i?f.lineTo(a,b):f.moveTo(a,b)); const m=new THREE.Mesh(new THREE.ExtrudeGeometry(f,{depth:.05,bevelEnabled:false}),mat(c)); m.rotation.y=Math.PI/2; m.position.set(x,0,z); haken.add(m); };
  [[5.7,ROT,0x7e2016],[6.9,0x2f7a44,0x1c4e2c],[8.1,BLAU,0x183866]].forEach(([z,c,d])=>{ box(haken,.26,.08,.08,EISEN,.2,2.45,z); ball(haken,.07,EISEN,.34,2.47,z);
    stoff([[-.08,2.46],[.08,2.46],[.3,2.2],[.46,.9],[.28,1.02],[.14,.86],[0,1],[-.16,.84],[-.3,1.01],[-.46,.9],[-.3,2.2],[-.08,2.46]],c,.1,z);
    stoff([[-.27,2.24],[.27,2.24],[.02,1.62],[-.02,1.62],[-.27,2.24]],d,.17,z);
    [-.22,.04,.25].forEach((v,i)=>{ const b=box(haken,.02,.62+i%2*.12,.035,d,.16,1.3,z+v); b.rotation.x=v*-.18; }); });

  /* Esstisch mit Hockern */
  const tisch=gruppe(fest,-13.4,0,3.8);
  box(tisch,2.5,.16,1.4,HOLZ,0,.95,0); [-1,1].forEach(a=>[-1,1].forEach(b=>box(tisch,.16,.9,.16,HOLZ2,a*1.05,.45,b*.55)));
  box(tisch,.7,.02,1.46,ROT,0,1.04,0);
  [[-.8,.3],[.75,-.3],[.8,.35]].forEach(([x,z])=>{ walze(tisch,.26,.04,0xd8c8a8,x,1.06,z); ball(tisch,.17,0xc9883a,x,1.14,z,1.3,.6,.9); });
  const kaese=walze(tisch,.3,.22,0xf4c430,0,1.16,-.2); kaese.castShadow=true; rohr(tisch,.13,.2,.5,0xb8603a,0,1.29,.35,12); [[-.5,-.35],[.35,.1]].forEach(([x,z])=>rohr(tisch,.11,.08,.24,0x8a8e96,x,1.15,z,10));
  [[-1.05,-1],[1.05,1.02],[-1,1.05]].forEach(([x,z])=>{ walze(tisch,.32,.12,0x9a6a38,x,.55,z); [0,1,2].forEach(i=>{ const a=i*2.094; strich(tisch,[x+Math.cos(a)*.18,.52,z+Math.sin(a)*.18],[x+Math.cos(a)*.28,0,z+Math.sin(a)*.28],.05,HOLZ2); }); });
  k.kasten(-13.4,3.8,3,2.8);

  /* Säcke und Hühnerhaus vorn links */
  const hof=gruppe(fest,0,0,0);
  sack(hof,-17.15,0,8.75,0xe8dcc0,1); sack(hof,-17.1,0,9.75,0xc8a878,.9); sack(hof,-16.6,0,9.2,0xd8c498,.85); k.kasten(-17,9.2,1.7,2);
  const hx=-14.6, hz=11.9;
  [-1,1].forEach(a=>[-1,1].forEach(b=>box(hof,.14,.5,.14,HOLZ2,hx+a*.9,.25,hz+b*.5)));
  box(hof,2,1,1.2,0xb98a52,hx,.95,hz); for(let i=0;i<7;i++) box(hof,.04,1.02,1.22,HOLZ2,hx-.9+i*.3,.95,hz);
  [-1,1].forEach(s=>{ const d=box(hof,2.4,.1,.95,ROT,hx,1.7,hz+s*.36); d.rotation.x=s*.55; });
  walze(hof,.28,.05,0x1c100c,hx+.45,.95,hz+.62).rotation.x=Math.PI/2; const leiter=box(hof,.4,.05,1,HOLZ,hx+.45,.3,hz+.9); leiter.rotation.x=.55;
  k.kasten(hx,11.95,2.4,1.7);

  fass(hof,-17.2,0,11.4,1); fass(hof,-17.15,0,12.4,1.05); sack(hof,-16.35,0,12.25,0xc8a878,1); sack(hof,-16.35,0,11.35,0xe8dcc0,.85); k.kasten(-16.9,11.85,2.2,2.2);

  /* Kisten, Äpfel, Fässer vorn */
  kiste(hof,-3.55,0,12.15,.95,.1); kiste(hof,-2.4,0,12.2,.85,-.15); k.kasten(-3,12.15,2.35,1.15);
  [[-3.55,.98],[-2.4,.88]].forEach(([x,y])=>{ for(let i=0;i<9;i++) ball(hof,.15,i%3?0xc8302a:0x8ab83a,x+(i%3-1)*.26,y+.08+(i===4?.1:0),12.17+(Math.floor(i/3)-1)*.25); });
  fass(hof,12.15,0,12.2,1); fass(hof,13.1,0,12.15,1.1); fass(hof,13.95,0,12.3,.85); k.kasten(13,12.2,2.8,1.2);
  sack(hof,17.15,0,10.9,0xc8a878,1); sack(hof,17.1,0,12,0xe8dcc0,1.05); sack(hof,16.4,0,11.7,0xd8c498,.85); k.kasten(16.95,11.55,1.9,2.3);
  /* Brennholz */
  [[0,4],[1,3],[2,2]].forEach(([r,n])=>{ for(let i=0;i<n;i++){ const z=5+(i-(n-1)/2)*.52; walze(hof,.26,1.6,(i+r)%2?HOLZ:0x9a6a38,16.95,.27+r*.45,z).rotation.z=Math.PI/2; [-1,1].forEach(v=>{ walze(hof,.19,.03,0xd8b078,16.95+v*.81,.27+r*.45,z).rotation.z=Math.PI/2; }); } });
  k.kasten(16.95,5,1.8,2.25);

  /* Amboss auf einem Baumstumpf, Kisten hinten */
  const werk=gruppe(fest,0,0,0);
  walze(werk,.55,.7,0x7a5230,-2.8,.35,-5.8); walze(werk,.46,.03,0xd8b078,-2.8,.715,-5.8);
  box(werk,.6,.18,.45,EISEN,-2.8,.82,-5.8); box(werk,.3,.28,.28,EISEN,-2.8,1.02,-5.8); box(werk,1,.26,.42,0x555a66,-2.8,1.27,-5.8); const horn=kegel(werk,.17,.5,0x555a66,-2.05,1.28,-5.8); horn.rotation.z=-Math.PI/2;
  strich(werk,[-2.2,.05,-5.2],[-2.4,.85,-5.35],.05,HOLZ); box(werk,.36,.2,.2,0x8a8e96,-2.2,.1,-5.18);
  k.kreis(-2.8,-5.8,.75);
  kiste(werk,-6.25,0,-9.6,1.05,.08); kiste(werk,-5.15,0,-9.55,.9,-.2); kiste(werk,-5.9,1.07,-9.6,.7,.4); k.kasten(-5.75,-9.6,2.2,1.35);
  /* Sattelbock */
  [-1,1].forEach(a=>[-1,1].forEach(b=>strich(werk,[9.8+a*.6,0,-9.2+b*.42],[9.8+a*.55,.95,-9.2],.07,HOLZ2)));
  walze(werk,.16,1.55,HOLZ,9.8,.95,-9.2).rotation.z=Math.PI/2; ball(werk,.42,0x7a3a1a,9.8,1.15,-9.2,1.35,.55,1.05); ball(werk,.2,0x8a4a22,9.35,1.35,-9.2,.8,1,1.3); ball(werk,.2,0x8a4a22,10.25,1.38,-9.2,.8,1.1,1.3);
  box(werk,.8,.04,1.05,BLAU,9.8,1.03,-9.2); [-1,1].forEach(s=>{ strich(werk,[9.8,1.15,-9.2+s*.45],[9.8,.5,-9.2+s*.55],.025,0x4a2a12); ring(werk,.13,.03,SILBER,9.8,.38,-9.2+s*.55); });
  k.kasten(9.8,-9.2,1.65,1.15);

  /* ---------- Pferdebox hinten rechts: Zaun, Futtertrog, Pferd ---------- */
  const box1=gruppe(fest,0,0,0);
  for(let x=11.6;x<=17.9;x+=1.57){ box(box1,.22,1.6,.22,HOLZ2,x,.8,-8.62); ball(box1,.14,HOLZ2,x,1.63,-8.62); }
  [.55,1.15].forEach(y=>box(box1,6.35,.18,.1,HOLZ,14.75,y,-8.62));
  for(let z=-13.3;z<=-8.7;z+=1.52){ box(box1,.22,1.6,.22,HOLZ2,11.6,.8,z); ball(box1,.14,HOLZ2,11.6,1.63,z); }
  [.55,1.15].forEach(y=>box(box1,.1,.18,4.9,HOLZ,11.6,y,-11.05));
  box(box1,1,.5,1.8,0x8a5a2c,12.35,.55,-10.4); box(box1,.82,.06,1.6,0xd8b45a,12.35,.82,-10.4); [-.7,.7].forEach(z=>box(box1,.8,.35,.14,HOLZ2,12.35,.17,-10.4+z));
  ring(box1,.3,.07,SILBER,13.4,2.5,-13.42,Math.PI*1.5).rotation.z=-Math.PI*.25;
  ring(box1,.35,.05,0x7a4a28,16.2,2.6,-13.4); ring(box1,.25,.05,0x7a4a28,16.2,2.35,-13.38);
  k.kasten(14.75,-11.05,6.5,5.1);
  const halme=new THREE.InstancedMesh(GEO.box,mat(STROH),420), o=new THREE.Object3D();
  for(let i=0;i<420;i++){ o.position.set(11.9+zufall()*5.8,.025+zufall()*.05,-13.2+zufall()*4.4); o.rotation.set(0,zufall()*3.14,(zufall()-.5)*.2); o.scale.set(.25+zufall()*.3,.018,.025); o.updateMatrix(); halme.setMatrixAt(i,o.matrix); }
  halme.receiveShadow=true; halme.frustumCulled=false; sc.add(halme);
  const pferd=gruppe(sc,14.85,0,-10.9); pferd.rotation.y=Math.atan2(-.55,-.83);
  const PF=0x9a5a2c, MAEHNE=0x3a2012, pr=gruppe(pferd,0,0,0);
  ball(pr,.62,PF,0,1.35,0,1.6,1,.92); ball(pr,.55,PF,.6,1.4,0,1,1.05,.95); ball(pr,.58,PF,-.62,1.42,0,1,1,.97);
  [[.65,.3],[.65,-.3],[-.7,.32],[-.7,-.32]].forEach(([x,z],i)=>{ strich(pr,[x,1.25,z],[x+(i>1?-.08:.04),.6,z],.14,PF); strich(pr,[x+(i>1?-.08:.04),.6,z],[x,.14,z],.095,i%2?PF:CREME); walze(pr,.14,.18,0x2a1a10,x,.09,z); });
  buendeln(pr);
  const hals=gruppe(pferd,.85,1.65,0); strich(hals,[0,-.1,0],[.55,.7,0],.27,PF); ball(hals,.33,PF,.04,-.05,0);
  ball(hals,.3,PF,.68,.85,0,1.15,1,.85); strich(hals,[.75,.82,0],[1.2,.52,0],.19,PF); ball(hals,.21,0xd8b08a,1.23,.5,0,1,.95,.95);
  const bl=box(hals,.42,.05,.12,CREME,.98,.9,0); bl.rotation.z=-.6;
  [-1,1].forEach(s=>{ kegel(hals,.09,.32,PF,.55,1.22,s*.15).rotation.z=.2; ball(hals,.065,0xffffff,.85,.92,s*.23); ball(hals,.043,0x14100e,.89,.92,s*.26); ball(hals,.035,0x3a1a10,1.38,.53,s*.11); });
  for(let i=0;i<8;i++) ball(hals,.17,MAEHNE,-.18+i*.1,.13+i*.14,0,1,1.2,.7); ball(hals,.14,MAEHNE,.76,1.14,0,1.3,.7,1);
  ring(hals,.22,.03,ROT,1.1,.58,0).rotation.set(0,Math.PI/2,0); buendeln(hals);
  const schweif=gruppe(pferd,-1.15,1.65,0); for(let i=0;i<6;i++) ball(schweif,.17-Math.abs(i-2)*.018,MAEHNE,-.1-i*.045,-.08-i*.19,0,.9,1.5,.8); buendeln(schweif);
  k.anim.push(t=>{ hals.rotation.z=Math.sin(t*.9)*.09-Math.max(0,Math.sin(t*.33)-.7)*1.1; schweif.rotation.x=Math.sin(t*2.7)*.35; });
  /* Wassertrog vor der Box */
  const trog=gruppe(fest,13.2,0,-7.95);
  [-1,1].forEach(s=>{ box(trog,3,.6,.16,0xa8987e,0,.42,s*.45); box(trog,.16,.6,.9,0xa8987e,s*1.42,.42,0); box(trog,.4,.2,1.05,0x84745e,s*1,.1,0); });
  box(trog,2.8,.14,.9,0x84745e,0,.2,0); box(trog,2.68,.04,.76,0x4a98c8,0,.62,0);
  walze(trog,.09,1.3,HOLZ2,1.35,1.05,-.4); strich(trog,[1.35,1.6,-.4],[.9,1.5,-.15],.05,EISEN);
  k.kasten(13.2,-7.95,3.05,1.15);
  const tropfen=ball(sc,.05,basis(0xcfeeff),14.1,1.4,-8.1,1,1.7,1);
  const welle=new THREE.Mesh(new THREE.RingGeometry(.8,1,24),basis(0xe8f8ff,{transparent:true,opacity:0,depthWrite:false})); welle.rotation.x=-Math.PI/2; welle.position.set(14.1,.655,-8.1); sc.add(welle);
  k.anim.push(t=>{ const p=(t%1.8)/1.8; tropfen.visible=p<.45; tropfen.position.y=1.45-p*1.75; const w=Math.max(0,(p-.45)/.55); welle.scale.setScalar(.04+w*.34); welle.material.opacity=p>.45?.8*(1-w):0; });

  /* ---------- Treppe zum Wehrgang an der rechten Wand ---------- */
  const treppe=gruppe(sc,0,0,0);
  for(let i=0;i<12;i++){ const h=(i+1)*.3, z=2.75-i*.65; box(treppe,1.9,h,.65,i%2?0xb4a080:0xa49072,17,h/2,z); box(treppe,2,.07,.7,HOLZ,17,h+.035,z); if(i%2===0) box(treppe,.1,1,.1,HOLZ2,16.08,h+.5,z); }
  strich(treppe,[16.08,1.3,2.75],[16.08,4.6,-4.4],.07,HOLZ2);
  box(treppe,2.05,.24,3.8,HOLZ,16.98,3.5,-6.6); [-5.15,-8.35].forEach(z=>{ box(treppe,.24,3.4,.24,HOLZ2,16.15,1.7,z); strich(treppe,[16.15,2.6,z],[16.9,3.4,z],.08,HOLZ2); });
  for(let z=-8.4;z<=-5;z+=.84) box(treppe,.1,1,.1,HOLZ2,16.05,4.1,z);
  box(treppe,.14,.12,3.5,HOLZ2,16.05,4.62,-6.7); box(treppe,2,.12,.14,HOLZ2,17,4.62,-8.45); box(treppe,.1,1,.1,HOLZ2,17,4.1,-8.45);
  fass(treppe,17.2,0,-7.7,1); fass(treppe,17.15,0,-6.6,.85); kiste(treppe,17.2,0,-5.5,.8,.3);
  buendeln(treppe); k.verdecker(treppe,16.9,-3,3.2); k.kasten(16.9,-2.7,2.3,11.6);

  /* Karren mit Fässern und Rüben */
  const karren=gruppe(fest,13.75,0,7.8);
  box(karren,2.7,.16,1.4,HOLZ,0,.82,0); [-1,1].forEach(s=>{ box(karren,2.7,.12,.1,HOLZ2,0,1.32,s*.68); for(let i=0;i<7;i++) box(karren,.09,.5,.09,HOLZ,-1.25+i*.416,1.07,s*.68);
    [-.75,.75].forEach(x=>{ ring(karren,.46,.08,HOLZ2,x,.54,s*.86); for(let j=0;j<4;j++) box(karren,.9,.07,.06,HOLZ,x,.54,s*.86).rotation.z=j*Math.PI/4; ball(karren,.11,EISEN,x,.54,s*.9); }); });
  strich(karren,[-1.35,.8,.35],[-1.9,.12,.35],.07,HOLZ2); strich(karren,[-1.35,.8,-.35],[-1.9,.12,-.35],.07,HOLZ2);
  fass(karren,-.7,.9,0,.7); sack(karren,.15,.9,-.2,0xc8a878,.7);
  for(let i=0;i<12;i++){ const x=.65+(i%4)*.2, z=-.4+Math.floor(i/4)*.4; ball(karren,.15,i%2?0xd86a2a:0x9a4a8a,x,1.0+(i%3)*.04,z); kegel(karren,.07,.24,0x4f8a34,x+.04,1.23,z); }
  k.kasten(13.65,7.8,4,2.15);

  /* ---------- Boden: Wappen aus Pflaster, Rinnsteine, Pfützen, Gras, Blätter ---------- */
  const flach=gruppe(fest,0,0,0);
  [[2.3,0xc8b490],[1.95,0x8a4a38],[1.55,0xd8c8a4]].forEach(([r,c],i)=>walze(flach,r,.012,c,0,.007+i*.004,.4));
  for(let i=0;i<8;i++){ const s=box(flach,.22,.012,2.9,i%2?0x8a4a38:0x4a6a8a,0,.022+i*.0005,.4); s.rotation.y=i*Math.PI/8; } walze(flach,.48,.012,GOLD,0,.033,.4);
  /* Fahrspur vom Tor */
  [-1,1].forEach(s=>box(flach,.2,.012,10.8,0x7e6c54,s*1.35,.006,-7.5));
  [[-9.5,9.2],[7,2.2],[-3.5,-1.8]].forEach(([x,z])=>{ walze(flach,.5,.012,0x5a4c3a,x,.008,z); for(let i=-2;i<=2;i++) box(flach,.07,.012,.9-Math.abs(i)*.18,0x8a8e96,x+i*.18,.018,z); });
  [[-17.4,6],[-11,12.9],[6,13],[17.3,8.6],[-9.9,-12.9],[11,-6.2],[-17.4,-2.9],[9.7,12.9],[-6.8,-13],[15.5,12.9]].forEach(([x,z])=>{ for(let i=0;i<6;i++) ball(flach,.13+zufall()*.14,i%2?0x5a8a34:0x78a84a,x+(zufall()-.5)*.9,.02,z+(zufall()-.5)*.5,1.3,.35,1); });
  for(let i=0;i<90;i++){ const s=i%3, x=s===0?-17.8+zufall()*.6:(s===1?17.2+zufall()*.6:-17.5+zufall()*35), z=s===2?(i%2?13.3-zufall()*.5:-13.35+zufall()*.35):-13+zufall()*26; ball(flach,.05+zufall()*.09,i%2?0x9c9080:0xc4b298,x,.04,z,1,.6,1); }
  for(let i=0;i<46;i++){ const b=box(flach,.17,.012,.09,[0xd89a2a,0x78a84a,0xb86a2a][i%3],-15+zufall()*29,.026,-8+zufall()*20); b.rotation.y=zufall()*3; }
  const gras=new THREE.InstancedMesh(GEO.cone,mat(0x6a9a3a),360);
  const bueschel=[[-17.3,6.4],[-17.2,12.8],[-12.4,12.9],[-8,12.8],[-5.4,12.9],[5,12.9],[10,12.8],[15,12.9],[17.4,7.2],[17.4,3],[-17.4,-6.7],[-9.5,-12.9],[8,-13],[11,-12.8],[-17.4,.6],[-6.9,1.9],[8.9,-5.4],[-14,10.4],[11.3,-8.2],[1,13]];
  for(let i=0;i<360;i++){ const n=bueschel[i%bueschel.length], h=.14+zufall()*.2; o.position.set(Math.max(-17.8,Math.min(17.8,n[0]+(zufall()-.5)*.9)),h/2,Math.max(-13.35,Math.min(13.35,n[1]+(zufall()-.5)*.6))); o.rotation.set((zufall()-.5)*.6,0,(zufall()-.5)*.6); o.scale.set(.035,h,.035); o.updateMatrix(); gras.setMatrixAt(i,o.matrix); }
  gras.frustumCulled=false; sc.add(gras);
  [[3.2,-6.5],[-8.8,-8],[6.5,12],[-1.5,6.6]].forEach(([x,z],i)=>{ const pf=new THREE.Mesh(new THREE.CircleGeometry(.75,26),basis(0xb8e0ff,{transparent:true,opacity:.35,depthWrite:false})); pf.rotation.x=-Math.PI/2; pf.scale.set(1+i*.08,.6,1); pf.position.set(x,.034,z); sc.add(pf); });

  /* ---------- Leben: Wachen, Hühner, Küken, Katze, Vögel ---------- */
  const kleine=[];
  const w1=wache(sc,BLAU,0x6a3a1a,true);
  laeufer(k,w1.g,[[-3.4,-11.2],[1.6,-9.6],[2.4,-3.2],[0,-2.8],[-1,-4.8],[-1.4,-8.4]],1.3,0,6);
  k.anim.push(t=>{ w1.beine.forEach((b,i)=>b.rotation.z=Math.sin(t*5+i*3.14)*.4); w1.arme.forEach((a,i)=>a.rotation.z=-Math.sin(t*5+i*3.14)*.35); });
  const w2=wache(sc,ROT,0x2a1a10,false); w2.g.scale.setScalar(.92);
  k.anim.push(t=>{ const p=(t*.12)%2, geht=(p%1)<.72, u=Math.min(1,(p%1)/.72), a=p<1?u:1-u; w2.g.position.set(16.95,3.62,-5.5-a*2.4); w2.g.rotation.y=geht?(p<1?Math.PI/2:-Math.PI/2):Math.PI;
    w2.beine.forEach((b,i)=>b.rotation.z=geht?Math.sin(t*5+i*3.14)*.35:0); w2.arme.forEach((x,i)=>x.rotation.z=geht?-Math.sin(t*5+i*3.14)*.3:0); });
  const WEG1=[[-12.5,8.4],[-7,9],[-4.2,6.8],[-6.6,10.8],[-11,10.2]];
  const h1=huhn(k,CREME); laeufer(k,h1,WEG1,.75,3,9);
  [2.2,1.5,.8].forEach(s=>{ const q=kueken(k); kleine.push(q); laeufer(k,q,WEG1,.75,s,13); });
  laeufer(k,huhn(k,0xb86a30),[[-1.5,11],[2,12],[5,11.2],[3.4,8.8],[0,7.6]],.6,2,8);
  laeufer(k,huhn(k,0xd89a50),[[9,.4],[13.4,.4],[14.2,4.6],[11.2,5.4],[8.9,3.9]],.55,6,8);
  katze(k,[[2.6,-1.4],[6.4,1.8],[3.2,3.4],[-1.4,4.6],[-1.8,1]],1.3);
  spatz(k,-1.8,-.6,1.1,.7,0); spatz(k,6.4,12,-1,.4,2.5);
  vogel(k,-6,-8,4,6.9,.8,0); vogel(k,7,-6,5,7.4,-.65,2.4); vogel(k,0,-11,6,7.1,.55,4.2);
  /* Tauben auf der Mauerkrone */
  [-6.8,7.9].forEach((x,i)=>{ const g=gruppe(hinten,x,H+.38,-T/2-.2); g.rotation.y=i%2?-2:-1.1; const r=gruppe(g,0,0,0); vogelKoerper(r,0x9aa4b4,0xd8dce4); r.scale.setScalar(1.25); buendeln(r);
    k.anim.push(t=>{ r.rotation.z=Math.sin(t*3+i*2)>.7?-.35:0; }); });

  [fest,festHinten,festLinks,festRechts].forEach(g=>{ verschmelze(g); buendeln(g); });   /* Reihenfolge wichtig: bündeln zuletzt */
  /* Schatten sparen: Wandschmuck und kleine Tiere werfen keinen */
  const ohne=o=>o.traverse(m=>{ m.castShadow=false; });
  [hinten,links,rechts,...kleine].forEach(ohne);

  return { tuer, start:[0,9.8] };
}

/* Verstecke für die Edelsteine: in jedem Spiel werden fünf davon ausgelost */
const verstecke=[[-15,-10.2],[-16.8,-6.75],[-16.8,-3],[-15.6,6.2],[-15.4,9.3],[-13.6,-2.4],[-9,-12],[-7.9,4.7],[-4.6,1.5],[3.2,4.2],[6.2,-2.6],[4.2,-12.2],[9.8,-11.4],[14.9,-5.8],[15,1.4],[14.8,5.4],[16.6,8.6],[10.4,12.3],[7.8,7.9],[-10.4,12.4]];

/* Gegenstände: Reihenfolge = ort 1 bis 10. steh = Platz der Figur davor, treffer = Tippfläche [Breite, Höhe, Tiefe] */
const gegenstaende=[
  { wand:'hinten', x:-6.3, z:-13.5, steh:[-6.3,-12.05], treffer:[2.5,1.9,.7], trefferY:.95, baue(g){ /* 1 Schlüsselbrett */
      box(g,2.4,1.55,.12,HOLZ,0,1.85,.08); [-1,1].forEach(s=>{ box(g,2.55,.14,.2,HOLZ2,0,1.85+s*.8,.12); box(g,.14,1.7,.2,HOLZ2,s*1.2,1.85,.12); });
      [-.82,-.41,0,.41,.82].forEach((x,i)=>{ const c=i%2?SILBER:GOLD, l=[.62,.75,.55,.8,.66][i];
        walze(g,.045,.2,EISEN,x,2.4,.22).rotation.x=Math.PI/2; ring(g,.14,.05,c,x,2.24,.27);
        box(g,.075,l,.07,c,x,2.1-l/2,.27); box(g,.17,.08,.07,c,x+.1,2.14-l,.27); box(g,.12,.08,.07,c,x+.08,2.31-l,.27); ball(g,.07,c,x,2.09,.27); }); } },
  { x:-4.6, z:3.2, steh:[-4.6,4.85], kasten:[2.2,2], treffer:[2.1,1.75,1.9], baue(g){ /* 2 Würfelspiel: rundes Tischchen mit Becher und großen Würfeln */
      walze(g,1.02,.14,0x9a6a38,0,.82,0); walze(g,.9,.02,0x2f7a44,0,.9,0); const r=ring(g,1,.06,HOLZ2,0,.88,0); r.rotation.x=Math.PI/2;
      walze(g,.17,.75,HOLZ2,0,.4,0); walze(g,.55,.12,HOLZ2,0,.06,0);
      const wuerfel=(x,y,z,s,d,n)=>{ const w=gruppe(g,x,y,z); w.rotation.y=d; box(w,s,s,s,0xffffff,0,0,0);
        const P={1:[[0,0]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,1],[-1,1],[1,-1]],5:[[-1,-1],[1,1],[-1,1],[1,-1],[0,0]],6:[[-1,-1],[-1,0],[-1,1],[1,-1],[1,0],[1,1]]}, q=s*.27, a=s/2+.003, p=s*.085;
        P[n[0]].forEach(([u,v])=>ball(w,p,0x14100e,u*q,a,v*q,1,.3,1)); P[n[1]].forEach(([u,v])=>ball(w,p,0x14100e,u*q,v*q,a,1,1,.3)); P[n[2]].forEach(([u,v])=>{ ball(w,p,0x14100e,a,v*q,u*q,.3,1,1); ball(w,p,0x14100e,-a,v*q,u*q,.3,1,1); }); };
      wuerfel(-.45,1.12,.28,.42,.35,[5,3,6]); wuerfel(.12,1.09,.5,.36,-.4,[6,5,4]); wuerfel(-.2,1.06,-.42,.3,.9,[3,1,5]);
      rohr(g,.22,.31,.68,0x8a3a1a,.5,1.25,-.12,18); walze(g,.18,.02,0x2a1408,.5,1.6,-.12); [[1.0,.29],[1.5,.245]].forEach(([y,r2])=>{ const b=ring(g,r2,.03,GOLD,.5,y,-.12); b.rotation.x=Math.PI/2; }); } },
  { x:-11, z:-1.5, steh:[-11,-.05], kasten:[3.4,.95], treffer:[3.4,2.5,1], baue(g){ /* 3 Gestell mit bunten Schilden (keine Waffen) */
      [-1,1].forEach(s=>{ box(g,.18,2.15,.18,HOLZ2,s*1.6,1.07,-.15); box(g,.24,.14,.9,HOLZ,s*1.6,.07,0); ball(g,.13,GOLD,s*1.6,2.2,-.15); strich(g,[s*1.6,.1,.35],[s*1.6,.9,-.12],.06,HOLZ2); });
      [.45,1.75].forEach(y=>box(g,3.2,.15,.14,HOLZ,0,y,-.15)); box(g,3.2,.1,.4,HOLZ2,0,.38,.05);
      const form=w=>{ const f=new THREE.Shape(); f.moveTo(-w,.72*w/.46); f.lineTo(w,.72*w/.46); f.lineTo(w,0); f.quadraticCurveTo(w*.95,-w*1.1,0,-w*1.65); f.quadraticCurveTo(-w*.95,-w*1.1,-w,0); f.lineTo(-w,.72*w/.46); return f; };
      const platte=(x,y,z,w,c,d)=>{ const m=new THREE.Mesh(new THREE.ExtrudeGeometry(form(w),{depth:d,bevelEnabled:false}),mat(c)); m.position.set(x,y,z); m.castShadow=true; g.add(m); };
      [[-1.02,ROT,GOLD,0],[0,BLAU,CREME,1],[1.02,0x2f9a4a,0xffd83a,2]].forEach(([x,c,r,n])=>{ platte(x,1.2,-.05,.48,r,.07); platte(x,1.2,.02,.4,c,.07);
        if(n===0){ box(g,.46,.13,.05,r,x,1.18,.12); [-.18,0,.18].forEach(d=>kegel(g,.08,.3,r,x+d,1.39,.12)); }
        else if(n===1){ box(g,.15,1.15,.04,r,x,1.15,.11); box(g,.78,.15,.04,r,x,1.38,.115); }
        else { [-1,1].forEach(v=>{ const b=box(g,.6,.13,.04,r,x+v*.15,1.1,.11+v*.002); b.rotation.z=-v*.75; }); ball(g,.15,r,x,1.5,.11,1,1,.35); } }); } },
  { x:4.9, z:-1.3, steh:[4.9,.35], r:.8, treffer:[1.5,2.75,1.5], baue(g,k){ /* 4 große Laterne auf einem Steinsockel */
      box(g,1.15,.3,1.15,0xa8987e,0,.15,0); box(g,1.05,.14,1.05,EISEN,0,.37,0);
      [-1,1].forEach(a=>[-1,1].forEach(b=>box(g,.11,1.5,.11,EISEN,a*.43,1.18,b*.43)));
      box(g,1.05,.13,1.05,EISEN,0,1.96,0); kegel(g,.82,.5,EISEN,0,2.27,0).rotation.y=Math.PI/4; ball(g,.1,GOLD,0,2.55,0); ring(g,.2,.045,GOLD,0,2.73,0);
      [-1,1].forEach(s=>{ box(g,.86,.05,.05,EISEN,0,1.17,s*.45); box(g,.05,.05,.86,EISEN,s*.45,1.17,0); });
      walze(g,.15,.5,CREME,0,.69,0); const f=kegel(g,.15,.5,basis(0xff8a1e),0,1.2,0), f2=kegel(g,.08,.3,basis(0xffe866),0,1.13,.09); f.castShadow=f2.castShadow=false;
      const glas=new THREE.Mesh(GEO.box,basis(0xffd870,{transparent:true,opacity:.25,depthWrite:false})); glas.scale.set(.82,1.45,.82); glas.position.y=1.17; g.add(glas);
      const s=schein(k.scene,'rgba(255,200,90,.7)',4.9,1.25,-1.3,2.4); k.anim.push(t=>{ const a=2.4+Math.sin(t*10)*.12+Math.sin(t*6.3)*.1; s.scale.set(a,a,1); }); } },
  { x:11, z:2.5, steh:[11,3.95], kasten:[2.7,1.15], treffer:[2.8,2.35,1.2], baue(g){ /* 5 Signalhorn auf einem Holzgestell */
      [-.75,.75].forEach(x=>{ [-1,1].forEach(s=>strich(g,[x,0,s*.45],[x,.9,0],.08,HOLZ2)); box(g,.22,.18,.4,HOLZ,x,.95,0); });
      box(g,1.8,.12,.16,HOLZ,0,.42,0);
      const kurve=new THREE.CatmullRomCurve3([V(-1.25,1.5,0),V(-.8,1.16,0),V(-.15,1.1,0),V(.5,1.28,0),V(1.0,1.65,0)]), n=22;
      for(let i=0;i<n;i++){ const a=kurve.getPoint(i/n), b=kurve.getPoint((i+1)/n), d=b.clone().sub(a), r1=.06+Math.pow(i/n,1.7)*.34, r2=.06+Math.pow((i+1)/n,1.7)*.34, c=i===5||i===14?GOLD:(i<2?0x6a4a2a:0xf0e0b8);
        const s=rohr(g,r2,r1,d.length()*1.06,c,0,0,0,16,true); s.position.copy(a).addScaledVector(d,.5); s.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); }
      const e=kurve.getPoint(1), d=kurve.getTangent(1), q=new THREE.Quaternion().setFromUnitVectors(V(0,0,1),d);
      ring(g,.41,.07,GOLD,e.x,e.y,e.z).quaternion.copy(q); const m=new THREE.Mesh(new THREE.CircleGeometry(.37,24),mat(0x4a2e14,{side:THREE.DoubleSide})); m.position.copy(e).addScaledVector(d,-.06); m.quaternion.copy(q); g.add(m);
      ring(g,.09,.04,GOLD,-1.28,1.52,0).quaternion.setFromUnitVectors(V(0,0,1),kurve.getTangent(0));
      strich(g,[-.65,1.16,.12],[-.2,.6,.22],.025,ROT); strich(g,[-.2,.6,.22],[.45,1.25,.2],.025,ROT); kegel(g,.09,.26,ROT,-.2,.48,.22); } },
  { wand:'hinten', x:6.45, z:-13.5, steh:[6.45,-12.05], treffer:[2.2,1.9,.7], trefferY:.95, baue(g){ /* 6 Wachplan: Tafel mit Tabelle */
      box(g,2.05,1.7,.12,HOLZ2,0,1.85,.08);
      const t=bild(384,310,c=>{ c.fillStyle='#f2e4bc'; c.fillRect(0,0,384,310);
        c.fillStyle='#3a2410'; c.font='700 44px Andika, Arial, sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText('Wachplan',192,36);
        c.strokeStyle='#7a5a32'; c.lineWidth=4; for(let i=0;i<=4;i++){ c.beginPath(); c.moveTo(20,70+i*56); c.lineTo(364,70+i*56); c.stroke(); } [20,106,192,278,364].forEach(x=>{ c.beginPath(); c.moveTo(x,70); c.lineTo(x,294); c.stroke(); });
        c.fillStyle='#f0a818'; c.beginPath(); c.arc(149,98,16,0,6.283); c.fill(); for(let i=0;i<8;i++){ const a=i*.785; c.fillRect(147+Math.cos(a)*23,96+Math.sin(a)*23,5,5); }
        c.fillStyle='#e87828'; c.beginPath(); c.arc(235,106,18,Math.PI,0); c.fill(); c.fillRect(210,108,50,5);
        c.fillStyle='#2a4a8a'; c.beginPath(); c.arc(321,98,18,0,6.283); c.fill(); c.fillStyle='#f2e4bc'; c.beginPath(); c.arc(331,91,15,0,6.283); c.fill();
        const F=['#b83228','#2a56a0','#2f7a44'];
        for(let r=0;r<3;r++){ c.fillStyle=F[r]; c.beginPath(); c.arc(63,154+r*56,17,0,6.283); c.fill(); for(let s=0;s<3;s++) if((r+s*2)%3!==1){ c.strokeStyle=F[r]; c.lineWidth=8; c.beginPath(); c.moveTo(132+s*86,154+r*56); c.lineTo(145+s*86,167+r*56); c.lineTo(168+s*86,140+r*56); c.stroke(); } } });
      const p=new THREE.Mesh(new THREE.PlaneGeometry(1.85,1.5),new THREE.MeshLambertMaterial({map:t})); p.position.set(0,1.85,.145); g.add(p);
      [-1,1].forEach(s=>ball(g,.07,GOLD,s*.9,2.62,.17)); walze(g,.14,.06,ROT,.82,1.06,.18).rotation.x=Math.PI/2; box(g,2.2,.1,.28,HOLZ,0,.98,.15); strich(g,[-.7,1.06,.25],[-.2,1.06,.25],.03,CREME); } },
  { x:-9.2, z:6.1, steh:[-9.2,7.5], kasten:[1.75,1.15], treffer:[1.8,2.05,1.25], baue(g){ /* 7 Wachbuch auf einem Stehpult */
      box(g,1.1,.14,.8,HOLZ2,0,.07,0); box(g,.28,1.1,.28,HOLZ,0,.65,0); [-1,1].forEach(s=>strich(g,[s*.45,.12,0],[s*.1,.6,0],.06,HOLZ2));
      const p=gruppe(g,0,1.34,0); p.rotation.x=.48;
      box(p,1.6,.12,1.08,HOLZ,0,0,0); box(p,1.62,.12,.1,HOLZ2,0,.07,.54);
      box(p,1.42,.08,.9,0x8a2a1a,0,.1,-.02);
      [-1,1].forEach(s=>{ const b=gruppe(p,s*.34,.2,-.02); b.rotation.z=s*.07; box(b,.66,.09,.82,0xfaf2da,0,0,0); for(let i=0;i<6;i++) box(b,i%3===2?.32:.5,.008,.035,0x3a2c20,i%3===2?-.09:0,.05,-.28+i*.115); });
      box(p,.05,.03,.88,0x6a1a10,0,.22,-.02); box(p,.08,.012,.4,GOLD,.1,.27,.38);
      walze(g,.11,.18,0x2a3a6a,.78,1.43,-.28); box(g,.26,.07,.26,HOLZ2,.72,1.31,-.28); strich(g,[.78,1.48,-.28],[.98,2.0,-.4],.015,0x8a5a2a); const fe=ball(g,.1,0xffffff,.93,1.88,-.37,.5,2.2,.25); fe.rotation.z=-.36; } },
  { x:3.2, z:5.7, steh:[3.2,7.1], kasten:[3.1,1.15], treffer:[3.1,1.75,1.2], baue(g){ /* 8 Sitzbank mit Lehne und Kissen */
      [-.28,.05,.37].forEach(z=>box(g,2.9,.14,.3,0xa87438,0,.72,z));
      [-1,1].forEach(s=>{ box(g,.18,.68,.18,HOLZ2,s*1.3,.34,.42); box(g,.18,1.6,.18,HOLZ2,s*1.4,.8,-.44); box(g,.14,.12,.95,HOLZ2,s*1.3,.28,0); box(g,.2,.12,1,HOLZ,s*1.43,1.05,.03); box(g,.12,.34,.12,HOLZ2,s*1.43,.86,.42); ball(g,.12,HOLZ,s*1.4,1.64,-.44); });
      box(g,2.7,.22,.1,0xa87438,0,1.42,-.44); box(g,2.7,.16,.1,0xa87438,0,1.05,-.44); [-.8,-.27,.27,.8].forEach(x=>box(g,.14,.3,.07,HOLZ,x,1.23,-.44));
      box(g,2.5,.11,.1,HOLZ2,0,.28,0);
      ball(g,.45,ROT,-.7,.88,.05,1.25,.3,.9); ball(g,.06,GOLD,-.7,1.02,.05); } },
  { x:5.5, z:-9.8, dreh:-.7, steh:[5.5,-7.75], kasten:[3,2.8], treffer:[2.8,2.35,1.9], baue(g){ /* 9 Seilwinde: Trommel mit Seil, großes Kurbelrad, Haken */
      [-.75,.75].forEach(x=>{ [-1,1].forEach(s=>strich(g,[x,0,s*.65],[x,1.35,0],.1,HOLZ2)); box(g,.26,.12,1.4,HOLZ,x,.06,0); box(g,.28,.28,.34,HOLZ,x,1.3,0); });
      box(g,1.6,.14,.14,HOLZ,0,.45,-.42);
      walze(g,.3,1.35,HOLZ,0,1.3,0).rotation.z=Math.PI/2; walze(g,.09,2.2,EISEN,.1,1.3,0).rotation.z=Math.PI/2;
      for(let i=0;i<9;i++){ const r=ring(g,.35,.065,i%2?0xd8b878:0xc4a060,-.48+i*.12,1.3,0); r.rotation.y=Math.PI/2; }
      [-.6,.6].forEach(x=>walze(g,.5,.07,HOLZ2,x,1.3,0).rotation.z=Math.PI/2);
      const rad=gruppe(g,1.1,1.3,0); rad.rotation.y=Math.PI/2;
      ring(rad,.82,.09,0xa87438,0,0,0); for(let i=0;i<4;i++) box(rad,1.62,.1,.08,HOLZ,0,0,0).rotation.z=i*Math.PI/4;
      for(let i=0;i<8;i++){ const a=i*Math.PI/4; strich(rad,[Math.cos(a)*.82,Math.sin(a)*.82,0],[Math.cos(a)*1.04,Math.sin(a)*1.04,0],.055,HOLZ2); }
      walze(rad,.17,.2,EISEN,0,0,0).rotation.x=Math.PI/2; ball(rad,.09,GOLD,0,0,.13);
      strich(g,[-.2,1.2,.33],[-.2,.55,.5],.045,0xd8b878); ring(g,.08,.035,EISEN,-.2,.49,.5); ring(g,.15,.05,SILBER,-.2,.27,.5,Math.PI*1.45).rotation.z=Math.PI*.75;
      [0,.07,.14].forEach((y,i)=>{ const r=ring(g,.34-i*.06,.05,0xc4a060,.3,.05+y,.5); r.rotation.x=Math.PI/2; }); } },
  { x:7.7, z:9.7, steh:[5.55,9.7], kasten:[2.95,1.7], treffer:[3,1.9,1.7], baue(g){ /* 10 Heuballen mit Schnüren */
      const ballen=(x,y,z,d)=>{ const b=gruppe(g,x,y,z); b.rotation.y=d; box(b,1.34,.72,1,0xe0bc4a,0,.36,0); box(b,1.26,.76,.92,0xcca636,0,.36,0);
        [-.34,.34].forEach(a=>box(b,.07,.8,1.04,0x8a3a1a,a,.36,0));
        for(let i=0;i<70;i++){ const s=i%3, h=box(b,.26+zufall()*.18,.022,.026,i%2?0xf0d468:0xb89430,0,0,0);
          if(s===0){ h.position.set((zufall()-.5)*1.15,.745+zufall()*.03,(zufall()-.5)*.9); h.rotation.y=(zufall()-.5)*.7; }
          else if(s===1){ h.position.set((zufall()-.5)*1.1,.08+zufall()*.6,.505); h.rotation.z=(zufall()-.5)*.5; }
          else { h.position.set((i%2?1:-1)*(.68+zufall()*.08),.08+zufall()*.62,(zufall()-.5)*.9); h.rotation.set(0,(zufall()-.5)*.8,(zufall()-.5)*.8); } } };
      ballen(-.7,0,0,.06); ballen(.72,0,.02,-.08); ballen(.05,.76,-.04,.14);
      for(let i=0;i<60;i++){ const x=(zufall()-.5)*2.9, z=(i%2?1:-1)*(.58+zufall()*.22); const h=box(g,.34,.02,.026,i%3?0xe8c858:0xc8a438,x,.02+zufall()*.05,z); h.rotation.y=zufall()*3; } } }
];

return { titel:'Das Torhaus', himmel:0xa9d8f2, breite:B, tiefe:T, baue, gegenstaende, verstecke };
})();

/* Schlussbild der Ritterburg: Die Zugbrücke geht herunter, die Figur läuft hinaus ins Freie, Konfetti und Fahnen. */
FINALE3D.burg = function(k,kamera,figur){
  const sc=k.scene;
  sc.background=new THREE.Color(0x9fd4f5); sc.fog=new THREE.Fog(0xbfe4f8,45,110);
  sc.add(new THREE.HemisphereLight(0xffffff,0x6f8a4a,.75));
  const sonne=new THREE.DirectionalLight(0xfff0c8,.7); sonne.position.set(14,22,18); sonne.castShadow=true; sonne.shadow.mapSize.set(1024,1024);
  const c=sonne.shadow.camera; c.left=-18; c.right=18; c.top=18; c.bottom=-12; c.near=1; c.far=70; sonne.shadow.bias=-.001; sc.add(sonne);

  /* Wiese vorn und hinten, dazwischen der Wassergraben */
  const land=gruppe(sc,0,0,0);
  box(land,90,1,40,0x6cae4a,0,-.5,20.3); box(land,90,1,30,0x7a8a62,0,-.5,-19);
  box(land,3.4,.04,26.6,0xc9ab78,0,.02,13.6);
  for(let i=0;i<70;i++){ const x=(i%2?-1:1)*(3+zufall()*22), z=6+zufall()*18; ball(land,.18+zufall()*.14,[0xffffff,0xffd83a,0xf06a9a,0xe04a3a][i%4],x,.06,z,1,.5,1); }
  for(let i=0;i<14;i++){ const x=(i%2?-1:1)*(9+zufall()*17), z=7+zufall()*14, h=1.4+zufall(); walze(land,.3,h,0x7a5230,x,h/2,z); ball(land,1.1+zufall()*.6,i%3?0x3f8a3a:0x5aa044,x,h+.9,z,1,1.15,1); }
  verschmelze(land);
  const wasser=new THREE.Mesh(new THREE.PlaneGeometry(90,5.4),basis(0x4a90c8)); wasser.rotation.x=-Math.PI/2; wasser.position.set(0,-.35,-2.3); sc.add(wasser);
  const wellen=[]; for(let i=0;i<26;i++){ const w=box(sc,1+zufall(),.02,.08,basis(0xd8f0ff),(zufall()-.5)*40,-.33,-4.4+zufall()*4.2); wellen.push(w); }

  /* Burgmauer mit Tor, Türmen und Zinnen */
  const burg=gruppe(sc,0,0,-5.6);
  const STEINE=0x9a9aa2, DUNKEL=0x7e7e88;
  [-1,1].forEach(s=>{ box(burg,9,8,1.6,STEINE,s*7.2,4,0);
    for(let i=0;i<5;i++) box(burg,1,1,1.7,STEINE,s*(3.4+i*1.9),8.5,0);
    walze(burg,2.6,9,DUNKEL,s*10.5,4.5,0); kegel(burg,3.2,3,0xb83a2a,s*10.5,10.5,0);
    for(let i=0;i<3;i++){ box(burg,.7,1.1,.2,0x2a2a38,s*10.5+(i%2?.9:-.9),2.6+i*2.1,2.5); }
    walze(burg,.09,3.6,0x5a4030,s*4.6,6.2,1.1); });
  box(burg,5.4,3.2,1.6,STEINE,0,6.4,0); for(let i=0;i<3;i++) box(burg,1,1,1.7,STEINE,-1.9+i*1.9,8.5,0);
  for(let i=0;i<9;i++){ const a=Math.PI*i/8, s=box(burg,1.1,.6,1.75,DUNKEL,Math.cos(a)*2.5,4.2+Math.sin(a)*1.2,0); s.rotation.z=a-Math.PI/2; }
  for(let r=0;r<7;r++) for(let i=0;i<7;i++){ const x=(r%2?-1:1)*(3.6+i*1.1+zufall()*.4); box(burg,.7,.28,.05,(r+i)%2?0x8a8a94:0xaeaeb6,x,.6+r*1.05,.83); }
  verschmelze(burg);
  box(sc,5,5.4,.2,basis(0x1a1420),0,2.7,-6.9);
  const fahnen=[-4.6,4.6].map(x=>{ const f=new THREE.Mesh(new THREE.PlaneGeometry(2,1.1,10,1),new THREE.MeshLambertMaterial({color:x<0?0x2a5aa8:0xc0303a,side:THREE.DoubleSide})); f.position.set(x+1.05,7.4,-4.5); sc.add(f); return f; });

  /* Zugbrücke: dreht sich um ihre Unterkante */
  const bruecke=gruppe(sc,0,.05,-4.8);
  for(let i=0;i<9;i++) box(bruecke,4.6,.55,.22,i%2?0x8a5a2c:0x9c6a36,0,.3+i*.58,0);
  [-1.9,1.9].forEach(x=>box(bruecke,.24,5.2,.08,0x3a3d44,x,2.65,.14));
  verschmelze(bruecke);
  const ketten=[-1,1].map(s=>walze(sc,.07,1,0x3a3d44,0,0,0));

  /* Sonne, Wolken, Vögel */
  schein(sc,'rgba(255,240,170,.95)',20,20,-22,14);
  const wolken=[[-18,17,-14],[4,20,-18],[17,14,-12]].map(p=>{ const g=gruppe(sc,p[0],p[1],p[2]); for(let i=0;i<5;i++) ball(g,1.1+zufall(),basis(0xffffff),(i-2)*1.3,zufall()*.6,0,1.2,.75,1); return g; });
  const voegel=[0,1,2].map(i=>{ const g=gruppe(sc,0,11+i,0); ball(g,.22,0x34405a,0,0,0,1.5,.8,.8); const f=[-1,1].map(s=>{ const a=gruppe(g,0,0,0); box(a,.25,.04,.8,0x34405a,0,0,s*.45); return a; }); return { g,f,i }; });
  voegel.forEach(v=>v.g.traverse(m=>{ if(m.isMesh) m.castShadow=false; }));
  /* Konfetti */
  const N=220, konf=new THREE.InstancedMesh(GEO.box,basis(0xffffff),N), o=new THREE.Object3D(), teile=[];
  const farben=[0xe5243b,0x2f7fe8,0x14b860,0xffc21a,0xb24ae0,0xffffff];
  for(let i=0;i<N;i++){ teile.push({ x:(zufall()-.5)*18, y:4+zufall()*10, z:-1+zufall()*11, v:1+zufall()*1.6, p:zufall()*6 }); konf.setColorAt(i,new THREE.Color(farben[i%6])); }
  konf.frustumCulled=false; konf.visible=false; sc.add(konf);

  figur.position.set(0,.12,-6.4); figur.rotation.y=0; sc.add(figur);
  const u=figur.userData;
  let t0=null;
  return function(zeit,dt){
    if(t0===null) t0=zeit; const t=zeit-t0;
    /* 0 bis 3 s: Brücke senkt sich */
    const auf=Math.min(1,Math.max(0,(t-.6)/2.6)), w=auf*auf*(3-2*auf);
    bruecke.rotation.x=w*Math.PI/2;
    ketten.forEach((k0,i)=>{ const s=i?1:-1, a=V(s*2.35,6.1,-4.7), b=V(s*2.2,.05+Math.cos(w*Math.PI/2)*4.9,-4.8+Math.sin(w*Math.PI/2)*4.9), d=b.clone().sub(a); k0.position.copy(a).addScaledVector(d,.5); k0.scale.y=d.length(); k0.quaternion.setFromUnitVectors(V(0,1,0),d.normalize()); });
    /* ab 3,4 s läuft die Figur hinaus */
    const weg=Math.min(1,Math.max(0,(t-3.4)/3.4)), geht=weg>0&&weg<1;
    figur.position.z=-6.4+weg*12.6; figur.position.y=figur.position.z<-5?.04:(figur.position.z<.5?.18:.04);
    const s=Math.sin(t*11);
    u.beinL.rotation.x=geht?s*.7:0; u.beinR.rotation.x=geht?-s*.7:0;
    const jubel=weg>=1;
    u.armL.rotation.x=geht?-s*.6:0; u.armR.rotation.x=geht?s*.6:0;
    u.armL.rotation.z=jubel?-2.5+Math.sin(t*7)*.25:-.18; u.armR.rotation.z=jubel?2.5-Math.sin(t*7)*.25:.18;
    u.koerper.position.y=jubel?Math.abs(Math.sin(t*5))*.3:0;
    konf.visible=t>5.5;
    if(konf.visible) teile.forEach((p,i)=>{ p.y-=p.v*dt; if(p.y<0) p.y+=12; o.position.set(p.x+Math.sin(t*2+p.p)*.4,p.y,p.z); o.rotation.set(t*3+p.p,t*2+p.p,0); o.scale.set(.18,.03,.12); o.updateMatrix(); konf.setMatrixAt(i,o.matrix); });
    if(konf.visible) konf.instanceMatrix.needsUpdate=true;
    fahnen.forEach((f,j)=>{ const p=f.geometry.attributes.position; for(let i=0;i<p.count;i++){ const x=p.getX(i)+1; p.setZ(i,Math.sin(x*3-t*5+j)*.14*x); } p.needsUpdate=true; });
    wolken.forEach((g,i)=>{ g.position.x+=dt*(.3+i*.1); if(g.position.x>30) g.position.x=-30; });
    voegel.forEach(v=>{ const a=t*.5+v.i*2.1; v.g.position.set(Math.cos(a)*(8+v.i*2),11+v.i,-2+Math.sin(a)*5); v.g.rotation.y=-a-Math.PI/2; v.f[0].rotation.x=Math.sin(t*9+v.i)*.5; v.f[1].rotation.x=-Math.sin(t*9+v.i)*.5; });
    wellen.forEach((m,i)=>{ m.position.x+=dt*.6; if(m.position.x>22) m.position.x=-22; });
    /* Kamera: erst weiter weg, dann näher an die Figur */
    const nah=Math.min(1,Math.max(0,(t-3.4)/4)), hoch=kamera.aspect<1.1?1.2:1;
    kamera.position.set(Math.sin(t*.15)*2*nah, (8-nah*3.6)*hoch, (24-nah*8)*hoch); kamera.lookAt(0,4-nah*1.8,-2+nah*4);
  };
};

