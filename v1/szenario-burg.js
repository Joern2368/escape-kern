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